/**
 * @author Ed Spencer
 * @class Ext.data.reader.Array
 * 
 * <p>Data reader class to create an Array of {@link Ext.data.Model} objects from an Array.
 * Each element of that Array represents a row of data fields. The
 * fields are pulled into a Record object using as a subscript, the <code>mapping</code> property
 * of the field definition if it exists, or the field's ordinal position in the definition.</p>
 * 
 * <p><u>Example code:</u></p>
 * 
<pre><code>
Employee = Ext.define('Employee', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        {name: 'name', mapping: 1},         // "mapping" only needed if an "id" field is present which
        {name: 'occupation', mapping: 2}    // precludes using the ordinal position as the index.        
    ]
});

var myReader = new Ext.data.reader.Array({
    model: 'Employee'
}, Employee);
</code></pre>
 * 
 * <p>This would consume an Array like this:</p>
 * 
<pre><code>
[ [1, 'Bill', 'Gardener'], [2, 'Ben', 'Horticulturalist'] ]
</code></pre>
 * 
 * @constructor
 * Create a new ArrayReader
 * @param {Object} meta Metadata configuration options.
 */
Ext.define('Ext.data.reader.Array', {
    extend: 'Ext.data.reader.Json',
    alternateClassName: 'Ext.data.ArrayReader',
    alias : 'reader.array',

    // For Array Reader, methods in the base which use these properties must not see the defaults
    config: {
        /**
         * @cfg
         * @inheritdoc
         */
        totalProperty: undefined,
        /**
         * @cfg
         * @inheritdoc
         */
        successProperty: undefined
        
        /**
        * @cfg {Boolean} preserveRawData @hide
        */
    },
    
    createFieldAccessor: function(field) {
        // In the absence of a mapping property, use the original ordinal position
        // at which the Model inserted the field into its collection.
        var oldMap = field.mapping, 
            index = field.hasMapping() ? oldMap : field.ordinal,
            result;

        // Temporarily overwrite the mapping and use the superclass method.
        field.mapping = index;
        result = this.callParent(arguments);
        field.mapping = oldMap;
        return result;
    },
    
    getModelData: function(raw) {
        // Can't preserve raw data here
        return {};
    }
});
