/**
 * @private
 *
 * Translates the element by setting the scroll position of its parent node.
 */
Ext.define('Ext.util.translatable.ScrollParent', {
    extend: 'Ext.util.translatable.Dom',

    applyElement: function(element) {
        var el = Ext.get(element);

        this.parent = el.parent();

        return el;
    },

    doTranslate: function(x, y) {
        var parent = this.parent;

        parent.setScrollLeft(Math.round(-x));
        parent.setScrollTop(Math.round(-y));
    },

    getPosition: function() {
        var me = this,
            position = me.position,
            parent = me.parent;

        position.x = parent.getScrollLeft();
        position.y = parent.getScrollTop();

        return position;
    }
});
