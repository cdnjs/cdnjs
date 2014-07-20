/**
 * A Queue is a queue of {@link Ext.app.route.Route} instances managed by the
 * {@link Ext.app.route.Router} singleton if queueActions is set to `true`.
 * 
 * A developer shouldn't need to use this class as {@link Ext.app.route.Router} should
 * manage this class. When a {@link Ext.app.route.Route} is executed,it will automatically
 * keep running the queue until the queue is empty.
 * 
 * @author Mitchell Simoens
 * @private
 */
Ext.define('Ext.app.route.Queue', {
    /**
     * The {@link Ext.util.MixedCollection} that will hold the queued
     * {@link Ext.app.route.Route} and recognized arguments.
     *
     * @private
     */
    queue: null,

    /**
     * The token from the {@link Ext.app.route.Router} that is being enacted on.
     */
    token: null,

    constructor : function(config) {
        Ext.apply(this, config);

        //Create the queue MixedCollection
        this.queue = new Ext.util.MixedCollection();
    },

    /**
     * Add a {@link Ext.app.route.Route} to the queue.
     *
     * @param {Ext.app.route.Route} route The route to add to the queue.
     * @param {Object} args The arguments recognized by the {Ext.app.route.Route}.
     */
    queueAction : function (route, args) {
        this.queue.add({
            route : route,
            args  : args
        });
    },

    /**
     * Clear all queued actions.
     */
    clearQueue : function() {
        this.queue.removeAll();
    },

    /**
     * Run the queue one by one.
     */
    runQueue : function() {
        var queue  = this.queue,
            action = queue.removeAt(0),
            route;

        if (action) {
            route = action && action.route;

            route.execute(this.token, action.args, this.onActionExecute, this);
        }
    },

    /**
     * Handle the execution of a queued action and optionally clear all queued actions.
     *
     * @param {Boolean} clearQueue If `true` was returned, will clear all queued actions.
     */
    onActionExecute : function(clearQueue) {
        if (clearQueue) {
            //clear all queued actions
            this.clearQueue();
        } else {
            //continue with queue execution
            this.runQueue();
        }
    }
});
