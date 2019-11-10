YUI.add('dataparser-json', function(Y) {

/**
 * The DataParser utility provides a common configurable interface for widgets to
 * parse a variety of data against a given schema.
 *
 * @module dataparser
 */
var LANG = Y.Lang,

/**
 * JSON subclass for the YUI DataParser utility.
 * @class DataParser.JSON
 * @extends DataParser.Base
 * @static
 */
DPJSON = {

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataParser.JSON static methods
    //
    /////////////////////////////////////////////////////////////////////////////
    
    /**
     * Utility function converts JSON locator strings into walkable paths
     *
     * @method DataParser.JSON.buildPath
     * @param locator {String} JSON value locator.
     * @return {String[]} Walkable path to data value.
     * @static
     */
    buildPath: function(locator) {
        var path = null,
            keys = [],
            i = 0;
            
        if (locator) {
            // Strip the ["string keys"] and [1] array indexes
            locator = locator.
                replace(/\[(['"])(.*?)\1\]/g,
                function (x,$1,$2) {keys[i]=$2;return '.@'+(i++);}).
                replace(/\[(\d+)\]/g,
                function (x,$1) {keys[i]=parseInt($1,10)|0;return '.@'+(i++);}).
                replace(/^\./,''); // remove leading dot

            // Validate against problematic characters.
            if (!/[^\w\.\$@]/.test(locator)) {
                path = locator.split('.');
                for (i=path.length-1; i >= 0; --i) {
                    if (path[i].charAt(0) === '@') {
                        path[i] = keys[parseInt(path[i].substr(1),10)];
                    }
                }
            }
            else {
            }
        }
        return path;
    },

    /**
     * Utility function to walk a path and return the value located there.
     *
     * @method DataParser.JSON.walkPath
     * @param path {String[]} Locator path.
     * @param data {String} Data to traverse.
     * @return {Object} Data value at location.
     * @static
     */
    walkPath: function (path, data) {
        var i = 0,
            len = path.length;
        for (;i<len;i++) {
            data = data[path[i]];
        }
        return data;
    },

    /**
     * Overriding parse method traverses JSON data according to given schema.
     *
     * @method _parse
     * @param schema {Object} Schema to parse against.
     * @param data {Object} Data to parse.
     * @return {Object} Schema-parsed data.
     * @static
     * @protected
     */
    _parse: function(schema, data) {
        var data_in = (data.responseText && Y.JSON.parse(data.responseText)) || data,
            data_out = {results:[],meta:{}};

        if(LANG.isObject(data_in) && schema) {
            // Parse results data
            data_out = this._parseResults(schema, data_in, data_out);

            // Parse meta data
            if(LANG.isObject(schema.metaFields)) {
                data_out = this._parseMeta(schema.metaFields, data_in, data_out);
            }
        }
        else {
            data_out.error = true;
        }

        return data_out;
    },

    /**
     * Schema-parsed list of results from full data
     *
     * @method _parseResults
     * @param data_out {Object} Data to parse.
     * @param data_in {Object} In-progress parsed data to update.
     * @return {Array} Array of results.
     * @static
     * @protected
     */
    _parseResults: function(schema, data_in, data_out) {
        if(schema.resultsList) {
            var bError = false,
                results = [],
                path;

            path = DPJSON.buildPath(schema.resultsList);
            if(path) {
                results = DPJSON.walkPath(path, data_in);
                if (results === undefined) {
                    bError = true;
                }
                else {
                    if(LANG.isArray(schema.fields)) {
                        if(LANG.isArray(schema.fields)) {
                            results = this._filterFieldValues(schema.fields, results);
                        }
                        else {
                            bError = true;
                        }
                    }
                }
            }
            else {
                bError = true;
            }

            if (bError) {
                data_out.error = true;
            }
            
            data_out.results = results;
        }
        return data_out;
    },

    /**
     * Schema-parse field data out of list of full results
     *
     * @method _filterFieldValues
     * @param fields {Array} Fields to filter against.
     * @param results {Array} Results data to parse.
     * @return {Array} Array of field-filtered results.
     * @static
     * @protected
     */
    _filterFieldValues: function(fields, results) {
        var data_out = [],
            len = fields.length,
            i, j,
            field, key, path, parser,
            simplePaths = [], complexPaths = [], fieldParsers = [],
            result, record;

        // First collect hashes of simple paths, complex paths, and parsers
        for (i=0; i<len; i++) {
            field = fields[i]; // A field can be a simple string or a hash
            key = field.key || field; // Find the key
            
            // Validate and store locators for later
            path = DPJSON.buildPath(key);
            if (path) {
                if (path.length === 1) {
                    simplePaths[simplePaths.length] = {key:key, path:path[0]};
                } else {
                    complexPaths[complexPaths.length] = {key:key, path:path};
                }
            } else {
            }

            // Validate and store parsers for later
            parser = (LANG.isFunction(field.parser)) ? field.parser : Y.DataParser[field.parser+''];
            if (parser) {
                fieldParsers[fieldParsers.length] = {key:key, parser:parser};
            }
        }

        // Traverse list of results, creating records of simple fields,
        // complex fields, and applying parsers as necessary
        for (i=results.length-1; i>=0; --i) {
            record = {};
            result = results[i];
            if(result) {
                // Cycle through simpleLocators
                for (j=simplePaths.length-1; j>=0; --j) {
                    // Bug 1777850: The result might be an array instead of object
                    record[simplePaths[j].key] =
                            LANG.isUndefined(result[simplePaths[j].path]) ?
                            result[j] : result[simplePaths[j].path];
                }

                // Cycle through complexLocators
                for (j=complexPaths.length - 1; j>=0; --j) {
                    record[complexPaths[j].key] = DPJSON.walkPath(complexPaths[j].path, result);
                }

                // Cycle through fieldParsers
                for (j=fieldParsers.length-1; j>=0; --j) {
                    key = fieldParsers[j].key;
                    record[key] = fieldParsers[j].parser(record[key]);
                    // Safety net
                    if (LANG.isUndefined(record[key])) {
                        record[key] = null;
                    }
                }
            }
            data_out[i] = record;
        }
        
        return data_out;
    },

    /**
     * Parses results data according to schema
     *
     * @method _parseMeta
     * @param data_out {Object} Data to parse.
     * @param data_in {Object} In-progress parsed data to update.
     * @return {Object} Schema-parsed meta data.
     * @static
     * @protected
     */
    _parseMeta: function(metaFields, data_in, data_out) {
        var key, path;
        for(key in metaFields) {
            if (metaFields.hasOwnProperty(key)) {
                path = DPJSON.buildPath(metaFields[key]);
                if (path && data_in) {
                    data_out.meta[key] = DPJSON.walkPath(path, data_in);
                }
            }
        }
        return data_out;
    }
};
Y.mix(DPJSON, Y.DataParser.Base);

Y.DataParser.JSON = DPJSON;



}, '@VERSION@' ,{requires:['dataparser-base']});
