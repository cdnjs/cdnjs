YUI.add('querystring-stringify-simple', function(Y) {

/*global Y */
/**
 * <p>Provides Y.QueryString.stringify method for converting objects to Query Strings.
 * This is a simpler implementation than the full querystring-stringify.</p>
 * <p>Because io requires at least some basic query string escaping functionality,
 * this module provides the bare minimum functionality (encoding a hash of simple values),
 * without the additional support for arrays, objects, and so on.  Every item is
 * converted to a string, and escaped, with no fanciness.</p>
 * <p>This provides a friendly way for IO to handle objects-as-data, without necessitating
 * a lot of code for simple use-cases.</p>
 * 
 * @module querystring
 * @submodule querystring-stringify-simple
 * @for QueryString
 * @static
 */

var QueryString = Y.namespace("QueryString");

/**
 * <p>Provides Y.QueryString.escape method to be able to override default encoding
 * method.  This is important in cases where non-standard delimiters are used, if
 * the delimiters would not normally be handled properly by the builtin
 * (en|de)codeURIComponent functions.</p>
 * Default: encodeURIComponent
 * @module querystring
 * @submodule querystring-stringify-simple
 * @for QueryString
 * @static
 **/
QueryString.escape = encodeURIComponent;


/**
 * <p>Converts a simple object to a Query String representation.</p>
 * <p>Nested objects, Arrays, and so on, are not supported.</p>
 *
 * @method stringify
 * @for QueryString
 * @submodule querystring-stringify-simple
 * @param obj {Variant} any arbitrary value to convert to query string
 * @param sep {String} (optional) Character that should join param k=v pairs together. Default: "&"
 * @param eq  {String} (optional) Character that should join keys to their values. Default: "="
 * @static
 */
QueryString.stringify = function (obj, sep, eq) {
    sep = sep || "&";
    eq = eq || "=";
    var qs = [], key, escape = QueryString.escape;
    for (key in obj) if (obj.hasOwnProperty(key)) {
        qs.push(escape(key) + eq + escape(String(obj[key])));
    }
    return qs.join(sep);
};


}, '@VERSION@' );
