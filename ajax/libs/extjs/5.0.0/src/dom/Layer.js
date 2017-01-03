/**
 * An extended {@link Ext.dom.Element} object that supports a shadow, constrain to viewport
 * and automatic maintaining of shadow position.
 */
Ext.define('Ext.dom.Layer', {
    extend: 'Ext.Element',
    uses: ['Ext.Shadow'],
    alternateClassName: 'Ext.Layer',

    /**
     * @cfg {String/Boolean} [shadow=false]
     * True to automatically create an {@link Ext.Shadow}, or a string indicating the
     * shadow's display {@link Ext.Shadow#mode}. False to disable the shadow.
     */

    /**
     * @cfg {Object} [dh={tag: 'div', cls: 'x-layer'}]
     * DomHelper object config to create element with.
     */

    /**
     * @cfg {Boolean} [constrain=true]
     * False to disable constrain to viewport.
     */

    /**
     * @cfg {String} cls
     * CSS class to add to the element
     */

    /**
     * @cfg {Number} [zindex=11000]
     * Starting z-index.
     */

    /**
     * @cfg {Number} [shadowOffset=4]
     * Number of pixels to offset the shadow
     */

    /**
     * @cfg {Boolean} [useDisplay=false]
     * Defaults to use css offsets to hide the Layer. Specify <tt>true</tt>
     * to use css style <tt>'display:none;'</tt> to hide the Layer.
     */

    /**
     * @cfg {String} visibilityCls
     * The CSS class name to add in order to hide this Layer if this layer
     * is configured with <code>{@link #hideMode}: 'asclass'</code>
     */

    /**
     * @cfg {String} hideMode
     * A String which specifies how this Layer will be hidden.
     * Values may be:
     *
     * - `'display'` : The Component will be hidden using the `display: none` style.
     * - `'visibility'` : The Component will be hidden using the `visibility: hidden` style.
     * - `'offsets'` : The Component will be hidden by absolutely positioning it out of the visible area
     *   of the document. This is useful when a hidden Component must maintain measurable dimensions.
     *   Hiding using `display` results in a Component having zero dimensions.
     */

    isLayer: true,

    localXYNames: {
        get: 'getLocalXY',
        set: 'setLocalXY'
    },

    /**
     * Creates new Layer.
     * @param {Object} [config] An object with config options.
     * @param {String/HTMLElement} [existingEl] Uses an existing DOM element.
     * If the element is not found it creates it.
     */
    constructor: function(config, existingEl) {
        config = config || {};
        var me = this,
            dh = Ext.DomHelper,
            cp = config.parentEl,
            pel = cp ? Ext.getDom(cp) : document.body,
            hm = config.hideMode,
            cls = Ext.baseCSSPrefix + (config.fixed ? 'fixed-layer' : 'layer'),
            dom, id, element;

        if (existingEl) {
            dom = Ext.getDom(existingEl);
            if (!dom.parentNode) {
                pel.appendChild(dom);
            }
        }

        if (!dom) {
            dom = dh.append(pel, config.dh || {
                tag: 'div',
                cls: cls // primarily to give el 'position:absolute' or, if fixed, 'position:fixed'
            });
        }

        if (config.id) {
            dom.id = config.id;
        }
        id = dom.id;

        if (id) {
            element = Ext.cache[id];
            if (element) {
                // if we have an existing Ext.Element in the cache for this same dom
                // element, delete it, so that it can be replaced by this layer instance
                // when we callParent below.
                delete Ext.cache[id];
                element.dom = null;
            }
        }
        this.callParent([dom]);

        if (existingEl) {
            me.addCls(cls);
        }
        
        if (config.preventSync) {
            me.preventSync = true;
        }

        if (config.cls) {
            me.addCls(config.cls);
        }
        me.constrain = config.constrain !== false;

        // Allow Components to pass their hide mode down to the Layer if they are floating.
        // Otherwise, allow useDisplay to override the default hiding method which is visibility.
        // TODO: Have ExtJS's Element implement visibilityMode by using classes as in Mobile.
        if (hm) {
            me.setVisibilityMode(Ext.Element[hm.toUpperCase()]);
        } else if (config.useDisplay) {
            me.setVisibilityMode(Ext.Element.DISPLAY);
        } else {
            me.setVisibilityMode(Ext.Element.VISIBILITY);
        }

        if (config.shadow) {
            me.shadowOffset = config.shadowOffset || 4;
            me.shadow = new Ext.Shadow({
                offset: me.shadowOffset,
                mode: config.shadow,
                fixed: config.fixed
            });
            me.disableShadow();
        } else {
            me.shadowOffset = 0;
        }

        // Keep the following only for cases where Ext.Layer would be instantiated
        // directly.  We don't ever pass hidden in the config in the framework
        // since this is handled by the Component lifecycle.
        if (config.hidden === true) {
            me.hide();
        } else if (config.hidden === false) {
            me.show();
        }
    },

    getZIndex: function() {
        return parseInt(this.getStyle('z-index'), 10);
    },

    disableShadow: function() {
        var me = this;
        
        if (me.shadow && !me.shadowDisabled) {
            me.shadowDisabled = true;
            me.shadow.hide();
            me.lastShadowOffset = me.shadowOffset;
            me.shadowOffset = 0;
        }
    },

    enableShadow: function(show) {
        var me = this;
        
        if (me.shadow && me.shadowDisabled) {
            me.shadowDisabled = false;
            me.shadowOffset = me.lastShadowOffset;
            delete me.lastShadowOffset;
            if (show) {
                me.sync(true);
            }
        }
    },

    /**
     * @private
     * Synchronize this Layer's associated elements and shadow.
     *
     * This code can execute repeatedly in milliseconds,
     * eg: dragging a Component configured liveDrag: true, or which has no ghost method
     * so code size was sacrificed for efficiency (e.g. no getBox/setBox, no XY calls)
     *
     * @param {Boolean} doShow Pass true to ensure that the shadow is shown.
     */
    sync: function(doShow) {
        var me = this,
            shadow = me.shadow,
            xy, x, y, w, h;
            
        if (me.preventSync) {
            return;
        }

        if (!me.updating && me.isVisible() && shadow) {
            xy = me[me.localXYNames.get]();
            x = xy[0];
            y = xy[1];
            w = me.dom.offsetWidth;
            h = me.dom.offsetHeight;

            if (shadow && !me.shadowDisabled) {
                if (doShow && !shadow.isVisible()) {
                    shadow.show(me);
                } else {
                    shadow.realign(x, y, w, h);
                }
            }
        }
        return me;
    },

    destroy: function() {
        this.hideUnders();
        this.callParent();
    },

    // @private
    beginUpdate: function() {
        this.updating = true;
    },

    // @private
    endUpdate: function() {
        this.updating = false;
        this.sync(true);
    },

    // @private
    hideUnders: function() {
        if (this.shadow) {
            this.shadow.hide();
        }
    },

    // @private
    constrainXY: function() {
        if (this.constrain) {
            var vw = Ext.Element.getViewportWidth(),
                vh = Ext.Element.getViewportHeight(),
                s = Ext.getDoc().getScroll(),
                xy = this.getXY(),
                x = xy[0],
                y = xy[1],
                so = this.shadowOffset,
                w = this.dom.offsetWidth + so,
                h = this.dom.offsetHeight + so,
                moved = false; // only move it if it needs it
            // first validate right/bottom
            if ((x + w) > vw + s.left) {
                x = vw - w - so;
                moved = true;
            }
            if ((y + h) > vh + s.top) {
                y = vh - h - so;
                moved = true;
            }
            // then make sure top/left isn't negative
            if (x < s.left) {
                x = s.left;
                moved = true;
            }
            if (y < s.top) {
                y = s.top;
                moved = true;
            }
            if (moved) {
                Ext.Layer.superclass.setXY.call(this, [x, y]);
                this.sync();
            }
        }
        return this;
    },

    getConstrainOffset: function() {
        return this.shadowOffset;
    },

    // overridden Element method
    setVisible: function(visible, animate, duration, callback, easing) {
        var me = this,
            cb;

        // post operation processing
        cb = function() {
            if (visible) {
                me.sync(true);
            }
            if (callback) {
                callback();
            }
        };

        // Hide shadow if hiding
        if (!visible) {
            me.hideUnders(true);
        }
        me.callParent([visible, animate, duration, callback, easing]);
        if (!animate) {
            cb();
        }
        return me;
    },

    // @private
    beforeFx: function() {
        this.beforeAction();
        return this.callParent(arguments);
    },

    // @private
    afterFx: function() {
        this.callParent(arguments);
        this.sync(this.isVisible());
    },

    // @private
    beforeAction: function() {
        if (!this.updating && this.shadow) {
            this.shadow.hide();
        }
    },

    // overridden Element method
    setLeft: function(left) {
        this.callParent(arguments);
        return this.sync();
    },

    setTop: function(top) {
        this.callParent(arguments);
        return this.sync();
    },

    setLeftTop: function(left, top) {
        this.callParent(arguments);
        return this.sync();
    },

    setLocalX: function() {
        this.callParent(arguments);
        return this.sync();
    },

    setLocalXY: function() {
        this.callParent(arguments);
        return this.sync();
    },

    setLocalY: function() {
        this.callParent(arguments);
        return this.sync();
    },

    setXY: function(xy, animate, duration, callback, easing) {
        var me = this;
        
        // Callback will restore shadow state and call the passed callback
        callback = me.createCB(callback);

        me.fixDisplay();
        me.beforeAction();
        me.callParent([xy, animate, duration, callback, easing]);
        if (!animate) {
            callback();
        }
        return me;
    },

    // @private
    createCB: function(callback) {
        var me = this,
            showShadow = me.shadow && me.shadow.isVisible();

        return function() {
            me.constrainXY();
            me.sync(showShadow);
            if (callback) {
                callback();
            }
        };
    },

    // overridden Element method
    setX: function(x, animate, duration, callback, easing) {
        this.setXY([x, this.getY()], animate, duration, callback, easing);
        return this;
    },

    // overridden Element method
    setY: function(y, animate, duration, callback, easing) {
        this.setXY([this.getX(), y], animate, duration, callback, easing);
        return this;
    },

    // overridden Element method
    setSize: function(w, h, animate, duration, callback, easing) {
        var me = this;
        
        // Callback will restore shadow state and call the passed callback
        callback = me.createCB(callback);

        me.beforeAction();
        me.callParent([w, h, animate, duration, callback, easing]);
        if (!animate) {
            callback();
        }
        return me;
    },

    // overridden Element method
    setWidth: function(w, animate, duration, callback, easing) {
        var me = this;
        
        // Callback will restore shadow state and call the passed callback
        callback = me.createCB(callback);

        me.beforeAction();
        me.callParent([w, animate, duration, callback, easing]);
        if (!animate) {
            callback();
        }
        return me;
    },

    // overridden Element method
    setHeight: function(h, animate, duration, callback, easing) {
        var me = this;
        
        // Callback will restore shadow state and call the passed callback
        callback = me.createCB(callback);

        me.beforeAction();
        me.callParent([h, animate, duration, callback, easing]);
        if (!animate) {
            callback();
        }
        return me;
    },

    /**
     * Sets the z-index of this layer and adjusts shadow z-index. The layer
     * z-index is automatically incremented depending upon the presence of a
     * shadow in so that it always shows above the shadow.
     *
     * @param {Number} zindex The new z-index to set
     * @return {Ext.Layer} The Layer
     */
    setZIndex: function(zindex) {
        var me = this;
        
        me.zindex = zindex;
        if (me.shadow) {
            me.shadow.setZIndex(zindex);
        }
        return me.setStyle('z-index', zindex);
    },
    
    onOpacitySet: function(opacity){
        var shadow = this.shadow;
        if (shadow) {
            shadow.setOpacity(opacity);
        }
    },

    deprecated: {
        '4.2': {
            // overridden Element method
            setBounds: function(x, y, width, height, animate, duration, callback, easing) {
                var me = this;
                
                // Callback will restore shadow state and call the passed callback
                callback = me.createCB(callback);

                me.beforeAction();
                if (!animate) {
                    Ext.Layer.superclass.setXY.call(me, [x, y]);
                    Ext.Layer.superclass.setSize.call(me, width, height);
                    callback();
                } else {
                    me.callParent([x, y, width, height, animate, duration, callback, easing]);
                }
                return me;
            } 
        }
    }
});
