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
            var xmldoc = data,
                data_out = {results:[],meta:{}};

            if(xmldoc && xmldoc.nodeType && (xmldoc.nodeType === 9 || xmldoc.nodeType === 1 || xmldoc.nodeType === 11) && schema) {
                // Parse results data
                data_out = SchemaXML._parseResults(schema, xmldoc, data_out);

                // Parse meta data
                data_out = SchemaXML._parseMeta(schema.metaFields, xmldoc, data_out);
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
                // Standards mode
                if(!LANG.isUndefined(xmldoc.evaluate)) {
                    result = xmldoc.evaluate(locator, context, xmldoc.createNSResolver(!context.ownerDocument ? context.documentElement : context.ownerDocument.documentElement), 0, null);
                    while(res = result.iterateNext()) {
                        value = res.textContent;
                    }
                }
                // IE mode
                else {
                    xmldoc.setProperty("SelectionLanguage", "XPath");
                    result = context.selectNodes(locator)[0];
                    value = result.value || result.text || null;
                }
                return Y.DataSchema.Base.parse(value, field);

            }
            catch(e) {
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
                        data_out.meta[key] = SchemaXML._getLocationValue(metaFields[key], xmldoc);
                    }
                }
            }
            return data_out;
        },

        /**
         * Schema-parsed list of results from full data
         *
         * @method _parseResults
         * @param schema {Object} Schema to parse against.
         * @param xmldoc_in {Object} XML document parse.
         * @param data_out {Object} In-progress schema-parsed data to update.
         * @return {Object} Schema-parsed data.
         * @static
         * @protected
         */
        _parseResults: function(schema, xmldoc_in, data_out) {
            if(schema.resultListLocator && LANG.isArray(schema.resultFields)) {
                var nodeList = xmldoc_in.getElementsByTagName(schema.resultListLocator),
                    fields = schema.resultFields,
                    results = [],
                    node, field, result, i, j;

                if(nodeList.length) {
                    // Loop through each result node
                    for(i=nodeList.length-1; i>= 0; i--) {
                        result = {};
                        node = nodeList[i];

                        // Find each field value
                        for(j=fields.length-1; j>= 0; j--) {
                            field = fields[j];
                            result[field.key || field] = SchemaXML._getLocationValue(field, node);
                        }
                        results[i] = result;
                    }

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
