/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

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
Y.SeriesBase = Y.Base.create("seriesBase", Y.Base, [Y.Renderer], {
    /**
     * @method render
     * @private
     */
    render: function()
    {
        this._setCanvas();
        this.addListeners();
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
        var graph = this.get("graph"),
            graphic = graph.get("graphic");
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
        var chart,
            graph = this.get("graph");
        if(graph)
        {
            chart = graph.get("chart");
        }
        if(!chart)
        {
            chart = this.get("graphic");
        }
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
        var valueCoord = this.get("direction") === "vertical" ? "x" : "y",
            total = this.get(valueCoord + "Axis").getTotalByKey(this.get(valueCoord + "Key"));
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
        var marker,
            markers = this.get("markers");
        if(this.get("rendered"))
        {
            if(this._stylesChangeHandle)
            {
                this._stylesChangeHandle.detach();
            }
            if(this._widthChangeHandle)
            {
                this._widthChangeHandle.detach();
            }
            if(this._heightChangeHandle)
            {
                this._heightChangeHandle.detach();
            }
            if(this._visibleChangeHandle)
            {
                this._visibleChangeHandle.detach();
            }
        }
        while(markers && markers.length > 0)
        {
            marker = markers.shift();
            if(marker && marker instanceof Y.Shape)
            {
                marker.destroy();
            }
        }
        if(this._path)
        {
            this._path.destroy();
            this._path = null;
        }
        if(this._lineGraphic)
        {
            this._lineGraphic.destroy();
            this._lineGraphic = null;
        }
        if(this._groupMarker)
        {
            this._groupMarker.destroy();
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
        var colors = {
                line: this._defaultLineColors,
                fill: this._defaultFillColors,
                border: this._defaultBorderColors,
                slice: this._defaultSliceColors
            },
            col = colors[type] || colors.fill,
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
                if(!this.get("rendered")) {
                    this.set("rendered", true);
                }
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
                var chart,
                    graph = this.get("graph");
                if(graph)
                {
                    chart = graph.get("chart");
                }
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
                var graph,
                    groupMarkers = this._groupMarkers;
                if(!groupMarkers) {
                    graph = this.get("graph");
                    if(graph)
                    {
                        groupMarkers = graph.get("groupMarkers");
                    }
                }
                return groupMarkers;
            },

            setter: function(val)
            {
                this._groupMarkers = val;
                return val;
            }
        }
    }
});


}, '3.15.0', {"requires": ["graphics", "axis-base"]});
