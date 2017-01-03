/**
 */
Ext.define('Ext.data.field.Integer', {
    extend: 'Ext.data.field.Field',

    alias: [
        'data.field.int',
        'data.field.integer'
    ],

    isNumeric: true,
    isIntegerField: true,

    convert: function(v) {
        // Handle values which are already numbers.
        // Value truncation behaviour of parseInt is historic and must be maintained.
        // parseInt(35.9)  and parseInt("35.9") returns 35
        if (typeof v == 'number') {
            return parseInt(v);
        }

        var empty = v === undefined || v === null || v === '',
            allowNull = this.allowNull,
            out;
            
        if (empty) {
            out = allowNull ? null : 0;
        }  else {
            out = parseInt(String(v).replace(this.stripRe, ''), 10);
            if (allowNull && isNaN(out)) {
                out = null;
            }
        }
        return out;
    },
    
    getType: function() {
        return 'int';
    }
});
