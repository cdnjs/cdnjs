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
_yuitest_coverage["build/series-pie/series-pie.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-pie/series-pie.js",
    code: []
};
_yuitest_coverage["build/series-pie/series-pie.js"].code=["YUI.add('series-pie', function (Y, NAME) {","","/**"," * Provides functionality for creating a pie series."," *"," * @module charts"," * @submodule series-pie"," */","/**"," * PieSeries visualizes data as a circular chart divided into wedges which represent data as a"," * percentage of a whole."," *"," * @class PieSeries"," * @constructor"," * @extends MarkerSeries"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-pie"," */","var CONFIG = Y.config,","    DOCUMENT = CONFIG.doc,","    _getClassName = Y.ClassNameManager.getClassName,","    SERIES_MARKER = _getClassName(\"seriesmarker\");","Y.PieSeries = Y.Base.create(\"pieSeries\", Y.MarkerSeries, [], {","    /**","     * Image map used for interactivity when rendered with canvas.","     *","     * @property _map","     * @type HTMLElement","     * @private","     */","    _map: null,","","    /**","     * Image used for image map when rendered with canvas.","     *","     * @property _image","     * @type HTMLElement","     * @private","     */","    _image: null,","","    /**","     * Creates or updates the image map when rendered with canvas.","     *","     * @method _setMap","     * @private","     */","    _setMap: function()","    {","        var id = \"pieHotSpotMapi_\" + Math.round(100000 * Math.random()),","            graph = this.get(\"graph\"),","            graphic,","            cb,","            areaNode;","        if(graph) ","        {","            cb = graph.get(\"contentBox\");","        }","        else","        {","            graphic = this.get(\"graphic\");","            cb = graphic.get(\"node\");","        }","        if(this._image)","        {","            cb.removeChild(this._image);","            while(this._areaNodes && this._areaNodes.length > 0)","            {","                areaNode = this._areaNodes.shift();","                this._map.removeChild(areaNode);","            }","            cb.removeChild(this._map);","        }","        this._image = DOCUMENT.createElement(\"img\");","        this._image.src = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAABCAYAAAD9yd/wAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABJJREFUeNpiZGBgSGPAAgACDAAIkABoFyloZQAAAABJRU5ErkJggg==\";","        cb.appendChild(this._image);","        this._image.setAttribute(\"usemap\", \"#\" + id);","        this._image.style.zIndex = 3;","        this._image.style.opacity = 0;","        this._image.setAttribute(\"alt\", \"imagemap\");","        this._map = DOCUMENT.createElement(\"map\");","        this._map.style.zIndex = 5;","        cb.appendChild(this._map);","        this._map.setAttribute(\"name\", id);","        this._map.setAttribute(\"id\", id);","        this._areaNodes = [];","    },","","    /**","     * Storage for `categoryDisplayName` attribute.","     *","     * @property _categoryDisplayName","     * @private","     */","    _categoryDisplayName: null,","","    /**","     * Storage for `valueDisplayName` attribute.","     *","     * @property _valueDisplayName","     * @private","     */","    _valueDisplayName: null,","","    /**","     * Adds event listeners.","     *","     * @method addListeners","     * @private","     */","    addListeners: function()","    {","        var categoryAxis = this.get(\"categoryAxis\"),","            valueAxis = this.get(\"valueAxis\");","        if(categoryAxis)","        {","            categoryAxis.after(\"dataReady\", Y.bind(this._categoryDataChangeHandler, this));","            categoryAxis.after(\"dataUpdate\", Y.bind(this._categoryDataChangeHandler, this));","        }","        if(valueAxis)","        {","            valueAxis.after(\"dataReady\", Y.bind(this._valueDataChangeHandler, this));","            valueAxis.after(\"dataUpdate\", Y.bind(this._valueDataChangeHandler, this));","        }","        this.after(\"categoryAxisChange\", this.categoryAxisChangeHandler);","        this.after(\"valueAxisChange\", this.valueAxisChangeHandler);","        this.after(\"stylesChange\", this._updateHandler);","    },","","    /**","     * Draws the series.","     *","     * @method validate","     * @private","     */","    validate: function()","    {","        this.draw();","        this._renderered = true;","    },","","    /**","     * Event handler for the categoryAxisChange event.","     *","     * @method _categoryAxisChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _categoryAxisChangeHandler: function(e)","    {","        var categoryAxis = this.get(\"categoryAxis\");","        categoryAxis.after(\"dataReady\", Y.bind(this._categoryDataChangeHandler, this));","        categoryAxis.after(\"dataUpdate\", Y.bind(this._categoryDataChangeHandler, this));","    },","","    /**","     * Event handler for the valueAxisChange event.","     *","     * @method _valueAxisChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _valueAxisChangeHandler: function(e)","    {","        var valueAxis = this.get(\"valueAxis\");","        valueAxis.after(\"dataReady\", Y.bind(this._valueDataChangeHandler, this));","        valueAxis.after(\"dataUpdate\", Y.bind(this._valueDataChangeHandler, this));","    },","","    /**","     * Constant used to generate unique id.","     *","     * @property GUID","     * @type String","     * @private","     */","    GUID: \"pieseries\",","","    /**","     * Event handler for categoryDataChange event.","     *","     * @method _categoryDataChangeHandler","     * @param {Object} event Event object.","     * @private","     */","    _categoryDataChangeHandler: function(event)","    {","       if(this._rendered && this.get(\"categoryKey\") && this.get(\"valueKey\"))","        {","            this.draw();","        }","    },","","    /**","     * Event handler for valueDataChange event.","     *","     * @method _valueDataChangeHandler","     * @param {Object} event Event object.","     * @private","     */","    _valueDataChangeHandler: function(event)","    {","        if(this._rendered && this.get(\"categoryKey\") && this.get(\"valueKey\"))","        {","            this.draw();","        }","    },","","    /**","     * Returns the sum of all values for the series.","     *","     * @method getTotalValues","     * @return Number","     */","    getTotalValues: function()","    {","        var total = this.get(\"valueAxis\").getTotalByKey(this.get(\"valueKey\"));","        return total;","    },","","    /**","     * Draws the series. Overrides the base implementation.","     *","     * @method draw","     * @protected","     */","    draw: function()","    {","        var graphic = this.get(\"graphic\"),","            w = graphic.get(\"width\"),","            h = graphic.get(\"height\");","        if(isFinite(w) && isFinite(h) && w > 0 && h > 0)","        {","            this._rendered = true;","            if(this._drawing)","            {","                this._callLater = true;","                return;","            }","            this._drawing = true;","            this._callLater = false;","            this.drawSeries();","            this._drawing = false;","            if(this._callLater)","            {","                this.draw();","            }","            else","            {","                this.fire(\"drawingComplete\");","            }","        }","    },","","    /**","     * Draws the markers","     *","     * @method drawPlots","     * @protected","     */","    drawPlots: function()","    {","        var values = this.get(\"valueAxis\").getDataByKey(this.get(\"valueKey\")).concat(),","            catValues = this.get(\"categoryAxis\").getDataByKey(this.get(\"categoryKey\")).concat(),","            totalValue = 0,","            itemCount = values.length,","            styles = this.get(\"styles\").marker,","            fillColors = styles.fill.colors,","            fillAlphas = styles.fill.alphas || [\"1\"],","            borderColors = styles.border.colors,","            borderWeights = [styles.border.weight],","            borderAlphas = [styles.border.alpha],","            tbw = borderWeights.concat(),","            tbc = borderColors.concat(),","            tba = borderAlphas.concat(),","            tfc,","            tfa,","            padding = styles.padding,","            graphic = this.get(\"graphic\"),","            minDimension = Math.min(graphic.get(\"width\"), graphic.get(\"height\")),","            w = minDimension - (padding.left + padding.right),","            h = minDimension - (padding.top + padding.bottom),","            startAngle = -90,","            halfWidth = w / 2,","            halfHeight = h / 2,","            radius = Math.min(halfWidth, halfHeight),","            i = 0,","            value,","            angle = 0,","            lc,","            la,","            lw,","            wedgeStyle,","            marker,","            graphOrder = this.get(\"graphOrder\") || 0,","            isCanvas = Y.Graphic.NAME == \"canvasGraphic\";","        for(; i < itemCount; ++i)","        {","            value = parseFloat(values[i]);","","            values.push(value);","            if(!isNaN(value))","            {","                totalValue += value;","            }","        }","","        tfc = fillColors ? fillColors.concat() : null;","        tfa = fillAlphas ? fillAlphas.concat() : null;","        this._createMarkerCache();","        if(isCanvas)","        {","            this._setMap();","            this._image.width = w;","            this._image.height = h;","        }","        for(i = 0; i < itemCount; i++)","        {","            value = values[i];","            if(totalValue === 0)","            {","                angle = 360 / values.length;","            }","            else","            {","                angle = 360 * (value / totalValue);","            }","            if(tfc && tfc.length < 1)","            {","                tfc = fillColors.concat();","            }","            if(tfa && tfa.length < 1)","            {","                tfa = fillAlphas.concat();","            }","            if(tbw && tbw.length < 1)","            {","                tbw = borderWeights.concat();","            }","            if(tbw && tbc.length < 1)","            {","                tbc = borderColors.concat();","            }","            if(tba && tba.length < 1)","            {","                tba = borderAlphas.concat();","            }","            lw = tbw ? tbw.shift() : null;","            lc = tbc ? tbc.shift() : null;","            la = tba ? tba.shift() : null;","            startAngle += angle;","            wedgeStyle = {","                border: {","                    color:lc,","                    weight:lw,","                    alpha:la","                },","                fill: {","                    color:tfc ? tfc.shift() : this._getDefaultColor(i, \"slice\"),","                    alpha:tfa ? tfa.shift() : null","                },","                type: \"pieslice\",","                arc: angle,","                radius: radius,","                startAngle: startAngle,","                cx: halfWidth,","                cy: halfHeight,","                width: w,","                height: h","            };","            marker = this.getMarker(wedgeStyle, graphOrder, i);","            if(isCanvas)","            {","                this._addHotspot(wedgeStyle, graphOrder, i);","            }","        }","        this._clearMarkerCache();","    },","","    /**","     *  Adds an interactive map when rendering in canvas.","     *","     *  @method _addHotspot","     *  @param {Object} cfg Object containing data used to draw the hotspot","     *  @param {Number} seriesIndex Index of series in the `seriesCollection`.","     *  @param {Number} index Index of the marker using the hotspot.","     *  @private","     */","    _addHotspot: function(cfg, seriesIndex, index)","    {","        var areaNode = DOCUMENT.createElement(\"area\"),","            i = 1,","            x = cfg.cx,","            y = cfg.cy,","            arc = cfg.arc,","            startAngle = cfg.startAngle - arc,","            endAngle = cfg.startAngle,","            radius = cfg.radius,","            ax = x + Math.cos(startAngle / 180 * Math.PI) * radius,","            ay = y + Math.sin(startAngle / 180 * Math.PI) * radius,","            bx = x + Math.cos(endAngle / 180 * Math.PI) * radius,","            by = y + Math.sin(endAngle / 180 * Math.PI) * radius,","            numPoints = Math.floor(arc/10) - 1,","            divAngle = (arc/(Math.floor(arc/10)) / 180) * Math.PI,","            angleCoord = Math.atan((ay - y)/(ax - x)),","            pts = x + \", \" + y + \", \" + ax + \", \" + ay,","            cosAng,","            sinAng,","            multDivAng;","        for(i = 1; i <= numPoints; ++i)","        {","            multDivAng = divAngle * i;","            cosAng = Math.cos(angleCoord + multDivAng);","            sinAng = Math.sin(angleCoord + multDivAng);","            if(startAngle <= 90)","            {","                pts += \", \" + (x + (radius * Math.cos(angleCoord + (divAngle * i))));","                pts += \", \" + (y + (radius * Math.sin(angleCoord + (divAngle * i))));","            }","            else","            {","                pts += \", \" + (x - (radius * Math.cos(angleCoord + (divAngle * i))));","                pts += \", \" + (y - (radius * Math.sin(angleCoord + (divAngle * i))));","            }","        }","        pts += \", \" + bx + \", \" + by;","        pts += \", \" + x + \", \" + y;","        this._map.appendChild(areaNode);","        areaNode.setAttribute(\"class\", SERIES_MARKER);","        areaNode.setAttribute(\"id\", \"hotSpot_\" + seriesIndex + \"_\" + index);","        areaNode.setAttribute(\"shape\", \"polygon\");","        areaNode.setAttribute(\"coords\", pts);","        this._areaNodes.push(areaNode);","","    },","","    /**","     * Resizes and positions markers based on a mouse interaction.","     *","     * @method updateMarkerState","     * @param {String} type state of the marker","     * @param {Number} i index of the marker","     * @protected","     */","    updateMarkerState: function(type, i)","    {","        if(this._markers[i])","        {","            var state = this._getState(type),","                markerStyles,","                indexStyles,","                marker = this._markers[i],","                styles = this.get(\"styles\").marker;","            markerStyles = state == \"off\" || !styles[state] ? styles : styles[state];","            indexStyles = this._mergeStyles(markerStyles, {});","            indexStyles.fill.color = indexStyles.fill.colors[i % indexStyles.fill.colors.length];","            indexStyles.fill.alpha = indexStyles.fill.alphas[i % indexStyles.fill.alphas.length];","            marker.set(indexStyles);","        }","    },","","    /**","     * Creates a shape to be used as a marker.","     *","     * @method _createMarker","     * @param {Object} styles Hash of style properties.","     * @param {Number} order Order of the series.","     * @param {Number} index Index within the series associated with the marker.","     * @return Shape","     * @private","     */","    _createMarker: function(styles, order, index)","    {","        var graphic = this.get(\"graphic\"),","            marker,","            cfg = Y.clone(styles);","        marker = graphic.addShape(cfg);","        marker.addClass(SERIES_MARKER);","        return marker;","    },","","    /**","     * Creates a cache of markers for reuse.","     *","     * @method _createMarkerCache","     * @private","     */","    _clearMarkerCache: function()","    {","        var len = this._markerCache.length,","            i = 0,","            marker;","        for(; i < len; ++i)","        {","            marker = this._markerCache[i];","            if(marker)","            {","                marker.destroy();","            }","        }","        this._markerCache = [];","    },","","    /**","     * Gets the default style values for the markers.","     *","     * @method _getPlotDefaults","     * @return Object","     * @private","     */","    _getPlotDefaults: function()","    {","         var defs = {","            padding:{","                top: 0,","                left: 0,","                right: 0,","                bottom: 0","            },","            fill:{","                alphas:[\"1\"]","            },","            border: {","                weight: 0,","                alpha: 1","            }","        };","        defs.fill.colors = this._defaultSliceColors;","        defs.border.colors = this._defaultBorderColors;","        return defs;","    },","","    /**","     * Collection of default colors used for lines in a series when not specified by user.","     *","     * @property _defaultLineColors","     * @type Array","     * @protected","     */","    _defaultLineColors:[\"#426ab3\", \"#d09b2c\", \"#000000\", \"#b82837\", \"#b384b5\", \"#ff7200\", \"#779de3\", \"#cbc8ba\", \"#7ed7a6\", \"#007a6c\"],","","    /**","     * Collection of default colors used for marker fills in a series when not specified by user.","     *","     * @property _defaultFillColors","     * @type Array","     * @protected","     */","    _defaultFillColors:[\"#6084d0\", \"#eeb647\", \"#6c6b5f\", \"#d6484f\", \"#ce9ed1\", \"#ff9f3b\", \"#93b7ff\", \"#e0ddd0\", \"#94ecba\", \"#309687\"],","","    /**","     * Collection of default colors used for marker borders in a series when not specified by user.","     *","     * @property _defaultBorderColors","     * @type Array","     * @protected","     */","    _defaultBorderColors:[\"#205096\", \"#b38206\", \"#000000\", \"#94001e\", \"#9d6fa0\", \"#e55b00\", \"#5e85c9\", \"#adab9e\", \"#6ac291\", \"#006457\"],","","    /**","     * Collection of default colors used for area fills, histogram fills and pie fills in a series when not specified by user.","     *","     * @property _defaultSliceColors","     * @type Array","     * @protected","     */","    _defaultSliceColors: [\"#66007f\", \"#a86f41\", \"#295454\", \"#996ab2\", \"#e8cdb7\", \"#90bdbd\",\"#000000\",\"#c3b8ca\", \"#968373\", \"#678585\"],","","    /**","     * Colors used if style colors are not specified","     *","     * @method _getDefaultColor","     * @param {Number} index Index indicating the series order.","     * @param {String} type Indicates which type of object needs the color.","     * @return String","     * @protected","     */","    _getDefaultColor: function(index, type)","    {","        var colors = {","                line: this._defaultLineColors,","                fill: this._defaultFillColors,","                border: this._defaultBorderColors,","                slice: this._defaultSliceColors","            },","            col = colors[type],","            l = col.length;","        index = index || 0;","        if(index >= l)","        {","            index = index % l;","        }","        type = type || \"fill\";","        return colors[type][index];","    }","}, {","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default pie","         */","        type: {","            value: \"pie\"","        },","","        /**","         * Order of this instance of this `type`.","         *","         * @attribute order","         * @type Number","         */","        order: {},","","        /**","         * Reference to the `Graph` in which the series is drawn into.","         *","         * @attribute graph","         * @type Graph","         */","        graph: {},","","        /**","         * Reference to the `Axis` instance used for assigning","         * category values to the graph.","         *","         * @attribute categoryAxis","         * @type Axis","         */","        categoryAxis: {","            value: null,","","            validator: function(value)","            {","                return value !== this.get(\"categoryAxis\");","            }","        },","","        /**","         * Reference to the `Axis` instance used for assigning","         * series values to the graph.","         *","         * @attribute categoryAxis","         * @type Axis","         */","        valueAxis: {","            value: null,","","            validator: function(value)","            {","                return value !== this.get(\"valueAxis\");","            }","        },","","        /**","         * Indicates which array to from the hash of value arrays in","         * the category `Axis` instance.","         *","         * @attribute categoryKey","         * @type String","         */","        categoryKey: {","            value: null,","","            validator: function(value)","            {","                return value !== this.get(\"categoryKey\");","            }","        },","        /**","         * Indicates which array to from the hash of value arrays in","         * the value `Axis` instance.","         *","         * @attribute valueKey","         * @type String","         */","        valueKey: {","            value: null,","","            validator: function(value)","            {","                return value !== this.get(\"valueKey\");","            }","        },","","        /**","         * Name used for for displaying category data","         *","         * @attribute categoryDisplayName","         * @type String","         */","        categoryDisplayName: {","            setter: function(val)","            {","                this._categoryDisplayName = val;","                return val;","            },","","            getter: function()","            {","                return this._categoryDisplayName || this.get(\"categoryKey\");","            }","        },","","        /**","         * Name used for for displaying value data","         *","         * @attribute valueDisplayName","         * @type String","         */","        valueDisplayName: {","            setter: function(val)","            {","                this._valueDisplayName = val;","                return val;","            },","","            getter: function()","            {","                return this._valueDisplayName || this.get(\"valueKey\");","            }","        },","","        /**","         * @attribute slices","         * @type Array","         * @private","         */","        slices: null","","        /**","         * Style properties used for drawing markers. This attribute is inherited from `MarkerSeries`. Below are  the default","         * values:","         *  <dl>","         *      <dt>fill</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>colors</dt><dd>An array of colors to be used for the marker fills. The color for each marker  is","         *              retrieved from the array below:<br/>","         *              `[\"#66007f\", \"#a86f41\", \"#295454\", \"#996ab2\", \"#e8cdb7\", \"#90bdbd\",\"#000000\",\"#c3b8ca\", \"#968373\", \"#678585\"]`","         *              </dd>","         *              <dt>alphas</dt><dd>An array of alpha references (Number from 0 to 1) indicating the opacity of each marker","         *              fill. The default value is [1].</dd>","         *          </dl>","         *      </dd>","         *      <dt>border</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>An array of colors to be used for the marker borders. The color for each marker is","         *              retrieved from the array below:<br/>","         *              `[\"#205096\", \"#b38206\", \"#000000\", \"#94001e\", \"#9d6fa0\", \"#e55b00\", \"#5e85c9\", \"#adab9e\", \"#6ac291\", \"#006457\"]`","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>","         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a `mouseover` event. The default","         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,","         *      the default value for `marker.over.fill.color` is equivalent to `marker.fill.color`.</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","","","}, '@VERSION@', {\"requires\": [\"series-marker\"]});"];
_yuitest_coverage["build/series-pie/series-pie.js"].lines = {"1":0,"19":0,"23":0,"50":0,"55":0,"57":0,"61":0,"62":0,"64":0,"66":0,"67":0,"69":0,"70":0,"72":0,"74":0,"75":0,"76":0,"77":0,"78":0,"79":0,"80":0,"81":0,"82":0,"83":0,"84":0,"85":0,"86":0,"113":0,"115":0,"117":0,"118":0,"120":0,"122":0,"123":0,"125":0,"126":0,"127":0,"138":0,"139":0,"151":0,"152":0,"153":0,"165":0,"166":0,"167":0,"188":0,"190":0,"203":0,"205":0,"217":0,"218":0,"229":0,"232":0,"234":0,"235":0,"237":0,"238":0,"240":0,"241":0,"242":0,"243":0,"244":0,"246":0,"250":0,"263":0,"297":0,"299":0,"301":0,"302":0,"304":0,"308":0,"309":0,"310":0,"311":0,"313":0,"314":0,"315":0,"317":0,"319":0,"320":0,"322":0,"326":0,"328":0,"330":0,"332":0,"334":0,"336":0,"338":0,"340":0,"342":0,"344":0,"346":0,"348":0,"349":0,"350":0,"351":0,"352":0,"371":0,"372":0,"374":0,"377":0,"391":0,"410":0,"412":0,"413":0,"414":0,"415":0,"417":0,"418":0,"422":0,"423":0,"426":0,"427":0,"428":0,"429":0,"430":0,"431":0,"432":0,"433":0,"447":0,"449":0,"454":0,"455":0,"456":0,"457":0,"458":0,"474":0,"477":0,"478":0,"479":0,"490":0,"493":0,"495":0,"496":0,"498":0,"501":0,"513":0,"528":0,"529":0,"530":0,"580":0,"588":0,"589":0,"591":0,"593":0,"594":0,"637":0,"653":0,"669":0,"684":0,"697":0,"698":0,"703":0,"716":0,"717":0,"722":0};
_yuitest_coverage["build/series-pie/series-pie.js"].functions = {"_setMap:48":0,"addListeners:111":0,"validate:136":0,"_categoryAxisChangeHandler:149":0,"_valueAxisChangeHandler:163":0,"_categoryDataChangeHandler:186":0,"_valueDataChangeHandler:201":0,"getTotalValues:215":0,"draw:227":0,"drawPlots:261":0,"_addHotspot:389":0,"updateMarkerState:445":0,"_createMarker:472":0,"_clearMarkerCache:488":0,"_getPlotDefaults:511":0,"_getDefaultColor:578":0,"validator:635":0,"validator:651":0,"validator:667":0,"validator:682":0,"setter:695":0,"getter:701":0,"setter:714":0,"getter:720":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-pie/series-pie.js"].coveredLines = 156;
_yuitest_coverage["build/series-pie/series-pie.js"].coveredFunctions = 25;
_yuitest_coverline("build/series-pie/series-pie.js", 1);
YUI.add('series-pie', function (Y, NAME) {

/**
 * Provides functionality for creating a pie series.
 *
 * @module charts
 * @submodule series-pie
 */
/**
 * PieSeries visualizes data as a circular chart divided into wedges which represent data as a
 * percentage of a whole.
 *
 * @class PieSeries
 * @constructor
 * @extends MarkerSeries
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-pie
 */
_yuitest_coverfunc("build/series-pie/series-pie.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-pie/series-pie.js", 19);
var CONFIG = Y.config,
    DOCUMENT = CONFIG.doc,
    _getClassName = Y.ClassNameManager.getClassName,
    SERIES_MARKER = _getClassName("seriesmarker");
_yuitest_coverline("build/series-pie/series-pie.js", 23);
Y.PieSeries = Y.Base.create("pieSeries", Y.MarkerSeries, [], {
    /**
     * Image map used for interactivity when rendered with canvas.
     *
     * @property _map
     * @type HTMLElement
     * @private
     */
    _map: null,

    /**
     * Image used for image map when rendered with canvas.
     *
     * @property _image
     * @type HTMLElement
     * @private
     */
    _image: null,

    /**
     * Creates or updates the image map when rendered with canvas.
     *
     * @method _setMap
     * @private
     */
    _setMap: function()
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_setMap", 48);
_yuitest_coverline("build/series-pie/series-pie.js", 50);
var id = "pieHotSpotMapi_" + Math.round(100000 * Math.random()),
            graph = this.get("graph"),
            graphic,
            cb,
            areaNode;
        _yuitest_coverline("build/series-pie/series-pie.js", 55);
if(graph) 
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 57);
cb = graph.get("contentBox");
        }
        else
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 61);
graphic = this.get("graphic");
            _yuitest_coverline("build/series-pie/series-pie.js", 62);
cb = graphic.get("node");
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 64);
if(this._image)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 66);
cb.removeChild(this._image);
            _yuitest_coverline("build/series-pie/series-pie.js", 67);
while(this._areaNodes && this._areaNodes.length > 0)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 69);
areaNode = this._areaNodes.shift();
                _yuitest_coverline("build/series-pie/series-pie.js", 70);
this._map.removeChild(areaNode);
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 72);
cb.removeChild(this._map);
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 74);
this._image = DOCUMENT.createElement("img");
        _yuitest_coverline("build/series-pie/series-pie.js", 75);
this._image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAABCAYAAAD9yd/wAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABJJREFUeNpiZGBgSGPAAgACDAAIkABoFyloZQAAAABJRU5ErkJggg==";
        _yuitest_coverline("build/series-pie/series-pie.js", 76);
cb.appendChild(this._image);
        _yuitest_coverline("build/series-pie/series-pie.js", 77);
this._image.setAttribute("usemap", "#" + id);
        _yuitest_coverline("build/series-pie/series-pie.js", 78);
this._image.style.zIndex = 3;
        _yuitest_coverline("build/series-pie/series-pie.js", 79);
this._image.style.opacity = 0;
        _yuitest_coverline("build/series-pie/series-pie.js", 80);
this._image.setAttribute("alt", "imagemap");
        _yuitest_coverline("build/series-pie/series-pie.js", 81);
this._map = DOCUMENT.createElement("map");
        _yuitest_coverline("build/series-pie/series-pie.js", 82);
this._map.style.zIndex = 5;
        _yuitest_coverline("build/series-pie/series-pie.js", 83);
cb.appendChild(this._map);
        _yuitest_coverline("build/series-pie/series-pie.js", 84);
this._map.setAttribute("name", id);
        _yuitest_coverline("build/series-pie/series-pie.js", 85);
this._map.setAttribute("id", id);
        _yuitest_coverline("build/series-pie/series-pie.js", 86);
this._areaNodes = [];
    },

    /**
     * Storage for `categoryDisplayName` attribute.
     *
     * @property _categoryDisplayName
     * @private
     */
    _categoryDisplayName: null,

    /**
     * Storage for `valueDisplayName` attribute.
     *
     * @property _valueDisplayName
     * @private
     */
    _valueDisplayName: null,

    /**
     * Adds event listeners.
     *
     * @method addListeners
     * @private
     */
    addListeners: function()
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "addListeners", 111);
_yuitest_coverline("build/series-pie/series-pie.js", 113);
var categoryAxis = this.get("categoryAxis"),
            valueAxis = this.get("valueAxis");
        _yuitest_coverline("build/series-pie/series-pie.js", 115);
if(categoryAxis)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 117);
categoryAxis.after("dataReady", Y.bind(this._categoryDataChangeHandler, this));
            _yuitest_coverline("build/series-pie/series-pie.js", 118);
categoryAxis.after("dataUpdate", Y.bind(this._categoryDataChangeHandler, this));
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 120);
if(valueAxis)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 122);
valueAxis.after("dataReady", Y.bind(this._valueDataChangeHandler, this));
            _yuitest_coverline("build/series-pie/series-pie.js", 123);
valueAxis.after("dataUpdate", Y.bind(this._valueDataChangeHandler, this));
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 125);
this.after("categoryAxisChange", this.categoryAxisChangeHandler);
        _yuitest_coverline("build/series-pie/series-pie.js", 126);
this.after("valueAxisChange", this.valueAxisChangeHandler);
        _yuitest_coverline("build/series-pie/series-pie.js", 127);
this.after("stylesChange", this._updateHandler);
    },

    /**
     * Draws the series.
     *
     * @method validate
     * @private
     */
    validate: function()
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "validate", 136);
_yuitest_coverline("build/series-pie/series-pie.js", 138);
this.draw();
        _yuitest_coverline("build/series-pie/series-pie.js", 139);
this._renderered = true;
    },

    /**
     * Event handler for the categoryAxisChange event.
     *
     * @method _categoryAxisChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _categoryAxisChangeHandler: function(e)
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_categoryAxisChangeHandler", 149);
_yuitest_coverline("build/series-pie/series-pie.js", 151);
var categoryAxis = this.get("categoryAxis");
        _yuitest_coverline("build/series-pie/series-pie.js", 152);
categoryAxis.after("dataReady", Y.bind(this._categoryDataChangeHandler, this));
        _yuitest_coverline("build/series-pie/series-pie.js", 153);
categoryAxis.after("dataUpdate", Y.bind(this._categoryDataChangeHandler, this));
    },

    /**
     * Event handler for the valueAxisChange event.
     *
     * @method _valueAxisChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _valueAxisChangeHandler: function(e)
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_valueAxisChangeHandler", 163);
_yuitest_coverline("build/series-pie/series-pie.js", 165);
var valueAxis = this.get("valueAxis");
        _yuitest_coverline("build/series-pie/series-pie.js", 166);
valueAxis.after("dataReady", Y.bind(this._valueDataChangeHandler, this));
        _yuitest_coverline("build/series-pie/series-pie.js", 167);
valueAxis.after("dataUpdate", Y.bind(this._valueDataChangeHandler, this));
    },

    /**
     * Constant used to generate unique id.
     *
     * @property GUID
     * @type String
     * @private
     */
    GUID: "pieseries",

    /**
     * Event handler for categoryDataChange event.
     *
     * @method _categoryDataChangeHandler
     * @param {Object} event Event object.
     * @private
     */
    _categoryDataChangeHandler: function(event)
    {
       _yuitest_coverfunc("build/series-pie/series-pie.js", "_categoryDataChangeHandler", 186);
_yuitest_coverline("build/series-pie/series-pie.js", 188);
if(this._rendered && this.get("categoryKey") && this.get("valueKey"))
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 190);
this.draw();
        }
    },

    /**
     * Event handler for valueDataChange event.
     *
     * @method _valueDataChangeHandler
     * @param {Object} event Event object.
     * @private
     */
    _valueDataChangeHandler: function(event)
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_valueDataChangeHandler", 201);
_yuitest_coverline("build/series-pie/series-pie.js", 203);
if(this._rendered && this.get("categoryKey") && this.get("valueKey"))
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 205);
this.draw();
        }
    },

    /**
     * Returns the sum of all values for the series.
     *
     * @method getTotalValues
     * @return Number
     */
    getTotalValues: function()
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "getTotalValues", 215);
_yuitest_coverline("build/series-pie/series-pie.js", 217);
var total = this.get("valueAxis").getTotalByKey(this.get("valueKey"));
        _yuitest_coverline("build/series-pie/series-pie.js", 218);
return total;
    },

    /**
     * Draws the series. Overrides the base implementation.
     *
     * @method draw
     * @protected
     */
    draw: function()
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "draw", 227);
_yuitest_coverline("build/series-pie/series-pie.js", 229);
var graphic = this.get("graphic"),
            w = graphic.get("width"),
            h = graphic.get("height");
        _yuitest_coverline("build/series-pie/series-pie.js", 232);
if(isFinite(w) && isFinite(h) && w > 0 && h > 0)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 234);
this._rendered = true;
            _yuitest_coverline("build/series-pie/series-pie.js", 235);
if(this._drawing)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 237);
this._callLater = true;
                _yuitest_coverline("build/series-pie/series-pie.js", 238);
return;
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 240);
this._drawing = true;
            _yuitest_coverline("build/series-pie/series-pie.js", 241);
this._callLater = false;
            _yuitest_coverline("build/series-pie/series-pie.js", 242);
this.drawSeries();
            _yuitest_coverline("build/series-pie/series-pie.js", 243);
this._drawing = false;
            _yuitest_coverline("build/series-pie/series-pie.js", 244);
if(this._callLater)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 246);
this.draw();
            }
            else
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 250);
this.fire("drawingComplete");
            }
        }
    },

    /**
     * Draws the markers
     *
     * @method drawPlots
     * @protected
     */
    drawPlots: function()
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "drawPlots", 261);
_yuitest_coverline("build/series-pie/series-pie.js", 263);
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
            graphic = this.get("graphic"),
            minDimension = Math.min(graphic.get("width"), graphic.get("height")),
            w = minDimension - (padding.left + padding.right),
            h = minDimension - (padding.top + padding.bottom),
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
            graphOrder = this.get("graphOrder") || 0,
            isCanvas = Y.Graphic.NAME == "canvasGraphic";
        _yuitest_coverline("build/series-pie/series-pie.js", 297);
for(; i < itemCount; ++i)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 299);
value = parseFloat(values[i]);

            _yuitest_coverline("build/series-pie/series-pie.js", 301);
values.push(value);
            _yuitest_coverline("build/series-pie/series-pie.js", 302);
if(!isNaN(value))
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 304);
totalValue += value;
            }
        }

        _yuitest_coverline("build/series-pie/series-pie.js", 308);
tfc = fillColors ? fillColors.concat() : null;
        _yuitest_coverline("build/series-pie/series-pie.js", 309);
tfa = fillAlphas ? fillAlphas.concat() : null;
        _yuitest_coverline("build/series-pie/series-pie.js", 310);
this._createMarkerCache();
        _yuitest_coverline("build/series-pie/series-pie.js", 311);
if(isCanvas)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 313);
this._setMap();
            _yuitest_coverline("build/series-pie/series-pie.js", 314);
this._image.width = w;
            _yuitest_coverline("build/series-pie/series-pie.js", 315);
this._image.height = h;
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 317);
for(i = 0; i < itemCount; i++)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 319);
value = values[i];
            _yuitest_coverline("build/series-pie/series-pie.js", 320);
if(totalValue === 0)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 322);
angle = 360 / values.length;
            }
            else
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 326);
angle = 360 * (value / totalValue);
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 328);
if(tfc && tfc.length < 1)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 330);
tfc = fillColors.concat();
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 332);
if(tfa && tfa.length < 1)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 334);
tfa = fillAlphas.concat();
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 336);
if(tbw && tbw.length < 1)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 338);
tbw = borderWeights.concat();
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 340);
if(tbw && tbc.length < 1)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 342);
tbc = borderColors.concat();
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 344);
if(tba && tba.length < 1)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 346);
tba = borderAlphas.concat();
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 348);
lw = tbw ? tbw.shift() : null;
            _yuitest_coverline("build/series-pie/series-pie.js", 349);
lc = tbc ? tbc.shift() : null;
            _yuitest_coverline("build/series-pie/series-pie.js", 350);
la = tba ? tba.shift() : null;
            _yuitest_coverline("build/series-pie/series-pie.js", 351);
startAngle += angle;
            _yuitest_coverline("build/series-pie/series-pie.js", 352);
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
            _yuitest_coverline("build/series-pie/series-pie.js", 371);
marker = this.getMarker(wedgeStyle, graphOrder, i);
            _yuitest_coverline("build/series-pie/series-pie.js", 372);
if(isCanvas)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 374);
this._addHotspot(wedgeStyle, graphOrder, i);
            }
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 377);
this._clearMarkerCache();
    },

    /**
     *  Adds an interactive map when rendering in canvas.
     *
     *  @method _addHotspot
     *  @param {Object} cfg Object containing data used to draw the hotspot
     *  @param {Number} seriesIndex Index of series in the `seriesCollection`.
     *  @param {Number} index Index of the marker using the hotspot.
     *  @private
     */
    _addHotspot: function(cfg, seriesIndex, index)
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_addHotspot", 389);
_yuitest_coverline("build/series-pie/series-pie.js", 391);
var areaNode = DOCUMENT.createElement("area"),
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
        _yuitest_coverline("build/series-pie/series-pie.js", 410);
for(i = 1; i <= numPoints; ++i)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 412);
multDivAng = divAngle * i;
            _yuitest_coverline("build/series-pie/series-pie.js", 413);
cosAng = Math.cos(angleCoord + multDivAng);
            _yuitest_coverline("build/series-pie/series-pie.js", 414);
sinAng = Math.sin(angleCoord + multDivAng);
            _yuitest_coverline("build/series-pie/series-pie.js", 415);
if(startAngle <= 90)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 417);
pts += ", " + (x + (radius * Math.cos(angleCoord + (divAngle * i))));
                _yuitest_coverline("build/series-pie/series-pie.js", 418);
pts += ", " + (y + (radius * Math.sin(angleCoord + (divAngle * i))));
            }
            else
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 422);
pts += ", " + (x - (radius * Math.cos(angleCoord + (divAngle * i))));
                _yuitest_coverline("build/series-pie/series-pie.js", 423);
pts += ", " + (y - (radius * Math.sin(angleCoord + (divAngle * i))));
            }
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 426);
pts += ", " + bx + ", " + by;
        _yuitest_coverline("build/series-pie/series-pie.js", 427);
pts += ", " + x + ", " + y;
        _yuitest_coverline("build/series-pie/series-pie.js", 428);
this._map.appendChild(areaNode);
        _yuitest_coverline("build/series-pie/series-pie.js", 429);
areaNode.setAttribute("class", SERIES_MARKER);
        _yuitest_coverline("build/series-pie/series-pie.js", 430);
areaNode.setAttribute("id", "hotSpot_" + seriesIndex + "_" + index);
        _yuitest_coverline("build/series-pie/series-pie.js", 431);
areaNode.setAttribute("shape", "polygon");
        _yuitest_coverline("build/series-pie/series-pie.js", 432);
areaNode.setAttribute("coords", pts);
        _yuitest_coverline("build/series-pie/series-pie.js", 433);
this._areaNodes.push(areaNode);

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
        _yuitest_coverfunc("build/series-pie/series-pie.js", "updateMarkerState", 445);
_yuitest_coverline("build/series-pie/series-pie.js", 447);
if(this._markers[i])
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 449);
var state = this._getState(type),
                markerStyles,
                indexStyles,
                marker = this._markers[i],
                styles = this.get("styles").marker;
            _yuitest_coverline("build/series-pie/series-pie.js", 454);
markerStyles = state == "off" || !styles[state] ? styles : styles[state];
            _yuitest_coverline("build/series-pie/series-pie.js", 455);
indexStyles = this._mergeStyles(markerStyles, {});
            _yuitest_coverline("build/series-pie/series-pie.js", 456);
indexStyles.fill.color = indexStyles.fill.colors[i % indexStyles.fill.colors.length];
            _yuitest_coverline("build/series-pie/series-pie.js", 457);
indexStyles.fill.alpha = indexStyles.fill.alphas[i % indexStyles.fill.alphas.length];
            _yuitest_coverline("build/series-pie/series-pie.js", 458);
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
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_createMarker", 472);
_yuitest_coverline("build/series-pie/series-pie.js", 474);
var graphic = this.get("graphic"),
            marker,
            cfg = Y.clone(styles);
        _yuitest_coverline("build/series-pie/series-pie.js", 477);
marker = graphic.addShape(cfg);
        _yuitest_coverline("build/series-pie/series-pie.js", 478);
marker.addClass(SERIES_MARKER);
        _yuitest_coverline("build/series-pie/series-pie.js", 479);
return marker;
    },

    /**
     * Creates a cache of markers for reuse.
     *
     * @method _createMarkerCache
     * @private
     */
    _clearMarkerCache: function()
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_clearMarkerCache", 488);
_yuitest_coverline("build/series-pie/series-pie.js", 490);
var len = this._markerCache.length,
            i = 0,
            marker;
        _yuitest_coverline("build/series-pie/series-pie.js", 493);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 495);
marker = this._markerCache[i];
            _yuitest_coverline("build/series-pie/series-pie.js", 496);
if(marker)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 498);
marker.destroy();
            }
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 501);
this._markerCache = [];
    },

    /**
     * Gets the default style values for the markers.
     *
     * @method _getPlotDefaults
     * @return Object
     * @private
     */
    _getPlotDefaults: function()
    {
         _yuitest_coverfunc("build/series-pie/series-pie.js", "_getPlotDefaults", 511);
_yuitest_coverline("build/series-pie/series-pie.js", 513);
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
        _yuitest_coverline("build/series-pie/series-pie.js", 528);
defs.fill.colors = this._defaultSliceColors;
        _yuitest_coverline("build/series-pie/series-pie.js", 529);
defs.border.colors = this._defaultBorderColors;
        _yuitest_coverline("build/series-pie/series-pie.js", 530);
return defs;
    },

    /**
     * Collection of default colors used for lines in a series when not specified by user.
     *
     * @property _defaultLineColors
     * @type Array
     * @protected
     */
    _defaultLineColors:["#426ab3", "#d09b2c", "#000000", "#b82837", "#b384b5", "#ff7200", "#779de3", "#cbc8ba", "#7ed7a6", "#007a6c"],

    /**
     * Collection of default colors used for marker fills in a series when not specified by user.
     *
     * @property _defaultFillColors
     * @type Array
     * @protected
     */
    _defaultFillColors:["#6084d0", "#eeb647", "#6c6b5f", "#d6484f", "#ce9ed1", "#ff9f3b", "#93b7ff", "#e0ddd0", "#94ecba", "#309687"],

    /**
     * Collection of default colors used for marker borders in a series when not specified by user.
     *
     * @property _defaultBorderColors
     * @type Array
     * @protected
     */
    _defaultBorderColors:["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"],

    /**
     * Collection of default colors used for area fills, histogram fills and pie fills in a series when not specified by user.
     *
     * @property _defaultSliceColors
     * @type Array
     * @protected
     */
    _defaultSliceColors: ["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"],

    /**
     * Colors used if style colors are not specified
     *
     * @method _getDefaultColor
     * @param {Number} index Index indicating the series order.
     * @param {String} type Indicates which type of object needs the color.
     * @return String
     * @protected
     */
    _getDefaultColor: function(index, type)
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_getDefaultColor", 578);
_yuitest_coverline("build/series-pie/series-pie.js", 580);
var colors = {
                line: this._defaultLineColors,
                fill: this._defaultFillColors,
                border: this._defaultBorderColors,
                slice: this._defaultSliceColors
            },
            col = colors[type],
            l = col.length;
        _yuitest_coverline("build/series-pie/series-pie.js", 588);
index = index || 0;
        _yuitest_coverline("build/series-pie/series-pie.js", 589);
if(index >= l)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 591);
index = index % l;
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 593);
type = type || "fill";
        _yuitest_coverline("build/series-pie/series-pie.js", 594);
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
         * Order of this instance of this `type`.
         *
         * @attribute order
         * @type Number
         */
        order: {},

        /**
         * Reference to the `Graph` in which the series is drawn into.
         *
         * @attribute graph
         * @type Graph
         */
        graph: {},

        /**
         * Reference to the `Axis` instance used for assigning
         * category values to the graph.
         *
         * @attribute categoryAxis
         * @type Axis
         */
        categoryAxis: {
            value: null,

            validator: function(value)
            {
                _yuitest_coverfunc("build/series-pie/series-pie.js", "validator", 635);
_yuitest_coverline("build/series-pie/series-pie.js", 637);
return value !== this.get("categoryAxis");
            }
        },

        /**
         * Reference to the `Axis` instance used for assigning
         * series values to the graph.
         *
         * @attribute categoryAxis
         * @type Axis
         */
        valueAxis: {
            value: null,

            validator: function(value)
            {
                _yuitest_coverfunc("build/series-pie/series-pie.js", "validator", 651);
_yuitest_coverline("build/series-pie/series-pie.js", 653);
return value !== this.get("valueAxis");
            }
        },

        /**
         * Indicates which array to from the hash of value arrays in
         * the category `Axis` instance.
         *
         * @attribute categoryKey
         * @type String
         */
        categoryKey: {
            value: null,

            validator: function(value)
            {
                _yuitest_coverfunc("build/series-pie/series-pie.js", "validator", 667);
_yuitest_coverline("build/series-pie/series-pie.js", 669);
return value !== this.get("categoryKey");
            }
        },
        /**
         * Indicates which array to from the hash of value arrays in
         * the value `Axis` instance.
         *
         * @attribute valueKey
         * @type String
         */
        valueKey: {
            value: null,

            validator: function(value)
            {
                _yuitest_coverfunc("build/series-pie/series-pie.js", "validator", 682);
_yuitest_coverline("build/series-pie/series-pie.js", 684);
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
                _yuitest_coverfunc("build/series-pie/series-pie.js", "setter", 695);
_yuitest_coverline("build/series-pie/series-pie.js", 697);
this._categoryDisplayName = val;
                _yuitest_coverline("build/series-pie/series-pie.js", 698);
return val;
            },

            getter: function()
            {
                _yuitest_coverfunc("build/series-pie/series-pie.js", "getter", 701);
_yuitest_coverline("build/series-pie/series-pie.js", 703);
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
                _yuitest_coverfunc("build/series-pie/series-pie.js", "setter", 714);
_yuitest_coverline("build/series-pie/series-pie.js", 716);
this._valueDisplayName = val;
                _yuitest_coverline("build/series-pie/series-pie.js", 717);
return val;
            },

            getter: function()
            {
                _yuitest_coverfunc("build/series-pie/series-pie.js", "getter", 720);
_yuitest_coverline("build/series-pie/series-pie.js", 722);
return this._valueDisplayName || this.get("valueKey");
            }
        },

        /**
         * @attribute slices
         * @type Array
         * @private
         */
        slices: null

        /**
         * Style properties used for drawing markers. This attribute is inherited from `MarkerSeries`. Below are  the default
         * values:
         *  <dl>
         *      <dt>fill</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>colors</dt><dd>An array of colors to be used for the marker fills. The color for each marker  is
         *              retrieved from the array below:<br/>
         *              `["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"]`
         *              </dd>
         *              <dt>alphas</dt><dd>An array of alpha references (Number from 0 to 1) indicating the opacity of each marker
         *              fill. The default value is [1].</dd>
         *          </dl>
         *      </dd>
         *      <dt>border</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>An array of colors to be used for the marker borders. The color for each marker is
         *              retrieved from the array below:<br/>
         *              `["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"]`
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>
         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a `mouseover` event. The default
         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,
         *      the default value for `marker.over.fill.color` is equivalent to `marker.fill.color`.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});


}, '@VERSION@', {"requires": ["series-marker"]});
