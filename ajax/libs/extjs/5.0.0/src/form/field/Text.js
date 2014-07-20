/**
 * @docauthor Jason Johnston <jason@sencha.com>
 *
 * A basic text field.  Can be used as a direct replacement for traditional text inputs,
 * or as the base class for more sophisticated input controls (like {@link Ext.form.field.TextArea}
 * and {@link Ext.form.field.ComboBox}). Has support for empty-field placeholder values (see {@link #emptyText}).
 *
 * # Validation
 *
 * The Text field has a useful set of validations built in:
 *
 * - {@link #allowBlank} for making the field required
 * - {@link #minLength} for requiring a minimum value length
 * - {@link #maxLength} for setting a maximum value length (with {@link #enforceMaxLength} to add it
 *   as the `maxlength` attribute on the input element)
 * - {@link #regex} to specify a custom regular expression for validation
 *
 * In addition, custom validations may be added:
 *
 * - {@link #vtype} specifies a virtual type implementation from {@link Ext.form.field.VTypes} which can contain
 *   custom validation logic
 * - {@link #validator} allows a custom arbitrary function to be called during validation
 *
 * The details around how and when each of these validation options get used are described in the
 * documentation for {@link #getErrors}.
 *
 * By default, the field value is checked for validity immediately while the user is typing in the
 * field. This can be controlled with the {@link #validateOnChange}, {@link #checkChangeEvents}, and
 * {@link #checkChangeBuffer} configurations. Also see the details on Form Validation in the
 * {@link Ext.form.Panel} class documentation.
 *
 * # Masking and Character Stripping
 *
 * Text fields can be configured with custom regular expressions to be applied to entered values before
 * validation: see {@link #maskRe} and {@link #stripCharsRe} for details.
 *
 * # Example usage
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'Contact Info',
 *         width: 300,
 *         bodyPadding: 10,
 *         renderTo: Ext.getBody(),
 *         items: [{
 *             xtype: 'textfield',
 *             name: 'name',
 *             fieldLabel: 'Name',
 *             allowBlank: false  // requires a non-empty value
 *         }, {
 *             xtype: 'textfield',
 *             name: 'email',
 *             fieldLabel: 'Email Address',
 *             vtype: 'email'  // requires value to be a valid email address format
 *         }]
 *     });
 */
Ext.define('Ext.form.field.Text', {
    extend:'Ext.form.field.Base',
    alias: 'widget.textfield',
    requires: [
        'Ext.form.field.VTypes',
        'Ext.form.trigger.Trigger',
        'Ext.util.TextMetrics'
    ],
    alternateClassName: ['Ext.form.TextField', 'Ext.form.Text'],

    config: {
        /**
         * @cfg {Boolean} hideTrigger
         * `true` to hide all triggers
         */
        hideTrigger: false,

        /**
         * @cfg {Object} triggers
         * {@link Ext.form.trigger.Trigger Triggers} to use in this field.  The keys in
         * this object are unique identifiers for the triggers. The values in this object
         * are {@link Ext.form.trigger.Trigger Trigger} configuration objects.
         *
         *     @example
         *     Ext.create('Ext.form.field.Text', {
         *         renderTo: Ext.getBody(),
         *         fieldLabel: 'My Custom Field',
         *         triggers: {
         *             foo: {
         *                 cls: 'my-foo-trigger',
         *                 handler: function() {
         *                     console.log('foo trigger clicked');
         *                 }
         *             },
         *             bar: {
         *                 cls: 'my-bar-trigger',
         *                 handler: function() {
         *                     console.log('bar trigger clicked');
         *                 }
         *             }
         *         }
         *     });
         */
        triggers: undefined
    },

    /**
     * @cfg {String} vtypeText
     * A custom error message to display in place of the default message provided for the **`{@link #vtype}`** currently
     * set for this field. **Note**: only applies if **`{@link #vtype}`** is set, else ignored.
     */

    /**
     * @cfg {RegExp} stripCharsRe
     * A JavaScript RegExp object used to strip unwanted content from the value
     * during input. If `stripCharsRe` is specified,
     * every *character sequence* matching `stripCharsRe` will be removed.
     */

    /**
     * @cfg {Number} size
     * An initial value for the 'size' attribute on the text input element. This is only
     * used if the field has no configured {@link #width} and is not given a width by its
     * container's layout. Defaults to 20.
     * @deprecated use {@link #width} instead.
     */

    /**
     * @cfg {Boolean} [grow=false]
     * true if this field should automatically grow and shrink to its content
     */

    /**
     * @cfg {Number} growMin
     * The minimum width to allow when `{@link #grow} = true`
     */
    growMin : 30,

    /**
     * @cfg {Number} growMax
     * The maximum width to allow when `{@link #grow} = true`
     */
    growMax : 800,

    //<locale>
    /**
     * @cfg {String} growAppend
     * A string that will be appended to the field's current value for the purposes of calculating the target field
     * size. Only used when the {@link #grow} config is true. Defaults to a single capital "W" (the widest character in
     * common fonts) to leave enough space for the next typed character and avoid the field value shifting before the
     * width is adjusted.
     */
    growAppend: 'W',
    //</locale>

    /**
     * @cfg {String} vtype
     * A validation type name as defined in {@link Ext.form.field.VTypes}
     */

    /**
     * @cfg {RegExp} maskRe An input mask regular expression that will be used to filter keystrokes (character being
     * typed) that do not match.
     * Note: It does not filter characters already in the input.
     */

    /**
     * @cfg {Boolean} [disableKeyFilter=false]
     * Specify true to disable input keystroke filtering
     */

    /**
     * @cfg {Boolean} [allowBlank=true]
     * Specify false to validate that the value's length must be > 0. If `true`, then a blank value is **always** taken to be valid regardless of any {@link #vtype}
     * validation that may be applied.
     *
     * If {@link #vtype} validation must still be applied to blank values, configure {@link #validateBlank} as `true`;
     */
    allowBlank : true,

    /**
     * @cfg {Boolean} [validateBlank=false]
     * Specify as `true` to modify the behaviour of {@link #allowBlank} so that blank values are not passed as valid, but are subject to any configure {@link #vtype} validation.
     */
    validateBlank: false,

    /**
     * @cfg {Boolean} allowOnlyWhitespace
     * Specify false to automatically trim the value before validating
     * the whether the value is blank. Setting this to false automatically
     * sets {@link #allowBlank} to false.
     */
    allowOnlyWhitespace: true,

    /**
     * @cfg {Number} minLength
     * Minimum input field length required
     */
    minLength : 0,

    /**
     * @cfg {Number} maxLength
     * Maximum input field length allowed by validation. This behavior is intended to
     * provide instant feedback to the user by improving usability to allow pasting and editing or overtyping and back
     * tracking. To restrict the maximum number of characters that can be entered into the field use the
     * **{@link Ext.form.field.Text#enforceMaxLength enforceMaxLength}** option.
     *
     * Defaults to Number.MAX_VALUE.
     */
    maxLength : Number.MAX_VALUE,

    /**
     * @cfg {Boolean} enforceMaxLength
     * True to set the maxLength property on the underlying input field. Defaults to false
     */

    //<locale>
    /**
     * @cfg {String} minLengthText
     * Error text to display if the **{@link #minLength minimum length}** validation fails.
     */
    minLengthText : 'The minimum length for this field is {0}',
    //</locale>

    //<locale>
    /**
     * @cfg {String} maxLengthText
     * Error text to display if the **{@link #maxLength maximum length}** validation fails
     */
    maxLengthText : 'The maximum length for this field is {0}',
    //</locale>

    /**
     * @cfg {Boolean} [selectOnFocus=false]
     * `true` to automatically select any existing field text when the field receives input
     * focus. Only applies when {@link #editable editable} = true
     */

    //<locale>
    /**
     * @cfg {String} blankText
     * The error text to display if the **{@link #allowBlank}** validation fails
     */
    blankText : 'This field is required',
    //</locale>

    /**
     * @cfg {Function} validator
     * A custom validation function to be called during field validation ({@link #getErrors}).
     * If specified, this function will be called first, allowing the developer to override the default validation
     * process.
     *
     * This function will be passed the following parameters:
     *
     * @cfg {Object} validator.value The current field value
     * @cfg {Boolean/String} validator.return
     *
     * - True if the value is valid
     * - An error message if the value is invalid
     */

    /**
     * @cfg {RegExp} regex
     * A JavaScript RegExp object to be tested against the field value during validation.
     * If the test fails, the field will be marked invalid using
     * either **{@link #regexText}** or **{@link #invalidText}**.
     */

    /**
     * @cfg {String} regexText
     * The error text to display if **{@link #regex}** is used and the test fails during validation
     */
    regexText : '',

    /**
     * @cfg {String} emptyText
     * The default text to place into an empty field.
     *
     * Note that normally this value will be submitted to the server if this field is enabled; to prevent this you can
     * set the {@link Ext.form.action.Action#submitEmptyText submitEmptyText} option of {@link Ext.form.Basic#submit} to
     * false.
     *
     * Also note that if you use {@link #inputType inputType}:'file', {@link #emptyText} is not supported and should be
     * avoided.
     *
     * Note that for browsers that support it, setting this property will use the HTML 5 placeholder attribute, and for
     * older browsers that don't support the HTML 5 placeholder attribute the value will be placed directly into the input
     * element itself as the raw value. This means that older browsers will obfuscate the {@link #emptyText} value for
     * password input fields.
     */

    /**
     * @cfg {String} [emptyCls='x-form-empty-field']
     * The CSS class to apply to an empty field to style the **{@link #emptyText}**.
     * This class is automatically added and removed as needed depending on the current field value.
     */
    emptyCls : Ext.baseCSSPrefix + 'form-empty-field',

    /**
     * @cfg {String} [requiredCls='x-form-required-field']
     * The CSS class to apply to a required field, i.e. a field where **{@link #allowBlank}** is false.
     */
    requiredCls : Ext.baseCSSPrefix + 'form-required-field',

    /**
     * @cfg {Boolean} [enableKeyEvents=false]
     * true to enable the proxying of key events for the HTML input field
     */

    // private
    valueContainsPlaceholder : false,

    ariaRole: 'textbox',

    /**
     * @cfg {Boolean} editable
     * false to prevent the user from typing text directly into the field; the field can
     * only have its value set programmatically or via an action invoked by a trigger.
     */
    editable: true,

    /**
     * @cfg {Boolean} repeatTriggerClick
     * `true` to attach a {@link Ext.util.ClickRepeater click repeater} to the trigger(s).
     * Click repeating behavior can also be configured on the individual {@link #triggers
     * trigger instances using the trigger's {@link {Ext.form.trigger.Trigger#repeatClick
     * repeatClick} config.
     */
    repeatTriggerClick: false,

    /**
     * @cfg {Boolean} readOnly
     * `true` to prevent the user from changing the field, and hide all triggers.
     */

    /**
     * @cfg {String}
     * The CSS class that is added to the div wrapping the input element and trigger button(s).
     */
    triggerWrapCls: Ext.baseCSSPrefix + 'form-trigger-wrap',

    triggerWrapFocusCls: Ext.baseCSSPrefix + 'form-trigger-wrap-focus',
    triggerWrapInvalidCls: Ext.baseCSSPrefix + 'form-trigger-wrap-invalid',

    fieldBodyCls: Ext.baseCSSPrefix + 'form-text-field-body',

    /**
     * @cfg {String}
     * The CSS class that is added to the element wrapping the input element
     */
    inputWrapCls: Ext.baseCSSPrefix + 'form-text-wrap',

    inputWrapFocusCls: Ext.baseCSSPrefix + 'form-text-wrap-focus',
    inputWrapInvalidCls: Ext.baseCSSPrefix + 'form-text-wrap-invalid',
    growCls: Ext.baseCSSPrefix + 'form-text-grow',

    // private
    monitorTab: true,
    // private
    mimicing: false,

    childEls: [
        /**
         * @property {Ext.dom.Element} triggerWrap
         * A reference to the element which encapsulates the input field and all
         * trigger button(s). Only set after the field has been rendered.
         */
        'triggerWrap',

        /**
         * @property {Ext.dom.Element} inputWrap
         * A reference to the element that wraps the input element. Only set after the
         * field has been rendered.
         */
        'inputWrap'
    ],

    preSubTpl: [
        '<div id="{cmpId}-triggerWrap" data-ref="triggerWrap" class="{triggerWrapCls} {triggerWrapCls}-{ui}">',
            '<div id={cmpId}-inputWrap data-ref="inputWrap" class="{inputWrapCls} {inputWrapCls}-{ui}">'
    ],

    postSubTpl: [
            '</div>', // end inputWrap
            '<tpl for="triggers">{[values.renderTrigger(parent)]}</tpl>',
        '</div>' // end triggerWrap
    ],

    /**
     * @event autosize
     * Fires when the **{@link #autoSize}** function is triggered and the field is resized according to the
     * {@link #grow}/{@link #growMin}/{@link #growMax} configs as a result. This event provides a hook for the
     * developer to apply additional logic at runtime to resize the field if needed.
     * @param {Ext.form.field.Text} this This text field
     * @param {Number} width The new field width
     */

    /**
     * @event keydown
     * Keydown input field event. This event only fires if **{@link #enableKeyEvents}** is set to true.
     * @param {Ext.form.field.Text} this This text field
     * @param {Ext.event.Event} e
     */

    /**
     * @event keyup
     * Keyup input field event. This event only fires if **{@link #enableKeyEvents}** is set to true.
     * @param {Ext.form.field.Text} this This text field
     * @param {Ext.event.Event} e
     */

    /**
     * @event keypress
     * Keypress input field event. This event only fires if **{@link #enableKeyEvents}** is set to true.
     * @param {Ext.form.field.Text} this This text field
     * @param {Ext.event.Event} e
     */

    initComponent: function () {
        var me = this,
            emptyCls = me.emptyCls;

        if (me.allowOnlyWhitespace === false) {
            me.allowBlank = false;
        }

        //<debug>
        if (me.size) {
            Ext.log.warn('Ext.form.field.Text "size" config was deprecated in Ext 5.0. Please specify a "width" or use a layout instead.');
        }
        //</debug>
        // In Ext JS 4.x the layout system used the following magic formula for converting
        // the "size" config into a pixel value.
        if (me.size) {
            me.defaultBodyWidth = me.size * 6.5 + 20;
        }

        if (!me.onTrigger1Click) {
            // for compat with 4.x TriggerField
            me.onTrigger1Click = me.onTriggerClick;
        }

        me.callParent();

        me.setReadOnly(me.readOnly);
        me.fieldFocusCls = me.baseCls + '-focus';
        me.emptyUICls = emptyCls + ' ' + emptyCls + '-' + me.ui;
        me.addStateEvents('change');
        me.setGrowSizePolicy();
    },


    // private
    setGrowSizePolicy: function(){
        if (this.grow) {
            this.shrinkWrap |= 1; // width must shrinkWrap
        }
    },

    // private
    initEvents: function(){
        var me = this,
            el = me.inputEl;

        // a global before focus listener to detect when another component takes focus
        // away from this field because el.focus() was explicitly called.  We have to
        // attach this listener up front (vs. in onFocus) just in case focus is called
        // multiple times in the same thread.  In such a case IE processes the events
        // asynchronously.  for example:
        //     someTrigger.focus();
        //     someOther.focus(); // onOtherFocus would not be called here if we wait until
        //                           onFocus of someTrigger to attach the listener
        // See EXTJSIV-11712
        this.mon(Ext.GlobalEvents, 'beforefocus', this.onOtherFocus, this);

        me.callParent();
        if(me.selectOnFocus || me.emptyText){
            me.mon(el, 'mousedown', me.onMouseDown, me);
        }
        if(me.maskRe || (me.vtype && me.disableKeyFilter !== true && (me.maskRe = Ext.form.field.VTypes[me.vtype+'Mask']))){
            me.mon(el, 'keypress', me.filterKeys, me);
        }

        if (me.enableKeyEvents) {
            me.mon(el, {
                scope: me,
                keyup: me.onKeyUp,
                keydown: me.onKeyDown,
                keypress: me.onKeyPress
            });
        }
    },

    /**
     * @private
     * Override. Treat undefined and null values as equal to an empty string value.
     */
    isEqual: function(value1, value2) {
        return this.isEqualAsString(value1, value2);
    },

    /**
     * @private
     * If grow=true, invoke the autoSize method when the field's value is changed.
     */
    onChange: function(newVal, oldVal) {
        this.callParent(arguments);
        this.autoSize();
    },

    getSubTplData: function() {
        var me = this,
            value = me.getRawValue(),
            isEmpty = me.emptyText && value.length < 1,
            maxLength = me.maxLength,
            placeholder;

        // We can't just dump the value here, since MAX_VALUE ends up
        // being something like 1.xxxxe+300, which gets interpreted as 1
        // in the markup
        if (me.enforceMaxLength) {
            if (maxLength === Number.MAX_VALUE) {
                maxLength = undefined;
            }
        } else {
            maxLength = undefined;
        }

        if (isEmpty) {
            if (Ext.supports.Placeholder) {
                placeholder = me.emptyText;
            } else {
                value = me.emptyText;
                me.valueContainsPlaceholder = true;
            }
        }

        return Ext.apply(me.callParent(), {
            triggerWrapCls: me.triggerWrapCls,
            inputWrapCls: me.inputWrapCls,
            triggers: me.orderedTriggers,
            maxLength: maxLength,
            readOnly: !me.editable || me.readOnly,
            placeholder: placeholder,
            value: value,
            fieldCls: me.fieldCls + ((isEmpty && (placeholder || value)) ? ' ' + me.emptyUICls : '') + (me.allowBlank ? '' :  ' ' + me.requiredCls)
        });
    },

    onRender: function() {
        var me = this,
            triggers = me.getTriggers(),
            elements = [],
            id, triggerEl;

        if (Ext.supports.FixedTableWidthBug) {
            // Workaround for https://bugs.webkit.org/show_bug.cgi?id=130239 and
            // https://code.google.com/p/chromium/issues/detail?id=377190
            // See styleHooks for more details
            me.el._needsTableWidthFix = true;
        }

        me.callParent();

        if (triggers) {
            this.invokeTriggers('onFieldRender');

            /**
             * @property {Ext.CompositeElement} triggerEl
             * @deprecated 5.0
             * A composite of all the trigger button elements. Only set after the field has
             * been rendered.
             */
            for(id in triggers) {
                elements.push(triggers[id].el);
            }
            // for 4.x compat, also set triggerCell
            triggerEl = me.triggerEl = me.triggerCell = new Ext.CompositeElement(elements, true);
        }

        /**
         * @property {Ext.dom.Element} inputCell
         * A reference to the element that wraps the input element. Only set after the
         * field has been rendered.
         * @deprecated 5.0 use {@link #inputWrap} instead
         */
        me.inputCell = me.inputWrap;
    },

    afterRender: function(){
        var me = this;

        me.autoSize();
        me.callParent();
        this.invokeTriggers('afterFieldRender');
    },

    onMouseDown: function(){
        var me = this;
        if(!me.hasFocus){
            me.mon(me.inputEl, 'mouseup', Ext.emptyFn, me, { single: true, preventDefault: true });
        }
    },

    applyTriggers: function(triggers) {
        var me = this,
            hideAllTriggers = me.getHideTrigger(),
            readOnly = me.readOnly,
            orderedTriggers = me.orderedTriggers = [],
            repeatTriggerClick = me.repeatTriggerClick,
            id, triggerCfg, trigger, triggerCls, i;

        //<debug>
        if (me.rendered) {
            Ext.Error.raise("Cannot set triggers after field has already been rendered.");
        }

        // don't warn if we have both triggerCls and triggers, because picker field
        // uses triggerCls to style the "picker" trigger.
        if ((me.triggerCls && !triggers) || me.trigger1Cls) {
            Ext.log.warn("Ext.form.field.Text: 'triggerCls' and 'trigger<n>Cls'" +
                " are deprecated.  Use 'triggers' instead.");
        }
        //</debug>

        if (!triggers) {
            // For compatibility with 4.x, transform the trigger<n>Cls configs into the
            // new "triggers" config.
            triggers = {};

            if (me.triggerCls && !me.trigger1Cls) {
                me.trigger1Cls = me.triggerCls;
            }

            for (i = 1; triggerCls = me['trigger' + i + 'Cls']; i++) {
                triggers['trigger' + i] = {
                    cls: triggerCls,
                    extraCls: Ext.baseCSSPrefix + 'trigger-index-' + i,
                    handler: 'onTrigger' + i + 'Click',
                    compat4Mode: true,
                    scope: me
                };
            }
        }

        for(id in triggers) {
            if (triggers.hasOwnProperty(id)) {
                triggerCfg = triggers[id];
                triggerCfg.field = me;
                triggerCfg.id = id;

                /*
                 * An explicitly-configured 'triggerConfig.hideOnReadOnly : false' allows {@link #hideTrigger} analysis
                 */
                if ((readOnly && triggerCfg.hideOnReadOnly !== false) || (hideAllTriggers && triggerCfg.hidden !== false)) {
                    triggerCfg.hidden = true;
                }
                if (repeatTriggerClick && (triggerCfg.repeatClick !== false)) {
                    triggerCfg.repeatClick = true;
                }

                trigger = triggers[id] = Ext.form.trigger.Trigger.create(triggerCfg);
                orderedTriggers.push(trigger);
            }
        }

        Ext.Array.sort(orderedTriggers, Ext.form.trigger.Trigger.weightComparator);

        return triggers;
    },

    /**
     * Invokes a method on all triggers.
     * @param {String} methodName
     * @private
     */
    invokeTriggers: function(methodName, args) {
        var me = this,
            triggers = me.getTriggers(),
            id, trigger;

        if (triggers) {
            for (id in triggers) {
                if (triggers.hasOwnProperty(id)) {
                    trigger = triggers[id];
                    // IE8 needs "|| []" if args is undefined
                    trigger[methodName].apply(trigger, args || []);
                }
            }
        }
    },

    /**
     * Returns the trigger with the given id
     * @param {String} id
     * @return {Ext.form.trigger.Trigger}
     */
    getTrigger: function(id) {
        return this.getTriggers()[id];
    },

    updateHideTrigger: function(hideTrigger) {
        if (this.rendered) {
            this.invokeTriggers(hideTrigger ? 'hide' : 'show');
        }
    },

    /**
     * Sets the editable state of this field.
     * @param {Boolean} editable True to allow the user to directly edit the field text.
     * If false is passed, the user will only be able to modify the field using the trigger.
     */
    setEditable: function(editable) {
        var me = this;

        me.editable = editable;
        if (me.rendered) {
            me.setReadOnlyAttr(!editable || me.readOnly);
        }
    },

    /**
     * Sets the read-only state of this field.
     * @param {Boolean} readOnly True to prevent the user changing the field and explicitly
     * hide the trigger(s). Setting this to true will supersede settings editable and
     * hideTrigger. Setting this to false will defer back to {@link #editable editable} and {@link #hideTrigger hideTrigger}.
     */
    setReadOnly: function(readOnly) {
        var me = this,
            triggers = me.getTriggers(),
            hideTriggers = me.getHideTrigger(),
            trigger,
            id;

        readOnly = !!readOnly;

        me.callParent([readOnly]);
        if (me.rendered) {
            me.setReadOnlyAttr(readOnly || !me.editable);

            if (triggers) {
                for (id in triggers) {
                    trigger = triggers[id];
                    /*
                     * Controlled trigger visibility state is only managed fully when 'hideOnReadOnly' is falsy.
                     * Truth table:
                     *   - If the trigger is configured/defaulted as 'hideOnReadOnly : true', it's readOnly-visibility
                     *     is determined solely by readOnly state of the Field.
                     *   - If 'hideOnReadOnly : false/undefined', the Fields.{link #hideTrigger hideTrigger} is honored.
                     */
                    if (trigger.hideOnReadOnly === true || (trigger.hideOnReadOnly !== false && !hideTriggers)) {
                        trigger[readOnly ? 'hide' : 'show'].call(trigger);
                    }
                }
            }
        }
    },

    // private. sets the readonly attribute of the input element
    setReadOnlyAttr: function(readOnly) {
        var me = this,
            readOnlyName = 'readonly',
            inputEl = me.inputEl.dom;

        if (readOnly) {
            inputEl.setAttribute(readOnlyName, readOnlyName);
        } else {
            inputEl.removeAttribute(readOnlyName);
        }
    },

    /**
     * Performs any necessary manipulation of a raw String value to prepare it for conversion and/or
     * {@link #validate validation}. For text fields this applies the configured {@link #stripCharsRe}
     * to the raw value.
     * @param {String} value The unprocessed string value
     * @return {String} The processed string value
     */
    processRawValue: function(value) {
        var me = this,
            stripRe = me.stripCharsRe,
            newValue;

        if (stripRe) {
            newValue = value.replace(stripRe, '');
            if (newValue !== value) {
                me.setRawValue(newValue);
                value = newValue;
            }
        }
        return value;
    },

    //private
    onDisable: function(){
        this.callParent();
        if (Ext.isIE) {
            this.inputEl.dom.unselectable = 'on';
        }
    },

    //private
    onEnable: function(){
        this.callParent();
        if (Ext.isIE) {
            this.inputEl.dom.unselectable = '';
        }
    },

    onKeyDown: function(e) {
        this.fireEvent('keydown', this, e);
    },

    onKeyUp: function(e) {
        this.fireEvent('keyup', this, e);
    },

    onKeyPress: function(e) {
        this.fireEvent('keypress', this, e);
    },

    /**
     * Resets the current field value to the originally-loaded value and clears any validation messages.
     * Also adds **{@link #emptyText}** and **{@link #emptyCls}** if the original value was blank.
     */
    reset : function(){
        this.callParent();
        this.applyEmptyText();
    },

    applyEmptyText : function(){
        var me = this,
            emptyText = me.emptyText,
            isEmpty;

        if (me.rendered && emptyText) {
            isEmpty = me.getRawValue().length < 1 && !me.hasFocus;

            if (Ext.supports.Placeholder) {
                me.inputEl.dom.placeholder = emptyText;
            } else if (isEmpty) {
                me.setRawValue(emptyText);
                me.valueContainsPlaceholder = true;
            }

            //all browsers need this because of a styling issue with chrome + placeholders.
            //the text isnt vertically aligned when empty (and using the placeholder)
            if (isEmpty) {
                me.inputEl.addCls(me.emptyUICls);
            }

            me.autoSize();
        }
    },

    afterFirstLayout: function() {
        this.callParent();
        if (Ext.isIE && this.disabled) {
            var el = this.inputEl;
            if (el) {
                el.dom.unselectable = 'on';
            }
        }
    },

    //private
    toggleInvalidCls: function(hasError) {
        var method = hasError ? 'addCls' : 'removeCls';

        this.callParent();

        this.triggerWrap[method](this.triggerWrapInvalidCls);
        this.inputWrap[method](this.inputWrapInvalidCls);
    },

    // private
    beforeFocus : function(){
        var me = this,
            inputEl = me.inputEl,
            emptyText = me.emptyText,
            isEmpty;

        me.callParent(arguments);
        if ((emptyText && !Ext.supports.Placeholder) && (inputEl.dom.value === me.emptyText && me.valueContainsPlaceholder)) {
            me.setRawValue('');
            isEmpty = true;
            inputEl.removeCls(me.emptyUICls);
            me.valueContainsPlaceholder = false;
        } else if (Ext.supports.Placeholder) {
            inputEl.removeCls(me.emptyUICls);
        }

        if (me.selectOnFocus || isEmpty) {
            // see: http://code.google.com/p/chromium/issues/detail?id=4505
            if (Ext.isWebKit) {
                if (!me.inputFocusTask) {
                    me.inputFocusTask = new Ext.util.DelayedTask(me.focusInput, me);
                }
                me.inputFocusTask.delay(1);
            } else {
                me.focusInput();
            }
        }
    },

    focusInput: function(){
        var input = this.inputEl;
        if (input) {
            input = input.dom;
            if (input) {
                input.select();
            }
        }
    },

    onFocus: function(e) {
        var me = this;

        // When this is focused, this flag must be cleared
        me.otherFocused = false;

        me.callParent(arguments);

        if (me.emptyText) {
            me.autoSize();
        }

        if (!me.mimicing) {
            me.addCls(me.fieldFocusCls);
            me.triggerWrap.addCls(me.triggerWrapFocusCls);
            me.inputWrap.addCls(me.inputWrapFocusCls);
            me.invokeTriggers('onFieldFocus', [e]);
            me.mimicing = true;
            me.mon(Ext.getDoc(), 'mousedown', me.mimicBlur, me, {
                delay: 10
            });
            if (me.monitorTab) {
                me.on('specialkey', me.checkTab, me);
            }
        }
    },

    /**
     * @private
     * The default blur handling must not occur for a TriggerField, implementing this template method disables that.
     * Instead the tab key is monitored, and the superclass's onBlur is called when tab is detected
     */
    onBlur: function() {
        // Only trigger a blur if blur() or focus() called programmatically
        if (this.blurring || this.otherFocused) {
            this.triggerBlur();
            this.otherFocused = false;
        }
    },

    // ensures we trigger a blur if some other component/element is programmatically
    // focused (see EXTJSIV-11712)
    onOtherFocus: function(dom) {
        this.otherFocused = (this.hasFocus && !this.bodyEl.contains(dom));
    },

    // @private
    checkTab: function(me, e) {
        if (!this.ignoreMonitorTab && e.getKey() === e.TAB) {
            this.triggerBlur();
        }
    },

    // @private
    mimicBlur: function(e) {
        if (!this.isDestroyed && !this.bodyEl.contains(e.target)) {
            this.triggerBlur(e);
        }
    },

    // @private
    triggerBlur: function(e) {
        var me = this;

        me.mimicing = false;
        me.mun(Ext.getDoc(), 'mousedown', me.mimicBlur, me);
        if (me.monitorTab && me.inputEl) {
            me.un('specialkey', me.checkTab, me);
        }
        Ext.form.field.Text.superclass.onBlur.call(me, e);
        me.removeCls(me.fieldFocusCls);
        me.triggerWrap.removeCls(me.triggerWrapFocusCls);
        me.inputWrap.removeCls(me.inputWrapFocusCls);
        me.invokeTriggers('onFieldBlur', [e]);
    },

    // private
    postBlur: function(){
        var task = this.inputFocusTask;

        this.callParent(arguments);
        this.applyEmptyText();
        // Once we blur, cancel any pending select events from focus
        // We need this because of the WebKit bug detailed in beforeFocus
        if (task) {
            task.cancel();
        }

    },

    // private
    filterKeys : function(e){
        /*
         * On European keyboards, the right alt key, Alt Gr, is used to type certain special characters.
         * JS detects a keypress of this as ctrlKey & altKey. As such, we check that alt isn't pressed
         * so we can still process these special characters.
         */
        if (e.ctrlKey && !e.altKey) {
            return;
        }
        var key = e.getKey(),
            charCode = String.fromCharCode(e.getCharCode());

        if((Ext.isGecko || Ext.isOpera) && (e.isNavKeyPress() || key === e.BACKSPACE || (key === e.DELETE && e.button === -1))){
            return;
        }

        if((!Ext.isGecko && !Ext.isOpera) && e.isSpecialKey() && !charCode){
            return;
        }
        if(!this.maskRe.test(charCode)){
            e.stopEvent();
        }
    },

    getState: function() {
        return this.addPropertyToState(this.callParent(), 'value');
    },

    applyState: function(state) {
        this.callParent(arguments);
        if(state.hasOwnProperty('value')) {
            this.setValue(state.value);
        }
    },

    /**
     * Returns the raw String value of the field, without performing any normalization, conversion, or validation. Gets
     * the current value of the input element if the field has been rendered, ignoring the value if it is the
     * {@link #emptyText}. To get a normalized and converted value see {@link #getValue}.
     * @return {String} The raw String value of the field
     */
    getRawValue: function() {
        var me = this,
            v = me.callParent();
        if (v === me.emptyText && me.valueContainsPlaceholder) {
            v = '';
        }
        return v;
    },

    /**
     * Sets a data value into the field and runs the change detection and validation. Also applies any configured
     * {@link #emptyText} for text fields. To set the value directly without these inspections see {@link #setRawValue}.
     * @param {Object} value The value to set
     * @return {Ext.form.field.Text} this
     */
    setValue: function(value) {
        var me = this,
            inputEl = me.inputEl;

        if (inputEl && me.emptyText && !Ext.isEmpty(value)) {
            inputEl.removeCls(me.emptyUICls);
            me.valueContainsPlaceholder = false;
        }

        me.callParent(arguments);

        me.applyEmptyText();
        return me;
    },

    /**
     * Validates a value according to the field's validation rules and returns an array of errors
     * for any failing validations. Validation rules are processed in the following order:
     *
     * 1. **Field specific validator**
     *
     *     A validator offers a way to customize and reuse a validation specification.
     *     If a field is configured with a `{@link #validator}`
     *     function, it will be passed the current field value.  The `{@link #validator}`
     *     function is expected to return either:
     *
     *     - Boolean `true`  if the value is valid (validation continues).
     *     - a String to represent the invalid message if invalid (validation halts).
     *
     * 2. **Basic Validation**
     *
     *     If the `{@link #validator}` has not halted validation,
     *     basic validation proceeds as follows:
     *
     *     - `{@link #allowBlank}` : (Invalid message = `{@link #blankText}`)
     *
     *         Depending on the configuration of `{@link #allowBlank}`, a
     *         blank field will cause validation to halt at this step and return
     *         Boolean true or false accordingly.
     *
     *     - `{@link #minLength}` : (Invalid message = `{@link #minLengthText}`)
     *
     *         If the passed value does not satisfy the `{@link #minLength}`
     *         specified, validation halts.
     *
     *     -  `{@link #maxLength}` : (Invalid message = `{@link #maxLengthText}`)
     *
     *         If the passed value does not satisfy the `{@link #maxLength}`
     *         specified, validation halts.
     *
     * 3. **Preconfigured Validation Types (VTypes)**
     *
     *     If none of the prior validation steps halts validation, a field
     *     configured with a `{@link #vtype}` will utilize the
     *     corresponding {@link Ext.form.field.VTypes VTypes} validation function.
     *     If invalid, either the field's `{@link #vtypeText}` or
     *     the VTypes vtype Text property will be used for the invalid message.
     *     Keystrokes on the field will be filtered according to the VTypes
     *     vtype Mask property.
     *
     * 4. **Field specific regex test**
     *
     *     If none of the prior validation steps halts validation, a field's
     *     configured `{@link #regex}` test will be processed.
     *     The invalid message for this test is configured with `{@link #regexText}`
     *
     * @param {Object} value The value to validate. The processed raw value will be used if nothing is passed.
     * @return {String[]} Array of any validation errors
     */
    getErrors: function(value) {
        var me = this,
            errors = me.callParent(arguments),
            validator = me.validator,
            vtype = me.vtype,
            vtypes = Ext.form.field.VTypes,
            regex = me.regex,
            format = Ext.String.format,
            msg, trimmed, isBlank;

        value = value || me.processRawValue(me.getRawValue());

        if (Ext.isFunction(validator)) {
            msg = validator.call(me, value);
            if (msg !== true) {
                errors.push(msg);
            }
        }

        trimmed = me.allowOnlyWhitespace ? value : Ext.String.trim(value);

        if (trimmed.length < 1 || (value === me.emptyText && me.valueContainsPlaceholder)) {
            if (!me.allowBlank) {
                errors.push(me.blankText);
            }
            // If we are not configured to validate blank values, there cannot be any additional errors
            if (!me.validateBlank) {
                return errors;
            }
            isBlank = true;
        }

        // If a blank value has been allowed through, then exempt it from the minLength check.
        // It must be allowed to hit the vtype validation.
        if (!isBlank && value.length < me.minLength) {
            errors.push(format(me.minLengthText, me.minLength));
        }

        if (value.length > me.maxLength) {
            errors.push(format(me.maxLengthText, me.maxLength));
        }

        if (vtype) {
            if (!vtypes[vtype](value, me)) {
                errors.push(me.vtypeText || vtypes[vtype +'Text']);
            }
        }

        if (regex && !regex.test(value)) {
            errors.push(me.regexText || me.invalidText);
        }

        return errors;
    },

    /**
     * Selects text in this field
     * @param {Number} [start=0] The index where the selection should start
     * @param {Number} [end] The index where the selection should end (defaults to the text length)
     */
    selectText : function(start, end){
        var me = this,
            v = me.getRawValue(),
            doFocus = true,
            el = me.inputEl.dom,
            undef,
            range;

        if (v.length > 0) {
            start = start === undef ? 0 : start;
            end = end === undef ? v.length : end;
            if (el.setSelectionRange) {
                el.setSelectionRange(start, end);
            }
            else if(el.createTextRange) {
                range = el.createTextRange();
                range.moveStart('character', start);
                range.moveEnd('character', end - v.length);
                range.select();
            }
            doFocus = Ext.isGecko || Ext.isOpera;
        }
        if (doFocus) {
            me.focus();
        }
    },

    /**
     * Automatically grows the field to accommodate the width of the text up to the maximum
     * field width allowed. This only takes effect if {@link #grow} = true, and fires the
     * {@link #autosize} event if the width changes.
     */
    autoSize: function() {
        var me = this,
            triggers, triggerId, trigger, triggerWidth, inputEl, inputWidth, width, value;

        if (me.grow && me.rendered) {
            inputEl = me.inputEl;
            triggers = me.getTriggers();
            triggerWidth = 0;

            value = Ext.util.Format.htmlEncode(
                inputEl.dom.value || (me.hasFocus ? '' : me.emptyText) || ''
            );
            value += me.growAppend;

            for (triggerId in triggers) {
                triggerWidth += triggers[triggerId].el.getWidth();
            }

            width = inputEl.getTextWidth(value) +  triggerWidth +
                // The element that has the border depends on theme - inputWrap (classic)
                // or triggerWrap (neptune)
                me.inputWrap.getBorderWidth('lr') + me.triggerWrap.getBorderWidth('lr');

            width = Math.min(Math.max(width, me.growMin), me.growMax);

            me.bodyEl.setWidth(width);

            me.updateLayout();

            me.fireEvent('autosize', me, width);
        }
    },

    onDestroy: function(){
        var me = this;

        me.invokeTriggers('destroy');
        Ext.destroy(me.triggerRepeater);

        me.callParent();

        if (me.inputFocusTask) {
            me.inputFocusTask.cancel();
            me.inputFocusTask = null;
        }
    },

    onTriggerClick: Ext.emptyFn,

    privates: {
        /**
         * @private
         * @override
         */
        getTdType: function () {
            return 'textfield';
        }
    },

    deprecated: {
        5: {
            methods: {
                /**
                 * Get the total width of the trigger button area.
                 * @return {Number} The total trigger width
                 * @deprecated 5.0
                 */
                getTriggerWidth: function() {
                    var triggers = this.getTriggers(),
                        width = 0,
                        id;
                    if (triggers && this.rendered) {
                        for (id in triggers) {
                            if (triggers.hasOwnProperty(id)) {
                                width += triggers[id].el.getWidth();
                            }
                        }
                    }

                    return width;
                }
            }
        }
    }

});
