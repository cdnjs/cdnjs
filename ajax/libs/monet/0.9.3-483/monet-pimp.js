/**
 * monet-pimp.js 0.9.3
 *
 * This file needs to be included after monet.js
 *
 * (c) 2012-2021 Chris Myers
 * @license Monet-pimp.js may be freely distributed under the MIT license.
 * For all details and documentation:
 * https://monet.github.io/monet.js/
 */
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([ "monet" ], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("monet"), root);
    } else {
        factory(root.Monet, root);
    }
})(typeof self !== "undefined" ? self : this, function(Monet, rootGlobalObject) {
    "use strict";
    function wrapReader(fn, args) {
        var newArgs = args || [];
        return function() {
            var args1 = newArgs.concat(Array.prototype.slice.call(arguments));
            return args1.length + 1 >= fn.length ? getStatic("Reader")(function(c) {
                return fn.apply(null, args1.concat(c));
            }) : wrapReader(fn, args1);
        };
    }
    function getStatic(name) {
        return rootGlobalObject && rootGlobalObject[name] || Monet[name];
    }
    Object.prototype.cons = function(list) {
        return list.cons(this);
    };
    Object.prototype.some = Object.prototype.just = function() {
        return getStatic("Some")(this);
    };
    Object.prototype.success = function() {
        return getStatic("Validation").success(this);
    };
    Object.prototype.fail = function() {
        return getStatic("Validation").fail(this);
    };
    Object.prototype.right = function() {
        return getStatic("Either").Right(this);
    };
    Object.prototype.left = function() {
        return getStatic("Either").Left(this);
    };
    Array.prototype.list = function() {
        return getStatic("List").fromArray(this);
    };
    Function.prototype.curry = function() {
        return Monet.curry(this);
    };
    Function.prototype.compose = function(g) {
        return Monet.compose(this, g);
    };
    Function.prototype.andThen = Function.prototype.map = function(g) {
        var f = this;
        return function(x) {
            return g(f(x));
        };
    };
    Function.prototype.io = function() {
        return getStatic("IO")(this);
    };
    Function.prototype.io1 = function() {
        var f = this;
        return function(x) {
            return getStatic("IO")(function() {
                return f(x);
            });
        };
    };
    Function.prototype.reader = function() {
        return wrapReader(this);
    };
});