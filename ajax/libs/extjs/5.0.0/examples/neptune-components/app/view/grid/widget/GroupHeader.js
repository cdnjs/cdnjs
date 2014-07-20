Ext.define('Neptune.view.grid.widget.GroupHeader', {
    extend: 'Neptune.view.grid.widget.Basic',
    xtype: 'groupHeaderGrid',

    title: 'Group Header Grid',
    
    constructor: function(cfg) {
        var priceColumns;

        this.columns = Ext.Array.clone(this.columns);
            
        priceColumns = this.columns.splice(1, 3);

        this.columns.splice(1, 0, { text: 'Stock Price', columns: priceColumns });
        this.callParent(arguments);
    }
});