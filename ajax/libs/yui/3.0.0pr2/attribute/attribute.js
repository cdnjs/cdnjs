YUI.add('attribute', function(Y) {

    /**
     * Managed Attribute Provider
     * @module attribute
     */

    /**
     * Maintain state for a collection of items.  Individual properties 
     * are stored in hash tables.  This is instead of having state objects 
     * for each item in the collection.  For large collections, especially 
     * changing ones, this approach may perform better.
     * 
     * @constructor
     * @class State
     */
    Y.State = function() { 

        /**
         * Hash of attributes
         * @property data
         */
        this.data = {};
    };

    Y.State.prototype = {

        /**
         * Add an item with all of the properties in the supplied object.
         * @method add
         * @param name {string} identifier for this attribute
         * @param o hash of attributes
         */
        add: function(name, o) {
            Y.each(o, function(v, k) {
                if (!this.data[k]) {
                    this.data[k] = {};
                }

                this.data[k][name] = v;
            }, this);
        },

        /**
         * Remove entire item, or optionally specified fields
         * @method remove
         * @param name {string} name of attribute
         * @param o {string|object|array} single key or collection of keys to delete
         */
        remove: function(name, o) {
            var d = this.data, 
                del = function(key) {
                    if (d[key] && (name in d[key])) {
                        delete d[key][name];
                    }
                };

            if (Y.Lang.isString(o)) {
                del(o);
            } else {
                Y.each(o || d, function(v, k) {
                    if(Y.Lang.isString(k)) {
                        del(k);
                    } else {
                        del(v);
                    }
                }, this);

            }
        },

        /**
         * For a given item, gets an attribute.  If key is not
         * supplied, a disposable object with all attributes is 
         * returned.  Use of the latter option makes sense when
         * working with single items, but not if object explosion
         * might cause gc problems.
         * @method get
         * @param name {string} name of attribute
         * @param key {string} optional attribute to get
         * @return either the value of the supplied key or an object with
         * all data.
         */
        // get: function(name, key, val) {
        get: function(name, key) {
            var d = this.data,
                o;

            if (key) {
                return (d[key] && name in d[key]) ?  d[key][name] : undefined;
            } else {
                Y.each(d, function(v, k) {
                    if (name in d[k]) {
                        o = o || {};
                        o[k] = v[name];
                    }
                }, this);

                return o;

            }
        }

        // figure out what kind of functionality we may need here
        // get whole list
        // get a list of items and values for a given key
        // get a list of items where a key has the supplied value
        /*
        list: function(key, val) {
            var o = {}, d = this.data, test = !L.isUndefined(val);

            Y.each(this, function(v, k) {

                // verify key
                if (key && k !== key) {
                    return;
                // verify value.  note, v will be the item names, so this
                // isn't working ... need to iterate v items
                } else if (test && v !== val) {
                    return;
                }

                o[k] = v;

            }, this);

            return o;
        }
        */
    };

    /**
     * Managed Attribute Provider
     * @module attribute
     */

    var O = Y.Object,

        DOT = ".",
        CHANGE = "Change",
        GET = "get",
        SET = "set",
        VALUE = "value",
        CLONE = "clone",
        READ_ONLY = "readOnly",
        WRITE_ONCE = "writeOnce",
        VALIDATOR = "validator",

        CLONE_ENUM;

    /**
     * <p>
     * Attribute provides managed attribute support. 
     * </p>
     * <p>
     * The class is designed to be augmented onto a host class, 
     * and allows the host to support get/set methods for attributes,
     * initial configuration support and attribute change events.
     * </p>
     * <p>Attributes added to the host can:</p>
     * <ul>
     *     <li>Be defined as read-only.</li>
     *     <li>Be defined as write-once.</li>
     *     <li>Be defined with a set function, used to manipulate
     *     values passed to Attribute's set method, before they are stored.</li>
     *     <li>Be defined with a validator function, to validate values before they are stored.</li>
     *     <li>Be defined with a get function, which can be used to manipulate stored values,
     *     before they are returned by Attribute's get method.</li>
     *     <li>Specify if and how they should be cloned on 'get' (see <a href="#property_CLONE">Attribute.CLONE</a> for supported clone modes).</li>
     * </ul>
     *
     * <p>See the <a href="#method_addAtt">addAtt</a> method, for details about how to add attributes with
     * a specific configuration</p>
     *
     * @class Attribute
     * @uses Event.Target
     */
    function Attribute() {
        Y.Event.Target.call(this, {emitFacade:true});
        this._conf = this._conf || new Y.State();
    }

    /**
     * <p>
     * Constants for clone formats supported by Attribute.
     * </p>
     * <p>
     * By default attribute values returned by the get method
     * are not cloned. However setting the attribute's "clone"
     * property to:
     * </p>
     * <dl>
     *     <dt>Attribute.CLONE.DEEP</dt>
     *     <dd>Will result in a deep cloned value being returned
     *        (using YUI's clone method). This can be expensive for complex
     *        objects.
     *     </dd>
     *     <dt>Attribute.CLONE.SHALLOW</dt>
     *     <dd>Will result in a shallow cloned value being returned
     *        (using YUI's merge method).
     *     </dd>
     *     <dt>Attribute.CLONE.IMMUTABLE</dt>
     *     <dd>Will result in a deep cloned value being returned
     *         when using the get method. Additionally users will
     *         not be able to set sub values of the attribute 
     *         using the complex attribute notation (obj.set("x.y.z, 5)).
     *         However the value of the attribute can be changed, making
     *         it different from a READONLY attribute.
     *     </dd>
     *     <dt>Attribute.CLONE.NONE</dt>
     *     <dd>
     *         The value will not be cloned, resulting in a reference
     *         to the stored value being passed back, if the value is an object.
     *         This is the default behavior.
     *     </dd>
     * </dl>
     * 
     * @property CLONE
     * @static
     * @final
     * @type Object
     */
    Attribute.CLONE = {
        NONE : 0,
        DEEP : 1,
        SHALLOW : 2,
        IMMUTABLE: 3
    };

    CLONE_ENUM = Attribute.CLONE;

    Attribute.prototype = {
        /**
         * <p>
         * Adds an attribute, with the provided configuration to the host object. Intended
         * to be used by the host object to setup it's set of available attributes.
         * </p>
         * <p>
         * The config argument object literal supports the following optional properties:
         * </p>
         * <dl>
         *    <dt>value &#60;Any&#62;</dt>
         *    <dd>The initial value to set on the attribute</dd>
         *    <dt>readOnly &#60;Boolean&#62;</dt>
         *    <dd>Whether or not the attribute is read only. Attributes having readOnly set to true
         *        cannot be set by invoking the set method.</dd>
         *    <dt>writeOnce &#60;Boolean&#62;</dt>
         *    <dd>Whether or not the attribute is "write once". Attributes having writeOnce set to true, 
         *        can only have their values set once, be it through the default configuration, 
         *        constructor configuration arguments, or by invoking set.</dd>
         *    <dt>set &#60;Function&#62;</dt>
         *    <dd>The setter function to be invoked (within the context of the host object) before 
         *        the attribute is stored by a call to the set method. The value returned by the 
         *        set function will be the finally stored value.</dd>
         *    <dt>get &#60;Function&#62;</dt>
         *    <dd>The getter function to be invoked (within the context of the host object) before
         *    the stored values is returned to a user invoking the get method for the attribute.
         *    The value returned by the get function is the final value which will be returned to the 
         *    user when they invoke get.</dd>
         *    <dt>validator &#60;Function&#62;</dt>
         *    <dd>The validator function which is invoked prior to setting the stored value. Returning
         *    false from the validator function will prevent the value from being stored</dd>
         *    <dt>clone &#60;int&#62;</dt>
         *    <dd>If and how the value returned by a call to the get method, should be de-referenced from
         *    the stored value. By default values are not cloned, and hence a call to get will return
         *    a reference to the stored value. See Attribute.CLONE for more details about the clone 
         *    options available</dd>
         * </dl>
         *
         * @method addAtt
         * 
         * @param {String} name The attribute key
         * @param {Object} config (optional) An object literal specifying the configuration for the attribute.
         * <strong>NOTE:</strong> The config object is modified when adding an attribute, 
         * so if you need to protect the original values, you will need to merge or clone the object.
         * 
         */
        addAtt: function(name, config) {
            var value, hasValue = (VALUE in config);


            if(hasValue) {
                value = config.value;
                delete config.value;
            }

            config.initValue = value;
            this._conf.add(name, config);

            if (hasValue) {
                this.set(name, value);
            }
        },

        /**
         * Resets the given attribute or all attributes to the initial value.
         *
         * @method reset
         * @param {String} name optional An attribute to reset.  If omitted, all attributes are reset
         */
        reset: function(name) {
            if (name) {
                this.set(name, this._conf.data['initValue'][name]);
            } else {
                var initVals = this._conf.data['initValue'];
                Y.each(initVals, function(v, n) {
                    this._set(n, v);
                }, this);
            }
        },

        /**
         * Removes an attribute.
         *
         * @method removeAtt
         * @param {String} name The attribute key
         */
        removeAtt: function(name) {
            this._conf.remove(name);
        },

        /**
         * Returns the current value of the attribute. If the attribute
         * has been configured with a 'get' handler, this method will delegate
         * to the 'get' handler to obtain the value of the attribute.
         * The 'get' handler will be passed the current value of the attribute 
         * as the only argument.
         *
         * @method get
         *
         * @param {String} key The attribute whose value will be returned. If
         * the value of the attribute is an Object, dot notation can be used to
         * obtain the value of a property of the object (e.g. <code>get("x.y.z")</code>)
         * 
         * @return {Any} The current value of the attribute
         */
        get: function(name) {

            var conf = this._conf,
                path,
                getFn,
                clone,
                val;

            if (name.indexOf(DOT) !== -1) {
                path = name.split(DOT);
                name = path.shift();
            }

            val = conf.get(name, VALUE);
            getFn = conf.get(name, GET);
            clone = conf.get(name, CLONE);

            val = (clone) ? this._cloneAttVal(val, clone) : val;
            val = (getFn) ? getFn.call(this, val) : val;
            val = (path) ? this._getSubAttVal(path, val) : val;

            return val;
        },

        /**
         * Allows setting of readOnly/writeOnce attributes.
         *
         * @method _set
         * @protected
         * @chainable
         * @return {Object} Reference to the host object
         */
        _set: function(name, val, opts) {
            return this.set(name, val, opts, true);
        },

        /**
         * Sets the value of an attribute.
         *
         * @method set
         * @chainable
         * 
         * @param {String} name The name of the attribute. Note, if the 
         * value of the attribute is an Object, dot notation can be used
         * to set the value of a property within the object 
         * (e.g. <code>set("x.y.z", 5)</code>), if the attribute has not
         * been declared as an immutable attribute (see <a href="#property_CLONE">Attribute.CLONE</a>).
         * 
         * @param {Any} value The value to apply to the attribute
         * 
         * @param {Object} opts Optional event data. This object will be mixed into
         * the event facade passed as the first argument to subscribers 
         * of attribute change events
         * 
         * @return {Object} Reference to the host object
         */
        set: function(name, val, opts, privateSet) {
            var conf = this._conf,
                data = conf.data,
                strPath,
                path,
                currVal,
                initialSet = (!data.value || !(name in data.value));

            if (name.indexOf(DOT) !== -1) {
                strPath = name;
                path = name.split(DOT);
                name = path.shift();
            }

            if (path && conf.get(name, CLONE) === CLONE_ENUM.IMMUTABLE) {
                return this;
            }

            if (!initialSet && !privateSet) {
                if (conf.get(name, WRITE_ONCE)) {
                    return this;
                }
                if (conf.get(name, READ_ONLY)) {
                    return this;
                }
            }

            if (!conf.get(name)) {
                return this;
            }

            currVal = this.get(name);

            if (path) {
               val = this._setSubAttVal(path, Y.clone(currVal), val);
               if (val === undefined) {
                   // Path not valid, don't set anything.
                   return this;
               }
            }

            this._fireAttChange(name, currVal, val, name, strPath, opts);

            return this;
        },

        /**
         * <p>
         * Alias for the Event.Target <a href="Event.Target.html#method_subscribe">subscribe</a> method.
         * </p>
         * 
         * <p>Subscribers using this method to listen for attribute change events will be notified just
         * <strong>before</strong> the state of the attribute has been modified, and before the default handler has been
         * invoked.</p>
         * 
         * <p>The <a href="Event.Target.html#method_after">after</a> method, inherited from Event Target, can be used by subscribers
         * who wish to be notified <strong>after</strong> the attribute's value has changed.</p>
         * 
         * @param {String} type The event type. For attribute change events, the event type is "[Attribute Name]Change", e.g.
         * for the attribute "enabled", the event type will be "enabledChange".
         * @param {Function} fn The subscribed function to invoke
         * @param {Object} context Optional execution context
         * @param {Any*} args* 0..n additional arguments to append to supply to the subscribed function when the event fires.
         * @method on
         * @return {Event.Handle} The handle object for unsubscribing the subscriber from the event.
         */
        on : function() {
            return this.subscribe.apply(this, arguments);
        },

        /**
         * Default handler implementation for set events
         *
         * @private
         * @method _defAttSet
         * @param {Event.Facade} e The event object for the custom event
         */
        _defAttSet : function(e) {
            var conf = this._conf,
                name = e.attrName,
                val = e.newVal,
                retVal,
                valFn  = conf.get(name, VALIDATOR),
                setFn = conf.get(name, SET);

            if (setFn) {
                retVal = setFn.call(this, val);
                if (retVal !== undefined) {
                    val = retVal; // setter can change value
                }
            }

            if (!valFn || valFn.call(this, val)) {
                conf.add(name, { value: val });
                e.newVal = conf.get(name, VALUE);
            } else {
                // Prevent "after" listeners from being 
                // invoked since nothing changed.
                e.stopImmediatePropagation();
            }
        },

        /**
         * Retrieves the sub value at the provided path,
         * from the value object provided.
         *
         * @method _getSubAttVal
         * @private
         *
         * @param {Array} path  A path array, specifying the object traversal path
         *                      from which to obtain the sub value.
         * @param {Object} val  The object from which to extract the property value
         * @return {Any} The value stored in the path or undefined if not found.
         */
        _getSubAttVal: function (path, val) {
            var pl = path.length,
                i;

            if (pl > 0) {
                for (i = 0; val !== undefined && i < pl; ++i) {
                    val = val[path[i]];
                }
            }

            return val;
        },

        /**
         * Sets the sub value at the provided path on the value object.
         * Returns the modified value object, or undefined if the path is invalid.
         *
         * @method _setSubAttVal
         * @private
         * 
         * @param {Array} path  A path array, specifying the object traversal path
         *                      at which to set the sub value.
         * @param {Object} val  The object on which to set the sub value.
         * @param {Any} subval  The sub value to set.
         * @return {Object}     The modified object, with the new sub value set, or 
         *                      undefined, if the path was invalid.
         */
        _setSubAttVal: function(path, val, subval) {

            var leafIdx = path.length-1,
                i,
                o;

            if (leafIdx >= 0) {
                o = val;

                for (i = 0; o !== undefined && i < leafIdx; ++i) {
                    o = o[path[i]];
                }

                // Not preventing new properties from being added
                if (o !== undefined /* && o[path[i]] !== undefined */) {
                    o[path[i]] = subval;
                } else {
                    val = undefined;
                }
            }

            return val;
        },

        /**
         * Sets multiple attribute values.
         * 
         * @method setAtts
         * @param {Object} atts  A hash of attributes: name/value pairs
         */
        setAtts: function(atts) {
            for (var att in atts) {
                if ( O.owns(atts, att) ) {
                    this.set(att, atts[att]);
                }
            }
        },

        /**
         * Gets multiple attribute values.
         *
         * @method getAtts
         * @param {Array} Optional. An array of attribute names, whose values are required. If omitted, all attribute values are
         * returned.
         * @return {Object} A hash of attributes: name/value pairs
         */
        getAtts: function(atts) {
            var o = {}, i, l, att;
            atts = atts || O.keys(this._conf.data[VALUE]);

            for (i = 0, l = atts.length; i < l; i++) {
                // Go through get, to retrieve massaged values and honor cloning
                att = atts[i];
                o[att] = this.get(att); 
            }

            return o;
        },

        /**
         * Configures attributes, and sets initial values
         *
         * @method _initAtts
         * @protected
         * 
         * @param {Object} cfg Attribute configuration object literal
         * @param {Object} initValues Name/value hash of initial values to apply
         */
        _initAtts : function(cfg, initValues) {
            if (cfg) {
                var att,
                    attCfg,
                    values,
                    value,
                    atts = cfg;

                values = this._splitAttVals(initValues);

                for (att in atts) {
                    if (O.owns(atts, att)) {
                        attCfg = Y.merge(atts[att]);
                        value = this._initAttVal(att, attCfg, values);
                        if (value !== undefined) {
                            attCfg.value = value;
                        }

                        this.addAtt(att, attCfg);
                    }
                }
            }
        },

        /**
         * Utility to split out regular attribute values
         * from complex attribute values, so that complex
         * attributes can be keyed by top level attribute name.
         *
         * @method _splitAttrValues
         * @param {Object} valueHash Name/value hash of initial values
         *
         * @return {Object} Object literal with 2 properties - "simple" and "complex",
         * containing simple and complex attribute values respectively keyed 
         * by attribute the top level attribute name.
         * @private
         */
        _splitAttVals: function(valueHash) {
            var vals = {},
                subvals = {},
                path,
                attr,
                v;

            for (var k in valueHash) {
                if (O.owns(valueHash, k)) {
                    if (k.indexOf(DOT) !== -1) {
                        path = k.split(DOT);
                        attr = path.shift();
                        v = subvals[attr] = subvals[attr] || [];
                        v[v.length] = {
                            path : path, 
                            value: valueHash[k]
                        };
                    } else {
                        vals[k] = valueHash[k];
                    }
                }
            }
            return { simple:vals, complex:subvals };
        },

        /**
         * Returns the initial value of the given attribute from
         * either the default configuration provided, or the 
         * over-ridden value if it exists in the initValues 
         * hash provided.
         *
         * @param {String} att Attribute name
         * @param {Object} cfg Default attribute configuration
         * object literal
         * @param {Object} initVales Initial attribute values, provided 
         * for the instance
         *
         * @return {Any} Initial value of the attribute.
         *
         * @method _initAttVal
         * @private
         */
        _initAttVal : function(att, cfg, initValues) {

            var hasVal = (VALUE in cfg),
                val = (cfg.valueFn) ? cfg.valueFn.call(this) : cfg.value,
                simple,
                complex,
                i,
                l,
                path,
                subval,
                subvals;

            if (!cfg[READ_ONLY] && initValues) {
                // Simple Attributes
                simple = initValues.simple;
                if (simple && O.owns(simple, att)) {
                    hasVal = true;
                    val = simple[att];
                }

                // Complex Attributes
                complex = initValues.complex;
                if (complex && O.owns(complex, att)) {
                    hasVal = true;
                    subvals = complex[att];
                    for (i = 0, l = subvals.length; i < l; ++i) {
                        path = subvals[i].path;
                        subval = subvals[i].value;
                        val = this._setSubAttVal(path, val, subval);
                    }
                }
            }

            return val;
        },

        /**
         * <p>
         * Clone utility method, which will 
         * clone the provided value using YUI's 
         * merge, or clone utilities based
         * on the clone type provided. See <a href="#property_CLONE">Attribute.CLONE</a>
         * </p>
         * 
         * @method _cloneAttVal
         * @private 
         * @param {Any} val Value to clone
         * @param {int} type Clone type to use, See the CLONE property
         * @return {Any} The cloned copy of the object, based on the provided type.
         */
        _cloneAttVal : function(val, type) {
            switch(type) {
                case CLONE_ENUM.SHALLOW:
                    val = Y.merge(val);
                    break;
                case CLONE_ENUM.DEEP:
                case CLONE_ENUM.IMMUTABLE:
                    val = Y.clone(val);
                    break;
            }
            return val;
        },

        /**
         * Utility method to help setup the event payload and 
         * fire the attribute change event.
         * 
         * @method _fireAttChange
         * @private
         * @param {String} type The event name
         * @param {Any} currVal The current value of the attribute
         * @param {Any} newVal The new value of the attribute
         * @param {String} attrName The name of the attribute
         * @param {String} strFullPath The full path of the property being changed, 
         * if this is a sub-attribute value being change
         * @param {Object} opts Any additional event data to mix into the attribute change event's event facade.
         */
        _fireAttChange: function(type, currVal, newVal, attrName, strFullPath, opts) {
            type = type + CHANGE;

            // TODO: Publishing temporarily, while we address event bubbling/queuing
            this.publish(type, {queuable:false, defaultFn:this._defAttSet, silent:true});

            var eData = {
                type: type,
                prevVal: currVal,
                newVal: newVal,
                attrName: attrName,
                subAttrName: strFullPath
            };

            if (opts) {
                Y.mix(eData, opts);
            }

            this.fire(eData);
        }
    };

    Y.mix(Attribute, Y.Event.Target, false, null, 1);

    Y.Attribute = Attribute;



}, '@VERSION@' ,{requires:['event']});
