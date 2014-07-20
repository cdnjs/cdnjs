Ext.define('Ext.rtl.layout.container.boxOverflow.Scroller', {
    override: 'Ext.layout.container.boxOverflow.Scroller',

    getWheelDelta: function(e) {
        var layout = this.layout,
            delta = e.getWheelDelta();

        if (layout.direction === 'horizontal' && layout.owner.getInherited().rtl) {
            delta = -delta;
        }

        return delta;
    }
});
