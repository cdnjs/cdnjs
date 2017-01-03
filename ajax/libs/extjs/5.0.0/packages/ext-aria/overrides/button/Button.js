Ext.define('Ext.aria.button.Button', {
    override: 'Ext.button.Button',
    
    requires: [
        'Ext.aria.Component'
    ],
    
    showEmptyMenu: true,
    
    //<debug>
    constructor: function(config) {
        // Don't warn if we're under the slicer
        if (config.menu && !Ext.theme) {
            this.ariaCheckMenuConfig(config);
        }
        
        this.callParent(arguments);
    },
    //</debug>

    ariaGetRenderAttributes: function() {
        var me = this,
            menu = me.menu,
            attrs;
        
        attrs = me.callParent(arguments);
        
        if (menu) {
            attrs['aria-haspopup'] = true;
            attrs['aria-owns']     = menu.id;
        }
        
        if (me.enableToggle) {
            attrs['aria-pressed'] = me.pressed;
        }
        
        return attrs;
    },

    toggle: function(state) {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({ "aria-pressed": me.pressed });
    },
    
    ariaGetLabelEl: function() {
        return this.btnInnerEl;
    }
    
    // ARIA requires that buttons with a menu react to
    // Space and Enter keys by showing the menu. This
    // behavior conflicts with the various handler
    // functions we support in Ext JS; to avoid problems
    // we check if we have the menu *and* handlers, or
    // `click` event listeners, and raise an error if we do
    //<debug>
    , ariaCheckMenuConfig: function(cfg) {
        var text = cfg.text || cfg.html || 'Unknown';
        
        if (cfg.enableToggle || cfg.toggleGroup) {
            Ext.log.error(
                "According to WAI-ARIA 1.0 Authoring guide " +
                "(http://www.w3.org/TR/wai-aria-practices/#menubutton), " +
                "menu button '" + text + "'s behavior will conflict with " +
                "toggling"
            );
        }
        
        if (cfg.href) {
            Ext.log.error(
                "According to WAI-ARIA 1.0 Authoring guide " +
                "(http://www.w3.org/TR/wai-aria-practices/#menubutton), " +
                "menu button '" + text + "' cannot behave as a link"
            );
        }
        
        if (cfg.handler || (cfg.listeners && cfg.listeners.click)) {
            Ext.log.error(
                "According to WAI-ARIA 1.0 Authoring guide " +
                "(http://www.w3.org/TR/wai-aria-practices/#menubutton), " +
                "menu button '" + text + "' should display the menu " +
                "on SPACE or ENTER keys, which will conflict with the " +
                "button handler"
            );
        }
    }
    //</debug>
});
