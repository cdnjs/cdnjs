Ext.define('Ext.rtl.form.field.FileButton', {
    override: 'Ext.form.field.FileButton',

    createFileInput : function(isTemporary) {
        var me = this;
        me.fileInputEl = me.el.createChild({
            name: me.inputName,
            id: !isTemporary ? me.id + '-fileInputEl' : undefined,
            cls: me.inputCls + ' ' + (me.getInherited().rtl ? Ext.baseCSSPrefix + 'rtl' : ''),
            tag: 'input',
            type: 'file',
            size: 1,
            role: 'button'
        });
        me.fileInputEl.on('change', me.fireChange, me);
    }
});
