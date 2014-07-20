Ext.define('Ext.aria.tab.Bar', {
    override: 'Ext.tab.Bar',
    
    requires: [
        'Ext.aria.tab.Tab'
    ],
    
    untitledText: 'Tab Panel',
    
    ariaGetRenderAttributes: function() {
        var me = this,
            ownerCt = me.ownerCt,
            attrs;
        
        attrs = me.callParent();
        
        if (!ownerCt) {
            attrs['aria-label'] = me.untitledText;
        }
        
        attrs['aria-live'] = 'polite';
        attrs['aria-relevant'] = 'all';
        
        return attrs;
    },
    
    ariaGetAfterRenderAttributes: function() {
        var me = this,
            ownerCt = me.ownerCt,
            activeTab = me.activeTab,
            attrs, textEl;
        
        attrs = me.callParent();
        
        textEl = ownerCt && ownerCt.ariaGetTitleTextEl();
        
        if (textEl) {
            attrs['aria-labelledby'] = textEl.id;
        }
        
        if (activeTab && activeTab.rendered) {
            attrs['aria-activedescendant'] = activeTab.getEl().id;
        }
        
        return attrs;
    },
    
    onAdd: function(tab) {
        var me = this;
        
        if (tab.isTab) {
            tab.isGroupedBy = me;
            tab.on('focus', me.ariaOnTabFocus, me);
        }
        
        me.callParent(arguments);
    },

    setActiveTab: function(tab) {
        var me = this,
            i, len, items, item, activeTab;
        
        me.callParent(arguments);
        
        items = me.getRefItems();
        len   = items.length;
        
        for (i = 0; i < len; i++) {
            item = items[i];
            item.ariaUpdate({
                'aria-selected': !!item.active
            });
        }
        
        activeTab = me.activeTab;
        
        if (activeTab && activeTab.rendered) {
            me.ariaUpdate({
                'aria-activedescendant': activeTab.getEl().id
            });
        }
        
        // in case the tab card was not rendered when the tab was created
        // cards are rendered only when a tab is selected
        if (tab.card.rendered) {
            tab.ariaUpdate({
                'aria-controls': tab.card.getEl().id
            });
        }
    },
    
    findNextActivatable: function(toClose) {
        var me = this,
            next;
        
        next = me.callParent(arguments);
        
        // If the default algorithm can't find the next tab to activate,
        // fall back to the currently active tab. We need to have a focused
        // tab at all times.
        if (!next) {
            next = me.activeTab;
        }
        
        return next;
    },
    
    ariaGetFocusItems: function() {
        var me = this,
            i, items, item;
        
        items = me.getRefItems();
        
        for (i = 0; i < items.length; i++) {
            item = items[i];
            
            if (item.hasFocus) {
                return [item];
            }
        }
        
        for (i = 0; i < items.length; i++) {
            item = items[i];
            
            if (item.active && item.isFocusable()) {
                return [item];
            }
        }
        
        return [];
    },
    
    ariaOnTabFocus: function(tab) {
        this.ariaUpdate({
            'aria-activedescendant': tab.el.id
        });
    }
});
