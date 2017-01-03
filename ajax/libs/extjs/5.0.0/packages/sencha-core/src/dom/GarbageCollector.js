/**
 * @private
 */
Ext.define('Ext.dom.GarbageCollector', {
    singleton: true,

    interval: 30000,

    constructor: function() {
        var me = this;
        me.collect = Ext.Function.bind(me.collect, me);
        me.resume();
    },

    // private
    // Garbage collection - uncache elements/purge listeners on orphaned elements
    // so we don't hold a reference and cause the browser to retain them
    collect: function() {
        var me = this,
            cache = Ext.cache,
            eid, dom, el, t;

        if (!Ext.enableGarbageCollector) {
            me.pause();
        } else {
            for (eid in cache) {
                if (!cache.hasOwnProperty(eid)) {
                    continue;
                }

                el = cache[eid];

                // Skip document and window elements
                if (el.skipGarbageCollection) {
                    continue;
                }

                dom = el.dom;

                //<debug>
                // Should always have a DOM node
                if (!dom) {
                    Ext.Error.raise('Missing DOM node in element garbage collection: ' + eid);
                }
                //</debug>

                // Do not attempt to garbage collect documents and windows.
                if (Ext.isGarbage(dom)) {
                    el.clearListeners();
                    delete cache[eid];
                }
            }
            //<feature legacyBrowser>
            // Cleanup IE Object leaks
            if (Ext.isIE9m) {
                t = {};
                for (eid in cache) {
                    if (cache.hasOwnProperty(eid)) {
                        t[eid] = cache[eid];
                    }
                }
                cache = Ext.cache = t;
            }
            //</feature>

            me.lastTime = Ext.now();
        }
    },

    pause: function() {
        clearTimeout(this.timerId);
    },

    resume: function() {
        var me = this,
            lastTime = me.lastTime;

        if (lastTime && (Ext.now() - lastTime > me.interval)) {
            me.collect();
        }

        me.timerId = setInterval(me.collect, me.interval);
    }
});