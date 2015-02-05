/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * An extended {@link Ext.Element} object that supports a shadow and shim, constrain to viewport and
 * automatic maintaining of shadow/shim positions.
 */
Ext.define('Ext.dom.Layer', {
    extend: 'Ext.Element',
    uses: ['Ext.Shadow'],
    alternateClassName: 'Ext.Layer',

    /**
     * @cfg {Boolean} [shim=true]
     * False to disable the iframe shim in browsers which need one.
     */

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

    // shims are shared among layer to keep from having 100 iframes
    statics: {
        shims: []
    },
    
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
            cls = Ext.baseCSSPrefix + (config.fixed && !(Ext.isIE6 || Ext.isIEQuirks) ? 'fixed-layer' : 'layer');

        // set an "el" property that references "this".  This allows
        // Ext.util.Positionable methods to operate on this.el.dom since it
        // gets mixed into both Element and Component
        me.el = me;

        if (existingEl) {
            me.dom = Ext.getDom(existingEl);
        }
        if (!me.dom) {
            me.dom = dh.append(pel, config.dh || {
                tag: 'div',
                cls: cls // primarily to give el 'position:absolute' or, if fixed, 'position:fixed'
            });
        } else {
            me.addCls(cls);
            if (!me.dom.parentNode) {
                pel.appendChild(me.dom);
            }
        }
        
        if (config.preventSync) {
            me.preventSync = true;
        }

        if (config.id) {
            me.id = me.dom.id = config.id;
        } else {
            me.id = Ext.id(me.dom);
        }

        Ext.Element.addToCache(me);

        if (config.cls) {
            me.addCls(config.cls);
        }
        me.constrain = config.constrain !== false;

        // Allow Components to pass their hide mode down to the Layer if they are floating.
        // Otherwise, allow useDisplay to override the default hiding method which is visibility.
        // TODO: Have ExtJS's Element implement visibilityMode by using classes as in Mobile.
        if (hm) {
            me.setVisibilityMode(Ext.Element[hm.toUpperCase()]);
            if (me.visibilityMode == Ext.Element.ASCLASS) {
                me.visibilityCls = config.visibilityCls;
            }
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
        me.useShim = config.shim !== false && Ext.useShims;
        if (config.hidden === true) {
            me.hide();
        } else {
            me.show();
        }
    },

    getZIndex: function() {
        return parseInt((this.getShim() || this).getStyle('z-index'), 10);
    },

    getShim: function() {
        var me = this,
            shim, pn;

        if (!me.useShim) {
            return null;
        }
        if (!me.shim) {
            shim = me.self.shims.shift();
            if (!shim) {
                shim = me.createShim();
                shim.enableDisplayMode('block');
                shim.hide();
            }
            pn = me.dom.parentNode;
            if (shim.dom.parentNode != pn) {
                pn.insertBefore(shim.dom, me.dom);
            }
            me.shim = shim;
        }
        return me.shim;
    },

    hideShim: function() {
        var me = this;
        
        if (me.shim) {
            me.shim.setDisplayed(false);
            me.self.shims.push(me.shim);
            delete me.shim;
        }
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
     * Synchronize this Layer's associated elements, the shadow, and possibly the shim.
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
            shadowPos, shimStyle, shadowSize,
            shim, xy, x, y, w, h, shimIndex;
            
        if (me.preventSync) {
            return;
        }

        if (!me.updating && me.isVisible() && (shadow || me.useShim)) {
            shim = me.getShim();
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
                if (shim) {
                    // TODO: Determine how the shims zIndex is above the layer zIndex at this point
                    shimIndex = shim.getStyle('z-index');
                    if (shimIndex > me.zindex) {
                        me.shim.setStyle('z-index', me.zindex - 2);
                    }
                    shim.show();
                    // fit the shim behind the shadow, so it is shimmed too
                    if (shadow.isVisible()) {
                        shadowPos = shadow.el.getXY();
                        shimStyle = shim.dom.style;
                        shadowSize = shadow.el.getSize();
                        if (Ext.supports.CSS3BoxShadow) {
                            shadowSize.height += 6;
                            shadowSize.width += 4;
                            shadowPos[0] -= 2;
                            shadowPos[1] -= 4;
                        }
                        shimStyle.left = (shadowPos[0]) + 'px';
                        shimStyle.top = (shadowPos[1]) + 'px';
                        shimStyle.width = (shadowSize.width) + 'px';
                        shimStyle.height = (shadowSize.height) + 'px';
                    } else {
                        shim.setSize(w, h);
                        shim[me.localXYNames.set](x, y);
                    }
                }
            } else if (shim) {
                // TODO: Determine how the shims zIndex is above the layer zIndex at this point
                shimIndex = shim.getStyle('z-index');
                if (shimIndex > me.zindex) {
                    me.shim.setStyle('z-index', me.zindex - 2);
                }
                shim.show();
                shim.setSize(w, h);
                shim[me.localXYNames.set](x, y);
            }
        }
        return me;
    },

    remove: function() {
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
        this.hideShim();
    },

    // @private
    constrainXY: function() {
        if (this.constrain) {
            var vw = Ext.Element.getViewWidth(),
                vh = Ext.Element.getViewHeight(),
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

        // Hide shadow and shim if hiding
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
    },

    /**
     * Sets the z-index of this layer and adjusts any shadow and shim z-indexes. The layer
     * z-index is automatically incremented depending upon the presence of a shim or a
     * shadow in so that it always shows above those two associated elements.
     *
     * Any shim, will be assigned the passed z-index. A shadow will be assigned the next
     * highet z-index, and the Layer's element will receive the highest  z-index.
     *
     * @param {Number} zindex The new z-index to set
     * @return {Ext.Layer} The Layer
     */
    setZIndex: function(zindex) {
        var me = this;
        
        me.zindex = zindex;
        if (me.getShim()) {
            me.shim.setStyle('z-index', zindex++);
        }
        if (me.shadow) {
            me.shadow.setZIndex(zindex++);
        }
        return me.setStyle('z-index', zindex);
    },
    
    onOpacitySet: function(opacity){
        var shadow = this.shadow;
        if (shadow) {
            shadow.setOpacity(opacity);
        }
    }
});
