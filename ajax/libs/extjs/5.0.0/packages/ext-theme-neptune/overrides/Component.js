Ext.define('ExtThemeNeptune.Component', {
    override: 'Ext.Component',

    initComponent: function() {
        this.callParent();

        if (this.dock && this.border === undefined) {
            this.border = false;
        }
    },

    privates: {
        initStyles: function () {
            var me = this,
                hasOwnBorder = me.hasOwnProperty('border'),
                border = me.border;

            if (me.dock) {
                // prevent the superclass method from setting the border style.  We want to
                // allow dock layout to decide which borders to suppress.
                me.border = null;
            }
            me.callParent(arguments);

            if (hasOwnBorder) {
                me.border = border;
            } else {
                delete me.border;
            }
        }
    }
});
