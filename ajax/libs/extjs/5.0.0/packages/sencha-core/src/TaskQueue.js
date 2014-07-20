/**
 * @private
 * Handle batch read / write of DOMs, currently used in SizeMonitor + PaintMonitor
 */
Ext.define('Ext.TaskQueue', {
    requires: 'Ext.AnimationQueue',

    singleton: true,

    pending: false,

    mode: true,

    constructor: function() {
        this.readQueue = [];
        this.writeQueue = [];

        this.run = Ext.Function.bind(this.run, this);
        this.watch = Ext.Function.bind(this.watch, this);

        // iOS has a nasty bug which causes pending requestAnimationFrame to not release
        // the callback when the WebView is switched back and forth from / to being background process
        // We use a watchdog timer to workaround this, and restore the pending state correctly if this happens
        // This timer has to be set as an interval from the very beginning and we have to keep it running for
        // as long as the app lives, setting it later doesn't seem to work
        if (Ext.os.is.iOS) {
            setInterval(this.watch, 500);
        }
    },

    requestRead: function(fn, scope, args) {
        this.request(true);
        this.readQueue.push(arguments);
    },

    requestWrite: function(fn, scope, args) {
        this.request(false);
        this.writeQueue.push(arguments);
    },

    request: function(mode) {
        if (!this.pending) {
            this.pendingTime = Date.now();
            this.pending = true;
            this.mode = mode;
            if (mode) {
                setTimeout(this.run, 1);
            } else {
                Ext.Function.requestAnimationFrame(this.run);
            }
        }
    },

    watch: function() {
        if (this.pending && Date.now() - this.pendingTime >= 500) {
            this.run();
        }
    },

    run: function() {
        this.pending = false;

        var readQueue = this.readQueue,
            writeQueue = this.writeQueue,
            request = null,
            queue;

        if (this.mode) {
            queue = readQueue;

            if (writeQueue.length > 0) {
                request = false;
            }
        }
        else {
            queue = writeQueue;

            if (readQueue.length > 0) {
                request = true;
            }
        }

        var tasks = queue.slice(),
            i, ln, task, fn, scope;

        queue.length = 0;

        for (i = 0, ln = tasks.length; i < ln; i++) {
            task = tasks[i];
            fn = task[0];
            scope = task[1];

            if (typeof fn == 'string') {
                fn = scope[fn];
            }

            if (task.length > 2) {
                fn.apply(scope, task[2]);
            }
            else {
                fn.call(scope);
            }
        }

        tasks.length = 0;

        if (request !== null) {
            this.request(request);
        }
    }
});
