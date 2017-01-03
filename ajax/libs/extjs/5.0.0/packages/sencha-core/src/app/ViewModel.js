/**
 * This class manages arbitrary data and its relationship to data models. Instances of
 * `ViewModel` are associated with some `Component` and then used by their child items
 * for the purposes of Data Binding.
 * 
 * # Binding
 * 
 * The most commonly used aspect of a `ViewModel` is the `bind` method. This method takes
 * a "bind descriptor" (see below) and a callback to call when the data indicated by the
 * bind descriptor either becomes available or changes.
 *
 * The `bind` method, based on the bind descriptor given, will return different types of
 * "binding" objects. These objects maintain the connection between the requested data and
 * the callback. Bindings ultimately derive from `{@link Ext.app.bind.BaseBinding}`
 * which provides several methods to help manage the binding.
 *
 * Perhaps the most important method is `destroy`. When the binding is no longer needed
 * it is important to remember to `destroy` it. Leaking bindings can cause performance
 * problems or worse when callbacks are called at unexpected times.
 *
 * The types of bindings produced by `bind` are:
 *
 *   * `{@link Ext.app.bind.Binding}`
 *   * `{@link Ext.app.bind.Multi}`
 *   * `{@link Ext.app.bind.TemplateBinding}`
 *
 * ## Bind Descriptors
 * 
 * A "bind descriptor" is a value (a String, an Object or an array of these) that describe
 * the desired data. Any piece of data in the `ViewModel` can be described by a bind
 * descriptor.
 * 
 * ### Textual Bind Descriptors
 * 
 * The simplest and most common form of bind descriptors are strings that look like an
 * `Ext.Template` containing text and tokens surrounded by "{}" with dot notation inside
 * to traverse objects and their properties.
 * 
 * For example:
 * 
 *   * `'Hello {user.name}!'`
 *   * `'You have selected "{selectedItem.text}".'`
 *   * `'{user.groups}'`
 *
 * The first two bindings are `{@link Ext.app.bind.TemplateBinding template bindings}`
 * which use the familiar `Ext.Template` syntax with some slight differences. For more on
 * templates see `{@link Ext.app.bind.Template}`.
 *
 * The third bind descriptor is called a "direct bind descriptor". This special form of
 * bind maps one-to-one to some piece of data in the `ViewModel` and is managed by the
 * `{@link Ext.app.bind.Binding}` class.
 *
 * #### Two-Way Descriptors
 *
 * A direct bind descriptor may be able to write back a value to the `ViewModel` as well
 * as retrieve one. When this is the case, they are said to be "two-way". For example:
 *
 *      var binding = viewModel.bind('{s}', function(x) { console.log('s=' + s); });
 *
 *      binding.setValue('abc');
 *
 * Direct use of `ViewModel` in this way is not commonly needed because `Ext.Component`
 * automates this process. For example, a `textfield` component understands when it is
 * given a "two-way" binding and automatically synchronizes its value bidirectionally using
 * the above technique. For example:
 *
 *      Ext.widget({
 *          items: [{
 *              xtype: 'textfield',
 *              bind: '{s}'  // a two-way / direct bind descriptor
 *          }]
 *      });
 *
 * ### Object and Array Descriptors / Multi-Bind
 *
 * With two exceptions (see below) an Object is interpreted as a "shape" to produce by
 * treating each of its properties as individual bind descriptors. An object of the same
 * shape is passed as the value of the bind except that each property is populated with
 * the appropriate value. Of course, this definition is recursive, so these properties
 * may also be objects.
 *
 * For example:
 *
 *      viewModel.bind({
 *              x: '{x}',
 *              foo: {
 *                  bar: 'Hello {foo.bar}'
 *              }
 *          },
 *          function (obj) {
 *              //  obj = {
 *              //      x: 42,
 *              //      foo: {
 *              //          bar: 'Hello foobar'
 *              //      }
 *              //  }
 *          });
 *
 * Arrays are handled in the same way. Each element of the array is considered a bind
 * descriptor (recursively) and the value produced for the binding is an array with each
 * element set to the bound property.
 *
 * ### Bind Options
 *
 * One exception to the "object is a multi-bind" rule is when that object contains a
 * `bindTo` property. When an object contains a `bindTo` property the object is understood
 * to contain bind options and the value of `bindTo` is considered the actual bind
 * descriptor.
 *
 * For example:
 *
 *      viewModel.bind({
 *              bindTo: '{x}',
 *              single: true
 *          },
 *          function (x) {
 *              console.log('x: ' + x); // only called once
 *          });
 *
 * The available bind options depend on the type of binding, but since all bindings
 * derive from `{@link Ext.app.bind.BaseBinding}` its options are always applicable.
 * For a list of the other types of bindings, see above.
 *
 * #### Deep Binding
 *
 * When a direct bind is made and the bound property is an object, by default the binding
 * callback is only called when that reference changes. This is the most efficient way to
 * understand a bind of this type, but sometimes you may need to be notified if any of the
 * properties of that object change.
 *
 * To do this, we create a "deep bind":
 *
 *      viewModel.bind({
 *              bindTo: '{someObject}',
 *              deep: true
 *          },
 *          function (someObject) {
 *              // called when reference changes or *any* property changes
 *          });
 *
 * #### Binding Timings
 *
 * The `ViewModel` has a {@link #scheduler} attached that is used to coordinate the firing of bindings.
 * It serves 2 main purposes:
 * - To coordinate dependencies between bindings. This means bindings will be fired in an order such that
 * the any dependencies for a binding are fired before the binding itself.
 * - To batch binding firings. The scheduler runs on a short timer, so the following code will only trigger
 * a single binding (the last), the changes in between will never be triggered.
 * 
 *     viewModel.bind('{val}', function(v) {
 *         console.log(v);
 *     });
 *     viewModel.set('val', 1);
 *     viewModel.set('val', 2);
 *     viewModel.set('val', 3);
 *     viewModel.set('val', 4);
 *
 * The `ViewModel` can be forced to process by calling `{@link #notify}`, which will force the
 * scheduler to run immediately in the current state.
 * 
 *     viewModel.bind('{val}', function(v) {
 *         console.log(v);
 *     });
 *     viewModel.set('val', 1);
 *     viewModel.notify();
 *     viewModel.set('val', 2);
 *     viewModel.notify();
 *     viewModel.set('val', 3);
 *     viewModel.notify();
 *     viewModel.set('val', 4);
 *     viewModel.notify();
 *  
 *
 * #### Models, Stores and Associations
 *
 * A {@link Ext.data.Session `Session`} manages model instances and their associations. 
 * The `ViewModel` may be used with or without a `Session`. When a `Session` is attached, the
 * `ViewModel` will always consult the `Session` to ask about records and stores. The `Session`
 * ensures that only a single instance of each model Type/Id combination is created. This is 
 * important when tracking changes in models so that we always have the same reference.
 *
 * A `ViewModel` provides functionality to easily consume the built in data package types
 * {@link Ext.data.Model} and {@link Ext.data.Store}, as well as their associations.
 *
 * ### Model Links
 *
 * A model can be described declaratively using a {@link #links `link`}. In the example code below,
 * We ask the `ViewModel` to construct a record of type `User` with `id: 17`. The model will be loaded
 * from the server and the bindings will trigger once the load has completed. Similarly, we could also
 * attach a model instance to the `ViewModel` data directly.
 *
 *     Ext.define('MyApp.model.User', {
 *         extend: 'Ext.data.Model',
 *         fields: ['name']
 *     });
 *     
 *     var rec = new MyApp.model.User({
 *         id: 12,
 *         name: 'Foo'
 *     });
 *     
 *     var viewModel new Ext.app.ViewModel({
 *         links: {
 *             theUser: {
 *                 reference: 'User',
 *                 id: 17
 *             }
 *         },
 *         data: {
 *             otherUser: rec
 *         }
 *     });
 *     viewModel.bind('{theUser.name}', function(v) {
 *         console.log(v);
 *     });
 *     viewModel.bind('{otherUser.name}', function(v) {
 *         console.log(v);
 *     });
 *
 * ### Model Fields
 *
 * Bindings have the functionality to inspect the parent values and resolve the underlying
 * value dynamically. This behavior allows model fields to be interrogated as part of a binding.
 *
 *     Ext.define('MyApp.model.User', {
 *         extend: 'Ext.data.Model',
 *         fields: ['name', 'age']
 *     });
 *
 *     var viewModel = new Ext.app.ViewModel({
 *         links: {
 *             theUser: {
 *                 reference: 'User',
 *                 type: 22
 *             }
 *         }
 *     });
 *
 *     // Server responds with:
 *     {
 *         "id": 22,
 *         "name": "Foo",
 *         "age": 100
 *     }
 *
 *     viewModel.bind('Hello {name}, you are {age} years old', function(v) {
 *         console.log(v);
 *     });
 *
 * ### Associations
 *
 * In the same way as fields, the bindings can also traverse associations in a bind statement.
 * The `ViewModel` will handle the asynchronous loading of data and only present the value once
 * the full path has been loaded. For more information on associations see {@link Ext.data.schema.OneToOne OneToOne} and
 * {@link Ext.data.schema.ManyToOne ManyToOne} associations.
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: ['name']
 *     });
 *
 *     Ext.define('Order', {
 *         extend: 'Ext.data.Model',
 *         fields: ['date', {
 *             name: 'userId',
 *             reference: 'User'
 *         }]
 *     });
 *
 *     Ext.define('OrderItem', {
 *         extend: 'Ext.data.Model',
 *         fields: ['price', 'qty', {
 *             name: 'orderId',
 *             reference: 'Order'
 *         }]
 *     });
 *
 *     var viewModel = new Ext.app.ViewModel({
 *         links: {
 *             orderItem: {
 *                 reference: 'OrderItem',
 *                 id: 13
 *             }
 *         }
 *     });
 *     // The viewmodel will handle both ways of loading the data:
 *     // a) If the data is loaded inline in a nested fashion it will
 *     //    not make requests for extra data
 *     // b) Only loading a single model at a time. So the Order will be loaded once
 *     //    the OrderItem returns. The User will be loaded once the Order loads.
 *     viewModel.bind('{orderItem.order.user.name}', function(name) {
 *         console.log(name);
 *     });
 *
 * ### Stores
 *
 * Stores can be created as part of the `ViewModel` definition. The definitions are processed
 * like bindings which allows for very powerful dynamic functionality.
 *
 *     var viewModel = new Ext.app.ViewModel({
 *         stores: {
 *             users: {
 *                 model: 'User',
 *                 autoLoad: true,
 *                 filters: [{
 *                     property: 'createdDate',
 *                     value: '{createdFilter}',
 *                     operator: '>'
 *                 }]
 *             }
 *         }
 *     });
 *     // Later on in our code, we set the date so that the store is created.
 *     viewModel.set('createdFilter', Ext.Date.subtract(new Date(), Ext.Date.DAY, 7));
 *
 * See {@link #stores} for more detail.
 *
 * #### Formulas
 *
 * Formulas allow for calculated `ViewModel` data values. The dependencies for these formulas
 * are automatically determined so that the formula will not be processed until the required
 * data is present.
 *
 *    var viewModel = new Ext.app.ViewModel({
 *        formulas: {
 *            fullName: function(get) {
 *                return get('firstName') + ' ' + get('lastName');
 *            }
 *        },
 *        data: {firstName: 'John', lastName: 'Smith'}
 *    });
 *
 *    viewModel.bind('{fullName}', function(v) {
 *        console.log(v);
 *    });
 *
 * See {@link #formulas} for more detail.
 */
Ext.define('Ext.app.ViewModel', {
    mixins: [
        'Ext.mixin.Factoryable',
        'Ext.mixin.Identifiable'
    ],

    requires: [
        'Ext.util.Scheduler',
        'Ext.data.Session',
        'Ext.app.bind.RootStub',
        'Ext.app.bind.LinkStub',
        'Ext.app.bind.Multi',
        'Ext.app.bind.Formula',
        'Ext.app.bind.TemplateBinding',
        // TODO: this is an injected dependency in onStoreBind, need to define so 
        // cmd can detect it
        'Ext.data.ChainedStore'
    ],

    alias: 'viewmodel.default', // also configures Factoryable

    isViewModel: true,

    factoryConfig: {
        name: 'viewModel'
    },

    destroyed: false,

    expressionRe: /^(?:\{[!]?(?:(\d+)|([a-z_][\w\-\.]*))\})$/i,

    $configStrict: false, // allow "formulas" to be specified on derived class body
    config: {
        /**
         * @cfg {Object} data
         * This object holds the arbitrary data that populates the `ViewModel` and is
         * then available for binding.
         * @since 5.0.0
         */
        data: true,

        /**
         * @cfg {Object} formulas
         * An object that defines named values whose value is managed by function calls.
         * The names of the properties of this object are assigned as values in the
         * ViewModel.
         *
         * For example:
         *
         *      formulas: {
         *          xy: function (get) { return get('x') * get('y'); }
         *      }
         *
         * For more details about defining a formula, see `{@link Ext.app.bind.Formula}`.
         * @since 5.0.0
         */
        formulas: {
            $value: null,
            merge: function (newValue, currentValue, target, mixinClass) {
                var ret, key;

                if (!currentValue) {
                    ret = newValue;
                } else if (!newValue) {
                    ret = currentValue;
                } else {
                    ret = Ext.apply({}, currentValue);

                    for (key in newValue) {
                        if (!mixinClass || !ret[key]) {
                            ret[key] = newValue[key];
                        }
                    }
                }
                return ret;
            }
        },

        /**
         * @cfg {Object} links
         * Links provide a way to assign a simple name to a more complex bind. The primary
         * use for this is to assign names to records in the data model.
         *
         *      links: {
         *          theUser: {
         *              reference: 'User',
         *              id: 12
         *          }
         *      }
         *
         * While that is the typical use, the value of each property in `links` may also be
         * a bind descriptor (see `{@link #method-bind}` for the various forms of bind
         * descriptors).
         * @since 5.0.0
         */
        links: null,

        /**
         * @cfg {Ext.app.ViewModel} parent
         * The parent `ViewModel` of this `ViewModel`. Once set, this cannot be changed.
         * @readonly
         * @since 5.0.0
         */
        parent: null,

        /**
         * @cfg {Ext.app.bind.RootStub} root
         * A reference to the root "stub" (an object that manages bindings).
         * @private
         * @since 5.0.0
         */
        root: true,

        /**
         * @cfg {Ext.util.Scheduler} scheduler
         * The scheduler used to schedule and manage the delivery of notifications for
         * all connections to this `ViewModel` and any other attached to it. The normal
         * process to initialize the `scheduler` is to get the scheduler used by the
         * `parent` or `session` and failing either of those, create one.
         * @readonly
         * @private
         * @since 5.0.0
         */
        scheduler: null,

        /**
         * @cfg {String/Ext.data.schema.Schema} schema
         * The schema to use for getting information about entities.
         */
        schema: 'default',

        /**
         * @cfg {Ext.data.Session} session
         * The session used to manage the data model (records and stores).
         * @since 5.0.0
         */
        session: null,

        /**
         * @cfg {Object} stores
         * A declaration of `Ext.data.Store` configurations that are first processed as
         * binds to produce an effective store configuration.
         *
         * A simple store definition. We can reference this in our bind statements using the
         * `{users}` as we would with other data values.
         *
         *     new Ext.app.ViewModel({
         *         stores: {
         *             users: {
         *                 model: 'User',
         *                 autoLoad: true
         *             }
         *         }
         *     });
         *
         * This store definition contains a dynamic binding. The store will not be created until
         * the initial value for groupId is set. Once that occurs, the store is created with the appropriate
         * filter configuration. Subsequently, once we change the group value, the old filter will be
         * overwritten with the new value.
         *
         *     var viewModel = new Ext.app.ViewModel({
         *         stores: {
         *             users: {
         *                 model: 'User',
         *                 filters: [{
         *                     property: 'groupId',
         *                     value: '{groupId}'
         *                 }]
         *             }
         *         }
         *     });
         *     viewModel.set('groupId', 1); // This will trigger the store creation with the filter.
         *     viewModel.set('groupId', 2); // The filter value will be changed.
         *
         * This store uses {@link Ext.data.ChainedStore store chaining} to create a store backed by the
         * data in another store. By specifying a string as the store, it will bind our creation and backing
         * to the other store. This functionality is especially useful when wanting to display a different "view"
         * of a store, for example a different sort order or different filters.
         *
         *     var viewModel = new Ext.app.ViewModel({
         *         stores: {
         *             allUsers: {
         *                 model: 'User',
         *                 autoLoad: true
         *             },
         *             children: {
         *                 source: '{allUsers}',
         *                 filters: [{
         *                     property: 'age',
         *                     value: 18,
         *                     operator: '<'
         *                 }]
         *             }
         *         }
         *     });
         *
         * @since 5.0.0
         */
        stores: null,

        /**
         * @cfg {Ext.container.Container} view
         * The Container that owns this `ViewModel` instance.
         * @since 5.0.0
         */
        view: null
    },

    constructor: function (config) {
        this.hadValue = {};
        /*
         *  me.data = {
         *      foo: {
         *      },
         *          
         *      selectedUser: {
         *          name: null
         *      },
         *  }
         *
         *  me.root = new Ext.app.bind.RootStub({
         *      children: {
         *          foo: new Ext.app.bind.Stub(),
         *          selectedUser: new Ext.app.bind.LinkStub({
         *              binding: session.bind(...),
         *              children: {
         *                  name: : new Ext.app.bind.Stub()
         *              }
         *          }),
         *      }
         *  })
         */

        this.initConfig(config);
    },

    destroy: function () {
        var me = this,
            scheduler = me._scheduler,
            stores = me.storeInfo,
            parent = me.getParent(),
            key, store, autoDestroy;

        me.destroy = Ext.emptyFn;

        if (stores) {
            for (key in stores) {
                store = stores[key];
                autoDestroy = store.autoDestroy;
                if (autoDestroy || (!store.$wasInstance && autoDestroy !== false)) {
                    store.destroy();
                }
                Ext.destroy(store.$binding);
            }
        }

        if (parent) {
            parent.unregisterChild(me);
        }

        me.getRoot().destroy();

        if (scheduler && scheduler.$owner === me) {
            scheduler.$owner = null;
            scheduler.destroy();
        }

        me.hadValue = me.children = me.storeInfo = me._session = me._view = me._scheduler =
                      me._root = me._parent = me.formulaFn = me.$formulaData = null;
    },

    /**
     * This method requests that data in this `ViewModel` be delivered to the specified
     * `callback`. The data desired is given in a "bind descriptor" which is the first
     * argument.
     *
     * @param {String/Object/Array} descriptor The bind descriptor. See class description
     * for details.
     * @param {Function} callback The function to call with the value of the bound property.
     * @param {Object} [scope] The scope (`this` pointer) for the callback.
     * @param {Object} [options]
     * @return {Ext.app.bind.BaseBinding/Ext.app.bind.Binding} The binding.
     */
    bind: function (descriptor, callback, scope, options) {
        var me = this,
            binding;

        scope = scope || me;

        if (!options && descriptor.bindTo !== undefined && !Ext.isString(descriptor)) {
            options = descriptor;
            descriptor = options.bindTo;
        }

        if (!Ext.isString(descriptor)) {
            binding = new Ext.app.bind.Multi(descriptor, me, callback, scope, options);
        }
        else if (me.expressionRe.test(descriptor)) {
            // If we have '{foo}' alone it is a literal
            descriptor = descriptor.substring(1, descriptor.length - 1);
            binding = me.bindExpression(descriptor, callback, scope, options);
        }
        else {
            binding = new Ext.app.bind.TemplateBinding(descriptor, me, callback, scope, options);
        }

        return binding;
    },

    /**
     * Gets the session attached to this (or a parent) ViewModel. See the {@link #session} configuration.
     * @return {Ext.data.Session} The session. `null` if no session exists.
     */
    getSession: function () {
        var me = this,
            session = me._session,
            parent;

        if (!session && (parent = me.getParent())) {
            me.setSession(session = parent.getSession());
        }

        return session || null;
    },
    
    /**
     * Gets a store configured via the {@link #stores} configuration.
     * @param {String} key The name of the store.
     * @return {Ext.data.Store} The store. `null` if no store exists.
     */
    getStore: function(key) {
        var storeInfo = this.storeInfo,
            store;
        
        if (storeInfo) {
            store = storeInfo[key];
        }
        return store || null;
    },

    /**
     * Create a link to a reference. See the {@link #links} configuration.
     * @param {String} key The name for the link.
     * @param {Object} reference The reference descriptor.
     */
    linkTo: function (key, reference) {
        var me = this,
            stub = me.getStub(key),
            modelType, linkStub;

        //<debug>
        if (stub.depth - me.getRoot().depth > 1) {
            Ext.Error.raise('Links can only be at the top-level: "' + key + '"');
        }
        //</debug>

        if (reference.isModel) {
            reference = {
                reference: reference.entityName,
                id: reference.id
            };
        }
        modelType = reference.reference;
        if (modelType) {
            // It's a record
            stub.set(me.getRecord(modelType, reference.id));
        } else {
            if (!stub.isLinkStub) {
                // Pass parent=null since we will graft in this new stub to replace us:
                linkStub = new Ext.app.bind.LinkStub(me, stub.name);
                stub.graft(linkStub);
                stub = linkStub;
            }
            stub.link(reference);
        }
    },


    notify: function () {
        this.getScheduler().notify();
    },

    /**
     * Get a value from the data for this viewmodel.
     * @param {String} path The path of the data to retrieve.
     *
     *    var value = vm.get('theUser.address.city');
     *
     * @return {Object} The data stored at the passed path.
     */
    get: function(path) {
        return this.getStub(path).getValue();
    },

    /**
     * Set  a value in the data for this viewmodel.
     * @param {Object/String} path The path of the value to set, or an object literal to set
     * at the root of the viewmodel.
     * @param {Object} The data to set at the value. If the value is an object literal,
     * any required paths will be created.
     *
     *    // Set a single property at the root level
     *    viewModel.set('expiry', Ext.Date.add(new Date(), Ext.Date.DAY, 7));
     *    console.log(viewModel.get('expiry'));
     *    // Sets a single property in user.address, does not overwrite any hierarchy.
     *    viewModel.set('user.address.city', 'London');
     *    console.log(viewModel.get('user.address.city'));
     *    // Sets 2 properties of "user". Overwrites any existing hierarchy.
     *    viewModel.set('user', {firstName: 'Foo', lastName: 'Bar'});
     *    console.log(viewModel.get('user.firstName'));
     *    // Sets a single property at the root level. Overwrites any existing hierarchy.
     *    viewModel.set({rootKey: 1});
     *    console.log(viewModel.get('rootKey'));
     */
    set: function (path, value) {
        var me = this,
            obj, stub;

        // Force data creation
        me.getData();

        if (value === undefined && path && path.constructor === Object) {
            stub = me.getRoot();
            value = path;
        } else if (path && path.indexOf('.') < 0) {
            obj = {};
            obj[path] = value;
            value = obj;
            stub = me.getRoot();
        } else {
            stub = me.getStub(path);
        }

        stub.set(value);
    },

    //=========================================================================
    privates: {
        registerChild: function(child) {
            var children = this.children;
            if (!children) {
                this.children = children = {};
            }
            children[child.getId()] = child;
        },
        
        unregisterChild: function(child) {
            var children = this.children;
            if (children) {
                delete children[child.getId()];
            }
        },

        /**
         * Get a record instance given a reference descriptor. Will ask
         * the session if one exists.
         * @param {String/Ext.Class} type The model type.
         * @param {Object} id The model id.
         * @return {Ext.data.Model} The model instance.
         * @private
         */
         getRecord: function(type, id) {
            var session = this.getSession(),
                Model = type,
                record;

            if (session) {
                record = session.getRecord(type, id);
            } else {
                if (!Model.$isClass) {
                    Model = this.getSchema().getEntity(Model);
                    //<debug>
                    if (!Model) {
                        Ext.Error.raise('Invalid model name: ' + type);
                    }
                    //</debug>
                }
                record = Model.createWithId(id);
                record.load();
            }
            return record;
        },

        notFn: function (v) {
            return !v;
        },

        bindExpression: function (descriptor, callback, scope, options) {
            var ch = descriptor.charAt(0),
                not = (ch === '!'),
                path = not ? descriptor.substring(1) : descriptor,
                stub = this.getStub(path),
                binding;

            binding =  stub.bind(callback, scope, options);
            if (not) {
                binding.transform = this.notFn;
            }

            return binding;
        },

        applyScheduler: function (scheduler) {
            if (scheduler && !scheduler.isInstance) {
                scheduler = new Ext.util.Scheduler(scheduler);
                scheduler.$owner = this;
            }
            return scheduler;
        },

        getScheduler: function () {
            var me = this,
                scheduler = me._scheduler,
                parent,
                session;

            if (!scheduler) {
                if (!(parent = me.getParent())) {
                    scheduler = new Ext.util.Scheduler({
                        // See Session#scheduler
                        preSort: 'kind,-depth'
                    });
                    scheduler.$owner = me;
                } else {
                    scheduler = parent.getScheduler();
                }

                me.setScheduler(scheduler);
            }

            return scheduler;
        },

        /**
         * This method looks up the `Stub` for a single bind descriptor.
         * @param {String/Object} bindDescr The bind descriptor.
         * @return {Ext.app.bind.AbstractStub} The `Stub` associated to the bind descriptor.
         * @private
         */
        getStub: function (bindDescr) {
            var root = this.getRoot();
            return bindDescr ? root.getChild(bindDescr) : root;
        },

        collect: function() {
            var children = this.children,
                key;
            
            // We need to loop over the children first, since they may have link stubs
            // that create bindings inside our VM. Attempt to clean them up first.
            if (children) {
                for (key in children) {
                    children[key].collect();
                }
            }
            this.getRoot().collect();
        },

        //-------------------------------------------------------------------------
        // Config
        // <editor-fold>

        applyData: function (newData, data) {
            var me = this,
                linkData, parent;

            // Force any session to be invoked so we can access it
            me.getSession();
            if (!data) {
                parent = me.getParent();

                /**
                 * @property {Object} linkData
                 * This object is used to hold the result of a linked value. This is done
                 * so that the data object hasOwnProperty equates to whether or not this
                 * property is owned by this instance or inherited.
                 * @private
                 * @readonly
                 * @since 5.0.0
                 */
                me.linkData = linkData = parent ? Ext.Object.chain(parent.getData()) : {};

                /**
                 * @property {Object} data
                 * This object holds all of the properties of this `ViewModel`. It is
                 * prototype chained to the `linkData` which is, in turn, prototype chained
                 * to (if present) the `data` object of the parent `ViewModel`.
                 * @private
                 * @readonly
                 * @since 5.0.0
                 */
                me.data = me._data = Ext.Object.chain(linkData);
            }

            if (newData && newData.constructor === Object) {
                me.getRoot().set(newData);
            }
        },

        applyParent: function(parent) {
            if (parent) {
                parent.registerChild(this);
            }
            return parent;
        },
        
        applyStores: function(stores) {
            var me = this,
                root = me.getRoot(),
                key, cfg, storeBind, stub, listeners, isStatic;
            
            me.storeInfo = {};
            me.listenerScopeFn = function() {
                return me.getView().getInheritedConfig('defaultListenerScope');
            };
            for (key in stores) {
                cfg = stores[key];
                if (cfg.isStore) {
                    cfg.$wasInstance = true;
                    me.setupStore(cfg, key);
                    continue;
                } else if (Ext.isString(cfg)) {
                    cfg = {
                        source: cfg
                    };
                } else {
                    cfg = Ext.apply({}, cfg);
                }
                // Get rid of listeners so they don't get considered as a bind
                listeners = cfg.listeners;
                delete cfg.listeners;
                storeBind = me.bind(cfg, me.onStoreBind, me);
                if (storeBind.isStatic()) {
                    // Everything is static, we don't need to wait, so remove the
                    // binding because it will only fire the first time.
                    storeBind.destroy();
                    me.createStore(key, cfg, listeners);
                } else {
                    storeBind.$storeKey = key;
                    storeBind.$listeners = listeners;
                    stub = root.createStubChild(key);
                    stub.setStore(storeBind);
                }
            }
        },
        
        onStoreBind: function(cfg, oldValue, binding) {
            var info = this.storeInfo,
                key = binding.$storeKey,
                store = info[key],
                proxy;

            if (!store) {
                this.createStore(key, cfg, binding.$listeners, binding);
            } else {
                cfg = Ext.merge({}, cfg);
                proxy = cfg.proxy;
                delete cfg.type;
                delete cfg.model;
                delete cfg.fields;
                delete cfg.proxy;
                delete cfg.listeners;
                
                // TODO: possibly optimize this so we can figure out what has changed
                // instead of smashing the whole lot
                if (proxy) {
                    delete proxy.reader;
                    delete proxy.writer;
                    store.getProxy().setConfig(proxy);
                }
                store.setConfig(cfg);
            }
        },

        createStore: function(key, cfg, listeners, binding) {
            var session = this.getSession(),
                store;

            cfg = Ext.apply({}, cfg);
            if (cfg.session) {
                cfg.session = session;
            }
            if (cfg.source) {
                cfg.type = cfg.type || 'chained';
            }
            // Restore the listeners from applyStores here
            cfg.listeners = listeners;
            store = Ext.Factory.store(cfg);
            store.$binding = binding;
            this.setupStore(store, key);
        },

        setupStore: function(store, key) {
            store.resolveListenerScope = this.listenerScopeFn;
            this.storeInfo[key] = store;
            this.set(key, store);
        },

        applyFormulas: function (formulas) {
            var me = this,
                root = me.getRoot(),
                name, stub;

            me.getData(); // make sure our data is setup first

            for (name in formulas) {
                //<debug>
                if (name.indexOf('.') >= 0) {
                    Ext.Error.raise('Formula names cannot contain dots: ' + name);
                }
                //</debug>
                
                // Force a stub to be created
                root.createStubChild(name);

                stub = me.getStub(name);
                stub.setFormula(formulas[name]);
            }
            return formulas;
        },

        applyLinks: function (links) {
            for (var link in links) {
                this.linkTo(link, links[link]);
            }
        },

        applySchema: function (schema) {
            return Ext.data.schema.Schema.get(schema);
        },

        applyRoot: function () {
            var root = new Ext.app.bind.RootStub(this),
                parent = this.getParent();

            if (parent) {
                // We are assigning the root of a child VM such that its bindings will be
                // pre-sorted after the bindings of the parent VM.
                root.depth = parent.getRoot().depth - 1000;
            }

            return root;
        },

        getFormulaFn: function(data) {
            var me = this,
                fn = me.formulaFn;

            if (!fn) {
                fn = me.formulaFn = function(name) {
                    // Note that the `this` pointer here is the view model because
                    // the VM calls it in the VM scope.
                    return me.$formulaData[name];
                };
            }
            me.$formulaData = data;
            return fn;
        }

        // </editor-fold>
    }
});
