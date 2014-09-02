/**
 * Copyright (c) 2011, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 *    Redistributions of source code must retain the above copyright notice, this list of conditions and the
 *    following disclaimer.
 *
 *    Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 *    the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 *    Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 *    promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
(function (global) {

    "use strict";

    if (global.Sfdc && global.Sfdc.canvas) {
        return;
    }

    // cached references
    //------------------

    var oproto = Object.prototype,
        aproto = Array.prototype,
        doc = global.document,
        /**
        * @class Canvas
        * @exports $ as Sfdc.canvas
        */
        // $ functions
        // The canvas global object is made available in the global scope.  The reveal to the global scope is done later.
        $ = {

            // type utilities
            //---------------
            
            /**
            * @description Checks whether an object contains an uninherited property.
            * @param {Object} obj The object to check
            * @param {String} prop The property name to check
            * @returns {Boolean} <code>true</code> if the property exists for the object itself and is not inherited, otherwise <code>false</code>
            */
            hasOwn: function (obj, prop) {
                return oproto.hasOwnProperty.call(obj, prop);
            },
            
            /**
            * @description Checks whether an object is currently undefined.
            * @param {Object} value The object to check
            * @returns {Boolean} <code>true</code> if the object or value is of type undefined, otherwise <code>false</code>
            */
            isUndefined: function (value) {
                var undef;
                return value === undef;
            },
            
            /**
            * @description Checks whether object is undefined, null, or an empty string.
            * @param {Object} value The object to check
            * @returns {Boolean} <code>true</code> if the object or value is of type undefined, otherwise <code>false</code>
            */
            isNil: function (value) {
                return $.isUndefined(value) || value === null || value === "";
            },
            
            /**
            * @description Checks whether a value is a number. This function doesn't resolve strings to numbers.
            * @param {Object} value Object to check
            * @returns {Boolean} <code>true</code> if the object or value is a number, otherwise <code>false</code>
            */
            isNumber: function (value) {
                return !!(value === 0 || (value && value.toExponential && value.toFixed));
            },

            /**
            * @description Checks whether an object is a function.
            * @param {Object} value Object to check
            * @returns {Boolean} <code>true</code> if the object or value is a function, otherwise <code>false</code>
            */
            isFunction: function (value) {
                //return typeof value === "function";
                return !!(value && value.constructor && value.call && value.apply);
            },
            
            /**
            * @description Checks whether an object is an array.
            * @param {Object} value The object to check
            * @function
            * @returns {Boolean} <code>true</code> if the object or value is of type array, otherwise <code>false</code>
            */
            isArray: Array.isArray || function (value) {
                return oproto.toString.call(value) === '[object Array]';
            },
            
            /**
            * @description Checks whether an object is the argument set for a function
            * @param {Object} value The object to check
            * @returns {Boolean} <code>true</code> if the object or value is the argument set for a function, otherwise <code>false</code>
            */
            isArguments: function (value) {
                return !!(value && $.hasOwn(value, 'callee'));
            },
            
            /**
            * @description Checks whether the value is of type 'object' and is not null.
            * @param {Object} value The object to check
            * @returns {Boolean} <code>true</code> if the object or value is of type Object, otherwise <code>false</code>
            */
            isObject: function (value) {
                return value !== null && typeof value === 'object';
            },

            // common functions
            //-----------------
            
            /**
            * @description An empty or blank function.  
            */
            nop: function () {
                /* no-op */
            },
            
            /**
            * @description This function runs the function that is passed to it.
            * @param {Function} fn The function to run
            */
            invoker: function (fn) {
                if ($.isFunction(fn)) {
                    fn();
                }
            },
            
            /**
            * @description This function always returns the argument.
            * @param {Object} obj The object to return, untouched.
            * @returns {Object} The argument used for this function call.
            */
            identity: function (obj) {
                return obj;
            },

            // @todo consider additional tests for: null, boolean, string, nan, element, regexp... as needed
            /**
            * @description Calls a defined function for each element in an object
            * @param {Object} obj The object to loop through.  
                It can be an array, an array like object or a map of properties
            * @param {Function} it The callback function to run for each element.
            * @param {Object} [ctx] The context object to be used for the callback function.
                Defaults to the original object if not provided.
            */
            each: function (obj, it, ctx) {
                if ($.isNil(obj)) {
                    return;
                }
                var nativ = aproto.forEach, i = 0, l, key;
                l = obj.length;
                ctx = ctx || obj;
                // @todo: looks like native method will not break on return false; maybe throw breaker {}
                if (nativ && nativ === obj.forEach) {
                    obj.forEach(it, ctx);
                }
                else if ($.isNumber(l)) { // obj is an array-like object
                    while (i < l) {
                        if (it.call(ctx, obj[i], i, obj) === false) {
                            return;
                        }
                        i += 1;
                    }
                }
                else {
                    for (key in obj) {
                        if ($.hasOwn(obj, key) && it.call(ctx, obj[key], key, obj) === false) {
                            return;
                        }
                    }
                }
            },
            
            /**
            * @description Creates a new array with the results of calling the
                function on each element in the object.
            * @param {Object} obj The object to use.
            * @param {Function} it The callback function to run for each element.
            * @param {Object} [ctx] The context object to be used for the callback function.
                Defaults to the original object if not provided.
            * @returns {Array} The array that results when calling the function on each
                element in the object.
            */
            map: function (obj, it, ctx) {
                var results = [], nativ = aproto.map;
                if ($.isNil(obj)) {
                    return results;
                }
                if (nativ && obj.map === nativ) {
                    return obj.map(it, ctx);
                }
                ctx = ctx || obj;
                $.each(obj, function (value, i, list) {
                    results.push(it.call(ctx, value, i, list));
                });
                return results;
            },
            
            /** 
            * @description Creates an array containing all the elements of the given object
            * @param {Object} obj The object the use in creating the array
            * @returns {Array} An array containing all the elements in the object.
            */
            values: function (obj) {
                return $.map(obj, $.identity);
            },
            
            /**
            * @description Creates a new array containing the selected elements of the given array.
            * @param {Array} array The array to subset.
            * @param {Integer} [begin=0] The index that specifies where to start the selection. 
            * @param {Integer} [end = array.length] The index that specifies where to end the selection.
            * @returns {Array} A new array that contains the selected elements.
            */
            slice: function (array, begin, end) {
                /* FF doesn't like undefined args for slice so ensure we call with args */
                return aproto.slice.call(array, $.isUndefined(begin) ? 0 : begin, $.isUndefined(end) ? array.length : end);
            },

            /**
            * @description Creates an array from an object.
            * @param {Object} iterable The object to use in creating the array.
            * @returns {Array} The new array created from the object.
            */
            toArray: function (iterable) {
                if (!iterable) {
                    return [];
                }
                if (iterable.toArray) {
                    return iterable.toArray;
                }
                if ($.isArray(iterable)) {
                    return iterable;
                }
                if ($.isArguments(iterable)) {
                    return $.slice(iterable);
                }
                return $.values(iterable);
            },
            
            /**
            * @description Calculates the number of elements in an object
            * @param {Object} obj The object to size.
            * @returns {Integer} The number of elements in the object.
            */
            size: function (obj) {
                return $.toArray(obj).length;
            },
            
            /**
            * @description Calculates the location of an element in an array.
            * @param {Array} array The array to check.
            * @param {Object} item The item to search for within the array.
            * @returns {Integer} The index of the element within the array.  
                Returns -1 if the element is not found.
            */            
            indexOf: function (array, item) {
                var nativ = aproto.indexOf, i, l;
                if (!array) {
                    return -1;
                }
                if (nativ && array.indexOf === nativ) {
                    return array.indexOf(item);
                }
                for (i = 0, l = array.length; i < l; i += 1) {
                    if (array[i] === item) {
                        return i;
                    }
                }
                return -1;
            },
            
            /**
            * @description Removes an element from an array.
            * @param {Array} array The array to modify.
            * @param {Object} item The element to remove from the array.
            */
            remove: function (array, item) {
                var i = $.indexOf(array, item);
                if (i >= 0) {
                    array.splice(i, 1);
                }
            },

            /**
             * @description Serializes an object into a string that can be used as a URL query string.
             * @param {Object|Array} a The array or object to serialize.
             * @param {Boolean} [encode=false] Indicates that the string should be encoded.
             * @returns {String} A string representing the object as a URL query string.
             */
            param: function (a, encode) {
                var s = [];

                encode = encode || false;

                function add( key, value ) {

                    if ($.isNil(value)) {return;}
                    value = $.isFunction(value) ? value() : value;
                    if ($.isArray(value)) {
                        $.each( value, function(v, n) {
                            add( key, v );
                        });
                    }
                    else {
                        if (encode) {
                            s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
                        }
                        else {
                            s[ s.length ] = key + "=" + value;
                        }
                    }
                }

                if ( $.isArray(a)) {
                    $.each( a, function(v, n) {
                        add( n, v );
                    });
                } else {
                    for ( var p in a ) {
                        if ($.hasOwn(a, p)) {
                            add( p, a[p]);
                        }
                    }
                }
                return s.join("&").replace(/%20/g, "+");
            },

            /**
             * @description Strip out the URL to just the {scheme}://{host}:{port} - remove any path and query string information.
             * @param {String} url The url to be stripped
             * @returns {String} just the {scheme}://{host}:{port} portion of the url.
             */
            stripUrl : function(url) {
                return ($.isNil(url)) ? null : url.replace( /([^:]+:\/\/[^\/\?#]+).*/, '$1');
            },

            /**
             * @description append the query string to the end of the URL, and strip off any existing Hash tag
             * @param {String} url The url to be appended to
             * @returns uel with query string appended..
             */
            query : function(url, q) {
                if ($.isNil(q)) {
                    return url;
                }
                // Strip any old hash tags
                url = url.replace(/#.*$/, '');
                url += (/^\#/.test(q)) ? q  : (/\?/.test( url ) ? "&" : "?") + q;
                return url;
            },


            // strings
            //--------
            /**
            * @description Adds the contents of 2 or more objets to
                a destination object.
            * @param {Object} dest The destination object to modify.
            * @param {Object} mixin1-n An unlimited number of objects to add to the destination.
            * @returns {Object} The modified destination object.
            */
            extend: function (dest /*, mixin1, mixin2, ... */) {
                $.each($.slice(arguments, 1), function (mixin, i) {
                    $.each(mixin, function (value, key) {
                        dest[key] = value;
                    });
                });
                return dest;
            },

            /**
            * @name Sfdc.canvas.prototypeOf
            * @function
            * @description Returns the prototype of the specified object
            * @param {Object} obj The object for which to find the prototype.
            * @returns {Object} The object that is the prototype of the given object.
            */
            prototypeOf: function (obj) {
                var nativ = Object.getPrototypeOf,
                    proto = '__proto__';
                if ($.isFunction(nativ)) {
                    return nativ.call(Object, obj);
                }
                else {
                    if (typeof {}[proto] === 'object') {
                        return obj[proto];
                    }
                    else {
                        return obj.constructor.prototype;
                    }
                }
            },

            /**
            * @description Adds a module to the global.Sfdc.canvas object
            * @param {String} ns The namespace for the new module.
            * @decl {Object} The module to add.
            * @returns {Object} The global.Sfdc.canvas object with a new module added.
            */
            module: function(ns, decl) {
                var parts = ns.split('.'), parent = global.Sfdc.canvas, i, length;

                // strip redundant leading global
                if (parts[1] === 'canvas') {
                    parts = parts.slice(2);
                }

                length = parts.length;
                for (i = 0; i < length; i += 1) {
                    // create a property if it doesn't exist
                    if ($.isUndefined(parent[parts[i]])) {
                        parent[parts[i]] = {};
                    }
                    parent = parent[parts[i]];
                }

                if ($.isFunction(decl)) {
                    decl = decl();
                }
                return $.extend(parent, decl);
            },

            // dom
            //----
            /**
            * @description Returns the DOM element in the current document with the given ID
            * @param {String} id The id to find in the DOM
            * @returns {DOMElement} The DOM element with the given ID, null if the element does not exist.
            */
            byId: function (id) {
                return doc.getElementById(id);
            },
            /**
            * @description Returns a set of DOM elements in the current document with the given class names
            * @param {String} clazz The class names to find in the DOM.  Multiple
                classnames can be given, separated by whitespace
            * @returns {Array} Set of DOM elements that all have the given class name
            */
            byClass: function (clazz) {
                return doc.getElementsByClassName(clazz);
            },
            /**
            * @description Returns the value for the given attribute name on the given DOM element.
            * @param {DOMElement} el The element on which to check the attribute.
            * @param {String} name The name of the attribute for which to find a value
            * @returns {String} The given attribute's value.
            */
            attr : function(el, name) {
                var a = el.attributes, i;
                for (i = 0; i < a.length; i += 1) {
                    if (name === a[i].name) {
                        return a[i].value;
                    }
                }
            },

            /**
             * @description register a callback to be called after the DOM is ready.
             * onReady.
             * @param {Function} The callback function to be called.
             */
            onReady : function(cb) {
                if ($.isFunction(cb)) {
                    readyHandlers.push(cb);
                }
            }

       },

        readyHandlers = [],

        ready = function () {
            ready = $.nop;
            $.each(readyHandlers, $.invoker);
            readyHandlers = null;
        },

        /**
        * @description 
        * @param {Function} cb The function to run when ready.
        */
        canvas = function (cb) {
            if ($.isFunction(cb)) {
                readyHandlers.push(cb);
            }
        };

    (function () {
        var ael = 'addEventListener',
            tryReady = function () {
                if (doc && /loaded|complete/.test(doc.readyState)) {
                    ready();
                }
                else if (readyHandlers) {
                    if ($.isFunction(global.setTimeout)) {
                        global.setTimeout(tryReady, 30);
                    }
                }
            };

        if (doc && doc[ael]) {
            doc[ael]('DOMContentLoaded', ready, false);
        }

        tryReady();

        if (global[ael]) {
            global[ael]('load', ready, false);
        }
        else if (global.attachEvent) {
            global.attachEvent('onload', ready);
        }

    }());

    $.each($, function (fn, name) {
        canvas[name] = fn;
    });

    if (!global.Sfdc) { 
        global.Sfdc = {};
    }

    global.Sfdc.canvas = canvas;
    if (!global.Sfdc.JSON) {
        global.Sfdc.JSON = JSON;
    }


}(this));/**
*@namespace Sfdc.canvas.cookies
*@name Sfdc.canvas.cookies
*/
(function ($$) {

    "use strict";

    var module =  (function() {

        function isSecure()
        {
            return window.location.protocol === 'https:';
        }

        /**
       * @name Sfdc.canvas.cookies#set
       * @function
       * @description Create a cookie
       * @param {String} name Cookie name
       * @param {String} value Cookie value
       * @param {Integer} [days] Number of days for the cookie to remain active.
                If not provided, the cookie never expires
       */
       function set(name, value, days) {
           var expires = "", date;
           if (days) {
               date = new Date();
               date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
               expires = "; expires=" + date.toGMTString();
           }
           else {
               expires = "";
           }
           document.cookie = name + "=" + value + expires + "; path=/" +  ((isSecure() === true) ? "; secure" : "");
       }
       
       /**
       * @name Sfdc.canvas.cookies#get
       * @function
       * @description Get the cookie with the specified name
       * @param {String} name The name of the cookie to retrieve
       * @returns The value of the cookie if the name is found, otherwise null
       */
       function get(name) {
           var nameEQ, ca, c, i;

           if ($$.isUndefined(name)) {
               return document.cookie.split(';');
           }

           nameEQ = name + "=";
           ca = document.cookie.split(';');
           for (i = 0; i < ca.length; i += 1) {
               c = ca[i];
               while (c.charAt(0) === ' ') {c = c.substring(1, c.length);}
               if (c.indexOf(nameEQ) === 0) {
                   return c.substring(nameEQ.length, c.length);
               }
           }
           return null;
       }
       
       /**
       * @name Sfdc.canvas.cookies#remove
       * @function
       * @description Remove the specified cookie by setting the expiry date to one day ago
       * @param {String} name The name of the cookie to remove.
       */
       function remove(name) {
           set(name, "", -1);
       }

       return {
            set : set,
            get : get,
            remove : remove
        };
    }());


    $$.module('Sfdc.canvas.cookies', module);

}(Sfdc.canvas));
/**
 *@namespace Sfdc.canvas.oauth
 *@name Sfdc.canvas.oauth
 */
(function ($$) {

    "use strict";

    var module =   (function() {

        var accessToken,
            instUrl,
            instId,
            tOrigin,
            childWindow;

        function init() {
            // Get the access token from the cookie (needed to survive refresh),
            // and then remove the cookie per security's request.
            accessToken = $$.cookies.get("access_token");
            $$.cookies.remove("access_token");
        }

        function query(params) {
            var r = [], n;
            if (!$$.isUndefined(params)) {
                for (n in params) {
                    if (params.hasOwnProperty(n)) {
                        // probably should encode these
                        r.push(n + "=" + params[n]);
                    }
                }
                return "?" + r.join('&');
            }
            return '';
        }
        /**
         *@private
         */
        function refresh() {
            // Temporarily set the oauth token in a cookie and then remove it
            // after the refresh.
            $$.cookies.set("access_token", accessToken);
            self.location.reload();
        }
        /**
         * @name Sfdc.canvas.oauth#login
         * @function
         * @description Opens the OAuth popup window to retrieve an OAuth token
         * @param {Object} ctx  Context object that contains the url, the response type, the client id and callback url
         * @docneedsimprovement
         * @example
         * function clickHandler(e)
         * {
         *  var uri;
         *  if (! connect.oauth.loggedin())
         *  {
         *   uri = connect.oauth.loginUrl();
         *   connect.oauth.login(
         *    {uri : uri,
         *     params: {
         *      response_type : "token",
         *      client_id :  "<%=consumerKey%>",
         *      redirect_uri : encodeURIComponent("/sdk/callback.html")
         *      }});
         *  } else {
         *     connect.oauth.logout();
         *  }
         *  return false;
         * }
         */
        function login(ctx) {
            var uri;

            ctx = ctx || {};
            uri = ctx.uri || "/rest/oauth2";
            ctx.params = ctx.params || {state : ""};
            ctx.params.state = ctx.params.state || ctx.callback || window.location.pathname;  // @TODO REVIEW THIS
            ctx.params.display= ctx.params.display || 'popup';
            uri = uri + query(ctx.params);
            childWindow = window.open(uri, 'OAuth', 'status=0,toolbar=0,menubar=0,resizable=0,scrollbars=1,top=50,left=50,height=500,width=680');
        }

        /**
         * @name Sfdc.canvas.oauth#token
         * @function
         * @description Sets, gets or removes the <code>access_token</code> from this JS object <br>
         <p>This function does one of three things <br>
         If the 't' parameter is not passed in, the current value for the <code>access_token</code> value is returned. <br>
         If the the 't' parameter is null, the <code>access_token</code> value is removed. <br>
         Note: for longer term storage of the OAuth token store it server side in the session, access tokens
         should never be stored in cookies.
         Otherwise the <code>access_token</code>  value is set to the 't' parameter and then returned.
         * @param {String} [t] The oauth token to set as the <code>access_token</code> value
         * @returns {String} The resulting <code>access_token</code> value if set, otherwise null
         */
        function token(t) {
            if (arguments.length === 0) {
                if (!$$.isNil(accessToken)) {return accessToken;}
            }
            else {
                accessToken = t;
            }

            return accessToken;
        }

        /**
         * @name Sfdc.canvas.oauth#instance
         * @function
         * @description Sets, gets or removes the <code>instance_url</code> cookie <br>
         <p> This function does one of three things <br>
         If the 'i' parameter is not passed in, the current value for the <code>instance_url</code> cookie is returned. <br>
         If the 'i' parameter is null, the <code>instance_url</code> cookie is removed. <br>
         Otherwise the <code>instance_url</code> cookie value is set to the 'i' parameter and then returned.
         * @param {String} [i] The value to set as the <code>instance_url</code> cookie
         * @returns {String} The resulting <code>instance_url</code> cookie value if set, otherwise null
         */
        function instanceUrl(i) {
            if (arguments.length === 0) {
                if (!$$.isNil(instUrl)) {return instUrl;}
                instUrl = $$.cookies.get("instance_url");
            }
            else if (i === null) {
                $$.cookies.remove("instance_url");
                instUrl = null;
            }
            else {
                $$.cookies.set("instance_url", i);
                instUrl = i;
            }
            return instUrl;
        }

        /**
         *@private
         */
            // Example Results of tha hash....
            // Name [access_token] Value [00DU0000000Xthw!ARUAQMdYg9ScuUXB5zPLpVyfYQr9qXFO7RPbKf5HyU6kAmbeKlO3jJ93gETlJxvpUDsz3mqMRL51N1E.eYFykHpoda8dPg_z]
            // Name [instance_url] Value [https://na12.salesforce.com]
            // Name [id] Value [https://login.salesforce.com/id/00DU0000000XthwMAC/005U0000000e6PoIAI]
            // Name [issued_at] Value [1331000888967]
            // Name [signature] Value [LOSzVZIF9dpKvPU07icIDOf8glCFeyd4vNGdj1dhW50]
            // Name [state] Value [/crazyrefresh.html]
        function parseHash(hash) {
            var i, nv, nvp, n, v;

            if (! $$.isNil(hash)) {
                if (hash.indexOf('#') === 0) {
                    hash = hash.substr(1);
                }
                nvp = hash.split("&");

                for (i = 0; i < nvp.length; i += 1) {
                    nv = nvp[i].split("=");
                    n = nv[0];
                    v = decodeURIComponent(nv[1]);
                    if ("access_token" === n) {
                        token(v);
                    }
                    else if ("instance_url" === n) {
                        instanceUrl(v);
                    }
                    else if ("target_origin" === n) {
                        tOrigin = decodeURIComponent(v);
                    }
                    else if ("instance_id" === n) {
                        instId = v;
                    }
                }
            }
        }

        /**
         * @name Sfdc.canvas.oauth#checkChildWindowStatus
         * @function
         * @description Refreshes the parent window only if the child window is closed.
         */
        function checkChildWindowStatus() {
            if (!childWindow || childWindow.closed) {
                refresh();
            }
        }

        /**
         * @name Sfdc.canvas.oauth#childWindowUnloadNotification
         * @function
         * @description Parses the hash value that is passed in and sets the
         <code>access_token</code> and <code>instance_url</code> cookies if they exist.  Use during
         User-Agent OAuth Authentication Flow to pass the OAuth token
         * @param {String} hash Typically a string of key-value pairs delimited by
         the ampersand character.
         * @example
         * Sfdc.canvas.oauth.childWindowUnloadNotification(self.location.hash);
         */
        function childWindowUnloadNotification(hash) {
            // Here we get notification from child window. Here we can decide if such notification is
            // raised because user closed child window, or because user is playing with F5 key.
            // NOTE: We can not trust on "onUnload" event of child window, because if user reload or refresh
            // such window in fact he is not closing child. (However "onUnload" event is raised!)
            //checkChildWindowStatus();
            parseHash(hash);
            setTimeout(window.Sfdc.canvas.oauth.checkChildWindowStatus, 50);
        }

        /**
         * @name Sfdc.canvas.oauth#logout
         * @function
         * @description Removes the <code>access_token</code> oauth token from this object.
         */
        function logout() {
            // Remove the oauth token and refresh the browser
            token(null);
            // @todo: do we want to do this?
            //var home = $$.cookies.get("home");
            //window.location = home || window.location;
        }

        /**
         * @name Sfdc.canvas.oauth#loggedin
         * @function
         * @description Returns the login state
         * @returns {Boolean} <code>true</code> if the <code>access_token</code> is available in this JS object.
         * Note: <code>access tokens</code> (i.e. OAuth tokens) should be stored server side for more durability.
         * Never store OAuth tokens in cookies as this can lead to a security risk.
         */
        function loggedin() {
            return !$$.isNil(token());
        }

        /**
         * @name Sfdc.canvas.oauth#loginUrl
         * @function
         * @description Returns the url for the OAuth authorization service
         * @returns {String} The url for the OAuth authorization service or default if there is
         *   not a value for loginUrl in the current url's query string.
         */
        function loginUrl() {
            var i, nvs, nv, q = self.location.search;

            if (q) {
                q = q.substring(1);
                nvs = q.split("&");
                for (i = 0; i < nvs.length; i += 1)
                {
                    nv = nvs[i].split("=");
                    if ("loginUrl" === nv[0]) {
                        return decodeURIComponent(nv[1]) + "/services/oauth2/authorize";
                    }
                }
            }
            return "https://login.salesforce.com/services/oauth2/authorize";
        }

        function targetOrigin(to) {

            if (!$$.isNil(to)) {
                tOrigin = to;
                return to;
            }

            if (!$$.isNil(tOrigin)) {return tOrigin;}

            // This relies on the parent passing it in. This may not be there as the client can do a
            // redirect or link to another page
            parseHash(document.location.hash);
            return tOrigin;
        }

        function instanceId(id) {

            if (!$$.isNil(id)) {
                instId = id;
                return id;
            }

            if (!$$.isNil(instId)) {return instId;}

            // This relies on the parent passing it in. This may not be there as the client can do a
            // redirect or link to another page
            parseHash(document.location.hash);
            return instId;
        }

        function client() {
            return {oauthToken : token(), instanceId : instanceId(), targetOrigin : targetOrigin()};
        }

        return {
            init : init,
            login : login,
            logout : logout,
            loggedin : loggedin,
            loginUrl : loginUrl,
            token : token,
            instance : instanceUrl,
            client : client,
            checkChildWindowStatus : checkChildWindowStatus,
            childWindowUnloadNotification: childWindowUnloadNotification
        };
    }());

    $$.module('Sfdc.canvas.oauth', module);

    $$.oauth.init();

}(Sfdc.canvas));/**
*@namespace Sfdc.canvas.xd
*@name Sfdc.canvas.xd
*/
(function ($$, window) {

    "use strict";

    var module =   (function() {

        var internalCallback;

        /**
        * @lends Sfdc.canvas.xd
        */

        /**
        * @name Sfdc.canvas.xd#post
        * @function
        * @description Pass a message to the target url
        * @param {String} message The message to send
        * @param {String} target_url Specifies what the origin of the target must be for the event to be dispatched.
        * @param {String} [target] The window that is the message's target. Defaults to the parent of the current window.
        */
        function postMessage(message, target_url, target) {

            // If target url was not supplied (client may have lost it), we could default to '*',
            // However there are security implications here as other canvas apps could receive this
            // canvas apps oauth token.
            if ($$.isNil(target_url)) {
                throw "ERROR: target_url was not supplied on postMessage";
            }
            var otherWindow = $$.stripUrl(target_url);

            target = target || parent;  // default to parent
            if (window.postMessage) {
                // the browser supports window.postMessage, so call it with a targetOrigin
                // set appropriately, based on the target_url parameter.
                message = Sfdc.JSON.stringify(message);
                target.postMessage(message, otherWindow);
            }
        }
        
        /**
        * @name Sfdc.canvas.xd#receive
        * @function Runs the callback function when the message event is received.
        * @param {Function} callback Function to run when the message event is received 
            if the event origin is acceptable.
        * @param {String} source_origin The origin of the desired events
        */
        function receiveMessage(callback, source_origin) {

            // browser supports window.postMessage (if not not supported for pilot - removed per securities request)
            if (window.postMessage) {
                // bind the callback to the actual event associated with window.postMessage
                if (callback) {
                    internalCallback = function(e) {

                        var data, r;
                        if (typeof source_origin === 'string' && e.origin !== source_origin) {
                            return false;
                        }
                        if ($$.isFunction(source_origin)) {
                            r = source_origin(e.origin, e.data);
                            if (r === false) {
                                return false;
                            }
                        }
                        data = Sfdc.JSON.parse(e.data);
                        callback(data, r);

                    };
                }
                if (window.addEventListener) {
                    window.addEventListener('message', internalCallback, false);
                } else {
                    window.attachEvent('onmessage', internalCallback);
                }
            }
        }
        
        /**
        * @name Sfdc.canvas.xd#remove
        * @function
        * @description Removes the message event listener
        * @public     
        */
        function removeListener() {

            // browser supports window.postMessage
            if (window.postMessage) {
                if (window.removeEventListener) {
                    window.removeEventListener('message', internalCallback, false);
                } else {
                    window.detachEvent('onmessage', internalCallback);
                }
            }
        }

        return {
            post : postMessage,
            receive : receiveMessage,
            remove : removeListener
        };
    }());

    $$.module('Sfdc.canvas.xd', module);

}(Sfdc.canvas, this));/**
*@namespace Sfdc.canvas.client
*@name Sfdc.canvas.client
*/
(function ($$) {

    "use strict";

    var pversion, cversion = "27.0";

    var module =   (function() /**@lends module */ {
        
        var purl, cbs = [], seq = 0;

        function startsWithHttp(u, d) {
            return  $$.isNil(u) ? u : (u.substring(0, 4) === "http") ? u : d;
        }
        /**
        * @description
        * @function
        * @returns The url of the Parent Window
        */
        function getTargetOrigin(to) {

            var h;

            if (to === "*") {return to;}

            if (!$$.isNil(to)) {
                h = $$.stripUrl(to);
                purl = startsWithHttp(h, purl);
                if (purl) {return purl;}
            }

            // This relies on the parent passing it in. This may not be there as the client can do a redirect.
            h = document.location.hash;
            if (h) {
                h = decodeURIComponent(h.replace(/^#/, ''));
                purl = startsWithHttp(h, purl);
            }
            return purl;
        }

        function callbacker(data) {

            if (data) {
                // If the server is telling us the access_token is invalid, wipe it clean.
                if (data.status === 401 &&
                    $$.isArray(data.payload) &&
                    data.payload[0].errorCode &&
                    data.payload[0].errorCode === "INVALID_SESSION_ID") {
                    // Session has expired logout.
                    $$.oauth.logout();
                }
                if ($$.isFunction(cbs[data.seq])) {
                    cbs[data.seq](data);
                }
                else {
                    // This can happen when the user switches out canvas apps real quick,
                    // before the request from the last canvas app have finish processing.
                    // We will ignore any of these results as the canvas app is no longer active to
                    // respond to the results.
                }
            }
        }

        function postit(clientscb, message) {

            var wrapped, to, c;

            // need to keep a mapping from request to callback, otherwise
            // wrong callbacks get called. Unfortunately, this is the only
            // way to handle this as postMessage acts more like topic/queue.
            // limit the sequencers to 100 avoid out of memory errors

            seq = (seq > 100) ? 0 : seq + 1;
            cbs[seq] = clientscb;
            wrapped = {seq : seq, src : "client", clientVersion : cversion, parentVersion: pversion, body : message};

            c  = message && message.config && message.config.client;
            to = getTargetOrigin($$.isNil(c) ? null : c.targetOrigin);
            if ($$.isNil(to)) {
                throw "ERROR: targetOrigin was not supplied and was not found on the hash tag, this can result from a redirect or link to another page. " +
                    "Try setting the targetOrgin (example: targetOrigin : sr.context.environment.targetOrigin) " +
                    "when making an ajax request.";
            }
            $$.xd.post(wrapped, to, parent);
        }

        function validateClient(client, cb) {

            var msg;

            if ($$.isNil(client) || $$.isNil(client.oauthToken)) {
                msg = {status : 401, statusText : "Unauthorized" , parentVersion : pversion, payload : "client or client.oauthToken not supplied"};
            }
            if ($$.isNil(client.instanceId) || $$.isNil(client.targetOrigin)) {
                msg = {status : 400, statusText : "Bad Request" , parentVersion : pversion, payload : "client.instanceId or client.targetOrigin not supplied"};
            }
            if (!$$.isNil(msg)) {
                if ($$.isFunction(cb)) {
                    cb(msg);
                    return false;
                }
                else {
                    throw msg;
                }
            }
            return true;
        }

        /**
        * @description Get the context for the current user and organization
        * @public
        * @name Sfdc.canvas.client#ctx
        * @function
        * @param {Function} clientscb Callback function to run when the call to ctx is complete
        * @param {String} token OAuth token to send. 
        * @example
        * // Gets context in the canvas app.
        * 
        * function callback(msg) {
        *   if (msg.status !== 200) {
        *     alert("Error: " + msg.status);
        *     return;
        *   }
        *   alert("Payload: ", msg.payload);
        * }
        * var ctxlink = connect.byId("ctxlink");
        * var oauthtoken = connect.oauth.token();
        * ctxlink.onclick=function() {
        *   connect.client.ctx(callback, oauthtoken)};
        * }
        */
        function ctx(clientscb, client) {
            client = client || $$.oauth.client();
            if (validateClient(client, clientscb)) {
                var token = client.oauthToken;
                postit(clientscb, {type : "ctx", accessToken : token, config : {client : client}});
            }
        }
        
        /**
        * @description Perform a cross-domain, asynchronous HTTP request.  
            <br>Note:  this should not be used for same domain requests.
        * @param {String} url The URL to which the request is sent
        * @param {Object} settings A set of key/value pairs to configure the request.  
            <br>The success setting is required at minimum and should be a callback function
         * @config {String} [client] required client context {oauthToken: "", targetOrigin : "", instanceId : ""}
         * @config {String} [contentType] "application/json"
         * @config {String} [data] request body
         * @config {String} [headers] request headers
         * @config {String} [method="GET"] The type of Ajax Request to make
         * @config {Function} [success] Callback for all responses from server (failure and success) . Signature: success(response); intersting fields: [response.data, response.responseHeaders, response.status, response.statusText}
         * @config {Boolean} [async=true] Asyncronous: true is only supported at this time.
         * @name Sfdc.canvas.client#ajax
        * @function
        * @throws illegalArgumentException if the URL is missing or the settings object does not contain a success callback function.
        * @example
        * //Posting To a Chatter Feed:
        * var sr = JSON.parse('<%=signedRequestJson%>');
        * var url = sr.context.links.chatterFeedsUrl+"/news/"
        *                                   +sr.context.user.userId+"/feed-items";
        * var body = {body : {messageSegments : [{type: "Text", text: "Some Chatter Post"}]}};
        * connect.client.ajax(url,
        *   {client : sr.client,
        *     method: 'POST',
        *     contentType: "application/json",
        *     data: JSON.stringify(body),
        *     success : function(data) {
        *     if (201 === data.status) {
        *          alert("Success"
        *          } 
        *     }
        *   });
        * @example
        * // Gets a List of Chatter Users:
        * // Paste the signed request string into a JavaScript object for easy access.
        * var sr = JSON.parse('<%=signedRequestJson%>');
        * // Reference the Chatter user's URL from Context.Links object.
        * var chatterUsersUrl = sr.context.links.chatterUsersUrl;
        *
        * // Make an XHR call back to salesforce through the supplied browser proxy.
        * connect.client.ajax(chatterUsersUrl,
        *   {client : sr.client,
        *   success : function(data){
        *   // Make sure the status code is OK.
        *   if (data.status === 200) {
        *     // Alert with how many Chatter users were returned.
        *     alert("Got back "  + data.payload.users.length +
        *     " users"); // Returned 2 users
        *    }
        * })};
        */
         function ajax(url, settings) {

            var ccb, config, defaults;

            if (!url) {
                throw "PRECONDITION ERROR: url required with AJAX call";
            }
            if (!settings || !$$.isFunction(settings.success)) {
                throw "PRECONDITION ERROR: function: 'settings.success' missing.";
            }
            if (! validateClient(settings.client, settings.success)) {
                return;
            }


            ccb = settings.success;
            defaults = {
                method: 'GET',
                async: true,
                contentType: "application/json",
                headers: {"Authorization" : "OAuth "  + settings.client.oauthToken,
                    "Accept" : "application/json"},
                data: null
            };
            config = $$.extend(defaults, settings || {});

            // Remove any listeners as functions cannot get marshaled.
            config.success = undefined;
            config.failure = undefined;
            // Don't allow the client to set "*" as the target origin.
            if (config.client.targetOrigin === "*") {
                config.client.targetOrigin = null;
            }
            else {
                // We need to set this here so we can validate the origin when we receive the call back
                purl = startsWithHttp(config.targetOrigin, purl);
            }
            postit(ccb, {type : "ajax", accessToken : token, url : url, config : config});
        }

        /**
         * @description Stores or gets the oauth token in a local javascript variable. Note, if longer term
         * (survive page refresh) storage is needed store the oauth token on the server side.
         * @param {String} t oauth token, if supplied it will be stored in a volatile local JS variable.
         * @returns {Object} the oauth token.
         */

        function token(t) {
            return $$.oauth.token(t);
        }

        function version() {
            return {clientVersion: cversion};
        }

        $$.xd.receive(callbacker, getTargetOrigin);

        return {
            ctx : ctx,
            ajax : ajax,
            token : token,
            version : version
        };
    }());

    $$.module('Sfdc.canvas.client', module);

}(Sfdc.canvas));
