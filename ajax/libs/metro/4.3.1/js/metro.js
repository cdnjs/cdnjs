/*
 * Metro 4 Components Library v4.3.1  (https://metroui.org.ua)
 * Copyright 2012-2019 Sergey Pimenov
 * Licensed under MIT
 */

(function( factory ) {
    if ( typeof define === 'function' && define.amd ) {
        define('metro4', factory );
    } else {
        factory( );
    }
}(function( ) { 
'use strict';

(function (global, undefined) {

// Source: src/mode.js

'use strict';

// Source: src/func.js

var numProps = ['opacity', 'zIndex'];

function isVisible(elem) {
    return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
}

function isHidden(elem) {
    var s = getComputedStyle(elem);
    return !isVisible(elem) || +s['opacity'] === 0 || elem.hidden || s['visibility'] === "hidden";
}

function not(value){
    return value === undefined || value === null;
}

function camelCase(string){
    return string.replace( /-([a-z])/g, function(all, letter){
        return letter.toUpperCase();
    });
}

function isPlainObject( obj ) {
    var proto;
    if ( !obj || Object.prototype.toString.call( obj ) !== "[object Object]" ) {
        return false;
    }
    proto = obj.prototype !== undefined;
    if ( !proto ) {
        return true;
    }
    return proto.constructor && typeof proto.constructor === "function";
}

function isEmptyObject( obj ) {
    for (var name in obj ) {
        if (obj.hasOwnProperty(name)) return false;
    }
    return true;
}

function isArrayLike (o){
    return o instanceof Object && 'length' in o;
}

function str2arr (str, sep) {
    sep = sep || " ";
    return str.split(sep).map(function(el){
        return  (""+el).trim();
    }).filter(function(el){
        return el !== "";
    })
}

function parseUnit(str, out) {
    if (!out) out = [ 0, '' ];
    str = String(str);
    out[0] = parseFloat(str);
    out[1] = str.match(/[\d.\-+]*\s*(.*)/)[1] || '';
    return out;
}

function setStyleProp(el, key, val){
    key = camelCase(key);

    if (["scrollLeft", "scrollTop"].indexOf(key) > -1) {
        el[key] = (parseInt(val));
    } else {
        el.style[key] = isNaN(val) || numProps.indexOf(""+key) > -1 ? val : val + 'px';
    }
}

function acceptData(owner){
    return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
}

function getData(data){
    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
}

function dataAttr(elem, key, data){
    var name;

    if ( not(data) && elem.nodeType === 1 ) {
        name = "data-" + key.replace( /[A-Z]/g, "-$&" ).toLowerCase();
        data = elem.getAttribute( name );

        if ( typeof data === "string" ) {
            try {
                data = getData( data );
            } catch ( e ) {}

            dataSet.set( elem, key, data );
        } else {
            data = undefined;
        }
    }
    return data;
}

function iif(val1, val2, val3){
    return val1 ? val1 : val2 ? val2 : val3;
}

// Source: src/setimmediate.js

/*
 * setImmediate polyfill
 * Version 1.0.5
 * Url: https://github.com/YuzuJS/setImmediate
 * Copyright (c) 2016 Yuzu (https://github.com/YuzuJS)
 * Licensed under MIT
 */
(function (global, undefined) {

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1;
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var registerImmediate;

    function setImmediate(callback) {
        if (typeof callback !== "function") {
            callback = new Function("" + callback);
        }
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
        }
        tasksByHandle[nextHandle] = { callback: callback, args: args };
        registerImmediate(nextHandle);
        return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
        }
    }

    function runIfPresent(handle) {
        if (currentlyRunningATask) {
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installPostMessageImplementation() {
        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        global.addEventListener("message", onGlobalMessage, false);

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    installPostMessageImplementation();

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;

}(window));

// Source: src/promise.js

/*
 * Promise polyfill
 * Version 1.2.0
 * Url: https://github.com/lahmatiy/es6-promise-polyfill
 * Copyright (c) 2014 Roman Dvornov
 * Licensed under MIT
 */
(function (global, undefined) {

    if (global.Promise) {
        return;
    }

    // console.log("Promise polyfill v1.2.0");

    var PENDING = 'pending';
    var SEALED = 'sealed';
    var FULFILLED = 'fulfilled';
    var REJECTED = 'rejected';
    var NOOP = function(){};

    function isArray(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    // async calls
    var asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
    var asyncQueue = [];
    var asyncTimer;

    function asyncFlush(){
        // run promise callbacks
        for (var i = 0; i < asyncQueue.length; i++)
            asyncQueue[i][0](asyncQueue[i][1]);

        // reset async asyncQueue
        asyncQueue = [];
        asyncTimer = false;
    }

    function asyncCall(callback, arg){
        asyncQueue.push([callback, arg]);

        if (!asyncTimer)
        {
            asyncTimer = true;
            asyncSetTimer(asyncFlush, 0);
        }
    }

    function invokeResolver(resolver, promise) {
        function resolvePromise(value) {
            resolve(promise, value);
        }

        function rejectPromise(reason) {
            reject(promise, reason);
        }

        try {
            resolver(resolvePromise, rejectPromise);
        } catch(e) {
            rejectPromise(e);
        }
    }

    function invokeCallback(subscriber){
        var owner = subscriber.owner;
        var settled = owner.state_;
        var value = owner.data_;
        var callback = subscriber[settled];
        var promise = subscriber.then;

        if (typeof callback === 'function')
        {
            settled = FULFILLED;
            try {
                value = callback(value);
            } catch(e) {
                reject(promise, e);
            }
        }

        if (!handleThenable(promise, value))
        {
            if (settled === FULFILLED)
                resolve(promise, value);

            if (settled === REJECTED)
                reject(promise, value);
        }
    }

    function handleThenable(promise, value) {
        var resolved;

        try {
            if (promise === value)
                throw new TypeError('A promises callback cannot return that same promise.');

            if (value && (typeof value === 'function' || typeof value === 'object'))
            {
                var then = value.then;  // then should be retrived only once

                if (typeof then === 'function')
                {
                    then.call(value, function(val){
                        if (!resolved)
                        {
                            resolved = true;

                            if (value !== val)
                                resolve(promise, val);
                            else
                                fulfill(promise, val);
                        }
                    }, function(reason){
                        if (!resolved)
                        {
                            resolved = true;

                            reject(promise, reason);
                        }
                    });

                    return true;
                }
            }
        } catch (e) {
            if (!resolved)
                reject(promise, e);

            return true;
        }

        return false;
    }

    function resolve(promise, value){
        if (promise === value || !handleThenable(promise, value))
            fulfill(promise, value);
    }

    function fulfill(promise, value){
        if (promise.state_ === PENDING)
        {
            promise.state_ = SEALED;
            promise.data_ = value;

            asyncCall(publishFulfillment, promise);
        }
    }

    function reject(promise, reason){
        if (promise.state_ === PENDING)
        {
            promise.state_ = SEALED;
            promise.data_ = reason;

            asyncCall(publishRejection, promise);
        }
    }

    function publish(promise) {
        var callbacks = promise.then_;
        promise.then_ = undefined;

        for (var i = 0; i < callbacks.length; i++) {
            invokeCallback(callbacks[i]);
        }
    }

    function publishFulfillment(promise){
        promise.state_ = FULFILLED;
        publish(promise);
    }

    function publishRejection(promise){
        promise.state_ = REJECTED;
        publish(promise);
    }

    /**
     * @class
     */
    function Promise(resolver){
        if (typeof resolver !== 'function')
            throw new TypeError('Promise constructor takes a function argument');

        if (this instanceof Promise === false)
            throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');

        this.then_ = [];

        invokeResolver(resolver, this);
    }

    Promise.prototype = {
        constructor: Promise,

        state_: PENDING,
        then_: null,
        data_: undefined,

        then: function(onFulfillment, onRejection){
            var subscriber = {
                owner: this,
                then: new this.constructor(NOOP),
                fulfilled: onFulfillment,
                rejected: onRejection
            };

            if (this.state_ === FULFILLED || this.state_ === REJECTED)
            {
                // already resolved, call callback async
                asyncCall(invokeCallback, subscriber);
            }
            else
            {
                // subscribe
                this.then_.push(subscriber);
            }

            return subscriber.then;
        },

        'catch': function(onRejection) {
            return this.then(null, onRejection);
        }
    };

    Promise.all = function(promises){
        var Class = this;

        if (!isArray(promises))
            throw new TypeError('You must pass an array to Promise.all().');

        return new Class(function(resolve, reject){
            var results = [];
            var remaining = 0;

            function resolver(index){
                remaining++;
                return function(value){
                    results[index] = value;
                    if (!--remaining)
                        resolve(results);
                };
            }

            for (var i = 0, promise; i < promises.length; i++)
            {
                promise = promises[i];

                if (promise && typeof promise.then === 'function')
                    promise.then(resolver(i), reject);
                else
                    results[i] = promise;
            }

            if (!remaining)
                resolve(results);
        });
    };

    Promise.race = function(promises){
        var Class = this;

        if (!isArray(promises))
            throw new TypeError('You must pass an array to Promise.race().');

        return new Class(function(resolve, reject) {
            for (var i = 0, promise; i < promises.length; i++)
            {
                promise = promises[i];

                if (promise && typeof promise.then === 'function')
                    promise.then(resolve, reject);
                else
                    resolve(promise);
            }
        });
    };

    Promise.resolve = function(value){
        var Class = this;

        if (value && typeof value === 'object' && value.constructor === Class)
            return value;

        return new Class(function(resolve){
            resolve(value);
        });
    };

    Promise.reject = function(reason){
        var Class = this;

        return new Class(function(resolve, reject){
            reject(reason);
        });
    };

    if (typeof  global['Promise'] === "undefined") {
        global.Promise = Promise;
    }
}(window));

// Source: src/core.js

var m4qVersion = "v1.0.1. Built at 24/09/2019 15:20:29";
var regexpSingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

var matches = Element.prototype.matches
    || Element.prototype.matchesSelector
    || Element.prototype.webkitMatchesSelector
    || Element.prototype.mozMatchesSelector
    || Element.prototype.msMatchesSelector
    || Element.prototype.oMatchesSelector;

var $ = function(selector, context){
    return new $.init(selector, context);
};

$.version = m4qVersion;

$.fn = $.prototype = {
    version: m4qVersion,
    constructor: $,
    length: 0,
    uid: "",

    push: [].push,
    sort: [].sort,
    splice: [].splice,
    indexOf: [].indexOf
};

$.extend = $.fn.extend = function(){
    var options, name,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length;

    if ( typeof target !== "object" && typeof target !== "function" ) {
        target = {};
    }

    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {
        if ( ( options = arguments[ i ] ) != null ) {
            for ( name in options ) {
                if (options.hasOwnProperty(name)) target[ name ] = options[ name ];
            }
        }
    }

    return target;
};


// Source: src/interval.js

var now = function(){
    return Date.now();
};

$.extend({

    intervalId: -1,
    intervalQueue: [],
    intervalTicking: false,
    intervalTickId: null,

    setInterval: function(fn, int){
        var that = this;

        this.intervalId++;

        this.intervalQueue.push({
            id: this.intervalId,
            fn: fn,
            interval: int,
            lastTime: now()
        });

        if (!this.intervalTicking) {
            var tick = function(){
                that.intervalTickId = requestAnimationFrame(tick);
                $.each(that.intervalQueue, function(){
                    var item = this;
                    if (item.interval < 17 || now() - item.lastTime >= item.interval) {
                        item.fn();
                        item.lastTime = now();
                    }
                });
            };
            this.intervalTicking = true;
            tick();
        }

        return this.intervalId;
    },

    clearInterval: function(id){
        for(var i = 0; i < this.intervalQueue.length; i++){
            if (id === this.intervalQueue[i].id) {
                this.intervalQueue.splice(i, 1);
                break;
            }
        }
        if (this.intervalQueue.length === 0) {
            cancelAnimationFrame(this.intervalTickId);
            this.intervalTicking = false;
        }
    },

    setTimeout: function(fn, interval){
        var that = this, id = this.setInterval(function(){
            that.clearInterval(id);
            fn();
        }, interval);

        return id;
    },

    clearTimeout: function(id){
        return this.clearInterval(id);
    }
});

// Source: src/contains.js

$.fn.extend({
    index: function(sel){
        var el, _index = -1;

        if (this.length === 0) {
            return _index;
        }

        if (not(sel)) {
            el = this[0];
        } else if (sel instanceof $ && sel.length > 0) {
            el = sel[0];
        } else if (typeof sel === "string") {
            el = $(sel)[0];
        } else {
            el = undefined;
        }

        if (not(el)) {
            return _index;
        }

        if (el && el.parentNode) $.each(el.parentNode.children, function(i){
            if (this === el) {
                _index = i;
            }
        });
        return _index;
    },

    get: function(i){
        if (i === undefined) {
            return this.items();
        }
        return i < 0 ? this[ i + this.length ] : this[ i ];
    },

    eq: function(i){
        return !not(i) && this.length > 0 ? $.extend($(this.get(i)), {_prevObj: this}) : this;
    },

    is: function(s){
        var result = false;

        if (this.length === 0) {
            return false;
        }

        if (s instanceof $) {
            return this.same(s);
        }

        if (s === ":selected") {
            this.each(function(){
                if (this.selected) result = true;
            });
        } else

        if (s === ":checked") {
            this.each(function(){
                if (this.checked) result = true;
            });
        } else

        if (s === ":hidden") {
            this.each(function(){
                var styles = getComputedStyle(this);
                if (
                    this.getAttribute('type') === 'hidden'
                    || this.hidden
                    || styles['display'] === 'none'
                    || styles['visibility'] === 'hidden'
                    || parseInt(styles['opacity']) === 0
                ) result = true;
            });
        } else

        if (typeof  s === "string" && [':selected'].indexOf(s) === -1) {
            this.each(function(){
                if (matches.call(this, s)) {
                    result = true;
                }
            });
        } else

        if (isArrayLike(s)) {
            this.each(function(){
                var el = this;
                $.each(s, function(){
                    var sel = this;
                    if (el === sel) {
                        result = true;
                    }
                })
            });
        } else

        if (typeof s === "object" && s.nodeType === 1) {
            this.each(function(){
                if  (this === s) {
                    result = true;
                }
            })
        }

        return result;
    },

    same: function(o){
        var result = true;

        if (!(o instanceof $)) {
            o = $(o);
        }

        if (this.length !== o.length) return false;

        this.each(function(){
            if (o.items().indexOf(this) === -1) {
                result = false;
            }
        });

        return result;
    },

    last: function(){
        return this.eq(this.length - 1);
    },

    first: function(){
        return this.eq(0);
    },

    odd: function(){
        var result = this.filter(function(el, i){
            return i % 2 === 0;
        });
        return $.extend(result, {_prevObj: this});
    },

    even: function(){
        var result = this.filter(function(el, i){
            return i % 2 !== 0;
        });
        return $.extend(result, {_prevObj: this});
    },

    filter: function(fn){
        if (typeof fn === "string") {
            var sel = fn;
            fn = function(el){
                return matches.call(el, sel);
            };
        }

        return $.extend($.merge($(), [].filter.call(this, fn)), {_prevObj: this});
    },

    find: function(s){
        var res = [], result;

        if (s instanceof $) return s;

        if (this.length === 0) {
            result = this;
        } else {
            this.each(function () {
                var el = this;
                if (typeof el.querySelectorAll !== "undefined") res = res.concat([].slice.call(el.querySelectorAll(s)));
            });
            result = $.merge($(), res);
        }

        return $.extend(result, {_prevObj: this});
    },

    contains: function(s){
        return this.find(s).length > 0;
    },

    children: function(s){
        var i, res = [];

        if (s instanceof $) return s;

        this.each(function(){
            var el = this;
            for(i = 0; i < el.children.length; i++) {
                if (el.children[i].nodeType === 1)
                    res.push(el.children[i]);
            }
        });
        res = s ? res.filter(function(el){
            return matches.call(el, s);
        }) : res;

        return $.extend($.merge($(), res), {_prevObj: this});
    },

    parent: function(s){
        var res = [];
        if (this.length === 0) {
            return ;
        }

        if (s instanceof $) return s;

        this.each(function(){
            if (this.parentNode) {
                if (res.indexOf(this.parentNode) === -1) res.push(this.parentNode);
            }
        });
        res = s ? res.filter(function(el){
            return matches.call(el, s);
        }) : res;

        return $.extend($.merge($(), res), {_prevObj: this});
    },

    parents: function(s){
        var res = [];

        if (this.length === 0) {
            return ;
        }

        if (s instanceof $) return s;

        this.each(function(){
            var par = this.parentNode;
            while (par) {
                if (par.nodeType === 1 && res.indexOf(par) === -1) {
                    if (!not(s)) {
                        if (matches.call(par, s)) {
                            res.push(par);
                        }
                    } else {
                        res.push(par);
                    }
                }
                par = par.parentNode;
            }
        });

        return $.extend($.merge($(), res), {_prevObj: this});
    },

    siblings: function(s){
        var res = [];

        if (this.length === 0) {
            return ;
        }

        if (s instanceof $) return s;

        this.each(function(){
            var el = this;
            if (el.parentNode) {
                $.each(el.parentNode.children, function(){
                    if (el !== this) res.push(this)
                });
            }
        });

        if (s) {
            res = res.filter(function(el){
                return matches.call(el, s);
            })
        }

        return $.extend($.merge($(), res), {_prevObj: this});
    },

    _siblingAll: function(dir, s){
        var res = [];

        if (this.length === 0) {
            return ;
        }

        if (s instanceof $) return s;

        this.each(function(){
            var el = this;
            while (el) {
                el = el[dir];
                if (!el) break;
                res.push(el);
            }
        });

        if (s) {
            res = res.filter(function(el){
                return matches.call(el, s);
            })
        }

        return $.extend($.merge($(), res), {_prevObj: this});
    },

    _sibling: function(dir, s){
        var res = [];

        if (this.length === 0) {
            return ;
        }

        if (s instanceof $) return s;

        this.each(function(){
            var el = this[dir];
            if (el && el.nodeType === 1) {
                res.push(el);
            }
        });

        if (s) {
            res = res.filter(function(el){
                return matches.call(el, s);
            })
        }

        return $.extend($.merge($(), res), {_prevObj: this});
    },

    prev: function(s){
        return this._sibling('previousElementSibling', s);
    },

    next: function(s){
        return this._sibling('nextElementSibling', s);
    },

    prevAll: function(s){
        return this._siblingAll('previousElementSibling', s);
    },

    nextAll: function(s){
        return this._siblingAll('nextElementSibling', s);
    },

    closest: function(s){
        var res = [];

        if (this.length === 0) {
            return ;
        }

        if (s instanceof $) return s;

        if (!s) {
            return this.parent(s);
        }

        this.each(function(){
            var el = this;
            while (el) {
                if (!el) break;
                if (matches.call(el, s)) {
                    res.push(el);
                    return ;
                }
                el = el.parentElement;
            }
        });

        return $.extend($.merge($(), res.reverse()), {_prevObj: this});
    },

    has: function(selector){
        var res = [];

        if (this.length === 0) {
            return ;
        }

        this.each(function(){
            var el = $(this);
            var child = el.children(selector);
            if (child.length > 0) {
                res.push(this);
            }
        });

        return $.extend($.merge($(), res), {_prevObj: this});
    },

    back: function(to_start){
        var ret;
        if (to_start === true) {
            ret = this._prevObj;
            while (ret) {
                if (!ret._prevObj) break;
                ret = ret._prevObj;
            }
        } else {
            ret = this._prevObj ? this._prevObj : this;
        }
        return ret;
    }
});

// Source: src/prop.js

$.fn.extend({
    _prop: function(prop, value){
        if (arguments.length === 1) {
            return this.length === 0 ? undefined : this[0][prop];
        }

        if (not(value)) {
            value = '';
        }

        return this.each(function(){
            var el = this;

            el[prop] = value;

            if (prop === "innerHTML") {
                $.each($(el).find("script"), function(){
                    var script = this;
                    var s = document.createElement('script');
                    s.type = 'text/javascript';
                    if (script.src) {
                        s.src = script.src;
                    } else {
                        s.textContent = script.innerText;
                    }
                    document.body.appendChild(s);
                    script.parentNode.removeChild(script);
                });
            }
        });
    },

    prop: function(prop, value){
        return arguments.length === 1 ? this._prop(prop) : this._prop(prop, typeof value === "undefined" ? "" : value);
    },

    val: function(value){
        if (not(value)) {
            return this.length === 0 ? undefined : this[0].value;
        }

        return this.each(function(){
            var el = $(this);
            if (typeof this.value !== "undefined") {
                this.value = value;
            } else {
                el.html(value);
            }
        });
    },

    html: function(value){
        var that = this, v = [];

        if (arguments.length === 0) {
            return this._prop('innerHTML');
        }

        if (value instanceof $) {
            value.each(function(){
                v.push($(this).outerHTML());
            });
        } else {
            v.push(value);
        }

        that._prop('innerHTML', v.length === 1 && not(v[0]) ? "" : v.join("\n"));

        return this;
    },

    outerHTML: function(){
        return this._prop('outerHTML');
    },

    text: function(value){
        return arguments.length === 0 ? this._prop('textContent') : this._prop('textContent', typeof value === "undefined" ? "" : value);
    },

    innerText: function(value){
        return arguments.length === 0 ? this._prop('innerText') : this._prop('innerText', typeof value === "undefined" ? "" : value);
    },

    empty: function(){
        return this.each(function(){
            if (typeof this.innerHTML !== "undefined") this.innerHTML = "";
        });
    }
});

// Source: src/each.js

$.each = function(ctx, cb){
    var index = 0;
    if (isArrayLike(ctx)) {
        [].forEach.call(ctx, function(val, key) {
            cb.apply(val, [key, val]);
        });
    } else {
        for(var key in ctx) {
            if (ctx.hasOwnProperty(key))
                cb.apply(ctx[key], [key, ctx[key],  index++]);
        }
    }

    return ctx;
};

$.fn.extend({
    each: function(cb){
        return $.each(this, cb);
    }
});


// Source: src/data.js

/*
 * Data routines
 * Url: https://jquery.com
 * Copyright (c) Copyright JS Foundation and other contributors, https://js.foundation/
 * Licensed under MIT
 */
var Data = function(ns){
    this.expando = "DATASET:UID:" + ns.toUpperCase();
    Data.uid++;
};

Data.uid = -1;

Data.prototype = {
    cache: function(owner){
        var value = owner[this.expando];
        if (!value) {
            value = {};
            if (acceptData(owner)) {
                if (owner.nodeType) {
                    owner[this.expando] = value;
                } else {
                    Object.defineProperty(owner, this.expando, {
                        value: value,
                        configurable: true
                    });
                }
            }
        }
        return value;
    },

    set: function(owner, data, value){
        var prop, cache = this.cache(owner);

        if (typeof data === "string") {
            cache[camelCase(data)] = value;
        } else {
            for (prop in data) {
                if (data.hasOwnProperty(prop))
                    cache[camelCase(prop)] = data[prop];
            }
        }
        return cache;
    },

    get: function(owner, key){
        return key === undefined ? this.cache(owner) : owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
    },

    access: function(owner, key, value){
        if (key === undefined || ((key && typeof key === "string") && value === undefined) ) {
            return this.get(owner, key);
        }
        this.set(owner, key, value);
        return value !== undefined ? value : key;
    },

    remove: function(owner, key){
        var i, cache = owner[this.expando];
        if (cache === undefined) {
            return ;
        }
        if (key !== undefined) {
            if ( Array.isArray( key ) ) {
                key = key.map( camelCase );
            } else {
                key = camelCase( key );

                key = key in cache ? [ key ] : ( key.match( /[^\x20\t\r\n\f]+/g ) || [] ); // ???
            }

            i = key.length;

            while ( i-- ) {
                delete cache[ key[ i ] ];
            }
        }
        if ( key === undefined || isEmptyObject( cache ) ) {
            if ( owner.nodeType ) {
                owner[ this.expando ] = undefined;
            } else {
                delete owner[ this.expando ];
            }
        }
        return true;
    },

    hasData: function(owner){
        var cache = owner[ this.expando ];
        return cache !== undefined && !isEmptyObject( cache );
    }
};

var dataSet = new Data('m4q');

$.extend({
    hasData: function(elem){
        return dataSet.hasData(elem);
    },

    data: function(elem, key, val){
        return dataSet.access(elem, key, val);
    },

    removeData: function(elem, key){
        return dataSet.remove(elem, key);
    },

    dataSet: function(ns){
        if (not(ns)) return dataSet;
        if (['INTERNAL', 'M4Q'].indexOf(ns.toUpperCase()) > -1) {
            throw Error("You can not use reserved name for your dataset");
        }
        return new Data(ns);
    }
});

$.fn.extend({
    data: function(key, val){
        var res, elem, data, attrs, name, i;

        if (this.length === 0) {
            return ;
        }

        elem = this[0];

        if ( arguments.length === 0 ) {
            if ( this.length ) {
                data = dataSet.get( elem );

                if ( elem.nodeType === 1) {
                    attrs = elem.attributes;
                    i = attrs.length;
                    while ( i-- ) {
                        if ( attrs[ i ] ) {
                            name = attrs[ i ].name;
                            if ( name.indexOf( "data-" ) === 0 ) {
                                name = camelCase( name.slice( 5 ) );
                                dataAttr( elem, name, data[ name ] );
                            }
                        }
                    }
                }
            }

            return data;
        }

        if ( arguments.length === 1 ) {
            res = dataSet.get(elem, key);
            if (res === undefined) {
                if ( elem.nodeType === 1) {
                    if (elem.hasAttribute("data-"+key)) {
                        res = elem.getAttribute("data-"+key);
                    }
                }
            }
            return res;
        }

        return this.each( function() {
            dataSet.set( this, key, val );
        } );
    },

    removeData: function( key ) {
        return this.each( function() {
            dataSet.remove( this, key );
        } );
    },

    origin: function(name, value, def){

        if (this.length === 0) {
            return this;
        }

        if (not(name) && not(value)) {
            return $.data(this[0]);
        }

        if (not(value)) {
            var res = $.data(this[0], "origin-"+name);
            return !not(res) ? res : def;
        }

        this.data("origin-"+name, value);

        return this;
    }
});

// Source: src/utils.js

$.extend({
    uniqueId: function () {
        var d = new Date().getTime();
        return 'm4q-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },

    toArray: function(n){
        var i, out = [];

        for (i = 0 ; i < n.length; i++ ) {
            out.push(n[i]);
        }

        return out;
    },

    import: function(ctx){
        var res = [];
        this.each(ctx, function(){
            res.push(this);
        });
        return this.merge($(), res);
    },

    merge: function( first, second ) {
        var len = +second.length,
            j = 0,
            i = first.length;

        for ( ; j < len; j++ ) {
            first[ i++ ] = second[ j ];
        }

        first.length = i;

        return first;
    },

    type: function(obj){
        return Object.prototype.toString.call(obj).replace(/^\[object (.+)]$/, '$1').toLowerCase();
    },

    sleep: function(ms) {
        ms += new Date().getTime();
        while (new Date() < ms){}
    },

    isSelector: function(selector){
        if (typeof(selector) !== 'string') {
            return false;
        }
        if (selector.indexOf("<") !== -1) {
            return false;
        }
        try {
            $(selector);
        } catch(error) {
            return false;
        }
        return true;
    },

    remove: function(s){
        return $(s).remove();
    },

    camelCase: function(string){return camelCase(string);},
    isPlainObject: function(obj){return isPlainObject(obj);},
    isEmptyObject: function(obj){return isEmptyObject(obj);},
    isArrayLike: function(obj){return isArrayLike(obj);},
    acceptData: function(owner){return acceptData(owner);},
    not: function(val){return not(val)},
    parseUnit: function(str, out){return parseUnit(str, out)},
    unit: function(str, out){return parseUnit(str, out)},
    isVisible: function(elem) {return isVisible(elem)},
    isHidden: function(elem) {return isHidden(elem)},
    iif: function(v1, v2, v3){return iif(v1, v2, v3);}
});

$.fn.extend({
    items: function(){
        return $.toArray(this);
    }
});

// Source: src/events.js

(function () {
    if ( typeof window.CustomEvent === "function" ) return false;

    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

var overriddenStop =  Event.prototype.stopPropagation;
var overriddenPrevent =  Event.prototype.preventDefault;

Event.prototype.stopPropagation = function(){
    this.isPropagationStopped = true;
    overriddenStop.apply(this, arguments);
};
Event.prototype.preventDefault = function(){
    this.isPreventedDefault = true;
    overriddenPrevent.apply(this, arguments);
};

Event.prototype.stop = function(immediate){
    return immediate ? this.stopImmediatePropagation() : this.stopPropagation();
};

$.extend({
    events: [],
    eventHooks: {},

    eventUID: -1,

    /*
    * el, eventName, handler, selector, ns, id
    * */
    setEventHandler: function(obj){
        var i, freeIndex = -1, eventObj, resultIndex;
        if (this.events.length > 0) {
            for(i = 0; i < this.events.length; i++) {
                if (this.events[i].handler === null) {
                    freeIndex = i;
                    break;
                }
            }
        }

        eventObj = {
            element: obj.el,
            event: obj.event,
            handler: obj.handler,
            selector: obj.selector,
            ns: obj.ns,
            id: obj.id
        };

        if (freeIndex === -1) {
            this.events.push(eventObj);
            resultIndex = this.events.length - 1;
        } else {
            this.events[freeIndex] = eventObj;
            resultIndex = freeIndex;
        }

        return resultIndex;
    },

    getEventHandler: function(index){
        if (this.events[index] !== undefined && this.events[index] !== null) {
            this.events[index] = null;
            return this.events[index].handler;
        }
        return undefined;
    },

    off: function(){
        $.each(this.events, function(){
            this.element.removeEventListener(this.event, this.handler);
        });
        this.events = [];
        return this;
    },

    getEvents: function(){
        return this.events;
    },

    getEventHooks: function(){
        return this.eventHooks;
    },

    addEventHook: function(event, handler, type){
        if (not(type)) {
            type = "before";
        }
        $.each(str2arr(event), function(){
            this.eventHooks[camelCase(type+"-"+this)] = handler;
        });
        return this;
    },

    removeEventHook: function(event, type){
        if (not(type)) {
            type = "before";
        }
        $.each(str2arr(event), function(){
            delete this.eventHooks[camelCase(type+"-"+this)];
        });
        return this;
    },

    removeEventHooks: function(event){
        var that = this;
        if (not(event)) {
            this.eventHooks = {};
        } else {
            $.each(str2arr(event), function(){
                delete that.eventHooks[camelCase(type+"-"+this)];
            });
        }
        return this;
    }
});

$.fn.extend({
    on: function(eventsList, sel, handler, options){
        if (this.length === 0) {
            return ;
        }

        if (typeof sel === 'function') {
            options = handler;
            handler = sel;
            sel = undefined;
        }

        if (!isPlainObject(options)) {
            options = {};
        }

        return this.each(function(){
            var el = this;
            $.each(str2arr(eventsList), function(){
                var h, ev = this,
                    event = ev.split("."),
                    name = event[0],
                    ns = options.ns ? options.ns : event[1],
                    index, originEvent;

                $.eventUID++;

                h = function(e){
                    var target = e.target;
                    var beforeHook = $.eventHooks[camelCase("before-"+name)];
                    var afterHook = $.eventHooks[camelCase("after-"+name)];

                    if (typeof beforeHook === "function") {
                        beforeHook.call(target, e);
                    }

                    if (!sel) {
                        handler.call(target, e);
                    } else {
                        while (target && target !== el) {
                            if (matches.call(target, sel)) {
                                handler.call(target, e);
                                if (e.isPropagationStopped) {
                                    break;
                                }
                            }
                            target = target.parentNode;
                        }
                    }

                    if (typeof afterHook === "function") {
                        afterHook.call(target, e);
                    }

                    if (options.once) {
                        index = +$(el).origin( "event-"+e.type+(sel ? ":"+sel:"")+(ns ? ":"+ns:"") );
                        if (!isNaN(index)) $.events.splice(index, 1);
                    }
                };

                Object.defineProperty(h, "name", {
                    value: handler.name.trim() !== "" ? handler.name : "func_event_"+name+"_"+$.eventUID
                });

                originEvent = name+(sel ? ":"+sel:"")+(ns ? ":"+ns:"");

                if (options.capture === undefined) {
                    options.capture = false;
                }

                el.addEventListener(name, h, options);

                index = $.setEventHandler({
                    el: el,
                    event: name,
                    handler: h,
                    selector: sel,
                    ns: ns,
                    id: $.eventUID
                });
                $(el).origin('event-'+originEvent, index);
            });
        });
    },

    one: function(events, sel, handler, options){
        if (!isPlainObject(options)) {
            options = {};
        }

        options.once = true;

        return this["on"].apply(this, [events, sel, handler, options]);
    },

    off: function(eventsList, sel, options){
        if (!isPlainObject(options)) {
            options = {};
        }

        if (isPlainObject(sel)) {
            options = sel;
            sel = null;
        }

        if (not(eventsList) || eventsList.toLowerCase() === 'all') {
            return this.each(function(){
                var el = this;
                $.each($.events, function(){
                    var e = this;
                    if (e.element === el) {
                        el.removeEventListener(e.event, e.handler);
                        e.handler = null;
                        $(el).origin("event-"+name+(e.selector ? ":"+e.selector:"")+(e.ns ? ":"+e.ns:""), null);
                    }
                })
            });
        }

        return this.each(function(){
            var el = this;
            $.each(str2arr(eventsList), function(){
                var evMap = this.split("."),
                    name = evMap[0],
                    ns = options.ns ? options.ns : evMap[1],
                    originEvent, index;

                originEvent = "event-"+name+(sel ? ":"+sel:"")+(ns ? ":"+ns:"");
                index = $(el).origin(originEvent);

                if (index !== undefined && $.events[index].handler) {
                    el.removeEventListener(name, $.events[index].handler);
                    $.events[index].handler = null;
                }

                $(el).origin(originEvent, null);
            });
        });
    },

    trigger: function(name, data){
        if (this.length === 0) {
            return ;
        }

        if (['focus', 'blur'].indexOf(name) > -1) {
            this[0][name]();
            return this;
        }

        var e = new CustomEvent(name, data || {});

        return this.each(function(){
            this.dispatchEvent(e);
        });
    },

    fire: function(name, data){
        if (this.length === 0) {
            return ;
        }

        if (['focus', 'blur'].indexOf(name) > -1) {
            this[0][name]();
            return this;
        }

        var e = document.createEvent('Events');
        e.detail = data;
        e.initEvent(name, true, false);

        return this.each(function(){
            this.dispatchEvent(e);
        });
    }
});

( "blur focus resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu touchstart touchend touchmove touchcancel" )
    .split( " " )
    .forEach(
    function( name ) {
        $.fn[ name ] = function( sel, fn, opt ) {
            return arguments.length > 0 ?
                this.on( name, sel, fn, opt ) :
                this.trigger( name );
        };
});

$.fn.extend( {
    hover: function( fnOver, fnOut ) {
        return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
    }
});

$.ready = function(fn){
    document.addEventListener('DOMContentLoaded', fn);
};

$.load = function(fn){
    return $(window).on("load", fn);
};

$.unload = function(fn){
    return $(window).on("unload", fn);
};

$.fn.extend({
    unload: function(fn){
        return (this.length === 0 || this[0]['self'] !== window) ? undefined : $.unload(fn);
    }
});

$.beforeunload = function(fn){
    if (typeof fn === "string") {
        return $(window).on("beforeunload", function(e){
            e.returnValue = fn;
            return fn;
        });
    } else {
        return $(window).on("beforeunload", fn);
    }
};

$.fn.extend({
    beforeunload: function(fn){
        return (this.length === 0 || this[0]['self'] !== window) ? undefined : $.beforeunload(fn);
    }
});


// Source: src/ajax.js

$.ajax = function(p){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest(), data;
        var method = (p.method || 'GET').toUpperCase();
        var headers = [];
        var async = not(p.async) ? true : p.async;
        var url = p.url;

        var exec = function(fn, params){
            if (typeof fn === "function") fn.apply(null, params);
        };

        if (p.data instanceof HTMLFormElement) {
            var _action = p.data.getAttribute("action");
            var _method = p.data.getAttribute("method");

            if (not(url) && _action && _action.trim() !== "") url = _action;
            if (_method && _method.trim() !== "") method = _method.toUpperCase();
        }

        xhr.open(method, url, async, p.user, p.password);

        if (p.timeout) {
            xhr.timeout = p.timeout;
        }

        if (p.withCredentials) {
            xhr.withCredentials = p.withCredentials;
        }

        if (p.headers) {
            $.each(function(k, v){
                xhr.setRequestHeader(k, v);
                headers.push(k);
            });
        }

        if (p.data instanceof HTMLFormElement) {
            data = new FormData(p.data);
        } else if (p.data instanceof HTMLElement && p.data.getAttribute("type").toLowerCase() === "file") {
            var _name = p.data.getAttribute("name");
            data = new FormData();
            for (var i = 0; i < p.data.files.length; i++) {
                data.append(_name, p.data.files[i]);
            }
        } else if (isPlainObject(p.data)) {
            var _data = [];
            $.each(p.data, function(k, v){
                _data.push(k+"="+v);
            });
            data = _data.join("&");
            if (headers.indexOf("Content-type") === -1) {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
        } else if (p.data instanceof FormData) {
            data = p.data;
        } else {
            data = new FormData();
            data.append("_data", JSON.stringify(p.data));
        }

        xhr.send(data);

        xhr.addEventListener("load", function(e){
            if (xhr.readyState === 4 && xhr.status < 300) {
                var _return = p.returnValue && p.returnValue === 'xhr' ? xhr : p.parseJson ? JSON.parse(xhr.response) : xhr.response;
                exec(resolve, [_return]);
                exec(p['onSuccess'], [e, xhr]);
            } else {
                exec(reject, [xhr]);
                exec(p['onFail'], [e, xhr]);
            }
            exec(p['onLoad'], [e, xhr]);
        });

        $.each(["readystatechange", "error", "timeout", "progress", "loadstart", "loadend", "abort"], function(){
            var ev = camelCase("on-"+(this === 'readystatechange' ? 'state' : this));
            xhr.addEventListener(ev, function(e){
                exec(p[ev], [e, xhr]);
            });
        });
    });
};

['get', 'post', 'put', 'patch', 'delete', 'json'].forEach(function(method){
    $[method] = function(url, data, options){
        var _method = method.toUpperCase();
        var _options = {
            method: _method === 'JSON' ? 'GET' : _method,
            url: url,
            data: data,
            parseJson: _method === 'JSON'
        };
        return $.ajax($.extend({}, _options, options));
    }
});

$.fn.extend({
    load: function(url, data, options){
        var that = this;

        if (this[0]['self'] === window ) {
            return $.load(url);
        }

        return $.get(url, data, options).then(function(data){
            that.each(function(){
                this.innerHTML = data;
            });
        });
    }
});

// Source: src/css.js

$.fn.extend({

    style: function(name, pseudo){
        var el;

        function _getStyle(el, prop, pseudo){
            return ["scrollLeft", "scrollTop"].indexOf(prop) > -1 ? $(el)[prop]() : getComputedStyle(el, pseudo)[prop];
        }

        if (typeof name === 'string' && this.length === 0) {
            return undefined;
        }

        if (this.length === 0) {
            return this;
        }

        el = this[0];

        if (not(name) || name === "all") {
            return getComputedStyle(el, pseudo);
        } else {
            var result = {}, names = name.split(", ").map(function(el){
                return (""+el).trim();
            });
            if (names.length === 1)  {
                return _getStyle(el, names[0], pseudo);
            } else {
                $.each(names, function () {
                    var prop = this;
                    result[this] = _getStyle(el, prop, pseudo);
                });
                return result;
            }
        }
    },

    removeStyleProperty: function(name){
        if (not(name) || this.length === 0) return this;
        var names = name.split(", ").map(function(el){
            return (""+el).trim();
        });

        return this.each(function(){
            var el = this;
            $.each(names, function(){
                el.style.removeProperty(this);
            });
        });
    },

    css: function(key, val){
        var that = this;

        key = key || 'all';

        if (typeof key === "string" && not(val)) {
            return  this.style(key);
        }

        return this.each(function(){
            var el = this;
            if (typeof key === "object") {
                $.each(key, function(key, val){
                    setStyleProp(el, key, val);
                });
            } else if (typeof key === "string") {
                setStyleProp(el, key, val);
            }
        });
    },

    scrollTop: function(val){
        if (not(val)) {
            return this.length === 0 ? undefined : this[0] === window ? pageYOffset : this[0].scrollTop;
        }
        return this.each(function(){
            this.scrollTop = val;
        })
    },

    scrollLeft: function(val){
        if (not(val)) {
            return this.length === 0 ? undefined : this[0] === window ? pageXOffset : this[0].scrollLeft;
        }
        return this.each(function(){
            this.scrollLeft = val;
        })
    }
});



// Source: src/classes.js

$.fn.extend({
    addClass: function(){},
    removeClass: function(){},
    toggleClass: function(){},

    containsClass: function(cls){
        return this.hasClass(cls);
    },

    hasClass: function(cls){
        var result = false;
        var classes = cls.split(" ").filter(function(v){
            return (""+v).trim() !== "";
        });

        if (not(cls)) {
            return false;
        }

        this.each(function(){
            var el = this;

            $.each(classes, function(){
                if (!result && el.classList && el.classList.contains(this)) {
                    result = true;
                }
            });
        });

        return result;
    },

    clearClasses: function(){
        return this.each(function(){
            this.className = "";
        });
    },

    cls: function(array){
        return this.length === 0 ? undefined : array ? this[0].className.split(" ") : this[0].className;
    }
});

['add', 'remove', 'toggle'].forEach(function (method) {
    $.fn[method + "Class"] = function(cls){
        if (not(cls) || (""+cls).trim() === "") return this;
        return this.each(function(){
            var el = this;
            $.each(cls.split(" ").filter(function(v){
                return (""+v).trim() !== "";
            }), function(){
                if (el.classList) el.classList[method](this);
            });
        });
    }
});


// Source: src/parser.js

$.parseHTML = function(data, context){
    var base, singleTag, result = [], ctx, _context;

    if (typeof data !== "string") {
        return [];
    }

    data = data.trim();

    ctx = document.implementation.createHTMLDocument("");
    base = ctx.createElement( "base" );
    base.href = document.location.href;
    ctx.head.appendChild( base );
    _context = ctx.body;

    singleTag = regexpSingleTag.exec(data);

    if (singleTag) {
        result.push(document.createElement(singleTag[1]));
    } else {
        _context.innerHTML = data;
        for(var i = 0; i < _context.childNodes.length; i++) {
            result.push(_context.childNodes[i]);
        }
    }

    if (context && !(context instanceof $) && isPlainObject(context)) {
        $.each(result,function(){
            var el = this;
            for(var name in context) {
                if (context.hasOwnProperty(name))
                    el.setAttribute(name, context[name]);
            }
        });
    }

    return result;
};


// Source: src/size.js

$.fn.extend({
    _size: function(prop, val){
        if (this.length === 0) return ;

        if (not(val)) {

            var el = this[0];

            if (prop === 'height') {
                return el === window ? window.innerHeight : el === document ? el.body.clientHeight : parseInt(getComputedStyle(el)["height"]);
            }
            if (prop === 'width') {
                return el === window ? window.innerWidth : el === document ? el.body.clientWidth : parseInt(getComputedStyle(el)["width"]);
            }
        }

        return this.each(function(){
            var el = this;
            if (el === window || el === document) {return ;}
            el.style[prop] = isNaN(val) ? val : val + 'px';
        });
    },

    height: function(val){
        return this._size('height', val);
    },

    width: function(val){
        return this._size('width', val);
    },

    _sizeOut: function(prop, val){
        var el, size, style, result;

        if (this.length === 0) {
            return ;
        }

        if (!not(val) && typeof val !== "boolean") {
            return this.each(function(){
                var el = this;
                if (el === window || el === document) {return ;}
                var h, style = getComputedStyle(el),
                    bs = prop === 'width' ? parseInt(style['border-left-width']) + parseInt(style['border-right-width']) : parseInt(style['border-top-width']) + parseInt(style['border-bottom-width']),
                    pa = prop === 'width' ? parseInt(style['padding-left']) + parseInt(style['padding-right']) : parseInt(style['padding-top']) + parseInt(style['padding-bottom']);

                h = $(this)[prop](val)[prop]() - bs - pa;
                el.style[prop] = h + 'px';
            });
        }

        el = this[0];
        size = el[prop === 'width' ? 'offsetWidth' : 'offsetHeight'];
        style = getComputedStyle(el);
        result = size + parseInt(style[prop === 'width' ? 'margin-left' : 'margin-top']) + parseInt(style[prop === 'width' ? 'margin-right' : 'margin-bottom']);
        return val === true ? result : size;
    },

    outerWidth: function(val){
        return this._sizeOut('width', val);
    },

    outerHeight: function(val){
        return this._sizeOut('height', val);
    },

    padding: function(p){
        if (this.length === 0) return;
        var s = getComputedStyle(this[0], p);

        return {
            top: parseInt(s["padding-top"]),
            right: parseInt(s["padding-right"]),
            bottom: parseInt(s["padding-bottom"]),
            left: parseInt(s["padding-left"])
        }
    },

    margin: function(p){
        if (this.length === 0) return;
        var s = getComputedStyle(this[0], p);

        return {
            top: parseInt(s["margin-top"]),
            right: parseInt(s["margin-right"]),
            bottom: parseInt(s["margin-bottom"]),
            left: parseInt(s["margin-left"])
        }
    },

    border: function(p){
        if (this.length === 0) return;
        var s = getComputedStyle(this[0], p);

        return {
            top: parseInt(s["border-top-width"]),
            right: parseInt(s["border-right-width"]),
            bottom: parseInt(s["border-bottom-width"]),
            left: parseInt(s["border-left-width"])
        }
    }
});

// Source: src/position.js

$.fn.extend({
    offset: function(val){
        var rect;

        if (not(val)) {
            if (this.length === 0) return undefined;
            rect = this[0].getBoundingClientRect();
            return {
                top: rect.top + pageYOffset,
                left: rect.left + pageXOffset
            }
        }

        return this.each(function(){ //?
            var el = $(this),
                top = val.top,
                left = val.left,
                position = getComputedStyle(this)['position'],
                offset = el.offset();

            if (position === "static") {
                el.css("position", "relative");
            }

            if (["absolute", "fixed"].indexOf(position) === -1) {
                top = top - offset.top;
                left = left - offset.left;
            }

            el.css({
                top: top,
                left: left
            })
        });
    },

    position: function(margin){
        var ml = 0, mt = 0, el, style;

        if (not(margin)) {
            margin = false;
        } else {
            margin = getData(margin);
        }

        if (this.length === 0) {
            return undefined;
        }

        el = this[0];
        style = getComputedStyle(el);

        if (margin) {
            ml = parseInt(style['margin-left']);
            mt = parseInt(style['margin-top']);
        }

        return {
            left: el.offsetLeft - ml,
            top: el.offsetTop - mt
        }
    },

    left: function(val, margin){
        if (this.length === 0) return ;
        if (not(val)) {
            return this.position(margin).left;
        }
        if (typeof val === "boolean") {
            margin = val;
            return this.position(margin).left;
        }
        return this.each(function(){
            $(this).css({
                left: val
            })
        });
    },

    top: function(val, margin){
        if (this.length === 0) return ;
        if (not(val)) {
            return this.position(margin).top;
        }
        if (typeof val === "boolean") {
            margin = val;
            return this.position(margin).top;
        }
        return this.each(function(){
            $(this).css({
                top: val
            })
        });
    },

    coord: function(){
        return this.length === 0 ? undefined : this[0].getBoundingClientRect();
    },

    pos: function(){
        if (this.length === 0) return ;
        return {
            top: parseInt($(this[0]).style("top")),
            left: parseInt($(this[0]).style("left"))
        }
    }
});

// Source: src/attr.js

$.fn.extend({
    attr: function(name, val){
        var attributes = {};

        if (this.length === 0 && arguments.length === 0) {
            return undefined;
        }

        if (this.length && arguments.length === 0) {
            $.each(this[0].attributes, function(){
                attributes[this.nodeName] = this.nodeValue;
            });
            return attributes;
        }

        if (typeof name === 'string' && val === undefined) {
            return this.length && this[0].nodeType === 1 && this[0].hasAttribute(name) ? this[0].getAttribute(name) : undefined;
        }

        return this.each(function(){
            var el = this;
            if (isPlainObject(name)) {
                $.each(name, function(k, v){
                    el.setAttribute(k, v);
                });
            } else {
                el.setAttribute(name, val);
                // console.log(name, val);
            }
        });
    },

    removeAttr: function(name){
        var attributes;

        if (not(name)) {
            return this.each(function(){
                var el = this;
                $.each(this.attributes, function(){
                    el.removeAttribute(this);
                })
            });
        }

        attributes = typeof name === "string" ? name.split(",").map(function(el){
            return el.trim();
        }) : name;

        return this.each(function(){
            var el = this;
            $.each(attributes, function(){
                if (el.hasAttribute(this)) el.removeAttribute(this);
            });
        });
    },

    toggleAttr: function(name, val){
        return this.each(function(){
            var el = this;

            if (not(val)) {
                el.removeAttribute(name);
            } else {
                el.setAttribute(name, val);
            }

        });
    },

    id: function(val){
        return this.length ? $(this[0]).attr("id", val) : undefined;
    }
});

$.extend({
    meta: function(name){
        return not(name) ? $("meta") : $("meta[name='$name']".replace("$name", name));
    },

    metaBy: function(name){
        return not(name) ? $("meta") : $("meta[$name]".replace("$name", name));
    },

    doctype: function(){
        return $("doctype");
    },

    html: function(){
        return $("html");
    },

    charset: function(val){
        var meta = $("meta[charset]");
        if (val) {
            meta.attr("charset", val)
        }
        return meta.attr("charset");
    }
});

// Source: src/proxy.js

$.extend({
    proxy: function(fn, ctx){
        return typeof fn !== "function" ? undefined : fn.bind(ctx);
    },

    bind: function(fn, ctx){
        return this.proxy(fn, ctx);
    }
});


// Source: src/manipulation.js

(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('append')) {
            return;
        }
        Object.defineProperty(item, 'append', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function append() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function (argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.appendChild(docFrag);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('prepend')) {
            return;
        }
        Object.defineProperty(item, 'prepend', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function prepend() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function (argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.insertBefore(docFrag, this.firstChild);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

var normalizeElements = function(s){
    var result = undefined;
    if (typeof s === "string") result = $.isSelector(s) ? $(s) : $.parseHTML(s);
    else if (s instanceof HTMLElement) result = [s];
    else if (isArrayLike(s)) result = s;
    return result;
};

$.fn.extend({
    append: function(elements){
        var elems = normalizeElements(elements);

        return this.each(function(elIndex, el){
            $.each(elems, function(){
                var child = this;
                if (el === this) return ;
                el.append(elIndex === 0 ? child : child.cloneNode(true));
            });
        })
    },

    appendTo: function(elements){
        var elems = normalizeElements(elements);

        return this.each(function(){
            var el = this;
            $.each(elems, function(parIndex, parent){
                if (el === this) return ;
                parent.append(parIndex === 0 ? el : el.cloneNode(true));
            });
        })
    },

    prepend: function(elements){
        var elems = normalizeElements(elements);

        return this.each(function (elIndex, el) {
            $.each(elems, function(){
                var child = this;
                if (el === this) return ;
                el.prepend(elIndex === 0 ? child : child.cloneNode(true))
            });
        })
    },

    prependTo: function(elements){
        var elems = normalizeElements(elements);

        return this.each(function(){
            var el = this;
            $.each(elems, function(parIndex, parent){
                if (el === this) return ;
                $(parent).prepend(parIndex === 0 ? el : el.cloneNode(true));
            })
        })
    },

    insertBefore: function(elements){
        var elems = normalizeElements(elements);

        return this.each(function(){
            var el = this;
            $.each(elems, function(elIndex, element){
                if (el === this) return ;
                element.parentNode.insertBefore(elIndex === 0 ? el : el.cloneNode(true), element);
            });
        })
    },

    insertAfter: function(elements){
        var elems = normalizeElements(elements);

        return this.each(function(){
            var el = this;
            $.each(elems, function(elIndex, element){
                if (el === this) return ;
                element.parentNode.insertBefore(elIndex === 0 ? el : el.cloneNode(true), element.nextSibling);
            });
        });
    },

    after: function(html){
        return this.each(function(){
            var el = this;
            if (typeof html === "string") {
                el.insertAdjacentHTML('afterend', html);
            } else {
                $(html).insertAfter(el);
            }
        })
    },

    before: function(html){
        return this.each(function(){
            var el = this;
            if (typeof html === "string") {
                el.insertAdjacentHTML('beforebegin', html);
            } else {
                $(html).insertBefore(el);
            }
        });
    },

    clone: function(deep){
        var res = [];
        if (not(deep)) {
            deep = false;
        }
        this.each(function(){
            res.push(this.cloneNode(deep));
        });
        return $.merge($(), res);
    },

    import: function(deep){
        var res = [];
        if (not(deep)) {
            deep = false;
        }
        this.each(function(){
            res.push(document.importNode(this, deep));
        });
        return $.merge($(), res);
    },

    adopt: function(){
        var res = [];
        this.each(function(){
            res.push(document.adoptNode(this));
        });
        return $.merge($(), res);
    },

    remove: function(selector){
        var i = 0, node, out, res = [];

        if (this.length === 0) {
            return ;
        }

        out = selector ? this.filter(function(el){
            return matches.call(el, selector);
        }) : this.items();

        for ( ; ( node = out[ i ] ) != null; i++ ) {
            if (node.parentNode) {
                res.push(node.parentNode.removeChild(node));
                $.removeData(node);
            }
        }

        return $.merge($(), res);
    }
});

// Source: src/animation.js

var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;

var Easing = {

    def: "linear",

    linear: function( t ) {
        return t;
    },

    easeInSine: function( t ) {
        return -1 * Math.cos( t * ( Math.PI / 2 ) ) + 1;
    },

    easeOutSine: function( t ) {
        return Math.sin( t * ( Math.PI / 2 ) );
    },

    easeInOutSine: function( t ) {
        return -0.5 * ( Math.cos( Math.PI * t ) - 1 );
    },

    easeInQuad: function( t ) {
        return t * t;
    },

    easeOutQuad: function( t ) {
        return t * ( 2 - t );
    },

    easeInOutQuad: function( t ) {
        return t < 0.5 ? 2 * t * t : - 1 + ( 4 - 2 * t ) * t;
    },

    easeInCubic: function( t ) {
        return t * t * t;
    },

    easeOutCubic: function( t ) {
        var t1 = t - 1;
        return t1 * t1 * t1 + 1;
    },

    easeInOutCubic: function( t ) {
        return t < 0.5 ? 4 * t * t * t : ( t - 1 ) * ( 2 * t - 2 ) * ( 2 * t - 2 ) + 1;
    },

    easeInQuart: function( t ) {
        return t * t * t * t;
    },

    easeOutQuart: function( t ) {
        var t1 = t - 1;
        return 1 - t1 * t1 * t1 * t1;
    },

    easeInOutQuart: function( t ) {
        var t1 = t - 1;
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * t1 * t1 * t1 * t1;
    },

    easeInQuint: function( t ) {
        return t * t * t * t * t;
    },

    easeOutQuint: function( t ) {
        var t1 = t - 1;
        return 1 + t1 * t1 * t1 * t1 * t1;
    },

    easeInOutQuint: function( t ) {
        var t1 = t - 1;
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * t1 * t1 * t1 * t1 * t1;
    },

    easeInExpo: function( t ) {
        if( t === 0 ) {
            return 0;
        }
        return Math.pow( 2, 10 * ( t - 1 ) );
    },

    easeOutExpo: function( t ) {
        if( t === 1 ) {
            return 1;
        }

        return ( -Math.pow( 2, -10 * t ) + 1 );
    },

    easeInOutExpo: function( t ) {
        if( t === 0 || t === 1 ) {
            return t;
        }

        var scaledTime = t * 2;
        var scaledTime1 = scaledTime - 1;

        if( scaledTime < 1 ) {
            return 0.5 * Math.pow( 2, 10 * ( scaledTime1 ) );
        }

        return 0.5 * ( -Math.pow( 2, -10 * scaledTime1 ) + 2 );
    },

    easeInCirc: function( t ) {
        var scaledTime = t / 1;
        return -1 * ( Math.sqrt( 1 - scaledTime * t ) - 1 );
    },

    easeOutCirc: function( t ) {
        var t1 = t - 1;
        return Math.sqrt( 1 - t1 * t1 );
    },

    easeInOutCirc: function( t ) {
        var scaledTime = t * 2;
        var scaledTime1 = scaledTime - 2;

        if( scaledTime < 1 ) {
            return -0.5 * ( Math.sqrt( 1 - scaledTime * scaledTime ) - 1 );
        }

        return 0.5 * ( Math.sqrt( 1 - scaledTime1 * scaledTime1 ) + 1 );
    },

    easeInBack: function(t, m) {
        m = m || 1.70158;
        return t * t * ( ( m + 1 ) * t - m );
    },

    easeOutBack: function(t, m) {
        m = m || 1.70158;
        var scaledTime = ( t / 1 ) - 1;

        return (
            scaledTime * scaledTime * ( ( m + 1 ) * scaledTime + m )
        ) + 1;
    },

    easeInOutBack: function( t, m ) {
        m = m || 1.70158;
        var scaledTime = t * 2;
        var scaledTime2 = scaledTime - 2;
        var s = m * 1.525;

        if( scaledTime < 1) {
            return 0.5 * scaledTime * scaledTime * (
                ( ( s + 1 ) * scaledTime ) - s
            );
        }

        return 0.5 * (
            scaledTime2 * scaledTime2 * ( ( s + 1 ) * scaledTime2 + s ) + 2
        );
    },

    easeInElastic: function( t, m ) {
        m  = m || 0.7;
        if( t === 0 || t === 1 ) {
            return t;
        }

        var scaledTime = t / 1;
        var scaledTime1 = scaledTime - 1;

        var p = 1 - m;
        var s = p / ( 2 * Math.PI ) * Math.asin( 1 );

        return -(
            Math.pow( 2, 10 * scaledTime1 ) *
            Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p )
        );
    },

    easeOutElastic: function( t, m ) {
        m = m || 0.7;
        var p = 1 - m;
        var scaledTime = t * 2;

        if( t === 0 || t === 1 ) {
            return t;
        }

        var s = p / ( 2 * Math.PI ) * Math.asin( 1 );
        return (
            Math.pow( 2, -10 * scaledTime ) *
            Math.sin( ( scaledTime - s ) * ( 2 * Math.PI ) / p )
        ) + 1;

    },

    easeInOutElastic: function( t, m ) {
        m = m || 0.65;
        var p = 1 - m;

        if( t === 0 || t === 1 ) {
            return t;
        }

        var scaledTime = t * 2;
        var scaledTime1 = scaledTime - 1;

        var s = p / ( 2 * Math.PI ) * Math.asin( 1 );

        if( scaledTime < 1 ) {
            return -0.5 * (
                Math.pow( 2, 10 * scaledTime1 ) *
                Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p )
            );
        }

        return (
            Math.pow( 2, -10 * scaledTime1 ) *
            Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p ) * 0.5
        ) + 1;

    },

    easeOutBounce: function( t ) {
        var scaledTime2, scaledTime = t / 1;

        if( scaledTime < ( 1 / 2.75 ) ) {

            return 7.5625 * scaledTime * scaledTime;

        } else if( scaledTime < ( 2 / 2.75 ) ) {

            scaledTime2 = scaledTime - ( 1.5 / 2.75 );
            return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.75;

        } else if( scaledTime < ( 2.5 / 2.75 ) ) {

            scaledTime2 = scaledTime - ( 2.25 / 2.75 );
            return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.9375;

        } else {

            scaledTime2 = scaledTime - ( 2.625 / 2.75 );
            return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.984375;

        }
    },

    easeInBounce: function( t ) {
        return 1 - Easing.easeOutBounce( 1 - t );
    },

    easeInOutBounce: function( t ) {
        if( t < 0.5 ) {
            return Easing.easeInBounce( t * 2 ) * 0.5;
        }
        return ( Easing.easeOutBounce( ( t * 2 ) - 1 ) * 0.5 ) + 0.5;
    }
};

$.easing = {};

$.extend($.easing, Easing);

$.extend({
    animate: function(el, draw, dur, timing, cb){
        var $el = $(el), start = performance.now();
        var key, from, to, delta, unit, mapProps = {};

        if (dur === 0 || $.fx.off) {
            dur = 1;
        }

        dur = dur || 300;
        timing = timing || this.easing.def;

        if (typeof dur === "function") {
            cb = dur;
            dur = 300;
            timing = "linear";
        }

        if (typeof timing === "function") {
            cb = timing;
            timing = this.easing.def
        }

        $el.origin("animation-stop", 0);

        if (isPlainObject(draw)) {
            // TODO add prop value as array [from, to]
            for (key in draw) {
                if (draw.hasOwnProperty(key)) {
                    if (!Array.isArray(draw[key])) {
                        from = parseUnit($el.style(key));
                        to = parseUnit(draw[key]);
                    } else {
                        from = parseUnit(draw[key][0]);
                        to = parseUnit(draw[key][1]);
                    }
                    unit = to[1] === '' && numProps.indexOf(key)===-1 ? 'px' : to[1];
                    delta = to[0] - from[0];
                    mapProps[key] = [from[0], to[0], delta, unit];
                }
            }
        }

        $el.origin("animation", requestAnimationFrame(function animate(time) {
            var p, t;
            var stop = $el.origin("animation-stop");

            if ( stop > 0) {

                if (stop === 2) {
                    if (typeof draw === "function") {
                        $.proxy(draw, $el[0])(1, 1);
                    } else if (isPlainObject(draw)) {
                        (function(t, p){

                            for (key in mapProps) {
                                if (mapProps.hasOwnProperty(key)) {
                                    $el.css(key, mapProps[key][0] + (mapProps[key][2] * p) + mapProps[key][3]);
                                }
                            }

                        })(1, 1);
                    }
                }

                cancelAnimationFrame($(el).origin("animation"));

                if (typeof cb === "function") {
                    $.proxy(cb, $el[0])();
                }

                return;
            }

            t = (time - start) / dur;

            if (t > 1) t = 1;
            if (t < 0) t = 0;

            var fn = typeof timing === "string" ? $.easing[timing] ? $.easing[timing] : $.easing[$.easing.def] : timing;

            p = fn(t);

            if (typeof draw === "function") {

                $.proxy(draw, $el[0])(t, p);

            } else if (isPlainObject(draw)) {

                (function(t, p){

                    for (key in mapProps) {
                        if (mapProps.hasOwnProperty(key)) {
                            $el.css(key, mapProps[key][0] + (mapProps[key][2] * p) + mapProps[key][3]);
                        }
                    }

                })(t, p);

            } else {
                throw new Error("Unknown draw object. Must be a function or plain object");
            }

            if (t === 1 && typeof cb === "function") {
                $.proxy(cb, $el[0])();
            }
            if (t < 1) {
                $el.origin("animation", requestAnimationFrame(animate));
            }
        }));
        return this;
    },

    stop: function(el, done){
        $(el).origin("animation-stop", done === true ? 2 : 1);
    }
});

$.fn.extend({
    animate: function (draw, dur, timing, cb) {
        return this.each(function(){
            return $.animate(this, draw, dur, timing, cb);
        })
    },

    stop: function(done){
        return this.each(function(){
            return $.stop(this, done);
        })
    }
});



// Source: src/visibility.js

$.extend({
    hidden: function(el, val, cb){
        el = $(el)[0];

        if (typeof val === "string") {
            val = val.toLowerCase() === "true";
        }

        if (typeof val === "function") {
            cb = val;
            val = !el.hidden;
        }

        el.hidden = val;

        if (typeof cb === "function") {
            $.bind(cb, el);
            cb.call(el, arguments);
        }

        return this;
    },

    hide: function(el, cb){
        var $el = $(el);
        if (!!el.style.display) {
            $el.origin('display', (el.style.display ? el.style.display : getComputedStyle(el, null)['display']));
        }
        el.style.display = 'none';
        if (typeof cb === "function") {
            $.bind(cb, el);
            cb.call(el, arguments);
        }
        return this;
    },

    show: function(el, cb){
        var display = $(el).origin('display', undefined, "block");
        el.style.display = display ? display === 'none' ? 'block' : display : '';
        if (parseInt(el.style.opacity) === 0) {
            el.style.opacity = "1";
        }
        if (typeof cb === "function") {
            $.bind(cb, el);
            cb.call(el, arguments);
        }
        return this;
    },

    visible: function(el, mode, cb){
        if (mode === undefined) {
            mode = true;
        }
        el.style.visibility = mode ? 'visible' : 'hidden';
        if (typeof cb === "function") {
            $.bind(cb, el);
            cb.call(el, arguments);
        }
        return this;
    },

    toggle: function(el, cb){
        var func;
        if ( getComputedStyle(el, null)['display'] !== 'none') {
            func = 'hide';
        } else {
            func = 'show';
        }
        return $[func](el, cb);
    }
});

$.fn.extend({
    hide: function(cb){
        var callback = undefined;

        $.each(arguments, function(){
            if (typeof this === 'function') {
                callback = this;
            }
        });

        return this.each(function(){
            $.hide(this, callback);
        });
    },

    show: function(cb){
        var callback = undefined;

        $.each(arguments, function(){
            if (typeof this === 'function') {
                callback = this;
            }
        });

        return this.each(function(){
            $.show(this, callback);
        });
    },

    visible: function(mode, cb){
        return this.each(function(){
            $.visible(this, mode, cb);
        });
    },

    toggle: function(cb){
        return this.each(function(){
            $.toggle(this, cb);
        })
    },

    hidden: function(val, cb){
        return this.each(function(){
            $.hidden(this, val, cb);
        })
    }
});



// Source: src/effects.js

$.extend({
    fx: {
        off: false
    },

    fadeIn: function(el, dur, easing, cb) {
        var $el = $(el);

        if (!isVisible($el[0]) || (isVisible($el[0]) && parseInt($el.style('opacity')) === 0)) {

            if (not(dur) && not(easing) && not(cb)) {
                cb = null;
                dur = 1000;
            } else if (typeof dur === "function") {
                cb = dur;
                dur = 1000;
            }

            if (typeof easing === "function") {
                cb = easing;
                easing = "linear";
            }

            var originDisplay = $(el).origin("display", undefined, 'block');

            el.style.opacity = "0";
            el.style.display = originDisplay;

            return this.animate(el, {
                opacity: 1
            }, dur, easing, function () {
                this.style.removeProperty('opacity');

                if (typeof cb === 'function') {
                    $.proxy(cb, this)();
                }
            });
        }

        return this;
    },

    fadeOut: function(el, dur, easing, cb){
        var $el = $(el);

        if ( !isVisible($el[0]) ) return ;

        if (not(dur) && not(easing) && not(cb)) {
            cb = null;
            dur = 1000;
        } else
        if (typeof dur === "function") {
            cb = dur;
            dur = 1000;
        }
        if (typeof easing === "function") {
            cb = easing;
            easing = "linear";
        }

        $el.origin("display", $(el).style('display'));

        return this.animate(el, {
            opacity: 0
        }, dur, easing, function(){
            this.style.display = 'none';
            this.style.removeProperty('opacity');

            if (typeof cb === 'function') {
                $.proxy(cb, this)();
            }
        });
    },

    slideDown: function(el, dur, easing, cb) {
        var $el = $(el);
        var targetHeight, originDisplay;

        if (!isNaN($el.height()) && $el.height() !== 0) return ;

        if (not(dur) && not(easing) && not(cb)) {
            cb = null;
            dur = 100;
        } else
        if (typeof dur === "function") {
            cb = dur;
            dur = 100;
        }
        if (typeof easing === "function") {
            cb = easing;
            easing = "linear";
        }

        $el.show().visible(false);
        targetHeight = $el.origin("height", undefined, $el.height());
        originDisplay = $el.origin("display", $(el).style('display'), "block");
        $el.height(0).visible(true);

        $el.css({
            overflow: "hidden",
            display: originDisplay === "none" ? "block" : originDisplay
        });

        return this.animate(el, function(t, p){
            el.style.height = (targetHeight * p) + "px";
            if (t === 1) {
                $(el).removeStyleProperty("overflow, height, visibility");
            }
        }, dur, easing, cb);
    },

    slideUp: function(el, dur, easing, cb) {
        var $el = $(el);
        var currHeight;

        if ($el.height() === 0) return ;

        if (not(dur) && not(easing) && not(cb)) {
            cb = null;
            dur = 100;
        } else
        if (typeof dur === "function") {
            cb = dur;
            dur = 100;
        }
        if (typeof easing === "function") {
            cb = easing;
            easing = "linear";
        }

        currHeight = $el.height();
        $el.origin("height", currHeight);
        $el.origin("display", $(el).style('display'));

        $el.css({
            overflow: "hidden"
        });

        return this.animate(el, function(t, p){
            el.style.height = (1 - p) * currHeight + 'px';
            if (t === 1) {
                $el.hide().removeStyleProperty("overflow, height");
            }
        }, dur, easing, cb);
    }
});

$.fn.extend({
    fadeIn: function(dur, easing, cb){
        return this.each(function(){
            $.fadeIn(this, dur, easing, cb);
        })
    },

    fadeOut: function(dur, easing, cb){
        return this.each(function(){
            $.fadeOut(this, dur, easing, cb);
        })
    },

    slideUp: function(dur, easing, cb){
        return this.each(function(){
            $.slideUp(this, dur, easing, cb);
        })
    },

    slideDown: function(dur, easing, cb){
        return this.each(function(){
            $.slideDown(this, dur, easing, cb);
        })
    }
});

// Source: src/init.js

$.init = function(sel, ctx){
    var parsed;

    this.uid = $.uniqueId();

    if (!sel) {
        return this;
    }

    if (typeof sel === "function") {
        return $.ready(sel);
    }

    if (typeof sel === "object" && typeof jQuery !== "undefined" && sel instanceof jQuery) {
        return $.import(sel);
    }

    if (typeof sel === 'string' && sel === "document") {
        sel = document;
    }

    if (typeof sel === 'string' && sel === "body") {
        sel = document.body;
    }

    if (typeof sel === 'string' && sel === "html") {
        sel = document.documentElement;
    }

    if (typeof sel === 'string' && sel === "doctype") {
        sel = document.doctype;
    }

    if (sel && (sel.nodeType || sel.self === window)) {
        this[0] = sel;
        this.length = 1;
        return this;
    }

    if (sel instanceof $) {
        var r = $();
        $.each(sel, function(){
            r.push(this);
        });
        return r;
    }

    if (typeof sel === "object") {
        return sel;
    }

    if (typeof sel === "string") {

        sel = sel.trim();

        if (sel === "#" || sel === ".") {
            throw new Error("sel can't be # or .") ;
        }

        parsed = $.parseHTML(sel, ctx);

        if (parsed.length === 1 && parsed[0].nodeType === 3) { // Must be a text node -> css sel
            [].push.apply(this, document.querySelectorAll(sel));
        } else {
            $.merge(this, parsed);
        }
    }

    if (ctx !== undefined && (ctx instanceof $ || ctx instanceof HTMLElement)) {
        this.each(function(){
            $(ctx).append($(this))
        });
    }

    return this;
};

$.init.prototype = $.fn;


// Source: src/populate.js

var _$ = global.$,
    _m4q = global.m4q;

$.Promise = Promise;

global.m4q = $;

if (typeof global.$ === "undefined") {
    global.$ = $;
}

m4q.global = function(){
    _$ = global.$;
    _m4q = global.m4q;
    global.$ = $;
};

m4q.noConflict = function() {
    if ( global.$ === $ ) {
        global.$ = _$;
    }

    return $;
};

}(window));


var $ = m4q;

if (typeof m4q === 'undefined') {
    throw new Error('Metro 4 requires m4q helper!');
}

if (!'MutationObserver' in window) {
    throw new Error('Metro 4 requires MutationObserver!');
}

var meta_init = $.meta('metro4:init').attr("content");
var meta_locale = $.meta('metro4:locale').attr("content");
var meta_week_start = $.meta('metro4:week_start').attr("content");
var meta_date_format = $.meta('metro4:date_format').attr("content");
var meta_date_format_input = $.meta('metro4:date_format_input').attr("content");
var meta_animation_duration = $.meta('metro4:animation_duration').attr("content");
var meta_callback_timeout = $.meta('metro4:callback_timeout').attr("content");
var meta_timeout = $.meta('metro4:timeout').attr("content");
var meta_scroll_multiple = $.meta('metro4:scroll_multiple').attr("content");
var meta_cloak = $.meta('metro4:cloak').attr("content"); //default or fade
var meta_cloak_duration = $.meta('metro4:cloak_duration').attr("content"); //100

var meta_jquery = $.meta('metro4:jquery').attr("content"); //undefined
window.jquery_present = typeof jQuery !== "undefined";
if (window.METRO_JQUERY === undefined) {
    window.METRO_JQUERY = meta_jquery !== undefined ? JSON.parse(meta_jquery) : true;
}

/* Added by Ken Kitay https://github.com/kens-code*/
var meta_about = $.meta('metro4:about').attr("content");
if (window.METRO_SHOW_ABOUT === undefined) {
    window.METRO_SHOW_ABOUT = meta_about !== undefined ? JSON.parse(meta_about) : true;
}
/* --- end ---*/

var meta_compile = $.meta('metro4:compile').attr("content");
if (window.METRO_SHOW_COMPILE_TIME === undefined) {
    window.METRO_SHOW_COMPILE_TIME = meta_compile !== undefined ? JSON.parse(meta_compile) : true;
}

if (window.METRO_INIT === undefined) {
    window.METRO_INIT = meta_init !== undefined ? JSON.parse(meta_init) : true;
}
if (window.METRO_DEBUG === undefined) {window.METRO_DEBUG = true;}

if (window.METRO_WEEK_START === undefined) {
    window.METRO_WEEK_START = meta_week_start !== undefined ? parseInt(meta_week_start) : 0;
}
if (window.METRO_DATE_FORMAT === undefined) {
    window.METRO_DATE_FORMAT = meta_date_format !== undefined ? meta_date_format : "%Y-%m-%d";
}
if (window.METRO_DATE_FORMAT_INPUT === undefined) {
    window.METRO_DATE_FORMAT_INPUT = meta_date_format_input !== undefined ? meta_date_format_input : "%Y-%m-%d";
}
if (window.METRO_LOCALE === undefined) {
    window.METRO_LOCALE = meta_locale !== undefined ? meta_locale : 'en-US';
}
if (window.METRO_ANIMATION_DURATION === undefined) {
    window.METRO_ANIMATION_DURATION = meta_animation_duration !== undefined ? parseInt(meta_animation_duration) : 100;
}
if (window.METRO_CALLBACK_TIMEOUT === undefined) {
    window.METRO_CALLBACK_TIMEOUT = meta_callback_timeout !== undefined ? parseInt(meta_callback_timeout) : 500;
}
if (window.METRO_TIMEOUT === undefined) {
    window.METRO_TIMEOUT = meta_timeout !== undefined ? parseInt(meta_timeout) : 2000;
}
if (window.METRO_SCROLL_MULTIPLE === undefined) {
    window.METRO_SCROLL_MULTIPLE = meta_scroll_multiple !== undefined ? parseInt(meta_scroll_multiple) : 20;
}
if (window.METRO_CLOAK_REMOVE === undefined) {
    window.METRO_CLOAK_REMOVE = meta_cloak !== undefined ? (""+meta_cloak).toLowerCase() : "fade";
}
if (window.METRO_CLOAK_DURATION === undefined) {
    window.METRO_CLOAK_DURATION = meta_cloak_duration !== undefined ? parseInt(meta_cloak_duration) : 500;
}
if (window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE === undefined) {window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE = true;}
if (window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS === undefined) {window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS = true;}
if (window.METRO_HOTKEYS_FILTER_TEXT_INPUTS === undefined) {window.METRO_HOTKEYS_FILTER_TEXT_INPUTS = true;}
if (window.METRO_HOTKEYS_BUBBLE_UP === undefined) {window.METRO_HOTKEYS_BUBBLE_UP = false;}
if (window.METRO_THROWS === undefined) {window.METRO_THROWS = true;}

window.METRO_MEDIA = [];

if ( typeof Object.create !== 'function' ) {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

if (typeof Object.values !== 'function') {
    Object.values = function(obj) {
        return Object.keys(obj).map(function(e) {
            return obj[e]
        });
    }
}

var isTouch = (('ontouchstart' in window) || (navigator["MaxTouchPoints"] > 0) || (navigator["msMaxTouchPoints"] > 0));

var Metro = {

    version: "4.3.1",
    compileTime: "25/09/2019 23:11:38",
    buildNumber: "738",
    isTouchable: isTouch,
    fullScreenEnabled: document.fullscreenEnabled,
    sheet: null,

    controlsPosition: {
        INSIDE: "inside",
        OUTSIDE: "outside"
    },

    groupMode: {
        ONE: "one",
        MULTI: "multi"
    },

    aspectRatio: {
        HD: "hd",
        SD: "sd",
        CINEMA: "cinema"
    },

    fullScreenMode: {
        WINDOW: "window",
        DESKTOP: "desktop"
    },

    position: {
        TOP: "top",
        BOTTOM: "bottom",
        LEFT: "left",
        RIGHT: "right",
        TOP_RIGHT: "top-right",
        TOP_LEFT: "top-left",
        BOTTOM_LEFT: "bottom-left",
        BOTTOM_RIGHT: "bottom-right",
        LEFT_BOTTOM: "left-bottom",
        LEFT_TOP: "left-top",
        RIGHT_TOP: "right-top",
        RIGHT_BOTTOM: "right-bottom"
    },

    popoverEvents: {
        CLICK: "click",
        HOVER: "hover",
        FOCUS: "focus"
    },

    stepperView: {
        SQUARE: "square",
        CYCLE: "cycle",
        DIAMOND: "diamond"
    },

    listView: {
        LIST: "list",
        CONTENT: "content",
        ICONS: "icons",
        ICONS_MEDIUM: "icons-medium",
        ICONS_LARGE: "icons-large",
        TILES: "tiles",
        TABLE: "table"
    },

    events: {
        click: 'click',
        start: isTouch ? 'touchstart' : 'mousedown',
        stop: isTouch ? 'touchend' : 'mouseup',
        move: isTouch ? 'touchmove' : 'mousemove',
        enter: isTouch ? 'touchstart' : 'mouseenter',

        startAll: 'mousedown touchstart',
        stopAll: 'mouseup touchend',
        moveAll: 'mousemove touchmove',

        leave: 'mouseleave',
        focus: 'focus',
        blur: 'blur',
        resize: 'resize',
        keyup: 'keyup',
        keydown: 'keydown',
        keypress: 'keypress',
        dblclick: 'dblclick',
        input: 'input',
        change: 'change',
        cut: 'cut',
        paste: 'paste',
        scroll: 'scroll',
        mousewheel: 'mousewheel',
        inputchange: "change input propertychange cut paste copy drop",
        dragstart: "dragstart",
        dragend: "dragend",
        dragenter: "dragenter",
        dragover: "dragover",
        dragleave: "dragleave",
        drop: 'drop',
        drag: 'drag'
    },

    keyCode: {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        BREAK: 19,
        CAPS: 20,
        ESCAPE: 27,
        SPACE: 32,
        PAGEUP: 33,
        PAGEDOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        COMMA: 188
    },

    media_queries: {
        FS: "(min-width: 0px)",
        XS: "(min-width: 360px)",
        SM: "(min-width: 576px)",
        MD: "(min-width: 768px)",
        LG: "(min-width: 992px)",
        XL: "(min-width: 1200px)",
        XXL: "(min-width: 1452px)"
    },

    media_sizes: {
        FS: 0,
        XS: 360,
        SM: 576,
        LD: 640,
        MD: 768,
        LG: 992,
        XL: 1200,
        XXL: 1452
    },

    media_mode: {
        FS: "fs",
        XS: "xs",
        SM: "sm",
        MD: "md",
        LG: "lg",
        XL: "xl",
        XXL: "xxl"
    },

    media_modes: ["fs","xs","sm","md","lg","xl","xxl"],

    actions: {
        REMOVE: 1,
        HIDE: 2
    },

    hotkeys: {},

    about: function(){
        console.log("Metro 4 - v" + Metro.version +". "+ Metro.showCompileTime());
        console.log("m4q - " + m4q.version);
    },

    showCompileTime: function(){
        return "Built at: " + Metro.compileTime;
    },

    aboutDlg: function(){
        alert("Metro 4 - v" + Metro.version +". "+ Metro.showCompileTime());
    },

    ver: function(){
        return Metro.version;
    },

    build: function(){
        return Metro.build;
    },

    compile: function(){
        return Metro.compileTime;
    },

    observe: function(){
        var observer, observerCallback;
        var observerConfig = {
            childList: true,
            attributes: true,
            subtree: true
        };
        observerCallback = function(mutations){
            mutations.map(function(mutation){

                if (mutation.type === 'attributes' && mutation.attributeName !== "data-role") {
                    if (mutation.attributeName === 'data-hotkey') {

                        Metro.initHotkeys([mutation.target], true);

                    } else {

                        var element = $(mutation.target);
                        var mc = element.data('metroComponent');

                        if (mc !== undefined) {
                            $.each(mc, function(){
                                var plug = Metro.getPlugin(element, this);
                                if (plug) plug.changeAttribute(mutation.attributeName);
                            });
                        }
                    }
                } else

                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    var i, widgets = [];
                    var $node, node, nodes = mutation.addedNodes;

                    if (nodes.length) {
                        for(i = 0; i < nodes.length; i++) {
                            node = nodes[i];
                            $node = $(node);

                            if ($node.attr("data-role") !== undefined) {
                                widgets.push(node);
                            }

                            $.each($node.find("[data-role]"), function(){
                                var o = this;
                                if (widgets.indexOf(o) !== -1) {
                                    return;
                                }
                                widgets.push(o);
                            });
                        }

                        if (widgets.length) Metro.initWidgets(widgets, "observe");
                    }

                } else  {
                    //console.log(mutation);
                }
            });
        };
        observer = new MutationObserver(observerCallback);
        observer.observe($("html")[0], observerConfig);
    },

    init: function(){
        var widgets = $("[data-role]");
        var hotkeys = $("[data-hotkey]");
        var html = $("html");

        if (isTouch === true) {
            html.addClass("metro-touch-device");
        } else {
            html.addClass("metro-no-touch-device");
        }

        Metro.sheet = Utils.newCssSheet();


        window.METRO_MEDIA = [];
        $.each(Metro.media_queries, function(key, query){
            if (Utils.media(query)) {
                METRO_MEDIA.push(Metro.media_mode[key]);
            }
        });

        Metro.observe();

        Metro.initHotkeys(hotkeys);
        Metro.initWidgets(widgets, "init");

        if (METRO_SHOW_ABOUT) Metro.about(true);

        if (METRO_CLOAK_REMOVE !== "fade") {
            $(".m4-cloak").removeClass("m4-cloak");
        } else {
            $(".m4-cloak").animate({
                opacity: 1
            }, METRO_CLOAK_DURATION, function(){
                $(".m4-cloak").removeClass("m4-cloak");
            })
        }

        return Metro;
    },

    initHotkeys: function(hotkeys, redefine){
        $.each(hotkeys, function(){
            var element = $(this);
            var hotkey = element.attr('data-hotkey') ? element.attr('data-hotkey').toLowerCase() : false;
            var fn = element.attr('data-hotkey-func') ? element.attr('data-hotkey-func') : false;

            //console.log(element);

            if (hotkey === false) {
                return;
            }

            if (element.data('hotKeyBonded') === true && !Utils.bool(redefine)) {
                return;
            }

            Metro.hotkeys[hotkey] = [this, fn];

            element.data('hotKeyBonded', true);
        });
    },

    initWidgets: function(widgets) {
        $.each(widgets, function () {
            var $this = $(this);
            var roles = $this.data('role').split(/\s*,\s*/);

            roles.map(function (func) {

                var $$ = Utils.$();

                if ($$.fn[func] !== undefined && $this.attr("data-role-"+func) === undefined) {
                    try {
                        $$.fn[func].call($this);
                        $this.attr("data-role-"+func, true);

                        var mc = $this.data('metroComponent');

                        if (mc === undefined) {
                            mc = [func];
                        } else {
                            mc.push(func);
                        }
                        $this.data('metroComponent', mc);
                    } catch (e) {
                        console.error(e.message + " in " + e.stack);
                        throw e;
                    }
                }
            });
        });
    },

    plugin: function(name, object){
        $.fn[name] = function( options ) {
            return this.each(function() {
                $.data( this, name, Object.create(object).init(options, this ));
            });
        };

        if (METRO_JQUERY && typeof jQuery !== 'undefined') {
            jQuery.fn[name] = function (options) {
                return this.each(function () {
                    jQuery.data(this, name, Object.create(object).init(options, this));
                });
            };
        }
    },

    destroyPlugin: function(element, name){
        var p, mc;
        var el = $(element);

        p = el.data(name);

        if (!Utils.isValue(p)) {
            throw new Error("Component can not be destroyed: the element is not a Metro 4 component.");
        }

        if (!Utils.isFunc(p['destroy'])) {
            throw new Error("Component can not be destroyed: method destroy not found.");
        }

        p['destroy']();
        mc = el.data("metroComponent");
        Utils.arrayDelete(mc, name);
        el.data("metroComponent", mc);
        $.removeData(el[0], name);
        el.removeAttr("data-role-"+name);
    },

    destroyPluginAll: function(element){
        var el = $(element);
        var mc = el.data("metroComponent");

        if (mc !== undefined && mc.length > 0) $.each(mc, function(){
            Metro.destroyPlugin(el[0], this);
        });
    },

    noop: function(){},
    noop_true: function(){return true;},
    noop_false: function(){return false;},

    stop: function(e){
        e.stopPropagation();
        e.preventDefault();
    },

    requestFullScreen: function(element){
        if (element["mozRequestFullScreen"]) {
            element["mozRequestFullScreen"]();
        } else if (element["webkitRequestFullScreen"]) {
            element["webkitRequestFullScreen"]();
        } else if (element["msRequestFullscreen"]) {
            element["msRequestFullscreen"]();
        } else {
            element.requestFullscreen().catch( function(err){
                console.log("Error attempting to enable full-screen mode: "+err.message+" "+err.name);
            });
        }
    },

    exitFullScreen: function(){
        if (document["mozCancelFullScreen"]) {
            document["mozCancelFullScreen"]();
        }
        else if (document["webkitCancelFullScreen"]) {
            document["webkitCancelFullScreen"]();
        }
        else if (document["msExitFullscreen"]) {
            document["msExitFullscreen"]();
        } else {
            document.exitFullscreen().catch( function(err){
                console.log("Error attempting to disable full-screen mode: "+err.message+" "+err.name);
            });
        }
    },

    inFullScreen: function(){
        var fsm = (document.fullscreenElement || document["webkitFullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"]);
        return fsm !== undefined;
    },

    checkRuntime: function(el, role){
        var element = $(el);
        if (!element.attr("data-role-"+role)) {
            Metro.makeRuntime(element, role);
        }
    },

    makeRuntime: function(el, role){
        var element = $(el);
        element.attr("data-role-"+role, true);
        element.attr("data-role", role);
        var mc = element.data('metroComponent');

        if (mc === undefined) {
            mc = [role];
        } else {
            mc.push(role);
        }
        element.data('metroComponent', mc);
    },

    getPlugin: function(el, type){
        return Utils.$()($(el)[0]).data(type);
    },

    makePlugin: function(el, type, options){
        return Utils.$()($(el)[0])[type](options)
    }
};

window['Metro'] = Metro;

$(window).on(Metro.events.resize, function(){
    window.METRO_MEDIA = [];
    $.each(Metro.media_queries, function(key, query){
        if (Utils.media(query)) {
            METRO_MEDIA.push(Metro.media_mode[key]);
        }
    });
});



var Animation = {

    duration: METRO_ANIMATION_DURATION,
    func: "linear",

    switch: function(current, next){
        current.hide();
        next.css({top: 0, left: 0}).show();
    },

    slideUp: function(current, next, duration, func){
        var h = current.parent().outerHeight(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            top: -h,
            opacity: 0
        }, duration, func);

        next.css({
            top: h,
            left: 0,
            zIndex: 2
        }).animate({
            top: 0,
            opacity: 1
        }, duration, func);
    },

    slideDown: function(current, next, duration, func){
        var h = current.parent().outerHeight(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            top: h,
            opacity: 0
        }, duration, func);

        next.css({
            left: 0,
            top: -h,
            zIndex: 2
        }).animate({
            top: 0,
            opacity: 1
        }, duration, func);
    },

    slideLeft: function(current, next, duration, func){
        var w = current.parent().outerWidth(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            left: -w,
            opacity: 0
        }, duration, func);

        next.css({
            left: w,
            zIndex: 2
        }).animate({
            left: 0,
            opacity: 1
        }, duration, func);
    },

    slideRight: function(current, next, duration, func){
        var w = current.parent().outerWidth(true);
        if (duration === undefined) {duration = this.duration;}
        if (func === undefined) {func = this.func;}
        current.css("z-index", 1).animate({
            left: w,
            opacity: 0
        }, duration, func);

        next.css({
            left: -w,
            zIndex: 2
        }).animate({
            left: 0,
            opacity: 1
        }, duration, func);
    },

    fade: function(current, next, duration){
        if (duration === undefined) {duration = this.duration;}

        current.animate({
            opacity: 0
        }, duration);

        next.css({
            top: 0,
            left: 0,
            opacity: 0
        }).animate({
            opacity: 1
        }, duration);
    }

};

Metro['animation'] = Animation;

if (typeof Array.shuffle !== "function") {
    Array.prototype.shuffle = function () {
        var currentIndex = this.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = this[currentIndex];
            this[currentIndex] = this[randomIndex];
            this[randomIndex] = temporaryValue;
        }

        return this;
    };
}

if (typeof Array.clone !== "function") {
    Array.prototype.clone = function () {
        return this.slice(0);
    };
}

if (typeof Array.unique !== "function") {
    Array.prototype.unique = function () {
        var a = this.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    };
}

if (typeof Array.from !== "function") {
    Array.from = function(val) {
        var i, a = [];

        if (val.length === undefined && typeof val === "object") {
            return Object.values(val);
        }

        if (val.length !== undefined) {
            for(i = 0; i < val.length; i++) {
                a.push(val[i]);
            }
            return a;
        }

        throw new Error("Value can not be converted to array");
    };
}

if (typeof Array.contains !== "function") {
    Array.prototype.contains = function(val, from){
        return this.indexOf(val, from) > -1;
    }
}


function RGB(r, g, b){
    this.r = r || 0;
    this.g = g || 0;
    this.g = b || 0;
}

function RGBA(r, g, b, a){
    this.r = r || 0;
    this.g = g || 0;
    this.g = b || 0;
    this.a = a || 1;
}

function HSV(h, s, v){
    this.h = h || 0;
    this.s = s || 0;
    this.v = v || 0;
}

function HSL(h, s, l){
    this.h = h || 0;
    this.s = s || 0;
    this.l = l || 0;
}

function HSLA(h, s, l, a){
    this.h = h || 0;
    this.s = s || 0;
    this.l = l || 0;
    this.a = a || 1;
}

function CMYK(c, m, y, k){
    this.c = c || 0;
    this.m = m || 0;
    this.y = y || 0;
    this.k = k || 0;
}

var Colors = {

    TYPES: {
        HEX: "hex",
        RGB: "rgb",
        RGBA: "rgba",
        HSV: "hsv",
        HSL: "hsl",
        CMYK: "cmyk",
        UNKNOWN: "unknown"
    },

    PALETTES: {
        ALL: "colorList",
        METRO: "colorListMetro",
        STANDARD: "colorListStandard"
    },

    colorListMetro: {
        lime: '#a4c400',
        green: '#60a917',
        emerald: '#008a00',
        blue: '#00AFF0',
        teal: '#00aba9',
        cyan: '#1ba1e2',
        cobalt: '#0050ef',
        indigo: '#6a00ff',
        violet: '#aa00ff',
        pink: '#dc4fad',
        magenta: '#d80073',
        crimson: '#a20025',
        red: '#CE352C',
        orange: '#fa6800',
        amber: '#f0a30a',
        yellow: '#fff000',
        brown: '#825a2c',
        olive: '#6d8764',
        steel: '#647687',
        mauve: '#76608a',
        taupe: '#87794e'
    },

    colorListStandard: {
        aliceBlue: "#f0f8ff",
        antiqueWhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedAlmond: "#ffebcd",
        blue: "#0000ff",
        blueViolet: "#8a2be2",
        brown: "#a52a2a",
        burlyWood: "#deb887",
        cadetBlue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerBlue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkBlue: "#00008b",
        darkCyan: "#008b8b",
        darkGoldenRod: "#b8860b",
        darkGray: "#a9a9a9",
        darkGreen: "#006400",
        darkKhaki: "#bdb76b",
        darkMagenta: "#8b008b",
        darkOliveGreen: "#556b2f",
        darkOrange: "#ff8c00",
        darkOrchid: "#9932cc",
        darkRed: "#8b0000",
        darkSalmon: "#e9967a",
        darkSeaGreen: "#8fbc8f",
        darkSlateBlue: "#483d8b",
        darkSlateGray: "#2f4f4f",
        darkTurquoise: "#00ced1",
        darkViolet: "#9400d3",
        deepPink: "#ff1493",
        deepSkyBlue: "#00bfff",
        dimGray: "#696969",
        dodgerBlue: "#1e90ff",
        fireBrick: "#b22222",
        floralWhite: "#fffaf0",
        forestGreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#DCDCDC",
        ghostWhite: "#F8F8FF",
        gold: "#ffd700",
        goldenRod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenYellow: "#adff2f",
        honeyDew: "#f0fff0",
        hotPink: "#ff69b4",
        indianRed: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderBlush: "#fff0f5",
        lawnGreen: "#7cfc00",
        lemonChiffon: "#fffacd",
        lightBlue: "#add8e6",
        lightCoral: "#f08080",
        lightCyan: "#e0ffff",
        lightGoldenRodYellow: "#fafad2",
        lightGray: "#d3d3d3",
        lightGreen: "#90ee90",
        lightPink: "#ffb6c1",
        lightSalmon: "#ffa07a",
        lightSeaGreen: "#20b2aa",
        lightSkyBlue: "#87cefa",
        lightSlateGray: "#778899",
        lightSteelBlue: "#b0c4de",
        lightYellow: "#ffffe0",
        lime: "#00ff00",
        limeGreen: "#32dc32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumAquaMarine: "#66cdaa",
        mediumBlue: "#0000cd",
        mediumOrchid: "#ba55d3",
        mediumPurple: "#9370db",
        mediumSeaGreen: "#3cb371",
        mediumSlateBlue: "#7b68ee",
        mediumSpringGreen: "#00fa9a",
        mediumTurquoise: "#48d1cc",
        mediumVioletRed: "#c71585",
        midnightBlue: "#191970",
        mintCream: "#f5fffa",
        mistyRose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajoWhite: "#ffdead",
        navy: "#000080",
        oldLace: "#fdd5e6",
        olive: "#808000",
        oliveDrab: "#6b8e23",
        orange: "#ffa500",
        orangeRed: "#ff4500",
        orchid: "#da70d6",
        paleGoldenRod: "#eee8aa",
        paleGreen: "#98fb98",
        paleTurquoise: "#afeeee",
        paleVioletRed: "#db7093",
        papayaWhip: "#ffefd5",
        peachPuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderBlue: "#b0e0e6",
        purple: "#800080",
        rebeccaPurple: "#663399",
        red: "#ff0000",
        rosyBrown: "#bc8f8f",
        royalBlue: "#4169e1",
        saddleBrown: "#8b4513",
        salmon: "#fa8072",
        sandyBrown: "#f4a460",
        seaGreen: "#2e8b57",
        seaShell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        slyBlue: "#87ceeb",
        slateBlue: "#6a5acd",
        slateGray: "#708090",
        snow: "#fffafa",
        springGreen: "#00ff7f",
        steelBlue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whiteSmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowGreen: "#9acd32"
    },

    colorList: {},

    options: {
        angle: 30,
        algorithm: 1,
        step: .1,
        distance: 5,
        tint1: .8,
        tint2: .4,
        shade1: .6,
        shade2: .3,
        alpha: 1
    },

    init: function(){
        this.colorList = $.extend( {}, this.colorListStandard, this.colorListMetro );
        return this;
    },

    setup: function(options){
        this.options = $.extend( {}, this.options, options );
    },

    color: function(name, palette){
        palette = palette || this.PALETTES.ALL;
        return this[palette][name] !== undefined ? this[palette][name] : false;
    },

    palette: function(palette){
        palette = palette || this.PALETTES.ALL;
        return Object.keys(this[palette]);
    },

    colors: function(palette){
        var c = [];
        palette = palette || this.PALETTES.ALL;
        $.each(this[palette], function(){
            c.push(this);
        });
        return c;
    },

    hex2rgb: function(hex){
        var regex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace( regex, function( m, r, g, b ) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
        return result ? {
            r: parseInt( result[1], 16 ),
            g: parseInt( result[2], 16 ),
            b: parseInt( result[3], 16 )
        } : null;
    },

    rgb2hex: function(rgb){
        return "#" +
            (( 1 << 24 ) + ( rgb.r << 16 ) + ( rgb.g << 8 ) + rgb.b )
                .toString( 16 ).slice( 1 );
    },

    rgb2hsv: function(rgb){
        var hsv = new HSV();
        var h, s, v;
        var r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var delta = max - min;

        v = max;

        if (max === 0) {
            s = 0;
        } else {
            s = 1 - min / max;
        }

        if (max === min) {
            h = 0;
        } else if (max === r && g >= b) {
            h = 60 * ( (g - b) / delta );
        } else if (max === r && g < b) {
            h = 60 * ( (g - b) / delta) + 360
        } else if (max === g) {
            h = 60 * ( (b - r) / delta) + 120
        } else if (max === b) {
            h = 60 * ( (r - g) / delta) + 240
        } else {
            h = 0;
        }

        hsv.h = h;
        hsv.s = s;
        hsv.v = v;

        return hsv;
    },

    hsv2rgb: function(hsv){
        var r, g, b;
        var h = hsv.h, s = hsv.s * 100, v = hsv.v * 100;
        var Hi = Math.floor(h / 60);
        var Vmin = (100 - s) * v / 100;
        var alpha = (v - Vmin) * ( (h % 60) / 60 );
        var Vinc = Vmin + alpha;
        var Vdec = v - alpha;

        switch (Hi) {
            case 0: r = v; g = Vinc; b = Vmin; break;
            case 1: r = Vdec; g = v; b = Vmin; break;
            case 2: r = Vmin; g = v; b = Vinc; break;
            case 3: r = Vmin; g = Vdec; b = v; break;
            case 4: r = Vinc; g = Vmin; b = v; break;
            case 5: r = v; g = Vmin; b = Vdec; break;
        }

        return {
            r: Math.round(r * 255 / 100),
            g: Math.round(g * 255 / 100),
            b: Math.round(b * 255 / 100)
        }
    },

    hsv2hex: function(hsv){
        return this.rgb2hex(this.hsv2rgb(hsv));
    },

    hex2hsv: function(hex){
        return this.rgb2hsv(this.hex2rgb(hex));
    },

    rgb2cmyk: function(rgb){
        var cmyk = new CMYK();

        var r = rgb.r / 255;
        var g = rgb.g / 255;
        var b = rgb.b / 255;

        cmyk.k = Math.min( 1 - r, 1 - g, 1 - b );
        cmyk.c = ( 1 - r - cmyk.k ) / ( 1 - cmyk.k );
        cmyk.m = ( 1 - g - cmyk.k ) / ( 1 - cmyk.k );
        cmyk.y = ( 1 - b - cmyk.k ) / ( 1 - cmyk.k );

        cmyk.c = Math.round( cmyk.c * 100 );
        cmyk.m = Math.round( cmyk.m * 100 );
        cmyk.y = Math.round( cmyk.y * 100 );
        cmyk.k = Math.round( cmyk.k * 100 );

        return cmyk;
    },

    cmyk2rgb: function(cmyk){
        var rgb = new RGB();

        var c = cmyk.c / 100;
        var m = cmyk.m / 100;
        var y = cmyk.y / 100;
        var k = cmyk.k / 100;

        rgb.r = 1 - Math.min( 1, c * ( 1 - k ) + k );
        rgb.g = 1 - Math.min( 1, m * ( 1 - k ) + k );
        rgb.b = 1 - Math.min( 1, y * ( 1 - k ) + k );

        rgb.r = Math.round( rgb.r * 255 );
        rgb.g = Math.round( rgb.g * 255 );
        rgb.b = Math.round( rgb.b * 255 );

        return rgb;
    },

    hsv2hsl: function(hsv){
        var h, s, l;
        h = hsv.h;
        l = (2 - hsv.s) * hsv.v;
        s = hsv.s * hsv.v;
        s /= (l <= 1) ? l : 2 - l;
        l /= 2;
        return {h: h, s: s, l: l}
    },

    hsl2hsv: function(hsl){
        var h, s, v, l;
        h = hsl.h;
        l = hsl.l * 2;
        s = hsl.s * (l <= 1 ? l : 2 - l);
        v = (l + s) / 2;
        s = (2 * s) / (l + s);
        return {h: h, s: s, l: v}
    },

    rgb2websafe: function(rgb){
        return {
            r: Math.round(rgb.r / 51) * 51,
            g: Math.round(rgb.g / 51) * 51,
            b: Math.round(rgb.b / 51) * 51
        }
    },

    rgba2websafe: function(rgba){
        return {
            r: Math.round(rgba.r / 51) * 51,
            g: Math.round(rgba.g / 51) * 51,
            b: Math.round(rgba.b / 51) * 51,
            a: rgba.a
        }
    },

    hex2websafe: function(hex){
        return this.rgb2hex(this.rgb2websafe(this.toRGB(hex)));
    },

    hsv2websafe: function(hsv){
        return this.rgb2hsv(this.rgb2websafe(this.toRGB(hsv)));
    },

    hsl2websafe: function(hsl){
        return this.hsv2hsl(this.rgb2hsv(this.rgb2websafe(this.toRGB(hsl))));
    },

    cmyk2websafe: function(cmyk){
        return this.rgb2cmyk(this.rgb2websafe(this.cmyk2rgb(cmyk)));
    },

    websafe: function(color){
        if (this.isHEX(color)) return this.hex2websafe(color);
        if (this.isRGB(color)) return this.rgb2websafe(color);
        if (this.isRGBA(color)) return this.rgba2websafe(color);
        if (this.isHSV(color)) return this.hsv2websafe(color);
        if (this.isHSL(color)) return this.hsl2websafe(color);
        if (this.isCMYK(color)) return this.cmyk2websafe(color);

        return color;
    },

    is: function(color){
        if (this.isHEX(color)) return this.TYPES.HEX;
        if (this.isRGB(color)) return this.TYPES.RGB;
        if (this.isRGBA(color)) return this.TYPES.RGBA;
        if (this.isHSV(color)) return this.TYPES.HSV;
        if (this.isHSL(color)) return this.TYPES.HSL;
        if (this.isCMYK(color)) return this.TYPES.CMYK;

        return this.TYPES.UNKNOWN;
    },

    toRGB: function(color){
        if (this.isHSV(color)) return this.hsv2rgb(color);
        if (this.isHSL(color)) return this.hsv2rgb(this.hsl2hsv(color));
        if (this.isRGB(color)) return color;
        if (this.isHEX(color)) return this.hex2rgb(color);
        if (this.isCMYK(color)) return this.cmyk2rgb(color);

        throw new Error("Unknown color format!");
    },

    toRGBA: function(color, alpha){
        var result = this.toRGB(color);
        result.a = alpha || 1;
        return result;
    },

    toHSV: function(color){
        return this.rgb2hsv(this.toRGB(color));
    },

    toHSL: function(color){
        return this.hsv2hsl(this.rgb2hsv(this.toRGB(color)));
    },

    toHSLA: function(color, alpha){
        var hsla;
        hsla = this.hsv2hsl(this.rgb2hsv(this.toRGB(color)));
        hsla.a = alpha || this.options.alpha;
        return hsla;
    },

    toHEX: function(color){
        return this.rgb2hex(this.toRGB(color));
    },

    toCMYK: function(color){
        return this.rgb2cmyk(this.toRGB(color));
    },

    toHexString: function(color){
        return this.toHEX(color);
    },

    toHsvString: function(color){
        var hsv = this.toHSV(color);
        return "hsv("+[hsv.h, hsv.s, hsv.v].join(",")+")";
    },

    toHslString: function(color){
        var hsl = this.toHSL(color);
        return "hsl("+[Math.round(hsl.h), Math.round(hsl.s * 100) + "%" , Math.round(hsl.l * 100) + "%"].join(",")+")";
    },

    toHslaString: function(color){
        var hsl = this.toHSLA(color);
        return "hsl("+[Math.round(hsl.h), Math.round(hsl.s * 100) + "%" , Math.round(hsl.l * 100) + "%", hsl.a].join(",")+")";
    },

    toCmykString: function(color){
        var cmyk = this.toCMYK(color);
        return "cmyk("+[cmyk.c, cmyk.m, cmyk.y, cmyk.k].join(",")+")";
    },

    toRgbString: function(color){
        var rgb = this.toRGB(color);
        return "rgb("+[rgb.r, rgb.g, rgb.b].join(",")+")";
    },

    toRgbaString: function(color){
        var rgb = this.toRGBA(color);
        return "rgba("+[rgb.r, rgb.g, rgb.b, rgb.a].join(",")+")";
    },

    toString: function(color){
        if (this.isHEX(color)) return this.toHexString(color);
        if (this.isRGB(color)) return this.toRgbString(color);
        if (this.isRGBA(color)) return this.toRgbaString(color);
        if (this.isHSV(color)) return this.toHsvString(color);
        if (this.isHSL(color)) return this.toHslString(color);
        if (this.isHSLA(color)) return this.toHslaString(color);
        if (this.isCMYK(color)) return this.toCmykString(color);

        throw new Error("Unknown color format!");
    },

    grayscale: function(color, output){
        output = output || "hex";
        var rgb = this.toRGB(color);
        var gray = Math.round(rgb.r * .2125 + rgb.g * .7154 + rgb.b * .0721);
        var mono = {
            r: gray,
            g: gray,
            b: gray
        };
        return this["rgb2"+output](mono);
    },

    darken: function(color, amount){
        if (amount === undefined) {
            amount = 10;
        }
        return this.lighten(color, -1 * Math.abs(amount));
    },

    lighten: function(color, amount){
        var type, res, alpha = 1, ring = amount > 0;

        var calc = function(_color, _amount){
            var col = _color.slice(1);

            var num = parseInt(col, 16);
            var r = (num >> 16) + _amount;

            if (r > 255) r = 255;
            else if  (r < 0) r = 0;

            var b = ((num >> 8) & 0x00FF) + _amount;

            if (b > 255) b = 255;
            else if  (b < 0) b = 0;

            var g = (num & 0x0000FF) + _amount;

            if (g > 255) g = 255;
            else if (g < 0) g = 0;

            res = "#" + (g | (b << 8) | (r << 16)).toString(16);
            return res;
        };

        if (amount === undefined) {
            amount = 10;
        }

        type = this.is(color);

        if (type === this.TYPES.RGBA) {
            alpha = color.a;
        }

        do {
            res = calc(this.toHEX(color), amount);
            ring ? amount-- : amount++;
        } while (res.length < 7);

        switch (type) {
            case "rgb": return this.toRGB(res);
            case "rgba": return this.toRGBA(res, alpha);
            case "hsv": return this.toHSV(res);
            case "hsl": return this.toHSL(res);
            case "cmyk": return this.toCMYK(res);
            default: return res;
        }
    },

    isDark: function(color){
        var rgb = this.toRGB(color);
        var YIQ = (
            ( rgb.r * 299 ) +
            ( rgb.g * 587 ) +
            ( rgb.b * 114 )
        ) / 1000;
        return ( YIQ < 128 )
    },

    isLight: function(hex){
        return !this.isDark(hex);
    },

    isHSV: function(val){
        return Utils.isObject(val) && "h" in val && "s" in val && "v" in val;
    },

    isHSL: function(val){
        return Utils.isObject(val) && "h" in val && "s" in val && "l" in val;
    },

    isHSLA: function(val){
        return Utils.isObject(val) && "h" in val && "s" in val && "l" in val && "a" in val;
    },

    isRGB: function(val){
        return Utils.isObject(val) && "r" in val && "g" in val && "b" in val;
    },

    isRGBA: function(val){
        return Utils.isObject(val) && "r" in val && "g" in val && "b" in val && "a" in val;
    },

    isCMYK: function(val){
        return Utils.isObject(val) && "c" in val && "m" in val && "y" in val && "k" in val;
    },

    isHEX: function(val){
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
    },

    isColor: function(color){
        return this.isHEX(color) || this.isRGB(color) || this.isRGBA(color) || this.isHSV(color) || this.isHSL(color) || this.isCMYK(color);
    },

    hueShift: function(h, s){
        h+=s;
        while (h >= 360.0) h -= 360.0;
        while (h < 0.0) h += 360.0;
        return h;
    },

    getScheme: function(color, name, format, options){
        this.options = $.extend( {}, this.options, options );

        var i;
        var scheme = [];
        var hsv;
        var that = this;

        hsv = this.toHSV(color);

        if (this.isHSV(hsv) === false) {
            console.log("The value is a not supported color format!");
            return false;
        }

        function convert(source, format) {
            var result = [];
            var o = that.options;
            switch (format) {
                case "hex": result = source.map(function(v){return Colors.toHEX(v);}); break;
                case "rgb": result = source.map(function(v){return Colors.toRGB(v);}); break;
                case "rgba": result = source.map(function(v){return Colors.toRGBA(v, o.alpha);}); break;
                case "hsl": result = source.map(function(v){return Colors.toHSL(v);}); break;
                case "cmyk": result = source.map(function(v){return Colors.toCMYK(v);}); break;
                default: result = source;
            }

            return result;
        }

        function clamp( num, min, max ){
            return Math.max( min, Math.min( num, max ));
        }

        function toRange(a, b, c){
            return a < b ? b : ( a > c ? c : a);
        }

        var rgb, h = hsv.h, s = hsv.s, v = hsv.v;
        var o = this.options;

        switch (name) {
            case "monochromatic":
            case "mono":
                if (o.algorithm === 1) {

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r + (255 - rgb.r) * o.tint1), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g + (255 - rgb.g) * o.tint1), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b + (255 - rgb.b) * o.tint1), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r + (255 - rgb.r) * o.tint2), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g + (255 - rgb.g) * o.tint2), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b + (255 - rgb.b) * o.tint2), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));

                    scheme.push(hsv);

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r * o.shade1), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g * o.shade1), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b * o.shade1), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));

                    rgb = this.hsv2rgb(hsv);
                    rgb.r = toRange(Math.round(rgb.r * o.shade2), 0, 255);
                    rgb.g = toRange(Math.round(rgb.g * o.shade2), 0, 255);
                    rgb.b = toRange(Math.round(rgb.b * o.shade2), 0, 255);
                    scheme.push(this.rgb2hsv(rgb));
                } else if (o.algorithm === 2) {
                    scheme.push(hsv);
                    for(i = 1; i <= o.distance; i++) {
                        v = clamp(v - o.step, 0, 1);
                        s = clamp(s - o.step, 0, 1);
                        scheme.push({h: h, s: s, v: v});
                    }
                } else if (o.algorithm === 3) {
                    scheme.push(hsv);
                    for(i = 1; i <= o.distance; i++) {
                        v = clamp(v - o.step, 0, 1);
                        scheme.push({h: h, s: s, v: v});
                    }
                } else {
                    v = clamp(hsv.v + o.step * 2, 0, 1);
                    scheme.push({h: h, s: s, v: v});

                    v = clamp(hsv.v + o.step, 0, 1);
                    scheme.push({h: h, s: s, v: v});

                    scheme.push(hsv); s = hsv.s; v = hsv.v;

                    v = clamp(hsv.v - o.step, 0, 1);
                    scheme.push({h: h, s: s, v: v});

                    v = clamp(hsv.v - o.step * 2, 0, 1);
                    scheme.push({h: h, s: s, v: v});
                }
                break;

            case 'complementary':
            case 'complement':
            case 'comp':
                scheme.push(hsv);

                h = this.hueShift(hsv.h, 180.0);
                scheme.push({h: h, s: s, v: v});
                break;

            case 'double-complementary':
            case 'double-complement':
            case 'double':
                scheme.push(hsv);

                h = this.hueShift(h, 180.0);
                scheme.push({h: h, s: s, v: v});

                h = this.hueShift(h, o.angle);
                scheme.push({h: h, s: s, v: v});

                h = this.hueShift(h, 180.0);
                scheme.push({h: h, s: s, v: v});

                break;

            case 'analogous':
            case 'analog':

                h = this.hueShift(h, o.angle);
                scheme.push({h: h, s: s, v: v});

                scheme.push(hsv);

                h = this.hueShift(hsv.h, 0.0 - o.angle);
                scheme.push({h: h, s: s, v: v});

                break;

            case 'triadic':
            case 'triad':
                scheme.push(hsv);
                for ( i = 1; i < 3; i++ ) {
                    h = this.hueShift(h, 120.0);
                    scheme.push({h: h, s: s, v: v});
                }
                break;

            case 'tetradic':
            case 'tetra':
                scheme.push(hsv);

                h = this.hueShift(hsv.h, 180.0);
                scheme.push({h: h, s: s, v: v});

                h = this.hueShift(hsv.h, -1 * o.angle);
                scheme.push({h: h, s: s, v: v});

                h = this.hueShift(h, 180.0);
                scheme.push({h: h, s: s, v: v});

                break;

            case 'square':
                scheme.push(hsv);
                for ( i = 1; i < 4; i++ ) {
                    h = this.hueShift(h, 90.0);
                    scheme.push({h: h, s: s, v: v});
                }
                break;

            case 'split-complementary':
            case 'split-complement':
            case 'split':
                h = this.hueShift(h, 180.0 - o.angle);
                scheme.push({h: h, s: s, v: v});

                scheme.push(hsv);

                h = this.hueShift(hsv.h, 180.0 + o.angle);
                scheme.push({h: h, s: s, v: v});
                break;

            default: console.log("Unknown scheme name");
        }

        return convert(scheme, format);
    }
};

Metro['colors'] = Colors.init();

Date.prototype.getWeek = function (dowOffset) {
    var nYear, nday, newYear, day, daynum, weeknum;

    dowOffset = !Utils.isValue(dowOffset) ? METRO_WEEK_START : typeof dowOffset === 'number' ? parseInt(dowOffset) : 0;
    newYear = new Date(this.getFullYear(),0,1);
    day = newYear.getDay() - dowOffset;
    day = (day >= 0 ? day : day + 7);
    daynum = Math.floor((this.getTime() - newYear.getTime() -
        (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;

    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};

Date.prototype.getYear = function(){
    return this.getFullYear().toString().substr(-2);
};

Date.prototype.format = function(format, locale){

    if (locale === undefined) {
        locale = "en-US";
    }

    var cal = (Metro.locales !== undefined && Metro.locales[locale] !== undefined ? Metro.locales[locale] : Metro.locales["en-US"])['calendar'];

    var date = this;
    var nDay = date.getDay(),
        nDate = date.getDate(),
        nMonth = date.getMonth(),
        nYear = date.getFullYear(),
        nHour = date.getHours(),
        aDays = cal['days'],
        aMonths = cal['months'],
        aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
        isLeapYear = function() {
            return (nYear%4===0 && nYear%100!==0) || nYear%400===0;
        },
        getThursday = function() {
            var target = new Date(date);
            target.setDate(nDate - ((nDay+6)%7) + 3);
            return target;
        },
        zeroPad = function(nNum, nPad) {
            return ('' + (Math.pow(10, nPad) + nNum)).slice(1);
        };
    return format.replace(/(%[a-z])/gi, function(sMatch) {
        return {
            '%a': aDays[nDay].slice(0,3),
            '%A': aDays[nDay],
            '%b': aMonths[nMonth].slice(0,3),
            '%B': aMonths[nMonth],
            '%c': date.toUTCString(),
            '%C': Math.floor(nYear/100),
            '%d': zeroPad(nDate, 2),
            'dd': zeroPad(nDate, 2),
            '%e': nDate,
            '%F': date.toISOString().slice(0,10),
            '%G': getThursday().getFullYear(),
            '%g': ('' + getThursday().getFullYear()).slice(2),
            '%H': zeroPad(nHour, 2),
            // 'HH': zeroPad(nHour, 2),
            '%I': zeroPad((nHour+11)%12 + 1, 2),
            '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth>1 && isLeapYear()) ? 1 : 0), 3),
            '%k': '' + nHour,
            '%l': (nHour+11)%12 + 1,
            '%m': zeroPad(nMonth + 1, 2),
            // 'mm': zeroPad(nMonth + 1, 2),
            '%M': zeroPad(date.getMinutes(), 2),
            // 'MM': zeroPad(date.getMinutes(), 2),
            '%p': (nHour<12) ? 'AM' : 'PM',
            '%P': (nHour<12) ? 'am' : 'pm',
            '%s': Math.round(date.getTime()/1000),
            // 'ss': Math.round(date.getTime()/1000),
            '%S': zeroPad(date.getSeconds(), 2),
            // 'SS': zeroPad(date.getSeconds(), 2),
            '%u': nDay || 7,
            '%V': (function() {
                var target = getThursday(),
                    n1stThu = target.valueOf();
                target.setMonth(0, 1);
                var nJan1 = target.getDay();
                if (nJan1!==4) target.setMonth(0, 1 + ((4-nJan1)+7)%7);
                return zeroPad(1 + Math.ceil((n1stThu-target)/604800000), 2);
            })(),
            '%w': '' + nDay,
            '%x': date.toLocaleDateString(),
            '%X': date.toLocaleTimeString(),
            '%y': ('' + nYear).slice(2),
            // 'yy': ('' + nYear).slice(2),
            '%Y': nYear,
            // 'YYYY': nYear,
            '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
            '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
        }[sMatch] || sMatch;
    });
};

Date.prototype.addHours = function(n) {
    this.setTime(this.getTime() + (n*60*60*1000));
    return this;
};

Date.prototype.addDays = function(n) {
    this.setDate(this.getDate() + (n));
    return this;
};

Date.prototype.addMonths = function(n) {
    this.setMonth(this.getMonth() + (n));
    return this;
};

Date.prototype.addYears = function(n) {
    this.setFullYear(this.getFullYear() + (n));
    return this;
};


var Export = {

    init: function(){
        return this;
    },

    options: {
        csvDelimiter: "\t",
        csvNewLine: "\r\n",
        includeHeader: true
    },

    setup: function(options){
        this.options = $.extend({}, this.options, options);
        return this;
    },

    base64: function(data){
        return window.btoa(unescape(encodeURIComponent(data)));
    },

    b64toBlob: function (b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];

        var offset;
        for (offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            var i;
            for (i = 0; i < slice.length; i = i + 1) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new window.Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {
            type: contentType
        });
    },

    tableToCSV: function(table, filename, options){
        var that = this, o = this.options;
        var body, head, data = "";
        var i, j, row, cell;

        o = $.extend({}, o, options);

        table = $(table)[0];

        if (Utils.bool(o.includeHeader)) {

            head = table.querySelectorAll("thead")[0];

            for(i = 0; i < head.rows.length; i++) {
                row = head.rows[i];
                for(j = 0; j < row.cells.length; j++){
                    cell = row.cells[j];
                    data += (j ? o.csvDelimiter : '') + cell.textContent.trim();
                }
                data += o.csvNewLine;
            }
        }

        body = table.querySelectorAll("tbody")[0];

        for(i = 0; i < body.rows.length; i++) {
            row = body.rows[i];
            for(j = 0; j < row.cells.length; j++){
                cell = row.cells[j];
                data += (j ? o.csvDelimiter : '') + cell.textContent.trim();
            }
            data += o.csvNewLine;
        }

        if (Utils.isValue(filename)) {
            return this.createDownload(this.base64("\uFEFF" + data), 'application/csv', filename);
        }

        return data;
    },

    createDownload: function (data, contentType, filename) {
        var blob, anchor, url;

        anchor = document.createElement('a');
        anchor.style.display = "none";
        document.body.appendChild(anchor);

        blob = this.b64toBlob(data, contentType);

        url = window.URL.createObjectURL(blob);
        anchor.href = url;
        anchor.download = filename || Utils.elementId("download");
        anchor.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(anchor);
        return true;
    }
};

Metro['export'] = Export.init();


var Locales = {
    'en-US': {
        "calendar": {
            "months": [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            "days": [
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
                "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa",
                "Sun", "Mon", "Tus", "Wen", "Thu", "Fri", "Sat"
            ],
            "time": {
                "days": "DAYS",
                "hours": "HOURS",
                "minutes": "MINS",
                "seconds": "SECS",
                "month": "MON",
                "day": "DAY",
                "year": "YEAR"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Cancel",
            "done": "Done",
            "today": "Today",
            "now": "Now",
            "clear": "Clear",
            "help": "Help",
            "yes": "Yes",
            "no": "No",
            "random": "Random",
            "save": "Save",
            "reset": "Reset"
        }
    },
    
    'tw-ZH': {
        "calendar": {
            "months": [
                "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月",
                "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
            ],
            "days": [
                "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",
                "日", "一", "二", "三", "四", "五", "六",
                "週日", "週一", "週二", "週三", "週四", "週五", "週六"
            ],
            "time": {
                "days": "天",
                "hours": "時",
                "minutes": "分",
                "seconds": "秒",
                "month": "月",
                "day": "日",
                "year": "年"
            }
        },
        "buttons": {
            "ok": "確認",
            "cancel": "取消",
            "done": "完成",
            "today": "今天",
            "now": "現在",
            "clear": "清除",
            "help": "幫助",
            "yes": "是",
            "no": "否",
            "random": "隨機",
            "save": "保存",
            "reset": "重啟"
        }
    },
    
    'cn-ZH': {
        "calendar": {
            "months": [
                "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月",
                "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
            ],
            "days": [
                "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",
                "日", "一", "二", "三", "四", "五", "六",
                "周日", "周一", "周二", "周三", "周四", "周五", "周六"
            ],
            "time": {
                "days": "天",
                "hours": "时",
                "minutes": "分",
                "seconds": "秒",
                "month": "月",
                "day": "日",
                "year": "年"
            }
        },
        "buttons": {
            "ok": "确认",
            "cancel": "取消",
            "done": "完成",
            "today": "今天",
            "now": "现在",
            "clear": "清除",
            "help": "帮助",
            "yes": "是",
            "no": "否",
            "random": "随机",
            "save": "保存",
            "reset": "重啟"
        }
    },
    
    
    'de-DE': {
        "calendar": {
            "months": [
                "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember",
                "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
            ],
            "days": [
                "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag",
                "Sn", "Mn", "Di", "Mi", "Do", "Fr", "Sa",
                "Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"
            ],
            "time": {
                "days": "TAGE",
                "hours": "UHR",
                "minutes": "MIN",
                "seconds": "SEK"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Abbrechen",
            "done": "Fertig",
            "today": "Heute",
            "now": "Jetzt",
            "clear": "Reinigen",
            "help": "Hilfe",
            "yes": "Ja",
            "no": "Nein",
            "random": "Zufällig",
            "save": "Sparen",
            "reset": "Zurücksetzen"
        }
    },

    'hu-HU': {
        "calendar": {
            "months": [
                'Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
                'Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'
            ],
            "days": [
                'Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat',
                'V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz',
                'Vas', 'Hét', 'Ke', 'Sze', 'Csü', 'Pén', 'Szom'
            ],
            "time": {
                "days": "NAP",
                "hours": "ÓRA",
                "minutes": "PERC",
                "seconds": "MP"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Mégse",
            "done": "Kész",
            "today": "Ma",
            "now": "Most",
            "clear": "Törlés",
            "help": "Segítség",
            "yes": "Igen",
            "no": "Nem",
            "random": "Véletlen",
            "save": "Mentés",
            "reset": "Visszaállítás"
        }
    },

    'ru-RU': {
        "calendar": {
            "months": [
                "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
                "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
            ],
            "days": [
                "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",
                "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
                "Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"
            ],
            "time": {
                "days": "ДНИ",
                "hours": "ЧАСЫ",
                "minutes": "МИН",
                "seconds": "СЕК"
            }
        },
        "buttons": {
            "ok": "ОК",
            "cancel": "Отмена",
            "done": "Готово",
            "today": "Сегодня",
            "now": "Сейчас",
            "clear": "Очистить",
            "help": "Помощь",
            "yes": "Да",
            "no": "Нет",
            "random": "Случайно",
            "save": "Сохранить",
            "reset": "Сброс"
        }
    },

    'uk-UA': {
        "calendar": {
            "months": [
                "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
                "Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"
            ],
            "days": [
                "Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота",
                "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
                "Нед", "Пон", "Вiв", "Сер", "Чет", "Пят", "Суб"
            ],
            "time": {
                "days": "ДНІ",
                "hours": "ГОД",
                "minutes": "ХВИЛ",
                "seconds": "СЕК"
            }
        },
        "buttons": {
            "ok": "ОК",
            "cancel": "Відміна",
            "done": "Готово",
            "today": "Сьогодні",
            "now": "Зараз",
            "clear": "Очистити",
            "help": "Допомога",
            "yes": "Так",
            "no": "Ні",
            "random": "Випадково",
            "save": "Зберегти",
            "reset": "Скинути"
        }
    },

    'es-MX': {
        "calendar": {
            "months": [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
                "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
            ],
            "days": [
                "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",
                "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa",
                "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
            ],
            "time": {
                "days": "DÍAS",
                "hours": "HORAS",
                "minutes": "MINS",
                "seconds": "SEGS",
                "month": "MES",
                "day": "DÍA",
                "year": "AÑO"
            }
        },
        "buttons": {
            "ok": "Aceptar",
            "cancel": "Cancelar",
            "done": "Hecho",
            "today": "Hoy",
            "now": "Ahora",
            "clear": "Limpiar",
            "help": "Ayuda",
            "yes": "Si",
            "no": "No",
            "random": "Aleatorio",
            "save": "Salvar",
            "reset": "Reiniciar"
        }
    },

    'fr-FR': {
        "calendar": {
            "months": [
                "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
                "Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"
            ],
            "days": [
                "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",
                "De", "Du", "Ma", "Me", "Je", "Ve", "Sa",
                "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
            ],
            "time": {
                "days": "JOURS",
                "hours": "HEURES",
                "minutes": "MINS",
                "seconds": "SECS",
                "month": "MOIS",
                "day": "JOUR",
                "year": "ANNEE"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Annulé",
            "done": "Fait",
            "today": "Aujourd'hui",
            "now": "Maintenant",
            "clear": "Effacé",
            "help": "Aide",
            "yes": "Oui",
            "no": "Non",
            "random": "Aléatoire",
            "save": "Sauvegarder",
            "reset": "Réinitialiser"
        }
    },

    'it-IT': {
        "calendar": {
            "months": [
                "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre",
                "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"
            ],
            "days": [
                "Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato",
                "Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa",
                "Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
            ],
            "time": {
                "days": "GIORNI",
                "hours": "ORE",
                "minutes": "MIN",
                "seconds": "SEC",
                "month": "MESE",
                "day": "GIORNO",
                "year": "ANNO"
            }
        },
        "buttons": {
            "ok": "OK",
            "cancel": "Annulla",
            "done": "Fatto",
            "today": "Oggi",
            "now": "Adesso",
            "clear": "Cancella",
            "help": "Aiuto",
            "yes": "Sì",
            "no": "No",
            "random": "Random",
            "save": "Salvare",
            "reset": "Reset"
        }
    }
};

Metro['locales'] = Locales;


var hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = "";
/* base-64 pad character. "=" for strict RFC compliance   */

function hex_md5(s) {
    return rstr2hex(rstr_md5(str2rstr_utf8(s)));
}
function b64_md5(s) {
    return rstr2b64(rstr_md5(str2rstr_utf8(s)));
}
function any_md5(s, e) {
    return rstr2any(rstr_md5(str2rstr_utf8(s)), e);
}
function hex_hmac_md5(k, d) {
    return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function b64_hmac_md5(k, d) {
    return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function any_hmac_md5(k, d, e) {
    return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}


/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data) {
    var bkey = rstr2binl(key);
    if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

    var ipad = new Array(16), opad = new Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F)
            + hex_tab.charAt(x & 0x0F);
    }
    return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var output = "";
    var len = input.length;
    for (var i = 0; i < len; i += 3) {
        var triplet = (input.charCodeAt(i) << 16)
            | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
            | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > input.length * 8) output += b64pad;
            else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
        }
    }
    return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding) {
    var divisor = encoding.length;
    var i, j, q, x, quotient;

    /* Convert to an array of 16-bit big-endian values, forming the dividend */
    var dividend = new Array(Math.ceil(input.length / 2));
    for (i = 0; i < dividend.length; i++) {
        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
    }

    /*
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. All remainders are stored for later
     * use.
     */
    var full_length = Math.ceil(input.length * 8 /
        (Math.log(encoding.length) / Math.log(2)));
    var remainders = new Array(full_length);
    for (j = 0; j < full_length; j++) {
        quotient = [];
        x = 0;
        for (i = 0; i < dividend.length; i++) {
            x = (x << 16) + dividend[i];
            q = Math.floor(x / divisor);
            x -= q * divisor;
            if (quotient.length > 0 || q > 0)
                quotient[quotient.length] = q;
        }
        remainders[j] = x;
        dividend = quotient;
    }

    /* Convert the remainders to the output string */
    var output = "";
    for (i = remainders.length - 1; i >= 0; i--)
        output += encoding.charAt(remainders[i]);

    return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;

    while (++i < input.length) {
        /* Decode utf-16 surrogate pairs */
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++;
        }

        /* Encode output as utf-8 */
        if (x <= 0x7F)
            output += String.fromCharCode(x);
        else if (x <= 0x7FF)
            output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                0x80 | ( x & 0x3F));
        else if (x <= 0xFFFF)
            output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
        else if (x <= 0x1FFFFF)
            output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                0x80 | ((x >>> 12) & 0x3F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
    }
    return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input) {
    var i;
    var output = new Array(input.length >> 2);
    for (i = 0; i < output.length; i++)
        output[i] = 0;
    for (i = 0; i < input.length * 8; i += 8)
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input) {
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return [a, b, c, d];
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}


// window.md5 = {
//     hex: function(val){
//         return hex_md5(val);
//     },
//
//     b64: function(val){
//         return b64_md5(val);
//     },
//
//     any: function(s, e){
//         return any_md5(s, e);
//     },
//
//     hex_hmac: function(k, d){
//         return hex_hmac_md5(k, d);
//     },
//
//     b64_hmac: function(k, d){
//         return b64_hmac_md5(k, d);
//     },
//
//     any_hmac: function(k, d, e){
//         return any_hmac_md5(k, d, e);
//     }
// };

//$.Metro['md5'] = hex_md5;

Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.contains = function() {
    return !!~String.prototype.indexOf.apply(this, arguments);
};

String.prototype.toDate = function(format, locale) {
    var result;
    var normalized, normalizedFormat, formatItems, dateItems, checkValue;
    var monthIndex, dayIndex, yearIndex, hourIndex, minutesIndex, secondsIndex;
    var year, month, day, hour, minute, second;
    var parsedMonth;

    locale = locale || "en-US";

    var monthNameToNumber = function(month){
        var d, months, index, i;

        if (!Utils.isValue(month)) {
            return -1;
        }

        month = month.substr(0, 3);

        if (
            locale !== undefined
            && locale !== "en-US"
            && Locales !== undefined
            && Locales[locale] !== undefined
            && Locales[locale]['calendar'] !== undefined
            && Locales[locale]['calendar']['months'] !== undefined
        ) {
            months = Locales[locale]['calendar']['months'];
            for(i = 12; i < months.length; i++) {
                if (months[i].toLowerCase() === month.toLowerCase()) {
                    index = i - 12;
                    break;
                }
            }
            month = Locales["en-US"]['calendar']['months'][index];
        }

        d = Date.parse(month + " 1, 1972");
        if(!isNaN(d)){
            return new Date(d).getMonth() + 1;
        }
        return -1;
    };

    if (format === undefined || format === null || format === "") {
        return new Date(this);
    }

    // normalized      = this.replace(/[^a-zA-Z0-9%]/g, '-');
    normalized      = this.replace(/[\/,.:\s]/g, '-');
    normalizedFormat= format.toLowerCase().replace(/[^a-zA-Z0-9%]/g, '-');
    formatItems     = normalizedFormat.split('-');
    dateItems       = normalized.split('-');
    checkValue      = normalized.replace(/\-/g,"");

    if (checkValue.trim() === "") {
        return "Invalid Date";
    }

    monthIndex  = formatItems.indexOf("mm") > -1 ? formatItems.indexOf("mm") : formatItems.indexOf("%m");
    dayIndex    = formatItems.indexOf("dd") > -1 ? formatItems.indexOf("dd") : formatItems.indexOf("%d");
    yearIndex   = formatItems.indexOf("yyyy") > -1 ? formatItems.indexOf("yyyy") : formatItems.indexOf("yy") > -1 ? formatItems.indexOf("yy") : formatItems.indexOf("%y");
    hourIndex     = formatItems.indexOf("hh") > -1 ? formatItems.indexOf("hh") : formatItems.indexOf("%h");
    minutesIndex  = formatItems.indexOf("ii") > -1 ? formatItems.indexOf("ii") : formatItems.indexOf("mi") > -1 ? formatItems.indexOf("mi") : formatItems.indexOf("%i");
    secondsIndex  = formatItems.indexOf("ss") > -1 ? formatItems.indexOf("ss") : formatItems.indexOf("%s");

    if (monthIndex > -1 && dateItems[monthIndex] !== "") {
        if (isNaN(parseInt(dateItems[monthIndex]))) {
            dateItems[monthIndex] = monthNameToNumber(dateItems[monthIndex]);
            if (dateItems[monthIndex] === -1) {
                return "Invalid Date";
            }
        } else {
            parsedMonth = parseInt(dateItems[monthIndex]);
            if (parsedMonth < 1 || parsedMonth > 12) {
                return "Invalid Date";
            }
        }
    } else {
        return "Invalid Date";
    }

    year  = yearIndex >-1 && dateItems[yearIndex] !== "" ? dateItems[yearIndex] : null;
    month = monthIndex >-1 && dateItems[monthIndex] !== "" ? dateItems[monthIndex] : null;
    day   = dayIndex >-1 && dateItems[dayIndex] !== "" ? dateItems[dayIndex] : null;

    hour    = hourIndex >-1 && dateItems[hourIndex] !== "" ? dateItems[hourIndex] : null;
    minute  = minutesIndex>-1 && dateItems[minutesIndex] !== "" ? dateItems[minutesIndex] : null;
    second  = secondsIndex>-1 && dateItems[secondsIndex] !== "" ? dateItems[secondsIndex] : null;

    result = new Date(year,month-1,day,hour,minute,second);

    return result;
};

String.prototype.toArray = function(delimiter, type, format){
    var str = this;
    var a;

    type = type || "string";
    delimiter = delimiter || ",";
    format = format === undefined || format === null ? false : format;

    a = (""+str).split(delimiter);

    return a.map(function(s){
        var result;

        switch (type) {
            case "int":
            case "integer": result = parseInt(s); break;
            case "number":
            case "float": result = parseFloat(s); break;
            case "date": result = !format ? new Date(s) : s.toDate(format); break;
            default: result = s.trim();
        }

        return result;
    });
};


var TemplateEngine = function(html, options, conf) {
    var ReEx, re = '<%(.+?)%>',
        reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
        code = 'with(obj) { var r=[];\n',
        cursor = 0,
        result,
        match;
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line !== '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    };

    if (Utils.isValue(conf)) {
        if ((conf.hasOwnProperty('beginToken'))) {
            re = re.replace('<%', conf.beginToken);
        }
        if ((conf.hasOwnProperty('endToken'))) {
            re = re.replace('%>', conf.endToken);
        }
    }

    ReEx = new RegExp(re, 'g');
    match = ReEx.exec(html);

    while(match) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
        match = ReEx.exec(html);
    }
    add(html.substr(cursor, html.length - cursor));
    code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
    try { result = new Function('obj', code).apply(options, [options]); }
    catch(err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
    return result;
};

Metro['template'] = TemplateEngine;


var Utils = {
    isUrl: function (val) {
        return /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?/.test(val);
    },

    isTag: function(val){
        return /^<\/?[\w\s="/.':;#-\/\?]+>/gi.test(val);
    },

    isColor: function (val) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
    },

    isEmbedObject: function(val){
        var embed = ["iframe", "object", "embed", "video"];
        var result = false;
        $.each(embed, function(){
            if (typeof val === "string" && val.toLowerCase() === this) {
                result = true;
            } else if (val.nodeType !== undefined && val.tagName.toLowerCase() === this) {
                result = true;
            }
        });
        return result;
    },

    isVideoUrl: function(val){
        return /youtu\.be|youtube|vimeo/gi.test(val);
    },

    isDate: function(val, format){
        var result;

        if (typeof val === "object" && Utils.isFunc(val['getMonth'])) {
            return true;
        }

        if (Utils.isValue(format)) {
            result = String(val).toDate(format);
        } else {
            result = String(new Date(val));
        }

        return result !== "Invalid Date";
    },

    isDateObject: function(v){
        return typeof v === 'object' && v['getMonth'] !== undefined;
    },

    isInt: function(n){
        return !isNaN(n) && +n % 1 === 0;
    },

    isFloat: function(n){
        return !isNaN(n) && +n % 1 !== 0;
    },

    isTouchDevice: function() {
        return (('ontouchstart' in window)
            || (navigator["MaxTouchPoints"] > 0)
            || (navigator["msMaxTouchPoints"] > 0));
    },

    isFunc: function(f){
        return Utils.isType(f, 'function');
    },

    isObject: function(o){
        return Utils.isType(o, 'object')
    },

    isArray: function(a){
        return Array.isArray(a);
    },

    isType: function(o, t){
        if (o === undefined || o === null) {
            return false;
        }

        if (typeof o === t) {
            return o;
        }

        if (Utils.isTag(o) || Utils.isUrl(o)) {
            return false;
        }

        if (typeof window[o] === t) {
            return window[o];
        }

        if (typeof o === 'string' && o.indexOf(".") === -1) {
            return false;
        }

        if (typeof o === 'string' && o.indexOf(" ") !== -1) {
            return false;
        }

        if (typeof o === 'string' && o.indexOf("(") !== -1) {
            return false;
        }

        if (typeof o === 'string' && o.indexOf("[") !== -1) {
            return false;
        }

        if (typeof o === "number" && t.toLowerCase() !== "number") {
            return false;
        }

        var ns = o.split(".");
        var i, context = window;

        for(i = 0; i < ns.length; i++) {
            context = context[ns[i]];
        }

        return typeof context === t ? context : false;
    },

    $: function(){
        return METRO_JQUERY && jquery_present ? jQuery : m4q;
    },

    isMetroObject: function(el, type){
        var $el = $(el), el_obj = Metro.getPlugin(el, type);

        if ($el.length === 0) {
            console.warn(type + ' ' + el + ' not found!');
            return false;
        }

        if (el_obj === undefined) {
            console.warn('Element not contain role '+ type +'! Please add attribute data-role="'+type+'" to element ' + el);
            return false;
        }

        return true;
    },

    isJQuery: function(el){
        return (typeof jQuery !== "undefined" && el instanceof jQuery);
    },

    isM4Q: function(el){
        return (typeof m4q !== "undefined" && el instanceof m4q);
    },

    isQ: function(el){
        return Utils.isJQuery(el) || Utils.isM4Q(el);
    },

    embedObject: function(val){
        return "<div class='embed-container'>" + $(val)[0].outerHTML + "</div>";
    },

    embedUrl: function(val){
        if (val.indexOf("youtu.be") !== -1) {
            val = "https://www.youtube.com/embed/" + val.split("/").pop();
        }
        return "<div class='embed-container'><iframe src='"+val+"'></iframe></div>";
    },

    secondsToTime: function(secs) {
        var hours = Math.floor(secs / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

        return {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
    },

    hex2rgba: function(hex, alpha){
        var c;
        alpha = isNaN(alpha) ? 1 : alpha;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length=== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
        }
        throw new Error('Hex2rgba error. Bad Hex value');
    },

    random: function(from, to){
        return Math.floor(Math.random()*(to-from+1)+from);
    },

    uniqueId: function () {
        "use strict";
        var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },

    elementId: function(prefix){
        return prefix+"-"+(new Date()).getTime()+Utils.random(1, 1000);
    },

    secondsToFormattedString: function(time){
        var sec_num = parseInt(time, 10);
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        return [hours, minutes, seconds].join(":");
    },

    callback: function(f, args, context){
        return Utils.exec(f, args, context);
    },

    func: function(f){
        return new Function("a", f);
    },

    exec: function(f, args, context){
        var result;
        if (f === undefined || f === null) {return false;}
        var func = Utils.isFunc(f);

        if (func === false) {
            func = Utils.func(f);
        }

        try {
            result = func.apply(context, args);
        } catch (err) {
            result = null;
            if (METRO_THROWS === true) {
                throw err;
            }
        }
        return result;
    },

    isOutsider: function(element) {
        var el = $(element);
        var rect;
        var clone = el.clone();

        clone.removeAttr("data-role").css({
            visibility: "hidden",
            position: "absolute",
            display: "block"
        });
        el.parent().append(clone);

        rect = clone[0].getBoundingClientRect();
        clone.remove();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    inViewport: function(el){
        var rect = Utils.rect(el);

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    rect: function(el){
        return el.getBoundingClientRect();
    },

    getCursorPosition: function(el, e){
        var a = Utils.rect(el);
        return {
            x: Utils.pageXY(e).x - a.left - window.pageXOffset,
            y: Utils.pageXY(e).y - a.top - window.pageYOffset
        };
    },

    getCursorPositionX: function(el, e){
        return Utils.getCursorPosition(el, e).x;
    },

    getCursorPositionY: function(el, e){
        return Utils.getCursorPosition(el, e).y;
    },

    objectLength: function(obj){
        return Object.keys(obj).length;
    },

    percent: function(total, part, round_value){
        if (total === 0) {
            return 0;
        }
        var result = part * 100 / total;
        return round_value === true ? Math.round(result) : Math.round(result * 100) / 100;
    },

    camelCase: function(str){
        return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    },

    dashedName: function(str){
        return str.replace(/([A-Z])/g, function(u) { return "-" + u.toLowerCase(); });
    },

    objectShift: function(obj){
        var min = 0;
        $.each(obj, function(i){
            if (min === 0) {
                min = i;
            } else {
                if (min > i) {
                    min = i;
                }
            }
        });
        delete obj[min];

        return obj;
    },

    objectDelete: function(obj, key){
        if (obj[key] !== undefined) delete obj[key];
    },

    arrayDeleteByMultipleKeys: function(arr, keys){
        keys.forEach(function(ind){
            delete arr[ind];
        });
        return arr.filter(function(item){
            return item !== undefined;
        })
    },

    arrayDelete: function(arr, val){
        if (arr.indexOf(val) > -1) arr.splice(arr.indexOf(val), 1);
    },

    arrayDeleteByKey: function(arr, key){
        arr.splice(key, 1);
    },

    nvl: function(data, other){
        return data === undefined || data === null ? other : data;
    },

    objectClone: function(obj){
        var copy = {};
        for(var key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = obj[key];
            }
        }
        return copy;
    },

    github: function(repo, callback){
        $.json('https://api.github.com/repos/' + repo).then(function(data){
            Utils.exec(callback, [data]);
        });
    },

    detectIE: function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    },

    detectChrome: function(){
        return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    },

    md5: function(s){
        return hex_md5(s);
    },

    encodeURI: function(str){
        return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
    },

    pageHeight: function(){
        var body = document.body,
            html = document.documentElement;

        return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    },

    cleanPreCode: function(selector){
        var els = Array.prototype.slice.call(document.querySelectorAll(selector), 0);

        els.forEach(function(el){
            var txt = el.textContent
                .replace(/^[\r\n]+/, "")	// strip leading newline
                .replace(/\s+$/g, "");

            if (/^\S/gm.test(txt)) {
                el.textContent = txt;
                return;
            }

            var mat, str, re = /^[\t ]+/gm, len, min = 1e3;

            while (mat = re.exec(txt)) {
                len = mat[0].length;

                if (len < min) {
                    min = len;
                    str = mat[0];
                }
            }

            if (min === 1e3)
                return;

            el.textContent = txt.replace(new RegExp("^" + str, 'gm'), "").trim();
        });
    },

    coords: function(element){
        var el = $(element)[0];
        var box = el.getBoundingClientRect();

        return {
            top: box.top + window.pageYOffset,
            left: box.left + window.pageXOffset
        };
    },

    positionXY: function(e, t){
        switch (t) {
            case 'client': return Utils.clientXY(e);
            case 'screen': return Utils.screenXY(e);
            case 'page': return Utils.pageXY(e);
            default: return {x: 0, y: 0}
        }
    },

    clientXY: function(e){
        return {
            x: e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
            y: e.changedTouches ? e.changedTouches[0].clientY : e.clientY
        };
    },

    screenXY: function(e){
        return {
            x: e.changedTouches ? e.changedTouches[0].screenX : e.screenX,
            y: e.changedTouches ? e.changedTouches[0].screenY : e.screenY
        };
    },

    pageXY: function(e){
        return {
            x: e.changedTouches ? e.changedTouches[0].pageX : e.pageX,
            y: e.changedTouches ? e.changedTouches[0].pageY : e.pageY
        };
    },

    isRightMouse: function(e){
        return "which" in e ? e.which === 3 : "button" in e ? e.button === 2 : undefined;
    },

    hiddenElementSize: function(el, includeMargin){
        var width, height, clone = $(el).clone(true);

        clone.removeAttr("data-role").css({
            visibility: "hidden",
            position: "absolute",
            display: "block"
        });
        $("body").append(clone);

        if (!Utils.isValue(includeMargin)) {
            includeMargin = false;
        }

        width = clone.outerWidth(includeMargin);
        height = clone.outerHeight(includeMargin);
        clone.remove();
        return {
            width: width,
            height: height
        }
    },

    getStyle: function(element, pseudo){
        var el = $(element)[0];
        return window.getComputedStyle(el, pseudo);
    },

    getStyleOne: function(el, property){
        return Utils.getStyle(el).getPropertyValue(property);
    },

    getTransformMatrix: function(el, returnArray){
        var computedMatrix = Utils.getStyleOne(el, "transform");
        var a = computedMatrix
            .replace("matrix(", '')
            .slice(0, -1)
            .split(',');
        return returnArray !== true ? {
            a: a[0],
            b: a[1],
            c: a[2],
            d: a[3],
            tx: a[4],
            ty: a[5]
        } : a;
    },

    computedRgbToHex: function(rgb){
        var a = rgb.replace(/[^\d,]/g, '').split(',');
        var result = "#", i;

        for(i = 0; i < 3; i++) {
            var h = parseInt(a[i]).toString(16);
            result += h.length === 1 ? "0" + h : h;
        }

        return result;
    },

    computedRgbToRgba: function(rgb, alpha){
        var a = rgb.replace(/[^\d,]/g, '').split(',');
        if (alpha === undefined) {
            alpha = 1;
        }
        a.push(alpha);
        return "rgba("+a.join(",")+")";
    },

    computedRgbToArray: function(rgb){
        return rgb.replace(/[^\d,]/g, '').split(',');
    },

    hexColorToArray: function(hex){
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length === 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return [(c>>16)&255, (c>>8)&255, c&255];
        }
        return [0,0,0];
    },

    hexColorToRgbA: function(hex, alpha){
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length === 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255, alpha ? alpha : 1].join(',')+')';
        }
        return 'rgba(0,0,0,1)';
    },

    getInlineStyles: function(element){
        var i, l, styles = {}, el = $(element)[0];
        for (i = 0, l = el.style.length; i < l; i++) {
            var s = el.style[i];
            styles[s] = el.style[s];
        }

        return styles;
    },

    updateURIParameter: function(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    },

    getURIParameter: function(url, name){
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    getLocales: function(){
        return Object.keys(Metro.locales);
    },

    addLocale: function(locale){
        Metro.locales = $.extend( {}, Metro.locales, locale );
    },

    strToArray: function(str, delimiter, type, format){
        var a;

        if (!Utils.isValue(delimiter)) {
            delimiter = ",";
        }

        if (!Utils.isValue(type)) {
            type = "string";
        }

        a = (""+str).split(delimiter);

        return a.map(function(s){
            var result;

            switch (type) {
                case "int":
                case "integer": result = parseInt(s); break;
                case "number":
                case "float": result = parseFloat(s); break;
                case "date": result = !Utils.isValue(format) ? new Date(s) : s.toDate(format); break;
                default: result = s.trim();
            }

            return result;
        })
    },

    aspectRatioH: function(width, a){
        if (a === "16/9") return width * 9 / 16;
        if (a === "21/9") return width * 9 / 21;
        if (a === "4/3") return width * 3 / 4;
    },

    aspectRatioW: function(height, a){
        if (a === "16/9") return height * 16 / 9;
        if (a === "21/9") return height * 21 / 9;
        if (a === "4/3") return height * 4 / 3;
    },

    valueInObject: function(obj, value){
        return Object.values(obj).indexOf(value) > -1;
    },

    keyInObject: function(obj, key){
        return Object.keys(obj).indexOf(key) > -1;
    },

    inObject: function(obj, key, val){
        return obj[key] !== undefined && obj[key] === val;
    },

    newCssSheet: function(media){
        var style = document.createElement("style");

        if (media !== undefined) {
            style.setAttribute("media", media);
        }

        style.appendChild(document.createTextNode(""));

        document.head.appendChild(style);

        return style.sheet;
    },

    addCssRule: function(sheet, selector, rules, index){
        if("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else if("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
        }
    },

    media: function(query){
        return window.matchMedia(query).matches
    },

    mediaModes: function(){
        return METRO_MEDIA;
    },

    mediaExist: function(media){
        return METRO_MEDIA.indexOf(media) > -1;
    },

    inMedia: function(media){
        return METRO_MEDIA.indexOf(media) > -1 && METRO_MEDIA.indexOf(media) === METRO_MEDIA.length - 1;
    },

    isValue: function(val){
        return val !== undefined && val !== null && val !== "";
    },

    isNull: function(val){
        return val === undefined || val === null;
    },

    isNegative: function(val){
        return parseFloat(val) < 0;
    },

    isPositive: function(val){
        return parseFloat(val) > 0;
    },

    isZero: function(val){
        return (parseFloat(val.toFixed(2))) === 0.00;
    },

    between: function(val, bottom, top, equals){
        return equals === true ? val >= bottom && val <= top : val > bottom && val < top;
    },

    parseMoney: function(val){
        return Number(parseFloat(val.replace(/[^0-9-.]/g, '')));
    },

    parseCard: function(val){
        return val.replace(/[^0-9]/g, '');
    },

    parsePhone: function(val){
        return Utils.parseCard(val);
    },

    isVisible: function(element){
        var el = $(element)[0];
        return Utils.getStyleOne(el, "display") !== "none" && Utils.getStyleOne(el, "visibility") !== "hidden" && el.offsetParent !== null;
    },

    parseNumber: function(val, thousand, decimal){
        return val.replace(new RegExp('\\'+thousand, "g"), "").replace(new RegExp('\\'+decimal, 'g'), ".");
    },

    nearest: function(val, precision, down){
        val /= precision;
        val = Math[down === true ? 'floor' : 'ceil'](val) * precision;
        return val;
    },

    bool: function(value){
        switch(value){
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    },

    copy: function(element){
        var body = document.body, range, sel;
        var el = $(element)[0];

        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            sel.removeAllRanges();
            try {
                range.selectNodeContents(el);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(el);
                sel.addRange(range);
            }
        } else if (body.createTextRange) {
            range = body.createTextRange();
            range.moveToElementText(el);
            range.select();
        }

        document.execCommand("Copy");

        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {  // IE?
            document.selection.empty();
        }
    },

    isLocalhost: function(pattern){
        pattern = pattern || ".local";
        return (
            location.hostname === "localhost" ||
            location.hostname === "127.0.0.1" ||
            location.hostname === "[::1]" ||
            location.hostname === "" ||
            window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/ ) ||
            location.hostname.indexOf(pattern) !== -1
        )
    },

    formData: function(f){
        var form = $(f)[0];
        var i, j, q = {};

        if (!form || form.nodeName !== "FORM") {
            return;
        }

        for (i = form.elements.length - 1; i >= 0; i = i - 1) {
            if (form.elements[i].name === "") {
                continue;
            }
            switch (form.elements[i].nodeName) {
                case 'INPUT':
                    switch (form.elements[i].type) {
                        case 'text':
                        case 'hidden':
                        case 'password':
                        case 'button':
                        case 'reset':
                        case 'submit':
                            q[form.elements[i].name] = form.elements[i].value;
                            break;
                        case 'checkbox':
                        case 'radio':
                            if (form.elements[i].checked) {
                                q[form.elements[i].name] = form.elements[i].value;
                            }
                            break;
                        case 'file':
                            break;
                    }
                    break;
                case 'TEXTAREA':
                    q[form.elements[i].name] = form.elements[i].value;
                    break;
                case 'SELECT':
                    switch (form.elements[i].type) {
                        case 'select-one':
                            q[form.elements[i].name] = form.elements[i].value;
                            break;
                        case 'select-multiple':
                            q[form.elements[i].name] = [];
                            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                if (form.elements[i].options[j].selected) {
                                    q[form.elements[i].name].push(form.elements[i].options[j].value);
                                }
                            }
                            break;
                    }
                    break;
                case 'BUTTON':
                    switch (form.elements[i].type) {
                        case 'reset':
                        case 'submit':
                        case 'button':
                            q[form.elements[i].name] = form.elements[i].value;
                            break;
                    }
                    break;
            }
        }
        return q;
    }
};

Metro['utils'] = Utils;

var AccordionDefaultConfig = {
    showMarker: true,
    material: false,
    duration: METRO_ANIMATION_DURATION,
    oneFrame: true,
    showActive: true,
    activeFrameClass: "",
    activeHeadingClass: "",
    activeContentClass: "",
    onFrameOpen: Metro.noop,
    onFrameBeforeOpen: Metro.noop_true,
    onFrameClose: Metro.noop,
    onFrameBeforeClose: Metro.noop_true,
    onAccordionCreate: Metro.noop
};

Metro.accordionSetup = function(options){
    AccordionDefaultConfig = $.extend({}, AccordionDefaultConfig, options);
};

if (typeof window["metroAccordionSetup"] !== undefined) {
    Metro.accordionSetup(window["metroAccordionSetup"]);
}

var Accordion = {
    init: function( options, elem ) {
        this.options = $.extend( {}, AccordionDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "accordion");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onAccordionCreate, [element]);
        element.fire("accordioncreate");
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var frames = element.children(".frame");
        var active = element.children(".frame.active");
        var frame_to_open;

        element.addClass("accordion");

        if (o.showMarker === true) {
            element.addClass("marker-on");
        }

        if (o.material === true) {
            element.addClass("material");
        }

        if (active.length === 0) {
            frame_to_open = frames[0];
        } else {
            frame_to_open = active[0];
        }

        this._hideAll();

        if (o.showActive === true) {
            if (o.oneFrame === true) {
                this._openFrame(frame_to_open);
            } else {
                $.each(active, function(){
                    that._openFrame(this);
                })
            }
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var active = element.children(".frame.active");

        element.on(Metro.events.click, ".heading", function(){
            var heading = $(this);
            var frame = heading.parent();

            if (heading.closest(".accordion")[0] !== element[0]) {
                return false;
            }

            if (frame.hasClass("active")) {
                if (active.length === 1 && o.oneFrame) {
                } else {
                    that._closeFrame(frame);
                }
            } else {
                that._openFrame(frame);
            }
        });
    },

    _openFrame: function(f){
        var element = this.element, o = this.options;
        var frame = $(f);

        if (Utils.exec(o.onFrameBeforeOpen, [frame[0]], element[0]) === false) {
            return false;
        }

        if (o.oneFrame === true) {
            this._closeAll(frame[0]);
        }

        frame.addClass("active " + o.activeFrameClass);
        frame.children(".heading").addClass(o.activeHeadingClass);
        frame.children(".content").addClass(o.activeContentClass).slideDown(o.duration);

        Utils.exec(o.onFrameOpen, [frame[0]], element[0]);

        element.fire("frameopen", {
            frame: frame[0]
        });
    },

    _closeFrame: function(f){
        var element = this.element, o = this.options;
        var frame = $(f);

        if (!frame.hasClass("active")) {
            return ;
        }

        if (Utils.exec(o.onFrameBeforeClose, [frame[0]], element[0]) === false) {
            return ;
        }

        frame.removeClass("active " + o.activeFrameClass);
        frame.children(".heading").removeClass(o.activeHeadingClass);
        frame.children(".content").removeClass(o.activeContentClass).slideUp(o.duration);

        Utils.callback(o.onFrameClose, [frame[0]], element[0]);

        element.fire("frameclose", {
            frame: frame[0]
        });
    },

    _closeAll: function(skip){
        var that = this, element = this.element;
        var frames = element.children(".frame");

        $.each(frames, function(){
            if (skip === this) return;
            that._closeFrame(this);
        });
    },

    _hideAll: function(){
        var element = this.element;
        var frames = element.children(".frame");

        $.each(frames, function(){
            $(this).children(".content").hide();
            // $(this).children(".content").css("display", "none");
        });
    },

    _openAll: function(){
        var that = this, element = this.element;
        var frames = element.children(".frame");

        $.each(frames, function(){
            that._openFrame(this);
        });
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;
        element.off(Metro.events.click, ".heading");
        return element;
    }
};

Metro.plugin('accordion', Accordion);

var ActivityDefaultConfig = {
    type: "ring",
    style: "light",
    size: 64,
    radius: 20,
    onActivityCreate: Metro.noop
};

Metro.activitySetup = function(options){
    ActivityDefaultConfig = $.extend({}, ActivityDefaultConfig, options);
};

if (typeof window["metroActivitySetup"] !== undefined) {
    Metro.activitySetup(window["metroActivitySetup"]);
}

var Activity = {
    init: function( options, elem ) {
        this.options = $.extend( {}, ActivityDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;
        var i, wrap;

        Metro.checkRuntime(element, "activity");

        element
            .html('')
            .addClass(o.style + "-style")
            .addClass("activity-" + o.type);

        function _metro(){
            for(i = 0; i < 5 ; i++) {
                $("<div/>").addClass('circle').appendTo(element);
            }
        }

        function _square(){
            for(i = 0; i < 4 ; i++) {
                $("<div/>").addClass('square').appendTo(element);
            }
        }

        function _cycle(){
            $("<div/>").addClass('cycle').appendTo(element);
        }

        function _ring(){
            for(i = 0; i < 5 ; i++) {
                wrap = $("<div/>").addClass('wrap').appendTo(element);
                $("<div/>").addClass('circle').appendTo(wrap);
            }
        }

        function _simple(){
            $('<svg class="circular"><circle class="path" cx="'+o.size/2+'" cy="'+o.size/2+'" r="'+o.radius+'" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>').appendTo(element);
        }

        switch (o.type) {
            case 'metro': _metro(); break;
            case 'square': _square(); break;
            case 'cycle': _cycle(); break;
            case 'simple': _simple(); break;
            default: _ring();
        }

        Utils.exec(this.options.onActivityCreate, [this.element]);
        element.fire("activitycreate")
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        return this.element;
    }
};

Metro.plugin('activity', Activity);

Metro['activity'] = {
    open: function(options){

        var activity = '<div data-role="activity" data-type="'+( options.type ? options.type : 'cycle' )+'" data-style="'+( options.style ? options.style : 'color' )+'"></div>';
        var text = options.text ? '<div class="text-center">'+options.text+'</div>' : '';

        return Metro.dialog.create({
            content: activity + text,
            defaultAction: false,
            clsContent: "d-flex flex-column flex-justify-center flex-align-center bg-transparent no-shadow w-auto",
            clsDialog: "no-border no-shadow bg-transparent global-dialog",
            autoHide: options.autoHide ? options.autoHide : 0,
            overlayClickClose: options.overlayClickClose === true,
            overlayColor: options.overlayColor?options.overlayColor:'#000000',
            overlayAlpha: options.overlayAlpha?options.overlayAlpha:.5,
            clsOverlay: "global-overlay"
        })
    },

    close: function(a){
        Metro.dialog.close(a);
    }
};

var AppBarDefaultConfig = {
    expand: false,
    expandPoint: null,
    duration: 100,
    onAppBarCreate: Metro.noop
};

Metro.appBarSetup = function(options){
    AppBarDefaultConfig = $.extend({}, AppBarDefaultConfig, options);
};

if (typeof window["metroAppBarSetup"] !== undefined) {
    Metro.appBarSetup(window["metroAppBarSetup"]);
}

var AppBar = {
    init: function( options, elem ) {
        this.options = $.extend( {}, AppBarDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "appbar");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onAppBarCreate, [element]);
        element.fire("appbarcreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var id = Utils.elementId("app-bar");
        var hamburger, menu;

        element.addClass("app-bar");

        hamburger = element.find(".hamburger");
        if (hamburger.length === 0) {
            hamburger = $("<button>").attr("type", "button").addClass("hamburger menu-down");
            for(var i = 0; i < 3; i++) {
                $("<span>").addClass("line").appendTo(hamburger);
            }

            if (Colors.isLight(Utils.computedRgbToHex(Utils.getStyleOne(element, "background-color"))) === true) {
                hamburger.addClass("dark");
            }
        }

        element.prepend(hamburger);
        menu = element.find(".app-bar-menu");

        if (menu.length === 0) {
            hamburger.css("display", "none");
        } else {
            Utils.addCssRule(Metro.sheet, ".app-bar-menu li", "list-style: none!important;"); // This special for IE11 and Edge
        }

        if( !!element.attr("id") === false ){
            element.attr("id", id);
        }

        if (hamburger.css('display') === 'block') {
            menu.hide().addClass("collapsed");
            hamburger.removeClass("hidden");
        } else {
            hamburger.addClass("hidden");
        }

        if (o.expand === true) {
            element.addClass("app-bar-expand");
            hamburger.addClass("hidden");
        } else {
            if (Utils.isValue(o.expandPoint) && Utils.mediaExist(o.expandPoint)) {
                element.addClass("app-bar-expand");
                hamburger.addClass("hidden");
            }
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var menu = element.find(".app-bar-menu");
        var hamburger = element.find(".hamburger");

        element.on(Metro.events.click, ".hamburger", function(){
            if (menu.length === 0) return ;
            var collapsed = menu.hasClass("collapsed");
            if (collapsed) {
                that.open();
            } else {
                that.close();
            }
        });

        $(window).on(Metro.events.resize, function(){

            if (o.expand !== true) {
                if (Utils.isValue(o.expandPoint) && Utils.mediaExist(o.expandPoint)) {
                    element.addClass("app-bar-expand");
                } else {
                    element.removeClass("app-bar-expand");
                }
            }

            if (menu.length === 0) return ;

            if (hamburger.css('display') !== 'block') {
                menu.show();
                hamburger.addClass("hidden");
            } else {
                hamburger.removeClass("hidden");
                if (hamburger.hasClass("active")) {
                    menu.show().removeClass("collapsed");
                } else {
                    menu.hide().addClass("collapsed");
                }
            }
        }, {ns: element.attr("id")});
    },

    close: function(){
        var element = this.element, o = this.options;
        var menu = element.find(".app-bar-menu");
        var hamburger = element.find(".hamburger");

        menu.slideUp(o.duration, function(){
            menu.addClass("collapsed");
            hamburger.removeClass("active");
        });
    },

    open: function(){
        var element = this.element, o = this.options;
        var menu = element.find(".app-bar-menu");
        var hamburger = element.find(".hamburger");

        menu.slideDown(o.duration, function(){
            menu.removeClass("collapsed");
            hamburger.addClass("active");
        });
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;
        element.off(Metro.events.click, ".hamburger");
        $(window).off(Metro.events.resize, {ns: element.attr("id")});
        return element;
    }
};

Metro.plugin('appbar', AppBar);

var AudioDefaultConfig = {
    playlist: null,
    src: null,

    volume: .5,
    loop: false,
    autoplay: false,

    showLoop: true,
    showPlay: true,
    showStop: true,
    showMute: true,
    showFull: true,
    showStream: true,
    showVolume: true,
    showInfo: true,

    showPlaylist: true,
    showNext: true,
    showPrev: true,
    showFirst: true,
    showLast: true,
    showForward: true,
    showBackward: true,
    showShuffle: true,
    showRandom: true,

    loopIcon: "<span class='default-icon-loop'></span>",
    stopIcon: "<span class='default-icon-stop'></span>",
    playIcon: "<span class='default-icon-play'></span>",
    pauseIcon: "<span class='default-icon-pause'></span>",
    muteIcon: "<span class='default-icon-mute'></span>",
    volumeLowIcon: "<span class='default-icon-low-volume'></span>",
    volumeMediumIcon: "<span class='default-icon-medium-volume'></span>",
    volumeHighIcon: "<span class='default-icon-high-volume'></span>",

    playlistIcon: "<span class='default-icon-playlist'></span>",
    nextIcon: "<span class='default-icon-next'></span>",
    prevIcon: "<span class='default-icon-prev'></span>",
    firstIcon: "<span class='default-icon-first'></span>",
    lastIcon: "<span class='default-icon-last'></span>",
    forwardIcon: "<span class='default-icon-forward'></span>",
    backwardIcon: "<span class='default-icon-backward'></span>",
    shuffleIcon: "<span class='default-icon-shuffle'></span>",
    randomIcon: "<span class='default-icon-random'></span>",

    onPlay: Metro.noop,
    onPause: Metro.noop,
    onStop: Metro.noop,
    onEnd: Metro.noop,
    onMetadata: Metro.noop,
    onTime: Metro.noop,
    onAudioCreate: Metro.noop
};

Metro.audioSetup = function(options){
    AudioDefaultConfig = $.extend({}, AudioDefaultConfig, options);
};

if (typeof window["metroAudioSetup"] !== undefined) {
    Metro.audioSetup(window["metroAudioSetup"]);
}

var Audio = {
    init: function( options, elem ) {
        this.options = $.extend( {}, AudioDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.preloader = null;
        this.player = null;
        this.audio = elem;
        this.stream = null;
        this.volume = null;
        this.volumeBackup = 0;
        this.muted = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "audio");

        this._createPlayer();
        this._createControls();
        this._createEvents();

        if (o.autoplay === true) {
            this.play();
        }

        Utils.exec(o.onAudioCreate, [element, this.player], element[0]);
        element.fire("audiocreate");
    },

    _createPlayer: function(){
        var element = this.element, o = this.options, audio = this.audio;

        var prev = element.prev();
        var parent = element.parent();
        var player = $("<div>").addClass("media-player audio-player " + element[0].className);

        if (prev.length === 0) {
            parent.prepend(player);
        } else {
            player.insertAfter(prev);
        }

        element.appendTo(player);

        $.each(['muted', 'autoplay', 'controls', 'height', 'width', 'loop', 'poster', 'preload'], function(){
            element.removeAttr(this);
        });

        element.attr("preload", "auto");

        audio.volume = o.volume;

        if (o.src !== null) {
            this._setSource(o.src);
        }

        element[0].className = "";

        this.player = player;
    },

    _setSource: function(src){
        var element = this.element;

        element.find("source").remove();
        element.removeAttr("src");
        if (Array.isArray(src)) {
            $.each(src, function(){
                var item = this;
                if (item.src === undefined) return ;
                $("<source>").attr('src', item.src).attr('type', item.type !== undefined ? item.type : '').appendTo(element);
            });
        } else {
            element.attr("src", src);
        }
    },

    _createControls: function(){
        var that = this, element = this.element, o = this.options, audio = this.elem;

        var controls = $("<div>").addClass("controls").addClass(o.clsControls).insertAfter(element);


        var stream = $("<div>").addClass("stream").appendTo(controls);
        var streamSlider = $("<input>").addClass("stream-slider ultra-thin cycle-marker").appendTo(stream);
        var preloader = $("<div>").addClass("load-audio").appendTo(stream);

        var volume = $("<div>").addClass("volume").appendTo(controls);
        var volumeSlider = $("<input>").addClass("volume-slider ultra-thin cycle-marker").appendTo(volume);

        var infoBox = $("<div>").addClass("info-box").appendTo(controls);

        if (o.showInfo !== true) {
            infoBox.hide();
        }

        preloader.activity({
            type: "metro",
            style: "color"
        });

        preloader.hide(0);

        this.preloader = preloader;

        Metro.makePlugin(streamSlider, "slider", {
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            clsComplete: "bg-cyan",
            hint: true,
            onStart: function(){
                if (!audio.paused) audio.pause();
            },
            onStop: function(val){
                if (audio.seekable.length > 0) {
                    audio.currentTime = (that.duration * val / 100).toFixed(0);
                }
                if (audio.paused && audio.currentTime > 0) {
                    audio.play();
                }
            }
        });

        this.stream = streamSlider;

        if (o.showStream !== true) {
            stream.hide();
        }

        Metro.makePlugin(volumeSlider, "slider", {
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            hint: true,
            value: o.volume * 100,
            onChangeValue: function(val){
                audio.volume = val / 100;
            }
        });

        this.volume = volumeSlider;

        if (o.showVolume !== true) {
            volume.hide();
        }

        var loop;

        if (o.showLoop === true) loop = $("<button>").attr("type", "button").addClass("button square loop").html(o.loopIcon).appendTo(controls);
        if (o.showPlay === true) $("<button>").attr("type", "button").addClass("button square play").html(o.playIcon).appendTo(controls);
        if (o.showStop === true) $("<button>").attr("type", "button").addClass("button square stop").html(o.stopIcon).appendTo(controls);
        if (o.showMute === true) $("<button>").attr("type", "button").addClass("button square mute").html(o.muteIcon).appendTo(controls);

        if (o.loop === true) {
            loop.addClass("active");
            element.attr("loop", "loop");
        }

        this._setVolume();

        if (o.muted) {
            that.volumeBackup = audio.volume;
            Metro.getPlugin(that.volume, 'slider').val(0);
            audio.volume = 0;
        }

        infoBox.html("00:00 / 00:00");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options, audio = this.elem, player = this.player;

        element.on("loadstart", function(){
            that.preloader.fadeIn();
        });

        element.on("loadedmetadata", function(){
            that.duration = audio.duration.toFixed(0);
            that._setInfo(0, that.duration);
            Utils.exec(o.onMetadata, [audio, player], element[0]);
        });

        element.on("canplay", function(){
            that._setBuffer();
            that.preloader.fadeOut();
        });

        element.on("progress", function(){
            that._setBuffer();
        });

        element.on("timeupdate", function(){
            var position = Math.round(audio.currentTime * 100 / that.duration);
            that._setInfo(audio.currentTime, that.duration);
            Metro.getPlugin(that.stream, 'slider').val(position);
            Utils.exec(o.onTime, [audio.currentTime, that.duration, audio, player], element[0]);
        });

        element.on("waiting", function(){
            that.preloader.fadeIn();
        });

        element.on("loadeddata", function(){

        });

        element.on("play", function(){
            player.find(".play").html(o.pauseIcon);
            Utils.exec(o.onPlay, [audio, player], element[0]);
        });

        element.on("pause", function(){
            player.find(".play").html(o.playIcon);
            Utils.exec(o.onPause, [audio, player], element[0]);
        });

        element.on("stop", function(){
            Metro.getPlugin(that.stream, 'slider').val(0);
            Utils.exec(o.onStop, [audio, player], element[0]);
        });

        element.on("ended", function(){
            Metro.getPlugin(that.stream, 'slider').val(0);
            Utils.exec(o.onEnd, [audio, player], element[0]);
        });

        element.on("volumechange", function(){
            that._setVolume();
        });

        player.on(Metro.events.click, ".play", function(){
            if (audio.paused) {
                that.play();
            } else {
                that.pause();
            }
        });

        player.on(Metro.events.click, ".stop", function(){
            that.stop();
        });

        player.on(Metro.events.click, ".mute", function(){
            that._toggleMute();
        });

        player.on(Metro.events.click, ".loop", function(){
            that._toggleLoop();
        });
    },

    _toggleLoop: function(){
        var loop = this.player.find(".loop");
        if (loop.length === 0) return ;
        loop.toggleClass("active");
        if (loop.hasClass("active")) {
            this.element.attr("loop", "loop");
        } else {
            this.element.removeAttr("loop");
        }
    },

    _toggleMute: function(){
        this.muted = !this.muted;
        if (this.muted === false) {
            this.audio.volume = this.volumeBackup;
        } else {
            this.volumeBackup = this.audio.volume;
            this.audio.volume = 0;
        }
        Metro.getPlugin(this.volume, 'slider').val(this.muted === false ? this.volumeBackup * 100 : 0);
    },

    _setInfo: function(a, b){
        this.player.find(".info-box").html(Utils.secondsToFormattedString(Math.round(a)) + " / " + Utils.secondsToFormattedString(Math.round(b)));
    },

    _setBuffer: function(){
        var buffer = this.audio.buffered.length ? Math.round(Math.floor(this.audio.buffered.end(0)) / Math.floor(this.audio.duration) * 100) : 0;
        Metro.getPlugin(this.stream, 'slider').buff(buffer);
    },

    _setVolume: function(){
        var audio = this.audio, player = this.player, o = this.options;

        var volumeButton = player.find(".mute");
        var volume = audio.volume * 100;
        if (volume > 1 && volume < 30) {
            volumeButton.html(o.volumeLowIcon);
        } else if (volume >= 30 && volume < 60) {
            volumeButton.html(o.volumeMediumIcon);
        } else if (volume >= 60 && volume <= 100) {
            volumeButton.html(o.volumeHighIcon);
        } else {
            volumeButton.html(o.muteIcon);
        }
    },

    play: function(src){
        if (src !== undefined) {
            this._setSource(src);
        }

        if (this.element.attr("src") === undefined && this.element.find("source").length === 0) {
            return ;
        }

        this.audio.play();
    },

    pause: function(){
        this.audio.pause();
    },

    resume: function(){
        if (this.audio.paused) {
            this.play();
        }
    },

    stop: function(){
        this.audio.pause();
        this.audio.currentTime = 0;
        Metro.getPlugin(this.stream, 'slider').val(0);
    },

    volume: function(v){
        if (v === undefined) {
            return this.audio.volume;
        }

        if (v > 1) {
            v /= 100;
        }

        this.audio.volume = v;
        Metro.getPlugin(this.volume, 'slider').val(v*100);
    },

    loop: function(){
        this._toggleLoop();
    },

    mute: function(){
        this._toggleMute();
    },

    changeSource: function(){
        var src = JSON.parse(this.element.attr('data-src'));
        this.play(src);
    },

    changeVolume: function(){
        var volume = this.element.attr("data-volume");
        this.volume(volume);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-src": this.changeSource(); break;
            case "data-volume": this.changeVolume(); break;
        }
    },

    destroy: function(){
        var element = this.element, player = this.player;

        element.off("all");
        player.off("all");

        Metro.getPlugin(this.stream[0], "slider").destroy();
        Metro.getPlugin(this.volume[0], "slider").destroy();

        return element;
    }
};

Metro.plugin('audio', Audio);

var BottomSheetDefaultConfig = {
    mode: "list",
    toggle: null,
    onOpen: Metro.noop,
    onClose: Metro.noop,
    onBottomSheetCreate: Metro.noop
};

Metro.bottomSheetSetup = function(options){
    BottomSheetDefaultConfig = $.extend({}, BottomSheetDefaultConfig, options);
};

if (typeof window["metroBottomSheetSetup"] !== undefined) {
    Metro.bottomSheetSetup(window["metroBottomSheetSetup"]);
}

var BottomSheet = {
    init: function( options, elem ) {
        this.options = $.extend( {}, BottomSheetDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.toggle = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "bottomsheet");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onBottomSheetCreate, [element], element[0]);
        element.fire("bottomsheetcreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;

        element
            .addClass("bottom-sheet")
            .addClass(o.mode+"-list");

        if (Utils.isValue(o.toggle) && $(o.toggle).length > 0) {
            this.toggle = $(o.toggle);
        }
    },

    _createEvents: function(){
        var that = this, element = this.element;

        if (Utils.isValue(this.toggle)) {
            this.toggle.on(Metro.events.click, function(){
                that.toggle();
            });
        }

        element.on(Metro.events.click, "li", function(){
            that.close();
        });
    },

    isOpen: function(){
        return this.element.hasClass("opened");
    },

    open: function(mode){
        var element = this.element, o = this.options;

        if (Utils.isValue(mode)) {
            element.removeClass("list-style grid-style").addClass(mode+"-style");
        }

        this.element.addClass("opened");
        Utils.exec(o.onOpen, [element], element[0]);
        element.fire("open");
    },

    close: function(){
        var element = this.element, o = this.options;

        element.removeClass("opened");
        Utils.exec(o.onClose, [element], element[0]);
        element.fire("close");
    },

    toggle: function(mode){
        if (this.isOpen()) {
            this.close();
        } else {
            this.open(mode);
        }
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element;

        if (Utils.isValue(this.toggle)) {
            this.toggle.off(Metro.events.click);
        }

        element.off(Metro.events.click, "li");
        return element;
    }
};

Metro.plugin('bottomsheet', BottomSheet);

Metro['bottomsheet'] = {
    isBottomSheet: function(el){
        return Utils.isMetroObject(el, "bottomsheet");
    },

    open: function(el, as){
        if (!this.isBottomSheet(el)) {
            return false;
        }
        Metro.getPlugin($(el)[0], "bottomsheet").open(as);
    },

    close: function(el){
        if (!this.isBottomSheet(el)) {
            return false;
        }
        Metro.getPlugin($(el)[0], "bottomsheet").close();
    },

    toggle: function(el, as){
        if (!this.isBottomSheet(el)) {
            return false;
        }
        if (this.isOpen(el)) {
            this.close(el);
        } else {
            this.open(el, as);
        }
    },

    isOpen: function(el){
        if (!this.isBottomSheet(el)) {
            return false;
        }
        return Metro.getPlugin($(el)[0], "bottomsheet").isOpen();
    }
};

var ButtonGroupDefaultConfig = {
    targets: "button",
    clsActive: "active",
    requiredButton: false,
    mode: Metro.groupMode.ONE,
    onButtonClick: Metro.noop,
    onButtonsGroupCreate: Metro.noop
};

Metro.buttonGroupSetup = function(options){
    ButtonGroupDefaultConfig = $.extend({}, ButtonGroupDefaultConfig, options);
};

if (typeof window["metroButtonGroupSetup"] !== undefined) {
    Metro.buttonGroupSetup(window["metroButtonGroupSetup"]);
}

var ButtonGroup = {
    init: function( options, elem ) {
        this.options = $.extend( {}, ButtonGroupDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.active = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "buttongroup");

        this._createGroup();
        this._createEvents();

        Utils.exec(o.onButtonsGroupCreate, [element]);
        element.fire("buttongroupcreate");
    },

    _createGroup: function(){
        var element = this.element, o = this.options;
        var buttons, buttons_active, id = Utils.elementId("button-group");

        if (element.attr("id") === undefined) {
            element.attr("id", id);
        }

        element.addClass("button-group");

        buttons = element.find( o.targets );
        buttons_active = element.find( "." + o.clsActive );

        if (o.mode === Metro.groupMode.ONE && buttons_active.length === 0 && o.requiredButton === true) {
            $(buttons[0]).addClass(o.clsActive);
        }

        if (o.mode === Metro.groupMode.ONE && buttons_active.length > 1) {
            buttons.removeClass(o.clsActive);
            $(buttons[0]).addClass(o.clsActive);
        }

        element.find( "." + o.clsActive ).addClass("js-active");
    },

    _createEvents: function(){
        var element = this.element, o = this.options;

        element.on(Metro.events.click, o.targets, function(){
            var el = $(this);

            Utils.exec(o.onButtonClick, [el], this);
            element.fire("buttonclick", {
                button: this
            });

            if (o.mode === Metro.groupMode.ONE && el.hasClass(o.clsActive)) {
                return ;
            }

            if (o.mode === Metro.groupMode.ONE) {
                element.find(o.targets).removeClass(o.clsActive).removeClass("js-active");
                el.addClass(o.clsActive).addClass("js-active");
            } else {
                el.toggleClass(o.clsActive).toggleClass("js-active");
            }

        });
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element, o = this.options;
        element.off(Metro.events.click, o.targets);
        return element;
    }

};

Metro.plugin('buttongroup', ButtonGroup);

var CalendarDefaultConfig = {
    dayBorder: false,
    excludeDay: null,
    prevMonthIcon: "<span class='default-icon-chevron-left'></span>",
    nextMonthIcon: "<span class='default-icon-chevron-right'></span>",
    prevYearIcon: "<span class='default-icon-chevron-left'></span>",
    nextYearIcon: "<span class='default-icon-chevron-right'></span>",
    compact: false,
    wide: false,
    widePoint: null,
    pickerMode: false,
    show: null,
    locale: METRO_LOCALE,
    weekStart: METRO_WEEK_START,
    outside: true,
    buttons: 'cancel, today, clear, done',
    yearsBefore: 100,
    yearsAfter: 100,
    headerFormat: "%A, %b %e",
    showHeader: true,
    showFooter: true,
    showTimeField: true,
    showWeekNumber: false,
    clsCalendar: "",
    clsCalendarHeader: "",
    clsCalendarContent: "",
    clsCalendarFooter: "",
    clsCalendarMonths: "",
    clsCalendarYears: "",
    clsToday: "",
    clsSelected: "",
    clsExcluded: "",
    clsCancelButton: "",
    clsTodayButton: "",
    clsClearButton: "",
    clsDoneButton: "",
    isDialog: false,
    ripple: false,
    rippleColor: "#cccccc",
    exclude: null,
    preset: null,
    minDate: null,
    maxDate: null,
    weekDayClick: false,
    weekNumberClick: false,
    multiSelect: false,
    special: null,
    format: METRO_DATE_FORMAT,
    inputFormat: null,
    onCancel: Metro.noop,
    onToday: Metro.noop,
    onClear: Metro.noop,
    onDone: Metro.noop,
    onDayClick: Metro.noop,
    onDayDraw: Metro.noop,
    onWeekDayClick: Metro.noop,
    onWeekNumberClick: Metro.noop,
    onMonthChange: Metro.noop,
    onYearChange: Metro.noop,
    onCalendarCreate: Metro.noop
};

Metro.calendarSetup = function (options) {
    CalendarDefaultConfig = $.extend({}, CalendarDefaultConfig, options);
};

if (typeof window["metroCalendarSetup"] !== undefined) {
    Metro.calendarSetup(window["metroCalendarSetup"]);
}

var Calendar = {
    init: function( options, elem ) {
        this.options = $.extend( {}, CalendarDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.today = new Date();
        this.today.setHours(0,0,0,0);
        this.show = new Date();
        this.show.setHours(0,0,0,0);
        this.current = {
            year: this.show.getFullYear(),
            month: this.show.getMonth(),
            day: this.show.getDate()
        };
        this.preset = [];
        this.selected = [];
        this.exclude = [];
        this.special = [];
        this.excludeDay = [];
        this.min = null;
        this.max = null;
        this.locale = null;
        this.minYear = this.current.year - this.options.yearsBefore;
        this.maxYear = this.current.year + this.options.yearsAfter;
        this.offset = (new Date()).getTimezoneOffset() / 60 + 1;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "calendar");

        if (!element.attr("id")) {
            element.attr("id", Utils.elementId("calendar"));
        }

        element.html("").addClass("calendar " + (o.compact === true ? "compact" : "")).addClass(o.clsCalendar);

        if (o.dayBorder === true) {
            element.addClass("day-border");
        }

        if (Utils.isValue(o.excludeDay)) {
            this.excludeDay = (""+o.excludeDay).toArray(",", "int");
        }

        if (Utils.isValue(o.preset)) {
            this._dates2array(o.preset, 'selected');
        }

        if (Utils.isValue(o.exclude)) {
            this._dates2array(o.exclude, 'exclude');
        }

        if (Utils.isValue(o.special)) {
            this._dates2array(o.special, 'special');
        }

        if (o.buttons !== false) {
            if (Array.isArray(o.buttons) === false) {
                o.buttons = o.buttons.split(",").map(function(item){
                    return item.trim();
                });
            }
        }

        if (o.minDate !== null && Utils.isDate(o.minDate, o.inputFormat)) {
            this.min = Utils.isValue(o.inputFormat) ? o.minDate.toDate(o.inputFormat) : (new Date(o.minDate));
        }

        if (o.maxDate !== null && Utils.isDate(o.maxDate, o.inputFormat)) {
            this.max = Utils.isValue(o.inputFormat) ? o.maxDate.toDate(o.inputFormat) : (new Date(o.maxDate));
        }

        if (o.show !== null && Utils.isDate(o.show, o.inputFormat)) {
            this.show = Utils.isValue(o.inputFormat) ? o.show.toDate(o.inputFormat) : (new Date(o.show));
            this.show.setHours(0,0,0,0);
            this.current = {
                year: this.show.getFullYear(),
                month: this.show.getMonth(),
                day: this.show.getDate()
            }
        }

        this.locale = Metro.locales[o.locale] !== undefined ? Metro.locales[o.locale] : Metro.locales["en-US"];

        this._drawCalendar();
        this._createEvents();

        if (o.wide === true) {
            element.addClass("calendar-wide");
        } else {
            if (!Utils.isNull(o.widePoint) && Utils.mediaExist(o.widePoint)) {
                element.addClass("calendar-wide");
            }
        }


        if (o.ripple === true && Utils.isFunc(element.ripple) !== false) {
            element.ripple({
                rippleTarget: ".button, .prev-month, .next-month, .prev-year, .next-year, .day",
                rippleColor: this.options.rippleColor
            });
        }

        Utils.exec(this.options.onCalendarCreate, [this.element]);
        element.fire("calendarcreate");
    },

    _dates2array: function(val, category){
        var that = this, o = this.options;
        var dates;

        if (Utils.isNull(val)) {
            return ;
        }

        dates = typeof val === 'string' ? Utils.strToArray(val) : val;

        $.each(dates, function(){
            var _d;

            if (!Utils.isDateObject(this)) {
                _d = Utils.isValue(o.inputFormat) ? this.toDate(o.inputFormat) : new Date(this);
                if (Utils.isDate(_d) === false) {
                    return ;
                }
                _d.setHours(0,0,0,0);
            } else {
                _d = this;
            }

            that[category].push(_d.getTime());
        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        $(window).on(Metro.events.resize, function(){
            if (o.wide !== true) {
                if (!Utils.isNull(o.widePoint) && Utils.mediaExist(o.widePoint)) {
                    element.addClass("calendar-wide");
                } else {
                    element.removeClass("calendar-wide");
                }
            }
        }, {ns: element.attr("id")});

        element.on(Metro.events.click, function(e){
            var months = element.find(".calendar-months");
            var years = element.find(".calendar-years");
            if (months.hasClass("open")) {
                months.removeClass("open");
            }
            if (years.hasClass("open")) {
                years.removeClass("open");
            }
        });

        element.on(Metro.events.click, ".prev-month, .next-month, .prev-year, .next-year", function(e){
            var new_date, el = $(this);

            if (el.hasClass("prev-month")) {
                new_date = new Date(that.current.year, that.current.month - 1, 1);
                if (new_date.getFullYear() < that.minYear) {
                    return ;
                }
            }
            if (el.hasClass("next-month")) {
                new_date = new Date(that.current.year, that.current.month + 1, 1);
                if (new_date.getFullYear() > that.maxYear) {
                    return ;
                }
            }
            if (el.hasClass("prev-year")) {
                new_date = new Date(that.current.year - 1, that.current.month, 1);
                if (new_date.getFullYear() < that.minYear) {
                    return ;
                }
            }
            if (el.hasClass("next-year")) {
                new_date = new Date(that.current.year + 1, that.current.month, 1);
                if (new_date.getFullYear() > that.maxYear) {
                    return ;
                }
            }

            that.current = {
                year: new_date.getFullYear(),
                month: new_date.getMonth(),
                day: new_date.getDate()
            };
            setTimeout(function(){
                that._drawContent();
                if (el.hasClass("prev-month") || el.hasClass("next-month")) {
                    Utils.exec(o.onMonthChange, [that.current, element], element[0]);
                    element.fire("monthchange", {
                        current: that.current
                    });
                }
                if (el.hasClass("prev-year") || el.hasClass("next-year")) {
                    Utils.exec(o.onYearChange, [that.current, element], element[0]);
                    element.fire("yearchange", {
                        current: that.current
                    });
                }
            }, o.ripple ? 300 : 1);
        });

        element.on(Metro.events.click, ".button.today", function(e){
            that.toDay();
            Utils.exec(o.onToday, [that.today, element]);
            element.fire("today", {
                today: that.today
            });
        });

        element.on(Metro.events.click, ".button.clear", function(e){
            that.selected = [];
            that._drawContent();
            Utils.exec(o.onClear, [element]);
            element.fire("clear");
        });

        element.on(Metro.events.click, ".button.cancel", function(e){
            that._drawContent();
            Utils.exec(o.onCancel, [element]);
            element.fire("cancel");
        });

        element.on(Metro.events.click, ".button.done", function(e){
            that._drawContent();
            Utils.exec(o.onDone, [that.selected, element]);
            element.fire("done");
        });

        if (o.weekDayClick === true) {
            element.on(Metro.events.click, ".week-days .day", function (e) {
                var day, index, days;

                day = $(this);
                index = day.index();

                if (o.multiSelect === true) {
                    days = o.outside === true ? element.find(".days-row .day:nth-child(" + (index + 1) + ")") : element.find(".days-row .day:not(.outside):nth-child(" + (index + 1) + ")");
                    $.each(days, function () {
                        var d = $(this);
                        var dd = d.data('day');

                        if (d.hasClass("disabled") || d.hasClass("excluded")) return;

                        if (!that.selected.contains(dd))
                            that.selected.push(dd);
                        d.addClass("selected").addClass(o.clsSelected);
                    });
                }

                Utils.exec(o.onWeekDayClick, [that.selected, day], element[0]);
                element.fire("weekdayclick", {
                    day: day,
                    selected: that.selected
                });

                e.preventDefault();
                e.stopPropagation();
            });
        }

        if (o.weekNumberClick) {
            element.on(Metro.events.click, ".days-row .week-number", function (e) {
                var weekNumElement, weekNumber, days;

                weekNumElement = $(this);
                weekNumber = weekNumElement.text();

                if (o.multiSelect === true) {
                    days = $(this).siblings(".day");
                    $.each(days, function () {
                        var d = $(this);
                        var dd = d.data('day');

                        if (d.hasClass("disabled") || d.hasClass("excluded")) return;

                        if (!that.selected.contains(dd))
                            that.selected.push(dd);
                        d.addClass("selected").addClass(o.clsSelected);
                    });
                }

                Utils.exec(o.onWeekNumberClick, [that.selected, weekNumber, weekNumElement], element[0]);
                element.fire("weeknumberclick", {
                    el: this,
                    num: weekNumber,
                    selected: that.selected
                });

                e.preventDefault();
                e.stopPropagation();
            });
        }

        element.on(Metro.events.click, ".days-row .day", function(e){
            var day = $(this);
            var index, date;

            date = day.data('day');
            index = that.selected.indexOf(date);

            if (day.hasClass("outside")) {
                date = new Date(date);
                that.current = {
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    day: date.getDate()
                };
                that._drawContent();
                return ;
            }

            if (!day.hasClass("disabled")) {

                if (o.pickerMode === true) {
                    that.selected = [date];
                    that.today = new Date(date);
                    that.current.year = that.today.getFullYear();
                    that.current.month = that.today.getMonth();
                    that.current.day = that.today.getDate();
                    that._drawHeader();
                    that._drawContent();
                } else {
                    if (index === -1) {
                        if (o.multiSelect === false) {
                            element.find(".days-row .day").removeClass("selected").removeClass(o.clsSelected);
                            that.selected = [];
                        }
                        that.selected.push(date);
                        day.addClass("selected").addClass(o.clsSelected);
                    } else {
                        day.removeClass("selected").removeClass(o.clsSelected);
                        Utils.arrayDelete(that.selected, date);
                    }
                }

            }

            Utils.exec(o.onDayClick, [that.selected, day, element]);
            element.fire("dayclick", {
                day: day,
                selected: that.selected
            });

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".curr-month", function(e){
            var target;
            var list = element.find(".months-list");

            console.log("ku");

            list.find(".active").removeClass("active");
            list.scrollTop(0);
            element.find(".calendar-months").addClass("open");

            target = list.find(".js-month-"+that.current.month).addClass("active");

            setTimeout(function(){
                list.animate({
                    scrollTop: target.position().top - ( (list.height() - target.height() )/ 2)
                }, 200);
            }, 300);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".calendar-months li", function(e){
            that.current.month = $(this).index();
            that._drawContent();
            Utils.exec(o.onMonthChange, [that.current, element], element[0]);
            element.fire("monthchange", {
                current: that.current
            });
            element.find(".calendar-months").removeClass("open");
            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".curr-year", function(e){
            var target;
            var list = element.find(".years-list");

            list.find(".active").removeClass("active");
            list.scrollTop(0);
            element.find(".calendar-years").addClass("open");

            target = list.find(".js-year-"+that.current.year).addClass("active");

            setTimeout(function(){
                list.animate({
                    scrollTop: target.position().top - ( (list.height() - target.height() )/ 2)
                }, 200);
            }, 300);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".calendar-years li", function(e){
            that.current.year = $(this).text();
            that._drawContent();
            Utils.exec(o.onYearChange, [that.current, element], element[0]);
            element.fire("yearchange", {
                current: that.current
            });
            element.find(".calendar-years").removeClass("open");
            e.preventDefault();
            e.stopPropagation();
        });
    },

    _drawHeader: function(){
        var element = this.element, o = this.options;
        var header = element.find(".calendar-header");

        if (header.length === 0) {
            header = $("<div>").addClass("calendar-header").addClass(o.clsCalendarHeader).appendTo(element);
        }

        header.html("");

        $("<div>").addClass("header-year").html(this.today.getFullYear()).appendTo(header);
        $("<div>").addClass("header-day").html(this.today.format(o.headerFormat, o.locale)).appendTo(header);

        if (o.showHeader === false) {
            header.hide();
        }
    },

    _drawFooter: function(){
        var element = this.element, o = this.options;
        var buttons_locale = this.locale['buttons'];
        var footer = element.find(".calendar-footer");

        if (o.buttons === false) {
            return ;
        }

        if (footer.length === 0) {
            footer = $("<div>").addClass("calendar-footer").addClass(o.clsCalendarFooter).appendTo(element);
        }

        footer.html("");

        $.each(o.buttons, function(){
            var button = $("<button>").attr("type", "button").addClass("button " + this + " " + o['cls'+this.capitalize()+'Button']).html(buttons_locale[this]).appendTo(footer);
            if (this === 'cancel' || this === 'done') {
                button.addClass("js-dialog-close");
            }
        });

        if (o.showFooter === false) {
            footer.hide();
        }
    },

    _drawMonths: function(){
        var element = this.element, o = this.options;
        var months = $("<div>").addClass("calendar-months").addClass(o.clsCalendarMonths).appendTo(element);
        var list = $("<ul>").addClass("months-list").appendTo(months);
        var calendar_locale = this.locale['calendar'];
        var i;
        for(i = 0; i < 12; i++) {
            $("<li>").addClass("js-month-"+i).html(calendar_locale['months'][i]).appendTo(list);
        }
    },

    _drawYears: function(){
        var element = this.element, o = this.options;
        var years = $("<div>").addClass("calendar-years").addClass(o.clsCalendarYears).appendTo(element);
        var list = $("<ul>").addClass("years-list").appendTo(years);
        var i;
        for(i = this.minYear; i <= this.maxYear; i++) {
            $("<li>").addClass("js-year-"+i).html(i).appendTo(list);
        }
    },

    _drawContent: function(){
        var element = this.element, o = this.options;
        var content = element.find(".calendar-content"), toolbar;
        var calendar_locale = this.locale['calendar'];
        var i, j, d, s, counter = 0;
        var first = new Date(this.current.year, this.current.month, 1);
        var first_day;
        var prev_month_days = (new Date(this.current.year, this.current.month, 0)).getDate();
        var year, month;

        if (content.length === 0) {
            content = $("<div>").addClass("calendar-content").addClass(o.clsCalendarContent).appendTo(element);
        }

        content.html("");

        toolbar = $("<div>").addClass("calendar-toolbar").appendTo(content);

        /**
         * Calendar toolbar
         */
        $("<span>").addClass("prev-month").html(o.prevMonthIcon).appendTo(toolbar);
        $("<span>").addClass("curr-month").html(calendar_locale['months'][this.current.month]).appendTo(toolbar);
        $("<span>").addClass("next-month").html(o.nextMonthIcon).appendTo(toolbar);

        $("<span>").addClass("prev-year").html(o.prevYearIcon).appendTo(toolbar);
        $("<span>").addClass("curr-year").html(this.current.year).appendTo(toolbar);
        $("<span>").addClass("next-year").html(o.nextYearIcon).appendTo(toolbar);

        /**
         * Week days
         */
        var week_days = $("<div>").addClass("week-days").appendTo(content);
        var day_class = "day";

        if (o.showWeekNumber === true) {
            $("<span>").addClass("week-number").html("#").appendTo(week_days);
            day_class += " and-week-number";
        }

        for (i = 0; i < 7; i++) {
            if (o.weekStart === 0) {
                j = i;
            } else {
                j = i + 1;
                if (j === 7) j = 0;
            }
            $("<span>").addClass(day_class).html(calendar_locale["days"][j + 7]).appendTo(week_days);
        }

        /**
         * Calendar days
         */
        var days = $("<div>").addClass("days").appendTo(content);
        var days_row = $("<div>").addClass("days-row").appendTo(days);

        first_day = o.weekStart === 0 ? first.getDay() : (first.getDay() === 0 ? 6 : first.getDay() - 1);

        if (this.current.month - 1 < 0) {
            month = 11;
            year = this.current.year - 1;
        } else {
            month = this.current.month - 1;
            year = this.current.year;
        }

        if (o.showWeekNumber === true) {
            $("<div>").addClass("week-number").html((new Date(year, month, prev_month_days - first_day + 1)).getWeek(o.weekStart)).appendTo(days_row);
        }

        for(i = 0; i < first_day; i++) {
            var v = prev_month_days - first_day + i + 1;
            d = $("<div>").addClass(day_class+" outside").appendTo(days_row);

            s = new Date(year, month, v);
            s.setHours(0,0,0,0);

            d.data('day', s.getTime());

            if (o.outside === true) {
                d.html(v);

                if (this.excludeDay.length > 0) {
                    if (this.excludeDay.indexOf(s.getDay()) > -1) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                }

                Utils.exec(o.onDayDraw, [s], d[0]);
                element.fire("daydraw", {
                    cell: d[0],
                    date: s
                });
            }

            counter++;
        }

        first.setHours(0,0,0,0);
        while(first.getMonth() === this.current.month) {

            d = $("<div>").addClass(day_class).html(first.getDate()).appendTo(days_row);

            d.data('day', first.getTime());

            // console.log(this.show.getTime() === first.getTime());
            if (this.show.getTime() === first.getTime()) {
                d.addClass("showed");
            }

            // console.log(this.today.getTime() === first.getTime());
            if (this.today.getTime() === first.getTime()) {
                d.addClass("today").addClass(o.clsToday);
            }

            if (this.special.length === 0) {

                if (this.selected.indexOf(first.getTime()) !== -1) {
                    d.addClass("selected").addClass(o.clsSelected);
                }
                if (this.exclude.indexOf(first.getTime()) !== -1) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }

                if (this.min !== null && first.getTime() < this.min.getTime()) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }
                if (this.max !== null && first.getTime() > this.max.getTime()) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }

                if (this.excludeDay.length > 0) {
                    if (this.excludeDay.indexOf(first.getDay()) > -1) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                }
            } else {

                if (this.special.indexOf(first.getTime()) === -1) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }

            }

            Utils.exec(o.onDayDraw, [first], d[0]);
            element.fire("daydraw", {
                cell: d[0],
                date: first
            });

            counter++;
            if (counter % 7 === 0) {
                days_row = $("<div>").addClass("days-row").appendTo(days);
                if (o.showWeekNumber === true) {
                    $("<div>").addClass("week-number").html((new Date(first.getFullYear(), first.getMonth(), first.getDate() + 1)).getWeek(o.weekStart)).appendTo(days_row);
                }
            }
            first.setDate(first.getDate() + 1);
            first.setHours(0,0,0,0);
        }

        first_day = o.weekStart === 0 ? first.getDay() : (first.getDay() === 0 ? 6 : first.getDay() - 1);

        if (this.current.month + 1 > 11) {
            month = 0;
            year = this.current.year + 1;
        } else {
            month = this.current.month + 1;
            year = this.current.year;
        }

        if (first_day > 0) for(i = 0; i < 7 - first_day; i++) {
            d = $("<div>").addClass(day_class+" outside").appendTo(days_row);
            s = new Date(year, month, i + 1);
            s.setHours(0,0,0,0);
            d.data('day', s.getTime());
            if (o.outside === true) {
                d.html(i + 1);

                if (this.excludeDay.length > 0) {
                    if (this.excludeDay.indexOf(s.getDay()) > -1) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                }

                Utils.exec(o.onDayDraw, [s], d[0]);
                element.fire("daydraw", {
                    cell: d[0],
                    date: s
                });

            }
        }
    },

    _drawCalendar: function(){
        var that = this;
        setTimeout(function(){
            that.element.html("");
            that._drawHeader();
            that._drawContent();
            that._drawFooter();
            that._drawMonths();
            that._drawYears();
        }, 0);
    },

    getPreset: function(){
        return this.preset;
    },

    getSelected: function(){
        return this.selected;
    },

    getExcluded: function(){
        return this.exclude;
    },

    getToday: function(){
        return this.today;
    },

    getCurrent: function(){
        return this.current;
    },

    clearSelected: function(){
        this.selected = [];
        this._drawContent();
    },

    toDay: function(){
        this.today = new Date();
        this.today.setHours(0,0,0,0);
        this.current = {
            year: this.today.getFullYear(),
            month: this.today.getMonth(),
            day: this.today.getDate()
        };
        this._drawHeader();
        this._drawContent();
    },

    setExclude: function(exclude){
        var element = this.element, o = this.options;
        if (Utils.isNull(exclude) && Utils.isNull(element.attr("data-exclude"))) {
            return ;
        }
        o.exclude = !Utils.isNull(exclude) ? exclude : element.attr("data-exclude");
        this._dates2array(o.exclude, 'exclude');
        this._drawContent();
    },

    setPreset: function(preset){
        var element = this.element, o = this.options;
        if (Utils.isNull(preset) && Utils.isNull(element.attr("data-preset"))) {
            return ;
        }

        o.preset = !Utils.isNull(preset) ? preset : element.attr("data-preset");
        this._dates2array(o.preset, 'selected');
        this._drawContent();
    },

    setSpecial: function(special){
        var element = this.element, o = this.options;
        if (Utils.isNull(special) && Utils.isNull(element.attr("data-special"))) {
            return ;
        }
        o.special = !Utils.isNull(special) ? special : element.attr("data-special");
        this._dates2array(o.exclude, 'special');
        this._drawContent();
    },

    setShow: function(show){
        var element = this.element, o = this.options;

        if (Utils.isNull(show) && Utils.isNull(element.attr("data-show"))) {
            return ;
        }
        o.show = !Utils.isNull(show) ? show : element.attr("data-show");

        this.show = Utils.isDateObject(show) ? show : Utils.isValue(o.inputFormat) ? o.show.toDate(o.inputFormat) : new Date(o.show);
        this.show.setHours(0,0,0,0);
        this.current = {
            year: this.show.getFullYear(),
            month: this.show.getMonth(),
            day: this.show.getDate()
        };

        this._drawContent();
    },

    setMinDate: function(date){
        var element = this.element, o = this.options;

        o.minDate = Utils.isValue(date) ? date : element.attr("data-min-date");
        if (Utils.isValue(o.minDate) && Utils.isDate(o.minDate, o.inputFormat)) {
            this.min = Utils.isValue(o.inputFormat) ? o.minDate.toDate(o.inputFormat) : (new Date(o.minDate));
        }

        this._drawContent();
    },

    setMaxDate: function(date){
        var element = this.element, o = this.options;

        o.maxDate = Utils.isValue(date) ? date : element.attr("data-max-date");
        if (Utils.isValue(o.maxDate) && Utils.isDate(o.maxDate, o.inputFormat)) {
            this.max = Utils.isValue(o.inputFormat) ? o.maxDate.toDate(o.inputFormat) : (new Date(o.maxDate));
        }

        this._drawContent();
    },

    setToday: function(val){
        var o = this.options;

        if (!Utils.isValue(val)) {
            val = new Date();
        }
        this.today = Utils.isDateObject(val) ? val : Utils.isValue(o.inputFormat) ? val.toDate(o.inputFormat) : new Date(val);
        this.today.setHours(0,0,0,0);
        this._drawHeader();
        this._drawContent();
    },

    i18n: function(val){
        var o = this.options;
        if (val === undefined) {
            return o.locale;
        }
        if (Metro.locales[val] === undefined) {
            return false;
        }
        o.locale = val;
        this.locale = Metro.locales[o.locale];
        this._drawCalendar();
    },

    changeAttrLocale: function(){
        var element = this.element, o = this.options;
        this.i18n(element.attr("data-locale"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-exclude': this.setExclude(); break;
            case 'data-preset': this.setPreset(); break;
            case 'data-special': this.setSpecial(); break;
            case 'data-show': this.setShow(); break;
            case 'data-min-date': this.setMinDate(); break;
            case 'data-max-date': this.setMaxDate(); break;
            case 'data-locale': this.changeAttrLocale(); break;
        }
    },

    destroy: function(){
        var element = this.element, o = this.options;

        element.off(Metro.events.click, ".prev-month, .next-month, .prev-year, .next-year");
        element.off(Metro.events.click, ".button.today");
        element.off(Metro.events.click, ".button.clear");
        element.off(Metro.events.click, ".button.cancel");
        element.off(Metro.events.click, ".button.done");
        element.off(Metro.events.click, ".week-days .day");
        element.off(Metro.events.click, ".days-row .day");
        element.off(Metro.events.click, ".curr-month");
        element.off(Metro.events.click, ".calendar-months li");
        element.off(Metro.events.click, ".curr-year");
        element.off(Metro.events.click, ".calendar-years li");
        element.off(Metro.events.click);

        if (o.ripple === true) {
            element.data("ripple").destroy();
        }

        return element;
    }
};

$(document).on(Metro.events.click, function(e){
    $('.calendar .calendar-years').each(function(){
        $(this).removeClass("open");
    });
    $('.calendar .calendar-months').each(function(){
        $(this).removeClass("open");
    });
});

Metro.plugin('calendar', Calendar);

var CalendarPickerDefaultConfig = {
    nullValue: true,
    useNow: false,

    prepend: "",

    calendarWide: false,
    calendarWidePoint: null,


    dialogMode: false,
    dialogPoint: 360,
    dialogOverlay: true,
    overlayColor: '#000000',
    overlayAlpha: .5,

    locale: METRO_LOCALE,
    size: "100%",
    format: METRO_DATE_FORMAT,
    inputFormat: null,
    headerFormat: "%A, %b %e",
    clearButton: false,
    calendarButtonIcon: "<span class='default-icon-calendar'></span>",
    clearButtonIcon: "<span class='default-icon-cross'></span>",
    copyInlineStyles: false,
    clsPicker: "",
    clsInput: "",

    yearsBefore: 100,
    yearsAfter: 100,
    weekStart: METRO_WEEK_START,
    outside: true,
    ripple: false,
    rippleColor: "#cccccc",
    exclude: null,
    minDate: null,
    maxDate: null,
    special: null,
    showHeader: true,

    clsCalendar: "",
    clsCalendarHeader: "",
    clsCalendarContent: "",
    clsCalendarMonths: "",
    clsCalendarYears: "",
    clsToday: "",
    clsSelected: "",
    clsExcluded: "",

    onDayClick: Metro.noop,
    onCalendarPickerCreate: Metro.noop,
    onCalendarShow: Metro.noop,
    onCalendarHide: Metro.noop,
    onChange: Metro.noop,
    onMonthChange: Metro.noop,
    onYearChange: Metro.noop
};

Metro.calendarPickerSetup = function (options) {
    CalendarPickerDefaultConfig = $.extend({}, CalendarPickerDefaultConfig, options);
};

if (typeof window["metroCalendarPickerSetup"] !== undefined) {
    Metro.calendarPickerSetup(window["metroCalendarPickerSetup"]);
}

var CalendarPicker = {
    init: function( options, elem ) {
        this.options = $.extend( {}, CalendarPickerDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = null;
        this.value_date = null;
        this.calendar = null;
        this.overlay = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onCalendarPickerCreate, [this.element], this.elem);
        $(elem).fire("calendarpickercreate");

        return this;
    },

    dependencies: ['calendar'],

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){

        Metro.checkRuntime(this.element, "calendarpicker");

        this._createStructure();
        this._createEvents();
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var container = $("<div>").addClass("input " + element[0].className + " calendar-picker");
        var buttons = $("<div>").addClass("button-group");
        var calendarButton, clearButton, cal = $("<div>").addClass("drop-shadow");
        var curr = element.val().trim();
        var id = Utils.elementId("calendarpicker");

        container.attr("id", id);

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        if (!Utils.isValue(curr)) {
            if (o.useNow) this.value = new Date();
        } else {
            this.value = !Utils.isValue(o.inputFormat) ? new Date(curr) : curr.toDate(o.inputFormat, o.locale);
        }

        if (Utils.isValue(this.value)) this.value.setHours(0,0,0,0);

        element.val(!Utils.isValue(curr) && o.nullValue === true ? "" : this.value.format(o.format, o.locale));

        container.insertBefore(element);
        element.appendTo(container);
        buttons.appendTo(container);
        cal.appendTo(container);

        Metro.makePlugin(cal, "calendar", {
            wide: o.calendarWide,
            widePoint: o.calendarWidePoint,

            format: o.format,
            inputFormat: o.inputFormat,
            pickerMode: true,
            show: o.value,
            locale: o.locale,
            weekStart: o.weekStart,
            outside: o.outside,
            buttons: false,
            headerFormat: o.headerFormat,

            clsCalendar: o.clsCalendar,
            clsCalendarHeader: o.clsCalendarHeader,
            clsCalendarContent: o.clsCalendarContent,
            clsCalendarFooter: "d-none",
            clsCalendarMonths: o.clsCalendarMonths,
            clsCalendarYears: o.clsCalendarYears,
            clsToday: o.clsToday,
            clsSelected: o.clsSelected,
            clsExcluded: o.clsExcluded,

            ripple: o.ripple,
            rippleColor: o.rippleColor,
            exclude: o.exclude,
            minDate: o.minDate,
            maxDate: o.maxDate,
            yearsBefore: o.yearsBefore,
            yearsAfter: o.yearsAfter,
            special: o.special,
            showHeader: o.showHeader,
            showFooter: false,
            onDayClick: function(sel, day, el){
                var date = new Date(sel[0]);
                date.setHours(0,0,0,0);

                that._removeOverlay();

                that.value = date;
                element.val(date.format(o.format, o.locale));
                element.trigger("change");
                cal.removeClass("open open-up");
                cal.hide();

                Utils.exec(o.onChange, [that.value], element[0]);
                element.fire("change", {
                    val: that.value
                });

                Utils.exec(o.onDayClick, [sel, day, el], element[0]);
                element.fire("dayclick", {
                    sel: sel,
                    day: day,
                    el: el
                })
            },
            onMonthChange: o.onMonthChange,
            onYearChange: o.onYearChange
        });

        this.calendar = cal;

        if (o.clearButton === true) {
            clearButton = $("<button>").addClass("button input-clear-button").attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.appendTo(buttons);
        }

        calendarButton = $("<button>").addClass("button").attr("tabindex", -1).attr("type", "button").html(o.calendarButtonIcon);
        calendarButton.appendTo(buttons);

        if (o.prepend !== "") {
            var prepend = $("<div>").html(o.prepend);
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl");
        }

        if (String(o.size).indexOf("%") > -1) {
            container.css({
                width: o.size
            });
        } else {
            container.css({
                width: parseInt(o.size) + "px"
            });
        }

        element[0].className = '';
        element.attr("readonly", true);

        if (o.copyInlineStyles === true) {
            $.each(Utils.getInlineStyles(element), function(key, value){
                container.css(key, value);
            });
        }

        container.addClass(o.clsPicker);
        element.addClass(o.clsInput);

        if (o.dialogOverlay === true) {
            this.overlay = that._overlay();
        }

        if (o.dialogMode === true) {
            container.addClass("dialog-mode");
        } else {
            if (Utils.media("(max-width: "+o.dialogPoint+"px)")) {
                container.addClass("dialog-mode");
            }
        }

        if (element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.parent();
        var clear = container.find(".input-clear-button");
        var cal = this.calendar;
        var cal_plugin = Metro.getPlugin(cal[0], 'calendar');

        $(window).on(Metro.events.resize, function(){
            if (o.dialogMode !== true) {
                if (Utils.media("(max-width: " + o.dialogPoint + "px)")) {
                    container.addClass("dialog-mode");
                } else {
                    container.removeClass("dialog-mode");
                }
            }
        }, {ns: container.attr("id")});

        if (clear.length > 0) clear.on(Metro.events.click, function(e){
            element.val("").trigger('change').blur(); // TODO change blur
            that.value = null;
            e.preventDefault();
            e.stopPropagation();
        });

        container.on(Metro.events.click, "button, input", function(e){

            var value = Utils.isValue(that.value) ? that.value : new Date();

            value.setHours(0,0,0,0);

            if (cal.hasClass("open") === false && cal.hasClass("open-up") === false) {

                $(".calendar-picker .calendar").removeClass("open open-up").hide();

                cal_plugin.setPreset([value]);
                cal_plugin.setShow(value);
                cal_plugin.setToday(value);

                if (container.hasClass("dialog-mode")) {
                    that.overlay.appendTo($('body'));
                }
                cal.addClass("open");
                if (Utils.isOutsider(cal) === false) {
                    cal.addClass("open-up");
                }
                Utils.exec(o.onCalendarShow, [element, cal], cal);
                element.fire("calendarshow", {
                    calendar: cal
                });

            } else {

                that._removeOverlay();
                cal.removeClass("open open-up");
                Utils.exec(o.onCalendarHide, [element, cal], cal);
                element.fire("calendarhide", {
                    calendar: cal
                });

            }
            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.blur, function(){container.removeClass("focused");});
        element.on(Metro.events.focus, function(){container.addClass("focused");});
        element.on(Metro.events.change, function(){
            Utils.exec(o.onChange, [that.value], element[0]);
        });

        container.on(Metro.events.click, function(e){
            e.preventDefault();
            e.stopPropagation();
        })
    },

    _overlay: function(){
        var o = this.options;

        var overlay = $("<div>");
        overlay.addClass("overlay for-calendar-picker").addClass(o.clsOverlay);

        if (o.overlayColor === 'transparent') {
            overlay.addClass("transparent");
        } else {
            overlay.css({
                background: Utils.hex2rgba(o.overlayColor, o.overlayAlpha)
            });
        }

        return overlay;
    },

    _removeOverlay: function(){
        $('body').find('.overlay.for-calendar-picker').remove();
    },

    val: function(v){
        var element = this.element, o = this.options;

        if (Utils.isNull(v)) {
            return this.value;
        }

        if (Utils.isDate(v, o.inputFormat) === true) {
            Metro.getPlugin(this.calendar[0],"calendar").clearSelected();
            this.value = typeof v === 'string' ? v.toDate(o.inputFormat, o.locale) : v;
            element.val(this.value.format(o.format));
            element.trigger("change");
        }
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    i18n: function(val){
        var o = this.options;
        var hidden;
        var cal = this.calendar;
        if (val === undefined) {
            return o.locale;
        }
        if (Metro.locales[val] === undefined) {
            return false;
        }

        hidden = cal[0].hidden;
        if (hidden) {
            cal.css({
                visibility: "hidden",
                display: "block"
            });
        }
        Metro.getPlugin(cal[0], 'calendar').i18n(val);
        if (hidden) {
            cal.css({
                visibility: "visible",
                display: "none"
            });
        }
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element;
        var cal = Metro.getPlugin(this.calendar[0], "calendar");

        var changeAttrLocale = function(){
            that.i18n(element.attr("data-locale"));
        };

        var changeAttrSpecial = function(){
            cal.setSpecial(element.attr("data-special"));
        };

        var changeAttrExclude = function(){
            cal.setExclude(element.attr("data-exclude"));
        };

        var changeAttrMinDate = function(){
            cal.setMinDate(element.attr("data-min-date"));
        };

        var changeAttrMaxDate = function(){
            cal.setMaxDate(element.attr("data-max-date"));
        };

        var changeAttrValue = function(){
            that.val(element.attr("value"));
        };

        switch (attributeName) {
            case "value": changeAttrValue(); break;
            case 'disabled': this.toggleState(); break;
            case 'data-locale': changeAttrLocale(); break;
            case 'data-special': changeAttrSpecial(); break;
            case 'data-exclude': changeAttrExclude(); break;
            case 'data-min-date': changeAttrMinDate(); break;
            case 'data-max-date': changeAttrMaxDate(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var container = element.parent();
        var clear = container.find(".input-clear-button");

        $(window).off(Metro.events.resize, {ns: container.attr("id")});
        clear.off(Metro.events.click);
        container.off(Metro.events.click, "button, input");
        element.off(Metro.events.blur);
        element.off(Metro.events.focus);
        element.off(Metro.events.change);

        Metro.getPlugin(this.calendar[0], "calendar").destroy();

        return element;
    }
};

Metro.plugin('calendarpicker', CalendarPicker);

$(document).on(Metro.events.click, ".overlay.for-calendar-picker",function(){
    $(this).remove();
});

$(document).on(Metro.events.click, function(){
    $(".calendar-picker .calendar").removeClass("open open-up");
});


var CarouselDefaultConfig = {
    autoStart: false,
    width: "100%",
    height: "16/9", // 3/4, 21/9
    effect: "slide", // slide, fade, switch, slowdown, custom
    effectFunc: "linear",
    direction: "left", //left, right
    duration: METRO_ANIMATION_DURATION,
    period: 5000,
    stopOnMouse: true,

    controls: true,
    bullets: true,
    bulletsStyle: "square", // square, circle, rect, diamond
    bulletsSize: "default", // default, mini, small, large

    controlsOnMouse: false,
    controlsOutside: false,
    bulletsPosition: "default", // default, left, right

    controlPrev: '&#x23F4',
    controlNext: '&#x23F5',
    clsCarousel: "",
    clsSlides: "",
    clsSlide: "",
    clsControls: "",
    clsControlNext: "",
    clsControlPrev: "",
    clsBullets: "",
    clsBullet: "",
    clsBulletOn: "",
    clsThumbOn: "",

    onStop: Metro.noop,
    onStart: Metro.noop,
    onPlay: Metro.noop,
    onSlideClick: Metro.noop,
    onBulletClick: Metro.noop,
    onThumbClick: Metro.noop,
    onMouseEnter: Metro.noop,
    onMouseLeave: Metro.noop,
    onNextClick: Metro.noop,
    onPrevClick: Metro.noop,
    onSlideShow: Metro.noop,
    onSlideHide: Metro.noop,
    onCarouselCreate: Metro.noop
};

Metro.carouselSetup = function (options) {
    CarouselDefaultConfig = $.extend({}, CarouselDefaultConfig, options);
};

if (typeof window["metroCarouselSetup"] !== undefined) {
    Metro.carouselSetup(window["metroCarouselSetup"]);
}

var Carousel = {
    init: function( options, elem ) {
        this.options = $.extend( {}, CarouselDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.height = 0;
        this.width = 0;
        this.slides = [];
        this.current = null;
        this.currentIndex = null;
        this.dir = this.options.direction;
        this.interval = null;
        this.isAnimate = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;
        var slides = element.find(".slide");
        var slides_container = element.find(".slides");
        var id = Utils.elementId("carousel");

        Metro.checkRuntime(element, "carousel");

        if (element.attr("id") === undefined) {
            element.attr("id", id);
        }

        element.addClass("carousel").addClass(o.clsCarousel);
        if (o.controlsOutside === true) {
            element.addClass("controls-outside");
        }

        if (slides_container.length === 0) {
            slides_container = $("<div>").addClass("slides").appendTo(element);
            slides.appendTo(slides_container);
        }

        slides.addClass(o.clsSlides);

        if (slides.length === 0) {
        } else {

            this._createSlides();
            this._createControls();
            this._createBullets();
            this._createEvents();
            this._resize();

            if (o.controlsOnMouse === true) {
                element.find("[class*=carousel-switch]").fadeOut(0);
                element.find(".carousel-bullets").fadeOut(0);
            }

            if (o.autoStart === true) {
                this._start();
            } else {
                Utils.exec(o.onSlideShow, [this.slides[this.currentIndex][0], undefined], this.slides[this.currentIndex][0]);
                element.fire("slideshow", {
                    current: this.slides[this.currentIndex][0],
                    prev: undefined
                });
            }

        }

        Utils.exec(o.onCarouselCreate, [element]);
        element.fire("carouselcreate");
    },

    _start: function(){
        var that = this, element = this.element, o = this.options;
        var period = o.period;
        var current = this.slides[this.currentIndex];

        if (current.data("period") !== undefined) {
            period = current.data("period");
        }

        if (this.slides.length <= 1) {
            return ;
        }

        this.interval = setTimeout(function run() {
            var t = o.direction === 'left' ? 'next' : 'prior';
            that._slideTo(t, true);
        }, period);
        Utils.exec(o.onStart, [element], element[0]);
        element.fire("start");
    },

    _stop: function(){
        clearInterval(this.interval);
        this.interval = false;
    },

    _resize: function(){
        var element = this.element, o = this.options;
        var width = element.outerWidth();
        var height;
        var medias = [];

        if (["16/9", "21/9", "4/3"].indexOf(o.height) > -1) {
            height = Utils.aspectRatioH(width, o.height);
        } else {
            if (String(o.height).indexOf("@") > -1) {
                medias = Utils.strToArray(o.height.substr(1), "|");
                $.each(medias, function(){
                    var media = Utils.strToArray(this, ",");
                    if (window.matchMedia(media[0]).matches) {
                        if (["16/9", "21/9", "4/3"].indexOf(media[1]) > -1) {
                            height = Utils.aspectRatioH(width, media[1]);
                        } else {
                            height = parseInt(media[1]);
                        }
                    }
                });
            } else {
                height = parseInt(o.height);
            }
        }

        element.css({
            height: height
        });
    },

    _createSlides: function(){
        var that = this, element = this.element, o = this.options;
        var slides = element.find(".slide");

        $.each(slides, function(i){
            var slide = $(this);
            if (slide.data("cover") !== undefined) {
                slide.css({
                    backgroundImage: "url("+slide.data('cover')+")"
                });
            }

            if (i !== 0) {
                switch (o.effect) {
                    case "switch":
                    case "slide":
                        slide.css("left", "100%");
                        break;
                    case "slide-v":
                        slide.css("top", "100%");
                        break;
                    case "fade":
                        slide.css("opacity", "0");
                        break;
                }
            }

            slide.addClass(o.clsSlide);

            that.slides.push(slide);
        });

        this.currentIndex = 0;
        this.current = this.slides[this.currentIndex];
    },

    _createControls: function(){
        var element = this.element, o = this.options;
        var next, prev;

        if (o.controls === false) {
            return ;
        }

        next = $('<span/>').addClass('carousel-switch-next').addClass(o.clsControls).addClass(o.clsControlNext).html(">");
        prev = $('<span/>').addClass('carousel-switch-prev').addClass(o.clsControls).addClass(o.clsControlPrev).html("<");

        if (o.controlNext) {
            next.html(o.controlNext);
        }

        if (o.controlPrev) {
            prev.html(o.controlPrev);
        }

        next.appendTo(element);
        prev.appendTo(element);
    },

    _createBullets: function(){
        var element = this.element, o = this.options;
        var bullets, i;

        if (o.bullets === false) {
            return ;
        }

        bullets = $('<div>').addClass("carousel-bullets").addClass(o.bulletsSize+"-size").addClass("bullet-style-"+o.bulletsStyle).addClass(o.clsBullets);
        if (o.bulletsPosition === 'default' || o.bulletsPosition === 'center') {
            bullets.addClass("flex-justify-center");
        } else if (o.bulletsPosition === 'left') {
            bullets.addClass("flex-justify-start");
        } else {
            bullets.addClass("flex-justify-end");
        }

        for (i = 0; i < this.slides.length; i++) {
            var bullet = $('<span>').addClass("carousel-bullet").addClass(o.clsBullet).data("slide", i);
            if (i === 0) {
                bullet.addClass('bullet-on').addClass(o.clsBulletOn);
            }
            bullet.appendTo(bullets);
        }

        bullets.appendTo(element);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".carousel-bullet", function(e){
            var bullet = $(this);
            if (that.isAnimate === false) {
                that._slideToSlide(bullet.data('slide'));
                Utils.exec(o.onBulletClick, [bullet,  element, e]);
                element.fire("bulletclick", {
                    bullet: bullet
                });
            }
        });

        element.on(Metro.events.click, ".carousel-switch-next", function(e){
            if (that.isAnimate === false) {
                that._slideTo("next", false);
                Utils.exec(o.onNextClick, [element, e]);
                element.fire("nextclick", {
                    button: this
                });
            }
        });

        element.on(Metro.events.click, ".carousel-switch-prev", function(e){
            if (that.isAnimate === false) {
                that._slideTo("prev", false);
                Utils.exec(o.onPrevClick, [element, e]);
                element.fire("prevclick", {
                    button: this
                });
            }
        });

        if (o.stopOnMouse === true && o.autoStart === true) {
            element.on(Metro.events.enter, function (e) {
                that._stop();
                Utils.exec(o.onMouseEnter, [element, e]);
            });
            element.on(Metro.events.leave, function (e) {
                that._start();
                Utils.exec(o.onMouseLeave, [element, e])
            });
        }

        if (o.controlsOnMouse === true) {
            element.on(Metro.events.enter, function () {
                element.find("[class*=carousel-switch]").fadeIn();
                element.find(".carousel-bullets").fadeIn();
            });
            element.on(Metro.events.leave, function () {
                element.find("[class*=carousel-switch]").fadeOut();
                element.find(".carousel-bullets").fadeOut();
            });
        }

        element.on(Metro.events.click, ".slide", function(e){
            var slide = $(this);
            Utils.exec(o.onSlideClick, [slide, element, e]);
            element.fire("slideclick", {
                slide: slide
            });
        });

        $(window).on(Metro.events.resize, function(){
            that._resize();
        }, {ns: element.attr("id")});
    },

    _slideToSlide: function(index){
        var element = this.element, o = this.options;
        var current, next, to;

        if (this.slides[index] === undefined) {
            return ;
        }

        if (this.currentIndex === index) {
            return ;
        }

        to = index > this.currentIndex ? "next" : "prev";
        current = this.slides[this.currentIndex];
        next = this.slides[index];

        this.currentIndex = index;

        this._effect(current, next, o.effect, to);

        element.find(".carousel-bullet").removeClass("bullet-on").removeClass(o.clsBulletOn);
        element.find(".carousel-bullet:nth-child("+(this.currentIndex+1)+")").addClass("bullet-on").addClass(o.clsBulletOn);
    },

    _slideTo: function(to, interval){
        var element = this.element, o = this.options;
        var current, next;

        if (to === undefined) {
            to = "next";
        }

        current = this.slides[this.currentIndex];

        if (to === "next") {
            this.currentIndex++;
            if (this.currentIndex >= this.slides.length) {
                this.currentIndex = 0;
            }
        } else {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.slides.length - 1;
            }
        }

        next = this.slides[this.currentIndex];

        this._effect(current, next, o.effect, to, interval);

        element.find(".carousel-bullet").removeClass("bullet-on").removeClass(o.clsBulletOn);
        element.find(".carousel-bullet:nth-child("+(this.currentIndex+1)+")").addClass("bullet-on").addClass(o.clsBulletOn);
    },

    _effect: function(current, next, effect, to, interval){
        var that = this, element = this.element, o = this.options;
        var duration = o.duration;
        var func, effectFunc = o.effectFunc;
        var period = o.period;

        if (next.data('duration') !== undefined) {
            duration = next.data('duration');
        }

        if (next.data('effectFunc') !== undefined) {
            effectFunc = next.data('effectFunc');
        }

        if (effect === 'switch') {
            duration = 0;
        }

        current.stop(true, true);
        next.stop(true, true);
        this.isAnimate = true;

        setTimeout(function(){that.isAnimate = false;}, duration);

        if (effect === 'slide') {
            func = to === 'next' ? 'slideLeft': 'slideRight';
        }

        if (effect === 'slide-v') {
            func = to === 'next' ? 'slideUp': 'slideDown';
        }

        switch (effect) {
            case 'slide': Animation[func](current, next, duration, effectFunc); break;
            case 'slide-v': Animation[func](current, next, duration, effectFunc); break;
            case 'fade': Animation['fade'](current, next, duration, effectFunc); break;
            default: Animation['switch'](current, next);
        }

        setTimeout(function(){
            Utils.exec(o.onSlideShow, [next[0], current[0]], next[0]);
            element.fire("slideshow", {
                current: next[0],
                prev: current[0]
            });
        }, duration);

        setTimeout(function(){
            Utils.exec(o.onSlideHide, [current[0], next[0]], current[0]);
            element.fire("slidehide", {
                current: current[0],
                next: next[0]
            });
        }, duration);

        if (interval === true) {

            if (next.data('period') !== undefined) {
                period = next.data('period');
            }

            this.interval = setTimeout(function run() {
                var t = o.direction === 'left' ? 'next' : 'prior';
                that._slideTo(t, true);
            }, period);
        }
    },

    toSlide: function(index){
        this._slideToSlide(index);
    },

    next: function(){
        this._slideTo("next");
    },

    prev: function(){
        this._slideTo("prev");
    },

    stop: function () {
        clearInterval(this.interval);
        Utils.exec(this.options.onStop, [this.element]);
        this.element.fire("stop");
    },

    play: function(){
        this._start();
        Utils.exec(this.options.onPlay, [this.element]);
        this.element.fire("play");
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element, o = this.options;

        element.off(Metro.events.click, ".carousel-bullet");
        element.off(Metro.events.click, ".carousel-switch-next");
        element.off(Metro.events.click, ".carousel-switch-prev");

        if (o.stopOnMouse === true && o.autoStart === true) {
            element.off(Metro.events.enter);
            element.off(Metro.events.leave);
        }

        if (o.controlsOnMouse === true) {
            element.off(Metro.events.enter);
            element.off(Metro.events.leave);
        }

        element.off(Metro.events.click, ".slide");
        $(window).off(Metro.events.resize + "-" + element.attr("id"));

        return element;
    }
};

Metro.plugin('carousel', Carousel);

var CharmsDefaultConfig = {
    position: "right",
    opacity: 1,
    clsCharms: "",
    onCharmCreate: Metro.noop,
    onOpen: Metro.noop,
    onClose: Metro.noop,
    onToggle: Metro.noop
};

Metro.charmsSetup = function (options) {
    CharmsDefaultConfig = $.extend({}, CharmsDefaultConfig, options);
};

if (typeof window["metroCharmsSetup"] !== undefined) {
    Metro.charmsSetup(window["metroCharmsSetup"]);
}

var Charms = {
    init: function( options, elem ) {
        this.options = $.extend( {}, CharmsDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.origin = {
            background: ""
        };

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "charms");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onCharmCreate, [element]);
        element.fire("charmcreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;

        element
            .addClass("charms")
            .addClass(o.position + "-side")
            .addClass(o.clsCharms);

        this.origin.background = element.css("background-color");

        element.css({
            backgroundColor: Utils.computedRgbToRgba(Utils.getStyleOne(element, "background-color"), o.opacity)
        });
    },

    _createEvents: function(){
    },

    open: function(){
        var element = this.element, o = this.options;

        element.addClass("open");

        Utils.exec(o.onOpen, null, element[0]);
        element.fire("open");
    },

    close: function(){
        var element = this.element, o = this.options;

        element.removeClass("open");

        Utils.exec(o.onClose, null, element[0]);
        element.fire("close");
    },

    toggle: function(){
        var element = this.element, o = this.options;

        if (element.hasClass("open") === true) {
            this.close();
        } else {
            this.open();
        }

        Utils.exec(o.onToggle, null, element[0]);
        element.fire("toggle");
    },

    opacity: function(v){
        var element = this.element, o = this.options;

        if (v === undefined) {
            return o.opacity;
        }

        var opacity = Math.abs(parseFloat(v));
        if (opacity < 0 || opacity > 1) {
            return ;
        }
        o.opacity = opacity;
        element.css({
            backgroundColor: Utils.computedRgbToRgba(Utils.getStyleOne(element, "background-color"), opacity)
        });
    },

    changeOpacity: function(){
        var element = this.element;
        this.opacity(element.attr("data-opacity"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-opacity": this.changeOpacity(); break;
        }
    },

    destroy: function(){
        return this.element;
    }
};

Metro.plugin('charms', Charms);

Metro['charms'] = {

    check: function(el){
        if (Utils.isMetroObject(el, "charms") === false) {
            console.warn("Element is not a charms component");
            return false;
        }
        return true;
    },

    isOpen: function(el){
        if (this.check(el) === false) return ;
        return $(el).hasClass("open");
    },

    open: function(el){
        if (this.check(el) === false) return ;
        Metro.getPlugin($(el)[0], "charms").open();
    },

    close: function(el){
        if (this.check(el) === false) return ;
        Metro.getPlugin($(el)[0], "charms").close();
    },

    toggle: function(el){
        if (this.check(el) === false) return ;
        Metro.getPlugin($(el)[0], "charms").toggle();
    },

    closeAll: function(){
        $('[data-role*=charms]').each(function() {
            Metro.getPlugin(this, 'charms').close();
        });
    },

    opacity: function(el, opacity){
        if (this.check(el) === false) return ;
        Metro.getPlugin($(el)[0], "charms").opacity(opacity);
    }
};

var defaultAvatar = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAUABQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+t+KKPxo/GgA70Yo/Gj8aADFH4VesdC1HUl3WtjcXCf344yV/PGKW+0HUtNXddWNzbp/fkjIX88YoAofhR+FH40fjQAfhR+FH40fjQAUUUUAFepeAPh5D9li1LVYhK8g3Q27j5VXszDuT6f5HA+FtOXVvEWn2rjMcko3j1UckfkDX0MBgYHAoARVCKFUBVHAA6ClZQwKkZBGCDS0UAec+Pvh3BJay6lpUQimjBeW3QYVx3Kjsfbv/PyqvpuvnvxfpqaT4l1C1QbY0lJUDsrfMB+RoAyKKKKACiiigDa8GXq6f4p02eQgIJQpJ7Bvlz+tfQP4V8yDg17P4A8cw65ZxWV5IE1KMbfmP+uA7j39R+NAHaUfhSUUAL+FeA+OL1NQ8WalNGQU83YCO+0Bf6V6b498cQ6BZyWlrIJNSkXaApz5QP8AEff0FeKk5OTyTQAUUUUAH40fjRU1naTX93DbQIXmlYIijuTQBc0Dw/eeI74W1mm49XkbhUHqTXsHhz4eaXoCpI8YvbscmaYZAP8Asr0H8/etHwv4cg8M6XHaxANIfmllxy7dz9PStigA/Gk/GlooA5bxJ8PdL19XkWMWd43PnwjGT/tL0P8AP3rx/X/D954cvjbXibT1SReVceoNfRFZHijw5B4m0uS1lAWQfNFLjlG7H6etAHz5+NH41NeWk1hdzW06FJonKMp7EGoaACvQfhBowudTudRkXK2y7I8j+Nup/Afzrz6vafhRaCDwmkgHM8zufwO3/wBloA7Kiij8KACkpaSgBaSj8KKAPJvi/owttTttRjXC3K7JMf3l6H8R/KvPq9p+K1qJ/CbyEcwTI4P1O3/2avFqAP/Z";

var ChatDefaultConfig = {
    inputTimeFormat: "%m-%d-%y",
    timeFormat: "%d %b %l:%M %p",
    name: "John Doe",
    avatar: defaultAvatar,
    welcome: null,
    title: null,
    width: "100%",
    height: "auto",
    randomColor: false,
    messages: null,
    sendButtonTitle: "Send",
    readonly: false,

    clsChat: "",
    clsName: "",
    clsTime: "",
    clsInput: "",
    clsSendButton: "",
    clsMessageLeft: "default",
    clsMessageRight: "default",

    onMessage: Metro.noop,
    onSend: Metro.noop,
    onSendButtonClick: Metro.noop,
    onChatCreate: Metro.noop
};

Metro.chatSetup = function (options) {
    ChatDefaultConfig = $.extend({}, ChatDefaultConfig, options);
};

if (typeof window["metroChatSetup"] !== undefined) {
    Metro.chatSetup(window["metroChatSetup"]);
}

var Chat = {
    init: function( options, elem ) {
        this.options = $.extend( {}, ChatDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.input = null;
        this.classes = "primary secondary success alert warning yellow info dark light".split(" ");
        this.lastMessage = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "chat");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onChatCreate, [element]);
        element.fire("chatcreate");
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var messages, messageInput, input;
        var customButtons = [
            {
                html: o.sendButtonTitle,
                cls: o.clsSendButton+" js-chat-send-button",
                onclick: o.onSendButtonClick
            }
        ];

        element.addClass("chat").addClass(o.clsChat);

        element.css({
            width: o.width,
            height: o.height
        });

        if (Utils.isValue(o.title)) {
            $("<div>").addClass("title").html(o.title).appendTo(element);
        }

        messages = $("<div>").addClass("messages");
        messages.appendTo(element);
        messageInput = $("<div>").addClass("message-input").appendTo(element);
        input = $("<input type='text'>");
        input.appendTo(messageInput);
        input.input({
            customButtons: customButtons,
            clsInput: o.clsInput
        });

        if (o.welcome) {
            this.add({
                text: o.welcome,
                time: (new Date()),
                position: "left",
                name: "Welcome",
                avatar: defaultAvatar
            })
        }

        if (Utils.isValue(o.messages) && typeof o.messages === "string") {
            o.messages = Utils.isObject(o.messages);
        }

        if (!Utils.isNull(o.messages) && typeof o.messages === "object" && Utils.objectLength(o.messages) > 0) {
            $.each(o.messages, function(){
                that.add(this);
            });
        }

        element.find(".message-input")[o.readonly ? 'addClass':'removeClass']("disabled");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var sendButton = element.find(".js-chat-send-button");
        var input = element.find("input[type=text]");

        var send = function(){
            var msg = ""+input.val(), m;
            if (msg.trim() === "") {return false;}
            m = {
                id: Utils.elementId(""),
                name: o.name,
                avatar: o.avatar,
                text: msg,
                position: "right",
                time: (new Date())
            };
            that.add(m);
            Utils.exec(o.onSend, [m], element[0]);
            element.fire("send", {
                msg: m
            });
            input.val("");
        };

        sendButton.on(Metro.events.click, function () {
            send();
        });

        input.on(Metro.events.keyup, function(e){
            if (e.keyCode === Metro.keyCode.ENTER) {
                send();
            }
        })
    },

    add: function(msg){
        var that = this, element = this.element, o = this.options;
        var index, message, sender, time, item, avatar, text;
        var messages = element.find(".messages");
        var messageDate;

        messageDate = typeof msg.time === 'string' ? msg.time.toDate(o.inputTimeFormat) : msg.time;

        message = $("<div>").addClass("message").addClass(msg.position).appendTo(messages);
        sender = $("<div>").addClass("message-sender").addClass(o.clsName).html(msg.name).appendTo(message);
        time = $("<div>").addClass("message-time").addClass(o.clsTime).html(messageDate.format(o.timeFormat)).appendTo(message);
        item = $("<div>").addClass("message-item").appendTo(message);
        avatar = $("<img>").attr("src", msg.avatar).addClass("message-avatar").appendTo(item);
        text = $("<div>").addClass("message-text").html(msg.text).appendTo(item);

        if (Utils.isValue(msg.id)) {
            message.attr("id", msg.id);
        }

        if (o.randomColor === true) {
            index = Utils.random(0, that.classes.length - 1);
            text.addClass(that.classes[index]);
        } else {
            if (msg.position === 'left' && Utils.isValue(o.clsMessageLeft)) {
                text.addClass(o.clsMessageLeft);
            }
            if (msg.position === 'right' && Utils.isValue(o.clsMessageRight)) {
                text.addClass(o.clsMessageRight);
            }
        }

        Utils.exec(o.onMessage, [msg, {
            message: message,
            sender: sender,
            time: time,
            item: item,
            avatar: avatar,
            text: text
        }], message[0]);

        element.fire("message", {
            msg: msg,
            el: {
                message: message,
                sender: sender,
                time: time,
                item: item,
                avatar: avatar,
                text: text
            }
        });

        setImmediate(function(){
            element.fire("onmessage", {
                message: msg,
                element: message[0]
            });
        });

        messages.animate({
            scrollTop: messages[0].scrollHeight
        }, 1000);

        this.lastMessage = msg;

        return this;
    },

    addMessages: function(messages){
        var that = this;

        if (Utils.isValue(messages) && typeof messages === "string") {
            messages = Utils.isObject(messages);
        }

        if (typeof messages === "object" && Utils.objectLength(messages) > 0) {
            $.each(messages, function(){
                that.add(this);
            });
        }

        return this;
    },

    delMessage: function(id){
        var element = this.element;

        element.find(".messages").find("#"+id).remove();

        return this;
    },

    updMessage: function(msg){
        var element = this.element;
        var message = element.find(".messages").find("#"+msg.id);

        if (message.length === 0) return this;

        message.find(".message-text").html(msg.text);
        message.find(".message-time").html(msg.time);

        return this;
    },

    clear: function(){
        var element = this.element;
        var messages = element.find(".messages");
        messages.html("");
        this.lastMessage = null;
    },

    toggleReadonly: function(readonly){
        var element = this.element, o = this.options;
        o.readonly = typeof readonly === "undefined" ? !o.readonly : readonly;
        element.find(".message-input")[o.readonly ? 'addClass':'removeClass']("disabled");
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-readonly": this.toggleReadonly(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var sendButton = element.find(".js-chat-send-button");
        var input = element.find("input[type=text]");

        sendButton.off(Metro.events.click);
        input.off(Metro.events.keyup);

        return element;
    }
};

Metro.plugin('chat', Chat);

var CheckboxDefaultConfig = {
    transition: true,
    style: 1,
    caption: "",
    captionPosition: "right",
    indeterminate: false,
    clsCheckbox: "",
    clsCheck: "",
    clsCaption: "",
    onCheckboxCreate: Metro.noop
};

Metro.checkboxSetup = function (options) {
    CheckboxDefaultConfig = $.extend({}, CheckboxDefaultConfig, options);
};

if (typeof window["metroCheckboxSetup"] !== undefined) {
    Metro.checkboxSetup(window["metroCheckboxSetup"]);
}

var Checkbox = {
    init: function( options, elem ) {
        this.options = $.extend( {}, CheckboxDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.origin = {
            className: ""
        };

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;
        var checkbox = $("<label>").addClass("checkbox " + element[0].className).addClass(o.style === 2 ? "style2" : "");
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        Metro.checkRuntime(element, "checkbox");

        if (element.attr('id') === undefined) {
            element.attr('id', Utils.elementId("checkbox"));
        }

        checkbox.attr('for', element.attr('id'));

        element.attr("type", "checkbox");

        checkbox.insertBefore(element);

        element.appendTo(checkbox);
        check.appendTo(checkbox);
        caption.appendTo(checkbox);

        if (o.transition === true) {
            checkbox.addClass("transition-on");
        }

        if (o.captionPosition === 'left') {
            checkbox.addClass("caption-left");
        }

        this.origin.className = element[0].className;
        element[0].className = '';

        checkbox.addClass(o.clsCheckbox);
        caption.addClass(o.clsCaption);
        check.addClass(o.clsCheck);

        if (o.indeterminate) {
            element[0].indeterminate = true;
        }

        if (element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }

        Utils.exec(o.onCheckboxCreate, [element]);
        element.fire("checkboxcreate");
    },

    indeterminate: function(v){
        if (Utils.isNull(v)) {
            v = true;
        }
        this.element[0].indeterminate = v;
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;
        var parent = element.parent();

        var changeStyle = function(){
            var new_style = parseInt(element.attr("data-style"));

            if (!Utils.isInt(new_style)) return;

            o.style = new_style;
            parent.removeClass("style1 style2").addClass("style"+new_style);
        };

        var indeterminateState = function(){
            element[0].indeterminate = JSON.parse(element.attr("data-indeterminate")) === true;
        };

        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'data-indeterminate': indeterminateState(); break;
            case 'data-style': changeStyle(); break;
        }
    },

    destroy: function(){
        return this.element;
    }
};

Metro.plugin('checkbox', Checkbox);

var ClockDefaultConfig = {
    showTime: true,
    showDate: true,
    timeFormat: '24',
    dateFormat: 'american',
    divider: "&nbsp;&nbsp;",
    leadingZero: true,
    dateDivider: '-',
    timeDivider: ":",
    onClockCreate: Metro.noop
};

Metro.clockSetup = function (options) {
    ClockDefaultConfig = $.extend({}, ClockDefaultConfig, options);
};

if (typeof window["metroClockSetup"] !== undefined) {
    Metro.clockSetup(window["metroClockSetup"]);
}

var Clock = {
    init: function( options, elem ) {
        this.options = $.extend( {}, ClockDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this._clockInterval = null;
        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element;

        Metro.checkRuntime(element, "clock");

        this._tick();

        Utils.exec(this.options.onClockCreate, [this.element]);
        element.fire("clockcreate");

        this._clockInterval = setInterval(function(){
            that._tick();
        }, 500);
    },

    _addLeadingZero: function(i){
        if (i<10){i="0" + i;}
        return i;
    },

    _tick: function(){
        var element = this.element, o = this.options;
        var timestamp = new Date();
        var result = "";
        var h = timestamp.getHours(),
            i = timestamp.getMinutes(),
            s = timestamp.getSeconds(),
            d = timestamp.getDate(),
            m = timestamp.getMonth() + 1,
            y = timestamp.getFullYear(),
            a = '';

        if (parseInt(o.timeFormat) === 12) {
            a = " AM";
            if (h > 11) { a = " PM"; }
            if (h > 12) { h = h - 12; }
            if (h === 0) { h = 12; }
        }

        i = this._addLeadingZero(i);
        s = this._addLeadingZero(s);

        if (o.leadingZero) {
            h = this._addLeadingZero(h);
            m = this._addLeadingZero(m);
            d = this._addLeadingZero(d);
        }

        if (o.showDate) {
            if (o.dateFormat === 'american') {
                result += "<span class='date-month'>" + m + "</span>";
                result += "<span class='date-divider'>" + o.dateDivider + "</span>";
                result += "<span class='date-day'>" + d + "</span>";
                result += "<span class='date-divider'>" + o.dateDivider + "</span>";
                result += "<span class='date-year'>" + y + "</span>";
            } else {
                result += "<span class='date-day'>" + d + "</span>";
                result += "<span class='date-divider'>" + o.dateDivider + "</span>";
                result += "<span class='date-month'>" + m + "</span>";
                result += "<span class='date-divider'>" + o.dateDivider + "</span>";
                result += "<span class='date-year'>" + y + "</span>";
            }
            result += o.divider;
        }

        if (o.showTime) {
            result += "<span class='clock-hour'>" + h + "</span>";
            result += "<span class='clock-divider'>" + o.timeDivider + "</span>";
            result += "<span class='clock-minute'>" + i + "</span>";
            result += "<span class='clock-divider'>" + o.timeDivider + "</span>";
            result += "<span class='clock-second'>" + s + "</span>";
            result += "<span class='clock-suffix'>" + a + "</span>";
        }

        element.html(result);
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        clearInterval(this._clockInterval);
        this._clockInterval = null;
        return this.element;
    }
};

Metro.plugin('clock', Clock);

var CollapseDefaultConfig = {
    collapsed: false,
    toggleElement: false,
    duration: 100,
    onExpand: Metro.noop,
    onCollapse: Metro.noop,
    onCollapseCreate: Metro.noop
};

Metro.collapseSetup = function (options) {
    CollapseDefaultConfig = $.extend({}, CollapseDefaultConfig, options);
};

if (typeof window["metroCollapseSetup"] !== undefined) {
    Metro.collapseSetup(window["metroCollapseSetup"]);
}

var Collapse = {
    init: function( options, elem ) {
        this.options = $.extend( {}, CollapseDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.toggle = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var toggle;

        Metro.checkRuntime(element, "collapse");

        toggle = o.toggleElement !== false ? $(o.toggleElement) : element.siblings('.collapse-toggle').length > 0 ? element.siblings('.collapse-toggle') : element.siblings('a:nth-child(1)');

        if (o.collapsed === true || element.attr("collapsed") === true) {
            element.hide(0);
        }

        toggle.on(Metro.events.click, function(e){
            if (element.css('display') === 'block' && !element.hasClass('keep-open')) {
                that._close(element);
            } else {
                that._open(element);
            }

            if (["INPUT"].indexOf(e.target.tagName) === -1) {
                e.preventDefault();
            }
            e.stopPropagation();
        });

        this.toggle = toggle;

        Utils.exec(this.options.onCollapseCreate, [this.element]);
        element.fire("collapsecreate");
    },

    _close: function(el, immediate){
        var elem = $(el);
        var dropdown  = Metro.getPlugin(elem[0], "collapse");
        var options = dropdown.options;
        var func = immediate ? 'show' : 'slideUp';
        var dur = immediate ? 0 : options.duration;

        this.toggle.removeClass("active-toggle");

        elem[func](dur, function(){
            el.trigger("onCollapse", null, el);
            el.data("collapsed", true);
            el.addClass("collapsed");
            Utils.exec(options.onCollapse, null, elem[0]);
            elem.fire("collapse");
        });
    },

    _open: function(el, immediate){
        var elem = $(el);
        var dropdown  = Metro.getPlugin(elem[0], "collapse");
        var options = dropdown.options;
        var func = immediate ? 'show' : 'slideDown';
        var dur = immediate ? 0 : options.duration;

        this.toggle.addClass("active-toggle");

        elem[func](dur, function(){
            el.trigger("onExpand", null, el);
            el.data("collapsed", false);
            el.removeClass("collapsed");
            Utils.exec(options.onExpand, null, elem[0]);
            elem.fire("expand");
        });
    },

    collapse: function(immediate){
        this._close(this.element, immediate);
    },

    expand: function(immediate){
        this._open(this.element, immediate);
    },

    close: function(immediate){
        this._close(this.element, immediate);
    },

    open: function(immediate){
        this._open(this.element, immediate);
    },

    isCollapsed: function(){
        return this.element.data("collapsed");
    },

    toggleState: function(){
        var element = this.element;
        if (element.attr("collapsed") === true || element.data("collapsed") === true) {
            this.collapse();
        } else {
            this.expand();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "collapsed":
            case "data-collapsed": this.toggleState(); break;
        }
    },

    destroy: function(){
        this.toggle.off(Metro.events.click);
        return this.element;
    }
};

Metro.plugin('collapse', Collapse);

var CountdownDefaultConfig = {
    stopOnBlur: true,
    animate: "none",
    animationFunc: "line",
    inputFormat: null,
    locale: METRO_LOCALE,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: null,
    start: true,
    clsCountdown: "",
    clsPart: "",
    clsZero: "",
    clsAlarm: "",
    clsDays: "",
    clsHours: "",
    clsMinutes: "",
    clsSeconds: "",
    onAlarm: Metro.noop,
    onTick: Metro.noop,
    onZero: Metro.noop,
    onBlink: Metro.noop,
    onCountdownCreate: Metro.noop
};

Metro.countdownSetup = function (options) {
    CountdownDefaultConfig = $.extend({}, CountdownDefaultConfig, options);
};

if (typeof window["metroCountdownSetup"] !== undefined) {
    Metro.countdownSetup(window["metroCountdownSetup"]);
}

var Countdown = {
    init: function( options, elem ) {
        this.options = $.extend( {}, CountdownDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.breakpoint = (new Date()).getTime();
        this.blinkInterval = null;
        this.tickInterval = null;

        this.zeroDaysFired = false;
        this.zeroHoursFired = false;
        this.zeroMinutesFired = false;
        this.zeroSecondsFired = false;

        this.fontSize = parseInt(Utils.getStyleOne(elem, "font-size"));

        this.current = {
            d: 0, h: 0, m: 0, s: 0
        };

        this.locale = null;

        this.inactiveTab = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;
        this.locale = Metro.locales[o.locale] !== undefined ? Metro.locales[o.locale] : Metro.locales["en-US"];

        Metro.checkRuntime(element, "countdown");

        this._build();
        this._createEvents();
    },

    _setBreakpoint: function(){
        var o = this.options;
        var dm = 86400000, hm = 3600000, mm = 60000, sm = 1000;

        this.breakpoint = (new Date()).getTime();

        if (Utils.isValue(o.date) && Utils.isDate(o.date, o.inputFormat)) {
            this.breakpoint = Utils.isValue(o.inputFormat) ? (o.date.toDate(o.inputFormat)).getTime() : (new Date(o.date)).getTime();
        }

        if (parseInt(o.days) > 0) {
            this.breakpoint += parseInt(o.days) * dm;
        }
        if (parseInt(o.hours) > 0) {
            this.breakpoint += parseInt(o.hours) * hm;
        }
        if (parseInt(o.minutes) > 0) {
            this.breakpoint += parseInt(o.minutes) * mm;
        }
        if (parseInt(o.seconds) > 0) {
            this.breakpoint += parseInt(o.seconds) * sm;
        }
    },

    _build: function(){
        var that = this, element = this.element, o = this.options;
        var parts = ["days", "hours", "minutes", "seconds"];
        var dm = 24*60*60*1000;
        var delta_days;
        var now = (new Date()).getTime();
        var digit;

        if (!element.attr("id")) {
            element.attr("id", Utils.elementId("countdown"));
        }

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", Utils.elementId("countdown"));
        }

        element.addClass("countdown").addClass(o.clsCountdown);

        this._setBreakpoint();

        delta_days = Math.round((that.breakpoint - now) / dm);

        $.each(parts, function(){
            var part = $("<div>").addClass("part " + this).addClass(o.clsPart).attr("data-label", that.locale["calendar"]["time"][this]).appendTo(element);

            if (this === "days") {part.addClass(o.clsDays);}
            if (this === "hours") {part.addClass(o.clsHours);}
            if (this === "minutes") {part.addClass(o.clsMinutes);}
            if (this === "seconds") {part.addClass(o.clsSeconds);}

            $("<div>").addClass("digit").appendTo(part);
            $("<div>").addClass("digit").appendTo(part);

            if (this === "days" && delta_days >= 100) {

                for(var i = 0; i < String(Math.round(delta_days/100)).length; i++) {
                    $("<div>").addClass("digit").appendTo(part);
                }
            }

        });

        digit = element.find(".digit");
        digit.append($("<span class='digit-placeholder'>").html("0"));
        digit.append($("<span class='digit-value'>").html("0"));


        Utils.exec(o.onCountdownCreate, [element], element[0]);
        element.fire("countdowncreate");

        if (o.start === true) {
            this.start();
        } else {
            this.tick();
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        $(document).on("visibilitychange", function() {
            if (document.hidden) {
                that.pause();
            } else {
                that.resume();
            }
        }, {ns: element.attr("id")});
    },

    blink: function(){
        var element = this.element, o = this.options;
        element.toggleClass("blink");
        Utils.exec(o.onBlink, [this.current], element[0]);
        element.fire("blink", {
            time: this.current
        })
    },

    tick: function(){
        var element = this.element, o = this.options;
        var dm = 24*60*60, hm = 60*60, mm = 60, sm = 1;
        var left, now = (new Date()).getTime();
        var d, h, m, s;
        var days = element.find(".days"),
            hours = element.find(".hours"),
            minutes = element.find(".minutes"),
            seconds = element.find(".seconds");

        left = Math.floor((this.breakpoint - now)/1000);

        if (left <= -1) {
            this.stop();
            element.addClass(o.clsAlarm);
            Utils.exec(o.onAlarm, [now], element[0]);
            element.fire("alarm", {
                time: now
            });
            return ;
        }

        d = Math.floor(left / dm);
        left -= d * dm;
        if (this.current.d !== d) {
            this.current.d = d;
            this.draw("days", d);
        }

        if (d === 0) {
            if (this.zeroDaysFired === false) {
                this.zeroDaysFired = true;
                days.addClass(o.clsZero);
                Utils.exec(o.onZero, ["days", days], element[0]);
                element.fire("zero", {
                    parts: ["days", days]
                });
            }
        }

        h = Math.floor(left / hm);
        left -= h*hm;
        if (this.current.h !== h) {
            this.current.h = h;
            this.draw("hours", h);
        }

        if (d === 0 && h === 0) {
            if (this.zeroHoursFired === false) {
                this.zeroHoursFired = true;
                hours.addClass(o.clsZero);
                Utils.exec(o.onZero, ["hours", hours], element[0]);
                element.fire("zero", {
                    parts: ["hours", hours]
                });
            }
        }

        m = Math.floor(left / mm);
        left -= m*mm;
        if (this.current.m !== m) {
            this.current.m = m;
            this.draw("minutes", m);
        }

        if (d === 0 && h === 0 && m === 0) {
            if (this.zeroMinutesFired === false) {
                this.zeroMinutesFired = true;
                minutes.addClass(o.clsZero);
                Utils.exec(o.onZero, ["minutes", minutes], element[0]);
                element.fire("zero", {
                    parts: ["minutes", minutes]
                });

            }
        }

        s = Math.floor(left / sm);
        if (this.current.s !== s) {
            this.current.s = s;
            this.draw("seconds", s);
        }

        if (d === 0 && h === 0 && m === 0 && s === 0) {
            if (this.zeroSecondsFired === false) {
                this.zeroSecondsFired = true;
                seconds.addClass(o.clsZero);
                Utils.exec(o.onZero, ["seconds", seconds], element[0]);
                element.fire("zero", {
                    parts: ["seconds", seconds]
                });

            }
        }

        Utils.exec(o.onTick, [{days:d, hours:h, minutes:m, seconds:s}], element[0]);
        element.fire("tick", {
            days:d, hours:h, minutes:m, seconds:s
        });
    },

    draw: function(part, value){
        var element = this.element, o = this.options;
        var digits, digits_length, digit_value, digit_current, digit;
        var len, i, duration = 900;

        var slideDigit = function(digit){
            var digit_copy, height = digit.height();

            digit.siblings(".-old-digit").remove();
            digit_copy = digit.clone().appendTo(digit.parent());
            digit_copy.css({
                top: -1 * height + 'px'
            });

            digit.addClass("-old-digit").animate(function(t, p){
                $(this).css({
                    top: (height * p) + 'px',
                    opacity: 1 - p
                });
            }, duration, o.animationFunc, function(){
                $(this).remove();
            });

            digit_copy.html(digit_value).animate(function(t, p){
                $(this).css({
                    top: (-height + (height * p)) + 'px',
                    opacity: p
                })
            }, duration, o.animationFunc);
        };

        var fadeDigit = function(digit){
            var digit_copy;
            digit.siblings(".-old-digit").remove();
            digit_copy = digit.clone().appendTo(digit.parent());
            digit_copy.css({
                opacity: 0
            });

            digit.addClass("-old-digit").animate(function(t, p){
                $(this).css({
                    opacity: 1 - p
                });
            }, duration / 2, o.animationFunc, function(){
                $(this).remove();
            });

            digit_copy.html(digit_value).animate(function(t, p){
                $(this).css({
                    opacity: p
                })
            }, duration, o.animationFunc);
        };

        var zoomDigit = function(digit){
            var digit_copy, height = digit.height(), fs = parseInt(digit.style("font-size"));

            digit.siblings(".-old-digit").remove();
            digit_copy = digit.clone().appendTo(digit.parent());
            digit_copy.css({
                top: 0,
                left: 0
            });

            digit.addClass("-old-digit").animate(function(t, p){
                $(this).css({
                    top: (height * p) + 'px',
                    opacity: 1 - p,
                    fontSize: fs * (1 - p) + 'px'
                });
            }, duration, o.animationFunc, function(){
                $(this).remove();
            });

            digit_copy.html(digit_value).animate(function(t, p){
                $(this).css({
                    top: (-height + (height * p)) + 'px',
                    opacity: p,
                    fontSize: fs * p + 'px'
                })
            }, duration, o.animationFunc);
        };

        value = ""+value;

        if (value.length === 1) {
            value = '0'+value;
        }

        len = value.length;

        digits = element.find("."+part+" .digit:not(-old-digit)");
        digits_length = digits.length;

        for(i = 0; i < len; i++){
            digit = digits.eq(digits_length - 1).find(".digit-value");
            digit_value = Math.floor( parseInt(value) / Math.pow(10, i) ) % 10;
            digit_current = parseInt(digit.text());

            if (digit_current === digit_value) {
                continue;
            }

            switch ((""+o.animate).toLowerCase()) {
                case "slide": slideDigit(digit); break;
                case "fade": fadeDigit(digit); break;
                case "zoom": zoomDigit(digit); break;
                default: digit.html(digit_value);
            }

            digits_length--;
        }
    },

    start: function(){
        var that = this, element = this.element;

        if (element.data("paused") === false) {
            return;
        }

        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);

        element.data("paused", false);

        this._setBreakpoint();
        this.tick();

        this.blinkInterval = setInterval(function(){that.blink();}, 500);
        this.tickInterval = setInterval(function(){that.tick();}, 1000);
    },

    stop: function(){
        var element = this.element;
        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);
        element.data("paused", true);
        element.find(".digit").html("0");
        this.current = {
            d: 0, h:0, m: 0, s:0
        };
    },

    pause: function(){
        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);
        this.element.data("paused", true);
    },

    resume: function(){
        var that = this;

        this.element.data("paused", false);
        this.blinkInterval = setInterval(function(){that.blink();}, 500);
        this.tickInterval = setInterval(function(){that.tick();}, 1000);
    },

    reset: function(){
        var that = this, element = this.element, o = this.options;

        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);

        element.find(".part").removeClass(o.clsZero);
        element.find(".digit").html("0");

        this._setBreakpoint();

        element.data("paused", false);

        this.tick();

        this.blinkInterval = setInterval(function(){that.blink();}, 500);
        this.tickInterval = setInterval(function(){that.tick();}, 1000);
    },

    togglePlay: function(){
        if (this.element.attr("data-pause") === true) {
            this.pause();
        } else {
            this.start();
        }
    },

    isPaused: function(){
        return this.element.data("paused");
    },

    getBreakpoint: function(asDate){
        return asDate === true ? new Date(this.breakpoint) : this.breakpoint;
    },

    getLeft: function(){
        var dm = 24*60*60*1000, hm = 60*60*1000, mm = 60*1000, sm = 1000;
        var now = (new Date()).getTime();
        var left_seconds = Math.floor(this.breakpoint - now);
        return {
            days: Math.round(left_seconds / dm),
            hours: Math.round(left_seconds / hm),
            minutes: Math.round(left_seconds / mm),
            seconds: Math.round(left_seconds / sm)
        };
    },

    i18n: function(val){
        var that = this, element = this.element, o = this.options;
        var parts = ["days", "hours", "minutes", "seconds"];


        if (val === undefined) {
            return o.locale;
        }
        if (Metro.locales[val] === undefined) {
            return false;
        }
        o.locale = val;
        this.locale = Metro.locales[o.locale];

        $.each(parts, function(){
            var cls = ".part." + this;
            var part = element.find(cls);
            part.attr("data-label", that.locale["calendar"]["time"][this]);
        });
    },

    changeAttrLocale: function(){
        var element = this.element;
        var locale = element.attr('data-locale');
        this.i18n(locale);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-pause": this.togglePlay(); break;
            case "data-locale": this.changeAttrLocale(); break;
        }
    },

    destroy: function(){
        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);

        $(document).off("visibilitychange", {ns: element.attr("id")});

        return this.element;
    }
};

Metro.plugin('countdown', Countdown);

var CounterDefaultConfig = {
    delay: 10,
    step: 1,
    value: 0,
    timeout: null,
    delimiter: ",",
    onStart: Metro.noop,
    onStop: Metro.noop,
    onTick: Metro.noop,
    onCounterCreate: Metro.noop
};

Metro.counterSetup = function (options) {
    CounterDefaultConfig = $.extend({}, CounterDefaultConfig, options);
};

if (typeof window["metroCounterSetup"] !== undefined) {
    Metro.counterSetup(window["metroCounterSetup"]);
}

var Counter = {
    init: function( options, elem ) {
        this.options = $.extend( {}, CounterDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.numbers = [];
        this.html = this.element.html();

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        Metro.checkRuntime(element, "counter");

        this._calcArray();

        Utils.exec(o.onCounterCreate, [element], this.elem);
        element.fire("countercreate");

        if (o.timeout !== null && Utils.isInt(o.timeout)) {
            setTimeout(function () {
                that.start();
            }, o.timeout);
        }
    },

    _calcArray: function(){
        var o = this.options;
        var i;

        this.numbers = [];

        for (i = 0; i <= o.value; i += o.step ) {
            this.numbers.push(i);
        }

        if (this.numbers[this.numbers.length - 1] !== o.value) {
            this.numbers.push(o.value);
        }
    },

    start: function(){
        var that = this, element = this.element, o = this.options;

        var tick = function(){
            if (that.numbers.length === 0) {
                Utils.exec(o.onStop, [element], element[0]);
                element.fire("stop");
                return ;
            }
            var n = that.numbers.shift();
            Utils.exec(o.onTick, [n, element], element[0]);
            element.fire("tick");
            element.html(Number(n).format(0, 0, o.delimiter));
            if (that.numbers.length > 0) {
                setTimeout(tick, o.delay);
            } else {
                Utils.exec(o.onStop, [element], element[0]);
                element.fire("stop");
            }
        };

        Utils.exec(o.onStart, [element], element[0]);
        element.fire("start");

        setTimeout(tick, o.delay);
    },

    reset: function(){
        this._calcArray();
        this.element.html(this.html);
    },

    setValueAttribute: function(){
        this.options.value = this.element.attr("data-value");
        this._calcArray();
    },

    changeAttribute: function(attributeName){
        if (attributeName === "data-value") {
            this.setValueAttribute();
        }
    },

    destroy: function(){
        return this.element;
    }
};

Metro.plugin('counter', Counter);

var CubeDefaultConfig = {
    rules: null,
    color: null,
    flashColor: null,
    flashInterval: 1000,
    numbers: false,
    offBefore: true,
    attenuation: .3,
    stopOnBlur: false,
    cells: 4,
    margin: 8,
    showAxis: false,
    axisStyle: "arrow", //line
    cellClick: false,
    autoRestart: 5000,

    clsCube: "",
    clsCell: "",
    clsSide: "",
    clsSideLeft: "",
    clsSideRight: "",
    clsSideTop: "",
    clsSideLeftCell: "",
    clsSideRightCell: "",
    clsSideTopCell: "",
    clsAxis: "",
    clsAxisX: "",
    clsAxisY: "",
    clsAxisZ: "",

    custom: Metro.noop,
    onTick: Metro.noop,
    onCubeCreate: Metro.noop
};

Metro.cubeSetup = function (options) {
    CubeDefaultConfig = $.extend({}, CubeDefaultConfig, options);
};

if (typeof window["metroCubeSetup"] !== undefined) {
    Metro.cubeSetup(window["metroCubeSetup"]);
}

var Cube = {
    init: function( options, elem ) {
        this.options = $.extend( {}, CubeDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.id = null;
        this.rules = null;
        this.interval = false;
        this.ruleInterval = false;
        this.running = false;
        this.intervals = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    default_rules: [
        {
            on: {'top': [16],      'left': [4],         'right': [1]},
            off: {'top': [13, 4],   'left': [1, 16],     'right': [13, 4]}
        },
        {
            on: {'top': [12, 15],  'left': [3, 8],      'right': [2, 5]},
            off: {'top': [9, 6, 3], 'left': [5, 10, 15], 'right': [14, 11, 8]}
        },
        {
            on: {'top': [11],      'left': [7],         'right': [6]},
            off: {'top': [1, 2, 5], 'left': [9, 13, 14], 'right': [15, 12, 16]}
        },
        {
            on: {'top': [8, 14],   'left': [2, 12],     'right': [9, 3]},
            off: {'top': [16],      'left': [4],         'right': [1]}
        },
        {
            on: {'top': [10, 7],   'left': [6, 11],     'right': [10, 7]},
            off: {'top': [12, 15],  'left': [3, 8],      'right': [2, 5]}
        },
        {
            on: {'top': [13, 4],   'left': [1, 16],     'right': [13, 4]},
            off: {'top': [11],      'left': [7],         'right': [6]}
        },
        {
            on: {'top': [9, 6, 3], 'left': [5, 10, 15], 'right': [14, 11, 8]},
            off: {'top': [8, 14],   'left': [2, 12],     'right': [9, 3]}
        },
        {
            on: {'top': [1, 2, 5], 'left': [9, 13, 14], 'right': [15, 12, 16]},
            off: {'top': [10, 7],   'left': [6, 11],     'right': [10, 7]}
        }
    ],

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "cube");

        if (o.rules === null) {
            this.rules = this.default_rules;
        } else {
            this._parseRules(o.rules);
        }

        this._createCube();
        this._createEvents();

        Utils.exec(o.onCubeCreate, [element]);
        element.fire("cubecreate");
    },

    _parseRules: function(rules){

        if (rules === undefined || rules === null) {
            return false;
        }

        if (Utils.isObject(rules)) {
            this.rules = Utils.isObject(rules);
            return true;
        } else {
            try {
                this.rules = JSON.parse(rules);
                return true;
            } catch (err) {
                console.log("Unknown or empty rules for cell flashing!");
                return false;
            }
        }
    },

    _createCube: function(){
        var element = this.element, o = this.options;
        var sides = ['left', 'right', 'top'];
        var id = Utils.elementId("cube");
        var cells_count = Math.pow(o.cells, 2);

        element.addClass("cube").addClass(o.clsCube);

        if (!element.attr('id')) {
            element.attr('id', id);
        }

        this.id = element.attr('id');

        this._createCssForFlashColor();
        this._createCssForCellSize();

        $.each(sides, function(){
            var side, cell, i;

            side = $("<div>").addClass("side " + this+"-side").addClass(o.clsSide).appendTo(element);

            if (this === 'left') {side.addClass(o.clsSideLeft);}
            if (this === 'right') {side.addClass(o.clsSideRight);}
            if (this === 'top') {side.addClass(o.clsSideTop);}

            for(i = 0; i < cells_count; i++) {
                cell = $("<div>").addClass("cube-cell").addClass("cell-id-"+(i+1)).addClass(o.clsCell);
                cell.data("id", i + 1).data("side", this);
                cell.appendTo(side);
                if (o.numbers === true) {
                    cell.html(i + 1);
                }
            }
        });

        var cells  = element.find(".cube-cell");
        if (o.color !== null) {
            if (Utils.isColor(o.color)) {
                cells.css({
                    backgroundColor: o.color,
                    borderColor: o.color
                })
            } else {
                cells.addClass(o.color);
            }
        }

        var axis = ['x', 'y', 'z'];
        $.each(axis, function(){
            var axis_name = this;
            var ax = $("<div>").addClass("axis " + o.axisStyle).addClass("axis-"+axis_name).addClass(o.clsAxis);
            if (axis_name === "x") ax.addClass(o.clsAxisX);
            if (axis_name === "y") ax.addClass(o.clsAxisY);
            if (axis_name === "z") ax.addClass(o.clsAxisZ);
            ax.appendTo(element);
        });

        if (o.showAxis === false) {
            element.find(".axis").hide();
        }

        this._run();
    },

    _run: function(){
        var that = this, element = this.element, o = this.options;
        var interval = 0;

        clearInterval(this.interval);
        element.find(".cube-cell").removeClass("light");

        if (o.custom !== Metro.noop) {
            Utils.exec(o.custom, [element]);
        } else {

            element.find(".cube-cell").removeClass("light");

            that._start();

            interval = Utils.isObject(this.rules) ? Utils.objectLength(this.rules) : 0;

            this.interval = setInterval(function(){
                that._start();
            }, interval * o.flashInterval);
        }
    },

    _createCssForCellSize: function(){
        var element = this.element, o = this.options;
        var sheet = Metro.sheet;
        var width;
        var cell_size;

        if (o.margin === 8 && o.cells === 4) {
            return ;
        }

        width = parseInt(Utils.getStyleOne(element, 'width'));
        cell_size = Math.ceil((width / 2 - o.margin * o.cells * 2) / o.cells);
        Utils.addCssRule(sheet, "#"+element.attr('id')+" .side .cube-cell", "width: "+cell_size+"px!important; height: "+cell_size+"px!important; margin: " + o.margin + "px!important;");
    },

    _createCssForFlashColor: function(){
        var element = this.element, o = this.options;
        var sheet = Metro.sheet;
        var rule1;
        var rule2;
        var rules1 = [];
        var rules2 = [];
        var i;

        if (o.flashColor === null) {
            return ;
        }

        rule1 = "0 0 10px " + Utils.hexColorToRgbA(o.flashColor, 1);
        rule2 = "0 0 10px " + Utils.hexColorToRgbA(o.flashColor, o.attenuation);

        for(i = 0; i < 3; i++) {
            rules1.push(rule1);
            rules2.push(rule2);
        }

        Utils.addCssRule(sheet, "@keyframes pulsar-cell-"+element.attr('id'), "0%, 100% { " + "box-shadow: " + rules1.join(",") + "} 50% { " + "box-shadow: " + rules2.join(",") + " }");
        Utils.addCssRule(sheet, "#"+element.attr('id')+" .side .cube-cell.light", "animation: pulsar-cell-" + element.attr('id') + " 2.5s 0s ease-out infinite; " + "background-color: " + o.flashColor + "!important; border-color: " + o.flashColor+"!important;");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        $(window).on(Metro.events.blur, function(){
            if (o.stopOnBlur === true && that.running === true) {
                that._stop();
            }
        }, {ns: element.attr("id")});

        $(window).on(Metro.events.focus, function(){
            if (o.stopOnBlur === true && that.running === false) {
                that._start();
            }
        }, {ns: element.attr("id")});

        element.on(Metro.events.click, ".cube-cell", function(){
            if (o.cellClick === true) {
                var cell = $(this);
                cell.toggleClass("light");
            }
        });
    },

    _start: function(){
        var that = this, element = this.element;

        element.find(".cube-cell").removeClass("light");

        this.running = true;

        $.each(this.rules, function(index, rule){
            that._execRule(index, rule);
        });
    },

    _stop: function(){
        this.running = false;
        clearInterval(this.interval);
        $.each(this.intervals, function(){
            clearInterval(this);
        })
    },

    _tick: function(index, speed){
        var that = this, element = this.element, o = this.options;
        if (speed === undefined) {
            speed = o.flashInterval * index;
        }

        var interval = setTimeout(function(){
            Utils.exec(o.onTick, [index], element[0]);
            element.fire("tick", {
                index: index
            });
            clearInterval(interval);
            Utils.arrayDelete(that.intervals, interval);
        }, speed);
        this.intervals.push(interval);
    },

    _toggle: function(cell, func, time, speed){
        var that = this;
        if (speed === undefined) {
            speed = this.options.flashInterval * time;
        }
        var interval = setTimeout(function(){
            cell[func === 'on' ? 'addClass' : 'removeClass']("light");
            clearInterval(interval);
            Utils.arrayDelete(that.intervals, interval);
        }, speed);
        this.intervals.push(interval);
    },

    start: function(){
        this._start();
    },

    stop: function(){
        this._stop();
    },

    toRule: function(index, speed){
        var that = this, element = this.element, o = this.options;
        var rules = this.rules;

        if (rules === null || rules === undefined || rules[index] === undefined) {
            return ;
        }
        clearInterval(this.ruleInterval);
        this.ruleInterval = false;
        this.stop();
        element.find(".cube-cell").removeClass("light");
        for (var i = 0; i <= index; i++) {
            this._execRule(i, rules[i], speed);
        }
        if (Utils.isInt(o.autoRestart) && o.autoRestart > 0) {
            this.ruleInterval = setTimeout(function(){
                that._run();
            }, o.autoRestart);
        }
    },

    _execRule: function(index, rule, speed){
        var that = this, element = this.element;
        var sides = ['left', 'right', 'top'];

        this._tick(index, speed);

        $.each(sides, function(){
            var side_class = "."+this+"-side";
            var side_name = this;
            var cells_on = rule["on"] !== undefined && rule["on"][side_name] !== undefined ? rule["on"][side_name] : false;
            var cells_off = rule["off"] !== undefined && rule["off"][side_name] !== undefined ? rule["off"][side_name] : false;

            if (cells_on !== false) $.each(cells_on, function(){
                var cell_index = this;
                var cell = element.find(side_class + " .cell-id-"+cell_index);

                that._toggle(cell, 'on', index, speed);
            });

            if (cells_off !== false) $.each(cells_off, function(){
                var cell_index = this;
                var cell = element.find(side_class + " .cell-id-"+cell_index);

                that._toggle(cell, 'off', index, speed);
            });
        });
    },

    rule: function(r){
        if (r === undefined) {
            return this.rules;
        }

        if (this._parseRules(r) !== true) {
            return ;
        }
        this.options.rules = r;
        this.stop();
        this.element.find(".cube-cell").removeClass("light");
        this._run();
    },

    axis: function(show){
        var func = show === true ? "show" : "hide";
        this.element.find(".axis")[func]();
    },

    changeRules: function(){
        var element = this.element, o = this.options;
        var rules = element.attr("data-rules");
        if (this._parseRules(rules) !== true) {
            return ;
        }
        this.stop();
        element.find(".cube-cell").removeClass("light");
        o.rules = rules;
        this._run();
    },

    changeAxisVisibility: function(){
        var element = this.element;
        var visibility = JSON.parse(element.attr("data-show-axis")) === true;
        var func = visibility ? "show" : "hide";
        element.find(".axis")[func]();
    },

    changeAxisStyle: function(){
        var element = this.element;
        var style = element.attr("data-axis-style");

        element.find(".axis").removeClass("arrow line no-style").addClass(style);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-rules": this.changeRules(); break;
            case "data-show-axis": this.changeAxisVisibility(); break;
            case "data-axis-style": this.changeAxisStyle(); break;
        }
    },

    destroy: function(){
        var element = this.element;

        clearInterval(this.interval);
        this.interval = null;

        $(window).off(Metro.events.blur, {ns: element.attr("id")});
        $(window).off(Metro.events.focus,{ns: element.attr("id")});

        element.off(Metro.events.click, ".cube-cell");

        return element;
    }
};

Metro.plugin('cube', Cube);

var DatePickerDefaultConfig = {
    gmt: 0,
    format: "%Y-%m-%d",
    inputFormat: null,
    locale: METRO_LOCALE,
    value: null,
    distance: 3,
    month: true,
    day: true,
    year: true,
    minYear: null,
    maxYear: null,
    scrollSpeed: 4,
    copyInlineStyles: true,
    clsPicker: "",
    clsPart: "",
    clsMonth: "",
    clsDay: "",
    clsYear: "",
    okButtonIcon: "<span class='default-icon-check'></span>",
    cancelButtonIcon: "<span class='default-icon-cross'></span>",
    onSet: Metro.noop,
    onOpen: Metro.noop,
    onClose: Metro.noop,
    onScroll: Metro.noop,
    onDatePickerCreate: Metro.noop
};

Metro.datePickerSetup = function (options) {
    DatePickerDefaultConfig = $.extend({}, DatePickerDefaultConfig, options);
};

if (typeof window["metroDatePickerSetup"] !== undefined) {
    Metro.datePickerSetup(window["metroDatePickerSetup"]);
}

var DatePicker = {
    init: function( options, elem ) {
        this.options = $.extend( {}, DatePickerDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.picker = null;
        this.isOpen = false;
        this.value = new Date();
        this.locale = Metro.locales[this.options.locale]['calendar'];
        this.offset = (new Date()).getTimezoneOffset() / 60 + 1;
        this.listTimer = {
            day: null,
            month: null,
            year: null
        };

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "datepicker");

        if (o.distance < 1) {
            o.distance = 1;
        }

        if (Utils.isValue(element.val())) {
            o.value = element.val();
        }

        if (Utils.isValue(o.value)) {
            if (Utils.isValue(o.inputFormat)) {
                this.value = (""+o.value).toDate(o.inputFormat);
            } else {
                if (Utils.isDate(o.value)) {
                    this.value = new Date(o.value);
                }
            }
        }

        // this.value.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
        // this.value = this.value.addHours(this.offset);

        if (Metro.locales[o.locale] === undefined) {
            o.locale = METRO_LOCALE;
        }

        this.locale = Metro.locales[o.locale]['calendar'];

        if (o.minYear === null) {
            o.minYear = (new Date()).getFullYear() - 100;
        }

        if (o.maxYear === null) {
            o.maxYear = (new Date()).getFullYear() + 100;
        }

        this._createStructure();
        this._createEvents();
        this._set();

        Utils.exec(o.onDatePickerCreate, [element]);
        element.fire("datepickercreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var picker, month, day, year, i, j;
        var dateWrapper, selectWrapper, selectBlock, actionBlock;

        var prev = element.prev();
        var parent = element.parent();
        var id = Utils.elementId("datepicker");

        picker = $("<div>").attr("id", id).addClass("wheel-picker date-picker " + element[0].className).addClass(o.clsPicker);

        if (prev.length === 0) {
            parent.prepend(picker);
        } else {
            picker.insertAfter(prev);
        }

        element.appendTo(picker);


        dateWrapper = $("<div>").addClass("date-wrapper").appendTo(picker);

        if (o.month === true) {
            month = $("<div>").addClass("month").addClass(o.clsPart).addClass(o.clsMonth).appendTo(dateWrapper);
        }
        if (o.day === true) {
            day = $("<div>").addClass("day").addClass(o.clsPart).addClass(o.clsDay).appendTo(dateWrapper);
        }
        if (o.year === true) {
            year = $("<div>").addClass("year").addClass(o.clsPart).addClass(o.clsYear).appendTo(dateWrapper);
        }

        selectWrapper = $("<div>").addClass("select-wrapper").appendTo(picker);

        selectBlock = $("<div>").addClass("select-block").appendTo(selectWrapper);

        if (o.month === true) {
            month = $("<ul>").addClass("sel-month").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(month);
            for (i = 0; i < 12; i++) {
                $("<li>").addClass("js-month-"+i+" js-month-real-"+this.locale['months'][i].toLowerCase()).html(this.locale['months'][i]).data("value", i).appendTo(month);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(month);
        }

        if (o.day === true) {
            day = $("<ul>").addClass("sel-day").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(day);
            for (i = 0; i < 31; i++) {
                $("<li>").addClass("js-day-"+i+" js-day-real-"+(i+1)).html(i + 1).data("value", i + 1).appendTo(day);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(day);
        }

        if (o.year === true) {
            year = $("<ul>").addClass("sel-year").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(year);
            for (i = o.minYear, j = 0; i <= o.maxYear; i++, j++) {
                $("<li>").addClass("js-year-"+ j + " js-year-real-" + i).html(i).data("value", i).appendTo(year);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(year);
        }

        selectBlock.height((o.distance * 2 + 1) * 40);

        actionBlock = $("<div>").addClass("action-block").appendTo(selectWrapper);
        $("<button>").attr("type", "button").addClass("button action-ok").html(o.okButtonIcon).appendTo(actionBlock);
        $("<button>").attr("type", "button").addClass("button action-cancel").html(o.cancelButtonIcon).appendTo(actionBlock);


        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (i = 0; i < element[0].style.length; i++) {
                picker.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        this.picker = picker;
    },

    _createEvents: function(){
        var that = this, o = this.options;
        var picker = this.picker;

        picker.on(Metro.events.start, ".select-block ul", function(e){

            if (e.changedTouches) {
                return ;
            }

            var target = this;
            var pageY = Utils.pageXY(e).y;

            $(document).on(Metro.events.move, function(e){

                target.scrollTop -= o.scrollSpeed * (pageY  > Utils.pageXY(e).y ? -1 : 1);

                pageY = Utils.pageXY(e).y;
            }, {ns: picker.attr("id")});

            $(document).on(Metro.events.stop, function(){
                $(document).off(Metro.events.move, {ns: picker.attr("id")});
                $(document).off(Metro.events.stop, {ns: picker.attr("id")});
            }, {ns: picker.attr("id")});
        });

        picker.on(Metro.events.click, function(e){
            if (that.isOpen === false) that.open();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-ok", function(e){
            var m, d, y;
            var sm = picker.find(".sel-month li.active"),
                sd = picker.find(".sel-day li.active"),
                sy = picker.find(".sel-year li.active");

            m = sm.length === 0 ? that.value.getMonth() : sm.data("value");
            d = sd.length === 0 ? that.value.getDate() : sd.data("value");
            y = sy.length === 0 ? that.value.getFullYear() : sy.data("value");

            that.value = new Date(y, m, d);
            that._correct();
            that._set();

            that.close();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-cancel", function(e){
            that.close();
            e.stopPropagation();
        });

        var scrollLatency = 150;
        $.each(["month", "day", "year"], function(){
            var part = this, list = picker.find(".sel-"+part);

            list.on("scroll", function(){
                if (that.isOpen) {
                    if (that.listTimer[part]) {
                        clearTimeout(that.listTimer[part]);
                        that.listTimer[part] = null;
                    }

                    if (!that.listTimer[part]) that.listTimer[part] = setTimeout(function () {

                        var target, targetElement, scrollTop;

                        that.listTimer[part] = null;

                        target = Math.round((Math.ceil(list.scrollTop()) / 40));

                        targetElement = list.find(".js-" + part + "-" + target);
                        scrollTop = targetElement.position().top - (o.distance * 40);

                        list.find(".active").removeClass("active");

                        list[0].scrollTop = scrollTop;
                        targetElement.addClass("active");
                        Utils.exec(o.onScroll, [targetElement, list, picker], list[0]);

                    }, scrollLatency);
                }
            })
        });
    },

    _correct: function(){
        var m = this.value.getMonth(),
            d = this.value.getDate(),
            y = this.value.getFullYear();

        this.value = new Date(y, m, d);
    },

    _set: function(){
        var element = this.element, o = this.options;
        var picker = this.picker;
        var m = this.locale['months'][this.value.getMonth()],
            d = this.value.getDate(),
            y = this.value.getFullYear();

        if (o.month === true) {
            picker.find(".month").html(m);
        }
        if (o.day === true) {
            picker.find(".day").html(d);
        }
        if (o.year === true) {
            picker.find(".year").html(y);
        }

        element.val(this.value.format(o.format, o.locale)).trigger("change");

        Utils.exec(o.onSet, [this.value, element.val(), element, picker], element[0]);
        element.fire("set", {
            value: this.value
        });
    },

    open: function(){
        var element = this.element, o = this.options;
        var picker = this.picker;
        var m = this.value.getMonth(), d = this.value.getDate() - 1, y = this.value.getFullYear();
        var m_list, d_list, y_list;
        var select_wrapper = picker.find(".select-wrapper");
        var select_wrapper_in_viewport, select_wrapper_rect;

        select_wrapper.parent().removeClass("for-top for-bottom");
        select_wrapper.show(0);
        picker.find("li").removeClass("active");

        select_wrapper_in_viewport = Utils.inViewport(select_wrapper[0]);
        select_wrapper_rect = Utils.rect(select_wrapper[0]);

        if (!select_wrapper_in_viewport && select_wrapper_rect.top > 0) {
            select_wrapper.parent().addClass("for-bottom");
        }

        if (!select_wrapper_in_viewport && select_wrapper_rect.top < 0) {
            select_wrapper.parent().addClass("for-top");
        }

        if (o.month === true) {
            m_list = picker.find(".sel-month");
            m_list.scrollTop(0).animate({
                scrollTop: m_list.find("li.js-month-" + m).addClass("active").position().top - (40 * o.distance)
            }, 100);
        }
        if (o.day === true) {
            d_list = picker.find(".sel-day");
            d_list.scrollTop(0).animate({
                scrollTop: d_list.find("li.js-day-" + d).addClass("active").position().top - (40 * o.distance)
            }, 100);
        }
        if (o.year === true) {
            y_list = picker.find(".sel-year");
            y_list.scrollTop(0).animate({
                scrollTop: y_list.find("li.js-year-real-" + y).addClass("active").position().top - (40 * o.distance)
            }, 100);
        }

        this.isOpen = true;

        Utils.exec(o.onOpen, [this.value, element, picker], element[0]);
        element.fire("open", {
            value: this.value
        });
    },

    close: function(){
        var picker = this.picker, o = this.options, element = this.element;
        picker.find(".select-wrapper").hide(0);
        this.isOpen = false;
        Utils.exec(o.onClose, [this.value, element, picker], element[0]);
        element.fire("close", {
            value: this.value
        });
    },

    val: function(value){
        var o = this.options;

        if (!Utils.isValue(value)) {
            return this.element.val();
        }

        if (Utils.isValue(o.inputFormat)) {
            this.value = (""+value).toDate(o.inputFormat);
        } else {
            this.value = new Date(value);
        }

        // this.value = (new Date(t)).addHours(this.offset);
        this._set();
    },

    date: function(t){
        if (t === undefined) {
            return this.value;
        }

        try {
            this.value = new Date(t.format("%Y-%m-%d"));
            this._set();
        } catch (e) {
            return false;
        }
    },

    i18n: function(locale){
        var element = this.element, o = this.options;
        var month, i;

        o.locale = locale ? locale : element.attr("data-locale");
        this.locale = Metro.locales[o.locale]['calendar'];

        if (o.month === true) {
            month =  element.closest(".date-picker").find(".sel-month").html("");
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(month);
            for (i = 0; i < 12; i++) {
                $("<li>").addClass("js-month-"+i+" js-month-real-"+this.locale['months'][i].toLowerCase()).html(this.locale['months'][i]).data("value", i).appendTo(month);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(month);
        }

        this._set();
    },

    changeAttribute: function(attributeName){
        var that = this;

        function changeValue() {
            that.val(that.element.attr("data-value"));
        }

        function changeLocale() {
            that.i18n(that.element.attr("data-locale"));
        }

        function changeFormat() {
            that.options.format = that.element.attr("data-format");
            // that.element.val(that.value.format(that.options.format, that.options.locale)).trigger("change");
            that._set();
        }

        switch (attributeName) {
            case "data-value": changeValue(); break;
            case "data-locale": changeLocale(); break;
            case "data-format": changeFormat(); break;
        }
    },

    destroy: function(){
        var element = this.element, picker = this.picker;

        $.each(["moth", "day", "year"], function(){
            picker.find(".sel-"+this).off("scroll");
        });

        picker.off(Metro.events.start, ".select-block ul");
        picker.off(Metro.events.click);
        picker.off(Metro.events.click, ".action-ok");
        picker.off(Metro.events.click, ".action-cancel");

        return element;
    }
};

Metro.plugin('datepicker', DatePicker);

$(document).on(Metro.events.click, function(){
    $.each($(".date-picker"), function(){
        $(this).find("input").each(function(){
            Metro.getPlugin(this, "datepicker").close();
        });
    });
});

var DialogDefaultConfig = {
    closeButton: false,
    leaveOverlayOnClose: false,
    toTop: false,
    toBottom: false,
    locale: METRO_LOCALE,
    title: "",
    content: "",
    actions: {},
    actionsAlign: "right",
    defaultAction: true,
    overlay: true,
    overlayColor: '#000000',
    overlayAlpha: .5,
    overlayClickClose: false,
    width: '480',
    height: 'auto',
    shadow: true,
    closeAction: true,
    clsDialog: "",
    clsTitle: "",
    clsContent: "",
    clsAction: "",
    clsDefaultAction: "",
    clsOverlay: "",
    autoHide: 0,
    removeOnClose: false,
    show: false,

    _runtime: false,

    onShow: Metro.noop,
    onHide: Metro.noop,
    onOpen: Metro.noop,
    onClose: Metro.noop,
    onDialogCreate: Metro.noop
};

Metro.dialogSetup = function (options) {
    DialogDefaultConfig = $.extend({}, DialogDefaultConfig, options);
};

if (typeof window["metroDialogSetup"] !== undefined) {
    Metro.dialogSetup(window["metroDialogSetup"]);
}

var Dialog = {
    _counter: 0,

    init: function( options, elem ) {
        this.options = $.extend( {}, DialogDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.interval = null;
        this.overlay = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;
        this.locale = Metro.locales[o.locale] !== undefined ? Metro.locales[o.locale] : Metro.locales["en-US"];

        Metro.checkRuntime(element, "dialog");

        this._build();
    },

    _build: function(){
        var that = this, element = this.element, o = this.options;
        var body = $("body");
        var overlay;

        element.addClass("dialog");

        if (o.shadow === true) {
            element.addClass("shadow-on");
        }

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("dialog"));
        }

        if (o.title !== "") {
            this.setTitle(o.title);
        }

        if (o.content !== "") {
            this.setContent(o.content);
        }

        if (o.defaultAction === true || (o.actions !== false && typeof o.actions === 'object' && Utils.objectLength(o.actions) > 0)) {
            var buttons = element.find(".dialog-actions");
            var button;

            if (buttons.length === 0) {
                buttons = $("<div>").addClass("dialog-actions").addClass("text-"+o.actionsAlign).appendTo(element);
            }

            if (o.defaultAction === true && (Utils.objectLength(o.actions) === 0 && element.find(".dialog-actions > *").length === 0)) {
                button = $("<button>").addClass("button js-dialog-close").addClass(o.clsDefaultAction).html(this.locale["buttons"]["ok"]);
                button.appendTo(buttons);
            }

            if (Utils.isObject(o.actions)) $.each(Utils.isObject(o.actions), function(){
                var item = this;
                button = $("<button>").addClass("button").addClass(item.cls).html(item.caption);
                if (item.onclick !== undefined) button.on(Metro.events.click, function(){
                    Utils.exec(item.onclick, [element]);
                });
                button.appendTo(buttons);
            });
        }

        if (o.overlay === true) {
            overlay  = this._overlay();
            this.overlay = overlay;
        }

        if (o.closeAction === true) {
            element.on(Metro.events.click, ".js-dialog-close", function(){
                that.close();
            });
        }

        var closer = element.find("closer");
        if (closer.length === 0) {
            closer = $("<span>").addClass("button square closer js-dialog-close");
            closer.appendTo(element);
        }
        if (o.closeButton !== true) {
            closer.hide();
        }

        element.css({
            width: o.width,
            height: o.height,
            visibility: "hidden",
            top: '100%',
            left: ( $(window).width() - element.outerWidth() ) / 2
        });

        element.addClass(o.clsDialog);
        element.find(".dialog-title").addClass(o.clsTitle);
        element.find(".dialog-content").addClass(o.clsContent);
        element.find(".dialog-actions").addClass(o.clsAction);

        element.appendTo(body);

        if (o.show) {
            this.open();
        }

        $(window).on(Metro.events.resize, function(){
            that.setPosition();
        }, {ns: element.attr('id')});

        Utils.exec(this.options.onDialogCreate, [this.element]);
        element.fire("dialogcreate");
    },

    _overlay: function(){
        var o = this.options;

        var overlay = $("<div>");
        overlay.addClass("overlay").addClass(o.clsOverlay);

        if (o.overlayColor === 'transparent') {
            overlay.addClass("transparent");
        } else {
            overlay.css({
                background: Utils.hex2rgba(o.overlayColor, o.overlayAlpha)
            });
        }

        return overlay;
    },

    hide: function(callback){
        var element = this.element, o = this.options;
        var timeout = 0;
        if (o.onHide !== Metro.noop) {
            timeout = 500;
            Utils.exec(o.onHide, null, element[0]);
            element.fire("hide");
        }
        setTimeout(function(){
            Utils.callback(callback);
            element.css({
                visibility: "hidden",
                top: "100%"
            });
        }, timeout);
    },

    show: function(callback){
        var that = this, element = this.element, o = this.options;
        this.setPosition();
        element.css({
            visibility: "visible"
        });
        Utils.exec(o.onShow, [that], element[0]);
        element.fire("show");
        Utils.callback(callback);
    },

    setPosition: function(){
        var element = this.element, o = this.options;
        var top, bottom;
        if (o.toTop !== true && o.toBottom !== true) {
            top = ( $(window).height() - element.outerHeight() ) / 2;
            if (top < 0) {
                top = 0;
            }
            bottom = "auto";
        } else {
            if (o.toTop === true) {
                top = 0;
                bottom = "auto";
            }
            if (o.toTop !== true && o.toBottom === true) {
                bottom = 0;
                top = "auto";
            }
        }
        element.css({
            top: top,
            bottom: bottom,
            left: ( $(window).width() - element.outerWidth() ) / 2
        });
    },

    setContent: function(c){
        var element = this.element;
        var content = element.find(".dialog-content");
        if (content.length === 0) {
            content = $("<div>").addClass("dialog-content");
            content.appendTo(element);
        }

        if (!Utils.isQ(c) && Utils.isFunc(c)) {
            c = Utils.exec(c);
        }

        if (Utils.isQ(c)) {
            c.appendTo(content);
        } else {
            content.html(c);
        }
    },

    setTitle: function(t){
        var element = this.element;
        var title = element.find(".dialog-title");
        if (title.length === 0) {
            title = $("<div>").addClass("dialog-title");
            title.appendTo(element);
        }
        title.html(t);
    },

    close: function(){
        var element = this.element, o = this.options;

        if (!Utils.bool(o.leaveOverlayOnClose)) {
            $('body').find('.overlay').remove();
        }

        this.hide(function(){
            element.data("open", false);
            Utils.exec(o.onClose, [element], element[0]);
            element.fire("close");
            if (o.removeOnClose === true) {
                element.remove();
            }
        });
    },

    open: function(){
        var that = this, element = this.element, o = this.options;

        if (o.overlay === true && $(".overlay").length === 0) {
            this.overlay.appendTo($("body"));
            if (o.overlayClickClose === true) {
                this.overlay.on(Metro.events.click, function(){
                    that.close();
                });
            }
        }

        this.show(function(){
            Utils.exec(o.onOpen, [element], element[0]);
            element.fire("open");
            element.data("open", true);
            if (parseInt(o.autoHide) > 0) {
                setTimeout(function(){
                    that.close();
                }, parseInt(o.autoHide));
            }
        });
    },

    toggle: function(){
        var element = this.element;
        if (element.data('open')) {
            this.close();
        } else {
            this.open();
        }
    },

    isOpen: function(){
        return this.element.data('open') === true;
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element, o = this.options;

        element.off(Metro.events.click, ".js-dialog-close");
        element.find(".button").off(Metro.events.click);
        $(window).off(Metro.events.resize,{ns: element.attr('id')});

        return element;
    }
};

Metro.plugin('dialog', Dialog);

Metro['dialog'] = {

    isDialog: function(el){
        return Utils.isMetroObject(el, "dialog");
    },

    open: function(el, content, title){
        if (!this.isDialog(el)) {
            return false;
        }
        var dialog = Metro.getPlugin(el, "dialog");
        if (title !== undefined) {
            dialog.setTitle(title);
        }
        if (content !== undefined) {
            dialog.setContent(content);
        }
        dialog.open();
    },

    close: function(el){
        if (!this.isDialog(el)) {
            return false;
        }
        Metro.getPlugin($(el)[0], "dialog").close();
    },

    toggle: function(el){
        if (!this.isDialog(el)) {
            return false;
        }
        Metro.getPlugin($(el)[0], "dialog").toggle();
    },

    isOpen: function(el){
        if (!this.isDialog(el)) {
            return false;
        }
        Metro.getPlugin($(el)[0], "dialog").isOpen();
    },

    remove: function(el){
        if (!this.isDialog(el)) {
            return false;
        }
        var dialog = Metro.getPlugin($(el)[0], "dialog");
        dialog.options.removeOnClose = true;
        dialog.close();
    },

    create: function(options){
        var dlg;

        dlg = $("<div>").appendTo($("body"));

        var dlg_options = $.extend({}, {
            show: true,
            closeAction: true,
            removeOnClose: true
        }, (options !== undefined ? options : {}));

        dlg_options._runtime = true;

        return dlg.dialog(dlg_options);
    }
};

var DonutDefaultConfig = {
    size: 100,
    radius: 50,
    hole: .8,
    value: 0,
    background: "#ffffff",
    color: "",
    stroke: "#d1d8e7",
    fill: "#49649f",
    fontSize: 24,
    total: 100,
    cap: "%",
    showText: true,
    showValue: false,
    animate: 0,
    onChange: Metro.noop,
    onDonutCreate: Metro.noop
};

Metro.donutSetup = function (options) {
    DonutDefaultConfig = $.extend({}, DonutDefaultConfig, options);
};

if (typeof window["metroDonutSetup"] !== undefined) {
    Metro.donutSetup(window["metroDonutSetup"]);
}

var Donut = {
    init: function( options, elem ) {
        this.options = $.extend( {}, DonutDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = 0;
        this.animation_change_interval = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var html = "";
        var r = o.radius  * (1 - (1 - o.hole) / 2);
        var width = o.radius * (1 - o.hole);
        var circumference = 2 * Math.PI * r;
        var strokeDasharray = ((o.value * circumference) / o.total) + ' ' + circumference;
        var transform = 'rotate(-90 ' + o.radius + ',' + o.radius + ')';
        var fontSize = r * o.hole * 0.6;

        Metro.checkRuntime(element, "donut");

        element.addClass("donut");

        element.css({
            width: o.size,
            height: o.size,
            background: o.background
        });

        html += "<svg>";
        html += "   <circle class='donut-back' r='"+(r)+"px' cx='"+(o.radius)+"px' cy='"+(o.radius)+"px' transform='"+(transform)+"' fill='none' stroke='"+(o.stroke)+"' stroke-width='"+(width)+"'/>";
        html += "   <circle class='donut-fill' r='"+(r)+"px' cx='"+(o.radius)+"px' cy='"+(o.radius)+"px' transform='"+(transform)+"' fill='none' stroke='"+(o.fill)+"' stroke-width='"+(width)+"'/>";
        if (o.showText === true) html += "   <text   class='donut-title' x='"+(o.radius)+"px' y='"+(o.radius)+"px' dy='"+(fontSize/3)+"px' text-anchor='middle' fill='"+(o.color !== "" ? o.color: o.fill)+"' font-size='"+(fontSize)+"px'>0"+(o.cap)+"</text>";
        html += "</svg>";

        element.html(html);

        this.val(o.value);

        Utils.exec(o.onDonutCreate, null, element[0]);
        element.fire("donutcreate");
    },

    _setValue: function(v){
        var that = this, element = this.element, o = this.options;

        var fill = element.find(".donut-fill");
        var title = element.find(".donut-title");
        var r = o.radius  * (1 - (1 - o.hole) / 2);
        var circumference = 2 * Math.PI * r;
        // var title_value = (o.showValue ? o.value : Math.round(((v * 1000 / o.total) / 10)))+(o.cap);
        var title_value = (o.showValue ? v : Utils.percent(o.total, v, true))  + (o.cap);
        var fill_value = ((v * circumference) / o.total) + ' ' + circumference;

        fill.attr("stroke-dasharray", fill_value);
        title.html(title_value);
    },

    val: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return this.value
        }

        if (parseInt(v) < 0 || parseInt(v) > o.total) {
            return false;
        }

        if (o.animate > 0 && !document.hidden) {
            var inc = v > that.value;
            var i = that.value + (inc ? -1 : 1);

            clearInterval(that.animation_change_interval);
            this.animation_change_interval = setInterval(function(){
                if (inc) {
                    that._setValue(++i);
                    if (i >= v) {
                        clearInterval(that.animation_change_interval);
                    }
                } else {
                    that._setValue(--i);
                    if (i <= v) {
                        clearInterval(that.animation_change_interval);
                    }
                }
            }, o.animate);
        } else {
            clearInterval(that.animation_change_interval);
            this._setValue(v);
        }

        this.value = v;
        //element.attr("data-value", v);
        Utils.exec(o.onChange, [this.value], element[0]);
        element.fire("change", {
            value: this.value
        });
    },

    changeValue: function(){
        this.val(this.element.attr("data-value"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-value": this.changeValue(); break;
        }
    },

    destroy: function(){
        return this.element;
    }
};

Metro.plugin('donut', Donut);

var DraggableDefaultConfig = {
    dragElement: 'self',
    dragArea: "parent",
    onCanDrag: Metro.noop_true,
    onDragStart: Metro.noop,
    onDragStop: Metro.noop,
    onDragMove: Metro.noop,
    onDraggableCreate: Metro.noop
};

Metro.draggableSetup = function (options) {
    DraggableDefaultConfig = $.extend({}, DraggableDefaultConfig, options);
};

if (typeof window["metroDraggableSetup"] !== undefined) {
    Metro.draggableSetup(window["metroDraggableSetup"]);
}

var Draggable = {
    init: function( options, elem ) {
        this.options = $.extend( {}, DraggableDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.drag = false;
        this.move = false;
        this.backup = {
            cursor: 'default',
            zIndex: '0'
        };
        this.dragArea = null;
        this.dragElement = null;

        this.id = Utils.elementId("draggable");

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onDraggableCreate, [this.element]);
        this.element.fire("draggablecreate");

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        this._createStructure();
        this._createEvents();
    },

    _createStructure: function(){
        var that = this, element = this.element, elem = this.elem, o = this.options;
        var offset = element.offset();
        var dragElement  = o.dragElement !== 'self' ? element.find(o.dragElement) : element;

        Metro.checkRuntime(element, "draggable");

        element.data("canDrag", true);

        this.dragElement = dragElement;

        dragElement[0].ondragstart = function(){return false;};

        element.css("position", "absolute");

        if (o.dragArea === 'document' || o.dragArea === 'window') {
            o.dragArea = "body";
        }

        setImmediate(function(){
            that.dragArea = o.dragArea === 'parent' ? element.parent() : $(o.dragArea);
            if (o.dragArea !== 'parent') {
                element.appendTo(that.dragArea);
                element.css({
                    top: offset.top,
                    left: offset.left
                });
            }
        });

        if (!element.attr("id")) {
            element.attr("id", Utils.elementId("draggable"));
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, elem = this.elem, o = this.options;
        var position = {
            x: 0,
            y: 0
        };

        this.dragElement.on(Metro.events.startAll, function(e){

            var coord = o.dragArea !== "parent" ? element.offset() : element.position(),
                shiftX = Utils.pageXY(e).x - coord.left,
                shiftY = Utils.pageXY(e).y - coord.top;

            var moveElement = function(e){
                var top = Utils.pageXY(e).y - shiftY;
                var left = Utils.pageXY(e).x - shiftX;

                if (top < 0) top = 0;
                if (left < 0) left = 0;

                if (top > that.dragArea.outerHeight() - element.outerHeight()) top = that.dragArea.outerHeight() - element.outerHeight();
                if (left > that.dragArea.outerWidth() - element.outerWidth()) left = that.dragArea.outerWidth() - element.outerWidth();

                position.y = top;
                position.x = left;

                element.css({
                    left: left,
                    top: top
                });
            };


            if (element.data("canDrag") === false || Utils.exec(o.onCanDrag, [element]) !== true) {
                return ;
            }

            if (isTouch === false && e.which !== 1) {
                return ;
            }

            that.drag = true;

            that.backup.cursor = element.css("cursor");
            that.backup.zIndex = element.css("z-index");

            element.addClass("draggable");

            moveElement(e);

            Utils.exec(o.onDragStart, [position], element[0]);
            element.fire("dragstart", {
                position: position
            });

            $(document).on(Metro.events.moveAll, function(e){
                e.preventDefault();
                moveElement(e);
                Utils.exec(o.onDragMove, [position], elem);
                element.fire("dragmove", {
                    position: position
                });
                //e.preventDefault();
            }, {ns: that.id});

            $(document).on(Metro.events.stopAll, function(){
                element.css({
                    cursor: that.backup.cursor,
                    zIndex: that.backup.zIndex
                }).removeClass("draggable");

                if (that.drag) {
                    $(document).off(Metro.events.moveAll, {ns: that.id});
                    $(document).off(Metro.events.stopAll, {ns: that.id});
                }

                that.drag = false;
                that.move = false;

                Utils.exec(o.onDragStop, [position], elem);
                element.fire("dragstop", {
                    position: position
                });
            }, {ns: that.id});
        });
    },

    off: function(){
        this.element.data("canDrag", false);
    },

    on: function(){
        this.element.data("canDrag", true);
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element, o = this.options;
        this.dragElement.off(Metro.events.startAll);
        return element;
    }
};

Metro.plugin('draggable', Draggable);

var DropdownDefaultConfig = {
    dropFilter: null,
    toggleElement: null,
    noClose: false,
    duration: 100,
    onDrop: Metro.noop,
    onUp: Metro.noop,
    onDropdownCreate: Metro.noop
};

Metro.dropdownSetup = function (options) {
    DropdownDefaultConfig = $.extend({}, DropdownDefaultConfig, options);
};

if (typeof window["metroDropdownSetup"] !== undefined) {
    Metro.dropdownSetup(window["metroDropdownSetup"]);
}

var Dropdown = {
    init: function( options, elem ) {
        this.options = $.extend( {}, DropdownDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this._toggle = null;
        this.displayOrigin = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        Metro.checkRuntime(element, "dropdown");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onDropdownCreate, null, element);
        element.fire("dropdowncreate");

        if (element.hasClass("open")) {
            element.removeClass("open");
            setImmediate(function(){
                that.open(true);
            })
        }
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var toggle;
        toggle = o.toggleElement !== null ? $(o.toggleElement) : element.siblings('.dropdown-toggle').length > 0 ? element.siblings('.dropdown-toggle') : element.prev();

        this.displayOrigin = Utils.getStyleOne(element, "display");

        if (element.hasClass("v-menu")) {
            element.addClass("for-dropdown");
        }

        element.css("display", "none");

        this._toggle = toggle;
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var toggle = this._toggle, parent = element.parent();

        toggle.on(Metro.events.click, function(e){
            parent.siblings(parent[0].tagName).removeClass("active-container");
            $(".active-container").removeClass("active-container");

            if (element.css('display') !== 'none' && !element.hasClass('keep-open')) {
                that._close(element);
            } else {
                $('[data-role=dropdown]').each(function(i, el){
                    if (!element.parents('[data-role=dropdown]').is(el) && !$(el).hasClass('keep-open') && $(el).css('display') !== 'none') {
                        if (!Utils.isValue(o.dropFilter)) {
                            that._close(el);
                        } else {
                            if ($(el).closest(o.dropFilter).length > 0) {
                                that._close(el);
                            }
                        }
                    }
                });
                if (element.hasClass('horizontal')) {
                    element.css({
                        'visibility': 'hidden',
                        'display': 'block'
                    });
                    var children_width = 0;
                    $.each(element.children('li'), function(){
                        children_width += $(this).outerWidth(true);
                    });

                    element.css({
                        'visibility': 'visible',
                        'display': 'none'
                    });
                    element.css('width', children_width);
                }
                that._open(element);
                parent.addClass("active-container");
            }
            e.preventDefault();
            e.stopPropagation();
        });

        if (o.noClose === true) {
            element.addClass("keep-open").on(Metro.events.click, function (e) {
                //e.preventDefault();
                e.stopPropagation();
            });
        }

        $(element).find('li.disabled a').on(Metro.events.click, function(e){
            e.preventDefault();
        });
    },

    _close: function(el, immediate){
        el = $(el);

        var dropdown  = Metro.getPlugin(el, "dropdown");
        var toggle = dropdown._toggle;
        var options = dropdown.options;
        var func = "slideUp";

        toggle.removeClass('active-toggle').removeClass("active-control");
        dropdown.element.parent().removeClass("active-container");

        if (immediate) {
            func = 'hide'
        }

        el[func](immediate ? 0 : options.duration, function(){
            el.trigger("onClose", null, el);
        });

        Utils.exec(options.onUp, null, el[0]);
        el.fire("up");
    },

    _open: function(el, immediate){
        el = $(el);

        var dropdown  = Metro.getPlugin(el, "dropdown");
        var toggle = dropdown._toggle;
        var options = dropdown.options;
        var func = "slideDown";

        toggle.addClass('active-toggle').addClass("active-control");

        if (immediate) {
            func = 'show'
        }

        el[func](immediate ? 0 : options.duration, function(){
            el.fire("onopen");
        });

        Utils.exec(options.onDrop, null, el[0]);
        el.fire("drop");
    },

    close: function(immediate){
        this._close(this.element, immediate);
    },

    open: function(immediate){
        this._open(this.element, immediate);
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        this._toggle.off(Metro.events.click);
    }
};

$(document).on(Metro.events.click, function(){
    $('[data-role*=dropdown]').each(function(){
        var el = $(this);

        if (el.css('display')!=='none' && !el.hasClass('keep-open') && !el.hasClass('stay-open') && !el.hasClass('ignore-document-click')) {
            Metro.getPlugin(el, 'dropdown').close();
        }
    });
});

Metro.plugin('dropdown', Dropdown);

var FileDefaultConfig = {
    mode: "input",
    buttonTitle: "Choose file(s)",
    filesTitle: "file(s) selected",
    dropTitle: "<strong>Choose a file(s)</strong> or drop it here",
    dropIcon: "<span class='default-icon-upload'></span>",
    prepend: "",
    clsComponent: "",
    clsPrepend: "",
    clsButton: "",
    clsCaption: "",
    copyInlineStyles: true,
    onSelect: Metro.noop,
    onFileCreate: Metro.noop
};

Metro.fileSetup = function (options) {
    FileDefaultConfig = $.extend({}, FileDefaultConfig, options);
};

if (typeof window["metroFileSetup"] !== undefined) {
    Metro.fileSetup(window["metroFileSetup"]);
}

var File = {
    init: function( options, elem ) {
        this.options = $.extend( {}, FileDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element;

        Metro.checkRuntime(element, "file");

        this._createStructure();
        this._createEvents();
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var container = $("<label>").addClass((o.mode === "input" ? " file " : " drop-zone ") + element[0].className).addClass(o.clsComponent);
        var caption = $("<span>").addClass("caption").addClass(o.clsCaption);
        var files = $("<span>").addClass("files").addClass(o.clsCaption);
        var icon, button;


        container.insertBefore(element);
        element.appendTo(container);

        if (o.mode === "input") {
            caption.insertBefore(element);

            button = $("<span>").addClass("button").attr("tabindex", -1).html(o.buttonTitle);
            button.appendTo(container);
            button.addClass(o.clsButton);

            if (element.attr('dir') === 'rtl' ) {
                container.addClass("rtl");
            }

            if (o.prepend !== "") {
                var prepend = $("<div>").html(o.prepend);
                prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
            }
        } else {
            icon = $(o.dropIcon).addClass("icon").appendTo(container);
            caption.html(o.dropTitle).insertAfter(icon);
            files.html("0" + " " + o.filesTitle).insertAfter(caption);
        }

        element[0].className = '';

        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }

        Utils.exec(o.onFileCreate, null, element[0]);
        element.fire("filecreate");
    },

    _createEvents: function(){
        var element = this.element, o = this.options;
        var container = element.closest("label");
        var caption = container.find(".caption");
        var files = container.find(".files");

        container.on(Metro.events.click, "button", function(){
            element[0].click();
        });

        element.on(Metro.events.change, function(){
            var fi = this;
            var file_names = [];
            var entry;
            if (fi.files.length === 0) {
                return ;
            }

            Array.from(fi.files).forEach(function(file){
                file_names.push(file.name);
            });

            if (o.mode === "input") {

                entry = file_names.join(", ");

                caption.html(entry);
                caption.attr('title', entry);
            } else {
                files.html(element[0].files.length + " " +o.filesTitle);
            }

            Utils.exec(o.onSelect, [fi.files], element[0]);
            element.fire("select", {
                files: fi.files
            });
        });

        element.on(Metro.events.focus, function(){container.addClass("focused");});
        element.on(Metro.events.blur, function(){container.removeClass("focused");});

        if (o.mode !== "input") {
            container.on('drag dragstart dragend dragover dragenter dragleave drop', function(e){
                e.preventDefault();
            });

            container.on('dragenter dragover', function(){
                container.addClass("drop-on");
            });

            container.on('dragleave', function(){
                container.removeClass("drop-on");
            });

            container.on('drop', function(e){
                element[0].files = e.dataTransfer.files;
                files.html(element[0].files.length + " " +o.filesTitle);
                container.removeClass("drop-on");
                element.trigger("change");
            });
        }
    },

    clear: function(){
        var element = this.element;
        element.siblings(".caption").html("");
        element.val("");
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    toggleDir: function(){
        if (this.element.attr("dir") === 'rtl') {
            this.element.parent().addClass("rtl");
        } else {
            this.element.parent().removeClass("rtl");
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'dir': this.toggleDir(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var parent = element.parent();
        element.off(Metro.events.change);
        parent.off(Metro.events.click, "button");
        return element;
    }
};

Metro.plugin('file', File);

var GravatarDefaultConfig = {
    email: "",
    size: 80,
    default: "mp",
    onGravatarCreate: Metro.noop
};

Metro.gravatarSetup = function (options) {
    GravatarDefaultConfig = $.extend({}, GravatarDefaultConfig, options);
};

if (typeof window["metroGravatarSetup"] !== undefined) {
    Metro.bottomSheetSetup(window["metroGravatarSetup"]);
}

var Gravatar = {
    init: function( options, elem ) {
        this.options = $.extend( {}, GravatarDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        Metro.checkRuntime(this.element, "gravatar");
        this.get();
    },

    getImage: function(email, size, def, is_jquery_object){
        var image = $("<img>");
        image.attr("src", this.getImageSrc(email, size));
        return is_jquery_object === true ? image : image[0];
    },

    getImageSrc: function(email, size, def){
        if (email === undefined || email.trim() === '') {
            return "";
        }

        size = size || 80;
        def = Utils.encodeURI(def) || '404';

        return "//www.gravatar.com/avatar/" + Utils.md5((email.toLowerCase()).trim()) + '?size=' + size + '&d=' + def;
    },

    get: function(){
        var that = this, element = this.element, o = this.options;
        var img = element[0].tagName === 'IMG' ? element : element.find("img");
        if (img.length === 0) {
            return;
        }
        img.attr("src", this.getImageSrc(o.email, o.size, o.default));

        Utils.exec(o.onGravatarCreate, null, element[0]);
        element.fire("gravatarcreate");

        return this;
    },

    resize: function(new_size){
        this.options.size = new_size !== undefined ? new_size : this.element.attr("data-size");
        this.get();
    },

    email: function(new_email){
        this.options.email = new_email !== undefined ? new_email : this.element.attr("data-email");
        this.get();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-size': this.resize(); break;
            case 'data-email': this.email(); break;
        }
    },

    destroy: function(){
        return this.element;
    }
};

Metro.plugin('gravatar', Gravatar);

var HintDefaultConfig = {
    hintHide: 5000,
    clsHint: "",
    hintText: "",
    hintPosition: Metro.position.TOP,
    hintOffset: 4,
    onHintShow: Metro.noop,
    onHintHide: Metro.noop,
    onHintCreate: Metro.noop
};

Metro.hintSetup = function (options) {
    HintDefaultConfig = $.extend({}, HintDefaultConfig, options);
};

if (typeof window["metroHintSetup"] !== undefined) {
    Metro.hintSetup(window["metroHintSetup"]);
}

var Hint = {
    init: function( options, elem ) {
        this.options = $.extend( {}, HintDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.hint = null;
        this.hint_size = {
            width: 0,
            height: 0
        };

        this.id = Utils.elementId("hint");

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        Metro.checkRuntime(element, "hint");

        element.on(Metro.events.enter, function(){
            that.createHint();
            if (+o.hintHide > 0) {
                setTimeout(function(){
                    that.removeHint();
                }, o.hintHide);
            }
        });

        element.on(Metro.events.leave, function(){
            that.removeHint();
        });

        $(window).on(Metro.events.scroll+" "+Metro.events.resize, function(){
            if (that.hint !== null) that.setPosition();
        }, {ns: this.id});

        Utils.exec(o.onHintCreate, null, element[0]);
        element.fire("hintcreate");
    },

    createHint: function(){
        var elem = this.elem, element = this.element, o = this.options;
        var hint = $("<div>").addClass("hint").addClass(o.clsHint).html(o.hintText);

        this.hint = hint;
        this.hint_size = Utils.hiddenElementSize(hint);

        $(".hint:not(.permanent-hint)").remove();

        if (elem.tagName === 'TD' || elem.tagName === 'TH') {
            var wrp = $("<div/>").css("display", "inline-block").html(element.html());
            element.html(wrp);
            element = wrp;
        }

        this.setPosition();

        hint.appendTo($('body'));
        Utils.exec(o.onHintShow, [hint[0]], element[0]);
        element.fire("hintshow", {
            hint: hint[0]
        });
    },

    setPosition: function(){
        var hint = this.hint, hint_size = this.hint_size, o = this.options, element = this.element;

        if (o.hintPosition === Metro.position.BOTTOM) {
            hint.addClass('bottom');
            hint.css({
                top: element.offset().top - $(window).scrollTop() + element.outerHeight() + o.hintOffset,
                left: element.offset().left + element.outerWidth()/2 - hint_size.width/2  - $(window).scrollLeft()
            });
        } else if (o.hintPosition === Metro.position.RIGHT) {
            hint.addClass('right');
            hint.css({
                top: element.offset().top + element.outerHeight()/2 - hint_size.height/2 - $(window).scrollTop(),
                left: element.offset().left + element.outerWidth() - $(window).scrollLeft() + o.hintOffset
            });
        } else if (o.hintPosition === Metro.position.LEFT) {
            hint.addClass('left');
            hint.css({
                top: element.offset().top + element.outerHeight()/2 - hint_size.height/2 - $(window).scrollTop(),
                left: element.offset().left - hint_size.width - $(window).scrollLeft() - o.hintOffset
            });
        } else {
            hint.addClass('top');
            hint.css({
                top: element.offset().top - $(window).scrollTop() - hint_size.height - o.hintOffset,
                left: element.offset().left - $(window).scrollLeft() + element.outerWidth()/2 - hint_size.width/2
            });
        }
    },

    removeHint: function(){
        var that = this;
        var hint = this.hint;
        var element = this.element;
        var options = this.options;
        var timeout = options.onHintHide === Metro.noop ? 0 : 300;

        if (hint !== null) {

            Utils.exec(options.onHintHide, [hint[0]], element[0]);
            element.fire("hinthide", {
                hint: hint[0]
            });

            setTimeout(function(){
                hint.hide(0, function(){
                    hint.remove();
                    that.hint = null;
                });
            }, timeout);
        }
    },

    changeText: function(){
        this.options.hintText = this.element.attr("data-hint-text");
    },

    changeAttribute: function(attributeName){
        if (attributeName === "data-hint-text") {
            this.changeText();
        }
    },

    destroy: function(){
        var element = this.element;
        this.removeHint();
        element.off(Metro.events.enter + "-hint");
        element.off(Metro.events.leave + "-hint");
        $(window).off(Metro.events.scroll + "-hint");
    }
};

Metro.plugin('hint', Hint);

var Hotkey = {
    specialKeys: {
        8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
        20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
        37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
        96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
        104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
        112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
        120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 188: ",", 190: ".",
        191: "/", 224: "meta" },

    shiftNums: {
        "~":"`", "!":"1", "@":"2", "#":"3", "$":"4", "%":"5", "^":"6", "&":"7",
        "*":"8", "(":"9", ")":"0", "_":"-", "+":"=", ":":";", "\"":"'", "<":",",
        ">":".",  "?":"/",   "|":"\\"
    },

    shiftNumsInverse: {
        "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
        "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
        ".": ">",  "/": "?",  "\\": "|"
    },

    textAcceptingInputTypes: [
        "text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime",
        "datetime-local", "search", "color", "tel"
    ],

    getKey: function(e){
        var key, k = e.keyCode, char = String.fromCharCode( k ).toLowerCase();
        if( e.shiftKey ){
            key = Hotkey.shiftNums[ char ] ? Hotkey.shiftNums[ char ] : char;
        }
        else {
            key = Hotkey.specialKeys[ k ] === undefined
                ? char
                : Hotkey.specialKeys[ k ];
        }

        return Hotkey.getModifier(e).length ? Hotkey.getModifier(e).join("+") + "+" + key : key;
    },

    getModifier: function(e){
        var m = [];
        if (e.altKey) {m.push("alt");}
        if (e.ctrlKey) {m.push("ctrl");}
        if (e.shiftKey) {m.push("shift");}
        return m;
    }
};

$.fn.hotkey = function(key, fn){
    return this.each(function(){
        $(this).on(Metro.events.keyup+".hotkey-method-"+key, function(e){
            var _key = Hotkey.getKey(e);
            if (key === _key) Utils.exec(fn, [e, _key, key], this);
        })
    })
};

if (METRO_JQUERY && jquery_present) {
    jQuery.fn.hotkey = function(key, fn){
        return this.each(function(){
            $(this).on(Metro.events.keyup+".hotkey-method-"+key, function(e){
                var _key = Hotkey.getKey(e);
                if (key === _key) Utils.exec(fn, [e, _key, key], this);
            })
        })
    };
}


$(document).on(Metro.events.keyup + ".hotkey-data", function(e){
    var el, fn, key;

    if (
        (METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS && /textarea|input|select/i.test(e.target.nodeName)) ||
        (METRO_HOTKEYS_FILTER_CONTENT_EDITABLE && $(e.target).attr('contenteditable')) ||
        (METRO_HOTKEYS_FILTER_TEXT_INPUTS && Hotkey.textAcceptingInputTypes.indexOf(e.target.type) > -1)
    )
    {
        return;
    }

    key = Hotkey.getKey(e);

    if (Utils.keyInObject(Metro.hotkeys, key)) {
        el = Metro.hotkeys[key][0];
        fn = Metro.hotkeys[key][1];

        fn === false ? $(el).click() : Utils.exec(fn);
    }
});

// TODO add destroy

// TODO source as array, mode as array

var HtmlContainerDefaultConfig = {
    method: "get",
    htmlSource: null,
    requestData: null,
    requestOptions: null,
    insertMode: "replace", // replace, append, prepend
    onHtmlLoad: Metro.noop,
    onHtmlLoadFail: Metro.noop,
    onHtmlLoadDone: Metro.noop,
    onHtmlContainerCreate: Metro.noop
};

Metro.htmlContainerSetup = function (options) {
    HtmlContainerDefaultConfig = $.extend({}, HtmlContainerDefaultConfig, options);
};

if (typeof window["metroHtmlContainerSetup"] !== undefined) {
    Metro.htmlContainerSetup(window["metroHtmlContainerSetup"]);
}

var HtmlContainer = {
    init: function( options, elem ) {
        this.options = $.extend( {}, HtmlContainerDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.data = {};
        this.opt = {};
        this.htmlSource = '';

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "htmlcontainer");

        if (typeof o.requestData === 'string') {
            o.requestData = JSON.parse(o.requestData);
        }

        if (Utils.isObject(o.requestData)) {
            this.data = Utils.isObject(o.requestData);
        }

        if (typeof o.requestOptions === 'string') {
            o.requestOptions = JSON.parse(o.requestOptions);
        }

        if (Utils.isObject(o.requestOptions)) {
            this.opt = Utils.isObject(o.requestOptions);
        }

        o.method = o.method.toLowerCase();

        if (Utils.isValue(o.htmlSource)) {
            this.htmlSource = o.htmlSource;
            this._load();
        }

        Utils.exec(o.onHtmlContainerCreate, null, element[0]);
        element.fire("htmlcontainercreate");
    },

    _load: function(){
        var that = this, element = this.element, o = this.options;

        $[o.method](this.htmlSource, this.data, this.opt).then(function(data){
            switch (o.insertMode.toLowerCase()) {
                case "prepend": element.prepend(data); break;
                case "append": element.append(data); break;
                default: {
                    element.html(data);
                }
            }
            Utils.exec(o.onHtmlLoad, [data, o.htmlSource, that.data, that.opt], element[0]);
            element.fire("htmlload", {
                data: data,
                source: o.htmlSource,
                requestData: that.data,
                requestOptions: that.opt
            });
        }, function(xhr){
            Utils.exec(o.onHtmlLoadFail, [xhr], element[0]);
            element.fire("htmlloadfail", {
                xhr: xhr
            });
        });
    },

    load: function(source, data, opt){
        var o = this.options;

        if (source) {
            this.htmlSource = source;
        }

        if (data) {
            this.data = Utils.isObject(data);
        }

        if (opt) {
            this.opt = Utils.isObject(opt);
        }

        this._load();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeHTMLSource = function(){
            var html = element.attr("data-html-source");
            if (Utils.isNull(html)) {
                return ;
            }
            if (html.trim() === "") {
                element.html("");
            }
            o.htmlSource = html;
            that._load();
        };

        var changeInsertMode = function(){
            var attr = element.attr("data-insert-mode");
            if (Utils.isValue(attr)) {
                o.insertMode = attr;
            }
        };

        var changeRequestData = function(){
            var data = element.attr("data-request-data");
            that.load(o.htmlSource, data);
        };

        switch (attributeName) {
            case "data-html-source": changeHTMLSource(); break;
            case "data-insert-mode": changeInsertMode(); break;
            case "data-request-data": changeRequestData(); break;
        }
    },

    destroy: function(){}
};

Metro.plugin('htmlcontainer', HtmlContainer);

var ImageCompareDefaultConfig = {
    width: "100%",
    height: "auto",
    onResize: Metro.noop,
    onSliderMove: Metro.noop,
    onImageCompareCreate: Metro.noop
};

Metro.imageCompareSetup = function (options) {
    ImageCompareDefaultConfig = $.extend({}, ImageCompareDefaultConfig, options);
};

if (typeof window["metroImageCompareSetup"] !== undefined) {
    Metro.imageCompareSetup(window["metroImageCompareSetup"]);
}

var ImageCompare = {
    init: function( options, elem ) {
        this.options = $.extend( {}, ImageCompareDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "imagecompare");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onImageCompareCreate, null, element[0]);
        element.fire("imagecomparecreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var container, container_overlay, slider;
        var images, element_width, element_height;

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", Utils.elementId("image-compare"));
        }

        element.addClass("image-compare").css({
            width: o.width
        });

        element_width = element.width();

        switch (o.height) {
            case "16/9": element_height = Utils.aspectRatioH(element_width, o.height); break;
            case "21/9": element_height = Utils.aspectRatioH(element_width, o.height); break;
            case "4/3": element_height = Utils.aspectRatioH(element_width, o.height); break;
            case "auto": element_height = Utils.aspectRatioH(element_width, "16/9"); break;
            default: element_height = o.height;
        }

        element.css({
            height: element_height
        });

        container = $("<div>").addClass("image-container").appendTo(element);
        container_overlay = $("<div>").addClass("image-container-overlay").appendTo(element).css({
            width: element_width / 2
        });

        slider = $("<div>").addClass("image-slider").appendTo(element);
        slider.css({
            top: element_height / 2 - slider.height() / 2,
            left: element_width / 2 - slider.width() / 2
        });

        images = element.find("img");

        $.each(images, function(i, v){
            var img = $("<div>").addClass("image-wrapper");
            img.css({
                width: element_width,
                height: element_height,
                backgroundImage: "url("+this.src+")"
            });
            img.appendTo(i === 0 ? container : container_overlay);
        });
    },

    _createEvents: function(){
        var element = this.element, o = this.options;

        var overlay = element.find(".image-container-overlay");
        var slider = element.find(".image-slider");

        slider.on(Metro.events.startAll, function(e){
            var w = element.width();
            $(document).on(Metro.events.moveAll, function(e){
                var x = Utils.getCursorPositionX(element[0], e), left_pos;
                if (x < 0) x = 0;
                if (x > w) x = w;
                overlay.css({
                    width: x
                });
                left_pos = x - slider.width() / 2;
                slider.css({
                    left: left_pos
                });
                Utils.exec(o.onSliderMove, [x, left_pos], slider[0]);
                element.fire("slidermove", {
                    x: x,
                    l: left_pos
                });
            });
            $(document).on(Metro.events.stopAll, function(){
                $(document).off(Metro.events.moveAll);
                $(document).off(Metro.events.stopAll);
            })
        });

        $(window).on(Metro.events.resize, function(){
            var element_width = element.width(), element_height;

            if (o.width !== "100%") {
                return ;
            }

            switch (o.height) {
                case "16/9": element_height = Utils.aspectRatioH(element_width, o.height); break;
                case "21/9": element_height = Utils.aspectRatioH(element_width, o.height); break;
                case "4/3": element_height = Utils.aspectRatioH(element_width, o.height); break;
                case "auto": element_height = Utils.aspectRatioH(element_width, "16/9"); break;
                default: element_height = o.height;
            }

            element.css({
                height: element_height
            });

            $.each(element.find(".image-wrapper"), function(){
                $(this).css({
                    width: element_width,
                    height: element_height
                })
            });

            element.find(".image-container-overlay").css({
                width: element_width / 2
            });

            slider.css({
                top: element_height / 2 - slider.height() / 2,
                left: element_width / 2 - slider.width() / 2
            });

            Utils.exec(o.onResize, [element_width, element_height], element[0]);
            element.fire("comparerresize", {
                width: element_width,
                height: element_height
            });
        }, {ns: element.attr("id")});
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;

        element.off(Metro.events.start);
        $(window).off(Metro.events.resize, {ns: element.attr("id")});

        return element;
    }
};

Metro.plugin('imagecompare', ImageCompare);

var ImageMagnifierDefaultConfig = {
    width: "100%",
    height: "auto",
    lensSize: 100,
    lensType: "square", // square, circle
    magnifierZoom: 2,
    magnifierMode: "glass", // glass, zoom
    magnifierZoomElement: null,

    clsMagnifier: "",
    clsLens: "",
    clsZoom: "",

    onMagnifierMove: Metro.noop,
    onImageMagnifierCreate: Metro.noop
};

Metro.imageMagnifierSetup = function (options) {
    ImageMagnifierDefaultConfig = $.extend({}, ImageMagnifierDefaultConfig, options);
};

if (typeof window["metroImageMagnifierSetup"] !== undefined) {
    Metro.imageMagnifierSetup(window["metroImageMagnifierSetup"]);
}

var ImageMagnifier = {
    init: function( options, elem ) {
        this.options = $.extend( {}, ImageMagnifierDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.zoomElement = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "imagemagnifier");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onImageMagnifierCreate, null, element[0]);
        element.fire("imagemagnifiercreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var magnifier, element_width, element_height;
        var image = element.find("img");

        if (image.length === 0) {
            throw new Error("Image not defined");
        }

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", Utils.elementId("image-magnifier"));
        }

        element.addClass("image-magnifier").css({
            width: o.width
        }).addClass(o.clsMagnifier);

        element_width = element.width();

        switch (o.height) {
            case "16/9": element_height = Utils.aspectRatioH(element_width, o.height); break;
            case "21/9": element_height = Utils.aspectRatioH(element_width, o.height); break;
            case "4/3": element_height = Utils.aspectRatioH(element_width, o.height); break;
            case "auto": element_height = Utils.aspectRatioH(element_width, "16/9"); break;
            default: element_height = o.height;
        }

        element.css({
            height: element_height
        });

        var x = element_width / 2 - o.lensSize / 2;
        var y = element_height / 2 - o.lensSize / 2;

        if (o.magnifierMode === "glass") {

            magnifier = $("<div>").addClass("image-magnifier-glass").appendTo(element);
            magnifier.css({
                width: o.lensSize,
                height: o.lensSize,
                borderRadius: o.lensType !== "circle" ? 0 : "50%",
                top: y,
                left: x,
                backgroundImage: "url(" + image[0].src + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "-" + ((x * o.magnifierZoom) - o.lensSize / 4 + 4) + "px -" + ((y * o.magnifierZoom) - o.lensSize / 4 + 4) + "px",
                backgroundSize: (image[0].width * o.magnifierZoom) + "px " + (image[0].height * o.magnifierZoom) + "px"
            }).addClass(o.clsLens);

        } else {

            magnifier = $("<div>").addClass("image-magnifier-glass").appendTo(element);
            magnifier.css({
                width: o.lensSize,
                height: o.lensSize,
                borderRadius: 0,
                borderWidth: 1,
                top: y,
                left: x
            }).addClass(o.clsLens);

            if (!Utils.isValue(o.magnifierZoomElement) || $(o.magnifierZoomElement).length === 0) {
                this.zoomElement = $("<div>").insertAfter(element);
            } else {
                this.zoomElement = $(o.magnifierZoomElement);
            }

            var zoom_element_width = magnifier[0].offsetWidth * o.magnifierZoom;
            var zoom_element_height = magnifier[0].offsetHeight * o.magnifierZoom;
            var cx = zoom_element_width / o.lensSize;
            var cy = zoom_element_height / o.lensSize;

            this.zoomElement.css({
                width: zoom_element_width,
                height: zoom_element_height,
                backgroundImage: "url(" + image[0].src + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "-" + (x * cx) + "px -" + (y * cy) + "px",
                backgroundSize: (image[0].width * cx) + "px " + (image[0].height * cy) + "px"
            }).addClass(o.clsZoom);
        }
    },

    _createEvents: function(){
        var element = this.element, o = this.options;
        var glass = element.find(".image-magnifier-glass");
        var glass_size = glass[0].offsetWidth / 2;
        var image = element.find("img")[0];
        var zoomElement = this.zoomElement;
        var cx, cy;

        if (o.magnifierMode !== "glass") {
            cx = zoomElement[0].offsetWidth / glass_size / 2;
            cy = zoomElement[0].offsetHeight / glass_size / 2;

            zoomElement.css({
                backgroundSize: (image.width * cx) + "px " + (image.height * cy) + "px"
            });
        }

        var lens_move = function(pos){
            var x, y;
            var magic = 4, zoom = parseInt(o.magnifierZoom);

            if (o.magnifierMode === "glass") {

                x = pos.x;
                y = pos.y;

                if (x > image.width - (glass_size / zoom)) {
                    x = image.width - (glass_size / zoom);
                }
                if (x < glass_size / zoom) {
                    x = glass_size / zoom;
                }
                if (y > image.height - (glass_size / zoom)) {
                    y = image.height - (glass_size / zoom);
                }
                if (y < glass_size / zoom) {
                    y = glass_size / zoom;
                }

                glass.css({
                    top: y - glass_size,
                    left: x - glass_size,
                    backgroundPosition: "-" + ((x * zoom) - glass_size + magic) + "px -" + ((y * zoom) - glass_size + magic) + "px"
                });
            } else {

                x = pos.x - (glass_size);
                y = pos.y - (glass_size);

                if (x > image.width - glass_size * 2) {x = image.width - glass_size * 2;}
                if (x < 0) {x = 0;}
                if (y > image.height - glass_size * 2) {y = image.height - glass_size * 2;}
                if (y < 0) {y = 0;}

                glass.css({
                    top: y,
                    left: x
                });

                zoomElement.css({
                    backgroundPosition: "-" + (x * cx) + "px -" + (y * cy) + "px"
                });
            }
        };

        element.on(Metro.events.move, function(e){
            var pos = Utils.getCursorPosition(image, e);

            lens_move(pos);

            Utils.exec(o.onMagnifierMove, [pos, glass[0], zoomElement ? zoomElement[0] : undefined], element[0]);
            element.fire("magnifiermove", {
                pos: pos,
                glass: glass[0],
                zoomElement: zoomElement ? zoomElement[0] : undefined
            });

            e.preventDefault();
        });

        element.on(Metro.events.leave, function(){
            var x = element.width() / 2 - o.lensSize / 2;
            var y = element.height() / 2 - o.lensSize / 2;

            glass.animate({
                top: y, left: x
            });

            lens_move({
                x: x + o.lensSize / 2, y: y + o.lensSize / 2
            });
        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element;
        element.off(Metro.events.move);
        element.off(Metro.events.leave);
        return element;
    }
};

Metro.plugin('imagemagnifier', ImageMagnifier);

var InfoBoxDefaultConfig = {
    type: "",
    width: 480,
    height: "auto",
    overlay: true,
    overlayColor: '#000000',
    overlayAlpha: .5,
    autoHide: 0,
    removeOnClose: false,
    closeButton: true,
    clsBox: "",
    clsBoxContent: "",
    clsOverlay: "",
    onOpen: Metro.noop,
    onClose: Metro.noop,
    onInfoBoxCreate: Metro.noop
};

Metro.infoBoxSetup = function (options) {
    InfoBoxDefaultConfig = $.extend({}, InfoBoxDefaultConfig, options);
};

if (typeof window["metroInfoBoxSetup"] !== undefined) {
    Metro.infoBoxSetup(window["metroInfoBoxSetup"]);
}

var InfoBox = {
    init: function( options, elem ) {
        this.options = $.extend( {}, InfoBoxDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.overlay = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "infobox");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onInfoBoxCreate, null, element[0]);
        element.fire("infoboxcreate");
    },

    _overlay: function(){
        var that = this, element = this.element, o = this.options;

        var overlay = $("<div>");
        overlay.addClass("overlay").addClass(o.clsOverlay);

        if (o.overlayColor === 'transparent') {
            overlay.addClass("transparent");
        } else {
            overlay.css({
                background: Utils.hex2rgba(o.overlayColor, o.overlayAlpha)
            });
        }

        return overlay;
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var closer, content;

        if (o.overlay === true) {
            this.overlay = this._overlay();
        }

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("infobox"));
        }

        element.addClass("info-box").addClass(o.type).addClass(o.clsBox);

        closer = element.find("closer");
        if (closer.length === 0) {
            closer = $("<span>").addClass("button square closer");
            closer.appendTo(element);
        }

        if (o.closeButton !== true) {
            closer.hide();
        }

        content = element.find(".info-box-content");
        if (content.length > 0) {
            content.addClass(o.clsBoxContent);
        }

        element.css({
            width: o.width,
            height: o.height,
            visibility: "hidden",
            top: '100%',
            left: ( $(window).width() - element.outerWidth() ) / 2
        });

        element.appendTo($('body'));
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".closer", function(){
            that.close();
        });

        element.on(Metro.events.click, ".js-dialog-close", function(){
            that.close();
        });

        $(window).on(Metro.events.resize, function(){
            that.reposition();
        }, {ns: element.attr("id")});
    },

    _setPosition: function(){
        var element = this.element;
        element.css({
            top: ( $(window).height() - element.outerHeight() ) / 2,
            left: ( $(window).width() - element.outerWidth() ) / 2
        });
    },

    reposition: function(){
        this._setPosition();
    },

    setContent: function(c){
        var element = this.element;
        var content = element.find(".info-box-content");
        if (content.length === 0) {
            return ;
        }
        content.html(c);
        this.reposition();
    },

    setType: function(t){
        var element = this.element;
        element.removeClass("success info alert warning").addClass(t);
    },

    open: function(){
        var that = this, element = this.element, o = this.options;

        if (o.overlay === true) {
            this.overlay.appendTo($("body"));
        }

        this._setPosition();

        element.css({
            visibility: "visible"
        });

        Utils.exec(o.onOpen, null, element[0]);
        element.fire("open");

        element.data("open", true);
        if (parseInt(o.autoHide) > 0) {
            setTimeout(function(){
                that.close();
            }, parseInt(o.autoHide));
        }
    },

    close: function(){
        var element = this.element, o = this.options;

        if (o.overlay === true) {
            $('body').find('.overlay').remove();
        }

        element.css({
            visibility: "hidden",
            top: "100%"
        });

        Utils.exec(o.onClose, null, element[0]);
        element.fire("close");

        element.data("open", false);

        if (o.removeOnClose === true) {
            this.destroy();
            element.remove();
        }
    },

    isOpen: function(){
        return this.element.data("open") === true;
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;

        element.off("all");
        $(window).off(Metro.events.resize, {ns: element.attr("id")});

        return element;
    }
};

Metro.plugin('infobox', InfoBox);

Metro['infobox'] = {
    isInfoBox: function(el){
        return Utils.isMetroObject(el, "infobox");
    },

    open: function(el, c, t){
        var $$ = Utils.$();
        if (!this.isInfoBox(el)) {
            return false;
        }
        var ib = $$(el).data("infobox");
        if (c !== undefined) {
            ib.setContent(c);
        }
        if (t !== undefined) {
            ib.setType(t);
        }
        ib.open();
    },

    close: function(el){
        var $$ = Utils.$();
        if (!this.isInfoBox(el)) {
            return false;
        }
        var ib = $$(el).data("infobox");
        ib.close();
    },

    setContent: function(el, c){
        var $$ = Utils.$();
        if (!this.isInfoBox(el)) {
            return false;
        }

        if (c === undefined) {
            c = "";
        }

        var ib = $$(el).data("infobox");
        ib.setContent(c);
        ib.reposition();
    },

    setType: function(el, t){
        var $$ = Utils.$();
        if (!this.isInfoBox(el)) {
            return false;
        }

        var ib = $$(el).data("infobox");
        ib.setType(t);
        ib.reposition();
    },

    isOpen: function(el){
        var $$ = Utils.$();
        if (!this.isInfoBox(el)) {
            return false;
        }
        var ib = $$(el).data("infobox");
        return ib.isOpen();
    },

    create: function(c, t, o, open){
        var el, ib, box_type;

        box_type = t !== undefined ? t : "";

        el = $("<div>").appendTo($("body"));
        $("<div>").addClass("info-box-content").appendTo(el);

        var ib_options = $.extend({}, {
            removeOnClose: true,
            type: box_type
        }, (o !== undefined ? o : {}));

        ib_options._runtime = true;

        el.infobox(ib_options);

        ib = el.data('infobox');
        ib.setContent(c);
        if (open !== false) {
            ib.open();
        }

        return el;
    }
};

var MaterialInputDefaultConfig = {
    label: "",
    informer: "",
    icon: "",

    permanentLabel: false,

    clsComponent: "",
    clsInput: "",
    clsLabel: "",
    clsInformer: "",
    clsIcon: "",
    clsLine: "",

    onInputCreate: Metro.noop
};

Metro.materialInputSetup = function (options) {
    MaterialInputDefaultConfig = $.extend({}, MaterialInputDefaultConfig, options);
};

if (typeof window["metroMaterialInputSetup"] !== undefined) {
    Metro.materialInputSetup(window["metroMaterialInputSetup"]);
}

var MaterialInput = {
    init: function( options, elem ) {
        this.options = $.extend( {}, MaterialInputDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.history = [];
        this.historyIndex = -1;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "materialinput");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onInputCreate, null, element[0]);
        element.fire("inputcreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var container = $("<div>").addClass("input-material " + element[0].className);

        element[0].className = "";
        element.attr("autocomplete", "nope");

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        container.insertBefore(element);
        element.appendTo(container);

        if (Utils.isValue(o.label)) {
            $("<span>").html(o.label).addClass("label").addClass(o.clsLabel).insertAfter(element);
        }
        if (Utils.isValue(o.informer)) {
            $("<span>").html(o.informer).addClass("informer").addClass(o.clsInformer).insertAfter(element);
        }
        if (Utils.isValue(o.icon)) {
            container.addClass("with-icon");
            $("<span>").html(o.icon).addClass("icon").addClass(o.clsIcon).insertAfter(element);
        }

        container.append($("<hr>").addClass(o.clsLine));

        if (o.permanentLabel === true) {
            container.addClass("permanent-label");
        }

        container.addClass(o.clsComponent);
        element.addClass(o.clsInput);

        if (element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    _createEvents: function(){

    },

    clear: function(){
        this.element.val('');
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        if (attributeName === 'disabled') {
            this.toggleState();
        }
    },

    destroy: function(){
        var element = this.element;

        return element;
    }
};

Metro.plugin('materialinput', MaterialInput);

var InputDefaultConfig = {
    autocomplete: null,
    autocompleteDivider: ",",
    autocompleteListHeight: 200,

    history: false,
    historyPreset: "",
    historyDivider: "|",
    preventSubmit: false,
    defaultValue: "",
    size: "default",
    prepend: "",
    append: "",
    copyInlineStyles: true,
    searchButton: false,
    clearButton: true,
    revealButton: true,
    clearButtonIcon: "<span class='default-icon-cross'></span>",
    revealButtonIcon: "<span class='default-icon-eye'></span>",
    searchButtonIcon: "<span class='default-icon-search'></span>",
    customButtons: [],
    searchButtonClick: 'submit',

    clsComponent: "",
    clsInput: "",
    clsPrepend: "",
    clsAppend: "",
    clsClearButton: "",
    clsRevealButton: "",
    clsCustomButton: "",
    clsSearchButton: "",

    onHistoryChange: Metro.noop,
    onHistoryUp: Metro.noop,
    onHistoryDown: Metro.noop,
    onClearClick: Metro.noop,
    onRevealClick: Metro.noop,
    onSearchButtonClick: Metro.noop,
    onEnterClick: Metro.noop,
    onInputCreate: Metro.noop
};

Metro.inputSetup = function (options) {
    InputDefaultConfig = $.extend({}, InputDefaultConfig, options);
};

if (typeof window["metroInputSetup"] !== undefined) {
    Metro.inputSetup(window["metroInputSetup"]);
}

var Input = {
    init: function( options, elem ) {
        this.options = $.extend( {}, InputDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.history = [];
        this.historyIndex = -1;
        this.autocomplete = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "input");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onInputCreate, null, element[0]);

        element.fire("inputcreate");
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("input " + element[0].className);
        var buttons = $("<div>").addClass("button-group");
        var clearButton, revealButton, searchButton;

        if (Utils.isValue(o.historyPreset)) {
            $.each(Utils.strToArray(o.historyPreset, o.historyDivider), function(){
                that.history.push(this);
            });
            that.historyIndex = that.history.length - 1;
        }

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        buttons.appendTo(container);

        if (!Utils.isValue(element.val().trim())) {
            element.val(o.defaultValue);
        }

        if (o.clearButton === true && !element[0].readOnly) {
            clearButton = $("<button>").addClass("button input-clear-button").addClass(o.clsClearButton).attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.appendTo(buttons);
        }
        if (element.attr('type') === 'password' && o.revealButton === true) {
            revealButton = $("<button>").addClass("button input-reveal-button").addClass(o.clsRevealButton).attr("tabindex", -1).attr("type", "button").html(o.revealButtonIcon);
            revealButton.appendTo(buttons);
        }
        if (o.searchButton === true) {
            searchButton = $("<button>").addClass("button input-search-button").addClass(o.clsSearchButton).attr("tabindex", -1).attr("type", o.searchButtonClick === 'submit' ? "submit" : "button").html(o.searchButtonIcon);
            searchButton.appendTo(buttons);
        }

        if (Utils.isValue(o.prepend)) {
            var prepend = $("<div>").html(o.prepend);
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (Utils.isValue(o.append)) {
            var append = $("<div>").html(o.append);
            append.addClass("append").addClass(o.clsAppend).appendTo(container);
        }

        if (typeof o.customButtons === "string") {
            o.customButtons = Utils.isObject(o.customButtons);
        }

        if (typeof o.customButtons === "object" && Utils.objectLength(o.customButtons) > 0) {
            $.each(o.customButtons, function(){
                var item = this;
                var customButton = $("<button>");

                customButton
                    .addClass("button input-custom-button")
                    .addClass(o.clsCustomButton)
                    .addClass(item.cls)
                    .attr("tabindex", -1)
                    .attr("type", "button")
                    .html(item.html);

                customButton.data("action", item.onclick);

                customButton.appendTo(buttons);
            });
        }

        if (Utils.isValue(element.attr('data-exclaim'))) {
            container.attr('data-exclaim', element.attr('data-exclaim'));
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        container.addClass(o.clsComponent);
        element.addClass(o.clsInput);

        if (o.size !== "default") {
            container.css({
                width: o.size
            });
        }

        if (!Utils.isNull(o.autocomplete)) {

            var autocomplete_obj = Utils.isObject(o.autocomplete);

            if (autocomplete_obj !== false) {
                that.autocomplete = autocomplete_obj;
            } else {
                this.autocomplete = Utils.strToArray(o.autocomplete, o.autocompleteDivider);
            }
            $("<div>").addClass("autocomplete-list").css({
                maxHeight: o.autocompleteListHeight,
                display: "none"
            }).appendTo(container);
        }

        if (element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.closest(".input");
        var autocompleteList = container.find(".autocomplete-list");

        container.on(Metro.events.click, ".input-clear-button", function(){
            var curr = element.val();
            element.val(Utils.isValue(o.defaultValue) ? o.defaultValue : "").fire('clear').fire('change').fire('keyup').focus();
            if (autocompleteList.length > 0) {
                autocompleteList.css({
                    display: "none"
                })
            }
            Utils.exec(o.onClearClick, [curr, element.val()], element[0]);
            element.fire("clearclick", {
                prev: curr,
                val: element.val()
            });
        });

        container.on(Metro.events.click, ".input-reveal-button", function(){
            if (element.attr('type') === 'password') {
                element.attr('type', 'text');
            } else {
                element.attr('type', 'password');
            }

            Utils.exec(o.onRevealClick, [element.val()], element[0]);
            element.fire("revealclick", {
                val: element.val()
            });
        });

        container.on(Metro.events.click, ".input-search-button", function(){
            if (o.searchButtonClick !== 'submit') {
                Utils.exec(o.onSearchButtonClick, [element.val()], this);
                element.fire("searchbuttonclick", {
                    val: element.val(),
                    button: this
                });
            } else {
                this.form.submit();
            }
        });

        // container.on(Metro.events.stop, ".input-reveal-button", function(){
        //     element.attr('type', 'password').focus();
        // });

        container.on(Metro.events.click, ".input-custom-button", function(){
            var button = $(this);
            var action = button.data("action");
            Utils.exec(action, [element.val(), button], this);
        });

        element.on(Metro.events.keyup, function(e){
            var val = element.val().trim();

            if (o.history && e.keyCode === Metro.keyCode.ENTER && val !== "") {
                element.val("");
                that.history.push(val);
                that.historyIndex = that.history.length - 1;
                Utils.exec(o.onHistoryChange, [val, that.history, that.historyIndex], element[0]);
                element.fire("historychange", {
                    val: val,
                    history: that.history,
                    historyIndex: that.historyIndex
                });
                if (o.preventSubmit === true) {
                    e.preventDefault();
                }
            }

            if (o.history && e.keyCode === Metro.keyCode.UP_ARROW) {
                that.historyIndex--;
                if (that.historyIndex >= 0) {
                    element.val("");
                    element.val(that.history[that.historyIndex]);
                    Utils.exec(o.onHistoryDown, [element.val(), that.history, that.historyIndex], element[0]);
                    element.fire("historydown", {
                        val: element.val(),
                        history: that.history,
                        historyIndex: that.historyIndex
                    });
                } else {
                    that.historyIndex = 0;
                }
                e.preventDefault();
            }

            if (o.history && e.keyCode === Metro.keyCode.DOWN_ARROW) {
                that.historyIndex++;
                if (that.historyIndex < that.history.length) {
                    element.val("");
                    element.val(that.history[that.historyIndex]);
                    Utils.exec(o.onHistoryUp, [element.val(), that.history, that.historyIndex], element[0]);
                    element.fire("historyup", {
                        val: element.val(),
                        history: that.history,
                        historyIndex: that.historyIndex
                    });
                } else {
                    that.historyIndex = that.history.length - 1;
                }
                e.preventDefault();
            }
        });

        element.on(Metro.events.keydown, function(e){
            if (e.keyCode === Metro.keyCode.ENTER) {
                Utils.exec(o.onEnterClick, [element.val()], element[0]);
                element.fire("enterclick", {
                    val: element.val()
                });
            }
        });

        element.on(Metro.events.blur, function(){
            container.removeClass("focused");
        });

        element.on(Metro.events.focus, function(){
            container.addClass("focused");
        });

        element.on(Metro.events.input, function(){
            var val = this.value.toLowerCase();
            var items;

            if (autocompleteList.length === 0) {
                return;
            }

            autocompleteList.html("");

            items = that.autocomplete.filter(function(item){
                return item.toLowerCase().indexOf(val) > -1;
            });

            autocompleteList.css({
                display: items.length > 0 ? "block" : "none"
            });

            $.each(items, function(i, v){
                var index = v.toLowerCase().indexOf(val);
                var item = $("<div>").addClass("item").attr("data-autocomplete-value", v);
                var html;

                if (index === 0) {
                    html = "<strong>"+v.substr(0, val.length)+"</strong>"+v.substr(val.length);
                } else {
                    html = v.substr(0, index) + "<strong>"+v.substr(index, val.length)+"</strong>"+v.substr(index + val.length);
                }
                item.html(html).appendTo(autocompleteList);
            })
        });

        container.on(Metro.events.click, ".autocomplete-list .item", function(){
            element.val($(this).attr("data-autocomplete-value"));
            autocompleteList.css({
                display: "none"
            });
            element.trigger("change");
        });
    },

    getHistory: function(){
        return this.history;
    },

    getHistoryIndex: function(){
        return this.historyIndex;
    },

    setHistoryIndex: function(val){
        this.historyIndex = val >= this.history.length ? this.history.length - 1 : val;
    },

    setHistory: function(history, append) {
        var that = this, o = this.options;
        if (Utils.isNull(history)) return;
        if (!Array.isArray(history)) {
            history = Utils.strToArray(history, o.historyDivider);
        }
        if (append === true) {
            $.each(history, function () {
                that.history.push(this);
            })
        } else{
            this.history = history;
        }
        this.historyIndex = this.history.length - 1;
    },

    clear: function(){
        this.element.val('');
    },

    toDefault: function(){
        this.element.val(Utils.isValue(this.options.defaultValue) ? this.options.defaultValue : "");
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var parent = element.parent();
        var clearBtn = parent.find(".input-clear-button");
        var revealBtn = parent.find(".input-reveal-button");
        var customBtn = parent.find(".input-custom-button");

        if (clearBtn.length > 0) {
            clearBtn.off(Metro.events.click);
        }
        if (revealBtn.length > 0) {
            revealBtn.off(Metro.events.start);
            revealBtn.off(Metro.events.stop);
        }
        if (customBtn.length > 0) {
            clearBtn.off(Metro.events.click);
        }

        element.off(Metro.events.blur);
        element.off(Metro.events.focus);

        return element;
    }
};

Metro.plugin('input', Input);

$(document).on(Metro.events.click, function(){
    $('.input .autocomplete-list').hide();
});


var KeypadDefaultConfig = {
    keySize: 48,
    keys: "1, 2, 3, 4, 5, 6, 7, 8, 9, 0",
    copyInlineStyles: false,
    target: null,
    keyLength: 0,
    shuffle: false,
    shuffleCount: 3,
    position: Metro.position.BOTTOM_LEFT, //top-left, top, top-right, right, bottom-right, bottom, bottom-left, left
    dynamicPosition: false,
    serviceButtons: true,
    showValue: true,
    open: false,
    sizeAsKeys: false,

    clsKeypad: "",
    clsInput: "",
    clsKeys: "",
    clsKey: "",
    clsServiceKey: "",
    clsBackspace: "",
    clsClear: "",

    onChange: Metro.noop,
    onClear: Metro.noop,
    onBackspace: Metro.noop,
    onShuffle: Metro.noop,
    onKey: Metro.noop,
    onKeypadCreate: Metro.noop
};

Metro.keypadSetup = function (options) {
    KeypadDefaultConfig = $.extend({}, KeypadDefaultConfig, options);
};

if (typeof window["metroKeypadSetup"] !== undefined) {
    Metro.keypadSetup(window["metroKeypadSetup"]);
}

var Keypad = {
    init: function( options, elem ) {
        this.options = $.extend( {}, KeypadDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = "";
        this.positions = ["top-left", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left"];
        this.keypad = null;

        this._setOptionsFromDOM();

        this.keys = Utils.strToArray(this.options.keys, ",");
        this.keys_to_work = this.keys;

        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "keypad");

        this._createKeypad();
        if (o.shuffle === true) {
            this.shuffle();
        }
        this._createKeys();
        this._createEvents();

        Utils.exec(o.onKeypadCreate, null,element[0]);
        element.fire("keypadcreate");
    },

    _createKeypad: function(){
        var element = this.element, o = this.options;
        var parent = element.parent();
        var keypad, keys;

        if (parent.hasClass("input")) {
            keypad = parent;
        } else {
            keypad = $("<div>").addClass("input").addClass(element[0].className);
        }

        keypad.addClass("keypad");
        if (keypad.css("position") === "static" || keypad.css("position") === "") {
            keypad.css({
                position: "relative"
            });
        }

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        keypad.insertBefore(element);

        element.attr("readonly", true);
        element.appendTo(keypad);

        keys = $("<div>").addClass("keys").addClass(o.clsKeys);
        keys.appendTo(keypad);
        this._setKeysPosition();

        if (o.open === true) {
            keys.addClass("open keep-open");
        }


        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                keypad.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        element.addClass(o.clsInput);
        keypad.addClass(o.clsKeypad);

        element.on(Metro.events.blur, function(){keypad.removeClass("focused");});
        element.on(Metro.events.focus, function(){keypad.addClass("focused");});

        if (o.disabled === true || element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }

        this.keypad = keypad;
    },

    _setKeysPosition: function(){
        var element = this.element, o = this.options;
        var keypad = element.parent();
        var keys = keypad.find(".keys");
        keys.removeClass(this.positions.join(" ")).addClass(o.position)
    },

    _createKeys: function(){
        var element = this.element, o = this.options;
        var keypad = element.parent();
        var key, keys = keypad.find(".keys");
        var factor = Math.round(Math.sqrt(this.keys.length + 2));
        var key_size = o.keySize;
        var width;

        keys.html("");

        $.each(this.keys_to_work, function(){
            key = $("<span>").addClass("key").addClass(o.clsKey).html(this);
            key.data("key", this);
            key.css({
                width: o.keySize,
                height: o.keySize,
                lineHeight: o.keySize - 4
            }).appendTo(keys);
        });

        if (o.serviceButtons === true) {

            var service_keys = ['&larr;', '&times;'];

            $.each(service_keys, function () {
                key = $("<span>").addClass("key service-key").addClass(o.clsKey).addClass(o.clsServiceKey).html(this);
                if (this === '&larr;') {
                    key.addClass(o.clsBackspace);
                }
                if (this === '&times;') {
                    key.addClass(o.clsClear);
                }
                key.data("key", this);
                key.css({
                    width: o.keySize,
                    height: o.keySize,
                    lineHeight: o.keySize - 4
                }).appendTo(keys);
            });
        }

        width = factor * (key_size + 2) - 6;
        keys.outerWidth(width);

        if (o.sizeAsKeys === true && ['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right'].indexOf(o.position) !== -1) {
            keypad.outerWidth(keys.outerWidth());
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var keypad = element.parent();
        var keys = keypad.find(".keys");

        keys.on(Metro.events.click, ".key", function(e){
            var key = $(this);

            if (key.data('key') !== '&larr;' && key.data('key') !== '&times;') {

                if (o.keyLength > 0 && (String(that.value).length === o.keyLength)) {
                    return false;
                }

                that.value = that.value + "" + key.data('key');

                if (o.shuffle === true) {
                    that.shuffle();
                    that._createKeys();
                }

                if (o.dynamicPosition === true) {
                    o.position = that.positions[Utils.random(0, that.positions.length - 1)];
                    that._setKeysPosition();
                }

                Utils.exec(o.onKey, [key.data('key'), that.value], element[0]);
                element.fire("key", {
                    key: key.data("key"),
                    val: that.value
                });
            } else {
                if (key.data('key') === '&times;') {
                    that.value = "";
                    Utils.exec(o.onClear, null, element[0]);
                    element.fire("clear");
                }
                if (key.data('key') === '&larr;') {
                    that.value = (that.value.substring(0, that.value.length - 1));
                    Utils.exec(o.onBackspace, [that.value], element[0]);
                    element.fire("backspace");
                }
            }

            if (o.showValue === true) {
                if (element[0].tagName === "INPUT") {
                    element.val(that.value);
                } else {
                    element.text(that.value);
                }
            }

            element.trigger('change');
            Utils.exec(o.onChange, [that.value], element[0]);

            e.preventDefault();
            e.stopPropagation();
        });

        keypad.on(Metro.events.click, function(e){
            if (o.open === true) {
                return ;
            }

            if (keys.hasClass("open") === true) {
                keys.removeClass("open");
            } else {
                keys.addClass("open");
            }

            e.preventDefault();
            e.stopPropagation();
        });

        if (o.target !== null) {
            element.on(Metro.events.change, function(){
                var t = $(o.target);
                if (t.length === 0) {
                    return ;
                }
                if (t[0].tagName === "INPUT") {
                    t.val(that.value);
                } else {
                    t.text(that.value);
                }
            });
        }
    },

    shuffle: function(){
        var element = this.element, o = this.options;
        for (var i = 0; i < o.shuffleCount; i++) {
            this.keys_to_work = this.keys_to_work.shuffle();
        }
        Utils.exec(o.onShuffle, [this.keys_to_work, this.keys], element[0]);
        element.fire("shuffle", {
            keys: this.keys,
            keysToWork: this.keys_to_work
        });
    },

    shuffleKeys: function(count){
        if (count === undefined) {
            count = this.options.shuffleCount;
        }
        for (var i = 0; i < count; i++) {
            this.keys_to_work = this.keys_to_work.shuffle();
        }
        this._createKeys();
    },

    val: function(v){
        if (v !== undefined) {
            this.value = v;
            this.element[0].tagName === "INPUT" ? this.element.val(v) : this.element.text(v);
        } else {
            return this.value;
        }
    },

    open: function(){
        var element = this.element;
        var keypad = element.parent();
        var keys = keypad.find(".keys");

        keys.addClass("open");
    },

    close: function(){
        var element = this.element;
        var keypad = element.parent();
        var keys = keypad.find(".keys");

        keys.removeClass("open");
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    setPosition: function(pos){
        var new_position = pos !== undefined ? pos : this.element.attr("data-position");
        if (this.positions.indexOf(new_position) === -1) {
            return ;
        }
        this.options.position = new_position;
        this._setKeysPosition();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'data-position': this.setPosition(); break;
        }
    },

    destroy: function(){
        var element = this.element, keypad = this.keypad, keys = keypad.find(".keys");

        keypad.off(Metro.events.click);
        keys.off(Metro.events.click, ".key");
        element.off(Metro.events.change);

        return element;
    }
};

Metro.plugin('keypad', Keypad);

$(document).on(Metro.events.click, function(){
    var keypads = $(".keypad .keys");
    $.each(keypads, function(){
        if (!$(this).hasClass("keep-open")) {
            $(this).removeClass("open");
        }
    });
});


var ListDefaultConfig = {
    templateBeginToken: "<%",
    templateEndToken: "%>",
    paginationDistance: 5,
    paginationShortMode: true,
    thousandSeparator: ",",
    decimalSeparator: ",",
    sortTarget: "li",
    sortClass: null,
    sortDir: "asc",
    sortInitial: false,
    filterClass: null,
    filter: null,
    filterString: "",
    filters: null,
    source: null,
    showItemsSteps: false,
    showSearch: false,
    showListInfo: false,
    showPagination: false,
    showActivity: true,
    muteList: true,
    items: -1,
    itemsSteps: "all, 10,25,50,100",
    itemsAllTitle: "Show all",
    listItemsCountTitle: "Show entries:",
    listSearchTitle: "Search:",
    listInfoTitle: "Showing $1 to $2 of $3 entries",
    paginationPrevTitle: "Prev",
    paginationNextTitle: "Next",
    activityType: "cycle",
    activityStyle: "color",
    activityTimeout: 100,
    searchWrapper: null,
    rowsWrapper: null,
    infoWrapper: null,
    paginationWrapper: null,
    clsComponent: "",
    clsList: "",
    clsListItem: "",
    clsListTop: "",
    clsItemsCount: "",
    clsSearch: "",
    clsListBottom: "",
    clsListInfo: "",
    clsListPagination: "",
    clsPagination: "",
    onDraw: Metro.noop,
    onDrawItem: Metro.noop,
    onSortStart: Metro.noop,
    onSortStop: Metro.noop,
    onSortItemSwitch: Metro.noop,
    onSearch: Metro.noop,
    onRowsCountChange: Metro.noop,
    onDataLoad: Metro.noop,
    onDataLoaded: Metro.noop,
    onDataLoadError: Metro.noop,
    onFilterItemAccepted: Metro.noop,
    onFilterItemDeclined: Metro.noop,
    onListCreate: Metro.noop
};

Metro.listSetup = function (options) {
    ListDefaultConfig = $.extend({}, ListDefaultConfig, options);
};

if (typeof window["metroListSetup"] !== undefined) {
    Metro.listSetup(window["metroListSetup"]);
}

var List = {
    init: function( options, elem ) {
        this.options = $.extend( {}, ListDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.currentPage = 1;
        this.pagesCount = 1;
        this.filterString = "";
        this.data = null;
        this.activity = null;
        this.busy = false;
        this.filters = [];
        this.wrapperInfo = null;
        this.wrapperSearch = null;
        this.wrapperRows = null;
        this.wrapperPagination = null;
        this.filterIndex = null;
        this.filtersIndexes = [];
        this.itemTemplate = null;

        this.sort = {
            dir: "asc",
            colIndex: 0
        };

        this.header = null;
        this.items = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        Metro.checkRuntime(element, "list");

        if (o.source !== null) {
            Utils.exec(o.onDataLoad, [o.source], element[0]);
            element.fire("dataload", {
                source: o.source
            });


            $.json(o.source).then(function(data){
                Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
                element.fire("dataloaded", {
                    source: o.source,
                    data: data
                });
                that._build(data);
            }, function(xhr){
                Utils.exec(o.onDataLoadError, [o.source, xhr], element[0]);
                element.fire("dataloaderror", {
                    source: o.source,
                    xhr: xhr
                });
            });
        } else {
            that._build();
        }
    },

    _build: function(data){
        var element = this.element, o = this.options;

        if (Utils.isValue(data)) {
            this._createItemsFromJSON(data);
        } else {
            this._createItemsFromHTML()
        }

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onListCreate, null, element[0]);
        element.fire("listcreate");
    },

    _createItemsFromHTML: function(){
        var that = this, element = this.element, o = this.options;

        this.items = [];

        $.each(element.children(o.sortTarget), function(){
            that.items.push(this);
        });
    },

    _createItemsFromJSON: function(source){
        var that = this, o = this.options;

        this.items = [];

        if (Utils.isValue(source.template)) {
            this.itemTemplate = source.template;
        }

        if (Utils.isValue(source.header)) {
            this.header = source.header;
        }

        if (Utils.isValue(source.data)) {
            $.each(source.data, function(){
                var item, row = this;
                var li = document.createElement("li");

                if (!Utils.isValue(that.itemTemplate)) {
                    return ;
                }

                item = Metro.template(that.itemTemplate, row, {
                    beginToken: o.templateBeginToken,
                    endToken: o.templateEndToken
                });

                li.innerHTML = item;
                that.items.push(li);
            });
        }
    },

    _createTopBlock: function (){
        var that = this, element = this.element, o = this.options;
        var top_block = $("<div>").addClass("list-top").addClass(o.clsListTop).insertBefore(element);
        var search_block, search_input, rows_block, rows_select;

        search_block = Utils.isValue(this.wrapperSearch) ? this.wrapperSearch : $("<div>").addClass("list-search-block").addClass(o.clsSearch).appendTo(top_block);

        search_input = $("<input>").attr("type", "text").appendTo(search_block);
        search_input.input({
            prepend: o.listSearchTitle
        });

        if (o.showSearch !== true) {
            search_block.hide();
        }

        rows_block = Utils.isValue(this.wrapperRows) ? this.wrapperRows : $("<div>").addClass("list-rows-block").addClass(o.clsItemsCount).appendTo(top_block);

        rows_select = $("<select>").appendTo(rows_block);
        $.each(Utils.strToArray(o.itemsSteps), function () {
            var option = $("<option>").attr("value", this === "all" ? -1 : this).text(this === "all" ? o.itemsAllTitle : this).appendTo(rows_select);
            if (parseInt(this) === parseInt(o.items)) {
                option.attr("selected", "selected");
            }
        });
        rows_select.select({
            filter: false,
            prepend: o.listItemsCountTitle,
            onChange: function (val) {
                if (parseInt(val) === parseInt(o.items)) {
                    return;
                }
                o.items = parseInt(val);
                that.currentPage = 1;
                that._draw();
                Utils.exec(o.onRowsCountChange, [val], element[0]);
                element.fire("rowscountchange", {
                    val: val
                });
            }
        });

        if (o.showItemsSteps !== true) {
            rows_block.hide();
        }

        return top_block;
    },

    _createBottomBlock: function (){
        var element = this.element, o = this.options;
        var bottom_block = $("<div>").addClass("list-bottom").addClass(o.clsListBottom).insertAfter(element);
        var info, pagination;

        info = $("<div>").addClass("list-info").addClass(o.clsListInfo).appendTo(bottom_block);
        if (o.showListInfo !== true) {
            info.hide();
        }

        pagination = $("<div>").addClass("list-pagination").addClass(o.clsListPagination).appendTo(bottom_block);
        if (o.showPagination !== true) {
            pagination.hide();
        }

        return bottom_block;
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var list_component;
        var w_search = $(o.searchWrapper),
            w_info = $(o.infoWrapper),
            w_rows = $(o.rowsWrapper),
            w_paging = $(o.paginationWrapper);

        if (w_search.length > 0) {this.wrapperSearch = w_search;}
        if (w_info.length > 0) {this.wrapperInfo = w_info;}
        if (w_rows.length > 0) {this.wrapperRows = w_rows;}
        if (w_paging.length > 0) {this.wrapperPagination = w_paging;}

        if (!element.parent().hasClass("list-component")) {
            list_component = $("<div>").addClass("list-component").insertBefore(element);
            element.appendTo(list_component);
        } else {
            list_component = element.parent();
        }

        list_component.addClass(o.clsComponent);

        this.activity =  $("<div>").addClass("list-progress").appendTo(list_component);
        $("<div>").activity({
            type: o.activityType,
            style: o.activityStyle
        }).appendTo(this.activity);

        if (o.showActivity !== true) {
            this.activity.css({
                visibility: "hidden"
            })
        }

        // element.html("").addClass(o.clsList);
        element.addClass(o.clsList);

        this._createTopBlock();
        this._createBottomBlock();

        if (Utils.isValue(o.filterString)) {
            this.filterString = o.filterString;
        }

        var filter_func;

        if (Utils.isValue(o.filter)) {
            filter_func = Utils.isFunc(o.filter);
            if (filter_func === false) {
                filter_func = Utils.func(o.filter);
            }
            that.filterIndex = that.addFilter(filter_func);
        }

        if (Utils.isValue(o.filters)) {
            $.each(Utils.strToArray(o.filters), function(){
                filter_func = Utils.isFunc(this);
                if (filter_func !== false) {
                    that.filtersIndexes.push(that.addFilter(filter_func));
                }
            });
        }

        this.currentPage = 1;

        this.sorting(o.sortClass, o.sortDir, true);
    },

    _createEvents: function(){
        var that = this, element = this.element;
        var component = element.parent();
        var search = component.find(".list-search-block input");
        var customSearch;

        search.on(Metro.events.inputchange, function(){
            that.filterString = this.value.trim().toLowerCase();
            if (that.filterString[that.filterString.length - 1] === ":") {
                return ;
            }
            that.currentPage = 1;
            that._draw();
        });

        if (Utils.isValue(this.wrapperSearch)) {
            customSearch = this.wrapperSearch.find("input");
            if (customSearch.length > 0) {
                customSearch.on(Metro.events.inputchange, function(){
                    that.filterString = this.value.trim().toLowerCase();
                    if (that.filterString[that.filterString.length - 1] === ":") {
                        return ;
                    }
                    that.currentPage = 1;
                    that._draw();
                });
            }
        }

        function pageLinkClick(l){
            var link = $(l);
            var item = link.parent();

            if (item.hasClass("active")) {
                return ;
            }

            if (item.hasClass("service")) {
                if (link.data("page") === "prev") {
                    that.currentPage--;
                    if (that.currentPage === 0) {
                        that.currentPage = 1;
                    }
                } else {
                    that.currentPage++;
                    if (that.currentPage > that.pagesCount) {
                        that.currentPage = that.pagesCount;
                    }
                }
            } else {
                that.currentPage = link.data("page");
            }

            that._draw();
        }

        component.on(Metro.events.click, ".pagination .page-link", function(){
            pageLinkClick(this)
        });

        if (Utils.isValue(this.wrapperPagination)) {
            this.wrapperPagination.on(Metro.events.click, ".pagination .page-link", function(){
                pageLinkClick(this)
            });
        }
    },

    _info: function(start, stop, length){
        var element = this.element, o = this.options;
        var component = element.parent();
        var info = Utils.isValue(this.wrapperInfo) ? this.wrapperInfo : component.find(".list-info");
        var text;

        if (info.length === 0) {
            return ;
        }

        if (stop > length) {
            stop = length;
        }

        if (this.items.length === 0) {
            start = stop = length = 0;
        }

        text = o.listInfoTitle;
        text = text.replace("$1", start);
        text = text.replace("$2", stop);
        text = text.replace("$3", length);
        info.html(text);
    },

    _paging: function(length){
        var element = this.element, o = this.options;
        var component = element.parent();
        this.pagesCount = Math.ceil(length / o.items); // Костыль
        createPagination({
            length: length,
            rows: o.items,
            current: this.currentPage,
            target: Utils.isValue(this.wrapperPagination) ? this.wrapperPagination : component.find(".list-pagination"),
            claPagination: o.clsPagination,
            prevTitle: o.paginationPrevTitle,
            nextTitle: o.paginationNextTitle,
            distance: o.paginationShortMode === true ? o.paginationDistance : 0
        });
    },

    _filter: function(){
        var that = this,
            element = this.element,
            o = this.options,
            items, i, data, inset, c1, result;

        if (Utils.isValue(this.filterString) || this.filters.length > 0) {
            items = this.items.filter(function(item){
                data = "";

                if (Utils.isValue(o.filterClass)) {
                    inset = item.getElementsByClassName(o.filterClass);

                    if (inset.length > 0) for (i = 0; i < inset.length; i++) {
                        data += inset[i].textContent;
                    }
                } else {
                    data = item.textContent;
                }

                c1 = data.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim().toLowerCase();
                result = Utils.isValue(that.filterString) ? c1.indexOf(that.filterString) > -1 : true;

                if (result === true && that.filters.length > 0) {
                    for (i = 0; i < that.filters.length; i++) {
                        if (Utils.exec(that.filters[i], [item]) !== true) {
                            result = false;
                            break;
                        }
                    }
                }

                if (result) {
                    Utils.exec(o.onFilterItemAccepted, [item], element[0]);
                    element.fire("filteritemaccepted", {
                        item: item
                    });
                } else {
                    Utils.exec(o.onFilterItemDeclined, [item], element[0]);
                    element.fire("filteritemdeclined", {
                        item: item
                    });
                }

                return result;
            });

            Utils.exec(o.onSearch, [that.filterString, items], element[0]);
            element.fire("search", {
                search: that.filterString,
                items: items
            });
        } else {
            items = this.items;
        }

        return items;
    },

    _draw: function(cb){
        var element = this.element, o = this.options;
        var i;
        var start = o.items === -1 ? 0 : o.items * (this.currentPage - 1),
            stop = o.items === -1 ? this.items.length - 1 : start + o.items - 1;
        var items;

        items = this._filter();

        element.children(o.sortTarget).remove();

        for (i = start; i <= stop; i++) {
            if (Utils.isValue(items[i])) {
                $(items[i]).addClass(o.clsListItem).appendTo(element);
            }
            Utils.exec(o.onDrawItem, [items[i]], element[0]);
            element.fire("drawitem", {
                item: items[i]
            });
        }

        this._info(start + 1, stop + 1, items.length);
        this._paging(items.length);

        this.activity.hide();

        Utils.exec(o.onDraw, null, element[0]);
        element.fire("draw");

        if (cb !== undefined) {
            Utils.exec(cb, [element], element[0])
        }
    },

    _getItemContent: function(item){
        var o = this.options, $item = $(item);
        var i, inset, data;
        var format, formatMask = Utils.isValue($item.data("formatMask")) ? $item.data("formatMask") : null;

        if (Utils.isValue(o.sortClass)) {
            data = "";
            inset = $(item).find("."+o.sortClass);

            if (inset.length > 0) for (i = 0; i < inset.length; i++) {
                data += inset[i].textContent;
            }
            format = inset.length > 0 ? inset[0].getAttribute("data-format") : "";
        } else {
            data = item.textContent;
            format = item.getAttribute("data-format");
        }

        data = (""+data).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

        if (Utils.isValue(format)) {

            if (['number', 'int', 'integer', 'float', 'money'].indexOf(format) !== -1 && (o.thousandSeparator !== "," || o.decimalSeparator !== "." )) {
                data = Utils.parseNumber(data, o.thousandSeparator, o.decimalSeparator);
            }

            switch (format) {
                case "date": data = Utils.isValue(formatMask) ? data.toDate(formatMask) : new Date(data); break;
                case "number": data = Number(data); break;
                case "int":
                case "integer": data = parseInt(data); break;
                case "float": data = parseFloat(data); break;
                case "money": data = Utils.parseMoney(data); break;
                case "card": data = Utils.parseCard(data); break;
                case "phone": data = Utils.parsePhone(data); break;
            }
        }

        return data;
    },

    deleteItem: function(value){
        var i, deleteIndexes = [], item;
        var is_func = Utils.isFunc(value);

        for (i = 0; i < this.items.length; i++) {
            item = this.items[i];

            if (is_func) {
                if (Utils.exec(value, [item])) {
                    deleteIndexes.push(i);
                }
            } else {
                if (item.textContent.contains(value)) {
                    deleteIndexes.push(i);
                }
            }
        }

        this.items = Utils.arrayDeleteByMultipleKeys(this.items, deleteIndexes);

        return this;
    },

    draw: function(){
        return this._draw();
    },

    sorting: function(source, dir, redraw){
        var that = this, element = this.element, o = this.options;

        if (Utils.isValue(source)) {
            o.sortClass = source;
        }
        if (Utils.isValue(dir) && ["asc", "desc"].indexOf(dir) > -1) {
            o.sortDir= dir;
        }

        Utils.exec(o.onSortStart, [this.items], element[0]);
        element.fire("sortstart", {
            items: this.items
        });

        this.items.sort(function(a, b){
            var c1 = that._getItemContent(a);
            var c2 = that._getItemContent(b);
            var result = 0;

            if (c1 < c2) {
                result = o.sortDir === "asc" ? -1 : 1;
            }
            if (c1 > c2) {
                result = o.sortDir === "asc" ? 1 : -1;
            }

            if (result !== 0) {
                Utils.exec(o.onSortItemSwitch, [a, b, result], element[0]);
                element.fire("sortitemswitch", {
                    a: a,
                    b: b,
                    result: result
                });
            }

            return result;
        });

        Utils.exec(o.onSortStop, [this.items], element[0]);
        element.fire("sortstop", {
            items: this.items
        });

        if (redraw === true) {
            this._draw();
        }

        return this;
    },

    filter: function(val){
        this.filterString = val.trim().toLowerCase();
        this.currentPage = 1;
        this._draw();
    },

    loadData: function(source){
        var that = this, element = this.element, o = this.options;

        if (Utils.isValue(source) !== true) {
            return ;
        }

        o.source = source;

        Utils.exec(o.onDataLoad, [o.source], element[0]);
        element.fire("dataload", {
            source: o.source
        });

        $.json(o.source).then(function(data){
            Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
            element.fire("dataloaded", {
                source: o.source,
                data: data
            });

            that._createItemsFromJSON(data);

            element.html("");

            if (Utils.isValue(o.filterString)) {
                that.filterString = o.filterString;
            }

            var filter_func;

            if (Utils.isValue(o.filter)) {
                filter_func = Utils.isFunc(o.filter);
                if (filter_func === false) {
                    filter_func = Utils.func(o.filter);
                }
                that.filterIndex = that.addFilter(filter_func);
            }

            if (Utils.isValue(o.filters)) {
                $.each(Utils.strToArray(o.filters), function(){
                    filter_func = Utils.isFunc(this);
                    if (filter_func !== false) {
                        that.filtersIndexes.push(that.addFilter(filter_func));
                    }
                });
            }

            that.currentPage = 1;

            that.sorting(o.sortClass, o.sortDir, true);
        }, function(xhr){
            Utils.exec(o.onDataLoadError, [o.source, xhr], element[0]);
            element.fire("dataloaderror", {
                source: o.source,
                xhr: xhr
            });
        });
    },

    next: function(){
        if (this.items.length === 0) return ;
        this.currentPage++;
        if (this.currentPage > this.pagesCount) {
            this.currentPage = this.pagesCount;
            return ;
        }
        this._draw();
    },

    prev: function(){
        if (this.items.length === 0) return ;
        this.currentPage--;
        if (this.currentPage === 0) {
            this.currentPage = 1;
            return ;
        }
        this._draw();
    },

    first: function(){
        if (this.items.length === 0) return ;
        this.currentPage = 1;
        this._draw();
    },

    last: function(){
        if (this.items.length === 0) return ;
        this.currentPage = this.pagesCount;
        this._draw();
    },

    page: function(num){
        if (num <= 0) {
            num = 1;
        }

        if (num > this.pagesCount) {
            num = this.pagesCount;
        }

        this.currentPage = num;
        this._draw();
    },

    addFilter: function(f, redraw){
        var func = Utils.isFunc(f);
        if (func === false) {
            return ;
        }
        this.filters.push(func);

        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }

        return this.filters.length - 1;
    },

    removeFilter: function(key, redraw){
        Utils.arrayDeleteByKey(this.filters, key);
        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }
        return this;
    },

    removeFilters: function(redraw){
        this.filters = [];
        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }
    },

    getFilters: function(){
        return this.filters;
    },

    getFilterIndex: function(){
        return this.filterIndex;
    },

    getFiltersIndexes: function(){
        return this.filtersIndexes;
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeSortDir = function(){
            var dir = element.attr("data-sort-dir");
            if (!Utils.isValue(dir)) {
                return ;
            }
            o.sortDir = dir;
            that.sorting(o.sortClass, o.sortDir, true);
        };

        var changeSortClass = function(){
            var target = element.attr("data-sort-source");
            if (!Utils.isValue(target)) {
                return ;
            }
            o.sortClass = target;
            that.sorting(o.sortClass, o.sortDir, true);
        };

        var changeFilterString = function(){
            var filter = element.attr("data-filter-string");
            if (!Utils.isValue(target)) {
                return ;
            }
            o.filterString = filter;
            that.filter(o.filterString);
        };

        switch (attributeName) {
            case "data-sort-dir": changeSortDir(); break;
            case "data-sort-source": changeSortClass(); break;
            case "data-filter-string": changeFilterString(); break;
        }
    },

    destroy: function(){
        var that = this, element = this.element;
        var component = element.parent();
        var search = component.find(".list-search-block input");
        var customSearch;

        search.off(Metro.events.inputchange);
        if (Utils.isValue(this.wrapperSearch)) {
            customSearch = this.wrapperSearch.find("input");
            if (customSearch.length > 0) {
                customSearch.off(Metro.events.inputchange);
            }
        }

        component.off(Metro.events.click, ".pagination .page-link");

        if (Utils.isValue(this.wrapperPagination)) {
            this.wrapperPagination.off(Metro.events.click, ".pagination .page-link");
        }

        return element;
    }
};

Metro.plugin('list', List);

var ListViewDefaultConfig = {
    selectable: false,
    checkStyle: 1,
    duration: 100,
    view: Metro.listView.LIST,
    selectCurrent: true,
    structure: {},
    onNodeInsert: Metro.noop,
    onNodeDelete: Metro.noop,
    onNodeClean: Metro.noop,
    onCollapseNode: Metro.noop,
    onExpandNode: Metro.noop,
    onGroupNodeClick: Metro.noop,
    onNodeClick: Metro.noop,
    onListViewCreate: Metro.noop
};

Metro.listViewSetup = function (options) {
    ListViewDefaultConfig = $.extend({}, ListViewDefaultConfig, options);
};

if (typeof window["metroListViewSetup"] !== undefined) {
    Metro.listViewSetup(window["metroListViewSetup"]);
}

var ListView = {
    init: function( options, elem ) {
        this.options = $.extend( {}, ListViewDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "listview");

        this._createView();
        this._createEvents();

        Utils.exec(o.onListViewCreate, null, element[0]);
        element.fire("listviewcreate");
    },

    _createIcon: function(data){
        var icon, src;

        src = Utils.isTag(data) ? $(data) : $("<img>").attr("src", data);
        icon = $("<span>").addClass("icon");
        icon.html(src.outerHTML());

        return icon;
    },

    _createCaption: function(data){
        return $("<div>").addClass("caption").html(data);
    },

    _createContent: function(data){
        return $("<div>").addClass("content").html(data);
    },

    _createToggle: function(){
        return $("<span>").addClass("node-toggle");
    },

    _createNode: function(data){
        var that = this, o = this.options;
        var node;

        node = $("<li>");

        if (data.caption !== undefined || data.content !== undefined ) {
            var d = $("<div>").addClass("data");
            node.prepend(d);
            if (data.caption !== undefined) d.append(that._createCaption(data.caption));
            if (data.content !== undefined) d.append(that._createContent(data.content));
        }

        if (data.icon !== undefined) {
            node.prepend(this._createIcon(data.icon));
        }

        if (Utils.objectLength(o.structure) > 0) $.each(o.structure, function(key, val){
            if (data[key] !== undefined) {
                $("<div>").addClass("node-data item-data-"+key).addClass(data[val]).html(data[key]).appendTo(node);
            }
        });

        return node;
    },

    _createView: function(){
        var that = this, element = this.element, o = this.options;
        var nodes = element.find("li");
        var struct_length = Utils.objectLength(o.structure);

        element.addClass("listview");
        element.find("ul").addClass("listview");

        $.each(nodes, function(){
            var node = $(this);

            if (node.data("caption") !== undefined || node.data("content") !== undefined) {
                var data = $("<div>").addClass("data");
                node.prepend(data);
                if (node.data("caption") !== undefined) data.append(that._createCaption(node.data("caption")));
                if (node.data("content") !== undefined) data.append(that._createContent(node.data("content")));
            }

            if (node.data('icon') !== undefined) {
                node.prepend(that._createIcon(node.data('icon')));
            }

            if (node.children("ul").length > 0) {
                node.addClass("node-group");
                node.append(that._createToggle());
                if (node.data("collapsed") !== true) node.addClass("expanded");
            } else {
                node.addClass("node");
            }

            if (node.hasClass("node")) {
                var cb = $("<input type='checkbox' data-role='checkbox' data-style='"+o.checkStyle+"'>");
                cb.data("node", node);
                node.prepend(cb);
            }

            if (struct_length > 0) $.each(o.structure, function(key){
                if (node.data(key) !== undefined) {
                    $("<div>").addClass("node-data item-data-"+key).addClass(node.data(key)).html(node.data(key)).appendTo(node);
                }
            });
        });

        this.toggleSelectable();

        this.view(o.view);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".node", function(){
            var node = $(this);
            element.find(".node").removeClass("current");
            node.toggleClass("current");
            if (o.selectCurrent === true) {
                element.find(".node").removeClass("current-select");
                node.toggleClass("current-select");
            }
            Utils.exec(o.onNodeClick, [node], element[0]);
            element.fire("nodeclick", {
                node: node
            });
        });

        element.on(Metro.events.click, ".node-toggle", function(){
            var node = $(this).closest("li");
            that.toggleNode(node);
        });

        element.on(Metro.events.click, ".node-group > .data > .caption", function(){
            var node = $(this).closest("li");
            element.find(".node-group").removeClass("current-group");
            node.addClass("current-group");
            Utils.exec(o.onGroupNodeClick, [node], element[0]);
            element.fire("groupnodeclick", {
                node: node
            });
        });

        element.on(Metro.events.dblclick, ".node-group > .data > .caption", function(){
            var node = $(this).closest("li");
            that.toggleNode(node);
        });
    },

    view: function(v){
        var element = this.element, o = this.options;

        if (v === undefined) {
            return o.view;
        }

        o.view = v;

        $.each(Metro.listView, function(i, v){
            element.removeClass("view-"+v);
            element.find("ul").removeClass("view-"+v);
        });

        element.addClass("view-" + o.view);
        element.find("ul").addClass("view-" + o.view);
    },

    toggleNode: function(node){
        var element = this.element, o = this.options;
        var func;

        node=$(node);

        if (!node.hasClass("node-group")) {
            return ;
        }

        node.toggleClass("expanded");

        func = node.hasClass("expanded") !== true ? "slideUp" : "slideDown";
        Utils.exec(o.onCollapseNode, [node], element[0]);
        element.fire("collapsenode", {
            node: node
        });

        node.children("ul")[func](o.duration);
    },

    toggleSelectable: function(){
        var element = this.element, o = this.options;
        var func = o.selectable === true ? "addClass" : "removeClass";
        element[func]("selectable");
        element.find("ul")[func]("selectable");
    },

    add: function(node, data){
        var element = this.element, o = this.options;
        var target;
        var new_node;
        var toggle;

        if (node === null) {
            target = element;
        } else {

            node=$(node);

            if (!node.hasClass("node-group")) {
                return ;
            }

            target = node.children("ul");
            if (target.length === 0) {
                target = $("<ul>").addClass("listview").addClass("view-"+o.view).appendTo(node);
                toggle = this._createToggle();
                toggle.appendTo(node);
                node.addClass("expanded");
            }
        }

        new_node = this._createNode(data);

        new_node.addClass("node").appendTo(target);

        var cb = $("<input type='checkbox'>");
        cb.data("node", new_node);
        new_node.prepend(cb);
        Metro.makePlugin(cb, "checkbox", {});

        Utils.exec(o.onNodeInsert, [new_node, node, target], element[0]);
        element.fire("nodeinsert", {
            newNode: new_node,
            parentNode: node,
            list: target
        });

        return new_node;
    },

    addGroup: function(data){
        var element = this.element, o = this.options;
        var node;

        delete data['icon'];

        node = this._createNode(data);
        node.addClass("node-group").appendTo(element);
        node.append(this._createToggle());
        node.addClass("expanded");
        node.append($("<ul>").addClass("listview").addClass("view-"+o.view));

        Utils.exec(o.onNodeInsert, [node, null, element], element[0]);
        element.fire("nodeinsert", {
            newNode: node,
            parentNode: null,
            list: element
        });

        return node;
    },

    insertBefore: function(node, data){
        var element = this.element, o = this.options;
        var new_node, parent_node, list;

        node=$(node);

        if (!node.length) {return;}

        new_node = this._createNode(data);
        new_node.addClass("node").insertBefore(node);
        parent_node = new_node.closest(".node");
        list = new_node.closest("ul");

        Utils.exec(o.onNodeInsert, [new_node, parent_node, list], element[0]);
        element.fire("nodeinsert", {
            newNode: new_node,
            parentNode: parent_node,
            list: list
        });

        return new_node;
    },

    insertAfter: function(node, data){
        var element = this.element, o = this.options;
        var new_node, parent_node, list;

        node=$(node);

        if (!node.length) {return;}

        new_node = this._createNode(data);
        new_node.addClass("node").insertAfter(node);
        parent_node = new_node.closest(".node");
        list = new_node.closest("ul");

        Utils.exec(o.onNodeInsert, [new_node, parent_node, list], element[0]);
        element.fire("nodeinsert", {
            newNode: new_node,
            parentNode: parent_node,
            list: list
        });

        return new_node;
    },

    del: function(node){
        var element = this.element, o = this.options;

        node=$(node);

        if (!node.length) {return;}

        var parent_list = node.closest("ul");
        var parent_node = parent_list.closest("li");
        node.remove();
        if (parent_list.children().length === 0 && !parent_list.is(element)) {
            parent_list.remove();
            parent_node.removeClass("expanded");
            parent_node.children(".node-toggle").remove();
        }
        Utils.exec(o.onNodeDelete, [node], element[0]);
        element.fire("nodedelete", {
            node: node
        });
    },

    clean: function(node){
        var element = this.element, o = this.options;

        node=$(node);

        if (!node.length) {return;}

        node.children("ul").remove();
        node.removeClass("expanded");
        node.children(".node-toggle").remove();
        Utils.exec(o.onNodeClean, [node], element[0]);
        element.fire("nodeclean", {
            node: node
        });
    },

    getSelected: function(){
        var element = this.element;
        var nodes = [];

        $.each(element.find(":checked"), function(){
            var check = $(this);
            nodes.push(check.closest(".node")[0])
        });

        return nodes;
    },

    clearSelected: function(){
        this.element.find(":checked").prop("checked", false);
        this.element.trigger('change');
    },

    selectAll: function(mode){
        this.element.find(".node > .checkbox input").prop("checked", mode !== false);
        this.element.trigger('change');
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeView = function(){
            var new_view = "view-"+element.attr("data-view");
            that.view(new_view);
        };

        var changeSelectable = function(){
            o.selectable = JSON.parse(element.attr("data-selectable")) === true;
            that.toggleSelectable();
        };

        switch (attributeName) {
            case "data-view": changeView(); break;
            case "data-selectable": changeSelectable(); break;
        }
    },

    destroy: function(){
        var element = this.element;

        element.off(Metro.events.click, ".node");
        element.off(Metro.events.click, ".node-toggle");
        element.off(Metro.events.click, ".node-group > .data > .caption");
        element.off(Metro.events.dblclick, ".node-group > .data > .caption");

        return element;
    }
};

Metro.plugin('listview', ListView);

var MasterDefaultConfig = {
    effect: "slide", // slide, fade, switch, slowdown, custom
    effectFunc: "linear",
    duration: METRO_ANIMATION_DURATION,

    controlPrev: "<span class='default-icon-left-arrow'></span>",
    controlNext: "<span class='default-icon-right-arrow'></span>",
    controlTitle: "Master, page $1 of $2",
    backgroundImage: "",

    clsMaster: "",
    clsControls: "",
    clsControlPrev: "",
    clsControlNext: "",
    clsControlTitle: "",
    clsPages: "",
    clsPage: "",

    onBeforePage: Metro.noop_true,
    onBeforeNext: Metro.noop_true,
    onBeforePrev: Metro.noop_true,
    onNextPage: Metro.noop,
    onPrevPage: Metro.noop,
    onMasterCreate: Metro.noop
};

Metro.masterSetup = function (options) {
    MasterDefaultConfig = $.extend({}, MasterDefaultConfig, options);
};

if (typeof window["metroMasterSetup"] !== undefined) {
    Metro.masterSetup(window["metroMasterSetup"]);
}

var Master = {
    init: function( options, elem ) {
        this.options = $.extend( {}, MasterDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.pages = [];
        this.currentIndex = 0;
        this.isAnimate = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "master");

        element.addClass("master").addClass(o.clsMaster);
        element.css({
            backgroundImage: "url("+o.backgroundImage+")"
        });

        this._createControls();
        this._createPages();
        this._createEvents();

        Utils.exec(o.onMasterCreate, null, element[0]);
        element.fire("mastercreate");
    },

    _createControls: function(){
        var element = this.element, o = this.options;
        var controls_position = ['top', 'bottom'];
        var controls, title, pages = element.find(".page");

        title = String(o.controlTitle).replace("$1", "1");
        title = String(title).replace("$2", pages.length);

        $.each(controls_position, function(){
            controls = $("<div>").addClass("controls controls-"+this).addClass(o.clsControls).appendTo(element);
            $("<span>").addClass("prev").addClass(o.clsControlPrev).html(o.controlPrev).appendTo(controls);
            $("<span>").addClass("next").addClass(o.clsControlNext).html(o.controlNext).appendTo(controls);
            $("<span>").addClass("title").addClass(o.clsControlTitle).html(title).appendTo(controls);
        });

        this._enableControl("prev", false);
    },

    _enableControl: function(type, state){
        var control = this.element.find(".controls ." + type);
        if (state === true) {
            control.removeClass("disabled");
        } else {
            control.addClass("disabled");
        }
    },

    _setTitle: function(){
        var title = this.element.find(".controls .title");

        var title_str = this.options.controlTitle.replace("$1", this.currentIndex + 1);
        title_str = title_str.replace("$2", String(this.pages.length));

        title.html(title_str);
    },

    _createPages: function(){
        var that = this, element = this.element, o = this.options;
        var pages = element.find(".pages");
        var page = element.find(".page");

        if (pages.length === 0) {
            pages = $("<div>").addClass("pages").appendTo(element);
        }

        pages.addClass(o.clsPages);

        $.each(page, function(){
            var p = $(this);
            if (p.data("cover") !== undefined) {
                element.css({
                    backgroundImage: "url("+p.data('cover')+")"
                });
            } else {
                element.css({
                    backgroundImage: "url("+o.backgroundImage+")"
                });
            }

            p.css({
                left: "100%"
            });

            p.addClass(o.clsPage).hide(0);

            that.pages.push(p);
        });

        page.appendTo(pages);

        this.currentIndex = 0;
        if (this.pages[this.currentIndex] !== undefined) {
            if (this.pages[this.currentIndex].data("cover") !== undefined ) {
                element.css({
                    backgroundImage: "url("+this.pages[this.currentIndex].data('cover')+")"
                });
            }
            this.pages[this.currentIndex].css("left", "0").show(0);
            setTimeout(function(){
                pages.css({
                    height: that.pages[0].outerHeight(true) + 2
                });
            }, 0);
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".controls .prev", function(){
            if (that.isAnimate === true) {
                return ;
            }
            if (
                Utils.exec(o.onBeforePrev, [that.currentIndex, that.pages[that.currentIndex], element]) === true &&
                Utils.exec(o.onBeforePage, ["prev", that.currentIndex, that.pages[that.currentIndex], element]) === true
            ) {
                that.prev();
            }
        });

        element.on(Metro.events.click, ".controls .next", function(){
            if (that.isAnimate === true) {
                return ;
            }
            if (
                Utils.exec(o.onBeforeNext, [that.currentIndex, that.pages[that.currentIndex], element]) === true &&
                Utils.exec(o.onBeforePage, ["next", that.currentIndex, that.pages[that.currentIndex], element]) === true
            ) {
                that.next();
            }
        });

        $(window).on(Metro.events.resize, function(){
            element.find(".pages").height(that.pages[that.currentIndex].outerHeight(true) + 2);
        }, {ns: element.attr("id")});
    },

    _slideToPage: function(index){
        var current, next, to;

        if (this.pages[index] === undefined) {
            return ;
        }

        if (this.currentIndex === index) {
            return ;
        }

        to = index > this.currentIndex ? "next" : "prev";
        current = this.pages[this.currentIndex];
        next = this.pages[index];

        this.currentIndex = index;

        this._effect(current, next, to);
    },

    _slideTo: function(to){
        var element = this.element, o = this.options;
        var current, next, forward = to.toLowerCase() === 'next';

        current = this.pages[this.currentIndex];

        if (forward ) {
            if (this.currentIndex + 1 >= this.pages.length) {
                return ;
            }
            this.currentIndex++;
        } else {
            if (this.currentIndex - 1 < 0) {
                return ;
            }
            this.currentIndex--;
        }

        next = this.pages[this.currentIndex];

        Utils.exec(forward ? o.onNextPage : o.onPrevPage, [current, next], element[0]);
        element.fire(forward ? "nextpage" : "prevpage", {
            current: current,
            next: next,
            forward: forward
        });

        this._effect(current, next, to);
    },

    _effect: function(current, next, to){
        var that = this, element = this.element, o = this.options;
        var out = element.width();
        var pages = element.find(".pages");

        this._setTitle();

        if (this.currentIndex === this.pages.length - 1) {
            this._enableControl("next", false);
        } else {
            this._enableControl("next", true);
        }

        if (this.currentIndex === 0) {
            this._enableControl("prev", false);
        } else {
            this._enableControl("prev", true);
        }

        this.isAnimate = true;

        setTimeout(function(){
            pages.animate({
                height: next.outerHeight(true) + 2
            });
        },0);

        pages.css("overflow", "hidden");

        function finish(){
            if (next.data("cover") !== undefined) {
                element.css({
                    backgroundImage: "url("+next.data('cover')+")"
                });
            } else {
                element.css({
                    backgroundImage: "url("+o.backgroundImage+")"
                });
            }
            pages.css("overflow", "initial");
            that.isAnimate = false;
        }

        function _slide(){
            current.stop(true).animate({
                left: to === "next" ? -out : out
            }, o.duration, o.effectFunc, function(){
                current.hide(0);
            });

            next.stop(true).css({
                left: to === "next" ? out : -out
            }).show(0).animate({
                left: 0
            }, o.duration, o.effectFunc, function(){
                finish();
            });
        }

        function _switch(){
            current.hide();

            next.css({
                top: 0,
                left: 0,
                opacity: 0
            }).show(function(){
                finish();
            });
        }

        function _fade(){
            current.fadeOut(o.duration);

            next.css({
                top: 0,
                left: 0,
                opacity: 0
            }).fadeIn(o.duration, "linear", function(){
                finish();
            });
        }

        switch (o.effect) {
            case "fade": _fade(); break;
            case "switch": _switch(); break;
            default: _slide();
        }
    },

    toPage: function(index){
        this._slideToPage(index);
    },

    next: function(){
        this._slideTo("next");
    },

    prev: function(){
        this._slideTo("prev");
    },

    changeEffect: function(){
        this.options.effect = this.element.attr("data-effect");
    },

    changeEffectFunc: function(){
        this.options.effectFunc = this.element.attr("data-effect-func");
    },

    changeEffectDuration: function(){
        this.options.duration = this.element.attr("data-duration");
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-effect": this.changeEffect(); break;
            case "data-effect-func": this.changeEffectFunc(); break;
            case "data-duration": this.changeEffectDuration(); break;
        }
    },

    destroy: function(){
        var element = this.element;

        element.off(Metro.events.click, ".controls .prev");
        element.off(Metro.events.click, ".controls .next");
        $(window).off(Metro.events.resize,{ns: element.attr("id")});

        return element;
    }
};

Metro.plugin('master', Master);

var NavigationViewDefaultConfig = {
    compact: "md",
    expand: "lg",
    toggle: null,
    activeState: false,
    onMenuItemClick: Metro.noop,
    onNavViewCreate: Metro.noop
};

Metro.navigationViewSetup = function (options) {
    NavigationViewDefaultConfig = $.extend({}, NavigationViewDefaultConfig, options);
};

if (typeof window["metroNavigationViewSetup"] !== undefined) {
    Metro.navigationViewSetup(window["metroNavigationSetup"]);
}

var NavigationView = {
    init: function( options, elem ) {
        this.options = $.extend( {}, NavigationViewDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.pane = null;
        this.content = null;
        this.paneToggle = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "navview");

        this._createView();
        this._createEvents();

        Utils.exec(o.onNavViewCreate, null, element[0]);
        element.fire("navviewcreate");
    },

    _calcMenuHeight: function(){
        var element = this.element, pane, menu;
        var elements_height = 0;

        pane = element.children(".navview-pane");
        if (pane.length === 0) {
            return;
        }

        menu = pane.children(".navview-menu");

        if (menu.length === 0) {
            return ;
        }

        $.each(menu.prevAll(), function(){
            elements_height += $(this).outerHeight(true);
        });
        $.each(menu.nextAll(), function(){
            elements_height += $(this).outerHeight(true);
        });
        menu.css({
            height: "calc(100% - "+(elements_height + 20)+"px)"
        });
    },

    _createView: function(){
        var that = this, element = this.element, o = this.options;
        var pane, content, toggle;

        if (!element.attr("id")) {
            element.attr("id", Utils.elementId("navview"));
        }

        element
            .addClass("navview")
            .addClass(o.compact !== false ? "navview-compact-"+o.compact : "")
            .addClass(o.expand !== false ? "navview-expand-"+o.expand : "");

        pane = element.children(".navview-pane");
        content = element.children(".navview-content");
        toggle = $(o.toggle);

        this._calcMenuHeight();

        this.pane = pane.length > 0 ? pane : null;
        this.content = content.length > 0 ? content : null;
        this.paneToggle = toggle.length > 0 ? toggle : null;

        setTimeout(function(){
            if (that.pane.width() === 48) {
                element.addClass("js-compact");
            } else {
                element.removeClass("js-compact");
            }
        }, 200);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".pull-button, .holder", function(){
            that.pullClick(this);
        });

        element.on(Metro.events.click, ".navview-menu li", function(){
            if (o.activeState === true) {
                element.find(".navview-menu li").removeClass("active");
                $(this).toggleClass("active");
            }
        });

        element.on(Metro.events.click, ".navview-menu li > a", function(){
            Utils.exec(o.onMenuItemClick, null, this);
            element.fire("menuitemclick", {
                item: this
            });
        });

        if (this.paneToggle !== null) {
            this.paneToggle.on(Metro.events.click, function(){
                that.pane.toggleClass("open");
            })
        }

        $(window).on(Metro.events.resize, function(){

            element.removeClass("expanded");
            that.pane.removeClass("open");

            if ($(this).width() <= Metro.media_sizes[String(o.compact).toUpperCase()]) {
                element.removeClass("compacted");
            }

            that._calcMenuHeight();

            element.removeClass("js-compact");

            setTimeout(function(){
                if (that.pane.width() === 48) {
                    element.addClass("js-compact");
                }
            }, 200);

        }, {ns: element.attr("id")})
    },

    pullClick: function(el){
        var that = this, element = this.element;
        var pane = this.pane;
        var pane_compact = pane.width() < 280;
        var input;

        var target = $(el);

        if (target && target.hasClass("holder")) {
            input = target.parent().find("input");
            setTimeout(function(){
                input.focus();
            }, 200);
        }

        if (that.pane.hasClass("open")) {
            that.close();
        } else

        if ((pane_compact || element.hasClass("expanded")) && !element.hasClass("compacted")) {
            element.toggleClass("expanded");
        } else

        if (element.hasClass("compacted") || !pane_compact) {
            element.toggleClass("compacted");
        }

        setTimeout(function(){
            if (that.pane.width() === 48) {
                element.addClass("js-compact");
            } else {
                element.removeClass("js-compact");
            }
        }, 200);

        return true;
    },

    open: function(){
        this.pane.addClass("open");
    },

    close: function(){
        this.pane.removeClass("open");
    },

    toggle: function(){
        var pane = this.pane;
        pane.hasClass("open") ? pane.removeClass("open") : pane.addClass("open");
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;

        element.off(Metro.events.click, ".pull-button, .holder");
        element.off(Metro.events.click, ".navview-menu li");
        element.off(Metro.events.click, ".navview-menu li > a");

        if (this.paneToggle !== null) {
            this.paneToggle.off(Metro.events.click);
        }

        $(window).off(Metro.events.resize,{ns: element.attr("id")});

        return element;
    }
};

Metro.plugin('navview', NavigationView);

var NotifyDefaultConfig = {
    container: null,
    width: 220,
    timeout: METRO_TIMEOUT,
    duration: METRO_ANIMATION_DURATION,
    distance: "100vh",
    animation: "linear",
    onClick: Metro.noop,
    onClose: Metro.noop,
    onShow: Metro.noop,
    onAppend: Metro.noop,
    onNotifyCreate: Metro.noop

};

Metro.notifySetup = function(options){
    NotifyDefaultConfig = $.extend({}, NotifyDefaultConfig, options);
};

if (typeof window["metroNotifySetup"] !== undefined) {
    Metro.notifySetup(window["metroNotifySetup"]);
}

var Notify = {

    container: null,

    options: {
    },

    notifies: [],

    setup: function(options){
        this.options = $.extend({}, NotifyDefaultConfig, options);

        if (Notify.container === null) {
            Notify.container = Notify._createContainer();
        }

        return this;
    },

    reset: function(){
        var reset_options = {
            width: 220,
            timeout: METRO_TIMEOUT,
            duration: METRO_ANIMATION_DURATION,
            distance: "100vh",
            animation: "linear"
        };
        this.options = $.extend({}, NotifyDefaultConfig, reset_options);
    },

    _createContainer: function(){

        var container = $("<div>").addClass("notify-container");
        $("body").prepend(container);

        return container;
    },

    create: function(message, title, options){
        var notify, that = this, o = this.options;
        var m, t, id = Utils.elementId("notify");

        if (Utils.isNull(options)) {
            options = {};
        }

        if (!Utils.isValue(message)) {
            return false;
        }

        notify = $("<div>").addClass("notify").attr("id", id);
        notify.css({
            width: o.width
        });

        if (title) {
            t = $("<div>").addClass("notify-title").html(title);
            notify.prepend(t);
        }
        m = $("<div>").addClass("notify-message").html(message);
        m.appendTo(notify);

        // Set options
        /*
        * keepOpen, cls, width, callback
        * */
        if (options !== undefined) {
            if (options.cls !== undefined) {
                notify.addClass(options.cls);
            }
            if (options.width !== undefined) {
                notify.css({
                    width: options.width
                });
            }
        }

        notify.on(Metro.events.click, function(){
            Utils.exec(Utils.isValue(options.onClick) ? options.onClick : o.onClick, null, this);
            that.kill($(this).closest(".notify"), Utils.isValue(options.onClose) ? options.onClose : o.onClose);
        });

        // Show
        if (Notify.container === null) {
            Notify.container = Notify._createContainer();
        }
        notify.appendTo(Notify.container);

        notify.hide(function(){

            Utils.exec(Utils.isValue(options.onAppend) ? options.onAppend : o.onAppend, null, notify[0]);

            notify.css({
                marginTop: Utils.isValue(options.distance) ? options.distance : o.distance
            }).fadeIn(100, function(){
                var duration = Utils.isValue(options.duration) ? options.duration : o.duration;
                var animation = Utils.isValue(options.animation) ? options.animation : o.animation;

                notify.animate({
                    marginTop: 4
                }, duration, animation, function(){

                    Utils.exec(o.onNotifyCreate, null, this);

                    if (options !== undefined && options.keepOpen === true) {
                    } else {
                        setTimeout(function(){
                            that.kill(notify, Utils.isValue(options.onClose) ? options.onClose : o.onClose);
                        }, o.timeout);
                    }

                    Utils.exec(Utils.isValue(options.onShow) ? options.onShow : o.onShow, null, notify[0]);

                });
            });
        });
    },

    kill: function(notify, callback){
        var that = this, o = this.options;
        notify.off(Metro.events.click);
        notify.fadeOut(o.duration, 'linear', function(){
            Utils.exec(Utils.isValue(callback) ? callback : that.options.onClose, null, notify[0]);
            notify.remove();
        });
    },

    killAll: function(){
        var that = this;
        var notifies = $(".notify");
        $.each(notifies, function(){
            that.kill($(this));
        });
    }
};

Metro['notify'] = Notify.setup();

var createPagination = function(c){
    var defConf = {
        length: 0,
        rows: 0,
        current: 0,
        target: "body",
        clsPagination: "",
        prevTitle: "Prev",
        nextTitle: "Next",
        distance: 5
    }, conf;
    var pagination;
    var pagination_wrapper;
    var i, prev, next;
    var shortDistance;

    conf = $.extend( {}, defConf, c);

    shortDistance = parseInt(conf.distance);
    pagination_wrapper = $(conf.target);
    pagination_wrapper.html("");
    pagination = $("<ul>").addClass("pagination").addClass(conf.clsPagination).appendTo(pagination_wrapper);

    if (conf.length === 0) {
        return ;
    }

    if (conf.rows === -1) {
        return ;
    }

    conf.pages = Math.ceil(conf.length / conf.rows);

    var add_item = function(item_title, item_type, data){
        var li, a;

        li = $("<li>").addClass("page-item").addClass(item_type);
        a  = $("<a>").addClass("page-link").html(item_title);
        a.data("page", data);
        a.appendTo(li);

        return li;
    };

    prev = add_item(conf.prevTitle, "service prev-page", "prev");
    pagination.append(prev);

    pagination.append(add_item(1, conf.current === 1 ? "active" : "", 1));

    if (shortDistance === 0 || conf.pages <= 7) {
        for (i = 2; i < conf.pages; i++) {
            pagination.append(add_item(i, i === conf.current ? "active" : "", i));
        }
    } else {
        if (conf.current < shortDistance) {
            for (i = 2; i <= shortDistance; i++) {
                pagination.append(add_item(i, i === conf.current ? "active" : "", i));
            }

            if (conf.pages > shortDistance) {
                pagination.append(add_item("...", "no-link", null));
            }
        } else if (conf.current <= conf.pages && conf.current > conf.pages - shortDistance + 1) {
            if (conf.pages > shortDistance) {
                pagination.append(add_item("...", "no-link", null));
            }

            for (i = conf.pages - shortDistance + 1; i < conf.pages; i++) {
                pagination.append(add_item(i, i === conf.current ? "active" : "", i));
            }
        } else {
            pagination.append(add_item("...", "no-link", null));

            pagination.append(add_item(conf.current - 1, "", conf.current - 1));
            pagination.append(add_item(conf.current, "active", conf.current));
            pagination.append(add_item(conf.current + 1, "", conf.current + 1));

            pagination.append(add_item("...", "no-link", null));
        }
    }

    if (conf.pages > 1 || conf.current < conf.pages) pagination.append(add_item(conf.pages, conf.current === conf.pages ? "active" : "", conf.pages));

    next = add_item(conf.nextTitle, "service next-page", "next");
    pagination.append(next);

    if (conf.current === 1) {
        prev.addClass("disabled");
    }

    if (conf.current === conf.pages) {
        next.addClass("disabled");
    }

    if (conf.length === 0) {
        pagination.addClass("disabled");
        pagination.children().addClass("disabled");
    }

    return pagination;
};

Metro['pagination'] = createPagination;

var PanelDefaultConfig = {
    id: null,
    titleCaption: "",
    titleIcon: "",
    collapsible: false,
    collapsed: false,
    collapseDuration: METRO_ANIMATION_DURATION,
    width: "auto",
    height: "auto",
    draggable: false,

    customButtons: null,
    clsCustomButton: "",

    clsPanel: "",
    clsTitle: "",
    clsTitleCaption: "",
    clsTitleIcon: "",
    clsContent: "",
    clsCollapseToggle: "",

    onCollapse: Metro.noop,
    onExpand: Metro.noop,
    onDragStart: Metro.noop,
    onDragStop: Metro.noop,
    onDragMove: Metro.noop,
    onPanelCreate: Metro.noop
};

Metro.panelSetup = function (options) {
    PanelDefaultConfig = $.extend({}, PanelDefaultConfig, options);
};

if (typeof window["metroPanelSetup"] !== undefined) {
    Metro.panelSetup(window["metroPanelSetup"]);
}

var Panel = {
    init: function( options, elem ) {
        this.options = $.extend( {}, PanelDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    dependencies: ['draggable', 'collapse'],

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _addCustomButtons: function(buttons){
        var element = this.element, o = this.options;
        var title = element.closest(".panel").find(".panel-title");
        var buttonsContainer, customButtons = [];

        if (typeof buttons === "string" && buttons.indexOf("{") > -1) {
            customButtons = JSON.parse(buttons);
        } else if (typeof buttons === "string" && Utils.isObject(buttons)) {
            customButtons = Utils.isObject(buttons);
        } else if (typeof buttons === "object" && Utils.objectLength(buttons) > 0) {
            customButtons = buttons;
        } else {
            console.warn("Unknown format for custom buttons", buttons);
            return ;
        }

        if (title.length === 0) {
            console.log("No place for custom buttons");
            return ;
        }

        buttonsContainer = title.find(".custom-buttons");

        if (buttonsContainer.length === 0) {
            buttonsContainer = $("<div>").addClass("custom-buttons").appendTo(title);
        } else {
            buttonsContainer.find(".btn-custom").off(Metro.events.click);
            buttonsContainer.html("");
        }

        $.each(customButtons, function(){
            var item = this;
            var customButton = $("<span>");

            customButton
                .addClass("button btn-custom")
                .addClass(o.clsCustomButton)
                .addClass(item.cls)
                .attr("tabindex", -1)
                .html(item.html);

            customButton.data("action", item.onclick);

            buttonsContainer.prepend(customButton);
        });

        title.on(Metro.events.click, ".btn-custom", function(e){
            if (Utils.isRightMouse(e)) return;
            var button = $(this);
            var action = button.data("action");
            Utils.exec(action, [button], this);
        });

        return this;
    },

    _create: function(){
        var element = this.element, o = this.options;
        var panel = $("<div>").addClass("panel").addClass(o.clsPanel);
        var id = o.id ? o.id : Utils.elementId("panel");
        var original_classes = element[0].className;
        var title;

        Metro.checkRuntime(element, "panel");

        panel.attr("id", id).addClass(original_classes);
        panel.insertBefore(element);
        element.appendTo(panel);

        element[0].className = '';
        element.addClass("panel-content").addClass(o.clsContent).appendTo(panel);

        if (o.titleCaption !== "" || o.titleIcon !== "" || o.collapsible === true) {
            title = $("<div>").addClass("panel-title").addClass(o.clsTitle);

            if (o.titleCaption !== "") {
                $("<span>").addClass("caption").addClass(o.clsTitleCaption).html(o.titleCaption).appendTo(title)
            }

            if (o.titleIcon !== "") {
                $(o.titleIcon).addClass("icon").addClass(o.clsTitleIcon).appendTo(title)
            }

            if (o.collapsible === true) {
                var collapseToggle = $("<span>").addClass("dropdown-toggle marker-center active-toggle").addClass(o.clsCollapseToggle).appendTo(title);
                Metro.makePlugin(element, "collapse", {
                    toggleElement: collapseToggle,
                    duration: o.collapseDuration,
                    onCollapse: o.onCollapse,
                    onExpand: o.onExpand
                });

                if (o.collapsed === true) {
                    this.collapse();
                }
            }

            title.appendTo(panel);
        }

        if (title && Utils.isValue(o.customButtons)) {
            this._addCustomButtons(o.customButtons);
        }

        if (o.draggable === true) {
            var dragElement;

            if (title) {
                dragElement = title.find(".caption, .icon");
            } else {
                dragElement = panel;
            }

            Metro.makePlugin(panel, "draggable", {
                dragElement: dragElement,
                onDragStart: o.onDragStart,
                onDragStop: o.onDragStop,
                onDragMove: o.onDragMove
            });
        }

        if (o.width !== "auto" && parseInt(o.width) >= 0) {
            panel.outerWidth(parseInt(o.width));
        }

        if (o.height !== "auto" && parseInt(o.height) >= 0) {
            panel.outerHeight(parseInt(o.height));
            element.css({overflow: "auto"});
        }

        this.panel = panel;

        Utils.exec(o.onPanelCreate, null,element[0]);
        element.fire("panelcreate");
    },

    customButtons: function(buttons){
        return this._addCustomButtons(buttons);
    },

    collapse: function(){
        var element = this.element;
        if (Utils.isMetroObject(element, 'collapse') === false) {
            return ;
        }
        Metro.getPlugin(element, 'collapse').collapse();
    },

    expand: function(){
        var element = this.element;
        if (Utils.isMetroObject(element, 'collapse') === false) {
            return ;
        }
        Metro.getPlugin(element, 'collapse').expand();
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;

        if (o.collapsible === true) {
            Metro.getPlugin(element, "collapse").destroy();
        }

        if (o.draggable === true) {
            Metro.getPlugin(element, "draggable").destroy();
        }

        return element;
    }
};

Metro.plugin('panel', Panel);

var PopoverDefaultConfig = {
    popoverText: "",
    popoverHide: 3000,
    popoverTimeout: 10,
    popoverOffset: 10,
    popoverTrigger: Metro.popoverEvents.HOVER,
    popoverPosition: Metro.position.TOP,
    hideOnLeave: false,
    closeButton: true,
    clsPopover: "",
    clsPopoverContent: "",
    onPopoverShow: Metro.noop,
    onPopoverHide: Metro.noop,
    onPopoverCreate: Metro.noop
};

Metro.popoverSetup = function (options) {
    PopoverDefaultConfig = $.extend({}, PopoverDefaultConfig, options);
};

if (typeof window["metroPopoverSetup"] !== undefined) {
    Metro.popoverSetup(window["metroPopoverSetup"]);
}

var Popover = {
    init: function( options, elem ) {
        this.options = $.extend( {}, PopoverDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.popover = null;
        this.popovered = false;
        this.size = {
            width: 0,
            height: 0
        };

        this.id = Utils.elementId("popover");

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        this._createEvents();
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var event;

        switch (o.popoverTrigger) {
            case Metro.popoverEvents.CLICK: event = Metro.events.click; break;
            case Metro.popoverEvents.FOCUS: event = Metro.events.focus; break;
            default: event = Metro.events.enter;
        }

        element.on(event, function(){
            if (that.popover !== null || that.popovered === true) {
                return ;
            }
            setTimeout(function(){
                that.createPopover();

                Utils.exec(o.onPopoverShow, [that.popover], element[0]);
                element.fire("popovershow", {
                    popover: that.popover
                });

                if (o.popoverHide > 0) {
                    setTimeout(function(){
                        that.removePopover();
                    }, o.popoverHide);
                }
            }, o.popoverTimeout);
        });

        if (o.hideOnLeave === true) {
            element.on(Metro.events.leave, function(){
                that.removePopover();
            });
        }

        $(window).on(Metro.events.scroll, function(){
            if (that.popover !== null) that.setPosition();
        }, {ns: this.id});
    },

    setPosition: function(){
        var popover = this.popover, size = this.size, o = this.options, element = this.element;

        if (o.popoverPosition === Metro.position.BOTTOM) {
            popover.addClass('bottom');
            popover.css({
                top: element.offset().top - $(window).scrollTop() + element.outerHeight() + o.popoverOffset,
                left: element.offset().left + element.outerWidth()/2 - size.width/2  - $(window).scrollLeft()
            });
        } else if (o.popoverPosition === Metro.position.RIGHT) {
            popover.addClass('right');
            popover.css({
                top: element.offset().top + element.outerHeight()/2 - size.height/2 - $(window).scrollTop(),
                left: element.offset().left + element.outerWidth() - $(window).scrollLeft() + o.popoverOffset
            });
        } else if (o.popoverPosition === Metro.position.LEFT) {
            popover.addClass('left');
            popover.css({
                top: element.offset().top + element.outerHeight()/2 - size.height/2 - $(window).scrollTop(),
                left: element.offset().left - size.width - $(window).scrollLeft() - o.popoverOffset
            });
        } else {
            popover.addClass('top');
            popover.css({
                top: element.offset().top - $(window).scrollTop() - size.height - o.popoverOffset,
                left: element.offset().left + element.outerWidth()/2 - size.width/2  - $(window).scrollLeft()
            });
        }
    },

    createPopover: function(){
        var that = this, elem = this.elem, element = this.element, o = this.options;
        var popover;
        var neb_pos;
        var id = Utils.elementId("popover");
        var closeButton;

        if (this.popovered) {
            return ;
        }

        popover = $("<div>").addClass("popover neb").addClass(o.clsPopover);
        popover.attr("id", id);

        $("<div>").addClass("popover-content").addClass(o.clsPopoverContent).html(o.popoverText).appendTo(popover);

        if (o.popoverHide === 0 && o.closeButton === true) {
            closeButton = $("<button>").addClass("button square small popover-close-button bg-white").html("&times;").appendTo(popover);
            closeButton.on(Metro.events.click, function(){
                that.removePopover();
            });
        }

        switch (o.popoverPosition) {
            case Metro.position.TOP: neb_pos = "neb-s"; break;
            case Metro.position.BOTTOM: neb_pos = "neb-n"; break;
            case Metro.position.RIGHT: neb_pos = "neb-w"; break;
            case Metro.position.LEFT: neb_pos = "neb-e"; break;
        }

        popover.addClass(neb_pos);

        if (o.closeButton !== true) {
            popover.on(Metro.events.click, function(){
                that.removePopover();
            });
        }

        this.popover = popover;
        this.size = Utils.hiddenElementSize(popover);

        if (elem.tagName === 'TD' || elem.tagName === 'TH') {
            var wrp = $("<div/>").css("display", "inline-block").html(element.html());
            element.html(wrp);
            element = wrp;
        }

        this.setPosition();

        popover.appendTo($('body'));

        this.popovered = true;

        Utils.exec(o.onPopoverCreate, [popover], element[0]);
        element.fire("popovercreate", {
            popover: popover
        });
    },

    removePopover: function(){
        var that = this, element = this.element;
        var timeout = this.options.onPopoverHide === Metro.noop ? 0 : 300;
        var popover = this.popover;

        if (!this.popovered) {
            return ;
        }

        Utils.exec(this.options.onPopoverHide, [popover], this.elem);
        element.fire("popoverhide", {
            popover: popover
        });

        setTimeout(function(){
            popover.hide(0, function(){
                popover.remove();
                that.popover = null;
                that.popovered = false;
            });
        }, timeout);
    },

    show: function(){
        var that = this, element = this.element, o = this.options;

        if (this.popovered === true) {
            return ;
        }

        setTimeout(function(){
            that.createPopover();

            Utils.exec(o.onPopoverShow, [that.popover], element[0]);
            element.fire("popovershow", {
                popover: that.popover
            });

            if (o.popoverHide > 0) {
                setTimeout(function(){
                    that.removePopover();
                }, o.popoverHide);
            }
        }, o.popoverTimeout);
    },

    hide: function(){
        this.removePopover();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeText = function(){
            o.popoverText = element.attr("data-popover-text");
            if (that.popover) {
                that.popover.find(".popover-content").html(o.popoverText);
                that.setPosition();
            }
        };

        var changePosition = function(){
            o.popoverPosition = element.attr("data-popover-position");
            that.setPosition();
        };

        switch (attributeName) {
            case "data-popover-text": changeText(); break;
            case "data-popover-position": changePosition(); break;
        }
    },

    destroy: function(){
        var element = this.element, o = this.options;
        var event;

        switch (o.popoverTrigger) {
            case Metro.popoverEvents.CLICK: event = Metro.events.click; break;
            case Metro.popoverEvents.FOCUS: event = Metro.events.focus; break;
            default: event = Metro.events.enter;
        }

        element.off(event);

        if (o.hideOnLeave === true) {
            element.off(Metro.events.leave);
        }

        $(window).off(Metro.events.scroll,{ns: this.id});

        return element;
    }
};

Metro.plugin('popover', Popover);

var ProgressDefaultConfig = {
    value: 0,
    buffer: 0,
    type: "bar",
    small: false,
    clsBack: "",
    clsBar: "",
    clsBuffer: "",
    onValueChange: Metro.noop,
    onBufferChange: Metro.noop,
    onComplete: Metro.noop,
    onBuffered: Metro.noop,
    onProgressCreate: Metro.noop
};

Metro.progressSetup = function (options) {
    ProgressDefaultConfig = $.extend({}, ProgressDefaultConfig, options);
};

if (typeof window["metroProgressSetup"] !== undefined) {
    Metro.bottomSheetSetup(window["metroProgressSetup"]);
}

var Progress = {
    init: function( options, elem ) {
        this.options = $.extend( {}, ProgressDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = 0;
        this.buffer = 0;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "progress");

        element
            .html("")
            .addClass("progress");

        function _progress(){
            $("<div>").addClass("bar").appendTo(element);
        }

        function _buffer(){
            $("<div>").addClass("bar").appendTo(element);
            $("<div>").addClass("buffer").appendTo(element);
        }

        function _load(){
            element.addClass("with-load");
            $("<div>").addClass("bar").appendTo(element);
            $("<div>").addClass("buffer").appendTo(element);
            $("<div>").addClass("load").appendTo(element);
        }

        function _line(){
            element.addClass("line");
        }

        switch (o.type) {
            case "buffer": _buffer(); break;
            case "load": _load(); break;
            case "line": _line(); break;
            default: _progress();
        }

        if (o.small === true) {
            element.addClass("small");
        }

        element.addClass(o.clsBack);
        element.find(".bar").addClass(o.clsBar);
        element.find(".buffer").addClass(o.clsBuffer);

        this.val(o.value);
        this.buff(o.buffer);

        Utils.exec(o.onProgressCreate, null, element[0]);
        element.fire("progresscreate");
    },

    val: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return that.value;
        }

        var bar  = element.find(".bar");

        if (bar.length === 0) {
            return false;
        }

        this.value = parseInt(v, 10);

        bar.css("width", this.value + "%");

        Utils.exec(o.onValueChange, [this.value], element[0]);
        element.fire("valuechange", {
            vsl: this.value
        });

        if (this.value === 100) {
            Utils.exec(o.onComplete, [this.value], element[0]);
            element.fire("complete", {
                val: this.value
            });
        }
    },

    buff: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return that.buffer;
        }

        var bar  = element.find(".buffer");

        if (bar.length === 0) {
            return false;
        }

        this.buffer = parseInt(v, 10);

        bar.css("width", this.buffer + "%");

        Utils.exec(o.onBufferChange, [this.buffer], element[0]);
        element.fire("bufferchange", {
            val: this.buffer
        });

        if (this.buffer === 100) {
            Utils.exec(o.onBuffered, [this.buffer], element[0]);
            element.fire("buffered", {
                val: this.buffer
            });
        }
    },

    changeValue: function(){
        this.val(this.element.attr('data-value'));
    },

    changeBuffer: function(){
        this.buff(this.element.attr('data-buffer'));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-value': this.changeValue(); break;
            case 'data-buffer': this.changeBuffer(); break;
        }
    },

    destroy: function(){
        return this.element;
    }
};

Metro.plugin('progress', Progress);

var RadioDefaultConfig = {
    transition: true,
    style: 1,
    caption: "",
    captionPosition: "right",
    clsRadio: "",
    clsCheck: "",
    clsCaption: "",
    onRadioCreate: Metro.noop
};

Metro.radioSetup = function (options) {
    RadioDefaultConfig = $.extend({}, RadioDefaultConfig, options);
};

if (typeof window["metroRadioSetup"] !== undefined) {
    Metro.radioSetup(window["metroRadioSetup"]);
}

var Radio = {
    init: function( options, elem ) {
        this.options = $.extend( {}, RadioDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.origin = {
            className: ""
        };

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;
        var radio = $("<label>").addClass("radio " + element[0].className).addClass(o.style === 2 ? "style2" : "");
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        Metro.checkRuntime(element, "radio");

        element.attr("type", "radio");

        radio.insertBefore(element);
        element.appendTo(radio);
        check.appendTo(radio);
        caption.appendTo(radio);

        if (o.transition === true) {
            radio.addClass("transition-on");
        }

        if (o.captionPosition === 'left') {
            radio.addClass("caption-left");
        }

        this.origin.className = element[0].className;
        element[0].className = '';

        radio.addClass(o.clsRadio);
        caption.addClass(o.clsCaption);
        check.addClass(o.clsCheck);

        if (element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }

        Utils.exec(o.onRadioCreate, null, element[0]);
        element.fire("radiocreate");
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        var element = this.element, o = this.options;
        var parent = element.parent();

        var changeStyle = function(){
            var new_style = parseInt(element.attr("data-style"));

            if (!Utils.isInt(new_style)) return;

            o.style = new_style;
            parent.removeClass("style1 style2").addClass("style"+new_style);
        };

        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'data-style': changeStyle(); break;
        }
    },

    destroy: function(){
        return this.element;
    }
};

Metro.plugin('radio', Radio);

var RatingDefaultConfig = {
    static: false,
    title: null,
    value: 0,
    values: null,
    message: "",
    stars: 5,
    starColor: null,
    staredColor: null,
    roundFunc: "round", // ceil, floor, round
    half: true,
    clsRating: "",
    clsTitle: "",
    clsStars: "",
    clsResult: "",
    onStarClick: Metro.noop,
    onRatingCreate: Metro.noop
};

Metro.ratingSetup = function (options) {
    RatingDefaultConfig = $.extend({}, RatingDefaultConfig, options);
};

if (typeof window["metroRatingSetup"] !== undefined) {
    Metro.ratingSetup(window["metroRatingSetup"]);
}

var Rating = {
    init: function( options, elem ) {
        this.options = $.extend( {}, RatingDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = 0;
        this.originValue = 0;
        this.values = [];
        this.rate = 0;
        this.rating = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;
        var i;

        Metro.checkRuntime(element, "rating");

        if (isNaN(o.value)) {
            o.value = 0;
        } else {
            o.value = parseFloat(o.value).toFixed(1);
        }

        if (o.values !== null) {
            if (Array.isArray(o.values)) {
                this.values = o.values;
            } else if (typeof o.values === "string") {
                this.values = Utils.strToArray(o.values)
            }
        } else {
            for(i = 1; i <= o.stars; i++) {
                this.values.push(i);
            }
        }

        this.originValue = o.value;
        this.value = o.value > 0 ? Math[o.roundFunc](o.value) : 0;

        if (o.starColor !== null) {
            if (!Utils.isColor(o.starColor)) {
                o.starColor = Colors.color(o.starColor);
            }
        }

        if (o.staredColor !== null) {
            if (!Utils.isColor(o.staredColor)) {
                o.staredColor = Colors.color(o.staredColor);
            }
        }

        this._createRating();
        this._createEvents();

        Utils.exec(o.onRatingCreate, null, element[0]);
        element.fire("ratingcreate");
    },

    _createRating: function(){
        var element = this.element, o = this.options;

        var id = Utils.elementId("rating");
        var rating = $("<div>").addClass("rating " + String(element[0].className).replace("d-block", "d-flex")).addClass(o.clsRating);
        var i, stars, result, li;
        var sheet = Metro.sheet;
        var value = o.static ? Math.floor(this.originValue) : this.value;

        element.val(this.value);

        rating.attr("id", id);

        rating.insertBefore(element);
        element.appendTo(rating);

        stars = $("<ul>").addClass("stars").addClass(o.clsStars).appendTo(rating);

        for(i = 1; i <= o.stars; i++) {
            li = $("<li>").data("value", this.values[i-1]).appendTo(stars);
            if (i <= value) {
                li.addClass("on");
            }
        }

        result = $("<span>").addClass("result").addClass(o.clsResult).appendTo(rating);

        result.html(o.message);

        if (o.starColor !== null) {
            Utils.addCssRule(sheet, "#" + id + " .stars:hover li", "color: " + o.starColor + ";");
        }
        if (o.staredColor !== null) {
            Utils.addCssRule(sheet, "#"+id+" .stars li.on", "color: "+o.staredColor+";");
            Utils.addCssRule(sheet, "#"+id+" .stars li.half::after", "color: "+o.staredColor+";");
        }

        if (o.title !== null) {
            var title = $("<span>").addClass("title").addClass(o.clsTitle).html(o.title);
            rating.prepend(title);
        }

        if (o.static === true) {
            rating.addClass("static");
            if (o.half === true){
                var dec = Math.round((this.originValue % 1) * 10);
                if (dec > 0 && dec <= 9) {
                    rating.find('.stars li.on').last().next("li").addClass("half half-" + ( dec * 10));
                }
            }
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (i = 0; i < element[0].style.length; i++) {
                rating.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }

        this.rating = rating;
    },

    _createEvents: function(){
        var element = this.element, o = this.options;
        var rating = this.rating;

        rating.on(Metro.events.click, ".stars li", function(){

            if (o.static === true) {
                return ;
            }

            var star = $(this);
            var value = star.data("value");
            star.addClass("scale");
            setTimeout(function(){
                star.removeClass("scale");
            }, 300);
            element.val(value).trigger("change");
            star.addClass("on");
            star.prevAll().addClass("on");
            star.nextAll().removeClass("on");

            Utils.exec(o.onStarClick, [value, star[0]], element[0]);
            element.fire("starclick", {
                value: value,
                star: star[0]
            });
        });
    },

    val: function(v){
        var that = this, element = this.element, o = this.options;
        var rating = this.rating;

        if (v === undefined) {
            return this.value;
        }

        this.value = v > 0 ? Math[o.roundFunc](v) : 0;
        element.val(this.value).trigger("change");

        var stars = rating.find(".stars li").removeClass("on");
        $.each(stars, function(){
            var star = $(this);
            if (star.data("value") <= that.value) {
                star.addClass("on");
            }
        });

        return this;
    },

    msg: function(m){
        var rating = this.rating;
        if (m ===  undefined) {
            return ;
        }
        rating.find(".result").html(m);
        return this;
    },

    static: function (mode) {
        var o = this.options;
        var rating = this.rating;

        o.static = mode;

        if (mode === true) {
            rating.addClass("static");
        } else {
            rating.removeClass("static");
        }
    },

    changeAttributeValue: function(a){
        var element = this.element;
        var value = a === "value" ? element.val() : element.attr("data-value");
        this.val(value);
    },

    changeAttributeMessage: function(){
        var element = this.element;
        var message = element.attr("data-message");
        this.msg(message);
    },

    changeAttributeStatic: function(){
        var element = this.element;
        var isStatic = JSON.parse(element.attr("data-static")) === true;

        this.static(isStatic);
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "value":
            case "data-value": this.changeAttributeValue(attributeName); break;
            case "disabled": this.toggleState(); break;
            case "data-message": this.changeAttributeMessage(); break;
            case "data-static": this.changeAttributeStatic(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var rating = this.rating;

        rating.off(Metro.events.click, ".stars li");

        return element;
    }
};

Metro.plugin('rating', Rating);

var ResizableDefaultConfig = {
    canResize: true,
    resizeElement: ".resize-element",
    minWidth: 0,
    minHeight: 0,
    maxWidth: 0,
    maxHeight: 0,
    preserveRatio: false,
    onResizeStart: Metro.noop,
    onResizeStop: Metro.noop,
    onResize: Metro.noop,
    onResizableCreate: Metro.noop
};

Metro.resizeableSetup = function (options) {
    ResizableDefaultConfig = $.extend({}, ResizableDefaultConfig, options);
};

if (typeof window["metroResizeableSetup"] !== undefined) {
    Metro.resizeableSetup(window["metroResizeableSetup"]);
}

var Resizable = {
    init: function( options, elem ) {
        this.options = $.extend( {}, ResizableDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.resizer = null;

        this.id = Utils.elementId("resizeable");

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "resizeable");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onResizableCreate, null, element[0]);
        element.fire("resizeablecreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;

        element.data("canResize", true);
        element.addClass("resizeable-element");

        if (Utils.isValue(o.resizeElement) && element.find(o.resizeElement).length > 0) {
            this.resizer = element.find(o.resizeElement);
        } else {
            this.resizer = $("<span>").addClass("resize-element").appendTo(element);
        }

        element.data("canResize", o.canResize);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        this.resizer.on(Metro.events.start, function(e){

            if (element.data('canResize') === false) {
                return ;
            }

            var startXY = Utils.pageXY(e);
            var startWidth = parseInt(element.outerWidth());
            var startHeight = parseInt(element.outerHeight());
            var size = {width: startWidth, height: startHeight};

            element.addClass("stop-select stop-pointer");

            Utils.exec(o.onResizeStart, [size], element[0]);
            element.fire("resizestart", {
                size: size
            });

            $(document).on(Metro.events.move, function(e){
                var moveXY = Utils.pageXY(e);
                var size = {
                    width: startWidth + moveXY.x - startXY.x,
                    height: startHeight + moveXY.y - startXY.y
                };

                if (o.maxWidth > 0 && size.width > o.maxWidth) {return true;}
                if (o.minWidth > 0 && size.width < o.minWidth) {return true;}

                if (o.maxHeight > 0 && size.height > o.maxHeight) {return true;}
                if (o.minHeight > 0 && size.height < o.minHeight) {return true;}

                element.css(size);

                Utils.exec(o.onResize, [size], element[0]);
                element.fire("resize", {
                    size: size
                });
            }, {ns: that.id});

            $(document).on(Metro.events.stop, function(){
                element.removeClass("stop-select stop-pointer");

                $(document).off(Metro.events.move, {ns: that.id});
                $(document).off(Metro.events.stop, {ns: that.id});

                var size = {
                    width: parseInt(element.outerWidth()),
                    height: parseInt(element.outerHeight())
                };

                Utils.exec(o.onResizeStop, [size], element[0]);
                element.fire("resizestop", {
                    size: size
                });
            }, {ns: that.id});

            e.preventDefault();
            e.stopPropagation();
        });

    },

    off: function(){
        this.element.data("canResize", false);
    },

    on: function(){
        this.element.data("canResize", true);
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var canResize = function(){
            o.canResize = JSON.parse(element.attr('data-can-resize')) === true;
        };

        switch (attributeName) {
            case "data-can-resize": canResize(); break;
        }
    },

    destroy: function(){
        this.resizer.off(Metro.events.start);
        return this.element;
    }
};

Metro.plugin('resizable', Resizable);

var RibbonMenuDefaultConfig = {
    onStatic: Metro.noop,
    onBeforeTab: Metro.noop_true,
    onTab: Metro.noop,
    onRibbonMenuCreate: Metro.noop
};

Metro.ribbonMenuSetup = function (options) {
    RibbonMenuDefaultConfig = $.extend({}, RibbonMenuDefaultConfig, options);
};

if (typeof window["metroRibbonMenuSetup"] !== undefined) {
    Metro.ribbonMenuSetup(window["metroRibbonMenuSetup"]);
}

var RibbonMenu = {
    init: function( options, elem ) {
        this.options = $.extend( {}, RibbonMenuDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    dependencies: ['buttongroup'],

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "ribbonmenu");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onRibbonMenuCreate, null, element[0]);
        element.fire("ribbonmenucreate");
    },

    _createStructure: function(){
        var element = this.element;

        element.addClass("ribbon-menu");

        var tabs = element.find(".tabs-holder li:not(.static)");
        var active_tab = element.find(".tabs-holder li.active");
        if (active_tab.length > 0) {
            this.open($(active_tab[0]));
        } else {
            if (tabs.length > 0) {
                this.open($(tabs[0]));
            }
        }

        var fluentGroups = element.find(".ribbon-toggle-group");
        $.each(fluentGroups, function(){
            var g = $(this);
            g.buttongroup({
                clsActive: "active"
            });

            var gw = 0;
            var btns = g.find(".ribbon-icon-button");
            $.each(btns, function(){
                var b = $(this);
                var w = b.outerWidth(true);
                if (w > gw) gw = w;
            });

            g.css("width", gw * Math.ceil(btns.length / 3) + 4);
        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".tabs-holder li a", function(e){
            var link = $(this);
            var tab = $(this).parent("li");

            if (tab.hasClass("static")) {
                if (o.onStatic === Metro.noop && link.attr("href") !== undefined) {
                    document.location.href = link.attr("href");
                } else {
                    Utils.exec(o.onStatic, [tab[0]], element[0]);
                    element.fire("static", {
                        tab: tab[0]
                    });
                }
            } else {
                if (Utils.exec(o.onBeforeTab, [tab[0]], element[0]) === true) {
                    that.open(tab[0]);
                }
            }
            e.preventDefault();
        })
    },

    open: function(tab){
        var element = this.element, o = this.options;
        var $tab = $(tab);
        var tabs = element.find(".tabs-holder li");
        var sections = element.find(".content-holder .section");
        var target = $tab.children("a").attr("href");
        var target_section = target !== "#" ? element.find(target) : null;

        tabs.removeClass("active");
        $tab.addClass("active");

        sections.removeClass("active");
        if (target_section) target_section.addClass("active");

        Utils.exec(o.onTab, [$tab[0]], element[0]);
        element.fire("tab", {
            tab: $tab[0]
        });
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;
        element.off(Metro.events.click, ".tabs-holder li a");
        return element;
    }
};

Metro.plugin('ribbonmenu', RibbonMenu);

var RippleDefaultConfig = {
    rippleColor: "#fff",
    rippleAlpha: .4,
    rippleTarget: "default",
    onRippleCreate: Metro.noop
};

Metro.rippleSetup = function (options) {
    RippleDefaultConfig = $.extend({}, RippleDefaultConfig, options);
};

if (typeof window["metroRippleSetup"] !== undefined) {
    Metro.rippleSetup(window["metroRippleSetup"]);
}

var Ripple = {
    init: function( options, elem ) {
        this.options = $.extend( {}, RippleDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        var target = o.rippleTarget === 'default' ? null : o.rippleTarget;

        Metro.checkRuntime(element, "ripple");

        element.on(Metro.events.click, target, function(e){
            var el = $(this);
            var timer = null;

            if (el.css('position') === 'static') {
                el.css('position', 'relative');
            }

            el.css({
                overflow: 'hidden'
            });

            $(".ripple").remove();

            var size = Math.max(el.outerWidth(), el.outerHeight());

            // Add the element
            var ripple = $("<span class='ripple'></span>").css({
                width: size,
                height: size
            });

            el.prepend(ripple);

            // Get the center of the element
            var x = e.pageX - el.offset().left - ripple.width()/2;
            var y = e.pageY - el.offset().top - ripple.height()/2;

            // Add the ripples CSS and start the animation
            ripple.css({
                background: Utils.hex2rgba(o.rippleColor, o.rippleAlpha),
                width: size,
                height: size,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect");
            timer = setTimeout(function(){
                timer = null;
                $(".ripple").remove();
            }, 400);
        });

        Utils.exec(o.onRippleCreate, null, element[0]);
        element.fire("ripplecreate");
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element, o = this.options;
        var target = o.rippleTarget === 'default' ? null : o.rippleTarget;
        element.off(Metro.events.click, target);
    }
};

Metro.plugin('ripple', Ripple);

var SelectDefaultConfig = {
    clearButton: false,
    clearButtonIcon: "<span class='default-icon-cross'></span>",
    placeholder: "",
    addEmptyValue: false,
    emptyValue: "",
    duration: 100,
    prepend: "",
    append: "",
    filterPlaceholder: "",
    filter: true,
    copyInlineStyles: true,
    dropHeight: 200,

    clsSelect: "",
    clsSelectInput: "",
    clsPrepend: "",
    clsAppend: "",
    clsOption: "",
    clsOptionActive: "",
    clsOptionGroup: "",
    clsDropList: "",
    clsSelectedItem: "",
    clsSelectedItemRemover: "",

    onChange: Metro.noop,
    onUp: Metro.noop,
    onDrop: Metro.noop,
    onItemSelect: Metro.noop,
    onItemDeselect: Metro.noop,
    onSelectCreate: Metro.noop
};

Metro.selectSetup = function (options) {
    SelectDefaultConfig = $.extend({}, SelectDefaultConfig, options);
};

if (typeof window["metroSelectSetup"] !== undefined) {
    Metro.selectSetup(window["metroSelectSetup"]);
}

var Select = {
    init: function( options, elem ) {
        this.options = $.extend( {}, SelectDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.list = null;
        this.placeholder = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "select");

        this._createSelect();
        this._createEvents();

        Utils.exec(o.onSelectCreate, null, element[0]);
        element.fire("selectcreate");
    },

    _setPlaceholder: function(){
        var element = this.element, o = this.options;
        var input = element.siblings(".select-input");
        if (!Utils.isValue(element.val()) || element.val() == o.emptyValue) {
            input.html(this.placeholder);
        }
    },

    _addOption: function(item, parent){
        var option = $(item);
        var l, a;
        var element = this.element, o = this.options;
        var multiple = element[0].multiple;
        var input = element.siblings(".select-input");
        var html = Utils.isValue(option.attr('data-template')) ? option.attr('data-template').replace("$1", item.text):item.text;
        var tag;

        l = $("<li>").addClass(o.clsOption).data("option", item).attr("data-text", item.text).attr('data-value', Utils.isValue(item.value) ? item.value : "").appendTo(parent);
        a = $("<a>").html(html).appendTo(l);

        l.addClass(item.className);

        if (option.is(":disabled")) {
            l.addClass("disabled");
        }

        if (option.is(":selected")) {
            if (multiple) {
                l.addClass("d-none");
                tag = $("<div>").addClass("selected-item").addClass(o.clsSelectedItem).html("<span class='title'>"+html+"</span>").appendTo(input);
                tag.data("option", l);
                $("<span>").addClass("remover").addClass(o.clsSelectedItemRemover).html("&times;").appendTo(tag);
            } else {
                element.val(item.value);
                input.html(html);
                element.fire("change", {
                    val: item.value
                });
                l.addClass("active");
            }
        }

        a.appendTo(l);
        l.appendTo(parent);
    },

    _addOptionGroup: function(item, parent){
        var that = this;
        var group = $(item);

        $("<li>").html(item.label).addClass("group-title").appendTo(parent);

        $.each(group.children(), function(){
            that._addOption(this, parent);
        })
    },

    _createOptions: function(){
        var that = this, element = this.element, o = this.options, select = element.parent();
        var list = select.find("ul").html("");
        var selected = element.find("option[selected]").length > 0;

        if (o.addEmptyValue === true) {
            element.prepend($("<option "+(!selected ? 'selected' : '')+" value='"+o.emptyValue+"' class='d-none'></option>"));
        }

        $.each(element.children(), function(){
            if (this.tagName === "OPTION") {
                that._addOption(this, list);
            } else if (this.tagName === "OPTGROUP") {
                that._addOptionGroup(this, list);
            }
        });
    },

    _createSelect: function(){
        var element = this.element, o = this.options;

        var container = $("<label>").addClass("select " + element[0].className).addClass(o.clsSelect);
        var multiple = element[0].multiple;
        var select_id = Utils.elementId("select");
        var buttons = $("<div>").addClass("button-group");
        var input, drop_container, list, filter_input, placeholder, dropdown_toggle;

        this.placeholder = $("<span>").addClass("placeholder").html(o.placeholder);

        container.attr("id", select_id);

        dropdown_toggle = $("<span>").addClass("dropdown-toggle");
        dropdown_toggle.appendTo(container);

        if (multiple) {
            container.addClass("multiple");
        }

        container.insertBefore(element);
        element.appendTo(container);
        buttons.appendTo(container);

        input = $("<div>").addClass("select-input").addClass(o.clsSelectInput).attr("name", "__" + select_id + "__");
        drop_container = $("<div>").addClass("drop-container");
        list = $("<ul>").addClass("d-menu").addClass(o.clsDropList).css({
            "max-height": o.dropHeight
        });
        filter_input = $("<input type='text' data-role='input'>").attr("placeholder", o.filterPlaceholder);

        container.append(input);
        container.append(drop_container);

        drop_container.append(filter_input);

        if (o.filter !== true) {
            filter_input.hide();
        }

        drop_container.append(list);

        this._createOptions();

        this._setPlaceholder();

        Metro.makePlugin(drop_container, "dropdown", {
            dropFilter: ".select",
            duration: o.duration,
            toggleElement: "#"+select_id,
            onDrop: function(){
                var dropped, target;
                dropdown_toggle.addClass("active-toggle");
                dropped = $(".select .drop-container");
                $.each(dropped, function(){
                    var drop = $(this);
                    if (drop.is(drop_container)) {
                        return ;
                    }
                    var dataDrop = drop.data('dropdown');
                    if (dataDrop && dataDrop.close) {
                        dataDrop.close();
                    }
                });

                filter_input.val("").trigger(Metro.events.keyup).focus();

                target = list.find("li.active").length > 0 ? $(list.find("li.active")[0]) : undefined;
                if (target !== undefined) {
                    list[0].scrollTop = target.position().top - ( (list.height() - target.height() )/ 2);
                }

                Utils.exec(o.onDrop, [list[0]], element[0]);
                element.fire("drop", {
                    list: list[0]
                });
            },
            onUp: function(){
                dropdown_toggle.removeClass("active-toggle");
                Utils.exec(o.onUp, [list[0]], element[0]);
                element.fire("up", {
                    list: list[0]
                });
            }
        });

        this.list = list;

        if (o.clearButton === true && !element[0].readOnly) {
            var clearButton = $("<button>").addClass("button input-clear-button").addClass(o.clsClearButton).attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.appendTo(buttons);
        } else {
            buttons.addClass("d-none");
        }

        if (o.prepend !== "") {
            var prepend = $("<div>").html(o.prepend);
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (o.append !== "") {
            var append = $("<div>").html(o.append);
            append.addClass("append").addClass(o.clsAppend).appendTo(container);
        }

        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        if (element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.closest(".select");
        var drop_container = container.find(".drop-container");
        var input = element.siblings(".select-input");
        var filter_input = drop_container.find("input");
        var list = drop_container.find("ul");
        var clearButton = container.find(".input-clear-button");

        clearButton.on(Metro.events.click, function(e){
            element.val(o.emptyValue);
            that._setPlaceholder();
            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.change, function(){
            that._setPlaceholder();
        });

        container.on(Metro.events.click, function(e){
            $(".focused").removeClass("focused");
            container.addClass("focused");
            e.preventDefault();
            e.stopPropagation();
        });

        input.on(Metro.events.click, function(){
            $(".focused").removeClass("focused");
            container.addClass("focused");
        });

        list.on(Metro.events.click, "li", function(e){
            if ($(this).hasClass("group-title")) {
                e.preventDefault();
                e.stopPropagation();
                return ;
            }
            var leaf = $(this);
            var val = leaf.data('value');
            var html = leaf.children('a').html();
            var selected_item, selected;
            var option = leaf.data("option");
            var options = element.find("option");

            if (element[0].multiple) {
                leaf.addClass("d-none");
                selected_item = $("<div>").addClass("selected-item").addClass(o.clsSelectedItem).html("<span class='title'>"+html+"</span>").appendTo(input);
                selected_item.data("option", leaf);
                $("<span>").addClass("remover").addClass(o.clsSelectedItemRemover).html("&times;").appendTo(selected_item);
            } else {
                list.find("li.active").removeClass("active").removeClass(o.clsOptionActive);
                leaf.addClass("active").addClass(o.clsOptionActive);
                input.html(html);
                Metro.getPlugin(drop_container[0], "dropdown").close();
            }

            $.each(options, function(){
                if (this === option) {
                    this.selected = true;
                }
            });

            Utils.exec(o.onItemSelect, [val, option, leaf[0]], element[0]);
            element.fire("itemselect", {
                val: val,
                option: option,
                leaf: leaf[0]
            });

            selected = that.getSelected();

            Utils.exec(o.onChange, [selected], element[0]);
            element.fire("change", {
                selected: selected
            });
        });

        input.on("click", ".selected-item .remover", function(e){
            var item = $(this).closest(".selected-item");
            var leaf = item.data("option");
            var option = leaf.data('option');
            var selected;

            leaf.removeClass("d-none");
            $.each(element.find("option"), function(){
                if (this === option) {
                    this.selected = false;
                }
            });
            item.remove();

            Utils.exec(o.onItemDeselect, [option], element[0]);
            element.fire("itemdeselect", {
                option: option
            });

            selected = that.getSelected();
            Utils.exec(o.onChange, [selected], element[0]);
            element.fire("change", {
                selected: selected
            });

            e.preventDefault();
            e.stopPropagation();
        });

        filter_input.on(Metro.events.keyup, function(){
            var filter = this.value.toUpperCase();
            var li = list.find("li");
            var i, a;
            for (i = 0; i < li.length; i++) {
                if ($(li[i]).hasClass("group-title")) continue;
                a = li[i].getElementsByTagName("a")[0];
                if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        });

        drop_container.on(Metro.events.click, function(e){
            e.preventDefault();
            e.stopPropagation();
        });
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.closest(".select").addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.closest(".select").removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    reset: function(to_default){
        var element = this.element, o = this.options;
        var options = element.find("option");
        var select = element.closest('.select');
        var selected;

        $.each(options, function(){
            this.selected = !Utils.isNull(to_default) ? this.defaultSelected : false;
        });

        this.list.find("li").remove();
        select.find(".select-input").html('');

        this._createOptions();

        selected = this.getSelected();
        Utils.exec(o.onChange, [selected], element[0]);
        element.fire("change", {
            selected: selected
        });
    },

    getSelected: function(){
        var element = this.element;
        var result = [];

        element.find("option").each(function(){
            if (this.selected) result.push(this.value);
        });

        return result;
    },

    val: function(val){
        var element = this.element, o = this.options;
        var input = element.siblings(".select-input");
        var options = element.find("option");
        var list_items = this.list.find("li");
        var result = [];
        var multiple = element.attr("multiple") !== undefined;
        var option;
        var i, html, list_item, option_value, tag, selected;

        if (Utils.isNull(val)) {
            $.each(options, function(){
                if (this.selected) result.push(this.value);
            });
            return multiple ? result : result[0];
        }

        $.each(options, function(){
            this.selected = false;
        });
        list_items.removeClass("active");
        input.html('');

        if (Array.isArray(val) === false) {
            val  = [val];
        }

        $.each(val, function(){
            for (i = 0; i < options.length; i++) {
                option = options[i];
                html = Utils.isValue(option.getAttribute('data-template')) ? option.getAttribute('data-template').replace("$1", option.text) : option.text;
                if (""+option.value === ""+this) {
                    option.selected = true;
                    break;
                }
            }

            for(i = 0; i < list_items.length; i++) {
                list_item = $(list_items[i]);
                option_value = list_item.attr("data-value");
                if (""+option_value === ""+this) {
                    if (multiple) {
                        list_item.addClass("d-none");
                        tag = $("<div>").addClass("selected-item").addClass(o.clsSelectedItem).html("<span class='title'>"+html+"</span>").appendTo(input);
                        tag.data("option", list_item);
                        $("<span>").addClass("remover").addClass(o.clsSelectedItemRemover).html("&times;").appendTo(tag);
                    } else {
                        list_item.addClass("active");
                        input.html(html);
                    }
                    break;
                }
            }
        });

        selected = this.getSelected();
        Utils.exec(o.onChange, [selected], element[0]);
        element.fire("change", {
            selected: selected
        });
    },

    data: function(op){
        var element = this.element;
        var option_group;

        element.html("");

        if (typeof op === 'string') {
            element.html(op);
        } else if (Utils.isObject(op)) {
            $.each(op, function(key, val){
                if (Utils.isObject(val)) {
                    option_group = $("<optgroup label=''>").attr("label", key).appendTo(element);
                    $.each(val, function(key2, val2){
                        $("<option>").attr("value", key2).text(val2).appendTo(option_group);
                    });
                } else {
                    $("<option>").attr("value", key).text(val).appendTo(element);
                }
            });
        }

        this._createOptions();
    },

    changeAttribute: function(attributeName){
        if (attributeName === 'disabled') {
            this.toggleState();
        }
    },

    destroy: function(){
        var element = this.element;
        var container = element.closest(".select");
        var drop_container = container.find(".drop-container");
        var input = element.siblings(".select-input");
        var filter_input = drop_container.find("input");
        var list = drop_container.find("ul");
        var clearButton = container.find(".input-clear-button");

        container.off(Metro.events.click);
        container.off(Metro.events.click, ".input-clear-button");
        input.off(Metro.events.click);
        filter_input.off(Metro.events.blur);
        filter_input.off(Metro.events.focus);
        list.off(Metro.events.click, "li");
        filter_input.off(Metro.events.keyup);
        drop_container.off(Metro.events.click);
        clearButton.off(Metro.events.click);

        drop_container.data("dropdown").destroy();

        return element;
    }
};

$(document).on(Metro.events.click, function(){
    var $$ = Utils.$();
    var selects = $(".select .drop-container");
    $.each(selects, function(){
        var drop = $$(this).data('dropdown');
        if (drop && drop.close) drop.close();
    });
    $(".select").removeClass("focused");
}, {ns: "close-select-elements"});

Metro.plugin('select', Select);



var SidebarDefaultConfig = {
    shadow: true,
    position: "left",
    size: 290,
    shift: null,
    staticShift: null,
    toggle: null,
    duration: METRO_ANIMATION_DURATION,
    static: null,
    menuItemClick: true,
    onOpen: Metro.noop,
    onClose: Metro.noop,
    onToggle: Metro.noop,
    onStaticSet: Metro.noop,
    onStaticLoss: Metro.noop,
    onSidebarCreate: Metro.noop
};

Metro.sidebarSetup = function (options) {
    SidebarDefaultConfig = $.extend({}, SidebarDefaultConfig, options);
};

if (typeof window["metroSidebarSetup"] !== undefined) {
    Metro.sidebarSetup(window["metroSidebarSetup"]);
}

var Sidebar = {
    init: function( options, elem ) {
        this.options = $.extend( {}, SidebarDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.toggle_element = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "sidebar");

        this._createStructure();
        this._createEvents();
        $(window).resize();
        this._checkStatic();

        Utils.exec(o.onSidebarCreate, null, element[0]);
        element.fire("sidebarcreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var header = element.find(".sidebar-header");
        var sheet = Metro.sheet;

        element.addClass("sidebar").addClass("on-"+o.position);

        if (o.size !== 290) {
            Utils.addCssRule(sheet, ".sidebar", "width: " + o.size + "px;");

            if (o.position === "left") {
                Utils.addCssRule(sheet, ".sidebar.on-left", "left: " + -o.size + "px;");
            } else {
                Utils.addCssRule(sheet, ".sidebar.on-right", "right: " + -o.size + "px;");
            }
        }

        if (o.shadow === true) {
            element.addClass("sidebar-shadow");
        }

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("sidebar"));
        }

        if (o.toggle !== null && $(o.toggle).length > 0) {
            this.toggle_element = $(o.toggle);
        }

        if (header.length > 0) {
            if (header.data("image") !== undefined) {
                header.css({
                    backgroundImage: "url("+header.data("image")+")"
                });
            }
        }

        if (o.static !== null) {
            if (o.staticShift !== null) {
                if (o.position === 'left') {
                    Utils.addCssRule(sheet, "@media screen and " + Metro.media_queries[o.static.toUpperCase()], o.staticShift + "{margin-left: " + o.size + "px; width: calc(100% - " + o.size + "px);}");
                } else {
                    Utils.addCssRule(sheet, "@media screen and " + Metro.media_queries[o.static.toUpperCase()], o.staticShift + "{margin-right: " + o.size + "px; width: calc(100% - " + o.size + "px);}");
                }
            }
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var toggle = this.toggle_element;

        if (toggle !== null) {
            toggle.on(Metro.events.click, function(){
                that.toggle();
            });
        }

        if (o.static !== null && ["fs", "sm", "md", "lg", "xl", "xxl"].indexOf(o.static) > -1) {
            $(window).on(Metro.events.resize,function(){
                that._checkStatic();
            }, {ns: element.attr("id")});
        }

        if (o.menuItemClick === true) {
            element.on(Metro.events.click, ".sidebar-menu li > a", function(){
                that.close();
            });
        }

        element.on(Metro.events.click, ".sidebar-menu .js-sidebar-close", function(){
            that.close();
        });
    },

    _checkStatic: function(){
        var element = this.element, o = this.options;
        if (Utils.mediaExist(o.static) && !element.hasClass("static")) {
            element.addClass("static");
            element.data("opened", false).removeClass('open');
            if (o.shift !== null) {
                $.each(o.shift.split(","), function(){
                    $(""+this).animate({left: 0}, o.duration);
                });
            }
            Utils.exec(o.onStaticSet, null, element[0]);
            element.fire("staticset");
        }
        if (!Utils.mediaExist(o.static)) {
            element.removeClass("static");
            Utils.exec(o.onStaticLoss, null, element[0]);
            element.fire("staticloss");
        }
    },

    isOpen: function(){
        return this.element.data("opened") === true;
    },

    open: function(){
        var element = this.element, o = this.options;

        if (element.hasClass("static")) {
            return ;
        }

        element.data("opened", true).addClass('open');

        if (o.shift !== null) {
            $(o.shift).animate({
                left: element.outerWidth()
            }, o.duration);
        }

        Utils.exec(o.onOpen, null, element[0]);
        element.fire("open");
    },

    close: function(){
        var element = this.element, o = this.options;

        if (element.hasClass("static")) {
            return ;
        }

        element.data("opened", false).removeClass('open');

        if (o.shift !== null) {
            $(o.shift).animate({
                left: 0
            }, o.duration);
        }

        Utils.exec(o.onClose, null, element[0]);
        element.fire("close");
    },

    toggle: function(){
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
        Utils.exec(this.options.onToggle, null, this.element[0]);
        this.element.fire("toggle");
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var that = this, element = this.element, o = this.options;
        var toggle = this.toggle_element;

        if (toggle !== null) {
            toggle.off(Metro.events.click);
        }

        if (o.static !== null && ["fs", "sm", "md", "lg", "xl", "xxl"].indexOf(o.static) > -1) {
            $(window).off(Metro.events.resize, {ns: element.attr("id")});
        }

        if (o.menuItemClick === true) {
            element.off(Metro.events.click, ".sidebar-menu li > a");
        }

        element.off(Metro.events.click, ".sidebar-menu .js-sidebar-close");

        return element;
    }
};

Metro.plugin('sidebar', Sidebar);

Metro['sidebar'] = {
    isSidebar: function(el){
        return Utils.isMetroObject(el, "sidebar");
    },

    open: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        Metro.getPlugin($(el)[0], "sidebar").open();
    },

    close: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        Metro.getPlugin($(el)[0], "sidebar").close();
    },

    toggle: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        Metro.getPlugin($(el)[0], "sidebar").toggle();
    },

    isOpen: function(el){
        if (!this.isSidebar(el)) {
            return ;
        }
        return Metro.getPlugin($(el)[0], "sidebar").isOpen();
    }
};

var SliderDefaultConfig = {
    min: 0,
    max: 100,
    accuracy: 0,
    showMinMax: false,
    minMaxPosition: Metro.position.TOP,
    value: 0,
    buffer: 0,
    hint: false,
    hintAlways: false,
    hintPosition: Metro.position.TOP,
    hintMask: "$1",
    vertical: false,
    target: null,
    returnType: "value", // value or percent
    size: 0,

    clsSlider: "",
    clsBackside: "",
    clsComplete: "",
    clsBuffer: "",
    clsMarker: "",
    clsHint: "",
    clsMinMax: "",
    clsMin: "",
    clsMax: "",

    onStart: Metro.noop,
    onStop: Metro.noop,
    onMove: Metro.noop,
    onSliderClick: Metro.noop,
    onChange: Metro.noop,
    onChangeValue: Metro.noop,
    onChangeBuffer: Metro.noop,
    onFocus: Metro.noop,
    onBlur: Metro.noop,
    onSliderCreate: Metro.noop
};

Metro.sliderSetup = function (options) {
    SliderDefaultConfig = $.extend({}, SliderDefaultConfig, options);
};

if (typeof window["metroSliderSetup"] !== undefined) {
    Metro.sliderSetup(window["metroSliderSetup"]);
}

var Slider = {
    init: function( options, elem ) {
        this.options = $.extend( {}, SliderDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.slider = null;
        this.value = 0;
        this.percent = 0;
        this.pixel = 0;
        this.buffer = 0;
        this.keyInterval = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "slider");

        this._createSlider();
        this._createEvents();
        this.buff(o.buffer);
        this.val(o.value);

        Utils.exec(o.onSliderCreate, null, element[0]);
        element.fire("slidercreate");
    },

    _createSlider: function(){
        var element = this.element, o = this.options;

        var prev = element.prev();
        var parent = element.parent();
        var slider = $("<div>").addClass("slider " + element[0].className).addClass(o.clsSlider);
        var backside = $("<div>").addClass("backside").addClass(o.clsBackside);
        var complete = $("<div>").addClass("complete").addClass(o.clsComplete);
        var buffer = $("<div>").addClass("buffer").addClass(o.clsBuffer);
        var marker = $("<button>").attr("type", "button").addClass("marker").addClass(o.clsMarker);
        var hint = $("<div>").addClass("hint").addClass(o.hintPosition + "-side").addClass(o.clsHint);
        var id = Utils.elementId("slider");
        var i;

        if (!element.attr("data-role-slider")) {
            element
                .attr("data-role-slider", true)
                .attr("data-role", "slide");
        }

        slider.attr("id", id);

        if (o.size > 0) {
            if (o.vertical === true) {
                slider.outerHeight(o.size);
            } else {
                slider.outerWidth(o.size);
            }
        }

        if (o.vertical === true) {
            slider.addClass("vertical-slider");
        }

        if (prev.length === 0) {
            parent.prepend(slider);
        } else {
            slider.insertAfter(prev);
        }

        if (o.hintAlways === true) {
            hint.css({
                display: "block"
            }).addClass("permanent-hint");
        }

        element.appendTo(slider);
        backside.appendTo(slider);
        complete.appendTo(slider);
        buffer.appendTo(slider);
        marker.appendTo(slider);
        hint.appendTo(marker);

        if (o.showMinMax === true) {
            var min_max_wrapper = $("<div>").addClass("slider-min-max clear").addClass(o.clsMinMax);
            $("<span>").addClass("place-left").addClass(o.clsMin).html(o.min).appendTo(min_max_wrapper);
            $("<span>").addClass("place-right").addClass(o.clsMax).html(o.max).appendTo(min_max_wrapper);
            if (o.minMaxPosition === Metro.position.TOP) {
                min_max_wrapper.insertBefore(slider);
            } else {
                min_max_wrapper.insertAfter(slider);
            }
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (i = 0; i < element[0].style.length; i++) {
                slider.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }

        this.slider = slider;
    },

    _createEvents: function(){
        var that = this, element = this.element, slider = this.slider, o = this.options;
        var marker = slider.find(".marker");
        var hint = slider.find(".hint");

        marker.on(Metro.events.startAll, function(){
            if (o.hint === true && o.hintAlways !== true) {
                hint.fadeIn(300);
            }

            $(document).on(Metro.events.moveAll, function(e){
                that._move(e);
                Utils.exec(o.onMove, [that.value, that.percent], element[0]);
                element.fire("move", {
                    val: that.value,
                    percent: that.percent
                });
            });

            $(document).on(Metro.events.stopAll, function(){
                $(document).off(Metro.events.moveAll);
                $(document).off(Metro.events.stopAll);

                if (o.hintAlways !== true) {
                    hint.fadeOut(300);
                }

                Utils.exec(o.onStop, [that.value, that.percent], element[0]);
                element.fire("stop", {
                    val: that.value,
                    percent: that.percent
                });
            });

            Utils.exec(o.onStart, [that.value, that.percent], element[0]);
            element.fire("start", {
                val: that.value,
                percent: that.percent
            });
        });

        marker.on(Metro.events.focus, function(){
            Utils.exec(o.onFocus, [that.value, that.percent], element[0]);
            element.fire("focus", {
                val: that.value,
                percent: that.percent
            });
        });

        marker.on(Metro.events.blur, function(){
            Utils.exec(o.onBlur, [that.value, that.percent], element[0]);
            element.fire("blur", {
                val: that.value,
                percent: that.percent
            });
        });

        marker.on(Metro.events.keydown, function(e){

            var key = e.keyCode ? e.keyCode : e.which;

            if ([37,38,39,40].indexOf(key) === -1) {
                return;
            }

            var step = o.accuracy === 0 ? 1 : o.accuracy;

            if (that.keyInterval) {
                return ;
            }
            that.keyInterval = setInterval(function(){

                var val = that.value;

                if (e.keyCode === 37 || e.keyCode === 40) { // left, down
                    if (val - step < o.min) {
                        val = o.min;
                    } else {
                        val -= step;
                    }
                }

                if (e.keyCode === 38 || e.keyCode === 39) { // right, up
                    if (val + step > o.max) {
                        val = o.max;
                    } else {
                        val += step;
                    }
                }

                that.value = that._correct(val);
                that.percent = that._convert(that.value, 'val2prc');
                that.pixel = that._convert(that.percent, 'prc2pix');

                that._redraw();
            }, 100);

            e.preventDefault();
        });

        marker.on(Metro.events.keyup, function(){
            clearInterval(that.keyInterval);
            that.keyInterval = false;
        });

        slider.on(Metro.events.click, function(e){
            that._move(e);
            Utils.exec(o.onSliderClick, [that.value, that.percent], element[0]);
            element.fire("sliderclick", {
                val: that.value,
                percent: that.percent
            });

            Utils.exec(o.onStop, [that.value, that.percent], element[0]);
            element.fire("stop", {
                val: that.value,
                percent: that.percent
            });
        });

        $(window).on(Metro.events.resize,function(){
            that.val(that.value);
            that.buff(that.buffer);
        }, {ns: slider.attr("id")});
    },

    _convert: function(v, how){
        var slider = this.slider, o = this.options;
        var length = (o.vertical === true ? slider.outerHeight() : slider.outerWidth()) - slider.find(".marker").outerWidth();
        switch (how) {
            case "pix2prc": return Math.round( v * 100 / length );
            case "pix2val": return Math.round( this._convert(v, 'pix2prc') * ((o.max - o.min) / 100) + o.min );
            case "val2prc": return Math.round( (v - o.min)/( (o.max - o.min) / 100 )  );
            case "prc2pix": return Math.round( v / ( 100 / length ));
            case "val2pix": return Math.round( this._convert(this._convert(v, 'val2prc'), 'prc2pix') );
        }

        return 0;
    },

    _correct: function(value){
        var accuracy  = this.options.accuracy;
        var min = this.options.min, max = this.options.max;

        if (accuracy === 0 || isNaN(accuracy)) {
            return value;
        }

        value = Math.floor(value / accuracy) * accuracy + Math.round(value % accuracy / accuracy) * accuracy;

        if (value < min) {
            value = min;
        }

        if (value > max) {
            value = max;
        }

        return value;
    },

    _move: function(e){
        var slider = this.slider, o = this.options;
        var offset = slider.offset(),
            marker_size = slider.find(".marker").outerWidth(),
            length = o.vertical === true ? slider.outerHeight() : slider.outerWidth(),
            cPos, cPix, cStart = 0, cStop = length - marker_size;

        cPos = o.vertical === true ? Utils.pageXY(e).y - offset.top : Utils.pageXY(e).x - offset.left;
        cPix = o.vertical === true ? length - cPos - marker_size / 2 : cPos - marker_size / 2;

        if (cPix < cStart || cPix > cStop) {
            return ;
        }

        this.value = this._correct(this._convert(cPix, 'pix2val'));
        this.percent = this._convert(this.value, 'val2prc');
        this.pixel = this._convert(this.percent, 'prc2pix');

        this._redraw();
    },

    _hint: function(){
        var o = this.options, slider = this.slider, hint = slider.find(".hint");
        var value;

        value = o.hintMask.replace("$1", this.value).replace("$2", this.percent);

        hint.text(value);
    },

    _value: function(){
        var element = this.element, o = this.options, slider = this.slider;
        var value = o.returnType === 'value' ? this.value : this.percent;

        if (element[0].tagName === "INPUT") {
            element.val(value);
        }

        // element.trigger("change");

        if (o.target !== null) {
            var target = $(o.target);
            if (target.length !== 0) {

                $.each(target, function(){
                    var t = $(this);
                    if (this.tagName === "INPUT") {
                        t.val(value);
                    } else {
                        t.text(value);
                    }
                });
            }
        }

        Utils.exec(o.onChangeValue, [value, this.percent], element[0]);
        element.fire("changevalue", {
            val: value,
            percent: this.percent
        });

        Utils.exec(o.onChange, [value, this.percent, this.buffer], element[0]);
        element.fire("change", {
            val: value,
            percent: this.percent,
            buffer: this.buffer
        });
    },

    _marker: function(){
        var slider = this.slider, o = this.options;
        var marker = slider.find(".marker"), complete = slider.find(".complete");
        var length = o.vertical === true ? slider.outerHeight() : slider.outerWidth();
        var marker_size = parseInt(Utils.getStyleOne(marker, "width"));
        var slider_visible = Utils.isVisible(slider);

        if (slider_visible) {
            marker.css({
                'margin-top': 0,
                'margin-left': 0
            });
        }

        if (o.vertical === true) {
            if (slider_visible) {
                marker.css('top', length - this.pixel);
            } else {
                marker.css('top', this.percent + "%");
                marker.css('margin-top', this.percent === 0 ? 0 : -1 * marker_size / 2);
            }
            complete.css('height', this.percent+"%");
        } else {
            if (slider_visible) {
                marker.css('left', this.pixel);
            } else {
                marker.css('left', this.percent + "%");
                marker.css('margin-left', this.percent === 0 ? 0 : -1 * marker_size / 2);
            }
            complete.css('width', this.percent+"%");
        }
    },

    _redraw: function(){
        this._marker();
        this._value();
        this._hint();
    },

    _buffer: function(){
        var element = this.element, o = this.options;
        var buffer = this.slider.find(".buffer");

        if (o.vertical === true) {
            buffer.css("height", this.buffer + "%");
        } else {
            buffer.css("width", this.buffer + "%");
        }

        Utils.exec(o.onChangeBuffer, [this.buffer], element[0]);
        element.fire("changebuffer", {
            val: this.buffer
        });

        Utils.exec(o.onChange, [element.val(), this.percent, this.buffer], element[0]);
        element.fire("change", {
            val: element.val(),
            percent: this.percent,
            buffer: this.buffer
        });
    },

    val: function(v){
        var o = this.options;

        if (v === undefined || isNaN(v)) {
            return this.value;
        }

        if (v < o.min) {
            v = o.min;
        }

        if (v > o.max) {
            v = o.max;
        }

        this.value = this._correct(v);
        this.percent = this._convert(this.value, 'val2prc');
        this.pixel = this._convert(this.percent, 'prc2pix');

        this._redraw();
    },

    buff: function(v){
        var slider = this.slider;
        var buffer = slider.find(".buffer");

        if (v === undefined || isNaN(v)) {
            return this.buffer;
        }

        if (buffer.length === 0) {
            return false;
        }

        v = parseInt(v);

        if (v > 100) {
            v = 100;
        }

        if (v < 0) {
            v = 0;
        }

        this.buffer = v;
        this._buffer();
    },

    changeValue: function(){
        var element = this.element, o = this.options;
        var val = element.attr("data-value");
        if (val < o.min) {
            val = o.min
        }
        if (val > o.max) {
            val = o.max
        }
        this.val(val);
    },

    changeBuffer: function(){
        var element = this.element;
        var val = parseInt(element.attr("data-buffer"));
        if (val < 0) {
            val = 0
        }
        if (val > 100) {
            val = 100
        }
        this.buff(val);
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-value": this.changeValue(); break;
            case "data-buffer": this.changeBuffer(); break;
            case 'disabled': this.toggleState(); break;
        }
    },

    destroy: function(){
        var element = this.element, slider = this.slider;
        var marker = slider.find(".marker");

        marker.off(Metro.events.startAll);
        marker.off(Metro.events.focus);
        marker.off(Metro.events.blur);
        marker.off(Metro.events.keydown);
        marker.off(Metro.events.keyup);
        slider.off(Metro.events.click);
        $(window).off(Metro.events.resize, {ns: slider.attr("id")});

        return element;
    }
};

Metro.plugin('slider', Slider);

var SorterDefaultConfig = {
    thousandSeparator: ",",
    decimalSeparator: ",",
    sortTarget: null,
    sortSource: null,
    sortDir: "asc",
    sortStart: true,
    saveInitial: true,
    onSortStart: Metro.noop,
    onSortStop: Metro.noop,
    onSortItemSwitch: Metro.noop,
    onSorterCreate: Metro.noop
};

Metro.sorterSetup = function (options) {
    SorterDefaultConfig = $.extend({}, SorterDefaultConfig, options);
};

if (typeof window["metroSorterSetup"] !== undefined) {
    Metro.sorterSetup(window["metroSorterSetup"]);
}

var Sorter = {
    init: function( options, elem ) {
        this.options = $.extend( {}, SorterDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.initial = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "sorter");

        this._createStructure();

        Utils.exec(o.onSorterCreate, null, element[0]);
        element.fire("sortercreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;

        if (o.sortTarget === null) {
            o.sortTarget = element.children()[0].tagName;
        }

        this.initial = element.find(o.sortTarget).get();

        if (o.sortStart === true) {
            this.sort(o.sortDir);
        }
    },

    _getItemContent: function(item){
        var o = this.options;
        var data, inset, i, format;

        if (Utils.isValue(o.sortSource)) {
            data = "";
            inset = item.getElementsByClassName(o.sortSource);

            if (inset.length > 0) for (i = 0; i < inset.length; i++) {
                data += inset[i].textContent;
            }
            format = inset[0].dataset.format;
        } else {
            data = item.textContent;
            format = item.dataset.format;
        }

        data = (""+data).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

        if (Utils.isValue(format)) {

            if (['number', 'int', 'float', 'money'].indexOf(format) !== -1 && (o.thousandSeparator !== "," || o.decimalSeparator !== "." )) {
                data = Utils.parseNumber(data, o.thousandSeparator, o.decimalSeparator);
            }

            switch (format) {
                case "date": data = Utils.isDate(data) ? new Date(data) : ""; break;
                case "number": data = Number(data); break;
                case "int": data = parseInt(data); break;
                case "float": data = parseFloat(data); break;
                case "money": data = Utils.parseMoney(data); break;
                case "card": data = Utils.parseCard(data); break;
                case "phone": data = Utils.parsePhone(data); break;
            }
        }

        return data;
    },

    sort: function(dir){
        var that = this, element = this.element, o = this.options;
        var items;
        var id = Utils.elementId("temp");
        var prev;

        if (dir !== undefined) {
            o.sortDir = dir;
        }

        items = element.find(o.sortTarget).get();

        if (items.length === 0) {
            return ;
        }

        prev = $("<div>").attr("id", id).insertBefore($(element.find(o.sortTarget)[0]));

        Utils.exec(o.onSortStart, [items], element[0]);
        element.fire("sortstart", {
            items: items
        });

        items.sort(function(a, b){
            var c1 = that._getItemContent(a);
            var c2 = that._getItemContent(b);
            var result = 0;

            if (c1 < c2 ) {
                return result = -1;
            }

            if (c1 > c2 ) {
                return result = 1;
            }

            if (result !== 0) {
                Utils.exec(o.onSortItemSwitch, [a, b, result], element[0]);
                element.fire("sortitemswitch", {
                    a: a,
                    b: b,
                    result: result
                });
            }

            return result;
        });

        if (o.sortDir === "desc") {
            items.reverse();
        }

        element.find(o.sortTarget).remove();

        $.each(items, function(){
            var $this = $(this);
            $this.insertAfter(prev);
            prev = $this;
        });

        $("#"+id).remove();

        Utils.exec(o.onSortStop, [items], element[0]);
        element.fire("sortstop");
    },

    reset: function(){
        var that = this, element = this.element, o = this.options;
        var items;
        var id = Utils.uniqueId();
        var prev;

        items = this.initial;

        if (items.length === 0) {
            return ;
        }

        prev = $("<div>").attr("id", id).insertBefore($(element.find(o.sortTarget)[0]));

        element.find(o.sortTarget).remove();

        $.each(items, function(){
            var $this = $(this);
            $this.insertAfter(prev);
            prev = $this;
        });

        $("#"+id).remove();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeSortDir = function() {
            var dir = element.attr("data-sort-dir").trim();
            if (dir === "") return;
            o.sortDir = dir;
            that.sort();
        };

        var changeSortContent = function(){
            var content = element.attr("data-sort-content").trim();
            if (content === "") return ;
            o.sortContent = content;
            that.sort();
        };

        switch (attributeName) {
            case "data-sort-dir": changeSortDir(); break;
            case "data-sort-content": changeSortContent(); break;
        }
    },

    destroy: function(){
        return this.element;
    }
};

Metro.plugin('sorter', Sorter);

Metro['sorter'] = {
    create: function(el, op){
        return Utils.$()(el).sorter(op);
    },

    isSorter: function(el){
        return Utils.isMetroObject(el, "sorter");
    },

    sort: function(el, dir){
        if (!this.isSorter(el)) {
            return false;
        }
        if (dir === undefined) {
            dir = "asc";
        }
        Metro.getPlugin($(el)[0], "sorter").sort(dir);
    },

    reset: function(el){
        if (!this.isSorter(el)) {
            return false;
        }
        Metro.getPlugin($(el)[0], "sorter").reset();
    }
};

var SpinnerDefaultConfig = {
    step: 1,
    plusIcon: "<span class='default-icon-plus'></span>",
    minusIcon: "<span class='default-icon-minus'></span>",
    buttonsPosition: "default",
    defaultValue: 0,
    minValue: null,
    maxValue: null,
    fixed: 0,
    repeatThreshold: 1000,
    hideCursor: false,
    clsSpinner: "",
    clsSpinnerInput: "",
    clsSpinnerButton: "",
    clsSpinnerButtonPlus: "",
    clsSpinnerButtonMinus: "",
    onBeforeChange: Metro.noop_true,
    onChange: Metro.noop,
    onPlusClick: Metro.noop,
    onMinusClick: Metro.noop,
    onArrowUp: Metro.noop,
    onArrowDown: Metro.noop,
    onButtonClick: Metro.noop,
    onArrowClick: Metro.noop,
    onSpinnerCreate: Metro.noop
};

Metro.spinnerSetup = function (options) {
    SpinnerDefaultConfig = $.extend({}, SpinnerDefaultConfig, options);
};

if (typeof window["metroSpinnerSetup"] !== undefined) {
    Metro.spinnerSetup(window["metroSpinnerSetup"]);
}

var Spinner = {
    init: function( options, elem ) {
        this.options = $.extend( {}, SpinnerDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.repeat_timer = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "spinner");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onSpinnerCreate, null, element[0]);
        element.fire("spinnercreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var spinner = $("<div>").addClass("spinner").addClass("buttons-"+o.buttonsPosition).addClass(element[0].className).addClass(o.clsSpinner);
        var button_plus = $("<button>").attr("type", "button").addClass("button spinner-button spinner-button-plus").addClass(o.clsSpinnerButton + " " + o.clsSpinnerButtonPlus).html(o.plusIcon);
        var button_minus = $("<button>").attr("type", "button").addClass("button spinner-button spinner-button-minus").addClass(o.clsSpinnerButton + " " + o.clsSpinnerButtonMinus).html(o.minusIcon);
        var init_value = element.val().trim();

        if (!Utils.isValue(init_value)) {
            element.val(0);
        }

        element[0].className = '';

        spinner.insertBefore(element);
        element.appendTo(spinner).addClass(o.clsSpinnerInput);

        element.addClass("original-input");

        button_plus.appendTo(spinner);
        button_minus.appendTo(spinner);

        if (o.hideCursor === true) {
            spinner.addClass("hide-cursor");
        }

        if (o.disabled === true || element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var spinner = element.closest(".spinner");
        var spinner_buttons = spinner.find(".spinner-button");

        var spinnerButtonClick = function(plus, threshold){
            var curr = element.val();

            var val = Number(element.val());
            var step = Number(o.step);

            if (plus) {
                val += step;
            } else {
                val -= step;
            }

            that._setValue(val.toFixed(o.fixed), true);

            Utils.exec(plus ? o.onPlusClick : o.onMinusClick, [curr, val, element.val()], element[0]);
            element.fire(plus ? "plusclick" : "minusclick", {
                curr: curr,
                val: val,
                elementVal: element.val()
            });

            Utils.exec(plus ? o.onArrowUp : o.onArrowDown, [curr, val, element.val()], element[0]);
            element.fire(plus ? "arrowup" : "arrowdown", {
                curr: curr,
                val: val,
                elementVal: element.val()
            });

            Utils.exec(o.onButtonClick, [curr, val, element.val(), plus ? 'plus' : 'minus'], element[0]);
            element.fire("buttonclick", {
                button: plus ? "plus" : "minus",
                curr: curr,
                val: val,
                elementVal: element.val()
            });

            Utils.exec(o.onArrowClick, [curr, val, element.val(), plus ? 'plus' : 'minus'], element[0]);
            element.fire("arrowclick", {
                button: plus ? "plus" : "minus",
                curr: curr,
                val: val,
                elementVal: element.val()
            });

            setTimeout(function(){
                if (that.repeat_timer) {
                    spinnerButtonClick(plus, 100);
                }
            }, threshold);
        };

        spinner.on(Metro.events.click, function(e){
            $(".focused").removeClass("focused");
            spinner.addClass("focused");
            e.preventDefault();
            e.stopPropagation();
        });

        spinner_buttons.on(Metro.events.start, function(e){
            var plus = $(this).closest(".spinner-button").hasClass("spinner-button-plus");
            e.preventDefault();
            that.repeat_timer = true;
            spinnerButtonClick(plus, o.repeatThreshold);
        });

        spinner_buttons.on(Metro.events.stop, function(){
            that.repeat_timer = false;
        });

        element.on(Metro.events.keydown, function(e){
            if (e.keyCode === Metro.keyCode.UP_ARROW || e.keyCode === Metro.keyCode.DOWN_ARROW) {
                that.repeat_timer = true;
                spinnerButtonClick(e.keyCode === Metro.keyCode.UP_ARROW, o.repeatThreshold);
            }
        });

        spinner.on(Metro.events.keyup, function(){
            that.repeat_timer = false;
        });
    },

    _setValue: function(val, trigger_change){
        var element = this.element, o = this.options;

        if (Utils.exec(o.onBeforeChange, [val], element[0]) !== true) {
            return ;
        }

        if (Utils.isValue(o.maxValue) && val > Number(o.maxValue)) {
            val =  Number(o.maxValue);
        }

        if (Utils.isValue(o.minValue) && val < Number(o.minValue)) {
            val =  Number(o.minValue);
        }

        element.val(val);

        Utils.exec(o.onChange, [val], element[0]);

        if (trigger_change === true) {
            element.fire("change", {
                val: val
            });
        }
    },

    val: function(val){
        var that = this, element = this.element, o = this.options;
        if (!Utils.isValue(val)) {
            return element.val();
        }

        that._setValue(val.toFixed(o.fixed), true);
    },

    toDefault: function(){
        var element = this.element, o = this.options;
        var val = Utils.isValue(o.defaultValue) ? Number(o.defaultValue) : 0;
        this._setValue(val.toFixed(o.fixed), true);
        Utils.exec(o.onChange, [val], element[0]);
        element.fire("change", {
            val: val
        });
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element;

        var changeValue = function(){
            var val = element.attr('value').trim();
            if (Utils.isValue(val)) {
                that._setValue(Number(val), false);
            }
        };

        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'value': changeValue(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var spinner = element.closest(".spinner");
        var spinner_buttons = spinner.find(".spinner-button");

        spinner.off(Metro.events.click);
        spinner_buttons.off(Metro.events.start);
        spinner_buttons.off(Metro.events.stop);
        element.off(Metro.events.keydown);
        spinner.off(Metro.events.keyup);

        return element;
    }
};

Metro.plugin('spinner', Spinner);

$(document).on(Metro.events.click, function(){
    $(".spinner").removeClass("focused");
});



var SplitterDefaultConfig = {
    splitMode: "horizontal", // horizontal or vertical
    splitSizes: null,
    gutterSize: 4,
    minSizes: null,
    children: "*",
    gutterClick: "expand", // TODO expand or collapse
    saveState: false,
    onResizeStart: Metro.noop,
    onResizeStop: Metro.noop,
    onResizeSplit: Metro.noop,
    onSplitterCreate: Metro.noop
};

Metro.splitterSetup = function (options) {
    SplitterDefaultConfig = $.extend({}, SplitterDefaultConfig, options);
};

if (typeof window["metroSplitterSetup"] !== undefined) {
    Metro.splitterSetup(window["metroSplitterSetup"]);
}

var Splitter = {
    init: function( options, elem ) {
        this.options = $.extend( {}, SplitterDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.storage = Utils.isValue(Metro.storage) ? Metro.storage : null;
        this.storageKey = "SPLITTER:";

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "splitter");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onSplitterCreate, null, element[0]);
        element.fire("splittercreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var children = element.children(o.children).addClass("split-block");
        var i, children_sizes = [];
        var gutters, resizeProp = o.splitMode === "horizontal" ? "width" : "height";

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", Utils.elementId("splitter"));
        }

        element.addClass("splitter");
        if (o.splitMode.toLowerCase() === "vertical") {
            element.addClass("vertical");
        }

        for (i = 0; i < children.length - 1; i++) {
            $("<div>").addClass("gutter").css(resizeProp, o.gutterSize).insertAfter($(children[i]));
        }

        gutters = element.children(".gutter");

        if (!Utils.isValue(o.splitSizes)) {
            children.css({
                flexBasis: "calc("+(100/children.length)+"% - "+(gutters.length * o.gutterSize)+"px)"
            })
        } else {
            children_sizes = Utils.strToArray(o.splitSizes);
            for(i = 0; i < children_sizes.length; i++) {
                $(children[i]).css({
                    flexBasis: "calc("+children_sizes[i]+"% - "+(gutters.length * o.gutterSize)+"px)"
                });
            }
        }

        if (Utils.isValue(o.minSizes)) {
            if (String(o.minSizes).contains(",")) {
                children_sizes = Utils.strToArray(o.minSizes);
                for (i = 0; i < children_sizes.length; i++) {
                    $(children[i]).data("min-size", children_sizes[i]);
                    children[i].style.setProperty('min-'+resizeProp, String(children_sizes[i]).contains("%") ? children_sizes[i] : String(children_sizes[i]).replace("px", "")+"px", 'important');
                }
            } else {
                $.each(children, function(){
                    this.style.setProperty('min-'+resizeProp, String(o.minSizes).contains("%") ? o.minSizes : String(o.minSizes).replace("px", "")+"px", 'important');
                });
            }
        }

        if (o.saveState && this.storage !== null) {
            this._getSize();
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var gutters = element.children(".gutter");

        gutters.on(Metro.events.start, function(e){
            var w = o.splitMode === "horizontal" ? element.width() : element.height();
            var gutter = $(this);
            var prev_block = gutter.prev(".split-block");
            var next_block = gutter.next(".split-block");
            var prev_block_size = 100 * (o.splitMode === "horizontal" ? prev_block.outerWidth(true) : prev_block.outerHeight(true)) / w;
            var next_block_size = 100 * (o.splitMode === "horizontal" ? next_block.outerWidth(true) : next_block.outerHeight(true)) / w;
            var start_pos = Utils.getCursorPosition(element[0], e);

            gutter.addClass("active");

            prev_block.addClass("stop-select stop-pointer");
            next_block.addClass("stop-select stop-pointer");

            Utils.exec(o.onResizeStart, [start_pos, gutter[0], prev_block[0], next_block[0]], element[0]);
            element.fire("resizestart", {
                pos: start_pos,
                gutter: gutter[0],
                prevBlock: prev_block[0],
                nextBlock: next_block[0]
            });

            $(window).on(Metro.events.move, function(e){
                var pos = Utils.getCursorPosition(element[0], e);
                var new_pos;

                if (o.splitMode === "horizontal") {
                    new_pos = (pos.x * 100 / w) - (start_pos.x * 100 / w);

                } else {
                    new_pos = (pos.y * 100 / w) - (start_pos.y * 100 / w);
                }

                prev_block.css("flex-basis", "calc(" + (prev_block_size + new_pos) + "% - "+(gutters.length * o.gutterSize)+"px)");
                next_block.css("flex-basis", "calc(" + (next_block_size - new_pos) + "% - "+(gutters.length * o.gutterSize)+"px)");

                Utils.exec(o.onResizeSplit, [pos, gutter[0], prev_block[0], next_block[0]], element[0]);
                element.fire("resizesplit", {
                    pos: pos,
                    gutter: gutter[0],
                    prevBlock: prev_block[0],
                    nextBlock: next_block[0]
                });
            }, {ns: element.attr("id")});

            $(window).on(Metro.events.stop, function(e){
                var cur_pos;

                prev_block.removeClass("stop-select stop-pointer");
                next_block.removeClass("stop-select stop-pointer");

                that._saveSize();

                gutter.removeClass("active");

                $(window).off(Metro.events.move,{ns: element.attr("id")});
                $(window).off(Metro.events.stop,{ns: element.attr("id")});

                cur_pos = Utils.getCursorPosition(element[0], e);

                Utils.exec(o.onResizeStop, [cur_pos, gutter[0], prev_block[0], next_block[0]], element[0]);
                element.fire("resizestop", {
                    pos: cur_pos,
                    gutter: gutter[0],
                    prevBlock: prev_block[0],
                    nextBlock: next_block[0]
                });
            }, {ns: element.attr("id")})
        });
    },

    _saveSize: function(){
        var that = this, element = this.element, o = this.options;
        var storage = this.storage, itemsSize = [];

        if (o.saveState === true && storage !== null) {

            $.each(element.children(".split-block"), function(){
                var item = $(this);
                itemsSize.push(item.css("flex-basis"));
            });

            storage.setItem(this.storageKey + element.attr("id"), itemsSize);
        }

    },

    _getSize: function(){
        var that = this, element = this.element, o = this.options;
        var storage = this.storage, itemsSize = [];

        if (o.saveState === true && storage !== null) {

            itemsSize = storage.getItem(this.storageKey + element.attr("id"));

            $.each(element.children(".split-block"), function(i, v){
                var item = $(v);
                if (Utils.isValue(itemsSize) && Utils.isValue(itemsSize[i])) item.css("flex-basis", itemsSize[i]);
            });
        }
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element;
        var gutters = element.children(".gutter");
        gutters.off(Metro.events.start);
        return element;
    }
};

Metro.plugin('splitter', Splitter);

var StepperDefaultConfig = {
    view: Metro.stepperView.SQUARE, // square, cycle, diamond
    steps: 3,
    step: 1,
    stepClick: false,
    clsStepper: "",
    clsStep: "",
    clsComplete: "",
    clsCurrent: "",
    onStep: Metro.noop,
    onStepClick: Metro.noop,
    onStepperCreate: Metro.noop
};

Metro.stepperSetup = function (options) {
    StepperDefaultConfig = $.extend({}, StepperDefaultConfig, options);
};

if (typeof window["metroStepperSetup"] !== undefined) {
    Metro.stepperSetup(window["metroStepperSetup"]);
}

var Stepper = {
    init: function( options, elem ) {
        this.options = $.extend( {}, StepperDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.current = 0;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "stepper");

        if (o.step <= 0) {
            o.step = 1;
        }

        this._createStepper();
        this._createEvents();

        Utils.exec(o.onStepperCreate, null, element[0]);
        element.fire("steppercreate");
    },

    _createStepper: function(){
        var element = this.element, o = this.options;
        var i;

        element.addClass("stepper").addClass(o.view).addClass(o.clsStepper);

        for(i = 1; i <= o.steps; i++) {
            var step = $("<span>").addClass("step").addClass(o.clsStep).data("step", i).html("<span>"+i+"</span>").appendTo(element);
        }

        this.current = 1;
        this.toStep(o.step);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".step", function(){
            var step = $(this).data("step");
            if (o.stepClick === true) {
                that.toStep(step);
                Utils.exec(o.onStepClick, [step], element[0]);
                element.fire("stepclick", {
                    step: step
                });
            }
        });
    },

    next: function(){
        var that = this, element = this.element, o = this.options;
        var steps = element.find(".step");

        if (this.current + 1 > steps.length) {
            return ;
        }

        this.current++;

        this.toStep(this.current);
    },

    prev: function(){
        var that = this, element = this.element, o = this.options;

        if (this.current - 1 === 0) {
            return ;
        }

        this.current--;

        this.toStep(this.current);
    },

    last: function(){
        var that = this, element = this.element, o = this.options;

        this.toStep(element.find(".step").length);
    },

    first: function(){
        this.toStep(1);
    },

    toStep: function(step){
        var that = this, element = this.element, o = this.options;
        var target = $(element.find(".step").get(step - 1));

        if (target.length === 0) {
            return ;
        }

        this.current = step;

        element.find(".step")
            .removeClass("complete current")
            .removeClass(o.clsCurrent)
            .removeClass(o.clsComplete);

        target.addClass("current").addClass(o.clsCurrent);
        target.prevAll().addClass("complete").addClass(o.clsComplete);

        Utils.exec(o.onStep, [this.current], element[0]);
        element.fire("step", {
            step: this.current
        });
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;
        element.off(Metro.events.click, ".step");
        return element;
    }
};

Metro.plugin('stepper', Stepper);

var Storage = function(type){
    return new Storage.init(type);
};

Storage.prototype = {
    setKey: function(key){
        this.key = key
    },

    getKey: function(){
        return this.key;
    },

    setItem: function(key, value){
        this.storage.setItem(this.key + ":" + key, JSON.stringify(value));
    },

    getItem: function(key, default_value, reviver){
        var result, value;

        value = this.storage.getItem(this.key + ":" + key);

        try {
            result = JSON.parse(value, reviver);
        } catch (e) {
            result = null;
        }
        return Utils.nvl(result, default_value);
    },

    getItemPart: function(key, sub_key, default_value, reviver){
        var i;
        var val = this.getItem(key, default_value, reviver);

        sub_key = sub_key.split("->");
        for(i = 0; i < sub_key.length; i++) {
            val = val[sub_key[i]];
        }
        return val;
    },

    delItem: function(key){
        this.storage.removeItem(this.key + ":" + key)
    },

    size: function(unit){
        var divider;
        switch (unit) {
            case 'm':
            case 'M': {
                divider = 1024 * 1024;
                break;
            }
            case 'k':
            case 'K': {
                divider = 1024;
                break;
            }
            default: divider = 1;
        }
        return JSON.stringify(this.storage).length / divider;
    }
};

Storage.init = function(type){

    this.key = "";
    this.storage = type ? type : window.localStorage;

    return this;
};

Storage.init.prototype = Storage.prototype;

Metro['storage'] = Storage(window.localStorage);
Metro['session'] = Storage(window.sessionStorage);


var StreamerDefaultConfig = {
    wheel: false,
    duration: METRO_ANIMATION_DURATION,
    defaultClosedIcon: "",
    defaultOpenIcon: "",
    changeUri: true,
    encodeLink: true,
    closed: false,
    chromeNotice: false,
    startFrom: null,
    slideToStart: true,
    startSlideSleep: 1000,
    source: null,
    data: null,
    eventClick: "select",
    selectGlobal: true,
    streamSelect: false,
    excludeSelectElement: null,
    excludeClickElement: null,
    excludeElement: null,
    excludeSelectClass: "",
    excludeClickClass: "",
    excludeClass: "",

    onDataLoad: Metro.noop,
    onDataLoaded: Metro.noop,
    onDataLoadError: Metro.noop,

    onStreamClick: Metro.noop,
    onStreamSelect: Metro.noop,
    onEventClick: Metro.noop,
    onEventSelect: Metro.noop,
    onEventsScroll: Metro.noop,
    onStreamerCreate: Metro.noop
};

Metro.streamerSetup = function (options) {
    StreamerDefaultConfig = $.extend({}, StreamerDefaultConfig, options);
};

if (typeof window["metroStreamerSetup"] !== undefined) {
    Metro.streamerSetup(window["metroStreamerSetup"]);
}

var Streamer = {
    init: function( options, elem ) {
        this.options = $.extend( {}, StreamerDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.data = null;
        this.scroll = 0;
        this.scrollDir = "left";
        this.events = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        Metro.checkRuntime(element, "streamer");

        element.addClass("streamer");

        if (element.attr("id") === undefined) {
            element.attr("id", Utils.elementId("streamer"));
        }

        if (o.source === null && o.data === null) {
            return false;
        }

        $("<div>").addClass("streams").appendTo(element);
        $("<div>").addClass("events-area").appendTo(element);

        if (o.source !== null) {

            Utils.exec(o.onDataLoad, [o.source], element[0]);
            element.fire("dataload", {
                source: o.source
            });

            $.json(o.source).then(function(data){
                Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
                element.fire("dataloaded", {
                    source: o.source,
                    data: data
                });
                that.data = data;
                that.build();
            }, function(xhr){
                Utils.exec(o.onDataLoadError, [o.source, xhr], element[0]);
                element.fire("dataloaderror", {
                    source: o.source,
                    xhr: xhr
                });
            });
        } else {
            this.data = o.data;
            this.build();
        }

        if (o.chromeNotice === true && Utils.detectChrome() === true && Utils.isTouchDevice() === false) {
            $("<p>").addClass("text-small text-muted").html("*) In Chrome browser please press and hold Shift and turn the mouse wheel.").insertAfter(element);
        }
    },

    build: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var streams = element.find(".streams").html("");
        var events_area = element.find(".events-area").html("");
        var timeline = $("<ul>").addClass("streamer-timeline").html("").appendTo(events_area);
        var streamer_events = $("<div>").addClass("streamer-events").appendTo(events_area);
        var event_group_main = $("<div>").addClass("event-group").appendTo(streamer_events);
        var StreamerIDS = Utils.getURIParameter(null, "StreamerIDS");

        if (StreamerIDS !== null && o.encodeLink === true) {
            StreamerIDS = atob(StreamerIDS);
        }

        var StreamerIDS_i = StreamerIDS ? StreamerIDS.split("|")[0] : null;
        var StreamerIDS_a = StreamerIDS ? StreamerIDS.split("|")[1].split(",") : [];

        if (data.actions !== undefined) {
            var actions = $("<div>").addClass("streamer-actions").appendTo(streams);
            $.each(data.actions, function(){
                var item = this;
                var button = $("<button>").addClass("streamer-action").addClass(item.cls).html(item.html);
                if (item.onclick !== undefined) button.on(Metro.events.click, function(){
                    Utils.exec(item.onclick, [element]);
                });
                button.appendTo(actions);
            });
        }

        // Create timeline

        timeline.html("");

        if (data.timeline === undefined) {
            data.timeline = {
                start: "09:00",
                stop: "18:00",
                step: 20
            }
        }

        var start = new Date(), stop = new Date();
        var start_time_array = data.timeline.start ? data.timeline.start.split(":") : [9,0];
        var stop_time_array = data.timeline.stop ? data.timeline.stop.split(":") : [18,0];
        var step = data.timeline.step ? parseInt(data.timeline.step) * 60 : 1200;

        start.setHours(start_time_array[0]);
        start.setMinutes(start_time_array[1]);
        start.setSeconds(0);

        stop.setHours(stop_time_array[0]);
        stop.setMinutes(stop_time_array[1]);
        stop.setSeconds(0);

        for (var i = start.getTime()/1000; i <= stop.getTime()/1000; i += step) {
            var t = new Date(i * 1000);
            var h = t.getHours(), m = t.getMinutes();
            var v = (h < 10 ? "0"+h : h) + ":" + (m < 10 ? "0"+m : m);

            var li = $("<li>").data("time", v).addClass("js-time-point-" + v.replace(":", "-")).html("<em>"+v+"</em>").appendTo(timeline);
        }

        // -- End timeline creator

        if (data.streams !== undefined) {
            $.each(data.streams, function(stream_index){
                var stream_height = 75, rows = 0;
                var stream_item = this;
                var stream = $("<div>").addClass("stream").addClass(this.cls).appendTo(streams);
                stream
                    .addClass(stream_item.cls)
                    .data("one", false)
                    .data("data", stream_item.data);

                $("<div>").addClass("stream-title").html(stream_item.title).appendTo(stream);
                $("<div>").addClass("stream-secondary").html(stream_item.secondary).appendTo(stream);
                $(stream_item.icon).addClass("stream-icon").appendTo(stream);

                var bg = Utils.computedRgbToHex(Utils.getStyleOne(stream, "background-color"));
                var fg = Utils.computedRgbToHex(Utils.getStyleOne(stream, "color"));

                var stream_events = $("<div>").addClass("stream-events")
                    .data("background-color", bg)
                    .data("text-color", fg)
                    .appendTo(event_group_main);

                if (stream_item.events !== undefined) {
                    $.each(stream_item.events, function(event_index){
                        var event_item = this;
                        var row = event_item.row === undefined ? 1 : parseInt(event_item.row);
                        var _icon;
                        var sid = stream_index+":"+event_index;
                        var custom_html = event_item.custom !== undefined ? event_item.custom : "";
                        var custom_html_open = event_item.custom_open !== undefined ? event_item.custom_open : "";
                        var custom_html_close = event_item.custom_close !== undefined ? event_item.custom_close : "";
                        var event;

                        if (event_item.skip !== undefined && Utils.bool(event_item.skip)) {
                            return ;
                        }

                        event = $("<div>")
                            .data("origin", event_item)
                            .data("sid", sid)
                            .data("data", event_item.data)
                            .data("time", event_item.time)
                            .data("target", event_item.target)
                            .addClass("stream-event")
                            .addClass("size-"+event_item.size+"x")
                            .addClass(event_item.cls)
                            .appendTo(stream_events);


                        var left = timeline.find(".js-time-point-"+this.time.replace(":", "-"))[0].offsetLeft - stream.outerWidth();
                        var top = 75 * (row - 1);

                        if (row > rows) {
                            rows = row;
                        }

                        event.css({
                            position: "absolute",
                            left: left,
                            top: top
                        });


                        if (Utils.isNull(event_item.html)) {

                            var slide = $("<div>").addClass("stream-event-slide").appendTo(event);
                            var slide_logo = $("<div>").addClass("slide-logo").appendTo(slide);
                            var slide_data = $("<div>").addClass("slide-data").appendTo(slide);

                            if (event_item.icon !== undefined) {
                                if (Utils.isTag(event_item.icon)) {
                                    $(event_item.icon).addClass("icon").appendTo(slide_logo);
                                } else {
                                    $("<img>").addClass("icon").attr("src", event_item.icon).appendTo(slide_logo);
                                }
                            }

                            $("<span>").addClass("time").css({
                                backgroundColor: bg,
                                color: fg
                            }).html(event_item.time).appendTo(slide_logo);

                            $("<div>").addClass("title").html(event_item.title).appendTo(slide_data);
                            $("<div>").addClass("subtitle").html(event_item.subtitle).appendTo(slide_data);
                            $("<div>").addClass("desc").html(event_item.desc).appendTo(slide_data);

                            if (o.closed === false && (element.attr("id") === StreamerIDS_i && StreamerIDS_a.indexOf(sid) !== -1) || event_item.selected === true || parseInt(event_item.selected) === 1) {
                                event.addClass("selected");
                            }

                            if (o.closed === true || event_item.closed === true || parseInt(event_item.closed) === 1) {
                                _icon = event_item.closedIcon !== undefined ? Utils.isTag(event_item.closedIcon) ? event_item.closedIcon : "<span>" + event_item.closedIcon + "</span>" : Utils.isTag(o.defaultClosedIcon) ? o.defaultClosedIcon : "<span>" + o.defaultClosedIcon + "</span>";
                                $(_icon).addClass("state-icon").addClass(event_item.clsClosedIcon).appendTo(slide);
                                event
                                    .data("closed", true)
                                    .data("target", event_item.target);
                                event.append(custom_html_open);
                            } else {
                                _icon = event_item.openIcon !== undefined ? Utils.isTag(event_item.openIcon) ? event_item.openIcon : "<span>" + event_item.openIcon + "</span>" : Utils.isTag(o.defaultOpenIcon) ? o.defaultOpenIcon : "<span>" + o.defaultOpenIcon + "</span>";
                                $(_icon).addClass("state-icon").addClass(event_item.clsOpenIcon).appendTo(slide);
                                event
                                    .data("closed", false);
                                event.append(custom_html_close);
                            }

                            event.append(custom_html);
                        } else {
                            event.html(event_item.html);
                        }
                    });

                    var last_child = stream_events.find(".stream-event").last();
                    if (last_child.length > 0) stream_events.outerWidth(last_child[0].offsetLeft + last_child.outerWidth());
                }

                stream_events.css({
                    height: stream_height * rows
                });

                element.find(".stream").eq(stream_events.index()).css({
                    height: stream_height * rows
                })
            });
        }

        if (data.global !== undefined) {
            $.each(['before', 'after'], function(){
                var global_item = this;
                if (data.global[global_item] !== undefined) {
                    $.each(data.global[global_item], function(){
                        var event_item = this;
                        var group = $("<div>").addClass("event-group").addClass("size-"+event_item.size+"x");
                        var events = $("<div>").addClass("stream-events global-stream").appendTo(group);
                        var event = $("<div>").addClass("stream-event").appendTo(events);
                        event
                            .addClass("global-event")
                            .addClass(event_item.cls)
                            .data("time", event_item.time)
                            .data("origin", event_item)
                            .data("data", event_item.data);

                        $("<div>").addClass("event-title").html(event_item.title).appendTo(event);
                        $("<div>").addClass("event-subtitle").html(event_item.subtitle).appendTo(event);
                        $("<div>").addClass("event-html").html(event_item.html).appendTo(event);

                        var left, t = timeline.find(".js-time-point-"+this.time.replace(":", "-"));

                        if (t.length > 0) left = t[0].offsetLeft - streams.find(".stream").outerWidth();
                        group.css({
                            position: "absolute",
                            left: left,
                            height: "100%"
                        }).appendTo(streamer_events);
                    });
                }
            });
        }

        element.data("stream", -1);
        element.find(".events-area").scrollLeft(0);

        this.events = element.find(".stream-event");

        this._createEvents();

        if (o.startFrom !== null && o.slideToStart === true) {
            setTimeout(function(){
                that.slideTo(o.startFrom);
            }, o.startSlideSleep);
        }

        Utils.exec(o.onStreamerCreate, null, element[0]);
        element.fire("streamercreate");

        this._fireScroll();
    },

    _fireScroll: function(){
        var that = this, element = this.element, o = this.options;
        var scrollable = element.find(".events-area");
        var oldScroll = this.scroll;

        if (scrollable.length === 0) {
            return undefined;
        }

        this.scrollDir = this.scroll < scrollable[0].scrollLeft ? "left" : "right";
        this.scroll = scrollable[0].scrollLeft;

        Utils.exec(o.onEventsScroll, [scrollable[0].scrollLeft, oldScroll, this.scrollDir, $.toArray(this.events)], element[0]);

        element.fire("eventsscroll", {
            scrollLeft: scrollable[0].scrollLeft,
            oldScroll: oldScroll,
            scrollDir: that.scrollDir,
            events: $.toArray(this.events)
        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.off(Metro.events.click, ".stream-event").on(Metro.events.click, ".stream-event", function(e){
            var event = $(this);

            if (o.excludeClass !== "" && event.hasClass(o.excludeClass)) {
                return ;
            }

            if (o.excludeElement !== null && $(e.target).is(o.excludeElement)) {
                return ;
            }

            if (o.closed === false && event.data("closed") !== true && o.eventClick === 'select') {

                if (o.excludeSelectClass !== "" && event.hasClass(o.excludeSelectClass)) {

                } else {
                    if (o.excludeSelectElement !== null && $(e.target).is(o.excludeSelectElement)) {

                    } else {
                        if (event.hasClass("global-event")) {
                            if (o.selectGlobal === true) {
                                event.toggleClass("selected");
                            }
                        } else {
                            event.toggleClass("selected");
                        }
                        if (o.changeUri === true) {
                            that._changeURI();
                        }
                        Utils.exec(o.onEventSelect, [event[0], event.hasClass("selected")], element[0]);
                        element.fire("eventselect", {
                            event: event[0],
                            selected: event.hasClass("selected")
                        });
                    }
                }
            } else {
                if (o.excludeClickClass !== "" && event.hasClass(o.excludeClickClass)) {

                } else {

                    if (o.excludeClickElement !== null && $(e.target).is(o.excludeClickElement)) {

                    } else {

                        Utils.exec(o.onEventClick, [event[0]], element[0]);
                        element.fire("eventclick", {
                            event: event[0]
                        });

                        if (o.closed === true || event.data("closed") === true) {
                            var target = event.data("target");
                            if (target) {
                                window.location.href = target;
                            }
                        }

                    }
                }
            }
        });

        element.off(Metro.events.click, ".stream").on(Metro.events.click, ".stream", function(e){
            var stream = $(this);
            var index = stream.index();

            if (o.streamSelect === false) {
                return;
            }

            if (element.data("stream") === index) {
                element.find(".stream-event").removeClass("disabled");
                element.data("stream", -1);
            } else {
                element.data("stream", index);
                element.find(".stream-event").addClass("disabled");
                that.enableStream(stream);
                Utils.exec(o.onStreamSelect, [stream], element[0]);
                element.fire("streamselect", {
                    stream: stream
                });
            }

            Utils.exec(o.onStreamClick, [stream], element[0]);
            element.fire("streamclick", {
                stream: stream
            });
        });

        if (o.wheel === true) {
            element.find(".events-area").off(Metro.events.mousewheel);
            element.find(".events-area").on(Metro.events.mousewheel, function(e) {
                var scroll, scrollable = $(this);
                var ev = e.originalEvent;
                var dir = ev.deltaY < 0 ? -1 : 1;
                var step = 100;

                //console.log(ev.deltaY);

                if (ev.deltaY === undefined) {
                    return ;
                }

                scroll = scrollable.scrollLeft() - ( dir * step);
                scrollable.scrollLeft(scroll);

                ev.preventDefault();
            });
        }

        element.find(".events-area").last().off("scroll");
        element.find(".events-area").last().on("scroll", function(e){
            that._fireScroll();
        });

        if (Utils.isTouchDevice() === true) {
            element.off(Metro.events.click, ".stream").on(Metro.events.click, ".stream", function(){
                var stream = $(this);
                stream.toggleClass("focused");
                $.each(element.find(".stream"), function () {
                    if ($(this).is(stream)) return ;
                    $(this).removeClass("focused");
                })
            })
        }
    },

    _changeURI: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var link = this.getLink();
        history.pushState({}, document.title, link);
    },

    slideTo: function(time){
        var that = this, element = this.element, o = this.options, data = this.data;
        var target;
        if (time === undefined) {
            target = $(element.find(".streamer-timeline li")[0]);
        } else {
            target = $(element.find(".streamer-timeline .js-time-point-" + time.replace(":", "-"))[0]);
        }

        element.find(".events-area").animate({
            scrollLeft: target[0].offsetLeft - element.find(".streams .stream").outerWidth()
        }, o.duration);
    },

    enableStream: function(stream){
        var that = this, element = this.element, o = this.options, data = this.data;
        var index = stream.index()-1;
        stream.removeClass("disabled").data("streamDisabled", false);
        element.find(".stream-events").eq(index).find(".stream-event").removeClass("disabled");
    },

    disableStream: function(stream){
        var that = this, element = this.element, o = this.options, data = this.data;
        var index = stream.index()-1;
        stream.addClass("disabled").data("streamDisabled", true);
        element.find(".stream-events").eq(index).find(".stream-event").addClass("disabled");
    },

    toggleStream: function(stream){
        if (stream.data("streamDisabled") === true) {
            this.enableStream(stream);
        } else {
            this.disableStream(stream);
        }
    },

    getLink: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var events = element.find(".stream-event");
        var a = [];
        var link;
        var origin = window.location.href;

        $.each(events, function(){
            var event = $(this);
            if (event.data("sid") === undefined || !event.hasClass("selected")) {
                return;
            }

            a.push(event.data("sid"));
        });

        link = element.attr("id") + "|" + a.join(",");

        if (o.encodeLink === true) {
            link = btoa(link);
        }

        return Utils.updateURIParameter(origin, "StreamerIDS", link);
    },

    getTimes: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var times = element.find(".streamer-timeline > li");
        var result = [];
        $.each(times, function(){
            result.push($(this).data("time"));
        });
        return result;
    },

    getEvents: function(event_type, include_global){
        var that = this, element = this.element, o = this.options, data = this.data;
        var items, events = [];

        switch (event_type) {
            case "selected": items = element.find(".stream-event.selected"); break;
            case "non-selected": items = element.find(".stream-event:not(.selected)"); break;
            default: items = element.find(".stream-event");
        }

        $.each(items, function(){
            var item = $(this);
            var origin;

            if (include_global !== true && item.parent().hasClass("global-stream")) return ;

            origin = item.data("origin");

            events.push(origin);
        });

        return events;
    },

    source: function(s){
        var that = this, element = this.element, o = this.options;

        if (s === undefined) {
            return this.options.source;
        }

        element.attr("data-source", s);

        this.options.source = s;
        this.changeSource();
    },

    dataSet: function(s){
        if (s === undefined) {
            return this.options.data;
        }

        this.options.data = s;
        this.changeData(s);
    },

    getStreamerData: function(){
        return this.data;
    },

    toggleEvent: function(event){
        var that = this, element = this.element, o = this.options, data = this.data;
        event = $(event);

        if (event.hasClass("global-event") && o.selectGlobal !== true) {
            return ;
        }

        if (event.hasClass("selected")) {
            this.selectEvent(event, false);
        } else {
            this.selectEvent(event, true);
        }
    },

    selectEvent: function(event, state){
        var that = this, element = this.element, o = this.options, data = this.data;
        if (state === undefined) {
            state = true;
        }
        event = $(event);

        if (event.hasClass("global-event") && o.selectGlobal !== true) {
            return ;
        }

        if (state === true) event.addClass("selected"); else event.removeClass("selected");

        if (o.changeUri === true) {
            that._changeURI();
        }
        Utils.exec(o.onEventSelect, [event[0], state], element[0]);
        element.fire("eventselect", {
            event: event[0],
            selected: state
        });
    },

    changeSource: function(){
        var that = this, element = this.element, o = this.options, data = this.data;
        var new_source = element.attr("data-source");

        if (String(new_source).trim() === "") {
            return ;
        }

        o.source = new_source;

        Utils.exec(o.onDataLoad, [o.source], element[0]);
        element.fire("dataload", {
            source: o.source
        });

        $.json(o.source).then(function(data){
            Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
            element.fire("dataloaded", {
                source: o.source,
                data: data
            });
            that.data = data;
            that.build();
        }, function(xhr){
            Utils.exec(o.onDataLoadError, [o.source, xhr], element[0]);
            element.fire("dataloaderror", {
                source: o.source,
                xhr: xhr
            });
        });

        element.fire("sourcechange");
    },

    changeData: function(data){
        var that = this, element = this.element, o = this.options;
        var old_data = this.data;

        o.data =  typeof data === 'object' ? data : JSON.parse(element.attr("data-data"));

        this.data = o.data;

        this.build();

        element.fire("datachange", {
            oldData: old_data,
            newData: o.data
        });
    },

    changeStreamSelectOption: function(){
        var that = this, element = this.element, o = this.options, data = this.data;

        o.streamSelect = element.attr("data-stream-select").toLowerCase() === "true";
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-source': this.changeSource(); break;
            case 'data-data': this.changeData(); break;
            case 'data-stream-select': this.changeStreamSelectOption(); break;
        }
    },

    destroy: function(){
        var element = this.element;

        element.off(Metro.events.click, ".stream-event");
        element.off(Metro.events.click, ".stream");
        element.find(".events-area").off(Metro.events.mousewheel);
        element.find(".events-area").last().off("scroll");
        // element.off(Metro.events.click, ".stream");

        return element;
    }
};

Metro.plugin('streamer', Streamer);

var SwitchDefaultConfig = {
    material: false,
    transition: true,
    caption: "",
    captionPosition: "right",
    clsSwitch: "",
    clsCheck: "",
    clsCaption: "",
    onSwitchCreate: Metro.noop
};

Metro.switchSetup = function (options) {
    SwitchDefaultConfig = $.extend({}, SwitchDefaultConfig, options);
};

if (typeof window["metroSwitchSetup"] !== undefined) {
    Metro.switchSetup(window["metroSwitchSetup"]);
}

var Switch = {
    init: function( options, elem ) {
        this.options = $.extend( {}, SwitchDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;
        var container = $("<label>").addClass((o.material === true ? " switch-material " : " switch ") + element[0].className);
        var check = $("<span>").addClass("check");
        var caption = $("<span>").addClass("caption").html(o.caption);

        Metro.checkRuntime(element, "switch");

        element.attr("type", "checkbox");

        container.insertBefore(element);
        element.appendTo(container);
        check.appendTo(container);
        caption.appendTo(container);

        if (o.transition === true) {
            container.addClass("transition-on");
        }

        if (o.captionPosition === 'left') {
            container.addClass("caption-left");
        }

        element[0].className = '';

        container.addClass(o.clsSwitch);
        caption.addClass(o.clsCaption);
        check.addClass(o.clsCheck);

        if (element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }

        Utils.exec(o.onSwitchCreate, null, element[0]);
        element.fire("switchcreate");
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    },

    destroy: function(){
        return this.element;
    }
};

Metro.plugin('switch', Switch);

var TableDefaultConfig = {
    emptyTableTitle: "Nothing to show",
    templateBeginToken: "<%",
    templateEndToken: "%>",
    paginationDistance: 5,

    locale: METRO_LOCALE,

    horizontalScroll: false,
    horizontalScrollStop: null,
    check: false,
    checkType: "checkbox",
    checkStyle: 1,
    checkColIndex: 0,
    checkName: null,
    checkStoreKey: "TABLE:$1:KEYS",
    rownum: false,
    rownumTitle: "#",

    filters: null,
    filtersOperator: "and",

    source: null,

    searchMinLength: 1,
    searchThreshold: 500,
    searchFields: null,

    showRowsSteps: true,
    showSearch: true,
    showTableInfo: true,
    showPagination: true,
    paginationShortMode: true,
    showActivity: true,
    muteTable: true,

    rows: 10,
    rowsSteps: "10,25,50,100",

    staticView: false,
    viewSaveMode: "client",
    viewSavePath: "TABLE:$1:OPTIONS",

    sortDir: "asc",
    decimalSeparator: ".",
    thousandSeparator: ",",

    tableRowsCountTitle: "Show entries:",
    tableSearchTitle: "Search:",
    tableInfoTitle: "Showing $1 to $2 of $3 entries",
    paginationPrevTitle: "Prev",
    paginationNextTitle: "Next",
    allRecordsTitle: "All",
    inspectorTitle: "Inspector",

    activityType: "cycle",
    activityStyle: "color",
    activityTimeout: 100,

    searchWrapper: null,
    rowsWrapper: null,
    infoWrapper: null,
    paginationWrapper: null,

    cellWrapper: true,

    clsComponent: "",
    clsTableContainer: "",
    clsTable: "",

    clsHead: "",
    clsHeadRow: "",
    clsHeadCell: "",

    clsBody: "",
    clsBodyRow: "",
    clsBodyCell: "",
    clsCellWrapper: "",

    clsFooter: "",
    clsFooterRow: "",
    clsFooterCell: "",

    clsTableTop: "",
    clsRowsCount: "",
    clsSearch: "",

    clsTableBottom: "",
    clsTableInfo: "",
    clsTablePagination: "",

    clsPagination: "",

    clsEvenRow: "",
    clsOddRow: "",
    clsRow: "",

    clsEmptyTableTitle: "",

    onDraw: Metro.noop,
    onDrawRow: Metro.noop,
    onDrawCell: Metro.noop,
    onAppendRow: Metro.noop,
    onAppendCell: Metro.noop,
    onSortStart: Metro.noop,
    onSortStop: Metro.noop,
    onSortItemSwitch: Metro.noop,
    onSearch: Metro.noop,
    onRowsCountChange: Metro.noop,
    onDataLoad: Metro.noop,
    onDataLoadError: Metro.noop,
    onDataLoaded: Metro.noop,
    onFilterRowAccepted: Metro.noop,
    onFilterRowDeclined: Metro.noop,
    onCheckClick: Metro.noop,
    onCheckClickAll: Metro.noop,
    onCheckDraw: Metro.noop,
    onViewSave: Metro.noop,
    onViewGet: Metro.noop,
    onViewCreated: Metro.noop,
    onTableCreate: Metro.noop
};

Metro.tableSetup = function(options){
    TableDefaultConfig = $.extend({}, TableDefaultConfig, options);
};

if (typeof window["metroTableSetup"] !== undefined) {
    Metro.tableSetup(window["metroTableSetup"]);
}

var Table = {
    init: function( options, elem ) {
        this.options = $.extend( {}, TableDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.currentPage = 1;
        this.pagesCount = 1;
        this.searchString = "";
        this.data = null;
        this.activity = null;
        this.busy = false;
        this.filters = [];
        this.wrapperInfo = null;
        this.wrapperSearch = null;
        this.wrapperRows = null;
        this.wrapperPagination = null;
        this.filterIndex = null;
        this.filtersIndexes = [];
        this.component = null;
        this.inspector = null;
        this.view = {};
        this.viewDefault = {};
        this.locale = Metro.locales["en-US"];
        this.input_interval = null;
        this.searchFields = [];

        this.sort = {
            dir: "asc",
            colIndex: 0
        };

        this.service = [];
        this.heads = [];
        this.items = [];
        this.foots = [];

        this.filteredItems = [];

        this.index = {};

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var id = Utils.elementId("table");

        Metro.checkRuntime(element, "table");

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", id);
        }

        if (Utils.isValue(Metro.locales[o.locale])) {
            this.locale = Metro.locales[o.locale];
        }

        if (Utils.isValue(o.searchFields)) {
            this.searchFields = Utils.strToArray(o.searchFields);
        }

        if (o.source !== null) {
            Utils.exec(o.onDataLoad, [o.source], element[0]);
            element.fire("dataload", {
                source: o.source
            });

            $.json(o.source).then(function(data){
                if (typeof data !== "object") {
                    throw new Error("Data for table is not a object");
                }
                Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
                element.fire("dataloaded", {
                    source: o.source,
                    data: data
                });
                that._build(data);
            }, function(xhr){
                Utils.exec(o.onDataLoadError, [o.source, xhr], element[0]);
                element.fire("dataloaderror", {
                    source: o.source,
                    xhr: xhr
                })
            });
        } else {
            that._build();
        }
    },

    _createIndex: function(){
        var that = this, colIndex = this.options.checkColIndex;
        setImmediate(function(){
            that.items.forEach(function(v, i){
                that.index[v[colIndex]] = i;
            });
        });
    },

    _build: function(data){
        var that = this, element = this.element, o = this.options;
        var view, id = element.attr("id");

        o.rows = parseInt(o.rows);

        this.items = [];
        this.heads = [];
        this.foots = [];

        if (Utils.isValue(data)) {
            this._createItemsFromJSON(data);
        } else {
            this._createItemsFromHTML()
        }

        // Create index
        this._createIndex();

        this.view = this._createView();
        this.viewDefault = Utils.objectClone(this.view);

        if (o.viewSaveMode.toLowerCase() === "client") {
            view = Metro.storage.getItem(o.viewSavePath.replace("$1", id));
            if (Utils.isValue(view) && Utils.objectLength(view) === Utils.objectLength(this.view)) {
                this.view = view;
                Utils.exec(o.onViewGet, [view], element[0]);
                element.fire("viewget", {
                    source: "client",
                    view: view
                });
            }
            this._final();
        } else {

            $.json(
                o.viewSavePath,
                {
                    id: id
                })
            .then(function(view){
                if (Utils.isValue(view) && Utils.objectLength(view) === Utils.objectLength(that.view)) {
                    that.view = view;
                    Utils.exec(o.onViewGet, [view], element[0]);
                    element.fire("viewget", {
                        source: "server",
                        view: view
                    });
                }
                that._final();
            }, function(){
                that._final();
                console.log("Warning! Error loading view for table " + element.attr('id') + " ");
            });
        }
    },

    _final: function(){
        var element = this.element, o = this.options;
        var id = element.attr("id");

        Metro.storage.delItem(o.checkStoreKey.replace("$1", id));

        this._service();
        this._createStructure();
        this._createInspector();
        this._createEvents();

        Utils.exec(o.onTableCreate, [element], element[0]);

        element.fire("tablecreate");
    },

    _service: function(){
        var o = this.options;

        this.service = [
            {
                // Rownum
                title: o.rownumTitle,
                format: undefined,
                name: undefined,
                sortable: false,
                sortDir: undefined,
                clsColumn: "rownum-cell " + (o.rownum !== true ? "d-none" : ""),
                cls: "rownum-cell " + (o.rownum !== true ? "d-none" : ""),
                colspan: undefined,
                type: "rownum"
            },
            {
                // Check
                title: o.checkType === "checkbox" ? "<input type='checkbox' data-role='checkbox' class='table-service-check-all' data-style='"+o.checkStyle+"'>" : "",
                format: undefined,
                name: undefined,
                sortable: false,
                sortDir: undefined,
                clsColumn: "check-cell " + (o.check !== true ? "d-none" : ""),
                cls: "check-cell "+(o.check !== true ? "d-none" : ""),
                colspan: undefined,
                type: "rowcheck"
            }
        ];
    },

    _createView: function(){
        var view, element = this.element, o = this.options;

        view = {};

        $.each(this.heads, function(i){

            if (Utils.isValue(this.cls)) {this.cls = this.cls.replace("hidden", "");}
            if (Utils.isValue(this.clsColumn)) {this.clsColumn = this.clsColumn.replace("hidden", "");}

            view[i] = {
                "index": i,
                "index-view": i,
                "show": !Utils.isValue(this.show) ? true : this.show,
                "size": Utils.isValue(this.size) ? this.size : ""
            }
        });

        Utils.exec(o.onViewCreated, [view], view);
        element.fire("viewcreated", {
            view: view
        });
        return view;
    },

    _createInspectorItems: function(table){
        var that = this, o = this.options;
        var j, tds = [], row;
        var cells = this.heads;

        table.html("");

        for (j = 0; j < cells.length; j++){
            tds[j] = null;
        }

        $.each(cells, function(i){
            row = $("<tr>");
            row.data('index', i);
            row.data('index-view', i);
            $("<td>").html("<input type='checkbox' data-style='"+o.checkStyle+"' data-role='checkbox' name='column_show_check[]' value='"+i+"' "+(Utils.bool(that.view[i]['show']) ? "checked" : "")+">").appendTo(row);
            $("<td>").html(this.title).appendTo(row);
            $("<td>").html("<input type='number' data-role='spinner' name='column_size' value='"+that.view[i]['size']+"' data-index='"+i+"'>").appendTo(row);
            $("<td>").html("" +
                "<button class='button square js-table-inspector-field-up' type='button'><span class='mif-arrow-up'></span></button>" +
                "<button class='button square js-table-inspector-field-down' type='button'><span class='mif-arrow-down'></span></button>" +
                "").appendTo(row);
            tds[that.view[i]['index-view']] = row;
        });

        //
        for (j = 0; j < cells.length; j++){
            tds[j].appendTo(table);
        }
    },

    _createInspector: function(){
        var o = this.options;
        var inspector, table_wrap, table, tbody, actions;

        inspector = $("<div data-role='draggable' data-drag-element='.table-inspector-header' data-drag-area='body'>").addClass("table-inspector");
        inspector.attr("for", this.element.attr("id"));

        $("<div class='table-inspector-header'>"+o.inspectorTitle+"</div>").appendTo(inspector);

        table_wrap = $("<div>").addClass("table-wrap").appendTo(inspector);

        table = $("<table>").addClass("table subcompact");
        tbody = $("<tbody>").appendTo(table);

        table.appendTo(table_wrap);

        this._createInspectorItems(tbody);

        actions = $("<div class='table-inspector-actions'>").appendTo(inspector);
        $("<button class='button primary js-table-inspector-save' type='button'>").html(this.locale.buttons.save).appendTo(actions);
        $("<button class='button secondary js-table-inspector-reset ml-2 mr-2' type='button'>").html(this.locale.buttons.reset).appendTo(actions);
        $("<button class='button link js-table-inspector-cancel place-right' type='button'>").html(this.locale.buttons.cancel).appendTo(actions);

        inspector.data("open", false);
        this.inspector = inspector;

        $("body").append(inspector);

        this._createInspectorEvents();
    },

    _resetInspector: function(){
        var inspector = this.inspector;
        var table = inspector.find("table tbody");
        this._createInspectorItems(table);
        this._createInspectorEvents();
    },

    _createHeadsFormHTML: function(){
        var that = this, element = this.element;
        var head = element.find("thead");

        if (head.length > 0) $.each(head.find("tr > *"), function(){
            var item = $(this);
            var dir, head_item, item_class;

            if (Utils.isValue(item.data('sort-dir'))) {
                dir = item.data('sort-dir');
            } else {
                if (item.hasClass("sort-asc")) {
                    dir = "asc";
                } else if (item.hasClass("sort-desc")) {
                    dir = "desc"
                } else {
                    dir = undefined;
                }
            }

            item_class = item[0].className.replace("sortable-column", "");
            item_class = item_class.replace("sort-asc", "");
            item_class = item_class.replace("sort-desc", "");
            item_class = item_class.replace("hidden", "");

            head_item = {
                type: "data",
                title: item.html(),
                name: Utils.isValue(item.data("name")) ? item.data("name") : item.text().replace(" ", "_"),
                sortable: item.hasClass("sortable-column") || (Utils.isValue(item.data('sortable')) && JSON.parse(item.data('sortable') === true)),
                sortDir: dir,
                format: Utils.isValue(item.data("format")) ? item.data("format") : "string",
                clsColumn: Utils.isValue(item.data("cls-column")) ? item.data("cls-column") : "",
                cls: item_class,
                colspan: item.attr("colspan"),
                size: Utils.isValue(item.data("size")) ? item.data("size") : "",
                show: !(item.hasClass("hidden") || (Utils.isValue(item.data('show')) && JSON.parse(item.data('show')) === false)),

                required: Utils.isValue(item.data("required")) ? JSON.parse(item.data("required")) === true  : false,
                field: Utils.isValue(item.data("field")) ? item.data("field") : "input",
                fieldType: Utils.isValue(item.data("field-type")) ? item.data("field-type") : "text",
                validator: Utils.isValue(item.data("validator")) ? item.data("validator") : null,

                template: Utils.isValue(item.data("template")) ? item.data("template") : null
            };
            that.heads.push(head_item);
        });
    },

    _createFootsFromHTML: function(){
        var that = this, element = this.element;
        var foot = element.find("tfoot");

        if (foot.length > 0) $.each(foot.find("tr > *"), function(){
            var item = $(this);
            var foot_item;

            foot_item = {
                title: item.html(),
                name: Utils.isValue(item.data("name")) ? item.data("name") : false,
                cls: item[0].className,
                colspan: item.attr("colspan")
            };

            that.foots.push(foot_item);
        });
    },

    _createItemsFromHTML: function(){
        var that = this, element = this.element;
        var body = element.find("tbody");

        if (body.length > 0) $.each(body.find("tr"), function(){
            var row = $(this);
            var tr = [];
            $.each(row.children("td"), function(){
                var td = $(this);
                tr.push(td.html());
            });
            that.items.push(tr);
        });

        this._createHeadsFormHTML();
        this._createFootsFromHTML();
    },

    _createItemsFromJSON: function(source){
        var that = this;

        if (typeof source === "string") {
            source = JSON.parse(source);
        }

        if (source.header !== undefined) {
            that.heads = source.header;
        } else {
            this._createHeadsFormHTML();
        }

        if (source.data !== undefined) {
            $.each(source.data, function(){
                var row = this;
                var tr = [];
                $.each(row, function(){
                    var td = this;
                    tr.push(td);
                });
                that.items.push(tr);
            });
        }

        if (source.footer !== undefined) {
            this.foots = source.footer;
        } else {
            this._createFootsFromHTML();
        }
    },

    _createTableHeader: function(){
        var element = this.element, o = this.options;
        var head = $("<thead>").html('');
        var tr, th, tds = [], j, cells;
        var view = o.staticView ? this._createView() : this.view;

        element.find("thead").remove();

        head.addClass(o.clsHead);

        if (this.heads.length === 0) {
            return head;
        }

        tr = $("<tr>").addClass(o.clsHeadRow).appendTo(head);

        $.each(this.service, function(){
            var item = this, classes = [];
            th = $("<th>").appendTo(tr);
            if (Utils.isValue(item.title)) {th.html(item.title);}
            if (Utils.isValue(item.size)) {th.css({width: item.size});}
            if (Utils.isValue(item.cls)) {classes.push(item.cls);}
            classes.push(o.clsHeadCell);
            th.addClass(classes.join(" "));
        });

        cells = this.heads;

        for (j = 0; j < cells.length; j++){
            tds[j] = null;
        }

        $.each(cells, function(cell_index){
            var item = this;
            var classes = [];

            th = $("<th>");
            th.data("index", cell_index);

            if (Utils.isValue(item.title)) {th.html(item.title);}
            if (Utils.isValue(item.format)) {th.attr("data-format", item.format);}
            if (Utils.isValue(item.name)) {th.attr("data-name", item.name);}
            if (Utils.isValue(item.colspan)) {th.attr("colspan", item.colspan);}
            if (Utils.isValue(view[cell_index]['size'])) {th.css({width: view[cell_index]['size']});}
            if (item.sortable === true) {
                classes.push("sortable-column");

                if (Utils.isValue(item.sortDir)) {
                    classes.push("sort-" + item.sortDir);
                }
            }
            if (Utils.isValue(item.cls)) {
                $.each(item.cls.toArray(), function () {
                    classes.push(this);
                });
            }
            if (Utils.bool(view[cell_index]['show']) === false) {
                if (classes.indexOf('hidden') === -1) classes.push("hidden");
            }

            classes.push(o.clsHeadCell);

            if (Utils.bool(view[cell_index]['show'])) {
                Utils.arrayDelete(classes, "hidden");
            }

            th.addClass(classes.join(" "));

            tds[view[cell_index]['index-view']] = th;
        });

        for (j = 0; j < cells.length; j++){
            tds[j].appendTo(tr);
        }

        element.prepend(head);
    },

    _createTableBody: function(){
        var body, head, element = this.element;

        head  = element.find("thead");
        element.find("tbody").remove();
        body = $("<tbody>").addClass(this.options.clsBody);
        body.insertAfter(head);
    },

    _createTableFooter: function(){
        var element = this.element, o = this.options;
        var foot = $("<tfoot>").addClass(o.clsFooter);
        var tr, th;

        element.find("tfoot").remove();

        if (this.foots.length === 0) {
            element.append(foot);
            return;
        }

        tr = $("<tr>").addClass(o.clsHeadRow).appendTo(foot);
        $.each(this.foots, function(){
            var item = this;
            th = $("<th>").appendTo(tr);

            if (item.title !== undefined) {
                th.html(item.title);
            }

            if (item.name !== undefined) {
                th.addClass("foot-column-name-" + item.name);
            }

            if (item.cls !== undefined) {
                th.addClass(item.cls);
            }

            if (Utils.isValue(item.colspan)) {
                th.attr("colspan", item.colspan);
            }

            th.appendTo(tr);
        });

        element.append(foot);
    },

    _createTopBlock: function (){
        var that = this, element = this.element, o = this.options;
        var top_block = $("<div>").addClass("table-top").addClass(o.clsTableTop).insertBefore(element.parent());
        var search_block, search_input, rows_block, rows_select;

        search_block = Utils.isValue(this.wrapperSearch) ? this.wrapperSearch : $("<div>").addClass("table-search-block").addClass(o.clsSearch).appendTo(top_block);
        search_block.addClass(o.clsSearch);

        search_input = $("<input>").attr("type", "text").appendTo(search_block);
        search_input.input({
            prepend: o.tableSearchTitle
        });

        if (o.showSearch !== true) {
            search_block.hide();
        }

        rows_block = Utils.isValue(this.wrapperRows) ? this.wrapperRows : $("<div>").addClass("table-rows-block").appendTo(top_block);
        rows_block.addClass(o.clsRowsCount);

        rows_select = $("<select>").appendTo(rows_block);
        $.each(Utils.strToArray(o.rowsSteps), function () {
            var val = parseInt(this);
            var option = $("<option>").attr("value", val).text(val === -1 ? o.allRecordsTitle : val).appendTo(rows_select);
            if (val === parseInt(o.rows)) {
                option.attr("selected", "selected");
            }
        });
        rows_select.select({
            filter: false,
            prepend: o.tableRowsCountTitle,
            onChange: function (val) {
                val = parseInt(val);
                if (val === parseInt(o.rows)) {
                    return;
                }
                o.rows = val;
                that.currentPage = 1;
                that._draw();
                Utils.exec(o.onRowsCountChange, [val], element[0]);
                element.fire("rowscountchange", {
                    val: val
                });
            }
        });

        if (o.showRowsSteps !== true) {
            rows_block.hide();
        }

        return top_block;
    },

    _createBottomBlock: function (){
        var element = this.element, o = this.options;
        var bottom_block = $("<div>").addClass("table-bottom").addClass(o.clsTableBottom).insertAfter(element.parent());
        var info, pagination;

        info = Utils.isValue(this.wrapperInfo) ? this.wrapperInfo : $("<div>").addClass("table-info").appendTo(bottom_block);
        info.addClass(o.clsTableInfo);
        if (o.showTableInfo !== true) {
            info.hide();
        }

        pagination = Utils.isValue(this.wrapperPagination) ? this.wrapperPagination : $("<div>").addClass("table-pagination").appendTo(bottom_block);
        pagination.addClass(o.clsTablePagination);
        if (o.showPagination !== true) {
            pagination.hide();
        }

        return bottom_block;
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var table_container, table_component, columns;
        var w_search = $(o.searchWrapper), w_info = $(o.infoWrapper), w_rows = $(o.rowsWrapper), w_paging = $(o.paginationWrapper);

        if (w_search.length > 0) {this.wrapperSearch = w_search;}
        if (w_info.length > 0) {this.wrapperInfo = w_info;}
        if (w_rows.length > 0) {this.wrapperRows = w_rows;}
        if (w_paging.length > 0) {this.wrapperPagination = w_paging;}

        table_component = $("<div>").addClass("table-component");
        table_component.attr("id", Utils.elementId("table"));
        table_component.insertBefore(element);

        table_container = $("<div>").addClass("table-container").addClass(o.clsTableContainer).appendTo(table_component);
        element.appendTo(table_container);

        if (o.horizontalScroll === true) {
            table_container.addClass("horizontal-scroll");
        }
        if (!Utils.isNull(o.horizontalScrollStop) && Utils.mediaExist(o.horizontalScrollStop)) {
            table_container.removeClass("horizontal-scroll");
        }

        table_component.addClass(o.clsComponent);

        this.activity =  $("<div>").addClass("table-progress").appendTo(table_component);
        $("<div>").activity({
            type: o.activityType,
            style: o.activityStyle
        }).appendTo(this.activity);

        if (o.showActivity !== true) {
            this.activity.css({
                visibility: "hidden"
            })
        }

        element.html("").addClass(o.clsTable);

        this._createTableHeader();
        this._createTableBody();
        this._createTableFooter();

        this._createTopBlock();
        this._createBottomBlock();

        var need_sort = false;
        if (this.heads.length > 0) $.each(this.heads, function(i){
            var item = this;
            if (!need_sort && ["asc", "desc"].indexOf(item.sortDir) > -1) {
                need_sort = true;
                that.sort.colIndex = i;
                that.sort.dir = item.sortDir;
            }
        });

        if (need_sort) {
            columns = element.find("thead th");
            this._resetSortClass(columns);
            $(columns.get(this.sort.colIndex + that.service.length)).addClass("sort-"+this.sort.dir);
            this.sorting();
        }

        var filter_func;

        if (Utils.isValue(o.filters)) {
            $.each(Utils.strToArray(o.filters), function(){
                filter_func = Utils.isFunc(this);
                if (filter_func !== false) {
                    that.filtersIndexes.push(that.addFilter(filter_func));
                }
            });
        }

        this.currentPage = 1;

        this.component = table_component;
        this._draw();
    },

    _resetSortClass: function(el){
        $(el).removeClass("sort-asc sort-desc");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var component = element.closest(".table-component");
        var table_container = component.find(".table-container");
        var search = component.find(".table-search-block input");
        var customSearch;
        var id = element.attr("id");

        $(window).on(Metro.events.resize, function(){
            if (o.horizontalScroll === true) {
                if (!Utils.isNull(o.horizontalScrollStop) && Utils.mediaExist(o.horizontalScrollStop)) {
                    table_container.removeClass("horizontal-scroll");
                } else {
                    table_container.addClass("horizontal-scroll");
                }
            }
        }, {ns: component.attr("id")});

        element.on(Metro.events.click, ".sortable-column", function(){

            if (o.muteTable === true) element.addClass("disabled");

            if (that.busy) {
                return false;
            }
            that.busy = true;

            var col = $(this);

            that.activity.show(function(){
                setImmediate(function(){
                    that.currentPage = 1;
                    that.sort.colIndex = col.data("index");
                    if (!col.hasClass("sort-asc") && !col.hasClass("sort-desc")) {
                        that.sort.dir = o.sortDir;
                    } else {
                        if (col.hasClass("sort-asc")) {
                            that.sort.dir = "desc";
                        } else {
                            that.sort.dir = "asc";
                        }
                    }
                    that._resetSortClass(element.find(".sortable-column"));
                    col.addClass("sort-"+that.sort.dir);
                    that.sorting();
                    that._draw(function(){
                        that.busy = false;
                        if (o.muteTable === true) element.removeClass("disabled");
                    });
                });
            });
        });

        element.on(Metro.events.click, ".table-service-check input", function(){
            var check = $(this);
            var status = check.is(":checked");
            var val = ""+check.val();
            var store_key = o.checkStoreKey.replace("$1", id);
            var storage = Metro.storage;
            var data = storage.getItem(store_key);
            var is_radio = check.attr('type') === 'radio';

            if (is_radio) {
                data = [];
            }

            if (status) {
                if (!Utils.isValue(data)) {
                    data = [val];
                } else {
                    if (Array(data).indexOf(val) === -1) {
                        data.push(val);
                    }
                }
            } else {
                if (Utils.isValue(data)) {
                    Utils.arrayDelete(data, val);
                } else {
                    data = [];
                }
            }

            storage.setItem(store_key, data);

            Utils.exec(o.onCheckClick, [status], this);
            element.fire("checkclick", {
                check: this,
                status: status
            });
        });

        element.on(Metro.events.click, ".table-service-check-all input", function(){
            var status = $(this).is(":checked");
            var store_key = o.checkStoreKey.replace("$1", id);
            var data = [];

            if (status) {
                $.each(that.filteredItems, function(){
                    if (data.indexOf(this[o.checkColIndex]) !== -1) return ;
                    data.push(""+this[o.checkColIndex]);
                });
            } else {
                data = [];
            }

            Metro.storage.setItem(store_key, data);

            that._draw();

            Utils.exec(o.onCheckClickAll, [status], this);
            element.fire("checkclickall", {
                check: this,
                status: status
            });
        });

        var _search = function(){
            that.searchString = this.value.trim().toLowerCase();

            clearInterval(that.input_interval); that.input_interval = false;
            if (!that.input_interval) that.input_interval = setTimeout(function(){
                that.currentPage = 1;
                that._draw();
                clearInterval(that.input_interval); that.input_interval = false;
            }, o.searchThreshold);
        };

        search.on(Metro.events.inputchange, _search);

        if (Utils.isValue(this.wrapperSearch)) {
            customSearch = this.wrapperSearch.find("input");
            if (customSearch.length > 0) {
                customSearch.on(Metro.events.inputchange, _search);
            }
        }

        function pageLinkClick(l){
            var link = $(l);
            var item = link.parent();
            if (that.filteredItems.length === 0) {
                return ;
            }

            if (item.hasClass("active")) {
                return ;
            }

            if (item.hasClass("service")) {
                if (link.data("page") === "prev") {
                    that.currentPage--;
                    if (that.currentPage === 0) {
                        that.currentPage = 1;
                    }
                } else {
                    that.currentPage++;
                    if (that.currentPage > that.pagesCount) {
                        that.currentPage = that.pagesCount;
                    }
                }
            } else {
                that.currentPage = link.data("page");
            }

            that._draw();
        }

        component.on(Metro.events.click, ".pagination .page-link", function(){
            pageLinkClick(this)
        });

        if (Utils.isValue(this.wrapperPagination)) {
            this.wrapperPagination.on(Metro.events.click, ".pagination .page-link", function(){
                pageLinkClick(this)
            });
        }

        this._createInspectorEvents();

        element.on(Metro.events.click, ".js-table-crud-button", function(){

        });
    },

    _createInspectorEvents: function(){
        var that = this, inspector = this.inspector;
        // Inspector event

        this._removeInspectorEvents();

        inspector.on(Metro.events.click, ".js-table-inspector-field-up", function(){
            var button = $(this), tr = button.closest("tr");
            var tr_prev = tr.prev("tr");
            var index = tr.data("index");
            var index_view;
            if (tr_prev.length === 0) {
                return ;
            }
            tr.insertBefore(tr_prev);
            tr.addClass("flash");
            setTimeout(function(){
                tr.removeClass("flash");
            }, 1000);
            index_view = tr.index();

            tr.data("index-view", index_view);
            that.view[index]['index-view'] = index_view;

            $.each(tr.nextAll(), function(){
                var t = $(this);
                index_view++;
                t.data("index-view", index_view);
                that.view[t.data("index")]['index-view'] = index_view;
            });

            that._createTableHeader();
            that._draw();
        });

        inspector.on(Metro.events.click, ".js-table-inspector-field-down", function(){
            var button = $(this), tr = button.closest("tr");
            var tr_next = tr.next("tr");
            var index = tr.data("index");
            var index_view;
            if (tr_next.length === 0) {
                return ;
            }
            tr.insertAfter(tr_next);
            tr.addClass("flash");
            setTimeout(function(){
                tr.removeClass("flash");
            }, 1000);
            index_view = tr.index();

            tr.data("index-view", index_view);
            that.view[index]['index-view'] = index_view;

            $.each(tr.prevAll(), function(){
                var t = $(this);
                index_view--;
                t.data("index-view", index_view);
                that.view[t.data("index")]['index-view'] = index_view;
            });

            that._createTableHeader();
            that._draw();
        });

        inspector.on(Metro.events.click, "input[type=checkbox]", function(){
            var check = $(this);
            var status = check.is(":checked");
            var index = check.val();
            var op = ['cls', 'clsColumn'];

            if (status) {
                $.each(op, function(){
                    var a;
                    a = Utils.isValue(that.heads[index][this]) ? Utils.strToArray(that.heads[index][this], " ") : [];
                    Utils.arrayDelete(a, "hidden");
                    that.heads[index][this] = a.join(" ");
                    that.view[index]['show'] = true;
                });
            } else {
                $.each(op, function(){
                    var a;

                    a = Utils.isValue(that.heads[index][this]) ? Utils.strToArray(that.heads[index][this], " ") : [];
                    if (a.indexOf("hidden") === -1) {
                        a.push("hidden");
                    }
                    that.heads[index][this] = a.join(" ");
                    that.view[index]['show'] = false;
                });
            }

            that._createTableHeader();
            that._draw();
        });

        inspector.find("input[type=number]").on(Metro.events.inputchange, function(){
            var input = $(this);
            var index = input.attr("data-index");
            var val = parseInt(input.val());

            that.view[index]['size'] = val === 0 ? "" : val;

            that._createTableHeader();
        });

        inspector.on(Metro.events.click, ".js-table-inspector-save", function(){
            that._saveTableView();
            that.openInspector(false);
        });

        inspector.on(Metro.events.click, ".js-table-inspector-cancel", function(){
            that.openInspector(false);
        });

        inspector.on(Metro.events.click, ".js-table-inspector-reset", function(){
            that.resetView();
        });
    },

    _removeInspectorEvents: function(){
        var inspector = this.inspector;
        inspector.off(Metro.events.click, ".js-table-inspector-field-up");
        inspector.off(Metro.events.click, ".js-table-inspector-field-down");
        inspector.off(Metro.events.click, "input[type=checkbox]");
        inspector.off(Metro.events.click, ".js-table-inspector-save");
        inspector.off(Metro.events.click, ".js-table-inspector-cancel");
        inspector.off(Metro.events.click, ".js-table-inspector-reset");
        inspector.find("input[type=number]").off(Metro.events.inputchange);
    },

    _saveTableView: function(){
        var element = this.element, o = this.options;
        var view = this.view;
        var id = element.attr("id");

        if (o.viewSaveMode.toLowerCase() === "client") {
            Metro.storage.setItem(o.viewSavePath.replace("$1", id), view);
            Utils.exec(o.onViewSave, [o.viewSavePath, view], element[0]);
            element.fire("viewsave", {
                target: "client",
                path: o.viewSavePath,
                view: view
            });
        } else {
            $.post(
                o.viewSavePath,
                {
                    id : element.attr("id"),
                    view : view
                },
                function(data, status, xhr){
                    Utils.exec(o.onViewSave, [o.viewSavePath, view, data, status, xhr], element[0]);
                    element.fire("viewsave", {
                        target: "server",
                        path: o.viewSavePath,
                        view: view
                    });
                }
            );
        }
    },

    _info: function(start, stop, length){
        var element = this.element, o = this.options;
        var component = element.closest(".table-component");
        var info = Utils.isValue(this.wrapperInfo) ? this.wrapperInfo : component.find(".table-info");
        var text;

        if (info.length === 0) {
            return ;
        }

        if (stop > length) {
            stop = length;
        }

        if (this.items.length === 0) {
            start = stop = length = 0;
        }

        text = o.tableInfoTitle;
        text = text.replace("$1", start);
        text = text.replace("$2", stop);
        text = text.replace("$3", length);
        info.html(text);
    },

    _paging: function(length){
        var element = this.element, o = this.options;
        var component = element.closest(".table-component");
        this.pagesCount = Math.ceil(length / o.rows); // Костыль
        createPagination({
            length: length,
            rows: o.rows,
            current: this.currentPage,
            target: Utils.isValue(this.wrapperPagination) ? this.wrapperPagination : component.find(".table-pagination"),
            claPagination: o.clsPagination,
            prevTitle: o.paginationPrevTitle,
            nextTitle: o.paginationNextTitle,
            distance: o.paginationShortMode === true ? o.paginationDistance : 0
        });
    },

    _filter: function(){
        var that = this, o = this.options, element = this.element;
        var items;
        if ((Utils.isValue(this.searchString) && that.searchString.length >= o.searchMinLength) || this.filters.length > 0) {
            items = this.items.filter(function(row){

                var row_data = "", result, search_result, i, j = 0;

                if (that.filters.length > 0) {

                    result = o.filtersOperator.toLowerCase() === "and";
                    for (i = 0; i < that.filters.length; i++) {
                        if (Utils.isNull(that.filters[i])) continue;
                        j++;
                        result = o.filtersOperator.toLowerCase() === "and" ?
                            result && Utils.exec(that.filters[i], [row, that.heads]) :
                            result || Utils.exec(that.filters[i], [row, that.heads])
                        ;
                    }

                    if (j === 0) result = true;
                } else {
                    result = true;
                }

                if (that.searchFields.length > 0) {
                    $.each(that.heads, function(i, v){
                        if (that.searchFields.indexOf(v.name) > -1) {
                            row_data += "•"+row[i];
                        }
                    })
                } else {
                    row_data = row.join("•");
                }

                row_data = row_data.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim().toLowerCase();
                search_result = Utils.isValue(that.searchString) && that.searchString.length >= o.searchMinLength ? ~row_data.indexOf(that.searchString) : true;

                result = result && search_result;

                if (result) {
                    Utils.exec(o.onFilterRowAccepted, [row], element[0]);
                    element.fire("filterrowaccepted", {
                        row: row
                    });
                } else {
                    Utils.exec(o.onFilterRowDeclined, [row], element[0]);
                    element.fire("filterrowdeclined", {
                        row: row
                    });
                }

                return result;
            });

        } else {
            items = this.items;
        }

        Utils.exec(o.onSearch, [that.searchString, items], element[0]);
        element.fire("search", {
            search: that.searchString,
            items: items
        });

        this.filteredItems = items;

        return items;
    },

    _draw: function(cb){
        var that = this, element = this.element, o = this.options;
        var body = element.find("tbody");
        var i, j, tr, td, check, cells, tds, is_even_row;
        var start = parseInt(o.rows) === -1 ? 0 : o.rows * (this.currentPage - 1),
            stop = parseInt(o.rows) === -1 ? this.items.length - 1 : start + o.rows - 1;
        var items;
        var stored_keys = Metro.storage.getItem(o.checkStoreKey.replace("$1", element.attr('id')));

        var view = o.staticView ? this.viewDefault : this.view;

        body.html("");

        items = this._filter();

        if (items.length > 0) {
            for (i = start; i <= stop; i++) {
                cells = items[i];
                tds = [];
                if (!Utils.isValue(cells)) {continue;}
                tr = $("<tr>").addClass(o.clsBodyRow);
                tr.data('original', cells);

                // Rownum

                is_even_row = i % 2 === 0;

                td = $("<td>").html(i + 1);
                if (that.service[0].clsColumn !== undefined) {
                    td.addClass(that.service[0].clsColumn);
                }
                td.appendTo(tr);

                // Checkbox
                td = $("<td>");
                if (o.checkType === "checkbox") {
                    check = $("<input type='checkbox' data-style='"+o.checkStyle+"' data-role='checkbox' name='" + (Utils.isValue(o.checkName) ? o.checkName : 'table_row_check') + "[]' value='" + items[i][o.checkColIndex] + "'>");
                } else {
                    check = $("<input type='radio' data-style='"+o.checkStyle+"' data-role='radio' name='" + (Utils.isValue(o.checkName) ? o.checkName : 'table_row_check') + "' value='" + items[i][o.checkColIndex] + "'>");
                }

                if (Utils.isValue(stored_keys) && Array.isArray(stored_keys) && stored_keys.indexOf(""+items[i][o.checkColIndex]) > -1) {
                    check.prop("checked", true);
                }

                check.addClass("table-service-check");
                Utils.exec(o.onCheckDraw, [check], check[0]);
                element.fire("checkdraw", {
                    check: check
                });
                check.appendTo(td);
                if (that.service[1].clsColumn !== undefined) {
                    td.addClass(that.service[1].clsColumn);
                }
                td.appendTo(tr);

                for (j = 0; j < cells.length; j++){
                    tds[j] = null;
                }

                $.each(cells, function(cell_index){
                    var val = this;
                    var td = $("<td>");

                    if (Utils.isValue(that.heads[cell_index].template)) {
                        val = TemplateEngine(that.heads[cell_index].template, {value: val}, {
                            beginToken: o.templateBeginToken,
                            endToken: o.templateEndToken
                        })
                    }

                    if (o.cellWrapper === true) {
                        val = $("<div>").addClass("data-wrapper").addClass(o.clsCellWrapper).html(val);
                    }
                    td.html(val);

                    td.addClass(o.clsBodyCell);
                    if (Utils.isValue(that.heads[cell_index].clsColumn)) {
                        td.addClass(that.heads[cell_index].clsColumn);
                    }

                    if (Utils.bool(view[cell_index].show) === false) {
                        td.addClass("hidden");
                    }

                    if (Utils.bool(view[cell_index].show)) {
                        td.removeClass("hidden");
                    }

                    td.data('original',this);

                    tds[view[cell_index]['index-view']] = td;
                    Utils.exec(o.onDrawCell, [td, val, cell_index, that.heads[cell_index], cells], td[0]);
                    element.fire("drawcell", {
                        td: td,
                        val: val,
                        cellIndex: cell_index,
                        head: that.heads[cell_index],
                        items: cells
                    });
                });

                for (j = 0; j < cells.length; j++){
                    tds[j].appendTo(tr);
                    Utils.exec(o.onAppendCell, [tds[j], tr, j, element], tds[j][0]);
                    element.fire("appendcell", {
                        td: tds[j],
                        tr: tr,
                        index: j
                    })
                }

                Utils.exec(o.onDrawRow, [tr, that.view, that.heads, cells], tr[0]);
                element.fire("drawrow", {
                    tr: tr,
                    view: that.view,
                    heads: that.heads,
                    items: cells
                });

                tr.addClass(o.clsRow).addClass(is_even_row ? o.clsEvenRow : o.clsOddRow).appendTo(body);

                Utils.exec(o.onAppendRow, [tr, element], tr[0]);
                element.fire("appendrow", {
                    tr: tr
                });
            }

        } else {
            j = 0;
            $.each(view, function(){
                if (this.show) j++;
            });
            tr = $("<tr>").addClass(o.clsBodyRow).appendTo(body);
            td = $("<td>").attr("colspan", j).addClass("text-center").html($("<span>").addClass(o.clsEmptyTableTitle).html(o.emptyTableTitle));
            td.appendTo(tr);
        }

        this._info(start + 1, stop + 1, items.length);
        this._paging(items.length);

        if (this.activity) this.activity.hide();

        Utils.exec(o.onDraw, [element], element[0]);

        element.fire("draw", element[0]);

        if (cb !== undefined) {
            Utils.exec(cb, [element], element[0])
        }
    },

    _getItemContent: function(row){
        var o = this.options;
        var result, col = row[this.sort.colIndex];
        var format = this.heads[this.sort.colIndex].format;
        var formatMask = !Utils.isNull(this.heads) && !Utils.isNull(this.heads[this.sort.colIndex]) && Utils.isValue(this.heads[this.sort.colIndex]['formatMask']) ? this.heads[this.sort.colIndex]['formatMask'] : "%Y-%m-%d";
        var thousandSeparator = $.iif(this.heads && this.heads[this.sort.colIndex], this.heads[this.sort.colIndex]["thousandSeparator"], o.thousandSeparator);
        var decimalSeparator  = $.iif(this.heads && this.heads[this.sort.colIndex], this.heads[this.sort.colIndex]["decimalSeparator"], o.decimalSeparator);

        result = (""+col).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

        if (Utils.isValue(result) && Utils.isValue(format)) {

            if (['number', 'int', 'float', 'money'].indexOf(format) !== -1) {
                result = Utils.parseNumber(result, thousandSeparator, decimalSeparator);
            }

            switch (format) {
                case "date": result = Utils.isValue(formatMask) ? result.toDate(formatMask) : new Date(result); break;
                case "number": result = Number(result); break;
                case "int": result = parseInt(result); break;
                case "float": result = parseFloat(result); break;
                case "money": result = Utils.parseMoney(result); break;
                case "card": result = Utils.parseCard(result); break;
                case "phone": result = Utils.parsePhone(result); break;
            }
        }

        return result;
    },

    updateItem: function(key, field, value){
        var item = this.items[this.index[key]];
        var fieldIndex = null;
        if (Utils.isNull(item)) {
            console.log('Item is undefined for update');
            return this;
        }
        if (isNaN(field)) {
            this.heads.forEach(function(v, i){
                if (v['name'] === field) {
                    fieldIndex = i;
                }
            });
        }
        if (Utils.isNull(fieldIndex)) {
            console.log('Item is undefined for update. Field ' + field + ' not found in data structure');
            return this;
        }

        item[fieldIndex] = value;
        this.items[this.index[key]] = item;
        return this;
    },

    getItem: function(key){
        return this.items[this.index[key]];
    },

    deleteItem: function(fieldIndex, value){
        var i, deleteIndexes = [];
        var is_func = Utils.isFunc(value);
        for(i = 0; i < this.items.length; i++) {
            if (is_func) {
                if (Utils.exec(value, [this.items[i][fieldIndex]])) {
                    deleteIndexes.push(i);
                }
            } else {
                if (this.items[i][fieldIndex] === value) {
                    deleteIndexes.push(i);
                }
            }
        }

        this.items = Utils.arrayDeleteByMultipleKeys(this.items, deleteIndexes);

        return this;
    },

    deleteItemByName: function(fieldName, value){
        var i, fieldIndex, deleteIndexes = [];
        var is_func = Utils.isFunc(value);

        for(i = 0; i < this.heads.length; i++) {
            if (this.heads[i]['name'] === fieldName) {
                fieldIndex = i;
                break;
            }
        }

        for(i = 0; i < this.items.length; i++) {
            if (is_func) {
                if (Utils.exec(value, [this.items[i][fieldIndex]])) {
                    deleteIndexes.push(i);
                }
            } else {
                if (this.items[i][fieldIndex] === value) {
                    deleteIndexes.push(i);
                }
            }
        }

        this.items = Utils.arrayDeleteByMultipleKeys(this.items, deleteIndexes);

        return this;
    },

    draw: function(){
        this._draw();
        return this;
    },

    sorting: function(dir){
        var that = this, element = this.element, o = this.options;

        if (Utils.isValue(dir)) {
            this.sort.dir = dir;
        }

        Utils.exec(o.onSortStart, [this.items], element[0]);
        element.fire("sortstart", this.items);

        this.items.sort(function(a, b){
            var c1 = that._getItemContent(a);
            var c2 = that._getItemContent(b);
            var result = 0;

            if (c1 < c2) {
                result = that.sort.dir === "asc" ? -1 : 1;
            }
            if (c1 > c2) {
                result = that.sort.dir === "asc" ? 1 : -1;
            }

            if (result !== 0) {
                Utils.exec(o.onSortItemSwitch, [a, b, result], element[0]);
                element.fire("sortitemswitch", {
                    a: a,
                    b: b,
                    result: result
                })
            }

            return result;
        });

        Utils.exec(o.onSortStop, [this.items], element[0]);
        element.fire("sortstop", this.items);

        return this;
    },

    search: function(val){
        this.searchString = val.trim().toLowerCase();
        this.currentPage = 1;
        this._draw();
        return this;
    },

    _rebuild: function(review){
        var that = this, element = this.element;
        var need_sort = false, sortable_columns;

        this._createIndex();

        if (review === true) {
            this.view = this._createView();
        }

        this._createTableHeader();
        this._createTableBody();
        this._createTableFooter();

        if (this.heads.length > 0) $.each(this.heads, function(i){
            var item = this;
            if (!need_sort && ["asc", "desc"].indexOf(item.sortDir) > -1) {
                need_sort = true;
                that.sort.colIndex = i;
                that.sort.dir = item.sortDir;
            }
        });

        if (need_sort) {
            sortable_columns = element.find(".sortable-column");
            this._resetSortClass(sortable_columns);
            $(sortable_columns.get(that.sort.colIndex)).addClass("sort-"+that.sort.dir);
            this.sorting();
        }

        that.currentPage = 1;

        that._draw();
    },

    setHeads: function(data){
        this.heads = data;
        return this;
    },

    setHeadItem: function(name, data){
        var i, index;
        for(i = 0; i < this.heads.length; i++) {
            if (item.name === name) {
                index = i;
                break;
            }
        }
        this.heads[index] = data;
        return this;
    },

    setItems: function(data){
        this.items = data;
        return this;
    },

    setData: function(/*obj*/ data){
        this.items = [];
        this.heads = [];
        this.foots = [];

        this._createItemsFromJSON(data);

        this._rebuild(true);

        return this;
    },

    loadData: function(source, review){
        var that = this, element = this.element, o = this.options;

        if (!Utils.isValue(review)) {
            review = true;
        }

        element.html("");

        if (!Utils.isValue(source)) {

            this._rebuild(review);

        } else {
            o.source = source;

            Utils.exec(o.onDataLoad, [o.source], element[0]);
            element.fire("dataload", {
                source: o.source
            });

            $.json(o.source).then(function(data){
                that.items = [];
                that.heads = [];
                that.foots = [];

                Utils.exec(o.onDataLoaded, [o.source, data], element[0]);
                element.fire("dataloaded", {
                    source: o.source,
                    data: data
                });
                that._createItemsFromJSON(data);
                that._rebuild(review);
            }, function(xhr){
                Utils.exec(o.onDataLoadError, [o.source, xhr], element[0]);
                that._createItemsFromJSON(data);
                that._rebuild(review);
                element.fire("dataloaderror", {
                    source: o.source,
                    xhr: xhr
                })
            });
        }
    },

    reload: function(review){
        this.loadData(this.options.source, review);
    },

    next: function(){
        if (this.items.length === 0) return ;
        this.currentPage++;
        if (this.currentPage > this.pagesCount) {
            this.currentPage = this.pagesCount;
            return ;
        }
        this._draw();
        return this;
    },

    prev: function(){
        if (this.items.length === 0) return ;
        this.currentPage--;
        if (this.currentPage === 0) {
            this.currentPage = 1;
            return ;
        }
        this._draw();
        return this;
    },

    first: function(){
        if (this.items.length === 0) return ;
        this.currentPage = 1;
        this._draw();
        return this;
    },

    last: function(){
        if (this.items.length === 0) return ;
        this.currentPage = this.pagesCount;
        this._draw();
        return this;
    },

    page: function(num){
        if (num <= 0) {
            num = 1;
        }

        if (num > this.pagesCount) {
            num = this.pagesCount;
        }

        this.currentPage = num;
        this._draw();
        return this;
    },

    addFilter: function(f, redraw){
        var filterIndex = null, i, func = Utils.isFunc(f);
        if (func === false) {
            return ;
        }

        for(i = 0; i < this.filters.length; i++) {
            if (Utils.isNull(this.filters[i])) {
                filterIndex = i;
                this.filters[i] = func;
                break;
            }
        }

        if (Utils.isNull(filterIndex)) {
            this.filters.push(func);
            filterIndex = this.filters.length - 1;
        }

        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }

        return filterIndex
    },

    removeFilter: function(key, redraw){
        this.filters[key] = null;
        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }
        return this;
    },

    removeFilters: function(redraw){
        this.filters = [];
        if (redraw === true) {
            this.currentPage = 1;
            this.draw();
        }
        return this;
    },

    getItems: function(){
        return this.items;
    },

    getHeads: function(){
        return this.heads;
    },

    getView: function(){
        return this.view;
    },

    getFilteredItems: function(){
        return this.filteredItems.length > 0 ? this.filteredItems : this.items;
    },

    getSelectedItems: function(){
        var element = this.element, o = this.options;
        var stored_keys = Metro.storage.getItem(o.checkStoreKey.replace("$1", element.attr("id")));
        var selected = [];

        if (!Utils.isValue(stored_keys)) {
            return [];
        }

        $.each(this.items, function(){
            if (stored_keys.indexOf(""+this[o.checkColIndex]) !== -1) {
                selected.push(this);
            }
        });
        return selected;
    },

    getStoredKeys: function(){
        var element = this.element, o = this.options;
        return Metro.storage.getItem(o.checkStoreKey.replace("$1", element.attr("id")), []);
    },

    clearSelected: function(redraw){
        var element = this.element, o = this.options;
        Metro.storage.setItem(o.checkStoreKey.replace("$1", element.attr("id")), []);
        element.find("table-service-check-all input").prop("checked", false);
        if (redraw === true) this._draw();
    },

    getFilters: function(){
        return this.filters;
    },

    getFiltersIndexes: function(){
        return this.filtersIndexes;
    },

    openInspector: function(mode){
        var ins = this.inspector;
        if (mode) {
            ins.show(0, function(){
                ins.css({
                    top: ($(window).height()  - ins.outerHeight(true)) / 2 + pageYOffset,
                    left: ($(window).width() - ins.outerWidth(true)) / 2 + pageXOffset
                }).data("open", true);
            });
        } else {
            ins.hide().data("open", false);
        }
    },

    closeInspector: function(){
        this.openInspector(false);
    },

    toggleInspector: function(){
        this.openInspector(!this.inspector.data("open"));
    },

    resetView: function(){

        this.view = this._createView();

        this._createTableHeader();
        this._createTableFooter();
        this._draw();

        this._resetInspector();
        this._saveTableView();
    },

    rebuildIndex: function(){
        this._createIndex();
    },

    getIndex: function(){
        return this.index;
    },

    export: function(to, mode, filename, options){
        var that = this, o = this.options;
        var table = document.createElement("table");
        var head = $("<thead>").appendTo(table);
        var body = $("<tbody>").appendTo(table);
        var i, j, cells, tds = [], items, tr, td;
        var start, stop;

        if (typeof Export.tableToCSV !== 'function') {
            return ;
        }

        mode = Utils.isValue(mode) ? mode.toLowerCase() : "all-filtered";
        filename = Utils.isValue(filename) ? filename : Utils.elementId("table")+"-export.csv";

        // Create table header
        tr = $("<tr>");
        cells = this.heads;

        for (j = 0; j < cells.length; j++){
            tds[j] = null;
        }

        $.each(cells, function(cell_index){
            var item = this;
            if (Utils.bool(that.view[cell_index]['show']) === false) {
                return ;
            }
            td = $("<th>");
            if (Utils.isValue(item.title)) {
                td.html(item.title);
            }
            tds[that.view[cell_index]['index-view']] = td;
        });

        for (j = 0; j < cells.length; j++){
            if (Utils.isValue(tds[j])) tds[j].appendTo(tr);
        }
        tr.appendTo(head);

        // Create table data
        if (mode === "checked") {
            items = this.getSelectedItems();
            start = 0; stop = items.length - 1;
        } else if (mode === "view") {
            items = this._filter();
            start = parseInt(o.rows) === -1 ? 0 : o.rows * (this.currentPage - 1);
            stop = parseInt(o.rows) === -1 ? items.length - 1 : start + o.rows - 1;
        } else if (mode === "all") {
            items = this.items;
            start = 0; stop = items.length - 1;
        } else {
            items = this._filter();
            start = 0; stop = items.length - 1;
        }

        for (i = start; i <= stop; i++) {
            if (Utils.isValue(items[i])) {
                tr = $("<tr>");

                cells = items[i];

                for (j = 0; j < cells.length; j++){
                    tds[j] = null;
                }

                $.each(cells, function(cell_index){
                    if (Utils.bool(that.view[cell_index].show) === false) {
                        return ;
                    }
                    td = $("<td>").html(this);
                    tds[that.view[cell_index]['index-view']] = td;
                });

                for (j = 0; j < cells.length; j++){
                    if (Utils.isValue(tds[j])) tds[j].appendTo(tr);
                }

                tr.appendTo(body);
            }
        }

        // switch (to) {
        //     default: Export.tableToCSV(table, filename, options);
        // }
        Export.tableToCSV(table, filename, options);
        table.remove();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        function dataCheck(){
            o.check = Utils.bool(element.attr("data-check"));
            that._service();
            that._createTableHeader();
            that._draw();
        }

        function dataRownum(){
            o.rownum = Utils.bool(element.attr("data-rownum"));
            that._service();
            that._createTableHeader();
            that._draw();
        }

        switch (attributeName) {
            case "data-check": dataCheck(); break;
            case "data-rownum": dataRownum(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var component = element.closest(".table-component");
        var search_input = component.find("input");
        var rows_select = component.find("select");

        search_input.data("input").destroy();
        rows_select.data("select").destroy();

        $(window).off(Metro.events.resize, {ns: component.attr("id")});

        element.off(Metro.events.click, ".sortable-column");

        element.off(Metro.events.click, ".table-service-check input");

        element.off(Metro.events.click, ".table-service-check-all input");

        search_input.off(Metro.events.inputchange);

        if (Utils.isValue(this.wrapperSearch)) {
            var customSearch = this.wrapperSearch.find("input");
            if (customSearch.length > 0) {
                customSearch.off(Metro.events.inputchange);
            }
        }

        component.off(Metro.events.click, ".pagination .page-link");
        if (Utils.isValue(this.wrapperPagination)) {
            this.wrapperPagination.off(Metro.events.click, ".pagination .page-link");
        }
        element.off(Metro.events.click, ".js-table-crud-button");

        this._removeInspectorEvents();

        return element;
    }
};

Metro.plugin('table', Table);

var MaterialTabsDefaultConfig = {
    deep: false,
    fixedTabs: false,

    clsComponent: "",
    clsTab: "",
    clsTabActive: "",
    clsMarker: "",

    onBeforeTabOpen: Metro.noop_true,
    onTabOpen: Metro.noop,
    onTabsScroll: Metro.noop,
    onTabsCreate: Metro.noop
};

Metro.materialTabsSetup = function (options) {
    MaterialTabsDefaultConfig = $.extend({}, MaterialTabsDefaultConfig, options);
};

if (typeof window["metroMaterialTabsSetup"] !== undefined) {
    Metro.materialTabsSetup(window["metroMaterialTabsSetup"]);
}

var MaterialTabs = {
    init: function( options, elem ) {
        this.options = $.extend( {}, MaterialTabsDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.marker = null;
        this.scroll = 0;
        this.scrollDir = "left";

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "materialtabs");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onTabsCreate, null, element[0]);
        element.fire("tabscreate");
    },

    _applyColor: function(to, color, option){

        to = $(to);

        if (Utils.isValue(color)) {
            if (Utils.isColor(color)) {
                to.css(option, color);
            } else {
                to.addClass(color);
            }
        }
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var tabs = element.find("li"), active_tab = element.find("li.active");

        element.addClass("tabs-material").addClass(o.clsComponent);
        tabs.addClass(o.clsTab);

        if (o.deep === true) {
            element.addClass("deep");
        }

        if (o.fixedTabs === true) {
            element.addClass("fixed-tabs");
        }

        this.marker = element.find(".tab-marker");

        if (this.marker.length === 0) {
            this.marker = $("<span>").addClass("tab-marker").addClass(o.clsMarker).appendTo(element);
        }

        this.openTab(active_tab.length === 0 ? tabs[0] : active_tab[0]);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, "li", function(e){
            var tab = $(this);
            var active_tab = element.find("li.active");
            var tab_next = tab.index() > active_tab.index();
            var target = tab.children("a").attr("href");

            if (Utils.isValue(target) && target[0] === "#") {
                if (tab.hasClass("active")) return;
                if (tab.hasClass("disabled")) return;
                if (Utils.exec(o.onBeforeTabOpen, [tab, target, tab_next], this) === false) return;
                that.openTab(tab, tab_next);
                e.preventDefault();
            }
        });

        element.on(Metro.events.scroll, function(){
            var oldScroll = this.scroll;

            this.scrollDir = this.scroll < element[0].scrollLeft ? "left" : "right";
            this.scroll = element[0].scrollLeft;

            Utils.exec(o.onTabsScroll, [element[0].scrollLeft, oldScroll, this.scrollDir], element[0]);

            element.fire("tabsscroll", {
                scrollLeft: element[0].scrollLeft,
                oldScroll: oldScroll,
                scrollDir: that.scrollDir
            });

        });
    },

    openTab: function(tab, tab_next){
        var element = this.element, o = this.options;
        var tabs = element.find("li");
        var magic = 52, shift, width, tab_width, target, tab_left, scroll, scrollLeft;

        tab = $(tab);

        $.each(tabs, function(){
            var target = $(this).find("a").attr("href");
            if (!Utils.isValue(target)) return;
            if (target[0] === "#" && target.length > 1) {
                $(target).hide();
            }
        });

        width = element.width();
        scroll = element.scrollLeft();
        tab_left = tab.position().left;
        tab_width = tab.width();
        shift = tab_left + tab_width;

        tabs.removeClass("active").removeClass(o.clsTabActive);
        tab.addClass("active").addClass(o.clsTabActive);

        if (shift + magic > width + scroll) {
            scrollLeft = scroll + (magic * 2);
        } else if (tab_left < scroll) {
            scrollLeft = tab_left - magic * 2;
        } else {
            scrollLeft = scroll;
        }

        element.animate({
            scrollLeft: scrollLeft
        });

        this.marker.animate({
            left: tab_left,
            width: tab_width
        });

        target = tab.find("a").attr("href");
        if (Utils.isValue(target)) {
            if (target[0] === "#" && target.length > 1) {
                $(target).show();
            }
        }

        Utils.exec(o.onTabOpen, [tab[0], target, tab_next], element[0]);
        element.fire("tabopen", {
            tab: tab[0],
            target: target,
            tab_next: tab_next
        });
    },

    open: function(tab_num){
        var element = this.element;
        var tabs = element.find("li");
        var active_tab = element.find("li.active");
        var tab = tabs.eq(tab_num - 1);
        var tab_next = tabs.index(tab) > tabs.index(active_tab);
        this.openTab(tab, tab_next);
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;

        element.off(Metro.events.click, "li");
        element.off(Metro.events.scroll);

        return element;
    }
};

Metro.plugin('materialtabs', MaterialTabs);

var TabsDefaultConfig = {
    expand: false,
    expandPoint: null,
    tabsPosition: "top",
    tabsType: "default",

    clsTabs: "",
    clsTabsList: "",
    clsTabsListItem: "",
    clsTabsListItemActive: "",

    onTab: Metro.noop,
    onBeforeTab: Metro.noop_true,
    onTabsCreate: Metro.noop
};

Metro.tabsSetup = function (options) {
    TabsDefaultConfig = $.extend({}, TabsDefaultConfig, options);
};

if (typeof window["metroTabsSetup"] !== undefined) {
    Metro.tabsSetup(window["metroTabsSetup"]);
}

var Tabs = {
    init: function( options, elem ) {
        this.options = $.extend( {}, TabsDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this._targets = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;
        var tab = element.find(".active").length > 0 ? $(element.find(".active")[0]) : undefined;

        Metro.checkRuntime(element, "tabs");

        this._createStructure();
        this._createEvents();
        this._open(tab);

        Utils.exec(o.onTabsCreate, null, element[0]);
        element.fire("tabscreate");
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var parent = element.parent();
        var right_parent = parent.hasClass("tabs");
        var container = right_parent ? parent : $("<div>").addClass("tabs tabs-wrapper");
        var expandTitle, hamburger;

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", Utils.elementId("tabs"));
        }

        container.addClass(o.tabsPosition.replace(["-", "_", "+"], " "));

        element.addClass("tabs-list");
        if (o.tabsType !== "default") {
            element.addClass("tabs-"+o.tabsType);
        }
        if (!right_parent) {
            container.insertBefore(element);
            element.appendTo(container);
        }

        element.data('expanded', false);

        expandTitle = $("<div>").addClass("expand-title"); container.prepend(expandTitle);
        hamburger = container.find(".hamburger");
        if (hamburger.length === 0) {
            hamburger = $("<button>").attr("type", "button").addClass("hamburger menu-down").appendTo(container);
            for(var i = 0; i < 3; i++) {
                $("<span>").addClass("line").appendTo(hamburger);
            }

            if (Colors.isLight(Utils.computedRgbToHex(Utils.getStyleOne(container, "background-color"))) === true) {
                hamburger.addClass("dark");
            }
        }

        container.addClass(o.clsTabs);
        element.addClass(o.clsTabsList);
        element.children("li").addClass(o.clsTabsListItem);

        if (o.expand === true && !o.tabsPosition.contains("vertical")) {
            container.addClass("tabs-expand");
        } else {
            if (Utils.isValue(o.expandPoint) && Utils.mediaExist(o.expandPoint) && !o.tabsPosition.contains("vertical")) {
                container.addClass("tabs-expand");
            }
        }

        if (o.tabsPosition.contains("vertical")) {
            container.addClass("tabs-expand");
        }

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.parent();

        $(window).on(Metro.events.resize, function(){

            if (o.tabsPosition.contains("vertical")) {
                return ;
            }

            if (o.expand === true && !o.tabsPosition.contains("vertical")) {
                container.addClass("tabs-expand");
            } else {
                if (Utils.isValue(o.expandPoint) && Utils.mediaExist(o.expandPoint) && !o.tabsPosition.contains("vertical")) {
                    if (!container.hasClass("tabs-expand")) container.addClass("tabs-expand");
                } else {
                    if (container.hasClass("tabs-expand")) container.removeClass("tabs-expand");
                }
            }
        }, {ns: element.attr("id")});

        container.on(Metro.events.click, ".hamburger, .expand-title", function(){
            if (element.data('expanded') === false) {
                element.addClass("expand");
                element.data('expanded', true);
                container.find(".hamburger").addClass("active");
            } else {
                element.removeClass("expand");
                element.data('expanded', false);
                container.find(".hamburger").removeClass("active");
            }
        });

        element.on(Metro.events.click, "a", function(e){
            var link = $(this);
            var href = link.attr("href").trim();
            var tab = link.parent("li");

            if (tab.hasClass("active")) {
                e.preventDefault();
            }

            if (element.data('expanded') === true) {
                element.removeClass("expand");
                element.data('expanded', false);
                container.find(".hamburger").removeClass("active");
            }

            if (Utils.exec(o.onBeforeTab, [tab, element], tab[0]) !== true) {
                return false;
            }

            if (Utils.isValue(href) && href[0] === "#") {
                that._open(tab);
                e.preventDefault();
            }
        });
    },

    _collectTargets: function(){
        var that = this, element = this.element;
        var tabs = element.find("li");

        this._targets = [];

        $.each(tabs, function(){
            var target = $(this).find("a").attr("href").trim();
            if (target.length > 1 && target[0] === "#") {
                that._targets.push(target);
            }
        });
    },

    _open: function(tab){
        var element = this.element, o = this.options;
        var tabs = element.find("li");
        var expandTitle = element.siblings(".expand-title");


        if (tabs.length === 0) {
            return;
        }

        this._collectTargets();

        if (tab === undefined) {
            tab = $(tabs[0]);
        }

        var target = tab.find("a").attr("href");

        if (target === undefined) {
            return;
        }

        tabs.removeClass("active");
        if (tab.parent().hasClass("d-menu")) {
            tab.parent().parent().addClass("active");
        } else {
            tab.addClass("active");
        }

        $.each(this._targets, function(){
            var t = $(this);
            if (t.length > 0) t.hide();
        });

        if (target !== "#" && target[0] === "#") {
            $(target).show();
        }

        expandTitle.html(tab.find("a").html());

        tab.addClass(o.clsTabsListItemActive);

        Utils.exec(o.onTab, [tab[0]], element[0]);
        element.fire("tab", {
            tab: tab[0]
        })
    },

    next: function(){
        var element = this.element;
        var next, active_tab = element.find("li.active");

        next = active_tab.next("li");
        if (next.length > 0) {
            this._open(next);
        }
    },

    prev: function(){
        var element = this.element;
        var next, active_tab = element.find("li.active");

        next = active_tab.prev("li");
        if (next.length > 0) {
            this._open(next);
        }
    },

    open: function(tab){
        var element = this.element;
        var tabs = element.find("li");

        if (!Utils.isValue(tab)) {
            tab = 1;
        }

        if (Utils.isInt(tab)) {
            if (Utils.isValue(tabs[tab-1])) this._open($(tabs[tab-1]));
        } else {
            this._open($(tab));
        }
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;
        var container = element.parent();

        $(window).off(Metro.events.resize,{ns: element.attr("id")});

        container.off(Metro.events.click, ".hamburger, .expand-title");

        element.off(Metro.events.click, "a");

        return element;
    }
};

Metro.plugin('tabs', Tabs);

var TagInputDefaultConfig = {
    randomColor: false,
    maxTags: 0,
    tagSeparator: ",",
    tagTrigger: "13,188",
    clsTag: "",
    clsTagTitle: "",
    clsTagRemover: "",
    onBeforeTagAdd: Metro.noop_true,
    onTagAdd: Metro.noop,
    onBeforeTagRemove: Metro.noop_true,
    onTagRemove: Metro.noop,
    onTag: Metro.noop,
    onTagInputCreate: Metro.noop
};

Metro.tagInputSetup = function (options) {
    TagInputDefaultConfig = $.extend({}, TagInputDefaultConfig, options);
};

if (typeof window["metroTagInputSetup"] !== undefined) {
    Metro.tagInputSetup(window["metroTagInputSetup"]);
}

var TagInput = {
    init: function( options, elem ) {
        this.options = $.extend( {}, TagInputDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.values = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "taginput");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onTagInputCreate, null, element[0]);
        element.fire("taginputcreate");
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var container, input;
        var values = element.val().trim();

        container = $("<div>").addClass("tag-input "  + element[0].className).insertBefore(element);
        element.appendTo(container);

        element[0].className = "";

        element.addClass("original-input");
        input = $("<input type='text'>").addClass("input-wrapper").attr("size", 1);
        input.appendTo(container);

        if (Utils.isValue(values)) {
            $.each(Utils.strToArray(values, o.tagSeparator), function(){
                that._addTag(this);
            })
        }

        if (element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.closest(".tag-input");
        var input = container.find(".input-wrapper");

        input.on(Metro.events.focus, function(){
            container.addClass("focused");
        });

        input.on(Metro.events.blur, function(){
            container.removeClass("focused");
        });

        input.on(Metro.events.inputchange, function(){
            input.attr("size", Math.ceil(input.val().length / 2) + 2);
        });

        input.on(Metro.events.keyup, function(e){
            var val = input.val().trim();

            if (val === "") {return ;}

            if (Utils.strToArray(o.tagTrigger, ",", "integer").indexOf(e.keyCode) === -1) {
                return ;
            }

            input.val("");
            that._addTag(val.replace(",", ""));
            input.attr("size", 1);

            if (e.keyCode === Metro.keyCode.ENTER) {
                e.preventDefault();
            }
        });

        container.on(Metro.events.click, ".tag .remover", function(){
            var tag = $(this).closest(".tag");
            that._delTag(tag);
        });

        container.on(Metro.events.click, function(){
            input.focus();
        });
    },

    _addTag: function(val){
        var element = this.element, o = this.options;
        var container = element.closest(".tag-input");
        var input = container.find(".input-wrapper");
        var tag, title, remover;

        if (o.maxTags > 0 && this.values.length === o.maxTags) {
            return ;
        }

        if ((""+val).trim() === "") {
            return ;
        }

        if (!Utils.exec(o.onBeforeTagAdd, [val, this.values], element[0])) {
            return ;
        }


        tag = $("<span>").addClass("tag").addClass(o.clsTag).insertBefore(input);
        tag.data("value", val);

        title = $("<span>").addClass("title").addClass(o.clsTagTitle).html(val);
        remover = $("<span>").addClass("remover").addClass(o.clsTagRemover).html("&times;");

        title.appendTo(tag);
        remover.appendTo(tag);

        if (o.randomColor === true) {
            var colors = Colors.colors(Colors.PALETTES.ALL), bg, fg, bg_r;

            bg = colors[Utils.random(0, colors.length - 1)];
            bg_r = Colors.darken(bg, 15);
            fg = Colors.isDark(bg) ? "#ffffff" : "#000000";

            tag.css({
                backgroundColor: bg,
                color: fg
            });
            remover.css({
                backgroundColor: bg_r,
                color: fg
            });
        }

        this.values.push(val);
        element.val(this.values.join(o.tagSeparator));

        Utils.exec(o.onTagAdd, [tag[0], val, this.values], element[0]);
        element.fire("tagadd", {
            tag: tag[0],
            val: val,
            values: this.values
        });

        Utils.exec(o.onTag, [tag[0], val, this.values], element[0]);
        element.fire("tag", {
            tag: tag[0],
            val: val,
            values: this.values
        });
    },

    _delTag: function(tag) {
        var element = this.element, o = this.options;
        var val = tag.data("value");

        if (!Utils.exec(o.onBeforeTagRemove, [tag, val, this.values], element[0])) {
            return ;
        }

        Utils.arrayDelete(this.values, val);
        element.val(this.values.join(o.tagSeparator));

        Utils.exec(o.onTagRemove, [tag[0], val, this.values], element[0]);
        element.fire("tagremove", {
            tag: tag[0],
            val: val,
            values: this.values
        });

        Utils.exec(o.onTag, [tag[0], val, this.values], element[0]);
        element.fire("tag", {
            tag: tag[0],
            val: val,
            values: this.values
        });

        tag.remove();
    },

    tags: function(){
        return this.values;
    },

    val: function(v){
        var that = this, o = this.options;

        if (!Utils.isValue(v)) {
            return this.tags();
        }

        this.values = [];

        if (Utils.isValue(v)) {
            $.each(Utils.strToArray(v, o.tagSeparator), function(){
                that._addTag(this);
            })
        }
    },

    clear: function(){
        var element = this.element;
        var container = element.closest(".tag-input");

        this.values = [];
        element.val("");

        container.find(".tag").remove();
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeValue = function(){
            var val = element.attr("value").trim();
            that.clear();
            if (!Utils.isValue(val)) {
                return ;
            }
            that.val(Utils.strToArray(val, ","));
        };

        switch (attributeName) {
            case "value": changeValue(); break;
            case "disabled": this.toggleState(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var container = element.closest(".tag-input");
        var input = container.find(".input-wrapper");

        input.off(Metro.events.focus);
        input.off(Metro.events.blur);
        input.off(Metro.events.keydown);
        container.off(Metro.events.click, ".tag .remover");
        container.off(Metro.events.click);

        return element;
    }
};

Metro.plugin('taginput', TagInput);

var TextareaDefaultConfig = {
    charsCounter: null,
    charsCounterTemplate: "$1",
    defaultValue: "",
    prepend: "",
    append: "",
    copyInlineStyles: true,
    clearButton: true,
    clearButtonIcon: "<span class='default-icon-cross'></span>",
    autoSize: true,
    clsPrepend: "",
    clsAppend: "",
    clsComponent: "",
    clsTextarea: "",
    onChange: Metro.noop,
    onTextareaCreate: Metro.noop
};

Metro.textareaSetup = function (options) {
    TextareaDefaultConfig = $.extend({}, TextareaDefaultConfig, options);
};

if (typeof window["metroTextareaSetup"] !== undefined) {
    Metro.textareaSetup(window["metroTextareaSetup"]);
}

var Textarea = {
    init: function( options, elem ) {
        this.options = $.extend( {}, TextareaDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "textarea");

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onTextareaCreate, null, element[0]);
        element.fire("textareacreate");
    },

    _createStructure: function(){
        var that = this, element = this.element, elem = this.elem, o = this.options;
        var container = $("<div>").addClass("textarea " + element[0].className);
        var fakeTextarea = $("<textarea>").addClass("fake-textarea");
        var clearButton;
        var timer = null;

        container.insertBefore(element);
        element.appendTo(container);
        fakeTextarea.appendTo(container);

        if (o.clearButton !== false && !element[0].readOnly) {
            clearButton = $("<button>").addClass("button input-clear-button").attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.appendTo(container);
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        if (o.prepend !== "") {
            var prepend = $("<div>").html(o.prepend);
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (o.append !== "") {
            var append = $("<div>").html(o.append);
            append.addClass("append").addClass(o.clsAppend).appendTo(container);
            clearButton.css({
                right: append.outerWidth() + 4
            });
        }

        elem.className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = elem.style.length; i < l; i++) {
                container.css(elem.style[i], element.css(elem.style[i]));
            }
        }

        if (Utils.isValue(o.defaultValue) && element.val().trim() === "") {
            element.val(o.defaultValue);
        }

        container.addClass(o.clsComponent);
        element.addClass(o.clsTextarea);

        if (element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }

        fakeTextarea.val(element.val());

        if (o.autoSize === true) {

            container.addClass("autosize no-scroll-vertical");

            timer = setTimeout(function(){
                timer = null;
                that.resize();
            }, 100);
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var textarea = element.closest(".textarea");
        var fakeTextarea = textarea.find(".fake-textarea");
        var chars_counter = $(o.charsCounter);

        textarea.on(Metro.events.click, ".input-clear-button", function(){
            element.val(Utils.isValue(o.defaultValue) ? o.defaultValue : "").trigger('change').trigger('keyup').focus();
        });

        if (o.autoSize) {
            element.on(Metro.events.inputchange + " " + Metro.events.keyup, function(){
                fakeTextarea.val(this.value);
                that.resize();
            });
        }

        element.on(Metro.events.blur, function(){textarea.removeClass("focused");});
        element.on(Metro.events.focus, function(){textarea.addClass("focused");});

        element.on(Metro.events.keyup, function(){
            if (Utils.isValue(o.charsCounter) && chars_counter.length > 0) {
                if (chars_counter[0].tagName === "INPUT") {
                    chars_counter.val(that.length());
                } else {
                    chars_counter.html(o.charsCounterTemplate.replace("$1", that.length()));
                }
            }
            Utils.exec(o.onChange, [element.val(), that.length()], element[0]);
            element.fire("change", {
                val: element.val(),
                length: that.length()
            });
        })
    },

    resize: function(){
        var element = this.element,
            textarea = element.closest(".textarea"),
            fakeTextarea = textarea.find(".fake-textarea");

        fakeTextarea[0].style.cssText = 'height:auto;';
        fakeTextarea[0].style.cssText = 'height:' + fakeTextarea[0].scrollHeight + 'px';
        element[0].style.cssText = 'height:' + fakeTextarea[0].scrollHeight + 'px';

    },

    clear: function(){
        this.element.val("").trigger('change').trigger('keyup').focus();
    },

    toDefault: function(){
        this.element.val(Utils.isValue(this.options.defaultValue) ? this.options.defaultValue : "").trigger('change').trigger('keyup').focus();
    },

    length: function(){
        var characters = this.elem.value.split('');
        return characters.length;
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    },

    destroy: function(){
        var element = this.element, o = this.options;
        var textarea = element.closest(".textarea");

        textarea.off(Metro.events.click, ".input-clear-button");

        if (o.autoSize) {
            element.off(Metro.events.inputchange + " " + Metro.events.keyup);
        }

        element.off(Metro.events.blur);
        element.off(Metro.events.focus);

        element.off(Metro.events.keyup);

        return element;
    }
};

Metro.plugin('textarea', Textarea);

var TileDefaultConfig = {
    size: "medium",
    cover: "",
    coverPosition: "center",
    effect: "",
    effectInterval: 3000,
    effectDuration: 500,
    target: null,
    canTransform: true,
    onClick: Metro.noop,
    onTileCreate: Metro.noop
};

Metro.tileSetup = function (options) {
    TileDefaultConfig = $.extend({}, TileDefaultConfig, options);
};

if (typeof window["metroTileSetup"] !== undefined) {
    Metro.tileSetup(window["metroTileSetup"]);
}

var Tile = {
    init: function( options, elem ) {
        this.options = $.extend( {}, TileDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.effectInterval = false;
        this.images = [];
        this.slides = [];
        this.currentSlide = -1;
        this.unload = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, "tile");

        this._createTile();
        this._createEvents();

        Utils.exec(o.onTileCreate, null, element[0]);
        element.fire("tilecreate");
    },

    _createTile: function(){
        function switchImage(el, img_src, i){
            $.setTimeout(function(){
                el.fadeOut(500, function(){
                    el.css("background-image", "url(" + img_src + ")");
                    el.fadeIn();
                });
            }, /*Utils.random(300,1000)*/ i * 300);
        }

        var that = this, element = this.element, o = this.options;
        var slides = element.find(".slide");
        var slides2 = element.find(".slide-front, .slide-back");

        element.addClass("tile-" + o.size);

        if (o.effect.indexOf("hover-") > -1) {
            element.addClass("effect-" + o.effect);
            $.each(slides2, function(){
                var slide = $(this);

                if (slide.data("cover") !== undefined) {
                    that._setCover(slide, slide.data("cover"), slide.data("cover-position"));
                }
            })
        }

        if (o.effect.indexOf("animate-") > -1 && slides.length > 1) {
            $.each(slides, function(i){
                var slide = $(this);

                that.slides.push(this);

                if (slide.data("cover") !== undefined) {
                    that._setCover(slide, slide.data("cover"), slide.data("cover-position"));
                }

                if (i > 0) {
                    if (["animate-slide-up", "animate-slide-down"].indexOf(o.effect) > -1) slide.css("top", "100%");
                    if (["animate-slide-left", "animate-slide-right"].indexOf(o.effect) > -1) slide.css("left", "100%");
                    if (["animate-fade"].indexOf(o.effect) > -1) slide.css("opacity", 0);
                }
            });

            this.currentSlide = 0;

            this._runEffects();
        }

        if (o.cover !== "") {
            this._setCover(element, o.cover);
        }

        if (o.effect === "image-set") {
            element.addClass("image-set");

            $.each(element.children("img"), function(i){
                that.images.push(this);
                $(this).remove();
            });

            var temp = this.images.slice();

            for(var i = 0; i < 5; i++) {
                var rnd_index = Utils.random(0, temp.length - 1);
                var div = $("<div>").addClass("img -js-img-"+i).css("background-image", "url("+temp[rnd_index].src+")");
                element.prepend(div);
                temp.splice(rnd_index, 1);
            }

            var a = [0, 1, 4, 3, 2];

            $.setInterval(function(){
                var temp = that.images.slice();
                var colors = Colors.colors(Colors.PALETTES.ALL), bg;
                bg = colors[Utils.random(0, colors.length - 1)];

                element.css("background-color", bg);

                for(var i = 0; i < a.length; i++) {
                    var rnd_index = Utils.random(0, temp.length - 1);
                    var div = element.find(".-js-img-"+a[i]);
                    switchImage(div, temp[rnd_index].src, i);
                    temp.splice(rnd_index, 1);
                }

                a = a.reverse();
            }, 5000);
        }
    },

    _runEffects: function(){
        var that = this, o = this.options;

        if (this.effectInterval === false) this.effectInterval = $.setInterval(function(){
            var current, next;

            current = $(that.slides[that.currentSlide]);

            that.currentSlide++;
            if (that.currentSlide === that.slides.length) {
                that.currentSlide = 0;
            }

            next = that.slides[that.currentSlide];

            if (o.effect === "animate-slide-up") Animation.slideUp($(current), $(next), o.effectDuration);
            if (o.effect === "animate-slide-down") Animation.slideDown($(current), $(next), o.effectDuration);
            if (o.effect === "animate-slide-left") Animation.slideLeft($(current), $(next), o.effectDuration);
            if (o.effect === "animate-slide-right") Animation.slideRight($(current), $(next), o.effectDuration);
            if (o.effect === "animate-fade") Animation.fade($(current), $(next), o.effectDuration);

        }, o.effectInterval);
    },

    _stopEffects: function(){
        $.clearInterval(this.effectInterval);
        this.effectInterval = false;
    },

    _setCover: function(to, src, pos){
        if (!Utils.isValue(pos)) {
            pos = this.options.coverPosition;
        }
        to.css({
            backgroundImage: "url("+src+")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: pos
        });
    },

    _createEvents: function(){
        var element = this.element, o = this.options;

        element.on(Metro.events.startAll, function(e){
            var tile = $(this);
            var dim = {w: element.width(), h: element.height()};
            var X = Utils.pageXY(e).x - tile.offset().left,
                Y = Utils.pageXY(e).y - tile.offset().top;
            var side;

            if (Utils.isRightMouse(e) === false) {

                if (X < dim.w * 1 / 3 && (Y < dim.h * 1 / 2 || Y > dim.h * 1 / 2)) {
                    side = 'left';
                } else if (X > dim.w * 2 / 3 && (Y < dim.h * 1 / 2 || Y > dim.h * 1 / 2)) {
                    side = 'right';
                } else if (X > dim.w * 1 / 3 && X < dim.w * 2 / 3 && Y > dim.h / 2) {
                    side = 'bottom';
                } else {
                    side = "top";
                }

                if (o.canTransform === true) tile.addClass("transform-" + side);

                if (o.target !== null) {
                    setTimeout(function(){
                        document.location.href = o.target;
                    }, 100);
                }

                Utils.exec(o.onClick, [side], element[0]);
                element.fire("click", {
                    side: side
                });
            }
        });

        element.on([Metro.events.stopAll, Metro.events.leave].join(" "), function(){
            $(this)
                .removeClass("transform-left")
                .removeClass("transform-right")
                .removeClass("transform-top")
                .removeClass("transform-bottom");
        });
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;

        element.off(Metro.events.startAll);

        element.off([Metro.events.stopAll, Metro.events.leave].join(" "));

        return element;
    }
};

Metro.plugin('tile', Tile);

var TimePickerDefaultConfig = {
    hoursStep: 1,
    minutesStep: 1,
    secondsStep: 1,
    value: null,
    locale: METRO_LOCALE,
    distance: 3,
    hours: true,
    minutes: true,
    seconds: true,
    showLabels: true,
    scrollSpeed: 4,
    copyInlineStyles: true,
    clsPicker: "",
    clsPart: "",
    clsHours: "",
    clsMinutes: "",
    clsSeconds: "",
    okButtonIcon: "<span class='default-icon-check'></span>",
    cancelButtonIcon: "<span class='default-icon-cross'></span>",
    onSet: Metro.noop,
    onOpen: Metro.noop,
    onClose: Metro.noop,
    onScroll: Metro.noop,
    onTimePickerCreate: Metro.noop
};

Metro.timePickerSetup = function (options) {
    TimePickerDefaultConfig = $.extend({}, TimePickerDefaultConfig, options);
};

if (typeof window["metroTimePickerSetup"] !== undefined) {
    Metro.timePickerSetup(window["metroTimePickerSetup"]);
}

var TimePicker = {
    init: function( options, elem ) {
        this.options = $.extend( {}, TimePickerDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.picker = null;
        this.isOpen = false;
        this.value = [];
        this.locale = Metro.locales[METRO_LOCALE]['calendar'];
        this.listTimer = {
            hours: null,
            minutes: null,
            seconds: null
        };


        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var element = this.element, o = this.options;
        var i;

        Metro.checkRuntime(element, "timepicker");

        if (o.distance < 1) {
            o.distance = 1;
        }

        if (o.hoursStep < 1) {o.hoursStep = 1;}
        if (o.hoursStep > 23) {o.hoursStep = 23;}

        if (o.minutesStep < 1) {o.minutesStep = 1;}
        if (o.minutesStep > 59) {o.minutesStep = 59;}

        if (o.secondsStep < 1) {o.secondsStep = 1;}
        if (o.secondsStep > 59) {o.secondsStep = 59;}

        if (element.val() === "" && (!Utils.isValue(o.value))) {
            o.value = (new Date()).format("%H:%M:%S");
        }

        this.value = Utils.strToArray(element.val() !== "" ? element.val() : String(o.value), ":");

        for(i = 0; i < 3; i++) {
            if (this.value[i] === undefined || this.value[i] === null) {
                this.value[i] = 0;
            } else {
                this.value[i] = parseInt(this.value[i]);
            }
        }

        this._normalizeValue();

        if (Metro.locales[o.locale] === undefined) {
            o.locale = METRO_LOCALE;
        }

        this.locale = Metro.locales[o.locale]['calendar'];

        this._createStructure();
        this._createEvents();
        this._set();

        Utils.exec(o.onTimePickerCreate, null, element[0]);
        element.fire("timepickercreate");
    },

    _normalizeValue: function(){
        var o = this.options;

        if (o.hoursStep > 1) {
            this.value[0] = Utils.nearest(this.value[0], o.hoursStep, true);
        }
        if (o.minutesStep > 1) {
            this.value[1] = Utils.nearest(this.value[1], o.minutesStep, true);
        }
        if (o.minutesStep > 1) {
            this.value[2] = Utils.nearest(this.value[2], o.secondsStep, true);
        }
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var picker, hours, minutes, seconds, i;
        var timeWrapper, selectWrapper, selectBlock, actionBlock;

        var prev = element.prev();
        var parent = element.parent();
        var id = Utils.elementId("time-picker");

        picker = $("<div>").attr("id", id).addClass("wheel-picker time-picker " + element[0].className).addClass(o.clsPicker);

        if (prev.length === 0) {
            parent.prepend(picker);
        } else {
            picker.insertAfter(prev);
        }

        element.attr("readonly", true).appendTo(picker);


        timeWrapper = $("<div>").addClass("time-wrapper").appendTo(picker);

        if (o.hours === true) {
            hours = $("<div>").attr("data-title", this.locale['time']['hours']).addClass("hours").addClass(o.clsPart).addClass(o.clsHours).appendTo(timeWrapper);
        }
        if (o.minutes === true) {
            minutes = $("<div>").attr("data-title", this.locale['time']['minutes']).addClass("minutes").addClass(o.clsPart).addClass(o.clsMinutes).appendTo(timeWrapper);
        }
        if (o.seconds === true) {
            seconds = $("<div>").attr("data-title", this.locale['time']['seconds']).addClass("seconds").addClass(o.clsPart).addClass(o.clsSeconds).appendTo(timeWrapper);
        }

        selectWrapper = $("<div>").addClass("select-wrapper").appendTo(picker);

        selectBlock = $("<div>").addClass("select-block").appendTo(selectWrapper);
        if (o.hours === true) {
            hours = $("<ul>").addClass("sel-hours").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(hours);
            for (i = 0; i < 24; i = i + o.hoursStep) {
                $("<li>").addClass("js-hours-"+i).html(i < 10 ? "0"+i : i).data("value", i).appendTo(hours);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(hours);
        }
        if (o.minutes === true) {
            minutes = $("<ul>").addClass("sel-minutes").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(minutes);
            for (i = 0; i < 60; i = i + o.minutesStep) {
                $("<li>").addClass("js-minutes-"+i).html(i < 10 ? "0"+i : i).data("value", i).appendTo(minutes);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(minutes);
        }
        if (o.seconds === true) {
            seconds = $("<ul>").addClass("sel-seconds").appendTo(selectBlock);
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(seconds);
            for (i = 0; i < 60; i = i + o.secondsStep) {
                $("<li>").addClass("js-seconds-"+i).html(i < 10 ? "0"+i : i).data("value", i).appendTo(seconds);
            }
            for (i = 0; i < o.distance; i++) $("<li>").html("&nbsp;").data("value", -1).appendTo(seconds);
        }

        selectBlock.height((o.distance * 2 + 1) * 40);

        actionBlock = $("<div>").addClass("action-block").appendTo(selectWrapper);
        $("<button>").attr("type", "button").addClass("button action-ok").html(o.okButtonIcon).appendTo(actionBlock);
        $("<button>").attr("type", "button").addClass("button action-cancel").html(o.cancelButtonIcon).appendTo(actionBlock);


        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (i = 0; i < element[0].style.length; i++) {
                picker.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (o.showLabels === true) {
            picker.addClass("show-labels");
        }

        this.picker = picker;
    },

    _createEvents: function(){
        var that = this, o = this.options;
        var picker = this.picker;

        picker.on(Metro.events.start, ".select-block ul", function(e){

            if (e.changedTouches) {
                return ;
            }

            var target = this;
            var pageY = Utils.pageXY(e).y;

            $(document).on(Metro.events.move, function(e){

                target.scrollTop -= o.scrollSpeed * (pageY  > Utils.pageXY(e).y ? -1 : 1);

                pageY = Utils.pageXY(e).y;
            }, {ns: picker.attr("id")});

            $(document).on(Metro.events.stop, function(){
                $(document).off(Metro.events.move, {ns: picker.attr("id")});
                $(document).off(Metro.events.stop, {ns: picker.attr("id")});
            }, {ns: picker.attr("id")});
        });

        picker.on(Metro.events.click, function(e){
            if (that.isOpen === false) that.open();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-ok", function(e){
            var h, m, s;
            var sh = picker.find(".sel-hours li.active"),
                sm = picker.find(".sel-minutes li.active"),
                ss = picker.find(".sel-seconds li.active");

            h = sh.length === 0 ? 0 : sh.data("value");
            m = sm.length === 0 ? 0 : sm.data("value");
            s = ss.length === 0 ? 0 : ss.data("value");

            that.value = [h, m, s];
            that._normalizeValue();
            that._set();

            that.close();
            e.stopPropagation();
        });

        picker.on(Metro.events.click, ".action-cancel", function(e){
            that.close();
            e.stopPropagation();
        });

        var scrollLatency = 150;
        $.each(['hours', 'minutes', 'seconds'], function(){
            var part = this, list = picker.find(".sel-"+part);

            list.on("scroll", function(){
                if (that.isOpen) {
                    if (that.listTimer[part]) {
                        clearTimeout(that.listTimer[part]);
                        that.listTimer[part] = null;
                    }

                    if (!that.listTimer[part]) that.listTimer[part] = setTimeout(function () {

                        var target, targetElement, scrollTop;

                        that.listTimer[part] = null;

                        target = Math.round((Math.ceil(list.scrollTop()) / 40));

                        targetElement = list.find(".js-" + part + "-" + target);
                        scrollTop = targetElement.position().top - (o.distance * 40);

                        list.find(".active").removeClass("active");

                        list[0].scrollTop = scrollTop;
                        targetElement.addClass("active");
                        Utils.exec(o.onScroll, [targetElement, list, picker], list[0]);

                    }, scrollLatency);
                }
            })
        });
    },

    _set: function(){
        var element = this.element, o = this.options;
        var picker = this.picker;
        var h = "00", m = "00", s = "00";

        if (o.hours === true) {
            h = parseInt(this.value[0]);
            if (h < 10) {
                h = "0"+h;
            }
            picker.find(".hours").html(h);
        }
        if (o.minutes === true) {
            m = parseInt(this.value[1]);
            if (m < 10) {
                m = "0"+m;
            }
            picker.find(".minutes").html(m);
        }
        if (o.seconds === true) {
            s = parseInt(this.value[2]);
            if (s < 10) {
                s = "0"+s;
            }
            picker.find(".seconds").html(s);
        }

        element.val([h, m, s].join(":")).trigger("change");

        Utils.exec(o.onSet, [this.value, element.val()], element[0]);
        element.fire("set", {
            val: this.value,
            elementVal: element.val()
        });
    },

    open: function(){
        var element = this.element, o = this.options;
        var picker = this.picker;
        var h, m, s;
        var h_list, m_list, s_list;
        var items = picker.find("li");
        var select_wrapper = picker.find(".select-wrapper");
        var select_wrapper_in_viewport, select_wrapper_rect;
        var h_item, m_item, s_item;

        select_wrapper.parent().removeClass("for-top for-bottom");
        select_wrapper.show(0);
        items.removeClass("active");

        select_wrapper_in_viewport = Utils.inViewport(select_wrapper[0]);
        select_wrapper_rect = Utils.rect(select_wrapper[0]);

        if (!select_wrapper_in_viewport && select_wrapper_rect.top > 0) {
            select_wrapper.parent().addClass("for-bottom");
        }

        if (!select_wrapper_in_viewport && select_wrapper_rect.top < 0) {
            select_wrapper.parent().addClass("for-top");
        }

        var animateList = function(list, item){
            list.scrollTop(0).animate({
                scrollTop: item.position().top - (o.distance * 40) + list.scrollTop()
            }, 100);
        };

        if (o.hours === true) {
            h = parseInt(this.value[0]);
            h_list = picker.find(".sel-hours");
            h_item = h_list.find("li.js-hours-" + h).addClass("active");
            animateList(h_list, h_item);
        }
        if (o.minutes === true) {
            m = parseInt(this.value[1]);
            m_list = picker.find(".sel-minutes");
            m_item = m_list.find("li.js-minutes-" + m).addClass("active");
            animateList(m_list, m_item);
        }
        if (o.seconds === true) {
            s = parseInt(this.value[2]);
            s_list = picker.find(".sel-seconds");
            s_item = s_list.find("li.js-seconds-" + s).addClass("active");
            animateList(s_list, s_item);
        }

        this.isOpen = true;

        Utils.exec(o.onOpen, [this.value], element[0]);
        element.fire("open", {
            val: this.value
        });
    },

    close: function(){
        var picker = this.picker, o = this.options, element = this.element;
        picker.find(".select-wrapper").hide(0);
        this.isOpen = false;
        Utils.exec(o.onClose, [this.value], element[0]);
        element.fire("close", {
            val: this.value
        });
    },

    _convert: function(t){
        var result;

        if (Array.isArray(t)) {
            result = t;
        } else if (typeof  t.getMonth === 'function') {
            result = [t.getHours(), t.getMinutes(), t.getSeconds()];
        } else if (Utils.isObject(t)) {
            result = [t.h, t.m, t.s];
        } else {
            result = Utils.strToArray(t, ":");
        }

        return result;
    },

    val: function(t){
        if (t === undefined) {
            return this.element.val();
        }
        this.value = this._convert(t);
        this._normalizeValue();
        this._set();
    },

    time: function(t){
        if (t === undefined) {
            return {
                h: this.value[0],
                m: this.value[1],
                s: this.value[2]
            }
        }

        this.value = this._convert(t);
        this._normalizeValue();
        this._set();
    },

    date: function(t){
        if (t === undefined || typeof t.getMonth !== 'function') {
            var ret = new Date();
            ret.setHours(this.value[0]);
            ret.setMinutes(this.value[1]);
            ret.setSeconds(this.value[2]);
            ret.setMilliseconds(0);
            return ret;
        }

        this.value = this._convert(t);
        this._normalizeValue();
        this._set();
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element;

        var changeValueAttribute = function(){
            that.val(element.attr("data-value"));
        };

        if (attributeName === "data-value") {
            changeValueAttribute();
        }
    },

    destroy: function(){
        var element = this.element;
        var picker = this.picker;

        $.each(['hours', 'minutes', 'seconds'], function(){
            picker.find(".sel-"+this).off("scroll");
        });

        picker.off(Metro.events.start, ".select-block ul");
        picker.off(Metro.events.click);
        picker.off(Metro.events.click, ".action-ok");
        picker.off(Metro.events.click, ".action-cancel");

        return element;
    }

};

Metro.plugin('timepicker', TimePicker);

$(document).on(Metro.events.click, function(){
    $.each($(".time-picker"), function(){
        $(this).find("input").each(function(){
            Metro.getPlugin(this, "timepicker").close();
        });
    });
});


var Toast = {

    options: {
        callback: Metro.noop,
        timeout: METRO_TIMEOUT,
        distance: 20,
        showTop: false,
        clsToast: ""
    },

    create: function(message, callback, timeout, cls, options){
        var o = options || Toast.options;
        var toast = $("<div>").addClass("toast").html(message).appendTo($("body")).hide();
        var width = toast.outerWidth();
        var timer = null;

        timeout = timeout || o.timeout;
        callback = callback || o.callback;
        cls = cls || o.clsToast;

        if (o.showTop === true) {
            toast.addClass("show-top").css({
                top: o.distance
            });
        } else {
            toast.css({
                bottom: o.distance
            })
        }

        toast.css({
            'left': '50%',
            'margin-left': -(width / 2)
        });
        toast.addClass(o.clsToast);
        toast.addClass(cls);
        toast.fadeIn(METRO_ANIMATION_DURATION);

        timer = setTimeout(function(){
            timer = null;
            toast.fadeOut(METRO_ANIMATION_DURATION, function(){
                toast.remove();
                Utils.callback(callback);
            });
        }, timeout);
    }
};

Metro['toast'] = Toast;

var TouchConst = {
    LEFT : "left",
    RIGHT : "right",
    UP : "up",
    DOWN : "down",
    IN : "in",
    OUT : "out",
    NONE : "none",
    AUTO : "auto",
    SWIPE : "swipe",
    PINCH : "pinch",
    TAP : "tap",
    DOUBLE_TAP : "doubletap",
    LONG_TAP : "longtap",
    HOLD : "hold",
    HORIZONTAL : "horizontal",
    VERTICAL : "vertical",
    ALL_FINGERS : "all",
    DOUBLE_TAP_THRESHOLD : 10,
    PHASE_START : "start",
    PHASE_MOVE : "move",
    PHASE_END : "end",
    PHASE_CANCEL : "cancel",
    SUPPORTS_TOUCH : 'ontouchstart' in window,
    SUPPORTS_POINTER_IE10 : window.navigator.msPointerEnabled && !window.navigator.pointerEnabled && !('ontouchstart' in window),
    SUPPORTS_POINTER : (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && !('ontouchstart' in window),
    IN_TOUCH: "intouch"
};

var Touch = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this.useTouchEvents = (TouchConst.SUPPORTS_TOUCH || TouchConst.SUPPORTS_POINTER || !this.options.fallbackToMouseEvents);
        this.START_EV = this.useTouchEvents ? (TouchConst.SUPPORTS_POINTER ? (TouchConst.SUPPORTS_POINTER_IE10 ? 'MSPointerDown' : 'pointerdown') : 'touchstart') : 'mousedown';
        this.MOVE_EV = this.useTouchEvents ? (TouchConst.SUPPORTS_POINTER ? (TouchConst.SUPPORTS_POINTER_IE10 ? 'MSPointerMove' : 'pointermove') : 'touchmove') : 'mousemove';
        this.END_EV = this.useTouchEvents ? (TouchConst.SUPPORTS_POINTER ? (TouchConst.SUPPORTS_POINTER_IE10 ? 'MSPointerUp' : 'pointerup') : 'touchend') : 'mouseup';
        this.LEAVE_EV = this.useTouchEvents ? (TouchConst.SUPPORTS_POINTER ? 'mouseleave' : null) : 'mouseleave'; //we manually detect leave on touch devices, so null event here
        this.CANCEL_EV = (TouchConst.SUPPORTS_POINTER ? (TouchConst.SUPPORTS_POINTER_IE10 ? 'MSPointerCancel' : 'pointercancel') : 'touchcancel');

        //touch properties
        this.distance = 0;
        this.direction = null;
        this.currentDirection = null;
        this.duration = 0;
        this.startTouchesDistance = 0;
        this.endTouchesDistance = 0;
        this.pinchZoom = 1;
        this.pinchDistance = 0;
        this.pinchDirection = 0;
        this.maximumsMap = null;

        //Current phase of th touch cycle
        this.phase = "start";

        // the current number of fingers being used.
        this.fingerCount = 0;

        //track mouse points / delta
        this.fingerData = {};

        //track times
        this.startTime = 0;
        this.endTime = 0;
        this.previousTouchEndTime = 0;
        this.fingerCountAtRelease = 0;
        this.doubleTapStartTime = 0;

        //Timeouts
        this.singleTapTimeout = null;
        this.holdTimeout = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        fingers: 2,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: false,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: ".no-swipe",
        preventDefaultEvents: true,

        onSwipe: Metro.noop,
        onSwipeLeft: Metro.noop,
        onSwipeRight: Metro.noop,
        onSwipeUp: Metro.noop,
        onSwipeDown: Metro.noop,
        onSwipeStatus: Metro.noop_true, // params: phase, direction, distance, duration, fingerCount, fingerData, currentDirection
        onPinchIn: Metro.noop,
        onPinchOut: Metro.noop,
        onPinchStatus: Metro.noop_true,
        onTap: Metro.noop,
        onDoubleTap: Metro.noop,
        onLongTap: Metro.noop,
        onHold: Metro.noop,

        onSwipeCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        if (o.allowPageScroll === undefined && (o.onSwipe !== Metro.noop || o.onSwipeStatus !== Metro.noop)) {
            o.allowPageScroll = TouchConst.NONE;
        }

        try {
            element.on(this.START_EV, $.proxy(this.touchStart, that));
            element.on(this.CANCEL_EV, $.proxy(this.touchCancel, that));
        } catch (e) {
            throw new Error('Events not supported ' + this.START_EV + ',' + this.CANCEL_EV + ' on Swipe');
        }

        Utils.exec(o.onSwipeCreate, null, element[0]);
        element.fire("swipecreate");
    },

    touchStart: function(e) {
        var element = this.element, options = this.options;

        //If we already in a touch event (a finger already in use) then ignore subsequent ones..
        if (this.getTouchInProgress()) {
            return;
        }

        //Check if this element matches any in the excluded elements selectors,  or its parent is excluded, if so, DON'T swipe
        if ($(e.target).closest(options.excludedElements).length > 0) {
            return;
        }

        //As we use Jquery bind for events, we need to target the original event object
        //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
        var event = e;

        var ret,
            touches = event.touches,
            evt = touches ? touches[0] : event;

        this.phase = TouchConst.PHASE_START;

        //If we support touches, get the finger count
        if (touches) {
            // get the total number of fingers touching the screen
            this.fingerCount = touches.length;
        }
        //Else this is the desktop, so stop the browser from dragging content
        else if (options.preventDefaultEvents !== false) {
            e.preventDefault(); //call this on jq event so we are cross browser
        }

        //clear vars..
        this.distance = 0;
        this.direction = null;
        this.currentDirection=null;
        this.pinchDirection = null;
        this.duration = 0;
        this.startTouchesDistance = 0;
        this.endTouchesDistance = 0;
        this.pinchZoom = 1;
        this.pinchDistance = 0;
        this.maximumsMap = this.createMaximumsData();
        this.cancelMultiFingerRelease();

        //Create the default finger data
        this.createFingerData(0, evt);

        // check the number of fingers is what we are looking for, or we are capturing pinches
        if (!touches || (this.fingerCount === options.fingers || options.fingers === TouchConst.ALL_FINGERS) || this.hasPinches()) {
            // get the coordinates of the touch
            this.startTime = this.getTimeStamp();

            if (this.fingerCount === 2) {
                //Keep track of the initial pinch distance, so we can calculate the diff later
                //Store second finger data as start
                this.createFingerData(1, touches[1]);
                this.startTouchesDistance = this.endTouchesDistance = this.calculateTouchesDistance(this.fingerData[0].start, this.fingerData[1].start);
            }

            if (options.onSwipeStatus !== Metro.noop || options.onPinchStatus !== Metro.noop) {
                ret = this.triggerHandler(event, this.phase);
            }
        } else {
            //A touch with more or less than the fingers we are looking for, so cancel
            ret = false;
        }

        //If we have a return value from the users handler, then return and cancel
        if (ret === false) {
            this.phase = TouchConst.PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
            return ret;
        } else {
            if (options.onHold !== Metro.noop) {
                this.holdTimeout = setTimeout($.proxy(function() {
                    //Trigger the event
                    element.trigger('hold', [event.target]);
                    //Fire the callback
                    if (options.onHold !== Metro.noop) { // TODO Remove this if
                        ret = Utils.exec(options.onHold, [event, event.target], element[0]);
                        element.fire("hold", {
                            event: event,
                            target: event.target
                        });
                    }
                }, this), options.longTapThreshold);
            }

            this.setTouchInProgress(true);
        }

        return null;
    },

    touchMove: function(e) {
        //As we use Jquery bind for events, we need to target the original event object
        //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
        var event = e;

        //If we are ending, cancelling, or within the threshold of 2 fingers being released, don't track anything..
        if (this.phase === TouchConst.PHASE_END || this.phase === TouchConst.PHASE_CANCEL || this.inMultiFingerRelease())
            return;

        var ret,
            touches = event.touches,
            evt = touches ? touches[0] : event;

        //Update the  finger data
        var currentFinger = this.updateFingerData(evt);
        this.endTime = this.getTimeStamp();

        if (touches) {
            this.fingerCount = touches.length;
        }

        if (this.options.onHold !== Metro.noop) {
            clearTimeout(this.holdTimeout);
        }

        this.phase = TouchConst.PHASE_MOVE;

        //If we have 2 fingers get Touches distance as well
        if (this.fingerCount === 2) {

            //Keep track of the initial pinch distance, so we can calculate the diff later
            //We do this here as well as the start event, in case they start with 1 finger, and the press 2 fingers
            if (this.startTouchesDistance === 0) {
                //Create second finger if this is the first time...
                this.createFingerData(1, touches[1]);

                this.startTouchesDistance = this.endTouchesDistance = this.calculateTouchesDistance(this.fingerData[0].start, this.fingerData[1].start);
            } else {
                //Else just update the second finger
                this.updateFingerData(touches[1]);

                this.endTouchesDistance = this.calculateTouchesDistance(this.fingerData[0].end, this.fingerData[1].end);
                this.pinchDirection = this.calculatePinchDirection(this.fingerData[0].end, this.fingerData[1].end);
            }

            this.pinchZoom = this.calculatePinchZoom(this.startTouchesDistance, this.endTouchesDistance);
            this.pinchDistance = Math.abs(this.startTouchesDistance - this.endTouchesDistance);
        }

        if ((this.fingerCount === this.options.fingers || this.options.fingers === TouchConst.ALL_FINGERS) || !touches || this.hasPinches()) {

            //The overall direction of the swipe. From start to now.
            this.direction = this.calculateDirection(currentFinger.start, currentFinger.end);

            //The immediate direction of the swipe, direction between the last movement and this one.
            this.currentDirection = this.calculateDirection(currentFinger.last, currentFinger.end);

            //Check if we need to prevent default event (page scroll / pinch zoom) or not
            this.validateDefaultEvent(e, this.currentDirection);

            //Distance and duration are all off the main finger
            this.distance = this.calculateDistance(currentFinger.start, currentFinger.end);
            this.duration = this.calculateDuration();

            //Cache the maximum distance we made in this direction
            this.setMaxDistance(this.direction, this.distance);

            //Trigger status handler
            ret = this.triggerHandler(event, this.phase);


            //If we trigger end events when threshold are met, or trigger events when touch leaves element
            if (!this.options.triggerOnTouchEnd || this.options.triggerOnTouchLeave) {

                var inBounds = true;

                //If checking if we leave the element, run the bounds check (we can use touchleave as its not supported on webkit)
                if (this.options.triggerOnTouchLeave) {
                    var bounds = this.getBounds(this);
                    inBounds = this.isInBounds(currentFinger.end, bounds);
                }

                //Trigger end handles as we swipe if thresholds met or if we have left the element if the user has asked to check these..
                if (!this.options.triggerOnTouchEnd && inBounds) {
                    this.phase = this.getNextPhase(TouchConst.PHASE_MOVE);
                }
                //We end if out of bounds here, so set current phase to END, and check if its modified
                else if (this.options.triggerOnTouchLeave && !inBounds) {
                    this.phase = this.getNextPhase(TouchConst.PHASE_END);
                }

                if (this.phase === TouchConst.PHASE_CANCEL || this.phase === TouchConst.PHASE_END) {
                    this.triggerHandler(event, this.phase);
                }
            }
        } else {
            this.phase = TouchConst.PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
        }

        if (ret === false) {
            this.phase = TouchConst.PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
        }
    },

    touchEnd: function(e) {
        //As we use Jquery bind for events, we need to target the original event object
        //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
        var event = e,
            touches = event.touches;

        //If we are still in a touch with the device wait a fraction and see if the other finger comes up
        //if it does within the threshold, then we treat it as a multi release, not a single release and end the touch / swipe
        if (touches) {
            if (touches.length && !this.inMultiFingerRelease()) {
                this.startMultiFingerRelease(event);
                return true;
            } else if (touches.length && this.inMultiFingerRelease()) {
                return true;
            }
        }

        //If a previous finger has been released, check how long ago, if within the threshold, then assume it was a multifinger release.
        //This is used to allow 2 fingers to release fractionally after each other, whilst maintaining the event as containing 2 fingers, not 1
        if (this.inMultiFingerRelease()) {
            this.fingerCount = this.fingerCountAtRelease;
        }

        //Set end of swipe
        this.endTime = this.getTimeStamp();

        //Get duration incase move was never fired
        this.duration = this.calculateDuration();

        //If we trigger handlers at end of swipe OR, we trigger during, but they didnt trigger and we are still in the move phase
        if (this.didSwipeBackToCancel() || !this.validateSwipeDistance()) {
            this.phase = TouchConst.PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
        } else if (this.options.triggerOnTouchEnd || (this.options.triggerOnTouchEnd === false && this.phase === TouchConst.PHASE_MOVE)) {
            //call this on jq event so we are cross browser
            if (this.options.preventDefaultEvents !== false) {
                e.preventDefault();
            }
            this.phase = TouchConst.PHASE_END;
            this.triggerHandler(event, this.phase);
        }
        //Special cases - A tap should always fire on touch end regardless,
        //So here we manually trigger the tap end handler by itself
        //We dont run trigger handler as it will re-trigger events that may have fired already
        else if (!this.options.triggerOnTouchEnd && this.hasTap()) {
            //Trigger the pinch events...
            this.phase = TouchConst.PHASE_END;
            this.triggerHandlerForGesture(event, this.phase, TouchConst.TAP);
        } else if (this.phase === TouchConst.PHASE_MOVE) {
            this.phase = TouchConst.PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
        }

        this.setTouchInProgress(false);

        return null;
    },

    touchCancel: function() {
        // reset the variables back to default values
        this.fingerCount = 0;
        this.endTime = 0;
        this.startTime = 0;
        this.startTouchesDistance = 0;
        this.endTouchesDistance = 0;
        this.pinchZoom = 1;

        //If we were in progress of tracking a possible multi touch end, then re set it.
        this.cancelMultiFingerRelease();

        this.setTouchInProgress(false);
    },

    touchLeave: function(e) {
        if (this.options.triggerOnTouchLeave) {
            this.phase = this.getNextPhase(TouchConst.PHASE_END);
            this.triggerHandler(e, this.phase);
        }
    },

    getNextPhase: function(currentPhase) {
        var options  = this.options;
        var nextPhase = currentPhase;

        // Ensure we have valid swipe (under time and over distance  and check if we are out of bound...)
        var validTime = this.validateSwipeTime();
        var validDistance = this.validateSwipeDistance();
        var didCancel = this.didSwipeBackToCancel();

        //If we have exceeded our time, then cancel
        if (!validTime || didCancel) {
            nextPhase = TouchConst.PHASE_CANCEL;
        }
        //Else if we are moving, and have reached distance then end
        else if (validDistance && currentPhase === TouchConst.PHASE_MOVE && (!options.triggerOnTouchEnd || options.triggerOnTouchLeave)) {
            nextPhase = TouchConst.PHASE_END;
        }
        //Else if we have ended by leaving and didn't reach distance, then cancel
        else if (!validDistance && currentPhase === TouchConst.PHASE_END && options.triggerOnTouchLeave) {
            nextPhase = TouchConst.PHASE_CANCEL;
        }

        return nextPhase;
    },

    triggerHandler: function(event, phase) {
        var ret,
            touches = event.touches;

        // SWIPE GESTURES
        if (this.didSwipe() || this.hasSwipes()) {
            ret = this.triggerHandlerForGesture(event, phase, TouchConst.SWIPE);
        }

        // PINCH GESTURES (if the above didn't cancel)
        if ((this.didPinch() || this.hasPinches()) && ret !== false) {
            ret = this.triggerHandlerForGesture(event, phase, TouchConst.PINCH);
        }

        // CLICK / TAP (if the above didn't cancel)
        if (this.didDoubleTap() && ret !== false) {
            //Trigger the tap events...
            ret = this.triggerHandlerForGesture(event, phase, TouchConst.DOUBLE_TAP);
        }

        // CLICK / TAP (if the above didn't cancel)
        else if (this.didLongTap() && ret !== false) {
            //Trigger the tap events...
            ret = this.triggerHandlerForGesture(event, phase, TouchConst.LONG_TAP);
        }

        // CLICK / TAP (if the above didn't cancel)
        else if (this.didTap() && ret !== false) {
            //Trigger the tap event..
            ret = this.triggerHandlerForGesture(event, phase, TouchConst.TAP);
        }

        // If we are cancelling the gesture, then manually trigger the reset handler
        if (phase === TouchConst.PHASE_CANCEL) {
            this.touchCancel(event);
        }

        // If we are ending the gesture, then manually trigger the reset handler IF all fingers are off
        if (phase === TouchConst.PHASE_END) {
            //If we support touch, then check that all fingers are off before we cancel
            if (touches) {
                if (!touches.length) {
                    this.touchCancel(event);
                }
            } else {
                this.touchCancel(event);
            }
        }

        return ret;
    },

    triggerHandlerForGesture: function(event, phase, gesture) {

        var ret, element = this.element, options = this.options;

        //SWIPES....
        if (gesture === TouchConst.SWIPE) {
            //Trigger status every time..
            element.trigger('swipeStatus', [phase, this.direction || null, this.distance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.currentDirection]);

            ret = Utils.exec(options.onSwipeStatus, [event, phase, this.direction || null, this.distance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.currentDirection], element[0]);
            element.fire("swipestatus", {
                event: event,
                phase: phase,
                direction: this.direction,
                distance: this.distance,
                duration: this.duration,
                fingerCount: this.fingerCount,
                fingerData: this.fingerData,
                currentDirection: this.currentDirection
            });
            if (ret === false) return false;

            if (phase === TouchConst.PHASE_END && this.validateSwipe()) {

                //Cancel any taps that were in progress...
                clearTimeout(this.singleTapTimeout);
                clearTimeout(this.holdTimeout);

                element.trigger('swipe', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);

                ret = Utils.exec(options.onSwipe, [event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection], element[0]);
                element.fire("swipe", {
                    event: event,
                    direction: this.direction,
                    distance: this.distance,
                    duration: this.duration,
                    fingerCount: this.fingerCount,
                    fingerData: this.fingerData,
                    currentDirection: this.currentDirection
                });

                if (ret === false) return false;

                //trigger direction specific event handlers
                switch (this.direction) {
                    case TouchConst.LEFT:
                        element.trigger('swipeLeft', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);
                        ret = Utils.exec(options.onSwipeLeft, [event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection], element[0]);
                        element.fire("swipeleft", {
                            event: event,
                            direction: this.direction,
                            distance: this.distance,
                            duration: this.duration,
                            fingerCount: this.fingerCount,
                            fingerData: this.fingerData,
                            currentDirection: this.currentDirection
                        });
                        break;

                    case TouchConst.RIGHT:
                        element.trigger('swipeRight', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);
                        ret = Utils.exec(options.onSwipeRight, [event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection], element[0]);
                        element.fire("swiperight", {
                            event: event,
                            direction: this.direction,
                            distance: this.distance,
                            duration: this.duration,
                            fingerCount: this.fingerCount,
                            fingerData: this.fingerData,
                            currentDirection: this.currentDirection
                        });
                        break;

                    case TouchConst.UP:
                        element.trigger('swipeUp', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);
                        ret = Utils.exec(options.onSwipeUp, [event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection], element[0]);
                        element.fire("swipeup", {
                            event: event,
                            direction: this.direction,
                            distance: this.distance,
                            duration: this.duration,
                            fingerCount: this.fingerCount,
                            fingerData: this.fingerData,
                            currentDirection: this.currentDirection
                        });
                        break;

                    case TouchConst.DOWN:
                        element.trigger('swipeDown', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);
                        ret = Utils.exec(options.onSwipeDown, [event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection], element[0]);
                        element.fire("swipedown", {
                            event: event,
                            direction: this.direction,
                            distance: this.distance,
                            duration: this.duration,
                            fingerCount: this.fingerCount,
                            fingerData: this.fingerData,
                            currentDirection: this.currentDirection
                        });
                        break;
                }
            }
        }


        //PINCHES....
        if (gesture === TouchConst.PINCH) {
            element.trigger('pinchStatus', [phase, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom]);

            ret = Utils.exec(options.onPinchStatus, [event, phase, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom], element[0]);
            element.fire("pinchstatus", {
                event: event,
                phase: phase,
                direction: this.pinchDirection,
                distance: this.pinchDistance,
                duration: this.duration,
                fingerCount: this.fingerCount,
                fingerData: this.fingerData,
                zoom: this.pinchZoom
            });
            if (ret === false) return false;

            if (phase === TouchConst.PHASE_END && this.validatePinch()) {

                switch (this.pinchDirection) {
                    case TouchConst.IN:
                        element.trigger('pinchIn', [this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom]);
                        ret = Utils.exec(options.onPinchIn, [event, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom], element[0]);
                        element.fire("pinchin", {
                            event: event,
                            direction: this.pinchDirection,
                            distance: this.pinchDistance,
                            duration: this.duration,
                            fingerCount: this.fingerCount,
                            fingerData: this.fingerData,
                            zoom: this.pinchZoom
                        });
                        break;

                    case TouchConst.OUT:
                        element.trigger('pinchOut', [this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom]);
                        ret = Utils.exec(options.onPinchOut, [event, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom], element[0]);
                        element.fire("pinchout", {
                            event: event,
                            direction: this.pinchDirection,
                            distance: this.pinchDistance,
                            duration: this.duration,
                            fingerCount: this.fingerCount,
                            fingerData: this.fingerData,
                            zoom: this.pinchZoom
                        });
                        break;
                }
            }
        }

        if (gesture === TouchConst.TAP) {
            if (phase === TouchConst.PHASE_CANCEL || phase === TouchConst.PHASE_END) {

                clearTimeout(this.singleTapTimeout);
                clearTimeout(this.holdTimeout);

                //If we are also looking for doubelTaps, wait incase this is one...
                if (this.hasDoubleTap() && !this.inDoubleTap()) {
                    this.doubleTapStartTime = this.getTimeStamp();

                    //Now wait for the double tap timeout, and trigger this single tap
                    //if its not cancelled by a double tap
                    this.singleTapTimeout = setTimeout($.proxy(function() {
                        this.doubleTapStartTime = null;
                        ret = Utils.exec(options.onTap, [event, event.target], element[0]);
                        element.fire("tap", {
                            event: event,
                            target: event.target
                        });
                    }, this), options.doubleTapThreshold);

                } else {
                    this.doubleTapStartTime = null;
                    ret = Utils.exec(options.onTap, [event, event.target], element[0]);
                    element.fire("tap", {
                        event: event,
                        target: event.target
                    });
                }
            }
        } else if (gesture === TouchConst.DOUBLE_TAP) {
            if (phase === TouchConst.PHASE_CANCEL || phase === TouchConst.PHASE_END) {
                clearTimeout(this.singleTapTimeout);
                clearTimeout(this.holdTimeout);
                this.doubleTapStartTime = null;

                ret = Utils.exec(options.onDoubleTap, [event, event.target], element[0]);
                element.fire("doubletap", {
                    event: event,
                    target: event.target
                });
            }
        } else if (gesture === TouchConst.LONG_TAP) {
            if (phase === TouchConst.PHASE_CANCEL || phase === TouchConst.PHASE_END) {
                clearTimeout(this.singleTapTimeout);
                this.doubleTapStartTime = null;

                ret = Utils.exec(options.onLongTap, [event, event.target], element[0]);
                element.fire("longtap", {
                    event: event,
                    target: event.target
                });
            }
        }

        return ret;
    },

    validateSwipeDistance: function() {
        var valid = true;
        //If we made it past the min swipe distance..
        if (this.options.threshold !== null) {
            valid = this.distance >= this.options.threshold;
        }

        return valid;
    },

    didSwipeBackToCancel: function() {
        var options = this.options;
        var cancelled = false;
        if (options.cancelThreshold !== null && this.direction !== null) {
            cancelled = (this.getMaxDistance(this.direction) - this.distance) >= options.cancelThreshold;
        }

        return cancelled;
    },

    validatePinchDistance: function() {
        if (this.options.pinchThreshold !== null) {
            return this.pinchDistance >= this.options.pinchThreshold;
        }
        return true;
    },

    validateSwipeTime: function() {
        var result, options = this.options;

        if (options.maxTimeThreshold) {
            result = duration < options.maxTimeThreshold;
        } else {
            result = true;
        }

        return result;
    },

    validateDefaultEvent: function(e, direction) {
        var options = this.options;

        //If the option is set, allways allow the event to bubble up (let user handle weirdness)
        if (options.preventDefaultEvents === false) {
            return;
        }

        if (options.allowPageScroll === TouchConst.NONE) {
            e.preventDefault();
        } else {
            var auto = options.allowPageScroll === TouchConst.AUTO;

            switch (direction) {
                case TouchConst.LEFT:
                    if ((options.onSwipeLeft !== Metro.noop && auto) || (!auto && options.allowPageScroll.toLowerCase() !== TouchConst.HORIZONTAL)) {
                        e.preventDefault();
                    }
                    break;

                case TouchConst.RIGHT:
                    if ((options.onSwipeRight !== Metro.noop && auto) || (!auto && options.allowPageScroll.toLowerCase() !== TouchConst.HORIZONTAL)) {
                        e.preventDefault();
                    }
                    break;

                case TouchConst.UP:
                    if ((options.onSwipeUp !== Metro.noop && auto) || (!auto && options.allowPageScroll.toLowerCase() !== TouchConst.VERTICAL)) {
                        e.preventDefault();
                    }
                    break;

                case TouchConst.DOWN:
                    if ((options.onSwipeDown !== Metro.noop && auto) || (!auto && options.allowPageScroll.toLowerCase() !== TouchConst.VERTICAL)) {
                        e.preventDefault();
                    }
                    break;

                case TouchConst.NONE:

                    break;
            }
        }
    },

    validatePinch: function() {
        var hasCorrectFingerCount = this.validateFingers();
        var hasEndPoint = this.validateEndPoint();
        var hasCorrectDistance = this.validatePinchDistance();
        return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance;
    },

    hasPinches: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.options.onPinchStatus || this.options.onPinchIn || this.options.onPinchOut);
    },

    didPinch: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validatePinch() && this.hasPinches());
    },

    validateSwipe: function() {
        //Check validity of swipe
        var hasValidTime = this.validateSwipeTime();
        var hasValidDistance = this.validateSwipeDistance();
        var hasCorrectFingerCount = this.validateFingers();
        var hasEndPoint = this.validateEndPoint();
        var didCancel = this.didSwipeBackToCancel();

        // if the user swiped more than the minimum length, perform the appropriate action
        // hasValidDistance is null when no distance is set
        return !didCancel && hasEndPoint && hasCorrectFingerCount && hasValidDistance && hasValidTime;
    },

    hasSwipes: function() {
        var o = this.options;
        //Enure we dont return 0 or null for false values
        return !!(
            o.onSwipe !== Metro.noop
            || o.onSwipeStatus  !== Metro.noop
            || o.onSwipeLeft  !== Metro.noop
            || o.onSwipeRight  !== Metro.noop
            || o.onSwipeUp  !== Metro.noop
            || o.onSwipeDown !== Metro.noop
        );
    },

    didSwipe: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validateSwipe() && this.hasSwipes());
    },

    validateFingers: function() {
        //The number of fingers we want were matched, or on desktop we ignore
        return ((this.fingerCount === this.options.fingers || this.options.fingers === TouchConst.ALL_FINGERS) || !TouchConst.SUPPORTS_TOUCH);
    },

    validateEndPoint: function() {
        //We have an end value for the finger
        return this.fingerData[0].end.x !== 0;
    },

    hasTap: function() {
        //Enure we dont return 0 or null for false values
        return this.options.onTap !== Metro.noop;
    },

    hasDoubleTap: function() {
        //Enure we dont return 0 or null for false values
        return this.options.onDoubleTap !== Metro.noop;
    },

    hasLongTap: function() {
        //Enure we dont return 0 or null for false values
        return this.options.onLongTap !== Metro.noop;
    },

    validateDoubleTap: function() {
        if (this.doubleTapStartTime == null) {
            return false;
        }
        var now = this.getTimeStamp();
        return (this.hasDoubleTap() && ((now - this.doubleTapStartTime) <= this.options.doubleTapThreshold));
    },

    inDoubleTap: function() {
        return this.validateDoubleTap();
    },

    validateTap: function() {
        return ((this.fingerCount === 1 || !TouchConst.SUPPORTS_TOUCH) && (isNaN(this.distance) || this.distance < this.options.threshold));
    },

    validateLongTap: function() {
        var options = this.options;
        //slight threshold on moving finger
        return ((this.duration > options.longTapThreshold) && (this.distance < TouchConst.DOUBLE_TAP_THRESHOLD)); // check double_tab_threshold where from
    },

    didTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validateTap() && this.hasTap());
    },

    didDoubleTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validateDoubleTap() && this.hasDoubleTap());
    },

    didLongTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validateLongTap() && this.hasLongTap());
    },

    startMultiFingerRelease: function(event) {
        this.previousTouchEndTime = this.getTimeStamp();
        this.fingerCountAtRelease = event.touches.length + 1;
    },

    cancelMultiFingerRelease: function() {
        this.previousTouchEndTime = 0;
        this.fingerCountAtRelease = 0;
    },

    inMultiFingerRelease: function() {
        var withinThreshold = false;

        if (this.previousTouchEndTime) {
            var diff = this.getTimeStamp() - this.previousTouchEndTime;
            if (diff <= this.options.fingerReleaseThreshold) {
                withinThreshold = true;
            }
        }

        return withinThreshold;
    },

    getTouchInProgress: function() {
        var element = this.element;
        //strict equality to ensure only true and false are returned
        return (element.data('intouch') === true);
    },

    setTouchInProgress: function(val) {
        var element = this.element;

        //If destroy is called in an event handler, we have no el, and we have already cleaned up, so return.
        if(!element) { return; }

        //Add or remove event listeners depending on touch status
        if (val === true) {
            element.on(this.MOVE_EV, $.proxy(this.touchMove, this));
            element.on(this.END_EV, $.proxy(this.touchEnd, this));

            //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
            if (this.LEAVE_EV) {
                element.on(this.LEAVE_EV, $.proxy(this.touchLeave, this));
            }
        } else {

            element.off(this.MOVE_EV);
            element.off(this.END_EV);

            //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
            if (this.LEAVE_EV) {
                element.off(this.LEAVE_EV);
            }
        }

        //strict equality to ensure only true and false can update the value
        element.data('intouch', val === true);
    },

    createFingerData: function(id, evt) {
        var f = {
            start: {
                x: 0,
                y: 0
            },
            last: {
                x: 0,
                y: 0
            },
            end: {
                x: 0,
                y: 0
            }
        };
        f.start.x = f.last.x = f.end.x = evt.pageX || evt.clientX;
        f.start.y = f.last.y = f.end.y = evt.pageY || evt.clientY;
        this.fingerData[id] = f;
        return f;
    },

    updateFingerData: function(evt) {
        var id = evt.identifier !== undefined ? evt.identifier : 0;
        var f = this.getFingerData(id);

        if (f === null) {
            f = this.createFingerData(id, evt);
        }

        f.last.x = f.end.x;
        f.last.y = f.end.y;

        f.end.x = evt.pageX || evt.clientX;
        f.end.y = evt.pageY || evt.clientY;

        return f;
    },

    getFingerData: function(id) {
        return this.fingerData[id] || null;
    },

    setMaxDistance: function(direction, distance) {
        if (direction === TouchConst.NONE) return;
        distance = Math.max(distance, this.getMaxDistance(direction));
        this.maximumsMap[direction].distance = distance;
    },

    getMaxDistance: function(direction) {
        return (this.maximumsMap[direction]) ? this.maximumsMap[direction].distance : undefined;
    },

    createMaximumsData: function() {
        var maxData = {};
        maxData[TouchConst.LEFT] = this.createMaximumVO(TouchConst.LEFT);
        maxData[TouchConst.RIGHT] = this.createMaximumVO(TouchConst.RIGHT);
        maxData[TouchConst.UP] = this.createMaximumVO(TouchConst.UP);
        maxData[TouchConst.DOWN] = this.createMaximumVO(TouchConst.DOWN);

        return maxData;
    },

    createMaximumVO: function(dir) {
        return {
            direction: dir,
            distance: 0
        }
    },

    calculateDuration: function(){
        return this.endTime - this.startTime;
    },

    calculateTouchesDistance: function(startPoint, endPoint){
        var diffX = Math.abs(startPoint.x - endPoint.x);
        var diffY = Math.abs(startPoint.y - endPoint.y);

        return Math.round(Math.sqrt(diffX * diffX + diffY * diffY));
    },

    calculatePinchZoom: function(startDistance, endDistance){
        var percent = (endDistance / startDistance) * 100; // 1 ? 100
        return percent.toFixed(2);
    },

    calculatePinchDirection: function(){
        if (this.pinchZoom < 1) {
            return TouchConst.OUT;
        } else {
            return TouchConst.IN;
        }
    },

    calculateDistance: function(startPoint, endPoint){
        return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)));
    },

    calculateAngle: function(startPoint, endPoint){
        var x = startPoint.x - endPoint.x;
        var y = endPoint.y - startPoint.y;
        var r = Math.atan2(y, x); //radians
        var angle = Math.round(r * 180 / Math.PI); //degrees

        //ensure value is positive
        if (angle < 0) {
            angle = 360 - Math.abs(angle);
        }

        return angle;
    },

    calculateDirection: function(startPoint, endPoint){
        if( this.comparePoints(startPoint, endPoint) ) {
            return TouchConst.NONE;
        }

        var angle = this.calculateAngle(startPoint, endPoint);

        if ((angle <= 45) && (angle >= 0)) {
            return TouchConst.LEFT;
        } else if ((angle <= 360) && (angle >= 315)) {
            return TouchConst.LEFT;
        } else if ((angle >= 135) && (angle <= 225)) {
            return TouchConst.RIGHT;
        } else if ((angle > 45) && (angle < 135)) {
            return TouchConst.DOWN;
        } else {
            return TouchConst.UP;
        }
    },

    getTimeStamp: function(){
        return (new Date()).getTime();
    },

    getBounds: function (el) {
        el = $(el);
        var offset = el.offset();

        return {
            left: offset.left,
            right: offset.left + el.outerWidth(),
            top: offset.top,
            bottom: offset.top + el.outerHeight()
        };
    },

    isInBounds: function(point, bounds){
        return (point.x > bounds.left && point.x < bounds.right && point.y > bounds.top && point.y < bounds.bottom);
    },

    comparePoints: function(pointA, pointB) {
        return (pointA.x === pointB.x && pointA.y === pointB.y);
    },

    removeListeners: function() {
        var element = this.element;

        element.off(this.START_EV);
        element.off(this.CANCEL_EV);
        element.off(this.MOVE_EV);
        element.off(this.END_EV);

        //we only have leave events on desktop, we manually calculate leave on touch as its not supported in webkit
        if (this.LEAVE_EV) {
            element.off(this.LEAVE_EV);
        }

        this.setTouchInProgress(false);
    },

    enable: function(){
        this.disable();
        this.element.on(this.START_EV, this.touchStart);
        this.element.on(this.CANCEL_EV, this.touchCancel);
        return this.element;
    },

    disable: function(){
        this.removeListeners();
        return this.element;
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        this.removeListeners();
    }
};

Metro['touch'] = TouchConst;
Metro.plugin('touch', Touch);

var TreeViewDefaultConfig = {
    showChildCount: false,
    duration: 100,
    onNodeClick: Metro.noop,
    onNodeDblClick: Metro.noop,
    onNodeDelete: Metro.noop,
    onNodeInsert: Metro.noop,
    onNodeClean: Metro.noop,
    onCheckClick: Metro.noop,
    onRadioClick: Metro.noop,
    onExpandNode: Metro.noop,
    onCollapseNode: Metro.noop,
    onTreeViewCreate: Metro.noop
};

Metro.treeViewSetup = function (options) {
    TreeViewDefaultConfig = $.extend({}, TreeViewDefaultConfig, options);
};

if (typeof window["metroTreeViewSetup"] !== undefined) {
    Metro.treeViewSetup(window["metroTreeViewSetup"]);
}

var TreeView = {
    init: function( options, elem ) {
        this.options = $.extend( {}, TreeViewDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        Metro.checkRuntime(element, "treeview");

        this._createTree();
        this._createEvents();

        $.each(element.find("input"), function(){
            if (!$(this).is(":checked")) return;
            that._recheck(this);
        });

        Utils.exec(o.onTreeViewCreate, null, element[0]);
        element.fire("treeviewcreate");
    },

    _createIcon: function(data){
        var icon, src;

        src = Utils.isTag(data) ? $(data) : $("<img src='' alt=''>").attr("src", data);
        icon = $("<span>").addClass("icon");
        icon.html(src.outerHTML());

        return icon;
    },

    _createCaption: function(data){
        return $("<span>").addClass("caption").html(data);
    },


    _createToggle: function(){
        return $("<span>").addClass("node-toggle");
    },


    _createNode: function(data){
        var node;

        node = $("<li>");

        if (data.caption !== undefined) {
            node.prepend(this._createCaption(data.caption));
        }

        if (data.icon !== undefined) {
            node.prepend(this._createIcon(data.icon));
        }

        if (data.html !== undefined) {
            node.append(data.html);
        }

        return node;
    },

    _createTree: function(){
        var that = this, element = this.element, o = this.options;
        var nodes = element.find("li");

        element.addClass("treeview");

        $.each(nodes, function(){
            var node = $(this);
            var caption, icon;

            caption = node.data("caption");
            icon = node.data("icon");

            if (caption !== undefined) {
                if (node.children("ul").length > 0) {
                    caption += " ("+node.children("ul").children("li").length+")"
                }
                node.prepend(that._createCaption(caption));
            }

            if (icon !== undefined) {
                node.prepend(that._createIcon(icon));
            }

            if (node.children("ul").length > 0) {

                node.addClass("tree-node");

                node.append(that._createToggle());

                if (Utils.bool(node.attr("data-collapsed")) !== true) {
                    node.addClass("expanded");
                } else {
                    node.children("ul").hide();
                }
            }

        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".node-toggle", function(e){
            var toggle = $(this);
            var node = toggle.parent();

            that.toggleNode(node);

            e.preventDefault();
        });

        element.on(Metro.events.click, "li > .caption", function(e){
            var node = $(this).parent();

            that.current(node);

            Utils.exec(o.onNodeClick, [node[0]], element[0]);
            element.fire("nodeclick", {
                node: node[0]
            });

            e.preventDefault();
        });

        element.on(Metro.events.dblclick, "li > .caption", function(e){
            var node = $(this).closest("li");
            var toggle = node.children(".node-toggle");
            var subtree = node.children("ul");

            if (toggle.length > 0 || subtree.length > 0) {
                that.toggleNode(node);
            }

            Utils.exec(o.onNodeDblClick, [node[0]], element[0]);
            element.fire("nodedblclick", {
                node: node[0]
            });

            e.preventDefault();
        });

        element.on(Metro.events.click, "input[type=radio]", function(){
            var check = $(this);
            var checked = check.is(":checked");
            var node = check.closest("li");

            that.current(node);

            Utils.exec(o.onRadioClick, [checked, check[0], node[0]], element[0]);
            element.fire("radioclick", {
                checked: checked,
                check: check[0],
                node: node[0]
            });
        });

        element.on(Metro.events.click, "input[type=checkbox]", function(){
            var check = $(this);
            var checked = check.is(":checked");
            var node = check.closest("li");

            that._recheck(check);

            Utils.exec(o.onCheckClick, [checked, check[0], node[0]], element[0]);
            element.fire("checkclick", {
                checked: checked,
                check: check[0],
                node: node[0]
            });
        });
    },

    _recheck: function(check){
        var element = this.element;
        var checked, node, checks, all_checks;

        check = $(check);

        checked = check.is(":checked");
        node = check.closest("li");

        this.current(node);

        // down
        checks = check.closest("li").find("ul input[type=checkbox]");
        checks.attr("data-indeterminate", false);
        checks.prop("checked", checked);

        all_checks = [];

        $.each(element.find("input[type=checkbox]"), function(){
            all_checks.push(this);
        });

        $.each(all_checks.reverse(), function(){
            var ch = $(this);
            var children = ch.closest("li").children("ul").find("input[type=checkbox]").length;
            var children_checked = ch.closest("li").children("ul").find("input[type=checkbox]").filter(function(el){
                return el.checked;
            }).length;

            if (children > 0 && children_checked === 0) {
                ch.attr("data-indeterminate", false);
                ch.prop("checked", false);
            }

            if (children_checked === 0) {
                ch.attr("data-indeterminate", false);
            } else {
                if (children_checked > 0 && children > children_checked) {
                    ch.attr("data-indeterminate", true);
                } else if (children === children_checked) {
                    ch.attr("data-indeterminate", false);
                    ch.prop("checked", true);
                }
            }
        });
    },

    current: function(node){
        var element = this.element;

        if (node === undefined) {
            return element.find("li.current")
        }

        element.find("li").removeClass("current");
        node.addClass("current");
    },

    toggleNode: function(n){
        var node = $(n);
        var element = this.element, o = this.options;
        var func;
        var toBeExpanded = !node.data("collapsed");//!node.hasClass("expanded");

        node.toggleClass("expanded");
        node.data("collapsed", toBeExpanded);

        func = toBeExpanded === true ? "slideUp" : "slideDown";

        if (!toBeExpanded) {
            Utils.exec(o.onExpandNode, [node[0]], element[0]);
            element.fire("expandnode", {
                node: node[0]
            });
        } else {
            Utils.exec(o.onCollapseNode, [node[0]], element[0]);
            element.fire("collapsenode", {
                node: node[0]
            });
        }

        node.children("ul")[func](o.duration);
    },

    addTo: function(node, data){
        var element = this.element, o = this.options;
        var target;
        var new_node;
        var toggle;

        if (node === null) {
            target = element;
        } else {
            node = $(node);
            target = node.children("ul");
            if (target.length === 0) {
                target = $("<ul>").appendTo(node);
                toggle = this._createToggle();
                toggle.appendTo(node);
                node.addClass("expanded");
            }
        }

        new_node = this._createNode(data);

        new_node.appendTo(target);

        Utils.exec(o.onNodeInsert, [new_node[0], node ? node[0] : null], element[0]);
        element.fire("nodeinsert", {
            node: new_node[0],
            parent: node ? node[0] : null
        });

        return new_node;
    },

    insertBefore: function(node, data){
        var element = this.element, o = this.options;
        var new_node = this._createNode(data);

        if (Utils.isNull(node)) {
            return this.addTo(node, data);
        }

        node = $(node);
        new_node.insertBefore(node);
        Utils.exec(o.onNodeInsert, [new_node[0], node[0]], element[0]);
        element.fire("nodeinsert", {
            node: new_node[0],
            parent: node ? node[0] : null
        });
        return new_node;
    },

    insertAfter: function(node, data){
        var element = this.element, o = this.options;
        var new_node = this._createNode(data);

        if (Utils.isNull(node)) {
            return this.addTo(node, data);
        }

        node = $(node);
        new_node.insertAfter(node);
        Utils.exec(o.onNodeInsert, [new_node[0], node[0]], element[0]);
        element.fire("nodeinsert", {
            node: new_node[0],
            parent: node[0]
        });
        return new_node;
    },

    del: function(node){
        var element = this.element, o = this.options;
        node = $(node);
        var parent_list = node.closest("ul");
        var parent_node = parent_list.closest("li");

        Utils.exec(o.onNodeDelete, [node[0]], element[0]);
        element.fire("nodedelete", {
            node: node[0]
        });

        node.remove();

        if (parent_list.children().length === 0 && !parent_list.is(element)) {
            parent_list.remove();
            parent_node.removeClass("expanded");
            parent_node.children(".node-toggle").remove();
        }
    },

    clean: function(node){
        var element = this.element, o = this.options;
        node = $(node);
        node.children("ul").remove();
        node.removeClass("expanded");
        node.children(".node-toggle").remove();
        Utils.exec(o.onNodeClean, [node[0]], element[0]);
        element.fire("nodeclean", {
            node: node[0]
        });
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;

        element.off(Metro.events.click, ".node-toggle");
        element.off(Metro.events.click, "li > .caption");
        element.off(Metro.events.dblclick, "li > .caption");
        element.off(Metro.events.click, "input[type=radio]");
        element.off(Metro.events.click, "input[type=checkbox]");

        return element;
    }
};

Metro.plugin('treeview', TreeView);

var ValidatorFuncs = {
    required: function(val){
        if (Array.isArray(val)) {
            return val.length > 0 ? val : false;
        } else {
            return Utils.isValue(val) ? val.trim() : false;
        }
    },
    length: function(val, len){
        if (Array.isArray(val)) {return val.length === parseInt(len);}
        if (!Utils.isValue(len) || isNaN(len) || len <= 0) {
            return false;
        }
        return val.trim().length === parseInt(len);
    },
    minlength: function(val, len){
        if (Array.isArray(val)) {return val.length >= parseInt(len);}
        if (!Utils.isValue(len) || isNaN(len) || len <= 0) {
            return false;
        }
        return val.trim().length >= parseInt(len);
    },
    maxlength: function(val, len){
        if (Array.isArray(val)) {return val.length <= parseInt(len);}
        if (!Utils.isValue(len) || isNaN(len) || len <= 0) {
            return false;
        }
        return val.trim().length <= parseInt(len);
    },
    min: function(val, min_value){
        if (!Utils.isValue(min_value) || isNaN(min_value)) {
            return false;
        }
        if (!this.number(val)) {
            return false;
        }
        if (isNaN(val)) {
            return false;
        }
        return Number(val) >= Number(min_value);
    },
    max: function(val, max_value){
        if (!Utils.isValue(max_value) || isNaN(max_value)) {
            return false;
        }
        if (!this.number(val)) {
            return false;
        }
        if (isNaN(val)) {
            return false;
        }
        return Number(val) <= Number(max_value);
    },
    email: function(val){
        return /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(val);
    },
    domain: function(val){
        return /^((xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(val);
    },
    url: function(val){
        return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(val);
    },
    date: function(val, format, locale){
        if (Utils.isNull(format)) {
            return String(new Date(val)).toLowerCase() !== "invalid date";
        } else {
            return String(val.toDate(format, locale)).toLowerCase() !== "invalid date";
        }
    },
    number: function(val){
        return !isNaN(val);
    },
    integer: function(val){
        return Utils.isInt(val);
    },
    float: function(val){
        return Utils.isFloat(val);
    },
    digits: function(val){
        return /^\d+$/.test(val);
    },
    hexcolor: function(val){
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
    },
    color: function(val){
        if (!Utils.isValue(val)) return false;
        return Colors.color(val, Colors.PALETTES.STANDARD) !== false;
    },
    pattern: function(val, pat){
        if (!Utils.isValue(val)) return false;
        if (!Utils.isValue(pat)) return false;
        var reg = new RegExp(pat);
        return reg.test(val);
    },
    compare: function(val, val2){
        return val === val2;
    },
    not: function(val, not_this){
        return val !== not_this;
    },
    notequals: function(val, val2){
        if (Utils.isNull(val)) return false;
        if (Utils.isNull(val2)) return false;
        return val.trim() !== val2.trim();
    },
    equals: function(val, val2){
        if (Utils.isNull(val)) return false;
        if (Utils.isNull(val2)) return false;
        return val.trim() === val2.trim();
    },
    custom: function(val, func){
        if (Utils.isFunc(func) === false) {
            return false;
        }
        return Utils.exec(func, [val]);
    },

    is_control: function(el){
        return el.parent().hasClass("input")
            || el.parent().hasClass("select")
            || el.parent().hasClass("textarea")
            || el.parent().hasClass("checkbox")
            || el.parent().hasClass("switch")
            || el.parent().hasClass("radio")
            || el.parent().hasClass("spinner")
            ;
    },

    reset_state: function(el){
        var input = $(el);
        var is_control = ValidatorFuncs.is_control(input);

        if (is_control) {
            input.parent().removeClass("invalid valid");
        } else {
            input.removeClass("invalid valid");
        }
    },

    set_valid_state: function(el){
        var input = $(el);
        var is_control = ValidatorFuncs.is_control(input);

        if (is_control) {
            input.parent().addClass("valid");
        } else {
            input.addClass("valid");
        }
    },

    set_invalid_state: function(el){
        var input = $(el);
        var is_control = ValidatorFuncs.is_control(input);

        if (is_control) {
            input.parent().addClass("invalid");
        } else {
            input.addClass("invalid");
        }
    },

    reset: function(form){
        var that = this;
        $.each($(form).find("[data-validate]"), function(){
            that.reset_state(this);
        });

        return this;
    },

    validate: function(el, result, cb_ok, cb_error, required_mode){
        var this_result = true;
        var input = $(el);
        var funcs = input.data('validate') !== undefined ? String(input.data('validate')).split(" ").map(function(s){return s.trim();}) : [];
        var errors = [];

        if (funcs.length === 0) {
            return true;
        }

        this.reset_state(input);

        if (input.attr('type') && input.attr('type').toLowerCase() === "checkbox") {
            if (funcs.indexOf('required') === -1) {
                this_result = true;
            } else {
                this_result = input.is(":checked");
            }

            if (this_result === false) {
                errors.push('required');
            }

            if (result !== undefined) {
                result.val += this_result ? 0 : 1;
            }
        } else if (input.attr('type') && input.attr('type').toLowerCase() === "radio") {
            if (input.attr('name') === undefined) {
                this_result = true;
            }

            var radio_selector = 'input[name=' + input.attr('name') + ']:checked';
            this_result = $(radio_selector).length > 0;

            if (result !== undefined) {
                result.val += this_result ? 0 : 1;
            }
        } else {
            $.each(funcs, function(){
                if (this_result === false) return;
                var rule = this.split("=");
                var f, a, b;

                f = rule[0]; rule.shift();
                a = rule.join("=");

                if (['compare', 'equals', 'notequals'].indexOf(f) > -1) {
                    a = input[0].form.elements[a].value;
                }

                if (f === 'date') {
                    a = input.attr("data-value-format");
                    b = input.attr("data-value-locale");
                }

                if (Utils.isFunc(ValidatorFuncs[f]) === false)  {
                    this_result = true;
                } else {
                    if (required_mode === true || f === "required") {
                        this_result = ValidatorFuncs[f](input.val(), a, b);
                    } else {
                        if (input.val().trim() !== "") {
                            this_result = ValidatorFuncs[f](input.val(), a, b);
                        } else {
                            this_result = true;
                        }
                    }
                }

                if (this_result === false) {
                    errors.push(f);
                }

                if (result !== undefined) {
                    result.val += this_result ? 0 : 1;
                }
            });
        }

        if (this_result === false) {
            this.set_invalid_state(input);

            if (result !== undefined) {
                result.log.push({
                    input: input[0],
                    name: input.attr("name"),
                    value: input.val(),
                    funcs: funcs,
                    errors: errors
                });
            }

            if (cb_error !== undefined) Utils.exec(cb_error, [input, input.val()], input[0]);

        } else {
            this.set_valid_state(input);

            if (cb_ok !== undefined) Utils.exec(cb_ok, [input, input.val()], input[0]);
        }

        return this_result;
    }
};

Metro['validator'] = ValidatorFuncs;

var ValidatorDefaultConfig = {
    submitTimeout: 200,
    interactiveCheck: false,
    clearInvalid: 0,
    requiredMode: true,
    useRequiredClass: true,
    onBeforeSubmit: Metro.noop_true,
    onSubmit: Metro.noop,
    onError: Metro.noop,
    onValidate: Metro.noop,
    onErrorForm: Metro.noop,
    onValidateForm: Metro.noop,
    onValidatorCreate: Metro.noop
};

Metro.validatorSetup = function (options) {
    ValidatorDefaultConfig = $.extend({}, ValidatorDefaultConfig, options);
};

if (typeof window.metroValidatorSetup !== undefined) {
    Metro.validatorSetup(window.metroValidatorSetup);
}

var Validator = {
    init: function( options, elem ) {
        this.options = $.extend( {}, ValidatorDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this._onsubmit = null;
        this._onreset = null;
        this.result = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    dependencies: ['utils', 'colors'],

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var inputs = element.find("[data-validate]");

        element
            .attr("novalidate", 'novalidate');
            //.attr("action", "javascript:");

        $.each(inputs, function(){
            var input = $(this);
            var funcs = input.data("validate");
            var required = funcs.indexOf("required") > -1;
            if (required && o.useRequiredClass === true) {
                if (ValidatorFuncs.is_control(input)) {
                    input.parent().addClass("required");
                } else {
                    input.addClass("required");
                }
            }
            if (o.interactiveCheck === true) {
                input.on(Metro.events.inputchange, function () {
                    ValidatorFuncs.validate(this, undefined, undefined, undefined, o.requiredMode);
                });
            }
        });

        this._onsubmit = null;
        this._onreset = null;

        if (element[0].onsubmit !== null) {
            this._onsubmit = element[0].onsubmit;
            element[0].onsubmit = null;
        }

        if (element[0].onreset !== null) {
            this._onreset = element[0].onreset;
            element[0].onreset = null;
        }

        element[0].onsubmit = function(){
            return that._submit();
        };

        element[0].onreset = function(){
            return that._reset();
        };

        Utils.exec(o.onValidatorCreate, null, element[0]);
        element.fire("validatorcreate");
    },

    _reset: function(){
        ValidatorFuncs.reset(this.element);
        if (this._onsubmit !==  null) Utils.exec(this._onsubmit, null, this.element[0]);
    },

    _submit: function(){
        var that = this, element = this.element, o = this.options;
        var form = this.elem;
        var inputs = element.find("[data-validate]");
        var submit = element.find("input[type=submit], button[type=submit]");
        var result = {
            val: 0,
            log: []
        };
        var formData = Utils.formData(element);

        if (submit.length > 0) {
            submit.attr('disabled', 'disabled').addClass('disabled');
        }

        $.each(inputs, function(){
            ValidatorFuncs.validate(this, result, o.onValidate, o.onError, o.requiredMode);
        });

        submit.removeAttr("disabled").removeClass("disabled");

        result.val += Utils.exec(o.onBeforeSubmit, [formData], this.elem) === false ? 1 : 0;

        if (result.val === 0) {
            Utils.exec(o.onValidateForm, [formData], form);
            element.fire("validateform", {
                data: formData
            });

            setTimeout(function(){
                Utils.exec(o.onSubmit, [formData], form);
                element.fire("formsubmit", {
                    data: formData
                });
                if (that._onsubmit !==  null) Utils.exec(that._onsubmit, null, form);
            }, o.submitTimeout);
        } else {
            Utils.exec(o.onErrorForm, [result.log, formData], form);
            element.fire("errorform", {
                log: result.log,
                data: formData
            });

            if (o.clearInvalid > 0) {
                setTimeout(function(){
                    $.each(inputs, function(){
                        var inp  = $(this);
                        if (ValidatorFuncs.is_control(inp)) {
                            inp.parent().removeClass("invalid");
                        } else {
                            inp.removeClass("invalid");
                        }
                    })
                }, o.clearInvalid);
            }
        }

        return result.val === 0;
    },

    changeAttribute: function(attributeName){
    }
};

Metro.plugin('validator', Validator);

var VideoDefaultConfig = {
    src: null,

    poster: "",
    logo: "",
    logoHeight: 32,
    logoWidth: "auto",
    logoTarget: "",

    volume: .5,
    loop: false,
    autoplay: false,

    fullScreenMode: Metro.fullScreenMode.DESKTOP,
    aspectRatio: Metro.aspectRatio.HD,

    controlsHide: 3000,

    showLoop: true,
    showPlay: true,
    showStop: true,
    showMute: true,
    showFull: true,
    showStream: true,
    showVolume: true,
    showInfo: true,

    loopIcon: "<span class='default-icon-loop'></span>",
    stopIcon: "<span class='default-icon-stop'></span>",
    playIcon: "<span class='default-icon-play'></span>",
    pauseIcon: "<span class='default-icon-pause'></span>",
    muteIcon: "<span class='default-icon-mute'></span>",
    volumeLowIcon: "<span class='default-icon-low-volume'></span>",
    volumeMediumIcon: "<span class='default-icon-medium-volume'></span>",
    volumeHighIcon: "<span class='default-icon-high-volume'></span>",
    screenMoreIcon: "<span class='default-icon-enlarge'></span>",
    screenLessIcon: "<span class='default-icon-shrink'></span>",

    onPlay: Metro.noop,
    onPause: Metro.noop,
    onStop: Metro.noop,
    onEnd: Metro.noop,
    onMetadata: Metro.noop,
    onTime: Metro.noop,
    onVideoCreate: Metro.noop
};

Metro.videoSetup = function (options) {
    VideoDefaultConfig = $.extend({}, VideoDefaultConfig, options);
};

if (typeof window["metroVideoSetup"] !== undefined) {
    Metro.videoSetup(window["metroVideoSetup"]);
}

var Video = {
    init: function( options, elem ) {
        this.options = $.extend( {}, VideoDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.fullscreen = false;
        this.preloader = null;
        this.player = null;
        this.video = elem;
        this.stream = null;
        this.volume = null;
        this.volumeBackup = 0;
        this.muted = false;
        this.fullScreenInterval = false;
        this.isPlaying = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options, video = this.video;

        Metro.checkRuntime(element, "video");

        if (Metro.fullScreenEnabled === false) {
            o.fullScreenMode = Metro.fullScreenMode.WINDOW;
        }

        this._createPlayer();
        this._createControls();
        this._createEvents();
        this._setAspectRatio();

        if (o.autoplay === true) {
            this.play();
        }

        Utils.exec(o.onVideoCreate, [element, this.player], element[0]);
        element.fire("videocreate");
    },

    _createPlayer: function(){
        var element = this.element, o = this.options, video = this.video;
        var player = $("<div>").addClass("media-player video-player " + element[0].className);
        var preloader = $("<div>").addClass("preloader").appendTo(player);
        var logo = $("<a>").attr("href", o.logoTarget).addClass("logo").appendTo(player);

        if (!element.attr("id")) {
            element.attr("id", Utils.elementId("video"))
        }

        player.insertBefore(element);
        element.appendTo(player);

        $.each(['muted', 'autoplay', 'controls', 'height', 'width', 'loop', 'poster', 'preload'], function(){
            element.removeAttr(this);
        });

        element.attr("preload", "auto");

        if (o.poster !== "") {
            element.attr("poster", o.poster);
        }

        video.volume = o.volume;

        preloader.activity({
            type: "cycle",
            style: "color"
        });

        preloader.hide();

        this.preloader = preloader;

        if (o.logo !== "") {
            $("<img>")
                .css({
                    height: o.logoHeight,
                    width: o.logoWidth
                })
                .attr("src", o.logo).appendTo(logo);
        }

        if (o.src !== null) {
            this._setSource(o.src);
        }

        element[0].className = "";

        this.player = player;
    },

    _setSource: function(src){
        var element = this.element;

        element.find("source").remove();
        element.removeAttr("src");
        if (Array.isArray(src)) {
            $.each(src, function(){
                var item = this;
                if (item.src === undefined) return ;
                $("<source>").attr('src', item.src).attr('type', item.type !== undefined ? item.type : '').appendTo(element);
            });
        } else {
            element.attr("src", src);
        }
    },

    _createControls: function(){
        var that = this, element = this.element, o = this.options, video = this.elem, player = this.player;

        var controls = $("<div>").addClass("controls").addClass(o.clsControls).insertAfter(element);

        var stream = $("<div>").addClass("stream").appendTo(controls);
        var streamSlider = $("<input>").addClass("stream-slider ultra-thin cycle-marker").appendTo(stream);

        var volume = $("<div>").addClass("volume").appendTo(controls);
        var volumeSlider = $("<input>").addClass("volume-slider ultra-thin cycle-marker").appendTo(volume);

        var infoBox = $("<div>").addClass("info-box").appendTo(controls);

        if (o.showInfo !== true) {
            infoBox.hide();
        }

        Metro.makePlugin(streamSlider, "slider", {
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            clsComplete: "bg-cyan",
            hint: true,
            onStart: function(){
                if (!video.paused) video.pause();
            },
            onStop: function(val){
                if (video.seekable.length > 0) {
                    video.currentTime = (that.duration * val / 100).toFixed(0);
                }
                if (video.paused && video.currentTime > 0) {
                    video.play();
                }
            }
        });

        this.stream = streamSlider;

        if (o.showStream !== true) {
            stream.hide();
        }

        Metro.makePlugin(volumeSlider, "slider", {
            clsMarker: "bg-red",
            clsHint: "bg-cyan fg-white",
            hint: true,
            value: o.volume * 100,
            onChangeValue: function(val){
                video.volume = val / 100;
            }
        });

        this.volume = volumeSlider;

        if (o.showVolume !== true) {
            volume.hide();
        }

        var loop, play, stop, mute, full;

        if (o.showLoop === true) loop = $("<button>").attr("type", "button").addClass("button square loop").html(o.loopIcon).appendTo(controls);
        if (o.showPlay === true) play = $("<button>").attr("type", "button").addClass("button square play").html(o.playIcon).appendTo(controls);
        if (o.showStop === true) stop = $("<button>").attr("type", "button").addClass("button square stop").html(o.stopIcon).appendTo(controls);
        if (o.showMute === true) mute = $("<button>").attr("type", "button").addClass("button square mute").html(o.muteIcon).appendTo(controls);
        if (o.showFull === true) full = $("<button>").attr("type", "button").addClass("button square full").html(o.screenMoreIcon).appendTo(controls);

        if (o.loop === true) {
            loop.addClass("active");
            element.attr("loop", "loop");
        }

        this._setVolume();

        if (o.muted) {
            that.volumeBackup = video.volume;
            Metro.getPlugin(that.volume[0], 'slider').val(0);
            video.volume = 0;
        }

        infoBox.html("00:00 / 00:00");
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options, video = this.elem, player = this.player;

        element.on("loadstart", function(){
            that.preloader.show();
        });

        element.on("loadedmetadata", function(){
            that.duration = video.duration.toFixed(0);
            that._setInfo(0, that.duration);
            Utils.exec(o.onMetadata, [video, player], element[0]);
        });

        element.on("canplay", function(){
            that._setBuffer();
            that.preloader.hide();
        });

        element.on("progress", function(){
            that._setBuffer();
        });

        element.on("timeupdate", function(){
            var position = Math.round(video.currentTime * 100 / that.duration);
            that._setInfo(video.currentTime, that.duration);
            Metro.getPlugin(that.stream[0], 'slider').val(position);
            Utils.exec(o.onTime, [video.currentTime, that.duration, video, player], element[0]);
        });

        element.on("waiting", function(){
            that.preloader.show();
        });

        element.on("loadeddata", function(){

        });

        element.on("play", function(){
            player.find(".play").html(o.pauseIcon);
            Utils.exec(o.onPlay, [video, player], element[0]);
            that._onMouse();
        });

        element.on("pause", function(){
            player.find(".play").html(o.playIcon);
            Utils.exec(o.onPause, [video, player], element[0]);
            that._offMouse();
        });

        element.on("stop", function(){
            Metro.getPlugin(that.stream[0], 'slider').val(0);
            Utils.exec(o.onStop, [video, player], element[0]);
            that._offMouse();
        });

        element.on("ended", function(){
            Metro.getPlugin(that.stream[0], 'slider').val(0);
            Utils.exec(o.onEnd, [video, player], element[0]);
            that._offMouse();
        });

        element.on("volumechange", function(){
            that._setVolume();
        });

        player.on(Metro.events.click, ".play", function(e){
            if (video.paused) {
                that.play();
            } else {
                that.pause();
            }
        });

        player.on(Metro.events.click, ".stop", function(e){
            that.stop();
        });

        player.on(Metro.events.click, ".mute", function(e){
            that._toggleMute();
        });

        player.on(Metro.events.click, ".loop", function(){
            that._toggleLoop();
        });

        player.on(Metro.events.click, ".full", function(){
            that.fullscreen = !that.fullscreen;
            player.find(".full").html(that.fullscreen === true ? o.screenLessIcon : o.screenMoreIcon);
            if (o.fullScreenMode === Metro.fullScreenMode.WINDOW) {
                if (that.fullscreen === true) {
                    player.addClass("full-screen");
                } else {
                    player.removeClass("full-screen");
                }
            } else {
                if (that.fullscreen === true) {

                    Metro.requestFullScreen(video);

                    if (that.fullScreenInterval === false) that.fullScreenInterval = setInterval(function(){
                        if (Metro.inFullScreen() === false) {
                            that.fullscreen = false;
                            clearInterval(that.fullScreenInterval);
                            that.fullScreenInterval = false;
                            player.find(".full").html(o.screenMoreIcon);
                        }

                    }, 1000);
                } else {
                    Metro.exitFullScreen();
                }
            }

            // if (that.fullscreen === true) {
            //     $(document).on(Metro.events.keyup + ".video-player", function(e){
            //         if (e.keyCode === 27) {
            //             player.find(".full").click();
            //         }
            //     });
            // } else {
            //     $(document).off(Metro.events.keyup + ".video-player");
            // }
        });

        $(window).on(Metro.events.keyup, function(e){
            if (that.fullscreen && e.keyCode === 27) {
                player.find(".full").click();
            }
        }, {ns: element.attr("id")});

        $(window).on(Metro.events.resize, function(){
            that._setAspectRatio();
        }, {ns: element.attr("id")});

    },

    _onMouse: function(){
        var that = this, o = this.options, player = this.player;

        player.on(Metro.events.enter, function(){
            var controls = player.find(".controls");
            if (o.controlsHide > 0 && controls.style('display') === 'none') {
                controls.stop(true).fadeIn(500, function(){
                    controls.css("display", "flex");
                });
            }
        });

        player.on(Metro.events.leave, function(){
            var controls = player.find(".controls");
            if (o.controlsHide > 0 && parseInt(controls.style('opacity')) === 1) {
                setTimeout(function () {
                    controls.stop(true).fadeOut(500);
                }, o.controlsHide);
            }
        });
    },

    _offMouse: function(){
        var player = this.player, o = this.options;
        var controls = player.find(".controls");

        player.off(Metro.events.enter);
        player.off(Metro.events.leave);

        if (o.controlsHide > 0 && controls.style('display') === 'none') {
            controls.stop(true).fadeIn(500, function(){
                controls.css("display", "flex");
            });
        }
    },

    _toggleLoop: function(){
        var loop = this.player.find(".loop");
        if (loop.length === 0) return ;
        loop.toggleClass("active");
        if (loop.hasClass("active")) {
            this.element.attr("loop", "loop");
        } else {
            this.element.removeAttr("loop");
        }
    },

    _toggleMute: function(){
        this.muted = !this.muted;
        if (this.muted === false) {
            this.video.volume = this.volumeBackup;
        } else {
            this.volumeBackup = this.video.volume;
            this.video.volume = 0;
        }
        Metro.getPlugin(this.volume, 'slider').val(this.muted === false ? this.volumeBackup * 100 : 0);
    },

    _setInfo: function(a, b){
        this.player.find(".info-box").html(Utils.secondsToFormattedString(Math.round(a)) + " / " + Utils.secondsToFormattedString(Math.round(b)));
    },

    _setBuffer: function(){
        var buffer = this.video.buffered.length ? Math.round(Math.floor(this.video.buffered.end(0)) / Math.floor(this.video.duration) * 100) : 0;
        Metro.getPlugin(this.stream, 'slider').buff(buffer);
    },

    _setVolume: function(){
        var video = this.video, player = this.player, o = this.options;

        var volumeButton = player.find(".mute");
        var volume = video.volume * 100;
        if (volume > 1 && volume < 30) {
            volumeButton.html(o.volumeLowIcon);
        } else if (volume >= 30 && volume < 60) {
            volumeButton.html(o.volumeMediumIcon);
        } else if (volume >= 60 && volume <= 100) {
            volumeButton.html(o.volumeHighIcon);
        } else {
            volumeButton.html(o.muteIcon);
        }
    },

    _setAspectRatio: function(){
        var player = this.player, o = this.options;
        var width = player.outerWidth();
        var height;

        switch (o.aspectRatio) {
            case Metro.aspectRatio.SD: height = Utils.aspectRatioH(width, "4/3"); break;
            case Metro.aspectRatio.CINEMA: height = Utils.aspectRatioH(width, "21/9"); break;
            default: height = Utils.aspectRatioH(width, "16/9");
        }

        player.outerHeight(height);
    },

    aspectRatio: function(ratio){
        this.options.aspectRatio = ratio;
        this._setAspectRatio();
    },

    play: function(src){
        if (src !== undefined) {
            this._setSource(src);
        }

        if (this.element.attr("src") === undefined && this.element.find("source").length === 0) {
            return ;
        }

        this.isPlaying = true;

        this.video.play();
    },

    pause: function(){
        this.isPlaying = false;
        this.video.pause();
    },

    resume: function(){
        if (this.video.paused) {
            this.play();
        }
    },

    stop: function(){
        this.isPlaying = false;
        this.video.pause();
        this.video.currentTime = 0;
        Metro.getPlugin(this.stream[0], 'slider').val(0);
        this._offMouse();
    },

    volume: function(v){
        if (v === undefined) {
            return this.video.volume;
        }

        if (v > 1) {
            v /= 100;
        }

        this.video.volume = v;
        Metro.getPlugin(this.volume[0], 'slider').val(v*100);
    },

    loop: function(){
        this._toggleLoop();
    },

    mute: function(){
        this._toggleMute();
    },

    changeAspectRatio: function(){
        this.options.aspectRatio = this.element.attr("data-aspect-ratio");
        this._setAspectRatio();
    },

    changeSource: function(){
        var src = JSON.parse(this.element.attr('data-src'));
        this.play(src);
    },

    changeVolume: function(){
        var volume = this.element.attr("data-volume");
        this.volume(volume);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-aspect-ratio": this.changeAspectRatio(); break;
            case "data-src": this.changeSource(); break;
            case "data-volume": this.changeVolume(); break;
        }
    },

    destroy: function(){
        var element = this.element, player = this.player;

        Metro.getPlugin(this.stream[0], "slider").destroy();
        Metro.getPlugin(this.volume[0], "slider").destroy();

        element.off("loadstart");
        element.off("loadedmetadata");
        element.off("canplay");
        element.off("progress");
        element.off("timeupdate");
        element.off("waiting");
        element.off("loadeddata");
        element.off("play");
        element.off("pause");
        element.off("stop");
        element.off("ended");
        element.off("volumechange");

        player.off(Metro.events.click, ".play");
        player.off(Metro.events.click, ".stop");
        player.off(Metro.events.click, ".mute");
        player.off(Metro.events.click, ".loop");
        player.off(Metro.events.click, ".full");

        $(window).off(Metro.events.keyup,{ns: element.attr("id")});
        $(window).off(Metro.events.resize,{ns: element.attr("id")});

        return element;
    }
};

Metro.plugin('video', Video);

var WindowDefaultConfig = {
    hidden: false,
    width: "auto",
    height: "auto",
    btnClose: true,
    btnMin: true,
    btnMax: true,
    draggable: true,
    dragElement: ".window-caption .icon, .window-caption .title",
    dragArea: "parent",
    shadow: false,
    icon: "",
    title: "Window",
    content: null,
    resizable: true,
    overlay: false,
    overlayColor: 'transparent',
    overlayAlpha: .5,
    modal: false,
    position: "absolute",
    checkEmbed: true,
    top: "auto",
    left: "auto",
    place: "auto",
    closeAction: Metro.actions.REMOVE,
    customButtons: null,

    clsCustomButton: "",
    clsCaption: "",
    clsContent: "",
    clsWindow: "",

    _runtime: false,

    minWidth: 0,
    minHeight: 0,
    maxWidth: 0,
    maxHeight: 0,
    onDragStart: Metro.noop,
    onDragStop: Metro.noop,
    onDragMove: Metro.noop,
    onCaptionDblClick: Metro.noop,
    onCloseClick: Metro.noop,
    onMaxClick: Metro.noop,
    onMinClick: Metro.noop,
    onResizeStart: Metro.noop,
    onResizeStop: Metro.noop,
    onResize: Metro.noop,
    onWindowCreate: Metro.noop,
    onShow: Metro.noop,
    onWindowDestroy: Metro.noop,
    onCanClose: Metro.noop_true,
    onClose: Metro.noop
};

Metro.windowSetup = function (options) {
    WindowDefaultConfig = $.extend({}, WindowDefaultConfig, options);
};

if (typeof window["metroWindowSetup"] !== undefined) {
    Metro.windowSetup(window["metroWindowSetup"]);
}

var Window = {
    init: function( options, elem ) {
        this.options = $.extend( {}, WindowDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.win = null;
        this.overlay = null;
        this.position = {
            top: 0,
            left: 0
        };
        this.hidden = false;
        this.content = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    dependencies: ['draggable', 'resizeable'],

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var win, overlay;
        var parent = o.dragArea === "parent" ? element.parent() : $(o.dragArea);

        Metro.checkRuntime(element, "window");

        if (o.modal === true) {
            o.btnMax = false;
            o.btnMin = false;
            o.resizable = false;
        }

        //o.content = !Utils.isNull(o.content) ? element.append(o.content) : element;

        if (Utils.isNull(o.content)) {
            o.content = element;
        } else {
            if (Utils.isUrl(o.content) && Utils.isVideoUrl(o.content)) {
                o.content = Utils.embedUrl(o.content);
                element.css({
                    height: "100%"
                });
            } else

            if (!Utils.isQ(o.content) && Utils.isFunc(o.content)) {
                o.content = Utils.exec(o.content);
            }

            element.append(o.content);
            o.content = element;
            // console.log(o.content);
        }

        if (o._runtime === true) {
            Metro.makeRuntime(element, "window");
        }

        win = this._window(o);
        win.addClass("no-visible");

        parent.append(win);

        if (o.overlay === true) {
            overlay = this._overlay();
            overlay.appendTo(win.parent());
            this.overlay = overlay;
        }

        this.win = win;

        Utils.exec(o.onWindowCreate, [this.win[0]], element[0]);
        element.fire("windowcreate", {
            win: win[0]
        });

        setTimeout(function(){
            that._setPosition();

            if (o.hidden !== true) {
                that.win.removeClass("no-visible");
            }
            Utils.exec(o.onShow, [that.win[0]], element[0]);
            element.fire("show", {
                win: that.win[0]
            });
        }, 100);
    },

    _setPosition: function(){
        var o = this.options;
        var win = this.win;
        var parent = o.dragArea === "parent" ? win.parent() : $(o.dragArea);
        var top_center = parent.height() / 2 - win[0].offsetHeight / 2;
        var left_center = parent.width() / 2 - win[0].offsetWidth / 2;
        var top, left, right, bottom;

        if (o.place !== 'auto') {

            switch (o.place.toLowerCase()) {
                case "top-left": top = 0; left = 0; right = "auto"; bottom = "auto"; break;
                case "top-center": top = 0; left = left_center; right = "auto"; bottom = "auto"; break;
                case "top-right": top = 0; right = 0; left = "auto"; bottom = "auto"; break;
                case "right-center": top = top_center; right = 0; left = "auto"; bottom = "auto"; break;
                case "bottom-right": bottom = 0; right = 0; left = "auto"; top = "auto"; break;
                case "bottom-center": bottom = 0; left = left_center; right = "auto"; top = "auto"; break;
                case "bottom-left": bottom = 0; left = 0; right = "auto"; top = "auto"; break;
                case "left-center": top = top_center; left = 0; right = "auto"; bottom = "auto"; break;
                default: top = top_center; left = left_center; bottom = "auto"; right = "auto";
            }

            win.css({
                top: top,
                left: left,
                bottom: bottom,
                right: right
            });
        }
    },

    _window: function(o){
        var that = this, element = this.element;
        var win, caption, content, icon, title, buttons, btnClose, btnMin, btnMax, resizer, status;
        var width = o.width, height = o.height;

        win = $("<div>").addClass("window");

        if (o.modal === true) {
            win.addClass("modal");
        }

        caption = $("<div>").addClass("window-caption");
        content = $("<div>").addClass("window-content");

        win.append(caption);
        win.append(content);

        if (o.status === true) {
            status = $("<div>").addClass("window-status");
            win.append(status);
        }

        if (o.shadow === true) {
            win.addClass("win-shadow");
        }

        if (Utils.isValue(o.icon)) {
            icon = $("<span>").addClass("icon").html(o.icon);
            icon.appendTo(caption);
        }

        title = $("<span>").addClass("title").html(Utils.isValue(o.title) ? o.title : "&nbsp;");
        title.appendTo(caption);

        if (!Utils.isNull(o.content)) {

            // if (Utils.isUrl(o.content) && Utils.isVideoUrl(o.content)) {
            //     o.content = Utils.embedUrl(o.content);
            // }
            //
            // if (!Utils.isQ(o.content) && Utils.isFunc(o.content)) {
            //     o.content = Utils.exec(o.content);
            // }
            //
            if (Utils.isQ(o.content)) {
                o.content.appendTo(content);
            } else {
                content.html(o.content);
            }
        }

        buttons = $("<div>").addClass("buttons");
        buttons.appendTo(caption);

        if (o.btnMax === true) {
            btnMax = $("<span>").addClass("button btn-max sys-button");
            btnMax.appendTo(buttons);
        }

        if (o.btnMin === true) {
            btnMin = $("<span>").addClass("button btn-min sys-button");
            btnMin.appendTo(buttons);
        }

        if (o.btnClose === true) {
            btnClose = $("<span>").addClass("button btn-close sys-button");
            btnClose.appendTo(buttons);
        }

        if (Utils.isValue(o.customButtons)) {
            var customButtons = [];

            if (Utils.isObject(o.customButtons) !== false) {
                o.customButtons = Utils.isObject(o.customButtons);
            }

            if (typeof o.customButtons === "string" && o.customButtons.indexOf("{") > -1) {
                customButtons = JSON.parse(o.customButtons);
            } else if (typeof o.customButtons === "object" && Utils.objectLength(o.customButtons) > 0) {
                customButtons = o.customButtons;
            } else {
                console.log("Unknown format for custom buttons");
            }

            $.each(customButtons, function(){
                var item = this;
                var customButton = $("<span>");

                customButton
                    .addClass("button btn-custom")
                    .addClass(o.clsCustomButton)
                    .addClass(item.cls)
                    .attr("tabindex", -1)
                    .html(item.html);

                customButton.data("action", item.onclick);

                buttons.prepend(customButton);
            });
        }

        caption.on(Metro.events.stop, ".btn-custom", function(e){
            if (Utils.isRightMouse(e)) return;
            var button = $(this);
            var action = button.data("action");
            Utils.exec(action, [button], this);
        });

        win.attr("id", o.id === undefined ? Utils.elementId("window") : o.id);

        win.on(Metro.events.dblclick, ".window-caption", function(e){
            that.maximized(e);
        });

        caption.on(Metro.events.click, ".btn-max, .btn-min, .btn-close", function(e){
            if (Utils.isRightMouse(e)) return;
            var target = $(e.target);
            if (target.hasClass("btn-max")) that.maximized(e);
            if (target.hasClass("btn-min")) that.minimized(e);
            if (target.hasClass("btn-close")) that.close(e);
        });

        if (o.draggable === true) {
            Metro.makePlugin(win, "draggable", {
                dragElement: o.dragElement,
                dragArea: o.dragArea,
                onDragStart: o.onDragStart,
                onDragStop: o.onDragStop,
                onDragMove: o.onDragMove
            })
        }

        win.addClass(o.clsWindow);
        caption.addClass(o.clsCaption);
        content.addClass(o.clsContent);

        if (o.minWidth === 0) {
            o.minWidth = 34;
            $.each(buttons.children(".btn-custom"), function(){
                o.minWidth += Utils.hiddenElementSize(this).width;
            });
            if (o.btnMax) o.minWidth += 34;
            if (o.btnMin) o.minWidth += 34;
            if (o.btnClose) o.minWidth += 34;
        }

        if (o.minWidth > 0 && !isNaN(o.width) && o.width < o.minWidth) {
            width = o.minWidth;
        }
        if (o.minHeight > 0 && !isNaN(o.height) && o.height > o.minHeight) {
            height = o.minHeight;
        }

        if (o.resizable === true) {
            resizer = $("<span>").addClass("resize-element");
            resizer.appendTo(win);
            win.addClass("resizable");

            Metro.makePlugin(win, "resizable", {
                minWidth: o.minWidth,
                minHeight: o.minHeight,
                maxWidth: o.maxWidth,
                maxHeight: o.maxHeight,
                resizeElement: ".resize-element",
                onResizeStart: o.onResizeStart,
                onResizeStop: o.onResizeStop,
                onResize: o.onResize
            });
        }

        win.css({
            width: width,
            height: height,
            position: o.position,
            top: o.top,
            left: o.left
        });

        return win;
    },

    _overlay: function(){
        var o = this.options;

        var overlay = $("<div>");
        overlay.addClass("overlay");

        if (o.overlayColor === 'transparent') {
            overlay.addClass("transparent");
        } else {
            overlay.css({
                background: Utils.hex2rgba(o.overlayColor, o.overlayAlpha)
            });
        }

        return overlay;
    },

    maximized: function(e){
        var win = this.win,  element = this.element, o = this.options;
        var target = $(e.currentTarget);
        win.removeClass("minimized");
        win.toggleClass("maximized");
        if (target.hasClass("window-caption")) {
            Utils.exec(o.onCaptionDblClick, [win[0]], element[0]);
            element.fire("captiondblclick", {
                win: win[0]
            });
        } else {
            Utils.exec(o.onMaxClick, [win[0]], element[0]);
            element.fire("maxclick", {
                win: win[0]
            });
        }
    },

    minimized: function(){
        var win = this.win,  element = this.element, o = this.options;
        win.removeClass("maximized");
        win.toggleClass("minimized");
        Utils.exec(o.onMinClick, [win[0]], element[0]);
        element.fire("minclick", {
            win: win[0]
        });
    },

    close: function(){
        var that = this, win = this.win,  element = this.element, o = this.options;
        var timer = null;

        if (Utils.exec(o.onCanClose, [win]) === false) {
            return false;
        }

        var timeout = 0;

        if (o.onClose !== Metro.noop) {
            timeout = 500;
        }

        Utils.exec(o.onClose, [win[0]], element[0]);
        element.fire("close", {
            win: win[0]
        });

        timer = setTimeout(function(){
            timer = null;
            if (o.modal === true) {
                win.siblings(".overlay").remove();
            }
            Utils.exec(o.onCloseClick, [win[0]], element[0]);
            element.fire("closeclick", {
                win: win[0]
            });

            Utils.exec(o.onWindowDestroy, [win[0]], element[0]);
            element.fire("windowdestroy", {
                win: win[0]
            });

            if (o.closeAction === Metro.actions.REMOVE) {
                win.remove();
            } else {
                that.hide();
            }

        }, timeout);
    },

    hide: function(){
        var element = this.element, o = this.options;
        this.win.css({
            display: "none"
        });
        Utils.exec(o.onHide, [this.win[0]], element[0]);
        element.fire("hide", {
            win: this.win[0]
        });
    },

    show: function(){
        var element = this.element, o = this.options;

        this.win.removeClass("no-visible");
        this.win.css({
            display: "flex"
        });

        Utils.exec(o.onShow, [this.win[0]], element[0]);
        element.fire("show", {
            win: this.win[0]
        });
    },

    toggle: function(){
        if (this.win.css("display") === "none" || this.win.hasClass("no-visible")) {
            this.show();
        } else {
            this.hide();
        }
    },

    isOpen: function(){
        return this.win.hasClass("no-visible");
    },

    min: function(a){
        a ? this.win.addClass("minimized") : this.win.removeClass("minimized");
    },

    max: function(a){
        a ? this.win.addClass("maximized") : this.win.removeClass("maximized");
    },

    toggleButtons: function(a) {
        var win = this.win;
        var btnClose = win.find(".btn-close");
        var btnMin = win.find(".btn-min");
        var btnMax = win.find(".btn-max");

        if (a === "data-btn-close") {
            btnClose.toggle();
        }
        if (a === "data-btn-min") {
            btnMin.toggle();
        }
        if (a === "data-btn-max") {
            btnMax.toggle();
        }
    },

    changeSize: function(a){
        var element = this.element, win = this.win;
        if (a === "data-width") {
            win.css("width", element.data("width"));
        }
        if (a === "data-height") {
            win.css("height", element.data("height"));
        }
    },

    changeClass: function(a){
        var element = this.element, win = this.win, o = this.options;

        if (a === "data-cls-window") {
            win[0].className = "window " + (o.resizable ? " resizeable " : " ") + element.attr("data-cls-window");
        }
        if (a === "data-cls-caption") {
            win.find(".window-caption")[0].className = "window-caption " + element.attr("data-cls-caption");
        }
        if (a === "data-cls-content") {
            win.find(".window-content")[0].className = "window-content " + element.attr("data-cls-content");
        }
    },

    toggleShadow: function(){
        var element = this.element, win = this.win;
        var flag = JSON.parse(element.attr("data-shadow"));
        if (flag === true) {
            win.addClass("win-shadow");
        } else {
            win.removeClass("win-shadow");
        }
    },

    setContent: function(c){
        var element = this.element, win = this.win;
        var content = Utils.isValue(c) ? c : element.attr("data-content");
        var result;

        if (!Utils.isQ(content) && Utils.isFunc(content)) {
            result = Utils.exec(content);
        } else if (Utils.isQ(content)) {
            result = content.html();
        } else {
            result = content;
        }

        win.find(".window-content").html(result);
    },

    setTitle: function(t){
        var element = this.element, win = this.win;
        var title = Utils.isValue(t) ? t : element.attr("data-title");
        win.find(".window-caption .title").html(title);
    },

    setIcon: function(i){
        var element = this.element, win = this.win;
        var icon = Utils.isValue(i) ? i : element.attr("data-icon");
        win.find(".window-caption .icon").html(icon);
    },

    getIcon: function(){
        return this.win.find(".window-caption .icon").html();
    },

    getTitle: function(){
        return this.win.find(".window-caption .title").html();
    },

    toggleDraggable: function(){
        var element = this.element, win = this.win;
        var flag = JSON.parse(element.attr("data-draggable"));
        var drag = Metro.getPlugin(win, "draggable");
        if (flag === true) {
            drag.on();
        } else {
            drag.off();
        }
    },

    toggleResizable: function(){
        var element = this.element, win = this.win;
        var flag = JSON.parse(element.attr("data-resizable"));
        var resize = Metro.getPlugin(win, "resizable");
        if (flag === true) {
            resize.on();
            win.find(".resize-element").removeClass("resize-element-disabled");
        } else {
            resize.off();
            win.find(".resize-element").addClass("resize-element-disabled");
        }
    },

    changeTopLeft: function(a){
        var element = this.element, win = this.win;
        var pos;
        if (a === "data-top") {
            pos = parseInt(element.attr("data-top"));
            if (!isNaN(pos)) {
                return ;
            }
            win.css("top", pos);
        }
        if (a === "data-left") {
            pos = parseInt(element.attr("data-left"));
            if (!isNaN(pos)) {
                return ;
            }
            win.css("left", pos);
        }
    },

    changePlace: function (p) {
        var element = this.element, win = this.win;
        var place = Utils.isValue(p) ? p : element.attr("data-place");
        win.addClass(place);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-btn-close":
            case "data-btn-min":
            case "data-btn-max": this.toggleButtons(attributeName); break;
            case "data-width":
            case "data-height": this.changeSize(attributeName); break;
            case "data-cls-window":
            case "data-cls-caption":
            case "data-cls-content": this.changeClass(attributeName); break;
            case "data-shadow": this.toggleShadow(); break;
            case "data-icon": this.setIcon(); break;
            case "data-title": this.setTitle(); break;
            case "data-content": this.setContent(); break;
            case "data-draggable": this.toggleDraggable(); break;
            case "data-resizable": this.toggleResizable(); break;
            case "data-top":
            case "data-left": this.changeTopLeft(attributeName); break;
            case "data-place": this.changePlace(); break;
        }
    },

    destroy: function(){
        var element = this.element;

        return element;
    }
};

Metro.plugin('window', Window);

Metro['window'] = {

    isWindow: function(el){
        return Utils.isMetroObject(el, "window");
    },

    min: function(el, a){
        if (!this.isWindow(el)) {
            return false;
        }
        Metro.getPlugin(el,"window").min(a);
    },

    max: function(el, a){
        if (!this.isWindow(el)) {
            return false;
        }
        Metro.getPlugin(el, "window").max(a);
    },

    show: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        Metro.getPlugin(el, "window").show();
    },

    hide: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        Metro.getPlugin(el, "window").hide();
    },

    toggle: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        Metro.getPlugin(el, "window").toggle();
    },

    isOpen: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        var win = Metro.getPlugin(el,"window");
        return win.isOpen();
    },

    close: function(el){
        if (!this.isWindow(el)) {
            return false;
        }
        Metro.getPlugin(el, "window").close();
    },

    create: function(options){
        var w;

        w = $("<div>").appendTo($("body"));

        var w_options = $.extend({}, {
        }, (options !== undefined ? options : {}));

        w_options._runtime = true;

        return w.window(w_options);
    }
};

var WizardDefaultConfig = {
    start: 1,
    finish: 0,
    iconHelp: "<span class='default-icon-help'></span>",
    iconPrev: "<span class='default-icon-left-arrow'></span>",
    iconNext: "<span class='default-icon-right-arrow'></span>",
    iconFinish: "<span class='default-icon-check'></span>",

    buttonMode: "cycle", // default, cycle, square
    buttonOutline: true,

    clsWizard: "",
    clsActions: "",
    clsHelp: "",
    clsPrev: "",
    clsNext: "",
    clsFinish: "",

    onPage: Metro.noop,
    onNextPage: Metro.noop,
    onPrevPage: Metro.noop,
    onFirstPage: Metro.noop,
    onLastPage: Metro.noop,
    onFinishPage: Metro.noop,
    onHelpClick: Metro.noop,
    onPrevClick: Metro.noop,
    onNextClick: Metro.noop,
    onFinishClick: Metro.noop,
    onBeforePrev: Metro.noop_true,
    onBeforeNext: Metro.noop_true,
    onWizardCreate: Metro.noop
};

Metro.wizardSetup = function (options) {
    WizardDefaultConfig = $.extend({}, WizardDefaultConfig, options);
};

if (typeof window["metroWizardSetup"] !== undefined) {
    Metro.wizardSetup(window["metroWizardSetup"]);
}

var Wizard = {
    init: function( options, elem ) {
        this.options = $.extend( {}, WizardDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        Metro.checkRuntime(element, "wizard");

        this._createWizard();
        this._createEvents();

        Utils.exec(o.onWizardCreate, null, element[0]);
        element.fire("wizardcreate");
    },

    _createWizard: function(){
        var that = this, element = this.element, o = this.options;
        var bar;

        if (!element.attr("id")) {
            element.attr("id", Utils.elementId("wizard"));
        }

        element.addClass("wizard").addClass(o.view).addClass(o.clsWizard);

        bar = $("<div>").addClass("action-bar").addClass(o.clsActions).appendTo(element);

        var buttonMode = o.buttonMode === "button" ? "" : o.buttonMode;
        if (o.buttonOutline === true) {
            buttonMode += " outline";
        }

        if (o.iconHelp !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-help").addClass(buttonMode).addClass(o.clsHelp).html(Utils.isTag(o.iconHelp) ? o.iconHelp : $("<img>").attr('src', o.iconHelp)).appendTo(bar);
        if (o.iconPrev !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-prev").addClass(buttonMode).addClass(o.clsPrev).html(Utils.isTag(o.iconPrev) ? o.iconPrev : $("<img>").attr('src', o.iconPrev)).appendTo(bar);
        if (o.iconNext !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-next").addClass(buttonMode).addClass(o.clsNext).html(Utils.isTag(o.iconNext) ? o.iconNext : $("<img>").attr('src', o.iconNext)).appendTo(bar);
        if (o.iconFinish !== false) $("<button>").attr("type", "button").addClass("button wizard-btn-finish").addClass(buttonMode).addClass(o.clsFinish).html(Utils.isTag(o.iconFinish) ? o.iconFinish : $("<img>").attr('src', o.iconFinish)).appendTo(bar);

        this.toPage(o.start);

        this._setHeight();
    },

    _setHeight: function(){
        var that = this, element = this.element, o = this.options;
        var pages = element.children("section");
        var max_height = 0;

        pages.children(".page-content").css("max-height", "none");

        $.each(pages, function(){
            var h = $(this).height();
            if (max_height < parseInt(h)) {
                max_height = h;
            }
        });

        element.height(max_height);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".wizard-btn-help", function(){
            var pages = element.children("section");
            var page = pages.get(that.current - 1);

            Utils.exec(o.onHelpClick, [that.current, page, element[0]]);
            element.fire("helpclick", {
                index: that.current,
                page: page
            });
        });

        element.on(Metro.events.click, ".wizard-btn-prev", function(){
            that.prev();
            var pages = element.children("section");
            var page = pages.get(that.current - 1);
            Utils.exec(o.onPrevClick, [that.current, page], element[0]);
            element.fire("prevclick", {
                index: that.current,
                page: page
            });
        });

        element.on(Metro.events.click, ".wizard-btn-next", function(){
            that.next();
            var pages = element.children("section");
            var page = pages.get(that.current - 1);
            Utils.exec(o.onNextClick, [that.current, page], element[0]);
            element.fire("nextclick", {
                index: that.current,
                page: page
            });
        });

        element.on(Metro.events.click, ".wizard-btn-finish", function(){
            var pages = element.children("section");
            var page = pages.get(that.current - 1);
            Utils.exec(o.onFinishClick, [that.current, page], element[0]);
            element.fire("finishclick", {
                index: that.current,
                page: page
            });
        });

        element.on(Metro.events.click, ".complete", function(){
            var index = $(this).index() + 1;
            that.toPage(index);
        });

        $(window).on(Metro.events.resize, function(){
            that._setHeight();
        }, {ns: element.attr("id")});
    },

    next: function(){
        var that = this, element = this.element, o = this.options;
        var pages = element.children("section");
        var page = $(element.children("section").get(this.current - 1));

        if (this.current + 1 > pages.length || Utils.exec(o.onBeforeNext, [this.current, page, element]) === false) {
            return ;
        }

        this.current++;

        this.toPage(this.current);

        page = $(element.children("section").get(this.current - 1));
        Utils.exec(o.onNextPage, [this.current, page[0]], element[0]);
        element.fire("nextpage", {
            index: that.current,
            page: page[0]
        });
    },

    prev: function(){
        var that = this, element = this.element, o = this.options;
        var page = $(element.children("section").get(this.current - 1));

        if (this.current - 1 === 0 || Utils.exec(o.onBeforePrev, [this.current, page, element]) === false) {
            return ;
        }

        this.current--;

        this.toPage(this.current);

        page = $(element.children("section").get(this.current - 1));
        Utils.exec(o.onPrevPage, [this.current, page[0]], element[0]);
        element.fire("prevpage", {
            index: that.current,
            page: page[0]
        });
    },

    last: function(){
        var that = this, element = this.element, o = this.options;
        var page;

        this.toPage(element.children("section").length);

        page = $(element.children("section").get(this.current - 1));
        Utils.exec(o.onLastPage, [this.current, page[0]], element[0]);
        element.fire("lastpage", {
            index: that.current,
            page: page[0]
        });

    },

    first: function(){
        var that = this, element = this.element, o = this.options;
        var page;

        this.toPage(1);

        page = $(element.children("section").get(0));
        Utils.exec(o.onFirstPage, [this.current, page[0]], element[0]);
        element.fire("firstpage", {
            index: that.current,
            page: page[0]
        });
    },

    toPage: function(page){
        var that = this, element = this.element, o = this.options;
        var target = $(element.children("section").get(page - 1));
        var sections = element.children("section");
        var actions = element.find(".action-bar");

        if (target.length === 0) {
            return ;
        }

        var finish = element.find(".wizard-btn-finish").addClass("disabled");
        var next = element.find(".wizard-btn-next").addClass("disabled");
        var prev = element.find(".wizard-btn-prev").addClass("disabled");

        this.current = page;

        element.children("section")
            .removeClass("complete current")
            .removeClass(o.clsCurrent)
            .removeClass(o.clsComplete);

        target.addClass("current").addClass(o.clsCurrent);
        target.prevAll().addClass("complete").addClass(o.clsComplete);

        var border_size = element.children("section.complete").length === 0 ? 0 : parseInt(Utils.getStyleOne(element.children("section.complete")[0], "border-left-width"));

        actions.animate({
            left: element.children("section.complete").length * border_size + 41
        });

        if (
            (this.current === sections.length) || (o.finish > 0 && this.current >= o.finish)
        ) {
            finish.removeClass("disabled");
        }

        if (parseInt(o.finish) > 0 && this.current === parseInt(o.finish)) {
            Utils.exec(o.onFinishPage, [this.current, target[0]], element[0]);
            element.fire("finishpage", {
                index: this.current,
                page: target[0]
            });
        }

        if (this.current < sections.length) {
            next.removeClass("disabled");
        }

        if (this.current > 1) {
            prev.removeClass("disabled");
        }

        Utils.exec(o.onPage, [this.current, target[0]], element[0]);
        element.fire("page", {
            index: this.current,
            page: target[0]
        });
    },

    changeAttribute: function(attributeName){
    },

    destroy: function(){
        var element = this.element;

        element.off(Metro.events.click, ".wizard-btn-help");
        element.off(Metro.events.click, ".wizard-btn-prev");
        element.off(Metro.events.click, ".wizard-btn-next");
        element.off(Metro.events.click, ".wizard-btn-finish");
        element.off(Metro.events.click, ".complete");
        $(window).off(Metro.events.resize,{ns: element.attr("id")});

        return element;
    }
};

Metro.plugin('wizard', Wizard);

return METRO_INIT === true ? Metro.init() : Metro;

}));