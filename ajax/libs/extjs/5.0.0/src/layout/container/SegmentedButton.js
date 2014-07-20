Ext.define('Ext.layout.container.SegmentedButton', {
    extend: 'Ext.layout.container.Container',
    alias: 'layout.segmentedbutton',

    needsItemSize: false,
    setsItemSize: false,

    _btnRowCls: Ext.baseCSSPrefix + 'segmented-button-row',

    getRenderTree: function() {
        var me = this,
            result = me.callParent(),
            i, ln;

        if (me.owner.getVertical()) {
            for (i = 0, ln = result.length; i< ln; i++) {
                result[i] = {
                    cls: me._btnRowCls,
                    cn: result[i]
                }
            }
        }

        return result;
    },

    getItemLayoutEl: function(item) {
        var dom = item.el.dom;

        return this.owner.getVertical() ? dom.parentNode : dom;
    }
});
