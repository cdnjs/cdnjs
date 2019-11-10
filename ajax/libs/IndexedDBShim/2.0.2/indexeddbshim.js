var idbModules = {  // jshint ignore:line
    util: {
        cleanInterface: false
    }
};

(function () {
    'use strict';

    var testObject = {test: true};
    //Test whether Object.defineProperty really works.
    if (Object.defineProperty) {
        try {
            Object.defineProperty(testObject, 'test', { enumerable: false });
            if (testObject.test) {
                idbModules.util.cleanInterface = true;      // jshint ignore:line
            }
        } catch (e) {
        //Object.defineProperty does not work as intended.
        }
    }
})();

(function(idbModules) {
    'use strict';

    /**
     * A utility method to callback onsuccess, onerror, etc as soon as the calling function's context is over
     * @param {Object} fn
     * @param {Object} context
     * @param {Object} argArray
     */
    function callback(fn, context, event) {
        //window.setTimeout(function(){
        event.target = context;
        (typeof context[fn] === "function") && context[fn].apply(context, [event]);
        //}, 1);
    }

    /**
     * Shim the DOMStringList object.
     *
     */
    var StringList = function() {
        this.length = 0;
        this._items = [];
        //Internal functions on the prototype have been made non-enumerable below.
        if (idbModules.util.cleanInterface) {
            Object.defineProperty(this, '_items', {
                enumerable: false
            });
        }
    };
    StringList.prototype = {
        // Interface.
        contains: function(str) {
            return -1 !== this._items.indexOf(str);
        },
        item: function(key) {
            return this._items[key];
        },

        // Helpers. Should only be used internally.
        indexOf: function(str) {
            return this._items.indexOf(str);
        },
        push: function(item) {
            this._items.push(item);
            this.length += 1;
            for (var i = 0; i < this._items.length; i++) {
                this[i] = this._items[i];
            }
        },
        splice: function(/*index, howmany, item1, ..., itemX*/) {
            this._items.splice.apply(this._items, arguments);
            this.length = this._items.length;
            for (var i in this) {
                if (i === String(parseInt(i, 10))) {
                    delete this[i];
                }
            }
            for (i = 0; i < this._items.length; i++) {
                this[i] = this._items[i];
            }
        }
    };
    if (idbModules.util.cleanInterface) {
        for (var i in {
            'indexOf': false,
            'push': false,
            'splice': false
        }) {
            Object.defineProperty(StringList.prototype, i, {
                enumerable: false
            });
        }
    }

    idbModules.util.callback = callback;
    idbModules.util.StringList = StringList;
    idbModules.util.quote = function(arg) {
        return "\"" + arg + "\"";
    };

}(idbModules));

(function (idbModules) {
    'use strict';

    /**
     * Polyfills missing features in the browser's native IndexedDB implementation.
     * This is used for browsers that DON'T support WebSQL but DO support IndexedDB
     */
    function polyfill() {
        if (navigator.userAgent.match(/MSIE/) || navigator.userAgent.match(/Trident/)) {
            // Internet Explorer's native IndexedDB does not support compound keys
            compoundKeyPolyfill();
        }
    }

    /**
     * Polyfills support for compound keys
     */
    function compoundKeyPolyfill() {
        var cmp = IDBFactory.prototype.cmp;
        var createObjectStore = IDBDatabase.prototype.createObjectStore;
        var createIndex = IDBObjectStore.prototype.createIndex;
        var add = IDBObjectStore.prototype.add;
        var put = IDBObjectStore.prototype.put;
        var indexGet = IDBIndex.prototype.get;
        var indexGetKey = IDBIndex.prototype.getKey;
        var indexCursor = IDBIndex.prototype.openCursor;
        var indexKeyCursor = IDBIndex.prototype.openKeyCursor;
        var storeGet = IDBObjectStore.prototype.get;
        var storeDelete = IDBObjectStore.prototype.delete;
        var storeCursor = IDBObjectStore.prototype.openCursor;
        var storeKeyCursor = IDBObjectStore.prototype.openKeyCursor;
        var bound = IDBKeyRange.bound;
        var upperBound = IDBKeyRange.upperBound;
        var lowerBound = IDBKeyRange.lowerBound;
        var only = IDBKeyRange.only;
        var requestResult = Object.getOwnPropertyDescriptor(IDBRequest.prototype, 'result');
        var cursorPrimaryKey = Object.getOwnPropertyDescriptor(IDBCursor.prototype, 'primaryKey');
        var cursorKey = Object.getOwnPropertyDescriptor(IDBCursor.prototype, 'key');
        var cursorValue = Object.getOwnPropertyDescriptor(IDBCursorWithValue.prototype, 'value');

        IDBFactory.prototype.cmp = function(key1, key2) {
            var args = Array.prototype.slice.call(arguments);
            if (key1 instanceof Array) {
                args[0] = encodeCompoundKey(key1);
            }
            if (key2 instanceof Array) {
                args[1] = encodeCompoundKey(key2);
            }
            return cmp.apply(this, args);
        };

        IDBDatabase.prototype.createObjectStore = function(name, opts) {
            if (opts && opts.keyPath instanceof Array) {
                opts.keyPath = encodeCompoundKeyPath(opts.keyPath);
            }
            return createObjectStore.apply(this, arguments);
        };

        IDBObjectStore.prototype.createIndex = function(name, keyPath, opts) {
            var args = Array.prototype.slice.call(arguments);
            if (keyPath instanceof Array) {
                args[1] = encodeCompoundKeyPath(keyPath);
            }
            return createIndex.apply(this, args);
        };

        IDBObjectStore.prototype.add = function(value, key) {
            return this.__insertData(add, arguments);
        };

        IDBObjectStore.prototype.put = function(value, key) {
            return this.__insertData(put, arguments);
        };

        IDBObjectStore.prototype.__insertData = function(method, args) {
            args = Array.prototype.slice.call(args);
            var value = args[0];
            var key = args[1];

            // out-of-line key
            if (key instanceof Array) {
                args[1] = encodeCompoundKey(key);
            }

            if (typeof value === 'object') {
                // inline key
                if (isCompoundKey(this.keyPath)) {
                    setInlineCompoundKey(value, this.keyPath);
                }

                // inline indexes
                for (var i = 0; i < this.indexNames.length; i++) {
                    var index = this.index(this.indexNames[i]);
                    if (isCompoundKey(index.keyPath)) {
                        try {
                            setInlineCompoundKey(value, index.keyPath);
                        }
                        catch (e) {
                            // The value doesn't have a valid key for this index.
                        }
                    }
                }
            }
            return method.apply(this, args);
        };

        IDBIndex.prototype.get = function(key) {
            var args = Array.prototype.slice.call(arguments);
            if (key instanceof Array) {
                args[0] = encodeCompoundKey(key);
            }
            return indexGet.apply(this, args);
        };

        IDBIndex.prototype.getKey = function(key) {
            var args = Array.prototype.slice.call(arguments);
            if (key instanceof Array) {
                args[0] = encodeCompoundKey(key);
            }
            return indexGetKey.apply(this, args);
        };

        IDBIndex.prototype.openCursor = function(key) {
            var args = Array.prototype.slice.call(arguments);
            if (key instanceof Array) {
                args[0] = encodeCompoundKey(key);
            }
            return indexCursor.apply(this, args);
        };

        IDBIndex.prototype.openKeyCursor = function(key) {
            var args = Array.prototype.slice.call(arguments);
            if (key instanceof Array) {
                args[0] = encodeCompoundKey(key);
            }
            return indexKeyCursor.apply(this, args);
        };

        IDBObjectStore.prototype.get = function(key) {
            var args = Array.prototype.slice.call(arguments);
            if (key instanceof Array) {
                args[0] = encodeCompoundKey(key);
            }
            return storeGet.apply(this, args);
        };

        IDBObjectStore.prototype.delete = function(key) {
            var args = Array.prototype.slice.call(arguments);
            if (key instanceof Array) {
                args[0] = encodeCompoundKey(key);
            }
            return storeDelete.apply(this, args);
        };

        IDBObjectStore.prototype.openCursor = function(key) {
            var args = Array.prototype.slice.call(arguments);
            if (key instanceof Array) {
                args[0] = encodeCompoundKey(key);
            }
            return storeCursor.apply(this, args);
        };

        IDBObjectStore.prototype.openKeyCursor = function(key) {
            var args = Array.prototype.slice.call(arguments);
            if (key instanceof Array) {
                args[0] = encodeCompoundKey(key);
            }
            return storeKeyCursor.apply(this, args);
        };

        IDBKeyRange.bound = function(lower, upper, lowerOpen, upperOpen) {
            var args = Array.prototype.slice.call(arguments);
            if (lower instanceof Array) {
                args[0] = encodeCompoundKey(lower);
            }
            if (upper instanceof Array) {
                args[1] = encodeCompoundKey(upper);
            }
            return bound.apply(IDBKeyRange, args);
        };

        IDBKeyRange.upperBound = function(key, open) {
            var args = Array.prototype.slice.call(arguments);
            if (key instanceof Array) {
                args[0] = encodeCompoundKey(key);
            }
            return upperBound.apply(IDBKeyRange, args);
        };

        IDBKeyRange.lowerBound = function(key, open) {
            var args = Array.prototype.slice.call(arguments);
            if (key instanceof Array) {
                args[0] = encodeCompoundKey(key);
            }
            return lowerBound.apply(IDBKeyRange, args);
        };

        IDBKeyRange.only = function(key) {
            var args = Array.prototype.slice.call(arguments);
            if (key instanceof Array) {
                args[0] = encodeCompoundKey(key);
            }
            return only.apply(IDBKeyRange, args);
        };

        Object.defineProperty(IDBRequest.prototype, 'result', {
            enumerable: requestResult.enumerable,
            configurable: requestResult.configurable,
            get: function() {
                var result = requestResult.get.call(this);
                return removeInlineCompoundKey(result);
            }
        });

        Object.defineProperty(IDBCursor.prototype, 'primaryKey', {
            enumerable: cursorPrimaryKey.enumerable,
            configurable: cursorPrimaryKey.configurable,
            get: function() {
                var result = cursorPrimaryKey.get.call(this);
                return removeInlineCompoundKey(result);
            }
        });

        Object.defineProperty(IDBCursor.prototype, 'key', {
            enumerable: cursorKey.enumerable,
            configurable: cursorKey.configurable,
            get: function() {
                var result = cursorKey.get.call(this);
                return removeInlineCompoundKey(result);
            }
        });

        Object.defineProperty(IDBCursorWithValue.prototype, 'value', {
            enumerable: cursorValue.enumerable,
            configurable: cursorValue.configurable,
            get: function() {
                var result = cursorValue.get.call(this);
                return removeInlineCompoundKey(result);
            }
        });

        try {
            if (!IDBTransaction.VERSION_CHANGE) {
                IDBTransaction.VERSION_CHANGE = 'versionchange';
            }
        }
        catch (e) {}
    }

    var compoundKeysPropertyName = '__$$compoundKey';
    var propertySeparatorRegExp = /\$\$/g;
    var propertySeparator = '$$$$';         // "$$" after RegExp escaping
    var keySeparator = '$_$';

    function isCompoundKey(keyPath) {
        return keyPath && (keyPath.indexOf(compoundKeysPropertyName + '.') === 0);
    }

    function encodeCompoundKeyPath(keyPath) {
        // Encoded dotted properties
        // ["name.first", "name.last"] ==> ["name$$first", "name$$last"]
        for (var i = 0; i < keyPath.length; i++) {
            keyPath[i] = keyPath[i].replace(/\./g, propertySeparator);
        }

        // Encode the array as a single property
        // ["name$$first", "name$$last"] => "__$$compoundKey.name$$first$_$name$$last"
        return compoundKeysPropertyName + '.' + keyPath.join(keySeparator);
    }

    function decodeCompoundKeyPath(keyPath) {
        // Remove the "__$$compoundKey." prefix
        keyPath = keyPath.substr(compoundKeysPropertyName.length + 1);

        // Split the properties into an array
        // "name$$first$_$name$$last" ==> ["name$$first", "name$$last"]
        keyPath = keyPath.split(keySeparator);

        // Decode dotted properties
        // ["name$$first", "name$$last"] ==> ["name.first", "name.last"]
        for (var i = 0; i < keyPath.length; i++) {
            keyPath[i] = keyPath[i].replace(propertySeparatorRegExp, '.');
        }
        return keyPath;
    }

    function setInlineCompoundKey(value, encodedKeyPath) {
        // Encode the key
        var keyPath = decodeCompoundKeyPath(encodedKeyPath);
        var key = idbModules.Key.getValue(value, keyPath);
        var encodedKey = encodeCompoundKey(key);

        // Store the encoded key inline
        encodedKeyPath = encodedKeyPath.substr(compoundKeysPropertyName.length + 1);
        value[compoundKeysPropertyName] = value[compoundKeysPropertyName] || {};
        value[compoundKeysPropertyName][encodedKeyPath] = encodedKey;
    }

    function removeInlineCompoundKey(value) {
        if (typeof value === "string" && isCompoundKey(value)) {
            return decodeCompoundKey(value);
        }
        else if (value && typeof value[compoundKeysPropertyName] === "object") {
            delete value[compoundKeysPropertyName];
        }
        return value;
    }

    function encodeCompoundKey(key) {
        // Validate and encode the key
        idbModules.Key.validate(key);
        key = idbModules.Key.encode(key);

        // Prepend the "__$$compoundKey." prefix
        key = compoundKeysPropertyName + '.' + key;

        validateKeyLength(key);
        return key;
    }

    function decodeCompoundKey(key) {
        validateKeyLength(key);

        // Remove the "__$$compoundKey." prefix
        key = key.substr(compoundKeysPropertyName.length + 1);

        // Decode the key
        key = idbModules.Key.decode(key);
        return key;
    }

    function validateKeyLength(key) {
        // BUG: Internet Explorer truncates string keys at 889 characters
        if (key.length > 889) {
            throw idbModules.util.createDOMException("DataError", "The encoded key is " + key.length + " characters long, but IE only allows 889 characters. Consider replacing numeric keys with strings to reduce the encoded length.");
        }
    }

    idbModules.polyfill = polyfill;
})(idbModules);

(function(idbModules){
    'use strict';

    /**
     * Implementation of the Structured Cloning Algorithm.  Supports the
     * following object types:
     * - Blob
     * - Boolean
     * - Date object
     * - File object (deserialized as Blob object).
     * - Number object
     * - RegExp object
     * - String object
     * This is accomplished by doing the following:
     * 1) Using the cycle/decycle functions from:
     *    https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
     * 2) Serializing/deserializing objects to/from string that don't work with
     *    JSON.stringify and JSON.parse by using object specific logic (eg use 
     *    the FileReader API to convert a Blob or File object to a data URL.   
     * 3) JSON.stringify and JSON.parse do the final conversion to/from string.
     */
    var Sca = (function(){
        return {
            decycle: function(object, callback) {
                //From: https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
                // Contains additional logic to convert the following object types to string
                // so that they can properly be encoded using JSON.stringify:
                //  *Boolean
                //  *Date
                //  *File
                //  *Blob
                //  *Number
                //  *Regex
                // Make a deep copy of an object or array, assuring that there is at most
                // one instance of each object or array in the resulting structure. The
                // duplicate references (which might be forming cycles) are replaced with
                // an object of the form
                //      {$ref: PATH}
                // where the PATH is a JSONPath string that locates the first occurance.
                // So,
                //      var a = [];
                //      a[0] = a;
                //      return JSON.stringify(JSON.decycle(a));
                // produces the string '[{"$ref":"$"}]'.

                // JSONPath is used to locate the unique object. $ indicates the top level of
                // the object or array. [NUMBER] or [STRING] indicates a child member or
                // property.

                var objects = [],   // Keep a reference to each unique object or array
                paths = [],     // Keep the path to each unique object or array
                queuedObjects = [],
                returnCallback = callback;

                /**
                 * Check the queue to see if all objects have been processed.
                 * if they have, call the callback with the converted object.
                 */
                function checkForCompletion() {
                    if (queuedObjects.length === 0) {
                        returnCallback(derezObj);
                    }    
                }

                /**
                 * Convert a blob to a data URL.
                 * @param {Blob} blob to convert.
                 * @param {String} path of blob in object being encoded.
                 */
                function readBlobAsDataURL(blob, path) {
                    var reader = new FileReader();
                    reader.onloadend = function(loadedEvent) {
                        var dataURL = loadedEvent.target.result;
                        var blobtype = 'Blob';
                        if (blob instanceof File) {
                            //blobtype = 'File';
                        }
                        updateEncodedBlob(dataURL, path, blobtype);
                    };
                    reader.readAsDataURL(blob);
                }
                
                /**
                 * Async handler to update a blob object to a data URL for encoding.
                 * @param {String} dataURL
                 * @param {String} path
                 * @param {String} blobtype - file if the blob is a file; blob otherwise
                 */
                function updateEncodedBlob(dataURL, path, blobtype) {
                    var encoded = queuedObjects.indexOf(path);
                    path = path.replace('$','derezObj');
                    eval(path+'.$enc="'+dataURL+'"');
                    eval(path+'.$type="'+blobtype+'"');
                    queuedObjects.splice(encoded, 1);
                    checkForCompletion();
                }

                function derez(value, path) {

                    // The derez recurses through the object, producing the deep copy.

                    var i,          // The loop counter
                    name,       // Property name
                    nu;         // The new object or array

                    // typeof null === 'object', so go on if this value is really an object but not
                    // one of the weird builtin objects.

                    if (typeof value === 'object' && value !== null &&
                        !(value instanceof Boolean) &&
                        !(value instanceof Date)    &&
                        !(value instanceof Number)  &&
                        !(value instanceof RegExp)  &&
                        !(value instanceof Blob)  &&
                        !(value instanceof String)) {

                        // If the value is an object or array, look to see if we have already
                        // encountered it. If so, return a $ref/path object. This is a hard way,
                        // linear search that will get slower as the number of unique objects grows.

                        for (i = 0; i < objects.length; i += 1) {
                            if (objects[i] === value) {
                                return {$ref: paths[i]};
                            }
                        }

                        // Otherwise, accumulate the unique value and its path.

                        objects.push(value);
                        paths.push(path);

                        // If it is an array, replicate the array.

                        if (Object.prototype.toString.apply(value) === '[object Array]') {
                            nu = [];
                            for (i = 0; i < value.length; i += 1) {
                                nu[i] = derez(value[i], path + '[' + i + ']');
                            }
                        } else {
                            // If it is an object, replicate the object.
                            nu = {};
                            for (name in value) {
                                if (Object.prototype.hasOwnProperty.call(value, name)) {
                                    nu[name] = derez(value[name],
                                     path + '[' + JSON.stringify(name) + ']');
                                }
                            }
                        }

                        return nu;
                    } else if (value instanceof Blob) {
                        //Queue blob for conversion
                        queuedObjects.push(path);
                        readBlobAsDataURL(value, path);
                    } else if (value instanceof Boolean) {
                        value = {
                            '$type': 'Boolean',
                            '$enc': value.toString()
                        };
                    } else if (value instanceof Date) {
                        value = {
                            '$type': 'Date',
                            '$enc': value.getTime()
                        };
                    } else if (value instanceof Number) {
                        value = {
                            '$type': 'Number',
                            '$enc': value.toString()
                        };
                    } else if (value instanceof RegExp) {
                        value = {
                            '$type': 'RegExp',
                            '$enc': value.toString()
                        };
                    } else if (typeof value === 'number') {
                        value = {
                            '$type': 'number',
                            '$enc': value + ''  // handles NaN, Infinity, Negative Infinity
                        };
                    } else if (value === undefined) {
                        value = {
                            '$type': 'undefined'
                        };
                    }
                    return value;
                }
                var derezObj = derez(object, '$');
                checkForCompletion();
            },
                
            retrocycle: function retrocycle($) {
                //From: https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
                // Contains additional logic to convert strings to the following object types 
                // so that they can properly be decoded:
                //  *Boolean
                //  *Date
                //  *File
                //  *Blob
                //  *Number
                //  *Regex
                // Restore an object that was reduced by decycle. Members whose values are
                // objects of the form
                //      {$ref: PATH}
                // are replaced with references to the value found by the PATH. This will
                // restore cycles. The object will be mutated.

                // The eval function is used to locate the values described by a PATH. The
                // root object is kept in a $ variable. A regular expression is used to
                // assure that the PATH is extremely well formed. The regexp contains nested
                // * quantifiers. That has been known to have extremely bad performance
                // problems on some browsers for very long strings. A PATH is expected to be
                // reasonably short. A PATH is allowed to belong to a very restricted subset of
                // Goessner's JSONPath.

                // So,
                //      var s = '[{"$ref":"$"}]';
                //      return JSON.retrocycle(JSON.parse(s));
                // produces an array containing a single element which is the array itself.

                var px = /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;
                
                /**
                 * Converts the specified data URL to a Blob object
                 * @param {String} dataURL to convert to a Blob
                 * @returns {Blob} the converted Blob object
                 */
                function dataURLToBlob(dataURL) {
                    var BASE64_MARKER = ';base64,',
                        contentType,
                        parts,
                        raw;
                    if (dataURL.indexOf(BASE64_MARKER) === -1) {
                        parts = dataURL.split(',');
                        contentType = parts[0].split(':')[1];
                        raw = parts[1];

                        return new Blob([raw], {type: contentType});
                    }

                    parts = dataURL.split(BASE64_MARKER);
                    contentType = parts[0].split(':')[1];
                    raw = window.atob(parts[1]);
                    var rawLength = raw.length;
                    var uInt8Array = new Uint8Array(rawLength);

                    for (var i = 0; i < rawLength; ++i) {
                        uInt8Array[i] = raw.charCodeAt(i);
                    }
                    return new Blob([uInt8Array.buffer], {type: contentType});
                }
                
                function rez(value) {
                    // The rez function walks recursively through the object looking for $ref
                    // properties. When it finds one that has a value that is a path, then it
                    // replaces the $ref object with a reference to the value that is found by
                    // the path.

                    var i, item, name, path;

                    if (value && typeof value === 'object') {
                        if (Object.prototype.toString.apply(value) === '[object Array]') {
                            for (i = 0; i < value.length; i += 1) {
                                item = value[i];
                                if (item && typeof item === 'object') {
                                    path = item.$ref;
                                    if (typeof path === 'string' && px.test(path)) {
                                        value[i] = eval(path);
                                    } else {
                                        value[i] = rez(item);
                                    }
                                }
                            }
                        } else {
                            if (value.$type !== undefined) {
                                switch(value.$type) {
                                    case 'Blob':
                                    case 'File':
                                        value = dataURLToBlob(value.$enc);
                                        break;
                                    case 'Boolean':
                                        value = Boolean(value.$enc === 'true');
                                        break;
                                    case 'Date':
                                        value = new Date(value.$enc);
                                        break;
                                    case 'Number':
                                        value = Number(value.$enc);
                                        break;
                                    case 'RegExp':
                                        value = eval(value.$enc);
                                        break;
                                    case 'number':
                                        value = parseFloat(value.$enc);
                                        break;
                                    case 'undefined':
                                        value = undefined;
                                        break;
                                }
                            } else {
                                for (name in value) {
                                    if (typeof value[name] === 'object') {
                                        item = value[name];
                                        if (item) {
                                            path = item.$ref;
                                            if (typeof path === 'string' && px.test(path)) {
                                                value[name] = eval(path);
                                            } else {
                                                value[name] = rez(item);
                                            }
                                        }
                                    }   
                                }
                            }
                        }
                    }
                    return value;
                }
                return rez($);

            },

            /**
             * Encode the specified object as a string.  Because of the asynchronus
             * conversion of Blob/File to string, the encode function requires
             * a callback
             * @param {Object} val the value to convert.
             * @param {function} callback the function to call once conversion is
             * complete.  The callback gets called with the converted value.
             */
            "encode": function(val, callback){
                function finishEncode(val) {
                    callback(JSON.stringify(val));
                }
                this.decycle(val, finishEncode);                        
            },
                    
            /**
             * Deserialize the specified string to an object
             * @param {String} val the serialized string
             * @returns {Object} the deserialized object
             */
            "decode": function(val){
                return this.retrocycle(JSON.parse(val));
            }
        };
    }());
    idbModules.Sca = Sca;
}(idbModules));

(function(idbModules) {
    "use strict";

    /**
     * Encodes the keys based on their types. This is required to maintain collations
     */
    var collations = ["undefined", "number", "date", "string", "array"];
    
    /**
     * The sign values for numbers, ordered from least to greatest.
     *  - "negativeInfinity": Sorts below all other values.
     *  - "bigNegative": Negative values less than or equal to negative one.
     *  - "smallNegative": Negative values between negative one and zero, noninclusive.
     *  - "smallPositive": Positive values between zero and one, including zero but not one.
     *  - "largePositive": Positive values greater than or equal to one.
     *  - "positiveInfinity": Sorts above all other values.
     */
    var signValues = ["negativeInfinity", "bigNegative", "smallNegative", "smallPositive", "bigPositive", "positiveInfinity"];
    
    var types = {
        // Undefined is not a valid key type.  It's only used when there is no key.
        undefined: {
            encode: function(key) {
                return collations.indexOf("undefined") + "-";
            },
            decode: function(key) {
                return undefined;
            }
        },

        // Dates are encoded as ISO 8601 strings, in UTC time zone.
        date: {
            encode: function(key) {
                return collations.indexOf("date") + "-" + key.toJSON();
            },
            decode: function(key) {
                return new Date(key.substring(2));
            }
        },

        // Numbers are represented in a lexically sortable base-32 sign-exponent-mantissa
        // notation.
        //
        // sign: takes a value between zero and five, inclusive. Represents infinite cases
        //     and the signs of both the exponent and the fractional part of the number.
        // exponent: paded to two base-32 digits, represented by the 32's compliment in the
        //     "smallPositive" and "bigNegative" cases to ensure proper lexical sorting.
        // mantissa: also called the fractional part. Normed 11-digit base-32 representation.
        //     Represented by the 32's compliment in the "smallNegative" and "bigNegative"
        //     cases to ensure proper lexical sorting.
        number: {
            // The encode step checks for six numeric cases and generates 14-digit encoded
            // sign-exponent-mantissa strings.
            encode: function(key) {
                var key32 = Math.abs(key).toString(32);
                // Get the index of the decimal.
                var decimalIndex = key32.indexOf(".");
                // Remove the decimal.
                key32 = (decimalIndex !== -1) ? key32.replace(".", "") : key32;
                // Get the index of the first significant digit.
                var significantDigitIndex = key32.search(/[^0]/);
                // Truncate leading zeros.
                key32 = key32.slice(significantDigitIndex);
                var sign, exponent = zeros(2), mantissa = zeros(11);
                
                // Finite cases:
                if (isFinite(key)) {
                    // Negative cases:
                    if (key < 0) {
                        // Negative exponent case:
                        if (key > -1) {
                            sign = signValues.indexOf("smallNegative");
                            exponent = padBase32Exponent(significantDigitIndex);
                            mantissa = flipBase32(padBase32Mantissa(key32));
                        }
                        // Non-negative exponent case:
                        else {
                            sign = signValues.indexOf("bigNegative");
                            exponent = flipBase32(padBase32Exponent(
                                (decimalIndex !== -1) ? decimalIndex : key32.length
                            ));
                            mantissa = flipBase32(padBase32Mantissa(key32));
                        }
                    }
                    // Non-negative cases:
                    else {
                        // Negative exponent case:
                        if (key < 1) {
                            sign = signValues.indexOf("smallPositive");
                            exponent = flipBase32(padBase32Exponent(significantDigitIndex));
                            mantissa = padBase32Mantissa(key32);
                        }
                        // Non-negative exponent case:
                        else {
                            sign = signValues.indexOf("bigPositive");
                            exponent = padBase32Exponent(
                                (decimalIndex !== -1) ? decimalIndex : key32.length
                            ); 
                            mantissa = padBase32Mantissa(key32);
                        }
                    }
                }
                // Infinite cases:
                else {
                    sign = signValues.indexOf(
                        key > 0 ? "positiveInfinity" : "negativeInfinity"
                    );
                }

                return collations.indexOf("number") + "-" + sign + exponent + mantissa;
            },
            // The decode step must interpret the sign, reflip values encoded as the 32's complements,
            // apply signs to the exponent and mantissa, do the base-32 power operation, and return
            // the original JavaScript number values.
            decode: function(key) {
                var sign = +key.substr(2, 1);
                var exponent = key.substr(3, 2);
                var mantissa = key.substr(5, 11);
                
                switch (signValues[sign]) {
                    case "negativeInfinity":
                        return -Infinity;
                    case "positiveInfinity":
                        return Infinity;
                    case "bigPositive":
                        return pow32(mantissa, exponent);
                    case "smallPositive":
                        exponent = negate(flipBase32(exponent));
                        return pow32(mantissa, exponent);
                    case "smallNegative":
                        exponent = negate(exponent);
                        mantissa = flipBase32(mantissa);
                        return -pow32(mantissa, exponent);
                    case "bigNegative":
                        exponent = flipBase32(exponent);
                        mantissa = flipBase32(mantissa);
                        return -pow32(mantissa, exponent);
                    default:
                        throw new Error("Invalid number.");
                }
            }
        },

        // Strings are encoded as JSON strings (with quotes and unicode characters escaped).
        //
        // IF the strings are in an array, then some extra encoding is done to make sorting work correctly:
        // Since we can't force all strings to be the same length, we need to ensure that characters line-up properly
        // for sorting, while also accounting for the extra characters that are added when the array itself is encoded as JSON.
        // To do this, each character of the string is prepended with a dash ("-"), and a space is added to the end of the string.
        // This effectively doubles the size of every string, but it ensures that when two arrays of strings are compared,
        // the indexes of each string's characters line up with each other.
        string: {
            encode: function(key, inArray) {
                if (inArray) {
                    // prepend each character with a dash, and append a space to the end
                    key = key.replace(/(.)/g, '-$1') + ' ';
                }
                return collations.indexOf("string") + "-" + key;
            },
            decode: function(key, inArray) {
                key = key.substring(2);
                if (inArray) {
                    // remove the space at the end, and the dash before each character
                    key = key.substr(0, key.length - 1).replace(/-(.)/g, '$1');
                }
                return key;
            }
        },

        // Arrays are encoded as JSON strings.
        // An extra, value is added to each array during encoding to make empty arrays sort correctly.
        array: {
            encode: function(key) {
                var encoded = [];
                for (var i = 0; i < key.length; i++) {
                    var item = key[i];
                    var encodedItem = idbModules.Key.encode(item, true);        // encode the array item
                    encoded[i] = encodedItem;
                }
                encoded.push(collations.indexOf("undefined") + "-");            // append an extra item, so empty arrays sort correctly
                return collations.indexOf("array") + "-" + JSON.stringify(encoded);
            },
            decode: function(key) {
                var decoded = JSON.parse(key.substring(2));
                decoded.pop();                                                  // remove the extra item
                for (var i = 0; i < decoded.length; i++) {
                    var item = decoded[i];
                    var decodedItem = idbModules.Key.decode(item, true);        // decode the item
                    decoded[i] = decodedItem;
                }
                return decoded;
            }
        }
    };

    /**
     * Return a padded base-32 exponent value.
     * @param {number}
     * @return {string}
     */
    function padBase32Exponent(n) {
        n = n.toString(32);
        return (n.length === 1) ? "0" + n : n;
    }
    
    /**
     * Return a padded base-32 mantissa.
     * @param {string}
     * @return {string}
     */
    function padBase32Mantissa(s) {
        return (s + zeros(11)).slice(0, 11);
    }

    /**
     * Flips each digit of a base-32 encoded string.
     * @param {string} encoded
     */
    function flipBase32(encoded) {
        var flipped = "";
        for (var i = 0; i < encoded.length; i++) {
            flipped += (31 - parseInt(encoded[i], 32)).toString(32);
        }
        return flipped;
    }
    
    /**
     * Base-32 power function.
     * RESEARCH: This function does not precisely decode floats because it performs
     * floating point arithmetic to recover values. But can the original values be
     * recovered exactly?
     * Someone may have already figured out a good way to store JavaScript floats as
     * binary strings and convert back. Barring a better method, however, one route
     * may be to generate decimal strings that `parseFloat` decodes predictably. 
     * @param {string}
     * @param {string}
     * @return {number}
     */
    function pow32(mantissa, exponent) {
        var whole, fraction, expansion;
        exponent = parseInt(exponent, 32);
        if (exponent < 0) {
            return roundToPrecision(
                parseInt(mantissa, 32) * Math.pow(32, exponent - 10)
            );
        }
        else {
            if (exponent < 11) {
                whole = mantissa.slice(0, exponent);
                whole = parseInt(whole, 32);
                fraction = mantissa.slice(exponent);
                fraction = parseInt(fraction, 32) * Math.pow(32, exponent - 11);
                return roundToPrecision(whole + fraction);
            }
            else {
                expansion = mantissa + zeros(exponent - 11);
                return parseInt(expansion, 32);
            }
        }
    }
    
    /**
     * 
     */
    function roundToPrecision(num, precision) {
        precision = precision || 16;
        return parseFloat(num.toPrecision(precision));
    }
    
    /**
     * Returns a string of n zeros.
     * @param {number}
     * @return {string}
     */
    function zeros(n) {
        var result = "";
        while (n--) {
            result = result + "0";
        }
        return result;
    }
    
    /**
     * Negates numeric strings.
     * @param {string}
     * @return {string}
     */
    function negate(s) {
        return "-" + s;
    }

    /**
     * Returns the string "number", "date", "string", or "array".
     */
    function getType(key) {
        if (key instanceof Date) {
            return "date";
        }
        if (key instanceof Array) {
            return "array";
        }
        return typeof key;
    }

    /**
     * Keys must be strings, numbers, Dates, or Arrays
     */
    function validate(key) {
        var type = getType(key);
        if (type === "array") {
            for (var i = 0; i < key.length; i++) {
                validate(key[i]);
            }
        }
        else if (!types[type] || (type !== "string" && isNaN(key))) {
            throw idbModules.util.createDOMException("DataError", "Not a valid key");
        }
    }

    /**
     * Returns the value of an inline key
     * @param {object} source
     * @param {string|array} keyPath
     */
    function getValue(source, keyPath) {
        try {
            if (keyPath instanceof Array) {
                var arrayValue = [];
                for (var i = 0; i < keyPath.length; i++) {
                    arrayValue.push(eval("source." + keyPath[i]));
                }
                return arrayValue;
            } else {
                return eval("source." + keyPath);
            }
        }
        catch (e) {
            return undefined;
        }
    }

    /**
     * Sets the inline key value
     * @param {object} source
     * @param {string} keyPath
     * @param {*} value
     */
    function setValue(source, keyPath, value) {
        var props = keyPath.split('.');
        for (var i = 0; i < props.length - 1; i++) {
            var prop = props[i];
            source = source[prop] = source[prop] || {};
        }
        source[props[props.length - 1]] = value;
    }

    /**
     * Determines whether an index entry matches a multi-entry key value.
     * @param {string} encodedEntry     The entry value (already encoded)
     * @param {string} encodedKey       The full index key (already encoded)
     * @returns {boolean}
     */
    function isMultiEntryMatch(encodedEntry, encodedKey) {
        var keyType = collations[encodedKey.substring(0, 1)];

        if (keyType === "array") {
            return encodedKey.indexOf(encodedEntry) > 1;
        }
        else {
            return encodedKey === encodedEntry;
        }
    }

    function isKeyInRange(key, range) {
        var lowerMatch = range.lower === undefined;
        var upperMatch = range.upper === undefined;

        if (range.lower !== undefined) {
            if (range.lowerOpen && key > range.lower) {
                lowerMatch = true;
            }
            if (!range.lowerOpen && key >= range.lower) {
                lowerMatch = true;
            }
        }
        if (range.upper !== undefined) {
            if (range.upperOpen && key < range.upper) {
                upperMatch = true;
            }
            if (!range.upperOpen && key <= range.upper) {
                upperMatch = true;
            }
        }

        return lowerMatch && upperMatch;
    }

    function findMultiEntryMatches(keyEntry, range) {
        var matches = [];

        if (keyEntry instanceof Array) {
            for (var i = 0; i < keyEntry.length; i++) {
                var key = keyEntry[i];

                if (key instanceof Array) {
                    if (range.lower === range.upper) {
                        continue;
                    }
                    if (key.length === 1) {
                        key = key[0];
                    } else {
                        var nested = findMultiEntryMatches(key, range);
                        if (nested.length > 0) {
                            matches.push(key);
                        }
                        continue;
                    }
                }

                if (isKeyInRange(key, range)) {
                    matches.push(key);
                }
            }
        } else {
            if (isKeyInRange(keyEntry, range)) {
                matches.push(keyEntry);
            }
        }
        return matches;
    }

    idbModules.Key = {
        encode: function(key, inArray) {
            if (key === undefined) {
                return null;
            }
            return types[getType(key)].encode(key, inArray);
        },
        decode: function(key, inArray) {
            if (typeof key !== "string") {
                return undefined;
            }
            return types[collations[key.substring(0, 1)]].decode(key, inArray);
        },
        validate: validate,
        getValue: getValue,
        setValue: setValue,
        isMultiEntryMatch: isMultiEntryMatch,
        findMultiEntryMatches: findMultiEntryMatches
    };
}(idbModules));

(function(idbModules) {
    'use strict';

    /**
     * Creates a native Event object, for browsers that support it
     * @returns {Event}
     */
    function createNativeEvent(type, debug) {
        var event = new Event(type);
        event.debug = debug;

        // Make the "target" writable
        Object.defineProperty(event, 'target', {
            writable: true
        });

        return event;
    }

    /**
     * A shim Event class, for browsers that don't allow us to create native Event objects.
     * @constructor
     */
    function ShimEvent(type, debug) {
        this.type = type;
        this.debug = debug;
        this.bubbles = false;
        this.cancelable = false;
        this.eventPhase = 0;
        this.timeStamp = new Date().valueOf();
    }

    var useNativeEvent = false;
    try {
        // Test whether we can use the browser's native Event class
        var test = createNativeEvent('test type', 'test debug');
        var target = {test: 'test target'};
        test.target = target;

        if (test instanceof Event && test.type === 'test type' && test.debug === 'test debug' && test.target === target) {
            // Native events work as expected
            useNativeEvent = true;
        }
    }
    catch (e) {}

    if (useNativeEvent) {
        idbModules.Event = Event;
        idbModules.IDBVersionChangeEvent = Event;
        idbModules.util.createEvent = createNativeEvent;
    }
    else {
        idbModules.Event = ShimEvent;
        idbModules.IDBVersionChangeEvent = ShimEvent;
        idbModules.util.createEvent = function(type, debug) {
            return new ShimEvent(type, debug);
        };
    }
}(idbModules));

(function(idbModules) {
    'use strict';

    /**
     * Creates a native DOMException, for browsers that support it
     * @returns {DOMException}
     */
    function createNativeDOMException(name, message) {
        var e = new DOMException.prototype.constructor(0, message);
        e.name = name || 'DOMException';
        e.message = message;
        return e;
    }

    /**
     * Creates a native DOMError, for browsers that support it
     * @returns {DOMError}
     */
    function createNativeDOMError(name, message) {
        name = name || 'DOMError';
        var e = new DOMError(name, message);
        e.name === name || (e.name = name);
        e.message === message || (e.message = message);
        return e;
    }

    /**
     * Creates a generic Error object
     * @returns {Error}
     */
    function createError(name, message) {
        var e = new Error(message);
        e.name = name || 'DOMException';
        e.message = message;
        return e;
    }

    /**
     * Logs detailed error information to the console.
     * @param {string} name
     * @param {string} message
     * @param {string|Error|null} error
     */
    idbModules.util.logError = function(name, message, error) {
        if (idbModules.DEBUG) {
            if (error && error.message) {
                error = error.message;
            }

            var method = typeof(console.error) === 'function' ? 'error' : 'log';
            console[method](name + ': ' + message + '. ' + (error || ''));
            console.trace && console.trace();
        }
    };

    /**
     * Finds the error argument.  This is useful because some WebSQL callbacks
     * pass the error as the first argument, and some pass it as the second argument.
     * @param {array} args
     * @returns {Error|DOMException|undefined}
     */
    idbModules.util.findError = function(args) {
        var err;
        if (args) {
            if (args.length === 1) {
                return args[0];
            }
            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                if (arg instanceof Error || arg instanceof DOMException) {
                    return arg;
                }
                else if (arg && typeof arg.message === "string") {
                    err = arg;
                }
            }
        }
        return err;
    };

    var test, useNativeDOMException = false, useNativeDOMError = false;

    // Test whether we can use the browser's native DOMException class
    try {
        test = createNativeDOMException('test name', 'test message');
        if (test instanceof DOMException && test.name === 'test name' && test.message === 'test message') {
            // Native DOMException works as expected
            useNativeDOMException = true;
        }
    }
    catch (e) {}

    // Test whether we can use the browser's native DOMError class
    try {
        test = createNativeDOMError('test name', 'test message');
        if (test instanceof DOMError && test.name === 'test name' && test.message === 'test message') {
            // Native DOMError works as expected
            useNativeDOMError = true;
        }
    }
    catch (e) {}

    if (useNativeDOMException) {
        idbModules.DOMException = DOMException;
        idbModules.util.createDOMException = function(name, message, error) {
            idbModules.util.logError(name, message, error);
            return createNativeDOMException(name, message);
        };
    }
    else {
        idbModules.DOMException = Error;
        idbModules.util.createDOMException = function(name, message, error) {
            idbModules.util.logError(name, message, error);
            return createError(name, message);
        };
    }

    if (useNativeDOMError) {
        idbModules.DOMError = DOMError;
        idbModules.util.createDOMError = function(name, message, error) {
            idbModules.util.logError(name, message, error);
            return createNativeDOMError(name, message);
        };
    }
    else {
        idbModules.DOMError = Error;
        idbModules.util.createDOMError = function(name, message, error) {
            idbModules.util.logError(name, message, error);
            return createError(name, message);
        };
    }
}(idbModules));

(function(idbModules){
    'use strict';

    /**
     * The IDBRequest Object that is returns for all async calls
     * http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#request-api
     */
    function IDBRequest(){
        this.onsuccess = this.onerror = this.result = this.error = this.source = this.transaction = null;
        this.readyState = "pending";
    }

    /**
     * The IDBOpenDBRequest called when a database is opened
     */
    function IDBOpenDBRequest(){
        this.onblocked = this.onupgradeneeded = null;
    }
    IDBOpenDBRequest.prototype = new IDBRequest();
    IDBOpenDBRequest.prototype.constructor = IDBOpenDBRequest;
    
    idbModules.IDBRequest = IDBRequest;
    idbModules.IDBOpenDBRequest = IDBOpenDBRequest;
    
}(idbModules));

(function(idbModules, undefined){
    'use strict';

    /**
     * The IndexedDB KeyRange object
     * http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#dfn-key-range
     * @param {Object} lower
     * @param {Object} upper
     * @param {Object} lowerOpen
     * @param {Object} upperOpen
     */
    function IDBKeyRange(lower, upper, lowerOpen, upperOpen){
        if (lower !== undefined) {
            idbModules.Key.validate(lower);
        }
        if (upper !== undefined) {
            idbModules.Key.validate(upper);
        }

        this.lower = lower;
        this.upper = upper;
        this.lowerOpen = !!lowerOpen;
        this.upperOpen = !!upperOpen;
    }

    IDBKeyRange.only = function(value){
        return new IDBKeyRange(value, value, false, false);
    };

    IDBKeyRange.lowerBound = function(value, open){
        return new IDBKeyRange(value, undefined, open, undefined);
    };
    IDBKeyRange.upperBound = function(value, open){
        return new IDBKeyRange(undefined, value, undefined, open);
    };
    IDBKeyRange.bound = function(lower, upper, lowerOpen, upperOpen){
        return new IDBKeyRange(lower, upper, lowerOpen, upperOpen);
    };

    idbModules.IDBKeyRange = IDBKeyRange;

}(idbModules));

(function(idbModules, undefined){
    'use strict';

    /**
     * The IndexedDB Cursor Object
     * http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBCursor
     * @param {IDBKeyRange} range
     * @param {string} direction
     * @param {IDBObjectStore} store
     * @param {IDBObjectStore|IDBIndex} source
     * @param {string} keyColumnName
     * @param {string} valueColumnName
     */
    function IDBCursor(range, direction, store, source, keyColumnName, valueColumnName){
        if (range !== undefined && !(range instanceof idbModules.IDBKeyRange)) {
            range = new idbModules.IDBKeyRange(range, range, false, false);
        }
        store.transaction.__assertActive();
        if (direction !== undefined && ["next", "prev", "nextunique", "prevunique"].indexOf(direction) === -1) {
            throw new TypeError(direction + "is not a valid cursor direction");
        }

        this.source = source;
        this.direction = direction || "next";
        this.key = undefined;
        this.primaryKey = undefined;
        this.__store = store;
        this.__range = range;
        this.__req = new idbModules.IDBRequest();
        this.__keyColumnName = keyColumnName;
        this.__valueColumnName = valueColumnName;
        this.__valueDecoder = valueColumnName === "value" ? idbModules.Sca : idbModules.Key;
        this.__offset = -1; // Setting this to -1 as continue will set it to 0 anyway
        this.__lastKeyContinued = undefined; // Used when continuing with a key
        this.__multiEntryIndex = source instanceof idbModules.IDBIndex ? source.multiEntry : false;
        this.__unique = this.direction.indexOf("unique") !== -1;

        if (range !== undefined) {
            // Encode the key range and cache the encoded values, so we don't have to re-encode them over and over
            range.__lower = range.lower !== undefined && idbModules.Key.encode(range.lower, this.__multiEntryIndex);
            range.__upper = range.upper !== undefined && idbModules.Key.encode(range.upper, this.__multiEntryIndex);
        }

        this["continue"]();
    }

    IDBCursor.prototype.__find = function (/* key, tx, success, error, recordsToLoad */) {
        var args = Array.prototype.slice.call(arguments);
        if (this.__multiEntryIndex) {
            this.__findMultiEntry.apply(this, args);
        } else {
            this.__findBasic.apply(this, args);
        }
    };

    IDBCursor.prototype.__findBasic = function (key, tx, success, error, recordsToLoad) {
        recordsToLoad = recordsToLoad || 1;

        var me = this;
        var quotedKeyColumnName = idbModules.util.quote(me.__keyColumnName);
        var sql = ["SELECT * FROM", idbModules.util.quote(me.__store.name)];
        var sqlValues = [];
        sql.push("WHERE", quotedKeyColumnName, "NOT NULL");
        if (me.__range && (me.__range.lower !== undefined || me.__range.upper !== undefined )) {
            sql.push("AND");
            if (me.__range.lower !== undefined) {
                sql.push(quotedKeyColumnName, (me.__range.lowerOpen ? ">" : ">="), "?");
                sqlValues.push(me.__range.__lower);
            }
            (me.__range.lower !== undefined && me.__range.upper !== undefined) && sql.push("AND");
            if (me.__range.upper !== undefined) {
                sql.push(quotedKeyColumnName, (me.__range.upperOpen ? "<" : "<="), "?");
                sqlValues.push(me.__range.__upper);
            }
        }
        if (typeof key !== "undefined") {
            me.__lastKeyContinued = key;
            me.__offset = 0;
        }
        if (me.__lastKeyContinued !== undefined) {
            sql.push("AND", quotedKeyColumnName, ">= ?");
            idbModules.Key.validate(me.__lastKeyContinued);
            sqlValues.push(idbModules.Key.encode(me.__lastKeyContinued));
        }

        // Determine the ORDER BY direction based on the cursor.
        var direction = me.direction === 'prev' || me.direction === 'prevunique' ? 'DESC' : 'ASC';

        sql.push("ORDER BY", quotedKeyColumnName, direction);
        sql.push("LIMIT", recordsToLoad, "OFFSET", me.__offset);
        sql = sql.join(" ");
        idbModules.DEBUG && console.log(sql, sqlValues);

        me.__prefetchedData = null;
        me.__prefetchedIndex = 0;
        tx.executeSql(sql, sqlValues, function (tx, data) {
            if (data.rows.length > 1) {
                me.__prefetchedData = data.rows;
                me.__prefetchedIndex = 0;
                idbModules.DEBUG && console.log("Preloaded " + me.__prefetchedData.length + " records for cursor");
                me.__decode(data.rows.item(0), success);
            }
            else if (data.rows.length === 1) {
                me.__decode(data.rows.item(0), success);
            }
            else {
                idbModules.DEBUG && console.log("Reached end of cursors");
                success(undefined, undefined, undefined);
            }
        }, function (tx, err) {
            idbModules.DEBUG && console.log("Could not execute Cursor.continue", sql, sqlValues);
            error(err);
        });
    };

    IDBCursor.prototype.__findMultiEntry = function (key, tx, success, error, recordsToLoad) {
        recordsToLoad = recordsToLoad || 1;

        if (this.__multiEntryOffset && this.__multiEntryOffset < recordsToLoad) {
            idbModules.DEBUG && console.log("Reached end of cursors");
            success(undefined, undefined, undefined);
            return;
        }

        var me = this;
        var quotedKeyColumnName = idbModules.util.quote(me.__keyColumnName);
        var sql = ["SELECT * FROM", idbModules.util.quote(me.__store.name)];
        var sqlValues = [];
        sql.push("WHERE", quotedKeyColumnName, "NOT NULL");
        if (me.__range && (me.__range.lower !== undefined && me.__range.upper !== undefined)) {
            if (me.__range.upper.indexOf(me.__range.lower) === 0) {
                sql.push("AND", quotedKeyColumnName, "LIKE ?");
                sqlValues.push("%" + me.__range.__lower.slice(0, -1) + "%");
            }
        }
        if (typeof key !== "undefined") {
            me.__lastKeyContinued = key;
            me.__offset = 0;
        }
        if (me.__lastKeyContinued !== undefined) {
            sql.push("AND", quotedKeyColumnName, ">= ?");
            idbModules.Key.validate(me.__lastKeyContinued);
            sqlValues.push(idbModules.Key.encode(me.__lastKeyContinued));
        }

        // Determine the ORDER BY direction based on the cursor.
        var direction = me.direction === 'prev' || me.direction === 'prevunique' ? 'DESC' : 'ASC';

        sql.push("ORDER BY key", direction);
        sql.push("LIMIT", recordsToLoad, "OFFSET", me.__multiEntryOffset || 0);
        sql = sql.join(" ");
        idbModules.DEBUG && console.log(sql, sqlValues);

        me.__prefetchedData = null;
        me.__prefetchedIndex = 0;
        tx.executeSql(sql, sqlValues, function (tx, data) {
            me.__multiEntryOffset = data.rows.length;

            if (data.rows.length > 0) {
                var rows = [];

                for (var i = 0; i < data.rows.length; i++) {
                    var rowItem = data.rows.item(i);
                    var matches = idbModules.Key.findMultiEntryMatches(idbModules.Key.decode(rowItem[me.__keyColumnName], true), me.__range);

                    for (var j = 0; j < matches.length; j++) {
                        var matchingKey = matches[j];
                        var clone = {
                            matchingKey: idbModules.Key.encode(matchingKey, true),
                            key: rowItem.key
                        };
                        clone[me.__keyColumnName] = rowItem[me.__keyColumnName];
                        clone[me.__valueColumnName] = rowItem[me.__valueColumnName];
                        rows.push(clone);
                    }
                }

                var reverse = me.direction.indexOf("prev") === 0;
                rows.sort(function (a, b) {
                    if (a.matchingKey.replace('[','z') < b.matchingKey.replace('[','z')) {
                        return reverse ? 1 : -1;
                    }
                    if (a.matchingKey.replace('[','z') > b.matchingKey.replace('[','z')) {
                        return reverse ? -1 : 1;
                    }
                    if (a.key < b.key) {
                        return me.direction === "prev" ? 1 : -1;
                    }
                    if (a.key > b.key) {
                        return me.direction === "prev" ? -1 : 1;
                    }
                    return 0;
                });

                if (rows.length > 1) {
                    me.__prefetchedData = {
                        data: rows,
                        length: rows.length,
                        item: function (index) {
                            return this.data[index];
                        }
                    };
                    me.__prefetchedIndex = 0;

                    idbModules.DEBUG && console.log("Preloaded " + me.__prefetchedData.length + " records for cursor");
                    me.__decode(rows[0], success);
                } else if (rows.length === 1) {
                    me.__decode(rows[0], success);
                } else {
                    idbModules.DEBUG && console.log("Reached end of cursors");
                    success(undefined, undefined, undefined);
                }
            }
            else {
                idbModules.DEBUG && console.log("Reached end of cursors");
                success(undefined, undefined, undefined);
            }
        }, function (tx, err) {
            idbModules.DEBUG && console.log("Could not execute Cursor.continue", sql, sqlValues);
            error(err);
        });
    };

    /**
     * Creates an "onsuccess" callback
     * @private
     */
    IDBCursor.prototype.__onsuccess = function(success) {
        var me = this;
        return function(key, value, primaryKey) {
            me.key = key === undefined ? null : key;
            me.value = value === undefined ? null : value;
            me.primaryKey = primaryKey === undefined ? null : primaryKey;
            success(key === undefined ? null : me, me.__req);
        };
    };

    IDBCursor.prototype.__decode = function (rowItem, callback) {
        if (this.__multiEntryIndex && this.__unique) {
            if (!this.__matchedKeys) {
                this.__matchedKeys = {};
            }
            if (this.__matchedKeys[rowItem.matchingKey]) {
                callback(undefined, undefined, undefined);
                return;
            }
            this.__matchedKeys[rowItem.matchingKey] = true;
        }
        var key = idbModules.Key.decode(this.__multiEntryIndex ? rowItem.matchingKey : rowItem[this.__keyColumnName], this.__multiEntryIndex);
        var val = this.__valueDecoder.decode(rowItem[this.__valueColumnName]);
        var primaryKey = idbModules.Key.decode(rowItem.key);
        callback(key, val, primaryKey);
    };

    IDBCursor.prototype["continue"] = function (key) {
        var recordsToPreloadOnContinue = idbModules.cursorPreloadPackSize || 100;
        var me = this;

        this.__store.transaction.__pushToQueue(me.__req, function cursorContinue(tx, args, success, error) {
            me.__offset++;

            if (me.__prefetchedData) {
                // We have pre-loaded data for the cursor
                me.__prefetchedIndex++;
                if (me.__prefetchedIndex < me.__prefetchedData.length) {
                    me.__decode(me.__prefetchedData.item(me.__prefetchedIndex), me.__onsuccess(success));
                    return;
                }
            }

            // No pre-fetched data, do query
            me.__find(key, tx, me.__onsuccess(success), error, recordsToPreloadOnContinue);
        });
    };

    IDBCursor.prototype.advance = function(count){
        if (count <= 0) {
            throw idbModules.util.createDOMException("Type Error", "Count is invalid - 0 or negative", count);
        }
        var me = this;
        this.__store.transaction.__pushToQueue(me.__req, function cursorAdvance(tx, args, success, error){
            me.__offset += count;
            me.__find(undefined, tx, me.__onsuccess(success), error);
        });
    };

    IDBCursor.prototype.update = function(valueToUpdate){
        var me = this;
        me.__store.transaction.__assertWritable();
        return me.__store.transaction.__addToTransactionQueue(function cursorUpdate(tx, args, success, error){
            idbModules.Sca.encode(valueToUpdate, function(encoded) {
                me.__find(undefined, tx, function(key, value, primaryKey){
                    var store = me.__store;
                    var params = [encoded];
                    var sql = ["UPDATE", idbModules.util.quote(store.name), "SET value = ?"];
                    idbModules.Key.validate(primaryKey);

                    // Also correct the indexes in the table
                    for (var i = 0; i < store.indexNames.length; i++) {
                        var index = store.__indexes[store.indexNames[i]];
                        var indexKey = idbModules.Key.getValue(valueToUpdate, index.keyPath);
                        sql.push(",", idbModules.util.quote(index.name), "= ?");
                        params.push(idbModules.Key.encode(indexKey, index.multiEntry));
                    }

                    sql.push("WHERE key = ?");
                    params.push(idbModules.Key.encode(primaryKey));

                    idbModules.DEBUG && console.log(sql.join(" "), encoded, key, primaryKey);
                    tx.executeSql(sql.join(" "), params, function(tx, data){
                        me.__prefetchedData = null;
                        me.__prefetchedIndex = 0;
                        if (data.rowsAffected === 1) {
                            success(key);
                        }
                        else {
                            error("No rows with key found" + key);
                        }
                    }, function(tx, data){
                        error(data);
                    });
                }, error);
            });
        });
    };

    IDBCursor.prototype["delete"] = function(){
        var me = this;
        me.__store.transaction.__assertWritable();
        return this.__store.transaction.__addToTransactionQueue(function cursorDelete(tx, args, success, error){
            me.__find(undefined, tx, function(key, value, primaryKey){
                var sql = "DELETE FROM  " + idbModules.util.quote(me.__store.name) + " WHERE key = ?";
                idbModules.DEBUG && console.log(sql, key, primaryKey);
                idbModules.Key.validate(primaryKey);
                tx.executeSql(sql, [idbModules.Key.encode(primaryKey)], function(tx, data){
                    me.__prefetchedData = null;
                    me.__prefetchedIndex = 0;
                    if (data.rowsAffected === 1) {
                        // lower the offset or we will miss a row
                        me.__offset--;
                        success(undefined);
                    }
                    else {
                        error("No rows with key found" + key);
                    }
                }, function(tx, data){
                    error(data);
                });
            }, error);
        });
    };

    idbModules.IDBCursor = IDBCursor;
}(idbModules));

(function(idbModules, undefined) {
    'use strict';

    /**
     * IDB Index
     * http://www.w3.org/TR/IndexedDB/#idl-def-IDBIndex
     * @param {IDBObjectStore} store
     * @param {IDBIndexProperties} indexProperties
     * @constructor
     */
    function IDBIndex(store, indexProperties) {
        this.objectStore = store;
        this.name = indexProperties.columnName;
        this.keyPath = indexProperties.keyPath;
        this.multiEntry = indexProperties.optionalParams && indexProperties.optionalParams.multiEntry;
        this.unique = indexProperties.optionalParams && indexProperties.optionalParams.unique;
        this.__deleted = !!indexProperties.__deleted;
    }

    /**
     * Clones an IDBIndex instance for a different IDBObjectStore instance.
     * @param {IDBIndex} index
     * @param {IDBObjectStore} store
     * @protected
     */
    IDBIndex.__clone = function(index, store) {
        return new IDBIndex(store, {
            columnName: index.name,
            keyPath: index.keyPath,
            optionalParams: {
                multiEntry: index.multiEntry,
                unique: index.unique
            }
        });
    };

    /**
     * Creates a new index on an object store.
     * @param {IDBObjectStore} store
     * @param {IDBIndex} index
     * @returns {IDBIndex}
     * @protected
     */
    IDBIndex.__createIndex = function(store, index) {
        var columnExists = !!store.__indexes[index.name] && store.__indexes[index.name].__deleted;

        // Add the index to the IDBObjectStore
        store.__indexes[index.name] = index;
        store.indexNames.push(index.name);

        // Create the index in WebSQL
        var transaction = store.transaction;
        transaction.__addToTransactionQueue(function createIndex(tx, args, success, failure) {
            function error(tx, err) {
                failure(idbModules.util.createDOMException(0, "Could not create index \"" + index.name + "\"", err));
            }

            function applyIndex(tx) {
                // Update the object store's index list
                IDBIndex.__updateIndexList(store, tx, function() {
                    // Add index entries for all existing records
                    tx.executeSql("SELECT * FROM " + idbModules.util.quote(store.name), [], function(tx, data) {
                        idbModules.DEBUG && console.log("Adding existing " + store.name + " records to the " + index.name + " index");
                        addIndexEntry(0);

                        function addIndexEntry(i) {
                            if (i < data.rows.length) {
                                try {
                                    var value = idbModules.Sca.decode(data.rows.item(i).value);
                                    var indexKey = idbModules.Key.getValue(value, index.keyPath);
                                    indexKey = idbModules.Key.encode(indexKey, index.multiEntry);

                                    tx.executeSql("UPDATE " + idbModules.util.quote(store.name) + " set " + idbModules.util.quote(index.name) + " = ? where key = ?", [indexKey, data.rows.item(i).key], function(tx, data) {
                                        addIndexEntry(i + 1);
                                    }, error);
                                }
                                catch (e) {
                                    // Not a valid value to insert into index, so just continue
                                    addIndexEntry(i + 1);
                                }
                            }
                            else {
                                success(store);
                            }
                        }
                    }, error);
                }, error);
            }

            if (columnExists) {
                // For a previously existing index, just update the index entries in the existing column
                applyIndex(tx);
            }
            else {
                // For a new index, add a new column to the object store, then apply the index
                var sql = ["ALTER TABLE", idbModules.util.quote(store.name), "ADD", idbModules.util.quote(index.name), "BLOB"].join(" ");
                idbModules.DEBUG && console.log(sql);
                tx.executeSql(sql, [], applyIndex, error);
            }
        });
    };

    /**
     * Deletes an index from an object store.
     * @param {IDBObjectStore} store
     * @param {IDBIndex} index
     * @protected
     */
    IDBIndex.__deleteIndex = function(store, index) {
        // Remove the index from the IDBObjectStore
        store.__indexes[index.name].__deleted = true;
        store.indexNames.splice(store.indexNames.indexOf(index.name), 1);

        // Remove the index in WebSQL
        var transaction = store.transaction;
        transaction.__addToTransactionQueue(function createIndex(tx, args, success, failure) {
            function error(tx, err) {
                failure(idbModules.util.createDOMException(0, "Could not delete index \"" + index.name + "\"", err));
            }

            // Update the object store's index list
            IDBIndex.__updateIndexList(store, tx, success, error);
        });
    };

    /**
     * Updates index list for the given object store.
     * @param {IDBObjectStore} store
     * @param {object} tx
     * @param {function} success
     * @param {function} failure
     */
    IDBIndex.__updateIndexList = function(store, tx, success, failure) {
        var indexList = {};
        for (var i = 0; i < store.indexNames.length; i++) {
            var idx = store.__indexes[store.indexNames[i]];
            /** @type {IDBIndexProperties} **/
            indexList[idx.name] = {
                columnName: idx.name,
                keyPath: idx.keyPath,
                optionalParams: {
                    unique: idx.unique,
                    multiEntry: idx.multiEntry
                },
                deleted: !!idx.deleted
            };
        }

        idbModules.DEBUG && console.log("Updating the index list for " + store.name, indexList);
        tx.executeSql("UPDATE __sys__ set indexList = ? where name = ?", [JSON.stringify(indexList), store.name], function() {
            success(store);
        }, failure);
    };

    /**
     * Retrieves index data for the given key
     * @param {*|IDBKeyRange} key
     * @param {string} opType
     * @returns {IDBRequest}
     * @private
     */
    IDBIndex.prototype.__fetchIndexData = function(key, opType) {
        var me = this;
        var hasKey, encodedKey;

        // key is optional
        if (arguments.length === 1) {
            opType = key;
            hasKey = false;
        }
        else {
            idbModules.Key.validate(key);
            encodedKey = idbModules.Key.encode(key, me.multiEntry);
            hasKey = true;
        }

        return me.objectStore.transaction.__addToTransactionQueue(function fetchIndexData(tx, args, success, error) {
            var sql = ["SELECT * FROM", idbModules.util.quote(me.objectStore.name), "WHERE", idbModules.util.quote(me.name), "NOT NULL"];
            var sqlValues = [];
            if (hasKey) {
                if (me.multiEntry) {
                    sql.push("AND", idbModules.util.quote(me.name), "LIKE ?");
                    sqlValues.push("%" + encodedKey + "%");
                }
                else {
                    sql.push("AND", idbModules.util.quote(me.name), "= ?");
                    sqlValues.push(encodedKey);
                }
            }
            idbModules.DEBUG && console.log("Trying to fetch data for Index", sql.join(" "), sqlValues);
            tx.executeSql(sql.join(" "), sqlValues, function(tx, data) {
                var recordCount = 0, record = null;
                if (me.multiEntry) {
                    for (var i = 0; i < data.rows.length; i++) {
                        var row = data.rows.item(i);
                        var rowKey = idbModules.Key.decode(row[me.name]);
                        if (hasKey && idbModules.Key.isMultiEntryMatch(encodedKey, row[me.name])) {
                            recordCount++;
                            record = record || row;
                        }
                        else if (!hasKey && rowKey !== undefined) {
                            recordCount = recordCount + (rowKey instanceof Array ? rowKey.length : 1);
                            record = record || row;
                        }
                    }
                }
                else {
                    recordCount = data.rows.length;
                    record = recordCount && data.rows.item(0);
                }

                if (opType === "count") {
                    success(recordCount);
                }
                else if (recordCount === 0) {
                    success(undefined);
                }
                else if (opType === "key") {
                    success(idbModules.Key.decode(record.key));
                }
                else { // when opType is value
                    success(idbModules.Sca.decode(record.value));
                }
            }, error);
        });
    };

    /**
     * Opens a cursor over the given key range.
     * @param {IDBKeyRange} range
     * @param {string} direction
     * @returns {IDBRequest}
     */
    IDBIndex.prototype.openCursor = function(range, direction) {
        return new idbModules.IDBCursor(range, direction, this.objectStore, this, this.name, "value").__req;
    };

    /**
     * Opens a cursor over the given key range.  The cursor only includes key values, not data.
     * @param {IDBKeyRange} range
     * @param {string} direction
     * @returns {IDBRequest}
     */
    IDBIndex.prototype.openKeyCursor = function(range, direction) {
        return new idbModules.IDBCursor(range, direction, this.objectStore, this, this.name, "key").__req;
    };

    IDBIndex.prototype.get = function(key) {
        if (arguments.length === 0) {
            throw new TypeError("No key was specified");
        }

        return this.__fetchIndexData(key, "value");
    };

    IDBIndex.prototype.getKey = function(key) {
        if (arguments.length === 0) {
            throw new TypeError("No key was specified");
        }

        return this.__fetchIndexData(key, "key");
    };

    IDBIndex.prototype.count = function(key) {
        // key is optional
        if (arguments.length === 0) {
            return this.__fetchIndexData("count");
        }
        else {
            return this.__fetchIndexData(key, "count");
        }
    };

    idbModules.IDBIndex = IDBIndex;
}(idbModules));

(function(idbModules) {
    'use strict';

    /**
     * IndexedDB Object Store
     * http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBObjectStore
     * @param {IDBObjectStoreProperties} storeProperties
     * @param {IDBTransaction} transaction
     * @constructor
     */
    function IDBObjectStore(storeProperties, transaction) {
        this.name = storeProperties.name;
        this.keyPath = JSON.parse(storeProperties.keyPath);
        this.transaction = transaction;

        // autoInc is numeric (0/1) on WinPhone
        this.autoIncrement = typeof storeProperties.autoInc === "string" ? storeProperties.autoInc === "true" : !!storeProperties.autoInc;

        this.__indexes = {};
        this.indexNames = new idbModules.util.StringList();
        var indexList = JSON.parse(storeProperties.indexList);
        for (var indexName in indexList) {
            if (indexList.hasOwnProperty(indexName)) {
                var index = new idbModules.IDBIndex(this, indexList[indexName]);
                this.__indexes[index.name] = index;
                if (!index.__deleted) {
                    this.indexNames.push(index.name);
                }
            }
        }
    }

    /**
     * Clones an IDBObjectStore instance for a different IDBTransaction instance.
     * @param {IDBObjectStore} store
     * @param {IDBTransaction} transaction
     * @protected
     */
    IDBObjectStore.__clone = function(store, transaction) {
        var newStore = new IDBObjectStore({
            name: store.name,
            keyPath: JSON.stringify(store.keyPath),
            autoInc: JSON.stringify(store.autoIncrement),
            indexList: "{}"
        }, transaction);
        newStore.__indexes = store.__indexes;
        newStore.indexNames = store.indexNames;
        return newStore;
    };

    /**
     * Creates a new object store in the database.
     * @param {IDBDatabase} db
     * @param {IDBObjectStore} store
     * @protected
     */
    IDBObjectStore.__createObjectStore = function(db, store) {
        // Add the object store to the IDBDatabase
        db.__objectStores[store.name] = store;
        db.objectStoreNames.push(store.name);

        // Add the object store to WebSQL
        var transaction = db.__versionTransaction;
        idbModules.IDBTransaction.__assertVersionChange(transaction);
        transaction.__addToTransactionQueue(function createObjectStore(tx, args, success, failure) {
            function error(tx, err) {
                throw idbModules.util.createDOMException(0, "Could not create object store \"" + store.name + "\"", err);
            }

            //key INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE
            var sql = ["CREATE TABLE", idbModules.util.quote(store.name), "(key BLOB", store.autoIncrement ? "UNIQUE, inc INTEGER PRIMARY KEY AUTOINCREMENT" : "PRIMARY KEY", ", value BLOB)"].join(" ");
            idbModules.DEBUG && console.log(sql);
            tx.executeSql(sql, [], function(tx, data) {
                tx.executeSql("INSERT INTO __sys__ VALUES (?,?,?,?)", [store.name, JSON.stringify(store.keyPath), store.autoIncrement, "{}"], function() {
                    success(store);
                }, error);
            }, error);
        });
    };

    /**
     * Deletes an object store from the database.
     * @param {IDBDatabase} db
     * @param {IDBObjectStore} store
     * @protected
     */
    IDBObjectStore.__deleteObjectStore = function(db, store) {
        // Remove the object store from the IDBDatabase
        db.__objectStores[store.name] = undefined;
        db.objectStoreNames.splice(db.objectStoreNames.indexOf(store.name), 1);

        // Remove the object store from WebSQL
        var transaction = db.__versionTransaction;
        idbModules.IDBTransaction.__assertVersionChange(transaction);
        transaction.__addToTransactionQueue(function deleteObjectStore(tx, args, success, failure) {
            function error(tx, err) {
                failure(idbModules.util.createDOMException(0, "Could not delete ObjectStore", err));
            }

            tx.executeSql("SELECT * FROM __sys__ where name = ?", [store.name], function(tx, data) {
                if (data.rows.length > 0) {
                    tx.executeSql("DROP TABLE " + idbModules.util.quote(store.name), [], function() {
                        tx.executeSql("DELETE FROM __sys__ WHERE name = ?", [store.name], function() {
                            success();
                        }, error);
                    }, error);
                }
            });
        });
    };

    /**
     * Determines whether the given inline or out-of-line key is valid, according to the object store's schema.
     * @param {*} value     Used for inline keys
     * @param {*} key       Used for out-of-line keys
     * @private
     */
    IDBObjectStore.prototype.__validateKey = function(value, key) {
        if (this.keyPath) {
            if (typeof key !== "undefined") {
                throw idbModules.util.createDOMException("DataError", "The object store uses in-line keys and the key parameter was provided", this);
            }
            else if (value && typeof value === "object") {
                key = idbModules.Key.getValue(value, this.keyPath);
                if (key === undefined) {
                    if (this.autoIncrement) {
                        // A key will be generated
                        return;
                    }
                    else {
                        throw idbModules.util.createDOMException("DataError", "Could not eval key from keyPath");
                    }
                }
            }
            else {
                throw idbModules.util.createDOMException("DataError", "KeyPath was specified, but value was not an object");
            }
        }
        else {
            if (typeof key === "undefined") {
                if (this.autoIncrement) {
                    // A key will be generated
                    return;
                }
                else {
                    throw idbModules.util.createDOMException("DataError", "The object store uses out-of-line keys and has no key generator and the key parameter was not provided. ", this);
                }
            }
        }

        idbModules.Key.validate(key);
    };

    /**
     * From the store properties and object, extracts the value for the key in hte object Store
     * If the table has auto increment, get the next in sequence
     * @param {Object} tx
     * @param {Object} value
     * @param {Object} key
     * @param {function} success
     * @param {function} failure
     */
    IDBObjectStore.prototype.__deriveKey = function(tx, value, key, success, failure) {
        var me = this;

        function getNextAutoIncKey(callback) {
            tx.executeSql("SELECT * FROM sqlite_sequence where name like ?", [me.name], function(tx, data) {
                if (data.rows.length !== 1) {
                    callback(1);
                }
                else {
                    callback(data.rows.item(0).seq + 1);
                }
            }, function(tx, error) {
                failure(idbModules.util.createDOMException("DataError", "Could not get the auto increment value for key", error));
            });
        }

        if (me.keyPath) {
            var primaryKey = idbModules.Key.getValue(value, me.keyPath);
            if (primaryKey === undefined && me.autoIncrement) {
                getNextAutoIncKey(function(primaryKey) {
                    try {
                        // Update the value with the new key
                        idbModules.Key.setValue(value, me.keyPath, primaryKey);
                        success(primaryKey);
                    }
                    catch (e) {
                        failure(idbModules.util.createDOMException("DataError", "Could not assign a generated value to the keyPath", e));
                    }
                });
            }
            else {
                success(primaryKey);
            }
        }
        else {
            if (typeof key === "undefined" && me.autoIncrement) {
                // Looks like this has autoInc, so lets get the next in sequence and return that.
                getNextAutoIncKey(success);
            }
            else {
                success(key);
            }
        }
    };

    IDBObjectStore.prototype.__insertData = function(tx, encoded, value, primaryKey, success, error) {
        try {
            var paramMap = {};
            if (typeof primaryKey !== "undefined") {
                idbModules.Key.validate(primaryKey);
                paramMap.key = idbModules.Key.encode(primaryKey);
            }
            for (var i = 0; i < this.indexNames.length; i++) {
                var index = this.__indexes[this.indexNames[i]];
                paramMap[index.name] = idbModules.Key.encode(idbModules.Key.getValue(value, index.keyPath), index.multiEntry);
            }
            var sqlStart = ["INSERT INTO ", idbModules.util.quote(this.name), "("];
            var sqlEnd = [" VALUES ("];
            var sqlValues = [];
            for (var key in paramMap) {
                sqlStart.push(idbModules.util.quote(key) + ",");
                sqlEnd.push("?,");
                sqlValues.push(paramMap[key]);
            }
            // removing the trailing comma
            sqlStart.push("value )");
            sqlEnd.push("?)");
            sqlValues.push(encoded);

            var sql = sqlStart.join(" ") + sqlEnd.join(" ");

            idbModules.DEBUG && console.log("SQL for adding", sql, sqlValues);
            tx.executeSql(sql, sqlValues, function(tx, data) {
                idbModules.Sca.encode(primaryKey, function(primaryKey) {
                    primaryKey = idbModules.Sca.decode(primaryKey);
                    success(primaryKey);
                });
            }, function(tx, err) {
                error(idbModules.util.createDOMError("ConstraintError", err.message, err));
            });
        }
        catch (e) {
            error(e);
        }
    };

    IDBObjectStore.prototype.add = function(value, key) {
        var me = this;
        if (arguments.length === 0) {
            throw new TypeError("No value was specified");
        }
        this.__validateKey(value, key);
        me.transaction.__assertWritable();

        var request = me.transaction.__createRequest();
        me.transaction.__pushToQueue(request, function objectStoreAdd(tx, args, success, error) {
            me.__deriveKey(tx, value, key, function(primaryKey) {
                idbModules.Sca.encode(value, function(encoded) {
                    me.__insertData(tx, encoded, value, primaryKey, success, error);
                });
            }, error);
        });
        return request;
    };

    IDBObjectStore.prototype.put = function(value, key) {
        var me = this;
        if (arguments.length === 0) {
            throw new TypeError("No value was specified");
        }
        this.__validateKey(value, key);
        me.transaction.__assertWritable();

        var request = me.transaction.__createRequest();
        me.transaction.__pushToQueue(request, function objectStorePut(tx, args, success, error) {
            me.__deriveKey(tx, value, key, function(primaryKey) {
                idbModules.Sca.encode(value, function(encoded) {
                    // First try to delete if the record exists
                    idbModules.Key.validate(primaryKey);
                    var sql = "DELETE FROM " + idbModules.util.quote(me.name) + " where key = ?";
                    tx.executeSql(sql, [idbModules.Key.encode(primaryKey)], function(tx, data) {
                        idbModules.DEBUG && console.log("Did the row with the", primaryKey, "exist? ", data.rowsAffected);
                        me.__insertData(tx, encoded, value, primaryKey, success, error);
                    }, function(tx, err) {
                        error(err);
                    });
                });
            }, error);
        });
        return request;
    };

    IDBObjectStore.prototype.get = function(key) {
        // TODO Key should also be a key range
        var me = this;

        if (arguments.length === 0) {
            throw new TypeError("No key was specified");
        }

        idbModules.Key.validate(key);
        var primaryKey = idbModules.Key.encode(key);
        return me.transaction.__addToTransactionQueue(function objectStoreGet(tx, args, success, error) {
            idbModules.DEBUG && console.log("Fetching", me.name, primaryKey);
            tx.executeSql("SELECT * FROM " + idbModules.util.quote(me.name) + " where key = ?", [primaryKey], function(tx, data) {
                idbModules.DEBUG && console.log("Fetched data", data);
                var value;
                try {
                    // Opera can't deal with the try-catch here.
                    if (0 === data.rows.length) {
                        return success();
                    }

                    value = idbModules.Sca.decode(data.rows.item(0).value);
                }
                catch (e) {
                    // If no result is returned, or error occurs when parsing JSON
                    idbModules.DEBUG && console.log(e);
                }
                success(value);
            }, function(tx, err) {
                error(err);
            });
        });
    };

    IDBObjectStore.prototype["delete"] = function(key) {
        var me = this;

        if (arguments.length === 0) {
            throw new TypeError("No key was specified");
        }

        me.transaction.__assertWritable();
        idbModules.Key.validate(key);
        var primaryKey = idbModules.Key.encode(key);
        // TODO key should also support key ranges
        return me.transaction.__addToTransactionQueue(function objectStoreDelete(tx, args, success, error) {
            idbModules.DEBUG && console.log("Fetching", me.name, primaryKey);
            tx.executeSql("DELETE FROM " + idbModules.util.quote(me.name) + " where key = ?", [primaryKey], function(tx, data) {
                idbModules.DEBUG && console.log("Deleted from database", data.rowsAffected);
                success();
            }, function(tx, err) {
                error(err);
            });
        });
    };

    IDBObjectStore.prototype.clear = function() {
        var me = this;
        me.transaction.__assertWritable();
        return me.transaction.__addToTransactionQueue(function objectStoreClear(tx, args, success, error) {
            tx.executeSql("DELETE FROM " + idbModules.util.quote(me.name), [], function(tx, data) {
                idbModules.DEBUG && console.log("Cleared all records from database", data.rowsAffected);
                success();
            }, function(tx, err) {
                error(err);
            });
        });
    };

    IDBObjectStore.prototype.count = function(key) {
        var me = this;
        var hasKey = false;

        // key is optional
        if (arguments.length > 0) {
            hasKey = true;
            idbModules.Key.validate(key);
        }

        return me.transaction.__addToTransactionQueue(function objectStoreCount(tx, args, success, error) {
            var sql = "SELECT * FROM " + idbModules.util.quote(me.name) + (hasKey ? " WHERE key = ?" : "");
            var sqlValues = [];
            hasKey && sqlValues.push(idbModules.Key.encode(key));
            tx.executeSql(sql, sqlValues, function(tx, data) {
                success(data.rows.length);
            }, function(tx, err) {
                error(err);
            });
        });
    };

    IDBObjectStore.prototype.openCursor = function(range, direction) {
        return new idbModules.IDBCursor(range, direction, this, this, "key", "value").__req;
    };

    IDBObjectStore.prototype.index = function(indexName) {
        if (arguments.length === 0) {
            throw new TypeError("No index name was specified");
        }
        var index = this.__indexes[indexName];
        if (!index) {
            throw idbModules.util.createDOMException("NotFoundError", "Index \"" + indexName + "\" does not exist on " + this.name);
        }

        return idbModules.IDBIndex.__clone(index, this);
    };

    /**
     * Creates a new index on the object store.
     * @param {string} indexName
     * @param {string} keyPath
     * @param {object} optionalParameters
     * @returns {IDBIndex}
     */
    IDBObjectStore.prototype.createIndex = function(indexName, keyPath, optionalParameters) {
        if (arguments.length === 0) {
            throw new TypeError("No index name was specified");
        }
        if (arguments.length === 1) {
            throw new TypeError("No key path was specified");
        }
        if (keyPath instanceof Array && optionalParameters && optionalParameters.multiEntry) {
            throw idbModules.util.createDOMException("InvalidAccessError", "The keyPath argument was an array and the multiEntry option is true.");
        }
        if (this.__indexes[indexName] && !this.__indexes[indexName].__deleted) {
            throw idbModules.util.createDOMException("ConstraintError", "Index \"" + indexName + "\" already exists on " + this.name);
        }

        this.transaction.__assertVersionChange();

        optionalParameters = optionalParameters || {};
        /** @name IDBIndexProperties **/
        var indexProperties = {
            columnName: indexName,
            keyPath: keyPath,
            optionalParams: {
                unique: !!optionalParameters.unique,
                multiEntry: !!optionalParameters.multiEntry
            }
        };
        var index = new idbModules.IDBIndex(this, indexProperties);
        idbModules.IDBIndex.__createIndex(this, index);
        return index;
    };

    IDBObjectStore.prototype.deleteIndex = function(indexName) {
        if (arguments.length === 0) {
            throw new TypeError("No index name was specified");
        }
        var index = this.__indexes[indexName];
        if (!index) {
            throw idbModules.util.createDOMException("NotFoundError", "Index \"" + indexName + "\" does not exist on " + this.name);
        }
        this.transaction.__assertVersionChange();

        idbModules.IDBIndex.__deleteIndex(this, index);
    };

    idbModules.IDBObjectStore = IDBObjectStore;
}(idbModules));

(function(idbModules) {
    'use strict';

    var uniqueID = 0;

    /**
     * The IndexedDB Transaction
     * http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBTransaction
     * @param {IDBDatabase} db
     * @param {string[]} storeNames
     * @param {string} mode
     * @constructor
     */
    function IDBTransaction(db, storeNames, mode) {
        this.__id = ++uniqueID; // for debugging simultaneous transactions
        this.__active = true;
        this.__running = false;
        this.__requests = [];
        this.__storeNames = storeNames;
        this.mode = mode;
        this.db = db;
        this.error = null;
        this.onabort = this.onerror = this.oncomplete = null;

        // Kick off the transaction as soon as all synchronous code is done.
        var me = this;
        setTimeout(function() { me.__executeRequests(); }, 0);
    }

    IDBTransaction.prototype.__executeRequests = function() {
        if (this.__running) {
            idbModules.DEBUG && console.log("Looks like the request set is already running", this.mode);
            return;
        }

        this.__running = true;
        var me = this;

        me.db.__db.transaction(function executeRequests(tx) {
                me.__tx = tx;
                var q = null, i = 0;

                function success(result, req) {
                    if (req) {
                        q.req = req;// Need to do this in case of cursors
                    }
                    q.req.readyState = "done";
                    q.req.result = result;
                    delete q.req.error;
                    var e = idbModules.util.createEvent("success");
                    idbModules.util.callback("onsuccess", q.req, e);
                    i++;
                    executeNextRequest();
                }

                function error(tx, err) {
                    err = idbModules.util.findError(arguments);
                    try {
                        // Fire an error event for the current IDBRequest
                        q.req.readyState = "done";
                        q.req.error = err || "DOMError";
                        q.req.result = undefined;
                        var e = idbModules.util.createEvent("error", err);
                        idbModules.util.callback("onerror", q.req, e);
                    }
                    finally {
                        // Fire an error event for the transaction
                        transactionError(err);
                    }
                }

                function executeNextRequest() {
                    if (i >= me.__requests.length) {
                        // All requests in the transaction are done
                        me.__requests = [];
                        if (me.__active) {
                            me.__active = false;
                            transactionFinished();
                        }
                    }
                    else {
                        try {
                            q = me.__requests[i];
                            q.op(tx, q.args, success, error);
                        }
                        catch (e) {
                            error(e);
                        }
                    }
                }

                executeNextRequest();
            },

            transactionError
        );

        function transactionError(err) {
            if (!me.__active) {
                // The transaction has already completed, so we can't call "onerror" or "onabort".
                // So throw the error instead.
                throw err;
            }

            try {
                idbModules.util.logError("Error", "An error occurred in a transaction", err);
                me.error = err;
                var evt = idbModules.util.createEvent("error");
                idbModules.util.callback("onerror", me, evt);
            }
            finally {
                me.abort();
            }
        }

        function transactionFinished() {
            idbModules.DEBUG && console.log("Transaction completed");
            var evt = idbModules.util.createEvent("complete");
            idbModules.util.callback("oncomplete", me, evt);
            idbModules.util.callback("__oncomplete", me, evt);
        }
    };

    /**
     * Creates a new IDBRequest for the transaction.
     * NOTE: The transaction is not queued util you call {@link IDBTransaction#__pushToQueue}
     * @returns {IDBRequest}
     * @protected
     */
    IDBTransaction.prototype.__createRequest = function() {
        var request = new idbModules.IDBRequest();
        request.source = this.db;
        request.transaction = this;
        return request;
    };

    /**
     * Adds a callback function to the transaction queue
     * @param {function} callback
     * @param {*} args
     * @returns {IDBRequest}
     * @protected
     */
    IDBTransaction.prototype.__addToTransactionQueue = function(callback, args) {
        var request = this.__createRequest();
        this.__pushToQueue(request, callback, args);
        return request;
    };

    /**
     * Adds an IDBRequest to the transaction queue
     * @param {IDBRequest} request
     * @param {function} callback
     * @param {*} args
     * @protected
     */
    IDBTransaction.prototype.__pushToQueue = function(request, callback, args) {
        this.__assertActive();
        this.__requests.push({
            "op": callback,
            "args": args,
            "req": request
        });
    };

    IDBTransaction.prototype.__assertActive = function() {
        if (!this.__active) {
            throw idbModules.util.createDOMException("TransactionInactiveError", "A request was placed against a transaction which is currently not active, or which is finished");
        }
    };

    IDBTransaction.prototype.__assertWritable = function() {
        if (this.mode === IDBTransaction.READ_ONLY) {
            throw idbModules.util.createDOMException("ReadOnlyError", "The transaction is read only");
        }
    };

    IDBTransaction.prototype.__assertVersionChange = function() {
        IDBTransaction.__assertVersionChange(this);
    };

    IDBTransaction.__assertVersionChange = function(tx) {
        if (!tx || tx.mode !== IDBTransaction.VERSION_CHANGE) {
            throw idbModules.util.createDOMException("InvalidStateError", "Not a version transaction");
        }
    };

    /**
     * Returns the specified object store.
     * @param {string} objectStoreName
     * @returns {IDBObjectStore}
     */
    IDBTransaction.prototype.objectStore = function(objectStoreName) {
        if (arguments.length === 0) {
            throw new TypeError("No object store name was specified");
        }
        if (!this.__active) {
            throw idbModules.util.createDOMException("InvalidStateError", "A request was placed against a transaction which is currently not active, or which is finished");
        }
        if (this.__storeNames.indexOf(objectStoreName) === -1 && this.mode !== IDBTransaction.VERSION_CHANGE) {
            throw idbModules.util.createDOMException("NotFoundError", objectStoreName + " is not participating in this transaction");
        }
        var store = this.db.__objectStores[objectStoreName];
        if (!store) {
            throw idbModules.util.createDOMException("NotFoundError", objectStoreName + " does not exist in " + this.db.name);
        }

        return idbModules.IDBObjectStore.__clone(store, this);
    };

    IDBTransaction.prototype.abort = function() {
        var me = this;
        idbModules.DEBUG && console.log("The transaction was aborted", me);
        me.__active = false;
        var evt = idbModules.util.createEvent("abort");

        // Fire the "onabort" event asynchronously, so errors don't bubble
        setTimeout(function() {
            idbModules.util.callback("onabort", me, evt);
        }, 0);
    };

    IDBTransaction.READ_ONLY = "readonly";
    IDBTransaction.READ_WRITE = "readwrite";
    IDBTransaction.VERSION_CHANGE = "versionchange";

    idbModules.IDBTransaction = IDBTransaction;
}(idbModules));

(function(idbModules){
    'use strict';

    /**
     * IDB Database Object
     * http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#database-interface
     * @constructor
     */
    function IDBDatabase(db, name, version, storeProperties){
        this.__db = db;
        this.__closed = false;
        this.version = version;
        this.name = name;
        this.onabort = this.onerror = this.onversionchange = null;

        this.__objectStores = {};
        this.objectStoreNames = new idbModules.util.StringList();
        for (var i = 0; i < storeProperties.rows.length; i++) {
            var store = new idbModules.IDBObjectStore(storeProperties.rows.item(i));
            this.__objectStores[store.name] = store;
            this.objectStoreNames.push(store.name);
        }
    }

    /**
     * Creates a new object store.
     * @param {string} storeName
     * @param {object} [createOptions]
     * @returns {IDBObjectStore}
     */
    IDBDatabase.prototype.createObjectStore = function(storeName, createOptions){
        if (arguments.length === 0) {
            throw new TypeError("No object store name was specified");
        }
        if (this.__objectStores[storeName]) {
            throw idbModules.util.createDOMException("ConstraintError", "Object store \"" + storeName + "\" already exists in " + this.name);
        }
        this.__versionTransaction.__assertVersionChange();

        createOptions = createOptions || {};
        /** @name IDBObjectStoreProperties **/
        var storeProperties = {
            name: storeName,
            keyPath: JSON.stringify(createOptions.keyPath || null),
            autoInc: JSON.stringify(createOptions.autoIncrement),
            indexList: "{}"
        };
        var store = new idbModules.IDBObjectStore(storeProperties, this.__versionTransaction);
        idbModules.IDBObjectStore.__createObjectStore(this, store);
        return store;
    };

    /**
     * Deletes an object store.
     * @param {string} storeName
     */
    IDBDatabase.prototype.deleteObjectStore = function(storeName){
        if (arguments.length === 0) {
            throw new TypeError("No object store name was specified");
        }
        var store = this.__objectStores[storeName];
        if (!store) {
            throw idbModules.util.createDOMException("NotFoundError", "Object store \"" + storeName + "\" does not exist in " + this.name);
        }
        this.__versionTransaction.__assertVersionChange();

        idbModules.IDBObjectStore.__deleteObjectStore(this, store);
    };

    IDBDatabase.prototype.close = function(){
        this.__closed = true;
    };

    /**
     * Starts a new transaction.
     * @param {string|string[]} storeNames
     * @param {string} mode
     * @returns {IDBTransaction}
     */
    IDBDatabase.prototype.transaction = function(storeNames, mode){
        if (this.__closed) {
            throw idbModules.util.createDOMException("InvalidStateError", "An attempt was made to start a new transaction on a database connection that is not open");
        }

        if (typeof mode === "number") {
            mode = mode === 1 ? IDBTransaction.READ_WRITE : IDBTransaction.READ_ONLY;
            idbModules.DEBUG && console.log("Mode should be a string, but was specified as ", mode);
        }
        else {
            mode = mode || IDBTransaction.READ_ONLY;
        }

        if (mode !== IDBTransaction.READ_ONLY && mode !== IDBTransaction.READ_WRITE) {
            throw new TypeError("Invalid transaction mode: " + mode);
        }

        storeNames = typeof storeNames === "string" ? [storeNames] : storeNames;
        if (storeNames.length === 0) {
            throw idbModules.util.createDOMException("InvalidAccessError", "No object store names were specified");
        }
        for (var i = 0; i < storeNames.length; i++) {
            if (!this.objectStoreNames.contains(storeNames[i])) {
                throw idbModules.util.createDOMException("NotFoundError", "The \"" + storeNames[i] + "\" object store does not exist");
            }
        }

        var transaction = new idbModules.IDBTransaction(this, storeNames, mode);
        return transaction;
    };
    
    idbModules.IDBDatabase = IDBDatabase;
}(idbModules));

(function(idbModules) {
    'use strict';

    var DEFAULT_DB_SIZE = 4 * 1024 * 1024;
    var sysdb;

    /**
     * Craetes the sysDB to keep track of version numbers for databases
     **/
    function createSysDB(success, failure) {
        function sysDbCreateError(tx, err) {
            err = idbModules.util.findError(arguments);
            idbModules.DEBUG && console.log("Error in sysdb transaction - when creating dbVersions", err);
            failure(err);
        }

        if (sysdb) {
            success();
        }
        else {
            sysdb = window.openDatabase("__sysdb__", 1, "System Database", DEFAULT_DB_SIZE);
            sysdb.transaction(function(tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS dbVersions (name VARCHAR(255), version INT);", [], success, sysDbCreateError);
            }, sysDbCreateError);
        }
    }

    /**
     * IDBFactory Class
     * https://w3c.github.io/IndexedDB/#idl-def-IDBFactory
     * @constructor
     */
    function IDBFactory() {
        this.modules = idbModules;
    }

    /**
     * The IndexedDB Method to create a new database and return the DB
     * @param {string} name
     * @param {number} version
     */
    IDBFactory.prototype.open = function(name, version) {
        var req = new idbModules.IDBOpenDBRequest();
        var calledDbCreateError = false;

        if (arguments.length === 0) {
            throw new TypeError('Database name is required');
        }
        else if (arguments.length === 2) {
            version = parseFloat(version);
            if (isNaN(version) || !isFinite(version) || version <= 0) {
                throw new TypeError('Invalid database version: ' + version);
            }
        }
        name = name + ''; // cast to a string

        function dbCreateError(tx, err) {
            if (calledDbCreateError) {
                return;
            }
            err = idbModules.util.findError(arguments);
            calledDbCreateError = true;
            var evt = idbModules.util.createEvent("error", arguments);
            req.readyState = "done";
            req.error = err || "DOMError";
            idbModules.util.callback("onerror", req, evt);
        }

        function openDB(oldVersion) {
            var db = window.openDatabase(name, 1, name, DEFAULT_DB_SIZE);
            req.readyState = "done";
            if (typeof version === "undefined") {
                version = oldVersion || 1;
            }
            if (version <= 0 || oldVersion > version) {
                var err = idbModules.util.createDOMError("VersionError", "An attempt was made to open a database using a lower version than the existing version.", version);
                dbCreateError(err);
                return;
            }

            db.transaction(function(tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS __sys__ (name VARCHAR(255), keyPath VARCHAR(255), autoInc BOOLEAN, indexList BLOB)", [], function() {
                    tx.executeSql("SELECT * FROM __sys__", [], function(tx, data) {
                        var e = idbModules.util.createEvent("success");
                        req.source = req.result = new idbModules.IDBDatabase(db, name, version, data);
                        if (oldVersion < version) {
                            // DB Upgrade in progress
                            sysdb.transaction(function(systx) {
                                systx.executeSql("UPDATE dbVersions set version = ? where name = ?", [version, name], function() {
                                    var e = idbModules.util.createEvent("upgradeneeded");
                                    e.oldVersion = oldVersion;
                                    e.newVersion = version;
                                    req.transaction = req.result.__versionTransaction = new idbModules.IDBTransaction(req.source, [], idbModules.IDBTransaction.VERSION_CHANGE);
                                    req.transaction.__addToTransactionQueue(function onupgradeneeded(tx, args, success) {
                                        idbModules.util.callback("onupgradeneeded", req, e);
                                        success();
                                    });
                                    req.transaction.__oncomplete = function() {
                                        req.transaction = null;
                                        var e = idbModules.util.createEvent("success");
                                        idbModules.util.callback("onsuccess", req, e);
                                    };
                                }, dbCreateError);
                            }, dbCreateError);
                        } else {
                            idbModules.util.callback("onsuccess", req, e);
                        }
                    }, dbCreateError);
                }, dbCreateError);
            }, dbCreateError);
        }

        createSysDB(function() {
            sysdb.transaction(function(tx) {
                tx.executeSql("SELECT * FROM dbVersions where name = ?", [name], function(tx, data) {
                    if (data.rows.length === 0) {
                        // Database with this name does not exist
                        tx.executeSql("INSERT INTO dbVersions VALUES (?,?)", [name, version || 1], function() {
                            openDB(0);
                        }, dbCreateError);
                    } else {
                        openDB(data.rows.item(0).version);
                    }
                }, dbCreateError);
            }, dbCreateError);
        }, dbCreateError);

        return req;
    };

    /**
     * Deletes a database
     * @param {string} name
     * @returns {IDBOpenDBRequest}
     */
    IDBFactory.prototype.deleteDatabase = function(name) {
        var req = new idbModules.IDBOpenDBRequest();
        var calledDBError = false;
        var version = null;

        if (arguments.length === 0) {
            throw new TypeError('Database name is required');
        }
        name = name + ''; // cast to a string

        function dbError(tx, err) {
            if (calledDBError) {
                return;
            }
            err = idbModules.util.findError(arguments);
            req.readyState = "done";
            req.error = err || "DOMError";
            var e = idbModules.util.createEvent("error");
            e.debug = arguments;
            idbModules.util.callback("onerror", req, e);
            calledDBError = true;
        }

        function deleteFromDbVersions() {
            sysdb.transaction(function(systx) {
                systx.executeSql("DELETE FROM dbVersions where name = ? ", [name], function() {
                    req.result = undefined;
                    var e = idbModules.util.createEvent("success");
                    e.newVersion = null;
                    e.oldVersion = version;
                    idbModules.util.callback("onsuccess", req, e);
                }, dbError);
            }, dbError);
        }

        createSysDB(function() {
            sysdb.transaction(function(systx) {
                systx.executeSql("SELECT * FROM dbVersions where name = ?", [name], function(tx, data) {
                    if (data.rows.length === 0) {
                        req.result = undefined;
                        var e = idbModules.util.createEvent("success");
                        e.newVersion = null;
                        e.oldVersion = version;
                        idbModules.util.callback("onsuccess", req, e);
                        return;
                    }
                    version = data.rows.item(0).version;
                    var db = window.openDatabase(name, 1, name, DEFAULT_DB_SIZE);
                    db.transaction(function(tx) {
                        tx.executeSql("SELECT * FROM __sys__", [], function(tx, data) {
                            var tables = data.rows;
                            (function deleteTables(i) {
                                if (i >= tables.length) {
                                    // If all tables are deleted, delete the housekeeping tables
                                    tx.executeSql("DROP TABLE IF EXISTS __sys__", [], function() {
                                        // Finally, delete the record for this DB from sysdb
                                        deleteFromDbVersions();
                                    }, dbError);
                                } else {
                                    // Delete all tables in this database, maintained in the sys table
                                    tx.executeSql("DROP TABLE " + idbModules.util.quote(tables.item(i).name), [], function() {
                                        deleteTables(i + 1);
                                    }, function() {
                                        deleteTables(i + 1);
                                    });
                                }
                            }(0));
                        }, function(e) {
                            // __sysdb table does not exist, but that does not mean delete did not happen
                            deleteFromDbVersions();
                        });
                    });
                }, dbError);
            }, dbError);
        }, dbError);

        return req;
    };

    /**
     * Compares two keys
     * @param key1
     * @param key2
     * @returns {number}
     */
    IDBFactory.prototype.cmp = function(key1, key2) {
        if (arguments.length < 2) {
            throw new TypeError("You must provide two keys to be compared");
        }

        idbModules.Key.validate(key1);
        idbModules.Key.validate(key2);
        var encodedKey1 = idbModules.Key.encode(key1);
        var encodedKey2 = idbModules.Key.encode(key2);
        var result = encodedKey1 > encodedKey2 ? 1 : encodedKey1 === encodedKey2 ? 0 : -1;
        
        if (idbModules.DEBUG) {
            // verify that the keys encoded correctly
            var decodedKey1 = idbModules.Key.decode(encodedKey1);
            var decodedKey2 = idbModules.Key.decode(encodedKey2);
            if (typeof key1 === "object") {
                key1 = JSON.stringify(key1);
                decodedKey1 = JSON.stringify(decodedKey1);
            }
            if (typeof key2 === "object") {
                key2 = JSON.stringify(key2);
                decodedKey2 = JSON.stringify(decodedKey2);
            }

            // encoding/decoding mismatches are usually due to a loss of floating-point precision
            if (decodedKey1 !== key1) {
                console.warn(key1 + ' was incorrectly encoded as ' + decodedKey1);
            }
            if (decodedKey2 !== key2) {
                console.warn(key2 + ' was incorrectly encoded as ' + decodedKey2);
            }
        }
        
        return result;
    };


    idbModules.shimIndexedDB = new IDBFactory();
    idbModules.IDBFactory = IDBFactory;
}(idbModules));

(function(window, idbModules){
    'use strict';

    function shim(name, value) {
        try {
            // Try setting the property. This will fail if the property is read-only.
            window[name] = value;
        }
        catch (e) {}

        if (window[name] !== value && Object.defineProperty) {
            // Setting a read-only property failed, so try re-defining the property
            try {
                Object.defineProperty(window, name, {
                    value: value
                });
            }
            catch (e) {}

            if (window[name] !== value) {
                window.console && console.warn && console.warn('Unable to shim ' + name);
            }
        }
    }

    shim('shimIndexedDB', idbModules.shimIndexedDB);
    if (window.shimIndexedDB) {
        window.shimIndexedDB.__useShim = function(){
            if (typeof window.openDatabase !== "undefined") {
                // Polyfill ALL of IndexedDB, using WebSQL
                shim('indexedDB', idbModules.shimIndexedDB);
                shim('IDBFactory', idbModules.IDBFactory);
                shim('IDBDatabase', idbModules.IDBDatabase);
                shim('IDBObjectStore', idbModules.IDBObjectStore);
                shim('IDBIndex', idbModules.IDBIndex);
                shim('IDBTransaction', idbModules.IDBTransaction);
                shim('IDBCursor', idbModules.IDBCursor);
                shim('IDBKeyRange', idbModules.IDBKeyRange);
                shim('IDBRequest', idbModules.IDBRequest);
                shim('IDBOpenDBRequest', idbModules.IDBOpenDBRequest);
                shim('IDBVersionChangeEvent', idbModules.IDBVersionChangeEvent);
            }
            else if (typeof window.indexedDB === "object") {
                // Polyfill the missing IndexedDB features
                idbModules.polyfill();
            }
        };

        window.shimIndexedDB.__debug = function(val){
            idbModules.DEBUG = val;
        };
    }
    
    // Workaround to prevent an error in Firefox
    if(!('indexedDB' in window)) {
        window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.oIndexedDB || window.msIndexedDB;
    }
    
    // Detect browsers with known IndexedDb issues (e.g. Android pre-4.4)
    var poorIndexedDbSupport = false;
    if (navigator.userAgent.match(/Android 2/) || navigator.userAgent.match(/Android 3/) || navigator.userAgent.match(/Android 4\.[0-3]/)) {
        /* Chrome is an exception. It supports IndexedDb */
        if (!navigator.userAgent.match(/Chrome/)) {
            poorIndexedDbSupport = true;
        }
    }

    if ((typeof window.indexedDB === "undefined" || !window.indexedDB || poorIndexedDbSupport) && typeof window.openDatabase !== "undefined") {
        window.shimIndexedDB.__useShim();
    }
    else {
        window.IDBDatabase = window.IDBDatabase || window.webkitIDBDatabase;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
        window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
        if(!window.IDBTransaction){
            window.IDBTransaction = {};
        }
        /* Some browsers (e.g. Chrome 18 on Android) support IndexedDb but do not allow writing of these properties */
        try {
            window.IDBTransaction.READ_ONLY = window.IDBTransaction.READ_ONLY || "readonly";
            window.IDBTransaction.READ_WRITE = window.IDBTransaction.READ_WRITE || "readwrite";
        } catch (e) {}
    }
    
}(window, idbModules));

