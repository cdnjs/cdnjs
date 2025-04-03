/**
 * Morpher module contains functionality that allows morphing one polygon to
 * another.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../Base";
import { Animation, AnimationDisposer } from "../utils/Animation";
import * as $math from "../utils/Math";
import * as $ease from "../utils/Ease";
import * as $type from "../utils/Type";
/**
 * Morpher can be used to morph one polygon to some other polygon.
 */
var Morpher = /** @class */ (function (_super) {
    __extends(Morpher, _super);
    /**
     * Constructor.
     *
     * @param morphable An object to morph
     */
    function Morpher(morphable) {
        var _this = _super.call(this) || this;
        /**
         * A storage for measurements.
         */
        _this._bboxes = [];
        /**
         * Duration of the morphing animation in milliseconds.
         */
        _this.morphDuration = 800;
        /**
         * An easing function to use for morphing animation.
         *
         * @see {@link Ease}
         */
        _this.morphEasing = $ease.cubicOut;
        /**
         * If set to `true`, all separate parts of the multi-part polygon will
         * morph into a single circle or polygon when using built-in methods
         * `morphToCircle()` or `morphToPolygon()`.
         *
         * Otherwise each separate part of polygon will morph to individual target
         * circle or polgyon.
         */
        _this.morphToSingle = true;
        /**
         * A ratio to scale morphed object in relation to the source object.
         */
        _this.scaleRatio = 1;
        _this.className = "Morpher";
        _this.morphable = morphable;
        _this.applyTheme();
        return _this;
    }
    /**
     * Morphs a polygon to another polygon.
     *
     * @param toPoints  Corner points of the target shape
     * @param duration  Duration in milliseconds
     * @param easing    Easing function
     * @return Animation
     */
    Morpher.prototype.morphToPolygon = function (toPoints, duration, easing) {
        var points = this.morphable.currentPoints;
        if (points && toPoints) {
            this.sortPoints(points);
            this.sortPoints(toPoints);
            this._morphFromPointsReal = [];
            this._morphToPointsReal = [];
            if (!$type.hasValue(duration)) {
                duration = this.morphDuration;
            }
            if (!$type.hasValue(easing)) {
                easing = this.morphEasing;
            }
            this._morphFromPointsReal = this.normalizePoints(toPoints, points);
            this._morphToPointsReal = this.normalizePoints(points, toPoints);
            this.morphable.currentPoints = this._morphFromPointsReal;
            var animation = new Animation(this, { property: "morphProgress", from: 0, to: 1 }, duration, easing);
            this._disposers.push(animation);
            animation.start();
            return animation;
        }
    };
    /**
     * [normalizePoints description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param pointsA  Point A
     * @param pointsB  Point B
     * @return Normalized points
     */
    Morpher.prototype.normalizePoints = function (pointsA, pointsB) {
        for (var i = 0, len = pointsA.length; i < len; i++) {
            var surfaceA = pointsA[i][0];
            var holeA = pointsA[i][1];
            var bboxA = $type.getValue($math.getBBox(surfaceA));
            var middleX = bboxA.x + bboxA.width;
            var middleY = bboxA.y + bboxA.height;
            // check if we have the same in PointsB
            if (!pointsB[i]) {
                pointsB[i] = [];
            }
            // check if we have surface in pointsB
            if (surfaceA && !pointsB[i][0]) {
                pointsB[i][0] = [{ x: middleX, y: middleY }, { x: middleX, y: middleY }];
            }
            if (pointsB[i][0]) {
                pointsB[i][0] = this.addPoints(pointsB[i][0], surfaceA.length);
                var distance = Infinity;
                var splitAt = 0;
                for (var a = 0; a < pointsB[i][0].length; a++) {
                    var newDistance = $math.getDistance(pointsB[i][0][a], surfaceA[0]);
                    if (newDistance < distance) {
                        splitAt = a;
                        distance = newDistance;
                    }
                }
                var partA = pointsB[i][0].slice(0, splitAt);
                var partB = pointsB[i][0].slice(splitAt);
                pointsB[i][0] = partB.concat(partA);
            }
            if (holeA) {
                if (!pointsB[i][1]) {
                    pointsB[i][1] = [{ x: middleX, y: middleY }, { x: middleX, y: middleY }];
                }
                pointsB[i][1] = this.addPoints(pointsB[i][1], holeA.length);
            }
        }
        return pointsB;
    };
    /**
     * [sortPoints description]
     *
     * @ignore Exclude from doc
     * @todo Description
     * @param points  [description]
     * @return                        common bbox of points
     */
    Morpher.prototype.sortPoints = function (points) {
        points.sort(function (a, b) {
            var bbox1 = $type.getValue($math.getBBox(a[0]));
            var bbox2 = $type.getValue($math.getBBox(b[0]));
            if (bbox1.width * bbox1.height > bbox2.width * bbox2.height) {
                return -1;
            }
            else {
                return 1;
            }
        });
        var bboxes = [];
        for (var i = 0, len = points.length; i < len; i++) {
            var surface = points[i][0];
            if (surface) {
                bboxes.push($type.getValue($math.getBBox(surface)));
            }
        }
        return $math.getCommonRectangle(bboxes);
    };
    /**
     * Morphs polygon to a circle (it is actually a polygon which makes a circle).
     *
     * @param radius    Target circle radius (px)
     * @param duration  Duration (ms)
     * @param easing    Easing function
     * @return Animation
     */
    Morpher.prototype.morphToCircle = function (radius, duration, easing) {
        var points = this.morphable.points;
        var commonBBox = this.sortPoints(points);
        this._morphFromPointsReal = [];
        this._morphToPointsReal = [];
        if (!$type.hasValue(duration)) {
            duration = this.morphDuration;
        }
        if (!$type.hasValue(easing)) {
            easing = this.morphEasing;
        }
        // surface
        for (var i = 0, len = points.length; i < len; i++) {
            var surface = points[i][0];
            var hole = points[i][1];
            this._morphFromPointsReal[i] = [];
            this._morphToPointsReal[i] = [];
            if (surface) {
                var toPoints = surface;
                var fromPoints = surface;
                var bbox = $type.getValue($math.getBBox(fromPoints)); // this._bboxes[i];
                if (this.morphToSingle) {
                    bbox = $type.getValue(commonBBox);
                }
                var middleX = bbox.x + bbox.width / 2;
                var middleY = bbox.y + bbox.height / 2;
                var realRadius = radius;
                if (!$type.isNumber(realRadius)) {
                    realRadius = Math.min(bbox.width / 2, bbox.height / 2);
                }
                toPoints = [];
                // find angle for the first point
                var startAngle = $math.getAngle({ x: middleX, y: middleY }, surface[0]);
                var count = 100;
                if (surface.length > count) {
                    count = surface.length;
                }
                fromPoints = this.addPoints(surface, count);
                count = fromPoints.length; // add Points might increase number a bit
                var angle = 360 / (count - 1);
                for (var a = 0; a < count; a++) {
                    var realAngle = angle * a + startAngle;
                    var pointOnCircle = { x: middleX + realRadius * $math.cos(realAngle), y: middleY + realRadius * $math.sin(realAngle) };
                    toPoints[a] = pointOnCircle;
                }
                if (hole && hole.length > 0) {
                    for (var i_1 = 0, hlen = hole.length; i_1 < hlen; i_1++) {
                        toPoints.push({ x: middleX, y: middleY });
                    }
                }
                this._morphFromPointsReal[i][0] = fromPoints;
                this._morphToPointsReal[i][0] = toPoints;
            }
        }
        this.morphable.currentPoints = this._morphFromPointsReal;
        var animation = new Animation(this, { property: "morphProgress", from: 0, to: 1 }, duration, easing);
        this._disposers.push(animation);
        animation.start();
        return animation;
    };
    /**
     * [addPoints description]
     *
     * @ignore Exclude from doc
     * @todo Description
     * @param points         [description]
     * @param mustHaveCount  [description]
     * @return [description]
     */
    Morpher.prototype.addPoints = function (points, mustHaveCount) {
        var addToSegmentCount = Math.round(mustHaveCount / points.length);
        var newPoints = [];
        for (var i = 0, len = points.length; i < len; i++) {
            var point0 = points[i];
            var point1 = void 0;
            if (i == points.length - 1) {
                point1 = points[0];
            }
            else {
                point1 = points[i + 1];
            }
            newPoints.push(point0);
            for (var p = 1; p < addToSegmentCount; p++) {
                var percent = p / addToSegmentCount;
                var extraPoint = { x: point0.x + (point1.x - point0.x) * percent, y: point0.y + (point1.y - point0.y) * percent };
                newPoints.push(extraPoint);
            }
            // stop adding in case we already added more than left in original
            if (newPoints.length + points.length - i == mustHaveCount) {
                addToSegmentCount = 0;
            }
        }
        if (newPoints.length < mustHaveCount && points.length > 0) {
            var lastPoint = points[points.length - 1];
            for (var p = newPoints.length; p < mustHaveCount; p++) {
                // add same as last
                newPoints.push({ x: lastPoint.x, y: lastPoint.y });
            }
        }
        return newPoints;
    };
    /**
     * Morphs polygon into a rectangular polygon.
     *
     * @param width     Width of the target rectangle (px)
     * @param height    Height of the target rectangle (px)
     * @param duration  Duration (ms)
     * @param easing    Easing function
     * @return Animation
     */
    Morpher.prototype.morphToRectangle = function (width, height, duration, easing) {
        var points = this.morphable.points;
        this.sortPoints(points);
        this._morphFromPointsReal = [];
        this._morphToPointsReal = [];
        if (!$type.hasValue(duration)) {
            duration = this.morphDuration;
        }
        if (!$type.hasValue(easing)) {
            easing = this.morphEasing;
        }
        //		let biggestBBox: IRectangle = this._bboxes[this._biggestIndex];
        // surface
        for (var i = 0, len = points.length; i < len; i++) {
            var surface = points[i][0];
            var hole = points[i][1];
            this._morphFromPointsReal[i] = [];
            this._morphToPointsReal[i] = [];
            if (surface) {
                var toPoints = surface;
                var fromPoints = surface;
                var bbox = this._bboxes[i];
                // we only work with first area. TODO: maybe we should find the biggest one?
                if (this.morphToSingle) {
                    //if (i != this._biggestIndex) {
                    //	bbox = { x: biggestBBox.x + biggestBBox.width / 2, y: biggestBBox.y + biggestBBox.height / 2, width: 0, height: 0 };
                    //}
                }
                var x = bbox.x;
                var y = bbox.y;
                var realWidth = width;
                var realHeight = height;
                if (!$type.isNumber(realWidth)) {
                    realWidth = bbox.width;
                }
                if (!$type.isNumber(realHeight)) {
                    realHeight = bbox.height;
                }
                toPoints = [{ x: x, y: y }, { x: x + realWidth, y: y }, { x: x + realWidth, y: y + realHeight }, { x: x, y: y + realHeight }];
                toPoints = this.addPoints(toPoints, surface.length);
                // if polygon has less points then count, add
                if (surface.length < 4) {
                    for (var i_2 = surface.length; i_2 < 4; i_2++) {
                        toPoints.push({ x: surface[i_2].x, y: surface[i_2].y });
                    }
                }
                if (hole && hole.length > 0) {
                    var middleX = bbox.x + bbox.width / 2;
                    var middleY = bbox.y + bbox.height / 2;
                    for (var i_3 = 0, hlen = hole.length; i_3 < hlen; i_3++) {
                        toPoints.push({ x: middleX, y: middleY });
                    }
                }
                this._morphFromPointsReal[i][0] = fromPoints;
                this._morphToPointsReal[i][0] = toPoints;
            }
        }
        this.morphable.currentPoints = this._morphFromPointsReal;
        var animation = new Animation(this, { property: "morphProgress", from: 0, to: 1 }, duration, easing);
        this._disposers.push(animation);
        animation.start();
        return animation;
    };
    Object.defineProperty(Morpher.prototype, "morphProgress", {
        /**
         * Returns the progress of morph transition.
         *
         * @return Progress (0-1)
         */
        get: function () {
            return this._morphProgress;
        },
        /**
         * Progress of the morph transition.
         *
         * Setting this will also trigger actual transformation.
         *
         * @param value  Progress (0-1)
         */
        set: function (value) {
            this._morphProgress = value;
            var currentPoints = [];
            if (value != null) {
                var fromPoints = this._morphFromPointsReal;
                var toPoints = this._morphToPointsReal;
                if (fromPoints != null && toPoints != null) {
                    for (var i = 0, len = fromPoints.length; i < len; i++) {
                        var currentArea = [];
                        currentPoints.push(currentArea);
                        var surfaceFrom = fromPoints[i][0];
                        var holeFrom = fromPoints[i][1];
                        var surfaceTo = toPoints[i][0];
                        var holeTo = toPoints[i][1];
                        if (surfaceFrom && surfaceFrom.length > 0 && surfaceTo && surfaceTo.length > 0) {
                            var currentSurface = [];
                            for (var i_4 = 0, slen = surfaceFrom.length; i_4 < slen; i_4++) {
                                var point0 = surfaceFrom[i_4];
                                var point1 = surfaceTo[i_4];
                                var currentPoint = { x: point0.x + (point1.x * this.scaleRatio - point0.x) * value, y: point0.y + (point1.y * this.scaleRatio - point0.y) * value };
                                currentSurface.push(currentPoint);
                            }
                            currentArea[0] = currentSurface;
                        }
                        if (holeFrom && holeFrom.length > 0 && holeTo && holeTo.length > 0) {
                            var currentHole = [];
                            for (var i_5 = 0, hlen = holeFrom.length; i_5 < hlen; i_5++) {
                                var point0 = holeFrom[i_5];
                                var point1 = holeTo[i_5];
                                var currentPoint = { x: point0.x + (point1.x * this.scaleRatio - point0.x) * value, y: point0.y + (point1.y * this.scaleRatio - point0.y) * value };
                                currentHole.push(currentPoint);
                            }
                            currentArea[1] = currentHole;
                        }
                    }
                }
            }
            this.morphable.currentPoints = currentPoints;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Restores the polygon to its original appearance.
     *
     * @param duration  Duration (ms)
     * @param easing    Easing function
     * @return Animation
     */
    Morpher.prototype.morphBack = function (duration, easing) {
        this._morphToPointsReal = this._morphFromPointsReal;
        this._morphFromPointsReal = this.morphable.currentPoints;
        if (!$type.hasValue(duration)) {
            duration = this.morphDuration;
        }
        if (!$type.hasValue(easing)) {
            easing = this.morphEasing;
        }
        var animation = new Animation(this, { property: "morphProgress", from: 0, to: 1 }, duration, easing);
        this._disposers.push(animation);
        animation.start();
        return animation;
    };
    Object.defineProperty(Morpher.prototype, "animations", {
        /**
         * Returns a list of morph animations currently being played.
         *
         * @return List of animations
         */
        get: function () {
            if (!this._animations) {
                this._animations = [];
                this._disposers.push(new AnimationDisposer(this._animations));
            }
            return this._animations;
        },
        enumerable: true,
        configurable: true
    });
    return Morpher;
}(BaseObject));
export { Morpher };
//# sourceMappingURL=Morpher.js.map