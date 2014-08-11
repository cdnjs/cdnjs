/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * Controllers are the glue that binds an application together. All they really do is listen for events (usually from
 * views) and take some action. Here's how we might create a Controller to manage Users:
 *
 *      Ext.define('MyApp.controller.Users', {
 *          extend: 'Ext.app.Controller',
 *
 *          init: function() {
 *              console.log('Initialized Users! This happens before ' +
 *                          'the Application launch() function is called');
 *          }
 *      });
 *
 * The init function is a special method that is called when your application boots. It is called before the
 * {@link Ext.app.Application Application}'s launch function is executed so gives a hook point to run any code before
 * your Viewport is created.
 *
 * The init function is a great place to set up how your controller interacts with the view, and is usually used in
 * conjunction with another Controller function - {@link Ext.app.Controller#control control}. The control function
 * makes it easy to listen to events on your view classes and take some action with a handler function. Let's update
 * our Users controller to tell us when the panel is rendered:
 *
 *      Ext.define('MyApp.controller.Users', {
 *          extend: 'Ext.app.Controller',
 *
 *          init: function() {
 *              this.control({
 *                  'viewport > panel': {
 *                      render: this.onPanelRendered
 *                  }
 *              });
 *          },
 *
 *          onPanelRendered: function() {
 *              console.log('The panel was rendered');
 *          }
 *      });
 *
 * We've updated the init function to use {@link Ext.app.Controller#control control method} to set up listeners on views
 * in our application. The control method uses the ComponentQuery engine to quickly and easily get references to components
 * on the page. If you are not familiar with ComponentQuery yet, be sure to check out the
 * {@link Ext.ComponentQuery documentation}. In brief though, it allows us to pass a CSS-like selector that will find
 * every matching component on the page.
 *
 * In our init function above we supplied 'viewport > panel', which translates to "find me every Panel that is a direct
 * child of a Viewport". We then supplied an object that maps event names (just 'render' in this case) to handler
 * functions. The overall effect is that whenever any component that matches our selector fires a 'render' event, our
 * onPanelRendered function is called.
 *
 * ## Event domains
 *
 * In Ext JS 4.2, we introduced the concept of event domains. In terms of MVC, an event domain
 * is one or more base classes that fire events to which a Controller wants to listen. Besides
 * Component event domain that encompass {@link Ext.Component}-descended Views, Controllers now
 * can listen to events from data Stores, Ext.Direct Providers, other Controllers, and Ext.globalEvents.
 * This feature provides a way to communicate between parts of the whole application without the need
 * to bind controllers together tightly, and allows to develop and test application parts in isolation.
 *
 * See usage examples in {@link #listen} method documentation.
 *
 * ## Using refs
 *
 * One of the most useful parts of Controllers is the ref system. These use the {@link Ext.ComponentQuery} to
 * make it really easy to get references to Views on your page. Let's look at an example of this now:
 *
 *      Ext.define('MyApp.controller.Users', {
 *          extend: 'Ext.app.Controller',
 *          
 *          refs: [{
 *              ref: 'list',
 *              selector: 'grid'
 *          }],
 *          
 *          init: function() {
 *              this.control({
 *                  'button': {
 *                      click: this.refreshGrid
 *                  }
 *              });
 *          },
 *          
 *          refreshGrid: function() {
 *              this.getList().store.load();
 *          }
 *      });
 *
 * This example assumes the existence of a {@link Ext.grid.Panel Grid} on the page, which contains a single button to
 * refresh the Grid when clicked. In our refs array, we set up a reference to the grid. There are two parts to this -
 * the 'selector', which is a {@link Ext.ComponentQuery ComponentQuery} selector which finds any grid on the page and
 * assigns it to the reference 'list'.
 *
 * By giving the reference a name, we get a number of things for free. The first is the getList function that we use in
 * the refreshGrid method above. This is generated automatically by the Controller based on the name of our ref, which
 * was capitalized and prepended with get to go from 'list' to 'getList'.
 *
 * The way this works is that the first time getList is called by your code, the ComponentQuery selector is run and the
 * first component that matches the selector ('grid' in this case) will be returned. All future calls to getList will
 * use a cached reference to that grid. Usually it is advised to use a specific ComponentQuery selector that will only
 * match a single View in your application (in the case above our selector will match any grid on the page).
 *
 * Bringing it all together, our init function is called when the application boots, at which time we call this.control
 * to listen to any click on a {@link Ext.button.Button button} and call our refreshGrid function (again, this will
 * match any button on the page so we advise a more specific selector than just 'button', but have left it this way for
 * simplicity). When the button is clicked we use out getList function to refresh the grid.
 *
 * You can create any number of refs and control any number of components this way, simply adding more functions to
 * your Controller as you go. For an example of real-world usage of Controllers see the Feed Viewer example in the
 * examples/app/feed-viewer folder in the SDK download.
 *
 * ## Generated getter methods
 *
 * Refs aren't the only thing that generate convenient getter methods. Controllers often have to deal with Models and
 * Stores so the framework offers a couple of easy ways to get access to those too. Let's look at another example:
 *
 *      Ext.define('MyApp.controller.Users', {
 *          extend: 'Ext.app.Controller',
 *
 *          models: ['User'],
 *          stores: ['AllUsers', 'AdminUsers'],
 *
 *          init: function() {
 *              var User, allUsers, ed;
 *              
 *              User = this.getUserModel();
 *              allUsers = this.getAllUsersStore();
 *
 *              ed = new User({ name: 'Ed' });
 *              allUsers.add(ed);
 *          }
 *      });
 *
 * By specifying Models and Stores that the Controller cares about, it again dynamically loads them from the appropriate
 * locations (app/model/User.js, app/store/AllUsers.js and app/store/AdminUsers.js in this case) and creates getter
 * functions for them all. The example above will create a new User model instance and add it to the AllUsers Store.
 * Of course, you could do anything in this function but in this case we just did something simple to demonstrate the
 * functionality.
 *
 * ## Further Reading
 *
 * For more information about writing Ext JS 4 applications, please see the
 * [application architecture guide](#/guide/application_architecture). Also see the {@link Ext.app.Application}
 * documentation.
 *
 * @docauthor Ed Spencer
 */
Ext.define('Ext.app.Controller', {
    requires: [
        'Ext.app.EventBus',
        'Ext.ModelManager',
        'Ext.data.StoreManager',
        'Ext.ComponentManager',
        'Ext.app.domain.Global',
        'Ext.app.domain.Component',
        'Ext.app.domain.Store'
    ],
    
    uses: [
        'Ext.app.domain.Controller'
    ],

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @cfg {String} id The id of this controller. You can use this id when dispatching.
     */

    statics: {
        strings: {
            model: {
                getter: 'getModel',
                upper: 'Model'
            },

            view: {
                getter: 'getView',
                upper: 'View'
            },

            controller: {
                getter: 'getController',
                upper: 'Controller'
            },

            store: {
                getter: 'getStore',
                upper: 'Store'
            }
        },

        controllerRegex: /^(.*)\.controller\./,

        createGetter: function(baseGetter, name) {
            return function () {
                return this[baseGetter](name);
            };
        },

        getGetterName: function(name, kindUpper) {
            var fn       = 'get',
                parts    = name.split('.'),
                numParts = parts.length,
                index;

            // Handle namespaced class names. E.g. feed.Add becomes getFeedAddView etc.
            for (index = 0; index < numParts; index++) {
                fn += Ext.String.capitalize(parts[index]);
            }

            fn += kindUpper;
            
            return fn;
        },

        /**
         * This method is called like so:
         *
         *      Ext.app.Controller.processDependencies(proto, requiresArray, 'MyApp', 'model', [
         *          'User',
         *          'Item',
         *          'Foo@Common.model',
         *          'Bar.Baz@Common.model'
         *      ]);
         *
         * Required dependencies are added to requiresArray.
         *
         * @private
         */
        processDependencies: function(cls, requires, namespace, kind, names) {
            if (!names || !names.length) {
                return;
            }

            var me = this,
                strings = me.strings[kind],
                o, absoluteName, shortName, name, j, subLn, getterName, getter;
                
             if (!Ext.isArray(names)) {
                 names = [names];
             }

            for (j = 0, subLn = names.length; j < subLn; j++) {
                name = names[j];
                o = me.getFullName(name, kind, namespace);
                absoluteName = o.absoluteName;
                shortName = o.shortName;

                requires.push(absoluteName);
                getterName = me.getGetterName(shortName, strings.upper);
                cls[getterName] = getter = me.createGetter(strings.getter, name);

                // Application class will init the controller getters
                if (kind !== 'controller') {
                    // This marker allows the constructor to easily/cheaply identify the
                    // generated getter methods since they all need to be called to get
                    // things initialized. We use a property name that deliberately does
                    // not work with dot-access to reduce any chance of collision.
                    getter['Ext.app.getter'] = true;
                }
            }
        },

        getFullName: function(name, kind, namespace) {
            var shortName = name,
                sep, absoluteName;

            if ((sep = name.indexOf('@')) > 0) {
                // The unambiguous syntax is Model@Name.space (or "space.Model@Name")
                // which contains both the short name ("Model" or "space.Model") and
                // the full name (Name.space.Model).
                //
                shortName    = name.substring(0, sep); // "Model"
                absoluteName = name.substring(sep + 1) + '.' + shortName; //  ex: "Name.space.Model"
            }
            // Deciding if a class name must be qualified:
            //
            // 1 - if the name doesn't contain a dot, we must qualify it
            //
            // 2 - the name may be a qualified name of a known class, but:
            //
            // 2.1 - in runtime, the loader may not know the class - specially in
            //       production - so we must check the class manager
            //
            // 2.2 - in build time, the class manager may not know the class, but
            //       the loader does, so we check the second one (the loader check
            //       assures it's really a class, and not a namespace, so we can
            //       have 'Books.controller.Books', and requesting a controller
            //       called Books will not be underqualified)
            //
            else if (name.indexOf('.') > 0 && (Ext.ClassManager.isCreated(name) ||
                     Ext.Loader.isAClassNameWithAKnownPrefix(name))) {
                absoluteName = name;
            }
            else {
                //<debug>
                if (!namespace) {
                    Ext.log.warn("Cannot find namespace for " + kind + " " + name + ", " +
                                 "assuming it is fully qualified class name");
                }
                //</debug>

                if (namespace) {
                    absoluteName = namespace + '.' + kind + '.' + name;
                    shortName    = name;
                }
                else {
                    absoluteName = name;
                }
            }

            return {
                absoluteName: absoluteName,
                shortName:    shortName
            };
        }
    },
    
    /**
     * The {@link Ext.app.Application} for this controller.
     *
     * @property {Ext.app.Application}
     * @readonly
     */
    application: null,

    /**
     * @cfg {String/String[]} models
     * Array of models to require from AppName.model namespace. For example:
     *
     *      Ext.define("MyApp.controller.Foo", {
     *          extend: "Ext.app.Controller",
     *          models: ['User', 'Vehicle']
     *      });
     *
     * This is equivalent of:
     *
     *      Ext.define("MyApp.controller.Foo", {
     *          extend: "Ext.app.Controller",
     *          requires: ['MyApp.model.User', 'MyApp.model.Vehicle'],
     *          
     *          getUserModel: function() {
     *              return this.getModel("User");
     *          },
     *          
     *          getVehicleModel: function() {
     *              return this.getModel("Vehicle");
     *          }
     *      });
     *
     */

    /**
     * @cfg {String/String[]} views
     * Array of views to require from AppName.view namespace and to generate getter methods for.
     * For example:
     *
     *      Ext.define("MyApp.controller.Foo", {
     *          extend: "Ext.app.Controller",
     *          views: ['List', 'Detail']
     *      });
     *
     * This is equivalent of:
     *
     *      Ext.define("MyApp.controller.Foo", {
     *          extend: "Ext.app.Controller",
     *          requires: ['MyApp.view.List', 'MyApp.view.Detail'],
     *          
     *          getListView: function() {
     *              return this.getView("List");
     *          },
     *          
     *          getDetailView: function() {
     *              return this.getView("Detail");
     *          }
     *      });
     */

    /**
     * @cfg {String/String[]} stores
     * Array of stores to require from AppName.store namespace and to generate getter methods for.
     * For example:
     *
     *      Ext.define("MyApp.controller.Foo", {
     *          extend: "Ext.app.Controller",
     *          stores: ['Users', 'Vehicles']
     *      });
     *
     * This is equivalent to:
     *
     *      Ext.define("MyApp.controller.Foo", {
     *          extend: "Ext.app.Controller",
     *         
     *          requires: [
     *              'MyApp.store.Users',
     *              'MyApp.store.Vehicles'
     *          ]
     *         
     *          getUsersStore: function() {
     *              return this.getStore("Users");
     *          },
     *
     *          getVehiclesStore: function() {
     *              return this.getStore("Vehicles");
     *          }
     *      });
     */

    /**
     * @cfg {Object[]} refs
     * Array of configs to build up references to views on page. For example:
     *
     *      Ext.define("MyApp.controller.Foo", {
     *          extend: "Ext.app.Controller",
     *          
     *          refs: [{
     *              ref: 'list',
     *              selector: 'grid'
     *          }],
     *      });
     *
     * This will add method `getList` to the controller which will internally use
     * Ext.ComponentQuery to reference the grid component on page.
     *
     * The following fields can be used in ref definition:
     *
     * - `ref` - name of the reference.
     * - `selector` - Ext.ComponentQuery selector to access the component.
     * - `autoCreate` - True to create the component automatically if not found on page.
     * - `forceCreate` - Forces the creation of the component every time reference is accessed
     *   (when `get<REFNAME>` is called).
     * - `xtype` - Used to create component by its xtype with autoCreate or forceCreate. If
     *   you don't provide xtype, an Ext.Component instance will be created.
     */

    onClassExtended: function(cls, data, hooks) {
        var onBeforeClassCreated = hooks.onBeforeCreated;

        hooks.onBeforeCreated = function(cls, data) {
            var Controller = Ext.app.Controller,
                ctrlRegex  = Controller.controllerRegex,
                requires   = [],
                className, namespace, requires, proto, match;

            proto = cls.prototype;
            
            /*
             * Namespace resolution is tricky business: we should know what namespace
             * this Controller descendant belongs to, or model/store/view dependency
             * resolution will be either ambiguous or plainly not possible. To avoid
             * guessing games we try to look for a forward hint ($namespace) that
             * Application class sets when its onClassExtended gets processed; if that
             * fails we try to deduce namespace from class name.
             *
             * Note that for Ext.app.Application, Controller.onClassExtended gets executed
             * *before* Application.onClassExtended so we have to delay namespace handling
             * until after Application.onClassExtended kicks in, hence it is done in this hook.
             */
            className = Ext.getClassName(cls);
            namespace = data.$namespace                 ||
                        Ext.app.getNamespace(className) ||
                        ((match = ctrlRegex.exec(className)) && match[1]);

            if (namespace) {
                proto.$namespace = namespace;
            }
            //<debug>
            else {
                Ext.log.warn("Missing namespace for " + className + ", please define it "+
                             "in namespaces property of your Application class.");
            }
            //</debug>

            Controller.processDependencies(proto, requires, namespace, 'model',      data.models);
            Controller.processDependencies(proto, requires, namespace, 'view',       data.views);
            Controller.processDependencies(proto, requires, namespace, 'store',      data.stores);
            Controller.processDependencies(proto, requires, namespace, 'controller', data.controllers);

            Ext.require(requires, Ext.Function.pass(onBeforeClassCreated, arguments, this));
        };
    },

    /**
     * Creates new Controller.
     *
     * @param {Object} [config] Configuration object.
     */
    constructor: function (config) {
        var me = this;

        me.mixins.observable.constructor.call(me, config);

        if (me.refs) {
            me.ref(me.refs);
        }

        me.eventbus = Ext.app.EventBus;
        
        me.initAutoGetters();
    },
    
    initAutoGetters: function() {
        var proto = this.self.prototype,
            prop, fn;

        for (prop in proto) {
            fn = proto[prop];

            // Look for the marker placed on the getters by processDependencies so that
            // we can know what to call cheaply:
            if (fn && fn['Ext.app.getter']) {
                fn.call(this);
            }
        }
    },

    doInit: function(app) {
        var me = this;

        if (!me._initialized) {
            me.init(app);
            me._initialized = true;
        }
    },
    
    finishInit: function(app) {
        var me = this,
            controllers = me.controllers,
            controller, i, l;
        
        if (me._initialized && controllers && controllers.length) {
            for (i = 0, l = controllers.length; i < l; i++) {
                controller = me.getController(controllers[i]);
                controller.finishInit(app);
            }
        }
    },

    /**
     * A template method that is called when your application boots. It is called before the
     * {@link Ext.app.Application Application}'s launch function is executed so gives a hook point
     * to run any code before your Viewport is created.
     *
     * @param {Ext.app.Application} application
     *
     * @template
     */
    init: Ext.emptyFn,

    /**
     * A template method like {@link #init}, but called after the viewport is created.
     * This is called after the {@link Ext.app.Application#launch launch} method of Application
     * is executed.
     *
     * @param {Ext.app.Application} application
     *
     * @template
     */
    onLaunch: Ext.emptyFn,

    ref: function(refs) {
        var me = this,
            i = 0,
            length = refs.length,
            info, ref, fn;

        refs = Ext.Array.from(refs);

        me.references = me.references || [];

        for (; i < length; i++) {
            info = refs[i];
            ref  = info.ref;
            fn   = 'get' + Ext.String.capitalize(ref);

            if (!me[fn]) {
                me[fn] = Ext.Function.pass(me.getRef, [ref, info], me);
            }
            me.references.push(ref.toLowerCase());
        }
    },

    /**
     * Registers one or more {@link #refs references}.
     *
     * @param {Object/Object[]} refs
     */
    addRef: function(refs) {
        this.ref(refs);
    },

    getRef: function(ref, info, config) {
        var me = this,
            refCache = me.refCache || (me.refCache = {}),
            cached = refCache[ref];

        info = info || {};
        config = config || {};

        Ext.apply(info, config);

        if (info.forceCreate) {
            return Ext.ComponentManager.create(info, 'component');
        }

        if (!cached) {
            if (info.selector) {
                refCache[ref] = cached = Ext.ComponentQuery.query(info.selector)[0];
            }
            
            if (!cached && info.autoCreate) {
                refCache[ref] = cached = Ext.ComponentManager.create(info, 'component');
            }
            
            if (cached) {
                cached.on('beforedestroy', function() {
                    refCache[ref] = null;
                });
            }
        }

        return cached;
    },

    /**
     * Returns `true` if a {@link #refs reference} is registered.
     *
     * @return {Boolean}
     */
    hasRef: function(ref) {
        var references = this.references;
        return references && Ext.Array.indexOf(references, ref.toLowerCase()) !== -1;
    },

    /**
     * Adds listeners to components selected via {@link Ext.ComponentQuery}. Accepts an
     * object containing component paths mapped to a hash of listener functions.
     *
     * In the following example the `updateUser` function is mapped to to the `click`
     * event on a button component, which is a child of the `useredit` component.
     *
     *      Ext.define('AM.controller.Users', {
     *          init: function() {
     *              this.control({
     *                  'useredit button[action=save]': {
     *                      click: this.updateUser
     *                  }
     *              });
     *          },
     *          
     *          updateUser: function(button) {
     *              console.log('clicked the Save button');
     *          }
     *      });
     *
     * Or alternatively one call `control` with two arguments:
     *
     *      this.control('useredit button[action=save]', {
     *          click: this.updateUser
     *      });
     *
     * See {@link Ext.ComponentQuery} for more information on component selectors.
     *
     * @param {String/Object} selectors If a String, the second argument is used as the
     * listeners, otherwise an object of selectors -> listeners is assumed
     * @param {Object} [listeners] Config for listeners.
     */
    control: function(selectors, listeners, controller) {
        var me = this,
            ctrl = controller,
            obj;

        if (Ext.isString(selectors)) {
            obj = {};
            obj[selectors] = listeners;
        }
        else {
            obj = selectors;
            ctrl = listeners;
        }

        me.eventbus.control(obj, ctrl || me);
    },

    /**
     * Adds listeners to different event sources (also called "event domains"). The
     * primary event domain is that of components, but there are also other event domains:
     * {@link Ext.app.domain.Global Global} domain that intercepts events fired from
     * {@link Ext#globalEvents} Observable instance, {@link Ext.app.domain.Controller Controller}
     * domain can be used to listen to events fired by other Controllers,
     * {@link Ext.app.domain.Store Store} domain gives access to Store events, and
     * {@link Ext.app.domain.Direct Direct} domain can be used with Ext.Direct Providers
     * to listen to their events.
     * 
     * To listen to "bar" events fired by a controller with id="foo":
     *
     *      Ext.define('AM.controller.Users', {
     *          init: function() {
     *              this.listen({
     *                  controller: {
     *                      '#foo': {
     *                         bar: this.onFooBar
     *                      }
     *                  }
     *              });
     *          },
     *          ...
     *      });
     * 
     * To listen to "bar" events fired by any controller, and "baz" events
     * fired by Store with storeId="baz":
     *
     *      Ext.define('AM.controller.Users', {
     *          init: function() {
     *              this.listen({
     *                  controller: {
     *                      '*': {
     *                         bar: this.onAnyControllerBar
     *                      }
     *                  },
     *                  store: {
     *                      '#baz': {
     *                          baz: this.onStoreBaz
     *                      }
     *                  }
     *              });
     *          },
     *          ...
     *      });
     *
     * To listen to "idle" events fired by {@link Ext#globalEvents} when other event
     * processing is complete and Ext JS is about to return control to the browser:
     *
     *      Ext.define('AM.controller.Users', {
     *          init: function() {
     *              this.listen({
     *                  global: {               // Global events are always fired
     *                      idle: this.onIdle   // from the same object, so there
     *                  }                       // are no selectors
     *              });
     *          }
     *      });
     * 
     * As this relates to components, the following example:
     *
     *      Ext.define('AM.controller.Users', {
     *          init: function() {
     *              this.listen({
     *                  component: {
     *                      'useredit button[action=save]': {
     *                         click: this.updateUser
     *                      }
     *                  }
     *              });
     *          },
     *          ...
     *      });
     * 
     * Is equivalent to:
     *
     *      Ext.define('AM.controller.Users', {
     *          init: function() {
     *              this.control({
     *                  'useredit button[action=save]': {
     *                     click: this.updateUser
     *                  }
     *              });
     *          },
     *          ...
     *      });
     *
     * Of course, these can all be combined in a single call and used instead of
     * `control`, like so:
     *
     *      Ext.define('AM.controller.Users', {
     *          init: function() {
     *              this.listen({
     *                  global: {
     *                      idle: this.onIdle
     *                  },
     *                  controller: {
     *                      '*': {
     *                         foobar: this.onAnyFooBar
     *                      },
     *                      '#foo': {
     *                         bar: this.onFooBar
     *                      }
     *                  },
     *                  component: {
     *                      'useredit button[action=save]': {
     *                         click: this.updateUser
     *                      }
     *                  },
     *                  store: {
     *                      '#qux': {
     *                          load: this.onQuxLoad
     *                      }
     *                  }
     *              });
     *          },
     *          ...
     *      });
     *
     * @param {Object} to Config object containing domains, selectors and listeners.
     */
    listen: function (to, controller) {
        this.eventbus.listen(to, controller || this);
    },

    /**
     * Returns instance of a {@link Ext.app.Controller Controller} with the given id.
     * When controller doesn't exist yet, it's created. Note that this method depends
     * on Application instance and will return undefined when Application is not
     * accessible. The only exception is when this Controller instance's id is requested;
     * in that case we always return the instance even if Application is no available.
     *
     * @param {String} id
     *
     * @return {Ext.app.Controller} controller instance or undefined.
     */
    getController: function(id) {
        var me = this,
            app = me.application;

        if (id === me.id) {
            return me;
        }

        return app && app.getController(id);
    },

    /**
     * Returns instance of a {@link Ext.data.Store Store} with the given name.
     * When store doesn't exist yet, it's created.
     *
     * @param {String} name
     *
     * @return {Ext.data.Store} a store instance.
     */
    getStore: function(name) {
        var storeId, store;

        storeId = (name.indexOf('@') == -1) ? name : name.split('@')[0];
        store   = Ext.StoreManager.get(storeId);

        if (!store) {
            name = Ext.app.Controller.getFullName(name, 'store', this.$namespace);

            if (name) {
                store = Ext.create(name.absoluteName, {
                    storeId: storeId
                });
            }
        }

        return store;
    },

    /**
     * Returns a {@link Ext.data.Model Model} class with the given name.
     * A shorthand for using {@link Ext.ModelManager#getModel}.
     *
     * @param {String} name
     *
     * @return {Ext.data.Model} a model class.
     */
    getModel: function(model) {
        var name = Ext.app.Controller.getFullName(model, 'model', this.$namespace);

        return name && Ext.ModelManager.getModel(name.absoluteName);
    },

    /**
     * Returns a View class with the given name.  To create an instance of the view,
     * you can use it like it's used by Application to create the Viewport:
     *
     *     this.getView('Viewport').create();
     *
     * @param {String} name
     *
     * @return {Ext.Base} a view class.
     */
    getView: function(view) {
        var name = Ext.app.Controller.getFullName(view, 'view', this.$namespace);

        return name && Ext.ClassManager.get(name.absoluteName);
    },

    /**
     * Returns the base {@link Ext.app.Application} for this controller.
     *
     * @return {Ext.app.Application} the application
     */
    getApplication: function() {
        return this.application;
    }
});
