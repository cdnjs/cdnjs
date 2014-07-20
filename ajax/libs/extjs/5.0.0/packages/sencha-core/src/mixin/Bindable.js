/**
 * This class is intended as a mixin for classes that want to provide a "bind" config that
 * connects to a `ViewModel`.
 * @private
 * @since 5.0.0
 */
Ext.define('Ext.mixin.Bindable', {
    mixinId: 'bindable',

    config: {
        /**
         * @cfg {Object} [bind]
         * Setting this config option adds or removes data bindings for other configs.
         * For example, to bind the `title` config:
         *
         *      var panel = Ext.create({
         *          xtype: 'panel',
         *          bind: {
         *              title: 'Hello {user.name}'
         *          }
         *      });
         *
         * To dynamically add bindings:
         *
         *      panel.setBind({
         *          title: 'Greetings {user.name}!'
         *      });
         *
         * To remove bindings:
         *
         *      panel.setBind({
         *          title: null
         *      });
         *
         * The bind expressions are presented to `{@link Ext.app.ViewModel#bind}`. The
         * `ViewModel` instance is determined by `lookupViewModel`.
         */
        bind: {
            $value: null,
            lazy: true
        },

        /**
         * @cfg {String/Object/Ext.app.ViewController} controller
         * A string alias, a configuration object or an instance of a `ViewController` for
         * this container. Sample usage:
         *
         *     Ext.define('MyApp.UserController', {
         *         alias: 'controller.user'
         *     });
         *
         *     Ext.define('UserContainer', {
         *         extend: 'Ext.container.container',
         *         controller: 'user'
         *     });
         *     // Or
         *     Ext.define('UserContainer', {
         *         extend: 'Ext.container.container',
         *         controller: {
         *             type: 'user',
         *             someConfig: true
         *         }
         *     });
         *
         *     // Can also instance at runtime
         *     var ctrl = new MyApp.UserController();
         *     var view = new UserContainer({
         *         controller: ctrl
         *     });
         *
         * @cmd-auto-dependency { aliasPrefix: 'controller.' }
         */
        controller: null,

        /**
         * @cfg {Boolean} defaultListenerScope
         * If `true`, this component will be the default scope (this pointer) for events
         * specified with string names so that the scope can be dynamically resolved. The
         * component will automatically become the defaultListenerScope if a
         * {@link #controller} is specified.
         *
         * See the introductory docs for {@link Ext.container.Container} for some sample
         * usages.
         *
         * **NOTE**: This value can only be reliably set at construction time. Setting it
         * after that time may not correctly rewire all of the potentially effected
         * listeners.
         */
        defaultListenerScope: false,

        /**
         * @cfg {String/String[]/Object} publishes
         * One or more names of config properties that this component should publish to
         * its `ViewModel`. Some components override this and publish their most useful
         * configs by default.
         *
         * This config uses the `{@link #cfg-reference}` to determine the name of the data
         * object to place in the `ViewModel`. If `reference` is not set then this config
         * is ignored.
         *
         * By using this config and `{@link #cfg-reference}` you can bind configs between
         * components. For example:
         *
         *      ...
         *          items: [{
         *              xtype: 'textfield',
         *              reference: 'somefield',  // component's name in the ViewModel
         *              publishes: 'value' // value is not published by default
         *          },{
         *              ...
         *          },{
         *              xtype: 'displayfield',
         *              bind: 'You have entered "{somefield.value}"'
         *          }]
         *      ...
         *
         * Classes must provide this config as an Object:
         *
         *      Ext.define('App.foo.Bar', {
         *          publishes: {
         *              foo: true,
         *              bar: true
         *          }
         *      });
         *
         * This is required for the config system to properly merge values from derived
         * classes.
         *
         * For instances this value can be specified as a value as show above or an array
         * or object as follows:
         *
         *      {
         *          xtype: 'textfield',
         *          reference: 'somefield',
         *          publishes: [
         *              'value',
         *              'rawValue',
         *              'dirty'
         *          ]
         *      }
         *
         *      // This achieves the same result as the above array form.
         *      {
         *          xtype: 'textfield',
         *          reference: 'somefield',
         *          publishes: {
         *              value: true,
         *              rawValue: true,
         *              dirty: true
         *          }
         *      }
         *
         * @since 5.0.0
         */
        publishes: {
            $value: null,
            lazy: true,
            merge: function (newValue, oldValue) {
                return this.mergeSets(newValue, oldValue);
            }
        },

        /**
         * @cfg {String} reference
         * Specifies a name for this component inside its component hierarchy. This name
         * must be unique within its {@link Ext.container.Container#referenceHolder view}
         * or its {@link Ext.app.ViewController ViewController}. See the documentation in
         * {@link Ext.container.Container} for more information about references.
         *
         * **Note**: Valid identifiers start with a letter or underscore and are followed
         * by zero or more additional letters, underscores or digits. References are case
         * sensitive.
         */
        reference: null,

        /**
         * @cfg {Boolean/Object/Ext.data.Session} [session=null]
         * If provided this creates a new `Session` instance for this component. If this
         * is a `Container`, this will then be inherited by all child components.
         *
         * To create a new session you can specify `true`:
         *
         *      Ext.create({
         *          xtype: 'viewport',
         *          session: true,
         *
         *          items: [{
         *              ...
         *          }]
         *      });
         *
         * Alternatively, a config object can be provided:
         *
         *      Ext.create({
         *          xtype: 'viewport',
         *          session: {
         *              ...
         *          },
         *
         *          items: [{
         *              ...
         *          }]
         *      });
         *
         * @cmd-auto-dependency { directRef: 'Ext.data.Session' }
         */
        session: {
            $value: null,
            lazy: true
        },

        /**
         * @cfg {String/String[]/Object} twoWayBindable
         * This object holds a map of `config` properties that will update their binding
         * as they are modified. For example, `value` is a key added by form fields. The
         * form of this config is the same as `{@link #publishes}`.
         *
         * This config is defined so that updaters are not created and added for all
         * bound properties since most cannot be modified by the end-user and hence are
         * not appropriate for two-way binding.
         * @private
         */
        twoWayBindable: {
            $value: null,
            lazy: true,
            merge: function (newValue, oldValue) {
                return this.mergeSets(newValue, oldValue);
            }
        },

        /**
         * @cfg {String/Object/Ext.app.ViewModel} viewModel
         * The `ViewModel` is a data provider for this component and its children. The
         * data contained in the `ViewModel` is typically used by adding `bind` configs
         * to the components that want present or edit this data.
         *
         * When set, the `ViewModel` is created and links to any inherited `viewModel`
         * instance from an ancestor container as the "parent". The `ViewModel` hierarchy,
         * once established, only supports creation or destruction of children. The
         * parent of a `ViewModel` cannot be changed on the fly.
         *
         * If this is a root-level `ViewModel`, the data model connection is made to this
         * component's associated `{@link Ext.data.Session Data Session}`. This is
         * determined by calling `getInheritedSession`.
         *
         * @cmd-auto-dependency { aliasPrefix: 'viewmodel.' }
         */
        viewModel: {
            $value: null,
            lazy: true
        }
    },

    /**
     * @property {String} [defaultBindProperty]
     * This property is used to determine the property of a `bind` config that is just
     * the value. For example, if `defaultBindProperty="value"`, then this shorthand
     * `bind` config:
     *
     *      bind: '{name}'
     *
     * Is equivalent to this object form:
     *
     *      bind: {
     *          value: '{name}'
     *      }
     *
     * The `defaultBindProperty` is set to "value" for form fields and to "store" for
     * grids and trees.
     * @protected
     */
    defaultBindProperty: null,

    /**
     * @property {RegExp}
     * Regular expression used for validating `reference` values.
     * @private
     */
    validRefRe: /^[a-z_][a-z0-9_]*$/i,

    /**
     * Called by `getInherited` to initialize the inheritedState the first time it is
     * requested.
     * @protected
     */
    initInheritedState: function (inheritedState) {
        var me = this,
            reference = me.getReference(),
            controller = me.getController(),
            // Don't instantiate the view model here, we only need to know that
            // it exists
            viewModel = me.getConfig('viewModel', true),
            session = me.getConfig('session', true);

        if (controller) {
            inheritedState.defaultListenerScope = controller;
        } else if (me.defaultListenerScope || me._defaultListenerScope) {
            inheritedState.defaultListenerScope = me;
        }

        if (viewModel) {
            // If we're not configured with an instance, just stamp the current component as
            // the thing that holds the view model. When we ask to get the inherited view model,
            // we will know that it's not an instance yet so we need to spin it up on this component.
            // We need to initialize them from top-down, but we don't want to do it up front.
            if (!viewModel.isViewModel) {
                viewModel = me;
            }
            inheritedState.viewModel = viewModel;
        }

        // Same checks as the view model
        if (session) {
            if (!session.isSession) {
                session = me;
            }
            inheritedState.session = session;
        }

        if (reference) {
            me.referenceKey = (inheritedState.referencePath || '') + reference;
            me.viewModelKey = (inheritedState.viewModelPath || '') + reference;
        }
    },

    /**
     * Returns the `Ext.data.Session` for this instance. This property may come
     * from this instance's `{@link #session}` or be inherited from this object's parent.
     * @param {Boolean} [skipThis=false] Pass `true` to ignore a `session` configured on
     * this instance and only consider an inherited session.
     * @return {Ext.data.Session}
     * @since 5.0.0
     */
    lookupSession: function (skipThis) {
        // See lookupViewModel
        var ret = skipThis ? null : this.getSession(); // may be the initGetter!
        if (!ret) {
            ret = this.getInheritedConfig('session', skipThis);
            if (ret && !ret.isSession) {
                ret = ret.getInherited().session = ret.getSession();
            }
        }

        return ret || null;
    },

    /**
     * Returns the `Ext.app.ViewModel` for this instance. This property may come from this
     * this instance's `{@link #viewModel}` or be inherited from this object's parent.
     * @param {Boolean} [skipThis=false] Pass `true` to ignore a `viewModel` configured on
     * this instance and only consider an inherited view model.
     * @return {Ext.app.ViewModel}
     * @since 5.0.0
     */
    lookupViewModel: function (skipThis) {
        var ret = skipThis ? null : this.getViewModel(); // may be the initGetter!

        if (!ret) {
            ret = this.getInheritedConfig('viewModel', skipThis);
            // If what we get back is a component, it means the component was configured
            // with a view model, however the construction of it has been delayed until
            // we need it. As such, go and construct it and store it on the inherited state.
            if (ret && !ret.isViewModel) {
                ret = ret.getInherited().viewModel = ret.getViewModel();
            }
        }

        return ret || null;
    },

    /**
     * Publish this components state to the `ViewModel`. If no arguments are given (or if
     * this is the first call), the entire state is published. This state is determined by
     * the `publishedConfigs` property.
     *
     * This method is called only by component authors.
     *
     * @param {String} [property] The name of the property to update.
     * @param {Object} [value] The value of `property`. Only needed if `property` is given.
     * @protected
     * @since 5.0.0
     */
    publishState: function (property, value) {
        var me = this,
            path = me.viewModelKey,
            state = me.publishedState,
            binds = me.getBind(),
            binding = binds && property && binds[property],
            count = 0,
            name, publishes, vm;

        if (binding && !binding.syncing && !binding.isReadOnly()) {
            binding.setValue(value);
        }

        if (!path || !(publishes = me.getPublishes())) {
            return;
        }

        if (!(vm = me.lookupViewModel())) {
            return;
        }

        if (property && state) {
            if (!publishes[property]) {
                return;
            }

            // If we are setting an individual property and that is not a {} or a [] then
            // check to see if it is unchanged.
            if (!(value && value.constructor === Object) && !(value instanceof Array)) {
                if (state[property] === value) {
                    return;
                }
            }
            path += '.';
            path += property;
        } else {
            state = state || (me.publishedState = {});

            for (name in publishes) {
                ++count;
                // If there are no properties to publish this loop will not run and the
                // value = null above will remain.
                if (name === property) {
                    state[name] = value;
                } else {
                    state[name] = me[name];
                }
            }

            if (!count) { // if (no properties were put in "state")
                return;
            }
            value = state;
        }

        vm.set(path, value);
    },

    //=========================================================================

    privates: {
        /**
         * Ensures that the given property (if it is a Config System config) has a proper
         * "updater" method on this instance to sync changes to the config.
         * @param {String} property The name of the config property.
         * @private
         * @since 5.0.0
         */
        addBindableUpdater: function (property) {
            var me = this,
                configs = me.self.$config.configs,
                cfg = configs[property],
                updateName;

            // While we store the updater on this instance, the function is cached and
            // re-used across all instances.
            if (cfg && !me.hasOwnProperty(updateName = cfg.names.update)) {
                me[updateName] = cfg.bindableUpdater ||
                                (cfg.root.bindableUpdater = me.makeBindableUpdater(cfg));
            }
        },

        /**
         * @param {String/Object} binds
         * @param {Object} currentBindings
         * @return {Object}
         * @private
         * @since 5.0.0
         */
        applyBind: function (binds, currentBindings) {
            var me = this,
                viewModel = me.lookupViewModel(),
                twoWayable = me.getTwoWayBindable(),
                getBindTemplateScope = me._getBindTemplateScope,
                b, property, descriptor;

            if (!currentBindings || typeof currentBindings === 'string') {
                currentBindings = {};
            }

            //<debug>
            if (!viewModel) {
                Ext.Error.raise('Cannot use bind config without a viewModel');
            }
            //</debug>

            if (Ext.isString(binds)) {
                //<debug>
                if (!me.defaultBindProperty) {
                    Ext.Error.raise(me.$className + ' has no defaultBindProperty - '+
                                    'Please specify a bind object');
                }
                //</debug>

                b = binds;
                binds = {};
                binds[me.defaultBindProperty] = b;
            }

            for (property in binds) {
                descriptor = binds[property];
                b = currentBindings[property];

                if (b && typeof b !== 'string') {
                    b.destroy();
                    b = null;
                }

                if (descriptor) {
                    b = viewModel.bind(descriptor, me.onBindNotify, me);
                    b._config = Ext.Config.get(property);
                    b.getTemplateScope = getBindTemplateScope;

                    //<debug>
                    if (!me[b._config.names.set]) {
                        Ext.Error.raise('Cannot bind ' + property + ' on ' + me.$className +
                                        ' - missing a ' + b._config.names.set + ' method.');
                    }
                    //</debug>
                }

                currentBindings[property] = b;
                if (twoWayable && twoWayable[property] && !b.isReadOnly()) {
                    me.addBindableUpdater(property);
                }
            }

            return currentBindings;
        },

        applyController: function (controller) {
            controller = Ext.Factory.controller(controller);
            controller.setView(this);
            return controller;
        },

        applyPublishes: function (all) {
            if (this.lookupViewModel()) {
                for (var property in all) {
                    this.addBindableUpdater(property);
                }
            }

            return all;
        },

        //<debug>
        applyReference: function (reference) {
            var validIdRe = this.validRefRe || Ext.validIdRe;
            if (reference && !validIdRe.test(reference)) {
                Ext.Error.raise('Invalid reference "' + reference + '" for ' + this.getId() +
                                ' - not a valid identifier');
            }
            return reference;
        },
        //</debug>

        /**
         * Transforms a Session config to a proper instance.
         * @param {Object} session
         * @return {Ext.data.Session}
         * @private
         * @since 5.0.0
         */
        applySession: function (session) {
            if (!session) {
                return null;
            }

            if (!session.isSession) {
                var parentSession = this.lookupSession(true), // skip this component
                    config = (session === true) ? {} : session;

                if (parentSession) {
                    session = parentSession.spawn(config);
                } else {
                    // Mask this use of Session from Cmd - the dependency is not ours but
                    // the caller
                    session = new Ext.data['Session'](config);
                }
            }

            return session;
        },

        /**
         * Transforms a ViewModel config to a proper instance.
         * @param {String/Object/Ext.app.ViewModel} viewModel
         * @return {Ext.app.ViewModel}
         * @private
         * @since 5.0.0
         */
        applyViewModel: function (viewModel) {
            var me = this,
                config, session;

            if (!(viewModel && viewModel.isViewModel)) {
                config = {
                    parent: me.lookupViewModel(true) // skip this component
                };

                config.session = me.getSession();
                if (!session && !config.parent) {
                    config.session = me.lookupSession();
                }

                if (viewModel) {
                    if (viewModel.constructor === Object) {
                        Ext.apply(config, viewModel);
                    } else if (typeof viewModel === 'string') {
                        config.type = viewModel;
                    }
                }

                viewModel = Ext.Factory.viewModel(config);
            }
            return viewModel;
        },

        _getBindTemplateScope: function () {
            // This method is called as a method on a Binding instance, so the "this" pointer
            // is that of the Binding. The "scope" of the Binding is the component owning it.
            return this.scope.resolveListenerScope();
        },

        /**
         * This method triggers the lazy configs and must be called when it is time to
         * fully boot up. The configs that must be initialized are: `bind`, `publishes`,
         * `session`, `twoWayBindable` and `viewModel`.
         * @private
         * @since 5.0.0
         */
        initBindable: function () {
            this.initBindable = Ext.emptyFn;
            this.getBind();
            this.getPublishes();

            // If we have binds, the applyBind method will call getTwoWayBindable to ensure
            // we have the necessary updaters. If we have no binds then applyBind will not
            // be called and we will ignore our twoWayBindable config (which is fine).
            //
            // If we have publishes or binds then the viewModel will be requested. If not
            // this viewModel will be lazily requested by a descendant via inheritedState
            // or not at all. If there is no descendant using bind or publishes, then the
            // viewModel will sit and wait.
            //
            // As goes the fate of the viewModel so goes the fate of the session. If we
            // have requested the viewModel then the session will also be spun up. If not,
            // we wait for a descendant or the user to request them.
        },

        /**
         * Returns an `update` method for the given Config that will call `{@link #publishState}`
         * to ensure two-way bindings (via `bind`) as well as any `publishes` are updated.
         * This method is cached on the `cfg` instance for re-use.
         * @param {Ext.Config} cfg
         * @return {Function} The updater function.
         * @private
         * @since 5.0.0
         */
        makeBindableUpdater: function (cfg) {
            var updateName = cfg.names.update;

            return function (newValue, oldValue) {
                var me = this,
                    updater = me.self.prototype[updateName];

                if (updater) {
                    updater.call(me, newValue, oldValue);
                }

                me.publishState(cfg.name, newValue);
            };
        },

        onBindNotify: function (value, oldValue, binding) {
            binding.syncing = (binding.syncing + 1) || 1;

            this[binding._config.names.set](value);

            --binding.syncing;
        },

        removeBindings: function() {
            var bindings = this.bind,
                key, binding;

            if (bindings && typeof bindings !== 'string') {
                for (key in bindings) {
                    binding = bindings[key];
                    binding.destroy();
                    binding._config = binding.getTemplateScope = null;
                }
            }
            this.bind = null;
        },

        /**
         * Updates the session config.
         * @param {Ext.data.Session} session
         * @private
         * @since 5.0.0
         */
        updateSession: function (session) {
            var state = this.getInherited();

            if (session) {
                state.session = session;
            } else {
                delete state.session;
            }
        },

        /**
         * Updates the viewModel config.
         * @param {Ext.app.ViewModel} viewModel
         * @private
         * @since 5.0.0
         */
        updateViewModel: function (viewModel) {
            var state = this.getInherited(),
                controller = this.getController();

            if (viewModel) {
                state.viewModel = viewModel;
                viewModel.setView(this);
                if (controller) {
                    controller.initViewModel(viewModel);
                }
            } else {
                delete state.viewModel;
            }
        }
    } // private
});
