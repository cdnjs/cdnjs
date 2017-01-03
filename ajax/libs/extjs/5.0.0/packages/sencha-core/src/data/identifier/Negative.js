/**
 * This class id generator produces successive negative numbers for id's. That is, -1, -2,
 * etc..
 *
 * The advantage of this type of `identifier` is that these are seldom valid server-side
 * id values (which typically start at 1 and increase from there) but are of the same
 * data type (integer). This means that these values can typically be deserialized by a
 * server and then recognized as provisionally generated.
 */
Ext.define('Ext.data.identifier.Negative', {
    extend: 'Ext.data.identifier.Sequential',

    alias: 'data.identifier.negative',

    config: {
        increment: -1,

        seed: -1
    }
});
