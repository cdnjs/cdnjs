/**
 * Aja.js
 * Ajax without XML : Asynchronous Javascript and JavaScript/JSON(P)
 *
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license MIT
 */
(function(){
    'use strict';

    /**
     * supported request types.
     * TODO support new types :   'script', 'style', 'file'?
     */
    var types = ['html', 'json', 'jsonp'];

    /**
     * supported http methods
     */
    var methods = [
        'connect',
        'delete',
        'get',
        'head',
        'options',
        'patch',
        'post',
        'put',
        'trace'
    ];

    /**
     * API entry point.
     * It creates an new {@link Aja} object.
     *
     * @example aja().url('page.html').into('#selector').go();
     *
     * @exports aja
     * @namespace aja
     * @returns {Aja} the {@link Aja} object ready to create your request.
     */
    var aja = function aja(){

        //contains all the values from the setter for this context.
        var data = {};

        //contains the bound events.
        var events = {};

        /**
         * The Aja object is your context, it provides your getter/setter
         * as well as methods the fluent way.
         * @typedef {Object} Aja
         */

        /**
         * @type {Aja}
         * @lends aja
         */
        var Aja = {

            /**
             * URL getter/setter: where your request goes.
             * All URL formats are supported: <pre>[protocol:][//][user[:passwd]@][host.tld]/path[?query][#hash]</pre>.
             *
             * @example aja().url('bestlib?pattern=aja');
             *
             * @throws TypeError
             * @param {String} [url] - the url to set
             * @returns {Aja|String} chains or get the URL
             */
            url : function(url){
               return _chain.call(this, 'url', url, validators.string);
            },

            /**
             * Is the request synchronous (async by default) ?
             *
             * @example aja().sync(true);
             *
             * @param {Boolean|*} [sync] - true means sync (other types than booleans are casted)
             * @returns {Aja|Boolean} chains or get the sync value
             */
            sync : function(sync){
               return _chain.call(this, 'sync', sync, validators.bool);
            },

            /**
             * Should we force to disable browser caching (true by default) ?
             * By setting this to false, then a buster will be added to the requests.
             *
             * @example aja().cache(false);
             *
             * @param {Boolean|*} [cache] - false means no cache  (other types than booleans are casted)
             * @returns {Aja|Boolean} chains or get cache value
             */
            cache : function(cache){
               return _chain.call(this, 'cache', cache, validators.bool);
            },

            /**
             * Type getter/setter: one of the predefined request type.
             * The supported types are : <pre>['html', 'json', 'jsonp', 'script', 'style']</pre>.
             * If not set, the default type is deduced regarding the context, but goes to json otherwise.
             *
             * @example aja().type('json');
             *
             * @throws TypeError if an unknown type is set
             * @param {String} [type] - the type to set
             * @returns {Aja|String} chains or get the type
             */
            type : function(type){
               return _chain.call(this, 'type', type, validators.type);
            },

            /**
             * HTTP Request Header getter/setter.
             *
             * @example aja().header('Content-Type', 'application/json');
             *
             * @throws TypeError
             * @param {String} name - the name of the header to get/set
             * @param {String} [value] - the value of the header to set
             * @returns {Aja|String} chains or get the header from the given name
             */
            header : function(name, value){
                data.headers = data.headers || {};

                validators.string(name);
                if(typeof value !== 'undefined'){
                    validators.string(value);

                    data.headers[name] = value;

                    return this;
                }

                return data.headers[name];
            },

            /**
             * <strong>Setter only</strong> to add authentication credentials to the request.
             *
             * @throws TypeError
             * @param {String} user - the user name
             * @param {String} passwd - the password value
             * @returns {Aja} chains
             */
            auth : function(user, passwd){
                //setter only

                validators.string(user);
                validators.string(passwd);
                data.auth = {
                   user : user,
                   passwd : passwd
                };

                return this;
            },

            /**
             * HTTP method getter/setter.
             *
             * @example aja().method('post');
             *
             * @throws TypeError if an unknown method is set
             * @param {String} [method] - the method to set
             * @returns {Aja|String} chains or get the method
             */
            method : function(method){
               return _chain.call(this, 'method', method, validators.method, function(value){
                    if(value.toLowerCase() === 'post'){
                        this.header('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                    }
                    return value;
               });
            },

            /**
             * URL's queryString getter/setter. The parameters are ALWAYS appended to the URL.
             *
             * @example aja().queryString({ user : '12' }); //  ?user=12
             *
             * @throws TypeError
             * @param {Object|String} [params] - key/values POJO or URL queryString directly to set
             * @returns {Aja|String} chains or get the params
             */
            queryString : function(params){
               return _chain.call(this, 'queryString', params, validators.queryString);
            },

            /**
             * URL's queryString getter/setter.
             * Regarding the HTTP method the data goes to the queryString or the body.
             *
             * @example aja().data({ user : '12' });
             *
             * @throws TypeError
             * @param {Object} [params] - key/values POJO to set
             * @returns {Aja|String} chains or get the params
             */
            data : function(params){
               return _chain.call(this, 'data', params, validators.plainObject);
            },

            /**
             * Request Body getter/setter.
             * Objects and arrays are stringified (except FormData instances)
             *
             * @example aja().body(new FormData());
             *
             * @throws TypeError
             * @param {String|Object|Array|Boolean|Number|FormData} [content] - the content value to set
             * @returns {Aja|String|FormData} chains or get the body content
             */
            body : function(content){
                return _chain.call(this, 'body', content, null, function(content){
                   if(typeof content === 'object'){
                        //support FormData to be sent direclty
                        if( !(content instanceof FormData)){
                            //otherwise encode the object/array to a string
                            try {
                                content = JSON.stringify(content);
                            } catch(e){
                                throw new TypeError('Unable to stringify body\'s content : ' + e.name);
                            }
                            this.header('Content-Type', 'application/json');
                        }
                   } else {
                        content = content + ''; //cast
                   }
                   return content;
                });
            },

            /**
             * Into selector getter/setter. When you want an Element to contain the response.
             *
             * @example aja().into('div > .container');
             *
             * @throws TypeError
             * @param {String|HTMLElement} [selector] - the dom query selector or directly the Element
             * @returns {Aja|Array} chains or get the list of found elements
             */
            into : function(selector){
                return _chain.call(this, 'into', selector, validators.selector, function(selector){
                    if(typeof selector === 'string'){
                        return document.querySelectorAll(selector);
                    }
                    if(selector instanceof HTMLElement){
                        return [selector];
                    }
                });
            },

            /**
             * Padding name getter/setter, ie. the callback's PARAMETER name in your JSONP query.
             *
             * @example aja().jsonPaddingName('callback');
             *
             * @throws TypeError
             * @param {String} [paramName] - a valid parameter name
             * @returns {Aja|String} chains or get the parameter name
             */
            jsonPaddingName : function(paramName){
                return _chain.call(this, 'jsonPaddingName', paramName, validators.string);
            },

            /**
             * Padding value  getter/setter, ie. the callback's name in your JSONP query.
             *
             * @example aja().jsonPadding('someFunction');
             *
             * @throws TypeError
             * @param {String} [padding] - a valid function name
             * @returns {Aja|String} chains or get the padding name
             */
            jsonPadding : function(padding){
                return _chain.call(this, 'jsonPadding', padding, validators.func);
            },

            /**
             * Attach an handler to an event.
             * Calling `on` with the same eventName multiple times add callbacks: they
             * will all be executed.
             *
             * @example aja().on('success', function(res){ console.log('Cool', res);  });
             *
             * @param {String} name - the name of the event to listen
             * @param {Function} cb - the callback to run once the event is triggered
             * @returns {Aja} chains
             */
            on : function(name, cb){
                if(typeof cb === 'function'){
                    events[name] = events[name] || [];
                    events[name].push(cb);
                }
                return this;
            },

            /**
             * Remove ALL handlers for an event.
             *
             * @example aja().off('success');
             *
             * @param {String} name - the name of the event
             * @returns {Aja} chains
             */
            off : function(name){
                events[name] = [];
                return this;
            },

            /**
             * Trigger an event.
             * This method will be called hardly ever outside Aja itself,
             * but there is edge cases where it can be useful.
             *
             * @example aja().trigger('error', new Error('Emergency alert'));
             *
             * @param {String} name - the name of the event to trigger
             * @param {*} data - arguments given to the handlers
             * @returns {Aja} chains
             */
            trigger : function(name, data){
                var self = this;
                var eventCalls  = function eventCalls(name, data){
                    if(events[name] instanceof Array){
                        events[name].forEach(function(event){
                            event.call(self, data);
                        });
                    }
                };
                if(typeof name !== 'undefined'){
                    name = name + '';
                    var statusPattern = /^([0-9])([0-9x])([0-9x])$/i;
                    var triggerStatus = name.match(statusPattern);

                    //HTTP status pattern
                    if(triggerStatus && triggerStatus.length > 3){
                        Object.keys(events).forEach(function(eventName){
                            var listenerStatus = eventName.match(statusPattern);
                            if(listenerStatus && listenerStatus.length > 3 &&       //an listener on status
                                triggerStatus[1] === listenerStatus[1] &&           //hundreds match exactly
                                (listenerStatus[2] === 'x' ||  triggerStatus[2] === listenerStatus[2]) && //tens matches
                                (listenerStatus[3] === 'x' ||  triggerStatus[3] === listenerStatus[3])){ //ones matches

                                eventCalls(eventName, data);
                            }
                        });
                    //or exact matching
                    } else if(events[name]){
                       eventCalls(name, data);
                    }
                }
                return this;
            },

            /**
             * Trigger the call.
             * This is the end of your chain loop.
             *
             * @example aja()
             *           .url('data.json')
             *           .on('200', function(res){
             *               //Yeah !
             *            })
             *           .go();
             */
            go : function(){

                var type    = data.type || (data.into ? 'html' : 'json');
                var url     = _buildQuery();

                //delegates to ajaGo
                if(typeof ajaGo[type] === 'function'){
                    return ajaGo[type].call(this, url);
                }
            }
        };

        /**
         * Contains the different communication methods.
         * Used as provider by {@link Aja.go}
         *
         * @type {Object}
         * @private
         * @memberof aja
         */
        var ajaGo = {


            /**
             * XHR call to url to retrieve JSON
             * @param {String} url - the url
             */
            json : function(url){
                var self = this;
                ajaGo._xhr.call(this, url, function processRes(res){
                    try {
                        res = JSON.parse(res);
                    } catch(e){
                        self.trigger('error', e);
                        return null;
                    }
                    return res;
                });
            },

            /**
             * XHR call to url to retrieve HTML and add it to a container if set.
             * @param {String} url - the url
             */
            html : function(url){
                ajaGo._xhr.call(this, url, function processRes(res){
                    if(data.into && data.into.length){
                        data.into.forEach(function(elt){
                            elt.innerHTML = res;
                        });
                    }
                    return res;
                });
            },

            /**
             * Create and send an XHR query.
             * @param {String} url - the url
             * @param {Function} processRes - to modify / process the response before sent to events.
             */
            _xhr : function(url, processRes){
                var self = this;

                //iterators
                var key, header;

                var method      = data.method || 'get';
                var async       = data.sync !== true;
                var request     = new XMLHttpRequest();
                var _data       = data.data;
                var body        = data.body;
                var openParams;

                if(_data && _dataInBody()){
                    if(typeof body !== 'string'){
                        body = '';
                    }
                    for(key in _data){
                        body += key + '=' + _data[key] + '\n\r';
                    }
                }

                //open the XHR request
                openParams = [method, url, async];
                if(data.auth){
                    openParams.push(data.auth.user);
                    openParams.push(data.auth.passwd);
                }
                request.open.apply(request, openParams);

                //set the headers
                if(data.headers){
                    for(header in data.headers){
                        request.setRequestHeader(header, data.headers[header]);
                    }
                }

                //bind events
                request.onprogress = function(e){
                    if (e.lengthComputable) {
                        self.trigger('progress', e.loaded / e.total);
                    }
                };

                request.onload = function onRequestLoad(){
                    var response = request.responseText;

                    if(this.status >= 200 && this.status < 300){
                        if(typeof processRes === 'function'){
                            response = processRes(response);
                        }
                        self.trigger('success', response);
                    }

                    self.trigger(this.status, response);

                    self.trigger('end', response);
                };

                request.onerror = function onRequestError (err){
                    self.trigger('error', err, arguments);
                };

                //send the request
                request.send(body);
            },

            /**
             * @this {Aja} call bound to the Aja context
             * @param {String} url - the url
             */
            jsonp : function(url){
                var script;
                var self            = this;
                var head            = document.querySelector('head');
                var async           = data.sync !== true;
                var jsonPaddingName = data.jsonPaddingName || 'callback';
                var jsonPadding     = data.jsonPadding || ('_padd' + new Date().getTime() + Math.floor(Math.random() * 10000));
                var paddingQuery    = {};

                if(aja[jsonPadding]){
                    throw new Error('Padding ' + jsonPadding + '  already exists. It must be unique.');
                }
                if(!/^ajajsonp_/.test(jsonPadding)){
                    jsonPadding = 'ajajsonp_' + jsonPadding;
                }

                //window.ajajsonp = window.ajajsonp || {};
                window[jsonPadding] = function padding (response){
                    self.trigger('success', response);
                    head.removeChild(script);
                    window[jsonPadding] = undefined;
                };

                paddingQuery[jsonPaddingName] = jsonPadding;

                url =  appendQueryString(url, paddingQuery);

                script = document.createElement('script');
                script.async = async;
                script.src = url;
                script.onerror = function(){
                    self.trigger('error', arguments);
                    head.removeChild(script);
                    window[jsonPadding] = undefined;
                };
                head.appendChild(script);
            }
        };

        /**
         * Helps you to chain getter/setters.
         * @private
         * @memberof aja
         * @this {Aja} bound to the current context
         * @param {String} name - the property name
         * @param {*} [value] - the property value if we are in a setter
         * @param {Function} [validator] - to validate/transform the value if needed
         * @param {Function} [update] - when there is more to do with the setter
         * @returns {Aja|*} either the current context (setter) or the requested value (getter)
         * @throws TypeError
         */
        var _chain = function _chain(name, value, validator, update){
            if(typeof value !== 'undefined'){
                if(typeof validator === 'function'){
                    try{
                        value = validator.call(validators, value);
                    } catch(e){
                        throw new TypeError('Failed to set ' + name + ' : ' + e.message);
                    }
                }
                if(typeof update === 'function'){
                    data[name] = update.call(this, value);
                } else {
                    data[name] = value;
                }
                return this;
            }
            return data[name] === 'undefined' ? null : data[name];
        };

        /**
         * Check whether the data must be set in the body instead of the queryString
         * @private
         * @memberof aja
         * @returns {Boolean} true id data goes to the body
         */
        var _dataInBody = function _dataInBody(){
            return ['delete', 'patch', 'post', 'put'].indexOf(data.method) > -1;
        };

        /**
         * Build the URL to run the request against.
         * @private
         * @memberof aja
         * @returns {String} the URL
         */
        var _buildQuery = function _buildQuery(){

            var url         = data.url;
            var cache       = typeof data.cache !== 'undefined' ? !!data.cache : true;
            var queryString = data.queryString;
            var _data       = data.data;

            //add a cache buster
            if(cache === false){
               queryString += 'ajabuster=' + new Date().getTime();
            }

            url = appendQueryString(url, queryString);

            if(_data && !_dataInBody()){
               url =  appendQueryString(url, _data);
            }
            return url;
        };

        //expose the Aja function
        return Aja;
    };

    /**
     * Validation/reparation rules for Aja's getter/setter.
     */
    var validators = {

        /**
         * cast to boolean
         * @param {*} value
         * @returns {Boolean} casted value
         */
        bool : function(value){
            return !!value;
        },

        /**
         * Check whether the given parameter is a string
         * @param {String} string
         * @returns {String} value
         * @throws {TypeError} for non strings
         */
        string : function(string){
            if(typeof string !== 'string'){
                throw new TypeError('a string is expected, but ' + string + ' [' + (typeof string) + '] given');
            }
            return string;
        },

        /**
         * Check whether the given parameter is a plain object (array and functions aren't accepted)
         * @param {Object} object
         * @returns {Object} object
         * @throws {TypeError} for non object
         */
        plainObject : function(object){
            if(typeof object !== 'object' || object.constructor !== Object){
                throw new TypeError('an object is expected, but ' + object + '  [' + (typeof object) + '] given');
            }
            return object;
        },

        /**
         * Check whether the given parameter is a type supported by Aja.
         * The list of supported types is set above, in the {@link types} variable.
         * @param {String} type
         * @returns {String} type
         * @throws {TypeError} if the type isn't supported
         */
        type : function(type){
            type = this.string(type);
            if(types.indexOf(type.toLowerCase()) < 0){
                throw new TypeError('a type in [' + types.join(', ') + '] is expected, but ' + type + ' given');
            }
            return type.toLowerCase();
        },

        /**
         * Check whether the given HTTP method is supported.
         * The list of supported methods is set above, in the {@link methods} variable.
         * @param {String} method
         * @returns {String} method (but to lower case)
         * @throws {TypeError} if the method isn't supported
         */
        method : function(method){
            method = this.string(method);
            if(methods.indexOf(method.toLowerCase()) < 0){
                throw new TypeError('a method in [' + methods.join(', ') + '] is expected, but ' + method + ' given');
            }
            return method.toLowerCase();
        },

        /**
         * Check the queryString, and create an object if a string is given.
         *
         * @param {String|Object} params
         * @returns {Object} key/value based queryString
         * @throws {TypeError} if wrong params type or if the string isn't parseable
         */
        queryString : function(params){
            var object = {};
            if(typeof params === 'string'){

               params.replace('?', '').split('&').forEach(function(kv){
                    var pair = kv.split('=');
                    if(pair.length === 2){
                        object[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
                    }
               });
            } else {
                object = params;
            }
            return this.plainObject(object);
        },

        /**
         * Check if the parameter enables us to select a DOM Element.
         *
         * @param {String|HTMLElement} selector - CSS selector or the element ref
         * @returns {String|HTMLElement} same as input if valid
         * @throws {TypeError} check it's a string or an HTMLElement
         */
        selector : function(selector){
            if(typeof selector !== 'string' && !(selector instanceof HTMLElement)){
                throw new TypeError('a selector or an HTMLElement is expected, ' + selector + ' [' + (typeof selector) + '] given');
            }
            return selector;
        },

        /**
         * Check if the parameter is a valid JavaScript function name.
         *
         * @param {String} functionName
         * @returns {String} same as input if valid
         * @throws {TypeError} check it's a string and a valid name against the pattern inside.
         */
        func : function(functionName){
            functionName = this.string(functionName);
            if(!/^([a-zA-Z_])([a-zA-Z0-9_\-])+$/.test(functionName)){
                throw new TypeError('a valid function name is expected, ' + functionName + ' [' + (typeof functionName) + '] given');
            }
            return functionName;
         }
    };

    /**
     * Query string helper : append some parameters
     * @private
     * @param {String} url - the URL to append the parameters
     * @param {Object} params - key/value
     * @returns {String} the new URL
     */
    var appendQueryString = function appendQueryString(url, params){
        var key;
        url = url || '';
        if(params){
            if(url.indexOf('?') === -1){
                url += '?';
            }
            for(key in params){
                url += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            }
        }

        return url;
    };

    //AMD, CommonJs, then globals
    if (typeof define === 'function' && define.amd) {
        define([], function(){
            return aja;
        });
    } else if (typeof exports === 'object') {
        module.exports = aja;
    } else {
        window.aja = window.aja || aja;
    }

}());
