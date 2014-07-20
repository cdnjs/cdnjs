//<feature legacyBrowser>
Ext.define('Ext.overrides.event.publisher.Dom', {
    override: 'Ext.event.publisher.Dom'

}, function() {
    var DomPublisher = Ext.event.publisher.Dom,
        prototype = DomPublisher.prototype;

    if (Ext.isIE9m) {
        DomPublisher.override({
            initHandlers: function() {
                var me = this,
                    superOnDelegatedEvent, superOnDirectEvent;

                me.callParent();

                superOnDelegatedEvent = me.onDelegatedEvent;
                superOnDirectEvent = me.onDirectEvent;

                me.target = document;
                me.targetIsWin = false;

                me.onDelegatedEvent = function(e) {
                    e.target = e.srcElement || window;
                    superOnDelegatedEvent.call(me, e);
                };

                // This method gets bound to the element scope in addDirectListener so that
                // the currentTarget can be captured using "this".
                me.onDirectEvent = function(e) {
                    e.target = e.srcElement || window;
                    e.currentTarget = this; // this, not me
                    superOnDirectEvent.call(me, e);
                };
            },

            addDelegatedListener: function(eventName) {
                // Use attachEvent for IE9 and below.  Even though IE9 strict supports
                // addEventListener, it has issues with using synthetic events.
                this.target.attachEvent('on' + eventName, this.onDelegatedEvent);
            },

            removeDelegatedListener: function(eventName) {
                this.target.detachEvent('on' + eventName, this.onDelegatedEvent);
            },

            addDirectListener: function(eventName, element) {
                var me = this,
                    // binding the listener to the element allows us to capture the
                    // "currentTarget" (see onDirectEvent)
                    boundFn = Ext.Function.bind(me.onDirectEvent, element);

                me.directSubscribers[element.id][eventName].fn = boundFn;
                // may be called with an SVG element here, which
                // does not have the attachEvent method on IE 9 strict
                if(element.attachEvent) {
                    element.attachEvent('on' + eventName, boundFn);
                } else {
                    me.callParent(arguments);
                }
            },

            removeDirectListener: function(eventName, element) {
                if(element.detachEvent) {
                    element.detachEvent('on' + eventName,
                        this.directSubscribers[element.id][eventName].fn);
                } else {
                    this.callParent(arguments);
                }
            }
        });

        // can't capture any events without addEventListener.  Have to have direct
        // listeners for every event that does not bubble.
        Ext.apply(prototype.directEvents, prototype.captureEvents);
        prototype.captureEvents = {};
    }
});
//</feature>