(function (global, factory) {
    if (typeof define === "function" && define.amd) define(factory);
    else if (typeof module === "object") module.exports = factory();
    else global.augment = factory();
}(this, function () {
    "use strict";

    var Factory = function () {};
    var slice = Array.prototype.slice;

    return function (base, body) {
        var uber = Factory.prototype = typeof base === "function" ? base.prototype : base;
        var prototype = new Factory;
        body.apply(prototype, slice.call(arguments, 2).concat(uber));
        if (!prototype.hasOwnProperty("constructor")) return prototype;
        var constructor = prototype.constructor;
        constructor.prototype = prototype;
        return constructor;
    }
}));