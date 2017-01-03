/**
 * This class manages a many-to-many matrix for a `Session`.
 * @private
 */
Ext.define('Ext.data.matrix.Matrix', {
    requires: [
        'Ext.data.matrix.Side'
    ],

    /**
     * @property {Ext.data.schema.ManyToMany} association
     * The `ManyToMany` association for this matrix.
     * @readonly
     */

    /**
     * @property {Ext.data.Session} session
     * The `Session` owning this matrix.
     * @readonly
     */

    /*
     *      data: [
     *          [ leftId, rightId, -1/0/1 ],   // === DELETED/UNMODIFIED/ADDED
     *          ...
     *      ],
     *      
     *      left: new Ext.data.matrix.Side({
     *          matrix: me,
     *          index: 0,
     *          inverse: right,
     *          slices: {
     *              leftId: new Ext.data.matrix.Slice({
     *                  id: leftId,
     *                  side: left,
     *                  members: {
     *                      rightId: data[0]
     *                  }
     *              })
     *          }
     *      },
     *      
     *      right: new Ext.data.matrix.Side({
     *          matrix: me,
     *          index: 1,
     *          inverse: left,
     *          slices: {
     *              rightId: new Ext.data.matrix.Slice({
     *                  id: rightId,
     *                  side: right,
     *                  members: {
     *                      leftId: data[0]
     *                  }
     *              })
     *          })
     *      }
     */

    constructor: function (session, matrix) {
        var me = this,
            association = matrix.isManyToMany ? matrix
                                : session.getSchema().getAssociation(matrix),
            Side = Ext.data.matrix.Side,
            left = new Side(me, 0, association.left),
            right = new Side(me, 1, association.right);

        //<debug>
        Ext.Assert.truthy(association.isManyToMany, 'Association is not many-to-many');
        //</debug>

        me.association = association;
        me.session = session;

        me.left = left;
        me.right = right;

        left.inverse = right;
        right.inverse = left;
    },

    update: function (id1, id2, state) {
        return this.left.update(id1, id2, state);
    },

    destroy: function() {
        var me = this;

        me.left.destroy();
        me.right.destroy();

        me.association = me.session = me.left = me.right = null;
        me.callParent();
    }
});
