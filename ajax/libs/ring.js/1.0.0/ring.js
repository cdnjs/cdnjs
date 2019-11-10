/*
Ring.js version 1.0

Copyright (c) 2013, Nicolas Vanhoren

Released under the MIT license

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function() {

if (typeof(exports) !== "undefined") { // nodejs
    var underscore = require("underscore");
    underscore.extend(exports, declare(underscore));
} else if (typeof(define) !== "undefined") { // amd
    define(["underscore"], declare);
} else { // define global variable
    ring = declare(_);
}


function declare(_) {
    var ring = {};


    function Object() {};
    /**
        ring.Object

        The base class of all other classes. It doesn't have much uses except
        testing testing if an object uses the Ring.js class system using
        ring.instance(x, ring.Object)
    */
    ring.Object = Object;
    _.extend(ring.Object, {
        __mro__: [ring.Object],
        __properties__: {init: function() {}},
        prototype: {
        },
        __class_id__: 1,
        parents: [],
        __class_index__: {"1": ring.Object},
        isSubClass: function(other) {
            return this.__class_index__[other.__class_id__] !== undefined;
        }
    });
    _.extend(ring.Object.prototype, {
        $class: ring.Object,
        init: ring.Object.__properties__.init
    });

    var classCounter = 3;
    var fnTest = /xyz/.test(function(){xyz;}) ? /\$super\b/ : /.*/;

    /**
        ring.create([[className,] parents,] properties)

        Creates a new class and returns it.

        properties is a dictionary of the methods and attributes that should
        be added to the new class' prototype.

        parents is a list of the classes this new class should extend. If not
        specified or an empty list is specified this class will inherit from one
        class: ring.Object.
    */
    ring.create = function() {
        // arguments parsing
        var args = _.toArray(arguments);
        args.reverse();
        var props = args[0];
        var parents = args.length >= 2 ? args[1] : [];
        if (parents.length == 0)
            parents = [ring.Object];
        var id = classCounter++;
        // mro creation
        var toMerge = _.pluck(parents, "__mro__");
        toMerge = toMerge.concat([parents]);
        var __mro__ = [{__properties__: props}].concat(mergeMro(toMerge));
        //generate prototype
        var prototype = {};
        var keys = {};
        _.each(__mro__, function(c) {
            _.each(c.__properties__, function(v, k) {
                keys[k] = true;
            });
        });
        var getProperty = function(mro, key) {
            if (mro.length === 0)
                return undefined;
            var c = mro[0];
            if (c.__properties__[key] === undefined)
                return getProperty(_.rest(mro), key);
            var p = c.__properties__[key];
            if (typeof p !== "function" || ! fnTest.test(p))
                return p;
            var sup = getProperty(_.rest(mro), key);
            if (! typeof sup === "function")
                return p;
            return (function(sup) {
                return function() {
                    var tmp = this.$super;
                    this.$super = sup;
                    var ret = p.apply(this, arguments);
                    this.$super = tmp;
                    return ret;
                };
            })(sup);
        };
        _.each(keys, function(v, k) {
            prototype[k] = getProperty(__mro__, k);
        });
        // create real class
        var claz = function Instance() {
            this.$super = null;
            this.init.apply(this, arguments);
        };
        __mro__[0] = claz;
        claz.__mro__ = __mro__;
        claz.parents = parents;
        claz.__properties__ = props;
        claz.prototype = prototype;
        prototype.$class = claz;
        claz.__class_id__ = id;
        // construct classes index
        claz.__class_index__ = {};
        _.each(claz.__mro__, function(c) {
            claz.__class_index__[c.__class_id__] = c;
        });
        claz.isSubClass = ring.Object.isSubClass;
        // class init
        if (claz.prototype.$classInit) {
            claz.__class_init__ = claz.prototype.$classInit;
            delete claz.prototype.$classInit;
        }
        _.each(_.chain(claz.__mro__).clone().reverse().value(), function(c) {
            if (c.__class_init__) {
                var ret = c.__class_init__(claz.prototype);
                if (ret !== undefined)
                    claz.prototype = ret;
            }
        });

        return claz;
    };

    var mergeMro = function(toMerge) {
        // C3 merge() implementation
        var __mro__ = [];
        var current = _.clone(toMerge);
        while (true) {
            var found = false;
            for (var i=0; i < current.length; i++) {
                if (current[i].length == 0)
                    continue;
                var currentClass = current[i][0];
                var isInTail = _.find(current, function(lst) {
                    return _.contains(_.rest(lst), currentClass);
                });
                if (! isInTail) {
                    found = true;
                    __mro__.push(currentClass);
                    current = _.map(current, function(lst) {
                        if (_.head(lst) === currentClass)
                            return _.rest(lst);
                        else
                            return lst;
                    });
                    break;
                }
            }
            if (found)
                continue;
            if (_.all(current, function(i) { return i.length ==0; }))
                return __mro__;
            throw new ring.ValueError("Cannot create a consistent method resolution order (MRO)");
        };
    };

    /**
        ring.instance(obj, type)

        Returns true if obj is an instance of type or an instance of a sub-class of type.

        It is necessary to use this method instead of instanceof when using the Ring.js class
        system because instanceof will not be able to detect sub-classes.

        If used with obj or type that do not use the Ring.js class system this method will
        use instanceof instead. So it should be safe to replace all usages of instanceof
        by ring.instance() in any program, whether or not it uses Ring.js.

        Additionaly this method allows to test the type of simple JavaScript types like strings.
        To do so, pass a string instead of a type as second argument. Examples:

            ring.instance("", "string") // returns true
            ring.instance(function() {}, "function") // returns true
            ring.instance({}, "object") // returns true
            ring.instance(1, "number") // returns true
    */
    ring.instance = function(obj, type) {
        if (typeof(obj) === "object" && obj.$class &&
            typeof(type) === "function" && typeof(type.__class_id__) === "number") {
            return obj.$class.isSubClass(type);
        }
        if (typeof(type) === "string")
            return typeof(obj) === type;
        return obj instanceof type;
    };

    /**
        A class to easily create new classes representing exceptions. This class is special
        because it is a sub-class of the standard Error class of JavaScript. Examples:

        ring.instance(e, Error)

        e instanceof Error

        This two expressions will always be true if e is an instance of ring.Error or any
        sub-class of ring.Error.

    */
    ring.Error = ring.create("RingError", [], {
        /**
            The name attribute is used in the default implementation of the toString() method
            of the standard JavaScript Error class. According to the standard, all sub-classes
            of Error should define a new name.
        */
        name: "ring.Error",
        /**
            A default message to use in instances of this class if there is no arguments given
            to the constructor.
        */
        defaultMessage: "",
        /**
            Constructor arguments:

            message: The message to put in the instance. If there is no message specified, the
            message will be this.defaultMessage.
        */
        init: function(message) {
            this.message = message || this.defaultMessage;
        },
        $classInit: function(prototype) {
            var p = new Error();
            _.extend(p, prototype);
            return p;
        }
    });

    /**
        A type of exception to inform that a method received an argument with an incorrect value.
    */
    ring.ValueError = ring.create([ring.Error], {
        name: "ring.ValueError"
    });

    return ring;
};
})();
