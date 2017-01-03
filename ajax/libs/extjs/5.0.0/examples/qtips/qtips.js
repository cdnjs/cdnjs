Ext.require([
    'Ext.tip.*',
    'Ext.Button',
    'Ext.window.MessageBox'
]);

Ext.onReady(function() {
    // Generate the buttons
    var defaultButtonConfig = {
        scale: 'medium',
        style: {
            "margin-right": '10px'
        }
    };
    
    var buttons = [{
            id      : 'tip1',
            text    : 'Basic ToolTip',
            renderTo: 'easiest'
        },{
            id      : 'tip2',
            text    : 'autoHide disabled',
            renderTo: 'easiest'
        },{
            id      : 'ajax-tip',
            text    : 'Ajax ToolTip',
            renderTo: 'easiest'
        },{
            id      : 'track-tip',
            text    : 'Mouse Track',
            renderTo: 'easiest'
        },{
            id      : 'leftCallout',
            text    : 'Anchor right, rich content',
            renderTo: 'anchor'
        },{
            id      : 'bottomCallout',
            text    : 'Anchor below',
            width   : 200,
            renderTo: 'anchor'
        },{
            id      : 'trackCallout',
            text    : 'Anchor with tracking',
            renderTo: 'anchor'
    }];
    
    Ext.each(buttons, function(config) {
        var btn = Ext.create('Ext.Button', Ext.apply({}, config, defaultButtonConfig));
        btn.show();
    }, this);
    
    var tooltips = [{
            target: 'tip1',
            html: 'A very simple tooltip'
        },{
            target: 'ajax-tip',
            width: 200,
            autoLoad: {url: 'ajax-tip.html'},
            dismissDelay: 15000 // auto hide after 15 seconds
        },{
            target: 'tip2',
            title: 'My Tip Title',
            html: 'Click the X to close me',
            autoHide : false,
            closable : true,
            draggable: true
        },{
            target: 'track-tip',
            title: 'Mouse Track',
            width: 200,
            html: 'This tip will follow the mouse while it is over the element',
            trackMouse: true
        },{        
            title: '<a href="#">Rich Content Tooltip</a>',
            id: 'content-anchor-tip',
            target: 'leftCallout',
            anchor: 'left',
            html: null,
            width: 415,
            autoHide: false,
            closable: true,
            contentEl: 'content-tip', // load content from the page
            listeners: {
                'render': function(){
                    this.header.on('click', function(header, e){
                        e.stopEvent();
                        Ext.Msg.alert('Link', 'Link to something interesting.');
                        Ext.getCmp('content-anchor-tip').hide();
                    }, this, {delegate:'a'});
                }
            }
        },{
            target: 'bottomCallout',
            anchor: 'top',
            anchorOffset: 85, // center the anchor on the tooltip
            html: 'This tip\'s anchor is centered'
        },{
            target: 'trackCallout',
            anchor: 'right',
            trackMouse: true,
            html: 'Tracking while you move the mouse'
    }];
        
    Ext.each(tooltips, function(config) {
        Ext.create('Ext.tip.ToolTip', config);
    });  

    Ext.QuickTips.init();
});
