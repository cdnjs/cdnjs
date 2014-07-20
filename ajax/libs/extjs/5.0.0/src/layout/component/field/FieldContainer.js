/**
 * @private
 */
Ext.define('Ext.layout.component.field.FieldContainer', {

    /* Begin Definitions */

    extend: 'Ext.layout.component.Auto',

    alias: 'layout.fieldcontainer',

    /* End Definitions */

    type: 'fieldcontainer',

    waitForOuterHeightInDom: true,
    waitForOuterWidthInDom: true,

    beginLayout: function(ownerContext) {
        var owner = this.owner;
        this.callParent(arguments);

        // Tell Component.measureAutoDimensions to measure the DOM when containerChildrenSizeDone is true
        ownerContext.hasRawContent = true;
        owner.containerEl.setStyle('height', '');
        ownerContext.containerElContext = ownerContext.getEl('containerEl');
    },

    measureContentHeight: function (ownerContext) {
        // since we are measuring the outer el, we have to wait for whatever is in our
        // container to be flushed to the DOM... especially for things like box layouts
        // that size the innerCt since that is all that will contribute to our size!
        return ownerContext.hasDomProp('containerLayoutDone') ? this.callParent(arguments) : NaN;
    },

    measureContentWidth: function (ownerContext) {
        // see measureContentHeight
        return ownerContext.hasDomProp('containerLayoutDone') ? this.callParent(arguments) : NaN;
    },

    publishInnerHeight: function (ownerContext, height) {
        var owner = this.owner;

        if (owner.labelAlign === 'top' && owner.hasVisibleLabel()) {
            height -= owner.labelEl.getHeight();
        }

        if (owner.msgTarget === 'under' && owner.hasActiveError()) {
            height -= owner.errorWrapEl.getHeight();
        }

        height -= owner.bodyEl.getPadding('tb');

        ownerContext.containerElContext.setHeight(height, false);
    },

    publishInnerWidth: function (ownerContext, width) {
        var owner = this.owner;

        if (owner.labelAlign !== 'top' && owner.hasVisibleLabel()) {
            width -= (owner.labelWidth + (owner.labelPad || 0));
        }

        if (owner.msgTarget === 'side' && owner.hasActiveError()) {
            width -= owner.errorWrapEl.getWidth();
        }

        width -= owner.bodyEl.getPadding('lr');

        ownerContext.containerElContext.setWidth(width, false);
    }

});
