/**
 * Class to act as a bridge between the MockAjax class and Ext.data.Connection
 */
var MockAjaxManager = {
    
    getXhrInstance: null,
    
    /**
     * Pushes methods onto the Connection prototype to make it easier to deal with
     */
    addMethods: function(){
        var Connection = Ext.data.Connection,
            proto = Connection.prototype;
            
        Connection.requestId = 0;
        MockAjaxManager.getXhrInstance = proto.getXhrInstance;
        
        /**
         * Template method to create the AJAX request
         */
        proto.getXhrInstance = function(){
            return new MockAjax();    
        };
        
        /**
         * Method to simulate a request completing
         * @param {Object} response The response
         * @param {String} id (optional) The id of the completed request
         */
        proto.mockComplete = function(response, id){
            this.mockGetRequestXHR(id).xhr.complete(response);
        };
        
        /**
         * Get a particular request
         * @param {String} id (optional) The id of the request
         */
        proto.mockGetRequestXHR = function(id){
            var request;
                
            if (id) {
                request = this.requests[id];
            } else {
                // get the first one
                request = this.mockGetAllRequests()[0];
            }
            return request ? request : null;
        };
        
        /**
         * Gets all the requests from the Connection
         */
        proto.mockGetAllRequests = function(){
            var requests = this.requests,
                id,
                request,
                out = [];
                
            for (id in requests) {
                if (requests.hasOwnProperty(id)) {
                    out.push(requests[id]);
                }
            }
            return out;
        };

        this.originalExtAjax = Ext.Ajax;
        Ext.Ajax = new Connection({autoAbort : false});
    },
    
    /**
     * Restore any changes made by addMethods
     */
    removeMethods: function(){
        var proto = Ext.data.Connection.prototype;
        delete proto.mockComplete;
        delete proto.mockGetRequestXHR;
        proto.getXhrInstance = MockAjaxManager.getXhrInstance;
        Ext.Ajax = this.originalExtAjax;
    }
};

/**
 * Simple Mock class to represent an XMLHttpRequest
 */
var MockAjax = function(){
    /**
     * Contains all request headers
     */
    this.headers = {};
    
    /**
     * Contains any options specified during sending
     */
    this.ajaxOptions = {};
    
    this.readyState = 0;
    
    this.status = null;
    
    this.responseText = this.responseXML = null;
};

/**
 * Contains a default response for any synchronous request.
 */
MockAjax.prototype.syncDefaults = {
    responseText: 'data',
    status: 200,
    statusText: '',
    responseXML: null,
    responseHeaders: {"Content-type": "application/json" }
};

MockAjax.prototype.readyChange = function() {
    if (this.onreadystatechange) {
        this.onreadystatechange();
    }
};

/**
 * Simulate the XHR open method
 * @param {Object} method
 * @param {Object} url
 * @param {Object} async
 * @param {Object} username
 * @param {Object} password
 */
MockAjax.prototype.open = function(method, url, async, username, password){
    var options = this.ajaxOptions;
    options.method = method;
    options.url = url;
    options.async = async;
    options.username = username;
    options.password = password;
    this.readyState = 1;
    this.readyChange();
};

/**
 * Simulate the XHR send method
 * @param {Object} data
 */
MockAjax.prototype.send = function(data){
    this.ajaxOptions.data = data;
    this.readyState = 2;
    // if it's a synchronous request, let's just assume it's already finished
    if (!this.ajaxOptions.async) {
        this.complete(this.syncDefaults);
    } else {
        this.readyChange();
    }
};

/**
 * Simulate the XHR abort method
 */
MockAjax.prototype.abort = function(){
    this.readyState = 0;
    this.readyChange();
};

/**
 * Simulate the XHR setRequestHeader method
 * @param {Object} header
 * @param {Object} value
 */
MockAjax.prototype.setRequestHeader = function(header, value){
    this.headers[header] = value;
};

/**
 * Simulate the XHR getAllResponseHeaders method
 */
MockAjax.prototype.getAllResponseHeaders = function(){
    return '';
};

/**
 * Simulate the XHR getResponseHeader method
 * @param {Object} name
 */
MockAjax.prototype.getResponseHeader = function(name){
    return this.headers[header];
};

/**
 * Simulate the XHR onreadystatechange method
 */
MockAjax.prototype.onreadystatechange = function(){
};

/**
 * Method for triggering a response completion
 */
MockAjax.prototype.complete = function(response){
    this.responseText = response.responseText || '';
    this.status = response.status;
    this.statusText = response.statusText;
    this.responseXML = response.responseXML || this.xmlDOM(response.responseText);
    this.responseHeaders = response.responseHeaders || {"Content-type": response.contentType || "application/json" };
    this.readyState = 4;
    this.readyChange();
};

/**
 * Converts string to XML DOM
 */
MockAjax.prototype.xmlDOM = function(xml) {
    // IE DOMParser support
    if (!window.DOMParser && window.ActiveXObject) {
        doc = new ActiveXObject('Microsoft.XMLDOM');
        doc.async = 'false';
        DOMParser = function() {};
        DOMParser.prototype.parseFromString = function(xmlString) {
            var doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async = 'false';
            doc.loadXML(xmlString);
            return doc;
        };
    } 

    try {
        return (new DOMParser()).parseFromString(xml, "text/xml");
    } catch (e) {
        return null;
    }
};