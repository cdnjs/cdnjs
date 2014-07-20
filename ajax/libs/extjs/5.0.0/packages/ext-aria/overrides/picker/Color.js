Ext.define('Ext.aria.picker.Color', {
    override: 'Ext.picker.Color',
    
    requires: [
        'Ext.aria.Component'
    ],

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //\\ TODO: set up KeyNav
    },

    ariaGetEl: function() {
        return this.innerEl;
    },

    onColorSelect: function(picker, cell) {
        var me = this;
        
        if (cell && cell.dom) {
            me.ariaUpdate(me.eventEl, {
                'aria-activedescendant': cell.dom.id
            });
        }
    },

    getFocusEl: function() {
        return this.el;
    }
});
