/**
 * This shows an example of a common "Contact Us" form in a popup window. The form uses
 * vbox and hbox layouts to achieve a uniform flexible layout  even when the window is
 * resized.
 *
 * Note that Tab based navigation within the modal window is confined to within the window.
 */
Ext.define('KitchenSink.view.form.ContactForm', {
    extend: 'Ext.form.Panel',
    xtype: 'form-contact',
    controller: 'form-contact',
    
    //<example>
    requires: [
        'KitchenSink.view.form.ContactFormController',
        'KitchenSink.view.form.ContactFormWindow'
    ],
    
    exampleTitle: 'Contact Form',
    otherContent: [{
        type: 'ViewController',
        path: 'app/view/form/ContactFormController.js'
    }, {
        type: 'Window',
        path: 'app/view/form/ContactFormWindow.js'
    }],
    //</example>
    
    title: 'Contact Us',
    width: 500,
    bodyPadding: 20,

    items: [{
        margin: '0 0 20 0',
        xtype: 'component',
        html: [
            'Thank you for visiting our site! We welcome your feedback; ',
            'please click the button below to send us a message. We will ',
            'respond to your inquiry as quickly as possible.'
        ]
    }, {
        xtype: 'container',
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        items: [{
            xtype: 'button',
            cls: 'contactBtn',
            scale: 'large',
            text: 'Contact Us',
            handler: 'showWindow'
        }]
    }]
});
