/**
 * This mixin provides its user with a `responsiveConfig` config that allows the class
 * to conditionally control config properties.
 *
 * For example:
 *
 *      Ext.define('ResponsiveClass', {
 *          mixin: [
 *              'Ext.mixin.Responsive'
 *          ],
 *
 *          responsiveConfig: {
 *              portrait: {
 *              },
 *
 *              landscape: {
 *              }
 *          }
 *      });
 *
 * For details see `{@link #responsiveConfig}`.
 * @since 5.0.0
 */
Ext.define('Ext.mixin.Responsive', function (Responsive) { return {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'responsive',

        after: {
            destroy: 'destroy'
        }
    },

    config: {
        /**
         * @cfg {Object} responsiveConfig
         * This object consists of keys that represent the conditions on which configs
         * will be applied. For example:
         *
         *      responsiveConfig: {
         *          landscape: {
         *              region: 'west'
         *          },
         *          portrait: {
         *              region: 'north'
         *          }
         *      }
         *
         * In this case the keys ("landscape" and "portrait") are the criteria (or "rules")
         * and the object to their right contains the configs that will apply when that
         * rule is true.
         *
         * These rules can be any valid JavaScript expression but the following values
         * are considered in scope:
         *
         *  * `landscape` - True if the device orientation is landscape (always `true` on
         *   desktop devices).
         *  * `portrait` - True if the device orientation is portrait (always `false` on
         *   desktop devices).
         *  * `tall` - True if `width` < `height` regardless of device type.
         *  * `wide` - True if `width` > `height` regardless of device type.
         *  * `width` - The width of the viewport
         *  * `height` - The height of the viewport.
         *  * `platform` - An object containing various booleans describing the platform.
         *
         * A more complex example:
         *
         *      responsiveConfig: {
         *          'width > 800': {
         *              region: 'west'
         *          },
         *          'width <= 800': {
         *              region: 'north'
         *          }
         *      }
         *
         * **NOTE**: If multiple rules set a single config (like above), it is important
         * that the rules be mutually exclusive. That is, only one rule should set each
         * config. If multiple rules are actively setting a single config, the order of
         * these (and therefore the config's value) is unspecified.
         *
         * For a config to participate as a `responsiveConfig` it must have a "setter"
         * method. In the above example, a "setRegion" method must exist.
         */
        responsiveConfig: {
            $value: 0,
            merge:  function (newValue, oldValue, target, mixinClass) {
                if (!newValue) {
                    return oldValue;
                }

                var ret = oldValue ? Ext.Object.chain(oldValue) : {},
                    rule;

                for (rule in newValue) {
                    if (!mixinClass || !(rule in ret)) {
                        ret[rule] = {
                            // fn is created on first evaluation of this rule
                            config: newValue[rule]
                        };
                    }
                }

                return ret;
            }
        }
    },

    /**
     * This method removes this instance from the Responsive collection.
     */
    destroy: function () {
        Responsive.unregister(this);
        this.callParent();
    },

    privates: {
        statics: {
            /**
             * @property {Boolean} active
             * @static
             * @private
             */
            active: false,

            /**
             * @property {Object} all
             * The collection of all `Responsive` instances. These are the instances that
             * will be notified when dynamic conditions change.
             * @static
             * @private
             */
            all: {},

            /**
             * @property {Number} count
             * The number of instances in the `all` collection.
             * @static
             * @private
             */
            count: 0,

            /**
             * @property {Number} nextId
             * The seed value used to assign `Responsive` instances a unique id for keying
             * in the `all` collection.
             * @static
             * @private
             */
            nextId: 0,

            /**
             * @property {String} argNames
             * The names of the arguments to the rule evaluation function created for each
             * key in a `responsiveConfig`.
             * @static
             * @private
             */
            argNames: 'landscape,portrait,tall,wide,height,width,platform',

            /**
             * @property {Object} state
             * This object holds the various state values passed to the rule evaluation
             * functions.
             * @static
             * @private
             */
            state: {
                platform: { // Ext.Microloader.platformTags
                    desktop: true
                }
            },

            /**
             * @property {Array} stateArgs
             * The array of arguments used to invoke rule evaluation functions. These are
             * the same values as `state` but in the order of `argNames`.
             * @static
             * @private
             */
            stateArgs: [],

            /**
             * Activates event listeners for all `Responsive` instances. This method is
             * called when the first instance is registered.
             * @private
             */
            activate: function () {
                Responsive.active = true;
                Responsive.updateState();
                Ext.on('resize', Responsive.onResize, Responsive);
            },

            /**
             * Deactivates event listeners. This method is called when the last instance
             * is destroyed.
             * @private
             */
            deactivate: function () {
                Responsive.active = false;
                Ext.un('resize', Responsive.onResize, Responsive);
            },

            /**
             * Updates all registered the `Responsive` instances (found in the `all`
             * collection).
             * @private
             */
            notify: function () {
                var all = Responsive.all,
                    timer = Responsive.timer,
                    id;

                if (timer) {
                    Responsive.timer = null;
                    Ext.Function.cancelAnimationFrame(timer);
                }

                Responsive.updateState();

                Ext.suspendLayouts();

                for (id in all) {
                    all[id].updateResponsiveState();
                }

                Ext.resumeLayouts(true);
            },

            /**
             * Handler of the window resize event. Schedules a timer so that we eventually
             * call `notify`.
             * @private
             */
            onResize: function () {
                if (!Responsive.timer) {
                    Responsive.timer = Ext.Function.requestAnimationFrame(Responsive.onTimer);
                }
            },

            /**
             * This method is the timer handler. When called this removes the timer and
             * calls `notify`.
             * @private
             */
            onTimer: function () {
                Responsive.timer = null;
                Responsive.notify();
            },

            register: function (responder) {
                var id = responder.$responsiveId;

                if (!id) {
                    responder.$responsiveId = id = ++Responsive.nextId;

                    Responsive.all[id] = responder;

                    if (++Responsive.count === 1) {
                        Responsive.activate();
                    }
                }
            },

            unregister: function (responder) {
                var id = responder.$responsiveId;

                if (id in Responsive.all) {
                    responder.$responsiveId = null;

                    delete Responsive.all[id];

                    if (--Responsive.count === 0) {
                        Responsive.deactivate();
                    }
                }
            },

            /**
             * Updates the `state` object and `stateArgs` array with the current state of
             * the environment.
             * @private
             */
            updateState: function () {
                var argNamesArray = Responsive.argNamesArray,
                    El = Ext.Element,
                    width = El.getViewportWidth(),
                    height = El.getViewportHeight(),
                    state = Responsive.state,
                    stateArgs = Responsive.stateArgs,
                    i;

                if (!argNamesArray) {
                    Responsive.argNamesArray = argNamesArray = Responsive.argNames.split(',');
                }

                state.width = width;
                state.height = height;
                state.tall = width < height;
                state.wide = !state.tall;

                state.landscape = state.portrait = false;

                if (!state.platform.desktop || Ext.supports.OrientationChange) {
                    state[Ext.dom.Element.getOrientation()] = true;
                } else {
                    state.landscape = true;
                }

                for (i = argNamesArray.length; i--; ) {
                    stateArgs[i] = state[argNamesArray[i]];
                }
            }
        }, // private static

        /**
         * This class system hook method is called at the tail end of the mixin process.
         * We need to see if the `targetClass` has already got a `responsiveConfig` and
         * if so, we must add its value to the real config.
         * @param {Ext.Class} targetClass
         * @private
         */
        afterClassMixedIn: function (targetClass) {
            var proto = targetClass.prototype,
                responsiveConfig = proto.responsiveConfig;

            if (responsiveConfig) {
                delete proto.responsiveConfig;
                targetClass.getConfigurator().add({
                    responsiveConfig: responsiveConfig
                });
            }
        },

        // The reason this method exists is so to convince the config system to put
        // the "responsiveConfig" in the initList
        applyResponsiveConfig: function (config) {
            return config;
        },

        /**
         * Evaluates and returns the configs based on the `responsiveConfig`. This
         * method relies on the state being captured by the `updateState` method.
         * @private
         */
        getResponsiveState: function () {
            var rules = this.getResponsiveConfig(),
                stateArgs = Responsive.stateArgs,
                ret = {},
                entry, rule;

            for (rule in rules) {
                entry = rules[rule];

                // Each key in "responsiveConfig" is really just the body of a "return"
                // statement for a Function, so lazily create it:
                if (!entry.fn) {
                    entry.fn = new Function(Responsive.argNames, 'return ' + rule);
                }

                if (entry.fn.apply(this, stateArgs)) {
                    Ext.merge(ret, entry.config);
                }
            }

            return ret;
        },

        /**
         * This config system hook method is called just prior to processing the specified
         * "instanceConfig". This hook returns the instanceConfig that will actually be
         * processed by the config system.
         * @param {Object} config The user-supplied instance config object.
         * @private
         */
        transformInstanceConfig: function (config) {
            var me = this,
                responsiveConfig = config && config.responsiveConfig,
                cfg, ret;

            Responsive.register(me);

            // Since we are called immediately prior to the Configurator looking at the
            // instanceConfig (our "config" argument), that incoming value has not yet
            // been merged on to "this.config". Since we need to call getResponsiveConfig
            // and get all that merged goodness, we have to do this merge here. Good news
            // is that we have a custom merge so we just need to get the Config instance
            // and call it.
            if (responsiveConfig) {
                cfg = me.getConfigurator();
                cfg = cfg.configs.responsiveConfig; // the Ext.Config instance

                // Update "this.config" which is the storage for this instance.
                me.config.responsiveConfig =
                        cfg.merge(responsiveConfig, me.config.responsiveConfig, me);
            }

            // Now we can merge the current responsive state with the incoming config.
            // The responsiveConfig takes priority.
            ret = me.getResponsiveState();
            if (config) {
                ret = Ext.merge({}, config, ret);

                // We don't want this to remain since we've already handled it.
                delete ret.responsiveConfig;
            }

            return ret;
        },

        /**
         * Evaluates and applies the `responsiveConfig` to this instance. This is called
         * by `notify` automatically.
         * @private
         */
        updateResponsiveState: function () {
            var config = this.getResponsiveState();
            this.setConfig(config);
        }
    } // private
}});
