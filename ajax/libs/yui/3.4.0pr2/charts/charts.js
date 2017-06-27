YUI.add('charts', function(Y) {

/**
 * The Renderer class is a base class for chart components that use the <code>styles</code>
 * attribute.
 *
 * @class Renderer
 * @constructor
 */
function Renderer(){}

Renderer.ATTRS = {
        /**
         * Hash of style properties for class
         * 
         * @attribute styles
         * @type Object
         */
        styles:
        {
            getter: function()
            {
                this._styles = this._styles || this._getDefaultStyles();
                return this._styles;
            },

            setter: function(val)
            {
                this._styles = this._setStyles(val);
            }
        },
        
        /**
         * The graphic in which drawings will be rendered.
         *
         * @attribute graphic
         * @type Graphic
         */
        graphic: {}
};
Renderer.NAME = "renderer";

Renderer.prototype = {
    /**
     * @private
     */
	_styles: null,
	
    /**
     * @protected
     *
     * Method used by <code>styles</code> setter.
     *
     * @method _setStyles
     * @param {Object} newStyles Hash of properties to update.
     * @return Object
     */
	_setStyles: function(newstyles)
	{
		var styles = this.get("styles");
        return this._mergeStyles(newstyles, styles);
	},
    
    /**
     * @protected
     *
     * Merges to object literals so that only specified properties are 
     * overwritten.
     *
     * @method _mergeStyles
     * @param {Object} a Hash of new styles
     * @param {Object} b Hash of original styles
     * @return Object
     */
    _mergeStyles: function(a, b)
    {
        if(!b)
        {
            b = {};
        }
        var newstyles = Y.merge(b, {});
        Y.Object.each(a, function(value, key, a)
        {
            if(b.hasOwnProperty(key) && Y.Lang.isObject(value) && !Y.Lang.isArray(value))
            {
                newstyles[key] = this._mergeStyles(value, b[key]);
            }
            else
            {
                newstyles[key] = value;
            }
        }, this);
        return newstyles;
    },

    /**
     * @protected
     *
     * Gets the default value for the <code>styles</code> attribute. 
     *
     * @method _getDefaultStyles
     * @return Object
     */
    _getDefaultStyles: function()
    {
        return {padding:{
            top:0,
            right: 0,
            bottom: 0,
            left: 0
        }};
    }
};

Y.augment(Renderer, Y.Attribute);
Y.Renderer = Renderer;

/**
 * The Axis class. Generates axes for a chart.
 *
 * @class Axis
 * @extends Renderer
 * @constructor
 */
Y.Axis = Y.Base.create("axis", Y.Widget, [Y.Renderer], {
    /**
     * @private
     */
    _dataChangeHandler: function(e)
    {
        if(this.get("rendered"))
        {
            this._drawAxis();
        }
    },

    /**
     * @private
     */
    _updateHandler: function(e)
    {
        if(this.get("rendered"))
        {
            this._drawAxis();
        }
    },

    /**
     * @private
     */
    _positionChangeHandler: function(e)
    {
        var position = this.get("position");
        if(position == "none")
        {
            return;
        }
        this._layout =this.getLayout(this.get("position"));
        if(this.get("rendered"))
        {
            this._drawAxis();
        }
    },

    /**
     * @private
     */
    renderUI: function()
    {
        var pos = this.get("position");
        if(pos && pos != "none")
        {
            this._layout =this.getLayout(pos);
            this._setCanvas();
        }
    },
   
    /**
     * @private
     */
    syncUI: function()
    {
        this._drawAxis();
    },

    /**
     * @private
     */
    _setCanvas: function()
    {
        var cb = this.get("contentBox"),
            bb = this.get("boundingBox"),
            p = this.get("position"),
            pn = this._parentNode,
            w = this.get("width"),
            h = this.get("height");
        bb.setStyle("position", "absolute");
        w = w ? w + "px" : pn.getStyle("width");
        h = h ? h + "px" : pn.getStyle("height");
        if(p === "top" || p === "bottom")
        {
            cb.setStyle("width", w);
        }
        else
        {
            cb.setStyle("height", h);
        }
        cb.setStyle("position", "relative");
        cb.setStyle("left", "0px");
        cb.setStyle("top", "0px");
        this.set("graphic", new Y.Graphic());
        this.get("graphic").render(cb);
    },
	
    /**
     * @protected
     *
     * Gets the default value for the <code>styles</code> attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     */
    _getDefaultStyles: function()
    {
        var axisstyles = {
            majorTicks: {
                display:"inside",
                length:4,
                color:"#dad8c9",
                weight:1,
                alpha:1
            },
            minorTicks: {
                display:"none",
                length:2,
                color:"#dad8c9",
                weight:1
            },
            line: {
                weight:1,
                color:"#dad8c9",
                alpha:1
            },
            majorUnit: {
                determinant:"count",
                count:11,
                distance:75
            },
            top: "0px",
            left: "0px",
            width: "100px",
            height: "100px",
            label: {
                color:"#808080",
                alpha: 1,
                fontSize:"85%",
                rotation: 0,
                margin: {
                    top:4,
                    right:4,
                    bottom:4,
                    left:4
                }
            },
            hideOverlappingLabelTicks: false
        };
        
        return Y.merge(Y.Renderer.prototype._getDefaultStyles(), axisstyles); 
    },

    /**
     * @private
     */
    _handleSizeChange: function(e)
    {
        var attrName = e.attrName,
            pos = this.get("position"),
            vert = pos == "left" || pos == "right",
            cb = this.get("contentBox"),
            hor = pos == "bottom" || pos == "top";
        cb.setStyle("width", this.get("width"));
        cb.setStyle("height", this.get("height"));
        if((hor && attrName == "width") || (vert && attrName == "height"))
        {
            this._drawAxis();
        }
    },

    /**
     * @private
     */
    _layout: null,

    /**
     * @private 
     */
    getLayout: function(pos)
    {
        var l;
        switch(pos)
        {
            case "top" :
                l = new Y.TopAxisLayout({axisRenderer:this});
            break;
            case "bottom" : 
                l = new Y.BottomAxisLayout({axisRenderer:this});
            break;
            case "left" :
                l = new Y.LeftAxisLayout({axisRenderer:this});
            break;
            case "right" :
                l = new Y.RightAxisLayout({axisRenderer:this});
            break;
        }
        return l;
    },
    
    /**
     * @private
     */
    drawLine: function(startPoint, endPoint, line)
    {
        var path = this.get("path");
        path.set("stroke", {
            weight: line.weight, 
            color: line.color, 
            opacity: line.alpha
        });
        path.moveTo(startPoint.x, startPoint.y);
        path.lineTo(endPoint.x, endPoint.y);
    },

    /**
     * @private
     */
    _drawAxis: function ()
    {
        if(this._drawing)
        {
            this._callLater = true;
            return;
        }
        this._drawing = true;
        this._callLater = false;
        if(this.get("position") != "none")
        {
            var styles = this.get("styles"),
                majorTickStyles = styles.majorTicks,
                drawTicks = majorTickStyles.display != "none",
                tickPoint,
                majorUnit = styles.majorUnit,
                len,
                majorUnitDistance,
                i = 0,
                layoutLength,
                position,
                lineStart,
                label,
                layout = this._layout,
                labelFunction = this.get("labelFunction"),
                labelFunctionScope = this.get("labelFunctionScope"),
                labelFormat = this.get("labelFormat"),
                graphic = this.get("graphic"),
                path = this.get("path");
            graphic.set("autoDraw", false);
            path.clear();
            layout.setTickOffsets();
            layoutLength = this.getLength();
            lineStart = layout.getLineStart();
            len = this.getTotalMajorUnits(majorUnit);
            majorUnitDistance = this.getMajorUnitDistance(len, layoutLength, majorUnit);
            this.set("edgeOffset", this.getEdgeOffset(len, layoutLength) * 0.5);
            tickPoint = this.getFirstPoint(lineStart);
            this.drawLine(lineStart, this.getLineEnd(tickPoint), styles.line);
            if(drawTicks) 
            {
               layout.drawTick(tickPoint, majorTickStyles);
            }
            if(len < 1)
            {
                this._clearLabelCache();
                return;
            }
            this._createLabelCache();
            this._tickPoints = [];
            layout.set("maxLabelSize", 0); 
            for(; i < len; ++i)
            {
                if(drawTicks) 
                {
                    layout.drawTick(tickPoint, majorTickStyles);
                }
                position = this.getPosition(tickPoint);
                label = this.getLabel(tickPoint);
                label.innerHTML = labelFunction.apply(labelFunctionScope, [this.getLabelByIndex(i, len), labelFormat]);
                tickPoint = this.getNextPoint(tickPoint, majorUnitDistance);
            }
            this._clearLabelCache();
            layout.setSizeAndPosition();
            if(this.get("overlapGraph"))
            {
               layout.offsetNodeForTick(this.get("contentBox"));
            }
            layout.setCalculatedSize();
            for(i = 0; i < len; ++i)
            {
                layout.positionLabel(this.get("labels")[i], this._tickPoints[i]);
            }
        }
        this._drawing = false;
        if(this._callLater)
        {
            this._drawAxis();
        }
        else
        {
            this._updatePathElement();
            this.fire("axisRendered");
        }
    },

    /**
     *  Updates path.
     *
     *  @method _updatePathElement
     *  @private
     */
    _updatePathElement: function()
    {
        var path = this.get("path"),
            graphic = this.get("graphic");
        if(path)
        {
            path.end();
            graphic._redraw();
        }
    },

    /**
     * @private
     */
    _labels: null,

    /**
     * @private 
     */
    _labelCache: null,

    /**
     * @private
     */
    getLabel: function(pt, pos)
    {
        var i,
            label,
            customStyles = {
                rotation: "rotation",
                margin: "margin",
                alpha: "alpha"
            },
            cache = this._labelCache,
            styles = this.get("styles").label;
        if(cache.length > 0)
        {
            label = cache.shift();
        }
        else
        {
            label = document.createElement("span");
            label.style.display = "block";
            label.style.whiteSpace = "nowrap";
            Y.one(label).addClass("axisLabel");
            this.get("contentBox").appendChild(label);
        }
        label.style.position = "absolute";
        this._labels.push(label);
        this._tickPoints.push({x:pt.x, y:pt.y});
        this._layout.updateMaxLabelSize(label);
        for(i in styles)
        {
            if(styles.hasOwnProperty(i) && !customStyles.hasOwnProperty(i))
            {
                label.style[i] = styles[i];
            }
        }
        return label;
    },   

    /**
     * @private
     */
    _createLabelCache: function()
    {
        if(this._labels)
        {
            if(this._labelCache)
            {
                this._labelCache = this._labels.concat(this._labelCache);
            }
            else
            {
                this._labelCache = this._labels.concat();
            }
        }
        else
        {
            this._clearLabelCache();
        }
        this._labels = [];
    },
    
    /**
     * @private
     */
    _clearLabelCache: function()
    {
        if(this._labelCache)
        {
            var len = this._labelCache.length,
                i = 0,
                label,
                labelCache = this._labelCache;
            for(; i < len; ++i)
            {
                label = labelCache[i];
                label.parentNode.removeChild(label);
            }
        }
        this._labelCache = [];
    },

    /**
     * @private
     */
    _calculateSizeByTickLength: true,

    /**
     * @private 
     */
    getLineEnd: function(pt)
    {
        var w = this.get("width"),
            h = this.get("height"),
            pos = this.get("position");
        if(pos === "top" || pos === "bottom")
        {
            return {x:w, y:pt.y};
        }
        else
        {
            return {x:pt.x, y:h};
        }
    },

    /**
     * @private
     */
    getLength: function()
    {
        var l,
            style = this.get("styles"),
            padding = style.padding,
            w = this.get("width"),
            h = this.get("height"),
            pos = this.get("position");
        if(pos === "top" || pos === "bottom")
        {
            l = w - (padding.left + padding.right);
        }
        else
        {
            l = h - (padding.top + padding.bottom);
        }
        return l;
    },

    /**
     * @private
     */
    getFirstPoint:function(pt)
    {
        var style = this.get("styles"),
            pos = this.get("position"),
            padding = style.padding,
            np = {x:pt.x, y:pt.y};
        if(pos === "top" || pos === "bottom")
        {
            np.x += padding.left + this.get("edgeOffset");
        }
        else
        {
            np.y += this.get("height") - (padding.top + this.get("edgeOffset"));
        }
        return np;
    },

    /**
     * @private
     */
    getNextPoint: function(point, majorUnitDistance)
    {
        var pos = this.get("position");
        if(pos === "top" || pos === "bottom")
        {
            point.x = point.x + majorUnitDistance;		
        }
        else
        {
            point.y = point.y - majorUnitDistance;
        }
        return point;
    },

    /**
     * @private 
     */
    getLastPoint: function()
    {
        var style = this.get("styles"),
            padding = style.padding,
            w = this.get("width"),
            pos = this.get("position");
        if(pos === "top" || pos === "bottom")
        {
            return {x:w - padding.right, y:padding.top};
        }
        else
        {
            return {x:padding.left, y:padding.top};
        }
    },

    /**
     * @private 
     */
    getPosition: function(point)
    {
        var p,
            h = this.get("height"),
            style = this.get("styles"),
            padding = style.padding,
            pos = this.get("position"),
            dataType = this.get("dataType");
        if(pos === "left" || pos === "right") 
        {
            //Numeric data on a vertical axis is displayed from bottom to top.
            //Categorical and Timeline data is displayed from top to bottom.
            if(dataType === "numeric")
            {
                p = (h - (padding.top + padding.bottom)) - (point.y - padding.top);
            }
            else
            {
                p = point.y - padding.top;
            }
        }
        else
        {
            p = point.x - padding.left;
        }
        return p;
    }
}, {
    ATTRS: 
    {
        /**
         * @protected
         *
         * Difference betweend the first/last tick and edge of axis.
         *
         * @attribute edgeOffset
         * @type Number
         */
        edgeOffset: 
        {
            value: 0
        },

        /**
         * The graphic in which the axis line and ticks will be rendered.
         *
         * @attribute graphic
         * @type Graphic
         */
        graphic: {},
     
        path: {
            readOnly: true,

            getter: function()
            {
                if(!this._path)
                {
                    var graphic = this.get("graphic");
                    if(graphic)
                    {
                        this._path = graphic.getShape({type:"path"});
                    }
                }
                return this._path;
            }
        },

        /**
         * Contains the contents of the axis. 
         *
         * @attribute node
         * @type HTMLElement
         */
        node: {},

        /**
         * Direction of the axis.
         *
         * @attribute position
         * @type String
         */
        position: {
            lazyAdd: false,

            setOnce: true,

            setter: function(val)
            {
                if(val == "none")
                {
                    this.bindUI();
                }
                return val;
            }
        },

        /**
         * Distance determined by the tick styles used to calculate the distance between the axis
         * line in relation to the top of the axis.
         *
         * @attribute topTickOffset
         * @type Number
         */
        topTickOffset: {
            value: 0
        },

        /**
         * Distance determined by the tick styles used to calculate the distance between the axis
         * line in relation to the bottom of the axis.
         *
         * @attribute bottomTickOffset
         * @type Number
         */
        bottomTickOffset: {
            value: 0
        },

        /**
         * Distance determined by the tick styles used to calculate the distance between the axis
         * line in relation to the left of the axis.
         *
         * @attribute leftTickOffset
         * @type Number
         */
        leftTickOffset: {
            value: 0
        },

        /**
         * Distance determined by the tick styles used to calculate the distance between the axis
         * line in relation to the right side of the axis.
         *
         * @attribute rightTickOffset
         * @type Number
         */
        rightTickOffset: {
            value: 0
        },
        
        /**
         * Collection of labels used to render the axis.
         *
         * @attribute labels
         * @type Array
         */
        labels: {
            readOnly: true,
            getter: function()
            {
                return this._labels;
            }
        },

        /**
         * Collection of points used for placement of labels and ticks along the axis.
         *
         * @attribute tickPoints
         * @type Array
         */
        tickPoints: {
            readOnly: true,

            getter: function()
            {
                if(this.get("position") == "none")
                {
                    return this.get("styles").majorUnit.count;
                }
                return this._tickPoints;
            }
        },

        /**
         * Indicates whether the axis overlaps the graph. If an axis is the inner most axis on a given
         * position and the tick position is inside or cross, the axis will need to overlap the graph.
         *
         * @attribute overlapGraph
         * @type Boolean
         */
        overlapGraph: {
            value:true,

            validator: function(val)
            {
                return Y.Lang.isBoolean(val);
            }
        },

        /**
         * Object which should have by the labelFunction
         *
         * @attribute labelFunctionScope
         * @type Object
         */
        labelFunctionScope: {}
            
        /**
         * Style properties used for drawing an axis. This attribute is inherited from <code>Renderer</code>. Below are the default values:
         *  <dl>
         *      <dt>majorTicks</dt><dd>Properties used for drawing ticks.
         *          <dl>
         *              <dt>display</dt><dd>Position of the tick. Possible values are <code>inside</code>, <code>outside</code>, <code>cross</code> and <code>none</code>. The
         *              default value is <code>inside</code>.</dd>
         *              <dt>length</dt><dd>The length (in pixels) of the tick. The default value is 4.</dd>
         *              <dt>color</dt><dd>The color of the tick. The default value is <code>#dad8c9</code></dd>
         *              <dt>weight</dt><dd>Number indicating the width of the tick. The default value is 1.</dd>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the tick. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>line</dt><dd>Properties used for drawing the axis line. 
         *          <dl>
         *              <dt>weight</dt><dd>Number indicating the width of the axis line. The default value is 1.</dd>
         *              <dt>color</dt><dd>The color of the axis line. The default value is <code>#dad8c9</code>.</dd>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the tick. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>majorUnit</dt><dd>Properties used to calculate the <code>majorUnit</code> for the axis. 
         *          <dl>
         *              <dt>determinant</dt><dd>The algorithm used for calculating distance between ticks. The possible options are <code>count</code> and <code>distance</code>. If
         *              the <code>determinant</code> is <code>count</code>, the axis ticks will spaced so that a specified number of ticks appear on the axis. If the <code>determinant</code>
         *              is <code>distance</code>, the axis ticks will spaced out according to the specified distance. The default value is <code>count</code>.</dd>
         *              <dt>count</dt><dd>Number of ticks to appear on the axis when the <code>determinant</code> is <code>count</code>. The default value is 11.</dd>
         *              <dt>distance</dt><dd>The distance (in pixels) between ticks when the <code>determinant</code> is <code>distance</code>. The default value is 75.</dd>
         *          </dl>
         *      </dd>
         *      <dt>label</dt><dd>Properties and styles applied to the axis labels.
         *          <dl>
         *              <dt>color</dt><dd>The color of the labels. The default value is <code>#808080</code>.</dd>
         *              <dt>alpha</dt><dd>Number between 0 and 1 indicating the opacity of the labels. The default value is 1.</dd>
         *              <dt>fontSize</dt><dd>The font-size of the labels. The default value is 85%</dd>
         *              <dt>rotation</dt><dd>The rotation, in degrees (between -90 and 90) of the labels. The default value is 0.</dd>
         *              <dt>margin</dt><dd>The distance between the label and the axis/tick. Depending on the position of the <code>Axis</code>, only one of the properties used.
         *                  <dl>
         *                      <dt>top</dt><dd>Pixel value used for an axis with a <code>position</code> of <code>bottom</code>. The default value is 4.</dd>
         *                      <dt>right</dt><dd>Pixel value used for an axis with a <code>position</code> of <code>left</code>. The default value is 4.</dd>
         *                      <dt>bottom</dt><dd>Pixel value used for an axis with a <code>position</code> of <code>top</code>. The default value is 4.</dd>
         *                      <dt>left</dt><dd>Pixel value used for an axis with a <code>position</code> of <code>right</code>. The default value is 4.</dd>
         *                  </dl>
         *              </dd>
         *          </dl>
         *      </dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});
/**
 * Algorithmic strategy for rendering a left axis.
 *
 * @class LeftAxisLayout
 * @extends Base
 * @param {Object} config
 * @constructor
 */
function LeftAxisLayout(config)
{
    LeftAxisLayout.superclass.constructor.apply(this, arguments);
}

LeftAxisLayout.ATTRS = {
    /**
     * Reference to the <code>Axis</code> using the strategy.
     *
     * @attribute axisRenderer
     * @type Axis
     * @protected
     */
    axisRenderer: {
        value: null
    },

    /**
     * @private
     */
    maxLabelSize: {
        value: 0
    }
};

Y.extend(LeftAxisLayout, Y.Base, {
    /**
     * Sets the length of the tick on either side of the axis line.
     *
     * @method setTickOffset
     * @protected
     */
    setTickOffsets: function()
    {
        var ar = this.get("axisRenderer"),
            majorTicks = ar.get("styles").majorTicks,
            tickLength = majorTicks.length,
            halfTick = tickLength * 0.5,
            display = majorTicks.display;
        ar.set("topTickOffset",  0);
        ar.set("bottomTickOffset",  0);
        
        switch(display)
        {
            case "inside" :
                ar.set("rightTickOffset",  tickLength);
                ar.set("leftTickOffset", 0);
            break;
            case "outside" : 
                ar.set("rightTickOffset", 0);
                ar.set("leftTickOffset",  tickLength);
            break;
            case "cross":
                ar.set("rightTickOffset", halfTick); 
                ar.set("leftTickOffset",  halfTick);
            break;
            default:
                ar.set("rightTickOffset", 0);
                ar.set("leftTickOffset", 0);
            break;
        }
    },
    
    /**
     * Draws a tick
     *
     * @method drawTick
     * @param {Object} pt Point on the axis in which the tick will intersect.
     * @param {Object) tickStyle Hash of properties to apply to the tick.
     * @protected
     */
    drawTick: function(pt, tickStyles)
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles"),
            padding = style.padding,
            tickLength = tickStyles.length,
            start = {x:padding.left, y:pt.y},
            end = {x:tickLength + padding.left, y:pt.y};
        ar.drawLine(start, end, tickStyles);
    },

    /**
     * Calculates the coordinates for the first point on an axis.
     *
     * @method getLineStart
     * @return {Object}
     * @protected
     */
    getLineStart: function()
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles"),
            padding = style.padding,
            majorTicks = style.majorTicks,
            tickLength = majorTicks.length,
            display = majorTicks.display,
            pt = {x:padding.left, y:0};
        if(display === "outside")
        {
            pt.x += tickLength;
        }
        else if(display === "cross")
        {
            pt.x += tickLength/2;
        }
        return pt; 
    },
    
    /**
     * Calculates the point for a label.
     *
     * @method getLabelPoint
     * @param {Object} point Point on the axis in which the tick will intersect.
     * @return {Object} 
     * @protected
     */
    getLabelPoint: function(point)
    {
        var ar = this.get("axisRenderer");
        return {x:point.x - ar.get("leftTickOffset"), y:point.y};
    },
    
    /**
     * Updates the value for the <code>maxLabelSize</code> for use in calculating total size.
     *
     * @method updateMaxLabelSize
     * @param {HTMLElement} label to measure
     * @protected
     */
    updateMaxLabelSize: function(label)
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles").label,
            rot =  Math.min(90, Math.max(-90, style.rotation)),
            absRot = Math.abs(rot),
            radCon = Math.PI/180,
            sinRadians = parseFloat(parseFloat(Math.sin(absRot * radCon)).toFixed(8)),
            cosRadians = parseFloat(parseFloat(Math.cos(absRot * radCon)).toFixed(8)),
            m11 = cosRadians,
            m12 = rot > 0 ? -sinRadians : sinRadians,
            m21 = -m12,
            m22 = m11,
            max;
        if(!document.createElementNS)
        {
            label.style.filter = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + m11 + ' M12=' + m12 + ' M21=' + m21 + ' M22=' + m22 + ' sizingMethod="auto expand")';
            this.set("maxLabelSize", Math.max(this.get("maxLabelSize"), label.offsetWidth));
        }
        else
        {
            label.style.msTransform = "rotate(0deg)";
            if(rot === 0)
            {
                max = label.offsetWidth;
            }
            else if(absRot === 90)
            {
                max = label.offsetHeight;
            }
            else
            {
                max = (cosRadians * label.offsetWidth) + (sinRadians * label.offsetHeight);
            }
            this.set("maxLabelSize",  Math.max(this.get("maxLabelSize"), max));
        }
    },

    /**
     * Rotate and position labels.
     *
     * @method positionLabel
     * @param {HTMLElement} label to rotate position
     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned
     * against.
     * @protected
     */
    positionLabel: function(label, pt)
    {
        var ar = this.get("axisRenderer"),
            tickOffset = ar.get("leftTickOffset"),
            style = ar.get("styles").label,
            labelAlpha = style.alpha,
            filterString,
            margin = 0,
            leftOffset = pt.x,
            topOffset = pt.y,
            rot =  Math.min(90, Math.max(-90, style.rotation)),
            absRot = Math.abs(rot),
            radCon = Math.PI/180,
            sinRadians = parseFloat(parseFloat(Math.sin(absRot * radCon)).toFixed(8)),
            cosRadians = parseFloat(parseFloat(Math.cos(absRot * radCon)).toFixed(8)),
            m11 = cosRadians,
            m12 = rot > 0 ? -sinRadians : sinRadians,
            m21 = -m12,
            m22 = m11,
            maxLabelSize = this.get("maxLabelSize"),
            labelWidth = Math.round(label.offsetWidth),
            labelHeight = Math.round(label.offsetHeight);
        if(style.margin && style.margin.right)
        {
            margin = style.margin.right;
        }
        if(!document.createElementNS)
        {
            label.style.filter = null; 
            labelWidth = Math.round(label.offsetWidth);
            labelHeight = Math.round(label.offsetHeight);
            if(rot === 0)
            {
                leftOffset = labelWidth;
                topOffset -= labelHeight * 0.5;
            }
            else if(absRot === 90)
            {
                leftOffset = labelHeight;
                topOffset -= labelWidth * 0.5;
            }
            else if(rot > 0)
            {
                leftOffset = (cosRadians * labelWidth) + (labelHeight * rot/90);
                topOffset -= (sinRadians * labelWidth) + (cosRadians * (labelHeight * 0.5));
            }
            else
            {
                leftOffset = (cosRadians * labelWidth) + (absRot/90 * labelHeight);
                topOffset -= cosRadians * (labelHeight * 0.5);
            }
            leftOffset += tickOffset;
            label.style.left = ((pt.x + maxLabelSize) - leftOffset) + "px";
            label.style.top = topOffset + "px";
            if(filterString)
            {
                filterString += " ";
            }
            if(Y.Lang.isNumber(labelAlpha) && labelAlpha < 1 && labelAlpha > -1 && !isNaN(labelAlpha))
            {
                filterString = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(labelAlpha * 100) + ")";
            }
            if(rot !== 0)
            {
                if(filterString)
                {
                    filterString += " ";
                }
                else
                {
                    filterString = ""; 
                }
                filterString += 'progid:DXImageTransform.Microsoft.Matrix(M11=' + m11 + ' M12=' + m12 + ' M21=' + m21 + ' M22=' + m22 + ' sizingMethod="auto expand")';
            }
            if(filterString)
            {
                label.style.filter = filterString;
            }
            return;
        }
        label.style.msTransform = "rotate(0deg)";
        labelWidth = Math.round(label.offsetWidth);
        labelHeight = Math.round(label.offsetHeight);
        if(rot === 0)
        {
            leftOffset -= labelWidth;
            topOffset -= labelHeight * 0.5;
        }
        else if(rot === 90)
        {
            topOffset -= labelWidth * 0.5;
        }
        else if(rot === -90)
        {
            leftOffset -= labelHeight;
            topOffset += labelWidth * 0.5;
        }
        else
        {
            if(rot < 0)
            {
                leftOffset -= (cosRadians * labelWidth) + (sinRadians * labelHeight);
                topOffset += (sinRadians * labelWidth) - (cosRadians * (labelHeight * 0.6)); 
            }
            else
            {
                leftOffset -= (cosRadians * labelWidth);
                topOffset -= (sinRadians * labelWidth) + (cosRadians * (labelHeight * 0.6));
            }
        }
        leftOffset -= tickOffset;
        label.style.left = (this.get("maxLabelSize") + leftOffset) + "px";
        label.style.top = topOffset + "px";
        label.style.MozTransformOrigin =  "0 0";
        label.style.MozTransform = "rotate(" + rot + "deg)";
        label.style.webkitTransformOrigin = "0 0";
        label.style.webkitTransform = "rotate(" + rot + "deg)";
        label.style.msTransformOrigin =  "0 0";
        label.style.msTransform = "rotate(" + rot + "deg)";
        label.style.OTransformOrigin =  "0 0";
        label.style.OTransform = "rotate(" + rot + "deg)";
    },

    /**
     * @protected
     *
     * Calculates the size and positions the content elements.
     *
     * @method setSizeAndPosition
     * @protected
     */
    setSizeAndPosition: function()
    {
        var labelSize = this.get("maxLabelSize"),
            ar = this.get("axisRenderer"),
            style = ar.get("styles"),
            leftTickOffset = ar.get("leftTickOffset"),
            sz = labelSize + leftTickOffset,
            path = ar.get("graphic"),
            margin = style.label.margin;
        if(margin && margin.right)
        {
            sz += margin.right;
        }
        sz = Math.round(sz);
        ar.set("width", sz);
        ar.get("contentBox").setStyle("width", sz);
        path.set("x", labelSize + margin.right);
    },
    
    /**
     * Adjust the position of the Axis widget's content box for internal axes.
     *
     * @method offsetNodeForTick
     * @param {Node} cb Content box of the Axis.
     * @protected
     */
    offsetNodeForTick: function(cb)
    {
    },

    /**
     * Sets the width of the axis based on its contents.
     *
     * @method setCalculatedSize
     * @protected
     */
    setCalculatedSize: function()
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles"),
            label = style.label,
            tickOffset = ar.get("leftTickOffset"),
            max = this.get("maxLabelSize"),
            ttl = Math.round(tickOffset + max + label.margin.right);
        ar.get("contentBox").setStyle("width", ttl);
        ar.set("width", ttl);
    }
});

Y.LeftAxisLayout = LeftAxisLayout;
/**
 * RightAxisLayout contains algorithms for rendering a right axis.
 *
 * @constructor
 * @class RightAxisLayout
 * @extends Base
 * @param {Object} config
 */
function RightAxisLayout(config)
{
    RightAxisLayout.superclass.constructor.apply(this, arguments);
}

RightAxisLayout.ATTRS = {
    /**
     * Reference to the <code>Axis</code> using the strategy.
     *
     * @attribute axisRenderer
     * @type Axis
     * @protected
     */
    axisRenderer: {
        value: null
    }
};

Y.extend(RightAxisLayout, Y.Base, {
    /**
     * Sets the length of the tick on either side of the axis line.
     *
     * @method setTickOffset
     * @protected
     */
    setTickOffsets: function()
    {
        var ar = this.get("axisRenderer"),
            majorTicks = ar.get("styles").majorTicks,
            tickLength = majorTicks.length,
            halfTick = tickLength * 0.5,
            display = majorTicks.display;
        ar.set("topTickOffset",  0);
        ar.set("bottomTickOffset",  0);
        
        switch(display)
        {
            case "inside" :
                ar.set("leftTickOffset", tickLength);
                ar.set("rightTickOffset", 0);
            break;
            case "outside" : 
                ar.set("leftTickOffset", 0);
                ar.set("rightTickOffset", tickLength);
            break;
            case "cross" :
                ar.set("rightTickOffset", halfTick);
                ar.set("leftTickOffset", halfTick);
            break;
            default:
                ar.set("leftTickOffset", 0);
                ar.set("rightTickOffset", 0);
            break;
        }
    },

    /**
     * Draws a tick
     *
     * @method drawTick
     * @param {Object} pt Point on the axis in which the tick will intersect.
     * @param {Object) tickStyle Hash of properties to apply to the tick.
     * @protected
     */
    drawTick: function(pt, tickStyles)
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles"),
            padding = style.padding,
            tickLength = tickStyles.length,
            start = {x:padding.left, y:pt.y},
            end = {x:padding.left + tickLength, y:pt.y};
        ar.drawLine(start, end, tickStyles);
    },
    
    /**
     * Calculates the coordinates for the first point on an axis.
     *
     * @method getLineStart
     * @return {Object}
     * @protected
     */
    getLineStart: function()
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles"),
            padding = style.padding,
            majorTicks = style.majorTicks,
            tickLength = majorTicks.length,
            display = majorTicks.display,
            pt = {x:padding.left, y:padding.top};
        if(display === "inside")
        {
            pt.x += tickLength;
        }
        else if(display === "cross")
        {
            pt.x += tickLength/2;
        }
        return pt;
    },
    
    /**
     * Calculates the point for a label.
     *
     * @method getLabelPoint
     * @param {Object} point Point on the axis in which the tick will intersect.
     * @return {Object} 
     * @protected
     */
    getLabelPoint: function(point)
    {
        var ar = this.get("axisRenderer");
        return {x:point.x + ar.get("rightTickOffset"), y:point.y};
    },
    
    /**
     * Updates the value for the <code>maxLabelSize</code> for use in calculating total size.
     *
     * @method updateMaxLabelSize
     * @param {HTMLElement} label to measure
     * @protected
     */
    updateMaxLabelSize: function(label)
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles").label,
            rot =  Math.min(90, Math.max(-90, style.rotation)),
            absRot = Math.abs(rot),
            radCon = Math.PI/180,
            sinRadians = parseFloat(parseFloat(Math.sin(absRot * radCon)).toFixed(8)),
            cosRadians = parseFloat(parseFloat(Math.cos(absRot * radCon)).toFixed(8)),
            m11 = cosRadians,
            m12 = rot > 0 ? -sinRadians : sinRadians,
            m21 = -m12,
            m22 = m11,
            max;
        if(!document.createElementNS)
        {
            label.style.filter = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + m11 + ' M12=' + m12 + ' M21=' + m21 + ' M22=' + m22 + ' sizingMethod="auto expand")';
            this.set("maxLabelSize", Math.max(this.get("maxLabelSize"), label.offsetWidth));
        }
        else
        {
            label.style.msTransform = "rotate(0deg)";
            if(rot === 0)
            {
                max = label.offsetWidth;
            }
            else if(absRot === 90)
            {
                max = label.offsetHeight;
            }
            else
            {
                max = (cosRadians * label.offsetWidth) + (sinRadians * label.offsetHeight);
            }
            this.set("maxLabelSize",  Math.max(this.get("maxLabelSize"), max));
        }
    },

    /**
     * Rotate and position labels.
     *
     * @method positionLabel
     * @param {HTMLElement} label to rotate position
     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned
     * against.
     * @protected
     */
    positionLabel: function(label, pt)
    {
        var ar = this.get("axisRenderer"),
            tickOffset = ar.get("rightTickOffset"),
            style = ar.get("styles").label,
            labelAlpha = style.alpha,
            filterString,
            margin = 0,
            leftOffset = pt.x,
            topOffset = pt.y,
            rot =  Math.min(Math.max(style.rotation, -90), 90),
            absRot = Math.abs(rot),
            radCon = Math.PI/180,
            sinRadians = parseFloat(parseFloat(Math.sin(absRot * radCon)).toFixed(8)),
            cosRadians = parseFloat(parseFloat(Math.cos(absRot * radCon)).toFixed(8)),
            m11 = cosRadians,
            m12 = rot > 0 ? -sinRadians : sinRadians,
            m21 = -m12,
            m22 = m11,
            labelWidth = Math.round(label.offsetWidth),
            labelHeight = Math.round(label.offsetHeight);
        if(style.margin && style.margin.right)
        {
            margin = style.margin.right;
        }
        if(!document.createElementNS)
        {
            label.style.filter = null;
            if(rot === 0)
            {
                topOffset -= labelHeight * 0.5;
            }
            else if(absRot === 90)
            {
                topOffset -= labelWidth * 0.5;
            }
            else if(rot > 0)
            {
                topOffset -= (cosRadians * (labelHeight * 0.5));
            }
            else
            {
                topOffset -= (sinRadians * labelWidth) +  (cosRadians * (labelHeight * 0.5));
            }
            leftOffset += margin;
            leftOffset += tickOffset;
            label.style.left = leftOffset + "px";
            label.style.top = topOffset + "px";
            if(Y.Lang.isNumber(labelAlpha) && labelAlpha < 1 && labelAlpha > -1 && !isNaN(labelAlpha))
            {
                filterString = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(labelAlpha * 100) + ")";
            }
            if(rot !== 0)
            {
                if(filterString)
                {
                    filterString += " ";
                }
                else
                {
                    filterString = ""; 
                }
                filterString += 'progid:DXImageTransform.Microsoft.Matrix(M11=' + m11 + ' M12=' + m12 + ' M21=' + m21 + ' M22=' + m22 + ' sizingMethod="auto expand")';
            }
            if(filterString)
            {
                label.style.filter = filterString;
            }
            return;
        }
        label.style.msTransform = "rotate(0deg)";
        labelWidth = Math.round(label.offsetWidth);
        labelHeight = Math.round(label.offsetHeight);
        if(rot === 0)
        {
            topOffset -= labelHeight * 0.5;
        }
        else if(rot === 90)
        {
            leftOffset += labelHeight;
            topOffset -= labelWidth * 0.5;
        }
        else if(rot === -90)
        {
            topOffset += labelWidth * 0.5;
        }
        else if(rot < 0)
        {
            topOffset -= (cosRadians * (labelHeight * 0.6)); 
        }
        else
        {
            topOffset -= cosRadians * (labelHeight * 0.6);
            leftOffset += sinRadians * labelHeight;
        }
        leftOffset += margin;
        leftOffset += tickOffset;
        label.style.left = leftOffset + "px";
        label.style.top = topOffset + "px";
        label.style.MozTransformOrigin =  "0 0";
        label.style.MozTransform = "rotate(" + rot + "deg)";
        label.style.webkitTransformOrigin = "0 0";
        label.style.webkitTransform = "rotate(" + rot + "deg)";
        label.style.msTransformOrigin =  "0 0";
        label.style.msTransform = "rotate(" + rot + "deg)";
        label.style.OTransformOrigin =  "0 0";
        label.style.OTransform = "rotate(" + rot + "deg)";
    },

    /**
     * Calculates the size and positions the content elements.
     *
     * @method setSizeAndPosition
     * @protected
     */
    setSizeAndPosition: function()
    {
        var ar = this.get("axisRenderer"),
            label = ar.get("styles").label,
            labelSize = this.get("maxLabelSize"),
            tickOffset = ar.get("rightTickOffset"),
            sz = tickOffset + labelSize;
        if(label.margin && label.margin.weight)
        {
            sz += label.margin.weight;
        }
        ar.set("width", sz);
        ar.get("contentBox").setStyle("width", sz);
    },
    
    /**
     * Adjusts position for inner ticks.
     *
     * @method offsetNodeForTick
     * @param {Node} cb contentBox of the axis
     * @protected
     */
    offsetNodeForTick: function(cb)
    {
        var ar = this.get("axisRenderer"),
            tickOffset = ar.get("leftTickOffset"),
            offset = 0 - tickOffset;
        cb.setStyle("left", offset);
    },

    /**
     * Assigns a height based on the size of the contents.
     *
     * @method setCalculatedSize
     * @protected
     */
    setCalculatedSize: function()
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles").label,
            ttl = Math.round(ar.get("rightTickOffset") + this.get("maxLabelSize") + style.margin.left);
        ar.set("width", ttl);
    }
});

Y.RightAxisLayout = RightAxisLayout;
/**
 * Contains algorithms for rendering a bottom axis.
 *
 * @class BottomAxisLayout
 * @Constructor
 */
function BottomAxisLayout(config)
{
    BottomAxisLayout.superclass.constructor.apply(this, arguments);
}

BottomAxisLayout.ATTRS = {
    /**
     * Reference to the <code>Axis</code> using the strategy.
     *
     * @attribute axisRenderer
     * @type Axis
     * @protected
     */
    axisRenderer: {
        value:null
    },
    
    /**
     * Length in pixels of largest text bounding box. Used to calculate the height of the axis.
     *
     * @attribute maxLabelSize
     * @type Number
     * @protected
     */
    maxLabelSize: {
        value: 0
    }
};

Y.extend(BottomAxisLayout, Y.Base, {
    /**
     * Sets the length of the tick on either side of the axis line.
     *
     * @method setTickOffsets
     * @protected
     */
    setTickOffsets: function()
    {
        var ar = this.get("axisRenderer"),
            majorTicks = ar.get("styles").majorTicks,
            tickLength = majorTicks.length,
            halfTick = tickLength * 0.5,
            display = majorTicks.display;
        ar.set("leftTickOffset",  0);
        ar.set("rightTickOffset",  0);

        switch(display)
        {
            case "inside" :
                ar.set("topTickOffset", tickLength);
                ar.set("bottomTickOffset", 0);
            break;
            case "outside" : 
                ar.set("topTickOffset", 0);
                ar.set("bottomTickOffset", tickLength);
            break;
            case "cross":
                ar.set("topTickOffset",  halfTick);
                ar.set("bottomTickOffset",  halfTick);
            break;
            default:
                ar.set("topTickOffset", 0);
                ar.set("bottomTickOffset", 0);
            break;
        }
    },

    /**
     * Calculates the coordinates for the first point on an axis.
     *
     * @method getLineStart
     * @protected
     */
    getLineStart: function()
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles"),
            padding = style.padding,
            majorTicks = style.majorTicks,
            tickLength = majorTicks.length,
            display = majorTicks.display,
            pt = {x:0, y:padding.top};
        if(display === "inside")
        {
            pt.y += tickLength;
        }
        else if(display === "cross")
        {
            pt.y += tickLength/2;
        }
        return pt; 
    },
    
    /**
     * Draws a tick
     *
     * @method drawTick
     * @param {Object} pt hash containing x and y coordinates
     * @param {Object} tickStyles hash of properties used to draw the tick
     * @protected
     */
    drawTick: function(pt, tickStyles)
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles"),
            padding = style.padding,
            tickLength = tickStyles.length,
            start = {x:pt.x, y:padding.top},
            end = {x:pt.x, y:tickLength + padding.top};
        ar.drawLine(start, end, tickStyles);
    },

    /**
     * Calculates the point for a label.
     *
     * @method getLabelPoint
     * @param {Object} pt hash containing x and y coordinates
     * @return Object
     * @protected
     */
    getLabelPoint: function(point)
    {
        var ar = this.get("axisRenderer");
        return {x:point.x, y:point.y + ar.get("bottomTickOffset")};
    },
    
    /**
     * Updates the value for the <code>maxLabelSize</code> for use in calculating total size.
     *
     * @method updateMaxLabelSize
     * @param {HTMLElement} label to measure
     * @protected
     */
    updateMaxLabelSize: function(label)
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles").label,
            rot =  Math.min(90, Math.max(-90, style.rotation)),
            absRot = Math.abs(rot),
            radCon = Math.PI/180,
            sinRadians = parseFloat(parseFloat(Math.sin(absRot * radCon)).toFixed(8)),
            cosRadians = parseFloat(parseFloat(Math.cos(absRot * radCon)).toFixed(8)),
            m11 = cosRadians,
            m12 = rot > 0 ? -sinRadians : sinRadians,
            m21 = -m12,
            m22 = m11,
            max;
        if(!document.createElementNS)
        {
            label.style.filter = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + m11 + ' M12=' + m12 + ' M21=' + m21 + ' M22=' + m22 + ' sizingMethod="auto expand")';
            this.set("maxLabelSize", Math.max(this.get("maxLabelSize"), label.offsetHeight));
        }
        else
        {
            label.style.msTransform = "rotate(0deg)";
            if(rot === 0)
            {
                max = label.offsetHeight;
            }
            else if(absRot === 90)
            {
                max = label.offsetWidth;
            }
            else
            {
                max = (sinRadians * label.offsetWidth) + (cosRadians * label.offsetHeight); 
            }
            this.set("maxLabelSize",  Math.max(this.get("maxLabelSize"), max));
        }
    },
    
    /**
     * Rotate and position labels.
     *
     * @method positionLabel
     * @param {HTMLElement} label to rotate position
     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned
     * against.
     * @protected
     */
    positionLabel: function(label, pt)
    {
        var ar = this.get("axisRenderer"),
            tickOffset = ar.get("bottomTickOffset"),
            style = ar.get("styles").label,
            labelAlpha = style.alpha,
            filterString,
            margin = 0,
            leftOffset = Math.round(pt.x),
            topOffset = Math.round(pt.y),
            rot =  Math.min(90, Math.max(-90, style.rotation)),
            absRot = Math.abs(rot),
            radCon = Math.PI/180,
            sinRadians = parseFloat(parseFloat(Math.sin(absRot * radCon)).toFixed(8)),
            cosRadians = parseFloat(parseFloat(Math.cos(absRot * radCon)).toFixed(8)),
            m11 = cosRadians,
            m12 = rot > 0 ? -sinRadians : sinRadians,
            m21 = -m12,
            m22 = m11,
            labelWidth = Math.round(label.offsetWidth),
            labelHeight = Math.round(label.offsetHeight);
        if(style.margin && style.margin.top)
        {
            margin = style.margin.top;
        }
        if(!document.createElementNS)
        {
            m11 = cosRadians;
            m12 = rot > 0 ? -sinRadians : sinRadians;
            m21 = -m12;
            m22 = m11;
            label.style.filter = null;
            labelWidth = Math.round(label.offsetWidth);
            labelHeight = Math.round(label.offsetHeight);
            if(absRot === 90)
            {
                leftOffset -= labelHeight * 0.5;
            }
            else if(rot < 0)
            {
                leftOffset -= cosRadians * labelWidth;
                leftOffset -= sinRadians * (labelHeight * 0.5);
            }
            else if(rot > 0)
            {
               leftOffset -= sinRadians * (labelHeight * 0.5);
            }
            else
            {
                leftOffset -= labelWidth * 0.5;
            }
            topOffset += margin;
            topOffset += tickOffset;
            label.style.left = Math.round(leftOffset) + "px";
            label.style.top = Math.round(topOffset) + "px";
            if(Y.Lang.isNumber(labelAlpha) && labelAlpha < 1 && labelAlpha > -1 && !isNaN(labelAlpha))
            {
                filterString = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(labelAlpha * 100) + ")";
            }
            if(rot !== 0)
            {
                if(filterString)
                {
                    filterString += " ";
                }
                else
                {
                    filterString = ""; 
                }
                filterString += 'progid:DXImageTransform.Microsoft.Matrix(M11=' + m11 + ' M12=' + m12 + ' M21=' + m21 + ' M22=' + m22 + ' sizingMethod="auto expand")';
            }
            if(filterString)
            {
                label.style.filter = filterString;
            }
            return;
        }
        label.style.msTransform = "rotate(0deg)";
        labelWidth = Math.round(label.offsetWidth);
        labelHeight = Math.round(label.offsetHeight);
        if(rot === 0)
        {
            leftOffset -= labelWidth * 0.5;
        }
        else if(absRot === 90)
        {
            if(rot === 90)
            {
                leftOffset += labelHeight * 0.5;
            }
            else
            {
                topOffset += labelWidth;
                leftOffset -= labelHeight * 0.5;
            }
        }
        else 
        {
            if(rot < 0)
            {
                leftOffset -= (cosRadians * labelWidth) + (sinRadians * (labelHeight * 0.6));
                topOffset += sinRadians * labelWidth;
            }
            else
            {
                leftOffset += Math.round(sinRadians * (labelHeight * 0.6));
            }
        }
        topOffset += margin;
        topOffset += tickOffset;
        label.style.left = Math.round(leftOffset) + "px";
        label.style.top = Math.round(topOffset) + "px";
        label.style.MozTransformOrigin =  "0 0";
        label.style.MozTransform = "rotate(" + rot + "deg)";
        label.style.webkitTransformOrigin = "0 0";
        label.style.webkitTransform = "rotate(" + rot + "deg)";
        label.style.msTransformOrigin =  "0 0";
        label.style.msTransform = "rotate(" + rot + "deg)";
        label.style.OTransformOrigin =  "0 0";
        label.style.OTransform = "rotate(" + rot + "deg)";
    },
    
    /**
     * Calculates the size and positions the content elements.
     *
     * @method setSizeAndPosition
     * @protected
     */
    setSizeAndPosition: function()
    {
        var labelSize = this.get("maxLabelSize"),
            ar = this.get("axisRenderer"),
            tickLength = ar.get("bottomTickLength"),
            style = ar.get("styles"),
            sz = tickLength + labelSize,
            margin = style.label.margin;
        if(margin && margin.top)
        {   
            sz += margin.top;
        }
        sz = Math.round(sz);
        ar.set("height", sz);
    },

    /**
     * Adjusts position for inner ticks.
     *
     * @method offsetNodeForTick
     * @param {Node} cb contentBox of the axis
     * @protected
     */
    offsetNodeForTick: function(cb)
    {
        var ar = this.get("axisRenderer");
        ar.get("contentBox").setStyle("top", 0 - ar.get("topTickOffset"));
    },

    /**
     * Assigns a height based on the size of the contents.
     *
     * @method setCalculatedSize
     * @protected
     */
    setCalculatedSize: function()
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles").label,
            ttl = Math.round(ar.get("bottomTickOffset") + this.get("maxLabelSize") + style.margin.top);
        ar.set("height", ttl);
    }
});

Y.BottomAxisLayout = BottomAxisLayout;
/**
 * Contains algorithms for rendering a top axis.
 *
 * @class TopAxisLayout
 * @constructor
 */
function TopAxisLayout(config)
{
    TopAxisLayout.superclass.constructor.apply(this, arguments);
}

TopAxisLayout.ATTRS = {
    /**
     * Reference to the <code>Axis</code> using the strategy.
     *
     * @attribute axisRenderer
     * @type Axis
     * @protected
     */
    axisRenderer: {
        value: null
    },

    /**
     * Length in pixels of largest text bounding box. Used to calculate the height of the axis.
     *
     * @attribute maxLabelSize
     * @type Number
     * @protected
     */
    maxLabelSize: {
        value: 0
    }
};

Y.extend(TopAxisLayout, Y.Base, {
    /**
     * Sets the length of the tick on either side of the axis line.
     *
     * @method setTickOffsets
     * @protected
     */
    setTickOffsets: function()
    {
        var ar = this.get("axisRenderer"),
            majorTicks = ar.get("styles").majorTicks,
            tickLength = majorTicks.length,
            halfTick = tickLength * 0.5,
            display = majorTicks.display;
        ar.set("leftTickOffset",  0);
        ar.set("rightTickOffset",  0);
        switch(display)
        {
            case "inside" :
                ar.set("bottomTickOffset", tickLength);
                ar.set("topTickOffset", 0);
            break;
            case "outside" : 
                ar.set("bottomTickOffset", 0);
                ar.set("topTickOffset",  tickLength);
            break;
            case "cross" :
                ar.set("topTickOffset", halfTick);
                ar.set("bottomTickOffset", halfTick);
            break;
            default:
                ar.set("topTickOffset", 0);
                ar.set("bottomTickOffset", 0);
            break;
        }
    },

    /**
     * Calculates the coordinates for the first point on an axis.
     *
     * @method getLineStart
     * @protected
     */
    getLineStart: function()
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles"),
            padding = style.padding,
            majorTicks = style.majorTicks,
            tickLength = majorTicks.length,
            display = majorTicks.display,
            pt = {x:0, y:padding.top};
        if(display === "outside")
        {
            pt.y += tickLength;
        }
        else if(display === "cross")
        {
            pt.y += tickLength/2;
        }
        return pt; 
    },
    
    /**
     * Draws a tick
     *
     * @method drawTick
     * @param {Object} pt hash containing x and y coordinates
     * @param {Object} tickStyles hash of properties used to draw the tick
     * @protected
     */
    drawTick: function(pt, tickStyles)
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles"),
            padding = style.padding,
            tickLength = tickStyles.length,
            start = {x:pt.x, y:padding.top},
            end = {x:pt.x, y:tickLength + padding.top};
        ar.drawLine(start, end, tickStyles);
    },
    
    /**
     * Calculates the point for a label.
     *
     * @method getLabelPoint
     * @param {Object} pt hash containing x and y coordinates
     * @return Object
     * @protected
     */
    getLabelPoint: function(pt)
    {
        var ar = this.get("axisRenderer");
        return {x:pt.x, y:pt.y - ar.get("topTickOffset")};
    },
    
    /**
     * Updates the value for the <code>maxLabelSize</code> for use in calculating total size.
     *
     * @method updateMaxLabelSize
     * @param {HTMLElement} label to measure
     * @protected
     */
    updateMaxLabelSize: function(label)
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles").label,
            rot =  Math.min(90, Math.max(-90, style.rotation)),
            absRot = Math.abs(rot),
            radCon = Math.PI/180,
            sinRadians = parseFloat(parseFloat(Math.sin(absRot * radCon)).toFixed(8)),
            cosRadians = parseFloat(parseFloat(Math.cos(absRot * radCon)).toFixed(8)),
            m11 = cosRadians,
            m12 = rot > 0 ? -sinRadians : sinRadians,
            m21 = -m12,
            m22 = m11,
            max;
        if(!document.createElementNS)
        {
            label.style.filter = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + m11 + ' M12=' + m12 + ' M21=' + m21 + ' M22=' + m22 + ' sizingMethod="auto expand")';
            this.set("maxLabelSize", Math.max(this.get("maxLabelSize"), label.offsetHeight));
        }
        else
        {
            label.style.msTransform = "rotate(0deg)";
            if(rot === 0)
            {
                max = label.offsetHeight;
            }
            else if(absRot === 90)
            {
                max = label.offsetWidth;
            }
            else
            {
                max = (sinRadians * label.offsetWidth) + (cosRadians * label.offsetHeight); 
            }
            this.set("maxLabelSize",  Math.max(this.get("maxLabelSize"), max));
        }
    },

    /**
     * Rotate and position labels.
     *
     * @method positionLabel
     * @param {HTMLElement} label to rotate position
     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned
     * against.
     * @protected
     */
    positionLabel: function(label, pt)
    {
        var ar = this.get("axisRenderer"),
            tickOffset = ar.get("topTickOffset"),
            style = ar.get("styles").label,
            labelAlpha = style.alpha,
            filterString,
            margin = 0,
            leftOffset = pt.x,
            topOffset = pt.y,
            rot =  Math.max(-90, Math.min(90, style.rotation)),
            absRot = Math.abs(rot),
            radCon = Math.PI/180,
            sinRadians = parseFloat(parseFloat(Math.sin(absRot * radCon)).toFixed(8)),
            cosRadians = parseFloat(parseFloat(Math.cos(absRot * radCon)).toFixed(8)),
            m11,
            m12,
            m21,
            m22,
            maxLabelSize = this.get("maxLabelSize"),
            labelWidth = Math.round(label.offsetWidth),
            labelHeight = Math.round(label.offsetHeight);
        rot = Math.min(90, rot);
        rot = Math.max(-90, rot);
        if(style.margin && style.margin.bottom)
        {
            margin = style.margin.bottom;
        }
        if(!document.createElementNS)
        {
            label.style.filter = null;
            labelWidth = Math.round(label.offsetWidth);
            labelHeight = Math.round(label.offsetHeight);
            m11 = cosRadians;
            m12 = rot > 0 ? -sinRadians : sinRadians;
            m21 = -m12;
            m22 = m11;
            if(rot === 0)
            {
                leftOffset -= labelWidth * 0.5;
            }
            else if(absRot === 90)
            {
                leftOffset -= labelHeight * 0.5;
            }
            else if(rot > 0)
            {
                leftOffset -= (cosRadians * labelWidth) + Math.min((sinRadians * labelHeight), (rot/180 * labelHeight));
                topOffset -= (sinRadians * labelWidth) + (cosRadians * (labelHeight));
                topOffset += maxLabelSize;
            }
            else
            {
                leftOffset -= sinRadians * (labelHeight * 0.5);
                topOffset -= (sinRadians * labelWidth) + (cosRadians * (labelHeight));
                topOffset += maxLabelSize;
            }
            topOffset -= tickOffset;
            label.style.left = leftOffset;
            label.style.top = topOffset;
            if(Y.Lang.isNumber(labelAlpha) && labelAlpha < 1 && labelAlpha > -1 && !isNaN(labelAlpha))
            {
                filterString = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(labelAlpha * 100) + ")";
            }
            if(rot !== 0)
            {
                if(filterString)
                {
                    filterString += " ";
                }
                else
                {
                    filterString = ""; 
                }
                filterString += 'progid:DXImageTransform.Microsoft.Matrix(M11=' + m11 + ' M12=' + m12 + ' M21=' + m21 + ' M22=' + m22 + ' sizingMethod="auto expand")';
            }
            if(filterString)
            {
                label.style.filter = filterString;
            }
            return;
        }
        label.style.msTransform = "rotate(0deg)";
        labelWidth = Math.round(label.offsetWidth);
        labelHeight = Math.round(label.offsetHeight);
        if(rot === 0)
        {
            leftOffset -= labelWidth * 0.5;
            topOffset -= labelHeight;
        }
        else if(rot === 90)
        {
            leftOffset += labelHeight * 0.5;
            topOffset -= labelWidth;
        }
        else if(rot === -90)
        {
            leftOffset -= labelHeight * 0.5;
            topOffset -= 0;
        }
        else if(rot < 0)
        {
            
            leftOffset -= (sinRadians * (labelHeight * 0.6));
            topOffset -= (cosRadians * labelHeight);
        }
        else
        {
            leftOffset -= (cosRadians * labelWidth) - (sinRadians * (labelHeight * 0.6));
            topOffset -= (sinRadians * labelWidth) + (cosRadians * labelHeight);
        }
        topOffset -= tickOffset;
        label.style.left = leftOffset + "px";
        label.style.top = (this.get("maxLabelSize") + topOffset) + "px";
        label.style.MozTransformOrigin =  "0 0";
        label.style.MozTransform = "rotate(" + rot + "deg)";
        label.style.webkitTransformOrigin = "0 0";
        label.style.webkitTransform = "rotate(" + rot + "deg)";
        label.style.msTransformOrigin =  "0 0";
        label.style.msTransform = "rotate(" + rot + "deg)";
        label.style.OTransformOrigin =  "0 0";
        label.style.OTransform = "rotate(" + rot + "deg)";
    },

    /**
     * Calculates the size and positions the content elements.
     *
     * @method setSizeAndPosition
     * @protected
     */
    setSizeAndPosition: function()
    {
        var labelSize = this.get("maxLabelSize"),
            ar = this.get("axisRenderer"),
            tickOffset = ar.get("topTickOffset"),
            style = ar.get("styles"),
            margin = style.label.margin,
            graphic = ar.get("graphic"),
            sz = tickOffset + labelSize;
        if(margin && margin.bottom)
        {
            sz += margin.bottom;
        }
        ar.set("height", sz);
        graphic.set("y", labelSize + margin.bottom);
    },
    
    /**
     * Adjusts position for inner ticks.
     *
     * @method offsetNodeForTick
     * @param {Node} cb contentBox of the axis
     * @protected
     */
    offsetNodeForTick: function(cb)
    {
    },

    /**
     * Assigns a height based on the size of the contents.
     *
     * @method setCalculatedSize
     * @protected
     */
    setCalculatedSize: function()
    {
        var ar = this.get("axisRenderer"),
            style = ar.get("styles").label,
            ttl = Math.round(ar.get("topTickOffset") + this.get("maxLabelSize") + style.margin.bottom);
        ar.set("height", ttl);
    }
});

Y.TopAxisLayout = TopAxisLayout;

/**
 * AxisType is an abstract class that manages the data for an axis.
 *
 * @param {Object} config (optional) Configuration parameters for the Chart.
 * @class AxisType
 * @constructor
 * @extends Axis
 */
Y.AxisType = Y.Base.create("baseAxis", Y.Axis, [], {
    /**
     * @private
     */
    bindUI: function()
    {
        this.after("dataReady", Y.bind(this._dataChangeHandler, this));
        this.after("dataUpdate", Y.bind(this._dataChangeHandler, this));
        this.after("minimumChange", Y.bind(this._keyChangeHandler, this));
        this.after("maximumChange", Y.bind(this._keyChangeHandler, this));
        this.after("keysChange", this._keyChangeHandler);
        this.after("dataProviderChange", this._dataProviderChangeHandler);
        this.after("stylesChange", this._updateHandler);
        this.after("positionChange", this._positionChangeHandler);
        this.after("overlapGraphChange", this._updateHandler);
        this.after("widthChange", this._handleSizeChange);
        this.after("heightChange", this._handleSizeChange);
        this.after("alwaysShowZeroChange", this._keyChangeHandler);
        this.after("roundingMethodChange", this._keyChangeHandler);
    },

    /**
     * @private
     */
    _dataProviderChangeHandler: function(e)
    {
        var keyCollection = this.get("keyCollection").concat(),
            keys = this.get("keys"),
            i;
        if(keys)
        {
            for(i in keys)
            {
                if(keys.hasOwnProperty(i))
                {
                    delete keys[i];
                }
            }
        }
        if(keyCollection && keyCollection.length)
        {
            this.set("keys", keyCollection);
        }
    },

    /**
     * @private
     */
    GUID: "yuibaseaxis",
	
    /**
     * @private
     */
    _type: null,
	
    /**
     * @private
     */
    _setMaximum: null,
	
    /**
     * @private
     */
    _dataMaximum: null,
	
    /**
     * @private
     */
    _setMinimum: null,
	
    /**
     * @private
     */
    _data: null,

    /**
     * @private
     */
    _updateTotalDataFlag: true,

    /**
     * @private
     */
    _dataReady: false,
	
    /**
     * Adds an array to the key hash.
     *
     * @param value Indicates what key to use in retrieving
     * the array.
     */
    addKey: function (value)
	{
        this.set("keys", value);
	},

    /**
     * @private
     */
    _getKeyArray: function(key, data)
    {
        var i = 0,
            obj,
            keyArray = [],
            len = data.length;
        for(; i < len; ++i)
        {
            obj = data[i];
            keyArray[i] = obj[key];
        }
        return keyArray;
    },

    /**
     * @private 
     */
    _setDataByKey: function(key, data)
    {
        var i,
            obj, 
            arr = [], 
            dv = this._dataClone.concat(), 
            len = dv.length;
        for(i = 0; i < len; ++i)
        {
            obj = dv[i];
            arr[i] = obj[key];
        }
        this.get("keys")[key] = arr;
        this._updateTotalDataFlag = true;
    },

    /**
     * @private
     */
    _updateTotalData: function()
    {
		var keys = this.get("keys"),
            i;
        this._data = [];
        for(i in keys)
        {
            if(keys.hasOwnProperty(i))
            {
                this._data = this._data.concat(keys[i]);
            }
        }
        this._updateTotalDataFlag = false;
    },

    /**
     * Removes an array from the key hash.
     * 
     * @method removeKey
     * @param {String} value Indicates what key to use in removing from 
     * the hash.
     */
    removeKey: function(value)
    {
        var keys = this.get("keys");
        if(keys.hasOwnProperty(value)) 
        {
            delete keys[value];
            this._keyChangeHandler();
        }
    },

    /**
     * Returns a value based of a key value and an index.
     *
     * @method getKeyValueAt
     * @param {String} key value used to look up the correct array
     * @param {Number} index within the array
     * @return Object
     */
    getKeyValueAt: function(key, index)
    {
        var value = NaN,
            keys = this.get("keys");
        if(keys[key] && keys[key][index]) 
        {
            value = keys[key][index];
        }
        return value;
    },

    /**
     * Returns an array of values based on an identifier key.
     *
     * @method getDataByKey
     * @param {String} value value used to identify the array
     * @return Object
     */
    getDataByKey: function (value)
    {
        var keys = this.get("keys");
        if(keys[value])
        {
            return keys[value];
        }
        return null;
    },

    /**
     * @private 
     */
    _updateMinAndMax: function() 
    {
        var data = this.get("data"),
            max = 0,
            min = 0,
            len,
            num,
            i;
        if(data && data.length && data.length > 0)
        {
            len = data.length;
            max = min = data[0];
            if(len > 1)
            {
                for(i = 1; i < len; i++)
                {	
                    num = data[i];
                    if(isNaN(num))
                    {
                        continue;
                    }
                    max = Math.max(num, max);
                    min = Math.min(num, min);
                }
            }
        }
        this._dataMaximum = max;
        this._dataMinimum = min;
    },

    /**
     * Returns the total number of majorUnits that will appear on an axis.
     *
     * @method getTotalMajorUnits
     * @return Number
     */
    getTotalMajorUnits: function()
    {
        var units,
            majorUnit = this.get("styles").majorUnit,
            len = this.get("length");
        if(majorUnit.determinant === "count") 
        {
            units = majorUnit.count;
        }
        else if(majorUnit.determinant === "distance") 
        {
            units = (len/majorUnit.distance) + 1;
        }
        return units; 
    },

    /**
     * Returns the distance between major units on an axis.
     *
     * @method getMajorUnitDistance
     * @param {Number} len Number of ticks
     * @param {Number} uiLen Size of the axis.
     * @param {Object} majorUnit Hash of properties used to determine the majorUnit
     * @return Number
     */
    getMajorUnitDistance: function(len, uiLen, majorUnit)
    {
        var dist;
        if(majorUnit.determinant === "count")
        {
            dist = uiLen/(len - 1);
        }
        else if(majorUnit.determinant === "distance")
        {
            dist = majorUnit.distance;
        }
        return dist;
    },
    
    /**
     * Gets the distance that the first and last ticks are offset from there respective
     * edges.
     *
     * @attribute getEdgeOffset
     * @type Method
     * @param {Number} ct Number of ticks on the axis.
     * @param {Number} l Length (in pixels) of the axis.
     * @return Number
     */
    getEdgeOffset: function(ct, l)
    {
        return 0;
    },

    /**
     * Calculates and returns a value based on the number of labels and the index of
     * the current label.
     *
     * @method getLabelByIndex
     * @param {Number} i Index of the label.
     * @param {Number} l Total number of labels.
     * @return String
     */
    getLabelByIndex: function(i, l)
    {
        var min = this.get("minimum"),
            max = this.get("maximum"),
            increm = (max - min)/(l-1),
            label;
            l -= 1;
        label = min + (i * increm);
        return label;
    },

    /**
     * @private
     */
    _keyChangeHandler: function(e)
    {
        this._updateMinAndMax();
		this.fire("dataUpdate");
    }
}, {
    ATTRS: {
        /**
         * Hash of array identifed by a string value.
         *
         * @attribute keys
         * @type Object
         */
        keys: {
            value: {},

            setter: function(val)
            {
                var keys = {},
                    i, 
                    len,
                    data = this.get("dataProvider");
                if(Y.Lang.isArray(val))
                {
                    len = val.length;
                    for(i = 0; i < len; ++i)
                    {
                        keys[val[i]] = this._getKeyArray(val[i], data);   
                    }
                    
                }
                else if(Y.Lang.isString(val))
                {
                    keys = this.get("keys");
                    keys[val] = this._getKeyArray(val, data);
                }
                else
                {
                    for(i in val)
                    {
                        if(val.hasOwnProperty(i))
                        {
                            keys[i] = this._getKeyArray(i, data);
                        }
                    }
                }
	            this._updateTotalDataFlag = true;
                return keys;
            }
        },

        /**
         *Indicates how to round unit values.
         *  <dl>
         *      <dt>niceNumber</dt><dd>Units will be smoothed based on the number of ticks and data range.</dd>
         *      <dt>auto</dt><dd>If the range is greater than 1, the units will be rounded.</dd>
         *      <dt>numeric value</dt><dd>Units will be equal to the numeric value.</dd>
         *      <dt>null</dt><dd>No rounding will occur.</dd>
         *  </dl>
         *
         * @attribute roundingMethod
         * @type String
         * @default niceNumber
         */
        roundingMethod: {
            value: "niceNumber"
        },

        /**
         *Returns the type of axis data
         *  <dl>
         *      <dt>time</dt><dd>Manages time data</dd>
         *      <dt>stacked</dt><dd>Manages stacked numeric data</dd>      
         *      <dt>numeric</dt><dd>Manages numeric data</dd>
         *      <dt>category</dt><dd>Manages categorical data</dd>
         *  </dl>
         *
         * @attribute type
         * @type String
         */
        type:
        {
            readOnly: true,

            getter: function ()
            {
                return this._type;
            }
        },

        /**
         * Instance of <code>ChartDataProvider</code> that the class uses
         * to build its own data.
         *
         * @attribute dataProvider
         * @type Array
         */
        dataProvider:{
            setter: function (value)
            {
                return value;
            }
        },

        /**
         * The maximum value contained in the <code>data</code> array. Used for
         * <code>maximum</code> when <code>autoMax</code> is true.
         *
         * @attribute dataMaximum
         * @type Number
         */
        dataMaximum: {
            getter: function ()
            {
                if(!this._dataMaximum)
                {   
                    this._updateMinAndMax();
                }
                return this._dataMaximum;
            }
        },

        /**
         * The maximum value that will appear on an axis.
         *
         * @attribute maximum
         * @type Number
         */
        maximum: {
            getter: function ()
            {
                var max = this.get("dataMaximum"),
                    min = this.get("minimum");
                //If all values are zero, force a range so that the Axis and related series
                //will still render.
                if(min === 0 && max === 0)
                {
                    max = 10;
                }
                if(this.get("setMax")) 
                {
                    max = this._setMaximum;
                }
                return max;
            },
            setter: function (value)
            {
                this._setMaximum = parseFloat(value);
                return value;
            }
        },

        /**
         * The minimum value contained in the <code>data</code> array. Used for
         * <code>minimum</code> when <code>autoMin</code> is true.
         *
         * @attribute dataMinimum
         * @type Number
         */
        dataMinimum: {
            getter: function ()
            {
                if(!this._dataMinimum)
                {
                    this._updateMinAndMax();
                }
                return this._dataMinimum;
            }
        },

        /**
         * The minimum value that will appear on an axis.
         *
         * @attribute minimum
         * @type Number
         */
        minimum: {
            getter: function ()
            {
                var min = this.get("dataMinimum");
                if(this.get("setMin"))
                {
                    min = this._setMinimum;
                }
                return min;
            },
            setter: function(val)
            {
                this._setMinimum = parseFloat(val);
                return val;
            }
        },

        /**
         * Determines whether the maximum is calculated or explicitly 
         * set by the user.
         *
         * @attribute setMax
         * @type Boolean
         */
        setMax: {
            readOnly: true,

            getter: function()
            {
                return Y.Lang.isNumber(this._setMaximum);
            }
        },

        /**
         * Determines whether the minimum is calculated or explicitly
         * set by the user.
         *
         * @attribute setMin
         * @type Boolean
         */
        setMin: {
            readOnly: true,

            getter: function()
            {
                return Y.Lang.isNumber(this._setMinimum);
            }
        },

        /**
         * Array of axis data
         *
         * @attribute data
         * @type Array
         */
        data: {
            getter: function ()
            {
                if(!this._data || this._updateTotalDataFlag)
                {
                    this._updateTotalData();
                }
                return this._data;
            }
        },

        /**
         * Array containing all the keys in the axis.
         *
         * @attribute keyCollection
         * @type Array
         */
        keyCollection: {
            getter: function()
            {
                var keys = this.get("keys"),
                    i, 
                    col = [];
                for(i in keys)
                {
                    if(keys.hasOwnProperty(i))
                    {
                        col.push(i);
                    }
                }
                return col;
            },
            readOnly: true
        },
        
        /**
         * Method used for formatting a label.
         *
         * @attribute labelFunction
         * @type Function
         * @param {String} val label to be formatted.
         * @param {Object} format temlate for formatting a label.
         * @return String
         */
        labelFunction: {
            value: function(val, format)
            {
                return val;
            }
        }
    }
});
/**
 * NumericAxis manages numeric data on an axis.
 *
 * @param {Object} config (optional) Configuration parameters for the Chart.
 * @class NumericAxis
 * @constructor
 * @extends AxisType
 */
function NumericAxis(config)
{
	NumericAxis.superclass.constructor.apply(this, arguments);
}

NumericAxis.NAME = "numericAxis";

NumericAxis.ATTRS = {
    /**
     * Indicates whether 0 should always be displayed.
     *
     * @attribute alwaysShowZero
     * @type Boolean
     */
	alwaysShowZero: {
	    value: true	
	},
    
    /**
     * Formats a label.
     *
     * @attribute labelFunction
     * @type Function
     * @param {Object} val Value to be formatted. 
     * @param {Object} format Hasho of properties used to format the label.
     */
    labelFunction: { 
        value: function(val, format)
        {
            if(format)
            {
                return Y.DataType.Number.format(val, format);
            }
            return val;
        }
    },

    /**
     * Hash of properties used by the <code>labelFunction</code> to format a
     * label.
     *
     * @attribute labelFormat
     * @type Object
     */
    labelFormat: {
        value: {
            prefix: "",
            thousandsSeparator: "",
            decimalSeparator: "",
            decimalPlaces: "0",
            suffix: ""
        }
    }
};

Y.extend(NumericAxis, Y.AxisType,
{
    /**
     * @private
     */
    _type: "numeric",

    /**
     * Returns a value based of a key value and an index.
     *
     * @method getKeyValueAt
     * @param {String} key value used to look up the correct array
     * @param {Number} index within the array
     * @return Object
     */
    getKeyValueAt: function(key, index)
    {
        var value = NaN,
            keys = this.get("keys");
        if(keys[key] && Y.Lang.isNumber(parseFloat(keys[key][index])))
        {
            value = keys[key][index];
        }
        return value;
    },

    /**
     * @private
     */
    _getMinimumUnit:function(max, min, units)
    {
        return this._getNiceNumber(Math.ceil((max - min)/units));
    },

    /**
     * @private
     */
    _getNiceNumber: function(roundingUnit)
    {
        var tempMajorUnit = roundingUnit,
            order = Math.ceil(Math.log(tempMajorUnit) * 0.4342944819032518),
            roundedMajorUnit = Math.pow(10, order),
            roundedDiff;

        if (roundedMajorUnit / 2 >= tempMajorUnit) 
        {
            roundedDiff = Math.floor((roundedMajorUnit / 2 - tempMajorUnit) / (Math.pow(10,order-1)/2));
            tempMajorUnit = roundedMajorUnit/2 - roundedDiff*Math.pow(10,order-1)/2;
        }
        else 
        {
            tempMajorUnit = roundedMajorUnit;
        }
        if(!isNaN(tempMajorUnit))
        {
            return tempMajorUnit;
        }
        return roundingUnit;

    },

    /**
     * @private
     */
    _updateMinAndMax: function()
    {
        var data = this.get("data"),
            max = 0,
            min = 0,
            len,
            num,
            i,
            key,
            setMax = this.get("setMax"),
            setMin = this.get("setMin");
        if(!setMax && !setMin)
        {
            if(data && data.length && data.length > 0)
            {
                len = data.length;
                max = min = data[0];
                if(len > 1)
                {
                    for(i = 1; i < len; i++)
                    {	
                        num = data[i];
                        if(isNaN(num))
                        {
                            if(Y.Lang.isObject(num))
                            {
                                min = max = 0;
                                //hloc values
                                for(key in num)
                                {
                                   if(num.hasOwnProperty(key))
                                   {
                                        max = Math.max(num[key], max);
                                        min = Math.min(num[key], min);
                                   }
                                }
                            }
                            max = setMax ? this._setMaximum : max;
                            min = setMin ? this._setMinimum : min;
                            continue;
                        }
                        max = setMax ? this._setMaximum : Math.max(num, max);
                        min = setMin ? this._setMinimum : Math.min(num, min);
                    }
                }
            }
            this._roundMinAndMax(min, max);
        }
    },

    /**
     * @private
     */
    _roundMinAndMax: function(min, max)
    {
        var roundingUnit,
            minimumRange,
            minGreaterThanZero = min >= 0,
            maxGreaterThanZero = max > 0,
            dataRangeGreater,
            maxRound,
            minRound,
            topTicks,
            botTicks,
            tempMax,
            tempMin,
            units = this.getTotalMajorUnits() - 1,
            alwaysShowZero = this.get("alwaysShowZero"),
            roundingMethod = this.get("roundingMethod"),
            useIntegers = (max - min)/units >= 1;
        if(roundingMethod)
        {
            if(roundingMethod == "niceNumber")
            {
                roundingUnit = this._getMinimumUnit(max, min, units);
                if(minGreaterThanZero && maxGreaterThanZero)
                {
                    if(alwaysShowZero || min < roundingUnit)
                    {
                        min = 0;
                    }
                    roundingUnit = this._getMinimumUnit(max, min, units);
                    max = this._roundUpToNearest(max, roundingUnit);
                }
                else if(maxGreaterThanZero && !minGreaterThanZero)
                {
                        topTicks = Math.round( units / ((-1 * min)/max + 1)    );
                        topTicks = Math.max(Math.min(topTicks, units - 1), 1);
                        botTicks = units - topTicks;
                        tempMax = Math.ceil( max/topTicks );

                        tempMin = Math.floor( min/botTicks ) * -1;
                        
                        roundingUnit = Math.max(tempMax, tempMin);
                        roundingUnit = this._getNiceNumber(roundingUnit);  
                        max = roundingUnit * topTicks;
                        min = roundingUnit * botTicks * -1;
                }
                else
                {
                    if(alwaysShowZero || max === 0 || max + roundingUnit > 0)
                    {
                        max = 0;
                        roundingUnit = this._getMinimumUnit(max, min, units);
                    }
                    else
                    {
                        max = this._roundUpToNearest(max, roundingUnit);
                    }
                    min = max - (roundingUnit * units);
                }
            }
            else if(roundingMethod == "auto") 
            {
                if(minGreaterThanZero && maxGreaterThanZero)
                {
                    if(alwaysShowZero || min < (max-min)/units)
                    {
                        min = 0;
                    }
                
                    roundingUnit = (max - min)/units;
                    if(useIntegers)
                    {
                        roundingUnit = Math.ceil(roundingUnit);
                    }
                    max = min + (roundingUnit * units);
                }
                else if(maxGreaterThanZero && !minGreaterThanZero)
                {
                    if(alwaysShowZero)
                    {
                        topTicks = Math.round( units / ( (-1 * min) /max + 1) );
                        topTicks = Math.max(Math.min(topTicks, units - 1), 1);
                        botTicks = units - topTicks;

                        if(useIntegers)
                        {
                            tempMax = Math.ceil( max/topTicks );
                            tempMin = Math.floor( min/botTicks ) * -1;
                        }
                        else
                        {
                            tempMax = max/topTicks;
                            tempMin = min/botTicks * -1;
                        }
                        roundingUnit = Math.max(tempMax, tempMin);
                        max = roundingUnit * topTicks;
                        min = roundingUnit * botTicks * -1;
                    }
                    else
                    {
                        roundingUnit = (max - min)/units;
                        if(useIntegers)
                        {
                            roundingUnit = Math.ceil(roundingUnit);
                        }
                        min = this._roundDownToNearest(min, roundingUnit);
                        max = this._roundUpToNearest(max, roundingUnit);
                    }
                }
                else
                {
                    roundingUnit = (max - min)/units;
                    if(useIntegers)
                    {   
                        roundingUnit = Math.ceil(roundingUnit);
                    }
                    if(alwaysShowZero || max === 0 || max + roundingUnit > 0)
                    {
                        max = 0;
                        roundingUnit = (max - min)/units;
                        if(useIntegers)
                        {
                            Math.ceil(roundingUnit);
                        }
                    }
                    else
                    {
                        max = this._roundUpToNearest(max, roundingUnit);
                    }
                    min = max - (roundingUnit * units);

                }
            }
            else if(!isNaN(roundingMethod) && isFinite(roundingMethod))
            {
                roundingUnit = roundingMethod;
                minimumRange = roundingUnit * units;
                dataRangeGreater = (max - min) > minimumRange;
                minRound = this._roundDownToNearest(min, roundingUnit);
                maxRound = this._roundUpToNearest(max, roundingUnit);
                if(minGreaterThanZero && maxGreaterThanZero)
                {
                    if(alwaysShowZero || minRound <= 0)
                    {
                        min = 0;
                    }
                    else
                    {
                        min = minRound;
                    }
                    if(!dataRangeGreater)
                    {
                        max = min + minimumRange;
                    }
                    else
                    {
                        max = maxRound;
                    }
                }
                else if(maxGreaterThanZero && !minGreaterThanZero)
                {
                    min = minRound;
                    if(!dataRangeGreater)
                    {
                        max = min + minimumRange;
                    }
                    else
                    {
                        max = maxRound;
                    }
                }
                else
                {
                    if(max === 0 || alwaysShowZero)
                    {
                        max = 0;
                    }
                    else
                    {
                        max = maxRound;
                    }
                    if(!dataRangeGreater)
                    {
                        min = max - minimumRange;
                    }
                    else
                    {
                        min = minRound;
                    }
                }
            }
        }
        this._dataMaximum = max;
        this._dataMinimum = min;
    },

    /**
     * Calculates and returns a value based on the number of labels and the index of
     * the current label.
     *
     * @method getLabelByIndex
     * @param {Number} i Index of the label.
     * @param {Number} l Total number of labels.
     * @return String
     */
    getLabelByIndex: function(i, l)
    {
        var min = this.get("minimum"),
            max = this.get("maximum"),
            increm = (max - min)/(l-1),
            label;
            l -= 1;
        label = min + (i * increm);
        if(i > 0)
        {
            label = this._roundToNearest(label, increm);
        }
        return label;
    },

    /**
     * @private
     *
     * Rounds a Number to the nearest multiple of an input. For example, by rounding
     * 16 to the nearest 10, you will receive 20. Similar to the built-in function Math.round().
     */
    _roundToNearest: function(number, nearest)
    {
        nearest = nearest || 1;
        if(nearest === 0)
        {
            return number;
        }
        var roundedNumber = Math.round(this._roundToPrecision(number / nearest, 10)) * nearest;
        return this._roundToPrecision(roundedNumber, 10);
    },
	
    /**
     * @private
     *
     * Rounds a Number <em>up</em> to the nearest multiple of an input. For example, by rounding
     * 16 up to the nearest 10, you will receive 20. Similar to the built-in function Math.ceil().
     */
    _roundUpToNearest: function(number, nearest)
    {
        nearest = nearest || 1;
        if(nearest === 0)
        {
            return number;
        }
        return Math.ceil(this._roundToPrecision(number / nearest, 10)) * nearest;
    },
	
    /**
     * @private
     *
     * Rounds a Number <em>down</em> to the nearest multiple of an input. For example, by rounding
     * 16 down to the nearest 10, you will receive 10. Similar to the built-in function Math.floor().
     */
    _roundDownToNearest: function(number, nearest)
    {
        nearest = nearest || 1;
        if(nearest === 0)
        {
            return number;
        }
        return Math.floor(this._roundToPrecision(number / nearest, 10)) * nearest;
    },

    /**
     * @private
     *
     * Rounds a number to a certain level of precision. Useful for limiting the number of
     * decimal places on a fractional number.
     */
    _roundToPrecision: function(number, precision)
    {
        precision = precision || 0;
        var decimalPlaces = Math.pow(10, precision);
        return Math.round(decimalPlaces * number) / decimalPlaces;
    }
});

Y.NumericAxis = NumericAxis;
		
/**
 * StackedAxis manages stacked numeric data on an axis.
 *
 * @param {Object} config (optional) Configuration parameters for the Chart.
 * @class StackedAxis
 * @constructor
 * @extends NumericAxis
 */
function StackedAxis(config)
{
	StackedAxis.superclass.constructor.apply(this, arguments);
}

StackedAxis.NAME = "stackedAxis";


Y.extend(StackedAxis, Y.NumericAxis,
{
    /**
     * @private
     */
    _updateMinAndMax: function()
    {
        var max = 0,
            min = 0,
            pos = 0,
            neg = 0,
            len = 0,
            i = 0,
            key,
            num,
            keys = this.get("keys");

        for(key in keys)
        {
            if(keys.hasOwnProperty(key))
            {
                len = Math.max(len, keys[key].length);
            }
        }
        for(; i < len; ++i)
        {
            pos = 0;
            neg = 0;
            for(key in keys)
            {
                if(keys.hasOwnProperty(key))
                {
                    num = keys[key][i];
                    if(isNaN(num))
                    {
                        continue;
                    }
                    if(num >= 0)
                    {
                        pos += num;
                    }
                    else
                    {
                        neg += num;
                    }
                }
            }
            if(pos > 0)
            {
                max = Math.max(max, pos);
            }
            else 
            {
                max = Math.max(max, neg);
            }
            if(neg < 0)
            {
                min = Math.min(min, neg);
            }
            else
            {
                min = Math.min(min, pos);
            }
        }
        this._roundMinAndMax(min, max);
    }
});

Y.StackedAxis = StackedAxis;
		
/**
 * TimeAxis manages time data on an axis.
 *
 * @param {Object} config (optional) Configuration parameters for the Chart.
 * @class TimeAxis
 * @constructor
 * @extends AxisType
 */
function TimeAxis(config)
{
	TimeAxis.superclass.constructor.apply(this, arguments);
}

TimeAxis.NAME = "timeAxis";

TimeAxis.ATTRS = 
{
    /**
     * @private
     */
    setMax: {
        readOnly: true,

        getter: function()
        {
            var max = this._getNumber(this._setMaximum);
            return (Y.Lang.isNumber(max));
        }
    },

    /**
     * @private
     */
    setMin: {
        readOnly: true,

        getter: function()
        {
            var min = this._getNumber(this._setMinimum);
            return (Y.Lang.isNumber(min));
        }
    },

    /**
     * The maximum value that will appear on an axis.
     *
     * @attribute maximum
     * @type Number
     */
    maximum: {
        getter: function ()
        {
            var max = this._getNumber(this._setMaximum);
            if(!Y.Lang.isNumber(max))
            {
                max = this._getNumber(this.get("dataMaximum"));
            }
            return max;
        },
        setter: function (value)
        {
            this._setMaximum = this._getNumber(value);
            return value;
        }
    },

    /**
     * The minimum value that will appear on an axis.
     *
     * @attribute minimum
     * @type Number
     */
    minimum: {
        getter: function ()
        {
            var min = this._getNumber(this._setMinimum);
            if(!Y.Lang.isNumber(min)) 
            {
                min = this._getNumber(this.get("dataMinimum"));
            }
                return min;
        },
        setter: function (value)
        {
            this._setMinimum = this._getNumber(value);
            return value;
        }
    },

    /**
     * Formats a label.
     *
     * @attribute labelFunction
     * @type Function
     * @param {Object} val Value to be formatted. 
     * @param {String} format Pattern used to format label.
     */
    labelFunction: {
        value: function(val, format)
        {
            val = Y.DataType.Date.parse(val);
            if(format)
            {
                return Y.DataType.Date.format(val, {format:format});
            }
            return val;
        }
    },

    /**
     * Pattern used by the <code>labelFunction</code> to format a label.
     *
     * @attribute labelFormat
     * @type String
     */
    labelFormat: {
        value: "%b %d, %y"
    }
};

Y.extend(TimeAxis, Y.AxisType, {
    /**
     * Constant used to generate unique id.
     *
     * @property GUID
     * @type String
     * @private
     */
    GUID: "yuitimeaxis",
	
    /**
     * @private
     */
    _dataType: "time",
	
    /**
     * Calculates and returns a value based on the number of labels and the index of
     * the current label.
     *
     * @method getLabelByIndex
     * @param {Number} i Index of the label.
     * @param {Number} l Total number of labels.
     * @return String
     */
    getLabelByIndex: function(i, l)
    {
        var min = this.get("minimum"),
            max = this.get("maximum"),
            position = this.get("position"),
            increm,
            label;
            l -= 1;
        increm = ((max - min)/l) * i;
        if(position == "bottom" || position == "top")
        {
            label = min + increm;
        }
        else
        {
            label = max - increm;
        }
        return label;
    },

    /**
     * @private
     */
    _getKeyArray: function(key, data)
    {
        var obj,
            keyArray = [],
            i = 0,
            val,
            len = data.length;
        for(; i < len; ++i)
        {
            obj = data[i][key];
            if(Y.Lang.isDate(obj))
            {   
                val = obj.valueOf();
            }
            else
            {
                val = new Date(obj);
                if(Y.Lang.isDate(val))
                {
                    val = val.valueOf();
                }
                else if(!Y.Lang.isNumber(obj))
                {
                    if(Y.Lang.isNumber(parseFloat(obj)))
                    {
                        val = parseFloat(obj);
                    }
                    else
                    {
                        if(typeof obj != "string")
                        {
                            obj = obj.toString();
                        }
                        val = new Date(obj).valueOf();
                    }
                }
                else
                {
                    val = obj;
                }
            }
            keyArray[i] = val;
        }
        return keyArray;
    },

    /**
     * @private (override)
     */
    _setDataByKey: function(key, data)
    {
        var obj, 
            arr = [], 
            dv = this._dataClone.concat(), 
            i, 
            val,
            len = dv.length;
        for(i = 0; i < len; ++i)
        {
            obj = dv[i][key];
            if(Y.Lang.isDate(obj))
            {   
                val = obj.valueOf();
            }
            else
            {
                val = new Date(obj);
                if(Y.Lang.isDate(val))
                {
                    val = val.valueOf();
                }
                else if(!Y.Lang.isNumber(obj))
                {
                    if(Y.Lang.isNumber(parseFloat(obj)))
                    {
                        val = parseFloat(obj);
                    }
                    else
                    {
                        if(typeof obj != "string")
                        {
                            obj = obj.toString();
                        }
                        val = new Date(obj).valueOf();
                    }
                }
                else
                {
                    val = obj;
                }
            }
            arr[i] = val;
        }
        this.get("keys")[key] = arr;
        this._updateTotalDataFlag = true;
    },

    /**
     * @private
     */
    _getNumber: function(val)
    {
        if(Y.Lang.isDate(val))
        {
            val = val.valueOf();
        }
        else if(!Y.Lang.isNumber(val) && val)
        {
            val = new Date(val).valueOf();
        }

        return val;
    }
});

Y.TimeAxis = TimeAxis;
		
/**
 * CategoryAxis manages category data on an axis.
 *
 * @param {Object} config (optional) Configuration parameters for the Chart.
 * @class CategoryAxis
 * @constructor
 * @extends AxisType
 */
function CategoryAxis(config)
{
	CategoryAxis.superclass.constructor.apply(this, arguments);
}

CategoryAxis.NAME = "categoryAxis";

Y.extend(CategoryAxis, Y.AxisType,
{
    /**
     * @private
     */
    _indices: null,

    /**
     * @private
     */
    GUID: "yuicategoryaxis",

    /**
     * @private
     */
    _type: "category",
        
    /**
     * @private
     */
    _updateMinAndMax: function()
    {
        this._dataMaximum = Math.max(this.get("data").length - 1, 0);
        this._dataMinimum = 0;
    },

    /**
     * @private
     */
    _getKeyArray: function(key, data)
    {
        var i = 0,
            obj,
            keyArr = [],
            labels = [],
            len = data.length;
        if(!this._indices)
        {
            this._indices = {};
        }
        for(; i < len; ++i)
        {
            obj = data[i];
            keyArr[i] = i;
            labels[i] = obj[key];
        }
        this._indices[key] = keyArr;
        return labels;
    },

    /**
     * @private
     */
    _setDataByKey: function(key)
    {
        var i,
            obj, 
            arr = [], 
            labels = [], 
            dv = this._dataClone.concat(), 
            len = dv.length;
        if(!this._indices)
        {
            this._indices = {};
        }
        for(i = 0; i < len; ++i)
        {
            obj = dv[i];
            arr[i] = i;
            labels[i] = obj[key];
        }
        this._indices[key] = arr;
        this.get("keys")[key] = labels.concat();
        this._updateTotalDataFlag = true;
    },

    /**
     * Returns an array of values based on an identifier key.
     *
     * @method getDataByKey
     * @param {String} value value used to identify the array
     * @return Array
     */
    getDataByKey: function (value)
    {
        if(!this._indices)
        {
            this.get("keys");
        }
        var keys = this._indices;
        if(keys[value])
        {
            return keys[value];
        }
        return null;
    },

    /**
     * Returns the total number of majorUnits that will appear on an axis.
     *
     * @method getTotalMajorUnits
     * @return Number
     */
    getTotalMajorUnits: function(majorUnit, len)
    {
        return this.get("data").length;
    },
    
    /**
     * Returns the distance between major units on an axis.
     *
     * @method getMajorUnitDistance
     * @param {Number} len Number of ticks
     * @param {Number} uiLen Size of the axis.
     * @param {Object} majorUnit Hash of properties used to determine the majorUnit
     * @return Number
     */
    getMajorUnitDistance: function(len, uiLen, majorUnit)
    {
        var dist;
        if(majorUnit.determinant === "count")
        {
            dist = uiLen/len;
        }
        else if(majorUnit.determinant === "distance")
        {
            dist = majorUnit.distance;
        }
        return dist;
    },
   
    /**
     * Gets the distance that the first and last ticks are offset from there respective
     * edges.
     *
     * @method getEdgeOffset
     * @param {Number} ct Number of ticks on the axis.
     * @param {Number} l Length (in pixels) of the axis.
     * @return Number
     */
    getEdgeOffset: function(ct, l)
    {
        return l/ct;
    },
   
    /**
     * Calculates and returns a value based on the number of labels and the index of
     * the current label.
     *
     * @method getLabelByIndex
     * @param {Number} i Index of the label.
     * @param {Number} l Total number of labels.
     * @return String
     */
    getLabelByIndex: function(i, l)
    {
        var label,
            data = this.get("data"),
            position = this.get("position");
        if(position == "bottom" || position == "top")
        {
            label = data[i];
        }
        else
        {
            label = data[l - (i + 1)];
        }   
        return label;
    }
});

Y.CategoryAxis = CategoryAxis;
		
/**
 * Utility class used for calculating curve points.
 *
 * @class CurveUtil
 * @constructor
 */
function CurveUtil()
{
}

CurveUtil.prototype = {
    /**
     * Creates an array of start, end and control points for splines.
     *
     * @protected
     * @param {Array} xcoords Collection of x-coordinates used for calculate the curves
     * @param {Array} ycoords Collection of y-coordinates used for calculate the curves
     * @return {Object}
     */
    getCurveControlPoints: function(xcoords, ycoords) 
    {
		var outpoints = [],
            i = 1,
            l = xcoords.length - 1,
		    xvals = [],
		    yvals = [];
		
		
		// Too few points, need at least two
		if (l < 1) 
        {
			return null;
		} 
        
        outpoints[0] = {
            startx: xcoords[0], 
            starty: ycoords[0],
            endx: xcoords[1],
            endy: ycoords[1]
        };
        
		// Special case, the Bezier should be a straight line
        if (l === 1) 
        {
			outpoints[0].ctrlx1 = (2.0*xcoords[0] + xcoords[1])/3.0;  
			outpoints[0].ctrly2 = (2.0*ycoords[0] + ycoords[1])/3.0;
			outpoints[0].ctrlx2 = 2.0*outpoints[0].ctrlx1 - xcoords[0];
            outpoints[0].ctrly2 = 2.0*outpoints[0].ctrly1 - ycoords[0];
            return outpoints;
		}

		for (; i < l; ++i) 
        {
			outpoints.push({startx: Math.round(xcoords[i]), starty: Math.round(ycoords[i]), endx: Math.round(xcoords[i+1]), endy: Math.round(ycoords[i+1])});
			xvals[i] = 4.0 * xcoords[i] + 2*xcoords[i+1];
			yvals[i] = 4.0*ycoords[i] + 2*ycoords[i+1];
		}
		
		xvals[0] = xcoords[0] + (2.0 * xcoords[1]);
		xvals[l-1] = (8.0 * xcoords[l-1] + xcoords[l]) / 2.0;
		xvals = this.getControlPoints(xvals.concat());
        yvals[0] = ycoords[0] + (2.0 * ycoords[1]);
		yvals[l-1] = (8.0 * ycoords[l-1] + ycoords[l]) / 2.0;	
		yvals = this.getControlPoints(yvals.concat());
		
        for (i = 0; i < l; ++i) 
        {
			outpoints[i].ctrlx1 = Math.round(xvals[i]);
            outpoints[i].ctrly1 = Math.round(yvals[i]);
			
			if (i < l-1) 
            {
				outpoints[i].ctrlx2 = Math.round(2*xcoords[i+1] - xvals[i+1]);
                outpoints[i].ctrly2 = Math.round(2*ycoords[i+1] - yvals[i+1]);
			}
			else 
            {
				outpoints[i].ctrlx2 = Math.round((xcoords[l] + xvals[l-1])/2);
                outpoints[i].ctrly2 = Math.round((ycoords[l] + yvals[l-1])/2);
			}
		}
		
		return outpoints;	
	},

    /**
     * @private
     */
	getControlPoints: function(vals) 
    {
		var l = vals.length,
            x = [],
            tmp = [],
            b = 2.0,
            i = 1;
		x[0] = vals[0] / b;
		for (; i < l; ++i) 
        {
			tmp[i] = 1/b;
			b = (i < l-1 ? 4.0 : 3.5) - tmp[i];
			x[i] = (vals[i] - x[i-1]) / b;
		}
		
		for (i = 1; i < l; ++i) 
        {
			x[l-i-1] -= tmp[l-i] * x[l-i];
		}
		
		return x;
	}
};
Y.CurveUtil = CurveUtil;
/**
 * Utility class used for creating stacked series.
 *
 * @class StackingUtil
 * @constructor
 */
function StackingUtil(){}

StackingUtil.prototype = {
    /**
     * @protected
     *
     * Adjusts coordinate values for stacked series.
     *
     * @method _stackCoordinates
     */
    _stackCoordinates: function() 
    {
        var direction = this.get("direction"),
            order = this.get("order"),
            type = this.get("type"),
            graph = this.get("graph"),
            h = graph.get("height"), 
            seriesCollection = graph.seriesTypes[type],
            i = 0,
            len,
            xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            prevXCoords,
            prevYCoords;
        if(order === 0)
        {
            return;
        }
        prevXCoords = seriesCollection[order - 1].get("xcoords").concat();
        prevYCoords = seriesCollection[order - 1].get("ycoords").concat();
        if(direction === "vertical")
        {
            len = prevXCoords.length;
            for(; i < len; ++i)
            {
                if(!isNaN(prevXCoords[i]) && !isNaN(xcoords[i]))
                {
                    xcoords[i] += prevXCoords[i];
                }
            }
        }
        else
        {
            len = prevYCoords.length;
            for(; i < len; ++i)
            {
                if(!isNaN(prevYCoords[i]) && !isNaN(ycoords[i]))
                {
                    ycoords[i] = prevYCoords[i] - (h - ycoords[i]);
                }
            }
        }
    }
};
Y.StackingUtil = StackingUtil;
/**
 * Utility class used for drawing lines.
 *
 * @class Lines
 * @constructor
 */
function Lines(){}

Lines.prototype = {
    /**
     * @private
     */
    _lineDefaults: null,
    
    /**
     * Creates a graphic in which to draw a series.
     *
     * @method _getGraphic
     * @return Graphic
     * @private
     */
    _getGraphic: function()
    {
        var graphic = this.get("graphic") || this.get("graph").get("graphic");
        if(!this._lineGraphic)
        {
            this._lineGraphic = graphic.getShape({type: "path"});
        }
        this._lineGraphic.clear();
        return this._lineGraphic;
    },
    
    /**
     * Toggles visibility
     *
     * @method _toggleVisible
     * @param {Boolean} visible indicates visibilitye
     * @private
     */
    _toggleVisible: function(visible)
    {
        if(this._lineGraphic)
        {
            this._lineGraphic.set("visible", visible);
        }
    },

    /**
     * Draws lines for the series.
     *
     * @method drawLines
     * @protected
     */
    drawLines: function()
    {
        if(this.get("xcoords").length < 1) 
        {
            return;
        }
        var isNumber = Y.Lang.isNumber,
            xcoords = this.get("xcoords").concat(),
            ycoords = this.get("ycoords").concat(),
            direction = this.get("direction"),
            len = direction === "vertical" ? ycoords.length : xcoords.length,
            lastPointValid,
            pointValid,
            noPointsRendered = true,
            lastValidX,
            lastValidY,
            nextX,
            nextY,
            i,
            styles = this.get("styles").line,
            lineType = styles.lineType,
            lc = styles.color || this._getDefaultColor(this.get("graphOrder"), "line"),
            lineAlpha = styles.alpha,
            dashLength = styles.dashLength,
            gapSpace = styles.gapSpace,
            connectDiscontinuousPoints = styles.connectDiscontinuousPoints,
            discontinuousType = styles.discontinuousType,
            discontinuousDashLength = styles.discontinuousDashLength,
            discontinuousGapSpace = styles.discontinuousGapSpace,
            path = this._getGraphic();
        path.set("stroke", {
            weight: styles.weight, 
            color: lc, 
            opacity: lineAlpha
        });
        for(i = 0; i < len; i = ++i)
        {
            nextX = xcoords[i];
            nextY = ycoords[i];
            pointValid = isNumber(nextX) && isNumber(nextY); 
            if(!pointValid)
            {
                lastPointValid = pointValid;
                continue;
            }
            if(noPointsRendered)
            {
                noPointsRendered = false;
                path.moveTo(nextX, nextY);
            }
            else if(lastPointValid)
            {
                if(lineType != "dashed")
                {
                    path.lineTo(nextX, nextY);
                }
                else
                {
                    this.drawDashedLine(lastValidX, lastValidY, nextX, nextY, 
                                                dashLength, 
                                                gapSpace);
                }
            }
            else if(!connectDiscontinuousPoints)
            {
                path.moveTo(nextX, nextY);
            }
            else
            {
                if(discontinuousType != "solid")
                {
                    this.drawDashedLine(lastValidX, lastValidY, nextX, nextY, 
                                                discontinuousDashLength, 
                                                discontinuousGapSpace);
                }
                else
                {
                    path.lineTo(nextX, nextY);
                }
            }
            lastValidX = nextX;
            lastValidY = nextY;
            lastPointValid = true;
        }
        path.end();
    },
    
    /**
     * Connects data points with a consistent curve for a series.
     * 
     * @method drawSpline
     * @protected
     */
    drawSpline: function()
    {
        if(this.get("xcoords").length < 1) 
        {
            return;
        }
        var xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            curvecoords = this.getCurveControlPoints(xcoords, ycoords),
            len = curvecoords.length,
            cx1,
            cx2,
            cy1,
            cy2,
            x,
            y,
            i = 0,
            styles = this.get("styles").line,
            path = this._getGraphic(),
            lineAlpha = styles.alpha,
            color = styles.color || this._getDefaultColor(this.get("graphOrder"), "line");
        path.set("stroke", { 
            weight: styles.weight, 
            color: color, 
            opacity: lineAlpha
        });
        path.moveTo(xcoords[0], ycoords[0]);
        for(; i < len; i = ++i)
        {
            x = curvecoords[i].endx;
            y = curvecoords[i].endy;
            cx1 = curvecoords[i].ctrlx1;
            cx2 = curvecoords[i].ctrlx2;
            cy1 = curvecoords[i].ctrly1;
            cy2 = curvecoords[i].ctrly2;
            path.curveTo(cx1, cy1, cx2, cy2, x, y);
        }
        path.end();
    },

    /**
     * Draws a dashed line between two points.
     * 
     * @method drawDashedLine
     * @param {Number} xStart	The x position of the start of the line
     * @param {Number} yStart	The y position of the start of the line
     * @param {Number} xEnd		The x position of the end of the line
     * @param {Number} yEnd		The y position of the end of the line
     * @param {Number} dashSize	the size of dashes, in pixels
     * @param {Number} gapSize	the size of gaps between dashes, in pixels
     * @private
     */
    drawDashedLine: function(xStart, yStart, xEnd, yEnd, dashSize, gapSize)
    {
        dashSize = dashSize || 10;
        gapSize = gapSize || 10;
        var segmentLength = dashSize + gapSize,
            xDelta = xEnd - xStart,
            yDelta = yEnd - yStart,
            delta = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2)),
            segmentCount = Math.floor(Math.abs(delta / segmentLength)),
            radians = Math.atan2(yDelta, xDelta),
            xCurrent = xStart,
            yCurrent = yStart,
            i,
            path = this._getGraphic();
        xDelta = Math.cos(radians) * segmentLength;
        yDelta = Math.sin(radians) * segmentLength;
        
        for(i = 0; i < segmentCount; ++i)
        {
            path.moveTo(xCurrent, yCurrent);
            path.lineTo(xCurrent + Math.cos(radians) * dashSize, yCurrent + Math.sin(radians) * dashSize);
            xCurrent += xDelta;
            yCurrent += yDelta;
        }
        
        path.moveTo(xCurrent, yCurrent);
        delta = Math.sqrt((xEnd - xCurrent) * (xEnd - xCurrent) + (yEnd - yCurrent) * (yEnd - yCurrent));
        
        if(delta > dashSize)
        {
            path.lineTo(xCurrent + Math.cos(radians) * dashSize, yCurrent + Math.sin(radians) * dashSize);
        }
        else if(delta > 0)
        {
            path.lineTo(xCurrent + Math.cos(radians) * delta, yCurrent + Math.sin(radians) * delta);
        }
        
        path.moveTo(xEnd, yEnd);
    },

    /**
     * Default values for <code>styles</code> attribute.
     *
     * @method _getLineDefaults
     * @return Object
     * @protected
     */
    _getLineDefaults: function()
    {
        return {
            alpha: 1,
            weight: 6,
            lineType:"solid", 
            dashLength:10, 
            gapSpace:10, 
            connectDiscontinuousPoints:true, 
            discontinuousType:"solid", 
            discontinuousDashLength:10, 
            discontinuousGapSpace:10
        };
    }
};
Y.augment(Lines, Y.Attribute);
Y.Lines = Lines;
/**
 * Utility class used for drawing area fills.
 *
 * @class Fills
 * @constructor
 */
function Fills(cfg)
{
    var attrs = {
        area: {
            getter: function()
            {
                return this._defaults || this._getAreaDefaults();
            },

            setter: function(val)
            {
                var defaults = this._defaults || this._getAreaDefaults();
                this._defaults = Y.merge(defaults, val);
            }
        }
    };
    this.addAttrs(attrs, cfg);
    this.get("styles");
}

Fills.prototype = {
    /**
     * Returns a path shape used for drawing fills.
     *
     * @method _getPath
     * @return Path
     * @private
     */
    _getPath: function()
    {
        var path = this._path;
        if(!path)
        {
            path = this.get("graph").get("graphic").getShape({type:"path"});
            this._path = path;
        }
        return path;
    },
    
    /**
     * Toggles visibility
     *
     * @method _toggleVisible
     * @param {Boolean} visible indicates visibilitye
     * @private
     */
    _toggleVisible: function(visible)
    {   
        if(this._path)
        {
            this._path.set("visible", visible);
        }
    },

    /**
     * Draws fill
     *
     * @method drawFill
     * @protected
     */
    drawFill: function(xcoords, ycoords)
    {
        if(xcoords.length < 1) 
        {
            return;
        }
        var len = xcoords.length,
            firstX = xcoords[0],
            firstY = ycoords[0],
            lastValidX = firstX,
            lastValidY = firstY,
            nextX,
            nextY,
            i = 1,
            styles = this.get("styles").area,
            path = this._getPath(),
            color = styles.color || this._getDefaultColor(this.get("graphOrder"), "slice");
        path.clear();
        path.set("fill", {
            color: color, 
            opacity: styles.alpha
        });
        path.set("stroke", {weight: 0});
        path.moveTo(firstX, firstY);
        for(; i < len; i = ++i)
        {
            nextX = xcoords[i];
            nextY = ycoords[i];
            if(isNaN(nextY))
            {
                lastValidX = nextX;
                lastValidY = nextY;
                continue;
            }
            path.lineTo(nextX, nextY);
            lastValidX = nextX;
            lastValidY = nextY;
        }
        path.end();
    },
	
    /**
     * Draws a fill for a spline
     *
     * @method drawAreaSpline
     * @protected
     */
    drawAreaSpline: function()
    {
        if(this.get("xcoords").length < 1) 
        {
            return;
        }
        var xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            curvecoords = this.getCurveControlPoints(xcoords, ycoords),
            len = curvecoords.length,
            cx1,
            cx2,
            cy1,
            cy2,
            x,
            y,
            i = 0,
            firstX = xcoords[0],
            firstY = ycoords[0],
            styles = this.get("styles").area,
            path = this._getPath(),
            color = styles.color || this._getDefaultColor(this.get("graphOrder"), "slice");
        path.set("fill", {
            color: color, 
            opacity: styles.alpha
        });
        path.set("stroke", {weight: 0});
        path.moveTo(firstX, firstY);
        for(; i < len; i = ++i)
        {
            x = curvecoords[i].endx;
            y = curvecoords[i].endy;
            cx1 = curvecoords[i].ctrlx1;
            cx2 = curvecoords[i].ctrlx2;
            cy1 = curvecoords[i].ctrly1;
            cy2 = curvecoords[i].ctrly2;
            path.curveTo(cx1, cy1, cx2, cy2, x, y);
        }
        if(this.get("direction") === "vertical")
        {
            path.lineTo(this._leftOrigin, y);
            path.lineTo(this._leftOrigin, firstY);
        }
        else
        {
            path.lineTo(x, this._bottomOrigin);
            path.lineTo(firstX, this._bottomOrigin);
        }
        path.lineTo(firstX, firstY);
        path.end();
    },
    
    /**
     * Draws a a stacked area spline
     *
     * @method drawStackedAreaSpline
     * @protected
     */
    drawStackedAreaSpline: function()
    {
        if(this.get("xcoords").length < 1) 
        {
            return;
        }
        var xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            curvecoords,
            order = this.get("order"),
            type = this.get("type"),
            graph = this.get("graph"),
            seriesCollection = graph.seriesTypes[type],
            prevXCoords,
            prevYCoords,
            len,
            cx1,
            cx2,
            cy1,
            cy2,
            x,
            y,
            i = 0,
            firstX,
            firstY,
            styles = this.get("styles").area,
            path = this._getPath(),
            color = styles.color || this._getDefaultColor(this.get("graphOrder"), "slice");
        firstX = xcoords[0];
        firstY = ycoords[0];
        curvecoords = this.getCurveControlPoints(xcoords, ycoords);
        len = curvecoords.length;
        path.set("fill", {
            color: color, 
            opacity: styles.alpha
        });
        path.set("stroke", {weight: 0});
        path.moveTo(firstX, firstY);
        for(; i < len; i = ++i)
        {
            x = curvecoords[i].endx;
            y = curvecoords[i].endy;
            cx1 = curvecoords[i].ctrlx1;
            cx2 = curvecoords[i].ctrlx2;
            cy1 = curvecoords[i].ctrly1;
            cy2 = curvecoords[i].ctrly2;
            path.curveTo(cx1, cy1, cx2, cy2, x, y);
        }
        if(order > 0)
        {
            prevXCoords = seriesCollection[order - 1].get("xcoords").concat().reverse();
            prevYCoords = seriesCollection[order - 1].get("ycoords").concat().reverse();
            curvecoords = this.getCurveControlPoints(prevXCoords, prevYCoords);
            i = 0;
            len = curvecoords.length;
            path.lineTo(prevXCoords[0], prevYCoords[0]);
            for(; i < len; i = ++i)
            {
                x = curvecoords[i].endx;
                y = curvecoords[i].endy;
                cx1 = curvecoords[i].ctrlx1;
                cx2 = curvecoords[i].ctrlx2;
                cy1 = curvecoords[i].ctrly1;
                cy2 = curvecoords[i].ctrly2;
                path.curveTo(cx1, cy1, cx2, cy2, x, y);
            }
        }
        else
        {
            if(this.get("direction") === "vertical")
            {
                path.lineTo(this._leftOrigin, ycoords[ycoords.length-1]);
                path.lineTo(this._leftOrigin, firstY);
            }
            else
            {
                path.lineTo(xcoords[xcoords.length-1], this._bottomOrigin);
                path.lineTo(firstX, this._bottomOrigin);
            }

        }
        path.lineTo(firstX, firstY);
        path.end();
    },
    
    /**
     * @private
     */
    _defaults: null,

    /**
     * Concatanates coordinate array with correct coordinates for closing an area fill.
     *
     * @method _getClosingPoints
     * @return Array
     * @protected
     */
    _getClosingPoints: function()
    {
        var xcoords = this.get("xcoords").concat(),
            ycoords = this.get("ycoords").concat();
        if(this.get("direction") === "vertical")
        {
            xcoords.push(this._leftOrigin);
            xcoords.push(this._leftOrigin);
            ycoords.push(ycoords[ycoords.length - 1]);
            ycoords.push(ycoords[0]);
        }
        else
        {
            xcoords.push(xcoords[xcoords.length - 1]);
            xcoords.push(xcoords[0]);
            ycoords.push(this._bottomOrigin);
            ycoords.push(this._bottomOrigin);
        }
        xcoords.push(xcoords[0]);
        ycoords.push(ycoords[0]);
        return [xcoords, ycoords];
    },

    /**
     * Concatenates coordinate array with the correct coordinates for closing an area stack.
     *
     * @method _getStackedClosingPoints
     * @return Array
     * @protected
     */
    _getStackedClosingPoints: function()
    {
        var order = this.get("order"),
            type = this.get("type"),
            graph = this.get("graph"),
            direction = this.get("direction"),
            seriesCollection = graph.seriesTypes[type],
            prevXCoords,
            prevYCoords,
            allXCoords = this.get("xcoords").concat(),
            allYCoords = this.get("ycoords").concat(),
            firstX = allXCoords[0],
            firstY = allYCoords[0];
        
        if(order > 0)
        {
            prevXCoords = seriesCollection[order - 1].get("xcoords").concat();
            prevYCoords = seriesCollection[order - 1].get("ycoords").concat();
            allXCoords = allXCoords.concat(prevXCoords.concat().reverse());
            allYCoords = allYCoords.concat(prevYCoords.concat().reverse());
            allXCoords.push(allXCoords[0]);
            allYCoords.push(allYCoords[0]);
        }
        else
        {
            if(direction === "vertical")
            {
                allXCoords.push(this._leftOrigin);
                allXCoords.push(this._leftOrigin);
                allYCoords.push(allYCoords[allYCoords.length-1]);
                allYCoords.push(firstY);
            }
            else
            {
                allXCoords.push(allXCoords[allXCoords.length-1]);
                allXCoords.push(firstX);
                allYCoords.push(this._bottomOrigin);
                allYCoords.push(this._bottomOrigin);
            }
        }
        return [allXCoords, allYCoords];
    },

    /**
     * @private
     */
    _getAreaDefaults: function()
    {
        return {
        };
    }
};
Y.augment(Fills, Y.Attribute);
Y.Fills = Fills;
/**
 * Utility class used for drawing markers.
 *
 * @class Plots
 * @constructor
 */
function Plots(cfg)
{
    var attrs = { 
        markers: {
            getter: function()
            {
                return this._markers;
            }
        }
    };
    this.addAttrs(attrs, cfg);
}

Plots.prototype = {
    /**
     * @private
     */
    _plotDefaults: null,

    /**
     * Draws the markers
     *
     * @method drawPlots
     * @protected
     */
    drawPlots: function()
    {
        if(!this.get("xcoords") || this.get("xcoords").length < 1) 
		{
			return;
		}
        var style = Y.clone(this.get("styles").marker),
            w = style.width,
            h = style.height,
            xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            i = 0,
            len = xcoords.length,
            top = ycoords[0],
            left,
            marker,
            offsetWidth = w/2,
            offsetHeight = h/2,
            fillColors = null,
            borderColors = null,
            graphOrder = this.get("graphOrder");
        if(Y.Lang.isArray(style.fill.color))
        {
            fillColors = style.fill.color.concat(); 
        }
        if(Y.Lang.isArray(style.border.color))
        {
            borderColors = style.border.colors.concat();
        }
        this._createMarkerCache();
        for(; i < len; ++i)
        {
            top = (ycoords[i] - offsetHeight);
            left = (xcoords[i] - offsetWidth);            
            if(!top || !left || top === undefined || left === undefined || top == "undefined" || left == "undefined" || isNaN(top) || isNaN(left))
            {
                this._markers.push(null);
                this._graphicNodes.push(null);
                continue;
            }
            if(fillColors)
            {
                style.fill.color = fillColors[i % fillColors.length];
            }
            if(borderColors)
            {
                style.border.colors = borderColors[i % borderColors.length];
            }

            style.x = left;
            style.y = top;
            marker = this.getMarker(style, graphOrder, i);
        }
        this._clearMarkerCache();
    },

    /**
     * Gets the default values for series that use the utility. This method is used by
     * the class' <code>styles</code> attribute's getter to get build default values.
     *
     * @method _getPlotDefaults
     * @return Object
     * @protected
     */
    _getPlotDefaults: function()
    {
        var defs = {
            fill:{
                type: "solid",
                alpha: 1,
                colors:null,
                alphas: null,
                ratios: null
            },
            border:{
                weight: 1,
                alpha: 1
            },
            width: 10,
            height: 10,
            shape: "circle"
        };
        defs.fill.color = this._getDefaultColor(this.get("graphOrder"), "fill");
        defs.border.color = this._getDefaultColor(this.get("graphOrder"), "border");
        return defs;
    },

    /**
     * Collection of markers to be used in the series.
     *
     * @private
     */
    _markers: null,

    /**
     * Collection of markers to be re-used on a series redraw.
     *
     * @private
     */
    _markerCache: null,
   
    /**
     * Gets and styles a marker. If there is a marker in cache, it will use it. Otherwise
     * it will create one.
     *
     * @method getMarker
     * @param {Object} styles Hash of style properties.
     * @param {Number} order Order of the series.
     * @param {Number} index Index within the series associated with the marker.
     * @return Shape
     * @protected
     */
    getMarker: function(styles, order, index)
    {
        var marker,
            border = styles.border;
        styles.id = "series_" + order + "_" + index;
        //fix name differences between graphic layer
        border.opacity = border.alpha;
        styles.stroke = border;
        styles.fill.opacity = styles.fill.alpha;
        if(this._markerCache.length > 0)
        {
            while(!marker)
            {
                if(this._markerCache.length < 1)
                {
                    marker = this._createMarker(styles, order, index);
                    break;
                }
                marker = this._markerCache.shift();

            }
            marker.set(styles);
        }
        else
        {
            marker = this._createMarker(styles, order, index);
        }
        this._markers.push(marker);
        this._graphicNodes.push(marker.parentNode);
        return marker;
    },   
    
    /**
     * Creates a shape to be used as a marker.
     *
     * @method _createMarker
     * @param {Object} styles Hash of style properties.
     * @param {Number} order Order of the series.
     * @param {Number} index Index within the series associated with the marker.
     * @return Shape
     * @private
     */
    _createMarker: function(styles, order, index)
    {
        var graphic = this.get("graphic"),
            marker,
            cfg = Y.clone(styles);
        graphic.set("autoDraw", false);
        cfg.type = cfg.shape;
        marker = graphic.getShape(cfg); 
        marker.addClass("yui3-seriesmarker");
        return marker;
    },
    
    /**
     * Creates a cache of markers for reuse.
     *
     * @method _createMarkerCache
     * @private
     */
    _createMarkerCache: function()
    {
        if(this._markers && this._markers.length > 0)
        {
            this._markerCache = this._markers.concat();
        }
        else
        {
            this._markerCache = [];
        }
        this._markers = [];
        this._graphicNodes = [];
    },
    
    /**
     * Toggles visibility
     *
     * @method _toggleVisible
     * @param {Boolean} visible indicates visibilitye
     * @private
     */
    _toggleVisible: function(visible)
    {
        var marker,
            markers = this.get("markers"),
            i = 0,
            len;
        if(markers)
        {
            len = markers.length;
            for(; i < len; ++i)
            {
                marker = markers[i];
                if(marker)
                {
                    marker.set("visible", visible);
                }
            }
        }
    },

    /**
     * Removes unused markers from the marker cache
     *
     * @method _clearMarkerCache
     * @private
     */
    _clearMarkerCache: function()
    {
        var len = this._markerCache.length,
            i = 0,
            marker;
        for(; i < len; ++i)
        {
            marker = this._markerCache[i];
            if(marker)
            {
                marker.destroy();
            }
        }
        this._markerCache = [];
    },

    /**
     * Resizes and positions markers based on a mouse interaction.
     *
     * @method updateMarkerState
     * @param {String} type state of the marker
     * @param {Number} i index of the marker
     * @protected
     */
    updateMarkerState: function(type, i)
    {
        if(this._markers[i])
        {
            var w,
                h,
                markerStyles,
                styles = Y.clone(this.get("styles").marker),
                state = this._getState(type),
                xcoords = this.get("xcoords"),
                ycoords = this.get("ycoords"),
                marker = this._markers[i],
                graphicNode = marker.parentNode;
                markerStyles = state == "off" || !styles[state] ? styles : styles[state]; 
                markerStyles.fill.color = this._getItemColor(markerStyles.fill.color, i);
                markerStyles.border.color = this._getItemColor(markerStyles.border.color, i);
                markerStyles.stroke = markerStyles.border;
                marker.set(markerStyles);
                w = markerStyles.width;
                h = markerStyles.height;
                marker.set("x", (xcoords[i] - w/2));
                marker.set("y",  (ycoords[i] - h/2));
                marker.set("visible", this.get("visible"));
        }
    },

    /**
     * Parses a color from an array.
     *
     * @method _getItemColor
     * @param {Array} val collection of colors
     * @param {Number} i index of the item
     * @return String
     * @protected
     */
    _getItemColor: function(val, i)
    {
        if(Y.Lang.isArray(val))
        {
            return val[i % val.length];
        }
        return val;
    },

    /**
     * Method used by <code>styles</code> setter. Overrides base implementation.
     *
     * @method _setStyles
     * @param {Object} newStyles Hash of properties to update.
     * @return Object
     * @protected
     */
    _setStyles: function(val)
    {
        val = this._parseMarkerStyles(val);
        return Y.Renderer.prototype._setStyles.apply(this, [val]);
    },

    /**
     * Combines new styles with existing styles.
     *
     * @method _parseMarkerStyles
     * @private
     */
    _parseMarkerStyles: function(val)
    {
        if(val.marker)
        {
            var defs = this._getPlotDefaults();
            val.marker = this._mergeStyles(val.marker, defs);
            if(val.marker.over)
            {
                val.marker.over = this._mergeStyles(val.marker.over, val.marker);
            }
            if(val.marker.down)
            {
                val.marker.down = this._mergeStyles(val.marker.down, val.marker);
            }
        }
        return val;
    },

    /**
     * Returns marker state based on event type
     *
     * @method _getState
     * @param {String} type event type
     * @return String
     * @protected
     */
    _getState: function(type)
    {
        var state;
        switch(type)
        {
            case "mouseout" :
                state = "off";
            break;
            case "mouseover" :
                state = "over";
            break;
            case "mouseup" :
                state = "over";
            break;
            case "mousedown" :
                state = "down";
            break;
        }
        return state;
    },
    
    /**
     * @private
     */
    _stateSyles: null
};

Y.augment(Plots, Y.Attribute);
Y.Plots = Plots;
/**
 * Histogram is the base class for Column and Bar series.
 *
 * @class Histogram
 * @constructor
 */
function Histogram(){}

Histogram.prototype = {
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        if(this.get("xcoords").length < 1) 
        {
            return;
        }
        var style = Y.clone(this.get("styles").marker),
            setSize,
            calculatedSize,
            xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            i = 0,
            len = xcoords.length,
            top = ycoords[0],
            type = this.get("type"),
            graph = this.get("graph"),
            seriesCollection = graph.seriesTypes[type],
            seriesLen = seriesCollection.length,
            seriesSize = 0,
            totalSize = 0,
            offset = 0,
            ratio,
            renderer,
            order = this.get("order"),
            graphOrder = this.get("graphOrder"),
            left,
            marker,
            setSizeKey,
            calculatedSizeKey,
            config,
            fillColors = null,
            borderColors = null;
        if(Y.Lang.isArray(style.fill.color))
        {
            fillColors = style.fill.color.concat(); 
        }
        if(Y.Lang.isArray(style.border.color))
        {
            borderColors = style.border.colors.concat();
        }
        if(this.get("direction") == "vertical")
        {
            setSizeKey = "height";
            calculatedSizeKey = "width";
        }
        else
        {
            setSizeKey = "width";
            calculatedSizeKey = "height";
        }
        setSize = style[setSizeKey];
        calculatedSize = style[calculatedSizeKey];
        this._createMarkerCache();
        for(; i < seriesLen; ++i)
        {
            renderer = seriesCollection[i];
            seriesSize += renderer.get("styles").marker[setSizeKey];
            if(order > i) 
            {
                offset = seriesSize;
            }
        }
        totalSize = len * seriesSize;
        if(totalSize > graph.get(setSizeKey))
        {
            ratio = graph.get(setSizeKey)/totalSize;
            seriesSize *= ratio;
            offset *= ratio;
            setSize *= ratio;
            setSize = Math.max(setSize, 1);
        }
        offset -= seriesSize/2;
        for(i = 0; i < len; ++i)
        {
            if(isNaN(xcoords[i]) || isNaN(ycoords[i]))
            {
                continue;
            }
            config = this._getMarkerDimensions(xcoords[i], ycoords[i], calculatedSize, offset);
            top = config.top;
            left = config.left;
            style[setSizeKey] = setSize;
            style[calculatedSizeKey] = config.calculatedSize;
            style.x = left;
            style.y = top;
            if(fillColors)
            {
                style.fill.color = fillColors[i % fillColors.length];
            }
            if(borderColors)
            {
                style.border.colors = borderColors[i % borderColors.length];
            }
            marker = this.getMarker(style, graphOrder, i);
        }
        this._clearMarkerCache();
    },
    
    /**
     * @private
     */
    _defaultFillColors: ["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"],
    
    /**
     * @private
     */
    _getPlotDefaults: function()
    {
        var defs = {
            fill:{
                type: "solid",
                alpha: 1,
                colors:null,
                alphas: null,
                ratios: null
            },
            border:{
                weight: 0,
                alpha: 1
            },
            width: 12,
            height: 12,
            shape: "rect",

            padding:{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        };
        defs.fill.color = this._getDefaultColor(this.get("graphOrder"), "fill");
        defs.border.color = this._getDefaultColor(this.get("graphOrder"), "border");
        return defs;
    }
};

Y.Histogram = Histogram;
/**
 * The CartesianSeries class creates a chart with horizontal and vertical axes.
 *
 * @class CartesianSeries
 * @extends Base
 * @uses Renderer
 * @constructor
 */
Y.CartesianSeries = Y.Base.create("cartesianSeries", Y.Base, [Y.Renderer], {
    /**
     * @private
     */
    _xDisplayName: null,

    /**
     * @private
     */
    _yDisplayName: null,
    
    /**
     * @private
     */
    _leftOrigin: null,

    /**
     * @private
     */
    _bottomOrigin: null,

    /**
     * @private
     */
    render: function()
    {
        this._setCanvas();
        this.addListeners();
        this.set("rendered", true);
        this.validate();
    },

    /**
     * @private
     */
    addListeners: function()
    {
        var xAxis = this.get("xAxis"),
            yAxis = this.get("yAxis");
        if(xAxis)
        {
            xAxis.after("dataReady", Y.bind(this._xDataChangeHandler, this));
            xAxis.after("dataUpdate", Y.bind(this._xDataChangeHandler, this));
        }
        if(yAxis)
        {
            yAxis.after("dataReady", Y.bind(this._yDataChangeHandler, this));
            yAxis.after("dataUpdate", Y.bind(this._yDataChangeHandler, this));
        }
        this.after("xAxisChange", this._xAxisChangeHandler);
        this.after("yAxisChange", this._yAxisChangeHandler);
        this.after("stylesChange", function(e) {
            var axesReady = this._updateAxisData();
            if(axesReady)
            {
                this.draw();
            }
        });
        this.after("widthChange", function(e) {
            var axesReady = this._updateAxisData();
            if(axesReady)
            {
                this.draw();
            }
        });
        this.after("heightChange", function(e) {
            var axesReady = this._updateAxisData();
            if(axesReady)
            {
                this.draw();
            }
        });
        this.after("visibleChange", this._handleVisibleChange);
    },
  
    /**
     * @private
     */
    _xAxisChangeHandler: function(e)
    {
        var xAxis = this.get("xAxis");
        xAxis.after("dataReady", Y.bind(this._xDataChangeHandler, this));
        xAxis.after("dataUpdate", Y.bind(this._xDataChangeHandler, this));
    },
    
    /**
     * @private
     */
    _yAxisChangeHandler: function(e)
    {
        var yAxis = this.get("yAxis");
        yAxis.after("dataReady", Y.bind(this._yDataChangeHandler, this));
        yAxis.after("dataUpdate", Y.bind(this._yDataChangeHandler, this));
    },

    /**
     * @private
     */
    GUID: "yuicartesianseries",

    /**
     * @private (protected)
     */
    _xDataChangeHandler: function(event)
    {
        var axesReady = this._updateAxisData();
        if(axesReady)
        {
            this.draw();
        }
    },

    /**
     * @private (protected)
     */
    _yDataChangeHandler: function(event)
    {
        var axesReady = this._updateAxisData();
        if(axesReady)
        {
            this.draw();
        }
    },

    /**
     * @private 
     */
    _updateAxisData: function()
    {
        var xAxis = this.get("xAxis"),
            yAxis = this.get("yAxis"),
            xKey = this.get("xKey"),
            yKey = this.get("yKey"),
            yData,
            xData;
        if(!xAxis || !yAxis || !xKey || !yKey)
        {
            return false;
        }
        xData = xAxis.getDataByKey(xKey);
        yData = yAxis.getDataByKey(yKey);
        if(!xData || !yData)
        {
            return false;
        }
        this.set("xData", xData.concat());
        this.set("yData", yData.concat());
        return true;
    },

    /**
     * @private
     */
    validate: function()
    {
        if((this.get("xData") && this.get("yData")) || this._updateAxisData())
        {
            this.draw();
        }
    },

    /**
     * @protected
     *
     * Creates a <code>Graphic</code> instance.
     *
     * @method _setCanvas
     */
    _setCanvas: function()
    {
        var graph = this.get("graph"),
            graphic = graph.get("graphic");
        this.set("graphic", graphic);
    },

    /**
     * @protected
     *
     * Calculates the coordinates for the series.
     *
     * @method setAreaData
     */
    setAreaData: function()
    {
        var isNumber = Y.Lang.isNumber,
            nextX, nextY,
            graph = this.get("graph"),
            w = graph.get("width"),
            h = graph.get("height"),
            xAxis = this.get("xAxis"),
            yAxis = this.get("yAxis"),
            xData = this.get("xData").concat(),
            yData = this.get("yData").concat(),
            xValue,
            yValue,
            xOffset = xAxis.getEdgeOffset(xData.length, w),
            yOffset = yAxis.getEdgeOffset(yData.length, h),
            padding = this.get("styles").padding,
			leftPadding = padding.left,
			topPadding = padding.top,
			dataWidth = w - (leftPadding + padding.right + xOffset),
			dataHeight = h - (topPadding + padding.bottom + yOffset),
			xcoords = [],
			ycoords = [],
			xMax = xAxis.get("maximum"),
			xMin = xAxis.get("minimum"),
			yMax = yAxis.get("maximum"),
			yMin = yAxis.get("minimum"),
            xScaleFactor = dataWidth / (xMax - xMin),
			yScaleFactor = dataHeight / (yMax - yMin),
            dataLength,
            direction = this.get("direction"),
            i = 0,
            xMarkerPlane = [],
            yMarkerPlane = [],
            xMarkerPlaneOffset = this.get("xMarkerPlaneOffset"),
            yMarkerPlaneOffset = this.get("yMarkerPlaneOffset"),
            graphic = this.get("graphic");
        graphic.set("width", w);
        graphic.set("height", h);
        dataLength = xData.length;
        xOffset *= 0.5;
        yOffset *= 0.5;
        //Assuming a vertical graph has a range/category for its vertical axis.    
        if(direction === "vertical")
        {
            yData = yData.reverse();
        }
        this._leftOrigin = Math.round(((0 - xMin) * xScaleFactor) + leftPadding + xOffset);
        this._bottomOrigin =  Math.round((dataHeight + topPadding + yOffset) - (0 - yMin) * yScaleFactor);
        for (; i < dataLength; ++i) 
		{
            xValue = parseFloat(xData[i]);
            yValue = parseFloat(yData[i]);
            if(isNumber(xValue))
            {
                nextX = Math.round((((xValue - xMin) * xScaleFactor) + leftPadding + xOffset));
            }
            else
            {
                nextX = NaN;
            }
            if(isNumber(yValue))
            {
			    nextY = Math.round(((dataHeight + topPadding + yOffset) - (yValue - yMin) * yScaleFactor));
            }
            else
            {
                nextY = NaN;
            }
            xcoords.push(nextX);
            ycoords.push(nextY);
            xMarkerPlane.push({start:nextX - xMarkerPlaneOffset, end: nextX + xMarkerPlaneOffset});
            yMarkerPlane.push({start:nextY - yMarkerPlaneOffset, end: nextY + yMarkerPlaneOffset});
        }
        this.set("xcoords", xcoords);
		this.set("ycoords", ycoords);
        this.set("xMarkerPlane", xMarkerPlane);
        this.set("yMarkerPlane", yMarkerPlane);
    },

    /**
     * @protected
     *
     * Draws the series.
     *
     * @method draw
     */
    draw: function()
    {
        var graph = this.get("graph"),
            w = graph.get("width"),
            h = graph.get("height");
        if(this.get("rendered"))
        {
            if((isFinite(w) && isFinite(h) && w > 0 && h > 0) && ((this.get("xData") && this.get("yData")) || this._updateAxisData()))
            {
                if(this._drawing)
                {
                    this._callLater = true;
                    return;
                }
                this._drawing = true;
                this._callLater = false;
                this.setAreaData();
                if(this.get("xcoords") && this.get("ycoords"))
                {
                    this.drawSeries();
                }
                this._drawing = false;
                if(this._callLater)
                {
                    this.draw();
                }
                else
                {
                    this._toggleVisible(this.get("visible"));
                    this.fire("drawingComplete");
                }
            }
        }
    },
    
    /**
     * @private
     */
    _defaultPlaneOffset: 4,
    
    /**
     * @protected
     *
     * Gets the default value for the <code>styles</code> attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     */
    _getDefaultStyles: function()
    {
        return {padding:{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }};
    },

    /**
     * @protected
     *
     * Collection of default colors used for lines in a series when not specified by user.
     *
     * @property _defaultLineColors
     * @type Array
     */
    _defaultLineColors:["#426ab3", "#d09b2c", "#000000", "#b82837", "#b384b5", "#ff7200", "#779de3", "#cbc8ba", "#7ed7a6", "#007a6c"],

    /**
     * @protected
     *
     * Collection of default colors used for marker fills in a series when not specified by user.
     *
     * @property _defaultFillColors
     * @type Array
     */
    _defaultFillColors:["#6084d0", "#eeb647", "#6c6b5f", "#d6484f", "#ce9ed1", "#ff9f3b", "#93b7ff", "#e0ddd0", "#94ecba", "#309687"],
    
    /**
     * @protected
     *
     * Collection of default colors used for marker borders in a series when not specified by user.
     *
     * @property _defaultBorderColors
     * @type Array
     */
    _defaultBorderColors:["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"],
    
    /**
     * @protected
     *
     * Collection of default colors used for area fills, histogram fills and pie fills in a series when not specified by user.
     *
     * @property _defaultSliceColors
     * @type Array
     */
    _defaultSliceColors: ["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"],

    /**
     * @protected
     *
     * Parses a color based on a series order and type.
     *
     * @method _getDefaultColor
     * @param {Number} index Index indicating the series order.
     * @param {String} type Indicates which type of object needs the color.
     * @return String
     */
    _getDefaultColor: function(index, type)
    {
        var colors = {
                line: this._defaultLineColors,
                fill: this._defaultFillColors,
                border: this._defaultBorderColors,
                slice: this._defaultSliceColors
            },
            col = colors[type],
            l = col.length;
        index = index || 0;
        if(index >= l)
        {
            index = index % l;
        }
        type = type || "fill";
        return colors[type][index];
    },
    
    /**
     * @protected
     *
     * Shows/hides contents of the series.
     *
     * @method _handleVisibleChange
     */
    _handleVisibleChange: function(e) 
    {
        this._toggleVisible(this.get("visible"));
    }
}, {
    ATTRS: {
        /**
         * Name used for for displaying data related to the x-coordinate.
         *
         * @attribute xDisplayName
         * @type String
         */
        xDisplayName: {
            getter: function()
            {
                return this._xDisplayName || this.get("xKey");
            },

            setter: function(val)
            {
                this._xDisplayName = val;
                return val;
            }
        },

        /**
         * Name used for for displaying data related to the y-coordinate.
         *
         * @attribute yDisplayName
         * @type String
         */
        yDisplayName: {
            getter: function()
            {
                return this._yDisplayName || this.get("yKey");
            },

            setter: function(val)
            {
                this._yDisplayName = val;
                return val;
            }
        },
        
        /**
         * Name used for for displaying category data
         *
         * @attribute categoryDisplayName
         * @type String
         */
        categoryDisplayName: {
            readOnly: true,

            getter: function()
            {
                return this.get("direction") == "vertical" ? this.get("yDisplayName") : this.get("xDisplayName");
            }
        },

        /**
         * Name used for for displaying value data
         *
         * @attribute valueDisplayName
         * @type String
         */
        valueDisplayName: {
            readOnly: true,

            getter: function()
            {
                return this.get("direction") == "vertical" ? this.get("xDisplayName") : this.get("yDisplayName");
            }
        },
        
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default cartesian
         */
        type: {		
            value: "cartesian"
        },

        /**
         * Order of this instance of this <code>type</code>.
         *
         * @attribute order
         * @type Number
         */
        order: {},

        /**
         * Order of the instance
         *
         * @attribute graphOrder
         * @type Number
         */
        graphOrder: {},

        /**
         * x coordinates for the series.
         *
         * @attribute xcoords
         * @type Array
         */
        xcoords: {},
        
        /**
         * y coordinates for the series
         *
         * @attribute ycoords
         * @type Array
         */
        ycoords: {},
        
        /**
         * Reference to the <code>Graph</code> in which the series is drawn into.
         *
         * @attribute graph
         * @type Graph
         */
        graph: {},

        /**
         * Reference to the <code>Axis</code> instance used for assigning 
         * x-values to the graph.
         *
         * @attribute xAxis
         * @type Axis
         */
        xAxis: {},
        
        /**
         * Reference to the <code>Axis</code> instance used for assigning 
         * y-values to the graph.
         *
         * @attribute yAxis
         * @type Axis
         */
        yAxis: {},
        
        /**
         * Indicates which array to from the hash of value arrays in 
         * the x-axis <code>Axis</code> instance.
         *
         * @attribute xKey
         * @type String
         */
        xKey: {},

        /**
         * Indicates which array to from the hash of value arrays in 
         * the y-axis <code>Axis</code> instance.
         *
         * @attribute yKey
         * @type String
         */
        yKey: {},

        /**
         * Array of x values for the series.
         *
         * @attribute xData
         * @type Array
         */
        xData: {},

        /**
         * Array of y values for the series.
         *
         * @attribute yData
         * @type Array
         */
        yData: {},
       
        /**
         * Indicates whether the Series has been through its initial set up.
         *
         * @attribute rendered
         * @type Boolean
         */
        rendered: {
            value: false
        },

        /*
         * Returns the width of the parent graph
         *
         * @attribute width
         * @type Number
         */
        width: {
            readOnly: true,
            
            getter: function()
            {
                this.get("graph").get("width");
            }
        },

        /**
         * Returns the height of the parent graph
         *
         * @attribute height
         * @type Number
         */
        height: {
            readOnly: true,
            
            getter: function()
            {
                this.get("graph").get("height");
            }
        },

        /**
         * Indicates whether to show the series
         *
         * @attribute visible
         * @type Boolean
         * @default true
         */
        visible: {
            value: true
        },

        /**
         * Collection of area maps along the xAxis. Used to determine mouseover for multiple
         * series.
         *
         * @attribute xMarkerPlane
         * @type Array
         */
        xMarkerPlane: {},
        
        /**
         * Collection of area maps along the yAxis. Used to determine mouseover for multiple
         * series.
         *
         * @attribute yMarkerPlane
         * @type Array
         */
        yMarkerPlane: {},

        /**
         * Distance from a data coordinate to the left/right for setting a hotspot.
         *
         * @attribute xMarkerPlaneOffset
         * @type Number
         */
        xMarkerPlaneOffset: {
            getter: function() {
                var marker = this.get("styles").marker;
                if(marker && marker.width && isFinite(marker.width))
                {
                    return marker.width * 0.5;
                }
                return this._defaultPlaneOffset;
            }
        },

        /**
         * Distance from a data coordinate to the top/bottom for setting a hotspot.
         *
         * @attribute yMarkerPlaneOffset
         * @type Number
         */
        yMarkerPlaneOffset: {
            getter: function() {
                var marker = this.get("styles").marker;
                if(marker && marker.height && isFinite(marker.height))
                {
                    return marker.height * 0.5;
                }
                return this._defaultPlaneOffset;
            }
        },

        /**
         * Direction of the series
         *
         * @attribute direction
         * @type String
         */
        direction: {
            value: "horizontal"
        }
    }
});
/**
 * The MarkerSeries class renders quantitative data by plotting relevant data points 
 * on a graph.
 *
 * @class MarkerSeries
 * @extends CartesianSeries
 * @uses Plots
 * @constructor
 */
Y.MarkerSeries = Y.Base.create("markerSeries", Y.CartesianSeries, [Y.Plots], {
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        this.drawPlots();
    },
    
    /**
     * @protected
     *
     * Method used by <code>styles</code> setter. Overrides base implementation.
     *
     * @method _setStyles
     * @param {Object} newStyles Hash of properties to update.
     * @return Object
     */
    _setStyles: function(val)
    {
        if(!val.marker)
        {
            val = {marker:val};
        }
        val = this._parseMarkerStyles(val);
        return Y.MarkerSeries.superclass._mergeStyles.apply(this, [val, this._getDefaultStyles()]);
    },
    
    /**
     * @protected
     *
     * Gets the default value for the <code>styles</code> attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     */
    _getDefaultStyles: function()
    {
        var styles = this._mergeStyles({marker:this._getPlotDefaults()}, Y.MarkerSeries.superclass._getDefaultStyles());
        return styles;
    }
},{
    ATTRS : {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default marker
         */
        type: {
            value:"marker"
        }
        
        /**
         * Style properties used for drawing markers. This attribute is inherited from <code>Renderer</code>. Below are the default values:
         *  <dl>
         *      <dt>fill</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              <code>["#6084d0", "#eeb647", "#6c6b5f", "#d6484f", "#ce9ed1", "#ff9f3b", "#93b7ff", "#e0ddd0", "#94ecba", "#309687"]</code>
         *              </dd>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>border</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              <code>["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"]</code>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>
         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>width</dt><dd>indicates the width of the marker. The default value is 10.</dd>
         *      <dt>height</dt><dd>indicates the height of the marker The default value is 10.</dd>
         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a <code>mouseover</code> event. The default 
         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,
         *      the default value for <code>marker.over.fill.color</code> is equivalent to <code>marker.fill.color</code>.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});

/**
 * The LineSeries class renders quantitative data on a graph by connecting relevant data points.
 *
 * @class LineSeries
 * @extends CartesianSeries
 * @uses Lines
 * @constructor
 */
Y.LineSeries = Y.Base.create("lineSeries", Y.CartesianSeries, [Y.Lines], {
    /**
     * @protected
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        this.drawLines();
    },

    /**
     * @protected
     *
     * Method used by <code>styles</code> setter. Overrides base implementation.
     *
     * @method _setStyles
     * @param {Object} newStyles Hash of properties to update.
     * @return Object
     */
    _setStyles: function(val)
    {
        if(!val.line)
        {
            val = {line:val};
        }
        return Y.LineSeries.superclass._setStyles.apply(this, [val]);
    },

    /**
     * @protected
     *
     * Gets the default value for the <code>styles</code> attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     */
    _getDefaultStyles: function()
    {
        var styles = this._mergeStyles({line:this._getLineDefaults()}, Y.LineSeries.superclass._getDefaultStyles());
        return styles;
    }
},
{
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default line
         */
        type: {
            value:"line"
        }

        /**
         * Style properties used for drawing lines. This attribute is inherited from <code>Renderer</code>. Below are the default values:
         *  <dl>
         *      <dt>color</dt><dd>The color of the line. The default value is determined by the order of the series on the graph. The color will be
         *      retrieved from the following array: 
         *      <code>["#426ab3", "#d09b2c", "#000000", "#b82837", "#b384b5", "#ff7200", "#779de3", "#cbc8ba", "#7ed7a6", "#007a6c"]</code>
         *      <dt>weight</dt><dd>Number that indicates the width of the line. The default value is 6.</dd>
         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the line. The default value is 1.</dd>
         *      <dt>lineType</dt><dd>Indicates whether the line is solid or dashed. The default value is solid.</dd> 
         *      <dt>dashLength</dt><dd>When the <code>lineType</code> is dashed, indicates the length of the dash. The default value is 10.</dd>
         *      <dt>gapSpace</dt><dd>When the <code>lineType</code> is dashed, indicates the distance between dashes. The default value is 10.</dd>
         *      <dt>connectDiscontinuousPoints</dt><dd>Indicates whether or not to connect lines when there is a missing or null value between points. The default value is true.</dd> 
         *      <dt>discontinuousType</dt><dd>Indicates whether the line between discontinuous points is solid or dashed. The default value is solid.</dd>
         *      <dt>discontinuousDashLength</dt><dd>When the <code>discontinuousType</code> is dashed, indicates the length of the dash. The default value is 10.</dd>
         *      <dt>discontinuousGapSpace</dt><dd>When the <code>discontinuousType</code> is dashed, indicates the distance between dashes. The default value is 10.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});



		

		
/**
 * SplineSeries renders a graph with data points connected by a curve.
 *
 * @class SplineSeries
 * @constructor
 * @extends CartesianSeries
 * @uses CurveUtil
 * @uses Lines
 */
Y.SplineSeries = Y.Base.create("splineSeries",  Y.CartesianSeries, [Y.CurveUtil, Y.Lines], {
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        this.drawSpline();
    }
}, {
	ATTRS : {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default spline
         */
        type : {
            value:"spline"
        }

        /**
         * Style properties used for drawing lines. This attribute is inherited from <code>Renderer</code>. Below are the default values:
         *  <dl>
         *      <dt>color</dt><dd>The color of the line. The default value is determined by the order of the series on the graph. The color will be
         *      retrieved from the following array: 
         *      <code>["#426ab3", "#d09b2c", "#000000", "#b82837", "#b384b5", "#ff7200", "#779de3", "#cbc8ba", "#7ed7a6", "#007a6c"]</code>
         *      <dt>weight</dt><dd>Number that indicates the width of the line. The default value is 6.</dd>
         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the line. The default value is 1.</dd>
         *      <dt>lineType</dt><dd>Indicates whether the line is solid or dashed. The default value is solid.</dd> 
         *      <dt>dashLength</dt><dd>When the <code>lineType</code> is dashed, indicates the length of the dash. The default value is 10.</dd>
         *      <dt>gapSpace</dt><dd>When the <code>lineType</code> is dashed, indicates the distance between dashes. The default value is 10.</dd>
         *      <dt>connectDiscontinuousPoints</dt><dd>Indicates whether or not to connect lines when there is a missing or null value between points. The default value is true.</dd> 
         *      <dt>discontinuousType</dt><dd>Indicates whether the line between discontinuous points is solid or dashed. The default value is solid.</dd>
         *      <dt>discontinuousDashLength</dt><dd>When the <code>discontinuousType</code> is dashed, indicates the length of the dash. The default value is 10.</dd>
         *      <dt>discontinuousGapSpace</dt><dd>When the <code>discontinuousType</code> is dashed, indicates the distance between dashes. The default value is 10.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});



		

		
/**
 * AreaSplineSeries renders an area graph with data points connected by a curve.
 *
 * @class AreaSplineSeries
 * @constructor
 * @extends CartesianSeries
 * @uses Fills
 * @uses CurveUtil
 */
Y.AreaSplineSeries = Y.Base.create("areaSplineSeries", Y.CartesianSeries, [Y.Fills, Y.CurveUtil], {
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        this.drawAreaSpline();
    }
}, {
	ATTRS : {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default areaSpline
         */
        type: {
            value:"areaSpline"
        }
        
        /**
         * Style properties used for drawing area fills. This attribute is inherited from <code>Renderer</code>. Below are the default values:
         *
         *  <dl>
         *      <dt>color</dt><dd>The color of the fill. The default value is determined by the order of the series on the graph. The color will be 
         *      retrieved from the following array:
         *      <code>["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"]</code>
         *      </dd>
         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});

/**
 * StackedSplineSeries creates spline graphs in which the different series are stacked along a value axis
 * to indicate their contribution to a cumulative total.
 *
 * @class StackedSplineSeries
 * @constructor
 * @extends SplineSeries
 * @extends StackingUtil
 */
Y.StackedSplineSeries = Y.Base.create("stackedSplineSeries", Y.SplineSeries, [Y.StackingUtil], {
    /**
     * @protected
     *
     * Calculates the coordinates for the series. Overrides base implementation.
     *
     * @method setAreaData
     */
    setAreaData: function()
    {   
        Y.StackedSplineSeries.superclass.setAreaData.apply(this);
        this._stackCoordinates.apply(this);
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedSpline
         */
        type: {
            value:"stackedSpline"
        }
    }
});

/**
 * StackedMarkerSeries plots markers with different series stacked along the value axis to indicate each
 * series' contribution to a cumulative total.
 *
 * @class StackedMarkerSeries
 * @constructor
 * @extends MarkerSeries
 * @extends StackingUtil
 */
Y.StackedMarkerSeries = Y.Base.create("stackedMarkerSeries", Y.MarkerSeries, [Y.StackingUtil], {
    /**
     * @protected
     *
     * Calculates the coordinates for the series. Overrides base implementation.
     *
     * @method setAreaData
     */
    setAreaData: function()
    {   
        Y.StackedMarkerSeries.superclass.setAreaData.apply(this);
        this._stackCoordinates.apply(this);
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedMarker
         */
        type: {
            value:"stackedMarker"
        }
    }
});

/**
 * The ColumnSeries class renders columns positioned horizontally along a category or time axis. The columns'
 * lengths are proportional to the values they represent along a vertical axis.
 * and the relevant data points.
 *
 * @class ColumnSeries
 * @extends MarkerSeries
 * @uses Histogram
 * @constructor
 */
Y.ColumnSeries = Y.Base.create("columnSeries", Y.MarkerSeries, [Y.Histogram], {
    /**
     * @private
     */
    _getMarkerDimensions: function(xcoord, ycoord, calculatedSize, offset)
    {
        var config = {
            left: xcoord + offset
        };
        if(this._bottomOrigin >= ycoord)
        {
            config.top = ycoord;
            config.calculatedSize = this._bottomOrigin - config.top;
        }
        else
        {
            config.top = this._bottomOrigin;
            config.calculatedSize = ycoord - this._bottomOrigin;
        }
        return config;
    },

    /**
     * @protected
     *
     * Resizes and positions markers based on a mouse interaction.
     *
     * @method updateMarkerState
     * @param {String} type state of the marker
     * @param {Number} i index of the marker
     */
    updateMarkerState: function(type, i)
    {
        if(this._markers[i])
        {
            var styles = Y.clone(this.get("styles").marker),
                markerStyles,
                state = this._getState(type),
                xcoords = this.get("xcoords"),
                ycoords = this.get("ycoords"),
                marker = this._markers[i],
                graph = this.get("graph"),
                seriesStyles,
                seriesCollection = graph.seriesTypes[this.get("type")],
                seriesLen = seriesCollection.length,
                seriesSize = 0,
                offset = 0,
                renderer,
                n = 0,
                xs = [],
                order = this.get("order"),
                config;
            markerStyles = state == "off" || !styles[state] ? styles : styles[state]; 
            markerStyles.fill.color = this._getItemColor(markerStyles.fill.color, i);
            markerStyles.border.color = this._getItemColor(markerStyles.border.color, i);
            config = this._getMarkerDimensions(xcoords[i], ycoords[i], styles.width, offset);
            markerStyles.height = config.calculatedSize;
            marker.set(markerStyles);
            for(; n < seriesLen; ++n)
            {
                xs[n] = xcoords[i] + seriesSize;
                seriesStyles = seriesCollection[n].get("styles").marker;
                seriesSize += seriesStyles.width;
                if(order > n)
                {
                    offset = seriesSize;
                }
                offset -= seriesSize/2;
            }
            for(n = 0; n < seriesLen; ++n)
            {
                renderer = seriesCollection[n].get("markers")[i];
                if(renderer && renderer !== undefined)
                {
                    renderer.set("x", (xs[n] - seriesSize/2));
                }
            }
        }
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default column
         */
        type: {
            value: "column"
        }
        
        /**
         * Style properties used for drawing markers. This attribute is inherited from <code>MarkerSeries</code>. Below are the default values:
         *  <dl>
         *      <dt>fill</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              <code>["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"]</code>
         *              </dd>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>border</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              <code>["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"]</code>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>
         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>width</dt><dd>indicates the width of the marker. The default value is 12.</dd>
         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a <code>mouseover</code> event. The default 
         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,
         *      the default value for <code>marker.over.fill.color</code> is equivalent to <code>marker.fill.color</code>.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});
/**
 * The BarSeries class renders bars positioned vertically along a category or time axis. The bars'
 * lengths are proportional to the values they represent along a horizontal axis.
 * and the relevant data points.
 *
 * @class BarSeries
 * @extends MarkerSeries
 * @uses Histogram
 * @constructor
 */
Y.BarSeries = Y.Base.create("barSeries", Y.MarkerSeries, [Y.Histogram], {
    /**
     * @private
     */
    _getMarkerDimensions: function(xcoord, ycoord, calculatedSize, offset)
    {
        var config = {
            top: ycoord + offset
        };
        if(xcoord >= this._leftOrigin)
        {
            config.left = this._leftOrigin;
            config.calculatedSize = xcoord - config.left;
        }
        else
        {
            config.left = xcoord;
            config.calculatedSize = this._leftOrigin - xcoord;
        }
        return config;
    },
    
    /**
     * @protected
     *
     * Resizes and positions markers based on a mouse interaction.
     *
     * @method updateMarkerState
     * @param {String} type state of the marker
     * @param {Number} i index of the marker
     */
    updateMarkerState: function(type, i)
    {
        if(this._markers[i])
        {
            var styles = Y.clone(this.get("styles").marker),
                markerStyles,
                state = this._getState(type),
                xcoords = this.get("xcoords"),
                ycoords = this.get("ycoords"),
                marker = this._markers[i],
                graph = this.get("graph"),
                seriesCollection = graph.seriesTypes[this.get("type")],
                seriesLen = seriesCollection.length,
                seriesStyles,
                seriesSize = 0,
                offset = 0,
                renderer,
                n = 0,
                ys = [],
                order = this.get("order"),
                config;
            markerStyles = state == "off" || !styles[state] ? styles : styles[state]; 
            markerStyles.fill.color = this._getItemColor(markerStyles.fill.color, i);
            markerStyles.border.color = this._getItemColor(markerStyles.border.color, i);
            config = this._getMarkerDimensions(xcoords[i], ycoords[i], styles.height, offset);
            markerStyles.width = config.calculatedSize;
            marker.set(markerStyles);
            for(; n < seriesLen; ++n)
            {
                ys[n] = ycoords[i] + seriesSize;
                seriesStyles = seriesCollection[n].get("styles").marker;
                seriesSize += seriesStyles.width; 
                if(order > n)
                {
                    offset = seriesSize;
                }
                offset -= seriesSize/2;
            }
            for(n = 0; n < seriesLen; ++n)
            {
                renderer = Y.one(seriesCollection[n]._graphicNodes[i]);
                if(renderer && renderer !== undefined)
                {
                    renderer.setStyle("top", (ys[n] - seriesSize/2));
                }
            }
        }
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default bar
         */
        type: {
            value: "bar"
        },

        /**
         * Indicates the direction of the category axis that the bars are plotted against.
         *
         * @attribute direction
         * @type String
         */
        direction: {
            value: "vertical"
        }
        
        /**
         * Style properties used for drawing markers. This attribute is inherited from <code>MarkerSeries</code>. Below are the default values:
         *  <dl>
         *      <dt>fill</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              <code>["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"]</code>
         *              </dd>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>border</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              <code>["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"]</code>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>
         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>height</dt><dd>indicates the width of the marker. The default value is 12.</dd>
         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a <code>mouseover</code> event. The default 
         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,
         *      the default value for <code>marker.over.fill.color</code> is equivalent to <code>marker.fill.color</code>.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});
/**
 * The AreaSeries class renders quantitative data on a graph by creating a fill between 0
 * and the relevant data points.
 *
 * @class AreaSeries
 * @extends CartesianSeries
 * @uses Fills
 * @constructor
 */
Y.AreaSeries = Y.Base.create("areaSeries", Y.CartesianSeries, [Y.Fills], {
    /**
     * @protected
     *
     * Renders the series. 
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        this.drawFill.apply(this, this._getClosingPoints());
    },
    
    /**
     * @protected
     *
     * Method used by <code>styles</code> setter. Overrides base implementation.
     *
     * @method _setStyles
     * @param {Object} newStyles Hash of properties to update.
     * @return Object
     */
    _setStyles: function(val)
    {
        if(!val.area)
        {
            val = {area:val};
        }
        return Y.AreaSeries.superclass._setStyles.apply(this, [val]);
    },

    /**
     * @protected
     *
     * Gets the default value for the <code>styles</code> attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     */
    _getDefaultStyles: function()
    {
        var styles = this._mergeStyles({area:this._getAreaDefaults()}, Y.AreaSeries.superclass._getDefaultStyles());
        return styles;
    }
},
{
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default area
         */
        type: {
            value:"area"
        }
        
        /**
         * Style properties used for drawing area fills. This attribute is inherited from <code>Renderer</code>. Below are the default values:
         *
         *  <dl>
         *      <dt>color</dt><dd>The color of the fill. The default value is determined by the order of the series on the graph. The color will be 
         *      retrieved from the following array:
         *      <code>["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"]</code>
         *      </dd>
         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});



		

		
/**
 * StackedAreaSplineSeries creates a stacked area chart with points data points connected by a curve.
 *
 * @class StackedAreaSplineSeries
 * @constructor
 * @extends AreaSeries
 * @uses CurveUtil
 * @uses StackingUtil
 */
Y.StackedAreaSplineSeries = Y.Base.create("stackedAreaSplineSeries", Y.AreaSeries, [Y.CurveUtil, Y.StackingUtil], {
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        this._stackCoordinates();
        this.drawStackedAreaSpline();
    }
}, {
    ATTRS : {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedAreaSpline
         */
        type: {
            value:"stackedAreaSpline"
        }
    }
});

/**
 * The ComboSeries class renders a combination of lines, plots and area fills in a single series. Each
 * series type has a corresponding boolean attribute indicating if it is rendered. By default, lines and plots 
 * are rendered and area is not. 
 *
 * @class ComboSeries
 * @extends CartesianSeries 
 * @uses Fills
 * @uses Lines
 * @uses Plots
 * @constructor
 */
Y.ComboSeries = Y.Base.create("comboSeries", Y.CartesianSeries, [Y.Fills, Y.Lines, Y.Plots], {
	/**
     * @protected
     * 
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        if(this.get("showAreaFill"))
        {
            this.drawFill.apply(this, this._getClosingPoints());
        }
        if(this.get("showLines")) 
        {
            this.drawLines();
        }
        if(this.get("showMarkers"))
        {
            this.drawPlots();
        }   
    },
    
    /**
     * Toggles visibility
     *
     * @method _toggleVisible
     * @param {Boolean} visible indicates visibilitye
     * @private
     */
    _toggleVisible: function(visible)
    {
        var markers,
            marker,
            len,
            i;
        if(this.get("showAreaFill") && this._path)
        {
            this._path.set("visible", visible);
        }
        if(this.get("showLines"))
        {
            this._lineGraphic.set("visible", visible);
        }
        if(this.get("showMarkers"))
        {
            markers = this.get("markers");
            if(markers)
            {
                i = 0;
                len = markers.length;
                for(; i < len; ++i)
                {
                    marker = markers[i];
                    if(marker)
                    {
                        marker.set("visible", visible);
                    }
                }
            }
        }
    },

    /**
     * @protected
     *
     * Returns the default hash for the <code>styles</code> attribute.
     *
     * @method _getDefaultStyles
     * @return Object
     */
    _getDefaultStyles: function()
    {
        var styles = Y.ComboSeries.superclass._getDefaultStyles();
        styles.line = this._getLineDefaults();
        styles.marker = this._getPlotDefaults();
        styles.area = this._getAreaDefaults();
        return styles;
    }
},
{
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default combo
         */
        type: {
            value:"combo"
        },

        /**
         * Indicates whether a fill is displayed.
         *
         * @attribute showAreaFill
         * @type Boolean
         * @default false
         */
        showAreaFill: {
            value: false
        },

        /**
         * Indicates whether lines are displayed.
         *
         * @attribute showLines
         * @type Boolean
         * @default true
         */
        showLines: {
            value: true
        },

        /**
         * Indicates whether markers are displayed.
         *
         * @attribute showMarkers
         * @type Boolean
         * @default true
         */
        showMarkers: {
            value: true
        },

        /**
         * Reference to the styles of the markers. These styles can also
         * be accessed through the <code>styles</code> attribute. Below are default
         * values:
         *  <dl>
         *      <dt>fill</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              <code>["#6084d0", "#eeb647", "#6c6b5f", "#d6484f", "#ce9ed1", "#ff9f3b", "#93b7ff", "#e0ddd0", "#94ecba", "#309687"]</code>
         *              </dd>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>border</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              <code>["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"]</code>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>
         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>width</dt><dd>indicates the width of the marker. The default value is 10.</dd>
         *      <dt>height</dt><dd>indicates the height of the marker The default value is 10.</dd>
         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a <code>mouseover</code> event. The default 
         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,
         *      the default value for <code>marker.over.fill.color</code> is equivalent to <code>marker.fill.color</code>.</dd>
         *  </dl>
         *
         * @attribute marker
         * @type Object
         */
        marker: {
            lazyAdd: false,
            getter: function()
            {
                return this.get("styles").marker;
            },
            setter: function(val)
            {
                this.set("styles", {marker:val});
            }
        },
        
        /**
         * Reference to the styles of the lines. These styles can also be accessed through the <code>styles</code> attribute.
         * Below are the default values:
         *  <dl>
         *      <dt>color</dt><dd>The color of the line. The default value is determined by the order of the series on the graph. The color will be
         *      retrieved from the following array: 
         *      <code>["#426ab3", "#d09b2c", "#000000", "#b82837", "#b384b5", "#ff7200", "#779de3", "#cbc8ba", "#7ed7a6", "#007a6c"]</code>
         *      <dt>weight</dt><dd>Number that indicates the width of the line. The default value is 6.</dd>
         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the line. The default value is 1.</dd>
         *      <dt>lineType</dt><dd>Indicates whether the line is solid or dashed. The default value is solid.</dd> 
         *      <dt>dashLength</dt><dd>When the <code>lineType</code> is dashed, indicates the length of the dash. The default value is 10.</dd>
         *      <dt>gapSpace</dt><dd>When the <code>lineType</code> is dashed, indicates the distance between dashes. The default value is 10.</dd>
         *      <dt>connectDiscontinuousPoints</dt><dd>Indicates whether or not to connect lines when there is a missing or null value between points. The default value is true.</dd> 
         *      <dt>discontinuousType</dt><dd>Indicates whether the line between discontinuous points is solid or dashed. The default value is solid.</dd>
         *      <dt>discontinuousDashLength</dt><dd>When the <code>discontinuousType</code> is dashed, indicates the length of the dash. The default value is 10.</dd>
         *      <dt>discontinuousGapSpace</dt><dd>When the <code>discontinuousType</code> is dashed, indicates the distance between dashes. The default value is 10.</dd>
         *  </dl>
         *
         * @attribute line
         * @type Object
         */
        line: {
            lazyAdd: false,
            getter: function()
            {
                return this.get("styles").line;
            },
            setter: function(val)
            {
                this.set("styles", {line:val});
            }
        },
        
        /**
         * Reference to the styles of the area fills. These styles can also be accessed through the <code>styles</code> attribute.
         * Below are the default values:
         *
         *  <dl>
         *      <dt>color</dt><dd>The color of the fill. The default value is determined by the order of the series on the graph. The color will be 
         *      retrieved from the following array:
         *      <code>["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"]</code>
         *      </dd>
         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1</dd>
         *  </dl>
         *
         * @attribute area
         * @type Object
         */
        area: {
            lazyAdd: false,
            getter: function()
            {
                return this.get("styles").area;
            },
            setter: function(val)
            {
                this.set("styles", {area:val});
            }
        }

        /**
         * Style properties for the series. Contains a key indexed hash of the following:
         *  <dl>
         *      <dt>marker</dt><dd>Style properties for the markers in the series. Specific style attributes are listed
         *      <a href="#config_marker">here</a>.</dd>
         *      <dt>line</dt><dd>Style properties for the lines in the series. Specific
         *      style attributes are listed <a href="#config_line">here</a>.</dd>
         *      <dt>area</dt><dd>Style properties for the area fills in the series. Specific style attributes are listed
         *      <a href="#config_area">here</a>.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});



		

		
/**
 * The StackedComboSeries class renders a combination of lines, plots and area fills in a single series. Series
 * are stacked along the value axis to indicate each series contribution to a cumulative total. Each
 * series type has a corresponding boolean attribute indicating if it is rendered. By default, all three types are
 * rendered.  
 *
 * @class StackedComboSeries
 * @extends ComboSeries
 * @uses StackingUtil
 * @constructor
 */
Y.StackedComboSeries = Y.Base.create("stackedComboSeries", Y.ComboSeries, [Y.StackingUtil], {
    /**
     * @protected
     *
     * Calculates the coordinates for the series. Overrides base implementation.
     *
     * @method setAreaData
     */
    setAreaData: function()
    {   
        Y.StackedComboSeries.superclass.setAreaData.apply(this);
        this._stackCoordinates.apply(this);
    },
	
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        if(this.get("showAreaFill"))
        {
            this.drawFill.apply(this, this._getStackedClosingPoints());
        }
        if(this.get("showLines")) 
        {
            this.drawLines();
        }
        if(this.get("showMarkers"))
        {
            this.drawPlots();
        }   
    }
    
}, {
    ATTRS : {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedCombo
         */
        type: {
            value: "stackedCombo"
        },

        /**
         * Indicates whether a fill is displayed.
         *
         * @attribute showAreaFill
         * @type Boolean
         * @default true
         */
        showAreaFill: {
            value: true
        }
    }
});
/**
 * The ComboSplineSeries class renders a combination of splines, plots and areaspline fills in a single series. Each
 * series type has a corresponding boolean attribute indicating if it is rendered. By default, splines and plots 
 * are rendered and areaspline is not. 
 *
 * @class ComboSplineSeries
 * @extends ComboSeries
 * @extends CurveUtil
 * @constructor
 */
Y.ComboSplineSeries = Y.Base.create("comboSplineSeries", Y.ComboSeries, [Y.CurveUtil], {
    /**
     * @protected
     * 
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        if(this.get("showAreaFill"))
        {
            this.drawAreaSpline();
        }
        if(this.get("showLines")) 
        {
            this.drawSpline();
        }
        if(this.get("showMarkers"))
        {
            this.drawPlots();
        }   
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default comboSpline
         */
        type: {
            value : "comboSpline"
        }
    }
});
/**
 * The StackedComboSplineSeries class renders a combination of splines, plots and areaspline fills in a single series. Series
 * are stacked along the value axis to indicate each series contribution to a cumulative total. Each
 * series type has a corresponding boolean attribute indicating if it is rendered. By default, all three types are
 * rendered.  
 *
 * @class StackedComboSplineSeries
 * @extends StackedComboSeries
 * @uses CurveUtil
 * @constructor
 */
Y.StackedComboSplineSeries = Y.Base.create("stackedComboSplineSeries", Y.StackedComboSeries, [Y.CurveUtil], {
    /**
	 * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
	 */
	drawSeries: function()
    {
        if(this.get("showAreaFill"))
        {
            this.drawStackedAreaSpline();
        }
        if(this.get("showLines")) 
        {
            this.drawSpline();
        }
        if(this.get("showMarkers"))
        {
            this.drawPlots();
        }   
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedComboSpline
         */
        type : {
            value : "stackedComboSpline"
        },

        /**
         * Indicates whether a fill is displayed.
         *
         * @attribute showAreaFill
         * @type Boolean
         * @default true
         */
        showAreaFill: {
            value: true
        }
    }
});
/**
 * StackedLineSeries creates line graphs in which the different series are stacked along a value axis
 * to indicate their contribution to a cumulative total.
 *
 * @class StackedLineSeries
 * @constructor
 * @extends  LineSeries
 * @uses StackingUtil
 */
Y.StackedLineSeries = Y.Base.create("stackedLineSeries", Y.LineSeries, [Y.StackingUtil], {
    /**
     * @protected
     *
     * Calculates the coordinates for the series. Overrides base implementation.
     *
     * @method setAreaData
     */
    setAreaData: function()
    {   
        Y.StackedLineSeries.superclass.setAreaData.apply(this);
        this._stackCoordinates.apply(this);
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedLine
         */
        type: {
            value:"stackedLine"
        }
    }
});
/**
 * StackedAreaSeries area fills to display data showing its contribution to a whole.
 *
 * @param {Object} config (optional) Configuration parameters for the Chart.
 * @class StackedAreaSeries
 * @constructor
 * @extends AreaSeries
 * @uses StackingUtil
 */
Y.StackedAreaSeries = Y.Base.create("stackedAreaSeries", Y.AreaSeries, [Y.StackingUtil], {
    /**
     * @protected
     *
     * Calculates the coordinates for the series. Overrides base implementation.
     *
     * @method setAreaData
     */
    setAreaData: function()
    {   
        Y.StackedAreaSeries.superclass.setAreaData.apply(this);
        this._stackCoordinates.apply(this);
    },

    /**
     * @protected
     *
     * Draws the series
     *
     * @method drawSeries
     */
	drawSeries: function()
    {
        this.drawFill.apply(this, this._getStackedClosingPoints());
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedArea
         */
        type: {
            value:"stackedArea"
        }
    }
});
/**
 * The StackedColumnSeries renders column chart in which series are stacked vertically to show
 * their contribution to the cumulative total.
 *
 * @class StackedColumnSeries
 * @extends ColumnSeries
 * @uses StackingUtil
 * @constructor
 */
Y.StackedColumnSeries = Y.Base.create("stackedColumnSeries", Y.ColumnSeries, [Y.StackingUtil], {
    /**
	 * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
	 */
	drawSeries: function()
	{
	    if(this.get("xcoords").length < 1) 
		{
			return;
		}
        var isNumber = Y.Lang.isNumber,
            style = this.get("styles").marker, 
            w = style.width,
            h = style.height,
            xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            i = 0,
            len = xcoords.length,
            top = ycoords[0],
            type = this.get("type"),
            graph = this.get("graph"),
            seriesCollection = graph.seriesTypes[type],
            ratio,
            order = this.get("order"),
            graphOrder = this.get("graphOrder"),
            left,
            marker,
            lastCollection,
            negativeBaseValues,
            positiveBaseValues,
            useOrigin = order === 0,
            totalWidth = len * w;
        this._createMarkerCache();
        if(totalWidth > this.get("width"))
        {
            ratio = this.width/totalWidth;
            w *= ratio;
            w = Math.max(w, 1);
        }
        if(!useOrigin)
        {
            lastCollection = seriesCollection[order - 1];
            negativeBaseValues = lastCollection.get("negativeBaseValues");
            positiveBaseValues = lastCollection.get("positiveBaseValues");
        }
        else
        {
            negativeBaseValues = [];
            positiveBaseValues = [];
        }
        this.set("negativeBaseValues", negativeBaseValues);
        this.set("positiveBaseValues", positiveBaseValues);
        for(i = 0; i < len; ++i)
        {
            left = xcoords[i];
            top = ycoords[i];
            
            if(!isNumber(top) || !isNumber(left))
            {
                continue;
            }
            
            if(useOrigin)
            {
                h = Math.abs(this._bottomOrigin - top);
                if(top < this._bottomOrigin)
                {
                    positiveBaseValues[i] = top;
                    negativeBaseValues[i] = this._bottomOrigin;
                }
                else if(top > this._bottomOrigin)
                {
                    positiveBaseValues[i] = this._bottomOrigin;
                    negativeBaseValues[i] = top;
                    top -= h;
                }
                else
                {
                    positiveBaseValues[i] = top;
                    negativeBaseValues[i] = top;
                }
            }
            else 
            {
                if(top > this._bottomOrigin)
                {
                    top += (negativeBaseValues[i] - this._bottomOrigin);
                    h = top - negativeBaseValues[i];
                    negativeBaseValues[i] = top;
                    top -= h;
                }
                else if(top <= this._bottomOrigin)
                {
                    top = positiveBaseValues[i] - (this._bottomOrigin - ycoords[i]);
                    h = positiveBaseValues[i] - top;
                    positiveBaseValues[i] = top;
                }
            }
            left -= w/2;
            style.width = w;
            style.height = h;
            style.x = left;
            style.y = top;
            marker = this.getMarker(style, graphOrder, i);
        }
        this._clearMarkerCache();
    },

    /**
     * @protected
     *
     * Resizes and positions markers based on a mouse interaction.
     *
     * @method updateMarkerState
     * @param {String} type state of the marker
     * @param {Number} i index of the marker
     */
    updateMarkerState: function(type, i)
    {
        if(this._markers[i])
        {
            var styles,
                markerStyles,
                state = this._getState(type),
                xcoords = this.get("xcoords"),
                marker = this._markers[i],
                offset = 0;        
            styles = this.get("styles").marker;
            offset = styles.width * 0.5;
            markerStyles = state == "off" || !styles[state] ? styles : styles[state]; 
            markerStyles.height = marker.get("height");
            markerStyles.x = (xcoords[i] - offset);
            markerStyles.y = marker.get("y");
            marker.set(markerStyles);
        }
    },
	
	/**
	 * @private
	 */
    _getPlotDefaults: function()
    {
        var defs = {
            fill:{
                type: "solid",
                alpha: 1,
                colors:null,
                alphas: null,
                ratios: null
            },
            border:{
                weight: 0,
                alpha: 1
            },
            width: 24,
            height: 24,
            shape: "rect",

            padding:{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        };
        defs.fill.color = this._getDefaultColor(this.get("graphOrder"), "fill");
        defs.border.color = this._getDefaultColor(this.get("graphOrder"), "border");
        return defs;
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedColumn
         */
        type: {
            value: "stackedColumn"
        },

        /**
         * @private
         *
         * @attribute negativeBaseValues
         * @type Array
         * @default null
         */
        negativeBaseValues: {
            value: null
        },

        /**
         * @private
         *
         * @attribute positiveBaseValues
         * @type Array
         * @default null
         */
        positiveBaseValues: {
            value: null
        }
        
        /**
         * Style properties used for drawing markers. This attribute is inherited from <code>ColumnSeries</code>. Below are the default values:
         *  <dl>
         *      <dt>fill</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              <code>["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"]</code>
         *              </dd>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>border</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              <code>["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"]</code>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>
         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>width</dt><dd>indicates the width of the marker. The default value is 24.</dd>
         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a <code>mouseover</code> event. The default 
         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,
         *      the default value for <code>marker.over.fill.color</code> is equivalent to <code>marker.fill.color</code>.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});

/**
 * The StackedBarSeries renders bar chart in which series are stacked horizontally to show
 * their contribution to the cumulative total.
 *
 * @class StackedBarSeries
 * @extends BarSeries
 * @uses StackingUtil
 * @constructor
 */
Y.StackedBarSeries = Y.Base.create("stackedBarSeries", Y.BarSeries, [Y.StackingUtil], {
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
	{
	    if(this.get("xcoords").length < 1) 
		{
			return;
		}

        var isNumber = Y.Lang.isNumber,
            style = this.get("styles").marker,
            w = style.width,
            h = style.height,
            xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            i = 0,
            len = xcoords.length,
            top = ycoords[0],
            type = this.get("type"),
            graph = this.get("graph"),
            seriesCollection = graph.seriesTypes[type],
            ratio,
            order = this.get("order"),
            graphOrder = this.get("graphOrder"),
            left,
            marker,
            lastCollection,
            negativeBaseValues,
            positiveBaseValues,
            useOrigin = order === 0,
            totalHeight = len * h;
        this._createMarkerCache();
        if(totalHeight > this.get("height"))
        {
            ratio = this.height/totalHeight;
            h *= ratio;
            h = Math.max(h, 1);
        }
        if(!useOrigin)
        {
            lastCollection = seriesCollection[order - 1];
            negativeBaseValues = lastCollection.get("negativeBaseValues");
            positiveBaseValues = lastCollection.get("positiveBaseValues");
        }
        else
        {
            negativeBaseValues = [];
            positiveBaseValues = [];
        }
        this.set("negativeBaseValues", negativeBaseValues);
        this.set("positiveBaseValues", positiveBaseValues);
        for(i = 0; i < len; ++i)
        {
            top = ycoords[i];
            left = xcoords[i];
            if(!isNumber(top) || !isNumber(left))
            {
                continue;
            }
            if(useOrigin)
            {
                w = Math.abs(left - this._leftOrigin);
                if(left > this._leftOrigin)
                {
                    positiveBaseValues[i] = left;
                    negativeBaseValues[i] = this._leftOrigin;
                    left -= w;
                }
                else if(left < this._leftOrigin)
                {   
                    positiveBaseValues[i] = this._leftOrigin;
                    negativeBaseValues[i] = left;
                }
                else
                {
                    positiveBaseValues[i] = left;
                    negativeBaseValues[i] = this._leftOrigin;
                }
            }
            else
            {
                if(left < this._leftOrigin)
                {
                    left = negativeBaseValues[i] - (this._leftOrigin - xcoords[i]);
                    w = negativeBaseValues[i] - left;
                    negativeBaseValues[i] = left;
                }
                else if(left >= this._leftOrigin)
                {
                    left += (positiveBaseValues[i] - this._leftOrigin);
                    w = left - positiveBaseValues[i];
                    positiveBaseValues[i] = left;
                    left -= w;
                }
            }
            top -= h/2;        
            style.width = w;
            style.height = h;
            style.x = left;
            style.y = top;
            marker = this.getMarker(style, graphOrder, i);
        }
        this._clearMarkerCache();
    },

    /**
     * @protected
     *
     * Resizes and positions markers based on a mouse interaction.
     *
     * @method updateMarkerState
     * @param {String} type state of the marker
     * @param {Number} i index of the marker
     */
    updateMarkerState: function(type, i)
    {
        if(this._markers[i])
        {
            var state = this._getState(type),
                ycoords = this.get("ycoords"),
                marker = this._markers[i],
                styles = this.get("styles").marker,
                h = styles.height,
                markerStyles = state == "off" || !styles[state] ? styles : styles[state]; 
            markerStyles.y = (ycoords[i] - h/2);
            markerStyles.x = marker.get("x");
            markerStyles.width = marker.get("width");
            marker.set(markerStyles);
        }
    },
	
    /**
     * @protected
     *
     * Returns default values for the <code>styles</code> attribute.
     * 
     * @method _getPlotDefaults
     * @return Object
     */
    _getPlotDefaults: function()
    {
        var defs = {
            fill:{
                type: "solid",
                alpha: 1,
                colors:null,
                alphas: null,
                ratios: null
            },
            border:{
                weight: 0,
                alpha: 1
            },
            width: 24,
            height: 24,
            shape: "rect",

            padding:{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        };
        defs.fill.color = this._getDefaultColor(this.get("graphOrder"), "fill");
        defs.border.color = this._getDefaultColor(this.get("graphOrder"), "border");
        return defs;
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedBar
         */
        type: {
            value: "stackedBar"
        },

        /**
         * Direction of the series
         *
         * @attribute direction
         * @type String
         * @default vertical
         */
        direction: {
            value: "vertical"
        },

        /**
         * @private
         *
         * @attribute negativeBaseValues
         * @type Array
         * @default null
         */
        negativeBaseValues: {
            value: null
        },

        /**
         * @private
         *
         * @attribute positiveBaseValues
         * @type Array
         * @default null
         */
        positiveBaseValues: {
            value: null
        }
        
        /**
         * Style properties used for drawing markers. This attribute is inherited from <code>BarSeries</code>. Below are the default values:
         *  <dl>
         *      <dt>fill</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              <code>["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"]</code>
         *              </dd>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>border</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              <code>["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"]</code>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>
         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>height</dt><dd>indicates the width of the marker. The default value is 24.</dd>
         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a <code>mouseover</code> event. The default 
         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,
         *      the default value for <code>marker.over.fill.color</code> is equivalent to <code>marker.fill.color</code>.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});

/**
 * PieSeries visualizes data as a circular chart divided into wedges which represent data as a 
 * percentage of a whole.
 *
 * @class PieSeries
 * @constructor
 * @extends MarkerSeries
 */
Y.PieSeries = Y.Base.create("pieSeries", Y.MarkerSeries, [], { 
    /**
     * @private
     */
    _map: null,

    /**
     * @private
     */
    _image: null,

    /**
     * @private
     */
    _setMap: function()
    {
        var id = "pieHotSpotMapi_" + Math.round(100000 * Math.random()),
            cb = this.get("graph").get("contentBox"),
            areaNode;
        if(this._image)
        {
            cb.removeChild(this._image);
            while(this._areaNodes && this._areaNodes.length > 0)
            {
                areaNode = this._areaNodes.shift();
                this._map.removeChild(areaNode);
            }
            cb.removeChild(this._map);
        }
        this._image = document.createElement("img"); 
        this._image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAABCAYAAAD9yd/wAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABJJREFUeNpiZGBgSGPAAgACDAAIkABoFyloZQAAAABJRU5ErkJggg==";
        cb.appendChild(this._image);
        this._image.setAttribute("usemap", "#" + id);
        this._image.style.zIndex = 3;
        this._image.style.opacity = 0;
        this._image.setAttribute("alt", "imagemap");
        this._map = document.createElement("map");
        this._map.style.zIndex = 5;
        cb.appendChild(this._map);
        this._map.setAttribute("name", id);
        this._map.setAttribute("id", id);
        this._areaNodes = [];
    },

    /**
     * @private
     */
    _categoryDisplayName: null,
    
    /**
     * @private
     */
    _valueDisplayName: null,

    /**
     * @private
     */
    addListeners: function()
    {
        var categoryAxis = this.get("categoryAxis"),
            valueAxis = this.get("valueAxis");
        if(categoryAxis)
        {
            categoryAxis.after("dataReady", Y.bind(this._categoryDataChangeHandler, this));
            categoryAxis.after("dataUpdate", Y.bind(this._categoryDataChangeHandler, this));
        }
        if(valueAxis)
        {
            valueAxis.after("dataReady", Y.bind(this._valueDataChangeHandler, this));
            valueAxis.after("dataUpdate", Y.bind(this._valueDataChangeHandler, this));
        }
        this.after("categoryAxisChange", this.categoryAxisChangeHandler);
        this.after("valueAxisChange", this.valueAxisChangeHandler);
        this.after("stylesChange", this._updateHandler);
    },
    
    /**
     * @private
     */
    validate: function()
    {
        this.draw();
        this._renderered = true;
    },

    /**
     * @private
     */
    _categoryAxisChangeHandler: function(e)
    {
        var categoryAxis = this.get("categoryAxis");
        categoryAxis.after("dataReady", Y.bind(this._categoryDataChangeHandler, this));
        categoryAxis.after("dataUpdate", Y.bind(this._categoryDataChangeHandler, this));
    },
    
    /**
     * @private
     */
    _valueAxisChangeHandler: function(e)
    {
        var valueAxis = this.get("valueAxis");
        valueAxis.after("dataReady", Y.bind(this._valueDataChangeHandler, this));
        valueAxis.after("dataUpdate", Y.bind(this._valueDataChangeHandler, this));
    },
	
    /**
     * Constant used to generate unique id.
     *
     * @private
     */
    GUID: "pieseries",
	
    /**
     * @private (protected)
     * Handles updating the graph when the x < code>Axis</code> values
     * change.
     */
    _categoryDataChangeHandler: function(event)
    {
       if(this._rendered && this.get("categoryKey") && this.get("valueKey"))
        {
            this.draw();
        }
    },

    /**
     * @private (protected)
     * Handles updating the chart when the y <code>Axis</code> values
     * change.
     */
    _valueDataChangeHandler: function(event)
    {
        if(this._rendered && this.get("categoryKey") && this.get("valueKey"))
        {
            this.draw();
        }
    },
   
    /**
     * @protected
     *
     * Draws the series. Overrides the base implementation.
     *
     * @method draw
     */
    draw: function()
    {
        var graph = this.get("graph"),
            w = graph.get("width"),
            h = graph.get("height");
        if(isFinite(w) && isFinite(h) && w > 0 && h > 0)
        {   
            this._rendered = true;
            this.drawSeries();
            this.fire("drawingComplete");
        }
    },

    /**
     * @private
     */
    drawPlots: function()
    {
        var values = this.get("valueAxis").getDataByKey(this.get("valueKey")).concat(),
            catValues = this.get("categoryAxis").getDataByKey(this.get("categoryKey")).concat(),
            totalValue = 0,
            itemCount = values.length,
            styles = this.get("styles").marker,
            fillColors = styles.fill.colors,
            fillAlphas = styles.fill.alphas || ["1"],
            borderColors = styles.border.colors,
            borderWeights = [styles.border.weight],
            borderAlphas = [styles.border.alpha],
            tbw = borderWeights.concat(),
            tbc = borderColors.concat(),
            tba = borderAlphas.concat(),
            tfc,
            tfa,
            padding = styles.padding,
            graph = this.get("graph"),
            w = graph.get("width") - (padding.left + padding.right),
            h = graph.get("height") - (padding.top + padding.bottom),
            startAngle = -90,
            halfWidth = w / 2,
            halfHeight = h / 2,
            radius = Math.min(halfWidth, halfHeight),
            i = 0,
            value,
            angle = 0,
            lc,
            la,
            lw,
            wedgeStyle,
            marker,
            graphOrder = this.get("graphOrder"),
            isCanvas = Y.Graphic.NAME == "canvasGraphic";

        for(; i < itemCount; ++i)
        {
            value = values[i];
            
            values.push(value);
            if(!isNaN(value))
            {
                totalValue += value;
            }
        }
        
        tfc = fillColors ? fillColors.concat() : null;
        tfa = fillAlphas ? fillAlphas.concat() : null;
        this._createMarkerCache();
        if(isCanvas)
        {
            this._setMap();
            this._image.width = w;
            this._image.height = h;
        }
        for(i = 0; i < itemCount; i++)
        {
            value = values[i];
            if(totalValue === 0)
            {
                angle = 360 / values.length;
            }
            else
            {
                angle = 360 * (value / totalValue);
            }
            angle = Math.round(angle);
            if(tfc && tfc.length < 1)
            {
                tfc = fillColors.concat();
            }
            if(tfa && tfa.length < 1)
            {
                tfa = fillAlphas.concat();
            }
            if(tbw && tbw.length < 1)
            {
                tbw = borderWeights.concat();
            }
            if(tbw && tbc.length < 1)
            {
                tbc = borderColors.concat();
            }
            if(tba && tba.length < 1)
            {
                tba = borderAlphas.concat();
            }
            lw = tbw ? tbw.shift() : null;
            lc = tbc ? tbc.shift() : null;
            la = tba ? tba.shift() : null;
            startAngle += angle;
            wedgeStyle = {
                border: {
                    color:lc,
                    weight:lw,
                    alpha:la
                },
                fill: {
                    color:tfc ? tfc.shift() : this._getDefaultColor(i, "slice"),
                    alpha:tfa ? tfa.shift() : null
                },
                type: "pieslice",
                arc: angle,
                radius: radius,
                startAngle: startAngle,
                cx: halfWidth,
                cy: halfHeight,
                width: w,
                height: h
            };
            marker = this.getMarker(wedgeStyle, graphOrder, i);
            if(isCanvas)
            {
                this._addHotspot(wedgeStyle, graphOrder, i);
            }
        }
        this._clearMarkerCache();
    },

    _addHotspot: function(cfg, seriesIndex, index)
    {
        var areaNode = document.createElement("area"),
            i = 1,
            x = cfg.cx,
            y = cfg.cy, 
            arc = cfg.arc,
            startAngle = cfg.startAngle - arc, 
            endAngle = cfg.startAngle,
            radius = cfg.radius, 
            ax = x + Math.cos(startAngle / 180 * Math.PI) * radius,
            ay = y + Math.sin(startAngle / 180 * Math.PI) * radius,
            bx = x + Math.cos(endAngle / 180 * Math.PI) * radius,
            by = y + Math.sin(endAngle / 180 * Math.PI) * radius,
            numPoints = Math.floor(arc/10) - 1,
            divAngle = (arc/(Math.floor(arc/10)) / 180) * Math.PI,
            angleCoord = Math.atan((ay - y)/(ax - x)),
            pts = x + ", " + y + ", " + ax + ", " + ay,
            cosAng,
            sinAng,
            multDivAng;
        for(i = 1; i <= numPoints; ++i)
        {
            multDivAng = divAngle * i;
            cosAng = Math.cos(angleCoord + multDivAng);
            sinAng = Math.sin(angleCoord + multDivAng);
            if(startAngle <= 90)
            {
                pts += ", " + (x + (radius * Math.cos(angleCoord + (divAngle * i))));
                pts += ", " + (y + (radius * Math.sin(angleCoord + (divAngle * i))));
            }
            else
            {
                pts += ", " + (x - (radius * Math.cos(angleCoord + (divAngle * i))));
                pts += ", " + (y - (radius * Math.sin(angleCoord + (divAngle * i))));
            }
        }
        pts += ", " + bx + ", " + by;
        pts += ", " + x + ", " + y;
        this._map.appendChild(areaNode);
        areaNode.setAttribute("class", "yui3-seriesmarker");
        areaNode.setAttribute("id", "hotSpot_" + seriesIndex + "_" + index);
        areaNode.setAttribute("shape", "polygon");
        areaNode.setAttribute("coords", pts);
        this._areaNodes.push(areaNode);

    },

    /**
     * Resizes and positions markers based on a mouse interaction.
     *
     * @protected
     * @method updateMarkerState
     * @param {String} type state of the marker
     * @param {Number} i index of the marker
     */
    updateMarkerState: function(type, i)
    {
        if(this._markers[i])
        {
            var state = this._getState(type),
                markerStyles,
                indexStyles,
                marker = this._markers[i],
                styles = this.get("styles").marker; 
            markerStyles = state == "off" || !styles[state] ? styles : styles[state]; 
            indexStyles = this._mergeStyles(markerStyles, {});
            indexStyles.fill.color = indexStyles.fill.colors[i % indexStyles.fill.colors.length];
            indexStyles.fill.alpha = indexStyles.fill.alphas[i % indexStyles.fill.alphas.length];
            marker.set(indexStyles);
        }
    },
    
    /**
     * Creates a shape to be used as a marker.
     *
     * @method _createMarker
     * @param {Object} styles Hash of style properties.
     * @param {Number} order Order of the series.
     * @param {Number} index Index within the series associated with the marker.
     * @return Shape
     * @private
     */
    _createMarker: function(styles, order, index)
    {
        var graphic = this.get("graphic"),
            marker,
            cfg = Y.clone(styles);
        graphic.set("autoDraw", false);
        marker = graphic.getShape(cfg); 
        marker.addClass("yui3-seriesmarker");
        return marker;
    },
    
    /**
     * @private
     */
    _clearMarkerCache: function()
    {
        var len = this._markerCache.length,
            i = 0,
            marker;
        for(; i < len; ++i)
        {
            marker = this._markerCache[i];
            if(marker)
            {
                marker.destroy();
            }
        }
        this._markerCache = [];
    },

    /**
     * @private
     */
    _getPlotDefaults: function()
    {
         var defs = {
            padding:{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            },
            fill:{
                alphas:["1"]
            },
            border: {
                weight: 0,
                alpha: 1
            }
        };
        defs.fill.colors = this._defaultSliceColors;
        defs.border.colors = this._defaultBorderColors;
        return defs;
    },

    /**
     * @private
     */
    _defaultLineColors:["#426ab3", "#d09b2c", "#000000", "#b82837", "#b384b5", "#ff7200", "#779de3", "#cbc8ba", "#7ed7a6", "#007a6c"],

    /**
     * @private
     */
    _defaultFillColors:["#6084d0", "#eeb647", "#6c6b5f", "#d6484f", "#ce9ed1", "#ff9f3b", "#93b7ff", "#e0ddd0", "#94ecba", "#309687"],
    
    /**
     * @private
     */
    _defaultBorderColors:["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"],
    
    /**
     * @private
     */
    _defaultSliceColors: ["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"],

    /**
     * @private
     * @description Colors used if style colors are not specified
     */
    _getDefaultColor: function(index, type)
    {
        var colors = {
                line: this._defaultLineColors,
                fill: this._defaultFillColors,
                border: this._defaultBorderColors,
                slice: this._defaultSliceColors
            },
            col = colors[type],
            l = col.length;
        index = index || 0;
        if(index >= l)
        {
            index = index % l;
        }
        type = type || "fill";
        return colors[type][index];
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default pie
         */
        type: {		
            value: "pie"
        },
        
        /**
         * Order of this instance of this <code>type</code>.
         *
         * @attribute order
         * @type Number
         */
        order: {},

        /**
         * Reference to the <code>Graph</code> in which the series is drawn into.
         *
         * @attribute graph
         * @type Graph
         */
        graph: {},
        
        /**
         * Reference to the <code>Axis</code> instance used for assigning 
         * category values to the graph.
         *
         * @attribute categoryAxis
         * @type Axis
         */
        categoryAxis: {
            value: null,

            validator: function(value)
            {
                return value !== this.get("categoryAxis");
            }
        },
        
        /**
         * Reference to the <code>Axis</code> instance used for assigning 
         * series values to the graph.
         *
         * @attribute categoryAxis
         * @type Axis
         */
        valueAxis: {
            value: null,

            validator: function(value)
            {
                return value !== this.get("valueAxis");
            }
        },

        /**
         * Indicates which array to from the hash of value arrays in 
         * the category <code>Axis</code> instance.
         */
        categoryKey: {
            value: null,

            validator: function(value)
            {
                return value !== this.get("categoryKey");
            }
        },
        /**
         * Indicates which array to from the hash of value arrays in 
         * the value <code>Axis</code> instance.
         */
        valueKey: {
            value: null,

            validator: function(value)
            {
                return value !== this.get("valueKey");
            }
        },

        /**
         * Name used for for displaying category data
         *
         * @attribute categoryDisplayName
         * @type String
         */
        categoryDisplayName: {
            setter: function(val)
            {
                this._categoryDisplayName = val;
                return val;
            },

            getter: function()
            {
                return this._categoryDisplayName || this.get("categoryKey");
            }
        },

        /**
         * Name used for for displaying value data
         *
         * @attribute valueDisplayName
         * @type String
         */
        valueDisplayName: {
            setter: function(val)
            {
                this._valueDisplayName = val;
                return val;
            },

            getter: function()
            {
                return this._valueDisplayName || this.get("valueKey");
            }
        },
        
        /**
         * @private
         */
        slices: null
        
        /**
         * Style properties used for drawing markers. This attribute is inherited from <code>MarkerSeries</code>. Below are the default values:
         *  <dl>
         *      <dt>fill</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>colors</dt><dd>An array of colors to be used for the marker fills. The color for each marker is retrieved from the 
         *              array below:<br/>
         *              <code>["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"]</code>
         *              </dd>
         *              <dt>alphas</dt><dd>An array of alpha references (Number from 0 to 1) indicating the opacity of each marker fill. The default value is [1].</dd>
         *          </dl>
         *      </dd>
         *      <dt>border</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>An array of colors to be used for the marker borders. The color for each marker is retrieved from the
         *              array below:<br/>
         *              <code>["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"]</code>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>
         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a <code>mouseover</code> event. The default 
         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,
         *      the default value for <code>marker.over.fill.color</code> is equivalent to <code>marker.fill.color</code>.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});
/**
 * Gridlines draws gridlines on a Graph.
 *
 * @class Gridlines
 * @constructor
 * @extends Base
 * @uses Renderer
 */
Y.Gridlines = Y.Base.create("gridlines", Y.Base, [Y.Renderer], {
    _path: null,

    /**
     * @private
     */
    remove: function()
    {
        var path = this._path;
        if(path)
        {
            path.destroy();
        }
    },

    /**
     * @protected
     *
     * Draws the gridlines
     *
     * @method draw
     */
    draw: function()
    {
        if(this.get("axis") && this.get("graph"))
        {
            this._drawGridlines();
        }
    },

    /**
     * @private
     */
    _drawGridlines: function()
    {
        var path,
            axis = this.get("axis"),
            axisPosition = axis.get("position"),
            points,
            i = 0,
            l,
            direction = this.get("direction"),
            graph = this.get("graph"),
            w = graph.get("width"),
            h = graph.get("height"),
            line = this.get("styles").line,
            color = line.color,
            weight = line.weight,
            alpha = line.alpha,
            lineFunction = direction == "vertical" ? this._verticalLine : this._horizontalLine;
        if(axisPosition == "none")
        {
            points = [];
            l = axis.get("styles").majorUnit.count;
            for(; i < l; ++i)
            {
                points[i] = {
                    x: w * (i/(l-1)),
                    y: h * (i/(l-1))
                };
            }
            i = 0;
        }
        else
        {
            points = axis.get("tickPoints");
            l = points.length;
        }
        path = graph.get("gridlines");
        path.set("width", w);
        path.set("height", h);
        path.set("stroke", {
            weight: weight,
            color: color,
            opacity: alpha
        });
        for(; i < l; ++i)
        {
            lineFunction(path, points[i], w, h);
        }
        path.end();
    },

    /**
     * @private
     */
    _horizontalLine: function(path, pt, w, h)
    {
        path.moveTo(0, pt.y);
        path.lineTo(w, pt.y);
    },

    /**
     * @private
     */
    _verticalLine: function(path, pt, w, h)
    {
        path.moveTo(pt.x, 0);
        path.lineTo(pt.x, h);
    },
    
    /**
     * @protected
     *
     * Gets the default value for the <code>styles</code> attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     */
    _getDefaultStyles: function()
    {
        var defs = {
            line: {
                color:"#f0efe9",
                weight: 1,
                alpha: 1
            }
        };
        return defs;
    }

},
{
    ATTRS: {
        /**
         * Indicates the direction of the gridline.
         *
         * @attribute direction
         * @type String
         */
        direction: {},
        
        /**
         * Indicate the <code>Axis</code> in which to bind
         * the gridlines.
         *
         * @attribute axis
         * @type Axis
         */
        axis: {},
        
        /**
         * Indicates the <code>Graph</code> in which the gridlines 
         * are drawn.
         *
         * @attribute graph
         * @type Graph
         */
        graph: {}
    }
});
/**
 * Graph manages and contains series instances for a <code>CartesianChart</code>
 * instance.
 *
 * @class Graph
 * @constructor
 * @extends Widget
 * @uses Renderer
 */
Y.Graph = Y.Base.create("graph", Y.Widget, [Y.Renderer], {
    bindUI: function()
    {
        var bb = this.get("boundingBox");
        bb.setStyle("position", "absolute");
        this.after("widthChange", this._sizeChangeHandler);
        this.after("heightChange", this._sizeChangeHandler);
        this.after("stylesChange", this._updateStyles);
    },

    /**
     * @private
     */
    syncUI: function()
    {
        var graphic,
            background,
            path,
            cb,
            bg,
            border,
            weight,
            w,
            h,
            sc = this.get("seriesCollection"),
            series,
            i = 0,
            len = sc.length,
            hgl = this.get("horizontalGridlines"),
            vgl = this.get("verticalGridlines");
        if(this.get("showBackground"))
        {
            background = this.get("background");
            cb = this.get("contentBox");
            bg = this.get("styles").background;
            bg.stroke = bg.border;
            bg.stroke.opacity = bg.stroke.alpha;
            bg.fill.opacity = bg.fill.alpha;
            bg.width = this.get("width");
            bg.height = this.get("height");
            bg.type = bg.shape;
            background.set(bg);
        }
        for(; i < len; ++i)
        {
            series = sc[i];
            if(series instanceof Y.CartesianSeries)
            {
                series.render();
            }
        }
        if(hgl && hgl instanceof Y.Gridlines)
        {
            hgl.draw();
        }
        if(vgl && vgl instanceof Y.Gridlines)
        {
            vgl.draw();
        }
    },
   
    /**
     * @private
     * Hash of arrays containing series mapped to a series type.
     */
    seriesTypes: null,

    /**
     * Returns a series instance based on an index.
     * 
     * @method getSeriesByIndex
     * @param {Number} val index of the series
     * @return CartesianSeries
     */
    getSeriesByIndex: function(val)
    {
        var col = this.get("seriesCollection"),
            series;
        if(col && col.length > val)
        {
            series = col[val];
        }
        return series;
    },

    /**
     * Returns a series instance based on a key value.
     * 
     * @method getSeriesByKey
     * @param {String} val key value of the series
     * @return CartesianSeries
     */
    getSeriesByKey: function(val)
    {
        var obj = this._seriesDictionary,
            series;
        if(obj && obj.hasOwnProperty(val))
        {
            series = obj[val];
        }
        return series;
    },

    /**
     * @protected
     * Adds dispatcher to a <code>_dispatcher</code> used to
     * to ensure all series have redrawn before for firing event.
     *
     * @method addDispatcher
     * @param {CartesianSeries} val series instance to add
     */
    addDispatcher: function(val)
    {
        if(!this._dispatchers)
        {
            this._dispatchers = [];
        }
        this._dispatchers.push(val);
    },

    /**
     * @private 
     * @description Collection of series to be displayed in the graph.
     */
    _seriesCollection: null,
    
    /**
     * @private
     */
    _seriesDictionary: null,

    /**
     * @private
     * Parses series instances to be displayed in the graph.
     */
    _parseSeriesCollection: function(val)
    {
        if(!val)
        {
            return;
        }	
        var len = val.length,
            i = 0,
            series,
            seriesKey;
        if(!this.get("seriesCollection"))
        {
            this._seriesCollection = [];
        }
        if(!this._seriesDictionary)
        {
            this._seriesDictionary = {};
        }
        if(!this.seriesTypes)
        {
            this.seriesTypes = [];
        }
        for(; i < len; ++i)
        {	
            series = val[i];
            if(!(series instanceof Y.CartesianSeries) && !(series instanceof Y.PieSeries))
            {
                this._createSeries(series);
                continue;
            }
            this._addSeries(series);
        }
        len = this.get("seriesCollection").length;
        for(i = 0; i < len; ++i)
        {
            series = this.get("seriesCollection")[i];
            seriesKey = series.get("direction") == "horizontal" ? "yKey" : "xKey";
            this._seriesDictionary[series.get(seriesKey)] = series;
        }
    },

    /**
     * @private
     * Adds a series to the graph.
     */
    _addSeries: function(series)
    {
        var type = series.get("type"),
            seriesCollection = this.get("seriesCollection"),
            graphSeriesLength = seriesCollection.length,
            seriesTypes = this.seriesTypes,
            typeSeriesCollection;	
        if(!series.get("graph")) 
        {
            series.set("graph", this);
        }
        seriesCollection.push(series);
        if(!seriesTypes.hasOwnProperty(type))
        {
            this.seriesTypes[type] = [];
        }
        typeSeriesCollection = this.seriesTypes[type];
        series.set("graphOrder", graphSeriesLength);
        series.set("order", typeSeriesCollection.length);
        typeSeriesCollection.push(series);
        this.addDispatcher(series);
        series.after("drawingComplete", Y.bind(this._drawingCompleteHandler, this));
        this.fire("seriesAdded", series);
    },

    /**
     * @private
     */
    _createSeries: function(seriesData)
    {
        var type = seriesData.type,
            seriesCollection = this.get("seriesCollection"),
            seriesTypes = this.seriesTypes,
            typeSeriesCollection,
            seriesType,
            series;
            seriesData.graph = this;
        if(!seriesTypes.hasOwnProperty(type))
        {
            seriesTypes[type] = [];
        }
        typeSeriesCollection = seriesTypes[type];
        seriesData.graph = this;
        seriesData.order = typeSeriesCollection.length;
        seriesData.graphOrder = seriesCollection.length;
        seriesType = this._getSeries(seriesData.type);
        series = new seriesType(seriesData);
        this.addDispatcher(series);
        series.after("drawingComplete", Y.bind(this._drawingCompleteHandler, this));
        typeSeriesCollection.push(series);
        seriesCollection.push(series);
    },

    /**
     * @private
     */
    _getSeries: function(type)
    {
        var seriesClass;
        switch(type)
        {
            case "line" :
                seriesClass = Y.LineSeries;
            break;
            case "column" :
                seriesClass = Y.ColumnSeries;
            break;
            case "bar" :
                seriesClass = Y.BarSeries;
            break;
            case "area" : 
                seriesClass = Y.AreaSeries;
            break;
            case "candlestick" :
                seriesClass = Y.CandlestickSeries;
            break;
            case "ohlc" :
                seriesClass = Y.OHLCSeries;
            break;
            case "stackedarea" :
                seriesClass = Y.StackedAreaSeries;
            break;
            case "stackedline" :
                seriesClass = Y.StackedLineSeries;
            break;
            case "stackedcolumn" :
                seriesClass = Y.StackedColumnSeries;
            break;
            case "stackedbar" :
                seriesClass = Y.StackedBarSeries;
            break;
            case "markerseries" :
                seriesClass = Y.MarkerSeries;
            break;
            case "spline" :
                seriesClass = Y.SplineSeries;
            break;
            case "areaspline" :
                seriesClass = Y.AreaSplineSeries;
            break;
            case "stackedspline" :
                seriesClass = Y.StackedSplineSeries;
            break;
            case "stackedareaspline" :
                seriesClass = Y.StackedAreaSplineSeries;
            break;
            case "stackedmarkerseries" :
                seriesClass = Y.StackedMarkerSeries;
            break;
            case "pie" :
                seriesClass = Y.PieSeries;
            break;
            case "combo" :
                seriesClass = Y.ComboSeries;
            break;
            case "stackedcombo" :
                seriesClass = Y.StackedComboSeries;
            break;
            case "combospline" :
                seriesClass = Y.ComboSplineSeries;
            break;
            case "stackedcombospline" :
                seriesClass = Y.StackedComboSplineSeries;
            break;
            default:
                seriesClass = Y.CartesianSeries;
            break;
        }
        return seriesClass;
    },

    /**
     * @private
     */
    _markerEventHandler: function(e)
    {
        var type = e.type,
            markerNode = e.currentTarget,
            strArr = markerNode.getAttribute("id").split("_"),
            series = this.getSeriesByIndex(strArr[1]),
            index = strArr[2];
        series.updateMarkerState(type, index);
    },

    /**
     * @private
     */
    _dispatchers: null,

    /**
     * @private
     */
    _updateStyles: function()
    {
        var styles = this.get("styles").background,
            border = styles.border;
            border.opacity = border.alpha;
            styles.stroke = border;
            styles.fill.opacity = styles.fill.alpha;
        this.get("background").set(styles);
        this._sizeChangeHandler();
    },

    /**
     * @private
     */
    _sizeChangeHandler: function(e)
    {
        var hgl = this.get("horizontalGridlines"),
            vgl = this.get("verticalGridlines"),
            w = this.get("width"),
            h = this.get("height"),
            x = 0,
            y = 0,
            bg = this.get("styles").background,
            weight,
            background;
        if(bg && bg.border)
        {
            weight = bg.border.weight || 0;
        }
        if(this.get("showBackground"))
        {
            background = this.get("background");
            if(w && h)
            {
                background.set("width", w);
                background.set("height", h);
            }
        }
        if(this._gridlines)
        {
            this._gridlines.clear();
        }
        if(hgl && hgl instanceof Y.Gridlines)
        {
            hgl.draw();
        }
        if(vgl && vgl instanceof Y.Gridlines)
        {
            vgl.draw();
        }
        this._drawSeries();
    },

    /**
     * @private
     */
    _drawSeries: function()
    {
        if(this._drawing)
        {
            this._callLater = true;
            return;
        }
        var sc,
            i,
            len,
            graphic = this.get("graphic");
        graphic.set("autoDraw", false);
        this._callLater = false;
        this._drawing = true;
        sc = this.get("seriesCollection");
        i = 0;
        len = sc.length;
        for(; i < len; ++i)
        {
            sc[i].draw();
            if(!sc[i].get("xcoords") || !sc[i].get("ycoords"))
            {
                this._callLater = true;
                break;
            }
        }
        this._drawing = false;
        if(this._callLater)
        {
            this._drawSeries();
        }
    },  

    /**
     * @private
     */
    _drawingCompleteHandler: function(e)
    {
        var series = e.currentTarget,
            index = Y.Array.indexOf(this._dispatchers, series);
        if(index > -1)
        {
            this._dispatchers.splice(index, 1);
        }
        if(this._dispatchers.length < 1)
        {
            var graphic = this.get("graphic");
            if(!graphic.get("autoDraw"))
            {
                graphic._redraw();
            }
            this.fire("chartRendered");
        }
    },

    /**
     * @protected
     *
     * Gets the default value for the <code>styles</code> attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     */
    _getDefaultStyles: function()
    {
        var defs = {
            background: {
                shape: "rect",
                fill:{
                    color:"#faf9f2"
                },
                border: {
                    color:"#dad8c9",
                    weight: 1
                }
            }
        };
        return defs;
    }
}, {
    ATTRS: {
        /**
         * Collection of series. When setting the <code>seriesCollection</code> the array can contain a combination of either
         * <code>CartesianSeries</code> instances or object literals with properties that will define a series.
         *
         * @attribute seriesCollection
         * @type CartesianSeries
         */
        seriesCollection: {
            getter: function()
            {
                return this._seriesCollection;
            },

            setter: function(val)
            {
                this._parseSeriesCollection(val);
                return this._seriesCollection;
            }
        },
       
        /**
         * Indicates whether the <code>Graph</code> has a background.
         *
         * @attribute showBackground
         * @type Boolean
         * @default true
         */
        showBackground: {
            value: true
        },

        /**
         * Read-only hash lookup for all series on in the <code>Graph</code>.
         *
         * @attribute seriesDictionary
         * @type Object
         */
        seriesDictionary: {
            readOnly: true,

            getter: function()
            {
                return this._seriesDictionary;
            }
        },

        /**
         * Reference to the horizontal <code>Gridlines</code> instance.
         *
         * @attribute horizontalGridlines
         * @type Gridlines
         * @default null
         */
        horizontalGridlines: {
            value: null,

            setter: function(val)
            {
                var gl = this.get("horizontalGridlines");
                if(gl && gl instanceof Y.Gridlines)
                {
                    gl.remove();
                }
                if(val instanceof Y.Gridlines)
                {
                    gl = val;
                    val.set("graph", this);
                    return val;
                }
                else if(val && val.axis)
                {
                    gl = new Y.Gridlines({direction:"horizontal", axis:val.axis, graph:this, styles:val.styles});
                    return gl;
                }
            }
        },
        
        /**
         * Reference to the vertical <code>Gridlines</code> instance.
         *
         * @attribute verticalGridlines
         * @type Gridlines
         * @default null
         */
        verticalGridlines: {
            value: null,

            setter: function(val)
            {
                var gl = this.get("verticalGridlines");
                if(gl && gl instanceof Y.Gridlines)
                {
                    gl.remove();
                }
                if(val instanceof Y.Gridlines)
                {
                    gl = val;
                    val.set("graph", this);
                    return val;
                }
                else if(val && val.axis)
                {
                    gl = new Y.Gridlines({direction:"vertical", axis:val.axis, graph:this, styles:val.styles});
                    return gl;
                }
            }
        },

        /**
         * Reference to graphic instance used for the background.
         *
         * @attribute background
         * @type Graphic
         * @readOnly
         */
        background: {
            getter: function()
            {
                if(!this._background)
                {
                    this._backgroundGraphic = new Y.Graphic({render:this.get("contentBox")});
                    this._backgroundGraphic.get("node").style.zIndex = -2;
                    this._background = this._backgroundGraphic.getShape({type: "rect"});
                }
                return this._background;
            }
        },

        /**
         * Reference to graphic instance used for gridlines.
         *
         * @attribute gridlines
         * @type Graphic
         * @readOnly
         */
        gridlines: {
            readOnly: true,

            getter: function()
            {
                if(!this._gridlines)
                {
                    this._gridlinesGraphic = new Y.Graphic({render:this.get("contentBox")});
                    this._gridlinesGraphic.get("node").style.zIndex = -1;
                    this._gridlines = this._gridlinesGraphic.getShape({type: "path"});
                }
                return this._gridlines;
            }
        },
        
        /**
         * Reference to graphic instance used for series.
         *
         * @attribute graphic
         * @type Graphic
         * @readOnly
         */
        graphic: {
            readOnly: true,

            getter: function() 
            {
                if(!this._graphic)
                {
                    this._graphic = new Y.Graphic({render:this.get("contentBox")});
                    this._graphic.set("autoDraw", false);
                }
                return this._graphic;
            }
        }

        /**
         * Style properties used for drawing a background. Below are the default values:
         *  <dl>
         *      <dt>background</dt><dd>An object containing the following values:
         *          <dl>
         *              <dt>fill</dt><dd>Defines the style properties for the fill. Contains the following values:
         *                  <dl>
         *                      <dt>color</dt><dd>Color of the fill. The default value is #faf9f2.</dd>
         *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the background fill. The default value is 1.</dd>
         *                  </dl>
         *              </dd>
         *              <dt>border</dt><dd>Defines the style properties for the border. Contains the following values:
         *                  <dl>
         *                      <dt>color</dt><dd>Color of the border. The default value is #dad8c9.</dd>
         *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the background border. The default value is 1.</dd>
         *                      <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>
         *                  </dl>
         *              </dd>
         *          </dl>
         *      </dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});
/**
 * The ChartBase class is an abstract class used to create charts.
 *
 * @class ChartBase
 * @constructor
 */
function ChartBase() {}

ChartBase.ATTRS = {
    /**
     * Reference to the default tooltip available for the chart.
     * <p>Contains the following properties:</p>
     *  <dl>
     *      <dt>node</dt><dd>Reference to the actual dom node</dd>
     *      <dt>showEvent</dt><dd>Event that should trigger the tooltip</dd>
     *      <dt>hideEvent</dt><dd>Event that should trigger the removal of a tooltip (can be an event or an array of events)</dd>
     *      <dt>styles</dt><dd>A hash of style properties that will be applied to the tooltip node</dd>
     *      <dt>show</dt><dd>Indicates whether or not to show the tooltip</dd>
     *      <dt>markerEventHandler</dt><dd>Displays and hides tooltip based on marker events</dd>
     *      <dt>planarEventHandler</dt><dd>Displays and hides tooltip based on planar events</dd>
     *      <dt>markerLabelFunction</dt><dd>Reference to the function used to format a marker event triggered tooltip's text</dd>
     *      <dt>planarLabelFunction</dt><dd>Reference to the function used to format a planar event triggered tooltip's text</dd>
     *  </dl>
     * @attribute tooltip
     * @type Object
     */
    tooltip: {
        valueFn: "_getTooltip",

        setter: function(val)
        {
            return this._updateTooltip(val);
        }
    },

    /** 
     * The key value used for the chart's category axis. 
     *
     * @attribute categoryKey
     * @type String
     * @default category
     */
    categoryKey: {
        value: "category"
    },
        
    /**
     * Indicates the type of axis to use for the category axis.
     *
     *  <dl>
     *      <dt>category</dt><dd>Specifies a <code>CategoryAxis</code>.</dd>
     *      <dt>time</dt><dd>Specifies a <code>TimeAxis</dd>
     *  </dl>
     *
     * @attribute categoryType
     * @type String
     * @default category
     */
    categoryType:{
        value:"category"
    },

    /**
     * Indicates the the type of interactions that will fire events.
     *
     *  <dl>
     *      <dt>marker</dt><dd>Events will be broadcasted when the mouse interacts with individual markers.</dd>
     *      <dt>planar</dt><dd>Events will be broadcasted when the mouse intersects the plane of any markers on the chart.</dd>
     *      <dt>none</dt><dd>No events will be broadcasted.</dd>
     *  </dl>
     *
     * @attribute interactionType
     * @type String
     * @default marker
     */
    interactionType: {
        value: "marker"
    },

    /**
     * Data used to generate the chart.
     * 
     * @attribute dataProvider
     * @type Array
     */
    dataProvider: {
        setter: function(val)
        {
            return this._setDataValues(val);
        }
    },
        
    /**
     * A collection of keys that map to the series axes. If no keys are set,
     * they will be generated automatically depending on the data structure passed into 
     * the chart.
     *
     * @attribute seriesKeys
     * @type Array
     */
    seriesKeys: {},

    /**
     * Reference to all the axes in the chart.
     *
     * @attribute axesCollection
     * @type Array
     */
    axesCollection: {},

    /**
     * Reference to graph instance.
     * 
     * @attribute graph
     * @type Graph 
     */
    graph: {
        valueFn: "_getGraph"
   }
};

ChartBase.prototype = {
    /**
     * @private
     * @description Default value function for the <code>graph</code> attribute.
     */
    _getGraph: function()
    {
        var graph = new Y.Graph();
        graph.after("chartRendered", Y.bind(function(e) {
            this.fire("chartRendered");
        }, this));
        return graph; 
    },

    /**
     * Returns a series instance by index or key value.
     *
     * @method getSeries
     * @param val
     * @return CartesianSeries
     */
    getSeries: function(val)
    {
        var series = null, 
            graph = this.get("graph");
        if(graph)
        {
            if(Y.Lang.isNumber(val))
            {
                series = graph.getSeriesByIndex(val);
            }
            else
            {
                series = graph.getSeriesByKey(val);
            }
        }
        return series;
    },

    /**
     * Returns an <code>Axis</code> instance by key reference. If the axis was explicitly set through the <code>axes</code> attribute,
     * the key will be the same as the key used in the <code>axes</code> object. For default axes, the key for
     * the category axis is the value of the <code>categoryKey</code> (<code>category</code>). For the value axis, the default 
     * key is <code>values</code>.
     *
     * @method getAxisByKey
     * @param {String} val Key reference used to look up the axis.
     * @return Axis
     */
    getAxisByKey: function(val)
    {
        var axis,
            axes = this.get("axes");
        if(axes.hasOwnProperty(val))
        {
            axis = axes[val];
        }
        return axis;
    },

    /**
     * Returns the category axis for the chart.
     *
     * @method getCategoryAxis
     * @return Axis
     */
    getCategoryAxis: function()
    {
        var axis,
            key = this.get("categoryKey"),
            axes = this.get("axes");
        if(axes.hasOwnProperty(key))
        {
            axis = axes[key];
        }
        return axis;
    },

    /**
     * @private
     */
    _direction: "horizontal",
    
    /**
     * @private
     */
    _dataProvider: null,

    /**
     * @private
     */
    _setDataValues: function(val)
    {
        if(Y.Lang.isArray(val[0]))
        {
            var hash, 
                dp = [], 
                cats = val[0], 
                i = 0, 
                l = cats.length, 
                n, 
                sl = val.length;
            for(; i < l; ++i)
            {
                hash = {category:cats[i]};
                for(n = 1; n < sl; ++n)
                {
                    hash["series" + n] = val[n][i];
                }
                dp[i] = hash; 
            }
            return dp;
        }
        return val;
    },

    /**
     * @private 
     */
    _seriesCollection: null,

    /**
     * @private
     */
    _setSeriesCollection: function(val)
    {
        this._seriesCollection = val;
    },
    /**
     * @private
     */
    _getAxisClass: function(t)
    {
        return this._axisClass[t];
    },
  
    /**
     * @private
     */
    _axisClass: {
        stacked: Y.StackedAxis,
        numeric: Y.NumericAxis,
        category: Y.CategoryAxis,
        time: Y.TimeAxis
    },

    /**
     * @private
     */
    _axes: null,

    /**
     * @private
     */
    renderUI: function()
    {
        var tt = this.get("tooltip");
        //move the position = absolute logic to a class file
        this.get("boundingBox").setStyle("position", "absolute");
        this.get("contentBox").setStyle("position", "absolute");
        this._addAxes();
        this._addSeries();
        if(tt && tt.show)
        {
            this._addTooltip();
        }
        this._redraw();
    },
    
    /**
     * @private
     */
    bindUI: function()
    {
        this.after("tooltipChange", Y.bind(this._tooltipChangeHandler, this));
        this.after("widthChange", this._sizeChanged);
        this.after("heightChange", this._sizeChanged);
        this.after("dataProviderChange", this._dataProviderChangeHandler);
        var tt = this.get("tooltip"),
            hideEvent = "mouseout",
            showEvent = "mouseover",
            cb = this.get("contentBox"),
            interactionType = this.get("interactionType"),
            i = 0,
            len;
        if(interactionType == "marker")
        {
            hideEvent = tt.hideEvent;
            showEvent = tt.showEvent;
            Y.delegate("mouseenter", Y.bind(this._markerEventDispatcher, this), cb, ".yui3-seriesmarker");
            Y.delegate("mousedown", Y.bind(this._markerEventDispatcher, this), cb, ".yui3-seriesmarker");
            Y.delegate("mouseup", Y.bind(this._markerEventDispatcher, this), cb, ".yui3-seriesmarker");
            Y.delegate("mouseleave", Y.bind(this._markerEventDispatcher, this), cb, ".yui3-seriesmarker");
            Y.delegate("click", Y.bind(this._markerEventDispatcher, this), cb, ".yui3-seriesmarker");
            Y.delegate("mousemove", Y.bind(this._positionTooltip, this), cb, ".yui3-seriesmarker");
        }
        else if(interactionType == "planar")
        {
            this._overlay.on("mousemove", Y.bind(this._planarEventDispatcher, this));
            this.on("mouseout", this.hideTooltip);
        }
        if(tt)
        {
            if(hideEvent && showEvent && hideEvent == showEvent)
            {
                this.on(interactionType + "Event:" + hideEvent, this.toggleTooltip);
            }
            else
            {
                if(showEvent)
                {
                    this.on(interactionType + "Event:" + showEvent, tt[interactionType + "EventHandler"]);
                }
                if(hideEvent)
                {
                    if(Y.Lang.isArray(hideEvent))
                    {
                        len = hideEvent.length;
                        for(; i < len; ++i)
                        {
                            this.on(interactionType + "Event:" + hideEvent[i], this.hideTooltip);
                        }
                    }
                    this.on(interactionType + "Event:" + hideEvent, this.hideTooltip);
                }
            }
        }
    },
    
    /**
     * @private
     */
    _markerEventDispatcher: function(e)
    {
        var type = e.type,
            cb = this.get("contentBox"),
            markerNode = e.currentTarget,
            strArr = markerNode.getAttribute("id").split("_"),
            seriesIndex = strArr[1],
            series = this.getSeries(parseInt(seriesIndex, 10)),
            index = strArr[2],
            items = this.getSeriesItems(series, index),
            x = e.pageX - cb.getX(),
            y = e.pageY - cb.getY();
        if(type == "mouseenter")
        {
            type = "mouseover";
        }
        else if(type == "mouseleave")
        {
            type = "mouseout";
        }
        series.updateMarkerState(type, index);
        e.halt();
        /**
         * Broadcasts when <code>interactionType</code> is set to <code>marker</code> and a series marker has received a mouseover event.
         * 
         *
         * @event markerEvent:mouseover
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category <code>Axis</code>.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value <code>Axis</code>.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The <code>order</code> of the marker's series.</dd>
         *  </dl>
         */
        /**
         * Broadcasts when <code>interactionType</code> is set to <code>marker</code> and a series marker has received a mouseout event.
         *
         * @event markerEvent:mouseout
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category <code>Axis</code>.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value <code>Axis</code>.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The <code>order</code> of the marker's series.</dd>
         *  </dl>
         */
        /**
         * Broadcasts when <code>interactionType</code> is set to <code>marker</code> and a series marker has received a mousedown event.
         *
         * @event markerEvent:mousedown
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category <code>Axis</code>.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value <code>Axis</code>.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The <code>order</code> of the marker's series.</dd>
         *  </dl>
         */
        /**
         * Broadcasts when <code>interactionType</code> is set to <code>marker</code> and a series marker has received a mouseup event.
         *
         * @event markerEvent:mouseup
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category <code>Axis</code>.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value <code>Axis</code>.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The <code>order</code> of the marker's series.</dd>
         *  </dl>
         */
        /**
         * Broadcasts when <code>interactionType</code> is set to <code>marker</code> and a series marker has received a click event.
         *
         * @event markerEvent:click
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category <code>Axis</code>.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value <code>Axis</code>.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The <code>order</code> of the marker's series.</dd>
         *  </dl>
         */
        this.fire("markerEvent:" + type, {categoryItem:items.category, valueItem:items.value, node:markerNode, x:x, y:y, series:series, index:index, seriesIndex:seriesIndex});
    },

    /**
     * @private
     */
    _dataProviderChangeHandler: function(e)
    {
        var dataProvider = this.get("dataProvider"),
            axes = this.get("axes"),
            i,
            axis;
        for(i in axes)
        {
            if(axes.hasOwnProperty(i))
            {
                axis = axes[i];
                if(axis instanceof Y.Axis)
                {
                    axis.set("dataProvider", dataProvider);
                }
            }
        }
    },
    
    /**
     * Event listener for toggling the tooltip. If a tooltip is visible, hide it. If not, it 
     * will create and show a tooltip based on the event object.
     * 
     * @method toggleTooltip
     */
    toggleTooltip: function(e)
    {
        var tt = this.get("tooltip");
        if(tt.visible)
        {
            this.hideTooltip();
        }
        else
        {
            tt.markerEventHandler.apply(this, [e]);
        }
    },

    /**
     * @private
     */
    _showTooltip: function(msg, x, y)
    {
        var tt = this.get("tooltip"),
            node = tt.node;
        if(msg)
        {
            tt.visible = true;
            node.set("innerHTML", msg);
            node.setStyle("top", y + "px");
            node.setStyle("left", x + "px");
            node.setStyle("visibility", "visible");
        }
    },

    /**
     * @private
     */
    _positionTooltip: function(e)
    {
        var tt = this.get("tooltip"),
            node = tt.node,
            cb = this.get("contentBox"),
            x = (e.pageX + 10) - cb.getX(),
            y = (e.pageY + 10) - cb.getY();
        if(node)
        {
            node.setStyle("left", x + "px");
            node.setStyle("top", y + "px");
        }
    },

    /**
     * Hides the default tooltip
     */
    hideTooltip: function()
    {
        var tt = this.get("tooltip"),
            node = tt.node;
        tt.visible = false;
        node.set("innerHTML", "");
        node.setStyle("left", -10000);
        node.setStyle("top", -10000);
        node.setStyle("visibility", "hidden");
    },

    /**
     * @private
     */
    _addTooltip: function()
    {
        var tt = this.get("tooltip"),
            id = this.get("id") + "_tooltip",
            cb = this.get("contentBox"),
            oldNode = document.getElementById(id);
        if(oldNode)
        {
            cb.removeChild(oldNode);
        }
        tt.node.setAttribute("id", id);
        tt.node.setStyle("visibility", "hidden");
        cb.appendChild(tt.node);
    },

    /**
     * @private
     */
    _updateTooltip: function(val)
    {
        var tt = this._tooltip,
            i,
            styles,
            node,
            props = {
                markerLabelFunction:"markerLabelFunction",
                planarLabelFunction:"planarLabelFunction",
                showEvent:"showEvent",
                hideEvent:"hideEvent",
                markerEventHandler:"markerEventHandler",
                planarEventHandler:"planarEventHandler",
                show:"show"
            };
        if(Y.Lang.isObject(val))
        {
            styles = val.styles;
            node = Y.one(val.node) || tt.node;
            if(styles)
            {
                for(i in styles)
                {
                    if(styles.hasOwnProperty(i))
                    {
                        node.setStyle(i, styles[i]);
                    }
                }
            }
            for(i in props)
            {
                if(val.hasOwnProperty(i))
                {
                    tt[i] = val[i];
                }
            }
            tt.node = node;
        }
        return tt;
    },

    /**
     * @private
     */
    _getTooltip: function()
    {
        var node = document.createElement("div"),
            tt = {
                markerLabelFunction: this._tooltipLabelFunction,
                planarLabelFunction: this._planarLabelFunction,
                show: true,
                hideEvent: "mouseout",
                showEvent: "mouseover",
                markerEventHandler: function(e)
                {
                    var tt = this.get("tooltip"),
                    msg = tt.markerLabelFunction.apply(this, [e.categoryItem, e.valueItem, e.index, e.series, e.seriesIndex]);
                    this._showTooltip(msg, e.x + 10, e.y + 10);
                },
                planarEventHandler: function(e)
                {
                    var tt = this.get("tooltip"),
                        msg ,
                        categoryAxis = this.get("categoryAxis");
                    msg = tt.planarLabelFunction.apply(this, [categoryAxis, e.valueItem, e.index, e.items, e.seriesIndex]);
                    this._showTooltip(msg, e.x + 10, e.y + 10);
                }
            };
        node.setAttribute("id", this.get("id") + "_tooltip");
        node = Y.one(node);
        node.setStyle("fontSize", "85%");
        node.setStyle("opacity", "0.83");
        node.setStyle("position", "absolute");
        node.setStyle("paddingTop", "2px");
        node.setStyle("paddingRight", "5px");
        node.setStyle("paddingBottom", "4px");
        node.setStyle("paddingLeft", "2px");
        node.setStyle("backgroundColor", "#fff");
        node.setStyle("border", "1px solid #dbdccc");
        node.setStyle("pointerEvents", "none");
        node.setStyle("zIndex", 3);
        node.setStyle("whiteSpace", "noWrap");
        node.setStyle("visibility", "hidden");
        tt.node = Y.one(node);
        this._tooltip = tt;
        return tt;
    },

    /**
     * @private
     */
    _planarLabelFunction: function(categoryAxis, valueItems, index, seriesArray, seriesIndex)
    {
        var msg = "",
            valueItem,
            i = 0,
            len = seriesArray.length,
            axis,
            series;
        if(categoryAxis)
        {
            msg += categoryAxis.get("labelFunction").apply(this, [categoryAxis.getKeyValueAt(this.get("categoryKey"), index), categoryAxis.get("labelFormat")]);
        }

        for(; i < len; ++i)
        {
            series = seriesArray[i];
            if(series.get("visible"))
            {
                valueItem = valueItems[i];
                axis = valueItem.axis;
                msg += "<br/><span>" + valueItem.displayName + ": " + axis.get("labelFunction").apply(this, [axis.getKeyValueAt(valueItem.key, index), axis.get("labelFormat")]) + "</span>";
            }
        }
        return msg;
    },

    /**
     * @private
     */
    _tooltipLabelFunction: function(categoryItem, valueItem, itemIndex, series, seriesIndex)
    {
        var msg = categoryItem.displayName +
        ":&nbsp;" + categoryItem.axis.get("labelFunction").apply(this, [categoryItem.value, categoryItem.axis.get("labelFormat")]) + 
        "<br/>" + valueItem.displayName + 
        ":&nbsp;" + valueItem.axis.get("labelFunction").apply(this, [valueItem.value, valueItem.axis.get("labelFormat")]);
        return msg; 
    },

    /**
     * @private
     */
    _tooltipChangeHandler: function(e)
    {
        if(this.get("tooltip"))
        {
            var tt = this.get("tooltip"),
                node = tt.node,
                show = tt.show,
                cb = this.get("contentBox");
            if(node && show)
            {
                if(!cb.contains(node))
                {
                    this._addTooltip();
                }
            }
        }
    }
};
Y.ChartBase = ChartBase;
/**
 * The CartesianChart class creates a chart with horizontal and vertical axes.
 *
 * @class CartesianChart
 * @extends ChartBase
 * @constructor
 */
Y.CartesianChart = Y.Base.create("cartesianChart", Y.Widget, [Y.ChartBase], {
    /**
     * @private
     */
    renderUI: function()
    {
        var tt = this.get("tooltip"),
            overlay;
        //move the position = absolute logic to a class file
        this.get("boundingBox").setStyle("position", "absolute");
        this.get("contentBox").setStyle("position", "absolute");
        this._addAxes();
        this._addGridlines();
        this._addSeries();
        if(tt && tt.show)
        {
            this._addTooltip();
        }
        //If there is a style definition. Force them to set.
        this.get("styles");
        if(this.get("interactionType") == "planar")
        {
            overlay = document.createElement("div");
            this.get("contentBox").appendChild(overlay);
            this._overlay = Y.one(overlay); 
            this._overlay.setStyle("position", "absolute");
            this._overlay.setStyle("background", "#fff");
            this._overlay.setStyle("opacity", 0);
            this._overlay.addClass("yui3-overlay");
            this._overlay.setStyle("zIndex", 4);
        }
        this._redraw();
    },

    /**
     * @private
     */
    _planarEventDispatcher: function(e)
    {
        var graph = this.get("graph"),
            bb = this.get("boundingBox"),
            cb = graph.get("contentBox"),
            x = e.pageX,
            offsetX = x - cb.getX(),
            posX = x - bb.getX(),
            y = e.pageY,
            offsetY = y - cb.getY(),
            posY = y - bb.getY(),
            sc = graph.get("seriesCollection"),
            series,
            i = 0,
            index,
            oldIndex = this._selectedIndex,
            item,
            items = [],
            categoryItems = [],
            valueItems = [],
            direction = this.get("direction"),
            hasMarkers,
            coord = direction == "horizontal" ? offsetX : offsetY,
            //data columns and area data could be created on a graph level
            markerPlane = direction == "horizontal" ? sc[0].get("xMarkerPlane") : sc[0].get("yMarkerPlane"),
            len = markerPlane.length;
       for(; i < len; ++i)
       {
            if(coord <= markerPlane[i].end && coord >= markerPlane[i].start)
            {
                index = i;
                break;
            }
       }
       len = sc.length;
       for(i = 0; i < len; ++i)
       {
            series = sc[i];
            hasMarkers = series.get("markers");
            if(hasMarkers && !isNaN(oldIndex) && oldIndex > -1)
            {
                series.updateMarkerState("mouseout", oldIndex);
            }
            if(series.get("ycoords")[index] > -1)
            {
                if(hasMarkers && !isNaN(index) && index > -1)
                {
                    series.updateMarkerState("mouseover", index);
                }
                item = this.getSeriesItems(series, index);
                categoryItems.push(item.category);
                valueItems.push(item.value);
                items.push(series);
            }
                
        }
        this._selectedIndex = index;
        
        /**
         * Broadcasts when <code>interactionType</code> is set to <code>planar</code> and a series' marker plane has received a mouseover event.
         * 
         *
         * @event planarEvent:mouseover
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>An array of hashes, each containing information about the category <code>Axis</code> of each marker whose plane has been intersected.</dd>
         *      <dt>valueItem</dt><dd>An array of hashes, each containing information about the value <code>Axis</code> of each marker whose plane has been intersected.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>items</dt><dd>An array including all the series which contain a marker whose plane has been intersected.</dd>
         *      <dt>index</dt><dd>Index of the markers in their respective series.</dd>
         *  </dl>
         */
        /**
         * Broadcasts when <code>interactionType</code> is set to <code>planar</code> and a series' marker plane has received a mouseout event.
         *
         * @event planarEvent:mouseout
         * @preventable false
         * @param {EventFacade} e 
         */
        if(index > -1)
        {
            this.fire("planarEvent:mouseover", {categoryItem:categoryItems, valueItem:valueItems, x:posX, y:posY, items:items, index:index});
        }
        else
        {
            this.fire("planarEvent:mouseout");
        }
    },

    /**
     * @private
     */
    _type: "combo",

    /**
     * @private
     */
    _axesRenderQueue: null,

    /**
     * @private 
     */
    _addToAxesRenderQueue: function(axis)
    {
        if(!this._axesRenderQueue)
        {
            this._axesRenderQueue = [];
        }
        if(Y.Array.indexOf(this._axesRenderQueue, axis) < 0)
        {
            this._axesRenderQueue.push(axis);
        }
    },

    /**
     * @private
     */
    _getDefaultSeriesCollection: function(val)
    {
        var dir = this.get("direction"), 
            sc = val || [], 
            catAxis,
            valAxis,
            tempKeys = [],
            series,
            seriesKeys = this.get("seriesKeys").concat(),
            i,
            index,
            l,
            type = this.get("type"),
            key,
            catKey,
            seriesKey,
            graph,
            categoryKey = this.get("categoryKey"),
            showMarkers = this.get("showMarkers"),
            showAreaFill = this.get("showAreaFill"),
            showLines = this.get("showLines");
        if(dir == "vertical")
        {
            catAxis = "yAxis";
            catKey = "yKey";
            valAxis = "xAxis";
            seriesKey = "xKey";
        }
        else
        {
            catAxis = "xAxis";
            catKey = "xKey";
            valAxis = "yAxis";
            seriesKey = "yKey";
        }
        l = sc.length;
        for(i = 0; i < l; ++i)
        {
            key = this._getBaseAttribute(sc[i], seriesKey);
            if(key)
            {
                index = Y.Array.indexOf(seriesKeys, key);
                if(index > -1)
                {
                    seriesKeys.splice(index, 1);
                }
               tempKeys.push(key);
            }
        }
        if(seriesKeys.length > 0)
        {
            tempKeys = tempKeys.concat(seriesKeys);
        }
        l = tempKeys.length;
        for(i = 0; i < l; ++i)
        {
            series = sc[i] || {type:type};
            if(series instanceof Y.CartesianSeries)
            {
                this._parseSeriesAxes(series);
                continue;
            }
            
            series[catKey] = series[catKey] || categoryKey;
            series[seriesKey] = series[seriesKey] || seriesKeys.shift();
            series[catAxis] = this._getCategoryAxis();
            series[valAxis] = this._getSeriesAxis(series[seriesKey]);
            
            series.type = series.type || type;
            
            if((series.type == "combo" || series.type == "stackedcombo" || series.type == "combospline" || series.type == "stackedcombospline"))
            {
                if(showAreaFill !== null)
                {
                    series.showAreaFill = (series.showAreaFill !== null && series.showAreaFill !== undefined) ? series.showAreaFill : showAreaFill;
                }
                if(showMarkers !== null)
                {
                    series.showMarkers = (series.showMarkers !== null && series.showMarkers !== undefined) ? series.showMarkers : showMarkers;
                }
                if(showLines !== null)
                {
                    series.showLines = (series.showLines !== null && series.showLines !== undefined) ? series.showLines : showLines;
                }
            }
            sc[i] = series;
        }
        if(val)
        {
            graph = this.get("graph");
            graph.set("seriesCollection", sc);
            sc = graph.get("seriesCollection");
        }
        return sc;
    },

    /**
     * @private
     */
    _parseSeriesAxes: function(series)
    {
        var axes = this.get("axes"),
            xAxis = series.get("xAxis"),
            yAxis = series.get("yAxis"),
            YAxis = Y.Axis,
            axis;
        if(xAxis && !(xAxis instanceof YAxis) && Y.Lang.isString(xAxis) && axes.hasOwnProperty(xAxis))
        {
            axis = axes[xAxis];
            if(axis instanceof YAxis)
            {
                series.set("xAxis", axis);
            }
        }
        if(yAxis && !(yAxis instanceof YAxis) && Y.Lang.isString(yAxis) && axes.hasOwnProperty(yAxis))
        {   
            axis = axes[yAxis];
            if(axis instanceof YAxis)
            {
                series.set("yAxis", axis);
            }
        }

    },

    /**
     * @private
     */
    _getCategoryAxis: function()
    {
        var axis,
            axes = this.get("axes"),
            categoryAxisName = this.get("categoryAxisName") || this.get("categoryKey");
        axis = axes[categoryAxisName];
        return axis;
    },

    /**
     * @private
     */
    _getSeriesAxis:function(key, axisName)
    {
        var axes = this.get("axes"),
            i,
            keys,
            axis;
        if(axes)
        {
            if(axisName && axes.hasOwnProperty(axisName))
            {
                axis = axes[axisName];
            }
            else
            {
                for(i in axes)
                {
                    if(axes.hasOwnProperty(i))
                    {
                        keys = axes[i].get("keys");
                        if(keys && keys.hasOwnProperty(key))
                        {
                            axis = axes[i];
                            break;
                        }
                    }
                }
            }
        }
        return axis;
    },

    /**
     * @private
     * Gets an attribute from an object, using a getter for Base objects and a property for object
     * literals. Used for determining attributes from series/axis references which can be an actual class instance
     * or a hash of properties that will be used to create a class instance.
     */
    _getBaseAttribute: function(item, key)
    {
        if(item instanceof Y.Base)
        {
            return item.get(key);
        }
        if(item.hasOwnProperty(key))
        {
            return item[key];
        }
        return null;
    },

    /**
     * @private
     * Sets an attribute on an object, using a setter of Base objects and a property for object
     * literals. Used for setting attributes on a Base class, either directly or to be stored in an object literal
     * for use at instantiation.
     */
    _setBaseAttribute: function(item, key, value)
    {
        if(item instanceof Y.Base)
        {
            item.set(key, value);
        }
        else
        {
            item[key] = value;
        }
    },

    /**
     * @private
     * Creates Axis and Axis data classes based on hashes of properties.
     */
    _parseAxes: function(val)
    {
        var hash = this._getDefaultAxes(val),
            axes = {},
            axesAttrs = {
                edgeOffset: "edgeOffset", 
                position: "position",
                overlapGraph:"overlapGraph",
                labelFunction:"labelFunction",
                labelFunctionScope:"labelFunctionScope",
                labelFormat:"labelFormat",
                maximum:"maximum",
                minimum:"minimum", 
                roundingMethod:"roundingMethod",
                alwaysShowZero:"alwaysShowZero"
            },
            dp = this.get("dataProvider"),
            ai,
            i, 
            pos, 
            axis,
            dh, 
            axisClass, 
            config,
            axesCollection;
        for(i in hash)
        {
            if(hash.hasOwnProperty(i))
            {
                dh = hash[i];
                if(dh instanceof Y.Axis)
                {
                    axis = dh;
                }
                else
                {
                    axisClass = this._getAxisClass(dh.type);
                    config = {};
                    config.dataProvider = dh.dataProvider || dp;
                    config.keys = dh.keys;
                    
                    if(dh.hasOwnProperty("roundingUnit"))
                    {
                        config.roundingUnit = dh.roundingUnit;
                    }
                    pos = dh.position;
                    if(dh.styles)
                    {
                        config.styles = dh.styles;
                    }
                    config.position = dh.position;
                    for(ai in axesAttrs)
                    {
                        if(axesAttrs.hasOwnProperty(ai) && dh.hasOwnProperty(ai))
                        {
                            config[ai] = dh[ai];
                        }
                    }
                    axis = new axisClass(config);
                }

                if(axis)
                {
                    axesCollection = this.get(pos + "AxesCollection");
                    if(axesCollection && Y.Array.indexOf(axesCollection, axis) > 0)
                    {
                        axis.set("overlapGraph", false);
                    }
                    axis.after("axisRendered", Y.bind(this._axisRendered, this));
                    axes[i] = axis;
                }
            }
        }
        return axes;
    },
    
    /**
     * @private
     */
    _addAxes: function()
    {
        var axes = this.get("axes"),
            i, 
            axis, 
            pos,
            w = this.get("width"),
            h = this.get("height"),
            node = Y.Node.one(this._parentNode);
        if(!this._axesCollection)
        {   
            this._axesCollection = [];
        }
        for(i in axes)
        {
            if(axes.hasOwnProperty(i))
            {
                axis = axes[i];
                if(axis instanceof Y.Axis)
                {
                    if(!w)
                    {
                        this.set("width", node.get("offsetWidth"));
                        w = this.get("width");
                    }
                    if(!h)
                    {
                        this.set("height", node.get("offsetHeight"));
                        h = this.get("height");
                    }
                    axis.set("width", w);
                    axis.set("height", h);
                    this._addToAxesRenderQueue(axis);
                    pos = axis.get("position");
                    if(!this.get(pos + "AxesCollection"))
                    {
                        this.set(pos + "AxesCollection", [axis]);
                    }
                    else
                    {
                        this.get(pos + "AxesCollection").push(axis);
                    }
                    this._axesCollection.push(axis);
                    if(axis.get("keys").hasOwnProperty(this.get("categoryKey")))
                    {
                        this.set("categoryAxis", axis);
                    }
                    axis.render(this.get("contentBox"));
                }
            }
        }
    },

    /**
     * @private
     */
    _addSeries: function()
    {
        var graph = this.get("graph"),
            sc = this.get("seriesCollection");
        graph.render(this.get("contentBox"));

    },

    /**
     * @private
     * @description Adds gridlines to the chart.
     */
    _addGridlines: function()
    {
        var graph = this.get("graph"),
            hgl = this.get("horizontalGridlines"),
            vgl = this.get("verticalGridlines"),
            direction = this.get("direction"),
            leftAxesCollection = this.get("leftAxesCollection"),
            rightAxesCollection = this.get("rightAxesCollection"),
            bottomAxesCollection = this.get("bottomAxesCollection"),
            topAxesCollection = this.get("topAxesCollection"),
            seriesAxesCollection,
            catAxis = this.get("categoryAxis"),
            hAxis,
            vAxis;
        if(this._axesCollection)
        {
            seriesAxesCollection = this._axesCollection.concat();
            seriesAxesCollection.splice(Y.Array.indexOf(seriesAxesCollection, catAxis), 1);
        }
        if(hgl)
        {
            if(leftAxesCollection && leftAxesCollection[0])
            {
                hAxis = leftAxesCollection[0];
            }
            else if(rightAxesCollection && rightAxesCollection[0])
            {
                hAxis = rightAxesCollection[0];
            }
            else 
            {
                hAxis = direction == "horizontal" ? catAxis : seriesAxesCollection[0];
            }
            if(!this._getBaseAttribute(hgl, "axis") && hAxis)
            {
                this._setBaseAttribute(hgl, "axis", hAxis);
            }
            if(this._getBaseAttribute(hgl, "axis"))
            {
                graph.set("horizontalGridlines", hgl);
            }
        }
        if(vgl)
        {
            if(bottomAxesCollection && bottomAxesCollection[0])
            {
                vAxis = bottomAxesCollection[0];
            }
            else if (topAxesCollection && topAxesCollection[0])
            {
                vAxis = topAxesCollection[0];
            }
            else 
            {
                vAxis = direction == "vertical" ? catAxis : seriesAxesCollection[0];
            }
            if(!this._getBaseAttribute(vgl, "axis") && vAxis)
            {
                this._setBaseAttribute(vgl, "axis", vAxis);
            }
            if(this._getBaseAttribute(vgl, "axis"))
            {
                graph.set("verticalGridlines", vgl);
            }
        }
    },

    /**
     * @private
     */
    _getDefaultAxes: function(axes)
    {
        var catKey = this.get("categoryKey"),
            axis,
            attr,
            keys,
            newAxes = {},
            claimedKeys = [],
            categoryAxisName = this.get("categoryAxisName") || this.get("categoryKey"),
            valueAxisName = this.get("valueAxisName"),
            seriesKeys = this.get("seriesKeys") || [], 
            i, 
            l,
            ii,
            ll,
            cIndex,
            dv,
            dp = this.get("dataProvider"),
            direction = this.get("direction"),
            seriesPosition,
            categoryPosition,
            valueAxes = [],
            seriesAxis = this.get("stacked") ? "stacked" : "numeric";
        dv = dp[0];
        if(direction == "vertical")
        {
            seriesPosition = "bottom";
            categoryPosition = "left";
        }
        else
        {
            seriesPosition = "left";
            categoryPosition = "bottom";
        }
        if(axes)
        {
            for(i in axes)
            {
                if(axes.hasOwnProperty(i))
                {
                    axis = axes[i];
                    keys = this._getBaseAttribute(axis, "keys");
                    attr = this._getBaseAttribute(axis, "type");
                    if(attr == "time" || attr == "category")
                    {
                        categoryAxisName = i;
                        this.set("categoryAxisName", i);
                        if(Y.Lang.isArray(keys) && keys.length > 0)
                        {
                            catKey = keys[0];
                            this.set("categoryKey", catKey);
                        }
                        newAxes[i] = axis;
                    }
                    else if(i == categoryAxisName)
                    {
                        newAxes[i] = axis;
                    }
                    else 
                    {
                        newAxes[i] = axis;
                        if(i != valueAxisName && keys && Y.Lang.isArray(keys))
                        {
                            ll = keys.length;
                            for(ii = 0; ii < ll; ++ii)
                            {
                                claimedKeys.push(keys[ii]);
                            }
                            valueAxes.push(newAxes[i]);
                        }
                        if(!(this._getBaseAttribute(newAxes[i], "type")))
                        {
                            this._setBaseAttribute(newAxes[i], "type", seriesAxis);
                        }
                        if(!(this._getBaseAttribute(newAxes[i], "position")))
                        {
                            this._setBaseAttribute(newAxes[i], "position", this._getDefaultAxisPosition(newAxes[i], valueAxes, seriesPosition));
                        }
                    }
                }
            }
        }
        if(seriesKeys.length < 1)
        {
            for(i in dv)
            {
                if(dv.hasOwnProperty(i) && i != catKey && Y.Array.indexOf(claimedKeys, i) == -1)
                {
                    seriesKeys.push(i);
                }
            }
        }
        cIndex = Y.Array.indexOf(seriesKeys, catKey);
        if(cIndex > -1)
        {
            seriesKeys.splice(cIndex, 1);
        }
        l = claimedKeys.length;
        for(i = 0; i < l; ++i)
        {
            cIndex = Y.Array.indexOf(seriesKeys, claimedKeys[i]); 
            if(cIndex > -1)
            {
                seriesKeys.splice(cIndex, 1);
            }
        }
        if(!newAxes.hasOwnProperty(categoryAxisName))
        {
            newAxes[categoryAxisName] = {};
        }
        if(!(this._getBaseAttribute(newAxes[categoryAxisName], "keys")))
        {
            this._setBaseAttribute(newAxes[categoryAxisName], "keys", [catKey]);
        }
        
        if(!(this._getBaseAttribute(newAxes[categoryAxisName], "position")))
        {
            this._setBaseAttribute(newAxes[categoryAxisName], "position", categoryPosition);
        }
         
        if(!(this._getBaseAttribute(newAxes[categoryAxisName], "type")))
        {
            this._setBaseAttribute(newAxes[categoryAxisName], "type", this.get("categoryType"));
        }
        if(!newAxes.hasOwnProperty(valueAxisName) && seriesKeys && seriesKeys.length > 0)
        {
            newAxes[valueAxisName] = {keys:seriesKeys};
            valueAxes.push(newAxes[valueAxisName]);
        }
        if(claimedKeys.length > 0)
        {
            if(seriesKeys.length > 0)
            {
                seriesKeys = claimedKeys.concat(seriesKeys);
            }
            else
            {
                seriesKeys = claimedKeys;
            }
        }
        if(newAxes.hasOwnProperty(valueAxisName))
        {
            if(!(this._getBaseAttribute(newAxes[valueAxisName], "position")))
            {
                this._setBaseAttribute(newAxes[valueAxisName], "position", this._getDefaultAxisPosition(newAxes[valueAxisName], valueAxes, seriesPosition));
            }
            if(!(this._getBaseAttribute(newAxes[valueAxisName], "type")))
            {
                this._setBaseAttribute(newAxes[valueAxisName], "type", seriesAxis);
            }
            if(!(this._getBaseAttribute(newAxes[valueAxisName], "keys")))
            {
                this._setBaseAttribute(newAxes[valueAxisName], "keys", seriesKeys);
            }
        } 
        this.set("seriesKeys", seriesKeys);
        return newAxes;
    },

    /**
     * @private
     * @description Determines the position of an axis when one is not specified.
     */
    _getDefaultAxisPosition: function(axis, valueAxes, position)
    {
        var direction = this.get("direction"),
            i = Y.Array.indexOf(valueAxes, axis);
        
        if(valueAxes[i - 1] && valueAxes[i - 1].position)
        {
            if(direction == "horizontal")
            {
                if(valueAxes[i - 1].position == "left")
                {
                    position = "right";
                }
                else if(valueAxes[i - 1].position == "right")
                {
                    position = "left";
                }
            }
            else
            {
                if (valueAxes[i -1].position == "bottom")
                {
                    position = "top";
                }       
                else
                {
                    position = "bottom";
                }
            }
        }
        return position;
    },

   
    /**
     * Returns an object literal containing a categoryItem and a valueItem for a given series index.
     *
     * @method getSeriesItem
     * @param {CartesianSeries} series Reference to a series.
     * @param {Number} index Index of the specified item within a series.
     * @return Object
     */
    getSeriesItems: function(series, index)
    {
        var xAxis = series.get("xAxis"),
            yAxis = series.get("yAxis"),
            xKey = series.get("xKey"),
            yKey = series.get("yKey"),
            categoryItem,
            valueItem;
        if(this.get("direction") == "vertical")
        {
            categoryItem = {
                axis:yAxis,
                key:yKey,
                value:yAxis.getKeyValueAt(yKey, index)
            };
            valueItem = {
                axis:xAxis,
                key:xKey,
                value: xAxis.getKeyValueAt(xKey, index)
            };
        }
        else
        {
            valueItem = {
                axis:yAxis,
                key:yKey,
                value:yAxis.getKeyValueAt(yKey, index)
            };
            categoryItem = {
                axis:xAxis,
                key:xKey,
                value: xAxis.getKeyValueAt(xKey, index)
            };
        }
        categoryItem.displayName = series.get("categoryDisplayName");
        valueItem.displayName = series.get("valueDisplayName");
        categoryItem.value = categoryItem.axis.getKeyValueAt(categoryItem.key, index);
        valueItem.value = valueItem.axis.getKeyValueAt(valueItem.key, index);
        return {category:categoryItem, value:valueItem};
    },

    /**
     * @private
     * Listender for axisRendered event.
     */
    _axisRendered: function(e)
    {
        this._axesRenderQueue = this._axesRenderQueue.splice(1 + Y.Array.indexOf(this._axesRenderQueue, e.currentTarget), 1);
        if(this._axesRenderQueue.length < 1)
        {
            this._redraw();
        }
    },

    /**
     * @private
     */
    _sizeChanged: function(e)
    {
        if(this._axesCollection)
        {
            var ac = this._axesCollection,
                i = 0,
                l = ac.length;
            for(; i < l; ++i)
            {
                this._addToAxesRenderQueue(ac[i]);
            }
            this._redraw();
        }
    },

    /**
     * @private
     */
    _redraw: function()
    {
        if(this._drawing)
        {
            this._callLater = true;
            return;
        }
        this._drawing = true;
        this._callLater = false;
        var w = this.get("width"),
            h = this.get("height"),
            lw = 0,
            rw = 0,
            th = 0,
            bh = 0,
            lc = this.get("leftAxesCollection"),
            rc = this.get("rightAxesCollection"),
            tc = this.get("topAxesCollection"),
            bc = this.get("bottomAxesCollection"),
            i = 0,
            l,
            axis,
            pos,
            pts = [],
            graphOverflow = "visible",
            graph = this.get("graph"); 
        if(lc)
        {
            l = lc.length;
            for(i = l - 1; i > -1; --i)
            {
                pts[Y.Array.indexOf(this._axesCollection, lc[i])] = {x:lw + "px"};
                lw += lc[i].get("width");
            }
        }
        if(rc)
        {
            l = rc.length;
            i = 0;
            for(i = l - 1; i > -1; --i)
            {
                rw += rc[i].get("width");
                pts[Y.Array.indexOf(this._axesCollection, rc[i])] = {x:(w - rw) + "px"};
            }
        }
        if(tc)
        {
            l = tc.length;
            for(i = l - 1; i > -1; --i)
            {
                pts[Y.Array.indexOf(this._axesCollection, tc[i])] = {y:th + "px"};
                th += tc[i].get("height");
            }
        }
        if(bc)
        {
            l = bc.length;
            for(i = l - 1; i > -1; --i)
            {
                bh += bc[i].get("height");
                pts[Y.Array.indexOf(this._axesCollection, bc[i])] = {y:(h - bh) + "px"};
            }
        }
        l = this._axesCollection.length;
        i = 0;
        
        for(; i < l; ++i)
        {
            axis = this._axesCollection[i];
            pos = axis.get("position");
            if(pos == "left" || pos === "right")
            {
                axis.get("boundingBox").setStyle("top", th + "px");
                axis.get("boundingBox").setStyle("left", pts[i].x);
                if(axis.get("height") !== h - (bh + th))
                {
                    axis.set("height", h - (bh + th));
                }
            }
            else if(pos == "bottom" || pos == "top")
            {
                if(axis.get("width") !== w - (lw + rw))
                {
                    axis.set("width", w - (lw + rw));
                }
                axis.get("boundingBox").setStyle("left", lw + "px");
                axis.get("boundingBox").setStyle("top", pts[i].y);
            }
            if(axis.get("setMax") || axis.get("setMin"))
            {
                graphOverflow = "hidden";
            }
        }
        
        this._drawing = false;
        if(this._callLater)
        {
            this._redraw();
            return;
        }
        if(graph)
        {
            graph.get("boundingBox").setStyle("left", lw + "px");
            graph.get("boundingBox").setStyle("top", th + "px");
            graph.set("width", w - (lw + rw));
            graph.set("height", h - (th + bh));
            graph.get("boundingBox").setStyle("overflow", graphOverflow);
        }

        if(this._overlay)
        {
            this._overlay.setStyle("left", lw + "px");
            this._overlay.setStyle("top", th + "px");
            this._overlay.setStyle("width", (w - (lw + rw)) + "px");
            this._overlay.setStyle("height", (h - (th + bh)) + "px");
        }
    }
}, {
    ATTRS: {
        /**
         * @private
         * Style object for the axes.
         *
         * @attribute axesStyles
         * @type Object
         */
        axesStyles: {
            getter: function()
            {
                var axes = this.get("axes"),
                    i,
                    styles = this._axesStyles;
                if(axes)
                {
                    for(i in axes)
                    {
                        if(axes.hasOwnProperty(i) && axes[i] instanceof Y.Axis)
                        {
                            if(!styles)
                            {
                                styles = {};
                            }
                            styles[i] = axes[i].get("styles");
                        }
                    }
                }
                return styles;
            },
            
            setter: function(val)
            {
                var axes = this.get("axes"),
                    i;
                for(i in val)
                {
                    if(val.hasOwnProperty(i) && axes.hasOwnProperty(i))
                    {
                        this._setBaseAttribute(axes[i], "styles", val[i]);
                    }
                }
            }
        },

        /**
         * @private
         * Style object for the series
         *
         * @attribute seriesStyles
         * @type Object
         */
        seriesStyles: {
            getter: function()
            {
                var styles = this._seriesStyles,
                    graph = this.get("graph"),
                    dict,
                    i;
                if(graph)
                {
                    dict = graph.get("seriesDictionary");
                    if(dict)
                    {
                        styles = {};
                        for(i in dict)
                        {
                            if(dict.hasOwnProperty(i))
                            {
                                styles[i] = dict[i].get("styles");
                            }
                        }
                    }
                }
                return styles;
            },
            
            setter: function(val)
            {
                var i,
                    l,
                    s;
    
                if(Y.Lang.isArray(val))
                {
                    s = this.get("seriesCollection");
                    i = 0;
                    l = val.length;

                    for(; i < l; ++i)
                    {
                        this._setBaseAttribute(s[i], "styles", val[i]);
                    }
                }
                else
                {
                    for(i in val)
                    {
                        if(val.hasOwnProperty(i))
                        {
                            s = this.getSeries(i);
                            this._setBaseAttribute(s, "styles", val[i]);
                        }
                    }
                }
            }
        },

        /**
         * @private
         * Styles for the graph.
         *
         * @attribute graphStyles
         * @type Object
         */
        graphStyles: {
            getter: function()
            {
                var graph = this.get("graph");
                if(graph)
                {
                    return(graph.get("styles"));
                }
                return this._graphStyles;
            },

            setter: function(val)
            {
                var graph = this.get("graph");
                this._setBaseAttribute(graph, "styles", val);
            }

        },

        /**
         * Style properties for the chart. Contains a key indexed hash of the following:
         *  <dl>
         *      <dt>series</dt><dd>A key indexed hash containing references to the <code>styles</code> attribute for each series in the chart.
         *      Specific style attributes vary depending on the series:
         *      <ul>
         *          <li><a href="AreaSeries.html#config_styles">AreaSeries</a></li>
         *          <li><a href="BarSeries.html#config_styles">BarSeries</a></li>
         *          <li><a href="ColumnSeries.html#config_styles">ColumnSeries</a></li>
         *          <li><a href="ComboSeries.html#config_styles">ComboSeries</a></li>
         *          <li><a href="LineSeries.html#config_styles">LineSeries</a></li>
         *          <li><a href="MarkerSeries.html#config_styles">MarkerSeries</a></li>
         *          <li><a href="SplineSeries.html#config_styles">SplineSeries</a></li>
         *      </ul>
         *      </dd>
         *      <dt>axes</dt><dd>A key indexed hash containing references to the <code>styles</code> attribute for each axes in the chart. Specific
         *      style attributes can be found in the <a href="Axis.html#config_styles">Axis</a> class.</dd>
         *      <dt>graph</dt><dd>A reference to the <code>styles</code> attribute in the chart. Specific style attributes can be found in the
         *      <a href="Graph.html#config_styles">Graph</a> class.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
        styles: {
            getter: function()
            {
                var styles = { 
                    axes: this.get("axesStyles"),
                    series: this.get("seriesStyles"),
                    graph: this.get("graphStyles")
                };
                return styles;
            },
            setter: function(val)
            {
                if(val.hasOwnProperty("axes"))
                {
                    if(this.get("axesStyles"))
                    {
                        this.set("axesStyles", val.axes);
                    }
                    else
                    {
                        this._axesStyles = val.axes;
                    }
                }
                if(val.hasOwnProperty("series"))
                {
                    if(this.get("seriesStyles"))
                    {
                        this.set("seriesStyles", val.series);
                    }
                    else
                    {
                        this._seriesStyles = val.series;
                    }
                }
                if(val.hasOwnProperty("graph"))
                {
                    this.set("graphStyles", val.graph);
                }
            }
        },

        /**
         * Axes to appear in the chart. This can be a key indexed hash of axis instances or object literals
         * used to construct the appropriate axes.
         *
         * @attribute axes
         * @type Object
         */
        axes: {
            valueFn: "_parseAxes",

            setter: function(val)
            {
                return this._parseAxes(val);
            }
        },

        /**
         * Collection of series to appear on the chart. This can be an array of Series instances or object literals
         * used to construct the appropriate series.
         *
         * @attribute seriesCollection
         * @type Array
         */
        seriesCollection: {
            valueFn: "_getDefaultSeriesCollection",
            
            setter: function(val)
            {
                return this._getDefaultSeriesCollection(val);
            }
        },

        /**
         * Reference to the left-aligned axes for the chart.
         *
         * @attribute leftAxesCollection
         * @type Array
         * @private
         */
        leftAxesCollection: {},

        /**
         * Reference to the bottom-aligned axes for the chart.
         *
         * @attribute bottomAxesCollection
         * @type Array
         * @private
         */
        bottomAxesCollection: {},

        /**
         * Reference to the right-aligned axes for the chart.
         *
         * @attribute rightAxesCollection
         * @type Array
         * @private
         */
        rightAxesCollection: {},

        /**
         * Reference to the top-aligned axes for the chart.
         *
         * @attribute topAxesCollection
         * @type Array
         * @private
         */
        topAxesCollection: {},
        
        /**
         * Indicates whether or not the chart is stacked.
         *
         * @attribute stacked
         * @type Boolean
         */
        stacked: {
            value: false
        },

        /**
         * Direction of chart's category axis when there is no series collection specified. Charts can
         * be horizontal or vertical. When the chart type is column, the chart is horizontal.
         * When the chart type is bar, the chart is vertical. 
         *
         * @attribute direction
         * @type String
         */
        direction: {
            getter: function()
            {
                var type = this.get("type");
                if(type == "bar")
                {   
                    return "vertical";
                }
                else if(type == "column")
                {
                    return "horizontal";
                }
                return this._direction;
            },

            setter: function(val)
            {
                this._direction = val;
                return this._direction;
            }
        },

        /**
         * Indicates whether or not an area is filled in a combo chart.
         * 
         * @attribute showAreaFill
         * @type Boolean
         */
        showAreaFill: {},

        /**
         * Indicates whether to display markers in a combo chart.
         *
         * @attribute showMarkers
         * @type Boolean
         */
        showMarkers:{},

        /**
         * Indicates whether to display lines in a combo chart.
         *
         * @attribute showLines
         * @type Boolean
         */
        showLines:{},

        /**
         * Indicates the key value used to identify a category axis in the <code>axes</code> hash. If
         * not specified, the categoryKey attribute value will be used.
         * 
         * @attribute categoryAxisName
         * @type String
         */
        categoryAxisName: {
        },

        /**
         * Indicates the key value used to identify a the series axis when an axis not generated.
         *
         * @attribute valueAxisName
         * @type String
         */
        valueAxisName: {
            value: "values"
        },

        /**
         * Reference to the horizontalGridlines for the chart.
         *
         * @attribute horizontalGridlines
         * @type Gridlines
         */
        horizontalGridlines: {
            getter: function()
            {
                var graph = this.get("graph");
                if(graph)
                {
                    return graph.get("horizontalGridlines");
                }
                return this._horizontalGridlines;
            },
            setter: function(val)
            {
                var graph = this.get("graph");
                if(val && !Y.Lang.isObject(val))
                {
                    val = {};
                }
                if(graph)
                {
                    graph.set("horizontalGridlines", val);
                }
                else
                {
                    this._horizontalGridlines = val;
                }
            }
        },

        /**
         * Reference to the verticalGridlines for the chart.
         *
         * @attribute verticalGridlines
         * @type Gridlines
         */
        verticalGridlines: {
            getter: function()
            {
                var graph = this.get("graph");
                if(graph)
                {
                    return graph.get("verticalGridlines");
                }
                return this._verticalGridlines;
            },
            setter: function(val)
            {
                var graph = this.get("graph");
                if(val && !Y.Lang.isObject(val))
                {
                    val = {};
                }
                if(graph)
                {
                    graph.set("verticalGridlines", val);
                }
                else
                {
                    this._verticalGridlines = val;
                }
            }
        },
        
        /**
         * Type of chart when there is no series collection specified.
         *
         * @attribute type
         * @type String 
         */
        type: {
            getter: function()
            {
                if(this.get("stacked"))
                {
                    return "stacked" + this._type;
                }
                return this._type;
            },

            setter: function(val)
            {
                if(this._type == "bar")
                {
                    if(val != "bar")
                    {
                        this.set("direction", "horizontal");
                    }
                }
                else
                {
                    if(val == "bar")
                    {
                        this.set("direction", "vertical");
                    }
                }
                this._type = val;
                return this._type;
            }
        },
        
        /**
         * Reference to the category axis used by the chart.
         *
         * @attribute categoryAxis
         * @type Axis
         */
        categoryAxis:{}
    }
});
/**
 * The PieChart class creates a pie chart
 *
 * @class PieChart
 * @extends ChartBase
 * @constructor
 */
Y.PieChart = Y.Base.create("pieChart", Y.Widget, [Y.ChartBase], {
    /**
     * @private
     */
    _getSeriesCollection: function()
    {
        if(this._seriesCollection)
        {
            return this._seriesCollection;
        }
        var axes = this.get("axes"),
            sc = [], 
            seriesKeys,
            i = 0,
            l,
            type = this.get("type"),
            key,
            catAxis = "categoryAxis",
            catKey = "categoryKey",
            valAxis = "valueAxis",
            seriesKey = "valueKey";
        if(axes)
        {
            seriesKeys = axes.values.get("keyCollection");
            key = axes.category.get("keyCollection")[0];
            l = seriesKeys.length;
            for(; i < l; ++i)
            {
                sc[i] = {type:type};
                sc[i][catAxis] = "category";
                sc[i][valAxis] = "values";
                sc[i][catKey] = key;
                sc[i][seriesKey] = seriesKeys[i];
            }
        }
        this._seriesCollection = sc;
        return sc;
    },

    /**
     * @private
     */
    _parseAxes: function(hash)
    {
        if(!this._axes)
        {
            this._axes = {};
        }
        var i, pos, axis, dh, config, axisClass,
            type = this.get("type"),
            w = this.get("width"),
            h = this.get("height"),
            node = Y.Node.one(this._parentNode);
        if(!w)
        {
            this.set("width", node.get("offsetWidth"));
            w = this.get("width");
        }
        if(!h)
        {
            this.set("height", node.get("offsetHeight"));
            h = this.get("height");
        }
        for(i in hash)
        {
            if(hash.hasOwnProperty(i))
            {
                dh = hash[i];
                pos = type == "pie" ? "none" : dh.position;
                axisClass = this._getAxisClass(dh.type);
                config = {dataProvider:this.get("dataProvider")};
                if(dh.hasOwnProperty("roundingUnit"))
                {
                    config.roundingUnit = dh.roundingUnit;
                }
                config.keys = dh.keys;
                config.width = w;
                config.height = h;
                config.position = pos;
                config.styles = dh.styles;
                axis = new axisClass(config);
                axis.on("axisRendered", Y.bind(this._axisRendered, this));
                this._axes[i] = axis;
            }
        }
    },

    /**
     * @private
     */
    _addAxes: function()
    {
        var axes = this.get("axes"),
            i, 
            axis, 
            p;
        if(!axes)
        {
            this.set("axes", this._getDefaultAxes());
            axes = this.get("axes");
        }
        if(!this._axesCollection)
        {   
            this._axesCollection = [];
        }
        for(i in axes)
        {
            if(axes.hasOwnProperty(i))
            {
                axis = axes[i];
                p = axis.get("position");
                if(!this.get(p + "AxesCollection"))
                {
                    this.set(p + "AxesCollection", [axis]);
                }
                else
                {
                    this.get(p + "AxesCollection").push(axis);
                }
                this._axesCollection.push(axis);
            }
        }
    },

    /**
     * @private
     */
    _addSeries: function()
    {
        var graph = this.get("graph"),
            seriesCollection = this.get("seriesCollection");
        this._parseSeriesAxes(seriesCollection);
        graph.set("showBackground", false);
        graph.set("width", this.get("width"));
        graph.set("height", this.get("height"));
        graph.set("seriesCollection", seriesCollection);
        this._seriesCollection = graph.get("seriesCollection");
        graph.render(this.get("contentBox"));
    },

    /**
     * @private
     */
    _parseSeriesAxes: function(c)
    {
        var i = 0, 
            len = c.length, 
            s,
            axes = this.get("axes"),
            axis;
        for(; i < len; ++i)
        {
            s = c[i];
            if(s)
            {
                //If series is an actual series instance, 
                //replace axes attribute string ids with axes
                if(s instanceof Y.PieSeries)
                {
                    axis = s.get("categoryAxis");
                    if(axis && !(axis instanceof Y.Axis))
                    {
                        s.set("categoryAxis", axes[axis]);
                    }
                    axis = s.get("valueAxis");
                    if(axis && !(axis instanceof Y.Axis))
                    {
                        s.set("valueAxis", axes[axis]);
                    }
                    continue;
                }
                s.categoryAxis = axes.category;
                s.valueAxis = axes.values;
                if(!s.type)
                {
                    s.type = this.get("type");
                }
            }
        }
    },

    /**
     * @private
     */
    _getDefaultAxes: function()
    {
        var catKey = this.get("categoryKey"),
            seriesKeys = this.get("seriesKeys") || [], 
            seriesAxis = "numeric",
            i, 
            dv = this.get("dataProvider")[0];
        if(seriesKeys.length < 1)
        {
            for(i in dv)
            {
                if(i != catKey)
                {
                    seriesKeys.push(i);
                }
            }
            if(seriesKeys.length > 0)
            {
                this.set("seriesKeys", seriesKeys);
            }
        }
        return {
            values:{
                keys:seriesKeys,
                type:seriesAxis
            },
            category:{
                keys:[catKey],
                type:this.get("categoryType")
            }
        };
    },
        
    /**
     * Returns an object literal containing a categoryItem and a valueItem for a given series index.
     *
     * @method getSeriesItem
     * @param series Reference to a series.
     * @param index Index of the specified item within a series.
     */
    getSeriesItems: function(series, index)
    {
        var categoryItem = {
                axis: series.get("categoryAxis"),
                key: series.get("categoryKey"),
                displayName: series.get("categoryDisplayName")
            },
            valueItem = {
                axis: series.get("valueAxis"),
                key: series.get("valueKey"),
                displayName: series.get("valueDisplayName")
            };
        categoryItem.value = categoryItem.axis.getKeyValueAt(categoryItem.key, index);
        valueItem.value = valueItem.axis.getKeyValueAt(valueItem.key, index);
        return {category:categoryItem, value:valueItem};
    },

    /**
     * @private
     */
    _sizeChanged: function(e)
    {
        this._redraw();
    },

    /**
     * @private
     */
    _redraw: function()
    {
        var graph = this.get("graph");
        if(graph)
        {
            graph.set("width", this.get("width"));
            graph.set("height", this.get("height"));
        }
    }
}, {
    ATTRS: {
        /**
         * Axes to appear in the chart. 
         *
         * @attribute axes
         * @type Object
         */
        axes: {
            getter: function()
            {
                return this._axes;
            },

            setter: function(val)
            {
                this._parseAxes(val);
            }
        },

        /**
         * Collection of series to appear on the chart. This can be an array of Series instances or object literals
         * used to describe a Series instance.
         *
         * @attribute seriesCollection
         * @type Array
         */
        seriesCollection: {
            getter: function()
            {
                return this._getSeriesCollection();
            },
            
            setter: function(val)
            {
                return this._setSeriesCollection(val);
            }
        },
        
        /**
         * Type of chart when there is no series collection specified.
         *
         * @attribute type
         * @type String 
         */
        type: {
            value: "pie"
        }
    }
});
/**
 * The Chart class is the basic application used to create a chart.
 *
 * @class Chart
 * @constructor
 */
function Chart(cfg)
{
    if(cfg.type != "pie")
    {
        return new Y.CartesianChart(cfg);
    }
    else
    {
        return new Y.PieChart(cfg);
    }
}
Y.Chart = Chart;


}, '@VERSION@' ,{requires:['dom', 'datatype', 'event-custom', 'event-mouseenter', 'widget', 'widget-position', 'widget-stack']});
