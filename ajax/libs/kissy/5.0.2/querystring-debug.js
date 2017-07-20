/*
Copyright 2014, modulex-querystring@1.0.4
MIT Licensed
build time: Thu, 16 Oct 2014 03:59:11 GMT
*/
/*
combined modules:
querystring
*/
modulex.add("querystring", [], function(require, exports, module) {/**
 * utilities for dealing with query strings.
 * conforms to nodejs api.
 * @author yiminghe@gmail.com
 */
var SEP = '&',
    EMPTY = '',
    undef,
    urlEncode = encodeURIComponent,
    toString = ({}).toString,
    EQ = '=';

function isValidParamValue(val) {
    var t = typeof val;
    // If the type of val is null, undef, number, string, boolean, return TRUE.
    return val == null || (t !== 'object' && t !== 'function');
}

function isArray(o) {
    return toString.apply(o) === '[object Array]';
}

function urlDecode(s) {
    return decodeURIComponent(s.replace(/\+/g, ' '));
}

module.exports = {
    version: '1.0.4',

    _debug: '@DEBUG@',

    /**
     * Creates a serialized string of an array or object.
     *
     * for example:
     *     @example
     *     {foo: 1, bar: 2}    // -> 'foo=1&bar=2'
     *     {foo: 1, bar: [2, 3]}    // -> 'foo=1&bar=2&bar=3'
     *     {foo: '', bar: 2}    // -> 'foo=&bar=2'
     *     {foo: undef, bar: 2}    // -> 'foo=undef&bar=2'
     *     {foo: TRUE, bar: 2}    // -> 'foo=TRUE&bar=2'
     *
     * @param {Object} o json data
     * @param {String} [sep='&'] separator between each pair of data
     * @param {String} [eq='='] separator between key and value of data
     * @param {Boolean} [serializeArray=true] whether add '[]' to array key of data
     * @return {String}
     * @member KISSY
     */
    stringify: function (o, sep, eq, serializeArray) {
        sep = sep || SEP;
        eq = eq || EQ;
        if (serializeArray === undef) {
            serializeArray = true;
        }
        var buf = [],
            key, i, v, len, val;
        for (key in o) {
            val = o[key];
            var originalKey = key;
            key = urlEncode(key);

            // val is valid non-array value
            if (isValidParamValue(val)) {
                buf.push(key);
                if (val !== undef) {
                    buf.push(eq, urlEncode(val + EMPTY));
                }
                buf.push(sep);
            } else if (isArray(val)) {
                // val is not empty array
                for (i = 0, len = val.length; i < len; ++i) {
                    v = val[i];
                    if (isValidParamValue(v)) {
                        buf.push(key, (serializeArray && (originalKey.slice(0 - 2) !== '[]') ? urlEncode('[]') : EMPTY));
                        if (v !== undef) {
                            buf.push(eq, urlEncode(v + EMPTY));
                        }
                        buf.push(sep);
                    }
                }
            }
            // ignore other cases, including empty array, Function, RegExp, Date etc.
        }
        buf.pop();
        return buf.join(EMPTY);
    },

    /**
     * Parses a URI-like query string and returns an object composed of parameter/value pairs.
     *
     * for example:
     *      @example
     *      'section=blog&id=45'        // -> {section: 'blog', id: '45'}
     *      'section=blog&tag=js&tag=doc' // -> {section: 'blog', tag: ['js', 'doc']}
     *      'tag=ruby%20on%20rails'        // -> {tag: 'ruby on rails'}
     *      'id=45&raw'        // -> {id: '45', raw: ''}
     * @param {String} str param string
     * @param {String} [sep='&'] separator between each pair of data
     * @param {String} [eq='='] separator between key and value of data
     * @return {Object} json data
     * @member KISSY
     */
    parse: function (str, sep, eq) {
        sep = sep || SEP;
        eq = eq || EQ;
        var ret = {},
            eqIndex, key, val,
            pairs = str.split(sep),
            i = 0, len = pairs.length;

        for (; i < len; ++i) {
            eqIndex = pairs[i].indexOf(eq);
            if (eqIndex === -1) {
                key = urlDecode(pairs[i]);
                val = undef;
            } else {
                // remember to decode key!
                key = urlDecode(pairs[i].substring(0, eqIndex));
                val = pairs[i].substring(eqIndex + 1);
                try {
                    // http://stackoverflow.com/questions/9064536/javascript-decodeuricomponent-malformed-uri-exception
                    val = urlDecode(val);
                } catch (e) {
                    console.error('decodeURIComponent error : ' + val);
                    console.error(e);
                }

                if (key.slice(0 - 2) === '[]') {
                    key = key.slice(0, 0 - 2);
                }
            }
            if (key in ret) {
                if (isArray(ret[key])) {
                    ret[key].push(val);
                } else {
                    ret[key] = [ret[key], val];
                }
            } else {
                ret[key] = val;
            }
        }
        return ret;
    }
};});