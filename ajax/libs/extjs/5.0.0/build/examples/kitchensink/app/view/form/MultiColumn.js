/**
 * Demonstrates a simple contact form.
 */
Ext.define('KitchenSink.view.form.MultiColumn', {
    extend: 'Ext.form.Panel',
    xtype: 'form-multicolumn',
    
    //<example>
    exampleTitle: 'Multi Column Form',
    themes: {
        classic: {
            width: 520
        },
        gray: {
            width: 520
        },
        neptune: {
            width: 590
        },
        'neptune-touch': {
            width: 700
        }
    },
    //</example>
    
    title: 'Multi Column Form',
    frame: true,
    resizable: true,

    layout: 'column',
    
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield',
        style: 'width: 50%'
    },
    
    items: [{
        items: [
            { fieldLabel: 'First Name' },
            { fieldLabel: 'Last Name' },
            { fieldLabel: 'Phone Number' },
            { fieldLabel: 'Email Address' }
        ]
    }, {
        items: [
            { fieldLabel: 'Street Address 1' },
            { fieldLabel: 'Street Address 2' },
            { fieldLabel: 'City, State' },
            { fieldLabel: 'ZIP code' }
        ]
    }],
    
    buttons: [
        { text: 'OK' },
        { text: 'Cancel' }
    ],
    
    initComponent: function() {
        this.width = this.themeInfo.width;
        this.callParent();
    }
});
