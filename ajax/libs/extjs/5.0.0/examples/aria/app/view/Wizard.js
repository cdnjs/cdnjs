Ext.define('Aria.view.Wizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mysimplewizard',
    
    requires: [
        'Ext.layout.container.Card'
    ],
    
    title: 'Wizard',
    
    ariaAttributes: {
        'aria-live': 'polite',
        'aria-atomic': true,
        'aria-relevant': 'all'
    },
    
    layout: 'card',
    defaults: {
        bodyPadding: 30,
        layout: 'form'
    },
    
    items: [{
        xtype: 'form',
        
        items: [{
            xtype: 'textfield',
            fieldLabel: 'First name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Last name'
        }],
        
        buttons: [{
            direction: 'next',
            text: 'Next panel'
        }]
    }, {
        xtype: 'form',
        
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Company'
        }, {
            xtype: 'textfield',
            fieldLabel: 'E-mail'
        }],
        
        buttons: [{
            direction: 'prev',
            text: 'Previous panel'
        }, {
            direction: 'next',
            text: 'Third panel'
        }]
    }, {
        xtype: 'form',
        
        items: [{
            xtype: 'datefield',
            fieldLabel: 'Birth date'
        }, {
            xtype: 'timefield',
            fieldLabel: 'Time'
        }],
        
        buttons: [{
            direction: 'prev',
            text: 'Back to Second panel'
        }]
    }]
});
