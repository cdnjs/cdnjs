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
_yuitest_coverage["build/series-base/series-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-base/series-base.js",
    code: []
};
_yuitest_coverage["build/series-base/series-base.js"].code=["YUI.add('series-base', function (Y, NAME) {","","/**"," * Provides functionality for creating a chart series."," *"," * @module charts"," * @submodule series-base"," */","","/**"," * An abstract class for creating series instances."," * SeriesBase is used by the following classes:"," * <ul>"," *      <li>{{#crossLink \"CartesianSeries\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"PieSeries\"}}{{/crossLink}}</li>"," *  </ul>"," *"," * @class SeriesBase"," * @extends Base"," * @uses Renderer"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-base"," */","Y.SeriesBase = Y.Base.create(\"seriesBase\", Y.Base, [Y.Renderer], {","    /**","     * @method render","     * @private","     */","    render: function()","    {","        this._setCanvas();","        this.addListeners();","        this.validate();","    },","","    /**","     * Creates a `Graphic` instance.","     *","     * @method _setCanvas","     * @protected","     */","    _setCanvas: function()","    {","        var graph = this.get(\"graph\"),","            graphic = graph.get(\"graphic\");","        this.set(\"graphic\", graphic);","    },","","    /**","     * Returns a reference to the parent container to which all chart elements are contained.","     * When the series is bound to a `Chart` instance, the `Chart` instance is the reference.","     * If nothing is set as the `chart` attribute, the `_getChart` method will return a reference","     * to the `graphic` attribute.","     *","     * @method _getChart","     * @return {Object}","     * @private","     */","    _getChart:function() {","        var chart,","            graph = this.get(\"graph\");","        if(graph)","        {","            chart = graph.get(\"chart\");","        }","        if(!chart)","        {","            chart = this.get(\"graphic\");","        }","        return chart;","    },","","    /**","     * Returns the sum of all values for the series.","     *","     * @method getTotalValues","     * @return Number","     */","    getTotalValues: function()","    {","        var valueCoord = this.get(\"direction\") === \"vertical\" ? \"x\" : \"y\",","            total = this.get(valueCoord + \"Axis\").getTotalByKey(this.get(valueCoord + \"Key\"));","        return total;","    },","","    /**","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     * @protected","     */","    _getDefaultStyles: function()","    {","        return {padding:{","                top: 0,","                left: 0,","                right: 0,","                bottom: 0","            }};","    },","","    /**","     * Shows/hides contents of the series.","     *","     * @method _handleVisibleChange","     * @param {Object} e Event object.","     * @protected","     */","    _handleVisibleChange: function()","    {","        this._toggleVisible(this.get(\"visible\"));","    },","","    /**","     * Destructor implementation for the CartesianSeries class. Calls destroy on all Graphic instances.","     *","     * @method destructor","     * @protected","     */","    destructor: function()","    {","        var marker,","            markers = this.get(\"markers\");","        if(this.get(\"rendered\"))","        {","            this._stylesChangeHandle.detach();","            this._widthChangeHandle.detach();","            this._heightChangeHandle.detach();","            this._visibleChangeHandle.detach();","        }","        while(markers && markers.length > 0)","        {","            marker = markers.shift();","            if(marker && marker instanceof Y.Shape)","            {","                marker.destroy();","            }","        }","        if(this._path)","        {","            this._path.destroy();","            this._path = null;","        }","        if(this._lineGraphic)","        {","            this._lineGraphic.destroy();","            this._lineGraphic = null;","        }","        if(this._groupMarker)","        {","            this._groupMarker.destroy();","            this._groupMarker = null;","        }","    },","","    /**","     * Collection of default colors used for lines in a series when not specified by user.","     *","     * @property _defaultLineColors","     * @type Array","     * @protected","     */","    _defaultLineColors:[","        \"#426ab3\",","        \"#d09b2c\",","        \"#000000\",","        \"#b82837\",","        \"#b384b5\",","        \"#ff7200\",","        \"#779de3\",","        \"#cbc8ba\",","        \"#7ed7a6\",","        \"#007a6c\"","    ],","","    /**","     * Collection of default colors used for marker fills in a series when not specified by user.","     *","     * @property _defaultFillColors","     * @type Array","     * @protected","     */","    _defaultFillColors:[","        \"#6084d0\",","        \"#eeb647\",","        \"#6c6b5f\",","        \"#d6484f\",","        \"#ce9ed1\",","        \"#ff9f3b\",","        \"#93b7ff\",","        \"#e0ddd0\",","        \"#94ecba\",","        \"#309687\"","    ],","","    /**","     * Collection of default colors used for marker borders in a series when not specified by user.","     *","     * @property _defaultBorderColors","     * @type Array","     * @protected","     */","    _defaultBorderColors:[","        \"#205096\",","        \"#b38206\",","        \"#000000\",","        \"#94001e\",","        \"#9d6fa0\",","        \"#e55b00\",","        \"#5e85c9\",","        \"#adab9e\",","        \"#6ac291\",","        \"#006457\"","    ],","","    /**","     * Collection of default colors used for area fills, histogram fills and pie fills in a series when not specified by user.","     *","     * @property _defaultSliceColors","     * @type Array","     * @protected","     */","    _defaultSliceColors: [","        \"#66007f\",","        \"#a86f41\",","        \"#295454\",","        \"#996ab2\",","        \"#e8cdb7\",","        \"#90bdbd\",","        \"#000000\",","        \"#c3b8ca\",","        \"#968373\",","        \"#678585\"","    ],","","    /**","     * Parses a color based on a series order and type.","     *","     * @method _getDefaultColor","     * @param {Number} index Index indicating the series order.","     * @param {String} type Indicates which type of object needs the color.","     * @return String","     * @protected","     */","    _getDefaultColor: function(index, type)","    {","        var colors = {","                line: this._defaultLineColors,","                fill: this._defaultFillColors,","                border: this._defaultBorderColors,","                slice: this._defaultSliceColors","            },","            col = colors[type] || colors.fill,","            l = col.length;","        index = index || 0;","        if(index >= l)","        {","            index = index % l;","        }","        type = type || \"fill\";","        return colors[type][index];","    }","}, {","    ATTRS: {","        /*","         * Returns the width of the parent graph","         *","         * @attribute width","         * @type Number","         */","        width: {","            readOnly: true,","","            getter: function()","            {","                return this.get(\"graphic\").get(\"width\");","            }","        },","","        /**","         * Returns the height of the parent graph","         *","         * @attribute height","         * @type Number","         */","        height: {","            readOnly: true,","","            getter: function()","            {","                return this.get(\"graphic\").get(\"height\");","            }","        },","","        /**","         * The graphic in which drawings will be rendered.","         *","         * @attribute graphic","         * @type Graphic","         */","        graphic: {","            lazyAdd: false,","","            setter: function(val) {","                //woraround for Attribute order of operations bug","                if(!this.get(\"rendered\")) {","                    this.set(\"rendered\", true);","                }","                return val;","            }","        },","","        /**","         * Reference to the `Chart` application. If no `Chart` application is present,","         * a reference to the `Graphic` instance that the series is drawn into will be returned.","         *","         * @attribute chart","         * @type ChartBase","         */","        chart: {","            getter: function()","            {","                var chart,","                    graph = this.get(\"graph\");","                if(graph)","                {","                    chart = graph.get(\"chart\");","                }","                return chart;","            }","        },","","        /**","         * Reference to the `Graph` in which the series is drawn into.","         *","         * @attribute graph","         * @type Graph","         */","        graph: {},","","        /**","         * Indicates whether the Series has been through its initial set up.","         *","         * @attribute rendered","         * @type Boolean","         */","        rendered: {","            value: false","        },","","        /**","         * Indicates whether to show the series","         *","         * @attribute visible","         * @type Boolean","         * @default true","         */","        visible: {","            value: true","        },","","        /**","         * Indicates whether or not markers for a series will be grouped and rendered in a single complex shape instance.","         *","         * @attribute groupMarkers","         * @type Boolean","         */","        groupMarkers: {","            getter: function()","            {","                var graph,","                    groupMarkers = this._groupMarkers;","                if(!groupMarkers) {","                    graph = this.get(\"graph\");","                    if(graph)","                    {","                        groupMarkers = graph.get(\"groupMarkers\");","                    }","                }","                return groupMarkers;","            },","","            setter: function(val)","            {","                this._groupMarkers = val;","                return val;","            }","        }","    }","});","","","}, '@VERSION@', {\"requires\": [\"graphics\", \"axis-base\"]});"];
_yuitest_coverage["build/series-base/series-base.js"].lines = {"1":0,"25":0,"32":0,"33":0,"34":0,"45":0,"47":0,"61":0,"63":0,"65":0,"67":0,"69":0,"71":0,"82":0,"84":0,"97":0,"114":0,"125":0,"127":0,"129":0,"130":0,"131":0,"132":0,"134":0,"136":0,"137":0,"139":0,"142":0,"144":0,"145":0,"147":0,"149":0,"150":0,"152":0,"154":0,"155":0,"250":0,"258":0,"259":0,"261":0,"263":0,"264":0,"279":0,"294":0,"309":0,"310":0,"312":0,"326":0,"328":0,"330":0,"332":0,"374":0,"376":0,"377":0,"378":0,"380":0,"383":0,"388":0,"389":0};
_yuitest_coverage["build/series-base/series-base.js"].functions = {"render:30":0,"_setCanvas:43":0,"_getChart:60":0,"getTotalValues:80":0,"_getDefaultStyles:95":0,"_handleVisibleChange:112":0,"destructor:123":0,"_getDefaultColor:248":0,"getter:277":0,"getter:292":0,"setter:307":0,"getter:324":0,"getter:372":0,"setter:386":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-base/series-base.js"].coveredLines = 59;
_yuitest_coverage["build/series-base/series-base.js"].coveredFunctions = 15;
_yuitest_coverline("build/series-base/series-base.js", 1);
YUI.add('series-base', function (Y, NAME) {

/**
 * Provides functionality for creating a chart series.
 *
 * @module charts
 * @submodule series-base
 */

/**
 * An abstract class for creating series instances.
 * SeriesBase is used by the following classes:
 * <ul>
 *      <li>{{#crossLink "CartesianSeries"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "PieSeries"}}{{/crossLink}}</li>
 *  </ul>
 *
 * @class SeriesBase
 * @extends Base
 * @uses Renderer
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-base
 */
_yuitest_coverfunc("build/series-base/series-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-base/series-base.js", 25);
Y.SeriesBase = Y.Base.create("seriesBase", Y.Base, [Y.Renderer], {
    /**
     * @method render
     * @private
     */
    render: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "render", 30);
_yuitest_coverline("build/series-base/series-base.js", 32);
this._setCanvas();
        _yuitest_coverline("build/series-base/series-base.js", 33);
this.addListeners();
        _yuitest_coverline("build/series-base/series-base.js", 34);
this.validate();
    },

    /**
     * Creates a `Graphic` instance.
     *
     * @method _setCanvas
     * @protected
     */
    _setCanvas: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "_setCanvas", 43);
_yuitest_coverline("build/series-base/series-base.js", 45);
var graph = this.get("graph"),
            graphic = graph.get("graphic");
        _yuitest_coverline("build/series-base/series-base.js", 47);
this.set("graphic", graphic);
    },

    /**
     * Returns a reference to the parent container to which all chart elements are contained.
     * When the series is bound to a `Chart` instance, the `Chart` instance is the reference.
     * If nothing is set as the `chart` attribute, the `_getChart` method will return a reference
     * to the `graphic` attribute.
     *
     * @method _getChart
     * @return {Object}
     * @private
     */
    _getChart:function() {
        _yuitest_coverfunc("build/series-base/series-base.js", "_getChart", 60);
_yuitest_coverline("build/series-base/series-base.js", 61);
var chart,
            graph = this.get("graph");
        _yuitest_coverline("build/series-base/series-base.js", 63);
if(graph)
        {
            _yuitest_coverline("build/series-base/series-base.js", 65);
chart = graph.get("chart");
        }
        _yuitest_coverline("build/series-base/series-base.js", 67);
if(!chart)
        {
            _yuitest_coverline("build/series-base/series-base.js", 69);
chart = this.get("graphic");
        }
        _yuitest_coverline("build/series-base/series-base.js", 71);
return chart;
    },

    /**
     * Returns the sum of all values for the series.
     *
     * @method getTotalValues
     * @return Number
     */
    getTotalValues: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "getTotalValues", 80);
_yuitest_coverline("build/series-base/series-base.js", 82);
var valueCoord = this.get("direction") === "vertical" ? "x" : "y",
            total = this.get(valueCoord + "Axis").getTotalByKey(this.get(valueCoord + "Key"));
        _yuitest_coverline("build/series-base/series-base.js", 84);
return total;
    },

    /**
     * Gets the default value for the `styles` attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     * @protected
     */
    _getDefaultStyles: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "_getDefaultStyles", 95);
_yuitest_coverline("build/series-base/series-base.js", 97);
return {padding:{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }};
    },

    /**
     * Shows/hides contents of the series.
     *
     * @method _handleVisibleChange
     * @param {Object} e Event object.
     * @protected
     */
    _handleVisibleChange: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "_handleVisibleChange", 112);
_yuitest_coverline("build/series-base/series-base.js", 114);
this._toggleVisible(this.get("visible"));
    },

    /**
     * Destructor implementation for the CartesianSeries class. Calls destroy on all Graphic instances.
     *
     * @method destructor
     * @protected
     */
    destructor: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "destructor", 123);
_yuitest_coverline("build/series-base/series-base.js", 125);
var marker,
            markers = this.get("markers");
        _yuitest_coverline("build/series-base/series-base.js", 127);
if(this.get("rendered"))
        {
            _yuitest_coverline("build/series-base/series-base.js", 129);
this._stylesChangeHandle.detach();
            _yuitest_coverline("build/series-base/series-base.js", 130);
this._widthChangeHandle.detach();
            _yuitest_coverline("build/series-base/series-base.js", 131);
this._heightChangeHandle.detach();
            _yuitest_coverline("build/series-base/series-base.js", 132);
this._visibleChangeHandle.detach();
        }
        _yuitest_coverline("build/series-base/series-base.js", 134);
while(markers && markers.length > 0)
        {
            _yuitest_coverline("build/series-base/series-base.js", 136);
marker = markers.shift();
            _yuitest_coverline("build/series-base/series-base.js", 137);
if(marker && marker instanceof Y.Shape)
            {
                _yuitest_coverline("build/series-base/series-base.js", 139);
marker.destroy();
            }
        }
        _yuitest_coverline("build/series-base/series-base.js", 142);
if(this._path)
        {
            _yuitest_coverline("build/series-base/series-base.js", 144);
this._path.destroy();
            _yuitest_coverline("build/series-base/series-base.js", 145);
this._path = null;
        }
        _yuitest_coverline("build/series-base/series-base.js", 147);
if(this._lineGraphic)
        {
            _yuitest_coverline("build/series-base/series-base.js", 149);
this._lineGraphic.destroy();
            _yuitest_coverline("build/series-base/series-base.js", 150);
this._lineGraphic = null;
        }
        _yuitest_coverline("build/series-base/series-base.js", 152);
if(this._groupMarker)
        {
            _yuitest_coverline("build/series-base/series-base.js", 154);
this._groupMarker.destroy();
            _yuitest_coverline("build/series-base/series-base.js", 155);
this._groupMarker = null;
        }
    },

    /**
     * Collection of default colors used for lines in a series when not specified by user.
     *
     * @property _defaultLineColors
     * @type Array
     * @protected
     */
    _defaultLineColors:[
        "#426ab3",
        "#d09b2c",
        "#000000",
        "#b82837",
        "#b384b5",
        "#ff7200",
        "#779de3",
        "#cbc8ba",
        "#7ed7a6",
        "#007a6c"
    ],

    /**
     * Collection of default colors used for marker fills in a series when not specified by user.
     *
     * @property _defaultFillColors
     * @type Array
     * @protected
     */
    _defaultFillColors:[
        "#6084d0",
        "#eeb647",
        "#6c6b5f",
        "#d6484f",
        "#ce9ed1",
        "#ff9f3b",
        "#93b7ff",
        "#e0ddd0",
        "#94ecba",
        "#309687"
    ],

    /**
     * Collection of default colors used for marker borders in a series when not specified by user.
     *
     * @property _defaultBorderColors
     * @type Array
     * @protected
     */
    _defaultBorderColors:[
        "#205096",
        "#b38206",
        "#000000",
        "#94001e",
        "#9d6fa0",
        "#e55b00",
        "#5e85c9",
        "#adab9e",
        "#6ac291",
        "#006457"
    ],

    /**
     * Collection of default colors used for area fills, histogram fills and pie fills in a series when not specified by user.
     *
     * @property _defaultSliceColors
     * @type Array
     * @protected
     */
    _defaultSliceColors: [
        "#66007f",
        "#a86f41",
        "#295454",
        "#996ab2",
        "#e8cdb7",
        "#90bdbd",
        "#000000",
        "#c3b8ca",
        "#968373",
        "#678585"
    ],

    /**
     * Parses a color based on a series order and type.
     *
     * @method _getDefaultColor
     * @param {Number} index Index indicating the series order.
     * @param {String} type Indicates which type of object needs the color.
     * @return String
     * @protected
     */
    _getDefaultColor: function(index, type)
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "_getDefaultColor", 248);
_yuitest_coverline("build/series-base/series-base.js", 250);
var colors = {
                line: this._defaultLineColors,
                fill: this._defaultFillColors,
                border: this._defaultBorderColors,
                slice: this._defaultSliceColors
            },
            col = colors[type] || colors.fill,
            l = col.length;
        _yuitest_coverline("build/series-base/series-base.js", 258);
index = index || 0;
        _yuitest_coverline("build/series-base/series-base.js", 259);
if(index >= l)
        {
            _yuitest_coverline("build/series-base/series-base.js", 261);
index = index % l;
        }
        _yuitest_coverline("build/series-base/series-base.js", 263);
type = type || "fill";
        _yuitest_coverline("build/series-base/series-base.js", 264);
return colors[type][index];
    }
}, {
    ATTRS: {
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
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 277);
_yuitest_coverline("build/series-base/series-base.js", 279);
return this.get("graphic").get("width");
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
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 292);
_yuitest_coverline("build/series-base/series-base.js", 294);
return this.get("graphic").get("height");
            }
        },

        /**
         * The graphic in which drawings will be rendered.
         *
         * @attribute graphic
         * @type Graphic
         */
        graphic: {
            lazyAdd: false,

            setter: function(val) {
                //woraround for Attribute order of operations bug
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 307);
_yuitest_coverline("build/series-base/series-base.js", 309);
if(!this.get("rendered")) {
                    _yuitest_coverline("build/series-base/series-base.js", 310);
this.set("rendered", true);
                }
                _yuitest_coverline("build/series-base/series-base.js", 312);
return val;
            }
        },

        /**
         * Reference to the `Chart` application. If no `Chart` application is present,
         * a reference to the `Graphic` instance that the series is drawn into will be returned.
         *
         * @attribute chart
         * @type ChartBase
         */
        chart: {
            getter: function()
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 324);
_yuitest_coverline("build/series-base/series-base.js", 326);
var chart,
                    graph = this.get("graph");
                _yuitest_coverline("build/series-base/series-base.js", 328);
if(graph)
                {
                    _yuitest_coverline("build/series-base/series-base.js", 330);
chart = graph.get("chart");
                }
                _yuitest_coverline("build/series-base/series-base.js", 332);
return chart;
            }
        },

        /**
         * Reference to the `Graph` in which the series is drawn into.
         *
         * @attribute graph
         * @type Graph
         */
        graph: {},

        /**
         * Indicates whether the Series has been through its initial set up.
         *
         * @attribute rendered
         * @type Boolean
         */
        rendered: {
            value: false
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
         * Indicates whether or not markers for a series will be grouped and rendered in a single complex shape instance.
         *
         * @attribute groupMarkers
         * @type Boolean
         */
        groupMarkers: {
            getter: function()
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 372);
_yuitest_coverline("build/series-base/series-base.js", 374);
var graph,
                    groupMarkers = this._groupMarkers;
                _yuitest_coverline("build/series-base/series-base.js", 376);
if(!groupMarkers) {
                    _yuitest_coverline("build/series-base/series-base.js", 377);
graph = this.get("graph");
                    _yuitest_coverline("build/series-base/series-base.js", 378);
if(graph)
                    {
                        _yuitest_coverline("build/series-base/series-base.js", 380);
groupMarkers = graph.get("groupMarkers");
                    }
                }
                _yuitest_coverline("build/series-base/series-base.js", 383);
return groupMarkers;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 386);
_yuitest_coverline("build/series-base/series-base.js", 388);
this._groupMarkers = val;
                _yuitest_coverline("build/series-base/series-base.js", 389);
return val;
            }
        }
    }
});


}, '@VERSION@', {"requires": ["graphics", "axis-base"]});
