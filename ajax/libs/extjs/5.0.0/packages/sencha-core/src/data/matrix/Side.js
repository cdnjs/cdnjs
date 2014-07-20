/**
 * This class manages one side of a `Matrix`.
 * @private
 */
Ext.define('Ext.data.matrix.Side', {
    requires: [
        'Ext.data.matrix.Slice'
    ],

    /**
     * @property {Ext.data.matrix.Side} inverse
     * Reference to the opposite side of the matrix.
     * @readonly
     */

    constructor: function (matrix, index, role) {
        var me = this;

        /**
         * @property {Ext.data.matrix.Matrix} matrix
         * @readonly
         */
        me.matrix = matrix;

        /**
         * @property {Number} index
         * Either 0 or 1 which is the index of our id value in an association entry.
         * @readonly
         */
        me.index = index;

        /**
         * @property {Ext.data.schema.Role} role
         * The role for this side of the matrix.
         * @readonly
         */
        me.role = role;

        /**
         * @property {Object} slices
         * Keyed by the id for this side of the matrix to yield a `Slice`.
         * @readonly
         */
        me.slices = {};
    },

    get: function (id1, id2) {
        var me = this,
            slices = me.slices,
            slice = slices[id1] ||
                   (slices[id1] = new Ext.data.matrix.Slice(me, id1));

        return (id2 || id2 === 0) ? slice.members[id2] : slice;
    },

    update: function (id1, id2, state) {
        var slice = this.get(id1);
        return slice.update(id2, state);
    },

    destroy: function() {
        var me = this,
            slices = me.slices,
            id;

        for (id in slices) {
            slices[id].destroy();
        }

        me.inverse = me.matrix = me.role = me.slices = null;
        me.callParent();
    }
});
