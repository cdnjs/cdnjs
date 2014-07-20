Ext.define('Ext.aria.selection.CellModel', {
    override: 'Ext.selection.CellModel',
    
    // WAI-ARIA recommends no wrapping around rows
    preventWrap: true,

    initKeyNav: function(view) {
        var me = this;
        
        me.callParent(arguments);
        
        me.keyNav.destroy();

        me.keyNav = new Ext.util.KeyNav({
            target: view.el,
            ignoreInputFields: true,
            up: me.onKeyUp,
            down: me.onKeyDown,
            right: me.onKeyRight,
            left: me.onKeyLeft,
            tab: me.onKeyTab,
            home: me.onKeyHome,
            end: me.onKeyEnd,
            pageUp: me.onKeyPageUp,
            pageDown: me.onKeyPageDown,
            scope: me
        });
    },

    onKeyTab: function(e, t) {
        var me = this,
            pos, editingPlugin;
        
        pos = me.getCurrentPosition();

        if (pos) {
            editingPlugin = pos.view.editingPlugin;
            
            // If we were in editing mode, but just focused on a non-editable cell, behave as if we tabbed off an editable field
            if (editingPlugin && me.wasEditing) {
                //me.onEditorTab(editingPlugin, e);
                me.wasEditing = false;
            }
        }
        
        // Let the key tab bubble up
        return true;
    },
    
    onKeyHome: function(e, t) {
        this.doMove('left', { ctrlKey: true });
    },
    
    onKeyEnd: function(e, t) {
        this.doMove('right', { ctrlKey: true });
    },
    
    onKeyPageUp: function(e, t) {
        this.doMove('up', { ctrlKey: true });
    },
    
    onKeyPageDown: function(e, t) {
        this.doMove('down', { ctrlKey: true });
    }
});
