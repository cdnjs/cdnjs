Ext.define('ChartsKitchenSink.view.charts.gauge.Basic', {
    extend: 'Ext.Panel',
    xtype: 'basic-gauge',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },

    exampleDescription: [
        'A sample set of gauges displaying different configurations bound to data in a store.'
    ],

    themes: {
        classic: {
            percentChangeColumn: {
                width: 75
            }
        },
        neptune: {
            percentChangeColumn: {
                width: 100
            }
        }
    },
    // </example>

    initComponent: function() {
        var me = this;

        this.myDataStore = Ext.create('Ext.data.JsonStore', {
            fields: ['mph', 'fuel', 'temp', 'rpm' ],
            data: [
                { mph: 65, fuel: 50, temp: 150, rpm: 6000 }
            ]
        });

        //<example>
        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
            {
                text: 'Save Chart',
                handler: function() {
                    Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the first gauge as an image?', function(choice){
                        if(choice === 'yes'){
                            me.down('chart').save({
                                type: 'image/png'
                            });
                        }
                    });

                }
            }]
        }];
        //</example>

        me.fuelpump = Ext.create('Ext.draw.Sprite', {
            scale: {
                x: 0.25,
                y: 0.25
            },
            translate: {
                x: 112,
                y: 120
            },
            type: 'path',
            fill: 'black',
            stroke: 'black',
            path: "m9.21399,0c-5.07404,0 -9.21399,3.43396 -9.21399,7.62198l0,80.2005l44.935,0.6257l0.05701,-46.8692l8.47498,0c1.94702,0 3.526,1.29001 3.526,2.901l0,35.32199c0,4.7373 5.383,8.87372 11.48999,8.87372c5.76801,0 12.172,-3.78342 12.172,-8.87372c-0.08801,-1.18399 -4.664,-22.23999 -4.664,-22.23999c0,-0.048 -0.96698,-5.91501 -0.96698,-5.91501l0,-26.90399c0,-2.88098 -1.16602,-5.258 -3.526,-7.224l-15.01703,-12.40002c-1.03198,0 -3.92395,2.38904 -3.92395,2.38904c0,0.867 7.45099,6.996 7.45099,6.996l-0.22803,10.46597c0,3.70001 3.63501,6.71201 8.13403,6.71201l2.04797,0l-0.73999,19.965l1.02399,6.88202l4.55103,20.19299c0.17596,3.28369 -3.45203,5.2327 -6.31403,5.2327c-2.64099,0 -5.745,-1.82098 -5.745,-4.15271l0.05701,-35.379c0,-4.30899 -4.25,-7.79199 -9.44202,-7.79199l-9.04401,0c0.63403,-0.03699 0.62604,-23.23599 0.62604,-28.15601l0,-0.853c0,-4.18802 -4.09802,-7.62198 -9.15802,-7.62198l-26.56299,0l0,0zm0,5.517l26.56299,0c1.41602,0 2.50299,0.94498 2.50299,2.10498l0,18.48599c0,1.172 -1.08698,2.048 -2.50299,2.048l-26.56299,0c-1.43103,0 -2.50201,-0.87601 -2.50201,-2.048l0,-18.48599c0,-1.16 1.07098,-2.10498 2.50201,-2.10498zm55.401,14.84598c0,0 2.25598,0.39001 2.78699,0.51202c1.09198,0.23196 1.79102,1.59097 1.82001,2.78699c0.02997,1.20901 0,4.83499 0,4.83499c-3.34802,-0.61099 -4.60699,-2.03799 -4.60699,-3.35602l0,-4.77798z"
        });

        me.items = [{
            xtype: 'panel',
            width: '100%',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'chart',
                height: 240,
                width: 300,
                padding: '10 0 0 0',
                style: 'background: #fff',
                animate: true,
                shadow: false,
                store: this.myDataStore,
                insetPadding: 40,
                items: [{
                    type  : 'text',
                    text  : 'Gauge Charts - Basic',
                    font  : '22px Helvetica',
                    width : 100,
                    height: 30,
                    x : 40, //the sprite x position
                    y : 12  //the sprite y position
                }],
                axes: [{
                    title: 'MPH',
                    type: 'gauge',
                    position: 'gauge',
                    maximum: 120,
                    steps: 12,
                    margin: 10
                }],
                series: [{
                    type: 'gauge',
                    field: 'mph',
                    needle: true,
                    donut: 30,
                    colorSet: [ '#FFFFFF', '#FFFF00'],
                    renderer: function(sprite, record, attributes, index, store) {
                        return attributes;
                    }
                }],
                listeners: {
                    'resize': function(chart, w, h, ow, oh, eOpts) {
                        var newX = w/2 + 3,
                            newY = h - 73;
                        if (!me.button1) {
                            return;
                        }
                        //console.log(' i am resized from ' + ow + ' ' + oh + ' to ' + w + ' ' + h);
                        me.button1.setAttributes({
                            translate: {
                                x: newX,
                                y: newY
                            }
                        }, true);
                    }
                }
            }, {
                xtype: 'chart',
                height: 240,
                width: 300,
                padding: '10 0 0 0',
                style: 'background: #fff',
                animate: true,
                store: this.myDataStore,
                insetPadding: 40,
                items: [
                    me.fuelpump
                ],
                axes: [{
                    title: 'Fuel',
                    type: 'gauge',
                    position: 'gauge',
                    maximum: 100,
                    steps: 4,
                    margin: 10,
                    label: {
                        renderer: function(v) {
                            if (v === 0) {
                                return 'E';
                            }
                            if (v === 25) {
                                return '1/4';
                            }
                            if (v === 50) {
                                return '1/2';
                            }
                            if (v === 75) {
                                return '3/4';
                            }
                            if (v === 100) {
                                return 'F';
                            }
                            return ' ';
                        }
                    }
                }],
                series: [{
                    type: 'gauge',
                    field: 'fuel',
                    donut: 50
                }]
            }]
        }, {
            xtype: 'panel',
            width: '100%',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'chart',
                height: 240,
                width: 300,
                padding: '10 0 0 0',
                style: 'background: #fff',
                animate: true,
                shadow: false,
                store: this.myDataStore,
                insetPadding: 40,
                axes: [{
                    title: 'Temp',
                    type: 'gauge',
                    position: 'gauge',
                    maximum: 250,
                    steps: 1,
                    margin: 10,
                    label: {
                        renderer: function(v) {
                            if (v === 0) {
                                return 'C';
                            }
                            if (v === 250) {
                                return 'H';
                            }
                            return ' ';
                        }
                    }
                }],
                series: [{
                    type: 'gauge',
                    field: 'temp',
                    donut: 50
                }]
            }, {
                xtype: 'chart',
                height: 240,
                width: 300,
                padding: '10 0 0 0',
                style: 'background: #fff',
                animate: true,
                shadow: false,
                store: this.myDataStore,
                insetPadding: 40,
                axes: [{
                    title: 'RPM',
                    type: 'gauge',
                    position: 'gauge',
                    maximum: 8000,
                    steps: 8,
                    margin: 10,
                    label: {
                        renderer: function(v) {
                            return (v/1000) + 'k';
                        }
                    }
                }],
                series: [{
                    type: 'gauge',
                    field: 'rpm',
                    donut: 30
                }]
            }]
        }];

        this.callParent();
    }
});
