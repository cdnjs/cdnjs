Ext.define('Ext.aria.button.Split', {
    override: 'Ext.button.Split'
    
    //<debug>
    , constructor: function(config) {
        var ownerCt = config.ownerCt;
        
        // Warn unless the button belongs to a date picker,
        // the user can't do anything about that
        // Also don't warn if we're under the slicer
        if (!Ext.theme && (!ownerCt || !ownerCt.isDatePicker)) {
            Ext.log.warn(
                "Using Split buttons is not recommended in WAI-ARIA " +
                "compliant applications, because their behavior conflicts " +
                "with accessibility best practices. See WAI-ARIA 1.0 " +
                "Authoring guide: http://www.w3.org/TR/wai-aria-practices/#menubutton"
            );
        }
        
        this.callParent(arguments);
    }
    //</debug>
});
