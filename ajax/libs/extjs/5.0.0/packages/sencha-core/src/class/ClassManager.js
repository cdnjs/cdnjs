// @tag class
/**
 * @class Ext.ClassManager
 *
 * Ext.ClassManager manages all classes and handles mapping from string class name to
 * actual class objects throughout the whole framework. It is not generally accessed directly, rather through
 * these convenient shorthands:
 *
 * - {@link Ext#define Ext.define}
 * - {@link Ext#create Ext.create}
 * - {@link Ext#widget Ext.widget}
 * - {@link Ext#getClass Ext.getClass}
 * - {@link Ext#getClassName Ext.getClassName}
 *
 * # Basic syntax:
 *
 *     Ext.define(className, properties);
 *
 * in which `properties` is an object represent a collection of properties that apply to the class. See
 * {@link Ext.ClassManager#create} for more detailed instructions.
 *
 *     Ext.define('Person', {
 *          name: 'Unknown',
 *
 *          constructor: function(name) {
 *              if (name) {
 *                  this.name = name;
 *              }
 *          },
 *
 *          eat: function(foodType) {
 *              alert("I'm eating: " + foodType);
 *
 *              return this;
 *          }
 *     });
 *
 *     var aaron = new Person("Aaron");
 *     aaron.eat("Sandwich"); // alert("I'm eating: Sandwich");
 *
 * Ext.Class has a powerful set of extensible {@link Ext.Class#registerPreprocessor pre-processors} which takes care of
 * everything related to class creation, including but not limited to inheritance, mixins, configuration, statics, etc.
 *
 * # Inheritance:
 *
 *     Ext.define('Developer', {
 *          extend: 'Person',
 *
 *          constructor: function(name, isGeek) {
 *              this.isGeek = isGeek;
 *
 *              // Apply a method from the parent class' prototype
 *              this.callParent([name]);
 *          },
 *
 *          code: function(language) {
 *              alert("I'm coding in: " + language);
 *
 *              this.eat("Bugs");
 *
 *              return this;
 *          }
 *     });
 *
 *     var jacky = new Developer("Jacky", true);
 *     jacky.code("JavaScript"); // alert("I'm coding in: JavaScript");
 *                               // alert("I'm eating: Bugs");
 *
 * See {@link Ext.Base#callParent} for more details on calling superclass' methods
 *
 * # Mixins:
 *
 *     Ext.define('CanPlayGuitar', {
 *          playGuitar: function() {
 *             alert("F#...G...D...A");
 *          }
 *     });
 *
 *     Ext.define('CanComposeSongs', {
 *          composeSongs: function() { ... }
 *     });
 *
 *     Ext.define('CanSing', {
 *          sing: function() {
 *              alert("For he's a jolly good fellow...")
 *          }
 *     });
 *
 *     Ext.define('Musician', {
 *          extend: 'Person',
 *
 *          mixins: {
 *              canPlayGuitar: 'CanPlayGuitar',
 *              canComposeSongs: 'CanComposeSongs',
 *              canSing: 'CanSing'
 *          }
 *     })
 *
 *     Ext.define('CoolPerson', {
 *          extend: 'Person',
 *
 *          mixins: {
 *              canPlayGuitar: 'CanPlayGuitar',
 *              canSing: 'CanSing'
 *          },
 *
 *          sing: function() {
 *              alert("Ahem....");
 *
 *              this.mixins.canSing.sing.call(this);
 *
 *              alert("[Playing guitar at the same time...]");
 *
 *              this.playGuitar();
 *          }
 *     });
 *
 *     var me = new CoolPerson("Jacky");
 *
 *     me.sing(); // alert("Ahem...");
 *                // alert("For he's a jolly good fellow...");
 *                // alert("[Playing guitar at the same time...]");
 *                // alert("F#...G...D...A");
 *
 * # Config:
 *
 *     Ext.define('SmartPhone', {
 *          config: {
 *              hasTouchScreen: false,
 *              operatingSystem: 'Other',
 *              price: 500
 *          },
 *
 *          isExpensive: false,
 *
 *          constructor: function(config) {
 *              this.initConfig(config);
 *          },
 *
 *          applyPrice: function(price) {
 *              this.isExpensive = (price > 500);
 *
 *              return price;
 *          },
 *
 *          applyOperatingSystem: function(operatingSystem) {
 *              if (!(/^(iOS|Android|BlackBerry)$/i).test(operatingSystem)) {
 *                  return 'Other';
 *              }
 *
 *              return operatingSystem;
 *          }
 *     });
 *
 *     var iPhone = new SmartPhone({
 *          hasTouchScreen: true,
 *          operatingSystem: 'iOS'
 *     });
 *
 *     iPhone.getPrice(); // 500;
 *     iPhone.getOperatingSystem(); // 'iOS'
 *     iPhone.getHasTouchScreen(); // true;
 *
 *     iPhone.isExpensive; // false;
 *     iPhone.setPrice(600);
 *     iPhone.getPrice(); // 600
 *     iPhone.isExpensive; // true;
 *
 *     iPhone.setOperatingSystem('AlienOS');
 *     iPhone.getOperatingSystem(); // 'Other'
 *
 * # Statics:
 *
 *     Ext.define('Computer', {
 *          statics: {
 *              factory: function(brand) {
 *                 // 'this' in static methods refer to the class itself
 *                  return new this(brand);
 *              }
 *          },
 *
 *          constructor: function() { ... }
 *     });
 *
 *     var dellComputer = Computer.factory('Dell');
 *
 * Also see {@link Ext.Base#statics} and {@link Ext.Base#self} for more details on accessing
 * static properties within class methods
 *
 * @singleton
 */
Ext.ClassManager = (function(Class, alias, arraySlice, arrayFrom, global) {
// @define Ext.ClassManager
// @require Ext.Inventory
// @require Ext.Class
// @require Ext.Function
// @require Ext.Array

var makeCtor = Ext.Class.makeCtor,
    //<if nonBrowser>
    isNonBrowser = typeof window === 'undefined',
    //</if>

    Manager = Ext.apply(new Ext.Inventory(), {
        /**
         * @property {Object} classes
         * All classes which were defined through the ClassManager. Keys are the
         * name of the classes and the values are references to the classes.
         * @private
         */
        classes: {},

        classState: {
            /*
             * 'Ext.foo.Bar': <state enum>
             *
             *  10 = Ext.define called
             *  20 = Ext.define/override called
             *  30 = Manager.existCache[<name>] == true for define
             *  40 = Manager.existCache[<name>] == true for define/override
             *  50 = Manager.isCreated(<name>) == true for define
             *  60 = Manager.isCreated(<name>) == true for define/override
             *
             */
        },

        /**
         * @private
         */
        existCache: {},

        /**
         * @private
         */
        namespaceRewrites: [{
            from: 'Ext.',
            to: Ext
        }],

        /** @private */
        enableNamespaceParseCache: true,

        /** @private */
        namespaceParseCache: {},

        /** @private */
        instantiators: [],

        /**
         * Checks if a class has already been created.
         *
         * @param {String} className
         * @return {Boolean} exist
         */
        isCreated: function(className) {
            var i, ln, part, root, parts;

            //<debug error>
            if (typeof className !== 'string' || className.length < 1) {
                throw new Error("[Ext.ClassManager] Invalid classname, must be a string and must not be empty");
            }
            //</debug>

            if (Manager.classes[className] || Manager.existCache[className]) {
                return true;
            }

            root = global;
            parts = Manager.parseNamespace(className);

            for (i = 0, ln = parts.length; i < ln; i++) {
                part = parts[i];

                if (typeof part !== 'string') {
                    root = part;
                } else {
                    if (!root || !root[part]) {
                        return false;
                    }

                    root = root[part];
                }
            }

            Manager.triggerCreated(className);

            return true;
        },

        /**
         * @private
         */
        createdListeners: [],
        
        /**
         * @private
         */
        nameCreatedListeners: {},

        /**
         * @private
         */
        existsListeners: [],

        /**
         * @private
         */
        nameExistsListeners: {},

        /**
         * @private
         */
        triggerCreated: function (className) {
            if(!Manager.existCache[className]) {
                Manager.triggerExists(className);
            }
            Manager.classState[className] += 20;
            Manager.notify(className, Manager.createdListeners, Manager.nameCreatedListeners);
        },

        /**
         * @private
         */
        onCreated: function(fn, scope, className) {
            Manager.addListener(fn, scope, className, Manager.createdListeners, Manager.nameCreatedListeners);
        },

        /**
         * @private
         */
        triggerExists: function (className, state) {
            Manager.existCache[className] = state || 1;
            Manager.classState[className] += 20;
            Manager.notify(className, Manager.existsListeners, Manager.nameExistsListeners);
        },

        /**
         * @private
         */
        onExists: function(fn, scope, className) {
            Manager.addListener(fn, scope, className, Manager.existsListeners, Manager.nameExistsListeners);
        },

        /**
         * @private
         */
        notify: function (className, listeners, nameListeners) {
            var alternateNames = Manager.getAlternatesByName(className),
                names = [className],
                i, ln, j, subLn, listener, name;

            for (i = 0,ln = listeners.length; i < ln; i++) {
                listener = listeners[i];
                listener.fn.call(listener.scope, className);
            }

            while (names) {
                for (i = 0,ln = names.length; i < ln; i++) {
                    name = names[i];
                    listeners = nameListeners[name];

                    if (listeners) {
                        for (j = 0,subLn = listeners.length; j < subLn; j++) {
                            listener = listeners[j];
                            listener.fn.call(listener.scope, name);
                        }
                        delete nameListeners[name];
                    }
                }

                names = alternateNames; // for 2nd pass (if needed)
                alternateNames = null; // no 3rd pass
            }
        },

        /**
         * @private
         */
        addListener: function(fn, scope, className, listeners, nameListeners) {
            if (Ext.isArray(className)) {
                fn = Ext.Function.createBarrier(className.length, fn, scope);
                for (i = 0; i < className.length; i++) {
                    this.addListener(fn, null, className[i], listeners, nameListeners);
                }
                return;
            }
            var i,
                listener = {
                    fn: fn,
                    scope: scope
                };

            if (className) {
                if (this.isCreated(className)) {
                    fn.call(scope, className);
                    return;
                }

                if (!nameListeners[className]) {
                    nameListeners[className] = [];
                }

                nameListeners[className].push(listener);
            }
            else {
                listeners.push(listener);
            }
        },

        /**
         * Supports namespace rewriting.
         * @private
         */
        parseNamespace: function(namespace) {
            //<debug error>
            if (typeof namespace !== 'string') {
                throw new Error("[Ext.ClassManager] Invalid namespace, must be a string");
            }
            //</debug>

            var cache = this.namespaceParseCache,
                parts,
                rewrites,
                root,
                name,
                rewrite, from, to, i, ln;

            if (this.enableNamespaceParseCache) {
                if (cache.hasOwnProperty(namespace)) {
                    return cache[namespace];
                }
            }

            parts = [];
            rewrites = this.namespaceRewrites;
            root = global;
            name = namespace;

            for (i = 0, ln = rewrites.length; i < ln; i++) {
                rewrite = rewrites[i];
                from = rewrite.from;
                to = rewrite.to;

                if (name === from || name.substring(0, from.length) === from) {
                    name = name.substring(from.length);

                    if (typeof to !== 'string') {
                        root = to;
                    } else {
                        parts = parts.concat(to.split('.'));
                    }

                    break;
                }
            }

            parts.push(root);

            parts = parts.concat(name.split('.'));

            if (this.enableNamespaceParseCache) {
                cache[namespace] = parts;
            }

            return parts;
        },

        /**
         * Creates a namespace and assign the `value` to the created object.
         *
         *     Ext.ClassManager.setNamespace('MyCompany.pkg.Example', someObject);
         *
         *     alert(MyCompany.pkg.Example === someObject); // alerts true
         *
         * @param {String} name
         * @param {Object} value
         */
        setNamespace: function(name, value) {
            var root = global,
                parts = this.parseNamespace(name),
                ln = parts.length - 1,
                leaf = parts[ln],
                i, part;

            for (i = 0; i < ln; i++) {
                part = parts[i];

                if (typeof part !== 'string') {
                    root = part;
                } else {
                    if (!root[part]) {
                        root[part] = {};
                    }

                    root = root[part];
                }
            }

            root[leaf] = value;

            return root[leaf];
        },

        /**
         * The new Ext.ns, supports namespace rewriting.
         * @private
         */
        createNamespaces: function() {
            var root = global,
                parts, part, i, j, ln, subLn;

            for (i = 0, ln = arguments.length; i < ln; i++) {
                parts = this.parseNamespace(arguments[i]);

                for (j = 0, subLn = parts.length; j < subLn; j++) {
                    part = parts[j];

                    if (typeof part !== 'string') {
                        root = part;
                    } else {
                        if (!root[part]) {
                            root[part] = {};
                        }

                        root = root[part];
                    }
                }
            }

            return root;
        },

        /**
         * Sets a name reference to a class.
         *
         * @param {String} name
         * @param {Object} value
         * @return {Ext.ClassManager} this
         */
        set: function (name, value) {
            var me = this,
                targetName = me.getName(value);

            me.classes[name] = me.setNamespace(name, value);

            if (targetName && targetName !== name) {
                me.addAlternate(targetName, name);
            }

            return this;
        },

        /**
         * Retrieve a class by its name.
         *
         * @param {String} name
         * @return {Ext.Class} class
         */
        get: function(name) {
            var classes = this.classes,
                root,
                parts,
                part, i, ln;

            if (classes[name]) {
                return classes[name];
            }

            root = global;
            parts = this.parseNamespace(name);

            for (i = 0, ln = parts.length; i < ln; i++) {
                part = parts[i];

                if (typeof part !== 'string') {
                    root = part;
                } else {
                    if (!root || !root[part]) {
                        return null;
                    }

                    root = root[part];
                }
            }

            return root;
        },

        /**
         * Adds a batch of class name to alias mappings.
         * @param {Object} aliases The set of mappings of the form.
         * className : [values...]
         */
        addNameAliasMappings: function(aliases) {
            this.addAlias(aliases);
        },

        /**
         *
         * @param {Object} alternates The set of mappings of the form
         * className : [values...]
         */
        addNameAlternateMappings: function (alternates) {
            this.addAlternate(alternates);
        },

        /**
         * Get a reference to the class by its alias.
         *
         * @param {String} alias
         * @return {Ext.Class} class
         */
        getByAlias: function(alias) {
            return this.get(this.getNameByAlias(alias));
        },

        /**
         * Get the name of the class by its reference or its instance. This is
         * usually invoked by the shorthand {@link Ext#getClassName}.
         *
         *     Ext.ClassManager.getName(Ext.Action); // returns "Ext.Action"
         *
         * @param {Ext.Class/Object} object
         * @return {String} className
         */
        getName: function(object) {
            return object && object.$className || '';
        },

        /**
         * Get the class of the provided object; returns null if it's not an instance
         * of any class created with Ext.define. This is usually invoked by the
         * shorthand {@link Ext#getClass}.
         *
         *     var component = new Ext.Component();
         *
         *     Ext.getClass(component); // returns Ext.Component
         *
         * @param {Object} object
         * @return {Ext.Class} class
         */
        getClass: function(object) {
            return object && object.self || null;
        },

        /**
         * Defines a class.
         * @deprecated Use {@link Ext#define} instead, as that also supports creating overrides.
         * @private
         */
        create: function(className, data, createdFn) {
            //<debug error>
            if (className != null && typeof className !== 'string') {
                throw new Error("[Ext.define] Invalid class name '" + className + "' specified, must be a non-empty string");
            }
            //</debug>

            var ctor = makeCtor(className);
            if (typeof data === 'function') {
                data = data(ctor);
            }

            //<debug>
            if (className) {
                if(Manager.classes[className]) {
                    Ext.log.warn("[Ext.define] Duplicate class name '" + className + "' specified, must be a non-empty string");
                }
                ctor.displayName = className;
            }
            //</debug>

            data.$className = className;

            return new Class(ctor, data, function() {
                var postprocessorStack = data.postprocessors || Manager.defaultPostprocessors,
                    registeredPostprocessors = Manager.postprocessors,
                    postprocessors = [],
                    postprocessor, i, ln, j, subLn, postprocessorProperties, postprocessorProperty;

                delete data.postprocessors;

                for (i = 0,ln = postprocessorStack.length; i < ln; i++) {
                    postprocessor = postprocessorStack[i];

                    if (typeof postprocessor === 'string') {
                        postprocessor = registeredPostprocessors[postprocessor];
                        postprocessorProperties = postprocessor.properties;

                        if (postprocessorProperties === true) {
                            postprocessors.push(postprocessor.fn);
                        }
                        else if (postprocessorProperties) {
                            for (j = 0,subLn = postprocessorProperties.length; j < subLn; j++) {
                                postprocessorProperty = postprocessorProperties[j];

                                if (data.hasOwnProperty(postprocessorProperty)) {
                                    postprocessors.push(postprocessor.fn);
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        postprocessors.push(postprocessor);
                    }
                }

                data.postprocessors = postprocessors;
                data.createdFn = createdFn;
                Manager.processCreate(className, this, data);
            });
        },

        processCreate: function(className, cls, clsData){
            var me = this,
                postprocessor = clsData.postprocessors.shift(),
                createdFn = clsData.createdFn;
            
            if (!postprocessor) {
                //<debug>
                Ext.classSystemMonitor && Ext.classSystemMonitor(className, 'Ext.ClassManager#classCreated', arguments);
                //</debug>
                
                if (className) {
                    me.set(className, cls);
                }

                delete cls._classHooks;

                if (createdFn) {
                    createdFn.call(cls, cls);
                }

                if (className) {
                    me.triggerCreated(className);
                }
                return;
            }

            if (postprocessor.call(me, className, cls, clsData, me.processCreate) !== false) {
                me.processCreate(className, cls, clsData);
            }
        },

        createOverride: function (className, data, createdFn) {
            var me = this,
                overriddenClassName = data.override,
                requires = data.requires,
                uses = data.uses,
                mixins = data.mixins,
                mixinsIsArray,
                compat = data.compatibility,
                depedenciesLoaded,
                classReady = function () {
                    var cls, dependencies, i, key, temp;

                    if (!depedenciesLoaded) {
                        dependencies = requires ? requires.slice(0) : [];

                        if (mixins) {
                            if (!(mixinsIsArray = mixins instanceof Array)) {
                                for (key in mixins) {
                                    if (Ext.isString(cls = mixins[key])) {
                                        dependencies.push(cls);
                                    }
                                }
                            } else {
                                for (i = 0, temp = mixins.length; i < temp; ++i) {
                                    if (Ext.isString(cls = mixins[i])) {
                                        dependencies.push(cls);
                                    }
                                }
                            }
                        }

                        depedenciesLoaded = true;
                        if (dependencies.length) {
                            // Since the override is going to be used (its target class is
                            // now created), we need to fetch the required classes for the
                            // override and call us back once they are loaded:
                            Ext.require(dependencies, classReady);
                            return;
                        }
                        // else we have no dependencies, so proceed
                    }

                    // transform mixin class names into class references, This
                    // loop can handle both the array and object forms of
                    // mixin definitions
                    if (mixinsIsArray) {
                        for (i = 0, temp = mixins.length; i < temp; ++i) {
                            if (Ext.isString(cls = mixins[i])) {
                                mixins[i] = Ext.ClassManager.get(cls);
                            }
                        }
                    } else if (mixins) {
                        for (key in mixins) {
                            if (Ext.isString(cls = mixins[key])) {
                                mixins[key] = Ext.ClassManager.get(cls);
                            }
                        }
                    }

                    // The target class and the required classes for this override are
                    // ready, so we can apply the override now:
                    cls = me.get(overriddenClassName);

                    // We don't want to apply these:
                    delete data.override;
                    delete data.compatibility;
                    delete data.requires;
                    delete data.uses;

                    Ext.override(cls, data);

                    // This pushes the overridding file itself into Ext.Loader.history
                    // Hence if the target class never exists, the overriding file will
                    // never be included in the build.
                    me.triggerCreated(className);

                    if (uses) {
                        // This "hides" from the Cmd auto-dependency scanner since
                        // the reference is circular (Loader requires us).
                        Ext['Loader'].addUsedClasses(uses); // get these classes too!
                    }

                    if (createdFn) {
                        createdFn.call(cls, cls); // last but not least!
                    }
                };

            me.triggerExists(className, 2);

            if (!compat || Ext.checkVersion(compat)) {
                // Override the target class right after it's created
                me.onCreated(classReady, me, overriddenClassName);
            }

            return me;
        },

        /**
         * Instantiate a class by its alias. This is usually invoked by the
         * shorthand {@link Ext#createByAlias}.
         *
         * If {@link Ext.Loader} is {@link Ext.Loader#setConfig enabled} and the class
         * has not been defined yet, it will attempt to load the class via synchronous
         * loading.
         *
         *     var window = Ext.createByAlias('widget.window', { width: 600, height: 800 });
         *
         * @param {String} alias
         * @param {Object...} args Additional arguments after the alias will be passed to the
         * class constructor.
         * @return {Object} instance
         */
        instantiateByAlias: function() {
            var alias = arguments[0],
                args = arraySlice.call(arguments),
                className = this.getNameByAlias(alias);

            //<debug error>
            if (!className) {
                throw new Error("[Ext.createByAlias] Unrecognized alias: " + alias);
            }
            //</debug>

            args[0] = className;

            return Ext.create.apply(Ext, args);
        },

        //<deprecated since=5.0>
        /**
         * Instantiate a class by either full name, alias or alternate name
         * @param {String} name
         * @param {Mixed} args Additional arguments after the name will be passed to the class' constructor.
         * @return {Object} instance
         * @deprecated 5.0 Use Ext.create() instead.
         */
        instantiate: function() {
            //<debug>
            Ext.log.warn('Ext.ClassManager.instantiate() is deprecated.  Use Ext.create() instead.');
            //</debug>
            return Ext.create.apply(Ext, arguments);
        },
        //</deprecated>

        /**
         * @private
         * @param name
         * @param args
         */
        dynInstantiate: function(name, args) {
            args = arrayFrom(args, true);
            args.unshift(name);

            return Ext.create.apply(Ext, args);
        },

        /**
         * @private
         * @param length
         */
        getInstantiator: function(length) {
            var instantiators = this.instantiators,
                instantiator,
                i,
                args;

            instantiator = instantiators[length];

            if (!instantiator) {
                i = length;
                args = [];

                for (i = 0; i < length; i++) {
                    args.push('a[' + i + ']');
                }

                instantiator = instantiators[length] = new Function('c', 'a', 'return new c(' + args.join(',') + ')');
                //<debug>
                instantiator.displayName = "Ext.create" + length;
                //</debug>
            }

            return instantiator;
        },

        /**
         * @private
         */
        postprocessors: {},

        /**
         * @private
         */
        defaultPostprocessors: [],

        /**
         * Register a post-processor function.
         *
         * @private
         * @param {String} name
         * @param {Function} postprocessor
         */
        registerPostprocessor: function(name, fn, properties, position, relativeTo) {
            if (!position) {
                position = 'last';
            }

            if (!properties) {
                properties = [name];
            }

            this.postprocessors[name] = {
                name: name,
                properties: properties || false,
                fn: fn
            };

            this.setDefaultPostprocessorPosition(name, position, relativeTo);

            return this;
        },

        /**
         * Set the default post processors array stack which are applied to every class.
         *
         * @private
         * @param {String/Array} postprocessors The name of a registered post processor or an array of registered names.
         * @return {Ext.ClassManager} this
         */
        setDefaultPostprocessors: function(postprocessors) {
            this.defaultPostprocessors = arrayFrom(postprocessors);

            return this;
        },

        /**
         * Insert this post-processor at a specific position in the stack, optionally relative to
         * any existing post-processor
         *
         * @private
         * @param {String} name The post-processor name. Note that it needs to be registered with
         * {@link Ext.ClassManager#registerPostprocessor} before this
         * @param {String} offset The insertion position. Four possible values are:
         * 'first', 'last', or: 'before', 'after' (relative to the name provided in the third argument)
         * @param {String} relativeName
         * @return {Ext.ClassManager} this
         */
        setDefaultPostprocessorPosition: function(name, offset, relativeName) {
            var defaultPostprocessors = this.defaultPostprocessors,
                index;

            if (typeof offset === 'string') {
                if (offset === 'first') {
                    defaultPostprocessors.unshift(name);

                    return this;
                }
                else if (offset === 'last') {
                    defaultPostprocessors.push(name);

                    return this;
                }

                offset = (offset === 'after') ? 1 : -1;
            }

            index = Ext.Array.indexOf(defaultPostprocessors, relativeName);

            if (index !== -1) {
                Ext.Array.splice(defaultPostprocessors, Math.max(0, index + offset), 0, name);
            }

            return this;
        }
    });
    
    //<feature classSystem.alias>
    /**
     * @cfg {String/String[]} alias
     * @member Ext.Class
     * List of short aliases for class names. An alias consists of a namespace and a name concatenated by a period as &#60;namespace&#62;.&#60;name&#62;
     *
     *  - **namespace** - The namespace describes what kind of alias this is and must be all lowercase.
     *  - **name** - The name of the alias which allows the lazy-instantiation via the alias. The name shouldn't contain any periods.
     *
     * A list of namespaces and the usages are:
     *
     *  - **feature** - {@link Ext.grid.Panel Grid} features
     *  - **plugin** - Plugins
     *  - **store** - {@link Ext.data.Store}
     *  - **widget** - Components
     *
     * Most useful for defining xtypes for widgets:
     *
     *     Ext.define('MyApp.CoolPanel', {
     *         extend: 'Ext.panel.Panel',
     *         alias: ['widget.coolpanel'],
     *         title: 'Yeah!'
     *     });
     *
     *     // Using Ext.create
     *     Ext.create('widget.coolpanel');
     *
     *     // Using the shorthand for defining widgets by xtype
     *     Ext.widget('panel', {
     *         items: [
     *             {xtype: 'coolpanel', html: 'Foo'},
     *             {xtype: 'coolpanel', html: 'Bar'}
     *         ]
     *     });
     */
    Manager.registerPostprocessor('alias', function(name, cls, data) {
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(name, 'Ext.ClassManager#aliasPostProcessor', arguments);
        //</debug>
        
        var aliases = Ext.Array.from(data.alias),
            i, ln;

        for (i = 0,ln = aliases.length; i < ln; i++) {
            alias = aliases[i];

            this.addAlias(cls, alias);
        }

    }, ['xtype', 'alias']);
    //</feature>

    //<feature classSystem.singleton>
    /**
     * @cfg {Boolean} singleton
     * @member Ext.Class
     * When set to true, the class will be instantiated as singleton.  For example:
     *
     *     Ext.define('Logger', {
     *         singleton: true,
     *         log: function(msg) {
     *             console.log(msg);
     *         }
     *     });
     *
     *     Logger.log('Hello');
     */
    Manager.registerPostprocessor('singleton', function(name, cls, data, fn) {
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(name, 'Ext.ClassManager#singletonPostProcessor', arguments);
        //</debug>
        
        if (data.singleton) {
            fn.call(this, name, new cls(), data);
        }
        else {
            return true;
        }
        return false;
    });
    //</feature>

    //<feature classSystem.alternateClassName>
    /**
     * @cfg {String/String[]} alternateClassName
     * @member Ext.Class
     * Defines alternate names for this class.  For example:
     *
     *     Ext.define('Developer', {
     *         alternateClassName: ['Coder', 'Hacker'],
     *         code: function(msg) {
     *             alert('Typing... ' + msg);
     *         }
     *     });
     *
     *     var joe = Ext.create('Developer');
     *     joe.code('stackoverflow');
     *
     *     var rms = Ext.create('Hacker');
     *     rms.code('hack hack');
     */
    Manager.registerPostprocessor('alternateClassName', function(name, cls, data) {
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(name, 'Ext.ClassManager#alternateClassNamePostprocessor', arguments);
        //</debug>
        
        var alternates = data.alternateClassName,
            i, ln, alternate;

        if (!(alternates instanceof Array)) {
            alternates = [alternates];
        }

        for (i = 0, ln = alternates.length; i < ln; i++) {
            alternate = alternates[i];

            //<debug error>
            if (typeof alternate !== 'string') {
                throw new Error("[Ext.define] Invalid alternate of: '" + alternate + "' for class: '" + name + "'; must be a valid string");
            }
            //</debug>

            this.set(alternate, cls);
        }
    });
    //</feature>

    /**
     * @cfg {Object} debugHooks
     * A collection of diagnostic methods to decorate the real methods of the class. These
     * methods are applied as an `override` if this class has debug enabled as defined by
     * `Ext.isDebugEnabled`.
     *
     * These will be automatically removed by the Sencha Cmd compiler for production builds.
     *
     * Example usage:
     *
     *      Ext.define('Foo.bar.Class', {
     *          foo: function (a, b, c) {
     *              ...
     *          },
     *
     *          bar: function (a, b) {
     *              ...
     *              return 42;
     *          },
     *
     *          debugHooks: {
     *              foo: function (a, b, c) {
     *                  // check arguments...
     *                  return this.callParent(arguments);
     *              }
     *          }
     *      });
     *
     * If you specify a `$enabled` property in the `debugHooks` object that will be used
     * as the default enabled state for the hooks. If the `{@link Ext#manifest}` contains
     * a `debug` object of if `{@link Ext#debugConfig}` is specified, the `$enabled` flag
     * will override its "*" value.
     */
    Manager.registerPostprocessor('debugHooks', function(name, Class, data) {
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(Class, 'Ext.Class#debugHooks', arguments);

        if (Ext.isDebugEnabled(Class.$className, data.debugHooks.$enabled)) {
            delete data.debugHooks.$enabled;
            Ext.override(Class, data.debugHooks);
        }
        //</debug>

        // may already have an instance here in the case of singleton
        var target = Class.isInstance ? Class.self : Class;

        delete target.prototype.debugHooks;
    });

    /**
     * @cfg {Object} deprecated
     * The object given has properties that describe the versions at which the deprecations
     * apply.
     *
     * The purpose of the `deprecated` declaration is to enable development mode to give
     * suitable error messages when deprecated methods or properties are used. Methods can
     * always be injected to provide this feedback, but properties can only be handled on
     * some browsers (those that support `Object.defineProperty`).
     *
     * In some cases, deprecated methods can be restored to their previous behavior or
     * added back if they have been removed.
     *
     * The structure of a `deprecated` declaration is this:
     *
     *      Ext.define('Foo.bar.Class', {
     *          ...
     *
     *          deprecated: {
     *              // Optional package name - default is the framework (ext or touch)
     *              name: 'foobar',
     *
     *              '5.0': {
     *                  methods: {
     *                      // Throws: '"removedMethod" is deprecated.'
     *                      removedMethod: null,
     *
     *                      // Throws: '"oldMethod" is deprecated. Please use "newMethod" instead.'
     *                      oldMethod: 'newMethod',
     *
     *                      // When this block is enabled, this method is applied as an
     *                      // override. Otherwise you get same as "removeMethod".
     *                      method: function () {
     *                          // Do what v5 "method" did. If "method" exists in newer
     *                          // versions callParent can call it. If 5.1 has "method"
     *                          // then it would be next in line, otherwise 5.2 and last
     *                          // would be the current class.
     *                      },
     *
     *                      moreHelpful: {
     *                          message: 'Something helpful to do instead.',
     *                          fn: function () {
     *                              // The v5 "moreHelpful" method to use when enabled.
     *                          }
     *                      }
     *                  },
     *                  properties: {
     *                      // Throws: '"removedProp" is deprecated.'
     *                      removedProp: null,
     *
     *                      // Throws: '"oldProp" is deprecated. Please use "newProp" instead.'
     *                      oldProp: 'newProp',
     *
     *                      helpful: {
     *                          message: 'Something helpful message about what to do.'
     *                      }
     *                      ...
     *                  },
     *                  statics: {
     *                      methods: {
     *                          ...
     *                      },
     *                      properties: {
     *                          ...
     *                      },
     *                  }
     *              },
     *
     *              '5.1': {
     *                  ...
     *              },
     *
     *              '5.2': {
     *                  ...
     *              }
     *          }
     *      });
     *
     * The primary content of `deprecated` are the version number keys. These indicate
     * a version number where methods or properties were deprecated. These versions are
     * compared to the version reported by `Ext.getCompatVersion` to determine the action
     * to take for each "block".
     *
     * When the compatibility version is set to a value less than a version number key,
     * that block is said to be "enabled". For example, if a method was deprecated in
     * version 5.0 but the desired compatibility level is 4.2 then the block is used to
     * patch methods and (to some degree) restore pre-5.0 compatibility.
     *
     * When multiple active blocks have the same method name, each method is applied as
     * an override in reverse order of version. In the above example, if a method appears
     * in the "5.0", "5.1" and "5.2" blocks then the "5.2" method is applied as an override
     * first, followed by the "5.1" method and finally the "5.0" method. This means that
     * the `callParent` from the "5.0" method calls the "5.1" method which calls the
     * "5.2" method which can (if applicable) call the current version.
     */
    Manager.registerPostprocessor('deprecated', function(name, Class, data) {
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(Class, 'Ext.Class#deprecated', arguments);
        //</debug>

        // may already have an instance here in the case of singleton
        var target = Class.isInstance ? Class.self : Class;
        target.addDeprecations(data.deprecated);

        delete target.prototype.deprecated;
    });

    Ext.apply(Ext, {
        /**
         * Instantiate a class by either full name, alias or alternate name.
         *
         * If {@link Ext.Loader} is {@link Ext.Loader#setConfig enabled} and the class has
         * not been defined yet, it will attempt to load the class via synchronous loading.
         *
         * For example, all these three lines return the same result:
         *
         *      // xtype
         *      var window = Ext.create({
         *          xtype: 'window',
         *          width: 600,
         *          height: 800,
         *          ...
         *      });
         *
         *      // alias
         *      var window = Ext.create('widget.window', {
         *          width: 600,
         *          height: 800,
         *          ...
         *      });
         *
         *      // alternate name
         *      var window = Ext.create('Ext.Window', {
         *          width: 600,
         *          height: 800,
         *          ...
         *      });
         *
         *      // full class name
         *      var window = Ext.create('Ext.window.Window', {
         *          width: 600,
         *          height: 800,
         *          ...
         *      });
         *
         *      // single object with xclass property:
         *      var window = Ext.create({
         *          xclass: 'Ext.window.Window', // any valid value for 'name' (above)
         *          width: 600,
         *          height: 800,
         *          ...
         *      });
         *
         * @param {String} [name] The class name or alias. Can be specified as `xclass`
         * property if only one object parameter is specified.
         * @param {Object...} [args] Additional arguments after the name will be passed to
         * the class' constructor.
         * @return {Object} instance
         * @member Ext
         * @method create
         */
        create: function () {
            var name = arguments[0],
                nameType = typeof name,
                args = arraySlice.call(arguments, 1),
                cls;

            if (nameType === 'function') {
                cls = name;
            } else {
                if (nameType !== 'string' && args.length === 0) {
                    args = [name];
                    if (!(name = name.xclass)) {
                        name = args[0].xtype;
                        if (name) {
                            name = 'widget.' + name;
                        }
                    }
                }

                //<debug>
                if (typeof name !== 'string' || name.length < 1) {
                    throw new Error("[Ext.create] Invalid class name or alias '" + name +
                                    "' specified, must be a non-empty string");
                }
                //</debug>

                name = Manager.resolveName(name);
                cls = Manager.get(name);
            }

            // Still not existing at this point, try to load it via synchronous mode as the last resort
            if (!cls) {
                //<debug>
                //<if nonBrowser>
                !isNonBrowser &&
                //</if>
                Ext.log.warn("[Ext.Loader] Synchronously loading '" + name + "'; consider adding " +
                     "Ext.require('" + name + "') above Ext.onReady");
                //</debug>

                Ext.syncRequire(name);

                cls = Manager.get(name);
            }

            //<debug>
            if (!cls) {
                throw new Error("[Ext.create] Unrecognized class name / alias: " + name);
            }

            if (typeof cls !== 'function') {
                throw new Error("[Ext.create] Singleton '" + name + "' cannot be instantiated.");
            }
            //</debug>

            return Manager.getInstantiator(args.length)(cls, args);
        },

        /**
         * Convenient shorthand to create a widget by its xtype or a config object.
         *
         *      var button = Ext.widget('button'); // Equivalent to Ext.create('widget.button');
         *
         *      var panel = Ext.widget('panel', { // Equivalent to Ext.create('widget.panel')
         *          title: 'Panel'
         *      });
         *
         *      var grid = Ext.widget({
         *          xtype: 'grid',
         *          ...
         *      });
         *
         * If a {@link Ext.Component component} instance is passed, it is simply returned.
         *
         * @member Ext
         * @param {String} [name] The xtype of the widget to create.
         * @param {Object} [config] The configuration object for the widget constructor.
         * @return {Object} The widget instance
         */
        widget: function(name, config) {
            // forms:
            //      1: (xtype)
            //      2: (xtype, config)
            //      3: (config)
            //      4: (xtype, component)
            //      5: (component)
            //      
            var xtype = name,
                alias, className, T;

            if (typeof xtype !== 'string') { // if (form 3 or 5)
                // first arg is config or component
                config = name; // arguments[0]
                xtype = config.xtype;
                className = config.xclass;
            } else {
                config = config || {};
            }

            if (config.isComponent) {
                return config;
            }

            if (!className) {
                alias = 'widget.' + xtype;
                className = Manager.getNameByAlias(alias);
            }

            // this is needed to support demand loading of the class
            if (className) {
                T = Manager.get(className);
            }

            if (!T) {
                return Ext.create(className || alias, config);
            }
            return new T(config);
        },

        /**
         * @inheritdoc Ext.ClassManager#instantiateByAlias
         * @member Ext
         * @method createByAlias
         */
        createByAlias: alias(Manager, 'instantiateByAlias'),

        /**
         * Defines a class or override. A basic class is defined like this:
         *
         *      Ext.define('My.awesome.Class', {
         *          someProperty: 'something',
         *
         *          someMethod: function(s) {
         *              alert(s + this.someProperty);
         *          }
         *
         *          ...
         *      });
         *
         *      var obj = new My.awesome.Class();
         *
         *      obj.someMethod('Say '); // alerts 'Say something'
         *
         * To create an anonymous class, pass `null` for the `className`:
         *
         *      Ext.define(null, {
         *          constructor: function () {
         *              // ...
         *          }
         *      });
         *
         * In some cases, it is helpful to create a nested scope to contain some private
         * properties. The best way to do this is to pass a function instead of an object
         * as the second parameter. This function will be called to produce the class
         * body:
         *
         *      Ext.define('MyApp.foo.Bar', function () {
         *          var id = 0;
         *
         *          return {
         *              nextId: function () {
         *                  return ++id;
         *              }
         *          };
         *      });
         * 
         * _Note_ that when using override, the above syntax will not override successfully, because
         * the passed function would need to be executed first to determine whether or not the result 
         * is an override or defining a new object. As such, an alternative syntax that immediately 
         * invokes the function can be used:
         * 
         *      Ext.define('MyApp.override.BaseOverride', function () {
         *          var counter = 0;
         *
         *          return {
         *              override: 'Ext.Component',
         *              logId: function () {
         *                  console.log(++counter, this.id);
         *              }
         *          };
         *      }());
         * 
         *
         * When using this form of `Ext.define`, the function is passed a reference to its
         * class. This can be used as an efficient way to access any static properties you
         * may have:
         *
         *      Ext.define('MyApp.foo.Bar', function (Bar) {
         *          return {
         *              statics: {
         *                  staticMethod: function () {
         *                      // ...
         *                  }
         *              },
         *
         *              method: function () {
         *                  return Bar.staticMethod();
         *              }
         *          };
         *      });
         *
         * To define an override, include the `override` property. The content of an
         * override is aggregated with the specified class in order to extend or modify
         * that class. This can be as simple as setting default property values or it can
         * extend and/or replace methods. This can also extend the statics of the class.
         *
         * One use for an override is to break a large class into manageable pieces.
         *
         *      // File: /src/app/Panel.js
         *
         *      Ext.define('My.app.Panel', {
         *          extend: 'Ext.panel.Panel',
         *          requires: [
         *              'My.app.PanelPart2',
         *              'My.app.PanelPart3'
         *          ]
         *
         *          constructor: function (config) {
         *              this.callParent(arguments); // calls Ext.panel.Panel's constructor
         *              //...
         *          },
         *
         *          statics: {
         *              method: function () {
         *                  return 'abc';
         *              }
         *          }
         *      });
         *
         *      // File: /src/app/PanelPart2.js
         *      Ext.define('My.app.PanelPart2', {
         *          override: 'My.app.Panel',
         *
         *          constructor: function (config) {
         *              this.callParent(arguments); // calls My.app.Panel's constructor
         *              //...
         *          }
         *      });
         *
         * Another use of overrides is to provide optional parts of classes that can be
         * independently required. In this case, the class may even be unaware of the
         * override altogether.
         *
         *      Ext.define('My.ux.CoolTip', {
         *          override: 'Ext.tip.ToolTip',
         *
         *          constructor: function (config) {
         *              this.callParent(arguments); // calls Ext.tip.ToolTip's constructor
         *              //...
         *          }
         *      });
         *
         * The above override can now be required as normal.
         *
         *      Ext.define('My.app.App', {
         *          requires: [
         *              'My.ux.CoolTip'
         *          ]
         *      });
         *
         * Overrides can also contain statics:
         *
         *      Ext.define('My.app.BarMod', {
         *          override: 'Ext.foo.Bar',
         *
         *          statics: {
         *              method: function (x) {
         *                  return this.callParent([x * 2]); // call Ext.foo.Bar.method
         *              }
         *          }
         *      });
         * 
         * Starting in version 4.2.2, overrides can declare their `compatibility` based
         * on the framework version or on versions of other packages. For details on the
         * syntax and options for these checks, see `Ext.checkVersion`.
         * 
         * The simplest use case is to test framework version for compatibility:
         * 
         *      Ext.define('App.overrides.grid.Panel', {
         *          override: 'Ext.grid.Panel',
         *
         *          compatibility: '4.2.2', // only if framework version is 4.2.2
         *
         *          //...
         *      });
         * 
         * An array is treated as an OR, so if any specs match, the override is
         * compatible.
         * 
         *      Ext.define('App.overrides.some.Thing', {
         *          override: 'Foo.some.Thing',
         *
         *          compatibility: [
         *              '4.2.2',
         *              'foo@1.0.1-1.0.2'
         *          ],
         *
         *          //...
         *      });
         * 
         * To require that all specifications match, an object can be provided:
         * 
         *      Ext.define('App.overrides.some.Thing', {
         *          override: 'Foo.some.Thing',
         *
         *          compatibility: {
         *              and: [
         *                  '4.2.2',
         *                  'foo@1.0.1-1.0.2'
         *              ]
         *          },
         *
         *          //...
         *      });
         * 
         * Because the object form is just a recursive check, these can be nested:
         * 
         *      Ext.define('App.overrides.some.Thing', {
         *          override: 'Foo.some.Thing',
         *
         *          compatibility: {
         *              and: [
         *                  '4.2.2',  // exactly version 4.2.2 of the framework *AND*
         *                  {
         *                      // either (or both) of these package specs:
         *                      or: [
         *                          'foo@1.0.1-1.0.2',
         *                          'bar@3.0+'
         *                      ]
         *                  }
         *              ]
         *          },
         *
         *          //...
         *      });
         *
         * IMPORTANT: An override is only included in a build if the class it overrides is
         * required. Otherwise, the override, like the target class, is not included. In
         * Sencha Cmd v4, the `compatibility` declaration can likewise be used to remove
         * incompatible overrides from a build.
         *
         * @param {String} className The class name to create in string dot-namespaced format, for example:
         * 'My.very.awesome.Class', 'FeedViewer.plugin.CoolPager'
         * It is highly recommended to follow this simple convention:
         *  - The root and the class name are 'CamelCased'
         *  - Everything else is lower-cased
         * Pass `null` to create an anonymous class.
         * @param {Object} data The key - value pairs of properties to apply to this class. Property names can be of any valid
         * strings, except those in the reserved listed below:
         *  - `mixins`
         *  - `statics`
         *  - `config`
         *  - `alias`
         *  - `xtype` (for {@link Ext.Component Components} only)
         *  - `self`
         *  - `singleton`
         *  - `alternateClassName`
         *  - `override`
         *
         * @param {Function} [createdFn] Callback to execute after the class is created, the execution scope of which
         * (`this`) will be the newly created class itself.
         * @return {Ext.Base}
         * @member Ext
         */
        define: function (className, data, createdFn) {
            //<debug>
            Ext.classSystemMonitor && Ext.classSystemMonitor(className, 'ClassManager#define', arguments);
            //</debug>
            
            if (data.override) {
                Manager.classState[className] = 20;
                return Manager.createOverride.apply(Manager, arguments);
            }

            Manager.classState[className] = 10;
            return Manager.create.apply(Manager, arguments);
        },

        /**
         * Undefines a class defined using the #define method. Typically used
         * for unit testing where setting up and tearing down a class multiple
         * times is required.  For example:
         * 
         *     // define a class
         *     Ext.define('Foo', {
         *        ...
         *     });
         *     
         *     // run test
         *     
         *     // undefine the class
         *     Ext.undefine('Foo');
         * @param {String} className The class name to undefine in string dot-namespaced format.
         * @private
         */
        undefine: function(className) {
            //<debug>
            Ext.classSystemMonitor && Ext.classSystemMonitor(className, 'Ext.ClassManager#undefine', arguments);
            //</debug>
        
            var classes = Manager.classes,
                parts, partCount, namespace, i;

            delete Manager.namespaceParseCache[className];
            delete classes[className];
            delete Manager.existCache[className];
            delete Manager.classState[className];

            Manager.removeName(className);

            parts  = Manager.parseNamespace(className);
            partCount = parts.length - 1;
            namespace = parts[0];

            for (i = 1; i < partCount; i++) {
                namespace = namespace[parts[i]];
                if (!namespace) {
                    return;
                }
            }

            // Old IE blows up on attempt to delete window property
            try {
                delete namespace[parts[partCount]];
            }
            catch (e) {
                namespace[parts[partCount]] = undefined;
            }
        },

        /**
         * @inheritdoc Ext.ClassManager#getName
         * @member Ext
         * @method getClassName
         */
        getClassName: alias(Manager, 'getName'),

        /**
         * Returns the displayName property or className or object. When all else fails, returns "Anonymous".
         * @param {Object} object
         * @return {String}
         */
        getDisplayName: function(object) {
            if (object) {
                if (object.displayName) {
                    return object.displayName;
                }

                if (object.$name && object.$class) {
                    return Ext.getClassName(object.$class) + '#' + object.$name;
                }

                if (object.$className) {
                    return object.$className;
                }
            }

            return 'Anonymous';
        },

        /**
         * @inheritdoc Ext.ClassManager#getClass
         * @member Ext
         * @method getClass
         */
        getClass: alias(Manager, 'getClass'),

        /**
         * Creates namespaces to be used for scoping variables and classes so that they are not global.
         * Specifying the last node of a namespace implicitly creates all other nodes. Usage:
         *
         *     Ext.namespace('Company', 'Company.data');
         *
         *     // equivalent and preferable to the above syntax
         *     Ext.ns('Company.data');
         *
         *     Company.Widget = function() { ... };
         *
         *     Company.data.CustomStore = function(config) { ... };
         *
         * @param {String...} namespaces
         * @return {Object} The namespace object.
         * (If multiple arguments are passed, this will be the last namespace created)
         * @member Ext
         * @method namespace
         */
        namespace: alias(Manager, 'createNamespaces')
    });

    /**
     * Old name for {@link Ext#widget}.
     * @deprecated Use {@link Ext#widget} instead.
     * @method createWidget
     * @member Ext
     * @private
     */
    Ext.createWidget = Ext.widget;

    /**
     * Convenient alias for {@link Ext#namespace Ext.namespace}.
     * @inheritdoc Ext#namespace
     * @member Ext
     * @method ns
     */
    Ext.ns = Ext.namespace;

    Class.registerPreprocessor('className', function(cls, data) {
        if ('$className' in data) {
            cls.$className = data.$className;
            //<debug>
            cls.displayName = cls.$className;
            //</debug>
        }
        
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(cls, 'Ext.ClassManager#classNamePreprocessor', arguments);
        //</debug>
    }, true, 'first');

    Class.registerPreprocessor('alias', function(cls, data) {
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(cls, 'Ext.ClassManager#aliasPreprocessor', arguments);
        //</debug>
        
        var prototype = cls.prototype,
            xtypes = arrayFrom(data.xtype),
            aliases = arrayFrom(data.alias),
            widgetPrefix = 'widget.',
            widgetPrefixLength = widgetPrefix.length,
            xtypesChain = Array.prototype.slice.call(prototype.xtypesChain || []),
            xtypesMap = Ext.merge({}, prototype.xtypesMap || {}),
            i, ln, alias, xtype;

        for (i = 0,ln = aliases.length; i < ln; i++) {
            alias = aliases[i];

            //<debug error>
            if (typeof alias !== 'string' || alias.length < 1) {
                throw new Error("[Ext.define] Invalid alias of: '" + alias + "' for class: '" + name + "'; must be a valid string");
            }
            //</debug>

            if (alias.substring(0, widgetPrefixLength) === widgetPrefix) {
                xtype = alias.substring(widgetPrefixLength);
                Ext.Array.include(xtypes, xtype);
            }
        }

        cls.xtype = data.xtype = xtypes[0];
        data.xtypes = xtypes;

        for (i = 0,ln = xtypes.length; i < ln; i++) {
            xtype = xtypes[i];

            if (!xtypesMap[xtype]) {
                xtypesMap[xtype] = true;
                xtypesChain.push(xtype);
            }
        }

        data.xtypesChain = xtypesChain;
        data.xtypesMap = xtypesMap;

        Ext.Function.interceptAfter(data, 'onClassCreated', function() {
            //<debug>
            Ext.classSystemMonitor && Ext.classSystemMonitor(cls, 'Ext.ClassManager#aliasPreprocessor#afterClassCreated', arguments);
            //</debug>
        
            var mixins = prototype.mixins,
                key, mixin;

            for (key in mixins) {
                if (mixins.hasOwnProperty(key)) {
                    mixin = mixins[key];

                    xtypes = mixin.xtypes;

                    if (xtypes) {
                        for (i = 0,ln = xtypes.length; i < ln; i++) {
                            xtype = xtypes[i];

                            if (!xtypesMap[xtype]) {
                                xtypesMap[xtype] = true;
                                xtypesChain.push(xtype);
                            }
                        }
                    }
                }
            }
        });

        for (i = 0,ln = xtypes.length; i < ln; i++) {
            xtype = xtypes[i];

            //<debug error>
            if (typeof xtype !== 'string' || xtype.length < 1) {
                throw new Error("[Ext.define] Invalid xtype of: '" + xtype + "' for class: '" + name + "'; must be a valid non-empty string");
            }
            //</debug>

            Ext.Array.include(aliases, widgetPrefix + xtype);
        }

        data.alias = aliases;

    }, ['xtype', 'alias']);

    // load the cmd-5 style app manifest metadata now, if available...
    if(Ext.manifest) {
        var manifest = Ext.manifest,
            classes = manifest.classes,
            paths = manifest.paths,
            aliases = {},
            alternates = {},
            className, obj, name;

        if(paths) {
            // if the manifest paths were calculated as relative to the
            // bootstrap file, then we need to prepend Boot.baseUrl to the
            // paths before processing
            if(manifest.bootRelative) {
                baseUrl = Ext.Boot.baseUrl;
                for(path in paths) {
                    if(paths.hasOwnProperty(path)) {
                        paths[path] = baseUrl + paths[path];
                    }
                }
            }
            Manager.setPath(paths);
        }

        if(classes) {
            for(className in classes) {
                alternates[className] = [];
                aliases[className] = [];
                obj = classes[className];
                if(obj.alias) {
                    aliases[className] = obj.alias;
                }
                if(obj.alternates) {
                    alternates[className] = obj.alternates;
                }
            }
        }

        Manager.addAlias(aliases);
        Manager.addAlternate(alternates);
    }

    return Manager;
}(Ext.Class, Ext.Function.alias, Array.prototype.slice, Ext.Array.from, Ext.global));

