// @tag core

/**
 * @class Ext.GlobalEvents
 */
Ext.define('Ext.overrides.GlobalEvents', {
    override: 'Ext.GlobalEvents',

    /**
     * @event resumelayouts
     * Fires after global layout processing has been resumed in {@link
     * Ext.Component#resumeLayouts}.
     */

    /**
     * @event mousedown
     * A mousedown listener on the document that is immune to stopPropagation()
     * used in cases where we need to know if a mousedown event occurred on the
     * document regardless of whether some other handler tried to stop it.  An
     * example where this is useful is a menu that needs to be hidden whenever
     * there is a mousedown event on the document.
     * @param {Ext.event.Event} The event object
     */

    attachListeners: function() {
        this.callParent();
        Ext.getDoc().on('mousedown', this.fireMouseDown, this);
    },

    fireMouseDown: function(e) {
        this.fireEvent('mousedown', e);
    },

    deprecated: {
        5: {
            methods: {
                addListener: function(ename, fn, scope, options) {
                    var name,
                        readyFn;

                    // The "ready" event was removed from Ext.globalEvents in 5.0 in favor of
                    // Ext.onReady().  This function adds compatibility for the ready event

                    if (ename === 'ready') {
                        readyFn = fn;
                    } else if (typeof ename !== 'string') {
                        for (name in ename) {
                            if (name === 'ready') {
                                readyFn = ename[name];
                            }
                        }
                    }

                    if (readyFn) {
                        //<debug>
                        Ext.log.warn("Ext.on('ready', fn) is deprecated.  Please use Ext.onReady(fn) instead.");
                        //</debug>
                        Ext.onReady(readyFn);
                    }

                    this.callParent([ename, fn, scope, options]);
                }
            }
        }
    }
});