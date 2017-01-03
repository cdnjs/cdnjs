/**
 * This type of association is similar to {@link Ext.data.schema.ManyToOne many-to-one},
 * except that the `{@Ext.data.field.Field#cfg-reference reference}` field also has set
 * `{@Ext.data.field.Field#cfg-unique unique}` to `true`.
 *
 * While this type of association helps handle both sides of the association properly, it
 * is problematic to enforce the uniqueness aspect. If the database were to enforce this
 * uniqueness constraint, it would limit the field to be non-nullable. Even if this were
 * acceptable, this also creates challenges for a "soft-delete" strategy where records are
 * kept in the table, but only marked as "deleted" in a field.
 * 
 * Ensuring uniqueness on the client-side is also difficult. So, at the present time, this
 * is not enforced.
 */
Ext.define('Ext.data.schema.OneToOne', {
    extend: 'Ext.data.schema.Association',

    isOneToOne: true,

    isToOne: true,

    kind: 'one-to-one',

    Left: Ext.define(null, {
        extend: 'Ext.data.schema.Role',

        createGetter: function() {
            var me = this;
            return function () {
                // 'this' refers to the Model instance inside this function
                return me.doGet(this);
            };
        },

        createSetter: function () {
            var me = this;
            return function (value) {
                // 'this' refers to the Model instance inside this function
                return me.doSet(this, value);
            };
        },

        doGet: function (rightRecord) {
            // Consider the Department entity with a managerId to a User entity. The
            // Department is on the left (the FK holder's side) so we are implementing the
            // guts of the getManagerDepartment method we place on the User entity. Since
            // we represent the "managerDepartment" role and as such our goal is to get a
            // Department instance, we start that from the User (rightRecord). Sadly that
            // record has no FK back to us.

            var propertyName = this.role, // ex "managerDepartment"
                ret = rightRecord[propertyName],
                session = rightRecord.session;

            if (!ret && session) {
                // @TODO: session - we'll cache the result on the record as always
                // but to get it we must ask the session
            }

            return ret;
        },

        doSet: function (rightRecord, leftRecord) {
            // We are the guts of the setManagerDepartment method we place on the User
            // entity. Our goal here is to establish the relationship between the new
            // Department (leftRecord) and the User (rightRecord).

            var propertyName = this.role, // ex "managerDepartment"
                ret = rightRecord[propertyName],
                inverseSetter = this.inverse.setterName;  // setManager for Department

            if (ret !== leftRecord) {
                rightRecord[propertyName] = leftRecord;

                if (inverseSetter) {
                    // Because the FK is owned by the inverse record, we delegate the
                    // majority of work to its setter. We've already locked in the only
                    // thing we keep on this side so we won't recurse back-and-forth.
                    leftRecord[inverseSetter](rightRecord);
                }
            }

            return ret;
        },

        read: function(record, node, fromReader, readOptions) {
            var me = this,
                result = me.callParent([ record, node, fromReader, readOptions ]),
                other = result.getRecords()[0];

            if (other) {
                record[me.role] = other;
                other[me.inverse.role] = record;
            }
        }
    }),

    Right: Ext.define(null, {
        extend: 'Ext.data.schema.Role',

        left: false,
        side: 'right',
        
        createGetter: function() {
            // As the target of the FK (say "manager" for the Department entity) this
            // getter is responsible for getting the entity referenced by the FK value.
            var me = this;

            return function (options, scope) {
                // 'this' refers to the Model instance inside this function
                return me.doGetFK(this, options, scope);
            };
        },
        
        createSetter: function() {
            var me = this;

            return function(value, options, scope) {
                // 'this' refers to the Model instance inside this function
                return me.doSetFK(this, value, options, scope);
            };
        },

        onValueChange: function(leftRecord, session, newValue) {
            leftRecord.changingKey = true;
            this.doSetFK(leftRecord, newValue);
            leftRecord.changingKey = false;
        },
        
        read: function(record, node, fromReader, readOptions) {
            var me = this,
                result = me.callParent([ record, node, fromReader, readOptions ]),
                other = result.getRecords()[0];

            if (other) {
                record[me.role] = other;
                other[me.inverse.role] = record;
            }
        }
    })
});
