/**
 * @author Ed Spencer
 *
 * AjaxProxy is one of the most widely-used ways of getting data into your application. It uses AJAX requests to load
 * data from the server, usually to be placed into a {@link Ext.data.Store Store}. Let's take a look at a typical setup.
 * Here we're going to set up a Store that has an AjaxProxy. To prepare, we'll also set up a {@link Ext.data.Model
 * Model}:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'name', 'email']
 *     });
 *
 *     //The Store contains the AjaxProxy as an inline configuration
 *     var store = Ext.create('Ext.data.Store', {
 *         model: 'User',
 *         proxy: {
 *             type: 'ajax',
 *             url : 'users.json'
 *         }
 *     });
 *
 *     store.load();
 *
 * Our example is going to load user data into a Store, so we start off by defining a {@link Ext.data.Model Model} with
 * the fields that we expect the server to return. Next we set up the Store itself, along with a
 * {@link Ext.data.Store#proxy proxy} configuration. This configuration was automatically turned into an
 * Ext.data.proxy.Ajax instance, with the url we specified being passed into AjaxProxy's constructor.
 * It's as if we'd done this:
 *
 *     new Ext.data.proxy.Ajax({
 *         url: 'users.json',
 *         model: 'User',
 *         reader: 'json'
 *     });
 *
 * A couple of extra configurations appeared here - {@link #model} and {@link #reader}. These are set by default when we
 * create the proxy via the Store - the Store already knows about the Model, and Proxy's default {@link
 * Ext.data.reader.Reader Reader} is {@link Ext.data.reader.Json JsonReader}.
 *
 * Now when we call store.load(), the AjaxProxy springs into action, making a request to the url we configured
 * ('users.json' in this case). As we're performing a read, it sends a GET request to that url (see
 * {@link #actionMethods} to customize this - by default any kind of read will be sent as a GET request and any kind of write
 * will be sent as a POST request).
 *
 * # Limitations
 *
 * AjaxProxy cannot be used to retrieve data from other domains. If your application is running on http://domainA.com it
 * cannot load data from http://domainB.com because browsers have a built-in security policy that prohibits domains
 * talking to each other via AJAX.
 *
 * If you need to read data from another domain and can't set up a proxy server (some software that runs on your own
 * domain's web server and transparently forwards requests to http://domainB.com, making it look like they actually came
 * from http://domainA.com), you can use {@link Ext.data.proxy.JsonP} and a technique known as JSON-P (JSON with
 * Padding), which can help you get around the problem so long as the server on http://domainB.com is set up to support
 * JSON-P responses. See {@link Ext.data.proxy.JsonP JsonPProxy}'s introduction docs for more details.
 *
 * # Readers and Writers
 *
 * AjaxProxy can be configured to use any type of {@link Ext.data.reader.Reader Reader} to decode the server's response.
 * If no Reader is supplied, AjaxProxy will default to using a {@link Ext.data.reader.Json JsonReader}. Reader
 * configuration can be passed in as a simple object, which the Proxy automatically turns into a {@link
 * Ext.data.reader.Reader Reader} instance:
 *
 *     var proxy = new Ext.data.proxy.Ajax({
 *         model: 'User',
 *         reader: {
 *             type: 'xml',
 *             rootProperty: 'users'
 *         }
 *     });
 *
 *     proxy.getReader(); //returns an {@link Ext.data.reader.Xml XmlReader} instance based on the config we supplied
 *
 * # Url generation
 *
 * AjaxProxy automatically inserts any sorting, filtering, paging and grouping options into the url it generates for
 * each request. These are controlled with the following configuration options:
 *
 * - {@link #pageParam} - controls how the page number is sent to the server (see also {@link #startParam} and {@link #limitParam})
 * - {@link #sortParam} - controls how sort information is sent to the server
 * - {@link #groupParam} - controls how grouping information is sent to the server
 * - {@link #filterParam} - controls how filter information is sent to the server
 *
 * Each request sent by AjaxProxy is described by an {@link Ext.data.operation.Operation Operation}. To see how we can customize
 * the generated urls, let's say we're loading the Proxy with the following Operation:
 *
 *     var proxy = new Ext.data.proxy.Ajax({
 *         url: '/users'
 *     });
 *
 *     var operation = proxy.createOperation('read', {
 *         page  : 2
 *     });
 *
 * Now we'll issue the request for this Operation by calling {@link #read}:
 *
 *     proxy.read(operation); //GET /users?page=2
 *
 * Easy enough - the Proxy just copied the page property from the Operation. We can customize how this page data is sent
 * to the server:
 *
 *     var proxy = new Ext.data.proxy.Ajax({
 *         url: '/users',
 *         pageParam: 'pageNumber'
 *     });
 *
 *     proxy.read(operation); //GET /users?pageNumber=2
 *
 * Alternatively, our Operation could have been configured to send start and limit parameters instead of page:
 *
 *     var proxy = new Ext.data.proxy.Ajax({
 *         url: '/users'
 *     });
 *
 *     var operation = proxy.createOperation('read', {
 *         start : 50,
 *         limit : 25
 *     });
 *
 *     proxy.read(operation); //GET /users?start=50&limit;=25
 *
 * Again we can customize this url:
 *
 *     var proxy = new Ext.data.proxy.Ajax({
 *         url: '/users',
 *         startParam: 'startIndex',
 *         limitParam: 'limitIndex'
 *     });
 *
 *     proxy.read(operation); //GET /users?startIndex=50&limitIndex;=25
 *
 * AjaxProxy will also send sort and filter information to the server. Let's take a look at how this looks with a more
 * expressive Operation object:
 *
 *     var operation = proxy.createOperation('read', {
 *         sorters: [
 *             new Ext.util.Sorter({
 *                 property : 'name',
 *                 direction: 'ASC'
 *             }),
 *             new Ext.util.Sorter({
 *                 property : 'age',
 *                 direction: 'DESC'
 *             })
 *         ],
 *         filters: [
 *             new Ext.util.Filter({
 *                 property: 'eyeColor',
 *                 value   : 'brown'
 *             })
 *         ]
 *     });
 *
 * This is the type of object that is generated internally when loading a {@link Ext.data.Store Store} with sorters and
 * filters defined. By default the AjaxProxy will JSON encode the sorters and filters, resulting in something like this
 * (note that the url is escaped before sending the request, but is left unescaped here for clarity):
 *
 *     var proxy = new Ext.data.proxy.Ajax({
 *         url: '/users'
 *     });
 *
 *     proxy.read(operation); //GET /users?sort=[{"property":"name","direction":"ASC"},{"property":"age","direction":"DESC"}]&filter;=[{"property":"eyeColor","value":"brown"}]
 *
 * We can again customize how this is created by supplying a few configuration options. Let's say our server is set up
 * to receive sorting information is a format like "sortBy=name#ASC,age#DESC". We can configure AjaxProxy to provide
 * that format like this:
 *
 *      var proxy = new Ext.data.proxy.Ajax({
 *          url: '/users',
 *          sortParam: 'sortBy',
 *          filterParam: 'filterBy',
 *
 *          //our custom implementation of sorter encoding - turns our sorters into "name#ASC,age#DESC"
 *          encodeSorters: function(sorters) {
 *              var length   = sorters.length,
 *                  sortStrs = [],
 *                  sorter, i;
 *
 *              for (i = 0; i < length; i++) {
 *                  sorter = sorters[i];
 *
 *                  sortStrs[i] = sorter.property + '#' + sorter.direction
 *              }
 *
 *              return sortStrs.join(",");
 *          }
 *      });
 *
 *      proxy.read(operation); //GET /users?sortBy=name#ASC,age#DESC&filterBy;=[{"property":"eyeColor","value":"brown"}]
 *
 * We can also provide a custom {@link #encodeFilters} function to encode our filters.
 *
 * # Debugging your Ajax Proxy
 *
 * If the data is not being loaded into the store as expected, it could be due to a mismatch between the the way that the {@link #reader}
 * is configured, and the shape of the incoming data.
 *
 * To debug from the point that your data arrives back from the network, set a breakpoint inside the callback function
 * created in the `createRequestCallback` method of the Ajax Proxy class, and follow the data to where the {@link #reader} attempts
 * to consume it.
 *
 * @constructor
 * Note that if this HttpProxy is being used by a {@link Ext.data.Store Store}, then the Store's call to
 * {@link Ext.data.Store#method-load load} will override any specified callback and params options. In this case, use the
 * {@link Ext.data.Store Store}'s events to modify parameters, or react to loading events.
 *
 * @param {Object} config (optional) Config object.
 * If an options parameter is passed, the singleton {@link Ext.Ajax} object will be used to make the request.
 */
Ext.define('Ext.data.proxy.Ajax', {
    requires: ['Ext.Ajax'],
    extend: 'Ext.data.proxy.Server',
    alias: 'proxy.ajax',
    alternateClassName: ['Ext.data.HttpProxy', 'Ext.data.AjaxProxy'],
    
    // Keep a default copy of the action methods here. Ideally could just null
    // out actionMethods and just check if it exists & has a property, otherwise
    // fallback to the default. But at the moment it's defined as a public property,
    // so we need to be able to maintain the ability to modify/access it. 
    defaultActionMethods: {
        create : 'POST',
        read   : 'GET',
        update : 'POST',
        destroy: 'POST'    
    },

    config: {
        /**
        * @cfg {Boolean} binary
        * True to request binary data from the server.  This feature requires
        * the use of a binary reader such as {@link Ext.data.amf.Reader AMF Reader}
        */
        binary: false,
    
        /**
         * @cfg {Object} [headers]
         * Any headers to add to the Ajax request.
         *
         * example:
         *
         *     proxy: {
         *         headers: {'Content-Type': "text/plain" }
         *         ...
         *     }
         */
       headers: undefined,
    
        /**
        * @cfg {Boolean} paramsAsJson `true` to have any request parameters sent as {@link Ext.data.Connection#method-request jsonData} 
        * where they can be parsed from the raw request. By default, parameters are sent via the 
        * {@link Ext.data.Connection#method-request params} property. **Note**: This setting does not apply when the
        * request is sent as a 'GET' request. See {@link #actionMethods} for controlling the HTTP verb
        * that is used when sending requests.
        */
        paramsAsJson: false,
        
        /**
         * @cfg {Boolean} withCredentials
         * This configuration is sometimes necessary when using cross-origin resource sharing.
         * @accessor
         */
        withCredentials: false,

        /**
         * @cfg {Boolean} useDefaultXhrHeader
         * Set this to false to not send the default Xhr header (X-Requested-With) with every request.
         * This should be set to false when making CORS (cross-domain) requests.
         * @accessor
         */
        useDefaultXhrHeader: true,

        /**
         * @cfg {String} username
         * Most oData feeds require basic HTTP authentication. This configuration allows
         * you to specify the username.
         * @accessor
         */
        username: null,

        /**
         * @cfg {String} password
         * Most oData feeds require basic HTTP authentication. This configuration allows
         * you to specify the password.
         * @accessor
         */
        password: null,
        
        /**
        * @cfg {Object} actionMethods
        * Mapping of action name to HTTP request method. In the basic AjaxProxy these are set to 'GET' for 'read' actions
        * and 'POST' for 'create', 'update' and 'destroy' actions. The {@link Ext.data.proxy.Rest} maps these to the
        * correct RESTful methods.
        */
        actionMethods: {
            create : 'POST',
            read   : 'GET',
            update : 'POST',
            destroy: 'POST'
        }
    },
    
    doRequest: function(operation) {
        var me = this,
            writer  = me.getWriter(),
            request = me.buildRequest(operation),
            method  = me.getMethod(request),
            jsonData, params;
            
        if (writer && operation.allowWrite()) {
            request = writer.write(request);
        }
        
        request.setConfig({
            binary              : me.getBinary(),
            headers             : me.getHeaders(),
            timeout             : me.getTimeout(),
            scope               : me,
            callback            : me.createRequestCallback(request, operation),
            method              : method,
            useDefaultXhrHeader : me.getUseDefaultXhrHeader(),
            disableCaching      : false // explicitly set it to false, ServerProxy handles caching
        });
        
        if (method.toUpperCase() !== 'GET' && me.getParamsAsJson()) {
            params = request.getParams();

            if (params) {
                jsonData = request.getJsonData();
                if (jsonData) {
                    jsonData = Ext.Object.merge({}, jsonData, params);
                } else {
                    jsonData = params;
                }
                request.setJsonData(jsonData);
                request.setParams(undefined);
            }
        }
        
        if (me.getWithCredentials()) {
            request.setWithCredentials(true);
            request.setUsername(me.getUsername());
            request.setPassword(me.getPassword());
        }
        return me.sendRequest(request);
    },
    
    /**
     * Fires a request
     * @param {Ext.data.Request} The request
     * @return {Ext.data.Request} The request
     * @private
     */
    sendRequest: function(request) {
        request.setRawRequest(Ext.Ajax.request(request.getCurrentConfig()));
        this.lastRequest = request;
        
        return request;
    },
    
    /**
     * Aborts a running request.
     * @param {Ext.data.Request} [request] The request to abort. If not passed, the most recent active
     * request will be aborted.
     */
    abort: function(request) {
        request = request || this.lastRequest;
        if (request) {
            Ext.Ajax.abort(request.getRawRequest());
        }    
    },
    
    /**
     * Returns the HTTP method name for a given request. By default this returns based on a lookup on
     * {@link #actionMethods}.
     * @param {Ext.data.Request} request The request object
     * @return {String} The HTTP method to use (should be one of 'GET', 'POST', 'PUT' or 'DELETE')
     */
    getMethod: function(request) {
        var actions = this.getActionMethods(),
            action = request.getAction(),
            method;
            
        if (actions) {
            method = actions[action];
        }
        return method || this.defaultActionMethods[action];
    },
    
    /**
     * @private
     * TODO: This is currently identical to the JsonPProxy version except for the return function's signature. There is a lot
     * of code duplication inside the returned function so we need to find a way to DRY this up.
     * @param {Ext.data.Request} request The Request object
     * @param {Ext.data.operation.Operation} operation The Operation being executed
     * @return {Function} The callback function
     */
    createRequestCallback: function(request, operation) {
        var me = this;
        
        return function(options, success, response) {
            if (request === me.lastRequest) {
                me.lastRequest = null;
            }
            me.processResponse(success, operation, request, response);
        };
    }
});
