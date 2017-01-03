Ext.define('Ext.rtl.grid.RowEditor', {
    override: 'Ext.grid.RowEditor',

    setButtonPosition: function(btnEl, left){
        if (this.getInherited().rtl) {
            btnEl.rtlSetLocalXY(left, this.el.dom.offsetHeight - 1);
        } else {
            this.callParent(arguments);
        }
    },

    getFieldScrollerScrollX: function() {
        return this.fieldScroller[this.getInherited().rtl ? 'rtlGetScrollLeft' : 'getScrollLeft']();
    },

    syncFieldsHorizontalScroll: function() {
        this.fieldScroller[this.getInherited().rtl ? 'rtlSetScrollLeft' : 'setScrollLeft'](this.lastScrollLeft);
    }
});
