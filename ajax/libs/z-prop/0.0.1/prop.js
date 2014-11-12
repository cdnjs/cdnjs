"use strict";

define(["jquery"], function($) {

    function define() {
        return readonly.apply(this, arguments);
    }

    function readonly(obj, prop, value) {
        Object.defineProperty(obj, prop, {
            value: value,
            writable: false,
            enumerable: !$.isFunction(value)
        });
    }

    function getter(obj, prop, get) {
        Object.defineProperty(obj, prop, {
            get: get, set: $noop,
            enumerable: true
        });
    }

    function noop(obj, prop) {
        define(obj, prop, $noop);
    }

    function $noop() {}

    // public

    var Prop = {};

    define(Prop, "define", define);
    define(Prop, "readonly", readonly);
    define(Prop, "getter", getter);
    define(Prop, "noop", noop);
    define(Prop, "$noop", $noop);

    return Prop;
    
});
