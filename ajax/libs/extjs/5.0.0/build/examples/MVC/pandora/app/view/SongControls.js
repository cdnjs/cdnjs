Ext.define('Pandora.view.SongControls', {
    extend: 'Ext.Container',
    alias: 'widget.songcontrols',
    height: 70,
    
    initComponent: function() {
        this.layout = {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        };
        
        this.items = [{
            xtype: 'container',
            defaultType: 'button',
            height: 30,
            width: 300,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            items: [{
                text: 'Vote Down',
                action: 'vote-down'
            }, {
                text: 'Vote Up',
                action: 'vote-up'
            }, {
                text: 'Pause',
                action: 'pause'
            }, {
                text: 'Skip',
                action: 'skip'
            }]
        }, {
            width: 300,
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            items: [{
                xtype: 'component',
                html: '2:00'
            }, {
                xtype: 'progressbar',
                value: 0.5,
                flex: 1           
            }, {
                xtype: 'component',
                html: '4:00'
            }]
        }];
        
        this.callParent();
    }
});