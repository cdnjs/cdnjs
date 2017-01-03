/**
 * Wraps a collection of validation error responses and provides convenient functions for
 * accessing and errors for specific fields.
 *
 * Usually this class does not need to be instantiated directly - instances are instead
 * created automatically when {@link Ext.data.Model#validate validate} on a model instance:
 *
 *      // Validate some existing model instance - in this case it returned 2 failures
 *      // messages
 *      
 *      var errors = myModel.validate();
 *      errors.isValid(); //false
 *      
 *      errors.length; //2
 *      errors.getByField('name');  // [{field: 'name',  message: 'must be present'}]
 *      errors.getByField('title'); // [{field: 'title', message: 'is too short'}]
 *
 * @deprecated 5.0 Use `Ext.data.Validation` instead.
 */
Ext.define('Ext.data.ErrorCollection', {
    extend: 'Ext.util.MixedCollection', // not Ext.util.Collection due to API differences

    alternateClassName: 'Ext.data.Errors',

    requires: [
        'Ext.data.Error'
    ],

    init: function (record) {
        var me = this,
            fields = record.fields,
            validators = record.validators,
            data = record.data,
            before, field, item, i, j, jLen, len, msg, val, name;

        for (i = 0, len = fields.length; i < len; ++i) {
            field = fields[i];
            name = field.name;
            val = data[name];

            if (field.validate && !field.validate.$nullFn) {
                before = me.length;
                msg = field.validate(val, null, me);
                if (before === me.length && msg !== true) {
                    me.add(name, msg);
                }
            }

            if (validators) {
                item = validators[name];
                if (item) {
                    for (j = 0, jLen = item.length; j < jLen; ++j) {
                        msg = item[j].validate(val, record);
                        if (msg !== true) {
                            me.add(name, msg);
                        }
                    }
                }
            }
        }

        return me;
    },

    add: function (key, value) {
        var me = this,
            defaultMessage = Ext.data.field.Field.defaultInvalidMessage,
            obj = key, // for single argument form
            current;

        if (Ext.isString(key)) {
            obj = new Ext.data.Error({
                field: key,
                message: value || defaultMessage
            });
        } else {
            if (!(obj.isError)) {
                obj = new Ext.data.Error({
                    field: obj.field || obj.name,
                    message: obj.error || obj.message || obj.msg || defaultMessage
                });
            }

            key = obj.field;
        }

        current = me.get(key);
        if (current) {
            if (Ext.isArray(current)) {
                current.push(obj);
                return current;
            }

            me.removeAtKey(key);
            obj = [ current, obj ];
            obj.field = key;

            // Because the value we want in the collection is an array, we need to wrap it
            // another layer of array or the base add method will add each element.
            obj = [ obj ];
        }

        return me.callParent([ obj ]);
    },

    getKey: function (item) {
        return item.field;
    },

    /**
     * Returns true if there are no errors in the collection
     * @return {Boolean}
     */
    isValid: function() {
        return this.length === 0;
    },

    /**
     * Returns all of the errors for the given field
     * @param {String} fieldName The field to get errors for
     * @return {Object[]} All errors for the given field
     */
    getByField: function(fieldName) {
        var values = this.get(fieldName);

        if (values && !Ext.isArray(values)) {
            values = [values];
        }

        return values || [];
    }
});
