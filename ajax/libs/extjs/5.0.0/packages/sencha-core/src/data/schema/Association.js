/**
 * This class and its derivatives describe how two entities are related to each other.
 * Associations have the following forms:
 * 
 *   * *{@link Ext.data.schema.ManyToOne many-to-one}*
 *   * *{@link Ext.data.schema.ManyToMany many-to-many}*
 *   * *{@link Ext.data.schema.OneToOne one-to-one}*
 *
 * Associations are first-class objects in a `{@link Ext.data.schema.Schema schema}` but
 * are not created directly. They are created based on {@link Ext.data.field.Field#reference}
 * properties but also on {@link Ext.data.Model#manyToMany} declarations.
 * 
 * Associations have unique names within the `schema` as do {@link Ext.data.Model entities}.
 * In many cases, the association names can be generated. These names have uses beyond the
 * basic needs of tracking such as when communicating with the server. If the generated
 * names are not satisfactory, they can be given explicitly or the default naming can be
 * replaced by implementing a custom `Ext.data.schema.Schema` class.
 *
 * # Life Cycle
 *
 * Intimately connected with many associations is the concept of life-cycle. It is often
 * the case that one entity is "owned" by another so that if the owner is to be deleted,
 * the owned entity must also be deleted.
 * 
 * There are also associations that work in the reverse direction. That is, the presence of
 * an associated entity prevents the other entity from being deleted.
 * 
 * Finally, some associations just need to be dissolved if one of the related entities is
 * deleted. This is the case in a {@link Ext.data.schema.ManyToMany many-to-many}
 * association, but can also be for others if the `reference` field can be set to `null`.
 * 
 * # Left and Right
 *
 * Because associations are data that span entity types, they are not rightly viewed as
 * "belonging" to either entity. Instead, associations are owned by the `Schema`. Even so,
 * because belonging to an association effects both entities, associations are often
 * viewed from two perspectives or "sides". To distinguish them we call one "left" and the
 * other "right".
 * 
 * The reason for this choice derives from {@link Ext.data.schema.ManyToMany many-to-many}
 * associations and their typical underlying "matrix" table. If you were to view the matrix
 * table in a grid, you would see one id on the left and the other id on the right. There
 * is no further significance to these labels.
 * 
 * While the concept of left and right might makes sense in a matrix relationship, the
 * labels also apply to the other relationships. In those cases, the "left" entity is the
 * entity that contains the {@link Ext.data.Field#reference} (or foreign key).
 *
 * # Example
 * 
 * To help illustrate the various associations, consider a data model with Users, Groups
 * and Organizations. The Users are owned by an Organization. Deleting an Organization,
 * should delete all of the Users it contains. The Users can also be added to one or more
 * Groups, for example, the "moderator" or "admin" Group. Further, a a Level is assigned
 * to each User. Levels represent the subscriber's or customer's rank, such as "premium"
 * or "basic".
 * 
 * To summarize:
 * 
 *  * Users are *{@link Ext.data.schema.ManyToOne many-to-one}* to Ogranizations
 *  * Users are *{@link Ext.data.schema.ManyToOne many-to-one}* to Levels
 *  * Users are *{@link Ext.data.schema.ManyToOne many-to-many}* to Groups
 */
Ext.define('Ext.data.schema.Association', {
    requires: [
        'Ext.data.schema.Role'
    ],

    isOneToOne: false,
    isManyToOne: false,
    isManyToMany: false,

    /**
     * @cfg {String} name
     * The name of this association.
     */

    /**
     * @property {Object} owner
     * Points at either `left` or `right` objects if one is the owning party in this
     * association or is `null` if there is no owner.
     * @readonly
     */
    owner: null,

    /**
     * @property {Ext.Class} definedBy
     * @readonly
     */

    /**
     * @property {Ext.data.field.Field} field
     * @readonly
     */
    field: null,

    /**
     * @property {Ext.data.schema.Schema} schema
     * @readonly
     */

    /**
     * @property {Boolean} nullable
     * @readonly
     */

    /**
     * @property {Ext.data.schema.Role} left
     * @readonly
     */

    /**
     * @property {Ext.data.schema.Role} right
     * @readonly
     */

    constructor: function (config) {
        var me = this,
            left, right;

        Ext.apply(me, config);

        me.left = left = new me.Left(me, me.left);
        me.right = right = new me.Right(me, me.right);

        left.inverse = right;
        right.inverse = left;
    },
    
    hasField: function() {
        return !!this.field;    
    },
    
    getFieldName: function() {
        var field = this.field;
        return field ? field.name : '';
    }
});
