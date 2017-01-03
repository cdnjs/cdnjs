/**
 * Radial gradient.
 *
 *     @example preview miniphone
 *     var container = new Ext.draw.Container({
 *       items: [{
 *         type: 'circle',
 *         cx: 50,
 *         cy: 50,
 *         r: 100,
 *         fillStyle: {
 *           type: 'radial',
 *           start: {
 *             x: 0,
 *             y: 0,
 *             r: 0
 *           },
 *           end: {
 *             x: 0,
 *             y: 0,
 *             r: 1
 *           },
 *           stops: [
 *             {
 *               offset: 0,
 *               color: 'white'
 *             },
 *             {
 *               offset: 1,
 *               color: 'blue'
 *             }
 *           ]
 *         }
 *       }]
 *     });
 *     Ext.Viewport.setLayout('fit');
 *     Ext.Viewport.add(container);
 */
Ext.define("Ext.draw.gradient.Radial", {
    extend: 'Ext.draw.gradient.Gradient',
    type: 'radial',
    config: {
        /**
         * @cfg {Object} start The starting circle of the gradient.
         */
        start: {
            x: 0,
            y: 0,
            r: 0
        },
        /**
         * @cfg {Object} end The ending circle of the gradient.
         */
        end: {
            x: 0,
            y: 0,
            r: 1
        }
    },

    applyStart: function (newStart, oldStart) {
        if (!oldStart) {
            return newStart;
        }
        var circle = {
            x: oldStart.x,
            y: oldStart.y,
            r: oldStart.r
        };

        if ('x' in newStart) {
            circle.x = newStart.x;
        } else if ('centerX' in newStart) {
            circle.x = newStart.centerX;
        }

        if ('y' in newStart) {
            circle.y = newStart.y;
        } else if ('centerY' in newStart) {
            circle.y = newStart.centerY;
        }

        if ('r' in newStart) {
            circle.r = newStart.r;
        } else if ('radius' in newStart) {
            circle.r = newStart.radius;
        }
        return circle;
    },

    applyEnd: function (newEnd, oldEnd) {
        if (!oldEnd) {
            return newEnd;
        }
        var circle = {
            x: oldEnd.x,
            y: oldEnd.y,
            r: oldEnd.r
        };

        if ('x' in newEnd) {
            circle.x = newEnd.x;
        } else if ('centerX' in newEnd) {
            circle.x = newEnd.centerX;
        }

        if ('y' in newEnd) {
            circle.y = newEnd.y;
        } else if ('centerY' in newEnd) {
            circle.y = newEnd.centerY;
        }

        if ('r' in newEnd) {
            circle.r = newEnd.r;
        } else if ('radius' in newEnd) {
            circle.r = newEnd.radius;
        }
        return circle;
    },

    /**
     * @inheritdoc
     */
    generateGradient: function (ctx, bbox) {
        var start = this.getStart(),
            end = this.getEnd(),
            w = bbox.width * 0.5,
            h = bbox.height * 0.5,
            x = bbox.x + w,
            y = bbox.y + h,
            gradient = ctx.createRadialGradient(
                x + start.x * w, y + start.y * h, start.r * Math.max(w, h),
                x + end.x * w, y + end.y * h, end.r * Math.max(w, h)
            ),
            stops = this.getStops(),
            ln = stops.length,
            i;

        for (i = 0; i < ln; i++) {
            gradient.addColorStop(stops[i].offset, stops[i].color);
        }
        return gradient;
    }
});