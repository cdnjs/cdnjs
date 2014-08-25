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
 * Component layout for grid column headers which have a title element at the top followed by content.
 * @private
 */
Ext.define('Ext.grid.ColumnComponentLayout', {
    extend: 'Ext.layout.component.Auto',
    alias: 'layout.columncomponent',

    type: 'columncomponent',

    setWidthInDom: true,

    beginLayout: function(ownerContext) {
        var me = this;

        me.callParent(arguments);
        ownerContext.titleContext = ownerContext.getEl('titleEl');
        ownerContext.triggerContext = ownerContext.getEl('triggerEl');
    },

    beginLayoutCycle: function(ownerContext) {
        var me = this,
            owner = me.owner;

        me.callParent(arguments);

        // If shrinkwrapping, allow content width to stretch the element
        if (ownerContext.widthModel.shrinkWrap) {
            owner.el.setWidth('');
        }

        // When we are the last subheader, bordering is provided by our owning header, so we need
        // to set border width to zero
        var borderRightWidth = owner.isLast && owner.isSubHeader ? '0' : '';
        if (borderRightWidth !== me.lastBorderRightWidth) {
            owner.el.dom.style.borderRightWidth = me.lasBorderRightWidth = borderRightWidth;
        }

        owner.titleEl.setStyle({
            paddingTop: '',  // reset back to default padding of the style
            paddingBottom: ''
        });
    },

    // If not shrink wrapping, push height info down into child items
    publishInnerHeight: function(ownerContext, outerHeight) {
        // TreePanels (and grids with hideHeaders: true) set their column container height to zero ti hide them.
        // This is because they need to lay out in order to calculate widths for the columns (eg flexes).
        // If there is no height to lay out, bail out early.
        if (!outerHeight) {
            return;
        }

        var me = this,
            owner = me.owner,
            innerHeight = outerHeight - ownerContext.getBorderInfo().height,
            availableHeight = innerHeight,
            textHeight,
            titleHeight,
            pt, pb;

        // We do not have enough information to get the height of the titleEl
        if (!owner.noWrap && !ownerContext.hasDomProp('width')) {
            me.done = false;
            return;
        }

        // If we are not a container, but just have HTML content...
        if (ownerContext.hasRawContent) {
            titleHeight = availableHeight;

            // Vertically center the header text and ensure titleContext occupies availableHeight
            textHeight = owner.textEl.getHeight();
            if (textHeight) {
                availableHeight -= textHeight;
                if (availableHeight > 0) {
                    pt = Math.floor(availableHeight / 2);
                    pb = availableHeight - pt;
                    ownerContext.titleContext.setProp('padding-top', pt);
                    ownerContext.titleContext.setProp('padding-bottom', pb);
                }
            }
        }

        // There are child items
        else {
            titleHeight = owner.titleEl.getHeight();
            ownerContext.setProp('innerHeight', innerHeight - titleHeight, false);
        }
        // Only IE6 and IEQuirks needs this.
        // This is why we maintain titleHeight when setting it.
        if ((Ext.isIE6 || Ext.isIEQuirks) && ownerContext.triggerContext) {
            ownerContext.triggerContext.setHeight(titleHeight);
        }

    },

    // We do not need the Direct2D sub pixel measurement here. Just the offsetHeight will do.
    // TODO: When https://sencha.jira.com/browse/EXTJSIV-7734 is fixed to not do subpixel adjustment on height,
    // remove this override.
    measureContentHeight: function(ownerContext) {
        return ownerContext.el.dom.offsetHeight;
    },

    publishOwnerHeight: function(ownerContext, contentHeight) {
        this.callParent(arguments);
        // Only IE6 and IEQuirks needs this.
        // This is why we maintain titleHeight when setting it.
        if ((Ext.isIE6 || Ext.isIEQuirks) && ownerContext.triggerContext) {
            ownerContext.triggerContext.setHeight(contentHeight);
        }
    },

    // If not shrink wrapping, push width info down into child items
    publishInnerWidth: function(ownerContext, outerWidth) {
        // If we are acting as a container, publish the innerWidth for the ColumnLayout to use
        if (!ownerContext.hasRawContent) {
            ownerContext.setProp('innerWidth', outerWidth - ownerContext.getBorderInfo().width, false);
        }
    },

    // Push content height outwards when we are shrinkwrapping
    calculateOwnerHeightFromContentHeight: function (ownerContext, contentHeight) {
        var result = this.callParent(arguments);

        // If we are NOT a group header, we just use the auto component's measurement
        if (!ownerContext.hasRawContent) {
            if (this.owner.noWrap || ownerContext.hasDomProp('width')) {
                return contentHeight + this.owner.titleEl.getHeight() + ownerContext.getBorderInfo().height;
            }

            // We do not have the information to return the height yet because we cannot know
            // the final height of the text el
            return null;
        }
        return result;
    },

    // Push content width outwards when we are shrinkwrapping
    calculateOwnerWidthFromContentWidth: function (ownerContext, contentWidth) {
        var owner = this.owner,
            inner = Math.max(contentWidth, owner.textEl.getWidth() + ownerContext.titleContext.getPaddingInfo().width),
            padWidth = ownerContext.getPaddingInfo().width,
            triggerOffset = this.getTriggerOffset(owner, ownerContext);
            
        return inner + padWidth + triggerOffset;
    },
    
    getTriggerOffset: function(owner, ownerContext) {
        var width = 0;
        if (ownerContext.widthModel.shrinkWrap && !owner.menuDisabled) {
            // If we have any children underneath, then we already have space reserved
            if (owner.query('>:not([hidden])').length === 0) {
                width = owner.self.triggerElWidth;
            }
        }
        return width;
    }
});