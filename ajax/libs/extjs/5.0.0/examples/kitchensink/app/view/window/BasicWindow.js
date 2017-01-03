/**
 * Demonstrates a basic window control.
 */
Ext.define('KitchenSink.view.window.BasicWindow', {
    extend: 'Ext.window.Window',
    xtype: 'basic-window',
    
    //<example>
    exampleTitle: 'Basic Window',
    //</example>
    
    height: 300,
    width: 400,
    title: 'Window',
    autoScroll: true,
    bodyPadding: 10,
    html: KitchenSink.DummyText.extraLongText,
    constrain: true,
    closable: false
});