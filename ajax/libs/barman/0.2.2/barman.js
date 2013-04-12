//     barman 0.2.2
//     https://github.com/dfernandez79/barman
//     Copyright (c) 2013 Diego Fernandez
//     Barman may be freely distributed under the MIT license.

(function () {

    'use strict';

    function factory() {
        //
        // Common helper functions
        // -----------------------

        // These common helper functions are based on _underscore_ and _lodash_ implementations.
        //
        // Why these are included inline? Why not having a dependency to some _underscore_ compatible library?
        //
        // Because *barman* uses only a few functions, and the additional dependency made the setup hard.
        // So after evaluating the trade-offs, they were included here.
        //

        var ArrayProto = Array.prototype,
            nativeForEach = ArrayProto.forEach,
            slice = ArrayProto.slice,
            indexOf = ArrayProto.indexOf ? ArrayProto.indexOf : function ( value ) {
                /*jshint validthis: true */
                for ( var i = 0, len = this.length; i < len; i++ ) {
                    if ( this[i] === value ) {
                        return i;
                    }
                }
                return -1;
            };

        // #### isUndefined( _value_ )
        //
        // A shortcut for `typeof`.
        //
        function isUndefined( value ) {
            return typeof value == 'undefined';
        }

        // #### isFunction( _value_ )
        //
        // A shortcut for `typeof`.
        //
        function isFunction( value ) {
            return typeof value === 'function';
        }

        // #### has( _object_, _property_ )
        //
        // A _safe_ version of `hasOwnProperty`.
        //
        function has( object, property ) {
            return object ? Object.prototype.hasOwnProperty.call(object, property) : false;
        }

        // #### isObject( _value_ )
        //
        // Check if _value_ it's an object. It handles the _null_ corner case better than `typeof`.
        //
        function isObject( value ) {
            return value === Object(value);
        }


        // #### `each` helper functions
        //
        // Of all the common helper functions `each` is the only one that differs from _underscore_ or
        // _lodash_. The main difference is that it ensures to iterate over the JScript (IE < 9) hidden
        // object properties.
        //
        // JScript has a known bug in `for.. in` loops that ignores some redefined `Object` properties. The
        // `JSCRIPT_NON_ENUMERABLE` array contains those ignored properties, so we iterate over them in the `each`
        // function.
        //
        var JSCRIPT_NON_ENUMERABLE = [ 'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
                                       'toLocaleString', 'toString', 'valueOf' ];

        function engineIgnoresObjectProps() {
            var obj = {constructor: 1};
            for ( var key in obj ) {
                if ( has(obj, key) ) {
                    return false;
                }
            }
            return true;
        }

        //
        // The special case for JScript is handled by different implementations of the `eachKey` internal function.
        //
        var eachKey = engineIgnoresObjectProps() ? function ( obj, func, context ) {

            var i, len, jscriptNonEnumCalled = false;

            for ( var key in obj ) {
                if ( has(obj, key) ) {
                    func.call(context, obj[key], key, obj);
                    jscriptNonEnumCalled = jscriptNonEnumCalled || indexOf.call(JSCRIPT_NON_ENUMERABLE, key) !== -1;
                }
            }

            if ( !jscriptNonEnumCalled ) {
                for ( i = 0, len = JSCRIPT_NON_ENUMERABLE.length; i < len; i++ ) {
                    if ( has(obj, JSCRIPT_NON_ENUMERABLE[i]) ) {
                        func.call(context, obj[JSCRIPT_NON_ENUMERABLE[i]], JSCRIPT_NON_ENUMERABLE[i], obj);
                    }
                }
            }

        } : function ( obj, func, context ) {
            for ( var key in obj ) {
                if ( has(obj, key) ) {
                    func.call(context, obj[key], key, obj);
                }
            }
        };

        // #### each( _obj_, _func_, _context_ )
        //
        // Same as <http://underscorejs.org/#each> but takes account of the special JScript case.
        //
        function each( obj, func, context ) {
            var i, len;

            if ( obj === null ) {
                return;
            }

            if ( nativeForEach && obj.forEach === nativeForEach ) {
                obj.forEach(func, context);
            } else if ( obj.length === +obj.length ) {
                for ( i = 0, len = obj.length; i < len; i++ ) {
                    func.call(context, obj[i], i, obj);
                }
            } else {
                eachKey(obj, func, context);
            }
        }

        // #### extend( _obj_, ... )
        //
        // Same as <http://underscorejs.org/#extend> but uses `each` to iterate, so we handle the JScript special case
        // properly.
        //
        function extend( obj ) {
            each(slice.call(arguments, 1), function ( source ) {
                if ( source ) {
                    each(source, function ( value, prop ) { obj[prop] = value; });
                }
            });
            return obj;
        }


        // Merge
        // -----

        // `merge` is one of the main functions of *barman*.
        //
        // It's similar to the commonly used `extend({}, o1,...,oN)`, but it uses the following strategy
        // for overwriting properties:
        //
        // * if values are different, the destination property is marked as `conflict`
        // * if one of the values is marked as `required`, the destination property uses the value not marked as
        //   required


        // ### Merge helper functions

        // #### mapProperties(_srcObj_, _iterator_, _result_)
        //
        // Returns a new object where each property is the result of applying the `iterator` function over `srcObj`:
        //
        //     result.prop = iterator(srcObj.prop, 'prop');
        //
        // _result_ is optional, and an empty object will be used if it's omitted.
        //
        function mapProperties( srcObj, iterator, result ) {

            if ( !result ) { result = {}; }

            if ( srcObj ) {
                each(srcObj, function ( value, prop ) {

                    result[prop] = iterator.call(this, value, prop);

                }, result);
            }

            return result;
        }

        // #### conflict()
        //
        // Throws an error. Used to indicate _merge conflicts_.
        //
        function conflict() {
            throw new Error(
                'This property was defined by multiple merged objects, override it with the proper implementation');
        }

        // #### required()
        //
        // Throws an error. Used to indicate that an implementation is required.
        //
        function required() {
            throw new Error('An implementation is required');
        }

        // #### mergeProperty(_value_, _prop_)
        //
        // Used by `merge` to map each property.
        //
        function mergeProperty( value, prop ) {

            /*jshint validthis:true */

            // The `this` context is set to the merge destination object, while
            // the arguments `value` and `prop` contains the property-value pair to merge.
            var thisValue = this[prop];

            if ( isUndefined(thisValue) || thisValue === value || thisValue === required ) {
                // If the property is not defined in the target object,
                // or both values are the same,
                // or the target value is the `required` marker; use the given `value`.

                return value;

            } else if ( value === required ) {
                // If the given `value` is the `required` marker, use the existing property value.

                return thisValue;

            } else {
                // If both values are different, but not undefined or required, return the `conflict` marker.

                return conflict;
            }
        }

        // #### merge(_object_,...)
        //
        // Returns a new object, that is the result of merging the properties of each one of the given objects.
        //
        function merge() {

            var result = {};

            each(arguments, function ( obj ) {

                mapProperties(obj, mergeProperty, result);

            });

            return result;
        }


        // Nil
        // ---

        // `Nil` is the root of the *barman* _class hierarchy_.
        function Nil() { }

        // Every *barman* _class_ has a `__super__` property that returns the parent prototype.
        // The parent of `Nil` is `Nil`.
        Nil.__super__ = Nil.prototype;

        // #### \_applySuper(_methodName_, _\[ arguments \]_)
        //
        // Allows to call the `__super__` implementation of a method.
        // It's similar to `Function.apply` but it always uses `this` as context.
        //
        // The _methodName_ argument is required, and an error is thrown if it's omitted.
        //
        // Note that this function only works if the `__super__` attribute wasn't removed from the constructor.
        //
        Nil.prototype._applySuper = function ( methodName, args ) {

            var superPrototype = this.constructor.__super__,
                superProp = superPrototype[methodName];

            if ( !methodName ) {
                throw new Error('The name of the method to call is required');
            }

            if ( isUndefined(superProp) ) {
                throw new ReferenceError("__super__ doesn't define a method named " + name);
            }

            // When no arguments is given `apply` is called as a special case, because on IE8 calling `apply` with
            // undefined arguments throws an exception.
            if ( isUndefined(args) ) {
                return superProp.apply(this);
            } else {
                return superProp.apply(this, args);
            }
        };

        // #### \_callSuper(_methodName_, _\[ arg1, ... \]_)
        //
        // The variable arguments version of `_applySuper`.
        //
        Nil.prototype._callSuper = function ( methodName ) {
            return this._applySuper(methodName, slice.call(arguments, 1));
        };


        // Default class factory
        // ---------------------

        // Extension and creation of _classes_ is delegated to _ClassFactory_ objects.
        //
        // Those objects are marked with the special attribute _CLASS\_FACTORY\_ATTRIBUTE_, so they can be distinguished
        // by _Class.create_ and _Nil.extend_.
        //
        var CLASS_FACTORY_ATTRIBUTE = '*classFactory*';

        // #### markAsClassFactory(_obj_)
        //
        // Adds the _CLASS\_FACTORY\_ATTRIBUTE_ to an object.
        //
        function markAsClassFactory( obj ) {
            obj[CLASS_FACTORY_ATTRIBUTE] = true;
            return obj;
        }

        // #### isClassFactory(_obj_)
        //
        // Returns true if the object is marked as a class factory.
        //
        function isClassFactory( obj ) {
            return isObject(obj) && obj[CLASS_FACTORY_ATTRIBUTE] === true;
        }

        // #### clone(_obj_)
        //
        // Makes a shallow clone on an object. If the JavaScript engine implements `Object.create` we use it. If not
        // we fallback to the usual "clone by using new" approach.
        //
        var clone = has(Object, 'create') ? Object.create : function ( proto ) {
            function Empty() {}

            Empty.prototype = proto;
            return new Empty();
        };

        // ### defaultClassFactory object
        //
        // It's the default implementation of a _ClassFactory_, and one of the _core_ functions of *barman*.
        //
        var defaultClassFactory = markAsClassFactory({

            // #### createClass( _Parent_, _instanceMethods_, _staticMethods_ )
            //
            createClass: function ( Parent, instanceMethods, staticMethods ) {

                // * Clone the `Parent.prototype` and extend it with the sub-class methods. 
                var proto = extend(clone(Parent.prototype), instanceMethods);

                // * Check if we define a _constructor_, if not define one that calls the parent constructor.
                if ( !has(proto, 'constructor') ) {

                    proto.constructor = function () { Parent.apply(this, arguments); };

                } else if ( !isFunction(proto.constructor) ) {

                    throw new TypeError('The constructor property must be a function');

                }

                // * Extend the constructor function with the `staticMethods.
                var ctor = extend(proto.constructor, staticMethods, {__super__: Parent.prototype });

                // * Ensure that `_callSuper` and `_applySuper` are defined.
                if ( isUndefined(proto._callSuper) ) { proto._callSuper = Nil.prototype._callSuper; }
                if ( isUndefined(proto._applySuper) ) { proto._applySuper = Nil.prototype._applySuper; }

                // * Finally ensure that the costructor has the right prototype and `extend` function. Note that
                // you can't redefine `extend` with the `staticMethods`, if you want to customize `extend` use a
                // _ClassFactory_.
                ctor.prototype = proto;
                ctor.extend = Nil.extend;

                return ctor;
            }

        });


        // Convenience class creation functions
        // ------------------------------------

        // #### Nil.extend( _\[classFactory\]_, _args_ )
        //
        // If no `classFactory` is given it uses `defaultClassFactory`. The interpretation of the rest arguments depends
        // on the _ClassFactory_, see `defaultClassFactory.createClass`.
        // 
        Nil.extend = function () {
            var args = slice.call(arguments),
                classFactory = (isClassFactory(args[0])) ? args.shift() : defaultClassFactory;

            args.unshift(this);

            return classFactory.createClass.apply(classFactory, args);
        };

        // #### Class.create( _\[classFactory\]_, _args_ )
        //
        // It's a shortcut to `Nil.extend`.
        //
        var Class = {
            create: function () {
                return Nil.extend.apply(Nil, arguments);
            }
        };

        // #### subclassOf( _Parent_, _args_ )
        //
        // A shortcut to `Nil.extend`, that makes easy to sub-class non-barman classes.
        //
        function subclassOf( Parent ) {
            return Nil.extend.apply(Parent, slice.call(arguments, 1));
        }

        // AbstractClassFactory
        // --------------------

        // Base class for custom class factories. It defines the class factory marker attribute, and provides
        // a convenience method to call the `defaultClassFactory`.
        //
        var AbstractClassFactory = Class.create({

            defaultCreateClass: function () {
                return defaultClassFactory.createClass.apply(defaultClassFactory, arguments);
            },

            createClass: required

        });
        markAsClassFactory(AbstractClassFactory.prototype);


        // TraitsClassFactory
        // ------------------
        //
        // A _ClassFactory_ that composes objects using _traits_.
        // For more information about _traits_ see the _Design Notes_ on the [README](../README.md).
        //
        var TraitsClassFactory = AbstractClassFactory.extend({

            constructor: function ( traits ) { this.traits = traits; },

            createClass: function ( Parent, instanceMethods, staticMethods ) {

                var traitComposition = merge.apply(null, this.traits),
                    newClass = this.defaultCreateClass(Parent, extend(traitComposition, instanceMethods), staticMethods);

                this._assertNoConflict(newClass.prototype);

                return newClass;

            },

            _assertNoConflict: function ( obj ) {
                var conflicts = [];
                each(obj, function ( value, name ) { if ( value === conflict ) { conflicts.push(name); } });

                if ( conflicts.length > 0 ) {
                    throw new Error('There is a merge conflict for the following properties: ' +
                        conflicts.sort().join(','));
                }
            }

        });

        // #### include( _trait_, ... )
        //
        // A nice way to create a `TraitsClassFactory` instance.
        //
        function include() {
            return new TraitsClassFactory(slice.call(arguments));
        }


        // Public function and objects
        // ---------------------------

        return {
            extend: extend,
            merge: merge,
            conflict: conflict,

            Nil: Nil,

            markAsClassFactory: markAsClassFactory,
            isClassFactory: isClassFactory,
            AbstractClassFactory: AbstractClassFactory,

            defaultClassFactory: defaultClassFactory,
            Class: Class,
            subclassOf: subclassOf,

            required: required,

            include: include
        };

    }

    // Module export
    // -------------

    // Barman can be used in different contexts:
    //
    if ( typeof define === 'function' && define.amd ) {
        // * If _define_ is a function for AMD, export barman using define.
        define([], factory);

    } else if ( typeof module !== 'undefined' && module.exports ) {
        // * If _module.exports_ is available (Node.js), export barman using it.
        module.exports = factory();

    } else {
        // * Otherwise, assume a browser environment and use the _window_ global to export the _barman_ variable.

        window.barman = factory();
    }

})();
