Ext.define('Ext.aria.button.Cycle', {
    override: 'Ext.button.Cycle'
    
    //<debug>
    , constructor: function(config) {
        // Don't warn if we're under the slicer
        if (!Ext.theme) {
            Ext.log.warn(
                "Using Cycle buttons is not recommended in WAI-ARIA " +
                "compliant applications, because their behavior conflicts " +
                "with accessibility best practices. See WAI-ARIA 1.0 " +
                "Authoring guide: http://www.w3.org/TR/wai-aria-practices/#menubutton"
            );
        }
        
        this.callParent(arguments);
    }
    //</debug>
});
