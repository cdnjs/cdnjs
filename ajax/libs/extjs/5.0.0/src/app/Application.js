/**
 * Represents an Ext JS application, which is typically a single page app using a
 * {@link Ext.container.Viewport Viewport}.
 *
 * An application consists of one or more Views. The behavior of a View is managed by its
 * corresponding {@link Ext.app.ViewController ViewController} and {@link Ext.app.ViewModel
 * ViewModel}.
 *
 * Global activities are coordinated by {@link Ext.app.Controller Controllers} which are
 * ultimately instantiated by an instance of this (or a derived) class.
 *
 *     Ext.application({
 *         name: 'MyApp',
 *
 *         // An instance of this view is created and set as the Viewport:
 *         autoCreateViewport: 'MyApp.view.Main'
 *     });
 *
 * This does several things. First it creates a global variable called 'MyApp' - all of
 * your Application's classes (such as its Models, Views and Controllers) will reside under
 * this single namespace, which drastically lowers the chances of colliding global variables.
 *
 * The MyApp global will also have a getApplication method to get a reference to the current
 * application:
 *
 *     var app = MyApp.getApplication();
 *
 * # Telling Application about the rest of the app
 *
 * Because an Ext.app.Application represents an entire app, we should tell it about the other
 * parts of the app - namely the Models, Views and Controllers that are bundled with the application. Let's say we have a blog management app; we
 * might have Models and Controllers for Posts and Comments, and Views for listing, adding and editing Posts and Comments.
 * Here's how we'd tell our Application about all these things:
 *
 *     Ext.application({
 *         name: 'Blog',
 *
 *         models: ['Post', 'Comment'],
 *
 *         controllers: ['Posts', 'Comments'],
 *
 *         launch: function() {
 *             ...
 *         }
 *     });
 *
 * Note that we didn't actually list the Views directly in the Application itself. This is because Views are managed by
 * Controllers, so it makes sense to keep those dependencies there. The Application will load each of the specified
 * Controllers using the pathing conventions laid out in the [application architecture guide][mvc] - in this case
 * expecting the controllers to reside in app/controller/Posts.js and app/controller/Comments.js. In turn, each
 * Controller simply needs to list the Views it uses and they will be automatically loaded. Here's how our Posts
 * controller like be defined:
 *
 *     Ext.define('MyApp.controller.Posts', {
 *         extend: 'Ext.app.Controller',
 *         views: ['posts.List', 'posts.Edit'],
 *
 *         //the rest of the Controller here
 *     });
 *
 * Because we told our Application about our Models and Controllers, and our Controllers about their Views, Ext JS will
 * automatically load all of our app files for us. This means we don't have to manually add script tags into our html
 * files whenever we add a new class, but more importantly it enables us to create a minimized build of our entire
 * application using Sencha Cmd.
 *
 * # Deriving from Ext.app.Application
 *
 * Typically, applications do not derive directly from Ext.app.Application. Rather, the
 * configuration passed to `Ext.application` mimics what you might do in a derived class.
 * In some cases, however, it can be desirable to share logic by using a derived class
 * from `Ext.app.Application`.
 *
 * Derivation works as you would expect, but using the derived class should still be the
 * job of the `Ext.application` method.
 *
 *     Ext.define('MyApp.app.Application', {
 *         extend: 'Ext.app.Application',
 *         name: 'MyApp',
 *         ...
 *     });
 *
 *     Ext.application('MyApp.app.Application');
 *
 * For more information about writing Ext JS applications, please see the [application architecture guide][mvc].
 *
 * [mvc]: #/guide/application_architecture
 */
Ext.define('Ext.app.Application', {
    extend: 'Ext.app.Controller',

    requires : [
        'Ext.tip.QuickTipManager',
        'Ext.util.History',
        'Ext.util.MixedCollection'
    ],
    
    isApplication: true,

    /**
     * @cfg {String} extend A class name to use with the `Ext.application` call. The class must also extend {@link Ext.app.Application}.
     *
     *     Ext.define('MyApp.Application', {
     *         extend : 'Ext.app.Application',
     *
     *         launch : function() {
     *             Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
     *         }
     *     });
     *
     *     Ext.application({
     *         extend : 'MyApp.Application'
     *     });
     */

    /**
     * @cfg {String/String[]} controllers
     * Names of controllers that the app uses.
     */

    /**
     * @cfg {Object} scope
     * The scope to execute the {@link #launch} function in. Defaults to the Application instance.
     */
    scope: undefined,
    
    /**
     * @cfg {String/String[]} [namespaces]
     *
     * The list of namespace prefixes used in the application to resolve dependencies
     * like Views and Stores:
     *
     *      Ext.application({
     *          name: 'MyApp',
     *
     *          namespaces: ['Common.code'],
     *
     *          controllers: [ 'Common.code.controller.Foo', 'Bar' ]
     *      });
     *
     *      Ext.define('Common.code.controller.Foo', {
     *          extend: 'Ext.app.Controller',
     *
     *          models: ['Foo'],    // Loads Common.code.model.Foo
     *          views:  ['Bar']     // Loads Common.code.view.Bar
     *      });
     *
     *      Ext.define('MyApp.controller.Bar', {
     *          extend: 'Ext.app.Controller',
     *
     *          models: ['Foo'],    // Loads MyApp.model.Foo
     *          views:  ['Bar']     // Loads MyApp.view.Bar
     *      });
     *
     * You don't need to include main namespace (MyApp), it will be added to the list
     * automatically.
     */
    namespaces: [],
    
    /**
     * @cfg {Object} paths
     * Additional load paths to add to Ext.Loader.
     * See {@link Ext.Loader#paths} config for more details.
     */
    paths: null,
    
    /**
     * @cfg {String} appFolder
     * The path to the directory which contains all application's classes.
     * This path will be registered via {@link Ext.Loader#setPath} for the namespace specified
     * in the {@link #name name} config.
     */
    appFolder: 'app',
    // NOTE - this config has to be processed by Ext.application


    config: {
        /**
         * @cfg {String} name
         * The name of your application. This will also be the namespace for your views, controllers
         * models and stores. Don't use spaces or special characters in the name. **Application name
         * is mandatory**.
         */
        name: '',
       
        /**
         * @cfg {Boolean} enableQuickTips
         * True to automatically set up Ext.tip.QuickTip support.
         */
         enableQuickTips: true,
        
        /**
         * @cfg {String} appProperty
         * The name of a property to be assigned to the main namespace to gain a reference to
         * this application. Can be set to an empty value to prevent the reference from
         * being created
         *
         *     Ext.application({
         *         name: 'MyApp',
         *         appProperty: 'myProp',
         *
         *         launch: function() {
         *             console.log(MyApp.myProp === this);
         *         }
         *     });
         */
        appProperty: 'app',
       
        /**
         * @cfg {Boolean/String} [autoCreateViewport=false]
         * Set to `true` to automatically load and instantiate `AppName.view.Viewport`
         * before firing the launch function. Otherwise this is the name of the view to
         * create and apply the `viewport` plugin.
         *
         * @cmd-auto-dependency {aliasPrefix: "view.", mvc: true, requires: ["Ext.plugin.Viewport"]}
         *
         */
        autoCreateViewport: false,

        /**
         * @cfg {String} [defaultToken=null] The default token to be used at application launch
         * if one is not present. Often this is set to something like `'home'`.
         */
        defaultToken: null,

        /**
         * @cfg {String} glyphFontFamily
         * The glyphFontFamily to use for this application.  Used as the default font-family
         * for all components that support a `glyph` config.
         */
        glyphFontFamily:  null
    },
    
    onClassExtended: function(cls, data, hooks) {
        var Controller = Ext.app.Controller,
            proto = cls.prototype,
            requires = [],
            viewportClass = data.autoCreateViewport,
            onBeforeClassCreated, paths, namespace, ns, appFolder;
        
        // Ordinary inheritance does not work here so we collect
        // necessary data from current class data and its superclass
        namespace = data.name      || cls.superclass.name;
        appFolder = data.appFolder || cls.superclass.appFolder;
        
        if (namespace) {
            data.$namespace = namespace;
            Ext.app.addNamespaces(namespace);
        }

        if (data.namespaces) {
            Ext.app.addNamespaces(data.namespaces);
        }

        if (!data['paths processed']) {
            if (namespace && appFolder) {
                Ext.Loader.setPath(namespace, appFolder);
            }
            
            paths = data.paths;

            if (paths) {
                for (ns in paths) {
                    if (paths.hasOwnProperty(ns)) {
                        Ext.Loader.setPath(ns, paths[ns]);
                    }
                }
            }
        }
        else {
            delete data['paths processed'];
        }

        if (viewportClass) {
            //<debug>
            if (!namespace) {
                Ext.Error.raise("[Ext.app.Application] Can't resolve namespace for " +
                                data.$className + ", did you forget to specify 'name' property?");
            }
            //</debug>

            if (viewportClass === true) {
                viewportClass = 'Viewport';
            } else {
                requires.push('Ext.plugin.Viewport');
            }

            Controller.processDependencies(proto, requires, namespace, 'view', viewportClass);
        }

        // Any "requires" also have to be processed before we fire up the App instance.
        if (requires.length) {
            onBeforeClassCreated = hooks.onBeforeCreated;

            hooks.onBeforeCreated = function(cls, data) {
                var args = Ext.Array.clone(arguments);
                
                Ext.require(requires, function () {
                    return onBeforeClassCreated.apply(this, args);
                });
            };
        }
    },

    /**
     * Creates new Application.
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        var me = this;
        
        Ext.app.route.Router.application = me;

        me.callParent(arguments);
        
        //<debug>
        if (Ext.isEmpty(me.getName())) {
            Ext.Error.raise("[Ext.app.Application] Name property is required");
        }
        //</debug>

        me.doInit(me);

        me.initNamespace();
        me.initControllers();
        me.onBeforeLaunch();
        
        me.finishInitControllers();
    },

    initNamespace: function() {
        var me = this,
            appProperty = me.getAppProperty(),
            ns;

        ns = Ext.namespace(me.getName());

        if (ns) {
            ns.getApplication = function() {
                return me;
            };

            if (appProperty) {
                if (!ns[appProperty]) {
                    ns[appProperty] = me;
                }
                //<debug>
                else if (ns[appProperty] !== me) {
                    Ext.log.warn('An existing reference is being overwritten for ' + name + '.' + appProperty +
                        '. See the appProperty config.'
                    );
                }
                //</debug>
            }
        }
    },

    initControllers: function() {
        var me = this,
            controllers = Ext.Array.from(me.controllers);

        me.controllers = new Ext.util.MixedCollection();

        for (var i = 0, ln = controllers.length; i < ln; i++) {
            me.getController(controllers[i]);
        }
    },
    
    finishInitControllers: function() {
        var me = this,
            controllers, i, l;
        
        controllers = me.controllers.getRange();
        
        for (i = 0, l = controllers.length; i < l; i++) {
            controllers[i].finishInit(me);
        }
    },

    /**
     * @method
     * @template
     * Called automatically when the page has completely loaded. This is an empty function that should be
     * overridden by each application that needs to take action on page load.
     * @param {String} profile The detected application profile
     * @return {Boolean} By default, the Application will dispatch to the configured startup controller and
     * action immediately after running the launch function. Return false to prevent this behavior.
     */
    launch: Ext.emptyFn,

    /**
     * @private
     */
    onBeforeLaunch: function() {
        var me = this,
            History = Ext.util.History,
            defaultToken = me.getDefaultToken(),
            controllers, c, cLen, controller, token;

        if (me.getEnableQuickTips()) {
            me.initQuickTips();
        }

        if (me.getAutoCreateViewport()) {
            me.initViewport();
        }

        me.launch.call(me.scope || me);
        me.launched = true;
        me.fireEvent('launch', me);

        controllers = me.controllers.items;
        cLen        = controllers.length;

        for (c = 0; c < cLen; c++) {
            controller = controllers[c];
            controller.onLaunch(me);
        }

        if (!History.ready) {
            History.init();
        }
        token = History.getToken();
        if (token) {
            me.redirectTo(token, true);
        } else if (defaultToken) {
            History.add(defaultToken);
        }
    },

    getModuleClassName: function(name, kind) {
        return Ext.app.Controller.getFullName(name, kind, this.getName()).absoluteName;
    },

    getViewportName: function () {
        var name = null,
            autoCreate = this.getAutoCreateViewport();

        if (autoCreate) {
            name = (autoCreate === true) ? 'Viewport' : autoCreate;
        }

        return name;
    },

    initQuickTips: function() {
        Ext.tip.QuickTipManager.init();
    },

    initViewport: function() {
        var viewport = this.getView(this.getViewportName()),
            config;

        if (viewport) {
            if (!viewport.prototype.isViewport) {
                config = {
                    plugins: 'viewport'
                };
            }
            this.viewport = viewport.create(config);
        }
    },
    
    /**
     * Create an instance of a controller by name.
     * @param {String} name The name of the controller. For a controller with the
     * full class name `MyApp.controller.Foo`, the name parameter should be `Foo`.
     * If the controller already exists, it will be returned.
     * 
     * @return {Ext.app.Controller} controller
     */
    createController: function(name) {
        return this.getController(name);
    },
    
    /**
     * Destroys a controller, any listeners are unbound.
     * @param {String/Ext.app.Controller} controller The controller
     */
    destroyController: function(controller) {
        if (typeof controller === 'string') {
            controller = this.getController(controller, true);
        }
        Ext.destroy(controller);
    },

    getController: function(name, /* private */ preventCreate) {
        var me          = this,
            controllers = me.controllers,
            className, controller, len, i, c, all;

        controller = controllers.get(name);
        
        // In a majority of cases, the controller id will be the same as the name.
        // However, when a controller is manually given an id, it will be keyed
        // in the collection that way. So if we don't find it, we attempt to loop
        // over the existing controllers and find it by classname
        if (!controller) {
            all = controllers.items;
            for (i = 0, len = all.length; i < len; ++i) {
                c = all[i];
                className = c.getModuleClassName();
                if (className && className === name) {
                    controller = c;
                    break;
                }
            }
        }

        if (!controller && !preventCreate) {
            className  = me.getModuleClassName(name, 'controller');
            
            controller = Ext.create(className, {
                application: me,
                moduleClassName: name
            });

            controllers.add(controller);

            if (me._initialized) {
                controller.doInit(me);
            }
        }

        return controller;
    },
    
    /**
     * Unregister a controller from the application.
     * @private 
     * @param {Ext.app.Controller} controller The controller to unregister
     */
    unregister: function(controller) {
        this.controllers.remove(controller);    
    },

    // Inherit docs
    getApplication: function() {
        return this;
    },
    
    // Inherit docs
    destroy: function(destroyRefs){
        var me = this,
            controllers = me.controllers,
            ns = Ext.namespace(me.getName()),
            appProp = me.getAppProperty();
         
        Ext.destroy(me.viewport);
           
        if (controllers) {
            controllers.each(function(controller){
                controller.destroy(destroyRefs, true);
            });
        }
        me.controllers = null;
        me.callParent([destroyRefs, true]);
        
        // Clean up any app reference
        if (ns && ns[appProp] === me) {
            delete ns[appProp];
        }
    },

    updateGlyphFontFamily: function(fontFamily) {
        Ext.setGlyphFontFamily(fontFamily);
    }
});
