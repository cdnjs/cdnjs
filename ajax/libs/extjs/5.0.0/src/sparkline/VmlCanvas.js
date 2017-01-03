Ext.define('Ext.sparkline.VmlCanvas', {
    extend: 'Ext.sparkline.CanvasBase',

    constructor: function(ownerSparkLine) {
        var me = this;

        me.owner = ownerSparkLine;
        ownerSparkLine.element = {
            tag: 'span',
            reference: 'element',
            listeners: {
                mouseenter: 'onMouseEnter',
                mouseleave: 'onMouseLeave',
                mousemove: 'onMouseMove'
            },
            style: {
                display: 'inline-block',
                position: 'relative',
                overflow: 'hidden',
                margin: '0px',
                padding: '0px',
                verticalAlign: 'top',
                cursor: 'default'
            },
            children: [{
                tag: 'svml:group',
                reference: 'groupEl',
                coordorigin: '0 0',
                coordsize: '0 0',
                style: 'position:absolute;width:0;height:0;pointer-events:none'
            }]
        };
    },

    setWidth: function(width) {
        var me = this;

        me.callParent(arguments);
        me.owner.groupEl.dom.coordsize = me.width + ' ' + (me.height || 0);
        me.owner.groupEl.dom.style.width = width + 'px';
    },

    setHeight: function(height) {
        var me = this;

        me.callParent(arguments);
        me.owner.groupEl.dom.coordsize = (me.width || 0) + ' ' + me.height;
        me.owner.groupEl.dom.style.height = height + 'px';
    },

    onOwnerUpdate: function () {
        var me = this;

        me.group = me.owner.groupEl;
        me.el = me.owner.element;
        me.prerender = [];
    },

    _drawShape: function (shapeid, path, lineColor, fillColor, lineWidth) {
        var vpath = [],
            initial, stroke, fill, closed, plen, i;

        for (i = 0, plen = path.length; i < plen; i++) {
            vpath[i] = (path[i][0]) + ',' + (path[i][1]);
        }
        initial = vpath.splice(0, 1);
        lineWidth = lineWidth == null ? 1 : lineWidth;
        stroke = lineColor == null ? ' stroked="false" ' : ' strokeWeight="' + lineWidth + 'px" strokeColor="' + lineColor + '" ';
        fill = fillColor == null ? ' filled="false"' : ' fillColor="' + fillColor + '" filled="true" ';
        closed = vpath[0] === vpath[vpath.length - 1] ? 'x ' : '';
        return ['<svml:shape coordorigin="0 0" coordsize="', this.pixelWidth, ' ', this.pixelHeight,
                '" id="jqsshape', shapeid, '" ',
                stroke,
                fill,
            ' style="position:absolute;height:', this.pixelHeight, 'px;width:', this.pixelWidth, 'px" ',
            ' path="m ', initial, ' l ', vpath.join(', '), ' ', closed, 'e"></svml:shape>'
        ].join('');
    },

    _drawCircle: function (shapeid, x, y, radius, lineColor, fillColor, lineWidth) {
        var circumference = radius * 2,
            stroke, fill;

        x -= radius;
        y -= radius;
        stroke = lineColor == null ? ' stroked="false" ' : ' strokeWeight="' + lineWidth + 'px" strokeColor="' + lineColor + '" ';
        fill = fillColor == null ? ' filled="false"' : ' fillColor="' + fillColor + '" filled="true" ';
        return ['<svml:oval id="jqsshape', shapeid, '" ',
            stroke,
            fill,
            ' style="position:absolute;top:', y, 'px; left:', x, 'px;width:', circumference, 'px;height:', circumference, 'px"></svml:oval>'
        ].join('');
    },

    _drawPieSlice: function (shapeid, x, y, radius, startAngle, endAngle, lineColor, fillColor) {
        var vpath,
            width = this.pixelWidth,
            height = this.pixelHeight,
            startx,
            starty,
            endx,
            endy,
            stroke = lineColor == null ? ' stroked="false" ' : ' strokeWeight="1px" strokeColor="' + lineColor + '" ',
            fill = fillColor == null ? ' filled="false"' : ' fillColor="' + fillColor + '" filled="true" ';

        // VML cannot handle start & end angle the same.
        if (startAngle === endAngle) {
            return '';
        }
        if ((endAngle - startAngle) === (2 * Math.PI)) {
            startAngle = 0.0;  // VML seems to have a problem when drawing a full circle that doesn't start 0
            endAngle = (2 * Math.PI);
        }

        startx = x + Math.round(Math.cos(startAngle) * radius);
        starty = y + Math.round(Math.sin(startAngle) * radius);
        endx = x + Math.round(Math.cos(endAngle) * radius);
        endy = y + Math.round(Math.sin(endAngle) * radius);

        if (startx === endx && starty === endy) {
            if ((endAngle - startAngle) < Math.PI) {
                // Prevent very small slices from being mistaken as a whole pie
                return '';
            }
            // essentially going to be the entire circle, so ignore startAngle
            startx = endx = x + radius;
            starty = endy = y;
        }

        if (startx === endx && starty === endy && (endAngle - startAngle) < Math.PI) {
            return '';
        }

        vpath = [x - radius, y - radius, x + radius, y + radius, startx, starty, endx, endy];
        return ['<svml:shape coordorigin="0 0" coordsize="', width, ' ', height,
            '" id="jqsshape', shapeid, '" ',
            stroke,
            fill,
            ' style="position:absolute;height:', height, 'px;width:', width,
            'px" path="m ', x, ',', y, ' wa ', vpath.join(', '), ' x e"></svml:shape>'
        ].join('');
    },

    _drawRect: function (shapeid, x, y, width, height, lineColor, fillColor) {
        return this._drawShape(shapeid, [[x, y], [x, y + height], [x + width, y + height], [x + width, y], [x, y]], lineColor, fillColor);
    },

    reset: function () {
        Ext.fly(this.group).empty();
    },

    appendShape: function (shape) {
        this.prerender.push(this['_draw' + shape.type].apply(this, shape.args));
        this.lastShapeId = shape.id;
        return shape.id;
    },

    replaceWithShape: function (shapeid, shape) {
        var existing = this.el.getById('jqsshape' + shapeid, true),
            vel = this['_draw' + shape.type].apply(this, shape.args);

        existing.outerHTML = vel;
    },

    replaceWithShapes: function (shapeids, shapes) {
        // replace the first shapeid with all the new shapes then toast the remaining old shapes
        var existing = this.el.getById('jqsshape' + shapeids[0], true),
            replace = '',
            slen = shapes.length,
            i;

        for (i = 0; i < slen; i++) {
            replace += this['_draw' + shapes[i].type].apply(this, shapes[i].args);
        }
        existing.outerHTML = replace;
        for (i = 1; i < shapeids.length; i++) {
            this.el.getById('jqsshape' + shapeids[i]).destroy();
        }
    },

    insertAfterShape: function (shapeid, shape) {
        var existing = this.el.getById('jqsshape' + shapeid, true),
                vel = this['_draw' + shape.type].apply(this, shape.args);
        existing.insertAdjacentHTML('afterEnd', vel);
    },

    removeShapeId: function (shapeid) {
        var existing = this.el.getById('jqsshape' + shapeid, true);
        this.group.removeChild(existing);
    },

    getShapeAt: function (x, y) {
        var shapeid = this.el.id.substr(8);
        return shapeid;
    },

    render: function () {
        this.group.dom.innerHTML = this.prerender.join('');
    }
}, function() {
    Ext.onReady(function() {
        var doc = document;
    
        if (doc.namespaces && !doc.namespaces.svml) {
            doc.namespaces.add("svml", "urn:schemas-microsoft-com:vml", '#default#VML');
        }
    });
});
