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
