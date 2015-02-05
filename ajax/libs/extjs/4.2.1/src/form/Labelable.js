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
 * A mixin which allows a component to be configured and decorated with a label and/or error message as is
 * common for form fields. This is used by e.g. Ext.form.field.Base and Ext.form.FieldContainer
 * to let them be managed by the Field layout.
 *
 * NOTE: This mixin is mainly for internal library use and most users should not need to use it directly. It
 * is more likely you will want to use one of the component classes that import this mixin, such as
 * Ext.form.field.Base or Ext.form.FieldContainer.
 *
 * Use of this mixin does not make a component a field in the logical sense, meaning it does not provide any
 * logic or state related to values or validation; that is handled by the related Ext.form.field.Field
 * mixin. These two mixins may be used separately (for example Ext.form.FieldContainer is Labelable but not a
 * Field), or in combination (for example Ext.form.field.Base implements both and has logic for connecting the
 * two.)
 *
 * Component classes which use this mixin should use the Field layout
 * or a derivation thereof to properly size and position the label and message according to the component config.
 * They must also call the {@link #initLabelable} method during component initialization to ensure the mixin gets
 * set up correctly.
 *
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define("Ext.form.Labelable", {
    requires: ['Ext.XTemplate'],

    autoEl: {
        tag: 'table',
        cellpadding: 0
    },

    childEls: [
        /**
         * @property {Ext.Element} labelCell
         * The `<TD>` Element which contains the label Element for this component. Only available after the component has been rendered.
         */
        'labelCell',

        /**
         * @property {Ext.Element} labelEl
         * The label Element for this component. Only available after the component has been rendered.
         */
        'labelEl',

        /**
         * @property {Ext.Element} bodyEl
         * The div Element wrapping the component's contents. Only available after the component has been rendered.
         */
        'bodyEl',

        // private - the TD which contains the msgTarget: 'side' error icon
        'sideErrorCell',

        /**
         * @property {Ext.Element} errorEl
         * The div Element that will contain the component's error message(s). Note that depending on the configured
         * {@link #msgTarget}, this element may be hidden in favor of some other form of presentation, but will always
         * be present in the DOM for use by assistive technologies.
         */
        'errorEl',

        'inputRow'
    ],

    /**
     * @cfg {String/String[]/Ext.XTemplate} labelableRenderTpl
     * The rendering template for the field decorations. Component classes using this mixin
     * should include logic to use this as their {@link Ext.AbstractComponent#renderTpl renderTpl},
     * and implement the {@link #getSubTplMarkup} method to generate the field body content.
     *
     * The structure of a field is a table as follows:
     * 
     * If `labelAlign: 'left', `msgTarget: 'side'`
     * 
     *      +----------------------+----------------------+-------------+
     *      | Label:               | InputField           | sideErrorEl |
     *      +----------------------+----------------------+-------------+
     *
     * If `labelAlign: 'left', `msgTarget: 'under'`
     * 
     *      +----------------------+------------------------------------+
     *      | Label:               | InputField      (colspan=2)        |
     *      |                      | underErrorEl                       |
     *      +----------------------+------------------------------------+
     *
     * If `labelAlign: 'top', `msgTarget: 'side'`
     *
     *      +---------------------------------------------+-------------+
     *      | label                                       |             |
     *      | InputField                                  | sideErrorEl |
     *      +---------------------------------------------+-------------+
     *
     * If `labelAlign: 'top', `msgTarget: 'under'`
     * 
     *      +-----------------------------------------------------------+
     *      | label                                                     |
     *      | InputField                      (colspan=2)               |
     *      | underErrorEl                                              |
     *      +-----------------------------------------------------------+
     *
     * The total columns always the same for fields with each setting of {@link #labelAlign} because when
     * rendered into a {@link Ext.layout.container.Form} layout, just the `TR` of the table
     * will be placed into the form's main `TABLE`, and the columns of all the siblings
     * must match so that they all line up. In a {@link Ext.layout.container.Form} layout, different
     * settings of {@link #labelAlign} are not supported because of the incompatible column structure.
     *
     * When the triggerCell or side error cell are hidden or shown, the input cell's colspan
     * is recalculated to maintain the correct 3 visible column count.
     * @private
     */
    labelableRenderTpl: [

        // body row. If a heighted Field (eg TextArea, HtmlEditor, this must greedily consume height.
        '<tr role="presentation" id="{id}-inputRow" <tpl if="inFormLayout">id="{id}"</tpl> class="{inputRowCls}">',

            // Label cell
            '<tpl if="labelOnLeft">',
                '<td role="presentation" id="{id}-labelCell" style="{labelCellStyle}" {labelCellAttrs}>',
                    '{beforeLabelTpl}',
                    '<label id="{id}-labelEl" {labelAttrTpl}<tpl if="inputId"> for="{inputId}"</tpl> class="{labelCls}"',
                        '<tpl if="labelStyle"> style="{labelStyle}"</tpl>',
                        // Required for Opera
                        ' unselectable="on"',
                    '>',
                        '{beforeLabelTextTpl}',
                        '<tpl if="fieldLabel">{fieldLabel}{labelSeparator}</tpl>',
                        '{afterLabelTextTpl}',
                    '</label>',
                    '{afterLabelTpl}',
                '</td>',
            '</tpl>',

            // Body of the input. That will be an input element, or, from a TriggerField, a table containing an input cell and trigger cell(s)
            '<td role="presentation" class="{baseBodyCls} {fieldBodyCls} {extraFieldBodyCls}" id="{id}-bodyEl" colspan="{bodyColspan}" role="presentation">',
                '{beforeBodyEl}',

                // Label just sits on top of the input field if labelAlign === 'top'
                '<tpl if="labelAlign==\'top\'">',
                    '{beforeLabelTpl}',
                    '<div role="presentation" id="{id}-labelCell" style="{labelCellStyle}">',
                        '<label id="{id}-labelEl" {labelAttrTpl}<tpl if="inputId"> for="{inputId}"</tpl> class="{labelCls}"',
                            '<tpl if="labelStyle"> style="{labelStyle}"</tpl>',
                            // Required for Opera
                            ' unselectable="on"',
                        '>',
                            '{beforeLabelTextTpl}',
                            '<tpl if="fieldLabel">{fieldLabel}{labelSeparator}</tpl>',
                            '{afterLabelTextTpl}',
                        '</label>',
                    '</div>',
                    '{afterLabelTpl}',
                '</tpl>',

                '{beforeSubTpl}',
                '{[values.$comp.getSubTplMarkup(values)]}',
                '{afterSubTpl}',

            // Final TD. It's a side error element unless there's a floating external one
            '<tpl if="msgTarget===\'side\'">',
                '{afterBodyEl}',
                '</td>',
                '<td role="presentation" id="{id}-sideErrorCell" vAlign="{[values.labelAlign===\'top\' && !values.hideLabel ? \'bottom\' : \'middle\']}" style="{[values.autoFitErrors ? \'display:none\' : \'\']}" width="{errorIconWidth}">',
                    '<div role="presentation" id="{id}-errorEl" class="{errorMsgCls}" style="display:none"></div>',
                '</td>',
            '<tpl elseif="msgTarget==\'under\'">',
                '<div role="presentation" id="{id}-errorEl" class="{errorMsgClass}" colspan="2" style="display:none"></div>',
                '{afterBodyEl}',
                '</td>',
            '</tpl>',
        '</tr>',
        {
            disableFormats: true
        }
    ],

    /**
     * @cfg {String/String[]/Ext.XTemplate} activeErrorsTpl
     * The template used to format the Array of error messages passed to {@link #setActiveErrors} into a single HTML
     * string. if the {@link #msgTarget} is title, it defaults to a list separated by new lines. Otherwise, it 
     * renders each message as an item in an unordered list.
     */
    activeErrorsTpl: undefined,

    htmlActiveErrorsTpl: [
        '<tpl if="errors && errors.length">',
            '<ul class="{listCls}"><tpl for="errors"><li role="alert">{.}</li></tpl></ul>',
        '</tpl>'
    ],
    
    plaintextActiveErrorsTpl: [
        '<tpl if="errors && errors.length">',
            '<tpl for="errors"><tpl if="xindex &gt; 1">\n</tpl>{.}</tpl>',
        '</tpl>'
    ],

    /**
     * @property {Boolean} isFieldLabelable
     * Flag denoting that this object is labelable as a field. Always true.
     */
    isFieldLabelable: true,

    /**
     * @cfg {String} formItemCls
     * A CSS class to be applied to the outermost element to denote that it is participating in the form field layout.
     */
    formItemCls: Ext.baseCSSPrefix + 'form-item',

    /**
     * @cfg {String} labelCls
     * The CSS class to be applied to the label element. This (single) CSS class is used to formulate the renderSelector
     * and drives the field layout where it is concatenated with a hyphen ('-') and {@link #labelAlign}. To add
     * additional classes, use {@link #labelClsExtra}.
     */
    labelCls: Ext.baseCSSPrefix + 'form-item-label',

    /**
     * @cfg {String} labelClsExtra
     * An optional string of one or more additional CSS classes to add to the label element. Defaults to empty.
     */

    /**
     * @cfg {String} errorMsgCls
     * The CSS class to be applied to the error message element.
     */
    errorMsgCls: Ext.baseCSSPrefix + 'form-error-msg',

    /**
     * @cfg {String} baseBodyCls
     * The CSS class to be applied to the body content element.
     */
    baseBodyCls: Ext.baseCSSPrefix + 'form-item-body',

    // private
    inputRowCls: Ext.baseCSSPrefix + 'form-item-input-row',

    /**
     * @cfg {String} fieldBodyCls
     * An extra CSS class to be applied to the body content element in addition to {@link #baseBodyCls}.
     */
    fieldBodyCls: '',

    /**
     * @cfg {String} clearCls
     * The CSS class to be applied to the special clearing div rendered directly after the field contents wrapper to
     * provide field clearing.
     */
    clearCls: Ext.baseCSSPrefix + 'clear',

    /**
     * @cfg {String} invalidCls
     * The CSS class to use when marking the component invalid.
     */
    invalidCls : Ext.baseCSSPrefix + 'form-invalid',

    /**
     * @cfg {String} fieldLabel
     * The label for the field. It gets appended with the {@link #labelSeparator}, and its position and sizing is
     * determined by the {@link #labelAlign}, {@link #labelWidth}, and {@link #labelPad} configs.
     */
    fieldLabel: undefined,

    /**
     * @cfg {String} labelAlign
     * Controls the position and alignment of the {@link #fieldLabel}. Valid values are:
     *
     *   - "left" (the default) - The label is positioned to the left of the field, with its text aligned to the left.
     *     Its width is determined by the {@link #labelWidth} config.
     *   - "top" - The label is positioned above the field.
     *   - "right" - The label is positioned to the left of the field, with its text aligned to the right.
     *     Its width is determined by the {@link #labelWidth} config.
     */
    labelAlign : 'left',

    /**
     * @cfg {Number} labelWidth
     * The width of the {@link #fieldLabel} in pixels. Only applicable if the {@link #labelAlign} is set to "left" or
     * "right".
     */
    labelWidth: 100,

    /**
     * @cfg {Number} labelPad
     * The amount of space in pixels between the {@link #fieldLabel} and the input field.
     */
    labelPad : 5,

    //<locale>
    /**
     * @cfg {String} labelSeparator
     * Character(s) to be inserted at the end of the {@link #fieldLabel label text}.
     *
     * Set to empty string to hide the separator completely.
     */
    labelSeparator : ':',
    //</locale>

    /**
     * @cfg {String} labelStyle
     * A CSS style specification string to apply directly to this field's label.
     */

    /**
     * @cfg {Boolean} hideLabel
     * Set to true to completely hide the label element ({@link #fieldLabel} and {@link #labelSeparator}). Also see
     * {@link #hideEmptyLabel}, which controls whether space will be reserved for an empty fieldLabel.
     */
    hideLabel: false,

    /**
     * @cfg {Boolean} hideEmptyLabel
     * When set to true, the label element ({@link #fieldLabel} and {@link #labelSeparator}) will be automatically
     * hidden if the {@link #fieldLabel} is empty. Setting this to false will cause the empty label element to be
     * rendered and space to be reserved for it; this is useful if you want a field without a label to line up with
     * other labeled fields in the same form.
     *
     * If you wish to unconditionall hide the label even if a non-empty fieldLabel is configured, then set the
     * {@link #hideLabel} config to true.
     */
    hideEmptyLabel: true,

    /**
     * @cfg {Boolean} preventMark
     * true to disable displaying any {@link #setActiveError error message} set on this object.
     */
    preventMark: false,

    /**
     * @cfg {Boolean} autoFitErrors
     * Whether to adjust the component's body area to make room for 'side' or 'under' {@link #msgTarget error messages}.
     */
    autoFitErrors: true,

    /**
     * @cfg {String} msgTarget
     * The location where the error message text should display. Must be one of the following values:
     *
     *   - `qtip` Display a quick tip containing the message when the user hovers over the field.
     *     This is the default.
     *
     *     **{@link Ext.tip.QuickTipManager#init} must have been called for this setting to work.**
     *
     *   - `title` Display the message in a default browser title attribute popup.
     *   - `under` Add a block div beneath the field containing the error message.
     *   - `side` Add an error icon to the right of the field, displaying the message in a popup on hover.
     *   - `none` Don't display any error message. This might be useful if you are implementing custom error display.
     *   - `[element id]` Add the error message directly to the innerHTML of the specified element.
     */
    msgTarget: 'qtip',

    /**
     * @cfg {String} activeError
     * If specified, then the component will be displayed with this value as its active error when first rendered. Use
     * {@link #setActiveError} or {@link #unsetActiveError} to change it after component creation.
     */

    /**
     * @private
     * Tells the layout system that the height can be measured immediately because the width does not need setting.
     */
    noWrap: true,

    labelableInsertions: [

        /**
         * @cfg {String/Array/Ext.XTemplate} beforeBodyEl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * at the beginning of the input containing element. If an `XTemplate` is used, the component's {@link Ext.AbstractComponent#renderData render data}
         * serves as the context.
         */
        'beforeBodyEl',

        /**
         * @cfg {String/Array/Ext.XTemplate} afterBodyEl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * at the end of the input containing element. If an `XTemplate` is used, the component's {@link Ext.AbstractComponent#renderData render data}
         * serves as the context.
         */
        'afterBodyEl',

        /**
         * @cfg {String/Array/Ext.XTemplate} beforeLabelTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * before the label element. If an `XTemplate` is used, the component's {@link Ext.AbstractComponent#renderData render data}
         * serves as the context.
         */
        'beforeLabelTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} afterLabelTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * after the label element. If an `XTemplate` is used, the component's {@link Ext.AbstractComponent#renderData render data}
         * serves as the context.
         */
        'afterLabelTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} beforeSubTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * before the {@link #getSubTplMarkup subTpl markup}. If an `XTemplate` is used, the
         * component's {@link Ext.AbstractComponent#renderData render data} serves as the context.
         */
        'beforeSubTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} afterSubTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * after the {@link #getSubTplMarkup subTpl markup}. If an `XTemplate` is used, the
         * component's {@link Ext.AbstractComponent#renderData render data} serves as the context.
         */
        'afterSubTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} beforeLabelTextTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * before the label text. If an `XTemplate` is used, the component's {@link Ext.AbstractComponent#renderData render data}
         * serves as the context.
         */
        'beforeLabelTextTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} afterLabelTextTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * after the label text. If an `XTemplate` is used, the component's {@link Ext.AbstractComponent#renderData render data}
         * serves as the context.
         */
        'afterLabelTextTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} labelAttrTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * inside the label element (as attributes). If an `XTemplate` is used, the component's
         * {@link Ext.AbstractComponent#renderData render data} serves as the context.
         */
        'labelAttrTpl'
    ],

    // This is an array to avoid a split on every call to Ext.copyTo
    labelableRenderProps: ['allowBlank', 'id', 'labelAlign', 'fieldBodyCls', 'extraFieldBodyCls', 
        'baseBodyCls', 'clearCls', 'labelSeparator', 'msgTarget', 'inputRowCls'],

    /**
     * Performs initialization of this mixin. Component classes using this mixin should call this method during their
     * own initialization.
     */
    initLabelable: function() {
        var me = this,
            padding = me.padding;

        // This Component is rendered as a table. Padding doesn't work on tables
        // Before padding can be applied to the encapsulating table element, copy the padding into
        // an extraMargins property which is to be added to all computed margins post render :(
        if (padding) {
            me.padding = undefined;
            me.extraMargins = Ext.Element.parseBox(padding);
        }
        
        if (!me.activeErrorsTpl) {
            if (me.msgTarget == 'title') {
                me.activeErrorsTpl = me.plaintextActiveErrorsTpl;
            } else {
                me.activeErrorsTpl = me.htmlActiveErrorsTpl;
            }
        }

        me.addCls(Ext.plainTableCls);
        me.addCls(me.formItemCls);
        
        // Prevent first render of active error, at Field render time from signalling a change from undefined to "
        me.lastActiveError = '';

        me.addEvents(
            /**
             * @event errorchange
             * Fires when the active error message is changed via {@link #setActiveError}.
             * @param {Ext.form.Labelable} this
             * @param {String} error The active error message
             */
            'errorchange'
        );

        // bubbleEvents on the prototype of a mixin won't work, so call enableBubble
        me.enableBubble('errorchange');
    },

    /**
     * Returns the trimmed label by slicing off the label separator character. Can be overridden.
     * @return {String} The trimmed field label, or empty string if not defined
     */
    trimLabelSeparator: function() {
        var me = this,
            separator = me.labelSeparator,
            label = me.fieldLabel || '',
            lastChar = label.substr(label.length - 1);

        // if the last char is the same as the label separator then slice it off otherwise just return label value
        return lastChar === separator ? label.slice(0, -1) : label;
    },

    /**
     * Returns the label for the field. Defaults to simply returning the {@link #fieldLabel} config. Can be overridden
     * to provide a custom generated label.
     * @template
     * @return {String} The configured field label, or empty string if not defined
     */
    getFieldLabel: function() {
        return this.trimLabelSeparator();
    },
    
    /**
     * Set the label of this field.
     * @param {String} label The new label. The {@link #labelSeparator} will be automatically appended to the label
     * string.
     */
    setFieldLabel: function(label){
        label = label || '';
        
        var me = this,
            separator = me.labelSeparator,
            labelEl = me.labelEl;
        
        me.fieldLabel = label;
        if (me.rendered) {
            if (Ext.isEmpty(label) && me.hideEmptyLabel) {
                labelEl.parent().setDisplayed('none');
            } else {
                if (separator) {
                    label = me.trimLabelSeparator() + separator;
                }
                labelEl.update(label);
                labelEl.parent().setDisplayed('');
            }
            me.updateLayout();
        }
    },

    getInsertionRenderData: function (data, names) {
        var i = names.length,
            name, value;

        while (i--) {
            name = names[i];
            value = this[name];

            if (value) {
                if (typeof value != 'string') {
                    if (!value.isTemplate) {
                        value = Ext.XTemplate.getTpl(this, name);
                    }
                    value = value.apply(data);
                }
            }

            data[name] = value || '';
        }

        return data;
    },

    /**
     * Generates the arguments for the field decorations {@link #labelableRenderTpl rendering template}.
     * @return {Object} The template arguments
     * @protected
     */
    getLabelableRenderData: function() {
        var me = this,
            data,
            tempEl,
            topLabel = me.labelAlign === 'top';

        if (!Ext.form.Labelable.errorIconWidth) {
            tempEl = Ext.getBody().createChild({style: 'position:absolute', cls: Ext.baseCSSPrefix + 'form-invalid-icon'});
            Ext.form.Labelable.errorIconWidth = tempEl.getWidth() + tempEl.getMargin('l');
            tempEl.remove();
        }

        data = Ext.copyTo({
            inFormLayout   : me.ownerLayout && me.ownerLayout.type === 'form',
            inputId        : me.getInputId(),
            labelOnLeft    : !topLabel,
            hideLabel      : !me.hasVisibleLabel(),
            fieldLabel     : me.getFieldLabel(),
            labelCellStyle : me.getLabelCellStyle(),
            labelCellAttrs : me.getLabelCellAttrs(),
            labelCls       : me.getLabelCls(),
            labelStyle     : me.getLabelStyle(),
            bodyColspan    : me.getBodyColspan(),
            externalError  : !me.autoFitErrors,
            errorMsgCls    : me.getErrorMsgCls(),
            errorIconWidth : Ext.form.Labelable.errorIconWidth
        },
        me, me.labelableRenderProps, true);

        me.getInsertionRenderData(data, me.labelableInsertions);

        return data;
    },

    xhooks: {
        beforeRender: function() {
            var me = this;
            me.setFieldDefaults(me.getHierarchyState().fieldDefaults);
            if (me.ownerLayout) {
                me.addCls(Ext.baseCSSPrefix + me.ownerLayout.type + '-form-item');
            }
        },

        onRender: function() {
            var me = this,
                margins,
                side,
                style = {};

            if (me.extraMargins) {
                margins = me.el.getMargin();
                for (side in margins) {
                    if (margins.hasOwnProperty(side)) {
                        style['margin-' + side] = (margins[side] + me.extraMargins[side]) + 'px';
                    }
                }
                me.el.setStyle(style);
            }
        }
    },
    
    /**
     * Checks if the field has a visible label
     * @return {Boolean} True if the field has a visible label
     */
    hasVisibleLabel: function(){
        if (this.hideLabel) {
            return false;
        }
        return !(this.hideEmptyLabel && !this.getFieldLabel());
    },
    
    /**
     * Gets the width of the label (if visible)
     * @return {Number} The label width
     */
    getLabelWidth: function(){
        var me = this;
        if (!me.hasVisibleLabel()) {
            return 0;
        }
        return me.labelWidth + me.labelPad;
    },
    
    /**
     * @private
     * Calculates the colspan value for the body cell - the cell which contains the input field.
     *
     * The field table structure contains 4 columns:
     */
    getBodyColspan: function() {
        var me = this,
            result;

        if (me.msgTarget === 'side' && (!me.autoFitErrors || me.hasActiveError())) {
            result = 1;
        } else {
            result = 2;
        }
        if (me.labelAlign !== 'top' && !me.hasVisibleLabel()) {
            result++;
        }
        return result;
    },
    
    getLabelCls: function() {
        var labelCls = this.labelCls + ' ' + Ext.dom.Element.unselectableCls,
            labelClsExtra = this.labelClsExtra;

        return labelClsExtra ? labelCls + ' ' + labelClsExtra : labelCls;
    },

    getLabelCellStyle: function() {
        var me = this,
            hideLabelCell = me.hideLabel || (!me.getFieldLabel() && me.hideEmptyLabel);

        return hideLabelCell ? 'display:none;' : '';
    },
    
    getErrorMsgCls: function() {
        var me = this,
            hideLabelCell = (me.hideLabel || (!me.fieldLabel && me.hideEmptyLabel));
        
        return me.errorMsgCls + (!hideLabelCell && me.labelAlign === 'top' ? ' ' + Ext.baseCSSPrefix + 'lbl-top-err-icon' : '');
    },

    getLabelCellAttrs: function() {
        var me = this,
            labelAlign = me.labelAlign,
            result = '';

        if (labelAlign !== 'top') {
            result = 'valign="top" halign="' + labelAlign + '" width="' + (me.labelWidth + me.labelPad) + '"';
        }
        return result + ' class="' + Ext.baseCSSPrefix + 'field-label-cell"';
    },
    
    /**
     * Gets any label styling for the labelEl
     * @private
     * @return {String} The label styling
     */
    getLabelStyle: function(){
        var me = this,
            labelPad = me.labelPad,
            labelStyle = '';

        // Calculate label styles up front rather than in the Field layout for speed; this
        // is safe because label alignment/width/pad are not expected to change.
        if (me.labelAlign !== 'top') {
            if (me.labelWidth) {
                labelStyle = 'width:' + me.labelWidth + 'px;';
            }
            if (labelPad) {
                labelStyle += 'margin-right:' + labelPad + 'px;';
            }
        }
        
        return labelStyle + (me.labelStyle || '');
    },

    /**
     * Gets the markup to be inserted into the outer template's bodyEl. Defaults to empty string, should be implemented
     * by classes including this mixin as needed.
     * @return {String} The markup to be inserted
     * @protected
     */
    getSubTplMarkup: function() {
        return '';
    },

    /**
     * Get the input id, if any, for this component. This is used as the "for" attribute on the label element.
     * Implementing subclasses may also use this as e.g. the id for their own input element.
     * @return {String} The input id
     */
    getInputId: function() {
        return '';
    },

    /**
     * Gets the active error message for this component, if any. This does not trigger validation on its own, it merely
     * returns any message that the component may already hold.
     * @return {String} The active error message on the component; if there is no error, an empty string is returned.
     */
    getActiveError : function() {
        return this.activeError || '';
    },

    /**
     * Tells whether the field currently has an active error message. This does not trigger validation on its own, it
     * merely looks for any message that the component may already hold.
     * @return {Boolean}
     */
    hasActiveError: function() {
        return !!this.getActiveError();
    },

    /**
     * Sets the active error message to the given string. This replaces the entire error message contents with the given
     * string. Also see {@link #setActiveErrors} which accepts an Array of messages and formats them according to the
     * {@link #activeErrorsTpl}. Note that this only updates the error message element's text and attributes, you'll
     * have to call doComponentLayout to actually update the field's layout to match. If the field extends {@link
     * Ext.form.field.Base} you should call {@link Ext.form.field.Base#markInvalid markInvalid} instead.
     * @param {String} msg The error message
     */
    setActiveError: function(msg) {
        this.setActiveErrors(msg);
    },

    /**
     * Gets an Array of any active error messages currently applied to the field. This does not trigger validation on
     * its own, it merely returns any messages that the component may already hold.
     * @return {String[]} The active error messages on the component; if there are no errors, an empty Array is
     * returned.
     */
    getActiveErrors: function() {
        return this.activeErrors || [];
    },

    /**
     * Set the active error message to an Array of error messages. The messages are formatted into a single message
     * string using the {@link #activeErrorsTpl}. Also see {@link #setActiveError} which allows setting the entire error
     * contents with a single string. Note that this only updates the error message element's text and attributes,
     * you'll have to call doComponentLayout to actually update the field's layout to match. If the field extends
     * {@link Ext.form.field.Base} you should call {@link Ext.form.field.Base#markInvalid markInvalid} instead.
     * @param {String[]} errors The error messages
     */
    setActiveErrors: function(errors) {
        errors = Ext.Array.from(errors);
        this.activeError = errors[0];
        this.activeErrors = errors;
        this.activeError = this.getTpl('activeErrorsTpl').apply({
            errors: errors,
            listCls: Ext.plainListCls 
        });
        this.renderActiveError();
    },

    /**
     * Clears the active error message(s). Note that this only clears the error message element's text and attributes,
     * you'll have to call doComponentLayout to actually update the field's layout to match. If the field extends {@link
     * Ext.form.field.Base} you should call {@link Ext.form.field.Base#clearInvalid clearInvalid} instead.
     */
    unsetActiveError: function() {
        delete this.activeError;
        delete this.activeErrors;
        this.renderActiveError();
    },

    /**
     * @private
     * Updates the rendered DOM to match the current activeError. This only updates the content and
     * attributes, you'll have to call doComponentLayout to actually update the display.
     */
    renderActiveError: function() {
        var me = this,
            activeError = me.getActiveError(),
            hasError = !!activeError;

        if (activeError !== me.lastActiveError) {
            me.fireEvent('errorchange', me, activeError);
            me.lastActiveError = activeError;
        }

        if (me.rendered && !me.isDestroyed && !me.preventMark) {
            // Add/remove invalid class
            me.el[hasError ? 'addCls' : 'removeCls'](me.invalidCls);

            // Update the aria-invalid attribute
            me.getActionEl().dom.setAttribute('aria-invalid', hasError);

            // Update the errorEl (There will only be one if msgTarget is 'side' or 'under') with the error message text
            if (me.errorEl) {
                me.errorEl.dom.innerHTML = activeError;
            }
        }
    },

    /**
     * Applies a set of default configuration values to this Labelable instance. For each of the properties in the given
     * object, check if this component hasOwnProperty that config; if not then it's inheriting a default value from its
     * prototype and we should apply the default value.
     * @param {Object} defaults The defaults to apply to the object.
     */
    setFieldDefaults: function(defaults) {
        var key;

        for (key in defaults) {
            if (!this.hasOwnProperty(key)) {
                this[key] = defaults[key];
            }
        }
    }
});
