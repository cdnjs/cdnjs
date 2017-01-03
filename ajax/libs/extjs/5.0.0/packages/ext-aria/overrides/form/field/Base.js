Ext.define('Ext.aria.form.field.Base', {
    override: 'Ext.form.field.Base',
    
    requires: [
        'Ext.util.Format',
        'Ext.aria.Component'
    ],

    /**
     * @cfg {String} formatText The text to use for the field format announcement
     * placed in the `title` attribute of the input field. This format will not
     * be used if the title attribute is configured explicitly.
     */

    ariaRenderAttributesToElement: false,
    msgTarget: 'side', // use this scheme because it is the only one working for now

    getSubTplData: function() {
        var me = this,
            fmt = Ext.util.Format.attributes,
            data, attrs;
        
        data  = me.callParent();
        attrs = me.ariaGetRenderAttributes();
        
        // Role is rendered separately
        delete attrs.role;
        
        data.inputAttrTpl = [data.inputAttrTpl, fmt(attrs)].join(' ');
        
        return data;
    },
    
    ariaGetEl: function() {
        return this.inputEl;
    },
    
    ariaGetRenderAttributes: function() {
        var me = this,
            readOnly = me.readOnly,
            formatText = me.formatText,
            attrs;
        
        attrs = me.callParent();

        if (readOnly != null) {
            attrs['aria-readonly'] = !!readOnly;
        }
        
        if (formatText && !attrs.title) {
            attrs.title = Ext.String.format(formatText, me.format);
        }
        
        return attrs;
    },

    ariaGetAfterRenderAttributes: function() {
        var me = this,
            labelEl = me.labelEl,
            attrs;
        
        attrs = me.callParent();

        if (labelEl) {
            attrs['aria-labelledby'] = labelEl.id;
        }
        
        return attrs;
    },

    setReadOnly: function(readOnly) {
        var me = this;
        
        me.callParent(arguments);
        
        me.ariaUpdate({ 'aria-readonly': readOnly });
    },

    markInvalid: function(f, isValid) {
        var me = this;
        
        me.callParent(arguments);
        
        me.ariaUpdate({ 'aria-invalid': true });
    },

    clearInvalid: function() {
        var me = this;
        
        me.callParent(arguments);
        
        me.ariaUpdate({ 'aria-invalid': false });
    }
});
