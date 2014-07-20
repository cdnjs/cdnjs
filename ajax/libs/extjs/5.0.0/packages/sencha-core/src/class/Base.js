// @tag class
/**
 * @class Ext.Base
 *
 * The root of all classes created with {@link Ext#define}.
 *
 * Ext.Base is the building block of all Ext classes. All classes in Ext inherit from Ext.Base.
 * All prototype and static members of this class are inherited by all other classes.
 */
Ext.Base = (function(flexSetter) {
// @define Ext.Base
// @require Ext.Util
// @require Ext.Version
// @require Ext.Configurator
// @uses Ext.ClassManager
var noArgs = [],
    baseStaticMember,
    baseStaticMembers = [],
    getConfig = function (name, peek) {
        var me = this,
            ret, cfg, getterName;

        if (name) {
            cfg = Ext.Config.map[name];
            //<debug>
            if (!cfg) {
                Ext.Logger.error("Invalid property name for getter: '" + name + "' for '" + me.$className + "'.");
            }
            //</debug>
            getterName = cfg.names.get;
            if (peek && me.hasOwnProperty(getterName)) {
                ret = me.config[name];
            } else {
                ret = me[getterName]();
            }
        } else {
            ret = me.getCurrentConfig();
        }
        return ret;
    },
    //<debug>
    makeDeprecatedMethod = function (oldName, newName, msg) {
        var message = '"'+ oldName +'" is deprecated.';

        if (msg) {
            message += ' ' + msg;
        } else if (newName) {
            message += ' Please use "'+ newName +'" instead.';
        }

        return function () {
            Ext.Error.raise(message);
        };
    },
    addDeprecatedProperty = function (object, oldName, newName, message) {
        if (!message) {
            message = '"' + oldName + '" is deprecated.';
        }
        if (newName) {
            message += ' Please use "' + newName + '" instead.';
        }

        if (message) {
            Ext.Object.defineProperty(object, oldName, {
                get: function() {
                    Ext.Error.raise(message);
                },
                set: function(value) {
                    Ext.Error.raise(message);
                },
                configurable: true
            });
        }
    },
    //</debug>
    makeAliasFn = function (name) {
        return function () {
            return this[name].apply(this, arguments);
        };
    },
    Version = Ext.Version,
    leadingDigitRe = /^\d/,
    oneMember = {},
    aliasOneMember = {},
    Base = function(){},
    BasePrototype = Base.prototype;

    // These static properties will be copied to every newly created class with {@link Ext#define}
    Ext.apply(Base, {
        $className: 'Ext.Base',

        $isClass: true,

        /**
         * Create a new instance of this Class.
         *
         *     Ext.define('My.cool.Class', {
         *         ...
         *     });
         *
         *     My.cool.Class.create({
         *         someConfig: true
         *     });
         *
         * All parameters are passed to the constructor of the class.
         *
         * @return {Object} the created instance.
         * @static
         * @inheritable
         */
        create: function() {
            return Ext.create.apply(Ext, [this].concat(Array.prototype.slice.call(arguments, 0)));
        },

        /**
         * This method applies a versioned, deprecation declaration to this class. This
         * is typically called by the `deprecated` config.
         * @private
         */
        addDeprecations: function (deprecations) {
            var me = this,
                all = [],
                compatVersion = Ext.getCompatVersion(deprecations.name),
                //<debug>
                displayName = (me.$className || '') + '#',
                //</debug>
                deprecate, versionSpec, index, message, target,
                enabled, existing, fn, names, oldName, newName, member, statics, version;

            for (versionSpec in deprecations) {
                if (leadingDigitRe.test(versionSpec)) {
                    version = new Ext.Version(versionSpec);
                    version.deprecations = deprecations[versionSpec];
                    all.push(version);
                }
            }

            all.sort(Version.compare);

            for (index = all.length; index--; ) {
                deprecate = (version = all[index]).deprecations;
                target = me.prototype;
                statics = deprecate.statics;

                // If user specifies, say 4.2 compatibility and we have a 5.0 deprecation
                // then that block needs to be "enabled" to "revert" to behaviors prior
                // to 5.0. By default, compatVersion === currentVersion, so there are no
                // enabled blocks. In dev mode we still want to visit all the blocks and
                // possibly add shims to detect use of deprecated methods, but in a build
                // (if the deprecated block remains somehow) we just break the loop.
                enabled = compatVersion && compatVersion.lt(version);

                //<debug>
                if (!enabled) {} else
                //</debug>
                if (!enabled) {
                    // we won't get here in dev mode when !enabled
                    break;
                }

                while (deprecate) {
                    names = deprecate.methods;
                    if (names) {
                        for (oldName in names) {
                            member = names[oldName];
                            fn = null;

                            if (!member) {
                                /*
                                 * Something like:
                                 *
                                 *      '5.1': {
                                 *          methods: {
                                 *              removedMethod: null
                                 *          }
                                 *      }
                                 *
                                 * Since there is no recovering the method, we always put
                                 * on a shim to catch abuse.
                                 */

                                //<debug>
                                // The class should not already have a method by the oldName
                                Ext.Assert.isNotDefinedProp(target, oldName);

                                fn = makeDeprecatedMethod(displayName + oldName);
                                //</debug>
                            } else if (Ext.isString(member)) {
                                /*
                                 * Something like:
                                 *
                                 *      '5.1': {
                                 *          methods: {
                                 *              oldName: 'newName'
                                 *          }
                                 *      }
                                 *
                                 * If this block is enabled, we just put an alias in place.
                                 * Otherwise we need to inject a
                                 */

                                //<debug>
                                // The class should not already have a method by the oldName
                                Ext.Assert.isNotDefinedProp(target, oldName);
                                Ext.Assert.isDefinedProp(target, member);
                                //</debug>

                                if (enabled) {
                                    // This call to the real method name must be late
                                    // bound if it is to pick up overrides and such.
                                    fn = makeAliasFn(member);
                                }
                                //<debug>
                                else {
                                    fn = makeDeprecatedMethod(displayName + oldName, member);
                                }
                                //</debug>
                            } else {
                                /*
                                 * Something like:
                                 *
                                 *      '5.1': {
                                 *          methods: {
                                 *              foo: function () { ... }
                                 *          }
                                 *      }
                                 *
                                 * Or this:
                                 *
                                 *      '5.1': {
                                 *          methods: {
                                 *              foo: {
                                 *                  fn: function () { ... },
                                 *                  message: 'Please use "bar" instead.'
                                 *              }
                                 *          }
                                 *      }
                                 *
                                 * Or just this:
                                 *
                                 *      '5.1': {
                                 *          methods: {
                                 *              foo: {
                                 *                  message: 'Use something else instead.'
                                 *              }
                                 *          }
                                 *      }
                                 *
                                 * If this block is enabled, and "foo" is an existing
                                 * method, than we apply the given method as an override.
                                 * If "foo" is not existing, we simply add the method.
                                 *
                                 * If the block is not enabled and there is no existing
                                 * method by that name, than we add a shim to prevent
                                 * abuse.
                                 */
                                message = '';
                                if (member.message || member.fn) {
                                    //<debug>
                                    message = member.message;
                                    //</debug>
                                    member = member.fn;
                                }

                                existing = target.hasOwnProperty(oldName) && target[oldName];

                                if (enabled && member) {
                                    member.$owner = me;
                                    member.$name = oldName;
                                    //<debug>
                                    member.displayName = displayName + oldName;
                                    //</debug>
                                    if (existing) {
                                        member.$previous = existing;
                                    }

                                    fn = member;
                                }
                                //<debug>
                                else if (!existing) {
                                    fn = makeDeprecatedMethod(displayName + oldName, null,
                                                              message);
                                }
                                //</debug>
                            }

                            if (fn) {
                                target[oldName] = fn;
                            }
                        } // for oldName
                    }

                    //<debug>
                    names = deprecate.properties;
                    if (names && !enabled) {
                        // For properties about the only thing we can do is (on Good
                        // Browsers), add warning shims for accessing them. So if the
                        // block is enabled, we don't want those.
                        for (oldName in names) {
                            newName = names[oldName];

                            if (Ext.isString(newName)) {
                                addDeprecatedProperty(target, displayName + oldName, newName);
                            } else if (newName && newName.message) {
                                addDeprecatedProperty(target, displayName + oldName, null,
                                                      newName.message);
                            } else {
                                addDeprecatedProperty(target, displayName + oldName);
                            }
                        }
                    }
                    //</debug>

                    // reset to handle statics and apply them to the class
                    deprecate = statics;
                    statics = null;
                    target = me;
                }
            }
        },

        /**
         * @private
         * @static
         * @inheritable
         * @param config
         */
        extend: function(parent) {
            var me = this,
                parentPrototype = parent.prototype,
                prototype, i, ln, name, statics;

            prototype = me.prototype = Ext.Object.chain(parentPrototype);
            prototype.self = me;

            me.superclass = prototype.superclass = parentPrototype;

            if (!parent.$isClass) {
                for (i in BasePrototype) {
                    if (i in prototype) {
                        prototype[i] = BasePrototype[i];
                    }
                }
            }

            //<feature classSystem.inheritableStatics>
            // Statics inheritance
            statics = parentPrototype.$inheritableStatics;

            if (statics) {
                for (i = 0,ln = statics.length; i < ln; i++) {
                    name = statics[i];

                    if (!me.hasOwnProperty(name)) {
                        me[name] = parent[name];
                    }
                }
            }
            //</feature>

            if (parent.$onExtended) {
                me.$onExtended = parent.$onExtended.slice();
            }

            //<feature classSystem.config>
            me.getConfigurator();
            //</feature>
        },

        /**
         * @private
         * @static
         * @inheritable
         */
        $onExtended: [],

        /**
         * @private
         * @static
         * @inheritable
         */
        triggerExtended: function() {
            //<debug>
            Ext.classSystemMonitor && Ext.classSystemMonitor(this, 'Ext.Base#triggerExtended', arguments);
            //</debug>
        
            var callbacks = this.$onExtended,
                ln = callbacks.length,
                i, callback;

            if (ln > 0) {
                for (i = 0; i < ln; i++) {
                    callback = callbacks[i];
                    callback.fn.apply(callback.scope || this, arguments);
                }
            }
        },

        /**
         * @private
         * @static
         * @inheritable
         */
        onExtended: function(fn, scope) {
            this.$onExtended.push({
                fn: fn,
                scope: scope
            });

            return this;
        },

        /**
         * Add / override static properties of this class.
         *
         *     Ext.define('My.cool.Class', {
         *         ...
         *     });
         *
         *     My.cool.Class.addStatics({
         *         someProperty: 'someValue',      // My.cool.Class.someProperty = 'someValue'
         *         method1: function() { ... },    // My.cool.Class.method1 = function() { ... };
         *         method2: function() { ... }     // My.cool.Class.method2 = function() { ... };
         *     });
         *
         * @param {Object} members
         * @return {Ext.Base} this
         * @static
         * @inheritable
         */
        addStatics: function (members) {
            this.addMembers(members, true);
            return this;
        },

        /**
         * @private
         * @static
         * @inheritable
         * @param {Object} members
         */
        addInheritableStatics: function(members) {
            var inheritableStatics,
                hasInheritableStatics,
                prototype = this.prototype,
                name, member;

            inheritableStatics = prototype.$inheritableStatics;
            hasInheritableStatics = prototype.$hasInheritableStatics;

            if (!inheritableStatics) {
                inheritableStatics = prototype.$inheritableStatics = [];
                hasInheritableStatics = prototype.$hasInheritableStatics = {};
            }

            //<debug>
            var className = Ext.getClassName(this) + '.';
            //</debug>

            for (name in members) {
                if (members.hasOwnProperty(name)) {
                    member = members[name];
                    //<debug>
                    if (typeof member == 'function') {
                        member.displayName = className + name;
                    }
                    //</debug>
                    this[name] = member;

                    if (!hasInheritableStatics[name]) {
                        hasInheritableStatics[name] = true;
                        inheritableStatics.push(name);
                    }
                }
            }

            return this;
        },

        /**
         * Add methods / properties to the prototype of this class.
         *
         *     Ext.define('My.awesome.Cat', {
         *         constructor: function() {
         *             ...
         *         }
         *     });
         *
         *      My.awesome.Cat.addMembers({
         *          meow: function() {
         *             alert('Meowww...');
         *          }
         *      });
         *
         *      var kitty = new My.awesome.Cat();
         *      kitty.meow();
         *
         * @param {Object} members The members to add to this class.
         * @param {Boolean} [isStatic=false] Pass `true` if the members are static.
         * @param {Boolean} [privacy=false] Pass `true` if the members are private. This
         * only has meaning in debug mode and only for methods.
         * @static
         * @inheritable
         */
        addMembers: function (members, isStatic, privacy) {
            var me = this, // this class
                cloneFunction = Ext.Function.clone,
                target = isStatic ? me : me.prototype,
                defaultConfig = !isStatic && target.defaultConfig,
                enumerables = Ext.enumerables,
                privates = members.privates,
                configs, i, ln, member, name, subPrivacy;

            //<debug>
            var displayName = (me.$className || '') + '#';
            //</debug>

            if (privates) {
                // This won't run for normal class private members but will pick up all
                // others (statics, overrides, etc).
                delete members.privates;

                //<debug>
                subPrivacy = privates.privacy || privacy || 'framework';
                //</debug>

                me.addMembers(privates, isStatic, subPrivacy);
                privates = privates.statics;
                if (privates && !isStatic) {
                    me.addMembers(privates, true, subPrivacy);
                }
            }

            for (name in members) {
                if (members.hasOwnProperty(name)) {
                    member = members[name];

                    //<debug>
                    if (member && member.$nullFn && privacy !== member.$privacy) {
                        Ext.Error.raise('Cannot use stock function for private method ' +
                            (me.$className ? me.$className + '#' : '') + name);
                    }
                    //</debug>

                    if (typeof member === 'function' && !member.$isClass && !member.$nullFn) {
                        if (member.$owner) {
                            member = cloneFunction(member);
                        }

                        if (target.hasOwnProperty(name)) {
                            member.$previous = target[name];
                        }

                        // This information is needed by callParent() and callSuper() as
                        // well as statics() and even Ext.fly().
                        member.$owner = me;
                        member.$name = name;

                        //<debug>
                        member.displayName = displayName + name;

                        var existing = target[name];

                        if (privacy) {
                            if (privacy === true) {
                                privacy = 'framework';
                            }

                            member.$privacy = privacy;

                            // The general idea here is that an existing, non-private
                            // method can be marked private. This is because the other
                            // way is strictly forbidden (private method going public)
                            // so if a method is in that gray area it can only be made
                            // private in doc form which allows a derived class to make
                            // it public.
                            if (existing && existing.$privacy && existing.$privacy !== privacy) {
                                Ext.privacyViolation(me, existing, member, isStatic);
                            }
                        } else if (existing && existing.$privacy) {
                            Ext.privacyViolation(me, existing, member, isStatic);
                        }
                        //</debug>
                    // The last part of the check here resolves a conflict if we have the same property
                    // declared as both a config and a member on the class so that the config wins.
                    } else if (defaultConfig && (name in defaultConfig) && !target.config.hasOwnProperty(name)) {
                        // This is a config property so it must be added to the configs
                        // collection not just smashed on the prototype...
                        (configs || (configs = {}))[name] = member;
                        continue;
                    }

                    target[name] = member;
                }
            }

            if (configs) {
                // Add any configs found in the normal members arena:
                me.addConfig(configs);
            }

            if (enumerables) {
                for (i = 0, ln = enumerables.length; i < ln; ++i) {
                    if (members.hasOwnProperty(name = enumerables[i])) {
                        member = members[name];

                        // The enumerables are all functions...
                        if (member && !member.$nullFn) {
                            if (member.$owner) {
                                member = cloneFunction(member);
                            }

                            member.$owner = me;
                            member.$name = name;
                            //<debug>
                            member.displayName = displayName + name;
                            //</debug>

                            if (target.hasOwnProperty(name)) {
                                member.$previous = target[name];
                            }
                        }

                        target[name] = member;
                    }
                }
            }

            return this;
        },

        /**
         * @private
         * @static
         * @inheritable
         * @param name
         * @param member
         */
        addMember: function (name, member) {
            oneMember[name] = member;
            this.addMembers(oneMember);
            delete oneMember[name];
            return this;
        },

        /**
         * Borrow another class' members to the prototype of this class.
         *
         *     Ext.define('Bank', {
         *         money: '$$$',
         *         printMoney: function() {
         *             alert('$$$$$$$');
         *         }
         *     });
         *
         *     Ext.define('Thief', {
         *         ...
         *     });
         *
         *     Thief.borrow(Bank, ['money', 'printMoney']);
         *
         *     var steve = new Thief();
         *
         *     alert(steve.money); // alerts '$$$'
         *     steve.printMoney(); // alerts '$$$$$$$'
         *
         * @param {Ext.Base} fromClass The class to borrow members from
         * @param {Array/String} members The names of the members to borrow
         * @return {Ext.Base} this
         * @static
         * @inheritable
         * @private
         */
        borrow: function(fromClass, members) {
            //<debug>
            Ext.classSystemMonitor && Ext.classSystemMonitor(this, 'Ext.Base#borrow', arguments);
            //</debug>

            var prototype = fromClass.prototype,
                membersObj = {},
                i, ln, name;

            members = Ext.Array.from(members);

            for (i = 0,ln = members.length; i < ln; i++) {
                name = members[i];
                membersObj[name] = prototype[name];
            }

            return this.addMembers(membersObj);
        },

        /**
         * Override members of this class. Overridden methods can be invoked via
         * {@link Ext.Base#callParent}.
         *
         *     Ext.define('My.Cat', {
         *         constructor: function() {
         *             alert("I'm a cat!");
         *         }
         *     });
         *
         *     My.Cat.override({
         *         constructor: function() {
         *             alert("I'm going to be a cat!");
         *
         *             this.callParent(arguments);
         *
         *             alert("Meeeeoooowwww");
         *         }
         *     });
         *
         *     var kitty = new My.Cat(); // alerts "I'm going to be a cat!"
         *                               // alerts "I'm a cat!"
         *                               // alerts "Meeeeoooowwww"
         *
         * Direct use of this method should be rare. Use {@link Ext#define Ext.define}
         * instead:
         *
         *     Ext.define('My.CatOverride', {
         *         override: 'My.Cat',
         *         constructor: function() {
         *             alert("I'm going to be a cat!");
         *
         *             this.callParent(arguments);
         *
         *             alert("Meeeeoooowwww");
         *         }
         *     });
         *
         * The above accomplishes the same result but can be managed by the {@link Ext.Loader}
         * which can properly order the override and its target class and the build process
         * can determine whether the override is needed based on the required state of the
         * target class (My.Cat).
         *
         * @param {Object} members The properties to add to this class. This should be
         * specified as an object literal containing one or more properties.
         * @return {Ext.Base} this class
         * @static
         * @inheritable
         */
        override: function(members) {
            var me = this,
                statics = members.statics,
                inheritableStatics = members.inheritableStatics,
                config = members.config,
                mixins = members.mixins,
                cachedConfig = members.cachedConfig;

            if (statics || inheritableStatics || config) {
                members = Ext.apply({}, members);
            }

            if (statics) {
                me.addMembers(statics, true);
                delete members.statics;
            }

            if (inheritableStatics){
                me.addInheritableStatics(inheritableStatics);
                delete members.inheritableStatics;
            }

            if (config) {
                me.addConfig(config);
                delete members.config;
            }
            
            if (cachedConfig) {
                me.addCachedConfig(cachedConfig);
                delete members.cachedConfig;
            }
            
            delete members.mixins;

            me.addMembers(members);
            if (mixins) {
                me.mixin(mixins);
            }
            return me;
        },

        /**
         * @protected
         * @static
         * @inheritable
         */
        callParent: function(args) {
            var method;

            // This code is intentionally inlined for the least amount of debugger stepping
            return (method = this.callParent.caller) && (method.$previous ||
                  ((method = method.$owner ? method : method.caller) &&
                        method.$owner.superclass.self[method.$name])).apply(this, args || noArgs);
        },

        /**
         * @protected
         * @static
         * @inheritable
         */
        callSuper: function(args) {
            var method;

            // This code is intentionally inlined for the least amount of debugger stepping
            return (method = this.callSuper.caller) &&
                    ((method = method.$owner ? method : method.caller) &&
                      method.$owner.superclass.self[method.$name]).apply(this, args || noArgs);
        },

        //<feature classSystem.mixins>
        /**
         * Used internally by the mixins pre-processor
         * @private
         * @static
         * @inheritable
         */
        mixin: function(name, mixinClass) {
            var me = this,
                mixin, prototype, key, statics, i, ln, staticName, mixinValue, mixins;

            if (typeof name !== 'string') {
                mixins = name;
                if (mixins instanceof Array) {
                    for (i = 0,ln = mixins.length; i < ln; i++) {
                        mixin = mixins[i];
                        me.mixin(mixin.prototype.mixinId || mixin.$className, mixin);
                    }
                } else {
                    // Not a string or array - process the object form:
                    // mixins: {
                    //     foo: ...
                    // }
                    for (var mixinName in mixins) {
                        me.mixin(mixinName, mixins[mixinName]);
                    }
                }
                return;
            }

            mixin = mixinClass.prototype;
            prototype = me.prototype;

            if (mixin.onClassMixedIn) {
                mixin.onClassMixedIn.call(mixinClass, me);
            }

            if (!prototype.hasOwnProperty('mixins')) {
                if ('mixins' in prototype) {
                    prototype.mixins = Ext.Object.chain(prototype.mixins);
                }
                else {
                    prototype.mixins = {};
                }
            }

            for (key in mixin) {
                mixinValue = mixin[key];
                if (key === 'mixins') {
                    // if 2 superclasses (e.g. a base class and a mixin) of this class both
                    // have a mixin with the same id, the first one wins, that is to say,
                    // the first mixin's methods to be applied to the prototype will not
                    // be overwritten by the second one.  Since this is the case we also
                    // want to make sure we use the first mixin's prototype as the mixin
                    // reference, hence the "applyIf" below.  A real world example of this
                    // is Ext.Widget which mixes in Ext.mixin.Observable.  Ext.Widget can
                    // be mixed into subclasses of Ext.Component, which mixes in
                    // Ext.util.Observable.  In this example, since the first "observable"
                    // mixin's methods win, we also want its reference to be preserved.
                    Ext.applyIf(prototype.mixins, mixinValue);
                }
                else if (!(key === 'mixinId' || key === 'config') && (prototype[key] === undefined)) {
                    prototype[key] = mixinValue;
                }
            }

            //<feature classSystem.inheritableStatics>
            // Mixin statics inheritance
            statics = mixin.$inheritableStatics;

            if (statics) {
                for (i = 0, ln = statics.length; i < ln; i++) {
                    staticName = statics[i];

                    if (!me.hasOwnProperty(staticName)) {
                        me[staticName] = mixinClass[staticName];
                    }
                }
            }
            //</feature>

            //<feature classSystem.config>
            if ('config' in mixin) {
                me.addConfig(mixin.config, mixinClass);
            }
            //</feature>

            prototype.mixins[name] = mixin;

            if (mixin.afterClassMixedIn) {
                mixin.afterClassMixedIn.call(mixinClass, me);
            }

            return me;
        },
        //</feature>

        //<feature classSystem.config>
        /**
         * Adds new config properties to this class. This is called for classes when they
         * are declared, then for any mixins that class may define and finally for any
         * overrides defined that target the class.
         * 
         * @param {Object} config
         * @param {Class} [mixinClass] The mixin class if the configs are from a mixin.
         * @private
         * @static
         * @inheritable
         */
        addConfig: function (config, mixinClass) {
            var cfg = this.$config || this.getConfigurator();
            cfg.add(config, mixinClass);
        },

        addCachedConfig: function(config, isMixin) {
            var cached = {},
                key;
                
            for (key in config) {
                cached[key] = {
                    cached: true,
                    $value: config[key]
                };
            }
            this.addConfig(cached, isMixin);
        },

        /**
         * Returns the `Ext.Configurator` for this class.
         * 
         * @return {Ext.Configurator}
         * @private
         * @static
         * @inheritable
         */
        getConfigurator: function () {
            // the Ext.Configurator ctor will set $config so micro-opt out fn call:
            return this.$config || new Ext.Configurator(this);
        },
        //</feature>

        /**
         * Get the current class' name in string format.
         *
         *     Ext.define('My.cool.Class', {
         *         constructor: function() {
         *             alert(this.self.getName()); // alerts 'My.cool.Class'
         *         }
         *     });
         *
         *     My.cool.Class.getName(); // 'My.cool.Class'
         *
         * @return {String} className
         * @static
         * @inheritable
         */
        getName: function() {
            return Ext.getClassName(this);
        },

        /**
         * Create aliases for existing prototype methods. Example:
         *
         *     Ext.define('My.cool.Class', {
         *         method1: function() { ... },
         *         method2: function() { ... }
         *     });
         *
         *     var test = new My.cool.Class();
         *
         *     My.cool.Class.createAlias({
         *         method3: 'method1',
         *         method4: 'method2'
         *     });
         *
         *     test.method3(); // test.method1()
         *
         *     My.cool.Class.createAlias('method5', 'method3');
         *
         *     test.method5(); // test.method3() -> test.method1()
         *
         * @param {String/Object} alias The new method name, or an object to set multiple aliases. See
         * {@link Ext.Function#flexSetter flexSetter}
         * @param {String/Object} origin The original method name
         * @static
         * @inheritable
         * @method
         */
        createAlias: flexSetter(function(alias, origin) {
            aliasOneMember[alias] = function() {
                return this[origin].apply(this, arguments);
            };
            this.override(aliasOneMember);
            delete aliasOneMember[alias];
        })
    });

    // Capture the set of static members on Ext.Base that we want to copy to all
    // derived classes. This array is used by Ext.Class as well as the optimizer.
    for (baseStaticMember in Base) {
        if (Base.hasOwnProperty(baseStaticMember)) {
            baseStaticMembers.push(baseStaticMember);
        }
    }

    Base.$staticMembers = baseStaticMembers;

    //<feature classSystem.config>
    Base.getConfigurator(); // lazily create now so as not capture in $staticMembers
    //</feature>

    Base.addMembers({
        /** @private */
        $className: 'Ext.Base',

        /**
         * @property {Boolean} isInstance
         * This value is `true` and is used to identify plain objects from instances of
         * a defined class.
         * @protected
         * @readonly
         */
        isInstance: true,

        /**
         * @property {Boolean} [$configPrefixed=false]
         * The value `true` causes `config` values to be stored on instances using a
         * property name prefixed with an underscore ("_") character. A value of `false`
         * stores `config` values as properties using their exact name (no prefix).
         * @private
         * @since 5.0.0
         */
        $configPrefixed: true,
        
        /**
         * @property {Boolean} [$configStrict=true]
         * The value `true` instructs the `initConfig` method to only honor values for
         * properties declared in the `config` block of a class. When `false`, properties
         * that are not declared in a `config` block will be placed on the instance.
         * @private
         * @since 5.0.0
         */
        $configStrict: true,

        /**
         * @property {Boolean} isConfiguring
         * This property is set to `true` during the call to `initConfig`.
         * @protected
         * @readonly
         * @since 5.0.0
         */
        isConfiguring: false,

        /**
         * @property {Boolean} isFirstInstance
         * This property is set to `true` if this instance is the first of its class.
         * @protected
         * @readonly
         * @since 5.0.0
         */
        isFirstInstance: false,

        /**
         * Get the reference to the class from which this object was instantiated. Note that unlike {@link Ext.Base#self},
         * `this.statics()` is scope-independent and it always returns the class from which it was called, regardless of what
         * `this` points to during run-time
         *
         *     Ext.define('My.Cat', {
         *         statics: {
         *             totalCreated: 0,
         *             speciesName: 'Cat' // My.Cat.speciesName = 'Cat'
         *         },
         *
         *         constructor: function() {
         *             var statics = this.statics();
         *
         *             alert(statics.speciesName);     // always equals to 'Cat' no matter what 'this' refers to
         *                                             // equivalent to: My.Cat.speciesName
         *
         *             alert(this.self.speciesName);   // dependent on 'this'
         *
         *             statics.totalCreated++;
         *         },
         *
         *         clone: function() {
         *             var cloned = new this.self();   // dependent on 'this'
         *
         *             cloned.groupName = this.statics().speciesName;   // equivalent to: My.Cat.speciesName
         *
         *             return cloned;
         *         }
         *     });
         *
         *
         *     Ext.define('My.SnowLeopard', {
         *         extend: 'My.Cat',
         *
         *         statics: {
         *             speciesName: 'Snow Leopard'     // My.SnowLeopard.speciesName = 'Snow Leopard'
         *         },
         *
         *         constructor: function() {
         *             this.callParent();
         *         }
         *     });
         *
         *     var cat = new My.Cat();                 // alerts 'Cat', then alerts 'Cat'
         *
         *     var snowLeopard = new My.SnowLeopard(); // alerts 'Cat', then alerts 'Snow Leopard'
         *
         *     var clone = snowLeopard.clone();
         *     alert(Ext.getClassName(clone));         // alerts 'My.SnowLeopard'
         *     alert(clone.groupName);                 // alerts 'Cat'
         *
         *     alert(My.Cat.totalCreated);             // alerts 3
         *
         * @protected
         * @return {Ext.Class}
         */
        statics: function() {
            var method = this.statics.caller,
                self = this.self;

            if (!method) {
                return self;
            }

            return method.$owner;
        },

        /**
         * Call the "parent" method of the current method. That is the method previously
         * overridden by derivation or by an override (see {@link Ext#define}).
         *
         *      Ext.define('My.Base', {
         *          constructor: function (x) {
         *              this.x = x;
         *          },
         *
         *          statics: {
         *              method: function (x) {
         *                  return x;
         *              }
         *          }
         *      });
         *
         *      Ext.define('My.Derived', {
         *          extend: 'My.Base',
         *
         *          constructor: function () {
         *              this.callParent([21]);
         *          }
         *      });
         *
         *      var obj = new My.Derived();
         *
         *      alert(obj.x);  // alerts 21
         *
         * This can be used with an override as follows:
         *
         *      Ext.define('My.DerivedOverride', {
         *          override: 'My.Derived',
         *
         *          constructor: function (x) {
         *              this.callParent([x*2]); // calls original My.Derived constructor
         *          }
         *      });
         *
         *      var obj = new My.Derived();
         *
         *      alert(obj.x);  // now alerts 42
         *
         * This also works with static methods.
         *
         *      Ext.define('My.Derived2', {
         *          extend: 'My.Base',
         *
         *          statics: {
         *              method: function (x) {
         *                  return this.callParent([x*2]); // calls My.Base.method
         *              }
         *          }
         *      });
         *
         *      alert(My.Base.method(10));     // alerts 10
         *      alert(My.Derived2.method(10)); // alerts 20
         *
         * Lastly, it also works with overridden static methods.
         *
         *      Ext.define('My.Derived2Override', {
         *          override: 'My.Derived2',
         *
         *          statics: {
         *              method: function (x) {
         *                  return this.callParent([x*2]); // calls My.Derived2.method
         *              }
         *          }
         *      });
         *
         *      alert(My.Derived2.method(10); // now alerts 40
         *
         * To override a method and replace it and also call the superclass method, use
         * {@link #callSuper}. This is often done to patch a method to fix a bug.
         *
         * @protected
         * @param {Array/Arguments} args The arguments, either an array or the `arguments` object
         * from the current method, for example: `this.callParent(arguments)`
         * @return {Object} Returns the result of calling the parent method
         */
        callParent: function(args) {
            // NOTE: this code is deliberately as few expressions (and no function calls)
            // as possible so that a debugger can skip over this noise with the minimum number
            // of steps. Basically, just hit Step Into until you are where you really wanted
            // to be.
            var method,
                superMethod = (method = this.callParent.caller) && (method.$previous ||
                        ((method = method.$owner ? method : method.caller) &&
                                method.$owner.superclass[method.$name]));

            //<debug error>
            if (!superMethod) {
                method = this.callParent.caller;
                var parentClass, methodName;

                if (!method.$owner) {
                    if (!method.caller) {
                        throw new Error("Attempting to call a protected method from the public scope, which is not allowed");
                    }

                    method = method.caller;
                }

                parentClass = method.$owner.superclass;
                methodName = method.$name;

                if (!(methodName in parentClass)) {
                    throw new Error("this.callParent() was called but there's no such method (" + methodName +
                                ") found in the parent class (" + (Ext.getClassName(parentClass) || 'Object') + ")");
                }
            }
            //</debug>

            return superMethod.apply(this, args || noArgs);
        },

        /**
         * This method is used by an override to call the superclass method but bypass any
         * overridden method. This is often done to "patch" a method that contains a bug
         * but for whatever reason cannot be fixed directly.
         * 
         * Consider:
         * 
         *      Ext.define('Ext.some.Class', {
         *          method: function () {
         *              console.log('Good');
         *          }
         *      });
         * 
         *      Ext.define('Ext.some.DerivedClass', {
         *          extend: 'Ext.some.Class',
         *          
         *          method: function () {
         *              console.log('Bad');
         * 
         *              // ... logic but with a bug ...
         *              
         *              this.callParent();
         *          }
         *      });
         * 
         * To patch the bug in `Ext.some.DerivedClass.method`, the typical solution is to create an
         * override:
         * 
         *      Ext.define('App.patches.DerivedClass', {
         *          override: 'Ext.some.DerivedClass',
         *          
         *          method: function () {
         *              console.log('Fixed');
         * 
         *              // ... logic but with bug fixed ...
         *
         *              this.callSuper();
         *          }
         *      });
         * 
         * The patch method cannot use `callParent` to call the superclass `method` since
         * that would call the overridden method containing the bug. In other words, the
         * above patch would only produce "Fixed" then "Good" in the console log, whereas,
         * using `callParent` would produce "Fixed" then "Bad" then "Good".
         *
         * @protected
         * @param {Array/Arguments} args The arguments, either an array or the `arguments` object
         * from the current method, for example: `this.callSuper(arguments)`
         * @return {Object} Returns the result of calling the superclass method
         */
        callSuper: function(args) {
            // NOTE: this code is deliberately as few expressions (and no function calls)
            // as possible so that a debugger can skip over this noise with the minimum number
            // of steps. Basically, just hit Step Into until you are where you really wanted
            // to be.
            var method,
                superMethod = (method = this.callSuper.caller) &&
                        ((method = method.$owner ? method : method.caller) &&
                          method.$owner.superclass[method.$name]);

            //<debug error>
            if (!superMethod) {
                method = this.callSuper.caller;
                var parentClass, methodName;

                if (!method.$owner) {
                    if (!method.caller) {
                        throw new Error("Attempting to call a protected method from the public scope, which is not allowed");
                    }

                    method = method.caller;
                }

                parentClass = method.$owner.superclass;
                methodName = method.$name;

                if (!(methodName in parentClass)) {
                    throw new Error("this.callSuper() was called but there's no such method (" + methodName +
                                ") found in the parent class (" + (Ext.getClassName(parentClass) || 'Object') + ")");
                }
            }
            //</debug>

            return superMethod.apply(this, args || noArgs);
        },

        /**
         * @property {Ext.Class} self
         *
         * Get the reference to the current class from which this object was instantiated. Unlike {@link Ext.Base#statics},
         * `this.self` is scope-dependent and it's meant to be used for dynamic inheritance. See {@link Ext.Base#statics}
         * for a detailed comparison
         *
         *     Ext.define('My.Cat', {
         *         statics: {
         *             speciesName: 'Cat' // My.Cat.speciesName = 'Cat'
         *         },
         *
         *         constructor: function() {
         *             alert(this.self.speciesName); // dependent on 'this'
         *         },
         *
         *         clone: function() {
         *             return new this.self();
         *         }
         *     });
         *
         *
         *     Ext.define('My.SnowLeopard', {
         *         extend: 'My.Cat',
         *         statics: {
         *             speciesName: 'Snow Leopard'         // My.SnowLeopard.speciesName = 'Snow Leopard'
         *         }
         *     });
         *
         *     var cat = new My.Cat();                     // alerts 'Cat'
         *     var snowLeopard = new My.SnowLeopard();     // alerts 'Snow Leopard'
         *
         *     var clone = snowLeopard.clone();
         *     alert(Ext.getClassName(clone));             // alerts 'My.SnowLeopard'
         *
         * @protected
         */
        self: Base,

        // Default constructor, simply returns `this`
        constructor: function() {
            return this;
        },

        //<feature classSystem.config>
        getConfigurator: function () {
            return this.$config || this.self.getConfigurator();
        },

        /**
         * Initialize configuration for this class. a typical example:
         *
         *     Ext.define('My.awesome.Class', {
         *         // The default config
         *         config: {
         *             name: 'Awesome',
         *             isAwesome: true
         *         },
         *
         *         constructor: function(config) {
         *             this.initConfig(config);
         *         }
         *     });
         *
         *     var awesome = new My.awesome.Class({
         *         name: 'Super Awesome'
         *     });
         *
         *     alert(awesome.getName()); // 'Super Awesome'
         *
         * @protected
         * @param {Object} config
         * @return {Ext.Base} this
         */
        initConfig: function(instanceConfig) {
            var me = this,
                cfg = me.getConfigurator();

            me.initConfig = Ext.emptyFn; // ignore subsequent calls to initConfig
            me.initialConfig = instanceConfig || {};
            cfg.configure(me, instanceConfig);

            return me;
        },

        beforeInitConfig: Ext.emptyFn,

        /**
         * Returns a specified config property value. If the name parameter is not passed,
         * all current configuration options will be returned as key value pairs.
         * @method
         * @param {String} [name] The name of the config property to get.
         * @param {Boolean} [peek=false] `true` to peek at the raw value without calling the getter.
         * @return {Object} The config property value.
         */
        getConfig: getConfig,

        /**
         * Sets a single/multiple configuration options.
         * @method
         * @param {String/Object} name The name of the property to set, or a set of key value pairs to set.
         * @param {Object} value The value to set for the name parameter.
         * @return {Ext.Base} this
         */
        setConfig: function(name, value) {
            var me = this,
                cfg;
            
            if (typeof name === 'string') {
                cfg = Ext.Config.map[name];
                if (!cfg) {
                    Ext.Logger.error("Invalid property name for setter: '" + name + "' for '" + this.$className + "'.");
                }
                this[cfg.names.set](value);
            } else if (name) {
                // Assume name is an object
                me.getConfigurator().reconfigure(me, name);
            }

            return me;
        },

        /**
         * @private
         */
        getCurrentConfig: function() {
            var cfg = this.getConfigurator();

            return cfg.getCurrentConfig(this);
        },

        /**
         * @private
         * @param config
         */
        hasConfig: function(name) {
            return name in this.defaultConfig;
        },

        /**
         * Returns the initial configuration passed to constructor when instantiating
         * this class.
         * @param {String} [name] Name of the config option to return.
         * @return {Object/Mixed} The full config object or a single config value
         * when `name` parameter specified.
         */
        getInitialConfig: function(name) {
            var config = this.config;

            if (!name) {
                return config;
            }

            return config[name];
        },
        //</feature>

        $links: null,

        /**
         * Adds a "destroyable" object to an internal list of objects that will be destroyed
         * when this instance is destroyed (via `{@link #destroy}`).
         * @param {String} name
         * @param {Object} value
         * @return {Object} The `value` passed.
         * @private
         */
        link: function (name, value) {
            var me = this,
                links = me.$links || (me.$links = {});

            links[name] = true;
            me[name] = value;

            return value;
        },

        /**
         * Destroys a given set of `{@link #link linked}` objects. This is only needed if
         * the linked object is being destroyed before this instance.
         * @param {String[]} names The names of the linked objects to destroy.
         * @return {Ext.Base} this
         * @private
         */
        unlink: function (names) {
            var me = this,
                i, ln, link, value;

            //<debug>
            if (!Ext.isArray(names)) {
                Ext.Error.raise('Invalid argument - expected array of strings');
            }
            //</debug>

            for (i = 0, ln = names.length; i < ln; i++) {
                link = names[i];
                value = me[link];

                if (value) {
                    if (value.isInstance && !value.isDestroyed) {
                        value.destroy();
                    }
                    else if (value.parentNode && 'nodeType' in value) {
                        value.parentNode.removeChild(value);
                    }
                }

                me[link] = null;
            }

            return me;
        },

        /**
         * This method is called to cleanup an object and its resources. After calling
         * this method, the object should not be used any further.
         * @protected
         */
        destroy: function() {
            var me = this,
                links = me.$links;

            me.destroy = Ext.emptyFn;
            me.isDestroyed = true;

            if (links) {
                me.$links = null;
                me.unlink(Ext.Object.getKeys(links));
            }
        }
    });

    /**
     * Call the original method that was previously overridden with {@link Ext.Base#override}
     *
     *     Ext.define('My.Cat', {
     *         constructor: function() {
     *             alert("I'm a cat!");
     *         }
     *     });
     *
     *     My.Cat.override({
     *         constructor: function() {
     *             alert("I'm going to be a cat!");
     *
     *             this.callOverridden();
     *
     *             alert("Meeeeoooowwww");
     *         }
     *     });
     *
     *     var kitty = new My.Cat(); // alerts "I'm going to be a cat!"
     *                               // alerts "I'm a cat!"
     *                               // alerts "Meeeeoooowwww"
     *
     * @param {Array/Arguments} args The arguments, either an array or the `arguments` object
     * from the current method, for example: `this.callOverridden(arguments)`
     * @return {Object} Returns the result of calling the overridden method
     * @protected
     * @deprecated Use {@link #callParent} instead.
     */
    BasePrototype.callOverridden = BasePrototype.callParent;

    //<debug>
    Ext.privacyViolation = function (cls, existing, member, isStatic) {
        var name = member.$name,
            conflictCls = existing.$owner && existing.$owner.$className,
            s = isStatic ? 'static ' : '',
            msg = member.$privacy
                ? 'Private ' + s + member.$privacy + ' method "' + name + '"'
                : 'Public ' + s + 'method "' + name + '"';

        if (cls.$className) {
            msg = cls.$className + ': ' + msg;
        }

        if (!existing.$privacy) {
            msg += conflictCls
                ? ' hides public method inherited from ' + conflictCls
                : ' hides inherited public method.';
        } else {
            msg += conflictCls
                ? ' conflicts with private ' + existing.$privacy +
                  ' method declared by ' + conflictCls
                : ' conflicts with inherited private ' + existing.$privacy + ' method.';
        }

        var compat = Ext.getCompatVersion();
        var ver = Ext.getVersion();

        // When compatibility is enabled, log problems instead of throwing errors.
        if (ver && compat && compat.lt(ver)) {
            Ext.log.error(msg);
        } else {
            Ext.Error.raise(msg);
        }
    };
    //</debug>

    return Base;
}(Ext.Function.flexSetter));
