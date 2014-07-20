// @tag core
/**
 * @class Ext
 *
 * The Ext namespace (global object) encapsulates all classes, singletons, and
 * utility methods provided by Sencha's libraries.
 *
 * Most user interface Components are at a lower level of nesting in the namespace,
 * but many common utility functions are provided as direct properties of the Ext namespace.
 *
 * Also many frequently used methods from other classes are provided as shortcuts
 * within the Ext namespace. For example {@link Ext#getCmp Ext.getCmp} aliases
 * {@link Ext.ComponentManager#get Ext.ComponentManager.get}.
 *
 * Many applications are initiated with {@link Ext#application Ext.application} which is
 * called once the DOM is ready. This ensures all scripts have been loaded, preventing
 * dependency issues. For example:
 *
 *      Ext.application({
 *          name: 'MyApp',
 *
 *          launch: function () {
 *              Ext.Msg.alert(this.name, 'Ready to go!');
 *          }
 *      });
 *
 * <b><a href="http://www.sencha.com/products/sencha-cmd/">Sencha Cmd</a></b> is a free tool
 * for helping you generate and build Ext JS (and Sencha Touch) applications. See
 * `{@link Ext.app.Application Application}` for more information about creating an app.
 *
 * A lower-level technique that does not use the `Ext.app.Application` architecture is
 * {@link Ext#onReady Ext.onReady}.
 *
 * For more information about how to use the Ext classes, see:
 *
 * - <a href="http://www.sencha.com/learn/">The Learning Center</a>
 * - <a href="http://www.sencha.com/learn/Ext_FAQ">The FAQ</a>
 * - <a href="http://www.sencha.com/forum/">The forums</a>
 *
 * @singleton
 */
var Ext = Ext || {};
// @require Ext.Boot
// @define Ext
Ext._startTime = Date.now ? Date.now() : (+ new Date());
(function() {
    var global = this,
        objectPrototype = Object.prototype,
        toString = objectPrototype.toString,
        enumerables = [//'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
                       'valueOf', 'toLocaleString', 'toString', 'constructor'],
        emptyFn = function () {},
        privateFn = function () {},
        identityFn = function(o) { return o; },
        // This is the "$previous" method of a hook function on an instance. When called, it
        // calls through the class prototype by the name of the called method.
        callOverrideParent = function () {
            var method = callOverrideParent.caller.caller; // skip callParent (our caller)
            return method.$owner.prototype[method.$name].apply(this, arguments);
        },
        manifest = Ext.manifest || {},
        i,
        iterableRe = /\[object\s*(?:Array|Arguments|\w*Collection|\w*List|HTML\s+document\.all\s+class)\]/,
        MSDateRe = /^\\?\/Date\(([-+])?(\d+)(?:[+-]\d{4})?\)\\?\/$/;

    Ext.global = global;

    // Mark these special fn's for easy identification:
    emptyFn.$nullFn = identityFn.$nullFn = emptyFn.$emptyFn = identityFn.$identityFn =
        privateFn.$nullFn = true;
    privateFn.$privacy = 'framework';

    // These are emptyFn's in core and are redefined only in Ext JS (we use this syntax
    // so Cmd does not detect them):
    Ext['suspendLayouts'] = Ext['resumeLayouts'] = emptyFn;

    for (i in { toString: 1 }) {
        enumerables = null;
    }

    /**
     * An array containing extra enumerables for old browsers
     * @property {String[]}
     */
    Ext.enumerables = enumerables;

    /**
     * Copies all the properties of `config` to the specified `object`. There are two levels
     * of defaulting supported:
     * 
     *      Ext.apply(obj, { a: 1 }, { a: 2 });
     *      //obj.a === 1
     * 
     *      Ext.apply(obj, {  }, { a: 2 });
     *      //obj.a === 2
     * 
     * Note that if recursive merging and cloning without referencing the original objects
     * or arrays is needed, use {@link Ext.Object#merge} instead.
     * 
     * @param {Object} object The receiver of the properties.
     * @param {Object} config The primary source of the properties.
     * @param {Object} [defaults] An object that will also be applied for default values.
     * @return {Object} returns `object`.
     */
    Ext.apply = function(object, config, defaults) {
        if (defaults) {
            Ext.apply(object, defaults);
        }

        if (object && config && typeof config === 'object') {
            var i, j, k;

            for (i in config) {
                object[i] = config[i];
            }

            if (enumerables) {
                for (j = enumerables.length; j--;) {
                    k = enumerables[j];
                    if (config.hasOwnProperty(k)) {
                        object[k] = config[k];
                    }
                }
            }
        }

        return object;
    };

    Ext.buildSettings = Ext.apply({
        baseCSSPrefix: 'x-'
    }, Ext.buildSettings || {});

    Ext.apply(Ext, {
        // private
        idSeed: 0,

        // private
        idPrefix: 'ext-',

        /**
         * @property {Boolean} isSecure
         * True if the page is running over SSL
         * @readonly
         */
        isSecure: /^https/i.test(window.location.protocol),

        /**
         * `true` to automatically uncache orphaned Ext.Elements periodically. If set to
         * `false`, the application will be required to clean up orpaned Ext.Elements and
         * it's listeners as to not cause memory leakage.
         */
        enableGarbageCollector: false,

        /**
         * True to automatically purge event listeners during garbageCollection.
         */
        enableListenerCollection: true,

        /**
         * @property {String} [name='Ext']
         * <p>The name of the property in the global namespace (The <code>window</code> in browser environments) which refers to the current instance of Ext.</p>
         * <p>This is usually <code>"Ext"</code>, but if a sandboxed build of ExtJS is being used, this will be an alternative name.</p>
         * <p>If code is being generated for use by <code>eval</code> or to create a <code>new Function</code>, and the global instance
         * of Ext must be referenced, this is the name that should be built into the code.</p>
         */
        name: Ext.sandboxName || 'Ext',

        /**
         * @property {Function}
         * A reusable empty function for use as `privates` members.
         *
         *      Ext.define('MyClass', {
         *          nothing: Ext.emptyFn,
         *
         *          privates: {
         *              privateNothing: Ext.privateFn
         *          }
         *      });
         *
         */
        privateFn: privateFn,

        /**
         * @property {Function}
         * A reusable empty function.
         */
        emptyFn: emptyFn,

        /**
         * @property {Function}
         * A reusable identity function that simply returns its first argument.
         */
        identityFn: identityFn,

        /**
         * This indicate the start timestamp of current cycle.
         * It is only reliable during dom-event-initiated cycles and
         * {@link Ext.draw.Animator} initiated cycles.
         */
        frameStartTime: +new Date(),

        /**
         * This object is initialized prior to loading the framework (Ext JS or Sencha
         * Touch) and contains settings and other information describing the application.
         *
         * For applications built using Sencha Cmd, this is produced from the `"app.json"`
         * file with information extracted from all of the required packages' `"package.json"`
         * files. This can be set to a string when your application is using the
         * (microloader)[#/guide/microloader]. In this case, the string of "foo" will be
         * requested as `"foo.json"` and the object in that JSON file will parsed and set
         * as this object.
         *
         * @cfg {String/Object} manifest
         *
         * @cfg {String/Object} manifest.compatibility An object keyed by package name with
         * the value being to desired compatibility level as a version number. If this is
         * just a string, this version is assumed to apply to the framework ('ext' or
         * 'touch'). Setting this value to less than 5 for 'ext' will enable the compatibility
         * layer to assist in the application upgrade process. For details on the upgrade
         * process, see the (Upgrade Guide)[#/guides/upgrade_50].
         *
         * @cfg {Object} manifest.debug An object configuring the debugging characteristics
         * of the framework. See `Ext.debugConfig` which is set to this value.
         *
         * @cfg {Object} manifest.packages An object keyed by package name with the value
         * being a subset of the package's `"package.json"` descriptor.
         * @since 5.0.0
         */
        manifest: manifest,

        //<debug>
        /**
         * @cfg {Object} [debugConfig]
         * This object is used to enable or disable debugging for classes or namespaces. The
         * default instance looks like this:
         *
         *      Ext.debugConfig = {
         *          hooks: {
         *              '*': true
         *          }
         *      };
         *
         * Typically applications will set this in their `"app.json"` like so:
         *
         *      {
         *          "debug": {
         *              "hooks": {
         *                  // Default for all namespaces:
         *                  '*': true,
         *
         *                  // Except for Ext namespace which is disabled
         *                  'Ext': false,
         *
         *                  // Except for Ext.layout namespace which is enabled
         *                  'Ext.layout': true
         *              }
         *          }
         *      }
         *
         * Alternatively, because this property is consumed very early in the load process of
         * the framework, this can be set in a `script` tag that is defined prior to loading
         * the framework itself.
         *
         * For example, to enable debugging for the `Ext.layout` namespace only:
         *
         *      var Ext = Ext || {};
         *      Ext.debugConfig = {
         *          hooks: {
         *              //...
         *          }
         *      };
         *
         * For any class declared, the longest matching namespace specified determines if its
         * `debugHooks` will be enabled. The default setting is specified by the '*' property.
         *
         * **NOTE:** This option only applies to debug builds. All debugging is disabled in
         * production builds.
         */
        debugConfig: Ext.debugConfig || manifest.debug || {
            hooks: {
                '*': true
            }
        },
        //</debug>

        /**
         * @property {RegExp}
         * @private
         * Regular expression used for validating identifiers.
         */
        validIdRe: /^[a-z_][a-z0-9\-_]*$/i,

        /**
         * Converts an id (`'foo'`) into an id selector (`'#foo'`).  This method is used
         * internally by the framework whenever an id needs to be converted into a selector
         * and is provided as a hook for those that need to escape IDs selectors since,
         * as of Ext 5.0, the framework no longer escapes IDs by default.
         * @private
         * @param {String} id
         * @return {String}
         */
        makeIdSelector: function(id) {
            //<debug>
            if (!Ext.validIdRe.test(id)) {
                Ext.Error.raise('Invalid id selector: "' + id + '"');
            }
            //</debug>
            return '#' + id;
        },

        /**
        * Generates unique ids. If the object/element is passes and it already has an `id`, it is unchanged.
        * @param {Object} [o] The object to generate an id for.
        * @param {String} [prefix=ext-gen] (optional) The `id` prefix.
        * @return {String} The generated `id`.
        */
        id: function(o, prefix) {
            if (o && o.id) {
                return o.id;
            }

            var id = (prefix || Ext.idPrefix) + (++Ext.idSeed);
            
            if (o) {
                o.id = id;
            }

            return id;
        },

        /**
         * A reusable function which returns the value of `getId()` called upon a single passed parameter.
         * Useful when creating a {@link Ext.util.MixedCollection} of objects keyed by an identifier returned from a `getId` method.
         */
        returnId: function(o) {
            return o.getId();
        },

        /**
         * A reusable function which returns `true`.
         */
        returnTrue: function() {
            return true;
        },

        /**
         * A zero length string which will pass a truth test. Useful for passing to methods
         * which use a truth test to reject <i>falsy</i> values where a string value must be cleared.
         */
        emptyString: new String(),

        /**
         * @property {String} [baseCSSPrefix='x-']
         * The base prefix to use for all `Ext` components. To configure this property, you should use the
         * Ext.buildSettings object before the framework is loaded:
         *
         *     Ext.buildSettings = {
         *         baseCSSPrefix : 'abc-'
         *     };
         *
         * or you can change it before any components are rendered:
         *
         *     Ext.baseCSSPrefix = Ext.buildSettings.baseCSSPrefix = 'abc-';
         *
         * This will change what CSS classes components will use and you should
         * then recompile the SASS changing the `$prefix` SASS variable to match.
         */
        baseCSSPrefix: Ext.buildSettings.baseCSSPrefix,

        /**
         * @property {Object} $eventNameMap
         * A map of event names which contained the lower-cased verions of any mixed
         * case event names.
         * @private
         */
        $eventNameMap: {},

        /**
         * Copies all the properties of config to object if they don't already exist.
         * @param {Object} object The receiver of the properties
         * @param {Object} config The source of the properties
         * @return {Object} returns obj
         */
        applyIf: function(object, config) {
            var property;

            if (object) {
                for (property in config) {
                    if (object[property] === undefined) {
                        object[property] = config[property];
                    }
                }
            }

            return object;
        },

        /**
         * Returns the current timestamp.
         * @return {Number} Milliseconds since UNIX epoch.
         * @method
         */
        now: (global.performance && global.performance.now) ? function() {
            return performance.now();
        } : (Date.now || (Date.now = function() {
            return +new Date();
        })),

        /**
         * Destroys all of the given objects. If arrays are passed, the elements of these
         * are destroyed recusrively.
         *
         * What it means to "destroy" an object depends on the type of object.
         *
         *  * `Array`: Each element of the array is destroyed recursively.
         *  * `Object`: Any object with a `destroy` method will have that method called.
         *
         * @param {Mixed...} args Any number of objects or arrays.
         */
        destroy: function() {
            var ln = arguments.length,
            i, arg;

            for (i = 0; i < ln; i++) {
                arg = arguments[i];
                if (arg) {
                    if (Ext.isArray(arg)) {
                        this.destroy.apply(this, arg);
                    } else if (Ext.isFunction(arg.destroy)) {
                        arg.destroy();
                    }
                }
            }
            return null;
        },

        /**
         * Destroys the specified named members of the given object using `Ext.destroy`. These
         * properties will be set to `null`.
         * @param {Object} object The object who's properties you wish to destroy.
         * @param {String...} args One or more names of the properties to destroy and remove from the object.
         */
        destroyMembers: function (object) {
            for (var ref, name, i = 1, a = arguments, len = a.length; i < len; i++) {
                ref = object[name = a[i]];

                // Avoid adding the property if it does not already exist
                if (ref != null) {
                    object[name] = Ext.destroy(ref);
                }
            }
        },

        /**
         * Overrides members of the specified `target` with the given values.
         *
         * If the `target` is a class declared using {@link Ext#define Ext.define}, the
         * `override` method of that class is called (see {@link Ext.Base#override}) given
         * the `overrides`.
         *
         * If the `target` is a function, it is assumed to be a constructor and the contents
         * of `overrides` are applied to its `prototype` using {@link Ext#apply Ext.apply}.
         *
         * If the `target` is an instance of a class declared using {@link Ext#define Ext.define},
         * the `overrides` are applied to only that instance. In this case, methods are
         * specially processed to allow them to use {@link Ext.Base#callParent}.
         *
         *      var panel = new Ext.Panel({ ... });
         *
         *      Ext.override(panel, {
         *          initComponent: function () {
         *              // extra processing...
         *
         *              this.callParent();
         *          }
         *      });
         *
         * If the `target` is none of these, the `overrides` are applied to the `target`
         * using {@link Ext#apply Ext.apply}.
         *
         * Please refer to {@link Ext#define Ext.define} and {@link Ext.Base#override} for
         * further details.
         *
         * @param {Object} target The target to override.
         * @param {Object} overrides The properties to add or replace on `target`.
         * @method override
         */
        override: function (target, overrides) {
            if (target.$isClass) {
                target.override(overrides);
            } else if (typeof target == 'function') {
                Ext.apply(target.prototype, overrides);
            } else {
                var owner = target.self,
                    name, value;

                if (owner && owner.$isClass) { // if (instance of Ext.define'd class)
                    for (name in overrides) {
                        if (overrides.hasOwnProperty(name)) {
                            value = overrides[name];

                            if (typeof value === 'function') {
                                //<debug>
                                if (owner.$className) {
                                    value.displayName = owner.$className + '#' + name;
                                }
                                //</debug>

                                value.$name = name;
                                value.$owner = owner;
                                value.$previous = target.hasOwnProperty(name)
                                    ? target[name] // already hooked, so call previous hook
                                    : callOverrideParent; // calls by name on prototype
                            }

                            target[name] = value;
                        }
                    }
                } else {
                    Ext.apply(target, overrides);
                }
            }

            return target;
        },

        /**
         * Returns the given value itself if it's not empty, as described in {@link Ext#isEmpty}; returns the default
         * value (second argument) otherwise.
         *
         * @param {Object} value The value to test.
         * @param {Object} defaultValue The value to return if the original value is empty.
         * @param {Boolean} [allowBlank=false] `true` to allow zero length strings to qualify as non-empty.
         * @return {Object} value, if non-empty, else defaultValue.
         */
        valueFrom: function(value, defaultValue, allowBlank){
            return Ext.isEmpty(value, allowBlank) ? defaultValue : value;
        },

        /**
         * Returns true if the passed value is empty, false otherwise. The value is deemed to be empty if it is either:
         *
         * - `null`
         * - `undefined`
         * - a zero-length array
         * - a zero-length string (Unless the `allowEmptyString` parameter is set to `true`)
         *
         * @param {Object} value The value to test.
         * @param {Boolean} [allowEmptyString=false] `true` to allow empty strings.
         * @return {Boolean}
         */
        isEmpty: function(value, allowEmptyString) {
            return (value == null) || (!allowEmptyString ? value === '' : false) || (Ext.isArray(value) && value.length === 0);
        },

        /**
         * Returns `true` if the passed value is a JavaScript Array, `false` otherwise.
         *
         * @param {Object} target The target to test.
         * @return {Boolean}
         * @method
         */
        isArray: ('isArray' in Array) ? Array.isArray : function(value) {
            return toString.call(value) === '[object Array]';
        },

        /**
         * Returns `true` if the passed value is a JavaScript Date object, `false` otherwise.
         * @param {Object} object The object to test.
         * @return {Boolean}
         */
        isDate: function(value) {
            return toString.call(value) === '[object Date]';
        },

        /**
         * Returns 'true' if the passed value is a String that matches the MS Date JSON
         * encoding format.
         * @param {String} value The string to test.
         * @return {Boolean}
         */
        isMSDate: function(value) {
            if (!Ext.isString(value)) {
                return false;
            }
            return MSDateRe.test(value);
        },

        /**
         * Returns `true` if the passed value is a JavaScript Object, `false` otherwise.
         * @param {Object} value The value to test.
         * @return {Boolean}
         * @method
         */
        isObject: (toString.call(null) === '[object Object]') ?
        function(value) {
            // check ownerDocument here as well to exclude DOM nodes
            return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
        } :
        function(value) {
            return toString.call(value) === '[object Object]';
        },

        /**
         * @private
         */
        isSimpleObject: function(value) {
            return value instanceof Object && value.constructor === Object;
        },

        /**
         * Returns `true` if the passed value is a JavaScript 'primitive', a string, number
         * or boolean.
         * @param {Object} value The value to test.
         * @return {Boolean}
         */
        isPrimitive: function(value) {
            var type = typeof value;

            return type === 'string' || type === 'number' || type === 'boolean';
        },

        /**
         * Returns `true` if the passed value is a JavaScript Function, `false` otherwise.
         * @param {Object} value The value to test.
         * @return {Boolean}
         * @method
         */
        isFunction:
        // Safari 3.x and 4.x returns 'function' for typeof <NodeList>, hence we need to fall back to using
        // Object.prototype.toString (slower)
        (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') ? function(value) {
            return !!value && toString.call(value) === '[object Function]';
        } : function(value) {
            return !!value && typeof value === 'function';
        },

        /**
         * Returns `true` if the passed value is a number. Returns `false` for non-finite numbers.
         * @param {Object} value The value to test.
         * @return {Boolean}
         */
        isNumber: function(value) {
            return typeof value === 'number' && isFinite(value);
        },

        /**
         * Validates that a value is numeric.
         * @param {Object} value Examples: 1, '1', '2.34'
         * @return {Boolean} True if numeric, false otherwise
         */
        isNumeric: function(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        },

        /**
         * Returns `true `if the passed value is a string.
         * @param {Object} value The value to test.
         * @return {Boolean}
         */
        isString: function(value) {
            return typeof value === 'string';
        },

        /**
         * Returns `true` if the passed value is a boolean.
         *
         * @param {Object} value The value to test.
         * @return {Boolean}
         */
        isBoolean: function(value) {
            return typeof value === 'boolean';
        },

        /**
         * Returns `true` if the passed value is an HTMLElement
         * @param {Object} value The value to test.
         * @return {Boolean}
         */
        isElement: function(value) {
            return value ? value.nodeType === 1 : false;
        },

        /**
         * Returns `true` if the passed value is a TextNode
         * @param {Object} value The value to test.
         * @return {Boolean}
         */
        isTextNode: function(value) {
            return value ? value.nodeName === "#text" : false;
        },

        /**
         * Returns `true` if the passed value is defined.
         * @param {Object} value The value to test.
         * @return {Boolean}
         */
        isDefined: function(value) {
            return typeof value !== 'undefined';
        },

        /**
         * Returns `true` if the passed value is iterable, that is, if elements of it are addressable using array
         * notation with numeric indices, `false` otherwise.
         *
         * Arrays and function `arguments` objects are iterable. Also HTML collections such as `NodeList` and `HTMLCollection'
         * are iterable.
         *
         * @param {Object} value The value to test
         * @return {Boolean}
         */
        isIterable: function(value) {
            // To be iterable, the object must have a numeric length property and must not be a string or function.
            if (!value || typeof value.length !== 'number' || typeof value === 'string' || Ext.isFunction(value)) {
                return false;
            }

            // Certain "standard" collections in IE (such as document.images) do not offer the correct
            // Javascript Object interface; specifically, they lack the propertyIsEnumerable method.
            // And the item property while it does exist is not typeof "function"
            if (!value.propertyIsEnumerable) {
                return !!value.item;
            }

            // If it is a regular, interrogatable JS object (not an IE ActiveX object), then...
            // If it has its own property called "length", but not enumerable, it's iterable
            if (value.hasOwnProperty('length') && !value.propertyIsEnumerable('length')) {
                return true;
            }

            // Test against whitelist which includes known iterable collection types
            return iterableRe.test(toString.call(value));
        },

        /**
         * This method returns `true` if debug is enabled for the specified class. This is
         * done by checking the `Ext.debugConfig.hooks` config for the closest match to the
         * given `className`.
         * @param {String} className The name of the class.
         * @return {Boolean} `true` if debug is enabled for the specified class.
         */
        isDebugEnabled:
            //<debug>
            function (className, defaultEnabled) {
                var debugConfig = Ext.debugConfig.hooks;

                if (debugConfig.hasOwnProperty(className)) {
                    return debugConfig[className];
                }

                var enabled = debugConfig['*'],
                    prefixLength = 0;

                if (defaultEnabled !== undefined) {
                    enabled = defaultEnabled;
                }
                if (!className) {
                    return enabled;
                }

                for (var prefix in debugConfig) {
                    var value = debugConfig[prefix];

                    // if prefix=='Ext' match 'Ext.foo.Bar' but not 'Ext4.foo.Bar'
                    if (className.charAt(prefix.length) === '.') {
                        if (className.substring(0, prefix.length) === prefix) {
                            if (prefixLength < prefix.length) {
                                prefixLength = prefix.length;
                                enabled = value;
                            }
                        }
                    }
                }

                return enabled;
            } ||
            //</debug>
            emptyFn,

        /**
         * Clone simple variables including array, {}-like objects, DOM nodes and Date without keeping the old reference.
         * A reference for the object itself is returned if it's not a direct decendant of Object. For model cloning,
         * see {@link Ext.data.Model#copy Model.copy}.
         *
         * @param {Object} item The variable to clone
         * @return {Object} clone
         */
        clone: function(item) {
            if (item === null || item === undefined) {
                return item;
            }

            // DOM nodes
            // TODO proxy this to Ext.Element.clone to handle automatic id attribute changing
            // recursively
            if (item.nodeType && item.cloneNode) {
                return item.cloneNode(true);
            }

            var type = toString.call(item),
                i, j, k, clone, key;

            // Date
            if (type === '[object Date]') {
                return new Date(item.getTime());
            }

            // Array
            if (type === '[object Array]') {
                i = item.length;

                clone = [];

                while (i--) {
                    clone[i] = Ext.clone(item[i]);
                }
            }
            // Object
            else if (type === '[object Object]' && item.constructor === Object) {
                clone = {};

                for (key in item) {
                    clone[key] = Ext.clone(item[key]);
                }

                if (enumerables) {
                    for (j = enumerables.length; j--;) {
                        k = enumerables[j];
                        if (item.hasOwnProperty(k)) {
                            clone[k] = item[k];
                        }
                    }
                }
            }

            return clone || item;
        },

        /**
         * @private
         * Generate a unique reference of Ext in the global scope, useful for sandboxing
         */
        getUniqueGlobalNamespace: function() {
            var uniqueGlobalNamespace = this.uniqueGlobalNamespace,
                i;

            if (uniqueGlobalNamespace === undefined) {
                i = 0;

                do {
                    uniqueGlobalNamespace = 'ExtBox' + (++i);
                } while (global[uniqueGlobalNamespace] !== undefined);

                global[uniqueGlobalNamespace] = Ext;
                this.uniqueGlobalNamespace = uniqueGlobalNamespace;
            }

            return uniqueGlobalNamespace;
        },

        /**
         * @private
         */
        functionFactoryCache: {},

        cacheableFunctionFactory: function() {
            var me = this,
                args = Array.prototype.slice.call(arguments),
                cache = me.functionFactoryCache,
                idx, fn, ln;

             if (Ext.isSandboxed) {
                ln = args.length;
                if (ln > 0) {
                    ln--;
                    args[ln] = 'var Ext=window.' + Ext.name + ';' + args[ln];
                }
            }
            idx = args.join('');
            fn = cache[idx];
            if (!fn) {
                fn = Function.prototype.constructor.apply(Function.prototype, args);

                cache[idx] = fn;
            }
            return fn;
        },

        functionFactory: function() {
            var args = Array.prototype.slice.call(arguments),
                ln;

            if (Ext.isSandboxed) {
                ln = args.length;
                if (ln > 0) {
                    ln--;
                    args[ln] = 'var Ext=window.' + Ext.name + ';' + args[ln];
                }
            }

            return Function.prototype.constructor.apply(Function.prototype, args);
        },

        /**
         * @private
         */
        Logger: {
        //<feature logger>
            log: function(message, priority) {
                if (message && global.console) {
                    if (!priority || !(priority in global.console)) {
                        priority = 'log';
                    }
                    message = '[' + priority.toUpperCase() + '] ' + message;
                    global.console[priority](message);
                }
            },
            verbose: function(message) {
                this.log(message, 'verbose');
            },
            info: function(message) {
                this.log(message, 'info');
            },
            warn: function(message) {
                this.log(message, 'warn');
            },
            error: function(message) {
                throw new Error(message);
            },
            deprecate: function(message) {
                this.log(message, 'warn');
            }
        } || {
        //</feature>
            verbose: emptyFn,
            log: emptyFn,
            info: emptyFn,
            warn: emptyFn,
            error: function(message) {
                throw new Error(message);
            },
            deprecate: emptyFn
        },

        // private
        getElementById: function(id) {
            return document.getElementById(id);
        },

        /**
         * @member Ext
         * @private
         */
        splitAndUnescape: (function() {
            var cache = {};
    
            return function(origin, delimiter) {
                if (!origin) {
                    return [];
                }
                else if (!delimiter) {
                    return [origin];
                }
    
                var replaceRe = cache[delimiter] || (cache[delimiter] = new RegExp('\\\\' + delimiter, 'g')),
                    result = [],
                    parts, part;
    
                parts = origin.split(delimiter);
    
                while ((part = parts.shift()) !== undefined) {
                    // If any of the parts ends with the delimiter that means
                    // the delimiter was escaped and the split was invalid. Roll back.
                    while (part.charAt(part.length - 1) === '\\' && parts.length > 0) {
                        part = part + delimiter + parts.shift();
                    }
    
                    // Now that we have split the parts, unescape the delimiter char
                    part = part.replace(replaceRe, delimiter);
    
                    result.push(part);
                }
    
                return result;
            }
        })()
    }); // Ext.apply(Ext

    Ext.returnTrue.$nullFn = Ext.returnId.$nullFn = true;
}());
