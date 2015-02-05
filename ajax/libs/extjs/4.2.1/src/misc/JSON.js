/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
// @tag extras,core
// @require ../lang/Error.js
// @define Ext.JSON

/**
 * Modified version of [Douglas Crockford's JSON.js][dc] that doesn't
 * mess with the Object prototype.
 *
 * [dc]: http://www.json.org/js.html
 *
 * @singleton
 */
Ext.JSON = (new(function() {
    var me = this,
    encodingFunction,
    decodingFunction,
    useNative = null,
    useHasOwn = !! {}.hasOwnProperty,
    isNative = function() {
        if (useNative === null) {
            useNative = Ext.USE_NATIVE_JSON && window.JSON && JSON.toString() == '[object JSON]';
        }
        return useNative;
    },
    pad = function(n) {
        return n < 10 ? "0" + n : n;
    },
    doDecode = function(json) {
        return eval("(" + json + ')');
    },
    doEncode = function(o, newline) {
        // http://jsperf.com/is-undefined
        if (o === null || o === undefined) {
            return "null";
        } else if (Ext.isDate(o)) {
            return Ext.JSON.encodeDate(o);
        } else if (Ext.isString(o)) {
            return Ext.JSON.encodeString(o);
        } else if (typeof o == "number") {
            //don't use isNumber here, since finite checks happen inside isNumber
            return isFinite(o) ? String(o) : "null";
        } else if (Ext.isBoolean(o)) {
            return String(o);
        }
        // Allow custom zerialization by adding a toJSON method to any object type.
        // Date/String have a toJSON in some environments, so check these first.
        else if (o.toJSON) {
            return o.toJSON();
        } else if (Ext.isArray(o)) {
            return encodeArray(o, newline);
        } else if (Ext.isObject(o)) {
            return encodeObject(o, newline);
        } else if (typeof o === "function") {
            return "null";
        }
        return 'undefined';
    },
    m = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"': '\\"',
        "\\": '\\\\',
        '\x0b': '\\u000b' //ie doesn't handle \v
    },
    charToReplace = /[\\\"\x00-\x1f\x7f-\uffff]/g,
    encodeString = function(s) {
        return '"' + s.replace(charToReplace, function(a) {
            var c = m[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"';
    },

    //<debug>
    encodeArrayPretty = function(o, newline) {
        var len = o.length,
            cnewline = newline + '   ',
            sep = ',' + cnewline,
            a = ["[", cnewline], // Note newline in case there are no members
            i;

        for (i = 0; i < len; i += 1) {
            a.push(Ext.JSON.encodeValue(o[i], cnewline), sep);
        }

        // Overwrite trailing comma (or empty string)
        a[a.length - 1] = newline + ']';

        return a.join('');
    },

    encodeObjectPretty = function(o, newline) {
        var cnewline = newline + '   ',
            sep = ',' + cnewline,
            a = ["{", cnewline], // Note newline in case there are no members
            i, val;

        for (i in o) {
            val = o[i];
            if (!useHasOwn || o.hasOwnProperty(i)) {
                // To match JSON.stringify, we shouldn't encode functions or undefined
                if (typeof val === 'function' || val === undefined) {
                    continue;
                }
                a.push(Ext.JSON.encodeValue(i) + ': ' + Ext.JSON.encodeValue(val, cnewline), sep);
            }
        }

        // Overwrite trailing comma (or empty string)
        a[a.length - 1] = newline + '}';

        return a.join('');
    },
    //</debug>

    encodeArray = function(o, newline) {
        //<debug>
        if (newline) {
            return encodeArrayPretty(o, newline);
        }
        //</debug>

        var a = ["[", ""], // Note empty string in case there are no serializable members.
            len = o.length,
            i;
        for (i = 0; i < len; i += 1) {
            a.push(Ext.JSON.encodeValue(o[i]), ',');
        }
        // Overwrite trailing comma (or empty string)
        a[a.length - 1] = ']';
        return a.join("");
    },

    encodeObject = function(o, newline) {
        //<debug>
        if (newline) {
            return encodeObjectPretty(o, newline);
        }
        //</debug>

        var a = ["{", ""], // Note empty string in case there are no serializable members.
            i, val;
        for (i in o) {
            val = o[i];
            if (!useHasOwn || o.hasOwnProperty(i)) {
                // To match JSON.stringify, we shouldn't encode functions or undefined
                if (typeof val === 'function' || val === undefined) {
                    continue;
                }
                a.push(Ext.JSON.encodeValue(i), ":", Ext.JSON.encodeValue(val), ',');
                
            }
        }
        // Overwrite trailing comma (or empty string)
        a[a.length - 1] = '}';
        return a.join("");
    };
    
    /**
     * Encodes a String. This returns the actual string which is inserted into the JSON string as the literal
     * expression. **The returned value includes enclosing double quotation marks.**
     *
     * To override this:
     *
     *     Ext.JSON.encodeString = function(s) {
     *         return 'Foo' + s;
     *     };
     *
     * @param {String} s The String to encode
     * @return {String} The string literal to use in a JSON string.
     * @method
     */
    me.encodeString = encodeString;

    /**
     * The function which {@link #encode} uses to encode all javascript values to their JSON representations
     * when {@link Ext#USE_NATIVE_JSON} is `false`.
     * 
     * This is made public so that it can be replaced with a custom implementation.
     *
     * @param {Object} o Any javascript value to be converted to its JSON representation
     * @return {String} The JSON representation of the passed value.
     * @method
     */
    me.encodeValue = doEncode;

    /**
     * Encodes a Date. This returns the actual string which is inserted into the JSON string as the literal
     * expression. **The returned value includes enclosing double quotation marks.**
     *
     * The default return format is `"yyyy-mm-ddThh:mm:ss"`.
     *
     * To override this:
     *
     *     Ext.JSON.encodeDate = function(d) {
     *         return Ext.Date.format(d, '"Y-m-d"');
     *     };
     *
     * @param {Date} d The Date to encode
     * @return {String} The string literal to use in a JSON string.
     */
    me.encodeDate = function(o) {
        return '"' + o.getFullYear() + "-"
        + pad(o.getMonth() + 1) + "-"
        + pad(o.getDate()) + "T"
        + pad(o.getHours()) + ":"
        + pad(o.getMinutes()) + ":"
        + pad(o.getSeconds()) + '"';
    };

    /**
     * Encodes an Object, Array or other value.
     * 
     * If the environment's native JSON encoding is not being used ({@link Ext#USE_NATIVE_JSON} is not set,
     * or the environment does not support it), then ExtJS's encoding will be used. This allows the developer
     * to add a `toJSON` method to their classes which need serializing to return a valid JSON representation
     * of the object.
     * 
     * @param {Object} o The variable to encode
     * @return {String} The JSON string
     */
    me.encode = function(o) {
        if (!encodingFunction) {
            // setup encoding function on first access
            encodingFunction = isNative() ? JSON.stringify : me.encodeValue;
        }
        return encodingFunction(o);
    };

    /**
     * Decodes (parses) a JSON string to an object. If the JSON is invalid, this function throws
     * a SyntaxError unless the safe option is set.
     *
     * @param {String} json The JSON string
     * @param {Boolean} [safe=false] True to return null, false to throw an exception if the JSON is invalid.
     * @return {Object} The resulting object
     */
    me.decode = function(json, safe) {
        if (!decodingFunction) {
            // setup decoding function on first access
            decodingFunction = isNative() ? JSON.parse : doDecode;
        }
        try {
            return decodingFunction(json);
        } catch (e) {
            if (safe === true) {
                return null;
            }
            Ext.Error.raise({
                sourceClass: "Ext.JSON",
                sourceMethod: "decode",
                msg: "You're trying to decode an invalid JSON String: " + json
            });
        }
    };
})());
/**
 * Shorthand for {@link Ext.JSON#encode}
 * @member Ext
 * @method encode
 * @inheritdoc Ext.JSON#encode
 */
Ext.encode = Ext.JSON.encode;
/**
 * Shorthand for {@link Ext.JSON#decode}
 * @member Ext
 * @method decode
 * @inheritdoc Ext.JSON#decode
 */
Ext.decode = Ext.JSON.decode;