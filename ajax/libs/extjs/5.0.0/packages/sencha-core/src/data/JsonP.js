/**
 * @class Ext.data.JsonP
 * @singleton
 * This class is used to create JSONP requests. JSONP is a mechanism that allows for making
 * requests for data cross domain. JSONP is basically a `<script>` node with the source of the url executing
 * a function that was created by Ext.data.JsonP. Once the resource has loaded, the `<script>` node will be destroyed.
 *
 * If you have a request such as:
 *
 *     Ext.data.JsonP.request({
 *         url : 'foo.php'
 *     });
 *
 * Ext.data.JsonP will create a `<script>` node in the `<head>` with the `src` attribute pointing to
 * `foo.php?callback=Ext.data.JsonP.callback1`. The `foo.php` script will have to detect the `callback` URL parameter
 * and return valid JavaScript:
 *
 *     Ext.data.JsonP.callback1({"foo":"bar"});
 *
 * A simple PHP example would look like:
 *
 *     <?php
 *
 *     $data = array('foo' => 'bar');
 *
 *     if (!empty($_REQUEST['callback'])) {
 *         header('Content-Type: application/javascript');
 *         echo $_REQUEST['callback'] . '(';
 *     }
 *
 *     echo json_encode($data);
 *
 *     if (!empty($_REQUEST['callback']) {
 *         echo ');';
 *     }
 *
 *     ?>
 *
 * More information is available <a href="http://en.wikipedia.org/wiki/JSONP">here</a>. You can also use <a href="http://www.jsonplint.com">JSONPLint</a> to test your JSONP.
 */
Ext.define('Ext.data.JsonP', {

    /* Begin Definitions */

    singleton: true,

    /* End Definitions */

    /**
     * Number of requests done so far.
     * @private
     */
    requestCount: 0,

    /**
     * Hash of pending requests.
     * @private
     */
    requests: {},

    /**
     * @property timeout
     * @type Number
     * A default timeout for any JsonP requests. If the request has not completed in this time the
     * failure callback will be fired. The timeout is in ms. Defaults to <tt>30000</tt>.
     */
    timeout: 30000,

    /**
     * @property disableCaching
     * @type Boolean
     * True to add a unique cache-buster param to requests. Defaults to <tt>true</tt>.
     */
    disableCaching: true,

    /**
     * @property disableCachingParam
     * @type String
     * Change the parameter which is sent went disabling caching through a cache buster. Defaults to <tt>'_dc'</tt>.
     */
    disableCachingParam: '_dc',

    /**
     * @property callbackKey
     * @type String
     * Specifies the GET parameter that will be sent to the server containing the function name to be executed when
     * the request completes. Defaults to <tt>callback</tt>. Thus, a common request will be in the form of
     * url?callback=Ext.data.JsonP.callback1
     */
    callbackKey: 'callback',

    /**
     * Makes a JSONP request.
     * @param {Object} options An object which may contain the following properties. Note that options will
     * take priority over any defaults that are specified in the class.
     * <ul>
     * <li><b>url</b> : String <div class="sub-desc">The URL to request.</div></li>
     * <li><b>params</b> : Object (Optional)<div class="sub-desc">An object containing a series of
     * key value pairs that will be sent along with the request.</div></li>
     * <li><b>timeout</b> : Number (Optional) <div class="sub-desc">See {@link #timeout}</div></li>
     * <li><b>callbackKey</b> : String (Optional) <div class="sub-desc">See {@link #callbackKey}</div></li>
     * <li><b>callbackName</b> : String (Optional) <div class="sub-desc">The function name to use for this request.
     * By default this name will be auto-generated: Ext.data.JsonP.callback1, Ext.data.JsonP.callback2, etc.
     * Setting this option to "my_name" will force the function name to be Ext.data.JsonP.my_name.
     * Use this if you want deterministic behavior, but be careful - the callbackName should be different
     * in each JsonP request that you make.</div></li>
     * <li><b>disableCaching</b> : Boolean (Optional) <div class="sub-desc">See {@link #disableCaching}</div></li>
     * <li><b>disableCachingParam</b> : String (Optional) <div class="sub-desc">See {@link #disableCachingParam}</div></li>
     * <li><b>success</b> : Function (Optional) <div class="sub-desc">A function to execute if the request succeeds.</div></li>
     * <li><b>failure</b> : Function (Optional) <div class="sub-desc">A function to execute if the request fails.</div></li>
     * <li><b>callback</b> : Function (Optional) <div class="sub-desc">A function to execute when the request
     * completes, whether it is a success or failure.</div></li>
     * <li><b>scope</b> : Object (Optional)<div class="sub-desc">The scope in
     * which to execute the callbacks: The "this" object for the callback function. Defaults to the browser window.</div></li>
     * </ul>
     * @return {Object} request An object containing the request details.
     */
    request: function(options) {
        options = Ext.apply({}, options);

        //<debug>
        if (!options.url) {
            Ext.Error.raise('A url must be specified for a JSONP request.');
        }
        //</debug>

        var me = this,
            disableCaching = Ext.isDefined(options.disableCaching) ? options.disableCaching : me.disableCaching,
            cacheParam = options.disableCachingParam || me.disableCachingParam,
            id = ++me.requestCount,
            callbackName = options.callbackName || 'callback' + id,
            callbackKey = options.callbackKey || me.callbackKey,
            timeout = Ext.isDefined(options.timeout) ? options.timeout : me.timeout,
            params = Ext.apply({}, options.params),
            url = options.url,
            name = Ext.name,
            request,
            script;


        // Add cachebuster param unless it has already been done
        if (disableCaching && !params[cacheParam]) {
            params[cacheParam] = Ext.Date.now();
        }
        options.params = params;

        params[callbackKey] = name + '.data.JsonP.' + callbackName;
        script = me.createScript(url, params, options);

        me.requests[id] = request = {
            url: url,
            params: params,
            script: script,
            id: id,
            scope: options.scope,
            success: options.success,
            failure: options.failure,
            callback: options.callback,
            callbackKey: callbackKey,
            callbackName: callbackName
        };

        if (timeout > 0) {
            request.timeout = setTimeout(Ext.bind(me.handleTimeout, me, [request]), timeout);
        }

        me.setupErrorHandling(request);
        me[callbackName] = Ext.bind(me.handleResponse, me, [request], true);
        me.loadScript(request);
        return request;
    },

    /**
     * Abort a request. If the request parameter is not specified all open requests will
     * be aborted.
     * @param {Object/String} request (Optional) The request to abort
     */
    abort: function(request){
        var me = this,
            requests = me.requests,
            key;

        if (request) {
            if (!request.id) {
                request = requests[request];
            }
            me.handleAbort(request);
        } else {
            for (key in requests) {
                if (requests.hasOwnProperty(key)) {
                    me.abort(requests[key]);
                }
            }
        }
    },

    /**
     * Sets up error handling for the script
     * @private
     * @param {Object} request The request
     */
    setupErrorHandling: function(request){
        request.script.onerror = Ext.bind(this.handleError, this, [request]);
    },

    /**
     * Handles any aborts when loading the script
     * @private
     * @param {Object} request The request
     */
    handleAbort: function(request){
        request.errorType = 'abort';
        this.handleResponse(null, request);
    },

    /**
     * Handles any script errors when loading the script
     * @private
     * @param {Object} request The request
     */
    handleError: function(request){
        request.errorType = 'error';
        this.handleResponse(null, request);
    },

    /**
     * Cleans up anu script handling errors
     * @private
     * @param {Object} request The request
     */
    cleanupErrorHandling: function(request){
        request.script.onerror = null;
    },

    /**
     * Handle any script timeouts
     * @private
     * @param {Object} request The request
     */
    handleTimeout: function(request){
        request.errorType = 'timeout';
        this.handleResponse(null, request);
    },

    /**
     * Handle a successful response
     * @private
     * @param {Object} result The result from the request
     * @param {Object} request The request
     */
    handleResponse: function(result, request){

        var success = true,
            globalEvents = Ext.GlobalEvents;

        if (request.timeout) {
            clearTimeout(request.timeout);
        }
        delete this[request.callbackName];
        delete this.requests[request.id];
        this.cleanupErrorHandling(request);
        Ext.fly(request.script).destroy();

        if (request.errorType) {
            success = false;
            Ext.callback(request.failure, request.scope, [request.errorType]);
        } else {
            Ext.callback(request.success, request.scope, [result]);
        }
        Ext.callback(request.callback, request.scope, [success, result, request.errorType]);
        if (globalEvents.hasListeners.idle) {
            globalEvents.fireEvent('idle');
        }

    },

    /**
     * Create the script tag given the specified url, params and options. The options
     * parameter is passed to allow an override to access it.
     * @private
     * @param {String} url The url of the request
     * @param {Object} params Any extra params to be sent
     * @param {Object} options The object passed to {@link #request}.
     */
    createScript: function(url, params, options) {
        var script = document.createElement('script');
        script.setAttribute("src", Ext.urlAppend(url, Ext.Object.toQueryString(params)));
        script.setAttribute("async", true);
        script.setAttribute("type", "text/javascript");
        return script;
    },

    /**
     * Loads the script for the given request by appending it to the HEAD element. This is
     * its own method so that users can override it (as well as {@link #createScript}).
     * @private
     * @param request The request object.
     */
    loadScript: function (request) {
        Ext.getHead().appendChild(request.script);
    }
});
