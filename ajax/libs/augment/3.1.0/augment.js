Function.prototype.augment = function (body) {
    var base = this.prototype;
    var prototype = Object.create(base);
    body.apply(prototype, Array.from(arguments, 1).concat(base));
    var constructor = prototype.constructor;
    if (typeof constructor !== "function") return prototype;
    constructor.prototype = prototype;
    return constructor;
};

(function funct() {
    var bind = funct.bind;
    var bindable = Function.bindable = bind.bind(bind);
    var callable = Function.callable = bindable(funct.call);
    Array.from = callable([].slice);
}());
