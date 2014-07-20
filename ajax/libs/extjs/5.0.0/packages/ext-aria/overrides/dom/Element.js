Ext.define('Ext.aria.dom.Element', {
    override: 'Ext.dom.Element',

    // Override so that the elements that we have assigned tabIndex = 0 do
    // not get overwritten with tabIndex = -1
    needsTabIndex: function() {
        var me = this;
        
        // We only check for tabIndex = 0 here, that's intended
        // Checking for -1 also will break FocusManager that relies on
        // elements being assigned default tabIndex of -1 in AbstractComponent
        if (me.getAttribute('tabIndex') === 0) {
            return false;
        }
        
        return me.callParent(arguments);
    }
});
