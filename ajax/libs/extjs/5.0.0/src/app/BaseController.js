/**
 * @protected
 * @class Ext.app.BaseController
 * Base class for Controllers.
 * 
 */
Ext.define('Ext.app.BaseController', {
    requires: [
        'Ext.app.EventBus',
        'Ext.app.domain.Global'
    ],
    
    uses: [
        'Ext.app.domain.Controller'
    ],

    mixins: {
        observable: 'Ext.util.Observable'
    },
    
    isController: true,

    config : {
        /**
         * @cfg {String} id The id of this controller. You can use this id when dispatching.
         * @accessor
         */
        id: null,

        /**
         * @cfg {Object} control
         * @accessor
         *
         * Adds listeners to components selected via {@link Ext.ComponentQuery}. Accepts an
         * object containing component paths mapped to a hash of listener functions.
         *
         * In the following example the `updateUser` function is mapped to to the `click`
         * event on a button component, which is a child of the `useredit` component.
         *
         *      Ext.define('MyApp.controller.Users', {
         *          extend: 'Ext.app.Controller',
         *
         *          config: {
         *              control: {
         *                  'useredit button[action=save]': {
         *                      click: 'updateUser'
         *                  }
         *               }
         *          },
         *
         *          updateUser: function(button) {
         *              console.log('clicked the Save button');
         *          }
         *      });
         *
         * The method you pass to the listener will automatically be resolved on the controller.
         * In this case, the `updateUser` method that will get executed on the `button` `click`
         * event will resolve to the `updateUser` method on the controller,
         *
         * See {@link Ext.ComponentQuery} for more information on component selectors.
         */
        control: null,

        /**
         * @cfg {Object} listen
         * @accessor
         *
         * Adds listeners to different event sources (also called "event domains"). The
         * primary event domain is that of components, but there are also other event domains:
         * {@link Ext.app.domain.Global Global} domain that intercepts events fired from
         * {@link Ext.GlobalEvents} Observable instance, {@link Ext.app.domain.Controller Controller}
         * domain can be used to listen to events fired by other Controllers,
         * {@link Ext.app.domain.Store Store} domain gives access to Store events, and
         * {@link Ext.app.domain.Direct Direct} domain can be used with Ext.Direct Providers
         * to listen to their events.
         *
         * To listen to "bar" events fired by a controller with id="foo":
         *
         *      Ext.define('AM.controller.Users', {
         *          extend: 'Ext.app.Controller',
         *
         *          config: {
         *              listen: {
         *                  controller: {
         *                      '#foo': {
         *                         bar: 'onFooBar'
         *                      }
         *                  }
         *              }
         *          }
         *      });
         *
         * To listen to "bar" events fired by any controller, and "baz" events
         * fired by Store with storeId="baz":
         *
         *      Ext.define('AM.controller.Users', {
         *          extend: 'Ext.app.Controller',
         *
         *          config: {
         *              listen: {
         *                  controller: {
         *                      '*': {
         *                         bar: 'onAnyControllerBar'
         *                      }
         *                  },
         *                  store: {
         *                      '#baz': {
         *                          baz: 'onStoreBaz'
         *                      }
         *                  }
         *              }
         *          }
         *      });
         *
         * To listen to "idle" events fired by {@link Ext.GlobalEvents} when other event
         * processing is complete and Ext JS is about to return control to the browser:
         *
         *      Ext.define('AM.controller.Users', {
         *          extend: 'Ext.app.Controller',
         *
         *          config: {
         *              listen: {
         *                  global: {            // Global events are always fired
         *                      idle: 'onIdle'   // from the same object, so there
         *                  }                    // are no selectors
         *              }
         *          }
         *      });
         *
         * As this relates to components, the following example:
         *
         *      Ext.define('AM.controller.Users', {
         *          extend: 'Ext.app.Controller',
         *
         *          config: {
         *              listen: {
         *                  component: {
         *                      'useredit button[action=save]': {
         *                         click: 'updateUser'
         *                      }
         *                  }
         *              }
         *          }
         *      });
         *
         * Is equivalent to:
         *
         *      Ext.define('AM.controller.Users', {
         *          extend: 'Ext.app.Controller',
         *
         *          config: {
         *              control: {
         *                  'useredit button[action=save]': {
         *                     click: 'updateUser'
         *                  }
         *              }
         *          }
         *      });
         *
         * Of course, these can all be combined in a single call and used instead of
         * `control`, like so:
         *
         *      Ext.define('AM.controller.Users', {
         *          extend: 'Ext.app.Controller',
         *
         *          config: {
         *              listen: {
         *                  global: {
         *                      idle: 'onIdle'
         *                  },
         *                  controller: {
         *                      '*': {
         *                         foobar: 'onAnyFooBar'
         *                      },
         *                      '#foo': {
         *                         bar: 'onFooBar'
         *                      }
         *                  },
         *                  component: {
         *                      'useredit button[action=save]': {
         *                         click: 'updateUser'
         *                      }
         *                  },
         *                  store: {
         *                      '#qux': {
         *                          load: 'onQuxLoad'
         *                      }
         *                  }
         *              }
         *          }
         *      });
         */
        listen: null,

        /**
         * @cfg {Object} routes
         * @accessor
         *
         * An object of routes to handle hash changes. A route can be defined in a simple way:
         *
         *     routes : {
         *         'foo/bar'  : 'handleFoo',
         *         'user/:id' : 'showUser'
         *     }
         *
         * Where the property is the hash (which can accept a parameter defined by a colon) and the value
         * is the method on the controller to execute. The parameters will get sent in the action method.
         *
         * At the application level, you can define a event that will be executed when no matching
         * routes are found.
         *
         *     Ext.application({
         *         name: 'MyApp',
         *         listen: {
         *             controller: {
         *                 '#': {
         *                     unmatchedroute: 'onUnmatchedRoute'
         *                 }
         *             }
         *         },
         *
         *         onUnmatchedRoute: function(hash) {
         *             console.log('Unmatched', hash);
         *             // Do something...
         *         }
         *     });
         *
         * There is also a complex means of defining a route where you can use a before action and even
         * specify your own RegEx for the parameter:
         *
         *     routes : {
         *         'foo/bar'  : {
         *             action  : 'handleFoo',
         *             before  : 'beforeHandleFoo'
         *         },
         *         'user/:id' : {
         *             action     : 'showUser',
         *             before     : 'beforeShowUser',
         *             conditions : {
         *                 ':id' : '([0-9]+)'
         *             }
         *         }
         *     }
         *
         * This will only match if the `id` parameter is a number.
         *
         * The before action allows you to cancel an action. Every before action will get passed an `action` argument with
         * a `resume` and `stop` methods as the last argument of the method and you *MUST* execute either method:
         *
         *     beforeHandleFoo : function(action) {
         *         //some logic here
         *
         *         //this will allow the handleFoo action to be executed
         *         action.resume();
         *     },
         *     handleFoo : function() {
         *         //will get executed due to true being passed in callback in beforeHandleFoo
         *     },
         *     beforeShowUser : function(id, action) {
         *         //allows for async process like an Ajax
         *         Ext.Ajax.request({
         *             url     : 'foo.php',
         *             success : function() {
         *                 //will not allow the showUser method to be executed but will continue other queued actions.
         *                 action.stop();
         *             },
         *             failure : function() {
         *                 //will not allow the showUser method to be executed and will not allow other queued actions to be executed.
         *                 action.stop(true);
         *             }
         *         });
         *     },
         *     showUser : function(id) {
         *         //will not get executed due to false being passed in callback in beforeShowUser
         *     }
         *
         * You *MUST* execute the `resume` or `stop` method on the `action` argument. Executing `action.resume();` will continue
         * the action, `action.stop();` will not allow the action to resume but will allow other queued actions to resume,
         * `action.stop(true);` will not allow the action and any other queued actions to resume.
         *
         * The default RegEx that will be used is `([%a-zA-Z0-9\\-\\_\\s,]+)` but you can specify any
         * that may suit what you need to accomplish. An example of an advanced condition may be to make
         * a parameter optional and case-insensitive:
         *
         *     routes : {
         *         'user:id' : {
         *             action     : 'showUser',
         *             before     : 'beforeShowUser',
         *             conditions : {
         *                 ':id' : '(?:(?:\/){1}([%a-z0-9_,\s\-]+))?'
         *             }
         *         }
         *     }
         */
        routes : null,
        before : null
    },

    /**
     * Creates new Controller.
     *
     * @param {Object} [config] Configuration object.
     */
    constructor: function(config) {
        var me = this;
        
        me.mixins.observable.constructor.call(me, config);
        delete me.control;
        delete me.listen;

        me.eventbus = Ext.app.EventBus;

        //need to have eventbus property set before we initialize the config
        me.initConfig(config);
    },

    applyListen: function(listen) {
        if (Ext.isObject(listen)) {
            listen = Ext.clone(listen);
        }

        return listen;
    },

    applyControl: function(control) {
        if (Ext.isObject(control)) {
            control = Ext.clone(control);
        }

        return control;
    },

    /**
     * @param {Object} control The object to pass to the {@link #method-control} method
     * @private
     */
    updateControl: function(control) {
        if (control) {
            this.ensureId && this.ensureId();
            this.control(control);
        }
    },

    /**
     * @param {Object} listen The object to pass to the {@link #method-listen} method
     * @private
     */
    updateListen: function(listen) {
        if (listen) {
            this.ensureId && this.ensureId();
            this.listen(listen);
        }
    },

    /**
     * @param {Object} routes The routes to connect to the {@link Ext.app.route.Router}
     * @private
     */
    updateRoutes : function(routes) {
        if (routes) {
            var me = this,
                befores = me.getBefore() || {},
                Router = Ext.app.route.Router,
                url, config, method;

            for (url in routes) {
                config = routes[url];

                if (Ext.isString(config)) {
                    config = {
                        action : config
                    };
                }

                method = config.action;

                if (!config.before) {
                    config.before = befores[method];
                }
                //<debug>
                else if (befores[method]) {
                    Ext.log.warn('You have a before method configured on a route ("' + url + '") and in the before object property also in the "' +
                        me.self.getName() + '" controller. Will use the before method in the route and disregard the one in the before property.');
                }
                //</debug>

                //connect the route config to the Router
                Router.connect(url, config, me);
            }
        }
    },

    isActive: function() {
        return true;
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
     * {@link Ext.GlobalEvents} Observable instance, {@link Ext.app.domain.Controller Controller}
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
     * To listen to "idle" events fired by {@link Ext.GlobalEvents} when other event
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
     * @param {Ext.app.Controller} [controller] The controller to add the listeners to. Defaults to the current controller.
     */
    listen: function (to, controller) {
        this.eventbus.listen(to, controller || this);
    },
    
    destroy: function() {
        var bus = this.eventbus;

        Ext.app.route.Router.disconnectAll(this);

        if (bus) {
            bus.unlisten(this);
            this.eventbus = null;
        }
    },

    /**
     * Update the hash. By default, it will not execute the routes if the current token and the
     * token passed are the same.
     *
     * @param {String} token The token to update.
     * @param {Boolean} force Force the update of the hash regardless of the current token.
     * @return {Boolean} Will return a`true` if the token was updated.
     */
    redirectTo : function(token, force) {
        if (!force) {
            var currentToken = Ext.util.History.getToken();

            if (currentToken === token) {
                return false;
            }
        } else {
            Ext.app.route.Router.onStateChange(token);
        }

        Ext.util.History.add(token);

        return true;
    }
});
