/**
 * A custom {@link Ext.data.Store} for the {@link Ext.grid.property.Grid}. This class handles the mapping
 * between the custom data source objects supported by the grid and the {@link Ext.grid.property.Property} format
 * used by the {@link Ext.data.Store} base class.
 */
Ext.define('Ext.grid.property.Store', {

    extend: 'Ext.data.Store',

    alternateClassName: 'Ext.grid.PropertyStore',

    remoteSort: true,

    requires: [
        'Ext.grid.property.Reader', 
        'Ext.data.proxy.Memory', 
        'Ext.grid.property.Property'
    ],

    /**
     * Creates new property store.
     * @param {Ext.grid.Panel} grid The grid this store will be bound to
     * @param {Object} source The source data config object
     */
    constructor : function(grid, source){
        var me = this;
        
        me.grid = grid;
        me.source = source;
        me.callParent([{
            data: source,
            model: Ext.grid.property.Property,
            proxy: me.getProxy()
        }]);
    },

    // Return a singleton, customized Proxy object which configures itself with a custom Reader
    getProxy: function() {
        var proxy = this.proxy;
        if (!proxy) {
            proxy = this.proxy = new Ext.data.proxy.Memory({
                model: Ext.grid.property.Property,
                reader: this.getReader()
            });
        }
        return proxy;
    },

    // Return a singleton, customized Reader object which reads Ext.grid.property.Property records from an object.
    getReader: function() {
        var reader = this.reader;
        if (!reader) {
            reader = this.reader = new Ext.grid.property.Reader({
                model: Ext.grid.property.Property
            });
        }
        return reader;
    },

    // @protected
    // Should only be called by the grid.  Use grid.setSource instead.
    setSource : function(dataObject) {
        var me = this;

        me.source = dataObject;
        me.suspendEvents();
        me.removeAll();
        me.getProxy().setData(dataObject);
        me.load();
        me.resumeEvents();
        me.fireEvent('datachanged', me);
        me.fireEvent('refresh', me);
    },

    // @private
    getProperty : function(row) {
       return Ext.isNumber(row) ? this.getAt(row) : this.getById(row);
    },

    // @private
    setValue : function(prop, value, create){
        var me = this,
            rec = me.getRec(prop);
            
        if (rec) {
            rec.set('value', value);
            me.source[prop] = value;
        } else if (create) {
            // only create if specified.
            me.source[prop] = value;
            rec = new Ext.grid.property.Property({name: prop, value: value}, prop);
            me.add(rec);
        }
    },

    // @private
    remove : function(prop) {
        var rec = this.getRec(prop);
        if (rec) {
            this.callParent([rec]);
            delete this.source[prop];
        }
    },

    // @private
    getRec : function(prop) {
        return this.getById(prop);
    },

    // @protected
    // Should only be called by the grid.  Use grid.getSource instead.
    getSource : function() {
        return this.source;
    },

    onDestroy: function() {
        Ext.destroy(this.reader, this.proxy);
        this.callParent();
    }
});