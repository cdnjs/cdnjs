/**
 * A Surface is an interface to render methods inside a draw {@link Ext.draw.Container}.
 * A Surface contains methods to render sprites, get bounding boxes of sprites, add
 * sprites to the canvas, initialize other graphic components, etc. One of the most used
 * methods for this class is the `add` method, to add Sprites to the surface.
 *
 * Most of the Surface methods are abstract and they have a concrete implementation
 * in Canvas or SVG engines.
 *
 * A Surface instance can be accessed as a property of a draw container. For example:
 *
 *     drawContainer.getSurface('main').add({
 *         type: 'circle',
 *         fill: '#ffc',
 *         radius: 100,
 *         x: 100,
 *         y: 100
 *     });
 *
 * The configuration object passed in the `add` method is the same as described in the {@link Ext.draw.sprite.Sprite}
 * class documentation.
 *
 * ## Example
 *
 *     drawContainer.getSurface('main').add([
 *         {
 *             type: 'circle',
 *             radius: 10,
 *             fill: '#f00',
 *             x: 10,
 *             y: 10
 *         },
 *         {
 *             type: 'circle',
 *             radius: 10,
 *             fill: '#0f0',
 *             x: 50,
 *             y: 50
 *         },
 *         {
 *             type: 'circle',
 *             radius: 10,
 *             fill: '#00f',
 *             x: 100,
 *             y: 100
 *         },
 *         {
 *             type: 'rect',
 *             radius: 10,
 *             x: 10,
 *             y: 10
 *         },
 *         {
 *             type: 'rect',
 *             radius: 10,
 *             x: 50,
 *             y: 50
 *         },
 *         {
 *             type: 'rect',
 *             radius: 10,
 *             x: 100,
 *             y: 100
 *         }
 *     ]);
 *
 */
Ext.define('Ext.draw.Surface', {
    extend: 'Ext.draw.SurfaceBase',
    xtype: 'surface',

    requires: [
        'Ext.draw.sprite.*',
        'Ext.draw.gradient.*',
        'Ext.draw.sprite.AttributeDefinition',
        'Ext.draw.Matrix',
        'Ext.draw.Draw'
    ],

    uses: [
        'Ext.draw.engine.Canvas'
    ],

    /**
     * The reported device pixel density.
     */
    devicePixelRatio: window.devicePixelRatio || 1,

    statics: {
        /**
         * Stably sort the list of sprites by their zIndex.
         * TODO: Improve the performance. Reduce gc impact.
         * @param {Array} list
         */
        stableSort: function (list) {
            if (list.length < 2) {
                return;
            }
            var keys = {}, sortedKeys, result = [], i, ln, zIndex;

            for (i = 0, ln = list.length; i < ln; i++) {
                zIndex = list[i].attr.zIndex;
                if (!keys[zIndex]) {
                    keys[zIndex] = [list[i]];
                } else {
                    keys[zIndex].push(list[i]);
                }
            }
            sortedKeys = Ext.Object.getKeys(keys).sort(function (a, b) {return a - b;});
            for (i = 0, ln = sortedKeys.length; i < ln; i++) {
                result.push.apply(result, keys[sortedKeys[i]]);
            }
            for (i = 0, ln = list.length; i < ln; i++) {
                list[i] = result[i];
            }
        }
    },

    config: {
        cls: Ext.baseCSSPrefix + 'surface',
        /**
         * @cfg {Array}
         * The rect of the surface related to its container.
         */
        rect: null,

        /**
         * @cfg {Object}
         * Background sprite config of the surface.
         */
        background: null,

        /**
         * @cfg {Array}
         * Array of sprite instances.
         */
        items: [],

        /**
         * @cfg {Boolean}
         * Indicates whether the surface needs redraw.
         */
        dirty: false,

        /**
         * @cfg {Boolean} flipRtlText
         * If the surface is in the RTL mode, text will render with the RTL direction,
         * but the alignment and position of the text won't change by default.
         * Setting this config to 'true' will get text alignment and its position
         * within a surface mirrored.
         */
        flipRtlText: false
    },

    isSurface: true,

    dirtyPredecessor: 0,

    constructor: function (config) {
        var me = this;

        me.predecessors = [];
        me.successors = [];
        // The `pendingRenderFrame` flag is used to indicate that `predecessors` (surfaces that should render first)
        // are dirty, and to call `renderFrame` when all `predecessors` have their `renderFrame` called
        // (i.e. not dirty anymore).
        me.pendingRenderFrame = false;
        me.map = {};

        me.callParent([config]);
        me.matrix = new Ext.draw.Matrix();
        me.inverseMatrix = me.matrix.inverse(me.inverseMatrix);
        me.resetTransform();
    },

    /**
     * Round the number to align to the pixels on device.
     * @param {Number} num The number to align.
     * @return {Number} The resultant alignment.
     */
    roundPixel: function (num) {
        return Math.round(this.devicePixelRatio * num) / this.devicePixelRatio;
    },

    /**
     * Mark the surface to render after another surface is updated.
     * @param {Ext.draw.Surface} surface The surface to wait for.
     */
    waitFor: function (surface) {
        var me = this,
            predecessors = me.predecessors;
        if (!Ext.Array.contains(predecessors, surface)) {
            predecessors.push(surface);
            surface.successors.push(me);
            if (surface._dirty) {
                me.dirtyPredecessor++;
            }
        }
    },

    setDirty: function (dirty) {
        if (this._dirty !== dirty) {
            var successors = this.successors, successor,
                i, ln = successors.length;
            for (i = 0; i < ln; i++) {
                successor = successors[i];
                if (dirty) {
                    successor.dirtyPredecessor++;
                    successor.setDirty(true);
                } else {
                    successor.dirtyPredecessor--;
                    if (successor.dirtyPredecessor === 0 && successor.pendingRenderFrame) {
                        successor.renderFrame();
                    }
                }
            }
            this._dirty = dirty;
        }
    },

    applyElement: function (newElement, oldElement) {
        if (oldElement) {
            oldElement.set(newElement);
        } else {
            oldElement = Ext.Element.create(newElement);
        }
        this.setDirty(true);
        return oldElement;
    },

    applyBackground: function (background, oldBackground) {
        this.setDirty(true);
        if (Ext.isString(background)) {
            background = { fillStyle: background };
        }
        return Ext.factory(background, Ext.draw.sprite.Rect, oldBackground);
    },

    applyRect: function (rect, oldRect) {
        if (oldRect && rect[0] === oldRect[0] && rect[1] === oldRect[1] && rect[2] === oldRect[2] && rect[3] === oldRect[3]) {
            return;
        }
        if (Ext.isArray(rect)) {
            return [rect[0], rect[1], rect[2], rect[3]];
        } else if (Ext.isObject(rect)) {
            return [
                rect.x || rect.left,
                rect.y || rect.top,
                rect.width || (rect.right - rect.left),
                rect.height || (rect.bottom - rect.top)
            ];
        }
    },

    updateRect: function (rect) {
        var me = this,
            l = rect[0],
            t = rect[1],
            r = l + rect[2],
            b = t + rect[3],
            background = me.getBackground(),
            element = me.element;

        element.setLocalXY(Math.floor(l), Math.floor(t));
        element.setSize(Math.ceil(r - Math.floor(l)), Math.ceil(b - Math.floor(t)));

        if (background) {
            background.setAttributes({
                x: 0,
                y: 0,
                width: Math.ceil(r - Math.floor(l)),
                height: Math.ceil(b - Math.floor(t))
            });
        }
        me.setDirty(true);
    },

    /**
     * Reset the matrix of the surface.
     */
    resetTransform: function () {
        this.matrix.set(1, 0, 0, 1, 0, 0);
        this.inverseMatrix.set(1, 0, 0, 1, 0, 0);
        this.setDirty(true);
    },

    /**
     * Get the sprite by id or index.
     * It will first try to find a sprite with the given id, otherwise will try to use the id as an index.
     * @param {String|Number} id
     * @returns {Ext.draw.sprite.Sprite}
     */
    get: function (id) {
        return this.map[id] || this.items[id];
    },

    /**
     * Add a Sprite to the surface.
     * You can put any number of object as parameter.
     * See {@link Ext.draw.sprite.Sprite} for the configuration object to be passed into this method.
     *
     * For example:
     *
     *     drawContainer.surface.add({
     *         type: 'circle',
     *         fill: '#ffc',
     *         radius: 100,
     *         x: 100,
     *         y: 100
     *     });
     *
     */
    add: function () {
        var me = this,
            args = Array.prototype.slice.call(arguments),
            argIsArray = Ext.isArray(args[0]),
            results = [],
            sprite, sprites, items, i, ln;

        items = Ext.Array.clean(argIsArray ? args[0] : args);
        if (!items.length) {
            return results;
        }
        sprites = me.prepareItems(items);

        for (i = 0, ln = sprites.length; i < ln; i++) {
            sprite = sprites[i];
            me.map[sprite.getId()] = sprite;
            results.push(sprite);
            sprite.setParent(me);
            sprite.setSurface(me);
            me.onAdd(sprite);
        }

        items = me.getItems();
        if (items) {
            items.push.apply(items, results);
        }

        me.dirtyZIndex = true;
        me.setDirty(true);

        if (!argIsArray && results.length === 1) {
            return results[0];
        } else {
            return results;
        }
    },

    /**
     * @protected
     * Invoked when a sprite is added to the surface.
     * @param {Ext.draw.sprite.Sprite} sprite The sprite to be added.
     */
    onAdd: Ext.emptyFn,

    /**
     * Remove a given sprite from the surface, optionally destroying the sprite in the process.
     * You can also call the sprite own `remove` method.
     *
     * For example:
     *
     *      drawContainer.surface.remove(sprite);
     *      // or...
     *      sprite.remove();
     *
     * @param {Ext.draw.sprite.Sprite} sprite
     * @param {Boolean} [destroySprite=false]
     */
    remove: function (sprite, destroySprite) {
        if (sprite) {
            delete this.map[sprite.getId()];
            if (destroySprite) {
                sprite.destroy();
            } else {
                sprite.setParent(null);
                sprite.setSurface(null);
                Ext.Array.remove(this.getItems(), sprite);
            }
            this.dirtyZIndex = true;
            this.setDirty(true);
        }
    },

    /**
     * Remove all sprites from the surface, optionally destroying the sprites in the process.
     *
     * For example:
     *
     *      drawContainer.getSurface('main').removeAll();
     *
     * @param {Boolean} [destroySprites=false]
     */
    removeAll: function (destroySprites) {
        var items = this.getItems(),
            i = items.length,
            item;
        if (destroySprites) {
            while (i > 0) {
                items[--i].destroy();
            }
        } else {
            while (i > 0) {
                i--;
                item = items[i];
                item.setParent(null);
                item.setSurface(null);
            }
        }
        items.length = 0;
        this.map = {};
        this.dirtyZIndex = true;
    },

    // @private
    applyItems: function (items) {
        if (this.getItems()) {
            this.removeAll(true);
        }
        return Ext.Array.from(this.add(items));
    },

    /**
     * @private
     * Initialize and apply defaults to surface items.
     */
    prepareItems: function (items) {
        items = [].concat(items);
        // Make sure defaults are applied and item is initialized

        var me = this,
            item, i, ln, j,
            removeSprite = function (sprite) {
                this.remove(sprite, false);
            };

        for (i = 0, ln = items.length; i < ln; i++) {
            item = items[i];
            if (!(item instanceof Ext.draw.sprite.Sprite)) {
                // Temporary, just take in configs...
                item = items[i] = me.createItem(item);
            }
            item.on('beforedestroy', removeSprite, me);
        }
        return items;
    },

    /**
     * @private Creates an item and appends it to the surface. Called
     * as an internal method when calling `add`.
     */
    createItem: function (config) {
        return Ext.create(config.xclass || 'sprite.' + config.type, config);
    },

    /**
     * Return the minimal bounding box that contains all the sprites bounding boxes in the given list of sprites.
     * @param {Ext.draw.sprite.Sprite[]|Ext.draw.sprite.Sprite} sprites
     * @param {Boolean} [isWithoutTransform=false]
     * @returns {{x: Number, y: Number, width: number, height: number}}
     */
    getBBox: function (sprites, isWithoutTransform) {
        var sprites = Ext.Array.from(sprites),
            left = Infinity,
            right = -Infinity,
            top = Infinity,
            bottom = -Infinity,
            sprite, bbox, i, ln;

        for (i = 0, ln = sprites.length; i < ln; i++) {
            sprite = sprites[i];
            bbox = sprite.getBBox(isWithoutTransform);
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
        return {
            x: left,
            y: top,
            width: right - left,
            height: bottom - top
        };
    },

    emptyRect: [0, 0, 0, 0],

    // Converts event's page coordinates into surface coordinates.
    // Note: surface's x-coordinates always go LTR, regardless of RTL mode.
    getEventXY: function (e) {
        var me = this,
            isRtl = me.getInherited().rtl,
            pageXY = e.getXY(), // Event position in page coordinates.
            container = me.el.up(),
            xy = container.getXY(), // Surface container position in page coordinates.
            rect = me.getRect() || me.emptyRect, // Surface position in surface container coordinates (LTR).
            result = [],
            width;

        if (isRtl) {
            width = container.getWidth();
            if (Ext.isIE8) {
                result[0] = pageXY[0] + xy[0] - rect[0] + width - document.body.clientWidth;
            } else {
                // The line below is actually a simplified form of
                // rect[2] - (pageXY[0] - xy[0] - (width - (rect[0] + rect[2]))).
                result[0] = xy[0] - pageXY[0] - rect[0] + width;
            }
        } else {
            result[0] = pageXY[0] - xy[0] - rect[0];
        }
        result[1] = pageXY[1] - xy[1] - rect[1];
        return result;
    },

    /**
     * Empty the surface content (without touching the sprites.)
     */
    clear: Ext.emptyFn,

    /**
     * @private
     * Order the items by their z-index if any of that has been changed since last sort.
     */
    orderByZIndex: function () {
        var me = this,
            items = me.getItems(),
            dirtyZIndex = false,
            i, ln;

        if (me.getDirty()) {
            for (i = 0, ln = items.length; i < ln; i++) {
                if (items[i].attr.dirtyZIndex) {
                    dirtyZIndex = true;
                    break;
                }
            }
            if (dirtyZIndex) {
                // sort by zIndex
                Ext.draw.Surface.stableSort(items);
                this.setDirty(true);
            }

            for (i = 0, ln = items.length; i < ln; i++) {
                items[i].attr.dirtyZIndex = false;
            }
        }
    },

    /**
     * Force the element to redraw.
     */
    repaint: function () {
        var me = this;
        me.repaint = Ext.emptyFn;
        setTimeout(function () {
            delete me.repaint;
            me.element.repaint();
        }, 1);
    },

    /**
     * Triggers the re-rendering of the canvas.
     */
    renderFrame: function () {
        if (!this.element) {
            return;
        }
        if (this.dirtyPredecessor > 0) {
            this.pendingRenderFrame = true;
            return;
        }

        var me = this,
            rect = this.getRect(),
            background = me.getBackground(),
            items = me.getItems(),
            item, i, ln;

        // Cannot render before the surface is placed.
        if (!rect) {
            return;
        }

        // This will also check the dirty flags of the sprites.
        me.orderByZIndex();
        if (me.getDirty()) {
            me.clear();
            me.clearTransform();

            if (background) {
                me.renderSprite(background);
            }

            for (i = 0, ln = items.length; i < ln; i++) {
                item = items[i];
                if (false === me.renderSprite(item)) {
                    return;
                }
                item.attr.textPositionCount = me.textPosition;
            }

            me.setDirty(false);
        }
    },

    /**
     * @private
     * Renders a single sprite into the surface.
     * Do not call it from outside `renderFrame` method.
     *
     * @param {Ext.draw.sprite.Sprite} sprite The Sprite to be rendered.
     * @return {Boolean} returns `false` to stop the rendering to continue.
     */
    renderSprite: Ext.emptyFn,

    /**
     * @method flatten
     * Flattens the given drawing surfaces into a single image
     * and returns an object containing the data (in the DataURL format)
     * and the type (e.g. 'png' or 'svg') of that image.
     * @param {Object} size The size of the final image.
     * @param {Number} size.width
     * @param {Number} size.height
     * @param {Ext.draw.Surface[]} surfaces The surfaces to flatten.
     * @return {Object}
     * @return {String} return.data The DataURL of the flattened image.
     * @return {String} return.type The type of the image.
     *
     */

    /**
     * @private
     * Clears the current transformation state on the surface.
     */
    clearTransform: Ext.emptyFn,

    /**
     * Returns 'true' if the surface is dirty.
     * @return {Boolean} 'true' if the surface is dirty
     */
    getDirty: function () {
        return this._dirty;
    },

    /**
     * Destroys the surface. This is done by removing all components from it and
     * also removing its reference to a DOM element.
     *
     * For example:
     *
     *      drawContainer.surface.destroy();
     */
    destroy: function () {
        var me = this;
        me.removeAll();
        me.setBackground(null);
        me.predecessors = null;
        me.successors = null;
        me.callParent();
    }
});


