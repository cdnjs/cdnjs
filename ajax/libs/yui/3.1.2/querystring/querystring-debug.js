YUI.add('querystring-parse', function(Y) {

/**
 * <p>The QueryString module adds support for serializing JavaScript objects into
 * query strings and parsing JavaScript objects from query strings format.</p>
 *
 * <p>The QueryString namespace is added to your YUI instance including static methods
 * Y.QueryString.parse(..) and Y.QueryString.stringify(..).</p>
 *
 * <p>The <code>querystring</code> module is a rollup of <code>querystring-parse</code> and
 * <code>querystring-stringify</code>.</p>
 * 
 * <p>As their names suggest, <code>querystring-parse</code> adds support for parsing
 * Query String data (Y.QueryString.parse) and <code>querystring-stringify</code> for serializing
 * JavaScript data into Query Strings (Y.QueryString.stringify).  You may choose to
 * include either of the submodules individually if you don't need the
 * complementary functionality, or include the rollup for both.</p>
 *
 * @module querystring
 * @class QueryString
 * @static
 */
var QueryString = Y.namespace("QueryString");

/**
 * Provides Y.QueryString.parse method to accept Query Strings and return native
 * JavaScript objects.
 *
 * @module querystring
 * @submodule querystring-parse
 * @for QueryString
 * @static
 */
QueryString.parse = function (qs, sep, eq) {
    // wouldn't Y.Array(qs.split()).map(pieceParser(eq)).reduce(mergeParams) be prettier?
    return Y.Array.reduce(
        Y.Array.map(
            qs.split(sep || "&"),
            pieceParser(eq || "=")
        ),
        {},
        mergeParams
    );
};

/**
 * Provides Y.QueryString.unescape method to be able to override default decoding
 * method.  This is important in cases where non-standard delimiters are used, if
 * the delimiters would not normally be handled properly by the builtin
 * (en|de)codeURIComponent functions.
 * Default: replace "+" with " ", and then decodeURIComponent behavior.
 * @module querystring
 * @submodule querystring-parse
 * @for QueryString
 * @static
 **/
QueryString.unescape = function (s) {
    return decodeURIComponent(s.replace(/\+/g, ' '));
};


// Parse a key=val string.
// These can get pretty hairy
// example flow:
// parse(foo[bar][][bla]=baz)
// return parse(foo[bar][][bla],"baz")
// return parse(foo[bar][], {bla : "baz"})
// return parse(foo[bar], [{bla:"baz"}])
// return parse(foo, {bar:[{bla:"baz"}]})
// return {foo:{bar:[{bla:"baz"}]}}
var pieceParser = function (eq) {
    return function parsePiece (key, val) {
        if (arguments.length !== 2) {
            // key=val, called from the map/reduce
            key = key.split(eq);
            return parsePiece(
                QueryString.unescape(key.shift()),
                QueryString.unescape(key.join(eq))
            );
        }
        key = key.replace(/^\s+|\s+$/g, '');
        if (Y.Lang.isString(val)) {
            val = val.replace(/^\s+|\s+$/g, '');
            // convert numerals to numbers
            if (!isNaN(val)) {
                var numVal = +val;
                if (val === numVal.toString(10)) val = numVal;
            }
        }
        var sliced = /(.*)\[([^\]]*)\]$/.exec(key);
        if (!sliced) {
            var ret = {};
            if (key) ret[key] = val;
            return ret;
        }
        // ["foo[][bar][][baz]", "foo[][bar][]", "baz"]
        var tail = sliced[2], head = sliced[1];

        // array: key[]=val
        if (!tail) return parsePiece(head, [val]);

        // obj: key[subkey]=val
        var ret = {};
        ret[tail] = val;
        return parsePiece(head, ret);
    };
};

// the reducer function that merges each query piece together into one set of params
function mergeParams (params, addition) {
    return (
        // if it's uncontested, then just return the addition.
        (!params) ? addition
        // if the existing value is an array, then concat it.
        : (Y.Lang.isArray(params)) ? params.concat(addition)
        // if the existing value is not an array, and either are not objects, arrayify it.
        : (!Y.Lang.isObject(params) || !Y.Lang.isObject(addition)) ? [params].concat(addition)
        // else merge them as objects, which is a little more complex
        : mergeObjects(params, addition)
    );
};

// Merge two *objects* together. If this is called, we've already ruled
// out the simple cases, and need to do the for-in business.
function mergeObjects (params, addition) {
    for (var i in addition) if (i && addition.hasOwnProperty(i)) {
        params[i] = mergeParams(params[i], addition[i]);
    }
    return params;
};


}, '@VERSION@' ,{requires:['collection']});
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
        // Y.log("Number or string: "+obj);
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
    // Y.log(
    //     typeof obj + (typeof obj === 'object' ? " ok" : "ONOES!")+
    //     Object.prototype.toString.call(obj)
    // );
    
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
    // Y.log(type === 'String' ? 'test a string: "'+ obj+'" ' +
    //     Object.prototype.toString.call(obj) + " " + Y.Lang["is"+"String"](obj) : '');
    return (
        Y.Lang["is"+type](obj)
        || Object.prototype.toString.call(obj) === '[object '+type+']'
    );
}


}, '@VERSION@' );


YUI.add('querystring', function(Y){}, '@VERSION@' ,{use:['querystring-parse', 'querystring-stringify']});

