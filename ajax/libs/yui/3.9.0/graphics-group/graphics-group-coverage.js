if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/graphics-group/graphics-group.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/graphics-group/graphics-group.js",
    code: []
};
_yuitest_coverage["build/graphics-group/graphics-group.js"].code=["YUI.add('graphics-group', function (Y, NAME) {","","/**"," * The graphics-group submodule allows from drawing a shape multiple times within a single instance."," *"," * @module graphics"," * @submodule graphics-group"," */","var ShapeGroup,","    CircleGroup,","    RectGroup,","    EllipseGroup,","    DiamondGroup,","    Y_Lang = Y.Lang;","","/**"," * Abstract class for creating groups of shapes with the same styles and dimensions."," *"," * @class ShapeGroup"," * @constructor"," * @submodule graphics-group"," */",""," ShapeGroup = function()"," {","    ShapeGroup.superclass.constructor.apply(this, arguments);"," };",""," ShapeGroup.NAME = \"shapeGroup\";",""," Y.extend(ShapeGroup, Y.Path, {","    /**","     * Updates the shape.","     *","     * @method _draw","     * @private","     */","    _draw: function()","    {","        var xvalues = this.get(\"xvalues\"),","            yvalues = this.get(\"yvalues\"),","            x,","            y,","            xRad,","            yRad,","            i = 0,","            len,","            dimensions = this.get(\"dimensions\"),","            width = dimensions.width,","            height = dimensions.height,","            radius = dimensions.radius,","            yRadius = dimensions.yRadius,","            widthIsArray = Y_Lang.isArray(width),","            heightIsArray = Y_Lang.isArray(height),","            radiusIsArray = Y_Lang.isArray(radius),","            yRadiusIsArray = Y_Lang.isArray(yRadius);","        if(xvalues && yvalues && xvalues.length > 0)","        {","            this.clear();","","            len = xvalues.length;","            for(; i < len; ++i)","            {","                x = xvalues[i];","                y = yvalues[i];","                xRad = radiusIsArray ? radius[i] : radius;","                yRad = yRadiusIsArray ? yRadius[i] : yRadius;","                if(!isNaN(x) && !isNaN(y) && !isNaN(xRad))","                {","                    this.drawShape({","                        x: x,","                        y: y,","                        width: widthIsArray ? width[i] : width,","                        height: heightIsArray ? height[i] : height,","                        radius: xRad,","                        yRadius: yRad","                    });","                    this.closePath();","                }","            }","            this._closePath();","        }","    },","","    /**","     * Parses and array of lengths into radii","     *","     * @method _getRadiusCollection","     * @param {Array} val Array of lengths","     * @return Array","     * @private","     */","    _getRadiusCollection: function(val)","    {","        var i = 0,","            len = val.length,","            radii = [];","        for(; i < len; ++i)","        {","            radii[i] = val[i] * 0.5;","        }","        return radii;","    }"," });","","ShapeGroup.ATTRS = Y.merge(Y.Path.ATTRS, {","    dimensions: {","        getter: function()","        {","            var dimensions = this._dimensions,","                radius,","                yRadius,","                width,","                height;","            if(dimensions.hasOwnProperty(\"radius\"))","            {","                return dimensions;","            }","            else","            {","                width = dimensions.width;","                height = dimensions.height;","                radius = Y_Lang.isArray(width) ? this._getRadiusCollection(width) : (width * 0.5);","                yRadius = Y_Lang.isArray(height) ? this._getRadiusCollection(height) : (height * 0.5);","                return {","                    width: width,","                    height: height,","                    radius: radius,","                    yRadius: yRadius","                };","            }","        },","","        setter: function(val)","        {","            this._dimensions = val;","            return val;","        }","    },","    xvalues: {","        getter: function()","        {","            return this._xvalues;","        },","        setter: function(val)","        {","            this._xvalues = val;","        }","    },","    yvalues: {","        getter: function()","        {","            return this._yvalues;","        },","        setter: function(val)","        {","            this._yvalues = val;","        }","    }","});","Y.ShapeGroup = ShapeGroup;","/**"," * Abstract class for creating groups of circles with the same styles and dimensions."," *"," * @class CircleGroup"," * @constructor"," * @submodule graphics-group"," */"," CircleGroup = function()"," {","    CircleGroup.superclass.constructor.apply(this, arguments);"," };",""," CircleGroup.NAME = \"circleGroup\";",""," Y.extend(CircleGroup, Y.ShapeGroup, {","    /**","     * Algorithm for drawing shape.","     *","     * @method drawShape","     * @param {Object} cfg Parameters used to draw the shape.","     */","    drawShape: function(cfg)","    {","        this.drawCircle(cfg.x, cfg.y, cfg.radius);","    }"," });","","CircleGroup.ATTRS = Y.merge(Y.ShapeGroup.ATTRS, {","    dimensions: {","        getter: function()","        {","            var dimensions = this._dimensions,","                radius,","                yRadius,","                width,","                height;","            if(dimensions.hasOwnProperty(\"radius\"))","            {","                return dimensions;","            }","            else","            {","                width = dimensions.width;","                height = dimensions.height;","                radius = Y_Lang.isArray(width) ? this._getRadiusCollection(width) : (width * 0.5);","                yRadius = radius;","                return {","                    width: width,","                    height: height,","                    radius: radius,","                    yRadius: yRadius","                };","            }","        }","    }","});","","CircleGroup.ATTRS = Y.ShapeGroup.ATTRS;","Y.CircleGroup = CircleGroup;","/**"," * Abstract class for creating groups of rects with the same styles and dimensions."," *"," * @class GroupRect"," * @constructor"," * @submodule graphics-group"," */"," RectGroup = function()"," {","    RectGroup.superclass.constructor.apply(this, arguments);"," };",""," RectGroup.NAME = \"rectGroup\";",""," Y.extend(RectGroup, Y.ShapeGroup, {","    /**","     * Updates the rect.","     *","     * @method _draw","     * @private","     */","    drawShape: function(cfg)","    {","        this.drawRect(cfg.x, cfg.y, cfg.width, cfg.height);","    }"," });","","RectGroup.ATTRS = Y.ShapeGroup.ATTRS;","Y.RectGroup = RectGroup;","/**"," * Abstract class for creating groups of diamonds with the same styles and dimensions."," *"," * @class GroupDiamond"," * @constructor"," * @submodule graphics-group"," */"," DiamondGroup = function()"," {","    DiamondGroup.superclass.constructor.apply(this, arguments);"," };",""," DiamondGroup.NAME = \"diamondGroup\";",""," Y.extend(DiamondGroup, Y.ShapeGroup, {","    /**","     * Updates the diamond.","     *","     * @method _draw","     * @private","     */","    drawShape: function(cfg)","    {","        this.drawDiamond(cfg.x, cfg.y, cfg.width, cfg.height);","    }"," });","","DiamondGroup.ATTRS = Y.ShapeGroup.ATTRS;","Y.DiamondGroup = DiamondGroup;","/**"," * Abstract class for creating groups of ellipses with the same styles and dimensions."," *"," * @class EllipseGroup"," * @constructor"," * @submodule graphics-group"," */"," EllipseGroup = function()"," {","    EllipseGroup.superclass.constructor.apply(this, arguments);"," };",""," EllipseGroup.NAME = \"ellipseGroup\";",""," Y.extend(EllipseGroup, Y.ShapeGroup, {","    /**","     * Updates the ellipse.","     *","     * @method _draw","     * @private","     */","    drawShape: function(cfg)","    {","        this.drawEllipse(cfg.x, cfg.y, cfg.width, cfg.height);","    }"," });","","EllipseGroup.ATTRS = Y.ShapeGroup.ATTRS;","Y.EllipseGroup = EllipseGroup;","","","}, '@VERSION@', {\"requires\": [\"graphics\"]});"];
_yuitest_coverage["build/graphics-group/graphics-group.js"].lines = {"1":0,"9":0,"24":0,"26":0,"29":0,"31":0,"40":0,"57":0,"59":0,"61":0,"62":0,"64":0,"65":0,"66":0,"67":0,"68":0,"70":0,"78":0,"81":0,"95":0,"98":0,"100":0,"102":0,"106":0,"110":0,"115":0,"117":0,"121":0,"122":0,"123":0,"124":0,"125":0,"136":0,"137":0,"143":0,"147":0,"153":0,"157":0,"161":0,"169":0,"171":0,"174":0,"176":0,"185":0,"189":0,"193":0,"198":0,"200":0,"204":0,"205":0,"206":0,"207":0,"208":0,"219":0,"220":0,"228":0,"230":0,"233":0,"235":0,"244":0,"248":0,"249":0,"257":0,"259":0,"262":0,"264":0,"273":0,"277":0,"278":0,"286":0,"288":0,"291":0,"293":0,"302":0,"306":0,"307":0};
_yuitest_coverage["build/graphics-group/graphics-group.js"].functions = {"ShapeGroup:24":0,"_draw:38":0,"_getRadiusCollection:93":0,"getter:108":0,"setter:134":0,"getter:141":0,"setter:145":0,"getter:151":0,"setter:155":0,"CircleGroup:169":0,"drawShape:183":0,"getter:191":0,"RectGroup:228":0,"drawShape:242":0,"DiamondGroup:257":0,"drawShape:271":0,"EllipseGroup:286":0,"drawShape:300":0,"(anonymous 1):1":0};
_yuitest_coverage["build/graphics-group/graphics-group.js"].coveredLines = 76;
_yuitest_coverage["build/graphics-group/graphics-group.js"].coveredFunctions = 19;
_yuitest_coverline("build/graphics-group/graphics-group.js", 1);
YUI.add('graphics-group', function (Y, NAME) {

/**
 * The graphics-group submodule allows from drawing a shape multiple times within a single instance.
 *
 * @module graphics
 * @submodule graphics-group
 */
_yuitest_coverfunc("build/graphics-group/graphics-group.js", "(anonymous 1)", 1);
_yuitest_coverline("build/graphics-group/graphics-group.js", 9);
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

 _yuitest_coverline("build/graphics-group/graphics-group.js", 24);
ShapeGroup = function()
 {
    _yuitest_coverfunc("build/graphics-group/graphics-group.js", "ShapeGroup", 24);
_yuitest_coverline("build/graphics-group/graphics-group.js", 26);
ShapeGroup.superclass.constructor.apply(this, arguments);
 };

 _yuitest_coverline("build/graphics-group/graphics-group.js", 29);
ShapeGroup.NAME = "shapeGroup";

 _yuitest_coverline("build/graphics-group/graphics-group.js", 31);
Y.extend(ShapeGroup, Y.Path, {
    /**
     * Updates the shape.
     *
     * @method _draw
     * @private
     */
    _draw: function()
    {
        _yuitest_coverfunc("build/graphics-group/graphics-group.js", "_draw", 38);
_yuitest_coverline("build/graphics-group/graphics-group.js", 40);
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
        _yuitest_coverline("build/graphics-group/graphics-group.js", 57);
if(xvalues && yvalues && xvalues.length > 0)
        {
            _yuitest_coverline("build/graphics-group/graphics-group.js", 59);
this.clear();

            _yuitest_coverline("build/graphics-group/graphics-group.js", 61);
len = xvalues.length;
            _yuitest_coverline("build/graphics-group/graphics-group.js", 62);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/graphics-group/graphics-group.js", 64);
x = xvalues[i];
                _yuitest_coverline("build/graphics-group/graphics-group.js", 65);
y = yvalues[i];
                _yuitest_coverline("build/graphics-group/graphics-group.js", 66);
xRad = radiusIsArray ? radius[i] : radius;
                _yuitest_coverline("build/graphics-group/graphics-group.js", 67);
yRad = yRadiusIsArray ? yRadius[i] : yRadius;
                _yuitest_coverline("build/graphics-group/graphics-group.js", 68);
if(!isNaN(x) && !isNaN(y) && !isNaN(xRad))
                {
                    _yuitest_coverline("build/graphics-group/graphics-group.js", 70);
this.drawShape({
                        x: x,
                        y: y,
                        width: widthIsArray ? width[i] : width,
                        height: heightIsArray ? height[i] : height,
                        radius: xRad,
                        yRadius: yRad
                    });
                    _yuitest_coverline("build/graphics-group/graphics-group.js", 78);
this.closePath();
                }
            }
            _yuitest_coverline("build/graphics-group/graphics-group.js", 81);
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
        _yuitest_coverfunc("build/graphics-group/graphics-group.js", "_getRadiusCollection", 93);
_yuitest_coverline("build/graphics-group/graphics-group.js", 95);
var i = 0,
            len = val.length,
            radii = [];
        _yuitest_coverline("build/graphics-group/graphics-group.js", 98);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/graphics-group/graphics-group.js", 100);
radii[i] = val[i] * 0.5;
        }
        _yuitest_coverline("build/graphics-group/graphics-group.js", 102);
return radii;
    }
 });

_yuitest_coverline("build/graphics-group/graphics-group.js", 106);
ShapeGroup.ATTRS = Y.merge(Y.Path.ATTRS, {
    dimensions: {
        getter: function()
        {
            _yuitest_coverfunc("build/graphics-group/graphics-group.js", "getter", 108);
_yuitest_coverline("build/graphics-group/graphics-group.js", 110);
var dimensions = this._dimensions,
                radius,
                yRadius,
                width,
                height;
            _yuitest_coverline("build/graphics-group/graphics-group.js", 115);
if(dimensions.hasOwnProperty("radius"))
            {
                _yuitest_coverline("build/graphics-group/graphics-group.js", 117);
return dimensions;
            }
            else
            {
                _yuitest_coverline("build/graphics-group/graphics-group.js", 121);
width = dimensions.width;
                _yuitest_coverline("build/graphics-group/graphics-group.js", 122);
height = dimensions.height;
                _yuitest_coverline("build/graphics-group/graphics-group.js", 123);
radius = Y_Lang.isArray(width) ? this._getRadiusCollection(width) : (width * 0.5);
                _yuitest_coverline("build/graphics-group/graphics-group.js", 124);
yRadius = Y_Lang.isArray(height) ? this._getRadiusCollection(height) : (height * 0.5);
                _yuitest_coverline("build/graphics-group/graphics-group.js", 125);
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
            _yuitest_coverfunc("build/graphics-group/graphics-group.js", "setter", 134);
_yuitest_coverline("build/graphics-group/graphics-group.js", 136);
this._dimensions = val;
            _yuitest_coverline("build/graphics-group/graphics-group.js", 137);
return val;
        }
    },
    xvalues: {
        getter: function()
        {
            _yuitest_coverfunc("build/graphics-group/graphics-group.js", "getter", 141);
_yuitest_coverline("build/graphics-group/graphics-group.js", 143);
return this._xvalues;
        },
        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-group/graphics-group.js", "setter", 145);
_yuitest_coverline("build/graphics-group/graphics-group.js", 147);
this._xvalues = val;
        }
    },
    yvalues: {
        getter: function()
        {
            _yuitest_coverfunc("build/graphics-group/graphics-group.js", "getter", 151);
_yuitest_coverline("build/graphics-group/graphics-group.js", 153);
return this._yvalues;
        },
        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-group/graphics-group.js", "setter", 155);
_yuitest_coverline("build/graphics-group/graphics-group.js", 157);
this._yvalues = val;
        }
    }
});
_yuitest_coverline("build/graphics-group/graphics-group.js", 161);
Y.ShapeGroup = ShapeGroup;
/**
 * Abstract class for creating groups of circles with the same styles and dimensions.
 *
 * @class CircleGroup
 * @constructor
 * @submodule graphics-group
 */
 _yuitest_coverline("build/graphics-group/graphics-group.js", 169);
CircleGroup = function()
 {
    _yuitest_coverfunc("build/graphics-group/graphics-group.js", "CircleGroup", 169);
_yuitest_coverline("build/graphics-group/graphics-group.js", 171);
CircleGroup.superclass.constructor.apply(this, arguments);
 };

 _yuitest_coverline("build/graphics-group/graphics-group.js", 174);
CircleGroup.NAME = "circleGroup";

 _yuitest_coverline("build/graphics-group/graphics-group.js", 176);
Y.extend(CircleGroup, Y.ShapeGroup, {
    /**
     * Algorithm for drawing shape.
     *
     * @method drawShape
     * @param {Object} cfg Parameters used to draw the shape.
     */
    drawShape: function(cfg)
    {
        _yuitest_coverfunc("build/graphics-group/graphics-group.js", "drawShape", 183);
_yuitest_coverline("build/graphics-group/graphics-group.js", 185);
this.drawCircle(cfg.x, cfg.y, cfg.radius);
    }
 });

_yuitest_coverline("build/graphics-group/graphics-group.js", 189);
CircleGroup.ATTRS = Y.merge(Y.ShapeGroup.ATTRS, {
    dimensions: {
        getter: function()
        {
            _yuitest_coverfunc("build/graphics-group/graphics-group.js", "getter", 191);
_yuitest_coverline("build/graphics-group/graphics-group.js", 193);
var dimensions = this._dimensions,
                radius,
                yRadius,
                width,
                height;
            _yuitest_coverline("build/graphics-group/graphics-group.js", 198);
if(dimensions.hasOwnProperty("radius"))
            {
                _yuitest_coverline("build/graphics-group/graphics-group.js", 200);
return dimensions;
            }
            else
            {
                _yuitest_coverline("build/graphics-group/graphics-group.js", 204);
width = dimensions.width;
                _yuitest_coverline("build/graphics-group/graphics-group.js", 205);
height = dimensions.height;
                _yuitest_coverline("build/graphics-group/graphics-group.js", 206);
radius = Y_Lang.isArray(width) ? this._getRadiusCollection(width) : (width * 0.5);
                _yuitest_coverline("build/graphics-group/graphics-group.js", 207);
yRadius = radius;
                _yuitest_coverline("build/graphics-group/graphics-group.js", 208);
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

_yuitest_coverline("build/graphics-group/graphics-group.js", 219);
CircleGroup.ATTRS = Y.ShapeGroup.ATTRS;
_yuitest_coverline("build/graphics-group/graphics-group.js", 220);
Y.CircleGroup = CircleGroup;
/**
 * Abstract class for creating groups of rects with the same styles and dimensions.
 *
 * @class GroupRect
 * @constructor
 * @submodule graphics-group
 */
 _yuitest_coverline("build/graphics-group/graphics-group.js", 228);
RectGroup = function()
 {
    _yuitest_coverfunc("build/graphics-group/graphics-group.js", "RectGroup", 228);
_yuitest_coverline("build/graphics-group/graphics-group.js", 230);
RectGroup.superclass.constructor.apply(this, arguments);
 };

 _yuitest_coverline("build/graphics-group/graphics-group.js", 233);
RectGroup.NAME = "rectGroup";

 _yuitest_coverline("build/graphics-group/graphics-group.js", 235);
Y.extend(RectGroup, Y.ShapeGroup, {
    /**
     * Updates the rect.
     *
     * @method _draw
     * @private
     */
    drawShape: function(cfg)
    {
        _yuitest_coverfunc("build/graphics-group/graphics-group.js", "drawShape", 242);
_yuitest_coverline("build/graphics-group/graphics-group.js", 244);
this.drawRect(cfg.x, cfg.y, cfg.width, cfg.height);
    }
 });

_yuitest_coverline("build/graphics-group/graphics-group.js", 248);
RectGroup.ATTRS = Y.ShapeGroup.ATTRS;
_yuitest_coverline("build/graphics-group/graphics-group.js", 249);
Y.RectGroup = RectGroup;
/**
 * Abstract class for creating groups of diamonds with the same styles and dimensions.
 *
 * @class GroupDiamond
 * @constructor
 * @submodule graphics-group
 */
 _yuitest_coverline("build/graphics-group/graphics-group.js", 257);
DiamondGroup = function()
 {
    _yuitest_coverfunc("build/graphics-group/graphics-group.js", "DiamondGroup", 257);
_yuitest_coverline("build/graphics-group/graphics-group.js", 259);
DiamondGroup.superclass.constructor.apply(this, arguments);
 };

 _yuitest_coverline("build/graphics-group/graphics-group.js", 262);
DiamondGroup.NAME = "diamondGroup";

 _yuitest_coverline("build/graphics-group/graphics-group.js", 264);
Y.extend(DiamondGroup, Y.ShapeGroup, {
    /**
     * Updates the diamond.
     *
     * @method _draw
     * @private
     */
    drawShape: function(cfg)
    {
        _yuitest_coverfunc("build/graphics-group/graphics-group.js", "drawShape", 271);
_yuitest_coverline("build/graphics-group/graphics-group.js", 273);
this.drawDiamond(cfg.x, cfg.y, cfg.width, cfg.height);
    }
 });

_yuitest_coverline("build/graphics-group/graphics-group.js", 277);
DiamondGroup.ATTRS = Y.ShapeGroup.ATTRS;
_yuitest_coverline("build/graphics-group/graphics-group.js", 278);
Y.DiamondGroup = DiamondGroup;
/**
 * Abstract class for creating groups of ellipses with the same styles and dimensions.
 *
 * @class EllipseGroup
 * @constructor
 * @submodule graphics-group
 */
 _yuitest_coverline("build/graphics-group/graphics-group.js", 286);
EllipseGroup = function()
 {
    _yuitest_coverfunc("build/graphics-group/graphics-group.js", "EllipseGroup", 286);
_yuitest_coverline("build/graphics-group/graphics-group.js", 288);
EllipseGroup.superclass.constructor.apply(this, arguments);
 };

 _yuitest_coverline("build/graphics-group/graphics-group.js", 291);
EllipseGroup.NAME = "ellipseGroup";

 _yuitest_coverline("build/graphics-group/graphics-group.js", 293);
Y.extend(EllipseGroup, Y.ShapeGroup, {
    /**
     * Updates the ellipse.
     *
     * @method _draw
     * @private
     */
    drawShape: function(cfg)
    {
        _yuitest_coverfunc("build/graphics-group/graphics-group.js", "drawShape", 300);
_yuitest_coverline("build/graphics-group/graphics-group.js", 302);
this.drawEllipse(cfg.x, cfg.y, cfg.width, cfg.height);
    }
 });

_yuitest_coverline("build/graphics-group/graphics-group.js", 306);
EllipseGroup.ATTRS = Y.ShapeGroup.ATTRS;
_yuitest_coverline("build/graphics-group/graphics-group.js", 307);
Y.EllipseGroup = EllipseGroup;


}, '@VERSION@', {"requires": ["graphics"]});
