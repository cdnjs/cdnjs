Ext.define('Ext.aria.window.MessageBox', {
    override: 'Ext.window.MessageBox',
    
    requires: [
        'Ext.aria.window.Window',
        'Ext.aria.toolbar.Toolbar',
        'Ext.aria.form.field.Text',
        'Ext.aria.form.field.TextArea',
        'Ext.aria.form.field.Display',
        'Ext.aria.button.Button'
    ]
},
function() {
    Ext.MessageBox.destroy();

    /**
     * @class Ext.MessageBox
     * @alternateClassName Ext.Msg
     * @extends Ext.window.MessageBox
     * @singleton
     * Singleton instance of {@link Ext.window.MessageBox}.
     */
    Ext.MessageBox = Ext.Msg = new this();
});
