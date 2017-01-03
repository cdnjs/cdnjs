/**
 * @class Ext.chart.interactions.Rotate
 * @extends Ext.chart.interactions.Abstract
 *
 * The Rotate interaction allows the user to rotate a polar chart about its central point.
 *
 *     @example preview
 *     var chart = new Ext.chart.PolarChart({
 *         animation: true,
 *         interactions: ['rotate'],
 *         colors: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e"],
 *         store: {
 *           fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *           data: [
 *               {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *               {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *               {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *               {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *               {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *           ]
 *         },
 *         series: [{
 *             type: 'pie',
 *             label: {
 *                 field: 'name',
 *                 display: 'rotate'
 *             },
 *             xField: 'data3',
 *             donut: 30
 *         }]
 *     });
 *     Ext.Viewport.setLayout('fit');
 *     Ext.Viewport.add(chart);
 */
Ext.define('Ext.chart.interactions.Rotate', {
    extend: 'Ext.chart.interactions.Abstract',

    type: 'rotate',

    alias: 'interaction.rotate',

    /**
     * @event rotate
     * Fires on every tick of the rotation
     * @param {Ext.chart.interactions.Rotate} this This interaction.
     * @param {Number} angle The new current rotation angle.
     */

    /**
     * @event rotationEnd
     * Fires after a user finishes the rotation
     * @param {Ext.chart.interactions.Rotate} this This interaction.
     * @param {Number} angle The new current rotation angle.
     */

    config: {
        /**
         * @cfg {String} gesture
         * Defines the gesture type that will be used to rotate the chart. Currently only
         * supports `pinch` for two-finger rotation and `drag` for single-finger rotation.
         * @private
         */
        gesture: 'rotate',

        //@inheritdoc
        gestures: {
            rotate: 'onRotate',
            rotateend: 'onRotate',
            dragstart: 'onGestureStart',
            drag: 'onGesture',
            dragend: 'onGestureEnd'
        },

        /**
         * @cfg {Number} rotation
         * Saves the current rotation of the series. Accepts negative values and values > 360 ( / 180 * Math.PI)
         * @private
         */
        rotation: 0
    },

    oldRotations: null,

    getAngle: function(e) {
        var me = this,
            chart = me.getChart(),
            xy = chart.getEventXY(e),
            center = chart.getCenter();

        return Math.atan2(
            xy[1] - center[1],
            xy[0] - center[0]
        );
    },

    getEventRadius: function(e) {
        var me = this,
            chart = me.getChart(),
            xy = chart.getEventXY(e),
            center = chart.getCenter(),
            dx = xy[0] - center[0],
            dy = xy[1] - center[1];

        return Math.sqrt(dx * dx + dy * dy);
    },

    onGestureStart: function(e) {
        var me = this,
            chart = me.getChart(),
            radius = chart.getRadius(),
            eventRadius = me.getEventRadius(e);

        if (radius >= eventRadius) {
            me.lockEvents('drag');
            me.angle = me.getAngle(e);
            me.oldRotations = {};
            return false;
        }
    },

    onGesture: function(e) {
        var me = this,
            angle = me.getAngle(e) - me.angle;

        if (me.getLocks().drag === me) {
            me.doRotateTo(angle, true);
            return false;
        }
    },

    /**
     * @private
     */
    doRotateTo: function(angle, relative, animate) {
        var me = this,
            chart = me.getChart(),
            axes = chart.getAxes(),
            series = chart.getSeries(),
            oldRotations = me.oldRotations,
            axis, seriesItem, oldRotation,
            i, ln;

        if (!animate) {
            chart.suspendAnimation();
        }

        for (i = 0, ln = axes.length; i < ln; i++) {
            axis = axes[i];
            oldRotation = oldRotations[axis.getId()] || (oldRotations[axis.getId()] = axis.getRotation());
            axis.setRotation( angle + (relative ? oldRotation : 0) );
        }

        for (i = 0, ln = series.length; i < ln; i++) {
            seriesItem = series[i];
            oldRotation = oldRotations[seriesItem.getId()] || (oldRotations[seriesItem.getId()] = seriesItem.getRotation());
            seriesItem.setRotation( angle + (relative ? oldRotation : 0) );
        }

        me.setRotation(angle + (relative ? oldRotation : 0));

        me.fireEvent('rotate', me, me.getRotation());

        me.sync();
        if (!animate) {
            chart.resumeAnimation();
        }
    },

    /**
     * Rotates a polar chart about its center point to the specified angle.
     * @param {Number} angle The angle to rotate to.
     * @param {Boolean} [relative=false] Whether the rotation is relative to the current angle or not.
     * @param {Boolean} [animate=false] Whether to animate the rotation or not.
     */
    rotateTo: function (angle, relative, animate) {
        this.doRotateTo(angle, relative, animate);
        this.oldRotations = {};
    },

    onGestureEnd: function(e) {
        var me = this;
        if (me.getLocks().drag === me) {
            me.onGesture(e);
            me.unlockEvents('drag');

            me.fireEvent('rotationEnd', me, me.getRotation());

            return false;
        }
    },

    onRotate: function(e) {

    }
});
