/**
 * This visitor class adds extra capability to consider changes as 
 * they would be considered for a parent session.
 * @protected
 * @since 5.0.0
 */
Ext.define('Ext.data.session.ChildChangesVisitor', {
    extend: 'Ext.data.session.ChangesVisitor',

    constructor: function() {
        this.seen = {};
        this.callParent(arguments);
    },

    onDirtyRecord: function(record) {
        if (this.callParent(arguments) !== false) {
            // We have a record that we have updated in ourselves, but not in the parent.
            // We need to read it in
            if (!record.$source && (record.dropped || !record.phantom)) {
                this.readEntity(record);
            }
        }
    },

    readEntity: function(record) {
        var me = this,
            readKey = me.readKey,
            name = record.entityName,
            id = record.id,
            seen = me.seen,
            seenKey = name + id,
            result, bucket;

        // Already read it, jump out
        if (seen[seenKey]) {
            return;
        }
        seen[seenKey] = true;

        result = me.result || (me.result = {});
        bucket = result[name]  || (result[name] = {});
        bucket = bucket[readKey] || (bucket[readKey] = []);
        bucket.push(Ext.apply({}, record.modified, record.data));
    }
});