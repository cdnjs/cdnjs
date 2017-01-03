/**
 * Ext.Direct aims to streamline communication between the client and server by providing a single interface that
 * reduces the amount of common code typically required to validate data and handle returned data packets (reading data,
 * error conditions, etc).
 *
 * The Ext.direct namespace includes several classes for a closer integration with the server-side. The Ext.data
 * namespace also includes classes for working with Ext.data.Stores which are backed by data from an Ext.Direct method.
 *
 * # Specification
 *
 * For additional information consult the [Ext.Direct Specification][1].
 *
 * # Providers
 *
 * Ext.Direct uses a provider architecture, where one or more providers are used to transport data to and from the
 * server. There are several providers that exist in the core at the moment:
 *
 * - {@link Ext.direct.JsonProvider JsonProvider} for simple JSON operations
 * - {@link Ext.direct.PollingProvider PollingProvider} for repeated requests
 * - {@link Ext.direct.RemotingProvider RemotingProvider} exposes server side on the client.
 *
 * A provider does not need to be invoked directly, providers are added via {@link Ext.direct.Manager}.{@link #addProvider}.
 *
 * # Router
 *
 * Ext.Direct utilizes a "router" on the server to direct requests from the client to the appropriate server-side
 * method. Because the Ext.Direct API is completely platform-agnostic, you could completely swap out a Java based server
 * solution and replace it with one that uses C# without changing the client side JavaScript at all.
 *
 * # Server side events
 *
 * Custom events from the server may be handled by the client by adding listeners, for example:
 *
 *     {"type":"event","name":"message","data":"Successfully polled at: 11:19:30 am"}
 *
 *     // add a handler for a 'message' event sent by the server
 *     Ext.direct.Manager.on('message', function(e){
 *         out.append(String.format('<p><i>{0}</i></p>', e.data));
 *         out.el.scrollTo('t', 100000, true);
 *     });
 *
 *    [1]: http://sencha.com/products/extjs/extdirect
 *
 * @singleton
 * @alternateClassName Ext.Direct
 */

Ext.define('Ext.direct.Manager', {
    singleton: true,

    requires: [
        'Ext.util.MixedCollection'
    ],

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * Exception types.
     */
    exceptions: {
        TRANSPORT: 'xhr',
        PARSE: 'parse',
        DATA: 'data',
        LOGIN: 'login',
        SERVER: 'exception'
    },
    
    /**
     * @event event
     *
     * Fires after an event.
     *
     * @param {Ext.direct.Event} event The Ext.direct.Event type that occurred.
     * @param {Ext.direct.Provider} provider The {@link Ext.direct.Provider Provider}.
     */

    /**
     * @event exception
     *
     * Fires after an event exception.
     *
     * @param {Ext.direct.Event} event The event type that occurred.
     */

    constructor: function() {
        var me = this;

        me.transactions = new Ext.util.MixedCollection();
        me.providers    = new Ext.util.MixedCollection();

        me.mixins.observable.constructor.call(me);
    },

    /**
     * Adds an Ext.Direct Provider and creates the proxy or stub methods to execute server-side methods. If the provider
     * is not already connected, it will auto-connect.
     *
     *      var pollProv = new Ext.direct.PollingProvider({
     *          url: 'php/poll2.php'
     *      });
     *
     *      Ext.direct.Manager.addProvider({
     *          type: 'remoting',           // create a {@link Ext.direct.RemotingProvider}
     *          url:  'php/router.php',     // url to connect to the Ext.Direct server-side router.
     *          actions: {                  // each property within the actions object represents a Class
     *              TestAction: [{          // array of methods within each server side Class
     *                  name: 'doEcho',     // name of method
     *                  len:  1
     *              }, {
     *                  name: 'multiply',
     *                  len:  1
     *              }, {
     *                  name: 'doForm',
     *                  formHandler: true   // handle form on server with Ext.Direct.Transaction
     *              }]
     *          },
     *          namespace: 'myApplication', // namespace to create the Remoting Provider in
     *      }, {
     *          type: 'polling',            // create a {@link Ext.direct.PollingProvider}
     *          url:  'php/poll.php'
     *      },
     *      pollProv);                      // reference to previously created instance
     *
     * @param {Ext.direct.Provider/Object...} provider
     * Accepts any number of Provider descriptions (an instance or config object for
     * a Provider). Each Provider description instructs Ext.Direct how to create
     * client-side stub methods.
     */
    addProvider: function(provider) {
        var me = this,
            args = arguments,
            relayers = me.relayers || (me.relayers = {}),
            i, len;

        if (args.length > 1) {
            for (i = 0, len = args.length; i < len; ++i) {
                me.addProvider(args[i]);
            }
            
            return;
        }

        // if provider has not already been instantiated
        if (!provider.isProvider) {
            provider = Ext.create('direct.' + provider.type + 'provider', provider);
        }
        
        me.providers.add(provider);
        provider.on('data', me.onProviderData, me);
        
        if (provider.relayedEvents) {
            relayers[provider.id] = me.relayEvents(provider, provider.relayedEvents);
        }

        if (!provider.isConnected()) {
            provider.connect();
        }

        return provider;
    },

    /**
     * Retrieves a {@link Ext.direct.Provider provider} by the **{@link Ext.direct.Provider#id id}** specified when the
     * provider is {@link #addProvider added}.
     *
     * @param {String/Ext.direct.Provider} id The id of the provider, or the provider instance.
     */
    getProvider: function(id) {
        return id.isProvider ? id : this.providers.get(id);
    },

    /**
     * Removes the provider.
     *
     * @param {String/Ext.direct.Provider} provider The provider instance or the id of the provider.
     *
     * @return {Ext.direct.Provider} The provider, null if not found.
     */
    removeProvider: function(provider) {
        var me = this,
            providers = me.providers,
            relayers = me.relayers,
            id;

        provider = provider.isProvider ? provider : providers.get(provider);

        if (provider) {
            provider.un('data', me.onProviderData, me);

            id = provider.id;
            
            if (relayers[id]) {
                relayers[id].destroy();
                delete relayers[id];
            }
            
            providers.remove(provider);
            
            return provider;
        }
        
        return null;
    },

    /**
     * Adds a transaction to the manager.
     *
     * @param {Ext.direct.Transaction} transaction The transaction to add
     *
     * @return {Ext.direct.Transaction} transaction
     *
     * @private
     */
    addTransaction: function(transaction) {
        this.transactions.add(transaction);
        
        return transaction;
    },

    /**
     * Removes a transaction from the manager.
     *
     * @param {String/Ext.direct.Transaction} transaction The transaction/id of transaction to remove
     *
     * @return {Ext.direct.Transaction} transaction
     *
     * @private
     */
    removeTransaction: function(transaction) {
        var me = this;
        
        transaction = me.getTransaction(transaction);
        me.transactions.remove(transaction);
        
        return transaction;
    },

    /**
     * Gets a transaction
     *
     * @param {String/Ext.direct.Transaction} transaction The transaction/id of transaction to get
     *
     * @return {Ext.direct.Transaction}
     *
     * @private
     */
    getTransaction: function(transaction) {
        return typeof transaction === 'object' ? transaction : this.transactions.get(transaction);
    },

    onProviderData: function(provider, event) {
        var me = this,
            i, len;

        if (Ext.isArray(event)) {
            for (i = 0, len = event.length; i < len; ++i) {
                me.onProviderData(provider, event[i]);
            }
            
            return;
        }
        
        if (event.name && event.name != 'event' && event.name != 'exception') {
            me.fireEvent(event.name, event);
        }
        else if (event.status === false) {
            me.fireEvent('exception', event);
        }
        
        me.fireEvent('event', event, provider);
    },
    
    /**
     * Parses a direct function. It may be passed in a string format, for example:
     * "MyApp.Person.read".
     *
     * @param {String/Function} fn The direct function
     *
     * @return {Function} The function to use in the direct call. Null if not found
     *
     * @protected
     */
    parseMethod: function(fn) {
        if (Ext.isString(fn)) {
            var parts = fn.split('.'),
                i = 0,
                len = parts.length,
                current = Ext.global;
                
            while (current && i < len) {
                current = current[parts[i]];
                ++i;
            }
            
            fn = Ext.isFunction(current) ? current : null;
        }
        
        return fn || null;
    }
    
}, function() {
    // Backwards compatibility
    Ext.Direct = Ext.direct.Manager;
});
