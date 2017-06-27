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
 * Layout class for {@link Ext.form.field.Trigger} fields. Adjusts the input field size to accommodate
 * the trigger button(s).
 * @private
 */
Ext.define('Ext.layout.component.field.Trigger', {

    /* Begin Definitions */

    alias: 'layout.triggerfield',

    extend: 'Ext.layout.component.field.Field',

    /* End Definitions */

    type: 'triggerfield',

    // Private. Cached extra width values containing width of all a trigger field's "furniture" round the actual input element
    borderWidths: {},

    beginLayout: function(ownerContext) {
        var me = this,
            owner = me.owner,
            flags;

        ownerContext.triggerWrap = ownerContext.getEl('triggerWrap');

        me.callParent(arguments);

        // if any of these important states have changed, sync them now:
        flags = owner.getTriggerStateFlags();
        if (flags != owner.lastTriggerStateFlags) {
            owner.lastTriggerStateFlags = flags;
            me.updateEditState();
        }
    },
    
    beginLayoutCycle: function(ownerContext){
        this.callParent(arguments);
        
        // Clear width, in case a previous layout cycle set an explicit width.
        if (ownerContext.widthModel.shrinkWrap && !this.owner.inputWidth) {
            ownerContext.inputContext.el.setStyle('width', '');
        }    
    },

    beginLayoutFixed: function (ownerContext, width, suffix) {
        var me = this,
            owner = ownerContext.target,
            ieInputWidthAdjustment = me.ieInputWidthAdjustment || 0,
            inputWidth = '100%',
            triggerWrap = owner.triggerWrap;

        me.callParent(arguments);

        owner.inputCell.setStyle('width', '100%');
        if(ieInputWidthAdjustment) {
            me.adjustIEInputPadding(ownerContext);
            if(suffix === 'px') {
                if (owner.inputWidth) {
                    inputWidth = owner.inputWidth - me.getExtraWidth(ownerContext);
                } else {
                    inputWidth = width - ieInputWidthAdjustment - me.getExtraWidth(ownerContext);
                }
                inputWidth += 'px';
            }
        }
        owner.inputEl.setStyle('width', inputWidth);
        inputWidth = owner.inputWidth;
        if (inputWidth) {
            triggerWrap.setStyle('width', inputWidth + (ieInputWidthAdjustment) + 'px');
        } else {
            triggerWrap.setStyle('width', width + suffix);
        }
        triggerWrap.setStyle('table-layout', 'fixed');
    },

    adjustIEInputPadding: function(ownerContext) {
        // adjust for IE 6/7 strict content-box model
        this.owner.inputCell.setStyle('padding-right', this.ieInputWidthAdjustment + 'px');
    },

    /**
     * @private
     * Returns the width of the "extras" around the input field. This includes the total width
     * of all the triggers in the field and any outer bordering.
     * 
     * This measurement is used when explicitly sizing the contained input field to a smaller inner
     * width while keeping the outer component width the same. This extra width is subtracted from the
     * total component width to calculate the new width for the input field.
     */
    getExtraWidth: function(ownerContext) {
        var me = this,
            owner = me.owner,
            borderWidths = me.borderWidths,
            ui = owner.ui + owner.triggerEl.getCount();

        if (!(ui in borderWidths)) {
            borderWidths[ui] = ownerContext.triggerWrap.getBorderInfo().width
        }
        return borderWidths[ui] + owner.getTriggerWidth();
    },

    beginLayoutShrinkWrap: function (ownerContext) {
        var owner = ownerContext.target,
            emptyString = '',
            inputWidth = owner.inputWidth,
            triggerWrap = owner.triggerWrap;

        this.callParent(arguments);

        if (inputWidth) {
            triggerWrap.setStyle('width', inputWidth + 'px');
            inputWidth = (inputWidth - this.getExtraWidth(ownerContext)) + 'px';
            owner.inputEl.setStyle('width', inputWidth);
            owner.inputCell.setStyle('width', inputWidth);
        } else {
            owner.inputCell.setStyle('width', emptyString);
            owner.inputEl.setStyle('width', emptyString);
            triggerWrap.setStyle('width', emptyString);
            triggerWrap.setStyle('table-layout', 'auto');
        }
    },

    getTextWidth: function () {
        var me = this,
            owner = me.owner,
            inputEl = owner.inputEl,
            value;

        // Find the width that contains the whole text value
        value = (inputEl.dom.value || (owner.hasFocus ? '' : owner.emptyText) || '') + owner.growAppend;
        return inputEl.getTextWidth(value);
    },
    
    publishOwnerWidth: function(ownerContext, width) {
        var owner = this.owner;
        this.callParent(arguments);
        if (!owner.grow && !owner.inputWidth) {
            width -= this.getExtraWidth(ownerContext);
            if (owner.labelAlign != 'top') {
                width -= owner.getLabelWidth();
            }
            ownerContext.inputContext.setWidth(width);
        }    
    },

    publishInnerHeight: function(ownerContext, height) {
        ownerContext.inputContext.setHeight(height - this.measureLabelErrorHeight(ownerContext));
    },

    measureContentWidth: function (ownerContext) {
        var me = this,
            owner = me.owner,
            width = me.callParent(arguments),
            inputContext = ownerContext.inputContext,
            calcWidth, max, min;

        if (owner.grow && !ownerContext.state.growHandled) {
            calcWidth = me.getTextWidth() + ownerContext.inputContext.getFrameInfo().width;

            max = owner.growMax;
            min = Math.min(max, width);
            max = Math.max(owner.growMin, max, min);

            // Constrain
            calcWidth = Ext.Number.constrain(calcWidth, owner.growMin, max);
            inputContext.setWidth(calcWidth);
            ownerContext.state.growHandled = true;
            
            // Now that we've set the inputContext, we need to recalculate the width
            inputContext.domBlock(me, 'width');
            width = NaN;
        } else if (!owner.inputWidth) {
            width -= me.getExtraWidth(ownerContext);
        }
        return width;
    },

    updateEditState: function() {
        var me = this,
            owner = me.owner,
            inputEl = owner.inputEl,
            noeditCls = Ext.baseCSSPrefix + 'trigger-noedit',
            displayed,
            readOnly;

        if (me.owner.readOnly) {
            inputEl.addCls(noeditCls);
            readOnly = true;
            displayed = false;
        } else {
            if (me.owner.editable) {
                inputEl.removeCls(noeditCls);
                readOnly = false;
            } else {
                inputEl.addCls(noeditCls);
                readOnly = true;
            }
            displayed = !me.owner.hideTrigger;
        }

        owner.triggerCell.setDisplayed(displayed);
        inputEl.dom.readOnly = readOnly;
    }
});
