Ext.define('Aria.view.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.mysimplewindow',

    height: 200,
    minHeight: 100,
    minWidth: 200,
    width: 300,
    autoScroll: true,
    title: 'ARIA Window',
    closable: true,
    constrain: true,
    
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    
    items: [{
        xtype: 'form',
        padding: '10px',
        ariaLabel: 'Enter your name',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'First Name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Last Name'
        }]
    }],
    
    dockedItems: {
        dock: 'bottom',
        items: [{
            xtype: 'button',
            text: 'Submit',
            handler: function(btn) {
                btn.up('window').close();
            }
        }]
    }
});
