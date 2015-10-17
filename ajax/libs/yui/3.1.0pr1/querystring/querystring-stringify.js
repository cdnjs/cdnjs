YUI.add('querystring-stringify', function(Y) {

/**
 * Provides Y.QueryString.stringify method for converting objects to Query Strings.
 *
 * @module querystring
 * @submodule querystring-stringify
 * @for QueryString
 * @static
 */

var QueryString = Y.namespace("QueryString");

/**
 * Provides Y.QueryString.escape method to be able to override default encoding
 * method.  This is important in cases where non-standard delimiters are used, if
 * the delimiters would not normally be handled properly by the builtin
 * (en|de)codeURIComponent functions.
 * Default: encodeURIComponent
 * @module querystring
 * @submodule querystring-stringify
 * @for QueryString
 * @static
 **/
QueryString.escape = encodeURIComponent;


var stack = [];
/**
 * <p>Converts an arbitrary value to a Query String representation.</p>
 *
 * <p>Objects with cyclical references will trigger an exception.</p>
 *
 * @method stringify
 * @param obj {Variant} any arbitrary value to convert to query string
 * @param sep {String} (optional) Character that should join param k=v pairs together. Default: "&"
 * @param eq  {String} (optional) Character that should join keys to their values. Default: "="
 * @param name {String} (optional) Name of the current key, for handling children recursively.
 * @static
 */
QueryString.stringify = function (obj, sep, eq, name) {
    sep = sep || "&";
    eq = eq || "=";
    
    if (Y.Lang.isNull(obj) || Y.Lang.isUndefined(obj) || typeof(obj) === 'function') {
        return name ? QueryString.escape(name) + eq : '';
    }
    
    if (is('Boolean',obj)) obj = +obj;
    if (is('Number',obj) || is("String",obj)) {
        return QueryString.escape(name) + eq + QueryString.escape(obj);
    }    
    
    if (Y.Lang.isArray(obj)) {
        var s = [];
        name = name+'[]';
        for (var i = 0, l = obj.length; i < l; i ++) {
            s.push( QueryString.stringify(obj[i], sep, eq, name) );
        }
        return s.join(sep);
    }
    // now we know it's an object.
    
    // Check for cyclical references in nested objects
    for (var i = stack.length - 1; i >= 0; --i) if (stack[i] === obj) {
        throw new Error("QueryString.stringify. Cyclical reference");
    }
    
    stack.push(obj);
    
    var s = [];
    var begin = name ? name + '[' : '';
    var end = name ? ']' : '';
    for (var i in obj) if (obj.hasOwnProperty(i)) {
        var n = begin + i + end;
        s.push(QueryString.stringify(obj[i], sep, eq, n));
    }
    
    stack.pop();
    
    s = s.join(sep);
    if (!s && name) return name + "=";
    return s;
};
function is (type, obj) {
    return (
        Y.Lang["is"+type](obj)
        || Object.prototype.toString.call(obj) === '[object '+type+']'
    );
}


}, '@VERSION@' );
