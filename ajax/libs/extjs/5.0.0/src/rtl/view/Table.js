Ext.define('Ext.rtl.view.Table', {
    override: 'Ext.view.Table',

    rtlCellTpl: [
        '<td class="' + Ext.baseCSSPrefix + 'rtl {tdCls}" {tdAttr} {[Ext.aria ? "id=\\"" + Ext.id() + "\\"" : ""]} style="width:{column.cellWidth}px;<tpl if="tdStyle">{tdStyle}</tpl>" {ariaCellAttr}>',
            '<div {unselectableAttr} class="' + Ext.baseCSSPrefix + 'rtl ' + Ext.baseCSSPrefix + 'grid-cell-inner {innerCls}" ',
        'style="text-align:{[this.getAlign(values.align)]};<tpl if="style">{style}</tpl>" {ariaCellInnerAttr}>{value}</div>',
        '</td>', {
            priority: 0,
            rtlAlign: {
                right: 'left',
                left: 'right',
                center: 'center'
            },
            getAlign: function(align) {
                return this.rtlAlign[align];
            }
        }
    ],

    beforeRender: function() {
        var me = this;

        me.callParent();
        if (me.getInherited().rtl) {
            me.addCellTpl(me.getTpl('rtlCellTpl'));
        }
    },

    getCellPaddingAfter: function(cell) {
        return Ext.fly(cell).getPadding(this.getInherited().rtl ? 'l' : 'r');
    },

    scrollElIntoView: function(el, hscroll, animate) {
        var scrollManager = this.scrollManager;

        if (scrollManager) {
            scrollManager.scrollIntoView(el, hscroll, animate);
        } else {
            Ext.fly(el)[this.getInherited().rtl ? 'rtlScrollIntoView' : 'scrollIntoView'](this.el, hscroll, animate);
        }
    }
});
