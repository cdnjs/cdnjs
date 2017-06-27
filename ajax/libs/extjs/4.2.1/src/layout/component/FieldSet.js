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
 * Component layout for Ext.form.FieldSet components
 * @private
 */
Ext.define('Ext.layout.component.FieldSet', {
    extend: 'Ext.layout.component.Body',
    alias: ['layout.fieldset'],

    type: 'fieldset',
    
    defaultCollapsedWidth: 100,

    beforeLayoutCycle: function (ownerContext) {
        if (ownerContext.target.collapsed) {
            ownerContext.heightModel = this.sizeModels.shrinkWrap;
        }
    },

    beginLayoutCycle: function (ownerContext) {
        var target = ownerContext.target,
            lastSize;

        this.callParent(arguments);

        // Each time we begin (2nd+ would be due to invalidate) we need to publish the
        // known contentHeight if we are collapsed:
        //
        if (target.collapsed) {
            ownerContext.setContentHeight(0);
            // if we're collapsed, ignore a minHeight because it's likely going to
            // be greater than the collapsed height
            ownerContext.restoreMinHeight = target.minHeight;
            delete target.minHeight;

            // If we are also shrinkWrap width, we must provide a contentWidth (since the
            // container layout is not going to run).
            //
            if (ownerContext.widthModel.shrinkWrap) {
                lastSize = target.lastComponentSize;
                ownerContext.setContentWidth((lastSize && lastSize.contentWidth) || this.defaultCollapsedWidth);
            }
        }
    },
    
    finishedLayout: function(ownerContext) {
        var owner = this.owner,
            restore = ownerContext.restoreMinHeight;
             
        this.callParent(arguments);
        if (restore) {
            owner.minHeight = restore;
        }
    },

    calculateOwnerHeightFromContentHeight: function (ownerContext, contentHeight) {
        var border = ownerContext.getBorderInfo(),
            legend = ownerContext.target.legend;
            
        // Height of fieldset is content height plus top border width (which is either the
        // legend height or top border width) plus bottom border width
        return ownerContext.getProp('contentHeight') +
               ownerContext.getPaddingInfo().height +
               // In IE8m and IEquirks the top padding is on the body el
               ((Ext.isIEQuirks || Ext.isIE8m) ?
                   ownerContext.bodyContext.getPaddingInfo().top : 0) +
               (legend ? legend.getHeight() : border.top) +
               border.bottom;
    },

    publishInnerHeight: function (ownerContext, height) {
        // Subtract the legend off here and pass it up to the body
        // We do this because we don't want to set an incorrect body height
        // and then setting it again with the correct value
        var legend = ownerContext.target.legend;
        if (legend) {
            height -= legend.getHeight();
        }
        this.callParent([ownerContext, height]);
    },

    getLayoutItems : function() {
        var legend = this.owner.legend;
        return legend ? [legend] : [];
    }
});