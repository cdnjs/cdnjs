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
define("mo/lang/es6-utils", ["./es5"], function(es5){

var host = this,
    Array = host.Array,
    String = host.String,
    Object = host.Object,
    isFinite = host.isFinite,
    _stringproto = String.prototype,
    _arrayproto = Array.prototype,
    _slice = _arrayproto.slice,
    _string_indexof = _stringproto.indexOf;

if (!_arrayproto.find) {
    _arrayproto.find = function(fn, context) {
        var list = Object(this);
        var l = list.length >>> 0;
        if (!l || l < 0) {
            return;
        }
        for (var i = 0, value; i < l && i in list; i++) {
            value = list[i];
            if (fn.call(context, value, i, list)) {
                return value;
            }
        }
    };
}

if (!_arrayproto.findIndex) {
    _arrayproto.findIndex = function(fn, context) {
        var list = Object(this);
        var l = list.length >>> 0;
        if (!l || l < 0) {
            return -1;
        }
        for (var i = 0; i < l && i in list; i++) {
            if (fn.call(context, list[i], i, list)) {
                return i;
            }
        }
        return -1;
    };
}

if (!_arrayproto.fill) {
    _arrayproto.fill = function(value, start, end) {
        var list = Object(this);
        var l = list.length >>> 0;
        start = start || 0;
        end = end || l;
        var i = start < 0 
            ? Math.max(l + start, 0) : Math.min(start, l);
        for (; i < l && i < end; ++i) {
            list[i] = value;
        }
        return list;
    };
}

// modified from MDN
if (!_arrayproto.copyWithin) {
    _arrayproto.copyWithin = function(target, start /*, end*/) {
        var O = Object(this);
        var len = O.length >>> 0;
        var relativeTarget = parseInt(target, 10);
        var to = relativeTarget < 0 ? Math.max(len + relativeTarget, 0)
            : Math.min(relativeTarget, len);
        var relativeStart = parseInt(start, 10);
        var from = relativeStart < 0 ? Math.max(len + relativeStart, 0)
            : Math.min(relativeStart, len);
        var end = arguments[2];
        var relativeEnd = end === undefined ? len : parseInt(end, 10);
        var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0)
            : Math.min(relativeEnd, len);
        var count = Math.min(final - from, len - to);
        if (from < to && to < (from + count)) {
            from = from + count - 1;
            to = to + count - 1;
            while (count > 0) {
                if (from in O)
                    O[to] = O[from];
                else
                    delete O[to];
                from--;
                to--;
                count--;
            }
        } else {
            while (count > 0) {
                if (from in O)
                    O[to] = O[from];
                else
                    delete O[to];
                from++;
                to++;
                count--;
            }
        }
        return O;
    };
}

if (!Array.of) {
    Array.of = function() {
        return _slice.call(arguments);
    };
}

// modified from mathiasbynens/Array.from
if (!Array.from) {
    var to_length = function(value) {
        var number = Number(value);
        var length;
        if (number != number) { // better `isNaN`
            length = 0;
        } else if (number === 0 || !isFinite(number)) {
            length = number;
        } else {
            length = (number < 0 ? -1 : +1) 
                * Math.floor(Math.abs(number));
        }
        if (length <= 0) {
            return 0;
        }
        return Math.min(length, 0x1FFFFFFFFFFFFF);
    };
    Array.from = function(arrayLike) {
        var items = Object(arrayLike),
            mapfn = arguments.length > 1 ? arguments[1] : undefined,
            context = arguments.length > 2 ? arguments[2] : undefined,
            mapping = true;
        if (mapfn === undefined) {
            mapping = false;
        } else if (typeof mapfn != 'function') {
            throw TypeError();
        }
        var l = to_length(items.length),
            re = new Array(l),
            k = 0,
            kvalue,
            mapped_value;
        while (k < l) {
            if (k in items) {
                kvalue = items[k];
                mapped_value = mapping 
                    ? mapfn.call(context, kvalue, k) 
                    : kvalue;
                re[k] = mapped_value;
            }
            ++k;
        }
        re.length = l;
        return re;
    };
}

// modified from paulmillr/es6-shim
if (!_stringproto.startsWith) {
    _stringproto.startsWith = function(searchStr, startArg) {
        var thisStr = String(this);
        searchStr = String(searchStr);
        var start = Math.max(parseInt(startArg, 10), 0);
        return thisStr.slice(start, start + searchStr.length) === searchStr;
    };
}

// modified from paulmillr/es6-shim
if (!_stringproto.endsWith) {
    _stringproto.endsWith = function(searchStr, posArg) {
        var thisStr = String(this);
        searchStr = String(searchStr);
        var thisLen = thisStr.length;
        var pos = posArg === undefined ? thisLen : parseInt(posArg, 10);
        var end = Math.min(Math.max(pos, 0), thisLen);
        return thisStr.slice(end - searchStr.length, end) === searchStr;
    };
}

// modified from paulmillr/es6-shim
if (!_stringproto.contains) {
    _stringproto.contains = function(searchString, position) {
        return _string_indexof.call(this, searchString, position) !== -1;
    };
}

// modified from paulmillr/es6-shim
if (!_stringproto.repeat) {
    var repeat = function(s, times) {
        if (times < 1) {
            return '';
        }
        if (times % 2) {
            return repeat(s, times - 1) + s;
        }
        var half = repeat(s, times / 2);
        return half + half;
    };
    _stringproto.repeat = function(times) {
        var thisStr = String(this);
        times = parseInt(times, 10);
        if (times < 0 || times === Infinity) {
            throw new RangeError('Invalid String#repeat value');
        }
        return repeat(thisStr, times);
    };
}

if (!Number.MAX_SAFE_INTEGER) {
    var maxSafeInteger = Math.pow(2, 53) - 1;
    Number.MAX_SAFE_INTEGER = maxSafeInteger;
    Number.MIN_SAFE_INTEGER = -maxSafeInteger;
}

if (!Number.EPSILON) {
    Number.EPSILON = 2.220446049250313e-16;
}

if (!Number.isFinite) {
    Number.isFinite = function(value) {
        return typeof value === 'number' && isFinite(value);
    };
}

if (!Number.isInteger) {
    Number.isInteger = function(value) {
        return typeof value === "number" 
            && isFinite(value) 
            && value > -9007199254740992 
            && value < 9007199254740992 
            && Math.floor(value) === value;
    };
}

if (!Number.isSafeInteger) {
    Number.isSafeInteger = function(value) {
        return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
    };
}

if (!Number.isNaN) {
    Number.isNaN = function(value) {
        return value !== value;
    };
}

// modified from ljharb/object-is
if (!Object.is) {
    var number_is_NaN = function(value) {
        return typeof value === 'number' && isNaN(value);
    };
    Object.is = function is(a, b) {
        if (a === 0 && b === 0) {
            return 1 / a === 1 / b;
        } else if (a === b) {
            return true;
        } else if (number_is_NaN(a) && number_is_NaN(b)) {
            return true;
        }
        return false;
    };
}

// modified from ljharb/object.assign
if (!Object.assign) {
    var is_object = function(obj) {
        return obj && typeof obj === 'object';
    };
    Object.assign = function assign(target, source) {
        var s, i, l, props;
        if (!is_object(target)) {
            throw new TypeError('target must be an object');
        }
        for (s = 1, l = arguments.length; s < l; ++s) {
            source = arguments[s];
            if (!is_object(source)) {
                throw new TypeError('source ' + s + ' must be an object');
            }
            props = Object.keys(Object(source));
            for (i = 0, l = props.length; i < l; ++i) {
                target[props[i]] = source[props[i]];
            }
        }
        return target;
    };
}

});
