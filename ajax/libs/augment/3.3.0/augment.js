var augment = (function (bind, call) {
    var bindable = Function.bindable = bind.bind(bind);
    var callable = Function.callable = bindable(call);

    var arrayFrom = Array.from = callable(Array.prototype.slice);
    var ownPropertyOf = Object.ownPropertyOf = callable(Object.hasOwnProperty);

    Function.prototype.augment = augment;
    Object.prototype.augment = augment;

    return callable(augment);

    function augment(body) {
        var base = this.prototype || this;
        var prototype = Object.create(base);
        body.apply(prototype, arrayFrom(arguments, 1).concat(base));
        if (!ownPropertyOf(prototype, "constructor")) return prototype;
        var constructor = prototype.constructor;
        constructor.prototype = prototype;
        return constructor;
    }
}(Function.bind, Function.call));

if (typeof module === "object") module.exports = augment;