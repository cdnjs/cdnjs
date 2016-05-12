require([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/query",
	"dojo/dom-style",
	"dojo/_base/connect",
    "esri", // We're not directly using anything defined in esri.js but geometry, locator and utils are not AMD. So, the only way to get reference to esri object is through esri module (ie. esri/main)
    "esri/geometry",
    "esri/utils"
],
function(declare, domConstruct, query, domStyle, connect, esri) {
    var Widget = declare("HeatmapLayer", [esri.layers.DynamicMapServiceLayer], {
        properties: {},
        heatMap: null,
        // constructor
        constructor: function (properties) {
            declare.safeMixin(this.properties, properties);
            // map var
            this._map = this.properties.map;
            // last data storage
            this.lastData = [];
            // map node
            this.domNode = document.getElementById(this.properties.domNodeId);
            // config
            this.config = {
                element: this.domNode,
                width: this._map.width,
                height: this._map.height,
                radius: 40,
                debug: false,
                visible: true,
                useLocalMaximum: false,
                gradient: {
                    0.45: "rgb(000,000,255)",
                    0.55: "rgb(000,255,255)",
                    0.65: "rgb(000,255,000)",
                    0.95: "rgb(255,255,000)",
                    1.00: "rgb(255,000,000)"
                }
            };
            // mix in config for heatmap.js settings
            declare.safeMixin(this.config, properties.config);
            // create heatmap
            this.heatMap = heatmapFactory.create(this.config);
            // loaded
            this.loaded = true;
            this.onLoad(this);
            // global maximum value
            this.globalMax = 0;
			var _self = this;
            // connect on resize
			connect.connect(this._map, "onResize", this, this.resizeHeatmap);
            // heatlayer div styling
            this.domNode.style.position = 'relative';
            this.domNode.style.display = 'none';
        },
        resizeHeatmap: function (extent, width, height) {
            // set heatmap data size
            this.heatMap.set("width", width);
            this.heatMap.set("height", height);
            // set width and height of container
            domStyle.set(this.domNode, {
                "width": width + 'px',
                "height": height + 'px'
            });
            // set width and height of canvas element inside of container
            var child = query(':first-child', this.domNode);
            if (child) {
                child.attr('width', width);
                child.attr('height', height);
            }
            // set atx canvas width and height fix
            var actx = this.heatMap.get("actx");
            actx.canvas.height = height;
            actx.canvas.width = width;
            this.heatMap.set("actx", actx);
            // refresh image and heat map size
            this.refresh();
        },
        // stores heatmap converted data into the plugin which renders it
        storeHeatmapData: function (heatPluginData) {
            // set heatmap data
            this.heatMap.store.setDataSet(heatPluginData);
        },
        // converts parsed data into heatmap format
        convertHeatmapData: function (parsedData) {
            // variables
            var xParsed, yParsed, heatPluginData, dataPoint, screenGeometry;
            // set heat plugin data object
            heatPluginData = {
                max: parsedData.max,
                data: [] // empty data
            };
            // if data
            if (parsedData.data) {
                // for all x values
                for (xParsed in parsedData.data) {
                    // if data[x]
                    if (parsedData.data.hasOwnProperty(xParsed)) {
                        // for all y values and count
                        for (yParsed in parsedData.data[xParsed]) {
                            if (parsedData.data[xParsed].hasOwnProperty(yParsed)) {
                                // convert data point into screen geometry
                                screenGeometry = esri.geometry.toScreenGeometry(this._map.extent, this._map.width, this._map.height, parsedData.data[xParsed][yParsed].dataPoint);
                                // push to heatmap plugin data array
                                heatPluginData.data.push({
                                    x: screenGeometry.x,
                                    y: screenGeometry.y,
                                    count: parsedData.data[xParsed][yParsed].count // count value of x,y
                                });
                            }
                        }
                    }
                }
            }
            // store in heatmap plugin which will render it
            this.storeHeatmapData(heatPluginData);
        },
        // runs through data and calulates weights and max
        parseHeatmapData: function (features) {
            // variables
            var i, parsedData, dataPoint, attributes;
            // if data points exist
            if (features) {
                // create parsed data object
                parsedData = {
                    max: 0,
                    data: []
                };
                if (!this.config.useLocalMaximum) {
                    parsedData.max = this.globalMax;
                }
                // for each data point
                for (i = 0; i < features.length; i++) {
                    // create geometry point
                    dataPoint = esri.geometry.Point(features[i].geometry.x, features[i].geometry.y, this._map.spatialReference);
                    // check point
                    var validPoint = false;
                    // if not using local max, point is valid
                    if (!this.config.useLocalMaximum) {
                        validPoint = true;
                    }
                    // using local max, make sure point is within extent
                    else if(this._map.extent.contains(dataPoint)){
                        validPoint = true;
                    }
                    if (validPoint) {
                        // attributes
                        attributes = features[i].attributes;
                        // if array value is undefined
                        if (!parsedData.data[dataPoint.x]) {
                            // create empty array value
                            parsedData.data[dataPoint.x] = [];
                        }
                        // array value array is undefined
                        if (!parsedData.data[dataPoint.x][dataPoint.y]) {
                            // create object in array
                            parsedData.data[dataPoint.x][dataPoint.y] = {};
                            // if count is defined in datapoint
                            if (attributes && attributes.hasOwnProperty('count')) {
                                // create array value with count of count set in datapoint
                                parsedData.data[dataPoint.x][dataPoint.y].count = attributes.count;
                            } else {
                                // create array value with count of 0
                                parsedData.data[dataPoint.x][dataPoint.y].count = 0;
                            }
                        }
                        // add 1 to the count
                        parsedData.data[dataPoint.x][dataPoint.y].count += 1;
                        // store dataPoint var
                        parsedData.data[dataPoint.x][dataPoint.y].dataPoint = dataPoint;
                        // if count is greater than current max
                        if (parsedData.max < parsedData.data[dataPoint.x][dataPoint.y].count) {
                            // set max to this count
                            parsedData.max = parsedData.data[dataPoint.x][dataPoint.y].count;
                            if (!this.config.useLocalMaximum) {
                                this.globalMax = parsedData.data[dataPoint.x][dataPoint.y].count;
                            }
                        }

                    }
                }
                // convert parsed data into heatmap plugin formatted data
                this.convertHeatmapData(parsedData);
            }
        },
        // set data function call
        setData: function (features) {
            // set width/height
            this.resizeHeatmap(null, this._map.width, this._map.height);
            // store points
            this.lastData = features;
            // create data and then store it
            this.parseHeatmapData(features);
            // redraws the heatmap
            this.refresh();
        },
        // add one feature to the heatmap
        addDataPoint: function (feature) {
            if (feature) {
                // push to data
                this.lastData.push(feature);
                // set data
                this.setData(this.lastData);
            }
        },
        // return data set of features
        exportDataSet: function () {
            return this.lastData;
        },
        // clear data function
        clearData: function () {
            // empty heat map
            this.heatMap.clear();
            // empty array
            var empty = [];
            // set data to empty array
            this.setData(empty);
        },
        // get image
        getImageUrl: function (extent, width, height, callback) {
            // create heatmap data using last data
            this.parseHeatmapData(this.lastData);
            // image data
            var imageUrl = this.heatMap.get("canvas").toDataURL("image/png");
            // callback
            callback(imageUrl);
        }
    });
    return Widget;
});