Ext.define('Ext.aria.form.field.ComboBox', {
    override: 'Ext.form.field.ComboBox',
    
    requires: [
        'Ext.aria.form.field.Picker'
    ],
    
    createPicker: function() {
        var me = this,
            picker;
        
        picker = me.callParent(arguments);

        if (picker) {
            // update aria-activedescendant whenever the picker highlight changes
            me.mon(picker, {
                highlightitem: me.ariaUpdateActiveDescendant,
                scope: me
            });
        }
        
        return picker;
    },
    
    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent();

        attrs['aria-readonly'] = !!(!me.editable || me.readOnly);
        attrs['aria-expanded'] = !!me.isExpanded;
        attrs['aria-autocomplete'] = "list";
        
        return attrs;
    },

    setReadOnly: function(readOnly) {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({ 'aria-readonly': me.readOnly });
    },

    setEditable: function(editable) {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({ 'aria-readonly': !me.editable });
    },

    onExpand: function() {
        var me = this,
            selected = me.picker.getSelectedNodes();

        me.callParent(arguments);
        me.ariaUpdate({
            'aria-expanded': true,
            'aria-activedescendant': (selected.length ? selected[0].id : undefined)
        });
    },

    onCollapse: function() {
        var me = this;

        me.callParent(arguments);
        me.ariaUpdate({
            'aria-expanded': false,
            'aria-activedescendant': undefined
        });
    },

    ariaUpdateActiveDescendant: function(list) {
        this.ariaUpdate({
            'aria-activedescendant': list.highlightedItem ? list.highlightedItem.id : undefined
        });
    }
});
