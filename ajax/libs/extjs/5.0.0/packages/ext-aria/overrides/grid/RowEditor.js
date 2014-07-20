Ext.define('Ext.aria.grid.RowEditor', {
    override: 'Ext.grid.RowEditor',
    
    initKeyNav: function() {
        var me = this,
            plugin = me.editingPlugin;

        me.keyNav = new Ext.util.KeyNav(me.el, {
            enter: plugin.completeEdit,
            esc: plugin.onEscKey,
            tab: me.onTabKey, // Adding tab to prevent tabbing out of editor while it is visible
            scope: plugin
        });
    },
    
    // Loop over the fields and buttons when tabbing
    onTabKey: function(e, t) {
        var editor = this.editor,
            target, cmp;
        
        target = editor.getChildByElement(e.target);

        if (e.shiftKey) {
            cmp = target.previousSibling(':focusable');
            
            if (!cmp) {
                if (target.isButton) {
                    cmp = editor.child('field:focusable:last');
                }
                else {
                    cmp = editor.floatingButtons.child('button:focusable:last');
                }
            }
        }
        else {
            cmp = target.nextSibling(':focusable');
            
            if (!cmp) {
                if (target.isButton) {
                    cmp = editor.child('field:focusable:first');
                }
                else {
                    cmp = editor.floatingButtons.child('button:focusable:first');
                }
            }
        }
        
        cmp.focus();
        
        return false;
    },
    
    // Row Editor buttons are not its direct descendants (they're floating)
    // This prevents FocusManager from tracking Row Editor being hidden by
    // button click
    isAncestor: function(possibleDescendant) {
        var me = this;
        
        return me.callParent([possibleDescendant]) ||
               me.floatingButtons.isAncestor(possibleDescendant);
    },
    
    // Row Editor's "focusable section" is grid itself
    ariaGetFocusableSection: function() {
        return this.view;
    }
});