if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/attribute-core/attribute-core.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/attribute-core/attribute-core.js",
    code: []
};
_yuitest_coverage["build/attribute-core/attribute-core.js"].code=["YUI.add('attribute-core', function (Y, NAME) {","","    /**","     * The State class maintains state for a collection of named items, with","     * a varying number of properties defined.","     *","     * It avoids the need to create a separate class for the item, and separate instances","     * of these classes for each item, by storing the state in a 2 level hash table,","     * improving performance when the number of items is likely to be large.","     *","     * @constructor","     * @class State","     */","    Y.State = function() {","        /**","         * Hash of attributes","         * @property data","         */","        this.data = {};","    };","","    Y.State.prototype = {","","        /**","         * Adds a property to an item.","         *","         * @method add","         * @param name {String} The name of the item.","         * @param key {String} The name of the property.","         * @param val {Any} The value of the property.","         */","        add: function(name, key, val) {","            var item = this.data[name];","","            if (!item) {","                item = this.data[name] = {};","            }","","            item[key] = val;","        },","","        /**","         * Adds multiple properties to an item.","         *","         * @method addAll","         * @param name {String} The name of the item.","         * @param obj {Object} A hash of property/value pairs.","         */","        addAll: function(name, obj) {","            var item = this.data[name],","                key;","","            if (!item) {","                item = this.data[name] = {};","            }","","            for (key in obj) {","                if (obj.hasOwnProperty(key)) {","                    item[key] = obj[key];","                }","            }","        },","","        /**","         * Removes a property from an item.","         *","         * @method remove","         * @param name {String} The name of the item.","         * @param key {String} The property to remove.","         */","        remove: function(name, key) {","            var item = this.data[name];","","            if (item) {","                delete item[key];","            }","        },","","        /**","         * Removes multiple properties from an item, or removes the item completely.","         *","         * @method removeAll","         * @param name {String} The name of the item.","         * @param obj {Object|Array} Collection of properties to delete. If not provided, the entire item is removed.","         */","        removeAll: function(name, obj) {","            var data;","","            if (!obj) {","                data = this.data;","","                if (name in data) {","                    delete data[name];","                }","            } else {","                Y.each(obj, function(value, key) {","                    this.remove(name, typeof key === 'string' ? key : value);","                }, this);","            }","        },","","        /**","         * For a given item, returns the value of the property requested, or undefined if not found.","         *","         * @method get","         * @param name {String} The name of the item","         * @param key {String} Optional. The property value to retrieve.","         * @return {Any} The value of the supplied property.","         */","        get: function(name, key) {","            var item = this.data[name];","","            if (item) {","                return item[key];","            }","        },","","        /**","         * For the given item, returns an object with all of the","         * item's property/value pairs. By default the object returned","         * is a shallow copy of the stored data, but passing in true","         * as the second parameter will return a reference to the stored","         * data.","         *","         * @method getAll","         * @param name {String} The name of the item","         * @param reference {boolean} true, if you want a reference to the stored","         * object","         * @return {Object} An object with property/value pairs for the item.","         */","        getAll : function(name, reference) {","            var item = this.data[name],","                key, obj;","","            if (reference) {","                obj = item;","            } else if (item) {","                obj = {};","","                for (key in item) {","                    if (item.hasOwnProperty(key)) {","                        obj[key] = item[key];","                    }","                }","            }","","            return obj;","        }","    };","    /**","     * The attribute module provides an augmentable Attribute implementation, which","     * adds configurable attributes and attribute change events to the class being","     * augmented. It also provides a State class, which is used internally by Attribute,","     * but can also be used independently to provide a name/property/value data structure to","     * store state.","     *","     * @module attribute","     */","","    /**","     * The attribute-core submodule provides the lightest level of attribute handling support","     * without Attribute change events, or lesser used methods such as reset(), modifyAttrs(),","     * and removeAttr().","     *","     * @module attribute","     * @submodule attribute-core","     */","    var O = Y.Object,","        Lang = Y.Lang,","","        DOT = \".\",","","        // Externally configurable props","        GETTER = \"getter\",","        SETTER = \"setter\",","        READ_ONLY = \"readOnly\",","        WRITE_ONCE = \"writeOnce\",","        INIT_ONLY = \"initOnly\",","        VALIDATOR = \"validator\",","        VALUE = \"value\",","        VALUE_FN = \"valueFn\",","        LAZY_ADD = \"lazyAdd\",","","        // Used for internal state management","        ADDED = \"added\",","        BYPASS_PROXY = \"_bypassProxy\",","        INITIALIZING = \"initializing\",","        INIT_VALUE = \"initValue\",","        LAZY = \"lazy\",","        IS_LAZY_ADD = \"isLazyAdd\",","","        INVALID_VALUE;","","    /**","     * <p>","     * AttributeCore provides the lightest level of configurable attribute support. It is designed to be","     * augmented on to a host class, and provides the host with the ability to configure","     * attributes to store and retrieve state, <strong>but without support for attribute change events</strong>.","     * </p>","     * <p>For example, attributes added to the host can be configured:</p>","     * <ul>","     *     <li>As read only.</li>","     *     <li>As write once.</li>","     *     <li>With a setter function, which can be used to manipulate","     *     values passed to Attribute's <a href=\"#method_set\">set</a> method, before they are stored.</li>","     *     <li>With a getter function, which can be used to manipulate stored values,","     *     before they are returned by Attribute's <a href=\"#method_get\">get</a> method.</li>","     *     <li>With a validator function, to validate values before they are stored.</li>","     * </ul>","     *","     * <p>See the <a href=\"#method_addAttr\">addAttr</a> method, for the complete set of configuration","     * options available for attributes.</p>","     *","     * <p>Object/Classes based on AttributeCore can augment <a href=\"AttributeObservable.html\">AttributeObservable</a>","     * (with true for overwrite) and <a href=\"AttributeExtras.html\">AttributeExtras</a> to add attribute event and","     * additional, less commonly used attribute methods, such as `modifyAttr`, `removeAttr` and `reset`.</p>","     *","     * @class AttributeCore","     * @param attrs {Object} The attributes to add during construction (passed through to <a href=\"#method_addAttrs\">addAttrs</a>).","     *        These can also be defined on the constructor being augmented with Attribute by defining the ATTRS property on the constructor.","     * @param values {Object} The initial attribute values to apply (passed through to <a href=\"#method_addAttrs\">addAttrs</a>).","     *        These are not merged/cloned. The caller is responsible for isolating user provided values if required.","     * @param lazy {boolean} Whether or not to add attributes lazily (passed through to <a href=\"#method_addAttrs\">addAttrs</a>).","     */","    function AttributeCore(attrs, values, lazy) {","        // HACK: Fix #2531929","        // Complete hack, to make sure the first clone of a node value in IE doesn't doesn't hurt state - maintains 3.4.1 behavior.","        // Too late in the release cycle to do anything about the core problem.","        // The root issue is that cloning a Y.Node instance results in an object which barfs in IE, when you access it's properties (since 3.3.0).","        this._yuievt = null;","","        this._initAttrHost(attrs, values, lazy);","    }","","    /**","     * <p>The value to return from an attribute setter in order to prevent the set from going through.</p>","     *","     * <p>You can return this value from your setter if you wish to combine validator and setter","     * functionality into a single setter function, which either returns the massaged value to be stored or","     * AttributeCore.INVALID_VALUE to prevent invalid values from being stored.</p>","     *","     * @property INVALID_VALUE","     * @type Object","     * @static","     * @final","     */","    AttributeCore.INVALID_VALUE = {};","    INVALID_VALUE = AttributeCore.INVALID_VALUE;","","    /**","     * The list of properties which can be configured for","     * each attribute (e.g. setter, getter, writeOnce etc.).","     *","     * This property is used internally as a whitelist for faster","     * Y.mix operations.","     *","     * @property _ATTR_CFG","     * @type Array","     * @static","     * @protected","     */","    AttributeCore._ATTR_CFG = [SETTER, GETTER, VALIDATOR, VALUE, VALUE_FN, WRITE_ONCE, READ_ONLY, LAZY_ADD, BYPASS_PROXY];","","    /**","     * Utility method to protect an attribute configuration hash, by merging the","     * entire object and the individual attr config objects.","     *","     * @method protectAttrs","     * @static","     * @param {Object} attrs A hash of attribute to configuration object pairs.","     * @return {Object} A protected version of the `attrs` argument.","     */","    AttributeCore.protectAttrs = function (attrs) {","        if (attrs) {","            attrs = Y.merge(attrs);","            for (var attr in attrs) {","                if (attrs.hasOwnProperty(attr)) {","                    attrs[attr] = Y.merge(attrs[attr]);","                }","            }","        }","","        return attrs;","    };","","    AttributeCore.prototype = {","","        /**","         * Constructor logic for attributes. Initializes the host state, and sets up the inital attributes passed to the","         * constructor.","         *","         * @method _initAttrHost","         * @param attrs {Object} The attributes to add during construction (passed through to <a href=\"#method_addAttrs\">addAttrs</a>).","         *        These can also be defined on the constructor being augmented with Attribute by defining the ATTRS property on the constructor.","         * @param values {Object} The initial attribute values to apply (passed through to <a href=\"#method_addAttrs\">addAttrs</a>).","         *        These are not merged/cloned. The caller is responsible for isolating user provided values if required.","         * @param lazy {boolean} Whether or not to add attributes lazily (passed through to <a href=\"#method_addAttrs\">addAttrs</a>).","         * @private","         */","        _initAttrHost : function(attrs, values, lazy) {","            this._state = new Y.State();","            this._initAttrs(attrs, values, lazy);","        },","","        /**","         * <p>","         * Adds an attribute with the provided configuration to the host object.","         * </p>","         * <p>","         * The config argument object supports the following properties:","         * </p>","         *","         * <dl>","         *    <dt>value &#60;Any&#62;</dt>","         *    <dd>The initial value to set on the attribute</dd>","         *","         *    <dt>valueFn &#60;Function | String&#62;</dt>","         *    <dd>","         *    <p>A function, which will return the initial value to set on the attribute. This is useful","         *    for cases where the attribute configuration is defined statically, but needs to","         *    reference the host instance (\"this\") to obtain an initial value. If both the value and valueFn properties are defined,","         *    the value returned by the valueFn has precedence over the value property, unless it returns undefined, in which","         *    case the value property is used.</p>","         *","         *    <p>valueFn can also be set to a string, representing the name of the instance method to be used to retrieve the value.</p>","         *    </dd>","         *","         *    <dt>readOnly &#60;boolean&#62;</dt>","         *    <dd>Whether or not the attribute is read only. Attributes having readOnly set to true","         *        cannot be modified by invoking the set method.</dd>","         *","         *    <dt>writeOnce &#60;boolean&#62; or &#60;string&#62;</dt>","         *    <dd>","         *        Whether or not the attribute is \"write once\". Attributes having writeOnce set to true,","         *        can only have their values set once, be it through the default configuration,","         *        constructor configuration arguments, or by invoking set.","         *        <p>The writeOnce attribute can also be set to the string \"initOnly\",","         *         in which case the attribute can only be set during initialization","         *        (when used with Base, this means it can only be set during construction)</p>","         *    </dd>","         *","         *    <dt>setter &#60;Function | String&#62;</dt>","         *    <dd>","         *    <p>The setter function used to massage or normalize the value passed to the set method for the attribute.","         *    The value returned by the setter will be the final stored value. Returning","         *    <a href=\"#property_Attribute.INVALID_VALUE\">Attribute.INVALID_VALUE</a>, from the setter will prevent","         *    the value from being stored.","         *    </p>","         *","         *    <p>setter can also be set to a string, representing the name of the instance method to be used as the setter function.</p>","         *    </dd>","         *","         *    <dt>getter &#60;Function | String&#62;</dt>","         *    <dd>","         *    <p>","         *    The getter function used to massage or normalize the value returned by the get method for the attribute.","         *    The value returned by the getter function is the value which will be returned to the user when they","         *    invoke get.","         *    </p>","         *","         *    <p>getter can also be set to a string, representing the name of the instance method to be used as the getter function.</p>","         *    </dd>","         *","         *    <dt>validator &#60;Function | String&#62;</dt>","         *    <dd>","         *    <p>","         *    The validator function invoked prior to setting the stored value. Returning","         *    false from the validator function will prevent the value from being stored.","         *    </p>","         *","         *    <p>validator can also be set to a string, representing the name of the instance method to be used as the validator function.</p>","         *    </dd>","         *","         *    <dt>lazyAdd &#60;boolean&#62;</dt>","         *    <dd>Whether or not to delay initialization of the attribute until the first call to get/set it.","         *    This flag can be used to over-ride lazy initialization on a per attribute basis, when adding multiple attributes through","         *    the <a href=\"#method_addAttrs\">addAttrs</a> method.</dd>","         *","         * </dl>","         *","         * <p>The setter, getter and validator are invoked with the value and name passed in as the first and second arguments, and with","         * the context (\"this\") set to the host object.</p>","         *","         * <p>Configuration properties outside of the list mentioned above are considered private properties used internally by attribute,","         * and are not intended for public use.</p>","         *","         * @method addAttr","         *","         * @param {String} name The name of the attribute.","         * @param {Object} config An object with attribute configuration property/value pairs, specifying the configuration for the attribute.","         *","         * <p>","         * <strong>NOTE:</strong> The configuration object is modified when adding an attribute, so if you need","         * to protect the original values, you will need to merge the object.","         * </p>","         *","         * @param {boolean} lazy (optional) Whether or not to add this attribute lazily (on the first call to get/set).","         *","         * @return {Object} A reference to the host object.","         *","         * @chainable","         */","        addAttr: function(name, config, lazy) {","","","            var host = this, // help compression","                state = host._state,","                value,","                hasValue;","","            config = config || {};","","            lazy = (LAZY_ADD in config) ? config[LAZY_ADD] : lazy;","","            if (lazy && !host.attrAdded(name)) {","                state.addAll(name, {","                    lazy : config,","                    added : true","                });","            } else {","                /*jshint maxlen:200*/","","                if (!host.attrAdded(name) || state.get(name, IS_LAZY_ADD)) {","","                    hasValue = (VALUE in config);","","                /*jshint maxlen:150*/","","                    if (hasValue) {","                        // We'll go through set, don't want to set value in config directly","                        value = config.value;","                        delete config.value;","                    }","","                    config.added = true;","                    config.initializing = true;","","                    state.addAll(name, config);","","                    if (hasValue) {","                        // Go through set, so that raw values get normalized/validated","                        host.set(name, value);","                    }","","                    state.remove(name, INITIALIZING);","                }","            }","","            return host;","        },","","        /**","         * Checks if the given attribute has been added to the host","         *","         * @method attrAdded","         * @param {String} name The name of the attribute to check.","         * @return {boolean} true if an attribute with the given name has been added, false if it hasn't.","         *         This method will return true for lazily added attributes.","         */","        attrAdded: function(name) {","            return !!this._state.get(name, ADDED);","        },","","        /**","         * Returns the current value of the attribute. If the attribute","         * has been configured with a 'getter' function, this method will delegate","         * to the 'getter' to obtain the value of the attribute.","         *","         * @method get","         *","         * @param {String} name The name of the attribute. If the value of the attribute is an Object,","         * dot notation can be used to obtain the value of a property of the object (e.g. <code>get(\"x.y.z\")</code>)","         *","         * @return {Any} The value of the attribute","         */","        get : function(name) {","            return this._getAttr(name);","        },","","        /**","         * Checks whether or not the attribute is one which has been","         * added lazily and still requires initialization.","         *","         * @method _isLazyAttr","         * @private","         * @param {String} name The name of the attribute","         * @return {boolean} true if it's a lazily added attribute, false otherwise.","         */","        _isLazyAttr: function(name) {","            return this._state.get(name, LAZY);","        },","","        /**","         * Finishes initializing an attribute which has been lazily added.","         *","         * @method _addLazyAttr","         * @private","         * @param {Object} name The name of the attribute","         */","        _addLazyAttr: function(name) {","            var state = this._state,","                lazyCfg = state.get(name, LAZY);","","            state.add(name, IS_LAZY_ADD, true);","            state.remove(name, LAZY);","            this.addAttr(name, lazyCfg);","        },","","        /**","         * Sets the value of an attribute.","         *","         * @method set","         * @chainable","         *","         * @param {String} name The name of the attribute. If the","         * current value of the attribute is an Object, dot notation can be used","         * to set the value of a property within the object (e.g. <code>set(\"x.y.z\", 5)</code>).","         * @param {Any} value The value to set the attribute to.","         * @param {Object} [opts] Optional data providing the circumstances for the change.","         * @return {Object} A reference to the host object.","         */","        set : function(name, val, opts) {","            return this._setAttr(name, val, opts);","        },","","        /**","         * Allows setting of readOnly/writeOnce attributes. See <a href=\"#method_set\">set</a> for argument details.","         *","         * @method _set","         * @protected","         * @chainable","         *","         * @param {String} name The name of the attribute.","         * @param {Any} val The value to set the attribute to.","         * @param {Object} [opts] Optional data providing the circumstances for the change.","         * @return {Object} A reference to the host object.","         */","        _set : function(name, val, opts) {","            return this._setAttr(name, val, opts, true);","        },","","        /**","         * Provides the common implementation for the public set and protected _set methods.","         *","         * See <a href=\"#method_set\">set</a> for argument details.","         *","         * @method _setAttr","         * @protected","         * @chainable","         *","         * @param {String} name The name of the attribute.","         * @param {Any} value The value to set the attribute to.","         * @param {Object} [opts] Optional data providing the circumstances for the change.","         * @param {boolean} force If true, allows the caller to set values for","         * readOnly or writeOnce attributes which have already been set.","         *","         * @return {Object} A reference to the host object.","         */","        _setAttr : function(name, val, opts, force)  {","            var allowSet = true,","                state = this._state,","                stateProxy = this._stateProxy,","                cfg,","                initialSet,","                strPath,","                path,","                currVal,","                writeOnce,","                initializing;","","            if (name.indexOf(DOT) !== -1) {","                strPath = name;","                path = name.split(DOT);","                name = path.shift();","            }","","            if (this._isLazyAttr(name)) {","                this._addLazyAttr(name);","            }","","            cfg = state.getAll(name, true) || {};","","            initialSet = (!(VALUE in cfg));","","            if (stateProxy && name in stateProxy && !cfg._bypassProxy) {","                // TODO: Value is always set for proxy. Can we do any better? Maybe take a snapshot as the initial value for the first call to set?","                initialSet = false;","            }","","            writeOnce = cfg.writeOnce;","            initializing = cfg.initializing;","","            if (!initialSet && !force) {","","                if (writeOnce) {","                    allowSet = false;","                }","","                if (cfg.readOnly) {","                    allowSet = false;","                }","            }","","            if (!initializing && !force && writeOnce === INIT_ONLY) {","                allowSet = false;","            }","","            if (allowSet) {","                // Don't need currVal if initialSet (might fail in custom getter if it always expects a non-undefined/non-null value)","                if (!initialSet) {","                    currVal =  this.get(name);","                }","","                if (path) {","                   val = O.setValue(Y.clone(currVal), path, val);","","                   if (val === undefined) {","                       allowSet = false;","                   }","                }","","                if (allowSet) {","                    opts = opts || {};","                    if (!this._fireAttrChange || initializing) {","                        this._setAttrVal(name, strPath, currVal, val, opts);","                    } else {","                        // HACK - no real reason core needs to know about _fireAttrChange, but","                        // it adds fn hops if we want to break it out. Not sure it's worth it for this critical path","                        this._fireAttrChange(name, strPath, currVal, val, opts);","                    }","                }","            }","","            return this;","        },","","        /**","         * Provides the common implementation for the public get method,","         * allowing Attribute hosts to over-ride either method.","         *","         * See <a href=\"#method_get\">get</a> for argument details.","         *","         * @method _getAttr","         * @protected","         * @chainable","         *","         * @param {String} name The name of the attribute.","         * @return {Any} The value of the attribute.","         */","        _getAttr : function(name) {","            var host = this, // help compression","                fullName = name,","                state = host._state,","                path,","                getter,","                val,","                cfg;","","            if (name.indexOf(DOT) !== -1) {","                path = name.split(DOT);","                name = path.shift();","            }","","            // On Demand - Should be rare - handles out of order valueFn references","            if (host._tCfgs && host._tCfgs[name]) {","                cfg = {};","                cfg[name] = host._tCfgs[name];","                delete host._tCfgs[name];","                host._addAttrs(cfg, host._tVals);","            }","","            // Lazy Init","            if (host._isLazyAttr(name)) {","                host._addLazyAttr(name);","            }","","            val = host._getStateVal(name);","","            getter = state.get(name, GETTER);","","            if (getter && !getter.call) {","                getter = this[getter];","            }","","            val = (getter) ? getter.call(host, val, fullName) : val;","            val = (path) ? O.getValue(val, path) : val;","","            return val;","        },","","        /**","         * Gets the stored value for the attribute, from either the","         * internal state object, or the state proxy if it exits","         *","         * @method _getStateVal","         * @private","         * @param {String} name The name of the attribute","         * @return {Any} The stored value of the attribute","         */","        _getStateVal : function(name) {","            var stateProxy = this._stateProxy;","            return stateProxy && (name in stateProxy) && !this._state.get(name, BYPASS_PROXY) ? stateProxy[name] : this._state.get(name, VALUE);","        },","","        /**","         * Sets the stored value for the attribute, in either the","         * internal state object, or the state proxy if it exits","         *","         * @method _setStateVal","         * @private","         * @param {String} name The name of the attribute","         * @param {Any} value The value of the attribute","         */","        _setStateVal : function(name, value) {","            var stateProxy = this._stateProxy;","            if (stateProxy && (name in stateProxy) && !this._state.get(name, BYPASS_PROXY)) {","                stateProxy[name] = value;","            } else {","                this._state.add(name, VALUE, value);","            }","        },","","        /**","         * Updates the stored value of the attribute in the privately held State object,","         * if validation and setter passes.","         *","         * @method _setAttrVal","         * @private","         * @param {String} attrName The attribute name.","         * @param {String} subAttrName The sub-attribute name, if setting a sub-attribute property (\"x.y.z\").","         * @param {Any} prevVal The currently stored value of the attribute.","         * @param {Any} newVal The value which is going to be stored.","         * @param {Object} [opts] Optional data providing the circumstances for the change.","         *","         * @return {booolean} true if the new attribute value was stored, false if not.","         */","        _setAttrVal : function(attrName, subAttrName, prevVal, newVal, opts) {","","            var host = this,","                allowSet = true,","                cfg = this._state.getAll(attrName, true) || {},","                validator = cfg.validator,","                setter = cfg.setter,","                initializing = cfg.initializing,","                prevRawVal = this._getStateVal(attrName),","                name = subAttrName || attrName,","                retVal,","                valid;","","            if (validator) {","                if (!validator.call) {","                    // Assume string - trying to keep critical path tight, so avoiding Lang check","                    validator = this[validator];","                }","                if (validator) {","                    valid = validator.call(host, newVal, name, opts);","","                    if (!valid && initializing) {","                        newVal = cfg.defaultValue;","                        valid = true; // Assume it's valid, for perf.","                    }","                }","            }","","            if (!validator || valid) {","                if (setter) {","                    if (!setter.call) {","                        // Assume string - trying to keep critical path tight, so avoiding Lang check","                        setter = this[setter];","                    }","                    if (setter) {","                        retVal = setter.call(host, newVal, name, opts);","","                        if (retVal === INVALID_VALUE) {","                            if (initializing) {","                                newVal = cfg.defaultValue;","                            } else {","                                allowSet = false;","                            }","                        } else if (retVal !== undefined){","                            newVal = retVal;","                        }","                    }","                }","","                if (allowSet) {","                    if(!subAttrName && (newVal === prevRawVal) && !Lang.isObject(newVal)) {","                        allowSet = false;","                    } else {","                        // Store value","                        if (!(INIT_VALUE in cfg)) {","                            cfg.initValue = newVal;","                        }","                        host._setStateVal(attrName, newVal);","                    }","                }","","            } else {","                allowSet = false;","            }","","            return allowSet;","        },","","        /**","         * Sets multiple attribute values.","         *","         * @method setAttrs","         * @param {Object} attrs  An object with attributes name/value pairs.","         * @param {Object} [opts] Optional data providing the circumstances for the change.","         * @return {Object} A reference to the host object.","         * @chainable","         */","        setAttrs : function(attrs, opts) {","            return this._setAttrs(attrs, opts);","        },","","        /**","         * Implementation behind the public setAttrs method, to set multiple attribute values.","         *","         * @method _setAttrs","         * @protected","         * @param {Object} attrs  An object with attributes name/value pairs.","         * @param {Object} [opts] Optional data providing the circumstances for the change","         * @return {Object} A reference to the host object.","         * @chainable","         */","        _setAttrs : function(attrs, opts) {","            var attr;","            for (attr in attrs) {","                if ( attrs.hasOwnProperty(attr) ) {","                    this.set(attr, attrs[attr], opts);","                }","            }","            return this;","        },","","        /**","         * Gets multiple attribute values.","         *","         * @method getAttrs","         * @param {Array | boolean} attrs Optional. An array of attribute names. If omitted, all attribute values are","         * returned. If set to true, all attributes modified from their initial values are returned.","         * @return {Object} An object with attribute name/value pairs.","         */","        getAttrs : function(attrs) {","            return this._getAttrs(attrs);","        },","","        /**","         * Implementation behind the public getAttrs method, to get multiple attribute values.","         *","         * @method _getAttrs","         * @protected","         * @param {Array | boolean} attrs Optional. An array of attribute names. If omitted, all attribute values are","         * returned. If set to true, all attributes modified from their initial values are returned.","         * @return {Object} An object with attribute name/value pairs.","         */","        _getAttrs : function(attrs) {","            var obj = {},","                attr, i, len,","                modifiedOnly = (attrs === true);","","            // TODO - figure out how to get all \"added\"","            if (!attrs || modifiedOnly) {","                attrs = O.keys(this._state.data);","            }","","            for (i = 0, len = attrs.length; i < len; i++) {","                attr = attrs[i];","","                if (!modifiedOnly || this._getStateVal(attr) != this._state.get(attr, INIT_VALUE)) {","                    // Go through get, to honor cloning/normalization","                    obj[attr] = this.get(attr);","                }","            }","","            return obj;","        },","","        /**","         * Configures a group of attributes, and sets initial values.","         *","         * <p>","         * <strong>NOTE:</strong> This method does not isolate the configuration object by merging/cloning.","         * The caller is responsible for merging/cloning the configuration object if required.","         * </p>","         *","         * @method addAttrs","         * @chainable","         *","         * @param {Object} cfgs An object with attribute name/configuration pairs.","         * @param {Object} values An object with attribute name/value pairs, defining the initial values to apply.","         * Values defined in the cfgs argument will be over-written by values in this argument unless defined as read only.","         * @param {boolean} lazy Whether or not to delay the intialization of these attributes until the first call to get/set.","         * Individual attributes can over-ride this behavior by defining a lazyAdd configuration property in their configuration.","         * See <a href=\"#method_addAttr\">addAttr</a>.","         *","         * @return {Object} A reference to the host object.","         */","        addAttrs : function(cfgs, values, lazy) {","            var host = this; // help compression","            if (cfgs) {","                host._tCfgs = cfgs;","                host._tVals = host._normAttrVals(values);","                host._addAttrs(cfgs, host._tVals, lazy);","                host._tCfgs = host._tVals = null;","            }","","            return host;","        },","","        /**","         * Implementation behind the public addAttrs method.","         *","         * This method is invoked directly by get if it encounters a scenario","         * in which an attribute's valueFn attempts to obtain the","         * value an attribute in the same group of attributes, which has not yet","         * been added (on demand initialization).","         *","         * @method _addAttrs","         * @private","         * @param {Object} cfgs An object with attribute name/configuration pairs.","         * @param {Object} values An object with attribute name/value pairs, defining the initial values to apply.","         * Values defined in the cfgs argument will be over-written by values in this argument unless defined as read only.","         * @param {boolean} lazy Whether or not to delay the intialization of these attributes until the first call to get/set.","         * Individual attributes can over-ride this behavior by defining a lazyAdd configuration property in their configuration.","         * See <a href=\"#method_addAttr\">addAttr</a>.","         */","        _addAttrs : function(cfgs, values, lazy) {","            var host = this, // help compression","                attr,","                attrCfg,","                value;","","            for (attr in cfgs) {","                if (cfgs.hasOwnProperty(attr)) {","","                    // Not Merging. Caller is responsible for isolating configs","                    attrCfg = cfgs[attr];","                    attrCfg.defaultValue = attrCfg.value;","","                    // Handle simple, complex and user values, accounting for read-only","                    value = host._getAttrInitVal(attr, attrCfg, host._tVals);","","                    if (value !== undefined) {","                        attrCfg.value = value;","                    }","","                    if (host._tCfgs[attr]) {","                        delete host._tCfgs[attr];","                    }","","                    host.addAttr(attr, attrCfg, lazy);","                }","            }","        },","","        /**","         * Utility method to protect an attribute configuration","         * hash, by merging the entire object and the individual","         * attr config objects.","         *","         * @method _protectAttrs","         * @protected","         * @param {Object} attrs A hash of attribute to configuration object pairs.","         * @return {Object} A protected version of the attrs argument.","         * @deprecated Use `AttributeCore.protectAttrs()` or","         *   `Attribute.protectAttrs()` which are the same static utility method.","         */","        _protectAttrs : AttributeCore.protectAttrs,","","        /**","         * Utility method to normalize attribute values. The base implementation","         * simply merges the hash to protect the original.","         *","         * @method _normAttrVals","         * @param {Object} valueHash An object with attribute name/value pairs","         *","         * @return {Object} An object literal with 2 properties - \"simple\" and \"complex\",","         * containing simple and complex attribute values respectively keyed","         * by the top level attribute name, or null, if valueHash is falsey.","         *","         * @private","         */","        _normAttrVals : function(valueHash) {","            var vals = {},","                subvals = {},","                path,","                attr,","                v, k;","","            if (valueHash) {","                for (k in valueHash) {","                    if (valueHash.hasOwnProperty(k)) {","                        if (k.indexOf(DOT) !== -1) {","                            path = k.split(DOT);","                            attr = path.shift();","                            v = subvals[attr] = subvals[attr] || [];","                            v[v.length] = {","                                path : path,","                                value: valueHash[k]","                            };","                        } else {","                            vals[k] = valueHash[k];","                        }","                    }","                }","                return { simple:vals, complex:subvals };","            } else {","                return null;","            }","        },","","        /**","         * Returns the initial value of the given attribute from","         * either the default configuration provided, or the","         * over-ridden value if it exists in the set of initValues","         * provided and the attribute is not read-only.","         *","         * @param {String} attr The name of the attribute","         * @param {Object} cfg The attribute configuration object","         * @param {Object} initValues The object with simple and complex attribute name/value pairs returned from _normAttrVals","         *","         * @return {Any} The initial value of the attribute.","         *","         * @method _getAttrInitVal","         * @private","         */","        _getAttrInitVal : function(attr, cfg, initValues) {","            var val = cfg.value,","                valFn = cfg.valueFn,","                tmpVal,","                initValSet = false,","                simple,","                complex,","                i,","                l,","                path,","                subval,","                subvals;","","            if (!cfg.readOnly && initValues) {","                // Simple Attributes","                simple = initValues.simple;","                if (simple && simple.hasOwnProperty(attr)) {","                    val = simple[attr];","                    initValSet = true;","                }","            }","","            if (valFn && !initValSet) {","                if (!valFn.call) {","                    valFn = this[valFn];","                }","                if (valFn) {","                    tmpVal = valFn.call(this, attr);","                    val = tmpVal;","                }","            }","","            if (!cfg.readOnly && initValues) {","","                // Complex Attributes (complex values applied, after simple, in case both are set)","                complex = initValues.complex;","","                if (complex && complex.hasOwnProperty(attr) && (val !== undefined) && (val !== null)) {","                    subvals = complex[attr];","                    for (i = 0, l = subvals.length; i < l; ++i) {","                        path = subvals[i].path;","                        subval = subvals[i].value;","                        O.setValue(val, path, subval);","                    }","                }","            }","","            return val;","        },","","        /**","         * Utility method to set up initial attributes defined during construction,","         * either through the constructor.ATTRS property, or explicitly passed in.","         *","         * @method _initAttrs","         * @protected","         * @param attrs {Object} The attributes to add during construction (passed through to <a href=\"#method_addAttrs\">addAttrs</a>).","         *        These can also be defined on the constructor being augmented with Attribute by defining the ATTRS property on the constructor.","         * @param values {Object} The initial attribute values to apply (passed through to <a href=\"#method_addAttrs\">addAttrs</a>).","         *        These are not merged/cloned. The caller is responsible for isolating user provided values if required.","         * @param lazy {boolean} Whether or not to add attributes lazily (passed through to <a href=\"#method_addAttrs\">addAttrs</a>).","         */","        _initAttrs : function(attrs, values, lazy) {","            // ATTRS support for Node, which is not Base based","            attrs = attrs || this.constructor.ATTRS;","","            var Base = Y.Base,","                BaseCore = Y.BaseCore,","                baseInst = (Base && Y.instanceOf(this, Base)),","                baseCoreInst = (!baseInst && BaseCore && Y.instanceOf(this, BaseCore));","","            if (attrs && !baseInst && !baseCoreInst) {","                this.addAttrs(Y.AttributeCore.protectAttrs(attrs), values, lazy);","            }","        }","    };","","    Y.AttributeCore = AttributeCore;","","","}, '@VERSION@', {\"requires\": [\"oop\"]});"];
_yuitest_coverage["build/attribute-core/attribute-core.js"].lines = {"1":0,"14":0,"19":0,"22":0,"33":0,"35":0,"36":0,"39":0,"50":0,"53":0,"54":0,"57":0,"58":0,"59":0,"72":0,"74":0,"75":0,"87":0,"89":0,"90":0,"92":0,"93":0,"96":0,"97":0,"111":0,"113":0,"114":0,"132":0,"135":0,"136":0,"137":0,"138":0,"140":0,"141":0,"142":0,"147":0,"168":0,"225":0,"230":0,"232":0,"247":0,"248":0,"262":0,"273":0,"274":0,"275":0,"276":0,"277":0,"278":0,"283":0,"286":0,"301":0,"302":0,"406":0,"411":0,"413":0,"415":0,"416":0,"423":0,"425":0,"429":0,"431":0,"432":0,"435":0,"436":0,"438":0,"440":0,"442":0,"445":0,"449":0,"461":0,"477":0,"490":0,"501":0,"504":0,"505":0,"506":0,"523":0,"539":0,"560":0,"571":0,"572":0,"573":0,"574":0,"577":0,"578":0,"581":0,"583":0,"585":0,"587":0,"590":0,"591":0,"593":0,"595":0,"596":0,"599":0,"600":0,"604":0,"605":0,"608":0,"610":0,"611":0,"614":0,"615":0,"617":0,"618":0,"622":0,"623":0,"624":0,"625":0,"629":0,"634":0,"651":0,"659":0,"660":0,"661":0,"665":0,"666":0,"667":0,"668":0,"669":0,"673":0,"674":0,"677":0,"679":0,"681":0,"682":0,"685":0,"686":0,"688":0,"701":0,"702":0,"715":0,"716":0,"717":0,"719":0,"739":0,"750":0,"751":0,"753":0,"755":0,"756":0,"758":0,"759":0,"760":0,"765":0,"766":0,"767":0,"769":0,"771":0,"772":0,"774":0,"775":0,"776":0,"778":0,"780":0,"781":0,"786":0,"787":0,"788":0,"791":0,"792":0,"794":0,"799":0,"802":0,"815":0,"829":0,"830":0,"831":0,"832":0,"835":0,"847":0,"860":0,"865":0,"866":0,"869":0,"870":0,"872":0,"874":0,"878":0,"902":0,"903":0,"904":0,"905":0,"906":0,"907":0,"910":0,"931":0,"936":0,"937":0,"940":0,"941":0,"944":0,"946":0,"947":0,"950":0,"951":0,"954":0,"987":0,"993":0,"994":0,"995":0,"996":0,"997":0,"998":0,"999":0,"1000":0,"1005":0,"1009":0,"1011":0,"1031":0,"1043":0,"1045":0,"1046":0,"1047":0,"1048":0,"1052":0,"1053":0,"1054":0,"1056":0,"1057":0,"1058":0,"1062":0,"1065":0,"1067":0,"1068":0,"1069":0,"1070":0,"1071":0,"1072":0,"1077":0,"1094":0,"1096":0,"1101":0,"1102":0,"1107":0};
_yuitest_coverage["build/attribute-core/attribute-core.js"].functions = {"State:14":0,"add:32":0,"addAll:49":0,"remove:71":0,"(anonymous 2):96":0,"removeAll:86":0,"get:110":0,"getAll:131":0,"AttributeCore:225":0,"protectAttrs:273":0,"_initAttrHost:300":0,"addAttr:403":0,"attrAdded:460":0,"get:476":0,"_isLazyAttr:489":0,"_addLazyAttr:500":0,"set:522":0,"_set:538":0,"_setAttr:559":0,"_getAttr:650":0,"_getStateVal:700":0,"_setStateVal:714":0,"_setAttrVal:737":0,"setAttrs:814":0,"_setAttrs:828":0,"getAttrs:846":0,"_getAttrs:859":0,"addAttrs:901":0,"_addAttrs:930":0,"_normAttrVals:986":0,"_getAttrInitVal:1030":0,"_initAttrs:1092":0,"(anonymous 1):1":0};
_yuitest_coverage["build/attribute-core/attribute-core.js"].coveredLines = 236;
_yuitest_coverage["build/attribute-core/attribute-core.js"].coveredFunctions = 33;
_yuitest_coverline("build/attribute-core/attribute-core.js", 1);
YUI.add('attribute-core', function (Y, NAME) {

    /**
     * The State class maintains state for a collection of named items, with
     * a varying number of properties defined.
     *
     * It avoids the need to create a separate class for the item, and separate instances
     * of these classes for each item, by storing the state in a 2 level hash table,
     * improving performance when the number of items is likely to be large.
     *
     * @constructor
     * @class State
     */
    _yuitest_coverfunc("build/attribute-core/attribute-core.js", "(anonymous 1)", 1);
_yuitest_coverline("build/attribute-core/attribute-core.js", 14);
Y.State = function() {
        /**
         * Hash of attributes
         * @property data
         */
        _yuitest_coverfunc("build/attribute-core/attribute-core.js", "State", 14);
_yuitest_coverline("build/attribute-core/attribute-core.js", 19);
this.data = {};
    };

    _yuitest_coverline("build/attribute-core/attribute-core.js", 22);
Y.State.prototype = {

        /**
         * Adds a property to an item.
         *
         * @method add
         * @param name {String} The name of the item.
         * @param key {String} The name of the property.
         * @param val {Any} The value of the property.
         */
        add: function(name, key, val) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "add", 32);
_yuitest_coverline("build/attribute-core/attribute-core.js", 33);
var item = this.data[name];

            _yuitest_coverline("build/attribute-core/attribute-core.js", 35);
if (!item) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 36);
item = this.data[name] = {};
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 39);
item[key] = val;
        },

        /**
         * Adds multiple properties to an item.
         *
         * @method addAll
         * @param name {String} The name of the item.
         * @param obj {Object} A hash of property/value pairs.
         */
        addAll: function(name, obj) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "addAll", 49);
_yuitest_coverline("build/attribute-core/attribute-core.js", 50);
var item = this.data[name],
                key;

            _yuitest_coverline("build/attribute-core/attribute-core.js", 53);
if (!item) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 54);
item = this.data[name] = {};
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 57);
for (key in obj) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 58);
if (obj.hasOwnProperty(key)) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 59);
item[key] = obj[key];
                }
            }
        },

        /**
         * Removes a property from an item.
         *
         * @method remove
         * @param name {String} The name of the item.
         * @param key {String} The property to remove.
         */
        remove: function(name, key) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "remove", 71);
_yuitest_coverline("build/attribute-core/attribute-core.js", 72);
var item = this.data[name];

            _yuitest_coverline("build/attribute-core/attribute-core.js", 74);
if (item) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 75);
delete item[key];
            }
        },

        /**
         * Removes multiple properties from an item, or removes the item completely.
         *
         * @method removeAll
         * @param name {String} The name of the item.
         * @param obj {Object|Array} Collection of properties to delete. If not provided, the entire item is removed.
         */
        removeAll: function(name, obj) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "removeAll", 86);
_yuitest_coverline("build/attribute-core/attribute-core.js", 87);
var data;

            _yuitest_coverline("build/attribute-core/attribute-core.js", 89);
if (!obj) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 90);
data = this.data;

                _yuitest_coverline("build/attribute-core/attribute-core.js", 92);
if (name in data) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 93);
delete data[name];
                }
            } else {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 96);
Y.each(obj, function(value, key) {
                    _yuitest_coverfunc("build/attribute-core/attribute-core.js", "(anonymous 2)", 96);
_yuitest_coverline("build/attribute-core/attribute-core.js", 97);
this.remove(name, typeof key === 'string' ? key : value);
                }, this);
            }
        },

        /**
         * For a given item, returns the value of the property requested, or undefined if not found.
         *
         * @method get
         * @param name {String} The name of the item
         * @param key {String} Optional. The property value to retrieve.
         * @return {Any} The value of the supplied property.
         */
        get: function(name, key) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "get", 110);
_yuitest_coverline("build/attribute-core/attribute-core.js", 111);
var item = this.data[name];

            _yuitest_coverline("build/attribute-core/attribute-core.js", 113);
if (item) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 114);
return item[key];
            }
        },

        /**
         * For the given item, returns an object with all of the
         * item's property/value pairs. By default the object returned
         * is a shallow copy of the stored data, but passing in true
         * as the second parameter will return a reference to the stored
         * data.
         *
         * @method getAll
         * @param name {String} The name of the item
         * @param reference {boolean} true, if you want a reference to the stored
         * object
         * @return {Object} An object with property/value pairs for the item.
         */
        getAll : function(name, reference) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "getAll", 131);
_yuitest_coverline("build/attribute-core/attribute-core.js", 132);
var item = this.data[name],
                key, obj;

            _yuitest_coverline("build/attribute-core/attribute-core.js", 135);
if (reference) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 136);
obj = item;
            } else {_yuitest_coverline("build/attribute-core/attribute-core.js", 137);
if (item) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 138);
obj = {};

                _yuitest_coverline("build/attribute-core/attribute-core.js", 140);
for (key in item) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 141);
if (item.hasOwnProperty(key)) {
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 142);
obj[key] = item[key];
                    }
                }
            }}

            _yuitest_coverline("build/attribute-core/attribute-core.js", 147);
return obj;
        }
    };
    /**
     * The attribute module provides an augmentable Attribute implementation, which
     * adds configurable attributes and attribute change events to the class being
     * augmented. It also provides a State class, which is used internally by Attribute,
     * but can also be used independently to provide a name/property/value data structure to
     * store state.
     *
     * @module attribute
     */

    /**
     * The attribute-core submodule provides the lightest level of attribute handling support
     * without Attribute change events, or lesser used methods such as reset(), modifyAttrs(),
     * and removeAttr().
     *
     * @module attribute
     * @submodule attribute-core
     */
    _yuitest_coverline("build/attribute-core/attribute-core.js", 168);
var O = Y.Object,
        Lang = Y.Lang,

        DOT = ".",

        // Externally configurable props
        GETTER = "getter",
        SETTER = "setter",
        READ_ONLY = "readOnly",
        WRITE_ONCE = "writeOnce",
        INIT_ONLY = "initOnly",
        VALIDATOR = "validator",
        VALUE = "value",
        VALUE_FN = "valueFn",
        LAZY_ADD = "lazyAdd",

        // Used for internal state management
        ADDED = "added",
        BYPASS_PROXY = "_bypassProxy",
        INITIALIZING = "initializing",
        INIT_VALUE = "initValue",
        LAZY = "lazy",
        IS_LAZY_ADD = "isLazyAdd",

        INVALID_VALUE;

    /**
     * <p>
     * AttributeCore provides the lightest level of configurable attribute support. It is designed to be
     * augmented on to a host class, and provides the host with the ability to configure
     * attributes to store and retrieve state, <strong>but without support for attribute change events</strong>.
     * </p>
     * <p>For example, attributes added to the host can be configured:</p>
     * <ul>
     *     <li>As read only.</li>
     *     <li>As write once.</li>
     *     <li>With a setter function, which can be used to manipulate
     *     values passed to Attribute's <a href="#method_set">set</a> method, before they are stored.</li>
     *     <li>With a getter function, which can be used to manipulate stored values,
     *     before they are returned by Attribute's <a href="#method_get">get</a> method.</li>
     *     <li>With a validator function, to validate values before they are stored.</li>
     * </ul>
     *
     * <p>See the <a href="#method_addAttr">addAttr</a> method, for the complete set of configuration
     * options available for attributes.</p>
     *
     * <p>Object/Classes based on AttributeCore can augment <a href="AttributeObservable.html">AttributeObservable</a>
     * (with true for overwrite) and <a href="AttributeExtras.html">AttributeExtras</a> to add attribute event and
     * additional, less commonly used attribute methods, such as `modifyAttr`, `removeAttr` and `reset`.</p>
     *
     * @class AttributeCore
     * @param attrs {Object} The attributes to add during construction (passed through to <a href="#method_addAttrs">addAttrs</a>).
     *        These can also be defined on the constructor being augmented with Attribute by defining the ATTRS property on the constructor.
     * @param values {Object} The initial attribute values to apply (passed through to <a href="#method_addAttrs">addAttrs</a>).
     *        These are not merged/cloned. The caller is responsible for isolating user provided values if required.
     * @param lazy {boolean} Whether or not to add attributes lazily (passed through to <a href="#method_addAttrs">addAttrs</a>).
     */
    _yuitest_coverline("build/attribute-core/attribute-core.js", 225);
function AttributeCore(attrs, values, lazy) {
        // HACK: Fix #2531929
        // Complete hack, to make sure the first clone of a node value in IE doesn't doesn't hurt state - maintains 3.4.1 behavior.
        // Too late in the release cycle to do anything about the core problem.
        // The root issue is that cloning a Y.Node instance results in an object which barfs in IE, when you access it's properties (since 3.3.0).
        _yuitest_coverfunc("build/attribute-core/attribute-core.js", "AttributeCore", 225);
_yuitest_coverline("build/attribute-core/attribute-core.js", 230);
this._yuievt = null;

        _yuitest_coverline("build/attribute-core/attribute-core.js", 232);
this._initAttrHost(attrs, values, lazy);
    }

    /**
     * <p>The value to return from an attribute setter in order to prevent the set from going through.</p>
     *
     * <p>You can return this value from your setter if you wish to combine validator and setter
     * functionality into a single setter function, which either returns the massaged value to be stored or
     * AttributeCore.INVALID_VALUE to prevent invalid values from being stored.</p>
     *
     * @property INVALID_VALUE
     * @type Object
     * @static
     * @final
     */
    _yuitest_coverline("build/attribute-core/attribute-core.js", 247);
AttributeCore.INVALID_VALUE = {};
    _yuitest_coverline("build/attribute-core/attribute-core.js", 248);
INVALID_VALUE = AttributeCore.INVALID_VALUE;

    /**
     * The list of properties which can be configured for
     * each attribute (e.g. setter, getter, writeOnce etc.).
     *
     * This property is used internally as a whitelist for faster
     * Y.mix operations.
     *
     * @property _ATTR_CFG
     * @type Array
     * @static
     * @protected
     */
    _yuitest_coverline("build/attribute-core/attribute-core.js", 262);
AttributeCore._ATTR_CFG = [SETTER, GETTER, VALIDATOR, VALUE, VALUE_FN, WRITE_ONCE, READ_ONLY, LAZY_ADD, BYPASS_PROXY];

    /**
     * Utility method to protect an attribute configuration hash, by merging the
     * entire object and the individual attr config objects.
     *
     * @method protectAttrs
     * @static
     * @param {Object} attrs A hash of attribute to configuration object pairs.
     * @return {Object} A protected version of the `attrs` argument.
     */
    _yuitest_coverline("build/attribute-core/attribute-core.js", 273);
AttributeCore.protectAttrs = function (attrs) {
        _yuitest_coverfunc("build/attribute-core/attribute-core.js", "protectAttrs", 273);
_yuitest_coverline("build/attribute-core/attribute-core.js", 274);
if (attrs) {
            _yuitest_coverline("build/attribute-core/attribute-core.js", 275);
attrs = Y.merge(attrs);
            _yuitest_coverline("build/attribute-core/attribute-core.js", 276);
for (var attr in attrs) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 277);
if (attrs.hasOwnProperty(attr)) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 278);
attrs[attr] = Y.merge(attrs[attr]);
                }
            }
        }

        _yuitest_coverline("build/attribute-core/attribute-core.js", 283);
return attrs;
    };

    _yuitest_coverline("build/attribute-core/attribute-core.js", 286);
AttributeCore.prototype = {

        /**
         * Constructor logic for attributes. Initializes the host state, and sets up the inital attributes passed to the
         * constructor.
         *
         * @method _initAttrHost
         * @param attrs {Object} The attributes to add during construction (passed through to <a href="#method_addAttrs">addAttrs</a>).
         *        These can also be defined on the constructor being augmented with Attribute by defining the ATTRS property on the constructor.
         * @param values {Object} The initial attribute values to apply (passed through to <a href="#method_addAttrs">addAttrs</a>).
         *        These are not merged/cloned. The caller is responsible for isolating user provided values if required.
         * @param lazy {boolean} Whether or not to add attributes lazily (passed through to <a href="#method_addAttrs">addAttrs</a>).
         * @private
         */
        _initAttrHost : function(attrs, values, lazy) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_initAttrHost", 300);
_yuitest_coverline("build/attribute-core/attribute-core.js", 301);
this._state = new Y.State();
            _yuitest_coverline("build/attribute-core/attribute-core.js", 302);
this._initAttrs(attrs, values, lazy);
        },

        /**
         * <p>
         * Adds an attribute with the provided configuration to the host object.
         * </p>
         * <p>
         * The config argument object supports the following properties:
         * </p>
         *
         * <dl>
         *    <dt>value &#60;Any&#62;</dt>
         *    <dd>The initial value to set on the attribute</dd>
         *
         *    <dt>valueFn &#60;Function | String&#62;</dt>
         *    <dd>
         *    <p>A function, which will return the initial value to set on the attribute. This is useful
         *    for cases where the attribute configuration is defined statically, but needs to
         *    reference the host instance ("this") to obtain an initial value. If both the value and valueFn properties are defined,
         *    the value returned by the valueFn has precedence over the value property, unless it returns undefined, in which
         *    case the value property is used.</p>
         *
         *    <p>valueFn can also be set to a string, representing the name of the instance method to be used to retrieve the value.</p>
         *    </dd>
         *
         *    <dt>readOnly &#60;boolean&#62;</dt>
         *    <dd>Whether or not the attribute is read only. Attributes having readOnly set to true
         *        cannot be modified by invoking the set method.</dd>
         *
         *    <dt>writeOnce &#60;boolean&#62; or &#60;string&#62;</dt>
         *    <dd>
         *        Whether or not the attribute is "write once". Attributes having writeOnce set to true,
         *        can only have their values set once, be it through the default configuration,
         *        constructor configuration arguments, or by invoking set.
         *        <p>The writeOnce attribute can also be set to the string "initOnly",
         *         in which case the attribute can only be set during initialization
         *        (when used with Base, this means it can only be set during construction)</p>
         *    </dd>
         *
         *    <dt>setter &#60;Function | String&#62;</dt>
         *    <dd>
         *    <p>The setter function used to massage or normalize the value passed to the set method for the attribute.
         *    The value returned by the setter will be the final stored value. Returning
         *    <a href="#property_Attribute.INVALID_VALUE">Attribute.INVALID_VALUE</a>, from the setter will prevent
         *    the value from being stored.
         *    </p>
         *
         *    <p>setter can also be set to a string, representing the name of the instance method to be used as the setter function.</p>
         *    </dd>
         *
         *    <dt>getter &#60;Function | String&#62;</dt>
         *    <dd>
         *    <p>
         *    The getter function used to massage or normalize the value returned by the get method for the attribute.
         *    The value returned by the getter function is the value which will be returned to the user when they
         *    invoke get.
         *    </p>
         *
         *    <p>getter can also be set to a string, representing the name of the instance method to be used as the getter function.</p>
         *    </dd>
         *
         *    <dt>validator &#60;Function | String&#62;</dt>
         *    <dd>
         *    <p>
         *    The validator function invoked prior to setting the stored value. Returning
         *    false from the validator function will prevent the value from being stored.
         *    </p>
         *
         *    <p>validator can also be set to a string, representing the name of the instance method to be used as the validator function.</p>
         *    </dd>
         *
         *    <dt>lazyAdd &#60;boolean&#62;</dt>
         *    <dd>Whether or not to delay initialization of the attribute until the first call to get/set it.
         *    This flag can be used to over-ride lazy initialization on a per attribute basis, when adding multiple attributes through
         *    the <a href="#method_addAttrs">addAttrs</a> method.</dd>
         *
         * </dl>
         *
         * <p>The setter, getter and validator are invoked with the value and name passed in as the first and second arguments, and with
         * the context ("this") set to the host object.</p>
         *
         * <p>Configuration properties outside of the list mentioned above are considered private properties used internally by attribute,
         * and are not intended for public use.</p>
         *
         * @method addAttr
         *
         * @param {String} name The name of the attribute.
         * @param {Object} config An object with attribute configuration property/value pairs, specifying the configuration for the attribute.
         *
         * <p>
         * <strong>NOTE:</strong> The configuration object is modified when adding an attribute, so if you need
         * to protect the original values, you will need to merge the object.
         * </p>
         *
         * @param {boolean} lazy (optional) Whether or not to add this attribute lazily (on the first call to get/set).
         *
         * @return {Object} A reference to the host object.
         *
         * @chainable
         */
        addAttr: function(name, config, lazy) {


            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "addAttr", 403);
_yuitest_coverline("build/attribute-core/attribute-core.js", 406);
var host = this, // help compression
                state = host._state,
                value,
                hasValue;

            _yuitest_coverline("build/attribute-core/attribute-core.js", 411);
config = config || {};

            _yuitest_coverline("build/attribute-core/attribute-core.js", 413);
lazy = (LAZY_ADD in config) ? config[LAZY_ADD] : lazy;

            _yuitest_coverline("build/attribute-core/attribute-core.js", 415);
if (lazy && !host.attrAdded(name)) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 416);
state.addAll(name, {
                    lazy : config,
                    added : true
                });
            } else {
                /*jshint maxlen:200*/

                _yuitest_coverline("build/attribute-core/attribute-core.js", 423);
if (!host.attrAdded(name) || state.get(name, IS_LAZY_ADD)) {

                    _yuitest_coverline("build/attribute-core/attribute-core.js", 425);
hasValue = (VALUE in config);

                /*jshint maxlen:150*/

                    _yuitest_coverline("build/attribute-core/attribute-core.js", 429);
if (hasValue) {
                        // We'll go through set, don't want to set value in config directly
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 431);
value = config.value;
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 432);
delete config.value;
                    }

                    _yuitest_coverline("build/attribute-core/attribute-core.js", 435);
config.added = true;
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 436);
config.initializing = true;

                    _yuitest_coverline("build/attribute-core/attribute-core.js", 438);
state.addAll(name, config);

                    _yuitest_coverline("build/attribute-core/attribute-core.js", 440);
if (hasValue) {
                        // Go through set, so that raw values get normalized/validated
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 442);
host.set(name, value);
                    }

                    _yuitest_coverline("build/attribute-core/attribute-core.js", 445);
state.remove(name, INITIALIZING);
                }
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 449);
return host;
        },

        /**
         * Checks if the given attribute has been added to the host
         *
         * @method attrAdded
         * @param {String} name The name of the attribute to check.
         * @return {boolean} true if an attribute with the given name has been added, false if it hasn't.
         *         This method will return true for lazily added attributes.
         */
        attrAdded: function(name) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "attrAdded", 460);
_yuitest_coverline("build/attribute-core/attribute-core.js", 461);
return !!this._state.get(name, ADDED);
        },

        /**
         * Returns the current value of the attribute. If the attribute
         * has been configured with a 'getter' function, this method will delegate
         * to the 'getter' to obtain the value of the attribute.
         *
         * @method get
         *
         * @param {String} name The name of the attribute. If the value of the attribute is an Object,
         * dot notation can be used to obtain the value of a property of the object (e.g. <code>get("x.y.z")</code>)
         *
         * @return {Any} The value of the attribute
         */
        get : function(name) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "get", 476);
_yuitest_coverline("build/attribute-core/attribute-core.js", 477);
return this._getAttr(name);
        },

        /**
         * Checks whether or not the attribute is one which has been
         * added lazily and still requires initialization.
         *
         * @method _isLazyAttr
         * @private
         * @param {String} name The name of the attribute
         * @return {boolean} true if it's a lazily added attribute, false otherwise.
         */
        _isLazyAttr: function(name) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_isLazyAttr", 489);
_yuitest_coverline("build/attribute-core/attribute-core.js", 490);
return this._state.get(name, LAZY);
        },

        /**
         * Finishes initializing an attribute which has been lazily added.
         *
         * @method _addLazyAttr
         * @private
         * @param {Object} name The name of the attribute
         */
        _addLazyAttr: function(name) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_addLazyAttr", 500);
_yuitest_coverline("build/attribute-core/attribute-core.js", 501);
var state = this._state,
                lazyCfg = state.get(name, LAZY);

            _yuitest_coverline("build/attribute-core/attribute-core.js", 504);
state.add(name, IS_LAZY_ADD, true);
            _yuitest_coverline("build/attribute-core/attribute-core.js", 505);
state.remove(name, LAZY);
            _yuitest_coverline("build/attribute-core/attribute-core.js", 506);
this.addAttr(name, lazyCfg);
        },

        /**
         * Sets the value of an attribute.
         *
         * @method set
         * @chainable
         *
         * @param {String} name The name of the attribute. If the
         * current value of the attribute is an Object, dot notation can be used
         * to set the value of a property within the object (e.g. <code>set("x.y.z", 5)</code>).
         * @param {Any} value The value to set the attribute to.
         * @param {Object} [opts] Optional data providing the circumstances for the change.
         * @return {Object} A reference to the host object.
         */
        set : function(name, val, opts) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "set", 522);
_yuitest_coverline("build/attribute-core/attribute-core.js", 523);
return this._setAttr(name, val, opts);
        },

        /**
         * Allows setting of readOnly/writeOnce attributes. See <a href="#method_set">set</a> for argument details.
         *
         * @method _set
         * @protected
         * @chainable
         *
         * @param {String} name The name of the attribute.
         * @param {Any} val The value to set the attribute to.
         * @param {Object} [opts] Optional data providing the circumstances for the change.
         * @return {Object} A reference to the host object.
         */
        _set : function(name, val, opts) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_set", 538);
_yuitest_coverline("build/attribute-core/attribute-core.js", 539);
return this._setAttr(name, val, opts, true);
        },

        /**
         * Provides the common implementation for the public set and protected _set methods.
         *
         * See <a href="#method_set">set</a> for argument details.
         *
         * @method _setAttr
         * @protected
         * @chainable
         *
         * @param {String} name The name of the attribute.
         * @param {Any} value The value to set the attribute to.
         * @param {Object} [opts] Optional data providing the circumstances for the change.
         * @param {boolean} force If true, allows the caller to set values for
         * readOnly or writeOnce attributes which have already been set.
         *
         * @return {Object} A reference to the host object.
         */
        _setAttr : function(name, val, opts, force)  {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_setAttr", 559);
_yuitest_coverline("build/attribute-core/attribute-core.js", 560);
var allowSet = true,
                state = this._state,
                stateProxy = this._stateProxy,
                cfg,
                initialSet,
                strPath,
                path,
                currVal,
                writeOnce,
                initializing;

            _yuitest_coverline("build/attribute-core/attribute-core.js", 571);
if (name.indexOf(DOT) !== -1) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 572);
strPath = name;
                _yuitest_coverline("build/attribute-core/attribute-core.js", 573);
path = name.split(DOT);
                _yuitest_coverline("build/attribute-core/attribute-core.js", 574);
name = path.shift();
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 577);
if (this._isLazyAttr(name)) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 578);
this._addLazyAttr(name);
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 581);
cfg = state.getAll(name, true) || {};

            _yuitest_coverline("build/attribute-core/attribute-core.js", 583);
initialSet = (!(VALUE in cfg));

            _yuitest_coverline("build/attribute-core/attribute-core.js", 585);
if (stateProxy && name in stateProxy && !cfg._bypassProxy) {
                // TODO: Value is always set for proxy. Can we do any better? Maybe take a snapshot as the initial value for the first call to set?
                _yuitest_coverline("build/attribute-core/attribute-core.js", 587);
initialSet = false;
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 590);
writeOnce = cfg.writeOnce;
            _yuitest_coverline("build/attribute-core/attribute-core.js", 591);
initializing = cfg.initializing;

            _yuitest_coverline("build/attribute-core/attribute-core.js", 593);
if (!initialSet && !force) {

                _yuitest_coverline("build/attribute-core/attribute-core.js", 595);
if (writeOnce) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 596);
allowSet = false;
                }

                _yuitest_coverline("build/attribute-core/attribute-core.js", 599);
if (cfg.readOnly) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 600);
allowSet = false;
                }
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 604);
if (!initializing && !force && writeOnce === INIT_ONLY) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 605);
allowSet = false;
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 608);
if (allowSet) {
                // Don't need currVal if initialSet (might fail in custom getter if it always expects a non-undefined/non-null value)
                _yuitest_coverline("build/attribute-core/attribute-core.js", 610);
if (!initialSet) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 611);
currVal =  this.get(name);
                }

                _yuitest_coverline("build/attribute-core/attribute-core.js", 614);
if (path) {
                   _yuitest_coverline("build/attribute-core/attribute-core.js", 615);
val = O.setValue(Y.clone(currVal), path, val);

                   _yuitest_coverline("build/attribute-core/attribute-core.js", 617);
if (val === undefined) {
                       _yuitest_coverline("build/attribute-core/attribute-core.js", 618);
allowSet = false;
                   }
                }

                _yuitest_coverline("build/attribute-core/attribute-core.js", 622);
if (allowSet) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 623);
opts = opts || {};
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 624);
if (!this._fireAttrChange || initializing) {
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 625);
this._setAttrVal(name, strPath, currVal, val, opts);
                    } else {
                        // HACK - no real reason core needs to know about _fireAttrChange, but
                        // it adds fn hops if we want to break it out. Not sure it's worth it for this critical path
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 629);
this._fireAttrChange(name, strPath, currVal, val, opts);
                    }
                }
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 634);
return this;
        },

        /**
         * Provides the common implementation for the public get method,
         * allowing Attribute hosts to over-ride either method.
         *
         * See <a href="#method_get">get</a> for argument details.
         *
         * @method _getAttr
         * @protected
         * @chainable
         *
         * @param {String} name The name of the attribute.
         * @return {Any} The value of the attribute.
         */
        _getAttr : function(name) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_getAttr", 650);
_yuitest_coverline("build/attribute-core/attribute-core.js", 651);
var host = this, // help compression
                fullName = name,
                state = host._state,
                path,
                getter,
                val,
                cfg;

            _yuitest_coverline("build/attribute-core/attribute-core.js", 659);
if (name.indexOf(DOT) !== -1) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 660);
path = name.split(DOT);
                _yuitest_coverline("build/attribute-core/attribute-core.js", 661);
name = path.shift();
            }

            // On Demand - Should be rare - handles out of order valueFn references
            _yuitest_coverline("build/attribute-core/attribute-core.js", 665);
if (host._tCfgs && host._tCfgs[name]) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 666);
cfg = {};
                _yuitest_coverline("build/attribute-core/attribute-core.js", 667);
cfg[name] = host._tCfgs[name];
                _yuitest_coverline("build/attribute-core/attribute-core.js", 668);
delete host._tCfgs[name];
                _yuitest_coverline("build/attribute-core/attribute-core.js", 669);
host._addAttrs(cfg, host._tVals);
            }

            // Lazy Init
            _yuitest_coverline("build/attribute-core/attribute-core.js", 673);
if (host._isLazyAttr(name)) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 674);
host._addLazyAttr(name);
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 677);
val = host._getStateVal(name);

            _yuitest_coverline("build/attribute-core/attribute-core.js", 679);
getter = state.get(name, GETTER);

            _yuitest_coverline("build/attribute-core/attribute-core.js", 681);
if (getter && !getter.call) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 682);
getter = this[getter];
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 685);
val = (getter) ? getter.call(host, val, fullName) : val;
            _yuitest_coverline("build/attribute-core/attribute-core.js", 686);
val = (path) ? O.getValue(val, path) : val;

            _yuitest_coverline("build/attribute-core/attribute-core.js", 688);
return val;
        },

        /**
         * Gets the stored value for the attribute, from either the
         * internal state object, or the state proxy if it exits
         *
         * @method _getStateVal
         * @private
         * @param {String} name The name of the attribute
         * @return {Any} The stored value of the attribute
         */
        _getStateVal : function(name) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_getStateVal", 700);
_yuitest_coverline("build/attribute-core/attribute-core.js", 701);
var stateProxy = this._stateProxy;
            _yuitest_coverline("build/attribute-core/attribute-core.js", 702);
return stateProxy && (name in stateProxy) && !this._state.get(name, BYPASS_PROXY) ? stateProxy[name] : this._state.get(name, VALUE);
        },

        /**
         * Sets the stored value for the attribute, in either the
         * internal state object, or the state proxy if it exits
         *
         * @method _setStateVal
         * @private
         * @param {String} name The name of the attribute
         * @param {Any} value The value of the attribute
         */
        _setStateVal : function(name, value) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_setStateVal", 714);
_yuitest_coverline("build/attribute-core/attribute-core.js", 715);
var stateProxy = this._stateProxy;
            _yuitest_coverline("build/attribute-core/attribute-core.js", 716);
if (stateProxy && (name in stateProxy) && !this._state.get(name, BYPASS_PROXY)) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 717);
stateProxy[name] = value;
            } else {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 719);
this._state.add(name, VALUE, value);
            }
        },

        /**
         * Updates the stored value of the attribute in the privately held State object,
         * if validation and setter passes.
         *
         * @method _setAttrVal
         * @private
         * @param {String} attrName The attribute name.
         * @param {String} subAttrName The sub-attribute name, if setting a sub-attribute property ("x.y.z").
         * @param {Any} prevVal The currently stored value of the attribute.
         * @param {Any} newVal The value which is going to be stored.
         * @param {Object} [opts] Optional data providing the circumstances for the change.
         *
         * @return {booolean} true if the new attribute value was stored, false if not.
         */
        _setAttrVal : function(attrName, subAttrName, prevVal, newVal, opts) {

            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_setAttrVal", 737);
_yuitest_coverline("build/attribute-core/attribute-core.js", 739);
var host = this,
                allowSet = true,
                cfg = this._state.getAll(attrName, true) || {},
                validator = cfg.validator,
                setter = cfg.setter,
                initializing = cfg.initializing,
                prevRawVal = this._getStateVal(attrName),
                name = subAttrName || attrName,
                retVal,
                valid;

            _yuitest_coverline("build/attribute-core/attribute-core.js", 750);
if (validator) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 751);
if (!validator.call) {
                    // Assume string - trying to keep critical path tight, so avoiding Lang check
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 753);
validator = this[validator];
                }
                _yuitest_coverline("build/attribute-core/attribute-core.js", 755);
if (validator) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 756);
valid = validator.call(host, newVal, name, opts);

                    _yuitest_coverline("build/attribute-core/attribute-core.js", 758);
if (!valid && initializing) {
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 759);
newVal = cfg.defaultValue;
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 760);
valid = true; // Assume it's valid, for perf.
                    }
                }
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 765);
if (!validator || valid) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 766);
if (setter) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 767);
if (!setter.call) {
                        // Assume string - trying to keep critical path tight, so avoiding Lang check
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 769);
setter = this[setter];
                    }
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 771);
if (setter) {
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 772);
retVal = setter.call(host, newVal, name, opts);

                        _yuitest_coverline("build/attribute-core/attribute-core.js", 774);
if (retVal === INVALID_VALUE) {
                            _yuitest_coverline("build/attribute-core/attribute-core.js", 775);
if (initializing) {
                                _yuitest_coverline("build/attribute-core/attribute-core.js", 776);
newVal = cfg.defaultValue;
                            } else {
                                _yuitest_coverline("build/attribute-core/attribute-core.js", 778);
allowSet = false;
                            }
                        } else {_yuitest_coverline("build/attribute-core/attribute-core.js", 780);
if (retVal !== undefined){
                            _yuitest_coverline("build/attribute-core/attribute-core.js", 781);
newVal = retVal;
                        }}
                    }
                }

                _yuitest_coverline("build/attribute-core/attribute-core.js", 786);
if (allowSet) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 787);
if(!subAttrName && (newVal === prevRawVal) && !Lang.isObject(newVal)) {
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 788);
allowSet = false;
                    } else {
                        // Store value
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 791);
if (!(INIT_VALUE in cfg)) {
                            _yuitest_coverline("build/attribute-core/attribute-core.js", 792);
cfg.initValue = newVal;
                        }
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 794);
host._setStateVal(attrName, newVal);
                    }
                }

            } else {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 799);
allowSet = false;
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 802);
return allowSet;
        },

        /**
         * Sets multiple attribute values.
         *
         * @method setAttrs
         * @param {Object} attrs  An object with attributes name/value pairs.
         * @param {Object} [opts] Optional data providing the circumstances for the change.
         * @return {Object} A reference to the host object.
         * @chainable
         */
        setAttrs : function(attrs, opts) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "setAttrs", 814);
_yuitest_coverline("build/attribute-core/attribute-core.js", 815);
return this._setAttrs(attrs, opts);
        },

        /**
         * Implementation behind the public setAttrs method, to set multiple attribute values.
         *
         * @method _setAttrs
         * @protected
         * @param {Object} attrs  An object with attributes name/value pairs.
         * @param {Object} [opts] Optional data providing the circumstances for the change
         * @return {Object} A reference to the host object.
         * @chainable
         */
        _setAttrs : function(attrs, opts) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_setAttrs", 828);
_yuitest_coverline("build/attribute-core/attribute-core.js", 829);
var attr;
            _yuitest_coverline("build/attribute-core/attribute-core.js", 830);
for (attr in attrs) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 831);
if ( attrs.hasOwnProperty(attr) ) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 832);
this.set(attr, attrs[attr], opts);
                }
            }
            _yuitest_coverline("build/attribute-core/attribute-core.js", 835);
return this;
        },

        /**
         * Gets multiple attribute values.
         *
         * @method getAttrs
         * @param {Array | boolean} attrs Optional. An array of attribute names. If omitted, all attribute values are
         * returned. If set to true, all attributes modified from their initial values are returned.
         * @return {Object} An object with attribute name/value pairs.
         */
        getAttrs : function(attrs) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "getAttrs", 846);
_yuitest_coverline("build/attribute-core/attribute-core.js", 847);
return this._getAttrs(attrs);
        },

        /**
         * Implementation behind the public getAttrs method, to get multiple attribute values.
         *
         * @method _getAttrs
         * @protected
         * @param {Array | boolean} attrs Optional. An array of attribute names. If omitted, all attribute values are
         * returned. If set to true, all attributes modified from their initial values are returned.
         * @return {Object} An object with attribute name/value pairs.
         */
        _getAttrs : function(attrs) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_getAttrs", 859);
_yuitest_coverline("build/attribute-core/attribute-core.js", 860);
var obj = {},
                attr, i, len,
                modifiedOnly = (attrs === true);

            // TODO - figure out how to get all "added"
            _yuitest_coverline("build/attribute-core/attribute-core.js", 865);
if (!attrs || modifiedOnly) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 866);
attrs = O.keys(this._state.data);
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 869);
for (i = 0, len = attrs.length; i < len; i++) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 870);
attr = attrs[i];

                _yuitest_coverline("build/attribute-core/attribute-core.js", 872);
if (!modifiedOnly || this._getStateVal(attr) != this._state.get(attr, INIT_VALUE)) {
                    // Go through get, to honor cloning/normalization
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 874);
obj[attr] = this.get(attr);
                }
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 878);
return obj;
        },

        /**
         * Configures a group of attributes, and sets initial values.
         *
         * <p>
         * <strong>NOTE:</strong> This method does not isolate the configuration object by merging/cloning.
         * The caller is responsible for merging/cloning the configuration object if required.
         * </p>
         *
         * @method addAttrs
         * @chainable
         *
         * @param {Object} cfgs An object with attribute name/configuration pairs.
         * @param {Object} values An object with attribute name/value pairs, defining the initial values to apply.
         * Values defined in the cfgs argument will be over-written by values in this argument unless defined as read only.
         * @param {boolean} lazy Whether or not to delay the intialization of these attributes until the first call to get/set.
         * Individual attributes can over-ride this behavior by defining a lazyAdd configuration property in their configuration.
         * See <a href="#method_addAttr">addAttr</a>.
         *
         * @return {Object} A reference to the host object.
         */
        addAttrs : function(cfgs, values, lazy) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "addAttrs", 901);
_yuitest_coverline("build/attribute-core/attribute-core.js", 902);
var host = this; // help compression
            _yuitest_coverline("build/attribute-core/attribute-core.js", 903);
if (cfgs) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 904);
host._tCfgs = cfgs;
                _yuitest_coverline("build/attribute-core/attribute-core.js", 905);
host._tVals = host._normAttrVals(values);
                _yuitest_coverline("build/attribute-core/attribute-core.js", 906);
host._addAttrs(cfgs, host._tVals, lazy);
                _yuitest_coverline("build/attribute-core/attribute-core.js", 907);
host._tCfgs = host._tVals = null;
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 910);
return host;
        },

        /**
         * Implementation behind the public addAttrs method.
         *
         * This method is invoked directly by get if it encounters a scenario
         * in which an attribute's valueFn attempts to obtain the
         * value an attribute in the same group of attributes, which has not yet
         * been added (on demand initialization).
         *
         * @method _addAttrs
         * @private
         * @param {Object} cfgs An object with attribute name/configuration pairs.
         * @param {Object} values An object with attribute name/value pairs, defining the initial values to apply.
         * Values defined in the cfgs argument will be over-written by values in this argument unless defined as read only.
         * @param {boolean} lazy Whether or not to delay the intialization of these attributes until the first call to get/set.
         * Individual attributes can over-ride this behavior by defining a lazyAdd configuration property in their configuration.
         * See <a href="#method_addAttr">addAttr</a>.
         */
        _addAttrs : function(cfgs, values, lazy) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_addAttrs", 930);
_yuitest_coverline("build/attribute-core/attribute-core.js", 931);
var host = this, // help compression
                attr,
                attrCfg,
                value;

            _yuitest_coverline("build/attribute-core/attribute-core.js", 936);
for (attr in cfgs) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 937);
if (cfgs.hasOwnProperty(attr)) {

                    // Not Merging. Caller is responsible for isolating configs
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 940);
attrCfg = cfgs[attr];
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 941);
attrCfg.defaultValue = attrCfg.value;

                    // Handle simple, complex and user values, accounting for read-only
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 944);
value = host._getAttrInitVal(attr, attrCfg, host._tVals);

                    _yuitest_coverline("build/attribute-core/attribute-core.js", 946);
if (value !== undefined) {
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 947);
attrCfg.value = value;
                    }

                    _yuitest_coverline("build/attribute-core/attribute-core.js", 950);
if (host._tCfgs[attr]) {
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 951);
delete host._tCfgs[attr];
                    }

                    _yuitest_coverline("build/attribute-core/attribute-core.js", 954);
host.addAttr(attr, attrCfg, lazy);
                }
            }
        },

        /**
         * Utility method to protect an attribute configuration
         * hash, by merging the entire object and the individual
         * attr config objects.
         *
         * @method _protectAttrs
         * @protected
         * @param {Object} attrs A hash of attribute to configuration object pairs.
         * @return {Object} A protected version of the attrs argument.
         * @deprecated Use `AttributeCore.protectAttrs()` or
         *   `Attribute.protectAttrs()` which are the same static utility method.
         */
        _protectAttrs : AttributeCore.protectAttrs,

        /**
         * Utility method to normalize attribute values. The base implementation
         * simply merges the hash to protect the original.
         *
         * @method _normAttrVals
         * @param {Object} valueHash An object with attribute name/value pairs
         *
         * @return {Object} An object literal with 2 properties - "simple" and "complex",
         * containing simple and complex attribute values respectively keyed
         * by the top level attribute name, or null, if valueHash is falsey.
         *
         * @private
         */
        _normAttrVals : function(valueHash) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_normAttrVals", 986);
_yuitest_coverline("build/attribute-core/attribute-core.js", 987);
var vals = {},
                subvals = {},
                path,
                attr,
                v, k;

            _yuitest_coverline("build/attribute-core/attribute-core.js", 993);
if (valueHash) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 994);
for (k in valueHash) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 995);
if (valueHash.hasOwnProperty(k)) {
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 996);
if (k.indexOf(DOT) !== -1) {
                            _yuitest_coverline("build/attribute-core/attribute-core.js", 997);
path = k.split(DOT);
                            _yuitest_coverline("build/attribute-core/attribute-core.js", 998);
attr = path.shift();
                            _yuitest_coverline("build/attribute-core/attribute-core.js", 999);
v = subvals[attr] = subvals[attr] || [];
                            _yuitest_coverline("build/attribute-core/attribute-core.js", 1000);
v[v.length] = {
                                path : path,
                                value: valueHash[k]
                            };
                        } else {
                            _yuitest_coverline("build/attribute-core/attribute-core.js", 1005);
vals[k] = valueHash[k];
                        }
                    }
                }
                _yuitest_coverline("build/attribute-core/attribute-core.js", 1009);
return { simple:vals, complex:subvals };
            } else {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 1011);
return null;
            }
        },

        /**
         * Returns the initial value of the given attribute from
         * either the default configuration provided, or the
         * over-ridden value if it exists in the set of initValues
         * provided and the attribute is not read-only.
         *
         * @param {String} attr The name of the attribute
         * @param {Object} cfg The attribute configuration object
         * @param {Object} initValues The object with simple and complex attribute name/value pairs returned from _normAttrVals
         *
         * @return {Any} The initial value of the attribute.
         *
         * @method _getAttrInitVal
         * @private
         */
        _getAttrInitVal : function(attr, cfg, initValues) {
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_getAttrInitVal", 1030);
_yuitest_coverline("build/attribute-core/attribute-core.js", 1031);
var val = cfg.value,
                valFn = cfg.valueFn,
                tmpVal,
                initValSet = false,
                simple,
                complex,
                i,
                l,
                path,
                subval,
                subvals;

            _yuitest_coverline("build/attribute-core/attribute-core.js", 1043);
if (!cfg.readOnly && initValues) {
                // Simple Attributes
                _yuitest_coverline("build/attribute-core/attribute-core.js", 1045);
simple = initValues.simple;
                _yuitest_coverline("build/attribute-core/attribute-core.js", 1046);
if (simple && simple.hasOwnProperty(attr)) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 1047);
val = simple[attr];
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 1048);
initValSet = true;
                }
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 1052);
if (valFn && !initValSet) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 1053);
if (!valFn.call) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 1054);
valFn = this[valFn];
                }
                _yuitest_coverline("build/attribute-core/attribute-core.js", 1056);
if (valFn) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 1057);
tmpVal = valFn.call(this, attr);
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 1058);
val = tmpVal;
                }
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 1062);
if (!cfg.readOnly && initValues) {

                // Complex Attributes (complex values applied, after simple, in case both are set)
                _yuitest_coverline("build/attribute-core/attribute-core.js", 1065);
complex = initValues.complex;

                _yuitest_coverline("build/attribute-core/attribute-core.js", 1067);
if (complex && complex.hasOwnProperty(attr) && (val !== undefined) && (val !== null)) {
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 1068);
subvals = complex[attr];
                    _yuitest_coverline("build/attribute-core/attribute-core.js", 1069);
for (i = 0, l = subvals.length; i < l; ++i) {
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 1070);
path = subvals[i].path;
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 1071);
subval = subvals[i].value;
                        _yuitest_coverline("build/attribute-core/attribute-core.js", 1072);
O.setValue(val, path, subval);
                    }
                }
            }

            _yuitest_coverline("build/attribute-core/attribute-core.js", 1077);
return val;
        },

        /**
         * Utility method to set up initial attributes defined during construction,
         * either through the constructor.ATTRS property, or explicitly passed in.
         *
         * @method _initAttrs
         * @protected
         * @param attrs {Object} The attributes to add during construction (passed through to <a href="#method_addAttrs">addAttrs</a>).
         *        These can also be defined on the constructor being augmented with Attribute by defining the ATTRS property on the constructor.
         * @param values {Object} The initial attribute values to apply (passed through to <a href="#method_addAttrs">addAttrs</a>).
         *        These are not merged/cloned. The caller is responsible for isolating user provided values if required.
         * @param lazy {boolean} Whether or not to add attributes lazily (passed through to <a href="#method_addAttrs">addAttrs</a>).
         */
        _initAttrs : function(attrs, values, lazy) {
            // ATTRS support for Node, which is not Base based
            _yuitest_coverfunc("build/attribute-core/attribute-core.js", "_initAttrs", 1092);
_yuitest_coverline("build/attribute-core/attribute-core.js", 1094);
attrs = attrs || this.constructor.ATTRS;

            _yuitest_coverline("build/attribute-core/attribute-core.js", 1096);
var Base = Y.Base,
                BaseCore = Y.BaseCore,
                baseInst = (Base && Y.instanceOf(this, Base)),
                baseCoreInst = (!baseInst && BaseCore && Y.instanceOf(this, BaseCore));

            _yuitest_coverline("build/attribute-core/attribute-core.js", 1101);
if (attrs && !baseInst && !baseCoreInst) {
                _yuitest_coverline("build/attribute-core/attribute-core.js", 1102);
this.addAttrs(Y.AttributeCore.protectAttrs(attrs), values, lazy);
            }
        }
    };

    _yuitest_coverline("build/attribute-core/attribute-core.js", 1107);
Y.AttributeCore = AttributeCore;


}, '@VERSION@', {"requires": ["oop"]});
