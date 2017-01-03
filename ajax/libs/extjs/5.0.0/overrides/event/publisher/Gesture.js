//<feature legacyBrowser>
Ext.define('Ext.overrides.event.publisher.Gesture', {
    override: 'Ext.event.publisher.Gesture'
}, function() {
    if (Ext.isIE9m) {
        this.override({
            updateTouches: function(e, isEnd) {
                var browserEvent = e.browserEvent,
                    xy = e.getXY();

                // I don't always set pageX and pageY on the event object, but when I do
                // it's because the Gesture publisher expects an event object that has them.
                browserEvent.pageX = xy[0];
                browserEvent.pageY = xy[1];
                this.callParent([e, isEnd]);
            },

            initHandlers: function() {
                var me = this,
                    superOnDelegatedEvent;

                me.callParent();
                superOnDelegatedEvent = me.onDelegatedEvent;

                me.onDelegatedEvent = function(e) {
                    // Workaround IE's "Member not found" errors when accessing an event
                    // object asynchronously.  Needed for all gesture handlers because
                    // they use requestAnimationFrame (see enableIEAsync for more details)
                    superOnDelegatedEvent.call(me, Ext.event.Event.enableIEAsync(e));
                };
            }
        });
    }
});
//</feature>
