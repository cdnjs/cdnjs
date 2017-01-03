/**
 */
Ext.define('Ext.data.field.Number', {
    extend: 'Ext.data.field.Field',

    alias: [
        'data.field.float',
        'data.field.number'
    ],

    isNumeric: true,
    isNumberField: true,

    convert: function (v) {
        if (typeof v === 'number') {
            return v;
        }

        var empty = v === undefined || v === null || v === '',
            allowNull = this.allowNull,
            out;
            
        if (empty) {
            out = allowNull ? null : 0;
        }  else {
            out = parseFloat(String(v).replace(this.stripRe, ''));
            if (allowNull && isNaN(out)) {
                out = null;
            }
        }
        return out;
    },
    
    getType: function() {
        return 'float';
    }
});
