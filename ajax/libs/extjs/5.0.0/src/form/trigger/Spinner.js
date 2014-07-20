/**
 * A Trigger that contains 2 clickable elements inside in the form of a "up" and a "down"
 * trigger.
 */
Ext.define('Ext.form.trigger.Spinner', {
    extend: 'Ext.form.trigger.Trigger',
    alias: 'trigger.spinner',

    cls: Ext.baseCSSPrefix + 'form-trigger-spinner',
    spinnerCls: Ext.baseCSSPrefix + 'form-spinner',
    spinnerUpCls: Ext.baseCSSPrefix + 'form-spinner-up',
    spinnerDownCls: Ext.baseCSSPrefix + 'form-spinner-down',
    focusCls: Ext.baseCSSPrefix + 'form-spinner-focus',
    overCls: Ext.baseCSSPrefix + 'form-spinner-over',
    clickCls: Ext.baseCSSPrefix + 'form-spinner-click',

    // restore focus to the input element on spin end.
    focusFieldOnClick: true,

    /**
     * @cfg {Function/String} upHandler
     * The handler for the 'up' button
     */

    /**
     * @cfg {Function/String} downHandler
     * The handler for the 'down' button
     */

    // private
    vertical: true,

    bodyTpl:
        '<tpl if="vertical">' +
            '<div class="{spinnerCls} {spinnerCls}-{ui} {spinnerUpCls} {spinnerUpCls}-{ui}' +
                ' {childElCls} {upDisabledCls}"></div>' +
        '</tpl>' +
        '<div class="{spinnerCls} {spinnerCls}-{ui} {spinnerDownCls} {spinnerDownCls}-{ui}' +
                ' {childElCls} {downDisabledCls}"></div>' +
        '<tpl if="!vertical">' +
            '<div class="{spinnerCls} {spinnerCls}-{ui} {spinnerUpCls} {spinnerUpCls}-{ui}' +
                ' {childElCls} {upDisabledCls}"></div>' +
        '</tpl>',


    getBodyRenderData: function() {
        var me = this;

        return {
            vertical: me.vertical,
            upDisabledCls: me.upEnabled ? '' : (me.spinnerUpCls + '-disabled'),
            downDisabledCls: me.downEnabled ? '' : (me.spinnerDownCls + '-disabled'),
            spinnerCls: me.spinnerCls,
            spinnerUpCls: me.spinnerUpCls,
            spinnerDownCls: me.spinnerDownCls
        };
    },

    getStateEl: function() {
        return this.spinnerEl;
    },

    onClick: function(e) {
        var me = this,
            args = arguments,
            e = me.clickRepeater ? args[1] : args[0],
            field = me.field;

        if (!field.readOnly && !field.disabled) {
            if (me.upEl.contains(e.target)) {
                Ext.callback(me.upHandler, me.scope, [field, me, e], 0, field);
            } else if (me.downEl.contains(e.target)) {
                Ext.callback(me.downHandler, me.scope, [field, me, e], 0, field);
            }
        }

        field.inputEl.focus();
    },

    onFieldRender: function() {
        var me = this,
            vertical = me.vertical,
            spinnerEl, elements;

        me.callParent();

        /**
         * @property {Ext.dom.CompositeElement} spinnerEl
         * @private
         * The "up" spinner element
         */
        spinnerEl = me.spinnerEl = me.el.select('.' + me.spinnerCls, true);
        elements = spinnerEl.elements;

        me.upEl = vertical ? elements[0] : elements[1];
        me.downEl = vertical ? elements[1] : elements[0];
    },

    // private
    setUpEnabled: function(enabled) {
        this.upEl[enabled ? 'removeCls' : 'addCls'](this.spinnerUpCls + '-disabled');
    },

    // private
    setDownEnabled: function(enabled) {
        this.downEl[enabled ? 'removeCls' : 'addCls'](this.spinnerDownCls + '-disabled');
    }

});
