/**
 * This example demonstrates using a custom paging display.
 */
Ext.define('KitchenSink.view.grid.SlidingPager', {
    extend: 'Ext.grid.Panel',
    
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging',
        'Ext.ux.SlidingPager',
        'KitchenSink.model.Company'
    ],
    xtype: 'sliding-pager',
    
    //<example>
    exampleTitle: 'Sliding Pager Extension',
    otherContent: [{
        type: 'Model',
        path: 'app/model/Company.js'
    }],
    themes: {
        classic: {
            width: 600,
            percentChangeColumnWidth: 75,
            lastUpdatedColumnWidth: 85
        },
        neptune: {
            width: 650,
            percentChangeColumnWidth: 100,
            lastUpdatedColumnWidth: 115
        }
    },
    //</example>
    
    height: 460,
    width: 600,
    frame: true,
    title: 'Sliding Pager',
    
    initComponent: function(){
        this.width = this.themeInfo.width;
        var store = new Ext.data.Store({
            model: KitchenSink.model.Company,
            remoteSort: true,
            pageSize: 10,
            proxy: {
                type: 'memory',
                enablePaging: true,
                data: KitchenSink.data.DataSets.company,
                reader: {
                    type: 'array'
                }
            }
        });
        
        Ext.apply(this, {
            store: store,
            columns: [{ 
                text: 'Company',
                sortable: true,
                dataIndex: 'name',
                flex: 1
            },{
                text: 'Price',
                sortable: true,
                formatter: 'usMoney',
                dataIndex: 'price',
                width: 75
            },{
                text: 'Change',
                sortable: true,
                renderer: this.changeRenderer,
                dataIndex: 'change',
                width: 80
            },{
                text: '% Change',
                sortable: true,
                renderer: this.pctChangeRenderer,
                dataIndex: 'pctChange',
                width: this.themeInfo.percentChangeColumnWidth
            },{
                text: 'Last Updated',
                sortable: true,
                dataIndex: 'lastChange',
                width: this.themeInfo.lastUpdatedColumnWidth,
                formatter: 'date("m/d/Y")'
            }],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: store,
                displayInfo: true,
                plugins: new Ext.ux.SlidingPager()
            }
        });
        this.callParent();
    },
    
    afterRender: function(){
        this.callParent(arguments);
        this.getStore().load();
    },
    
    changeRenderer: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if(val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    },
    
    pctChangeRenderer: function(val){
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if(val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }
});
