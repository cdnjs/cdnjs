/**
 * Demonstrates the functionality of the Ext.window.MessageBox class.
 */
Ext.define('KitchenSink.view.window.MessageBox', {
    extend: 'Ext.panel.Panel',
    xtype: 'message-box',
    
    //<example>
    exampleTitle: 'Message Box',
    otherContent: [{
        type: 'ViewController',
        path: 'app/view/window/MessageBoxController.js'
    }],
    //</example>
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    controller: 'window-messagebox',
    width: 400,
    title: 'Message Box Variations',

    bodyPadding: 15,

    items: [{
        xtype: 'container',
        flex: 1,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                margin: '0 0 10 0'
            },
            defaultType: 'button',
            items: [{
                text: 'Confirm Dialog',
                handler: 'onConfirmClick'
            }, {
                text: 'Prompt Dialog',
                handler: 'onPromptClick'
            }, {
                text: 'Multi-line Prompt',
                handler: 'onMultiLinePromptClick'
            }, {
                text: 'Yes/No/Cancel Dialog',
                handler: 'onYesNoCancelClick'
            }]
        }, {
            xtype: 'container',
            margin: '0 0 0 20',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                margin: '0 0 10 0'
            },
            defaultType: 'button',
            items: [{
                text: 'Progress Dialog',
                handler: 'onProgressClick'
            }, {
                text: 'Wait Dialog',
                handler: 'onWaitClick'
            }, {
                text: 'Alert Dialog',
                handler: 'onAlertClick'
            }, {
                text: 'Custom Button Text',
                handler: 'onCustomButtonText'
            }]
        }]
    }, {
        xtype: 'container',
        margin: '30 0 0 0',
        layout: 'hbox',
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Choose Icon',
            reference: 'icon',
            forceSelection: true,
            editable: false,
            value: 'error',
            width: 250,
            store: [
                ['error', 'Error'], 
                ['info', 'Informational'], 
                ['question', 'Question'], 
                ['warning', 'Warning']
            ]
        }, {
            xtype: 'button',
            text: 'Icon Dialog',
            handler: 'onIconClick',
            margin: '0 0 0 5'
        }]
    }]
});