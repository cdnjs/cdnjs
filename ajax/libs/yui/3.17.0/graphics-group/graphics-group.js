/*
YUI 3.17.0 (build ce55cc9)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('graphics-group', function (Y, NAME) {

/**
 * The graphics-group submodule allows from drawing a shape multiple times within a single instance.
 *
 * @module graphics
 * @submodule graphics-group
 */
var ShapeGroup,
    CircleGroup,
    RectGroup,
    EllipseGroup,
    DiamondGroup,
    Y_Lang = Y.Lang;

/**
 * Abstract class for creating groups of shapes with the same styles and dimensions.
 *
 * @class ShapeGroup
 * @constructor
 * @submodule graphics-group
 */

 ShapeGroup = function()
 {
    ShapeGroup.superclass.constructor.apply(this, arguments);
 };

 ShapeGroup.NAME = "shapeGroup";

 Y.extend(ShapeGroup, Y.Path, {
    /**
     * Updates the shape.
     *
     * @method _draw
     * @private
     */
    _draw: function()
    {
        var xvalues = this.get("xvalues"),
            yvalues = this.get("yvalues"),
            x,
            y,
            xRad,
            yRad,
            i = 0,
            len,
            dimensions = this.get("dimensions"),
            width = dimensions.width,
            height = dimensions.height,
            radius = dimensions.radius,
            yRadius = dimensions.yRadius,
            widthIsArray = Y_Lang.isArray(width),
            heightIsArray = Y_Lang.isArray(height),
            radiusIsArray = Y_Lang.isArray(radius),
            yRadiusIsArray = Y_Lang.isArray(yRadius);
        if(xvalues && yvalues && xvalues.length > 0)
        {
            this.clear();

            len = xvalues.length;
            for(; i < len; ++i)
            {
                x = xvalues[i];
                y = yvalues[i];
                xRad = radiusIsArray ? radius[i] : radius;
                yRad = yRadiusIsArray ? yRadius[i] : yRadius;
                if(!isNaN(x) && !isNaN(y) && !isNaN(xRad))
                {
                    this.drawShape({
                        x: x,
                        y: y,
                        width: widthIsArray ? width[i] : width,
                        height: heightIsArray ? height[i] : height,
                        radius: xRad,
                        yRadius: yRad
                    });
                    this.closePath();
                }
            }
            this._closePath();
        }
    },

    /**
     * Parses and array of lengths into radii
     *
     * @method _getRadiusCollection
     * @param {Array} val Array of lengths
     * @return Array
     * @private
     */
    _getRadiusCollection: function(val)
    {
        var i = 0,
            len = val.length,
            radii = [];
        for(; i < len; ++i)
        {
            radii[i] = val[i] * 0.5;
        }
        return radii;
    }
 });

ShapeGroup.ATTRS = Y.merge(Y.Path.ATTRS, {
    dimensions: {
        getter: function()
        {
            var dimensions = this._dimensions,
                radius,
                yRadius,
                width,
                height;
            if(dimensions.hasOwnProperty("radius"))
            {
                return dimensions;
            }
            else
            {
                width = dimensions.width;
                height = dimensions.height;
                radius = Y_Lang.isArray(width) ? this._getRadiusCollection(width) : (width * 0.5);
                yRadius = Y_Lang.isArray(height) ? this._getRadiusCollection(height) : (height * 0.5);
                return {
                    width: width,
                    height: height,
                    radius: radius,
                    yRadius: yRadius
                };
            }
        },

        setter: function(val)
        {
            this._dimensions = val;
            return val;
        }
    },
    xvalues: {
        getter: function()
        {
            return this._xvalues;
        },
        setter: function(val)
        {
            this._xvalues = val;
        }
    },
    yvalues: {
        getter: function()
        {
            return this._yvalues;
        },
        setter: function(val)
        {
            this._yvalues = val;
        }
    }
});
Y.ShapeGroup = ShapeGroup;
/**
 * Abstract class for creating groups of circles with the same styles and dimensions.
 *
 * @class CircleGroup
 * @constructor
 * @submodule graphics-group
 */
 CircleGroup = function()
 {
    CircleGroup.superclass.constructor.apply(this, arguments);
 };

 CircleGroup.NAME = "circleGroup";

 Y.extend(CircleGroup, Y.ShapeGroup, {
    /**
     * Algorithm for drawing shape.
     *
     * @method drawShape
     * @param {Object} cfg Parameters used to draw the shape.
     */
    drawShape: function(cfg)
    {
        this.drawCircle(cfg.x, cfg.y, cfg.radius);
    }
 });

CircleGroup.ATTRS = Y.merge(Y.ShapeGroup.ATTRS, {
    dimensions: {
        getter: function()
        {
            var dimensions = this._dimensions,
                radius,
                yRadius,
                width,
                height;
            if(dimensions.hasOwnProperty("radius"))
            {
                return dimensions;
            }
            else
            {
                width = dimensions.width;
                height = dimensions.height;
                radius = Y_Lang.isArray(width) ? this._getRadiusCollection(width) : (width * 0.5);
                yRadius = radius;
                return {
                    width: width,
                    height: height,
                    radius: radius,
                    yRadius: yRadius
                };
            }
        }
    }
});

CircleGroup.ATTRS = Y.ShapeGroup.ATTRS;
Y.CircleGroup = CircleGroup;
/**
 * Abstract class for creating groups of rects with the same styles and dimensions.
 *
 * @class GroupRect
 * @constructor
 * @submodule graphics-group
 */
 RectGroup = function()
 {
    RectGroup.superclass.constructor.apply(this, arguments);
 };

 RectGroup.NAME = "rectGroup";

 Y.extend(RectGroup, Y.ShapeGroup, {
    /**
     * Updates the rect.
     *
     * @method _draw
     * @private
     */
    drawShape: function(cfg)
    {
        this.drawRect(cfg.x, cfg.y, cfg.width, cfg.height);
    }
 });

RectGroup.ATTRS = Y.ShapeGroup.ATTRS;
Y.RectGroup = RectGroup;
/**
 * Abstract class for creating groups of diamonds with the same styles and dimensions.
 *
 * @class GroupDiamond
 * @constructor
 * @submodule graphics-group
 */
 DiamondGroup = function()
 {
    DiamondGroup.superclass.constructor.apply(this, arguments);
 };

 DiamondGroup.NAME = "diamondGroup";

 Y.extend(DiamondGroup, Y.ShapeGroup, {
    /**
     * Updates the diamond.
     *
     * @method _draw
     * @private
     */
    drawShape: function(cfg)
    {
        this.drawDiamond(cfg.x, cfg.y, cfg.width, cfg.height);
    }
 });

DiamondGroup.ATTRS = Y.ShapeGroup.ATTRS;
Y.DiamondGroup = DiamondGroup;
/**
 * Abstract class for creating groups of ellipses with the same styles and dimensions.
 *
 * @class EllipseGroup
 * @constructor
 * @submodule graphics-group
 */
 EllipseGroup = function()
 {
    EllipseGroup.superclass.constructor.apply(this, arguments);
 };

 EllipseGroup.NAME = "ellipseGroup";

 Y.extend(EllipseGroup, Y.ShapeGroup, {
    /**
     * Updates the ellipse.
     *
     * @method _draw
     * @private
     */
    drawShape: function(cfg)
    {
        this.drawEllipse(cfg.x, cfg.y, cfg.width, cfg.height);
    }
 });

EllipseGroup.ATTRS = Y.ShapeGroup.ATTRS;
Y.EllipseGroup = EllipseGroup;


}, '3.17.0', {"requires": ["graphics"]});
