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
    extend: 'Ext.Mixin',

    requires: [
        'Ext.XTemplate',
        'Ext.overrides.dom.Element'
    ],

    isLabelable: true,

    mixinConfig: {
        id: 'labelable',

        on: {
            beforeRender: 'beforeLabelRender',
            onRender: 'onLabelRender'
        }
    },

    config: {
        childEls: [
            /**
             * @property {Ext.dom.Element} labelEl
             * The label Element for this component. Only available after the component has been rendered.
             */
            'labelEl',

            /**
             * @property {Ext.dom.Element} bodyEl
             * The div Element wrapping the component's contents. Only available after the component has been rendered.
             */
            'bodyEl',

            /**
             * @property {Ext.dom.Element} errorEl
             * The div Element that will contain the component's error message(s). Note that depending on the configured
             * {@link #msgTarget}, this element may be hidden in favor of some other form of presentation, but will always
             * be present in the DOM for use by assistive technologies.
             */
            'errorEl',

            'errorWrapEl'
        ]
    },

    /**
     * @cfg {String/String[]/Ext.XTemplate} labelableRenderTpl
     * The rendering template for the field decorations. Component classes using this mixin
     * should include logic to use this as their {@link Ext.Component#renderTpl renderTpl},
     * and implement the {@link #getSubTplMarkup} method to generate the field body content.
     * @private
     */
    labelableRenderTpl: [
        '{beforeLabelTpl}',
        '<label id="{id}-labelEl" data-ref="labelEl" class="{labelCls} {labelCls}-{ui} {labelClsExtra} ',
                '{unselectableCls}" style="{labelStyle}"<tpl if="inputId">',
                ' for="{inputId}"</tpl> {labelAttrTpl}>',
            '<span class="{labelInnerCls} {labelInnerCls}-{ui}" style="{labelInnerStyle}">',
            '{beforeLabelTextTpl}',
            '<tpl if="fieldLabel">{fieldLabel}',
                '<tpl if="labelSeparator">',
                    '<span role="separator">{labelSeparator}</span>',
                '</tpl>',
            '</tpl>',
            '{afterLabelTextTpl}',
            '</span>',
        '</label>',
        '{afterLabelTpl}',
        '<div id="{id}-bodyEl" data-ref="bodyEl" class="{baseBodyCls} {baseBodyCls}-{ui}<tpl if="fieldBodyCls">',
            ' {fieldBodyCls} {fieldBodyCls}-{ui}</tpl> {growCls} {extraFieldBodyCls}"',
            '<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
            '{beforeBodyEl}',
            '{beforeSubTpl}',
            '{[values.$comp.getSubTplMarkup(values)]}',
            '{afterSubTpl}',
            '{afterBodyEl}',
        '</div>',
        '<tpl if="renderError">',
            '<div id="{id}-errorWrapEl" data-ref="errorWrapEl" class="{errorWrapCls} {errorWrapCls}-{ui}',
                ' {errorWrapExtraCls}" style="{errorWrapStyle}">',
                '<div role="alert" aria-live="polite" id="{id}-errorEl" data-ref="errorEl" ',
                    'class="{errorMsgCls} {invalidMsgCls} {invalidMsgCls}-{ui}" ',
                    'data-anchorTarget="{id}-inputEl">',
                '</div>',
            '</div>',
        '</tpl>',
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
            '<ul class="{listCls}">',
                '<tpl if="Ext.enableAria">',
                    '<tpl if="fieldLabel"><div>{fieldLabel}</div></tpl>',
                '</tpl>',
                '<tpl for="errors"><li>{.}</li></tpl>',
            '</ul>',
        '</tpl>'
    ],

    plaintextActiveErrorsTpl: [
        '<tpl if="errors && errors.length">',
            '<tpl if="Ext.enableAria">',
                '<tpl if="fieldLabel">{fieldLabel}\n</tpl>',
            '</tpl>',
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

    // private
    topLabelCls: Ext.baseCSSPrefix + 'form-item-label-top',
    rightLabelCls: Ext.baseCSSPrefix + 'form-item-label-right',
    labelInnerCls: Ext.baseCSSPrefix + 'form-item-label-inner',
    topLabelSideErrorCls: Ext.baseCSSPrefix + 'form-item-label-top-side-error',

    /**
     * @cfg {String} labelClsExtra
     * An optional string of one or more additional CSS classes to add to the label element. Defaults to empty.
     */

    /**
     * @cfg {String} errorMsgCls
     * The CSS class to be applied to the error message element.
     */
    errorMsgCls: Ext.baseCSSPrefix + 'form-error-msg',

    errorWrapCls: Ext.baseCSSPrefix + 'form-error-wrap',
    errorWrapSideCls: Ext.baseCSSPrefix + 'form-error-wrap-side',
    errorWrapUnderCls: Ext.baseCSSPrefix + 'form-error-wrap-under',
    errorWrapUnderSideLabelCls: Ext.baseCSSPrefix + 'form-error-wrap-under-side-label',

    /**
     * @cfg {String} baseBodyCls
     * The CSS class to be applied to the body content element.
     */
    baseBodyCls: Ext.baseCSSPrefix + 'form-item-body',

    invalidIconCls: Ext.baseCSSPrefix + 'form-invalid-icon',

    invalidUnderCls: Ext.baseCSSPrefix + 'form-invalid-under',

    /**
     * @cfg {String} fieldBodyCls
     * An extra CSS class to be applied to the body content element in addition to {@link #baseBodyCls}.
     */
    fieldBodyCls: '',

    /**
     * @cfg {String} invalidCls
     * The CSS class to use when marking the component invalid.
     */
    invalidCls : Ext.baseCSSPrefix + 'form-invalid',

    /**
     * @cfg {String} fieldLabel
     * The label for the field. It gets appended with the {@link #labelSeparator}, and its position and sizing is
     * determined by the {@link #labelAlign} and {@link #labelWidth} configs.
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
     * The width of the {@link #fieldLabel} in pixels. Only applicable if {@link #labelAlign}
     * is set to "left" or "right".
     */
    labelWidth: 100,

    /**
     * @cfg {Number} labelPad
     * The amount of space in pixels between the {@link #fieldLabel} and the field body.
     * This defaults to `5` for compatibility with Ext JS 4, however, as of Ext JS 5
     * the space between the label and the body can optionally be determined by the theme
     * using the {@link #$form-label-horizontal-spacing} (for side-aligned labels) and
     * {@link #$form-label-vertical-spacing} (for top-aligned labels) SASS variables.
     * In order for the stylesheet values as to take effect, you must use a labelPad value
     * of `null`.
     */
    labelPad: 5,

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
     * Whether to adjust the component's body width to make room for 'side'
     * {@link #msgTarget error messages}.
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

    // private map for msg target lookup, if target is not in this map it is assumed
    // to be an element id
    msgTargets: {
        qtip: 1,
        title: 1,
        under: 1,
        side: 1,
        none: 1
    },

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
         * at the beginning of the input containing element. If an `XTemplate` is used, the component's {@link Ext.Component#renderData render data}
         * serves as the context.
         */
        'beforeBodyEl',

        /**
         * @cfg {String/Array/Ext.XTemplate} afterBodyEl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * at the end of the input containing element. If an `XTemplate` is used, the component's {@link Ext.Component#renderData render data}
         * serves as the context.
         */
        'afterBodyEl',

        /**
         * @cfg {String/Array/Ext.XTemplate} beforeLabelTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * before the label element. If an `XTemplate` is used, the component's {@link Ext.Component#renderData render data}
         * serves as the context.
         */
        'beforeLabelTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} afterLabelTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * after the label element. If an `XTemplate` is used, the component's {@link Ext.Component#renderData render data}
         * serves as the context.
         */
        'afterLabelTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} beforeSubTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * before the {@link #getSubTplMarkup subTpl markup}. If an `XTemplate` is used, the
         * component's {@link Ext.Component#renderData render data} serves as the context.
         */
        'beforeSubTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} afterSubTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * after the {@link #getSubTplMarkup subTpl markup}. If an `XTemplate` is used, the
         * component's {@link Ext.Component#renderData render data} serves as the context.
         */
        'afterSubTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} beforeLabelTextTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * before the label text. If an `XTemplate` is used, the component's {@link Ext.Component#renderData render data}
         * serves as the context.
         */
        'beforeLabelTextTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} afterLabelTextTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * after the label text. If an `XTemplate` is used, the component's {@link Ext.Component#renderData render data}
         * serves as the context.
         */
        'afterLabelTextTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} labelAttrTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * inside the label element (as attributes). If an `XTemplate` is used, the component's
         * {@link Ext.Component#renderData render data} serves as the context.
         */
        'labelAttrTpl'
    ],

    statics: {
        /**
         * Use a custom QuickTip instance separate from the main QuickTips singleton, so that we
         * can give it a custom frame style. Responds to errorqtip rather than the qtip property.
         * @static
         * @private
         */
        initTip: function() {
            var tip = this.tip,
                cfg;

            if (!tip) {
                cfg = {
                    id: 'ext-form-error-tip',
                    //<debug>
                    // tell the spec runner to ignore this element when checking if the dom is clean
                    sticky: true,
                    //</debug>
                    ui: 'form-invalid'
                };

                // On Touch devices, tapping the target shows the qtip
                if (Ext.supports.Touch) {
                    cfg.dismissDelay = 0;
                    cfg.anchor = 'top';
                    cfg.showDelay = 0;
                    cfg.listeners = {
                        beforeshow: function() {
                            this.minWidth = Ext.fly(this.anchorTarget).getWidth();
                        }
                    }
                }
                tip = this.tip = Ext.create('Ext.tip.QuickTip', cfg);
                tip.tagConfig = Ext.apply({}, {
                    attribute: 'errorqtip'
                }, tip.tagConfig);
            }
        }
    },

    /**
     * @event errorchange
     * Fires when the active error message is changed via {@link #setActiveError}.
     * @param {Ext.form.Labelable} this
     * @param {String} error The active error message
     */

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

        me.addCls([me.formItemCls, me.formItemCls + '-' + me.ui]);

        // Prevent first render of active error, at Field render time from signalling a change from undefined to "
        me.lastActiveError = '';

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
            labelEl = me.labelEl,
            errorWrapEl = me.errorWrapEl,
            errorWrapUnderSideLabelCls = me.errorWrapUnderSideLabelCls;

        me.fieldLabel = label;
        if (me.rendered) {
            if (Ext.isEmpty(label) && me.hideEmptyLabel) {
                labelEl.setDisplayed('none');
                if (errorWrapEl) {
                    errorWrapEl.removeCls(errorWrapUnderSideLabelCls);
                }
            } else {
                if (separator) {
                    label = me.trimLabelSeparator() + '<span role="separator">' +
                        separator + '</span>';
                }
                labelEl.first().setHtml(label);
                labelEl.setDisplayed('');
                if (errorWrapEl) {
                    errorWrapEl.addCls(errorWrapUnderSideLabelCls);
                }
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
     * Generates the arguments for the field decorations {@link #labelableRenderTpl
     * rendering template}.
     * @param {Object} data optional object to use as the base data object.  If provided,
     * this method will add properties to the base object instead of creating a new one.
     * @return {Object} The template arguments
     * @protected
     */
    getLabelableRenderData: function() {
        var me = this,
            labelAlign = me.labelAlign,
            topLabel = (labelAlign === 'top'),
            rightLabel = (labelAlign === 'right'),
            sideError = (me.msgTarget === 'side'),
            underError = (me.msgTarget === 'under'),
            errorMsgCls = me.errorMsgCls,
            labelPad = me.labelPad,
            labelWidth = me.labelWidth,
            labelClsExtra = me.labelClsExtra || '',
            errorWrapExtraCls = sideError ? me.errorWrapSideCls : me.errorWrapUnderCls,
            labelStyle = '',
            labelInnerStyle = '',
            labelVisible = me.hasVisibleLabel(),
            autoFitErrors = me.autoFitErrors,
            defaultBodyWidth = me.defaultBodyWidth,
            bodyStyle, data;

        if (topLabel) {
            labelClsExtra += ' ' + me.topLabelCls;
            if (labelPad) {
                labelInnerStyle = 'padding-bottom:' + labelPad + 'px;';
            }
            if (sideError && !autoFitErrors) {
                labelClsExtra += ' ' + me.topLabelSideErrorCls;
            }
        } else {
            if (rightLabel) {
                labelClsExtra += ' ' + me.rightLabelCls;
            }
            if (labelPad) {
                labelStyle += me.getHorizontalPaddingStyle() + labelPad + 'px;';
            }
            labelStyle += 'width:' + (labelWidth + (labelPad ? labelPad : 0)) + 'px;';
            // inner label needs width as well so that setting width on the outside
            // that is smaller than the natural width, will be ensured to take width
            // away from the body, and not the label.
            labelInnerStyle = 'width:' + labelWidth + 'px';
        }

        if (labelVisible) {
            if (!topLabel && underError) {
                errorWrapExtraCls += ' ' + me.errorWrapUnderSideLabelCls;
            }
        } else {
            labelStyle += 'display:none';
        }

        if (defaultBodyWidth) {
            // This is here to support textfield's deprecated "size" config
            bodyStyle = 'min-width:' + defaultBodyWidth + 'px;max-width:' +
                defaultBodyWidth + 'px;';
        }

        data = {
            id: me.id,
            inputId: me.getInputId(),
            labelCls: me.labelCls,
            labelClsExtra: labelClsExtra,
            labelStyle: labelStyle,
            labelInnerStyle: labelInnerStyle,
            labelInnerCls: me.labelInnerCls,
            unselectableCls: Ext.Element.unselectableCls,
            bodyStyle: bodyStyle,
            baseBodyCls: me.baseBodyCls,
            fieldBodyCls: me.fieldBodyCls,
            extraFieldBodyCls: me.extraFieldBodyCls,
            errorWrapCls: me.errorWrapCls,
            errorWrapExtraCls: errorWrapExtraCls,
            renderError: sideError || underError,
            invalidMsgCls: sideError ? me.invalidIconCls : underError ? me.invalidUnderCls : '',
            errorMsgCls: errorMsgCls,
            growCls: me.grow ? me.growCls : '',
            errorWrapStyle: (sideError && !autoFitErrors) ?
                    'visibility:hidden' : 'display:none',
            fieldLabel: me.getFieldLabel(),
            labelSeparator: me.labelSeparator
        };

        me.getInsertionRenderData(data, me.labelableInsertions);

        return data;
    },

    // hook for rtl
    getHorizontalPaddingStyle: function() {
        return 'padding-right:';
    },

    beforeLabelRender: function() {
        var me = this;
        me.setFieldDefaults(me.getInherited().fieldDefaults);
        if (me.ownerLayout) {
            me.addCls(Ext.baseCSSPrefix + me.ownerLayout.type + '-form-item');
        }
    },

    onLabelRender: function() {
        var me = this,
            style = {},
            ExtElement = Ext.Element,
            errorWrapEl = me.errorWrapEl,
            margins, side;

        if (errorWrapEl) {
            errorWrapEl.setVisibilityMode((me.msgTarget === 'side' && !me.autoFitErrors) ?
                ExtElement.VISIBILITY : ExtElement.DISPLAY);
        }

        if (me.extraMargins) {
            margins = me.el.getMargin();
            for (side in margins) {
                if (margins.hasOwnProperty(side)) {
                    style['margin-' + side] = (margins[side] + me.extraMargins[side]) + 'px';
                }
            }
            me.el.setStyle(style);
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
        var me = this,
            errorWrapEl = me.errorWrapEl,
            msgTarget = me.msgTarget,
            isSide = msgTarget === 'side',
            isQtip = msgTarget === 'qtip',
            activeError, tpl, targetEl;

        errors = Ext.Array.from(errors);
        tpl = me.getTpl('activeErrorsTpl');

        me.activeErrors = errors;
        activeError = me.activeError = tpl.apply({
            fieldLabel: me.fieldLabel,
            errors: errors,
            listCls: Ext.plainListCls
        });

        me.renderActiveError();

        if (me.rendered) {
            if (isSide) {
                me.errorEl.dom.setAttribute('data-errorqtip', activeError);
            } else if (isQtip) {
                me.getActionEl().dom.setAttribute('data-errorqtip', activeError);
            } else if (msgTarget === 'title') {
                me.getActionEl().dom.setAttribute('title', activeError);
            }

            if (isSide || isQtip) {
                Ext.form.Labelable.initTip();
            }

            if (!me.msgTargets[msgTarget]) {
                targetEl = Ext.get(msgTarget);

                if (targetEl) {
                    targetEl.dom.innerHTML = activeError;
                }
            }
        }

        if (errorWrapEl) {
            errorWrapEl.setVisible(errors.length > 0);
            if (isSide && me.autoFitErrors) {
                me.labelEl.addCls(me.topLabelSideErrorCls);
            }
            me.updateLayout();
        }
    },

    /**
     * Clears the active error message(s). Note that this only clears the error message element's text and attributes,
     * you'll have to call doComponentLayout to actually update the field's layout to match. If the field extends {@link
     * Ext.form.field.Base} you should call {@link Ext.form.field.Base#clearInvalid clearInvalid} instead.
     */
    unsetActiveError: function() {
        var me = this,
            errorWrapEl = me.errorWrapEl,
            msgTarget = me.msgTarget,
            targetEl;

        delete me.activeError;
        delete me.activeErrors;
        me.renderActiveError();

        if (me.rendered) {
            if (msgTarget === 'qtip') {
                me.getActionEl().dom.removeAttribute('data-errorqtip');
            } else if (msgTarget === 'title') {
                me.getActionEl().dom.removeAttribute('title');
            }

            if (!me.msgTargets[msgTarget]) {
                targetEl = Ext.get(msgTarget);

                if (targetEl) {
                    targetEl.dom.innerHTML = '';
                }
            }

            if (errorWrapEl) {
                errorWrapEl.hide();
                if (msgTarget === 'side' && me.autoFitErrors) {
                    me.labelEl.removeCls(me.topLabelSideErrorCls);
                }
                me.updateLayout();
            }
        }
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
            me.toggleInvalidCls(hasError);
            // Update the errorEl (There will only be one if msgTarget is 'side' or 'under') with the error message text
            if (me.errorEl) {
                me.errorEl.dom.innerHTML = activeError;
            }
        }
    },

    /**
     * @private
     * Add/remove invalid class(es)
     * @param {Boolean} hasError
     */
    toggleInvalidCls: function(hasError) {
        this.el[hasError ? 'addCls' : 'removeCls'](this.invalidCls);
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
}, function() {
    if (Ext.supports.Touch) {
        this.prototype.msgTarget = 'side';
    }
});
