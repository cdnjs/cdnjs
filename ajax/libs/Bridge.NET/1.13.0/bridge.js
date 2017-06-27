/*
 * @version   : 1.13.0 - Bridge.NET
 * @author    : Object.NET, Inc. http://bridge.net/
 * @date      : 2016-05-03
 * @copyright : Copyright (c) 2008-2016, Object.NET, Inc. (http://object.net/). All rights reserved.
 * @license   : See license.txt and https://github.com/bridgedotnet/Bridge.NET/blob/master/LICENSE.
 */

(function (globals) {
    "use strict";

    // @source Core.js

    var core = {
        global: globals,

        emptyFn: function () { },

        identity: function (x) { return x; },

        ref: function(o, n) {
            if (Bridge.isArray(n)) {
                n = Bridge.Array.toIndex(o, n);
            }

            var proxy = {};

            Object.defineProperty(proxy, "v", {
                get: function () {
                    return o[n];
                },

                set: function (value) {
                    o[n] = value;
                }
            });

            return proxy;
        },
        
        property : function (scope, name, v) {
            scope[name] = v;

            var rs = name.charAt(0) === "$",
                cap = rs ? name.slice(1) : name;

            scope["get" + cap] = (function (name) {
                return function () {
                    return this[name];
                };
            })(name);

            scope["set" + cap] = (function (name) {
                return function (value) {
                    this[name] = value;
                };
            })(name);
        },

        event: function (scope, name, v) {
            scope[name] = v;

            var rs = name.charAt(0) === "$",
                cap = rs ? name.slice(1) : name;

            scope["add" + cap] = (function (name) {
                return function (value) {
                    this[name] = Bridge.fn.combine(this[name], value);
                };
            })(name);

            scope["remove" + cap] = (function (name) {
                return function (value) {
                    this[name] = Bridge.fn.remove(this[name], value);
                };
            })(name);
        },

        createInstance: function (type) {
            if (type === Bridge.Decimal) {
                return Bridge.Decimal.Zero;
            }

            if (type === Bridge.Long) {
                return Bridge.Long.Zero;
            }

            if (type === Bridge.ULong) {
                return Bridge.ULong.Zero;
            }

            if (type === Bridge.Double ||
                type === Bridge.Single ||
                type === Bridge.Byte ||
	            type === Bridge.SByte ||
	            type === Bridge.Int16 ||
	            type === Bridge.UInt16 ||
	            type === Bridge.Int32 ||
	            type === Bridge.UInt32 ||
                type === Bridge.Int) {
                return 0;
            }

            if (typeof (type.getDefaultValue) === 'function') {
                return type.getDefaultValue();
            } else if (type === Boolean) {
                return false;
            } else if (type === Date) {
                return new Date(0);
            } else if (type === Number) {
                return 0;
            } else if (type === String) {
                return '';
            } else {
                return new type();
            }
        },

        clone: function (obj) {
            if (Bridge.isArray(obj)) {
                return Bridge.Array.clone(obj);
            }

            if (Bridge.is(obj, Bridge.ICloneable)) {
                return obj.clone();
            }

            return null;
        },

        copy: function (to, from, keys, toIf) {
            if (typeof keys === "string") {
                keys = keys.split(/[,;\s]+/);
            }

            for (var name, i = 0, n = keys ? keys.length : 0; i < n; i++) {
                name = keys[i];

                if (toIf !== true || to[name] == undefined) {
                    if (Bridge.is(from[name], Bridge.ICloneable)) {
                        to[name] = Bridge.clone(from[name]);
                    } else {
                        to[name] = from[name];
                    }
                }
            }

            return to;
        },

        get: function (t) {
            if (t && t.$staticInit !== null) {
                t.$staticInit();
            }

            return t;
        },

        ns: function (ns, scope) {
            var nsParts = ns.split("."),
                i = 0;

            if (!scope) {
                scope = Bridge.global;
            }

            for (i = 0; i < nsParts.length; i++) {
                if (typeof scope[nsParts[i]] === "undefined") {
                    scope[nsParts[i]] = { };
                }

                scope = scope[nsParts[i]];
            }

            return scope;
        },

        ready: function (fn, scope) {
            var delayfn = function () {
                if (scope) {
                    fn.apply(scope);
                } else {
                    fn();
                }
            };

            if (typeof Bridge.global.jQuery !== "undefined") {
                Bridge.global.jQuery(delayfn);
            } else {
                if (typeof Bridge.global.document === "undefined" || Bridge.global.document.readyState === "complete" || Bridge.global.document.readyState === "loaded") {
                    delayfn();
                } else {
                    Bridge.on("DOMContentLoaded", Bridge.global.document, delayfn);
                }
            }
        },

        on: function (event, elem, fn, scope) {
            var listenHandler = function (e) {
                var ret = fn.apply(scope || this, arguments);

                if (ret === false) {
                    e.stopPropagation();
                    e.preventDefault();
                }

                return(ret);
            };

            var attachHandler = function () {
                var ret = fn.call(scope || elem, Bridge.global.event);

                if (ret === false) {
                    Bridge.global.event.returnValue = false;
                    Bridge.global.event.cancelBubble = true;
                }

                return (ret);
            };

            if (elem.addEventListener) {
                elem.addEventListener(event, listenHandler, false);
            } else {
                elem.attachEvent("on" + event, attachHandler);
            }
        },

        getHashCode: function (value, safe, store) {
            //in CLR: mutable object should keep on returning same value
            //bridge.net goals: make it deterministic (to make testing easier) without breaking CLR contracts
            // thus:
            //     for value types it returns deterministic values (f.e. for int 3 it returns 3) 
            //     for reference types it returns value derived recursively from its properties
            var store = (typeof store === 'undefined') ? true : store; 

            if (Bridge.isEmpty(value, true)) {
                if (safe) {
                    return 0;
                }

                throw new Bridge.InvalidOperationException("HashCode cannot be calculated for empty value");
            }

            if (value.getHashCode && Bridge.isFunction(value.getHashCode) && !value.__insideHashCode && value.getHashCode.length === 0) {
                value.__insideHashCode = true;
                var r = value.getHashCode();
                delete value.__insideHashCode;

                return r;
            }

            if (Bridge.isBoolean(value)) {
                return value ? 1 : 0;
            }

            if (Bridge.isDate(value)) {
                return value.valueOf() & 0xFFFFFFFF;
            }

            if (Bridge.isNumber(value)) {
                value = value.toExponential();

                return parseInt(value.substr(0, value.indexOf("e")).replace(".", ""), 10) & 0xFFFFFFFF;
            }

            if (Bridge.isString(value)) {
                var hash = 0,
                    i;

                for (i = 0; i < value.length; i++) {
                    hash = (((hash << 5) - hash) + value.charCodeAt(i)) & 0xFFFFFFFF;
                }

                return hash;
            }

            if (value.$$hashCode) {
                return value.$$hashCode;
            }

            if (typeof value === "object") {
                var result = 0,
                    removeCache = false,
                    len,
                    i,
                    item,
                    cacheItem,
                    temp;

                if (!Bridge.$$hashCodeCache) {
                    Bridge.$$hashCodeCache = [];
                    Bridge.$$hashCodeCalculated = [];
                    removeCache = true;
                }

                for (i = 0, len = Bridge.$$hashCodeCache.length; i < len; i += 1) {
                    item = Bridge.$$hashCodeCache[i];

                    if (item.obj === value) {
                        return item.hash;
                    }
                }

                cacheItem = { obj: value, hash: 0 };
                Bridge.$$hashCodeCache.push(cacheItem);

                for (var property in value) {
                    if (value.hasOwnProperty(property) && property !== "__insideHashCode") {
                        temp = Bridge.isEmpty(value[property], true) ? 0 : Bridge.getHashCode(value[property], safe, false);
                        result = 29 * result + temp;
                    }
                }

                cacheItem.hash = result;

                if (removeCache) {
                    delete Bridge.$$hashCodeCache;
                }

                if (store) {
                    value.$$hashCode = result;
                }

                if (result !== 0) {
                    return result;
                }
            }

            if (store === false) {
                return value.$$hashCode || ((Math.random() * 0x100000000) | 0);
            }

            return value.$$hashCode || (value.$$hashCode = (Math.random() * 0x100000000) | 0);
        },

        getDefaultValue: function (type) {
            if (
                (type.getDefaultValue) && type.getDefaultValue.length === 0) {
                return type.getDefaultValue();
            } else if (type === Boolean) {
                return false;
            } else if (type === Date) {
                return new Date(-864e13);
            } else if (type === Number) {
                return 0;
            }

            return null;
        },

        getTypeName: function (obj) {
            var str;

            if (obj.$$name) {
                return obj.$$name;
            }

            if ((obj).constructor === Function) {
                str = (obj).toString();
            } else {
                str = (obj).constructor.toString();
            }

            var results = (/function (.{1,})\(/).exec(str);
            return (results && results.length > 1) ? results[1] : "Object";
        },

        is: function (obj, type, ignoreFn, allowNull) {
	        if (typeof type === "string") {
                type = Bridge.unroll(type);
	        }

            if (obj == null) {
                return !!allowNull;
            }

            if (ignoreFn !== true) {
	            if (Bridge.isFunction(type.$is)) {
	                return type.$is(obj);
	            }

	            if (Bridge.isFunction(type.instanceOf)) {
	                return type.instanceOf(obj);
	            }
            }

            if ((obj.constructor === type) || (obj instanceof type)) {
	            return true;
            }

            if (Bridge.isArray(obj) || obj instanceof Bridge.ArrayEnumerator) {
                return Bridge.Array.is(obj, type);
            }

            if (Bridge.isString(obj)) {
                return Bridge.String.is(obj, type);
            }

            if (Bridge.isBoolean(obj)) {
                return Bridge.Boolean.is(obj, type);
            }

            if (!type.$$inheritors) {
                return false;
            }

            var inheritors = type.$$inheritors,
                i;

            for (i = 0; i < inheritors.length; i++) {
                if (Bridge.is(obj, inheritors[i])) {
	                return true;
	            }
            }

            return false;
	    },

        as: function (obj, type, allowNull) {
	        return Bridge.is(obj, type, false, allowNull) ? obj : null;
        },

        cast: function (obj, type, allowNull) {
            if (obj === null) {
                return null;
            }

            var result = Bridge.as(obj, type, allowNull);

	        if (result === null) {
	            throw new Bridge.InvalidCastException("Unable to cast type " + (obj ? Bridge.getTypeName(obj) : "'null'") + " to type " + Bridge.getTypeName(type));
	        }

	        return result;
        },

	    apply: function (obj, values) {
	        var names = Bridge.getPropertyNames(values, true),
	            i;

	        for (i = 0; i < names.length; i++) {
	            var name = names[i];

	            if (typeof obj[name] === "function" && typeof values[name] !== "function") {
	                obj[name](values[name]);
	            } else {
	                obj[name] = values[name];
	            }
	        }

	        return obj;
        },

	    merge: function (to, from) {
	        if (to instanceof Bridge.Decimal && Bridge.isNumber(from)) {
	            return new Bridge.Decimal(from);
	        }

	        if (to instanceof Bridge.Long && Bridge.isNumber(from)) {
	            return new Bridge.Long(from);
	        }

	        if (to instanceof Bridge.ULong && Bridge.isNumber(from)) {
	            return new Bridge.ULong(from);
	        }

	        if (to instanceof Boolean ||
                to instanceof Number ||
                to instanceof String ||
                to instanceof Function ||
                to instanceof Date ||
                to instanceof Bridge.Double ||
                to instanceof Bridge.Single ||
                to instanceof Bridge.Byte ||
	            to instanceof Bridge.SByte ||
	            to instanceof Bridge.Int16 ||
	            to instanceof Bridge.UInt16 ||
	            to instanceof Bridge.Int32 ||
	            to instanceof Bridge.UInt32 ||
                to instanceof Bridge.Int ||
                to instanceof Bridge.Decimal) {
	            return from;
	        }

	        var key,
			    i,
                value,
                toValue,
			    fn;

	        if (Bridge.isArray(from) && Bridge.isFunction(to.add || to.push)) {
	            fn = Bridge.isArray(to) ? to.push : to.add;

	            for (i = 0; i < from.length; i++) {
	                var item = from[i];

                    if (!Bridge.isArray(item)) {
                        item = [item];
                    }

                    fn.apply(to, item);
	            }
	        } else {
	            for (key in from) {
	                value = from[key];

	                if (typeof to[key] === "function") {
	                    if (key.match(/^\s*get[A-Z]/)) {
	                        Bridge.merge(to[key](), value);
	                    } else {
	                        to[key](value);
	                    }
	                } else {
	                    var setter = "set" + key.charAt(0).toUpperCase() + key.slice(1);

	                    if (typeof to[setter] === "function" && typeof value !== "function") {
	                        to[setter](value);
	                    } else if (value && value.constructor === Object && to[key]) {
	                        toValue = to[key];
	                        Bridge.merge(toValue, value);
	                    } else {
	                        to[key] = value;
	                    }
	                }
	            }
	        }

	        return to;
	    },

	    getEnumerator: function (obj, suffix) {
	        if (typeof obj === "string") {
	            obj = Bridge.String.toCharArray(obj);
	        }

	        if (suffix && obj && obj["getEnumerator" + suffix]) {
	            return obj["getEnumerator" + suffix].call(obj);
	        }

	        if (obj && obj.getEnumerator) {
	            return obj.getEnumerator();
	        }

	        if ((Object.prototype.toString.call(obj) === "[object Array]") ||
                (obj && Bridge.isDefined(obj.length))) {
	            return new Bridge.ArrayEnumerator(obj);
	        }

	        throw new Bridge.InvalidOperationException("Cannot create enumerator");
	    },

	    getPropertyNames: function (obj, includeFunctions) {
	        var names = [],
	            name;

	        for (name in obj) {
                if (includeFunctions || typeof obj[name] !== "function") {
                    names.push(name);
                }
	        }

	        return names;
	    },

	    isDefined: function (value, noNull) {
	        return typeof value !== "undefined" && (noNull ? value !== null : true);
	    },

	    isEmpty: function (value, allowEmpty) {
	        return (typeof value === "undefined" || value === null) || (!allowEmpty ? value === "" : false) || ((!allowEmpty && Bridge.isArray(value)) ? value.length === 0 : false);
	    },

	    toArray: function (ienumerable) {
	        var i,
	            item,
                len,
	            result = [];

	        if (Bridge.isArray(ienumerable)) {
                for (i = 0, len = ienumerable.length; i < len; ++i) {
                    result.push(ienumerable[i]);
                }
	        } else {
                i = Bridge.getEnumerator(ienumerable);

                while (i.moveNext()) {
                    item = i.getCurrent();
                    result.push(item);
                }
	        }

	        return result;
	    },

        isArray: function (obj) {
            return Object.prototype.toString.call(obj) in {
                "[object Array]": 1,
                "[object Uint8Array]": 1,
                "[object Int8Array]": 1,
                "[object Int16Array]": 1,
                "[object Uint16Array]": 1,
                "[object Int32Array]": 1,
                "[object Uint32Array]": 1,
                "[object Float32Array]": 1,
                "[object Float64Array]": 1
            };
        },

        isFunction: function (obj) {
            return typeof (obj) === "function";
        },

        isDate: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Date]";
        },

        isNull: function (value) {
            return (value === null) || (value === undefined);
        },

        isBoolean: function (value) {
            return typeof value === "boolean";
        },

        isNumber: function (value) {
            return typeof value === "number" && isFinite(value);
        },

        isString: function (value) {
            return typeof value === "string";
        },

        unroll: function (value) {
            var d = value.split("."),
                o = Bridge.global[d[0]],
                i = 1;

            for (i; i < d.length; i++) {
                if (!o) {
                    return null;
                }

                o = o[d[i]];
            }

            return o;
        },

        referenceEquals: function(a, b) {
            return Bridge.hasValue(a) ? a === b : !Bridge.hasValue(b);
        },

        equals: function (a, b) {
            if (a == null && b == null) {
                return true;
            }

            if (a && Bridge.isFunction(a.equals) && a.equals.length === 1) {
                return a.equals(b);
            }
            if (b && Bridge.isFunction(b.equals) && b.equals.length === 1) {
                return a.equals(b);
            } else if (Bridge.isDate(a) && Bridge.isDate(b)) {
                return a.valueOf() === b.valueOf();
            } else if (Bridge.isNull(a) && Bridge.isNull(b)) {
                return true;
            } else if (Bridge.isNull(a) !== Bridge.isNull(b)) {
                return false;
            }

            var eq = a === b;

            if (!eq && typeof a === "object" && typeof b === "object") {
                return (Bridge.getHashCode(a) === Bridge.getHashCode(b)) && Bridge.objectEquals(a, b);
            }

            return eq;
        },

        objectEquals: function (a, b) {
            Bridge.$$leftChain = [];
            Bridge.$$rightChain = [];

            var result = Bridge.deepEquals(a, b);

            delete Bridge.$$leftChain;
            delete Bridge.$$rightChain;

            return result;
        },

        deepEquals: function (a, b) {
            if (typeof a === "object" && typeof b === "object") {
                if (Bridge.$$leftChain.indexOf(a) > -1 || Bridge.$$rightChain.indexOf(b) > -1) {
                    return false;
                }

                var p;

                for (p in b) {
                    if (b.hasOwnProperty(p) !== a.hasOwnProperty(p)) {
                        return false;
                    } else if (typeof b[p] !== typeof a[p]) {
                        return false;
                    }
                }

                for (p in a) {
                    if (b.hasOwnProperty(p) !== a.hasOwnProperty(p)) {
                        return false;
                    } else if (typeof a[p] !== typeof b[p]) {
                        return false;
                    }

                    if (typeof (a[p]) === "object") {
                        Bridge.$$leftChain.push(a);
                        Bridge.$$rightChain.push(b);

                        if (!Bridge.deepEquals(a[p], b[p])) {
                            return false;
                        }

                        Bridge.$$leftChain.pop();
                        Bridge.$$rightChain.pop();
                    } else {
                        if (!Bridge.equals(a[p], b[p])) {
                            return false;
                        }
                    }
                }

                return true;
            } else {
                return Bridge.equals(a, b);
            }
        },

        compare: function (a, b, safe) {
            if (!Bridge.isDefined(a, true)) {
                if (safe) {
                    return 0;
                }

                throw new Bridge.NullReferenceException();
            } else if (Bridge.isNumber(a) || Bridge.isString(a) || Bridge.isBoolean(a)) {
                if (Bridge.isString(a) && !Bridge.hasValue(b)) {
                    return 1;
                }
                return a < b ? -1 : (a > b ? 1 : 0);
            } else if (Bridge.isDate(a)) {
                return Bridge.compare(a.valueOf(), b.valueOf());
            }

            if (Bridge.isFunction(a.compareTo)) {
                return a.compareTo(b);
            }

            if (Bridge.isFunction(b.compareTo)) {
                return -b.compareTo(a);
            }

            if (safe) {
                return 0;
            }

            throw new Bridge.Exception("Cannot compare items");
        },

        equalsT: function (a, b) {
            if (!Bridge.isDefined(a, true)) {
                throw new Bridge.NullReferenceException();
            } else if (Bridge.isNumber(a) || Bridge.isString(a) || Bridge.isBoolean(a)) {
                return a === b;
            } else if (Bridge.isDate(a)) {
                return a.valueOf() === b.valueOf();
            }

            return a.equalsT ? a.equalsT(b) : b.equalsT(a);
        },

        format: function (obj, formatString) {
            if (Bridge.isNumber(obj)) {
                return Bridge.Int.format(obj, formatString);
            } else if (Bridge.isDate(obj)) {
                return Bridge.Date.format(obj, formatString);
            }

            return obj.format(formatString);
        },

        getType: function (instance) {
            if (!Bridge.isDefined(instance, true)) {
                throw new Bridge.NullReferenceException("instance is null");
            }

            if (typeof(instance) === "number") {
                if (Math.floor(instance, 0) === instance) {
                    return Bridge.Int32;
                } else {
                    return Bridge.Double;
                }
            }

            try {
                return instance.constructor;
            } catch (ex) {
                return Object;
            }
        },

        isLower: function isLower(c) {
            var s = String.fromCharCode(c);

            return s === s.toLowerCase() && s !== s.toUpperCase();
        },

        isUpper: function isUpper(c) {
            var s = String.fromCharCode(c);

            return s !== s.toLowerCase() && s === s.toUpperCase();
        },

        coalesce: function (a, b) {
            return Bridge.hasValue(a) ? a : b;
        },

        fn: {
            call: function (obj, fnName) {
                var args = Array.prototype.slice.call(arguments, 2);

                obj = obj || Bridge.global;

                return obj[fnName].apply(obj, args);
            },

            makeFn: function (fn, length) {
                switch (length) {
                    case 0  : return function () { return fn.apply(this, arguments); };
                    case 1  : return function (a) { return fn.apply(this, arguments); };
                    case 2  : return function (a,b) { return fn.apply(this, arguments); };
                    case 3  : return function (a,b,c) { return fn.apply(this, arguments); };
                    case 4  : return function (a,b,c,d) { return fn.apply(this, arguments); };
                    case 5  : return function (a,b,c,d,e) { return fn.apply(this, arguments); };
                    case 6  : return function (a,b,c,d,e,f) { return fn.apply(this, arguments); };
                    case 7  : return function (a,b,c,d,e,f,g) { return fn.apply(this, arguments); };
                    case 8  : return function (a,b,c,d,e,f,g,h) { return fn.apply(this, arguments); };
                    case 9  : return function (a, b, c, d, e, f, g, h, i) { return fn.apply(this, arguments); };
                    case 10:  return function (a, b, c, d, e, f, g, h, i, j) { return fn.apply(this, arguments); };
                    case 11:  return function (a, b, c, d, e, f, g, h, i, j, k) { return fn.apply(this, arguments); };
                    case 12:  return function (a, b, c, d, e, f, g, h, i, j, k, l) { return fn.apply(this, arguments); };
                    case 13:  return function (a, b, c, d, e, f, g, h, i, j, k, l, m) { return fn.apply(this, arguments); };
                    case 14:  return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) { return fn.apply(this, arguments); };
                    case 15:  return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) { return fn.apply(this, arguments); };
                    case 16:  return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) { return fn.apply(this, arguments); };
                    case 17:  return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) { return fn.apply(this, arguments); };
                    case 18:  return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) { return fn.apply(this, arguments); };
                    case 19:  return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) { return fn.apply(this, arguments); };
                    default:  return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) { return fn.apply(this, arguments); };
                }
            },

            bind: function (obj, method, args, appendArgs) {
                if (method && method.$method === method && method.$scope === obj) {
                    return method;
                }

                var fn;

                if (arguments.length === 2) {
                    fn = Bridge.fn.makeFn(function () {
                        Bridge.caller.unshift(this);
                        var result = method.apply(obj, arguments);
                        Bridge.caller.shift(this);

                        return result;
                    }, method.length);
                } else {
                    fn = Bridge.fn.makeFn(function () {
                        var callArgs = args || arguments;

                        if (appendArgs === true) {
                            callArgs = Array.prototype.slice.call(arguments, 0);
                            callArgs = callArgs.concat(args);
                        } else if (typeof appendArgs === "number") {
                            callArgs = Array.prototype.slice.call(arguments, 0);

                            if (appendArgs === 0) {
                                callArgs.unshift.apply(callArgs, args);
                            } else if (appendArgs < callArgs.length) {
                                callArgs.splice.apply(callArgs, [appendArgs, 0].concat(args));
                            } else {
                                callArgs.push.apply(callArgs, args);
                            }
                        }
                        Bridge.caller.unshift(this);
                        var result = method.apply(obj, callArgs);
                        Bridge.caller.shift(this);

                        return result;
                    }, method.length);
                }

                fn.$method = method;
                fn.$scope = obj;

                return fn;
            },

            bindScope: function (obj, method) {
                var fn = Bridge.fn.makeFn(function () {
                    var callArgs = Array.prototype.slice.call(arguments, 0);

                    callArgs.unshift.apply(callArgs, [obj]);

                    Bridge.caller.unshift(this);
                    var result = method.apply(obj, callArgs);
                    Bridge.caller.shift(this);

                    return result;
                }, method.length);

                fn.$method = method;
                fn.$scope = obj;

                return fn;
            },

            $build: function (handlers) {
                var fn = function () {
                    var list = fn.$invocationList,
                        result = null,
                        i,
                        handler;

                    for (i = 0; i < list.length; i++) {
                        handler = list[i];
                        result = handler.apply(null, arguments);
                    }

                    return result;
                };

                fn.$invocationList = handlers ? Array.prototype.slice.call(handlers, 0) : [];

                if (fn.$invocationList.length === 0) {
                    return null;
                }

                return fn;
            },

            combine: function (fn1, fn2) {
                if (!fn1 || !fn2) {
                    return fn1 || fn2;
                }

                var list1 = fn1.$invocationList ? fn1.$invocationList : [fn1],
                    list2 = fn2.$invocationList ? fn2.$invocationList : [fn2];

                return Bridge.fn.$build(list1.concat(list2));
            },

            remove: function (fn1, fn2) {
                if (!fn1 || !fn2) {
                    return fn1 || null;
                }

                var list1 = fn1.$invocationList ? fn1.$invocationList : [fn1],
                    list2 = fn2.$invocationList ? fn2.$invocationList : [fn2],
                    result = [],
                    exclude,
                    i, j;

                for (i = list1.length - 1; i >= 0; i--) {
                    exclude = false;

                    for (j = 0; j < list2.length; j++) {
                        if (list1[i] === list2[j] ||
                            ((list1[i].$method && (list1[i].$method === list2[j].$method)) && (list1[i].$scope && (list1[i].$scope === list2[j].$scope)))) {
                            exclude = true;

                            break;
                        }
                    }

                    if (!exclude) {
                        result.push(list1[i]);
                    }
                }

                result.reverse();

                return Bridge.fn.$build(result);
            }
        },

        sleep: function (ms, timeout) {
            if (Bridge.hasValue(timeout)) {
                ms = timeout.getTotalMilliseconds();
            }

            if (isNaN(ms) || ms < -1 || ms > 2147483647) {
                throw new Bridge.ArgumentOutOfRangeException("timeout", "Number must be either non-negative and less than or equal to Int32.MaxValue or -1");
            }

            if (ms == -1) {
                ms = 2147483647;
            }

            var start = new Date().getTime();

            while ((new Date().getTime() - start) < ms) {
                if ((new Date().getTime() - start) > 2147483647) {
                    break;
                }
            }
        }
    };

    globals.Bridge = core;
    globals.Bridge.caller = [];

    // @source Nullable.js

    var nullable = {
        hasValue: function (obj) {
            return (obj !== null) && (obj !== undefined);
        },

        getValue: function (obj) {
            if (!Bridge.Nullable.hasValue(obj)) {
                throw new Bridge.InvalidOperationException("Nullable instance doesn't have a value.");
            }

            return obj;
        },

        getValueOrDefault: function (obj, defValue) {
            return Bridge.Nullable.hasValue(obj) ? obj : defValue;
        },

        add: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? a + b : null;
        },

        band: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? a & b : null;
        },

        bor: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? a | b : null;
        },

        and: function (a, b) {
            if (a === true && b === true) {
                return true;
            } else if (a === false || b === false) {
                return false;
            }

            return null;
        },

        or: function (a, b) {
            if (a === true || b === true) {
                return true;
            } else if (a === false && b === false) {
                return false;
            }

            return null;
        },

        div: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? a / b : null;
        },

        eq: function (a, b) {
            return !Bridge.hasValue(a) ? !Bridge.hasValue(b) : (a === b);
        },

        equals: function (a, b, fn) {
            return !Bridge.hasValue(a) ? !Bridge.hasValue(b) : (fn ? fn(a, b) : Bridge.equals(a, b));
        },

        toString: function (a, fn) {
            return !Bridge.hasValue(a) ? "" : (fn ? fn(a) : a.toString());
        },

        getHashCode: function (a, fn) {
            return !Bridge.hasValue(a) ? 0 : (fn ? fn(a) : Bridge.getHashCode(a));
        },

        xor: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? a ^ b : null;
        },

        gt: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) && a > b;
        },

        gte: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) && a >= b;
        },

        neq: function (a, b) {
            return !Bridge.hasValue(a) ? Bridge.hasValue(b) : (a !== b);
        },

        lt: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) && a < b;
        },

        lte: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) && a <= b;
        },

        mod: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? a % b : null;
        },

        mul: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? a * b : null;
        },

        sl: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? a << b : null;
        },

        sr: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? a >> b : null;
        },

        srr: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? a >>> b : null;
        },

        sub: function (a, b) {
	        return Bridge.hasValue(a) && Bridge.hasValue(b) ? a - b : null;
        },

        bnot: function (a) {
            return Bridge.hasValue(a) ? ~a : null;
        },

        neg: function (a) {
            return Bridge.hasValue(a) ? -a : null;
        },

        not: function (a) {
	        return Bridge.hasValue(a) ? !a : null;
        },

        pos: function (a) {
	        return Bridge.hasValue(a) ? +a : null;
        },

        lift: function () {
	        for (var i = 1; i < arguments.length; i++) {
	            if (!Bridge.hasValue(arguments[i])) {
	                return null;
	            }
	        }

	        if (arguments[0] == null) {
	            return null;
	        }

	        if (arguments[0].apply == undefined) {
	            return arguments[0];
	        }

	        return arguments[0].apply(null, Array.prototype.slice.call(arguments, 1));
        },

        lift1: function (f, o) {
            return Bridge.hasValue(o) ? (typeof f === "function" ? f.apply(null, Array.prototype.slice.call(arguments, 1)) : o[f].apply(o, Array.prototype.slice.call(arguments, 2))) : null;
        },

        lift2: function (f, a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? (typeof f === "function" ? f.apply(null, Array.prototype.slice.call(arguments, 1)) : a[f].apply(a, Array.prototype.slice.call(arguments, 2))) : null;
        },

        liftcmp: function (f, a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? (typeof f === "function" ? f.apply(null, Array.prototype.slice.call(arguments, 1)) : a[f].apply(a, Array.prototype.slice.call(arguments, 2))) : false;
        },

        lifteq: function (f, a, b) {
            var va = Bridge.hasValue(a), vb = Bridge.hasValue(b);

            return (!va && !vb) || (va && vb && (typeof f === "function" ? f.apply(null, Array.prototype.slice.call(arguments, 1)) : a[f].apply(a, Array.prototype.slice.call(arguments, 2))));
        },

        liftne: function (f, a, b) {
            var va = Bridge.hasValue(a), vb = Bridge.hasValue(b);

            return (va !== vb) || (va && (typeof f === "function" ? f.apply(null, Array.prototype.slice.call(arguments, 1)) : a[f].apply(a, Array.prototype.slice.call(arguments, 2))));
        }
    };

    Bridge.Nullable = nullable;
    Bridge.hasValue = Bridge.Nullable.hasValue;

    // @source String.js

    var string = {
        is: function (obj, type) {
            if (!Bridge.isString(obj)) {
                return false;
            }

            if ((obj.constructor === type) || (obj instanceof type)) {
                return true;
            }

            if (type === Bridge.IEnumerable ||
                type.$$name && Bridge.String.startsWith(type.$$name, "Bridge.IEnumerable$1") ||
                type.$$name && Bridge.String.startsWith(type.$$name, "Bridge.IComparable$1") ||
                type.$$name && Bridge.String.startsWith(type.$$name, "Bridge.IEquatable$1")) {
                return true;
            }

            return false;
        },

        lastIndexOf: function (s, search, startIndex, count) {
            var index = s.lastIndexOf(search, startIndex);
            return (index < (startIndex - count + 1)) ? -1 : index;
        },

        lastIndexOfAny: function (s, chars, startIndex, count) {
            var length = s.length;

            if (!length) {
                return -1;
            }

            chars = String.fromCharCode.apply(null, chars);
            startIndex = startIndex || length - 1;
            count = count || length;

            var endIndex = startIndex - count + 1;

            if (endIndex < 0) {
                endIndex = 0;
            }

            for (var i = startIndex; i >= endIndex; i--) {
                if (chars.indexOf(s.charAt(i)) >= 0) {
                    return i;
                }
            }

            return -1;
        },

        isNullOrWhiteSpace: function (value) {
            //do not replace == to ===, it ichecks to undefined also
            return value == null || value.match(/^ *$/) !== null;
        },

        isNullOrEmpty: function (value) {
            return Bridge.isEmpty(value, false);
        },

        fromCharCount: function (c, count) {
            if (count >= 0) {
                return String(Array(count + 1).join(String.fromCharCode(c)));
            } else {
                throw new Bridge.ArgumentOutOfRangeException("count", "cannot be less than zero");
            }
        },

        format: function (format) {
            var me = this,
                _formatRe = /(\{+)((\d+|[a-zA-Z_$]\w+(?:\.[a-zA-Z_$]\w+|\[\d+\])*)(?:\,(-?\d*))?(?:\:([^\}]*))?)(\}+)|(\{+)|(\}+)/g,
                args = Array.prototype.slice.call(arguments, 1),
                fn = this.decodeBraceSequence;

            return format.replace(_formatRe, function (m, openBrace, elementContent, index, align, format, closeBrace, repeatOpenBrace, repeatCloseBrace) {
                if (repeatOpenBrace) {
                    return fn(repeatOpenBrace);
                }

                if (repeatCloseBrace) {
                    return fn(repeatCloseBrace);
                }

                if (openBrace.length % 2 === 0 || closeBrace.length % 2 === 0) {
                    return fn(openBrace) + elementContent + fn(closeBrace);
                }

                return fn(openBrace, true) + me.handleElement(index, align, format, args) + fn(closeBrace, true);
            });
        },

        handleElement: function (index, alignment, formatStr, args) {
            var value;

            index = parseInt(index, 10);

            if (index > args.length - 1) {
                throw new Bridge.FormatException("Input string was not in a correct format.");
            }

            value = args[index];

            if (value == null) {
                value = "";
            }

            if (formatStr && Bridge.is(value, Bridge.IFormattable)) {
                value = Bridge.format(value, formatStr);
            } else {
                value = "" + value;
            }

            if (alignment) {
                alignment = parseInt(alignment, 10);

                if (!Bridge.isNumber(alignment)) {
                    alignment = null;
                }
            }

            return Bridge.String.alignString(value.toString(), alignment);
        },

        decodeBraceSequence: function (braces, remove) {
            return braces.substr(0, (braces.length + (remove ? 0 : 1)) / 2);
        },

        alignString: function (str, alignment, pad, dir) {
            if (!alignment) {
                return str;
            }

            if (!pad) {
                pad = " ";
            }

            if (Bridge.isNumber(pad)) {
                pad = String.fromCharCode(pad);
            }

            if (!dir) {
                dir = alignment < 0 ? 1 : 2;
            }

            alignment = Math.abs(alignment);

            if (alignment + 1 >= str.length) {
                switch (dir) {
                    case 2:
                        str = Array(alignment + 1 - str.length).join(pad) + str;
                        break;

                    case 3:
                        var padlen = alignment - str.length,
                            right = Math.ceil(padlen / 2),
                            left = padlen - right;

                        str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
                        break;

                    case 1:
                    default:
                        str = str + Array(alignment + 1 - str.length).join(pad);
                        break;
                }
            }

            return str;
        },

        startsWith: function (str, prefix) {
            if (!prefix.length) {
                return true;
            }

            if (prefix.length > str.length) {
                return false;
            }

            prefix = Bridge.String.escape(prefix);

            return str.match("^" + prefix) !== null;
        },

        endsWith: function (str, suffix) {
            if (!suffix.length) {
                return true;
            }

            if (suffix.length > str.length) {
                return false;
            }

            suffix = Bridge.String.escape(suffix);

            return str.match(suffix + "$") !== null;
        },

        contains: function (str, value) {
            if (value == null) {
                throw new Bridge.ArgumentNullException();
            }

            if (str == null) {
                return false;
            }

            return str.indexOf(value) > -1;
        },

        indexOfAny: function (str, anyOf) {
            if (anyOf == null) {
                throw new Bridge.ArgumentNullException();
            }

            if (str == null || str === "") {
                return -1;
            }

            var startIndex = (arguments.length > 2) ? arguments[2] : 0;

            if (startIndex < 0) {
                throw new Bridge.ArgumentOutOfRangeException("startIndex", "startIndex cannot be less than zero");
            }

            var length = (arguments.length > 3) ? arguments[3] : str.length - startIndex;

            if (length < 0) {
                throw new Bridge.ArgumentOutOfRangeException("length", "must be non-negative");
            }

            if (length > str.length - startIndex) {
                throw new Bridge.ArgumentOutOfRangeException("Index and length must refer to a location within the string");
            }

            var s = str.substr(startIndex, length);

            for (var i = 0; i < anyOf.length; i++) {
                var c = String.fromCharCode(anyOf[i]);
                var index = s.indexOf(c);

                if (index > -1) {
                    return index + startIndex;
                }
            }

            return -1;
        },

        indexOf: function (str, value) {
            if (value == null) {
                throw new Bridge.ArgumentNullException();
            }

            if (str == null || str === "") {
                return -1;
            }

            var startIndex = (arguments.length > 2) ? arguments[2] : 0;

            if (startIndex < 0 || startIndex > str.length) {
                throw new Bridge.ArgumentOutOfRangeException("startIndex", "startIndex cannot be less than zero and must refer to a location within the string");
            }

            if (value === "") {
                return (arguments.length > 2) ? startIndex : 0;
            }

            var length = (arguments.length > 3) ? arguments[3] : str.length - startIndex;

            if (length < 0) {
                throw new Bridge.ArgumentOutOfRangeException("length", "must be non-negative");
            }

            if (length > str.length - startIndex) {
                throw new Bridge.ArgumentOutOfRangeException("Index and length must refer to a location within the string");
            }

            var s = str.substr(startIndex, length);
            var index = (arguments.length === 5 && arguments[4] % 2 !== 0) ? s.toLocaleUpperCase().indexOf(value.toLocaleUpperCase()) : s.indexOf(value);

            if (index > -1) {
                if (arguments.length === 5) {
                    // StringComparison
                    return (Bridge.String.compare(value, s.substr(index, value.length), arguments[4]) === 0) ? index + startIndex : -1;
                } else {
                    return index + startIndex;
                }
            }

            return -1;
        },

        equals: function () {
            return Bridge.String.compare.apply(this, arguments) === 0;
        },

        compare: function (strA, strB) {
            if (strA == null) {
                return (strB == null) ? 0 : -1;
            }

            if (strB == null) {
                return 1;
            }

            if (arguments.length >= 3) {
                if (!Bridge.isBoolean(arguments[2])) {
                    // StringComparison
                    switch (arguments[2]) {
                        case 1: // CurrentCultureIgnoreCase
                            return strA.localeCompare(strB, Bridge.CultureInfo.getCurrentCulture().name, { sensitivity: "accent" });
                        case 2: // InvariantCulture
                            return strA.localeCompare(strB, Bridge.CultureInfo.invariantCulture.name);
                        case 3: // InvariantCultureIgnoreCase
                            return strA.localeCompare(strB, Bridge.CultureInfo.invariantCulture.name, { sensitivity: "accent" });
                        case 4: // Ordinal
                            return (strA === strB) ? 0 : ((strA > strB) ? 1 : -1);
                        case 5: // OrdinalIgnoreCase
                            return (strA.toUpperCase() === strB.toUpperCase()) ? 0 : ((strA.toUpperCase() > strB.toUpperCase()) ? 1 : -1);
                        case 0: // CurrentCulture
                        default:
                            break;
                    }
                } else {
                    // ignoreCase
                    if (arguments[2]) {
                        strA = strA.toLocaleUpperCase();
                        strB = strB.toLocaleUpperCase();
                    }

                    if (arguments.length === 4) {
                        // CultureInfo
                        return strA.localeCompare(strB, arguments[3].name);
                    }
                }
            }

            return strA.localeCompare(strB);
        },

        toCharArray: function (str, startIndex, length) {
            if (startIndex < 0 || startIndex > str.length || startIndex > str.length - length) {
                throw new Bridge.ArgumentOutOfRangeException("startIndex", "startIndex cannot be less than zero and must refer to a location within the string");
            }

            if (length < 0) {
                throw new Bridge.ArgumentOutOfRangeException("length", "must be non-negative");
            }

            if (!Bridge.hasValue(startIndex)) {
                startIndex = 0;
            }

            if (!Bridge.hasValue(length)) {
                length = str.length;
            }

            var arr = [];

            for (var i = startIndex; i < startIndex + length; i++) {
                arr.push(str.charCodeAt(i));
            }

            return arr;
        },

        escape: function (str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },

        replaceAll: function (str, a, b) {
            var reg = new RegExp(Bridge.String.escape(a), "g");

            return str.replace(reg, b);
        },

        insert: function (index, strA, strB) {
            return index > 0 ? (strA.substring(0, index) + strB + strA.substring(index, strA.length)) : (strB + strA);
        },

        remove: function (s, index, count) {
            if (!count || ((index + count) > this.length)) {
                return s.substr(0, index);
            }

            return s.substr(0, index) + s.substr(index + count);
        },

        split: function (s, strings, limit, options) {
            var re = (!Bridge.hasValue(strings) || strings.length === 0) ? new RegExp("\\s", "g") : new RegExp(strings.map(Bridge.String.escape).join('|'), 'g'),
                res = [],
                m,
                i;

            for (i = 0;; i = re.lastIndex) {
                if (m = re.exec(s)) {
                    if (options !== 1 || m.index > i) {
                        if (res.length === limit - 1) {
                            res.push(s.substr(i));
                            return res;
                        } else {
                            res.push(s.substring(i, m.index));
                        }
                    }
                } else {
                    if (options !== 1 || i !== s.length) {
                        res.push(s.substr(i));
                    }

                    return res;
                }
            }
        },

        trimEnd: function (s, chars) {
            return s.replace(chars ? new RegExp('[' + Bridge.String.escape(String.fromCharCode.apply(null, chars)) + ']+$') : /\s*$/, '');
        },

        trimStart: function (s, chars) {
            return s.replace(chars ? new RegExp('^[' + Bridge.String.escape(String.fromCharCode.apply(null, chars)) + ']+') : /^\s*/, '');
        },

        trim: function (s, chars) {
            return Bridge.String.trimStart(Bridge.String.trimEnd(s, chars), chars);
        }
    };

    Bridge.String = string;

    // @source Enum.js

    var enumMethods = {
        nameEquals: function (n1, n2, ignoreCase) {
            if (ignoreCase) {
                return n1.toLowerCase() === n2.toLowerCase();
            }

            return (n1.charAt(0).toLowerCase() + n1.slice(1)) === (n2.charAt(0).toLowerCase() + n2.slice(1));
        },

        checkEnumType: function (enumType) {
            if (!enumType) {
                throw new Bridge.ArgumentNullException("enumType");
            }

            if (enumType.prototype && !enumType.prototype.$enum) {
                throw new Bridge.ArgumentException("", "enumType");
            }
        },

        toName: function (name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },

        parse: function (enumType, s, ignoreCase, silent) {
            var values = enumType;

            Bridge.Enum.checkEnumType(enumType);

            if (!enumType.prototype || !enumType.prototype.$flags) {
                for (var f in values) {
                    if (enumMethods.nameEquals(f, s, ignoreCase)) {
                        return values[f];
                    }
                }
            } else {
                var parts = s.split(',');
                var value = 0;
                var parsed = true;

                for (var i = parts.length - 1; i >= 0; i--) {
                    var part = parts[i].trim();
                    var found = false;

                    for (var f in values) {
                        if (enumMethods.nameEquals(f, part, ignoreCase)) {
                            value |= values[f];
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        parsed = false;
                        break;
                    }
                }

                if (parsed) {
                    return value;
                }
            }

            if (silent !== true) {
                throw new Bridge.ArgumentException('Invalid Enumeration Value');
            }

            return null;
        },

        toString: function (enumType, value, forceFlags) {
            Bridge.Enum.checkEnumType(enumType);

            var values = enumType;

            if (((!enumType.prototype || !enumType.prototype.$flags) && forceFlags !== true) || (value === 0)) {
                for (var i in values) {
                    if (values[i] === value) {
                        return enumMethods.toName(i);
                    }
                }

                //throw new Bridge.ArgumentException('Invalid Enumeration Value');
                return value.toString();
            } else {
                var parts = [];

                for (var i in values) {
                    if (values[i] & value) {
                        parts.push(enumMethods.toName(i));
                    }
                }

                if (!parts.length) {
                    //throw new Bridge.ArgumentException('Invalid Enumeration Value');
                    return value.toString();
                }

                return parts.join(', ');
            }
        },

        getValues: function (enumType) {
            Bridge.Enum.checkEnumType(enumType);

            var parts = [];
            var values = enumType;

            for (var i in values) {
                if (values.hasOwnProperty(i) && i.indexOf("$") < 0) {
                    parts.push(values[i]);
                }
            }

            return parts;
        },

        format: function (enumType, value, format) {
            Bridge.Enum.checkEnumType(enumType);

            var name;

            if (!Bridge.hasValue(value) && (name = "value") || !Bridge.hasValue(format) && (name = "format")) {
                throw new Bridge.ArgumentNullException(name);
            }

            switch (format) {
                case "G":
                case "g":
                    return Bridge.Enum.toString(enumType, value);
                case "x":
                case "X":
                    return value.toString(16);
                case "d":
                case "D":
                    return value.toString();
                case "f":
                case "F":
                    return Bridge.Enum.toString(enumType, value, true);
                default:
                    throw new Bridge.FormatException();
            }
        },

        getNames: function (enumType) {
            Bridge.Enum.checkEnumType(enumType);

            var parts = [];
            var values = enumType;

            for (var i in values) {
                if (values.hasOwnProperty(i) && i.indexOf("$") < 0) {
                    parts.push(enumMethods.toName(i));
                }
            }

            return parts;
        },

        getName: function (enumType, value) {
            Bridge.Enum.checkEnumType(enumType);

            var values = enumType;

            for (var i in values) {
                if (values[i] === value) {
                    return i.charAt(0).toUpperCase() + i.slice(1);
                }
            }

            return null;
        },

        hasFlag: function (value, flag) {
            return !!(value & flag);
        },

        isDefined: function (enumType, value) {
            Bridge.Enum.checkEnumType(enumType);

            var values = enumType;
            var isString = Bridge.isString(value);

            for (var i in values) {
                if (isString ? enumMethods.nameEquals(i, value, false) : values[i] === value) {
                    return true;
                }
            }

            return false;
        },

        tryParse: function (enumType, value, result, ignoreCase) {
            result.v = 0;
            result.v = enumMethods.parse(enumType, value, ignoreCase, true);

            if (result.v == null) {
                return false;
            }

            return true;
        }
    };

    Bridge.Enum = enumMethods;

    // @source Browser.js

	var check = function (regex) {
	    return regex.test(navigator.userAgent.toLowerCase());
	},

    isStrict = Bridge.global.document && Bridge.global.document.compatMode === "CSS1Compat",

    version = function (is, regex) {
        var m;

        return (is && (m = regex.exec(navigator.userAgent.toLowerCase()))) ? parseFloat(m[1]) : 0;
    },

    docMode = Bridge.global.document ? Bridge.global.document.documentMode : null,
    isOpera = check(/opera/),
    isOpera10_5 = isOpera && check(/version\/10\.5/),
    isChrome = check(/\bchrome\b/),
    isWebKit = check(/webkit/),
    isSafari = !isChrome && check(/safari/),
    isSafari2 = isSafari && check(/applewebkit\/4/),
    isSafari3 = isSafari && check(/version\/3/),
    isSafari4 = isSafari && check(/version\/4/),
    isSafari5_0 = isSafari && check(/version\/5\.0/),
    isSafari5 = isSafari && check(/version\/5/),
    isIE = !isOpera && (check(/msie/) || check(/trident/)),
    isIE7 = isIE && ((check(/msie 7/) && docMode !== 8 && docMode !== 9 && docMode !== 10) || docMode === 7),
    isIE8 = isIE && ((check(/msie 8/) && docMode !== 7 && docMode !== 9 && docMode !== 10) || docMode === 8),
    isIE9 = isIE && ((check(/msie 9/) && docMode !== 7 && docMode !== 8 && docMode !== 10) || docMode === 9),
    isIE10 = isIE && ((check(/msie 10/) && docMode !== 7 && docMode !== 8 && docMode !== 9) || docMode === 10),
    isIE11 = isIE && ((check(/trident\/7\.0/) && docMode !== 7 && docMode !== 8 && docMode !== 9 && docMode !== 10) || docMode === 11),
    isIE6 = isIE && check(/msie 6/),
    isGecko = !isWebKit && !isIE && check(/gecko/),
    isGecko3 = isGecko && check(/rv:1\.9/),
    isGecko4 = isGecko && check(/rv:2\.0/),
    isGecko5 = isGecko && check(/rv:5\./),
    isGecko10 = isGecko && check(/rv:10\./),
    isFF3_0 = isGecko3 && check(/rv:1\.9\.0/),
    isFF3_5 = isGecko3 && check(/rv:1\.9\.1/),
    isFF3_6 = isGecko3 && check(/rv:1\.9\.2/),
    isWindows = check(/windows|win32/),
    isMac = check(/macintosh|mac os x/),
    isLinux = check(/linux/),
    scrollbarSize = null,
    chromeVersion = version(true, /\bchrome\/(\d+\.\d+)/),
    firefoxVersion = version(true, /\bfirefox\/(\d+\.\d+)/),
    ieVersion = version(isIE, /msie (\d+\.\d+)/),
    operaVersion = version(isOpera, /version\/(\d+\.\d+)/),
    safariVersion = version(isSafari, /version\/(\d+\.\d+)/),
    webKitVersion = version(isWebKit, /webkit\/(\d+\.\d+)/),
    isSecure = Bridge.global.location ? /^https/i.test(Bridge.global.location.protocol) : false,
    isiPhone = /iPhone/i.test(navigator.platform),
    isiPod = /iPod/i.test(navigator.platform),
    isiPad = /iPad/i.test(navigator.userAgent),
    isBlackberry = /Blackberry/i.test(navigator.userAgent),
    isAndroid = /Android/i.test(navigator.userAgent),
    isDesktop = isMac || isWindows || (isLinux && !isAndroid),
    isTablet = isiPad,
    isPhone = !isDesktop && !isTablet;

	var browser = {
	    isStrict: isStrict,
	    isIEQuirks: isIE && (!isStrict && (isIE6 || isIE7 || isIE8 || isIE9)),
	    isOpera: isOpera,
	    isOpera10_5: isOpera10_5,
	    isWebKit: isWebKit,
	    isChrome: isChrome,
	    isSafari: isSafari,
	    isSafari3: isSafari3,
	    isSafari4: isSafari4,
	    isSafari5: isSafari5,
	    isSafari5_0: isSafari5_0,
	    isSafari2: isSafari2,
	    isIE: isIE,
	    isIE6: isIE6,
	    isIE7: isIE7,
	    isIE7m: isIE6 || isIE7,
	    isIE7p: isIE && !isIE6,
	    isIE8: isIE8,
	    isIE8m: isIE6 || isIE7 || isIE8,
	    isIE8p: isIE && !(isIE6 || isIE7),
	    isIE9: isIE9,
	    isIE9m: isIE6 || isIE7 || isIE8 || isIE9,
	    isIE9p: isIE && !(isIE6 || isIE7 || isIE8),
	    isIE10: isIE10,
	    isIE10m: isIE6 || isIE7 || isIE8 || isIE9 || isIE10,
	    isIE10p: isIE && !(isIE6 || isIE7 || isIE8 || isIE9),
	    isIE11: isIE11,
	    isIE11m: isIE6 || isIE7 || isIE8 || isIE9 || isIE10 || isIE11,
	    isIE11p: isIE && !(isIE6 || isIE7 || isIE8 || isIE9 || isIE10),
	    isGecko: isGecko,
	    isGecko3: isGecko3,
	    isGecko4: isGecko4,
	    isGecko5: isGecko5,
	    isGecko10: isGecko10,
	    isFF3_0: isFF3_0,
	    isFF3_5: isFF3_5,
	    isFF3_6: isFF3_6,
	    isFF4: 4 <= firefoxVersion && firefoxVersion < 5,
	    isFF5: 5 <= firefoxVersion && firefoxVersion < 6,
	    isFF10: 10 <= firefoxVersion && firefoxVersion < 11,
	    isLinux: isLinux,
	    isWindows: isWindows,
	    isMac: isMac,
	    chromeVersion: chromeVersion,
	    firefoxVersion: firefoxVersion,
	    ieVersion: ieVersion,
	    operaVersion: operaVersion,
	    safariVersion: safariVersion,
	    webKitVersion: webKitVersion,
	    isSecure: isSecure,
	    isiPhone: isiPhone,
	    isiPod: isiPod,
	    isiPad: isiPad,
	    isBlackberry: isBlackberry,
	    isAndroid: isAndroid,
	    isDesktop: isDesktop,
	    isTablet: isTablet,
	    isPhone: isPhone,
	    iOS: isiPhone || isiPad || isiPod,
	    standalone: Bridge.global.navigator ? !!Bridge.global.navigator.standalone : false
	};

	Bridge.Browser = browser;

    // @source Class.js

    var initializing = false;

    // The base Class implementation
    var base = {
        cache: { },

        initCtor: function () {
            var value = arguments[0];

            if (this.$multipleCtors && arguments.length > 0 && typeof value == "string") {
                value = value === "constructor" ? "$constructor" : value;

                if ((value === "$constructor" || Bridge.String.startsWith(value, "constructor$")) && Bridge.isFunction(this[value])) {
                    this[value].apply(this, Array.prototype.slice.call(arguments, 1));

                    return;
                }
            }

            if (this.$constructor) {
                this.$constructor.apply(this, arguments);
            }
        },

        initConfig: function (extend, base, cfg, statics, scope) {
            var initFn,
                isFn = Bridge.isFunction(cfg),
                fn = function () {
                    var name,
                        config;

                    config = Bridge.isFunction(cfg) ? cfg() : cfg;

                    if (config.fields) {
                        for (name in config.fields) {
                            this[name] = config.fields[name];
                        }
                    }

                    if (config.properties) {
                        for (name in config.properties) {
                            Bridge.property(this, name, config.properties[name]);
                        }
                    }

                    if (config.events) {
                        for (name in config.events) {
                            Bridge.event(this, name, config.events[name]);
                        }
                    }

                    if (config.alias) {
                        for (name in config.alias) {
                            if (this[name]) {
                                this[name] = this[config.alias[name]];
                            }
                        }
                    }

                    if (config.init) {
                        initFn = config.init;
                    }
                };

            if (!isFn) {
                fn.apply(scope);
            }

            scope.$initMembers = function () {
                if (extend && !statics && base.$initMembers) {
                    base.$initMembers.apply(this, arguments);
                }

                if (isFn) {
                    fn.apply(this);
                }

                if (initFn) {
                    initFn.apply(this, arguments);
                }
            };
        },

        // Create a new Class that inherits from this class
        define: function (className, gscope, prop) {
            var preventClear = false;

            if (prop === true) {
                preventClear = true;
                prop = gscope;
                gscope = Bridge.global;
            } else if (!prop) {
                prop = gscope;
                gscope = Bridge.global;
            }

            var fn;

            if (Bridge.isFunction(prop)) {
                fn = function () {
                    var args = Array.prototype.slice.call(arguments),
                        name,
                        obj,
                        c;

                    args.unshift(className);
                    name = Bridge.Class.genericName.apply(null, args);
                    c = Bridge.Class.cache[name];

                    if (c) {
                        return c;
                    }

                    obj = prop.apply(null, args.slice(1));
                    obj.$cacheName = name;
                    c = Bridge.define(name, obj, true);

                    return Bridge.get(c);
                };

                return Bridge.Class.generic(className, gscope, fn);
            }

            if (!preventClear) {
                Bridge.Class.staticInitAllow = false;
            }
            
            prop = prop || {};

            var extend = prop.$inherits || prop.inherits,
                statics = prop.$statics || prop.statics,
                base,
                cacheName = prop.$cacheName,
                prototype,
                scope = prop.$scope || Bridge.global,
                i,
                v,
                ctorCounter,
                isCtor,
                ctorName,
                name;

            if (prop.$inherits) {
                delete prop.$inherits;
            } else {
                delete prop.inherits;
            }

            if (Bridge.isFunction(statics)) {
                statics = null;
            } else if (prop.$statics) {
                delete prop.$statics;
            } else {
                delete prop.statics;
            }

            if (prop.$cacheName) {
                delete prop.$cacheName;
            }

            // The dummy class constructor
            function Class() {
                if (!(this instanceof Class)) {
                    var args = Array.prototype.slice.call(arguments, 0),
                        object = Object.create(Class.prototype),
                        result = Class.apply(object, args);

                    return typeof result === "object" ? result : object;
                }

                // All construction is actually done in the init method
                if (!initializing) {
                    if (this.$staticInit) {
                        this.$staticInit();
                    }

                    if (this.$initMembers) {
                        this.$initMembers.apply(this, arguments);
                    }

                    this.$$initCtor.apply(this, arguments);
                }
            };

            scope = Bridge.Class.set(scope, className, Class);

            if (cacheName) {
                Bridge.Class.cache[cacheName] = Class;
            }

            Class.$$name = className;

            if (extend && Bridge.isFunction(extend)) {
                extend = extend();
            }

            base = extend ? extend[0].prototype : this.prototype;

            // Instantiate a base class (but only create the instance,
            // don't run the init constructor)
            initializing = true;
            prototype = extend ? new extend[0]() : new Object();
            initializing = false;

            if (statics) {
                var staticsConfig = statics.$config || statics.config;

                if (staticsConfig && !Bridge.isFunction(staticsConfig)) {
                    Bridge.Class.initConfig(extend, base, staticsConfig, true, Class);

                    if (statics.$config) {
                        delete statics.$config;
                    } else {
                        delete statics.config;
                    }
                }
            }

            var instanceConfig = prop.$config || prop.config;

            if (instanceConfig && !Bridge.isFunction(instanceConfig)) {
                Bridge.Class.initConfig(extend, base, instanceConfig, false, prop);                

                if (prop.$config) {
                    delete prop.$config;
                } else {
                    delete prop.config;
                }
            } else {
                prop.$initMembers = extend && base.$initMembers ? function () {
                    base.$initMembers.apply(this, arguments);
                } : function () { };
            }

            prop.$$initCtor = Bridge.Class.initCtor;

            // Copy the properties over onto the new prototype
            ctorCounter = 0;

            var keys = [];

            for (name in prop) {
                keys.push(name);
            }          

            for (i = 0; i < keys.length; i++) {
                name = keys[i];

                v = prop[name];
                isCtor = name === "constructor";
                ctorName = isCtor ? "$constructor" : name;

                if (Bridge.isFunction(v) && (isCtor || Bridge.String.startsWith(name, "constructor$"))) {
                    ctorCounter++;
                    isCtor = true;
                }

                prototype[ctorName] = prop[name];

                if (isCtor) {
                    (function (ctorName) {
                        Class[ctorName] = function () {
                            var args = Array.prototype.slice.call(arguments);

                            if (this.$initMembers) {
                                this.$initMembers.apply(this, args);
                            }

                            args.unshift(ctorName);
                            this.$$initCtor.apply(this, args);
                        };
                    })(ctorName);

                    Class[ctorName].prototype = prototype;
                    Class[ctorName].prototype.constructor = Class;
                }
            }

            if (ctorCounter === 0) {
                prototype.$constructor = extend ? function () {
                    base.$constructor.apply(this, arguments);
                } : function () { };
            }

            if (ctorCounter > 1) {
                prototype.$multipleCtors = true;
            }

            prototype.$$name = className;

            // Populate our constructed prototype object
            Class.prototype = prototype;

            // Enforce the constructor to be what we expect
            Class.prototype.constructor = Class;

            if (statics) {
                for (name in statics) {
                    Class[name] = statics[name];
                }
            }

            if (!extend) {
                extend = [Object];
            }

            Class.$$inherits = extend;

            for (i = 0; i < extend.length; i++) {
                scope = extend[i];

                if (!scope.$$inheritors) {
                    scope.$$inheritors = [];
                }

                scope.$$inheritors.push(Class);
            }

            fn = function () {
                if (Bridge.Class.staticInitAllow) {
                    Class.$staticInit = null;

                    if (Class.$initMembers) {
                        Class.$initMembers.call(Class);
                    }

                    if (Class.constructor) {
                        Class.constructor.call(Class);
                    }
                }
            };

            Bridge.Class.$queue.push(Class);
            Class.$staticInit = fn;

            return Class;
        },


        addExtend: function (cls, extend) {
            var i,
                scope;

            Array.prototype.push.apply(cls.$$inherits, extend);

            for (i = 0; i < extend.length; i++) {
                scope = extend[i];

                if (!scope.$$inheritors) {
                    scope.$$inheritors = [];
                }

                scope.$$inheritors.push(cls);
            }
        },

        set: function (scope, className, cls, noDefineProp) {
            var nameParts = className.split("."),
                name,
                key,
                exists,
                i;

            for (i = 0; i < (nameParts.length - 1) ; i++) {
                if (typeof scope[nameParts[i]] == "undefined") {
                    scope[nameParts[i]] = { };
                }

                scope = scope[nameParts[i]];
            }

            name = nameParts[nameParts.length - 1];
            exists = scope[name];

            if (exists) {
                for (key in exists) {
                    var o = exists[key];

                    if (typeof o === "function" && o.$$name) {
                        (function (cls, key, o) {
							Object.defineProperty(cls, key, {
								get: function () {
									if (Bridge.Class.staticInitAllow) {
										if (o.$staticInit) {
											o.$staticInit();
										}

										Bridge.Class.defineProperty(cls, key, o);
									}

									return o;
								},
								set: function (newValue) {
									o = newValue;
								},
								enumerable: true,
								configurable: true
							});
						})(cls, key, o);
                    }
                }
            }

            if (noDefineProp !== true) {
                (function (scope, name, cls) {
                    Object.defineProperty(scope, name, {
                        get: function () {
                            if (Bridge.Class.staticInitAllow) {
                                if (cls.$staticInit) {
                                    cls.$staticInit();
                                }

                                Bridge.Class.defineProperty(scope, name, cls);
                            }
                            
                            return cls;
                        },
                        set: function (newValue) {
                            cls = newValue;
                        },
                        enumerable: true,
                        configurable: true
                    });
                })(scope, name, cls);
                
            } else {
                scope[name] = cls;
            }

            return scope;
        },

        defineProperty: function (scope, name, cls) {
            Object.defineProperty(scope, name, {
                value: cls,
                enumerable: true,
                configurable: true
            });
        },

        genericName: function () {
            var name = arguments[0];

            for (var i = 1; i < arguments.length; i++) {
                name += "$" + Bridge.getTypeName(arguments[i]);
            }

            return name;
        },

        generic: function (className, scope, fn) {
            if (!fn) {
                fn = scope;
                scope = Bridge.global;
            }

            fn.$$name = className;
            Bridge.Class.set(scope, className, fn, true);

            return fn;
        },

        init: function (fn) {
            Bridge.Class.staticInitAllow = true;

            for (var i = 0; i < Bridge.Class.$queue.length; i++) {
                var t = Bridge.Class.$queue[i];

                if (t.$staticInit) {
                    t.$staticInit();
                }
            }
            Bridge.Class.$queue.length = 0;

            if (fn) {
                fn();
            }
        }
    };

    Bridge.Class = base;
    Bridge.Class.$queue = [];
    Bridge.define = Bridge.Class.define;
    Bridge.init = Bridge.Class.init;

    // @source Interfaces.js

    Bridge.define("Bridge.IFormattable", {
        statics: {
            $is: function (obj) {
                if (Bridge.isNumber(obj)) {
                    return true;
                }

                if (Bridge.isDate(obj)) {
                    return true;
                }

                return Bridge.is(obj, Bridge.IFormattable, true);
            }
        }
    });

    Bridge.define("Bridge.IComparable");

    Bridge.define("Bridge.IFormatProvider");

    Bridge.define("Bridge.ICloneable");

    Bridge.define('Bridge.IComparable$1', function (T) { return {}; });

    Bridge.define('Bridge.IEquatable$1', function (T) { return {}; });

    Bridge.define("Bridge.IPromise");

    Bridge.define("Bridge.IDisposable");

// @source Char.js

Bridge.define("Bridge.Char", {
    inherits: [Bridge.IComparable, Bridge.IFormattable],
    statics: {
        min: 0,
        max: 65535,

        instanceOf: function (instance) {
            return typeof (instance) === "number" && Math.round(instance, 0) == instance && instance >= Bridge.Char.min && instance <= Bridge.Char.max;
        },
        getDefaultValue: function () {
            return 0;
        },
        parse: function (s) {
            if (!Bridge.hasValue(s)) {
                throw new Bridge.ArgumentNullException("s");
            }

            if (s.length !== 1) {
                throw new Bridge.FormatException();
            }
            return s.charCodeAt(0);
        },
        tryParse: function (s, result) {
            var b = s && s.length === 1;

            result.v = b ? s.charCodeAt(0) : 0;

            return b;
        },
        format: function (number, format, provider) {
            return Bridge.Int.format(number, format, provider);
        },

        charCodeAt: function (str, index) {
            if (str == null) {
                throw new Bridge.ArgumentNullException();
            }

            if (str.length != 1) {
                throw new Bridge.FormatException("String must be exactly one character long");
            }

            return str.charCodeAt(index);
        },

        isWhiteSpace: function (value) {
            return /\s/.test(value);
        },

        isDigit: function (value) {
            if (value < 256) {
                return (value >= 48 && value <= 57);
            }

            return new RegExp("[0-9\u0030-\u0039\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]").test(String.fromCharCode(value));
        },

        isLetter: function (value) {
            if (value < 256) {
                return (value >= 65 && value <= 90) || (value >= 97 && value <= 122);
            }

            return new RegExp("[A-Za-z\u0061-\u007A\u00B5\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0561-\u0587\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7FA\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A\u0041-\u005A\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA\uFF21-\uFF3A\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uAA70\uAADD\uAAF3\uAAF4\uFF70\uFF9E\uFF9F\u00AA\u00BA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]").test(String.fromCharCode(value));
        },

        isHighSurrogate: function (value) {
            return new RegExp("[\uD800-\uDBFF]").test(String.fromCharCode(value));
        },

        isLowSurrogate: function (value) {
            return new RegExp("[\uDC00-\uDFFF]").test(String.fromCharCode(value));
        },

        isSurrogate: function (value) {
            return new RegExp("[\uD800-\uDFFF]").test(String.fromCharCode(value));
        },

        isNull: function (value) {
            return new RegExp("\u0000").test(String.fromCharCode(value));
        },

        isSymbol: function (value) {
            if (value < 256) {
                return ([36, 43, 60, 61, 62, 94, 96, 124, 126, 162, 163, 164, 165, 166, 167, 168, 169, 172, 174, 175, 176, 177, 180, 182, 184, 215, 247].indexOf(value) != -1);
            }

            return new RegExp("[\u20A0-\u20CF\u20D0-\u20FF\u2100-\u214F\u2150-\u218F\u2190-\u21FF\u2200-\u22FF\u2300-\u23FF\u25A0-\u25FF\u2600-\u26FF\u2700-\u27BF\u27C0-\u27EF\u27F0-\u27FF\u2800-\u28FF\u2900-\u297F\u2980-\u29FF\u2A00-\u2AFF\u2B00-\u2BFF]").test(String.fromCharCode(value));
        },

        isSeparator: function (value) {
            if (value < 256) {
                return (value == 32 || value == 160);
            }

            return new RegExp("[\u2028\u2029\u0020\u00A0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]").test(String.fromCharCode(value));
        },

        isPunctuation: function (value) {
            if (value < 256) {
                return ([33, 34, 35, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 58, 59, 63, 64, 91, 92, 93, 95, 123, 125, 161, 171, 173, 183, 187, 191].indexOf(value) != -1);
            }

            return new RegExp("[\u0021-\u0023\u0025-\u002A\u002C-\u002F\u003A\u003B\u003F\u0040\u005B-\u005D\u005F\u007B\u007D\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E3B\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65\u002D\u058A\u05BE\u1400\u1806\u2010-\u2015\u2E17\u2E1A\u2E3A\u2E3B\u301C\u3030\u30A0\uFE31\uFE32\uFE58\uFE63\uFF0D\u0028\u005B\u007B\u0F3A\u0F3C\u169B\u201A\u201E\u2045\u207D\u208D\u2329\u2768\u276A\u276C\u276E\u2770\u2772\u2774\u27C5\u27E6\u27E8\u27EA\u27EC\u27EE\u2983\u2985\u2987\u2989\u298B\u298D\u298F\u2991\u2993\u2995\u2997\u29D8\u29DA\u29FC\u2E22\u2E24\u2E26\u2E28\u3008\u300A\u300C\u300E\u3010\u3014\u3016\u3018\u301A\u301D\uFD3E\uFE17\uFE35\uFE37\uFE39\uFE3B\uFE3D\uFE3F\uFE41\uFE43\uFE47\uFE59\uFE5B\uFE5D\uFF08\uFF3B\uFF5B\uFF5F\uFF62\u0029\u005D\u007D\u0F3B\u0F3D\u169C\u2046\u207E\u208E\u232A\u2769\u276B\u276D\u276F\u2771\u2773\u2775\u27C6\u27E7\u27E9\u27EB\u27ED\u27EF\u2984\u2986\u2988\u298A\u298C\u298E\u2990\u2992\u2994\u2996\u2998\u29D9\u29DB\u29FD\u2E23\u2E25\u2E27\u2E29\u3009\u300B\u300D\u300F\u3011\u3015\u3017\u3019\u301B\u301E\u301F\uFD3F\uFE18\uFE36\uFE38\uFE3A\uFE3C\uFE3E\uFE40\uFE42\uFE44\uFE48\uFE5A\uFE5C\uFE5E\uFF09\uFF3D\uFF5D\uFF60\uFF63\u00AB\u2018\u201B\u201C\u201F\u2039\u2E02\u2E04\u2E09\u2E0C\u2E1C\u2E20\u00BB\u2019\u201D\u203A\u2E03\u2E05\u2E0A\u2E0D\u2E1D\u2E21\u005F\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F\u0021-\u0023\u0025-\u0027\u002A\u002C\u002E\u002F\u003A\u003B\u003F\u0040\u005C\u00A1\u00A7\u00B6\u00B7\u00BF\u037E\u0387\u055A-\u055F\u0589\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u166D\u166E\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u1805\u1807-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203B-\u203E\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205E\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00\u2E01\u2E06-\u2E08\u2E0B\u2E0E-\u2E16\u2E18\u2E19\u2E1B\u2E1E\u2E1F\u2E2A-\u2E2E\u2E30-\u2E39\u3001-\u3003\u303D\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFE10-\uFE16\uFE19\uFE30\uFE45\uFE46\uFE49-\uFE4C\uFE50-\uFE52\uFE54-\uFE57\uFE5F-\uFE61\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF07\uFF0A\uFF0C\uFF0E\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3C\uFF61\uFF64\uFF65]").test(String.fromCharCode(value));
        },

        isNumber: function (value) {
            if (value < 256) {
                return ([48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 178, 179, 185, 188, 189, 190].indexOf(value) != -1);
            }

            return new RegExp("[\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19\u0030-\u0039\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF\u00B2\u00B3\u00B9\u00BC-\u00BE\u09F4-\u09F9\u0B72-\u0B77\u0BF0-\u0BF2\u0C78-\u0C7E\u0D70-\u0D75\u0F2A-\u0F33\u1369-\u137C\u17F0-\u17F9\u19DA\u2070\u2074-\u2079\u2080-\u2089\u2150-\u215F\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA830-\uA835]").test(String.fromCharCode(value));
        },

        isControl: function (value) {
            if (value < 256) {
                return (value >= 0 && value <= 31) || (value >= 127 && value <= 159);
            }

            return new RegExp("[\u0000-\u001F\u007F\u0080-\u009F]").test(String.fromCharCode(value));
        }
    }
});

Bridge.Class.addExtend(Bridge.Char, [Bridge.IComparable$1(Bridge.Char), Bridge.IEquatable$1(Bridge.Char)]);

    // @source Exception.js

    Bridge.define("Bridge.Exception", {
        constructor: function (message, innerException) {
            this.message = message ? message : null;
            this.innerException = innerException ? innerException : null;
            this.errorStack = new Error();
            this.data = new Bridge.Dictionary$2(Object, Object)();
        },

        getMessage: function () {
            return this.message;
        },

        getInnerException: function () {
            return this.innerException;
        },

        getStackTrace: function () {
            return this.errorStack.stack;
        },

        getData: function () {
            return this.data;
        },

        toString: function () {
            return this.getMessage();
        },

        statics: {
            create: function (error) {
                if (Bridge.is(error, Bridge.Exception)) {
                    return error;
                }

                if (error instanceof TypeError) {
                    return new Bridge.NullReferenceException(error.message, new Bridge.ErrorException(error));
                } else if (error instanceof RangeError) {
                    return new Bridge.ArgumentOutOfRangeException(null, error.message, new Bridge.ErrorException(error));
                } else if (error instanceof Error) {
                    return new Bridge.ErrorException(error);
                } else {
                    return new Bridge.Exception(error ? error.toString() : null);
                }
            }
        }
    });

    Bridge.define("Bridge.SystemException", {
        inherits: [Bridge.Exception],

        constructor: function (message, innerException) {
            Bridge.Exception.prototype.$constructor.call(this, message || "System error.", innerException);
        }
    });

    Bridge.define("Bridge.OutOfMemoryException", {
        inherits: [Bridge.SystemException],

        constructor: function (message, innerException) {
            if (!message) {
                message = "Insufficient memory to continue the execution of the program.";
            }

            Bridge.SystemException.prototype.$constructor.call(this, message, innerException);
        }
    });

    Bridge.define("Bridge.IndexOutOfRangeException", {
        inherits: [Bridge.SystemException],

        constructor: function (message, innerException) {
            if (!message) {
                message = "Index was outside the bounds of the array.";
            }

            Bridge.SystemException.prototype.$constructor.call(this, message, innerException);
        }
    });

    Bridge.define("Bridge.TimeoutException", {
        inherits: [Bridge.SystemException],

        constructor: function (message, innerException) {
            if (!message) {
                message = "The operation has timed out.";
            }

            Bridge.SystemException.prototype.$constructor.call(this, message, innerException);
        }
    });

    Bridge.define("Bridge.RegexMatchTimeoutException", {
        inherits: [Bridge.TimeoutException],

        _regexInput: "",
        _regexPattern: "",
        _matchTimeout: null,
        config: {
            init: function () {
                this._matchTimeout = Bridge.TimeSpan.fromTicks(-1);
            }
        },

        constructor: function () {
            Bridge.TimeoutException.prototype.$constructor.call(this);
        },

        constructor$1: function (message) {
            Bridge.TimeoutException.prototype.$constructor.call(this, message);
        },

        constructor$2: function (message, innerException) {
            Bridge.TimeoutException.prototype.$constructor.call(this, message, innerException);
        },

        constructor$3: function (regexInput, regexPattern, matchTimeout) {
            this._regexInput = regexInput;
            this._regexPattern = regexPattern;
            this._matchTimeout = matchTimeout;

            var message = "The RegEx engine has timed out while trying to match a pattern to an input string. This can occur for many reasons, including very large inputs or excessive backtracking caused by nested quantifiers, back-references and other factors.";
            this.constructor$1(message);
        },

        getPattern: function () {
            return this._regexPattern;
        },

        getInput: function () {
            return this._regexInput;
        },

        getMatchTimeout: function () {
            return this._matchTimeout;
        }
    });

    Bridge.define("Bridge.ErrorException", {
        inherits: [Bridge.Exception],

        constructor: function (error) {
            Bridge.Exception.prototype.$constructor.call(this, error.message);
            this.errorStack = error;
            this.error = error;
        },

        getError: function () {
            return this.error;
        }
    });

    Bridge.define("Bridge.ArgumentException", {
        inherits: [Bridge.Exception],

        constructor: function (message, paramName, innerException) {
            Bridge.Exception.prototype.$constructor.call(this, message || "Value does not fall within the expected range.", innerException);
            this.paramName = paramName ? paramName : null;
        },

        getParamName: function () {
            return this.paramName;
        }
    });

    Bridge.define("Bridge.ArgumentNullException", {
        inherits: [Bridge.ArgumentException],

        constructor: function (paramName, message, innerException) {
            if (!message) {
                message = "Value cannot be null.";

                if (paramName) {
                    message += "\nParameter name: " + paramName;
                }
            }

            Bridge.ArgumentException.prototype.$constructor.call(this, message, paramName, innerException);
        }
    });

    Bridge.define("Bridge.ArgumentOutOfRangeException", {
        inherits: [Bridge.ArgumentException],

        constructor: function (paramName, message, innerException, actualValue) {
            if (!message) {
                message = "Value is out of range.";

                if (paramName) {
                    message += "\nParameter name: " + paramName;
                }
            }

            Bridge.ArgumentException.prototype.$constructor.call(this, message, paramName, innerException);

            this.actualValue = actualValue ? actualValue : null;
        },

        getActualValue: function () {
            return this.actualValue;
        }
    });

    Bridge.define("Bridge.CultureNotFoundException", {
        inherits: [Bridge.ArgumentException],

        constructor: function (paramName, invalidCultureName, message, innerException, invalidCultureId) {
            if (!message) {
                message = "Culture is not supported.";

                if (paramName) {
                    message += "\nParameter name: " + paramName;
                }

                if (invalidCultureName) {
                    message += "\n" + invalidCultureName + " is an invalid culture identifier.";
                }
            }

            Bridge.ArgumentException.prototype.$constructor.call(this, message, paramName, innerException);

            this.invalidCultureName = invalidCultureName ? invalidCultureName : null;
            this.invalidCultureId = invalidCultureId ? invalidCultureId : null;
        },

        getInvalidCultureName: function () {
            return this.invalidCultureName;
        },

        getInvalidCultureId: function () {
            return this.invalidCultureId;
        }
    });

    Bridge.define("Bridge.KeyNotFoundException", {
        inherits: [Bridge.Exception],

        constructor: function (message, innerException) {
            Bridge.Exception.prototype.$constructor.call(this, message || "Key not found.", innerException);
        }
    });

    Bridge.define("Bridge.ArithmeticException", {
        inherits: [Bridge.Exception],

        constructor: function (message, innerException) {
            Bridge.Exception.prototype.$constructor.call(this, message || "Overflow or underflow in the arithmetic operation.", innerException);
        }
    });

    Bridge.define("Bridge.DivideByZeroException", {
        inherits: [Bridge.ArithmeticException],

        constructor: function (message, innerException) {
            Bridge.ArithmeticException.prototype.$constructor.call(this, message || "Division by 0.", innerException);
        }
    });

    Bridge.define("Bridge.OverflowException", {
        inherits: [Bridge.ArithmeticException],

        constructor: function (message, innerException) {
            Bridge.ArithmeticException.prototype.$constructor.call(this, message || "Arithmetic operation resulted in an overflow.", innerException);
        }
    });

    Bridge.define("Bridge.FormatException", {
        inherits: [Bridge.Exception],

        constructor: function (message, innerException) {
            Bridge.Exception.prototype.$constructor.call(this, message || "Invalid format.", innerException);
        }
    });

    Bridge.define("Bridge.InvalidCastException", {
        inherits: [Bridge.Exception],

        constructor: function (message, innerException) {
            Bridge.Exception.prototype.$constructor.call(this, message || "The cast is not valid.", innerException);
        }
    });

    Bridge.define("Bridge.InvalidOperationException", {
        inherits: [Bridge.Exception],

        constructor: function (message, innerException) {
            Bridge.Exception.prototype.$constructor.call(this, message || "Operation is not valid due to the current state of the object.", innerException);
        }
    });

    Bridge.define("Bridge.NotImplementedException", {
        inherits: [Bridge.Exception],

        constructor: function (message, innerException) {
            Bridge.Exception.prototype.$constructor.call(this, message || "The method or operation is not implemented.", innerException);
        }
    });

    Bridge.define("Bridge.NotSupportedException", {
        inherits: [Bridge.Exception],

        constructor: function (message, innerException) {
            Bridge.Exception.prototype.$constructor.call(this, message || "Specified method is not supported.", innerException);
        }
    });

    Bridge.define("Bridge.NullReferenceException", {
        inherits: [Bridge.Exception],

        constructor: function (message, innerException) {
            Bridge.Exception.prototype.$constructor.call(this, message || "Object is null.", innerException);
        }
    });

    Bridge.define("Bridge.RankException", {
        inherits: [Bridge.Exception],

        constructor: function (message, innerException) {
            Bridge.Exception.prototype.$constructor.call(this, message || "Attempted to operate on an array with the incorrect number of dimensions.", innerException);
        }
    });

    Bridge.define("Bridge.PromiseException", {
        inherits: [Bridge.Exception],

        constructor: function (args, message, innerException) {
            Bridge.Exception.prototype.$constructor.call(this, message || (args.length && args[0] ? args[0].toString() : "An error occurred"), innerException);
            this.arguments = Bridge.Array.clone(args);
        },

        getArguments: function () {
            return this.arguments;
        }
    });

    Bridge.define("Bridge.OperationCanceledException", {
        inherits: [Bridge.Exception],

        constructor: function (message, token, innerException) {
            Bridge.Exception.prototype.$constructor.call(this, message || "Operation was canceled.", innerException);
            this.cancellationToken = token || Bridge.CancellationToken.none;
        }
    });

    Bridge.define("Bridge.TaskCanceledException", {
        inherits: [Bridge.OperationCanceledException],

        constructor: function (message, task, innerException) {
            Bridge.OperationCanceledException.prototype.$constructor.call(this, message || "A task was canceled.", null, innerException);
            this.task = task || null;
        }
    });

    Bridge.define("Bridge.AggregateException", {
        inherits: [Bridge.Exception],

        constructor: function (message, innerExceptions) {
            this.innerExceptions = new Bridge.ReadOnlyCollection$1(Bridge.Exception)(Bridge.hasValue(innerExceptions) ? Bridge.toArray(innerExceptions) : []);
            Bridge.Exception.prototype.$constructor.call(this, message || 'One or more errors occurred.', this.innerExceptions.items.length ? this.innerExceptions.items[0] : null);
        },

        handle: function (predicate) {
            if (!Bridge.hasValue(predicate)) {
                throw new Bridge.ArgumentNullException("predicate");
            }

            var count = this.innerExceptions.getCount(),
                unhandledExceptions = [];

            for (var i = 0; i < count; i++) {
                if (!predicate(this.innerExceptions.get(i))) {
                    unhandledExceptions.push(this.innerExceptions.get(i));
                }
            }

            if (unhandledExceptions.length > 0) {
                throw new Bridge.AggregateException(this.getMessage(), unhandledExceptions);
            }
        },

        flatten: function () {
            // Initialize a collection to contain the flattened exceptions.
            var flattenedExceptions = new Bridge.List$1(Bridge.Exception)();

            // Create a list to remember all aggregates to be flattened, this will be accessed like a FIFO queue
            var exceptionsToFlatten = new Bridge.List$1(Bridge.AggregateException)();
            exceptionsToFlatten.add(this);
            var nDequeueIndex = 0;

            // Continue removing and recursively flattening exceptions, until there are no more.
            while (exceptionsToFlatten.getCount() > nDequeueIndex) {
                // dequeue one from exceptionsToFlatten
                var currentInnerExceptions = exceptionsToFlatten.getItem(nDequeueIndex++).innerExceptions;

                for (var i = 0; i < currentInnerExceptions.getCount() ; i++) {
                    var currentInnerException = currentInnerExceptions.get(i);

                    if (!Bridge.hasValue(currentInnerException)) {
                        continue;
                    }

                    var currentInnerAsAggregate = Bridge.as(currentInnerException, Bridge.AggregateException);

                    // If this exception is an aggregate, keep it around for later.  Otherwise,
                    // simply add it to the list of flattened exceptions to be returned.
                    if (Bridge.hasValue(currentInnerAsAggregate)) {
                        exceptionsToFlatten.add(currentInnerAsAggregate);
                    } else {
                        flattenedExceptions.add(currentInnerException);
                    }
                }
            }

            return new Bridge.AggregateException(this.getMessage(), flattenedExceptions);
        }
    });

    Bridge.define("Bridge.IndexOutOfRangeException", {
        inherits: [Bridge.SystemException],

        constructor: function (message, innerException) {
            if (!message) {
                message = "Index was outside the bounds of the array.";
            }

            Bridge.SystemException.prototype.$constructor.call(this, message, innerException);
        }
    });

    /// <reference path="Init.js" />
    // @source Globalization.js

    Bridge.define("Bridge.DateTimeFormatInfo", {
        inherits: [Bridge.IFormatProvider, Bridge.ICloneable],

        statics: {
            $allStandardFormats: {
                "d": "shortDatePattern",
                "D": "longDatePattern",
                "f": "longDatePattern shortTimePattern",
                "F": "longDatePattern longTimePattern",
                "g": "shortDatePattern shortTimePattern",
                "G": "shortDatePattern longTimePattern",
                "m": "monthDayPattern",
                "M": "monthDayPattern",
                "o": "roundtripFormat",
                "O": "roundtripFormat",
                "r": "rfc1123",
                "R": "rfc1123",
                "s": "sortableDateTimePattern",
                "S": "sortableDateTimePattern1",
                "t": "shortTimePattern",
                "T": "longTimePattern",
                "u": "universalSortableDateTimePattern",
                "U": "longDatePattern longTimePattern",
                "y": "yearMonthPattern",
                "Y": "yearMonthPattern"
            },

            constructor: function () {
                this.invariantInfo = Bridge.merge(new Bridge.DateTimeFormatInfo(), {
                    abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    abbreviatedMonthGenitiveNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
                    abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
                    amDesignator: "AM",
                    dateSeparator: "/",
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    firstDayOfWeek: 0,
                    fullDateTimePattern: "dddd, dd MMMM yyyy HH:mm:ss",
                    longDatePattern: "dddd, dd MMMM yyyy",
                    longTimePattern: "HH:mm:ss",
                    monthDayPattern: "MMMM dd",
                    monthGenitiveNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                    pmDesignator: "PM",
                    rfc1123: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
                    shortDatePattern: "MM/dd/yyyy",
                    shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    shortTimePattern: "HH:mm",
                    sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    sortableDateTimePattern1: "yyyy'-'MM'-'dd",
                    timeSeparator: ":",
                    universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    yearMonthPattern: "yyyy MMMM",
                    roundtripFormat: "yyyy'-'MM'-'dd'T'HH':'mm':'ss.uzzz"
                });
            }
        },

        getFormat: function (type) {
            switch (type) {
                case Bridge.DateTimeFormatInfo:
                    return this;
                default:
                    return null;
            }
        },

        getAbbreviatedDayName: function (dayofweek) {
            if (dayofweek < 0 || dayofweek > 6) {
                throw new Bridge.ArgumentOutOfRangeException("dayofweek");
            }

            return this.abbreviatedDayNames[dayofweek];
        },

        getAbbreviatedMonthName: function (month) {
            if (month < 1 || month > 13) {
                throw new Bridge.ArgumentOutOfRangeException("month");
            }

            return this.abbreviatedMonthNames[month - 1];
        },

        getAllDateTimePatterns: function (format, returnNull) {
            var f = Bridge.DateTimeFormatInfo.$allStandardFormats,
                formats,
                names,
                pattern,
                i,
                result = [];

            if (format) {
                if (!f[format]) {
                    if (returnNull) {
                        return null;
                    }

                    throw new Bridge.ArgumentException(null, "format");
                }

                formats = { };
                formats[format] = f[format];
            } else {
                formats = f;
            }

            for (f in formats) {
                names = formats[f].split(" ");
                pattern = "";

                for (i = 0; i < names.length; i++) {
                    pattern = (i === 0 ? "" : (pattern + " ")) + this[names[i]];
                }

                result.push(pattern);
            }

            return result;
        },

        getDayName: function (dayofweek) {
            if (dayofweek < 0 || dayofweek > 6) {
                throw new Bridge.ArgumentOutOfRangeException("dayofweek");
            }

            return this.dayNames[dayofweek];
        },

        getMonthName: function (month) {
            if (month < 1 || month > 13) {
                throw new Bridge.ArgumentOutOfRangeException("month");
            }

            return this.monthNames[month-1];
        },

        getShortestDayName: function (dayOfWeek) {
            if (dayOfWeek < 0 || dayOfWeek > 6) {
                throw new Bridge.ArgumentOutOfRangeException("dayOfWeek");
            }

            return this.shortestDayNames[dayOfWeek];
        },

        clone: function () {
            return Bridge.copy(new Bridge.DateTimeFormatInfo(), this, [
                "abbreviatedDayNames",
                "abbreviatedMonthGenitiveNames",
                "abbreviatedMonthNames",
                "amDesignator",
                "dateSeparator",
                "dayNames",
                "firstDayOfWeek",
                "fullDateTimePattern",
                "longDatePattern",
                "longTimePattern",
                "monthDayPattern",
                "monthGenitiveNames",
                "monthNames",
                "pmDesignator",
                "rfc1123",
                "shortDatePattern",
                "shortestDayNames",
                "shortTimePattern",
                "sortableDateTimePattern",
                "timeSeparator",
                "universalSortableDateTimePattern",
                "yearMonthPattern",
                "roundtripFormat"
            ]);
        }
    });

    Bridge.define("Bridge.NumberFormatInfo", {
        inherits: [Bridge.IFormatProvider, Bridge.ICloneable],

        statics: {
            constructor: function () {
                this.numberNegativePatterns =  ["(n)", "-n", "- n", "n-", "n -"];
                this.currencyNegativePatterns = ["($n)", "-$n", "$-n", "$n-", "(n$)", "-n$", "n-$", "n$-", "-n $", "-$ n", "n $-", "$ n-", "$ -n", "n- $", "($ n)", "(n $)"];
                this.currencyPositivePatterns = ["$n", "n$", "$ n", "n $"];
                this.percentNegativePatterns = ["-n %", "-n%", "-%n", "%-n", "%n-", "n-%", "n%-", "-% n", "n %-", "% n-", "% -n", "n- %"];
                this.percentPositivePatterns = ["n %", "n%", "%n", "% n"];

                this.invariantInfo = Bridge.merge(new Bridge.NumberFormatInfo(), {
                    nanSymbol: "NaN",
                    negativeSign: "-",
                    positiveSign: "+",
                    negativeInfinitySymbol: "-Infinity",
                    positiveInfinitySymbol: "Infinity",

                    percentSymbol: "%",
                    percentGroupSizes: [3],
                    percentDecimalDigits: 2,
                    percentDecimalSeparator: ".",
                    percentGroupSeparator: ",",
                    percentPositivePattern: 0,
                    percentNegativePattern: 0,

                    currencySymbol: "¤",
                    currencyGroupSizes: [3],
                    currencyDecimalDigits: 2,
                    currencyDecimalSeparator: ".",
                    currencyGroupSeparator: ",",
                    currencyNegativePattern: 0,
                    currencyPositivePattern: 0,

                    numberGroupSizes: [3],
                    numberDecimalDigits: 2,
                    numberDecimalSeparator: ".",
                    numberGroupSeparator: ",",
                    numberNegativePattern: 1
                });
            }
        },

        getFormat: function (type) {
            switch (type) {
                case Bridge.NumberFormatInfo:
                    return this;
                default:
                    return null;
            }
        },

        clone: function () {
            return Bridge.copy(new Bridge.NumberFormatInfo(), this, [
                "nanSymbol",
                "negativeSign",
                "positiveSign",
                "negativeInfinitySymbol",
                "positiveInfinitySymbol",
                "percentSymbol",
                "percentGroupSizes",
                "percentDecimalDigits",
                "percentDecimalSeparator",
                "percentGroupSeparator",
                "percentPositivePattern",
                "percentNegativePattern",
                "currencySymbol",
                "currencyGroupSizes",
                "currencyDecimalDigits",
                "currencyDecimalSeparator",
                "currencyGroupSeparator",
                "currencyNegativePattern",
                "currencyPositivePattern",
                "numberGroupSizes",
                "numberDecimalDigits",
                "numberDecimalSeparator",
                "numberGroupSeparator",
                "numberNegativePattern"
            ]);
        }
    });

    Bridge.define("Bridge.CultureInfo", {
        inherits: [Bridge.IFormatProvider, Bridge.ICloneable],

        statics: {
            constructor: function () {
                this.cultures = this.cultures || {};

                this.invariantCulture = Bridge.merge(new Bridge.CultureInfo("iv", true), {
                    englishName: "Invariant Language (Invariant Country)",
                    nativeName: "Invariant Language (Invariant Country)",
                    numberFormat: Bridge.NumberFormatInfo.invariantInfo,
                    dateTimeFormat: Bridge.DateTimeFormatInfo.invariantInfo
                });

                this.setCurrentCulture(Bridge.CultureInfo.invariantCulture);
            },

            getCurrentCulture: function () {
                return this.currentCulture;
            },

            setCurrentCulture: function (culture) {
                this.currentCulture = culture;

                Bridge.DateTimeFormatInfo.currentInfo = culture.dateTimeFormat;
                Bridge.NumberFormatInfo.currentInfo = culture.numberFormat;
            },

            getCultureInfo: function (name) {
                if (!name) {
                    throw new Bridge.ArgumentNullException("name");
                }

                return this.cultures[name];
            },

            getCultures: function () {
                var names = Bridge.getPropertyNames(this.cultures),
                    result = [],
                    i;

                for (i = 0; i < names.length; i++) {
                    result.push(this.cultures[names[i]]);
                }

                return result;
            }
        },

        constructor: function (name, create) {
            this.name = name;

            if (!Bridge.CultureInfo.cultures) {
                Bridge.CultureInfo.cultures = {};
            }

            if (Bridge.CultureInfo.cultures[name]) {
                Bridge.copy(this, Bridge.CultureInfo.cultures[name], [
                    "englishName",
                    "nativeName",
                    "numberFormat",
                    "dateTimeFormat"
                ]);
            } else {
                if (!create) {
                    throw new Bridge.CultureNotFoundException("name", name);
                }

                Bridge.CultureInfo.cultures[name] = this;
            }
        },

        getFormat:  function (type) {
            switch (type) {
                case Bridge.NumberFormatInfo:
                    return this.numberFormat;
                case Bridge.DateTimeFormatInfo:
                    return this.dateTimeFormat;
                default:
                    return null;
            }
        },

        clone: function () {
            return new Bridge.CultureInfo(this.name);
        }
    });

    // @source Math.js

    var math = {
        divRem: function (a, b, result) {
            var remainder = a % b;

            result.v = remainder;

            return (a - remainder) / b;
        },

        round: function (n, d, rounding) {
            var m = Math.pow(10, d || 0);

            n *= m;

            var sign = (n > 0) | -(n < 0);

            if (n % 1 === 0.5 * sign) {
                var f = Math.floor(n);

                return (f + (rounding === 4 ? (sign > 0) : (f % 2 * sign))) / m;
            }

            return Math.round(n) / m;
        }
    };

    Bridge.Math = math;

    // @source Bool.js

    var _boolean = {
        trueString: "True",
        falseString: "False",

        is: function (obj, type) {
            if (type === Bridge.IComparable ||
                type.$$name === "Bridge.IEquatable$1$Boolean" ||
                type.$$name === "Bridge.IComparable$1$Boolean") {
                return true;
            }

            return false;
        },

        instanceOf: function (instance) {
            return typeof (instance) === "boolean";
        },

        getDefaultValue: function () {
            return false;
        },

        toString: function (v) {
            return v ? Bridge.Boolean.trueString : Bridge.Boolean.falseString;
        },

        parse: function (value) {
            if (!Bridge.hasValue(value)) {
                throw new Bridge.ArgumentNullException("value");
            }

            var result = { v: false };

            if (!Bridge.Boolean.tryParse(value, result)) {
                throw new Bridge.FormatException("Bad format for Boolean value");
            }

            return result.v;
        },

        tryParse: function (value, result) {
            result.v = false;

            if (!Bridge.hasValue(value)) {
                return false;
            }

            if (Bridge.String.equals(Bridge.Boolean.trueString, value, 5)) {
                result.v = true;
                return true;
            }

            if (Bridge.String.equals(Bridge.Boolean.falseString, value, 5)) {
                result.v = false;
                return true;
            }

            var start = 0,
                end = value.length-1;
 
            while (start < value.length) {
                if (!Bridge.Char.isWhiteSpace(value[start]) && !Bridge.Char.isNull(value.charCodeAt(start))) {
                    break;
                }

                start++;
            }
 
            while (end >= start) {
                if (!Bridge.Char.isWhiteSpace(value[end]) && !Bridge.Char.isNull(value.charCodeAt(end))) {
                    break;
                }

                end--;            
            }
 
            value = value.substr(start, end - start + 1);

            if (Bridge.String.equals(Bridge.Boolean.trueString, value, 5)) {
                result.v = true;
                return true;
            }

            if (Bridge.String.equals(Bridge.Boolean.falseString, value, 5)) {
                result.v = false;
                return true;
            }

            return false;
        }
    };

    Bridge.Boolean = _boolean;

    // @source Integer.js

    (function () {
        var createIntType = function (name, min, max) {
            var type = Bridge.define(name, {
                inherits: [Bridge.IComparable, Bridge.IFormattable],

                statics: {
                    min: min,
                    max: max,

                    instanceOf: function (instance) {
                        return typeof(instance) === "number" && Math.floor(instance, 0) == instance && instance >= min && instance <= max;
                    },
                    getDefaultValue: function () {
                        return 0;
                    },
                    parse: function (s, radix) {
                        return Bridge.Int.parseInt(s, min, max, radix);
                    },
                    tryParse: function (s, result, radix) {
                        return Bridge.Int.tryParseInt(s, result, min, max, radix);
                    },
                    format: function (number, format, provider) {
                        return Bridge.Int.format(number, format, provider);
                    }
                }
            });

            Bridge.Class.addExtend(type, [Bridge.IComparable$1(type), Bridge.IEquatable$1(type)]);
        };

        createIntType("Bridge.Byte", 0, 255);
        createIntType("Bridge.SByte", -128, 127);
        createIntType("Bridge.Int16", -32768, 32767);
        createIntType("Bridge.UInt16", 0, 65535);
        createIntType("Bridge.Int32", -2147483648, 2147483647);
        createIntType("Bridge.UInt32", 0, 4294967295);
    })();

    Bridge.define("Bridge.Int", {
        inherits: [Bridge.IComparable, Bridge.IFormattable],
        statics: {
            instanceOf: function (instance) {
                return typeof(instance) === "number" && isFinite(instance) && Math.floor(instance, 0) === instance;
            },

            getDefaultValue: function () {
                return 0;
            },

            format: function (number, format, provider) {
                var nf = (provider || Bridge.CultureInfo.getCurrentCulture()).getFormat(Bridge.NumberFormatInfo),
                    decimalSeparator = nf.numberDecimalSeparator,
                    groupSeparator = nf.numberGroupSeparator,
                    isDecimal = number instanceof Bridge.Decimal,
                    isLong = number instanceof Bridge.Long || number instanceof Bridge.ULong,
                    isNeg = isDecimal || isLong ? number.isNegative() : number < 0,
                    match,
                    precision,
                    groups,
                    fs;

                if (!isLong && (isDecimal ? !number.isFinite() : !isFinite(number))) {
                    return Number.NEGATIVE_INFINITY === number || (isDecimal && isNeg) ? nf.negativeInfinitySymbol : nf.positiveInfinitySymbol;
                }

                if (!format) {
                    return this.defaultFormat(number, 0, 0, 15, nf, true);
                }

                match = format.match(/^([a-zA-Z])(\d*)$/);

                if (match) {
                    fs = match[1].toUpperCase();
                    precision = parseInt(match[2], 10);
                    precision = precision > 15 ? 15 : precision;

                    switch (fs) {
                        case "D":
                            return this.defaultFormat(number, isNaN(precision) ? 1 : precision, 0, 0, nf, true);
                        case "F":
                        case "N":
                            if (isNaN(precision)) {
                                precision = nf.numberDecimalDigits;
                            }
                            return this.defaultFormat(number, 1, precision, precision, nf, fs === "F");
                        case "G":
                        case "E":
                            var exponent = 0,
                                coefficient = isDecimal || isLong ? number.abs() : Math.abs(number),
                                exponentPrefix = match[1],
                                exponentPrecision = 3,
                                minDecimals,
                                maxDecimals;

                            while (isDecimal || isLong ? coefficient.gte(10) : (coefficient >= 10)) {
                                if (isDecimal || isLong) {
                                    coefficient = coefficient.div(10);
                                } else {
                                    coefficient /= 10;
                                }
                                
                                exponent++;
                            }

                            while (isDecimal || isLong ? (coefficient.ne(0) && coefficient.lt(1)) : (coefficient !== 0 && coefficient < 1)) {
                                if (isDecimal || isLong) {
                                    coefficient = coefficient.mul(10);
                                } else {
                                    coefficient *= 10;
                                }
                                exponent--;
                            }

                            if (fs === "G") {
                                if (exponent > -5 && (exponent < (precision || 15))) {
                                    minDecimals = precision ? precision - (exponent > 0 ? exponent + 1 : 1) : 0;
                                    maxDecimals = precision ? precision - (exponent > 0 ? exponent + 1 : 1) : 15;
                                    return this.defaultFormat(number, 1, minDecimals, maxDecimals, nf, true);
                                }

                                exponentPrefix = exponentPrefix === "G" ? "E" : "e";
                                exponentPrecision = 2;
                                minDecimals = (precision || 1) - 1;
                                maxDecimals = (precision || 15) - 1;
                            } else {
                                minDecimals = maxDecimals = isNaN(precision) ? 6 : precision;
                            }

                            if (exponent >= 0) {
                                exponentPrefix += nf.positiveSign;
                            } else {
                                exponentPrefix += nf.negativeSign;
                                exponent = -exponent;
                            }

                            if (isNeg) {
                                if (isDecimal || isLong) {
                                    coefficient = coefficient.mul(-1);
                                } else {
                                    coefficient *= -1;
                                }
                            }

                            return this.defaultFormat(coefficient, 1, minDecimals, maxDecimals, nf) + exponentPrefix + this.defaultFormat(exponent, exponentPrecision, 0, 0, nf, true);
                        case "P":
                            if (isNaN(precision)) {
                                precision = nf.percentDecimalDigits;
                            }

                            return this.defaultFormat(number * 100, 1, precision, precision, nf, false, "percent");
                        case "X":
                            var result = isDecimal ? number.round().value.toHex().substr(2) : (isLong ? number.toString(16) : Math.round(number).toString(16));

                            if (match[1] === "X") {
                                result = result.toUpperCase();
                            }

                            precision -= result.length;

                            while (precision-- > 0) {
                                result = "0" + result;
                            }

                            return result;
                        case "C":
                            if (isNaN(precision)) {
                                precision = nf.currencyDecimalDigits;
                            }

                            return this.defaultFormat(number, 1, precision, precision, nf, false, "currency");
                        case "R":
                            var r_result = isDecimal || isLong ? (number.toString()) : ("" + number);
                            if (decimalSeparator !== ".") {
                                r_result = r_result.replace(".", decimalSeparator);
                            }
                            r_result = r_result.replace("e", "E");
                            return r_result;
                    }
                }

                if (format.indexOf(",.") !== -1 || Bridge.String.endsWith(format, ",")) {
                    var count = 0,
                        index = format.indexOf(",.");

                    if (index === -1) {
                        index = format.length - 1;
                    }

                    while (index > -1 && format.charAt(index) === ",") {
                        count++;
                        index--;
                    }

                    if (isDecimal || isLong) {
                        number = number.div(Math.pow(1000, count));
                    } else {
                        number /= Math.pow(1000, count);
                    }
                }

                if (format.indexOf("%") !== -1) {
                    if (isDecimal || isLong) {
                        number = number.mul(100);
                    } else {
                        number *= 100;
                    }
                }

                if (format.indexOf("‰") !== -1) {
                    if (isDecimal || isLong) {
                        number = number.mul(1000);
                    } else {
                        number *= 1000;
                    }
                }

                groups = format.split(";");

                if ((isDecimal || isLong ? number.lt(0) : (number < 0)) && groups.length > 1) {
                    if (isDecimal || isLong) {
                        number = number.mul(-1);
                    } else {
                        number *= -1;
                    }
                    
                    format = groups[1];
                } else {
                    format = groups[(isDecimal || isLong ? number.ne(0) : !number) && groups.length > 2 ? 2 : 0];
                }

                return this.customFormat(number, format, nf, !format.match(/^[^\.]*[0#],[0#]/));
            },

            defaultFormat: function (number, minIntLen, minDecLen, maxDecLen, provider, noGroup, name) {
                name = name || "number";

                var nf = (provider || Bridge.CultureInfo.getCurrentCulture()).getFormat(Bridge.NumberFormatInfo),
                    str,
                    decimalIndex,
                    negPattern,
                    roundingFactor,
                    groupIndex,
                    groupSize,
                    groups = nf[name + "GroupSizes"],
                    decimalPart,
                    index,
                    done,
                    startIndex,
                    length,
                    part,
                    sep,
                    buffer = "",
                    isDecimal = number instanceof Bridge.Decimal,
                    isLong = number instanceof Bridge.Long || number instanceof Bridge.ULong,
                    isNeg = isDecimal || isLong ? number.isNegative() : number < 0;

                roundingFactor = Math.pow(10, maxDecLen);

                if (isDecimal) {
                    str = number.abs().toDecimalPlaces(maxDecLen).toString();
                } else if (isLong) {
                    str = number.eq(Bridge.Long.MinValue) ? number.value.toUnsigned().toString() : number.abs().toString();
                } else {
                    str = "" + (+Math.abs(number).toFixed(maxDecLen));
                }

                decimalIndex = str.indexOf(".");

                if (decimalIndex > 0) {
                    decimalPart = nf[name + "DecimalSeparator"] + str.substr(decimalIndex + 1);
                    str = str.substr(0, decimalIndex);
                }

                if (str.length < minIntLen) {
                    str = Array(minIntLen - str.length + 1).join("0") + str;
                }

                if (decimalPart) {
                    if ((decimalPart.length - 1) < minDecLen) {
                        decimalPart += Array(minDecLen - decimalPart.length + 2).join("0");
                    }

                    if (maxDecLen === 0) {
                        decimalPart = null;
                    } else if ((decimalPart.length - 1) > maxDecLen) {
                        decimalPart = decimalPart.substr(0, maxDecLen + 1);
                    }
                } else if (minDecLen > 0) {
                    decimalPart = nf[name + "DecimalSeparator"] + Array(minDecLen + 1).join("0");
                }

                groupIndex = 0;
                groupSize = groups[groupIndex];

                if (str.length < groupSize) {
                    buffer = str;

                    if (decimalPart) {
                        buffer += decimalPart;
                    }
                } else {
                    index = str.length;
                    done = false;
                    sep = noGroup ? "" : nf[name + "GroupSeparator"];

                    while (!done) {
                        length = groupSize;
                        startIndex = index - length;

                        if (startIndex < 0) {
                            groupSize += startIndex;
                            length += startIndex;
                            startIndex = 0;
                            done = true;
                        }

                        if (!length) {
                            break;
                        }

                        part = str.substr(startIndex, length);

                        if (buffer.length) {
                            buffer = part + sep + buffer;
                        } else {
                            buffer = part;
                        }

                        index -= length;

                        if (groupIndex < groups.length - 1) {
                            groupIndex++;
                            groupSize = groups[groupIndex];
                        }
                    }

                    if (decimalPart) {
                        buffer += decimalPart;
                    }
                }

                if (isNeg) {
                    negPattern = Bridge.NumberFormatInfo[name + "NegativePatterns"][nf[name + "NegativePattern"]];

                    return negPattern.replace("-", nf.negativeSign).replace("%", nf.percentSymbol).replace("$", nf.currencySymbol).replace("n", buffer);
                } else if (Bridge.NumberFormatInfo[name + "PositivePatterns"]) {
                    negPattern = Bridge.NumberFormatInfo[name + "PositivePatterns"][nf[name + "PositivePattern"]];

                    return negPattern.replace("%", nf.percentSymbol).replace("$", nf.currencySymbol).replace("n", buffer);
                }

                return buffer;
            },

            customFormat: function (number, format, nf, noGroup) {
                var digits = 0,
                    forcedDigits = -1,
                    integralDigits = -1,
                    decimals = 0,
                    forcedDecimals = -1,
                    atDecimals = 0,
                    unused = 1,
                    c, i, f,
                    endIndex,
                    roundingFactor,
                    decimalIndex,
                    isNegative = false,
                    name,
                    groupCfg,
                    buffer = "",
                    isZeroInt = false,
                    wasSeparator = false,
                    wasIntPart = false,
                    isDecimal = number instanceof Bridge.Decimal,
                    isLong = number instanceof Bridge.Long || number instanceof Bridge.ULong,
                    isNeg = isDecimal || isLong ? number.isNegative() : number < 0;

                name = "number";

                if (format.indexOf("%") !== -1) {
                    name = "percent";
                } else if (format.indexOf("$") !== -1) {
                    name = "currency";
                }

                for (i = 0; i < format.length; i++) {
                    c = format.charAt(i);

                    if (c === "'" || c === '"') {
                        i = format.indexOf(c, i + 1);

                        if (i < 0) {
                            break;
                        }
                    } else if (c === "\\") {
                        i++;
                    } else {
                        if (c === "0" || c === "#") {
                            decimals += atDecimals;

                            if (c === "0") {
                                if (atDecimals) {
                                    forcedDecimals = decimals;
                                } else if (forcedDigits < 0) {
                                    forcedDigits = digits;
                                }
                            }

                            digits += !atDecimals;
                        }

                        atDecimals = atDecimals || c === ".";
                    }
                }
                forcedDigits = forcedDigits < 0 ? 1 : digits - forcedDigits;

                if (isNeg) {
                    isNegative = true;
                }

                roundingFactor = Math.pow(10, decimals);

                if (isDecimal) {
                    number = number.abs().mul(roundingFactor).round().div(roundingFactor).toString();
                } if (isLong) {
                    number = number.abs().mul(roundingFactor).div(roundingFactor).toString();
                } else {
                    number = "" + (Math.round(Math.abs(number) * roundingFactor) / roundingFactor);
                }

                decimalIndex = number.indexOf(".");
                integralDigits = decimalIndex < 0 ? number.length : decimalIndex;
                i = integralDigits - digits;

                groupCfg = {
                    groupIndex: Math.max(integralDigits, forcedDigits),
                    sep: noGroup ? "" : nf[name + "GroupSeparator"]
                };

                if (integralDigits === 1 && number.charAt(0) === "0") {
                    isZeroInt = true;
                }

                for (f = 0; f < format.length; f++) {
                    c = format.charAt(f);

                    if (c === "'" || c === '"') {
                        endIndex = format.indexOf(c, f + 1);

                        buffer += format.substring(f + 1, endIndex < 0 ? format.length : endIndex);

                        if (endIndex < 0) {
                            break;
                        }

                        f = endIndex;
                    } else if (c === "\\") {
                        buffer += format.charAt(f + 1);
                        f++;
                    } else if (c === "#" || c === "0") {
                        wasIntPart = true;
                        if (!wasSeparator && isZeroInt && c === "#") {
                            i++;
                        } else {
                            groupCfg.buffer = buffer;

                            if (i < integralDigits) {
                                if (i >= 0) {
                                    if (unused) {
                                        this.addGroup(number.substr(0, i), groupCfg);
                                    }

                                    this.addGroup(number.charAt(i), groupCfg);
                                } else if (i >= integralDigits - forcedDigits) {
                                    this.addGroup("0", groupCfg);
                                }
                                unused = 0;
                            } else if (forcedDecimals-- > 0 || i < number.length) {
                                this.addGroup(i >= number.length ? "0" : number.charAt(i), groupCfg);
                            }

                            buffer = groupCfg.buffer;

                            i++;
                        }
                    } else if (c === ".") {
                        if (!wasIntPart && !isZeroInt) {
                            buffer += number.substr(0, integralDigits);
                            wasIntPart = true;
                        }
                        if (number.length > ++i || forcedDecimals > 0) {
                            wasSeparator = true;
                            buffer += nf[name + "DecimalSeparator"];
                        }
                    } else if (c !== ",") {
                        buffer += c;
                    }
                }

                if (isNegative) {
                    buffer = "-" + buffer;
                }

                return buffer;
            },

            addGroup: function (value, cfg) {
                var buffer = cfg.buffer,
                    sep = cfg.sep,
                    groupIndex = cfg.groupIndex;

                for (var i = 0, length = value.length; i < length; i++) {
                    buffer += value.charAt(i);

                    if (sep && groupIndex > 1 && groupIndex-- % 3 === 1) {
                        buffer += sep;
                    }
                }

                cfg.buffer = buffer;
                cfg.groupIndex = groupIndex;
            },

            parseFloat: function (str, provider) {
                if (str == null) {
                    throw new Bridge.ArgumentNullException("str");
                }

                var nfInfo = (provider || Bridge.CultureInfo.getCurrentCulture()).getFormat(Bridge.NumberFormatInfo),
                    result = parseFloat(str.replace(nfInfo.numberDecimalSeparator, "."));

                if (isNaN(result) && str !== nfInfo.nanSymbol) {
                    if (str === nfInfo.negativeInfinitySymbol) {
                        return Number.NEGATIVE_INFINITY;
                    }

                    if (str === nfInfo.positiveInfinitySymbol) {
                        return Number.POSITIVE_INFINITY;
                    }

                    throw new Bridge.FormatException("Input string was not in a correct format.");
                }

                return result;
            },

            tryParseFloat: function (str, provider, result) {
                result.v = 0;

                if (str == null) {
                    return false;
                }

                var nfInfo = (provider || Bridge.CultureInfo.getCurrentCulture()).getFormat(Bridge.NumberFormatInfo);

                result.v = parseFloat(str.replace(nfInfo.numberDecimalSeparator, "."));

                if (isNaN(result.v) && str !== nfInfo.nanSymbol) {
                    if (str === nfInfo.negativeInfinitySymbol) {
                        result.v = Number.NEGATIVE_INFINITY;
                        return true;
                    }

                    if (str === nfInfo.positiveInfinitySymbol) {
                        result.v = Number.POSITIVE_INFINITY;
                        return true;
                    }

                    return false;
                }

                return true;
            },

            parseInt: function (str, min, max, radix) {
                if (str == null) {
                    throw new Bridge.ArgumentNullException("str");
                }

                if (!/^[+-]?[0-9]+$/.test(str)) {
                    throw new Bridge.FormatException("Input string was not in a correct format.");
                }

                var result = parseInt(str, radix || 10);

                if (isNaN(result)) {
                    throw new Bridge.FormatException("Input string was not in a correct format.");
                }

                if (result < min || result > max) {
                    throw new Bridge.OverflowException();
                }

                return result;
            },

            tryParseInt: function (str, result, min, max, radix) {
                result.v = 0;

                if (!/^[+-]?[0-9]+$/.test(str)) {
                    return false;
                }

                result.v = parseInt(str, radix || 10);

                if (result.v < min || result.v > max) {
                    return false;
                }

                return true;
            },

            isInfinite: function (x) {
                return x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY;
            },

            trunc: function (num) {
                if (!Bridge.isNumber(num)) {
                    return Bridge.Int.isInfinite(num) ? num : null;
                }

                return num > 0 ? Math.floor(num) : Math.ceil(num);
            },

            div: function (x, y) {
                if (!Bridge.isNumber(x) || !Bridge.isNumber(y)) {
                    return null;
                }

                if (y === 0) {
                    throw new Bridge.DivideByZeroException();
                }

                return this.trunc(x / y);
            },

            mod: function (x, y) {
                if (!Bridge.isNumber(x) || !Bridge.isNumber(y)) {
                    return null;
                }

                if (y === 0) {
                    throw new Bridge.DivideByZeroException();
                }

                return x % y;
            },

            check: function (x, type) {
                if (Bridge.Long.is64Bit(x)) {
                    return Bridge.Long.check(x, type);
                } else if (x instanceof Bridge.Decimal) {
                    return Bridge.Decimal.toInt(x, type);
                }

                if (Bridge.isNumber(x) && !type.instanceOf(x)) {
                    throw new Bridge.OverflowException();
                }

                if (Bridge.Int.isInfinite(x)) {
                    if (type === Bridge.Long || type === Bridge.ULong) {
                        return type.MinValue;
                    }

                    return type.min;
                }
                
                return x;
            },

            sxb: function (x) {
                return Bridge.isNumber(x) ? (x | (x & 0x80 ? 0xffffff00 : 0)) : (Bridge.Int.isInfinite(x) ? Bridge.SByte.min : null);
            },

            sxs: function (x) {
                return Bridge.isNumber(x) ? (x | (x & 0x8000 ? 0xffff0000 : 0)) : (Bridge.Int.isInfinite(x) ? Bridge.Int16.min : null);
            },

            clip8: function (x) {
                return Bridge.isNumber(x) ? Bridge.Int.sxb(x & 0xff) : (Bridge.Int.isInfinite(x) ? Bridge.SByte.min : null);
            },

            clipu8: function (x) {
                return Bridge.isNumber(x) ? x & 0xff : (Bridge.Int.isInfinite(x) ? Bridge.Byte.min : null);
            },

            clip16: function (x) {
                return Bridge.isNumber(x) ? Bridge.Int.sxs(x & 0xffff) : (Bridge.Int.isInfinite(x) ? Bridge.Int16.min : null);
            },

            clipu16: function (x) {
                return Bridge.isNumber(x) ? x & 0xffff : (Bridge.Int.isInfinite(x) ? Bridge.UInt16.min : null);
            },

            clip32: function (x) {
                return Bridge.isNumber(x) ? x | 0 : (Bridge.Int.isInfinite(x) ? Bridge.Int32.min : null);
            },

            clipu32: function (x) {
                return Bridge.isNumber(x) ? x >>> 0 : (Bridge.Int.isInfinite(x) ? Bridge.UInt32.min : null);
            },

            clip64: function (x) {
                return Bridge.isNumber(x) ? Bridge.Long(Bridge.Int.trunc(x)) : (Bridge.Int.isInfinite(x) ? Bridge.Long.MinValue : null);
            },

            clipu64: function (x) {
                return Bridge.isNumber(x) ? Bridge.ULong(Bridge.Int.trunc(x)) : (Bridge.Int.isInfinite(x) ? Bridge.ULong.MinValue : null);
            },

            sign: function (x) {
                return Bridge.isNumber(x) ? (x === 0 ? 0 : (x < 0 ? -1 : 1)) : null;
            }
        }
    });

    Bridge.Class.addExtend(Bridge.Int, [Bridge.IComparable$1(Bridge.Int), Bridge.IEquatable$1(Bridge.Int)]);

    Bridge.define("Bridge.Double", {
        inherits: [Bridge.IComparable, Bridge.IFormattable],
        statics: {
            min: -Number.MAX_VALUE,
            max: Number.MAX_VALUE,

            instanceOf: function (instance) {
                return typeof (instance) === "number";
            },
            getDefaultValue: function () {
                return 0;
            },
            parse: function (s, provider) {
                return Bridge.Int.parseFloat(s, provider);
            },
            tryParse: function (s, provider, result) {
                return Bridge.Int.tryParseFloat(s, provider, result);
            },
            format: function (number, format, provider) {
                return Bridge.Int.format(number, format, provider);
            }
        }
    });
    Bridge.Class.addExtend(Bridge.Double, [Bridge.IComparable$1(Bridge.Double), Bridge.IEquatable$1(Bridge.Double)]);

    Bridge.define("Bridge.Single", {
        inherits: [Bridge.IComparable, Bridge.IFormattable],
        statics: {
            min: -3.40282346638528859e+38,
            max: 3.40282346638528859e+38,

            instanceOf: Bridge.Double.instanceOf,
            getDefaultValue: Bridge.Double.getDefaultValue,
            parse: Bridge.Double.parse,
            tryParse: Bridge.Double.tryParse,
            format: Bridge.Double.format
        }
    });

    Bridge.Class.addExtend(Bridge.Single, [Bridge.IComparable$1(Bridge.Single), Bridge.IEquatable$1(Bridge.Single)]);

/* long.js https://github.com/dcodeIO/long.js/blob/master/LICENSE */
(function (b) {
    function d(a, b, c) { this.low = a | 0; this.high = b | 0; this.unsigned = !!c } function g(a) { return !0 === (a && a.__isLong__) } function m(a, b) { var c, u; if (b) { a >>>= 0; if (u = 0 <= a && 256 > a) if (c = A[a]) return c; c = e(a, 0 > (a | 0) ? -1 : 0, !0); u && (A[a] = c) } else { a |= 0; if (u = -128 <= a && 128 > a) if (c = B[a]) return c; c = e(a, 0 > a ? -1 : 0, !1); u && (B[a] = c) } return c } function n(a, b) {
        if (isNaN(a) || !isFinite(a)) return b ? p : k; if (b) { if (0 > a) return p; if (a >= C) return D } else { if (a <= -E) return l; if (a + 1 >= E) return F } return 0 > a ? n(-a, b).neg() : e(a % 4294967296 | 0, a / 4294967296 |
        0, b)
    } function e(a, b, c) { return new d(a, b, c) } function y(a, b, c) {
        if (0 === a.length) throw Error("empty string"); if ("NaN" === a || "Infinity" === a || "+Infinity" === a || "-Infinity" === a) return k; "number" === typeof b ? (c = b, b = !1) : b = !!b; c = c || 10; if (2 > c || 36 < c) throw RangeError("radix"); var u; if (0 < (u = a.indexOf("-"))) throw Error("interior hyphen"); if (0 === u) return y(a.substring(1), b, c).neg(); u = n(w(c, 8)); for (var e = k, f = 0; f < a.length; f += 8) {
            var d = Math.min(8, a.length - f), g = parseInt(a.substring(f, f + d), c); 8 > d ? (d = n(w(c, d)), e = e.mul(d).add(n(g))) :
            (e = e.mul(u), e = e.add(n(g)))
        } e.unsigned = b; return e
    } function q(a) { return a instanceof d ? a : "number" === typeof a ? n(a) : "string" === typeof a ? y(a) : e(a.low, a.high, a.unsigned) } b.Bridge.$Long = d; d.__isLong__; Object.defineProperty(d.prototype, "__isLong__", { value: !0, enumerable: !1, configurable: !1 }); d.isLong = g; var B = {}, A = {}; d.fromInt = m; d.fromNumber = n; d.fromBits = e; var w = Math.pow; d.fromString = y; d.fromValue = q; var C = 4294967296 * 4294967296, E = C / 2, G = m(16777216), k = m(0); d.ZERO = k; var p = m(0, !0); d.UZERO = p; var r = m(1); d.ONE = r; var H =
    m(1, !0); d.UONE = H; var z = m(-1); d.NEG_ONE = z; var F = e(-1, 2147483647, !1); d.MAX_VALUE = F; var D = e(-1, -1, !0); d.MAX_UNSIGNED_VALUE = D; var l = e(0, -2147483648, !1); d.MIN_VALUE = l; b = d.prototype; b.toInt = function () { return this.unsigned ? this.low >>> 0 : this.low }; b.toNumber = function () { return this.unsigned ? 4294967296 * (this.high >>> 0) + (this.low >>> 0) : 4294967296 * this.high + (this.low >>> 0) }; b.toString = function (a) {
        a = a || 10; if (2 > a || 36 < a) throw RangeError("radix"); if (this.isZero()) return "0"; if (this.isNegative()) {
            if (this.eq(l)) {
                var b =
                n(a), c = this.div(b), b = c.mul(b).sub(this); return c.toString(a) + b.toInt().toString(a)
            } return ("undefined" === typeof a || 10 === a ? "-" : "") + this.neg().toString(a)
        } for (var c = n(w(a, 6), this.unsigned), b = this, e = ""; ;) { var d = b.div(c), f = (b.sub(d.mul(c)).toInt() >>> 0).toString(a), b = d; if (b.isZero()) return f + e; for (; 6 > f.length;) f = "0" + f; e = "" + f + e }
    }; b.getHighBits = function () { return this.high }; b.getHighBitsUnsigned = function () { return this.high >>> 0 }; b.getLowBits = function () { return this.low }; b.getLowBitsUnsigned = function () {
        return this.low >>>
        0
    }; b.getNumBitsAbs = function () { if (this.isNegative()) return this.eq(l) ? 64 : this.neg().getNumBitsAbs(); for (var a = 0 != this.high ? this.high : this.low, b = 31; 0 < b && 0 == (a & 1 << b) ; b--); return 0 != this.high ? b + 33 : b + 1 }; b.isZero = function () { return 0 === this.high && 0 === this.low }; b.isNegative = function () { return !this.unsigned && 0 > this.high }; b.isPositive = function () { return this.unsigned || 0 <= this.high }; b.isOdd = function () { return 1 === (this.low & 1) }; b.isEven = function () { return 0 === (this.low & 1) }; b.equals = function (a) {
        g(a) || (a = q(a)); return this.unsigned !==
        a.unsigned && 1 === this.high >>> 31 && 1 === a.high >>> 31 ? !1 : this.high === a.high && this.low === a.low
    }; b.eq = b.equals; b.notEquals = function (a) { return !this.eq(a) }; b.neq = b.notEquals; b.lessThan = function (a) { return 0 > this.comp(a) }; b.lt = b.lessThan; b.lessThanOrEqual = function (a) { return 0 >= this.comp(a) }; b.lte = b.lessThanOrEqual; b.greaterThan = function (a) { return 0 < this.comp(a) }; b.gt = b.greaterThan; b.greaterThanOrEqual = function (a) { return 0 <= this.comp(a) }; b.gte = b.greaterThanOrEqual; b.compare = function (a) {
        g(a) || (a = q(a)); if (this.eq(a)) return 0;
        var b = this.isNegative(), c = a.isNegative(); return b && !c ? -1 : !b && c ? 1 : this.unsigned ? a.high >>> 0 > this.high >>> 0 || a.high === this.high && a.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(a).isNegative() ? -1 : 1
    }; b.comp = b.compare; b.negate = function () { return !this.unsigned && this.eq(l) ? l : this.not().add(r) }; b.neg = b.negate; b.add = function (a) {
        g(a) || (a = q(a)); var b = this.high >>> 16, c = this.high & 65535, d = this.low >>> 16, l = a.high >>> 16, f = a.high & 65535, n = a.low >>> 16, k; k = 0 + ((this.low & 65535) + (a.low & 65535)); a = 0 + (k >>> 16); a += d + n; d = 0 + (a >>> 16); d += c + f; c =
        0 + (d >>> 16); c = c + (b + l) & 65535; return e((a & 65535) << 16 | k & 65535, c << 16 | d & 65535, this.unsigned)
    }; b.subtract = function (a) { g(a) || (a = q(a)); return this.add(a.neg()) }; b.sub = b.subtract; b.multiply = function (a) {
        if (this.isZero()) return k; g(a) || (a = q(a)); if (a.isZero()) return k; if (this.eq(l)) return a.isOdd() ? l : k; if (a.eq(l)) return this.isOdd() ? l : k; if (this.isNegative()) return a.isNegative() ? this.neg().mul(a.neg()) : this.neg().mul(a).neg(); if (a.isNegative()) return this.mul(a.neg()).neg(); if (this.lt(G) && a.lt(G)) return n(this.toNumber() *
        a.toNumber(), this.unsigned); var b = this.high >>> 16, c = this.high & 65535, d = this.low >>> 16, x = this.low & 65535, f = a.high >>> 16, m = a.high & 65535, p = a.low >>> 16; a = a.low & 65535; var v, h, t, r; r = 0 + x * a; t = 0 + (r >>> 16); t += d * a; h = 0 + (t >>> 16); t = (t & 65535) + x * p; h += t >>> 16; t &= 65535; h += c * a; v = 0 + (h >>> 16); h = (h & 65535) + d * p; v += h >>> 16; h &= 65535; h += x * m; v += h >>> 16; h &= 65535; v = v + (b * a + c * p + d * m + x * f) & 65535; return e(t << 16 | r & 65535, v << 16 | h, this.unsigned)
    }; b.mul = b.multiply; b.divide = function (a) {
        g(a) || (a = q(a)); if (a.isZero()) throw Error("division by zero"); if (this.isZero()) return this.unsigned ?
                p : k; var b, c, d; if (this.unsigned) a.unsigned || (a = a.toUnsigned()); else { if (this.eq(l)) { if (a.eq(r) || a.eq(z)) return l; if (a.eq(l)) return r; b = this.shr(1).div(a).shl(1); if (b.eq(k)) return a.isNegative() ? r : z; c = this.sub(a.mul(b)); return d = b.add(c.div(a)) } if (a.eq(l)) return this.unsigned ? p : k; if (this.isNegative()) return a.isNegative() ? this.neg().div(a.neg()) : this.neg().div(a).neg(); if (a.isNegative()) return this.div(a.neg()).neg() } if (this.unsigned) { if (a.gt(this)) return p; if (a.gt(this.shru(1))) return H; d = p } else d =
                k; for (c = this; c.gte(a) ;) { b = Math.max(1, Math.floor(c.toNumber() / a.toNumber())); for (var e = Math.ceil(Math.log(b) / Math.LN2), e = 48 >= e ? 1 : w(2, e - 48), f = n(b), m = f.mul(a) ; m.isNegative() || m.gt(c) ;) b -= e, f = n(b, this.unsigned), m = f.mul(a); f.isZero() && (f = r); d = d.add(f); c = c.sub(m) } return d
    }; b.div = b.divide; b.modulo = function (a) { g(a) || (a = q(a)); return this.sub(this.div(a).mul(a)) }; b.mod = b.modulo; b.not = function () { return e(~this.low, ~this.high, this.unsigned) }; b.and = function (a) {
        g(a) || (a = q(a)); return e(this.low & a.low, this.high &
        a.high, this.unsigned)
    }; b.or = function (a) { g(a) || (a = q(a)); return e(this.low | a.low, this.high | a.high, this.unsigned) }; b.xor = function (a) { g(a) || (a = q(a)); return e(this.low ^ a.low, this.high ^ a.high, this.unsigned) }; b.shiftLeft = function (a) { g(a) && (a = a.toInt()); return 0 === (a &= 63) ? this : 32 > a ? e(this.low << a, this.high << a | this.low >>> 32 - a, this.unsigned) : e(0, this.low << a - 32, this.unsigned) }; b.shl = b.shiftLeft; b.shiftRight = function (a) {
        g(a) && (a = a.toInt()); return 0 === (a &= 63) ? this : 32 > a ? e(this.low >>> a | this.high << 32 - a, this.high >>
        a, this.unsigned) : e(this.high >> a - 32, 0 <= this.high ? 0 : -1, this.unsigned)
    }; b.shr = b.shiftRight; b.shiftRightUnsigned = function (a) { g(a) && (a = a.toInt()); a &= 63; if (0 === a) return this; var b = this.high; return 32 > a ? e(this.low >>> a | b << 32 - a, b >>> a, this.unsigned) : 32 === a ? e(b, 0, this.unsigned) : e(b >>> a - 32, 0, this.unsigned) }; b.shru = b.shiftRightUnsigned; b.toSigned = function () { return this.unsigned ? e(this.low, this.high, !1) : this }; b.toUnsigned = function () { return this.unsigned ? this : e(this.low, this.high, !0) }
})(Bridge.global);

Bridge.Long = function (l) {
    if (this.constructor !== Bridge.Long) {
        return new Bridge.Long(l);
    }

    if (!Bridge.hasValue(l)) {
        l = 0;
    }

    this.T = Bridge.Long;
    this.unsigned = false;
    this.value = Bridge.Long.getValue(l);
}

Bridge.Long.$$name = "Bridge.Long";
Bridge.Long.prototype.$$name = "Bridge.Long";

Bridge.Long.$$inherits = [];
Bridge.Class.addExtend(Bridge.Long, [Bridge.IComparable, Bridge.IFormattable, Bridge.IComparable$1(Bridge.Long), Bridge.IEquatable$1(Bridge.Long)]);

Bridge.Long.instanceOf = function (instance) {
    return instance instanceof Bridge.Long;
};

Bridge.Long.is64Bit = function (instance) {
	return instance instanceof Bridge.Long || instance instanceof Bridge.ULong;
};

Bridge.Long.getDefaultValue = function () {
    return Bridge.Long.Zero;
};

Bridge.Long.getValue = function (l) {
    if (!Bridge.hasValue(l)) {
        return null;
    }

    if (l instanceof Bridge.$Long) {
        return l;
    }

    if (l instanceof Bridge.Long) {
        return l.value;
    }

    if (l instanceof Bridge.ULong) {
        return l.value.toSigned();
    }

    if (Bridge.isArray(l)) {
        return new Bridge.$Long(l[0], l[1]);
    }

    if (Bridge.isString(l)) {
        return Bridge.$Long.fromString(l);
    }

    if (Bridge.isNumber(l)) {
        return Bridge.$Long.fromNumber(l);
    }

    if (l instanceof Bridge.Decimal) {
        return Bridge.$Long.fromString(l.toString());
    }

    return Bridge.$Long.fromValue(l);
};

Bridge.Long.create = function (l) {
    if (!Bridge.hasValue(l)) {
        return null;
    }

    if (l instanceof Bridge.Long) {
        return l;
    }

    return new Bridge.Long(l);
};

Bridge.Long.lift = function (l) {
    if (!Bridge.hasValue(l)) {
        return null;
    }
    return Bridge.Long.create(l);
};

Bridge.Long.toNumber = function (value) {
    if (!value) {
        return null;
    }

    return value.toNumber();
};

Bridge.Long.prototype.toNumberDivided = function (divisor) {
    var integral = this.div(divisor),
        remainder = this.mod(divisor),
        scaledRemainder = remainder.toNumber() / divisor;

    return integral.toNumber() + scaledRemainder;
};

Bridge.Long.prototype.toJSON = function () {
    return this.toNumber();
};

Bridge.Long.prototype.toString = function (format, provider) {
    if (!format && !provider) {
        return this.value.toString();
    }

    if (Bridge.isNumber(format) && !provider) {
        return this.value.toString(format);
    }

    return Bridge.Int.format(this, format, provider);
};

Bridge.Long.prototype.format = function (format, provider) {
    return Bridge.Int.format(this, format, provider);
};

Bridge.Long.prototype.isNegative = function () {
    return this.value.isNegative();
};

Bridge.Long.prototype.abs = function () {
    if (this.T === Bridge.Long && this.eq(Bridge.Long.MinValue)) {
        throw new Bridge.OverflowException();
    }
    return new this.T(this.value.isNegative() ? this.value.neg() : this.value);
};

Bridge.Long.prototype.compareTo = function (l) {
    return this.value.compare(this.T.getValue(l));
};

Bridge.Long.prototype.add = function (l, overflow) {
    var addl = this.T.getValue(l),
        r = new this.T(this.value.add(addl));

    if (overflow) {
        var neg1 = this.value.isNegative(),
            neg2 = addl.isNegative(),
            rneg = r.value.isNegative();

        if ((neg1 && neg2 && !rneg) ||
            (!neg1 && !neg2 && rneg) ||
            (this.T === Bridge.ULong && r.lt(Bridge.ULong.max(this, addl)))) {
            throw new Bridge.OverflowException();
        }
    }

    return r;
};

Bridge.Long.prototype.sub = function (l, overflow) {
    var subl = this.T.getValue(l),
        r = new this.T(this.value.sub(subl));

    if (overflow) {
        var neg1 = this.value.isNegative(),
            neg2 = subl.isNegative(),
            rneg = r.value.isNegative();

        if ((neg1 && !neg2 && !rneg) ||
            (!neg1 && neg2 && rneg) ||
            (this.T === Bridge.ULong && this.value.lt(subl))) {
            throw new Bridge.OverflowException();
        }
    }

    return r;
};

Bridge.Long.prototype.isZero = function () {
    return this.value.isZero();
};

Bridge.Long.prototype.mul = function (l, overflow) {
    var arg = this.T.getValue(l),
        r = new this.T(this.value.mul(arg));

    if (overflow) {
        var s1 = this.sign(),
            s2 = arg.isZero() ? 0 : (arg.isNegative() ? -1 : 1),
            rs = r.sign();

        if (this.T === Bridge.Long) {
            if (this.eq(Bridge.Long.MinValue) || this.eq(Bridge.Long.MaxValue)) {
                if (arg.neq(1) && arg.neq(0)) {
                    throw new Bridge.OverflowException();
                }

                return r;
            }

            if (arg.eq(Bridge.$Long.MIN_VALUE) || arg.eq(Bridge.$Long.MAX_VALUE)) {
                if (this.neq(1) && this.neq(0)) {
                    throw new Bridge.OverflowException();
                }

                return r;
            }

            if ((s1 === -1 && s2 === -1 && rs !== 1) ||
                (s1 === 1 && s2 === 1 && rs !== 1) ||
                (s1 === -1 && s2 === 1 && rs !== -1) ||
                (s1 === 1 && s2 === -1 && rs !== -1)) {
                throw new Bridge.OverflowException();
            }

            var r_abs = r.abs();

            if (r_abs.lt(this.abs()) || r_abs.lt(Bridge.Long(arg).abs())) {
                throw new Bridge.OverflowException();
            }
        } else {
            if (this.eq(Bridge.ULong.MaxValue)) {
                if (arg.neq(1) && arg.neq(0)) {
                    throw new Bridge.OverflowException();
                }

                return r;
            }

            if (arg.eq(Bridge.$Long.MAX_UNSIGNED_VALUE)) {
                if (this.neq(1) && this.neq(0)) {
                    throw new Bridge.OverflowException();
                }

                return r;
            }

            var r_abs = r.abs();

            if (r_abs.lt(this.abs()) || r_abs.lt(Bridge.Long(arg).abs())) {
                throw new Bridge.OverflowException();
            }
        }
    }

    return r;
};

Bridge.Long.prototype.div = function (l) {
    return new this.T(this.value.div(this.T.getValue(l)));
};

Bridge.Long.prototype.mod = function (l) {
    return new this.T(this.value.mod(this.T.getValue(l)));
};

Bridge.Long.prototype.neg = function (overflow) {
    if (overflow && this.T === Bridge.Long && this.eq(Bridge.Long.MinValue)) {
        throw new Bridge.OverflowException();
    }
    return new this.T(this.value.neg());
};

Bridge.Long.prototype.inc = function (overflow) {
    return this.add(1, overflow);
};

Bridge.Long.prototype.dec = function (overflow) {
    return this.sub(1, overflow);
};

Bridge.Long.prototype.sign = function () {
    return this.value.isZero() ? 0 : (this.value.isNegative() ? -1 : 1);
};

Bridge.Long.prototype.clone = function () {
    return new this.T(this);
};

Bridge.Long.prototype.ne = function (l) {
    return this.value.neq(this.T.getValue(l));
};

Bridge.Long.prototype.neq = function (l) {
    return this.value.neq(this.T.getValue(l));
};

Bridge.Long.prototype.eq = function (l) {
    return this.value.eq(this.T.getValue(l));
};

Bridge.Long.prototype.lt = function (l) {
    return this.value.lt(this.T.getValue(l));
};

Bridge.Long.prototype.lte = function (l) {
    return this.value.lte(this.T.getValue(l));
};

Bridge.Long.prototype.gt = function (l) {
    return this.value.gt(this.T.getValue(l));
};

Bridge.Long.prototype.gte = function (l) {
    return this.value.gte(this.T.getValue(l));
};

Bridge.Long.prototype.equals = function (l) {
    return this.value.eq(this.T.getValue(l));
};

Bridge.Long.prototype.equalsT = function (l) {
    return this.equals(l);
};

Bridge.Long.prototype.getHashCode = function () {
    var n = (this.sign() * 397 + this.value.high) | 0;
    n = (n * 397 + this.value.low) | 0;

    return n;
};

Bridge.Long.prototype.toNumber = function () {
    return this.value.toNumber();
};

Bridge.Long.parse = function (str) {
    if (str == null) {
        throw new Bridge.ArgumentNullException("str");
    }

    if (!/^[+-]?[0-9]+$/.test(str)) {
        throw new Bridge.FormatException("Input string was not in a correct format.");
    }

    var result = new Bridge.Long(str);

    if (str !== result.toString()) {
        throw new Bridge.OverflowException();
    }

    return result;
};

Bridge.Long.tryParse = function (str, v) {
    try {
        if (str == null || !/^[+-]?[0-9]+$/.test(str)) {
            v.v = Bridge.Long(Bridge.$Long.ZERO);
            return false;
        }

        v.v = new Bridge.Long(str);

        if (str !== v.v.toString()) {
            v.v = Bridge.Long(Bridge.$Long.ZERO);
            return false;
        }

        return true;
    } catch (e) {
        v.v = Bridge.Long(Bridge.$Long.ZERO);
        return false;
    }
};

Bridge.Long.divRem = function (a, b, result) {
    a = Bridge.Long(a);
    b = Bridge.Long(b);
    var remainder = a.mod(b);
    result.v = remainder;
    return a.sub(remainder).div(b);
};

Bridge.Long.min = function () {
    var values = [],
        min, i, len;

    for (i = 0, len = arguments.length; i < len; i++) {
        values.push(Bridge.Long.getValue(arguments[i]));
    }

    i = 0;
    min = values[0];
    for (; ++i < values.length;) {
        if (values[i].lt(min)) {
            min = values[i];
        }
    }

    return new Bridge.Long(min);
};

Bridge.Long.max = function () {
    var values = [],
        max, i, len;

    for (i = 0, len = arguments.length; i < len; i++) {
        values.push(Bridge.Long.getValue(arguments[i]));
    }

    i = 0;
    max = values[0];
    for (; ++i < values.length;) {
        if (values[i].gt(max)) {
            max = values[i];
        }
    }

    return new Bridge.Long(max);
};

Bridge.Long.prototype.and = function (l) {
    return new this.T(this.value.and(this.T.getValue(l)));
};

Bridge.Long.prototype.not = function () {
    return new this.T(this.value.not());
};

Bridge.Long.prototype.or = function (l) {
    return new this.T(this.value.or(this.T.getValue(l)));
};

Bridge.Long.prototype.shl = function (l) {
    return new this.T(this.value.shl(l));
};

Bridge.Long.prototype.shr = function (l) {
    return new this.T(this.value.shr(l));
};

Bridge.Long.prototype.shru = function (l) {
    return new this.T(this.value.shru(l));
};

Bridge.Long.prototype.xor = function (l) {
    return new this.T(this.value.xor(this.T.getValue(l)));
};

Bridge.Long.check = function (v, tp) {
    if (Bridge.Int.isInfinite(v)) {
        if (tp === Bridge.Long || tp === Bridge.ULong) {
            return tp.MinValue;
        }
        return tp.min;
    }

    if (!v) {
        return null;
    }

    var str, r;
    if (tp === Bridge.Long) {
        if (v instanceof Bridge.Long) {
            return v;
        }

        str = v.value.toString();
        r = new Bridge.Long(str);

        if (str !== r.value.toString()) {
            throw new Bridge.OverflowException();
        }

        return r;
    }

    if (tp === Bridge.ULong) {
        if (v instanceof Bridge.ULong) {
            return v;
        }

        if (v.value.isNegative()) {
            throw new Bridge.OverflowException();
        }
        str = v.value.toString();
        r = new Bridge.ULong(str);

        if (str !== r.value.toString()) {
            throw new Bridge.OverflowException();
        }

        return r;
    }

    return Bridge.Int.check(v.toNumber(), tp);
};

Bridge.Long.clip8 = function (x) {
    return x ? Bridge.Int.sxb(x.toNumber() & 0xff) : (Bridge.Int.isInfinite(x) ? Bridge.SByte.min : null);
};

Bridge.Long.clipu8 = function (x) {
    return x ? x.toNumber() & 0xff : (Bridge.Int.isInfinite(x) ? Bridge.Byte.min : null);
};

Bridge.Long.clip16 = function (x) {
    return x ? Bridge.Int.sxs(x.toNumber() & 0xffff) : (Bridge.Int.isInfinite(x) ? Bridge.Int16.min : null);
};

Bridge.Long.clipu16 = function (x) {
    return x ? x.toNumber() & 0xffff : (Bridge.Int.isInfinite(x) ? Bridge.UInt16.min : null);
};

Bridge.Long.clip32 = function (x) {
    return x ? x.toNumber() | 0 : (Bridge.Int.isInfinite(x) ? Bridge.Int32.min : null);
};

Bridge.Long.clipu32 = function (x) {
    return x ? x.toNumber() >>> 0 : (Bridge.Int.isInfinite(x) ? Bridge.UInt32.min : null);
};

Bridge.Long.clip64 = function (x) {
    return x ? new Bridge.Long(x.value.toSigned()) : (Bridge.Int.isInfinite(x) ? Bridge.Long.MinValue : null);
};

Bridge.Long.clipu64 = function (x) {
    return x ? new Bridge.ULong(x.value.toUnsigned()) : (Bridge.Int.isInfinite(x) ? Bridge.ULong.MinValue : null);
};

Bridge.Long.Zero = Bridge.Long(Bridge.$Long.ZERO);
Bridge.Long.MinValue = Bridge.Long(Bridge.$Long.MIN_VALUE);
Bridge.Long.MaxValue = Bridge.Long(Bridge.$Long.MAX_VALUE);


/* ULONG */


Bridge.ULong = function (l) {
    if (this.constructor !== Bridge.ULong) {
        return new Bridge.ULong(l);
    }

    if (!Bridge.hasValue(l)) {
        l = 0;
    }

    this.T = Bridge.ULong;
    this.unsigned = true;
    this.value = Bridge.ULong.getValue(l, true);
}

Bridge.ULong.$$name = "Bridge.ULong";
Bridge.ULong.prototype.$$name = "Bridge.ULong";
Bridge.ULong.$$inherits = [];
Bridge.Class.addExtend(Bridge.ULong, [Bridge.IComparable, Bridge.IFormattable, Bridge.IComparable$1(Bridge.ULong), Bridge.IEquatable$1(Bridge.ULong)]);

Bridge.ULong.instanceOf = function (instance) {
    return instance instanceof Bridge.ULong;
};

Bridge.ULong.getDefaultValue = function () {
    return Bridge.ULong.Zero;
};

Bridge.ULong.getValue = function (l) {
    if (!Bridge.hasValue(l)) {
        return null;
    }

    if (l instanceof Bridge.$Long) {
        return l;
    }

    if (l instanceof Bridge.ULong) {
        return l.value;
    }

    if (l instanceof Bridge.Long) {
        return l.value.toUnsigned();
    }

    if (Bridge.isArray(l)) {
        return new Bridge.$Long(l[0], l[1], true);
    }

    if (Bridge.isString(l)) {
        return Bridge.$Long.fromString(l, true);
    }

    if (Bridge.isNumber(l)) {
        return Bridge.$Long.fromNumber(l, true);
    }

    if (l instanceof Bridge.Decimal) {
        return Bridge.$Long.fromString(l.toString(), true);
    }

    return Bridge.$Long.fromValue(l);
};

Bridge.ULong.create = function (l) {
    if (!Bridge.hasValue(l)) {
        return null;
    }

    if (l instanceof Bridge.ULong) {
        return l;
    }

    return new Bridge.ULong(l);
};

Bridge.ULong.lift = function (l) {
    if (!Bridge.hasValue(l)) {
        return null;
    }
    return Bridge.ULong.create(l);
};

Bridge.ULong.prototype.toJSON = Bridge.Long.prototype.toJSON;
Bridge.ULong.prototype.toString = Bridge.Long.prototype.toString;
Bridge.ULong.prototype.format = Bridge.Long.prototype.format;
Bridge.ULong.prototype.isNegative = Bridge.Long.prototype.isNegative;
Bridge.ULong.prototype.abs = Bridge.Long.prototype.abs;
Bridge.ULong.prototype.compareTo = Bridge.Long.prototype.compareTo;
Bridge.ULong.prototype.add = Bridge.Long.prototype.add;
Bridge.ULong.prototype.sub = Bridge.Long.prototype.sub;
Bridge.ULong.prototype.isZero = Bridge.Long.prototype.isZero;
Bridge.ULong.prototype.mul = Bridge.Long.prototype.mul;
Bridge.ULong.prototype.div = Bridge.Long.prototype.div;
Bridge.ULong.prototype.toNumberDivided = Bridge.Long.prototype.toNumberDivided;
Bridge.ULong.prototype.mod = Bridge.Long.prototype.mod;
Bridge.ULong.prototype.neg = Bridge.Long.prototype.neg;
Bridge.ULong.prototype.inc = Bridge.Long.prototype.inc;
Bridge.ULong.prototype.dec = Bridge.Long.prototype.dec;
Bridge.ULong.prototype.sign = Bridge.Long.prototype.sign;
Bridge.ULong.prototype.clone = Bridge.Long.prototype.clone;
Bridge.ULong.prototype.ne = Bridge.Long.prototype.ne;
Bridge.ULong.prototype.neq = Bridge.Long.prototype.neq;
Bridge.ULong.prototype.eq = Bridge.Long.prototype.eq;
Bridge.ULong.prototype.lt = Bridge.Long.prototype.lt;
Bridge.ULong.prototype.lte = Bridge.Long.prototype.lte;
Bridge.ULong.prototype.gt = Bridge.Long.prototype.gt;
Bridge.ULong.prototype.gte = Bridge.Long.prototype.gte;
Bridge.ULong.prototype.equals = Bridge.Long.prototype.equals;
Bridge.ULong.prototype.equalsT = Bridge.Long.prototype.equalsT;
Bridge.ULong.prototype.getHashCode = Bridge.Long.prototype.getHashCode;
Bridge.ULong.prototype.toNumber = Bridge.Long.prototype.toNumber;

Bridge.ULong.parse = function (str) {
    if (str == null) {
        throw new Bridge.ArgumentNullException("str");
    }

    if (!/^[+-]?[0-9]+$/.test(str)) {
        throw new Bridge.FormatException("Input string was not in a correct format.");
    }

    var result = new Bridge.ULong(str);

    if (result.value.isNegative()) {
        throw new Bridge.OverflowException();
    }

    if (str !== result.toString()) {
        throw new Bridge.OverflowException();
    }

    return result;
};

Bridge.ULong.tryParse = function (str, v) {
    try {
        if (str == null || !/^[+-]?[0-9]+$/.test(str)) {
            v.v = Bridge.ULong(Bridge.$Long.UZERO);
            return false;
        }

        v.v = new Bridge.ULong(str);

        if (v.v.isNegative()) {
            v.v = Bridge.ULong(Bridge.$Long.UZERO);
            return false;
        }

        if (str !== v.v.toString()) {
            v.v = Bridge.ULong(Bridge.$Long.UZERO);
            return false;
        }

        return true;
    } catch (e) {
        v.v = Bridge.ULong(Bridge.$Long.UZERO);
        return false;
    }
};

Bridge.ULong.min = function () {
    var values = [],
        min, i, len;

    for (i = 0, len = arguments.length; i < len; i++) {
        values.push(Bridge.ULong.getValue(arguments[i]));
    }

    i = 0;
    min = values[0];
    for (; ++i < values.length;) {
        if (values[i].lt(min)) {
            min = values[i];
        }
    }

    return new Bridge.ULong(min);
};

Bridge.ULong.max = function () {
    var values = [],
        max, i, len;

    for (i = 0, len = arguments.length; i < len; i++) {
        values.push(Bridge.ULong.getValue(arguments[i]));
    }

    i = 0;
    max = values[0];
    for (; ++i < values.length;) {
        if (values[i].gt(max)) {
            max = values[i];
        }
    }

    return new Bridge.ULong(max);
};

Bridge.ULong.divRem = function (a, b, result) {
    a = Bridge.ULong(a);
    b = Bridge.ULong(b);
    var remainder = a.mod(b);
    result.v = remainder;
    return a.sub(remainder).div(b);
};

Bridge.ULong.prototype.and = Bridge.Long.prototype.and;
Bridge.ULong.prototype.not = Bridge.Long.prototype.not;
Bridge.ULong.prototype.or = Bridge.Long.prototype.or;
Bridge.ULong.prototype.shl = Bridge.Long.prototype.shl;
Bridge.ULong.prototype.shr = Bridge.Long.prototype.shr;
Bridge.ULong.prototype.shru = Bridge.Long.prototype.shru;
Bridge.ULong.prototype.xor = Bridge.Long.prototype.xor;

Bridge.ULong.Zero = Bridge.ULong(Bridge.$Long.UZERO);
Bridge.ULong.MinValue = Bridge.ULong.Zero;
Bridge.ULong.MaxValue = Bridge.ULong(Bridge.$Long.MAX_UNSIGNED_VALUE);

    // @source Decimal.js

    /* decimal.js v5.0.7 https://github.com/MikeMcl/decimal.js/LICENCE */

    !function (n) { "use strict"; function e(n) { var e, i, t, r = n.length - 1, s = "", o = n[0]; if (r > 0) { for (s += o, e = 1; r > e; e++) t = n[e] + "", i = Sn - t.length, i && (s += l(i)), s += t; o = n[e], t = o + "", i = Sn - t.length, i && (s += l(i)) } else if (0 === o) return "0"; for (; o % 10 === 0;) o /= 10; return s + o } function i(n, e, i) { if (n !== ~~n || e > n || n > i) throw Error(yn + n) } function t(n, e, i, t) { var r, s, o, u; for (s = n[0]; s >= 10; s /= 10)--e; return --e < 0 ? (e += Sn, r = 0) : (r = Math.ceil((e + 1) / Sn), e %= Sn), s = qn(10, Sn - e), u = n[r] % s | 0, null == t ? 3 > e ? (0 == e ? u = u / 100 | 0 : 1 == e && (u = u / 10 | 0), o = 4 > i && 99999 == u || i > 3 && 49999 == u || 5e4 == u || 0 == u) : o = (4 > i && u + 1 == s || i > 3 && u + 1 == s / 2) && (n[r + 1] / s / 100 | 0) == qn(10, e - 2) - 1 || (u == s / 2 || 0 == u) && 0 == (n[r + 1] / s / 100 | 0) : 4 > e ? (0 == e ? u = u / 1e3 | 0 : 1 == e ? u = u / 100 | 0 : 2 == e && (u = u / 10 | 0), o = (t || 4 > i) && 9999 == u || !t && i > 3 && 4999 == u) : o = ((t || 4 > i) && u + 1 == s || !t && i > 3 && u + 1 == s / 2) && (n[r + 1] / s / 1e3 | 0) == qn(10, e - 3) - 1, o } function r(n, e, i) { for (var t, r, s = [0], o = 0, u = n.length; u > o;) { for (r = s.length; r--;) s[r] *= e; for (s[0] += mn.indexOf(n.charAt(o++)), t = 0; t < s.length; t++) s[t] > i - 1 && (void 0 === s[t + 1] && (s[t + 1] = 0), s[t + 1] += s[t] / i | 0, s[t] %= i) } return s.reverse() } function s(n, e) { var i, t, r = e.d.length; 32 > r ? (i = Math.ceil(r / 3), t = Math.pow(4, -i).toString()) : (i = 16, t = "2.3283064365386962890625e-10"), n.precision += i, e = E(n, 1, e.times(t), new n(1)); for (var s = i; s--;) { var o = e.times(e); e = o.times(o).minus(o).times(8).plus(1) } return n.precision -= i, e } function o(n, e, i, t) { var r, s, o, u, c, f, h, a, l, d = n.constructor; n: if (null != e) { if (a = n.d, !a) return n; for (r = 1, u = a[0]; u >= 10; u /= 10) r++; if (s = e - r, 0 > s) s += Sn, o = e, h = a[l = 0], c = h / qn(10, r - o - 1) % 10 | 0; else if (l = Math.ceil((s + 1) / Sn), u = a.length, l >= u) { if (!t) break n; for (; u++ <= l;) a.push(0); h = c = 0, r = 1, s %= Sn, o = s - Sn + 1 } else { for (h = u = a[l], r = 1; u >= 10; u /= 10) r++; s %= Sn, o = s - Sn + r, c = 0 > o ? 0 : h / qn(10, r - o - 1) % 10 | 0 } if (t = t || 0 > e || void 0 !== a[l + 1] || (0 > o ? h : h % qn(10, r - o - 1)), f = 4 > i ? (c || t) && (0 == i || i == (n.s < 0 ? 3 : 2)) : c > 5 || 5 == c && (4 == i || t || 6 == i && (s > 0 ? o > 0 ? h / qn(10, r - o) : 0 : a[l - 1]) % 10 & 1 || i == (n.s < 0 ? 8 : 7)), 1 > e || !a[0]) return a.length = 0, f ? (e -= n.e + 1, a[0] = qn(10, (Sn - e % Sn) % Sn), n.e = -e || 0) : a[0] = n.e = 0, n; if (0 == s ? (a.length = l, u = 1, l--) : (a.length = l + 1, u = qn(10, Sn - s), a[l] = o > 0 ? (h / qn(10, r - o) % qn(10, o) | 0) * u : 0), f) for (; ;) { if (0 == l) { for (s = 1, o = a[0]; o >= 10; o /= 10) s++; for (o = a[0] += u, u = 1; o >= 10; o /= 10) u++; s != u && (n.e++, a[0] == Rn && (a[0] = 1)); break } if (a[l] += u, a[l] != Rn) break; a[l--] = 0, u = 1 } for (s = a.length; 0 === a[--s];) a.pop() } return En && (n.e > d.maxE ? (n.d = null, n.e = NaN) : n.e < d.minE && (n.e = 0, n.d = [0])), n } function u(n, i, t) { if (!n.isFinite()) return v(n); var r, s = n.e, o = e(n.d), u = o.length; return i ? (t && (r = t - u) > 0 ? o = o.charAt(0) + "." + o.slice(1) + l(r) : u > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (n.e < 0 ? "e" : "e+") + n.e) : 0 > s ? (o = "0." + l(-s - 1) + o, t && (r = t - u) > 0 && (o += l(r))) : s >= u ? (o += l(s + 1 - u), t && (r = t - s - 1) > 0 && (o = o + "." + l(r))) : ((r = s + 1) < u && (o = o.slice(0, r) + "." + o.slice(r)), t && (r = t - u) > 0 && (s + 1 === u && (o += "."), o += l(r))), o } function c(n, e) { for (var i = 1, t = n[0]; t >= 10; t /= 10) i++; return i + e * Sn - 1 } function f(n, e, i) { if (e > Un) throw En = !0, i && (n.precision = i), Error(An); return o(new n(vn), e, 1, !0) } function h(n, e, i) { if (e > _n) throw Error(An); return o(new n(Nn), e, i, !0) } function a(n) { var e = n.length - 1, i = e * Sn + 1; if (e = n[e]) { for (; e % 10 == 0; e /= 10) i--; for (e = n[0]; e >= 10; e /= 10) i++ } return i } function l(n) { for (var e = ""; n--;) e += "0"; return e } function d(n, e, i, t) { var r, s = new n(1), o = Math.ceil(t / Sn + 4); for (En = !1; ;) { if (i % 2 && (s = s.times(e), A(s.d, o) && (r = !0)), i = On(i / 2), 0 === i) { i = s.d.length - 1, r && 0 === s.d[i] && ++s.d[i]; break } e = e.times(e), A(e.d, o) } return En = !0, s } function g(n) { return 1 & n.d[n.d.length - 1] } function p(n, e, i) { for (var t, r = new n(e[0]), s = 0; ++s < e.length;) { if (t = new n(e[s]), !t.s) { r = t; break } r[i](t) && (r = t) } return r } function w(n, i) { var r, s, u, c, f, h, a, l = 0, d = 0, g = 0, p = n.constructor, w = p.rounding, m = p.precision; if (!n.d || !n.d[0] || n.e > 17) return new p(n.d ? n.d[0] ? n.s < 0 ? 0 : 1 / 0 : 1 : n.s ? n.s < 0 ? 0 : n : NaN); for (null == i ? (En = !1, a = m) : a = i, h = new p(.03125) ; n.e > -2;) n = n.times(h), g += 5; for (s = Math.log(qn(2, g)) / Math.LN10 * 2 + 5 | 0, a += s, r = c = f = new p(1), p.precision = a; ;) { if (c = o(c.times(n), a, 1), r = r.times(++d), h = f.plus(Tn(c, r, a, 1)), e(h.d).slice(0, a) === e(f.d).slice(0, a)) { for (u = g; u--;) f = o(f.times(f), a, 1); if (null != i) return p.precision = m, f; if (!(3 > l && t(f.d, a - s, w, l))) return o(f, p.precision = m, w, En = !0); p.precision = a += 10, r = c = h = new p(1), d = 0, l++ } f = h } } function m(n, i) { var r, s, u, c, h, a, l, d, g, p, w, v = 1, N = 10, x = n, b = x.d, E = x.constructor, M = E.rounding, y = E.precision; if (x.s < 0 || !b || !b[0] || !x.e && 1 == b[0] && 1 == b.length) return new E(b && !b[0] ? -1 / 0 : 1 != x.s ? NaN : b ? 0 : x); if (null == i ? (En = !1, g = y) : g = i, E.precision = g += N, r = e(b), s = r.charAt(0), !(Math.abs(c = x.e) < 15e14)) return d = f(E, g + 2, y).times(c + ""), x = m(new E(s + "." + r.slice(1)), g - N).plus(d), E.precision = y, null == i ? o(x, y, M, En = !0) : x; for (; 7 > s && 1 != s || 1 == s && r.charAt(1) > 3;) x = x.times(n), r = e(x.d), s = r.charAt(0), v++; for (c = x.e, s > 1 ? (x = new E("0." + r), c++) : x = new E(s + "." + r.slice(1)), p = x, l = h = x = Tn(x.minus(1), x.plus(1), g, 1), w = o(x.times(x), g, 1), u = 3; ;) { if (h = o(h.times(w), g, 1), d = l.plus(Tn(h, new E(u), g, 1)), e(d.d).slice(0, g) === e(l.d).slice(0, g)) { if (l = l.times(2), 0 !== c && (l = l.plus(f(E, g + 2, y).times(c + ""))), l = Tn(l, new E(v), g, 1), null != i) return E.precision = y, l; if (!t(l.d, g - N, M, a)) return o(l, E.precision = y, M, En = !0); E.precision = g += N, d = h = x = Tn(p.minus(1), p.plus(1), g, 1), w = o(x.times(x), g, 1), u = a = 1 } l = d, u += 2 } } function v(n) { return String(n.s * n.s / 0) } function N(n, e) { var i, t, r; for ((i = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (t = e.search(/e/i)) > 0 ? (0 > i && (i = t), i += +e.slice(t + 1), e = e.substring(0, t)) : 0 > i && (i = e.length), t = 0; 48 === e.charCodeAt(t) ; t++); for (r = e.length; 48 === e.charCodeAt(r - 1) ; --r); if (e = e.slice(t, r)) { if (r -= t, n.e = i = i - t - 1, n.d = [], t = (i + 1) % Sn, 0 > i && (t += Sn), r > t) { for (t && n.d.push(+e.slice(0, t)), r -= Sn; r > t;) n.d.push(+e.slice(t, t += Sn)); e = e.slice(t), t = Sn - e.length } else t -= r; for (; t--;) e += "0"; n.d.push(+e), En && (n.e > n.constructor.maxE ? (n.d = null, n.e = NaN) : n.e < n.constructor.minE && (n.e = 0, n.d = [0])) } else n.e = 0, n.d = [0]; return n } function x(n, e) { var i, t, s, o, u, f, h, a, l; if ("Infinity" === e || "NaN" === e) return +e || (n.s = NaN), n.e = NaN, n.d = null, n; if (Dn.test(e)) i = 16, e = e.toLowerCase(); else if (Fn.test(e)) i = 2; else { if (!Zn.test(e)) throw Error(yn + e); i = 8 } for (o = e.search(/p/i), o > 0 ? (h = +e.slice(o + 1), e = e.substring(2, o)) : e = e.slice(2), o = e.indexOf("."), u = o >= 0, t = n.constructor, u && (e = e.replace(".", ""), f = e.length, o = f - o, s = d(t, new t(i), o, 2 * o)), a = r(e, i, Rn), l = a.length - 1, o = l; 0 === a[o]; --o) a.pop(); return 0 > o ? new t(0 * n.s) : (n.e = c(a, l), n.d = a, En = !1, u && (n = Tn(n, s, 4 * f)), h && (n = n.times(Math.abs(h) < 54 ? Math.pow(2, h) : xn.pow(2, h))), En = !0, n) } function b(n, e) { var i, t = e.d.length; if (3 > t) return E(n, 2, e, e); i = 1.4 * Math.sqrt(t), i = i > 16 ? 16 : 0 | i, e = e.times(Math.pow(5, -i)), e = E(n, 2, e, e); for (var r, s = new n(5), o = new n(16), u = new n(20) ; i--;) r = e.times(e), e = e.times(s.plus(r.times(o.times(r).minus(u)))); return e } function E(n, e, i, t, r) { var s, o, u, c, f = 1, h = n.precision, a = Math.ceil(h / Sn); for (En = !1, c = i.times(i), u = new n(t) ; ;) { if (o = Tn(u.times(c), new n(e++ * e++), h, 1), u = r ? t.plus(o) : t.minus(o), t = Tn(o.times(c), new n(e++ * e++), h, 1), o = u.plus(t), void 0 !== o.d[a]) { for (s = a; o.d[s] === u.d[s] && s--;); if (-1 == s) break } s = u, u = t, t = o, o = s, f++ } return En = !0, o.d.length = a + 1, o } function M(n, e) { var i, t = e.s < 0, r = h(n, n.precision, 1), s = r.times(.5); if (e = e.abs(), e.lte(s)) return gn = t ? 4 : 1, e; if (i = e.divToInt(r), i.isZero()) gn = t ? 3 : 2; else { if (e = e.minus(i.times(r)), e.lte(s)) return gn = g(i) ? t ? 2 : 3 : t ? 4 : 1, e; gn = g(i) ? t ? 1 : 4 : t ? 3 : 2 } return e.minus(r).abs() } function y(n, e, t, s) { var o, c, f, h, a, l, d, g, p, w = n.constructor, m = void 0 !== t; if (m ? (i(t, 1, wn), void 0 === s ? s = w.rounding : i(s, 0, 8)) : (t = w.precision, s = w.rounding), n.isFinite()) { for (d = u(n), f = d.indexOf("."), m ? (o = 2, 16 == e ? t = 4 * t - 3 : 8 == e && (t = 3 * t - 2)) : o = e, f >= 0 && (d = d.replace(".", ""), p = new w(1), p.e = d.length - f, p.d = r(u(p), 10, o), p.e = p.d.length), g = r(d, 10, o), c = a = g.length; 0 == g[--a];) g.pop(); if (g[0]) { if (0 > f ? c-- : (n = new w(n), n.d = g, n.e = c, n = Tn(n, p, t, s, 0, o), g = n.d, c = n.e, l = ln), f = g[t], h = o / 2, l = l || void 0 !== g[t + 1], l = 4 > s ? (void 0 !== f || l) && (0 === s || s === (n.s < 0 ? 3 : 2)) : f > h || f === h && (4 === s || l || 6 === s && 1 & g[t - 1] || s === (n.s < 0 ? 8 : 7)), g.length = t, l) for (; ++g[--t] > o - 1;) g[t] = 0, t || (++c, g.unshift(1)); for (a = g.length; !g[a - 1]; --a); for (f = 0, d = ""; a > f; f++) d += mn.charAt(g[f]); if (m) { if (a > 1) if (16 == e || 8 == e) { for (f = 16 == e ? 4 : 3, --a; a % f; a++) d += "0"; for (g = r(d, o, e), a = g.length; !g[a - 1]; --a); for (f = 1, d = "1."; a > f; f++) d += mn.charAt(g[f]) } else d = d.charAt(0) + "." + d.slice(1); d = d + (0 > c ? "p" : "p+") + c } else if (0 > c) { for (; ++c;) d = "0" + d; d = "0." + d } else if (++c > a) for (c -= a; c--;) d += "0"; else a > c && (d = d.slice(0, c) + "." + d.slice(c)) } else d = m ? "0p+0" : "0"; d = (16 == e ? "0x" : 2 == e ? "0b" : 8 == e ? "0o" : "") + d } else d = v(n); return n.s < 0 ? "-" + d : d } function A(n, e) { return n.length > e ? (n.length = e, !0) : void 0 } function O(n) { return new this(n).abs() } function q(n) { return new this(n).acos() } function F(n) { return new this(n).acosh() } function D(n, e) { return new this(n).plus(e) } function Z(n) { return new this(n).asin() } function P(n) { return new this(n).asinh() } function R(n) { return new this(n).atan() } function S(n) { return new this(n).atanh() } function L(n, e) { n = new this(n), e = new this(e); var i, t = this.precision, r = this.rounding, s = t + 4; return n.s && e.s ? n.d || e.d ? !e.d || n.isZero() ? (i = e.s < 0 ? h(this, t, r) : new this(0), i.s = n.s) : !n.d || e.isZero() ? (i = h(this, s, 1).times(.5), i.s = n.s) : e.s < 0 ? (this.precision = s, this.rounding = 1, i = this.atan(Tn(n, e, s, 1)), e = h(this, s, 1), this.precision = t, this.rounding = r, i = n.s < 0 ? i.minus(e) : i.plus(e)) : i = this.atan(Tn(n, e, s, 1)) : (i = h(this, s, 1).times(e.s > 0 ? .25 : .75), i.s = n.s) : i = new this(NaN), i } function U(n) { return new this(n).cbrt() } function _(n) { return o(n = new this(n), n.e + 1, 2) } function k(n) { if (!n || "object" != typeof n) throw Error(Mn + "Object expected"); var e, i, t, r = ["precision", 1, wn, "rounding", 0, 8, "toExpNeg", -pn, 0, "toExpPos", 0, pn, "maxE", 0, pn, "minE", -pn, 0, "modulo", 0, 9]; for (e = 0; e < r.length; e += 3) if (void 0 !== (t = n[i = r[e]])) { if (!(On(t) === t && t >= r[e + 1] && t <= r[e + 2])) throw Error(yn + i + ": " + t); this[i] = t } if (n.hasOwnProperty(i = "crypto")) if (void 0 === (t = n[i])) this[i] = t; else { if (t !== !0 && t !== !1 && 0 !== t && 1 !== t) throw Error(yn + i + ": " + t); this[i] = !(!t || !bn || !bn.getRandomValues && !bn.randomBytes) } return this } function T(n) { return new this(n).cos() } function C(n) { return new this(n).cosh() } function I(n) { function e(n) { var i, t, r, s = this; if (!(s instanceof e)) return new e(n); if (s.constructor = e, n instanceof e) return s.s = n.s, s.e = n.e, void (s.d = (n = n.d) ? n.slice() : n); if (r = typeof n, "number" === r) { if (0 === n) return s.s = 0 > 1 / n ? -1 : 1, s.e = 0, void (s.d = [0]); if (0 > n ? (n = -n, s.s = -1) : s.s = 1, n === ~~n && 1e7 > n) { for (i = 0, t = n; t >= 10; t /= 10) i++; return s.e = i, void (s.d = [n]) } return 0 * n !== 0 ? (n || (s.s = NaN), s.e = NaN, void (s.d = null)) : N(s, n.toString()) } if ("string" !== r) throw Error(yn + n); return 45 === n.charCodeAt(0) ? (n = n.slice(1), s.s = -1) : s.s = 1, Pn.test(n) ? N(s, n) : x(s, n) } var i, t, r; if (e.prototype = kn, e.ROUND_UP = 0, e.ROUND_DOWN = 1, e.ROUND_CEIL = 2, e.ROUND_FLOOR = 3, e.ROUND_HALF_UP = 4, e.ROUND_HALF_DOWN = 5, e.ROUND_HALF_EVEN = 6, e.ROUND_HALF_CEIL = 7, e.ROUND_HALF_FLOOR = 8, e.EUCLID = 9, e.config = k, e.clone = I, e.abs = O, e.acos = q, e.acosh = F, e.add = D, e.asin = Z, e.asinh = P, e.atan = R, e.atanh = S, e.atan2 = L, e.cbrt = U, e.ceil = _, e.cos = T, e.cosh = C, e.div = H, e.exp = B, e.floor = V, e.fromJSON = j, e.hypot = $, e.ln = J, e.log = W, e.log10 = G, e.log2 = z, e.max = K, e.min = Q, e.mod = X, e.mul = Y, e.pow = nn, e.random = en, e.round = tn, e.sign = rn, e.sin = sn, e.sinh = on, e.sqrt = un, e.sub = cn, e.tan = fn, e.tanh = hn, e.trunc = an, void 0 === n && (n = {}), n) for (r = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], i = 0; i < r.length;) n.hasOwnProperty(t = r[i++]) || (n[t] = this[t]); return e.config(n), e } function H(n, e) { return new this(n).div(e) } function B(n) { return new this(n).exp() } function V(n) { return o(n = new this(n), n.e + 1, 3) } function j(n) { var e, i, t, s; if ("string" != typeof n || !n) throw Error(yn + n); if (t = n.length, s = mn.indexOf(n.charAt(0)), 1 === t) return new this(s > 81 ? [-1 / 0, 1 / 0, NaN][s - 82] : s > 40 ? -(s - 41) : s); if (64 & s) i = 16 & s, e = i ? (7 & s) - 3 : (15 & s) - 7, t = 1; else { if (2 === t) return s = 88 * s + mn.indexOf(n.charAt(1)), new this(s >= 2816 ? -(s - 2816) - 41 : s + 41); if (i = 32 & s, !(31 & s)) return n = r(n.slice(1), 88, 10).join(""), new this(i ? "-" + n : n); e = 15 & s, t = e + 1, e = 1 === e ? mn.indexOf(n.charAt(1)) : 2 === e ? 88 * mn.indexOf(n.charAt(1)) + mn.indexOf(n.charAt(2)) : +r(n.slice(1, t), 88, 10).join(""), 16 & s && (e = -e) } return n = r(n.slice(t), 88, 10).join(""), e = e - n.length + 1, n = n + "e" + e, new this(i ? "-" + n : n) } function $() { var n, e, i = new this(0); for (En = !1, n = 0; n < arguments.length;) if (e = new this(arguments[n++]), e.d) i.d && (i = i.plus(e.times(e))); else { if (e.s) return En = !0, new this(1 / 0); i = e } return En = !0, i.sqrt() } function J(n) { return new this(n).ln() } function W(n, e) { return new this(n).log(e) } function z(n) { return new this(n).log(2) } function G(n) { return new this(n).log(10) } function K() { return p(this, arguments, "lt") } function Q() { return p(this, arguments, "gt") } function X(n, e) { return new this(n).mod(e) } function Y(n, e) { return new this(n).mul(e) } function nn(n, e) { return new this(n).pow(e) } function en(n) { var e, t, r, s, o = 0, u = new this(1), c = []; if (void 0 === n ? n = this.precision : i(n, 1, wn), r = Math.ceil(n / Sn), this.crypto === !1) for (; r > o;) c[o++] = 1e7 * Math.random() | 0; else if (bn && bn.getRandomValues) for (e = bn.getRandomValues(new Uint32Array(r)) ; r > o;) s = e[o], s >= 429e7 ? e[o] = bn.getRandomValues(new Uint32Array(1))[0] : c[o++] = s % 1e7; else if (bn && bn.randomBytes) { for (e = bn.randomBytes(r *= 4) ; r > o;) s = e[o] + (e[o + 1] << 8) + (e[o + 2] << 16) + ((127 & e[o + 3]) << 24), s >= 214e7 ? bn.randomBytes(4).copy(e, o) : (c.push(s % 1e7), o += 4); o = r / 4 } else { if (this.crypto) throw Error(Mn + "crypto unavailable"); for (; r > o;) c[o++] = 1e7 * Math.random() | 0 } for (r = c[--o], n %= Sn, r && n && (s = qn(10, Sn - n), c[o] = (r / s | 0) * s) ; 0 === c[o]; o--) c.pop(); if (0 > o) t = 0, c = [0]; else { for (t = -1; 0 === c[0]; t -= Sn) c.shift(); for (r = 1, s = c[0]; s >= 10; s /= 10) r++; Sn > r && (t -= Sn - r) } return u.e = t, u.d = c, u } function tn(n) { return o(n = new this(n), n.e + 1, this.rounding) } function rn(n) { return n = new this(n), n.d ? n.d[0] ? n.s : 0 * n.s : n.s || NaN } function sn(n) { return new this(n).sin() } function on(n) { return new this(n).sinh() } function un(n) { return new this(n).sqrt() } function cn(n, e) { return new this(n).sub(e) } function fn(n) { return new this(n).tan() } function hn(n) { return new this(n).tanh() } function an(n) { return o(n = new this(n), n.e + 1, 1) } var ln, dn, gn, pn = 9e15, wn = 1e9, mn = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%()*+,-./:;=?@[]^_`{|}~", vn = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", Nn = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", xn = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -pn, maxE: pn, crypto: void 0 }, bn = "undefined" != typeof crypto ? crypto : null, En = !0, Mn = "[DecimalError] ", yn = Mn + "Invalid argument: ", An = Mn + "Precision limit exceeded", On = Math.floor, qn = Math.pow, Fn = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, Dn = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, Zn = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, Pn = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Rn = 1e7, Sn = 7, Ln = 9007199254740991, Un = vn.length - 1, _n = Nn.length - 1, kn = {}; kn.absoluteValue = kn.abs = function () { var n = new this.constructor(this); return n.s < 0 && (n.s = 1), o(n) }, kn.ceil = function () { return o(new this.constructor(this), this.e + 1, 2) }, kn.comparedTo = kn.cmp = function (n) { var e, i, t, r, s = this, o = s.d, u = (n = new s.constructor(n)).d, c = s.s, f = n.s; if (!o || !u) return c && f ? c !== f ? c : o === u ? 0 : !o ^ 0 > c ? 1 : -1 : NaN; if (!o[0] || !u[0]) return o[0] ? c : u[0] ? -f : 0; if (c !== f) return c; if (s.e !== n.e) return s.e > n.e ^ 0 > c ? 1 : -1; for (t = o.length, r = u.length, e = 0, i = r > t ? t : r; i > e; ++e) if (o[e] !== u[e]) return o[e] > u[e] ^ 0 > c ? 1 : -1; return t === r ? 0 : t > r ^ 0 > c ? 1 : -1 }, kn.cosine = kn.cos = function () { var n, e, i = this, t = i.constructor; return i.d ? i.d[0] ? (n = t.precision, e = t.rounding, t.precision = n + Math.max(i.e, i.sd()) + Sn, t.rounding = 1, i = s(t, M(t, i)), t.precision = n, t.rounding = e, o(2 == gn || 3 == gn ? i.neg() : i, n, e, !0)) : new t(1) : new t(NaN) }, kn.cubeRoot = kn.cbrt = function () { var n, i, t, r, s, u, c, f, h, a, l = this, d = l.constructor; if (!l.isFinite() || l.isZero()) return new d(l); for (En = !1, u = l.s * Math.pow(l.s * l, 1 / 3), u && Math.abs(u) != 1 / 0 ? r = new d(u.toString()) : (t = e(l.d), n = l.e, (u = (n - t.length + 1) % 3) && (t += 1 == u || -2 == u ? "0" : "00"), u = Math.pow(t, 1 / 3), n = On((n + 1) / 3) - (n % 3 == (0 > n ? -1 : 2)), u == 1 / 0 ? t = "5e" + n : (t = u.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + n), r = new d(t), r.s = l.s), c = (n = d.precision) + 3; ;) if (f = r, h = f.times(f).times(f), a = h.plus(l), r = Tn(a.plus(l).times(f), a.plus(h), c + 2, 1), e(f.d).slice(0, c) === (t = e(r.d)).slice(0, c)) { if (t = t.slice(c - 3, c + 1), "9999" != t && (s || "4999" != t)) { (!+t || !+t.slice(1) && "5" == t.charAt(0)) && (o(r, n + 1, 1), i = !r.times(r).times(r).eq(l)); break } if (!s && (o(f, n + 1, 0), f.times(f).times(f).eq(l))) { r = f; break } c += 4, s = 1 } return En = !0, o(r, n, d.rounding, i) }, kn.decimalPlaces = kn.dp = function () { var n, e = this.d, i = NaN; if (e) { if (n = e.length - 1, i = (n - On(this.e / Sn)) * Sn, n = e[n]) for (; n % 10 == 0; n /= 10) i--; 0 > i && (i = 0) } return i }, kn.dividedBy = kn.div = function (n) { return Tn(this, new this.constructor(n)) }, kn.dividedToIntegerBy = kn.divToInt = function (n) { var e = this, i = e.constructor; return o(Tn(e, new i(n), 0, 1, 1), i.precision, i.rounding) }, kn.equals = kn.eq = function (n) { return 0 === this.cmp(n) }, kn.floor = function () { return o(new this.constructor(this), this.e + 1, 3) }, kn.greaterThan = kn.gt = function (n) { return this.cmp(n) > 0 }, kn.greaterThanOrEqualTo = kn.gte = function (n) { var e = this.cmp(n); return 1 == e || 0 === e }, kn.hyperbolicCosine = kn.cosh = function () { var n, e, i, t, r, s = this, u = s.constructor, c = new u(1); if (!s.isFinite()) return new u(s.s ? 1 / 0 : NaN); if (s.isZero()) return c; i = u.precision, t = u.rounding, u.precision = i + Math.max(s.e, s.sd()) + 4, u.rounding = 1, r = s.d.length, 32 > r ? (n = Math.ceil(r / 3), e = Math.pow(4, -n).toString()) : (n = 16, e = "2.3283064365386962890625e-10"), s = E(u, 1, s.times(e), new u(1), !0); for (var f, h = n, a = new u(8) ; h--;) f = s.times(s), s = c.minus(f.times(a.minus(f.times(a)))); return o(s, u.precision = i, u.rounding = t, !0) }, kn.hyperbolicSine = kn.sinh = function () { var n, e, i, t, r = this, s = r.constructor; if (!r.isFinite() || r.isZero()) return new s(r); if (e = s.precision, i = s.rounding, s.precision = e + Math.max(r.e, r.sd()) + 4, s.rounding = 1, t = r.d.length, 3 > t) r = E(s, 2, r, r, !0); else { n = 1.4 * Math.sqrt(t), n = n > 16 ? 16 : 0 | n, r = r.times(Math.pow(5, -n)), r = E(s, 2, r, r, !0); for (var u, c = new s(5), f = new s(16), h = new s(20) ; n--;) u = r.times(r), r = r.times(c.plus(u.times(f.times(u).plus(h)))) } return s.precision = e, s.rounding = i, o(r, e, i, !0) }, kn.hyperbolicTangent = kn.tanh = function () { var n, e, i = this, t = i.constructor; return i.isFinite() ? i.isZero() ? new t(i) : (n = t.precision, e = t.rounding, t.precision = n + 7, t.rounding = 1, Tn(i.sinh(), i.cosh(), t.precision = n, t.rounding = e)) : new t(i.s) }, kn.inverseCosine = kn.acos = function () { var n, e = this, i = e.constructor, t = e.abs().cmp(1), r = i.precision, s = i.rounding; return -1 !== t ? 0 === t ? e.isNeg() ? h(i, r, s) : new i(0) : new i(NaN) : e.isZero() ? h(i, r + 4, s).times(.5) : (i.precision = r + 6, i.rounding = 1, e = e.asin(), n = h(i, r + 4, s).times(.5), i.precision = r, i.rounding = s, n.minus(e)) }, kn.inverseHyperbolicCosine = kn.acosh = function () { var n, e, i = this, t = i.constructor; return i.lte(1) ? new t(i.eq(1) ? 0 : NaN) : i.isFinite() ? (n = t.precision, e = t.rounding, t.precision = n + Math.max(Math.abs(i.e), i.sd()) + 4, t.rounding = 1, En = !1, i = i.times(i).minus(1).sqrt().plus(i), En = !0, t.precision = n, t.rounding = e, i.ln()) : new t(i) }, kn.inverseHyperbolicSine = kn.asinh = function () { var n, e, i = this, t = i.constructor; return !i.isFinite() || i.isZero() ? new t(i) : (n = t.precision, e = t.rounding, t.precision = n + 2 * Math.max(Math.abs(i.e), i.sd()) + 6, t.rounding = 1, En = !1, i = i.times(i).plus(1).sqrt().plus(i), En = !0, t.precision = n, t.rounding = e, i.ln()) }, kn.inverseHyperbolicTangent = kn.atanh = function () { var n, e, i, t, r = this, s = r.constructor; return r.isFinite() ? r.e >= 0 ? new s(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN) : (n = s.precision, e = s.rounding, t = r.sd(), Math.max(t, n) < 2 * -r.e - 1 ? o(new s(r), n, e, !0) : (s.precision = i = t - r.e, r = Tn(r.plus(1), new s(1).minus(r), i + n, 1), s.precision = n + 4, s.rounding = 1, r = r.ln(), s.precision = n, s.rounding = e, r.times(.5))) : new s(NaN) }, kn.inverseSine = kn.asin = function () { var n, e, i, t, r = this, s = r.constructor; return r.isZero() ? new s(r) : (e = r.abs().cmp(1), i = s.precision, t = s.rounding, -1 !== e ? 0 === e ? (n = h(s, i + 4, t).times(.5), n.s = r.s, n) : new s(NaN) : (s.precision = i + 6, s.rounding = 1, r = r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan(), s.precision = i, s.rounding = t, r.times(2))) }, kn.inverseTangent = kn.atan = function () { var n, e, i, t, r, s, u, c, f, a = this, l = a.constructor, d = l.precision, g = l.rounding; if (a.isFinite()) { if (a.isZero()) return new l(a); if (a.abs().eq(1) && _n >= d + 4) return u = h(l, d + 4, g).times(.25), u.s = a.s, u } else { if (!a.s) return new l(NaN); if (_n >= d + 4) return u = h(l, d + 4, g).times(.5), u.s = a.s, u } for (l.precision = c = d + 10, l.rounding = 1, i = Math.min(28, c / Sn + 2 | 0), n = i; n; --n) a = a.div(a.times(a).plus(1).sqrt().plus(1)); for (En = !1, e = Math.ceil(c / Sn), t = 1, f = a.times(a), u = new l(a), r = a; -1 !== n;) if (r = r.times(f), s = u.minus(r.div(t += 2)), r = r.times(f), u = s.plus(r.div(t += 2)), void 0 !== u.d[e]) for (n = e; u.d[n] === s.d[n] && n--;); return i && (u = u.times(2 << i - 1)), En = !0, o(u, l.precision = d, l.rounding = g, !0) }, kn.isFinite = function () { return !!this.d }, kn.isInteger = kn.isInt = function () { return !!this.d && On(this.e / Sn) > this.d.length - 2 }, kn.isNaN = function () { return !this.s }, kn.isNegative = kn.isNeg = function () { return this.s < 0 }, kn.isPositive = kn.isPos = function () { return this.s > 0 }, kn.isZero = function () { return !!this.d && 0 === this.d[0] }, kn.lessThan = kn.lt = function (n) { return this.cmp(n) < 0 }, kn.lessThanOrEqualTo = kn.lte = function (n) { return this.cmp(n) < 1 }, kn.logarithm = kn.log = function (n) { var i, r, s, u, c, h, a, l, d = this, g = d.constructor, p = g.precision, w = g.rounding, v = 5; if (null == n) n = new g(10), i = !0; else { if (n = new g(n), r = n.d, n.s < 0 || !r || !r[0] || n.eq(1)) return new g(NaN); i = n.eq(10) } if (r = d.d, d.s < 0 || !r || !r[0] || d.eq(1)) return new g(r && !r[0] ? -1 / 0 : 1 != d.s ? NaN : r ? 0 : 1 / 0); if (i) if (r.length > 1) c = !0; else { for (u = r[0]; u % 10 === 0;) u /= 10; c = 1 !== u } if (En = !1, a = p + v, h = m(d, a), s = i ? f(g, a + 10) : m(n, a), l = Tn(h, s, a, 1), t(l.d, u = p, w)) do if (a += 10, h = m(d, a), s = i ? f(g, a + 10) : m(n, a), l = Tn(h, s, a, 1), !c) { +e(l.d).slice(u + 1, u + 15) + 1 == 1e14 && (l = o(l, p + 1, 0)); break } while (t(l.d, u += 10, w)); return En = !0, o(l, p, w) }, kn.minus = kn.sub = function (n) { var e, i, t, r, s, u, f, h, a, l, d, g, p = this, w = p.constructor; if (n = new w(n), !p.d || !n.d) return p.s && n.s ? p.d ? n.s = -n.s : n = new w(n.d || p.s !== n.s ? p : NaN) : n = new w(NaN), n; if (p.s != n.s) return n.s = -n.s, p.plus(n); if (a = p.d, g = n.d, f = w.precision, h = w.rounding, !a[0] || !g[0]) { if (g[0]) n.s = -n.s; else { if (!a[0]) return new w(3 === h ? -0 : 0); n = new w(p) } return En ? o(n, f, h) : n } if (i = On(n.e / Sn), l = On(p.e / Sn), a = a.slice(), s = l - i) { for (d = 0 > s, d ? (e = a, s = -s, u = g.length) : (e = g, i = l, u = a.length), t = Math.max(Math.ceil(f / Sn), u) + 2, s > t && (s = t, e.length = 1), e.reverse(), t = s; t--;) e.push(0); e.reverse() } else { for (t = a.length, u = g.length, d = u > t, d && (u = t), t = 0; u > t; t++) if (a[t] != g[t]) { d = a[t] < g[t]; break } s = 0 } for (d && (e = a, a = g, g = e, n.s = -n.s), u = a.length, t = g.length - u; t > 0; --t) a[u++] = 0; for (t = g.length; t > s;) { if (a[--t] < g[t]) { for (r = t; r && 0 === a[--r];) a[r] = Rn - 1; --a[r], a[t] += Rn } a[t] -= g[t] } for (; 0 === a[--u];) a.pop(); for (; 0 === a[0]; a.shift())--i; return a[0] ? (n.d = a, n.e = c(a, i), En ? o(n, f, h) : n) : new w(3 === h ? -0 : 0) }, kn.modulo = kn.mod = function (n) { var e, i = this, t = i.constructor; return n = new t(n), !i.d || !n.s || n.d && !n.d[0] ? new t(NaN) : !n.d || i.d && !i.d[0] ? o(new t(i), t.precision, t.rounding) : (En = !1, 9 == t.modulo ? (e = Tn(i, n.abs(), 0, 3, 1), e.s *= n.s) : e = Tn(i, n, 0, t.modulo, 1), e = e.times(n), En = !0, i.minus(e)) }, kn.naturalExponential = kn.exp = function () { return w(this) }, kn.naturalLogarithm = kn.ln = function () { return m(this) }, kn.negated = kn.neg = function () { var n = new this.constructor(this); return n.s = -n.s, o(n) }, kn.plus = kn.add = function (n) { var e, i, t, r, s, u, f, h, a, l, d = this, g = d.constructor; if (n = new g(n), !d.d || !n.d) return d.s && n.s ? d.d || (n = new g(n.d || d.s === n.s ? d : NaN)) : n = new g(NaN), n; if (d.s != n.s) return n.s = -n.s, d.minus(n); if (a = d.d, l = n.d, f = g.precision, h = g.rounding, !a[0] || !l[0]) return l[0] || (n = new g(d)), En ? o(n, f, h) : n; if (s = On(d.e / Sn), t = On(n.e / Sn), a = a.slice(), r = s - t) { for (0 > r ? (i = a, r = -r, u = l.length) : (i = l, t = s, u = a.length), s = Math.ceil(f / Sn), u = s > u ? s + 1 : u + 1, r > u && (r = u, i.length = 1), i.reverse() ; r--;) i.push(0); i.reverse() } for (u = a.length, r = l.length, 0 > u - r && (r = u, i = l, l = a, a = i), e = 0; r;) e = (a[--r] = a[r] + l[r] + e) / Rn | 0, a[r] %= Rn; for (e && (a.unshift(e), ++t), u = a.length; 0 == a[--u];) a.pop(); return n.d = a, n.e = c(a, t), En ? o(n, f, h) : n }, kn.precision = kn.sd = function (n) { var e, i = this; if (void 0 !== n && n !== !!n && 1 !== n && 0 !== n) throw Error(yn + n); return i.d ? (e = a(i.d), n && i.e + 1 > e && (e = i.e + 1)) : e = NaN, e }, kn.round = function () { var n = this, e = n.constructor; return o(new e(n), n.e + 1, e.rounding) }, kn.sine = kn.sin = function () { var n, e, i = this, t = i.constructor; return i.isFinite() ? i.isZero() ? new t(i) : (n = t.precision, e = t.rounding, t.precision = n + Math.max(i.e, i.sd()) + Sn, t.rounding = 1, i = b(t, M(t, i)), t.precision = n, t.rounding = e, o(gn > 2 ? i.neg() : i, n, e, !0)) : new t(NaN) }, kn.squareRoot = kn.sqrt = function () { var n, i, t, r, s, u, c = this, f = c.d, h = c.e, a = c.s, l = c.constructor; if (1 !== a || !f || !f[0]) return new l(!a || 0 > a && (!f || f[0]) ? NaN : f ? c : 1 / 0); for (En = !1, a = Math.sqrt(+c), 0 == a || a == 1 / 0 ? (i = e(f), (i.length + h) % 2 == 0 && (i += "0"), a = Math.sqrt(i), h = On((h + 1) / 2) - (0 > h || h % 2), a == 1 / 0 ? i = "1e" + h : (i = a.toExponential(), i = i.slice(0, i.indexOf("e") + 1) + h), r = new l(i)) : r = new l(a.toString()), t = (h = l.precision) + 3; ;) if (u = r, r = u.plus(Tn(c, u, t + 2, 1)).times(.5), e(u.d).slice(0, t) === (i = e(r.d)).slice(0, t)) { if (i = i.slice(t - 3, t + 1), "9999" != i && (s || "4999" != i)) { (!+i || !+i.slice(1) && "5" == i.charAt(0)) && (o(r, h + 1, 1), n = !r.times(r).eq(c)); break } if (!s && (o(u, h + 1, 0), u.times(u).eq(c))) { r = u; break } t += 4, s = 1 } return En = !0, o(r, h, l.rounding, n) }, kn.tangent = kn.tan = function () { var n, e, i = this, t = i.constructor; return i.isFinite() ? i.isZero() ? new t(i) : (n = t.precision, e = t.rounding, t.precision = n + 10, t.rounding = 1, i = i.sin(), i.s = 1, i = Tn(i, new t(1).minus(i.times(i)).sqrt(), n + 10, 0), t.precision = n, t.rounding = e, o(2 == gn || 4 == gn ? i.neg() : i, n, e, !0)) : new t(NaN) }, kn.times = kn.mul = function (n) { var e, i, t, r, s, u, f, h, a, l = this, d = l.constructor, g = l.d, p = (n = new d(n)).d; if (n.s *= l.s, !(g && g[0] && p && p[0])) return new d(!n.s || g && !g[0] && !p || p && !p[0] && !g ? NaN : g && p ? 0 * n.s : n.s / 0); for (i = On(l.e / Sn) + On(n.e / Sn), h = g.length, a = p.length, a > h && (s = g, g = p, p = s, u = h, h = a, a = u), s = [], u = h + a, t = u; t--;) s.push(0); for (t = a; --t >= 0;) { for (e = 0, r = h + t; r > t;) f = s[r] + p[t] * g[r - t - 1] + e, s[r--] = f % Rn | 0, e = f / Rn | 0; s[r] = (s[r] + e) % Rn | 0 } for (; !s[--u];) s.pop(); for (e ? ++i : s.shift(), t = s.length; !s[--t];) s.pop(); return n.d = s, n.e = c(s, i), En ? o(n, d.precision, d.rounding) : n }, kn.toBinary = function (n, e) { return y(this, 2, n, e) }, kn.toDecimalPlaces = kn.toDP = function (n, e) { var t = this, r = t.constructor; return t = new r(t), void 0 === n ? t : (i(n, 0, wn), void 0 === e ? e = r.rounding : i(e, 0, 8), o(t, n + t.e + 1, e)) }, kn.toExponential = function (n, e) { var t, r = this, s = r.constructor; return void 0 === n ? t = u(r, !0) : (i(n, 0, wn), void 0 === e ? e = s.rounding : i(e, 0, 8), r = o(new s(r), n + 1, e), t = u(r, !0, n + 1)), r.isNeg() && !r.isZero() ? "-" + t : t }, kn.toFixed = function (n, e) { var t, r, s = this, c = s.constructor; return void 0 === n ? t = u(s) : (i(n, 0, wn), void 0 === e ? e = c.rounding : i(e, 0, 8), r = o(new c(s), n + s.e + 1, e), t = u(r, !1, n + r.e + 1)), s.isNeg() && !s.isZero() ? "-" + t : t }, kn.toFraction = function (n) { var i, t, r, s, o, u, c, f, h, l, d, g, p = this, w = p.d, m = p.constructor; if (!w) return new m(p); if (h = t = new m(1), r = f = new m(0), i = new m(r), o = i.e = a(w) - p.e - 1, u = o % Sn, i.d[0] = qn(10, 0 > u ? Sn + u : u), null == n) n = o > 0 ? i : h; else { if (c = new m(n), !c.isInt() || c.lt(h)) throw Error(yn + c); n = c.gt(i) ? o > 0 ? i : h : c } for (En = !1, c = new m(e(w)), l = m.precision, m.precision = o = w.length * Sn * 2; d = Tn(c, i, 0, 1, 1), s = t.plus(d.times(r)), 1 != s.cmp(n) ;) t = r, r = s, s = h, h = f.plus(d.times(s)), f = s, s = i, i = c.minus(d.times(s)), c = s; return s = Tn(n.minus(t), r, 0, 1, 1), f = f.plus(s.times(h)), t = t.plus(s.times(r)), f.s = h.s = p.s, g = Tn(h, r, o, 1).minus(p).abs().cmp(Tn(f, t, o, 1).minus(p).abs()) < 1 ? [h, r] : [f, t], m.precision = l, En = !0, g }, kn.toHexadecimal = kn.toHex = function (n, e) { return y(this, 16, n, e) }, kn.toJSON = function () { var n, i, t, s, o, u, c, f, h = this, a = h.s < 0; if (!h.d) return mn.charAt(h.s ? a ? 82 : 83 : 84); if (i = h.e, 1 === h.d.length && 4 > i && i >= 0 && (u = h.d[0], 2857 > u)) return 41 > u ? mn.charAt(a ? u + 41 : u) : (u -= 41, a && (u += 2816), s = u / 88 | 0, mn.charAt(s) + mn.charAt(u - 88 * s)); if (f = e(h.d), c = "", !a && 8 >= i && i >= -7) s = 64 + i + 7; else if (a && 4 >= i && i >= -3) s = 80 + i + 3; else if (f.length === i + 1) s = 32 * a; else if (s = 32 * a + 16 * (0 > i), i = Math.abs(i), 88 > i) s += 1, c = mn.charAt(i); else if (7744 > i) s += 2, u = i / 88 | 0, c = mn.charAt(u) + mn.charAt(i - 88 * u); else for (n = r(String(i), 10, 88), o = n.length, s += o, t = 0; o > t; t++) c += mn.charAt(n[t]); for (c = mn.charAt(s) + c, n = r(f, 10, 88), o = n.length, t = 0; o > t; t++) c += mn.charAt(n[t]); return c }, kn.toNearest = function (n, e) { var t = this, r = t.constructor; if (t = new r(t), null == n) { if (!t.d) return t; n = new r(1), e = r.rounding } else { if (n = new r(n), void 0 !== e && i(e, 0, 8), !t.d) return n.s ? t : n; if (!n.d) return n.s && (n.s = t.s), n } return n.d[0] ? (En = !1, 4 > e && (e = [4, 5, 7, 8][e]), t = Tn(t, n, 0, e, 1).times(n), En = !0, o(t)) : (n.s = t.s, t = n), t }, kn.toNumber = function () { return +this }, kn.toOctal = function (n, e) { return y(this, 8, n, e) }, kn.toPower = kn.pow = function (n) { var i, r, s, u, c, f, h, a = this, l = a.constructor, g = +(n = new l(n)); if (!(a.d && n.d && a.d[0] && n.d[0])) return new l(qn(+a, g)); if (a = new l(a), a.eq(1)) return a; if (s = l.precision, c = l.rounding, n.eq(1)) return o(a, s, c); if (i = On(n.e / Sn), r = n.d.length - 1, h = i >= r, f = a.s, h) { if ((r = 0 > g ? -g : g) <= Ln) return u = d(l, a, r, s), n.s < 0 ? new l(1).div(u) : o(u, s, c) } else if (0 > f) return new l(NaN); return f = 0 > f && 1 & n.d[Math.max(i, r)] ? -1 : 1, r = qn(+a, g), i = 0 != r && isFinite(r) ? new l(r + "").e : On(g * (Math.log("0." + e(a.d)) / Math.LN10 + a.e + 1)), i > l.maxE + 1 || i < l.minE - 1 ? new l(i > 0 ? f / 0 : 0) : (En = !1, l.rounding = a.s = 1, r = Math.min(12, (i + "").length), u = w(n.times(m(a, s + r)), s), u = o(u, s + 5, 1), t(u.d, s, c) && (i = s + 10, u = o(w(n.times(m(a, i + r)), i), i + 5, 1), +e(u.d).slice(s + 1, s + 15) + 1 == 1e14 && (u = o(u, s + 1, 0))), u.s = f, En = !0, l.rounding = c, o(u, s, c)) }, kn.toPrecision = function (n, e) { var t, r = this, s = r.constructor; return void 0 === n ? t = u(r, r.e <= s.toExpNeg || r.e >= s.toExpPos) : (i(n, 1, wn), void 0 === e ? e = s.rounding : i(e, 0, 8), r = o(new s(r), n, e), t = u(r, n <= r.e || r.e <= s.toExpNeg, n)), r.isNeg() && !r.isZero() ? "-" + t : t }, kn.toSignificantDigits = kn.toSD = function (n, e) { var t = this, r = t.constructor; return void 0 === n ? (n = r.precision, e = r.rounding) : (i(n, 1, wn), void 0 === e ? e = r.rounding : i(e, 0, 8)), o(new r(t), n, e) }, kn.toString = function () { var n = this, e = n.constructor, i = u(n, n.e <= e.toExpNeg || n.e >= e.toExpPos); return n.isNeg() && !n.isZero() ? "-" + i : i }, kn.truncated = kn.trunc = function () { return o(new this.constructor(this), this.e + 1, 1) }, kn.valueOf = function () { var n = this, e = n.constructor, i = u(n, n.e <= e.toExpNeg || n.e >= e.toExpPos); return n.isNeg() ? "-" + i : i }; var Tn = function () { function n(n, e, i) { var t, r = 0, s = n.length; for (n = n.slice() ; s--;) t = n[s] * e + r, n[s] = t % i | 0, r = t / i | 0; return r && n.unshift(r), n } function e(n, e, i, t) { var r, s; if (i != t) s = i > t ? 1 : -1; else for (r = s = 0; i > r; r++) if (n[r] != e[r]) { s = n[r] > e[r] ? 1 : -1; break } return s } function i(n, e, i, t) { for (var r = 0; i--;) n[i] -= r, r = n[i] < e[i] ? 1 : 0, n[i] = r * t + n[i] - e[i]; for (; !n[0] && n.length > 1;) n.shift() } return function (t, r, s, u, c, f) { var h, a, l, d, g, p, w, m, v, N, x, b, E, M, y, A, O, q, F, D, Z = t.constructor, P = t.s == r.s ? 1 : -1, R = t.d, S = r.d; if (!(R && R[0] && S && S[0])) return new Z(t.s && r.s && (R ? !S || R[0] != S[0] : S) ? R && 0 == R[0] || !S ? 0 * P : P / 0 : NaN); for (f ? (g = 1, a = t.e - r.e) : (f = Rn, g = Sn, a = On(t.e / g) - On(r.e / g)), F = S.length, O = R.length, v = new Z(P), N = v.d = [], l = 0; S[l] == (R[l] || 0) ; l++); if (S[l] > (R[l] || 0) && a--, null == s ? (M = s = Z.precision, u = Z.rounding) : M = c ? s + (t.e - r.e) + 1 : s, 0 > M) N.push(1), p = !0; else { if (M = M / g + 2 | 0, l = 0, 1 == F) { for (d = 0, S = S[0], M++; (O > l || d) && M--; l++) y = d * f + (R[l] || 0), N[l] = y / S | 0, d = y % S | 0; p = d || O > l } else { for (d = f / (S[0] + 1) | 0, d > 1 && (S = n(S, d, f), R = n(R, d, f), F = S.length, O = R.length), A = F, x = R.slice(0, F), b = x.length; F > b;) x[b++] = 0; D = S.slice(), D.unshift(0), q = S[0], S[1] >= f / 2 && ++q; do d = 0, h = e(S, x, F, b), 0 > h ? (E = x[0], F != b && (E = E * f + (x[1] || 0)), d = E / q | 0, d > 1 ? (d >= f && (d = f - 1), w = n(S, d, f), m = w.length, b = x.length, h = e(w, x, m, b), 1 == h && (d--, i(w, m > F ? D : S, m, f))) : (0 == d && (h = d = 1), w = S.slice()), m = w.length, b > m && w.unshift(0), i(x, w, b, f), -1 == h && (b = x.length, h = e(S, x, F, b), 1 > h && (d++, i(x, b > F ? D : S, b, f))), b = x.length) : 0 === h && (d++, x = [0]), N[l++] = d, h && x[0] ? x[b++] = R[A] || 0 : (x = [R[A]], b = 1); while ((A++ < O || void 0 !== x[0]) && M--); p = void 0 !== x[0] } N[0] || N.shift() } if (1 == g) v.e = a, ln = p; else { for (l = 1, d = N[0]; d >= 10; d /= 10) l++; v.e = l + a * g - 1, o(v, c ? s + v.e + 1 : s, u, p) } return v } }(); if (xn = I(xn), vn = new xn(vn), Nn = new xn(Nn), Bridge.$Decimal = xn, "function" == typeof define && define.amd) define(function () { return xn }); else if ("undefined" != typeof module && module.exports) { if (module.exports = xn, !bn) try { bn = require("crypto") } catch (Cn) { } } else n || (n = "undefined" != typeof self && self && self.self == self ? self : Function("return this")()), dn = n.Decimal, xn.noConflict = function () { return n.Decimal = dn, xn }, n.Decimal = xn }(Bridge.global);

    Bridge.Decimal = function (v, provider) {
        if (this.constructor !== Bridge.Decimal) {
            return new Bridge.Decimal(v);
        }

        if (typeof v === "string") {
            provider = provider || Bridge.CultureInfo.getCurrentCulture();

            var nfInfo = provider && provider.getFormat(Bridge.NumberFormatInfo);

            if (nfInfo && nfInfo.numberDecimalSeparator !== ".") {
                v = v.replace(nfInfo.numberDecimalSeparator, ".");
            }

            if (!/^\s*[+-]?(\d+|\d*\.\d+)((e|E)[+-]?\d+)?\s*$/.test(v)) {
                throw new Bridge.FormatException();
            }

            v = v.replace(/\s/g, "");
        }

        this.value = Bridge.Decimal.getValue(v);
    }

    Bridge.Decimal.$$name = "Bridge.Decimal";
    Bridge.Decimal.prototype.$$name = "Bridge.Decimal";

    Bridge.Decimal.$$inherits = [];
    Bridge.Class.addExtend(Bridge.Decimal, [Bridge.IComparable, Bridge.IFormattable, Bridge.IComparable$1(Bridge.Decimal), Bridge.IEquatable$1(Bridge.Decimal)]);

    Bridge.Decimal.instanceOf = function (instance) {
        return instance instanceof Bridge.Decimal;
    };

    Bridge.Decimal.getDefaultValue = function () {
        return new Bridge.Decimal(0);
    };

    Bridge.Decimal.getValue = function (d) {
        if (!Bridge.hasValue(d)) {
            return this.getDefaultValue();
        }

        if (d instanceof Bridge.Decimal) {
            return d.value;
        }

        if (d instanceof Bridge.Long || d instanceof Bridge.ULong) {
            return new Bridge.$Decimal(d.toString());
        }

        return new Bridge.$Decimal(d);
    };

    Bridge.Decimal.create = function (d) {
        if (!Bridge.hasValue(d)) {
            return null;
        }

        if (d instanceof Bridge.Decimal) {
            return d;
        }

        return new Bridge.Decimal(d);
    };

    Bridge.Decimal.lift = function (d) {
        return d == null ? null : Bridge.Decimal.create(d);
    }; 

    Bridge.Decimal.prototype.toString = function (format, provider) {
        if (!format && !provider) {
            return this.value.toString();
        }

        return Bridge.Int.format(this, format, provider);
    };

    Bridge.Decimal.prototype.toFloat = function () {
        return this.value.toNumber();
    };

    Bridge.Decimal.prototype.toJSON = function () {
        return this.value.toNumber();
    };

    Bridge.Decimal.prototype.format = function (format, provider) {
        return Bridge.Int.format(this.toFloat(), format, provider);
    };

    Bridge.Decimal.prototype.decimalPlaces = function () {
        return this.value.decimalPlaces();
    };

    Bridge.Decimal.prototype.dividedToIntegerBy = function (d) {
        return new Bridge.Decimal(this.value.dividedToIntegerBy(Bridge.Decimal.getValue(d)));
    };

    Bridge.Decimal.prototype.exponential = function () {
        return new Bridge.Decimal(this.value.exponential());
    };

    Bridge.Decimal.prototype.abs = function () {
        return new Bridge.Decimal(this.value.abs());
    };

    Bridge.Decimal.prototype.floor = function () {
        return new Bridge.Decimal(this.value.floor());
    };

    Bridge.Decimal.prototype.ceil = function () {
        return new Bridge.Decimal(this.value.ceil());
    };

    Bridge.Decimal.prototype.trunc = function () {
        return new Bridge.Decimal(this.value.trunc());
    };

    Bridge.Decimal.round = function (obj, mode) {
        obj = Bridge.Decimal.create(obj);

        var old = Bridge.$Decimal.rounding;

        Bridge.$Decimal.rounding = mode;

        var d = new Bridge.Decimal(obj.value.round());

        Bridge.$Decimal.rounding = old;

        return d;
    };

    Bridge.Decimal.toDecimalPlaces = function (obj, decimals, mode) {
        obj = Bridge.Decimal.create(obj);
        var d = new Bridge.Decimal(obj.value.toDecimalPlaces(decimals, mode));
        return d;
    };

    Bridge.Decimal.prototype.compareTo = function (another) {
        return this.value.comparedTo(Bridge.Decimal.getValue(another));
    };

    Bridge.Decimal.prototype.add = function (another) {
        return new Bridge.Decimal(this.value.plus(Bridge.Decimal.getValue(another)));
    };

    Bridge.Decimal.prototype.sub = function (another) {
        return new Bridge.Decimal(this.value.minus(Bridge.Decimal.getValue(another)));
    };

    Bridge.Decimal.prototype.isZero = function () {
        return this.value.isZero;
    };

    Bridge.Decimal.prototype.mul = function (another) {
        return new Bridge.Decimal(this.value.times(Bridge.Decimal.getValue(another)));
    };

    Bridge.Decimal.prototype.div = function (another) {
        return new Bridge.Decimal(this.value.dividedBy(Bridge.Decimal.getValue(another)));
    };

    Bridge.Decimal.prototype.mod = function (another) {
        return new Bridge.Decimal(this.value.modulo(Bridge.Decimal.getValue(another)));
    };

    Bridge.Decimal.prototype.neg = function () {
        return new Bridge.Decimal(this.value.negated());
    };

    Bridge.Decimal.prototype.inc = function () {
        return new Bridge.Decimal(this.value.plus(Bridge.Decimal.getValue(1)));
    };

    Bridge.Decimal.prototype.dec = function () {
        return new Bridge.Decimal(this.value.minus(Bridge.Decimal.getValue(1)));
    };

    Bridge.Decimal.prototype.sign = function () {
        return this.value.isZero() ? 0 : (this.value.isNegative() ? -1 : 1);
    };

    Bridge.Decimal.prototype.clone = function () {
        return new Bridge.Decimal(this);
    };

    Bridge.Decimal.prototype.ne = function (v) {
        return !!this.compareTo(v);
    };

    Bridge.Decimal.prototype.lt = function (v) {
        return this.compareTo(v) < 0;
    };

    Bridge.Decimal.prototype.lte = function (v) {
        return this.compareTo(v) <= 0;
    };

    Bridge.Decimal.prototype.gt = function (v) {
        return this.compareTo(v) > 0;
    };

    Bridge.Decimal.prototype.gte = function (v) {
        return this.compareTo(v) >= 0;
    };

    Bridge.Decimal.prototype.equals = function (v) {
        return !this.compareTo(v);
    };

    Bridge.Decimal.prototype.equalsT = function (v) {
        return !this.compareTo(v);
    };

    Bridge.Decimal.prototype.getHashCode = function () {
        var n = (this.sign() * 397 + this.value.e) | 0;

        for (var i = 0; i < this.value.d.length; i++) {
            n = (n * 397 + this.value.d[i]) | 0;
        }

        return n;
    };

    Bridge.Decimal.toInt = function (v, tp) {
        if (!v) {
            return null;
        }

        if (tp) {
            var str,
                r;

            if (tp === Bridge.Long) {
                str = v.value.trunc().toString();
                r = new Bridge.Long(str);

                if (str !== r.value.toString()) {
                    throw new Bridge.OverflowException();
                }

                return r;
            }

            if (tp === Bridge.ULong) {
                if (v.value.isNegative()) {
                    throw new Bridge.OverflowException();
                }

                str = v.value.trunc().toString();
                r = new Bridge.ULong(str);

                if (str !== r.value.toString()) {
                    throw new Bridge.OverflowException();
                }

                return r;
            }

            return Bridge.Int.check(Bridge.Int.trunc(v.value.toNumber()), tp);
        }

        var i = Bridge.Int.trunc(Bridge.Decimal.getValue(v).toNumber());

        if (!Bridge.Int.instanceOf(i)) {
            throw new Bridge.OverflowException();
        }

        return i;
    };

    Bridge.Decimal.tryParse = function (s, provider, v) {
        try {
            v.v = new Bridge.Decimal(s, provider);

            return true;
        } catch (e) {
            v.v = new Bridge.Decimal(0);

            return false;
        }
    };

    Bridge.Decimal.toFloat = function (v) {
        if (!v) {
            return null;
        }

        return Bridge.Decimal.getValue(v).toNumber();
    };

    Bridge.Decimal.setConfig = function (config) {
        Bridge.$Decimal.config(config);
    };

    Bridge.Decimal.min = function () {
        var values = [];

        for (var i = 0, len = arguments.length; i < len; i++) {
            values.push(Bridge.Decimal.getValue(arguments[i]));
        }

        return new Bridge.Decimal(Bridge.$Decimal.min.apply(Bridge.$Decimal, values));
    };

    Bridge.Decimal.max = function () {
        var values = [];

        for (var i = 0, len = arguments.length; i < len; i++) {
            values.push(Bridge.Decimal.getValue(arguments[i]));
        }

        return new Bridge.Decimal(Bridge.$Decimal.max.apply(Bridge.$Decimal, values));
    };

    Bridge.Decimal.random = function (dp) {
        return new Bridge.Decimal(Bridge.$Decimal.random(dp));
    };

    Bridge.Decimal.exp = function (d) {
        return new Bridge.Decimal(Bridge.Decimal.getValue(d).exp());
    };

    Bridge.Decimal.exp = function (d) {
        return new Bridge.Decimal(Bridge.Decimal.getValue(d).exp());
    };

    Bridge.Decimal.ln = function (d) {
        return new Bridge.Decimal(Bridge.Decimal.getValue(d).ln());
    };

    Bridge.Decimal.log = function (d, logBase) {
        return new Bridge.Decimal(Bridge.Decimal.getValue(d).log(logBase));
    };

    Bridge.Decimal.pow = function (d, exponent) {
        return new Bridge.Decimal(Bridge.Decimal.getValue(d).pow(exponent));
    };

    Bridge.Decimal.sqrt = function (d) {
        return new Bridge.Decimal(Bridge.Decimal.getValue(d).sqrt());
    };

    Bridge.Decimal.prototype.isFinite = function () {
        return this.value.isFinite();
    };

    Bridge.Decimal.prototype.isInteger = function () {
        return this.value.isInteger();
    };

    Bridge.Decimal.prototype.isNaN = function () {
        return this.value.isNaN();
    };

    Bridge.Decimal.prototype.isNegative = function () {
        return this.value.isNegative();
    };

    Bridge.Decimal.prototype.isZero = function () {
        return this.value.isZero();
    };

    Bridge.Decimal.prototype.log = function (logBase) {
        return new Bridge.Decimal(this.value.log(logBase));
    };

    Bridge.Decimal.prototype.ln = function () {
        return new Bridge.Decimal(this.value.ln());
    };

    Bridge.Decimal.prototype.precision = function () {
        return this.value.precision();
    };

    Bridge.Decimal.prototype.round = function () {
        var old = Bridge.$Decimal.rounding,
            r;

        Bridge.$Decimal.rounding = 6;
        r = new Bridge.Decimal(this.value.round());
        Bridge.$Decimal.rounding = old;

        return r;
    };

    Bridge.Decimal.prototype.sqrt = function () {
        return new Bridge.Decimal(this.value.sqrt());
    };

    Bridge.Decimal.prototype.toDecimalPlaces = function (dp, rm) {
        return new Bridge.Decimal(this.value.toDecimalPlaces(dp, rm));
    };

    Bridge.Decimal.prototype.toExponential = function (dp, rm) {
        return this.value.toExponential(dp, rm);
    };

    Bridge.Decimal.prototype.toFixed = function (dp, rm) {
        return this.value.toFixed(dp, rm);
    };

    Bridge.Decimal.prototype.pow = function (n) {
        return new Bridge.Decimal(this.value.pow(n));
    };

    Bridge.Decimal.prototype.toPrecision = function (dp, rm) {
        return this.value.toPrecision(dp, rm);
    };

    Bridge.Decimal.prototype.toSignificantDigits = function (dp, rm) {
        return new Bridge.Decimal(this.value.toSignificantDigits(dp, rm));
    };

    Bridge.Decimal.prototype.valueOf = function () {
        return this.value.valueOf();
    };

    Bridge.Decimal.prototype.toFormat = function (dp, rm, provider) {
        var old = Bridge.$Decimal.format,
            d;

        if (provider && !provider.getFormat) {
            var oldConfig = Bridge.merge({}, old || {});

            Bridge.$Decimal.format = Bridge.merge(oldConfig, provider);
            d = this.value.toFormat(dp, rm);
        } else {
            provider = provider || Bridge.CultureInfo.getCurrentCulture();

            var nfInfo = provider && provider.getFormat(Bridge.NumberFormatInfo);

            if (nfInfo) {
                Bridge.$Decimal.format.decimalSeparator = nfInfo.numberDecimalSeparator;
                Bridge.$Decimal.format.groupSeparator = nfInfo.numberGroupSeparator;
                Bridge.$Decimal.format.groupSize = nfInfo.numberGroupSizes[0];
            }

            d = this.value.toFormat(dp, rm);
        }
        
        
        Bridge.$Decimal.format = old;
        return d;
    };

    Bridge.$Decimal.config({ precision: 29 });

    Bridge.Decimal.Zero = Bridge.Decimal(0);
    Bridge.Decimal.One = Bridge.Decimal(1);
    Bridge.Decimal.MinusOne = Bridge.Decimal(-1);
    Bridge.Decimal.MinValue = Bridge.Decimal("-79228162514264337593543950335");
    Bridge.Decimal.MaxValue = Bridge.Decimal("79228162514264337593543950335");

    // @source Date.js

Bridge.define("Bridge.DayOfWeek", {
    $enum: true,
    $statics: {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6
    }
});

var date = {
        getDefaultValue: function () {
            return new Date(-864e13);
        },

        utcNow:  function () {
            var d = new Date();

            return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
        },

        today: function () {
            var d = new Date();

            return new Date(d.getFullYear(), d.getMonth(), d.getDate());
        },

        timeOfDay: function (dt) {
            return new Bridge.TimeSpan((dt - new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())) * 10000);
        },

        isUseGenitiveForm: function (format, index, tokenLen, patternToMatch) {
	        var i,
                repeat = 0;

	        for (i = index - 1; i >= 0 && format[i] !== patternToMatch; i--) { }

            if (i >= 0) {
                while (--i >= 0 && format[i] === patternToMatch) {
                    repeat++;
                }

                if (repeat <= 1) {
                    return true;
                }
            }

            for (i = index + tokenLen; i < format.length && format[i] !== patternToMatch; i++) { }

            if (i < format.length) {
                repeat = 0;

                while (++i < format.length && format[i] === patternToMatch) {
                    repeat++;
                }

                if (repeat <= 1) {
                    return true;
                }
            }

            return false;
        },

        format: function (date, format, provider) {
            var me = this,
                df = (provider || Bridge.CultureInfo.getCurrentCulture()).getFormat(Bridge.DateTimeFormatInfo),
                year = date.getFullYear(),
                month = date.getMonth(),
                dayOfMonth = date.getDate(),
                dayOfWeek = date.getDay(),
                hour = date.getHours(),
                minute = date.getMinutes(),
                second = date.getSeconds(),
                millisecond = date.getMilliseconds(),
                timezoneOffset = date.getTimezoneOffset(),
                formats;

            format = format || "G";

            if (format.length === 1) {
                formats = df.getAllDateTimePatterns(format, true);
                format = formats ? formats[0] : format;
            } else if (format.length === 2 && format.charAt(0) === "%") {
                format = format.charAt(1);
            }

            return format.replace(/(\\.|'[^']*'|"[^"]*"|d{1,4}|M{1,4}|yyyy|yy|y|HH?|hh?|mm?|ss?|tt?|f{1,3}|z{1,3}|\:|\/)/g,
			    function (match, group, index) {
			        var part = match;

			        switch (match) {
			            case "dddd":
			                part = df.dayNames[dayOfWeek];

			                break;
			            case "ddd":
			                part = df.abbreviatedDayNames[dayOfWeek];

			                break;
			            case "dd":
			                part = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;

			                break;
			            case "d":
			                part = dayOfMonth;

			                break;
			            case "MMMM":
			                if (me.isUseGenitiveForm(format, index, 4, "d")) {
			                    part = df.monthGenitiveNames[month];
			                } else {
			                    part = df.monthNames[month];
			                }

			                break;
			            case "MMM":
			                if (me.isUseGenitiveForm(format, index, 3, "d")) {
			                    part = df.abbreviatedMonthGenitiveNames[month];
			                } else {
			                    part = df.abbreviatedMonthNames[month];
			                }

			                break;
			            case "MM":
			                part = (month + 1) < 10 ? "0" + (month + 1) : (month + 1);

			                break;
			            case "M":
			                part = month + 1;

			                break;
			            case "yyyy":
			                part = year;

			                break;
			            case "yy":
			                part = (year % 100).toString();

			                if (part.length === 1) {
			                    part = "0" + part;
			                }

			                break;
			            case "y":
			                part = year % 100;

			                break;
			            case "h":
			            case "hh":
			                part = hour % 12;

			                if (!part) {
			                    part = "12";
			                } else if (match === "hh" && part.length === 1) {
			                    part = "0" + part;
			                }

			                break;
			            case "HH":
			                part = hour.toString();

			                if (part.length === 1) {
			                    part = "0" + part;
			                }

			                break;
			            case "H":
			                part = hour;
			                break;
			            case "mm":
			                part = minute.toString();

			                if (part.length === 1) {
			                    part = "0" + part;
			                }

			                break;
			            case "m":
			                part = minute;

			                break;
			            case "ss":
			                part = second.toString();

			                if (part.length === 1) {
			                    part = "0" + part;
			                }

			                break;
			            case "s":
			                part = second;
			                break;
			            case "t":
			            case "tt":
			                part = (hour < 12) ? df.amDesignator : df.pmDesignator;

			                if (match === "t") {
			                    part = part.charAt(0);
			                }

			                break;
			            case "f":
			            case "ff":
			            case "fff":
			                part = millisecond.toString();

			                if (part.length < 3) {
			                    part = Array(3 - part.length).join("0") + part;
			                }

			                if (match === "ff") {
			                    part = part.substr(0, 2);
			                } else if (match === "f") {
			                    part = part.charAt(0);
			                }

			                break;
			            case "z":
			                part = timezoneOffset / 60;
			                part = ((part >= 0) ? "-" : "+") + Math.floor(Math.abs(part));

			                break;
			            case "zz":
			            case "zzz":
			                part = timezoneOffset / 60;
			                part = ((part >= 0) ? "-" : "+") + Bridge.String.alignString(Math.floor(Math.abs(part)).toString(), 2, "0", 2);

			                if (match === "zzz") {
			                    part += df.timeSeparator + Bridge.String.alignString(Math.floor(Math.abs(timezoneOffset % 60)).toString(), 2, "0", 2);
			                }

			                break;
			            case ":":
			                part = df.timeSeparator;

			                break;
			            case "/":
			                part = df.dateSeparator;

			                break;
			            default:
			                part = match.substr(1, match.length - 1 - (match.charAt(0) !== "\\"));

			                break;
			        }

			        return part;
			    });
        },

        parse: function (value, provider, utc, silent) {
            var dt = this.parseExact(value, null, provider, utc, true);

            if (dt !== null) {
                return dt;
            }

            dt = Date.parse(value);

            if (!isNaN(dt)) {
                return new Date(dt);
            } else if (!silent) {
                throw new Bridge.FormatException("String does not contain a valid string representation of a date and time.");
            }
        },

        parseExact: function (str, format, provider, utc, silent) {
            if (!format) {
                format = ["G", "g", "F", "f", "D", "d", "R", "r", "s", "S", "U", "u", "O", "o", "Y", "y", "M", "m", "T", "t"];
            }

            if (Bridge.isArray(format)) {
                var j = 0,
                    d;

                for (j; j < format.length; j++) {
                    d = Bridge.Date.parseExact(str, format[j], provider, utc, true);

                    if (d != null) {
                        return d;
                    }
                }

                if (silent) {
                    return null;
                }

                throw new Bridge.FormatException("String does not contain a valid string representation of a date and time.");
            }

            var df = (provider || Bridge.CultureInfo.getCurrentCulture()).getFormat(Bridge.DateTimeFormatInfo),
                am = df.amDesignator,
                pm = df.pmDesignator,
                idx = 0,
                index = 0,
                i = 0,
                c,
                token,
                year = 0,
                month = 1,
                date = 1,
                hh = 0,
                mm = 0,
                ss = 0,
                ff = 0,
                tt = "",
                zzh = 0,
                zzm = 0,
                zzi,
                sign,
                neg,
                names,
                name,
                invalid = false,
                inQuotes = false,
                tokenMatched,
                formats;

            if (str == null) {
                throw new Bridge.ArgumentNullException("str");
            }

            format = format || "G";

            if (format.length === 1) {
                formats = df.getAllDateTimePatterns(format, true);
                format = formats ? formats[0] : format;
            } else if (format.length === 2 && format.charAt(0) === "%") {
                format = format.charAt(1);
            }

            while (index < format.length) {
                c = format.charAt(index);
                token = "";

                if (inQuotes === "\\") {
                    token += c;
                    index++;
                } else {
                    while ((format.charAt(index) === c) && (index < format.length)) {
                        token += c;
                        index++;
                    }
                }

                tokenMatched = true;

                if (!inQuotes) {
                    if (token === "yyyy" || token === "yy" || token === "y") {
                        if (token === "yyyy") {
                            year = this.subparseInt(str, idx, 4, 4);
                        } else if (token === "yy") {
                            year = this.subparseInt(str, idx, 2, 2);
                        } else if (token === "y") {
                            year = this.subparseInt(str, idx, 2, 4);
                        }

                        if (year == null) {
                            invalid = true;
                            break;
                        }

                        idx += year.length;

                        if (year.length === 2) {
                            year = ~~year;
                            year = (year > 30 ? 1900 : 2000) + year;
                        }
                    } else if (token === "MMM" || token === "MMMM") {
                        month = 0;

                        if (token === "MMM") {
                            if (this.isUseGenitiveForm(format, index, 3, "d")) {
                                names = df.abbreviatedMonthGenitiveNames;
                            } else {
                                names = df.abbreviatedMonthNames;
                            }
                        } else {
                            if (this.isUseGenitiveForm(format, index, 4, "d")) {
                                names = df.monthGenitiveNames;
                            } else {
                                names = df.monthNames;
                            }
                        }

                        for (i = 0; i < names.length; i++) {
                            name = names[i];

                            if (str.substring(idx, idx + name.length).toLowerCase() === name.toLowerCase()) {
                                month = (i % 12) + 1;
                                idx += name.length;

                                break;
                            }
                        }

                        if ((month < 1) || (month > 12)) {
                            invalid = true;

                            break;
                        }
                    } else if (token === "MM" || token === "M") {
                        month = this.subparseInt(str, idx, token.length, 2);

                        if (month == null || month < 1 || month > 12) {
                            invalid = true;

                            break;
                        }

                        idx += month.length;
                    } else if (token === "dddd" || token === "ddd") {
                        names = token === "ddd" ? df.abbreviatedDayNames : df.dayNames;

                        for (i = 0; i < names.length; i++) {
                            name = names[i];

                            if (str.substring(idx, idx + name.length).toLowerCase() === name.toLowerCase()) {
                                idx += name.length;

                                break;
                            }
                        }
                    } else if (token === "dd" || token === "d") {
                        date = this.subparseInt(str, idx, token.length, 2);

                        if (date == null || date < 1 || date > 31) {
                            invalid = true;

                            break;
                        }

                        idx += date.length;
                    } else if (token === "hh" || token === "h") {
                        hh = this.subparseInt(str, idx, token.length, 2);

                        if (hh == null || hh < 1 || hh > 12) {
                            invalid = true;

                            break;
                        }

                        idx += hh.length;
                    } else if (token === "HH" || token === "H") {
                        hh = this.subparseInt(str, idx, token.length, 2);

                        if (hh == null || hh < 0 || hh > 23) {
                            invalid = true;

                            break;
                        }

                        idx += hh.length;
                    } else if (token === "mm" || token === "m") {
                        mm = this.subparseInt(str, idx, token.length, 2);

                        if (mm == null || mm < 0 || mm > 59) {
                            return null;
                        }

                        idx += mm.length;
                    } else if (token === "ss" || token === "s") {
                        ss = this.subparseInt(str, idx, token.length, 2);

                        if (ss == null || ss < 0 || ss > 59) {
                            invalid = true;

                            break;
                        }

                        idx += ss.length;
                    } else if (token === "u") {
                        ff = this.subparseInt(str, idx, 1, 7);

                        if (ff == null) {
                            invalid = true;

                            break;
                        }

                        idx += ff.length;

                        if (ff.length > 3) {
                            ff = ff.substring(0, 3);
                        }
                    } else if (token === "fffffff" || token === "ffffff" || token === "fffff" || token === "ffff" || token === "fff" || token === "ff" || token === "f") {
                        ff = this.subparseInt(str, idx, token.length, 7);

                        if (ff == null) {
                            invalid = true;

                            break;
                        }

                        idx += ff.length;

                        if (ff.length > 3) {
                            ff = ff.substring(0, 3);
                        }
                    } else if (token === "t") {
                        if (str.substring(idx, idx + 1).toLowerCase() === am.charAt(0).toLowerCase()) {
                            tt = am;
                        } else if (str.substring(idx, idx + 1).toLowerCase() === pm.charAt(0).toLowerCase()) {
                            tt = pm;
                        } else {
                            invalid = true;

                            break;
                        }

                        idx += 1;
                    } else if (token === "tt") {
                        if (str.substring(idx, idx + 2).toLowerCase() === am.toLowerCase()) {
                            tt = am;
                        } else if (str.substring(idx, idx + 2).toLowerCase() === pm.toLowerCase()) {
                            tt = pm;
                        } else {
                            invalid = true;

                            break;
                        }

                        idx += 2;
                    } else if (token === "z" || token === "zz") {
                        sign = str.charAt(idx);

                        if (sign === "-") {
                            neg = true;
                        } else if (sign === "+") {
                            neg = false;
                        } else {
                            invalid = true;

                            break;
                        }

                        idx++;

                        zzh = this.subparseInt(str, idx, 1, 2);

                        if (zzh == null || zzh > 14) {
                            invalid = true;

                            break;
                        }

                        idx += zzh.length;

                        if (neg) {
                            zzh = -zzh;
                        }
                    } else if (token === "zzz") {
                        name = str.substring(idx, idx + 6);
                        idx += 6;

                        if (name.length !== 6) {
                            invalid = true;

                            break;
                        }

                        sign = name.charAt(0);

                        if (sign === "-") {
                            neg = true;
                        } else if (sign === "+") {
                            neg = false;
                        } else {
                            invalid = true;

                            break;
                        }

                        zzi = 1;
                        zzh = this.subparseInt(name, zzi, 1, 2);

                        if (zzh == null || zzh > 14) {
                            invalid = true;

                            break;
                        }

                        zzi += zzh.length;

                        if (neg) {
                            zzh = -zzh;
                        }

                        if (name.charAt(zzi) !== df.timeSeparator) {
                            invalid = true;

                            break;
                        }

                        zzi++;

                        zzm = this.subparseInt(name, zzi, 1, 2);

                        if (zzm == null || zzh > 59) {
                            invalid = true;

                            break;
                        }
                    } else {
                        tokenMatched = false;
                    }
                }

                if (inQuotes || !tokenMatched) {
                    name = str.substring(idx, idx + token.length);

                    if ((!inQuotes && ((token === ":" && name !== df.timeSeparator) ||
                        (token === "/" && name !== df.dateSeparator))) ||
                        (name !== token && token !== "'" && token !== '"' && token !== "\\")) {
                        invalid = true;

                        break;
                    }

                    if (inQuotes === "\\") {
                        inQuotes = false;
                    }

                    if (token !== "'" && token !== '"' && token !== "\\") {
                        idx += token.length;
                    } else {
                        if (inQuotes === false) {
                            inQuotes = token;
                        } else {
                            if (inQuotes !== token) {
                                invalid = true;
                                break;
                            }

                            inQuotes = false;
                        }
                    }
                }
            }

            if (inQuotes) {
                invalid = true;
            }

            if (!invalid) {
                if (idx !== str.length) {
                    invalid = true;
                } else if (month === 2) {
                    if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
                        if (date > 29) {
                            invalid = true;
                        }
                    } else if (date > 28) {
                        invalid = true;
                    }
                } else if ((month === 4) || (month === 6) || (month === 9) || (month === 11)) {
                    if (date > 30) {
                        invalid = true;
                    }
                }
            }

            if (invalid) {
                if (silent) {
                    return null;
                }

                throw new Bridge.FormatException("String does not contain a valid string representation of a date and time.");
            }

            if (hh < 12 && tt === pm) {
                hh = hh - 0 + 12;
            } else if (hh > 11 && tt === am) {
                hh -= 12;
            }

            if (zzh === 0 && zzm === 0 && !utc) {
                return new Date(year, month - 1, date, hh, mm, ss, ff);
            }

            return new Date(Date.UTC(year, month - 1, date, hh - zzh, mm - zzm, ss, ff));
        },

        subparseInt: function (str, index, min, max) {
            var x,
                token;

            for (x = max; x >= min; x--) {
                token = str.substring(index, index + x);

                if (token.length < min) {
                    return null;
                }

                if (/^\d+$/.test(token)) {
                    return token;
                }
            }

            return null;
        },

        tryParse: function (value, provider, result, utc) {
            result.v = this.parse(value, provider, utc, true);

            if (result.v == null) {
                result.v = new Date(-864e13);

                return false;
            }

            return true;
        },

        tryParseExact: function (value, format, provider, result, utc) {
            result.v = this.parseExact(value, format, provider, utc, true);

            if (result.v == null) {
                result.v = new Date(-864e13);

                return false;
            }

            return true;
        },

        isDaylightSavingTime: function (dt) {
            var temp = Bridge.Date.today();

            temp.setMonth(0);
            temp.setDate(1);

            return temp.getTimezoneOffset() !== dt.getTimezoneOffset();
        },

        toUTC: function (date) {
            return new Date(date.getUTCFullYear(),
                            date.getUTCMonth(),
                            date.getUTCDate(),
                            date.getUTCHours(),
                            date.getUTCMinutes(),
                            date.getUTCSeconds(),
                            date.getUTCMilliseconds());
        },

        toLocal: function (date) {
            return new Date(Date.UTC(date.getFullYear(),
                                     date.getMonth(),
                                     date.getDate(),
                                     date.getHours(),
                                     date.getMinutes(),
                                     date.getSeconds(),
                                     date.getMilliseconds()));
        },

        dateDiff: function (a, b) {
            var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds());
            var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds(), b.getMilliseconds());

            return utc1 - utc2;
        },

        dateAddSubTimespan: function (d, t, direction) {
            var result = new Date(d.getTime());

            result.setDate(result.getDate() + (direction * t.getDays()));
            result.setHours(result.getHours() + (direction * t.getHours()));
            result.setMinutes(result.getMinutes() + (direction * t.getMinutes()));
            result.setSeconds(result.getSeconds() + (direction * t.getSeconds()));
            result.setMilliseconds(result.getMilliseconds() + (direction * t.getMilliseconds()));

            return result;
        },

        subdt: function (d, t) {
            return Bridge.hasValue(d) && Bridge.hasValue(t) ? this.dateAddSubTimespan(d, t, -1) : null;
        },

        adddt: function (d, t) {
            return Bridge.hasValue(d) && Bridge.hasValue(t) ? this.dateAddSubTimespan(d, t, 1) : null;
        },

        subdd: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? (new Bridge.TimeSpan(Bridge.Date.dateDiff(a, b) * 10000)) : null;
        },

        gt: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? (a > b) : false;
        },

        gte: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? (a >= b) : false;
        },

        lt: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? (a < b) : false;
        },

        lte: function (a, b) {
            return Bridge.hasValue(a) && Bridge.hasValue(b) ? (a <= b) : false;
        }
    };

    Bridge.Date = date;

    // @source TimeSpan.js

    Bridge.define("Bridge.TimeSpan", {
        inherits: [Bridge.IComparable],
        statics: {
            fromDays: function (value) {
                return new Bridge.TimeSpan(value * 864e9);
            },

            fromHours: function (value) {
                return new Bridge.TimeSpan(value * 36e9);
            },

            fromMilliseconds: function (value) {
                return new Bridge.TimeSpan(value * 1e4);
            },

            fromMinutes: function (value) {
                return new Bridge.TimeSpan(value * 6e8);
            },

            fromSeconds: function (value) {
                return new Bridge.TimeSpan(value * 1e7);
            },

            fromTicks: function (value) {
                return new Bridge.TimeSpan(value);
            },

            constructor: function () {
                this.zero = new Bridge.TimeSpan(Bridge.Long.Zero);
                this.maxValue = new Bridge.TimeSpan(Bridge.Long.MaxValue);
                this.minValue = new Bridge.TimeSpan(Bridge.Long.MinValue);
            },

            getDefaultValue: function () {
                return new Bridge.TimeSpan(Bridge.Long.Zero);
            },

            neg: function (t) {
                return Bridge.hasValue(t) ? (new Bridge.TimeSpan(t.ticks.neg())) : null;
            },

            sub: function (t1, t2) {
                return Bridge.hasValue(t1) && Bridge.hasValue(t2) ? (new Bridge.TimeSpan(t1.ticks.sub(t2.ticks))) : null;
            },

            eq: function (t1, t2) {
                return Bridge.hasValue(t1) && Bridge.hasValue(t2) ? (t1.ticks.eq(t2.ticks)) : null;
            },

            neq: function (t1, t2) {
                return Bridge.hasValue(t1) && Bridge.hasValue(t2) ? (t1.ticks.ne(t2.ticks)) : null;
            },

            plus: function (t) {
                return Bridge.hasValue(t) ? (new Bridge.TimeSpan(t.ticks)) : null;
            },

            add: function (t1, t2) {
                return Bridge.hasValue(t1) && Bridge.hasValue(t2) ? (new Bridge.TimeSpan(t1.ticks.add(t2.ticks))) : null;
            },

            gt: function (a, b) {
                return Bridge.hasValue(a) && Bridge.hasValue(b) ? (a.ticks.gt(b.ticks)) : false;
            },

            gte: function (a, b) {
                return Bridge.hasValue(a) && Bridge.hasValue(b) ? (a.ticks.gte(b.ticks)) : false;
            },

            lt: function (a, b) {
                return Bridge.hasValue(a) && Bridge.hasValue(b) ? (a.ticks.lt(b.ticks)) : false;
            },

            lte: function (a, b) {
                return Bridge.hasValue(a) && Bridge.hasValue(b) ? (a.ticks.lte(b.ticks)) : false;
            }
        },

        constructor: function () {
            this.ticks = Bridge.Long.Zero;

            if (arguments.length === 1) {
                this.ticks = arguments[0] instanceof Bridge.Long ? arguments[0] : new Bridge.Long(arguments[0]);
            } else if (arguments.length === 3) {
                this.ticks = new Bridge.Long(arguments[0]).mul(60).add(arguments[1]).mul(60).add(arguments[2]).mul(1e7);
            } else if (arguments.length === 4) {
                this.ticks = new Bridge.Long(arguments[0]).mul(24).add(arguments[1]).mul(60).add(arguments[2]).mul(60).add(arguments[3]).mul(1e7);
            } else if (arguments.length === 5) {
                this.ticks = new Bridge.Long(arguments[0]).mul(24).add(arguments[1]).mul(60).add(arguments[2]).mul(60).add(arguments[3]).mul(1e3).add(arguments[4]).mul(1e4);
            }
        },

        getTicks: function () {
            return this.ticks;
        },

        getDays: function () {
            return this.ticks.div(864e9).toNumber();
        },

        getHours: function () {
            return this.ticks.div(36e9).mod(24).toNumber();
        },

        getMilliseconds: function () {
            return this.ticks.div(1e4).mod(1e3).toNumber();
        },

        getMinutes: function () {
            return this.ticks.div(6e8).mod(60).toNumber();
        },

        getSeconds: function () {
            return this.ticks.div(1e7).mod(60).toNumber();
        },

        getTotalDays: function () {
            return this.ticks.toNumberDivided(864e9);
        },

        getTotalHours: function () {
            return this.ticks.toNumberDivided(36e9);
        },

        getTotalMilliseconds: function () {
            return this.ticks.toNumberDivided(1e4);
        },

        getTotalMinutes: function () {
            return this.ticks.toNumberDivided(6e8);
        },

        getTotalSeconds: function () {
            return this.ticks.toNumberDivided(1e7);
        },

        get12HourHour: function () {
            return (this.getHours() > 12) ? this.getHours() - 12 : (this.getHours() === 0) ? 12 : this.getHours();
        },

        add: function (ts) {
            return new Bridge.TimeSpan(this.ticks.add(ts.ticks));
        },

        subtract: function (ts) {
            return new Bridge.TimeSpan(this.ticks.sub(ts.ticks));
        },

        duration: function () {
            return new Bridge.TimeSpan(this.ticks.abs());
        },

        negate: function () {
            return new Bridge.TimeSpan(this.ticks.neg());
        },

        compareTo: function (other) {
            return this.ticks.compareTo(other.ticks);
        },

        equals: function (other) {
            return other.ticks.eq(this.ticks);
        },

        equalsT: function (other) {
            return other.ticks.eq(this.ticks);
        },

        format: function (formatStr, provider) {
            return this.toString(formatStr, provider);
        },

        toString: function (formatStr, provider) {
            var ticks = this.ticks,
                result = "",
                me = this,
                dtInfo = (provider || Bridge.CultureInfo.getCurrentCulture()).getFormat(Bridge.DateTimeFormatInfo),
                format = function (t, n) {
                    return Bridge.String.alignString((t | 0).toString(), n || 2, "0", 2);
                };

            if (formatStr) {
                return formatStr.replace(/dd?|HH?|hh?|mm?|ss?|tt?/g,
                    function (formatStr) {
                        switch (formatStr) {
                            case "d":
                                return me.getDays();
                            case "dd":
                                return format(me.getDays());
                            case "H":
                                return me.getHours();
                            case "HH":
                                return format(me.getHours());
                            case "h":
                                return me.get12HourHour();
                            case "hh":
                                return format(me.get12HourHour());
                            case "m":
                                return me.getMinutes();
                            case "mm":
                                return format(me.getMinutes());
                            case "s":
                                return me.getSeconds();
                            case "ss":
                                return format(me.getSeconds());
                            case "t":
                                return ((me.getHours() < 12) ? dtInfo.amDesignator : dtInfo.pmDesignator).substring(0, 1);
                            case "tt":
                                return (me.getHours() < 12) ? dtInfo.amDesignator : dtInfo.pmDesignator;
                        }
                    }
                );
            }

            if (ticks.abs().gte(864e9)) {
                result += format(ticks.toNumberDivided(864e9)) + ".";
                ticks = ticks.mod(864e9);
            }

            result += format(ticks.toNumberDivided(36e9)) + ":";
            ticks = ticks.mod(36e9);
            result += format(ticks.toNumberDivided(6e8) | 0) + ":";
            ticks = ticks.mod(6e8);
            result += format(ticks.toNumberDivided(1e7));
            ticks = ticks.mod(1e7);

            if (ticks.gt(0)) {
                result += "." + format(ticks.toNumber(), 7);
            }

            return result;
        }
    });

    Bridge.Class.addExtend(Bridge.TimeSpan, [Bridge.IComparable$1(Bridge.TimeSpan), Bridge.IEquatable$1(Bridge.TimeSpan)]);

// @source Text/StringBuilder.js

Bridge.define("Bridge.Text.StringBuilder", {
    constructor: function () {
        this.buffer = [],
        this.capacity = 16;

        if (arguments.length === 1) {
            this.append(arguments[0]);
        } else if (arguments.length === 2) {
            this.append(arguments[0]);
            this.setCapacity(arguments[1]);
        } else if (arguments.length === 3) {
            this.append(arguments[0], arguments[1], arguments[2]);
        }
    },

    getLength: function () {
        if (this.buffer.length < 2) {
            return this.buffer[0] ? this.buffer[0].length : 0;
        }

        var s = this.buffer.join("");

        this.buffer = [];
        this.buffer[0] = s;

        return s.length;
    },

    getCapacity: function () {
        var length = this.getLength();

        return (this.capacity > length) ? this.capacity : length;
    },

    setCapacity: function (value) {
        var length = this.getLength();

        if (value > length) {
            this.capacity = value;
        }
    },

    toString: function () {
        var s = this.buffer.join("");

        this.buffer = [];
        this.buffer[0] = s;

        if (arguments.length === 2) {
            var startIndex = arguments[0],
                length = arguments[1];

            this.checkLimits(s, startIndex, length);

            return s.substr(startIndex, length);
        }

        return s;
    },

    append: function (value) {
        if (value == null) {
            return this;
        }

        if (arguments.length === 2) {
            // append a char repeated count times
            var count = arguments[1];

            if (count === 0) {
                return this;
            } else if (count < 0) {
                throw new Bridge.ArgumentOutOfRangeException("count", "cannot be less than zero");
            }

            value = Array(count + 1).join(value).toString();
        } else if (arguments.length === 3) {
            // append a (startIndex, count) substring of value
            var startIndex = arguments[1],
                count = arguments[2];

            if (count === 0) {
                return this;
            }

            this.checkLimits(value, startIndex, count);
            value = value.substr(startIndex, count);
        }

        this.buffer[this.buffer.length] = value;

        return this;
    },

    appendFormat: function (format) {
        return this.append(Bridge.String.format.apply(Bridge.String, arguments));
    },

    clear: function () {
        this.buffer = [];

        return this;
    },

    appendLine: function () {
        if (arguments.length === 1) {
            this.append(arguments[0]);
        }

        return this.append("\r\n");
    },

    equals: function (sb) {
        if (sb == null) {
            return false;
        }

        if (sb === this) {
            return true;
        }

        return this.toString() === sb.toString();
    },

    remove: function (startIndex, length) {
        var s = this.buffer.join("");

        this.checkLimits(s, startIndex, length);

        if (s.length === length && startIndex === 0) {
            // Optimization.  If we are deleting everything
            return this.clear();
        }

        if (length > 0) {
            this.buffer = [];
            this.buffer[0] = s.substring(0, startIndex);
            this.buffer[1] = s.substring(startIndex + length, s.length);
        }

        return this;
    },

    insert: function (index, value) {
        if (value == null) {
            return this;
        }

        if (arguments.length === 3) {
            // insert value repeated count times
            var count = arguments[2];

            if (count === 0) {
                return this;
            } else if (count < 0) {
                throw new Bridge.ArgumentOutOfRangeException("count", "cannot be less than zero");
            }

            value = Array(count + 1).join(value).toString();
        }

        var s = this.buffer.join("");
        this.buffer = [];

        if (index < 1) {
            this.buffer[0] = value;
            this.buffer[1] = s;
        } else if (index >= s.length) {
            this.buffer[0] = s;
            this.buffer[1] = value;
        } else {
            this.buffer[0] = s.substring(0, index);
            this.buffer[1] = value;
            this.buffer[2] = s.substring(index, s.length);
        }

        return this;
    },

    replace: function (oldValue, newValue) {
        var r = new RegExp(oldValue, "g"),
            s = this.buffer.join("");

        this.buffer = [];

        if (arguments.length === 4) {
            var startIndex = arguments[2],
                count = arguments[3],
                b = s.substr(startIndex, count);

            this.checkLimits(s, startIndex, count);

            this.buffer[0] = s.substring(0, startIndex);
            this.buffer[1] = b.replace(r, newValue);
            this.buffer[2] = s.substring(startIndex + count, s.length);
        } else {
            this.buffer[0] = s.replace(r, newValue);
        }

        return this;
    },

    checkLimits: function (value, startIndex, length) {
        if (length < 0) {
            throw new Bridge.ArgumentOutOfRangeException("length", "must be non-negative");
        }

        if (startIndex < 0) {
            throw new Bridge.ArgumentOutOfRangeException("startIndex", "startIndex cannot be less than zero");
        }

        if (length > value.length - startIndex) {
            throw new Bridge.ArgumentOutOfRangeException("Index and length must refer to a location within the string");
        }
    }
});

// @source Text/BridgeRegex.js

(function () {
    var specials = [
            // order matters for these
              "-"
            , "["
            , "]"
            // order doesn't matter for any of these
            , "/"
            , "{"
            , "}"
            , "("
            , ")"
            , "*"
            , "+"
            , "?"
            , "."
            , "\\"
            , "^"
            , "$"
            , "|"
    ],

    regex = RegExp("[" + specials.join("\\") + "]", "g"),

    regexpEscape = function (s) {
        return s.replace(regex, "\\$&");
    };

    Bridge.regexpEscape = regexpEscape;
})();

    // @source Diagnostics.js

    Bridge.Debug = {
        writeln: function (text) {
            var global = Bridge.global;

            if (global.console) {
                if (global.console.debug) {
                    global.console.debug(text);

                    return;
                } else if (global.console.log) {
                    global.console.log(text);

                    return;
                }
            } else if (global.opera && global.opera.postError) {
                global.opera.postError(text);

                return;
            }
        },

        _fail: function (message) {
            Bridge.Debug.writeln(message);
            debugger;
        },

        assert: function (condition, message) {
            if (!condition) {
                message = 'Assert failed: ' + message;

                if (confirm(message + '\r\n\r\nBreak into debugger?')) {
                    Bridge.Debug._fail(message);
                }
            }
        },

        fail: function (message) {
            Bridge.Debug._fail(message);
        }
    }

    Bridge.define("Bridge.Stopwatch", {
        constructor: function () {
            this._stopTime = Bridge.Long.Zero;
            this._startTime = Bridge.Long.Zero;
            this.isRunning = false;
        },

        reset: function () {
            this._stopTime = this._startTime = Bridge.Stopwatch.getTimestamp();
            this.isRunning = false;
        },

        ticks: function () {
            return (this.isRunning ? Bridge.Stopwatch.getTimestamp() : this._stopTime).sub(this._startTime);
        },

        milliseconds: function () {
            return this.ticks().mul(1000).div(Bridge.Stopwatch.frequency);
        },

        timeSpan: function () {
            return new Bridge.TimeSpan(this.milliseconds().mul(10000));
        },

        start: function () {
            if (this.isRunning) {
                return;
            }

            this._startTime = Bridge.Stopwatch.getTimestamp();
            this.isRunning = true;
        },

        stop: function () {
            if (!this.isRunning) {
                return;
            }

            this._stopTime = Bridge.Stopwatch.getTimestamp();
            this.isRunning = false;
        },

        restart: function () {
            this.isRunning = false;
            this.start();
        },

        statics: {
            startNew: function () {
                var s = new Bridge.Stopwatch();

                s.start();

                return s;
            }
        }
    });

    if (typeof (window) !== 'undefined' && window.performance && window.performance.now) {
        Bridge.Stopwatch.frequency = new Bridge.Long(1e6);
        Bridge.Stopwatch.isHighResolution = true;
        Bridge.Stopwatch.getTimestamp = function () { return new Bridge.Long(Math.round(window.performance.now() * 1000)); };
    } else if (typeof (process) !== 'undefined' && process.hrtime) {
        Bridge.Stopwatch.frequency = new Bridge.Long(1e9);
        Bridge.Stopwatch.isHighResolution = true;
        Bridge.Stopwatch.getTimestamp = function () { var hr = process.hrtime(); return new Bridge.Long(hr[0]).mul(1e9).add(hr[1]); };
    } else {
        Bridge.Stopwatch.frequency = new Bridge.Long(1e3);
        Bridge.Stopwatch.isHighResolution = false;
        Bridge.Stopwatch.getTimestamp = function () { return new Bridge.Long(new Date().valueOf()); };
    }

    Bridge.Contract = {
	    reportFailure: function (failureKind, userMessage, condition, innerException, TException) {
	        var conditionText = condition.toString();

		    conditionText = conditionText.substring(conditionText.indexOf("return") + 7);
		    conditionText = conditionText.substr(0, conditionText.lastIndexOf(";"));

		    var failureMessage = (conditionText) ? "Contract '" + conditionText + "' failed" : "Contract failed";
		    var displayMessage = (userMessage) ? failureMessage + ": " + userMessage : failureMessage;

		    if (TException) {
			    throw new TException(conditionText, userMessage);
		    } else {
			    throw new Bridge.ContractException(failureKind, displayMessage, userMessage, conditionText, innerException);
		    }
	    },
	    assert: function (failureKind, condition, message) {
		    if (!condition()) {
			    Bridge.Contract.reportFailure(failureKind, message, condition, null);
		    }
	    },
	    requires: function (TException, condition, message) {
		    if (!condition()) {
			    Bridge.Contract.reportFailure(0, message, condition, null, TException);
		    }
	    },
	    forAll: function (fromInclusive, toExclusive, predicate) {
		    if (!predicate) {
			    throw new Bridge.ArgumentNullException("predicate");
		    }

		    for (; fromInclusive < toExclusive; fromInclusive++) {
			    if (!predicate(fromInclusive)) {
				    return false;
			    }
		    }

		    return true;
	    },
	    forAll$1: function (collection, predicate) {
		    if (!collection) {
			    throw new Bridge.ArgumentNullException("collection");
		    }

		    if (!predicate) {
			    throw new Bridge.ArgumentNullException("predicate");
		    }

		    var enumerator = Bridge.getEnumerator(collection);

	        try {
			    while (enumerator.moveNext()) {
				    if (!predicate(enumerator.getCurrent())) {
					    return false;
				    }
			    }
			    return true;
		    } finally {
			    enumerator.dispose();
		    }
	    },
	    exists: function (fromInclusive, toExclusive, predicate) {
		    if (!predicate) {
			    throw new Bridge.ArgumentNullException("predicate");
		    }

		    for (; fromInclusive < toExclusive; fromInclusive++) {
			    if (predicate(fromInclusive)) {
				    return true;
			    }
		    }

		    return false;
	    },
	    exists$1: function (collection, predicate) {
		    if (!collection) {
			    throw new Bridge.ArgumentNullException("collection");
		    }

		    if (!predicate) {
			    throw new Bridge.ArgumentNullException("predicate");
		    }

		    var enumerator = Bridge.getEnumerator(collection);

	        try {
			    while (enumerator.moveNext()) {
				    if (predicate(enumerator.getCurrent())) {
					    return true;
				    }
			    }
			    return false;
		    } finally {
			    enumerator.dispose();
		    }
	    }
    };

    Bridge.define("Bridge.ContractFailureKind", {
        $enum: true,
        $statics: {
            precondition: 0,
            postcondition: 1,
            postconditionOnException: 2,
            invarian: 3,
            assert: 4,
            assume: 5
        }
    });

    Bridge.define("Bridge.ContractException", {
        inherits: [Bridge.Exception],

        constructor: function (failureKind, failureMessage, userMessage, condition, innerException) {
            Bridge.Exception.prototype.$constructor.call(this, failureMessage, innerException);
            this._kind = failureKind;
            this._failureMessage = failureMessage || null;
            this._userMessage = userMessage || null;
            this._condition = condition || null;
        },

        getKind: function () {
		    return this._kind;
	    },
	    getFailure: function () {
		    return this._failureMessage;
	    },
	    getUserMessage: function () {
		    return this._userMessage;
	    },
	    getCondition: function () {
		    return this._condition;
	    }
    });

// @source Array.js

var array = {
    toIndex: function (arr, indices) {
        if (indices.length !== (arr.$s ? arr.$s.length : 1)) {
            throw new Bridge.ArgumentException("Invalid number of indices");
        }

        if (indices[0] < 0 || indices[0] >= (arr.$s ? arr.$s[0] : arr.length)) {
            throw new Bridge.ArgumentException("Index 0 out of range");
        }

        var idx = indices[0],
            i;

        if (arr.$s) {
            for (i = 1; i < arr.$s.length; i++) {
                if (indices[i] < 0 || indices[i] >= arr.$s[i]) {
                    throw new Bridge.ArgumentException("Index " + i + " out of range");
                }

                idx = idx * arr.$s[i] + indices[i];
            }
        }

        return idx;
    },

    $get: function (indices) {
        var r = this[Bridge.Array.toIndex(this, indices)];

        return typeof r !== "undefined" ? r : this.$v;
    },

    get: function (arr) {
        if (arguments.length < 2) {
            throw new Bridge.ArgumentNullException("indices");
        }

        var idx = Array.prototype.slice.call(arguments, 1);

        for (var i = 0; i < idx.length; i++) {
            if (!Bridge.hasValue(idx[i])) {
                throw new Bridge.ArgumentNullException("indices");
            }
        }

        var r = arr[Bridge.Array.toIndex(arr, idx)];

        return typeof r !== "undefined" ? r : arr.$v;
    },

    $set: function (indices, value) {
        this[Bridge.Array.toIndex(this, Array.prototype.slice.call(indices, 0))] = value;
    },

    set: function (arr, value) {
        var indices = Array.prototype.slice.call(arguments, 2);
        arr[Bridge.Array.toIndex(arr, indices)] = value;
    },

    getLength: function (arr, dimension) {
        if (dimension < 0 || dimension >= (arr.$s ? arr.$s.length : 1)) {
            throw new Bridge.IndexOutOfRangeException();
        }

        return arr.$s ? arr.$s[dimension] : arr.length;
    },

    getRank: function (arr) {
        return arr.$s ? arr.$s.length : 1;
    },

    getLower: function (arr, d) {
        Bridge.Array.getLength(arr, d);

        return 0;
    },

    create: function (defvalue, initValues, sizes) {
        var arr = [],
            length = arguments.length > 2 ? 1 : 0,
            i, s, v,
            idx,
            indices,
            flatIdx;

        arr.$v = defvalue;
        arr.$s = [];
        arr.get = Bridge.Array.$get;
        arr.set = Bridge.Array.$set;

        for (i = 2; i < arguments.length; i++) {
            length *= arguments[i];
            arr.$s[i - 2] = arguments[i];
        }

        arr.length = length;

        if (initValues) {
            for (i = 0; i < arr.length; i++) {
                indices = [];
                flatIdx = i;

                for (s = arr.$s.length - 1; s >= 0; s--) {
                    idx = flatIdx % arr.$s[s];
                    indices.unshift(idx);
                    flatIdx = Bridge.Int.div(flatIdx - idx, arr.$s[s]);
                }

                v = initValues;

                for (idx = 0; idx < indices.length; idx++) {
                    v = v[indices[idx]];
                }

                arr[i] = v;
            }
        }

        return arr;
    },

    init: function (size, value) {
        var arr = new Array(size),
            isFn = Bridge.isFunction(value);

        for (var i = 0; i < size; i++) {
            arr[i] = isFn ? value() : value;
        }

        return arr;
    },

    toEnumerable: function (array) {
        return new Bridge.ArrayEnumerable(array);
    },

    toEnumerator: function (array) {
        return new Bridge.ArrayEnumerator(array);
    },

    is: function (obj, type) {
        if (obj instanceof Bridge.ArrayEnumerator) {
            if ((obj.constructor === type) || (obj instanceof type) ||
                type === Bridge.ArrayEnumerator ||
                type.$$name && Bridge.String.startsWith(type.$$name, "Bridge.IEnumerator")) {
                return true;
            }

            return false;
        }


        if (!Bridge.isArray(obj)) {
            return false;
        }

        if ((obj.constructor === type) || (obj instanceof type)) {
            return true;
        }

        if (type === Bridge.IEnumerable ||
            type === Bridge.ICollection ||
            type === Bridge.ICloneable ||
            type.$$name && Bridge.String.startsWith(type.$$name, "Bridge.IEnumerable$1") ||
            type.$$name && Bridge.String.startsWith(type.$$name, "Bridge.ICollection$1") ||
            type.$$name && Bridge.String.startsWith(type.$$name, "Bridge.IList$1")) {
            return true;
        }

        return false;
    },

    clone: function (arr) {
        if (arr.length === 1) {
            return [arr[0]];
        } else {
            return arr.slice(0);
        }
    },

    getCount: function (obj) {
        if (Bridge.isArray(obj)) {
            return obj.length;
        } else if (Bridge.isFunction(obj.getCount)) {
            return obj.getCount();
        }

        return 0;
    },

    add: function (obj, item) {
        if (Bridge.isArray(obj)) {
            obj.push(item);
        } else if (Bridge.isFunction(obj.add)) {
            obj.add(item);
        }
    },

    clear: function (obj, T) {
        if (Bridge.isArray(obj)) {
            Bridge.Array.fill(obj, T ? (T.getDefaultValue || Bridge.getDefaultValue(T)) : null, 0, obj.length);
        } else if (Bridge.isFunction(obj.clear)) {
            obj.clear();
        }
    },

    fill: function (dst, val, index, count) {
        if (!Bridge.hasValue(dst)) {
            throw new Bridge.ArgumentNullException("dst");
        }

        if (index < 0 || count < 0 || (index + count) > dst.length) {
            throw new Bridge.IndexOutOfRangeException();
        }

        var isFn = Bridge.isFunction(val);

        while (--count >= 0) {
            dst[index + count] = isFn ? val() : val;
        }
    },

    copy: function (src, spos, dst, dpos, len) {
        if (spos < 0 || dpos < 0 || len < 0) {
            throw new Bridge.ArgumentOutOfRangeException();
        }

        if (len > (src.length - spos) || len > (dst.length - dpos)) {
            throw new Bridge.IndexOutOfRangeException();
        }

        if (spos < dpos && src === dst) {
            while (--len >= 0) {
                dst[dpos + len] = src[spos + len];
            }
        } else {
            for (var i = 0; i < len; i++) {
                dst[dpos + i] = src[spos + i];
            }
        }
    },

    indexOf: function (arr, item, startIndex, count) {
        if (Bridge.isArray(arr)) {
            var i,
                el,
                endIndex;

            startIndex = startIndex || 0;
            count = count || arr.length;
            endIndex = startIndex + count;

            for (i = startIndex; i < endIndex; i++) {
                el = arr[i];

                if (el === item || Bridge.EqualityComparer$1.$default.equals(el, item)) {
                    return i;
                }
            }
        } else if (Bridge.isFunction(arr.indexOf)) {
            return arr.indexOf(item);
        }

        return -1;
    },

    contains: function (obj, item) {
        if (Bridge.isArray(obj)) {
            return Bridge.Array.indexOf(obj, item) > -1;
        } else if (Bridge.isFunction(obj.contains)) {
            return obj.contains(item);
        }

        return false;
    },

    remove: function (obj, item) {
        if (Bridge.isArray(obj)) {
            var index = Bridge.Array.indexOf(obj, item);

            if (index > -1) {
                obj.splice(index, 1);

                return true;
            }
        } else if (Bridge.isFunction(obj.remove)) {
            return obj.remove(item);
        }

        return false;
    },

    insert: function (obj, index, item) {
        if (Bridge.isArray(obj)) {
            obj.splice(index, 0, item);
        } else if (Bridge.isFunction(obj.insert)) {
            obj.insert(index, item);
        }
    },

    removeAt: function (obj, index) {
        if (Bridge.isArray(obj)) {
            obj.splice(index, 1);
        } else if (Bridge.isFunction(obj.removeAt)) {
            obj.removeAt(index);
        }
    },

    getItem: function (obj, idx) {
        if (Bridge.isArray(obj)) {
            return obj[idx];
        } else if (Bridge.isFunction(obj.get)) {
            return obj.get(idx);
        } else if (Bridge.isFunction(obj.getItem)) {
            return obj.getItem(idx);
        } else if (Bridge.isFunction(obj.get_Item)) {
            return obj.get_Item(idx);
        }
    },

    setItem: function (obj, idx, value) {
        if (Bridge.isArray(obj)) {
            obj[idx] = value;
        } else if (Bridge.isFunction(obj.set)) {
            obj.set(idx, value);
        } else if (Bridge.isFunction(obj.setItem)) {
            obj.setItem(idx, value);
        } else if (Bridge.isFunction(obj.set_Item)) {
            obj.set_Item(idx, value);
        }
    },

    resize: function (arr, newSize, val) {
        if (newSize < 0) {
            throw new Bridge.ArgumentOutOfRangeException("newSize", null, null, newSize);
        }

        var oldSize = 0,
            isFn = Bridge.isFunction(val),
            ref = arr.v;

        if (!ref) {
            ref = new Array(newSize);
        } else {
            oldSize = ref.length;
            ref.length = newSize;
        }

        for (var i = oldSize; i < newSize; i++) {
            ref[i] = isFn ? val() : val;
        }

        arr.v = ref;
    },

    reverse: function (arr, index, length) {
        if (!array) {
            throw new Bridge.ArgumentNullException("arr");
        }

        if (!index && index !== 0) {
            index = 0;
            length = arr.length;
        }

        if (index < 0 || length < 0) {
            throw new Bridge.ArgumentOutOfRangeException((index < 0 ? "index" : "length"), "Non-negative number required.");
        }

        if ((array.length - index) < length) {
            throw new Bridge.ArgumentException("Offset and length were out of bounds for the array or count is greater than the number of elements from index to the end of the source collection.");
        }

        if (Bridge.Array.getRank(arr) !== 1) {
            throw new Bridge.Exception("Only single dimension arrays are supported here.");
        }

        var i = index,
            j = index + length - 1;

        while (i < j) {
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
    },

    binarySearch: function (array, index, length, value, comparer) {
        if (!array) {
            throw new Bridge.ArgumentNullException("array");
        }

        var lb = 0;

        if (index < lb || length < 0) {
            throw new Bridge.ArgumentOutOfRangeException(index < lb ? "index" : "length", "Non-negative number required.");
        }

        if (array.length - (index - lb) < length) {
            throw new Bridge.ArgumentException("Offset and length were out of bounds for the array or count is greater than the number of elements from index to the end of the source collection.");
        }

        if (Bridge.Array.getRank(array) !== 1) {
            throw new Bridge.RankException("Only single dimensional arrays are supported for the requested action.");
        }

        if (!comparer) {
            comparer = Bridge.Comparer$1.$default;
        }

        var lo = index,
            hi = index + length - 1,
            i,
            c;

        while (lo <= hi) {
            i = lo + ((hi - lo) >> 1);

            try {
                c = comparer.compare(array[i], value);
            }
            catch (e) {
                throw new Bridge.InvalidOperationException("Failed to compare two elements in the array.", e);
            }

            if (c === 0) {
                return i;
            }

            if (c < 0) {
                lo = i + 1;
            } else {
                hi = i - 1;
            }
        }

        return ~lo;
    },

    sort: function (array, index, length, comparer) {
        if (!array) {
            throw new Bridge.ArgumentNullException("array");
        }

        if (arguments.length === 2 && typeof index === "object") {
            comparer = index;
            index = null;
        }

        if (!Bridge.isNumber(index)) {
            index = 0;
        }

        if (!Bridge.isNumber(length)) {
            length = array.length;
        }

        if (!comparer) {
            comparer = Bridge.Comparer$1.$default;
        }

        if (index === 0 && length === array.length) {
            array.sort(Bridge.fn.bind(comparer, comparer.compare));
        } else {
            var newarray = array.slice(index, index + length);

            newarray.sort(Bridge.fn.bind(comparer, comparer.compare));

            for (var i = index; i < (index + length) ; i++) {
                array[i] = newarray[i - index];
            }
        }
    },

    min: function (arr, minValue) {
        var min = arr[0],
            len = arr.length;

        for (var i = 0; i < len; i++) {
            if ((arr[i] < min || min < minValue) && !(arr[i] < minValue)) {
                min = arr[i];
            }
        }
        return min;
    },

    max: function (arr, maxValue) {
        var max = arr[0],
            len = arr.length;

        for (var i = 0; i < len; i++) {
            if ((arr[i] > max || max > maxValue) && !(arr[i] > maxValue)) {
                max = arr[i];
            }
        }

        return max;
    },

    addRange: function (arr, items) {
        if (Bridge.isArray(items)) {
            arr.push.apply(arr, items);
        } else {
            var e = Bridge.getEnumerator(items);

            try {
                while (e.moveNext()) {
                    arr.push(e.getCurrent());
                }
            }
            finally {
                if (Bridge.is(e, Bridge.IDisposable)) {
                    e.dispose();
                }
            }
        }
    },

    convertAll: function (array, converter) {
        if (!Bridge.hasValue(array)) {
            throw new Bridge.ArgumentNullException("array");
        }

        if (!Bridge.hasValue(converter)) {
            throw new Bridge.ArgumentNullException("converter");
        }

        var array2 = [];

        for (var i = 0; i < array.length; i++) {
            array2[i] = converter(array[i]);
        }

        return array2;
    },

    find: function (T, array, match) {
        if (!Bridge.hasValue(array)) {
            throw new Bridge.ArgumentNullException("array");
        }

        if (!Bridge.hasValue(match)) {
            throw new Bridge.ArgumentNullException("match");
        }

        for (var i = 0; i < array.length; i++) {
            if (match(array[i])) {
                return array[i];
            }
        }

        return Bridge.getDefaultValue(T);
    },

    findAll: function (array, match) {
        if (!Bridge.hasValue(array)) {
            throw new Bridge.ArgumentNullException("array");
        }

        if (!Bridge.hasValue(match)) {
            throw new Bridge.ArgumentNullException("match");
        }

        var list = [];

        for (var i = 0; i < array.length; i++) {
            if (match(array[i])) {
                list.push(array[i]);
            }
        }

        return list;
    },

    findIndex: function (array, startIndex, count, match) {
        if (!Bridge.hasValue(array)) {
            throw new Bridge.ArgumentNullException("array");
        }

        if (arguments.length === 2) {
            match = startIndex;
            startIndex = 0;
            count = array.length;
        } else if (arguments.length === 3) {
            match = count;
            count = array.length - startIndex;
        }

        if (startIndex < 0 || startIndex > array.length) {
            throw new Bridge.ArgumentOutOfRangeException("startIndex");
        }

        if (count < 0 || startIndex > array.length - count) {
            throw new Bridge.ArgumentOutOfRangeException("count");
        }

        if (!Bridge.hasValue(match)) {
            throw new Bridge.ArgumentNullException("match");
        }

        var endIndex = startIndex + count;

        for (var i = startIndex; i < endIndex; i++) {
            if (match(array[i])) {
                return i;
            }
        }

        return -1;
    },

    findLast: function (T, array, match) {
        if (!Bridge.hasValue(array)) {
            throw new Bridge.ArgumentNullException("array");
        }

        if (!Bridge.hasValue(match)) {
            throw new Bridge.ArgumentNullException("match");
        }

        for (var i = array.length - 1; i >= 0; i--) {
            if (match(array[i])) {
                return array[i];
            }
        }

        return Bridge.getDefaultValue(T);
    },

    findLastIndex: function (array, startIndex, count, match) {
        if (!Bridge.hasValue(array)) {
            throw new Bridge.ArgumentNullException("array");
        }

        if (arguments.length === 2) {
            match = startIndex;
            startIndex = array.length - 1;
            count = array.length;
        } else if (arguments.length === 3) {
            match = count;
            count = startIndex + 1;
        }

        if (!Bridge.hasValue(match)) {
            throw new Bridge.ArgumentNullException("match");
        }

        if (array.length === 0) {
            if (startIndex !== -1) {
                throw new Bridge.ArgumentOutOfRangeException("startIndex");
            }
        } else {
            if (startIndex < 0 || startIndex >= array.length) {
                throw new Bridge.ArgumentOutOfRangeException("startIndex");
            }
        }

        if (count < 0 || startIndex - count + 1 < 0) {
            throw new Bridge.ArgumentOutOfRangeException("count");
        }

        var endIndex = startIndex - count;

        for (var i = startIndex; i > endIndex; i--) {
            if (match(array[i])) {
                return i;
            }
        }

        return -1;
    },

    forEach: function (array, action) {
        if (!Bridge.hasValue(array)) {
            throw new Bridge.ArgumentNullException("array");
        }

        if (!Bridge.hasValue(action)) {
            throw new Bridge.ArgumentNullException("action");
        }

        for (var i = 0; i < array.length; i++) {
            action(array[i]);
        }
    },

    indexOfT: function (array, value, startIndex, count) {
        if (!Bridge.hasValue(array)) {
            throw new Bridge.ArgumentNullException("array");
        }

        if (arguments.length === 2) {
            startIndex = 0;
            count = array.length;
        } else if (arguments.length === 3) {
            count = array.length - startIndex;
        }

        if (startIndex < 0 || (startIndex >= array.length && array.length > 0)) {
            throw new Bridge.ArgumentOutOfRangeException("startIndex", "out of range");
        }

        if (count < 0 || count > array.length - startIndex) {
            throw new Bridge.ArgumentOutOfRangeException("count", "out of range");
        }

        return Bridge.Array.indexOf(array, value, startIndex, count);
    },

    lastIndexOfT: function (array, value, startIndex, count) {
        if (!Bridge.hasValue(array)) {
            throw new Bridge.ArgumentNullException("array");
        }

        if (arguments.length === 2) {
            startIndex = array.length - 1;
            count = array.length;
        } else if (arguments.length === 3) {
            count = (array.length === 0) ? 0 : (startIndex + 1);
        }

        if (startIndex < 0 || (startIndex >= array.length && array.length > 0)) {
            throw new Bridge.ArgumentOutOfRangeException("startIndex", "out of range");
        }

        if (count < 0 || startIndex - count + 1 < 0) {
            throw new Bridge.ArgumentOutOfRangeException("count", "out of range");
        }

        var endIndex = startIndex - count + 1;

        for (var i = startIndex; i >= endIndex; i--) {
            var el = array[i];

            if (el === value || Bridge.EqualityComparer$1.$default.equals(el, value)) {
                return i;
            }
        }

        return -1;
    },

    trueForAll: function (array, match) {
        if (!Bridge.hasValue(array)) {
            throw new Bridge.ArgumentNullException("array");
        }

        if (!Bridge.hasValue(match)) {
            throw new Bridge.ArgumentNullException("match");
        }

        for (var i = 0; i < array.length; i++) {
            if (!match(array[i])) {
                return false;
            }
        }

        return true;
    }
};

Bridge.Array = array;

// @source /Collections/Interfaces.js

Bridge.define('Bridge.IEnumerable');
Bridge.define('Bridge.IEnumerator');
Bridge.define('Bridge.IEqualityComparer');
Bridge.define('Bridge.ICollection', {
    inherits: [Bridge.IEnumerable]
});

Bridge.define('Bridge.IEnumerator$1', function (T) { return {
    inherits: [Bridge.IEnumerator]
};
});

Bridge.define('Bridge.IEnumerable$1', function (T) {
    return {
        inherits: [Bridge.IEnumerable]
    };
});

Bridge.define('Bridge.ICollection$1', function (T) {
    return {
        inherits: [Bridge.IEnumerable$1(T)]
    };
});

Bridge.define('Bridge.IEqualityComparer$1', function (T) {
    return {};
});

Bridge.define('Bridge.IDictionary$2', function (TKey, TValue) {
    return {
        inherits: [Bridge.IEnumerable$1(Bridge.KeyValuePair$2(TKey, TValue))]
    };
});

Bridge.define('Bridge.IList$1', function (T) {
    return {
        inherits: [Bridge.ICollection$1(T)]
    };
});

Bridge.define('Bridge.IComparer$1', function (T) {
    return {};
});

Bridge.define('Bridge.ISet$1', function (T) {
    return {
        inherits: [Bridge.ICollection$1(T)]
    };
});
// @source /Collections/CustomEnumerator.js

Bridge.define('Bridge.CustomEnumerator', {
    inherits: [Bridge.IEnumerator],

    constructor: function (moveNext, getCurrent, reset, dispose, scope) {
        this.$moveNext = moveNext;
        this.$getCurrent = getCurrent;
        this.$dispose = dispose;
        this.$reset = reset;
        this.scope = scope;
    },

    moveNext: function () {
        try {
            return this.$moveNext.call(this.scope);
        }
        catch (ex) {
            this.dispose.call(this.scope);

            throw ex;
        }
    },

    getCurrent: function () {
        return this.$getCurrent.call(this.scope);
    },

    getCurrent$1: function () {
        return this.$getCurrent.call(this.scope);
    },

    reset: function () {
        if (this.$reset) {
            this.$reset.call(this.scope);
        }
    },

    dispose: function () {
        if (this.$dispose) {
            this.$dispose.call(this.scope);
        }
    }
});

// @source /Collections/ArrayEnumerator.js

Bridge.define('Bridge.ArrayEnumerator', {
    inherits: [Bridge.IEnumerator],

    constructor: function (array) {
        this.array = array;
        this.reset();
    },
    
    moveNext: function () {
        this.index++;

        return this.index < this.array.length;
    },

    getCurrent: function () {
        return this.array[this.index];
    },

    getCurrent$1: function () {
        return this.array[this.index];
    },

    reset: function () {
        this.index = -1;
    },

    dispose: Bridge.emptyFn
});

Bridge.define('Bridge.ArrayEnumerable', {
    inherits: [Bridge.IEnumerable],
    constructor: function (array) {
        this.array = array;
    },

    getEnumerator: function () {
        return new Bridge.ArrayEnumerator(this.array);
    }
});
// @source /Collections/Comparer.js

Bridge.define('Bridge.EqualityComparer$1', function (T) {
    return {
        inherits: [Bridge.IEqualityComparer$1(T)],

        equals: function (x, y) {
            if (!Bridge.isDefined(x, true)) {
                return !Bridge.isDefined(y, true);
            } else if (Bridge.isDefined(y, true)) {
                var isBridge = x && x.$$name;

                if (!isBridge) {
                    return Bridge.equals(x, y);
                }
                else if (Bridge.isFunction(x.equalsT)) {
                    return Bridge.equalsT(x, y);
                }
                else if (Bridge.isFunction(x.equals)) {
                    return Bridge.equals(x, y);
                }

                return x === y;
            }

            return false;
        },

        getHashCode: function (obj) {
            return Bridge.isDefined(obj, true) ? Bridge.getHashCode(obj) : 0;
        }
    };
});

Bridge.EqualityComparer$1.$default = new Bridge.EqualityComparer$1(Object)();

Bridge.define('Bridge.Comparer$1', function (T) {
    return {
        inherits: [Bridge.IComparer$1(T)],

        constructor: function (fn) {
            this.fn = fn;
            this.compare = fn;
        }
    }
});

Bridge.Comparer$1.$default = new Bridge.Comparer$1(Object)(function (x, y) {
    if (!Bridge.hasValue(x)) {
        return !Bridge.hasValue(y) ? 0 : -1;
    } else if (!Bridge.hasValue(y)) {
        return 1;
    }

    return Bridge.compare(x, y);
});
// @source /Collections/Dictionary.js

Bridge.define('Bridge.KeyValuePair$2', function (TKey, TValue) {
    return {
        constructor: function (key, value) {
            this.key = key;
            this.value = value;
        },

        toString: function () {
            var s = "[";
            
            if (this.key != null) {
                s += this.key.toString();
            }

            s += ", ";

            if (this.value != null) {
                s += this.value.toString();
            }

            s += "]";

            return s;
        }
    };
});

Bridge.define('Bridge.Dictionary$2', function (TKey, TValue) {
    return {
        inherits: [Bridge.IDictionary$2(TKey, TValue)],

        constructor: function (obj, comparer) {
            this.comparer = comparer || Bridge.EqualityComparer$1.$default;
            this.clear();

            if (Bridge.is(obj, Bridge.Dictionary$2(TKey, TValue))) {
                var e = Bridge.getEnumerator(obj),
                    c;

                while (e.moveNext()) {
                    c = e.getCurrent();
                    this.add(c.key, c.value);
                }
            } else if (Object.prototype.toString.call(obj) === '[object Object]') {
                var names = Bridge.getPropertyNames(obj),
                    name;

                for (var i = 0; i < names.length; i++) {
                    name = names[i];
                    this.add(name, obj[name]);
                }
            }
        },

        getKeys: function () {
            return new Bridge.DictionaryCollection$1(TKey)(this, true);
        },

        getValues: function () {
            return new Bridge.DictionaryCollection$1(TValue)(this, false);
        },

        clear: function () {
            this.entries = { };
            this.count = 0;
        },

        findEntry: function (key) {
            var hash = this.comparer.getHashCode(key),
                entries,
                i;

            if (Bridge.isDefined(this.entries[hash])) {
                entries = this.entries[hash];

                for (i = 0; i < entries.length; i++) {
                    if (this.comparer.equals(entries[i].key, key)) {
                        return entries[i];
                    }
                }
            }
        },

        containsKey: function (key) {
            return !!this.findEntry(key);
        },

        containsValue: function (value) {
            var e, i;

            for (e in this.entries) {
                if (this.entries.hasOwnProperty(e)) {
                    var entries = this.entries[e];

                    for (i = 0; i < entries.length; i++) {
                        if (this.comparer.equals(entries[i].value, value)) {
                            return true;
                        }
                    }
                }
            }

            return false;
        },

        get: function (key) {
            var entry = this.findEntry(key);

            if (!entry) {
                throw new Bridge.KeyNotFoundException('Key ' + key + ' does not exist.');
            }

            return entry.value;
        },

        getItem: function (key) {
            return this.get(key);
        },

        set: function (key, value, add) {
            var entry = this.findEntry(key),
                hash;

            if (entry) {
                if (add) {
                    throw new Bridge.ArgumentException('Key ' + key + ' already exists.');
                }

                entry.value = value;
                return;
            }

            hash = this.comparer.getHashCode(key);
            entry = new Bridge.KeyValuePair$2(TKey, TValue)(key, value);

            if (this.entries[hash]) {
                this.entries[hash].push(entry);
            } else {
                this.entries[hash] = [entry];
            }

            this.count++;
        },

        setItem: function (key, value, add) {
            this.set(key, value, add);
        },

        add: function (key, value) {
            this.set(key, value, true);
        },

        remove: function (key) {
            var hash = this.comparer.getHashCode(key),
                entries,
                i;

            if (!this.entries[hash]) {
                return false;
            }

            entries = this.entries[hash];

            for (i = 0; i < entries.length; i++) {
                if (this.comparer.equals(entries[i].key, key)) {
                    entries.splice(i, 1);

                    if (entries.length == 0) {
                        delete this.entries[hash];
                    }

                    this.count--;

                    return true;
                }
            }

            return false;
        },

        getCount: function () {
            return this.count;
        },

        getComparer: function () {
            return this.comparer;
        },

        tryGetValue: function (key, value) {
            var entry = this.findEntry(key);

            value.v = entry ? entry.value : Bridge.getDefaultValue(TValue);

            return !!entry;
        },

        getCustomEnumerator: function (fn) {
            var hashes = Bridge.getPropertyNames(this.entries),
                hashIndex = -1,
                keyIndex;

            return new Bridge.CustomEnumerator(function () {
                if (hashIndex < 0 || keyIndex >= (this.entries[hashes[hashIndex]].length - 1)) {
                    keyIndex = -1;
                    hashIndex++;
                }

                if (hashIndex >= hashes.length) {
                    return false;
                }

                keyIndex++;

                return true;
            }, function () {
                return fn(this.entries[hashes[hashIndex]][keyIndex]);
            }, function () {
                hashIndex = -1;
            }, null, this);
        },

        getEnumerator: function () {
            return this.getCustomEnumerator(function (e) {
                 return e;
            });
        }
    };
});

Bridge.define('Bridge.DictionaryCollection$1', function (T) {
    return {
        inherits: [Bridge.ICollection$1(T)],

        constructor: function (dictionary, keys) {
            this.dictionary = dictionary;
            this.keys = keys;
        },

        getCount: function () {
            return this.dictionary.getCount();
        },

        getEnumerator: function () {
            return this.dictionary.getCustomEnumerator(this.keys ? function (e) {
                return e.key;
            } : function (e) {
                return e.value;
            });
        },

        contains: function (value) {
            return this.keys ? this.dictionary.containsKey(value) : this.dictionary.containsValue(value);
        },

        add: function (v) {
            throw new Bridge.NotSupportedException();
        },

        clear: function () {
            throw new Bridge.NotSupportedException();
        },

        remove: function () {
            throw new Bridge.NotSupportedException();
        }
    };
});

// @source /Collections/List.js

Bridge.define('Bridge.List$1', function (T) {
    return {
        inherits: [Bridge.ICollection$1(T), Bridge.ICollection, Bridge.IList$1(T)],
        constructor: function (obj) {
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                this.items = Bridge.Array.clone(obj);
            } else if (Bridge.is(obj, Bridge.IEnumerable)) {
                this.items = Bridge.toArray(obj);
            } else {
                this.items = [];
            }
        },

        checkIndex: function (index) {
            if (index < 0 || index > (this.items.length - 1)) {
                throw new Bridge.ArgumentOutOfRangeException('Index out of range');
            }
        },

        getCount: function () {
            return this.items.length;
        },

        get: function (index) {
            this.checkIndex(index);

            return this.items[index];
        },

        getItem: function (index) {
            return this.get(index);
        },

        set: function (index, value) {
            this.checkReadOnly();
            this.checkIndex(index);
            this.items[index] = value;
        },

        setItem: function (index, value) {
            this.set(index, value);
        },

        add: function (value) {
            this.checkReadOnly();
            this.items.push(value);
        },

        addRange: function (items) {
            this.checkReadOnly();

            var array = Bridge.toArray(items),
                i,
                len;

            for (i = 0, len = array.length; i < len; ++i) {
                this.items.push(array[i]);
            }
        },

        clear: function () {
            this.checkReadOnly();
            this.items = [];
        },

        indexOf: function (item, startIndex) {
            var i, el;

            if (!Bridge.isDefined(startIndex)) {
                startIndex = 0;
            }

            if (startIndex !== 0) {
                this.checkIndex(startIndex);
            }

            for (i = startIndex; i < this.items.length; i++) {
                el = this.items[i];

                if (el === item || Bridge.EqualityComparer$1.$default.equals(el, item)) {
                    return i;
                }
            }

            return -1;
        },

        insertRange: function (index, items) {
            this.checkReadOnly();

            if (index !== this.items.length) {
                this.checkIndex(index);
            }

            var array = Bridge.toArray(items);

            for (var i = 0; i < array.length; i++) {
                this.insert(index++, array[i]);
            }
        },

        contains: function (item) {
            return this.indexOf(item) > -1;
        },

        getEnumerator: function () {
            return new Bridge.ArrayEnumerator(this.items);
        },

        getRange: function (index, count) {
            if (!Bridge.isDefined(index)) {
                index = 0;
            }

            if (!Bridge.isDefined(count)) {
                count = this.items.length;
            }

            if (index !== 0) {
                this.checkIndex(index);
            }

            this.checkIndex(index + count - 1);

            var result = [],
                i,
				maxIndex = index + count;
				
            for (i = index; i < maxIndex; i++) {
                result.push(this.items[i]);
            }

            return new Bridge.List$1(T)(result);
        },

        insert: function (index, item) {
            this.checkReadOnly();

            if (index !== this.items.length) {
                this.checkIndex(index);
            }

            if (Bridge.isArray(item)) {
                for (var i = 0; i < item.length; i++) {
                    this.insert(index++, item[i]);
                }
            } else {
                this.items.splice(index, 0, item);
            }
        },

        join: function (delimeter) {
            return this.items.join(delimeter);
        },

        lastIndexOf: function (item, fromIndex) {
            if (!Bridge.isDefined(fromIndex)) {
                fromIndex = this.items.length - 1;
            }

            if (fromIndex !== 0) {
                this.checkIndex(fromIndex);
            }

            for (var i = fromIndex; i >= 0; i--) {
                if (item === this.items[i]) {
                    return i;
                }
            }

            return -1;
        },

        remove: function (item) {
            this.checkReadOnly();

            var index = this.indexOf(item);

            if (index < 0) {
                return false;
            }

            this.checkIndex(index);
            this.items.splice(index, 1);
            return true;
        },

        removeAt: function (index) {
            this.checkReadOnly();
            this.checkIndex(index);
            this.items.splice(index, 1);
        },

        removeRange: function (index, count) {
            this.checkReadOnly();
            this.checkIndex(index);
            this.items.splice(index, count);
        },

        reverse: function () {
            this.checkReadOnly();
            this.items.reverse();
        },

        slice: function (start, end) {
            this.checkReadOnly();

            return new Bridge.List$1(this.$$name.substr(this.$$name.lastIndexOf('$')+1))(this.items.slice(start, end));
        },

        sort: function (comparison) {
            this.checkReadOnly();
            this.items.sort(comparison || Bridge.Comparer$1.$default.compare);
        },

        splice: function (start, count, items) {
            this.checkReadOnly();
            this.items.splice(start, count, items);
        },

        unshift: function () {
            this.checkReadOnly();
            this.items.unshift();
        },

        toArray: function () {
            return Bridge.toArray(this);
        },

        checkReadOnly: function () {
            if (this.readOnly) {
                throw new Bridge.NotSupportedException();
            }
        },

        binarySearch: function (index, length, value, comparer) {
            if (arguments.length === 1) {
                value = index;
                index = null;
            }

            if (arguments.length === 2) {
                value = index;
                comparer = length;
                index = null;
                length = null;
            }

            if (!Bridge.isNumber(index)) {
                index = 0;
            }

            if (!Bridge.isNumber(length)) {
                length = this.items.length;
            }

            if (!comparer) {
                comparer = Bridge.Comparer$1.$default;
            }

            return Bridge.Array.binarySearch(this.items, index, length, value, comparer);
        },

        convertAll: function (TOutput, converter) {
            if (!Bridge.hasValue(converter)) {
                throw new Bridge.ArgumentNullException("converter is null.");
            }

            var list = new Bridge.List$1(TOutput)(this.items.length);
            for (var i = 0; i < this.items.length; i++) {
                list.items[i] = converter(this.items[i]);
            }

            return list;
        }
    };
});

Bridge.define('Bridge.ReadOnlyCollection$1', function (T) {
    return {
        inherits: [Bridge.List$1(T)],
        constructor: function (list) {
            if (list == null) {
                throw new Bridge.ArgumentNullException("list");
            }

            Bridge.List$1(T).prototype.$constructor.call(this, list);
            this.readOnly = true;
        }
    };
});

    // @source Task.js

    Bridge.define("Bridge.Task", {
        inherits: [Bridge.IDisposable],
        constructor: function (action, state) {
            this.action = action;
            this.state = state;
            this.exception = null;
            this.status = Bridge.TaskStatus.created;
            this.callbacks = [];
            this.result = null;
        },

        statics: {
            delay: function (delay, state) {
                var tcs = new Bridge.TaskCompletionSource();

                setTimeout(function () {
                    tcs.setResult(state);
                }, delay);

                return tcs.task;
            },

            fromResult: function (result) {
                var t = new Bridge.Task();

                t.status = Bridge.TaskStatus.ranToCompletion;
                t.result = result;

                return t;
            },

            run: function (fn) {
                var tcs = new Bridge.TaskCompletionSource();

                setTimeout(function () {
                    try {
                        tcs.setResult(fn());
                    } catch (e) {
                        tcs.setException(Bridge.Exception.create(e));
                    }
                }, 0);

                return tcs.task;
            },

            whenAll: function (tasks) {
                var tcs = new Bridge.TaskCompletionSource(),
                    result,
                    executing,
                    cancelled = false,
                    exceptions = [],
                    i;

                if (Bridge.is(tasks, Bridge.IEnumerable)) {
                    tasks = Bridge.toArray(tasks);
                } else if (!Bridge.isArray(tasks)) {
                    tasks = Array.prototype.slice.call(arguments, 0);
                }

                if (tasks.length === 0) {
                    tcs.setResult([]);

                    return tcs.task;
                }

                executing = tasks.length;
                result = new Array(tasks.length);

                for (i = 0; i < tasks.length; i++) {
                    (function (i) {
                        tasks[i].continueWith(function (t) {
                            switch (t.status) {
                                case Bridge.TaskStatus.ranToCompletion:
                                    result[i] = t.getResult();
                                    break;
                                case Bridge.TaskStatus.canceled:
                                    cancelled = true;
                                    break;
                                case Bridge.TaskStatus.faulted:
                                    Bridge.Array.addRange(exceptions, t.exception.innerExceptions);
                                    break;
                                default:
                                    throw new Bridge.InvalidOperationException("Invalid task status: " + t.status);
                            }

                            if (--executing === 0) {
                                if (exceptions.length > 0) {
                                    tcs.setException(exceptions);
                                } else if (cancelled) {
                                    tcs.setCanceled();
                                } else {
                                    tcs.setResult(result);
                                }
                            }
                        });
                    })(i);
                }

                return tcs.task;
            },

            whenAny: function (tasks) {
                if (Bridge.is(tasks, Bridge.IEnumerable)) {
                    tasks = Bridge.toArray(tasks);
                } else if (!Bridge.isArray(tasks)) {
                    tasks = Array.prototype.slice.call(arguments, 0);
                }

                if (!tasks.length) {
                    throw new Bridge.ArgumentException("At least one task is required");
                }

                var tcs = new Bridge.TaskCompletionSource(),
                    i;

                for (i = 0; i < tasks.length; i++) {
                    tasks[i].continueWith(function (t) {
                        switch (t.status) {
                            case Bridge.TaskStatus.ranToCompletion:
                                tcs.trySetResult(t);
                                break;
                            case Bridge.TaskStatus.canceled:
                                tcs.trySetCanceled();
                                break;
                            case Bridge.TaskStatus.faulted:
                                tcs.trySetException(t.exception.innerExceptions);
                                break;
                            default:
                                throw new Bridge.InvalidOperationException("Invalid task status: " + t.status);
                        }
                    });
                }

                return tcs.task;
            },

            fromCallback: function (target, method) {
                var tcs = new Bridge.TaskCompletionSource(),
                    args = Array.prototype.slice.call(arguments, 2),
                    callback;

                callback = function (value) {
                    tcs.setResult(value);
                };

                args.push(callback);

                target[method].apply(target, args);

                return tcs.task;
            },

            fromCallbackResult: function (target, method, resultHandler) {
                var tcs = new Bridge.TaskCompletionSource(),
                    args = Array.prototype.slice.call(arguments, 3),
                    callback;

                callback = function (value) {
                    tcs.setResult(value);
                };

                resultHandler(args, callback);

                target[method].apply(target, args);

                return tcs.task;
            },

            fromCallbackOptions: function (target, method, name) {
                var tcs = new Bridge.TaskCompletionSource(),
                    args = Array.prototype.slice.call(arguments, 3),
                    callback;

                callback = function (value) {
                    tcs.setResult(value);
                };

                args[0] = args[0] || { };
                args[0][name] = callback;

                target[method].apply(target, args);

                return tcs.task;
            },

            fromPromise: function (promise, handler, errorHandler, progressHandler) {
                var tcs = new Bridge.TaskCompletionSource();

                if (!promise.then) {
                    promise = promise.promise();
                }

                if (typeof (handler) === 'number') {
                    handler = (function (i) { return function () { return arguments[i >= 0 ? i : (arguments.length + i)]; }; })(handler);
                } else if (typeof (handler) !== 'function') {
                    handler = function () { return Array.prototype.slice.call(arguments, 0); };
                }

                promise.then(function () {
                    tcs.setResult(handler ? handler.apply(null, arguments) : Array.prototype.slice.call(arguments, 0));
                }, function () {
                    tcs.setException(errorHandler ? errorHandler.apply(null, arguments) : new Bridge.PromiseException(Array.prototype.slice.call(arguments, 0)));
                }, progressHandler);

                return tcs.task;
            }
        },

        continueWith: function (continuationAction, raise) {
            var tcs = new Bridge.TaskCompletionSource(),
                me = this,
                fn = raise ? function () {
                    tcs.setResult(continuationAction(me));
                } : function () {
                    try {
                        tcs.setResult(continuationAction(me));
                    }
                    catch (e) {
                        tcs.setException(Bridge.Exception.create(e));
                    }
                };

            if (this.isCompleted()) {
                setTimeout(fn, 0);
            } else {
                this.callbacks.push(fn);
            }

            return tcs.task;
        },

        start: function () {
            if (this.status !== Bridge.TaskStatus.created) {
                throw new Bridge.InvalidOperationException("Task was already started.");
            }

            var me = this;

            this.status = Bridge.TaskStatus.running;

            setTimeout(function () {
                try {
                    var result = me.action(me.state);
                    delete me.action;
                    delete me.state;
                    me.complete(result);
                } catch (e) {
                    me.fail(new Bridge.AggregateException(null, [Bridge.Exception.create(e)]));
                }
            }, 0);
        },

        runCallbacks: function () {
            var me = this;

            setTimeout(function () {
                for (var i = 0; i < me.callbacks.length; i++) {
                    me.callbacks[i](me);
                }

                delete me.callbacks;
            }, 0);
        },

        complete: function (result) {
            if (this.isCompleted()) {
                return false;
            }

            this.result = result;
            this.status = Bridge.TaskStatus.ranToCompletion;
            this.runCallbacks();

            return true;
        },

        fail: function (error) {
            if (this.isCompleted()) {
                return false;
            }

            this.exception = error;
            this.status = Bridge.TaskStatus.faulted;
            this.runCallbacks();

            return true;
        },

        cancel: function () {
            if (this.isCompleted()) {
                return false;
            }

            this.status = Bridge.TaskStatus.canceled;
            this.runCallbacks();

            return true;
        },

        isCanceled: function () {
            return this.status === Bridge.TaskStatus.canceled;
        },

        isCompleted: function () {
            return this.status === Bridge.TaskStatus.ranToCompletion || this.status === Bridge.TaskStatus.canceled || this.status === Bridge.TaskStatus.faulted;
        },

        isFaulted: function () {
            return this.status === Bridge.TaskStatus.faulted;
        },

        _getResult: function (awaiting) {
            switch (this.status) {
                case Bridge.TaskStatus.ranToCompletion:
                    return this.result;
                case Bridge.TaskStatus.canceled:
                    var ex = new Bridge.TaskCanceledException(null, this);
                    throw awaiting ? ex : new Bridge.AggregateException(null, [ex]);
                case Bridge.TaskStatus.faulted:
                    throw awaiting ? (this.exception.innerExceptions.getCount() > 0 ? this.exception.innerExceptions.get(0) : null) : this.exception;
                default:
                    throw new Bridge.InvalidOperationException("Task is not yet completed.");
            }
        },

        getResult: function () {
            return this._getResult(false);
        },

        dispose: function () {
        },

        getAwaiter: function () {
            return this;
        },

        getAwaitedResult: function () {
            return this._getResult(true);
        }
    });

    Bridge.define("Bridge.TaskStatus", {
        $enum: true,
        $statics: {
            created: 0,
            waitingForActivation: 1,
            waitingToRun: 2,
            running: 3,
            waitingForChildrenToComplete: 4,
            ranToCompletion: 5,
            canceled: 6,
            faulted: 7
        }
    });


    Bridge.define("Bridge.TaskCompletionSource", {
        constructor: function () {
            this.task = new Bridge.Task();
            this.task.status = Bridge.TaskStatus.running;
        },

        setCanceled: function () {
            if (!this.task.cancel()) {
                throw new Bridge.InvalidOperationException("Task was already completed.");
            }
        },

        setResult: function (result) {
            if (!this.task.complete(result)) {
                throw new Bridge.InvalidOperationException("Task was already completed.");
            }
        },

        setException: function (exception) {
            if (!this.trySetException(exception)) {
                throw new Bridge.InvalidOperationException("Task was already completed.");
            }
        },

        trySetCanceled: function () {
            return this.task.cancel();
        },

        trySetResult: function (result) {
            return this.task.complete(result);
        },

        trySetException: function (exception) {
            if (Bridge.is(exception, Bridge.Exception)) {
                exception = [exception];
            }
                
            return this.task.fail(new Bridge.AggregateException(null, exception));
        }
    });

    Bridge.define("Bridge.CancellationToken", {
         constructor: function (source) {
            if (!Bridge.is(source, Bridge.CancellationTokenSource)) {
                source = source ? Bridge.CancellationToken.sourceTrue : Bridge.CancellationToken.sourceFalse;
            }
                
            this.source = source;
        },

        getCanBeCanceled: function () {
            return !this.source.uncancellable;
        },

        getIsCancellationRequested: function () {
            return this.source.isCancellationRequested;
        },

        throwIfCancellationRequested: function () {
            if (this.source.isCancellationRequested) {
                throw new Bridge.OperationCanceledException(this);
            }
        },

        register: function (cb, s) {
            return this.source.register(cb, s);
        },

        statics: {
            sourceTrue: {
                isCancellationRequested: true, 
                register: function (f, s) {
                    f(s);

                    return new Bridge.CancellationTokenRegistration();
                } 
            },
            sourceFalse: {
                uncancellable: true, 
                isCancellationRequested: false, 
                register: function () {
                     return new Bridge.CancellationTokenRegistration();
                }
            },
            getDefaultValue: function () {
                return new Bridge.CancellationToken();
            }
        }
    });

    Bridge.CancellationToken.none = new Bridge.CancellationToken();

    Bridge.define("Bridge.CancellationTokenRegistration", {
        inherits: function () {
            return [Bridge.IDisposable, Bridge.IEquatable$1(Bridge.CancellationTokenRegistration)];
        },
        constructor: function (cts, o) {
            this.cts = cts;
            this.o = o;
        },

        dispose: function () {
            if (this.cts) {
                this.cts.deregister(this.o);
                this.cts = this.o = null;
            }
        },

        equalsT: function (o) {
            return this === o;
        },

        statics: {
            getDefaultValue: function () {
                return new Bridge.CancellationTokenRegistration();
            }
        }
    });

    Bridge.define("Bridge.CancellationTokenSource", {
        inherits: [Bridge.IDisposable],

        constructor: function (delay) {
            this.timeout = typeof delay === "number" && delay >= 0 ? setTimeout(Bridge.fn.bind(this, this.cancel), delay, -1) : null;
            this.isCancellationRequested = false;
            this.token = new Bridge.CancellationToken(this);
            this.handlers = [];
        },

        cancel: function (throwFirst) {
            if (this.isCancellationRequested) {
                return ;
            }

            this.isCancellationRequested = true;
            var x = [];
            var h = this.handlers;

            this.clean();

            for (var i = 0; i < h.length; i++) {
                try {
                    h[i].f(h[i].s);
                } catch (ex) {
                    if (throwFirst && throwFirst !== -1) {
                        throw ex;
                    }
                        
                    x.push(ex);
                }
            }

            if (x.length > 0 && throwFirst !== -1) {
                throw new Bridge.AggregateException(null, x);
            }
                
        },

        cancelAfter: function (delay) {
            if (this.isCancellationRequested) {
                return;
            }
                
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
                
            this.timeout = setTimeout(Bridge.fn.bind(this, this.cancel), delay, -1);
        },

        register: function (f, s) {
            if (this.isCancellationRequested) {
                f(s);

                return new Bridge.CancellationTokenRegistration();
            } else {
                var o = {f: f, s: s };
                this.handlers.push(o);

                return new Bridge.CancellationTokenRegistration(this, o);
            }
        },

        deregister: function (o) {
            var ix = this.handlers.indexOf(o);

            if (ix >= 0) {
                this.handlers.splice(ix, 1);
            }
        },

        dispose: function () {
            this.clean();
        },

        clean: function () {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
                
            this.timeout = null;
            this.handlers = [];

            if (this.links) {
                for (var i = 0; i < this.links.length; i++) {
                    this.links[i].dispose();
                }
                    
                this.links = null;
            }
        },

        statics: {
            createLinked: function () {
                var cts = new Bridge.CancellationTokenSource();

                cts.links = [];

                var d = Bridge.fn.bind(cts, cts.cancel);

                for (var i = 0; i < arguments.length; i++) {
                    cts.links.push(arguments[i].register(d));
                }

                return cts;
            }
        }
    });
    // @source Validation.js

    var validation = {
        isNull: function (value) {
            return !Bridge.isDefined(value, true);
        },

        isEmpty: function (value) {
            return value == null || value.length === 0 || Bridge.is(value, Bridge.ICollection) ? value.getCount() === 0 : false;
        },

        isNotEmptyOrWhitespace: function (value) {
            return Bridge.isDefined(value, true) && !(/^$|\s+/.test(value));
        },

        isNotNull: function (value) {
            return Bridge.isDefined(value, true);
        },

        isNotEmpty: function (value) {
            return !Bridge.Validation.isEmpty(value);
        },

        email: function (value) {
            var re = /^(")?(?:[^\."])(?:(?:[\.])?(?:[\w\-!#$%&'*+/=?^_`{|}~]))*\1@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/;

            return re.test(value);
        },

        url: function (value) {
            var re = /(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:\.\d{1,3}){3})(?!(?:\.\d{1,3}){2})(?!\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/;
            return re.test(value);
        },

        alpha: function (value) {
            var re = /^[a-zA-Z_]+$/;

            return re.test(value);
        },

        alphaNum: function (value) {
            var re = /^[a-zA-Z_]+$/;

            return re.test(value);
        },

        creditCard: function (value, type) {
            var re,
                checksum,
                i,
                digit,
                notype= false;

            if (type === "Visa") {
                // Visa: length 16, prefix 4, dashes optional.
                re = /^4\d{3}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}$/;
            } else if (type === "MasterCard") {
                // Mastercard: length 16, prefix 51-55, dashes optional.
                re = /^5[1-5]\d{2}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}$/;
            } else if (type === "Discover") {
                // Discover: length 16, prefix 6011, dashes optional.
                re = /^6011[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}$/;
            } else if (type === "AmericanExpress") {
                // American Express: length 15, prefix 34 or 37.
                re = /^3[4,7]\d{13}$/;
            } else if (type === "DinersClub") {
                // Diners: length 14, prefix 30, 36, or 38.
                re = /^(3[0,6,8]\d{12})|(5[45]\d{14})$/;
            } else {
                // Basing min and max length on
                // http://developer.ean.com/general_info/Valid_Credit_Card_Types
                if (!value || value.length < 13 || value.length > 19) {
                    return false;
                }

                re = /[^0-9 \-]+/;
                notype = true;
            }

            if (!re.test(value)) {
                return false;
            }

            // Remove all dashes for the checksum checks to eliminate negative numbers
            value = value.split(notype ? "-" : /[- ]/).join("");

            // Checksum ("Mod 10")
            // Add even digits in even length strings or odd digits in odd length strings.
            checksum = 0;

            for (i = (2 - (value.length % 2)) ; i <= value.length; i += 2) {
                checksum += parseInt(value.charAt(i - 1));
            }

            // Analyze odd digits in even length strings or even digits in odd length strings.
            for (i = (value.length % 2) + 1; i < value.length; i += 2) {
                digit = parseInt(value.charAt(i - 1)) * 2;

                if (digit < 10) {
                    checksum += digit;
                } else {
                    checksum += (digit - 9);
                }
            }

            return (checksum % 10) === 0;
        }
    };

    Bridge.Validation = validation;

    // @source Version.js

    Bridge.define("Bridge.Version", {
        inherits: function () {
            return [Bridge.ICloneable, Bridge.IComparable$1(Bridge.Version), Bridge.IEquatable$1(Bridge.Version)];
        },

        statics: {
            separatorsArray: ".",

            config: {
                init: function () {
                    this.ZERO_CHAR_VALUE = Bridge.cast(48, Bridge.Int);
                }
            },

            appendPositiveNumber: function (num, sb) {
                var index = sb.getLength();
                var reminder;

                do {
                    reminder = num % 10;
                    num = Bridge.Int.div(num, 10);
                    sb.insert(index, String.fromCharCode(Bridge.cast((Bridge.Version.ZERO_CHAR_VALUE + reminder), Bridge.Int)));
                } while (num > 0);
            },

            parse: function (input) {
                if (input === null) {
                    throw new Bridge.ArgumentNullException("input");
                }

                var r = { v: new Bridge.Version.VersionResult() };

                r.v.init("input", true);

                if (!Bridge.Version.tryParseVersion(input, r)) {
                    throw r.v.getVersionParseException();
                }

                return r.v.m_parsedVersion;
            },

            tryParse: function (input, result) {
                var r = { v: new Bridge.Version.VersionResult() };

                r.v.init("input", false);

                var b = Bridge.Version.tryParseVersion(input, r);

                result.v = r.v.m_parsedVersion;

                return b;
            },

            tryParseVersion: function (version, result) {
                var major = {}, minor = {}, build = {}, revision = {};

                if (version === null) {
                    result.v.setFailure(Bridge.Version.ParseFailureKind.argumentNullException);
                    return false;
                }

                var parsedComponents = version.split(Bridge.Version.separatorsArray);
                var parsedComponentsLength = parsedComponents.length;

                if ((parsedComponentsLength < 2) || (parsedComponentsLength > 4)) {
                    result.v.setFailure(Bridge.Version.ParseFailureKind.argumentException);

                    return false;
                }

                if (!Bridge.Version.tryParseComponent(parsedComponents[0], "version", result, major)) {
                    return false;
                }

                if (!Bridge.Version.tryParseComponent(parsedComponents[1], "version", result, minor)) {
                    return false;
                }

                parsedComponentsLength -= 2;

                if (parsedComponentsLength > 0) {
                    if (!Bridge.Version.tryParseComponent(parsedComponents[2], "build", result, build)) {
                        return false;
                    }

                    parsedComponentsLength--;

                    if (parsedComponentsLength > 0) {
                        if (!Bridge.Version.tryParseComponent(parsedComponents[3], "revision", result, revision)) {
                            return false;
                        } else {
                            result.v.m_parsedVersion = new Bridge.Version("constructor$3", major.v, minor.v, build.v, revision.v);
                        }
                    } else {
                        result.v.m_parsedVersion = new Bridge.Version("constructor$2", major.v, minor.v, build.v);
                    }
                } else {
                    result.v.m_parsedVersion = new Bridge.Version("constructor$1", major.v, minor.v);
                }

                return true;
            },

            tryParseComponent: function (component, componentName, result, parsedComponent) {
                if (!Bridge.Int.tryParseInt(component, parsedComponent, -2147483648, 2147483647)) {
                    result.v.setFailure$1(Bridge.Version.ParseFailureKind.formatException, component);

                    return false;
                }

                if (parsedComponent.v < 0) {
                    result.v.setFailure$1(Bridge.Version.ParseFailureKind.argumentOutOfRangeException, componentName);

                    return false;
                }

                return true;
            },

            op_Equality: function (v1, v2) {
                if (v1 === null) {
                    return v2 === null;
                }

                return v1.equals(v2);
            },

            op_Inequality: function (v1, v2) {
                return !(Bridge.Version.op_Equality(v1, v2));
            },

            op_LessThan: function (v1, v2) {
                if (v1 === null && v2 === null) {
                    return false;
                }

                if (v2 === null) {
                    return (v1.compareTo(v2) < 0);
                }

                return (v2.compareTo(v1) > 0);
            },

            op_LessThanOrEqual: function (v1, v2) {
                if (v1 === null && v2 === null) {
                    return false;
                }

                if (v2 === null) {
                    return (v1.compareTo(v2) <= 0);
                }

                return (v2.compareTo(v1) >= 0);
            },

            op_GreaterThan: function (v1, v2) {
                return (Bridge.Version.op_LessThan(v2, v1));
            },

            op_GreaterThanOrEqual: function (v1, v2) {
                return (Bridge.Version.op_LessThanOrEqual(v2, v1));
            }
        },

        _Major: 0,
        _Minor: 0,

        config: {
            init: function () {
                this._Build = -1;
                this._Revision = -1;
            }
        },

        constructor$3: function (major, minor, build, revision) {
            if (major < 0) {
                throw new Bridge.ArgumentOutOfRangeException("major", "Cannot be < 0");
            }

            if (minor < 0) {
                throw new Bridge.ArgumentOutOfRangeException("minor", "Cannot be < 0");
            }

            if (build < 0) {
                throw new Bridge.ArgumentOutOfRangeException("build", "Cannot be < 0");
            }

            if (revision < 0) {
                throw new Bridge.ArgumentOutOfRangeException("revision", "Cannot be < 0");
            }

            this._Major = major;
            this._Minor = minor;
            this._Build = build;
            this._Revision = revision;
        },

        constructor$2: function (major, minor, build) {
            if (major < 0) {
                throw new Bridge.ArgumentOutOfRangeException("major", "Cannot be < 0");
            }

            if (minor < 0) {
                throw new Bridge.ArgumentOutOfRangeException("minor", "Cannot be < 0");
            }

            if (build < 0) {
                throw new Bridge.ArgumentOutOfRangeException("build", "Cannot be < 0");
            }

            this._Major = major;
            this._Minor = minor;
            this._Build = build;
        },

        constructor$1: function (major, minor) {
            if (major < 0) {
                throw new Bridge.ArgumentOutOfRangeException("major", "Cannot be < 0");
            }

            if (minor < 0) {
                throw new Bridge.ArgumentOutOfRangeException("minor", "Cannot be < 0");
            }

            this._Major = major;
            this._Minor = minor;
        },

        constructor$4: function (version) {
            var v = Bridge.Version.parse(version);

            this._Major = v.getMajor();
            this._Minor = v.getMinor();
            this._Build = v.getBuild();
            this._Revision = v.getRevision();
        },

        constructor: function () {
            this._Major = 0;
            this._Minor = 0;
        },

        getMajor: function () {
            return this._Major;
        },

        getMinor: function () {
            return this._Minor;
        },

        getBuild: function () {
            return this._Build;
        },

        getRevision: function () {
            return this._Revision;
        },

        getMajorRevision: function () {
            return this._Revision >> 16;
        },

        getMinorRevision: function () {
            var n = this._Revision & 65535;

            if (n > 32767) {
                n = -((n & 32767) ^ 32767) - 1;
            }

            return n;
        },

        clone: function () {
            var v = new Bridge.Version("constructor");

            v._Major = this._Major;
            v._Minor = this._Minor;
            v._Build = this._Build;
            v._Revision = this._Revision;

            return (v);
        },

        compareInternal: function (v) {
            if (this._Major !== v._Major) {
                if (this._Major > v._Major) {
                    return 1;
                } else {
                    return -1;
                }
            }

            if (this._Minor !== v._Minor) {
                if (this._Minor > v._Minor) {
                    return 1;
                } else {
                    return -1;
                }
            }

            if (this._Build !== v._Build) {
                if (this._Build > v._Build) {
                    return 1;
                } else {
                    return -1;
                }
            }

            if (this._Revision !== v._Revision) {
                if (this._Revision > v._Revision) {
                    return 1;
                } else {
                    return -1;
                }
            }

            return 0;
        },

        compareTo$1: function (version) {
            if (version === null) {
                return 1;
            }

            var v = Bridge.as(version, Bridge.Version);

            if (v === null) {
                throw new Bridge.ArgumentException("version should be of Bridge.Version type");
            }

            return this.compareInternal(v);
        },

        compareTo: function (value) {
            if (value === null) {
                return 1;
            }

            return this.compareInternal(value);
        },
        equals$1: function (obj) {
            var v = Bridge.as(obj, Bridge.Version);

            if (v === null) {
                return false;
            }

            // check that major, minor, build & revision numbers match
            if ((this._Major !== v._Major) || (this._Minor !== v._Minor) || (this._Build !== v._Build) || (this._Revision !== v._Revision)) {
                return false;
            }

            return true;
        },
        equals: function (v) {
            return this.equals$1(v);
        },
        equalsT: function (v) {
            return this.equals$1(v);
        },
        getHashCode: function () {
            // Let's assume that most version numbers will be pretty small and just OR some lower order bits together.
            var accumulator = 0;

            accumulator |= (this._Major & 15) << 28;
            accumulator |= (this._Minor & 255) << 20;
            accumulator |= (this._Build & 255) << 12;
            accumulator |= (this._Revision & 4095);

            return accumulator;
        },
        toString: function () {
            if (this._Build === -1) {
                return (this.toString$1(2));
            }

            if (this._Revision === -1) {
                return (this.toString$1(3));
            }

            return (this.toString$1(4));
        },
        toString$1: function (fieldCount) {
            var sb;

            switch (fieldCount) {
                case 0:
                    return ("");
                case 1:
                    return (this._Major.toString());
                case 2:
                    sb = new Bridge.Text.StringBuilder();
                    Bridge.Version.appendPositiveNumber(this._Major, sb);
                    sb.append(String.fromCharCode(46));
                    Bridge.Version.appendPositiveNumber(this._Minor, sb);

                    return sb.toString();
                default:
                    if (this._Build === -1) {
                        throw new Bridge.ArgumentException("Build should be > 0 if fieldCount > 2", "fieldCount");
                    }

                    if (fieldCount === 3) {
                        sb = new Bridge.Text.StringBuilder();
                        Bridge.Version.appendPositiveNumber(this._Major, sb);
                        sb.append(String.fromCharCode(46));
                        Bridge.Version.appendPositiveNumber(this._Minor, sb);
                        sb.append(String.fromCharCode(46));
                        Bridge.Version.appendPositiveNumber(this._Build, sb);

                        return sb.toString();
                    }

                    if (this._Revision === -1) {
                        throw new Bridge.ArgumentException("Revision should be > 0 if fieldCount > 3", "fieldCount");
                    }

                    if (fieldCount === 4) {
                        sb = new Bridge.Text.StringBuilder();
                        Bridge.Version.appendPositiveNumber(this._Major, sb);
                        sb.append(String.fromCharCode(46));
                        Bridge.Version.appendPositiveNumber(this._Minor, sb);
                        sb.append(String.fromCharCode(46));
                        Bridge.Version.appendPositiveNumber(this._Build, sb);
                        sb.append(String.fromCharCode(46));
                        Bridge.Version.appendPositiveNumber(this._Revision, sb);

                        return sb.toString();
                    }

                    throw new Bridge.ArgumentException("Should be < 5", "fieldCount");
            }
        }
    });

    Bridge.define("Bridge.Version.ParseFailureKind", {
        statics: {
            argumentNullException: 0,
            argumentException: 1,
            argumentOutOfRangeException: 2,
            formatException: 3
        }
    });

    Bridge.define("Bridge.Version.VersionResult", {
        m_parsedVersion: null,
        m_failure: 0,
        m_exceptionArgument: null,
        m_argumentName: null,
        m_canThrow: false,
        constructor: function () {
        },

        init: function (argumentName, canThrow) {
            this.m_canThrow = canThrow;
            this.m_argumentName = argumentName;
        },

        setFailure: function (failure) {
            this.setFailure$1(failure, "");
        },

        setFailure$1: function (failure, argument) {
            this.m_failure = failure;
            this.m_exceptionArgument = argument;

            if (this.m_canThrow) {
                throw this.getVersionParseException();
            }
        },

        getVersionParseException: function () {
            switch (this.m_failure) {
                case Bridge.Version.ParseFailureKind.argumentNullException:
                    return new Bridge.ArgumentNullException(this.m_argumentName);
                case Bridge.Version.ParseFailureKind.argumentException:
                    return new Bridge.ArgumentException("VersionString");
                case Bridge.Version.ParseFailureKind.argumentOutOfRangeException:
                    return new Bridge.ArgumentOutOfRangeException(this.m_exceptionArgument, "Cannot be < 0");
                case Bridge.Version.ParseFailureKind.formatException:
                    try {
                        Bridge.Int.parseInt(this.m_exceptionArgument, -2147483648, 2147483647);
                    }
                    catch ($e) {
                        $e = Bridge.Exception.create($e);
                        var e;

                        if (Bridge.is($e, Bridge.FormatException)) {
                            e = $e;

                            return e;
                        } else if (Bridge.is($e, Bridge.OverflowException)) {
                            e = $e;

                            return e;
                        } else {
                            throw $e;
                        }
                    }
                    return new Bridge.FormatException("InvalidString");
                default:
                    return new Bridge.ArgumentException("VersionString");
            }
        },

        getHashCode: function () {
            var hash = 17;

            hash = hash * 23 + (this.m_parsedVersion == null ? 0 : Bridge.getHashCode(this.m_parsedVersion));
            hash = hash * 23 + (this.m_failure == null ? 0 : Bridge.getHashCode(this.m_failure));
            hash = hash * 23 + (this.m_exceptionArgument == null ? 0 : Bridge.getHashCode(this.m_exceptionArgument));
            hash = hash * 23 + (this.m_argumentName == null ? 0 : Bridge.getHashCode(this.m_argumentName));
            hash = hash * 23 + (this.m_canThrow == null ? 0 : Bridge.getHashCode(this.m_canThrow));

            return hash;
        },

        equals: function (o) {
            if (!Bridge.is(o, Bridge.Version.VersionResult)) {
                return false;
            }

            return Bridge.equals(this.m_parsedVersion, o.m_parsedVersion) && Bridge.equals(this.m_failure, o.m_failure) && Bridge.equals(this.m_exceptionArgument, o.m_exceptionArgument) && Bridge.equals(this.m_argumentName, o.m_argumentName) && Bridge.equals(this.m_canThrow, o.m_canThrow);
        },

        $clone: function (to) {
            var s = to || new Bridge.Version.VersionResult();

            s.m_parsedVersion = this.m_parsedVersion;
            s.m_failure = this.m_failure;
            s.m_exceptionArgument = this.m_exceptionArgument;
            s.m_argumentName = this.m_argumentName;
            s.m_canThrow = this.m_canThrow;

            return s;
        }
    });

    // @source Attribute.js

    Bridge.define("Bridge.Attribute");

    // @source INotifyPropertyChanged.js

    Bridge.define("Bridge.INotifyPropertyChanged");

    Bridge.define("Bridge.PropertyChangedEventArgs", {
        constructor: function (propertyName) {
            this.propertyName = propertyName;
        }
    });

    // @source Convert.js

    var scope = {};

    scope.convert = {
        typeCodes: {
            Empty: 0,
            Object: 1,
            DBNull: 2,
            Boolean: 3,
            Char: 4,
            SByte: 5,
            Byte: 6,
            Int16: 7,
            UInt16: 8,
            Int32: 9,
            UInt32: 10,
            Int64: 11,
            UInt64: 12,
            Single: 13,
            Double: 14,
            Decimal: 15,
            DateTime: 16,
            String: 18
        },

        toBoolean: function (value, formatProvider) {
            switch (typeof (value)) {
                case "boolean":
                    return value;

                case "number":
                    return value !== 0; // non-zero int/float value is always converted to True;

                case "string":
                    var lowCaseVal = value.toLowerCase().trim();

                    if (lowCaseVal === "true") {
                        return true;
                    } else if (lowCaseVal === "false") {
                        return false;
                    } else {
                        throw new Bridge.FormatException("String was not recognized as a valid Boolean.");
                    }

                case "object":
                    if (value == null) {
                        return false;
                    }

                    if (value instanceof Bridge.Decimal) {
                        return !value.isZero();
                    }

                    if (Bridge.Long.is64Bit(value)) {
                        return value.ne(0);
                    }

                    break;
            }

            // TODO: #822 When IConvertible is implemented, try it before throwing InvalidCastEx
            var typeCode = scope.internal.suggestTypeCode(value);
            scope.internal.throwInvalidCastEx(typeCode, scope.convert.typeCodes.Boolean);

            // try converting using IConvertible
            return scope.convert.convertToType(scope.convert.typeCodes.Boolean, value, formatProvider || null);
        },

        toChar: function (value, formatProvider, valueTypeCode) {
            var typeCodes = scope.convert.typeCodes;

            if (value instanceof Bridge.Decimal) {
                value = value.toFloat();
            }

            if (value instanceof Bridge.Long || value instanceof Bridge.ULong) {
                value = value.toNumber();
            }

            var type = typeof (value);
            valueTypeCode = valueTypeCode || scope.internal.suggestTypeCode(value);

            if (valueTypeCode === typeCodes.String && value == null) {
                type = "string";
            }

            if (valueTypeCode !== typeCodes.Object) {
                switch (type) {
                    case "boolean":
                        scope.internal.throwInvalidCastEx(typeCodes.Boolean, typeCodes.Char);

                    case "number":
                        var isFloatingType = scope.internal.isFloatingType(valueTypeCode);

                        if (isFloatingType || value % 1 !== 0) {
                            scope.internal.throwInvalidCastEx(valueTypeCode, typeCodes.Char);
                        }

                        scope.internal.validateNumberRange(value, typeCodes.Char, true);

                        return value;

                    case "string":
                        if (value == null) {
                            throw new Bridge.ArgumentNullException("value");
                        }

                        if (value.length !== 1) {
                            throw new Bridge.FormatException("String must be exactly one character long.");
                        }

                        return value.charCodeAt(0);
                }
            }

            if (valueTypeCode === typeCodes.Object || type === "object") {
                if (value == null) {
                    return 0;
                }

                if (Bridge.isDate(value)) {
                    scope.internal.throwInvalidCastEx(typeCodes.DateTime, typeCodes.Char);
                }
            }

            // TODO: #822 When IConvertible is implemented, try it before throwing InvalidCastEx
            scope.internal.throwInvalidCastEx(valueTypeCode, scope.convert.typeCodes.Char);

            // try converting using IConvertible
            return scope.convert.convertToType(typeCodes.Char, value, formatProvider || null);
        },

        toSByte: function (value, formatProvider, valueTypeCode) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.SByte, valueTypeCode || null);
        },

        toByte: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.Byte);
        },

        toInt16: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.Int16);
        },

        toUInt16: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.UInt16);
        },

        toInt32: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.Int32);
        },

        toUInt32: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.UInt32);
        },

        toInt64: function (value, formatProvider) {
            var result = scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.Int64);
	    return new Bridge.Long(result);
        },

        toUInt64: function (value, formatProvider) {
            var result = scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.UInt64);
	    return new Bridge.ULong(result);
        },

        toSingle: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.Single);
        },

        toDouble: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.Double);
        },

        toDecimal: function (value, formatProvider) {
            if (value instanceof Bridge.Decimal) {
                return value;
            }

            return new Bridge.Decimal(scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.Decimal));
        },

        toDateTime: function (value, formatProvider) {
            var typeCodes = scope.convert.typeCodes;

            switch (typeof (value)) {
                case "boolean":
                    scope.internal.throwInvalidCastEx(typeCodes.Boolean, typeCodes.DateTime);

                case "number":
                    var fromType = scope.internal.suggestTypeCode(value);
                    scope.internal.throwInvalidCastEx(fromType, typeCodes.DateTime);

                case "string":
                    value = Bridge.Date.parse(value, formatProvider || null);

                    return value;

                case "object":
                    if (value == null) {
                        return scope.internal.getMinValue(typeCodes.DateTime);
                    }

                    if (Bridge.isDate(value)) {
                        return value;
                    }

                    if (value instanceof Bridge.Decimal) {
                        scope.internal.throwInvalidCastEx(typeCodes.Decimal, typeCodes.DateTime);
                    }

                    if (value instanceof Bridge.Long) {
                        scope.internal.throwInvalidCastEx(typeCodes.Int64, typeCodes.DateTime);
                    }

                    if (value instanceof Bridge.ULong) {
                        scope.internal.throwInvalidCastEx(typeCodes.UInt64, typeCodes.DateTime);
                    }

                    break;
            }

            // TODO: #822 When IConvertible is implemented, try it before throwing InvalidCastEx
            var valueTypeCode = scope.internal.suggestTypeCode(value);
            scope.internal.throwInvalidCastEx(valueTypeCode, scope.convert.typeCodes.DateTime);

            // try converting using IConvertible
            return scope.convert.convertToType(typeCodes.DateTime, value, formatProvider || null);
        },

        toString: function (value, formatProvider, valueTypeCode) {
            var typeCodes = scope.convert.typeCodes;
            var type = typeof (value);

            switch (type) {
                case "boolean":
                    return value ? "True" : "False";

                case "number":
                    if ((valueTypeCode || null) === typeCodes.Char) {
                        return String.fromCharCode(value);
                    }

                    if (isNaN(value)) {
                        return "NaN";
                    }

                    if (value % 1 !== 0) {
                        value = parseFloat(value.toPrecision(15));
                    }

                    return value.toString();

                case "string":
                    return value;

                case "object":
                    if (value == null) {
                        return "";
                    }

                    if (Bridge.isDate(value)) {
                        return Bridge.Date.format(value, null, formatProvider || null);
                    }

                    if (value instanceof Bridge.Decimal) {
                        if (value.isInteger()) {
                            return value.toFixed(0, 4);
                        }
                        return value.toPrecision(value.precision());
                    }

                    if (Bridge.Long.is64Bit(value)) {
                        return value.toString();
                    }

                    if (value.format) {
                        return value.format(null, formatProvider || null);
                    }

                    var typeName = Bridge.getTypeName(value);

                    return typeName;
            }

            // try converting using IConvertible
            return scope.convert.convertToType(scope.convert.typeCodes.String, value, formatProvider || null);
        },

        toNumberInBase: function (str, fromBase, typeCode) {
            if (fromBase !== 2 && fromBase !== 8 && fromBase !== 10 && fromBase !== 16) {
                throw new Bridge.ArgumentException("Invalid Base.");
            }

            var typeCodes = scope.convert.typeCodes;

            if (str == null) {
                if (typeCode === typeCodes.Int64) {
                    return Bridge.Long.Zero;
                }

                if (typeCode === typeCodes.UInt64) {
                    return Bridge.ULong.Zero;
                }

                return 0;
            }

            if (str.length === 0) {
                throw new Bridge.ArgumentOutOfRangeException("Index was out of range. Must be non-negative and less than the size of the collection.");
            }

            // Let's process the string in lower case.
            str = str.toLowerCase();

            var minValue = scope.internal.getMinValue(typeCode);
            var maxValue = scope.internal.getMaxValue(typeCode);

            // Calculate offset (start index)
            var isNegative = false;
            var startIndex = 0;

            if (str[startIndex] === "-") {
                if (fromBase !== 10) {
                    throw new Bridge.ArgumentException("String cannot contain a minus sign if the base is not 10.");
                }

                if (minValue >= 0) {
                    throw new Bridge.OverflowException("The string was being parsed as an unsigned number and could not have a negative sign.");
                }

                isNegative = true;
                ++startIndex;
            } else if (str[startIndex] === "+") {
                ++startIndex;
            }

            if (fromBase === 16 && str.length >= 2 && str[startIndex] === "0" && str[startIndex + 1] === "x") {
                startIndex += 2;
            }

            // Fill allowed codes for the specified base:
            var allowedCodes;

            if (fromBase === 2) {
                allowedCodes = scope.internal.charsToCodes("01");
            } else if (fromBase === 8) {
                allowedCodes = scope.internal.charsToCodes("01234567");
            } else if (fromBase === 10) {
                allowedCodes = scope.internal.charsToCodes("0123456789");
            } else if (fromBase === 16) {
                allowedCodes = scope.internal.charsToCodes("0123456789abcdef");
            } else {
                throw new Bridge.ArgumentException("Invalid Base.");
            }

            // Create charCode-to-Value map
            var codeValues = {};

            for (var i = 0; i < allowedCodes.length; i++) {
                var allowedCode = allowedCodes[i];

                codeValues[allowedCode] = i;
            }

            var firstAllowed = allowedCodes[0];
            var lastAllowed = allowedCodes[allowedCodes.length - 1];

            var res, totalMax, code, j;

            if (typeCode === typeCodes.Int64 || typeCode === typeCodes.UInt64) {
                for (j = startIndex; j < str.length; j++) {
                    code = str[j].charCodeAt(0);

                    if (!(code >= firstAllowed && code <= lastAllowed)) {
                        if (j === startIndex) {
                            throw new Bridge.FormatException("Could not find any recognizable digits.");
                        } else {
                            throw new Bridge.FormatException("Additional non-parsable characters are at the end of the string.");
                        }
                    }
                }

                var isSign = typeCode === typeCodes.Int64;

                if (isSign) {
                    res = new Bridge.Long(Bridge.$Long.fromString(str, false, fromBase));
                } else {
                    res = new Bridge.ULong(Bridge.$Long.fromString(str, true, fromBase));
                }

                if (res.toString(fromBase) !== str) {
                    throw new Bridge.OverflowException("Value was either too large or too small.");
                }

                return res;
            } else {
                // Parse the number:
                res = 0;
                totalMax = maxValue - minValue + 1;

                for (j = startIndex; j < str.length; j++) {
                    code = str[j].charCodeAt(0);

                    if (code >= firstAllowed && code <= lastAllowed) {
                        res *= fromBase;
                        res += codeValues[code];

                        if (res > scope.internal.typeRanges.Int64_MaxValue) {
                            throw new Bridge.OverflowException("Value was either too large or too small.");
                        }
                    } else {
                        if (j === startIndex) {
                            throw new Bridge.FormatException("Could not find any recognizable digits.");
                        } else {
                            throw new Bridge.FormatException("Additional non-parsable characters are at the end of the string.");
                        }
                    }
                }

                if (isNegative) {
                    res *= -1;
                }

                if (res > maxValue && fromBase !== 10 && minValue < 0) {
                    // Assume that the value is negative, transform it:
                    res = res - totalMax;
                }

                if (res < minValue || res > maxValue) {
                    throw new Bridge.OverflowException("Value was either too large or too small.");
                }

                return res;
            }
        },

        toStringInBase: function (value, toBase, typeCode) {
            var typeCodes = scope.convert.typeCodes;

            if (toBase !== 2 && toBase !== 8 && toBase !== 10 && toBase !== 16) {
                throw new Bridge.ArgumentException("Invalid Base.");
            }

            var minValue = scope.internal.getMinValue(typeCode);
            var maxValue = scope.internal.getMaxValue(typeCode);
            var special = Bridge.Long.is64Bit(value);

            if (special) {
                if (value.lt(minValue) || value.gt(maxValue)) {
                    throw new Bridge.OverflowException("Value was either too large or too small for an unsigned byte.");
                }
            } else if (value < minValue || value > maxValue) {
                throw new Bridge.OverflowException("Value was either too large or too small for an unsigned byte.");
            }

            // Handle negative numbers:
            var isNegative = false;

            if (special) {
                if (toBase === 10) {
                    return value.toString();
                } else {
                    return value.value.toUnsigned().toString(toBase);
                }
            }
            else if (value < 0) {
                if (toBase === 10) {
                    isNegative = true;
                    value *= -1;
                } else {
                    value = (maxValue + 1 - minValue) + value;
                }
            }

            // Fill allowed codes for the specified base:
            var allowedChars;

            if (toBase === 2) {
                allowedChars = "01";
            } else if (toBase === 8) {
                allowedChars = "01234567";
            } else if (toBase === 10) {
                allowedChars = "0123456789";
            } else if (toBase === 16) {
                allowedChars = "0123456789abcdef";
            } else {
                throw new Bridge.ArgumentException("Invalid Base.");
            }

            // Fill Value-To-Char map:
            var charByValues = {};
            var allowedCharArr = allowedChars.split("");
            var allowedChar;

            for (var i = 0; i < allowedCharArr.length; i++) {
                allowedChar = allowedCharArr[i];

                charByValues[i] = allowedChar;
            }

            // Parse the number:
            var res = "";

            if (value === 0 || (special && value.eq(0))) {
                res = "0";
            } else {
                var mod, char;

                if (special) {
                    while (value.gt(0)) {
                        mod = value.mod(toBase);
                        value = value.sub(mod).div(toBase);

                        char = charByValues[mod.toNumber()];
                        res += char;
                    }
                } else {
                    while (value > 0) {
                        mod = value % toBase;
                        value = (value - mod) / toBase;

                        char = charByValues[mod];
                        res += char;
                    }
                }
            }

            if (isNegative) {
                res += "-";
            }

            res = res.split("").reverse().join("");

            return res;
        },

        toBase64String: function (inArray, offset, length, options) {
            if (inArray == null) {
                throw new Bridge.ArgumentNullException("inArray");
            }

            offset = offset || 0;
            length = length != null ? length : inArray.length;
            options = options || 0; // 0 - means "None", 1 - stands for "InsertLineBreaks"

            if (length < 0) {
                throw new Bridge.ArgumentOutOfRangeException("length", "Index was out of range. Must be non-negative and less than the size of the collection.");
            }

            if (offset < 0) {
                throw new Bridge.ArgumentOutOfRangeException("offset", "Value must be positive.");
            }

            if (options < 0 || options > 1) {
                throw new Bridge.ArgumentException("Illegal enum value.");
            }

            var inArrayLength = inArray.length;

            if (offset > (inArrayLength - length)) {
                throw new Bridge.ArgumentOutOfRangeException("offset", "Offset and length must refer to a position in the string.");
            }

            if (inArrayLength === 0) {
                return "";
            }

            var insertLineBreaks = (options === 1);
            var strArrayLen = scope.internal.toBase64_CalculateAndValidateOutputLength(length, insertLineBreaks);

            var strArray = [];
            strArray.length = strArrayLen;

            scope.internal.convertToBase64Array(strArray, inArray, offset, length, insertLineBreaks);

            var str = strArray.join("");

            return str;
        },

        toBase64CharArray: function (inArray, offsetIn, length, outArray, offsetOut, options) {
            if (inArray == null) {
                throw new Bridge.ArgumentNullException("inArray");
            }

            if (outArray == null) {
                throw new Bridge.ArgumentNullException("outArray");
            }

            if (length < 0) {
                throw new Bridge.ArgumentOutOfRangeException("length", "Index was out of range. Must be non-negative and less than the size of the collection.");
            }

            if (offsetIn < 0) {
                throw new Bridge.ArgumentOutOfRangeException("offsetIn", "Value must be positive.");
            }

            if (offsetOut < 0) {
                throw new Bridge.ArgumentOutOfRangeException("offsetOut", "Value must be positive.");
            }

            options = options || 0;     // 0 - means "None", 1 - stands for "InsertLineBreaks"

            if (options < 0 || options > 1) {
                throw new Bridge.ArgumentException("Illegal enum value.");
            }
            var inArrayLength = inArray.length;

            if (offsetIn > inArrayLength - length) {
                throw new Bridge.ArgumentOutOfRangeException("offsetIn", "Offset and length must refer to a position in the string.");
            }

            if (inArrayLength === 0) {
                return 0;
            }

            var insertLineBreaks = options === 1;
            var outArrayLength = outArray.length;   //This is the maximally required length that must be available in the char array

            // Length of the char buffer required
            var numElementsToCopy = scope.internal.toBase64_CalculateAndValidateOutputLength(length, insertLineBreaks);

            if (offsetOut > (outArrayLength - numElementsToCopy)) {
                throw new Bridge.ArgumentOutOfRangeException("offsetOut", "Either offset did not refer to a position in the string, or there is an insufficient length of destination character array.");
            }

            var charsArr = [];
            var charsArrLength = scope.internal.convertToBase64Array(charsArr, inArray, offsetIn, length, insertLineBreaks);

            scope.internal.charsToCodes(charsArr, outArray, offsetOut);

            return charsArrLength;
        },

        fromBase64String: function (s) {
            // "s" is an unfortunate parameter name, but we need to keep it for backward compat.

            if (s == null) {
                throw new Bridge.ArgumentNullException("s");
            }

            var sChars = s.split("");
            var bytes = scope.internal.fromBase64CharPtr(sChars, 0, sChars.length);

            return bytes;
        },

        fromBase64CharArray: function (inArray, offset, length) {
            if (inArray == null) {
                throw new Bridge.ArgumentNullException("inArray");
            }

            if (length < 0) {
                throw new Bridge.ArgumentOutOfRangeException("length", "Index was out of range. Must be non-negative and less than the size of the collection.");
            }

            if (offset < 0) {
                throw new Bridge.ArgumentOutOfRangeException("offset", "Value must be positive.");
            }

            if (offset > (inArray.length - length)) {
                throw new Bridge.ArgumentOutOfRangeException("offset", "Offset and length must refer to a position in the string.");
            }

            var chars = scope.internal.codesToChars(inArray);
            var bytes = scope.internal.fromBase64CharPtr(chars, offset, length);

            return bytes;
        },

        convertToType: function (typeCode, value, formatProvider) {
            //TODO: #822 IConvertible 
            throw new Bridge.NotSupportedException("IConvertible interface is not supported.");
        }
    };

    scope.internal = {
        base64Table: [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
            "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d",
            "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
            "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7",
            "8", "9", "+", "/", "="
        ],

        typeRanges: {
            Char_MinValue: 0,
            Char_MaxValue: 65535,

            Byte_MinValue: 0,
            Byte_MaxValue: 255,

            SByte_MinValue: -128,
            SByte_MaxValue: 127,

            Int16_MinValue: -32768,
            Int16_MaxValue: 32767,

            UInt16_MinValue: 0,
            UInt16_MaxValue: 65535,

            Int32_MinValue: -2147483648,
            Int32_MaxValue: 2147483647,

            UInt32_MinValue: 0,
            UInt32_MaxValue: 4294967295,

            Int64_MinValue: Bridge.Long.MinValue,
            Int64_MaxValue: Bridge.Long.MaxValue,

            UInt64_MinValue: Bridge.ULong.MinValue,
            UInt64_MaxValue: Bridge.ULong.MaxValue,

            Single_MinValue: -3.40282347e+38,
            Single_MaxValue: 3.40282347e+38,

            Double_MinValue: -1.7976931348623157e+308,
            Double_MaxValue: 1.7976931348623157e+308,

            Decimal_MinValue: Bridge.Decimal.MinValue,
            Decimal_MaxValue: Bridge.Decimal.MaxValue
        },

        base64LineBreakPosition: 76,

        getTypeCodeName: function (typeCode) {
            var typeCodes = scope.convert.typeCodes;

            if (scope.internal.typeCodeNames == null) {
                var names = {};

                for (var codeName in typeCodes) {
                    if (!typeCodes.hasOwnProperty(codeName)) {
                        continue;
                    }

                    var codeValue = typeCodes[codeName];

                    names[codeValue] = codeName;
                }
                scope.internal.typeCodeNames = names;
            }

            var name = scope.internal.typeCodeNames[typeCode];

            if (name == null) {
                throw Bridge.ArgumentOutOfRangeException("typeCode", "The specified typeCode is undefined.");
            }

            return name;
        },

        suggestTypeCode: function (value) {
            var typeCodes = scope.convert.typeCodes;
            var type = typeof (value);

            switch (type) {
                case "boolean":
                    return typeCodes.Boolean;

                case "number":
                    if (value % 1 !== 0)
                        return typeCodes.Double;

                    return typeCodes.Int32;

                case "string":
                    return typeCodes.String;

                case "object":
                    if (Bridge.isDate(value)) {
                        return typeCodes.DateTime;
                    }

                    if (value != null) {
                        return typeCodes.Object;
                    }

                    break;
            }
            return null;
        },

        getMinValue: function (typeCode) {
            var typeCodes = scope.convert.typeCodes;

            switch (typeCode) {
                case typeCodes.Char:
                    return scope.internal.typeRanges.Char_MinValue;
                case typeCodes.SByte:
                    return scope.internal.typeRanges.SByte_MinValue;
                case typeCodes.Byte:
                    return scope.internal.typeRanges.Byte_MinValue;
                case typeCodes.Int16:
                    return scope.internal.typeRanges.Int16_MinValue;
                case typeCodes.UInt16:
                    return scope.internal.typeRanges.UInt16_MinValue;
                case typeCodes.Int32:
                    return scope.internal.typeRanges.Int32_MinValue;
                case typeCodes.UInt32:
                    return scope.internal.typeRanges.UInt32_MinValue;
                case typeCodes.Int64:
                    return scope.internal.typeRanges.Int64_MinValue;
                case typeCodes.UInt64:
                    return scope.internal.typeRanges.UInt64_MinValue;
                case typeCodes.Single:
                    return scope.internal.typeRanges.Single_MinValue;
                case typeCodes.Double:
                    return scope.internal.typeRanges.Double_MinValue;
                case typeCodes.Decimal:
                    return scope.internal.typeRanges.Decimal_MinValue;
                case typeCodes.DateTime:
                    var date = new Date(0);
                    date.setFullYear(1);
                    return date;

                default:
                    return null;
            }
        },

        getMaxValue: function (typeCode) {
            var typeCodes = scope.convert.typeCodes;

            switch (typeCode) {
                case typeCodes.Char:
                    return scope.internal.typeRanges.Char_MaxValue;
                case typeCodes.SByte:
                    return scope.internal.typeRanges.SByte_MaxValue;
                case typeCodes.Byte:
                    return scope.internal.typeRanges.Byte_MaxValue;
                case typeCodes.Int16:
                    return scope.internal.typeRanges.Int16_MaxValue;
                case typeCodes.UInt16:
                    return scope.internal.typeRanges.UInt16_MaxValue;
                case typeCodes.Int32:
                    return scope.internal.typeRanges.Int32_MaxValue;
                case typeCodes.UInt32:
                    return scope.internal.typeRanges.UInt32_MaxValue;
                case typeCodes.Int64:
                    return scope.internal.typeRanges.Int64_MaxValue;
                case typeCodes.UInt64:
                    return scope.internal.typeRanges.UInt64_MaxValue;
                case typeCodes.Single:
                    return scope.internal.typeRanges.Single_MaxValue;
                case typeCodes.Double:
                    return scope.internal.typeRanges.Double_MaxValue;
                case typeCodes.Decimal:
                    return scope.internal.typeRanges.Decimal_MaxValue;
                default:
                    throw new Bridge.ArgumentOutOfRangeException("typeCode", "The specified typeCode is undefined.");
            }
        },

        isFloatingType: function (typeCode) {
            var typeCodes = scope.convert.typeCodes;
            var isFloatingType =
                typeCode === typeCodes.Single ||
                typeCode === typeCodes.Double ||
                typeCode === typeCodes.Decimal;

            return isFloatingType;
        },

        toNumber: function (value, formatProvider, typeCode, valueTypeCode) {
            var typeCodes = scope.convert.typeCodes;

            var type = typeof (value);
            var isFloating = scope.internal.isFloatingType(typeCode);

            if (valueTypeCode === typeCodes.String) {
                type = "string";
            }

            if (Bridge.Long.is64Bit(value) || value instanceof Bridge.Decimal) {
                type = "number";
            }

            switch (type) {
                case "boolean":
                    return value ? 1 : 0;

                case "number":
                    if (typeCode === typeCodes.Decimal) {
                        scope.internal.validateNumberRange(value, typeCode, true);

                        return new Bridge.Decimal(value, formatProvider);
                    }

                    if (typeCode === typeCodes.Int64) {
                        scope.internal.validateNumberRange(value, typeCode, true);

                        return new Bridge.Long(value);
                    }

                    if (typeCode === typeCodes.UInt64) {
                        scope.internal.validateNumberRange(value, typeCode, true);

                        return new Bridge.ULong(value);
                    }

                    if (Bridge.Long.is64Bit(value)) {
                        value = value.toNumber();
                    }
                    else if (value instanceof Bridge.Decimal) {
                        value = value.toFloat();
                    }

                    if (!isFloating && (value % 1 !== 0)) {
                        value = scope.internal.roundToInt(value, typeCode);
                    }

                    if (isFloating) {
                        var minValue = scope.internal.getMinValue(typeCode);
                        var maxValue = scope.internal.getMaxValue(typeCode);

                        if (value > maxValue) {
                            value = Infinity;
                        } else if (value < minValue) {
                            value = -Infinity;
                        }
                    }

                    scope.internal.validateNumberRange(value, typeCode, false);
                    return value;

                case "string":
                    if (value == null) {
                        if (formatProvider != null) {
                            throw new Bridge.ArgumentNullException("String", "Value cannot be null.");
                        }

                        return 0;
                    }

                    if (isFloating) {
                        if (typeCode === typeCodes.Decimal) {
                            if (!/^[+-]?[0-9]+[.,]?[0-9]$/.test(value)) {
                                if (!/^[+-]?[0-9]+$/.test(value)) {
                                    throw new Bridge.FormatException("Input string was not in a correct format.");
                                }
                            }

                            value = Bridge.Decimal(value, formatProvider);
                        } else {
                            if (!/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(value)) {
                                throw new Bridge.FormatException("Input string was not in a correct format.");
                            }

                            value = parseFloat(value);
                        }
                    } else {
                        if (!/^[+-]?[0-9]+$/.test(value)) {
                            throw new Bridge.FormatException("Input string was not in a correct format.");
                        }

                        var str = value;
                        if (typeCode === typeCodes.Int64) {
                            value = new Bridge.Long(value);

                            if (str !== value.toString()) {
                                this.throwOverflow(scope.internal.getTypeCodeName(typeCode));
                            }
                        } else if (typeCode === typeCodes.UInt64) {
                            value = new Bridge.ULong(value);

                            if (str !== value.toString()) {
                                this.throwOverflow(scope.internal.getTypeCodeName(typeCode));
                            }
                        } else {
                            value = parseInt(value, 10);
                        }
                    }

                    if (isNaN(value)) {
                        throw new Bridge.FormatException("Input string was not in a correct format.");
                    }

                    scope.internal.validateNumberRange(value, typeCode, true);

                    return value;

                case "object":
                    if (value == null) {
                        return 0;
                    }

                    if (Bridge.isDate(value)) {
                        scope.internal.throwInvalidCastEx(scope.convert.typeCodes.DateTime, typeCode);
                    }

                    break;
            }

            // TODO: #822 When IConvertible is implemented, try it before throwing InvalidCastEx
            valueTypeCode = valueTypeCode || scope.internal.suggestTypeCode(value);
            scope.internal.throwInvalidCastEx(valueTypeCode, typeCode);

            // try converting using IConvertible
            return scope.convert.convertToType(typeCode, value, formatProvider);
        },

        validateNumberRange: function (value, typeCode, denyInfinity) {
            var typeCodes = scope.convert.typeCodes;
            var minValue = scope.internal.getMinValue(typeCode);
            var maxValue = scope.internal.getMaxValue(typeCode);
            var typeName = scope.internal.getTypeCodeName(typeCode);

            if (typeCode === typeCodes.Single ||
                typeCode === typeCodes.Double) {

                if (!denyInfinity && (value === Infinity || value === -Infinity)) {
                    return;
                }
            }

            if (typeCode === typeCodes.Decimal || typeCode === typeCodes.Int64 || typeCode === typeCodes.UInt64) {
                if (typeCode === typeCodes.Decimal) {
                    if (!Bridge.Long.is64Bit(value)) {
                        if (minValue.gt(value) || maxValue.lt(value)) {
                            this.throwOverflow(typeName);
                        }
                    }

                    value = new Bridge.Decimal(value);
                }
                else if (typeCode === typeCodes.Int64) {
                    if (value instanceof Bridge.ULong) {
                        if (value.gt(Bridge.Long.MaxValue)) {
                            this.throwOverflow(typeName);
                        }
                    } else if (value instanceof Bridge.Decimal) {
                        if ((value.gt(new Bridge.Decimal(maxValue)) || value.lt(new Bridge.Decimal(minValue)))) {
                            this.throwOverflow(typeName);
                        }
                    } else if (!(value instanceof Bridge.Long)) {
                        if (minValue.toNumber() > value || maxValue.toNumber() < value) {
                            this.throwOverflow(typeName);
                        }
                    }

                    value = new Bridge.Long(value);
                }
                else if (typeCode === typeCodes.UInt64) {
                    if (value instanceof Bridge.Long) {
                        if (value.isNegative()) {
                            this.throwOverflow(typeName);
                        }
                    } else if (value instanceof Bridge.Decimal) {
                        if ((value.gt(new Bridge.Decimal(maxValue)) || value.lt(new Bridge.Decimal(minValue)))) {
                            this.throwOverflow(typeName);
                        }
                    } else if (!(value instanceof Bridge.ULong)) {
                        if (minValue.toNumber() > value || maxValue.toNumber() < value) {
                            this.throwOverflow(typeName);
                        }
                    }

                    value = new Bridge.ULong(value);
                }
            } else if (value < minValue || value > maxValue) {
                this.throwOverflow(typeName);
            }
        },

        throwOverflow: function (typeName) {
            throw new Bridge.OverflowException("Value was either too large or too small for '" + typeName + "'.");
        },

        roundToInt: function (value, typeCode) {
            if (value % 1 === 0) {
                return value;
            }

            var intPart;

            if (value >= 0) {
                intPart = Math.floor(value);
            } else {
                intPart = -1 * Math.floor(-value);
            }

            var floatPart = value - intPart;

            var minValue = scope.internal.getMinValue(typeCode);
            var maxValue = scope.internal.getMaxValue(typeCode);

            if (value >= 0.0) {
                if (value < (maxValue + 0.5)) {
                    if (floatPart > 0.5 || floatPart === 0.5 && (intPart & 1) !== 0) {
                        ++intPart;
                    }

                    return intPart;
                }
            } else if (value >= (minValue - 0.5)) {
                if (floatPart < -0.5 || floatPart === -0.5 && (intPart & 1) !== 0) {
                    --intPart;
                }

                return intPart;
            }

            var typeName = scope.internal.getTypeCodeName(typeCode);

            throw new Bridge.OverflowException("Value was either too large or too small for an '" + typeName + "'.");
        },

        toBase64_CalculateAndValidateOutputLength: function (inputLength, insertLineBreaks) {
            var base64LineBreakPosition = scope.internal.base64LineBreakPosition;

            var outlen = ~~(inputLength / 3) * 4;           // the base length - we want integer division here. 
            outlen += ((inputLength % 3) !== 0) ? 4 : 0;    // at most 4 more chars for the remainder

            if (outlen === 0) {
                return 0;
            }

            if (insertLineBreaks) {
                var newLines = ~~(outlen / base64LineBreakPosition);

                if ((outlen % base64LineBreakPosition) === 0) {
                    --newLines;
                }

                outlen += newLines * 2;                     // the number of line break chars we'll add, "\r\n"
            }

            // If we overflow an int then we cannot allocate enough
            // memory to output the value so throw
            if (outlen > 2147483647) {
                throw new Bridge.OutOfMemoryException();
            }

            return outlen;
        },

        convertToBase64Array: function (outChars, inData, offset, length, insertLineBreaks) {
            var base64Table = scope.internal.base64Table;
            var base64LineBreakPosition = scope.internal.base64LineBreakPosition;
            var lengthmod3 = length % 3;
            var calcLength = offset + (length - lengthmod3);
            var charCount = 0;
            var j = 0;

            // Convert three bytes at a time to base64 notation.  This will consume 4 chars.
            var i;

            for (i = offset; i < calcLength; i += 3) {
                if (insertLineBreaks) {
                    if (charCount === base64LineBreakPosition) {
                        outChars[j++] = "\r";
                        outChars[j++] = "\n";
                        charCount = 0;
                    }

                    charCount += 4;
                }

                outChars[j] = base64Table[(inData[i] & 0xfc) >> 2];
                outChars[j + 1] = base64Table[((inData[i] & 0x03) << 4) | ((inData[i + 1] & 0xf0) >> 4)];
                outChars[j + 2] = base64Table[((inData[i + 1] & 0x0f) << 2) | ((inData[i + 2] & 0xc0) >> 6)];
                outChars[j + 3] = base64Table[(inData[i + 2] & 0x3f)];
                j += 4;
            }

            //Where we left off before
            i = calcLength;

            if (insertLineBreaks && (lengthmod3 !== 0) && (charCount === scope.internal.base64LineBreakPosition)) {
                outChars[j++] = "\r";
                outChars[j++] = "\n";
            }

            switch (lengthmod3) {
                case 2: //One character padding needed
                    outChars[j] = base64Table[(inData[i] & 0xfc) >> 2];
                    outChars[j + 1] = base64Table[((inData[i] & 0x03) << 4) | ((inData[i + 1] & 0xf0) >> 4)];
                    outChars[j + 2] = base64Table[(inData[i + 1] & 0x0f) << 2];
                    outChars[j + 3] = base64Table[64]; //Pad
                    j += 4;
                    break;

                case 1: // Two character padding needed
                    outChars[j] = base64Table[(inData[i] & 0xfc) >> 2];
                    outChars[j + 1] = base64Table[(inData[i] & 0x03) << 4];
                    outChars[j + 2] = base64Table[64]; //Pad
                    outChars[j + 3] = base64Table[64]; //Pad
                    j += 4;
                    break;
            }

            return j;
        },

        fromBase64CharPtr: function (input, offset, inputLength) {
            if (inputLength < 0) {
                throw new Bridge.ArgumentOutOfRangeException("inputLength", "Index was out of range. Must be non-negative and less than the size of the collection.");
            }

            if (offset < 0) {
                throw new Bridge.ArgumentOutOfRangeException("offset", "Value must be positive.");
            }

            // We need to get rid of any trailing white spaces.
            // Otherwise we would be rejecting input such as "abc= ":
            while (inputLength > 0) {
                var lastChar = input[offset + inputLength - 1];

                if (lastChar !== " " && lastChar !== "\n" && lastChar !== "\r" && lastChar !== "\t") {
                    break;
                }

                inputLength--;
            }

            // Compute the output length:
            var resultLength = scope.internal.fromBase64_ComputeResultLength(input, offset, inputLength);

            if (0 > resultLength) {
                throw new Bridge.InvalidOperationException("Contract voilation: 0 <= resultLength.");
            }

            // resultLength can be zero. We will still enter FromBase64_Decode and process the input.
            // It may either simply write no bytes (e.g. input = " ") or throw (e.g. input = "ab").

            // Create result byte blob:
            var decodedBytes = [];
            decodedBytes.length = resultLength;

            // Convert Base64 chars into bytes:
            scope.internal.fromBase64_Decode(input, offset, inputLength, decodedBytes, 0, resultLength);

            // We are done:
            return decodedBytes;
        },

        fromBase64_Decode: function (input, inputIndex, inputLength, dest, destIndex, destLength) {
            var startDestIndex = destIndex;

            // You may find this method weird to look at. Its written for performance, not aesthetics.
            // You will find unrolled loops label jumps and bit manipulations.

            var intA = "A".charCodeAt(0);
            var inta = "a".charCodeAt(0);
            var int0 = "0".charCodeAt(0);
            var intEq = "=".charCodeAt(0);
            var intPlus = "+".charCodeAt(0);
            var intSlash = "/".charCodeAt(0);
            var intSpace = " ".charCodeAt(0);
            var intTab = "\t".charCodeAt(0);
            var intNLn = "\n".charCodeAt(0);
            var intCRt = "\r".charCodeAt(0);
            var intAtoZ = ("Z".charCodeAt(0) - "A".charCodeAt(0));  // = ('z' - 'a')
            var int0To9 = ("9".charCodeAt(0) - "0".charCodeAt(0));

            var endInputIndex = inputIndex + inputLength;
            var endDestIndex = destIndex + destLength;

            // Current char code/value:
            var currCode;

            // This 4-byte integer will contain the 4 codes of the current 4-char group.
            // Eeach char codes for 6 bits = 24 bits.
            // The remaining byte will be FF, we use it as a marker when 4 chars have been processed.            
            var currBlockCodes = 0x000000FF;

            var allInputConsumed = false;
            var equalityCharEncountered = false;

            while (true) {
                // break when done:
                if (inputIndex >= endInputIndex) {
                    allInputConsumed = true;
                    break;
                }

                // Get current char:
                currCode = input[inputIndex].charCodeAt(0);
                inputIndex++;

                // Determine current char code (unsigned Int comparison):
                if (((currCode - intA) >>> 0) <= intAtoZ) {
                    currCode -= intA;
                } else if (((currCode - inta) >>> 0) <= intAtoZ) {
                    currCode -= (inta - 26);
                } else if (((currCode - int0) >>> 0) <= int0To9) {
                    currCode -= (int0 - 52);
                } else {
                    // Use the slower switch for less common cases:
                    switch (currCode) {
                        // Significant chars:
                        case intPlus:
                            currCode = 62;
                            break;

                        case intSlash:
                            currCode = 63;
                            break;

                            // Legal no-value chars (we ignore these):
                        case intCRt:
                        case intNLn:
                        case intSpace:
                        case intTab:
                            continue;

                            // The equality char is only legal at the end of the input.
                            // Jump after the loop to make it easier for the JIT register predictor to do a good job for the loop itself:
                        case intEq:
                            equalityCharEncountered = true;
                            break;

                            // Other chars are illegal:
                        default:
                            throw new Bridge.FormatException("The input is not a valid Base-64 string as it contains a non-base 64 character, more than two padding characters, or an illegal character among the padding characters.");
                    }
                }

                if (equalityCharEncountered) {
                    break;
                }

                // Ok, we got the code. Save it:
                currBlockCodes = (currBlockCodes << 6) | currCode;

                // Last bit in currBlockCodes will be on after in shifted right 4 times:
                if ((currBlockCodes & 0x80000000) !== 0) {

                    if ((endDestIndex - destIndex) < 3) {
                        return -1;
                    }

                    dest[destIndex] = 0xFF & (currBlockCodes >> 16);
                    dest[destIndex + 1] = 0xFF & (currBlockCodes >> 8);
                    dest[destIndex + 2] = 0xFF & (currBlockCodes);
                    destIndex += 3;

                    currBlockCodes = 0x000000FF;
                }

            } // end of while

            if (!allInputConsumed && !equalityCharEncountered) {
                throw new Bridge.InvalidOperationException("Contract violation: should never get here.");
            }

            if (equalityCharEncountered) {
                if (currCode !== intEq) {
                    throw new Bridge.InvalidOperationException("Contract violation: currCode == intEq.");
                }

                // Recall that inputIndex is now one position past where '=' was read.
                // '=' can only be at the last input pos:
                if (inputIndex === endInputIndex) {

                    // Code is zero for trailing '=':
                    currBlockCodes <<= 6;

                    // The '=' did not complete a 4-group. The input must be bad:
                    if ((currBlockCodes & 0x80000000) === 0) {
                        throw new Bridge.FormatException("Invalid length for a Base-64 char array or string.");
                    }

                    if ((endDestIndex - destIndex) < 2) {
                        // Autch! We underestimated the output length!
                        return -1;
                    }

                    // We are good, store bytes form this past group. We had a single "=", so we take two bytes:
                    dest[destIndex] = 0xFF & (currBlockCodes >> 16);
                    dest[destIndex + 1] = 0xFF & (currBlockCodes >> 8);
                    destIndex += 2;

                    currBlockCodes = 0x000000FF;

                } else { // '=' can also be at the pre-last position iff the last is also a '=' excluding the white spaces:

                    // We need to get rid of any intermediate white spaces.
                    // Otherwise we would be rejecting input such as "abc= =":
                    while (inputIndex < (endInputIndex - 1)) {
                        var lastChar = input[inputIndex];

                        if (lastChar !== " " && lastChar !== "\n" && lastChar !== "\r" && lastChar !== "\t") {
                            break;
                        }

                        inputIndex++;
                    }

                    if (inputIndex === (endInputIndex - 1) && input[inputIndex] === "=") {
                        // Code is zero for each of the two '=':
                        currBlockCodes <<= 12;

                        // The '=' did not complete a 4-group. The input must be bad:
                        if ((currBlockCodes & 0x80000000) === 0) {
                            throw new Bridge.FormatException("Invalid length for a Base-64 char array or string.");
                        }

                        if ((endDestIndex - destIndex) < 1) {
                            // Autch! We underestimated the output length!
                            return -1;
                        }

                        // We are good, store bytes form this past group. We had a "==", so we take only one byte:
                        dest[destIndex] = 0xFF & (currBlockCodes >> 16);
                        destIndex++;

                        currBlockCodes = 0x000000FF;

                    } else {
                        // '=' is not ok at places other than the end:
                        throw new Bridge.FormatException("The input is not a valid Base-64 string as it contains a non-base 64 character, more than two padding characters, or an illegal character among the padding characters.");
                    }
                }

            }

            // We get here either from above or by jumping out of the loop:
            // The last block of chars has less than 4 items
            if (currBlockCodes !== 0x000000FF) {
                throw new Bridge.FormatException("Invalid length for a Base-64 char array or string.");
            }

            // Return how many bytes were actually recovered:
            return (destIndex - startDestIndex);

        },

        fromBase64_ComputeResultLength: function (input, startIndex, inputLength) {
            var intEq = "=";
            var intSpace = " ";

            if (inputLength < 0) {
                throw new Bridge.ArgumentOutOfRangeException("inputLength", "Index was out of range. Must be non-negative and less than the size of the collection.");
            }

            var endIndex = startIndex + inputLength;
            var usefulInputLength = inputLength;
            var padding = 0;

            while (startIndex < endIndex) {

                var c = input[startIndex];
                startIndex++;

                // We want to be as fast as possible and filter out spaces with as few comparisons as possible.
                // We end up accepting a number of illegal chars as legal white-space chars.
                // This is ok: as soon as we hit them during actual decode we will recognise them as illegal and throw.
                if (c <= intSpace) {
                    usefulInputLength--;
                } else if (c === intEq) {
                    usefulInputLength--;
                    padding++;
                }
            }

            if (0 > usefulInputLength) {
                throw new Bridge.InvalidOperationException("Contract violation: 0 <= usefulInputLength.");
            }

            if (0 > padding) {
                // For legal input, we can assume that 0 <= padding < 3. But it may be more for illegal input.
                // We will notice it at decode when we see a '=' at the wrong place.
                throw new Bridge.InvalidOperationException("Contract violation: 0 <= padding.");
            }

            // Perf: reuse the variable that stored the number of '=' to store the number of bytes encoded by the
            // last group that contains the '=':
            if (padding !== 0) {
                if (padding === 1) {
                    padding = 2;
                } else if (padding === 2) {
                    padding = 1;
                } else {
                    throw new Bridge.FormatException("The input is not a valid Base-64 string as it contains a non-base 64 character, more than two padding characters, or an illegal character among the padding characters.");
                }
            }

            // Done:
            return ~~(usefulInputLength / 4) * 3 + padding;
        },

        charsToCodes: function (chars, codes, codesOffset) {
            if (chars == null) {
                return null;
            }

            codesOffset = codesOffset || 0;

            if (codes == null) {
                codes = [];
                codes.length = chars.length;
            }

            for (var i = 0; i < chars.length; i++) {
                codes[i + codesOffset] = chars[i].charCodeAt(0);
            }

            return codes;
        },

        codesToChars: function (codes, chars) {
            if (codes == null) {
                return null;
            }

            chars = chars || [];

            for (var i = 0; i < codes.length; i++) {
                var code = codes[i];

                chars[i] = String.fromCharCode(code);
            }

            return chars;
        },

        throwInvalidCastEx: function (fromTypeCode, toTypeCode) {
            var fromType = scope.internal.getTypeCodeName(fromTypeCode);
            var toType = scope.internal.getTypeCodeName(toTypeCode);

            throw new Bridge.InvalidCastException("Invalid cast from '" + fromType + "' to '" + toType + "'.");
        }
    };

    Bridge.Convert = scope.convert;

/*--------------------------------------------------------------------------
 * linq.js - LINQ for JavaScript
 * ver 3.0.4-Beta5 (Jun. 20th, 2013)
 *
 * created and maintained by neuecc <ils@neue.cc>
 * licensed under MIT License
 * http://linqjs.codeplex.com/
 *------------------------------------------------------------------------*/

(function (root, undefined) {
    // ReadOnly Function
    var Functions = {
        Identity: function (x) { return x; },
        True: function () { return true; },
        Blank: function () { }
    };

    // const Type
    var Types = {
        Boolean: typeof true,
        Number: typeof 0,
        String: typeof "",
        Object: typeof {},
        Undefined: typeof undefined,
        Function: typeof function () { }
    };

    // createLambda cache
    var funcCache = { "": Functions.Identity };

    // private utility methods
    var Utils = {
        // Create anonymous function from lambda expression string
        createLambda: function (expression) {
            if (expression == null) return Functions.Identity;
            if (typeof expression === Types.String) {
                // get from cache
                var f = funcCache[expression];
                if (f != null) {
                    return f;
                }

                if (expression.indexOf("=>") === -1) {
                    var regexp = new RegExp("[$]+", "g");

                    var maxLength = 0;
                    var match;
                    while ((match = regexp.exec(expression)) != null) {
                        var paramNumber = match[0].length;
                        if (paramNumber > maxLength) {
                            maxLength = paramNumber;
                        }
                    }

                    var argArray = [];
                    for (var i = 1; i <= maxLength; i++) {
                        var dollar = "";
                        for (var j = 0; j < i; j++) {
                            dollar += "$";
                        }
                        argArray.push(dollar);
                    }

                    var args = Array.prototype.join.call(argArray, ",");

                    f = new Function(args, "return " + expression);
                    funcCache[expression] = f;
                    return f;
                }
                else {
                    var expr = expression.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);
                    f = new Function(expr[1], "return " + expr[2]);
                    funcCache[expression] = f;
                    return f;
                }
            }
            return expression;
        },

        isIEnumerable: function (obj) {
            if (typeof Enumerator !== Types.Undefined) {
                try {
                    new Enumerator(obj); // check JScript(IE)'s Enumerator
                    return true;
                }
                catch (e) { }
            }

            return false;
        },

        // IE8's defineProperty is defined but cannot use, therefore check defineProperties
        defineProperty: (Object.defineProperties != null)
            ? function (target, methodName, value) {
                Object.defineProperty(target, methodName, {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: value
                })
            }
            : function (target, methodName, value) {
                target[methodName] = value;
            },

        compare: function (a, b) {
            return (a === b) ? 0
                 : (a > b) ? 1
                 : -1;
        },

        dispose: function (obj) {
            if (obj != null) obj.dispose();
        }
    };

    // IEnumerator State
    var State = { Before: 0, Running: 1, After: 2 };

    // "Enumerator" is conflict JScript's "Enumerator"
    var IEnumerator = function (initialize, tryGetNext, dispose) {
        var yielder = new Yielder();
        var state = State.Before;

        this.getCurrent = yielder.getCurrent;
        this.reset = function () { throw new Error('Reset is not supported'); };

        this.moveNext = function () {
            try {
                switch (state) {
                    case State.Before:
                        state = State.Running;
                        initialize();
                        // fall through
                    case State.Running:
                        if (tryGetNext.apply(yielder)) {
                            return true;
                        }
                        else {
                            this.dispose();
                            return false;
                        }
                    case State.After:
                        return false;
                }
            }
            catch (e) {
                this.dispose();
                throw e;
            }
        };

        this.dispose = function () {
            if (state != State.Running) return;

            try {
                dispose();
            }
            finally {
                state = State.After;
            }
        };
    };
    
    Bridge.IDisposable.$$inheritors = Bridge.IDisposable.$$inheritors || [];
    Bridge.IDisposable.$$inheritors.push(IEnumerator);

    // for tryGetNext
    var Yielder = function () {
        var current = null;
        this.getCurrent = function () { return current; };
        this.yieldReturn = function (value) {
            current = value;
            return true;
        };
        this.yieldBreak = function () {
            return false;
        };
    };

    // Enumerable constuctor
    var Enumerable = function (getEnumerator) {
        this.getEnumerator = getEnumerator;
    };
    Bridge.IEnumerable.$$inheritors = Bridge.IEnumerable.$$inheritors || [];
    Bridge.IEnumerable.$$inheritors.push(Enumerable);

    // Utility

    Enumerable.Utils = {}; // container

    Enumerable.Utils.createLambda = function (expression) {
        return Utils.createLambda(expression);
    };

    Enumerable.Utils.createEnumerable = function (getEnumerator) {
        return new Enumerable(getEnumerator);
    };

    Enumerable.Utils.createEnumerator = function (initialize, tryGetNext, dispose) {
        return new IEnumerator(initialize, tryGetNext, dispose);
    };

    Enumerable.Utils.extendTo = function (type) {
        var typeProto = type.prototype;
        var enumerableProto;

        if (type === Array) {
            enumerableProto = ArrayEnumerable.prototype;
            Utils.defineProperty(typeProto, "getSource", function () {
                return this;
            });
        }
        else {
            enumerableProto = Enumerable.prototype;
            Utils.defineProperty(typeProto, "getEnumerator", function () {
                return Enumerable.from(this).getEnumerator();
            });
        }

        for (var methodName in enumerableProto) {
            var func = enumerableProto[methodName];

            // already extended
            if (typeProto[methodName] == func) continue;

            // already defined(example Array#reverse/join/forEach...)
            if (typeProto[methodName] != null) {
                methodName = methodName + "ByLinq";
                if (typeProto[methodName] == func) continue; // recheck
            }

            if (func instanceof Function) {
                Utils.defineProperty(typeProto, methodName, func);
            }
        }
    };

    // Generator

    Enumerable.choice = function () // variable argument
    {
        var args = arguments;

        return new Enumerable(function () {
            return new IEnumerator(
                function () {
                    args = (args[0] instanceof Array) ? args[0]
                        : (args[0].getEnumerator != null) ? args[0].toArray()
                        : args;
                },
                function () {
                    return this.yieldReturn(args[Math.floor(Math.random() * args.length)]);
                },
                Functions.Blank);
        });
    };

    Enumerable.cycle = function () // variable argument
    {
        var args = arguments;

        return new Enumerable(function () {
            var index = 0;
            return new IEnumerator(
                function () {
                    args = (args[0] instanceof Array) ? args[0]
                        : (args[0].getEnumerator != null) ? args[0].toArray()
                        : args;
                },
                function () {
                    if (index >= args.length) index = 0;
                    return this.yieldReturn(args[index++]);
                },
                Functions.Blank);
        });
    };

    // private singleton
    var emptyEnumerable = new Enumerable(function () {
            return new IEnumerator(
                Functions.Blank,
                function () { return false; },
                Functions.Blank);
        });
    Enumerable.empty = function () {
        return emptyEnumerable;
    };

    Enumerable.from = function (obj) {
        if (obj == null) {
            return Enumerable.empty();
        }
        if (obj instanceof Enumerable) {
            return obj;
        }
        if (typeof obj == Types.Number || typeof obj == Types.Boolean) {
            return Enumerable.repeat(obj, 1);
        }
        if (typeof obj == Types.String) {
            return new Enumerable(function () {
                var index = 0;
                return new IEnumerator(
                    Functions.Blank,
                    function () {
                        return (index < obj.length) ? this.yieldReturn(obj.charCodeAt(index++)) : false;
                    },
                    Functions.Blank);
            });
        }
        var ienum = Bridge.as(obj, Bridge.IEnumerable);
        if (ienum) {
            return new Enumerable(function () {
                var enumerator;
                return new IEnumerator(
                    function () { enumerator = Bridge.getEnumerator(ienum); },
                    function () {
                        var ok = enumerator.moveNext();
                        return ok ? this.yieldReturn(enumerator.getCurrent()) : false;
                    },
                    function () {
                        var disposable = Bridge.as(enumerator, Bridge.IDisposable);
                        if (disposable) {
                            disposable.dispose();
                        }
                    }
                );
            });
        }
        if (typeof obj != Types.Function) {
            // array or array like object
            if (typeof obj.length == Types.Number) {
                return new ArrayEnumerable(obj);
            }

            // JScript's IEnumerable
            if (!(obj instanceof Object) && Utils.isIEnumerable(obj)) {
                return new Enumerable(function () {
                    var isFirst = true;
                    var enumerator;
                    return new IEnumerator(
                        function () { enumerator = new Enumerator(obj); },
                        function () {
                            if (isFirst) isFirst = false;
                            else enumerator.moveNext();

                            return (enumerator.atEnd()) ? false : this.yieldReturn(enumerator.item());
                        },
                        Functions.Blank);
                });
            }

            // WinMD IIterable<T>
            if (typeof Windows === Types.Object && typeof obj.first === Types.Function) {
                return new Enumerable(function () {
                    var isFirst = true;
                    var enumerator;
                    return new IEnumerator(
                        function () { enumerator = obj.first(); },
                        function () {
                            if (isFirst) isFirst = false;
                            else enumerator.moveNext();

                            return (enumerator.hasCurrent) ? this.yieldReturn(enumerator.current) : this.yieldBreak();
                        },
                        Functions.Blank);
                });
            }
        }

        // case function/object : Create keyValuePair[]
        return new Enumerable(function () {
            var array = [];
            var index = 0;

            return new IEnumerator(
                function () {
                    for (var key in obj) {
                        var value = obj[key];
                        if (!(value instanceof Function) && Object.prototype.hasOwnProperty.call(obj, key)) {
                            array.push({ key: key, value: value });
                        }
                    }
                },
                function () {
                    return (index < array.length)
                        ? this.yieldReturn(array[index++])
                        : false;
                },
                Functions.Blank);
        });
    },

    Enumerable.make = function (element) {
        return Enumerable.repeat(element, 1);
    };

    // Overload:function (input, pattern)
    // Overload:function (input, pattern, flags)
    Enumerable.matches = function (input, pattern, flags) {
        if (flags == null) flags = "";
        if (pattern instanceof RegExp) {
            flags += (pattern.ignoreCase) ? "i" : "";
            flags += (pattern.multiline) ? "m" : "";
            pattern = pattern.source;
        }
        if (flags.indexOf("g") === -1) flags += "g";

        return new Enumerable(function () {
            var regex;
            return new IEnumerator(
                function () { regex = new RegExp(pattern, flags); },
                function () {
                    var match = regex.exec(input);
                    return (match) ? this.yieldReturn(match) : false;
                },
                Functions.Blank);
        });
    };

    // Overload:function (start, count)
    // Overload:function (start, count, step)
    Enumerable.range = function (start, count, step) {
        if (step == null) step = 1;

        return new Enumerable(function () {
            var value;
            var index = 0;

            return new IEnumerator(
                function () { value = start - step; },
                function () {
                    return (index++ < count)
                        ? this.yieldReturn(value += step)
                        : this.yieldBreak();
                },
                Functions.Blank);
        });
    };

    // Overload:function (start, count)
    // Overload:function (start, count, step)
    Enumerable.rangeDown = function (start, count, step) {
        if (step == null) step = 1;

        return new Enumerable(function () {
            var value;
            var index = 0;

            return new IEnumerator(
                function () { value = start + step; },
                function () {
                    return (index++ < count)
                        ? this.yieldReturn(value -= step)
                        : this.yieldBreak();
                },
                Functions.Blank);
        });
    };

    // Overload:function (start, to)
    // Overload:function (start, to, step)
    Enumerable.rangeTo = function (start, to, step) {
        if (step == null) step = 1;

        if (start < to) {
            return new Enumerable(function () {
                var value;

                return new IEnumerator(
                function () { value = start - step; },
                function () {
                    var next = value += step;
                    return (next <= to)
                        ? this.yieldReturn(next)
                        : this.yieldBreak();
                },
                Functions.Blank);
            });
        }
        else {
            return new Enumerable(function () {
                var value;

                return new IEnumerator(
                function () { value = start + step; },
                function () {
                    var next = value -= step;
                    return (next >= to)
                        ? this.yieldReturn(next)
                        : this.yieldBreak();
                },
                Functions.Blank);
            });
        }
    };

    // Overload:function (element)
    // Overload:function (element, count)
    Enumerable.repeat = function (element, count) {
        if (count != null) return Enumerable.repeat(element).take(count);

        return new Enumerable(function () {
            return new IEnumerator(
                Functions.Blank,
                function () { return this.yieldReturn(element); },
                Functions.Blank);
        });
    };

    Enumerable.repeatWithFinalize = function (initializer, finalizer) {
        initializer = Utils.createLambda(initializer);
        finalizer = Utils.createLambda(finalizer);

        return new Enumerable(function () {
            var element;
            return new IEnumerator(
                function () { element = initializer(); },
                function () { return this.yieldReturn(element); },
                function () {
                    if (element != null) {
                        finalizer(element);
                        element = null;
                    }
                });
        });
    };

    // Overload:function (func)
    // Overload:function (func, count)
    Enumerable.generate = function (func, count) {
        if (count != null) return Enumerable.generate(func).take(count);
        func = Utils.createLambda(func);

        return new Enumerable(function () {
            return new IEnumerator(
                Functions.Blank,
                function () { return this.yieldReturn(func()); },
                Functions.Blank);
        });
    };

    // Overload:function ()
    // Overload:function (start)
    // Overload:function (start, step)
    Enumerable.toInfinity = function (start, step) {
        if (start == null) start = 0;
        if (step == null) step = 1;

        return new Enumerable(function () {
            var value;
            return new IEnumerator(
                function () { value = start - step; },
                function () { return this.yieldReturn(value += step); },
                Functions.Blank);
        });
    };

    // Overload:function ()
    // Overload:function (start)
    // Overload:function (start, step)
    Enumerable.toNegativeInfinity = function (start, step) {
        if (start == null) start = 0;
        if (step == null) step = 1;

        return new Enumerable(function () {
            var value;
            return new IEnumerator(
                function () { value = start + step; },
                function () { return this.yieldReturn(value -= step); },
                Functions.Blank);
        });
    };

    Enumerable.unfold = function (seed, func) {
        func = Utils.createLambda(func);

        return new Enumerable(function () {
            var isFirst = true;
            var value;
            return new IEnumerator(
                Functions.Blank,
                function () {
                    if (isFirst) {
                        isFirst = false;
                        value = seed;
                        return this.yieldReturn(value);
                    }
                    value = func(value);
                    return this.yieldReturn(value);
                },
                Functions.Blank);
        });
    };

    Enumerable.defer = function (enumerableFactory) {

        return new Enumerable(function () {
            var enumerator;

            return new IEnumerator(
                function () { enumerator = Enumerable.from(enumerableFactory()).getEnumerator(); },
                function () {
                    return (enumerator.moveNext())
                        ? this.yieldReturn(enumerator.getCurrent())
                        : this.yieldBreak();
                },
                function () {
                    Utils.dispose(enumerator);
                });
        });
    };

    // Extension Methods

    /* Projection and Filtering Methods */

    // Overload:function (func)
    // Overload:function (func, resultSelector<element>)
    // Overload:function (func, resultSelector<element, nestLevel>)
    Enumerable.prototype.traverseBreadthFirst = function (func, resultSelector) {
        var source = this;
        func = Utils.createLambda(func);
        resultSelector = Utils.createLambda(resultSelector);

        return new Enumerable(function () {
            var enumerator;
            var nestLevel = 0;
            var buffer = [];

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    while (true) {
                        if (enumerator.moveNext()) {
                            buffer.push(enumerator.getCurrent());
                            return this.yieldReturn(resultSelector(enumerator.getCurrent(), nestLevel));
                        }

                        var next = Enumerable.from(buffer).selectMany(function (x) { return func(x); });
                        if (!next.any()) {
                            return false;
                        }
                        else {
                            nestLevel++;
                            buffer = [];
                            Utils.dispose(enumerator);
                            enumerator = next.getEnumerator();
                        }
                    }
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    // Overload:function (func)
    // Overload:function (func, resultSelector<element>)
    // Overload:function (func, resultSelector<element, nestLevel>)
    Enumerable.prototype.traverseDepthFirst = function (func, resultSelector) {
        var source = this;
        func = Utils.createLambda(func);
        resultSelector = Utils.createLambda(resultSelector);

        return new Enumerable(function () {
            var enumeratorStack = [];
            var enumerator;

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    while (true) {
                        if (enumerator.moveNext()) {
                            var value = resultSelector(enumerator.getCurrent(), enumeratorStack.length);
                            enumeratorStack.push(enumerator);
                            enumerator = Enumerable.from(func(enumerator.getCurrent())).getEnumerator();
                            return this.yieldReturn(value);
                        }

                        if (enumeratorStack.length <= 0) return false;
                        Utils.dispose(enumerator);
                        enumerator = enumeratorStack.pop();
                    }
                },
                function () {
                    try {
                        Utils.dispose(enumerator);
                    }
                    finally {
                        Enumerable.from(enumeratorStack).forEach(function (s) { s.dispose(); });
                    }
                });
        });
    };

    Enumerable.prototype.flatten = function () {
        var source = this;

        return new Enumerable(function () {
            var enumerator;
            var middleEnumerator = null;

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    while (true) {
                        if (middleEnumerator != null) {
                            if (middleEnumerator.moveNext()) {
                                return this.yieldReturn(middleEnumerator.getCurrent());
                            }
                            else {
                                middleEnumerator = null;
                            }
                        }

                        if (enumerator.moveNext()) {
                            if (enumerator.getCurrent() instanceof Array) {
                                Utils.dispose(middleEnumerator);
                                middleEnumerator = Enumerable.from(enumerator.getCurrent())
                                    .selectMany(Functions.Identity)
                                    .flatten()
                                    .getEnumerator();
                                continue;
                            }
                            else {
                                return this.yieldReturn(enumerator.getCurrent());
                            }
                        }

                        return false;
                    }
                },
                function () {
                    try {
                        Utils.dispose(enumerator);
                    }
                    finally {
                        Utils.dispose(middleEnumerator);
                    }
                });
        });
    };

    Enumerable.prototype.pairwise = function (selector) {
        var source = this;
        selector = Utils.createLambda(selector);

        return new Enumerable(function () {
            var enumerator;

            return new IEnumerator(
                function () {
                    enumerator = source.getEnumerator();
                    enumerator.moveNext();
                },
                function () {
                    var prev = enumerator.getCurrent();
                    return (enumerator.moveNext())
                        ? this.yieldReturn(selector(prev, enumerator.getCurrent()))
                        : false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    // Overload:function (func)
    // Overload:function (seed,func<value,element>)
    Enumerable.prototype.scan = function (seed, func) {
        var isUseSeed;
        if (func == null) {
            func = Utils.createLambda(seed); // arguments[0]
            isUseSeed = false;
        } else {
            func = Utils.createLambda(func);
            isUseSeed = true;
        }
        var source = this;

        return new Enumerable(function () {
            var enumerator;
            var value;
            var isFirst = true;

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    if (isFirst) {
                        isFirst = false;
                        if (!isUseSeed) {
                            if (enumerator.moveNext()) {
                                return this.yieldReturn(value = enumerator.getCurrent());
                            }
                        }
                        else {
                            return this.yieldReturn(value = seed);
                        }
                    }

                    return (enumerator.moveNext())
                        ? this.yieldReturn(value = func(value, enumerator.getCurrent()))
                        : false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    // Overload:function (selector<element>)
    // Overload:function (selector<element,index>)
    Enumerable.prototype.select = function (selector) {
        selector = Utils.createLambda(selector);

        if (selector.length <= 1) {
            return new WhereSelectEnumerable(this, null, selector);
        }
        else {
            var source = this;

            return new Enumerable(function () {
                var enumerator;
                var index = 0;

                return new IEnumerator(
                    function () { enumerator = source.getEnumerator(); },
                    function () {
                        return (enumerator.moveNext())
                            ? this.yieldReturn(selector(enumerator.getCurrent(), index++))
                            : false;
                    },
                    function () { Utils.dispose(enumerator); });
            });
        }
    };

    // Overload:function (collectionSelector<element>)
    // Overload:function (collectionSelector<element,index>)
    // Overload:function (collectionSelector<element>,resultSelector)
    // Overload:function (collectionSelector<element,index>,resultSelector)
    Enumerable.prototype.selectMany = function (collectionSelector, resultSelector) {
        var source = this;
        collectionSelector = Utils.createLambda(collectionSelector);
        if (resultSelector == null) resultSelector = function (a, b) { return b; };
        resultSelector = Utils.createLambda(resultSelector);

        return new Enumerable(function () {
            var enumerator;
            var middleEnumerator = undefined;
            var index = 0;

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    if (middleEnumerator === undefined) {
                        if (!enumerator.moveNext()) return false;
                    }
                    do {
                        if (middleEnumerator == null) {
                            var middleSeq = collectionSelector(enumerator.getCurrent(), index++);
                            middleEnumerator = Enumerable.from(middleSeq).getEnumerator();
                        }
                        if (middleEnumerator.moveNext()) {
                            return this.yieldReturn(resultSelector(enumerator.getCurrent(), middleEnumerator.getCurrent()));
                        }
                        Utils.dispose(middleEnumerator);
                        middleEnumerator = null;
                    } while (enumerator.moveNext());
                    return false;
                },
                function () {
                    try {
                        Utils.dispose(enumerator);
                    }
                    finally {
                        Utils.dispose(middleEnumerator);
                    }
                });
        });
    };

    // Overload:function (predicate<element>)
    // Overload:function (predicate<element,index>)
    Enumerable.prototype.where = function (predicate) {
        predicate = Utils.createLambda(predicate);

        if (predicate.length <= 1) {
            return new WhereEnumerable(this, predicate);
        }
        else {
            var source = this;

            return new Enumerable(function () {
                var enumerator;
                var index = 0;

                return new IEnumerator(
                    function () { enumerator = source.getEnumerator(); },
                    function () {
                        while (enumerator.moveNext()) {
                            if (predicate(enumerator.getCurrent(), index++)) {
                                return this.yieldReturn(enumerator.getCurrent());
                            }
                        }
                        return false;
                    },
                    function () { Utils.dispose(enumerator); });
            });
        }
    };


    // Overload:function (selector<element>)
    // Overload:function (selector<element,index>)
    Enumerable.prototype.choose = function (selector) {
        selector = Utils.createLambda(selector);
        var source = this;

        return new Enumerable(function () {
            var enumerator;
            var index = 0;

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    while (enumerator.moveNext()) {
                        var result = selector(enumerator.getCurrent(), index++);
                        if (result != null) {
                            return this.yieldReturn(result);
                        }
                    }
                    return this.yieldBreak();
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    Enumerable.prototype.ofType = function (type) {
        var source = this;

        return new Enumerable(function () {
            var enumerator;

            return new IEnumerator(
                function () {
					enumerator = Bridge.getEnumerator(source);
				},
                function () {
                    while (enumerator.moveNext()) {
                        var v = Bridge.as(enumerator.getCurrent(), type);
                        if (Bridge.hasValue(v)) {
                            return this.yieldReturn(v);
                        }
                    }
                    return false;
                },
                function () {
					Utils.dispose(enumerator);
				});
        });
    };

    // mutiple arguments, last one is selector, others are enumerable
    Enumerable.prototype.zip = function () {
        var args = arguments;
        var selector = Utils.createLambda(arguments[arguments.length - 1]);

        var source = this;
        // optimized case:argument is 2
        if (arguments.length == 2) {
            var second = arguments[0];

            return new Enumerable(function () {
                var firstEnumerator;
                var secondEnumerator;
                var index = 0;

                return new IEnumerator(
                function () {
                    firstEnumerator = source.getEnumerator();
                    secondEnumerator = Enumerable.from(second).getEnumerator();
                },
                function () {
                    if (firstEnumerator.moveNext() && secondEnumerator.moveNext()) {
                        return this.yieldReturn(selector(firstEnumerator.getCurrent(), secondEnumerator.getCurrent(), index++));
                    }
                    return false;
                },
                function () {
                    try {
                        Utils.dispose(firstEnumerator);
                    } finally {
                        Utils.dispose(secondEnumerator);
                    }
                });
            });
        }
        else {
            return new Enumerable(function () {
                var enumerators;
                var index = 0;

                return new IEnumerator(
                function () {
                    var array = Enumerable.make(source)
                        .concat(Enumerable.from(args).takeExceptLast().select(Enumerable.from))
                        .select(function (x) { return x.getEnumerator() })
                        .toArray();
                    enumerators = Enumerable.from(array);
                },
                function () {
                    if (enumerators.all(function (x) { return x.moveNext() })) {
                        var array = enumerators
                            .select(function (x) { return x.getCurrent() })
                            .toArray();
                        array.push(index++);
                        return this.yieldReturn(selector.apply(null, array));
                    }
                    else {
                        return this.yieldBreak();
                    }
                },
                function () {
                    Enumerable.from(enumerators).forEach(Utils.dispose);
                });
            });
        }
    };

    // mutiple arguments
    Enumerable.prototype.merge = function () {
        var args = arguments;
        var source = this;

        return new Enumerable(function () {
            var enumerators;
            var index = -1;

            return new IEnumerator(
                function () {
                    enumerators = Enumerable.make(source)
                        .concat(Enumerable.from(args).select(Enumerable.from))
                        .select(function (x) { return x.getEnumerator() })
                        .toArray();
                },
                function () {
                    while (enumerators.length > 0) {
                        index = (index >= enumerators.length - 1) ? 0 : index + 1;
                        var enumerator = enumerators[index];

                        if (enumerator.moveNext()) {
                            return this.yieldReturn(enumerator.getCurrent());
                        }
                        else {
                            enumerator.dispose();
                            enumerators.splice(index--, 1);
                        }
                    }
                    return this.yieldBreak();
                },
                function () {
                    Enumerable.from(enumerators).forEach(Utils.dispose);
                });
        });
    };

    /* Join Methods */

    // Overload:function (inner, outerKeySelector, innerKeySelector, resultSelector)
    // Overload:function (inner, outerKeySelector, innerKeySelector, resultSelector, compareSelector)
    Enumerable.prototype.join = function (inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        outerKeySelector = Utils.createLambda(outerKeySelector);
        innerKeySelector = Utils.createLambda(innerKeySelector);
        resultSelector = Utils.createLambda(resultSelector);

        var source = this;

        return new Enumerable(function () {
            var outerEnumerator;
            var lookup;
            var innerElements = null;
            var innerCount = 0;

            return new IEnumerator(
                function () {
                    outerEnumerator = source.getEnumerator();
                    lookup = Enumerable.from(inner).toLookup(innerKeySelector, Functions.Identity, comparer);
                },
                function () {
                    while (true) {
                        if (innerElements != null) {
                            var innerElement = innerElements[innerCount++];
                            if (innerElement !== undefined) {
                                return this.yieldReturn(resultSelector(outerEnumerator.getCurrent(), innerElement));
                            }

                            innerElement = null;
                            innerCount = 0;
                        }

                        if (outerEnumerator.moveNext()) {
                            var key = outerKeySelector(outerEnumerator.getCurrent());
                            innerElements = lookup.get(key).toArray();
                        } else {
                            return false;
                        }
                    }
                },
                function () { Utils.dispose(outerEnumerator); });
        });
    };

    // Overload:function (inner, outerKeySelector, innerKeySelector, resultSelector)
    // Overload:function (inner, outerKeySelector, innerKeySelector, resultSelector, compareSelector)
    Enumerable.prototype.groupJoin = function (inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        outerKeySelector = Utils.createLambda(outerKeySelector);
        innerKeySelector = Utils.createLambda(innerKeySelector);
        resultSelector = Utils.createLambda(resultSelector);
        var source = this;

        return new Enumerable(function () {
            var enumerator = source.getEnumerator();
            var lookup = null;

            return new IEnumerator(
                function () {
                    enumerator = source.getEnumerator();
                    lookup = Enumerable.from(inner).toLookup(innerKeySelector, Functions.Identity, comparer);
                },
                function () {
                    if (enumerator.moveNext()) {
                        var innerElement = lookup.get(outerKeySelector(enumerator.getCurrent()));
                        return this.yieldReturn(resultSelector(enumerator.getCurrent(), innerElement));
                    }
                    return false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    /* Set Methods */

    Enumerable.prototype.all = function (predicate) {
        predicate = Utils.createLambda(predicate);

        var result = true;
        this.forEach(function (x) {
            if (!predicate(x)) {
                result = false;
                return false; // break
            }
        });
        return result;
    };

    // Overload:function ()
    // Overload:function (predicate)
    Enumerable.prototype.any = function (predicate) {
        predicate = Utils.createLambda(predicate);

        var enumerator = this.getEnumerator();
        try {
            if (arguments.length == 0) return enumerator.moveNext(); // case:function ()

            while (enumerator.moveNext()) // case:function (predicate)
            {
                if (predicate(enumerator.getCurrent())) return true;
            }
            return false;
        }
        finally {
            Utils.dispose(enumerator);
        }
    };

    Enumerable.prototype.isEmpty = function () {
        return !this.any();
    };

    // multiple arguments
    Enumerable.prototype.concat = function () {
        var source = this;

        if (arguments.length == 1) {
            var second = arguments[0];

            return new Enumerable(function () {
                var firstEnumerator;
                var secondEnumerator;

                return new IEnumerator(
                function () { firstEnumerator = source.getEnumerator(); },
                function () {
                    if (secondEnumerator == null) {
                        if (firstEnumerator.moveNext()) return this.yieldReturn(firstEnumerator.getCurrent());
                        secondEnumerator = Enumerable.from(second).getEnumerator();
                    }
                    if (secondEnumerator.moveNext()) return this.yieldReturn(secondEnumerator.getCurrent());
                    return false;
                },
                function () {
                    try {
                        Utils.dispose(firstEnumerator);
                    }
                    finally {
                        Utils.dispose(secondEnumerator);
                    }
                });
            });
        }
        else {
            var args = arguments;

            return new Enumerable(function () {
                var enumerators;

                return new IEnumerator(
                    function () {
                        enumerators = Enumerable.make(source)
                            .concat(Enumerable.from(args).select(Enumerable.from))
                            .select(function (x) { return x.getEnumerator() })
                            .toArray();
                    },
                    function () {
                        while (enumerators.length > 0) {
                            var enumerator = enumerators[0];

                            if (enumerator.moveNext()) {
                                return this.yieldReturn(enumerator.getCurrent());
                            }
                            else {
                                enumerator.dispose();
                                enumerators.splice(0, 1);
                            }
                        }
                        return this.yieldBreak();
                    },
                    function () {
                        Enumerable.from(enumerators).forEach(Utils.dispose);
                    });
            });
        }
    };

    Enumerable.prototype.insert = function (index, second) {
        var source = this;

        return new Enumerable(function () {
            var firstEnumerator;
            var secondEnumerator;
            var count = 0;
            var isEnumerated = false;

            return new IEnumerator(
                function () {
                    firstEnumerator = source.getEnumerator();
                    secondEnumerator = Enumerable.from(second).getEnumerator();
                },
                function () {
                    if (count == index && secondEnumerator.moveNext()) {
                        isEnumerated = true;
                        return this.yieldReturn(secondEnumerator.getCurrent());
                    }
                    if (firstEnumerator.moveNext()) {
                        count++;
                        return this.yieldReturn(firstEnumerator.getCurrent());
                    }
                    if (!isEnumerated && secondEnumerator.moveNext()) {
                        return this.yieldReturn(secondEnumerator.getCurrent());
                    }
                    return false;
                },
                function () {
                    try {
                        Utils.dispose(firstEnumerator);
                    }
                    finally {
                        Utils.dispose(secondEnumerator);
                    }
                });
        });
    };

    Enumerable.prototype.alternate = function (alternateValueOrSequence) {
        var source = this;

        return new Enumerable(function () {
            var buffer;
            var enumerator;
            var alternateSequence;
            var alternateEnumerator;

            return new IEnumerator(
                function () {
                    if (alternateValueOrSequence instanceof Array || alternateValueOrSequence.getEnumerator != null) {
                        alternateSequence = Enumerable.from(Enumerable.from(alternateValueOrSequence).toArray()); // freeze
                    }
                    else {
                        alternateSequence = Enumerable.make(alternateValueOrSequence);
                    }
                    enumerator = source.getEnumerator();
                    if (enumerator.moveNext()) buffer = enumerator.getCurrent();
                },
                function () {
                    while (true) {
                        if (alternateEnumerator != null) {
                            if (alternateEnumerator.moveNext()) {
                                return this.yieldReturn(alternateEnumerator.getCurrent());
                            }
                            else {
                                alternateEnumerator = null;
                            }
                        }

                        if (buffer == null && enumerator.moveNext()) {
                            buffer = enumerator.getCurrent(); // hasNext
                            alternateEnumerator = alternateSequence.getEnumerator();
                            continue; // GOTO
                        }
                        else if (buffer != null) {
                            var retVal = buffer;
                            buffer = null;
                            return this.yieldReturn(retVal);
                        }

                        return this.yieldBreak();
                    }
                },
                function () {
                    try {
                        Utils.dispose(enumerator);
                    }
                    finally {
                        Utils.dispose(alternateEnumerator);
                    }
                });
        });
    };

    // Overload:function (value)
    // Overload:function (value, compareSelector)
    Enumerable.prototype.contains = function (value, comparer) {
        comparer = comparer || Bridge.EqualityComparer$1.$default;
        var enumerator = this.getEnumerator();
        try {
            while (enumerator.moveNext()) {
                if (comparer.equals(enumerator.getCurrent(), value)) return true;
            }
            return false;
        }
        finally {
            Utils.dispose(enumerator);
        }
    };

    Enumerable.prototype.defaultIfEmpty = function (defaultValue) {
        var source = this;
        if (defaultValue === undefined) defaultValue = null;

        return new Enumerable(function () {
            var enumerator;
            var isFirst = true;

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    if (enumerator.moveNext()) {
                        isFirst = false;
                        return this.yieldReturn(enumerator.getCurrent());
                    }
                    else if (isFirst) {
                        isFirst = false;
                        return this.yieldReturn(defaultValue);
                    }
                    return false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    // Overload:function ()
    // Overload:function (compareSelector)
    Enumerable.prototype.distinct = function (comparer) {
        return this.except(Enumerable.empty(), comparer);
    };

    Enumerable.prototype.distinctUntilChanged = function (compareSelector) {
        compareSelector = Utils.createLambda(compareSelector);
        var source = this;

        return new Enumerable(function () {
            var enumerator;
            var compareKey;
            var initial;

            return new IEnumerator(
                function () {
                    enumerator = source.getEnumerator();
                },
                function () {
                    while (enumerator.moveNext()) {
                        var key = compareSelector(enumerator.getCurrent());

                        if (initial) {
                            initial = false;
                            compareKey = key;
                            return this.yieldReturn(enumerator.getCurrent());
                        }

                        if (compareKey === key) {
                            continue;
                        }

                        compareKey = key;
                        return this.yieldReturn(enumerator.getCurrent());
                    }
                    return this.yieldBreak();
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    // Overload:function (second)
    // Overload:function (second, compareSelector)
    Enumerable.prototype.except = function (second, comparer) {
        var source = this;

        return new Enumerable(function () {
            var enumerator;
            var keys;

            return new IEnumerator(
                function () {
                    enumerator = source.getEnumerator();
                    keys = new Bridge.Dictionary$2(Object, Object)(null, comparer);
                    Enumerable.from(second).forEach(function (key) { keys.add(key); });
                },
                function () {
                    while (enumerator.moveNext()) {
                        var current = enumerator.getCurrent();
                        if (!keys.containsKey(current)) {
                            keys.add(current);
                            return this.yieldReturn(current);
                        }
                    }
                    return false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    // Overload:function (second)
    // Overload:function (second, compareSelector)
    Enumerable.prototype.intersect = function (second, comparer) {
        var source = this;

        return new Enumerable(function () {
            var enumerator;
            var keys;
            var outs;

            return new IEnumerator(
                function () {
                    enumerator = source.getEnumerator();

                    keys = new Bridge.Dictionary$2(Object, Object)(null, comparer);
                    Enumerable.from(second).forEach(function (key) { keys.add(key); });
                    outs = new Bridge.Dictionary$2(Object, Object)(null, comparer);
                },
                function () {
                    while (enumerator.moveNext()) {
                        var current = enumerator.getCurrent();
                        if (!outs.containsKey(current) && keys.containsKey(current)) {
                            outs.add(current);
                            return this.yieldReturn(current);
                        }
                    }
                    return false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    // Overload:function (second)
    // Overload:function (second, compareSelector)
    Enumerable.prototype.sequenceEqual = function (second, comparer) {
        comparer = comparer || Bridge.EqualityComparer$1.$default;

        var firstEnumerator = this.getEnumerator();
        try {
            var secondEnumerator = Enumerable.from(second).getEnumerator();
            try {
                while (firstEnumerator.moveNext()) {
                    if (!secondEnumerator.moveNext()
                    || !comparer.equals(firstEnumerator.getCurrent(), secondEnumerator.getCurrent())) {
                        return false;
                    }
                }

                if (secondEnumerator.moveNext()) return false;
                return true;
            }
            finally {
                Utils.dispose(secondEnumerator);
            }
        }
        finally {
            Utils.dispose(firstEnumerator);
        }
    };

    Enumerable.prototype.union = function (second, comparer) {
        var source = this;

        return new Enumerable(function () {
            var firstEnumerator;
            var secondEnumerator;
            var keys;

            return new IEnumerator(
                function () {
                    firstEnumerator = source.getEnumerator();
                    keys = new Bridge.Dictionary$2(Object, Object)(null, comparer);
                },
                function () {
                    var current;
                    if (secondEnumerator === undefined) {
                        while (firstEnumerator.moveNext()) {
                            current = firstEnumerator.getCurrent();
                            if (!keys.containsKey(current)) {
                                keys.add(current);
                                return this.yieldReturn(current);
                            }
                        }
                        secondEnumerator = Enumerable.from(second).getEnumerator();
                    }
                    while (secondEnumerator.moveNext()) {
                        current = secondEnumerator.getCurrent();
                        if (!keys.containsKey(current)) {
                            keys.add(current);
                            return this.yieldReturn(current);
                        }
                    }
                    return false;
                },
                function () {
                    try {
                        Utils.dispose(firstEnumerator);
                    }
                    finally {
                        Utils.dispose(secondEnumerator);
                    }
                });
        });
    };

    /* Ordering Methods */

    Enumerable.prototype.orderBy = function (keySelector, comparer) {
        return new OrderedEnumerable(this, keySelector, comparer, false);
    };

    Enumerable.prototype.orderByDescending = function (keySelector, comparer) {
        return new OrderedEnumerable(this, keySelector, comparer, true);
    };

    Enumerable.prototype.reverse = function () {
        var source = this;

        return new Enumerable(function () {
            var buffer;
            var index;

            return new IEnumerator(
                function () {
                    buffer = source.toArray();
                    index = buffer.length;
                },
                function () {
                    return (index > 0)
                        ? this.yieldReturn(buffer[--index])
                        : false;
                },
                Functions.Blank);
        });
    };

    Enumerable.prototype.shuffle = function () {
        var source = this;

        return new Enumerable(function () {
            var buffer;

            return new IEnumerator(
                function () { buffer = source.toArray(); },
                function () {
                    if (buffer.length > 0) {
                        var i = Math.floor(Math.random() * buffer.length);
                        return this.yieldReturn(buffer.splice(i, 1)[0]);
                    }
                    return false;
                },
                Functions.Blank);
        });
    };

    Enumerable.prototype.weightedSample = function (weightSelector) {
        weightSelector = Utils.createLambda(weightSelector);
        var source = this;

        return new Enumerable(function () {
            var sortedByBound;
            var totalWeight = 0;

            return new IEnumerator(
                function () {
                    sortedByBound = source
                        .choose(function (x) {
                            var weight = weightSelector(x);
                            if (weight <= 0) return null; // ignore 0

                            totalWeight += weight;
                            return { value: x, bound: totalWeight };
                        })
                        .toArray();
                },
                function () {
                    if (sortedByBound.length > 0) {
                        var draw = Math.floor(Math.random() * totalWeight) + 1;

                        var lower = -1;
                        var upper = sortedByBound.length;
                        while (upper - lower > 1) {
                            var index = Math.floor((lower + upper) / 2);
                            if (sortedByBound[index].bound >= draw) {
                                upper = index;
                            }
                            else {
                                lower = index;
                            }
                        }

                        return this.yieldReturn(sortedByBound[upper].value);
                    }

                    return this.yieldBreak();
                },
                Functions.Blank);
        });
    };

    /* Grouping Methods */

    // Overload:function (keySelector)
    // Overload:function (keySelector,elementSelector)
    // Overload:function (keySelector,elementSelector,resultSelector)
    // Overload:function (keySelector,elementSelector,resultSelector,compareSelector)
    Enumerable.prototype.groupBy = function (keySelector, elementSelector, resultSelector, comparer) {
        var source = this;
        keySelector = Utils.createLambda(keySelector);
        elementSelector = Utils.createLambda(elementSelector);
        if (resultSelector != null) resultSelector = Utils.createLambda(resultSelector);

        return new Enumerable(function () {
            var enumerator;

            return new IEnumerator(
                function () {
                    enumerator = source.toLookup(keySelector, elementSelector, comparer)
                        .toEnumerable()
                        .getEnumerator();
                },
                function () {
                    while (enumerator.moveNext()) {
                        return (resultSelector == null)
                            ? this.yieldReturn(enumerator.getCurrent())
                            : this.yieldReturn(resultSelector(enumerator.getCurrent().key(), enumerator.getCurrent()));
                    }
                    return false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    // Overload:function (keySelector)
    // Overload:function (keySelector,elementSelector)
    // Overload:function (keySelector,elementSelector,resultSelector)
    // Overload:function (keySelector,elementSelector,resultSelector,compareSelector)
    Enumerable.prototype.partitionBy = function (keySelector, elementSelector, resultSelector, comparer) {

        var source = this;
        keySelector = Utils.createLambda(keySelector);
        elementSelector = Utils.createLambda(elementSelector);
        comparer = comparer || Bridge.EqualityComparer$1.$default;
        var hasResultSelector;
        if (resultSelector == null) {
            hasResultSelector = false;
            resultSelector = function (key, group) { return new Grouping(key, group); };
        }
        else {
            hasResultSelector = true;
            resultSelector = Utils.createLambda(resultSelector);
        }

        return new Enumerable(function () {
            var enumerator;
            var key;
            var group = [];

            return new IEnumerator(
                function () {
                    enumerator = source.getEnumerator();
                    if (enumerator.moveNext()) {
                        key = keySelector(enumerator.getCurrent());
                        group.push(elementSelector(enumerator.getCurrent()));
                    }
                },
                function () {
                    var hasNext;
                    while ((hasNext = enumerator.moveNext()) == true) {
                        if (comparer.equals(key, keySelector(enumerator.getCurrent()))) {
                            group.push(elementSelector(enumerator.getCurrent()));
                        }
                        else break;
                    }

                    if (group.length > 0) {
                        var result = (hasResultSelector)
                            ? resultSelector(key, Enumerable.from(group))
                            : resultSelector(key, group);
                        if (hasNext) {
                            key = keySelector(enumerator.getCurrent());
                            group = [elementSelector(enumerator.getCurrent())];
                        }
                        else group = [];

                        return this.yieldReturn(result);
                    }

                    return false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    Enumerable.prototype.buffer = function (count) {
        var source = this;

        return new Enumerable(function () {
            var enumerator;

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    var array = [];
                    var index = 0;
                    while (enumerator.moveNext()) {
                        array.push(enumerator.getCurrent());
                        if (++index >= count) return this.yieldReturn(array);
                    }
                    if (array.length > 0) return this.yieldReturn(array);
                    return false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    /* Aggregate Methods */

    // Overload:function (func)
    // Overload:function (seed,func)
    // Overload:function (seed,func,resultSelector)
    Enumerable.prototype.aggregate = function (seed, func, resultSelector) {
        resultSelector = Utils.createLambda(resultSelector);
        return resultSelector(this.scan(seed, func, resultSelector).last());
    };

    // Overload:function ()
    // Overload:function (selector)
    Enumerable.prototype.average = function (selector) {
        selector = Utils.createLambda(selector);

        var sum = 0;
        var count = 0;
        this.forEach(function (x) {
            x = selector(x);

            if (x instanceof Bridge.Decimal || Bridge.Long.is64Bit(x)) {
                sum = x.add(sum);
            }
            else if (sum instanceof Bridge.Decimal || Bridge.Long.is64Bit(sum)) {
                sum = sum.add(x);
            } else {
                sum += x;
            }
            
            ++count;
        });

        return (sum instanceof Bridge.Decimal || Bridge.Long.is64Bit(sum)) ? sum.div(count) : (sum / count);
    };

    Enumerable.prototype.nullableAverage = function (selector) {
        if (this.any(Bridge.isNull)) {
            return null;
        }

        return this.average(selector);
    };

    // Overload:function ()
    // Overload:function (predicate)
    Enumerable.prototype.count = function (predicate) {
        predicate = (predicate == null) ? Functions.True : Utils.createLambda(predicate);

        var count = 0;
        this.forEach(function (x, i) {
            if (predicate(x, i))++count;
        });
        return count;
    };

    // Overload:function ()
    // Overload:function (selector)
    Enumerable.prototype.max = function (selector) {
        if (selector == null) selector = Functions.Identity;
        return this.select(selector).aggregate(function (a, b) {
            return (Bridge.compare(a, b, true) === 1) ? a : b;
        });
    };

    Enumerable.prototype.nullableMax = function (selector) {
        if (this.any(Bridge.isNull)) {
            return null;
        }

        return this.max(selector);
    };

    // Overload:function ()
    // Overload:function (selector)
    Enumerable.prototype.min = function (selector) {
        if (selector == null) selector = Functions.Identity;
        return this.select(selector).aggregate(function (a, b) {
            return (Bridge.compare(a, b, true) === -1) ? a : b;
        });
    };

    Enumerable.prototype.nullableMin = function (selector) {
        if (this.any(Bridge.isNull)) {
            return null;
        }

        return this.min(selector);
    };

    Enumerable.prototype.maxBy = function (keySelector) {
        keySelector = Utils.createLambda(keySelector);
        return this.aggregate(function (a, b) {
            return (Bridge.compare(keySelector(a), keySelector(b), true) === 1) ? a : b;
        });
    };

    Enumerable.prototype.minBy = function (keySelector) {
        keySelector = Utils.createLambda(keySelector);
        return this.aggregate(function (a, b) {
            return (Bridge.compare(keySelector(a), keySelector(b), true) === -1) ? a : b;
        });
    };

    // Overload:function ()
    // Overload:function (selector)
    Enumerable.prototype.sum = function (selector) {
        if (selector == null) selector = Functions.Identity;
        return this.select(selector).aggregate(0, function (a, b) {
             if (a instanceof Bridge.Decimal || Bridge.Long.is64Bit(a)) {
                 return a.add(b);
             }
             if (b instanceof Bridge.Decimal || Bridge.Long.is64Bit(b)) {
                 return b.add(a);
             }
             return a + b;
        });
    };

    Enumerable.prototype.nullableSum = function (selector) {
        if (this.any(Bridge.isNull)) {
            return null;
        }

        return this.sum(selector);
    };

    /* Paging Methods */

    Enumerable.prototype.elementAt = function (index) {
        var value;
        var found = false;
        this.forEach(function (x, i) {
            if (i == index) {
                value = x;
                found = true;
                return false;
            }
        });

        if (!found) throw new Error("index is less than 0 or greater than or equal to the number of elements in source.");
        return value;
    };

    Enumerable.prototype.elementAtOrDefault = function (index, defaultValue) {
        if (defaultValue === undefined) defaultValue = null;
        var value;
        var found = false;
        this.forEach(function (x, i) {
            if (i == index) {
                value = x;
                found = true;
                return false;
            }
        });

        return (!found) ? defaultValue : value;
    };

    // Overload:function ()
    // Overload:function (predicate)
    Enumerable.prototype.first = function (predicate) {
        if (predicate != null) return this.where(predicate).first();

        var value;
        var found = false;
        this.forEach(function (x) {
            value = x;
            found = true;
            return false;
        });

        if (!found) throw new Error("first:No element satisfies the condition.");
        return value;
    };

    Enumerable.prototype.firstOrDefault = function (predicate, defaultValue) {
        if (defaultValue === undefined) defaultValue = null;
        if (predicate != null) return this.where(predicate).firstOrDefault(null, defaultValue);

        var value;
        var found = false;
        this.forEach(function (x) {
            value = x;
            found = true;
            return false;
        });
        return (!found) ? defaultValue : value;
    };

    // Overload:function ()
    // Overload:function (predicate)
    Enumerable.prototype.last = function (predicate) {
        if (predicate != null) return this.where(predicate).last();

        var value;
        var found = false;
        this.forEach(function (x) {
            found = true;
            value = x;
        });

        if (!found) throw new Error("last:No element satisfies the condition.");
        return value;
    };

    // Overload:function (defaultValue)
    // Overload:function (defaultValue,predicate)
    Enumerable.prototype.lastOrDefault = function (predicate, defaultValue) {
        if (defaultValue === undefined) defaultValue = null;
        if (predicate != null) return this.where(predicate).lastOrDefault(null, defaultValue);

        var value;
        var found = false;
        this.forEach(function (x) {
            found = true;
            value = x;
        });
        return (!found) ? defaultValue : value;
    };

    // Overload:function ()
    // Overload:function (predicate)
    Enumerable.prototype.single = function (predicate) {
        if (predicate != null) return this.where(predicate).single();

        var value;
        var found = false;
        this.forEach(function (x) {
            if (!found) {
                found = true;
                value = x;
            } else throw new Error("single:sequence contains more than one element.");
        });

        if (!found) throw new Error("single:No element satisfies the condition.");
        return value;
    };

    // Overload:function (defaultValue)
    // Overload:function (defaultValue,predicate)
    Enumerable.prototype.singleOrDefault = function (predicate, defaultValue) {
        if (defaultValue === undefined) defaultValue = null;
        if (predicate != null) return this.where(predicate).singleOrDefault(null, defaultValue);

        var value;
        var found = false;
        this.forEach(function (x) {
            if (!found) {
                found = true;
                value = x;
            } else throw new Error("single:sequence contains more than one element.");
        });

        return (!found) ? defaultValue : value;
    };

    Enumerable.prototype.skip = function (count) {
        var source = this;

        return new Enumerable(function () {
            var enumerator;
            var index = 0;

            return new IEnumerator(
                function () {
                    enumerator = source.getEnumerator();
                    while (index++ < count && enumerator.moveNext()) {
                    }
                    ;
                },
                function () {
                    return (enumerator.moveNext())
                        ? this.yieldReturn(enumerator.getCurrent())
                        : false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    // Overload:function (predicate<element>)
    // Overload:function (predicate<element,index>)
    Enumerable.prototype.skipWhile = function (predicate) {
        predicate = Utils.createLambda(predicate);
        var source = this;

        return new Enumerable(function () {
            var enumerator;
            var index = 0;
            var isSkipEnd = false;

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    while (!isSkipEnd) {
                        if (enumerator.moveNext()) {
                            if (!predicate(enumerator.getCurrent(), index++)) {
                                isSkipEnd = true;
                                return this.yieldReturn(enumerator.getCurrent());
                            }
                            continue;
                        } else return false;
                    }

                    return (enumerator.moveNext())
                        ? this.yieldReturn(enumerator.getCurrent())
                        : false;

                },
                function () { Utils.dispose(enumerator); });
        });
    };

    Enumerable.prototype.take = function (count) {
        var source = this;

        return new Enumerable(function () {
            var enumerator;
            var index = 0;

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    return (index++ < count && enumerator.moveNext())
                        ? this.yieldReturn(enumerator.getCurrent())
                        : false;
                },
                function () { Utils.dispose(enumerator); }
            );
        });
    };

    // Overload:function (predicate<element>)
    // Overload:function (predicate<element,index>)
    Enumerable.prototype.takeWhile = function (predicate) {
        predicate = Utils.createLambda(predicate);
        var source = this;

        return new Enumerable(function () {
            var enumerator;
            var index = 0;

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    return (enumerator.moveNext() && predicate(enumerator.getCurrent(), index++))
                        ? this.yieldReturn(enumerator.getCurrent())
                        : false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    // Overload:function ()
    // Overload:function (count)
    Enumerable.prototype.takeExceptLast = function (count) {
        if (count == null) count = 1;
        var source = this;

        return new Enumerable(function () {
            if (count <= 0) return source.getEnumerator(); // do nothing

            var enumerator;
            var q = [];

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    while (enumerator.moveNext()) {
                        if (q.length == count) {
                            q.push(enumerator.getCurrent());
                            return this.yieldReturn(q.shift());
                        }
                        q.push(enumerator.getCurrent());
                    }
                    return false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    Enumerable.prototype.takeFromLast = function (count) {
        if (count <= 0 || count == null) return Enumerable.empty();
        var source = this;

        return new Enumerable(function () {
            var sourceEnumerator;
            var enumerator;
            var q = [];

            return new IEnumerator(
                function () { sourceEnumerator = source.getEnumerator(); },
                function () {
                    if (enumerator == null) {
	                    while (sourceEnumerator.moveNext()) {
	                        if (q.length == count) q.shift();
	                        q.push(sourceEnumerator.getCurrent());
	                    }
                        enumerator = Enumerable.from(q).getEnumerator();
                    }
                    return (enumerator.moveNext())
                        ? this.yieldReturn(enumerator.getCurrent())
                        : false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    // Overload:function (item)
    // Overload:function (predicate)
    Enumerable.prototype.indexOf = function (item, comparer) {
        var found = null;

        // item as predicate
        if (typeof (item) === Types.Function) {
            this.forEach(function (x, i) {
                if (item(x, i)) {
                    found = i;
                    return false;
                }
            });
        }
        else {
            comparer = comparer || Bridge.EqualityComparer$1.$default;
            this.forEach(function (x, i) {
                if (comparer.equals(x, item)) {
                    found = i;
                    return false;
                }
            });
        }

        return (found !== null) ? found : -1;
    };

    // Overload:function (item)
    // Overload:function (predicate)
    Enumerable.prototype.lastIndexOf = function (item, comparer) {
        var result = -1;

        // item as predicate
        if (typeof (item) === Types.Function) {
            this.forEach(function (x, i) {
                if (item(x, i)) result = i;
            });
        }
        else {
            comparer = comparer || Bridge.EqualityComparer$1.$default;
            this.forEach(function (x, i) {
                if (comparer.equals(x, item)) result = i;
            });
        }

        return result;
    };

    /* Convert Methods */


    Enumerable.prototype.asEnumerable = function () {
        return Enumerable.from(this);
    };

    Enumerable.prototype.toArray = function () {
        var array = [];
        this.forEach(function (x) { array.push(x); });
        return array;
    };

    Enumerable.prototype.toList = function (T) {
        var array = [];
        this.forEach(function (x) { array.push(x); });
        return new Bridge.List$1(T || Object)(array);
    };

    // Overload:function (keySelector)
    // Overload:function (keySelector, elementSelector)
    // Overload:function (keySelector, elementSelector, compareSelector)
    Enumerable.prototype.toLookup = function (keySelector, elementSelector, comparer) {
        keySelector = Utils.createLambda(keySelector);
        elementSelector = Utils.createLambda(elementSelector);

        var dict = new Bridge.Dictionary$2(Object, Object)(null, comparer);
        var order = [];
        this.forEach(function (x) {
            var key = keySelector(x);
            var element = elementSelector(x);

            var array = { v: null };
            if (dict.tryGetValue(key, array)) {
                array.v.push(element);
            }
            else {
                order.push(key);
                dict.add(key, [element]);
            }
        });
        return new Lookup(dict, order);
    };

    Enumerable.prototype.toObject = function (keySelector, elementSelector) {
        keySelector = Utils.createLambda(keySelector);
        elementSelector = Utils.createLambda(elementSelector);

        var obj = {};
        this.forEach(function (x) {
            obj[keySelector(x)] = elementSelector(x);
        });
        return obj;
    };

    // Overload:function (keySelector, elementSelector)
    // Overload:function (keySelector, elementSelector, compareSelector)
    Enumerable.prototype.toDictionary = function (keySelector, elementSelector, keyType, valueType, comparer) {
        keySelector = Utils.createLambda(keySelector);
        elementSelector = Utils.createLambda(elementSelector);

        var dict = new Bridge.Dictionary$2(keyType, valueType)(null, comparer);
        this.forEach(function (x) {
            dict.add(keySelector(x), elementSelector(x));
        });
        return dict;
    };

    // Overload:function ()
    // Overload:function (replacer)
    // Overload:function (replacer, space)
    Enumerable.prototype.toJSONString = function (replacer, space) {
        if (typeof JSON === Types.Undefined || JSON.stringify == null) {
            throw new Error("toJSONString can't find JSON.stringify. This works native JSON support Browser or include json2.js");
        }
        return JSON.stringify(this.toArray(), replacer, space);
    };

    // Overload:function ()
    // Overload:function (separator)
    // Overload:function (separator,selector)
    Enumerable.prototype.toJoinedString = function (separator, selector) {
        if (separator == null) separator = "";
        if (selector == null) selector = Functions.Identity;

        return this.select(selector).toArray().join(separator);
    };


    /* Action Methods */

    // Overload:function (action<element>)
    // Overload:function (action<element,index>)
    Enumerable.prototype.doAction = function (action) {
        var source = this;
        action = Utils.createLambda(action);

        return new Enumerable(function () {
            var enumerator;
            var index = 0;

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    if (enumerator.moveNext()) {
                        action(enumerator.getCurrent(), index++);
                        return this.yieldReturn(enumerator.getCurrent());
                    }
                    return false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    // Overload:function (action<element>)
    // Overload:function (action<element,index>)
    // Overload:function (func<element,bool>)
    // Overload:function (func<element,index,bool>)
    Enumerable.prototype.forEach = function (action) {
        action = Utils.createLambda(action);

        var index = 0;
        var enumerator = this.getEnumerator();
        try {
            while (enumerator.moveNext()) {
                if (action(enumerator.getCurrent(), index++) === false) break;
            }
        } finally {
            Utils.dispose(enumerator);
        }
    };

    // Overload:function ()
    // Overload:function (separator)
    // Overload:function (separator,selector)
    Enumerable.prototype.write = function (separator, selector) {
        if (separator == null) separator = "";
        selector = Utils.createLambda(selector);

        var isFirst = true;
        this.forEach(function (item) {
            if (isFirst) isFirst = false;
            else document.write(separator);
            document.write(selector(item));
        });
    };

    // Overload:function ()
    // Overload:function (selector)
    Enumerable.prototype.writeLine = function (selector) {
        selector = Utils.createLambda(selector);

        this.forEach(function (item) {
            document.writeln(selector(item) + "<br />");
        });
    };

    Enumerable.prototype.force = function () {
        var enumerator = this.getEnumerator();

        try {
            while (enumerator.moveNext()) {
            }
        }
        finally {
            Utils.dispose(enumerator);
        }
    };

    /* Functional Methods */

    Enumerable.prototype.letBind = function (func) {
        func = Utils.createLambda(func);
        var source = this;

        return new Enumerable(function () {
            var enumerator;

            return new IEnumerator(
                function () {
                    enumerator = Enumerable.from(func(source)).getEnumerator();
                },
                function () {
                    return (enumerator.moveNext())
                        ? this.yieldReturn(enumerator.getCurrent())
                        : false;
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    Enumerable.prototype.share = function () {
        var source = this;
        var sharedEnumerator;
        var disposed = false;

        return new DisposableEnumerable(function () {
            return new IEnumerator(
                function () {
                    if (sharedEnumerator == null) {
                        sharedEnumerator = source.getEnumerator();
                    }
                },
                function () {
                    if (disposed) throw new Error("enumerator is disposed");

                    return (sharedEnumerator.moveNext())
                        ? this.yieldReturn(sharedEnumerator.getCurrent())
                        : false;
                },
                Functions.Blank
            );
        }, function () {
            disposed = true;
            Utils.dispose(sharedEnumerator);
        });
    };

    Enumerable.prototype.memoize = function () {
        var source = this;
        var cache;
        var enumerator;
        var disposed = false;

        return new DisposableEnumerable(function () {
            var index = -1;

            return new IEnumerator(
                function () {
                    if (enumerator == null) {
                        enumerator = source.getEnumerator();
                        cache = [];
                    }
                },
                function () {
                    if (disposed) throw new Error("enumerator is disposed");

                    index++;
                    if (cache.length <= index) {
                        return (enumerator.moveNext())
                            ? this.yieldReturn(cache[index] = enumerator.getCurrent())
                            : false;
                    }

                    return this.yieldReturn(cache[index]);
                },
                Functions.Blank
            );
        }, function () {
            disposed = true;
            Utils.dispose(enumerator);
            cache = null;
        });
    };

    /* Error Handling Methods */

    Enumerable.prototype.catchError = function (handler) {
        handler = Utils.createLambda(handler);
        var source = this;

        return new Enumerable(function () {
            var enumerator;

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    try {
                        return (enumerator.moveNext())
                            ? this.yieldReturn(enumerator.getCurrent())
                            : false;
                    } catch (e) {
                        handler(e);
                        return false;
                    }
                },
                function () { Utils.dispose(enumerator); });
        });
    };

    Enumerable.prototype.finallyAction = function (finallyAction) {
        finallyAction = Utils.createLambda(finallyAction);
        var source = this;

        return new Enumerable(function () {
            var enumerator;

            return new IEnumerator(
                function () { enumerator = source.getEnumerator(); },
                function () {
                    return (enumerator.moveNext())
                        ? this.yieldReturn(enumerator.getCurrent())
                        : false;
                },
                function () {
                    try {
                        Utils.dispose(enumerator);
                    } finally {
                        finallyAction();
                    }
                });
        });
    };

    /* For Debug Methods */

    // Overload:function ()
    // Overload:function (selector)
    Enumerable.prototype.log = function (selector) {
        selector = Utils.createLambda(selector);

        return this.doAction(function (item) {
            if (typeof console !== Types.Undefined) {
                console.log(selector(item));
            }
        });
    };

    // Overload:function ()
    // Overload:function (message)
    // Overload:function (message,selector)
    Enumerable.prototype.trace = function (message, selector) {
        if (message == null) message = "Trace";
        selector = Utils.createLambda(selector);

        return this.doAction(function (item) {
            if (typeof console !== Types.Undefined) {
                console.log(message, selector(item));
            }
        });
    };

    // private

    var OrderedEnumerable = function (source, keySelector, comparer, descending, parent) {
        this.source = source;
        this.keySelector = Utils.createLambda(keySelector);
        this.comparer = comparer || Bridge.Comparer$1.$default;
        this.descending = descending;
        this.parent = parent;
    };
    OrderedEnumerable.prototype = new Enumerable();

    OrderedEnumerable.prototype.createOrderedEnumerable = function (keySelector, comparer, descending) {
        return new OrderedEnumerable(this.source, keySelector, comparer, descending, this);
    };

    OrderedEnumerable.prototype.thenBy = function (keySelector, comparer) {
        return this.createOrderedEnumerable(keySelector, comparer, false);
    };

    OrderedEnumerable.prototype.thenByDescending = function (keySelector, comparer) {
        return this.createOrderedEnumerable(keySelector, comparer, true);
    };

    OrderedEnumerable.prototype.getEnumerator = function () {
        var self = this;
        var buffer;
        var indexes;
        var index = 0;

        return new IEnumerator(
            function () {
                buffer = [];
                indexes = [];
                self.source.forEach(function (item, index) {
                    buffer.push(item);
                    indexes.push(index);
                });
                var sortContext = SortContext.create(self, null);
                sortContext.GenerateKeys(buffer);

                indexes.sort(function (a, b) { return sortContext.compare(a, b); });
            },
            function () {
                return (index < indexes.length)
                    ? this.yieldReturn(buffer[indexes[index++]])
                    : false;
            },
            Functions.Blank
        );
    };

    var SortContext = function (keySelector, comparer, descending, child) {
        this.keySelector = keySelector;
        this.comparer = comparer;
        this.descending = descending;
        this.child = child;
        this.keys = null;
    };

    SortContext.create = function (orderedEnumerable, currentContext) {
        var context = new SortContext(orderedEnumerable.keySelector, orderedEnumerable.comparer, orderedEnumerable.descending, currentContext);
        if (orderedEnumerable.parent != null) return SortContext.create(orderedEnumerable.parent, context);
        return context;
    };

    SortContext.prototype.GenerateKeys = function (source) {
        var len = source.length;
        var keySelector = this.keySelector;
        var keys = new Array(len);
        for (var i = 0; i < len; i++) keys[i] = keySelector(source[i]);
        this.keys = keys;

        if (this.child != null) this.child.GenerateKeys(source);
    };

    SortContext.prototype.compare = function (index1, index2) {
        var comparison = this.comparer.compare(this.keys[index1], this.keys[index2]);

        if (comparison == 0) {
            if (this.child != null) return this.child.compare(index1, index2);
            return Utils.compare(index1, index2);
        }

        return (this.descending) ? -comparison : comparison;
    };

    var DisposableEnumerable = function (getEnumerator, dispose) {
        this.dispose = dispose;
        Enumerable.call(this, getEnumerator);
    };
    DisposableEnumerable.prototype = new Enumerable();

    // optimize array or arraylike object

    var ArrayEnumerable = function (source) {
        this.getSource = function () { return source; };
    };
    ArrayEnumerable.prototype = new Enumerable();

    ArrayEnumerable.prototype.any = function (predicate) {
        return (predicate == null)
            ? (this.getSource().length > 0)
            : Enumerable.prototype.any.apply(this, arguments);
    };

    ArrayEnumerable.prototype.count = function (predicate) {
        return (predicate == null)
            ? this.getSource().length
            : Enumerable.prototype.count.apply(this, arguments);
    };

    ArrayEnumerable.prototype.elementAt = function (index) {
        var source = this.getSource();
        return (0 <= index && index < source.length)
            ? source[index]
            : Enumerable.prototype.elementAt.apply(this, arguments);
    };

    ArrayEnumerable.prototype.elementAtOrDefault = function (index, defaultValue) {
        if (defaultValue === undefined) defaultValue = null;
        var source = this.getSource();
        return (0 <= index && index < source.length)
            ? source[index]
            : defaultValue;
    };

    ArrayEnumerable.prototype.first = function (predicate) {
        var source = this.getSource();
        return (predicate == null && source.length > 0)
            ? source[0]
            : Enumerable.prototype.first.apply(this, arguments);
    };

    ArrayEnumerable.prototype.firstOrDefault = function (predicate, defaultValue) {
        if (defaultValue === undefined) defaultValue = null;
        if (predicate != null) {
            return Enumerable.prototype.firstOrDefault.apply(this, arguments);
        }

        var source = this.getSource();
        return source.length > 0 ? source[0] : defaultValue;
    };

    ArrayEnumerable.prototype.last = function (predicate) {
        var source = this.getSource();
        return (predicate == null && source.length > 0)
            ? source[source.length - 1]
            : Enumerable.prototype.last.apply(this, arguments);
    };

    ArrayEnumerable.prototype.lastOrDefault = function (predicate, defaultValue) {
        if (defaultValue === undefined) defaultValue = null;
        if (predicate != null) {
            return Enumerable.prototype.lastOrDefault.apply(this, arguments);
        }

        var source = this.getSource();
        return source.length > 0 ? source[source.length - 1] : defaultValue;
    };

    ArrayEnumerable.prototype.skip = function (count) {
        var source = this.getSource();

        return new Enumerable(function () {
            var index;

            return new IEnumerator(
                function () { index = (count < 0) ? 0 : count; },
                function () {
                    return (index < source.length)
                        ? this.yieldReturn(source[index++])
                        : false;
                },
                Functions.Blank);
        });
    };

    ArrayEnumerable.prototype.takeExceptLast = function (count) {
        if (count == null) count = 1;
        return this.take(this.getSource().length - count);
    };

    ArrayEnumerable.prototype.takeFromLast = function (count) {
        return this.skip(this.getSource().length - count);
    };

    ArrayEnumerable.prototype.reverse = function () {
        var source = this.getSource();

        return new Enumerable(function () {
            var index;

            return new IEnumerator(
                function () {
                    index = source.length;
                },
                function () {
                    return (index > 0)
                        ? this.yieldReturn(source[--index])
                        : false;
                },
                Functions.Blank);
        });
    };

    ArrayEnumerable.prototype.sequenceEqual = function (second, comparer) {
        if ((second instanceof ArrayEnumerable || second instanceof Array)
            && comparer == null
            && Enumerable.from(second).count() != this.count()) {
            return false;
        }

        return Enumerable.prototype.sequenceEqual.apply(this, arguments);
    };

    ArrayEnumerable.prototype.toJoinedString = function (separator, selector) {
        var source = this.getSource();
        if (selector != null || !(source instanceof Array)) {
            return Enumerable.prototype.toJoinedString.apply(this, arguments);
        }

        if (separator == null) separator = "";
        return source.join(separator);
    };

    ArrayEnumerable.prototype.getEnumerator = function () {
        return new Bridge.ArrayEnumerator(this.getSource());
    };

    // optimization for multiple where and multiple select and whereselect

    var WhereEnumerable = function (source, predicate) {
        this.prevSource = source;
        this.prevPredicate = predicate; // predicate.length always <= 1
    };
    WhereEnumerable.prototype = new Enumerable();

    WhereEnumerable.prototype.where = function (predicate) {
        predicate = Utils.createLambda(predicate);

        if (predicate.length <= 1) {
            var prevPredicate = this.prevPredicate;
            var composedPredicate = function (x) { return prevPredicate(x) && predicate(x); };
            return new WhereEnumerable(this.prevSource, composedPredicate);
        }
        else {
            // if predicate use index, can't compose
            return Enumerable.prototype.where.call(this, predicate);
        }
    };

    WhereEnumerable.prototype.select = function (selector) {
        selector = Utils.createLambda(selector);

        return (selector.length <= 1)
            ? new WhereSelectEnumerable(this.prevSource, this.prevPredicate, selector)
            : Enumerable.prototype.select.call(this, selector);
    };

    WhereEnumerable.prototype.getEnumerator = function () {
        var predicate = this.prevPredicate;
        var source = this.prevSource;
        var enumerator;

        return new IEnumerator(
            function () { enumerator = source.getEnumerator(); },
            function () {
                while (enumerator.moveNext()) {
                    if (predicate(enumerator.getCurrent())) {
                        return this.yieldReturn(enumerator.getCurrent());
                    }
                }
                return false;
            },
            function () { Utils.dispose(enumerator); });
    };

    var WhereSelectEnumerable = function (source, predicate, selector) {
        this.prevSource = source;
        this.prevPredicate = predicate; // predicate.length always <= 1 or null
        this.prevSelector = selector; // selector.length always <= 1
    };
    WhereSelectEnumerable.prototype = new Enumerable();

    WhereSelectEnumerable.prototype.where = function (predicate) {
        predicate = Utils.createLambda(predicate);

        return (predicate.length <= 1)
            ? new WhereEnumerable(this, predicate)
            : Enumerable.prototype.where.call(this, predicate);
    };

    WhereSelectEnumerable.prototype.select = function (selector) {
        selector = Utils.createLambda(selector);

        if (selector.length <= 1) {
            var prevSelector = this.prevSelector;
            var composedSelector = function (x) { return selector(prevSelector(x)); };
            return new WhereSelectEnumerable(this.prevSource, this.prevPredicate, composedSelector);
        }
        else {
            // if selector use index, can't compose
            return Enumerable.prototype.select.call(this, selector);
        }
    };

    WhereSelectEnumerable.prototype.getEnumerator = function () {
        var predicate = this.prevPredicate;
        var selector = this.prevSelector;
        var source = this.prevSource;
        var enumerator;

        return new IEnumerator(
            function () { enumerator = source.getEnumerator(); },
            function () {
                while (enumerator.moveNext()) {
                    if (predicate == null || predicate(enumerator.getCurrent())) {
                        return this.yieldReturn(selector(enumerator.getCurrent()));
                    }
                }
                return false;
            },
            function () { Utils.dispose(enumerator); });
    };

    // Collections

    // dictionary = Dictionary<TKey, TValue[]>
    var Lookup = function (dictionary, order) {
        this.count = function () {
            return dictionary.getCount();
        };
        this.get = function (key) {
            var value = { v: null };
            var success = dictionary.tryGetValue(key, value);
            return Enumerable.from(success ? value.v : []);
        };
        this.contains = function (key) {
            return dictionary.containsKey(key);
        };
        this.toEnumerable = function () {
            return Enumerable.from(order).select(function (key) {
                return new Grouping(key, dictionary.get(key));
            });
        };
        this.getEnumerator = function () {
            return this.toEnumerable().getEnumerator();
        };
    };
    
    Bridge.IEnumerable.$$inheritors = Bridge.IEnumerable.$$inheritors || [];
    Bridge.IEnumerable.$$inheritors.push(Lookup);

    var Grouping = function (groupKey, elements) {
        this.key = function () {
            return groupKey;
        };
        ArrayEnumerable.call(this, elements);
    };
    Grouping.prototype = new ArrayEnumerable();

    // module export
    if (typeof define === Types.Function && define.amd) { // AMD
        define("linqjs", [], function () { return Enumerable; });
    } else if (typeof module !== Types.Undefined && module.exports) { // Node
        module.exports = Enumerable;
    } else {
        root.Enumerable = Enumerable;
    }

    Bridge.Linq = {};
    Bridge.Linq.Enumerable = Enumerable;
})(Bridge.global);

// @source random.js

(function (globals) {
    "use strict";

    Bridge.define('Bridge.Random', {
        statics: {
            MBIG: 2147483647,
            MSEED: 161803398,
            MZ: 0
        },
        inext: 0,
        inextp: 0,
        seedArray: null,
        config: {
            init: function () {
                this.seedArray = Bridge.Array.init(56, 0);
            }
        },
        constructor: function () {
            Bridge.Random.prototype.constructor$1.call(this, Bridge.Long.clip32(Bridge.Long((new Date()).getTime()).mul(10000)));

        },
        constructor$1: function (Seed) {
            var ii;
            var mj, mk;

            //Initialize our Seed array.
            //This algorithm comes from Numerical Recipes in C (2nd Ed.)
            var subtraction = (Seed === -2147483648) ? 2147483647 : Math.abs(Seed);
            mj = (Bridge.Random.MSEED - subtraction) | 0;
            this.seedArray[55] = mj;
            mk = 1;
            for (var i = 1; i < 55; i = (i + 1) | 0) { //Apparently the range [1..55] is special (Knuth) and so we're wasting the 0'th position.
                ii = (((21 * i) | 0)) % 55;
                this.seedArray[ii] = mk;
                mk = (mj - mk) | 0;
                if (mk < 0) {
                    mk = (mk + Bridge.Random.MBIG) | 0;
                }
                mj = this.seedArray[ii];
            }
            for (var k = 1; k < 5; k = (k + 1) | 0) {
                for (var i1 = 1; i1 < 56; i1 = (i1 + 1) | 0) {
                    this.seedArray[i1] = (this.seedArray[i1] - this.seedArray[((1 + (((i1 + 30) | 0)) % 55) | 0)]) | 0;
                    if (this.seedArray[i1] < 0) {
                        this.seedArray[i1] = (this.seedArray[i1] + Bridge.Random.MBIG) | 0;
                    }
                }
            }
            this.inext = 0;
            this.inextp = 21;
            Seed = 1;
        },
        sample: function () {
            //Including this division at the end gives us significantly improved
            //random number distribution.
            return (this.internalSample() * (4.6566128752457969E-10));
        },
        internalSample: function () {
            var retVal;
            var locINext = this.inext;
            var locINextp = this.inextp;

            if (((locINext = (locINext + 1) | 0)) >= 56) {
                locINext = 1;
            }

            if (((locINextp = (locINextp + 1) | 0)) >= 56) {
                locINextp = 1;
            }

            retVal = (this.seedArray[locINext] - this.seedArray[locINextp]) | 0;

            if (retVal === Bridge.Random.MBIG) {
                retVal = (retVal - 1) | 0;
            }

            if (retVal < 0) {
                retVal = (retVal + Bridge.Random.MBIG) | 0;
            }

            this.seedArray[locINext] = retVal;

            this.inext = locINext;
            this.inextp = locINextp;

            return retVal;
        },
        next: function () {
            return this.internalSample();
        },
        next$2: function (minValue, maxValue) {
            if (minValue > maxValue) {
                throw new Bridge.ArgumentOutOfRangeException("minValue", "'minValue' cannot be greater than maxValue.");
            }

            var range = Bridge.Long(maxValue).sub(Bridge.Long(minValue));
            if (range.lte(Bridge.Long(2147483647))) {
                return (((Bridge.Int.clip32(this.sample() * Bridge.Long.toNumber(range)) + minValue) | 0));
            }
            else {
                return Bridge.Long.clip32(Bridge.Int.clip64(this.getSampleForLargeRange() * Bridge.Long.toNumber(range)).add(Bridge.Long(minValue)));
            }
        },
        next$1: function (maxValue) {
            if (maxValue < 0) {
                throw new Bridge.ArgumentOutOfRangeException("maxValue", "'maxValue' must be greater than zero.");
            }
            return Bridge.Int.clip32(this.sample() * maxValue);
        },
        getSampleForLargeRange: function () {
            // The distribution of double value returned by Sample 
            // is not distributed well enough for a large range.
            // If we use Sample for a range [Int32.MinValue..Int32.MaxValue)
            // We will end up getting even numbers only.

            var result = this.internalSample();
            // Note we can't use addition here. The distribution will be bad if we do that.
            var negative = (this.internalSample() % 2 === 0) ? true : false; // decide the sign based on second sample
            if (negative) {
                result = (-result) | 0;
            }
            var d = result;
            d += (2147483646); // get a number in range [0 .. 2 * Int32MaxValue - 1)
            d /= 4294967293;
            return d;
        },
        nextDouble: function () {
            return this.sample();
        },
        nextBytes: function (buffer) {
            if (buffer == null) {
                throw new Bridge.ArgumentNullException("buffer");
            }
            for (var i = 0; i < buffer.length; i = (i + 1) | 0) {
                buffer[i] = ((this.internalSample() % (256))) & 255;
            }
        }
    });

    Bridge.init();
})(this);

Bridge.define("Bridge.Guid", {
    inherits: function () {
        return [Bridge.IComparable$1(Bridge.Guid), Bridge.IEquatable$1(Bridge.Guid), Bridge.IFormattable];
    },

    statics: {
        $valid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ig,
		$split: /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
		empty: '00000000-0000-0000-0000-000000000000',

		config: {
		    init: function () {
		        this.$rng = new Bridge.Random();
		    }
		},

		instanceOf: function (instance) {
			return typeof(instance) === 'string' && instance.match(Bridge.Guid.$valid);
		},
		getDefaultValue: function() {
			return Bridge.Guid.empty;
		},
		parse: function(uuid, format) {
			var r = {};
			if (Bridge.Guid.tryParse(uuid, format, r)) {
			    return r.v;
			}
			throw new Bridge.FormatException('Unable to parse UUID');
		},
		tryParse: function (uuid, format, r) {
		    var m;
		    r.v = Bridge.Guid.empty;
			if (!Bridge.hasValue(uuid)) {
			    throw new Bridge.ArgumentNullException('uuid');
			} 
			    
			if (!format) {
				m = /^[{(]?([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})[)}]?$/ig.exec(uuid);
				if (m) {
					r.v = m.slice(1).join('-').toLowerCase();
					return true;
				}
			}
			else {
                format = format.toUpperCase();
				if (format === 'N') {
					m = Bridge.Guid.$split.exec(uuid);
					if (!m) {
					    return false;
					}
					uuid = m.slice(1).join('-');
				}
				else if (format === 'B' || format === 'P') {
					var b = format === 'B';
					if (uuid[0] !== (b ? '{' : '(') || uuid[uuid.length - 1] !== (b ? '}' : ')')) {
					    return false;
					}
						
					uuid = uuid.substr(1, uuid.length - 2);
				}
				if (uuid.match(Bridge.Guid.$valid)) {
					r.v = uuid.toLowerCase();
					return true;
				}
			}
			return false;
		},
		format: function(uuid, format) {
		    switch (format) {
		        case 'n': 
			    case 'N': 
			        return uuid.replace(/-/g, '');
		        case 'b': 
		        case 'B': 
		            return '{' + uuid + '}';
		        case 'p': 
		        case 'P': 
		            return '(' + uuid + ')';
		        default : 
		            return uuid;
			}
		},
		fromBytes: function(b) {
			if (!b || b.length !== 16) {
			    throw new Bridge.ArgumentException('b', 'Must be 16 bytes');
			}
				
			var s = b.map(function(x) { return Bridge.Int.format(x & 0xff, 'x2'); }).join('');
			return Bridge.Guid.$split.exec(s).slice(1).join('-');
		},
		newGuid: function () {
			var a = Array(16);
			Bridge.Guid.$rng.nextBytes(a);
			a[6] = a[6] & 0x0f | 0x40;
			a[8] = a[8] & 0xbf | 0x80;
			return Bridge.Guid.fromBytes(a);
		},
		getBytes: function(uuid) {
			var a = Array(16);
			var s = uuid.replace(/-/g, '');
			for (var i = 0; i < 16; i++) {
				a[i] = parseInt(s.substr(i * 2, 2), 16);
			}
			return a;
		}
    }
});

// @source Text/RegularExpressions/Regex.js

Bridge.define("Bridge.Text.RegularExpressions.Regex", {
    statics: {
        _cacheSize: 15,
        _defaultMatchTimeout: Bridge.TimeSpan.fromMilliseconds(-1),

        getCacheSize: function () {
            return Bridge.Text.RegularExpressions.Regex._cacheSize;
        },

        setCacheSize: function (value) {
            if (value < 0) {
                throw new Bridge.ArgumentOutOfRangeException("value");
            }

            Bridge.Text.RegularExpressions.Regex._cacheSize = value;
            //TODO: remove extra items from cache
        },

        escape: function (str) {
            if (str == null) {
                throw new Bridge.ArgumentNullException("str");
            }

            return Bridge.Text.RegularExpressions.RegexParser.escape(str);
        },

        unescape: function (str) {
            if (str == null) {
                throw new Bridge.ArgumentNullException("str");
            }

            return Bridge.Text.RegularExpressions.RegexParser.unescape(str);
        },

        isMatch: function (input, pattern) {
            var scope = Bridge.Text.RegularExpressions;
            return scope.Regex.isMatch$2(input, pattern, scope.RegexOptions.None, scope.Regex._defaultMatchTimeout);
        },

        isMatch$1: function (input, pattern, options) {
            var scope = Bridge.Text.RegularExpressions;
            return scope.Regex.isMatch$2(input, pattern, options, scope.Regex._defaultMatchTimeout);
        },

        isMatch$2: function (input, pattern, options, matchTimeout) {
            var regex = new Bridge.Text.RegularExpressions.Regex("constructor$3", pattern, options, matchTimeout, true);
            return regex.isMatch(input);
        },

        match: function (input, pattern) {
            var scope = Bridge.Text.RegularExpressions;
            return scope.Regex.match$2(input, pattern, scope.RegexOptions.None, scope.Regex._defaultMatchTimeout);
        },

        match$1: function (input, pattern, options) {
            var scope = Bridge.Text.RegularExpressions;
            return scope.Regex.match$2(input, pattern, options, scope.Regex._defaultMatchTimeout);
        },

        match$2: function (input, pattern, options, matchTimeout) {
            var regex = new Bridge.Text.RegularExpressions.Regex("constructor$3", pattern, options, matchTimeout, true);
            return regex.match(input);
        },

        matches: function (input, pattern) {
            var scope = Bridge.Text.RegularExpressions;
            return scope.Regex.matches$2(input, pattern, scope.RegexOptions.None, scope.Regex._defaultMatchTimeout);
        },

        matches$1: function (input, pattern, options) {
            var scope = Bridge.Text.RegularExpressions;
            return scope.Regex.matches$2(input, pattern, options, scope.Regex._defaultMatchTimeout);
        },

        matches$2: function (input, pattern, options, matchTimeout) {
            var regex = new Bridge.Text.RegularExpressions.Regex("constructor$3", pattern, options, matchTimeout, true);
            return regex.matches(input);
        },

        replace: function (input, pattern, replacement) {
            var scope = Bridge.Text.RegularExpressions;
            return scope.Regex.replace$2(input, pattern, replacement, scope.RegexOptions.None, scope.Regex._defaultMatchTimeout);
        },

        replace$1: function (input, pattern, replacement, options) {
            var scope = Bridge.Text.RegularExpressions;
            return scope.Regex.replace$2(input, pattern, replacement, options, scope.Regex._defaultMatchTimeout);
        },

        replace$2: function (input, pattern, replacement, options, matchTimeout) {
            var regex = new Bridge.Text.RegularExpressions.Regex("constructor$3", pattern, options, matchTimeout, true);
            return regex.replace(input, replacement);
        },

        replace$3: function (input, pattern, evaluator) {
            var scope = Bridge.Text.RegularExpressions;
            return scope.Regex.replace$5(input, pattern, evaluator, scope.RegexOptions.None, scope.Regex._defaultMatchTimeout);
        },

        replace$4: function (input, pattern, evaluator, options) {
            var scope = Bridge.Text.RegularExpressions;
            return scope.Regex.replace$5(input, pattern, evaluator, options, scope.Regex._defaultMatchTimeout);
        },

        replace$5: function (input, pattern, evaluator, options, matchTimeout) {
            var regex = new Bridge.Text.RegularExpressions.Regex("constructor$3", pattern, options, matchTimeout, true);
            return regex.replace$3(input, evaluator);
        },

        split: function (input, pattern) {
            var scope = Bridge.Text.RegularExpressions;
            return scope.Regex.split$2(input, pattern, scope.RegexOptions.None, scope.Regex._defaultMatchTimeout);
        },

        split$1: function (input, pattern, options) {
            var scope = Bridge.Text.RegularExpressions;
            return scope.Regex.split$2(input, pattern, options, scope.Regex._defaultMatchTimeout);
        },

        split$2: function (input, pattern, options, matchTimeout) {
            var regex = new Bridge.Text.RegularExpressions.Regex("constructor$3", pattern, options, matchTimeout, true);
            return regex.split(input);
        }
    },

    _pattern: "",
    _matchTimeout: Bridge.TimeSpan.fromMilliseconds(-1),
    _runner: null,
    _caps: null,
    _capsize: 0,
    _capnames: null,
    _capslist: null,

    config: {
        init: function () {
            this._options = Bridge.Text.RegularExpressions.RegexOptions.None;
        }
    },

    constructor: function (pattern) {
        this.constructor$1(pattern, Bridge.Text.RegularExpressions.RegexOptions.None);
    },

    constructor$1: function (pattern, options) {
        this.constructor$2(pattern, options, Bridge.TimeSpan.fromMilliseconds(-1));
    },

    constructor$2: function (pattern, options, matchTimeout) {
        this.constructor$3(pattern, options, matchTimeout, false);
    },

    constructor$3: function (pattern, options, matchTimeout, useCache) {
        var scope = Bridge.Text.RegularExpressions;

        if (pattern == null) {
            throw new Bridge.ArgumentNullException("pattern");
        }

        if (options < scope.RegexOptions.None || ((options >> 10) !== 0)) {
            throw new Bridge.ArgumentOutOfRangeException("options");
        }

        if (((options & scope.RegexOptions.ECMAScript) !== 0)
            && ((options & ~(scope.RegexOptions.ECMAScript |
                    scope.RegexOptions.IgnoreCase |
                    scope.RegexOptions.Multiline |
                    scope.RegexOptions.CultureInvariant
            )) !== 0)) {
            throw new Bridge.ArgumentOutOfRangeException("options");
        }

        // Check if the specified options are supported.
        var supportedOptions = Bridge.Text.RegularExpressions.RegexOptions.IgnoreCase | Bridge.Text.RegularExpressions.RegexOptions.Multiline;

        if ((options | supportedOptions) !== supportedOptions) {
            throw new Bridge.NotSupportedException("Specified Regex options are not supported.");
        }

        this._validateMatchTimeout(matchTimeout);

        this._pattern = pattern;
        this._options = options;
        this._matchTimeout = matchTimeout;
        this._runner = new scope.RegexRunner();

        //TODO: cache
        var groupInfos = Bridge.Text.RegularExpressions.RegexNetEngine.parsePatternGroups(this._pattern);

        this._capsize = groupInfos.length;
        this._capslist = [];
        this._capnames = {};

        this._capsize ++;
        this._capslist.push("0");
        this._capnames["0"] = 0;

        var i;
        var groupInfo;

        // Add group without names first (their names are indexes)
        for (i = 0; i < groupInfos.length; i++) {
            groupInfo = groupInfos[i];

            if (!groupInfo.hasName && !groupInfo.constructs.isNonCapturing) {
                this._capslist.push(groupInfo.name);
                this._capnames[groupInfo.name] = this._capslist.length - 1;
            }
        }

        // Then add named groups:
        for (i = 0; i < groupInfos.length; i++) {
            groupInfo = groupInfos[i];

            if (groupInfo.hasName) {
                this._capslist.push(groupInfo.name);
                this._capnames[groupInfo.name] = this._capslist.length - 1;
            }
        }
    },

    getMatchTimeout: function () {
        return this._matchTimeout;
    },

    getOptions: function () {
        return this._options;
    },

    getRightToLeft: function () {
        return (this._options & Bridge.Text.RegularExpressions.RegexOptions.RightToLeft) !== 0;
    },

    isMatch: function (input) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        var startat = this.getRightToLeft() ? input.length : 0;

        return this.isMatch$1(input, startat);
    },

    isMatch$1: function (input, startat) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }


        var match = this._runner.run(this, true, -1, input, 0, input.length, startat);

        return match == null;
    },

    match: function (input) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        var startat = this.getRightToLeft() ? input.length : 0;

        return this.match$1(input, startat);
    },

    match$1: function (input, startat) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        return this._runner.run(this, false, -1, input, 0, input.length, startat);
    },

    match$2: function (input, beginning, length) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        var startat = this.getRightToLeft() ? beginning + length : beginning;

        return this._runner.run(this, false, -1, input, beginning, length, startat);
    },

    matches: function (input) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        var startat = this.getRightToLeft() ? input.length : 0;

        return this.matches$1(input, startat);
    },

    matches$1: function (input, startat) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        return new Bridge.Text.RegularExpressions.MatchCollection(this, input, 0, input.length, startat);
    },

    getGroupNames: function () {
        if (this._capslist == null) {
            var invariantCulture = Bridge.CultureInfo.invariantCulture;

            var result = [];
            var max = this._capsize;

            for (var i = 0; i < max; i++) {
                result[i] = Bridge.Convert.toString(i, invariantCulture, Bridge.Convert.typeCodes.Int32);
            }

            return result;
        } else {
            return this._capslist.slice();
        }
    },

    getGroupNumbers: function () {
        var result;
        var caps = this._caps;
 
        if (caps == null) {
            result = [];
            var max = this._capsize;

            for (var i = 0; i < max; i++) {
                result.push(i);
            }
        } else {
            result = [];

            for (var key in caps) {
                if (caps.hasOwnProperty(key)) {
                    result[caps[key]] = key;
                }
            }
        }
 
        return result;
    },

    groupNameFromNumber: function (i) {

        if (this._capslist == null) {
            if (i >= 0 && i < this._capsize) {
                var invariantCulture = Bridge.CultureInfo.invariantCulture;

                return Bridge.Convert.toString(i, invariantCulture, Bridge.Convert.typeCodes.Int32);
            }

            return "";

        } else {
            if (this._caps != null) {
                var obj = this._caps[i];

                if (obj == null) {
                    return "";
                }

                return parseInt(obj);
            }

            if (i >= 0 && i < this._capslist.length) {
                return this._capslist[i];
            }

            return "";
        }
    },

    groupNumberFromName: function (name) {
        if (name == null) {
            throw new Bridge.ArgumentNullException("name");
        }

        // look up name if we have a hashtable of names
        if (this._capnames != null) {
            var ret = this._capnames[name];

            if (ret == null) {
                return -1;
            }

            return parseInt(ret);
        }

        // convert to an int if it looks like a number
        var result = 0;

        for (var i = 0; i < name.Length; i++) {
            var ch = name[i];

            if (ch > "9" || ch < "0") {
                return -1;
            }

            result *= 10;
            result += (ch - "0");
        }

        // return int if it's in range
        if (result >= 0 && result < this._capsize) {
            return result;
        }

        return -1;
    },

    replace: function (input, replacement) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        var startat = this.getRightToLeft() ? input.length : 0;

        return this.replace$2(input, replacement, -1, startat);
    },

    replace$1: function (input, replacement, count) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        var startat = this.getRightToLeft() ? input.length : 0;

        return this.replace$2(input, replacement, count, startat);
    },

    replace$2: function (input, replacement, count, startat) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        if (replacement == null) {
            throw new Bridge.ArgumentNullException("replacement");
        }

        var repl = Bridge.Text.RegularExpressions.RegexParser.parseReplacement(replacement, this._caps, this._capsize, this._capnames, this._options);
        //TODO: Cache

        return repl.replace(this, input, count, startat);
    },

    replace$3: function (input, evaluator) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        var startat = this.getRightToLeft() ? input.length : 0;
        return this.replace$5(input, evaluator, -1, startat);
    },

    replace$4: function (input, evaluator, count) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        var startat = this.getRightToLeft() ? input.length : 0;

        return this.replace$5(input, evaluator, count, startat);
    },

    replace$5: function (input, evaluator, count, startat) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        return Bridge.Text.RegularExpressions.RegexReplacement.replace(evaluator, this, input, count, startat);
    },

    split: function (input) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        var startat = this.getRightToLeft() ? input.length : 0;

        return this.split$2(input, 0, startat);
    },

    split$1: function (input, count) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        var startat = this.getRightToLeft() ? input.length : 0;

        return this.split$2(input, count, startat);
    },

    split$2: function (input, count, startat) {
        if (input == null) {
            throw new Bridge.ArgumentNullException("input");
        }

        return Bridge.Text.RegularExpressions.RegexReplacement.split(this, input, count, startat);
    },

    _validateMatchTimeout: function (matchTimeout) {
        var ms = matchTimeout.getTotalMilliseconds();

        if (-1 === ms) {
            return;
        }

        if (ms > 0 && ms <= 2147483646) {
            return;
        }
 
        throw new Bridge.ArgumentOutOfRangeException("matchTimeout");
    }
});

// @source Text/RegularExpressions/RegexCapture.js

Bridge.define("Bridge.Text.RegularExpressions.Capture", {
    _text: "",
    _index: 0,
    _length: 0,

    constructor: function (text, i, l) {
        this._text = text;
        this._index = i;
        this._length = l;
    },

    getIndex: function () {
        return this._index;
    },

    getLength: function () {
        return this._length;
    },

    getValue: function () {
        return this._text.substr(this._index, this._length);
    },

    toString: function () {
        return this.getValue();
    },

    _getOriginalString: function () {
        return this._text;
    },

    _getLeftSubstring: function () {
        return this._text.slice(0, _index);
    },

    _getRightSubstring: function () {
        return this._text.slice(this._index + this._length, this._text.length);
    }
});

// @source Text/RegularExpressions/RegexCaptureCollection.js

Bridge.define("Bridge.Text.RegularExpressions.CaptureCollection", {
    inherits: function () {
        return [Bridge.ICollection];
    },

    _group: null,
    _capcount: 0,
    _captures: null,

    constructor: function (group) {
        this._group = group;
        this._capcount = group._capcount;
    },

    getSyncRoot: function () {
        return this._group;
    },

    getIsSynchronized: function () {
        return false;
    },

    getIsReadOnly: function () {
        return true;
    },

    getCount: function () {
        return this._capcount;
    },

    get: function (i) {
        if (i === this._capcount - 1 && i >= 0) {
            return this._group;
        }

        if (i >= this._capcount || i < 0) {
            throw new Bridge.ArgumentOutOfRangeException("i");
        }

        this._ensureCapturesInited();

        return this._captures[i];
    },

    copyTo: function (array, arrayIndex) {
        if (array == null) {
            throw new Bridge.ArgumentNullException("array");
        }

        if (array.length < arrayIndex + this._capcount) {
            throw new Bridge.IndexOutOfRangeException();
        }

        for (var i = arrayIndex, j = 0; j < this._capcount; i++, j++) {
            var capture = this.get(j);

            Bridge.Array.set(array, capture, [i]);
        }
    },

    getEnumerator: function () {
        return new Bridge.Text.RegularExpressions.CaptureEnumerator(this);
    },

    _ensureCapturesInited: function () {
        // first time a capture is accessed, compute them all
        if (this._captures == null) {
            var captures = [];
            captures.length = this._capcount;

            for (var j = 0; j < this._capcount - 1; j++) {
                var index = this._group._caps[j * 2];
                var length = this._group._caps[j * 2 + 1];

                captures[j] = new Bridge.Text.RegularExpressions.Capture(this._group._text, index, length);
            }

            if (this._capcount > 0) {
                captures[this._capcount - 1] = this._group;
            }

            this._captures = captures;
        }
    }
});

Bridge.define("Bridge.Text.RegularExpressions.CaptureEnumerator", {
    inherits: function () {
        return [Bridge.IEnumerator];
    },

    _captureColl: null,
    _curindex: 0,

    constructor: function (captureColl) {
        this._curindex = -1;
        this._captureColl = captureColl;
    },

    moveNext: function () {
        var size = this._captureColl.getCount();

        if (this._curindex >= size) {
            return false;
        }

        this._curindex++;
        return (this._curindex < size);
    },

    getCurrent: function () {
        return this.getCapture();
    },

    getCapture: function () {
        if (this._curindex < 0 || this._curindex >= this._captureColl.getCount()) {
            throw new Bridge.InvalidOperationException("Enumeration has either not started or has already finished.");
        }

        return this._captureColl.get(this._curindex);
    },

    reset: function () {
        this._curindex = -1;
    }
});

// @source Text/RegularExpressions/RegexGroup.js

Bridge.define("Bridge.Text.RegularExpressions.Group", {
    inherits: function () {
        return [Bridge.Text.RegularExpressions.Capture];
    },

    statics: {
        config: {
            init: function () {
                var empty = new Bridge.Text.RegularExpressions.Group("", [], 0);

                this.getEmpty = function () {
                    return empty;
                }
            }
        },

        synchronized: function (group) {
            if (group == null) {
                throw new Bridge.ArgumentNullException("group");
            }

            // force Captures to be computed.
            var captures = group.getCaptures();

            if (captures.getCount() > 0) {
                captures.get(0);
            }

            return group;
        }
    },

    _caps: null,
    _capcount: 0,
    _capColl: null,

    constructor: function (text, caps, capcount) {
        var scope = Bridge.Text.RegularExpressions;
        var index = capcount === 0 ? 0 : caps[(capcount - 1) * 2];
        var length = capcount === 0 ? 0 : caps[(capcount * 2) - 1];

        scope.Capture.prototype.$constructor.call(this, text, index, length);

        this._caps = caps;
        this._capcount = capcount;
    },

    getSuccess: function () {
        return this._capcount !== 0;
    },

    getCaptures: function () {
        if (this._capColl == null) {
            this._capColl = new Bridge.Text.RegularExpressions.CaptureCollection(this);
        }

        return this._capColl;
    }
});

// @source Text/RegularExpressions/RegexGroupCollection.js

Bridge.define("Bridge.Text.RegularExpressions.GroupCollection", {
    inherits: function () {
        return [Bridge.ICollection];
    },

    _match: null,
    _captureMap: null,
    _groups: null,

    constructor: function (match, caps) {
        this._match = match;
        this._captureMap = caps;
    },

    getSyncRoot: function () {
        return this._match;
    },

    getIsSynchronized: function () {
        return false;
    },

    getIsReadOnly: function () {
        return true;
    },

    getCount: function () {
        return this._match._matchcount.length;
    },

    get: function (groupnum) {
        return this._getGroup(groupnum);
    },

    getByName: function (groupname) {
        if (this._match._regex == null) {
            return Bridge.Text.RegularExpressions.Group.getEmpty();
        }

        var groupnum = this._match._regex.groupNumberFromName(groupname);

        return this._getGroup(groupnum);
    },

    copyTo: function (array, arrayIndex) {
        if (array == null) {
            throw new Bridge.ArgumentNullException("array");
        }

        var count = this.getCount();

        if (array.length < arrayIndex + count) {
            throw new Bridge.IndexOutOfRangeException();
        }

        for (var i = arrayIndex, j = 0; j < count; i++, j++) {
            var group = this._getGroup(j);

            Bridge.Array.set(array, group, [i]);
        }
    },

    getEnumerator: function () {
        return new Bridge.Text.RegularExpressions.GroupEnumerator(this);
    },

    _getGroup: function (groupnum) {
        var group;

        if (this._captureMap != null) {
            var num = this._captureMap[groupnum];

            if (num == null) {
                group = Bridge.Text.RegularExpressions.Group.getEmpty();
            } else {
                group = this._getGroupImpl(num);
            }
        }
        else {
            if (groupnum >= this._match._matchcount.length || groupnum < 0) {
                group = Bridge.Text.RegularExpressions.Group.getEmpty();
            } else {
                group = this._getGroupImpl(groupnum);
            }
        }

        return group;
    },

    _getGroupImpl: function (groupnum) {
        if (groupnum === 0) {
            return this._match;
        }

        this._ensureGroupsInited();

        return this._groups[groupnum];
    },

    _ensureGroupsInited: function () {
        // Construct all the Group objects the first time GetGroup is called
        if (this._groups == null) {
            var groups = [];

            groups.length = this._match._matchcount.length;

            if (groups.length > 0) {
                groups[0] = this._match;
            }

            for (var i = 0; i < groups.length-1; i++) {
                var matchText = this._match._text;
                var matchCaps = this._match._matches[i + 1];
                var matchCapcount = this._match._matchcount[i + 1];

                groups[i+1] = new Bridge.Text.RegularExpressions.Group(matchText, matchCaps, matchCapcount);
            }
            this._groups = groups;
        }
    }
});


Bridge.define("Bridge.Text.RegularExpressions.GroupEnumerator", {
    inherits: function () {
        return [Bridge.IEnumerator];
    },

    _groupColl: null,
    _curindex: 0,

    constructor: function (groupColl) {
        this._curindex = -1;
        this._groupColl = groupColl;
    },

    moveNext: function () {
        var size = this._groupColl.getCount();
 
        if (this._curindex >= size) {
            return false;
        }
 
        this._curindex++;

        return (this._curindex < size);
    },

    getCurrent: function () {
        return this.getCapture();
    },

    getCapture: function () {
        if (this._curindex < 0 || this._curindex >= this._groupColl.getCount()) {
            throw new Bridge.InvalidOperationException("Enumeration has either not started or has already finished.");
        }

        return this._groupColl.get(this._curindex);
    },

    reset: function () {
        this._curindex = -1;
    }
});

// @source Text/RegularExpressions/RegexMatch.js

Bridge.define("Bridge.Text.RegularExpressions.Match", {
    inherits: function () {
        return [Bridge.Text.RegularExpressions.Group];
    },

    statics: {
        config: {
            init: function () {
                var empty = new Bridge.Text.RegularExpressions.Match(null, 1, "", 0, 0, 0);

                this.getEmpty = function () {
                    return empty;
                }
            }
        },

        synchronized: function (match) {
            if (match == null) {
                throw new Bridge.ArgumentNullException("match");
            }

            // Populate all groups by looking at each one
            var groups = match.getGroups();
            var groupsCount = groups.getCount();

            for (var i = 0; i < groupsCount; i++) {
                var group = groups.get(i);

                Bridge.Text.RegularExpressions.Group.synchronized(group);
            }

            return match;
        }
    },

    _regex: null,
    _matchcount: null,
    _matches: null,
    _textbeg: 0,
    _textend: 0,
    _textstart: 0,
    _balancing: false,
    _groupColl: null,
    _textpos: 0,

    constructor: function (regex, capcount, text, begpos, len, startpos) {
        var scope = Bridge.Text.RegularExpressions;
        var caps = [0, 0];

        scope.Group.prototype.$constructor.call(this, text, caps, 0);

        this._regex = regex;

        this._matchcount = [];
        this._matchcount.length = capcount;

        for (var i = 0; i < capcount; i++) {
            this._matchcount[i] = 0;
        }

        this._matches = [];
        this._matches.length = capcount;
        this._matches[0] = caps;

        this._textbeg = begpos;
        this._textend = begpos + len;
        this._textstart = startpos;
        this._balancing = false;
    },

    getGroups: function () {
        if (this._groupColl == null) {
            this._groupColl = new Bridge.Text.RegularExpressions.GroupCollection(this, null);
        }

        return this._groupColl;
    },

    nextMatch: function () {
        if (this._regex == null) {
            return this;
        }

        return this._regex._runner.run(this._regex, false, this._length, this._text, this._textbeg, this._textend - this._textbeg, this._textpos);
    },

    result: function (replacement) {
        if (replacement == null) {
            throw new Bridge.ArgumentNullException("replacement");
        }
 
        if (this._regex == null) {
            throw new Bridge.NotSupportedException("Result cannot be called on a failed Match.");
        }

        var repl = Bridge.Text.RegularExpressions.RegexParser.parseReplacement(replacement, this._regex._caps, this._regex._capsize, this._regex._capnames, this._regex._options);
        //TODO: cache
 
        return repl.replacement(this);
    },

    _isMatched: function (cap) {
        return cap < this._matchcount.length && this._matchcount[cap] > 0 && this._matches[cap][this._matchcount[cap] * 2 - 1] !== (-3 + 1);
    },

    _addMatch: function (cap, start, len) {
        if (this._matches[cap] == null) {
            this._matches[cap] = new Array(2);
        }

        var capcount = this._matchcount[cap];

        if (capcount * 2 + 2 > this._matches[cap].length) {
            var oldmatches = this._matches[cap];
            var newmatches = new Array(capcount * 8);

            for (var j = 0; j < capcount * 2; j++) {
                newmatches[j] = oldmatches[j];
            }

            this._matches[cap] = newmatches;
        }

        this._matches[cap][capcount * 2] = start;
        this._matches[cap][capcount * 2 + 1] = len;
        this._matchcount[cap] = capcount + 1;
    },

    _tidy: function (textpos) {
        var interval = this._matches[0];
        this._index = interval[0];
        this._length = interval[1];
        this._textpos = textpos;
        this._capcount = this._matchcount[0];

        if (this._balancing) {

            //TODO: balancing

            // The idea here is that we want to compact all of our unbalanced captures.  To do that we
            // use j basically as a count of how many unbalanced captures we have at any given time 
            // (really j is an index, but j/2 is the count).  First we skip past all of the real captures
            // until we find a balance captures.  Then we check each subsequent entry.  If it's a balance
            // capture (it's negative), we decrement j.  If it's a real capture, we increment j and copy 
            // it down to the last free position. 
            for (var cap = 0; cap < this._matchcount.length; cap++) {

                var limit = this._matchcount[cap] * 2;
                var matcharray = this._matches[cap];
                var i;
                var j;

                for (i = 0; i < limit; i++) {
                    if (matcharray[i] < 0) {
                        break;
                    }
                }

                for (j = i; i < limit; i++) {
                    if (matcharray[i] < 0) {
                        // skip negative values
                        j--;
                    } else {
                        // but if we find something positive (an actual capture), copy it back to the last 
                        // unbalanced position. 
                        if (i !== j) {
                            matcharray[j] = matcharray[i];
                        }
                        j++;
                    }
                }

                this._matchcount[cap] = j / 2;
            }

            this._balancing = false;
        }
    },

    _groupToStringImpl: function (groupnum) {
        var c = this._matchcount[groupnum];

        if (c === 0) {
            return "";
        }
 
        var matches = this._matches[groupnum];
        var capIndex = matches[(c - 1) * 2];
        var capLength = matches[(c * 2) - 1];

        return this._text.slice(capIndex, capIndex + capLength);
    },

    _lastGroupToStringImpl: function () {
        return this._groupToStringImpl(this._matchcount.length - 1);
    }
});

// @source Text/RegularExpressions/RegexMatchCollection.js

Bridge.define("Bridge.Text.RegularExpressions.MatchCollection", {
    inherits: function () {
        return [Bridge.ICollection];
    },

    _regex: null,
    _input: null,
    _beginning: 0,
    _length: 0,
    _startat: 0,
    _prevlen: 0,
    _matches: null,
    _done: false,

    constructor: function (regex, input, beginning, length, startat) {
        if (startat < 0 || startat > input.Length) {
            throw new Bridge.ArgumentOutOfRangeException("startat");
        }

        this._regex = regex;
        this._input = input;
        this._beginning = beginning;
        this._length = length;
        this._startat = startat;
        this._prevlen = -1;
        this._matches = [];
    },

    getCount: function () {
        if (!this._done) {
            this._getMatch(0x7FFFFFFF);
        }

        return this._matches.length;
    },

    getSyncRoot: function () {
        return this;
    },

    getIsSynchronized: function () {
        return false;
    },

    getIsReadOnly: function () {
        return true;
    },

    get: function (i) {
        var match = this._getMatch(i);

        if (match == null) {
            throw new Bridge.ArgumentOutOfRangeException("i");
        }

        return match;
    },

    copyTo: function (array, arrayIndex) {
        if (array == null) {
            throw new Bridge.ArgumentNullException("array");
        }

        var count = this.getCount();

        if (array.length < arrayIndex + count) {
            throw new Bridge.IndexOutOfRangeException();
        }

        for (var i = arrayIndex, j = 0; j < count; i++, j++) {
            var match = this._getMatch(j);

            Bridge.Array.set(array, match, [i]);
        }
    },

    getEnumerator: function () {
        return new Bridge.Text.RegularExpressions.MatchEnumerator(this);
    },

    _getMatch: function (i) {
        if (i < 0) {
            return null;
        }

        if (this._matches.length > i) {
            return this._matches[i];
        }

        if (this._done) {
            return null;
        }

        var match;

        do {
            match = this._regex._runner.run(this._regex, false, this._prevLen, this._input, this._beginning, this._length, this._startat);

            if (!match.getSuccess()) {
                this._done = true;
                return null;
            }

            this._matches.push(match);

            this._prevLen = match._length;
            this._startat = match._textpos;

        } while (this._matches.length <= i);

        return match;
    }
});

Bridge.define("Bridge.Text.RegularExpressions.MatchEnumerator", {
    inherits: function () {
        return [Bridge.IEnumerator];
    },

    _matchcoll: null,
    _match: null,
    _curindex: 0,
    _done: false,

    constructor: function (matchColl) {
        this._matchcoll = matchColl;
    },

    moveNext: function () {
        if (this._done) {
            return false;
        }
 
        this._match = this._matchcoll._getMatch(this._curindex);
        this._curindex ++;
 
        if (this._match == null) {
            this._done = true;

            return false;
        }
 
        return true;
    },

    getCurrent: function () {
        if (this._match == null) {
            throw new Bridge.InvalidOperationException("Enumeration has either not started or has already finished.");
        }

        return this._match;
    },

    reset: function () {
        this._curindex = 0;
        this._done = false;
        this._match = null;
    }
});

// @source Text/RegularExpressions/RegexOptions.js

Bridge.define("Bridge.Text.RegularExpressions.RegexOptions", {
    statics: {
        None: 0x0000,
        IgnoreCase: 0x0001,
        Multiline: 0x0002,
        ExplicitCapture: 0x0004,
        Compiled: 0x0008,
        Singleline: 0x0010,
        IgnorePatternWhitespace: 0x0020,
        RightToLeft: 0x0040,
        ECMAScript: 0x0100,
        CultureInvariant: 0x0200
    },

    $enum: true,
    $flags: true
});

// @source Text/RegularExpressions/RegexRunner.js

Bridge.define("Bridge.Text.RegularExpressions.RegexRunner", {
    statics: { },

    _runregex: null,
    _runtext: "", // text to search
    _runtextpos: 0, // current position in text

    _runtextbeg: 0, // beginning of text to search
    _runtextend: 0, // end of text to search
    _runtextstart: 0, // starting point for search
    _quick: false, // true value means IsMatch method call
    _prevlen: 0,

    constructor: function () {
    },

    run: function (regex, quick, prevlen, input, beginning, length, startat) {
        if (startat < 0 || startat > input.Length) {
            throw new Bridge.ArgumentOutOfRangeException("start", "Start index cannot be less than 0 or greater than input length.");
        }

        if (length < 0 || length > input.Length) {
            throw new ArgumentOutOfRangeException("length", "Length cannot be less than 0 or exceed input length.");
        }

        this._runregex = regex;
        this._runtext = input;
        this._runtextbeg = beginning;
        this._runtextend = beginning + length;
        this._runtextstart = startat;
        this._quick = quick;
        this._prevlen = prevlen;
        //TODO: internalMatchTimeout

        var stoppos;
        var bump;

        if (this._runregex.getRightToLeft()) {
            stoppos = this._runtextbeg;
            bump = -1;
        } else {
            stoppos = this._runtextend;
            bump = 1;
        }

        if (this._prevlen === 0) {
            if (this._runtextstart === stoppos) {
                return Bridge.Text.RegularExpressions.Match.getEmpty();
            }

            this._runtextstart += bump;
        }

        var options = regex.getOptions();
        var optionsEnum = Bridge.Text.RegularExpressions.RegexOptions;
        var isMultiline = (options & optionsEnum.Multiline) === optionsEnum.Multiline;
        var isCaseInsensitive = (options & optionsEnum.IgnoreCase) === optionsEnum.IgnoreCase;

        // Execute Regex:
        var timeoutMs = regex._matchTimeout.getTotalMilliseconds();
        var netEngine = new Bridge.Text.RegularExpressions.RegexNetEngine(regex._pattern, isMultiline, isCaseInsensitive, timeoutMs);
        var jsMatch = netEngine.match(this._runtext, this._runtextstart);

        // Convert the results:
        var result = this._convertNetEngineResults(jsMatch);
        return result;
    },

    _convertNetEngineResults: function (jsMatch) {
        //TODO: var stopPos = this._runregex.getRightToLeft() ? this._runtextbeg : this._runtextend;

        if (jsMatch.success && this._quick) {
            return null; // in quick mode, a successful match returns null
        }

        if (!jsMatch.success) {
            return Bridge.Text.RegularExpressions.Match.getEmpty();
        }

        var match = new Bridge.Text.RegularExpressions.Match(this._runregex, jsMatch.groups.length, this._runtext, 0, this._runtext.length, this._runtextstart);

        for (var i = 0; i < jsMatch.groups.length; i++) {
            var jsGroup = jsMatch.groups[i];

            for (var j = 0; j < jsGroup.captures.length; j++) {
                var jsCapture = jsGroup.captures[j];

                // Paste group index/length according to group ordering:
                var grOrder = 0;

                if (jsGroup.descriptor != null) {
                    grOrder = this._runregex.groupNumberFromName(jsGroup.descriptor.name);
                }

                match._addMatch(grOrder, jsCapture.capIndex, jsCapture.capLength);
            }
        }

        var textEndPos = jsMatch.capIndex + jsMatch.capLength;
        match._tidy(textEndPos);

        return match;
    }
});

// @source Text/RegularExpressions/RegexParser.js

Bridge.define("Bridge.Text.RegularExpressions.RegexParser", {
    statics: {

        _Q : 5,     // quantifier
        _S : 4,     // ordinary stoppper
        _Z : 3,     // ScanBlank stopper
        _X : 2,     // whitespace
        _E : 1,     // should be escaped

        _category: [
            //  0 1 2 3 4 5 6 7 8 9 A B C D E F 0 1 2 3 4 5 6 7 8 9 A B C D E F 
                0,0,0,0,0,0,0,0,0,2,2,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            //  ! " # $ % & ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; < = > ? 
                2,0,0,3,4,0,0,0,4,4,5,5,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,
            //  @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \ ] ^ _
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,4,0,
            //  ' a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ 
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,4,0,0,0],

        escape: function (input) {
            for (var i = 0; i < input.length; i++) {
                if (Bridge.Text.RegularExpressions.RegexParser._isMetachar(input[i])) {
                    var sb = "";
                    var ch = input[i];
                    var lastpos;

                    sb += input.slice(0, i);

                    do {
                        sb += "\\";

                        switch (ch) {
                            case "\n":
                                ch = "n";
                                break;
                            case "\r":
                                ch = "r";
                                break;
                            case "\t":
                                ch = "t";
                                break;
                            case "\f":
                                ch = "f";
                                break;
                        }

                        sb += ch;
                        i++;
                        lastpos = i;
 
                        while (i < input.length) {
                            ch = input[i];

                            if (Bridge.Text.RegularExpressions.RegexParser._isMetachar(ch)) {
                                break;
                            }
 
                            i++;
                        }
 
                        sb += input.slice(lastpos, i);
 
                    } while (i < input.length);
 
                    return sb;
                }
            }
 
            return input;
        },

        unescape: function (input) {
            for (var i = 0; i < input.length; i++) {
                if (input[i] === "\\") {
                    var sb = "";
                    var culture = Bridge.CultureInfo.invariantCulture;
                    var p = new Bridge.Text.RegularExpressions.RegexParser(culture);
                    var lastpos;

                    p._setPattern(input);
                    sb += input.slice(0, i);

                    do {
                        i++;

                        p._textto(i);

                        if (i < input.length) {
                            sb += p._scanCharEscape();
                        }

                        i = p._textpos();
                        lastpos = i;

                        while (i < input.length && input[i] !== "\\") {
                            i++;
                        }

                        sb += input.slice(lastpos, i);
 
                    } while (i < input.length);
 
                    return sb;
                }
            }
 
            return input;
        },

        parseReplacement: function (rep, caps, capsize, capnames, op) {
            var culture = Bridge.CultureInfo.getCurrentCulture(); // TODO: InvariantCulture
            var p = new Bridge.Text.RegularExpressions.RegexParser(culture);

            p._options = op;
            p._noteCaptures(caps, capsize, capnames);
            p._setPattern(rep);

            var root = p._scanReplacement();

            return new Bridge.Text.RegularExpressions.RegexReplacement(rep, root, caps);
        },

        _isMetachar: function (ch) {
            var code = ch.charCodeAt(0);

            return (code <= "|".charCodeAt(0) && Bridge.Text.RegularExpressions.RegexParser._category[code] >= Bridge.Text.RegularExpressions.RegexParser._E);
        }
    },

    _caps: null,
    _capsize: 0,
    _capnames: null,
    _pattern: "",
    _currentPos: 0,
    _concatenation: null,
    _culture: null,

    config: {
        init: function () {
            this._options = Bridge.Text.RegularExpressions.RegexOptions.None;
        }
    },

    constructor: function (culture) {
        this._culture = culture;
        this._caps = {};
    },

    _noteCaptures: function (caps, capsize, capnames) {
        this._caps = caps;
        this._capsize = capsize;
        this._capnames = capnames;
    },

    _setPattern: function (pattern) {
        if (pattern == null) {
            pattern = "";
        }

        this._pattern = pattern || "";
        this._currentPos = 0;
    },

    _scanReplacement: function () {
        this._concatenation = new Bridge.Text.RegularExpressions.RegexNode(Bridge.Text.RegularExpressions.RegexNode.Concatenate, this._options);

        while (true) {
            var c = this._charsRight();

            if (c === 0) {
                break;
            }

            var startpos = this._textpos();

            while (c > 0 && this._rightChar() !== "$") {
                this._moveRight();
                c--;
            }

            this._addConcatenate(startpos, this._textpos() - startpos);

            if (c > 0) {
                if (this._moveRightGetChar() === "$") {
                    var dollarNode = this._scanDollar();

                    this._concatenation.addChild(dollarNode);
                }
            }
        }

        return this._concatenation;
    },

    _addConcatenate: function (pos, cch/*, bool isReplacement*/) {
        if (cch === 0) {
            return;
        }

        var node;

        if (cch > 1) {
            var str = this._pattern.slice(pos, pos + cch);

            node = new Bridge.Text.RegularExpressions.RegexNode(Bridge.Text.RegularExpressions.RegexNode.Multi, this._options, str);
        } else {
            var ch = this._pattern[pos];

            node = new Bridge.Text.RegularExpressions.RegexNode(Bridge.Text.RegularExpressions.RegexNode.One, this._options, ch);
        }
 
        this._concatenation.addChild(node);
    },

    _useOptionE: function  () {
        return (this._options & Bridge.Text.RegularExpressions.RegexOptions.ECMAScript) !== 0;
    },

    _makeException: function (message) {
        return new Bridge.ArgumentException("Incorrect pattern. " + message);
    },

    _scanDollar: function () {
        var maxValueDiv10 = 214748364;  // Int32.MaxValue / 10;
        var maxValueMod10 = 7;          // Int32.MaxValue % 10;

        if (this._charsRight() === 0) {
            return new Bridge.Text.RegularExpressions.RegexNode(Bridge.Text.RegularExpressions.RegexNode.One, this._options, "$");
        }

        var ch = this._rightChar();
        var angled;
        var backpos = this._textpos();
        var lastEndPos = backpos;

        // Note angle
        if (ch === "{" && this._charsRight() > 1) {
            angled = true;
            this._moveRight();
            ch = this._rightChar();
        } else {
            angled = false;
        }

        // Try to parse backreference: \1 or \{1} or \{cap}

        var capnum;

        if (ch >= "0" && ch <= "9") {

            if (!angled && this._useOptionE()) {

                capnum = -1;
                var newcapnum = ch - "0";

                this._moveRight();

                if (this._isCaptureSlot(newcapnum)) {
                    capnum = newcapnum;
                    lastEndPos = this._textpos();
                }

                while (this._charsRight() > 0 && (ch = this._rightChar()) >= "0" && ch <= "9") {
                    var digit = ch - "0";

                    if (newcapnum > (maxValueDiv10) || (newcapnum === (maxValueDiv10) && digit > (maxValueMod10))) {
                        throw this._makeException("Capture group is out of range.");
                    }

                    newcapnum = newcapnum * 10 + digit;

                    this._moveRight();

                    if (this._isCaptureSlot(newcapnum)) {
                        capnum = newcapnum;
                        lastEndPos = this._textpos();
                    }
                }
                this._textto(lastEndPos);

                if (capnum >= 0) {
                    return new Bridge.Text.RegularExpressions.RegexNode(Bridge.Text.RegularExpressions.RegexNode.Ref, this._options, capnum);
                }
            }
            else {
                capnum = this._scanDecimal();
                if (!angled || this._charsRight() > 0 && this._moveRightGetChar() === "}") {
                    if (this._isCaptureSlot(capnum)) {
                        return new Bridge.Text.RegularExpressions.RegexNode(Bridge.Text.RegularExpressions.RegexNode.Ref, this._options, capnum);
                    }
                }
            }
        }
        else if (angled && this._isWordChar(ch)) {
            var capname = this._scanCapname();

            if (this._charsRight() > 0 && this._moveRightGetChar() === "}") {
                if (this._isCaptureName(capname)) {
                    var captureSlot = this._captureSlotFromName(capname);

                    return new Bridge.Text.RegularExpressions.RegexNode(Bridge.Text.RegularExpressions.RegexNode.Ref, this._options, captureSlot);
                }
            }
        }
        else if (!angled) {
            capnum = 1;

            switch (ch) {
                case "$":
                    this._moveRight();
                    return new Bridge.Text.RegularExpressions.RegexNode(Bridge.Text.RegularExpressions.RegexNode.One, this._options, "$");

                case "&":
                    capnum = 0;
                    break;

                case "`":
                    capnum = Bridge.Text.RegularExpressions.RegexReplacement.LeftPortion;
                    break;

                case "\'":
                    capnum = Bridge.Text.RegularExpressions.RegexReplacement.RightPortion;
                    break;

                case "+":
                    capnum = Bridge.Text.RegularExpressions.RegexReplacement.LastGroup;
                    break;

                case "_":
                    capnum = Bridge.Text.RegularExpressions.RegexReplacement.WholeString;
                    break;
            }

            if (capnum !== 1) {
                this._moveRight();

                return new Bridge.Text.RegularExpressions.RegexNode(Bridge.Text.RegularExpressions.RegexNode.Ref, this._options, capnum);
            }
        }

        // unrecognized $: literalize

        this._textto(backpos);

        return new Bridge.Text.RegularExpressions.RegexNode(Bridge.Text.RegularExpressions.RegexNode.One, this._options, "$");
    },

    _scanDecimal: function () {
        // Scans any number of decimal digits (pegs value at 2^31-1 if too large)

        var maxValueDiv10 = 214748364;  // Int32.MaxValue / 10;
        var maxValueMod10 = 7;          // Int32.MaxValue % 10;
        var i = 0;

        while (this._charsRight() > 0) {
            var ch = this._rightChar();

            if (ch < "0" || ch > "9") {
                break;
            }

            var d = ch - "0";

            this._moveRight();

            if (i > (maxValueDiv10) || (i === (maxValueDiv10) && d > (maxValueMod10))) {
                throw this._makeException("Capture group is out of range.");
            }

            i *= 10;
            i += d;
        }

        return i;
    },

    _scanOctal: function () {
        var d;
        var i;
        var c;
 
        // Consume octal chars only up to 3 digits and value 0377
 
        c = 3;
 
        if (c > this._charsRight()) {
            c = this._charsRight();
        }
 
        for (i = 0; c > 0 && (d = this._rightChar() - "0") <= 7; c -= 1) {
            this._moveRight();
            
            i *= 8;
            i += d;

            if (this._useOptionE() && i >= 0x20) {
                break;
            }
        }
 
        // Octal codes only go up to 255.  Any larger and the behavior that Perl follows
        // is simply to truncate the high bits. 
        i &= 0xFF;
            
        return i;
    },

    _scanHex: function (c) {
        var i;
        var d;
 
        i = 0;
 
        if (this._charsRight() >= c) {
            for (; c > 0 && ((d = this._hexDigit(this._moveRightGetChar())) >= 0) ; c -= 1) {
                i *= 0x10;
                i += d;
            }
        }
 
        if (c > 0) {
            throw this._makeException("Insufficient hexadecimal digits.");
        }
 
        return i;
    },

    _hexDigit: function (ch) {
        var d;

        var code = ch.charCodeAt(0);
 
        if ((d = code - "0".charCodeAt(0)) <= 9) {
            return d;
        }
 
        if ((d = code - "a".charCodeAt(0)) <= 5) {
            return d + 0xa;
        }
 
        if ((d = code - "A".charCodeAt(0)) <= 5) {
            return d + 0xa;
        }
 
        return -1;
    },

    _scanControl: function () {
        var ch;
 
        if (this._charsRight() <= 0) {
            throw this._makeException("Missing control character.");
        }
 
        ch = this._moveRightGetChar();
 
        // \ca interpreted as \cA

        var code = ch.charCodeAt(0);

        if (code >= "a".charCodeAt(0) && code <= "z".charCodeAt(0)) {
            code = code - ("a".charCodeAt(0) - "A".charCodeAt(0));
        }
 
        if ((code = (code - "@".charCodeAt(0))) < " ".charCodeAt(0)) {
            return String.fromCharCode(code);
        }
 
        throw this._makeException("Unrecognized control character.");
    },

    _scanCapname: function () {
        var startpos = this._textpos();
 
        while (this._charsRight() > 0) {
            if (!this._isWordChar(this._moveRightGetChar())) {
                this._moveLeft();

                break;
            }
        }
 
        return _pattern.slice(startpos, this._textpos());
    },

    _scanCharEscape: function () {
        var ch = this._moveRightGetChar();
 
        if (ch >= "0" && ch <= "7") {
            this._moveLeft();

            return this._scanOctal();
        }
 
        switch (ch) {
            case "x":
                return this._scanHex(2);
            case "u":
                return this._scanHex(4);
            case "a":
                return "\u0007";
            case "b":
                return "\b";
            case "e":
                return "\u001B";
            case "f":
                return "\f";
            case "n":
                return "\n";
            case "r":
                return "\r";
            case "t":
                return "\t";
            case "v":
                return "\u000B";
            case "c":
                return this._scanControl();
            default:
                if (!this._useOptionE() && this._isWordChar(ch)) {
                    throw this._makeException("Unrecognized escape sequence.");
                }

                return ch;
        }
    },

    _captureSlotFromName: function (capname) {
        return this._capnames[capname];
    },

    _isCaptureSlot: function (i) {
        if (this._caps != null) {
            return this._caps[i] != null;
        }

        return (i >= 0 && i < this._capsize);
    },

    _isCaptureName: function (capname) {
        if (this._capnames == null) {
            return false;
        }

        return _capnames[capname] != null;
    },

    _isWordChar: function (ch) {
        // Partial implementation, 
        // see the link for more details (http://referencesource.microsoft.com/#System/regex/system/text/regularexpressions/RegexParser.cs,1156)
        return Bridge.Char.isLetter(ch);
    },

    _charsRight: function () {
        return this._pattern.length - this._currentPos;
    },

    _rightChar: function () {
        return this._pattern[this._currentPos];
    },

    _moveRightGetChar: function () {
        return this._pattern[this._currentPos++];
    },

    _moveRight: function () {
        this._currentPos++;
    },

    _textpos: function () {
        return this._currentPos;
    },

    _textto: function (pos) {
        this._currentPos = pos;
    },

    _moveLeft: function () {
        this._currentPos--;
    }
});

// @source Text/RegularExpressions/RegexNode.js

Bridge.define("Bridge.Text.RegularExpressions.RegexNode", {
    statics: {
        One: 9,         // char     a
        Multi: 12,      // string   abcdef
        Ref: 13,        // index    \1
        Empty: 23,      //          ()
        Concatenate: 25 //          ab
    },

    _type: 0,
    _str: null,
    _children: null,
    _next: null,
    _m: 0,

    config: {
        init: function () {
            this._options = Bridge.Text.RegularExpressions.RegexOptions.None;
        }
    },

    constructor: function (type, options, arg) {
        this._type = type;
        this._options = options;

        if (type === Bridge.Text.RegularExpressions.RegexNode.Ref) {
            this._m = arg;
        } else {
            this._str = arg || null;
        }
    },

    addChild: function (newChild) {
        if (this._children == null) {
            this._children = [];
        }

        var reducedChild = newChild._reduce();
        this._children.push(reducedChild);
        reducedChild._next = this;
    },

    childCount: function () {
        return this._children == null ? 0 : this._children.length;
    },

    child: function (i) {
        return this._children[i];
    },

    _reduce: function () {
        // Warning: current implementation is just partial (for Replacement servicing)

        var n;

        switch (this._type) {
            case Bridge.Text.RegularExpressions.RegexNode.Concatenate:
                n = this._reduceConcatenation();
                break;
 
            default:
                n = this;
                break;
        }

        return n;
    },

    _reduceConcatenation: function () {
        var wasLastString = false;
        var optionsLast = 0;
        var optionsAt;
        var i;
        var j;
 
        if (this._children == null) {
            return new Bridge.Text.RegularExpression.RegexNode(Bridge.Text.RegularExpressions.RegexNode.Empty, this._options);
        }

        for (i = 0, j = 0; i < this._children.length; i++, j++) {
            var at;
            var prev;
 
            at = this._children[i];
 
            if (j < i) {
                this._children[j] = at;
            }

            if (at._type === Bridge.Text.RegularExpressions.RegexNode.Concatenate && at._isRightToLeft()) {
                for (var k = 0; k < at._children.length; k++) {
                    at._children[k]._next = this;
                }

                this._children.splice.apply(this._children, [i + 1, 0].concat(at._children)); // _children.InsertRange(i + 1, at._children);
                j--;

            } else if (at._type === Bridge.Text.RegularExpressions.RegexNode.Multi || at._type === Bridge.Text.RegularExpressions.RegexNode.One) {

                // Cannot merge strings if L or I options differ
                optionsAt = at._options & (Bridge.Text.RegularExpression.RegexOptions.RightToLeft | Bridge.Text.RegularExpression.RegexOptions.IgnoreCase);

                if (!wasLastString || optionsLast !== optionsAt) {
                    wasLastString = true;
                    optionsLast = optionsAt;
                    continue;
                }

                prev = this._children[--j];

                if (prev._type === Bridge.Text.RegularExpressions.RegexNode.One) {
                    prev._type = Bridge.Text.RegularExpressions.RegexNode.Multi;
                    prev._str = prev._str;
                }

                if ((optionsAt & Bridge.Text.RegularExpression.RegexOptions.RightToLeft) === 0) {
                    prev._str += at._str;
                } else {
                    prev._str = at._str + prev._str;
                }
            } else if (at._type === Bridge.Text.RegularExpressions.RegexNode.Empty) {
                j--;
            } else {
                wasLastString = false;
            }
        }
 
        if (j < i) {
            this._children.splice(j, i - j);
        }
 
        return this._stripEnation(Bridge.Text.RegularExpressions.RegexNode.Empty);
    },

    _stripEnation: function (emptyType) {
        switch (this.childCount()) {
            case 0:
                return new scope.RegexNode(emptyType, this._options);
            case 1:
                return this.child(0);
            default:
                return this;
        }
    },

    _isRightToLeft: function () {
        if ((this._options & Bridge.Text.RegularExpressions.RegexOptions.RightToLeft) > 0) {
            return true;
        }

        return false;
    },
});

// @source Text/RegularExpressions/RegexReplacement.js

Bridge.define("Bridge.Text.RegularExpressions.RegexReplacement", {
    statics: {
        replace: function (evaluator, regex, input, count, startat) {
            if (evaluator == null) {
                throw new Bridge.ArgumentNullException("evaluator");
            }

            if (count < -1) {
                throw new Bridge.ArgumentOutOfRangeException("count", "Count cannot be less than -1.");
            }

            if (startat < 0 || startat > input.length) {
                throw new Bridge.ArgumentOutOfRangeException("startat", "Start index cannot be less than 0 or greater than input length.");
            }

            if (count === 0) {
                return input;
            }

            var match = regex.match$1(input, startat);

            if (!match.getSuccess()) {
                return input;
            } else {
                var sb = "";
                var prevat;
                var matchIndex;
                var matchLength;

                if (!regex.getRightToLeft()) {
                    prevat = 0;

                    do {
                        matchIndex = match.getIndex();
                        matchLength = match.getLength();

                        if (matchIndex !== prevat) {
                            sb += input.slice(prevat, matchIndex);
                        }

                        prevat = matchIndex + matchLength;
                        sb += evaluator(match);

                        if (--count === 0) {
                            break;
                        }

                        match = match.nextMatch();
                    } while (match.getSuccess());

                    if (prevat < input.length) {
                        sb += input.slice(prevat, input.length);
                    }
                } else {
                    var al = [];

                    prevat = input.length;

                    do {
                        matchIndex = match.getIndex();
                        matchLength = match.getLength();

                        if (matchIndex + matchLength !== prevat) {
                            al.push(input.slice(matchIndex + matchLength, prevat));
                        }

                        prevat = matchIndex;
                        al.push(evaluator(match));

                        if (--count === 0) {
                            break;
                        }

                        match = match.nextMatch();
                    } while (match.getSuccess());

                    sb = new StringBuilder();

                    if (prevat > 0) {
                        sb += sb.slice(0, prevat);
                    }

                    for (var i = al.length - 1; i >= 0; i--) {
                        sb += al[i];
                    }
                }

                return sb;
            }
        },

        split: function (regex, input, count, startat) {
            if (count < 0) {
                throw new Bridge.ArgumentOutOfRangeException("count", "Count can't be less than 0.");
            }

            if (startat < 0 || startat > input.length) {
                throw new Bridge.ArgumentOutOfRangeException("startat", "Start index cannot be less than 0 or greater than input length.");
            }

            var result = [];

            if (count === 1) {
                result.push(input);

                return result;
            }

            --count;
            var match = regex.match$1(input, startat);

            if (!match.getSuccess()) {

                result.push(input);
            } else {

                var i;
                var prevat;
                var matchIndex;
                var matchLength;
                var matchGroups;
                var matchGroupsCount;

                if (!regex.getRightToLeft()) {
                    prevat = 0;

                    for (;;) {
                        matchIndex = match.getIndex();
                        matchLength = match.getLength();
                        matchGroups = match.getGroups();
                        matchGroupsCount = matchGroups.getCount();

                        result.push(input.slice(prevat, matchIndex));
                        prevat = matchIndex + matchLength;

                        // add all matched capture groups to the list.
                        for (i = 1; i < matchGroupsCount; i++) {
                            if (match._isMatched(i)) {
                                result.push(matchGroups.get(i).toString());
                            }
                        }

                        --count;
                        if (count === 0) {
                            break;
                        }

                        match = match.nextMatch();

                        if (!match.getSuccess()) {
                            break;
                        }
                    }

                    result.push(input.slice(prevat, input.length));

                } else {
                    prevat = input.length;

                    for (;;) {
                        matchIndex = match.getIndex();
                        matchLength = match.getLength();
                        matchGroups = match.getGroups();
                        matchGroupsCount = matchGroups.getCount();

                        result.push(input.slice(matchIndex + matchLength, prevat));
                        prevat = matchIndex;

                        // add all matched capture groups to the list.
                        for (i = 1; i < matchGroupsCount; i++) {
                            if (match._isMatched(i)) {
                                result.push(matchGroups.get(i).toString());
                            }
                        }

                        --count;
                        if (count === 0) {
                            break;
                        }

                        match = match.nextMatch();
                        if (!match.getSuccess()) {
                            break;
                        }
                    }

                    result.push(input.slice(0, prevat));
                    result.reverse();
                }
            }

            return result;
        },

        Specials: 4,
        LeftPortion: -1,
        RightPortion: -2,
        LastGroup: -3,
        WholeString: -4
    },

    _rep: "",
    _strings: [], // table of string constants
    _rules: [], // negative -> group #, positive -> string #

    constructor: function (rep, concat, caps) {
        this._rep = rep;

        if (concat._type !== Bridge.Text.RegularExpressions.RegexNode.Concatenate) {
            throw new Bridge.ArgumentException("Replacement error.");
        }

        var sb = "";
        var strings = [];
        var rules = [];
        var slot;

        for (var i = 0; i < concat.childCount(); i++) {
            var child = concat.child(i);

            switch (child._type) {
                case Bridge.Text.RegularExpressions.RegexNode.Multi:
                case Bridge.Text.RegularExpressions.RegexNode.One:
                    sb += child._str;
                    break;

                case Bridge.Text.RegularExpressions.RegexNode.Ref:
                    if (sb.length > 0) {
                        rules.push(strings.length);
                        strings.push(sb);
                        sb = "";
                    }

                    slot = child._m;

                    if (caps != null && slot >= 0) {
                        slot = caps[slot];
                    }

                    rules.push(-Bridge.Text.RegularExpressions.RegexReplacement.Specials - 1 - slot);
                    break;
                default:
                    throw new Bridge.ArgumentException("Replacement error.");
            }
        }

        if (sb.length > 0) {
            rules.push(strings.length);
            strings.push(sb);
        }

        this._strings = strings;
        this._rules = rules;
    },

    getPattern: function () {
        return _rep;
    },

    replacement: function (match) {
        return this._replacementImpl("", match);
    },

    replace: function (regex, input, count, startat) {
        if (count < -1) {
            throw new Bridge.ArgumentOutOfRangeException("count", "Count cannot be less than -1.");
        }
        if (startat < 0 || startat > input.length) {
            throw new Bridge.ArgumentOutOfRangeException("startat", "Start index cannot be less than 0 or greater than input length.");
        }

        if (count === 0) {
            return input;
        }

        var match = regex.match$1(input, startat);

        if (!match.getSuccess()) {
            return input;
        } else {
            var sb = "";
            var prevat;
            var matchIndex;
            var matchLength;

            if (!regex.getRightToLeft()) {
                prevat = 0;

                do {
                    matchIndex = match.getIndex();
                    matchLength = match.getLength();

                    if (matchIndex !== prevat) {
                        sb += input.slice(prevat, matchIndex);
                    }

                    prevat = matchIndex + matchLength;
                    sb = this._replacementImpl(sb, match);

                    if (--count === 0) {
                        break;
                    }

                    match = match.nextMatch();
                } while (match.getSuccess());

                if (prevat < input.length) {
                    sb += input.slice(prevat, input.length);
                }
            } else {
                var al = [];
                prevat = input.length;

                do {
                    matchIndex = match.getIndex();
                    matchLength = match.getLength();

                    if (matchIndex + matchLength !== prevat) {
                        al.push(input.slice(matchIndex + matchLength, prevat));
                    }

                    prevat = matchIndex;
                    this._replacementImplRTL(al, match);

                    if (--count === 0) {
                        break;
                    }

                    match = match.nextMatch();
                } while (match.getSuccess());

                if (prevat > 0) {
                    sb += sb.slice(0, prevat);
                }

                for (var i = al.length - 1; i >= 0; i--) {
                    sb += al[i];
                }
            }

            return sb;
        }
    },

    _replacementImpl: function (sb, match) {
        var specials = Bridge.Text.RegularExpressions.RegexReplacement.Specials;

        for (var i = 0; i < this._rules.length; i++) {
            var r = this._rules[i];

            if (r >= 0) {
                // string lookup
                sb += this._strings[r];

            } else if (r < -specials) {
                // group lookup
                sb += match._groupToStringImpl(-specials - 1 - r);

            } else {
                // special insertion patterns
                switch (-specials - 1 - r) {
                    case Bridge.Text.RegularExpressions.RegexReplacement.LeftPortion:
                        sb += match._getLeftSubstring();
                        break;
                    case Bridge.Text.RegularExpressions.RegexReplacement.RightPortion:
                        sb += match._getRightSubstring();
                        break;
                    case Bridge.Text.RegularExpressions.RegexReplacement.LastGroup:
                        sb += match._lastGroupToStringImpl();
                        break;
                    case Bridge.Text.RegularExpressions.RegexReplacement.WholeString:
                        sb += match._getOriginalString();
                        break;
                }
            }
        }

        return sb;
    },

    _replacementImplRTL: function (al, match) {
        var specials = Bridge.Text.RegularExpressions.RegexReplacement.Specials;

        for (var i = _rules.length - 1; i >= 0; i--) {
            var r = this._rules[i];

            if (r >= 0) {
                // string lookup
                al.push(this._strings[r]);

            } else if (r < -specials) {
                // group lookup
                al.push(match._groupToStringImpl(-specials - 1 - r));

            } else {
                // special insertion patterns
                switch (-specials - 1 - r) {
                    case Bridge.Text.RegularExpressions.RegexReplacement.LeftPortion:
                        al.push(match._getLeftSubstring());
                        break;
                    case Bridge.Text.RegularExpressions.RegexReplacement.RightPortion:
                        al.push(match._getRightSubstring());
                        break;
                    case Bridge.Text.RegularExpressions.RegexReplacement.LastGroup:
                        al.push(match._lastGroupToStringImpl());
                        break;
                    case Bridge.Text.RegularExpressions.RegexReplacement.WholeString:
                        al.push(match._getOriginalString());
                        break;
                }
            }
        }
    }
});

// @source Text/RegularExpressions/RegexNetEngine.js

Bridge.define("Bridge.Text.RegularExpressions.RegexNetEngine", {
    statics: {
        jsRegex: function (text, textStart, pattern, isMultiLine, isCaseInsensitive, returnAllMatches, re) {
            if (text == null) {
                throw new Bridge.ArgumentNullException("text");
            }

            if (textStart != null && (textStart < 0 || textStart > text.length)) {
                throw new Bridge.ArgumentOutOfRangeException("textStart", "Start index cannot be less than 0 or greater than input length.");
            }

            if (pattern == null) {
                throw new Bridge.ArgumentNullException("pattern");
            }

            var modifiers = "g"; // use "global" modifier by default to allow TextStart configuration

            if (isMultiLine) {
                modifiers += "m";
            }

            if (isCaseInsensitive) {
                modifiers += "i";
            }

            var jsRegExp = new RegExp(pattern, modifiers);

            if (textStart != null) {
                jsRegExp.lastIndex = textStart;
            }

            var match = jsRegExp.exec(text);

            if (match == null || match.length === 0) {
                return null;
            }

            if (returnAllMatches) {
                var matches = [];

                do {
                    matches.push(match);
                    match = jsRegExp.exec(text);

                    if (match != null && re) {
                        re._checkTimeout();
                    }
                } while (match != null)

                return matches;
            } 

            return match;
        },

        parsePatternGroups: function (pattern) {
            var group;
            var groups = [];
            var nestedGroups = [];
            var sBracketLvl = 0;
            var isEscape = false;

            for (var i = 0; i < pattern.length; i++) {
                if (isEscape) {
                    isEscape = false;

                    continue;
                }

                var ch = pattern[i];

                if (ch === "\\") {
                    isEscape = true;

                    continue;
                }

                if (ch === "[") {
                    sBracketLvl++;

                    continue;
                }

                if (ch === "]") {
                    if (sBracketLvl > 0) {
                        sBracketLvl--;
                    }

                    continue;
                }

                if (ch === "(") {
                    if (sBracketLvl === 0) {
                        var parent = nestedGroups.length > 0 ? nestedGroups[nestedGroups.length - 1] : null;

                        group = {
                            exprIndex: i,
                            exprLength: 0,
                            parentGroup: parent,
                            innerGroups: []
                        };

                        groups.push(group);
                        nestedGroups.push(group);

                        if (parent != null) {
                            parent.innerGroups.push(group);
                        }

                        group.constructs = Bridge.Text.RegularExpressions.RegexNetEngine._getGroupConstructs(pattern, i + 1);
                        i += group.constructs.exprLength; // Skip group Constructs in the pattern
                    }

                    continue;
                }

                if (ch === ")") {
                    if (sBracketLvl === 0 && nestedGroups.length > 0) {
                        group = nestedGroups.pop();
                        group.exprLength = 1 + i - group.exprIndex;
                        Bridge.Text.RegularExpressions.RegexNetEngine._fillPatternGroupInfo(group, pattern);
                    }

                    continue;
                }
            }

            var groupId = 1;

            for (var j = 0; j < groups.length; j++) {
                if (groups[j].constructs.name1 != null) {
                    //TODO: check balancing case: name1-name2
                    groups[j].name = groups[j].constructs.name1;
                    groups[j].hasName = true;
                } else if (!groups[j].constructs.isNonCapturing) {
                    groups[j].hasName = false;
                    groups[j].name = groupId.toString();
                    ++groupId;
                }
            }

            return groups;
        },

        _getGroupConstructs: function (pattern, i) {
            // ?<name1>
            // ?'name1'
            // ?<name1-name2>
            // ?'name1-name2'
            // ?:
            // ?imnsx-imnsx
            // ?=
            // ?!
            // ?<=
            // ?<!
            // ?>
            var constructs = {
                name1: null,
                name2: null,

                isNonCapturing: false,
                isIgnoreCase: null,
                isMultiline: null,
                isExplicitCapture: null,
                isSingleLine: null,
                isIgnoreWhitespace: null,
                isPositiveLookahead: false,
                isNegativeLookahead: false,
                isPositiveLookbehind: false,
                isNegativeLookbehind: false,
                isNonbacktracking: false,

                exprLength: 0
            };

            if (i+1 >= pattern.length) {
                return constructs;
            }

            if (pattern[i] !== "?") {
                return constructs;
            }

            ++i;
            var sfx2 = pattern.slice(i, i + 2);

            if (sfx2.length === 2) {
                if (sfx2 === "<=") {
                    constructs.isPositiveLookbehind = true;
                    constructs.exprLength = 3;

                    return constructs;
                }

                if (sfx2 === "<!") {
                    constructs.isNegativeLookbehind = true;
                    constructs.exprLength = 3;

                    return constructs;
                }
            }

            var ch = pattern[i];

            if (ch === ":") {
                constructs.isNonCapturing = true;
                constructs.exprLength = 2;

                return constructs;
            }

            if (ch === "=") {
                constructs.isPositiveLookahead = true;
                constructs.exprLength = 2;

                return constructs;
            }

            if (ch === "!") {
                constructs.isNegativeLookahead = true;
                constructs.exprLength = 2;

                return constructs;
            }

            if (ch === ">") {
                constructs.isNonbacktracking = true;
                constructs.exprLength = 2;

                return constructs;
            }

            if (ch === "<" || ch === "'") {
                var endBracket = ch === "<" ? ">" : "'";
                var name1Match = Bridge.Text.RegularExpressions.RegexNetEngine._matchUntil(pattern, i + 1, pattern.length, ["-", endBracket]);

                constructs.name1 = name1Match.matched;
                constructs.exprLength = name1Match.lastIndex - i + 2;
                                                                    
                if (name1Match.lastCh === "-") {
                    var name2Match = Bridge.Text.RegularExpressions.RegexNetEngine._matchUntil(pattern, name1Match.lastIndex + 1, pattern.length, [endBracket]);

                    constructs.name2 = name2Match.matched;
                    constructs.exprLength = name2Match.lastIndex - i + 2;
                }

                return constructs;
            }

            var imnsx = ["i", "m", "n", "s", "x"];
            var imnsx1Match = Bridge.Text.RegularExpressions.RegexNetEngine._matchAllowedChars(pattern, i + 1, pattern.length, imnsx);

            if (imnsx1Match.lastCh === "-" || imnsx1Match.lastCh === ":") {
                Bridge.Text.RegularExpressions.RegexNetEngine._parseImnsx(constructs, imnsx1Match.matched, true);

                if (imnsx1Match.lastCh === "-") {
                    var imnsx2Match = Bridge.Text.RegularExpressions.RegexNetEngine._matchAllowedChars(pattern, imnsx1Match.lastCh + 1, pattern.length, imnsx);

                    Bridge.Text.RegularExpressions.RegexNetEngine._parseImnsx(constructs, imnsx2Match.matched, false);
                    constructs.exprLength = imnsx2Match.lastIndex - i + 2;
                } else {
                    constructs.exprLength = imnsx1Match.lastIndex - i + 2;
                }
            }

            return constructs;
        },

        _parseImnsx: function (prefix, imnsxString, value) {
            for (var i = 0; i < imnsxString.length; i++) {
                var ch = imnsxString[i];

                if (ch === "i") {
                    prefix.isIgnoreCase = value;
                } else if (ch === "m") {
                    prefix.isMultiline = value;
                } else if (ch === "n") {
                    prefix.isExplicitCapture = value;
                } else if (ch === "s") {
                    prefix.isSingleLine = value;
                } else if (ch === "x") {
                    prefix.isIgnoreWhitespace = value;
                }
            }
        },

        _fillPatternGroupInfo: function (group, pattern) {
            var quantifier = "";
            var basicQuantifiers = ["+", "*", "?"];
            var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            var outerCh;
            var hasQuantifier = false;
            var outerIndex = group.exprIndex + group.exprLength;

            if (outerIndex < pattern.length) {
                var res = Bridge.Text.RegularExpressions.RegexNetEngine._matchAllowedChars(pattern, outerIndex, outerIndex + 1, basicQuantifiers);

                if (res.matched.length === 1) { // ["+", "*", "?"]
                    quantifier = res.matched;
                    outerIndex++;
                    hasQuantifier = true;
                } else {
                    outerCh = pattern[outerIndex];
                    outerIndex++;

                    if (outerCh === "{") {
                        var nRes = Bridge.Text.RegularExpressions.RegexNetEngine._matchAllowedChars(pattern, outerIndex, pattern.length, digits);

                        if (nRes.matched.length > 0) {
                            if (nRes.lastCh === "}") {
                                quantifier = "{" + nRes.matched + "}";
                                hasQuantifier = true;
                                outerIndex = nRes.lastIndex + 1;
                            } else if (nRes.lastCh === ",") {
                                var mRes = Bridge.Text.RegularExpressions.RegexNetEngine._matchAllowedChars(pattern, nRes.lastIndex + 1, pattern.length, digits);

                                if (mRes.lastCh === "}") {
                                    quantifier = "{" + nRes.matched + "," + mRes.matched + "}";
                                    hasQuantifier = true;
                                    outerIndex = mRes.lastIndex + 1;
                                }
                            }
                        }
                    }
                }

                if (hasQuantifier && outerIndex < pattern.length) {
                    outerCh = pattern[outerIndex];

                    if (outerCh === "?") {
                        quantifier += "?";
                    }
                }
            }

            group.quantifier = quantifier;
            group.expr = pattern.slice(group.exprIndex, group.exprIndex + group.exprLength);
            group.exprFull = group.expr + group.quantifier;
        },

        _matchAllowedChars: function (str, index, endIndex, allowedChars) {
            var res = {
                matched: "",
                lastCh: "",
                lastIndex: 0
            };

            while (index < endIndex) {

                var ch = str[index];
                var isAllowed = false;

                for (var i = 0; i < allowedChars.length; i++) {
                    if (ch === allowedChars[i]) {
                        isAllowed = true;

                        break;
                    }
                }

                if (isAllowed) {
                    res.matched += ch;
                } else {
                    res.lastCh = ch;
                    res.lastIndex = index;

                    break;
                }

                index++;
            }

            return res;
        },

        _matchUntil: function (str, index, endIndex, unallowedChars) {
            var res = {
                matched: "",
                lastCh: "",
                lastIndex: 0
            };

            while (index < endIndex) {

                var ch = str[index];

                for (var i = 0; i < unallowedChars.length; i++) {
                    if (ch === unallowedChars[i]) {
                        res.lastCh = ch;
                        res.lastIndex = index;

                        return res;
                    }
                }

                res.matched += ch;
                index++;
            }

            return res;
        }
    },

    _pattern: "",
    _isMultiLine: false,
    _isCaseInsensitive: false,
    _text: "",
    _textStart: 0,
    _groupDescriptors: null,
    _timeoutMs: -1,
    _timeoutTime: -1,

    constructor: function (pattern, isMultiLine, isCaseInsensitive, timeoutMs) {
        if (pattern == null) {
            throw new Bridge.ArgumentNullException("pattern");
        }

        this._pattern = pattern;
        this._isMultiLine = isMultiLine;
        this._isCaseInsensitive = isCaseInsensitive;
        this._timeoutMs = timeoutMs;
        this._timeoutTime = timeoutMs > 0 ? new Date().getTime() + Bridge.Convert.toInt32(timeoutMs + 0.5) : -1;
    },

    match: function (text, textStart) {
        if (text == null) {
            throw new Bridge.ArgumentNullException("text");
        }

        if (textStart != null && (textStart < 0 || textStart > text.length)) {
            throw new Bridge.ArgumentOutOfRangeException("textStart", "Start index cannot be less than 0 or greater than input length.");
        }

        this._text = text;
        this._textStart = textStart;

        var match = {
            capIndex: 0,       // start index of total capture
            capLength: 0,      // length of total capture
            success: false,
            value: "",
            groups: [],
            captures: []
        };

        // Get group descriptors (+ remove group name before any processing);
        var groupDescs = this._getGroupDescriptors();

        this._checkTimeout();

        // The 1st run (to know the total capture):
        var total = Bridge.Text.RegularExpressions.RegexNetEngine.jsRegex(this._text, this._textStart, this._pattern, this._isMultiLine, this._isCaseInsensitive, false, this);

        if (total == null) {
            return match;
        }

        match.capIndex = total.index;
        match.capLength = total[0].length;
        match.success = true;

        // Add total capture both to groups and captures:
        match.captures.push({
            capIndex: total.index,
            capLength: total[0].length,
            value: total[0]
        });

        match.groups.push({
            capIndex: total.index,
            capLength: total[0].length,
            value: total[0],
            success: true,
            captures: [match.captures[0]]
        });

        // Get more details about groups and captures (if any):
        if (total.length > 1) {
            var descToGroupMap = {};
            var globalCtx = {
                text: this._text,
                textOffset: this._textStart,
                pattern: this._pattern,
                patternStart: 0,
                patternEnd: this._pattern.length
            };

            var nonCapturingCount = 0;

            for (var i = 1; i < total.length + nonCapturingCount; i++) {
                this._checkTimeout();

                var groupDesc = groupDescs[i - 1];

                if (groupDesc.constructs.isNonCapturing) {
                    nonCapturingCount++;
                }

                var group = {
                    descriptor: groupDesc,
                    capIndex: 0,
                    capLength: 0,
                    value: "",
                    valueFull: "",
                    success: false,
                    captures: [],
                    ctx: null
                };

                descToGroupMap[groupDesc.exprIndex] = group;

                var parentGroupDesc = groupDesc.parentGroup;

                if (parentGroupDesc == null) { 
                    // Match a root group using the global context:
                    this._matchGroup(globalCtx, group, 0);

                    // Match the group's captures:
                    if (group.success) {
                        this._matchCaptures(group);
                    }
                } else {
                    // Use the parent group's context.
                    // However, don't match the group if the parent has not been matched successfully.
                    var parentGroup = descToGroupMap[parentGroupDesc.exprIndex];

                    if (parentGroup.success === true) {
                        // Match the group in every single parent capture:
                        for (var j = 0; j < parentGroup.captures.length; j++) {
                            this._checkTimeout();

                            var parentCapture = parentGroup.captures[j];
                            this._matchGroup(parentCapture.ctx, group, parentCapture.capIndex);

                            // Match the group's captures:
                            if (group.success) {
                                this._matchCaptures(group);
                            }
                        }
                    }
                }

                if (group.captures.length > 0) {
                    var lastCapture = group.captures[group.captures.length - 1];

                    group.capIndex = lastCapture.capIndex;
                    group.capLength = lastCapture.capLength;
                    group.value = lastCapture.value;
                }

                if (!groupDesc.constructs.isNonCapturing) {
                    match.groups.push(group);
                }
            }

            // Remove internal fields:
            for (var k = 0; k < match.groups.length; k++) {
                var gr = match.groups[k];

                delete gr.ctx;

                for (var m = 0; m < gr.captures.length; m++) {
                    delete gr.captures[m].ctx;
                }
            }
        }

        return match;
    },

    _matchGroup: function (ctx, group, parentGroupTextOffset) {
        var groupDesc = group.descriptor;
        var groupStart = groupDesc.exprIndex;
        var groupEnd = groupDesc.exprIndex + groupDesc.exprLength;
        var groupEndFull = groupDesc.exprIndex + groupDesc.exprFull.length;

        // Use RegExp to determine the capture length for the subexpression to the left of the Group expression.
        if (groupDesc.exprIndex > ctx.patternStart) {
            var leftRes = this._matchSubExpr(ctx.text, ctx.textOffset, ctx.pattern, ctx.patternStart, ctx.patternEnd, ctx.patternStart, groupStart);

            if (leftRes != null) {
                ctx.textOffset = leftRes.capIndex + leftRes.capLength;
            }
        }

        // Use RegExp to determine length and location of the captured Group
        var groupRes = this._matchSubExpr(ctx.text, ctx.textOffset, ctx.pattern, ctx.patternStart, ctx.patternEnd, groupStart, groupEndFull);

        if (groupRes != null && groupRes.captureGroup != null) {
            ctx.textOffset = groupRes.capIndex + groupRes.capLength;

            group.value = groupRes.captureGroup;
            group.valueFull = groupRes.capture;
            group.capIndex = groupRes.capIndex + parentGroupTextOffset;
            group.capLength = groupRes.capLength;
            group.success = true;

            // Save the current group conext for its children:
            var groupStartStep = groupDesc.constructs.isNonCapturing ? 3 : 1;

            if (groupDesc.innerGroups.length > 0) {
                group.ctx = {
                    text: group.valueFull, //TODO: FULL OR NOT?
                    textOffset: 0,

                    pattern: ctx.pattern,
                    patternStart: groupStart + groupStartStep,  // start index of the group content without the opening bracket
                    patternEnd: groupEnd - 1                    // end index of the group content without the closing bracket
                };
            }
        }

        ctx.patternStart = groupEndFull;
    },

    _matchCaptures: function (group) {
        var groupDesc = group.descriptor;

        if (groupDesc.quantifier == null || groupDesc.quantifier.length === 0 || groupDesc.quantifier === "?" || group.valueFull == null || group.valueFull.length === 0) {
            // For non-repeating groups - only 1 capture exists (the same as the group).
            group.captures.push({
                capIndex: group.capIndex,
                capLength: group.capLength,
                value: group.valueFull
            });
        } else {
            // For repeating groups - find all captures:
            var qCh = groupDesc.quantifier[0];

            if (qCh === "*" || qCh === "+" || qCh === "{") {
                var capMatches = Bridge.Text.RegularExpressions.RegexNetEngine.jsRegex(group.valueFull, 0, groupDesc.expr, this._isMultiLine, this._isCaseInsensitive, true, this);

                if (capMatches == null) {
                    throw new Bridge.InvalidOperationException("Can't identify captures for the already matched group.");
                }

                for (var i = 0; i < capMatches.length; i++) {
                    var capMatch = capMatches[i];

                    group.captures.push({
                        capIndex: capMatch.index + group.capIndex,
                        capLength: capMatch[0].length,
                        value: capMatch[0]
                    });
                }
            }
        }

        // Deep copy group context to the each capture:
        if (group.ctx != null) {
            for (var j = 0; j < group.captures.length; j++) {
                group.captures[j].ctx = {
                    text: group.captures[j].value,
                    textOffset: 0,
                    pattern: group.ctx.pattern,
                    patternStart: group.ctx.patternStart,
                    patternEnd: group.ctx.patternEnd
                };
            }
        }
    },

    _matchSubExpr: function (text, textOffset, pattern, patternStartIndex, patternEndIndex, subExprStartIndex, subExprEndIndex) {
        // transforms the pattern to: "<subexpression>(?=<everything else>)"

        if (textOffset < 0 || textOffset > text.length) {
            throw new Bridge.ArgumentOutOfRangeException("textOffset");
        }
        if (patternStartIndex < 0 || patternStartIndex >= pattern.length) {
            throw new Bridge.ArgumentOutOfRangeException("patternStartIndex");
        }
        if (patternEndIndex < patternStartIndex || patternEndIndex > pattern.length) {
            throw new Bridge.ArgumentOutOfRangeException("patternEndIndex");
        }
        if (subExprStartIndex < patternStartIndex || subExprStartIndex >= patternEndIndex) {
            throw new Bridge.ArgumentOutOfRangeException("subExprStartIndex");
        }
        if (subExprEndIndex < subExprStartIndex || subExprEndIndex > patternEndIndex) {
            throw new Bridge.ArgumentOutOfRangeException("subExprEndIndex");
        }

        if (textOffset === text.length) {
            return null; // end of search;
        }

        var subExpr = pattern.slice(subExprStartIndex, subExprEndIndex);
        var restExpr = pattern.slice(subExprEndIndex, patternEndIndex);
        var transformedPattern = subExpr + "(?=" + restExpr + ")";

        var subExpRes = Bridge.Text.RegularExpressions.RegexNetEngine.jsRegex(text, textOffset, transformedPattern, this._isMultiLine, this._isCaseInsensitive, false, this);

        if (subExpRes != null) {
            return {
                capture: subExpRes[0],
                captureGroup: subExpRes.length > 1 ? subExpRes[1] : null,
                capIndex: subExpRes.index,
                capLength: subExpRes[0].length
            };
        }

        return null;
    },

    _getGroupDescriptors: function () {
        if (this._groupDescriptors == null) {
            this._groupDescriptors = Bridge.Text.RegularExpressions.RegexNetEngine.parsePatternGroups(this._pattern);
            this._removeGroupNamesFromPattern();
        }

        return this._groupDescriptors;
    },

    _removeGroupNamesFromPattern: function () {
        // Remove group names (JS RegExp does not support them):

        var updatedPattern = this._pattern;

        for (var i = 0; i < this._groupDescriptors.length; i++) {
            var gr = this._groupDescriptors[i];

            if (gr.hasName) {
                // Remove name from the group:
                var name = gr.constructs.name1;
                var nameConstrLen = 3 + name.length;
                gr.expr = this._removeSubstring(gr.expr, 1, nameConstrLen);
                gr.exprFull = gr.expr + gr.quantifier;
                gr.exprLength -= nameConstrLen;

                // Update parent groups (remove name from their templates as well)
                var parent = gr.parentGroup;

                while (parent != null) {
                    parent.exprLength -= nameConstrLen;
                    parent.expr = this._removeSubstring(parent.expr, gr.exprIndex + 1 - parent.exprIndex, nameConstrLen);
                    parent.exprFull = parent.expr + parent.quantifier;
                    parent = parent.parentGroup;
                }

                // Update all consequent groups (shift their indexes according to the length of the removed group name)
                updatedPattern = this._removeSubstring(updatedPattern, gr.exprIndex + 1, nameConstrLen);

                for (var j = i + 1; j < this._groupDescriptors.length; j++) {
                    var nextGr = this._groupDescriptors[j];

                    nextGr.exprIndex -= nameConstrLen;
                }
            }
        }

        this._pattern = updatedPattern;
    },

    _removeSubstring: function (str, index, length) {
        var result = str.slice(0, index) + str.slice(index + length, str.length);

        return result;
    },

    _checkTimeout: function () {
        if (this._timeoutTime < 0) {
            return;
        }

        var time = new Date().getTime();

        if (time >= this._timeoutTime) {
            throw new Bridge.RegexMatchTimeoutException(this._text, this._pattern, Bridge.TimeSpan.fromMilliseconds(this._timeoutMs));
        }
    }
});

// @source timer.js

(function (globals) {
    "use strict";

    Bridge.define('Bridge.Threading.Timer', {
        inherits: [Bridge.IDisposable],
        statics: {
            MAX_SUPPORTED_TIMEOUT: 4294967294,
            EXC_LESS: "Number must be either non-negative and less than or equal to Int32.MaxValue or -1.",
            EXC_MORE: "Time-out interval must be less than 2^32-2.",
            EXC_DISPOSED: "The timer has been already disposed."
        },
        dueTime: Bridge.Long(0),
        period: Bridge.Long(0),
        timerCallback: null,
        state: null,
        id: null,
        disposed: false,
        constructor$1: function (callback, state, dueTime, period) {
            this.timerSetup(callback, state, Bridge.Long(dueTime), Bridge.Long(period));
        },
        constructor$3: function (callback, state, dueTime, period) {
            var dueTm = Bridge.Int.clip64(dueTime.getTotalMilliseconds());
            var periodTm = Bridge.Int.clip64(period.getTotalMilliseconds());

            this.timerSetup(callback, state, dueTm, periodTm);
        },
        constructor$4: function (callback, state, dueTime, period) {
            this.timerSetup(callback, state, Bridge.Long(dueTime), Bridge.Long(period));
        },
        constructor$2: function (callback, state, dueTime, period) {
            this.timerSetup(callback, state, dueTime, period);
        },
        constructor: function (callback) {
            var dueTime = -1; // we want timer to be registered, but not activated.  Requires caller to call
            var period = -1; // Change after a timer instance is created.  This is to avoid the potential
            // for a timer to be fired before the returned value is assigned to the variable,
            // potentially causing the callback to reference a bogus value (if passing the timer to the callback). 

            this.timerSetup(callback, this, Bridge.Long(dueTime), Bridge.Long(period));
        },
        timerSetup: function (callback, state, dueTime, period) {
            if (this.disposed) {
                throw new Bridge.InvalidOperationException(Bridge.Threading.Timer.EXC_DISPOSED);
            }

            if (!Bridge.hasValue(callback)) {
                throw new Bridge.ArgumentNullException("TimerCallback");
            }

            if (dueTime.lt(Bridge.Long(-1))) {
                throw new Bridge.ArgumentOutOfRangeException("dueTime", Bridge.Threading.Timer.EXC_LESS);
            }
            if (period.lt(Bridge.Long(-1))) {
                throw new Bridge.ArgumentOutOfRangeException("period", Bridge.Threading.Timer.EXC_LESS);
            }
            if (dueTime.gt(Bridge.Long(Bridge.Threading.Timer.MAX_SUPPORTED_TIMEOUT))) {
                throw new Bridge.ArgumentOutOfRangeException("dueTime", Bridge.Threading.Timer.EXC_MORE);
            }
            if (period.gt(Bridge.Long(Bridge.Threading.Timer.MAX_SUPPORTED_TIMEOUT))) {
                throw new Bridge.ArgumentOutOfRangeException("period", Bridge.Threading.Timer.EXC_MORE);
            }

            this.dueTime = dueTime;
            this.period = period;

            this.state = state;
            this.timerCallback = callback;

            return this.runTimer(this.dueTime);
        },
        handleCallback: function () {
            if (this.disposed) {
                return;
            }

            if (Bridge.hasValue(this.timerCallback)) {
                var myId = this.id;
                this.timerCallback(this.state);
    
                // timerCallback may call Change(). To prevent double call we can check if timer changed
                if (Bridge.Nullable.eq(this.id, myId)) {
                    this.runTimer(this.period, false);
                }
            }
        },
        runTimer: function (period, checkDispose) {
            if (checkDispose === void 0) { checkDispose = true; }
            if (checkDispose && this.disposed) {
                throw new Bridge.InvalidOperationException(Bridge.Threading.Timer.EXC_DISPOSED);
            }

            if (period.ne(Bridge.Long(-1)) && !this.disposed) {
                var p = period.toNumber();
                this.id = Bridge.global.setTimeout(Bridge.fn.bind(this, this.handleCallback), p);
                return true;
            }

            return false;
        },
        change: function (dueTime, period) {
            return this.changeTimer(Bridge.Long(dueTime), Bridge.Long(period));
        },
        change$2: function (dueTime, period) {
            return this.changeTimer(Bridge.Int.clip64(dueTime.getTotalMilliseconds()), Bridge.Int.clip64(period.getTotalMilliseconds()));
        },
        change$3: function (dueTime, period) {
            return this.changeTimer(Bridge.Long(dueTime), Bridge.Long(period));
        },
        change$1: function (dueTime, period) {
            return this.changeTimer(dueTime, period);
        },
        changeTimer: function (dueTime, period) {
            this.clearTimeout();
            return this.timerSetup(this.timerCallback, this.state, dueTime, period);
        },
        clearTimeout: function () {
            if (Bridge.Nullable.hasValue(this.id)) {
                window.clearTimeout(Bridge.Nullable.getValue(this.id));
                this.id = null;
            }
        },
        dispose: function () {
            this.clearTimeout();
            this.disposed = true;
        }
    });

    Bridge.init();
})(this);

    // @source End.js

    // module export
    if (typeof define === "function" && define.amd) {
        // AMD
        define("bridge", [], function () { return Bridge; });
    } else if (typeof module !== "undefined" && module.exports) {
        // Node
        module.exports = Bridge;
    }

})(this);

