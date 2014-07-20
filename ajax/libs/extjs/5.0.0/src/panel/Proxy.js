/**
 * A custom drag proxy implementation specific to {@link Ext.panel.Panel}s. This class
 * is primarily used internally for the Panel's drag drop implementation, and
 * should never need to be created directly.
 * @private
 */
Ext.define('Ext.panel.Proxy', {

    alternateClassName: 'Ext.dd.PanelProxy',
    
    /**
     * @cfg {Boolean} [moveOnDrag=true]
     * True to move the panel to the dragged position when dropped
     */
    moveOnDrag: true,

    /**
     * Creates new panel proxy.
     * @param {Ext.panel.Panel} panel The {@link Ext.panel.Panel} to proxy for
     * @param {Object} [config] Config object
     */
    constructor: function(panel, config){
        var me = this;
        
        /**
         * @property panel
         * @type Ext.panel.Panel
         */
        me.panel = panel;
        me.id = me.panel.id +'-ddproxy';
        Ext.apply(me, config);
    },

    /**
     * @cfg {Boolean} insertProxy
     * True to insert a placeholder proxy element while dragging the panel, false to drag with no proxy.
     * Most Panels are not absolute positioned and therefore we need to reserve this space.
     */
    insertProxy: true,

    // private overrides
    setStatus: Ext.emptyFn,
    reset: Ext.emptyFn,
    update: Ext.emptyFn,
    stop: Ext.emptyFn,
    sync: Ext.emptyFn,

    /**
     * Gets the proxy's element
     * @return {Ext.dom.Element} The proxy's element
     */
    getEl: function(){
        return this.ghost.el;
    },

    /**
     * Gets the proxy's ghost Panel
     * @return {Ext.panel.Panel} The proxy's ghost Panel
     */
    getGhost: function(){
        return this.ghost;
    },

    /**
     * Gets the proxy element. This is the element that represents where the
     * Panel was before we started the drag operation.
     * @return {Ext.dom.Element} The proxy's element
     */
    getProxy: function(){
        return this.proxy;
    },

    /**
     * Hides the proxy
     */
    hide : function(){
        var me = this;
        
        if (me.ghost) {
            if (me.proxy) {
                me.proxy.destroy();
                delete me.proxy;
            }

            // Unghost the Panel, do not move the Panel to where the ghost was
            me.panel.unghost(null, me.moveOnDrag);
            delete me.ghost;
        }
    },

    /**
     * Shows the proxy
     */
    show: function(){
        var me = this,
            panelSize;
            
        if (!me.ghost) {
            panelSize = me.panel.getSize();
            me.panel.el.setVisibilityMode(Ext.Element.DISPLAY);
            me.ghost = me.panel.ghost();
            if (me.insertProxy) {
                // bc Panels aren't absolute positioned we need to take up the space
                // of where the panel previously was
                me.proxy = me.panel.el.insertSibling({
                    role: 'presentation',
                    cls: Ext.baseCSSPrefix + 'panel-dd-spacer'
                });
                me.proxy.setSize(panelSize);
            }
        }
    },

    // private
    repair: function(xy, callback, scope) {
        this.hide();
        Ext.callback(callback, scope || this);
    },

    /**
     * Moves the proxy to a different position in the DOM.  This is typically
     * called while dragging the Panel to keep the proxy sync'd to the Panel's
     * location.
     * @param {HTMLElement} parentNode The proxy's parent DOM node
     * @param {HTMLElement} [before] The sibling node before which the
     * proxy should be inserted. Defaults to the parent's last child if not
     * specified.
     */
    moveProxy : function(parentNode, before){
        if (this.proxy) {
            parentNode.insertBefore(this.proxy.dom, before);
        }
    }
});
