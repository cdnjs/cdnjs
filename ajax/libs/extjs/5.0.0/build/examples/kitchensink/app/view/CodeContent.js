Ext.define('KitchenSink.view.CodeContent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.codeContent',
    autoScroll: true,
    
    cls: 'code-content',
    
    afterRender: function() {
        this.callParent(arguments);
        prettyPrint();
    }
});