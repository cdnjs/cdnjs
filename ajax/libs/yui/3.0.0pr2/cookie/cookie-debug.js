/**
 * Utilities for cookie management
 * @module cookie
 * @beta
 */

YUI.add("cookie", function(Y){ 

    //shortcuts
    var L       = Y.Lang,
        O       = Y.Object,
        NULL    = null,
        
        //shortcuts to functions
        isString    = L.isString,
        isObject    = L.isObject,
        isUndefined = L.isUndefined,
        isFunction  = L.isFunction,
        encode      = encodeURIComponent,
        decode      = decodeURIComponent;
        
    /*
     * Throws an error message.
     */
    function error(message){
        throw new TypeError(message);
    }        
    
    /**
     * Cookie utility.
     * @class Cookie
     * @static
     */
    Y.Cookie = {
                    
        //-------------------------------------------------------------------------
        // Private Methods
        //-------------------------------------------------------------------------
        
        /**
         * Creates a cookie string that can be assigned into document.cookie.
         * @param {String} name The name of the cookie.
         * @param {String} value The value of the cookie.
         * @param {encodeValue} encodeValue True to encode the value, false to leave as-is.
         * @param {Object} options (Optional) Options for the cookie.
         * @return {String} The formatted cookie string.
         * @method _createCookieString
         * @private
         * @static
         */
        _createCookieString : function (name /*:String*/, value /*:Variant*/, encodeValue /*:Boolean*/, options /*:Object*/) /*:String*/ {
        
            var text /*:String*/ = encode(name) + "=" + (encodeValue ? encode(value) : value);
            
        
            if (isObject(options)){
                //expiration date
                if (options.expires instanceof Date){
                    text += "; expires=" + options.expires.toGMTString();
                }
            
                //path
                if (isString(options.path) && options.path !== ""){
                    text += "; path=" + options.path;
                }
        
                //domain
                if (isString(options.domain) && options.domain !== ""){
                    text += "; domain=" + options.domain;
                }
                
                //secure
                if (options.secure === true){
                    text += "; secure";
                }
            }
            
            return text;
        },
        
        /**
         * Formats a cookie value for an object containing multiple values.
         * @param {Object} hash An object of key-value pairs to create a string for.
         * @return {String} A string suitable for use as a cookie value.
         * @method _createCookieHashString
         * @private
         * @static
         */
        _createCookieHashString : function (hash /*:Object*/) /*:String*/ {
            if (!isObject(hash)){
                error("Cookie._createCookieHashString(): Argument must be an object.");
            }
            
            var text /*:Array*/ = [];
            
            O.each(hash, function(value, key){
                if (!isFunction(value) && !isUndefined(value)){
                    text.push(encode(key) + "=" + encode(String(value)));
                }            
            });
            
            return text.join("&");
        },
        
        /**
         * Parses a cookie hash string into an object.
         * @param {String} text The cookie hash string to parse (format: n1=v1&n2=v2).
         * @return {Object} An object containing entries for each cookie value.
         * @method _parseCookieHash
         * @private
         * @static
         */
        _parseCookieHash : function (text /*:String*/) /*:Object*/ {
        
            var hashParts /*:Array*/ = text.split("&"),
                hashPart /*:Array*/ = NULL,
                hash /*:Object*/ = {};
            
            if (text.length){
                for (var i=0, len=hashParts.length; i < len; i++){
                    hashPart = hashParts[i].split("=");
                    hash[decode(hashPart[0])] = decode(hashPart[1]);
                }
            }
            
            return hash;          
        },    
        
        /**
         * Parses a cookie string into an object representing all accessible cookies.
         * @param {String} text The cookie string to parse.
         * @param {Boolean} shouldDecode (Optional) Indicates if the cookie values should be decoded or not. Default is true.
         * @return {Object} An object containing entries for each accessible cookie.
         * @method _parseCookieString
         * @private
         * @static
         */
        _parseCookieString : function (text /*:String*/, shouldDecode /*:Boolean*/) /*:Object*/ {
        
            var cookies /*:Object*/ = {};        
            
            if (isString(text) && text.length > 0) {
            
                var decodeValue = (shouldDecode === false ? function(s){return s;} : decode);
            
                if (/[^=]+=[^=;]?(?:; [^=]+=[^=]?)?/.test(text)){            
                    var cookieParts /*:Array*/ = text.split(/;\s/g),
                        cookieName /*:String*/ = NULL,
                        cookieValue /*:String*/ = NULL,
                        cookieNameValue /*:Array*/ = NULL;
                    
                    for (var i=0, len=cookieParts.length; i < len; i++){
                    
                        //check for normally-formatted cookie (name-value)
                        cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
                        if (cookieNameValue instanceof Array){
                            cookieName = decode(cookieNameValue[1]);
                            cookieValue = decodeValue(cookieParts[i].substring(cookieNameValue[1].length+1));
                        } else {
                            //means the cookie does not have an "=", so treat it as a boolean flag
                            cookieName = decode(cookieParts[i]);
                            cookieValue = cookieName;
                        }
                        cookies[cookieName] = cookieValue;
                    }
                }
            }
            
            return cookies;
        },    
        
        //-------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------
    
        /**
         * Returns the cookie value for the given name.
         * @param {String} name The name of the cookie to retrieve.
         * @param {Function} converter (Optional) A function to run on the value before returning
         *      it. The function is not used if the cookie doesn't exist.
         * @return {Variant} If no converter is specified, returns a string or null if
         *      the cookie doesn't exist. If the converter is specified, returns the value
         *      returned from the converter or null if the cookie doesn't exist.
         * @method get
         * @static
         */
        get : function (name /*:String*/, converter /*:Function*/) /*:Variant*/{
            
            var cookies /*:Object*/ = this._parseCookieString(document.cookie);        
            
            if (!isString(name) || name === ""){
                error("Cookie.get(): Cookie name must be a non-empty string.");
            }
            
            if (isUndefined(cookies[name])) {
                return NULL;
            }
            
            if (!isFunction(converter)){
                return cookies[name];
            } else {
                return converter(cookies[name]);
            }
        },
        
        /**
         * Returns the value of a subcookie.
         * @param {String} name The name of the cookie to retrieve.
         * @param {String} subName The name of the subcookie to retrieve.
         * @param {Function} converter (Optional) A function to run on the value before returning
         *      it. The function is not used if the cookie doesn't exist.
         * @return {Variant} If the cookie doesn't exist, null is returned. If the subcookie
         *      doesn't exist, null if also returned. If no converter is specified and the
         *      subcookie exists, a string is returned. If a converter is specified and the
         *      subcookie exists, the value returned from the converter is returned.
         * @method getSub
         * @static
         */
        getSub : function (name /*:String*/, subName /*:String*/, converter /*:Function*/) /*:Variant*/ {
          
            var hash /*:Variant*/ = this.getSubs(name);  
    
            if (hash !== NULL) {
                
                if (!isString(subName) || subName === ""){
                    error("Cookie.getSub(): Subcookie name must be a non-empty string.");
                }
                
                if (isUndefined(hash[subName])){
                    return NULL;
                }            
            
                if (!isFunction(converter)){
                    return hash[subName];
                } else {
                    return converter(hash[subName]);
                }
            } else {
                return NULL;
            }
        
        },
        
        /**
         * Returns an object containing name-value pairs stored in the cookie with the given name.
         * @param {String} name The name of the cookie to retrieve.
         * @return {Object} An object of name-value pairs if the cookie with the given name
         *      exists, null if it does not.
         * @method getSubs
         * @static
         */
        getSubs : function (name /*:String*/) /*:Object*/ {
            
            //check cookie name
            if (!isString(name) || name === ""){
                error("Cookie.getSubs(): Cookie name must be a non-empty string.");
            }
            
            var cookies = this._parseCookieString(document.cookie, false);
            if (isString(cookies[name])){
                return this._parseCookieHash(cookies[name]);
            }
            return NULL;
        },
        
        /**
         * Removes a cookie from the machine by setting its expiration date to
         * sometime in the past.
         * @param {String} name The name of the cookie to remove.
         * @param {Object} options (Optional) An object containing one or more
         *      cookie options: path (a string), domain (a string), 
         *      and secure (true/false). The expires option will be overwritten
         *      by the method.
         * @return {String} The created cookie string.
         * @method remove
         * @static
         */
        remove : function (name /*:String*/, options /*:Object*/) /*:String*/ {
            
            //check cookie name
            if (!isString(name) || name === ""){
                error("Cookie.remove(): Cookie name must be a non-empty string.");
            }
            
            //set options
            options = options || {};
            options.expires = new Date(0);
            
            //set cookie
            return this.set(name, "", options);
        },
    
        /**
         * Removes a sub cookie with a given name.
         * @param {String} name The name of the cookie in which the subcookie exists.
         * @param {String} subName The name of the subcookie to remove.
         * @param {Object} options (Optional) An object containing one or more
         *      cookie options: path (a string), domain (a string), expires (a Date object),
         *      and secure (true/false). This must be the same settings as the original
         *      subcookie.
         * @return {String} The created cookie string.
         * @method removeSub
         * @static
         */
        removeSub : function(name /*:String*/, subName /*:String*/, options /*:Object*/) /*:String*/ {
        
            //check cookie name
            if (!isString(name) || name === ""){
                error("Cookie.removeSub(): Cookie name must be a non-empty string.");
            }
            
            //check subcookie name
            if (!isString(subName) || subName === ""){
                error("Cookie.removeSub(): Subcookie name must be a non-empty string.");
            }
            
            //get all subcookies for this cookie
            var subs = this.getSubs(name);
            
            //delete the indicated subcookie
            if (isObject(subs) && O.owns(subs, subName)){
                delete subs[subName];
                
                //reset the cookie
                return this.setSubs(name, subs, options);
            } else {
                return "";
            }
            
        },
    
        /**
         * Sets a cookie with a given name and value.
         * @param {String} name The name of the cookie to set.
         * @param {Variant} value The value to set for the cookie.
         * @param {Object} options (Optional) An object containing one or more
         *      cookie options: path (a string), domain (a string), expires (a Date object),
         *      and secure (true/false).
         * @return {String} The created cookie string.
         * @method set
         * @static
         */
        set : function (name /*:String*/, value /*:Variant*/, options /*:Object*/) /*:String*/ {
        
            if (!isString(name)){
                error("Cookie.set(): Cookie name must be a string.");
            }
            
            if (isUndefined(value)){
                error("Cookie.set(): Value cannot be undefined.");
            }
            
        
            var text /*:String*/ = this._createCookieString(name, value, true, options);
            document.cookie = text;
            return text;
        },
            
        /**
         * Sets a sub cookie with a given name to a particular value.
         * @param {String} name The name of the cookie to set.
         * @param {String} subName The name of the subcookie to set.
         * @param {Variant} value The value to set.
         * @param {Object} options (Optional) An object containing one or more
         *      cookie options: path (a string), domain (a string), expires (a Date object),
         *      and secure (true/false).
         * @return {String} The created cookie string.
         * @method setSub
         * @static
         */
        setSub : function (name /*:String*/, subName /*:String*/, value /*:Variant*/, options /*:Object*/) /*:String*/ {

            if (!isString(name) || name === ""){
                error("Cookie.setSub(): Cookie name must be a non-empty string.");
            }
    
            if (!isString(subName) || subName === ""){
                error("Cookie.setSub(): Subcookie name must be a non-empty string.");
            }
            
            if (isUndefined(value)){
                error("Cookie.setSub(): Subcookie value cannot be undefined.");
            }
    
            var hash /*:Object*/ = this.getSubs(name);
            
            if (!isObject(hash)){
                hash = {};
            }
            
            hash[subName] = value;        
            
            return this.setSubs(name, hash, options);
            
        },
        
        /**
         * Sets a cookie with a given name to contain a hash of name-value pairs.
         * @param {String} name The name of the cookie to set.
         * @param {Object} value An object containing name-value pairs.
         * @param {Object} options (Optional) An object containing one or more
         *      cookie options: path (a string), domain (a string), expires (a Date object),
         *      and secure (true/false).
         * @return {String} The created cookie string.
         * @method setSubs
         * @static
         */
        setSubs : function (name /*:String*/, value /*:Object*/, options /*:Object*/) /*:String*/ {
            
            if (!isString(name)){
                error("Cookie.setSubs(): Cookie name must be a string.");
            }
            
            if (!isObject(value)){
                error("Cookie.setSubs(): Cookie value must be an object.");
            }
        
            var text /*:String*/ = this._createCookieString(name, this._createCookieHashString(value), false, options);
            document.cookie = text;
            return text;        
        }     
    
    };
}, "3.0.0");

