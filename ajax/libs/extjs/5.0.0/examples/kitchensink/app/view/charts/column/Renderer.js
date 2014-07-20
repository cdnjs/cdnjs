/**
 * This example shows how to create a column chart with a renderer to customize colors
 * and use sprites to draw lines and labels.
 */
Ext.define('KitchenSink.view.charts.column.Renderer', {
    extend: 'Ext.Panel',
    xtype: 'column-renderer',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight'
    ],

    layout: 'fit',

    width: 650,
    height: 500,

    tbar: [
        '->',
        {
            text: 'Refresh',
            handler: function () {
                var store = this.up('panel').down('cartesian').getStore();
                store.setData(store.generateData(7));
            }
        }
    ],

    items: [{
        xtype: 'cartesian',
        store: {
            type: 'pie'
        },
        theme: 'Sky',
        background: 'white',
        interactions: [
            {
                type: 'panzoom',
                zoomOnPanGesture: false
            },
            'itemhighlight'
        ],
        series: [
            {
                type: 'bar',
                xField: 'name',
                yField: ['g1'],
                style: {
                    lineWidth: 2,
                    maxBarWidth: 30,
                    stroke: 'dodgerblue',
                    opacity: 0.6
                },
                renderer: function(sprite, config, rendererData, index) {
                    var store = rendererData.store,
                        storeItems = store.getData().items,
                        record = storeItems[index],
                        // diff = record && (record.data['g2'] - record.data['g1']),
                        last = storeItems.length - 1,
                        surface = sprite.getParent(),
                        changes = {},
                        lineSprites, firstColumnConfig, firstData, lastData, growth, string;
                    if (!record) {
                        return;
                    }
                    // Make the first and last columns larger and painted blue.
                    if (index == 0 || index == last) {
                        changes.fillStyle = 'powderblue';
                        changes.x = config.x - config.width * 0.4;
                        changes.y = config.y;
                        changes.width = config.width * 1.8;
                        changes.lineWidth = 4;
                        // Draw a line between the first and last columns
                        lineSprites = surface.myLineSprites;
                        if (!lineSprites) {
                            lineSprites = surface.myLineSprites = [];
                            lineSprites[0] = surface.add({type:'path'});
                            lineSprites[1] = surface.add({type:'text'});
                        }
                        if (index == 0) {
                            surface.myFirstColumnConfig = Ext.clone(changes);
                        } else if (index == last) {
                            firstData = storeItems[0].data['g1'];
                            lastData = storeItems[last].data['g1'];

                            firstColumnConfig = surface.myFirstColumnConfig;
                            var x1 = firstColumnConfig.x + firstColumnConfig.width,
                                y1 = firstColumnConfig.y,
                                x2 = changes.x,
                                y2 = changes.y;
                            lineSprites[0].setAttributes({
                                lineWidth: 1,
                                stroke: 'blue',
                                zIndex: 10000,
                                opacity: 0.4,
                                path: "M" + x2 + " " + y2 + " L" + x1 + " " + y1 + " L" + x2 + " " + y1 + (lastData < firstData ? " L" : " M") + x2 + " " + y2 + " Z"
                            });

                            growth = Math.round(100 * (lastData - firstData) / (firstData || 1));
                            string = (growth > 0 ? "+ " : "- ") + Math.abs(growth) + " %";
                            lineSprites[1].setAttributes({
                                text: string,
                                x: changes.x - 12,
                                y: firstColumnConfig.y + (changes.y - firstColumnConfig.y)/2 + 10,
                                fill: '#00c',
                                fontSize: 20,
                                zIndex: 10000,
                                opacity: 0.6,
                                scalingY: -1,
                                textAlign: "center",
                                rotate: -90
                            });
                        }
                    } else {
                        changes.fillStyle = 'lightgray';
                        changes.lineWidth = 2;
                    }
                    return changes;
                }
            },
            {
                type: 'bar',
                xField: 'name',
                yField: ['g2'],
                style: {
                    lineWidth: 2,
                    maxBarWidth: 12,
                    stroke: 'tomato',
                    fill: 'mistyrose',
                    radius: 20
                },
                renderer: function(sprite, config, rendererData, index) {
                    var store = rendererData.store,
                        storeItems = store.getData().items,
                        last = storeItems.length - 1,
                        record = storeItems[index],
                        diff = record && Math.round(record.data['g2'] - record.data['g1']),
                        changes = {},
                        surface = sprite.getParent(),
                        textSprites, textSprite, rectSprite;
                    if (!record) {
                        return;
                    }
                    // This renderer function draws a red label if series #2 is greater than series #1.
                    // The label displays the difference between the values of series #1 and series #2.
                    //
                    // Note: The two renderer functions in this test case cannot be consolidated. The red labels
                    // are rendered here because they are positioned relatively to the series #2 columns.
                    if (diff > 0) {
                        changes.strokeStyle = 'tomato';
                        changes.fillStyle = 'mistyrose';
                        changes.opacity = 1.0;

                        textSprites = surface.myTextSprites;
                        if (!textSprites) {
                            textSprites = surface.myTextSprites = [];
                        }
                        textSprite = textSprites[index];
                        if (!textSprite) {
                            textSprite = textSprites[index] = surface.add({type:'text'});
                            rectSprite = textSprite.rectSprite = surface.add({type:'rect'});
                        } else {
                            rectSprite = textSprite.rectSprite;
                            textSprite.show();
                            rectSprite.show();
                        }

                        rectSprite.setAttributes({
                            x: config.x + (index == last ? -17 : 16),
                            y: config.y - 36,
                            width: 30 + (diff >= 10 ? (diff >= 100 ? (diff >= 1000 ? 18 : 12) : 6) : 0),
                            height: 18,
                            stroke: 'tomato',
                            fill: 'mistyrose',
                            lineWidth: 1,
                            radius: 4,
                            zIndex: 10000
                        });

                        textSprite.setAttributes({
                            text: "+ " + diff,
                            x: config.x + (index == last ? -11 : 20),
                            y: config.y - 23,
                            fill: 'red',
                            fontSize: 12,
                            zIndex: 10001,
                            scalingY: -1
                        });
                    } else {
                        changes.strokeStyle = 'dodgerblue';
                        changes.fillStyle = 'palegreen';
                        changes.opacity = 0.6;

                        textSprites = surface.myTextSprites;
                        if (textSprites) {
                            textSprite = textSprites[index];
                            if (textSprite) {
                                textSprite.rectSprite.hide();
                                textSprite.hide();
                            }
                        }
                    }
                    return changes;
                }
            }
        ],
        axes: [
            {
                type: 'numeric',
                position: 'left',
                fields: ['g1','g2'],
                minimum: 0
            },
            {
                type: 'category',
                position: 'bottom',
                fields: 'name'
            }
        ]
    }],

    initComponent: function () {
        this.callParent();
        var store = this.down('cartesian').getStore();
        store.setData(store.generateData(7));
    }

});
