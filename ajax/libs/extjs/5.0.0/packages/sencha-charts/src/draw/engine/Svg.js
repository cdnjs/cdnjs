/**
 * @class Ext.draw.engine.Svg
 * @extends Ext.draw.Surface
 *
 * SVG engine.
 */
Ext.define('Ext.draw.engine.Svg', {
    extend: 'Ext.draw.Surface',
    requires: ['Ext.draw.engine.SvgContext'],

    statics: {
        BBoxTextCache: {}
    },

    config: {
        /**
         * Nothing needs to be done in high precision mode.
         */
        highPrecision: false
    },

    getElementConfig: function () {
        //TODO:ps In the Ext world, use renderTpl to create the children
        return {
            reference: 'element',
            style: {
                position: 'absolute'
            },
            children: [
                {
                    reference: 'innerElement',
                    style: {
                        width: '100%',
                        height: '100%',
                        position: 'relative'
                    },
                    children: [
                        {
                            tag: 'svg',
                            reference: 'svgElement',
                            namespace: "http://www.w3.org/2000/svg",
                            version: 1.1
                        }
                    ]
                }
            ]
        };
    },

    constructor: function (config) {
        var me = this;
        me.callParent([config]);
        me.mainGroup = me.createSvgNode("g");
        me.defElement = me.createSvgNode("defs");
        // me.svgElement is assigned in element creation of Ext.Component.
        me.svgElement.appendChild(me.mainGroup);
        me.svgElement.appendChild(me.defElement);
        me.ctx = new Ext.draw.engine.SvgContext(me);
    },

    /**
     * Creates a DOM element under the SVG namespace of the given type.
     * @param {String} type The type of the SVG DOM element.
     * @return {*} The created element.
     */
    createSvgNode: function (type) {
        var node = document.createElementNS("http://www.w3.org/2000/svg", type);
        return Ext.get(node);
    },

    /**
     * @private
     * Returns the SVG DOM element at the given position. If it does not already exist or is a different element tag
     * it will be created and inserted into the DOM.
     * @param {Ext.dom.Element} group The parent DOM element.
     * @param {String} tag The SVG element tag.
     * @param {Number} position The position of the element in the DOM.
     * @return {Ext.dom.Element} The SVG element.
     */
    getSvgElement: function (group, tag, position) {
        var element;
        if (group.dom.childNodes.length > position) {
            element = group.dom.childNodes[position];
            if (element.tagName === tag) {
                return Ext.get(element);
            } else {
                Ext.destroy(element);
            }
        }

        element = Ext.get(this.createSvgNode(tag));
        if (position === 0) {
            group.insertFirst(element);
        } else {
            element.insertAfter(Ext.fly(group.dom.childNodes[position - 1]));
        }
        element.cache = {};
        return element;
    },

    /**
     * @private
     * Applies attributes to the given element.
     * @param {Ext.dom.Element} element The DOM element to be applied.
     * @param {Object} attributes The attributes to apply to the element.
     */
    setElementAttributes: function (element, attributes) {
        var dom = element.dom,
            cache = element.cache,
            name, value;
        for (name in attributes) {
            value = attributes[name];
            if (cache[name] !== value) {
                cache[name] = value;
                dom.setAttribute(name, value);
            }
        }
    },

    /**
     * @private
     * Gets the next reference element under the SVG 'defs' tag.
     * @param {String} tagName The type of reference element.
     * @return {Ext.dom.Element} The reference element.
     */
    getNextDef: function (tagName) {
        return this.getSvgElement(this.defElement, tagName, this.defPosition++);
    },

    /**
     * @inheritdoc
     */
    clearTransform: function () {
        var me = this;
        me.mainGroup.set({transform: me.matrix.toSvg()});
    },

    /**
     * @inheritdoc
     */
    clear: function () {
        this.ctx.clear();
        this.defPosition = 0;
    },

    /**
     * @inheritdoc
     */
    renderSprite: function (sprite) {
        var me = this,
            rect = me.getRect(),
            ctx = me.ctx;
        if (sprite.attr.hidden || sprite.attr.opacity === 0) {
            ctx.save();
            ctx.restore();
            return;
        }
        try {
            sprite.element = ctx.save();
            sprite.preRender(this);
            sprite.useAttributes(ctx, rect);
            if (false === sprite.render(this, ctx, [0, 0, rect[2], rect[3]])) {
                return false;
            }
            sprite.setDirty(false);
        }
        catch (e) {
            //<debug>
            Ext.log.error(this.$className + ': Unhandled Exception: ', e.description || e.message);
            //</debug>
            throw e;
        }
        finally {
            ctx.restore();
        }
    },

    flatten: function (size, surfaces) {
        var svg = '<?xml version="1.0" standalone="yes"?>',
            className = Ext.getClassName(this),
            surface, rect, i;

        svg += '<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg"' +
            ' width="' + size.width + '"' +
            ' height="' + size.height + '">';

        for (i = 0; i < surfaces.length; i++) {
            surface = surfaces[i];
            if (Ext.getClassName(surface) !== className) {
                continue;
            }
            rect = surface.getRect();
            svg += '<g transform="translate(' + rect[0] + ',' + rect[1] + ')">';
            svg += this.serializeNode(surface.svgElement.dom);
            svg += '</g>';
        }
        svg += '</svg>';
        return {
            data: 'data:image/svg+xml;utf8,' + encodeURIComponent(svg),
            type: 'svg'
        };
    },

    /**
     * @private
     * Serializes an SVG DOM element and its children recursively into a string.
     * @param {Object} node DOM element to serialize.
     * @returns {String}
     */
    serializeNode: function (node) {
        var result = '',
            i, n, attr, child;
        if (node.nodeType === document.TEXT_NODE) {
            return node.nodeValue;
        }
        result += '<' + node.nodeName;
        if (node.attributes.length) {
            for (i = 0, n = node.attributes.length; i < n; i++) {
                attr = node.attributes[i];
                result += ' ' + attr.name + '="' + attr.value + '"';
            }
        }
        result += '>';
        if (node.childNodes && node.childNodes.length) {
            for (i = 0, n = node.childNodes.length; i < n; i++) {
                child = node.childNodes[i];
                result += this.serializeNode(child);
            }
        }
        result += '</' + node.nodeName + '>';
        return result;
    },

    /**
     * Destroys the Canvas element and prepares it for Garbage Collection.
     */
    destroy: function (path, matrix, band) {
        var me = this;
        me.ctx.destroy();
        me.mainGroup.destroy();
        delete me.mainGroup;
        delete me.ctx;
        me.callParent(arguments);
    },

    remove: function (sprite, destroySprite) {
        if (sprite && sprite.element) {
            //if sprite has an associated svg element remove it from the surface
            if (this.ctx) {
                this.ctx.removeElement(sprite.element);
            } else {
                sprite.element.destroy();
            }
            sprite.element = null;
        }
        this.callParent(arguments);
    }
});
