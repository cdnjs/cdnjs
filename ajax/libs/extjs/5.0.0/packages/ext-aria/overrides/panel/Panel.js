Ext.define('Ext.aria.panel.Panel', {
    override: 'Ext.panel.Panel',
    
    requires: [
        'Ext.aria.panel.AbstractPanel',
        'Ext.aria.panel.Header'
    ],
    
    closeText: 'Close Panel',
    collapseText: 'Collapse Panel',
    expandText: 'Expand Panel',
    untitledText: 'Untitled Panel',
    
    ariaToolFocusCls: Ext.baseCSSPrefix + 'aria-tool-focus',
    ariaSkipContainerTitleCheck: true,
    
    onBoxReady: function() {
        var me = this,
            toolFocusCls = me.ariaToolFocusCls,
            collapseTool = me.collapseTool,
            header, tools, i, len;
        
        me.callParent();
        
        if (collapseTool) {
            collapseTool.ariaUpdate({
                'aria-label': me.collapsed ? me.expandText : me.collapseText
            });
            
            collapseTool.ariaAddKeyMap({
                key: [ Ext.EventObject.ENTER, Ext.EventObject.SPACE ],
                handler: me.toggleCollapse,
                scope: me
            });
        }

        if (me.closable) {
            toolBtn = me.down('tool[type=close]');
            
            toolBtn.ariaUpdate({ 'aria-label': me.closeText });
            
            toolBtn.ariaAddKeyMap({
                key: [ Ext.EventObject.ENTER, Ext.EventObject.SPACE ],
                handler: me.close,
                scope: me
            });
        }
        
        header = me.getHeader();
        
        if (header) {
            tools = header.getTools();
        
            for (i = 0, len = tools.length; i < len; i++) {
                tools[i].ariaFocusCls = toolFocusCls;
            }
        }
    },
    
    setTitle: function(newTitle) {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({ 'aria-label': newTitle });
    },
    
    createReExpander: function(direction, defaults) {
        var me = this,
            opposite, result, tool;
        
        opposite = me.getOppositeDirection(direction);
        result   = me.callParent(arguments);
        tool     = result.down('tool[type=expand-' + opposite + ']');
        
        if (tool) {
            tool.on('boxready', function() {
                tool.ariaUpdate({
                    'aria-label': me.collapsed ? me.expandText : me.collapseText
                });
            
                tool.ariaAddKeyMap({
                    key: [ Ext.EventObject.ENTER, Ext.EventObject.SPACE ],
                    handler: me.toggleCollapse,
                    scope: me
                });
            }, { single: true });
        }
        
        return result;
    },
    
    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent();

        if (me.collapsible) {
            attrs['aria-expanded'] = !me.collapsed;
        }
        
        return attrs;
    },
    
    ariaGetAfterRenderAttributes: function() {
        var me = this,
            newAttrs = {},
            attrs, toolBtn, textEl;
        
        attrs = me.callParent(arguments);

        if (me.ariaRole === 'presentation' ) {
            return attrs;
        }
        
        if (me.title) {
            textEl = me.ariaGetTitleTextEl();

            if (textEl) {
                newAttrs = { 'aria-labelledby': textEl.id };
            }
            else {
                newAttrs = { title: me.title };
            }
        }
        else if (me.ariaLabel) {
            newAttrs = { title: me.ariaLabel };
        }

        Ext.apply(attrs, newAttrs);
        
        // ARIA requires that all focusable items have a title so that
        // screen readers can announce it
        //<debug>
        // Don't run the check under the slicer, it'll blow up
        if (!me.ariaSkipPanelTitleCheck && !Ext.theme) {
            me.ariaCheckPanelTitle(attrs);
        }
        //</debug>
        
        return attrs;
    },
    
    //<debug>
    ariaCheckPanelTitle: function(attrs) {
        var me = this;

        if (!attrs['aria-labelledby'] && !attrs.title && me.ariaIsFocusableContainer) {
            Ext.log.error("Panel " + me.id + " has ARIA role of '" + me.ariaRole +
                          "', but does not have a title. WAI-ARIA requires that all " +
                          "focusable panels have a title.");
        }
    },
    //</debug>
    
    ariaGetTitleTextEl: function() {
        var header = this.header;
        
        return header && header.titleCmp && header.titleCmp.textEl || null;
    },

    onExpand: function() {
        var me = this;
        
        me.callParent(arguments);
        
        me.ariaUpdate({ 'aria-expanded': true });
        
        if (me.collapseTool) {
            me.ariaUpdate(me.collapseTool.getEl(), { 'aria-label': me.collapseText });
        }
    },

    onCollapse: function() {
        var me = this;
        
        me.callParent(arguments);
        
        me.ariaUpdate({ 'aria-expanded': false });
        
        if (me.collapseTool) {
            me.ariaUpdate(me.collapseTool.getEl(), { 'aria-label': me.expandText });
        }
    }
});
