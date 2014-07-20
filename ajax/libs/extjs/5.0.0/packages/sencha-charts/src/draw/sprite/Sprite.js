/**
 * A sprite is an object rendered in a drawing {@link Ext.draw.Surface}.
 * The Sprite class itself is an abstract class and is not meant to be used directly.
 * Every sprite in the Draw and Chart packages is a subclass of the Ext.draw.sprite.Sprite.
 * The standard Sprite subclasses are:
 *
 * * {@link Ext.draw.sprite.Path} - A sprite that represents a path.
 * * {@link Ext.draw.sprite.Rect} - A sprite that represents a rectangle.
 * * {@link Ext.draw.sprite.Circle} - A sprite that represents a circle.
 * * {@link Ext.draw.sprite.Sector} - A sprite representing a pie slice.
 * * {@link Ext.draw.sprite.Arc} - A sprite that represents a circular arc.
 * * {@link Ext.draw.sprite.Ellipse} - A sprite that represents an ellipse.
 * * {@link Ext.draw.sprite.EllipticalArc} - A sprite that represents an elliptical arc.
 * * {@link Ext.draw.sprite.Text} - A sprite that represents text.
 * * {@link Ext.draw.sprite.Image} -  A sprite that represents an image.
 * * {@link Ext.draw.sprite.Instancing} - A sprite that represents multiple instances based on the given template.
 * * {@link Ext.draw.sprite.Composite} - Represents a group of sprites.
 *
 * Sprites can be created with a reference to a {@link Ext.draw.Surface}
 *
 *      var drawContainer = Ext.create('Ext.draw.Container', {
 *          // ...
 *      });
 *
 *      var sprite = Ext.create('Ext.draw.sprite.Sprite', {
 *          type: 'circle',
 *          fill: '#ff0',
 *          surface: drawContainer.getSurface('main'),
 *          radius: 5
 *      });
 *
 * Sprites can also be added to the surface as a configuration object:
 *
 *      var sprite = drawContainer.getSurface('main').add({
 *          type: 'circle',
 *          fill: '#ff0',
 *          radius: 5
 *      });
 */
Ext.define('Ext.draw.sprite.Sprite', {
    alias: 'sprite.sprite',

    mixins: {
        observable: 'Ext.mixin.Observable'
    },

    requires: [
        'Ext.draw.Draw',
        'Ext.draw.gradient.Gradient',
        'Ext.draw.sprite.AttributeDefinition',
        'Ext.draw.modifier.Target',
        'Ext.draw.modifier.Animation',
        'Ext.draw.modifier.Highlight'
    ],

    isSprite: true,

    inheritableStatics: {
        def: {
            processors: {
                /**
                 * @cfg {String} [strokeStyle="none"] The color of the stroke (a CSS color value).
                 */
                strokeStyle: "color",

                /**
                 * @cfg {String} [fillStyle="none"] The color of the shape (a CSS color value).
                 */
                fillStyle: "color",

                /**
                 * @cfg {Number} [strokeOpacity=1] The opacity of the stroke. Limited from 0 to 1.
                 */
                strokeOpacity: "limited01",

                /**
                 * @cfg {Number} [fillOpacity=1] The opacity of the fill. Limited from 0 to 1.
                 */
                fillOpacity: "limited01",

                /**
                 * @cfg {Number} [lineWidth=1] The width of the line stroke.
                 */
                lineWidth: "number",

                /**
                 * @cfg {String} [lineCap="butt"] The style of the line caps.
                 */
                lineCap: "enums(butt,round,square)",

                /**
                 * @cfg {String} [lineJoin="miter"] The style of the line join.
                 */
                lineJoin: "enums(round,bevel,miter)",

                /**
                 * @cfg {Array} An array of non-negative numbers specifying a dash/space sequence.
                 */
                lineDash: "data",

                /**
                 * @cfg {Number} A number specifying how far into the line dash sequence drawing commences.
                 */
                lineDashOffset: "number",

                /**
                 * @cfg {Number} [miterLimit=1] Sets the distance between the inner corner and the outer corner where two lines meet.
                 */
                miterLimit: "number",

                /**
                 * @cfg {String} [shadowColor="none"] The color of the shadow (a CSS color value).
                 */
                shadowColor: "color",

                /**
                 * @cfg {Number} [shadowOffsetX=0] The offset of the sprite's shadow on the x-axis.
                 */
                shadowOffsetX: "number",

                /**
                 * @cfg {Number} [shadowOffsetY=0] The offset of the sprite's shadow on the y-axis.
                 */
                shadowOffsetY: "number",

                /**
                 * @cfg {Number} [shadowBlur=0] The amount blur used on the shadow.
                 */
                shadowBlur: "number",

                /**
                 * @cfg {Number} [globalAlpha=1] The opacity of the sprite. Limited from 0 to 1.
                 */
                globalAlpha: "limited01",

                /**
                 * @cfg {String} [globalCompositeOperation=source-over]
                 * Indicates how source images are drawn onto a destination image.
                 * globalCompositeOperation attribute is not supported by the SVG and VML (excanvas) engines.
                 */
                globalCompositeOperation: "enums(source-over,destination-over,source-in,destination-in,source-out,destination-out,source-atop,destination-atop,lighter,xor,copy)",

                /**
                 * @cfg {Boolean} [hidden=false] Determines whether or not the sprite is hidden.
                 */
                hidden: "bool",

                /**
                 * @cfg {Boolean} [transformFillStroke=false] Determines whether the fill and stroke are affected by sprite transformations.
                 */
                transformFillStroke: "bool",

                /**
                 * @cfg {Number} [zIndex=0] The stacking order of the sprite.
                 */
                zIndex: "number",

                /**
                 * @cfg {Number} [translationX=0] The translation of the sprite on the x-axis.
                 */
                translationX: "number",

                /**
                 * @cfg {Number} [translationY=0] The translation of the sprite on the y-axis.
                 */
                translationY: "number",

                /**
                 * @cfg {Number} [rotationRads=0] The degree of rotation of the sprite.
                 */
                rotationRads: "number",

                /**
                 * @cfg {Number} [rotationCenterX=null] The central coordinate of the sprite's scale operation on the x-axis.
                 */
                rotationCenterX: "number",

                /**
                 * @cfg {Number} [rotationCenterY=null] The central coordinate of the sprite's rotate operation on the y-axis.
                 */
                rotationCenterY: "number",

                /**
                 * @cfg {Number} [scalingX=1] The scaling of the sprite on the x-axis.
                 */
                scalingX: "number",

                /**
                 * @cfg {Number} [scalingY=1] The scaling of the sprite on the y-axis.
                 */
                scalingY: "number",

                /**
                 * @cfg {Number} [scalingCenterX=null] The central coordinate of the sprite's scale operation on the x-axis.
                 */
                scalingCenterX: "number",

                /**
                 * @cfg {Number} [scalingCenterY=null] The central coordinate of the sprite's scale operation on the y-axis.
                 */
                scalingCenterY: "number",
                
                constrainGradients: "bool"
            },

            aliases: {
                "stroke": "strokeStyle",
                "fill": "fillStyle",
                "color": "fillStyle",
                "stroke-width": "lineWidth",
                "stroke-linecap": "lineCap",
                "stroke-linejoin": "lineJoin",
                "stroke-miterlimit": "miterLimit",
                "text-anchor": "textAlign",
                "opacity": "globalAlpha",

                translateX: "translationX",
                translateY: "translationY",
                rotateRads: "rotationRads",
                rotateCenterX: "rotationCenterX",
                rotateCenterY: "rotationCenterY",
                scaleX: "scalingX",
                scaleY: "scalingY",
                scaleCenterX: "scalingCenterX",
                scaleCenterY: "scalingCenterY"
            },

            defaults: {
                hidden: false,
                zIndex: 0,

                strokeStyle: "none",
                fillStyle: "none",
                lineWidth: 1,
                lineDash: [],
                lineDashOffset: 0,
                lineCap: "butt",
                lineJoin: "miter",
                miterLimit: 1,

                shadowColor: "none",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,

                globalAlpha: 1,
                strokeOpacity: 1,
                fillOpacity: 1,
                transformFillStroke: false,

                translationX: 0,
                translationY: 0,
                rotationRads: 0,
                rotationCenterX: null,
                rotationCenterY: null,
                scalingX: 1,
                scalingY: 1,
                scalingCenterX: null,
                scalingCenterY: null,
                
                constrainGradients: false
            },

            dirtyTriggers: {
                hidden: "canvas",
                zIndex: "zIndex",

                globalAlpha: "canvas",
                globalCompositeOperation: "canvas",

                transformFillStroke: "canvas",
                strokeStyle: "canvas",
                fillStyle: "canvas",
                strokeOpacity: "canvas",
                fillOpacity: "canvas",

                lineWidth: "canvas",
                lineCap: "canvas",
                lineJoin: "canvas",
                lineDash: "canvas",
                lineDashOffset: "canvas",
                miterLimit: "canvas",

                shadowColor: "canvas",
                shadowOffsetX: "canvas",
                shadowOffsetY: "canvas",
                shadowBlur: "canvas",

                translationX: "transform",
                translationY: "transform",
                rotationRads: "transform",
                rotationCenterX: "transform",
                rotationCenterY: "transform",
                scalingX: "transform",
                scalingY: "transform",
                scalingCenterX: "transform",
                scalingCenterY: "transform",
                
                constrainGradients: "canvas"
            },

            updaters: {
                "bbox": function (attrs) {
                    attrs.bbox.plain.dirty = true;
                    attrs.bbox.transform.dirty = true;
                    if (
                        attrs.rotationRads !== 0 && (attrs.rotationCenterX === null || attrs.rotationCenterY === null) ||
                            ((attrs.scalingX !== 1 || attrs.scalingY !== 1) &&
                                (attrs.scalingCenterX === null || attrs.scalingCenterY === null)
                                )
                        ) {
                        if (!attrs.dirtyFlags.transform) {
                            attrs.dirtyFlags.transform = [];
                        }
                    }
                },

                "zIndex": function (attrs) {
                    attrs.dirtyZIndex = true;
                },

                "transform": function (attrs) {
                    attrs.dirtyTransform = true;
                    attrs.bbox.transform.dirty = true;
                }
            }
        }
    },

    /**
     * @property {Object} attr
     * The visual attributes of the sprite, e.g. strokeStyle, fillStyle, lineWidth...
     */
    attr: {},

    config: {
        parent: null,
        /**
         * @cfg {Ext.draw.Surface} surface
         * The surface that this sprite is rendered into.
         */
        surface: null
    },

    onClassExtended: function (subClass, data) {
        // The `def` here is no longer a config, but an instance
        // of the AttributeDefinition class created with that config,
        // which can now be retrieved from `initialConfig`.
        var initCfg = subClass.superclass.self.def.initialConfig,
            cfg;

        // If sprite defines attributes of its own, merge that with those of its parent.
        if (data.inheritableStatics && data.inheritableStatics.def) {
            cfg = Ext.merge({}, initCfg, data.inheritableStatics.def);
            subClass.def = Ext.create('Ext.draw.sprite.AttributeDefinition', cfg);
            delete data.inheritableStatics.def;
        } else {
            subClass.def = Ext.create('Ext.draw.sprite.AttributeDefinition', initCfg);
        }
    },

    constructor: function (config) {
        //<debug>
        if (Ext.getClassName(this) === 'Ext.draw.sprite.Sprite') {
            throw 'Ext.draw.sprite.Sprite is an abstract class';
        }
        //</debug>
        var me = this;

        config = Ext.isObject(config) ? config : {};

        me.id = config.id || Ext.id(null, 'ext-sprite-');
        me.attr = {};
        me.mixins.observable.constructor.apply(me, arguments);
        
        var modifiers = Ext.Array.from(config.modifiers, true);
        me.prepareModifiers(modifiers);
        me.initializeAttributes();
        me.setAttributes(me.self.def.getDefaults(), true);
        //<debug>
        var processors = me.self.def.getProcessors();
        for (var name in config) {
            if (name in processors && me['get' + name.charAt(0).toUpperCase() + name.substr(1)]) {
                Ext.Error.raise('The ' + me.$className +
                    ' sprite has both a config and an attribute with the same name: ' + name + '.');
            }
        }
        //</debug>
        me.setAttributes(config);
    },

    getDirty: function () {
        return this.attr.dirty;
    },

    setDirty: function (dirty) {
        if ((this.attr.dirty = dirty)) {
            if (this._parent) {
                this._parent.setDirty(true);
            }
        }
    },

    addModifier: function (modifier, reinitializeAttributes) {
        var me = this;
        if (!(modifier instanceof Ext.draw.modifier.Modifier)) {
            modifier = Ext.factory(modifier, null, null, 'modifier');
        }
        modifier.setSprite(this);
        if (modifier.preFx || modifier.config && modifier.config.preFx) {
            if (me.fx.getPrevious()) {
                me.fx.getPrevious().setNext(modifier);
            }
            modifier.setNext(me.fx);
        } else {
            me.topModifier.getPrevious().setNext(modifier);
            modifier.setNext(me.topModifier);
        }
        if (reinitializeAttributes) {
            me.initializeAttributes();
        }
        return modifier;
    },

    prepareModifiers: function (additionalModifiers) {
        // Set defaults
        var me = this,
            i, ln;

        me.topModifier = new Ext.draw.modifier.Target({sprite: me});

        // Link modifiers
        me.fx = new Ext.draw.modifier.Animation({sprite: me});
        me.fx.setNext(me.topModifier);

        for (i = 0, ln = additionalModifiers.length; i < ln; i++) {
            me.addModifier(additionalModifiers[i], false);
        }
    },

    initializeAttributes: function () {
        var me = this;
        me.topModifier.prepareAttributes(me.attr);
    },

    updateDirtyFlags: function (attrs) {
        var me = this,
            dirtyFlags = attrs.dirtyFlags, flags,
            updaters = me.self.def._updaters,
            any = false,
            dirty = false,
            flag;

        do {
            any = false;
            for (flag in dirtyFlags) {
                me.updateDirtyFlags = Ext.emptyFn;
                flags = dirtyFlags[flag];
                delete dirtyFlags[flag];
                if (updaters[flag]) {
                    updaters[flag].call(me, attrs, flags);
                }
                any = true;
                delete me.updateDirtyFlags;
            }
            dirty = dirty || any;
        } while (any);

        if (dirty) {
            me.setDirty(true);
        }
    },

    /**
     * Set attributes of the sprite.
     *
     * @param {Object} changes The content of the change.
     * @param {Boolean} [bypassNormalization] `true` to avoid normalization of the given changes.
     * @param {Boolean} [avoidCopy] `true` to avoid copying the `changes` object.
     * The content of object may be destroyed.
     */
    setAttributes: function (changes, bypassNormalization, avoidCopy) {
        var attributes = this.attr;
        if (bypassNormalization) {
            if (avoidCopy) {
                this.topModifier.pushDown(attributes, changes);
            } else {
                this.topModifier.pushDown(attributes, Ext.apply({}, changes));
            }
        } else {
            this.topModifier.pushDown(attributes, this.self.def.normalize(changes));
        }
    },

    /**
     * Set attributes of the sprite, assuming the names and values have already been
     * normalized.
     *
     * @deprecated Use setAttributes directy with bypassNormalization argument being `true`.
     * @param {Object} changes The content of the change.
     * @param {Boolean} [avoidCopy] `true` to avoid copying the `changes` object.
     * The content of object may be destroyed.
     */
    setAttributesBypassingNormalization: function (changes, avoidCopy) {
        return this.setAttributes(changes, true, avoidCopy);
    },

    /**
     * Returns the bounding box for the given Sprite as calculated with the Canvas engine.
     *
     * @param {Boolean} [isWithoutTransform] Whether to calculate the bounding box with the current transforms or not.
     */
    getBBox: function (isWithoutTransform) {
        var me = this,
            attr = me.attr,
            bbox = attr.bbox,
            plain = bbox.plain,
            transform = bbox.transform;
        if (plain.dirty) {
            me.updatePlainBBox(plain);
            plain.dirty = false;
        }
        if (isWithoutTransform) {
            return plain;
        } else {
            me.applyTransformations();
            if (transform.dirty) {
                me.updateTransformedBBox(transform, plain);
                transform.dirty = false;
            }
            return transform;
        }
    },

    /**
     * @protected
     * Subclass will fill the plain object with `x`, `y`, `width`, `height` information of the plain bounding box of
     * this sprite.
     *
     * @param {Object} plain Target object.
     */
    updatePlainBBox: Ext.emptyFn,

    /**
     * @protected
     * Subclass will fill the plain object with `x`, `y`, `width`, `height` information of the transformed
     * bounding box of this sprite.
     *
     * @param {Object} transform Target object.
     * @param {Object} plain Auxiliary object providing information of plain object.
     */
    updateTransformedBBox: function (transform, plain) {
        this.attr.matrix.transformBBox(plain, 0, transform);
    },

    /**
     * Subclass can rewrite this function to gain better performance.
     * @param {Boolean} isWithoutTransform
     * @return {Array}
     */
    getBBoxCenter: function (isWithoutTransform) {
        var bbox = this.getBBox(isWithoutTransform);
        if (bbox) {
            return [
                bbox.x + bbox.width * 0.5,
                bbox.y + bbox.height * 0.5
            ];
        } else {
            return [0, 0];
        }
    },

    /**
     * Hide the sprite.
     * @return {Ext.draw.sprite.Sprite} this
     * @chainable
     */
    hide: function () {
        this.attr.hidden = true;
        this.setDirty(true);
        return this;
    },

    /**
     * Show the sprite.
     * @return {Ext.draw.sprite.Sprite} this
     * @chainable
     */
    show: function () {
        this.attr.hidden = false;
        this.setDirty(true);
        return this;
    },

    /**
     * Applies sprite's attributes to the given context.
     * @param {Object} ctx Context to apply sprite's attributes to.
     * @param {Array} rect The rect of the context to be affected by gradients.
     */
    useAttributes: function (ctx, rect) {
        this.applyTransformations();
        var attrs = this.attr,
            canvasAttributes = attrs.canvasAttributes,
            strokeStyle = canvasAttributes.strokeStyle,
            fillStyle = canvasAttributes.fillStyle,
            lineDash = canvasAttributes.lineDash,
            lineDashOffset = canvasAttributes.lineDashOffset,
            id;

        if (strokeStyle) {
            if (strokeStyle.isGradient) {
                ctx.strokeStyle = 'black';
                ctx.strokeGradient = strokeStyle;
            } else {
                ctx.strokeGradient = false;
            }
        }

        if (fillStyle) {
            if (fillStyle.isGradient) {
                ctx.fillStyle = 'black';
                ctx.fillGradient = fillStyle;
            } else {
                ctx.fillGradient = false;
            }
        }

        if (lineDash && ctx.setLineDash) {
            ctx.setLineDash(lineDash);
        }

        if (lineDashOffset && typeof ctx.lineDashOffset === 'number') {
            ctx.lineDashOffset = lineDashOffset;
        }

        for (id in canvasAttributes) {
            if (canvasAttributes[id] !== undefined && canvasAttributes[id] !== ctx[id]) {
                ctx[id] = canvasAttributes[id];
            }
        }

        if (attrs.constrainGradients) {
            ctx.setGradientBBox({x: rect[0], y: rect[1], width: rect[2], height: rect[3]});
        } else {
            ctx.setGradientBBox(this.getBBox(attrs.transformFillStroke));
        }
    },

    /**
     * @private
     *
     * Calculates forward and inverse transform matrices.
     * @param {Boolean} force Forces recalculation of transform matrices even when sprite's transform attributes supposedly haven't changed.
     */
    applyTransformations: function (force) {
        if (!force && !this.attr.dirtyTransform) {
            return;
        }
        var me = this,
            attr = me.attr,
            center = me.getBBoxCenter(true),
            centerX = center[0],
            centerY = center[1],

            x = attr.translationX,
            y = attr.translationY,

            sx = attr.scalingX,
            sy = attr.scalingY === null ? attr.scalingX : attr.scalingY,
            scx = attr.scalingCenterX === null ? centerX : attr.scalingCenterX,
            scy = attr.scalingCenterY === null ? centerY : attr.scalingCenterY,

            rad = attr.rotationRads,
            rcx = attr.rotationCenterX === null ? centerX : attr.rotationCenterX,
            rcy = attr.rotationCenterY === null ? centerY : attr.rotationCenterY,

            cos = Math.cos(rad),
            sin = Math.sin(rad);

        if (sx === 1 && sy === 1) {
            scx = 0;
            scy = 0;
        }

        if (rad === 0) {
            rcx = 0;
            rcy = 0;
        }

        attr.matrix.elements = [
            cos * sx, sin * sy,
            -sin * sx, cos * sy,
            scx + (rcx - cos * rcx - scx + rcy * sin) * sx + x,
            scy + (rcy - cos * rcy - scy + rcx * -sin) * sy + y
        ];
        attr.matrix.inverse(attr.inverseMatrix);
        attr.dirtyTransform = false;
        attr.bbox.transform.dirty = true;
    },

    /**
     * Called before rendering.
     */
    preRender: Ext.emptyFn,

    /**
     * Render method.
     * @param {Ext.draw.Surface} surface The surface.
     * @param {Object} ctx A context object compatible with CanvasRenderingContext2D.
     * @param {Array} rect The clip rect (or called dirty rect) of the current rendering. Not to be confused
     * with `surface.getRect()`.
     *
     * @return {*} returns `false` to stop rendering in this frame. All the sprite haven't been rendered
     * will have their dirty flag untouched.
     */
    render: Ext.emptyFn,

    repaint: function () {
        var surface = this.getSurface();
        if (surface) {
            surface.renderFrame();
        }
    },

    /**
     * Removes the sprite and clears all listeners.
     */
    destroy: function () {
        var me = this, modifier = me.topModifier, curr;
        while (modifier) {
            curr = modifier;
            modifier = modifier.getPrevious();
            curr.destroy();
        }
        delete me.attr;

        me.destroy = Ext.emptyFn;
        if (me.fireEvent('beforedestroy', me) !== false) {
            me.fireEvent('destroy', me);
        }
        this.callParent();
    }
}, function () {
    // Create one AttributeDefinition instance per sprite class
    // and replace the `def` config with the instance that was created with it.
    // Here we only create an AttributeDefinition instance for the base Sprite class,
    // attribute definitions for subclasses are created inside onClassExtended method.
    this.def = Ext.create('Ext.draw.sprite.AttributeDefinition', this.def);
});

