/**
 * @class Ext.draw.sprite.Composite
 * @extends Ext.draw.sprite.Sprite
 * 
 * Represents a group of sprites.
 */
Ext.define('Ext.draw.sprite.Composite', {
    extend: 'Ext.draw.sprite.Sprite',
    alias: 'sprite.composite',
    type: 'composite',

    constructor: function () {
        this.callParent(arguments);
        this.sprites = [];
        this.sprites.map = {};
    },

    /**
     * Adds a sprite to the composite.
     * @param {Ext.draw.sprite.Sprite|Object} sprite
     */
    add: function (sprite) {
        if (!sprite.isSprite) {
            sprite = Ext.create('sprite.' + sprite.type, sprite);
            sprite.setParent(this);
            sprite.setSurface(this.getSurface());
        }
        var oldTransformations = sprite.applyTransformations,
            me = this,
            attr = me.attr;

        sprite.applyTransformations = function () {
            if (sprite.attr.dirtyTransform) {
                attr.dirtyTransform = true;
                attr.bbox.plain.dirty = true;
                attr.bbox.transform.dirty = true;
            }
            oldTransformations.call(sprite);
        };
        this.sprites.push(sprite);
        this.sprites.map[sprite.id] = sprite.getId();
        attr.bbox.plain.dirty = true;
        attr.bbox.transform.dirty = true;
        return sprite;
    },

    updateSurface: function (surface) {
        for (var i = 0, ln = this.sprites.length; i < ln; i++) {
            this.sprites[i].setSurface(surface);
        }
    },

    /**
     * Adds a list of sprites to the composite.
     * @param {Ext.draw.sprite.Sprite[]|Object[]|Ext.draw.sprite.Sprite|Object} sprites
     */
    addAll: function (sprites) {
        if (sprites.isSprite || sprites.type) {
            this.add(sprites);
        } else if (Ext.isArray(sprites)) {
            var i = 0;
            while (i < sprites.length) {
                this.add(sprites[i++]);
            }
        }
    },

    /**
     * Updates the bounding box of the composite, which contains the bounding box of all sprites in the composite.
     */
    updatePlainBBox: function (plain) {
        var me = this,
            left = Infinity,
            right = -Infinity,
            top = Infinity,
            bottom = -Infinity,
            sprite, bbox, i, ln;

        for (i = 0, ln = me.sprites.length; i < ln; i++) {
            sprite = me.sprites[i];
            sprite.applyTransformations();
            bbox = sprite.getBBox();
            if (left > bbox.x) {
                left = bbox.x;
            }
            if (right < bbox.x + bbox.width) {
                right = bbox.x + bbox.width;
            }
            if (top > bbox.y) {
                top = bbox.y;
            }
            if (bottom < bbox.y + bbox.height) {
                bottom = bbox.y + bbox.height;
            }
        }
        plain.x = left;
        plain.y = top;
        plain.width = right - left;
        plain.height = bottom - top;
    },

    /**
     * Renders all sprites contained in the composite to the surface.
     */
    render: function (surface, ctx, rect) {
        var mat = this.attr.matrix,
            i, ln;

        mat.toContext(ctx);
        for (i = 0, ln = this.sprites.length; i < ln; i++) {
            surface.renderSprite(this.sprites[i], rect);
        }
    }
});