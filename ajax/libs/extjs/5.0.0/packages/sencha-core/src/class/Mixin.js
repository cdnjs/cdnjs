/**
 * This class is a base class for mixins. These are classes that extend this class and are
 * designed to be used as a `mixin` by user code.
 *
 * It provides mixins with the ability to "hook" class methods of the classes in to which
 * they are mixed. For example, consider the `destroy` method pattern. If a mixin class
 * had cleanup requirements, it would need to be called as part of `destroy`.
 * 
 * Starting with a basic class we might have:
 * 
 *      Ext.define('Foo.bar.Base', {
 *          destroy: function () {
 *              console.log('B');
 *              // cleanup
 *          }
 *      });
 *
 * A derived class would look like this:
 *
 *      Ext.define('Foo.bar.Derived', {
 *          extend: 'Foo.bar.Base',
 *
 *          destroy: function () {
 *              console.log('D');
 *              // more cleanup
 *
 *              this.callParent(); // let Foo.bar.Base cleanup as well
 *          }
 *      });
 *
 * To see how using this class help, start with a "normal" mixin class that also needs to
 * cleanup its resources. These mixins must be called explicitly by the classes that use
 * them. For example:
 * 
 *      Ext.define('Foo.bar.Util', {
 *          destroy: function () {
 *              console.log('U');
 *          }
 *      });
 * 
 *      Ext.define('Foo.bar.Derived', {
 *          extend: 'Foo.bar.Base',
 *
 *          mixins: {
 *              util: 'Foo.bar.Util'
 *          },
 *
 *          destroy: function () {
 *              console.log('D');
 *              // more cleanup
 *
 *              this.mixins.util.destroy.call(this);
 *
 *              this.callParent(); // let Foo.bar.Base cleanup as well
 *          }
 *      });
 *
 *      var obj = new Foo.bar.Derived();
 *
 *      obj.destroy();
 *      // logs D then U then B
 *
 * This class is designed to solve the above in simpler and more reliable way.
 *
 * ## mixinConfig
 * 
 * Using `mixinConfig` the mixin class can provide "before" or "after" hooks that do not
 * involve the derived class implementation. This also means the derived class cannot
 * adjust parameters to the hook methods.
 * 
 *      Ext.define('Foo.bar.Util', {
 *          extend: 'Ext.Mixin',
 *
 *          mixinConfig: {
 *              after: {
 *                  destroy: 'destroyUtil'
 *              }
 *          },
 *          
 *          destroyUtil: function () {
 *              console.log('U');
 *          }
 *      });
 * 
 *      Ext.define('Foo.bar.Class', {
 *          mixins: {
 *              util: 'Foo.bar.Util'
 *          },
 *
 *          destroy: function () {
 *              console.log('D');
 *          }
 *      });
 *
 *      var obj = new Foo.bar.Derived();
 *
 *      obj.destroy();
 *      // logs D then U
 * 
 *  If the destruction should occur in the other order, you can use `before`:
 * 
 *      Ext.define('Foo.bar.Util', {
 *          extend: 'Ext.Mixin',
 *
 *          mixinConfig: {
 *              before: {
 *                  destroy: 'destroyUtil'
 *              }
 *          },
 *          
 *          destroyUtil: function () {
 *              console.log('U');
 *          }
 *      });
 * 
 *      Ext.define('Foo.bar.Class', {
 *          mixins: {
 *              util: 'Foo.bar.Util'
 *          },
 *
 *          destroy: function () {
 *              console.log('D');
 *          }
 *      });
 *
 *      var obj = new Foo.bar.Derived();
 *
 *      obj.destroy();
 *      // logs U then D
 *
 * ### Chaining
 *
 * One way for a mixin to provide methods that act more like normal inherited methods is
 * to use an `on` declaration. These methods will be injected into the `callParent` chain
 * between the derived and superclass. For example:
 *
 *      Ext.define('Foo.bar.Util', {
 *          extend: 'Ext.Mixin',
 *
 *          mixinConfig: {
 *              on: {
 *                  destroy: function () {
 *                      console.log('M');
 *                  }
 *              }
 *          }
 *      });
 *
 *      Ext.define('Foo.bar.Base', {
 *          destroy: function () {
 *              console.log('B');
 *          }
 *      });
 *
 *      Ext.define('Foo.bar.Derived', {
 *          extend: 'Foo.bar.Base',
 *
 *          mixins: {
 *              util: 'Foo.bar.Util'
 *          },
 *
 *          destroy: function () {
 *              this.callParent();
 *              console.log('D');
 *          }
 *      });
 *
 *      var obj = new Foo.bar.Derived();
 *
 *      obj.destroy();
 *      // logs M then B then D
 *
 * As with `before` and `after`, the value of `on` can be a method name.
 *
 *      Ext.define('Foo.bar.Util', {
 *          extend: 'Ext.Mixin',
 *
 *          mixinConfig: {
 *              on: {
 *                  destroy: 'onDestroy'
 *              }
 *          }
 *
 *          onDestroy: function () {
 *              console.log('M');
 *          }
 *      });
 *
 * Because this technique leverages `callParent`, the derived class controls the time and
 * parameters for the call to all of its bases (be they `extend` or `mixin` flavor).
 *
 * ### Derivations
 *
 * Some mixins need to process class extensions of their target class. To do this you can
 * define an `extended` method like so:
 *
 *      Ext.define('Foo.bar.Util', {
 *          extend: 'Ext.Mixin',
 *
 *          mixinConfig: {
 *              extended: function (baseClass, derivedClass, classBody) {
 *                  // This function is called whenever a new "derivedClass" is created
 *                  // that extends a "baseClass" in to which this mixin was mixed.
 *              }
 *          }
 *      });
 *
 * @protected
 */
Ext.define('Ext.Mixin', function (Mixin) { return {

    statics: {
        addHook: function (hookFn, targetClass, methodName, mixinClassPrototype) {
            var isFunc = Ext.isFunction(hookFn),
                hook = function () {
                    var a = arguments,
                        fn = isFunc ? hookFn : mixinClassPrototype[hookFn],
                        result = this.callParent(a);
                    fn.apply(this, a);
                    return result;
                },
                existingFn = targetClass.hasOwnProperty(methodName) &&
                             targetClass[methodName];

            if (isFunc) {
                hookFn.$previous = Ext.emptyFn; // no callParent for these guys
            }

            hook.$name = methodName;
            hook.$owner = targetClass.self;

            if (existingFn) {
                hook.$previous = existingFn.$previous;
                existingFn.$previous = hook;
            } else {
                targetClass[methodName] = hook;
            }
        }
    },

    onClassExtended: function(cls, data) {
        var mixinConfig = data.mixinConfig,
            hooks = data.xhooks,
            superclass = cls.superclass,
            onClassMixedIn = data.onClassMixedIn,
            parentMixinConfig,
            befores, afters, extended;

        if (hooks) {
            // Legacy way
            delete data.xhooks;
            (mixinConfig || (data.mixinConfig = mixinConfig = {})).on = hooks;
        }

        if (mixinConfig) {
            parentMixinConfig = superclass.mixinConfig;

            if (parentMixinConfig) {
                data.mixinConfig = mixinConfig = Ext.merge({}, parentMixinConfig, mixinConfig);
            }

            data.mixinId = mixinConfig.id;

            //<debug>
            if (mixinConfig.beforeHooks) {
                Ext.Error.raise('Use of "beforeHooks" is deprecated - use "before" instead');
            }
            if (mixinConfig.hooks) {
                Ext.Error.raise('Use of "hooks" is deprecated - use "after" instead');
            }
            if (mixinConfig.afterHooks) {
                Ext.Error.raise('Use of "afterHooks" is deprecated - use "after" instead');
            }
            //</debug>

            befores = mixinConfig.before;
            afters = mixinConfig.after;
            hooks = mixinConfig.on;
            extended = mixinConfig.extended;
        }

        if (befores || afters || hooks || extended) {
            // Note: tests are with Ext.Class
            data.onClassMixedIn = function (targetClass) {
                var mixin = this.prototype,
                    targetProto = targetClass.prototype,
                    key;

                if (befores) {
                    Ext.Object.each(befores, function (key, value) {
                        targetClass.addMember(key, function () {
                            if (mixin[value].apply(this, arguments) !== false) {
                                return this.callParent(arguments);
                            }
                        });
                    });
                }

                if (afters) {
                    Ext.Object.each(afters, function (key, value) {
                        targetClass.addMember(key, function () {
                            var ret = this.callParent(arguments);
                            mixin[value].apply(this, arguments);
                            return ret;
                        });
                    });
                }

                if (hooks) {
                    for (key in hooks) {
                        Mixin.addHook(hooks[key], targetProto, key, mixin);
                    }
                }

                if (extended) {
                    targetClass.onExtended(function () {
                        var args = Ext.Array.slice(arguments, 0);
                        args.unshift(targetClass);
                        return extended.apply(this, args);
                    }, this);
                }

                if (onClassMixedIn) {
                    onClassMixedIn.apply(this, arguments);
                }
            };
        }
    }
};});
