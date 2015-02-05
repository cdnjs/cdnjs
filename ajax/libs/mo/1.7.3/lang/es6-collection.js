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
define("mo/lang/es6-collection", ["./es6-utils"], function(_0, require, exports){

var host = this,
    Object = host.Object,
    _array_indexof = [].indexOf;

function Map(){
    var keys = [],
        values = [];
    return Object.create(Map.prototype, {
        'get': collection_get(keys, values),
        'set': collection_set(keys, values),
        'delete': collection_del(keys, values),
        'clear': collection_clear(keys, values),
        'size': collection_size(keys),
        'forEach': collection_foreach(values, keys),
        'has': collection_has(keys, values)
    });
}

function Set(){
    var values = [],
        temp = [];
    return Object.create(Set.prototype, {
        'add': collection_add(values),
        'delete': collection_del(values, temp),
        'clear': collection_clear(values, temp),
        'size': collection_size(values),
        'forEach': collection_foreach(values, temp),
        'has': collection_has(values, temp)
    });
}

function WeakMap(){
    var keys = [],
        values = [];
    return Object.create(WeakMap.prototype, {
        'get': collection_get(keys, values, true),
        'set': collection_set(keys, values, true),
        'delete': collection_del(keys, values, true),
        'clear': collection_clear(keys, values),
        'has': collection_has(keys, values, true)
    });
}

function WeakSet(){
    var values = [],
        temp = [];
    return Object.create(WeakSet.prototype, {
        'add': collection_add(values, true),
        'delete': collection_del(values, temp, true),
        'clear': collection_clear(values, temp),
        'has': collection_has(values, temp, true)
    });
}

Map.prototype = Map();
Set.prototype = Set();
WeakMap.prototype = WeakMap();
WeakSet.prototype = WeakSet();

function collection_get(keys, values, only_object){
    return {
        value: function(key){
            var i = collection_check(keys, key, only_object);
            return i > -1 ? values[i] : undefined;
        }
    };
}

function collection_set(keys, values, only_object){
    return {
        value: function(key, value){
            var i = collection_check(keys, key, only_object);
            if (i > -1) {
                values[i] = value;
            } else {
                values[keys.push(key) - 1] = value;
            }
        }
    };
}

function collection_del(keys, values, only_object){
    return {
        value: function(key){
            var i = collection_check(keys, key, only_object);
            if (i > -1) {
                keys.splice(i, 1);
                values.splice(i, 1);
                return true;
            }
            return false;
        }
    };
}

function collection_has(keys, values, only_object){
    return {
        value: function(key){
            return collection_check(keys, key, only_object) > -1;
        }
    };
}

function collection_add(values, only_object){
    return {
        value: function(value){
            var i = collection_check(values, value, only_object);
            if (i === -1) {
                values.push(value);
            }
        }
    };
}

function collection_clear(keys, values){
    return {
        value: function(){
            keys.length = 0;
            values.length = 0;
        }
    };
}

function collection_size(keys){
    return {
        value: function(){
            return keys.length;
        }
    };
}

function collection_foreach(values, keys){
    return {
        value: function(fn, context){
            values.forEach(function(value, i){
                fn.call(this, value, keys[i]);
            }, context);
        }
    };
}

function collection_check(keys, key, only_object) {
    if (only_object && key !== Object(key)) {
        throw new TypeError("not a non-null object");
    }
    var i;
    if (key != key || key === 0) {
        for (i = keys.length; i--;) {
            if (Object.is(keys[i], key)) {
                break;
            }
        }
    } else {
        i = _array_indexof.call(keys, key);
    }
    return i;
}

if (!host.Map) {
    host.Map = Map;
}

if (!host.Set) {
    host.Set = Set;
}

if (!host.WeakMap) {
    host.WeakMap = WeakMap;
}

if (!host.WeakSet) {
    host.WeakSet = WeakSet;
}

exports.Map = Map;
exports.Set = Set;
exports.WeakMap = WeakMap;
exports.WeakSet = WeakSet;

});
