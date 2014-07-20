/**
 * Filter type for {@link Ext.grid.column.Number number columns}.
 */
Ext.define('Ext.grid.filters.filter.Number', {
    extend: 'Ext.grid.filters.filter.TriFilter',
    alias: ['grid.filter.number', 'grid.filter.numeric'],

    uses: ['Ext.form.field.Number'],

    type: 'number',

    config: {
        /**
         * @cfg {Object} [fields]
         * Configures field items individually. These properties override those defined
         * by `{@link #itemDefaults}`.
         *
         * Example usage:
         *
         *      fields: {
         *          // Override itemDefaults for one field:
         *          gt: {
         *              width: 200
         *          }
         *
         *          // "lt" and "eq" fields retain all itemDefaults
         *      },
         */
        fields: {
            gt: {
                iconCls: Ext.baseCSSPrefix + 'grid-filters-gt',
                margin: '0 0 3px 0'
            },
            lt: {
                iconCls: Ext.baseCSSPrefix + 'grid-filters-lt',
                margin: '0 0 3px 0'
            },
            eq: {
                iconCls: Ext.baseCSSPrefix + 'grid-filters-eq',
                margin: 0
            }
        }
    },

    itemDefaults: {
        xtype: 'numberfield',
        emptyText: 'Enter Number...',
        enableKeyEvents: true,
        hideEmptyLabel: false,
        labelSeparator: '',
        labelWidth: 29,
        selectOnFocus: false
    },

    menuDefaults: {
        // A menu with only form fields needs some body padding. Normally this padding
        // is managed by the items, but we have no normal menu items.
        bodyPadding: 3,
        showSeparator: false
    },

    /**
     * @private
     * See the Date type for a full implementation.
     */
    convertValue: Ext.identityFn,

    createMenu: function () {
        var me = this,
            listeners = {
                scope: me,
                keyup: {
                    fn: me.onInputKeyUp,
                    buffer: 200
                },
                spin: {
                    fn: me.onInputSpin,
                    buffer: 200
                },
                el: {
                    click: me.stopFn
                }
            },
            itemDefaults = me.getItemDefaults(),
            fields = me.getFields(),
            field, i, len, key, item, cfg;

        me.callParent();

        me.fields = {};

        for (i = 0, len = me.menuItems.length; i < len; i++) {
            key = me.menuItems[i];
            if (key !== '-') {
                field = fields[key];

                cfg = {
                    labelClsExtra: Ext.baseCSSPrefix + 'grid-filters-icon ' + field.iconCls
                };

                if (itemDefaults) {
                    Ext.merge(cfg, itemDefaults);
                }

                Ext.merge(cfg, field);
                delete cfg.iconCls;

                me.fields[key] = item = me.menu.add(cfg);

                item.filter = me.filter[key];
                item.filterKey = key;
                item.on(listeners);
            }
        }
    },

    /**  
     * @private
     * Handler method called when there is a keyup event on an input
     * item of this menu.
     */
    onInputKeyUp: function (field, e) {
        var value;

        if (e.getKey() === e.RETURN && field.isValid()) {
            e.stopEvent();
            this.hide();
        }

        value = {};
        value[field.filterKey] = field.getValue();

        this.setValue(value);
    },


    /**  
     * @private
     * Handler method called when there is a spin event on a NumberField
     * item of this menu.
     */
    onInputSpin: function (field, direction) {
        var value = {};

        value[field.filterKey] = field.getValue();

        this.setValue(value);
    },

    stopFn: function(e) {
        e.stopPropagation();
    }
});
