/**
 * A class that manages a group of {@link Ext.Component#floating} Components and provides z-order management,
 * and Component activation behavior, including masking below the active (topmost) Component.
 *
 * {@link Ext.Component#floating Floating} Components which are rendered directly into the document (such as
 * {@link Ext.window.Window Window}s) which are {@link Ext.Component#method-show show}n are managed by a
 * {@link Ext.WindowManager global instance}.
 *
 * {@link Ext.Component#floating Floating} Components which are descendants of {@link Ext.Component#floating floating}
 * *Containers* (for example a {@link Ext.view.BoundList BoundList} within an {@link Ext.window.Window Window},
 * or a {@link Ext.menu.Menu Menu}), are managed by a ZIndexManager owned by that floating Container. Therefore
 * ComboBox dropdowns within Windows will have managed z-indices guaranteed to be correct, relative to the Window.
 */
Ext.define('Ext.ZIndexManager', {
    alternateClassName: 'Ext.WindowGroup',

    requires: [
        'Ext.GlobalEvents'
    ],

    statics: {
        zBase : 9000
    },

    constructor: function(container) {
        var me = this;

        me.map = {};
        me.zIndexStack = [];
        me.front = null;

        if (container) {

            // This is the ZIndexManager for an Ext.container.Container, base its zseed on the zIndex of the Container's element
            if (container.isContainer) {
                container.on('resize', me._onContainerResize, me);
                me.zseed = Ext.Number.from(me.rendered ? container.getEl().getStyle('zIndex') : undefined, me.getNextZSeed());
                // The containing element we will be dealing with (eg masking) is the content target
                me.targetEl = container.getTargetEl();
                me.container = container;
            }
            // This is the ZIndexManager for a DOM element
            else {
                Ext.on('resize', me._onContainerResize, me);
                me.zseed = me.getNextZSeed();
                me.targetEl = Ext.get(container);
            }
        }
        // No container passed means we are the global WindowManager. Our target is the doc body.
        // DOM must be ready to collect that ref.
        else {
            me.zseed = me.getNextZSeed();
            Ext.onReady(function() {
                Ext.on('resize', me._onContainerResize, me);
                me.targetEl = Ext.getBody();
            });
        }
    },

    getNextZSeed: function() {
        return (Ext.ZIndexManager.zBase += 10000);
    },

    setBase: function(baseZIndex) {
        this.zseed = baseZIndex;
        var result = this.assignZIndices();
        this._activateLast();
        return result;
    },

    // @private
    assignZIndices: function() {
        var a = this.zIndexStack,
            len = a.length,
            i = 0,
            zIndex = this.zseed,
            comp,
            topModal;

        for (; i < len; i++) {
            comp = a[i];
            if (comp && !comp.hidden) {

                // Setting the zIndex of a Component returns the topmost zIndex consumed by
                // that Component.
                // If it's just a plain floating Component such as a BoundList, then the
                // return value is the passed value plus 10, ready for the next item.
                // If a floating *Container* has its zIndex set, it re-orders its managed
                // floating children, starting from that new base, and returns a value 10000 above
                // the highest zIndex which it allocates.
                zIndex = comp.setZIndex(zIndex);
                if (comp.modal) {
                    topModal = comp;
                }
            }
        }
        
        // If we encountered a modal in our reassigment, ensure our modal mask is just below it.
        if (topModal) {
            this._showModalMask(topModal);
        }
        return zIndex;
    },

    // @private
    _setActiveChild: function(comp, oldFront) {
        var front = this.front,
            oldPreventFocus = comp.preventFocusOnActivate;

        if (comp !== front) {

            if (front && !front.destroying) {
                front.setActive(false, comp);
            }
            this.front = comp;
            if (comp && comp != oldFront) {

                // If the previously active comp did not take focus, then do not disturb focus state by focusing the new front
                comp.preventFocusOnActivate = comp.preventFocusOnActivate || oldFront && (oldFront.preventFocusOnActivate || !oldFront.focusOnToFront);

                comp.setActive(true);
                
                // If the modal mask was utilized by the outgoing front component, reposition it.
                if (comp.modal) {
                    this._showModalMask(comp);
                }

                // Restore the new front's focusing flag
                comp.preventFocusOnActivate = oldPreventFocus;
            }
        }
    },

    onComponentHide: function(comp){
        this._activateLast();
    },

    // @private
    _activateLast: function() {
        var me = this,
            stack = me.zIndexStack,
            i = stack.length - 1,
            comp;

        // Go down through the z-index stack.
        // Activate the next visible one down.
        // If that was modal, then we're done
        
        // Note that we're using an empty loop body here
        // This is intentional!
        for (; i >= 0 && stack[i].hidden; --i);

        // The loop found a visible floater to activate
        if ((comp = stack[i])) {
            me._setActiveChild(comp, me.front);
            if (comp.modal) {
                return;
            }
        }
        // No other floater to activate, just deactivate the current one
        else {
            if (me.front && !me.front.destroying) {
                me.front.setActive(false);
            }
            me.front = null;
        }

        // If the new top one was not modal, keep going down to find the next visible
        // modal one to shift the modal mask down under
        for (; i >= 0; --i) {
            comp = stack[i];
            // If we find a visible modal further down the zIndex stack, move the mask to just under it.
            if (comp.isVisible() && comp.modal) {
                me._showModalMask(comp);
                return;
            }
        }

        // No visible modal Component was found in the run down the stack.
        // So hide the modal mask
        me._hideModalMask();
    },

    _showModalMask: function(comp) {
        var me = this,
            zIndex = comp.el.getStyle('zIndex') - 4,
            maskTarget = comp.floatParent ? comp.floatParent.getTargetEl() : comp.container,
            mask = me.mask,
            shim = me.maskShim,
            viewSize;

        if (!mask) {
            // Create the mask at zero size so that it does not affect upcoming target measurements.
            mask = me.mask = Ext.getBody().createChild({
                //<debug>
                // tell the spec runner to ignore this element when checking if the dom is clean 
                'data-sticky': true,
                //</debug>
                role: 'presentation',
                cls: Ext.baseCSSPrefix + 'mask',
                style: 'height:0;width:0'
            });
            mask.setVisibilityMode(Ext.Element.DISPLAY);
            mask.on('click', me._onMaskClick, me);
        }
        
        mask.maskTarget = maskTarget;
        viewSize = me.getMaskBox();

        if (shim) {
            shim.setStyle('zIndex', zIndex);
            shim.show();
            shim.setBox(viewSize);
        }
        mask.setStyle('zIndex', zIndex);

        mask.show();
        mask.setBox(viewSize);
    },

    _hideModalMask: function() {
        var mask = this.mask,
            maskShim = this.maskShim;

        if (mask && mask.isVisible()) {
            mask.maskTarget = undefined;
            mask.hide();
            if (maskShim) {
                maskShim.hide();
            }
        }
    },

    _onMaskClick: function() {
        if (this.front) {
            this.front.focus();
        }
    },
    
    getMaskBox: function(){
        var maskTarget = this.mask.maskTarget;
        if (maskTarget.dom === document.body) {
            return {
                height: Math.max(document.body.scrollHeight, Ext.dom.Element.getDocumentHeight()),
                width: Math.max(document.body.scrollWidth, document.documentElement.clientWidth),
                x: 0,
                y: 0
            };
        } else {
            return maskTarget.getBox();
        } 
    },

    _onContainerResize: function() {
        var me = this,
            mask = me.mask,
            maskShim = me.maskShim,
            viewSize;

        if (mask && mask.isVisible()) {

            // At the new container size, the mask might be *causing* the scrollbar, so to find the valid
            // client size to mask, we must temporarily unmask the parent node.
            mask.hide();
            if (maskShim) {
                maskShim.hide();
            }

            viewSize = me.getMaskBox();
            if (maskShim) {
                maskShim.setSize(viewSize);
                maskShim.show();
            }
            mask.setSize(viewSize);
            mask.show();
        }
    },

    /**
     * Registers a floating {@link Ext.Component} with this ZIndexManager. This should not
     * need to be called under normal circumstances. Floating Components (such as Windows,
     * BoundLists and Menus) are automatically registered with a
     * {@link Ext.Component#zIndexManager zIndexManager} at render time.
     *
     * Where this may be useful is moving Windows between two ZIndexManagers. For example,
     * to bring the Ext.MessageBox dialog under the same manager as the Desktop's
     * ZIndexManager in the desktop sample app:
     *
     *     MyDesktop.getDesktop().getManager().register(Ext.MessageBox);
     *
     * @param {Ext.Component} comp The Component to register.
     */
    register : function(comp) {
        var me = this,
            compAfterHide = comp.afterHide;
        
        if (comp.zIndexManager) {
            comp.zIndexManager.unregister(comp);
        }
        comp.zIndexManager = me;

        me.map[comp.id] = comp;
        me.zIndexStack.push(comp);
        
        // Hook into Component's afterHide processing
        comp.afterHide = function() {
            compAfterHide.apply(comp, arguments);
            me.onComponentHide(comp);
        };
    },

    /**
     * Unregisters a {@link Ext.Component} from this ZIndexManager. This should not
     * need to be called. Components are automatically unregistered upon destruction.
     * See {@link #register}.
     * @param {Ext.Component} comp The Component to unregister.
     */
    unregister : function(comp) {
        var me = this,
            map = me.map;
        
        delete comp.zIndexManager;
        if (map && map[comp.id]) {
            delete map[comp.id];
            
            // Relinquish control of Component's afterHide processing
            delete comp.afterHide;
            Ext.Array.remove(me.zIndexStack, comp);

            // Destruction requires that the topmost visible floater be activated. Same as hiding.
            me._activateLast();
        }
    },

    /**
     * Gets a registered Component by id.
     * @param {String/Object} id The id of the Component or a {@link Ext.Component} instance
     * @return {Ext.Component}
     */
    get : function(id) {
        return id.isComponent ? id : this.map[id];
    },

   /**
     * Brings the specified Component to the front of any other active Components in this ZIndexManager.
     * @param {String/Object} comp The id of the Component or a {@link Ext.Component} instance
     * @return {Boolean} True if the dialog was brought to the front, else false
     * if it was already in front
     */
    bringToFront : function(comp, preventFocus) {
        var me = this,
            result = false,
            zIndexStack = me.zIndexStack;
        
        comp = me.get(comp);
        if (comp !== me.front) {
            Ext.Array.remove(zIndexStack, comp);
            if (comp.preventBringToFront) {
                // this takes care of cases where a load mask should be displayed under a floated component
                zIndexStack.unshift(comp);
            } else {
                // the default behavior is to push onto the stack
                zIndexStack.push(comp);
            }

            me.assignZIndices();

            // Activate new topmost
            if (!preventFocus) {
                me._activateLast();
            }
            result = true;
            me.front = comp;
            
            // If new topmost is modal, ensure the mask is there
            if (comp.modal) {
                me._showModalMask(comp);
            }
        }
        return result;
    },

    /**
     * Sends the specified Component to the back of other active Components in this ZIndexManager.
     * @param {String/Object} comp The id of the Component or a {@link Ext.Component} instance
     * @return {Ext.Component} The Component
     */
    sendToBack : function(comp) {
        var me = this;
        
        comp = me.get(comp);
        Ext.Array.remove(me.zIndexStack, comp);
        me.zIndexStack.unshift(comp);
        me.assignZIndices();
        this._activateLast();
        return comp;
    },

    /**
     * Hides all Components managed by this ZIndexManager.
     */
    hideAll : function() {
        var map = this.map,
            item,
            id;
            
        for (id in map) {
            if (map.hasOwnProperty(id)) {
                item = map[id];
                if (item.isComponent && item.isVisible()) {
                    item.hide();
                }
            }
        }
    },

    /**
     * @private
     * Temporarily hides all currently visible managed Components. This is for when
     * dragging a Window which may manage a set of floating descendants in its ZIndexManager;
     * they should all be hidden just for the duration of the drag.
     */
    hide: function() {
        var i = 0,
            stack = this.zIndexStack,
            len = stack.length,
            comp;

        this.tempHidden = [];
        for (; i < len; i++) {
            comp = stack[i];
            if (comp.isVisible()) {
                this.tempHidden.push(comp);
                comp.el.hide();
                comp.hidden = true;
            }
        }
    },

    /**
     * @private
     * Restores temporarily hidden managed Components to visibility.
     */
    show: function() {
        var i = 0,
            tempHidden = this.tempHidden,
            len = tempHidden ? tempHidden.length : 0,
            comp;

        for (; i < len; i++) {
            comp = tempHidden[i];
            comp.el.show();
            comp.hidden = false;
            comp.setPosition(comp.x, comp.y);
        }
        delete this.tempHidden;
    },

    /**
     * Gets the currently-active Component in this ZIndexManager.
     * @return {Ext.Component} The active Component
     */
    getActive : function() {
        return this.front;
    },

    /**
     * Returns zero or more Components in this ZIndexManager using the custom search function passed to this method.
     * The function should accept a single {@link Ext.Component} reference as its only argument and should
     * return true if the Component matches the search criteria, otherwise it should return false.
     * @param {Function} fn The search function
     * @param {Object} [scope] The scope (this reference) in which the function is executed.
     * Defaults to the Component being tested. That gets passed to the function if not specified.
     * @return {Array} An array of zero or more matching windows
     */
    getBy : function(fn, scope) {
        var r = [],
            i = 0,
            stack = this.zIndexStack,
            len = stack.length,
            comp;

        for (; i < len; i++) {
            comp = stack[i];
            if (fn.call(scope||comp, comp) !== false) {
                r.push(comp);
            }
        }
        return r;
    },

    /**
     * Executes the specified function once for every Component in this ZIndexManager, passing each
     * Component as the only parameter. Returning false from the function will stop the iteration.
     * @param {Function} fn The function to execute for each item
     * @param {Object} [scope] The scope (this reference) in which the function
     * is executed. Defaults to the current Component in the iteration.
     */
    each : function(fn, scope) {
        var map = this.map,
            id,
            comp;
            
        for (id in map) {
            if (map.hasOwnProperty(id)) {
                comp = map[id];
                if (comp.isComponent && fn.call(scope || comp, comp) === false) {
                    return;
                }
            }
        }
    },

    /**
     * Executes the specified function once for every Component in this ZIndexManager, passing each
     * Component as the only parameter. Returning false from the function will stop the iteration.
     * The components are passed to the function starting at the bottom and proceeding to the top.
     * @param {Function} fn The function to execute for each item
     * @param {Object} scope (optional) The scope (this reference) in which the function
     * is executed. Defaults to the current Component in the iteration.
     */
    eachBottomUp: function (fn, scope) {
        var stack = this.zIndexStack,
            i = 0,
            len = stack.length,
            comp;

        for (; i < len; i++) {
            comp = stack[i];
            if (comp.isComponent && fn.call(scope || comp, comp) === false) {
                return;
            }
        }
    },

    /**
     * Executes the specified function once for every Component in this ZIndexManager, passing each
     * Component as the only parameter. Returning false from the function will stop the iteration.
     * The components are passed to the function starting at the top and proceeding to the bottom.
     * @param {Function} fn The function to execute for each item
     * @param {Object} [scope] The scope (this reference) in which the function
     * is executed. Defaults to the current Component in the iteration.
     */
    eachTopDown: function (fn, scope) {
        var stack = this.zIndexStack,
            i = stack.length,
            comp;

        for (; i-- > 0; ) {
            comp = stack[i];
            if (comp.isComponent && fn.call(scope || comp, comp) === false) {
                return;
            }
        }
    },

    destroy: function() {
        var me   = this,
            map = me.map,
            comp,
            id;

        for (id in map) {
            if (map.hasOwnProperty(id)) {
                comp = map[id];

                if (comp.isComponent) {
                    comp.destroy();
                }
            }
        }

        Ext.destroy(me.mask);
        Ext.destroy(me.maskShim);
        delete me.zIndexStack;
        delete me.map;
        delete me.container;
        delete me.targetEl;
    }
}, function() {
    /**
     * @class Ext.WindowManager
     * @extends Ext.ZIndexManager
     *
     * The default global floating Component group that is available automatically.
     *
     * This manages instances of floating Components which were rendered programatically without
     * being added to a {@link Ext.container.Container Container}, and for floating Components
     * which were added into non-floating Containers.
     * 
     * *Floating* Containers create their own instance of ZIndexManager, and floating Components
     * added at any depth below there are managed by that ZIndexManager.
     *
     * @singleton
     */
    Ext.WindowManager = Ext.WindowMgr = new this();
});
