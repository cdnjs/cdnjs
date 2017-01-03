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
