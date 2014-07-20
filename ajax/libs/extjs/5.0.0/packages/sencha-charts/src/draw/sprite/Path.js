/**
 * @class Ext.draw.sprite.Path
 * @extends Ext.draw.sprite.Sprite
 *
 * A sprite that represents a path.
 *
 *     @example preview miniphone
 *     var container = new Ext.draw.Container({
 *       items: [{
 *         type: 'path',
 *         path: 'M75,75 c0,-25 50,25 50,0 c0,-25 -50,25 -50,0',
 *         fillStyle: 'blue'
 *       }]
 *     });
 *     Ext.Viewport.setLayout('fit');
 *     Ext.Viewport.add(container);
 */
Ext.define('Ext.draw.sprite.Path', {
    extend: 'Ext.draw.sprite.Sprite',
    requires: ['Ext.draw.Draw', 'Ext.draw.Path'],
    alias: ['sprite.path', 'Ext.draw.Sprite'],
    type: 'path',
    //<debug>
    statics: {
        /**
         * Debug rendering options:
         *
         * debug: {
         *     bbox: true, // renders the bounding box of the path
         *     xray: true  // renders control points of the path
         * }
         *
         */
        debug: false
    },
    //</debug>
    inheritableStatics: {
        def: {
            processors: {
                /**
                 * @cfg {String} path The SVG based path string used by the sprite.
                 */
                path: function (n, o) {
                    if (!(n instanceof Ext.draw.Path)) {
                        n = new Ext.draw.Path(n);
                    }
                    return n;
                }
                //<debug>
                ,debug: 'default'
                //</debug>
            },
            aliases: {
                d: 'path'
            },
            dirtyTriggers: {
                path: 'bbox'
            },
            updaters: {
                path: function (attr) {
                    var path = attr.path;
                    if (!path || path.bindAttr !== attr) {
                        path = new Ext.draw.Path();
                        path.bindAttr = attr;
                        attr.path = path;
                    }
                    path.clear();
                    this.updatePath(path, attr);
                    attr.dirtyFlags.bbox = ['path'];
                }
            }
        }
    },

    updatePlainBBox: function (plain) {
        if (this.attr.path) {
            this.attr.path.getDimension(plain);
        }
    },

    updateTransformedBBox: function (transform) {
        if (this.attr.path) {
            this.attr.path.getDimensionWithTransform(this.attr.matrix, transform);
        }
    },

    render: function (surface, ctx) {
        var mat = this.attr.matrix,
            attr = this.attr;

        if (!attr.path || attr.path.coords.length === 0) {
            return;
        }
        mat.toContext(ctx);
        ctx.appendPath(attr.path);
        ctx.fillStroke(attr);

        //<debug>
        var debug = this.statics().debug || attr.debug;
        if (debug) {
            debug.bbox && this.renderBBox(surface, ctx);
            debug.xray && this.renderXRay(surface, ctx);
        }
        //</debug>
    },

    //<debug>
    renderBBox: function (surface, ctx) {
        var bbox = this.getBBox();
        ctx.beginPath();
        ctx.moveTo(bbox.x, bbox.y);
        ctx.lineTo(bbox.x + bbox.width, bbox.y);
        ctx.lineTo(bbox.x + bbox.width, bbox.y + bbox.height);
        ctx.lineTo(bbox.x, bbox.y + bbox.height);
        ctx.closePath();
        ctx.strokeStyle = 'red';
        ctx.strokeOpacity = 1;
        ctx.lineWidth = 0.5;
        ctx.stroke();
    },

    renderXRay: function (surface, ctx) {
        var attr = this.attr,
            mat = attr.matrix,
            imat = attr.inverseMatrix,
            path = attr.path,
            types = path.types,
            coords = path.coords,
            ln = path.types.length,
            size = 2,
            i, j;

        mat.toContext(ctx);
        ctx.beginPath();
        for (i = 0, j = 0; i < ln; i++) {
            switch (types[i]) {
                case 'M':
                    ctx.moveTo(coords[j] - size, coords[j + 1] - size);
                    ctx.rect(coords[j] - size, coords[j + 1] - size, size * 2, size * 2);
                    j += 2;
                    break;
                case 'L':
                    ctx.moveTo(coords[j] - size, coords[j + 1] - size);
                    ctx.rect(coords[j] - size, coords[j + 1] - size, size * 2, size * 2);
                    j += 2;
                    break;
                case 'C':
                    ctx.moveTo(coords[j] + size, coords[j + 1]);
                    ctx.arc(coords[j], coords[j + 1], size, 0, Math.PI * 2, true);
                    j += 2;
                    ctx.moveTo(coords[j] + size, coords[j + 1]);
                    ctx.arc(coords[j], coords[j + 1], size, 0, Math.PI * 2, true);
                    j += 2;
                    ctx.moveTo(coords[j] + size * 2, coords[j + 1]);
                    ctx.rect(coords[j] - size, coords[j + 1] - size, size * 2, size * 2);
                    j += 2;
                    break;
                default:
            }
        }
        imat.toContext(ctx);
        ctx.strokeStyle = 'black';
        ctx.strokeOpacity = 1;
        ctx.lineWidth = 1;
        ctx.stroke();

        mat.toContext(ctx);
        ctx.beginPath();
        for (i = 0, j = 0; i < ln; i++) {
            switch (types[i]) {
                case 'M':
                    ctx.moveTo(coords[j], coords[j + 1]);
                    j += 2;
                    break;
                case 'L':
                    ctx.moveTo(coords[j], coords[j + 1]);
                    j += 2;
                    break;
                case 'C':
                    ctx.lineTo(coords[j], coords[j + 1]);
                    j += 2;
                    ctx.moveTo(coords[j], coords[j + 1]);
                    j += 2;
                    ctx.lineTo(coords[j], coords[j + 1]);
                    j += 2;
                    break;
                default:
            }
        }
        imat.toContext(ctx);
        ctx.lineWidth = 0.5;
        ctx.stroke();
    },
    //</debug>

    /**
     * Update the path.
     * @param {Ext.draw.Path} path An empty path to draw on using path API.
     * @param {Object} attr The attribute object. Note: DO NOT use the `sprite.attr` instead of this
     * if you want to work with instancing.
     */
    updatePath: function (path, attr) {}
});