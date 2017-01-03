/**
 * A Traversable mixin.
 * @private
 */
Ext.define('Ext.mixin.Traversable', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'traversable'
    },

    setParent: function(parent) {
        this.parent = parent;

        return this;
    },

    /**
     * @member Ext.Component
     * Returns `true` if this component has a parent.
     * @return {Boolean} `true` if this component has a parent.
     */
    hasParent: function() {
        return Boolean(this.parent);
    },

    /**
     * @member Ext.Component
     * Returns the parent of this component, if it has one.
     * @return {Ext.Component} The parent of this component.
     */
    getParent: function() {
        return this.parent;
    },

    getAncestors: function() {
        var ancestors = [],
            parent = this.getParent();

        while (parent) {
            ancestors.push(parent);
            parent = parent.getParent();
        }

        return ancestors;
    },

    getAncestorIds: function() {
        var ancestorIds = [],
            parent = this.getParent();

        while (parent) {
            ancestorIds.push(parent.getId());
            parent = parent.getParent();
        }

        return ancestorIds;
    }
});
