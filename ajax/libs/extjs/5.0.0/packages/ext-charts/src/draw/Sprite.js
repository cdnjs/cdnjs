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
