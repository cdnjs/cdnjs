/**
 * The Router is an ordered set of {@link Ext.app.route.Route} definitions that decode a
 * url into a controller function to execute. Each `route` defines a type of url to match,
 * along with the controller function to call if it is matched. The Router uses the
 * {@link Ext.util.History} singleton to find out when the browser's url has changed.
 *
 * Routes are almost always defined inside a {@link Ext.app.Controller Controller}, as
 * opposed to on the Router itself. End-developers should not usually need to interact
 * directly with the Router as the Controllers manage everything automatically. See the
 * {@link Ext.app.Controller Controller documentation} for more information on specifying
 * routes.
 *
 * @author Mitchell Simoens
 * @private
 */
Ext.define('Ext.app.route.Router', {
    singleton : true,

    requires : [
        'Ext.app.route.Queue',
        'Ext.app.route.Route',
        'Ext.util.History'
    ],

    /**
     * @property {String} [multipleToken=|] The token to split the routes to support multiple routes.
     */
    multipleToken: '|',

    /**
     * @property {Boolean} queueRoutes True to queue routes to be executed one after the
     * other, false to execute routes immediately.
     */
    queueRoutes: true,

    /**
     * @property {Ext.app.route.Route[]} routes The connected {@link Ext.app.route.Route}
     * instances.
     */

    constructor : function () {
        var History = Ext.util.History;

        if (!History.ready) {
            History.init();
        }

        History.on('change', this.onStateChange, this);
        this.clear();
    },

    /**
     * React to a token
     *
     * @private
     * @param {String} token The token to react to.
     */
    onStateChange : function (token) {
        var me          = this,
            app         = me.application,
            routes      = me.routes,
            len         = routes.length,
            queueRoutes = me.queueRoutes,
            tokens      = token.split(me.multipleToken),
            t           = 0,
            length      = tokens.length,
            i, queue, route, args, matched;

        for (; t < length; t++) {
            token = tokens[t];
            matched = false;

            if (queueRoutes) {
                //create a queue
                queue = new Ext.app.route.Queue({
                    token : token
                });
            }

            for (i = 0; i < len; i++) {
                route = routes[i];
                args  = route.recognize(token);

                if (args) {
                    matched = true;
                    if (queueRoutes) {
                        queue.queueAction(route, args);
                    } else {
                        route.execute(token, args);
                    }
                }
            }

            if (queueRoutes) {
                //run the queue
                queue.runQueue();
            }
            
            if (!matched && app) {
                app.fireEvent('unmatchedroute', token);
            }
        }
    },

    /**
     * Create the {@link Ext.app.route.Route} instance and connect to the
     * {@link Ext.app.route.Router} singleton.
     *
     * @param {String} url The url to recognize.
     * @param {String} action The action on the controller to execute when the url is
     * matched.
     * @param {Ext.app.Controller} controller The controller associated with the
     * {@link Ext.app.route.Route}
     */
    connect : function (url, action, controller) {
        var config = {
                url        : url,
                action     : action,
                controller : controller
            };

        if (Ext.isObject(action)) {
            Ext.merge(config, action);
        }
        this.routes.push(new Ext.app.route.Route(config));
    },
    
    /**
     * Disconnects all routes for a controller.
     * @param {Ext.app.Controller} controller The controller to disconnect routes from.
     */
    disconnectAll: function(controller) {
        var routes = this.routes,
            len = routes.length,
            newRoutes = [],
            i, route;
    
        for (i = 0; i < len; ++i) {
            route = routes[i];
            if (route.controller !== controller) {
                newRoutes.push(route);
            }
        }
        this.routes = newRoutes;
    },

    /**
     * Recognizes a url string connected to the Router, return the controller/action pair
     * plus any additional config associated with it.
     *
     * @param {String} url The url to recognize.
     * @return {Object/Boolean} If the url was recognized, the controller and action to
     * call, else `false`.
     */
    recognize : function(url) {
        var routes = this.routes || [],
            i      = 0,
            len    = routes.length,
            route, args;

        for (; i < len; i++) {
            route = routes[i];
            args  = route.recognize(url);

            if (args) {
                //route is recognized, return it and the arguments recognized if any
                return {
                    route : route,
                    args  : args
                };
            }
        }

        return false;
    },

    /**
     * Convenience method which just calls the supplied function with the
     * {@link Ext.app.route.Router} singleton. Example usage:
     *
     *     Ext.app.route.Router.draw(function(map) {
     *         map.connect('activate/:token', {controller: 'users', action: 'activate'});
     *         map.connect('home',            {controller: 'index', action: 'home'});
     *     });
     *
     * @param {Function} fn The function to call
     */
    draw : function(fn) {
        fn.call(this, this);
    },

    /**
     * Clear all the recognized routes.
     */
    clear : function() {
        this.routes = [];
    }
});
