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
 * @private
 * Base class for Box Layout overflow handlers. These specialized classes are invoked when a Box Layout
 * (either an HBox or a VBox) has child items that are either too wide (for HBox) or too tall (for VBox)
 * for its container.
 */
Ext.define('Ext.layout.container.boxOverflow.None', {
    alternateClassName: 'Ext.layout.boxOverflow.None',
    
    constructor: function(layout, config) {
        this.layout = layout;
        Ext.apply(this, config);
    },

    handleOverflow: Ext.emptyFn,

    clearOverflow: Ext.emptyFn,

    beginLayout: Ext.emptyFn,
    beginLayoutCycle: Ext.emptyFn,

    calculate: function(ownerContext) {
        var me = this,
            plan = ownerContext.state.boxPlan,
            overflow;

        if (plan && plan.tooNarrow) {
            overflow = me.handleOverflow(ownerContext);

            if (overflow) {
                if (overflow.reservedSpace) {
                    me.layout.publishInnerCtSize(ownerContext, overflow.reservedSpace);
                }

                // TODO: If we need to use the code below then we will need to pass along
                // the new targetSize as state and use it calculate somehow...
                //
                //if (overflow.recalculate) {
                //    ownerContext.invalidate({
                //        state: {
                //            overflow: overflow
                //        }
                //    });
                //}
            }
        } else {
            me.clearOverflow();
        }
    },

    completeLayout: Ext.emptyFn,

    finishedLayout: function (ownerContext) {
        var me = this,
            owner = me.layout.owner,
            hiddens,
            hiddenCount;

        // Only count hidden children if someone is interested when the overflow state changes
        if (owner.hasListeners.overflowchange) {
            hiddens = owner.query('>[hidden]');
            hiddenCount = hiddens.length;
            if (hiddenCount !== me.lastHiddenCount) {
                owner.fireEvent('overflowchange', me.lastHiddenCount, hiddenCount, hiddens);
                me.lastHiddenCount = hiddenCount;
            }
        }
    },

    onRemove: Ext.emptyFn,

    /**
     * @private
     * Normalizes an item reference, string id or numerical index into a reference to the item
     * @param {Ext.Component/String/Number} item The item reference, id or index
     * @return {Ext.Component} The item
     */
    getItem: function(item) {
        return this.layout.owner.getComponent(item);
    },
    
    getOwnerType: function(owner){
        var type;
        if (owner.isToolbar) {
            type = 'toolbar';
        } else if (owner.isTabBar) {
            type = 'tabbar';
        } else if (owner.isMenu) {
            type = 'menu';
        } else {
            type = owner.getXType();
        }
        
        return type;
    },

    getPrefixConfig: Ext.emptyFn,
    getSuffixConfig: Ext.emptyFn,
    getOverflowCls: function() {
        return '';
    }
});