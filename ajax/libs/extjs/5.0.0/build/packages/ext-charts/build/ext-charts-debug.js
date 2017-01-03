/**
 * @class Ext.chart.Callout
 * A mixin providing callout functionality for Ext.chart.series.Series.
 */
Ext.define('Ext.chart.Callout', {

    /* Begin Definitions */

    /* End Definitions */

    constructor: function(config) {
        if (config.callouts) {
            config.callouts.styles = Ext.applyIf(config.callouts.styles || {}, {
                color: "#000",
                font: "11px Helvetica, sans-serif"
            });
            this.callouts = Ext.apply(this.callouts || {}, config.callouts);
            this.calloutsArray = [];
        }
    },

    renderCallouts: function() {
        if (!this.callouts) {
            return;
        }

        var me = this,
            items = me.items,
            animate = me.chart.animate,
            config = me.callouts,
            styles = config.styles,
            group = me.calloutsArray,
            store = me.chart.getChartStore(),
            len = store.getCount(),
            ratio = items.length / len,
            previouslyPlacedCallouts = [],
            i,
            count,
            j,
            p,
            item,
            label,
            storeItem,
            display;
            
        for (i = 0, count = 0; i < len; i++) {
            for (j = 0; j < ratio; j++) {
                item = items[count];
                label = group[count];
                storeItem = store.getAt(i);
                
                display = (!config.filter || config.filter(storeItem));
                
                if (!display && !label) {
                    count++;
                    continue;               
                }
                
                if (!label) {
                    group[count] = label = me.onCreateCallout(storeItem, item, i, display, j, count);
                }
                for (p in label) {
                    if (label[p] && label[p].setAttributes) {
                        label[p].setAttributes(styles, true);
                    }
                }
                if (!display) {
                    for (p in label) {
                        if (label[p]) {
                            if (label[p].setAttributes) {
                                label[p].setAttributes({
                                    hidden: true
                                }, true);
                            } else if(label[p].setVisible) {
                                label[p].setVisible(false);
                            }
                        }
                    }
                }
                if (config && config.renderer) {
                    config.renderer(label, storeItem);
                }
                me.onPlaceCallout(label, storeItem, item, i, display, animate,
                                  j, count, previouslyPlacedCallouts);
                previouslyPlacedCallouts.push(label);
                count++;
            }
        }
        this.hideCallouts(count);
    },

    onCreateCallout: function(storeItem, item, i, display) {
        var me = this,
            group = me.calloutsGroup,
            config = me.callouts,
            styles = (config ? config.styles : undefined),
            width = (styles ? styles.width : 0),
            height = (styles ? styles.height : 0),
            chart = me.chart,
            surface = chart.surface,
            calloutObj = {
                //label: false,
                //box: false,
                lines: false
            };

        calloutObj.lines = surface.add(Ext.apply({},
        {
            type: 'path',
            path: 'M0,0',
            stroke: me.getLegendColor() || '#555'
        },
        styles));

        if (config.items) {
            calloutObj.panel = new Ext.Panel({
                style: "position: absolute;",    
                width: width,
                height: height,
                items: config.items,
                renderTo: chart.el
            });
        }

        return calloutObj;
    },

    hideCallouts: function(index) {
        var calloutsArray = this.calloutsArray,
            len = calloutsArray.length,
            co,
            p;
        while (len-->index) {
            co = calloutsArray[len];
            for (p in co) {
                if (co[p]) {
                    co[p].hide(true);
                }
            }
        }
    }
});

/**
 * A composite Sprite handles a group of sprites with common methods to a sprite
 * such as `hide`, `show`, `setAttributes`. These methods are applied to the set of sprites
 * added to the group.
 *
 * CompositeSprite extends {@link Ext.util.MixedCollection} so you can use the same methods
 * in `MixedCollection` to iterate through sprites, add and remove elements, etc.
 *
 * In order to create a CompositeSprite, one has to provide a handle to the surface where it is
 * rendered:
 *
 *     var group = Ext.create('Ext.draw.CompositeSprite', {
 *         surface: drawComponent.surface
 *     });
 *                  
 * Then just by using `MixedCollection` methods it's possible to add {@link Ext.draw.Sprite}s:
 *  
 *     group.add(sprite1);
 *     group.add(sprite2);
 *     group.add(sprite3);
 *                  
 * And then apply common Sprite methods to them:
 *  
 *     group.setAttributes({
 *         fill: '#f00'
 *     }, true);
 */
Ext.define('Ext.draw.CompositeSprite', {

    /* Begin Definitions */

    extend: 'Ext.util.MixedCollection',
    mixins: {
        animate: 'Ext.util.Animate'
    },
    autoDestroy: false,
    
    /* End Definitions */
    isCompositeSprite: true,

    /**
     * @event
     * @inheritdoc Ext.draw.Sprite#mousedown
     */

    /**
     * @event
     * @inheritdoc Ext.draw.Sprite#mouseup
     */

    /**
     * @event
     * @inheritdoc Ext.draw.Sprite#mouseover
     */

    /**
     * @event
     * @inheritdoc Ext.draw.Sprite#mouseout
     */

    /**
     * @event
     * @inheritdoc Ext.draw.Sprite#click
     */

    constructor: function(config) {
        var me = this;
        
        Ext.apply(me, config);

        me.id = Ext.id(null, 'ext-sprite-group-');
        me.callParent();
    },

    // @private
    onClick: function(e) {
        this.fireEvent('click', e);
    },

    // @private
    onMouseUp: function(e) {
        this.fireEvent('mouseup', e);
    },

    // @private
    onMouseDown: function(e) {
        this.fireEvent('mousedown', e);
    },

    // @private
    onMouseOver: function(e) {
        this.fireEvent('mouseover', e);
    },

    // @private
    onMouseOut: function(e) {
        this.fireEvent('mouseout', e);
    },

    attachEvents: function(o) {
        var me = this;
        
        o.on({
            scope: me,
            mousedown: me.onMouseDown,
            mouseup: me.onMouseUp,
            mouseover: me.onMouseOver,
            mouseout: me.onMouseOut,
            click: me.onClick
        });
    },

    // Inherit docs from MixedCollection
    add: function(key, o) {
        var result = this.callParent(arguments);
        this.attachEvents(result);
        return result;
    },

    insert: function(index, key, o) {
        return this.callParent(arguments);
    },

    // Inherit docs from MixedCollection
    remove: function(o) {
        var me = this;
        
        o.un({
            scope: me,
            mousedown: me.onMouseDown,
            mouseup: me.onMouseUp,
            mouseover: me.onMouseOver,
            mouseout: me.onMouseOut,
            click: me.onClick
        });
        return me.callParent(arguments);
    },
    
    /**
     * Returns the group bounding box.
     * Behaves like {@link Ext.draw.Sprite#getBBox} method.
     * @return {Object} an object with x, y, width, and height properties.
     */
    getBBox: function() {
        var i = 0,
            sprite,
            bb,
            items = this.items,
            len = this.length,
            infinity = Infinity,
            minX = infinity,
            maxHeight = -infinity,
            minY = infinity,
            maxWidth = -infinity,
            maxWidthBBox, maxHeightBBox;
        
        for (; i < len; i++) {
            sprite = items[i];
            if (sprite.el && ! sprite.bboxExcluded) {
                bb = sprite.getBBox();
                minX = Math.min(minX, bb.x);
                minY = Math.min(minY, bb.y);
                maxHeight = Math.max(maxHeight, bb.height + bb.y);
                maxWidth = Math.max(maxWidth, bb.width + bb.x);
            }
        }
        
        return {
            x: minX,
            y: minY,
            height: maxHeight - minY,
            width: maxWidth - minX
        };
    },

    /**
     * Iterates through all sprites calling `setAttributes` on each one. For more information {@link Ext.draw.Sprite}
     * provides a description of the attributes that can be set with this method.
     * @param {Object} attrs Attributes to be changed on the sprite.
     * @param {Boolean} redraw Flag to immediately draw the change.
     * @return {Ext.draw.CompositeSprite} this
     */
    setAttributes: function(attrs, redraw) {
        var i = 0,
            items = this.items,
            len = this.length;
            
        for (; i < len; i++) {
            items[i].setAttributes(attrs, redraw);
        }
        return this;
    },

    /**
     * Hides all sprites. If `true` is passed then a redraw will be forced for each sprite.
     * @param {Boolean} redraw Flag to immediately draw the change.
     * @return {Ext.draw.CompositeSprite} this
     */
    hide: function(redraw) {
        var i = 0,
            items = this.items,
            len = this.length;
            
        for (; i < len; i++) {
            items[i].hide(redraw);
        }
        return this;
    },

    /**
     * Shows all sprites. If `true` is passed then a redraw will be forced for each sprite.
     * @param {Boolean} redraw Flag to immediately draw the change.
     * @return {Ext.draw.CompositeSprite} this
     */
    show: function(redraw) {
        var i = 0,
            items = this.items,
            len = this.length;
            
        for (; i < len; i++) {
            items[i].show(redraw);
        }
        return this;
    },

    /**
     * Force redraw of all sprites.
     */
    redraw: function() {
        var me = this,
            i = 0,
            items = me.items,
            surface = me.getSurface(),
            len = me.length;
        
        if (surface) {
            for (; i < len; i++) {
                surface.renderItem(items[i]);
            }
        }
        return me;
    },

    /**
     * Sets style for all sprites.
     * @param {String} style CSS Style definition.
     */
    setStyle: function(obj) {
        var i = 0,
            items = this.items,
            len = this.length,
            item, el;
            
        for (; i < len; i++) {
            item = items[i];
            el = item.el;
            if (el) {
                el.setStyle(obj);
            }
        }
    },

    /**
     * Adds class to all sprites.
     * @param {String} cls CSS class name
     */
    addCls: function(obj) {
        var i = 0,
            items = this.items,
            surface = this.getSurface(),
            len = this.length;
        
        if (surface) {
            for (; i < len; i++) {
                surface.addCls(items[i], obj);
            }
        }
    },

    /**
     * Removes class from all sprites.
     * @param {String} cls CSS class name
     */
    removeCls: function(obj) {
        var i = 0,
            items = this.items,
            surface = this.getSurface(),
            len = this.length;
        
        if (surface) {
            for (; i < len; i++) {
                surface.removeCls(items[i], obj);
            }
        }
    },
    
    /**
     * Grab the surface from the items
     * @private
     * @return {Ext.draw.Surface} The surface, null if not found
     */
    getSurface: function(){
        var first = this.first();
        if (first) {
            return first.surface;
        }
        return null;
    },
    
    /**
     * Destroys this CompositeSprite.
     */
    destroy: function(){
        var me = this,
            surface = me.getSurface(),
            destroySprites = me.autoDestroy,
            item;
            
        if (surface) {
            while (me.getCount() > 0) {
                item = me.first();
                me.remove(item);
                surface.remove(item, destroySprites);
            }
        }
        me.clearListeners();
    }
});

/**
 * A Surface is an interface to render methods inside {@link Ext.draw.Component}.
 *
 * Most of the Surface methods are abstract and they have a concrete implementation
 * in {@link Ext.draw.engine.Vml VML} or {@link Ext.draw.engine.Svg SVG} engines.
 *
 * A Surface contains methods to render {@link Ext.draw.Sprite sprites}, get bounding
 * boxes of sprites, add sprites to the canvas, initialize other graphic components, etc.
 *
 * ## Adding sprites to surface
 *
 * One of the most used methods for this class is the {@link #add} method, to add Sprites to
 * the surface. For example:
 *
 *     drawComponent.surface.add({
 *         type: 'circle',
 *         fill: '#ffc',
 *         radius: 100,
 *         x: 100,
 *         y: 100
 *     });
 *
 * The configuration object passed in the `add` method is the same as described in the
 * {@link Ext.draw.Sprite} class documentation.
 *
 * Sprites can also be added to surface by setting their surface config at creation time:
 *
 *     var sprite = Ext.create('Ext.draw.Sprite', {
 *         type: 'circle',
 *         fill: '#ff0',
 *         surface: drawComponent.surface,
 *         radius: 5
 *     });
 *
 * In order to properly apply properties and render the sprite we have to
 * `show` the sprite setting the option `redraw` to `true`:
 *
 *     sprite.show(true);
 *
 */
Ext.define('Ext.draw.Surface', {

    /* Begin Definitions */

    mixins: {
        observable: 'Ext.util.Observable'
    },

    requires: ['Ext.draw.CompositeSprite'],
    uses: ['Ext.draw.engine.Svg', 'Ext.draw.engine.Vml', 'Ext.draw.engine.SvgExporter', 'Ext.draw.engine.ImageExporter'],

    separatorRe: /[, ]+/,
    
    enginePriority: ['Svg', 'Vml'],

    statics: {
        /**
         * Creates and returns a new concrete Surface instance appropriate for the current environment.
         * @param {Object} config Initial configuration for the Surface instance
         * @param {String[]} enginePriority (Optional) order of implementations to use; the first one that is
         * available in the current environment will be used. Defaults to `['Svg', 'Vml']`.
         * @return {Object} The created Surface or false.
         * @static
         */
        create: function(config, enginePriority) {
            enginePriority = enginePriority || this.prototype.enginePriority;

            var i = 0,
                len = enginePriority.length;

            for (; i < len; i++) {
                if (Ext.supports[enginePriority[i]]) {
                    return Ext.create('Ext.draw.engine.' + enginePriority[i], config);
                }
            }
            return false;
        },
        
        /**
         * Exports a {@link Ext.draw.Surface surface} in a different format.
         * The surface may be exported to an SVG string, using the
         * {@link Ext.draw.engine.SvgExporter}. It may also be exported
         * as an image using the {@link Ext.draw.engine.ImageExporter ImageExporter}.
         * Note that this requires sending data to a remote server to process
         * the SVG into an image, see the {@link Ext.draw.engine.ImageExporter} for
         * more details.
         * @param {Ext.draw.Surface} surface The surface to export.
         * @param {Object} [config] The configuration to be passed to the exporter.
         * See the export method for the appropriate exporter for the relevant
         * configuration options
         * @return {Object} See the return types for the appropriate exporter
         * @static
         */
        save: function(surface, config) {
            config = config || {};
            var exportTypes = {
                    'image/png': 'Image',
                    'image/jpeg': 'Image',
                    'image/svg+xml': 'Svg'
                },
                prefix = exportTypes[config.type] || 'Svg',
                exporter = Ext.draw.engine[prefix + 'Exporter'];           

            return exporter.generate(surface, config);
            
        }
    },

    /* End Definitions */

    // @private
    availableAttrs: {
        blur: 0,
        "clip-rect": "0 0 1e9 1e9",
        cursor: "default",
        cx: 0,
        cy: 0,
        'dominant-baseline': 'auto',
        fill: "none",
        "fill-opacity": 1,
        font: '10px "Arial"',
        "font-family": '"Arial"',
        "font-size": "10",
        "font-style": "normal",
        "font-weight": 400,
        gradient: "",
        height: 0,
        hidden: false,
        href: "http://sencha.com/",
        opacity: 1,
        path: "M0,0",
        radius: 0,
        rx: 0,
        ry: 0,
        scale: "1 1",
        src: "",
        stroke: "none",
        "stroke-dasharray": "",
        "stroke-linecap": "butt",
        "stroke-linejoin": "butt",
        "stroke-miterlimit": 0,
        "stroke-opacity": 1,
        "stroke-width": 1,
        target: "_blank",
        text: "",
        "text-anchor": "middle",
        title: "Ext Draw",
        width: 0,
        x: 0,
        y: 0,
        zIndex: 0
    },

    /**
     * @cfg {Number} height
     * The height of this component in pixels (defaults to auto).
     */
    /**
     * @cfg {Number} width
     * The width of this component in pixels (defaults to auto).
     */

    container: undefined,
    height: 352,
    width: 512,
    x: 0,
    y: 0,

    /**
     * @cfg {Ext.draw.Sprite[]} items
     * Array of sprites or sprite config objects to add initially to the surface.
     */

    /**
     * @private Flag indicating that the surface implementation requires sprites to be maintained
     * in order of their zIndex. Impls that don't require this can set it to false.
     */
    orderSpritesByZIndex: true,

    /**
     * @event
     * Fires when a mousedown is detected within the surface.
     * @param {Ext.EventObject} e An object encapsulating the DOM event.
     */

    /**
     * @event
     * Fires when a mouseup is detected within the surface.
     * @param {Ext.EventObject} e An object encapsulating the DOM event.
     */

    /**
     * @event
     * Fires when a mouseover is detected within the surface.
     * @param {Ext.EventObject} e An object encapsulating the DOM event.
     */

    /**
     * @event
     * Fires when a mouseout is detected within the surface.
     * @param {Ext.EventObject} e An object encapsulating the DOM event.
     */

    /**
     * @event
     * Fires when a mousemove is detected within the surface.
     * @param {Ext.EventObject} e An object encapsulating the DOM event.
     */

    /**
     * @event
     * Fires when a mouseenter is detected within the surface.
     * @param {Ext.EventObject} e An object encapsulating the DOM event.
     */

    /**
     * @event
     * Fires when a mouseleave is detected within the surface.
     * @param {Ext.EventObject} e An object encapsulating the DOM event.
     */

    /**
     * @event
     * Fires when a click is detected within the surface.
     * @param {Ext.EventObject} e An object encapsulating the DOM event.
     */

    /**
     * @event
     * Fires when a dblclick is detected within the surface.
     * @param {Ext.EventObject} e An object encapsulating the DOM event.
     */

    /**
     * Creates new Surface.
     * @param {Object} config (optional) Config object.
     */
    constructor: function(config) {
        var me = this;
        config = config || {};
        Ext.apply(me, config);

        me.domRef = Ext.getDoc().dom;

        me.customAttributes = {};

        me.mixins.observable.constructor.call(me);

        me.getId();
        me.initGradients();
        me.initItems();
        if (me.renderTo) {
            me.render(me.renderTo);
            delete me.renderTo;
        }
        me.initBackground(config.background);
    },

    // @private called to initialize components in the surface
    // this is dependent on the underlying implementation.
    initSurface: Ext.emptyFn,

    // @private called to setup the surface to render an item
    //this is dependent on the underlying implementation.
    renderItem: Ext.emptyFn,

    // @private
    renderItems: Ext.emptyFn,

    // @private
    setViewBox: function (x, y, width, height) {
        if (isFinite(x) && isFinite(y) && isFinite(width) && isFinite(height)) {
            this.viewBox = {x: x, y: y, width: width, height: height};
            this.applyViewBox();
        }
    },

    /**
     * Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.
     *
     * For example:
     *
     *     drawComponent.surface.addCls(sprite, 'x-visible');
     *
     * @param {Object} sprite The sprite to add the class to.
     * @param {String/String[]} className The CSS class to add, or an array of classes
     * @method
     */
    addCls: Ext.emptyFn,

    /**
     * Removes one or more CSS classes from the element.
     *
     * For example:
     *
     *     drawComponent.surface.removeCls(sprite, 'x-visible');
     *
     * @param {Object} sprite The sprite to remove the class from.
     * @param {String/String[]} className The CSS class to remove, or an array of classes
     * @method
     */
    removeCls: Ext.emptyFn,

    /**
     * Sets CSS style attributes to an element.
     *
     * For example:
     *
     *     drawComponent.surface.setStyle(sprite, {
     *         'cursor': 'pointer'
     *     });
     *
     * @param {Object} sprite The sprite to add, or an array of classes to
     * @param {Object} styles An Object with CSS styles.
     * @method
     */
    setStyle: Ext.emptyFn,

    // @private
    initGradients: function() {
        if (this.hasOwnProperty('gradients')) {
            var gradients = this.gradients,
                fn = this.addGradient,
                g, gLen;

            if (gradients) {
                for (g = 0, gLen = gradients.length; g < gLen; g++) {
                    if (fn.call(this, gradients[g], g, gLen) === false) {
                        break;
                    }
                }
            }
        }
    },

    // @private
    initItems: function() {
        var items = this.items;
        this.items = new Ext.draw.CompositeSprite();
        this.items.autoDestroy = true;
        this.groups = new Ext.draw.CompositeSprite();
        if (items) {
            this.add(items);
        }
    },

    // @private
    initBackground: function(config) {
        var me = this,
            width = me.width,
            height = me.height,
            gradientId, gradient;
        if (Ext.isString(config)) {
            config = {
                fill : config
            };
        }
        if (config) {
            if (config.gradient) {
                gradient = config.gradient;
                gradientId = gradient.id;
                me.addGradient(gradient);
                me.background = me.add({
                    type: 'rect',
                    isBackground: true,
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    fill: 'url(#' + gradientId + ')',
                    zIndex: -1
                });
            } else if (config.fill) {
                me.background = me.add({
                    type: 'rect',
                    isBackground: true,
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    fill: config.fill,
                    zIndex: -1
                });
            } else if (config.image) {
                me.background = me.add({
                    type: 'image',
                    isBackground: true,
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    src: config.image,
                    zIndex: -1
                });
            }
            // prevent me.background to jeopardize me.items.getBBox
            me.background.bboxExcluded = true;
        }
    },

    /**
     * Sets the size of the surface. Accomodates the background (if any) to fit the new size too.
     *
     * For example:
     *
     *     drawComponent.surface.setSize(500, 500);
     *
     * This method is generally called when also setting the size of the draw Component.
     *
     * @param {Number} w The new width of the canvas.
     * @param {Number} h The new height of the canvas.
     */
    setSize: function(w, h) {
        this.applyViewBox();
    },

    // @private
    scrubAttrs: function(sprite) {
        var i,
            attrs = {},
            exclude = {},
            sattr = sprite.attr;
        for (i in sattr) {
            // Narrow down attributes to the main set
            if (this.translateAttrs.hasOwnProperty(i)) {
                // Translated attr
                attrs[this.translateAttrs[i]] = sattr[i];
                exclude[this.translateAttrs[i]] = true;
            }
            else if (this.availableAttrs.hasOwnProperty(i) && !exclude[i]) {
                // Passtrhough attr
                attrs[i] = sattr[i];
            }
        }
        return attrs;
    },

    // @private
    onClick: function(e) {
        this.processEvent('click', e);
    },
    
    // @private
    onDblClick: function(e) {
        this.processEvent('dblclick', e);
    },

    // @private
    onMouseUp: function(e) {
        this.processEvent('mouseup', e);
    },

    // @private
    onMouseDown: function(e) {
        this.processEvent('mousedown', e);
    },

    // @private
    onMouseOver: function(e) {
        this.processEvent('mouseover', e);
    },

    // @private
    onMouseOut: function(e) {
        this.processEvent('mouseout', e);
    },

    // @private
    onMouseMove: function(e) {
        this.fireEvent('mousemove', e);
    },

    // @private
    onMouseEnter: Ext.emptyFn,

    // @private
    onMouseLeave: Ext.emptyFn,

    /**
     * Adds a gradient definition to the Surface. Note that in some surface engines, adding
     * a gradient via this method will not take effect if the surface has already been rendered.
     * Therefore, it is preferred to pass the gradients as an item to the surface config, rather
     * than calling this method, especially if the surface is rendered immediately (e.g. due to
     * 'renderTo' in its config). For more information on how to create gradients in the Chart
     * configuration object please refer to {@link Ext.chart.Chart}.
     *
     * The gradient object to be passed into this method is composed by:
     *
     * - **id** - string - The unique name of the gradient.
     * - **angle** - number, optional - The angle of the gradient in degrees.
     * - **stops** - object - An object with numbers as keys (from 0 to 100) and style objects as values.
     *
     * For example:
     *
     *    drawComponent.surface.addGradient({
     *        id: 'gradientId',
     *        angle: 45,
     *        stops: {
     *            0: {
     *                color: '#555'
     *            },
     *            100: {
     *                color: '#ddd'
     *            }
     *        }
     *    });
     *
     * @param {Object} gradient A gradient config.
     * @method
     */
    addGradient: Ext.emptyFn,

    /**
     * Adds a Sprite to the surface. See {@link Ext.draw.Sprite} for the configuration object to be
     * passed into this method.
     *
     * For example:
     *
     *     drawComponent.surface.add({
     *         type: 'circle',
     *         fill: '#ffc',
     *         radius: 100,
     *         x: 100,
     *         y: 100
     *     });
     *
     * @param {Ext.draw.Sprite[]/Ext.draw.Sprite...} args One or more Sprite objects or configs.
     * @return {Ext.draw.Sprite[]/Ext.draw.Sprite} The sprites added.
     */
    add: function() {
        var args = Array.prototype.slice.call(arguments),
            sprite,
            hasMultipleArgs = args.length > 1,
            items,
            results,
            i,
            ln,
            item;
            
        if (hasMultipleArgs || Ext.isArray(args[0])) {
            items = hasMultipleArgs ? args : args[0];
            results = [];

            for (i = 0, ln = items.length; i < ln; i++) {
                item = items[i];
                item = this.add(item);
                results.push(item);
            }

            return results;
        }
        sprite = this.prepareItems(args[0], true)[0];
        this.insertByZIndex(sprite);
        this.onAdd(sprite);
        return sprite;
    },

    /**
     * @private
     * Inserts a given sprite into the correct position in the items collection, according to
     * its zIndex. It will be inserted at the end of an existing series of sprites with the same or
     * lower zIndex. By ensuring sprites are always ordered, this allows surface subclasses to render
     * the sprites in the correct order for proper z-index stacking.
     * @param {Ext.draw.Sprite} sprite
     * @return {Number} the sprite's new index in the list
     */
    insertByZIndex: function(sprite) {
        var me = this,
            sprites = me.items.items,
            len = sprites.length,
            ceil = Math.ceil,
            zIndex = sprite.attr.zIndex,
            idx = len,
            high = idx - 1,
            low = 0,
            otherZIndex;

        if (me.orderSpritesByZIndex && len && zIndex < sprites[high].attr.zIndex) {
            // Find the target index via a binary search for speed
            while (low <= high) {
                idx = ceil((low + high) / 2);
                otherZIndex = sprites[idx].attr.zIndex;
                if (otherZIndex > zIndex) {
                    high = idx - 1;
                }
                else if (otherZIndex < zIndex) {
                    low = idx + 1;
                }
                else {
                    break;
                }
            }
            // Step forward to the end of a sequence of the same or lower z-index
            while (idx < len && sprites[idx].attr.zIndex <= zIndex) {
                idx++;
            }
        }

        me.items.insert(idx, sprite);
        return idx;
    },

    onAdd: function(sprite) {
        var group = sprite.group,
            draggable = sprite.draggable,
            groups, ln, i;
        if (group) {
            groups = [].concat(group);
            ln = groups.length;
            for (i = 0; i < ln; i++) {
                group = groups[i];
                this.getGroup(group).add(sprite);
            }
            delete sprite.group;
        }
        if (draggable) {
            sprite.initDraggable();
        }
    },

    /**
     * Removes a given sprite from the surface, optionally destroying the sprite in the process.
     * You can also call the sprite own `remove` method.
     *
     * For example:
     *
     *     drawComponent.surface.remove(sprite);
     *     //or...
     *     sprite.remove();
     *
     * @param {Ext.draw.Sprite} sprite
     * @param {Boolean} destroySprite
     */
    remove: function(sprite, destroySprite) {
        if (sprite) {
            this.items.remove(sprite);

            var groups = [].concat(this.groups.items),
                gLen   = groups.length,
                g;

            for (g = 0; g < gLen; g++) {
                groups[g].remove(sprite);
            }

            sprite.onRemove();
            if (destroySprite === true) {
                sprite.destroy();
            }
        }
    },

    /**
     * Removes all sprites from the surface, optionally destroying the sprites in the process.
     *
     * For example:
     *
     *     drawComponent.surface.removeAll();
     *
     * @param {Boolean} destroySprites Whether to destroy all sprites when removing them.
     */
    removeAll: function(destroySprites) {
        var items = this.items.items,
            ln = items.length,
            i;
        for (i = ln - 1; i > -1; i--) {
            this.remove(items[i], destroySprites);
        }
    },

    onRemove: Ext.emptyFn,

    onDestroy: Ext.emptyFn,

    /**
     * @private Using the current viewBox property and the surface's width and height, calculate the
     * appropriate viewBoxShift that will be applied as a persistent transform to all sprites.
     */
    applyViewBox: function() {
        var me = this,
            viewBox = me.viewBox,
            width = me.width || 1, // Avoid problems in division
            height = me.height || 1,
            viewBoxX, viewBoxY, viewBoxWidth, viewBoxHeight,
            relativeHeight, relativeWidth, size;

        if (viewBox && (width || height)) {
            viewBoxX = viewBox.x;
            viewBoxY = viewBox.y;
            viewBoxWidth = viewBox.width;
            viewBoxHeight = viewBox.height;
            relativeHeight = height / viewBoxHeight;
            relativeWidth = width / viewBoxWidth;
            size = Math.min(relativeWidth, relativeHeight);

            if (viewBoxWidth * size < width) {
                viewBoxX -= (width - viewBoxWidth * size) / 2 / size;
            }
            if (viewBoxHeight * size < height) {
                viewBoxY -= (height - viewBoxHeight * size) / 2 / size;
            }

            me.viewBoxShift = {
                dx: -viewBoxX,
                dy: -viewBoxY,
                scale: size
            };
            
            if (me.background) {
                me.background.setAttributes(Ext.apply({}, {
                    x: viewBoxX,
                    y: viewBoxY,
                    width: width / size,
                    height: height / size
                }, { hidden: false }), true);
            }
        } else {
            if (me.background && width && height) {
                me.background.setAttributes(Ext.apply({x: 0, y: 0, width: width, height: height}, { hidden: false }), true);
            }
        }
    },


    getBBox: function (sprite, isWithoutTransform) {
        var realPath = this["getPath" + sprite.type](sprite);
        if (isWithoutTransform) {
            sprite.bbox.plain = sprite.bbox.plain || Ext.draw.Draw.pathDimensions(realPath);
            return sprite.bbox.plain;
        }
        if (sprite.dirtyTransform) {
            this.applyTransformations(sprite, true);
        }
        sprite.bbox.transform = sprite.bbox.transform || Ext.draw.Draw.pathDimensions(Ext.draw.Draw.mapPath(realPath, sprite.matrix));
        return sprite.bbox.transform;
    },
    
    transformToViewBox: function (x, y) {
        if (this.viewBoxShift) {
            var me = this, shift = me.viewBoxShift;
            return [x / shift.scale - shift.dx, y / shift.scale - shift.dy];
        } else {
            return [x, y];
        }
    },

    // @private
    applyTransformations: function(sprite, onlyMatrix) {
        if (sprite.type == 'text') {
            // TODO: getTextBBox function always take matrix into account no matter whether `isWithoutTransform` is true. Fix that.
            sprite.bbox.transform = 0;
            this.transform(sprite, false);
        }


        sprite.dirtyTransform = false;
        
        var me = this,
            attr = sprite.attr;

        if (attr.translation.x != null || attr.translation.y != null) {
            me.translate(sprite);
        }
        if (attr.scaling.x != null || attr.scaling.y != null) {
            me.scale(sprite);
        }
        if (attr.rotation.degrees != null) {
            me.rotate(sprite);
        }
        
        sprite.bbox.transform = 0;
        this.transform(sprite, onlyMatrix);
        sprite.transformations = [];
    },

    // @private
    rotate: function (sprite) {
        var bbox,
            deg = sprite.attr.rotation.degrees,
            centerX = sprite.attr.rotation.x,
            centerY = sprite.attr.rotation.y;
        if (!Ext.isNumber(centerX) || !Ext.isNumber(centerY)) {
            bbox = this.getBBox(sprite, true);
            centerX = !Ext.isNumber(centerX) ? bbox.x + bbox.width / 2 : centerX;
            centerY = !Ext.isNumber(centerY) ? bbox.y + bbox.height / 2 : centerY;
        }
        sprite.transformations.push({
            type: "rotate",
            degrees: deg,
            x: centerX,
            y: centerY
        });
    },

    // @private
    translate: function(sprite) {
        var x = sprite.attr.translation.x || 0,
            y = sprite.attr.translation.y || 0;
        sprite.transformations.push({
            type: "translate",
            x: x,
            y: y
        });
    },

    // @private
    scale: function(sprite) {
        var bbox,
            x = sprite.attr.scaling.x || 1,
            y = sprite.attr.scaling.y || 1,
            centerX = sprite.attr.scaling.centerX,
            centerY = sprite.attr.scaling.centerY;

        if (!Ext.isNumber(centerX) || !Ext.isNumber(centerY)) {
            bbox = this.getBBox(sprite, true);
            centerX = !Ext.isNumber(centerX) ? bbox.x + bbox.width / 2 : centerX;
            centerY = !Ext.isNumber(centerY) ? bbox.y + bbox.height / 2 : centerY;
        }
        sprite.transformations.push({
            type: "scale",
            x: x,
            y: y,
            centerX: centerX,
            centerY: centerY
        });
    },

    // @private
    rectPath: function (x, y, w, h, r) {
        if (r) {
            return [["M", x + r, y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]];
        }
        return [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
    },

    // @private
    ellipsePath: function (x, y, rx, ry) {
        if (ry == null) {
            ry = rx;
        }
        return [["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]];
    },

    // @private
    getPathpath: function (el) {
        return el.attr.path;
    },

    // @private
    getPathcircle: function (el) {
        var a = el.attr;
        return this.ellipsePath(a.x, a.y, a.radius, a.radius);
    },

    // @private
    getPathellipse: function (el) {
        var a = el.attr;
        return this.ellipsePath(a.x, a.y,
                                a.radiusX || (a.width / 2) || 0,
                                a.radiusY || (a.height / 2) || 0);
    },

    // @private
    getPathrect: function (el) {
        var a = el.attr;
        return this.rectPath(a.x || 0, a.y || 0, a.width || 0, a.height || 0, a.r || 0);
    },

    // @private
    getPathimage: function (el) {
        var a = el.attr;
        return this.rectPath(a.x || 0, a.y || 0, a.width, a.height);
    },

    // @private
    getPathtext: function (el) {
        var bbox = this.getBBoxText(el);
        return this.rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
    },

    createGroup: function(id) {
        var group = this.groups.get(id);
        if (!group) {
            group = new Ext.draw.CompositeSprite({
                surface: this
            });
            group.id = id || Ext.id(null, 'ext-surface-group-');
            this.groups.add(group);
        }
        return group;
    },

    /**
     * Returns a new group or an existent group associated with the current surface.
     * The group returned is a {@link Ext.draw.CompositeSprite} group.
     *
     * For example:
     *
     *     var spriteGroup = drawComponent.surface.getGroup('someGroupId');
     *
     * @param {String} id The unique identifier of the group.
     * @return {Object} The {@link Ext.draw.CompositeSprite}.
     */
    getGroup: function(id) {
        var group;
        if (typeof id == "string") {
            group = this.groups.get(id);
            if (!group) {
                group = this.createGroup(id);
            }
        } else {
            group = id;
        }
        return group;
    },

    // @private
    prepareItems: function(items, applyDefaults) {
        items = [].concat(items);
        // Make sure defaults are applied and item is initialized
        var item, i, ln;
        for (i = 0, ln = items.length; i < ln; i++) {
            item = items[i];
            if (!(item instanceof Ext.draw.Sprite)) {
                // Temporary, just take in configs...
                item.surface = this;
                items[i] = this.createItem(item);
            } else {
                item.surface = this;
            }
        }
        return items;
    },

    /**
     * Changes the text in the sprite element. The sprite must be a `text` sprite.
     * This method can also be called from {@link Ext.draw.Sprite}.
     *
     * For example:
     *
     *     var spriteGroup = drawComponent.surface.setText(sprite, 'my new text');
     *
     * @param {Object} sprite The Sprite to change the text.
     * @param {String} text The new text to be set.
     * @method
     */
    setText: Ext.emptyFn,

    // @private Creates an item and appends it to the surface. Called
    // as an internal method when calling `add`.
    createItem: Ext.emptyFn,

    /**
     * Retrieves the id of this component.
     * Will autogenerate an id if one has not already been set.
     */
    getId: function() {
        return this.id || (this.id = Ext.id(null, 'ext-surface-'));
    },

    /**
     * Destroys the surface. This is done by removing all components from it and
     * also removing its reference to a DOM element.
     *
     * For example:
     *
     *      drawComponent.surface.destroy();
     */
    destroy: function() {
        var me = this;
        delete me.domRef;
        if (me.background) {
            me.background.destroy();
        }
        me.removeAll(true);
        Ext.destroy(me.groups.items);
    }
});

/**
 * @private
 */

Ext.define('Ext.draw.layout.Component', {

    /* Begin Definitions */

    alias: 'layout.draw',

    extend: 'Ext.layout.component.Auto',

    setHeightInDom: true,

    setWidthInDom: true,

    /* End Definitions */

    type: 'draw',
    
    measureContentWidth : function (ownerContext) {
        var target = ownerContext.target,
            paddingInfo = ownerContext.getPaddingInfo(),
            bbox = this.getBBox(ownerContext);
            
        if (!target.viewBox) {
            if (target.autoSize) {
                return bbox.width + paddingInfo.width;
            } else {
                return bbox.x + bbox.width + paddingInfo.width;
            }
        } else {
            if (ownerContext.heightModel.shrinkWrap) {
                return paddingInfo.width;
            } else {
                return bbox.width / bbox.height * (ownerContext.getProp('contentHeight') - paddingInfo.height) + paddingInfo.width;
            }
        }
    },
    
    measureContentHeight : function (ownerContext) {
        var target = ownerContext.target,
            paddingInfo = ownerContext.getPaddingInfo(),
            bbox = this.getBBox(ownerContext);
            
        if (!ownerContext.target.viewBox) {
            if (target.autoSize) {
                return bbox.height + paddingInfo.height;
            } else {
                return bbox.y + bbox.height + paddingInfo.height;
            }
        } else {
            if (ownerContext.widthModel.shrinkWrap) {
                return paddingInfo.height;
            } else {
                return bbox.height / bbox.width * (ownerContext.getProp('contentWidth') - paddingInfo.width) + paddingInfo.height;
            }
        }
    },
    
    getBBox: function(ownerContext) {
        var bbox = ownerContext.surfaceBBox;
        if (!bbox) {
            bbox = ownerContext.target.surface.items.getBBox();
            // If the surface is empty, we'll get these values, normalize them
            if (bbox.width === -Infinity && bbox.height === -Infinity) {
                bbox.width = bbox.height = bbox.x = bbox.y = 0;
            }
            ownerContext.surfaceBBox = bbox;
        }
        return bbox;
    },

    publishInnerWidth: function (ownerContext, width) {
        ownerContext.setContentWidth(width - ownerContext.getFrameInfo().width, true);
    },
    
    publishInnerHeight: function (ownerContext, height) {
        ownerContext.setContentHeight(height - ownerContext.getFrameInfo().height, true);
    },
    
    finishedLayout: function (ownerContext) {
        // TODO: Is there a better way doing this?
        var props = ownerContext.props,
            paddingInfo = ownerContext.getPaddingInfo();

        // We don't want the cost of getProps, so we just use the props data... this is ok
        // because all the props have been calculated by this time
        this.owner.setSurfaceSize(props.contentWidth - paddingInfo.width, props.contentHeight - paddingInfo.height);
        
        // calls afterComponentLayout, so we want the surface to be sized before that:
        this.callParent(arguments);
    }
});

/**
 * The Draw Component is a surface in which sprites can be rendered. The Draw Component
 * manages and holds an {@link Ext.draw.Surface} instance where
 * {@link Ext.draw.Sprite Sprites} can be appended.
 *
 * One way to create a draw component is:
 *
 *     @example
 *     var drawComponent = Ext.create('Ext.draw.Component', {
 *         viewBox: false,
 *         items: [{
 *             type: 'circle',
 *             fill: '#79BB3F',
 *             radius: 100,
 *             x: 100,
 *             y: 100
 *         }]
 *     });
 *
 *     Ext.create('Ext.Window', {
 *         width: 215,
 *         height: 235,
 *         layout: 'fit',
 *         items: [drawComponent]
 *     }).show();
 *
 * In this case we created a draw component and added a {@link Ext.draw.Sprite sprite} to it.
 * The {@link Ext.draw.Sprite#type type} of the sprite is `circle` so if you run this code you'll see a yellow-ish
 * circle in a Window. When setting `viewBox` to `false` we are responsible for setting the object's position and
 * dimensions accordingly.
 *
 * You can also add sprites by using the surface's add method:
 *
 *     drawComponent.surface.add({
 *         type: 'circle',
 *         fill: '#79BB3F',
 *         radius: 100,
 *         x: 100,
 *         y: 100
 *     });
 *
 * ## Larger example
 *
 *     @example
 *     var drawComponent = Ext.create('Ext.draw.Component', {
 *         width: 800,
 *         height: 600,
 *         renderTo: document.body
 *     }), surface = drawComponent.surface;
 *
 *     surface.add([{
 *         type: 'circle',
 *         radius: 10,
 *         fill: '#f00',
 *         x: 10,
 *         y: 10,
 *         group: 'circles'
 *     }, {
 *         type: 'circle',
 *         radius: 10,
 *         fill: '#0f0',
 *         x: 50,
 *         y: 50,
 *         group: 'circles'
 *     }, {
 *         type: 'circle',
 *         radius: 10,
 *         fill: '#00f',
 *         x: 100,
 *         y: 100,
 *         group: 'circles'
 *     }, {
 *         type: 'rect',
 *         width: 20,
 *         height: 20,
 *         fill: '#f00',
 *         x: 10,
 *         y: 10,
 *         group: 'rectangles'
 *     }, {
 *         type: 'rect',
 *         width: 20,
 *         height: 20,
 *         fill: '#0f0',
 *         x: 50,
 *         y: 50,
 *         group: 'rectangles'
 *     }, {
 *         type: 'rect',
 *         width: 20,
 *         height: 20,
 *         fill: '#00f',
 *         x: 100,
 *         y: 100,
 *         group: 'rectangles'
 *     }]);
 *
 *     // Get references to my groups
 *     circles = surface.getGroup('circles');
 *     rectangles = surface.getGroup('rectangles');
 *
 *     // Animate the circles down
 *     circles.animate({
 *         duration: 1000,
 *         to: {
 *             translate: {
 *                 y: 200
 *             }
 *         }
 *     });
 *
 *     // Animate the rectangles across
 *     rectangles.animate({
 *         duration: 1000,
 *         to: {
 *             translate: {
 *                 x: 200
 *             }
 *         }
 *     });
 *
 * For more information on Sprites, the core elements added to a draw component's surface,
 * refer to the {@link Ext.draw.Sprite} documentation.
 */
Ext.define('Ext.draw.Component', {

    /* Begin Definitions */

    alias: 'widget.draw',

    extend: 'Ext.Component',

    requires: [
        'Ext.draw.Surface',
        'Ext.draw.layout.Component'
    ],

    /* End Definitions */

    /**
     * @cfg {String[]} enginePriority
     * Defines the priority order for which Surface implementation to use. The first
     * one supported by the current environment will be used.
     */
    enginePriority: ['Svg', 'Vml'],

    baseCls: Ext.baseCSSPrefix + 'surface',

    componentLayout: 'draw',

    /**
     * @cfg {Boolean} viewBox
     * Turn on view box support which will scale and position items in the draw component to fit to the component while
     * maintaining aspect ratio. Note that this scaling can override other sizing settings on your items.
     */
    viewBox: true,

    shrinkWrap: 3,
    
    /**
     * @cfg {Boolean} autoSize
     * Turn on autoSize support which will set the bounding div's size to the natural size of the contents.
     */
    autoSize: false,

    /**
     * @cfg {Object[]} gradients (optional) Define a set of gradients that can be used as `fill` property in sprites.
     * The gradients array is an array of objects with the following properties:
     *
     *  - `id` - string - The unique name of the gradient.
     *  - `angle` - number, optional - The angle of the gradient in degrees.
     *  - `stops` - object - An object with numbers as keys (from 0 to 100) and style objects as values
     *
     * ## Example
     *
     *     gradients: [{
     *         id: 'gradientId',
     *         angle: 45,
     *         stops: {
     *             0: {
     *                 color: '#555'
     *             },
     *             100: {
     *                 color: '#ddd'
     *             }
     *         }
     *     }, {
     *         id: 'gradientId2',
     *         angle: 0,
     *         stops: {
     *             0: {
     *                 color: '#590'
     *             },
     *             20: {
     *                 color: '#599'
     *             },
     *             100: {
     *                 color: '#ddd'
     *             }
     *         }
     *     }]
     *
     * Then the sprites can use `gradientId` and `gradientId2` by setting the fill attributes to those ids, for example:
     *
     *     sprite.setAttributes({
     *         fill: 'url(#gradientId)'
     *     }, true);
     */

    /**
     * @cfg {Ext.draw.Sprite[]} items
     * Array of sprites or sprite config objects to add initially to the surface.
     */

    /**
     * @property {Ext.draw.Surface} surface
     * The Surface instance managed by this component.
     */
    
    suspendSizing: 0,

    /**
     * @event
     * Event forwarded from {@link Ext.draw.Surface surface}.
     * @inheritdoc Ext.draw.Surface#mousedown
     */

    /**
     * @event
     * Event forwarded from {@link Ext.draw.Surface surface}.
     * @inheritdoc Ext.draw.Surface#mouseup
     */

    /**
     * @event
     * Event forwarded from {@link Ext.draw.Surface surface}.
     * @inheritdoc Ext.draw.Surface#mousemove
     */

    /**
     * @event
     * Event forwarded from {@link Ext.draw.Surface surface}.
     * @inheritdoc Ext.draw.Surface#mouseenter
     */

    /**
     * @event
     * Event forwarded from {@link Ext.draw.Surface surface}.
     * @inheritdoc Ext.draw.Surface#mouseleave
     */

    /**
     * @event
     * Event forwarded from {@link Ext.draw.Surface surface}.
     * @inheritdoc Ext.draw.Surface#click
     */

    /**
     * @event
     * Event forwarded from {@link Ext.draw.Surface surface}.
     * @inheritdoc Ext.draw.Surface#dblclick
     */

    /**
     * @private
     *
     * Create the Surface on initial render
     */
    onRender: function() {
        this.callParent(arguments);
        if (this.createSurface() !== false) {
            this.configureSurfaceSize();
        }
    },
    
    configureSurfaceSize: function(){
        var me = this,
            viewBox = me.viewBox,
            autoSize = me.autoSize,
            bbox;

        if ((viewBox || autoSize) && !me.suspendSizing) {
            bbox = me.surface.items.getBBox();
            if (viewBox) {
                me.surface.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
            } else {
                me.autoSizeSurface(bbox);
            }
        }
    },

    // @private
    autoSizeSurface: function(bbox) {
        bbox = bbox || this.surface.items.getBBox();
        this.setSurfaceSize(bbox.width, bbox.height);
    },

    setSurfaceSize: function (width, height) {
        this.surface.setSize(width, height);
        if (this.autoSize) {
            var bbox = this.surface.items.getBBox();
            this.surface.setViewBox(bbox.x, bbox.y - (+Ext.isOpera), width, height);
        }
    },
    
    /**
     * Create the Surface instance. Resolves the correct Surface implementation to
     * instantiate based on the 'enginePriority' config. Once the Surface instance is
     * created you can use the handle to that instance to add sprites. For example:
     *
     *     drawComponent.surface.add(sprite);
     *
     * @private
     */
    createSurface: function() {
        var me = this,
            cfg = Ext.applyIf({
                renderTo: me.el,
                height: me.height,
                width: me.width,
                items: me.items
            }, me.initialConfig), surface;

        // ensure we remove any listeners to prevent duplicate events since we refire them below
        delete cfg.listeners;
        if (!cfg.gradients) {
            cfg.gradients = me.gradients;
        }
        me.initSurfaceCfg(cfg);
        surface = Ext.draw.Surface.create(cfg, me.enginePriority);
        if (!surface) {
            // In case we cannot create a surface, return false so we can stop
            return false;
        }
        me.surface = surface;
        surface.owner = me;


        function refire(eventName) {
            return function(e) {
                me.fireEvent(eventName, e);
            };
        }

        surface.on({
            scope: me,
            mouseup: refire('mouseup'),
            mousedown: refire('mousedown'),
            mousemove: refire('mousemove'),
            mouseenter: refire('mouseenter'),
            mouseleave: refire('mouseleave'),
            click: refire('click'),
            dblclick: refire('dblclick')
        });
    },
    
    initSurfaceCfg: Ext.emptyFn,


    /**
     * @private
     *
     * Clean up the Surface instance on component destruction
     */
    onDestroy: function() {
        Ext.destroy(this.surface);
        this.callParent(arguments);
    }

});

Ext.define('Ext.rtl.draw.Component', {
    override: 'Ext.draw.Component',
    
    initSurfaceCfg: function(cfg) {
        if (this.getInherited().rtl) {
            cfg.isRtl = true;
        }
    }    
});

/**
 * Represents an RGB color and provides helper functions get
 * color components in HSL color space.
 */
Ext.define('Ext.draw.Color', {

    /* Begin Definitions */

    /* End Definitions */

    colorToHexRe: /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
    rgbRe: /\s*rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)\s*/,
    hexRe: /\s*#([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)\s*/,

    /**
     * @cfg {Number} lightnessFactor
     *
     * The default factor to compute the lighter or darker color. Defaults to 0.2.
     */
    lightnessFactor: 0.2,

    /**
     * Creates new Color.
     * @param {Number} red Red component (0..255)
     * @param {Number} green Green component (0..255)
     * @param {Number} blue Blue component (0..255)
     */
    constructor : function(red, green, blue) {
        var me = this,
            clamp = Ext.Number.constrain;
        me.r = clamp(red, 0, 255);
        me.g = clamp(green, 0, 255);
        me.b = clamp(blue, 0, 255);
    },

    /**
     * Get the red component of the color, in the range 0..255.
     * @return {Number}
     */
    getRed: function() {
        return this.r;
    },

    /**
     * Get the green component of the color, in the range 0..255.
     * @return {Number}
     */
    getGreen: function() {
        return this.g;
    },

    /**
     * Get the blue component of the color, in the range 0..255.
     * @return {Number}
     */
    getBlue: function() {
        return this.b;
    },

    /**
     * Get the RGB values.
     * @return {Number[]}
     */
    getRGB: function() {
        var me = this;
        return [me.r, me.g, me.b];
    },

    /**
     * Get the equivalent HSL components of the color.
     * @return {Number[]}
     */
    getHSL: function() {
        var me = this,
            r = me.r / 255,
            g = me.g / 255,
            b = me.b / 255,
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            delta = max - min,
            h,
            s = 0,
            l = 0.5 * (max + min);

        // min==max means achromatic (hue is undefined)
        if (min != max) {
            s = (l < 0.5) ? delta / (max + min) : delta / (2 - max - min);
            if (r == max) {
                h = 60 * (g - b) / delta;
            } else if (g == max) {
                h = 120 + 60 * (b - r) / delta;
            } else {
                h = 240 + 60 * (r - g) / delta;
            }
            if (h < 0) {
                h += 360;
            }
            if (h >= 360) {
                h -= 360;
            }
        }
        return [h, s, l];
    },

    /**
     * Return a new color that is lighter than this color.
     * @param {Number} factor Lighter factor (0..1), default to 0.2
     * @return Ext.draw.Color
     */
    getLighter: function(factor) {
        var hsl = this.getHSL();
        factor = factor || this.lightnessFactor;
        hsl[2] = Ext.Number.constrain(hsl[2] + factor, 0, 1);
        return this.fromHSL(hsl[0], hsl[1], hsl[2]);
    },

    /**
     * Return a new color that is darker than this color.
     * @param {Number} factor Darker factor (0..1), default to 0.2
     * @return Ext.draw.Color
     */
    getDarker: function(factor) {
        factor = factor || this.lightnessFactor;
        return this.getLighter(-factor);
    },

    /**
     * Return the color in the hex format, i.e. '#rrggbb'.
     * @return {String}
     */
    toString: function() {
        var me = this,
            round = Math.round,
            r = round(me.r).toString(16),
            g = round(me.g).toString(16),
            b = round(me.b).toString(16);
        r = (r.length == 1) ? '0' + r : r;
        g = (g.length == 1) ? '0' + g : g;
        b = (b.length == 1) ? '0' + b : b;
        return ['#', r, g, b].join('');
    },

    /**
     * Convert a color to hexadecimal format.
     *
     * **Note:** This method is both static and instance.
     *
     * @param {String/String[]} color The color value (i.e 'rgb(255, 255, 255)', 'color: #ffffff').
     * Can also be an Array, in this case the function handles the first member.
     * @returns {String} The color in hexadecimal format.
     * @static
     */
    toHex: function(color) {
        if (Ext.isArray(color)) {
            color = color[0];
        }
        if (!Ext.isString(color)) {
            return '';
        }
        if (color.substr(0, 1) === '#') {
            return color;
        }
        var digits = this.colorToHexRe.exec(color),
            red,
            green,
            blue,
            rgb;

        if (Ext.isArray(digits)) {
            red = parseInt(digits[2], 10);
            green = parseInt(digits[3], 10);
            blue = parseInt(digits[4], 10);
            rgb = blue | (green << 8) | (red << 16);
            return digits[1] + '#' + ("000000" + rgb.toString(16)).slice(-6);
        }
        else {
            return color;
        }
    },

    /**
     * Parse the string and create a new color.
     *
     * Supported formats: '#rrggbb', '#rgb', and 'rgb(r,g,b)'.
     *
     * If the string is not recognized, an undefined will be returned instead.
     *
     * **Note:** This method is both static and instance.
     *
     * @param {String} str Color in string.
     * @returns Ext.draw.Color
     * @static
     */
    fromString: function(str) {
        var values, r, g, b,
            parse = parseInt,
            firstChar = str.substr(0, 1),
            colorValue;

        if (firstChar != '#') {
            colorValue = Ext.draw.Color.cssColors[str];
            if (colorValue) {
                str = colorValue;
                firstChar = str.substr(0, 1);
            }
        }

        if ((str.length == 4 || str.length == 7) && firstChar === '#') {
            values = str.match(this.hexRe);
            if (values) {
                r = parse(values[1], 16) >> 0;
                g = parse(values[2], 16) >> 0;
                b = parse(values[3], 16) >> 0;
                if (str.length == 4) {
                    r += (r * 16);
                    g += (g * 16);
                    b += (b * 16);
                }
            }
        }
        else {
            values = str.match(this.rgbRe);
            if (values) {
                r = values[1];
                g = values[2];
                b = values[3];
            }
        }

        return (typeof r == 'undefined') ? undefined : new Ext.draw.Color(r, g, b);
    },

    /**
     * Returns the gray value (0 to 255) of the color.
     *
     * The gray value is calculated using the formula r*0.3 + g*0.59 + b*0.11.
     *
     * @returns {Number}
     */
    getGrayscale: function() {
        // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
        return this.r * 0.3 + this.g * 0.59 + this.b * 0.11;
    },

    /**
     * Create a new color based on the specified HSL values.
     *
     * **Note:** This method is both static and instance.
     *
     * @param {Number} h Hue component (0..359)
     * @param {Number} s Saturation component (0..1)
     * @param {Number} l Lightness component (0..1)
     * @returns Ext.draw.Color
     * @static
     */
    fromHSL: function(h, s, l) {
        var C, X, m, i, rgb = [],
            abs = Math.abs,
            floor = Math.floor;

        if (s == 0 || h == null) {
            // achromatic
            rgb = [l, l, l];
        }
        else {
            // http://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL
            // C is the chroma
            // X is the second largest component
            // m is the lightness adjustment
            h /= 60;
            C = s * (1 - abs(2 * l - 1));
            X = C * (1 - abs(h - 2 * floor(h / 2) - 1));
            m = l - C / 2;
            switch (floor(h)) {
                case 0:
                    rgb = [C, X, 0];
                    break;
                case 1:
                    rgb = [X, C, 0];
                    break;
                case 2:
                    rgb = [0, C, X];
                    break;
                case 3:
                    rgb = [0, X, C];
                    break;
                case 4:
                    rgb = [X, 0, C];
                    break;
                case 5:
                    rgb = [C, 0, X];
                    break;
            }
            rgb = [rgb[0] + m, rgb[1] + m, rgb[2] + m];
        }
        return new Ext.draw.Color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
    }
}, function() {
    var prototype = this.prototype;

    this.addStatics({
        //These functions are both static and instance. TODO: find a more elegant way of copying them
        fromHSL: function() {
            return prototype.fromHSL.apply(prototype, arguments);
        },
        fromString: function() {
            return prototype.fromString.apply(prototype, arguments);
        },
        toHex: function() {
            return prototype.toHex.apply(prototype, arguments);
        },
        //The CSS / SVG / X11 colors
        cssColors: {
            aliceblue: '#F0F8FF',
            antiquewhite: '#FAEBD7',
            aqua: '#00FFFF',
            aquamarine: '#7FFFD4',
            azure: '#F0FFFF',
            beige: '#F5F5DC',
            bisque: '#FFE4C4',
            black: '#000000',
            blanchedalmond: '#FFEBCD',
            blue: '#0000FF',
            blueviolet: '#8A2BE2',
            brown: '#A52A2A',
            burlywood: '#DEB887',
            cadetblue: '#5F9EA0',
            chartreuse: '#7FFF00',
            chocolate: '#D2691E',
            coral: '#FF7F50',
            cornflowerblue: '#6495ED',
            cornsilk: '#FFF8DC',
            crimson: '#DC143C',
            cyan: '#00FFFF',
            darkblue: '#00008B',
            darkcyan: '#008B8B',
            darkgoldenrod: '#B8860B',
            darkgray: '#A9A9A9',
            darkgreen: '#006400',
            darkgrey: '#A9A9A9',
            darkkhaki: '#BDB76B',
            darkmagenta: '#8B008B',
            darkolivegreen: '#556B2F',
            darkorange: '#FF8C00',
            darkorchid: '#9932CC',
            darkred: '#8B0000',
            darksalmon: '#E9967A',
            darkseagreen: '#8FBC8F',
            darkslateblue: '#483D8B',
            darkslategray: '#2F4F4F',
            darkslategrey: '#2F4F4F',
            darkturquoise: '#00CED1',
            darkviolet: '#9400D3',
            deeppink: '#FF1493',
            deepskyblue: '#00BFFF',
            dimgray: '#696969',
            dimgrey: '#696969',
            dodgerblue: '#1E90FF',
            firebrick: '#B22222',
            floralwhite: '#FFFAF0',
            forestgreen: '#228B22',
            fuchsia: '#FF00FF',
            gainsboro: '#DCDCDC',
            ghostwhite: '#F8F8FF',
            gold: '#FFD700',
            goldenrod: '#DAA520',
            gray: '#808080',
            grey: '#808080',
            green: '#008000',
            greenyellow: '#ADFF2F',
            honeydew: '#F0FFF0',
            hotpink: '#FF69B4',
            indianred: '#CD5C5C',
            indigo: '#4B0082',
            ivory: '#FFFFF0',
            khaki: '#F0E68C',
            lavender: '#E6E6FA',
            lavenderblush: '#FFF0F5',
            lawngreen: '#7CFC00',
            lemonchiffon: '#FFFACD',
            lightblue: '#ADD8E6',
            lightcoral: '#F08080',
            lightcyan: '#E0FFFF',
            lightgoldenrodyellow: '#FAFAD2',
            lightgray: '#D3D3D3',
            lightgreen: '#90EE90',
            lightgrey: '#D3D3D3',
            lightpink: '#FFB6C1',
            lightsalmon: '#FFA07A',
            lightseagreen: '#20B2AA',
            lightskyblue: '#87CEFA',
            lightslategray: '#778899',
            lightslategrey: '#778899',
            lightsteelblue: '#B0C4DE',
            lightyellow: '#FFFFE0',
            lime: '#00FF00',
            limegreen: '#32CD32',
            linen: '#FAF0E6',
            magenta: '#FF00FF',
            maroon: '#800000',
            mediumaquamarine: '#66CDAA',
            mediumblue: '#0000CD',
            mediumorchid: '#BA55D3',
            mediumpurple: '#9370DB',
            mediumseagreen: '#3CB371',
            mediumslateblue: '#7B68EE',
            mediumspringgreen: '#00FA9A',
            mediumturquoise: '#48D1CC',
            mediumvioletred: '#C71585',
            midnightblue: '#191970',
            mintcream: '#F5FFFA',
            mistyrose: '#FFE4E1',
            moccasin: '#FFE4B5',
            navajowhite: '#FFDEAD',
            navy: '#000080',
            oldlace: '#FDF5E6',
            olive: '#808000',
            olivedrab: '#6B8E23',
            orange: '#FFA500',
            orangered: '#FF4500',
            orchid: '#DA70D6',
            palegoldenrod: '#EEE8AA',
            palegreen: '#98FB98',
            paleturquoise: '#AFEEEE',
            palevioletred: '#DB7093',
            papayawhip: '#FFEFD5',
            peachpuff: '#FFDAB9',
            peru: '#CD853F',
            pink: '#FFC0CB',
            plum: '#DDA0DD',
            powderblue: '#B0E0E6',
            purple: '#800080',
            red: '#FF0000',
            rosybrown: '#BC8F8F',
            royalblue: '#4169E1',
            saddlebrown: '#8B4513',
            salmon: '#FA8072',
            sandybrown: '#F4A460',
            seagreen: '#2E8B57',
            seashell: '#FFF5EE',
            sienna: '#A0522D',
            silver: '#C0C0C0',
            skyblue: '#87CEEB',
            slateblue: '#6A5ACD',
            slategray: '#708090',
            slategrey: '#708090',
            snow: '#FFFAFA',
            springgreen: '#00FF7F',
            steelblue: '#4682B4',
            tan: '#D2B48C',
            teal: '#008080',
            thistle: '#D8BFD8',
            tomato: '#FF6347',
            turquoise: '#40E0D0',
            violet: '#EE82EE',
            wheat: '#F5DEB3',
            white: '#FFFFFF',
            whitesmoke: '#F5F5F5',
            yellow: '#FFFF00',
            yellowgreen: '#9ACD32'
        }
    });

});

/**
 * @class Ext.chart.theme.Theme
 * 
 * Provides chart theming.
 * 
 * Used as mixins by Ext.chart.Chart.
 */
Ext.chart = Ext.chart || {};

Ext.define('Ext.chart.theme.Theme', (

// This callback is executed right after when the class is created. This scope refers to the newly created class itself
function() {
   /* Theme constructor: takes either a complex object with styles like:
  
   {
        axis: {
            fill: '#000',
            'stroke-width': 1
        },
        axisLabelTop: {
            fill: '#000',
            font: '11px Arial'
        },
        axisLabelLeft: {
            fill: '#000',
            font: '11px Arial'
        },
        axisLabelRight: {
            fill: '#000',
            font: '11px Arial'
        },
        axisLabelBottom: {
            fill: '#000',
            font: '11px Arial'
        },
        axisTitleTop: {
            fill: '#000',
            font: '11px Arial'
        },
        axisTitleLeft: {
            fill: '#000',
            font: '11px Arial'
        },
        axisTitleRight: {
            fill: '#000',
            font: '11px Arial'
        },
        axisTitleBottom: {
            fill: '#000',
            font: '11px Arial'
        },
        series: {
            'stroke-width': 1
        },
        seriesLabel: {
            font: '12px Arial',
            fill: '#333'
        },
        marker: {
            stroke: '#555',
            fill: '#000',
            radius: 3,
            size: 3
        },
        seriesThemes: [{
            fill: '#C6DBEF'
        }, {
            fill: '#9ECAE1'
        }, {
            fill: '#6BAED6'
        }, {
            fill: '#4292C6'
        }, {
            fill: '#2171B5'
        }, {
            fill: '#084594'
        }],
        markerThemes: [{
            fill: '#084594',
            type: 'circle' 
        }, {
            fill: '#2171B5',
            type: 'cross'
        }, {
            fill: '#4292C6',
            type: 'plus'
        }]
    }
  
  ...or also takes just an array of colors and creates the complex object:
  
  {
      colors: ['#aaa', '#bcd', '#eee']
  }
  
  ...or takes just a base color and makes a theme from it
  
  {
      baseColor: '#bce'
  }
  
  To create a new theme you may add it to the Themes object:
  
  Ext.chart.theme.MyNewTheme = Ext.extend(Object, {
      constructor: function(config) {
          Ext.chart.theme.call(this, config, {
              baseColor: '#mybasecolor'
          });
      }
  });
  
  //Proposal:
  Ext.chart.theme.MyNewTheme = Ext.chart.createTheme('#basecolor');
  
  ...and then to use it provide the name of the theme (as a lower case string) in the chart config.
  
  {
      theme: 'mynewtheme'
  }
 */

(function() {
    Ext.chart.theme = function(config, base) {
        config = config || {};
        var i = 0, d = Ext.Date.now(), l, colors, color,
            seriesThemes, markerThemes,
            seriesTheme, markerTheme, 
            key, gradients = [],
            midColor, midL;
        
        if (config.baseColor) {
            midColor = Ext.draw.Color.fromString(config.baseColor);
            midL = midColor.getHSL()[2];
            if (midL < 0.15) {
                midColor = midColor.getLighter(0.3);
            } else if (midL < 0.3) {
                midColor = midColor.getLighter(0.15);
            } else if (midL > 0.85) {
                midColor = midColor.getDarker(0.3);
            } else if (midL > 0.7) {
                midColor = midColor.getDarker(0.15);
            }
            config.colors = [ midColor.getDarker(0.3).toString(),
                              midColor.getDarker(0.15).toString(),
                              midColor.toString(),
                              midColor.getLighter(0.15).toString(),
                              midColor.getLighter(0.3).toString()];

            delete config.baseColor;
        }
        if (config.colors) {
            colors = config.colors.slice();
            markerThemes = base.markerThemes;
            seriesThemes = base.seriesThemes;
            l = colors.length;
            base.colors = colors;
            for (; i < l; i++) {
                color = colors[i];
                markerTheme = markerThemes[i] || {};
                seriesTheme = seriesThemes[i] || {};
                markerTheme.fill = seriesTheme.fill = markerTheme.stroke = seriesTheme.stroke = color;
                markerThemes[i] = markerTheme;
                seriesThemes[i] = seriesTheme;
            }
            base.markerThemes = markerThemes.slice(0, l);
            base.seriesThemes = seriesThemes.slice(0, l);
        //the user is configuring something in particular (either markers, series or pie slices)
        }
        for (key in base) {
            if (key in config) {
                if (Ext.isObject(config[key]) && Ext.isObject(base[key])) {
                    Ext.apply(base[key], config[key]);
                } else {
                    base[key] = config[key];
                }
            }
        }
        if (config.useGradients) {
            colors = base.colors || (function () {
                var ans = [];
                for (i = 0, seriesThemes = base.seriesThemes, l = seriesThemes.length; i < l; i++) {
                    ans.push(seriesThemes[i].fill || seriesThemes[i].stroke);
                }
                return ans;
            }());
            for (i = 0, l = colors.length; i < l; i++) {
                midColor = Ext.draw.Color.fromString(colors[i]);
                if (midColor) {
                    color = midColor.getDarker(0.1).toString();
                    midColor = midColor.toString();
                    key = 'theme-' + midColor.substr(1) + '-' + color.substr(1) + '-' + d;
                    gradients.push({
                        id: key,
                        angle: 45,
                        stops: {
                            0: {
                                color: midColor.toString()
                            },
                            100: {
                                color: color.toString()
                            }
                        }
                    });
                    colors[i] = 'url(#' + key + ')'; 
                }
            }
            base.gradients = gradients;
            base.colors = colors;
        }
        /*
        base.axis = Ext.apply(base.axis || {}, config.axis || {});
        base.axisLabel = Ext.apply(base.axisLabel || {}, config.axisLabel || {});
        base.axisTitle = Ext.apply(base.axisTitle || {}, config.axisTitle || {});
        */
        Ext.apply(this, base);
    };
}());

return {

    /* Begin Definitions */

    requires: ['Ext.draw.Color'],

    /* End Definitions */

    theme: 'Base',
    themeAttrs: false,

    initTheme: function(theme) {
        var me = this,
            themes = Ext.chart.theme,
            key, gradients;
        if (theme) {
            theme = theme.split(':');
            for (key in themes) {
                if (key == theme[0]) {
                    gradients = theme[1] == 'gradients';
                    me.themeAttrs = new themes[key]({
                        useGradients: gradients
                    });
                    if (gradients) {
                        me.gradients = me.themeAttrs.gradients;
                    }
                    if (me.themeAttrs.background) {
                        me.background = me.themeAttrs.background;
                    }
                    return;
                }
            }
            Ext.Error.raise('No theme found named "' + theme + '"');
        }
    }
};

})());

/**
 * @private
 */
Ext.define('Ext.chart.MaskLayer', {
    extend: 'Ext.Component',
    
    constructor: function(config) {
        config = Ext.apply(config || {}, {
            style: 'position:absolute;background-color:#ff9;cursor:crosshair;opacity:0.5;border:1px solid #00f;'
        });
        this.callParent([config]);    
    },
    
    //'mousedown',
    //'mouseup',
    //'mousemove',
    //'mouseenter',
    //'mouseleave'

    privates: {
        initDraggable: function() {
            this.callParent(arguments);
            this.dd.onStart = function (e) {
                var me = this,
                    comp = me.comp;

                // Cache the start [X, Y] array
                this.startPosition = comp.getPosition(true);

                // If client Component has a ghost method to show a lightweight version of itself
                // then use that as a drag proxy unless configured to liveDrag.
                if (comp.ghost && !comp.liveDrag) {
                    me.proxy = comp.ghost();
                    me.dragTarget = me.proxy.header.el;
                }

                // Set the constrainTo Region before we start dragging.
                if (me.constrain || me.constrainDelegate) {
                    me.constrainTo = me.calculateConstrainRegion();
                }
            };
        }
    }
});

/**
 * Defines a mask for a chart's series.
 * The 'chart' member must be set prior to rendering.
 *
 * A Mask can be used to select a certain region in a chart.
 * When enabled, the `select` event will be triggered when a
 * region is selected by the mask, allowing the user to perform
 * other tasks like zooming on that region, etc.
 *
 * In order to use the mask one has to set the Chart `mask` option to
 * `true`, `vertical` or `horizontal`. Then a possible configuration for the
 * listener could be:
 *
 *     items: {
 *         xtype: 'chart',
 *         animate: true,
 *         store: store1,
 *         mask: 'horizontal',
 *         listeners: {
 *             select: {
 *                 fn: function(me, selection) {
 *                     me.setZoom(selection);
 *                     me.mask.hide();
 *                 }
 *             }
 *         }
 *     }
 *
 * In this example we zoom the chart to that particular region. You can also get
 * a handle to a mask instance from the chart object. The `chart.mask` element is a
 * `Ext.Panel`.
 * 
 */
Ext.define('Ext.chart.Mask', {
    mixinId: 'mask',

    requires: [
        'Ext.chart.MaskLayer'
    ],
    
    /**
     * @cfg {Boolean/String} mask
     * Enables selecting a region on chart. True to enable any selection,
     * 'horizontal' or 'vertical' to restrict the selection to X or Y axis.
     *
     * The mask in itself will do nothing but fire 'select' event.
     * See {@link Ext.chart.Mask} for example.
     */

    /**
     * Creates new Mask.
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        var me = this;

        if (config) {
            Ext.apply(me, config);
        }
        if (me.enableMask) {
            me.on('afterrender', function() {
                //create a mask layer component
                var comp = new Ext.chart.MaskLayer({
                    renderTo: me.el,
                    hidden: true
                });
                comp.el.on({
                    'mousemove': function(e) {
                        me.onMouseMove(e);
                    },
                    'mouseup': function(e) {
                        me.onMouseUp(e);
                    }
                });
                comp.initDraggable();
                me.maskType = me.mask;
                me.mask = comp;
                me.maskSprite = me.surface.add({
                    type: 'path',
                    path: ['M', 0, 0],
                    zIndex: 1001,
                    opacity: 0.6,
                    hidden: true,
                    stroke: '#00f',
                    cursor: 'crosshair'
                });
            }, me, { single: true });
        }
    },

    onMouseUp: function(e) {
        var me = this,
            bbox = me.bbox || me.chartBBox,
            sel;
        me.maskMouseDown = false;
        me.mouseDown = false;
        if (me.mouseMoved) {
            me.handleMouseEvent(e);
            me.mouseMoved = false;
            sel = me.maskSelection;
            me.fireEvent('select', me, {
                x: sel.x - bbox.x,
                y: sel.y - bbox.y,
                width: sel.width,
                height: sel.height
            });
        }
    },

    onMouseDown: function(e) {
        this.handleMouseEvent(e);
    },

    onMouseMove: function(e) {
        this.handleMouseEvent(e);
    },

    handleMouseEvent: function(e) {
        var me = this,
            mask = me.maskType,
            bbox = me.bbox || me.chartBBox,
            x = bbox.x,
            y = bbox.y,
            math = Math,
            floor = math.floor,
            abs = math.abs,
            min = math.min,
            max = math.max,
            height = floor(y + bbox.height),
            width = floor(x + bbox.width),
            staticX = e.getPageX() - me.el.getX(),
            staticY = e.getPageY() - me.el.getY(),
            maskMouseDown = me.maskMouseDown,
            path;

        staticX = max(staticX, x);
        staticY = max(staticY, y);
        staticX = min(staticX, width);
        staticY = min(staticY, height);

        if (e.type === 'mousedown') {
            // remember the cursor location
            me.mouseDown = true;
            me.mouseMoved = false;
            me.maskMouseDown = {
                x: staticX,
                y: staticY
            };
        }
        else {
            // mousedown or mouseup:
            // track the cursor to display the selection
            me.mouseMoved = me.mouseDown;
            if (maskMouseDown && me.mouseDown) {
                if (mask == 'horizontal') {
                    staticY = y;
                    maskMouseDown.y = height;
                }
                else if (mask == 'vertical') {
                    staticX = x;
                    maskMouseDown.x = width;
                }
                width = maskMouseDown.x - staticX;
                height = maskMouseDown.y - staticY;
                path = ['M', staticX, staticY, 'l', width, 0, 0, height, -width, 0, 'z'];
                me.maskSelection = {
                    x: (width > 0 ? staticX : staticX + width) + me.el.getX(),
                    y: (height > 0 ? staticY : staticY + height) + me.el.getY(),
                    width: abs(width),
                    height: abs(height)
                };
                me.mask.updateBox(me.maskSelection);
                me.mask.show();
                me.maskSprite.setAttributes({
                    hidden: true    
                }, true);
            }
            else {
                if (mask == 'horizontal') {
                    path = ['M', staticX, y, 'L', staticX, height];
                }
                else if (mask == 'vertical') {
                    path = ['M', x, staticY, 'L', width, staticY];
                }
                else {
                    path = ['M', staticX, y, 'L', staticX, height, 'M', x, staticY, 'L', width, staticY];
                }
                me.maskSprite.setAttributes({
                    path: path,
                    'stroke-width': mask === true ? 1 : 1,
                    hidden: false
                }, true);
            }
        }

    },

    onMouseLeave: function(e) {
        var me = this;
        me.mouseMoved = false;
        me.mouseDown = false;
        me.maskMouseDown = false;
        me.mask.hide();
        me.maskSprite.hide(true);
    }
});
    

/**
 * @class Ext.chart.Navigation
 *
 * Handles panning and zooming capabilities.
 *
 * Used as mixin by Ext.chart.Chart.
 */
Ext.define('Ext.chart.Navigation', {
    mixinId: 'navigation',

    /**
     * Zooms the chart to the specified selection range.
     * Can be used with a selection mask. For example:
     *
     *     items: {
     *         xtype: 'chart',
     *         animate: true,
     *         store: store1,
     *         mask: 'horizontal',
     *         listeners: {
     *             select: {
     *                 fn: function(me, selection) {
     *                     me.setZoom(selection);
     *                     me.mask.hide();
     *                 }
     *             }
     *         }
     *     }
     *
     * @param {Object} [zoomConfig] The config to set the zoom area to.
     * This object is then used on the axis {@link Ext.chart.axis.Axis#minimum} and {@link Ext.chart.axis.Axis#maximum} and then the chart is redrawn.
     * @param {Number} zoomConfig.x The x coordinate to zoom
     * @param {Number} zoomConfig.y The y coordinate to zoom
     * @param {Number} zoomConfig.width The width of the zoom area
     * @param {Number} zoomConfig.height The height of the zoom area
     */
    setZoom: function(zoomConfig) {
        var me = this,
            axesItems = me.axes.items,
            i, ln, axis,
            bbox = me.chartBBox,
            xScale = bbox.width,
            yScale = bbox.height,
            zoomArea = {
                x : zoomConfig.x - me.el.getX(),
                y : zoomConfig.y - me.el.getY(),
                width : zoomConfig.width,
                height : zoomConfig.height
            },
            zoomer, ends, from, to, store, count, step, length, horizontal;

        for (i = 0, ln = axesItems.length; i < ln; i++) {
            axis = axesItems[i];
            horizontal = (axis.position == 'bottom' || axis.position == 'top');
            if (axis.type == 'Category') {
                if (!store) {
                    store = me.getChartStore();
                    count = store.data.items.length;
                }
                zoomer = zoomArea;
                length = axis.length;
                step = Math.round(length / count);
                if (horizontal) {
                    from = (zoomer.x ? Math.floor(zoomer.x / step) + 1 : 0);
                    to = (zoomer.x + zoomer.width) / step;
                } else {
                    from = (zoomer.y ? Math.floor(zoomer.y / step) + 1 : 0);
                    to = (zoomer.y + zoomer.height) / step;
                }
            }
            else {
                zoomer = {
                    x : zoomArea.x / xScale,
                    y : zoomArea.y / yScale,
                    width : zoomArea.width / xScale,
                    height : zoomArea.height / yScale
                };
                ends = axis.calcEnds();
                if (horizontal) {
                    from = (ends.to - ends.from) * zoomer.x + ends.from;
                    to = (ends.to - ends.from) * zoomer.width + from;
                } else {
                    to = (ends.to - ends.from) * (1 - zoomer.y) + ends.from;
                    from = to - (ends.to - ends.from) * zoomer.height;
                }
            }
            axis.minimum = from;
            axis.maximum = to;
            if (horizontal) {
                if (axis.doConstrain && me.maskType != 'vertical') {
                    axis.doConstrain();
                }
            }
            else {
                if (axis.doConstrain && me.maskType != 'horizontal') {
                    axis.doConstrain();
                }
            }
        }
        me.redraw(false);
    },

    /**
     * Restores the zoom to the original value. This can be used to reset
     * the previous zoom state set by `setZoom`. For example:
     *
     *     myChart.restoreZoom();
     */
    restoreZoom: function() {
        var me = this,
            axesItems = me.axes.items,
            i, ln, axis;

        me.setSubStore(null);
        for (i = 0, ln = axesItems.length; i < ln; i++) {
            axis = axesItems[i];
            delete axis.minimum;
            delete axis.maximum;
        }
        me.redraw(false);
    }

});

/**
 * @private
 */
Ext.define('Ext.chart.Shape', {

    /* Begin Definitions */

    singleton: true,

    /* End Definitions */

    circle: function (surface, opts) {
        return surface.add(Ext.apply({
            type: 'circle',
            x: opts.x,
            y: opts.y,
            stroke: null,
            radius: opts.radius
        }, opts));
    },
    line: function (surface, opts) {
        return surface.add(Ext.apply({
            type: 'rect',
            x: opts.x - opts.radius,
            y: opts.y - opts.radius,
            height: 2 * opts.radius,
            width: 2 * opts.radius / 5
        }, opts));
    },
    square: function (surface, opts) {
        return surface.add(Ext.applyIf({
            type: 'rect',
            x: opts.x - opts.radius,
            y: opts.y - opts.radius,
            height: 2 * opts.radius,
            width: 2 * opts.radius,
            radius: null
        }, opts));
    },
    triangle: function (surface, opts) {
        opts.radius *= 1.75;
        return surface.add(Ext.apply({
            type: 'path',
            stroke: null,
            path: "M".concat(opts.x, ",", opts.y, "m0-", opts.radius * 0.58, "l", opts.radius * 0.5, ",", opts.radius * 0.87, "-", opts.radius, ",0z")
        }, opts));
    },
    diamond: function (surface, opts) {
        var r = opts.radius;
        r *= 1.5;
        return surface.add(Ext.apply({
            type: 'path',
            stroke: null,
            path: ["M", opts.x, opts.y - r, "l", r, r, -r, r, -r, -r, r, -r, "z"]
        }, opts));
    },
    cross: function (surface, opts) {
        var r = opts.radius;
        r = r / 1.7;
        return surface.add(Ext.apply({
            type: 'path',
            stroke: null,
            path: "M".concat(opts.x - r, ",", opts.y, "l", [-r, -r, r, -r, r, r, r, -r, r, r, -r, r, r, r, -r, r, -r, -r, -r, r, -r, -r, "z"])
        }, opts));
    },
    plus: function (surface, opts) {
        var r = opts.radius / 1.3;
        return surface.add(Ext.apply({
            type: 'path',
            stroke: null,
            path: "M".concat(opts.x - r / 2, ",", opts.y - r / 2, "l", [0, -r, r, 0, 0, r, r, 0, 0, r, -r, 0, 0, r, -r, 0, 0, -r, -r, 0, 0, -r, "z"])
        }, opts));
    },
    arrow: function (surface, opts) {
        var r = opts.radius;
        return surface.add(Ext.apply({
            type: 'path',
            path: "M".concat(opts.x - r * 0.7, ",", opts.y - r * 0.4, "l", [r * 0.6, 0, 0, -r * 0.4, r, r * 0.8, -r, r * 0.8, 0, -r * 0.4, -r * 0.6, 0], "z")
        }, opts));
    },
    drop: function (surface, x, y, text, size, angle) {
        size = size || 30;
        angle = angle || 0;
        surface.add({
            type: 'path',
            path: ['M', x, y, 'l', size, 0, 'A', size * 0.4, size * 0.4, 0, 1, 0, x + size * 0.7, y - size * 0.7, 'z'],
            fill: '#000',
            stroke: 'none',
            rotate: {
                degrees: 22.5 - angle,
                x: x,
                y: y
            }
        });
        angle = (angle + 90) * Math.PI / 180;
        surface.add({
            type: 'text',
            x: x + size * Math.sin(angle) - 10, // Shift here, Not sure why.
            y: y + size * Math.cos(angle) + 5,
            text:  text,
            'font-size': size * 12 / 40,
            stroke: 'none',
            fill: '#fff'
        });
    }
});

/**
 * @class Ext.chart.LegendItem
 * A single item of a legend (marker plus label)
 */
Ext.define('Ext.chart.LegendItem', {

    /* Begin Definitions */

    extend: 'Ext.draw.CompositeSprite',

    requires: ['Ext.chart.Shape'],

    /* End Definitions */

    // Controls Series visibility
    hiddenSeries: false,
    
    // These are cached for quick lookups
    label: undefined,
    
    // Position of the item, relative to the upper-left corner of the legend box
    x: 0,
    y: 0,
    zIndex: 500,

    // checks to make sure that a unit size follows the bold keyword in the font style value
    boldRe: /bold\s\d{1,}.*/i,

    constructor: function(config) {
        this.callParent(arguments);
        this.createLegend(config);
    },

    /**
     * Creates all the individual sprites for this legend item
     */
    createLegend: function(config) {
        var me = this,
            series = me.series,
            index = config.yFieldIndex;
            
        me.label = me.createLabel(config);
        me.createSeriesMarkers(config);
        
        me.setAttributes({
            hidden: false
        }, true);
        
        me.yFieldIndex = index;

        // Add event listeners
        me.on('mouseover', me.onMouseOver, me);
        me.on('mouseout',  me.onMouseOut,  me);
        me.on('mousedown', me.onMouseDown, me);
        
        if (!series.visibleInLegend(index)) {
            me.hiddenSeries = true;
            me.label.setAttributes({
               opacity: 0.5
            }, true);
        }

        // Relative to 0,0 at first so that the bbox is calculated correctly
        me.updatePosition({ x: 0, y: 0 }); 
    },
    
    /**
     * @private Retrieves text to be displayed as item label.
     */
    getLabelText: function() {
        var me = this,
            series = me.series,
            idx = me.yFieldIndex;

        function getSeriesProp(name) {
            var val = series[name];
            return (Ext.isArray(val) ? val[idx] : val);
        }
        
        return getSeriesProp('title') || getSeriesProp('yField');
    },
    
    /**
     * @private Creates label sprite.
     */
    createLabel: function(config) {
        var me = this,
            legend = me.legend;
        
        return me.add('label', me.surface.add({
            type: 'text',
            x: 20,
            y: 0,
            zIndex: (me.zIndex || 0) + 2,
            fill: legend.labelColor,
            font: legend.labelFont,
            text: me.getLabelText(),
            style: {
                cursor: 'pointer'
            }
        }));
    },
    
    /**
     * @private Creates Series marker Sprites.
     */
    createSeriesMarkers: function(config) {
        var me = this,
            index = config.yFieldIndex,
            series = me.series,
            seriesType = series.type,
            surface = me.surface,
            z = me.zIndex;

        // Line series - display as short line with optional marker in the middle
        if (seriesType === 'line' || seriesType === 'scatter') {
            if(seriesType === 'line') {
                var seriesStyle = Ext.apply(series.seriesStyle, series.style);
                me.drawLine(0.5, 0.5, 16.5, 0.5, z, seriesStyle, index);
            }
            
            if (series.showMarkers || seriesType === 'scatter') {
                var markerConfig = Ext.apply(series.markerStyle, series.markerConfig || {}, {
                    fill: series.getLegendColor(index)
                });
                me.drawMarker(8.5, 0.5, z, markerConfig);
            }
        }
        // All other series types - display as filled box
        else {
            me.drawFilledBox(12, 12, z, index);
        }
    },
    
    /**
     * @private Creates line sprite for Line series.
     */
    drawLine: function(fromX, fromY, toX, toY, z, seriesStyle, index) {
        var me = this,
            surface = me.surface,
            series = me.series;
        
        return me.add('line', surface.add({
            type: 'path',
            path: 'M' + fromX + ',' + fromY + 'L' + toX + ',' + toY,
            zIndex: (z || 0) + 2,
            "stroke-width": series.lineWidth,
            "stroke-linejoin": "round",
            "stroke-dasharray": series.dash,
            stroke: seriesStyle.stroke || series.getLegendColor(index) || '#000',
            style: {
                cursor: 'pointer'
            }
        }));
    },
    
    /**
     * @private Creates series-shaped marker for Line and Scatter series.
     */
    drawMarker: function(x, y, z, markerConfig) {
        var me = this,
            surface = me.surface,
            series = me.series;

        return me.add('marker', Ext.chart.Shape[markerConfig.type](surface, {
            fill: markerConfig.fill,
            x: x,
            y: y,
            zIndex: (z || 0) + 2,
            radius: markerConfig.radius || markerConfig.size,
            style: {
                cursor: 'pointer'
            }
        }));
    },
    
    /**
     * @private Creates box-shaped marker for all series but Line and Scatter.
     */
    drawFilledBox: function(width, height, z, index) {
        var me = this,
            surface = me.surface,
            series = me.series;
            
        return me.add('box', surface.add({
            type: 'rect',
            zIndex: (z || 0) + 2,
            x: 0,
            y: 0,
            width: width,
            height: height,
            fill: series.getLegendColor(index),
            style: {
                cursor: 'pointer'
            }
        }));
    },
    
    /**
     * @private Draws label in bold when mouse cursor is over the item.
     */
    onMouseOver: function() {
        var me = this;
        
        me.label.setStyle({
            'font-weight': 'bold'
        });
        me.series._index = me.yFieldIndex;
        me.series.highlightItem();
    },
    
    /**
     * @private Draws label in normal when mouse cursor leaves the item.
     */
    onMouseOut: function() {
        var me = this,
            legend = me.legend,
            boldRe = me.boldRe;

        me.label.setStyle({
            'font-weight': legend.labelFont && boldRe.test(legend.labelFont) ? 'bold' : 'normal'
        });
        me.series._index = me.yFieldIndex;
        me.series.unHighlightItem();
    },
    
    /**
     * @private Toggles Series visibility upon mouse click on the item.
     */
    onMouseDown: function() {
        var me = this,
            index = me.yFieldIndex;

        if (!me.hiddenSeries) {
            me.series.hideAll(index);
            me.label.setAttributes({
                opacity: 0.5
            }, true);
        } else {
            me.series.showAll(index);
            me.label.setAttributes({
                opacity: 1
            }, true);
        }
        me.hiddenSeries = !me.hiddenSeries; 
        me.legend.chart.redraw();
    },

    /**
     * Update the positions of all this item's sprites to match the root position
     * of the legend box.
     * @param {Object} relativeTo (optional) If specified, this object's 'x' and 'y' values will be used
     *                 as the reference point for the relative positioning. Defaults to the Legend.
     */
    updatePosition: function(relativeTo) {
        var me = this,
            items = me.items,
            ln = items.length,
            currentX = me.x,
            currentY = me.y,
            item, i, x, y, translate, o,
            relativeX, relativeY;
            
        if (!relativeTo) {
            relativeTo = me.legend;
        }
        
        relativeX = relativeTo.x;
        relativeY = relativeTo.y;
        for (i = 0; i < ln; i++) {
            translate = true;
            item = items[i];
            switch (item.type) {
                case 'text':
                    x = 20 + relativeX + currentX;
                    y = relativeY + currentY;
                    translate = false;
                    break;
                case 'rect':
                    x = relativeX + currentX;
                    y = relativeY + currentY - 6;
                    break;
                default:
                    x = relativeX + currentX;
                    y = relativeY + currentY;
            }
            
            o = {
                x: x,
                y: y
            };
            item.setAttributes(translate ? {
                translate: o
            } : o, true);
        }
    }
});

Ext.define('Ext.rtl.chart.LegendItem', {
    override: 'Ext.chart.LegendItem',
    
    updatePosition: function(relativeTo) {
        var me = this,
            items = me.items,
            ln = items.length,
            legend = me.legend,
            currentX = me.x,
            currentY = me.y,
            item, i, x, y, translate, o, width,
            relativeX, relativeY;
            
        if (!relativeTo) {
            relativeTo = legend;
        }
            
        if (!legend.chart.getInherited().rtl || !relativeTo.width) {
            me.callParent(arguments);
            return;
        }
        
        relativeX = relativeTo.x;
        relativeY = relativeTo.y;
        width = relativeTo.width;
        for (i = 0; i < ln; i++) {
            translate = true;
            item = items[i];
            switch (item.type) {
                case 'text':
                    x = width + relativeX + currentX - 30 - item.getBBox().width; // -25 & -5 for a gap
                    y = relativeY + currentY;
                    translate = false;
                    break;
                case 'rect':
                    x = width + relativeX + currentX - 25;
                    y = relativeY + currentY - 6;
                    break;
                default:
                    x = width + relativeX + currentX - 25;
                    y = relativeY + currentY;
            }
            
            o = {
                x: x,
                y: y
            };
            
            item.setAttributes(translate ? {
                translate: o
            } : o, true);
        }
    }    
});

/**
 * @class Ext.chart.Legend
 *
 * Defines a legend for a chart's series.
 * The 'chart' member must be set prior to rendering.
 * The legend class displays a list of legend items each of them related with a
 * series being rendered. In order to render the legend item of the proper series
 * the series configuration object must have `showInLegend` set to true.
 *
 * The legend configuration object accepts a `position` as parameter.
 * The `position` parameter can be `left`, `right`
 * `top` or `bottom`. For example:
 *
 *     legend: {
 *         position: 'right'
 *     },
 *
 * ## Example
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *         data: [
 *             { 'name': 'metric one',   'data1': 10, 'data2': 12, 'data3': 14, 'data4': 8,  'data5': 13 },
 *             { 'name': 'metric two',   'data1': 7,  'data2': 8,  'data3': 16, 'data4': 10, 'data5': 3  },
 *             { 'name': 'metric three', 'data1': 5,  'data2': 2,  'data3': 14, 'data4': 12, 'data5': 7  },
 *             { 'name': 'metric four',  'data1': 2,  'data2': 14, 'data3': 6,  'data4': 1,  'data5': 23 },
 *             { 'name': 'metric five',  'data1': 27, 'data2': 38, 'data3': 36, 'data4': 13, 'data5': 33 }
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         store: store,
 *         shadow: true,
 *         theme: 'Category1',
 *         legend: {
 *             position: 'top'
 *         },
 *         axes: [
 *             {
 *                 type: 'Numeric',
 *                 position: 'left',
 *                 fields: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *                 title: 'Sample Values',
 *                 grid: {
 *                     odd: {
 *                         opacity: 1,
 *                         fill: '#ddd',
 *                         stroke: '#bbb',
 *                         'stroke-width': 1
 *                     }
 *                 },
 *                 minimum: 0,
 *                 adjustMinimumByMajorUnit: 0
 *             },
 *             {
 *                 type: 'Category',
 *                 position: 'bottom',
 *                 fields: ['name'],
 *                 title: 'Sample Metrics',
 *                 grid: true,
 *                 label: {
 *                     rotate: {
 *                         degrees: 315
 *                     }
 *                 }
 *             }
 *         ],
 *         series: [{
 *             type: 'area',
 *             highlight: false,
 *             axis: 'left',
 *             xField: 'name',
 *             yField: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *             style: {
 *                 opacity: 0.93
 *             }
 *         }]
 *     });
 */
Ext.define('Ext.chart.Legend', {

    /* Begin Definitions */

    requires: ['Ext.chart.LegendItem'],

    /* End Definitions */

    /**
     * @cfg {Boolean} visible
     * Whether or not the legend should be displayed.
     */
    visible: true,
    
    /**
     * @cfg {Boolean} update
     * If set to true the legend will be refreshed when the chart is.
     * This is useful to update the legend items if series are
     * added/removed/updated from the chart. Default is true.
     */
    update: true,

    /**
     * @cfg {String} position
     * The position of the legend in relation to the chart. One of: "top",
     * "bottom", "left", "right", or "float". If set to "float", then the legend
     * box will be positioned at the point denoted by the x and y parameters.
     */
    position: 'bottom',

    /**
     * @cfg {Number} x
     * X-position of the legend box. Used directly if position is set to "float", otherwise
     * it will be calculated dynamically.
     */
    x: 0,

    /**
     * @cfg {Number} y
     * Y-position of the legend box. Used directly if position is set to "float", otherwise
     * it will be calculated dynamically.
     */
    y: 0,

    /**
     * @cfg {String} labelColor
     * Color to be used for the legend labels, eg '#000'
     */
    labelColor: '#000',

    /**
     * @cfg {String} labelFont
     * Font to be used for the legend labels, eg '12px Helvetica'
     */
    labelFont: '12px Helvetica, sans-serif',

    /**
     * @cfg {String} boxStroke
     * Style of the stroke for the legend box
     */
    boxStroke: '#000',

    /**
     * @cfg {Number} boxStrokeWidth
     * Width of the stroke for the legend box
     */
    boxStrokeWidth: 1,

    /**
     * @cfg {String} boxFill
     * Fill style for the legend box
     */
    boxFill: '#FFF',

    /**
     * @cfg {Number} itemSpacing
     * Amount of space between legend items
     */
    itemSpacing: 10,

    /**
     * @cfg {Number} padding
     * Amount of padding between the legend box's border and its items
     */
    padding: 5,

    // @private
    width: 0,
    // @private
    height: 0,

    /**
     * @cfg {Number} boxZIndex
     * Sets the z-index for the legend. Defaults to 100.
     */
    boxZIndex: 100,

    /**
     * Creates new Legend.
     * @param {Object} config  (optional) Config object.
     */
    constructor: function(config) {
        var me = this;
        if (config) {
            Ext.apply(me, config);
        }
        me.items = [];
        /**
         * Whether the legend box is oriented vertically, i.e. if it is on the left or right side or floating.
         * @type {Boolean}
         */
        me.isVertical = ("left|right|float".indexOf(me.position) !== -1);

        // cache these here since they may get modified later on
        me.origX = me.x;
        me.origY = me.y;
    },

    /**
     * @private Create all the sprites for the legend
     */
    create: function() {
        var me = this,
            seriesItems = me.chart.series.items,
            i, ln, series;

        me.createBox();
        
        if (me.rebuild !== false) {
            me.createItems();
        }
        
        if (!me.created && me.isDisplayed()) {
            me.created = true;

            // Listen for changes to series titles to trigger regeneration of the legend
            for (i = 0, ln = seriesItems.length; i < ln; i++) {
                series = seriesItems[i];
                series.on('titlechange', me.redraw, me);
            }
        }
    },
    
    init: Ext.emptyFn,

    /**
     * @private Redraws the Legend
     */
    redraw: function() {
        var me = this;
        
        me.create();
        me.updatePosition();
    },

    /**
     * @private Determine whether the legend should be displayed. Looks at the legend's 'visible' config,
     * and also the 'showInLegend' config for each of the series.
     */
    isDisplayed: function() {
        return this.visible && this.chart.series.findIndex('showInLegend', true) !== -1;
    },

    /**
     * @private Create the series markers and labels
     */
    createItems: function() {
        var me = this,
            seriesItems = me.chart.series.items,
            items = me.items,
            fields, i, li, j, lj, series, item;

        //remove all legend items
        me.removeItems();
        
        // Create all the item labels
        for (i = 0, li = seriesItems.length; i < li; i++) {
            series = seriesItems[i];
            
            if (series.showInLegend) {
                fields = [].concat(series.yField);
                
                for (j = 0, lj = fields.length; j < lj; j++) {
                    item = me.createLegendItem(series, j);
                    items.push(item);
                }
            }
        }
        
        me.alignItems();
    },
    
    /**
     * @private Removes all legend items.
     */
    removeItems: function() {
        var me = this,
            items = me.items,
            len = items ? items.length : 0,
            i;

        if (len) {
            for (i = 0; i < len; i++) {
                items[i].destroy();
            }
        }
        
        //empty array
        items.length = [];
    },
    
    /**
     * @private
     * Positions all items within Legend box.
     */
    alignItems: function() {
        var me = this,
            padding = me.padding,
            vertical = me.isVertical,
            mfloor = Math.floor,
            dim, maxWidth, maxHeight, totalWidth, totalHeight;
        
        dim = me.updateItemDimensions();

        maxWidth    = dim.maxWidth;
        maxHeight   = dim.maxHeight;
        totalWidth  = dim.totalWidth;
        totalHeight = dim.totalHeight;

        // Store the collected dimensions for later
        me.width = mfloor((vertical ? maxWidth : totalWidth) + padding * 2);
        me.height = mfloor((vertical ? totalHeight : maxHeight) + padding * 2);
    },
    
    updateItemDimensions: function() {
        var me = this,
            items = me.items,
            padding = me.padding,
            itemSpacing = me.itemSpacing,
            maxWidth = 0,
            maxHeight = 0,
            totalWidth = 0,
            totalHeight = 0,
            vertical = me.isVertical,
            mfloor = Math.floor,
            mmax = Math.max,
            spacing = 0,
            i, l, item, bbox, width, height;

        // Collect item dimensions and position each one
        // properly in relation to the previous item
        for (i = 0, l = items.length; i < l; i++) {
            item = items[i];
                
            bbox = item.getBBox();

            //always measure from x=0, since not all markers go all the way to the left
            width  = bbox.width;
            height = bbox.height;

            spacing = (i === 0 ? 0 : itemSpacing);
            
            // Set the item's position relative to the legend box
            item.x = padding + mfloor(vertical ? 0 : totalWidth + spacing);
            item.y = padding + mfloor(vertical ? totalHeight + spacing : 0) + height / 2;

            // Collect cumulative dimensions
            totalWidth  += spacing + width;
            totalHeight += spacing + height;
            maxWidth     = mmax(maxWidth, width);
            maxHeight    = mmax(maxHeight, height);
        }

        return {
            totalWidth:  totalWidth,
            totalHeight: totalHeight,
            maxWidth:    maxWidth,
            maxHeight:   maxHeight
        };
    },
    
    /**
     * @private Creates single Legend Item
     */
    createLegendItem: function(series, yFieldIndex) {
        var me = this;
        
        return new Ext.chart.LegendItem({
            legend: me,
            series: series,
            surface: me.chart.surface,
            yFieldIndex: yFieldIndex
        });
    },
    
    /**
     * @private Get the bounds for the legend's outer box
     */
    getBBox: function() {
        var me = this;
        return {
            x: Math.round(me.x) - me.boxStrokeWidth / 2,
            y: Math.round(me.y) - me.boxStrokeWidth / 2,
            width: me.width + me.boxStrokeWidth,
            height: me.height + me.boxStrokeWidth
        };
    },

    /**
     * @private Create the box around the legend items
     */
    createBox: function() {
        var me = this,
            box, bbox;

        if (me.boxSprite) {
            me.boxSprite.destroy();
        }

        bbox = me.getBBox();
        //if some of the dimensions are NaN this means that we
        //cannot set a specific width/height for the legend
        //container. One possibility for this is that there are
        //actually no items to show in the legend, and the legend
        //should be hidden.
        if (isNaN(bbox.width) || isNaN(bbox.height)) {
            me.boxSprite = false;
            return;
        }
        
        box = me.boxSprite = me.chart.surface.add(Ext.apply({
            type: 'rect',
            stroke: me.boxStroke,
            "stroke-width": me.boxStrokeWidth,
            fill: me.boxFill,
            zIndex: me.boxZIndex
        }, bbox));

        box.redraw();
    },

    /**
     * @private Calculates Legend position with respect to other Chart elements.
     */
    calcPosition: function() {
        var me = this,
            x, y,
            legendWidth = me.width,
            legendHeight = me.height,
            chart = me.chart,
            chartBBox = chart.chartBBox,
            insets = chart.insetPadding,
            chartWidth = chartBBox.width - (insets * 2),
            chartHeight = chartBBox.height - (insets * 2),
            chartX = chartBBox.x + insets,
            chartY = chartBBox.y + insets,
            surface = chart.surface,
            mfloor = Math.floor;

        // Find the position based on the dimensions
        switch(me.position) {
            case "left":
                x = insets;
                y = mfloor(chartY + chartHeight / 2 - legendHeight / 2);
                break;
            case "right":
                x = mfloor(surface.width - legendWidth) - insets;
                y = mfloor(chartY + chartHeight / 2 - legendHeight / 2);
                break;
            case "top":
                x = mfloor(chartX + chartWidth / 2 - legendWidth / 2);
                y = insets;
                break;
            case "bottom":
                x = mfloor(chartX + chartWidth / 2 - legendWidth / 2);
                y = mfloor(surface.height - legendHeight) - insets;
                break;
            default:
                x = mfloor(me.origX) + insets;
                y = mfloor(me.origY) + insets;
        }
        
        return { x: x, y: y };
    },
    
    /**
     * @private Update the position of all the legend's sprites to match its current x/y values
     */
    updatePosition: function() {
        var me = this,
            items = me.items,
            pos, i, l, bbox;

        if (me.isDisplayed()) {
            // Find the position based on the dimensions
            pos = me.calcPosition();
            
            me.x = pos.x;
            me.y = pos.y;

            // Update the position of each item
            for (i = 0, l = items.length; i < l; i++) {
                items[i].updatePosition();
            }

            bbox = me.getBBox();

            //if some of the dimensions are NaN this means that we
            //cannot set a specific width/height for the legend
            //container. One possibility for this is that there are
            //actually no items to show in the legend, and the legend
            //should be hidden.
            if (isNaN(bbox.width) || isNaN(bbox.height)) {
                if (me.boxSprite) {
                    me.boxSprite.hide(true);
                }
            }
            else {
                if (!me.boxSprite) {
                    me.createBox();
                }
                
                // Update the position of the outer box
                me.boxSprite.setAttributes(bbox, true);
                me.boxSprite.show(true);
            }
        }
    },
    
    /** toggle
     * @param {Boolean} show Whether to show or hide the legend.
     *
     */
    toggle: function(show) {
      var me = this,
          i = 0,
          items = me.items,
          len = items.length;

      if (me.boxSprite) {
          if (show) {
              me.boxSprite.show(true);
          } else {
              me.boxSprite.hide(true);
          }
      }

      for (; i < len; ++i) {
          if (show) {
            items[i].show(true);
          } else {
              items[i].hide(true);
          }
      }

      me.visible = show;
    }
});

Ext.define('Ext.rtl.chart.Legend', {
    override: 'Ext.chart.Legend',
    
    init: function() {
        var me = this;   
        
        me.callParent(arguments);
        me.position = me.chart.invertPosition(me.position);    
        me.rtl = me.chart.getInherited().rtl;
    },
    
    updateItemDimensions: function() {
        var me = this,
            result = me.callParent(),
            padding = me.padding,
            spacing = me.itemSpacing,
            items = me.items,
            len = items.length,
            mfloor = Math.floor,
            width = result.totalWidth,
            usedWidth = 0,
            i, item, itemWidth;
            
        if (me.rtl && !me.isVertical) {
            for (i = 0; i < len; ++i) {
                item = items[i];
 
                // Set the item's position relative to the legend box
                itemWidth = mfloor(item.getBBox().width + spacing);
                item.x = -usedWidth + padding;
                usedWidth += itemWidth;
            }
        }
        return result;
    }
});

/**
 * Provides default colors for non-specified things. Should be sub-classed when creating new themes.
 * @private
 */
Ext.define('Ext.chart.theme.Base', {

    /* Begin Definitions */

    requires: ['Ext.chart.theme.Theme'],

    /* End Definitions */

    constructor: function(config) {
        var ident = Ext.identityFn;
        Ext.chart.theme.call(this, config, {
            background: false,
            axis: {
                stroke: '#444',
                'stroke-width': 1
            },
            axisLabelTop: {
                fill: '#444',
                font: '12px Arial, Helvetica, sans-serif',
                spacing: 2,
                padding: 5,
                renderer: ident
            },
            axisLabelRight: {
                fill: '#444',
                font: '12px Arial, Helvetica, sans-serif',
                spacing: 2,
                padding: 5,
                renderer: ident
            },
            axisLabelBottom: {
                fill: '#444',
                font: '12px Arial, Helvetica, sans-serif',
                spacing: 2,
                padding: 5,
                renderer: ident
            },
            axisLabelLeft: {
                fill: '#444',
                font: '12px Arial, Helvetica, sans-serif',
                spacing: 2,
                padding: 5,
                renderer: ident
            },
            axisTitleTop: {
                font: 'bold 18px Arial',
                fill: '#444'
            },
            axisTitleRight: {
                font: 'bold 18px Arial',
                fill: '#444',
                rotate: {
                    x:0, y:0,
                    degrees: 270
                }
            },
            axisTitleBottom: {
                font: 'bold 18px Arial',
                fill: '#444'
            },
            axisTitleLeft: {
                font: 'bold 18px Arial',
                fill: '#444',
                rotate: {
                    x:0, y:0,
                    degrees: 270
                }
            },
            series: {
                'stroke-width': 0
            },
            seriesLabel: {
                font: '12px Arial',
                fill: '#333'
            },
            marker: {
                stroke: '#555',
                radius: 3,
                size: 3
            },
            colors: [ "#94ae0a", "#115fa6","#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"],
            seriesThemes: [{
                fill: "#94ae0a"
            }, {
                fill: "#115fa6"
            }, {
                fill: "#a61120"
            }, {
                fill: "#ff8809"
            }, {
                fill: "#ffd13e"
            }, {
                fill: "#a61187"
            }, {
                fill: "#24ad9a"
            }, {
                fill: "#7c7474"
            }, {
                fill: "#115fa6"
            }, {
                fill: "#94ae0a"
            }, {
                fill: "#a61120"
            }, {
                fill: "#ff8809"
            }, {
                fill: "#ffd13e"
            }, {
                fill: "#a61187"
            }, {
                fill: "#24ad9a"
            }, {
                fill: "#7c7474"
            }, {
                fill: "#a66111"
            }],
            markerThemes: [{
                fill: "#115fa6",
                type: 'circle' 
            }, {
                fill: "#94ae0a",
                type: 'cross'
            }, {
                fill: "#115fa6",
                type: 'plus' 
            }, {
                fill: "#94ae0a",
                type: 'circle'
            }, {
                fill: "#a61120",
                type: 'cross'
            }]
        });
    }
}, function() {
    var palette = ['#b1da5a', '#4ce0e7', '#e84b67', '#da5abd', '#4d7fe6', '#fec935'],
        names = ['Green', 'Sky', 'Red', 'Purple', 'Blue', 'Yellow'],
        i = 0, j = 0, l = palette.length, themes = Ext.chart.theme,
        categories = [['#f0a50a', '#c20024', '#2044ba', '#810065', '#7eae29'],
                      ['#6d9824', '#87146e', '#2a9196', '#d39006', '#1e40ac'],
                      ['#fbbc29', '#ce2e4e', '#7e0062', '#158b90', '#57880e'],
                      ['#ef5773', '#fcbd2a', '#4f770d', '#1d3eaa', '#9b001f'],
                      ['#7eae29', '#fdbe2a', '#910019', '#27b4bc', '#d74dbc'],
                      ['#44dce1', '#0b2592', '#996e05', '#7fb325', '#b821a1']],
        cats = categories.length;
    
    //Create themes from base colors
    for (; i < l; i++) {
        themes[names[i]] = (function(color) {
            return Ext.extend(themes.Base, {
                constructor: function(config) {
                    themes.Base.prototype.constructor.call(this, Ext.apply({
                        baseColor: color
                    }, config));
                }
            });
        }(palette[i]));
    }
    
    //Create theme from color array
    for (i = 0; i < cats; i++) {
        themes['Category' + (i + 1)] = (function(category) {
            return Ext.extend(themes.Base, {
                constructor: function(config) {
                    themes.Base.prototype.constructor.call(this, Ext.apply({
                        colors: category
                    }, config));
                }
            });
        }(categories[i]));
    }
});

/**
 * Charts provide a flexible way to achieve a wide range of data visualization capablitities.
 * Each Chart gets its data directly from a {@link Ext.data.Store Store}, and automatically
 * updates its display whenever data in the Store changes. In addition, the look and feel
 * of a Chart can be customized using {@link Ext.chart.theme.Theme Theme}s.
 * 
 * ## Creating a Simple Chart
 * 
 * Every Chart has three key parts - a {@link Ext.data.Store Store} that contains the data,
 * an array of {@link Ext.chart.axis.Axis Axes} which define the boundaries of the Chart,
 * and one or more {@link Ext.chart.series.Series Series} to handle the visual rendering of the data points.
 * 
 * ### 1. Creating a Store
 * 
 * The first step is to create a {@link Ext.data.Model Model} that represents the type of
 * data that will be displayed in the Chart. For example the data for a chart that displays
 * a weather forecast could be represented as a series of "WeatherPoint" data points with
 * two fields - "temperature", and "date":
 * 
 *     Ext.define('WeatherPoint', {
 *         extend: 'Ext.data.Model',
 *         fields: ['temperature', 'date']
 *     });
 * 
 * Next a {@link Ext.data.Store Store} must be created.  The store contains a collection of "WeatherPoint" Model instances.
 * The data could be loaded dynamically, but for sake of ease this example uses inline data:
 * 
 *     var store = Ext.create('Ext.data.Store', {
 *         model: 'WeatherPoint',
 *         data: [
 *             { temperature: 58, date: new Date(2011, 1, 1, 8) },
 *             { temperature: 63, date: new Date(2011, 1, 1, 9) },
 *             { temperature: 73, date: new Date(2011, 1, 1, 10) },
 *             { temperature: 78, date: new Date(2011, 1, 1, 11) },
 *             { temperature: 81, date: new Date(2011, 1, 1, 12) }
 *         ]
 *     });
 *    
 * For additional information on Models and Stores please refer to the [Data Guide](#/guide/data).
 * 
 * ### 2. Creating the Chart object
 * 
 * Now that a Store has been created it can be used in a Chart:
 * 
 *     Ext.create('Ext.chart.Chart', {
 *        renderTo: Ext.getBody(),
 *        width: 400,
 *        height: 300,
 *        store: store
 *     });
 *    
 * That's all it takes to create a Chart instance that is backed by a Store.
 * However, if the above code is run in a browser, a blank screen will be displayed.
 * This is because the two pieces that are responsible for the visual display,
 * the Chart's {@link #cfg-axes axes} and {@link #cfg-series series}, have not yet been defined.
 * 
 * ### 3. Configuring the Axes
 * 
 * {@link Ext.chart.axis.Axis Axes} are the lines that define the boundaries of the data points that a Chart can display.
 * This example uses one of the most common Axes configurations - a horizontal "x" axis, and a vertical "y" axis:
 * 
 *     Ext.create('Ext.chart.Chart', {
 *         ...
 *         axes: [
 *             {
 *                 title: 'Temperature',
 *                 type: 'Numeric',
 *                 position: 'left',
 *                 fields: ['temperature'],
 *                 minimum: 0,
 *                 maximum: 100
 *             },
 *             {
 *                 title: 'Time',
 *                 type: 'Time',
 *                 position: 'bottom',
 *                 fields: ['date'],
 *                 dateFormat: 'ga'
 *             }
 *         ]
 *     });
 *    
 * The "Temperature" axis is a vertical {@link Ext.chart.axis.Numeric Numeric Axis} and is positioned on the left edge of the Chart.
 * It represents the bounds of the data contained in the "WeatherPoint" Model's "temperature" field that was
 * defined above. The minimum value for this axis is "0", and the maximum is "100".
 * 
 * The horizontal axis is a {@link Ext.chart.axis.Time Time Axis} and is positioned on the bottom edge of the Chart.
 * It represents the bounds of the data contained in the "WeatherPoint" Model's "date" field.
 * The {@link Ext.chart.axis.Time#cfg-dateFormat dateFormat}
 * configuration tells the Time Axis how to format it's labels.
 * 
 * Here's what the Chart looks like now that it has its Axes configured:
 * 
 * {@img Ext.chart.Chart/Ext.chart.Chart1.png Chart Axes}
 * 
 * ### 4. Configuring the Series
 * 
 * The final step in creating a simple Chart is to configure one or more {@link Ext.chart.series.Series Series}.
 * Series are responsible for the visual representation of the data points contained in the Store.
 * This example only has one Series:
 * 
 *     Ext.create('Ext.chart.Chart', {
 *         ...
 *         axes: [
 *             ...
 *         ],
 *         series: [
 *             {
 *                 type: 'line',
 *                 xField: 'date',
 *                 yField: 'temperature'
 *             }
 *         ]
 *     });
 *     
 * This Series is a {@link Ext.chart.series.Line Line Series}, and it uses the "date" and "temperature" fields
 * from the "WeatherPoint" Models in the Store to plot its data points:
 * 
 * {@img Ext.chart.Chart/Ext.chart.Chart2.png Line Series}
 * 
 * See the [Line Charts Example](#!/example/charts/Charts.html) for a live demo.
 * 
 * ## Themes
 * 
 * The color scheme for a Chart can be easily changed using the {@link #cfg-theme theme} configuration option:
 * 
 *     Ext.create('Ext.chart.Chart', {
 *         ...
 *         theme: 'Green',
 *         ...
 *     });
 * 
 * {@img Ext.chart.Chart/Ext.chart.Chart3.png Green Theme}
 * 
 * For more information on Charts please refer to the [Charting Guide](#/guide/charting).
 */
Ext.define('Ext.chart.Chart', {
    extend: 'Ext.draw.Component',

    alias: 'widget.chart',
    
    mixins: [
        'Ext.chart.theme.Theme',
        'Ext.chart.Mask',
        'Ext.chart.Navigation',
        'Ext.util.StoreHolder',
        'Ext.util.Observable'
    ],

    uses: [
        'Ext.chart.series.Series'
    ],
    
    requires: [
        'Ext.util.MixedCollection',
        'Ext.data.StoreManager',
        'Ext.chart.Legend',
        'Ext.chart.theme.Base',
        'Ext.chart.theme.Theme',
        'Ext.util.DelayedTask'
    ],

    /* End Definitions */

    // @private
    viewBox: false,

    /**
     * @cfg {String} theme
     * The name of the theme to be used. A theme defines the colors and other visual displays of tick marks
     * on axis, text, title text, line colors, marker colors and styles, etc. Possible theme values are 'Base', 'Green',
     * 'Sky', 'Red', 'Purple', 'Blue', 'Yellow' and also six category themes 'Category1' to 'Category6'. Default value
     * is 'Base'.
     */

    /**
     * @cfg {Boolean/Object} animate
     * True for the default animation (easing: 'ease' and duration: 500) or a standard animation config
     * object to be used for default chart animations. Defaults to false.
     */
    animate: false,

    /**
     * @cfg {Boolean/Object} legend
     * True for the default legend display or a {@link Ext.chart.Legend} config object.
     */
    legend: false,

    /**
     * @cfg {Number} insetPadding
     * The amount of inset padding in pixels for the chart. Defaults to 10.
     */
    insetPadding: 10,

    /**
     * @cfg {Object/Boolean} background
     * The chart background. This can be a gradient object, image, or color. Defaults to false for no
     * background. For example, if `background` were to be a color we could set the object as
     *
     *     background: {
     *         //color string
     *         fill: '#ccc'
     *     }
     *
     * You can specify an image by using:
     *
     *     background: {
     *         image: 'http://path.to.image/'
     *     }
     *
     * Also you can specify a gradient by using the gradient object syntax:
     *
     *     background: {
     *         gradient: {
     *             id: 'gradientId',
     *             angle: 45,
     *             stops: {
     *                 0: {
     *                     color: '#555'
     *                 }
     *                 100: {
     *                     color: '#ddd'
     *                 }
     *             }
     *         }
     *     }
     */
    background: false,

    /**
     * @cfg {Object[]} gradients
     * Define a set of gradients that can be used as `fill` property in sprites. The gradients array is an
     * array of objects with the following properties:
     *
     * - **id** - string - The unique name of the gradient.
     * - **angle** - number, optional - The angle of the gradient in degrees.
     * - **stops** - object - An object with numbers as keys (from 0 to 100) and style objects as values
     *
     * For example:
     *
     *     gradients: [{
     *         id: 'gradientId',
     *         angle: 45,
     *         stops: {
     *             0: {
     *                 color: '#555'
     *             },
     *             100: {
     *                 color: '#ddd'
     *             }
     *         }
     *     }, {
     *         id: 'gradientId2',
     *         angle: 0,
     *         stops: {
     *             0: {
     *                 color: '#590'
     *             },
     *             20: {
     *                 color: '#599'
     *             },
     *             100: {
     *                 color: '#ddd'
     *             }
     *         }
     *     }]
     *
     * Then the sprites can use `gradientId` and `gradientId2` by setting the fill attributes to those ids, for example:
     *
     *     sprite.setAttributes({
     *         fill: 'url(#gradientId)'
     *     }, true);
     */

    /**
     * @cfg {Ext.data.Store} store
     * The store that supplies data to this chart.
     */

    /**
     * @cfg {Ext.chart.series.Series[]} series
     * Array of {@link Ext.chart.series.Series Series} instances or config objects.  For example:
     * 
     *     series: [{
     *         type: 'column',
     *         axis: 'left',
     *         listeners: {
     *             'afterrender': function() {
     *                 console('afterrender');
     *             }
     *         },
     *         xField: 'category',
     *         yField: 'data1'
     *     }]
     */

    /**
     * @cfg {Ext.chart.axis.Axis[]} axes
     * Array of {@link Ext.chart.axis.Axis Axis} instances or config objects.  For example:
     * 
     *     axes: [{
     *         type: 'Numeric',
     *         position: 'left',
     *         fields: ['data1'],
     *         title: 'Number of Hits',
     *         minimum: 0,
     *         //one minor tick between two major ticks
     *         minorTickSteps: 1
     *     }, {
     *         type: 'Category',
     *         position: 'bottom',
     *         fields: ['name'],
     *         title: 'Month of the Year'
     *     }]
     */
    
    refreshBuffer: 1,

    /**
     * @event beforerefresh
     * Fires before a refresh to the chart data is called. If the beforerefresh handler returns false the
     * {@link #event-refresh} action will be cancelled.
     * @param {Ext.chart.Chart} this
     */

    /**
     * @event refresh
     * Fires after the chart data has been refreshed.
     * @param {Ext.chart.Chart} this
     */

    constructor: function(config) {
        var me = this,
            defaultAnim;

        config = Ext.apply({}, config);
        me.initTheme(config.theme || me.theme);
        if (me.gradients) {
            Ext.apply(config, { gradients: me.gradients });
        }
        if (me.background) {
            Ext.apply(config, { background: me.background });
        }
        if (config.animate) {
            defaultAnim = {
                easing: 'ease',
                duration: 500
            };
            if (Ext.isObject(config.animate)) {
                config.animate = Ext.applyIf(config.animate, defaultAnim);
            }
            else {
                config.animate = defaultAnim;
            }
        }

        me.mixins.observable.constructor.call(me, config);
        
        if (config.mask) {
            config = Ext.apply({ enableMask: true }, config);
        }
        
        if (config.enableMask) {
            me.mixins.mask.constructor.call(me, config);
        }
        me.mixins.navigation.constructor.call(me);
        me.callParent([config]);
    },
    
    getChartStore: function(){
        return this.substore || this.store;
    },

    initComponent: function() {
        var me = this,
            axes,
            series;
        me.callParent();

        Ext.applyIf(me, {
            zoom: {
                width: 1,
                height: 1,
                x: 0,
                y: 0
            }
        });
        me.maxGutters = { left: 0, right: 0, bottom: 0, top: 0 };
        me.store = Ext.data.StoreManager.lookup(me.store);
        axes = me.axes;
        me.axes = new Ext.util.MixedCollection(false, function(a) { return a.position; });
        if (axes) {
            me.axes.addAll(axes);
        }
        series = me.series;
        me.series = new Ext.util.MixedCollection(false, function(a) { return a.seriesId || (a.seriesId = Ext.id(null, 'ext-chart-series-')); });
        if (series) {
            me.series.addAll(series);
        }
        if (me.legend !== false) {
            me.legend = new Ext.chart.Legend(Ext.applyIf({
                chart: me
            }, me.legend));
        }

        me.on({
            mousemove: me.onMouseMove,
            mouseleave: me.onMouseLeave,
            mousedown: me.onMouseDown,
            mouseup: me.onMouseUp,
            click: me.onClick,
            dblclick: me.onDblClick,
            scope: me
        });
    },

    // @private overrides the component method to set the correct dimensions to the chart.
    afterComponentLayout: function(width, height, oldWidth, oldHeight) {
        var me = this;
        if (Ext.isNumber(width) && Ext.isNumber(height)) {
            if (width !== oldWidth || height !== oldHeight) {
                me.curWidth = width;
                me.curHeight = height;
                me.redraw(true);
                me.needsRedraw = false;
            } else if (me.needsRedraw) {
                me.redraw();
                me.needsRedraw = false;
            }
        }
        this.callParent(arguments);
    },

    /**
     * Redraws the chart. If animations are set this will animate the chart too. 
     * @param {Boolean} resize (optional) flag which changes the default origin points of the chart for animations.
     */
    redraw: function(resize) {
        var me = this,
            seriesItems = me.series.items,
            seriesLen = seriesItems.length,
            axesItems = me.axes.items,
            axesLen = axesItems.length,
            themeIndex = 0,
            i, item,
            chartBBox = me.chartBBox = {
                x: 0,
                y: 0,
                height: me.curHeight,
                width: me.curWidth
            },
            legend = me.legend, 
            series;
            
        me.surface.setSize(chartBBox.width, chartBBox.height);
        // Instantiate Series and Axes
        for (i = 0; i < seriesLen; i++) {
            item = seriesItems[i];
            if (!item.initialized) {
                series = me.initializeSeries(item, i, themeIndex);
            } else {
                series = item;
            }
            // Allow the series to react to a redraw, for example, a pie series
            // backed by a remote data set needs to build legend labels correctly
            series.onRedraw();
            // For things like stacked bar charts, a single series can consume
            // multiple colors from the index, so we compensate for it here
            if (Ext.isArray(item.yField)) {
                themeIndex += item.yField.length;
            } else {
                ++themeIndex;
            }
        }
        for (i = 0; i < axesLen; i++) {
            item = axesItems[i];
            if (!item.initialized) {
                me.initializeAxis(item);
            }
        }
        //process all views (aggregated data etc) on stores
        //before rendering.
        for (i = 0; i < axesLen; i++) {
            axesItems[i].processView();
        }
        for (i = 0; i < axesLen; i++) {
            axesItems[i].drawAxis(true);
        }

        // Create legend if not already created
        if (legend !== false && legend.visible) {
            if (legend.update || !legend.created) {
                legend.create();
            }
        }

        // Place axes properly, including influence from each other
        me.alignAxes();

        // Reposition legend based on new axis alignment
        if (legend !== false && legend.visible) {
            legend.updatePosition();
        }

        // Find the max gutters
        me.getMaxGutters();

        // Draw axes and series
        me.resizing = !!resize;

        for (i = 0; i < axesLen; i++) {
            axesItems[i].drawAxis();
        }
        for (i = 0; i < seriesLen; i++) {
            me.drawCharts(seriesItems[i]);
        }
        me.resizing = false;
    },

    // @private set the store after rendering the chart.
    afterRender: function() {
        var me = this,
            legend = me.legend;
        
        me.callParent(arguments);

        if (me.categoryNames) {
            me.setCategoryNames(me.categoryNames);
        }
        
        if (legend) {
            legend.init();
        }

        me.bindStore(me.store, true);
        me.refresh();

        if (me.surface.engine === 'Vml') {
            me.on('added', me.onAddedVml, me);
            me.mon(Ext.GlobalEvents, 'added', me.onContainerAddedVml, me);
        }
    },

    // When using a vml surface we need to redraw when this chart or one of its ancestors
    // is moved to a new container after render, because moving the vml chart causes the
    // vml elements to go haywire, some displaing incorrectly or not displaying at all.
    // This appears to be caused by the component being moved to the detached body element
    // before being added to the new container.
    onAddedVml: function() {
        this.needsRedraw = true; // redraw after component layout
    },

    onContainerAddedVml: function(container) {
        if (this.isDescendantOf(container)) {
            this.needsRedraw = true; // redraw after component layout
        }
    },

    // @private get x and y position of the mouse cursor.
    getEventXY: function(e) {
        var box = this.surface.getRegion(),
            pageXY = e.getXY(),
            x = pageXY[0] - box.left,
            y = pageXY[1] - box.top;
            
        return [x, y];
    },
    
    onClick: function(e) {
        this.handleClick('itemclick', e);
    },
    
    onDblClick: function(e) {
        this.handleClick('itemdblclick', e);
    },

    // @private wrap the mouse down position to delegate the event to the series.
    handleClick: function(name, e) {
        var me = this,
            position = me.getEventXY(e),
            seriesItems = me.series.items,
            i, ln, series,
            item;

        // Ask each series if it has an item corresponding to (not necessarily exactly
        // on top of) the current mouse coords. Fire itemclick event.
        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            series = seriesItems[i];
            if (Ext.draw.Draw.withinBox(position[0], position[1], series.bbox)) {
                if (series.getItemForPoint) {
                    item = series.getItemForPoint(position[0], position[1]);
                    if (item) {
                        series.fireEvent(name, item);
                    }
                }
            }
        }
    },

    // @private wrap the mouse down position to delegate the event to the series.
    onMouseDown: function(e) {
        var me = this,
            position = me.getEventXY(e),
            seriesItems = me.series.items,
            i, ln, series,
            item;

        if (me.enableMask) {
            me.mixins.mask.onMouseDown.call(me, e);
        }
        // Ask each series if it has an item corresponding to (not necessarily exactly
        // on top of) the current mouse coords. Fire itemmousedown event.
        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            series = seriesItems[i];
            if (Ext.draw.Draw.withinBox(position[0], position[1], series.bbox)) {
                if (series.getItemForPoint) {
                    item = series.getItemForPoint(position[0], position[1]);
                    if (item) {
                        series.fireEvent('itemmousedown', item);
                    }
                }
            }
        }
    },

    // @private wrap the mouse up event to delegate it to the series.
    onMouseUp: function(e) {
        var me = this,
            position = me.getEventXY(e),
            seriesItems = me.series.items,
            i, ln, series,
            item;

        if (me.enableMask) {
            me.mixins.mask.onMouseUp.call(me, e);
        }
        // Ask each series if it has an item corresponding to (not necessarily exactly
        // on top of) the current mouse coords. Fire itemmouseup event.
        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            series = seriesItems[i];
            if (Ext.draw.Draw.withinBox(position[0], position[1], series.bbox)) {
                if (series.getItemForPoint) {
                    item = series.getItemForPoint(position[0], position[1]);
                    if (item) {
                        series.fireEvent('itemmouseup', item);
                    }
                }
            }
        }
    },

    // @private wrap the mouse move event so it can be delegated to the series.
    onMouseMove: function(e) {
        var me = this,
            position = me.getEventXY(e),
            seriesItems = me.series.items,
            i, ln, series,
            item, last, storeItem, storeField;

        
        if (me.enableMask) {
            me.mixins.mask.onMouseMove.call(me, e);
        }
        // Ask each series if it has an item corresponding to (not necessarily exactly
        // on top of) the current mouse coords. Fire itemmouseover/out events.
        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            series = seriesItems[i];
            if (Ext.draw.Draw.withinBox(position[0], position[1], series.bbox)) {
                if (series.getItemForPoint) {
                    item = series.getItemForPoint(position[0], position[1]);
                    last = series._lastItemForPoint;
                    storeItem = series._lastStoreItem;
                    storeField = series._lastStoreField;


                    if (item !== last || item && (item.storeItem != storeItem || item.storeField != storeField)) {
                        if (last) {
                            series.fireEvent('itemmouseout', last);
                            delete series._lastItemForPoint;
                            delete series._lastStoreField;
                            delete series._lastStoreItem;
                        }
                        if (item) {
                            series.fireEvent('itemmouseover', item);
                            series._lastItemForPoint = item;
                            series._lastStoreItem = item.storeItem;
                            series._lastStoreField = item.storeField;
                        }
                    }
                }
            } else {
                last = series._lastItemForPoint;
                if (last) {
                    series.fireEvent('itemmouseout', last);
                    delete series._lastItemForPoint;
                    delete series._lastStoreField;
                    delete series._lastStoreItem;
                }
            }
        }
    },

    // @private handle mouse leave event.
    onMouseLeave: function(e) {
        var me = this,
            seriesItems = me.series.items,
            i, ln, series;

        if (me.enableMask) {
            me.mixins.mask.onMouseLeave.call(me, e);
        }
        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            series = seriesItems[i];
            delete series._lastItemForPoint;
        }
    },

    // @private buffered refresh for when we update the store
    delayRefresh: function() {
        var me = this;
        if (!me.refreshTask) {
            me.refreshTask = new Ext.util.DelayedTask(me.refresh, me);
        }
        me.refreshTask.delay(me.refreshBuffer);
    },

    // @private
    refresh: function() {
        var me = this;
            
        if (me.rendered && me.curWidth !== undefined && me.curHeight !== undefined) {
            if (!me.isVisible(true)) {
                if (!me.refreshPending) {
                    me.setShowListeners('mon');
                    me.refreshPending = true;
                }
                return;
            }
            if (me.fireEvent('beforerefresh', me) !== false) {
                me.redraw();
                me.fireEvent('refresh', me);
            }
        }
    },
    
    onShow: function(){
        var me = this;
        me.callParent(arguments);
        if (me.refreshPending) {
            me.delayRefresh();
            me.setShowListeners('mun');
        }
        delete me.refreshPending;
    },
    
    setShowListeners: function(method){
        var me = this;
        me[method](Ext.GlobalEvents, {
            scope: me,
            single: true,
            show: me.forceRefresh,
            expand: me.forceRefresh
        });
    },
    
    doRefresh: function(){
        // Data in the main store has changed, clear the sub store
        this.setSubStore(null);
        this.refresh();    
    },
    
    forceRefresh: function(container) {
        var me = this;
        if (me.isDescendantOf(container) && me.refreshPending) {
            // Add unbind here, because either expand/show could be fired,
            // so be sure to unbind the listener that didn't
            me.setShowListeners('mun');
            me.delayRefresh();
        }    
        delete me.refreshPending;
    },

    bindStore: function(store, initial) {
        var me = this;
        me.mixins.storeholder.bindStore.apply(me, arguments);
        if (me.store && !initial) {
            me.refresh();
        }
    },
    
    getStoreListeners: function() {
        var refresh = this.doRefresh,
            delayRefresh = this.delayRefresh;
            
        return {
            refresh: refresh,
            add: delayRefresh,
            remove: delayRefresh,
            update: delayRefresh,
            clear: refresh
        };
    },
    
    setSubStore: function(subStore){
        this.substore = subStore;    
    },

    // @private Create Axis
    initializeAxis: function(axis) {
        var me = this,
            chartBBox = me.chartBBox,
            w = chartBBox.width,
            h = chartBBox.height,
            x = chartBBox.x,
            y = chartBBox.y,
            themeAttrs = me.themeAttrs,
            axes = me.axes,
            config = {
                chart: me
            };
            
        if (themeAttrs) {
            config.axisStyle = Ext.apply({}, themeAttrs.axis);
            config.axisLabelLeftStyle = Ext.apply({}, themeAttrs.axisLabelLeft);
            config.axisLabelRightStyle = Ext.apply({}, themeAttrs.axisLabelRight);
            config.axisLabelTopStyle = Ext.apply({}, themeAttrs.axisLabelTop);
            config.axisLabelBottomStyle = Ext.apply({}, themeAttrs.axisLabelBottom);
            config.axisTitleLeftStyle = Ext.apply({}, themeAttrs.axisTitleLeft);
            config.axisTitleRightStyle = Ext.apply({}, themeAttrs.axisTitleRight);
            config.axisTitleTopStyle = Ext.apply({}, themeAttrs.axisTitleTop);
            config.axisTitleBottomStyle = Ext.apply({}, themeAttrs.axisTitleBottom);
            me.configureAxisStyles(config);
        }
        
        switch (axis.position) {
            case 'top':
                Ext.apply(config, {
                    length: w,
                    width: h,
                    x: x,
                    y: y
                });
            break;
            case 'bottom':
                Ext.apply(config, {
                    length: w,
                    width: h,
                    x: x,
                    y: h
                });
            break;
            case 'left':
                Ext.apply(config, {
                    length: h,
                    width: w,
                    x: x,
                    y: h
                });
            break;
            case 'right':
                Ext.apply(config, {
                    length: h,
                    width: w,
                    x: w,
                    y: h
                });
            break;
        }
        
        if (!axis.chart) {
            Ext.apply(config, axis);
            axis = Ext.createByAlias('axis.' + axis.type.toLowerCase(), config);
            axes.replace(axis);
        } else {
            Ext.apply(axis, config);
        }
        axis.initialized = true;
    },
    
    configureAxisStyles: Ext.emptyFn,

    /**
     * @private Get initial insets; override to provide different defaults.
     */
    getInsets: function() {
        var me = this,
            insetPadding = me.insetPadding;

        return {
            top: insetPadding,
            right: insetPadding,
            bottom: insetPadding,
            left: insetPadding
        };
    },

    /**
     * @private Calculate insets for the Chart.
     */
    calculateInsets: function() {
        var me = this,
            legend = me.legend,
            axes = me.axes,
            edges = ['top', 'right', 'bottom', 'left'],
            insets, i, l, edge, isVertical, axis, bbox;

        function getAxis(edge) {
            var i = axes.findIndex('position', edge);
            return (i < 0) ? null : axes.getAt(i);
        }
        
        insets = me.getInsets();

        // Find the space needed by axes and legend as a positive inset from each edge
        for (i = 0, l = edges.length; i < l; i++) {
            edge = edges[i];
            
            isVertical = (edge === 'left' || edge === 'right');
            axis = getAxis(edge);

            // Add legend size if it's on this edge
            if (legend !== false) {
                if (legend.position === edge) {
                    bbox = legend.getBBox();
                    insets[edge] += (isVertical ? bbox.width : bbox.height) + me.insetPadding;
                }
            }

            // Add axis size if there's one on this edge only if it has been
            //drawn before.
            if (axis && axis.bbox) {
                bbox = axis.bbox;
                insets[edge] += (isVertical ? bbox.width : bbox.height);
            }
        }
        
        return insets;
    },

    /**
     * @private Adjust the dimensions and positions of each axis and the chart body area after accounting
     * for the space taken up on each side by the axes and legend.
     * This code is taken from Ext.chart.Chart and refactored to provide better flexibility.
     */
    alignAxes: function() {
        var me = this,
            axesItems = me.axes.items,
            insets, chartBBox, i, l, axis, pos, isVertical;
        
        insets = me.calculateInsets();

        // Build the chart bbox based on the collected inset values
        chartBBox = {
            x: insets.left,
            y: insets.top,
            width: me.curWidth - insets.left - insets.right,
            height: me.curHeight - insets.top - insets.bottom
        };
        me.chartBBox = chartBBox;

        // Go back through each axis and set its length and position based on the
        // corresponding edge of the chartBBox
        for (i = 0, l = axesItems.length; i < l; i++) {
            axis = axesItems[i];
            pos = axis.position;
            isVertical = pos === 'left' || pos === 'right';

            axis.x = (pos === 'right' ? chartBBox.x + chartBBox.width : chartBBox.x);
            axis.y = (pos === 'top' ? chartBBox.y : chartBBox.y + chartBBox.height);
            axis.width = (isVertical ? chartBBox.width : chartBBox.height);
            axis.length = (isVertical ? chartBBox.height : chartBBox.width);
        }
    },

    // @private initialize the series.
    initializeSeries: function(series, idx, themeIndex) {
        var me = this,
            themeAttrs = me.themeAttrs,
            seriesObj, markerObj, seriesThemes, st,
            markerThemes, colorArrayStyle = [],
            isInstance = (series instanceof Ext.chart.series.Series).
            i = 0, l, config;

        if (!series.initialized) {
            config = {
                chart: me,
                seriesId: series.seriesId
            };
            if (themeAttrs) {
                seriesThemes = themeAttrs.seriesThemes;
                markerThemes = themeAttrs.markerThemes;
                seriesObj = Ext.apply({}, themeAttrs.series);
                markerObj = Ext.apply({}, themeAttrs.marker);
                config.seriesStyle = Ext.apply(seriesObj, seriesThemes[themeIndex % seriesThemes.length]);
                config.seriesLabelStyle = Ext.apply({}, themeAttrs.seriesLabel);
                config.markerStyle = Ext.apply(markerObj, markerThemes[themeIndex % markerThemes.length]);
                if (themeAttrs.colors) {
                    config.colorArrayStyle = themeAttrs.colors;
                } else {
                    colorArrayStyle = [];
                    for (l = seriesThemes.length; i < l; i++) {
                        st = seriesThemes[i];
                        if (st.fill || st.stroke) {
                            colorArrayStyle.push(st.fill || st.stroke);
                        }
                    }
                    if (colorArrayStyle.length) {
                        config.colorArrayStyle = colorArrayStyle;
                    }
                }
                config.seriesIdx = idx;
                config.themeIdx = themeIndex;
            }
            
            if (isInstance) {
                Ext.applyIf(series, config);
            }
            else {
                Ext.applyIf(config, series);
                series = me.series.replace(Ext.createByAlias('series.' + series.type.toLowerCase(), config));
            }
        }

        series.initialize();
        series.initialized = true;
        return series;
    },

    // @private
    getMaxGutters: function() {
        var me = this,
            seriesItems = me.series.items,
            i, ln, series, gutters,
            lowerH = 0, upperH = 0, lowerV = 0, upperV = 0;

        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            gutters = seriesItems[i].getGutters();
            if (gutters) {
                if (gutters.verticalAxis) {
                    lowerV = Math.max(lowerV, gutters.lower);
                    upperV = Math.max(upperV, gutters.upper);
                }
                else {
                    lowerH = Math.max(lowerH, gutters.lower);
                    upperH = Math.max(upperH, gutters.upper);
                }
            }
        }
        me.maxGutters = {
            left: lowerH,
            right: upperH,
            bottom: lowerV,
            top: upperV
        };
    },

    // @private draw axis.
    drawAxis: function(axis) {
        axis.drawAxis();
    },

    // @private draw series.
    drawCharts: function(series) {
        series.triggerafterrender = false;
        series.drawSeries();
        if (!this.animate) {
            series.fireEvent('afterrender', series);
        }
    },
    /**
     * Saves the chart by either triggering a download or returning a string containing the chart data
     * as SVG.  The action depends on the export type specified in the passed configuration. The chart
     * will be exported using either the {@link Ext.draw.engine.SvgExporter} or the {@link Ext.draw.engine.ImageExporter}
     * classes.
     *
     * Possible export types:
     *
     * - 'image/png'
     * - 'image/jpeg',
     * - 'image/svg+xml'
     *
     * If 'image/svg+xml' is specified, the SvgExporter will be used. 
     * If 'image/png' or 'image/jpeg' are specified, the ImageExporter will be used. This exporter
     * must post the SVG data to a remote server to have the data processed, see the {@link Ext.draw.engine.ImageExporter}
     * for more details.
     *
     * Example usage:
     *
     *     chart.save({
     *          type: 'image/png'
     *     });
     *
     * **Important**: By default, chart data is sent to a server operated
     * by Sencha to do data processing. You may change this default by
     * setting the {@link Ext.draw.engine.ImageExporter#defaultUrl defaultUrl} of the {@link Ext.draw.engine.ImageExporter} class.
     * In addition, please note that this service only creates PNG images.
     *
     * @param {Object} [config] The configuration to be passed to the exporter.
     * See the export method for the appropriate exporter for the relevant
     * configuration options
     * @return {Object} See the return types for the appropriate exporter
     */
    save: function(config){
        return Ext.draw.Surface.save(this.surface, config);
    },
    // @private remove gently.
    destroy: function() {
        var me = this,
            task = me.refreshTask;
        
        if (task) {
            task.cancel();
            me.refreshTask = null;
        }
        
        Ext.destroy(me.surface);
        me.bindStore(null);
        me.callParent(arguments);
    }
});

Ext.define('Ext.rtl.chart.Chart', {
    override: 'Ext.chart.Chart',
    
    initSurfaceCfg: function(cfg) {
        this.callParent(arguments);
        // Even in rtl mode, we still want the chart to use ltr, since
        // we're just reversing the axes 
        cfg.forceLtr = true;
    },
    
    configureAxisStyles: function(config) {
        var temp;
        
        if (this.getInherited().rtl) {
            temp = config.axisLabelLeftStyle;
            config.axisLabelLeftStyle = config.axisLabelRightStyle;
            config.axisLabelRightStyle = temp;
        
            temp = config.axisTitleLeftStyle;
            config.axisTitleLeftStyle = config.axisTitleRightStyle;
            config.axisTitleRightStyle = temp;
        }
    },
    
    beforeRender: function() {
        // Put this here because by this point we definitely know that we've been added to a container
        // so we can identify the hierarchy state. Since the collection is keyed by side, we'll go ahead
        // and do all our modifications before everything is initialized ~and~ we know our RTL state
        var me = this,
            axes = me.axes,
            items, i, len, axis;
            
        if (me.getInherited().rtl) {
            // There are 2 cases for RTL:
            // The root is LTR & we are RTL, in which case we don't reverse the events
            // The root is RTL & we are RTL, in we which need to re-LTRify the events, since
            // the charts always lay out in an LTR fashion.
            me.rtlEvent = !me.isOppositeRootDirection();
            items = axes.getRange();
            axes.removeAll();
            
            for (i = 0, len = items.length; i < len; ++i) {
                axis = items[i];
                axis.position = this.invertPosition(axis.position);
                axes.add(axis);
            }
        }
        
        me.callParent(arguments);
    },
    
    invertPosition: function(pos) {
        if (Ext.isArray(pos)) {
            var out = [],
                len = pos.length,
                i;
                
            for (i = 0; i < len; ++i) {
                out.push(this.invertPosition(pos[i]));
            }
            return out;
        }
        if (this.getInherited().rtl) {
            if (pos == 'left') {
                pos = 'right';
            } else if (pos == 'right') {
                pos = 'left';
            }
        }
        return pos;
    },
    
    getEventXY: function(e) {
        var box, pageXY, x, y, width;
        
        if (this.rtlEvent) {
            // If we're in RTL mode, the event coordinates have been reversed,
            // so we need to modify them to get them back to a useful
            // state for us!
            box = this.surface.getRegion();
            pageXY = e.getXY();
            width = box.right - box.left;
            
            x = width - (pageXY[0] - box.left);
            y = pageXY[1] - box.top;
            
            return [x, y];
        } else {
            return this.callParent(arguments);
        }
        
    }
});

/**
 * @class Ext.chart.Highlight
 * A mixin providing highlight functionality for Ext.chart.series.Series.
 */
Ext.define('Ext.chart.Highlight', {

    /* Begin Definitions */

    requires: ['Ext.fx.Anim'],

    /* End Definitions */

    /**
     * @cfg {Boolean/Object} [highlight=false] Set to `true` to enable highlighting using the {@link #highlightCfg default highlight attributes}.
     * 
     * Can also be an object with style properties (i.e fill, stroke, stroke-width, radius) which are may override the {@link #highlightCfg default highlight attributes}.
     */
    highlight: false,

    /**
     * @property {Object} highlightCfg The default properties to apply as a highight. Value is
     *
     *    {
     *        fill: '#fdd',
     *        "stroke-width": 5,
     *        stroke: "#f55'
     *    }
     */
    highlightCfg : {
        fill: '#fdd',
        "stroke-width": 5,
        stroke: '#f55'
    },

    constructor: function(config) {
        // If configured with a highlight object, apply to to *a local copy of* this class's highlightCfg. Do not mutate the prototype's copy.
        if (config.highlight && (typeof config.highlight !== 'boolean')) { //is an object
            this.highlightCfg = Ext.merge({}, this.highlightCfg, config.highlight);
        }
    },

    /**
     * Highlight the given series item.
     * @param {Object} item Info about the item; same format as returned by #getItemForPoint.
     */
    highlightItem: function(item) {
        if (!item) {
            return;
        }
        
        var me = this,
            sprite = item.sprite,
            opts = Ext.merge({}, me.highlightCfg, me.highlight),
            surface = me.chart.surface,
            animate = me.chart.animate,
            p, from, to, pi;

        if (!me.highlight || !sprite || sprite._highlighted) {
            return;
        }
        if (sprite._anim) {
            sprite._anim.paused = true;
        }
        sprite._highlighted = true;
        if (!sprite._defaults) {
            sprite._defaults = Ext.apply({}, sprite.attr);
            from = {};
            to = {};
            // TODO: Clean up code below.
            for (p in opts) {
                if (! (p in sprite._defaults)) {
                    sprite._defaults[p] = surface.availableAttrs[p];
                }
                from[p] = sprite._defaults[p];
                to[p] = opts[p];
                if (Ext.isObject(opts[p])) {
                    from[p] = {};
                    to[p] = {};
                    Ext.apply(sprite._defaults[p], sprite.attr[p]);
                    Ext.apply(from[p], sprite._defaults[p]);
                    for (pi in sprite._defaults[p]) {
                        if (! (pi in opts[p])) {
                            to[p][pi] = from[p][pi];
                        } else {
                            to[p][pi] = opts[p][pi];
                        }
                    }
                    for (pi in opts[p]) {
                        if (! (pi in to[p])) {
                            to[p][pi] = opts[p][pi];
                        }
                    }
                }
            }
            sprite._from = from;
            sprite._to = to;
            sprite._endStyle = to;
        }
        if (animate) {
            sprite._anim = new Ext.fx.Anim({
                target: sprite,
                from: sprite._from,
                to: sprite._to,
                duration: 150
            });
        } else {
            sprite.setAttributes(sprite._to, true);
        }
    },

    /**
     * Un-highlight any existing highlights
     */
    unHighlightItem: function() {
        if (!this.highlight || !this.items) {
            return;
        }

        var me = this,
            items = me.items,
            len = items.length,
            opts = Ext.merge({}, me.highlightCfg, me.highlight),
            animate = me.chart.animate,
            i = 0,
            obj, p, sprite;
        for (; i < len; i++) {
            if (!items[i]) {
                continue;
            }
            sprite = items[i].sprite;
            if (sprite && sprite._highlighted) {
                if (sprite._anim) {
                    sprite._anim.paused = true;
                }
                obj = {};
                for (p in opts) {
                    if (Ext.isObject(sprite._defaults[p])) {
                        obj[p] = Ext.apply({}, sprite._defaults[p]);
                    }
                    else {
                        obj[p] = sprite._defaults[p];
                    }
                }
                if (animate) {
                    //sprite._to = obj;
                    sprite._endStyle = obj;
                    sprite._anim = new Ext.fx.Anim({
                        target: sprite,
                        to: obj,
                        duration: 150
                    });
                }
                else {
                    sprite.setAttributes(obj, true);
                }
                delete sprite._highlighted;
                //delete sprite._defaults;
            }
        }
    },

    cleanHighlights: function() {
        if (!this.highlight) {
            return;
        }

        var group = this.group,
            markerGroup = this.markerGroup,
            i = 0,
            l;
        for (l = group.getCount(); i < l; i++) {
            delete group.getAt(i)._defaults;
        }
        if (markerGroup) {
            for (l = markerGroup.getCount(); i < l; i++) {
                delete markerGroup.getAt(i)._defaults;
            }
        }
    }
});

/**
 * Labels is a mixin to the Series class. Labels methods are implemented
 * in each of the Series (Pie, Bar, etc) for label creation and placement.
 *
 * The 2 methods that must be implemented by the Series are:
 *
 * - {@link #onCreateLabel}
 * - {@link #onPlaceLabel}
 *
 * The application can override these methods to control the style and
 * location of the labels. For instance, to display the labels in green and
 * add a '+' symbol when the value of a Line series exceeds 50:
 *
 *      Ext.define('Ext.chart.series.MyLine', {
 *          extend: 'Ext.chart.series.Line',
 *          alias: ['series.myline', 'Ext.chart.series.MyLine'],
 *          type: 'MYLINE',
 *     
 *          onPlaceLabel: function(label, storeItem, item, i, display, animate){
 *              if (storeItem.data.y >= 50) {
 *                  label.setAttributes({
 *                      fill: '#080',
 *                      text: "+" + storeItem.data.y
 *                  }, true);
 *              }
 *              return this.callParent(arguments);
 *          }
 *      });
 *
 * Note that for simple effects, like the example above, it is simpler
 * for the application to provide a label.renderer function in the config:
 *
 *       label: {
 *           renderer: function(value, label, storeItem, item, i, display, animate, index) {
 *               if (value >= 50) {
 *                   label.setAttributes({fill:'#080'});
 *                   value = "+" + value;
 *               }
 *               return value;
 *           }
 *       }
 *
 * The rule of thumb is that to customize the value and modify simple visual attributes, it
 * is simpler to use a renderer function, while overridding `onCreateLabel` and `onPlaceLabel`
 * allows the application to take entire control over the labels.
 * 
 */
Ext.define('Ext.chart.Label', {

    /* Begin Definitions */

    requires: ['Ext.draw.Color'],

    /* End Definitions */

    /**
     * @method onCreateLabel
     * @template
     * 
     * Called each time a new label is created.
     * 
     * **Note:** This method must be implemented in Series that mixes
     * in this Label mixin.
     * 
     * @param {Ext.data.Model} storeItem The element of the store that is
     * related to the sprite.
     * @param {Object} item The item related to the sprite.
     * An item is an object containing the position of the shape
     * used to describe the visualization and also pointing to the
     * actual shape (circle, rectangle, path, etc).
     * @param {Number} i The index of the element created
     * (i.e the first created label, second created label, etc).
     * @param {String} display The label.display type.
     * May be `false` if the label is hidden
     * @return {Ext.draw.Sprite} The created sprite that will draw the label.
     */
    
    /**
     * @method onPlaceLabel
     * @template
     * 
     * Called for updating the position of the label.
     * 
     * **Note:** This method must be implemented in Series that mixes
     * in this Label mixin.
     * 
     * @param {Ext.draw.Sprite} label The sprite that draws the label.
     * @param {Ext.data.Model} storeItem The element of the store
     * that is related to the sprite.
     * @param {Object} item The item related to the
     * sprite. An item is an object containing the position of
     * the shape used to describe the visualization and also
     * pointing to the actual shape (circle, rectangle, path, etc).
     * @param {Number} i The index of the element to be updated
     * (i.e. whether it is the first, second, third from the
     * labelGroup)
     * @param {String} display The label.display type.
     * May be `false` if the label is hidden
     * @param {Boolean} animate A boolean value to set or unset
     * animations for the labels.
     * @param {Number} index The series index.
     */
    
    /**
     * @cfg {Object} label
     * Object with the following properties:
     *
     * @cfg {String} label.display
     *
     * Specifies the presence and position of the labels. The possible values depend on the chart type. 
     * For Line and Scatter charts: "under" | "over" | "rotate".
     * For Bar and Column charts: "insideStart" | "insideEnd" | "outside".
     * For Pie charts: "inside" | "outside" | "rotate".
     * For all charts: "none" hides the labels and "middle" is reserved for future use.
     * On stacked Bar and stacked Column charts, if 'stackedDisplay' is set, the values
     * "over" or "under" can be passed internally to {@link #onCreateLabel} and {@link #onPlaceLabel}
     * (however they cannot be used by the application as config values for label.display).
     *
     * Default value: 'none'.
     *
     * @cfg {String} label.stackedDisplay
     *
     * The type of label we want to display as a summary on a stacked
     * bar or a stacked column.  If set to 'total', the total amount
     * of all the stacked values is displayed on top of the column.
     * If set to 'balances', the total amount of the positive values
     * is displayed on top of the column and the total amount of the
     * negative values is displayed at the bottom.
     *
     * Default value: 'none'.
     *
     * @cfg {String} label.color
     *
     * The color of the label text. It can be specified in hex values 
     * (eg. '#f00' or '#ff0000'), or as a CSS color name (eg. 'red').
     *
     * Default value: '#000' (black).
     *
     * @cfg {Boolean} label.contrast
     *
     * True to render the label in contrasting color with the backround of a column
     * in a Bar chart or of a slice in a Pie chart. 
     *
     * Default value: false.
     *
     * @cfg {String|String[]} label.field
     *
     * The name(s) of the field(s) to be displayed in the labels. If your chart has 3 series
     * that correspond to the fields 'a', 'b', and 'c' of your model and you only want to
     * display labels for the series 'c', you must still provide an array `[null, null, 'c']`.
     *
     * Default value: 'name'.
     *
     * @cfg {Number} label.minMargin
     *
     * Specifies the minimum distance from a label to the origin of
     * the visualization.  This parameter is useful when using
     * PieSeries width variable pie slice lengths.
     *
     * Default value: 50.
     *
     * @cfg {Number} label.padding
     *
     * The distance between the label and the chart when the label is displayed
     * outside the chart.
     *
     * Default value: 20.
     *
     * @cfg {Boolean|Object} label.calloutLine
     *
     * True to draw a line between the label and the chart with the default settings,
     * or an Object that defines the 'color', 'width' and 'length' properties of the line.
     * This config is only applicable when the label is displayed outside the chart.
     *
     * Default value: false.
     *
     * @cfg {String} label.calloutLine.color
     *
     * The color of the line. It can be specified in hex values 
     * (eg. '#f00' or '#ff0000'), or as a CSS color name (eg. 'red').
     * By default, it uses the color of the pie slice.
     *
     * @cfg {Number} label.calloutLine.width
     *
     * The width of the line.
     *
     * Default value: 2.
     *
     * @cfg {Number} label.calloutLine.length
     *
     * The length of the line. By default, the length of the line is calculated taking
     * into account the {@link #label.padding} and the width and height of the label.
     * If specified, it should be larger than {@link #label.padding} otherwise the 
     * line may cross the label itself.
     *
     * @cfg {String} label.font
     *
     * The font used for the labels.
     *
     * Default value: `"11px Helvetica, sans-serif"`.
     *
     * @cfg {String} label.orientation
     *
     * Either "horizontal" or "vertical".
     *
     * Default value: `"horizontal"`.
     *
     * @cfg {Function} label.renderer
     *
     * Optional function for formatting the label into a displayable value.
     *
     * The arguments to the method are:
     *
     *   - *`value`* The value
     *   - *`label`*, *`storeItem`*, *`item`*, *`i`*, *`display`*, *`animate`*, *`index`*
     *
     *     Same arguments as {@link #onPlaceLabel}.
     *
     *     Default value: `function(v) { return v; }`
     */

    // @private a regex to parse url type colors.
    colorStringRe: /url\s*\(\s*#([^\/)]+)\s*\)/,

    // @private the mixin constructor. Used internally by Series.
    constructor: function(config) {
        var me = this;
        me.label = Ext.applyIf(me.label || {},
        {
            display: "none",
            stackedDisplay: "none",
            color: "#000",
            field: "name",
            minMargin: 50,
            font: "11px Helvetica, sans-serif",
            orientation: "horizontal",
            renderer: Ext.identityFn
        });

        if (me.label.display !== 'none') {
            me.labelsGroup = me.chart.surface.getGroup(me.seriesId + '-labels');
        }
    },

    // @private a method to render all labels in the labelGroup
    renderLabels: function() {
        var me = this,
            chart = me.chart,
            gradients = chart.gradients,
            items = me.items,
            animate = chart.animate,
            config = me.label,
            display = config.display,
            stackedDisplay = config.stackedDisplay,
            format = config.renderer,
            color = config.color,
            field = [].concat(config.field),
            group = me.labelsGroup,
            groupLength = (group || 0) && group.length,
            store = me.chart.getChartStore(),
            len = store.getCount(),
            itemLength = (items || 0) && items.length,
            ratio = itemLength / len,
            gradientsCount = (gradients || 0) && gradients.length,
            Color = Ext.draw.Color,
            hides = [],
            gradient, i, count, groupIndex, index, j, k, colorStopTotal, colorStopIndex, colorStop, item, label,
            storeItem, sprite, spriteColor, spriteBrightness, labelColor, colorString,
            total, totalPositive, totalNegative, topText, bottomText;

        if (display == 'none' || !group) {
            return;
        }
        // no items displayed, hide all labels
        if(itemLength == 0){
            while(groupLength--) {
                hides.push(groupLength);
            }
        } else {
            for (i = 0, count = 0, groupIndex = 0; i < len; i++) {
                index = 0;
                for (j = 0; j < ratio; j++) {
                    item = items[count];
                    label = group.getAt(groupIndex);
                    storeItem = store.getAt(i);
                    //check the excludes
                    while(this.__excludes && this.__excludes[index]) {
                        index++;
                    }

                    if (!item && label) {
                        label.hide(true);
                        groupIndex++;
                    }

                    if (item && field[j]) {
                        if (!label) {
                            label = me.onCreateLabel(storeItem, item, i, display);
                            if (!label) {
                                break;
                            }
                        }

                        // set color (the app can override it in onPlaceLabel)
                        label.setAttributes({
                            fill: String(color)
                        }, true);

                        // position the label
                        me.onPlaceLabel(label, storeItem, item, i, display, animate, index);
                        groupIndex++;

                        // set contrast
                        if (config.contrast && item.sprite) {
                            sprite = item.sprite;
                            //set the color string to the color to be set, only read the
                            // _endStyle/_to if we're animating, otherwise they're not relevant
                            if (animate && sprite._endStyle) {
                                colorString = sprite._endStyle.fill;
                            } else if (animate && sprite._to) {
                                colorString = sprite._to.fill;
                            } else {
                                colorString = sprite.attr.fill;
                            }
                            colorString = colorString || sprite.attr.fill;

                            spriteColor = Color.fromString(colorString);
                            //color wasn't parsed property maybe because it's a gradient id
                            if (colorString && !spriteColor) {
                                colorString = colorString.match(me.colorStringRe)[1];
                                for (k = 0; k < gradientsCount; k++) {
                                    gradient = gradients[k];
                                    if (gradient.id == colorString) {
                                        //avg color stops
                                        colorStop = 0; colorStopTotal = 0;
                                        for (colorStopIndex in gradient.stops) {
                                            colorStop++;
                                            colorStopTotal += Color.fromString(gradient.stops[colorStopIndex].color).getGrayscale();
                                        }
                                        spriteBrightness = (colorStopTotal / colorStop) / 255;
                                        break;
                                    }
                                }
                            }
                            else {
                                spriteBrightness = spriteColor.getGrayscale() / 255;
                            }
                            if (label.isOutside) {
                                spriteBrightness = 1;
                            }
                            labelColor = Color.fromString(label.attr.fill || label.attr.color).getHSL();
                            labelColor[2] = spriteBrightness > 0.5 ? 0.2 : 0.8;
                            label.setAttributes({
                                fill: String(Color.fromHSL.apply({}, labelColor))
                            }, true);
                        }

                        // display totals on stacked charts
                        if (me.stacked && stackedDisplay && (item.totalPositiveValues || item.totalNegativeValues)) {
                            totalPositive = (item.totalPositiveValues || 0);
                            totalNegative = (item.totalNegativeValues || 0);
                            total = totalPositive + totalNegative;

                            if (stackedDisplay == 'total') {
                                topText = format(total);
                            } else if (stackedDisplay == 'balances') {
                                if (totalPositive == 0 && totalNegative == 0) {
                                    topText = format(0);
                                } else {
                                    topText = format(totalPositive);
                                    bottomText = format(totalNegative);
                                }
                            }

                            if (topText) {
                                label = group.getAt(groupIndex);
                                if (!label) {
                                    label = me.onCreateLabel(storeItem, item, i, 'over');
                                }
                                labelColor = Color.fromString(label.attr.color || label.attr.fill).getHSL();
                                label.setAttributes({
                                    text: topText,
                                    style: config.font,
                                    fill: String(Color.fromHSL.apply({}, labelColor))
                                }, true);
                                me.onPlaceLabel(label, storeItem, item, i, 'over', animate, index);
                                groupIndex ++;
                            }

                            if (bottomText) {
                                label = group.getAt(groupIndex);
                                if (!label) {
                                    label = me.onCreateLabel(storeItem, item, i, 'under');
                                }
                                labelColor = Color.fromString(label.attr.color || label.attr.fill).getHSL();
                                label.setAttributes({
                                    text: bottomText,
                                    style: config.font,
                                    fill: String(Color.fromHSL.apply({}, labelColor))
                                }, true);
                                me.onPlaceLabel(label, storeItem, item, i, 'under', animate, index);
                                groupIndex ++;
                            }
                        }
                    }
                    count++;
                    index++;
                }
            }
            groupLength = group.length;
        
            while(groupLength > groupIndex){
                hides.push(groupIndex);
                groupIndex++;
           }
        }
        me.hideLabels(hides);
    },

    hideLabels: function(hides){
        var labelsGroup = this.labelsGroup,
            hlen = !!hides && hides.length;

        if (!labelsGroup) {
            return;
        }

        if (hlen === false) {
            hlen = labelsGroup.getCount();
            while (hlen--) {
              labelsGroup.getAt(hlen).hide(true);
            }
        } else {
            while(hlen--) {
                labelsGroup.getAt(hides[hlen]).hide(true);
            }
        }
    }
});

/**
 * @private
 */
Ext.define('Ext.chart.TipSurface', {

    /* Begin Definitions */

    extend: 'Ext.draw.Component',

    /* End Definitions */

    spriteArray: false,
    renderFirst: true,

    constructor: function(config) {
        this.callParent([config]);
        if (config.sprites) {
            this.spriteArray = [].concat(config.sprites);
            delete config.sprites;
        }
    },

    onRender: function() {
        var me = this,
            i = 0,
            l = 0,
            sp,
            sprites;
            this.callParent(arguments);
        sprites = me.spriteArray;
        if (me.renderFirst && sprites) {
            me.renderFirst = false;
            for (l = sprites.length; i < l; i++) {
                sp = me.surface.add(sprites[i]);
                sp.setAttributes({
                    hidden: false
                },
                true);
            }
        }
    }
});

/**
 * @class Ext.chart.Tip
 * Provides tips for Ext.chart.series.Series.
 */
Ext.define('Ext.chart.Tip', {

    /* Begin Definitions */

    requires: ['Ext.tip.ToolTip', 'Ext.chart.TipSurface'],

    /* End Definitions */

    constructor: function(config) {
        var me = this,
            surface,
            sprites,
            tipSurface;
        if (config.tips) {
            me.tipTimeout = null;
            me.tipConfig = Ext.apply({}, config.tips, {
                renderer: Ext.emptyFn,
                constrainPosition: true,
                autoHide: true,
                shrinkWrapDock: true
            });
            me.tooltip = new Ext.tip.ToolTip(me.tipConfig);
            me.chart.surface.on('mousemove', me.tooltip.onMouseMove, me.tooltip);
            me.chart.surface.on('mouseleave', function() {
                me.hideTip();
            });
            if (me.tipConfig.surface) {
                //initialize a surface
                surface = me.tipConfig.surface;
                sprites = surface.sprites;
                tipSurface = new Ext.chart.TipSurface({
                    id: 'tipSurfaceComponent',
                    sprites: sprites
                });
                if (surface.width && surface.height) {
                    tipSurface.setSize(surface.width, surface.height);
                }
                me.tooltip.add(tipSurface);
                me.spriteTip = tipSurface;
            }
        }
    },

    showTip: function(item) {
        var me = this,
            tooltip,
            spriteTip,
            tipConfig,
            trackMouse,
            sprite,
            surface,
            surfaceExt,
            pos,
            x,
            y;
        if (!me.tooltip) {
            return;
        }
        clearTimeout(me.tipTimeout);
        tooltip = me.tooltip;
        spriteTip = me.spriteTip;
        tipConfig = me.tipConfig;
        trackMouse = tooltip.trackMouse;
        if (!trackMouse) {
            tooltip.trackMouse = true;
            sprite = item.sprite;
            surface = sprite.surface;
            surfaceExt = Ext.get(surface.getId());
            if (surfaceExt) {
                pos = surfaceExt.getXY();
                x = pos[0] + (sprite.attr.x || 0) + (sprite.attr.translation && sprite.attr.translation.x || 0);
                y = pos[1] + (sprite.attr.y || 0) + (sprite.attr.translation && sprite.attr.translation.y || 0);
                tooltip.targetXY = [x, y];
            }
        }
        if (spriteTip) {
            tipConfig.renderer.call(tooltip, item.storeItem, item, spriteTip.surface);
        } else {
            tipConfig.renderer.call(tooltip, item.storeItem, item);
        }
        tooltip.delayShow(trackMouse);
        tooltip.trackMouse = trackMouse;
    },

    hideTip: function(item) {
        var tooltip = this.tooltip;
        if (!tooltip) {
            return;
        }
        clearTimeout(this.tipTimeout);
        this.tipTimeout = setTimeout(function() {
            tooltip.delayHide();
        }, 0);
    }
});

/**
 * @class Ext.chart.axis.Abstract
 * Base class for all axis classes.
 * @private
 */
Ext.define('Ext.chart.axis.Abstract', {

    /* Begin Definitions */

    requires: ['Ext.chart.Chart'],

    /* End Definitions */
    
    /**
     * @cfg {Ext.chart.Label} label
     * The config for chart label.
     */

    /**
     * @cfg {String[]} fields
     * The fields of model to bind to this axis.
     * 
     * For example if you have a data set of lap times per car, each having the fields:
     * `'carName'`, `'avgSpeed'`, `'maxSpeed'`. Then you might want to show the data on chart
     * with `['carName']` on Name axis and `['avgSpeed', 'maxSpeed']` on Speed axis.
     */

    /**
     * Creates new Axis.
     * @param {Object} config (optional) Config options.
     */
    constructor: function(config) {
        config = config || {};

        var me = this,
            pos = config.position || 'left';

        pos = pos.charAt(0).toUpperCase() + pos.substring(1);
        //axisLabel(Top|Bottom|Right|Left)Style
        config.label = Ext.apply(config['axisLabel' + pos + 'Style'] || {}, config.label || {});
        config.axisTitleStyle = Ext.apply(config['axisTitle' + pos + 'Style'] || {}, config.labelTitle || {});
        Ext.apply(me, config);
        me.fields = Ext.Array.from(me.fields);
        this.callParent();
        me.labels = [];
        me.getId();
        me.labelGroup = me.chart.surface.getGroup(me.axisId + "-labels");
    },

    alignment: null,
    grid: false,
    steps: 10,
    x: 0,
    y: 0,
    minValue: 0,
    maxValue: 0,

    getId: function() {
        return this.axisId || (this.axisId = Ext.id(null, 'ext-axis-'));
    },

    /*
      Called to process a view i.e to make aggregation and filtering over
      a store creating a substore to be used to render the axis. Since many axes
      may do different things on the data and we want the final result of all these
      operations to be rendered we need to call processView on all axes before drawing
      them.
    */
    processView: Ext.emptyFn,

    drawAxis: Ext.emptyFn,
    addDisplayAndLabels: Ext.emptyFn
});

/**
 * @class Ext.draw.Draw
 * Base Drawing class.  Provides base drawing functions.
 * @private
 */
Ext.define('Ext.draw.Draw', {
    /* Begin Definitions */

    singleton: true,

    requires: ['Ext.draw.Color'],

    /* End Definitions */

    pathToStringRE: /,?([achlmqrstvxz]),?/gi,
    pathCommandRE: /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,
    pathValuesRE: /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,
    stopsRE: /^(\d+%?)$/,
    radian: Math.PI / 180,

    availableAnimAttrs: {
        along: "along",
        blur: null,
        "clip-rect": "csv",
        cx: null,
        cy: null,
        fill: "color",
        "fill-opacity": null,
        "font-size": null,
        height: null,
        opacity: null,
        path: "path",
        r: null,
        rotation: "csv",
        rx: null,
        ry: null,
        scale: "csv",
        stroke: "color",
        "stroke-opacity": null,
        "stroke-width": null,
        translation: "csv",
        width: null,
        x: null,
        y: null
    },

    is: function(o, type) {
        type = String(type).toLowerCase();
        return (type == "object" && o === Object(o)) ||
            (type == "undefined" && typeof o == type) ||
            (type == "null" && o === null) ||
            (type == "array" && Array.isArray && Array.isArray(o)) ||
            (Object.prototype.toString.call(o).toLowerCase().slice(8, -1)) == type;
    },

    ellipsePath: function(sprite) {
        var attr = sprite.attr;
        return Ext.String.format("M{0},{1}A{2},{3},0,1,1,{0},{4}A{2},{3},0,1,1,{0},{1}z", attr.x, attr.y - attr.ry, attr.rx, attr.ry, attr.y + attr.ry);
    },

    rectPath: function(sprite) {
        var attr = sprite.attr;
        if (attr.radius) {
            return Ext.String.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z", attr.x + attr.radius, attr.y, attr.width - attr.radius * 2, attr.radius, -attr.radius, attr.height - attr.radius * 2, attr.radius * 2 - attr.width, attr.radius * 2 - attr.height);
        }
        else {
            return Ext.String.format("M{0},{1}L{2},{1},{2},{3},{0},{3}z", attr.x, attr.y, attr.width + attr.x, attr.height + attr.y);
        }
    },

    // To be deprecated, converts itself (an arrayPath) to a proper SVG path string
    path2string: function () {
        return this.join(",").replace(Ext.draw.Draw.pathToStringRE, "$1");
    },

    // Convert the passed arrayPath to a proper SVG path string (d attribute)
    pathToString: function(arrayPath) {
        return arrayPath.join(",").replace(Ext.draw.Draw.pathToStringRE, "$1");
    },

    parsePathString: function (pathString) {
        if (!pathString) {
            return null;
        }
        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0},
            data = [],
            me = this;
        if (me.is(pathString, "array") && me.is(pathString[0], "array")) { // rough assumption
            data = me.pathClone(pathString);
        }
        if (!data.length) {
            String(pathString).replace(me.pathCommandRE, function (a, b, c) {
                var params = [],
                    name = b.toLowerCase();
                c.replace(me.pathValuesRE, function (a, b) {
                    b && params.push(+b);
                });
                if (name == "m" && params.length > 2) {
                    data.push([b].concat(Ext.Array.splice(params, 0, 2)));
                    name = "l";
                    b = (b == "m") ? "l" : "L";
                }
                while (params.length >= paramCounts[name]) {
                    data.push([b].concat(Ext.Array.splice(params, 0, paramCounts[name])));
                    if (!paramCounts[name]) {
                        break;
                    }
                }
            });
        }
        data.toString = me.path2string;
        return data;
    },

    mapPath: function (path, matrix) {
        if (!matrix) {
            return path;
        }
        var x, y, i, ii, j, jj, pathi;
        path = this.path2curve(path);
        for (i = 0, ii = path.length; i < ii; i++) {
            pathi = path[i];
            for (j = 1, jj = pathi.length; j < jj-1; j += 2) {
                x = matrix.x(pathi[j], pathi[j + 1]);
                y = matrix.y(pathi[j], pathi[j + 1]);
                pathi[j] = x;
                pathi[j + 1] = y;
            }
        }
        return path;
    },

    pathClone: function(pathArray) {
        var res = [],
            j, jj, i, ii;
        if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) { // rough assumption
            pathArray = this.parsePathString(pathArray);
        }
        for (i = 0, ii = pathArray.length; i < ii; i++) {
            res[i] = [];
            for (j = 0, jj = pathArray[i].length; j < jj; j++) {
                res[i][j] = pathArray[i][j];
            }
        }
        res.toString = this.path2string;
        return res;
    },

    pathToAbsolute: function (pathArray) {
        if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) { // rough assumption
            pathArray = this.parsePathString(pathArray);
        }
        var res = [],
            x = 0,
            y = 0,
            mx = 0,
            my = 0,
            i = 0,
            ln = pathArray.length,
            r, pathSegment, j, ln2;
        // MoveTo initial x/y position
        if (ln && pathArray[0][0] == "M") {
            x = +pathArray[0][1];
            y = +pathArray[0][2];
            mx = x;
            my = y;
            i++;
            res[0] = ["M", x, y];
        }
        for (; i < ln; i++) {
            r = res[i] = [];
            pathSegment = pathArray[i];
            if (pathSegment[0] != pathSegment[0].toUpperCase()) {
                r[0] = pathSegment[0].toUpperCase();
                switch (r[0]) {
                    // Elliptical Arc
                    case "A":
                        r[1] = pathSegment[1];
                        r[2] = pathSegment[2];
                        r[3] = pathSegment[3];
                        r[4] = pathSegment[4];
                        r[5] = pathSegment[5];
                        r[6] = +(pathSegment[6] + x);
                        r[7] = +(pathSegment[7] + y);
                        break;
                    // Vertical LineTo
                    case "V":
                        r[1] = +pathSegment[1] + y;
                        break;
                    // Horizontal LineTo
                    case "H":
                        r[1] = +pathSegment[1] + x;
                        break;
                    case "M":
                    // MoveTo
                        mx = +pathSegment[1] + x;
                        my = +pathSegment[2] + y;
                    default:
                        j = 1;
                        ln2 = pathSegment.length;
                        for (; j < ln2; j++) {
                            r[j] = +pathSegment[j] + ((j % 2) ? x : y);
                        }
                }
            }
            else {
                j = 0;
                ln2 = pathSegment.length;
                for (; j < ln2; j++) {
                    res[i][j] = pathSegment[j];
                }
            }
            switch (r[0]) {
                // ClosePath
                case "Z":
                    x = mx;
                    y = my;
                    break;
                // Horizontal LineTo
                case "H":
                    x = r[1];
                    break;
                // Vertical LineTo
                case "V":
                    y = r[1];
                    break;
                // MoveTo
                case "M":
                    pathSegment = res[i];
                    ln2 = pathSegment.length;
                    mx = pathSegment[ln2 - 2];
                    my = pathSegment[ln2 - 1];
                default:
                    pathSegment = res[i];
                    ln2 = pathSegment.length;
                    x = pathSegment[ln2 - 2];
                    y = pathSegment[ln2 - 1];
            }
        }
        res.toString = this.path2string;
        return res;
    },

    // TO BE DEPRECATED
    pathToRelative: function (pathArray) {
        if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) {
            pathArray = this.parsePathString(pathArray);
        }
        var res = [],
            x = 0,
            y = 0,
            mx = 0,
            my = 0,
            start = 0,
            r,
            pa,
            i,
            j,
            k,
            len,
            ii,
            jj,
            kk;
        
        if (pathArray[0][0] == "M") {
            x = pathArray[0][1];
            y = pathArray[0][2];
            mx = x;
            my = y;
            start++;
            res.push(["M", x, y]);
        }
        for (i = start, ii = pathArray.length; i < ii; i++) {
            r = res[i] = [];
            pa = pathArray[i];
            if (pa[0] != pa[0].toLowerCase()) {
                r[0] = pa[0].toLowerCase();
                switch (r[0]) {
                    case "a":
                        r[1] = pa[1];
                        r[2] = pa[2];
                        r[3] = pa[3];
                        r[4] = pa[4];
                        r[5] = pa[5];
                        r[6] = +(pa[6] - x).toFixed(3);
                        r[7] = +(pa[7] - y).toFixed(3);
                        break;
                    case "v":
                        r[1] = +(pa[1] - y).toFixed(3);
                        break;
                    case "m":
                        mx = pa[1];
                        my = pa[2];
                    default:
                        for (j = 1, jj = pa.length; j < jj; j++) {
                            r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
                        }
                }
            } else {
                r = res[i] = [];
                if (pa[0] == "m") {
                    mx = pa[1] + x;
                    my = pa[2] + y;
                }
                for (k = 0, kk = pa.length; k < kk; k++) {
                    res[i][k] = pa[k];
                }
            }
            len = res[i].length;
            switch (res[i][0]) {
                case "z":
                    x = mx;
                    y = my;
                    break;
                case "h":
                    x += +res[i][len - 1];
                    break;
                case "v":
                    y += +res[i][len - 1];
                    break;
                default:
                    x += +res[i][len - 2];
                    y += +res[i][len - 1];
            }
        }
        res.toString = this.path2string;
        return res;
    },

    // Returns a path converted to a set of curveto commands
    path2curve: function (path) {
        var me = this,
            points = me.pathToAbsolute(path),
            ln = points.length,
            attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
            i, seg, segLn, point;
            
        for (i = 0; i < ln; i++) {
            points[i] = me.command2curve(points[i], attrs);
            if (points[i].length > 7) {
                    points[i].shift();
                    point = points[i];
                    while (point.length) {
                        Ext.Array.splice(points, i++, 0, ["C"].concat(Ext.Array.splice(point, 0, 6)));
                    }
                    Ext.Array.erase(points, i, 1);
                    ln = points.length;
                    i--;
                }
            seg = points[i];
            segLn = seg.length;
            attrs.x = seg[segLn - 2];
            attrs.y = seg[segLn - 1];
            attrs.bx = parseFloat(seg[segLn - 4]) || attrs.x;
            attrs.by = parseFloat(seg[segLn - 3]) || attrs.y;
        }
        return points;
    },
    
    interpolatePaths: function (path, path2) {
        var me = this,
            p = me.pathToAbsolute(path),
            p2 = me.pathToAbsolute(path2),
            attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
            attrs2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
            fixArc = function (pp, i) {
                if (pp[i].length > 7) {
                    pp[i].shift();
                    var pi = pp[i];
                    while (pi.length) {
                        Ext.Array.splice(pp, i++, 0, ["C"].concat(Ext.Array.splice(pi, 0, 6)));
                    }
                    Ext.Array.erase(pp, i, 1);
                    ii = Math.max(p.length, p2.length || 0);
                }
            },
            fixM = function (path1, path2, a1, a2, i) {
                if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                    Ext.Array.splice(path2, i, 0, ["M", a2.x, a2.y]);
                    a1.bx = 0;
                    a1.by = 0;
                    a1.x = path1[i][1];
                    a1.y = path1[i][2];
                    ii = Math.max(p.length, p2.length || 0);
                }
            },
            i, ii,
            seg, seg2, seglen, seg2len;
        for (i = 0, ii = Math.max(p.length, p2.length || 0); i < ii; i++) {
            p[i] = me.command2curve(p[i], attrs);
            fixArc(p, i);
            (p2[i] = me.command2curve(p2[i], attrs2));
            fixArc(p2, i);
            fixM(p, p2, attrs, attrs2, i);
            fixM(p2, p, attrs2, attrs, i);
            seg = p[i];
            seg2 = p2[i];
            seglen = seg.length;
            seg2len = seg2.length;
            attrs.x = seg[seglen - 2];
            attrs.y = seg[seglen - 1];
            attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
            attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
            attrs2.bx = (parseFloat(seg2[seg2len - 4]) || attrs2.x);
            attrs2.by = (parseFloat(seg2[seg2len - 3]) || attrs2.y);
            attrs2.x = seg2[seg2len - 2];
            attrs2.y = seg2[seg2len - 1];
        }
        return [p, p2];
    },
    
    //Returns any path command as a curveto command based on the attrs passed
    command2curve: function (pathCommand, d) {
        var me = this;
        if (!pathCommand) {
            return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
        }
        if (pathCommand[0] != "T" && pathCommand[0] != "Q") {
            d.qx = d.qy = null;
        }
        switch (pathCommand[0]) {
            case "M":
                d.X = pathCommand[1];
                d.Y = pathCommand[2];
                break;
            case "A":
                pathCommand = ["C"].concat(me.arc2curve.apply(me, [d.x, d.y].concat(pathCommand.slice(1))));
                break;
            case "S":
                pathCommand = ["C", d.x + (d.x - (d.bx || d.x)), d.y + (d.y - (d.by || d.y))].concat(pathCommand.slice(1));
                break;
            case "T":
                d.qx = d.x + (d.x - (d.qx || d.x));
                d.qy = d.y + (d.y - (d.qy || d.y));
                pathCommand = ["C"].concat(me.quadratic2curve(d.x, d.y, d.qx, d.qy, pathCommand[1], pathCommand[2]));
                break;
            case "Q":
                d.qx = pathCommand[1];
                d.qy = pathCommand[2];
                pathCommand = ["C"].concat(me.quadratic2curve(d.x, d.y, pathCommand[1], pathCommand[2], pathCommand[3], pathCommand[4]));
                break;
            case "L":
                pathCommand = ["C"].concat(d.x, d.y, pathCommand[1], pathCommand[2], pathCommand[1], pathCommand[2]);
                break;
            case "H":
                pathCommand = ["C"].concat(d.x, d.y, pathCommand[1], d.y, pathCommand[1], d.y);
                break;
            case "V":
                pathCommand = ["C"].concat(d.x, d.y, d.x, pathCommand[1], d.x, pathCommand[1]);
                break;
            case "Z":
                pathCommand = ["C"].concat(d.x, d.y, d.X, d.Y, d.X, d.Y);
                break;
        }
        return pathCommand;
    },

    quadratic2curve: function (x1, y1, ax, ay, x2, y2) {
        var _13 = 1 / 3,
            _23 = 2 / 3;
        return [
                _13 * x1 + _23 * ax,
                _13 * y1 + _23 * ay,
                _13 * x2 + _23 * ax,
                _13 * y2 + _23 * ay,
                x2,
                y2
            ];
    },
    
    rotate: function (x, y, rad) {
        var cos = Math.cos(rad),
            sin = Math.sin(rad),
            X = x * cos - y * sin,
            Y = x * sin + y * cos;
        return {x: X, y: Y};
    },

    arc2curve: function (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
        // for more information of where this Math came from visit:
        // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
        var me = this,
            PI = Math.PI,
            radian = me.radian,
            _120 = PI * 120 / 180,
            rad = radian * (+angle || 0),
            res = [],
            math = Math,
            mcos = math.cos,
            msin = math.sin,
            msqrt = math.sqrt,
            mabs = math.abs,
            masin = math.asin,
            xy, x, y, h, rx2, ry2, k, cx, cy, f1, f2, df, c1, s1, c2, s2,
            t, hx, hy, m1, m2, m3, m4, newres, i, ln, f2old, x2old, y2old;
        if (!recursive) {
            xy = me.rotate(x1, y1, -rad);
            x1 = xy.x;
            y1 = xy.y;
            xy = me.rotate(x2, y2, -rad);
            x2 = xy.x;
            y2 = xy.y;
            x = (x1 - x2) / 2;
            y = (y1 - y2) / 2;
            h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
            if (h > 1) {
                h = msqrt(h);
                rx = h * rx;
                ry = h * ry;
            }
            rx2 = rx * rx;
            ry2 = ry * ry;
            k = (large_arc_flag == sweep_flag ? -1 : 1) *
                    msqrt(mabs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)));
            cx = k * rx * y / ry + (x1 + x2) / 2;
            cy = k * -ry * x / rx + (y1 + y2) / 2;
            f1 = masin(((y1 - cy) / ry).toFixed(7));
            f2 = masin(((y2 - cy) / ry).toFixed(7));

            f1 = x1 < cx ? PI - f1 : f1;
            f2 = x2 < cx ? PI - f2 : f2;
            if (f1 < 0) {
                f1 = PI * 2 + f1;
            }
            if (f2 < 0) {
                f2 = PI * 2 + f2;
            }
            if (sweep_flag && f1 > f2) {
                f1 = f1 - PI * 2;
            }
            if (!sweep_flag && f2 > f1) {
                f2 = f2 - PI * 2;
            }
        }
        else {
            f1 = recursive[0];
            f2 = recursive[1];
            cx = recursive[2];
            cy = recursive[3];
        }
        df = f2 - f1;
        if (mabs(df) > _120) {
            f2old = f2;
            x2old = x2;
            y2old = y2;
            f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
            x2 = cx + rx * mcos(f2);
            y2 = cy + ry * msin(f2);
            res = me.arc2curve(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
        }
        df = f2 - f1;
        c1 = mcos(f1);
        s1 = msin(f1);
        c2 = mcos(f2);
        s2 = msin(f2);
        t = math.tan(df / 4);
        hx = 4 / 3 * rx * t;
        hy = 4 / 3 * ry * t;
        m1 = [x1, y1];
        m2 = [x1 + hx * s1, y1 - hy * c1];
        m3 = [x2 + hx * s2, y2 - hy * c2];
        m4 = [x2, y2];
        m2[0] = 2 * m1[0] - m2[0];
        m2[1] = 2 * m1[1] - m2[1];
        if (recursive) {
            return [m2, m3, m4].concat(res);
        }
        else {
            res = [m2, m3, m4].concat(res).join().split(",");
            newres = [];
            ln = res.length;
            for (i = 0;  i < ln; i++) {
                newres[i] = i % 2 ? me.rotate(res[i - 1], res[i], rad).y : me.rotate(res[i], res[i + 1], rad).x;
            }
            return newres;
        }
    },

    // TO BE DEPRECATED
    rotateAndTranslatePath: function (sprite) {
        var alpha = sprite.rotation.degrees,
            cx = sprite.rotation.x,
            cy = sprite.rotation.y,
            dx = sprite.translation.x,
            dy = sprite.translation.y,
            path,
            i,
            p,
            xy,
            j,
            res = [];
        if (!alpha && !dx && !dy) {
            return this.pathToAbsolute(sprite.attr.path);
        }
        dx = dx || 0;
        dy = dy || 0;
        path = this.pathToAbsolute(sprite.attr.path);
        for (i = path.length; i--;) {
            p = res[i] = path[i].slice();
            if (p[0] == "A") {
                xy = this.rotatePoint(p[6], p[7], alpha, cx, cy);
                p[6] = xy.x + dx;
                p[7] = xy.y + dy;
            } else {
                j = 1;
                while (p[j + 1] != null) {
                    xy = this.rotatePoint(p[j], p[j + 1], alpha, cx, cy);
                    p[j] = xy.x + dx;
                    p[j + 1] = xy.y + dy;
                    j += 2;
                }
            }
        }
        return res;
    },

    // TO BE DEPRECATED
    rotatePoint: function (x, y, alpha, cx, cy) {
        if (!alpha) {
            return {
                x: x,
                y: y
            };
        }
        cx = cx || 0;
        cy = cy || 0;
        x = x - cx;
        y = y - cy;
        alpha = alpha * this.radian;
        var cos = Math.cos(alpha),
            sin = Math.sin(alpha);
        return {
            x: x * cos - y * sin + cx,
            y: x * sin + y * cos + cy
        };
    },

    pathDimensions: function (path) {
        if (!path || !(path + "")) {
            return {x: 0, y: 0, width: 0, height: 0};
        }
        path = this.path2curve(path);
        var x = 0, 
            y = 0,
            X = [],
            Y = [],
            i = 0,
            ln = path.length,
            p, xmin, ymin, xmax, ymax, dim;
        for (; i < ln; i++) {
            p = path[i];
            if (p[0] == "M") {
                x = p[1];
                y = p[2];
                X.push(x);
                Y.push(y);
            }
            else {
                dim = this.curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                X = X.concat(dim.min.x, dim.max.x);
                Y = Y.concat(dim.min.y, dim.max.y);
                x = p[5];
                y = p[6];
            }
        }
        xmin = Math.min.apply(0, X);
        ymin = Math.min.apply(0, Y);
        xmax = Math.max.apply(0, X);
        ymax = Math.max.apply(0, Y);
        return {
            x: Math.round(xmin),
            y: Math.round(ymin),
            path: path,
            width: Math.round(xmax - xmin),
            height: Math.round(ymax - ymin)
        };
    },

    intersectInside: function(path, cp1, cp2) {
        return (cp2[0] - cp1[0]) * (path[1] - cp1[1]) > (cp2[1] - cp1[1]) * (path[0] - cp1[0]);
    },

    intersectIntersection: function(s, e, cp1, cp2) {
        var p = [],
            dcx = cp1[0] - cp2[0],
            dcy = cp1[1] - cp2[1],
            dpx = s[0] - e[0],
            dpy = s[1] - e[1],
            n1 = cp1[0] * cp2[1] - cp1[1] * cp2[0],
            n2 = s[0] * e[1] - s[1] * e[0],
            n3 = 1 / (dcx * dpy - dcy * dpx);

        p[0] = (n1 * dpx - n2 * dcx) * n3;
        p[1] = (n1 * dpy - n2 * dcy) * n3;
        return p;
    },

    intersect: function(subjectPolygon, clipPolygon) {
        var me = this,
            i = 0,
            ln = clipPolygon.length,
            cp1 = clipPolygon[ln - 1],
            outputList = subjectPolygon,
            cp2, s, e, ln2, inputList, j;
        for (; i < ln; ++i) {
            cp2 = clipPolygon[i];
            inputList = outputList;
            outputList = [];
            s = inputList[inputList.length - 1];
            j = 0;
            ln2 = inputList.length;
            for (; j < ln2; j++) {
                e = inputList[j];
                if (me.intersectInside(e, cp1, cp2)) {
                    if (!me.intersectInside(s, cp1, cp2)) {
                        outputList.push(me.intersectIntersection(s, e, cp1, cp2));
                    }
                    outputList.push(e);
                }
                else if (me.intersectInside(s, cp1, cp2)) {
                    outputList.push(me.intersectIntersection(s, e, cp1, cp2));
                }
                s = e;
            }
            cp1 = cp2;
        }
        return outputList;
    },
    
    bezier : function (a, b, c, d, x) {
        if (x === 0) {
            return a;
        } 
        else if (x === 1) {
            return d;
        }
        var du = 1 - x,
            d3 = du * du * du,
            r = x / du;
        return d3 * (a + r * (3 * b + r * (3 * c + d * r)));
    },
    
    bezierDim : function (a, b, c, d) {
        var points = [], r,
            A, top, C, delta, bottom, s,
            min, max, i;
        // The min and max happens on boundary or b' == 0
        if (a + 3 * c == d + 3 * b) {   
            r = a - b;
            r /= 2 * (a - b - b + c);
            if ( r < 1 && r > 0) {
                points.push(r);
            }
        } else {
            // b'(x) / -3 = (a-3b+3c-d)x^2+ (-2a+4b-2c)x + (a-b)
            // delta = -4 (-b^2+a c+b c-c^2-a d+b d)
            A = a - 3 * b + 3 * c - d;
            top = 2 * (a - b - b + c);
            C = a - b;
            delta = top * top - 4 * A * C;
            bottom = A + A;
            if (delta === 0) {
                r = top / bottom;
                if (r < 1 && r > 0) {
                    points.push(r);
                }
            } else if (delta > 0) {
                s = Math.sqrt(delta);
                r = (s + top) / bottom;
                
                if (r < 1 && r > 0) {
                    points.push(r);
                }
                
                r = (top - s) / bottom;
                
                if (r < 1 && r > 0) {
                    points.push(r);
                }
            }
        }
        min = Math.min(a, d);
        max = Math.max(a, d);
        for (i = 0; i < points.length; i++) {
            min = Math.min(min, this.bezier(a, b, c, d, points[i]));
            max = Math.max(max, this.bezier(a, b, c, d, points[i]));
        }
        return [min, max];
    },
    
    curveDim: function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
        var x = this.bezierDim(p1x, c1x, c2x, p2x),
            y = this.bezierDim(p1y, c1y, c2y, p2y);
        return {
            min: {
                x: x[0],
                y: y[0]
            },
            max: {
                x: x[1],
                y: y[1]
            }
        };
    },

    /**
     * @private
     *
     * Calculates bezier curve control anchor points for a particular point in a path, with a
     * smoothing curve applied. The smoothness of the curve is controlled by the 'value' parameter.
     * Note that this algorithm assumes that the line being smoothed is normalized going from left
     * to right; it makes special adjustments assuming this orientation.
     *
     * @param {Number} prevX X coordinate of the previous point in the path
     * @param {Number} prevY Y coordinate of the previous point in the path
     * @param {Number} curX X coordinate of the current point in the path
     * @param {Number} curY Y coordinate of the current point in the path
     * @param {Number} nextX X coordinate of the next point in the path
     * @param {Number} nextY Y coordinate of the next point in the path
     * @param {Number} value A value to control the smoothness of the curve; this is used to
     *                 divide the distance between points, so a value of 2 corresponds to
     *                 half the distance between points (a very smooth line) while higher values
     *                 result in less smooth curves. Defaults to 4.
     * @return {Object} Object containing x1, y1, x2, y2 bezier control anchor points; x1 and y1
     *                  are the control point for the curve toward the previous path point, and
     *                  x2 and y2 are the control point for the curve toward the next path point.
     */
    getAnchors: function (prevX, prevY, curX, curY, nextX, nextY, value) {
        value = value || 4;
        var M = Math,
            PI = M.PI,
            halfPI = PI / 2,
            abs = M.abs,
            sin = M.sin,
            cos = M.cos,
            atan = M.atan,
            control1Length, control2Length, control1Angle, control2Angle,
            control1X, control1Y, control2X, control2Y, alpha;

        // Find the length of each control anchor line, by dividing the horizontal distance
        // between points by the value parameter.
        control1Length = (curX - prevX) / value;
        control2Length = (nextX - curX) / value;

        // Determine the angle of each control anchor line. If the middle point is a vertical
        // turnaround then we force it to a flat horizontal angle to prevent the curve from
        // dipping above or below the middle point. Otherwise we use an angle that points
        // toward the previous/next target point.
        if ((curY >= prevY && curY >= nextY) || (curY <= prevY && curY <= nextY)) {
            control1Angle = control2Angle = halfPI;
        } else {
            control1Angle = atan((curX - prevX) / abs(curY - prevY));
            if (prevY < curY) {
                control1Angle = PI - control1Angle;
            }
            control2Angle = atan((nextX - curX) / abs(curY - nextY));
            if (nextY < curY) {
                control2Angle = PI - control2Angle;
            }
        }

        // Adjust the calculated angles so they point away from each other on the same line
        alpha = halfPI - ((control1Angle + control2Angle) % (PI * 2)) / 2;
        if (alpha > halfPI) {
            alpha -= PI;
        }
        control1Angle += alpha;
        control2Angle += alpha;

        // Find the control anchor points from the angles and length
        control1X = curX - control1Length * sin(control1Angle);
        control1Y = curY + control1Length * cos(control1Angle);
        control2X = curX + control2Length * sin(control2Angle);
        control2Y = curY + control2Length * cos(control2Angle);

        // One last adjustment, make sure that no control anchor point extends vertically past
        // its target prev/next point, as that results in curves dipping above or below and
        // bending back strangely. If we find this happening we keep the control angle but
        // reduce the length of the control line so it stays within bounds.
        if ((curY > prevY && control1Y < prevY) || (curY < prevY && control1Y > prevY)) {
            control1X += abs(prevY - control1Y) * (control1X - curX) / (control1Y - curY);
            control1Y = prevY;
        }
        if ((curY > nextY && control2Y < nextY) || (curY < nextY && control2Y > nextY)) {
            control2X -= abs(nextY - control2Y) * (control2X - curX) / (control2Y - curY);
            control2Y = nextY;
        }
        
        return {
            x1: control1X,
            y1: control1Y,
            x2: control2X,
            y2: control2Y
        };
    },

    /* Smoothing function for a path.  Converts a path into cubic beziers.  Value defines the divider of the distance between points.
     * Defaults to a value of 4.
     */
    smooth: function (originalPath, value) {
        var path = this.path2curve(originalPath),
            newp = [path[0]],
            x = path[0][1],
            y = path[0][2],
            j,
            points,
            i = 1,
            ii = path.length,
            beg = 1,
            mx = x,
            my = y,
            pathi,
            pathil,
            pathim,
            pathiml,
            pathip,
            pathipl,
            begl;
        
        for (; i < ii; i++) {
            pathi = path[i];
            pathil = pathi.length;
            pathim = path[i - 1];
            pathiml = pathim.length;
            pathip = path[i + 1];
            pathipl = pathip && pathip.length;
            if (pathi[0] == "M") {
                mx = pathi[1];
                my = pathi[2];
                j = i + 1;
                while (path[j][0] != "C") {
                    j++;
                }
                newp.push(["M", mx, my]);
                beg = newp.length;
                x = mx;
                y = my;
                continue;
            }
            if (pathi[pathil - 2] == mx && pathi[pathil - 1] == my && (!pathip || pathip[0] == "M")) {
                begl = newp[beg].length;
                points = this.getAnchors(pathim[pathiml - 2], pathim[pathiml - 1], mx, my, newp[beg][begl - 2], newp[beg][begl - 1], value);
                newp[beg][1] = points.x2;
                newp[beg][2] = points.y2;
            }
            else if (!pathip || pathip[0] == "M") {
                points = {
                    x1: pathi[pathil - 2],
                    y1: pathi[pathil - 1]
                };
            } else {
                points = this.getAnchors(pathim[pathiml - 2], pathim[pathiml - 1], pathi[pathil - 2], pathi[pathil - 1], pathip[pathipl - 2], pathip[pathipl - 1], value);
            }
            newp.push(["C", x, y, points.x1, points.y1, pathi[pathil - 2], pathi[pathil - 1]]);
            x = points.x2;
            y = points.y2;
        }
        return newp;
    },

    findDotAtSegment: function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
        var t1 = 1 - t;
        return {
            x: Math.pow(t1, 3) * p1x + Math.pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + Math.pow(t, 3) * p2x,
            y: Math.pow(t1, 3) * p1y + Math.pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + Math.pow(t, 3) * p2y
        };
    },

    /**
     * @private
     */
    snapEnds: function (from, to, stepsMax, prettyNumbers) {
        if (Ext.isDate(from)) {
            return this.snapEndsByDate(from, to, stepsMax);
        }
        var step = (to - from) / stepsMax,
            level = Math.floor(Math.log(step) / Math.LN10) + 1,
            m = Math.pow(10, level),
            cur,
            floor,
            modulo = Math.round((step % m) * Math.pow(10, 2 - level)),
            interval = [[0, 15], [10, 1], [20, 4], [25, 2], [50, 9], [100, 15]],
            stepCount = 0,
            value,
            weight,
            i,
            topValue,
            topWeight = 1e9,
            ln = interval.length;

        floor = Math.floor(from / m) * m;
        if (from == floor && floor > 0) {
            floor = Math.floor((from - (m/10)) / m) * m;
        }
        
        if (prettyNumbers) {
            for (i = 0; i < ln; i++) {
                value = interval[i][0];
                weight = (value - modulo) < 0 ? 1e6 : (value - modulo) / interval[i][1];
                if (weight < topWeight) {
                    topValue = value;
                    topWeight = weight;
                }
            }
            step = Math.floor(step * Math.pow(10, -level)) * Math.pow(10, level) + topValue * Math.pow(10, level - 2);

            if (from < 0 && to >= 0) {
                cur = 0;
                while (cur > from) {
                    cur -= step;
                    stepCount++;
                }
                from = +cur.toFixed(10);

                cur = 0;
                while (cur < to) {
                    cur += step;
                    stepCount++;
                }
                to = +cur.toFixed(10);
            } else {
                cur = from = floor;
                while (cur < to) {
                    cur += step;
                    stepCount++;
                }
            }
            to = +cur.toFixed(10);
        } else {
            from = floor;
            stepCount = stepsMax;
        }
        
        return {
            from: from,
            to: to,
            power: level,
            step: step,
            steps: stepCount
        };
    },

    /**
     * snapEndsByDate is a utility method to deduce an appropriate tick configuration for the data set of given
     * feature. Refer to {@link #snapEnds}.
     *
     * @param {Date} from The minimum value in the data
     * @param {Date} to The maximum value in the data
     * @param {Number} stepsMax The maximum number of ticks
     * @param {Boolean} lockEnds If true, the 'from' and 'to' parameters will be used as fixed end values and will not be adjusted
     *
     * @return {Object} The calculated step and ends info; properties are:
     * - from: The result start value, which may be lower than the original start value
     * - to: The result end value, which may be higher than the original end value
     * - step: The fixed value size of each step, or undefined if the steps are not fixed.
     * - steps: The number of steps if the steps are fixed, or an array of step values.
     
     * NOTE: Even when the steps have a fixed value, they may not divide the from/to range perfectly evenly;
     * there may be a smaller distance between the last step and the end value than between prior
     * steps, particularly when the `endsLocked` param is true. Therefore it is best to not use
     * the `steps` result when finding the axis tick points, instead use the `step`, `to`, and
     * `from` to find the correct point for each tick.
     */
    snapEndsByDate: function (from, to, stepsMax, lockEnds) {
        var selectedStep = false,
            scales       = [
                [Ext.Date.MILLI, [1, 2, 5, 10, 20, 50, 100, 200, 250, 500]],
                [Ext.Date.SECOND, [1, 2, 5, 10, 15, 30]],
                [Ext.Date.MINUTE, [1, 2, 5, 10, 15, 30]],
                [Ext.Date.HOUR, [1, 2, 3, 4, 6, 12]],
                [Ext.Date.DAY, [1, 2, 7, 14]],
                [Ext.Date.MONTH, [1, 2, 3, 6]]
            ],
            sLen         = scales.length,
            stop         = false,
            scale, j, yearDiff, s;

        // Find the most desirable scale
        for (s = 0; s < sLen; s++) {
            scale = scales[s];
            if (!stop) {
                for (j = 0; j < scale[1].length; j++) {
                    if (to < Ext.Date.add(from, scale[0], scale[1][j] * stepsMax)) {
                        selectedStep = [scale[0], scale[1][j]];
                        stop         = true;
                        break;
                    }
                }
            }
        }

        if (!selectedStep) {
            yearDiff = this.snapEnds(from.getFullYear(), to.getFullYear() + 1, stepsMax, lockEnds);
            selectedStep = [Date.YEAR, Math.round(yearDiff.step)];
        }
        return this.snapEndsByDateAndStep(from, to, selectedStep, lockEnds);
    },


    /**
     * snapEndsByDateAndStep is a utility method to deduce an appropriate tick configuration for the data set of given
     * feature and specific step size.
     *
     * @param {Date} from The minimum value in the data
     * @param {Date} to The maximum value in the data
     * @param {Array} step An array with two components: The first is the unit of the step (day, month, year, etc). 
     * The second is the number of units for the step (1, 2, etc.).
     * If the number is an integer, it represents the number of units for the step ([Ext.Date.DAY, 2] means "Every other day").
     * If the number is a fraction, it represents the number of steps per unit ([Ext.Date.DAY, 1/2] means "Twice a day").
     * If the unit is the month, the steps may be adjusted depending on the month. For instance [Ext.Date.MONTH, 1/3], which means "Three times a month",
     * generates steps on the 1st, the 10th and the 20th of every month regardless of whether a month has 28 days or 31 days. The steps are generated
     * as follows:
     * - [Ext.Date.MONTH, n]: on the current date every 'n' months, maxed to the number of days in the month.
     * - [Ext.Date.MONTH, 1/2]: on the 1st and 15th of every month.
     * - [Ext.Date.MONTH, 1/3]: on the 1st, 10th and 20th of every month.
     * - [Ext.Date.MONTH, 1/4]: on the 1st, 8th, 15th and 22nd of every month.
     * @param {Boolean} lockEnds If true, the 'from' and 'to' parameters will be used as fixed end values
     *        and will not be adjusted
     *
     * @return {Object} The calculated step and ends info; properties are:
     * - from: The result start value, which may be lower than the original start value
     * - to: The result end value, which may be higher than the original end value
     * - step: The fixed value size of each step, or undefined if the steps are not fixed.
     * - steps: The number of steps if the steps are fixed, or an array of step values.
     
     * NOTE: Even when the steps have a fixed value, they may not divide the from/to range perfectly evenly;
     * there may be a smaller distance between the last step and the end value than between prior
     * steps, particularly when the `endsLocked` param is true. Therefore it is best to not use
     * the `steps` result when finding the axis tick points, instead use the `step`, `to`, and
     * `from` to find the correct point for each tick. For Ext.Date.MONTH and Ext.Date.YEAR step unit,
     * `steps` are always returned as array instead of number of steps; this is because months and years
     * have uneven step distribution and dividing them in even intervals does not work correctly.
     */

    snapEndsByDateAndStep: function(from, to, step, lockEnds) {
        var fromStat = [from.getFullYear(), from.getMonth(), from.getDate(),
            from.getHours(), from.getMinutes(), from.getSeconds(), from.getMilliseconds()],
            testFrom, testTo, date, year, month, day, fractionalMonth, stepsArray,
            stepUnit = step[0], stepValue = step[1],
            steps = 0;
        
        if (lockEnds) {
            testFrom = from;
        }
        else {
            switch (stepUnit) {
                case Ext.Date.MILLI:
                    testFrom = new Date(fromStat[0], fromStat[1], fromStat[2], fromStat[3],
                            fromStat[4], fromStat[5], Math.floor(fromStat[6] / stepValue) * stepValue);
                    break;
                case Ext.Date.SECOND:
                    testFrom = new Date(fromStat[0], fromStat[1], fromStat[2], fromStat[3],
                            fromStat[4], Math.floor(fromStat[5] / stepValue) * stepValue, 0);
                    break;
                case Ext.Date.MINUTE:
                    testFrom = new Date(fromStat[0], fromStat[1], fromStat[2], fromStat[3],
                            Math.floor(fromStat[4] / stepValue) * stepValue, 0, 0);
                    break;
                case Ext.Date.HOUR:
                    testFrom = new Date(fromStat[0], fromStat[1], fromStat[2],
                            Math.floor(fromStat[3] / stepValue) * stepValue, 0, 0, 0);
                    break;
                case Ext.Date.DAY:
                    testFrom = new Date(fromStat[0], fromStat[1],
                            Math.floor((fromStat[2] - 1) / stepValue) * stepValue + 1, 0, 0, 0, 0);
                    break;
                case Ext.Date.MONTH:
                    testFrom = new Date(fromStat[0], Math.floor(fromStat[1] / stepValue) * stepValue, 1, 0, 0, 0, 0);
                    steps = [];
                    stepsArray = true;
                    break;
                default: // Ext.Date.YEAR
                    testFrom = new Date(Math.floor(fromStat[0] / stepValue) * stepValue, 0, 1, 0, 0, 0, 0);
                    steps = [];
                    stepsArray = true;
                    break;
            }
        }

        fractionalMonth = ((stepUnit === Ext.Date.MONTH) && (stepValue == 1/2 || stepValue == 1/3 || stepValue == 1/4));

        // TODO(zhangbei) : We can do it better somehow...
        testTo = new Date(testFrom);
        while (testTo < to) {
            if (fractionalMonth) {
                date = new Date(testTo);
                year = date.getFullYear();
                month = date.getMonth();
                day = date.getDate();
                switch(stepValue) {
                    case 1/2:   // the 1st and 15th of every month
                        if (day >= 15) {
                            day = 1;
                            if (++month > 11) {
                                year++;
                            }
                        }
                        else {
                            day = 15;
                        }
                        break;

                    case 1/3:   // the 1st, 10th and 20th of every month
                        if (day >= 20) {
                            day = 1;
                            if (++month > 11) {
                                year++;
                            }
                        }
                        else {
                            if (day >= 10) {
                                day = 20
                            }
                            else {
                                day = 10;
                            }
                        }
                        break;

                    case 1/4:   // the 1st, 8th, 15th and 22nd of every month
                        if (day >= 22) {
                            day = 1;
                            if (++month > 11) {
                                year++;
                            }
                        }
                        else {
                            if (day >= 15) {
                                day = 22
                            }
                            else {
                                if (day >= 8) {
                                    day = 15
                                }
                                else {
                                    day = 8;
                                }
                            }
                        }
                        break;
                }
                testTo.setYear(year);
                testTo.setMonth(month);
                testTo.setDate(day);
                steps.push(new Date(testTo));
            }
            else if (stepsArray) {
                testTo = Ext.Date.add(testTo, stepUnit, stepValue);
                steps.push(new Date(testTo));
            }
            else {
                testTo = Ext.Date.add(testTo, stepUnit, stepValue);                
                steps++;
            }
        }

        if (lockEnds) {
            testTo = to;
        }
        
        if (stepsArray) {
            return {
                from : +testFrom,
                to : +testTo,
                steps : steps   // array of steps
            };            
        }
        else {
            return {
                from : +testFrom,
                to : +testTo,
                step : (testTo - testFrom) / steps,
                steps : steps   // number of steps
            };            
        }
    },

    sorter: function (a, b) {
        return a.offset - b.offset;
    },

    rad: function(degrees) {
        return degrees % 360 * Math.PI / 180;
    },

    normalizeRadians: function(radian) {
        var twoPi = 2 * Math.PI;
        if (radian >= 0) {
            return radian % twoPi;
        }
        return ((radian % twoPi) + twoPi) % twoPi;
    },

    degrees: function(radian) {
        return radian * 180 / Math.PI % 360;
    },

    normalizeDegrees: function(degrees) {
        if (degrees >= 0) {
            return degrees % 360;
        }
        return ((degrees % 360) + 360) % 360;
    },

    withinBox: function(x, y, bbox) {
        bbox = bbox || {};
        return (x >= bbox.x && x <= (bbox.x + bbox.width) && y >= bbox.y && y <= (bbox.y + bbox.height));
    },

    parseGradient: function(gradient) {
        var me = this,
            type = gradient.type || 'linear',
            angle = gradient.angle || 0,
            radian = me.radian,
            stops = gradient.stops,
            stopsArr = [],
            stop,
            vector,
            max,
            stopObj;

        if (type == 'linear') {
            vector = [0, 0, Math.cos(angle * radian), Math.sin(angle * radian)];
            max = 1 / (Math.max(Math.abs(vector[2]), Math.abs(vector[3])) || 1);
            vector[2] *= max;
            vector[3] *= max;
            if (vector[2] < 0) {
                vector[0] = -vector[2];
                vector[2] = 0;
            }
            if (vector[3] < 0) {
                vector[1] = -vector[3];
                vector[3] = 0;
            }
        }

        for (stop in stops) {
            if (stops.hasOwnProperty(stop) && me.stopsRE.test(stop)) {
                stopObj = {
                    offset: parseInt(stop, 10),
                    color: Ext.draw.Color.toHex(stops[stop].color) || '#ffffff',
                    opacity: stops[stop].opacity || 1
                };
                stopsArr.push(stopObj);
            }
        }
        // Sort by pct property
        Ext.Array.sort(stopsArr, me.sorter);
        if (type == 'linear') {
            return {
                id: gradient.id,
                type: type,
                vector: vector,
                stops: stopsArr
            };
        }
        else {
            return {
                id: gradient.id,
                type: type,
                centerX: gradient.centerX,
                centerY: gradient.centerY,
                focalX: gradient.focalX,
                focalY: gradient.focalY,
                radius: gradient.radius,
                vector: vector,
                stops: stopsArr
            };
        }
    }
});

/**
 * @class Ext.chart.axis.Axis
 *
 * Defines axis for charts. The axis position, type, style can be configured.
 * The axes are defined in an axes array of configuration objects where the type,
 * field, grid and other configuration options can be set. To know more about how
 * to create a Chart please check the Chart class documentation. Here's an example for the axes part:
 * An example of axis for a series (in this case for an area chart that has multiple layers of yFields) could be:
 *
 *     axes: [{
 *         type: 'Numeric',
 *         position: 'left',
 *         titleAlign: 'end', // or 'start', or 'center' (default)
 *         fields: ['data1', 'data2', 'data3'],
 *         title: 'Number of Hits',
 *         grid: {
 *             odd: {
 *                 opacity: 1,
 *                 fill: '#ddd',
 *                 stroke: '#bbb',
 *                 'stroke-width': 1
 *             }
 *         },
 *         minimum: 0
 *     }, {
 *         type: 'Category',
 *         position: 'bottom',
 *         fields: ['name'],
 *         title: 'Month of the Year',
 *         grid: true,
 *         label: {
 *             rotate: {
 *                 degrees: 315
 *             }
 *         }
 *     }]
 *
 * In this case we use a `Numeric` axis for displaying the values of the Area series and a `Category` axis for displaying the names of
 * the store elements. The numeric axis is placed on the left of the screen, while the category axis is placed at the bottom of the chart.
 * Both the category and numeric axes have `grid` set, which means that horizontal and vertical lines will cover the chart background. In the
 * category axis the labels will be rotated so they can fit the space better.
 */
Ext.define('Ext.chart.axis.Axis', {

    /* Begin Definitions */

    extend: 'Ext.chart.axis.Abstract',

    alternateClassName: 'Ext.chart.Axis',

    requires: ['Ext.draw.Draw'],

    /* End Definitions */

    /**
     * @cfg {Boolean/Object} grid
     * The grid configuration enables you to set a background grid for an axis.
     * If set to *true* on a vertical axis, vertical lines will be drawn.
     * If set to *true* on a horizontal axis, horizontal lines will be drawn.
     * If both are set, a proper grid with horizontal and vertical lines will be drawn.
     *
     * You can set specific options for the grid configuration for odd and/or even lines/rows.
     * Since the rows being drawn are rectangle sprites, you can set to an odd or even property
     * all styles that apply to {@link Ext.draw.Sprite}. For more information on all the style
     * properties you can set please take a look at {@link Ext.draw.Sprite}. Some useful style 
     * properties are `opacity`, `fill`, `stroke`, `stroke-width`, etc.
     *
     * The possible values for a grid option are then *true*, *false*, or an object with `{ odd, even }` properties
     * where each property contains a sprite style descriptor object that is defined in {@link Ext.draw.Sprite}.
     *
     * For example:
     *
     *     axes: [{
     *         type: 'Numeric',
     *         position: 'left',
     *         fields: ['data1', 'data2', 'data3'],
     *         title: 'Number of Hits',
     *         grid: {
     *             odd: {
     *                 opacity: 1,
     *                 fill: '#ddd',
     *                 stroke: '#bbb',
     *                 'stroke-width': 1
     *             }
     *         }
     *     }, {
     *         type: 'Category',
     *         position: 'bottom',
     *         fields: ['name'],
     *         title: 'Month of the Year',
     *         grid: true
     *     }]
     *
     */

    /**
     * @cfg {Number} majorTickSteps
     * If `minimum` and `maximum` are specified it forces the number of major ticks to the specified value.
     * If a number of major ticks is forced, it wont search for pretty numbers at the ticks.
     */

    /**
     * @cfg {Number} minorTickSteps
     * The number of small ticks between two major ticks. Default is zero.
     */

    /**
     * @cfg {String} title
     * The title for the Axis
     */

     /**
      * @cfg {Boolean} hidden
      * `true` to hide the axis.
      */
     hidden: false,

    // @private force min/max values from store
    forceMinMax: false,

    /**
     * @cfg {Number} dashSize
     * The size of the dash marker. Default's 3.
     */
    dashSize: 3,

    /**
     * @cfg {String} position
     * Where to set the axis. Available options are `left`, `bottom`, `right`, `top`. Default's `bottom`.
     */
    position: 'bottom',

    // @private
    skipFirst: false,

    /**
     * @cfg {Number} length
     * Offset axis position. Default's 0.
     */
    length: 0,

    /**
     * @cfg {Number} width
     * Offset axis width. Default's 0.
     */
    width: 0,

    /**
     * @cfg {Boolean} adjustEnd
     * Whether to adjust the label at the end of the axis.
     */
    adjustEnd: true,

    majorTickSteps: false,
    
    nullGutters: { lower: 0, upper: 0, verticalAxis: undefined },

    // @private
    applyData: Ext.emptyFn,

    getRange: function () {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            data = store.data.items,
            series = chart.series.items,
            position = me.position,
            axes,
            seriesClasses = Ext.chart.series,
            aggregations = [],
            min = Infinity, max = -Infinity,
            vertical = me.position === 'left' || me.position === 'right' || me.position === 'radial',
            i, ln, ln2, j, k, dataLength = data.length, aggregates,
            countedFields = {},
            allFields = {},
            excludable = true,
            fields, fieldMap, record, field, value;

        fields = me.fields;
        for (j = 0, ln = fields.length; j < ln; j++) {
            allFields[fields[j]] = true;
        }

        for (i = 0, ln = series.length; i < ln; i++) {
            if (series[i].seriesIsHidden) {
                continue;
            }
            if (!series[i].getAxesForXAndYFields) {
                continue;
            }
            axes = series[i].getAxesForXAndYFields();
            if (axes.xAxis && axes.xAxis !== position && axes.yAxis && axes.yAxis !== position) {
                // The series doesn't use this axis.
                continue;
            }

            if (seriesClasses.Bar && series[i] instanceof seriesClasses.Bar && !series[i].column) {
                // If this is a horizontal bar series, then flip xField and yField.
                fields = vertical ? Ext.Array.from(series[i].xField) : Ext.Array.from(series[i].yField);
            } else {
                fields = vertical ? Ext.Array.from(series[i].yField) : Ext.Array.from(series[i].xField);
            }

            if (me.fields.length) {
                for (j = 0, ln2 = fields.length; j < ln2; j++) {
                    if (allFields[fields[j]]) {
                        break;
                    }
                }
                if (j == ln2) {
                    // Not matching fields, skipping this series.
                    continue;
                }
            }

            if (aggregates = series[i].stacked) {
                // If this is a bar/column series, then it will be aggregated if it is of the same direction of the axis.
                if (seriesClasses.Bar && series[i] instanceof seriesClasses.Bar) {
                    if (series[i].column != vertical) {
                        aggregates = false;
                        excludable = false;
                    }
                }
                // Otherwise it is stacked vertically
                else if (!vertical) {
                    aggregates = false;
                    excludable = false;
                }
            }


            if (aggregates) {
                fieldMap = {};
                for (j = 0; j < fields.length; j++) {
                    if (excludable && series[i].__excludes && series[i].__excludes[j]) {
                        continue;
                    }
                    if (!allFields[fields[j]]) {
                        Ext.Logger.warn('Field `' + fields[j] + '` is not included in the ' + position + ' axis config.');
                    }
                    allFields[fields[j]] = fieldMap[fields[j]] = true;
                }
                aggregations.push({
                    fields: fieldMap,
                    positiveValue: 0,
                    negativeValue: 0
                });
            } else {

                if (!fields || fields.length == 0) {
                    fields = me.fields;
                }
                for (j = 0; j < fields.length; j++) {
                    if (excludable && series[i].__excludes && series[i].__excludes[j]) {
                        continue;
                    }
                    allFields[fields[j]] = countedFields[fields[j]] = true;
                }
            }
        }

        for (i = 0; i < dataLength; i++) {
            record = data[i];
            for (k = 0; k < aggregations.length; k++) {
                aggregations[k].positiveValue = 0;
                aggregations[k].negativeValue = 0;
            }
            for (field in allFields) {
                value = record.get(field);
                if (me.type == 'Time' && typeof value == "string") {
                    value = Date.parse(value);
                }
                if (isNaN(value)) {
                    continue;
                }
                if (value === undefined) {
                    value = 0;
                } else {
                    value = Number(value);
                }
                if (countedFields[field]) {
                    if (min > value) {
                        min = value;
                    }
                    if (max < value) {
                        max = value;
                    }
                }
                for (k = 0; k < aggregations.length; k++) {
                    if (aggregations[k].fields[field]) {

                        if (value >= 0) {
                            aggregations[k].positiveValue += value;
                            if (max < aggregations[k].positiveValue) {
                                max = aggregations[k].positiveValue;
                            }
                            // If any aggregation is actually hit, then the min value should be at most 0.
                            if (min > 0) {
                                min = 0;
                            }
                        } else {
                            aggregations[k].negativeValue += value;
                            if (min > aggregations[k].negativeValue) {
                                min = aggregations[k].negativeValue;
                            }
                            // If any aggregation is actually hit, then the max value should be at least 0.
                            if (max < 0) {
                                max = 0;
                            }
                        }
                    }
                }
            }
        }

        if (!isFinite(max)) {
            max = me.prevMax || 0;
        }
        if (!isFinite(min)) {
            min = me.prevMin || 0;
        }

        if (typeof min === 'number') {
            min = Ext.Number.correctFloat(min);
        }
         
        if (typeof max === 'number') {
            max = Ext.Number.correctFloat(max);
        }
        
        //normalize min max for snapEnds.
        if (min != max && (max != Math.floor(max) || min != Math.floor(min))) {
            min = Math.floor(min);
            max = Math.floor(max) + 1;
        }

        if (!isNaN(me.minimum)) {
            min = me.minimum;
        }

        if (!isNaN(me.maximum)) {
            max = me.maximum;
        }

        if (min >= max) {
            // snapEnds will return NaN if max >= min;
            min = Math.floor(min);
            max = min + 1;                
        }

        return {min: min, max: max};
    },

    // @private creates a structure with start, end and step points.
    calcEnds: function () {
        var me = this,
            range = me.getRange(),
            min = range.min,
            max = range.max,
            steps, prettyNumbers, out, changedRange;

        steps = (Ext.isNumber(me.majorTickSteps) ? me.majorTickSteps + 1 : me.steps);
        prettyNumbers = !(Ext.isNumber(me.maximum) && Ext.isNumber(me.minimum) && Ext.isNumber(me.majorTickSteps) && me.majorTickSteps > 0);

        out = Ext.draw.Draw.snapEnds(min, max, steps, prettyNumbers);

        if (Ext.isNumber(me.maximum)) {
            out.to = me.maximum;
            changedRange = true;
        }
        if (Ext.isNumber(me.minimum)) {
            out.from = me.minimum;
            changedRange = true;
        }
        if (me.adjustMaximumByMajorUnit) {
            out.to = Math.ceil(out.to / out.step) * out.step;
            changedRange = true;
        }
        if (me.adjustMinimumByMajorUnit) {
            out.from = Math.floor(out.from / out.step) * out.step;
            changedRange = true;
        }

        if (changedRange) {
            out.steps = Math.ceil((out.to - out.from) / out.step);            
        }

        me.prevMin = (min == max ? 0 : min);
        me.prevMax = max;
        return out;
    },


    /**
     * Renders the axis into the screen and updates its position.
     */
    drawAxis: function (init) {
        var me = this,
            i, 
            x = me.x,
            y = me.y,
            dashSize = me.dashSize,
            length = me.length,
            position = me.position,
            verticalAxis = (position == 'left' || position == 'right'),
            inflections = [],
            calcLabels = (me.isNumericAxis),
            stepCalcs = me.applyData(),
            step = stepCalcs.step,
            steps = stepCalcs.steps,
            stepsArray = Ext.isArray(steps),
            from = stepCalcs.from,
            to = stepCalcs.to,
            // If we have a single item, to - from will be 0.
            axisRange = (to - from) || 1,
            trueLength,
            currentX,
            currentY,
            path,
            subDashesX = me.minorTickSteps || 0,
            subDashesY = me.minorTickSteps || 0,
            dashesX = Math.max(subDashesX + 1, 0),
            dashesY = Math.max(subDashesY + 1, 0),
            dashDirection = (position == 'left' || position == 'top' ? -1 : 1),
            dashLength = dashSize * dashDirection,
            series = me.chart.series.items,
            firstSeries = series[0],
            gutters = Ext.clone(firstSeries ? firstSeries.nullGutters : me.nullGutters),
            seriesGutters,
            hasGutters,
            sameDirectionGutters,
            padding,
            subDashes,
            subDashValue,
            delta = 0,
            stepCount = 0,
            tick, axes, ln, val, begin, end;

        me.from = from;
        me.to = to;
        
        // If there is nothing to show, then leave. 
        if (me.hidden || (from > to)) {
            return;
        }

        // If no steps are specified (for instance if the store is empty), then leave.
        if ((stepsArray && (steps.length == 0)) || (!stepsArray && isNaN(step))) {
            return;
        }

        if (stepsArray) {
            // Clean the array of steps:
            // First remove the steps that are out of bounds.
            steps = Ext.Array.filter(steps, function(elem, index, array) {
                return (+elem > +me.from && +elem < +me.to);
            }, this);

            // Then add bounds on each side.
            steps = Ext.Array.union([me.from], steps, [me.to]);
        }
        else {
            // Build the array of steps out of the fixed-value 'step'.
            steps = new Array;
            for (val = +me.from; val < +me.to; val += step) {
                steps.push(val);
            }
            steps.push(+me.to);
        }
        stepCount = steps.length;


        // Get the gutters for the matching series
        for (i = 0, ln = series.length; i < ln; i++) {
            if (series[i].seriesIsHidden) {
                continue;
            }
            if (!series[i].getAxesForXAndYFields) {
                continue;
            }
            axes = series[i].getAxesForXAndYFields();
            if (!axes.xAxis || !axes.yAxis || (axes.xAxis === position) || (axes.yAxis === position)) {
                seriesGutters = Ext.clone(series[i].getGutters());
                hasGutters = (seriesGutters.verticalAxis !== undefined);
                sameDirectionGutters = (hasGutters && (seriesGutters.verticalAxis == verticalAxis));
                if (hasGutters) {
                    if (!sameDirectionGutters) {
                        // This series has gutters that don't apply to the direction of this axis
                        // (for instance, gutters for Bars apply to the vertical axis while gutters  
                        // for Columns apply to the horizontal axis). Since there is no gutter, the 
                        // padding is all that is left to take into account.
                        padding = series[i].getPadding();
                        if (verticalAxis) {
                            seriesGutters = { lower: padding.bottom, upper: padding.top, verticalAxis: true };
                        } else {
                            seriesGutters = { lower: padding.left, upper: padding.right, verticalAxis: false };
                        }
                    }
                    if (gutters.lower < seriesGutters.lower) {
                        gutters.lower = seriesGutters.lower;
                    }
                    if (gutters.upper < seriesGutters.upper) {
                        gutters.upper = seriesGutters.upper;
                    }
                    gutters.verticalAxis = verticalAxis;
                }
            }
        }

        // Draw the major ticks

        if (calcLabels) {
            me.labels = [];
        }

        if (gutters) {
            if (verticalAxis) {
                currentX = Math.floor(x);
                path = ["M", currentX + 0.5, y, "l", 0, -length];
                trueLength = length - (gutters.lower + gutters.upper);

                for (tick = 0; tick < stepCount; tick++) {
                    currentY = y - gutters.lower - (steps[tick] - steps[0]) * trueLength / axisRange;
                    path.push("M", currentX, Math.floor(currentY) + 0.5, "l", dashLength * 2, 0);

                    inflections.push([ currentX, Math.floor(currentY) ]);

                    if (calcLabels) {
                        me.labels.push(steps[tick]);
                    }
                }
            } else {
                currentY = Math.floor(y);
                path = ["M", x, currentY + 0.5, "l", length, 0];
                trueLength = length - (gutters.lower + gutters.upper);

                for (tick = 0; tick < stepCount; tick++) {
                    currentX = x + gutters.lower + (steps[tick] - steps[0]) * trueLength / axisRange;
                    path.push("M", Math.floor(currentX) + 0.5, currentY, "l", 0, dashLength * 2 + 1);

                    inflections.push([ Math.floor(currentX), currentY ]);

                    if (calcLabels) {
                        me.labels.push(steps[tick]);
                    }
                }
            }
        }


        // Draw the minor ticks

        // If 'minorTickSteps' is...
        // - A number: it contains the number of minor ticks between 2 major ticks.
        // - An array with 2 numbers: it contains a date interval like [Ext.Date.DAY,2].
        // - An array with a single number: it contains the value of a minor tick.
        subDashes = (verticalAxis ? subDashesY : subDashesX);
        if (Ext.isArray(subDashes)) {
            if (subDashes.length == 2) {
                subDashValue = +Ext.Date.add(new Date(), subDashes[0], subDashes[1]) - Date.now();
            } else {
                subDashValue = subDashes[0];
            }
        }
        else {
            if (Ext.isNumber(subDashes) && subDashes > 0) {
                subDashValue = step / (subDashes + 1);
            }
        }

        if (gutters && subDashValue) {
            for (tick = 0; tick < stepCount - 1; tick++) {
                begin = +steps[tick];
                end = +steps[tick+1];
                if (verticalAxis) {
                    for (value = begin + subDashValue; value < end; value += subDashValue) {
                        currentY = y - gutters.lower - (value - steps[0]) * trueLength / axisRange;
                        path.push("M", currentX, Math.floor(currentY) + 0.5, "l", dashLength, 0);
                    }
                }
                else {
                    for (value = begin + subDashValue; value < end; value += subDashValue) {
                        currentX = x + gutters.upper + (value - steps[0]) * trueLength / axisRange;
                        path.push("M", Math.floor(currentX) + 0.5, currentY, "l", 0, dashLength + 1);
                    }
                }
            }            
        }


        // Render

        if (!me.axis) {
            me.axis = me.chart.surface.add(Ext.apply({
                type: 'path',
                path: path
            }, me.axisStyle));
        }
        me.axis.setAttributes({
            path: path
        }, true);
        me.inflections = inflections;
        if (!init && me.grid) {
            me.drawGrid();
        }
        me.axisBBox = me.axis.getBBox();
        me.drawLabel();
    },

    /**
     * Renders an horizontal and/or vertical grid into the Surface.
     */
    drawGrid: function () {
        var me = this,
            surface = me.chart.surface,
            grid = me.grid,
            odd = grid.odd,
            even = grid.even,
            inflections = me.inflections,
            ln = inflections.length - ((odd || even) ? 0 : 1),
            position = me.position,
            maxGutters = me.chart.maxGutters,
            width = me.width - 2,
            point, prevPoint,
            i = 1,
            path = [], styles, lineWidth, dlineWidth,
            oddPath = [], evenPath = [];

        if (((maxGutters.bottom !== 0 || maxGutters.top !== 0) && (position == 'left' || position == 'right')) ||
            ((maxGutters.left !== 0 || maxGutters.right !== 0) && (position == 'top' || position == 'bottom'))) {
            i = 0;
            ln++;
        }
        for (; i < ln; i++) {
            point = inflections[i];
            prevPoint = inflections[i - 1];
            if (odd || even) {
                path = (i % 2) ? oddPath : evenPath;
                styles = ((i % 2) ? odd : even) || {};
                lineWidth = (styles.lineWidth || styles['stroke-width'] || 0) / 2;
                dlineWidth = 2 * lineWidth;
                if (position == 'left') {
                    path.push("M", prevPoint[0] + 1 + lineWidth, prevPoint[1] + 0.5 - lineWidth,
                        "L", prevPoint[0] + 1 + width - lineWidth, prevPoint[1] + 0.5 - lineWidth,
                        "L", point[0] + 1 + width - lineWidth, point[1] + 0.5 + lineWidth,
                        "L", point[0] + 1 + lineWidth, point[1] + 0.5 + lineWidth, "Z");
                }
                else if (position == 'right') {
                    path.push("M", prevPoint[0] - lineWidth, prevPoint[1] + 0.5 - lineWidth,
                        "L", prevPoint[0] - width + lineWidth, prevPoint[1] + 0.5 - lineWidth,
                        "L", point[0] - width + lineWidth, point[1] + 0.5 + lineWidth,
                        "L", point[0] - lineWidth, point[1] + 0.5 + lineWidth, "Z");
                }
                else if (position == 'top') {
                    path.push("M", prevPoint[0] + 0.5 + lineWidth, prevPoint[1] + 1 + lineWidth,
                        "L", prevPoint[0] + 0.5 + lineWidth, prevPoint[1] + 1 + width - lineWidth,
                        "L", point[0] + 0.5 - lineWidth, point[1] + 1 + width - lineWidth,
                        "L", point[0] + 0.5 - lineWidth, point[1] + 1 + lineWidth, "Z");
                }
                else {
                    path.push("M", prevPoint[0] + 0.5 + lineWidth, prevPoint[1] - lineWidth,
                        "L", prevPoint[0] + 0.5 + lineWidth, prevPoint[1] - width + lineWidth,
                        "L", point[0] + 0.5 - lineWidth, point[1] - width + lineWidth,
                        "L", point[0] + 0.5 - lineWidth, point[1] - lineWidth, "Z");
                }
            } else {
                if (position == 'left') {
                    path = path.concat(["M", point[0] + 0.5, point[1] + 0.5, "l", width, 0]);
                }
                else if (position == 'right') {
                    path = path.concat(["M", point[0] - 0.5, point[1] + 0.5, "l", -width, 0]);
                }
                else if (position == 'top') {
                    path = path.concat(["M", point[0] + 0.5, point[1] + 0.5, "l", 0, width]);
                }
                else {
                    path = path.concat(["M", point[0] + 0.5, point[1] - 0.5, "l", 0, -width]);
                }
            }
        }
        if (odd || even) {
            if (oddPath.length) {
                if (!me.gridOdd && oddPath.length) {
                    me.gridOdd = surface.add({
                        type: 'path',
                        path: oddPath
                    });
                }
                me.gridOdd.setAttributes(Ext.apply({
                    path: oddPath,
                    hidden: false
                }, odd || {}), true);
            }
            if (evenPath.length) {
                if (!me.gridEven) {
                    me.gridEven = surface.add({
                        type: 'path',
                        path: evenPath
                    });
                }
                me.gridEven.setAttributes(Ext.apply({
                    path: evenPath,
                    hidden: false
                }, even || {}), true);
            }
        }
        else {
            if (path.length) {
                if (!me.gridLines) {
                    me.gridLines = me.chart.surface.add({
                        type: 'path',
                        path: path,
                        "stroke-width": me.lineWidth || 1,
                        stroke: me.gridColor || '#ccc'
                    });
                }
                me.gridLines.setAttributes({
                    hidden: false,
                    path: path
                }, true);
            }
            else if (me.gridLines) {
                me.gridLines.hide(true);
            }
        }
    },

    // @private
    getOrCreateLabel: function (i, text) {
        var me = this,
            labelGroup = me.labelGroup,
            textLabel = labelGroup.getAt(i),
            surface = me.chart.surface;
        if (textLabel) {
            if (text != textLabel.attr.text) {
                textLabel.setAttributes(Ext.apply({
                    text: text
                }, me.label), true);
                textLabel._bbox = textLabel.getBBox();
            }
        }
        else {
            textLabel = surface.add(Ext.apply({
                group: labelGroup,
                type: 'text',
                x: 0,
                y: 0,
                text: text
            }, me.label));
            surface.renderItem(textLabel);
            textLabel._bbox = textLabel.getBBox();
        }
        //get untransformed bounding box
        if (me.label.rotation) {
            textLabel.setAttributes({
                rotation: {
                    degrees: 0
                }
            }, true);
            textLabel._ubbox = textLabel.getBBox();
            textLabel.setAttributes(me.label, true);
        } else {
            textLabel._ubbox = textLabel._bbox;
        }
        return textLabel;
    },

    rect2pointArray: function (sprite) {
        var surface = this.chart.surface,
            rect = surface.getBBox(sprite, true),
            p1 = [rect.x, rect.y],
            p1p = p1.slice(),
            p2 = [rect.x + rect.width, rect.y],
            p2p = p2.slice(),
            p3 = [rect.x + rect.width, rect.y + rect.height],
            p3p = p3.slice(),
            p4 = [rect.x, rect.y + rect.height],
            p4p = p4.slice(),
            matrix = sprite.matrix;
        //transform the points
        p1[0] = matrix.x.apply(matrix, p1p);
        p1[1] = matrix.y.apply(matrix, p1p);

        p2[0] = matrix.x.apply(matrix, p2p);
        p2[1] = matrix.y.apply(matrix, p2p);

        p3[0] = matrix.x.apply(matrix, p3p);
        p3[1] = matrix.y.apply(matrix, p3p);

        p4[0] = matrix.x.apply(matrix, p4p);
        p4[1] = matrix.y.apply(matrix, p4p);
        return [p1, p2, p3, p4];
    },

    intersect: function (l1, l2) {
        var r1 = this.rect2pointArray(l1),
            r2 = this.rect2pointArray(l2);
        return !!Ext.draw.Draw.intersect(r1, r2).length;
    },

    drawHorizontalLabels: function () {
        var me = this,
            labelConf = me.label,
            floor = Math.floor,
            max = Math.max,
            axes = me.chart.axes,
            insetPadding = me.chart.insetPadding,
            gutters = me.chart.maxGutters,
            position = me.position,
            inflections = me.inflections,
            ln = inflections.length,
            labels = me.labels,
            maxHeight = 0,
            ratio,
            bbox, point, prevLabel, prevLabelId,
            adjustEnd = me.adjustEnd,
            hasLeft = axes.findIndex('position', 'left') != -1,
            hasRight = axes.findIndex('position', 'right') != -1,
            reverse = me.reverse,
            textLabel, text, idx,
            last, x, y, i, firstLabel;

        last = ln - 1;
        //get a reference to the first text label dimensions
        point = inflections[0];
        firstLabel = me.getOrCreateLabel(0, me.label.renderer(labels[0]));
        ratio = Math.floor(Math.abs(Math.sin(labelConf.rotate && (labelConf.rotate.degrees * Math.PI / 180) || 0)));

        for (i = 0; i < ln; i++) {
            point = inflections[i];
            idx = i;
            if (reverse) {
                idx = ln - i - 1;
            }
            text = me.label.renderer(labels[idx]);
            textLabel = me.getOrCreateLabel(i, text);
            bbox = textLabel._bbox;
            maxHeight = max(maxHeight, bbox.height + me.dashSize + me.label.padding);
            x = floor(point[0] - (ratio ? bbox.height : bbox.width) / 2);
            if (adjustEnd && gutters.left == 0 && gutters.right == 0) {
                if (i == 0 && !hasLeft) {
                    x = point[0];
                }
                else if (i == last && !hasRight) {
                    x = Math.min(x, point[0] - bbox.width + insetPadding);
                }
            }
            if (position == 'top') {
                y = point[1] - (me.dashSize * 2) - me.label.padding - (bbox.height / 2);
            }
            else {
                y = point[1] + (me.dashSize * 2) + me.label.padding + (bbox.height / 2);
            }

            textLabel.setAttributes({
                hidden: false,
                x: x,
                y: y
            }, true);

            // Skip label if there isn't available minimum space
            if (i != 0 && (me.intersect(textLabel, prevLabel)
                || me.intersect(textLabel, firstLabel))) {
                if (i === last && prevLabelId !== 0) {
                    prevLabel.hide(true);
                } else {
                    textLabel.hide(true);
                    continue;
                }
            }

            prevLabel = textLabel;
            prevLabelId = i;
        }

        return maxHeight;
    },

    drawVerticalLabels: function () {
        var me = this,
            inflections = me.inflections,
            position = me.position,
            ln = inflections.length,
            chart = me.chart,
            insetPadding = chart.insetPadding,
            labels = me.labels,
            maxWidth = 0,
            max = Math.max,
            floor = Math.floor,
            ceil = Math.ceil,
            axes = me.chart.axes,
            gutters = me.chart.maxGutters,
            bbox, point, prevLabel, prevLabelId,
            hasTop = axes.findIndex('position', 'top') != -1,
            hasBottom = axes.findIndex('position', 'bottom') != -1,
            adjustEnd = me.adjustEnd,
            textLabel, text,
            last = ln - 1, x, y, i;

        for (i = 0; i < ln; i++) {
            point = inflections[i];
            text = me.label.renderer(labels[i]);
            textLabel = me.getOrCreateLabel(i, text);
            bbox = textLabel._bbox;

            maxWidth = max(maxWidth, bbox.width + me.dashSize + me.label.padding);
            y = point[1];
            if (adjustEnd && (gutters.bottom + gutters.top) < bbox.height / 2) {
                if (i == last && !hasTop) {
                    y = Math.max(y, me.y - me.length + ceil(bbox.height / 2) - insetPadding);
                }
                else if (i == 0 && !hasBottom) {
                    y = me.y + gutters.bottom - floor(bbox.height / 2);
                }
            }
            if (position == 'left') {
                x = point[0] - bbox.width - me.dashSize - me.label.padding - 2;
            }
            else {
                x = point[0] + me.dashSize + me.label.padding + 2;
            }
            textLabel.setAttributes(Ext.apply({
                hidden: false,
                x: x,
                y: y
            }, me.label), true);
            // Skip label if there isn't available minimum space
            if (i != 0 && me.intersect(textLabel, prevLabel)) {
                if (i === last && prevLabelId !== 0) {
                    prevLabel.hide(true);
                } else {
                    textLabel.hide(true);
                    continue;
                }
            }
            prevLabel = textLabel;
            prevLabelId = i;
        }

        return maxWidth;
    },

    /**
     * Renders the labels in the axes.
     */
    drawLabel: function () {
        var me = this,
            position = me.position,
            labelGroup = me.labelGroup,
            inflections = me.inflections,
            maxWidth = 0,
            maxHeight = 0,
            ln, i;

        if (position == 'left' || position == 'right') {
            maxWidth = me.drawVerticalLabels();
        } else {
            maxHeight = me.drawHorizontalLabels();
        }

        // Hide unused bars
        ln = labelGroup.getCount();
        i = inflections.length;
        for (; i < ln; i++) {
            labelGroup.getAt(i).hide(true);
        }

        me.bbox = {};
        Ext.apply(me.bbox, me.axisBBox);
        me.bbox.height = maxHeight;
        me.bbox.width = maxWidth;
        if (Ext.isString(me.title)) {
            me.drawTitle(maxWidth, maxHeight);
        }
    },

    /**
     * Updates the {@link #title} of this axis.
     * @param {String} title
     */
    setTitle: function (title) {
        this.title = title;
        this.drawLabel();
    },

    // @private draws the title for the axis.
    drawTitle: function (maxWidth, maxHeight) {
        var me = this,
            position = me.position,
            titleAlign = me.titleAlign,
            surface = me.chart.surface,
            displaySprite = me.displaySprite,
            title = me.title,
            rotate = (position == 'left' || position == 'right'),
            x = me.x,
            y = me.y,
            base, bbox, pad;

        if (displaySprite) {
            displaySprite.setAttributes({text: title}, true);
        } else {
            base = {
                type: 'text',
                x: 0,
                y: 0,
                text: title
            };
            displaySprite = me.displaySprite = surface.add(Ext.apply(base, me.axisTitleStyle, me.labelTitle));
            surface.renderItem(displaySprite);
        }
        bbox = displaySprite.getBBox();
        pad = me.dashSize + me.label.padding;

        if (rotate) {
            if (titleAlign === 'end') {
                y -= me.length - bbox.height;
            }
            else if (!titleAlign || titleAlign === 'center') {
                y -= ((me.length / 2) - (bbox.height / 2));
            }
            
            if (position == 'left') {
                x -= (maxWidth + pad + (bbox.width / 2));
            }
            else {
                x += (maxWidth + pad + bbox.width - (bbox.width / 2));
            }
            me.bbox.width += bbox.width + 10;
        }
        else {
            if (titleAlign === 'end' || (me.reverse && titleAlign === 'start')) {
                x += me.length - bbox.width;
            }
            else if (!titleAlign || titleAlign === 'center') {
                x += (me.length / 2) - (bbox.width * 0.5);
            }
            
            if (position == 'top') {
                y -= (maxHeight + pad + (bbox.height * 0.3));
            }
            else {
                y += (maxHeight + pad + (bbox.height * 0.8));
            }
            me.bbox.height += bbox.height + 10;
        }
        displaySprite.setAttributes({
            translate: {
                x: x,
                y: y
            }
        }, true);
    }
});

Ext.define('Ext.rtl.chart.axis.Axis', {
    override: 'Ext.chart.axis.Axis',
    
    constructor: function() {
        var me = this,
            pos;
        
        me.callParent(arguments);
        pos = me.position;
        if (me.chart.getInherited().rtl && (pos == 'top' || pos == 'bottom')) {
            me.reverse = true;
        }
    }
});

/**
 * @class Ext.chart.axis.Category
 *
 * A type of axis that displays items in categories. This axis is generally used to
 * display categorical information like names of items, month names, quarters, etc.
 * but no quantitative values. For that other type of information `Number`
 * axis are more suitable.
 *
 * As with other axis you can set the position of the axis and its title. For example:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *         data: [
 *             {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *             {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *             {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *             {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *             {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         store: store,
 *         axes: [{
 *             type: 'Numeric',
 *             position: 'left',
 *             fields: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *             title: 'Sample Values',
 *             grid: {
 *                 odd: {
 *                     opacity: 1,
 *                     fill: '#ddd',
 *                     stroke: '#bbb',
 *                     'stroke-width': 1
 *                 }
 *             },
 *             minimum: 0,
 *             adjustMinimumByMajorUnit: 0
 *         }, {
 *             type: 'Category',
 *             position: 'bottom',
 *             fields: ['name'],
 *             title: 'Sample Metrics',
 *             grid: true,
 *             label: {
 *                 rotate: {
 *                     degrees: 315
 *                 }
 *             }
 *         }],
 *         series: [{
 *             type: 'area',
 *             highlight: false,
 *             axis: 'left',
 *             xField: 'name',
 *             yField: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *             style: {
 *                 opacity: 0.93
 *             }
 *         }]
 *     });
 *
 * In this example with set the category axis to the bottom of the surface, bound the axis to
 * the `name` property and set as title _Month of the Year_.
 */
Ext.define('Ext.chart.axis.Category', {

    /* Begin Definitions */

    extend: 'Ext.chart.axis.Axis',

    alternateClassName: 'Ext.chart.CategoryAxis',

    alias: 'axis.category',

    // @private
    isCategoryAxis: true,

    /* End Definitions */

    // @private constrains to datapoints between minimum and maximum only
    doConstrain: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            items = store.data.items,
            series = chart.series.items,
            seriesLength = series.length,
            data = [], i;

        for (i = 0; i < seriesLength; i++) {
            if (series[i].type === 'bar' && series[i].stacked) {
                // Do not constrain stacked bar chart.
                return;
            }
        }

        for (i = me.minimum; i < me.maximum; i++) {
            data.push(items[i]);
        }
        
        chart.setSubStore(new Ext.data.Store({
            model: store.model,
            data: data
        }));
    },

    // @private creates an array of labels to be used when rendering.
    setLabels: function() {
        var store = this.chart.getChartStore(),
            data = store.data.items,
            d, dLen, record,
            fields = this.fields,
            ln = fields.length,
            labels,
            name,
            i;

        labels = this.labels = [];
        for (d = 0, dLen = data.length; d < dLen; d++) {
            record = data[d];
            for (i = 0; i < ln; i++) {
                name = record.get(fields[i]);
                if (Ext.Array.indexOf(labels, name) > -1) {
                    Ext.log.warn('Duplicate category in axis, ' + name);
                }
                labels.push(name);
            }
        }
    },

    // @private calculates labels positions and marker positions for rendering.
    applyData: function() {
        this.callParent();
        this.setLabels();
        var count = this.chart.getChartStore().getCount();
        return {
            from: 0,
            to: count - 1,
            power: 1,
            step: 1,
            steps: count - 1
        };
    }
});

/**
 * @class Ext.chart.axis.Gauge
 *
 * Gauge Axis is the axis to be used with a Gauge series. The Gauge axis
 * displays numeric data from an interval defined by the `minimum`, `maximum` and
 * `step` configuration properties. The placement of the numeric data can be changed
 * by altering the `margin` option that is set to `10` by default.
 *
 * A possible configuration for this axis would look like:
 *
 *     axes: [{
 *         type: 'gauge',
 *         position: 'gauge',
 *         minimum: 0,
 *         maximum: 100,
 *         steps: 10,
 *         margin: 7
 *     }],
 */
Ext.define('Ext.chart.axis.Gauge', {

    /* Begin Definitions */

    extend: 'Ext.chart.axis.Abstract',

    /* End Definitions */

    /**
     * @cfg {Number} minimum (required)
     * The minimum value of the interval to be displayed in the axis.
     */

    /**
     * @cfg {Number} maximum (required)
     * The maximum value of the interval to be displayed in the axis.
     */

    /**
     * @cfg {Number} steps (required)
     * The number of steps and tick marks to add to the interval.
     */

    /**
     * @cfg {Number} [margin=10]
     * The offset positioning of the tick marks and labels in pixels.
     */

    /**
     * @cfg {String} title
     * The title for the Axis.
     */

    position: 'gauge',

    alias: 'axis.gauge',

    drawAxis: function(init) {
        var chart = this.chart,
            surface = chart.surface,
            bbox = chart.chartBBox,
            centerX = bbox.x + (bbox.width / 2),
            centerY = bbox.y + bbox.height,
            margin = this.margin || 10,
            rho = Math.min(bbox.width, 2 * bbox.height) /2 + margin,
            sprites = [], sprite,
            steps = this.steps,
            i, pi = Math.PI,
            cos = Math.cos,
            sin = Math.sin;

        if (this.sprites && !chart.resizing) {
            this.drawLabel();
            return;
        }

        if (this.margin >= 0) {
            if (!this.sprites) {
                //draw circles
                for (i = 0; i <= steps; i++) {
                    sprite = surface.add({
                        type: 'path',
                        path: ['M', centerX + (rho - margin) * cos(i / steps * pi - pi),
                                    centerY + (rho - margin) * sin(i / steps * pi - pi),
                                    'L', centerX + rho * cos(i / steps * pi - pi),
                                    centerY + rho * sin(i / steps * pi - pi), 'Z'],
                        stroke: '#ccc'
                    });
                    sprite.setAttributes({
                        hidden: false
                    }, true);
                    sprites.push(sprite);
                }
            } else {
                sprites = this.sprites;
                //draw circles
                for (i = 0; i <= steps; i++) {
                    sprites[i].setAttributes({
                        path: ['M', centerX + (rho - margin) * cos(i / steps * pi - pi),
                                    centerY + (rho - margin) * sin(i / steps * pi - pi),
                               'L', centerX + rho * cos(i / steps * pi - pi),
                                    centerY + rho * sin(i / steps * pi - pi), 'Z'],
                        stroke: '#ccc'
                    }, true);
                }
            }
        }
        this.sprites = sprites;
        this.drawLabel();
        if (this.title) {
            this.drawTitle();
        }
    },

    drawTitle: function() {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            bbox = chart.chartBBox,
            labelSprite = me.titleSprite,
            labelBBox;

        if (!labelSprite) {
            me.titleSprite = labelSprite = surface.add(Ext.apply({
                type: 'text',
                zIndex: 2
            }, me.axisTitleStyle, me.labelTitle));
        }
        labelSprite.setAttributes(Ext.apply({
            text: me.title
        }, me.label || {}), true);
        labelBBox = labelSprite.getBBox();
        labelSprite.setAttributes({
            x: bbox.x + (bbox.width / 2) - (labelBBox.width / 2),
            y: bbox.y + bbox.height - (labelBBox.height / 2) - 4
        }, true);
    },

    /**
     * Updates the {@link #title} of this axis.
     * @param {String} title
     */
    setTitle: function(title) {
        this.title = title;
        this.drawTitle();
    },

    drawLabel: function() {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            bbox = chart.chartBBox,
            centerX = bbox.x + (bbox.width / 2),
            centerY = bbox.y + bbox.height,
            margin = me.margin || 10,
            rho = Math.min(bbox.width, 2 * bbox.height) /2 + 2 * margin,
            round = Math.round,
            labelArray = [], label,
            maxValue = me.maximum || 0,
            minValue = me.minimum || 0,
            steps = me.steps, 
            pi = Math.PI,
            cos = Math.cos,
            sin = Math.sin,
            labelConf = this.label,
            renderer = labelConf.renderer || Ext.identityFn,
            reverse = me.reverse,
            i, adjY, idx;

        if (!this.labelArray) {
            //draw scale
            for (i = 0; i <= steps; i++) {
                // TODO Adjust for height of text / 2 instead
                adjY = (i === 0 || i === steps) ? 7 : 0;
                idx = reverse ? steps - i : i;
                label = surface.add({
                    type: 'text',
                    text: renderer(round(minValue + idx / steps * (maxValue - minValue))),
                    x: centerX + rho * cos(i / steps * pi - pi),
                    y: centerY + rho * sin(i / steps * pi - pi) - adjY,
                    'text-anchor': 'middle',
                    'stroke-width': 0.2,
                    zIndex: 10,
                    stroke: '#333'
                });
                label.setAttributes({
                    hidden: false
                }, true);
                labelArray.push(label);
            }
        }
        else {
            labelArray = this.labelArray;
            //draw values
            for (i = 0; i <= steps; i++) {
                // TODO Adjust for height of text / 2 instead
                adjY = (i === 0 || i === steps) ? 7 : 0;
                idx = reverse ? steps - i : i;
                labelArray[i].setAttributes({
                    text: renderer(round(minValue + idx / steps * (maxValue - minValue))),
                    x: centerX + rho * cos(i / steps * pi - pi),
                    y: centerY + rho * sin(i / steps * pi - pi) - adjY
                }, true);
            }
        }
        this.labelArray = labelArray;
    }
});

Ext.define('Ext.rtl.chart.axis.Gauge', {
    override: 'Ext.chart.axis.Gauge',
    
    constructor: function() {
        var me = this;
        
        me.callParent(arguments);
        if (me.chart.getInherited().rtl) {
            me.reverse = true;
        }
    }
});

/**
 * @class Ext.chart.axis.Numeric
 *
 * An axis to handle numeric values. This axis is used for quantitative data as
 * opposed to the category axis. You can set mininum and maximum values to the
 * axis so that the values are bound to that. If no values are set, then the
 * scale will auto-adjust to the values.
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *          fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *          data: [
 *              {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *              {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *              {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *              {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *              {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *          ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         store: store,
 *         axes: [{
 *             type: 'Numeric',
 *             position: 'left',
 *             fields: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *             title: 'Sample Values',
 *             grid: {
 *                 odd: {
 *                     opacity: 1,
 *                     fill: '#ddd',
 *                     stroke: '#bbb',
 *                     'stroke-width': 1
 *                 }
 *             },
 *             minimum: 0,
 *             adjustMinimumByMajorUnit: 0
 *         }, {
 *             type: 'Category',
 *             position: 'bottom',
 *             fields: ['name'],
 *             title: 'Sample Metrics',
 *             grid: true,
 *             label: {
 *                 rotate: {
 *                     degrees: 315
 *                 }
 *             }
 *         }],
 *         series: [{
 *             type: 'area',
 *             highlight: false,
 *             axis: 'left',
 *             xField: 'name',
 *             yField: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *             style: {
 *                 opacity: 0.93
 *             }
 *         }]
 *     });
 *
 * In this example we create an axis of Numeric type. We set a minimum value so that
 * even if all series have values greater than zero, the grid starts at zero. We bind
 * the axis onto the left part of the surface by setting `position` to `left`.
 * We bind three different store fields to this axis by setting `fields` to an array.
 * We set the title of the axis to _Number of Hits_ by using the `title` property.
 * We use a `grid` configuration to set odd background rows to a certain style and even rows
 * to be transparent/ignored.
 */
Ext.define('Ext.chart.axis.Numeric', {

    /* Begin Definitions */

    extend: 'Ext.chart.axis.Axis',

    alternateClassName: 'Ext.chart.NumericAxis',

    /* End Definitions */

    type: 'Numeric',

    // @private
    isNumericAxis: true,

    alias: 'axis.numeric',

    uses: ['Ext.data.Store'],

    constructor: function(config) {
        var me = this,
            hasLabel = !!(config.label && config.label.renderer),
            label;

        me.callParent([config]);
        label = me.label;

        if (config.constrain == null) {
            me.constrain = (config.minimum != null && config.maximum != null);
        }

        if (!hasLabel) {
            label.renderer = function(v) {
                return me.roundToDecimal(v, me.decimals);
            };
        }
    },

    roundToDecimal: function(v, dec) {
        var val = Math.pow(10, dec || 0);
        return Math.round(v * val) / val;
    },

    /**
     * @cfg {Number} minimum
     * The minimum value drawn by the axis. If not set explicitly, the axis
     * minimum will be calculated automatically. It is ignored for stacked charts.
     */
    minimum: NaN,

    /**
     * @cfg {Number} maximum
     * The maximum value drawn by the axis. If not set explicitly, the axis
     * maximum will be calculated automatically. It is ignored for stacked charts.
     */
    maximum: NaN,

    /**
     * @cfg {Boolean} constrain
     * If true, the values of the chart will be rendered only if they belong between minimum and maximum.
     * If false, all values of the chart will be rendered, regardless of whether they belong between minimum and maximum or not.
     * Default's true if maximum and minimum is specified. It is ignored for stacked charts.
     */
    constrain: true,

    /**
     * @cfg {Number} decimals
     * The number of decimals to round the value to.
     */
    decimals: 2,

    /**
     * @cfg {String} scale
     * The scaling algorithm to use on this axis. May be "linear" or
     * "logarithmic".  Currently only linear scale is implemented.
     * @private
     */
    scale: "linear",

    // @private constrains to datapoints between minimum and maximum only
    doConstrain: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            items = store.data.items,
            d, dLen, record,
            series = chart.series.items,
            fields = me.fields,
            ln = fields.length,
            range = me.calcEnds(),
            min = range.from, max = range.to, i, l,
            useAcum = false,
            value, data = [],
            addRecord;

        for (d = 0, dLen = items.length; d < dLen; d++) {
            addRecord = true;
            record = items[d];
            for (i = 0; i < ln; i++) {
                value = record.get(fields[i]);
                if (me.type == 'Time' && typeof value == "string") {
                    value = Date.parse(value);
                }
                if (+value < +min) {
                    addRecord = false;
                    break;
                }
                if (+value > +max) {
                    addRecord = false;
                    break;
                }
            }
            if (addRecord) {
                data.push(record);
            }
        }
        
        chart.setSubStore(new Ext.data.Store({
            model: store.model,
            data: data
        }));
    },
    /**
     * @cfg {String} position
     * Indicates the position of the axis relative to the chart
     */
    position: 'left',

    /**
     * @cfg {Boolean} adjustMaximumByMajorUnit
     * Indicates whether to extend maximum beyond data's maximum to the nearest
     * majorUnit.
     */
    adjustMaximumByMajorUnit: false,

    /**
     * @cfg {Boolean} adjustMinimumByMajorUnit
     * Indicates whether to extend the minimum beyond data's minimum to the
     * nearest majorUnit.
     */
    adjustMinimumByMajorUnit: false,

    // applying constraint
    processView: function() {
        var me = this,
            chart = me.chart,
            series = chart.series.items,
            i, l;

        for (i = 0, l = series.length; i < l; i++) {
            if (series[i].stacked) {
                // Do not constrain stacked charts (bar, column, or area).
                delete me.minimum;
                delete me.maximum;
                me.constrain = false;
                break;
            }
        }

        if (me.constrain) {
            me.doConstrain();
        }
    },

    // @private apply data.
    applyData: function() {
        this.callParent();
        return this.calcEnds();
    }
});

/**
 * @private
 */
Ext.define('Ext.chart.axis.Radial', {

    /* Begin Definitions */

    extend: 'Ext.chart.axis.Numeric',

    /* End Definitions */

    position: 'radial',

    alias: 'axis.radial',

    /**
     * @cfg {Number} maximum
     * The maximum value drawn by the axis. If not set explicitly, the axis
     * maximum will be calculated automatically.
     */

    /**
     * @cfg {Number} minimum
     * The minimum value drawn by the axis. Default is 0.
     */

    /**
     * @cfg {Number} [steps=10]
     * The number of circles to draw outward from the center.
     */

    drawAxis: function(init) {
        var chart = this.chart,
            surface = chart.surface,
            bbox = chart.chartBBox,
            store = chart.getChartStore(),
            l = store.getCount(),
            centerX = bbox.x + (bbox.width / 2),
            centerY = bbox.y + (bbox.height / 2),
            rho = Math.min(bbox.width, bbox.height) /2,
            sprites = [], sprite,
            steps = this.steps,
            i, j, pi2 = Math.PI * 2,
            cos = Math.cos, sin = Math.sin;

        if (this.sprites && !chart.resizing) {
            this.drawLabel();
            return;
        }

        if (!this.sprites) {
            //draw circles
            for (i = 1; i <= steps; i++) {
                sprite = surface.add({
                    type: 'circle',
                    x: centerX,
                    y: centerY,
                    radius: Math.max(rho * i / steps, 0),
                    stroke: '#ccc'
                });
                sprite.setAttributes({
                    hidden: false
                }, true);
                sprites.push(sprite);
            }
            //draw lines
            for (i = 0; i < l; i++) {
                sprite = surface.add({
                    type: 'path',
                    path: ['M', centerX, centerY, 'L', centerX + rho * cos(i / l * pi2), centerY + rho * sin(i / l * pi2), 'Z'],
                    stroke: '#ccc'
                });
                sprite.setAttributes({
                    hidden: false
                }, true);
                sprites.push(sprite);
            }
        } else {
            sprites = this.sprites;
            //draw circles
            for (i = 0; i < steps; i++) {
                sprites[i].setAttributes({
                    x: centerX,
                    y: centerY,
                    radius: Math.max(rho * (i + 1) / steps, 0),
                    stroke: '#ccc'
                }, true);
            }
            //draw lines
            for (j = 0; j < l; j++) {
                sprites[i + j].setAttributes({
                    path: ['M', centerX, centerY, 'L', centerX + rho * cos(j / l * pi2), centerY + rho * sin(j / l * pi2), 'Z'],
                    stroke: '#ccc'
                }, true);
            }
        }
        this.sprites = sprites;

        this.drawLabel();
    },

    drawLabel: function() {
        var chart = this.chart,
            seriesItems = chart.series.items,
            series,
            surface = chart.surface,
            bbox = chart.chartBBox,
            store = chart.getChartStore(),
            data = store.data.items,
            ln, record,
            centerX = bbox.x + (bbox.width / 2),
            centerY = bbox.y + (bbox.height / 2),
            rho = Math.min(bbox.width, bbox.height) /2,
            max = Math.max, round = Math.round,
            labelArray = [], label,
            fields = [], nfields,
            categories = [], xField,
            aggregate = !this.maximum,
            maxValue = this.maximum || 0,
            minValue = this.minimum || 0,
            steps = this.steps, i = 0, j, dx, dy,
            pi2 = Math.PI * 2,
            cos = Math.cos, sin = Math.sin,
            display = this.label.display,
            draw = display !== 'none',
            margin = 10;

        if (!draw) {
            return;
        }

        //get all rendered fields
        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            series = seriesItems[i];
            fields.push(series.yField);
            xField = series.xField;
        }
        
        //get maxValue to interpolate
        for (j = 0, ln = data.length; j < ln; j++) {
            record = data[j];
            categories.push(record.get(xField));

            if (aggregate) {
                for (i = 0, nfields = fields.length; i < nfields; i++) {
                    maxValue = max(+record.get(fields[i]), maxValue);
                }
            }
        }
        if (!this.labelArray) {
            if (display != 'categories') {
                //draw scale
                for (i = 1; i <= steps; i++) {
                    label = surface.add({
                        type: 'text',
                        text: round(i / steps * maxValue),
                        x: centerX,
                        y: centerY - rho * i / steps,
                        'text-anchor': 'middle',
                        'stroke-width': 0.1,
                        stroke: '#333'
                    });
                    label.setAttributes({
                        hidden: false
                    }, true);
                    labelArray.push(label);
                }
            }
            if (display != 'scale') {
                //draw text
                for (j = 0, steps = categories.length; j < steps; j++) {
                    dx = cos(j / steps * pi2) * (rho + margin);
                    dy = sin(j / steps * pi2) * (rho + margin);
                    label = surface.add({
                        type: 'text',
                        text: categories[j],
                        x: centerX + dx,
                        y: centerY + dy,
                        'text-anchor': dx * dx <= 0.001? 'middle' : (dx < 0? 'end' : 'start')
                    });
                    label.setAttributes({
                        hidden: false
                    }, true);
                    labelArray.push(label);
                }
            }
        }
        else {
            labelArray = this.labelArray;
            if (display != 'categories') {
                //draw values
                for (i = 0; i < steps; i++) {
                    labelArray[i].setAttributes({
                        text: round((i + 1) / steps * (maxValue - minValue) + minValue),
                        x: centerX,
                        y: centerY - rho * (i + 1) / steps,
                        'text-anchor': 'middle',
                        'stroke-width': 0.1,
                        stroke: '#333'
                    }, true);
                }
            }
            if (display != 'scale') {
                //draw text
                for (j = 0, steps = categories.length; j < steps; j++) {
                    dx = cos(j / steps * pi2) * (rho + margin);
                    dy = sin(j / steps * pi2) * (rho + margin);
                    if (labelArray[i + j]) {
                        labelArray[i + j].setAttributes({
                            type: 'text',
                            text: categories[j],
                            x: centerX + dx,
                            y: centerY + dy,
                            'text-anchor': dx * dx <= 0.001? 'middle' : (dx < 0? 'end' : 'start')
                        }, true);
                    }
                }
            }
        }
        this.labelArray = labelArray;
    },

    processView: function() {
        var me = this,
            seriesItems = me.chart.series.items,
            i, ln, series, ends, fields = [];

        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            series = seriesItems[i];
            fields.push(series.yField);
        }
        me.fields = fields;

        ends = me.calcEnds();
        me.maximum = ends.to;
        me.steps = ends.steps;
    }
});

/**
 * A type of axis whose units are measured in time values. Use this axis
 * for listing dates that you will want to group or dynamically change.
 * If you just want to display dates as categories then use the
 * Category class for axis instead.
 *
 * For example:
 *
 *     axes: [{
 *         type: 'Time',
 *         position: 'bottom',
 *         fields: 'date',
 *         title: 'Day',
 *         dateFormat: 'M d',
 *
 *         constrain: true,
 *         fromDate: new Date('1/1/11'),
 *         toDate: new Date('1/7/11')
 *     }]
 *
 * In this example we're creating a time axis that has as title *Day*.
 * The field the axis is bound to is `date`.
 * The date format to use to display the text for the axis labels is `M d`
 * which is a three letter month abbreviation followed by the day number.
 * The time axis will show values for dates between `fromDate` and `toDate`.
 * Since `constrain` is set to true all other values for other dates not between
 * the fromDate and toDate will not be displayed.
 *
 */
Ext.define('Ext.chart.axis.Time', {

    /* Begin Definitions */

    extend: 'Ext.chart.axis.Numeric',

    alternateClassName: 'Ext.chart.TimeAxis',

    type: 'Time',

    alias: 'axis.time',

    uses: ['Ext.data.Store'],

    /* End Definitions */

    /**
     * @cfg {String/Boolean} dateFormat
     * Indicates the format the date will be rendered on.
     * For example: 'M d' will render the dates as 'Jan 30', etc.
     * For a list of possible format strings see {@link Ext.Date Date}
     */
    dateFormat: false,

    /**
     * @cfg {Date} fromDate The starting date for the time axis.
     */
    fromDate: false,

    /**
     * @cfg {Date} toDate The ending date for the time axis.
     */
    toDate: false,

    /**
     * @cfg {Array} step
     * An array with two components: The first is the unit of the step (day, month, year, etc). The second one is a number.
     * If the number is an integer, it represents the number of units for the step ([Ext.Date.DAY, 2] means "Every other day").
     * If the number is a fraction, it represents the number of steps per unit ([Ext.Date.DAY, 1/2] means "Twice a day").
     * If the unit is the month, the steps may be adjusted depending on the month. For instance [Ext.Date.MONTH, 1/3], which means "Three times a month",
     * generates steps on the 1st, the 10th and the 20th of every month regardless of whether a month has 28 days or 31 days. The steps are generated
     * as follows:
     * - [Ext.Date.MONTH, n]: on the current date every 'n' months, maxed to the number of days in the month.
     * - [Ext.Date.MONTH, 1/2]: on the 1st and 15th of every month.
     * - [Ext.Date.MONTH, 1/3]: on the 1st, 10th and 20th of every month.
     * - [Ext.Date.MONTH, 1/4]: on the 1st, 8th, 15th and 22nd of every month.
     *
     * Defaults to: [Ext.Date.DAY, 1].
     */
    step: [Ext.Date.DAY, 1],

    /**
     * @cfg {Boolean} constrain
     * If true, the values of the chart will be rendered only if they belong between the fromDate and toDate.
     * If false, the time axis will adapt to the new values by adding/removing steps.
     */
    constrain: false,

    constructor: function (config) {
        var me = this, label, f, df;
        me.callParent([config]);
        label = me.label || {};
        df = this.dateFormat;
        if (df) {
            if (label.renderer) {
                f = label.renderer;
                label.renderer = function(v) {
                    v = f(v);
                    return Ext.Date.format(new Date(f(v)), df);
                };
            } else {
                label.renderer = function(v) {
                    return Ext.Date.format(new Date(v >> 0), df);
                };
            }
        }
    },

    // Before rendering, set current default step count to be number of records.
    processView: function () {
        var me = this;
        if (me.fromDate) {
            me.minimum = +me.fromDate;
        }
        if (me.toDate) {
            me.maximum = +me.toDate;
        }
        if(me.constrain){
            me.doConstrain();
        }
     },

    // @private modifies the store and creates the labels for the axes.
    calcEnds: function() {
        var me = this, range, step = me.step;
        if (step) {
            range = me.getRange();
            range = Ext.draw.Draw.snapEndsByDateAndStep(new Date(range.min), new Date(range.max), Ext.isNumber(step) ? [Date.MILLI, step]: step);
            if (me.minimum) {
                range.from = me.minimum;
            }
            if (me.maximum) {
                range.to = me.maximum;
            }
            return range;
        } else {
            return me.callParent(arguments);
        }
    }
 });


/**
 * @class Ext.chart.series.Series
 *
 * Series is the abstract class containing the common logic to all chart series. Series includes
 * methods from Labels, Highlights, Tips and Callouts mixins. This class implements the logic of handling
 * mouse events, animating, hiding, showing all elements and returning the color of the series to be used as a legend item.
 *
 * ## Listeners
 *
 * The series class supports listeners via the Observable syntax. Some of these listeners are:
 *
 *  - `itemclick` When the user interacts with a marker.
 *  - `itemmouseup` When the user interacts with a marker.
 *  - `itemmousedown` When the user interacts with a marker.
 *  - `afterrender` Will be triggered when the animation ends or when the series has been rendered completely.
 *
 * For example:
 *
 *     series: [{
 *             type: 'column',
 *             axis: 'left',
 *             listeners: {
 *                     'afterrender': function() {
 *                             console('afterrender');
 *                     }
 *             },
 *             xField: 'category',
 *             yField: 'data1'
 *     }]
 */
Ext.define('Ext.chart.series.Series', {

    /* Begin Definitions */

    mixins: {
        observable: 'Ext.util.Observable',
        labels: 'Ext.chart.Label',
        highlights: 'Ext.chart.Highlight',
        tips: 'Ext.chart.Tip',
        callouts: 'Ext.chart.Callout'
    },

    /* End Definitions */

    /**
     * @cfg {Boolean/Object} highlight
     * If set to `true` it will highlight the markers or the series when hovering
     * with the mouse. This parameter can also be an object with the same style
     * properties you would apply to a {@link Ext.draw.Sprite} to apply custom
     * styles to markers and series.
     */

    /**
     * @cfg {Object} tips
     * Add tooltips to the visualization's markers. The options for the tips are the
     * same configuration used with {@link Ext.tip.ToolTip}. For example:
     *
     *     tips: {
     *       trackMouse: true,
     *       renderer: function(storeItem, item) {
     *         this.setHtml(storeItem.get('name') + ': ' + storeItem.get('data1') + ' views');
     *       }
     *     },
     */

    /**
     * @cfg {String} type
     * The type of series. Set in subclasses.
     */
    type: null,

    /**
     * @cfg {String} title
     * The human-readable name of the series.
     */
    title: null,

    /**
     * @cfg {Boolean} showInLegend
     * Whether to show this series in the legend.
     */
    showInLegend: true,

    /**
     * @cfg {Function} renderer
     * A function that can be overridden to set custom styling properties to each rendered element.
     * Passes in (sprite, record, attributes, index, store) to the function. This function **must** return
     * an object of attributes. By default, the renderer will return the attributes parameter.
     * @param {Ext.draw.Sprite} sprite The sprite being rendered.
     * @param {Ext.data.Model} record The record assocatied with the sprite datapoint being rendered.
     * @param {Object} attributes The attributes used to style the sprite.
     * @param {Number} index The index of the record in the store.
     * @param {Ext.data.Store} store The store for the chart.
     * @return {Object} The attributes the sprite will use to render.
     */
    renderer: function(sprite, record, attributes, index, store) {
        return attributes;
    },

    /**
     * @cfg {Array} shadowAttributes
     * An array with shadow attributes
     */
    shadowAttributes: null,

    // @private animating flag
    animating: false,

    // @private default gutters
    nullGutters: { lower: 0, upper: 0, verticalAxis: undefined },

    // @private default padding
    nullPadding: { left:0, right:0, width:0, bottom:0, top:0, height:0 },

    /**
     * @event itemclick
     * Fires when the user clicks on a marker.
     * @param {Object} item Target item object. See {@link #getItemFromPoint} for
     * description of object properties.
     */
    
    /**
     * @event itemdblclick
     * Fires when the user double clicks on a marker.
     * @param {Object} item Target item object. See {@link #getItemFromPoint} for
     * description of object properties.
     */
    
    /**
     * @event itemmouseover
     * Fires when the user hovers mouse cursor over a marker.
     * @param {Object} item Target item object. See {@link #getItemFromPoint} for
     * description of object properties.
     */
    
    /**
     * @event itemmouseout
     * Fires when the user moves mouse cursor out of marker.
     * @param {Object} item Target item object. See {@link #getItemFromPoint} for
     * description of object properties.
     */
    
    /**
     * @event itemmousedown
     * Fires when a marker receives mousedown event.
     * @param {Object} item Target item object. See {@link #getItemFromPoint} for
     * description of object properties.
     */
    
    /**
     * @event itemmouseup
     * Fires when a marker receives mouseup event.
     * @param {Object} item Target item object. See {@link #getItemFromPoint} for
     * description of object properties.
     */

    constructor: function(config) {
        var me = this;
        if (config) {
            Ext.apply(me, config);
        }

        me.shadowGroups = [];

        me.mixins.labels.constructor.call(me, config);
        me.mixins.highlights.constructor.call(me, config);
        me.mixins.tips.constructor.call(me, config);
        me.mixins.callouts.constructor.call(me, config);

        me.mixins.observable.constructor.call(me, config);

        me.on({
            scope: me,
            itemmouseover: me.onItemMouseOver,
            itemmouseout: me.onItemMouseOut,
            mouseleave: me.onMouseLeave
        });
        
        if (me.style) {
            Ext.apply(me.seriesStyle, me.style);
        }
    },
    
    initialize: Ext.emptyFn,
    
    onRedraw: Ext.emptyFn,
    
    /**
     * Iterate over each of the records for this series. The default implementation simply iterates
     * through the entire data store, but individual series implementations can override this to
     * provide custom handling, e.g. adding/removing records.
     * @param {Function} fn The function to execute for each record.
     * @param {Object} scope Scope for the fn.
     */
    eachRecord: function(fn, scope) {
        var chart = this.chart;
        chart.getChartStore().each(fn, scope);
    },

    /**
     * Return the number of records being displayed in this series. Defaults to the number of
     * records in the store; individual series implementations can override to provide custom handling.
     */
    getRecordCount: function() {
        var chart = this.chart,
            store = chart.getChartStore();
        return store ? store.getCount() : 0;
    },

    /**
     * Determines whether the series item at the given index has been excluded, i.e. toggled off in the legend.
     * @param index
     */
    isExcluded: function(index) {
        var excludes = this.__excludes;
        return !!(excludes && excludes[index]);
    },

    // @private set the bbox and clipBox for the series
    setBBox: function(noGutter) {
        var me = this,
            chart = me.chart,
            chartBBox = chart.chartBBox,
            maxGutters = noGutter ? { left: 0, right: 0, bottom: 0, top: 0 } : chart.maxGutters,
            clipBox, bbox;

        clipBox = {
            x: chartBBox.x,
            y: chartBBox.y,
            width: chartBBox.width,
            height: chartBBox.height
        };
        me.clipBox = clipBox;

        bbox = {
            x: (clipBox.x + maxGutters.left) - (chart.zoom.x * chart.zoom.width),
            y: (clipBox.y + maxGutters.bottom) - (chart.zoom.y * chart.zoom.height),
            width: (clipBox.width - (maxGutters.left + maxGutters.right)) * chart.zoom.width,
            height: (clipBox.height - (maxGutters.bottom + maxGutters.top)) * chart.zoom.height
        };
        me.bbox = bbox;
    },

    // @private set the animation for the sprite
    onAnimate: function(sprite, attr) {
        var me = this;
        sprite.stopAnimation();
        if (me.animating) {
            return sprite.animate(Ext.applyIf(attr, me.chart.animate));
        } else {
            me.animating = true;
            return sprite.animate(Ext.apply(Ext.applyIf(attr, me.chart.animate), {
                // use callback, don't overwrite listeners
                callback: function() {
                    me.animating = false;
                    me.fireEvent('afterrender', me);
                }
            }));
        }
    },

    // @private return the gutters.
    getGutters: function() {
        return this.nullGutters;
    },

    // @private return the gutters.
    getPadding: function() {
        return this.nullPadding;
    },

    // @private wrapper for the itemmouseover event.
    onItemMouseOver: function(item) {
        var me = this;
        if (item.series === me) {
            if (me.highlight) {
                me.highlightItem(item);
            }
            if (me.tooltip) {
                me.showTip(item);
            }
        }
    },

    // @private wrapper for the itemmouseout event.
    onItemMouseOut: function(item) {
        var me = this;
        if (item.series === me) {
            me.unHighlightItem();
            if (me.tooltip) {
                me.hideTip(item);
            }
        }
    },

    // @private wrapper for the mouseleave event.
    onMouseLeave: function() {
        var me = this;
        me.unHighlightItem();
        if (me.tooltip) {
            me.hideTip();
        }
    },

    /**
     * For a given x/y point relative to the Surface, find a corresponding item from this
     * series, if any.
     * @param {Number} x
     * @param {Number} y
     * @return {Object} An object describing the item, or null if there is no matching item.
     * The exact contents of this object will vary by series type, but should always contain the following:
     * @return {Ext.chart.series.Series} return.series the Series object to which the item belongs
     * @return {Object} return.value the value(s) of the item's data point
     * @return {Array} return.point the x/y coordinates relative to the chart box of a single point
     * for this data item, which can be used as e.g. a tooltip anchor point.
     * @return {Ext.draw.Sprite} return.sprite the item's rendering Sprite.
     */
    getItemForPoint: function(x, y) {
        //if there are no items to query just return null.
        if (!this.items || !this.items.length || this.seriesIsHidden) {
            return null;
        }
        var me = this,
            items = me.items,
            bbox = me.bbox,
            item, i, ln;
        // Check bounds
        if (!Ext.draw.Draw.withinBox(x, y, bbox)) {
            return null;
        }
        for (i = 0, ln = items.length; i < ln; i++) {
            if (items[i] && this.isItemInPoint(x, y, items[i], i)) {
                return items[i];
            }
        }

        return null;
    },

    isItemInPoint: function(x, y, item, i) {
        return false;
    },

    /**
     * Hides all the elements in the series.
     */
    hideAll: function() {
        var me = this,
            items = me.items,
            item, len, i, j, l, sprite, shadows;

        me.seriesIsHidden = true;
        me._prevShowMarkers = me.showMarkers;

        me.showMarkers = false;
        //hide all labels
        me.hideLabels(0);
        //hide all sprites
        for (i = 0, len = items.length; i < len; i++) {
            item = items[i];
            sprite = item.sprite;
            if (sprite) {
                sprite.setAttributes({
                    hidden: true
                }, true);
            }

            if (sprite && sprite.shadows) {
                shadows = sprite.shadows;
                for (j = 0, l = shadows.length; j < l; ++j) {
                    shadows[j].setAttributes({
                        hidden: true
                    }, true);
                }
            }
        }
    },

    /**
     * Shows all the elements in the series.
     */
    showAll: function() {
        var me = this,
            prevAnimate = me.chart.animate;
        me.chart.animate = false;
        me.seriesIsHidden = false;
        me.showMarkers = me._prevShowMarkers;
        me.drawSeries();
        me.chart.animate = prevAnimate;
    },
    
    hide: function() {
        if (this.items) {
            var me = this,
                items = me.items,
                i, j, lsh, ln, shadows;
            
            if (items && items.length) {
                for (i = 0, ln = items.length; i < ln; ++i) {
                    if (items[i].sprite) {
                        items[i].sprite.hide(true);

                        shadows = items[i].shadows || items[i].sprite.shadows;
                        if (shadows) {
                            for (j = 0, lsh = shadows.length; j < lsh; ++j) {
                                shadows[j].hide(true);
                            }
                        }
                    }
                }
                me.hideLabels();
            }
        }
    },

    /**
     * Returns a string with the color to be used for the series legend item.
     */
    getLegendColor: function(index) {
        var me = this, fill, stroke;
        if (me.seriesStyle) {
            fill = me.seriesStyle.fill;
            stroke = me.seriesStyle.stroke;
            if (fill && fill != 'none') {
                return fill;
            }
            if(stroke){
                return stroke;
            }
        }
        return (me.colorArrayStyle)?me.colorArrayStyle[me.themeIdx % me.colorArrayStyle.length]:'#000';
    },

    /**
     * Checks whether the data field should be visible in the legend
     * @private
     * @param {Number} index The index of the current item
     */
    visibleInLegend: function(index){
        var excludes = this.__excludes;
        if (excludes) {
            return !excludes[index];
        }
        return !this.seriesIsHidden;
    },

    /**
     * Changes the value of the {@link #title} for the series.
     * Arguments can take two forms:
     * <ul>
     * <li>A single String value: this will be used as the new single title for the series (applies
     * to series with only one yField)</li>
     * <li>A numeric index and a String value: this will set the title for a single indexed yField.</li>
     * </ul>
     * @param {Number} index
     * @param {String} title
     */
    setTitle: function(index, title) {
        var me = this,
            oldTitle = me.title;

        if (Ext.isString(index)) {
            title = index;
            index = 0;
        }

        if (Ext.isArray(oldTitle)) {
            oldTitle[index] = title;
        } else {
            me.title = title;
        }

        me.fireEvent('titlechange', title, index);
    }
});

/**
 * @class Ext.chart.series.Cartesian
 *
 * Common base class for series implementations which plot values using x/y coordinates.
 */
Ext.define('Ext.chart.series.Cartesian', {

    /* Begin Definitions */

    extend: 'Ext.chart.series.Series',

    alternateClassName: ['Ext.chart.CartesianSeries', 'Ext.chart.CartesianChart'],

    /* End Definitions */

    /**
     * @cfg {String} xField
     * The name of the data Model field corresponding to the x-axis value.
     */
    xField: null,

    /**
     * @cfg {String/String[]} yField
     * The name(s) of the data Model field(s) corresponding to the y-axis value(s).
     */
    yField: null,

    /**
     * @cfg {String/String[]} axis
     * The position of the axis to bind the values to. Possible values are 'left', 'bottom', 'top' and 'right'.
     * You must explicitly set this value to bind the values of the line series to the ones in the axis, otherwise a
     * relative scale will be used. For example, if you're using a Scatter or Line series and you'd like to have the
     * values in the chart relative to the bottom and left axes then `axis` should be `['left', 'bottom']`.
     */
    axis: 'left',

    getLegendLabels: function() {
        var me = this,
            labels = [],
            fields, i, ln,
            combinations = me.combinations,
            title,
            combo, label0, label1;

        fields = [].concat(me.yField);
        for (i = 0, ln = fields.length; i < ln; i++) {
            title = me.title;
            // Use the 'title' config if present, otherwise use the raw yField name
            labels.push((Ext.isArray(title) ? title[i] : title) || fields[i]);
        }

        // Handle yFields combined via legend drag-drop
        // TODO need to check to see if this is supported in extjs 4 branch
        if (combinations) {
            combinations = Ext.Array.from(combinations);
            for (i = 0, ln = combinations.length; i < ln; i++) {
                combo = combinations[i];
                label0 = labels[combo[0]];
                label1 = labels[combo[1]];
                labels[combo[1]] = label0 + ' & ' + label1;
                labels.splice(combo[0], 1);
            }
        }

        return labels;
    },

    /**
     * @protected Iterates over a given record's values for each of this series's yFields,
     * executing a given function for each value. Any yFields that have been combined
     * via legend drag-drop will be treated as a single value.
     * @param {Ext.data.Model} record
     * @param {Function} fn
     * @param {Object} scope
     */
    eachYValue: function(record, fn, scope) {
        var me = this,
            yValueAccessors = me.getYValueAccessors(),
            i, ln, accessor;
        
        for (i = 0, ln = yValueAccessors.length; i < ln; i++) {
            accessor = yValueAccessors[i];
            fn.call(scope, accessor(record), i);
        }
    },

    /**
     * @protected Returns the number of yField values, taking into account fields combined
     * via legend drag-drop.
     * @return {Number}
     */
    getYValueCount: function() {
        return this.getYValueAccessors().length;
    },

    combine: function(index1, index2) {
        var me = this,
            accessors = me.getYValueAccessors(),
            accessor1 = accessors[index1],
            accessor2 = accessors[index2];

        // Combine the yValue accessors for the two indexes into a single accessor that returns their sum
        accessors[index2] = function(record) {
            return accessor1(record) + accessor2(record);
        };
        accessors.splice(index1, 1);

        me.callParent([index1, index2]);
    },

    clearCombinations: function() {
        // Clear combined accessors, they'll get regenerated on next call to getYValueAccessors
        delete this.yValueAccessors;
        this.callParent();
    },

    /**
     * @protected Returns an array of functions, each of which returns the value of the yField
     * corresponding to function's index in the array, for a given record (each function takes the
     * record as its only argument.) If yFields have been combined by the user via legend drag-drop,
     * this list of accessors will be kept in sync with those combinations.
     * @return {Array} array of accessor functions
     */
    getYValueAccessors: function() {
        var me = this,
            accessors = me.yValueAccessors,
            yFields, i, ln;

        function getFieldAccessor(field) {
            return function(record) {
                return record.get(field);
            }
        }

        if (!accessors) {
            accessors = me.yValueAccessors = [];
            yFields = [].concat(me.yField);
            for (i = 0, ln = yFields.length; i < ln; i++) {
                accessors.push(getFieldAccessor(yFields[i]));
            }
        }
        return accessors;
    },

    /**
     * Calculate the min and max values for this series's xField.
     * @return {Array} [min, max]
     */
    getMinMaxXValues: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            data = store.data.items,
            count = me.getRecordCount(),
            i, ln, record,
            min, max,
            xField = me.xField,
            xValue;

        if (count > 0) {
            min = Infinity;
            max = -min;
                
            for (i = 0, ln = data.length; i < ln; i++) {
                record = data[i];
                xValue = record.get(xField);
                if (xValue > max) {
                    max = xValue;
                }
                if (xValue < min) {
                    min = xValue;
                }
            }
            
            // If we made no progress, treat it like a category axis
            if (min == Infinity) {
                min = 0;
            }
            
            if (max == -Infinity) {
                max = count - 1;
            }
        } else {
            min = max = 0;
        }
        return [min, max];
    },

    /**
     * Calculate the min and max values for this series's yField(s). Takes into account yField
     * combinations, exclusions, and stacking.
     * @return {Array} [min, max]
     */
    getMinMaxYValues: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            data = store.data.items,
            count = me.getRecordCount(),
            i, ln, record,
            stacked = me.stacked,
            min, max,
            positiveTotal, negativeTotal;

        function eachYValueStacked(yValue, i) {
            if (!me.isExcluded(i)) {
                if (yValue < 0) {
                    negativeTotal += yValue;
                } else {
                    positiveTotal += yValue;
                }
            }
        }

        function eachYValue(yValue, i) {
            if (!me.isExcluded(i)) {
                if (yValue > max) {
                    max = yValue;
                }
                if (yValue < min) {
                    min = yValue;
                }
            }
        }

        if (count > 0) {
            min = Infinity;
            max = -min;
            
            for (i = 0, ln = data.length; i < ln; i++) {
                record = data[i];
                if (stacked) {
                    positiveTotal = 0;
                    negativeTotal = 0;
                    me.eachYValue(record, eachYValueStacked);
                    if (positiveTotal > max) {
                        max = positiveTotal;
                    }
                    if (negativeTotal < min) {
                        min = negativeTotal;
                    }
                } else {
                    me.eachYValue(record, eachYValue);
                }
            }
            
            // If we made no progress, treat it like a category axis
            if (min == Infinity) {
                min = 0;
            }
            
            if (max == -Infinity) {
                max = count - 1;
            }
        } else {
            min = max = 0;
        }
        return [min, max];
    },

    getAxesForXAndYFields: function() {
        var me = this,
            axes = me.chart.axes,
            reverse = me.reverse,
            axis = [].concat(me.axis),
            yFields = {}, yFieldList = [].concat(me.yField),
            xFields = {}, xFieldList = [].concat(me.xField),
            fields, xAxis, yAxis, i, ln, flipXY;

        
        flipXY = me.type === 'bar' && me.column === false;
        if(flipXY) {
            fields = yFieldList;
            yFieldList = xFieldList;
            xFieldList = fields;
        }
        if (Ext.Array.indexOf(axis, 'top') > -1) {
            xAxis = 'top';
        } else if (Ext.Array.indexOf(axis, 'bottom') > -1) {
            xAxis = 'bottom';
        } else {
            if (axes.get('top') && axes.get('bottom')) {
                for (i = 0, ln = xFieldList.length; i < ln; i++) {
                    xFields[xFieldList[i]] = true;
                }
                fields = [].concat(axes.get('bottom').fields);
                for (i = 0, ln = fields.length; i < ln; i++) {
                    if (xFields[fields[i]]) {
                        xAxis = 'bottom';
                        break;
                    }
                }
                fields = [].concat(axes.get('top').fields);
                for (i = 0, ln = fields.length; i < ln; i++) {
                    if (xFields[fields[i]]) {
                        xAxis = 'top';
                        break;
                    }
                }
            } else if (axes.get('top')) {
                xAxis = 'top';
            } else if (axes.get('bottom')) {
                xAxis = 'bottom';
            }
        }
        
        if (Ext.Array.indexOf(axis, 'left') > -1) {
            yAxis = flipXY ? 'right' : 'left';
        } else if (Ext.Array.indexOf(axis, 'right') > -1) {
            yAxis = flipXY ? 'left' : 'right';
        } else {
            if (axes.get('left') && axes.get('right')) {
                for (i = 0, ln = yFieldList.length; i < ln; i++) {
                    yFields[yFieldList[i]] = true;
                }
                fields = [].concat(axes.get('right').fields);
                for (i = 0, ln = fields.length; i < ln; i++) {
                    if (yFields[fields[i]]) {
                        break;
                    }
                }
                fields = [].concat(axes.get('left').fields);
                for (i = 0, ln = fields.length; i < ln; i++) {
                    if (yFields[fields[i]]) {
                        yAxis = 'left';
                        break;
                    }
                }
            } else if (axes.get('left')) {
                yAxis = 'left';
            } else if (axes.get('right')) {
                yAxis = 'right';
            }
        }

        return flipXY ? {
            xAxis: yAxis,
            yAxis: xAxis
        }: {
            xAxis: xAxis,
            yAxis: yAxis
        };
    }


});

Ext.define('Ext.rtl.chart.series.Cartesian', {
    override: 'Ext.chart.series.Cartesian',
    
    initialize: function() {
        var me = this;
        
        me.callParent(arguments);
        me.axis = me.chart.invertPosition(me.axis); 
        if (me.chart.getInherited().rtl) {
            me.reverse = true;
        }
    }
});

/**
 * @class Ext.chart.series.Area
 * @extends Ext.chart.series.Cartesian
 *
 * Creates a Stacked Area Chart. The stacked area chart is useful when displaying multiple aggregated layers of information.
 * As with all other series, the Area Series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information. A typical configuration object for the area series could be:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *         data: [
 *             { 'name': 'metric one',   'data1':10, 'data2':12, 'data3':14, 'data4':8,  'data5':13 },
 *             { 'name': 'metric two',   'data1':7,  'data2':8,  'data3':16, 'data4':10, 'data5':3  },
 *             { 'name': 'metric three', 'data1':5,  'data2':2,  'data3':14, 'data4':12, 'data5':7  },
 *             { 'name': 'metric four',  'data1':2,  'data2':14, 'data3':6,  'data4':1,  'data5':23 },
 *             { 'name': 'metric five',  'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33 }
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         store: store,
 *         axes: [
 *             {
 *                 type: 'Numeric',
 *                 position: 'left',
 *                 fields: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *                 title: 'Sample Values',
 *                 grid: {
 *                     odd: {
 *                         opacity: 1,
 *                         fill: '#ddd',
 *                         stroke: '#bbb',
 *                         'stroke-width': 1
 *                     }
 *                 },
 *                 minimum: 0,
 *                 adjustMinimumByMajorUnit: 0
 *             },
 *             {
 *                 type: 'Category',
 *                 position: 'bottom',
 *                 fields: ['name'],
 *                 title: 'Sample Metrics',
 *                 grid: true,
 *                 label: {
 *                     rotate: {
 *                         degrees: 315
 *                     }
 *                 }
 *             }
 *         ],
 *         series: [{
 *             type: 'area',
 *             highlight: false,
 *             axis: 'left',
 *             xField: 'name',
 *             yField: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *             style: {
 *                 opacity: 0.93
 *             }
 *         }]
 *     });
 *
 * In this configuration we set `area` as the type for the series, set highlighting options to true for highlighting elements on hover,
 * take the left axis to measure the data in the area series, set as xField (x values) the name field of each element in the store,
 * and as yFields (aggregated layers) seven data fields from the same store. Then we override some theming styles by adding some opacity
 * to the style object.
 */
Ext.define('Ext.chart.series.Area', {

    /* Begin Definitions */

    extend: 'Ext.chart.series.Cartesian',

    alias: 'series.area',

    requires: ['Ext.chart.axis.Axis', 'Ext.draw.Color', 'Ext.fx.Anim'],

    /* End Definitions */

    type: 'area',

    // @private Area charts are alyways stacked
    stacked: true,

    /**
     * @cfg {Object} style
     * Append styling properties to this object for it to override theme properties.
     */
    style: {},

    constructor: function(config) {
        this.callParent(arguments);
        var me = this,
            surface = me.chart.surface,
            i, l;
        config.highlightCfg = Ext.Object.merge({}, {
            lineWidth: 3,
            stroke: '#55c',
            opacity: 0.8,
            color: '#f00'
        }, config.highlightCfg);

        Ext.apply(me, config, {
            __excludes: []
        });
        if (me.highlight) {
            me.highlightSprite = surface.add({
                type: 'path',
                path: ['M', 0, 0],
                zIndex: 1000,
                opacity: 0.3,
                lineWidth: 5,
                hidden: true,
                stroke: '#444'
            });
        }
        me.group = surface.getGroup(me.seriesId);
    },

    // @private Shrinks dataSets down to a smaller size
    shrink: function(xValues, yValues, size) {
        var len = xValues.length,
            ratio = Math.floor(len / size),
            i, j,
            xSum = 0,
            yCompLen = this.areas.length,
            ySum = [],
            xRes = [],
            yRes = [];
        //initialize array
        for (j = 0; j < yCompLen; ++j) {
            ySum[j] = 0;
        }
        for (i = 0; i < len; ++i) {
            xSum += +xValues[i];
            for (j = 0; j < yCompLen; ++j) {
                ySum[j] += +yValues[i][j];
            }
            if (i % ratio == 0) {
                //push averages
                xRes.push(xSum/ratio);
                for (j = 0; j < yCompLen; ++j) {
                    ySum[j] /= ratio;
                }
                yRes.push(ySum);
                //reset sum accumulators
                xSum = 0;
                for (j = 0, ySum = []; j < yCompLen; ++j) {
                    ySum[j] = 0;
                }
            }
        }
        return {
            x: xRes,
            y: yRes
        };
    },

    // @private Get chart and data boundaries
    getBounds: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            data = store.data.items,
            i, l, record,
            areas = [].concat(me.yField),
            areasLen = areas.length,
            xValues = [],
            yValues = [],
            infinity = Infinity,
            minX = infinity,
            minY = infinity,
            maxX = -infinity,
            maxY = -infinity,
            math = Math,
            mmin = math.min,
            mmax = math.max,
            boundAxis = me.getAxesForXAndYFields(),
            boundXAxis = boundAxis.xAxis,
            boundYAxis = boundAxis.yAxis,
            ends, allowDate, tmp,
            bbox, xScale, yScale, xValue, yValue, areaIndex, acumY, ln, sumValues, clipBox, areaElem, axis, out;

        me.setBBox();
        bbox = me.bbox;

        if (axis = chart.axes.get(boundXAxis)) {
            if (axis.type === 'Time') {
                allowDate = true;
            }
            ends = axis.applyData();
            minX = ends.from;
            maxX = ends.to;
        }

        if (axis = chart.axes.get(boundYAxis)) {
            ends = axis.applyData();
            minY = ends.from;
            maxY = ends.to;
        }

        // If a field was specified without a corresponding axis, create one to get bounds
        if (me.xField && !Ext.isNumber(minX)) {
            axis = me.getMinMaxXValues();
            allowDate = true;
            minX = axis[0];
            maxX = axis[1];
        }

        if (me.yField && !Ext.isNumber(minY)) {
            axis = me.getMinMaxYValues();
            minY = axis[0];
            maxY = axis[1];
        }

        if (!Ext.isNumber(minY)) {
            minY = 0;
        }
        if (!Ext.isNumber(maxY)) {
            maxY = 0;
        }

        l = data.length;
        if (l > 0 && allowDate) {
            tmp = data[0].get(me.xField);
            if (typeof tmp != 'number') {
                tmp = +tmp;
                if (isNaN(tmp)) {
                    allowDate = false;
                }
            } 
        }
        for (i = 0; i < l; i++) {
            record = data[i];
            xValue = record.get(me.xField);
            yValue = [];
            if (typeof xValue != 'number') {
                if (allowDate) {
                    xValue = +xValue;
                } else {
                    xValue = i;
                }
            }
            xValues.push(xValue);
            acumY = 0;
            for (areaIndex = 0; areaIndex < areasLen; areaIndex++) {
                // Excluded series
                if (me.__excludes[areaIndex]) {
                    continue;
                }
                areaElem = record.get(areas[areaIndex]);
                if (typeof areaElem == 'number') {
                    yValue.push(areaElem);
                }
            }
            yValues.push(yValue);
        }

        xScale = bbox.width / ((maxX - minX) || 1);
        yScale = bbox.height / ((maxY - minY) || 1);

        ln = xValues.length;
        if ((ln > bbox.width) && me.areas) {
            sumValues = me.shrink(xValues, yValues, bbox.width);
            xValues = sumValues.x;
            yValues = sumValues.y;
        }

        return {
            bbox: bbox,
            minX: minX,
            minY: minY,
            xValues: xValues,
            yValues: yValues,
            xScale: xScale,
            yScale: yScale,
            areasLen: areasLen
        };
    },

    // @private Build an array of paths for the chart
    getPaths: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            first = true,
            bounds = me.getBounds(),
            bbox = bounds.bbox,
            items = me.items = [],
            componentPaths = [],
            componentPath,
            count = 0,
            paths = [],
            reverse = me.reverse,
            i, ln, x, y, xValue, yValue, acumY, areaIndex, 
            prevAreaIndex, areaElem, path, startX, idx;

        ln = bounds.xValues.length;
        // Start the path
        for (i = 0; i < ln; i++) {
            xValue = bounds.xValues[i];
            idx = reverse ? ln - i - 1 : i;
            yValue = bounds.yValues[idx];
            x = bbox.x + (xValue - bounds.minX) * bounds.xScale;
            if (startX === undefined) {
                startX = x;
            }
            acumY = 0;
            count = 0;
            for (areaIndex = 0; areaIndex < bounds.areasLen; areaIndex++) {
                // Excluded series
                if (me.__excludes[areaIndex]) {
                    continue;
                }
                if (!componentPaths[areaIndex]) {
                    componentPaths[areaIndex] = [];
                }
                areaElem = yValue[count];
                acumY += areaElem;
                y = bbox.y + bbox.height - (acumY - bounds.minY) * bounds.yScale;
                if (!paths[areaIndex]) {
                    paths[areaIndex] = ['M', x, y];
                    componentPaths[areaIndex].push(['L', x, y]);
                } else {
                    paths[areaIndex].push('L', x, y);
                    componentPaths[areaIndex].push(['L', x, y]);
                }
                if (!items[areaIndex]) {
                    items[areaIndex] = {
                        pointsUp: [],
                        pointsDown: [],
                        series: me
                    };
                }
                items[areaIndex].pointsUp.push([x, y]);
                count++;
            }
        }

        // Close the paths
        for (areaIndex = 0; areaIndex < bounds.areasLen; areaIndex++) {
            // Excluded series
            if (me.__excludes[areaIndex]) {
                continue;
            }
            path = paths[areaIndex];

            // Close bottom path to the axis
            if (areaIndex == 0 || first) {
                first = false;

                path.push('L', x, bbox.y + bbox.height,
                          'L', startX, bbox.y + bbox.height,
                          'Z');
            }
            // Close other paths to the one before them
            else {
                componentPath = componentPaths[prevAreaIndex];
                componentPath.reverse();
                path.push('L', x, componentPath[0][2]);
                for (i = 0; i < ln; i++) {
                    path.push(componentPath[i][0],
                              componentPath[i][1],
                              componentPath[i][2]);
                    items[areaIndex].pointsDown[ln -i -1] = [componentPath[i][1], componentPath[i][2]];
                }
                path.push('L', startX, path[2], 'Z');
            }
            prevAreaIndex = areaIndex;
        }
        return {
            paths: paths,
            areasLen: bounds.areasLen
        };
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            surface = chart.surface,
            animate = chart.animate,
            group = me.group,
            endLineStyle = Ext.apply(me.seriesStyle, me.style),
            colorArrayStyle = me.colorArrayStyle,
            colorArrayLength = colorArrayStyle && colorArrayStyle.length || 0,
            themeIndex = me.themeIdx,
            areaIndex, areaElem, paths, path, rendererAttributes, idx;
        
        me.unHighlightItem();
        me.cleanHighlights();

        if (!store || !store.getCount() || me.seriesIsHidden) {
            me.hide();
            me.items = [];
            return;
        }

        paths = me.getPaths();

        if (!me.areas) {
            me.areas = [];
        }

        for (areaIndex = 0; areaIndex < paths.areasLen; areaIndex++) {
            // Excluded series
            if (me.__excludes[areaIndex]) {
                continue;
            }
            idx = themeIndex + areaIndex;
            if (!me.areas[areaIndex]) {
                me.items[areaIndex].sprite = me.areas[areaIndex] = surface.add(Ext.apply({}, {
                    type: 'path',
                    group: group,
                    // 'clip-rect': me.clipBox,
                    path: paths.paths[areaIndex],
                    stroke: endLineStyle.stroke || colorArrayStyle[idx % colorArrayLength],
                    fill: colorArrayStyle[idx % colorArrayLength]
                }, endLineStyle || {}));
            }
            areaElem = me.areas[areaIndex];
            path = paths.paths[areaIndex];
            if (animate) {
                //Add renderer to line. There is not a unique record associated with this.
                rendererAttributes = me.renderer(areaElem, false, {
                    path: path,
                    // 'clip-rect': me.clipBox,
                    fill: colorArrayStyle[areaIndex % colorArrayLength],
                    stroke: endLineStyle.stroke || colorArrayStyle[areaIndex % colorArrayLength]
                }, areaIndex, store);
                //fill should not be used here but when drawing the special fill path object
                me.animation = me.onAnimate(areaElem, {
                    to: rendererAttributes
                });
            } else {
                rendererAttributes = me.renderer(areaElem, false, {
                    path: path,
                    // 'clip-rect': me.clipBox,
                    hidden: false,
                    fill: colorArrayStyle[idx % colorArrayLength],
                    stroke: endLineStyle.stroke || colorArrayStyle[idx % colorArrayLength]
                }, areaIndex, store);
                me.areas[areaIndex].setAttributes(rendererAttributes, true);
            }
        }
        me.renderLabels();
        me.renderCallouts();
    },

    // @private
    onAnimate: function(sprite, attr) {
        sprite.show();
        return this.callParent(arguments);
    },

    // @private
    onCreateLabel: function(storeItem, item, i, display) {
        // TODO: Implement labels for Area charts. 
        // The code in onCreateLabel() and onPlaceLabel() was originally copied
        // from another Series but it cannot work because item.point[] doesn't
        // exist in Area charts. Instead, the getPaths() methods above prepares
        // item.pointsUp[] and item.pointsDown[] which don't have the same structure.
        // In other series, there are as many 'items' as there are data points along the
        // x-axis. In this series, there are as many 'items' as there are series
        // (usually a much smaller number) and each pointsUp[] or pointsDown[] array 
        // contains as many values as there are data points along the x-axis;
        return null;

        var me = this,
            group = me.labelsGroup,
            config = me.label,
            bbox = me.bbox,
            endLabelStyle = Ext.apply({}, config, me.seriesLabelStyle || {});

        return me.chart.surface.add(Ext.apply({
            'type': 'text',
            'text-anchor': 'middle',
            'group': group,
            'x': Number(item.point[0]),
            'y': bbox.y + bbox.height / 2
        }, endLabelStyle || {}));
    },

    // @private
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            bbox = me.bbox,
            x = Number(item.point[i][0]),
            y = Number(item.point[i][1]),
            labelBox, width, height;

        label.setAttributes({
            text: format(storeItem.get(field[index]), label, storeItem, item, i, display, animate, index),
            hidden: true
        }, true);

        labelBox = label.getBBox();
        width = labelBox.width / 2;
        height = labelBox.height / 2;

        //correct label position to fit into the box
        if (x < bbox.x + width) {
            x = bbox.x + width;
        } else if (x + width > bbox.x + bbox.width) {
            x = bbox.x + bbox.width - width;
        }

        y = y - height;
        if (y < bbox.y + height) {
            y += 2 * height;
        } else if (y + height > bbox.y + bbox.height) {
            y -= 2 * height;
        }

        if (me.chart.animate && !me.chart.resizing) {
            label.show(true);
            me.onAnimate(label, {
                to: {
                    x: x,
                    y: y
                }
            });
        } else {
            label.setAttributes({
                x: x,
                y: y
            }, true);
            if (resizing && me.animation) {
                me.animation.on('afteranimate', function() {
                    label.show(true);
                });
            } else {
                label.show(true);
            }
        }
    },

    // @private
    onPlaceCallout : function(callout, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            resizing = chart.resizing,
            config = me.callouts,
            items = me.items,
            prev = (i == 0) ? false : items[i -1].point,
            next = (i == items.length -1) ? false : items[i +1].point,
            cur = item.point,
            dir, norm, normal, a, aprev, anext,
            bbox = (callout && callout.label ? callout.label.getBBox() : {width:0,height:0}),
            offsetFromViz = 30,
            offsetToSide = 10,
            offsetBox = 3,
            boxx, boxy, boxw, boxh,
            p, clipRect = me.clipRect,
            x, y;

        if (!bbox.width || !bbox.height) {
            return;
        }

        //get the right two points
        if (!prev) {
            prev = cur;
        }
        if (!next) {
            next = cur;
        }
        a = (next[1] - prev[1]) / (next[0] - prev[0]);
        aprev = (cur[1] - prev[1]) / (cur[0] - prev[0]);
        anext = (next[1] - cur[1]) / (next[0] - cur[0]);

        norm = Math.sqrt(1 + a * a);
        dir = [1 / norm, a / norm];
        normal = [-dir[1], dir[0]];

        //keep the label always on the outer part of the "elbow"
        if (aprev > 0 && anext < 0 && normal[1] < 0 || aprev < 0 && anext > 0 && normal[1] > 0) {
            normal[0] *= -1;
            normal[1] *= -1;
        } else if (Math.abs(aprev) < Math.abs(anext) && normal[0] < 0 || Math.abs(aprev) > Math.abs(anext) && normal[0] > 0) {
            normal[0] *= -1;
            normal[1] *= -1;
        }

        //position
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;

        //box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;

        //now check if we're out of bounds and invert the normal vector correspondingly
        //this may add new overlaps between labels (but labels won't be out of bounds).
        if (boxx < clipRect[0] || (boxx + boxw) > (clipRect[0] + clipRect[2])) {
            normal[0] *= -1;
        }
        if (boxy < clipRect[1] || (boxy + boxh) > (clipRect[1] + clipRect[3])) {
            normal[1] *= -1;
        }

        //update positions
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;

        //update box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;

        //set the line from the middle of the pie to the box.
        callout.lines.setAttributes({
            path: ["M", cur[0], cur[1], "L", x, y, "Z"]
        }, true);
        //set box position
        callout.box.setAttributes({
            x: boxx,
            y: boxy,
            width: boxw,
            height: boxh
        }, true);
        //set text position
        callout.label.setAttributes({
            x: x + (normal[0] > 0? offsetBox : -(bbox.width + offsetBox)),
            y: y
        }, true);
        for (p in callout) {
            callout[p].show(true);
        }
    },

    isItemInPoint: function(x, y, item, i) {
        var me = this,
            pointsUp = item.pointsUp,
            pointsDown = item.pointsDown,
            abs = Math.abs,
            distChanged = false,
            last = false,
            reverse = me.reverse,
            dist = Infinity, p, pln, point;

        for (p = 0, pln = pointsUp.length; p < pln; p++) {
            point = [pointsUp[p][0], pointsUp[p][1]];
            
            distChanged = false;
            last = p == pln -1;

            if (dist > abs(x - point[0])) {
                dist = abs(x - point[0]);
                distChanged = true;
                if (last) {
                    ++p;
                }
            }
            
            if (!distChanged || (distChanged && last)) {
                point = pointsUp[p -1];
                if (y >= point[1] && (!pointsDown.length || y <= (pointsDown[p -1][1]))) {
                    idx = reverse ? pln - p : p - 1;
                    item.storeIndex = idx;
                    item.storeField = me.yField[i];
                    item.storeItem = me.chart.getChartStore().getAt(idx);
                    item._points = pointsDown.length? [point, pointsDown[p - 1]] : [point];
                    return true;
                } else {
                    break;
                }
            }
        }
        return false;
    },

    /**
     * Highlight this entire series.
     * @param {Object} item Info about the item; same format as returned by #getItemForPoint.
     */
    highlightSeries: function() {
        var area, to, fillColor;
        if (this._index !== undefined) {
            area = this.areas[this._index];
            if (area.__highlightAnim) {
                area.__highlightAnim.paused = true;
            }
            area.__highlighted = true;
            area.__prevOpacity = area.__prevOpacity || area.attr.opacity || 1;
            area.__prevFill = area.__prevFill || area.attr.fill;
            area.__prevLineWidth = area.__prevLineWidth || area.attr.lineWidth;
            fillColor = Ext.draw.Color.fromString(area.__prevFill);
            to = {
                lineWidth: (area.__prevLineWidth || 0) + 2
            };
            if (fillColor) {
                to.fill = fillColor.getLighter(0.2).toString();
            }
            else {
                to.opacity = Math.max(area.__prevOpacity - 0.3, 0);
            }
            if (this.chart.animate) {
                area.__highlightAnim = new Ext.fx.Anim(Ext.apply({
                    target: area,
                    to: to
                }, this.chart.animate));
            }
            else {
                area.setAttributes(to, true);
            }
        }
    },

    /**
     * UnHighlight this entire series.
     * @param {Object} item Info about the item; same format as returned by #getItemForPoint.
     */
    unHighlightSeries: function() {
        var area;
        if (this._index !== undefined) {
            area = this.areas[this._index];
            if (area.__highlightAnim) {
                area.__highlightAnim.paused = true;
            }
            if (area.__highlighted) {
                area.__highlighted = false;
                area.__highlightAnim = new Ext.fx.Anim({
                    target: area,
                    to: {
                        fill: area.__prevFill,
                        opacity: area.__prevOpacity,
                        lineWidth: area.__prevLineWidth
                    }
                });
            }
        }
    },

    /**
     * Highlight the specified item. If no item is provided the whole series will be highlighted.
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    highlightItem: function(item) {
        var me = this,
            points, path;
        if (!item) {
            this.highlightSeries();
            return;
        }
        
        points = item._points;
        if (points.length === 2) {
            path = ['M', points[0][0], points[0][1], 'L', points[1][0], points[1][1]];
        } else {
            path = ['M', points[0][0], points[0][1], 'L', points[0][0], me.bbox.y + me.bbox.height];
        }
        
        me.highlightSprite.setAttributes({
            path: path,
            hidden: false
        }, true);
    },

    /**
     * Un-highlights the specified item. If no item is provided it will un-highlight the entire series.
     * @param {Object} item Info about the item; same format as returned by #getItemForPoint
     */
    unHighlightItem: function(item) {
        if (!item) {
            this.unHighlightSeries();
        }

        if (this.highlightSprite) {
            this.highlightSprite.hide(true);
        }
    },

    // @private
    hideAll: function(index) {
        var me = this;
        index = (isNaN(me._index) ? index : me._index) || 0;
        me.__excludes[index] = true;
        me.areas[index].hide(true);
        me.redraw();
    },

    // @private
    showAll: function(index) {
        var me = this;
        index = (isNaN(me._index) ? index : me._index) || 0;
        me.__excludes[index] = false;
        me.areas[index].show(true);
        me.redraw();
    },

    redraw: function() {
        //store previous configuration for the legend
        //and set it to false so we don't
        //re-build label elements if not necessary.
        var me = this,
            prevLegendConfig;
        prevLegendConfig = me.chart.legend.rebuild;
        me.chart.legend.rebuild = false;
        me.chart.redraw();
        me.chart.legend.rebuild = prevLegendConfig;
    },
    
    hide: function() {
        if (this.areas) {
            var me = this,
                areas = me.areas,
                i, j, l, ln, shadows;
            
            if (areas && areas.length) {
                for (i = 0, ln = areas.length; i < ln; ++i) {
                    if (areas[i]) {
                        areas[i].hide(true);
                    }
                }
                me.hideLabels();
            }
        }
    },

    /**
     * Returns the color of the series (to be displayed as color for the series legend item).
     * @param {Object} item Info about the item; same format as returned by #getItemForPoint
     */
    getLegendColor: function(index) {
        var me = this;
        index += me.themeIdx;
        return me.colorArrayStyle[index % me.colorArrayStyle.length];
    }
});

/**
 * Creates a Bar Chart. A Bar Chart is a useful visualization technique to display quantitative information for
 * different categories that can show some progression (or regression) in the dataset. As with all other series, the Bar
 * Series must be appended in the *series* Chart array configuration. See the Chart documentation for more information.
 * A typical configuration object for the bar series could be:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data'],
 *         data: [
 *             { 'name': 'metric one',   'data':10 },
 *             { 'name': 'metric two',   'data': 7 },
 *             { 'name': 'metric three', 'data': 5 },
 *             { 'name': 'metric four',  'data': 2 },
 *             { 'name': 'metric five',  'data':27 }
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         store: store,
 *         axes: [{
 *             type: 'Numeric',
 *             position: 'bottom',
 *             fields: ['data'],
 *             label: {
 *                 renderer: Ext.util.Format.numberRenderer('0,0')
 *             },
 *             title: 'Sample Values',
 *             grid: true,
 *             minimum: 0
 *         }, {
 *             type: 'Category',
 *             position: 'left',
 *             fields: ['name'],
 *             title: 'Sample Metrics'
 *         }],
 *         series: [{
 *             type: 'bar',
 *             axis: 'bottom',
 *             highlight: true,
 *             tips: {
 *               trackMouse: true,
 *               width: 140,
 *               height: 28,
 *               renderer: function(storeItem, item) {
 *                 this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data') + ' views');
 *               }
 *             },
 *             label: {
 *               display: 'insideEnd',
 *                 field: 'data',
 *                 renderer: Ext.util.Format.numberRenderer('0'),
 *                 orientation: 'horizontal',
 *                 color: '#333',
 *                 'text-anchor': 'middle'
 *             },
 *             xField: 'name',
 *             yField: 'data'
 *         }]
 *     });
 *
 * In this configuration we set `bar` as the series type, bind the values of the bar to the bottom axis and set the
 * xField or category field to the `name` parameter of the store. We also set `highlight` to true which enables smooth
 * animations when bars are hovered. We also set some configuration for the bar labels to be displayed inside the bar,
 * to display the information found in the `data1` property of each element store, to render a formated text with the
 * `Ext.util.Format` we pass in, to have an `horizontal` orientation (as opposed to a vertical one) and we also set
 * other styles like `color`, `text-anchor`, etc.
 */
Ext.define('Ext.chart.series.Bar', {

    /* Begin Definitions */

    extend: 'Ext.chart.series.Cartesian',

    alternateClassName: ['Ext.chart.BarSeries', 'Ext.chart.BarChart', 'Ext.chart.StackedBarChart'],

    requires: ['Ext.chart.axis.Axis', 'Ext.fx.Anim'],

    /* End Definitions */

    type: 'bar',

    alias: 'series.bar',
    /**
     * @cfg {Boolean} column Whether to set the visualization as column chart or horizontal bar chart.
     */
    column: false,

    /**
     * @cfg style Style properties that will override the theming series styles.
     */
    style: {},

    /**
     * @cfg {Number} gutter The gutter space between single bars, as a percentage of the bar width
     */
    gutter: 38.2,

    /**
     * @cfg {Number} groupGutter The gutter space between groups of bars, as a percentage of the bar width
     */
    groupGutter: 38.2,

    /**
     * @cfg {Number/Object} xPadding Padding between the left/right axes and the bars.
     * The possible values are a number (the number of pixels for both left and right padding)
     * or an object with `{ left, right }` properties.
     */
    xPadding: 0,

    /**
     * @cfg {Number/Object} yPadding Padding between the top/bottom axes and the bars.
     * The possible values are a number (the number of pixels for both top and bottom padding)
     * or an object with `{ top, bottom }` properties.
     */
    yPadding: 10,

    /**
     * @cfg {Boolean} stacked
     * If set to `true` then bars for multiple `yField` values will be rendered stacked on top of one another.
     * Otherwise, they will be rendered side-by-side. Defaults to `false`.
     */
    
    defaultRotate: {
        x: 0,
        y: 0,
        degrees: 0
    },

    constructor: function(config) {
        this.callParent(arguments);
        var me = this,
            surface = me.chart.surface,
            shadow = me.chart.shadow,
            i, l;
        config.highlightCfg = Ext.Object.merge({
            lineWidth: 3,
            stroke: '#55c',
            opacity: 0.8,
            color: '#f00'
        }, config.highlightCfg);
        Ext.apply(me, config, {
            shadowAttributes: [{
                "stroke-width": 6,
                "stroke-opacity": 0.05,
                stroke: 'rgb(200, 200, 200)',
                translate: {
                    x: 1.2,
                    y: 1.2
                }
            }, {
                "stroke-width": 4,
                "stroke-opacity": 0.1,
                stroke: 'rgb(150, 150, 150)',
                translate: {
                    x: 0.9,
                    y: 0.9
                }
            }, {
                "stroke-width": 2,
                "stroke-opacity": 0.15,
                stroke: 'rgb(100, 100, 100)',
                translate: {
                    x: 0.6,
                    y: 0.6
                }
            }]
        });

        me.group = surface.getGroup(me.seriesId + '-bars');
        if (shadow) {
            for (i = 0, l = me.shadowAttributes.length; i < l; i++) {
                me.shadowGroups.push(surface.getGroup(me.seriesId + '-shadows' + i));
            }
        }
    },

    // @private returns the padding.
    getPadding: function() {
        var me = this,
            xPadding = me.xPadding,
            yPadding = me.yPadding,
            padding = { };

        if (Ext.isNumber(xPadding)) {
            padding.left = xPadding;
            padding.right = xPadding;
        } else if (Ext.isObject(xPadding)) {
            padding.left = xPadding.left;
            padding.right = xPadding.right;
        } else {
            padding.left = 0;
            padding.right = 0;
        }
        padding.width = padding.left + padding.right;

        if (Ext.isNumber(yPadding)) {
            padding.bottom = yPadding;
            padding.top = yPadding;
        } else if (Ext.isObject(yPadding)) {
            padding.bottom = yPadding.bottom;
            padding.top = yPadding.top;
        } else {
            padding.bottom = 0;
            padding.top = 0;
        }
        padding.height = padding.bottom + padding.top;

        return padding;
    },

    // @private returns the bar girth.
    getBarGirth: function() {
        var me = this,
            store = me.chart.getChartStore(),
            column = me.column,
            ln = store.getCount(),
            gutter = me.gutter / 100,
            padding,
            property;

        property = (column ? 'width' : 'height');
        
        if (me.style && me.style[property]) {
            me.configuredColumnGirth = true;
            return +me.style[property];
        }
        
        padding = me.getPadding();
        
        return (me.chart.chartBBox[property] - padding[property]) / (ln * (gutter + 1) - gutter);
    },

    // @private returns the gutters.
    getGutters: function() {
        var me = this,
            column = me.column,
            padding = me.getPadding(),
            halfBarGirth = me.getBarGirth() / 2,
            lowerGutter = Math.ceil((column ? padding.left : padding.bottom) + halfBarGirth),
            upperGutter = Math.ceil((column ? padding.right : padding.top) + halfBarGirth);

        return {
            lower: lowerGutter,
            upper: upperGutter,
            verticalAxis: !column
        };
    },

    // @private Get chart and data boundaries
    getBounds: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            data = store.data.items,
            i, ln, record,
            bars = [].concat(me.yField),
            barsLoc = [],
            barsLen = bars.length,
            groupBarsLen = barsLen,
            groupGutter = me.groupGutter / 100,
            column = me.column,
            padding = me.getPadding(),
            stacked = me.stacked,
            barWidth = me.getBarGirth(),
            barWidthProperty = column ? 'width' : 'height',
            math = Math,
            mmin = math.min,
            mmax = math.max,
            mabs = math.abs,
            boundAxes = me.getAxesForXAndYFields(),
            boundYAxis = boundAxes.yAxis,
            minX, maxX, colsScale, colsZero, gutters,
            ends, shrunkBarWidth, groupBarWidth, bbox, minY, maxY, axis, out,
            scale, zero, total, rec, j, plus, minus, inflections, tick, loc;

        me.setBBox(true);
        bbox = me.bbox;

        //Skip excluded series
        if (me.__excludes) {
            for (j = 0, total = me.__excludes.length; j < total; j++) {
                if (me.__excludes[j]) {
                    groupBarsLen--;
                }
            }
        }
        axis = chart.axes.get(boundYAxis);
        if (axis) {
            ends = axis.applyData();
            minY = ends.from;
            maxY = ends.to;
        }

        if (me.yField && !Ext.isNumber(minY)) {
            out = me.getMinMaxYValues();
            minY = out[0];
            maxY = out[1];
        }

        if (!Ext.isNumber(minY)) {
            minY = 0;
        }
        if (!Ext.isNumber(maxY)) {
            maxY = 0;
        }
        scale = (column ? bbox.height - padding.height : bbox.width - padding.width) / (maxY - minY);
        shrunkBarWidth = barWidth;
        groupBarWidth = (barWidth / ((stacked ? 1 : groupBarsLen) * (groupGutter + 1) - groupGutter));
        
        if (barWidthProperty in me.style) {
            groupBarWidth = mmin(groupBarWidth, me.style[barWidthProperty]);
            shrunkBarWidth = groupBarWidth * ((stacked ? 1 : groupBarsLen) * (groupGutter + 1) - groupGutter);
        }
        zero = (column) ? bbox.y + bbox.height - padding.bottom : bbox.x + padding.left;

        if (stacked) {
            total = [[], []];
            for (i = 0, ln = data.length; i < ln; i++) {
                record = data[i];
                total[0][i] = total[0][i] || 0;
                total[1][i] = total[1][i] || 0;
                for (j = 0; j < barsLen; j++) {
                    if (me.__excludes && me.__excludes[j]) {
                        continue;
                    }
                    rec = record.get(bars[j]);
                    total[+(rec > 0)][i] += mabs(rec);
                }
            }
            total[+(maxY > 0)].push(mabs(maxY));
            total[+(minY > 0)].push(mabs(minY));
            minus = mmax.apply(math, total[0]);
            plus = mmax.apply(math, total[1]);
            scale = (column ? bbox.height - padding.height : bbox.width - padding.width) / (plus + minus);
            zero = zero + minus * scale * (column ? -1 : 1);
        }
        else if (minY / maxY < 0) {
            zero = zero - minY * scale * (column ? -1 : 1);
        }

        // If the columns are bound to the x-axis, calculate their positions
        if (me.boundColumn) {
            axis = chart.axes.get(boundAxes.xAxis);
            if (axis) {
                ends = axis.applyData();
                minX = ends.from;
                maxX = ends.to;
            }
            if (me.xField && !Ext.isNumber(minX)) {
                out = me.getMinMaxYValues();
                minX = out[0];
                maxX = out[1];
            }
            if (!Ext.isNumber(minX)) {
                minX = 0;
            }
            if (!Ext.isNumber(maxX)) {
                maxX = 0;
            }
            gutters = me.getGutters();
            colsScale = (bbox.width - (gutters.lower + gutters.upper)) / ((maxX - minX) || 1);

            colsZero = bbox.x + gutters.lower;
        
            barsLoc = [];
            for (i = 0, ln = data.length; i < ln; i++) {
                record = data[i];
                rec = record.get(me.xField);
                barsLoc[i] = colsZero + (rec - minX) * colsScale - (groupBarWidth / 2);
            }
        }
        
        // Or, if column width is configured, place columns over inflections
        else if (me.configuredColumnGirth) {
            axis = chart.axes.get(boundAxes.xAxis);
            if (axis) {
                inflections = axis.inflections;
                if (axis.isCategoryAxis || inflections.length == data.length) {
                    barsLoc = [];
                    for (i = 0, ln = data.length; i < ln; i++) {
                        tick = inflections[i];
                        loc = column ? tick[0] : tick[1];
                        barsLoc[i] = loc - (shrunkBarWidth / 2);
                    }                
                }                
            }
        }

        return {
            bars: bars,
            barsLoc: barsLoc,
            bbox: bbox,
            shrunkBarWidth: shrunkBarWidth,
            barsLen: barsLen,
            groupBarsLen: groupBarsLen,
            barWidth: barWidth,
            groupBarWidth: groupBarWidth,
            scale: scale,
            zero: zero,
            padding: padding,
            signed: minY / maxY < 0,
            minY: minY,
            maxY: maxY
        };
    },

    // @private Build an array of paths for the chart
    getPaths: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            data = store.data.items,
            i, total, record,
            bounds = me.bounds = me.getBounds(),
            items = me.items = [],
            yFields = Ext.isArray(me.yField) ? me.yField : [me.yField],
            gutter = me.gutter / 100,
            groupGutter = me.groupGutter / 100,
            animate = chart.animate,
            column = me.column,
            group = me.group,
            enableShadows = chart.shadow,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            shadowGroupsLn = shadowGroups.length,
            bbox = bounds.bbox,
            barWidth = bounds.barWidth,
            shrunkBarWidth = bounds.shrunkBarWidth,
            padding = me.getPadding(),
            stacked = me.stacked,
            barsLen = bounds.barsLen,
            colors = me.colorArrayStyle,
            colorLength = colors && colors.length || 0,
            themeIndex = me.themeIdx,
            reverse = me.reverse,
            math = Math,
            mmax = math.max,
            mmin = math.min,
            mabs = math.abs,
            j, yValue, height, totalDim, totalNegDim, bottom, top, hasShadow, barAttr, attrs, counter,
            totalPositiveValues, totalNegativeValues,
            shadowIndex, shadow, sprite, offset, floorY, idx, itemIdx, xPos, yPos, width, usedWidth, barIdx;

        for (i = 0, total = data.length; i < total; i++) {
            record = data[i];
            bottom = bounds.zero;
            top = bounds.zero;
            totalDim = 0;
            totalNegDim = 0;
            totalPositiveValues = totalNegativeValues = 0;
            hasShadow = false;
            usedWidth = 0;
            
            for (j = 0, counter = 0; j < barsLen; j++) {
                // Excluded series
                if (me.__excludes && me.__excludes[j]) {
                    continue;
                }
                yValue = record.get(bounds.bars[j]);
                if (yValue >= 0) {
                    totalPositiveValues += yValue;
                } else {
                    totalNegativeValues += yValue;
                }
                height = Math.round((yValue - mmax(bounds.minY, 0)) * bounds.scale);
                idx = themeIndex + (barsLen > 1 ? j : 0);
                barAttr = {
                    fill: colors[idx % colorLength]
                };
                
                if (column) {
                    idx = reverse ? (total - i - 1) : i;
                    barIdx = reverse ? (barsLen - counter - 1)  : counter;

                    if (me.boundColumn) {
                        xPos = bounds.barsLoc[idx];
                    }
                    else if (me.configuredColumnGirth && bounds.barsLoc.length) {
                        xPos = bounds.barsLoc[idx] + 
                               barIdx * bounds.groupBarWidth *
                               (1 + groupGutter) * !stacked;
                             
                    }
                    else {
                        xPos = bbox.x + padding.left +
                              (barWidth - shrunkBarWidth) * 0.5 +
                              idx * barWidth * (1 + gutter) +
                              barIdx * bounds.groupBarWidth *
                              (1 + groupGutter) * !stacked;
                    }
                    
                    Ext.apply(barAttr, {
                        height: height,
                        width: mmax(bounds.groupBarWidth, 0),
                        x: xPos,
                        y: bottom - height
                    });
                }
                else {
                    // draw in reverse order
                    offset = (total - 1) - i;
                    width = height + (bottom == bounds.zero);
                    xPos = bottom + (bottom != bounds.zero);

                    if (reverse) {
                        // Subtract 1 for the first item
                        xPos = bounds.zero + bbox.width - width - (usedWidth === 0 ? 1 : 0);
                        if (stacked) {
                            xPos -= usedWidth;
                            usedWidth += width;
                        }
                    }

                    if (me.configuredColumnGirth && bounds.barsLoc.length) {
                        yPos = bounds.barsLoc[i] +
                               counter * bounds.groupBarWidth * (1 + groupGutter) * !stacked;
                    }
                    else {
                        yPos = bbox.y + padding.top +
                               (barWidth - shrunkBarWidth) * 0.5 +
                               offset * barWidth * (1 + gutter) +
                               counter * bounds.groupBarWidth *
                               (1 + groupGutter) * !stacked + 1;
                    }
                    
                    Ext.apply(barAttr, {
                        height: mmax(bounds.groupBarWidth, 0),
                        width: width,
                        x: xPos,
                        y: yPos
                    });
                }
                if (height < 0) {
                    if (column) {
                        barAttr.y = top;
                        barAttr.height = mabs(height);
                    } else {
                        barAttr.x = top + height;
                        barAttr.width = mabs(height);
                    }
                }
                if (stacked) {
                    if (height < 0) {
                        top += height * (column ? -1 : 1);
                    } else {
                        bottom += height * (column ? -1 : 1);
                    }
                    totalDim += mabs(height);
                    if (height < 0) {
                        totalNegDim += mabs(height);
                    }
                }
                barAttr.x = Math.floor(barAttr.x) + 1;
                floorY = Math.floor(barAttr.y);
                if (Ext.isIE8 && barAttr.y > floorY) {
                    floorY--;
                }
                barAttr.y = floorY;
                barAttr.width = Math.floor(barAttr.width);
                barAttr.height = Math.floor(barAttr.height);
                items.push({
                    series: me,
                    yField: yFields[j],
                    storeItem: record,
                    value: [record.get(me.xField), yValue],
                    attr: barAttr,
                    point: column ? [barAttr.x + barAttr.width / 2, yValue >= 0 ? barAttr.y : barAttr.y + barAttr.height] :
                                    [yValue >= 0 ? barAttr.x + barAttr.width : barAttr.x, barAttr.y + barAttr.height / 2]
                });
                // When resizing, reset before animating
                if (animate && chart.resizing) {
                    attrs = column ? {
                        x: barAttr.x,
                        y: bounds.zero,
                        width: barAttr.width,
                        height: 0
                    } : {
                        x: bounds.zero,
                        y: barAttr.y,
                        width: 0,
                        height: barAttr.height
                    };
                    if (enableShadows && (stacked && !hasShadow || !stacked)) {
                        hasShadow = true;
                        //update shadows
                        for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                            shadow = shadowGroups[shadowIndex].getAt(stacked ? i : (i * barsLen + j));
                            if (shadow) {
                                shadow.setAttributes(attrs, true);
                            }
                        }
                    }
                    //update sprite position and width/height
                    sprite = group.getAt(i * barsLen + j);
                    if (sprite) {
                        sprite.setAttributes(attrs, true);
                    }
                }
                counter++;
            }
            if (stacked && items.length) {
                items[i * counter].totalDim = totalDim;
                items[i * counter].totalNegDim = totalNegDim;
                items[i * counter].totalPositiveValues = totalPositiveValues;
                items[i * counter].totalNegativeValues = totalNegativeValues;
            }
        }
        if (stacked && counter == 0) {
            // Remove ghost shadow ref: EXTJSIV-5982
            for (i = 0, total = data.length; i < total; i++) {
                for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                    shadow = shadowGroups[shadowIndex].getAt(i);
                    if (shadow) {
                        shadow.hide(true);
                    }
                }
            }
        }
    },

    // @private render/setAttributes on the shadows
    renderShadows: function(i, barAttr, baseAttrs, bounds) {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            animate = chart.animate,
            stacked = me.stacked,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            shadowGroupsLn = shadowGroups.length,
            store = chart.getChartStore(),
            column = me.column,
            items = me.items,
            shadows = [],
            reverse = me.reverse,
            zero = bounds.zero,
            shadowIndex, shadowBarAttr, shadow, totalDim, totalNegDim, j, rendererAttributes;

        if ((stacked && (i % bounds.groupBarsLen === 0)) || !stacked) {
            j = i / bounds.groupBarsLen;
            //create shadows
            for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                shadowBarAttr = Ext.apply({}, shadowAttributes[shadowIndex]);
                shadow = shadowGroups[shadowIndex].getAt(stacked ? j : i);
                Ext.copyTo(shadowBarAttr, barAttr, 'x,y,width,height');
                if (!shadow) {
                    shadow = surface.add(Ext.apply({
                        type: 'rect',
                        isShadow: true,
                        group: shadowGroups[shadowIndex]
                    }, Ext.apply({}, baseAttrs, shadowBarAttr)));
                }
                if (stacked) {
                    totalDim = items[i].totalDim;
                    totalNegDim = items[i].totalNegDim;
                    if (column) {
                        shadowBarAttr.y = zero + totalNegDim - totalDim - 1;
                        shadowBarAttr.height = totalDim;
                    } else {
                        if (reverse) {
                            shadowBarAttr.x = zero + bounds.bbox.width - totalDim;
                        } else {
                            shadowBarAttr.x = zero - totalNegDim;
                        }
                        shadowBarAttr.width = totalDim;
                    }
                }
                
                rendererAttributes = me.renderer(shadow, store.getAt(j), shadowBarAttr, i, store);
                rendererAttributes.hidden = !!barAttr.hidden;
                if (animate) {
                    me.onAnimate(shadow, {
                        zero: bounds.zero + (reverse ? bounds.bbox.width : 0), 
                        to: rendererAttributes 
                    });
                }
                else {
                    shadow.setAttributes(rendererAttributes, true);
                }
                shadows.push(shadow);
            }
        }
        return shadows;
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            surface = chart.surface,
            animate = chart.animate,
            stacked = me.stacked,
            column = me.column,
            chartAxes = chart.axes,
            boundAxes = me.getAxesForXAndYFields(),
            boundXAxis = boundAxes.xAxis,
            boundYAxis = boundAxes.yAxis,
            enableShadows = chart.shadow,
            shadowGroups = me.shadowGroups,
            shadowGroupsLn = shadowGroups.length,
            group = me.group,
            seriesStyle = me.seriesStyle,
            items, ln, i, j, baseAttrs, sprite, rendererAttributes, shadowIndex, shadowGroup,
            bounds, endSeriesStyle, barAttr, attrs, anim;

        if (!store || !store.getCount() || me.seriesIsHidden) {
            me.hide();
            me.items = [];
            return;
        }

        //fill colors are taken from the colors array.
        endSeriesStyle = Ext.apply({}, this.style, seriesStyle);
        delete endSeriesStyle.fill;
        delete endSeriesStyle.x;
        delete endSeriesStyle.y;
        delete endSeriesStyle.width;
        delete endSeriesStyle.height;
        
        me.unHighlightItem();
        me.cleanHighlights();
        
        me.boundColumn = (boundXAxis && Ext.Array.contains(me.axis,boundXAxis) 
                            && chartAxes.get(boundXAxis) 
                            && chartAxes.get(boundXAxis).isNumericAxis);

        me.getPaths();
        bounds = me.bounds;
        items = me.items;

        baseAttrs = column ? {
            y: bounds.zero,
            height: 0
        } : {
            x: bounds.zero,
            width: 0
        };
        ln = items.length;

        // Create new or reuse sprites and animate/display
        for (i = 0; i < ln; i++) {
            sprite = group.getAt(i);
            barAttr = items[i].attr;

            if (enableShadows) {
                items[i].shadows = me.renderShadows(i, barAttr, baseAttrs, bounds);
            }

            // Create a new sprite if needed (no height)
            if (!sprite) {
                attrs = Ext.apply({}, baseAttrs, barAttr);
                attrs = Ext.apply(attrs, endSeriesStyle || {});
                sprite = surface.add(Ext.apply({}, {
                    type: 'rect',
                    group: group
                }, attrs));
            }
            if (animate) {
                rendererAttributes = me.renderer(sprite, store.getAt(i), barAttr, i, store);
                sprite._to = rendererAttributes;
                anim = me.onAnimate(sprite, {
                    zero: bounds.zero + (me.reverse ? bounds.bbox.width : 0),
                    to: Ext.apply(rendererAttributes, endSeriesStyle) 
                });
                if (enableShadows && stacked && (i % bounds.barsLen === 0)) {
                    j = i / bounds.barsLen;
                    for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                        anim.on('afteranimate', function() {
                            this.show(true);
                        }, shadowGroups[shadowIndex].getAt(j));
                    }
                }
            }
            else {
                rendererAttributes = me.renderer(sprite, store.getAt(i), Ext.apply(barAttr, { hidden: false }), i, store);
                sprite.setAttributes(Ext.apply(rendererAttributes, endSeriesStyle), true);
            }
            items[i].sprite = sprite;
        }

        // Hide unused sprites
        ln = group.getCount();
        for (j = i; j < ln; j++) {
            group.getAt(j).hide(true);
        }
        
        if (me.stacked) {
            // If stacked, we have only store.getCount() shadows.
            i = store.getCount();    
        }
        
        // Hide unused shadows
        if (enableShadows) {
            for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                shadowGroup = shadowGroups[shadowIndex];
                ln = shadowGroup.getCount();
                for (j = i; j < ln; j++) {
                    shadowGroup.getAt(j).hide(true);
                }
            }
        }
        me.renderLabels();
    },

    // @private called when a label is to be created.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            surface = me.chart.surface,
            group = me.labelsGroup,
            config = me.label,
            endLabelStyle = Ext.apply({}, config, me.seriesLabelStyle || {}),
            sprite;

        return surface.add(Ext.apply({
            type: 'text',
            group: group
        }, endLabelStyle || {}));
    },

    // @private called when a label is to be positioned.
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {
        // Determine the label's final position. Starts with the configured preferred value but
        // may get flipped from inside to outside or vice-versa depending on space.
        var me = this,
            opt = me.bounds,
            groupBarWidth = opt.groupBarWidth,
            column = me.column,
            chart = me.chart,
            chartBBox = chart.chartBBox,
            resizing = chart.resizing,
            xValue = item.value[0],
            yValue = item.value[1],
            attr = item.attr,
            config = me.label,
            stacked = me.stacked,
            stackedDisplay = config.stackedDisplay,
            rotate = (config.orientation == 'vertical'),
            field = [].concat(config.field),
            format = config.renderer,
            text, size, width, height,
            zero = opt.zero,
            insideStart = 'insideStart',
            insideEnd = 'insideEnd',
            outside = 'outside',
            over = 'over',
            under = 'under',
            labelMarginX = 4,   // leave space around the labels (important when saving chart as image)
            labelMarginY = 2,
            signed = opt.signed,
            reverse = me.reverse,
            x, y, finalAttr;

        if (display == insideStart || display == insideEnd || display == outside) {
            if (stacked && (display == outside)) {
                // It doesn't make sense to use 'outside' on a stacked chart
                // unless we only want to display the 'stackedDisplay' labels.
                label.hide(true);
                return;
            }
            label.setAttributes({
                // Reset the style in case the label is being reused (for instance, if a series is excluded)
                // and do it before calling the renderer function.
                style: undefined
            });
            text = (Ext.isNumber(index) ? format(storeItem.get(field[index]), label, storeItem, item, i, display, animate, index) : '');
            label.setAttributes({
                // Set the text onto the label.
                text: text
            });
            size = me.getLabelSize(text, label.attr.style);
            width = size.width;
            height = size.height;
            if (column) {
                //-----------------------------------------
                // Position the label within a column chart
            
                // If there is no label to display, or if the corresponding box in a stacked column 
                // isn't tall enough to display the label, then leave.
                if (!width || !height || (stacked && (attr.height < height))) {
                    label.hide(true);
                    return;
                }
                
                // Align horizontally the label in the middle of the column
                x = attr.x + (rotate ? groupBarWidth/2 : (groupBarWidth - width)/2);
                
                // If the label is to be displayed outside, make sure there is room for it, otherwise display it inside.
                if (display == outside) {
                    var free = (yValue >= 0 ? (attr.y - chartBBox.y) : (chartBBox.y + chartBBox.height - attr.y - attr.height));
                    if (free < height + labelMarginY) {
                        display = insideEnd;
                    }
                }
    
                // If the label is to be displayed inside a non-stacked chart, make sure it is 
                // not taller than the box, otherwise move it outside.
                if (!stacked && (display != outside)) {
                    if (height + labelMarginY > attr.height) {
                        display = outside;
                    }
                }
    
                // Place the label vertically depending on its config and on whether the value
                // it represents is positive (above the X-axis) or negative (below the X-axis)
                if (!y) {
                    y = attr.y;
                    if (yValue >= 0) {
                        switch (display) {
                            case insideStart: y += attr.height + (rotate ? -labelMarginY : -height/2);  break;
                            case insideEnd:   y += (rotate ? height + labelMarginX : height/2);         break;
                            case outside:     y += (rotate ? -labelMarginY : -height/2);                break;
                        }
                    } else {
                        switch (display) {
                            case insideStart: y += (rotate ? height + labelMarginY : height/2);                             break;
                            case insideEnd:   y += (rotate ? attr.height - labelMarginY : attr.height - height/2);          break;
                            case outside:     y += (rotate ? attr.height + height + labelMarginY : attr.height + height/2); break;
                        }
                    }
                }
            }
            else {
                //-----------------------------------------
                // Position the label within a bar chart
    
                // If there is no label to display, or if the corresponding box has no width, then leave.
                if (!width || !height || (stacked && !attr.width)) {
                    label.hide(true);
                    return;
                }
    
                // Align vertically the label in the middle of the bar
                y = attr.y + (rotate ? (groupBarWidth + height)/2 : groupBarWidth/2);
    
                // If the label is to be displayed outside, make sure there is room for it otherwise display it inside.
                if (display == outside) {
                    var free = (yValue >= 0 ? (chartBBox.x + chartBBox.width - attr.x - attr.width) :  (attr.x - chartBBox.x));
                    if (free < width + labelMarginX) {
                        display = insideEnd;
                    }
                }
    
                // If the label is to be displayed inside (and it is not rotated yet), make sure it is
                // not wider than the box it represents otherwise (for a stacked chart) rotate it vertically
                // and center it, or (for a non-stacked chart) move it outside.
                if ((display != outside) && !rotate) {
                    // Add a slight fudge factor here to make sure we're not flush against the edge
                    if (width + labelMarginX * 2 >= attr.width) {
                        if (stacked) {
                            if (height > attr.width) {
                                label.hide(true);
                                return; // Even rotated, there isn't enough room.
                            }
                            x = attr.x + attr.width/2;
                            rotate = true;
                        } else {
                            display = outside;
                        }
                    }
                }
    
                // Place the label horizontally depending on its config and on whether the value
                // it represents is positive (above the X-axis) or negative (below the X-axis)
                if (!x) {
                    x = attr.x;
                    if (yValue >= 0) {
                        switch (display) {
                            case insideStart:
                                if (reverse) {
                                    x += attr.width + (rotate ? -width/2 : -width - labelMarginX);
                                } else { 
                                    x += (rotate ? width/2 : labelMarginX);
                                }
                                break;
                            case insideEnd:   
                                if (reverse) {
                                    x -= rotate ? -width/2 : -width - labelMarginX;
                                } else {
                                    x += attr.width + (rotate ? -width/2 : -width - labelMarginX);
                                }    
                                break;
                            case outside:     
                                if (reverse) {
                                    x -= width + (rotate ? width/2 : labelMarginX);
                                } else {
                                    x += attr.width + (rotate ? width/2 : labelMarginX);
                                }         
                                break;
                        }
                    } else {
                        switch (display) {
                            case insideStart: 
                                if (reverse) {
                                    x -= rotate ? -width/2 : -width - labelMarginX;
                                } else {
                                    x += attr.width + (rotate ? -width/2 : -width - labelMarginX);
                                }    
                                break;
                            case insideEnd:
                                if (reverse) {
                                    x += attr.width + (rotate ? -width/2 : -width - labelMarginX);
                                } else {   
                                    x += (rotate ? width/2 : labelMarginX);
                                }                          
                                break;
                            case outside:
                                if (reverse) {
                                    x -= width + (rotate ? width/2 : labelMarginX);
                                } else {     
                                    x += (rotate ? -width/2 : -width - labelMarginX);
                                }                 
                                break;
                        }
                    }
                }
            }
        } else if (display == over || display == under) {
            if (stacked && stackedDisplay) {
                //-----------------------------------------
                // Position the label on top or at the bottom of a stacked bar/column
    
                text = label.attr.text;
                label.setAttributes({
                    // The text is already set onto the label: we just need to set the style
                    // (but don't overwrite any custom style that might have been set by an app override).
                    style: Ext.applyIf((label.attr && label.attr.style) || {},
                        {
                            'font-weight':'bold',
                            'font-size':'14px'
                        }
                    )
                });

                size = me.getLabelSize(text, label.attr.style);
                width = size.width;
                height = size.height;
    
                switch (display) {
                    case over:
                        if (column) {
                            x = attr.x + (rotate ? groupBarWidth/2 : (groupBarWidth - width)/2);
                            y = zero - (item.totalDim - item.totalNegDim) - height/2 - labelMarginY;
                        } else {
                            x = zero + (item.totalDim - item.totalNegDim) + labelMarginX;
                            y = attr.y + (rotate ? (groupBarWidth + height)/2 : groupBarWidth/2);
                        }
                        break;
                    case under:
                        if (column) {
                            x = attr.x + (rotate ? groupBarWidth/2 : (groupBarWidth - width)/2);
                            y = zero + item.totalNegDim + height/2;
                        } else {
                            x = zero - item.totalNegDim - width - labelMarginX;
                            y = attr.y + (rotate ? (groupBarWidth + height)/2 : groupBarWidth/2);
                        }
                        break;
                }
            }
        }
        
        if (x == undefined || y == undefined) {
            // bad configuration: x/y are not set
            label.hide(true);
            return;
        }

        label.isOutside = (display == outside);
        label.setAttributes({
            text: text
        });

        //set position
        finalAttr = {
            x: x,
            y: y
        };
        
        // Rotate if we need to, but if not clear any previous rotation because we
        // are reusing the label
        finalAttr.rotate = rotate ? {
            x: x,
            y: y,
            degrees: 270
        } : me.defaultRotate;
        
        //check for resizing
        if (animate && resizing) {
            if (column) {
                x = attr.x + attr.width / 2;
                y = zero;
            } else {
                x = zero;
                y = attr.y + attr.height / 2;
            }
            label.setAttributes({
                x: x,
                y: y
            }, true);
            if (rotate) {
                label.setAttributes({
                    rotate: {
                        x: x,
                        y: y,
                        degrees: 270
                    }
                }, true);
            }
        }
        
        //handle animation
        if (animate) {
            me.onAnimate(label, {
                zero: item.point[0], 
                to: finalAttr 
            });
        }
        else {
            label.setAttributes(Ext.apply(finalAttr, {
                hidden: false
            }), true);
        }
    },

    /* @private
     * Gets the dimensions of a given bar label. Uses a single hidden sprite to avoid
     * changing visible sprites.
     * @param value
     */
    getLabelSize: function(value, labelStyle) {
        var tester = this.testerLabel,
            config = this.label,
            endLabelStyle = Ext.apply({}, config, labelStyle, this.seriesLabelStyle || {}),
            rotated = config.orientation === 'vertical',
            bbox, w, h,
            undef;
        if (!tester) {
            tester = this.testerLabel = this.chart.surface.add(Ext.apply({
                type: 'text',
                opacity: 0
            }, endLabelStyle));
        }
        tester.setAttributes({
            style: labelStyle,
            text: value
        }, true);

        // Flip the width/height if rotated, as getBBox returns the pre-rotated dimensions
        bbox = tester.getBBox();
        w = bbox.width;
        h = bbox.height;
        return {
            width: rotated ? h : w,
            height: rotated ? w : h
        };
    },

    // @private used to animate label, markers and other sprites.
    onAnimate: function(sprite, attr) {
        var me = this,
            to = attr.to,
            stacked = me.stacked,
            reverse = me.reverse,
            width = 0,
            isText, bbox, x, from;
            
        sprite.show();
        
        if (!me.column) {
            if (reverse) {
                bbox = sprite.getBBox();
                isText = sprite.type == 'text';
                // If we're highlighting, we don't want to reset the position
                // so just grab the current position
                if (!me.inHighlight) {
                    if (!stacked) {
                        if (isText) {
                            // Fudge factor, if the text has yet to be positioned it will be < 5
                            x = bbox.x >= 5 ? x : attr.zero;
                        } else {
                            if (bbox.width) {
                                width = bbox.width;
                            }
                            x = bbox.width ? bbox.x : to.x + to.width;
                        }
                    } else {
                        x = attr.zero;
                    }
                }
                attr.from = {
                    x: x,
                    width: width
                };
            }
            
            if (stacked) {
                from = attr.from;
                if (!from) {
                    from = attr.from = {};
                }
                from.y = to.y;
                if (!reverse) {
                    from.x = attr.zero;
                    if (sprite.isShadow) {
                        from.width = 0;
                    }
                }
            }
        }
        
        return this.callParent(arguments);
    },

    isItemInPoint: function(x, y, item) {
        var bbox = item.sprite.getBBox();
        return bbox.x <= x && bbox.y <= y
            && (bbox.x + bbox.width) >= x
            && (bbox.y + bbox.height) >= y;
    },

    // @private hide all markers
    hideAll: function(index) {
        var axes      = this.chart.axes,
            axesItems = axes.items,
            ln        = axesItems.length,
            i         = 0;

        index = (isNaN(this._index) ? index : this._index) || 0;

        if (!this.__excludes) {
            this.__excludes = [];
        }

        this.__excludes[index] = true;
        this.drawSeries();

        for (i; i < ln; i++) {
            axesItems[i].drawAxis();
        }    
    },

    // @private show all markers
    showAll: function(index) {
        var axes = this.chart.axes,
            axesItems = axes.items,
            ln        = axesItems.length,
            i         = 0;

        index = (isNaN(this._index) ? index : this._index) || 0;

        if (!this.__excludes) {
            this.__excludes = [];
        }

        this.__excludes[index] = false;
        this.drawSeries();

        for (i; i < ln; i++) {
            axesItems[i].drawAxis();
        }    
    },

    /**
     * Returns a string with the color to be used for the series legend item.
     * @param index
     */
    getLegendColor: function(index) {
        var me = this,
            colors = me.colorArrayStyle,
            colorLength = colors && colors.length;

        if (me.style && me.style.fill) {
            return me.style.fill;
        } else {
            return (colors ? colors[(me.themeIdx + index) % colorLength] : '#000');
        }
    },

    highlightItem: function(item) {
        this.callParent(arguments);
        this.inHighlight = true;
        this.renderLabels();
        delete this.inHighlight;
    },

    unHighlightItem: function() {
        this.callParent(arguments);
        this.inHighlight = true;
        this.renderLabels();
        delete this.inHighlight;
    },

    cleanHighlights: function() {
        this.callParent(arguments);
        this.inHighlight = true;
        this.renderLabels();
        delete this.inHighlight;
    }
});

/**
 * @class Ext.chart.series.Column
 *
 * Creates a Column Chart. Much of the methods are inherited from Bar. A Column Chart is a useful
 * visualization technique to display quantitative information for different categories that can
 * show some progression (or regression) in the data set. As with all other series, the Column Series
 * must be appended in the *series* Chart array configuration. See the Chart documentation for more
 * information. A typical configuration object for the column series could be:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data'],
 *         data: [
 *             { 'name': 'metric one',   'data':10 },
 *             { 'name': 'metric two',   'data': 7 },
 *             { 'name': 'metric three', 'data': 5 },
 *             { 'name': 'metric four',  'data': 2 },
 *             { 'name': 'metric five',  'data':27 }
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         store: store,
 *         axes: [
 *             {
 *                 type: 'Numeric',
 *                 position: 'left',
 *                 fields: ['data'],
 *                 label: {
 *                     renderer: Ext.util.Format.numberRenderer('0,0')
 *                 },
 *                 title: 'Sample Values',
 *                 grid: true,
 *                 minimum: 0
 *             },
 *             {
 *                 type: 'Category',
 *                 position: 'bottom',
 *                 fields: ['name'],
 *                 title: 'Sample Metrics'
 *             }
 *         ],
 *         series: [
 *             {
 *                 type: 'column',
 *                 axis: 'left',
 *                 highlight: true,
 *                 tips: {
 *                   trackMouse: true,
 *                   width: 140,
 *                   height: 28,
 *                   renderer: function(storeItem, item) {
 *                     this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data') + ' $');
 *                   }
 *                 },
 *                 label: {
 *                   display: 'insideEnd',
 *                   'text-anchor': 'middle',
 *                     field: 'data',
 *                     renderer: Ext.util.Format.numberRenderer('0'),
 *                     orientation: 'vertical',
 *                     color: '#333'
 *                 },
 *                 xField: 'name',
 *                 yField: 'data'
 *             }
 *         ]
 *     });
 *
 * In this configuration we set `column` as the series type, bind the values of the bars to the bottom axis,
 * set `highlight` to true so that bars are smoothly highlighted when hovered and bind the `xField` or category
 * field to the data store `name` property and the `yField` as the data1 property of a store element.
 */
Ext.define('Ext.chart.series.Column', {

    /* Begin Definitions */

    alternateClassName: ['Ext.chart.ColumnSeries', 'Ext.chart.ColumnChart', 'Ext.chart.StackedColumnChart'],

    extend: 'Ext.chart.series.Bar',

    /* End Definitions */

    type: 'column',
    alias: 'series.column',

    column: true,

    // private: true if the columns are bound to a numerical x-axis; otherwise they are evenly distributed along the axis
    boundColumn: false,

    /**
     * @cfg {String} axis
     * The position of the axis to bind the values to. Possible values are 'left', 'bottom', 'top' and 'right'.
     * You must explicitly set this value to bind the values of the column series to the ones in the axis, otherwise a
     * relative scale will be used.
     */

    /**
     * @cfg {Number/Object} xPadding Padding between the left/right axes and the bars.
     * The possible values are a number (the number of pixels for both left and right padding)
     * or an object with `{ left, right }` properties.
     */
    xPadding: 10,

    /**
     * @cfg {Number/Object} yPadding Padding between the top/bottom axes and the bars.
     * The possible values are a number (the number of pixels for both top and bottom padding)
     * or an object with `{ top, bottom }` properties.
     */
    yPadding: 0
});

/**
 * @class Ext.chart.series.Gauge
 * 
 * Creates a Gauge Chart. Gauge Charts are used to show progress in a certain variable. There are two ways of using the Gauge chart.
 * One is setting a store element into the Gauge and selecting the field to be used from that store. Another one is instantiating the
 * visualization and using the `setValue` method to adjust the value you want.
 *
 * An example of Gauge visualization:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['value'],
 *         data: [
 *             { 'value':80 }
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         store: store,
 *         width: 400,
 *         height: 250,
 *         animate: true,
 *         insetPadding: 30,
 *         axes: [{
 *             type: 'gauge',
 *             position: 'gauge',
 *             minimum: 0,
 *             maximum: 100,
 *             steps: 10,
 *             margin: 10
 *         }],
 *         series: [{
 *             type: 'gauge',
 *             field: 'value',
 *             donut: 30,
 *             colorSet: ['#F49D10', '#ddd']
 *         }]
 *     });
 *
 *     Ext.widget("button", {
 *         renderTo: Ext.getBody(),
 *         text: "Refresh",
 *         handler: function() {
 *             store.getAt(0).set('value', Math.round(Math.random()*100));
 *         }
 *     });
 * 
 * In this example we create a special Gauge axis to be used with the gauge visualization (describing half-circle markers), and also we're
 * setting a maximum, minimum and steps configuration options into the axis. The Gauge series configuration contains the store field to be bound to
 * the visual display and the color set to be used with the visualization.
 */
Ext.define('Ext.chart.series.Gauge', {

    /* Begin Definitions */

    extend: 'Ext.chart.series.Series',

    /* End Definitions */

    type: "gauge",
    alias: 'series.gauge',

    rad: Math.PI / 180,

    /**
     * @cfg {Array} colorSet An array to override the theme's colors array to show the sections in the Gauge in specified colors.
     * The order of this array will be used in the order of sections so the first value will always be used for the first section.
     */

    /**
     * @cfg {Number} highlightDuration
     * The duration for the pie slice highlight effect.
     */
    highlightDuration: 150,

    /**
     * @cfg {String} angleField (required)
     * The store record field name to be used for the pie angles.
     * The values bound to this field name must be positive real numbers.
     */
    angleField: false,

    /**
     * @cfg {Boolean} needle
     * Use the Gauge Series as an area series or add a needle to it. Default's false.
     */
    needle: false,
    
    /**
     * @cfg {Boolean/Number} donut
     * Use the entire disk or just a fraction of it for the gauge. Default's false.
     */
    donut: false,

    /**
     * @cfg {Boolean} showInLegend
     * Whether to add the pie chart elements as legend items. Default's false.
     */
    showInLegend: false,

    /**
     * @cfg {Object} style
     * An object containing styles for overriding series styles from Theming.
     */
    style: {},
    
    constructor: function(config) {
        this.callParent(arguments);
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            store = chart.store,
            shadow = chart.shadow, i, l, cfg;
        Ext.apply(me, config, {
            shadowAttributes: [{
                "stroke-width": 6,
                "stroke-opacity": 1,
                stroke: 'rgb(200, 200, 200)',
                translate: {
                    x: 1.2,
                    y: 2
                }
            },
            {
                "stroke-width": 4,
                "stroke-opacity": 1,
                stroke: 'rgb(150, 150, 150)',
                translate: {
                    x: 0.9,
                    y: 1.5
                }
            },
            {
                "stroke-width": 2,
                "stroke-opacity": 1,
                stroke: 'rgb(100, 100, 100)',
                translate: {
                    x: 0.6,
                    y: 1
                }
            }]
        });
        me.group = surface.getGroup(me.seriesId);
        if (shadow) {
            for (i = 0, l = me.shadowAttributes.length; i < l; i++) {
                me.shadowGroups.push(surface.getGroup(me.seriesId + '-shadows' + i));
            }
        }
        surface.customAttributes.segment = function(opt) {
            return me.getSegment(opt);
        };
    },
    
    // @private updates some onbefore render parameters.
    initialize: function() {
        var me = this,
            store = me.chart.getChartStore(),
            data = store.data.items,
            label = me.label,
            ln = data.length;
          
        me.yField = [];
        if (label && label.field && ln > 0) {
            me.yField.push(data[0].get(label.field));
        }
    },

    // @private returns an object with properties for a Slice
    getSegment: function(opt) {
        var me = this,
            rad = me.rad,
            cos = Math.cos,
            sin = Math.sin,
            abs = Math.abs,
            x = me.centerX,
            y = me.centerY,
            x1 = 0, x2 = 0, x3 = 0, x4 = 0,
            y1 = 0, y2 = 0, y3 = 0, y4 = 0,
            delta = 1e-2,
            r = opt.endRho - opt.startRho,
            startAngle = opt.startAngle,
            endAngle = opt.endAngle,
            midAngle = (startAngle + endAngle) / 2 * rad,
            margin = opt.margin || 0,
            flag = abs(endAngle - startAngle) > 180,
            a1 = Math.min(startAngle, endAngle) * rad,
            a2 = Math.max(startAngle, endAngle) * rad,
            singleSlice = false;

        x += margin * cos(midAngle);
        y += margin * sin(midAngle);

        x1 = x + opt.startRho * cos(a1);
        y1 = y + opt.startRho * sin(a1);

        x2 = x + opt.endRho * cos(a1);
        y2 = y + opt.endRho * sin(a1);

        x3 = x + opt.startRho * cos(a2);
        y3 = y + opt.startRho * sin(a2);

        x4 = x + opt.endRho * cos(a2);
        y4 = y + opt.endRho * sin(a2);

        if (abs(x1 - x3) <= delta && abs(y1 - y3) <= delta) {
            singleSlice = true;
        }
        //Solves mysterious clipping bug with IE
        if (singleSlice) {
            return {
                path: [
                ["M", x1, y1],
                ["L", x2, y2],
                ["A", opt.endRho, opt.endRho, 0, +flag, 1, x4, y4],
                ["Z"]]
            };
        } else {
            return {
                path: [
                ["M", x1, y1],
                ["L", x2, y2],
                ["A", opt.endRho, opt.endRho, 0, +flag, 1, x4, y4],
                ["L", x3, y3],
                ["A", opt.startRho, opt.startRho, 0, +flag, 0, x1, y1],
                ["Z"]]
            };
        }
    },

    // @private utility function to calculate the middle point of a pie slice.
    calcMiddle: function(item) {
        var me = this,
            rad = me.rad,
            slice = item.slice,
            x = me.centerX,
            y = me.centerY,
            startAngle = slice.startAngle,
            endAngle = slice.endAngle,
            radius = Math.max(('rho' in slice) ? slice.rho: me.radius, me.label.minMargin),
            donut = +me.donut,
            a1 = Math.min(startAngle, endAngle) * rad,
            a2 = Math.max(startAngle, endAngle) * rad,
            midAngle = -(a1 + (a2 - a1) / 2),
            xm = x + (item.endRho + item.startRho) / 2 * Math.cos(midAngle),
            ym = y - (item.endRho + item.startRho) / 2 * Math.sin(midAngle);

        item.middle = {
            x: xm,
            y: ym
        };
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            group = me.group,
            animate = me.chart.animate,
            axis = me.chart.axes.get(0),
            minimum = axis && axis.minimum || me.minimum || 0,
            maximum = axis && axis.maximum || me.maximum || 0,
            field = me.angleField || me.field || me.xField,
            surface = chart.surface,
            chartBBox = chart.chartBBox,
            rad = me.rad,
            donut = +me.donut,
            values = {},
            items = [],
            seriesStyle = me.seriesStyle,
            seriesLabelStyle = me.seriesLabelStyle,
            colorArrayStyle = me.colorArrayStyle,
            colorArrayLength = colorArrayStyle && colorArrayStyle.length || 0,
            cos = Math.cos,
            sin = Math.sin,
            defaultStart = -180,
            reverse = me.reverse,
            rendererAttributes, centerX, centerY, slice, slices, sprite, value,
            item, ln, record, i, j, startAngle, endAngle, middleAngle, sliceLength, path,
            p, spriteOptions, bbox, splitAngle, sliceA, sliceB;
        
        Ext.apply(seriesStyle, me.style || {});

        me.setBBox();
        bbox = me.bbox;

        //override theme colors
        if (me.colorSet) {
            colorArrayStyle = me.colorSet;
            colorArrayLength = colorArrayStyle.length;
        }
        
        //if not store or store is empty then there's nothing to draw
        if (!store || !store.getCount() || me.seriesIsHidden) {
            me.hide();
            me.items = [];
            return;
        }
        
        centerX = me.centerX = chartBBox.x + (chartBBox.width / 2);
        centerY = me.centerY = chartBBox.y + chartBBox.height;
        me.radius = Math.min(centerX - chartBBox.x, centerY - chartBBox.y);
        me.slices = slices = [];
        me.items = items = [];
        
        if (!me.value) {
            record = store.getAt(0);
            me.value = record.get(field);
        }
        
        value = reverse ? maximum - me.value : me.value;
        if (me.needle) {
            sliceA = {
                series: me,
                value: value,
                startAngle: defaultStart,
                endAngle: 0,
                rho: me.radius
            };
            splitAngle = defaultStart * (1 - (value - minimum) / (maximum - minimum));
            slices.push(sliceA);
        } else {
            splitAngle = defaultStart * (1 - (value - minimum) / (maximum - minimum));
            sliceA = {
                series: me,
                value: value,
                startAngle: defaultStart,
                endAngle: splitAngle,
                rho: me.radius
            };
            sliceB = {
                series: me,
                value: maximum - value,
                startAngle: splitAngle,
                endAngle: 0,
                rho: me.radius
            };
            
            if (reverse) {
                slices.push(sliceB, sliceA);
            } else {
                slices.push(sliceA, sliceB);
            }
        }
        
        //do pie slices after.
        for (i = 0, ln = slices.length; i < ln; i++) {
            slice = slices[i];
            sprite = group.getAt(i);
            //set pie slice properties
            rendererAttributes = Ext.apply({
                segment: {
                    startAngle: slice.startAngle,
                    endAngle: slice.endAngle,
                    margin: 0,
                    rho: slice.rho,
                    startRho: slice.rho * +donut / 100,
                    endRho: slice.rho
                } 
            }, Ext.apply(seriesStyle, colorArrayStyle && { fill: colorArrayStyle[i % colorArrayLength] } || {}));

            item = Ext.apply({},
            rendererAttributes.segment, {
                slice: slice,
                series: me,
                storeItem: record,
                index: i
            });
            items[i] = item;
            // Create a new sprite if needed (no height)
            if (!sprite) {
                spriteOptions = Ext.apply({
                    type: "path",
                    group: group
                }, Ext.apply(seriesStyle, colorArrayStyle && { fill: colorArrayStyle[i % colorArrayLength] } || {}));
                sprite = surface.add(Ext.apply(spriteOptions, rendererAttributes));
            }
            slice.sprite = slice.sprite || [];
            item.sprite = sprite;
            slice.sprite.push(sprite);
            if (animate) {
                rendererAttributes = me.renderer(sprite, record, rendererAttributes, i, store);
                sprite._to = rendererAttributes;
                me.onAnimate(sprite, {
                    to: rendererAttributes
                });
            } else {
                rendererAttributes = me.renderer(sprite, record, Ext.apply(rendererAttributes, {
                    hidden: false
                }), i, store);
                sprite.setAttributes(rendererAttributes, true);
            }
        }
        
        if (me.needle) {
            splitAngle = splitAngle * Math.PI / 180;
            
            if (!me.needleSprite) {
                me.needleSprite = me.chart.surface.add({
                    type: 'path',
                    path: ['M', centerX + (me.radius * +donut / 100) * cos(splitAngle),
                                centerY + -Math.abs((me.radius * +donut / 100) * sin(splitAngle)),
                           'L', centerX + me.radius * cos(splitAngle),
                                centerY + -Math.abs(me.radius * sin(splitAngle))],
                    'stroke-width': 4,
                    'stroke': '#222'
                });
            } else {
                if (animate) {
                    me.onAnimate(me.needleSprite, {
                        to: {
                        path: ['M', centerX + (me.radius * +donut / 100) * cos(splitAngle),
                                    centerY + -Math.abs((me.radius * +donut / 100) * sin(splitAngle)),
                               'L', centerX + me.radius * cos(splitAngle),
                                    centerY + -Math.abs(me.radius * sin(splitAngle))]
                        }
                    });
                } else {
                    me.needleSprite.setAttributes({
                        type: 'path',
                        path: ['M', centerX + (me.radius * +donut / 100) * cos(splitAngle),
                                    centerY + -Math.abs((me.radius * +donut / 100) * sin(splitAngle)),
                               'L', centerX + me.radius * cos(splitAngle),
                                    centerY + -Math.abs(me.radius * sin(splitAngle))]
                    });
                }
            }
            me.needleSprite.setAttributes({
                hidden: false    
            }, true);
        }
        
        delete me.value;
    },
    
    /**
     * Sets the Gauge chart to the current specified value.
    */
    setValue: function (value) {
        this.value = value;
        this.drawSeries();
    },

    // @private callback for when creating a label sprite.
    onCreateLabel: function(storeItem, item, i, display) {},

    // @private callback for when placing a label sprite.
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {},

    // @private callback for when placing a callout.
    onPlaceCallout: function() {},

    // @private handles sprite animation for the series.
    onAnimate: function(sprite, attr) {
        sprite.show();
        return this.callParent(arguments);
    },

    isItemInPoint: function(x, y, item, i) {
        var me = this,
            cx = me.centerX,
            cy = me.centerY,
            abs = Math.abs,
            dx = abs(x - cx),
            dy = abs(y - cy),
            startAngle = item.startAngle,
            endAngle = item.endAngle,
            rho = Math.sqrt(dx * dx + dy * dy),
            angle = Math.atan2(y - cy, x - cx) / me.rad;

        //Only trigger events for the filled portion of the Gauge.
        return (i === 0) && (angle >= startAngle && angle < endAngle && 
                             rho >= item.startRho && rho <= item.endRho);
    },
    
    /**
     * Returns the color of the series (to be displayed as color for the series legend item).
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    getLegendColor: function(index) {
        var colors = this.colorSet || this.colorArrayStyle;
        return colors[index % colors.length];
    }
});


Ext.define('Ext.rtl.chart.series.Gauge', {
    override: 'Ext.chart.series.Gauge',
    
    initialize: function() {
        var me = this;
        
        me.callParent(arguments);
        if (me.chart.getInherited().rtl) {
            me.reverse = true;
        }
    }
});

/**
 * @class Ext.chart.series.Line
 * @extends Ext.chart.series.Cartesian
 *
 * Creates a Line Chart. A Line Chart is a useful visualization technique to display quantitative information for different
 * categories or other real values (as opposed to the bar chart), that can show some progression (or regression) in the dataset.
 * As with all other series, the Line Series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information. A typical configuration object for the line series could be:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *         data: [
 *             { 'name': 'metric one',   'data1': 10, 'data2': 12, 'data3': 14, 'data4': 8,  'data5': 13 },
 *             { 'name': 'metric two',   'data1': 7,  'data2': 8,  'data3': 16, 'data4': 10, 'data5': 3  },
 *             { 'name': 'metric three', 'data1': 5,  'data2': 2,  'data3': 14, 'data4': 12, 'data5': 7  },
 *             { 'name': 'metric four',  'data1': 2,  'data2': 14, 'data3': 6,  'data4': 1,  'data5': 23 },
 *             { 'name': 'metric five',  'data1': 4,  'data2': 4,  'data3': 36, 'data4': 13, 'data5': 33 }
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         store: store,
 *         axes: [
 *             {
 *                 type: 'Numeric',
 *                 position: 'left',
 *                 fields: ['data1', 'data2'],
 *                 label: {
 *                     renderer: Ext.util.Format.numberRenderer('0,0')
 *                 },
 *                 title: 'Sample Values',
 *                 grid: true,
 *                 minimum: 0
 *             },
 *             {
 *                 type: 'Category',
 *                 position: 'bottom',
 *                 fields: ['name'],
 *                 title: 'Sample Metrics'
 *             }
 *         ],
 *         series: [
 *             {
 *                 type: 'line',
 *                 highlight: {
 *                     size: 7,
 *                     radius: 7
 *                 },
 *                 axis: 'left',
 *                 xField: 'name',
 *                 yField: 'data1',
 *                 markerConfig: {
 *                     type: 'cross',
 *                     size: 4,
 *                     radius: 4,
 *                     'stroke-width': 0
 *                 }
 *             },
 *             {
 *                 type: 'line',
 *                 highlight: {
 *                     size: 7,
 *                     radius: 7
 *                 },
 *                 axis: 'left',
 *                 fill: true,
 *                 xField: 'name',
 *                 yField: 'data2',
 *                 markerConfig: {
 *                     type: 'circle',
 *                     size: 4,
 *                     radius: 4,
 *                     'stroke-width': 0
 *                 }
 *             }
 *         ]
 *     });
 *
 * In this configuration we're adding two series (or lines), one bound to the `data1`
 * property of the store and the other to `data3`. The type for both configurations is
 * `line`. The `xField` for both series is the same, the name propert of the store.
 * Both line series share the same axis, the left axis. You can set particular marker
 * configuration by adding properties onto the markerConfig object. Both series have
 * an object as highlight so that markers animate smoothly to the properties in highlight
 * when hovered. The second series has `fill=true` which means that the line will also
 * have an area below it of the same color.
 *
 * In some uses, a line will not be continuous and may have gaps. In order to accomplish this,
 * the data must return `false` and the series will not be continues for this data point.
 *
 *     @example
 *     Ext.create('Ext.chart.Chart', {
 *           renderTo: Ext.getBody(),
 *           height: 300,
 *           width: 500,
 *           axes: [{
 *               position: 'bottom',
 *               title: 'X',
 *               fields: ['x'],
 *               type: 'Numeric'
 *           }, {
 *               position: 'left',
 *               title: 'Y',
 *               fields: ['y'],
 *               type: 'Numeric'
 *           }],
 *           series: [{
 *               xField: 'x',
 *               yField: 'y',
 *               type: 'line'
 *           }],
 *           store: {
 *               fields: [
 *                   'x', 'y'
 *               ],
 *               data: [
 *                   { x: 0,   y: 0     },
 *                   { x: 25,  y: 25    },
 *                   { x: 50,  y: false },
 *                   { x: 75,  y: 75    },
 *                   { x: 100, y: 100   }
 *               ]
 *           }
 *       });
 *
 * The third data point has a `y` value of `false` which will make the line not be drawn for this
 * data point causing the line to be split into two different lines.
 *
 * **Note:** In the series definition remember to explicitly set the axis to bind the
 * values of the line series to. This can be done by using the `axis` configuration property.
 */
Ext.define('Ext.chart.series.Line', {

    /* Begin Definitions */

    extend: 'Ext.chart.series.Cartesian',

    alternateClassName: ['Ext.chart.LineSeries', 'Ext.chart.LineChart'],

    requires: ['Ext.chart.axis.Axis', 'Ext.chart.Shape', 'Ext.draw.Draw', 'Ext.fx.Anim'],

    /* End Definitions */

    type: 'line',

    alias: 'series.line',

    /**
     * @cfg {Number} selectionTolerance
     * The offset distance from the cursor position to the line series to trigger events (then used for highlighting series, etc).
     */
    selectionTolerance: 20,

    /**
     * @cfg {Boolean} showMarkers
     * Whether markers should be displayed at the data points along the line. If true,
     * then the {@link #markerConfig} config item will determine the markers' styling.
     */
    showMarkers: true,

    /**
     * @cfg {Object} markerConfig
     * The display style for the markers. Only used if {@link #showMarkers} is true.
     * The markerConfig is a configuration object containing the same set of properties defined in
     * the Sprite class. For example, if we were to set red circles as markers to the line series we could
     * pass the object:
     *
     <pre><code>
        markerConfig: {
            type: 'circle',
            radius: 4,
            'fill': '#f00'
        }
     </code></pre>

     */
    markerConfig: {},

    /**
     * @cfg {Object} style
     * An object containing style properties for the visualization lines and fill.
     * These styles will override the theme styles.  The following are valid style properties:
     *
     * - `stroke` - an rgb or hex color string for the background color of the line
     * - `stroke-width` - the width of the stroke (integer)
     * - `fill` - the background fill color string (hex or rgb), only works if {@link #fill} is `true`
     * - `opacity` - the opacity of the line and the fill color (decimal)
     *
     * Example usage:
     *
     *     style: {
     *         stroke: '#00ff00',
     *         'stroke-width': 10,
     *         fill: '#80A080',
     *         opacity: 0.2
     *     }
     */
    style: {},

    /**
     * @cfg {Boolean/Number} smooth
     * If set to `true` or a non-zero number, the line will be smoothed/rounded around its points; otherwise
     * straight line segments will be drawn.
     *
     * A numeric value is interpreted as a divisor of the horizontal distance between consecutive points in
     * the line; larger numbers result in sharper curves while smaller numbers result in smoother curves.
     *
     * If set to `true` then a default numeric value of 3 will be used. Defaults to `false`.
     */
    smooth: false,

    /**
     * @private Default numeric smoothing value to be used when {@link #smooth} = true.
     */
    defaultSmoothness: 3,

    /**
     * @cfg {Boolean} fill
     * If true, the area below the line will be filled in using the {@link #style eefill} and
     * {@link #style opacity} config properties. Defaults to false.
     */
    fill: false,

    constructor: function(config) {
        this.callParent(arguments);
        var me = this,
            surface = me.chart.surface,
            shadow = me.chart.shadow,
            i, l;
        config.highlightCfg = Ext.Object.merge({ 'stroke-width': 3 }, config.highlightCfg);
        Ext.apply(me, config, {
            shadowAttributes: [{
                "stroke-width": 6,
                "stroke-opacity": 0.05,
                stroke: 'rgb(0, 0, 0)',
                translate: {
                    x: 1,
                    y: 1
                }
            }, {
                "stroke-width": 4,
                "stroke-opacity": 0.1,
                stroke: 'rgb(0, 0, 0)',
                translate: {
                    x: 1,
                    y: 1
                }
            }, {
                "stroke-width": 2,
                "stroke-opacity": 0.15,
                stroke: 'rgb(0, 0, 0)',
                translate: {
                    x: 1,
                    y: 1
                }
            }]
        });
        me.group = surface.getGroup(me.seriesId);
        if (me.showMarkers) {
            me.markerGroup = surface.getGroup(me.seriesId + '-markers');
        }
        if (shadow) {
            for (i = 0, l = me.shadowAttributes.length; i < l; i++) {
                me.shadowGroups.push(surface.getGroup(me.seriesId + '-shadows' + i));
            }
        }
    },

    // @private makes an average of points when there are more data points than pixels to be rendered.
    shrink: function(xValues, yValues, size) {
        // Start at the 2nd point...
        var len = xValues.length,
            ratio = Math.floor(len / size),
            i = 1,
            xSum = 0,
            ySum = 0,
            xRes = [+xValues[0]],
            yRes = [+yValues[0]];

        for (; i < len; ++i) {
            xSum += +xValues[i] || 0;
            ySum += +yValues[i] || 0;
            if (i % ratio == 0) {
                xRes.push(xSum/ratio);
                yRes.push(ySum/ratio);
                xSum = 0;
                ySum = 0;
            }
        }
        return {
            x: xRes,
            y: yRes
        };
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.chart,
            chartAxes = chart.axes,
            store = chart.getChartStore(),
            data = store.data.items,
            record,
            storeCount = store.getCount(),
            surface = me.chart.surface,
            bbox = {},
            group = me.group,
            showMarkers = me.showMarkers,
            markerGroup = me.markerGroup,
            enableShadows = chart.shadow,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            smooth = me.smooth,
            lnsh = shadowGroups.length,
            dummyPath = ["M"],
            path = ["M"],
            renderPath = ["M"],
            smoothPath = ["M"],
            markerIndex = chart.markerIndex,
            axes = [].concat(me.axis),
            shadowBarAttr,
            xValues = [],
            yValues = [],
            onbreak = false,
            reverse = me.reverse,
            storeIndices = [],
            markerStyle = Ext.apply({}, me.markerStyle),
            seriesStyle = me.seriesStyle,
            colorArrayStyle = me.colorArrayStyle,
            colorArrayLength = colorArrayStyle && colorArrayStyle.length || 0,
            isNumber = Ext.isNumber,
            seriesIdx = me.seriesIdx, 
            boundAxes = me.getAxesForXAndYFields(),
            boundXAxis = boundAxes.xAxis,
            boundYAxis = boundAxes.yAxis,
            xAxis = chartAxes && chartAxes.get(boundXAxis),
            yAxis = chartAxes && chartAxes.get(boundYAxis),
            xAxisType = boundXAxis ? xAxis && xAxis.type : '',
            yAxisType = boundYAxis ? yAxis && yAxis.type : '',
            shadows, shadow, shindex, fromPath, fill, fillPath, rendererAttributes,
            x, y, prevX, prevY, firstX, firstY, markerCount, i, j, ln, axis, ends, marker, markerAux, item, xValue,
            yValue, coords, xScale, yScale, minX, maxX, minY, maxY, line, animation, endMarkerStyle,
            endLineStyle, type, count, opacity, lineOpacity, fillOpacity, fillDefaultValue;

        if (me.fireEvent('beforedraw', me) === false) {
            return;
        }

        //if store is empty or the series is excluded in the legend then there's nothing to draw.
        if (!storeCount || me.seriesIsHidden) {
            me.hide();
            me.items = [];
            if (me.line) {
                me.line.hide(true);
                if (me.line.shadows) {
                    shadows = me.line.shadows;
                    for (j = 0, lnsh = shadows.length; j < lnsh; j++) {
                        shadow = shadows[j];
                        shadow.hide(true);
                    }
                }
                if (me.fillPath) {
                    me.fillPath.hide(true);
                }
            }
            me.line = null;
            me.fillPath = null;
            return;
        }

        //prepare style objects for line and markers
        endMarkerStyle = Ext.apply(markerStyle || {}, me.markerConfig, {
            fill: me.seriesStyle.fill || colorArrayStyle[me.themeIdx % colorArrayStyle.length]
        });
        type = endMarkerStyle.type;
        delete endMarkerStyle.type;
        endLineStyle = seriesStyle;
        //if no stroke with is specified force it to 0.5 because this is
        //about making *lines*
        if (!endLineStyle['stroke-width']) {
            endLineStyle['stroke-width'] = 0.5;
        }
        
        //set opacity values
        opacity = 'opacity' in endLineStyle ? endLineStyle.opacity : 1;
        fillDefaultValue = 'opacity' in endLineStyle ? endLineStyle.opacity : 0.3;
        lineOpacity = 'lineOpacity' in endLineStyle ? endLineStyle.lineOpacity : opacity;
        fillOpacity = 'fillOpacity' in endLineStyle ? endLineStyle.fillOpacity : fillDefaultValue;

        //If we're using a time axis and we need to translate the points,
        //then reuse the first markers as the last markers.
        if (markerIndex && markerGroup && markerGroup.getCount()) {
            for (i = 0; i < markerIndex; i++) {
                marker = markerGroup.getAt(i);
                markerGroup.remove(marker);
                markerGroup.add(marker);
                markerAux = markerGroup.getAt(markerGroup.getCount() - 2);
                marker.setAttributes({
                    x: 0,
                    y: 0,
                    translate: {
                        x: markerAux.attr.translation.x,
                        y: markerAux.attr.translation.y
                    }
                }, true);
            }
        }

        me.unHighlightItem();
        me.cleanHighlights();

        me.setBBox();
        bbox = me.bbox;
        me.clipRect = [bbox.x, bbox.y, bbox.width, bbox.height];

        if (xAxis) {
            ends = xAxis.applyData();
            minX = ends.from;
            maxX = ends.to;
        }

        if (yAxis) {
            ends = yAxis.applyData();
            minY = ends.from;
            maxY = ends.to;
        }

        // If a field was specified without a corresponding axis, create one to get bounds
        if (me.xField && !Ext.isNumber(minX)) {
            axis = me.getMinMaxXValues();
            minX = axis[0];
            maxX = axis[1];
        }

        if (me.yField && !Ext.isNumber(minY)) {
            axis = me.getMinMaxYValues();
            minY = axis[0];
            maxY = axis[1];
        }
        
        if (isNaN(minX)) {
            minX = 0;
            xScale = bbox.width / ((storeCount - 1) || 1);
        }
        else {
            xScale = bbox.width / ((maxX - minX) || (storeCount -1) || 1);
        }

        if (isNaN(minY)) {
            minY = 0;
            yScale = bbox.height / ((storeCount - 1) || 1);
        }
        else {
            yScale = bbox.height / ((maxY - minY) || (storeCount - 1) || 1);
        }
        
        // Extract all x and y values from the store
        for (i = 0, ln = data.length; i < ln; i++) {
            record = data[i];
            xValue = record.get(me.xField);
            if (xAxisType === 'Time' && typeof xValue === "string") {
                xValue = Date.parse(xValue);
            }
            // Ensure a value
            if (typeof xValue === 'string' || typeof xValue === 'object' && !Ext.isDate(xValue)
                //set as uniform distribution if the axis is a category axis.
                || xAxisType === 'Category') {
                    xValue = i;
            }

            // Filter out values that don't fit within the pan/zoom buffer area
            yValue = record.get(me.yField);
            
            if (yAxisType === 'Time' && typeof yValue === "string") {
                yValue = Date.parse(yValue);
            }
            
            //skip undefined values
            if (typeof yValue === 'undefined' || (typeof yValue === 'string' && !yValue)) {
                if (Ext.isDefined(Ext.global.console)) {
                    Ext.global.console.warn("[Ext.chart.series.Line]  Skipping a store element with an undefined value at ", record, xValue, yValue);
                }
                continue;
            }
            
            // Ensure a value
            if (typeof yValue === 'string' || typeof yValue === 'object' && !Ext.isDate(yValue)
                //set as uniform distribution if the axis is a category axis.
                || yAxisType === 'Category') {
                yValue = i;
            }
            storeIndices.push(i);
            xValues.push(xValue);
            yValues.push(yValue);
        }

        ln = xValues.length;
        if (ln > bbox.width) {
            coords = me.shrink(xValues, yValues, bbox.width);
            xValues = coords.x;
            yValues = coords.y;
        }

        me.items = [];

        count = 0;
        ln = xValues.length;
        for (i = 0; i < ln; i++) {
            xValue = xValues[i];
            yValue = yValues[i];
            if (yValue === false) {
                if (path.length == 1) {
                    path = [];
                }
                onbreak = true;
                me.items.push(false);
                continue;
            } else {
                if (reverse) {
                    x = bbox.x + bbox.width - ((xValue - minX) * xScale);
                } else {
                    x = (bbox.x + (xValue - minX) * xScale);
                }
                x = Ext.Number.toFixed(x, 2);
                y = Ext.Number.toFixed((bbox.y + bbox.height) - (yValue - minY) * yScale, 2);
                if (onbreak) {
                    onbreak = false;
                    path.push('M');
                }
                path = path.concat([x, y]);
            }
            if ((typeof firstY == 'undefined') && (typeof y != 'undefined')) {
                firstY = y;
                firstX = x;
            }
            // If this is the first line, create a dummypath to animate in from.
            if (!me.line || chart.resizing) {
                dummyPath = dummyPath.concat([x, bbox.y + bbox.height / 2]);
            }

            // When resizing, reset before animating
            if (chart.animate && chart.resizing && me.line) {
                me.line.setAttributes({
                    path: dummyPath,
                    opacity: lineOpacity
                }, true);
                if (me.fillPath) {
                    me.fillPath.setAttributes({
                        path: dummyPath,
                        opacity: fillOpacity
                    }, true);
                }
                if (me.line.shadows) {
                    shadows = me.line.shadows;
                    for (j = 0, lnsh = shadows.length; j < lnsh; j++) {
                        shadow = shadows[j];
                        shadow.setAttributes({
                            path: dummyPath
                        }, true);
                    }
                }
            }
            if (showMarkers) {
                marker = markerGroup.getAt(count++);
                if (!marker) {
                    marker = Ext.chart.Shape[type](surface, Ext.apply({
                        group: [group, markerGroup],
                        x: 0, y: 0,
                        translate: {
                            x: +(prevX || x),
                            y: prevY || (bbox.y + bbox.height / 2)
                        },
                        value: '"' + xValue + ', ' + yValue + '"',
                        zIndex: 4000
                    }, endMarkerStyle));
                    marker._to = {
                        translate: {
                            x: +x,
                            y: +y
                        }
                    };
                } else {
                    marker.setAttributes({
                        value: '"' + xValue + ', ' + yValue + '"',
                        x: 0, y: 0,
                        hidden: false
                    }, true);
                    marker._to = {
                        translate: {
                            x: +x, 
                            y: +y
                        }
                    };
                }
            }
            
            me.items.push({
                series: me,
                value: [xValue, yValue],
                point: [x, y],
                sprite: marker,
                storeItem: store.getAt(storeIndices[i])
            });
            prevX = x;
            prevY = y;
        }

        if (path.length <= 1) {
            //nothing to be rendered
            return;
        }

        if (me.smooth) {
            smoothPath = Ext.draw.Draw.smooth(path, isNumber(smooth) ? smooth : me.defaultSmoothness);
        }

        renderPath = smooth ? smoothPath : path;

        //Correct path if we're animating timeAxis intervals
        if (chart.markerIndex && me.previousPath) {
            fromPath = me.previousPath;
            if (!smooth) {
                Ext.Array.erase(fromPath, 1, 2);
            }
        } else {
            fromPath = path;
        }

        // Only create a line if one doesn't exist.
        if (!me.line) {
            me.line = surface.add(Ext.apply({
                type: 'path',
                group: group,
                path: dummyPath,
                stroke: endLineStyle.stroke || endLineStyle.fill
            }, endLineStyle || {}));


            //set configuration opacity
            me.line.setAttributes({
                opacity: lineOpacity
            }, true);

            if (enableShadows) {
                me.line.setAttributes(Ext.apply({}, me.shadowOptions), true);
            }

            //unset fill here (there's always a default fill withing the themes).
            me.line.setAttributes({
                fill: 'none',
                zIndex: 3000
            });
            if (!endLineStyle.stroke && colorArrayLength) {
                me.line.setAttributes({
                    stroke: colorArrayStyle[me.themeIdx % colorArrayLength]
                }, true);
            }
            if (enableShadows) {
                //create shadows
                shadows = me.line.shadows = [];
                for (shindex = 0; shindex < lnsh; shindex++) {
                    shadowBarAttr = shadowAttributes[shindex];
                    shadowBarAttr = Ext.apply({}, shadowBarAttr, { path: dummyPath });
                    shadow = surface.add(Ext.apply({}, {
                        type: 'path',
                        group: shadowGroups[shindex]
                    }, shadowBarAttr));
                    shadows.push(shadow);
                }
            }
        }
        if (me.fill) {
            fillPath = renderPath.concat([
                ["L", x, bbox.y + bbox.height],
                ["L", firstX, bbox.y + bbox.height],
                ["L", firstX, firstY]
            ]);
            if (!me.fillPath) {
                me.fillPath = surface.add({
                    group: group,
                    type: 'path',
                    fill: endLineStyle.fill || colorArrayStyle[me.themeIdx % colorArrayLength],
                    path: dummyPath
                });
            }
        }
        markerCount = showMarkers && markerGroup.getCount();
        if (chart.animate) {
            fill = me.fill;
            line = me.line;
            //Add renderer to line. There is not unique record associated with this.
            rendererAttributes = me.renderer(line, false, { path: renderPath }, i, store);
            Ext.apply(rendererAttributes, endLineStyle || {}, {
                stroke: endLineStyle.stroke || endLineStyle.fill
            });
            //fill should not be used here but when drawing the special fill path object
            delete rendererAttributes.fill;
            line.show(true);
            if (chart.markerIndex && me.previousPath) {
                me.animation = animation = me.onAnimate(line, {
                    to: rendererAttributes,
                    from: {
                        path: fromPath
                    }
                });
            } else {
                me.animation = animation = me.onAnimate(line, {
                    to: rendererAttributes
                });
            }
            //animate shadows
            if (enableShadows) {
                shadows = line.shadows;
                for(j = 0; j < lnsh; j++) {
                    shadows[j].show(true);
                    if (chart.markerIndex && me.previousPath) {
                        me.onAnimate(shadows[j], {
                            to: { path: renderPath },
                            from: { path: fromPath }
                        });
                    } else {
                        me.onAnimate(shadows[j], {
                            to: { path: renderPath }
                        });
                    }
                }
            }
            //animate fill path
            if (fill) {
                me.fillPath.show(true);
                me.onAnimate(me.fillPath, {
                    to: Ext.apply({}, {
                        path: fillPath,
                        fill: endLineStyle.fill || colorArrayStyle[me.themeIdx % colorArrayLength],
                        'stroke-width': 0,
                        opacity: fillOpacity
                    }, endLineStyle || {})
                });
            }
            //animate markers
            if (showMarkers) {
                count = 0;
                for(i = 0; i < ln; i++) {
                    if (me.items[i]) {
                        item = markerGroup.getAt(count++);
                        if (item) {
                            rendererAttributes = me.renderer(item, store.getAt(i), item._to, i, store);
                            me.onAnimate(item, {
                                to: Ext.applyIf(rendererAttributes, endMarkerStyle || {})
                            });
                            item.show(true);
                        }
                    }
                }
                for(; count < markerCount; count++) {
                    item = markerGroup.getAt(count);
                    item.hide(true);
                }
//                for(i = 0; i < (chart.markerIndex || 0)-1; i++) {
//                    item = markerGroup.getAt(i);
//                    item.hide(true);
//                }
            }
        } else {
            rendererAttributes = me.renderer(me.line, false, { path: renderPath, hidden: false }, i, store);
            Ext.apply(rendererAttributes, endLineStyle || {}, {
                stroke: endLineStyle.stroke || endLineStyle.fill
            });
            //fill should not be used here but when drawing the special fill path object
            delete rendererAttributes.fill;
            me.line.setAttributes(rendererAttributes, true);
            me.line.setAttributes({
                opacity: lineOpacity
            }, true);
            //set path for shadows
            if (enableShadows) {
                shadows = me.line.shadows;
                for(j = 0; j < lnsh; j++) {
                    shadows[j].setAttributes({
                        path: renderPath,
                        hidden: false
                    }, true);
                }
            }
            if (me.fill) {
                me.fillPath.setAttributes({
                    path: fillPath,
                    hidden: false,
                    opacity: fillOpacity
                }, true);
            }
            if (showMarkers) {
                count = 0;
                for(i = 0; i < ln; i++) {
                    if (me.items[i]) {
                        item = markerGroup.getAt(count++);
                        if (item) {
                            rendererAttributes = me.renderer(item, store.getAt(i), item._to, i, store);
                            item.setAttributes(Ext.apply(endMarkerStyle || {}, rendererAttributes || {}), true);
                            if (!item.attr.hidden) {
                                item.show(true);
                            }
                        }
                    }
                }
                for(; count < markerCount; count++) {
                    item = markerGroup.getAt(count);
                    item.hide(true);
                }
            }
        }

        if (chart.markerIndex) {
            if (me.smooth) {
                Ext.Array.erase(path, 1, 2);
            } else {
                Ext.Array.splice(path, 1, 0, path[1], path[2]);
            }
            me.previousPath = path;
        }
        me.renderLabels();
        me.renderCallouts();

        me.fireEvent('draw', me);
    },

    // @private called when a label is to be created.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            bbox = me.bbox,
            endLabelStyle = Ext.apply({}, config, me.seriesLabelStyle || {});

        return me.chart.surface.add(Ext.apply({
            'type': 'text',
            'text-anchor': 'middle',
            'group': group,
            'x': Number(item.point[0]),
            'y': bbox.y + bbox.height / 2
        }, endLabelStyle || {}));
    },

    // @private called when a label is to be positioned.
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            bbox = me.bbox,
            x = Number(item.point[0]),
            y = Number(item.point[1]),
            radius = item.sprite.attr.radius,
            labelBox, markerBox, width, height, xOffset, yOffset;

        label.setAttributes({
            text: format(storeItem.get(field), label, storeItem, item, i, display, animate, index),
            hidden: true
        }, true);

        //TODO(nicolas): find out why width/height values in circle bounding boxes are undefined.
        markerBox = item.sprite.getBBox();
        markerBox.width = markerBox.width || (radius * 2);
        markerBox.height = markerBox.height || (radius * 2);

        labelBox = label.getBBox();
        width = labelBox.width/2;
        height = labelBox.height/2;

        if (display == 'rotate') {
            //correct label position to fit into the box
            xOffset = markerBox.width/2 + width + height/2;
            if (x + xOffset + width > bbox.x + bbox.width) {
                x -= xOffset;
            } else {
                x += xOffset;
            }
            label.setAttributes({
                'rotation': {
                    x: x,
                    y: y,
                    degrees: -45
                }
            }, true);
        } else if (display == 'under' || display == 'over') {
            label.setAttributes({
                'rotation': {
                    degrees: 0
                }
            }, true);

            //correct label position to fit into the box
            if (x < bbox.x + width) {
                x = bbox.x + width;
            } else if (x + width > bbox.x + bbox.width) {
                x = bbox.x + bbox.width - width;
            }

            yOffset = markerBox.height/2 + height;
            y = y + (display == 'over' ? -yOffset : yOffset);
            if (y < bbox.y + height) {
                y += 2 * yOffset;
            } else if (y + height > bbox.y + bbox.height) {
                y -= 2 * yOffset;
            }
        }

        if (me.chart.animate && !me.chart.resizing) {
            label.show(true);
            me.onAnimate(label, {
                to: {
                    x: x,
                    y: y
                }
            });
        } else {
            label.setAttributes({
                x: x,
                y: y
            }, true);
            if (resizing && me.animation) {
                me.animation.on('afteranimate', function() {
                    label.show(true);
                });
            } else {
                label.show(true);
            }
        }
    },

    // @private Overriding highlights.js highlightItem method.
    highlightItem: function() {
        var me = this,
            line = me.line;
                
        me.callParent(arguments);
        if (line && !me.highlighted) {
            if (!('__strokeWidth' in line)) {
                line.__strokeWidth = parseFloat(line.attr['stroke-width']) || 0;
            }
            if (line.__anim) {
                line.__anim.paused = true;
            }
            
            line.__anim = new Ext.fx.Anim({
                target: line,
                to: {
                    'stroke-width': line.__strokeWidth + 3
                }
            });
            me.highlighted = true;
        }
    },

    // @private Overriding highlights.js unHighlightItem method.
    unHighlightItem: function() {
        var me = this,
            line = me.line,
            width;
            
        me.callParent(arguments);
        if (line && me.highlighted) {
            width = line.__strokeWidth || parseFloat(line.attr['stroke-width']) || 0;
            line.__anim = new Ext.fx.Anim({
                target: line,
                to: {
                    'stroke-width': width
                }
            });
            me.highlighted = false;
        }
    },

    // @private called when a callout needs to be placed.
    onPlaceCallout : function(callout, storeItem, item, i, display, animate, index) {
        if (!display) {
            return;
        }

        var me = this,
            chart = me.chart,
            surface = chart.surface,
            resizing = chart.resizing,
            config = me.callouts,
            items = me.items,
            prev = i == 0? false : items[i -1].point,
            next = (i == items.length -1)? false : items[i +1].point,
            cur = [+item.point[0], +item.point[1]],
            dir, norm, normal, a, aprev, anext,
            offsetFromViz = config.offsetFromViz || 30,
            offsetToSide = config.offsetToSide || 10,
            offsetBox = config.offsetBox || 3,
            boxx, boxy, boxw, boxh,
            p, clipRect = me.clipRect,
            bbox = {
                width: config.styles.width || 10,
                height: config.styles.height || 10
            },
            x, y;

        //get the right two points
        if (!prev) {
            prev = cur;
        }
        if (!next) {
            next = cur;
        }
        a = (next[1] - prev[1]) / (next[0] - prev[0]);
        aprev = (cur[1] - prev[1]) / (cur[0] - prev[0]);
        anext = (next[1] - cur[1]) / (next[0] - cur[0]);

        norm = Math.sqrt(1 + a * a);
        dir = [1 / norm, a / norm];
        normal = [-dir[1], dir[0]];

        //keep the label always on the outer part of the "elbow"
        if (aprev > 0 && anext < 0 && normal[1] < 0
            || aprev < 0 && anext > 0 && normal[1] > 0) {
            normal[0] *= -1;
            normal[1] *= -1;
        } else if (Math.abs(aprev) < Math.abs(anext) && normal[0] < 0
                   || Math.abs(aprev) > Math.abs(anext) && normal[0] > 0) {
            normal[0] *= -1;
            normal[1] *= -1;
        }
        //position
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;

        //box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;

        //now check if we're out of bounds and invert the normal vector correspondingly
        //this may add new overlaps between labels (but labels won't be out of bounds).
        if (boxx < clipRect[0] || (boxx + boxw) > (clipRect[0] + clipRect[2])) {
            normal[0] *= -1;
        }
        if (boxy < clipRect[1] || (boxy + boxh) > (clipRect[1] + clipRect[3])) {
            normal[1] *= -1;
        }

        //update positions
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;

        //update box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;

        if (chart.animate) {
            //set the line from the middle of the pie to the box.
            me.onAnimate(callout.lines, {
                to: {
                    path: ["M", cur[0], cur[1], "L", x, y, "Z"]
                }
            });
            //set component position
            if (callout.panel) {
                callout.panel.setPosition(boxx, boxy, true);
            }
        }
        else {
            //set the line from the middle of the pie to the box.
            callout.lines.setAttributes({
                path: ["M", cur[0], cur[1], "L", x, y, "Z"]
            }, true);
            //set component position
            if (callout.panel) {
                callout.panel.setPosition(boxx, boxy);
            }
        }
        for (p in callout) {
            callout[p].show(true);
        }
    },

    isItemInPoint: function(x, y, item, i) {
        var me = this,
            items = me.items,
            ln = items.length,
            tolerance = me.selectionTolerance,
            prevItem,
            nextItem,
            prevPoint,
            nextPoint,
            x1, x2,
            y1, y2,
            dist1, dist2, dist,
            sqrt = Math.sqrt;

        nextItem = items[i];
        prevItem = i && items[i - 1];

        if (i >= ln) {
            prevItem = items[ln - 1];
        }
        prevPoint = prevItem && prevItem.point;
        nextPoint = nextItem && nextItem.point;
        x1 = prevItem ? prevPoint[0] : nextPoint[0] - tolerance;
        y1 = prevItem ? prevPoint[1] : nextPoint[1];
        x2 = nextItem ? nextPoint[0] : prevPoint[0] + tolerance;
        y2 = nextItem ? nextPoint[1] : prevPoint[1];
        dist1 = sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
        dist2 = sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2));
        dist = Math.min(dist1, dist2);

        if (dist <= tolerance) {
            return dist == dist1? prevItem : nextItem;
        }
        return false;
    },

    // @private toggle visibility of all series elements (markers, sprites).
    toggleAll: function(show) {
        var me = this,
            i, ln, shadow, shadows;
        if (!show) {
            Ext.chart.series.Cartesian.prototype.hideAll.call(me);
        }
        else {
            Ext.chart.series.Cartesian.prototype.showAll.call(me);
        }
        if (me.line) {
            me.line.setAttributes({
                hidden: !show
            }, true);
            //hide shadows too
            if (me.line.shadows) {
                for (i = 0, shadows = me.line.shadows, ln = shadows.length; i < ln; i++) {
                    shadow = shadows[i];
                    shadow.setAttributes({
                        hidden: !show
                    }, true);
                }
            }
        }
        if (me.fillPath) {
            me.fillPath.setAttributes({
                hidden: !show
            }, true);
        }
    },

    // @private hide all series elements (markers, sprites).
    hideAll: function() {
        this.toggleAll(false);
    },

    // @private hide all series elements (markers, sprites).
    showAll: function() {
        this.toggleAll(true);
    }
});

/**
 * @class Ext.chart.series.Pie
 *
 * Creates a Pie Chart. A Pie Chart is a useful visualization technique to display quantitative information for different
 * categories that also have a meaning as a whole.
 * As with all other series, the Pie Series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information. A typical configuration object for the pie series could be:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data'],
 *         data: [
 *             { 'name': 'metric one',   'data': 10 },
 *             { 'name': 'metric two',   'data':  7 },
 *             { 'name': 'metric three', 'data':  5 },
 *             { 'name': 'metric four',  'data':  2 },
 *             { 'name': 'metric five',  'data': 27 }
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 350,
 *         animate: true,
 *         store: store,
 *         theme: 'Base:gradients',
 *         series: [{
 *             type: 'pie',
 *             angleField: 'data',
 *             showInLegend: true,
 *             tips: {
 *                 trackMouse: true,
 *                 width: 140,
 *                 height: 28,
 *                 renderer: function(storeItem, item) {
 *                     // calculate and display percentage on hover
 *                     var total = 0;
 *                     store.each(function(rec) {
 *                         total += rec.get('data');
 *                     });
 *                     this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
 *                 }
 *             },
 *             highlight: {
 *                 segment: {
 *                     margin: 20
 *                 }
 *             },
 *             label: {
 *                 field: 'name',
 *                 display: 'rotate',
 *                 contrast: true,
 *                 font: '18px Arial',
 *                 hideLessThan: 18
 *             }
 *         }]
 *     });
 *
 * In this configuration we set `pie` as the type for the series, set an object with specific style properties for highlighting options
 * (triggered when hovering elements). We also set true to `showInLegend` so all the pie slices can be represented by a legend item.
 *
 * We set `data` as the value of the field to determine the angle span for each pie slice. We also set a label configuration object
 * where we set the field name of the store field to be renderer as text for the label. The labels will also be displayed rotated.
 *
 * We set `contrast` to `true` to flip the color of the label if it is to similar to the background color. Use `hideLessThan` to hide
 * labels for Pie slices with segment length less than value in pixels. Finally, we set the font family and size through the
 * `font` parameter.
 *
 */
Ext.define('Ext.chart.series.Pie', {

    /* Begin Definitions */

    alternateClassName: ['Ext.chart.PieSeries', 'Ext.chart.PieChart'],

    extend: 'Ext.chart.series.Series',

    /* End Definitions */

    type: "pie",

    alias: 'series.pie',

    accuracy: 100000,

    rad: Math.PI * 2 / 100000,

    /**
     * @cfg {Number} highlightDuration
     * The duration for the pie slice highlight effect.
     */
    highlightDuration: 150,

    /**
     * @cfg {String} angleField (required)
     * The store record field name to be used for the pie angles.
     * The values bound to this field name must be positive real numbers.
     */
    angleField: false,

    /**
     * @cfg {String} field
     * Alias for {@link #angleField}.
     */

    /**
     * @cfg {String} xField
     * Alias for {@link #angleField}.
     */

    /**
     * @cfg {String} lengthField
     * The store record field name to be used for the pie slice lengths.
     * The values bound to this field name must be positive real numbers.
     */
    lengthField: false,

    /**
     * @cfg {Boolean/Number} donut
     * Whether to set the pie chart as donut chart.
     * Default's false. Can be set to a particular percentage to set the radius
     * of the donut chart.
     */
    donut: false,

    /**
     * @cfg {Boolean} showInLegend
     * Whether to add the pie chart elements as legend items. Default's false.
     */
    showInLegend: false,

    /**
     * @cfg {Array} colorSet
     * An array of color values which will be used, in order, as the pie slice fill colors.
     */

    /**
     * @cfg {Object} style
     * An object containing styles for overriding series styles from Theming.
     */
    style: {},

    /**
     * @cfg {Boolean} clockwise
     * Whether the pie slices are displayed clockwise. Default's false.
     */
    clockwise: false,

    /**
     * @cfg {Number|Object} rotation
     * If a Number, the angle in radians of the first pie slice. 
     * 0 means 3 o'clock. (-Math.PI / 2) means noon. (+Math.PI / 2) means 6 o'clock.
     * undefined means centered around 3 o'clock. Default's undefined.
     * If an Object, the angle can be specified in degrees or radians as in
     * `rotation: {degrees: -90}` or `rotation: {radians: -Math.PI / 2}`.
     */
    rotation: undefined,


    constructor: function(config) {
        this.callParent(arguments);
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            store = chart.store,
            shadow = chart.shadow,
            highlight = config.highlight,
            i, l, cfg;

        if (highlight) {
            config.highlightCfg = Ext.merge({
                segment: {
                    margin: 20
                }
            }, highlight, config.highlightCfg);
        }

        Ext.apply(me, config, {
            shadowAttributes: [{
                "stroke-width": 6,
                "stroke-opacity": 1,
                stroke: 'rgb(200, 200, 200)',
                translate: {
                    x: 1.2,
                    y: 2
                }
            },
            {
                "stroke-width": 4,
                "stroke-opacity": 1,
                stroke: 'rgb(150, 150, 150)',
                translate: {
                    x: 0.9,
                    y: 1.5
                }
            },
            {
                "stroke-width": 2,
                "stroke-opacity": 1,
                stroke: 'rgb(100, 100, 100)',
                translate: {
                    x: 0.6,
                    y: 1
                }
            }]
        });
        me.group = surface.getGroup(me.seriesId);
        if (shadow) {
            for (i = 0, l = me.shadowAttributes.length; i < l; i++) {
                me.shadowGroups.push(surface.getGroup(me.seriesId + '-shadows' + i));
            }
        }
        surface.customAttributes.segment = function(opt) {
            //Browsers will complain if we create a path
            //element that has no path commands. So ensure a dummy 
            //path command for an empty path.
            var ans = me.getSegment(opt);
            if (!ans.path || ans.path.length === 0) {
                ans.path = ['M', 0, 0];
            }
            return ans;
        };
        me.__excludes = me.__excludes || [];
    },
    
    onRedraw: function(){
        this.initialize();
    },

    // @private updates some onbefore render parameters.
    initialize: function() {
        var me = this,
            store = me.chart.getChartStore(),
            data = store.data.items,
            i, ln, rec;
            
        me.callParent();
        //Add yFields to be used in Legend.js
        me.yField = [];
        if (me.label.field) {
            for (i = 0, ln = data.length; i < ln; i++) {
                rec = data[i];
                me.yField.push(rec.get(me.label.field));
            }
        }
    },

    // @private returns an object with properties for a PieSlice.
    getSegment: function(opt) {
        var me = this,
            rad = me.rad,
            cos = Math.cos,
            sin = Math.sin,
            x = me.centerX,
            y = me.centerY,
            x1 = 0, x2 = 0, x3 = 0, x4 = 0,
            y1 = 0, y2 = 0, y3 = 0, y4 = 0,
            x5 = 0, y5 = 0, x6 = 0, y6 = 0,
            delta = 1e-2,
            startAngle = opt.startAngle,
            endAngle = opt.endAngle,
            midAngle = (startAngle + endAngle) / 2 * rad,
            margin = opt.margin || 0,
            a1 = Math.min(startAngle, endAngle) * rad,
            a2 = Math.max(startAngle, endAngle) * rad,
            c1 = cos(a1), s1 = sin(a1),
            c2 = cos(a2), s2 = sin(a2),
            cm = cos(midAngle), sm = sin(midAngle),
            flag = 0, hsqr2 = 0.7071067811865476; // sqrt(0.5)

        if (a2 - a1 < delta) {
            return {path: ""};
        }

        if (margin !== 0) {
            x += margin * cm;
            y += margin * sm;
        }

        x2 = x + opt.endRho * c1;
        y2 = y + opt.endRho * s1;

        x4 = x + opt.endRho * c2;
        y4 = y + opt.endRho * s2;

        x6 = x + opt.endRho * cm;
        y6 = y + opt.endRho * sm;

        if (opt.startRho !== 0) {
            x1 = x + opt.startRho * c1;
            y1 = y + opt.startRho * s1;
    
            x3 = x + opt.startRho * c2;
            y3 = y + opt.startRho * s2;
    
            x5 = x + opt.startRho * cm;
            y5 = y + opt.startRho * sm;

            return {
                path: [
                    ["M", x2, y2],
                    ["A", opt.endRho, opt.endRho, 0, 0, 1, x6, y6], ["L", x6, y6],
                    ["A", opt.endRho, opt.endRho, 0, flag, 1, x4, y4], ["L", x4, y4],
                    ["L", x3, y3],
                    ["A", opt.startRho, opt.startRho, 0, flag, 0, x5, y5], ["L", x5, y5],
                    ["A", opt.startRho, opt.startRho, 0, 0, 0, x1, y1], ["L", x1, y1],
                    ["Z"]
                ]
            };
        } else {
            return {
                path: [
                    ["M", x, y],
                    ["L", x2, y2],
                    ["A", opt.endRho, opt.endRho, 0, 0, 1, x6, y6], ["L", x6, y6],
                    ["A", opt.endRho, opt.endRho, 0, flag, 1, x4, y4], ["L", x4, y4],
                    ["L", x, y],
                    ["Z"]
                ]
            };
        }
    },

    // @private utility function to calculate the middle point of a pie slice.
    calcMiddle: function(item) {
        var me = this,
            rad = me.rad,
            slice = item.slice,
            x = me.centerX,
            y = me.centerY,
            startAngle = slice.startAngle,
            endAngle = slice.endAngle,
            donut = +me.donut,
            midAngle = -(startAngle + endAngle) * rad / 2,
            r = (item.endRho + item.startRho) / 2,
            xm = x + r * Math.cos(midAngle),
            ym = y - r * Math.sin(midAngle);

        item.middle = {
            x: xm,
            y: ym
        };
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            store = me.chart.getChartStore(),
            data = store.data.items,
            record,
            group = me.group,
            animate = me.chart.animate,
            field = me.angleField || me.field || me.xField,
            lenField = [].concat(me.lengthField),
            totalLenField = 0,
            chart = me.chart,
            surface = chart.surface,
            chartBBox = chart.chartBBox,
            enableShadows = chart.shadow,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            lnsh = shadowGroups.length,
            layers = lenField.length,
            rhoAcum = 0,
            donut = +me.donut,
            layerTotals = [],
            items = [],
            totalField = 0,
            maxLenField = 0,
            angle = 0,
            rotation = me.rotation,
            seriesStyle = me.seriesStyle,
            colorArrayStyle = me.colorArrayStyle,
            colorArrayLength = colorArrayStyle && colorArrayStyle.length || 0,
            rendererAttributes,
            shadowAttr,
            shadows,
            shadow,
            shindex,
            centerX,
            centerY,
            deltaRho,
            first = 0,
            slice,
            slices,
            sprite,
            value,
            item,
            lenValue,
            ln,
            i,
            j,
            endAngle,
            path,
            p,
            spriteOptions, bbox;

        Ext.apply(seriesStyle, me.style || {});

        me.setBBox();
        bbox = me.bbox;

        //override theme colors
        if (me.colorSet) {
            colorArrayStyle = me.colorSet;
            colorArrayLength = colorArrayStyle.length;
        }

        //if not store or store is empty then there's nothing to draw
        if (!store || !store.getCount() || me.seriesIsHidden) {
            me.hide();
            me.items = [];
            return;
        }

        me.unHighlightItem();
        me.cleanHighlights();

        centerX = me.centerX = chartBBox.x + (chartBBox.width / 2);
        centerY = me.centerY = chartBBox.y + (chartBBox.height / 2);
        me.radius = Math.min(centerX - chartBBox.x, centerY - chartBBox.y);
        me.slices = slices = [];
        me.items = items = [];

        for (i = 0, ln = data.length; i < ln; i++) {
            record = data[i];
            if (this.__excludes && this.__excludes[i]) {
                //hidden series
                continue;
            }
            totalField += +record.get(field);
            if (lenField[0]) {
                for (j = 0, totalLenField = 0; j < layers; j++) {
                    totalLenField += +record.get(lenField[j]);
                }
                layerTotals[i] = totalLenField;
                maxLenField = Math.max(maxLenField, totalLenField);
            }
        }

        totalField = totalField || 1;
        for (i = 0, ln = data.length; i < ln; i++) {
            record = data[i];
            if (this.__excludes && this.__excludes[i]) {
                value = 0;
            } else {
                value = record.get(field);
                if (first === 0) {
                    first = 1;
                }
            }

            // First slice
            if (first == 1) {
                first = 2;

                if (Ext.isEmpty(rotation)) {
                    me.firstAngle = angle = (me.clockwise ? -1 : 1) * (me.accuracy * value / totalField / 2);
                } else {
                    if (!Ext.isEmpty(rotation.degrees)) {
                        rotation = Ext.draw.Draw.rad(rotation.degrees);
                    } else if (!Ext.isEmpty(rotation.radians)) {
                        rotation = rotation.radians;
                    }
                    me.firstAngle = angle = me.accuracy * rotation / (2 * Math.PI);
                }

                for (j = 0; j < i; j++) {
                    slices[j].startAngle = slices[j].endAngle = me.firstAngle;
                }
            }

            endAngle = angle + (me.clockwise ? 1 : -1) * (me.accuracy * value / totalField);
            slice = {
                series: me,
                value: value,
                startAngle: (me.clockwise ? endAngle : angle),
                endAngle: (me.clockwise ? angle : endAngle),
                storeItem: record
            };
            if (lenField[0] && !(this.__excludes && this.__excludes[i])) {
                lenValue = +layerTotals[i];
                //removing the floor will break Opera 11.6*
                slice.rho = Math.floor(me.radius / maxLenField * lenValue);
            } else {
                slice.rho = me.radius;
            }
            slices[i] = slice;
            // Do not remove this closure for the sake of https://sencha.jira.com/browse/EXTJSIV-5836
            (function () {
                angle = endAngle;
            })();
        }

        //do all shadows first.
        if (enableShadows) {
            for (i = 0, ln = slices.length; i < ln; i++) {
                slice = slices[i];
                slice.shadowAttrs = [];
                record = store.getAt(i);
                
                for (j = 0, rhoAcum = 0, shadows = []; j < layers; j++) {
                    sprite = group.getAt(i * layers + j);
                    
                    if (lenField[j] && !(this.__excludes && this.__excludes[i])) {
                        deltaRho = record.get(lenField[j]) / layerTotals[i] * slice.rho;
                    }
                    else {
                        deltaRho = slice.rho;
                    }
                    
                    //set pie slice properties
                    rendererAttributes = {
                        segment: {
                            startAngle: slice.startAngle,
                            endAngle: slice.endAngle,
                            margin: 0,
                            rho: slice.rho,
                            startRho: rhoAcum + (deltaRho * donut / 100),
                            endRho: rhoAcum + deltaRho
                        },
                        hidden: !slice.value && (slice.startAngle % me.accuracy) == (slice.endAngle % me.accuracy)
                    };
                    //create shadows
                    for (shindex = 0, shadows = []; shindex < lnsh; shindex++) {
                        shadowAttr = shadowAttributes[shindex];
                        shadow = shadowGroups[shindex].getAt(i);
                        if (!shadow) {
                            shadow = chart.surface.add(Ext.apply({}, {
                                type: 'path',
                                group: shadowGroups[shindex],
                                strokeLinejoin: "round"
                            }, rendererAttributes, shadowAttr));
                        }
                        shadowAttr = me.renderer(shadow, record, Ext.apply({}, rendererAttributes, shadowAttr), i, store);
                        if (animate) {
                            me.onAnimate(shadow, {
                                to: shadowAttr
                            });
                        } else {
                            shadow.setAttributes(shadowAttr, true);
                        }
                        shadows.push(shadow);
                    }
                    slice.shadowAttrs[j] = shadows;
                }
            }
        }
        //do pie slices after.
        for (i = 0, ln = slices.length; i < ln; i++) {
            slice = slices[i];
            record = store.getAt(i);
            
            for (j = 0, rhoAcum = 0; j < layers; j++) {
                sprite = group.getAt(i * layers + j);
                
                if (lenField[j] && !(this.__excludes && this.__excludes[i])) {
                    deltaRho = record.get(lenField[j]) / layerTotals[i] * slice.rho;
                }
                else {
                    deltaRho = slice.rho;
                }
                
                //set pie slice properties
                rendererAttributes = Ext.apply({
                    segment: {
                        startAngle: slice.startAngle,
                        endAngle: slice.endAngle,
                        margin: 0,
                        rho: slice.rho,
                        startRho: rhoAcum + (deltaRho * donut / 100),
                        endRho: rhoAcum + deltaRho
                    },
                    hidden: (!slice.value && (slice.startAngle % me.accuracy) == (slice.endAngle % me.accuracy))
                }, Ext.apply(seriesStyle, colorArrayStyle && { fill: colorArrayStyle[(layers > 1? j : i) % colorArrayLength] } || {}));
                item = Ext.apply({},
                rendererAttributes.segment, {
                    slice: slice,
                    series: me,
                    storeItem: slice.storeItem,
                    index: i
                });
                me.calcMiddle(item);
                if (enableShadows) {
                    item.shadows = slice.shadowAttrs[j];
                }
                items[i] = item;
                // Create a new sprite if needed (no height)
                if (!sprite) {
                    spriteOptions = Ext.apply({
                        type: "path",
                        group: group,
                        middle: item.middle
                    }, Ext.apply(seriesStyle, colorArrayStyle && { fill: colorArrayStyle[(layers > 1? j : i) % colorArrayLength] } || {}));
                    sprite = surface.add(Ext.apply(spriteOptions, rendererAttributes));
                }
                slice.sprite = slice.sprite || [];
                item.sprite = sprite;
                slice.sprite.push(sprite);
                slice.point = [item.middle.x, item.middle.y];
                if (animate) {
                    rendererAttributes = me.renderer(sprite, record, rendererAttributes, i, store);
                    sprite._to = rendererAttributes;
                    sprite._animating = true;
                    me.onAnimate(sprite, {
                        to: rendererAttributes,
                        listeners: {
                            afteranimate: {
                                fn: function() {
                                    this._animating = false;
                                },
                                scope: sprite
                            }
                        }
                    });
                } else {
                    rendererAttributes = me.renderer(sprite, record, Ext.apply(rendererAttributes, {
                        hidden: false
                    }), i, store);
                    sprite.setAttributes(rendererAttributes, true);
                }
                rhoAcum += deltaRho;
            }
        }

        // Hide unused bars
        ln = group.getCount();
        for (i = 0; i < ln; i++) {
            if (!slices[(i / layers) >> 0] && group.getAt(i)) {
                group.getAt(i).hide(true);
            }
        }
        if (enableShadows) {
            lnsh = shadowGroups.length;
            for (shindex = 0; shindex < ln; shindex++) {
                if (!slices[(shindex / layers) >> 0]) {
                    for (j = 0; j < lnsh; j++) {
                        if (shadowGroups[j].getAt(shindex)) {
                            shadowGroups[j].getAt(shindex).hide(true);
                        }
                    }
                }
            }
        }
        me.renderLabels();
        me.renderCallouts();
    },

    setSpriteAttributes: function(sprite, attrs, animate) {
        var me = this;
        if (animate) {
            sprite.stopAnimation();
            sprite.animate({
                to: attrs,
                duration: me.highlightDuration
            });
        }
        else {
            sprite.setAttributes(attrs, true);
        }
    },

    createLabelLine: function(i, hidden) {
        var me = this,
            calloutLine = me.label.calloutLine,
            line = me.chart.surface.add({
                type: 'path',
                stroke: (i === undefined ? '#555' : ((calloutLine && calloutLine.color) || me.getLegendColor(i))),
                lineWidth: (calloutLine && calloutLine.width) || 2,
                path: 'M0,0Z',
                hidden: hidden
            });
        return line;
    },

    drawLabelLine: function(label, from, to, animate) {
        var me = this,
            line = label.lineSprite,
            path = 'M' + from.x + ' ' + from.y + 'L' + to.x + ' ' + to.y + 'Z';

        me.setSpriteAttributes(line, { 
            'path': path 
        }, animate);
    },

    // @private callback for when creating a label sprite.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            centerX = me.centerX,
            centerY = me.centerY,
            middle = item.middle,
            endLabelStyle = Ext.apply(me.seriesLabelStyle || {}, config || {});

        return me.chart.surface.add(Ext.apply({
            'type': 'text',
            'text-anchor': 'middle',
            'group': group,
            'x': middle.x,
            'y': middle.y
        }, endLabelStyle));
    },

    // @private callback for when placing a label sprite.
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {
        var me = this,
            rad = me.rad,
            chart = me.chart,
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            centerX = me.centerX,
            centerY = me.centerY,
            startAngle = item.startAngle,
            endAngle = item.endAngle,
            middle = item.middle,
            opt = {
                x: middle.x,
                y: middle.y
            },
            x = middle.x - centerX,
            y = middle.y - centerY,
            from = {},
            rho = 1,
            theta = Math.atan2(y, x || 1),
            dg = Ext.draw.Draw.degrees(theta),
            prevDg, labelBox, width, height,
            isOutside = (display === 'outside'),
            calloutLine = label.attr.calloutLine,
            lineWidth = (calloutLine && calloutLine.width) || 2,
            labelPadding = (label.attr.padding || 20) + (isOutside ? lineWidth/2 + 4 : 0),
            labelPaddingX = 0, labelPaddingY = 0,
            a1, a2, seg;

        opt.hidden = false;

        if (this.__excludes && this.__excludes[i]) {
            opt.hidden = true;
        }
        
        if (config.hideLessThan) {
            a1 = Math.min(startAngle, endAngle) * rad;
            a2 = Math.max(startAngle, endAngle) * rad;
            seg = (a2 - a1) * item.rho;
            
            if (seg < config.hideLessThan) {
                opt.hidden = label.showOnHighlight = true;
            }
        }

        label.setAttributes({
            opacity: (opt.hidden ? 0 : 1),
            text: format(storeItem.get(field), label, storeItem, item, i, display, animate, index)
        }, true);

        if (label.lineSprite) {
            var attrs = { opacity: (opt.hidden ? 0 : 1) };
            if (opt.hidden) {
                attrs.translate = {x:0, y:0};
            }
            me.setSpriteAttributes(label.lineSprite, attrs, false);
        }

        switch (display) {
        case 'outside':
            label.isOutside = true;

            // calculate the distance to the pie's edge
            rho = item.endRho;

            // calculate the padding around the label
            labelPaddingX = (Math.abs(dg) <= 90 ? labelPadding : -labelPadding);
            labelPaddingY = (dg >= 0 ? labelPadding : -labelPadding);

            // add the distance from the label's center to its edge, plus padding
            label.setAttributes({rotation:{degrees: 0}}, true);
            labelBox = label.getBBox();
            width = labelBox.width/2 * Math.cos(theta);
            height = labelBox.height/2 * Math.sin(theta);
            width += labelPaddingX;
            height += labelPaddingY;

            rho += Math.sqrt(width*width + height*height);

            //update positions
            opt.x = rho * Math.cos(theta) + centerX;
            opt.y = rho * Math.sin(theta) + centerY;
            break;

        case 'rotate':
            dg = Ext.draw.Draw.normalizeDegrees(dg);
            dg = (dg > 90 && dg < 270) ? dg + 180: dg;

            prevDg = label.attr.rotation.degrees;
            if (prevDg != null && Math.abs(prevDg - dg) > 180 * 0.5) {
                if (dg > prevDg) {
                    dg -= 360;
                } else {
                    dg += 360;
                }
                dg = dg % 360;
            } else {
                dg = Ext.draw.Draw.normalizeDegrees(dg);
            }
            //update rotation angle
            opt.rotate = {
                degrees: dg,
                x: opt.x,
                y: opt.y
            };
            break;

        default:
            break;
        }

        //ensure the object has zero translation
        opt.translate = {
            x: 0, y: 0
        };
        if (animate && !resizing && (display != 'rotate' || prevDg != null)) {
            me.onAnimate(label, {
                to: opt
            });
        } else {
            label.setAttributes(opt, true);
        }
        label._from = from;

        // draw a line if the label is outside
        if (label.isOutside && calloutLine) {
            var line = label.lineSprite,
                animateLine = animate,
                fromPoint = {
                    // edge of the pie
                    x: (item.endRho - lineWidth/2) * Math.cos(theta) + centerX,
                    y: (item.endRho - lineWidth/2) * Math.sin(theta) + centerY
                },
                labelCenter = {
                    // center of the label box
                    x: opt.x,
                    y: opt.y
                },
                toPoint = {};

            function sign(x) {
                return x ? x < 0 ? -1 : 1 : 0;
            }

            if (calloutLine && calloutLine.length) {
                toPoint = {
                    x: (item.endRho + calloutLine.length) * Math.cos(theta) + centerX,
                    y: (item.endRho + calloutLine.length) * Math.sin(theta) + centerY
                }
            } else {
                // Calculate the line length
                //
                // Our theta, from the rightmost point, runs:
                //   0 to -PI counter-clockwise on the upper half of the pie,
                //   0 to PI clockwise on the lower half of the pie.
                // By normalizing it, it runs 0 to 2*PI counter-clockwise.
                var normalTheta = Ext.draw.Draw.normalizeRadians(-theta),
                    cos = Math.cos(normalTheta),
                    sin = Math.sin(normalTheta),
                    labelWidth = (labelBox.width + lineWidth + 4)/2,
                    labelHeight = (labelBox.height + lineWidth + 4)/2;

                if (Math.abs(cos) * labelHeight > Math.abs(sin) * labelWidth) {
                    // the line connects to the right or left sides of the label
                    toPoint.x = labelCenter.x - labelWidth * sign(cos);
                    toPoint.y = labelCenter.y + labelWidth * sin/cos * sign(cos);
                } else {
                    // the line connects to the top or bottom sides of the label
                    toPoint.x = labelCenter.x - labelHeight * cos/sin * sign(sin);
                    toPoint.y = labelCenter.y + labelHeight * sign(sin);
                }
            }

            if (!line) {
                line = label.lineSprite = me.createLabelLine(i, opt.hidden);
                animateLine = false;
            }
            me.drawLabelLine(label, fromPoint, toPoint, animateLine);
        } else {
            delete label.lineSprite;
        }
    },

    // @private callback for when placing a callout sprite.
    onPlaceCallout: function(callout, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            centerX = me.centerX,
            centerY = me.centerY,
            middle = item.middle,
            opt = {
                x: middle.x,
                y: middle.y
            },
            x = middle.x - centerX,
            y = middle.y - centerY,
            rho = 1,
            rhoCenter,
            theta = Math.atan2(y, x || 1),
            bbox = (callout && callout.label ? callout.label.getBBox() : {width:0,height:0}),
            offsetFromViz = 20,
            offsetToSide = 10,
            offsetBox = 10,
            p;

        if (!bbox.width || !bbox.height) {
            return;
        }

        //should be able to config this.
        rho = item.endRho + offsetFromViz;
        rhoCenter = (item.endRho + item.startRho) / 2 + (item.endRho - item.startRho) / 3;
        //update positions
        opt.x = rho * Math.cos(theta) + centerX;
        opt.y = rho * Math.sin(theta) + centerY;

        x = rhoCenter * Math.cos(theta);
        y = rhoCenter * Math.sin(theta);

        if (chart.animate) {
            //set the line from the middle of the pie to the box.
            me.onAnimate(callout.lines, {
                to: {
                    path: ["M", x + centerX, y + centerY, "L", opt.x, opt.y, "Z", "M", opt.x, opt.y, "l", x > 0 ? offsetToSide: -offsetToSide, 0, "z"]
                }
            });
            //set box position
            me.onAnimate(callout.box, {
                to: {
                    x: opt.x + (x > 0 ? offsetToSide: -(offsetToSide + bbox.width + 2 * offsetBox)),
                    y: opt.y + (y > 0 ? ( - bbox.height - offsetBox / 2) : ( - bbox.height - offsetBox / 2)),
                    width: bbox.width + 2 * offsetBox,
                    height: bbox.height + 2 * offsetBox
                }
            });
            //set text position
            me.onAnimate(callout.label, {
                to: {
                    x: opt.x + (x > 0 ? (offsetToSide + offsetBox) : -(offsetToSide + bbox.width + offsetBox)),
                    y: opt.y + (y > 0 ? -bbox.height / 4: -bbox.height / 4)
                }
            });
        } else {
            //set the line from the middle of the pie to the box.
            callout.lines.setAttributes({
                path: ["M", x + centerX, y + centerY, "L", opt.x, opt.y, "Z", "M", opt.x, opt.y, "l", x > 0 ? offsetToSide: -offsetToSide, 0, "z"]
            },
            true);
            //set box position
            callout.box.setAttributes({
                x: opt.x + (x > 0 ? offsetToSide: -(offsetToSide + bbox.width + 2 * offsetBox)),
                y: opt.y + (y > 0 ? ( - bbox.height - offsetBox / 2) : ( - bbox.height - offsetBox / 2)),
                width: bbox.width + 2 * offsetBox,
                height: bbox.height + 2 * offsetBox
            },
            true);
            //set text position
            callout.label.setAttributes({
                x: opt.x + (x > 0 ? (offsetToSide + offsetBox) : -(offsetToSide + bbox.width + offsetBox)),
                y: opt.y + (y > 0 ? -bbox.height / 4: -bbox.height / 4)
            },
            true);
        }
        for (p in callout) {
            callout[p].show(true);
        }
    },

    // @private handles sprite animation for the series.
    onAnimate: function(sprite, attr) {
        sprite.show();
        return this.callParent(arguments);
    },

    isItemInPoint: function(x, y, item, i) {
        var me = this,
            cx = me.centerX,
            cy = me.centerY,
            abs = Math.abs,
            dx = abs(x - cx),
            dy = abs(y - cy),
            startAngle = item.startAngle,
            endAngle = item.endAngle,
            rho = Math.sqrt(dx * dx + dy * dy),
            angle = Math.atan2(y - cy, x - cx) / me.rad;

        // normalize to the same range of angles created by drawSeries
        if (me.clockwise) {
            if (angle < me.firstAngle) {
                angle += me.accuracy;
            }
        } else {
            if (angle > me.firstAngle) {
                angle -= me.accuracy;
            }
        }
        return (angle <= startAngle && angle > endAngle
                && rho >= item.startRho && rho <= item.endRho);
    },

    // @private hides all elements in the series.
    hideAll: function(index) {
        var i, l, shadow, shadows, sh, lsh, sprite;
        index = (isNaN(this._index) ? index : this._index) || 0;
        this.__excludes = this.__excludes || [];
        this.__excludes[index] = true;
        sprite = this.slices[index].sprite;
        for (sh = 0, lsh = sprite.length; sh < lsh; sh++) {
            sprite[sh].setAttributes({
                hidden: true
            }, true);
            var line = sprite[sh].lineSprite;
            if (line) {
                line.setAttributes({
                    hidden: true
                }, true);
            }
        }
        if (this.slices[index].shadowAttrs) {
            for (i = 0, shadows = this.slices[index].shadowAttrs, l = shadows.length; i < l; i++) {
                shadow = shadows[i];
                for (sh = 0, lsh = shadow.length; sh < lsh; sh++) {
                    shadow[sh].setAttributes({
                        hidden: true
                    }, true);
                }
            }
        }
        this.drawSeries();
    },

    // @private shows all elements in the series.
    showAll: function(index) {
        index = (isNaN(this._index) ? index : this._index) || 0;
        this.__excludes[index] = false;
        this.drawSeries();
    },

    /**
     * Highlight the specified item. If no item is provided the whole series will be highlighted.
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    highlightItem: function(item) {
        var me = this,
            rad = me.rad,
            highlightSegment,
            animate,
            attrs,
            i,
            shadows,
            shadow,
            ln,
            to,
            itemHighlightSegment,
            prop,
            group,
            display,
            label,
            middle,
            r,
            x,
            y,
            line;
        item = item || this.items[this._index];

        //TODO(nico): sometimes in IE itemmouseover is triggered
        //twice without triggering itemmouseout in between. This
        //fixes the highlighting bug. Eventually, events should be
        //changed to trigger one itemmouseout between two itemmouseovers.
        this.unHighlightItem();

        if (!item || me.animating || (item.sprite && item.sprite._animating)) {
            return;
        }
        
        me.callParent([item]);
        
        if (!me.highlight) {
            return;
        }
        
        if ('segment' in me.highlightCfg) {
            highlightSegment = me.highlightCfg.segment;
            animate = me.chart.animate;
            //animate labels
            if (me.labelsGroup) {
                group = me.labelsGroup;
                display = me.label.display;
                label = group.getAt(item.index);
                middle = (item.startAngle + item.endAngle) / 2 * rad;
                r = highlightSegment.margin || 0;
                x = r * Math.cos(middle);
                y = r * Math.sin(middle);

                //TODO(nico): rounding to 1e-10
                //gives the right translation. Translation
                //was buggy for very small numbers. In this
                //case we're not looking to translate to very small
                //numbers but not to translate at all.
                if (Math.abs(x) < 1e-10) {
                    x = 0;
                }
                if (Math.abs(y) < 1e-10) {
                    y = 0;
                }
                
                attrs = {
                    translate: {
                        x: x,
                        y: y
                    }
                };
                
                if (label.showOnHighlight) {
                    attrs.opacity = 1;
                    attrs.hidden = false;
                }

                me.setSpriteAttributes(label, attrs, animate);

                line = label.lineSprite;
                if (line) {
                    me.setSpriteAttributes(line, attrs, animate);
                }
            }
            //animate shadows
            if (me.chart.shadow && item.shadows) {
                i = 0;
                shadows = item.shadows;
                ln = shadows.length;
                for (; i < ln; i++) {
                    shadow = shadows[i];
                    to = {};
                    itemHighlightSegment = item.sprite._from.segment;
                    for (prop in itemHighlightSegment) {
                        if (! (prop in highlightSegment)) {
                            to[prop] = itemHighlightSegment[prop];
                        }
                    }
                    attrs = {
                        segment: Ext.applyIf(to, me.highlightCfg.segment)
                    };
                    me.setSpriteAttributes(shadow, attrs, animate);
                }
            }
        }
    },

    /**
     * Un-highlights the specified item. If no item is provided it will un-highlight the entire series.
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    unHighlightItem: function() {
        var me = this,
            items,
            animate,
            shadowsEnabled,
            group,
            len,
            i,
            j,
            display,
            shadowLen,
            p,
            to,
            ihs,
            hs,
            sprite,
            shadows,
            shadow,
            item,
            label,
            attrs;
        if (!me.highlight) {
            return;
        }

        if (('segment' in me.highlightCfg) && me.items) {
            items = me.items;
            animate = me.chart.animate;
            shadowsEnabled = !!me.chart.shadow;
            group = me.labelsGroup;
            len = items.length;
            i = 0;
            j = 0;
            display = me.label.display;

            for (; i < len; i++) {
                item = items[i];
                if (!item) {
                    continue;
                }
                sprite = item.sprite;
                if (sprite && sprite._highlighted) {
                    //animate labels
                    if (group) {
                        label = group.getAt(item.index);
                        attrs = Ext.apply({
                            translate: {
                                x: 0,
                                y: 0
                            }
                        },
                        display == 'rotate' ? {
                            rotate: {
                                x: label.attr.x,
                                y: label.attr.y,
                                degrees: label.attr.rotation.degrees
                            }
                        }: {});
                        
                        if (label.showOnHighlight) {
                            attrs.opacity = 0;
                            attrs.hidden = true;
                        }

                        me.setSpriteAttributes(label, attrs, animate);

                        var line = label.lineSprite;
                        if (line) {
                            me.setSpriteAttributes(line, attrs, animate);
                        }
                    }
                    if (shadowsEnabled) {
                        shadows = item.shadows;
                        shadowLen = shadows.length;
                        for (; j < shadowLen; j++) {
                            to = {};
                            ihs = item.sprite._to.segment;
                            hs = item.sprite._from.segment;
                            Ext.apply(to, hs);
                            for (p in ihs) {
                                if (! (p in hs)) {
                                    to[p] = ihs[p];
                                }
                            }
                            shadow = shadows[j];
                            me.setSpriteAttributes(shadow, { segment: to }, animate);
                        }
                    }
                }
            }
        }
        me.callParent(arguments);
    },

    /**
     * Returns the color of the series (to be displayed as color for the series legend item).
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    getLegendColor: function(index) {
        var me = this;
        return (me.colorSet && me.colorSet[index % me.colorSet.length]) || me.colorArrayStyle[index % me.colorArrayStyle.length];
    }
});


/**
 * @class Ext.chart.series.Radar
 *
 * Creates a Radar Chart. A Radar Chart is a useful visualization technique for comparing different quantitative values for
 * a constrained number of categories.
 *
 * As with all other series, the Radar series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information. A typical configuration object for the radar series could be:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data1', 'data2', 'data3'],
 *         data: [
 *             { 'name': 'metric one',   'data1': 14, 'data2': 12, 'data3': 13 },
 *             { 'name': 'metric two',   'data1': 16, 'data2':  8, 'data3':  3 },
 *             { 'name': 'metric three', 'data1': 14, 'data2':  2, 'data3':  7 },
 *             { 'name': 'metric four',  'data1':  6, 'data2': 14, 'data3': 23 },
 *             { 'name': 'metric five',  'data1': 36, 'data2': 38, 'data3': 33 }
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         theme:'Category2',
 *         store: store,
 *         axes: [{
 *             type: 'Radial',
 *             position: 'radial',
 *             label: {
 *                 display: true
 *             }
 *         }],
 *         series: [{
 *             type: 'radar',
 *             xField: 'name',
 *             yField: 'data1',
 *             showInLegend: true,
 *             showMarkers: true,
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             style: {
 *                 'stroke-width': 2,
 *                 fill: 'none'
 *             }
 *         },{
 *             type: 'radar',
 *             xField: 'name',
 *             yField: 'data2',
 *             showMarkers: true,
 *             showInLegend: true,
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             style: {
 *                 'stroke-width': 2,
 *                 fill: 'none'
 *             }
 *         },{
 *             type: 'radar',
 *             xField: 'name',
 *             yField: 'data3',
 *             showMarkers: true,
 *             showInLegend: true,
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             style: {
 *                 'stroke-width': 2,
 *                 fill: 'none'
 *             }
 *         }]
 *     });
 *
 * In this configuration we add three series to the chart. Each of these series is bound to the same
 * categories field, `name` but bound to different properties for each category, `data1`, `data2` and
 * `data3` respectively. All series display markers by having `showMarkers` enabled. The configuration
 * for the markers of each series can be set by adding properties onto the markerConfig object.
 * Finally we override some theme styling properties by adding properties to the `style` object.
 */
Ext.define('Ext.chart.series.Radar', {

    /* Begin Definitions */

    extend: 'Ext.chart.series.Series',

    requires: ['Ext.chart.Shape', 'Ext.fx.Anim'],

    /* End Definitions */

    type: "radar",
    alias: 'series.radar',


    rad: Math.PI / 180,

    showInLegend: false,

    /**
     * @cfg {Object} style
     * An object containing styles for overriding series styles from Theming.
     */
    style: {},

    /**
     * @cfg {String} xField
     * The name of the data Model field corresponding to the x-axis (angle) value.
     */

    /**
     * @cfg {String} yField
     * The name of the data Model field corresponding to the y-axis (radius) value.
     */

    /**
     * @cfg {Boolean} showMarkers
     * Whether markers should be displayed at the data points of the series. If true,
     * then the {@link #markerConfig} config item will determine the markers' styling.
     */

    /**
     * @cfg {Object} markerConfig
     * The display style for the markers. Only used if {@link #showMarkers} is true.
     * The markerConfig is a configuration object containing the same set of properties defined in
     * the Sprite class. For example, if we were to set red circles as markers to the series we could
     * pass the object:
     *
     *     @example
     *     markerConfig: {
     *         type: 'circle',
     *         radius: 4,
     *         'fill': '#f00'
     *     }
     */

    constructor: function(config) {
        this.callParent(arguments);
        var me = this,
            surface = me.chart.surface;
        me.group = surface.getGroup(me.seriesId);
        if (me.showMarkers) {
            me.markerGroup = surface.getGroup(me.seriesId + '-markers');
        }
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            store = me.chart.getChartStore(),
            data = store.data.items,
            d, record,
            group = me.group,
            chart = me.chart,
            seriesItems = chart.series.items,
            s, sLen, series,
            field = me.field || me.yField,
            surface = chart.surface,
            chartBBox = chart.chartBBox,
            colorArrayStyle = me.colorArrayStyle,
            centerX, centerY,
            items,
            radius,
            maxValue = 0,
            minValue = 0,
            fields = [],
            max = Math.max,
            cos = Math.cos,
            sin = Math.sin,
            pi2 = Math.PI * 2,
            l = store.getCount(),
            startPath, path, x, y, rho,
            i, nfields,
            seriesStyle = me.seriesStyle,
            axis = chart.axes && chart.axes.get(0),
            aggregate = !(axis && axis.maximum);

        me.setBBox();
        
        maxValue = aggregate? 0 : (axis.maximum || 0);
        minValue = axis.minimum || 0;
        
        Ext.apply(seriesStyle, me.style || {});

        //if the store is empty then there's nothing to draw
        if (!store || !store.getCount() || me.seriesIsHidden) {
            me.hide();
            me.items = [];
            if (me.radar) {
                me.radar.hide(true);
            }
            me.radar = null;
            return;
        }
        
        if(!seriesStyle['stroke']){
            seriesStyle['stroke'] = colorArrayStyle[me.themeIdx % colorArrayStyle.length];
        }

        me.unHighlightItem();
        me.cleanHighlights();

        centerX = me.centerX = chartBBox.x + (chartBBox.width / 2);
        centerY = me.centerY = chartBBox.y + (chartBBox.height / 2);
        me.radius = radius = Math.min(chartBBox.width, chartBBox.height) /2;
        me.items = items = [];

        if (aggregate) {
            //get all renderer fields
            for (s = 0, sLen = seriesItems.length; s < sLen; s++) {
                series = seriesItems[s];
                fields.push(series.yField);
            }
            //get maxValue to interpolate
            for (d = 0; d < l; d++) {
                record = data[d];
                for (i = 0, nfields = fields.length; i < nfields; i++) {
                    maxValue = max(+record.get(fields[i]), maxValue);
                }
            }
        }
        //ensure non-zero value.
        maxValue = maxValue || 1;
        if (minValue >= maxValue) {
            minValue = maxValue - 1;
        }
        //create path and items
        startPath = []; path = [];
        for (i = 0; i < l; i++) {
            record = data[i];
            rho = radius * (record.get(field) - minValue) / (maxValue - minValue);
            if (rho < 0) {
                rho = 0;
            }
            x = rho * cos(i / l * pi2);
            y = rho * sin(i / l * pi2);
            if (i == 0) {
                path.push('M', x + centerX, y + centerY);
                startPath.push('M', 0.01 * x + centerX, 0.01 * y + centerY);
            } else {
                path.push('L', x + centerX, y + centerY);
                startPath.push('L', 0.01 * x + centerX, 0.01 * y + centerY);
            }
            items.push({
                sprite: false, //TODO(nico): add markers
                point: [centerX + x, centerY + y],
                storeItem: record,
                series: me
            });
        }
        path.push('Z');
        //create path sprite
        if (!me.radar) {
            me.radar = surface.add(Ext.apply({
                type: 'path',
                group: group,
                path: startPath
            }, seriesStyle || {}));
        }
        //reset on resizing
        if (chart.resizing) {
            me.radar.setAttributes({
                path: startPath
            }, true);
        }
        //render/animate
        if (chart.animate) {
            me.onAnimate(me.radar, {
                to: Ext.apply({
                    path: path
                }, seriesStyle || {})
            });
        } else {
            me.radar.setAttributes(Ext.apply({
                path: path
            }, seriesStyle || {}), true);
        }
        //render markers, labels and callouts
        if (me.showMarkers) {
            me.drawMarkers();
        }
        me.renderLabels();
        me.renderCallouts();
    },

    // @private draws the markers for the lines (if any).
    drawMarkers: function() {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            store = chart.getChartStore(),
            markerStyle = Ext.apply({}, me.markerStyle || {}),
            endMarkerStyle = Ext.apply(markerStyle, me.markerConfig, {
                fill: me.colorArrayStyle[me.themeIdx % me.colorArrayStyle.length]
            }),
            items = me.items,
            type = endMarkerStyle.type,
            markerGroup = me.markerGroup,
            centerX = me.centerX,
            centerY = me.centerY,
            item, i, l, marker, rendererAttributes;

        delete endMarkerStyle.type;

        for (i = 0, l = items.length; i < l; i++) {
            item = items[i];
            marker = markerGroup.getAt(i);
            if (!marker) {
                marker = Ext.chart.Shape[type](surface, Ext.apply({
                    group: markerGroup,
                    x: 0,
                    y: 0,
                    translate: {
                        x: centerX,
                        y: centerY
                    }
                }, endMarkerStyle));
            }
            else {
                marker.show();
            }

            item.sprite = marker;

            if (chart.resizing) {
                marker.setAttributes({
                    x: 0,
                    y: 0,
                    translate: {
                        x: centerX,
                        y: centerY
                    }
                }, true);
            }
            marker._to = {
                translate: {
                    x: item.point[0],
                    y: item.point[1]
                }
            };
            //render/animate
            rendererAttributes = me.renderer(marker, store.getAt(i), marker._to, i, store);
            rendererAttributes = Ext.applyIf(rendererAttributes || {}, endMarkerStyle || {});
            if (chart.animate) {
                me.onAnimate(marker, {
                    to: rendererAttributes
                });
            }
            else {
                marker.setAttributes(rendererAttributes, true);
            }
        }
    },

    isItemInPoint: function(x, y, item) {
        var point,
            tolerance = 10,
            abs = Math.abs;
        point = item.point;
        return (abs(point[0] - x) <= tolerance &&
                abs(point[1] - y) <= tolerance);
    },

    // @private callback for when creating a label sprite.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            centerX = me.centerX,
            centerY = me.centerY,
            endLabelStyle = Ext.apply({}, config, me.seriesLabelStyle || {});

        return me.chart.surface.add(Ext.apply({
            'type': 'text',
            'text-anchor': 'middle',
            'group': group,
            'x': centerX,
            'y': centerY
        }, endLabelStyle || {}));
    },

    // @private callback for when placing a label sprite.
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            centerX = me.centerX,
            centerY = me.centerY,
            opt = {
                x: Number(item.point[0]),
                y: Number(item.point[1])
            },
            x = opt.x - centerX,
            y = opt.y - centerY,
            theta = Math.atan2(y, x || 1),
            deg = theta * 180 / Math.PI,
            labelBox, direction;

            function fixAngle(a) {
                if (a < 0) {
                    a += 360;
                }
                return a % 360;
            }

        label.setAttributes({
            text: format(storeItem.get(field), label, storeItem, item, i, display, animate, index),
            hidden: true
        },
        true);

        // Move the label by half its height or width depending on 
        // the angle so the label doesn't overlap the graph.
        labelBox = label.getBBox();
        deg = fixAngle(deg);
        if ((deg > 45 && deg < 135) || (deg > 225 && deg < 315)) {
            direction = (deg > 45 && deg < 135 ? 1 : -1);
            opt.y += direction * labelBox.height/2;
        } else {
            direction = (deg >= 135 && deg <= 225 ? -1 : 1);
            opt.x += direction * labelBox.width/2;
        }

        if (resizing) {
            label.setAttributes({
                x: centerX,
                y: centerY
            }, true);
        }

        if (animate) {
            label.show(true);
            me.onAnimate(label, {
                to: opt
            });
        } else {
            label.setAttributes(opt, true);
            label.show(true);
        }
    },

    // @private for toggling (show/hide) series.
    toggleAll: function(show) {
        var me = this,
            i, ln, shadow, shadows;
        if (!show) {
            Ext.chart.series.Radar.superclass.hideAll.call(me);
        }
        else {
            Ext.chart.series.Radar.superclass.showAll.call(me);
        }
        if (me.radar) {
            me.radar.setAttributes({
                hidden: !show
            }, true);
            //hide shadows too
            if (me.radar.shadows) {
                for (i = 0, shadows = me.radar.shadows, ln = shadows.length; i < ln; i++) {
                    shadow = shadows[i];
                    shadow.setAttributes({
                        hidden: !show
                    }, true);
                }
            }
        }
    },

    // @private hide all elements in the series.
    hideAll: function() {
        this.toggleAll(false);
        this.hideMarkers(0);
    },

    // @private show all elements in the series.
    showAll: function() {
        this.toggleAll(true);
    },

    // @private hide all markers that belong to `markerGroup`
    hideMarkers: function(index) {
        var me = this,
            count = me.markerGroup && me.markerGroup.getCount() || 0,
            i = index || 0;
        for (; i < count; i++) {
            me.markerGroup.getAt(i).hide(true);
        }
    },

    // @private return the radial axis as yAxis (there is no xAxis).
    // Required by the base class 'Ext.chart.axis.Axis'.
    getAxesForXAndYFields: function() {
        var me = this,
            chart = me.chart,
            axes = chart.axes,
            axis = [].concat(axes && axes.get(0));

        return {
            yAxis: axis
        };
    }
});


/**
 * @class Ext.chart.series.Scatter
 * @extends Ext.chart.series.Cartesian
 *
 * Creates a Scatter Chart. The scatter plot is useful when trying to display more than two variables in the same visualization.
 * These variables can be mapped into x, y coordinates and also to an element's radius/size, color, etc.
 * As with all other series, the Scatter Series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information on creating charts. A typical configuration object for the scatter could be:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *         data: [
 *             { 'name': 'metric one',   'data1': 10, 'data2': 12, 'data3': 14, 'data4': 8,  'data5': 13 },
 *             { 'name': 'metric two',   'data1': 7,  'data2': 8,  'data3': 16, 'data4': 10, 'data5': 3  },
 *             { 'name': 'metric three', 'data1': 5,  'data2': 2,  'data3': 14, 'data4': 12, 'data5': 7  },
 *             { 'name': 'metric four',  'data1': 2,  'data2': 14, 'data3': 6,  'data4': 1,  'data5': 23 },
 *             { 'name': 'metric five',  'data1': 27, 'data2': 38, 'data3': 36, 'data4': 13, 'data5': 33 }
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         theme:'Category2',
 *         store: store,
 *         axes: [{
 *             type: 'Numeric',
 *             position: 'left',
 *             fields: ['data2', 'data3'],
 *             title: 'Sample Values',
 *             grid: true,
 *             minimum: 0
 *         }, {
 *             type: 'Category',
 *             position: 'bottom',
 *             fields: ['name'],
 *             title: 'Sample Metrics'
 *         }],
 *         series: [{
 *             type: 'scatter',
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             axis: 'left',
 *             xField: 'name',
 *             yField: 'data2'
 *         }, {
 *             type: 'scatter',
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             axis: 'left',
 *             xField: 'name',
 *             yField: 'data3'
 *         }]
 *     });
 *
 * In this configuration we add three different categories of scatter series. Each of them is bound to a different field of the same data store,
 * `data1`, `data2` and `data3` respectively. All x-fields for the series must be the same field, in this case `name`.
 * Each scatter series has a different styling configuration for markers, specified by the `markerConfig` object. Finally we set the left axis as
 * axis to show the current values of the elements.
 */
Ext.define('Ext.chart.series.Scatter', {

    /* Begin Definitions */

    extend: 'Ext.chart.series.Cartesian',

    requires: ['Ext.chart.axis.Axis', 'Ext.chart.Shape', 'Ext.fx.Anim'],

    /* End Definitions */

    type: 'scatter',
    alias: 'series.scatter',

    /**
     * @cfg {Object} markerConfig
     * The display style for the scatter series markers.
     */

    /**
     * @cfg {Object} style
     * Append styling properties to this object for it to override theme properties.
     */

    constructor: function(config) {
        this.callParent(arguments);
        var me = this,
            shadow = me.chart.shadow,
            surface = me.chart.surface, i, l;
        Ext.apply(me, config, {
            style: {},
            markerConfig: {},
            shadowAttributes: [{
                "stroke-width": 6,
                "stroke-opacity": 0.05,
                stroke: 'rgb(0, 0, 0)'
            }, {
                "stroke-width": 4,
                "stroke-opacity": 0.1,
                stroke: 'rgb(0, 0, 0)'
            }, {
                "stroke-width": 2,
                "stroke-opacity": 0.15,
                stroke: 'rgb(0, 0, 0)'
            }]
        });
        me.group = surface.getGroup(me.seriesId);
        if (shadow) {
            for (i = 0, l = me.shadowAttributes.length; i < l; i++) {
                me.shadowGroups.push(surface.getGroup(me.seriesId + '-shadows' + i));
            }
        }
    },

    // @private Get chart and data boundaries
    getBounds: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            chartAxes = chart.axes,
            boundAxes = me.getAxesForXAndYFields(),
            boundXAxis = boundAxes.xAxis,
            boundYAxis = boundAxes.yAxis,
            bbox, xScale, yScale, ln, minX, minY, maxX, maxY, i, axis, ends;

        me.setBBox();
        bbox = me.bbox;

        if (axis = chartAxes.get(boundXAxis)) {
            ends = axis.applyData();
            minX = ends.from;
            maxX = ends.to;
        }

        if (axis = chartAxes.get(boundYAxis)) {
            ends = axis.applyData();
            minY = ends.from;
            maxY = ends.to;
        }

        // If a field was specified without a corresponding axis, create one to get bounds
        if (me.xField && !Ext.isNumber(minX)) {
            axis = me.getMinMaxXValues();
            minX = axis[0];
            maxX = axis[1];
        }

        if (me.yField && !Ext.isNumber(minY)) {
            axis = me.getMinMaxYValues();
            minY = axis[0];
            maxY = axis[1];
        }

        if (isNaN(minX)) {
            minX = 0;
            maxX = store.getCount() - 1;
            xScale = bbox.width / (store.getCount() - 1);
        }
        else {
            xScale = bbox.width / (maxX - minX);
        }

        if (isNaN(minY)) {
            minY = 0;
            maxY = store.getCount() - 1;
            yScale = bbox.height / (store.getCount() - 1);
        }
        else {
            yScale = bbox.height / (maxY - minY);
        }

        return {
            bbox: bbox,
            minX: minX,
            minY: minY,
            xScale: xScale,
            yScale: yScale
        };
    },

    // @private Build an array of paths for the chart
    getPaths: function() {
        var me = this,
            chart = me.chart,
            enableShadows = chart.shadow,
            store = chart.getChartStore(),
            data = store.data.items,
            i, ln, record,
            group = me.group,
            bounds = me.bounds = me.getBounds(),
            bbox = me.bbox,
            xScale = bounds.xScale,
            yScale = bounds.yScale,
            minX = bounds.minX,
            minY = bounds.minY,
            boxX = bbox.x,
            boxY = bbox.y,
            boxHeight = bbox.height,
            items = me.items = [],
            attrs = [],
            reverse = me.reverse,
            x, y, xValue, yValue, sprite;

        for (i = 0, ln = data.length; i < ln; i++) {
            record = data[i];
            xValue = record.get(me.xField);
            yValue = record.get(me.yField);
            
            //skip undefined or null values
            if (typeof yValue == 'undefined' || (typeof yValue == 'string' && !yValue)
                || xValue == null || yValue == null) {
                if (Ext.isDefined(Ext.global.console)) {
                    Ext.global.console.warn("[Ext.chart.series.Scatter]  Skipping a store element with a value which is either undefined or null  at ", record, xValue, yValue);
                }
                continue;
            }
            // Ensure a value
            if (typeof xValue == 'string' || typeof xValue == 'object' && !Ext.isDate(xValue)) {
                xValue = i;
            }
            if (typeof yValue == 'string' || typeof yValue == 'object' && !Ext.isDate(yValue)) {
                yValue = i;
            }
            if (reverse) {
                x = boxX + bbox.width - ((xValue - minX) * xScale);
            } else {
                x = boxX + (xValue - minX) * xScale;
            }
            
            y = boxY + boxHeight - (yValue - minY) * yScale;
            
            attrs.push({
                x: x,
                y: y
            });

            me.items.push({
                series: me,
                value: [xValue, yValue],
                point: [x, y],
                storeItem: record
            });

            // When resizing, reset before animating
            if (chart.animate && chart.resizing) {
                sprite = group.getAt(i);
                if (sprite) {
                    me.resetPoint(sprite);
                    if (enableShadows) {
                        me.resetShadow(sprite);
                    }
                }
            }
        }
        return attrs;
    },

    // @private translate point to the center
    resetPoint: function(sprite) {
        var bbox = this.bbox;
        sprite.setAttributes({
            translate: {
                x: (bbox.x + bbox.width) / 2,
                y: (bbox.y + bbox.height) / 2
            }
        }, true);
    },

    // @private translate shadows of a sprite to the center
    resetShadow: function(sprite) {
        var me = this,
            shadows = sprite.shadows,
            shadowAttributes = me.shadowAttributes,
            ln = me.shadowGroups.length,
            bbox = me.bbox,
            i, attr;
        for (i = 0; i < ln; i++) {
            attr = Ext.apply({}, shadowAttributes[i]);
            // TODO: fix this with setAttributes
            if (attr.translate) {
                attr.translate.x += (bbox.x + bbox.width) / 2;
                attr.translate.y += (bbox.y + bbox.height) / 2;
            }
            else {
                attr.translate = {
                    x: (bbox.x + bbox.width) / 2,
                    y: (bbox.y + bbox.height) / 2
                };
            }
            shadows[i].setAttributes(attr, true);
        }
    },

    // @private create a new point
    createPoint: function(attr, type) {
        var me = this,
            chart = me.chart,
            group = me.group,
            bbox = me.bbox;

        return Ext.chart.Shape[type](chart.surface, Ext.apply({}, {
            x: 0,
            y: 0,
            group: group,
            translate: {
                x: (bbox.x + bbox.width) / 2,
                y: (bbox.y + bbox.height) / 2
            }
        }, attr));
    },

    // @private create a new set of shadows for a sprite
    createShadow: function(sprite, endMarkerStyle, type) {
        var me = this,
            chart = me.chart,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            lnsh = shadowGroups.length,
            bbox = me.bbox,
            i, shadow, shadows, attr;

        sprite.shadows = shadows = [];

        for (i = 0; i < lnsh; i++) {
            attr = Ext.apply({}, shadowAttributes[i]);
            if (attr.translate) {
                attr.translate.x += (bbox.x + bbox.width) / 2;
                attr.translate.y += (bbox.y + bbox.height) / 2;
            }
            else {
                Ext.apply(attr, {
                    translate: {
                        x: (bbox.x + bbox.width) / 2,
                        y: (bbox.y + bbox.height) / 2
                    }
                });
            }
            Ext.apply(attr, endMarkerStyle);
            shadow = Ext.chart.Shape[type](chart.surface, Ext.apply({}, {
                x: 0,
                y: 0,
                group: shadowGroups[i]
            }, attr));
            shadows.push(shadow);
        }
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            group = me.group,
            enableShadows = chart.shadow,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            lnsh = shadowGroups.length,
            sprite, attrs, attr, ln, i, endMarkerStyle, shindex, type, shadows,
            rendererAttributes, shadowAttribute;
        
        if (!store || !store.getCount() || me.seriesIsHidden) {
            me.hide();
            me.items = [];
            return;
        }

        endMarkerStyle = Ext.apply({}, me.markerStyle, me.markerConfig);
        type = endMarkerStyle.type || 'circle';
        delete endMarkerStyle.type;

        //if the store is empty then there's nothing to be rendered
        if (!store || !store.getCount()) {
            me.hide();
            me.items = [];
            return;
        }


        me.unHighlightItem();
        me.cleanHighlights();

        attrs = me.getPaths();
        ln = attrs.length;
        for (i = 0; i < ln; i++) {
            attr = attrs[i];
            sprite = group.getAt(i);
            Ext.apply(attr, endMarkerStyle);

            // Create a new sprite if needed (no height)
            if (!sprite) {
                sprite = me.createPoint(attr, type);
                if (enableShadows) {
                    me.createShadow(sprite, endMarkerStyle, type);
                }
            }

            shadows = sprite.shadows;
            if (chart.animate) {
                rendererAttributes = me.renderer(sprite, store.getAt(i), { translate: attr }, i, store);
                sprite._to = rendererAttributes;
                me.onAnimate(sprite, {
                    to: rendererAttributes
                });
                //animate shadows
                for (shindex = 0; shindex < lnsh; shindex++) {
                    shadowAttribute = Ext.apply({}, shadowAttributes[shindex]);
                    rendererAttributes = me.renderer(shadows[shindex], store.getAt(i), Ext.apply({}, { 
                        hidden: false,
                        translate: {
                            x: attr.x + (shadowAttribute.translate? shadowAttribute.translate.x : 0),
                            y: attr.y + (shadowAttribute.translate? shadowAttribute.translate.y : 0)
                        }
                    }, shadowAttribute), i, store);
                    me.onAnimate(shadows[shindex], { to: rendererAttributes });
                }
            }
            else {
                rendererAttributes = me.renderer(sprite, store.getAt(i), { translate: attr }, i, store);
                sprite._to = rendererAttributes;
                sprite.setAttributes(rendererAttributes, true);
                //animate shadows
                for (shindex = 0; shindex < lnsh; shindex++) {
                    shadowAttribute = Ext.apply({}, shadowAttributes[shindex]);
                    rendererAttributes = me.renderer(shadows[shindex], store.getAt(i), Ext.apply({}, { 
                        hidden: false,
                        translate: {
                            x: attr.x + (shadowAttribute.translate? shadowAttribute.translate.x : 0),
                            y: attr.y + (shadowAttribute.translate? shadowAttribute.translate.y : 0)
                        } 
                    }, shadowAttribute), i, store);
                    shadows[shindex].setAttributes(rendererAttributes, true);
                }
            }
            me.items[i].sprite = sprite;
        }

        // Hide unused sprites
        ln = group.getCount();
        for (i = attrs.length; i < ln; i++) {
            group.getAt(i).hide(true);
        }
        me.renderLabels();
        me.renderCallouts();
    },

    // @private callback for when creating a label sprite.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            endLabelStyle = Ext.apply({}, config, me.seriesLabelStyle),
            bbox = me.bbox;

        return me.chart.surface.add(Ext.apply({
            type: 'text',
            'text-anchor': 'middle',
            group: group,
            x: Number(item.point[0]),
            y: bbox.y + bbox.height / 2
        }, endLabelStyle));
    },

    // @private callback for when placing a label sprite.
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            bbox = me.bbox,
            x = Number(item.point[0]),
            y = Number(item.point[1]),
            radius = item.sprite.attr.radius,
            labelBox, markerBox, width, height, xOffset, yOffset,
            anim;

        label.setAttributes({
            text: format(storeItem.get(field), label, storeItem, item, i, display, animate, index),
            hidden: true
        }, true);


        //TODO(nicolas): find out why width/height values in circle bounding boxes are undefined.
        markerBox = item.sprite.getBBox();
        markerBox.width = markerBox.width || (radius * 2);
        markerBox.height = markerBox.height || (radius * 2);

        labelBox = label.getBBox();
        width = labelBox.width/2;
        height = labelBox.height/2;

        if (display == 'rotate') {
            //correct label position to fit into the box
            xOffset = markerBox.width/2 + width + height/2;
            if (x + xOffset + width > bbox.x + bbox.width) {
                x -= xOffset;
            } else {
                x += xOffset;
            }
            label.setAttributes({
                'rotation': {
                    x: x,
                    y: y,
                    degrees: -45
                }
            }, true);
        } else if (display == 'under' || display == 'over') {
            label.setAttributes({
                'rotation': {
                    degrees: 0
                }
            }, true);

            //correct label position to fit into the box
            if (x < bbox.x + width) {
                x = bbox.x + width;
            } else if (x + width > bbox.x + bbox.width) {
                x = bbox.x + bbox.width - width;
            }

            yOffset = markerBox.height/2 + height;
            y = y + (display == 'over' ? -yOffset : yOffset);
            if (y < bbox.y + height) {
                y += 2 * yOffset;
            } else if (y + height > bbox.y + bbox.height) {
                y -= 2 * yOffset;
            }
        }

        if (!chart.animate) {
            label.setAttributes({
                x: x,
                y: y
            }, true);
            label.show(true);
        }
        else {
            if (resizing) {
                anim = item.sprite.getActiveAnimation();
                if (anim) {
                    anim.on('afteranimate', function() {
                        label.setAttributes({
                            x: x,
                            y: y
                        }, true);
                        label.show(true);
                    });
                }
                else {
                    label.show(true);
                }
            }
            else {
                me.onAnimate(label, {
                    to: {
                        x: x,
                        y: y
                    }
                });
            }
        }
    },

    // @private callback for when placing a callout sprite.
    onPlaceCallout: function(callout, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            resizing = chart.resizing,
            config = me.callouts,
            items = me.items,
            cur = item.point,
            normal,
            bbox = callout.label.getBBox(),
            offsetFromViz = 30,
            offsetToSide = 10,
            offsetBox = 3,
            boxx, boxy, boxw, boxh,
            p, clipRect = me.bbox,
            x, y;

        //position
        normal = [Math.cos(Math.PI /4), -Math.sin(Math.PI /4)];
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;

        //box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;

        //now check if we're out of bounds and invert the normal vector correspondingly
        //this may add new overlaps between labels (but labels won't be out of bounds).
        if (boxx < clipRect[0] || (boxx + boxw) > (clipRect[0] + clipRect[2])) {
            normal[0] *= -1;
        }
        if (boxy < clipRect[1] || (boxy + boxh) > (clipRect[1] + clipRect[3])) {
            normal[1] *= -1;
        }

        //update positions
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;

        //update box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;

        if (chart.animate) {
            //set the line from the middle of the pie to the box.
            me.onAnimate(callout.lines, {
                to: {
                    path: ["M", cur[0], cur[1], "L", x, y, "Z"]
                }
            }, true);
            //set box position
            me.onAnimate(callout.box, {
                to: {
                    x: boxx,
                    y: boxy,
                    width: boxw,
                    height: boxh
                }
            }, true);
            //set text position
            me.onAnimate(callout.label, {
                to: {
                    x: x + (normal[0] > 0? offsetBox : -(bbox.width + offsetBox)),
                    y: y
                }
            }, true);
        } else {
            //set the line from the middle of the pie to the box.
            callout.lines.setAttributes({
                path: ["M", cur[0], cur[1], "L", x, y, "Z"]
            }, true);
            //set box position
            callout.box.setAttributes({
                x: boxx,
                y: boxy,
                width: boxw,
                height: boxh
            }, true);
            //set text position
            callout.label.setAttributes({
                x: x + (normal[0] > 0? offsetBox : -(bbox.width + offsetBox)),
                y: y
            }, true);
        }
        for (p in callout) {
            callout[p].show(true);
        }
    },

    // @private handles sprite animation for the series.
    onAnimate: function(sprite, attr) {
        sprite.show();
        return this.callParent(arguments);
    },

    isItemInPoint: function(x, y, item) {
        var point,
            tolerance = 10,
            abs = Math.abs;

        function dist(point) {
            var dx = abs(point[0] - x),
                dy = abs(point[1] - y);
            return Math.sqrt(dx * dx + dy * dy);
        }
        point = item.point;
        return (point[0] - tolerance <= x && point[0] + tolerance >= x &&
            point[1] - tolerance <= y && point[1] + tolerance >= y);
    }
});


/**
 * @private
 */
Ext.define('Ext.draw.Matrix', {

    /* Begin Definitions */

    requires: ['Ext.draw.Draw'],

    /* End Definitions */

    constructor: function(a, b, c, d, e, f) {
        if (a != null) {
            this.matrix = [[a, c, e], [b, d, f], [0, 0, 1]];
        }
        else {
            this.matrix = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        }
    },

    add: function(a, b, c, d, e, f) {
        var me = this,
            out = [[], [], []],
            matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
            x,
            y,
            z,
            res;

        for (x = 0; x < 3; x++) {
            for (y = 0; y < 3; y++) {
                res = 0;
                for (z = 0; z < 3; z++) {
                    res += me.matrix[x][z] * matrix[z][y];
                }
                out[x][y] = res;
            }
        }
        me.matrix = out;
    },

    prepend: function(a, b, c, d, e, f) {
        var me = this,
            out = [[], [], []],
            matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
            x,
            y,
            z,
            res;

        for (x = 0; x < 3; x++) {
            for (y = 0; y < 3; y++) {
                res = 0;
                for (z = 0; z < 3; z++) {
                    res += matrix[x][z] * me.matrix[z][y];
                }
                out[x][y] = res;
            }
        }
        me.matrix = out;
    },

    invert: function() {
        var matrix = this.matrix,
            a = matrix[0][0],
            b = matrix[1][0],
            c = matrix[0][1],
            d = matrix[1][1],
            e = matrix[0][2],
            f = matrix[1][2],
            x = a * d - b * c;
        return new Ext.draw.Matrix(d / x, -b / x, -c / x, a / x, (c * f - d * e) / x, (b * e - a * f) / x);
    },

    clone: function() {
        var matrix = this.matrix,
            a = matrix[0][0],
            b = matrix[1][0],
            c = matrix[0][1],
            d = matrix[1][1],
            e = matrix[0][2],
            f = matrix[1][2];
        return new Ext.draw.Matrix(a, b, c, d, e, f);
    },

    translate: function(x, y) {
        this.prepend(1, 0, 0, 1, x, y);
    },

    scale: function(x, y, cx, cy) {
        var me = this;
        if (y == null) {
            y = x;
        }
        me.add(x, 0, 0, y, cx * (1 - x), cy * (1 - y));
    },

    rotate: function(a, x, y) {
        a = Ext.draw.Draw.rad(a);
        var me = this,
            cos = +Math.cos(a).toFixed(9),
            sin = +Math.sin(a).toFixed(9);
        me.add(cos, sin, -sin, cos, x - cos * x + sin * y, -(sin * x) + y - cos * y);
    },

    x: function(x, y) {
        var matrix = this.matrix;
        return x * matrix[0][0] + y * matrix[0][1] + matrix[0][2];
    },

    y: function(x, y) {
        var matrix = this.matrix;
        return x * matrix[1][0] + y * matrix[1][1] + matrix[1][2];
    },

    get: function(i, j) {
        return + this.matrix[i][j].toFixed(4);
    },

    toString: function() {
        var me = this;
        return [me.get(0, 0), me.get(0, 1), me.get(1, 0), me.get(1, 1), 0, 0].join();
    },

    toSvg: function() {
        var me = this;
        return "matrix(" + [me.get(0, 0), me.get(1, 0), me.get(0, 1), me.get(1, 1), me.get(0, 2), me.get(1, 2)].join() + ")";
    },

    toFilter: function(dx, dy) {
        var me = this;
        dx = dx || 0;
        dy = dy || 0;
        return "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', filterType='bilinear', M11=" + me.get(0, 0) +
            ", M12=" + me.get(0, 1) + ", M21=" + me.get(1, 0) + ", M22=" + me.get(1, 1) +
            ", Dx=" + (me.get(0, 2) + dx) + ", Dy=" + (me.get(1, 2) + dy) + ")";
    },

    offset: function() {
        var matrix = this.matrix;
        return [(matrix[0][2] || 0).toFixed(4), (matrix[1][2] || 0).toFixed(4)];
    },

    // Split matrix into Translate, Scale, Shear, and Rotate.
    split: function () {
        function norm(a) {
            return a[0] * a[0] + a[1] * a[1];
        }
        function normalize(a) {
            var mag = Math.sqrt(norm(a));
            a[0] /= mag;
            a[1] /= mag;
        }
        var matrix = this.matrix,
            out = {
                translateX: matrix[0][2],
                translateY: matrix[1][2]
            },
            row;

        // scale and shear
        row = [[matrix[0][0], matrix[0][1]], [matrix[1][1], matrix[1][1]]];
        out.scaleX = Math.sqrt(norm(row[0]));
        normalize(row[0]);

        out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
        row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

        out.scaleY = Math.sqrt(norm(row[1]));
        normalize(row[1]);
        out.shear /= out.scaleY;

        // rotation
        out.rotate = Math.asin(-row[0][1]);

        out.isSimple = !+out.shear.toFixed(9) && (out.scaleX.toFixed(9) == out.scaleY.toFixed(9) || !out.rotate);

        return out;
    }
});

/**
 * DD implementation for Panels.
 * @private
 */
Ext.define('Ext.draw.SpriteDD', {
    extend: 'Ext.dd.DragSource',

    constructor : function(sprite, cfg){
        var me = this,
            el = sprite.el;
        me.sprite = sprite;
        me.el = el;
        me.dragData = {el: el, sprite: sprite};
        me.callParent([el, cfg]);
        me.sprite.setStyle('cursor', 'move');
    },

    showFrame: Ext.emptyFn,
    createFrame : Ext.emptyFn,

    getDragEl : function(e){
        return this.el;
    },
    
    getRegion: function() {
        var me = this,
            el = me.el,
            pos, x1, x2, y1, y2, t, r, b, l, bbox, sprite;
        
        sprite = me.sprite;
        bbox = sprite.getBBox();
        
        try {
            pos = Ext.Element.getXY(el);
        } catch (e) { }

        if (!pos) {
            return null;
        }

        x1 = pos[0];
        x2 = x1 + bbox.width;
        y1 = pos[1];
        y2 = y1 + bbox.height;
        
        return new Ext.util.Region(y1, x2, y2, x1);
    },

    /*
      TODO(nico): Cumulative translations in VML are handled
      differently than in SVG. While in SVG we specify the translation
      relative to the original x, y position attributes, in VML the translation
      is a delta between the last position of the object (modified by the last
      translation) and the new one.
      
      In VML the translation alters the position
      of the object, we should change that or alter the SVG impl.
    */
     
    startDrag: function(x, y) {
        var me = this,
            attr = me.sprite.attr;
        me.prev = me.sprite.surface.transformToViewBox(x, y);
    },

    onDrag: function(e) {
        var xy = e.getXY(),
            me = this,
            sprite = me.sprite,
            attr = sprite.attr, dx, dy;
        xy = me.sprite.surface.transformToViewBox(xy[0], xy[1]);
        dx = xy[0] - me.prev[0];
        dy = xy[1] - me.prev[1];
        sprite.setAttributes({
            translate: {
                x: attr.translation.x + dx,
                y: attr.translation.y + dy
            }
        }, true);
        me.prev = xy;
    },

    setDragElPos: function () {
        // Disable automatic DOM move in DD that spoils layout of VML engine.
        return false;
    }
});

/**
 * A Sprite is an object rendered in a Drawing surface.
 *
 * ## Types
 *
 * The following sprite types are supported:
 *
 * ### Rect
 *
 * Rectangle requires `width` and `height` attributes:
 *
 *     @example
 *     Ext.create('Ext.draw.Component', {
 *         renderTo: Ext.getBody(),
 *         width: 200,
 *         height: 200,
 *         items: [{
 *             type: 'rect',
 *             width: 100,
 *             height: 50,
 *             radius: 10,
 *             fill: 'green',
 *             opacity: 0.5,
 *             stroke: 'red',
 *             'stroke-width': 2
 *         }]
 *     });
 *
 * ### Circle
 *
 * Circle requires `x`, `y` and `radius` attributes:
 *
 *     @example
 *     Ext.create('Ext.draw.Component', {
 *         renderTo: Ext.getBody(),
 *         width: 200,
 *         height: 200,
 *         items: [{
 *             type: 'circle',
 *             radius: 90,
 *             x: 100,
 *             y: 100,
 *             fill: 'blue'
 *         }]
 *     });
 *
 * ### Ellipse
 *
 * Ellipse requires `x`, `y`, `radiusX` and `radiusY` attributes:
 *
 *     @example
 *     Ext.create('Ext.draw.Component', {
 *         renderTo: Ext.getBody(),
 *         width: 200,
 *         height: 200,
 *         items: [{
 *             type: "ellipse",
 *             radiusX: 100,
 *             radiusY: 50,
 *             x: 100,
 *             y: 100,
 *             fill: 'red'
 *         }]
 *     });
 *
 * ### Path
 *
 * Path requires the `path` attribute:
 *
 *     @example
 *     Ext.create('Ext.draw.Component', {
 *         renderTo: Ext.getBody(),
 *         width: 200,
 *         height: 200,
 *         items: [{
 *             type: "path",
 *             path: "M-66.6 26C-66.6 26 -75 22 -78.2 18.4C-81.4 14.8 -80.948 19.966 " +
 *                   "-85.8 19.6C-91.647 19.159 -90.6 3.2 -90.6 3.2L-94.6 10.8C-94.6 " +
 *                   "10.8 -95.8 25.2 -87.8 22.8C-83.893 21.628 -82.6 23.2 -84.2 " +
 *                   "24C-85.8 24.8 -78.6 25.2 -81.4 26.8C-84.2 28.4 -69.8 23.2 -72.2 " +
 *                   "33.6L-66.6 26z",
 *             fill: "purple"
 *         }]
 *     });
 *
 * ### Text
 *
 * Text requires the `text` attribute:
 *
 *     @example
 *     Ext.create('Ext.draw.Component', {
 *         renderTo: Ext.getBody(),
 *         width: 200,
 *         height: 200,
 *         items: [{
 *             type: "text",
 *             text: "Hello, Sprite!",
 *             fill: "green",
 *             font: "18px monospace"
 *         }]
 *     });
 *
 * ### Image
 *
 * Image requires `width`, `height` and `src` attributes:
 *
 *     @example
 *     Ext.create('Ext.draw.Component', {
 *         renderTo: Ext.getBody(),
 *         width: 200,
 *         height: 200,
 *         items: [{
 *             type: "image",
 *             src: "http://www.sencha.com/img/apple-touch-icon.png",
 *             width: 200,
 *             height: 200
 *         }]
 *     });
 *
 * ## Creating and adding a Sprite to a Surface
 *
 * See {@link Ext.draw.Surface} documentation.
 *
 * ## Transforming sprites
 *
 * See {@link #setAttributes} method documentation for examples on how to translate, scale and rotate the sprites.
 *
 */
Ext.define('Ext.draw.Sprite', {

    /* Begin Definitions */

    mixins: {
        observable: 'Ext.util.Observable',
        animate: 'Ext.util.Animate'
    },

    requires: ['Ext.draw.SpriteDD'],

    /* End Definitions */

    /**
     * @cfg {String} type The type of the sprite.
     * Possible options are 'circle', 'ellipse', 'path', 'rect', 'text', 'image'.
     *
     * See {@link Ext.draw.Sprite} class documentation for examples of all types.
     */

    /**
     * @cfg {Number} width The width of the rect or image sprite.
     */

    /**
     * @cfg {Number} height The height of the rect or image sprite.
     */

    /**
     * @cfg {Number} radius The radius of the circle sprite. Or in case of rect sprite, the border radius.
     */

    /**
     * @cfg {Number} radiusX The radius of the ellipse sprite along x-axis.
     */

    /**
     * @cfg {Number} radiusY The radius of the ellipse sprite along y-axis.
     */

    /**
     * @cfg {Number} x Sprite position along the x-axis.
     */

    /**
     * @cfg {Number} y Sprite position along the y-axis.
     */

    /**
     * @cfg {String} path The path of the path sprite written in SVG-like path syntax.
     */

    /**
     * @cfg {Number} opacity The opacity of the sprite. A number between 0 and 1.
     */

    /**
     * @cfg {String} fill The fill color.
     */

    /**
     * @cfg {String} stroke The stroke color.
     */

    /**
     * @cfg {Number} stroke-width The width of the stroke.
     *
     * Note that this attribute needs to be quoted when used.  Like so:
     *
     *     "stroke-width": 12,
     */

    /**
     * @cfg {String} font Used with text type sprites. The full font description.
     * Uses the same syntax as the CSS font parameter
     */

    /**
     * @cfg {String} text The actual text to render in text sprites.
     */

    /**
     * @cfg {String} src Path to the image to show in image sprites.
     */

    /**
     * @cfg {String/String[]} group The group that this sprite belongs to, or an array of groups.
     * Only relevant when added to a {@link Ext.draw.Surface Surface}.
     */

    /**
     * @cfg {Boolean} draggable True to make the sprite draggable.
     */

    dirty: false,
    dirtyHidden: false,
    dirtyTransform: false,
    dirtyPath: true,
    dirtyFont: true,
    zIndexDirty: true,

    /**
     * @property {Boolean} isSprite
     * `true` in this class to identify an object as an instantiated Sprite, or subclass thereof.
     */
    isSprite: true,
    zIndex: 0,
    fontProperties: [
        'font',
        'font-size',
        'font-weight',
        'font-style',
        'font-family',
        'text-anchor',
        'text'
    ],
    pathProperties: [
        'x',
        'y',
        'd',
        'path',
        'height',
        'width',
        'radius',
        'r',
        'rx',
        'ry',
        'cx',
        'cy'
    ],

    /**
     * @event
     * Fires before the sprite is destroyed. Return false from an event handler to stop the destroy.
     * @param {Ext.draw.Sprite} this
     */

    /**
     * @event
     * Fires after the sprite is destroyed.
     * @param {Ext.draw.Sprite} this
     */

    /**
     * @event
     * Fires after the sprite markup is rendered.
     * @param {Ext.draw.Sprite} this
     */

    /**
     * @event
     * @inheritdoc Ext.dom.Element#mousedown
     */

    /**
     * @event
     * @inheritdoc Ext.dom.Element#mouseup
     */

    /**
     * @event
     * @inheritdoc Ext.dom.Element#mouseover
     */

    /**
     * @event
     * @inheritdoc Ext.dom.Element#mouseout
     */

    /**
     * @event
     * @inheritdoc Ext.dom.Element#mousemove
     */

    /**
     * @event
     * @inheritdoc Ext.dom.Element#click
     */

    constructor: function(config) {
        var me = this;
        config = Ext.merge({}, config || {});
        me.id = Ext.id(null, 'ext-sprite-');
        me.transformations = [];
        Ext.copyTo(this, config, 'surface,group,type,draggable');
        //attribute bucket
        me.bbox = {};
        me.attr = {
            zIndex: 0,
            translation: {
                x: null,
                y: null
            },
            rotation: {
                degrees: null,
                x: null,
                y: null
            },
            scaling: {
                x: null,
                y: null,
                cx: null,
                cy: null
            }
        };
        //delete not bucket attributes
        delete config.surface;
        delete config.group;
        delete config.type;
        delete config.draggable;
        me.setAttributes(config);

        me.mixins.observable.constructor.apply(this, arguments);
    },

    /**
     * @property {Ext.dd.DragSource} dd
     * If this Sprite is configured {@link #draggable}, this property will contain
     * an instance of {@link Ext.dd.DragSource} which handles dragging the Sprite.
     *
     * The developer must provide implementations of the abstract methods of {@link Ext.dd.DragSource}
     * in order to supply behaviour for each stage of the drag/drop process. See {@link #draggable}.
     */

    initDraggable: function() {
        var me = this;
        //create element if it doesn't exist.
        if (!me.el) {
            me.surface.createSpriteElement(me);
        }
        me.dd = new Ext.draw.SpriteDD(me, Ext.isBoolean(me.draggable) ? null : me.draggable);
        me.on('beforedestroy', me.dd.destroy, me.dd);
    },

    /**
     * Change the attributes of the sprite.
     *
     * ## Translation
     *
     * For translate, the configuration object contains x and y attributes that indicate where to
     * translate the object. For example:
     *
     *     sprite.setAttributes({
     *       translate: {
     *        x: 10,
     *        y: 10
     *       }
     *     }, true);
     *
     *
     * ## Rotation
     *
     * For rotation, the configuration object contains x and y attributes for the center of the rotation (which are optional),
     * and a `degrees` attribute that specifies the rotation in degrees. For example:
     *
     *     sprite.setAttributes({
     *       rotate: {
     *        degrees: 90
     *       }
     *     }, true);
     *
     * That example will create a 90 degrees rotation using the centroid of the Sprite as center of rotation, whereas:
     *
     *     sprite.setAttributes({
     *       rotate: {
     *        x: 0,
     *        y: 0,
     *        degrees: 90
     *       }
     *     }, true);
     *
     * will create a rotation around the `(0, 0)` axis.
     *
     *
     * ## Scaling
     *
     * For scaling, the configuration object contains x and y attributes for the x-axis and y-axis scaling. For example:
     *
     *     sprite.setAttributes({
     *       scale: {
     *        x: 10,
     *        y: 3
     *       }
     *     }, true);
     *
     * You can also specify the center of scaling by adding `cx` and `cy` as properties:
     *
     *     sprite.setAttributes({
     *       scale: {
     *        cx: 0,
     *        cy: 0,
     *        x: 10,
     *        y: 3
     *       }
     *     }, true);
     *
     * That last example will scale a sprite taking as centers of scaling the `(0, 0)` coordinate.
     *
     * @param {Object} attrs attributes to be changed on the sprite.
     * @param {Boolean} redraw Flag to immediately draw the change.
     * @return {Ext.draw.Sprite} this
     */
    setAttributes: function(attrs, redraw) {
        var me = this,
            fontProps = me.fontProperties,
            fontPropsLength = fontProps.length,
            pathProps = me.pathProperties,
            pathPropsLength = pathProps.length,
            hasSurface = !!me.surface,
            custom = hasSurface && me.surface.customAttributes || {},
            spriteAttrs = me.attr,
            dirtyBBox = false,
            attr, i, newTranslation, translation, newRotate, rotation, newScaling, scaling;

        attrs = Ext.apply({}, attrs);
        for (attr in custom) {
            if (attrs.hasOwnProperty(attr) && typeof custom[attr] == "function") {
                Ext.apply(attrs, custom[attr].apply(me, [].concat(attrs[attr])));
            }
        }

        // Flag a change in hidden
        if (!!attrs.hidden !== !!spriteAttrs.hidden) {
            me.dirtyHidden = true;
        }

        // Flag path change
        for (i = 0; i < pathPropsLength; i++) {
            attr = pathProps[i];
            if (attr in attrs && attrs[attr] !== spriteAttrs[attr]) {
                me.dirtyPath = true;
                dirtyBBox = true;
                break;
            }
        }

        // Flag zIndex change
        if ('zIndex' in attrs) {
            me.zIndexDirty = true;
        }

        // Flag font/text change
        if ('text' in attrs) {
            me.dirtyFont = true;
            dirtyBBox = true;
            attrs.text = me.transformText(attrs.text);
        }

        for (i = 0; i < fontPropsLength; i++) {
            attr = fontProps[i];
            if (attr in attrs && attrs[attr] !== spriteAttrs[attr]) {
                me.dirtyFont = true;
                dirtyBBox = true;
                break;
            }
        }

        newTranslation = attrs.translation || attrs.translate;
        delete attrs.translate;
        delete attrs.translation;
        translation = spriteAttrs.translation;
        if (newTranslation) {
            if (('x' in newTranslation && newTranslation.x !== translation.x) ||
                ('y' in newTranslation && newTranslation.y !== translation.y)) {
                me.dirtyTransform = true;
                translation.x = newTranslation.x;
                translation.y = newTranslation.y;
            }
        }

        newRotate = attrs.rotation || attrs.rotate;
        rotation = spriteAttrs.rotation;
        delete attrs.rotate;
        delete attrs.rotation;
        if (newRotate) {
            if (('x' in newRotate && newRotate.x !== rotation.x) ||
                ('y' in newRotate && newRotate.y !== rotation.y) ||
                ('degrees' in newRotate && newRotate.degrees !== rotation.degrees)) {
                me.dirtyTransform = true;
                rotation.x = newRotate.x;
                rotation.y = newRotate.y;
                rotation.degrees = newRotate.degrees;
            }
        }

        newScaling = attrs.scaling || attrs.scale;
        scaling = spriteAttrs.scaling;
        delete attrs.scale;
        delete attrs.scaling;
        if (newScaling) {
            if (('x' in newScaling && newScaling.x !== scaling.x) ||
                ('y' in newScaling && newScaling.y !== scaling.y) ||
                ('cx' in newScaling && newScaling.cx !== scaling.cx) ||
                ('cy' in newScaling && newScaling.cy !== scaling.cy)) {
                me.dirtyTransform = true;
                scaling.x = newScaling.x;
                scaling.y = newScaling.y;
                scaling.cx = newScaling.cx;
                scaling.cy = newScaling.cy;
            }
        }

        // If the bbox is changed, then the bbox based transforms should be invalidated.
        if (!me.dirtyTransform && dirtyBBox) {
            if (spriteAttrs.scaling.x === null ||
                spriteAttrs.scaling.y === null ||
                spriteAttrs.rotation.y === null ||
                spriteAttrs.rotation.y === null) {
                me.dirtyTransform = true;
            }
        }

        Ext.apply(spriteAttrs, attrs);
        me.dirty = true;

        if (redraw === true && hasSurface) {
            me.redraw();
        }
        return this;
    },
    
    transformText: Ext.identityFn,

    /**
     * Retrieves the bounding box of the sprite.
     * This will be returned as an object with x, y, width, and height properties.
     * @return {Object} bbox
     */
    getBBox: function() {
        return this.surface.getBBox(this);
    },

    /**
     * Set the text of a Text Sprite.
     * @param {String} text The text to display.
     * @return {Ext.draw.Sprite} this
     */
    setText: function(text) {
        this.attr.text = text; 
        this.surface.applyAttrs(this);
        return this;
    },

    /**
     * Hides the sprite.
     * @param {Boolean} redraw Flag to immediately draw the change.
     * @return {Ext.draw.Sprite} this
     */
    hide: function(redraw) {
        this.setAttributes({
            hidden: true
        }, redraw);
        return this;
    },

    /**
     * Shows the sprite.
     * @param {Boolean} redraw Flag to immediately draw the change.
     * @return {Ext.draw.Sprite} this
     */
    show: function(redraw) {
        this.setAttributes({
            hidden: false
        }, redraw);
        return this;
    },

    /**
     * Removes the sprite.
     * @return {Boolean} True if sprite was successfully removed.
     * False when there was no surface to remove it from.
     */
    remove: function() {
        if (this.surface) {
            this.surface.remove(this);
            return true;
        }
        return false;
    },

    onRemove: function() {
        this.surface.onRemove(this);
    },

    /**
     * Removes the sprite and clears all listeners.
     */
    destroy: function() {
        var me = this;
        if (me.fireEvent('beforedestroy', me) !== false) {
            me.remove();
            me.surface.onDestroy(me);
            me.clearListeners();
            me.fireEvent('destroy');
        }
    },

    /**
     * Redraws the sprite.
     * @return {Ext.draw.Sprite} this
     */
    redraw: function() {
        var me = this,
            changed = !me.el || me.dirty,
            surface = me.surface,
            owner;
            
        surface.renderItem(me);
        // This would be better handled higher up in the hierarchy, but
        // we'll check these properties here for performance reasons
        // to prevent extraneous function calls
        if (changed) {
            owner = surface.owner;
            if (!me.isBackground && owner && (owner.viewBox || owner.autoSize)) {
                owner.configureSurfaceSize();
            }
        }
        return this;
    },

    /**
     * Wrapper for setting style properties, also takes single object parameter of multiple styles.
     * @param {String/Object} property The style property to be set, or an object of multiple styles.
     * @param {String} value (optional) The value to apply to the given property, or null if an object was passed.
     * @return {Ext.draw.Sprite} this
     */
    setStyle: function() {
        this.el.setStyle.apply(this.el, arguments);
        return this;
    },

    /**
     * Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.  Note this method
     * is severly limited in VML.
     * @param {String/String[]} className The CSS class to add, or an array of classes
     * @return {Ext.draw.Sprite} this
     */
    addCls: function(obj) {
        this.surface.addCls(this, obj);
        return this;
    },

    /**
     * Removes one or more CSS classes from the element.
     * @param {String/String[]} className The CSS class to remove, or an array of classes.  Note this method
     * is severly limited in VML.
     * @return {Ext.draw.Sprite} this
     */
    removeCls: function(obj) {
        this.surface.removeCls(this, obj);
        return this;
    }
});

Ext.define('Ext.rtl.draw.Sprite', {
    override: 'Ext.draw.Sprite',
    
    /*
     * --------Using RTL text in charts--------
     * 
     * For RTL charts, the direction of the underlying SVG/VML elements is left
     * as LTR. This is to normalize cross browser differences that occur, especially since
     * getting the directions to work is mostly as simple as just flipping the order of
     * things. As such, by default the text will display in an LTR fashion as well.
     * 
     * One of the possible solutions is to go through and add direction: rtl; on all
     * of the text elements, however there are 2 problems with this:
     * 1) It doesn't work at all with VML.
     * 2) With SVG, the text displays differently between FF & Chrome, and also
     *    it affects the positioning of the text elements as well.
     * 
     * The option we've gone for is to include the right left mark (below) and
     * prepend it to any text. It's the easiest solution and should cover enough
     * cases to be handled in the charting package. The RLM tells the browser to
     * interpret character groups in a RTL fashion. Text with RTL characters will
     * display correctly whether in RTL or LTR mode, the RLM affects how other characters
     * are displayed around it.
     * 
     * Let's take the string (you'll need to paste these in browsers, somewhat of
     * a pain to get them to show up correctly in the LTR editor):
     * "10 \u05E9\u05DC\u05DD"
     * 
     * The above is how it will be displayed without the RLM.
     * With the RLM, it will be display as:
     * 
     * "\u200F10 \u05E9\u05DC\u05DD"
     * 
     * As you can see, the ordering of the Hebrew characters do
     * not change, however the surrounding characters move around
     * relative to what's already there.
     */
    
    // This character is the right to left mark
    // http://en.wikipedia.org/wiki/Right-to-left_mark
    // It is used to group characters in an RTL manner
    RLM: '\u200F',
    
    // A simple regex to match most strong RTL characters. Indicates that
    // the string contains RTL characters
    rtlRe: /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/,
    
    transformText: function(text) {
        var me = this;
        if (text && me.surface.isRtl && !Ext.isNumber(text) && me.rtlRe.test(text)) {
            // IE9m will display a strange visual artefact when showing
            // text with the RLM and there are no RTL characters in the string.
            // IE6 & 7 will still show the artefact, it seems to be unavoidable.
            return me.RLM + text;
        }
        return me.callParent(arguments);
    }    
});

/**
 * This class encapsulates a drawn text item as rendered by the Ext.draw package within a Component which can be
 * then used anywhere in an ExtJS application just like any other Component.
 *
 * ## Example usage
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Panel with VerticalTextItem',
 *         width: 300,
 *         height: 200,
 *         lbar: {
 *             layout: {
 *                 align: 'center'
 *             },
 *             items: [{
 *                 xtype: 'text',
 *                 text: 'Sample VerticalTextItem',
 *                 degrees: 90
 *             }]
 *         },
 *         renderTo: Ext.getBody()
 *     });
 *
 * @constructor
 * Creates a new Text Component
 * @param {Object} text A config object containing a `text` property, a `degrees` property,
 * and, optionally, a `styleSelector` property which specifies a selector which provides CSS rules to
 * give font family, size and color to the drawn text.
 */
Ext.define('Ext.draw.Text', {
    extend: 'Ext.draw.Component',
    uses: ['Ext.util.CSS'],
    alias: 'widget.text',

    /**
     * @cfg {String} text
     * The text to display (html tags are <b>not</b> accepted)
     */
    text: '',

    /**
     * @cfg {String} styleSelector
     * A CSS selector string which matches a style rule in the document stylesheet from which
     * the text's font properties are read.
     *
     * **Drawn** text is not styled by CSS, but by properties set during its construction, so these styles
     * must be programatically read from a stylesheet rule found via a selector at construction time.
     */

    /**
     * @cfg {Number} degrees
     * The angle by which to initially rotate the text clockwise. Defaults to zero.
     */

    focusable: false,
    viewBox: false,
    autoSize: true,
    baseCls: Ext.baseCSSPrefix + 'surface ' + Ext.baseCSSPrefix + 'draw-text',

    initComponent: function() {
        var me = this;

        me.textConfig = Ext.apply({
            type: 'text',
            text: me.text,
            rotate: {
                degrees: me.degrees || 0
            }
        }, me.textStyle);
        Ext.apply(me.textConfig, me.getStyles(me.styleSelectors || me.styleSelector));

        // Surface is created from the *initialConfig*, not the current object state,
        // So the generated items must go into the initialConfig
        me.initialConfig.items = [me.textConfig];
        me.callParent(arguments);
    },

    /**
     * @private
     * Accumulates a style object based upon the styles specified in document stylesheets
     * by an array of CSS selectors
     */
    getStyles: function(selectors) {
        selectors = Ext.Array.from(selectors);
        var i = 0,
            len = selectors.length,
            rule,
            style,
            prop,
            result = {};

        for (; i < len; i++) {
            // Get the style rule which exactly matches the selector.
            rule = Ext.util.CSS.getRule(selectors[i]);
            if (rule) {
                style = rule.style;
                if (style) {
                    Ext.apply(result, {
                        'font-family': style.fontFamily,
                        'font-weight': style.fontWeight,
                        'line-height': style.lineHeight,
                        'font-size': style.fontSize,
                        fill: style.color
                    });
                }
            }
        }
        return result;
    },

    /**
     * Sets the clockwise rotation angle relative to the horizontal axis.
     * @param {Number} degrees The clockwise angle (in degrees) from the horizontal axis
     * by which the text should be rotated.
     */
    setAngle: function(degrees) {
        var me = this,
            surface,
            sprite;
            
        if (me.rendered) {
            surface = me.surface;
            sprite = surface.items.items[0];

            me.degrees = degrees;
            sprite.setAttributes({
                rotate: {
                    degrees: degrees
                }
            }, true);
            if (me.autoSize || me.viewBox) {
                me.updateLayout();
            }
        } else {
            me.degrees = degrees;
        }
    },

    /**
     * Updates this item's text.
     * @param {String} t The text to display (html **not** accepted).
     */
    setText: function(text) {
        var me = this,
            surface,
            sprite;
            
        if (me.rendered) {
            surface = me.surface;
            sprite = surface.items.items[0];

            me.text = text || '';
            surface.remove(sprite);
            me.textConfig.type = 'text';
            me.textConfig.text = me.text;
            sprite = surface.add(me.textConfig);
            sprite.setAttributes({
                rotate: {
                    degrees: me.degrees
                }
            }, true);
            if (me.autoSize || me.viewBox) {
                me.updateLayout();
            }
        } else {
            me.on({
                render: function() {
                    me.setText(text);
                },
                single: true
            });
        }
    }
});

/**
 * Exports a {@link Ext.draw.Surface Surface} to an image. To do this,
 * the svg string must be sent to a remote server and processed.
 *
 * # Sending the data
 *
 * A post request is made to the URL. The following fields are sent:
 *
 * + width: The width of the image
 * + height: The height of the image
 * + type: The image type to save as, see {@link #supportedTypes}
 * + svg: The svg string for the surface
 *
 * # The response
 *
 * It is expected that the user will be prompted with an image download.
 * As such, the following options should be set on the server:
 *
 * + Content-Disposition: 'attachment, filename="chart.png"'
 * + Content-Type: 'image/png'
 *
 * **Important**: By default, chart data is sent to a server operated
 * by Sencha to do data processing. You may change this default by
 * setting the {@link #defaultUrl} of this class.
 * In addition, please note that this service only creates PNG images.
 */
Ext.define('Ext.draw.engine.ImageExporter', {
    singleton: true,

    /**
     * @property {String} [defaultUrl="http://svg.sencha.io"]
     * The default URL to submit the form request.
     */
    defaultUrl: 'http://svg.sencha.io',

    /**
     * @property {Array} [supportedTypes=["image/png", "image/jpeg"]]
     * A list of export types supported by the server
     */
    supportedTypes: ['image/png', 'image/jpeg'],

    /**
     * @property {String} [widthParam="width"]
     * The name of the width parameter to be sent to the server.
     * The Sencha IO server expects it to be the default value.
     */
    widthParam: 'width',

    /**
     * @property {String} [heightParam="height"]
     * The name of the height parameter to be sent to the server.
     * The Sencha IO server expects it to be the default value.
     */
    heightParam: 'height',

    /**
     * @property {String} [typeParam="type"]
     * The name of the type parameter to be sent to the server.
     * The Sencha IO server expects it to be the default value.
     */
    typeParam: 'type',

    /**
     * @property {String} [svgParam="svg"]
     * The name of the svg parameter to be sent to the server.
     * The Sencha IO server expects it to be the default value.
     */
    svgParam: 'svg',

    formCls: Ext.baseCSSPrefix + 'hide-display',

    /**
     * Exports the surface to an image
     * @param {Ext.draw.Surface} surface The surface to export
     * @param {Object} [config] The following config options are supported:
     *
     * @param {Number} config.width A width to send to the server for
     * configuring the image width.
     *
     * @param {Number} config.height A height to send to the server for
     * configuring the image height.
     *
     * @param {String} config.url The url to post the data to. Defaults to
     * the {@link #defaultUrl} configuration on the class.
     *
     * @param {String} config.type The type of image to export. See the
     * {@link #supportedTypes}
     *
     * @param {String} config.widthParam The name of the width parameter to send
     * to the server. Defaults to {@link #widthParam}
     *
     * @param {String} config.heightParam The name of the height parameter to send
     * to the server. Defaults to {@link #heightParam}
     *
     * @param {String} config.typeParam The name of the type parameter to send
     * to the server. Defaults to {@link #typeParam}
     *
     * @param {String} config.svgParam The name of the svg parameter to send
     * to the server. Defaults to {@link #svgParam}
     *
     * @return {Boolean} True if the surface was successfully sent to the server.
     */
    generate: function(surface, config) {
        config = config || {};
        var me = this,
            type = config.type,
            form;

        if (Ext.Array.indexOf(me.supportedTypes, type) === -1) {
            return false;
        }

        form = Ext.getBody().createChild({
            tag: 'form',
            method: 'POST',
            action: config.url || me.defaultUrl,
            cls: me.formCls,
            children: [{
                tag: 'input',
                type: 'hidden',
                name: config.widthParam || me.widthParam,
                value: config.width || surface.width
            }, {
                tag: 'input',
                type: 'hidden',
                name: config.heightParam || me.heightParam,
                value: config.height || surface.height
            }, {
                tag: 'input',
                type: 'hidden',
                name: config.typeParam || me.typeParam,
                value: type
            }, {
                tag: 'input',
                type: 'hidden',
                name: config.svgParam || me.svgParam
            }]
        });

        // Assign the data on the value so it doesn't get messed up in the html insertion
        form.last(null, true).value = Ext.draw.engine.SvgExporter.generate(surface);

        form.dom.submit();
        form.remove();
        return true;
    }

});

/**
 * Provides specific methods to draw with SVG.
 */
Ext.define('Ext.draw.engine.Svg', {

    /* Begin Definitions */

    extend: 'Ext.draw.Surface',

    requires: ['Ext.draw.Draw', 'Ext.draw.Sprite', 'Ext.draw.Matrix', 'Ext.Element'],

    /* End Definitions */

    engine: 'Svg',

    trimRe: /^\s+|\s+$/g,
    spacesRe: /\s+/,
    xlink: "http:/" + "/www.w3.org/1999/xlink",

    translateAttrs: {
        radius: "r",
        radiusX: "rx",
        radiusY: "ry",
        path: "d",
        lineWidth: "stroke-width",
        fillOpacity: "fill-opacity",
        strokeOpacity: "stroke-opacity",
        strokeLinejoin: "stroke-linejoin"
    },

    parsers: {},

    minDefaults: {
        circle: {
            cx: 0,
            cy: 0,
            r: 0,
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        ellipse: {
            cx: 0,
            cy: 0,
            rx: 0,
            ry: 0,
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        rect: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            rx: 0,
            ry: 0,
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        text: {
            x: 0,
            y: 0,
            "text-anchor": "start",
            "font-family": null,
            "font-size": null,
            "font-weight": null,
            "font-style": null,
            fill: "#000",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        path: {
            d: "M0,0",
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        image: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            preserveAspectRatio: "none",
            opacity: null
        }
    },

    createSvgElement: function(type, attrs) {
        var el = this.domRef.createElementNS("http:/" + "/www.w3.org/2000/svg", type),
            key;
        if (attrs) {
            for (key in attrs) {
                el.setAttribute(key, String(attrs[key]));
            }
        }
        return el;
    },

    createSpriteElement: function(sprite) {
        // Create svg element and append to the DOM.
        var el = this.createSvgElement(sprite.type);
        el.id = sprite.id;
        if (el.style) {
            el.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
        }
        sprite.el = Ext.get(el);
        this.applyZIndex(sprite); //performs the insertion
        sprite.matrix = new Ext.draw.Matrix();
        sprite.bbox = {
            plain: 0,
            transform: 0
        };
        this.applyAttrs(sprite);
        this.applyTransformations(sprite);
        sprite.fireEvent("render", sprite);
        return el;
    },
    
    getBBoxText: function (sprite) {
        var bbox = {},
            bb, height, width, i, ln, el;

        if (sprite && sprite.el) {
            el = sprite.el.dom;
            try {
                bbox = el.getBBox();
                return bbox;
            } catch(e) {
                // Firefox 3.0.x plays badly here
            }
            bbox = {x: bbox.x, y: Infinity, width: 0, height: 0};
            ln = el.getNumberOfChars();
            for (i = 0; i < ln; i++) {
                bb = el.getExtentOfChar(i);
                bbox.y = Math.min(bb.y, bbox.y);
                height = bb.y + bb.height - bbox.y;
                bbox.height = Math.max(bbox.height, height);
                width = bb.x + bb.width - bbox.x;
                bbox.width = Math.max(bbox.width, width);
            }
            return bbox;
        }
    },

    hide: function() {
        Ext.get(this.el).hide();
    },

    show: function() {
        Ext.get(this.el).show();
    },

    hidePrim: function(sprite) {
        this.addCls(sprite, Ext.baseCSSPrefix + 'hide-visibility');
    },

    showPrim: function(sprite) {
        this.removeCls(sprite, Ext.baseCSSPrefix + 'hide-visibility');
    },

    getDefs: function() {
        return this._defs || (this._defs = this.createSvgElement("defs"));
    },

    transform: function(sprite, matrixOnly) {
        var me = this,
            matrix = new Ext.draw.Matrix(),
            transforms = sprite.transformations,
            transformsLength = transforms.length,
            i = 0,
            transform, type;
            
        for (; i < transformsLength; i++) {
            transform = transforms[i];
            type = transform.type;
            if (type == "translate") {
                matrix.translate(transform.x, transform.y);
            }
            else if (type == "rotate") {
                matrix.rotate(transform.degrees, transform.x, transform.y);
            }
            else if (type == "scale") {
                matrix.scale(transform.x, transform.y, transform.centerX, transform.centerY);
            }
        }
        sprite.matrix = matrix;
        if (!matrixOnly) {
            sprite.el.set({transform: matrix.toSvg()});
        }
    },

    setSize: function(width, height) {
        var me = this,
            el = me.el;
        
        width = +width || me.width;
        height = +height || me.height;
        me.width = width;
        me.height = height;

        el.setSize(width, height);
        el.set({
            width: width,
            height: height
        });
        me.callParent([width, height]);
    },

    /**
     * Get the region for the surface's canvas area
     * @returns {Ext.util.Region}
     */
    getRegion: function() {
        // Mozilla requires using the background rect because the svg element returns an
        // incorrect region. Webkit gives no region for the rect and must use the svg element.
        var svgXY = this.el.getXY(),
            rectXY = this.bgRect.getXY(),
            max = Math.max,
            x = max(svgXY[0], rectXY[0]),
            y = max(svgXY[1], rectXY[1]);
        return {
            left: x,
            top: y,
            right: x + this.width,
            bottom: y + this.height
        };
    },

    onRemove: function(sprite) {
        if (sprite.el) {
            sprite.el.destroy();
            delete sprite.el;
        }
        this.callParent(arguments);
    },
    
    setViewBox: function(x, y, width, height) {
        if (isFinite(x) && isFinite(y) && isFinite(width) && isFinite(height)) {
            this.callParent(arguments);
            this.el.dom.setAttribute("viewBox", [x, y, width, height].join(" "));
        }
    },

    render: function (container) {
        var me = this,
            cfg, el, defs, bgRect, webkitRect;
            
        if (!me.el) {
            cfg = {
                xmlns: "http:/" + "/www.w3.org/2000/svg",
                version: 1.1,
                width: me.width || 0,
                height: me.height || 0
            };
            
            if (me.forceLtr) {
                cfg.direction = 'ltr';
            }
            
            el = me.createSvgElement('svg', cfg);
            defs = me.getDefs();

            // Create a rect that is always the same size as the svg root; this serves 2 purposes:
            // (1) It allows mouse events to be fired over empty areas in Webkit, and (2) we can
            // use it rather than the svg element for retrieving the correct client rect of the
            // surface in Mozilla (see https://bugzilla.mozilla.org/show_bug.cgi?id=530985)
            bgRect = me.createSvgElement("rect", {
                width: "100%",
                height: "100%",
                fill: "#000",
                stroke: "none",
                opacity: 0
            });
            
            if (Ext.isSafari3) {
                // Rect that we will show/hide to fix old WebKit bug with rendering issues.
                webkitRect = me.createSvgElement("rect", {
                    x: -10,
                    y: -10,
                    width: "110%",
                    height: "110%",
                    fill: "none",
                    stroke: "#000"
                });
            }
            el.appendChild(defs);
            if (Ext.isSafari3) {
                el.appendChild(webkitRect);
            }
            el.appendChild(bgRect);
            container.appendChild(el);
            me.el = Ext.get(el);
            me.bgRect = Ext.get(bgRect);
            if (Ext.isSafari3) {
                me.webkitRect = Ext.get(webkitRect);
                me.webkitRect.hide();
            }
            me.el.on({
                scope: me,
                mouseup: me.onMouseUp,
                mousedown: me.onMouseDown,
                mouseover: me.onMouseOver,
                mouseout: me.onMouseOut,
                mousemove: me.onMouseMove,
                mouseenter: me.onMouseEnter,
                mouseleave: me.onMouseLeave,
                click: me.onClick,
                dblclick: me.onDblClick
            });
        }
        me.renderAll();
    },

    // private
    onMouseEnter: function(e) {
        if (this.el.parent().getRegion().contains(e.getPoint())) {
            this.fireEvent('mouseenter', e);
        }
    },

    // private
    onMouseLeave: function(e) {
        if (!this.el.parent().getRegion().contains(e.getPoint())) {
            this.fireEvent('mouseleave', e);
        }
    },
    // @private - Normalize a delegated single event from the main container to each sprite and sprite group
    processEvent: function(name, e) {
        var target = e.getTarget(),
            surface = this.surface,
            sprite;

        this.fireEvent(name, e);
        // We wrap text types in a tspan, sprite is the parent.
        if (target.nodeName == "tspan" && target.parentNode) {
            target = target.parentNode;
        }
        sprite = this.items.get(target.id);
        if (sprite) {
            sprite.fireEvent(name, sprite, e);
        }
    },

    /* @private - Wrap SVG text inside a tspan to allow for line wrapping.  In addition this normallizes
     * the baseline for text the vertical middle of the text to be the same as VML.
     */
    tuneText: function (sprite, attrs) {
        var el = sprite.el.dom,
            tspans = [],
            height, tspan, text, i, ln, texts, factor, x;

        if (attrs.hasOwnProperty("text")) {
            //only create new tspans for text lines if the text has been 
            //updated or if it's the first time we're setting the text
            //into the sprite.

            //get the actual rendered text.
            text = sprite.tspans && Ext.Array.map(sprite.tspans, function(t) { return t.textContent; }).join('');

            if (!sprite.tspans || attrs.text != text) {
                tspans = this.setText(sprite, attrs.text);
                sprite.tspans = tspans;
            //for all other cases reuse the tspans previously created.
            } else {
                tspans = sprite.tspans || [];
            }
        }
        // Normalize baseline via a DY shift of first tspan. Shift other rows by height * line height (1.2)
        if (tspans.length) {
            height = this.getBBoxText(sprite).height;
            x = sprite.el.dom.getAttribute("x");
            for (i = 0, ln = tspans.length; i < ln; i++) {
                // The text baseline for FireFox 3.0 and 3.5 is different than other SVG implementations
                // so we are going to normalize that here
                factor = (Ext.isFF3_0 || Ext.isFF3_5) ? 2 : 4;
                tspans[i].setAttribute("x", x);
                tspans[i].setAttribute("dy", i ? height * 1.2 : height / factor);
            }
            sprite.dirty = true;
        }
    },

    setText: function(sprite, textString) {
         var me = this,
             el = sprite.el.dom,
             tspans = [],
             height, tspan, text, i, ln, texts;
        
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        // Wrap each row into tspan to emulate rows
        texts = String(textString).split("\n");
        for (i = 0, ln = texts.length; i < ln; i++) {
            text = texts[i];
            if (text) {
                tspan = me.createSvgElement("tspan");
                tspan.appendChild(document.createTextNode(Ext.htmlDecode(text)));
                el.appendChild(tspan);
                tspans[i] = tspan;
            }
        }
        return tspans;
    },

    renderAll: function() {
        this.items.each(this.renderItem, this);
    },

    renderItem: function (sprite) {
        if (!this.el) {
            return;
        }
        if (!sprite.el) {
            this.createSpriteElement(sprite);
        }
        if (sprite.zIndexDirty) {
            this.applyZIndex(sprite);
        }
        if (sprite.dirty) {
            this.applyAttrs(sprite);
            if (sprite.dirtyTransform) {
                this.applyTransformations(sprite);
            }
        }
    },

    redraw: function(sprite) {
        sprite.dirty = sprite.zIndexDirty = true;
        this.renderItem(sprite);
    },

    applyAttrs: function (sprite) {
        var me = this,
            el = sprite.el,
            group = sprite.group,
            sattr = sprite.attr,
            parsers = me.parsers,
            //Safari does not handle linear gradients correctly in quirksmode
            //ref: https://bugs.webkit.org/show_bug.cgi?id=41952
            //ref: EXTJSIV-1472
            gradientsMap = me.gradientsMap || {},
            safariFix = Ext.isSafari && !Ext.isStrict,
            groups, i, ln, attrs, font, key, style, name, rect;

        if (group) {
            groups = [].concat(group);
            ln = groups.length;
            for (i = 0; i < ln; i++) {
                group = groups[i];
                me.getGroup(group).add(sprite);
            }
            delete sprite.group;
        }
        attrs = me.scrubAttrs(sprite) || {};

        // if (sprite.dirtyPath) {
            sprite.bbox.plain = 0;
            sprite.bbox.transform = 0;
            if (sprite.type == "circle" || sprite.type == "ellipse") {
                attrs.cx = attrs.cx || attrs.x;
                attrs.cy = attrs.cy || attrs.y;
            }
            else if (sprite.type == "rect") {
                attrs.rx = attrs.ry = attrs.r;
            }
            else if (sprite.type == "path" && attrs.d) {
                attrs.d = Ext.draw.Draw.pathToString(Ext.draw.Draw.pathToAbsolute(attrs.d));
            }
            sprite.dirtyPath = false;
        // }
        // else {
        //     delete attrs.d;
        // }

        if (attrs['clip-rect']) {
            me.setClip(sprite, attrs);
            delete attrs['clip-rect'];
        }
        if (sprite.type == 'text' && attrs.font && sprite.dirtyFont) {
            el.set({ style: "font: " + attrs.font});
        }
        if (sprite.type == "image") {
            el.dom.setAttributeNS(me.xlink, "href", attrs.src);
        }
        Ext.applyIf(attrs, me.minDefaults[sprite.type]);

        if (sprite.dirtyHidden) {
            (sattr.hidden) ? me.hidePrim(sprite) : me.showPrim(sprite);
            sprite.dirtyHidden = false;
        }
        for (key in attrs) {
            if (attrs.hasOwnProperty(key) && attrs[key] != null) {
                //Safari does not handle linear gradients correctly in quirksmode
                //ref: https://bugs.webkit.org/show_bug.cgi?id=41952
                //ref: EXTJSIV-1472
                //if we're Safari in QuirksMode and we're applying some color attribute and the value of that
                //attribute is a reference to a gradient then assign a plain color to that value instead of the gradient.
                if (safariFix && ('color|stroke|fill'.indexOf(key) > -1) && (attrs[key] in gradientsMap)) {
                    attrs[key] = gradientsMap[attrs[key]];
                }
                //hidden is not a proper SVG attribute.
                if (key == 'hidden' && sprite.type == 'text') {
                    continue;
                }
                if (key in parsers) {
                    el.dom.setAttribute(key, parsers[key](attrs[key], sprite, me));
                } else {
                    el.dom.setAttribute(key, attrs[key]);
                }
            }
        }
        
        if (sprite.type == 'text') {
            me.tuneText(sprite, attrs);
        }
        sprite.dirtyFont = false;

        //set styles
        style = sattr.style;
        if (style) {
            el.setStyle(style);
        }

        sprite.dirty = false;

        if (Ext.isSafari3) {
            // Refreshing the view to fix bug EXTJSIV-1: rendering issue in old Safari 3
            me.webkitRect.show();
            setTimeout(function () {
                me.webkitRect.hide();
            });
        }
    },

    setClip: function(sprite, params) {
        var me = this,
            rect = params["clip-rect"],
            clipEl, clipPath;
        if (rect) {
            if (sprite.clip) {
                sprite.clip.parentNode.parentNode.removeChild(sprite.clip.parentNode);
            }
            clipEl = me.createSvgElement('clipPath');
            clipPath = me.createSvgElement('rect');
            clipEl.id = Ext.id(null, 'ext-clip-');
            clipPath.setAttribute("x", rect.x);
            clipPath.setAttribute("y", rect.y);
            clipPath.setAttribute("width", rect.width);
            clipPath.setAttribute("height", rect.height);
            clipEl.appendChild(clipPath);
            me.getDefs().appendChild(clipEl);
            sprite.el.dom.setAttribute("clip-path", "url(#" + clipEl.id + ")");
            sprite.clip = clipPath;
        } 
        // if (!attrs[key]) {
        //     var clip = Ext.getDoc().dom.getElementById(sprite.el.getAttribute("clip-path").replace(/(^url\(#|\)$)/g, ""));
        //     clip && clip.parentNode.removeChild(clip);
        //     sprite.el.setAttribute("clip-path", "");
        //     delete attrss.clip;
        // }
    },

    /**
     * Insert or move a given sprite's element to the correct place in the DOM list for its zIndex
     * @param {Ext.draw.Sprite} sprite
     */
    applyZIndex: function(sprite) {
        var me = this,
            items = me.items,
            idx = items.indexOf(sprite),
            el = sprite.el,
            prevEl;
        if (me.el.dom.childNodes[idx + 2] !== el.dom) { //shift by 2 to account for defs and bg rect
            if (idx > 0) {
                // Find the first previous sprite which has its DOM element created already
                do {
                    prevEl = items.getAt(--idx).el;
                } while (!prevEl && idx > 0);
            }
            el.insertAfter(prevEl || me.bgRect);
        }
        sprite.zIndexDirty = false;
    },

    createItem: function (config) {
        var sprite = new Ext.draw.Sprite(config);
        sprite.surface = this;
        return sprite;
    },

    addGradient: function(gradient) {
        gradient = Ext.draw.Draw.parseGradient(gradient);
        var me = this,
            ln = gradient.stops.length,
            vector = gradient.vector,
            //Safari does not handle linear gradients correctly in quirksmode
            //ref: https://bugs.webkit.org/show_bug.cgi?id=41952
            //ref: EXTJSIV-1472
            usePlain = Ext.isSafari && !Ext.isStrict,
            gradientEl, stop, stopEl, i, gradientsMap;
            
        gradientsMap = me.gradientsMap || {};
        
        if (!usePlain) {
            if (gradient.type == "linear") {
                gradientEl = me.createSvgElement("linearGradient");
                gradientEl.setAttribute("x1", vector[0]);
                gradientEl.setAttribute("y1", vector[1]);
                gradientEl.setAttribute("x2", vector[2]);
                gradientEl.setAttribute("y2", vector[3]);
            }
            else {
                gradientEl = me.createSvgElement("radialGradient");
                gradientEl.setAttribute("cx", gradient.centerX);
                gradientEl.setAttribute("cy", gradient.centerY);
                gradientEl.setAttribute("r", gradient.radius);
                if (Ext.isNumber(gradient.focalX) && Ext.isNumber(gradient.focalY)) {
                    gradientEl.setAttribute("fx", gradient.focalX);
                    gradientEl.setAttribute("fy", gradient.focalY);
                }
            }
            gradientEl.id = gradient.id;
            me.getDefs().appendChild(gradientEl);
            for (i = 0; i < ln; i++) {
                stop = gradient.stops[i];
                stopEl = me.createSvgElement("stop");
                stopEl.setAttribute("offset", stop.offset + "%");
                stopEl.setAttribute("stop-color", stop.color);
                stopEl.setAttribute("stop-opacity",stop.opacity);
                gradientEl.appendChild(stopEl);
            }
        } else {
            gradientsMap['url(#' + gradient.id + ')'] = gradient.stops[0].color;
        }
        me.gradientsMap = gradientsMap;
    },

    /**
     * Checks if the specified CSS class exists on this element's DOM node.
     * @param {Ext.draw.Sprite} sprite The sprite to look into.
     * @param {String} className The CSS class to check for
     * @return {Boolean} True if the class exists, else false
     */
    hasCls: function(sprite, className) {
        return className && (' ' + (sprite.el.dom.getAttribute('class') || '') + ' ').indexOf(' ' + className + ' ') != -1;
    },

    addCls: function(sprite, className) {
        var el = sprite.el,
            i,
            len,
            v,
            cls = [],
            curCls =  el.getAttribute('class') || '';
        // Separate case is for speed
        if (!Ext.isArray(className)) {
            if (typeof className == 'string' && !this.hasCls(sprite, className)) {
                el.set({ 'class': curCls + ' ' + className });
            }
        }
        else {
            for (i = 0, len = className.length; i < len; i++) {
                v = className[i];
                if (typeof v == 'string' && (' ' + curCls + ' ').indexOf(' ' + v + ' ') == -1) {
                    cls.push(v);
                }
            }
            if (cls.length) {
                el.set({ 'class': ' ' + cls.join(' ') });
            }
        }
    },

    removeCls: function(sprite, className) {
        var me = this,
            el = sprite.el,
            curCls =  el.getAttribute('class') || '',
            i, idx, len, cls, elClasses;
        if (!Ext.isArray(className)){
            className = [className];
        }
        if (curCls) {
            elClasses = curCls.replace(me.trimRe, ' ').split(me.spacesRe);
            for (i = 0, len = className.length; i < len; i++) {
                cls = className[i];
                if (typeof cls == 'string') {
                    cls = cls.replace(me.trimRe, '');
                    idx = Ext.Array.indexOf(elClasses, cls);
                    if (idx != -1) {
                        Ext.Array.erase(elClasses, idx, 1);
                    }
                }
            }
            el.set({ 'class': elClasses.join(' ') });
        }
    },

    destroy: function() {
        var me = this;
        
        me.callParent();
        if (me.el) {
            me.el.destroy();
        }
        if (me._defs) {
            Ext.get(me._defs).destroy();
        }
        if (me.bgRect) {
            Ext.get(me.bgRect).destroy();
        }
        if (me.webkitRect) {
            Ext.get(me.webkitRect).destroy();
        }
        delete me.el;
    }
});

/**
 * A utility class for exporting a {@link Ext.draw.Surface Surface} to a string
 * that may be saved or used for processing on the server.
 *
 * @singleton
 */
Ext.define('Ext.draw.engine.SvgExporter', function(){
   var commaRe = /,/g,
       fontRegex = /(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)\s('*.*'*)/,
       rgbColorRe = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,
       rgbaColorRe = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,([\d\.]+)\)/g,
       surface, len, width, height,

   init = function(s){
       surface = s;
       len = surface.length;
       width = surface.width;
       height = surface.height;
   },
   spriteProcessor = {
       path: function(sprite){

           var attr = sprite.attr,
               path = attr.path,
               pathString = '',
               props, p, pLen;

           if (Ext.isArray(path[0])) {
               pLen = path.length;
               for (p = 0; p < pLen; p++) {
                   pathString += path[p].join(' ');
               }
           } else if (Ext.isArray(path)) {
               pathString = path.join(' ');
           } else {
               pathString = path.replace(commaRe,' ');
           }

           props = toPropertyString({
               d: pathString,
               fill: attr.fill || 'none',
               stroke: attr.stroke,
               'fill-opacity': attr.opacity,
               'stroke-width': attr['stroke-width'],
               'stroke-opacity': attr['stroke-opacity'],
               "z-index": attr.zIndex,
               transform: sprite.matrix.toSvg()
           });

           return '<path ' + props + '/>';
       },
       text: function(sprite){

           // TODO
           // implement multi line support (@see Svg.js tuneText)

           var attr = sprite.attr,
               match = fontRegex.exec(attr.font),
               size = (match && match[1]) || "12",
               // default font family is Arial
               family = (match && match[3]) || 'Arial',
               text = attr.text,
               factor = (Ext.isFF3_0 || Ext.isFF3_5) ? 2 : 4,
               tspanString = '',
               props;

           sprite.getBBox();
           tspanString += '<tspan x="' + (attr.x || '') + '" dy="';
           tspanString += (size/factor)+'">';
           tspanString += Ext.htmlEncode(text) + '</tspan>';


           props = toPropertyString({
               x: attr.x,
               y: attr.y,
               'font-size': size,
               'font-family': family,
               'font-weight': attr['font-weight'],
               'text-anchor': attr['text-anchor'],
               // if no fill property is set it will be black
               fill: attr.fill || '#000',
               'fill-opacity': attr.opacity,
               transform: sprite.matrix.toSvg()
           });



           return '<text '+ props + '>' +  tspanString + '</text>';
       },
       rect: function(sprite){

           var attr = sprite.attr,
               props =  toPropertyString({
                   x: attr.x,
                   y: attr.y,
                   rx: attr.rx,
                   ry: attr.ry,
                   width: attr.width,
                   height: attr.height,
                   fill: attr.fill || 'none',
                   'fill-opacity': attr.opacity,
                   stroke: attr.stroke,
                   'stroke-opacity': attr['stroke-opacity'],
                   'stroke-width':attr['stroke-width'],
                   transform: sprite.matrix && sprite.matrix.toSvg()
               });

           return '<rect ' + props + '/>';
       },
       circle: function(sprite){

           var attr = sprite.attr,
               props = toPropertyString({
                   cx: attr.x,
                   cy: attr.y,
                   r: attr.radius,
                   fill: attr.translation.fill || attr.fill || 'none',
                   'fill-opacity': attr.opacity,
                   stroke: attr.stroke,
                   'stroke-opacity': attr['stroke-opacity'],
                   'stroke-width':attr['stroke-width'],
                   transform: sprite.matrix.toSvg()
               });

           return '<circle ' + props + ' />';
       },
       image: function(sprite){

           var attr = sprite.attr,
               props = toPropertyString({
                   x: attr.x - (attr.width/2 >> 0),
                   y: attr.y - (attr.height/2 >> 0),
                   width: attr.width,
                   height: attr.height,
                   'xlink:href': attr.src,
                   transform: sprite.matrix.toSvg()
               });

           return '<image ' + props + ' />';
       }
   },
   svgHeader = function(){
       var svg = '<?xml version="1.0" standalone="yes"?>';
       svg += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
       return svg;
   },
   svgContent = function(){
       var svg = '<svg width="'+width+'px" height="'+height+'px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">',
           defs = '', item, itemsLen, items, gradient,
           getSvgString, colorstops, stop,
           coll, keys, colls, k, kLen, key, collI, i, j, stopsLen, sortedItems, za, zb;

       items = surface.items.items;
       itemsLen = items.length;


       getSvgString = function(node){

           var childs = node.childNodes,
               childLength = childs.length,
               i = 0,
               attrLength,
               j,
               svgString = '', child, attr, tagName, attrItem;

               for(; i < childLength; i++){
                   child = childs[i];
                   attr = child.attributes;
                   tagName = child.tagName;

                   svgString += '<' +tagName;

                   for(j = 0, attrLength = attr.length; j < attrLength; j++){
                       attrItem = attr.item(j);
                       svgString += ' '+attrItem.name+'="'+attrItem.value+'"';
                   }

                   svgString += '>';

                   if(child.childNodes.length > 0){
                       svgString += getSvgString(child);
                   }

                   svgString += '</' + tagName + '>';

               }
           return svgString;
       };


       if(surface.getDefs){
           defs = getSvgString(surface.getDefs());
       }else{
           // IE
           coll = surface.gradientsColl;
           if (coll) {
               keys  = coll.keys;
               colls = coll.items;
               k     = 0;
               kLen  = keys.length;
           }

           for (; k < kLen; k++) {
               key   = keys[k];
               collI = colls[k];

               gradient = surface.gradientsColl.getByKey(key);
               defs += '<linearGradient id="' + key + '" x1="0" y1="0" x2="1" y2="1">';

               var color = gradient.colors.replace(rgbColorRe, 'rgb($1|$2|$3)');
               color = color.replace(rgbaColorRe, 'rgba($1|$2|$3|$4)');
               colorstops = color.split(',');
               for(i=0, stopsLen = colorstops.length; i < stopsLen; i++){
                   stop = colorstops[i].split(' ');
                   color = Ext.draw.Color.fromString(stop[1].replace(/\|/g,','));
                   defs += '<stop offset="'+stop[0]+'" stop-color="' + color.toString() + '" stop-opacity="1"></stop>';
               }
               defs += '</linearGradient>';
           }
       }

       svg += '<defs>' + defs + '</defs>';

       // thats the background rectangle
       svg += spriteProcessor.rect({
           attr: {
                   width: '100%',
                   height: '100%',
                   fill: '#fff',
                   stroke: 'none',
                   opacity: '0'
           }
       });

       // Sort the items (stable sort guaranteed)
       sortedItems = new Array(itemsLen);
       for(i = 0; i < itemsLen; i++){
           sortedItems[i] = i;
       }
       sortedItems.sort(function (a, b) {
           za = items[a].attr.zIndex || 0;
           zb = items[b].attr.zIndex || 0;
           if (za == zb) {
               return a - b;
           }
           return za - zb;
       });

       for(i = 0; i < itemsLen; i++){
           item = items[sortedItems[i]];
           if(!item.attr.hidden){
               svg += spriteProcessor[item.type](item);
           }
       }

       svg += '</svg>';

       return svg;
   },
   toPropertyString = function(obj){
       var propString = '',
           key;

       for(key in obj){

           if(obj.hasOwnProperty(key) && obj[key] != null){
               propString += key +'="'+ obj[key]+'" ';
           }

       }

       return propString;
   };

   return {
       singleton: true,

       /**
        * Exports the passed surface to a SVG string representation
        * @param {Ext.draw.Surface} surface The surface to export
        * @param {Object} [config] Any configuration for the export. Currently this is
        * unused but may provide more options in the future
        * @return {String} The SVG as a string
        */
       generate: function(surface, config){
           config = config || {};
           init(surface);
           return svgHeader() + svgContent();
       }
   };
});

/**
 * Provides specific methods to draw with VML.
 */
Ext.define('Ext.draw.engine.Vml', {

    /* Begin Definitions */

    extend: 'Ext.draw.Surface',

    requires: ['Ext.draw.Draw', 'Ext.draw.Color', 'Ext.draw.Sprite', 'Ext.draw.Matrix', 'Ext.Element'],

    /* End Definitions */

    engine: 'Vml',

    map: {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"},
    bitesRe: /([clmz]),?([^clmz]*)/gi,
    valRe: /-?[^,\s\-]+/g,
    fillUrlRe: /^url\(\s*['"]?([^\)]+?)['"]?\s*\)$/i,
    pathlike: /^(path|rect)$/,
    NonVmlPathRe: /[ahqstv]/ig, // Non-VML Pathing ops
    partialPathRe: /[clmz]/g,
    fontFamilyRe: /^['"]+|['"]+$/g,
    baseVmlCls: Ext.baseCSSPrefix + 'vml-base',
    vmlGroupCls: Ext.baseCSSPrefix + 'vml-group',
    spriteCls: Ext.baseCSSPrefix + 'vml-sprite',
    measureSpanCls: Ext.baseCSSPrefix + 'vml-measure-span',
    zoom: 21600,
    coordsize: 1000,
    coordorigin: '0 0',
    zIndexShift: 0,
    // VML uses CSS z-index and therefore doesn't need sprites to be kept in zIndex order
    orderSpritesByZIndex: false,

    // @private
    // Convert an SVG standard path into a VML path
    path2vml: function (path) {
        var me = this,
            nonVML = me.NonVmlPathRe,
            map = me.map,
            val = me.valRe,
            zoom = me.zoom,
            bites = me.bitesRe,
            command = Ext.Function.bind(Ext.draw.Draw.pathToAbsolute, Ext.draw.Draw),
            res, pa, p, r, i, ii, j, jj;
        if (String(path).match(nonVML)) {
            command = Ext.Function.bind(Ext.draw.Draw.path2curve, Ext.draw.Draw);
        } else if (!String(path).match(me.partialPathRe)) {
            res = String(path).replace(bites, function (all, command, args) {
                var vals = [],
                    isMove = command.toLowerCase() == "m",
                    res = map[command];
                args.replace(val, function (value) {
                    if (isMove && vals.length === 2) {
                        res += vals + map[command == "m" ? "l" : "L"];
                        vals = [];
                    }
                    vals.push(Math.round(value * zoom));
                });
                return res + vals;
            });
            return res;
        }
        pa = command(path);
        res = [];
        for (i = 0, ii = pa.length; i < ii; i++) {
            p = pa[i];
            r = pa[i][0].toLowerCase();
            if (r == "z") {
                r = "x";
            }
            for (j = 1, jj = p.length; j < jj; j++) {
                r += Math.round(p[j] * me.zoom) + (j != jj - 1 ? "," : "");
            }
            res.push(r);
        }
        return res.join(" ");
    },

    // @private - set of attributes which need to be translated from the sprite API to the native browser API
    translateAttrs: {
        radius: "r",
        radiusX: "rx",
        radiusY: "ry",
        lineWidth: "stroke-width",
        fillOpacity: "fill-opacity",
        strokeOpacity: "stroke-opacity",
        strokeLinejoin: "stroke-linejoin"
    },

    // @private - Minimun set of defaults for different types of sprites.
    minDefaults: {
        circle: {
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        ellipse: {
            cx: 0,
            cy: 0,
            rx: 0,
            ry: 0,
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        rect: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            rx: 0,
            ry: 0,
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        text: {
            x: 0,
            y: 0,
            "text-anchor": "start",
            font: '10px "Arial"',
            fill: "#000",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        path: {
            d: "M0,0",
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        image: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            preserveAspectRatio: "none",
            opacity: null
        }
    },

    // private
    onMouseEnter: function (e) {
        this.fireEvent("mouseenter", e);
    },

    // private
    onMouseLeave: function (e) {
        this.fireEvent("mouseleave", e);
    },

    // @private - Normalize a delegated single event from the main container to each sprite and sprite group
    processEvent: function (name, e) {
        var target = e.getTarget(),
            sprite;
        this.fireEvent(name, e);
        sprite = this.items.get(target.id);
        if (sprite) {
            sprite.fireEvent(name, sprite, e);
        }
    },

    // Create the VML element/elements and append them to the DOM
    createSpriteElement: function (sprite) {
        var me = this,
            attr = sprite.attr,
            type = sprite.type,
            zoom = me.zoom,
            vml = sprite.vml || (sprite.vml = {}),
            el = (type === 'image') ? me.createNode('image') : me.createNode('shape'),
            path, skew, textPath;

        el.coordsize = zoom + ' ' + zoom;
        el.coordorigin = attr.coordorigin || "0 0";
        Ext.get(el).addCls(me.spriteCls);
        if (type == "text") {
            vml.path = path = me.createNode("path");
            path.textpathok = true;
            vml.textpath = textPath = me.createNode("textpath");
            textPath.on = true;
            el.appendChild(textPath);
            el.appendChild(path);
        }
        el.id = sprite.id;
        sprite.el = Ext.get(el);
        sprite.el.setStyle('zIndex', -me.zIndexShift);
        me.el.appendChild(el);
        if (type !== 'image') {
            skew = me.createNode("skew");
            skew.on = true;
            el.appendChild(skew);
            sprite.skew = skew;
        }
        sprite.matrix = new Ext.draw.Matrix();
        sprite.bbox = {
            plain: null,
            transform: null
        };

        this.applyAttrs(sprite);
        this.applyTransformations(sprite);        
        sprite.fireEvent("render", sprite);
        return sprite.el;
    },

    getBBoxText: function (sprite) {
        var vml = sprite.vml;
        return {
            x: vml.X + (vml.bbx || 0) - vml.W / 2,
            y: vml.Y - vml.H / 2,
            width: vml.W,
            height: vml.H
        };
    },

    applyAttrs: function (sprite) {
        var me = this,
            group = sprite.group,
            spriteAttr = sprite.attr,
            el = sprite.el,
            dom = el.dom,
            style, groups, i, ln, scrubbedAttrs,
            cx, cy, rx, ry;

        if (group) {
            groups = [].concat(group);
            ln = groups.length;
            for (i = 0; i < ln; i++) {
                group = groups[i];
                me.getGroup(group).add(sprite);
            }
            delete sprite.group;
        }
        scrubbedAttrs = me.scrubAttrs(sprite) || {};

        if (sprite.zIndexDirty) {
            me.setZIndex(sprite);
        }

        // Apply minimum default attributes
        Ext.applyIf(scrubbedAttrs, me.minDefaults[sprite.type]);

        if (sprite.type == 'image') {
            Ext.apply(sprite.attr, {
                x: scrubbedAttrs.x,
                y: scrubbedAttrs.y,
                width: scrubbedAttrs.width,
                height: scrubbedAttrs.height
            });
            el.setStyle({
                width: scrubbedAttrs.width + 'px',
                height: scrubbedAttrs.height + 'px'
            });
            dom.src = scrubbedAttrs.src;
        }

        if (dom.href) {
            dom.href = scrubbedAttrs.href;
        }
        if (dom.title) {
            dom.title = scrubbedAttrs.title;
        }
        if (dom.target) {
            dom.target = scrubbedAttrs.target;
        }
        if (dom.cursor) {
            dom.cursor = scrubbedAttrs.cursor;
        }

        // Change visibility
        if (sprite.dirtyHidden) {
            (scrubbedAttrs.hidden) ? me.hidePrim(sprite) : me.showPrim(sprite);
            sprite.dirtyHidden = false;
        }

        // Update path
        if (sprite.dirtyPath) {
            if (sprite.type == "circle" || sprite.type == "ellipse") {
                cx = scrubbedAttrs.x;
                cy = scrubbedAttrs.y;
                rx = scrubbedAttrs.rx || scrubbedAttrs.r || 0;
                ry = scrubbedAttrs.ry || scrubbedAttrs.r || 0;
                dom.path = Ext.String.format("ar{0},{1},{2},{3},{4},{1},{4},{1}",
                    Math.round((cx - rx) * me.zoom),
                    Math.round((cy - ry) * me.zoom),
                    Math.round((cx + rx) * me.zoom),
                    Math.round((cy + ry) * me.zoom),
                    Math.round(cx * me.zoom));
                sprite.dirtyPath = false;
            } else {
                sprite.attr.path = scrubbedAttrs.path = me.setPaths(sprite, scrubbedAttrs) || scrubbedAttrs.path;
                dom.path = me.path2vml(scrubbedAttrs.path);
                sprite.dirtyPath = false;
            }
        }

        // Apply clipping
        if ("clip-rect" in scrubbedAttrs) {
            me.setClip(sprite, scrubbedAttrs);
        }

        // Handle text (special handling required)
        if (sprite.type == "text") {
            me.setTextAttributes(sprite, scrubbedAttrs);
        }

        // Handle fill and opacity
        if (scrubbedAttrs.opacity || scrubbedAttrs['stroke-opacity'] || scrubbedAttrs.fill) {
            me.setFill(sprite, scrubbedAttrs);
        }

        // Handle stroke (all fills require a stroke element)
        if (scrubbedAttrs.stroke || scrubbedAttrs['stroke-opacity'] || scrubbedAttrs.fill) {
            me.setStroke(sprite, scrubbedAttrs);
        }

        //set styles
        style = spriteAttr.style;
        if (style) {
            el.setStyle(style);
        }

        sprite.dirty = false;
    },

    setZIndex: function (sprite) {
        var me = this,
            zIndex = sprite.attr.zIndex,
            shift = me.zIndexShift,
            items, iLen, item, i;

        if (zIndex < shift) {
            // This means bad thing happened.
            // The algorithm below will guarantee O(n) time.
            items = me.items.items;
            iLen = items.length;

            for (i = 0; i < iLen; i++) {
                if ((zIndex = items[i].attr.zIndex) && zIndex < shift) { // zIndex is no longer useful this case
                    shift = zIndex;
                }
            }

            me.zIndexShift = shift;
            for (i = 0; i < iLen; i++) {
                item = items[i];
                if (item.el) {
                    item.el.setStyle('zIndex', item.attr.zIndex - shift);
                }
                item.zIndexDirty = false;
            }
        } else if (sprite.el) {
            sprite.el.setStyle('zIndex', zIndex - shift);
            sprite.zIndexDirty = false;
        }
    },

    // Normalize all virtualized types into paths.
    setPaths: function (sprite, params) {
        var spriteAttr = sprite.attr;
        // Clear bbox cache
        sprite.bbox.plain = null;
        sprite.bbox.transform = null;
        if (sprite.type == 'circle') {
            spriteAttr.rx = spriteAttr.ry = params.r;
            return Ext.draw.Draw.ellipsePath(sprite);
        }
        else if (sprite.type == 'ellipse') {
            spriteAttr.rx = params.rx;
            spriteAttr.ry = params.ry;
            return Ext.draw.Draw.ellipsePath(sprite);
        }
        else if (sprite.type == 'rect') {
            spriteAttr.rx = spriteAttr.ry = params.r;
            return Ext.draw.Draw.rectPath(sprite);
        }
        else if (sprite.type == 'path' && spriteAttr.path) {
            return Ext.draw.Draw.pathToAbsolute(spriteAttr.path);
        }
        return false;
    },

    setFill: function (sprite, params) {
        var me = this,
            el = sprite.el.dom,
            fillEl = el.fill,
            newfill = false,
            gradient, fillUrl, rotation, angle;

        if (!fillEl) {
            // NOT an expando (but it sure looks like one)...
            fillEl = el.fill = me.createNode("fill");
            newfill = true;
        }
        if (Ext.isArray(params.fill)) {
            params.fill = params.fill[0];
        }
        if (params.fill == "none") {
            fillEl.on = false;
        }
        else {
            if (typeof params.opacity == "number") {
                fillEl.opacity = params.opacity;
            }
            if (typeof params["fill-opacity"] == "number") {
                fillEl.opacity = params["fill-opacity"];
            }
            fillEl.on = true;
            if (typeof params.fill == "string") {
                fillUrl = params.fill.match(me.fillUrlRe);
                if (fillUrl) {
                    fillUrl = fillUrl[1];
                    // If the URL matches one of the registered gradients, render that gradient
                    if (fillUrl.charAt(0) == "#") {
                        gradient = me.gradientsColl.getByKey(fillUrl.substring(1));
                    }
                    if (gradient) {
                        // VML angle is offset and inverted from standard, and must be adjusted to match rotation transform
                        rotation = params.rotation;
                        angle = -(gradient.angle + 270 + (rotation ? rotation.degrees : 0)) % 360;
                        // IE will flip the angle at 0 degrees...
                        if (angle === 0) {
                            angle = 180;
                        }
                        fillEl.angle = angle;
                        fillEl.type = "gradient";
                        fillEl.method = "sigma";
                        if (fillEl.colors) {
                            fillEl.colors.value = gradient.colors;
                        } else {
                            fillEl.colors = gradient.colors;
                        }
                    }
                    // Otherwise treat it as an image
                    else {
                        fillEl.src = fillUrl;
                        fillEl.type = "tile";
                    }
                }
                else {
                    fillEl.color = Ext.draw.Color.toHex(params.fill);
                    fillEl.src = "";
                    fillEl.type = "solid";
                }
            }
        }
        if (newfill) {
            el.appendChild(fillEl);
        }
    },

    setStroke: function (sprite, params) {
        var me = this,
            el = sprite.el.dom,
            strokeEl = sprite.strokeEl,
            newStroke = false,
            width, opacity;

        if (!strokeEl) {
            strokeEl = sprite.strokeEl = me.createNode("stroke");
            newStroke = true;
        }
        if (Ext.isArray(params.stroke)) {
            params.stroke = params.stroke[0];
        }
        if (!params.stroke || params.stroke == "none" || params.stroke == 0 || params["stroke-width"] == 0) {
            strokeEl.on = false;
        }
        else {
            strokeEl.on = true;
            if (params.stroke && !params.stroke.match(me.fillUrlRe)) {
                // VML does NOT support a gradient stroke :(
                strokeEl.color = Ext.draw.Color.toHex(params.stroke);
            }
            strokeEl.dashstyle = params["stroke-dasharray"] ? "dash" : "solid";
            strokeEl.joinstyle = params["stroke-linejoin"];
            strokeEl.endcap = params["stroke-linecap"] || "round";
            strokeEl.miterlimit = params["stroke-miterlimit"] || 8;
            width = parseFloat(params["stroke-width"] || 1) * 0.75;
            opacity = params["stroke-opacity"] || 1;
            // VML Does not support stroke widths under 1, so we're going to fiddle with stroke-opacity instead.
            if (Ext.isNumber(width) && width < 1) {
                strokeEl.weight = 1;
                strokeEl.opacity = opacity * width;
            }
            else {
                strokeEl.weight = width;
                strokeEl.opacity = opacity;
            }
        }
        if (newStroke) {
            el.appendChild(strokeEl);
        }
    },

    setClip: function (sprite, params) {
        var me = this,
            clipEl = sprite.clipEl,
            rect = String(params["clip-rect"]).split(me.separatorRe);
        if (!clipEl) {
            clipEl = sprite.clipEl = me.el.insertFirst(Ext.getDoc().dom.createElement("div"));
            clipEl.addCls(Ext.baseCSSPrefix + 'vml-sprite');
        }
        if (rect.length == 4) {
            rect[2] = +rect[2] + (+rect[0]);
            rect[3] = +rect[3] + (+rect[1]);
            clipEl.setStyle("clip", Ext.String.format("rect({1}px {2}px {3}px {0}px)", rect[0], rect[1], rect[2], rect[3]));
            clipEl.setSize(me.el.width, me.el.height);
        }
        else {
            clipEl.setStyle("clip", "");
        }
    },

    setTextAttributes: function (sprite, params) {
        var me = this,
            vml = sprite.vml,
            textStyle = vml.textpath.style,
            spanCacheStyle = me.span.style,
            zoom = me.zoom,
            fontObj = {
                fontSize: "font-size",
                fontWeight: "font-weight",
                fontStyle: "font-style"
            },
            fontProp,
            paramProp;
        if (sprite.dirtyFont) {
            if (params.font) {
                textStyle.font = spanCacheStyle.font = params.font;
            }
            if (params["font-family"]) {
                textStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(me.fontFamilyRe, "") + '"';
                spanCacheStyle.fontFamily = params["font-family"];
            }

            for (fontProp in fontObj) {
                paramProp = params[fontObj[fontProp]];
                if (paramProp) {
                    textStyle[fontProp] = spanCacheStyle[fontProp] = paramProp;
                }
            }

            me.setText(sprite, params.text);

            if (vml.textpath.string) {
                me.span.innerHTML = String(vml.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br/>");
            }
            vml.W = me.span.offsetWidth;
            vml.H = me.span.offsetHeight + 2; // TODO handle baseline differences and offset in VML Textpath

            // text-anchor emulation
            if (params["text-anchor"] == "middle") {
                textStyle["v-text-align"] = "center";
            }
            else if (params["text-anchor"] == "end") {
                textStyle["v-text-align"] = "right";
                vml.bbx = -Math.round(vml.W / 2);
            }
            else {
                textStyle["v-text-align"] = "left";
                vml.bbx = Math.round(vml.W / 2);
            }
        }
        vml.X = params.x;
        vml.Y = params.y;
        vml.path.v = Ext.String.format("m{0},{1}l{2},{1}", Math.round(vml.X * zoom), Math.round(vml.Y * zoom), Math.round(vml.X * zoom) + 1);
        // Clear bbox cache
        sprite.bbox.plain = null;
        sprite.bbox.transform = null;
        sprite.dirtyFont = false;
    },

    setText: function (sprite, text) {
        sprite.vml.textpath.string = Ext.htmlDecode(text);
    },

    hide: function () {
        this.el.hide();
    },

    show: function () {
        this.el.show();
    },

    hidePrim: function (sprite) {
        sprite.el.addCls(Ext.baseCSSPrefix + 'hide-visibility');
    },

    showPrim: function (sprite) {
        sprite.el.removeCls(Ext.baseCSSPrefix + 'hide-visibility');
    },

    setSize: function (width, height) {
        var me = this;
        width = width || me.width;
        height = height || me.height;
        me.width = width;
        me.height = height;

        if (me.el) {
            // Size outer div
            if (width != undefined) {
                me.el.setWidth(width);
            }
            if (height != undefined) {
                me.el.setHeight(height);
            }
        }

        me.callParent(arguments);
    },

    /**
     * @private Using the current viewBox property and the surface's width and height, calculate the
     * appropriate viewBoxShift that will be applied as a persistent transform to all sprites.
     */
    applyViewBox: function () {
        var me = this,
            viewBox = me.viewBox,
            width = me.width,
            height = me.height,
            items,
            iLen,
            i;
        
        me.callParent();

        if (viewBox && (width || height)) {
            items = me.items.items;
            iLen = items.length;

            for (i = 0; i < iLen; i++) {
                me.applyTransformations(items[i]);
            }
        }
    },

    onAdd: function (item) {
        this.callParent(arguments);
        if (this.el) {
            this.renderItem(item);
        }
    },

    onRemove: function (sprite) {
        if (sprite.el) {
            sprite.el.destroy();
            delete sprite.el;
        }
        this.callParent(arguments);
    },

    render: function (container) {
        var me = this,
            doc = Ext.getDoc().dom,
            el;
        // VML Node factory method (createNode)
        if (!me.createNode) {
            try {
                if (!doc.namespaces.rvml) {
                    doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                }
                me.createNode = function (tagName) {
                    return doc.createElement("<rvml:" + tagName + ' class="rvml">');
                };
            } catch (e) {
                me.createNode = function (tagName) {
                    return doc.createElement("<" + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                };
            }
        }

        if (!me.el) {
            el = doc.createElement("div");
            me.el = Ext.get(el);
            me.el.addCls(me.baseVmlCls);

            // Measuring span (offscrren)
            me.span = doc.createElement("span");
            Ext.get(me.span).addCls(me.measureSpanCls);
            el.appendChild(me.span);
            me.el.setSize(me.width || 0, me.height || 0);
            container.appendChild(el);
            me.el.on({
                scope: me,
                mouseup: me.onMouseUp,
                mousedown: me.onMouseDown,
                mouseover: me.onMouseOver,
                mouseout: me.onMouseOut,
                mousemove: me.onMouseMove,
                mouseenter: me.onMouseEnter,
                mouseleave: me.onMouseLeave,
                click: me.onClick,
                dblclick: me.onDblClick
            });
        }
        me.renderAll();
    },

    renderAll: function () {
        this.items.each(this.renderItem, this);
    },

    redraw: function (sprite) {
        sprite.dirty = true;
        this.renderItem(sprite);
    },

    renderItem: function (sprite) {
        // Does the surface element exist?
        if (!this.el) {
            return;
        }

        // Create sprite element if necessary
        if (!sprite.el) {
            this.createSpriteElement(sprite);
        }

        if (sprite.dirty) {
            this.applyAttrs(sprite);
            if (sprite.dirtyTransform) {
                this.applyTransformations(sprite);
            }
        }
    },

    rotationCompensation: function (deg, dx, dy) {
        var matrix = new Ext.draw.Matrix();
        matrix.rotate(-deg, 0.5, 0.5);
        return {
            x: matrix.x(dx, dy),
            y: matrix.y(dx, dy)
        };
    },

    transform: function (sprite, matrixOnly) {
        var me = this,
            bbox = me.getBBox(sprite, true),
            matrix = new Ext.draw.Matrix(),
            transforms = sprite.transformations,
            transformsLength = transforms.length,
            i = 0,
            deltaDegrees = 0,
            deltaScaleX = 1,
            deltaScaleY = 1,
            el = sprite.el,
            dom = el.dom,
            domStyle = dom.style,
            skew = sprite.skew,
            shift = me.viewBoxShift,
            transform, type, offset;

        for (; i < transformsLength; i++) {
            transform = transforms[i];
            type = transform.type;
            if (type == "translate") {
                matrix.translate(transform.x, transform.y);
            }
            else if (type == "rotate") {
                matrix.rotate(transform.degrees, transform.x, transform.y);
                deltaDegrees += transform.degrees;
            }
            else if (type == "scale") {
                matrix.scale(transform.x, transform.y, transform.centerX, transform.centerY);
                deltaScaleX *= transform.x;
                deltaScaleY *= transform.y;
            }
        }

        sprite.matrix = matrix.clone();

        if (matrixOnly) {
            return;
        }

        if (shift) {
            matrix.prepend(shift.scale, 0, 0, shift.scale, shift.dx * shift.scale, shift.dy * shift.scale);
        }

        // Hide element while we transform
        if (sprite.type != "image" && skew) {
            skew.origin = "0,0";
            // matrix transform via VML skew
            skew.matrix = matrix.toString();
            // skew.offset = '32767,1' OK
            // skew.offset = '32768,1' Crash
            // M$, R U kidding??
            offset = matrix.offset();
            if (offset[0] > 32767) {
                offset[0] = 32767;
            } else if (offset[0] < -32768) {
                offset[0] = -32768;
            }
            if (offset[1] > 32767) {
                offset[1] = 32767;
            } else if (offset[1] < -32768) {
                offset[1] = -32768;
            }
            skew.offset = offset;
        }
        else {
            domStyle.filter = matrix.toFilter();
            domStyle.left = Math.min(
                matrix.x(bbox.x, bbox.y),
                matrix.x(bbox.x + bbox.width, bbox.y),
                matrix.x(bbox.x, bbox.y + bbox.height),
                matrix.x(bbox.x + bbox.width, bbox.y + bbox.height)) + 'px';
            domStyle.top = Math.min(
                matrix.y(bbox.x, bbox.y),
                matrix.y(bbox.x + bbox.width, bbox.y),
                matrix.y(bbox.x, bbox.y + bbox.height),
                matrix.y(bbox.x + bbox.width, bbox.y + bbox.height)) + 'px';
        }
    },

    createItem: function (config) {
        return Ext.create('Ext.draw.Sprite', config);
    },

    getRegion: function () {
        return this.el.getRegion();
    },

    addCls: function (sprite, className) {
        if (sprite && sprite.el) {
            sprite.el.addCls(className);
        }
    },

    removeCls: function (sprite, className) {
        if (sprite && sprite.el) {
            sprite.el.removeCls(className);
        }
    },

    /**
     * Adds a definition to this Surface for a linear gradient. We convert the gradient definition
     * to its corresponding VML attributes and store it for later use by individual sprites.
     * @param {Object} gradient
     */
    addGradient: function (gradient) {
        var gradients = this.gradientsColl || (this.gradientsColl = Ext.create('Ext.util.MixedCollection')),
            colors = [],
            stops = Ext.create('Ext.util.MixedCollection'),
            keys,
            items,
            iLen,
            key,
            item,
            i;

        // Build colors string
        stops.addAll(gradient.stops);
        stops.sortByKey("ASC", function (a, b) {
            a = parseInt(a, 10);
            b = parseInt(b, 10);
            return a > b ? 1 : (a < b ? -1 : 0);
        });

        keys = stops.keys;
        items = stops.items;
        iLen = keys.length;

        for (i = 0; i < iLen; i++) {
            key = keys[i];
            item = items[i];
            colors.push(key + '% ' + item.color);
        }

        gradients.add(gradient.id, {
            colors: colors.join(","),
            angle: gradient.angle
        });
    },

    destroy: function () {
        var me = this;

        me.callParent(arguments);
        if (me.el) {
            me.el.destroy();
        }
        delete me.el;
    }
});

