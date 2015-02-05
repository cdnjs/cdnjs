/**
 * Copyright (C) 2010-2014, Dexter.Yy, MIT License
 * vim: et:ts=4:sw=4:sts=4
 */
if (typeof module === 'undefined' 
        && (typeof define !== 'function' || !define.amd)) {
    define = function(mid, deps, factory){
        factory();
    };
}
define("mo/lang/es5", [], function(){

var host = this,
    Array = host.Array,
    String = host.String,
    Object = host.Object,
    Function = host.Function,
    _objproto = Object.prototype,
    _arrayproto = Array.prototype,
    _stringproto = String.prototype,
    _fnproto = Function.prototype;

function Empty() {}

if (!_fnproto.bind) {
    _fnproto.bind = function (that) {
        var target = this,
            args = _arrayproto.slice.call(arguments, 1),
            bound = function () {
                var arglist = args.concat(_arrayproto.slice.call(arguments));
                if (this instanceof bound) {
                    var result = target.apply(this, arglist);
                    if (Object(result) === result) {
                        return result;
                    }
                    return this;
                } else {
                    return target.apply(that, arglist);
                }
            };
        if(target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            Empty.prototype = null;
        }
        return bound;
    };
}

var _call = _fnproto.call,
    _hasOwnProperty = _call.bind(_objproto.hasOwnProperty),
    _toString = _call.bind(_objproto.toString);

if (!_arrayproto.filter) {
    _arrayproto.filter = function(fn, sc){
        var r = [];
        for (var i = 0, l = this.length; i < l; i++){
            if (i in this && fn.call(sc, this[i], i, this)) {
                r.push(this[i]);
            }
        }
        return r;
    };
}
    
if (!_arrayproto.forEach) {
    _arrayproto.forEach = function(fn, sc){
        for(var i = 0, l = this.length; i < l; i++){
            if (i in this)
                fn.call(sc, this[i], i, this);
        }
    };
}

if (!_arrayproto.map) {
    _arrayproto.map = function(fn, sc){
        for (var i = 0, copy = [], l = this.length; i < l; i++) {
            if (i in this) {
                copy[i] = fn.call(sc, this[i], i, this);
            }
        }
        return copy;
    };
}

var EMPTY_ERROR = " of empty array with no initial value";
// modified from es-shims/es5-shim
if (!_arrayproto.reduce) {
    _arrayproto.reduce = function reduce(fun /*, initial*/) {
        var l = this.length;
        if (!l && arguments.length === 1) {
            throw new TypeError("reduce" + EMPTY_ERROR);
        }
        var i = 0;
        var result;
        if (arguments.length >= 2) {
            result = arguments[1];
        } else {
            do {
                if (i in this) {
                    result = this[i++];
                    break;
                }
                if (++i >= l) {
                    throw new TypeError("reduce" + EMPTY_ERROR);
                }
            } while (true);
        }
        for (; i < l; i++) {
            if (i in this) {
                result = fun.call(void 0, result, this[i], i, this);
            }
        }
        return result;
    };
}

// modified from es-shims/es5-shim
if (!_arrayproto.reduceRight) {
    _arrayproto.reduceRight = function(fun /*, initial*/) {
        var l = this.length;
        if (!l && arguments.length === 1) {
            throw new TypeError("reduceRight" + EMPTY_ERROR);
        }
        var result, i = l - 1;
        if (arguments.length >= 2) {
            result = arguments[1];
        } else {
            do {
                if (i in this) {
                    result = this[i--];
                    break;
                }
                if (--i < 0) {
                    throw new TypeError("reduceRight" + EMPTY_ERROR);
                }
            } while (true);
        }
        if (i < 0) {
            return result;
        }
        do {
            if (i in this) {
                result = fun.call(void 0, result, this[i], i, this);
            }
        } while (i--);
        return result;
    };
}

if (!_arrayproto.some) {
    _arrayproto.some = function(fn, sc){
        for (var i = 0, l = this.length; i < l; i++){
            if (i in this && fn.call(sc, this[i], i, this)) {
                return true;
            }
        }
        return false;
    };
}

if (!_arrayproto.every) {
    _arrayproto.every = function(fn, sc){
        for (var i = 0, l = this.length; i < l; i++){
            if (i in this && !fn.call(sc, this[i], i, this)) {
                return false;
            }
        }
        return true;
    };
}

if (!_arrayproto.indexOf) {
    _arrayproto.indexOf = function(elt, from){
        var l = this.length;
        from = parseInt(from, 10) || 0;
        if (from < 0)
            from += l;
        for (; from < l; from++) {
            if (from in this && this[from] === elt)
                return from;
        }
        return -1;
    };
}

if (!_arrayproto.lastIndexOf) {
    _arrayproto.lastIndexOf = function(elt, from){
        var l = this.length;
        from = parseInt(from, 10) || l - 1;
        if (from < 0)
            from += l;
        for (; from > -1; from--) {
            if (from in this && this[from] === elt)
                return from;
        }
        return -1;
    };
}

if (!Array.isArray) {
    Array.isArray = function(obj) {
        return _toString(obj) === "[object Array]";
    };
}

// modified from es-shims/es5-shim
var ws = "\x09\x0A\x0B\x0C\x0D \xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
    "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
    "\u2029\uFEFF";
var zeroWidth = '\u200b';
if (!_stringproto.trim || ws.trim() || !zeroWidth.trim()) {
    // http://blog.stevenlevithan.com/archives/faster-trim-javascript
    // http://perfectionkills.com/whitespace-deviations/
    ws = "[" + ws + "]";
    var trimBeginRegexp = new RegExp("^" + ws + ws + "*"),
        trimEndRegexp = new RegExp(ws + ws + "*$");
    _stringproto.trim = function trim() {
        if (this === void 0 || this === null) {
            throw new TypeError("can't convert " + this + " to object");
        }
        return String(this)
            .replace(trimBeginRegexp, "")
            .replace(trimEndRegexp, "");
    };
}

if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

if (!Object.keys) {
    Object.keys = function(obj) {
        var keys = [];
        for (var prop in obj) {
            if (_hasOwnProperty(obj, prop)) {
                keys.push(prop);
            }
        }
        return keys;
    };
}

if (!Object.create) {
    var Temp = function(){};
    Object.create = function(proto, des) {
        Temp.prototype = proto;
        var obj = new Temp();
        for (var key in des) {
            obj[key] = des[key].value;
        }
        obj.__proto__ = proto;
        obj.constructor = Object;
        return obj;
    };
}

if (!Object.getPrototypeOf) {
    Object.getPrototypeOf = function (obj) {
        var proto = obj.__proto__;
        if (proto || proto === null) {
            return proto;
        } else if (obj.constructor) {
            return obj.constructor.prototype;
        } else {
            return _objproto;
        }
    };
}

});
