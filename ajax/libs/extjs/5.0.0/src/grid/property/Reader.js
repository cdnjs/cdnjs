/**
 * @private
 * Custom reader for property grid data
 */
Ext.define('Ext.grid.property.Reader', {
    extend: 'Ext.data.reader.Reader',

    successProperty: null,
    totalProperty: null,
    messageProperty: null,

    read: function(dataObject) {
        return this.readRecords(dataObject);
    },

    readRecords: function(dataObject) {
        var Model = this.getModel(),
            result = {
                records: [],
                success: true
            }, val, propName;

        for (propName in dataObject) {
            if (dataObject.hasOwnProperty(propName)) {
                val = dataObject[propName];
                if (this.isEditableValue(val)) {
                    result.records.push(new Model({
                        name: propName,
                        value: val
                    }));
                }
            }
        }
        result.total = result.count = result.records.length;
        return new Ext.data.ResultSet(result);
    },

    // @private
    isEditableValue: function(val){
        return Ext.isPrimitive(val) || Ext.isDate(val) || val === null;
    }
});