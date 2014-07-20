/**
 * This class is used as a base class from which to derive Models used in Trees.
 */
Ext.define('Ext.data.TreeModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.NodeInterface'
    ],

    mixins: [
        'Ext.mixin.Queryable'
    ],

    /**
     * @cfg {String} [childType]
     * The class name of child nodes to create when reading child nodes from
     * raw data. By default the type configured into the TreeStore is used.
     *
     * This is one way of creating heterogeneous nodes in a tree.
     *
     * To do this through data types passed from the server, use the {@link Ext.data.reader.Reader#typeProperty}.
     *
     * for example in the case of a hidden root node, you'd use the default type at level zero. See {@link Ext.tree.Panel TreePanel}'s
     * documentation for an example.
     *
     * *Important*
     * If you are using this declaration on your tree models, and have a {@link Ext.tree.Panel#rootVisible hidden root node}, you
     * MUST create a special root model definition which declares the type of its children.
     *
     * If you allow the TreeStore to create a root node of the same type as the first level of *visible* nodes
     * then the reader will atempt to read the wrong type of child node for the root.
     *
     * Example:
     *
     *    Ext.define('myApp.World', {
     *        childType: 'Territory'
     *    });
     *
     *    ...
     *
     *    store: {
     *        id: 'myTreeStore',
     *        model: 'myApp.World' // The hidden root will know to create 'Territory' type children.
     *    }
     *
     * If the root is hidden, and the first level of visible nodes are going to be the `myApp.Territory` class,
     * then the hidden root must not be of the `myApp.Territory` class. Otherwise, it would try to read in the
     * territory data as its childType - most likely 'Country'.
     *
     */

     getRefItems: function() {
         return this.childNodes;
     },

     getRefOwner: function() {
         return this.parentNode;
     }
},
function () {
    Ext.data.NodeInterface.decorate(this);
});
