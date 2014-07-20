/**
 * This example shows how to use vbox layout with Ext JS Forms.
 */
Ext.define('KitchenSink.view.form.VBoxLayoutForm', {
    extend: 'Ext.window.Window',
    xtype: 'form-vboxlayout',
    
    //<example>
    requires: [
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.VBox'
    ],
    
    exampleTitle: 'VBox Layout Form',
    //</example>
    
    title: 'Resize Me',
    width: 500,
    height: 300,
    minWidth: 300,
    minHeight: 200,
    layout: 'fit',
    plain: true,
    
    items: [{
        xtype: 'form',

        defaultType: 'textfield',
        fieldDefaults: {
            labelWidth: 60
        },
        
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        
        bodyPadding: 5,
        border: false,

        items: [{
            fieldLabel: 'Send To',
            name: 'to'
        }, {
            fieldLabel: 'Subject',
            name: 'subject'
        }, {
            xtype: 'textarea',
            hideLabel: true,
            name: 'msg',
            
            // Setting flex to 1 for textarea when no other component has flex
            // is effectively tells the layout to strech the textarea vertically,
            // taking all the space left after the fields above have been laid out.
            flex: 1
        }]
    }],

    buttons: [{
        text: 'Send'
    },{
        text: 'Cancel'
    }]
});
