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
 * FieldContainer is a derivation of {@link Ext.container.Container Container} that implements the
 * {@link Ext.form.Labelable Labelable} mixin. This allows it to be configured so that it is rendered with
 * a {@link #fieldLabel field label} and optional {@link #msgTarget error message} around its sub-items.
 * This is useful for arranging a group of fields or other components within a single item in a form, so
 * that it lines up nicely with other fields. A common use is for grouping a set of related fields under
 * a single label in a form.
 * 
 * The container's configured {@link #cfg-items} will be layed out within the field body area according to the
 * configured {@link #layout} type. The default layout is `'autocontainer'`.
 * 
 * Like regular fields, FieldContainer can inherit its decoration configuration from the
 * {@link Ext.form.Panel#fieldDefaults fieldDefaults} of an enclosing FormPanel. In addition,
 * FieldContainer itself can pass {@link #fieldDefaults} to any {@link Ext.form.Labelable fields}
 * it may itself contain.
 * 
 * If you are grouping a set of {@link Ext.form.field.Checkbox Checkbox} or {@link Ext.form.field.Radio Radio}
 * fields in a single labeled container, consider using a {@link Ext.form.CheckboxGroup}
 * or {@link Ext.form.RadioGroup} instead as they are specialized for handling those types.
 *
 * # Example
 * 
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'FieldContainer Example',
 *         width: 550,
 *         bodyPadding: 10,
 * 
 *         items: [{
 *             xtype: 'fieldcontainer',
 *             fieldLabel: 'Last Three Jobs',
 *             labelWidth: 100,
 * 
 *             // The body area will contain three text fields, arranged
 *             // horizontally, separated by draggable splitters.
 *             layout: 'hbox',
 *             items: [{
 *                 xtype: 'textfield',
 *                 flex: 1
 *             }, {
 *                 xtype: 'splitter'
 *             }, {
 *                 xtype: 'textfield',
 *                 flex: 1
 *             }, {
 *                 xtype: 'splitter'
 *             }, {
 *                 xtype: 'textfield',
 *                 flex: 1
 *             }]
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 * 
 * # Usage of fieldDefaults
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'FieldContainer Example',
 *         width: 350,
 *         bodyPadding: 10,
 * 
 *         items: [{
 *             xtype: 'fieldcontainer',
 *             fieldLabel: 'Your Name',
 *             labelWidth: 75,
 *             defaultType: 'textfield',
 * 
 *             // Arrange fields vertically, stretched to full width
 *             layout: 'anchor',
 *             defaults: {
 *                 layout: '100%'
 *             },
 * 
 *             // These config values will be applied to both sub-fields, except
 *             // for Last Name which will use its own msgTarget.
 *             fieldDefaults: {
 *                 msgTarget: 'under',
 *                 labelAlign: 'top'
 *             },
 * 
 *             items: [{
 *                 fieldLabel: 'First Name',
 *                 name: 'firstName'
 *             }, {
 *                 fieldLabel: 'Last Name',
 *                 name: 'lastName',
 *                 msgTarget: 'under'
 *             }]
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 * 
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.form.FieldContainer', {
    extend: 'Ext.container.Container',
    mixins: {
        labelable: 'Ext.form.Labelable',
        fieldAncestor: 'Ext.form.FieldAncestor'
    },
    requires: 'Ext.layout.component.field.FieldContainer',

    alias: 'widget.fieldcontainer',

    componentLayout: 'fieldcontainer',

    componentCls: Ext.baseCSSPrefix + 'form-fieldcontainer',
    
    // Used by the layout system, typically the scrolling el is the targetEl, however we need
    // to let it know we're using something different
    customOverflowEl: 'containerEl',
    
    childEls: [
        'containerEl'
    ],

    /**
     * @cfg autoScroll @hide
     */

    /**
     * @cfg {Boolean} combineLabels
     * If set to true, and there is no defined {@link #fieldLabel}, the field container will automatically
     * generate its label by combining the labels of all the fields it contains. Defaults to false.
     */
    combineLabels: false,

    //<locale>
    /**
     * @cfg {String} labelConnector
     * The string to use when joining the labels of individual sub-fields, when {@link #combineLabels} is
     * set to true. Defaults to ', '.
     */
    labelConnector: ', ',
    //</locale>

    /**
     * @cfg {Boolean} combineErrors
     * If set to true, the field container will automatically combine and display the validation errors from
     * all the fields it contains as a single error on the container, according to the configured
     * {@link #msgTarget}. Defaults to false.
     */
    combineErrors: false,

    maskOnDisable: false,
    // If we allow this to mark with the invalidCls it will cascade to all
    // child fields, let them handle themselves
    invalidCls: '',

    fieldSubTpl: '<div id="{id}-containerEl" class="{containerElCls}">{%this.renderContainer(out,values)%}</div>',

    initComponent: function() {
        var me = this;

        // Init mixins
        me.initLabelable();
        me.initFieldAncestor();
        
        me.callParent();
        me.initMonitor();
    },
    
    getOverflowEl: function(){
        return this.containerEl;    
    },

    /**
     * @protected Called when a {@link Ext.form.Labelable} instance is added to the container's subtree.
     * @param {Ext.form.Labelable} labelable The instance that was added
     */
    onAdd: function(labelable) {
        var me = this;
        
        // Fix for https://sencha.jira.com/browse/EXTJSIV-6424
        // In FF, positioning absolutely within a TD positions relative to the TR!
        // So we must add the width of a visible, left-aligned label cell to the x coordinate.
        if (Ext.isGecko && me.layout.type === 'absolute' && !me.hideLabel && me.labelAlign !== 'top') {
            labelable.x += (me.labelWidth + me.labelPad);
        }
        me.callParent(arguments);
        if (me.combineLabels) {
            labelable.oldHideLabel = labelable.hideLabel;
            labelable.hideLabel = true;
        }
        me.updateLabel();
    },

    /**
     * @protected Called when a {@link Ext.form.Labelable} instance is removed from the container's subtree.
     * @param {Ext.form.Labelable} labelable The instance that was removed
     */
    onRemove: function(labelable, isDestroying) {
        var me = this;
        me.callParent(arguments);
        if (!isDestroying) {
            if (me.combineLabels) {
                labelable.hideLabel = labelable.oldHideLabel;
            }
            me.updateLabel();
        }   
    },

    initRenderTpl: function() {
        var me = this;
        if (!me.hasOwnProperty('renderTpl')) {
            me.renderTpl = me.getTpl('labelableRenderTpl');
        }
        return me.callParent();
    },

    initRenderData: function() {
        var me = this,
            data = me.callParent();

        data.containerElCls = me.containerElCls;
        return Ext.applyIf(data, me.getLabelableRenderData());
    },

    /**
     * Returns the combined field label if {@link #combineLabels} is set to true and if there is no
     * set {@link #fieldLabel}. Otherwise returns the fieldLabel like normal. You can also override
     * this method to provide a custom generated label.
     * @template
     * @return {String} The label, or empty string if none.
     */
    getFieldLabel: function() {
        var label = this.fieldLabel || '';
        if (!label && this.combineLabels) {
            label = Ext.Array.map(this.query('[isFieldLabelable]'), function(field) {
                return field.getFieldLabel();
            }).join(this.labelConnector);
        }
        return label;
    },

    getSubTplData: function() {
        var ret = this.initRenderData();

        Ext.apply(ret, this.subTplData);
        return ret;
    },

    getSubTplMarkup: function() {
        var me = this,
            tpl = me.getTpl('fieldSubTpl'),
            html;

        if (!tpl.renderContent) {
            me.setupRenderTpl(tpl);
        }

        html = tpl.apply(me.getSubTplData());
        return html;
    },

    /**
     * @private Updates the content of the labelEl if it is rendered
     */
    updateLabel: function() {
        var me = this,
            label = me.labelEl;
            
        if (label) {
            me.setFieldLabel(me.getFieldLabel());
        }
    },


    /**
     * @private Fired when the error message of any field within the container changes, and updates the
     * combined error message to match.
     */
    onFieldErrorChange: function(field, activeError) {
        if (this.combineErrors) {
            var me = this,
                oldError = me.getActiveError(),
                invalidFields = Ext.Array.filter(me.query('[isFormField]'), function(field) {
                    return field.hasActiveError();
                }),
                newErrors = me.getCombinedErrors(invalidFields);

            if (newErrors) {
                me.setActiveErrors(newErrors);
            } else {
                me.unsetActiveError();
            }

            if (oldError !== me.getActiveError()) {
                me.doComponentLayout();
            }
        }
    },

    /**
     * Takes an Array of invalid {@link Ext.form.field.Field} objects and builds a combined list of error
     * messages from them. Defaults to prepending each message by the field name and a colon. This
     * can be overridden to provide custom combined error message handling, for instance changing
     * the format of each message or sorting the array (it is sorted in order of appearance by default).
     * @param {Ext.form.field.Field[]} invalidFields An Array of the sub-fields which are currently invalid.
     * @return {String[]} The combined list of error messages
     */
    getCombinedErrors: function(invalidFields) {
        var errors = [],
            f,
            fLen   = invalidFields.length,
            field,
            activeErrors, a, aLen,
            error, label;

        for (f = 0; f < fLen; f++) {
            field = invalidFields[f];
            activeErrors = field.getActiveErrors();
            aLen         = activeErrors.length;

            for (a = 0; a < aLen; a++) {
                error = activeErrors[a];
                label = field.getFieldLabel();

                errors.push((label ? label + ': ' : '') + error);
            }
        }

        return errors;
    },

    getTargetEl: function() {
        return this.containerEl;
    },

    applyTargetCls: function(targetCls) {
        var containerElCls = this.containerElCls;

        this.containerElCls = containerElCls ? containerElCls + ' ' + targetCls : targetCls;
    }
});
