/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('querystring-parse-simple', function (Y, NAME) {

// @TODO this looks like we are requiring the user to extract the querystring
// portion of the url, which isn't good.  The majority use case will be to
// extract querystring from the document configured for this YUI instance.
// This should be the default if qs is not supplied.

/*global Y */
/**
 * <p>Provides Y.QueryString.parse method for converting Query Strings to an object.
 * This is a simpler implementation than the full querystring-parse.</p>
 * <p>Because some things may require basic query string escaping functionality,
 * this module provides the bare minimum functionality (decoding a hash of simple values),
 * without the additional support for arrays, objects, and so on.</p>
 * <p>This provides a friendly way to deserialize basic query strings, without necessitating
 * a lot of code for simple use-cases.</p>
 *
 * @module querystring
 * @submodule querystring-parse-simple
 */

var QueryString = Y.namespace("QueryString");

QueryString.parse = function (qs, sep, eq) {
    sep = sep || "&";
    eq = eq || "=";
    for (
        var obj = {},
            i = 0,
            pieces = qs.split(sep),
            l = pieces.length,
            tuple;
        i < l;
        i ++
    ) {
        tuple = pieces[i].split(eq);
        if (tuple.length > 0) {
            obj[QueryString.unescape(tuple.shift())] = QueryString.unescape(tuple.join(eq));
        }
    }
    return obj;
};

QueryString.unescape = function (s) {
    return decodeURIComponent(s.replace(/\+/g, ' '));
};


}, '3.17.2', {"requires": ["yui-base"]});
