/**
 * This example shows how to create Widgets in grid columns. Widgets are lightweight
 * components with a simpler lifecycle.
 */
Ext.define('KitchenSink.view.grid.WidgetGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action',
        'Ext.ProgressBarWidget',
        'Ext.slider.Widget',
        'Ext.sparkline.*'
    ],
    xtype: 'widget-grid',
    store: 'Widgets',
    collapsible: true,
    height: 350,
    width: 1050,
    title: 'Widget Grid',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: false,
        markDirty: false
    },
    trackMouseOver: false,
    disableSelection: true,
    //<example>
    otherContent: [{
        type: 'Store',
        path: 'app/store/Widgets.js'
    },{
        type: 'Model',
        path: 'app/model/Widget.js'
    }],
    //</example>

    initComponent: function () {
        var me = this;

        me.columns = [{
            text: 'Button',
            width: 105,
            xtype: 'widgetcolumn',
            dataIndex: 'progress',
            widget: {
                width: 90,
                xtype: 'splitbutton',
                icon: '../shared/icons/fam/feed_add.png',
                handler: function(btn) {
                    var rec = btn.getWidgetRecord();
                    Ext.Msg.alert("Button clicked", "Hey! " + rec.get('name'));
                }
            }
        }, {
            text     : 'Progress',
            xtype    : 'widgetcolumn',
            width    : 120,
            dataIndex: 'progress',
            widget: {
                xtype: 'progressbarwidget',
                textTpl: [
                    '{percent:number("0")}% done'
                ]
            }
        }, 
        {
            text: 'Run Mode',
            width: 150,
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'combo',
                store: [
                    'Local',
                    'Remote'
                ],
                listeners: {
                    select: function(combo){
                        console.log(combo.getValue() + ' selected');
                    }
                }
            }
        },
        {
            text     : 'Slider',
            xtype    : 'widgetcolumn',
            width    : 120,
            dataIndex: 'progress',
            widget: {
                xtype: 'sliderwidget',
                minValue: 0,
                maxValue: 1,
                decimalPrecision: 2,
                listeners: {
                    change: function(slider, value) {

                        // If the widget has been decorated by the WidgetColumn with context-returning methods
                        // then extract data and update its context record.
                        if (slider.getWidgetRecord) {
                            var rec = slider.getWidgetRecord();
                            if (rec) {
                                rec.set('progress', value);
                            }
                        }
                    }
                }
            }
        }, {
            text: 'Line',
            width: 100,
            dataIndex: 'sequence1',
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'sparklineline',
                tipTpl: 'Value: {y:number("0.00")}'
            }
        }, {
            text: 'Bar',
            width: 100,
            dataIndex: 'sequence2',
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'sparklinebar'
            }
        }, {
            text: 'Discrete',
            width: 100,
            dataIndex: 'sequence3',
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'sparklinediscrete'
            }
        }, {
            text: 'Bullet',
            width: 100,
            dataIndex: 'sequence4',
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'sparklinebullet'
            }
        }, {
            text: 'Pie',
            width: 60,
            dataIndex: 'sequence5',
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'sparklinepie'
            }
        }, {
            text: 'Box',
            width: 100,
            dataIndex: 'sequence6',
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'sparklinebox'
            }
        }, {
            text: 'TriState',
            width: 100,
            dataIndex: 'sequence7',
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'sparklinetristate'
            }
        }];

        me.tbar = [];
        for (var i = 0; i < me.columns.length; i++) {
            me.tbar.push({
                text: me.columns[i].text,
                enableToggle: true,
                pressed: true,
                scope: me,
                toggleHandler: me.onToggle
            });
        }

        me.callParent();
    },

    onToggle: function(btn, pressed) {
        var header = this.headerCt.child('[text=' + btn.text + ']');
        header.setVisible(pressed);
    }
});