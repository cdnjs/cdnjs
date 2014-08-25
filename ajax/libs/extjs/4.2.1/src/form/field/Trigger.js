/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * Provides a convenient wrapper for TextFields that adds a clickable trigger button (looks like a combobox by default).
 * The trigger has no default action, so you must assign a function to implement the trigger click handler by overriding
 * {@link #onTriggerClick}. You can create a Trigger field directly, as it renders exactly like a combobox for which you
 * can provide a custom implementation.
 *
 * For example:
 *
 *     @example
 *     Ext.define('Ext.ux.CustomTrigger', {
 *         extend: 'Ext.form.field.Trigger',
 *         alias: 'widget.customtrigger',
 *
 *         // override onTriggerClick
 *         onTriggerClick: function() {
 *             Ext.Msg.alert('Status', 'You clicked my trigger!');
 *         }
 *     });
 *
 *     Ext.create('Ext.form.FormPanel', {
 *         title: 'Form with TriggerField',
 *         bodyPadding: 5,
 *         width: 350,
 *         renderTo: Ext.getBody(),
 *         items:[{
 *             xtype: 'customtrigger',
 *             fieldLabel: 'Sample Trigger',
 *             emptyText: 'click the trigger'
 *         }]
 *     });
 *
 * However, in general you will most likely want to use Trigger as the base class for a reusable component.
 * {@link Ext.form.field.Date} and {@link Ext.form.field.ComboBox} are perfect examples of this.
 */
Ext.define('Ext.form.field.Trigger', {
    extend:'Ext.form.field.Text',
    alias: ['widget.triggerfield', 'widget.trigger'],
    requires: ['Ext.dom.Helper', 'Ext.util.ClickRepeater', 'Ext.layout.component.field.Trigger'],
    alternateClassName: ['Ext.form.TriggerField', 'Ext.form.TwinTriggerField', 'Ext.form.Trigger'],

    childEls: [
        /**
         * @property {Ext.CompositeElement} triggerEl
         * A composite of all the trigger button elements. Only set after the field has been rendered.
         */
        { name: 'triggerCell', select: '.' + Ext.baseCSSPrefix + 'trigger-cell' },
        { name: 'triggerEl', select: '.' + Ext.baseCSSPrefix + 'form-trigger' },

        /**
         * @property {Ext.Element} triggerWrap
         * A reference to the `TABLE` element which encapsulates the input field and all trigger button(s). Only set after the field has been rendered.
         */
        'triggerWrap',

        /**
         * @property {Ext.Element} inputCell
         * A reference to the `TD` element wrapping the input element. Only set after the field has been rendered.
         */
        'inputCell'
    ],

    /**
     * @cfg {String} triggerCls
     * An additional CSS class used to style the trigger button. The trigger will always get the {@link #triggerBaseCls}
     * by default and triggerCls will be **appended** if specified.
     */

    /**
     * @cfg
     * The base CSS class that is always added to the trigger button. The {@link #triggerCls} will be appended in
     * addition to this class.
     */
    triggerBaseCls: Ext.baseCSSPrefix + 'form-trigger',

    /**
     * @cfg
     * The CSS class that is added to the div wrapping the trigger button(s).
     */
    triggerWrapCls: Ext.baseCSSPrefix + 'form-trigger-wrap',

    /**
     * @cfg
     * The CSS class that is added to the text field when component is read-only or not editable.
     */
    triggerNoEditCls: Ext.baseCSSPrefix + 'trigger-noedit',

    /**
     * @cfg {Boolean} hideTrigger
     * true to hide the trigger element and display only the base text field
     */
    hideTrigger: false,

    /**
     * @cfg {Boolean} editable
     * false to prevent the user from typing text directly into the field; the field can only have its value set via an
     * action invoked by the trigger.
     */
    editable: true,

    /**
     * @cfg {Boolean} readOnly
     * true to prevent the user from changing the field, and hides the trigger. Supercedes the editable and hideTrigger
     * options if the value is true.
     */
    readOnly: false,

    /**
     * @cfg {Boolean} [selectOnFocus=false]
     * true to select any existing text in the field immediately on focus. Only applies when
     * {@link #editable editable} = true
     */

    /**
     * @cfg {Boolean} repeatTriggerClick
     * true to attach a {@link Ext.util.ClickRepeater click repeater} to the trigger.
     */
    repeatTriggerClick: false,


    /**
     * @method autoSize
     * @private
     */
    autoSize: Ext.emptyFn,
    // @private
    monitorTab: true,
    // @private
    mimicing: false,
    // @private
    triggerIndexRe: /trigger-index-(\d+)/,
    
    extraTriggerCls: '',

    componentLayout: 'triggerfield',

    initComponent: function() {
        this.wrapFocusCls = this.triggerWrapCls + '-focus';
        this.callParent(arguments);
    },

    getSubTplMarkup: function(values) {
        var me = this,
            childElCls = values.childElCls, // either '' or ' x-foo'
            field = me.callParent(arguments);

        return '<table id="' + me.id + '-triggerWrap" class="' + Ext.baseCSSPrefix + 'form-trigger-wrap' + childElCls + '" cellpadding="0" cellspacing="0"><tbody><tr>' +
            '<td id="' + me.id + '-inputCell" class="' + Ext.baseCSSPrefix + 'form-trigger-input-cell' + childElCls + '">' + field + '</td>' +
            me.getTriggerMarkup() +
            '</tr></tbody></table>';
    },
    
    getSubTplData: function(){
        var me = this,
            data = me.callParent(),
            readOnly = me.readOnly === true,
            editable = me.editable !== false;
        
        return Ext.apply(data, {
            editableCls: (readOnly || !editable) ? ' ' + me.triggerNoEditCls : '',
            readOnly: !editable || readOnly
        });  
    },

    getLabelableRenderData: function() {
        var me = this,
            triggerWrapCls = me.triggerWrapCls,
            result = me.callParent(arguments);

        return Ext.applyIf(result, {
            triggerWrapCls: triggerWrapCls,
            triggerMarkup: me.getTriggerMarkup()
        });
    },

    getTriggerMarkup: function() {
        var me = this,
            i = 0,
            hideTrigger = (me.readOnly || me.hideTrigger),
            triggerCls,
            triggerBaseCls = me.triggerBaseCls,
            triggerConfigs = [],
            unselectableCls = Ext.dom.Element.unselectableCls,
            style = 'width:' + me.triggerWidth + 'px;' + (hideTrigger ? 'display:none;' : ''),
            cls = me.extraTriggerCls + ' ' + Ext.baseCSSPrefix + 'trigger-cell ' + unselectableCls;

        // TODO this trigger<n>Cls API design doesn't feel clean, especially where it butts up against the
        // single triggerCls config. Should rethink this, perhaps something more structured like a list of
        // trigger config objects that hold cls, handler, etc.
        // triggerCls is a synonym for trigger1Cls, so copy it.
        if (!me.trigger1Cls) {
            me.trigger1Cls = me.triggerCls;
        }

        // Create as many trigger elements as we have trigger<n>Cls configs, but always at least one
        for (i = 0; (triggerCls = me['trigger' + (i + 1) + 'Cls']) || i < 1; i++) {
            triggerConfigs.push({
                tag: 'td',
                valign: 'top',
                cls: cls,
                style: style,
                cn: {
                    cls: [Ext.baseCSSPrefix + 'trigger-index-' + i, triggerBaseCls, triggerCls].join(' '),
                    role: 'button'
                }
            });
        }
        triggerConfigs[0].cn.cls += ' ' + triggerBaseCls + '-first';

        return Ext.DomHelper.markup(triggerConfigs);
    },
    
    disableCheck: function() {
        return !this.disabled;    
    },

    // @private
    beforeRender: function() {
        var me = this,
            triggerBaseCls = me.triggerBaseCls,
            tempEl;
            
        /**
         * @property {Number} triggerWidth
         * Width of the trigger element. Unless set explicitly, it will be
         * automatically calculated through creating a temporary element
         * on page. (That will be done just once per app run.)
         * @private
         */
        if (!me.triggerWidth) {
            tempEl = Ext.getBody().createChild({
                style: 'position: absolute;', 
                cls: Ext.baseCSSPrefix + 'form-trigger'
            });
            Ext.form.field.Trigger.prototype.triggerWidth = tempEl.getWidth();
            tempEl.remove();
        }

        me.callParent();

        if (triggerBaseCls != Ext.baseCSSPrefix + 'form-trigger') {
            // we may need to change the selectors by which we extract trigger elements if is triggerBaseCls isn't the value we
            // stuck in childEls
            me.addChildEls({ name: 'triggerEl', select: '.' + triggerBaseCls });
        }

        // these start correct in the fieldSubTpl:
        me.lastTriggerStateFlags = me.getTriggerStateFlags();
    },

    onRender: function() {
        var me = this;

        me.callParent(arguments);

        me.doc = Ext.getDoc();
        me.initTrigger();
    },

    /**
     * Get the total width of the trigger button area.
     * @return {Number} The total trigger width
     */
    getTriggerWidth: function() {
        var me = this,
            totalTriggerWidth = 0;

        if (me.triggerWrap && !me.hideTrigger && !me.readOnly) {
            totalTriggerWidth = me.triggerEl.getCount() * me.triggerWidth;
        }
        return totalTriggerWidth;
    },

    setHideTrigger: function(hideTrigger) {
        if (hideTrigger != this.hideTrigger) {
            this.hideTrigger = hideTrigger;
            this.updateLayout();
        }
    },

    /**
     * Sets the editable state of this field. This method is the runtime equivalent of setting the 'editable' config
     * option at config time.
     * @param {Boolean} editable True to allow the user to directly edit the field text. If false is passed, the user
     * will only be able to modify the field using the trigger. Will also add a click event to the text field which
     * will call the trigger. 
     */
    setEditable: function(editable) {
        if (editable != this.editable) {
            this.editable = editable;
            this.updateLayout();
        }
    },

    /**
     * Sets the read-only state of this field. This method is the runtime equivalent of setting the 'readOnly' config
     * option at config time.
     * @param {Boolean} readOnly True to prevent the user changing the field and explicitly hide the trigger. Setting
     * this to true will supercede settings editable and hideTrigger. Setting this to false will defer back to editable
     * and hideTrigger.
     */
    setReadOnly: function(readOnly) {
        var me = this,
            old = me.readOnly;
            
        me.callParent(arguments);
        if (readOnly != old) {
            me.updateLayout();
        }
    },

    // @private
    initTrigger: function() {
        var me = this,
            triggerWrap = me.triggerWrap,
            triggerEl = me.triggerEl,
            disableCheck = me.disableCheck,
            els, eLen, el, e, idx;

        if (me.repeatTriggerClick) {
            me.triggerRepeater = new Ext.util.ClickRepeater(triggerWrap, {
                preventDefault: true,
                handler: me.onTriggerWrapClick,
                listeners: {
                    mouseup: me.onTriggerWrapMouseup,
                    scope: me
                },
                scope: me
            });
        } else {
            me.mon(triggerWrap, {
                click: me.onTriggerWrapClick,
                mouseup: me.onTriggerWrapMouseup,
                scope: me
            });
        }

        triggerEl.setVisibilityMode(Ext.Element.DISPLAY);
        triggerEl.addClsOnOver(me.triggerBaseCls + '-over', disableCheck, me);

        els  = triggerEl.elements;
        eLen = els.length;

        for (e = 0; e < eLen; e++) {
            el = els[e];
            idx = e+1;
            el.addClsOnOver(me['trigger' + (idx) + 'Cls'] + '-over', disableCheck, me);
            el.addClsOnClick(me['trigger' + (idx) + 'Cls'] + '-click', disableCheck, me);
        }

        triggerEl.addClsOnClick(me.triggerBaseCls + '-click', disableCheck, me);

    },

    // @private
    onDestroy: function() {
        var me = this;
        Ext.destroyMembers(me, 'triggerRepeater', 'triggerWrap', 'triggerEl');
        delete me.doc;
        me.callParent();
    },

    // @private
    onFocus: function() {
        var me = this;
        me.callParent(arguments);
        if (!me.mimicing) {
            me.bodyEl.addCls(me.wrapFocusCls);
            me.mimicing = true;
            me.mon(me.doc, 'mousedown', me.mimicBlur, me, {
                delay: 10
            });
            if (me.monitorTab) {
                me.on('specialkey', me.checkTab, me);
            }
        }
    },

    // @private
    checkTab: function(me, e) {
        if (!this.ignoreMonitorTab && e.getKey() == e.TAB) {
            this.triggerBlur();
        }
    },

    /**
     * Returns a set of flags that describe the trigger state. These are just used to easily
     * determine if the DOM is out-of-sync with the component's properties.
     * @private
     */
    getTriggerStateFlags: function () {
        var me = this,
            state = 0;

        if (me.readOnly) {
            state += 1;
        }
        if (me.editable) {
            state += 2;
        }
        if (me.hideTrigger) {
            state += 4;
        }
        return state;
    },

    /**
     * @private
     * The default blur handling must not occur for a TriggerField, implementing this template method as emptyFn disables that.
     * Instead the tab key is monitored, and the superclass's onBlur is called when tab is detected
     */
    onBlur: Ext.emptyFn,

    // @private
    mimicBlur: function(e) {
        if (!this.isDestroyed && !this.bodyEl.contains(e.target) && this.validateBlur(e)) {
            this.triggerBlur(e);
        }
    },

    // @private
    triggerBlur: function(e) {
        var me = this;
        me.mimicing = false;
        me.mun(me.doc, 'mousedown', me.mimicBlur, me);
        if (me.monitorTab && me.inputEl) {
            me.un('specialkey', me.checkTab, me);
        }
        Ext.form.field.Trigger.superclass.onBlur.call(me, e);
        if (me.bodyEl) {
            me.bodyEl.removeCls(me.wrapFocusCls);
        }
    },

    // @private
    // This should be overridden by any subclass that needs to check whether or not the field can be blurred.
    validateBlur: function(e) {
        return true;
    },

    // @private
    // process clicks upon triggers.
    // determine which trigger index, and dispatch to the appropriate click handler
    onTriggerWrapClick: function() {
        var me = this,
            targetEl, match,
            triggerClickMethod,
            event;

        event = arguments[me.triggerRepeater ? 1 : 0];
        if (event && !me.readOnly && !me.disabled) {
                targetEl = event.getTarget('.' + me.triggerBaseCls, null);
                match = targetEl && targetEl.className.match(me.triggerIndexRe);

            if (match) {
                triggerClickMethod = me['onTrigger' + (parseInt(match[1], 10) + 1) + 'Click'] || me.onTriggerClick;
                if (triggerClickMethod) {
                    triggerClickMethod.call(me, event);
                }
            }
        }
    },

    // @private
    // Handle trigger mouse up gesture. To be implemented in subclasses.
    // Currently the Spinner subclass refocuses the input element upon end of spin.
    onTriggerWrapMouseup: Ext.emptyFn,

    /**
     * @method onTriggerClick
     * @protected
     * The function that should handle the trigger's click event. This method does nothing by default until overridden
     * by an implementing function. See Ext.form.field.ComboBox and Ext.form.field.Date for sample implementations.
     * @param {Ext.EventObject} e
     */
    onTriggerClick: Ext.emptyFn

    /**
     * @cfg {Boolean} grow
     * @private
     */
    /**
     * @cfg {Number} growMin
     * @private
     */
    /**
     * @cfg {Number} growMax
     * @private
     */
});
