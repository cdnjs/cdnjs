YUI.add('dataschema-base', function(Y) {

/**
 * The DataSchema utility provides a common configurable interface for widgets to
 * apply a given schema to a variety of data.
 *
 * @module dataschema
 */

/**
 * Provides the base DataSchema implementation, which can be extended to 
 * create DataSchemas for specific data formats, such XML, JSON, text and
 * arrays.
 *
 * @module dataschema
 * @submodule dataschema-base
 */

var LANG = Y.Lang,
/**
 * Base class for the YUI DataSchema Utility.
 * @class DataSchema.Base
 * @static
 */
    SchemaBase = {
    /**
     * Overridable method returns data as-is.
     *
     * @method apply
     * @param schema {Object} Schema to apply.
     * @param data {Object} Data.
     * @return {Object} Schema-parsed data.
     * @static
     */
    apply: function(schema, data) {
        return data;
    },
    
    /**
     * Applies field parser, if defined
     *
     * @method parse
     * @param value {Object} Original value.
     * @param field {Object} Field.
     * @return {Object} Type-converted value.
     */
    parse: function(value, field) {
        if(field.parser) {
            var parser = (LANG.isFunction(field.parser)) ?
            field.parser : Y.Parsers[field.parser+''];
            if(parser) {
                value = parser.call(this, value);
            }
            else {
            }
        }
        return value;
    }
};

Y.namespace("DataSchema").Base = SchemaBase;
Y.namespace("Parsers");



}, '@VERSION@' ,{requires:['base']});

YUI.add('dataschema-json', function(Y) {

/**
 * Provides a DataSchema implementation which can be used to work with JSON data.
 *
 * @module dataschema
 * @submodule dataschema-json
 */

/**
 * JSON subclass for the DataSchema Utility.
 * @class DataSchema.JSON
 * @extends DataSchema.Base
 * @static
 */
var LANG = Y.Lang,

    SchemaJSON = {

        /////////////////////////////////////////////////////////////////////////////
        //
        // DataSchema.JSON static methods
        //
        /////////////////////////////////////////////////////////////////////////////
        /**
         * Utility function converts JSON locator strings into walkable paths
         *
         * @method DataSchema.JSON.getPath
         * @param locator {String} JSON value locator.
         * @return {String[]} Walkable path to data value.
         * @static
         */
        getPath: function(locator) {
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
         * @method DataSchema.JSON.getLocationValue
         * @param path {String[]} Locator path.
         * @param data {String} Data to traverse.
         * @return {Object} Data value at location.
         * @static
         */
        getLocationValue: function (path, data) {
            var i = 0,
                len = path.length;
            for (;i<len;i++) {
                if(
                    LANG.isObject(data) &&
                    (path[i] in data)
                ) {
                    data = data[path[i]];
                }
                else {
                    data = undefined;
                    break;
                }
            }
            return data;
        },

        /**
         * Applies a given schema to given JSON data.
         *
         * @method apply
         * @param schema {Object} Schema to apply.
         * @param data {Object} JSON data.
         * @return {Object} Schema-parsed data.
         * @static
         */
        apply: function(schema, data) {
            var data_in = data,
                data_out = {results:[],meta:{}};

            // Convert incoming JSON strings
            if(!LANG.isObject(data)) {
                try {
                    data_in = Y.JSON.parse(data);
                }
                catch(e) {
                    data_out.error = e;
                    return data_out;
                }
            }

            if(LANG.isObject(data_in) && schema) {
                // Parse results data
                if(!LANG.isUndefined(schema.resultListLocator)) {
                    data_out = SchemaJSON._parseResults.call(this, schema, data_in, data_out);
                }

                // Parse meta data
                if(!LANG.isUndefined(schema.metaFields)) {
                    data_out = SchemaJSON._parseMeta(schema.metaFields, data_in, data_out);
                }
            }
            else {
                data_out.error = new Error("JSON schema parse failure");
            }

            return data_out;
        },

        /**
         * Schema-parsed list of results from full data
         *
         * @method _parseResults
         * @param schema {Object} Schema to parse against.
         * @param json_in {Object} JSON to parse.
         * @param data_out {Object} In-progress parsed data to update.
         * @return {Object} Parsed data object.
         * @static
         * @protected
         */
        _parseResults: function(schema, json_in, data_out) {
            var results = [],
                path,
                error;

            if(schema.resultListLocator) {
                path = SchemaJSON.getPath(schema.resultListLocator);
                if(path) {
                    results = SchemaJSON.getLocationValue(path, json_in);
                    if (results === undefined) {
                        data_out.results = [];
                        error = new Error("JSON results retrieval failure");
                    }
                    else {
                        if(LANG.isArray(results)) {
                            // if no result fields are passed in, then just take the results array whole-hog
                            // Sometimes you're getting an array of strings, or want the whole object,
                            // so resultFields don't make sense.
                            if (LANG.isArray(schema.resultFields)) {
                                data_out = SchemaJSON._getFieldValues.call(this, schema.resultFields, results, data_out);
                            }
                            else {
                                data_out.results = results;
                            }
                        }
                        else {
                            data_out.results = [];
                            error = new Error("JSON Schema fields retrieval failure");
                        }
                    }
                }
                else {
                    error = new Error("JSON Schema results locator failure");
                }

                if (error) {
                    data_out.error = error;
                }

            }
            return data_out;
        },

        /**
         * Get field data values out of list of full results
         *
         * @method _getFieldValues
         * @param fields {Array} Fields to find.
         * @param array_in {Array} Results to parse.
         * @param data_out {Object} In-progress parsed data to update.
         * @return {Object} Parsed data object.
         * @static
         * @protected
         */
        _getFieldValues: function(fields, array_in, data_out) {
            var results = [],
                len = fields.length,
                i, j,
                field, key, locator, path, parser,
                simplePaths = [], complexPaths = [], fieldParsers = [],
                result, record;

            // First collect hashes of simple paths, complex paths, and parsers
            for (i=0; i<len; i++) {
                field = fields[i]; // A field can be a simple string or a hash
                key = field.key || field; // Find the key
                locator = field.locator || key; // Find the locator

                // Validate and store locators for later
                path = SchemaJSON.getPath(locator);
                if (path) {
                    if (path.length === 1) {
                        simplePaths[simplePaths.length] = {key:key, path:path[0]};
                    } else {
                        complexPaths[complexPaths.length] = {key:key, path:path};
                    }
                } else {
                }

                // Validate and store parsers for later
                //TODO: use Y.DataSchema.parse?
                parser = (LANG.isFunction(field.parser)) ? field.parser : Y.Parsers[field.parser+''];
                if (parser) {
                    fieldParsers[fieldParsers.length] = {key:key, parser:parser};
                }
            }

            // Traverse list of array_in, creating records of simple fields,
            // complex fields, and applying parsers as necessary
            for (i=array_in.length-1; i>=0; --i) {
                record = {};
                result = array_in[i];
                if(result) {
                    // Cycle through simpleLocators
                    for (j=simplePaths.length-1; j>=0; --j) {
                        // Bug 1777850: The result might be an array instead of object
                        record[simplePaths[j].key] = Y.DataSchema.Base.parse.call(this,
                                (LANG.isUndefined(result[simplePaths[j].path]) ?
                                result[j] : result[simplePaths[j].path]), simplePaths[j]);
                    }

                    // Cycle through complexLocators
                    for (j=complexPaths.length - 1; j>=0; --j) {
                        record[complexPaths[j].key] = Y.DataSchema.Base.parse.call(this,
                            (SchemaJSON.getLocationValue(complexPaths[j].path, result)), complexPaths[j] );
                    }

                    // Cycle through fieldParsers
                    for (j=fieldParsers.length-1; j>=0; --j) {
                        key = fieldParsers[j].key;
                        record[key] = fieldParsers[j].parser.call(this, record[key]);
                        // Safety net
                        if (LANG.isUndefined(record[key])) {
                            record[key] = null;
                        }
                    }
                    results[i] = record;
                }
            }
            data_out.results = results;
            return data_out;
        },

        /**
         * Parses results data according to schema
         *
         * @method _parseMeta
         * @param metaFields {Object} Metafields definitions.
         * @param json_in {Object} JSON to parse.
         * @param data_out {Object} In-progress parsed data to update.
         * @return {Object} Schema-parsed meta data.
         * @static
         * @protected
         */
        _parseMeta: function(metaFields, json_in, data_out) {
            if(LANG.isObject(metaFields)) {
                var key, path;
                for(key in metaFields) {
                    if (metaFields.hasOwnProperty(key)) {
                        path = SchemaJSON.getPath(metaFields[key]);
                        if (path && json_in) {
                            data_out.meta[key] = SchemaJSON.getLocationValue(path, json_in);
                        }
                    }
                }
            }
            else {
                data_out.error = new Error("JSON meta data retrieval failure");
            }
            return data_out;
        }
    };

Y.DataSchema.JSON = Y.mix(SchemaJSON, Y.DataSchema.Base);



}, '@VERSION@' ,{requires:['dataschema-base','json']});

YUI.add('dataschema-xml', function(Y) {

/**
 * Provides a DataSchema implementation which can be used to work with XML data.
 *
 * @module dataschema
 * @submodule dataschema-xml
 */
var LANG = Y.Lang,

    /**
     * XML subclass for the DataSchema Utility.
     * @class DataSchema.XML
     * @extends DataSchema.Base
     * @static
     */
    SchemaXML = {

        /////////////////////////////////////////////////////////////////////////////
        //
        // DataSchema.XML static methods
        //
        /////////////////////////////////////////////////////////////////////////////
        /**
         * Applies a given schema to given XML data.
         *
         * @method apply
         * @param schema {Object} Schema to apply.
         * @param data {XMLDoc} XML document.
         * @return {Object} Schema-parsed data.
         * @static
         */
        apply: function(schema, data) {
            var xmldoc = data, // unnecessary variables
                data_out = {results:[],meta:{}};

            if(xmldoc && xmldoc.nodeType && (9 === xmldoc.nodeType || 1 === xmldoc.nodeType || 11 === xmldoc.nodeType) && schema) {
                // Parse results data
                data_out = SchemaXML._parseResults.call(this, schema, xmldoc, data_out);

                // Parse meta data
                data_out = SchemaXML._parseMeta.call(this, schema.metaFields, xmldoc, data_out);
            }
            else {
                data_out.error = new Error("XML schema parse failure");
            }

            return data_out;
        },

        /**
         * Get an XPath-specified value for a given field from an XML node or document.
         *
         * @method _getLocationValue
         * @param field {String | Object} Field definition.
         * @param context {Object} XML node or document to search within.
         * @return {Object} Data value or null.
         * @static
         * @protected
         */
        _getLocationValue: function(field, context) {
            var locator = field.locator || field.key || field,
                xmldoc = context.ownerDocument || context,
                result, res, value = null;

            try {
                result = SchemaXML._getXPathResult(locator, context, xmldoc);
                while(res = result.iterateNext()) {
                    value = res.textContent || res.value || res.text || res.innerHTML || null;
                }

                return Y.DataSchema.Base.parse.call(this, value, field);
            }
            catch(e) {
            }

            return null;
        },

        /**
         * Fetches the XPath-specified result for a given location in an XML node or document.
         *
         * @param locator {String} The XPath location.
         * @param context {Object} XML node or document to search within.
         * @param xmldoc {Object} XML document to resolve namespace.
         * @return {Object} Data collection or null.
         * @static
         * @protected
         */
        _getXPathResult: function(locator, context, xmldoc) {
            // Standards mode
            if (! LANG.isUndefined(xmldoc.evaluate)) {
                return xmldoc.evaluate(locator, context, xmldoc.createNSResolver(context.ownerDocument ? context.ownerDocument.documentElement : context.documentElement), 0, null);
            }
            // IE mode
            else {
                var values=[], locatorArray = locator.split(/\b\/\b/), i=0, l=locatorArray.length, location, subloc, m, isNth;
                
                // XPath is supported
                try {
                    // this fixes the IE 5.5+ issue where childnode selectors begin at 0 instead of 1
                    xmldoc.setProperty("SelectionLanguage", "XPath");
                    values = context.selectNodes(locator);
                }
                // Fallback for DOM nodes and fragments
                catch (e) {
                    // Iterate over each locator piece
                    for (; i<l && context; i++) {
                        location = locatorArray[i];

                        // grab nth child []
                        if ((location.indexOf("[") > -1) && (location.indexOf("]") > -1)) {
                            subloc = location.slice(location.indexOf("[")+1, location.indexOf("]"));
                            //XPath is 1-based while DOM is 0-based
                            subloc--;
                            context = context.children[subloc];
                            isNth = true;
                        }
                        // grab attribute value @
                        else if (location.indexOf("@") > -1) {
                            subloc = location.substr(location.indexOf("@"));
                            context = subloc ? context.getAttribute(subloc.replace('@', '')) : context;
                        }
                        // grab that last instance of tagName
                        else if (-1 < location.indexOf("//")) {
                            subloc = context.getElementsByTagName(location.substr(2));
                            context = subloc.length ? subloc[subloc.length - 1] : null;
                        }
                        // find the last matching location in children
                        else if (l != i + 1) {
                            for (m=context.childNodes.length-1; 0 <= m; m-=1) {
                                if (location === context.childNodes[m].tagName) {
                                    context = context.childNodes[m];
                                    m = -1;
                                }
                            }
                        }
                    }
                    
                    if (context) {
                        // attribute
                        if (LANG.isString(context)) {
                            values[0] = {value: context};
                        }
                        // nth child
                        else if (isNth) {
                            values[0] = {value: context.innerHTML};
                        }
                        // all children
                        else {
                            values = Y.Array(context.childNodes, 0, true);
                        }
                    }
                }

                // returning a mock-standard object for IE
                return {
                    index: 0,
                    
                    iterateNext: function() {
                        if (this.index >= this.values.length) {return undefined;}
                        var result = this.values[this.index];
                        this.index += 1;
                        return result;
                    },

                    values: values
                };
            }
        },

        /**
         * Schema-parsed result field.
         *
         * @method _parseField
         * @param field {String | Object} Required. Field definition.
         * @param result {Object} Required. Schema parsed data object.
         * @param context {Object} Required. XML node or document to search within.
         * @static
         * @protected
         */
        _parseField: function(field, result, context) {
            if (field.schema) {
                result[field.key] = SchemaXML._parseResults.call(this, field.schema, context, {results:[],meta:{}}).results;
            }
            else {
                result[field.key || field] = SchemaXML._getLocationValue.call(this, field, context);
            }
        },

        /**
         * Parses results data according to schema
         *
         * @method _parseMeta
         * @param xmldoc_in {Object} XML document parse.
         * @param data_out {Object} In-progress schema-parsed data to update.
         * @return {Object} Schema-parsed data.
         * @static
         * @protected
         */
        _parseMeta: function(metaFields, xmldoc_in, data_out) {
            if(LANG.isObject(metaFields)) {
                var key,
                    xmldoc = xmldoc_in.ownerDocument || xmldoc_in;

                for(key in metaFields) {
                    if (metaFields.hasOwnProperty(key)) {
                        data_out.meta[key] = SchemaXML._getLocationValue.call(this, metaFields[key], xmldoc);
                    }
                }
            }
            return data_out;
        },

        /**
         * Schema-parsed result to add to results list.
         *
         * @method _parseResult
         * @param fields {Array} Required. A collection of field definition.
         * @param context {Object} Required. XML node or document to search within.
         * @return {Object} Schema-parsed data.
         * @static
         * @protected
         */
        _parseResult: function(fields, context) {
            var result = {}, j;

            // Find each field value
            for (j=fields.length-1; 0 <= j; j--) {
                SchemaXML._parseField.call(this, fields[j], result, context);
            }

            return result;
        },

        /**
         * Schema-parsed list of results from full data
         *
         * @method _parseResults
         * @param schema {Object} Schema to parse against.
         * @param context {Object} XML node or document to parse.
         * @param data_out {Object} In-progress schema-parsed data to update.
         * @return {Object} Schema-parsed data.
         * @static
         * @protected
         */
        _parseResults: function(schema, context, data_out) {
            if (schema.resultListLocator && LANG.isArray(schema.resultFields)) {
                var xmldoc = context.ownerDocument || context,
                    fields = schema.resultFields,
                    results = [],
                    node, result, nodeList, i=0;

                if (schema.resultListLocator.match(/^[:\-\w]+$/)) {
                    nodeList = context.getElementsByTagName(schema.resultListLocator);
                    
                    // loop through each result node
                    for (i=nodeList.length-1; 0 <= i; i--) {
                        results[i] = SchemaXML._parseResult.call(this, fields, nodeList[i]);
                    }
                }
                else {
                    nodeList = SchemaXML._getXPathResult(schema.resultListLocator, context, xmldoc);

                    // loop through the nodelist
                    while (node = nodeList.iterateNext()) {
                        results[i] = SchemaXML._parseResult.call(this, fields, node);
                        i += 1;
                    }
                }

                if (results.length) {
                    data_out.results = results;
                }
                else {
                    data_out.error = new Error("XML schema result nodes retrieval failure");
                }
            }
            return data_out;
        }
    };

Y.DataSchema.XML = Y.mix(SchemaXML, Y.DataSchema.Base);



}, '@VERSION@' ,{requires:['dataschema-base']});

YUI.add('dataschema-array', function(Y) {

/**
 * Provides a DataSchema implementation which can be used to work with data stored in arrays.
 *
 * @module dataschema
 * @submodule dataschema-array
 */

/**
 * Array subclass for the DataSchema Utility.
 * @class DataSchema.Array
 * @extends DataSchema.Base
 * @static
 */
var LANG = Y.Lang,

    SchemaArray = {

        /////////////////////////////////////////////////////////////////////////////
        //
        // DataSchema.Array static methods
        //
        /////////////////////////////////////////////////////////////////////////////
        /**
         * Applies a given schema to given Array data.
         *
         * @method apply
         * @param schema {Object} Schema to apply.
         * @param data {Object} Array data.
         * @return {Object} Schema-parsed data.
         * @static
         */
        apply: function(schema, data) {
            var data_in = data,
                data_out = {results:[],meta:{}};

            if(LANG.isArray(data_in)) {
                if(LANG.isArray(schema.resultFields)) {
                    // Parse results data
                    data_out = SchemaArray._parseResults.call(this, schema.resultFields, data_in, data_out);
                }
                else {
                    data_out.results = data_in;
                }
            }
            else {
                data_out.error = new Error("Array schema parse failure");
            }

            return data_out;
        },

        /**
         * Schema-parsed list of results from full data
         *
         * @method _parseResults
         * @param fields {Array} Schema to parse against.
         * @param array_in {Array} Array to parse.
         * @param data_out {Object} In-progress parsed data to update.
         * @return {Object} Parsed data object.
         * @static
         * @protected
         */
        _parseResults: function(fields, array_in, data_out) {
            var results = [],
                result, item, type, field, key, value, i, j;

            for(i=array_in.length-1; i>-1; i--) {
                result = {};
                item = array_in[i];
                type = (LANG.isObject(item) && !LANG.isFunction(item)) ? 2 : (LANG.isArray(item)) ? 1 : (LANG.isString(item)) ? 0 : -1;
                if(type > 0) {
                    for(j=fields.length-1; j>-1; j--) {
                        field = fields[j];
                        key = (!LANG.isUndefined(field.key)) ? field.key : field;
                        value = (!LANG.isUndefined(item[key])) ? item[key] : item[j];
                        result[key] = Y.DataSchema.Base.parse.call(this, value, field);
                    }
                }
                else if(type === 0) {
                    result = item;
                }
                else {
                    //TODO: null or {}?
                    result = null;
                }
                results[i] = result;
            }
            data_out.results = results;

            return data_out;
        }
    };

Y.DataSchema.Array = Y.mix(SchemaArray, Y.DataSchema.Base);



}, '@VERSION@' ,{requires:['dataschema-base']});

YUI.add('dataschema-text', function(Y) {

/**
 * Provides a DataSchema implementation which can be used to work with delimited text data.
 *
 * @module dataschema
 * @submodule dataschema-text
 */

/**
 * Text subclass for the DataSchema Utility.
 * @class DataSchema.Text
 * @extends DataSchema.Base
 * @static
 */

var LANG = Y.Lang,

    SchemaText = {

        /////////////////////////////////////////////////////////////////////////////
        //
        // DataSchema.Text static methods
        //
        /////////////////////////////////////////////////////////////////////////////
        /**
         * Applies a given schema to given delimited text data.
         *
         * @method apply
         * @param schema {Object} Schema to apply.
         * @param data {Object} Text data.
         * @return {Object} Schema-parsed data.
         * @static
         */
        apply: function(schema, data) {
            var data_in = data,
                data_out = {results:[],meta:{}};

            if(LANG.isString(data_in) && LANG.isString(schema.resultDelimiter)) {
                // Parse results data
                data_out = SchemaText._parseResults.call(this, schema, data_in, data_out);
            }
            else {
                data_out.error = new Error("Text schema parse failure");
            }

            return data_out;
        },

        /**
         * Schema-parsed list of results from full data
         *
         * @method _parseResults
         * @param schema {Array} Schema to parse against.
         * @param text_in {String} Text to parse.
         * @param data_out {Object} In-progress parsed data to update.
         * @return {Object} Parsed data object.
         * @static
         * @protected
         */
        _parseResults: function(schema, text_in, data_out) {
            var resultDelim = schema.resultDelimiter,
                results = [],
                results_in, fields_in, result, item, fields, field, key, value, i, j,

            // Delete final delimiter at end of string if there
            tmpLength = text_in.length-resultDelim.length;
            if(text_in.substr(tmpLength) == resultDelim) {
                text_in = text_in.substr(0, tmpLength);
            }

            // Split into results
            results_in = text_in.split(schema.resultDelimiter);

            for(i=results_in.length-1; i>-1; i--) {
                result = {};
                item = results_in[i];

                if(LANG.isString(schema.fieldDelimiter)) {
                    fields_in = item.split(schema.fieldDelimiter);

                    if(LANG.isArray(schema.resultFields)) {
                        fields = schema.resultFields;
                        for(j=fields.length-1; j>-1; j--) {
                            field = fields[j];
                            key = (!LANG.isUndefined(field.key)) ? field.key : field;
                            value = (!LANG.isUndefined(fields_in[key])) ? fields_in[key] : fields_in[j];
                            result[key] = Y.DataSchema.Base.parse.call(this, value, field);
                        }
                    }

                }
                else {
                    result = item;
                }

                results[i] = result;
            }
            data_out.results = results;

            return data_out;
        }
    };

Y.DataSchema.Text = Y.mix(SchemaText, Y.DataSchema.Base);



}, '@VERSION@' ,{requires:['dataschema-base']});



YUI.add('dataschema', function(Y){}, '@VERSION@' ,{use:['dataschema-base','dataschema-json','dataschema-xml','dataschema-array','dataschema-text']});

