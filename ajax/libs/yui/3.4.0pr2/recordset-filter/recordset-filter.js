YUI.add('recordset-filter', function(Y) {

/**
 * Plugin that provides the ability to filter through a recordset.
 * Uses the filter methods available on Y.Array (see arrayextras submodule) to filter the recordset.
 * @module recordset
 * @submodule recordset-filter
 */


var YArray = Y.Array,
Lang = Y.Lang;


/**
 * Plugin that provides the ability to filter through a recordset.
 * Uses the filter methods available on Y.Array (see arrayextras submodule) to filter the recordset. 
 * @class RecordsetFilter
 */
function RecordsetFilter(config) {
    RecordsetFilter.superclass.constructor.apply(this, arguments);
}

Y.mix(RecordsetFilter, {
    NS: "filter",

    NAME: "recordsetFilter",

    ATTRS: {
    }

});


Y.extend(RecordsetFilter, Y.Plugin.Base, {


    initializer: function(config) {
    },

    destructor: function(config) {
    },

    /**
     * @description Filter through the recordset with a custom filter function, or a key-value pair.
     *
     * @method filter
     * @param f {Function, String} A custom filter function or a string representing the key to filter by.
     * @param v {any} (optional) If a string is passed into f, this represents the value that key should take in order to be accepted by the filter. Do not pass in anything if 'f' is a custom function
     * @return recordset {Y.Recordset} A new filtered recordset instance
     * @public
     */
    filter: function(f, v) {
        var recs = this.get('host').get('records'),
        oRecs = [],
        func = f;

        //If a key-value pair is passed in, generate a custom function
        if (Lang.isString(f) && Lang.isValue(v)) {

            func = function(item) {
                if (item.getValue(f) === v) {
                    return true;
                }
                else {
                    return false;
                }
            };
        }

        oRecs = YArray.filter(recs, func);


        //TODO: PARENT CHILD RELATIONSHIP
        return new Y.Recordset({
            records: oRecs
        });
        //return new host.constructor({records:arr});
    },

    /**
    * @description The inverse of filter. Executes the supplied function on each item. Returns a new Recordset containing the items that the supplied function returned *false* for.
    * @method reject
    * @param {Function} f is the function to execute on each item.
    * @return {Y.Recordset} A new Recordset instance containing the items on which the supplied function returned false.
    */
    reject: function(f) {
        return new Y.Recordset({
            records: YArray.reject(this.get('host').get('records'), f)
        });
    },

    /**
    * @description Iterates over the Recordset, returning a new Recordset of all the elements that match the supplied regular expression
    * @method grep
    * @param {pattern} pattern The regular expression to test against
    * each record.
    * @return {Y.Recordset} A Recordset instance containing all the items in the collection that produce a match against the supplied regular expression. If no items match, an empty Recordset instance is returned.
    */
    grep: function(pattern) {
        return new Y.Recordset({
            records: YArray.grep(this.get('host').get('records'), pattern)
        });
    }

    //TODO: Add more pass-through methods to arrayextras
});

Y.namespace("Plugin").RecordsetFilter = RecordsetFilter;



}, '@VERSION@' ,{requires:['recordset-base','array-extras','plugin']});
