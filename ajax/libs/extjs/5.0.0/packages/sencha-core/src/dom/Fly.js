/**
 * A flyweight Ext.dom.Element that can be dynamically attached to a DOM node.
 * In general this class should not be instantiated directly.  Use {@link Ext#fly}
 * to create and retrieve Fly instances.
 */
Ext.define('Ext.dom.Fly', {
    extend: 'Ext.dom.Element',
    alternateClassName: 'Ext.dom.Element.Fly',

    /**
     * @property {Boolean} isFly
     * This is `true` to identify Element flyweights
     */
    isFly: true,

    constructor: function(dom) {
        this.dom = dom;

        // set an "el" property that references "this".  This allows
        // Ext.util.Positionable methods to operate on this.el.dom since it
        // gets mixed into both Element and Component
        this.el = this;
    },

    attach: function (dom) {
        if (!dom) {
            return this.detach();
        }
        var me = this,
            cacheEntry = Ext.cache[dom.id];

        me.dom = dom;

        me.isSynchronized = false;
        if (cacheEntry) {
            cacheEntry.isSynchronized = false;
        }
        return this;
    },

    detach: function() {
        this.dom = this.classList = this.hasClassMap = null;
    },

    addListener:
        //<debug>
        function() {
            Ext.Error.raise(
                "Cannot use addListener() on Ext.dom.Fly instances. " +
                "Please use Ext.get() to retrieve an Ext.dom.Element instance instead."
            );
        } ||
        //</debug>
        null,

    removeListener: 
        //<debug>
        function() {
            Ext.Error.raise(
                "Cannot use removeListener() on Ext.dom.Fly instances. " +
                "Please use Ext.get() to retrieve an Ext.dom.Element instance instead."
            );
        } ||
        //</debug>
        null
}, function(Fly) {
    var flyweights = {};

    /**
     * @member Ext
     * @property {Object} cache
     * Stores `Fly` instances keyed by their assigned or generated name.
     * @readonly
     * @private
     * @since 5.0.0
     */
    Fly.cache = flyweights;

    /**
     * @member Ext
     * @method fly
     * Gets the globally shared flyweight Element, with the passed node as the active
     * element. Do not store a reference to this element - the dom node can be overwritten
     * by other code. {@link Ext#fly} is alias for {@link Ext.dom.Element#fly}.
     *
     * Use this to make one-time references to DOM elements which are not going to be
     * accessed again either by application code, or by Ext's classes. If accessing an
     * element which will be processed regularly, then {@link Ext#get Ext.get} will be
     * more appropriate to take advantage of the caching provided by the
     * {@link Ext.dom.Element} class.
     * 
     * If this method is called with and id or element that has already been cached by
     * a previous call to Ext.get() it will return the cached Element instead of the
     * flyweight instance.
     *
     * @param {String/HTMLElement} dom The DOM node or `id`.
     * @param {String} [named] Allows for creation of named reusable flyweights to prevent 
     * conflicts (e.g. internally Ext uses "_global").
     * @return {Ext.dom.Element} The shared Element object (or `null` if no matching
     * element was found).
     */
    Ext.fly = function(dom, named) {
        var fly = null,
            fn = Ext.fly,
            nodeType;

        // name the flyweight after the calling method name if possible.
        named = named || (fn.caller && fn.caller.$name) || '_global';

        dom = Ext.getDom(dom);

        if (dom) {
            nodeType = dom.nodeType;
            // check if we have a valid node type or if the el is a window object before
            // proceeding. This allows elements, document fragments, and document/window
            // objects (even those inside iframes) to be wrapped.
            if (Ext.Element.validNodeTypes[nodeType] || (!nodeType && (dom.window === dom))) {
                fly = Ext.cache[dom.id];

                // If there's no Element cached, or the element cached is for another DOM node, return a Fly
                if (!fly || fly.dom !== dom) {
                    fly = flyweights[named] || (flyweights[named] = new Fly());
                    fly.dom = dom;
                    fly.isSynchronized = false;
                }
            }
        }
        return fly;
    };
});
