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
_yuitest_coverage["build/series-pie/series-pie.js"].code=["YUI.add('series-pie', function (Y, NAME) {","","/**"," * Provides functionality for creating a pie series."," *"," * @module charts"," * @submodule series-pie"," */","/**"," * PieSeries visualizes data as a circular chart divided into wedges which represent data as a"," * percentage of a whole."," *"," * @class PieSeries"," * @constructor"," * @extends SeriesBase"," * @uses Plots"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-pie"," */","var CONFIG = Y.config,","    DOCUMENT = CONFIG.doc,","    _getClassName = Y.ClassNameManager.getClassName,","    SERIES_MARKER = _getClassName(\"seriesmarker\");","Y.PieSeries = Y.Base.create(\"pieSeries\", Y.SeriesBase, [Y.Plots], {","    /**","     * Image map used for interactivity when rendered with canvas.","     *","     * @property _map","     * @type HTMLElement","     * @private","     */","    _map: null,","","    /**","     * Image used for image map when rendered with canvas.","     *","     * @property _image","     * @type HTMLElement","     * @private","     */","    _image: null,","","    /**","     * Creates or updates the image map when rendered with canvas.","     *","     * @method _setMap","     * @private","     */","    _setMap: function()","    {","        var id = \"pieHotSpotMapi_\" + Math.round(100000 * Math.random()),","            graph = this.get(\"graph\"),","            graphic,","            cb,","            areaNode;","        if(graph)","        {","            cb = graph.get(\"contentBox\");","        }","        else","        {","            graphic = this.get(\"graphic\");","            cb = graphic.get(\"node\");","        }","        if(this._image)","        {","            cb.removeChild(this._image);","            while(this._areaNodes && this._areaNodes.length > 0)","            {","                areaNode = this._areaNodes.shift();","                this._map.removeChild(areaNode);","            }","            cb.removeChild(this._map);","        }","        this._image = DOCUMENT.createElement(\"img\");","        this._image.src = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAABCAYAAAD9yd/wAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSB\" +","                        \"JbWFnZVJlYWR5ccllPAAAABJJREFUeNpiZGBgSGPAAgACDAAIkABoFyloZQAAAABJRU5ErkJggg==\";","        cb.appendChild(this._image);","        this._image.style.position = \"absolute\";","        this._image.style.left = \"0px\";","        this._image.style.top = \"0px\";","        this._image.setAttribute(\"usemap\", \"#\" + id);","        this._image.style.zIndex = 3;","        this._image.style.opacity = 0;","        this._image.setAttribute(\"alt\", \"imagemap\");","        this._map = DOCUMENT.createElement(\"map\");","        cb.appendChild(this._map);","        this._map.setAttribute(\"name\", id);","        this._map.setAttribute(\"id\", id);","        this._areaNodes = [];","    },","","    /**","     * Storage for `categoryDisplayName` attribute.","     *","     * @property _categoryDisplayName","     * @private","     */","    _categoryDisplayName: null,","","    /**","     * Storage for `valueDisplayName` attribute.","     *","     * @property _valueDisplayName","     * @private","     */","    _valueDisplayName: null,","","    /**","     * Adds event listeners.","     *","     * @method addListeners","     * @private","     */","    addListeners: function()","    {","        var categoryAxis = this.get(\"categoryAxis\"),","            valueAxis = this.get(\"valueAxis\");","        if(categoryAxis)","        {","            categoryAxis.after(\"dataReady\", Y.bind(this._categoryDataChangeHandler, this));","            categoryAxis.after(\"dataUpdate\", Y.bind(this._categoryDataChangeHandler, this));","        }","        if(valueAxis)","        {","            valueAxis.after(\"dataReady\", Y.bind(this._valueDataChangeHandler, this));","            valueAxis.after(\"dataUpdate\", Y.bind(this._valueDataChangeHandler, this));","        }","        this.after(\"categoryAxisChange\", this.categoryAxisChangeHandler);","        this.after(\"valueAxisChange\", this.valueAxisChangeHandler);","        this.after(\"stylesChange\", this._updateHandler);","        this._visibleChangeHandle = this.after(\"visibleChange\", this._handleVisibleChange);","    },","","    /**","     * Draws the series.","     *","     * @method validate","     * @private","     */","    validate: function()","    {","        this.draw();","        this._renderered = true;","    },","","    /**","     * Event handler for the categoryAxisChange event.","     *","     * @method _categoryAxisChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _categoryAxisChangeHandler: function()","    {","        var categoryAxis = this.get(\"categoryAxis\");","        categoryAxis.after(\"dataReady\", Y.bind(this._categoryDataChangeHandler, this));","        categoryAxis.after(\"dataUpdate\", Y.bind(this._categoryDataChangeHandler, this));","    },","","    /**","     * Event handler for the valueAxisChange event.","     *","     * @method _valueAxisChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _valueAxisChangeHandler: function()","    {","        var valueAxis = this.get(\"valueAxis\");","        valueAxis.after(\"dataReady\", Y.bind(this._valueDataChangeHandler, this));","        valueAxis.after(\"dataUpdate\", Y.bind(this._valueDataChangeHandler, this));","    },","","    /**","     * Constant used to generate unique id.","     *","     * @property GUID","     * @type String","     * @private","     */","    GUID: \"pieseries\",","","    /**","     * Event handler for categoryDataChange event.","     *","     * @method _categoryDataChangeHandler","     * @param {Object} event Event object.","     * @private","     */","    _categoryDataChangeHandler: function()","    {","       if(this._rendered && this.get(\"categoryKey\") && this.get(\"valueKey\"))","        {","            this.draw();","        }","    },","","    /**","     * Event handler for valueDataChange event.","     *","     * @method _valueDataChangeHandler","     * @param {Object} event Event object.","     * @private","     */","    _valueDataChangeHandler: function()","    {","        if(this._rendered && this.get(\"categoryKey\") && this.get(\"valueKey\"))","        {","            this.draw();","        }","    },","","    /**","     * Returns the sum of all values for the series.","     *","     * @method getTotalValues","     * @return Number","     */","    getTotalValues: function()","    {","        var total = this.get(\"valueAxis\").getTotalByKey(this.get(\"valueKey\"));","        return total;","    },","","    /**","     * Draws the series. Overrides the base implementation.","     *","     * @method draw","     * @protected","     */","    draw: function()","    {","        var w = this.get(\"width\"),","            h = this.get(\"height\");","        if(isFinite(w) && isFinite(h) && w > 0 && h > 0)","        {","            this._rendered = true;","            if(this._drawing)","            {","                this._callLater = true;","                return;","            }","            this._drawing = true;","            this._callLater = false;","            this.drawSeries();","            this._drawing = false;","            if(this._callLater)","            {","                this.draw();","            }","            else","            {","                this.fire(\"drawingComplete\");","            }","        }","    },","","    /**","     * Draws the markers","     *","     * @method drawPlots","     * @protected","     */","    drawPlots: function()","    {","        var values = this.get(\"valueAxis\").getDataByKey(this.get(\"valueKey\")).concat(),","            totalValue = 0,","            itemCount = values.length,","            styles = this.get(\"styles\").marker,","            fillColors = styles.fill.colors,","            fillAlphas = styles.fill.alphas || [\"1\"],","            borderColors = styles.border.colors,","            borderWeights = [styles.border.weight],","            borderAlphas = [styles.border.alpha],","            tbw = borderWeights.concat(),","            tbc = borderColors.concat(),","            tba = borderAlphas.concat(),","            tfc,","            tfa,","            padding = styles.padding,","            graphic = this.get(\"graphic\"),","            minDimension = Math.min(graphic.get(\"width\"), graphic.get(\"height\")),","            w = minDimension - (padding.left + padding.right),","            h = minDimension - (padding.top + padding.bottom),","            startAngle = -90,","            halfWidth = w / 2,","            halfHeight = h / 2,","            radius = Math.min(halfWidth, halfHeight),","            i = 0,","            value,","            angle = 0,","            lc,","            la,","            lw,","            wedgeStyle,","            marker,","            graphOrder = this.get(\"graphOrder\") || 0,","            isCanvas = Y.Graphic.NAME === \"canvasGraphic\";","        for(; i < itemCount; ++i)","        {","            value = parseFloat(values[i]);","","            values.push(value);","            if(!isNaN(value))","            {","                totalValue += value;","            }","        }","","        tfc = fillColors ? fillColors.concat() : null;","        tfa = fillAlphas ? fillAlphas.concat() : null;","        this._createMarkerCache();","        if(isCanvas)","        {","            this._setMap();","            this._image.width = w;","            this._image.height = h;","        }","        for(i = 0; i < itemCount; i++)","        {","            value = values[i];","            if(totalValue === 0)","            {","                angle = 360 / values.length;","            }","            else","            {","                angle = 360 * (value / totalValue);","            }","            if(tfc && tfc.length < 1)","            {","                tfc = fillColors.concat();","            }","            if(tfa && tfa.length < 1)","            {","                tfa = fillAlphas.concat();","            }","            if(tbw && tbw.length < 1)","            {","                tbw = borderWeights.concat();","            }","            if(tbw && tbc.length < 1)","            {","                tbc = borderColors.concat();","            }","            if(tba && tba.length < 1)","            {","                tba = borderAlphas.concat();","            }","            lw = tbw ? tbw.shift() : null;","            lc = tbc ? tbc.shift() : null;","            la = tba ? tba.shift() : null;","            startAngle += angle;","            wedgeStyle = {","                border: {","                    color:lc,","                    weight:lw,","                    alpha:la","                },","                fill: {","                    color:tfc ? tfc.shift() : this._getDefaultColor(i, \"slice\"),","                    alpha:tfa ? tfa.shift() : null","                },","                type: \"pieslice\",","                arc: angle,","                radius: radius,","                startAngle: startAngle,","                cx: halfWidth,","                cy: halfHeight,","                width: w,","                height: h","            };","            marker = this.getMarker(wedgeStyle, graphOrder, i);","            if(isCanvas)","            {","                this._addHotspot(wedgeStyle, graphOrder, i);","            }","        }","        this._clearMarkerCache();","    },","","    /**","     * @protected","     *","     * Method used by `styles` setter. Overrides base implementation.","     *","     * @method _setStyles","     * @param {Object} newStyles Hash of properties to update.","     * @return Object","     */","    _setStyles: function(val)","    {","        if(!val.marker)","        {","            val = {marker:val};","        }","        val = this._parseMarkerStyles(val);","        return Y.PieSeries.superclass._mergeStyles.apply(this, [val, this._getDefaultStyles()]);","    },","","    /**","     *  Adds an interactive map when rendering in canvas.","     *","     *  @method _addHotspot","     *  @param {Object} cfg Object containing data used to draw the hotspot","     *  @param {Number} seriesIndex Index of series in the `seriesCollection`.","     *  @param {Number} index Index of the marker using the hotspot.","     *  @private","     */","    _addHotspot: function(cfg, seriesIndex, index)","    {","        var areaNode = DOCUMENT.createElement(\"area\"),","            i = 1,","            x = cfg.cx,","            y = cfg.cy,","            arc = cfg.arc,","            startAngle = cfg.startAngle - arc,","            endAngle = cfg.startAngle,","            radius = cfg.radius,","            ax = x + Math.cos(startAngle / 180 * Math.PI) * radius,","            ay = y + Math.sin(startAngle / 180 * Math.PI) * radius,","            bx = x + Math.cos(endAngle / 180 * Math.PI) * radius,","            by = y + Math.sin(endAngle / 180 * Math.PI) * radius,","            numPoints = Math.floor(arc/10) - 1,","            divAngle = (arc/(Math.floor(arc/10)) / 180) * Math.PI,","            angleCoord = Math.atan((ay - y)/(ax - x)),","            pts = x + \", \" + y + \", \" + ax + \", \" + ay,","            cosAng,","            sinAng,","            multDivAng;","        for(i = 1; i <= numPoints; ++i)","        {","            multDivAng = divAngle * i;","            cosAng = Math.cos(angleCoord + multDivAng);","            sinAng = Math.sin(angleCoord + multDivAng);","            if(startAngle <= 90)","            {","                pts += \", \" + (x + (radius * Math.cos(angleCoord + (divAngle * i))));","                pts += \", \" + (y + (radius * Math.sin(angleCoord + (divAngle * i))));","            }","            else","            {","                pts += \", \" + (x - (radius * Math.cos(angleCoord + (divAngle * i))));","                pts += \", \" + (y - (radius * Math.sin(angleCoord + (divAngle * i))));","            }","        }","        pts += \", \" + bx + \", \" + by;","        pts += \", \" + x + \", \" + y;","        this._map.appendChild(areaNode);","        areaNode.setAttribute(\"class\", SERIES_MARKER);","        areaNode.setAttribute(\"id\", \"hotSpot_\" + seriesIndex + \"_\" + index);","        areaNode.setAttribute(\"shape\", \"polygon\");","        areaNode.setAttribute(\"coords\", pts);","        this._areaNodes.push(areaNode);","","    },","","    /**","     * Resizes and positions markers based on a mouse interaction.","     *","     * @method updateMarkerState","     * @param {String} type state of the marker","     * @param {Number} i index of the marker","     * @protected","     */","    updateMarkerState: function(type, i)","    {","        if(this._markers[i])","        {","            var state = this._getState(type),","                markerStyles,","                indexStyles,","                marker = this._markers[i],","                styles = this.get(\"styles\").marker;","            markerStyles = state === \"off\" || !styles[state] ? styles : styles[state];","            indexStyles = this._mergeStyles(markerStyles, {});","            indexStyles.fill.color = indexStyles.fill.colors[i % indexStyles.fill.colors.length];","            indexStyles.fill.alpha = indexStyles.fill.alphas[i % indexStyles.fill.alphas.length];","            marker.set(indexStyles);","        }","    },","","    /**","     * Creates a shape to be used as a marker.","     *","     * @method _createMarker","     * @param {Object} styles Hash of style properties.","     * @return Shape","     * @private","     */","    _createMarker: function(styles)","    {","        var graphic = this.get(\"graphic\"),","            marker,","            cfg = Y.clone(styles);","        marker = graphic.addShape(cfg);","        marker.addClass(SERIES_MARKER);","        return marker;","    },","","    /**","     * Creates a cache of markers for reuse.","     *","     * @method _createMarkerCache","     * @private","     */","    _clearMarkerCache: function()","    {","        var len = this._markerCache.length,","            i = 0,","            marker;","        for(; i < len; ++i)","        {","            marker = this._markerCache[i];","            if(marker)","            {","                marker.destroy();","            }","        }","        this._markerCache = [];","    },","","    /**","     * Gets the default style values for the markers.","     *","     * @method _getPlotDefaults","     * @return Object","     * @private","     */","    _getPlotDefaults: function()","    {","         var defs = {","            padding:{","                top: 0,","                left: 0,","                right: 0,","                bottom: 0","            },","            fill:{","                alphas:[\"1\"]","            },","            border: {","                weight: 0,","                alpha: 1","            }","        };","        defs.fill.colors = this._defaultSliceColors;","        defs.border.colors = this._defaultBorderColors;","        return defs;","    }","}, {","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default pie","         */","        type: {","            value: \"pie\"","        },","","        /**","         * Order of this instance of this `type`.","         *","         * @attribute order","         * @type Number","         */","        order: {},","","        /**","         * Reference to the `Graph` in which the series is drawn into.","         *","         * @attribute graph","         * @type Graph","         */","        graph: {},","","        /**","         * Reference to the `Axis` instance used for assigning","         * category values to the graph.","         *","         * @attribute categoryAxis","         * @type Axis","         */","        categoryAxis: {","            value: null,","","            validator: function(value)","            {","                return value !== this.get(\"categoryAxis\");","            }","        },","","        /**","         * Reference to the `Axis` instance used for assigning","         * series values to the graph.","         *","         * @attribute categoryAxis","         * @type Axis","         */","        valueAxis: {","            value: null,","","            validator: function(value)","            {","                return value !== this.get(\"valueAxis\");","            }","        },","","        /**","         * Indicates which array to from the hash of value arrays in","         * the category `Axis` instance.","         *","         * @attribute categoryKey","         * @type String","         */","        categoryKey: {","            value: null,","","            validator: function(value)","            {","                return value !== this.get(\"categoryKey\");","            }","        },","        /**","         * Indicates which array to from the hash of value arrays in","         * the value `Axis` instance.","         *","         * @attribute valueKey","         * @type String","         */","        valueKey: {","            value: null,","","            validator: function(value)","            {","                return value !== this.get(\"valueKey\");","            }","        },","","        /**","         * Name used for for displaying category data","         *","         * @attribute categoryDisplayName","         * @type String","         */","        categoryDisplayName: {","            setter: function(val)","            {","                this._categoryDisplayName = val;","                return val;","            },","","            getter: function()","            {","                return this._categoryDisplayName || this.get(\"categoryKey\");","            }","        },","","        /**","         * Name used for for displaying value data","         *","         * @attribute valueDisplayName","         * @type String","         */","        valueDisplayName: {","            setter: function(val)","            {","                this._valueDisplayName = val;","                return val;","            },","","            getter: function()","            {","                return this._valueDisplayName || this.get(\"valueKey\");","            }","        },","","        /**","         * @attribute slices","         * @type Array","         * @private","         */","        slices: null","","        /**","         * Style properties used for drawing markers. This attribute is inherited from `MarkerSeries`. Below are  the default","         * values:","         *  <dl>","         *      <dt>fill</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>colors</dt><dd>An array of colors to be used for the marker fills. The color for each marker  is","         *              retrieved from the array below:<br/>","         *              `[\"#66007f\", \"#a86f41\", \"#295454\", \"#996ab2\", \"#e8cdb7\", \"#90bdbd\",\"#000000\",\"#c3b8ca\", \"#968373\", \"#678585\"]`","         *              </dd>","         *              <dt>alphas</dt><dd>An array of alpha references (Number from 0 to 1) indicating the opacity of each marker","         *              fill. The default value is [1].</dd>","         *          </dl>","         *      </dd>","         *      <dt>border</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>An array of colors to be used for the marker borders. The color for each marker is","         *              retrieved from the array below:<br/>","         *              `[\"#205096\", \"#b38206\", \"#000000\", \"#94001e\", \"#9d6fa0\", \"#e55b00\", \"#5e85c9\", \"#adab9e\", \"#6ac291\", \"#006457\"]`","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>","         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a `mouseover` event. The default","         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,","         *      the default value for `marker.over.fill.color` is equivalent to `marker.fill.color`.</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","","","}, '@VERSION@', {\"requires\": [\"series-base\", \"series-plot-util\"]});"];
_yuitest_coverage["build/series-pie/series-pie.js"].lines = {"1":0,"20":0,"24":0,"51":0,"56":0,"58":0,"62":0,"63":0,"65":0,"67":0,"68":0,"70":0,"71":0,"73":0,"75":0,"76":0,"78":0,"79":0,"80":0,"81":0,"82":0,"83":0,"84":0,"85":0,"86":0,"87":0,"88":0,"89":0,"90":0,"117":0,"119":0,"121":0,"122":0,"124":0,"126":0,"127":0,"129":0,"130":0,"131":0,"132":0,"143":0,"144":0,"156":0,"157":0,"158":0,"170":0,"171":0,"172":0,"193":0,"195":0,"208":0,"210":0,"222":0,"223":0,"234":0,"236":0,"238":0,"239":0,"241":0,"242":0,"244":0,"245":0,"246":0,"247":0,"248":0,"250":0,"254":0,"267":0,"300":0,"302":0,"304":0,"305":0,"307":0,"311":0,"312":0,"313":0,"314":0,"316":0,"317":0,"318":0,"320":0,"322":0,"323":0,"325":0,"329":0,"331":0,"333":0,"335":0,"337":0,"339":0,"341":0,"343":0,"345":0,"347":0,"349":0,"351":0,"352":0,"353":0,"354":0,"355":0,"374":0,"375":0,"377":0,"380":0,"394":0,"396":0,"398":0,"399":0,"413":0,"432":0,"434":0,"435":0,"436":0,"437":0,"439":0,"440":0,"444":0,"445":0,"448":0,"449":0,"450":0,"451":0,"452":0,"453":0,"454":0,"455":0,"469":0,"471":0,"476":0,"477":0,"478":0,"479":0,"480":0,"494":0,"497":0,"498":0,"499":0,"510":0,"513":0,"515":0,"516":0,"518":0,"521":0,"533":0,"548":0,"549":0,"550":0,"593":0,"609":0,"625":0,"640":0,"653":0,"654":0,"659":0,"672":0,"673":0,"678":0};
_yuitest_coverage["build/series-pie/series-pie.js"].functions = {"_setMap:49":0,"addListeners:115":0,"validate:141":0,"_categoryAxisChangeHandler:154":0,"_valueAxisChangeHandler:168":0,"_categoryDataChangeHandler:191":0,"_valueDataChangeHandler:206":0,"getTotalValues:220":0,"draw:232":0,"drawPlots:265":0,"_setStyles:392":0,"_addHotspot:411":0,"updateMarkerState:467":0,"_createMarker:492":0,"_clearMarkerCache:508":0,"_getPlotDefaults:531":0,"validator:591":0,"validator:607":0,"validator:623":0,"validator:638":0,"setter:651":0,"getter:657":0,"setter:670":0,"getter:676":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-pie/series-pie.js"].coveredLines = 157;
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
 * @extends SeriesBase
 * @uses Plots
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-pie
 */
_yuitest_coverfunc("build/series-pie/series-pie.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-pie/series-pie.js", 20);
var CONFIG = Y.config,
    DOCUMENT = CONFIG.doc,
    _getClassName = Y.ClassNameManager.getClassName,
    SERIES_MARKER = _getClassName("seriesmarker");
_yuitest_coverline("build/series-pie/series-pie.js", 24);
Y.PieSeries = Y.Base.create("pieSeries", Y.SeriesBase, [Y.Plots], {
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
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_setMap", 49);
_yuitest_coverline("build/series-pie/series-pie.js", 51);
var id = "pieHotSpotMapi_" + Math.round(100000 * Math.random()),
            graph = this.get("graph"),
            graphic,
            cb,
            areaNode;
        _yuitest_coverline("build/series-pie/series-pie.js", 56);
if(graph)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 58);
cb = graph.get("contentBox");
        }
        else
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 62);
graphic = this.get("graphic");
            _yuitest_coverline("build/series-pie/series-pie.js", 63);
cb = graphic.get("node");
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 65);
if(this._image)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 67);
cb.removeChild(this._image);
            _yuitest_coverline("build/series-pie/series-pie.js", 68);
while(this._areaNodes && this._areaNodes.length > 0)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 70);
areaNode = this._areaNodes.shift();
                _yuitest_coverline("build/series-pie/series-pie.js", 71);
this._map.removeChild(areaNode);
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 73);
cb.removeChild(this._map);
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 75);
this._image = DOCUMENT.createElement("img");
        _yuitest_coverline("build/series-pie/series-pie.js", 76);
this._image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAABCAYAAAD9yd/wAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSB" +
                        "JbWFnZVJlYWR5ccllPAAAABJJREFUeNpiZGBgSGPAAgACDAAIkABoFyloZQAAAABJRU5ErkJggg==";
        _yuitest_coverline("build/series-pie/series-pie.js", 78);
cb.appendChild(this._image);
        _yuitest_coverline("build/series-pie/series-pie.js", 79);
this._image.style.position = "absolute";
        _yuitest_coverline("build/series-pie/series-pie.js", 80);
this._image.style.left = "0px";
        _yuitest_coverline("build/series-pie/series-pie.js", 81);
this._image.style.top = "0px";
        _yuitest_coverline("build/series-pie/series-pie.js", 82);
this._image.setAttribute("usemap", "#" + id);
        _yuitest_coverline("build/series-pie/series-pie.js", 83);
this._image.style.zIndex = 3;
        _yuitest_coverline("build/series-pie/series-pie.js", 84);
this._image.style.opacity = 0;
        _yuitest_coverline("build/series-pie/series-pie.js", 85);
this._image.setAttribute("alt", "imagemap");
        _yuitest_coverline("build/series-pie/series-pie.js", 86);
this._map = DOCUMENT.createElement("map");
        _yuitest_coverline("build/series-pie/series-pie.js", 87);
cb.appendChild(this._map);
        _yuitest_coverline("build/series-pie/series-pie.js", 88);
this._map.setAttribute("name", id);
        _yuitest_coverline("build/series-pie/series-pie.js", 89);
this._map.setAttribute("id", id);
        _yuitest_coverline("build/series-pie/series-pie.js", 90);
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
        _yuitest_coverfunc("build/series-pie/series-pie.js", "addListeners", 115);
_yuitest_coverline("build/series-pie/series-pie.js", 117);
var categoryAxis = this.get("categoryAxis"),
            valueAxis = this.get("valueAxis");
        _yuitest_coverline("build/series-pie/series-pie.js", 119);
if(categoryAxis)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 121);
categoryAxis.after("dataReady", Y.bind(this._categoryDataChangeHandler, this));
            _yuitest_coverline("build/series-pie/series-pie.js", 122);
categoryAxis.after("dataUpdate", Y.bind(this._categoryDataChangeHandler, this));
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 124);
if(valueAxis)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 126);
valueAxis.after("dataReady", Y.bind(this._valueDataChangeHandler, this));
            _yuitest_coverline("build/series-pie/series-pie.js", 127);
valueAxis.after("dataUpdate", Y.bind(this._valueDataChangeHandler, this));
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 129);
this.after("categoryAxisChange", this.categoryAxisChangeHandler);
        _yuitest_coverline("build/series-pie/series-pie.js", 130);
this.after("valueAxisChange", this.valueAxisChangeHandler);
        _yuitest_coverline("build/series-pie/series-pie.js", 131);
this.after("stylesChange", this._updateHandler);
        _yuitest_coverline("build/series-pie/series-pie.js", 132);
this._visibleChangeHandle = this.after("visibleChange", this._handleVisibleChange);
    },

    /**
     * Draws the series.
     *
     * @method validate
     * @private
     */
    validate: function()
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "validate", 141);
_yuitest_coverline("build/series-pie/series-pie.js", 143);
this.draw();
        _yuitest_coverline("build/series-pie/series-pie.js", 144);
this._renderered = true;
    },

    /**
     * Event handler for the categoryAxisChange event.
     *
     * @method _categoryAxisChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _categoryAxisChangeHandler: function()
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_categoryAxisChangeHandler", 154);
_yuitest_coverline("build/series-pie/series-pie.js", 156);
var categoryAxis = this.get("categoryAxis");
        _yuitest_coverline("build/series-pie/series-pie.js", 157);
categoryAxis.after("dataReady", Y.bind(this._categoryDataChangeHandler, this));
        _yuitest_coverline("build/series-pie/series-pie.js", 158);
categoryAxis.after("dataUpdate", Y.bind(this._categoryDataChangeHandler, this));
    },

    /**
     * Event handler for the valueAxisChange event.
     *
     * @method _valueAxisChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _valueAxisChangeHandler: function()
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_valueAxisChangeHandler", 168);
_yuitest_coverline("build/series-pie/series-pie.js", 170);
var valueAxis = this.get("valueAxis");
        _yuitest_coverline("build/series-pie/series-pie.js", 171);
valueAxis.after("dataReady", Y.bind(this._valueDataChangeHandler, this));
        _yuitest_coverline("build/series-pie/series-pie.js", 172);
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
    _categoryDataChangeHandler: function()
    {
       _yuitest_coverfunc("build/series-pie/series-pie.js", "_categoryDataChangeHandler", 191);
_yuitest_coverline("build/series-pie/series-pie.js", 193);
if(this._rendered && this.get("categoryKey") && this.get("valueKey"))
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 195);
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
    _valueDataChangeHandler: function()
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_valueDataChangeHandler", 206);
_yuitest_coverline("build/series-pie/series-pie.js", 208);
if(this._rendered && this.get("categoryKey") && this.get("valueKey"))
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 210);
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
        _yuitest_coverfunc("build/series-pie/series-pie.js", "getTotalValues", 220);
_yuitest_coverline("build/series-pie/series-pie.js", 222);
var total = this.get("valueAxis").getTotalByKey(this.get("valueKey"));
        _yuitest_coverline("build/series-pie/series-pie.js", 223);
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
        _yuitest_coverfunc("build/series-pie/series-pie.js", "draw", 232);
_yuitest_coverline("build/series-pie/series-pie.js", 234);
var w = this.get("width"),
            h = this.get("height");
        _yuitest_coverline("build/series-pie/series-pie.js", 236);
if(isFinite(w) && isFinite(h) && w > 0 && h > 0)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 238);
this._rendered = true;
            _yuitest_coverline("build/series-pie/series-pie.js", 239);
if(this._drawing)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 241);
this._callLater = true;
                _yuitest_coverline("build/series-pie/series-pie.js", 242);
return;
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 244);
this._drawing = true;
            _yuitest_coverline("build/series-pie/series-pie.js", 245);
this._callLater = false;
            _yuitest_coverline("build/series-pie/series-pie.js", 246);
this.drawSeries();
            _yuitest_coverline("build/series-pie/series-pie.js", 247);
this._drawing = false;
            _yuitest_coverline("build/series-pie/series-pie.js", 248);
if(this._callLater)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 250);
this.draw();
            }
            else
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 254);
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
        _yuitest_coverfunc("build/series-pie/series-pie.js", "drawPlots", 265);
_yuitest_coverline("build/series-pie/series-pie.js", 267);
var values = this.get("valueAxis").getDataByKey(this.get("valueKey")).concat(),
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
            isCanvas = Y.Graphic.NAME === "canvasGraphic";
        _yuitest_coverline("build/series-pie/series-pie.js", 300);
for(; i < itemCount; ++i)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 302);
value = parseFloat(values[i]);

            _yuitest_coverline("build/series-pie/series-pie.js", 304);
values.push(value);
            _yuitest_coverline("build/series-pie/series-pie.js", 305);
if(!isNaN(value))
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 307);
totalValue += value;
            }
        }

        _yuitest_coverline("build/series-pie/series-pie.js", 311);
tfc = fillColors ? fillColors.concat() : null;
        _yuitest_coverline("build/series-pie/series-pie.js", 312);
tfa = fillAlphas ? fillAlphas.concat() : null;
        _yuitest_coverline("build/series-pie/series-pie.js", 313);
this._createMarkerCache();
        _yuitest_coverline("build/series-pie/series-pie.js", 314);
if(isCanvas)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 316);
this._setMap();
            _yuitest_coverline("build/series-pie/series-pie.js", 317);
this._image.width = w;
            _yuitest_coverline("build/series-pie/series-pie.js", 318);
this._image.height = h;
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 320);
for(i = 0; i < itemCount; i++)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 322);
value = values[i];
            _yuitest_coverline("build/series-pie/series-pie.js", 323);
if(totalValue === 0)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 325);
angle = 360 / values.length;
            }
            else
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 329);
angle = 360 * (value / totalValue);
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 331);
if(tfc && tfc.length < 1)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 333);
tfc = fillColors.concat();
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 335);
if(tfa && tfa.length < 1)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 337);
tfa = fillAlphas.concat();
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 339);
if(tbw && tbw.length < 1)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 341);
tbw = borderWeights.concat();
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 343);
if(tbw && tbc.length < 1)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 345);
tbc = borderColors.concat();
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 347);
if(tba && tba.length < 1)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 349);
tba = borderAlphas.concat();
            }
            _yuitest_coverline("build/series-pie/series-pie.js", 351);
lw = tbw ? tbw.shift() : null;
            _yuitest_coverline("build/series-pie/series-pie.js", 352);
lc = tbc ? tbc.shift() : null;
            _yuitest_coverline("build/series-pie/series-pie.js", 353);
la = tba ? tba.shift() : null;
            _yuitest_coverline("build/series-pie/series-pie.js", 354);
startAngle += angle;
            _yuitest_coverline("build/series-pie/series-pie.js", 355);
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
            _yuitest_coverline("build/series-pie/series-pie.js", 374);
marker = this.getMarker(wedgeStyle, graphOrder, i);
            _yuitest_coverline("build/series-pie/series-pie.js", 375);
if(isCanvas)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 377);
this._addHotspot(wedgeStyle, graphOrder, i);
            }
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 380);
this._clearMarkerCache();
    },

    /**
     * @protected
     *
     * Method used by `styles` setter. Overrides base implementation.
     *
     * @method _setStyles
     * @param {Object} newStyles Hash of properties to update.
     * @return Object
     */
    _setStyles: function(val)
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_setStyles", 392);
_yuitest_coverline("build/series-pie/series-pie.js", 394);
if(!val.marker)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 396);
val = {marker:val};
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 398);
val = this._parseMarkerStyles(val);
        _yuitest_coverline("build/series-pie/series-pie.js", 399);
return Y.PieSeries.superclass._mergeStyles.apply(this, [val, this._getDefaultStyles()]);
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
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_addHotspot", 411);
_yuitest_coverline("build/series-pie/series-pie.js", 413);
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
        _yuitest_coverline("build/series-pie/series-pie.js", 432);
for(i = 1; i <= numPoints; ++i)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 434);
multDivAng = divAngle * i;
            _yuitest_coverline("build/series-pie/series-pie.js", 435);
cosAng = Math.cos(angleCoord + multDivAng);
            _yuitest_coverline("build/series-pie/series-pie.js", 436);
sinAng = Math.sin(angleCoord + multDivAng);
            _yuitest_coverline("build/series-pie/series-pie.js", 437);
if(startAngle <= 90)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 439);
pts += ", " + (x + (radius * Math.cos(angleCoord + (divAngle * i))));
                _yuitest_coverline("build/series-pie/series-pie.js", 440);
pts += ", " + (y + (radius * Math.sin(angleCoord + (divAngle * i))));
            }
            else
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 444);
pts += ", " + (x - (radius * Math.cos(angleCoord + (divAngle * i))));
                _yuitest_coverline("build/series-pie/series-pie.js", 445);
pts += ", " + (y - (radius * Math.sin(angleCoord + (divAngle * i))));
            }
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 448);
pts += ", " + bx + ", " + by;
        _yuitest_coverline("build/series-pie/series-pie.js", 449);
pts += ", " + x + ", " + y;
        _yuitest_coverline("build/series-pie/series-pie.js", 450);
this._map.appendChild(areaNode);
        _yuitest_coverline("build/series-pie/series-pie.js", 451);
areaNode.setAttribute("class", SERIES_MARKER);
        _yuitest_coverline("build/series-pie/series-pie.js", 452);
areaNode.setAttribute("id", "hotSpot_" + seriesIndex + "_" + index);
        _yuitest_coverline("build/series-pie/series-pie.js", 453);
areaNode.setAttribute("shape", "polygon");
        _yuitest_coverline("build/series-pie/series-pie.js", 454);
areaNode.setAttribute("coords", pts);
        _yuitest_coverline("build/series-pie/series-pie.js", 455);
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
        _yuitest_coverfunc("build/series-pie/series-pie.js", "updateMarkerState", 467);
_yuitest_coverline("build/series-pie/series-pie.js", 469);
if(this._markers[i])
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 471);
var state = this._getState(type),
                markerStyles,
                indexStyles,
                marker = this._markers[i],
                styles = this.get("styles").marker;
            _yuitest_coverline("build/series-pie/series-pie.js", 476);
markerStyles = state === "off" || !styles[state] ? styles : styles[state];
            _yuitest_coverline("build/series-pie/series-pie.js", 477);
indexStyles = this._mergeStyles(markerStyles, {});
            _yuitest_coverline("build/series-pie/series-pie.js", 478);
indexStyles.fill.color = indexStyles.fill.colors[i % indexStyles.fill.colors.length];
            _yuitest_coverline("build/series-pie/series-pie.js", 479);
indexStyles.fill.alpha = indexStyles.fill.alphas[i % indexStyles.fill.alphas.length];
            _yuitest_coverline("build/series-pie/series-pie.js", 480);
marker.set(indexStyles);
        }
    },

    /**
     * Creates a shape to be used as a marker.
     *
     * @method _createMarker
     * @param {Object} styles Hash of style properties.
     * @return Shape
     * @private
     */
    _createMarker: function(styles)
    {
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_createMarker", 492);
_yuitest_coverline("build/series-pie/series-pie.js", 494);
var graphic = this.get("graphic"),
            marker,
            cfg = Y.clone(styles);
        _yuitest_coverline("build/series-pie/series-pie.js", 497);
marker = graphic.addShape(cfg);
        _yuitest_coverline("build/series-pie/series-pie.js", 498);
marker.addClass(SERIES_MARKER);
        _yuitest_coverline("build/series-pie/series-pie.js", 499);
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
        _yuitest_coverfunc("build/series-pie/series-pie.js", "_clearMarkerCache", 508);
_yuitest_coverline("build/series-pie/series-pie.js", 510);
var len = this._markerCache.length,
            i = 0,
            marker;
        _yuitest_coverline("build/series-pie/series-pie.js", 513);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/series-pie/series-pie.js", 515);
marker = this._markerCache[i];
            _yuitest_coverline("build/series-pie/series-pie.js", 516);
if(marker)
            {
                _yuitest_coverline("build/series-pie/series-pie.js", 518);
marker.destroy();
            }
        }
        _yuitest_coverline("build/series-pie/series-pie.js", 521);
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
         _yuitest_coverfunc("build/series-pie/series-pie.js", "_getPlotDefaults", 531);
_yuitest_coverline("build/series-pie/series-pie.js", 533);
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
        _yuitest_coverline("build/series-pie/series-pie.js", 548);
defs.fill.colors = this._defaultSliceColors;
        _yuitest_coverline("build/series-pie/series-pie.js", 549);
defs.border.colors = this._defaultBorderColors;
        _yuitest_coverline("build/series-pie/series-pie.js", 550);
return defs;
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
                _yuitest_coverfunc("build/series-pie/series-pie.js", "validator", 591);
_yuitest_coverline("build/series-pie/series-pie.js", 593);
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
                _yuitest_coverfunc("build/series-pie/series-pie.js", "validator", 607);
_yuitest_coverline("build/series-pie/series-pie.js", 609);
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
                _yuitest_coverfunc("build/series-pie/series-pie.js", "validator", 623);
_yuitest_coverline("build/series-pie/series-pie.js", 625);
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
                _yuitest_coverfunc("build/series-pie/series-pie.js", "validator", 638);
_yuitest_coverline("build/series-pie/series-pie.js", 640);
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
                _yuitest_coverfunc("build/series-pie/series-pie.js", "setter", 651);
_yuitest_coverline("build/series-pie/series-pie.js", 653);
this._categoryDisplayName = val;
                _yuitest_coverline("build/series-pie/series-pie.js", 654);
return val;
            },

            getter: function()
            {
                _yuitest_coverfunc("build/series-pie/series-pie.js", "getter", 657);
_yuitest_coverline("build/series-pie/series-pie.js", 659);
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
                _yuitest_coverfunc("build/series-pie/series-pie.js", "setter", 670);
_yuitest_coverline("build/series-pie/series-pie.js", 672);
this._valueDisplayName = val;
                _yuitest_coverline("build/series-pie/series-pie.js", 673);
return val;
            },

            getter: function()
            {
                _yuitest_coverfunc("build/series-pie/series-pie.js", "getter", 676);
_yuitest_coverline("build/series-pie/series-pie.js", 678);
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


}, '@VERSION@', {"requires": ["series-base", "series-plot-util"]});
