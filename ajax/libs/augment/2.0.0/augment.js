(function (functProto, objProto) {
    var create = Object.create;

    if (typeof create !== "function") {
        create = Object.create = function (prototype) {
            constructor.prototype = prototype;
            function constructor() {}
            return new constructor;
        };
    }

    var bind = functProto.bind;
    var bindable = Function.bindable = bind.bind(bind);
    var callable = Function.callable = bindable(functProto.call);
    var appliable = Function.appliable = bindable(functProto.apply);
    var ownPropertyOf = Object.ownPropertyOf = callable(objProto.hasOwnProperty);

    functProto.augment = function (body) {
        var uber = this.prototype;
        var prototype = create(uber);
        body.call(prototype, this, uber);
        if (!ownPropertyOf(prototype, "constructor")) prototype.constructor = function () {};
        var constructor = prototype.constructor;
        constructor.prototype = prototype;
        return constructor;
    };
}(Function.prototype, Object.prototype));
