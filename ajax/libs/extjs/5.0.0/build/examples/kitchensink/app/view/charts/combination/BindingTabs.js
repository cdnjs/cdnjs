/**
 * This example shows how to use data binding to attach stores to charts.
 * Each tab uses the same dataset from the ViewModel.
 */
Ext.define('KitchenSink.view.charts.combination.BindingTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'combination-bindingtabs',

    width: 650,
    height: 500,

    viewModel: {
        stores: {
            priceData: {
                fields: ['month', 'price'],
                data: [
                    { month: 'Jan', price: 28 },
                    { month: 'Feb', price: 25 },
                    { month: 'Mar', price: 21 },
                    { month: 'Apr', price: 18 },
                    { month: 'May', price: 18 },
                    { month: 'Jun', price: 17 },
                    { month: 'Jul', price: 16 },
                    { month: 'Aug', price: 16 },
                    { month: 'Sep', price: 16 },
                    { month: 'Oct', price: 16 },
                    { month: 'Nov', price: 15 },
                    { month: 'Dec', price: 15 }
                ]
            }
        }
    },

    items: [{
        title: 'Line Chart',
        layout: 'fit',
        items: {
            xtype: 'cartesian',
            //animation: false,
            bind: '{priceData}',
            insetPadding: 40,
            innerPadding: {
                left: 40,
                right: 40
            },
            interactions: 'itemhighlight',
            axes: [{
                type: 'numeric',
                fields: 'price',
                position: 'left',
                grid: true,
                minimum: 0,
                maximum: 30,
                renderer: Ext.util.Format.usMoney,
                title: 'Price'
            }, {
                type: 'category',
                fields: 'month',
                position: 'bottom',
                grid: true,
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
            series: [{
                type: 'line',
                xField: 'month',
                yField: 'price',
                marker: {
                    radius: 4
                },
                label: {
                    field: 'price',
                    display: 'over'
                },
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                    showDelay: 0,
                    dismissDelay: 0,
                    hideDelay: 0,
                    renderer: function(storeItem, item) {
                        this.setHtml(storeItem.get('month') + ': ' + Ext.util.Format.usMoney(storeItem.get('price')));
                    }
                }
            }]
        }
    }, {
        title: 'Bar Chart',
        layout: 'fit',
        items: {
            xtype: 'cartesian',
            //animation: false,
            bind: '{priceData}',
            insetPadding: 40,
            interactions: 'itemhighlight',
            axes: [{
                type: 'numeric',
                position: 'left',
                renderer: Ext.util.Format.usMoney,
                minimum: 0,
                maximum: 30,
                title: 'Price'
            }, {
                type: 'category',
                position: 'bottom',
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
            series: {
                type: 'bar',
                axis: 'left',
                xField: 'month',
                yField: 'price',
                style: {
                    minGapWidth: 20
                },
                highlight: {
                    strokeStyle: 'black',
                    fillStyle: '#c1e30d',
                    lineDash: [5, 3]
                },
                label: {
                    field: 'price',
                    display: 'insideEnd',
                    renderer: Ext.util.Format.usMoney
                }
            }
        }
    }, {
        title: 'Radial',
        layout: 'fit',
        items: {
            xtype: 'polar',
            animation: false,
            interactions: ['rotate', 'itemhighlight'],
            bind: '{priceData}',
            insetPadding: 40,
            axes: [{
                type: 'numeric',
                position: 'radial',
                fields: 'price',
                renderer: Ext.util.Format.usMoney,
                grid: true,
                minimum: 0,
                maximum: 30,
                majorTickSteps: 4,
                title: 'Price'
            }, {
                type: 'category',
                position: 'angular',
                grid: true
            }],
            series: [{
                type: 'radar',
                xField: 'month',
                yField: 'price',
                style: {
                    opacity: 0.80
                },
                marker: {
                    type: 'circle',
                    radius: 4
                }
            }]
        }
    }]
});