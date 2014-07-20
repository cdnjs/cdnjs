Ext.define('Ext.aria.picker.Date', {
    override: 'Ext.picker.Date',
    
    requires: [
        'Ext.aria.Component'
    ],
    
    isDatePicker: true,

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        
        me.on('highlightitem', me.onHighlightItem);
    },

    ariaGetEl: function() {
        return this.innerEl;
    },

    onBoxReady: function() {
        var me = this,
            middleButton;
        
        me.callParent();

        middleButton = me.middleBtnEl.down('[role=button]');
        
        me.ariaUpdate(me.eventEl, {
            'aria-labelledby': middleButton.id
        });
        
        me.ariaUpdate(me.innerEl, {
            'aria-labelledby': middleButton.id
        });
    },

    onHighlightItem: function(picker, cell) {
        var me = this;
        
        if (cell && cell.dom) {
            me.ariaUpdate(me.eventEl, {
                'aria-activedescendant': cell.dom.id
            });
        }
    },

    // We must be naturally focusable if not a DatePicker's picker
    getFocusEl: function() {
        var me = this;
        
        return me.pickerField ? null : me.el;
    },
    
    onFocus: function() {
        var me = this;
        
        me.callParent(arguments);
        
        // TODO Why is this needed?
        me.getFocusEl();
    }
});
