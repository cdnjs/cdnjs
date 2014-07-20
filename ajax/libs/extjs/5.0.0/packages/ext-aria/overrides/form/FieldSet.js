Ext.define('Ext.aria.form.FieldSet', {
    override: 'Ext.form.FieldSet',
    
    requires: [
        'Ext.aria.container.Container'
    ],
    
    expandText: 'Expand',
    collapseText: 'Collapse',

    onBoxReady: function () {
        var me = this,
            checkboxCmp = me.checkboxCmp,
            toggleCmp = me.toggleCmp,
            legend = me.legend,
            el;

        me.callParent(arguments);

        if (!legend) {
            return;
        }

        // mark the legend and the checkbox or drop down inside the legend immune to collapse
        // so when they get focus, isVisible(deep) will not return true for them when the fieldset is collapsed
        legend.collapseImmune = true;
        legend.getInherited().collapseImmune = true;

        if (checkboxCmp) {
            checkboxCmp.collapseImmune = true;
            checkboxCmp.getInherited().collapseImmune = true;
            checkboxCmp.getActionEl().set({
                title: me.expandText + ' ' + me.title
            });
        }

        if (toggleCmp) {
            toggleCmp.collapseImmune = true;
            toggleCmp.getInherited().collapseImmune = true;

            // The toggle component is missing a key map to respond to enter and space
            toggleCmp.keyMap = new Ext.util.KeyMap({
                target: toggleCmp.el,
                key: [
                    Ext.event.Event.ENTER,
                    Ext.event.Event.SPACE
                ],
                handler: function(key, e, eOpt) {
                    e.stopEvent();
                    me.toggle();
                },
                scope: me
            });
            
            el = toggleCmp.getActionEl();

            if (me.collapsed) {
                el.set({ title: me.expandText + ' ' + me.title });
            }
            else {
                el.set({ title: me.collapseText + ' ' + me.title });
            }
        }
    },

    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent(arguments);

        attrs['aria-expanded'] = !me.collapsed;
        
        return attrs;
    },

    setExpanded: function(expanded) {
        var me = this,
            toggleCmp = me.toggleCmp,
            el;

        me.callParent(arguments);
        me.ariaUpdate({ 'aria-expanded': expanded });
        
        // Update the title
        if (toggleCmp) {
            el = toggleCmp.getActionEl();
            
            if (!expanded) {
                el.set({ title: me.expandText + ' ' + me.title });
            }
            else {
                el.set({ title: me.collapseText + ' ' + me.title });
            }
        }
    }
});
