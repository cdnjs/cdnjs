// @define Ext.lang.Assert
// @define Ext.Assert
// @require Ext.lang.Error
//<debug>
/**
 * This class provides help value testing methods useful for diagnostics. These are often
 * used in `debugHooks`:
 * 
 *      Ext.define('Foo.bar.Class', {
 *
 *          debugHooks: {
 *              method: function (a) {
 *                  Ext.Assert.truthy(a, 'Expected "a" to be truthy");
 *              },
 *
 *              foo: function (object) {
 *                  Ext.Assert.isFunctionProp(object, 'doSomething');
 *              }
 *          }
 *      });
 * 
 * **NOTE:** This class is entirely removed in production builds so all uses of it should
 * be either in `debug` conditional comments or `debugHooks`.
 * 
 * The following type detection methods from the `Ext` object are wrapped as assertions
 * by this class:
 * 
 *  * `isEmpty`
 *  * `isArray`
 *  * `isDate`
 *  * `isObject`
 *  * `isSimpleObject`
 *  * `isPrimitive`
 *  * `isFunction`
 *  * `isNumber`
 *  * `isNumeric`
 *  * `isString`
 *  * `isBoolean`
 *  * `isElement`
 *  * `isTextNode`
 *  * `isDefined`
 *  * `isIterable`
 * 
 * These appear both their exact name and with a "Prop" suffix for checking a property on
 * an object. For example, these are almost identical:
 * 
 *      Ext.Assert.isFunction(object.foo);
 *
 *      Ext.Assert.isFunctionProp(object, 'foo');
 *
 * The difference is the default error message generated is better in the second use case
 * than the first.
 * 
 * The above list are also expanded for "Not" flavors (and "Not...Prop"):
 * 
 *  * `isNotEmpty`
 *  * `isNotArray`
 *  * `isNotDate`
 *  * `isNotObject`
 *  * `isNotSimpleObject`
 *  * `isNotPrimitive`
 *  * `isNotFunction`
 *  * `isNotNumber`
 *  * `isNotNumeric`
 *  * `isNotString`
 *  * `isNotBoolean`
 *  * `isNotElement`
 *  * `isNotTextNode`
 *  * `isNotDefined`
 *  * `isNotIterable`
 */
Ext.Assert = {

    /**
     * Checks that the first argument is falsey and throws an `Error` if it is not.
     */
    falsey: function (b, msg) {
        if (b) {
            Ext.Error.raise(msg || ('Expected a falsey value but was ' + b));
        }
    },

    /**
     * Checks that the first argument is falsey and throws an `Error` if it is not.
     */
    falseyProp: function (object, property) {
        Ext.Assert.truthy(object);
        var b = object[property];
        if (b) {
            if (object.$className) {
                property = object.$className + '#' + property;
            }
            Ext.Error.raise('Expected a falsey value for ' + property +
                            ' but was ' + b);
        }
    },

    /**
     * Checks that the first argument is truthy and throws an `Error` if it is not.
     */
    truthy: function (b, msg) {
        if (!b) {
            Ext.Error.raise(msg || ('Expected a truthy value but was ' + typeof b));
        }
    },

    /**
     * Checks that the first argument is truthy and throws an `Error` if it is not.
     */
    truthyProp: function (object, property) {
        Ext.Assert.truthy(object);
        var b = object[property];
        if (!b) {
            if (object.$className) {
                property = object.$className + '#' + property;
            }
            Ext.Error.raise('Expected a truthy value for ' + property +
                            ' but was ' + typeof b);
        }
    }
};

(function () {
    function makeAssert (name, kind) {
        var testFn = Ext[name],
            def;
        return function (value, msg) {
            if (!testFn(value)) {
                Ext.Error.raise(msg || def ||
                    (def = 'Expected value to be ' + kind));
            }
        };
    }

    function makeAssertProp (name, kind) {
        var testFn = Ext[name],
            def;
        return function (object, prop) {
            Ext.Assert.truthy(object);
            if (!testFn(object[prop])) {
                Ext.Error.raise(def || (def = 'Expected ' + 
                        (object.$className ? object.$className + '#' : '') +
                        prop + ' to be ' + kind));
            }
        };
    }

    function makeNotAssert (name, kind) {
        var testFn = Ext[name],
            def;
        return function (value, msg) {
            if (testFn(value)) {
                Ext.Error.raise(msg || def ||
                    (def = 'Expected value to NOT be ' + kind));
            }
        };
    }

    function makeNotAssertProp (name, kind) {
        var testFn = Ext[name],
            def;
        return function (object, prop) {
            Ext.Assert.truthy(object);
            if (testFn(object[prop])) {
                Ext.Error.raise(def || (def = 'Expected ' + 
                        (object.$className ? object.$className + '#' : '') +
                        prop + ' to NOT be ' + kind));
            }
        };
    }

    for (var name in Ext) {
        if (name.substring(0,2) == "is" && Ext.isFunction(Ext[name])) {
            var kind = name.substring(2);
            Ext.Assert[name] = makeAssert(name, kind);
            Ext.Assert[name + 'Prop'] = makeAssertProp(name, kind);
            Ext.Assert['isNot' + kind] = makeNotAssert(name, kind);
            Ext.Assert['isNot' + kind + 'Prop'] = makeNotAssertProp(name, kind);
        }
    }
}());

//</debug>
