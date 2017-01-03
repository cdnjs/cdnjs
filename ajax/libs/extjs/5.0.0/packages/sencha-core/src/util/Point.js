/**
 * Represents a 2D point with x and y properties, useful for comparison and instantiation
 * from an event:
 *
 *     var point = Ext.util.Point.fromEvent(e);
 */
Ext.define('Ext.util.Point', {
    extend: 'Ext.util.Region',

    radianToDegreeConstant: 180 / Math.PI,
    
    origin: { x: 0, y: 0 },

    statics: {
        /**
         * Returns a new instance of {@link Ext.util.Point} based on the `pageX` / `pageY` values of the given event.
         * @static
         * @param {Event} e The event.
         * @return {Ext.util.Point}
         */
        fromEvent: function(e) {
            var changedTouches = e.changedTouches,
                touch = (changedTouches && changedTouches.length > 0) ? changedTouches[0] : e;

            return this.fromTouch(touch);
        },

        /**
         * Returns a new instance of {@link Ext.util.Point} based on the `pageX` / `pageY` values of the given touch.
         * @static
         * @param {Event} touch
         * @return {Ext.util.Point}
         */
        fromTouch: function(touch) {
            return new this(touch.pageX, touch.pageY);
        },

        /**
         * Returns a new point from an object that has `x` and `y` properties, if that object is not an instance
         * of {@link Ext.util.Point}. Otherwise, returns the given point itself.
         * @param {Object} object
         * @return {Ext.util.Point}
         */
        from: function(object) {
            if (!object) {
                return new this(0, 0);
            }

            if (!(object instanceof this)) {
                return new this(object.x, object.y);
            }

            return object;
        }
    },

    /**
     * Creates point on 2D plane.
     * @param {Number} [x=0] X coordinate.
     * @param {Number} [y=0] Y coordinate.
     */
    constructor: function(x, y) {
        if (x == null) {
            x = 0;
        }

        if (y == null) {
            y = 0;
        }

        this.callParent([y, x, y, x]);
    },

    /**
     * Copy a new instance of this point.
     * @return {Ext.util.Point} The new point.
     */
    clone: function() {
        return new this.self(this.x, this.y);
    },

    /**
     * Clones this Point.
     * @deprecated 2.0.0 Please use {@link #clone} instead.
     * @return {Ext.util.Point} The new point.
     */
    copy: function() {
        return this.clone.apply(this, arguments);
    },

    /**
     * Copy the `x` and `y` values of another point / object to this point itself.
     * @param {Ext.util.Point/Object} point.
     * @return {Ext.util.Point} This point.
     */
    copyFrom: function(point) {
        this.x = point.x;
        this.y = point.y;

        return this;
    },

    /**
     * Returns a human-eye-friendly string that represents this point,
     * useful for debugging.
     * @return {String} For example `Point[12,8]`.
     */
    toString: function() {
        return "Point[" + this.x + "," + this.y + "]";
    },

    /**
     * Returns `true` if the passed point is within a certain distance of this point.
     * @param {Ext.util.Point/Object} point The point to check with, either an instance
     * of {@link Ext.util.Point} or an object with `x` and `y` properties.
     * @param {Object/Number} threshold Can be either an object with `x` and `y` properties or a number.
     * @return {Boolean}
     */
    isCloseTo: function(point, threshold) {
        if (typeof threshold == 'number') {
            return this.getDistanceTo(point) <= threshold;
        }

        var x = point.x,
            y = point.y,
            thresholdX = threshold.x,
            thresholdY = threshold.y;

        return (this.x <= x + thresholdX && this.x >= x - thresholdX &&
                this.y <= y + thresholdY && this.y >= y - thresholdY);
    },

    /**
     * Returns `true` if this point is close to another one.
     * @deprecated 2.0.0 Please use {@link #isCloseTo} instead.
     * @return {Boolean}
     */
    isWithin: function() {
        return this.isCloseTo.apply(this, arguments);
    },

    /**
     * Determins whether this Point contained by the passed Region, Component or element.
     * @param {Ext.util.Region/Ext.Component/Ext.dom.Element/HTMLElement} region
     * The rectangle to check that this Point is within.
     * @return {Boolean}
     */
    isContainedBy: function(region) {
        if (!(region instanceof Ext.util.Region)) {
            region = Ext.get(region.el || region).getRegion();
        }
        return region.contains(this);
    },

    /**
     * Compare this point with another point when the `x` and `y` values of both points are rounded. For example:
     * [100.3,199.8] will equals to [100, 200].
     * @param {Ext.util.Point/Object} point The point to compare with, either an instance
     * of Ext.util.Point or an object with `x` and `y` properties.
     * @return {Boolean}
     */
    roundedEquals: function(point) {
        if (typeof point != 'object') {
            point = this.origin;
        }

        return (Math.round(this.x) === Math.round(point.x) &&
                Math.round(this.y) === Math.round(point.y));
    },

    getDistanceTo: function(point) {
        if (typeof point != 'object') {
            point = this.origin;
        }

        var deltaX = this.x - point.x,
            deltaY = this.y - point.y;

        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    },

    getAngleTo: function(point) {
        if (typeof point != 'object') {
            point = this.origin;
        }

        var deltaX = this.x - point.x,
            deltaY = this.y - point.y;

        return Math.atan2(deltaY, deltaX) * this.radianToDegreeConstant;
    }
}, function() {
    /**
     * @method
     * Alias for {@link #translateBy}
     * @inheritdoc Ext.util.Region#translateBy
     */
    this.prototype.translate = this.prototype.translateBy;
});
