/**
 * @class Ext.ux.DataTip
 * @extends Ext.ToolTip.
 * This plugin implements automatic tooltip generation for an arbitrary number of child nodes *within* a Component.
 *
 * This plugin is applied to a high level Component, which contains repeating elements, and depending on the host Component type,
 * it automatically selects a {@link Ext.ToolTip#delegate delegate} so that it appears when the mouse enters a sub-element.
 *
 * When applied to a GridPanel, this ToolTip appears when over a row, and the Record's data is applied
 * using this object's {@link #tpl} template.
 *
 * When applied to a DataView, this ToolTip appears when over a view node, and the Record's data is applied
 * using this object's {@link #tpl} template.
 *
 * When applied to a TreePanel, this ToolTip appears when over a tree node, and the Node's {@link Ext.data.Model} record data is applied
 * using this object's {@link #tpl} template.
 *
 * When applied to a FormPanel, this ToolTip appears when over a Field, and the Field's `tooltip` property is used is applied
 * using this object's {@link #tpl} template, or if it is a string, used as HTML content. If there is no `tooltip` property,
 * the field itself is used as the template's data object.
 *
 * If more complex logic is needed to determine content, then the {@link #beforeshow} event may be used.
 * This class also publishes a **`beforeshowtip`** event through its host Component. The *host Component* fires the
 * **`beforeshowtip`** event.
 */
Ext.define('Ext.ux.DataTip', function(DataTip) {

//  Target the body (if the host is a Panel), or, if there is no body, the main Element.
    function onHostRender() {
        var e = this.isXType('panel') ? this.body : this.el;
        if (this.dataTip.renderToTarget) {
            this.dataTip.render(e);
        }
        this.dataTip.setTarget(e);
    }

    function updateTip(tip, data) {
        if (tip.rendered) {
            if (tip.host.fireEvent('beforeshowtip', tip.eventHost, tip, data) === false) {
                return false;
            }
            tip.update(data);
        } else {
            if (Ext.isString(data)) {
                tip.html = data;
            } else {
                tip.data = data;
            }
        }
    }

    function beforeViewTipShow(tip) {
        var rec = this.view.getRecord(tip.triggerElement),
            data;

        if (rec) {
            data = tip.initialConfig.data ? Ext.apply(tip.initialConfig.data, rec.data) : rec.data;
            return updateTip(tip, data);
        } else {
            return false;
        }
    }

    function beforeFormTipShow(tip) {
        var field = Ext.getCmp(tip.triggerElement.id);
        if (field && (field.tooltip || tip.tpl)) {
            return updateTip(tip, field.tooltip || field);
        } else {
            return false;
        }
    }

    return {
        extend: 'Ext.tip.ToolTip',

        mixins: {
            plugin: 'Ext.plugin.Abstract'
        },

        alias: 'plugin.datatip',

        lockableScope: 'both',

        constructor: function(config) {
            var me = this;
            me.callParent([config]);
            me.mixins.plugin.constructor.call(me, config);
        },

        init: function(host) {
            var me = this;

            me.mixins.plugin.init.call(me, host);
            host.dataTip = me;
            me.host = host;

            if (host.isXType('tablepanel')) {
                me.view = host.getView();
                if (host.ownerLockable) {
                    me.host = host.ownerLockable;
                }
                me.delegate = me.delegate || me.view.rowSelector;
                me.on('beforeshow', beforeViewTipShow);
            } else if (host.isXType('dataview')) {
                me.view = me.host;
                me.delegate = me.delegate || host.itemSelector;
                me.on('beforeshow', beforeViewTipShow);
            } else if (host.isXType('form')) {
                me.delegate = '.' + Ext.form.Labelable.prototype.formItemCls;
                me.on('beforeshow', beforeFormTipShow);
            } else if (host.isXType('combobox')) {
                me.view = host.getPicker();
                me.delegate = me.delegate || me.view.getItemSelector();
                me.on('beforeshow', beforeViewTipShow);
            }
            if (host.rendered) {
                onHostRender.call(host);
            } else {
                host.onRender = Ext.Function.createSequence(host.onRender, onHostRender);
            }
        }
    };
});
