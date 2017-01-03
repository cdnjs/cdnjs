/**
 * This class is a sequential id generator. A simple use of this class would be like so:
 *
 *     Ext.define('MyApp.data.MyModel', {
 *         extend: 'Ext.data.Model',
 *         identifier: 'sequential'
 *     });
 *     // assign id's of 1, 2, 3, etc.
 *
 * An example of a configured generator would be:
 *
 *     Ext.define('MyApp.data.MyModel', {
 *         extend: 'Ext.data.Model',
 *         identifier: {
 *             type: 'sequential',
 *             prefix: 'ID_',
 *             seed: 1000,
 *             increment: 10
 *         }
 *     });
 *     // assign id's of ID_1000, ID_1010, ID_1020, etc.
 *
 */
Ext.define('Ext.data.identifier.Sequential', {
    extend: 'Ext.data.identifier.Generator',

    alias: 'data.identifier.sequential',

    config: {
        /**
         * @cfg {Number} increment
         * The number by which to adjust the `seed` after for the next sequential id.
         */
        increment: 1,

        /**
         * @cfg {String} prefix
         * The string to place in front of the sequential number for each generated id.
         */
        prefix: null,

        /**
         * @cfg {Number} seed
         * The number at which to start generating sequential id's.
         */
        seed: 1
    },

    /**
     * Generates and returns the next id.
     * @return {String/Number} The next id. If a {@link #prefix} was specified, returns
     * a String, otherwise returns a Number.
     */
    generate: function () {
        var me = this,
            seed = me._seed,
            prefix = me._prefix;

        me._seed += me._increment;

        return (prefix !== null) ? prefix + seed : seed;
    }
});
