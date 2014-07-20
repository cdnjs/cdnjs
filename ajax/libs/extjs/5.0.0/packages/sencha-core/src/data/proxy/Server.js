/**
 * ServerProxy is a superclass of {@link Ext.data.proxy.JsonP JsonPProxy} and {@link Ext.data.proxy.Ajax AjaxProxy}, and
 * would not usually be used directly.
 * @protected
 */
Ext.define('Ext.data.proxy.Server', {
    extend: 'Ext.data.proxy.Proxy',
    alias : 'proxy.server',
    alternateClassName: 'Ext.data.ServerProxy',
    uses  : ['Ext.data.Request'],
    
    isRemote: true,

    config: {
        /**
         * @cfg {String} url
         * The URL from which to request the data object.
         */
        url: '',
    
        /**
         * @cfg {String} [pageParam="page"]
         * The name of the 'page' parameter to send in a request. Defaults to 'page'. Set this to `''` if you don't
         * want to send a page parameter.
         */
        pageParam: 'page',
    
        /**
         * @cfg {String} [startParam="start"]
         * The name of the 'start' parameter to send in a request. Defaults to 'start'. Set this to `''` if you don't
         * want to send a start parameter.
         */
        startParam: 'start',
    
        /**
         * @cfg {String} [limitParam="limit"]
         * The name of the 'limit' parameter to send in a request. Defaults to 'limit'. Set this to `''` if you don't
         * want to send a limit parameter.
         */
        limitParam: 'limit',
    
        /**
         * @cfg {String} [groupParam="group"]
         * The name of the 'group' parameter to send in a request. Defaults to 'group'. Set this to `''` if you don't
         * want to send a group parameter.
         */
        groupParam: 'group',
    
        /**
         * @cfg {String} [groupDirectionParam="groupDir"]
         * The name of the direction parameter to send in a request. **This is only used when simpleGroupMode is set to
         * true.**
         */
        groupDirectionParam: 'groupDir',
    
        /**
         * @cfg {String} [sortParam="sort"]
         * The name of the 'sort' parameter to send in a request. Defaults to 'sort'. Set this to `''` if you don't
         * want to send a sort parameter.
         */
        sortParam: 'sort',
    
        /**
         * @cfg {String} [filterParam="filter"]
         * The name of the 'filter' parameter to send in a request. Defaults to 'filter'. Set this to `''` if you don't
         * want to send a filter parameter.
         */
        filterParam: 'filter',
    
        /**
         * @cfg {String} [directionParam="dir"]
         * The name of the direction parameter to send in a request. **This is only used when simpleSortMode is set to
         * true.**
         */
        directionParam: 'dir',
    
        /**
         * @cfg {String} [idParam="id"]
         * The name of the parameter which carries the id of the entity being operated upon.
         */
        idParam: 'id',
    
        /**
         * @cfg {Boolean} [simpleSortMode=false]
         * Enabling simpleSortMode in conjunction with remoteSort will only send one sort property and a direction when a
         * remote sort is requested. The {@link #directionParam} and {@link #sortParam} will be sent with the property name
         * and either 'ASC' or 'DESC'.
         */
        simpleSortMode: false,
    
        /**
         * @cfg {Boolean} [simpleGroupMode=false]
         * Enabling simpleGroupMode in conjunction with remoteGroup will only send one group property and a direction when a
         * remote group is requested. The {@link #groupDirectionParam} and {@link #groupParam} will be sent with the property name and either 'ASC'
         * or 'DESC'.
         */
        simpleGroupMode: false,
    
        /**
         * @cfg {Boolean} [noCache=true]
         * Disable caching by adding a unique parameter name to the request. Set to false to allow caching. Defaults to true.
         */
        noCache : true,
    
        /**
         * @cfg {String} [cacheString="_dc"]
         * The name of the cache param added to the url when using noCache. Defaults to "_dc".
         */
        cacheString: "_dc",
    
        /**
         * @cfg {Number} timeout
         * The number of milliseconds to wait for a response. Defaults to 30000 milliseconds (30 seconds).
         */
        timeout : 30000,
    
        /**
         * @cfg {Object} api
         * Specific urls to call on CRUD action methods "create", "read", "update" and "destroy". Defaults to:
         *
         *     api: {
         *         create  : undefined,
         *         read    : undefined,
         *         update  : undefined,
         *         destroy : undefined
         *     }
         *
         * The url is built based upon the action being executed [create|read|update|destroy] using the commensurate
         * {@link #api} property, or if undefined default to the configured
         * {@link Ext.data.Store}.{@link Ext.data.proxy.Server#url url}.
         *
         * For example:
         *
         *     api: {
         *         create  : '/controller/new',
         *         read    : '/controller/load',
         *         update  : '/controller/update',
         *         destroy : '/controller/destroy_action'
         *     }
         *
         * If the specific URL for a given CRUD action is undefined, the CRUD action request will be directed to the
         * configured {@link Ext.data.proxy.Server#url url}.
         */
        api: {
            create  : undefined,
            read    : undefined,
            update  : undefined,
            destroy : undefined
        },

        /**
         * @cfg {Object} extraParams
         * Extra parameters that will be included on every request. Individual requests with params of the same name
         * will override these params when they are in conflict.
         */
        extraParams: {}
    },

    /**
     * @event exception
     * Fires when the server returns an exception. This event may also be listened
     * to in the event that a request has timed out or has been aborted.
     * @param {Ext.data.proxy.Proxy} this
     * @param {Ext.data.Request} request The request that was sent
     * @param {Ext.data.operation.Operation} operation The operation that triggered the request
     */

    //in a ServerProxy all four CRUD operations are executed in the same manner, so we delegate to doRequest in each case
    create: function() {
        return this.doRequest.apply(this, arguments);
    },

    read: function() {
        return this.doRequest.apply(this, arguments);
    },

    update: function() {
        return this.doRequest.apply(this, arguments);
    },

    erase: function() {
        return this.doRequest.apply(this, arguments);
    },

    /**
     * Sets a value in the underlying {@link #extraParams}.
     * @param {String} name The key for the new value
     * @param {Object} value The value
     */
    setExtraParam: function(name, value) {
        this.getExtraParams()[name] = value;
    },

    /**
     * Creates an {@link Ext.data.Request Request} object from {@link Ext.data.operation.Operation Operation}.
     *
     * This gets called from doRequest methods in subclasses of Server proxy.
     * 
     * @param {Ext.data.operation.Operation} operation The operation to execute
     * @return {Ext.data.Request} The request object
     */
    buildRequest: function(operation) {
        var me = this,
            initialParams = Ext.apply({}, operation.getParams()),
            // Clone params right now so that they can be mutated at any point further down the call stack
            params = Ext.applyIf(initialParams, me.getExtraParams() || {}),
            request,
            operationId,
            idParam;

        //copy any sorters, filters etc into the params so they can be sent over the wire
        Ext.applyIf(params, me.getParams(operation));

        // Set up the entity id parameter according to the configured name.
        // This defaults to "id". But TreeStore has a "nodeParam" configuration which
        // specifies the id parameter name of the node being loaded.
        operationId = operation.getId();
        idParam = me.getIdParam();
        if (operationId !== undefined && params[idParam] === undefined) {
            params[idParam] = operationId;
        }

        request = new Ext.data.Request({
            params   : params,
            action   : operation.getAction(),
            records  : operation.getRecords(),
            operation: operation,

            // this is needed by JsonSimlet in order to properly construct responses for
            // requests from this proxy
            proxy: me
        });

        request.setUrl(me.buildUrl(request));

        /*
         * Save the request on the Operation. Operations don't usually care about Request and Response data, but in the
         * ServerProxy and any of its subclasses we add both request and response as they may be useful for further processing
         */
        operation.setRequest(request);

        return request;
    },

    // Should this be documented as protected method?
    processResponse: function(success, operation, request, response) {
        var me = this,
            exception, reader, resultSet;

        if (success === true) {
            reader = me.getReader();

            resultSet = reader.read(me.extractResponseData(response), {
                // If we're doing an update, we want to construct the models ourselves.
                recordCreator: operation.getRecordCreator()
            });

            operation.process(resultSet, request, response);
            exception = !operation.wasSuccessful();
        } else {
            me.setException(operation, response);
            exception = true;
        }
        
        if (exception) {
            me.fireEvent('exception', me, response, operation);
        }

        me.afterRequest(request, success);
    },
    
    /**
     * Sets up an exception on the operation
     * @private
     * @param {Ext.data.operation.Operation} operation The operation
     * @param {Object} response The response
     */
    setException: function(operation, response) {
        operation.setException({
            status: response.status,
            statusText: response.statusText,
            response: response
        });
    },

    /**
     * Template method to allow subclasses to specify how to get the response for the reader.
     * @template
     * @private
     * @param {Object} response The server response
     * @return {Object} The response data to be used by the reader
     */
    extractResponseData: Ext.identityFn,

    /**
     * Encode any values being sent to the server. Can be overridden in subclasses.
     * @protected
     * @param {Array} value An array of sorters/filters.
     * @return {Object} The encoded value
     */
    applyEncoding: function(value) {
        return Ext.encode(value);
    },

    /**
     * Encodes the array of {@link Ext.util.Sorter} objects into a string to be sent in the request url. By default,
     * this simply JSON-encodes the sorter data
     * @param {Ext.util.Sorter[]} sorters The array of {@link Ext.util.Sorter Sorter} objects
     * @param {Boolean} [preventArray=false] Prevents the items from being output as an array.
     * @return {String} The encoded sorters
     */
    encodeSorters: function(sorters, preventArray) {
        var out = [],
            length = sorters.length, 
            i;
        
        for (i = 0; i < length; i++) {
            out[i] = sorters[i].serialize();
        }

        return this.applyEncoding(preventArray ? out[0] : out);
    },

    /**
     * Encodes the array of {@link Ext.util.Filter} objects into a string to be sent in the request url. By default,
     * this simply JSON-encodes the filter data
     * @param {Ext.util.Filter[]} filters The array of {@link Ext.util.Filter Filter} objects
     * @return {String} The encoded filters
     */
    encodeFilters: function(filters) {
        var out = [],
            length = filters.length,
            i, op;

        for (i = 0; i < length; i++) {
            out[i] = filters[i].serialize();
        }

        return this.applyEncoding(out);
    },

    /**
     * @private
     * Copy any sorters, filters etc into the params so they can be sent over the wire
     */
    getParams: function(operation) {
        if (!operation.isReadOperation) {
            return {};
        }

        var me = this,
            params = {},
            grouper = operation.getGrouper(),
            sorters = operation.getSorters(),
            filters = operation.getFilters(),
            page = operation.getPage(),
            start = operation.getStart(),
            limit = operation.getLimit(),
            simpleSortMode = me.getSimpleSortMode(),
            simpleGroupMode = me.getSimpleGroupMode(),
            pageParam = me.getPageParam(),
            startParam = me.getStartParam(),
            limitParam = me.getLimitParam(),
            groupParam = me.getGroupParam(),
            groupDirectionParam = me.getGroupDirectionParam(),
            sortParam = me.getSortParam(),
            filterParam = me.getFilterParam(),
            directionParam = me.getDirectionParam(),
            hasGroups, index;

        if (pageParam && page) {
            params[pageParam] = page;
        }

        if (startParam && (start || start === 0)) {
            params[startParam] = start;
        }

        if (limitParam && limit) {
            params[limitParam] = limit;
        }

        hasGroups = groupParam && grouper;
        if (hasGroups) {
            // Grouper is a subclass of sorter, so we can just use the sorter method
            if (simpleGroupMode) {
                params[groupParam] = grouper.getProperty();
                params[groupDirectionParam] = grouper.getDirection();
            } else {
                params[groupParam] = me.encodeSorters([grouper], true);
            }
        }

        if (sortParam && sorters && sorters.length > 0) {
            if (simpleSortMode) {
                index = 0;
                // Group will be included in sorters, so grab the next one
                if (sorters.length > 1 && hasGroups) {
                    index = 1;
                }
                params[sortParam] = sorters[index].getProperty();
                params[directionParam] = sorters[index].getDirection();
            } else {
                params[sortParam] = me.encodeSorters(sorters);
            }

        }

        if (filterParam && filters && filters.length > 0) {
            params[filterParam] = me.encodeFilters(filters);
        }

        return params;
    },

    /**
     * Generates a url based on a given Ext.data.Request object. By default, ServerProxy's buildUrl will add the
     * cache-buster param to the end of the url. Subclasses may need to perform additional modifications to the url.
     * @param {Ext.data.Request} request The request object
     * @return {String} The url
     */
    buildUrl: function(request) {
        var me = this,
            url = me.getUrl(request);

        //<debug>
        if (!url) {
            Ext.Error.raise("You are using a ServerProxy but have not supplied it with a url.");
        }
        //</debug>

        if (me.getNoCache()) {
            url = Ext.urlAppend(url, Ext.String.format("{0}={1}", me.getCacheString(), Ext.Date.now()));
        }

        return url;
    },

    /**
     * Get the url for the request taking into account the order of priority,
     * - The request
     * - The api
     * - The url
     * @private
     * @param {Ext.data.Request} request The request
     * @return {String} The url
     */
    getUrl: function(request) {
        var url;
        if (request) {
            url = request.getUrl() || this.getApi()[request.getAction()];
        }
        return url ? url : this.callParent();
    },

    /**
     * In ServerProxy subclasses, the {@link #create}, {@link #read}, {@link #update} and {@link #erase} methods all
     * pass through to doRequest. Each ServerProxy subclass must implement the doRequest method - see {@link
     * Ext.data.proxy.JsonP} and {@link Ext.data.proxy.Ajax} for examples. This method carries the same signature as
     * each of the methods that delegate to it.
     *
     * @param {Ext.data.operation.Operation} operation The Ext.data.operation.Operation object
     * @param {Function} callback The callback function to call when the Operation has completed
     * @param {Object} scope The scope in which to execute the callback
     */
    doRequest: function(operation) {
        //<debug>
        Ext.Error.raise("The doRequest function has not been implemented on your Ext.data.proxy.Server subclass. See src/data/ServerProxy.js for details");
        //</debug>
    },

    /**
     * Optional callback function which can be used to clean up after a request has been completed.
     * @param {Ext.data.Request} request The Request object
     * @param {Boolean} success True if the request was successful
     * @protected
     * @template
     * @method
     */
    afterRequest: Ext.emptyFn,

    onDestroy: function() {
        Ext.destroy(this.getReader(), this.getWriter());
    }
});
