/**
 * OOP utils.  If included, the OOP methods are added to the YUI instance
 * @module oop
 */
YUI.add("oop", function(Y) {

    var L = Y.Lang, 
    A = Y.Array,
    OP = Object.prototype,
    O;

    /**
     * The following methods are added to the YUI instance
     * @class YUI~oop
     */

    /**
     * Applies prototype properties from the supplier to the receiver.
     * The receiver can be a constructor or an instance.
     * @method augment
     * @param {Function} r  the object to receive the augmentation
     * @param {Function} s  the object that supplies the properties to augment
     * @param ov {boolean} if true, properties already on the receiver
     * will be overwritten if found on the supplier.
     * @param wl {string[]} a whitelist.  If supplied, only properties in 
     * this list will be applied to the receiver.
     * @param args {Array | Any} arg or arguments to apply to the supplier
     * constructor when initializing.
     * @return {object} the augmented object
     *
     * @todo constructor optional?
     * @todo understanding what an instance is augmented with
     * @TODO evaluate if we can do this in a way that doesn't interfere
     * with normal inheritance
     */
    Y.augment = function(r, s, ov, wl, args) {

        var sProto = s.prototype, newProto = null, construct = s, 
            a = (args) ? Y.Array(args) : [], rProto = r.prototype, 
            target =  rProto || r, applyConstructor = false;

        // working on a class, so apply constructor infrastructure
        if (rProto && construct) {


            // Y.Do.before(r, construct);

            var sequestered = {}, replacements = {};
            newProto = {};

            // sequester all of the functions in the supplier and replace with
            // one that will restore all of them.
            Y.each(sProto, function(v, k) {


                // var initialized = false;

                replacements[k] = function() {

                    var me = this;


                    // overwrite the prototype with all of the sequestered functions,
                    // but only if it hasn't been overridden
                    for (var i in sequestered) {
                        if (Y.Object.owns(sequestered, i) && (me[i] === replacements[i])) {
                            me[i] = sequestered[i];
                        }
                    }

                    // apply the constructor
                    construct.apply(me, a);

                    // apply the original sequestered function
                    return sequestered[k].apply(me, arguments);

                };

                if ((!wl || (k in wl)) && (ov || !(k in this))) {


                    if (L.isFunction(v)) {

                        // sequester the function
                        sequestered[k] = v;

                        // replace the sequestered function with a function that will
                        // restore all sequestered functions and exectue the constructor.
                        this[k] = replacements[k];

                    } else {


                        this[k] = v;
                    }

                }

            }, newProto, true);

        // augmenting an instance, so apply the constructor immediately
        } else {
            applyConstructor = true;
        }

        Y.mix(target, newProto || sProto, ov, wl);

        if (applyConstructor) {
            s.apply(target, a);
        }

        return r;
    };

    /**
     * Applies object properties from the supplier to the receiver.  If
     * the target has the property, and the property is an object, the target
     * object will be augmented with the supplier's value.  If the property
     * is an array, the suppliers value will be appended to the target.
     * @method aggregate
     * @param {Function} r  the object to receive the augmentation
     * @param {Function} s  the object that supplies the properties to augment
     * @param ov {boolean} if true, properties already on the receiver
     * will be overwritten if found on the supplier.
     * @param wl {string[]} a whitelist.  If supplied, only properties in 
     * this list will be applied to the receiver.
     * @return {object} the extended object
     */
    Y.aggregate = function(r, s, ov, wl) {
        return Y.mix(r, s, ov, wl, 0, true);
    };

    /**
     * Utility to set up the prototype, constructor and superclass properties to
     * support an inheritance strategy that can chain constructors and methods.
     * Static members will not be inherited.
     *
     * @method extend
     * @param {Function} r   the object to modify
     * @param {Function} s the object to inherit
     * @param {Object} px prototype properties to add/override
     * @param {Object} sx static properties to add/override
     * @return {YUI} the YUI instance
     */
    Y.extend = function(r, s, px, sx) {
        if (!s||!r) {
            Y.fail("extend failed, verify dependencies");
        }

        var sp = s.prototype, rp=Y.Object(sp), i;
        r.prototype=rp;

        rp.constructor=r;
        r.superclass=sp;

        // If the superclass doesn't have a standard constructor,
        // define one so that Super() works
        if (s != Object && sp.constructor == OP.constructor) {
            sp.constructor=s;
        }
    
        // Add object properties too
        // @TODO removed for now because it isn't that useful and
        // has caused a few issues overwriting things that should
        // not be.  You can do this manually if needed.  Revisit
        // if this is something that really is needed for some
        // reason.
        // Y.mix(r, s);

        // Add superclass convienience functions 
        // @TODO revisit when we have something that works
        // Y.augment(r, Ext);

        // Add prototype overrides
        if (px) {
            Y.mix(rp, px, true);
        }

        // Add object overrides
        if (sx) {
            Y.mix(r, sx, true);
        }

        return r;
    };

    /**
     * Executes the supplied function for each item in
     * a collection.  Supports arrays, objects, and
     * Y.NodeLists
     * @method each
     * @param o the object to iterate
     * @param f the function to execute.  This function
     * receives the value, key, and object as parameters
     * @param proto if true, prototype properties are
     * iterated on objects
     * @return {YUI} the YUI instance
     */
    Y.each = function(o, f, c, proto) {

        if (o.each && o.item) {
            return o.each.call(o, f, c);
        } else {
            switch (A.test(o)) {
                case 1:
                    return A.each(o, f, c);
                case 2:
                    return A.each(Y.Array(o, 0, true), f, c);
                default:
                    return Y.Object.each(o, f, c, proto);
            }
        }

        // return Y.Object.each(o, f, c);
    };

    /**
     * Deep obj/array copy.  Functions will are cloned with Y.bind.
     * Array-like objects are treated as arrays.
     * primitives are returned untouched.  Optionally a
     * function can be provided to handle other data types,
     * filter keys, validate values, etc.
     *
     * @method clone
     * @param o what to clone
     * @param safe {boolean} if true, objects will not have prototype
     * items from the source.  If false, it does.  In this case, the
     * original is initally protected, but the clone is not completely immune
     * from changes to the source object prototype.  Also, cloned prototype
     * items that are deleted from the clone will result in the value
     * of the source prototype to be exposed.  If operating on a non-safe
     * clone, items should be nulled out rather than deleted.
     * @TODO review
     * @param f optional function to apply to each item in a collection
     *          it will be executed prior to applying the value to
     *          the new object.  Return false to prevent the copy.
     * @param c optional execution context for f
     * @param owner Owner object passed when clone is iterating an
     * object.  Used to set up context for cloned functions.
     * @return {Array|Object} the cloned object
     */
    Y.clone = function(o, safe, f, c, owner) {

        if (!L.isObject(o)) {
            return o;
        }
        
        if (L.isDate(o)) {
            return new Date(o);
        }

        var func = L.isFunction(o), o2;

        if (func) {
            if (o instanceof RegExp) {
                return new RegExp(o.source);
            }
            o2 = Y.bind(o, owner);
        } else {
            o2 = (safe) ? {} : Y.Object(o);
        }

        Y.each(o, function(v, k) {
            if (!f || (f.call(c || this, v, k, this, o) !== false)) {
                this[k] =  Y.clone(v, safe, f, c, this);
            }
        }, o2);

        return o2;
    };
    
    /**
     * Returns a function that will execute the supplied function in the
     * supplied object's context, optionally adding any additional
     * supplied parameters to the end of the arguments the function
     * is executed with.
     *
     * In some cases it is preferable to have the additional arguments
     * applied to the beginning of the function signature.  For instance,
     * FireFox setTimeout/setInterval supplies a parameter that other
     * browsers do not.  
     * Note: YUI provides a later() function which wraps setTimeout/setInterval,
     * providing context adjustment and parameter addition.  This can be 
     * used instead of setTimeout/setInterval, avoiding the arguments
     * collection issue when using bind() in FireFox.
     *
     * @TODO review param order for PR2
     * @method bind
     * @param f {Function} the function to bind
     * @param c the execution context
     * @param args* 0..n arguments to append to the end of arguments collection
     * supplied to the function
     * @return {function} the wrapped function
     */
    Y.bind = function(f, c) {
        var a = Y.Array(arguments, 2, true);
        return function () {
            return f.apply(c || f, Y.Array(arguments, 0, true).concat(a));
        };
    };

    /*
     * Returns a function that will execute the supplied function in the
     * supplied object's context, optionally adding any additional
     * supplied parameters to the beginning of the arguments collection the 
     * supplied to the function.
     *
     * In some cases it is preferable to have the additional arguments
     * applied to the end of the function signature.  @see bind for a version 
     * that does this.
     *
     * @TODO consider adding this in PR2
     *
     * @method rbind
     * @param f {Function} the function to bind
     * @param c the execution context
     * @param args* 0..n arguments to append to the arguments collection for the function
     * @return {function} the wrapped function
     */
    // Y.rbind = function(f, c) {
    //     var a = Y.Array(arguments, 2, true);
    //     return function () {
    //         return f.apply(c || f, a.concat(Y.Array(arguments, 0, true)));
    //     };
    // };


}, "@VERSION@");
