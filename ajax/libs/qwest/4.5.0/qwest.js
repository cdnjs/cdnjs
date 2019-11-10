/*! qwest 4.5.0 (https://github.com/pyrsmk/qwest) */

module.exports = function() {

    var global = typeof window != 'undefined' ? window : self,
        pinkyswear = require('pinkyswear'),
        jparam = require('jquery-param'),
        defaultOptions = {},
        // Default response type for XDR in auto mode
        defaultXdrResponseType = 'json',
        // Default data type
        defaultDataType = 'post',
        // Variables for limit mechanism
        limit = null,
        requests = 0,
        request_stack = [],
        // Get XMLHttpRequest object
        getXHR = global.XMLHttpRequest? function(){
            return new global.XMLHttpRequest();
        }: function(){
            return new ActiveXObject('Microsoft.XMLHTTP');
        },
        // Guess XHR version
        xhr2 = (getXHR().responseType===''),

    // Core function
    qwest = function(method, url, data, options, before) {
        // Format
        method = method.toUpperCase();
        data = data === undefined ? null : data;
        options = options || {};
        for(var name in defaultOptions) {
            if(!(name in options)) {
                if(typeof defaultOptions[name] == 'object' && typeof options[name] == 'object') {
                    for(var name2 in defaultOptions[name]) {
                        options[name][name2] = defaultOptions[name][name2];
                    }
                }
                else {
                    options[name] = defaultOptions[name];
                }
            }
        }

        // Define variables
        var nativeResponseParsing = false,
            crossOrigin,
            xhr,
            xdr = false,
            timeout,
            aborted = false,
            attempts = 0,
            headers = {},
            mimeTypes = {
                text: '*/*',
                xml: 'text/xml',
                json: 'application/json',
                post: 'application/x-www-form-urlencoded',
                document: 'text/html'
            },
            accept = {
                text: '*/*',
                xml: 'application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1',
                json: 'application/json; q=1.0, text/*; q=0.8, */*; q=0.1'
            },
            i, j,
            response,
            sending = false,

        // Create the promise
        promise = pinkyswear(function(pinky) {
            pinky.abort = function() {
                if(!aborted) {
                    if(xhr && xhr.readyState != 4) { // https://stackoverflow.com/questions/7287706/ie-9-javascript-error-c00c023f
                        xhr.abort();
                    }
                    if(sending) {
                        --requests;
                        sending = false;
                    }
                    aborted = true;
                }
            };
            pinky.send = function() {
                // Prevent further send() calls
                if(sending) {
                    return;
                }
                // Reached request limit, get out!
                if(requests == limit) {
                    request_stack.push(pinky);
                    return;
                }
                // Verify if the request has not been previously aborted
                if(aborted) {
                    if(request_stack.length) {
                        request_stack.shift().send();
                    }
                    return;
                }
                // The sending is running
                ++requests;
                sending = true;
                // Get XHR object
                xhr = getXHR();
                if(crossOrigin) {
                    if(!('withCredentials' in xhr) && global.XDomainRequest) {
                        xhr = new XDomainRequest(); // CORS with IE8/9
                        xdr = true;
                        if(method != 'GET' && method != 'POST') {
                            method = 'POST';
                        }
                    }
                }
                // Open connection
                if(xdr) {
                    xhr.open(method, url);
                }
                else {
                    xhr.open(method, url, options.async, options.user, options.password);
                    if(xhr2 && options.async) {
                        xhr.withCredentials = options.withCredentials;
                    }
                }
                // Set headers
                if(!xdr) {
                    for(var i in headers) {
                        if(headers[i]) {
                            xhr.setRequestHeader(i, headers[i]);
                        }
                    }
                }
                // Verify if the response type is supported by the current browser
                if(xhr2 && options.responseType != 'auto') {
                    try {
                        xhr.responseType = options.responseType;
                        nativeResponseParsing = (xhr.responseType == options.responseType);
                    }
                    catch(e) {}
                }
                // Plug response handler
                if(xhr2 || xdr) {
                    xhr.onload = handleResponse;
                    xhr.onerror = handleError;
                    // http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
                    if(xdr) {
                        xhr.onprogress = function() {};
                    }
                }
                else {
                    xhr.onreadystatechange = function() {
                        if(xhr.readyState == 4) {
                            handleResponse();
                        }
                    };
                }
                // Plug timeout
                if(options.async) {
                    if('timeout' in xhr) {
                        xhr.timeout = options.timeout;
                        xhr.ontimeout = handleTimeout;
                    }
                    else {
                        timeout = setTimeout(handleTimeout, options.timeout);
                    }
                }
                // http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
                else if(xdr) {
                    xhr.ontimeout = function() {};
                }
                // Override mime type to ensure the response is well parsed
                if(options.responseType != 'auto' && 'overrideMimeType' in xhr) {
                    xhr.overrideMimeType(mimeTypes[options.responseType]);
                }
                // Run 'before' callback
                if(before) {
                    before(xhr);
                }
                // Send request
                if(xdr) {
                    // https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest
                    setTimeout(function() {
                        xhr.send(method != 'GET'? data : null);
                    }, 0);
                }
                else {
                    xhr.send(method != 'GET' ? data : null);
                }
            };
            return pinky;
        }),

        // Handle the response
        handleResponse = function() {
            var i, responseType;
            // Stop sending state
            sending = false;
            clearTimeout(timeout);
            // Launch next stacked request
            if(request_stack.length) {
                request_stack.shift().send();
            }
            // Verify if the request has not been previously aborted
            if(aborted) {
                return;
            }
            // Decrease the number of requests
            --requests;
            // Handle response
            try{
                // Process response
                if(nativeResponseParsing) {
                    if('response' in xhr && xhr.response === null) {
                        throw 'The request response is empty';
                    }
                    response = xhr.response;
                }
                else {
                    // Guess response type
                    responseType = options.responseType;
                    if(responseType == 'auto') {
                        if(xdr) {
                            responseType = defaultXdrResponseType;
                        }
                        else {
                            var ct = xhr.getResponseHeader('Content-Type') || '';
                            if(ct.indexOf(mimeTypes.json)>-1) {
                                responseType = 'json';
                            }
                            else if(ct.indexOf(mimeTypes.xml) > -1) {
                                responseType = 'xml';
                            }
                            else {
                                responseType = 'text';
                            }
                        }
                    }
                    // Handle response type
                    switch(responseType) {
                        case 'json':
                            if(xhr.responseText.length) {
                                try {
                                    if('JSON' in global) {
                                        response = JSON.parse(xhr.responseText);
                                    }
                                    else {
                                        response = new Function('return (' + xhr.responseText + ')')();
                                    }
                                }
                                catch(e) {
                                    throw "Error while parsing JSON body : "+e;
                                }
                            }
                            break;
                        case 'xml':
                            // Based on jQuery's parseXML() function
                            try {
                                // Standard
                                if(global.DOMParser) {
                                    response = (new DOMParser()).parseFromString(xhr.responseText,'text/xml');
                                }
                                // IE<9
                                else {
                                    response = new ActiveXObject('Microsoft.XMLDOM');
                                    response.async = 'false';
                                    response.loadXML(xhr.responseText);
                                }
                            }
                            catch(e) {
                                response = undefined;
                            }
                            if(!response || !response.documentElement || response.getElementsByTagName('parsererror').length) {
                                throw 'Invalid XML';
                            }
                            break;
                        default:
                            response = xhr.responseText;
                    }
                }
                // Late status code verification to allow passing data when, per example, a 409 is returned
                // --- https://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
                if('status' in xhr && !/^2|1223/.test(xhr.status)) {
                    throw xhr.status + ' (' + xhr.statusText + ')';
                }
                // Fulfilled
                promise(true, [xhr, response]);
            }
            catch(e) {
                // Rejected
                promise(false, [e, xhr, response]);
            }
        },

        // Handle errors
        handleError = function(message) {
            if(!aborted) {
                message = typeof message == 'string' ? message : 'Connection aborted';
                promise.abort();
                promise(false, [new Error(message), xhr, null]);
            }
        },

        // Handle timeouts
        handleTimeout = function() {
            if(!aborted) {
                if(!options.attempts || ++attempts != options.attempts) {
                    xhr.abort();
                    sending = false;
                    promise.send();
                }
                else {
                    handleError('Timeout (' + url + ')');
                }
            }
        };

        // Normalize options
        options.async = 'async' in options ? !!options.async : true;
        options.cache = 'cache' in options ? !!options.cache : false;
        options.dataType = 'dataType' in options ? options.dataType.toLowerCase() : defaultDataType;
        options.responseType = 'responseType' in options ? options.responseType.toLowerCase() : 'auto';
        options.user = options.user || '';
        options.password = options.password || '';
        options.withCredentials = !!options.withCredentials;
        options.timeout = 'timeout' in options ? parseInt(options.timeout, 10) : 30000;
        options.attempts = 'attempts' in options ? parseInt(options.attempts, 10) : 1;

        // Guess if we're dealing with a cross-origin request
        i = url.match(/\/\/(.+?)\//);
        crossOrigin = i && (i[1] ? i[1] != location.host : false);

        // Prepare data
        if('ArrayBuffer' in global && data instanceof ArrayBuffer) {
            options.dataType = 'arraybuffer';
        }
        else if('Blob' in global && data instanceof Blob) {
            options.dataType = 'blob';
        }
        else if('Document' in global && data instanceof Document) {
            options.dataType = 'document';
        }
        else if('FormData' in global && data instanceof FormData) {
            options.dataType = 'formdata';
        }
        if(data !== null) {
            switch(options.dataType) {
                case 'json':
                    data = JSON.stringify(data);
                    break;
                case 'post':
                case 'queryString':
                    data = jparam(data);
            }
        }

        // Prepare headers
        if(options.headers) {
            var format = function(match,p1,p2) {
                return p1 + p2.toUpperCase();
            };
            for(i in options.headers) {
                headers[i.replace(/(^|-)([^-])/g,format)] = options.headers[i];
            }
        }
        if(!('Content-Type' in headers) && method!='GET') {
            if(options.dataType in mimeTypes) {
                if(mimeTypes[options.dataType]) {
                    headers['Content-Type'] = mimeTypes[options.dataType];
                }
            }
        }
        if(!headers.Accept) {
            headers.Accept = (options.responseType in accept) ? accept[options.responseType] : '*/*';
        }
        if(!crossOrigin && !('X-Requested-With' in headers)) { // (that header breaks in legacy browsers with CORS)
            headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        if(!options.cache && !('Cache-Control' in headers)) {
            headers['Cache-Control'] = 'no-cache';
        }

        // Prepare URL
        if((method == 'GET' || options.dataType == 'queryString') && data && typeof data == 'string') {
            url += (/\?/.test(url)?'&':'?') + data;
        }

        // Start the request
        if(options.async) {
            promise.send();
        }

        // Return promise
        return promise;

    };

    // Define external qwest object
    var getNewPromise = function(q) {
            // Prepare
            var promises = [],
                loading = 0,
                values = [];
            // Create a new promise to handle all requests
            return pinkyswear(function(pinky) {
                // Basic request method
                var method_index = -1,
                    createMethod = function(method) {
                        return function(url, data, options, before) {
                            var index = ++method_index;
                            ++loading;
                            promises.push(qwest(method, pinky.base + url, data, options, before).then(function(xhr, response) {
                                values[index] = arguments;
                                if(!--loading) {
                                    pinky(true, values.length == 1 ? values[0] : [values]);
                                }
                            }, function() {
                                pinky(false, arguments);
                            }));
                            return pinky;
                        };
                    };
                // Define external API
                pinky.get = createMethod('GET');
                pinky.post = createMethod('POST');
                pinky.put = createMethod('PUT');
                pinky['delete'] = createMethod('DELETE');
                pinky['catch'] = function(f) {
                    return pinky.then(null, f);
                };
                pinky.complete = function(f) {
                    var func = function() {
                        f(); // otherwise arguments will be passed to the callback
                    };
                    return pinky.then(func, func);
                };
                pinky.map = function(type, url, data, options, before) {
                    return createMethod(type.toUpperCase()).call(this, url, data, options, before);
                };
                // Populate methods from external object
                for(var prop in q) {
                    if(!(prop in pinky)) {
                        pinky[prop] = q[prop];
                    }
                }
                // Set last methods
                pinky.send = function() {
                    for(var i=0, j=promises.length; i<j; ++i) {
                        promises[i].send();
                    }
                    return pinky;
                };
                pinky.abort = function() {
                    for(var i=0, j=promises.length; i<j; ++i) {
                        promises[i].abort();
                    }
                    return pinky;
                };
                return pinky;
            });
        },
        q = {
            base: '',
            get: function() {
                return getNewPromise(q).get.apply(this, arguments);
            },
            post: function() {
                return getNewPromise(q).post.apply(this, arguments);
            },
            put: function() {
                return getNewPromise(q).put.apply(this, arguments);
            },
            'delete': function() {
                return getNewPromise(q)['delete'].apply(this, arguments);
            },
            map: function() {
                return getNewPromise(q).map.apply(this, arguments);
            },
            xhr2: xhr2,
            limit: function(by) {
                limit = by;
                return q;
            },
            setDefaultOptions: function(options) {
                defaultOptions = options;
                return q;
            },
            setDefaultXdrResponseType: function(type) {
                defaultXdrResponseType = type.toLowerCase();
                return q;
            },
            setDefaultDataType: function(type) {
                defaultDataType = type.toLowerCase();
                return q;
            },
            getOpenRequests: function() {
                return requests;
            }
        };

    return q;

}();
