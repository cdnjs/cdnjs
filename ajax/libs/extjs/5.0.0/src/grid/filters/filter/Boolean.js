/**
 * Boolean filters use unique radio group IDs (so you can have more than one!)
 */
Ext.define('Ext.grid.filters.filter.Boolean', {
    extend: 'Ext.grid.filters.filter.SingleFilter',
    alias: 'grid.filter.boolean',

    type: 'boolean',

    operator: '=',

    /**
     * @cfg {Boolean} defaultValue
     * Set this to null if you do not want either option to be checked by default. Defaults to false.
     */
    defaultValue: false,

    /**
     * @cfg {String} yesText
     * Defaults to 'Yes'.
     */
    yesText: 'Yes',

    /**
     * @cfg {String} noText
     * Defaults to 'No'.
     */
    noText: 'No',

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    createMenu: function (config) {
        var me = this,
            gId = Ext.id(),
            listeners = {
                scope: me,
                click: me.onClick
            },
            itemDefaults = me.getItemDefaults();

        me.callParent(arguments);

        me.menu.add([Ext.apply({
            text: me.yesText,
            filterKey: 1,
            group: gId,
            checked: !!me.defaultValue,
            listeners: listeners
        }, itemDefaults), Ext.apply({
            text: me.noText,
            filterKey: 0,
            group: gId,
            checked: !me.defaultValue,
            listeners: listeners
        }, itemDefaults)]);
    },

    /**
     * @private
     */
    onClick: function (field) {
        this.setValue(!!field.filterKey);
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter.
     */
    setValue: function (value) {
        var me = this;

        me.filter.setValue(value);

        if (value !== undefined && me.active) {
            me.updateStoreFilter(me.filter);
        } else {
            me.setActive(true);
        }
    },

    // This is supposed to be just a stub.
    activateMenu: Ext.emptyFn
});
