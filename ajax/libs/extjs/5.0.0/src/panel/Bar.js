/**
 * Abstract base class for common functionality shared between {@link Ext.panel.Header}
 * and {@link Ext.tab.Bar}
 * @private
 * @abstract
 */
Ext.define('Ext.panel.Bar', {
    extend: 'Ext.container.Container',

    vertical: false,

    _verticalSides: {
        left: 1,
        right: 1
    },

    initComponent: function() {
        var me = this,
            vertical = me.vertical;

        me.dock = me.dock || (vertical ? 'left' : 'top');

        me.layout = Ext.apply(vertical ? {
            type: 'vbox',
            align: 'middle',
            alignRoundingMethod: 'ceil'
        } : {
            type: 'hbox',
            align: 'middle',
            alignRoundingMethod: 'floor'
        }, me.layout);

        this.callParent();
    },

    onAdded: function(container, pos, instanced) {
        this.initOrientation();
        this.callParent([container, pos, instanced]);
    },

    onRemoved: function(destroying) {
        this.removeClsWithUI(this.uiCls);
        this.callParent([destroying]);
    },

    setDock: function(dock) {
        var me = this,
            layout, vertical;

        if (dock !== me.dock) {
            Ext.suspendLayouts();

            me.clearOrientation();

            me.callParent([dock]);

            me.initOrientation();
            
            vertical = me.vertical;
            layout = me.layout;
            layout.setVertical(vertical);
            layout.setAlignRoundingMethod(vertical ? 'ceil' : 'floor');

            Ext.resumeLayouts(true);
        }
    },

    privates: {
        clearOrientation: function() {
            this.removeClsWithUI([
                this.vertical ? 'vertical' : 'horizontal',
                this.getDockName()
            ]);
        },

        getDockName: function() {
            return this.dock;
        },

        initOrientation: function() {
            var me = this,
                dock = me.dock,
                ownerCt = me.ownerCt,
                vertical = me.vertical = (dock ? dock in me._verticalSides : me.vertical);

            me.addClsWithUI([
                this.vertical ? 'vertical' : 'horizontal',
                me.getDockName()
            ]);
        }
    }
});
