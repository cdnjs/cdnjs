$Manifest = {
    widgets: [
        {
            xtype: 'widget.menu',
            folder: 'menu',
            delegate: '.x-menu-item-link',
            filename: 'menu-item-active',
            config: {
                floating: false,
                width: 200,
                items: [
                    {
                        text: 'test',
                        cls: 'x-menu-item-active'
                    }
                ]
            }
        },

        {
            xtype: 'widget.button',
            ui: 'default'
        },

        {
            xtype: 'widget.toolbar',
            ui: 'default'
        },

        {
            xtype: 'widget.panel',
            ui: 'default'
        },

        {
            xtype: 'widget.header',
            ui: 'default'
        },

        {
            xtype: 'widget.window',
            ui: 'default'
        },

        {
            xtype: 'widget.tab',
            ui: 'default'
        },

        {
            xtype: 'widget.progressbar',
            ui: 'default'
        },

        {
            xtype: 'widget.buttongroup',
            ui: 'default'
        },

        //tips
        {
            xtype: 'widget.tooltip',
            filename: 'tip',
            config: {
                width: 100,
                height: 40,
                setup: function(component, ct) {
                    component.render(ct);
                    component.showBy(ct);
                    ct.setHeight(component.height);
                },
                hide: function(){}
            }
        },
        {
            xtype: 'widget.tooltip',
            folder: 'form-invalid-tip',
            filename: 'form-invalid-tip',
            config: {
                baseCls: Ext.baseCSSPrefix + 'form-invalid-tip',
                width: 100,
                height: 40,
                setup: function(component, ct) {
                    component.render(ct);
                    component.showBy(ct);
                    ct.setHeight(component.height);
                },
                hide: function(){}
            }
        },

        /**
         * Grid column header backgrounds
         */
        {
            xtype: 'widget.gridcolumn',
            folder: 'grid',
            filename: 'column-header',
            config: {
                text: 'test',
                //hack for 4.0.5
                up: function(which) {
                    if (which == "tablepanel") {
                        return {
                            sortableColumns: true
                        };
                    }
                },
                afterRender: function() {
                    var me = this,
                        el = me.el;

                    el.addCls(Ext.baseCSSPrefix + 'column-header-align-' + me.align).addClsOnOver(me.overCls);

                    el.setStyle({
                        position: 'relative'
                    });
                }
            }
        },
        {
            xtype: 'widget.gridcolumn',
            folder: 'grid',
            filename: 'column-header-over',
            config: {
                text: 'test',
                //hack for 4.0.5
                up: function(which) {
                    if (which == "tablepanel") {
                        return {
                            sortableColumns: true
                        };
                    }
                },
                afterRender: function() {
                    var me = this,
                        el = me.el;

                    el.addCls(Ext.baseCSSPrefix + 'column-header-align-' + me.align).addClsOnOver(me.overCls);

                    el.setStyle({
                        position: 'relative'
                    });
                    el.addCls('x-column-header-over');
                }
            }
        },

        /**
         * Grid special cell background
         */
        // {
        //     xtype: 'widget.gridpanel',
        //     folder: 'grid',
        //     filename: 'cell-special',
        //     delegate: '.x-grid-cell-special',
        //     config: {
        //         selModel: Ext.create('Ext.selection.CheckboxModel'),
        //         store: Ext.create('Ext.data.ArrayStore', {
        //             fields: ['text'],
        //             data: [['my text']]
        //         }),
        //         columns: [
        //             {
        //                 text: 'Title',
        //                 flex: 1,
        //                 dataIndex: 'text'
        //             }
        //         ],
        //         width: 400,
        //         height: 100,
        //         title: 'Panel'
        //     }
        // },
        // {
        //     xtype: 'widget.gridpanel',
        //     folder: 'grid',
        //     filename: 'cell-special-selected',
        //     delegate: '.x-grid-cell-special',
        //     cls: 'x-grid-row-selected',
        //     config: {
        //         selModel: Ext.create('Ext.selection.CheckboxModel'),
        //         store: Ext.create('Ext.data.ArrayStore', {
        //             fields: ['text'],
        //             data: [['my text']]
        //         }),
        //         columns: [
        //             {
        //                 text: 'Title',
        //                 flex: 1,
        //                 dataIndex: 'text'
        //             }
        //         ],
        //         width: 400,
        //         height: 100,
        //         title: 'Panel'
        //     }
        // },

        /**
         * DatePicker
         */
        {
            xtype: 'widget.datepicker',
            folder: 'datepicker',
            filename: 'datepicker-header',
            delegate: '.x-datepicker-header'
        },
        {
            xtype: 'widget.datepicker',
            folder: 'datepicker',
            filename: 'datepicker-footer',
            delegate: '.x-datepicker-footer'
        }
    ]
};
