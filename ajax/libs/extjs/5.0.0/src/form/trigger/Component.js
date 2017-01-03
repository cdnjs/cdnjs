/**
 * A Text Field Trigger that contains a {@link Ext.Component Component} or {@link
 * Ext.Widget Widget}.
 * @private
 */
Ext.define('Ext.form.trigger.Component', {
    extend: 'Ext.form.trigger.Trigger',
    alias: 'trigger.component',

    cls: Ext.baseCSSPrefix + 'form-trigger-cmp',

    /**
     * @cfg {Object/Ext.Component/Ext.Widget} A config object for a Component or Widget,
     * or an already instantiated Component or Widget.
     */

    /**
     * @property {Ext.Component/Ext.Widget} component The component or widget
     * @readonly
     */

    onFieldRender: function() {
        var me = this,
            component = me.component;

        this.callParent();

        if (!component.isComponent && !component.isWidget) {
            component = Ext.widget(component);
        }

        me.component = component;

        component.render(me.el);
    },

    destroy: function() {
        var component = this.component;

        if (component.isComponent || component.isWidget) {
            component.destroy();
        }
    }
});
