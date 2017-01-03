/**
 * Utility class for setting/reading values from browser cookies.
 * Values can be written using the {@link #set} method.
 * Values can be read using the {@link #get} method.
 * A cookie can be invalidated on the client machine using the {@link #clear} method.
 */
Ext.define('Ext.util.Cookies', {
    singleton: true,
    
    /**
     * Creates a cookie with the specified name and value. Additional settings for the cookie may be optionally specified
     * (for example: expiration, access restriction, SSL).
     * @param {String} name The name of the cookie to set.
     * @param {Object} value The value to set for the cookie.
     * @param {Object} [expires] Specify an expiration date the cookie is to persist until. Note that the specified Date
     * object will be converted to Greenwich Mean Time (GMT).
     * @param {String} [path] Setting a path on the cookie restricts access to pages that match that path. Defaults to all
     * pages ('/').
     * @param {String} [domain] Setting a domain restricts access to pages on a given domain (typically used to allow
     * cookie access across subdomains). For example, "sencha.com" will create a cookie that can be accessed from any
     * subdomain of sencha.com, including www.sencha.com, support.sencha.com, etc.
     * @param {Boolean} [secure] Specify true to indicate that the cookie should only be accessible via SSL on a page
     * using the HTTPS protocol. Defaults to false. Note that this will only work if the page calling this code uses the
     * HTTPS protocol, otherwise the cookie will be created with default options.
     */
    set : function(name, value){
        var argv = arguments,
            argc = arguments.length,
            expires = (argc > 2) ? argv[2] : null,
            path = (argc > 3) ? argv[3] : '/',
            domain = (argc > 4) ? argv[4] : null,
            secure = (argc > 5) ? argv[5] : false;
            
        document.cookie = name + "=" + escape(value) + ((expires === null) ? "" : ("; expires=" + expires.toUTCString())) + ((path === null) ? "" : ("; path=" + path)) + ((domain === null) ? "" : ("; domain=" + domain)) + ((secure === true) ? "; secure" : "");
    },

    /**
     * Retrieves cookies that are accessible by the current page. If a cookie does not exist, `get()` returns null. The
     * following example retrieves the cookie called "valid" and stores the String value in the variable validStatus.
     *
     *     var validStatus = Ext.util.Cookies.get("valid");
     *
     * @param {String} name The name of the cookie to get
     * @return {Object} Returns the cookie value for the specified name;
     * null if the cookie name does not exist.
     */
    get : function(name) {
        var parts = document.cookie.split('; '),
            len = parts.length,
            item, i;

        // In modern browsers, a cookie with an empty string will be stored:
        // MyName=
        // In older versions of IE, it will be stored as:
        // MyName
        // So here we iterate over all the parts in an attempt to match the key.
        for (i = 0; i < len; ++i) {
            item = parts[i].split('=');
            if (item[0] === name) {
                return item[1] || '';
            }
        }
        return null;
    },

    /**
     * Removes a cookie with the provided name from the browser
     * if found by setting its expiration date to sometime in the past.
     * @param {String} name The name of the cookie to remove
     * @param {String} [path] The path for the cookie.
     * This must be included if you included a path while setting the cookie.
     */
    clear : function(name, path){
        if (this.get(name)) {
            path = path || '/';
            document.cookie = name + '=' + '; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=' + path;
        }
    },
    
    /**
     * @private
     */
    getCookieVal : function(offset){
        var cookie = document.cookie,
            endstr = cookie.indexOf(";", offset);

        if (endstr == -1) {
            endstr = cookie.length;
        }
        return unescape(cookie.substring(offset, endstr));
    }
});
