Ext.define('Ext.aria.window.Window', {
    override: 'Ext.window.Window',
    
    requires: [
        'Ext.aria.panel.Panel',
        'Ext.util.ComponentDragger',
        'Ext.util.Region',
        'Ext.EventManager'
    ],  
    
    closeText: 'Close Window',
    moveText: 'Move Window',
    resizeText: 'Resize Window',
    
    deltaMove: 10,
    deltaResize: 10,
    
    // Windows are floating, which means the outline will show
    // without having to apply an extra margin. Also, windows'
    // shadows will display incorrectly if margins are enabled.
    ariaFocusableContainerCls: '',

    initComponent: function() {
        var me = this,
            tools = me.tools;
        
        // Add buttons to move and resize the window
        if (!tools) {
            me.tools = tools = [];
        }
        
        //TODO: Create new tools
        tools.unshift(
            {
                type: 'resize',
                tooltip: me.resizeText
            },
            {
                type: 'move',
                tooltip: me.moveText
            }
        );
        
        me.callParent(arguments);
        
        me.on('move', me.onMove, me);
    },
    
    afterHide: function() {
        Ext.aria.FocusManager.removeWindow(this);
        
        this.callParent(arguments);
    },
    
    ariaGetFocusFallback: function() {
        var fallback = this.focusFallbackCmp;
        
        if (fallback && !fallback.isDestroyed) {
            return fallback;
        }
        
        return this.callParent();
    },
        
    onBoxReady: function() {
        var me = this,
            EO = Ext.event.Event,
            toolBtn;
        
        me.callParent();
        
        if (me.draggable) {
            toolBtn = me.down('tool[type=move]');
            me.ariaUpdate(toolBtn.getEl(), { 'aria-label': me.moveText });
            
            toolBtn.keyMap = new Ext.util.KeyMap({
                target: toolBtn.el,
                key: [EO.UP, EO.DOWN, EO.LEFT, EO.RIGHT],
                handler: me.moveWindow,
                scope: me
            });
        }
        
        if (me.resizable) {
            toolBtn = me.down('tool[type=resize]');
            me.ariaUpdate(toolBtn.getEl(), {'aria-label': me.resizeText });
            
            toolBtn.keyMap = new Ext.util.KeyMap({
                target: toolBtn.el,
                key: [EO.UP, EO.DOWN, EO.LEFT, EO.RIGHT],
                handler: me.resizeWindow,
                scope: me
            });
        }
    },

    onEsc: function(k, e) {
        var me = this;
        
        // Only process ESC if the FocusManager is not doing it
        if (me.hasFocus) {
            e.stopEvent();
            me.close();
        }
    },

    getFocusEl: function() {
        return this.el;
    },

    /**
     * @private
     * Called when a Component's focusEl receives focus.
     * If there is a valid default focus Component to jump to, focus that,
     * otherwise continue as usual, focus this Component.
     */
    onFocus: function() {
        var me = this;
        
        me.superclass.superclass.onFocus.call(me, arguments);
    },

    onShow: function() {
        var me = this;
        
        me.callParent(arguments);
        
        me.focusFallbackCmp = Ext.aria.FocusManager.getFocusedCmp();
        Ext.aria.FocusManager.addWindow(me, me.getDefaultFocus());
    },
    
    moveWindow: function(keyCode, e) {
       var me = this,
           delta = me.deltaMove,
           pos = me.getPosition(),
           EO = Ext.EventObject;

        switch (keyCode) {
            case EO.RIGHT:
                pos[0] += delta;
                break;
            case EO.LEFT:
                pos[0] -= delta;
                break;
            case EO.UP:
                pos[1] -= delta;
                break;
            case EO.DOWN:
                pos[1] += delta;
                break;
        }
        
        me.setPagePosition(pos);
        e.stopEvent();
    },
    
    resizeWindow: function(keyCode, e) {
       var me = this,
           delta = me.deltaResize,
           width = me.getWidth(),
           height = me.getHeight(),
           EO = Ext.EventObject;

        switch (keyCode) {
            case EO.RIGHT:
                width += delta;
                break;
            case EO.LEFT:
                width -= delta;
                break;
            case EO.UP:
                height -= delta;
                break;
            case EO.DOWN:
                height += delta;
                break;
        }
        
        me.setSize(width, height);
        e.stopEvent();
    },
    
    getDefaultFocus: function() {
        var me = this,
            result;
        
        result = me.callParent();
        
        if (result === me.el) {
            result = me;
        }
        
        return result;
    }
});
