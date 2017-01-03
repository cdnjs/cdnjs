/**
 * An abstract class for fields that have a single trigger which opens a "picker" popup below the field, e.g. a combobox
 * menu list or a date picker. It provides a base implementation for toggling the picker's visibility when the trigger
 * is clicked, as well as keyboard navigation and some basic events. Sizing and alignment of the picker can be
 * controlled via the {@link #matchFieldWidth} and {@link #pickerAlign}/{@link #pickerOffset} config properties
 * respectively.
 *
 * You would not normally use this class directly, but instead use it as the parent class for a specific picker field
 * implementation. Subclasses must implement the {@link #createPicker} method to create a picker component appropriate
 * for the field.
 */
Ext.define('Ext.form.field.Picker', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.pickerfield',
    alternateClassName: 'Ext.form.Picker',
    requires: ['Ext.util.KeyNav'],

    config: {
        triggers: {
            picker: {
                handler: 'onTriggerClick',
                scope: 'this'
            }
        }
    },

    /**
     * @cfg {Boolean} matchFieldWidth
     * Whether the picker dropdown's width should be explicitly set to match the width of the field. Defaults to true.
     */
    matchFieldWidth: true,

    /**
     * @cfg {String} pickerAlign
     * The {@link Ext.util.Positionable#alignTo alignment position} with which to align the picker. Defaults to "tl-bl?"
     */
    pickerAlign: 'tl-bl?',

    /**
     * @cfg {Number[]} pickerOffset
     * An offset [x,y] to use in addition to the {@link #pickerAlign} when positioning the picker.
     * Defaults to undefined.
     */

    /**
     * @cfg {String} [openCls='x-pickerfield-open']
     * A class to be added to the field's {@link #bodyEl} element when the picker is opened.
     */
    openCls: Ext.baseCSSPrefix + 'pickerfield-open',

    /**
     * @property {Boolean} isExpanded
     * True if the picker is currently expanded, false if not.
     */

    /**
     * @cfg {Boolean} editable
     * False to prevent the user from typing text directly into the field; the field can only have its value set via
     * selecting a value from the picker. In this state, the picker can also be opened by clicking directly on the input
     * field itself.
     */
    editable: true,

    /**
     * @cfg {String} triggerCls
     * An additional CSS class used to style the trigger button. The trigger will always
     * get the class 'x-form-trigger' and triggerCls will be appended if specified.
     */

    /**
     * @event expand
     * Fires when the field's picker is expanded.
     * @param {Ext.form.field.Picker} field This field instance
     */

    /**
     * @event collapse
     * Fires when the field's picker is collapsed.
     * @param {Ext.form.field.Picker} field This field instance
     */

    /**
     * @event select
     * Fires when a value is selected via the picker.
     * @param {Ext.form.field.Picker} field This field instance
     * @param {Object} value The value that was selected. The exact type of this value is dependent on
     * the individual field and picker implementations.
     */

    applyTriggers: function(triggers) {
        var me = this,
            picker = triggers.picker;

        if (!picker.cls) {
            picker.cls = me.triggerCls;
        }

        return me.callParent([triggers]);
    },

    initEvents: function() {
        var me = this;
        me.callParent();

        // Add handlers for keys to expand/collapse the picker
        me.keyNav = new Ext.util.KeyNav(me.inputEl, {
            down: me.onDownArrow,
            esc: {
                handler: me.onEsc,
                scope: me,
                defaultEventAction: false
            },
            scope: me,
            forceKeyDown: true
        });

        // Non-editable allows opening the picker by clicking the field
        if (!me.editable) {
            me.mon(me.inputEl, 'click', me.onTriggerClick, me);
        }

        // Disable native browser autocomplete
        if (Ext.isGecko) {
            me.inputEl.dom.setAttribute('autocomplete', 'off');
        }
    },

    // private
    onEsc: function(e) {
        if (Ext.isIE) {
            // Stop the esc key from "restoring" the previous value in IE
            // For example, type "foo". Highlight all the text, hit backspace.
            // Hit esc, "foo" will be restored. This behaviour doesn't occur
            // in any other browsers
            e.preventDefault();
        }

        if (this.isExpanded) {
            this.collapse();
            e.stopEvent();
        }
    },

    onDownArrow: function() {
        if (!this.isExpanded) {
            // Don't call expand() directly as there may be additional processing involved before
            // expanding, e.g. in the case of a ComboBox query.
            this.onTriggerClick();
        }
    },

    /**
     * Expands this field's picker dropdown.
     */
    expand: function() {
        var me = this,
            bodyEl, picker, collapseIf;

        if (me.rendered && !me.isExpanded && !me.isDestroyed) {
            me.expanding = true;
            bodyEl = me.bodyEl;
            picker = me.getPicker();
            collapseIf = me.collapseIf;

            // show the picker and set isExpanded flag
            picker.show();
            me.isExpanded = true;
            me.alignPicker();
            bodyEl.addCls(me.openCls);

            // monitor clicking and mousewheel
            me.mon(Ext.getDoc(), {
                mousewheel: collapseIf,
                mousedown: collapseIf,
                scope: me
            });
            Ext.on('resize', me.alignPicker, me);
            me.fireEvent('expand', me);
            me.onExpand();
            delete me.expanding;
        }
    },

    onExpand: Ext.emptyFn,

    /**
     * Aligns the picker to the input element
     * @protected
     */
    alignPicker: function() {
        var me = this,
            bodyElWidth,
            picker = me.getPicker();

        if (me.isExpanded) {
            if (me.matchFieldWidth) {
                bodyElWidth = me.bodyEl.getWidth();
                // Auto the height (it will be constrained by min and max width) unless there are no records to display.
                picker.setWidth(bodyElWidth);
            }
            if (picker.isFloating()) {
                me.doAlign();
            }
        }
    },

    /**
     * Performs the alignment on the picker using the class defaults
     * @private
     */
    doAlign: function(){
        var me = this,
            picker = me.picker,
            aboveSfx = '-above',
            isAbove;

        // Align to the trigger wrap because the border isn't always on the input element, which
        // can cause the offset to be off
        me.picker.alignTo(me.triggerWrap, me.pickerAlign, me.pickerOffset);
        // add the {openCls}-above class if the picker was aligned above
        // the field due to hitting the bottom of the viewport
        isAbove = picker.el.getY() < me.inputEl.getY();
        me.bodyEl[isAbove ? 'addCls' : 'removeCls'](me.openCls + aboveSfx);
        picker[isAbove ? 'addCls' : 'removeCls'](picker.baseCls + aboveSfx);
    },

    /**
     * Collapses this field's picker dropdown.
     */
    collapse: function() {
        var me = this;
        
        if (me.isExpanded && !me.isDestroyed && !me.destroying) {
            var openCls = me.openCls,
                picker = me.picker,
                doc = Ext.getDoc(),
                collapseIf = me.collapseIf,
                aboveSfx = '-above';

            // hide the picker and set isExpanded flag
            picker.hide();
            me.isExpanded = false;

            // remove the openCls
            me.bodyEl.removeCls([openCls, openCls + aboveSfx]);
            picker.el.removeCls(picker.baseCls + aboveSfx);

            // remove event listeners
            doc.un('mousewheel', collapseIf, me);
            doc.un('mousedown', collapseIf, me);
            Ext.un('resize', me.alignPicker, me);
            me.fireEvent('collapse', me);
            me.onCollapse();
        }
    },

    onCollapse: Ext.emptyFn,


    /**
     * @private
     * Runs on mousewheel and mousedown of doc to check to see if we should collapse the picker
     */
    collapseIf: function(e) {
        var me = this;

        if (!me.isDestroyed && !e.within(me.bodyEl, false, true) && !me.owns(e.target)) {
            me.collapse();
        }
    },

    /**
     * Returns a reference to the picker component for this field, creating it if necessary by
     * calling {@link #createPicker}.
     * @return {Ext.Component} The picker component
     */
    getPicker: function() {
        var me = this;
        return me.picker || (me.picker = me.createPicker());
    },

    // @private
    // The CQ interface. Allow drilling down into the picker when it exists.
    // Important for determining whether an event took place in the bounds of some
    // higher level containing component. See AbstractComponent#owns
    getRefItems: function() {
        var result = [];
        if (this.picker) {
            result[0] = this.picker;
        }
        return result;
    },

    /**
     * @method
     * Creates and returns the component to be used as this field's picker. Must be implemented by subclasses of Picker.
     * The current field should also be passed as a configuration option to the picker component as the pickerField
     * property.
     */
    createPicker: Ext.emptyFn,

    /**
     * Handles the trigger click; by default toggles between expanding and collapsing the picker component.
     * @protected
     */
    onTriggerClick: function() {
        var me = this;
        if (!me.readOnly && !me.disabled) {
            if (me.isExpanded) {
                me.collapse();
            } else {
                me.expand();
            }
            // Always focus input on collapse.
            // On expand, only focus if the trigger event is NOT a touch event
            if (!Ext.supports.TouchEvents) {
                me.inputEl.focus();
            }
        }
    },

    onOtherFocus: function(dom) {
        if (this.hasFocus && !this.owns(dom)) {
            this.callParent([dom]);
        }
    },

    triggerBlur: function() {
        this.callParent(arguments);

        // Hide picker (if visible), and remove all attendant listeners
        this.collapse();
    },

    mimicBlur: function(e) {
        var me = this,
            picker = me.picker;

        // Continue blur processing for events which are NOT within this component's descedant tree
        if (!picker || !me.owns(e.target)) {
            me.callParent(arguments);
        } else {
            me.inputEl.focus();
        }
    },

    beforeDestroy : function(){
        var me = this,
            picker = me.picker;

        me.collapse();
        me.callParent();
        Ext.un('resize', me.alignPicker, me);
        Ext.destroy(me.keyNav, picker);
        if (picker) {
            delete me.picker;
            delete picker.pickerField;
        }
    }
});
