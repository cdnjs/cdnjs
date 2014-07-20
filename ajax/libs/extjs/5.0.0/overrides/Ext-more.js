// @tag core
// @define Ext-more
// @override Ext
// @define Ext.overrides.Ext-more

Ext.require([
    'Ext.event.gesture.*',
    'Ext.event.publisher.Dom',
    'Ext.event.publisher.Gesture',
    'Ext.event.Dispatcher'
]);

Ext.onReady(function() {
    var dispatcher = Ext.event.Dispatcher.getInstance();

    dispatcher.setPublishers({
        dom: new Ext.event.publisher.Dom(),
        gesture: new Ext.event.publisher.Gesture({
            recognizers: {
                drag: new Ext.event.gesture.Drag(),
                tap: new Ext.event.gesture.Tap(),
                doubleTap: new Ext.event.gesture.DoubleTap(),
                longPress: new Ext.event.gesture.LongPress(),
                swipe: new Ext.event.gesture.Swipe(),
                pinch: new Ext.event.gesture.Pinch(),
                rotate: new Ext.event.gesture.Rotate(),
                edgeSwipe: new Ext.event.gesture.EdgeSwipe()
            }
        })
        // TODO: can we make use of these?  ElementSize currently causes problems
        // in Ext because it handles "resize" events.  When ElementSize is used we can't
        // listen for window resize because Dom publisher doesn't know it needs to handle
        // "resize" since ElementSize has already registered that event.
//            elementPaint: new Ext.event.publisher.ElementPaint(),
//            elementSize: new Ext.event.publisher.ElementSize()
    });

    Ext.get(window).on('unload', dispatcher.destroy, dispatcher);

}, null, {
    // The event system has a very high priority because it must be initialized before
    // any other onReady callbacks.
    priority: 2000
});

Ext.apply(Ext, {
    /**
     * @property {String} SSL_SECURE_URL
     * URL to a blank file used by Ext when in secure mode for iframe src and onReady src
     * to prevent the IE insecure content warning (`'about:blank'`, except for IE
     * in secure mode, which is `'javascript:""'`).
     * @member Ext
     */
    SSL_SECURE_URL : Ext.isSecure && Ext.isIE ? 'javascript:\'\'' : 'about:blank',

    /**
     * @property {String} BLANK_IMAGE_URL
     * URL to a 1x1 transparent gif image used by Ext to create inline icons with
     * CSS background images.
     * @member Ext
     */
    BLANK_IMAGE_URL: 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
});
