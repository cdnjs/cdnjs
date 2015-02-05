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
