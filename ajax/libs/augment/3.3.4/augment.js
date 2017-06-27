var augment = (function (lambda, object, constructor) {
    "use strict";

    Array.from = arrayFrom;

    var call = lambda.call;

    var slice = Array.prototype.slice;

    var bind = lambda.bind || (lambda.bind = function (that) {
        var self = this, args = arrayFrom(arguments, 1);
        return bound.prototype = self.prototype, bound;

        function bound() {
            return self.apply(this instanceof bound ? this : that,
                args.concat(arrayFrom(arguments)));
        }
    });

    var bindable = Function.bindable = bind.bind(bind);
    var callable = Function.callable = bindable(call);

    var ownPropertyOf = Object.ownPropertyOf = callable(object.hasOwnProperty);

    var create = Object.create || (Object.create = function(prototype) {
        return constructor.prototype = prototype, new constructor;
    });

    var defineProperty = Object.defineProperty;

    if (defineProperty) {
        var augmentDescriptor = { value: augment };
        defineProperty(lambda, "augment", augmentDescriptor);
        defineProperty(object, "augment", augmentDescriptor);
    } else lambda.augment = object.augment = augment;

    return callable(augment);

    function arrayFrom() { return call.apply(slice, arguments); }

    function augment(body) {
        var base = typeof this === "function" ? this.prototype : this;
        var prototype = create(base);
        body.apply(prototype, arrayFrom(arguments, 1).concat(base));
        if (!ownPropertyOf(prototype, "constructor")) return prototype;
        var constructor = prototype.constructor;
        constructor.prototype = prototype;
        return constructor;
    }
}(Function.prototype, Object.prototype, function () {}));

if (typeof module === "object") module.exports = augment;
if (typeof define === "function" && typeof define.amd === "object")
    define(function () { return augment; });