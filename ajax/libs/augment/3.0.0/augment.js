(function () {
    var create = Object.create;

    if (typeof create !== "function") {
        create = Object.create = function (prototype) {
            constructor.prototype = prototype;
            function constructor() {}
            return new constructor;
        };
    }

    var objProto = Object.prototype;
    var arrayProto = Array.prototype;
    var functProto = Function.prototype;

    var bind = functProto.bind;
    var bindable = Function.bindable = bind.bind(bind);
    var callable = Function.callable = bindable(functProto.call);
    var appliable = Function.appliable = bindable(functProto.apply);

    var arrayFrom = Array.from = callable(arrayProto.slice);
    var ownPropertyOf = Object.ownPropertyOf = callable(objProto.hasOwnProperty);

    functProto.augment = function (body) {
        var base = this.prototype;
        var prototype = create(base);
        var args = arrayFrom(arguments, 1);
        body.apply(prototype, args.concat(base));
        if (!ownPropertyOf(prototype, "constructor")) return prototype;
        var constructor = prototype.constructor;
        constructor.prototype = prototype;
        return constructor;
    };
}());
