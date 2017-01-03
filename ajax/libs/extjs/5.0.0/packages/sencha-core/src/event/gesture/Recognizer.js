/**
 * A base class for all gesture recognizers.
 *
 * The following gestures are enabled by default in both Ext JS and Sencha Touch:
 *
 * * {@link Ext.event.gesture.Tap}
 * * {@link Ext.event.gesture.DoubleTap}
 * * {@link Ext.event.gesture.LongPress}
 * * {@link Ext.event.gesture.Drag}
 * * {@link Ext.event.gesture.Swipe}
 * * {@link Ext.event.gesture.Pinch}
 * * {@link Ext.event.gesture.Rotate}
 * * {@link Ext.event.gesture.EdgeSwipe}
 *
 * TODO: more docs on howto here
 * If you want to create custom recognizers, or disable recognizers in your application,
 * please refer to the documentation in {@link Ext#setup}.
 *
 * @abstract
 * @private
 */
Ext.define('Ext.event.gesture.Recognizer', {
    mixins: ['Ext.mixin.Identifiable'],

    handledEvents: [],

    config: {
        onRecognized: Ext.emptyFn,
        callbackScope: null
    },

    constructor: function(config) {
        this.initConfig(config);

        return this;
    },

    getHandledEvents: function() {
        return this.handledEvents;
    },

    onStart: Ext.emptyFn,

    onEnd: Ext.emptyFn,

    onTouchStart: Ext.emptyFn,

    onTouchMove: Ext.emptyFn,

    onTouchEnd: Ext.emptyFn,

    onTouchCancel: Ext.emptyFn,

    fail: function() {
        return false;
    },

    fire: function() {
        this.getOnRecognized().apply(this.getCallbackScope(), arguments);
    },

    debugHooks: {
        $enabled: false,  // Disable by default

        fail: function(msg) {
            Ext.log.info(this.$className + ' Gesture Failed: ' + msg);
            return false;
        }
    }
});
