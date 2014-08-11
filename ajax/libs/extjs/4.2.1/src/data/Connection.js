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
 * The Connection class encapsulates a connection to the page's originating domain, allowing requests to be made either
 * to a configured URL, or to a URL specified at request time.
 *
 * Requests made by this class are asynchronous, and will return immediately. No data from the server will be available
 * to the statement immediately following the {@link #request} call. To process returned data, use a success callback
 * in the request options object, or an {@link #requestcomplete event listener}.
 *
 * # File Uploads
 *
 * File uploads are not performed using normal "Ajax" techniques, that is they are not performed using XMLHttpRequests.
 * Instead the form is submitted in the standard manner with the DOM &lt;form&gt; element temporarily modified to have its
 * target set to refer to a dynamically generated, hidden &lt;iframe&gt; which is inserted into the document but removed
 * after the return data has been gathered.
 *
 * The server response is parsed by the browser to create the document for the IFRAME. If the server is using JSON to
 * send the return object, then the Content-Type header must be set to "text/html" in order to tell the browser to
 * insert the text unchanged into the document body.
 *
 * Characters which are significant to an HTML parser must be sent as HTML entities, so encode `<` as `&lt;`, `&` as
 * `&amp;` etc.
 *
 * The response text is retrieved from the document, and a fake XMLHttpRequest object is created containing a
 * responseText property in order to conform to the requirements of event handlers and callbacks.
 *
 * Be aware that file upload packets are sent with the content type multipart/form and some server technologies
 * (notably JEE) may require some custom processing in order to retrieve parameter names and parameter values from the
 * packet content.
 *
 * Also note that it's not possible to check the response code of the hidden iframe, so the success handler will ALWAYS fire.
 * 
 * # Binary Posts
 * 
 * The class supports posting binary data to the server by using native browser capabilities, or a flash polyfill plugin in browsers that do not support native binary posting (e.g. Internet Explorer version 9 or less). A number of limitations exist when the polyfill is used:
 *
 * - Only asynchronous connections are supported. 
 * - Only the POST method can be used.
 * - The return data can only be binary for now. Set the {@link Ext.data.Connection#binary binary} parameter to <tt>true</tt>.
 * - Only the 0, 1 and 4 (complete) readyState values will be reported to listeners.
 * - The flash object will be injected at the bottom of the document and should be invisible.
 * - Important: See note about packaing the flash plugin with the app in the documenetation of {@link Ext.data.flash.BinaryXhr BinaryXhr}.
 * 
 */
Ext.define('Ext.data.Connection', {
    mixins: {
        observable: 'Ext.util.Observable'
    },
    
    requires: [
        'Ext.data.flash.BinaryXhr'
    ],

    statics: {
        requestId: 0
    },

    url: null,
    async: true,
    method: null,
    username: '',
    password: '',

    /**
     * @cfg {Boolean} disableCaching
     * True to add a unique cache-buster param to GET requests.
     */
    disableCaching: true,

    /**
     * @cfg {Boolean} withCredentials
     * True to set `withCredentials = true` on the XHR object
     */
    withCredentials: false,

    /**
     * @cfg {Boolean} binary
     * True if the response should be treated as binary data.  If true, the binary
     * data will be accessible as a "responseBytes" property on the response object.
     */
    binary: false,

    /**
     * @cfg {Boolean} cors
     * True to enable CORS support on the XHR object. Currently the only effect of this option
     * is to use the XDomainRequest object instead of XMLHttpRequest if the browser is IE8 or above.
     */
    cors: false,

    isXdr: false,

    defaultXdrContentType: 'text/plain',

    /**
     * @cfg {String} disableCachingParam
     * Change the parameter which is sent went disabling caching through a cache buster.
     */
    disableCachingParam: '_dc',

    /**
     * @cfg {Number} timeout
     * The timeout in milliseconds to be used for requests.
     */
    timeout : 30000,

    /**
     * @cfg {Object} extraParams
     * Any parameters to be appended to the request.
     */

    /**
     * @cfg {Boolean} [autoAbort=false]
     * Whether this request should abort any pending requests.
     */

    /**
     * @cfg {String} method
     * The default HTTP method to be used for requests.
     *
     * If not set, but {@link #request} params are present, POST will be used;
     * otherwise, GET will be used.
     */

    /**
     * @cfg {Object} defaultHeaders
     * An object containing request headers which are added to each request made by this object.
     */

    useDefaultHeader : true,
    defaultPostHeader : 'application/x-www-form-urlencoded; charset=UTF-8',
    useDefaultXhrHeader : true,
    defaultXhrHeader : 'XMLHttpRequest',

    constructor : function(config) {
        config = config || {};
        Ext.apply(this, config);

        /**
         * @event beforerequest
         * Fires before a network request is made to retrieve a data object.
         * @param {Ext.data.Connection} conn This Connection object.
         * @param {Object} options The options config object passed to the {@link #request} method.
         */
        /**
         * @event requestcomplete
         * Fires if the request was successfully completed.
         * @param {Ext.data.Connection} conn This Connection object.
         * @param {Object} response The XHR object containing the response data.
         * See [The XMLHttpRequest Object](http://www.w3.org/TR/XMLHttpRequest/) for details.
         * @param {Object} options The options config object passed to the {@link #request} method.
         */
        /**
         * @event requestexception
         * Fires if an error HTTP status was returned from the server. This event may also
         * be listened to in the event that a request has timed out or has been aborted.
         * See [HTTP Status Code Definitions](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
         * for details of HTTP status codes.
         * @param {Ext.data.Connection} conn This Connection object.
         * @param {Object} response The XHR object containing the response data.
         * See [The XMLHttpRequest Object](http://www.w3.org/TR/XMLHttpRequest/) for details.
         * @param {Object} options The options config object passed to the {@link #request} method.
         */
        this.requests = {};
        this.mixins.observable.constructor.call(this);
    },

    /**
     * Sends an HTTP request to a remote server.
     *
     * **Important:** Ajax server requests are asynchronous, and this call will
     * return before the response has been received. Process any returned data
     * in a callback function.
     *
     *     Ext.Ajax.request({
     *         url: 'ajax_demo/sample.json',
     *         success: function(response, opts) {
     *             var obj = Ext.decode(response.responseText);
     *             console.dir(obj);
     *         },
     *         failure: function(response, opts) {
     *             console.log('server-side failure with status code ' + response.status);
     *         }
     *     });
     *
     * To execute a callback function in the correct scope, use the `scope` option.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * (The options object may also contain any other property which might be needed to perform
     * postprocessing in a callback because it is passed to callback functions.)
     *
     * @param {String/Function} options.url The URL to which to send the request, or a function
     * to call which returns a URL string. The scope of the function is specified by the `scope` option.
     * Defaults to the configured `url`.
     *
     * @param {Object/String/Function} options.params An object containing properties which are
     * used as parameters to the request, a url encoded string or a function to call to get either. The scope
     * of the function is specified by the `scope` option.
     *
     * @param {String} options.method The HTTP method to use
     * for the request. Defaults to the configured method, or if no method was configured,
     * "GET" if no parameters are being sent, and "POST" if parameters are being sent.  Note that
     * the method name is case-sensitive and should be all caps.
     *
     * @param {Function} options.callback The function to be called upon receipt of the HTTP response.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the request call.
     * @param {Boolean} options.callback.success True if the request succeeded.
     * @param {Object} options.callback.response The XMLHttpRequest object containing the response data.
     * See [www.w3.org/TR/XMLHttpRequest/](http://www.w3.org/TR/XMLHttpRequest/) for details about
     * accessing elements of the response.
     *
     * @param {Function} options.success The function to be called upon success of the request.
     * The callback is passed the following parameters:
     * @param {Object} options.success.response The XMLHttpRequest object containing the response data.
     * @param {Object} options.success.options The parameter to the request call.
     *
     * @param {Function} options.failure The function to be called upon failure of the request.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.response The XMLHttpRequest object containing the response data.
     * @param {Object} options.failure.options The parameter to the request call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function. If the `url`, or `params` options were specified as functions from which to
     * draw values, then this also serves as the scope for those function calls. Defaults to the browser
     * window.
     *
     * @param {Number} options.timeout The timeout in milliseconds to be used for this request.
     * Defaults to 30 seconds.
     *
     * @param {Ext.Element/HTMLElement/String} options.form The `<form>` Element or the id of the `<form>`
     * to pull parameters from.
     *
     * @param {Boolean} options.isUpload **Only meaningful when used with the `form` option.**
     *
     * True if the form object is a file upload (will be set automatically if the form was configured
     * with **`enctype`** `"multipart/form-data"`).
     *
     * File uploads are not performed using normal "Ajax" techniques, that is they are **not**
     * performed using XMLHttpRequests. Instead the form is submitted in the standard manner with the
     * DOM `<form>` element temporarily modified to have its [target][] set to refer to a dynamically
     * generated, hidden `<iframe>` which is inserted into the document but removed after the return data
     * has been gathered.
     *
     * The server response is parsed by the browser to create the document for the IFRAME. If the
     * server is using JSON to send the return object, then the [Content-Type][] header must be set to
     * "text/html" in order to tell the browser to insert the text unchanged into the document body.
     *
     * The response text is retrieved from the document, and a fake XMLHttpRequest object is created
     * containing a `responseText` property in order to conform to the requirements of event handlers
     * and callbacks.
     *
     * Be aware that file upload packets are sent with the content type [multipart/form][] and some server
     * technologies (notably JEE) may require some custom processing in order to retrieve parameter names
     * and parameter values from the packet content.
     *
     * [target]: http://www.w3.org/TR/REC-html40/present/frames.html#adef-target
     * [Content-Type]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17
     * [multipart/form]: http://www.faqs.org/rfcs/rfc2388.html
     *
     * @param {Object} options.headers Request headers to set for the request.
     *
     * @param {Object} options.xmlData XML document to use for the post. Note: This will be used instead
     * of params for the post data. Any params will be appended to the URL.
     *
     * @param {Object/String} options.jsonData JSON data to use as the post. Note: This will be used
     * instead of params for the post data. Any params will be appended to the URL.
     *
     * @param {Array} options.binaryData An array of bytes to submit in binary form. Any params will be appended to the URL. If binaryData is present, you must set {@link Ext.data.Connection#binary binary} to <tt>true</tt> and options.method to <tt>POST</tt>.
     * 
     * @param {Boolean} options.disableCaching True to add a unique cache-buster param to GET requests.
     *
     * @param {Boolean} options.withCredentials True to add the withCredentials property to the XHR object
     * 
     * @param {Boolean} options.binary True if the response should be treated as binary data.  If true, the binary
     * data will be accessible as a "responseBytes" property on the response object.
     *
     * @return {Object} The request object. This may be used to cancel the request.
     */
    request : function(options) {
        options = options || {};
        var me = this,
            scope = options.scope || window,
            username = options.username || me.username,
            password = options.password || me.password || '',
            async,
            requestOptions,
            request,
            headers,
            xhr;
        if (me.fireEvent('beforerequest', me, options) !== false) {

            requestOptions = me.setOptions(options, scope);

            if (me.isFormUpload(options)) {
                me.upload(options.form, requestOptions.url, requestOptions.data, options);
                return null;
            }

            // if autoabort is set, cancel the current transactions
            if (options.autoAbort || me.autoAbort) {
                me.abort();
            }

            // create a connection object
            async = options.async !== false ? (options.async || me.async) : false;
            xhr = me.openRequest(options, requestOptions, async, username, password);

            // XDR doesn't support setting any headers
            if (!me.isXdr) {
                headers = me.setupHeaders(xhr, options, requestOptions.data, requestOptions.params);
            }

            // create the transaction object
            request = {
                id: ++Ext.data.Connection.requestId,
                xhr: xhr,
                headers: headers,
                options: options,
                async: async,
                binary: options.binary || me.binary,
                timeout: setTimeout(function() {
                    request.timedout = true;
                    me.abort(request);
                }, options.timeout || me.timeout)
            };

            me.requests[request.id] = request;
            me.latestId = request.id;
            // bind our statechange listener
            if (async) {
                if (!me.isXdr) {
                    xhr.onreadystatechange = Ext.Function.bind(me.onStateChange, me, [request]);
                }
            }

            if (me.isXdr) {
                me.processXdrRequest(request, xhr);
            }

            // start the request!
            xhr.send(requestOptions.data);
            if (!async) {
                return me.onComplete(request);
            }
            return request;
        } else {
            Ext.callback(options.callback, options.scope, [options, undefined, undefined]);
            return null;
        }
    },

    processXdrRequest: function(request, xhr) {
        var me = this;

        // Mutate the request object as per XDR spec.
        delete request.headers;

        request.contentType = request.options.contentType || me.defaultXdrContentType;

        xhr.onload = Ext.Function.bind(me.onStateChange, me, [request, true]);
        xhr.onerror = xhr.ontimeout = Ext.Function.bind(me.onStateChange, me, [request, false]);
    },

    processXdrResponse: function(response, xhr) {
        // Mutate the response object as per XDR spec.
        response.getAllResponseHeaders = function () {
            return [];
        };
        response.getResponseHeader = function () {
            return '';
        };
        response.contentType = xhr.contentType || this.defaultXdrContentType;
    },

    /**
     * Uploads a form using a hidden iframe.
     * @param {String/HTMLElement/Ext.Element} form The form to upload
     * @param {String} url The url to post to
     * @param {String} params Any extra parameters to pass
     * @param {Object} options The initial options
     */
    upload: function(form, url, params, options) {
        form = Ext.getDom(form);
        options = options || {};

        var id = Ext.id(),
            frame = document.createElement('iframe'),
            hiddens = [],
            encoding = 'multipart/form-data',
            buf = {
                target: form.target,
                method: form.method,
                encoding: form.encoding,
                enctype: form.enctype,
                action: form.action
            },
            addField = function(name, value) {
                hiddenItem = document.createElement('input');
                Ext.fly(hiddenItem).set({
                    type: 'hidden',
                    value: value,
                    name: name
                });
                form.appendChild(hiddenItem);
                hiddens.push(hiddenItem);
            },
            hiddenItem, obj, value, name, vLen, v, hLen, h;

        /*
         * Originally this behaviour was modified for Opera 10 to apply the secure URL after
         * the frame had been added to the document. It seems this has since been corrected in
         * Opera so the behaviour has been reverted, the URL will be set before being added.
         */
        Ext.fly(frame).set({
            id: id,
            name: id,
            cls: Ext.baseCSSPrefix + 'hide-display',
            src: Ext.SSL_SECURE_URL
        });

        document.body.appendChild(frame);

        // This is required so that IE doesn't pop the response up in a new window.
        if (document.frames) {
            document.frames[id].name = id;
        }

        Ext.fly(form).set({
            target: id,
            method: 'POST',
            enctype: encoding,
            encoding: encoding,
            action: url || buf.action
        });

        // add dynamic params
        if (params) {
            obj = Ext.Object.fromQueryString(params) || {};

            for (name in obj) {
                if (obj.hasOwnProperty(name)) {
                    value = obj[name];  
                    if (Ext.isArray(value)) {
                        vLen = value.length;
                        for (v = 0; v < vLen; v++) {
                            addField(name, value[v]);
                        }
                    } else {
                        addField(name, value);
                    }
                }
            }
        }

        Ext.fly(frame).on('load', Ext.Function.bind(this.onUploadComplete, this, [frame, options]), null, {single: !Ext.isOpera});
        form.submit();

        Ext.fly(form).set(buf);

        hLen = hiddens.length;

        for (h = 0; h < hLen; h++) {
            Ext.removeNode(hiddens[h]);
        }
    },

    /**
     * @private
     * Callback handler for the upload function. After we've submitted the form via the iframe this creates a bogus
     * response object to simulate an XHR and populates its responseText from the now-loaded iframe's document body
     * (or a textarea inside the body). We then clean up by removing the iframe
     */
    onUploadComplete: function(frame, options) {
        var me = this,
            // bogus response object
            response = {
                responseText: '',
                responseXML: null
            }, callback, success, doc, contentNode;

        try {
            doc = frame.contentWindow.document || frame.contentDocument || window.frames[frame.id].document;
            // Opera will fire an extraneous load event on about:blank
            // We want to ignore this since the load event will be fired twice
            if (doc) {
                 if (Ext.isOpera && doc.location == 'about:blank') {
                     return;
                 }
                if (doc.body) {

                    // Response sent as Content-Type: text/json or text/plain. Browser will embed in a <pre> element
                    // Note: The statement below tests the result of an assignment.
                    if ((contentNode = doc.body.firstChild) && /pre/i.test(contentNode.tagName)) {
                        response.responseText = contentNode.textContent;
                    }

                    // Response sent as Content-Type: text/html. We must still support JSON response wrapped in textarea.
                    // Note: The statement below tests the result of an assignment.
                    else if ((contentNode = doc.getElementsByTagName('textarea')[0])) {
                        response.responseText = contentNode.value;
                    }
                    // Response sent as Content-Type: text/html with no wrapping. Scrape JSON response out of text
                    else {
                        response.responseText = doc.body.textContent || doc.body.innerText;
                    }
                }
                //in IE the document may still have a body even if returns XML.
                response.responseXML = doc.XMLDocument || doc;
                callback = options.success;
                success = true;
            }
        } catch (e) {
            // Report any error in the message property
            response.responseText = '{success:false,message:"' + Ext.String.trim(e.message || e.description) + '"}';
            callback = options.failure;
            success = false;
        }

        me.fireEvent('requestcomplete', me, response, options);

        Ext.callback(callback, options.scope, [response, options]);
        Ext.callback(options.callback, options.scope, [options, success, response]);

        setTimeout(function() {
            Ext.removeNode(frame);
        }, 100);
    },

    /**
     * Detects whether the form is intended to be used for an upload.
     * @private
     */
    isFormUpload: function(options) {
        var form = this.getForm(options);
        if (form) {
            return (options.isUpload || (/multipart\/form-data/i).test(form.getAttribute('enctype')));
        }
        return false;
    },

    /**
     * Gets the form object from options.
     * @private
     * @param {Object} options The request options
     * @return {HTMLElement} The form, null if not passed
     */
    getForm: function(options) {
        return Ext.getDom(options.form) || null;
    },

    /**
     * Sets various options such as the url, params for the request
     * @param {Object} options The initial options
     * @param {Object} scope The scope to execute in
     * @return {Object} The params for the request
     */
    setOptions: function(options, scope) {
        var me = this,
            params = options.params || {},
            extraParams = me.extraParams,
            urlParams = options.urlParams,
            url = options.url || me.url,
            jsonData = options.jsonData,
            method,
            disableCache,
            data;


        // allow params to be a method that returns the params object
        if (Ext.isFunction(params)) {
            params = params.call(scope, options);
        }

        // allow url to be a method that returns the actual url
        if (Ext.isFunction(url)) {
            url = url.call(scope, options);
        }

        url = this.setupUrl(options, url);

        //<debug>
        if (!url) {
            Ext.Error.raise({
                options: options,
                msg: 'No URL specified'
            });
        }
        //</debug>

        // check for xml or json data, and make sure json data is encoded
        data = options.rawData || options.binaryData || options.xmlData || jsonData || null;
        if (jsonData && !Ext.isPrimitive(jsonData)) {
            data = Ext.encode(data);
        }
        // Check for binary data. Transform if needed
        if (options.binaryData) {
            //<debug>
            if (!Ext.isArray(options.binaryData)) {
                Ext.log.warn("Binary submission data must be an array of byte values! Instead got " + typeof(options.binaryData));
            }
            //</debug>
            if (me.nativeBinaryPostSupport()) {
                data = (new Uint8Array(options.binaryData));
                if ((Ext.isChrome && Ext.chromeVersion < 22) || Ext.isSafari || Ext.isGecko) {
                    data = data.buffer; //  send the underlying buffer, not the view, since that's not supported on versions of chrome older than 22
                }
            }
        }
        
        // make sure params are a url encoded string and include any extraParams if specified
        if (Ext.isObject(params)) {
            params = Ext.Object.toQueryString(params);
        }

        if (Ext.isObject(extraParams)) {
            extraParams = Ext.Object.toQueryString(extraParams);
        }

        params = params + ((extraParams) ? ((params) ? '&' : '') + extraParams : '');

        urlParams = Ext.isObject(urlParams) ? Ext.Object.toQueryString(urlParams) : urlParams;

        params = this.setupParams(options, params);

        // decide the proper method for this request
        method = (options.method || me.method || ((params || data) ? 'POST' : 'GET')).toUpperCase();
        this.setupMethod(options, method);


        disableCache = options.disableCaching !== false ? (options.disableCaching || me.disableCaching) : false;
        // if the method is get append date to prevent caching
        if (method === 'GET' && disableCache) {
            url = Ext.urlAppend(url, (options.disableCachingParam || me.disableCachingParam) + '=' + (new Date().getTime()));
        }

        // if the method is get or there is json/xml data append the params to the url
        if ((method == 'GET' || data) && params) {
            url = Ext.urlAppend(url, params);
            params = null;
        }

        // allow params to be forced into the url
        if (urlParams) {
            url = Ext.urlAppend(url, urlParams);
        }

        return {
            url: url,
            method: method,
            data: data || params || null
        };
    },

    /**
     * Template method for overriding url
     * @template
     * @private
     * @param {Object} options
     * @param {String} url
     * @return {String} The modified url
     */
    setupUrl: function(options, url) {
        var form = this.getForm(options);
        if (form) {
            url = url || form.action;
        }
        return url;
    },


    /**
     * Template method for overriding params
     * @template
     * @private
     * @param {Object} options
     * @param {String} params
     * @return {String} The modified params
     */
    setupParams: function(options, params) {
        var form = this.getForm(options),
            serializedForm;
        if (form && !this.isFormUpload(options)) {
            serializedForm = Ext.Element.serializeForm(form);
            params = params ? (params + '&' + serializedForm) : serializedForm;
        }
        return params;
    },

    /**
     * Template method for overriding method
     * @template
     * @private
     * @param {Object} options
     * @param {String} method
     * @return {String} The modified method
     */
    setupMethod: function(options, method) {
        if (this.isFormUpload(options)) {
            return 'POST';
        }
        return method;
    },

    /**
     * Setup all the headers for the request
     * @private
     * @param {Object} xhr The xhr object
     * @param {Object} options The options for the request
     * @param {Object} data The data for the request
     * @param {Object} params The params for the request
     */
    setupHeaders: function(xhr, options, data, params) {
        var me = this,
            headers = Ext.apply({}, options.headers || {}, me.defaultHeaders || {}),
            contentType = me.defaultPostHeader,
            jsonData = options.jsonData,
            xmlData = options.xmlData,
            key,
            header;

        if (!headers['Content-Type'] && (data || params)) {
            if (data) {
                if (options.rawData) {
                    contentType = 'text/plain';
                } else {
                    if (xmlData && Ext.isDefined(xmlData)) {
                        contentType = 'text/xml';
                    } else if (jsonData && Ext.isDefined(jsonData)) {
                        contentType = 'application/json';
                    }
                }
            }
            headers['Content-Type'] = contentType;
        }

        if (me.useDefaultXhrHeader && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = me.defaultXhrHeader;
        }
        // set up all the request headers on the xhr object
        try {
            for (key in headers) {
                if (headers.hasOwnProperty(key)) {
                    header = headers[key];
                    xhr.setRequestHeader(key, header);
                }
            }
        } catch(e) {
            me.fireEvent('exception', key, header);
        }
        return headers;
    },

    /**
     * Creates the appropriate XHR transport for a given request on this browser. On IE
     * this may be an `XDomainRequest` rather than an `XMLHttpRequest`.
     * @private
     */
    newRequest: function (options) {
        var me = this,
            xhr;

        if (options.binaryData) {
            // This is a binary data request. Handle submission differently for differnet browsers
            if (me.nativeBinaryPostSupport()) { 
                xhr = this.getXhrInstance(); // On browsers that support this, use the native XHR object
            } else {
                // catch all for all other browser types
                xhr = new Ext.data.flash.BinaryXhr();
            }
        } else  if ((options.cors || me.cors) && Ext.isIE && Ext.ieVersion <= 9) {
            xhr = me.getXdrInstance();
            me.isXdr = true;
        } else {
            xhr = me.getXhrInstance();
        }

        return xhr;
    },

    /**
     * Creates and opens an appropriate XHR transport for a given request on this browser.
     * This logic is contained in an individual method to allow for overrides to process all
     * of the parameters and options and return a suitable, open connection.
     * @private
     */
    openRequest: function (options, requestOptions, async, username, password) {
        var me = this,
            xhr = me.newRequest(options);

        if (username) {
            xhr.open(requestOptions.method, requestOptions.url, async, username, password);
        } else {
            if (me.isXdr) {
                xhr.open(requestOptions.method, requestOptions.url);
            } else {
                xhr.open(requestOptions.method, requestOptions.url, async);
            }
        }

        if (options.binary || me.binary) {
            if (window.Uint8Array) {
                xhr.responseType = 'arraybuffer';
            } else if (xhr.overrideMimeType) {
                // In some older non-IE browsers, e.g. ff 3.6, that do not
                // support Uint8Array, a mime type override is required so that
                // the unprocessed binary data can be read from the responseText
                // (see createResponse())
                xhr.overrideMimeType('text\/plain; charset=x-user-defined');  
            //<debug>
            } else if (!Ext.isIE) {
                Ext.log.warn("Your does not support loading binary data using Ajax.");
            //</debug>
            }
        }

        if (options.withCredentials || me.withCredentials) {
            xhr.withCredentials = true;
        }

        return xhr;
    },

    /**
     * Creates the appropriate XDR transport for this browser.
     * - IE 7 and below don't support CORS
     * - IE 8 and 9 support CORS with native XDomainRequest object
     * - IE 10 (and above?) supports CORS with native XMLHttpRequest object
     * @private
     */
    getXdrInstance: function() {
        var xdr;

        if (Ext.ieVersion >= 8) {
            xdr = new XDomainRequest();
        } else {
            Ext.Error.raise({
                msg: 'Your browser does not support CORS'
            });
        }

        return xdr;
    },

    /**
     * Creates the appropriate XHR transport for this browser.
     * @private
     */
    getXhrInstance: (function() {
        var options = [function() {
            return new XMLHttpRequest();
        }, function() {
            return new ActiveXObject('MSXML2.XMLHTTP.3.0');
        }, function() {
            return new ActiveXObject('MSXML2.XMLHTTP');
        }, function() {
            return new ActiveXObject('Microsoft.XMLHTTP');
        }], i = 0,
            len = options.length,
            xhr;

        for (; i < len; ++i) {
            try {
                xhr = options[i];
                xhr();
                break;
            } catch(e) {
            }
        }
        return xhr;
    }()),

    /**
     * Determines whether this object has a request outstanding.
     * @param {Object} [request] Defaults to the last transaction
     * @return {Boolean} True if there is an outstanding request.
     */
    isLoading : function(request) {
        if (!request) {
            request = this.getLatest();
        }
        if (!(request && request.xhr)) {
            return false;
        }
        // if there is a connection and readyState is not 0 or 4, or in case of BinaryXHR, not 4
        var state = request.xhr.readyState;
        return ((request.xhr instanceof Ext.data.flash.BinaryXhr) && state != 4) || !(state === 0 || state == 4);
    },

    /**
     * Aborts an active request.
     * @param {Object} [request] Defaults to the last request
     */
    abort : function(request) {
        var me = this,
            xhr;
        
        if (!request) {
            request = me.getLatest();
        }

        if (request && me.isLoading(request)) {
            /*
             * Clear out the onreadystatechange here, this allows us
             * greater control, the browser may/may not fire the function
             * depending on a series of conditions.
             */
            xhr = request.xhr;
            try {
                xhr.onreadystatechange = null;
            } catch (e) {
                // Setting onreadystatechange to null can cause problems in IE, see
                // http://www.quirksmode.org/blog/archives/2005/09/xmlhttp_notes_a_1.html
                xhr.onreadystatechange = Ext.emptyFn;
            }
            xhr.abort();
            me.clearTimeout(request);
            if (!request.timedout) {
                request.aborted = true;
            }
            me.onComplete(request);
            me.cleanup(request);
        }
    },
    
    /**
     * Aborts all active requests
     */
    abortAll: function(){
        var requests = this.requests,
            id;
        
        for (id in requests) {
            if (requests.hasOwnProperty(id)) {
                this.abort(requests[id]);
            }
        }
    },
    
    /**
     * Gets the most recent request
     * @private
     * @return {Object} The request. Null if there is no recent request
     */
    getLatest: function(){
        var id = this.latestId,
            request;
            
        if (id) {
            request = this.requests[id];
        }
        return request || null;
    },

    /**
     * Fires when the state of the xhr changes
     * @private
     * @param {Object} request The request
     */
    onStateChange : function(request, xdrResult) {
        var me = this;

        // Using CORS with IE doesn't support readyState so we fake it
        if ((request.xhr && request.xhr.readyState == 4) || me.isXdr) {
            me.clearTimeout(request);
            me.onComplete(request, xdrResult);
            me.cleanup(request);
            Ext.EventManager.idleEvent.fire();
        }
    },

    /**
     * Clears the timeout on the request
     * @private
     * @param {Object} request The request
     */
    clearTimeout: function(request) {
        clearTimeout(request.timeout);
        delete request.timeout;
    },

    /**
     * Cleans up any left over information from the request
     * @private
     * @param {Object} request The request
     */
    cleanup: function(request) {
        request.xhr = null;
        delete request.xhr;
    },

    /**
     * To be called when the request has come back from the server
     * @private
     * @param {Object} request
     * @return {Object} The response
     */
    onComplete : function(request, xdrResult) {
        var me = this,
            options = request.options,
            result,
            success,
            response;

        try {
            result = me.parseStatus(request.xhr.status);
        } catch (e) {
            // in some browsers we can't access the status if the readyState is not 4, so the request has failed
            result = {
                success : false,
                isException : false
            };

        }
        success = me.isXdr ? xdrResult : result.success;

        if (success) {
            response = me.createResponse(request);
            me.fireEvent('requestcomplete', me, response, options);
            Ext.callback(options.success, options.scope, [response, options]);
        } else {
            if (result.isException || request.aborted || request.timedout) {
                response = me.createException(request);
            } else {
                response = me.createResponse(request);
            }
            me.fireEvent('requestexception', me, response, options);
            Ext.callback(options.failure, options.scope, [response, options]);
        }
        Ext.callback(options.callback, options.scope, [options, success, response]);
        delete me.requests[request.id];
        return response;
    },

    /**
     * Checks if the response status was successful
     * @param {Number} status The status code
     * @return {Object} An object containing success/status state
     */
    parseStatus: function(status) {
        // see: https://prototype.lighthouseapp.com/projects/8886/tickets/129-ie-mangles-http-response-status-code-204-to-1223
        status = status == 1223 ? 204 : status;

        var success = (status >= 200 && status < 300) || status == 304,
            isException = false;

        if (!success) {
            switch (status) {
                case 12002:
                case 12029:
                case 12030:
                case 12031:
                case 12152:
                case 13030:
                    isException = true;
                    break;
            }
        }
        return {
            success: success,
            isException: isException
        };
    },

    /**
     * Creates the response object
     * @private
     * @param {Object} request
     */
    createResponse : function(request) {
        var me = this,
            xhr = request.xhr,
            isXdr = me.isXdr,
            headers = {},
            lines = isXdr ? [] : xhr.getAllResponseHeaders().replace(/\r\n/g, '\n').split('\n'),
            count = lines.length,
            line, index, key, response, byteArray;

        while (count--) {
            line = lines[count];
            index = line.indexOf(':');
            if (index >= 0) {
                key = line.substr(0, index).toLowerCase();
                if (line.charAt(index + 1) == ' ') {
                    ++index;
                }
                headers[key] = line.substr(index + 1);
            }
        }

        request.xhr = null;
        delete request.xhr;

        response = {
            request: request,
            requestId: request.id,
            status: xhr.status,
            statusText: xhr.statusText,
            getResponseHeader: function(header) {
                return headers[header.toLowerCase()];
            },
            getAllResponseHeaders: function() {
                return headers;
            }
        };

        if (isXdr) {
            me.processXdrResponse(response, xhr);
        }

        if (request.binary) {
            response.responseBytes = me.getByteArray(xhr);
        } else {
            // an error is thrown when trying to access responseText or responseXML
            // on an xhr object with responseType of 'arraybuffer', so only attempt
            // to set these properties in the response if we're not dealing with
            // binary data
            response.responseText = xhr.responseText;
            response.responseXML = xhr.responseXML;
        }

        // If we don't explicitly tear down the xhr reference, IE6/IE7 will hold this in the closure of the
        // functions created with getResponseHeader/getAllResponseHeaders
        xhr = null;
        return response;
    },

    /**
     * Creates the exception object
     * @private
     * @param {Object} request
     */
    createException : function(request) {
        return {
            request : request,
            requestId : request.id,
            status : request.aborted ? -1 : 0,
            statusText : request.aborted ? 'transaction aborted' : 'communication failure',
            aborted: request.aborted,
            timedout: request.timedout
        };
    },

    /**
     * Gets binary data from the xhr response object and returns it as a byte array
     * @private
     * @param {Object} xhr the xhr response object
     * @return {Uint8Array/Array}
     */
    getByteArray: function(xhr) {
        var response = xhr.response,
            responseBody = xhr.responseBody,
            byteArray, responseText, len, i;

        if (xhr instanceof Ext.data.flash.BinaryXhr) {
            // If this was a BinaryXHR request via flash, we already have the bytes ready
            byteArray = xhr.responseBytes;
        } else if (window.Uint8Array) {
            // Modern browsers (including IE10) have a native byte array
            // which can be created by passing the ArrayBuffer (returned as
            // the xhr.response property) to the Uint8Array constructor.
            byteArray = response ? new Uint8Array(response) : [];
        } else if (Ext.isIE9p) {
            // In IE9 and below the responseBody property contains a byte array
            // but it is not directly accessible using javascript.
            // In IE9p we can get the bytes by constructing a VBArray
            // using the responseBody and then converting it to an Array.
            try {
                byteArray = new VBArray(responseBody).toArray();
            } catch(e) {
                // If the binary response is empty, the VBArray constructor will
                // choke on the responseBody.  We can't simply do a null check
                // on responseBody because responseBody is always falsy when it
                // contains binary data.
                byteArray = [];
            }
        } else if (Ext.isIE) {
            // IE8 and below also have a VBArray constructor, but throw a
            // "VBArray Expected" error if you try to pass the responseBody to
            // the VBArray constructor.
            // http://msdn.microsoft.com/en-us/library/ye3x9by3%28v=vs.71%29.aspx
            // so we have to use vbscript injection to access the bytes
            if (!this.self.vbScriptInjected) {
                this.injectVBScript();
            }
            getIEByteArray(xhr.responseBody, byteArray = []);
        } else {
            // in other older browsers make a best-effort attempt to read the
            // bytes from responseText
            byteArray = [];
            responseText = xhr.responseText;
            len = responseText.length;
            for (i = 0; i < len; i++) {
                // Some characters have an extra byte 0xF7 in the high order
                // position. Throw away the high order byte and then push the
                // result onto the byteArray.
                byteArray.push(responseText.charCodeAt(i) & 0xFF);
            }
        }

        return byteArray;
    },

    /**
     * Injects a vbscript tag containing a 'getIEByteArray' method for reading
     * binary data from an xhr response in IE8 and below.
     * @private
     */
    injectVBScript: function() {
        var scriptTag = document.createElement('script');
        scriptTag.type = 'text/vbscript';
        scriptTag.text = [
            'Function getIEByteArray(byteArray, out)',
                'Dim len, i',
                'len = LenB(byteArray)',
                'For i = 1 to len',
                    'out.push(AscB(MidB(byteArray, i, 1)))',
                'Next',
            'End Function'
        ].join('\n');
        Ext.getHead().dom.appendChild(scriptTag);
        this.self.vbScriptInjected = true;
    },
    
    /**
     * @private
     * @return {boolean} <tt>true</tt> if the browser can natively post binary data.
     */
    nativeBinaryPostSupport: function() {
        return Ext.isChrome ||
            (Ext.isSafari && Ext.isDefined(window.Uint8Array)) ||
            (Ext.isGecko && Ext.isDefined(window.Uint8Array));
    }
    
    
});
