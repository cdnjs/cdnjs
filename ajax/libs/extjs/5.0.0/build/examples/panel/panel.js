Ext.require([
    '*'
]);

Ext.onReady(function() {
    var html = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, '+
    'porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, '+
    'lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis '+
    'vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.<br/><br/>'+
    'Aliquam commodo ullamcorper erat. Nullam vel justo in neque porttitor laoreet. Aenean lacus dui, consequat eu, adipiscing '+
    'eget, nonummy non, nisi. Morbi nunc est, dignissim non, ornare sed, luctus eu, massa. Vivamus eget quam. Vivamus tincidunt '+
    'diam nec urna. Curabitur velit. Lorem ipsum dolor sit amet.</p>';
    
    var configs = [{
        title: 'Basic Panel',
        collapsible:true,
        width:400,
        html: html
    },{
        width: 320,
        height: 320,
        title: 'Masked Panel with a really long title',
        bodyStyle: "padding: 5px;",
        html: 'Some content',
        collapsible: true,
        collapseDirection: Ext.Component.DIRECTION_LEFT,
        listeners: {
            render: function(p){
                p.body.mask('Loading...');
            },
            delay: 50
        }    
    },{
        width: 150,
        height: 150,
        unstyled: true,
        title: 'Panel with unstyled:true',
        bodyPadding: 0,
        html: 'Some content'
    },{
        width: 150,
        height: 150,
        border: false,
        frame: true,
        title: 'Panel with border:false',
        html: 'Some content'
    },{
        title: 'Framed panel: Width 280/Height 180',
        html: html,
        collapsible: true,
        frame: true,
        autoScroll: true,
        width: 280,
        height: 180
    },{
        title : 'Panel as child',
        width : 500,
        height: 400,
        layout: 'fit',
        bodyStyle: 'padding:5px',
        items: [
            {
                xtype: 'panel',
                border: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        html: 'top, with no title',
                        height: 100,
                        margin: '0 0 5 0'
                    },{
                        xtype: 'panel',
                        title: 'test',
                        html: 'bottom',
                        flex: 1
                    }
                ]
            }
        ]
    },{
        title : 'Framed panel as child',
        width : 300,
        manageHeight: false,
        html  : null,
        layout: 'fit',
        items: [
            {
                xtype: 'panel',
                manageHeight: false,
                title: 'Framed panel',
                html : '123',
                frame: true
            }
        ]
    },{
        title : 'Framed panel with normal child',
        width : 300,
        manageHeight: false,
        html  : null,
        frame: true,
        layout: 'fit',
        items: [
            {
                xtype: 'panel',
                manageHeight: false,
                title: 'Non-framed child',
                html : 'Hello'
            }
        ]
    },{
        title: 'Width 180/No Height',
        animCollapse: true,
        collapsible: true,
        width: 180,
        html: html
    }];
    
    Ext.each(configs, function(config) {
        var element = Ext.getBody().createChild({cls: 'panel-container'});
        
        Ext.widget('panel', Ext.applyIf(config, {
            renderTo: element,
            bodyPadding: 7
        }));
    });
});

