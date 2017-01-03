Ext.define('Aria.view.Panel', {
    extend:'Ext.panel.Panel',
    alias:'widget.mysimplepanel',
    title:'Content Panel',
    items:[
        {
            xtype:'panel',
            title:'Panel',
            collapsible:true,
            bodyPadding:12,
            width:300,
            height:150,
            header:true,
            html:'A simple Panel',
            dockedItems:{
                dock:'bottom',
                items:[
                    {
                        xtype:'button',
                        text:'Click Me'
                    }]
            },
            tools:[
                {
                    type:'refresh',
                    tooltip:'Refresh form Data',
                    // hidden:true,
                    handler:function (event, toolEl, panel) {
                        // refresh logic
                    }
                },
                {
                    type:'help',
                    tooltip:'Get Help',
                    handler:function (event, toolEl, panel) {
                        // show help here
                    }
                }]
        }
    ]
});