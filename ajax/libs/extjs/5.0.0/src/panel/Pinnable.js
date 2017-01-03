/**
 * This mixin is applied to panels that want to manage a Pin state and corresponding tool.
 */
Ext.define('Ext.panel.Pinnable', {
    extend: 'Ext.Mixin',

    mixinId: 'pinnable',

    pinnable: true,

    pinnedTip: 'Unpin this item',

    unpinnedTip: 'Pin this item',

    initPinnable: function () {
        var me = this,
            pinned = me.isPinned();

        me.addTool(me.pinTool = Ext.widget({
            xtype: 'tool',
            type: pinned ? 'unpin' : 'pin',
            callback: 'togglePin',
            scope: me,
            tooltip: pinned ? me.pinnedTip : me.unpinnedTip
        }));
    },

    isPinned: function () {
        return !this.floating;
    },

    setPinned: function (pinned) {
        var me = this,
            args;

        if (pinned !== me.isPinned()) {
            args = [me, pinned];
            if (me.fireEventArgs('beforepinchange', args) !== false) {
                me.updatePinned(pinned);
                me.fireEventArgs('pinchange', args);
            }
        }
    },

    togglePin: function () {
        this.setPinned(!this.isPinned());
    },

    updatePinned: function (pinned) {
        var me = this,
            tool = me.pinTool;

        tool.setTooltip(pinned ? me.pinnedTip : me.unpinnedTip);
        tool.setType(pinned ? 'unpin' : 'pin');
    }
});
