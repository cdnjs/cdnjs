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
 *
 * Simulates an XMLHttpRequest object's methods and properties as returned
 * form the flash polyfill plugin. Used in submitting binary data in browsers that do 
 * not support doing so from JavaScript.
 * NOTE: By default this will look for the flash object in the ext directory. When packaging and deploying the app, copy the <tt>ext/plugins</tt> directory and its contents to your root directory. For custom deployments where just the <tt>FlashPlugin.swf</tt> file gets copied (e.g. to <tt>/resources/FlashPlugin.swf</tt>), make sure to notify the framework of the location of the plugin before making the first attempt to post binary data, e.g. in the <tt>launch</tt> method of your app do:
 * <pre><code>
Ext.flashPluginPath="/resources/FlashPlugin.swf";
 </code></pre>
 *
 * @private
 */
Ext.define('Ext.data.flash.BinaryXhr', {
    
    statics: {
        /**
         * Called by the flash plugin once it's installed and open for business.
         * @private
         */
        flashPluginActivated: function() {
            Ext.data.flash.BinaryXhr.flashPluginActive = true;
            Ext.data.flash.BinaryXhr.flashPlugin = document.getElementById("ext-flash-polyfill");
            Ext.globalEvents.fireEvent("flashready"); // let all pending connections know
        },
        
        /**
         * Set to <tt>trut</tt> once the plugin registers and is active.
         * @private
         */
        flashPluginActive: false,
        
        /**
         * Flag to avoid installing the plugin twice.
         * @private
         */
        flashPluginInjected: false,
        
        /**
         * Counts IDs for new connections.
         * @private
         */
        
        connectionIndex: 1,
        
        /**
         * Plcaeholder for active connections.
         * @private
         */
        liveConnections: {},
        
        /**
         * Reference to the actual plugin, once activated.
         * @private
         */
        flashPlugin: null,
        
        /**
         * Called by the flash plugin once the state of one of the active connections changes.
         * @param {Number/number} javascriptId the ID of the connection.
         * @param {number} state the state of the connection. Equivalent to readyState numbers in XHR.
         * @param {Object} data optional object containing the returned data, error and status codes.
         * @private
         */
        onFlashStateChange: function(javascriptId, state, data) {
            var connection;
            // Identify the request this is for
            connection = this.liveConnections[Number(javascriptId)]; // Make sure its a native number
            if (connection) {
                connection.onFlashStateChange(state, data);
            } 
            //<debug>
            else {
                Ext.warn.log("onFlashStateChange for unknown connection ID: " + javascriptId);
            }
            //</debug>
        },
        
        /**
         * Adds the BinaryXhr object to the tracked connection list and assigns it an ID
         * @param {Ext.data.flash.BinaryXhr} conn the connection to register
         * @return {Number} id
         * @private
         */
        registerConnection: function(conn) {
            var i = this.connectionIndex;
            this.conectionIndex = this.connectionIndex + 1;
            this.liveConnections[i] = conn;
            return i;
        },
        
        /**
         * Injects the flash polyfill plugin to allow posting binary data.
         * This is done in two steps: First we load the javascript loader for flash objects, then we call it to inject the flash object.
         * @private
         */
        injectFlashPlugin: function() {
            var divTag, pTag, aTag, iTag,
                me=this,
                flashLoaderPath, flashObjectPath;
                // Generate the following HTML set of tags:
               // + '<div id="ext-flash-polyfill">'
               // + '<p>To view this page ensure that Adobe Flash Player version 11.1.0 or greater is installed, and that the FlashPlugin.swf file was correctly placed in the /resources directory.</p>'
                //+ '<a href="http://www.adobe.com/go/getflashplayer"><img src="' + window.location.protocol + '//www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a>'
                //+ '</div>'
            
            iTag=document.createElement("img");
            iTag.setAttribute("src",  window.location.protocol + '//www.adobe.com/images/shared/download_buttons/get_flash_player.gif');
            iTag.setAttribute("alt", "Get Adobe Flash player");
            
            aTag=document.createElement("a");
            aTag.setAttribute("href", "http://www.adobe.com/go/getflashplayer");
            aTag.appendChild(iTag);
            
            pTag=document.createElement("p");
            pTag.innerHTML="To view this page ensure that Adobe Flash Player version 11.1.0 or greater is installed.";
            
            divTag=document.createElement("div");
            divTag.setAttribute("id", "ext-flash-polyfill");
            divTag.appendChild(pTag);
            divTag.appendChild(iTag);
            
            Ext.getBody().dom.appendChild(divTag);
            
            
            
            // Now load the flash-loading script
            
            flashLoaderPath = [Ext.Loader.getPath('Ext.data.Connection'), '../../../plugins/flash/swfobject.js'].join('/');
            flashObjectPath = "/plugins/flash/FlashPlugin.swf";
            //<debug>
            flashObjectPath = [Ext.Loader.getPath('Ext.data.Connection'), '../../plugins/flash/FlashPlugin.swf'].join('/');
            //</debug>
            if (Ext.flashPluginPath) {
                flashObjectPath = Ext.flashPluginPath;
            }
            //console.log('LOADING Flash plugin from: ' + flashObjectPath);
            Ext.Loader.loadScript({
                url:flashLoaderPath,
                onLoad: function() {
                    // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. 
                    var swfVersionStr = "11.4.0";
                    // To use express install, set to playerProductInstall.swf, otherwise the empty string. 
                    var xiSwfUrlStr = "playerProductInstall.swf";
                    var flashvars = {};
                    var params = {};
                    params.quality = "high";
                    params.bgcolor = "#ffffff";
                    params.allowscriptaccess = "sameDomain";
                    params.allowfullscreen = "true";
                    var attributes = {};
                    attributes.id = "ext-flash-polyfill";
                    attributes.name = "polyfill";
                    attributes.align = "middle";
                    swfobject.embedSWF(
                        flashObjectPath, "ext-flash-polyfill", 
                        "0", "0", // no size so it's not visible. 
                        swfVersionStr, xiSwfUrlStr, 
                        flashvars, params, attributes);
                },
                onError: function() {
                    //<debug>
                    Ext.Error.raise("Could not load flash-loader file swfobject.js from " + flashLoader);
                    //</debug>
                },
                scope: me
            });
            Ext.globalEvents.addEvents("flashready"); // we'll fire this one once flash is loaded
            Ext.data.flash.BinaryXhr.flashPluginInjected = true;
        }

    
    },
    
    /**
     * @property {number} readyState The connection's simulated readyState. Note that the only supported values are 0, 1 and 4. States 2 and 3 will never be reported.
     */
    readyState: 0,
    
    /**
     * @property {number} status Connection status code returned by flash or the server.
     */
    status: 0,
    
    
    /**
     * Status text (if any) returned by flash or the server.
     */
    statusText: "",
    
    /**
     * @property {Array} responseBytes The binary bytes returned.
     */
    responseBytes: null,
    
    /**
     * An ID representing this connection with flash.
     * @private
     */
    javascriptId: null,
    
    
    /**
     * Creates a new instance of BinaryXhr.
     */
    constructor: function (config) {
        // first, make sure flash is loading if needed
        if (!Ext.data.flash.BinaryXhr.flashPluginInjected) {
            Ext.data.flash.BinaryXhr.injectFlashPlugin();
        }
        var me = this;

        Ext.apply(me, config);
        me.requestHeaders = {};
    },

    /**
     * Abort this connection. Sets its readyState to 4.
     */
    abort: function () {
        var me = this;
        // if complete, nothing to abort 
        if (me.readyState == 4) {
            //<debug>
            Ext.warn.log("Aborting a connection that's completed its transfer: " + this.url);
            //</debug>
            return;
        }
        // Mark as aborted
        me.aborted = true;
        // Remove ourselves from the listeners if flash isn't active yet
        if (!Ext.data.flash.BinaryXhr.flashPluginActive) {
            Ext.globalEvents.removeListener("flashready", me.onFlashReady, me);
            return;
        }
        // Flash is already live, so we should have a javascriptID and should have called flash to get the request going. Cancel:
        Ext.data.flash.BinaryXhr.flashPlugin.abortRequest(me.javascriptId);
        // remove from list
        delete Ext.data.flash.BinaryXhr.liveConnections[me.javascriptId];
    },

    /**
     * As in XMLHttpRequest.
     */
    getAllResponseHeaders: function () {
        var headers = [];
        Ext.Object.each(this.responseHeaders, function (name, value) {
            headers.push(name + ': ' + value);
        });
        return headers.join('\x0d\x0a');
    },

    /**
     * As in XMLHttpRequest.
     */
    getResponseHeader: function (header) {
        var headers = this.responseHeaders;
        return (headers && headers[header]) || null;
    },

    /**
     * As in XMLHttpRequest.
     */
    open: function (method, url, async, user, password) {
        var me = this;
        me.method = method;
        me.url = url;
        me.async = async !== false;
        me.user = user;
        me.password = password;
        
        //<debug>
        if (!me.async) {
            Ext.Error.raise("Binary posts are only supported in async mode: " + url);
        }
        if (me.method != "POST") {
            Ext.log.warn("Binary data can only be sent as a POST request: " + url);
        }
        //</debug>
    },

    /**
     * As in XMLHttpRequest.
     */
    overrideMimeType: function (mimeType) {
        this.mimeType = mimeType;
    },

    /**
     * Initiate the request.
     * @param {Array} body an array of byte values to send.
     */
    send: function (body) {
        var me = this;
        me.body = body;
        if (!Ext.data.flash.BinaryXhr.flashPluginActive) {
            Ext.globalEvents.addListener("flashready", me.onFlashReady, me);
        } else {
            this.onFlashReady();
        }
    },
    
    /**
     * Called by send, or once flash is loaded, to actually send the bytes.
     * @private
     */
    onFlashReady: function() {
        var me = this, req, status;
        me.javascriptId = Ext.data.flash.BinaryXhr.registerConnection(me);
        
        // Create the request object we're sending to flash
        req = {
            method: me.method, // ignored since we always POST binary data
            url: me.url,
            user: me.user,
            password: me.password,
            mimeType: me.mimeType,
            requestHeaders: me.requestHeaders,
            body: me.body,
            javascriptId: me.javascriptId
        };
        status = Ext.data.flash.BinaryXhr.flashPlugin.postBinary(req);
    },

    /**
     * Updates readyState and notifies listeners.
     * @private
     */
    setReadyState: function (state) {
        var me = this;
        if (me.readyState != state) {
            me.readyState = state;
            me.onreadystatechange();
        }
    },

    /**
     * As in XMLHttpRequest.
     */
    setRequestHeader: function (header, value) {
        this.requestHeaders[header] = value;
    },

    /**
     * As in XMLHttpRequest.
     */
    onreadystatechange: Ext.emptyFn,

    /**
     * Parses data returned from flash once a connection is done.
     * @param {Object} data the data object send from Flash.
     * @private
     */
    parseData: function (data) {
        var me = this;
        // parse data and set up variables so that listeners can use this XHR
        this.status = data.status || 0; 
        // we get back no response headers, so fake what we know:
        me.responseHeaders = {};
        if (me.mimeType) {
            me.responseHeaders["content-type"] = me.mimeType;
        }
        if (data.reason == "complete") {
            // Transfer complete and data received
            this.responseBytes = data.data;
            me.responseHeaders["content-length"] = data.data.length;
        } else if (data.reason == "error" || data.reason == "securityError") {
            this.statusText = data.text;
            me.responseHeaders["content-length"] = 0; // we don't get the error response data
        }
        //<debug>
        else {
            Ext.Error.raise("Unkown reason code in data: " + data.reason);
        }
        //</debug>
    },

    /**
     * Called once flash calls back with updates about the connection
     * @param {Number} state the readyState of the connection.
     * @param {Object} data optional data object.
     * @private
     */
    onFlashStateChange: function(state, data) {
        var me = this;
        if (state == 4) {
            // parse data and prepare for handing back to initiator
            me.parseData(data);
            // remove from list
            delete Ext.data.flash.BinaryXhr.liveConnections[me.javascriptId];
        }
        me.setReadyState(state); // notify all listeners
    }
    
});
