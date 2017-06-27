(function () {

    MathUtils = typeof (MathUtils) === 'undefined' ? {} : MathUtils;

    MathUtils.power10 = function (p) {
        if (p >= 0) {
            var n = 1;
            for (var i = 0; i < p; i++)
                n *= 10;
            return n;
        } else {
            var n = 1.0;
            for (var i = 0; i < -p; i++)
                n *= 0.1;
            return n;
        }
    }

    MathUtils.getPrintFormat = function (min, max, std) {
        var extraPrec = 2;
        var posmax = Math.max(Math.abs(min), Math.abs(max));
        if (posmax === Infinity || std === Infinity || std === -Infinity || isNaN(posmax) || isNaN(std)) {
            return {
                toString: function (x) {
                    return x;
                }
            };
        }
        var log10 = Math.LN10;
        var p = posmax > 1e-12 ? Math.log(posmax) / log10 : 0;
        var alpha;
        if (std > 1e-12)
            alpha = Math.floor(Math.log(std) / log10) - extraPrec;
        else
            alpha = Math.floor(p - extraPrec);

        if (alpha < 0) { // i.e. nnnnn.ffff___
            var p2 = Math.floor(p);
            if (alpha <= -2 && p2 <= -4) { // 0.0000nn___  ->  0.nn x 10^-mmm
                var c1 = this.power10(-p2);
                return {
                    toString: function (x) {
                        return (x * c1).toFixed(-alpha + p2);
                    },

                    exponent: p2
                };
            }
            else // nnnnn.nn__ -> nnnnn.nn
                return {
                    toString: function (x) {
                        return x.toFixed(-alpha);
                    }
                };
        }
        else { // alpha >=0, i.e. nnnn___.___               
            if (alpha >= 2 && p > 5) { // nnnnnn.___  ->  nnnn x 10^mmm
                var c1 = this.power10(-alpha - extraPrec);
                return {
                    toString: function (x) {
                        return (x * c1).toFixed(extraPrec);
                    },

                    exponent: alpha + extraPrec
                };
            }
            else // alpha in [0,2), p in [alpha, 5], i.e. nnnnn.___ -> nnnnn.
                return {
                    toString: function (x) {
                        var y = x.toFixed();
                        if (x != y) y += ".";
                        return y;
                    }
                };
        }
    }
}());
var ChartViewer;
(function (ChartViewer) {
    function updateBag(bagA, bagB, replace, add, remove) {
        var output = {};
        for (var k in bagB) {
            var vA = bagA[k];
            var vB = bagB[k];
            if (typeof (vB) == "undefined")
                continue;
            if (typeof (vA) != "undefined") {
                if (vB == null) {
                    output[k] = vA;
                }
                else {
                    output[k] = replace(k, vA, vB);
                }
            }
            else {
                output[k] = add(k, vB);
            }
        }
        for (var k in bagA) {
            var vA = bagA[k];
            var vB = bagB[k];
            if (typeof (vA) == "undefined")
                continue;
            if (typeof (vB) == "undefined") {
                remove(k, vA);
            }
        }
        return output;
    }
    ChartViewer.updateBag = updateBag;
    function RgbaToString(rgba) {
        return "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
    }
    ChartViewer.RgbaToString = RgbaToString;
    function getTitle(def, seriesName) {
        if (def.titles && typeof def.titles[seriesName] != "undefined")
            return def.titles[seriesName];
        return seriesName;
    }
    ChartViewer.getTitle = getTitle;
    function updateProp(propName, obj1, obj2) {
        if (obj1[propName] === obj2[propName]) {
            return true;
        }
        else {
            obj1[propName] = obj2[propName];
            return false;
        }
    }
    ChartViewer.updateProp = updateProp;
    function isNumber(obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    }
    ChartViewer.isNumber = isNumber;
    function isString(obj) {
        return obj === obj + "";
    }
    ChartViewer.isString = isString;
    function isStringOrNumber(obj) {
        return isNumber(obj) || isString(obj);
    }
    ChartViewer.isStringOrNumber = isStringOrNumber;
    function deepCopyJS(obj) {
        var type = typeof obj;
        if (type !== 'object' || obj == null) {
            return obj;
        }
        else if (InteractiveDataDisplay.Utils.isArray(obj)) {
            var result = [];
            for (var i = 0; i < obj.length; i++)
                result.push(deepCopyJS(obj[i]));
            return result;
        }
        else {
            var result1 = {};
            for (var prop in obj) {
                result1[prop] = deepCopyJS(obj[prop]);
            }
            return result1;
        }
    }
    ChartViewer.deepCopyJS = deepCopyJS;
    function syncProps(obj1, obj2) {
        var wasUpdated = false;
        for (var key in obj2) {
            if (obj1[key] === undefined || (isStringOrNumber(obj1[key]) && !isStringOrNumber(obj2[key]))) {
                obj1[key] = deepCopyJS(obj2[key]);
                if (!wasUpdated)
                    wasUpdated = true;
            }
            else if (isStringOrNumber(obj2[key])) {
                var wasUpdatedloc = !updateProp(key, obj1, obj2);
                if (!wasUpdated)
                    wasUpdated = wasUpdatedloc;
            }
            else {
                var wasUpdatedloc = syncProps(obj1[key], obj2[key]);
                if (!wasUpdated)
                    wasUpdated = wasUpdatedloc;
            }
        }
        var unpresentedProperties = [];
        for (var prop in obj1) {
            if (prop === "d3Graphs" || prop === "isPresented")
                continue;
            var isPresented = false;
            for (var key in obj2) {
                if (key === prop) {
                    isPresented = true;
                    break;
                }
            }
            if (!isPresented) {
                unpresentedProperties.push(prop);
                if (!wasUpdated)
                    wasUpdated = true;
            }
        }
        unpresentedProperties.forEach(function (prop) {
            delete obj1[prop];
        });
        for (var i = 0; i < obj1.length; i++) {
            if (obj1[i] == undefined && typeof obj1 != "function") {
                obj1.splice(i, 1);
                i--;
            }
        }
        return wasUpdated;
    }
    ChartViewer.syncProps = syncProps;
    function GetMin(array) {
        var min = undefined;
        if (array != undefined) {
            for (var i = 0; i < array.length; i++) {
                if (!isNaN(array[i]) && (min === undefined || min > array[i])) {
                    min = array[i];
                }
            }
        }
        return min;
    }
    ChartViewer.GetMin = GetMin;
    function GetMax(array) {
        var max = undefined;
        if (array != undefined) {
            for (var i = 0; i < array.length; i++) {
                if (!isNaN(array[i]) && (max === undefined || max < array[i])) {
                    max = array[i];
                }
            }
        }
        return max;
    }
    ChartViewer.GetMax = GetMax;
    function getFormatter(arr, getRange) {
        var range = getRange(arr);
        var formatter = MathUtils.getPrintFormat(range.min, range.max, (range.max - range.min) / 4);
        return formatter;
    }
    ChartViewer.getFormatter = getFormatter;
    function get2dRange(arr) {
        var mins = [], maxes = [];
        for (var i = 0; i < arr.length; ++i) {
            mins.push(GetMin(arr[i]));
            maxes.push(GetMax(arr[i]));
        }
        return { min: GetMin(mins), max: GetMax(maxes) };
    }
    ChartViewer.get2dRange = get2dRange;
    function round(x, range, isCoords) {
        var log10 = 1 / Math.log(10);
        var beta = Math.floor(Math.log(range.max - range.min) * log10) - 2;
        if (isCoords)
            beta -= 2;
        if (beta <= 0) {
            if (-beta > 15)
                return parseFloat(x.toFixed(15));
            return parseFloat(x.toFixed(-beta));
        }
        else {
            var degree = Math.pow(10, beta - 1);
            return Math.round(x / degree) * degree;
        }
    }
    ChartViewer.round = round;
    function getCellContaining(dx, dy, x, y) {
        var n = x.length;
        var m = y.length;
        if (n == 0 || m == 0)
            return;
        if (dx < x[0] || dy < y[0] ||
            dx > x[n - 1] || dy > y[m - 1])
            return;
        var i;
        for (i = 1; i < n; i++) {
            if (dx <= x[i]) {
                if (isNaN(x[i - 1]))
                    return NaN;
                break;
            }
        }
        var j;
        for (j = 1; j < m; j++) {
            if (dy <= y[j]) {
                if (isNaN(y[j - 1]))
                    return NaN;
                break;
            }
        }
        if (i >= n || j >= m)
            return NaN;
        return { iLeft: i - 1, jBottom: j - 1 };
    }
    ChartViewer.getCellContaining = getCellContaining;
    ;
    function getArrayValue(xd, yd, x, y, array, mode) {
        var n = x.length;
        var m = y.length;
        if (n == 0 || m == 0)
            return null;
        var cell = getCellContaining(xd, yd, x, y);
        if (cell == undefined)
            return null;
        if (cell != cell)
            return NaN;
        var value;
        if (mode === "gradient") {
            var flb, flt, frt, frb;
            flt = array[cell.iLeft][cell.jBottom + 1];
            flb = array[cell.iLeft][cell.jBottom];
            frt = array[cell.iLeft + 1][cell.jBottom + 1];
            frb = array[cell.iLeft + 1][cell.jBottom];
            if (isNaN(flt) || isNaN(flb) || isNaN(frt) || isNaN(frb)) {
                value = NaN;
            }
            else {
                var y0 = y[cell.jBottom];
                var y1 = y[cell.jBottom + 1];
                var kyLeft = (flt - flb) / (y1 - y0);
                var kyRight = (frt - frb) / (y1 - y0);
                var fleft = kyLeft * (yd - y0) + flb;
                var fright = kyRight * (yd - y0) + frb;
                var x0 = x[cell.iLeft];
                var x1 = x[cell.iLeft + 1];
                var kx = (fright - fleft) / (x1 - x0);
                value = kx * (xd - x0) + fleft;
            }
        }
        else {
            value = array[cell.iLeft][cell.jBottom];
        }
        return value;
    }
    ChartViewer.getArrayValue = getArrayValue;
    ;
})(ChartViewer || (ChartViewer = {}));
var ChartViewer;
(function (ChartViewer) {
    ChartViewer.PlotRegistry = {};
})(ChartViewer || (ChartViewer = {}));
var ChartViewer;
(function (ChartViewer) {
    ChartViewer.PlotRegistry["band"] = {
        initialize: function (plotDefinition, viewState, chart) {
            var div = $("<div></div>")
                .attr("data-idd-name", plotDefinition.displayName)
                .appendTo(chart.host);
            var bandgraph = new InteractiveDataDisplay.Area(div, chart.master);
            chart.addChild(bandgraph);
            return [bandgraph];
        },
        draw: function (plots, plotDefinition) {
            var plot = plots[0];
            var bandDef = plotDefinition;
            plot.draw(bandDef);
        }
    };
})(ChartViewer || (ChartViewer = {}));
var ChartViewer;
(function (ChartViewer) {
    function PersistentViewState() {
        var that = this;
        var callbacks = [];
        function raisePropertyChanged(propName, extraData) {
            for (var i = 0; i < callbacks.length; ++i)
                callbacks[i](that, propName, extraData);
        }
        this.subscribe = function (callback) {
            callbacks.push(callback);
            return function () {
                var i = callbacks.indexOf(callback);
                if (i >= 0)
                    callbacks.splice(i, 1);
            };
        };
        var _axisTransform = undefined;
        Object.defineProperty(this, "axisTransform", {
            get: function () { return _axisTransform; },
            set: function (value) {
                if (value == _axisTransform)
                    return;
                _axisTransform = value;
                raisePropertyChanged("axisTransform");
            },
            configurable: false,
            enumerable: true
        });
        var _plotRect = undefined;
        Object.defineProperty(this, "plotRect", {
            get: function () { return _plotRect; },
            set: function (value) {
                if (value == _plotRect)
                    return;
                _plotRect = value;
                raisePropertyChanged("plotRect");
            },
            configurable: false,
            enumerable: true
        });
        var _mapType = undefined;
        Object.defineProperty(this, "mapType", {
            get: function () { return _mapType; },
            set: function (value) {
                if (value == _mapType)
                    return;
                _mapType = value;
                raisePropertyChanged("mapType");
            },
            configurable: false,
            enumerable: true
        });
        var _isAutoFit = undefined;
        Object.defineProperty(this, "isAutoFit", {
            get: function () { return _isAutoFit; },
            set: function (value) {
                if (value == _isAutoFit)
                    return;
                _isAutoFit = value;
                raisePropertyChanged("isAutoFit");
            },
            configurable: false,
            enumerable: true
        });
        var _isLogData = {};
        Object.defineProperty(this, "isLogData", {
            get: function () { return _isLogData; },
            configurable: false,
            enumerable: true
        });
        this.setLogDataForPlot = function (plotId, value) {
            _isLogData[plotId] = value;
            raisePropertyChanged("isLogData", { id: plotId });
        };
        var _selectedPlots = undefined;
        Object.defineProperty(this, "selectedPlots", {
            get: function () { return _selectedPlots; },
            set: function (value) {
                if (value == _selectedPlots)
                    return;
                _selectedPlots = value;
                raisePropertyChanged("selectedPlots");
            },
            configurable: false,
            enumerable: true
        });
        var _xAxisTitle = undefined;
        Object.defineProperty(this, "xAxisTitle", {
            get: function () { return _xAxisTitle; },
            set: function (value) {
                if (value == _xAxisTitle)
                    return;
                _xAxisTitle = value;
                raisePropertyChanged("xAxisTitle");
            },
            configurable: false,
            enumerable: true
        });
        var _yAxisTitle = undefined;
        Object.defineProperty(this, "yAxisTitle", {
            get: function () { return _yAxisTitle; },
            set: function (value) {
                if (value == _yAxisTitle)
                    return;
                _yAxisTitle = value;
                raisePropertyChanged("yAxisTitle");
            },
            configurable: false,
            enumerable: true
        });
        var _probesViewModel = undefined;
        Object.defineProperty(this, "probesViewModel", {
            get: function () { return _probesViewModel; },
            configurable: false,
            enumerable: true
        });
        this.initProbes = function (probes) {
            if (_probesViewModel === undefined) {
                _probesViewModel = new ChartViewer.ProbesVM(probes);
                _probesViewModel.subscribe(function (args) {
                    raisePropertyChanged("probes");
                });
            }
            else {
                throw "Probes are already initialized";
            }
        };
        var _uncertaintyRange = {};
        Object.defineProperty(this, "uncertaintyRange", {
            get: function () { return _uncertaintyRange; },
            set: function (value) {
                if (value == _uncertaintyRange)
                    return;
                _uncertaintyRange = value;
                raisePropertyChanged("uncertaintyRange");
            },
            configurable: false,
            enumerable: true
        });
    }
    ChartViewer.PersistentViewState = PersistentViewState;
    function TransientViewState() {
        var that = this;
        var callbacks = [];
        function raisePropertyChanged(propName, extraData) {
            for (var i = 0; i < callbacks.length; ++i)
                callbacks[i](that, propName, extraData);
        }
        this.subscribe = function (callback) {
            callbacks.push(callback);
        };
        this.unsubscribe = function (callback) {
            callbacks = callbacks.filter(function (cb) {
                return cb !== callback;
            });
        };
        var _ranges = {};
        Object.defineProperty(this, "ranges", {
            get: function () { return _ranges; },
            configurable: false,
            enumerable: true
        });
        var _plotXFormatter = MathUtils.getPrintFormat(0, 1, 0.25);
        Object.defineProperty(this, "plotXFormatter", {
            get: function () { return _plotXFormatter; },
            set: function (value) {
                if (value == _plotXFormatter)
                    return;
                _plotXFormatter = value;
                raisePropertyChanged("plotXFormatter");
            },
            configurable: false,
            enumerable: true
        });
        var _plotYFormatter = MathUtils.getPrintFormat(0, 1, 0.25);
        Object.defineProperty(this, "plotYFormatter", {
            get: function () { return _plotYFormatter; },
            set: function (value) {
                if (value == _plotYFormatter)
                    return;
                _plotYFormatter = value;
                raisePropertyChanged("plotYFormatter");
            },
            configurable: false,
            enumerable: true
        });
        this.setRangesForPlot = function (plotId, value) {
            _ranges[plotId] = value;
            raisePropertyChanged("ranges", { id: plotId });
        };
    }
    ChartViewer.TransientViewState = TransientViewState;
})(ChartViewer || (ChartViewer = {}));
var ChartViewer;
(function (ChartViewer) {
    var plotClickEvent = jQuery.Event("plotClick");
    function DraggableDOMPlot(host, master) {
        this.base = InteractiveDataDisplay.Plot;
        this.base(host, master);
        var that = this;
        var domElements = [];
        var addElement = function (jqElem, scaleMode, xld, ytd, wd, hd, ox, oy) {
            if (jqElem[0].tagName.toLowerCase() !== "div")
                throw "DOMPlot supports only DIV elements";
            jqElem._x = xld;
            jqElem._y = ytd;
            jqElem._width = wd && wd > 0 ? wd : 1;
            jqElem._height = hd && hd > 0 ? hd : 1;
            jqElem._originX = ox || 0;
            jqElem._originY = oy || 0;
            jqElem._scale = scaleMode || 'element';
            var updateElement = function (elt) {
                var screenToPlotX = that.coordinateTransform.screenToPlotX;
                var screenToPlotY = that.coordinateTransform.screenToPlotY;
                var plotToDataX = that.xDataTransform && that.xDataTransform.plotToData;
                var plotToDataY = that.yDataTransform && that.yDataTransform.plotToData;
                var screenToDataX = plotToDataX ? function (x) { return plotToDataX(screenToPlotX(x)); } : screenToPlotX;
                var screenToDataY = plotToDataY ? function (y) { return plotToDataY(screenToPlotY(y)); } : screenToPlotY;
                var currentPos = elt.position();
                elt._left = currentPos.left + elt._originX * elt.width();
                elt._top = currentPos.top + elt._originY * elt.height();
                elt._x = screenToDataX(currentPos.left + elt._originX * elt.width());
                elt._y = screenToDataY(currentPos.top + elt._originY * elt.height());
            };
            jqElem.on("drag", function (event, ui) {
                updateElement(jqElem);
            });
            jqElem.on("dragstop", function (event, ui) {
                updateElement(jqElem);
                that.invalidateLocalBounds();
                that.requestUpdateLayout();
            });
            jqElem.addClass("d3-dom-marker");
            jqElem.css('display', 'none').css('z-index', InteractiveDataDisplay.ZIndexDOMMarkers);
            domElements.push(jqElem);
        };
        host.children("div[data-idd-position]")
            .each(function () {
            var jqElem = $(this);
            var positions = jqElem.attr('data-idd-position').split(/\s+/g);
            if (positions.length < 2)
                throw "Position of the DOM marker should define x and y";
            var xld = parseFloat(positions[0]);
            var ytd = parseFloat(positions[1]);
            var wd, hd;
            var size = jqElem.attr('data-idd-size');
            if (size) {
                var sizes = size.split(/\s+/g);
                if (sizes.length >= 2) {
                    wd = parseFloat(sizes[0]);
                    hd = parseFloat(sizes[1]);
                }
            }
            var ox, oy;
            var origin = jqElem.attr('data-idd-origin');
            if (origin) {
                var origins = origin.split(/\s+/g);
                if (origins.length >= 2) {
                    ox = parseFloat(origins[0]);
                    oy = parseFloat(origins[1]);
                }
            }
            var scale = jqElem.attr('data-idd-scale');
            addElement(jqElem, scale, xld, ytd, wd, hd, ox, oy);
        });
        var getPosition = function (el) {
            var left = el._x - el._originX * el._width;
            var top = el._y + el._originY * el._height;
            return { left: left, top: top };
        };
        this.computeLocalBounds = function () {
            return undefined;
        };
        this.getLocalPadding = function () {
            var padding = 0;
            return { left: padding, right: padding, top: padding, bottom: padding };
        };
        this.arrange = function (finalRect) {
            InteractiveDataDisplay.CanvasPlot.prototype.arrange.call(this, finalRect);
            var width = finalRect.width;
            var height = finalRect.height;
            this.host.css('clip', 'rect(0px,' + width + 'px,' + height + 'px,0px)');
        };
        this.renderCore = function (plotRect, screenSize) {
            DraggableDOMPlot.prototype.renderCore.call(this, plotRect, screenSize);
            var n = domElements.length;
            if (n > 0) {
                var screenTop = 0;
                var screenBottom = screenSize.height;
                var screenLeft = 0;
                var screenRight = screenSize.width;
                var plotToScreenX = this.coordinateTransform.plotToScreenX;
                var plotToScreenY = this.coordinateTransform.plotToScreenY;
                var dataToPlotX = this.xDataTransform && this.xDataTransform.dataToPlot;
                var dataToPlotY = this.yDataTransform && this.yDataTransform.dataToPlot;
                var dataToScreenX = dataToPlotX ? function (x) { return plotToScreenX(dataToPlotX(x)); } : plotToScreenX;
                var dataToScreenY = dataToPlotY ? function (y) { return plotToScreenY(dataToPlotY(y)); } : plotToScreenY;
                for (var i = 0; i < n; i++) {
                    var el = domElements[i];
                    var p;
                    var size_p;
                    if (el._scale == 'none') {
                        size_p = {
                            x: el.width(),
                            y: el.height()
                        };
                        p = {
                            x: dataToScreenX(el._x),
                            y: dataToScreenY(el._y)
                        };
                        var left = p.x - el._originX * size_p.x;
                        var top = p.y - el._originY * size_p.y;
                        p = { x: left, y: top };
                    }
                    else {
                        var pos;
                        pos = getPosition(el);
                        p = {
                            x: dataToScreenX(pos.left),
                            y: dataToScreenY(pos.top)
                        };
                        size_p = {
                            x: dataToScreenX(pos.left + el._width) - p.x,
                            y: dataToScreenY(pos.top - el._height) - p.y
                        };
                    }
                    var clipRectTop = 0, clipRectLeft = 0, clipRectBottom = size_p.y, clipRectRight = size_p.x;
                    var elIsVisible;
                    var a1 = screenTop;
                    var a2 = screenBottom;
                    var b1 = p.y;
                    var b2 = p.y + size_p.y;
                    var c1 = Math.max(a1, b1);
                    var c2 = Math.min(a2, b2);
                    elIsVisible = c1 < c2;
                    if (elIsVisible) {
                        clipRectTop = c1 - p.y;
                        clipRectBottom = c2 - p.y;
                        a1 = screenLeft;
                        a2 = screenRight;
                        b1 = p.x;
                        b2 = p.x + size_p.x;
                        c1 = Math.max(a1, b1);
                        c2 = Math.min(a2, b2);
                        elIsVisible = c1 < c2;
                        if (elIsVisible) {
                            clipRectLeft = c1 - p.x;
                            clipRectRight = c2 - p.x;
                            el.css('left', p.x + 'px');
                            el.css('top', p.y + 'px');
                            el.css('display', 'block');
                            if (el._scale === 'content') {
                                var scalex = size_p.x / el.width();
                                var scaley = size_p.y / el.height();
                                el.css(InteractiveDataDisplay.CssPrefix + '-transform-origin', '0% 0%');
                                el.css(InteractiveDataDisplay.CssPrefix + '-transform', 'scale(' + scalex + ',' + scaley + ')');
                            }
                            else if (el._scale === 'element') {
                                el.css('width', size_p.x + 'px');
                                el.css('height', size_p.y + 'px');
                            }
                        }
                    }
                    if (!elIsVisible) {
                        el.css('display', 'none');
                    }
                }
            }
        };
        this.onIsRenderedChanged = function () {
            if (!this.isRendered) {
                var n = domElements.length;
                for (var i = 0; i < n; i++) {
                    var el = domElements[i];
                    el.css('display', 'none');
                }
            }
            else {
                var n = domElements.length;
                for (var i = 0; i < n; i++) {
                    var el = domElements[i];
                    el.css('z-index', InteractiveDataDisplay.ZIndexDOMMarkers);
                }
            }
        };
        this.clear = function () {
            var n = domElements.length;
            for (var i = 0; i < n; i++) {
                var el = domElements[i];
                el.remove();
            }
            domElements = [];
            this.invalidateLocalBounds();
            this.requestUpdateLayout();
        };
        this.add = function (element, scaleMode, x, y, width, height, originX, originY) {
            var el = $(element).appendTo(this.host);
            addElement(el, scaleMode, x, y, width, height, originX, originY);
            this.invalidateLocalBounds();
            this.requestUpdateLayout();
            return el.get(0);
        };
        var getElement = function (domEl) {
            var a = jQuery.grep(domElements, function (e) {
                return e[0] === domEl;
            });
            if (a && a.length > 0)
                return a[0];
            return undefined;
        };
        this.remove = function (element) {
            var removeJQ = function (jqe) {
                var el = getElement(jqe[0]);
                if (el) {
                    domElements.splice(domElements.indexOf(el), 1);
                }
                jqe.remove();
            };
            if (typeof element.remove == "function") {
                removeJQ(element);
            }
            else {
                removeJQ($(element));
            }
            this.invalidateLocalBounds();
            this.requestUpdateLayout();
        };
        this.set = function (element, x, y, width, height) {
            var myEl = getElement(element);
            if (!myEl)
                throw "Element is not found in the plot";
            myEl._x = x;
            myEl._y = y;
            if (myEl.scale != 'none') {
                if (width && width > 0)
                    myEl._width = width;
                if (height && height > 0)
                    myEl._height = height;
            }
            this.invalidateLocalBounds();
            this.requestUpdateLayout();
        };
        Object.defineProperty(this, "domElements", { get: function () { return domElements.slice(0); }, configurable: false });
        this.enableClickablePanel = false;
        that.master.centralPart.click(function (e) {
            if (that.enableClickablePanel) {
                var screenToPlotX = that.coordinateTransform.screenToPlotX;
                var screenToPlotY = that.coordinateTransform.screenToPlotY;
                var plotToDataX = that.xDataTransform && that.xDataTransform.plotToData;
                var plotToDataY = that.yDataTransform && that.yDataTransform.plotToData;
                var screenToDataX = plotToDataX ? function (x) { return plotToDataX(screenToPlotX(x)); } : screenToPlotX;
                var screenToDataY = plotToDataY ? function (y) { return plotToDataY(screenToPlotY(y)); } : screenToPlotY;
                var origin = InteractiveDataDisplay.Gestures.getXBrowserMouseOrigin(that.master.centralPart, e);
                var x = screenToDataX(origin.x);
                var y = screenToDataY(origin.y);
                that.host.trigger(plotClickEvent, { x: x, y: y });
            }
        });
    }
    ChartViewer.DraggableDOMPlot = DraggableDOMPlot;
    DraggableDOMPlot.prototype = new InteractiveDataDisplay.Plot;
    InteractiveDataDisplay.register('draggableMarkers', function (jqDiv, master) { return new DraggableDOMPlot(jqDiv, master); });
})(ChartViewer || (ChartViewer = {}));
var ChartViewer;
(function (ChartViewer) {
    function createSmallProbe(jqDiv, num, fill, scale) {
        jqDiv.empty();
        var canvasScale = scale !== undefined ? scale : 1;
        var canvas = $("<canvas width='" + (40 * canvasScale) + "' height='" + 40 * canvasScale + "'></canvas>").appendTo(jqDiv);
        var ctx = canvas.get(0).getContext("2d");
        var img = new Image();
        img.src = fill ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC45bDN+TgAAApdJREFUaEPtWc1KW0EUDrjL+9RVN2ZVNC1SaBdREewmYkW00NI+QVEkxJ+2/iBq1KX2CVrJM3Tj1ifIG9yebzhnvFxO4iR3Zm4C94Nvk8yc7zs/czOXVEower3eFLHqyCneVjxghk11iYkjsbbYRCDOJqzxfw+Pyf5NdyCxRtbz3viJQJDFrfG9624yv36STC8eDiTWYK2SSJwkIMSCxkSrc5/MrOyrZgextnKQtK/u04mETwICLGSEl75equaG4fK3TpwkEJgFjGB97ZdqaBS++XgcNgkE5MDezQuDJkHB8KQwAj7Gph8z41Rl+XxAJYim+jiwmrBP4mBzAn66QEFs9Ud52gzL2ocDf11ABYim+nh2a4IhCC1OIF8XaLOtvsuPlOXCnttnffh249RPFyQBXAE0oZCEZvwEHKr8wrETxSTgkWUCQJlADhaTQHmIn+g1Afyo4LaoCWnUquxaeTBzM82VgL1K7F78UcVCsHX5V8znv9BRgOhj5GV8BJIAWvpu60wV9EloeBkfAQWxYxSjC6nq5x8fAQWyXXjV/KEK+yBie62+AJUgmi6EfC/w9h6ggQLaLsyu+n+pR8wg1RegIsRgZyHI7GdBgW0XGp/PVSOjsPHlImz1BagM0XsXolRfQAK2C5vbd6qhYYgYUaovQIWIpgsQrq8dqcZciL0p8+GrL4AQC+YapaijkwUJ2lHa2vmtGhxE7Ik6OlmgYkQ7Su8/ud+TsLaQ0ckCwmzAGHq5/PydH2vGwrwABtiI0zWj0LnvBzJiz8PG91vVOIjvUtWPP/f9gEoS7Shp/yHgs7EanSxgiI0Zo3OrP615/KMz1uYFMMYGjeHXzbbhRJgXwCAbFdOTY14Ao0Qc7DQnw3yJoVCp/AcXkU+yAO498gAAAABJRU5ErkJggg=='
            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC45bDN+TgAAAylJREFUaEPVmdtOMjEUhX0Wn9CHwkPQeIxwwQ0SD1eaqIkHghEidxD1Dfrvb0KT+ScLpu0UEy6+xL1ou9fedGbKuNVqtTYaKW4SUkzl9/d329ipYVvNTUWKsWBqYW5guBoYk60QKYaCiYWZwc/PjxuNRu729tZdXl66drvtdnd3C/gbjc8+Pj4cY5mzmNuoECmGQGJv/PHx0R0fHzvTg2Ds09NTuZDkIqRYhzf/9fXlzs/PpckQLi4u3HQ6bVSEFFfhzb+/v7v9/X1pLAbWGA6HyUVIcRll8+xt07LAWqlFSFHhzbNtcnS+CmumbCcpKmzRHS66Jnu+Dq6JxYW9Y7H0UUWKVegIneFuY/FaeX5+jvoWpFiFjtCZmFtlKicnJ1HfghTL0Ak6wkPK4iAODg6CtGXwsCMnuS2WvjxSLEMnjOIpavGfcHd3RwFB34IUy/gCOApYvJKQLoeM6XQ6+QvgPGPxn3B4eJi/gJwPrjrIlb2Avb09mWwdkCt7AUdHRzLZOiBX9gK63a5MVibXRUyu7AVwa7P4T8h9Gy0eZJwWLQ5CdTmk856Yk6kUq9CJ7+/vKBOpkINc5LRY+ikjxSosZrh+vy+T5oQc5MpdQLGNPj8/ZdKckINc5LRY+ikjRQUdMYozu8VrgbXJQS6LpY8qUlTQEWPw8vIik+fg9fU1qvsgxWXQGc7qp6en0kATzs7Oon+NgRSXQWfo0NvbmzTRBF4UsDY5LJb5FVJcBR0yiiOvxVmIOT5XkeIq6JAxmEwm0kwKrMWarG2xzLsMKdZBpwx3fX0tDcVwc3OT3H2QYh10yhjM5/NGp1TmsgZrsaZpMt8qpBiCLyLmjFSlyStFjxRDscTFVrq6upIGV8Ec5rKGxXL9EKQYCp0ziq0U+3q96dbxSDEGXwRnmJDfzYwZj8dZzIMUY/FF3N/fS9NlGJPLPEgxBTNUHDN6vZ40Dnxm4xrv+zJSTIGOGoPZbFa83zTtP9D4jDGMZU4OpJiKL6L6PwT+RsttHqTYBF8EhzOLC1IPaiFIsSm+iIeHBwfrMg9SzMGiCB50sBbzIMVNQoqbhBQ3h9bWP/HfsYvIwP9AAAAAAElFTkSuQmCC';
        ctx.drawImage(img, 0, 0, 40 * canvasScale, 40 * canvasScale);
        if (num !== undefined) {
            ctx.fillStyle = "white";
            var fontsize = (num < 10 ? 14 : 11) * canvasScale;
            ctx.font = fontsize + "px Arial";
            var offsetX = (num < 10 ? 16 : 13) * canvasScale;
            ctx.fillText(num, offsetX, 20 * canvasScale);
        }
    }
    ChartViewer.createSmallProbe = createSmallProbe;
    ;
    function ProbePull(hostDiv, d3Div) {
        var _host = hostDiv;
        var draggable = $("<div></div>").addClass("dragPoint").addClass("probe").appendTo(_host);
        draggable.draggable({
            containment: "document",
            scroll: false,
            zIndex: 2500,
            helper: function () {
                var hdr = $("<div></div>").addClass("dragPoint");
                createSmallProbe(hdr);
                return hdr;
            },
            appendTo: d3Div
        });
        draggable.mousedown(function (e) {
            e.stopPropagation();
        });
    }
    ChartViewer.ProbePull = ProbePull;
    ;
    function OnScreenNavigation(div, d3Chart, persistentViewState) {
        var that = this;
        InteractiveDataDisplay.NavigationPanel(d3Chart, div, 'https://github.com/predictionmachines/InteractiveDataDisplay/wiki/UI-Guidelines#chartviewer');
        var legendViewer = div.find('.idd-onscreennavigation-showlegend');
        legendViewer.remove();
        legendViewer = div.find('.idd-onscreennavigation-hidelegend');
        legendViewer.remove();
        var hideShowLegend = $('<div></div>').addClass("idd-onscreennavigation-hidelegend").prependTo(div);
    }
    ChartViewer.OnScreenNavigation = OnScreenNavigation;
})(ChartViewer || (ChartViewer = {}));
var ChartViewer;
(function (ChartViewer) {
    var PlotViewer = (function () {
        function PlotViewer(div, navigationDiv, persistentViewState, transientViewState) {
            this.currentPlots = {};
            this.div = div;
            var that = this;
            var iddDiv = this.iddDiv = $("<div data-idd-plot='chart'></div>").appendTo(div);
            iddDiv.width(div.width());
            iddDiv.height(div.height());
            var iddChart = this.iddChart = InteractiveDataDisplay.asPlot(iddDiv);
            iddChart.legend.isVisible = false;
            iddChart.isToolTipEnabled = false;
            iddChart.doFitOnDataTransformChanged = false;
            var onscreenNavigationContainer = $("<div></div>").addClass("dsv-onscreennavigationcontainer").attr("data-idd-placement", "center").appendTo(navigationDiv);
            var onscreenNavigationDiv = $("<div></div>").addClass("dsv-onscreennavigation").appendTo(onscreenNavigationContainer);
            var onscreenNavigation = new ChartViewer.OnScreenNavigation(onscreenNavigationDiv, iddChart, persistentViewState);
            var probesPlot_div = $("<div></div>")
                .attr("data-idd-name", "draggableMarkers")
                .appendTo(iddChart.host);
            var probesPlot = new ChartViewer.DraggableDOMPlot(probesPlot_div, iddChart);
            probesPlot.order = 9007199254740991;
            iddChart.addChild(probesPlot);
            this.persistentViewState = persistentViewState;
            persistentViewState.probesViewModel.getProbeContent = function (probe) {
                var children = iddChart.children;
                var result = [];
                for (var i = 0; i < children.length; i++) {
                    if (children[i].isVisible) {
                        var xd = children[i].xDataTransform ? children[i].xDataTransform.plotToData(probe.location.x) : probe.location.x;
                        var yd = children[i].yDataTransform ? children[i].yDataTransform.plotToData(probe.location.y) : probe.location.y;
                        var tt = children[i].getTooltip(probe.location.x, probe.location.y, xd, yd, true);
                        if (tt !== undefined) {
                            result.push(tt);
                        }
                    }
                }
                if (result.length > 0) {
                    return result;
                }
                else
                    return undefined;
            };
            var addNewProbe = function (probe) {
                var id = probe.id;
                var x = probe.location.x;
                var y = probe.location.y;
                var draggable = $("<div></div>");
                draggable.addClass("dragPoint");
                probesPlot.add(draggable, 'none', x, y, undefined, undefined, 0.5, 1);
                var children = probesPlot.domElements;
                var addedDragable = children[children.length - 1];
                addedDragable.id = id;
                draggable.draggable({
                    containment: probesPlot.master.centralPart[0],
                    scroll: false,
                    drag: function () {
                    },
                    stop: function (event, ui) {
                        var pinCoord = { x: addedDragable._x, y: addedDragable._y };
                        persistentViewState.probesViewModel.updateProbe(id, pinCoord);
                    },
                    start: function () {
                    }
                });
                if (probe.selected) {
                    ChartViewer.createSmallProbe(draggable, id, "#365C95");
                }
                else {
                    ChartViewer.createSmallProbe(draggable, id);
                }
            };
            probesPlot.host.droppable({
                accept: ".probe",
                tolerance: "fit",
                drop: function (event, ui) {
                    var pos = $(this).offset();
                    var probePosition = {
                        x: ui.position.left + ui.draggable.width() / 2,
                        y: ui.position.top + ui.draggable.height()
                    };
                    var cs = probesPlot.coordinateTransform;
                    var x = iddChart.xDataTransform ? iddChart.xDataTransform.plotToData(cs.screenToPlotX(probePosition.x)) : cs.screenToPlotX(probePosition.x);
                    var y = iddChart.yDataTransform ? iddChart.yDataTransform.plotToData(cs.screenToPlotY(probePosition.y)) : cs.screenToPlotY(probePosition.y);
                    var id = persistentViewState.probesViewModel.addProbe({ x: x, y: y });
                    addNewProbe({ id: id, location: { x: x, y: y } });
                },
            });
            persistentViewState.probesViewModel.subscribe(function (args) {
                var probe = args.probe;
                switch (args.status) {
                    case "fit":
                        var eps = 1e-7;
                        var children = probesPlot.domElements;
                        for (var i = 0; i < children.length; i++) {
                            var draggable = children[i];
                            if (draggable.id === probe.id) {
                                var curPlotRect = iddChart.visibleRect;
                                var x = iddChart.xDataTransform ? iddChart.xDataTransform.dataToPlot(draggable._x) : draggable._x;
                                var y = iddChart.yDataTransform ? iddChart.yDataTransform.dataToPlot(draggable._y) : draggable._y;
                                if (Math.abs(x - curPlotRect.x - curPlotRect.width / 2) > eps || Math.abs(y - curPlotRect.y - curPlotRect.height / 2) > eps) {
                                    iddChart.navigation.setVisibleRect({ x: x - curPlotRect.width / 2, y: y - curPlotRect.height / 2, width: curPlotRect.width, height: curPlotRect.height }, true);
                                }
                                break;
                            }
                        }
                        break;
                    case "remove":
                        var children = probesPlot.domElements;
                        for (var i = 0; i < children.length; i++) {
                            var draggable = children[i];
                            if (draggable.id === probe.id) {
                                probesPlot.remove(draggable);
                                break;
                            }
                        }
                        break;
                    case "unselected":
                        var children = probesPlot.domElements;
                        for (var i = 0; i < children.length; i++) {
                            var possibleProbe = children[i];
                            ChartViewer.createSmallProbe(possibleProbe, possibleProbe.id);
                        }
                        break;
                    case "selected":
                        var children = probesPlot.domElements;
                        for (var i = 0; i < children.length; i++) {
                            var possibleProbe = children[i];
                            if (possibleProbe.id === probe.id) {
                                ChartViewer.createSmallProbe(possibleProbe, possibleProbe.id, "#365C95");
                            }
                            else {
                                ChartViewer.createSmallProbe(possibleProbe, possibleProbe.id);
                            }
                        }
                        break;
                }
            });
            var existingProbes = persistentViewState.probesViewModel.getProbes();
            for (var i = 0; i < existingProbes.length; i++) {
                addNewProbe(existingProbes[i]);
            }
            iddDiv.on("visibleRectChanged", function () {
                var plotRect = iddChart.visibleRect;
                transientViewState.plotXFormatter = MathUtils.getPrintFormat(plotRect.x, plotRect.x + plotRect.width, plotRect.width / 4);
                transientViewState.plotYFormatter = MathUtils.getPrintFormat(plotRect.y, plotRect.y + plotRect.height, plotRect.height / 4);
                persistentViewState.plotRect = plotRect;
                if (persistentViewState.probesViewModel !== undefined) {
                    persistentViewState.probesViewModel.refresh();
                }
            });
            persistentViewState.subscribe(function (state, propName) {
                if (propName == "selectedPlots")
                    that.setupPlotsVisibility();
            });
        }
        PlotViewer.prototype.setupPlotsVisibility = function () {
            for (var id in this.currentPlots) {
                var p = this.currentPlots[id];
                var iddPlots = p.Plots;
                if (iddPlots) {
                    var isVisible = this.persistentViewState.selectedPlots.indexOf(p.Id) == -1;
                    for (var j = 0; j < iddPlots.length; ++j)
                        iddPlots[j].isVisible = isVisible;
                }
            }
        };
        PlotViewer.prototype.checkLatLon = function (plot) {
            var isLat = function (str) {
                var lower = str.toLowerCase();
                return lower === "lat" || lower === "latitude";
            };
            var isLon = function (str) {
                var lower = str.toLowerCase();
                return lower === "lon" || lower === "longitude";
            };
            return plot["x"] !== undefined && isLon(ChartViewer.getTitle(plot, "x")) && plot["y"] !== undefined && isLat(ChartViewer.getTitle(plot, "y"));
        };
        PlotViewer.prototype.addPlot = function (p) {
            var factory = ChartViewer.PlotRegistry[p.Definition.kind] ? ChartViewer.PlotRegistry[p.Definition.kind] : ChartViewer.PlotRegistry["fallback"];
            p.Plots = factory.initialize(p.Definition, this.persistentViewState, this.iddChart);
            try {
                factory.draw(p.Plots, p.Definition);
            }
            catch (ex) {
                if (p.Plots !== undefined)
                    p.Plots.forEach(function (graph) { graph.remove(); });
                factory = ChartViewer.PlotRegistry["fallback"];
                p.Definition["error"] = ex.message;
                p.Plots = factory.initialize(p.Definition, this.persistentViewState, this.iddChart);
                factory.draw(p.Plots, p.Definition);
            }
        };
        PlotViewer.prototype.updateAxes = function () {
            var xAxisStr = "";
            var yAxisStr = "";
            var xNames = [];
            var yNames = [];
            for (var id in this.currentPlots) {
                var p = this.currentPlots[id];
                var def = p.Definition;
                if (def["x"]) {
                    var xStr = ChartViewer.getTitle(def, "x");
                    var contains = false;
                    for (var i = 0; i < xNames.length; i++) {
                        if (xNames[i] === xStr) {
                            contains = true;
                            break;
                        }
                    }
                    if (!contains) {
                        xNames.push(xStr);
                        if (xAxisStr !== "") {
                            xAxisStr += ", ";
                        }
                        xAxisStr += xStr;
                    }
                }
                if (def["y"]) {
                    var yStr = ChartViewer.getTitle(def, "y");
                    var contains = false;
                    for (var i = 0; i < yNames.length; i++) {
                        if (yNames[i] === yStr) {
                            contains = true;
                            break;
                        }
                    }
                    if (!contains) {
                        yNames.push(yStr);
                        if (yAxisStr !== "") {
                            yAxisStr += ", ";
                        }
                        yAxisStr += yStr;
                    }
                }
            }
            if (xAxisStr !== "") {
                if (this.xAxisTitle === undefined) {
                    this.xAxisTitle = $(this.iddChart.addDiv('<div style="font-size: larger; text-align: center"></div>', "bottom"));
                }
                this.xAxisTitle.text(xAxisStr);
            }
            else {
                if (this.xAxisTitle !== undefined) {
                    this.iddChart.removeDiv(this.xAxisTitle[0]);
                    this.xAxisTitle.remove();
                    this.xAxisTitle = undefined;
                }
            }
            if (yAxisStr !== "") {
                if (this.yAxisTitle === undefined) {
                    this.yAxisTitle =
                        $(this.iddChart.addDiv('<div class="dsv-leftaxistitle"></div>', "left"));
                }
                this.yAxisTitle.text(yAxisStr);
            }
            else {
                if (this.yAxisTitle !== undefined) {
                    this.iddChart.removeDiv(this.yAxisTitle[0]);
                    this.yAxisTitle.remove();
                    this.yAxisTitle = undefined;
                }
            }
        };
        PlotViewer.prototype.createMap = function () {
            var div = $("<div></div>")
                .attr("data-idd-name", "bingMaps")
                .css("z-index", 0)
                .prependTo(this.iddChart.host);
            var plot = new InteractiveDataDisplay.BingMapsPlot(div, this.iddChart);
            plot.order = 9007199254740991;
            this.iddChart.addChild(plot);
            return plot;
        };
        PlotViewer.prototype.updateMap = function () {
            var shouldContainMap = false;
            var first = true;
            for (var id in this.currentPlots) {
                var p = this.currentPlots[id];
                shouldContainMap = (first || shouldContainMap) && this.checkLatLon(p.Definition);
                first = false;
            }
            if (shouldContainMap && typeof Microsoft !== 'undefined') {
                if (this.bingMapsPlot === undefined) {
                    this.bingMapsPlot = this.createMap();
                    if (this.persistentViewState.mapType)
                        this.bingMapsPlot.setMap(this.persistentViewState.mapType);
                    else
                        this.bingMapsPlot.setMap(Microsoft.Maps.MapTypeId.road);
                    this.iddChart.yDataTransform = InteractiveDataDisplay.mercatorTransform;
                    this.iddChart.xDataTransform = undefined;
                }
                else {
                    if (this.persistentViewState.mapType)
                        this.bingMapsPlot.setMap(this.persistentViewState.mapType);
                }
            }
            else {
                if (this.bingMapsPlot !== undefined) {
                    this.bingMapsPlot.remove();
                    this.bingMapsPlot = undefined;
                    this.iddChart.yDataTransform = undefined;
                }
            }
        };
        PlotViewer.prototype.draw = function (plots) {
            var that = this;
            this.currentPlots = ChartViewer.updateBag(this.currentPlots, plots, function (id, oldPlot, newPlot) {
                if (oldPlot.Definition.kind == newPlot.Definition.kind) {
                    if (ChartViewer.syncProps(oldPlot.Definition, newPlot.Definition))
                        ChartViewer.PlotRegistry[oldPlot.Definition.kind].draw(oldPlot.Plots, oldPlot.Definition);
                    return oldPlot;
                }
                else {
                    if (oldPlot.Plots !== undefined)
                        oldPlot.Plots.forEach(function (graph) { graph.remove(); });
                    that.addPlot(newPlot);
                    return newPlot;
                }
            }, function (id, newPlot) {
                that.addPlot(newPlot);
                return newPlot;
            }, function (id, p) {
                if (p.Plots !== undefined)
                    p.Plots.forEach(function (graph) { graph.remove(); });
            });
            this.updateAxes();
            this.persistentViewState.probesViewModel.refresh();
            this.updateMap();
            var z = 0;
            for (var id in this.currentPlots) {
                var p = this.currentPlots[id];
                if (p.ZIndex)
                    z = Math.max(p.ZIndex, z);
            }
            for (var id in this.currentPlots) {
                var p = this.currentPlots[id];
                if (!p.ZIndex)
                    p.ZIndex = ++z;
                if (!p.Plots)
                    continue;
                for (var j = 0; j < p.Plots.length; ++j)
                    p.Plots[j].host.css("z-index", p.ZIndex);
            }
            if (this.persistentViewState.selectedPlots)
                this.setupPlotsVisibility();
            return this.currentPlots;
        };
        PlotViewer.prototype.updateLayout = function () {
            this.iddDiv.width(this.div.width());
            this.iddDiv.height(this.div.height());
            this.iddChart.updateLayout();
            if (this.bingMapsPlot !== undefined) {
                this.iddChart.navigation.setVisibleRect(this.iddChart.visibleRect, false);
            }
        };
        return PlotViewer;
    })();
    ChartViewer.PlotViewer = PlotViewer;
})(ChartViewer || (ChartViewer = {}));
var ChartViewer;
(function (ChartViewer) {
    function PlotList(rootDiv, plotViewer, persistentViewState, transientViewState) {
        var that = this;
        var _isEditable = true;
        var _cards = [];
        var _plots = [];
        rootDiv.addClass("dsv-plotlist");
        var legendDiv = $("<div></div>").appendTo(rootDiv);
        var legend = new InteractiveDataDisplay.Legend(plotViewer.iddChart, legendDiv);
        plotViewer.iddChart.host.bind("visibleChanged", function () {
            persistentViewState.probesViewModel.refresh(persistentViewState.probesViewModel.getProbes());
        });
        persistentViewState.probesViewModel.refresh(persistentViewState.probesViewModel.getProbes());
        var probesDiv = $("<div></div>").addClass('probes').appendTo(rootDiv);
        var probesTitle = $("<div style='width:240px; margin-bottom: 16px'></div>").appendTo(probesDiv);
        var probePullDiv = $("<div></div>").addClass("dsv-onscreennavigation-probepull").appendTo(probesTitle);
        var probePull = new ChartViewer.ProbePull(probePullDiv, plotViewer.iddChart.centralPart);
        var titleDiv = $("<div style='width: 195px; display:inline-block'></div>").appendTo(probesTitle);
        $("<div style='width:180px; height:1px; margin-bottom:6px; float:right; margin-top: 8px; background-color:lightgrey'></div>").appendTo(titleDiv);
        $("<div style='float:left; margin-left:15px;font-family: Segoe UI;font-size: 12px;color:grey; margin-bottom:16px'>Probes</div>").appendTo(titleDiv);
        var probeListHost = $("<div></div>").addClass("probes-list").appendTo(probesDiv);
        probeListHost[0].style.display = "none";
        var probesControl = new ChartViewer.ProbesControl(probesDiv, probeListHost, persistentViewState, transientViewState);
        this.remove = function () {
            plotViewer.iddChart.host.bind("visibleChanged");
            legend.remove();
        };
    }
    ChartViewer.PlotList = PlotList;
})(ChartViewer || (ChartViewer = {}));
var ChartViewer;
(function (ChartViewer) {
    var ChartViewerControl = (function () {
        function ChartViewerControl(container) {
            this.rightPanelExtraShift = 3;
            this.navigationPanelShift = 65;
            this.minWidthToShowLeftPanel = 540;
            this.plotList = undefined;
            this.viewState = undefined;
            var that = this;
            var controlDiv = this.controlDiv = $(container);
            this.persistentViewState = this.viewState = new ChartViewer.PersistentViewState();
            this.persistentViewState.initProbes();
            this.transientViewState = new ChartViewer.TransientViewState();
            var width = controlDiv.width();
            var height = controlDiv.height();
            if (width === 0)
                controlDiv.width(400);
            if (height === 0)
                controlDiv.height(400);
            var visControl = $("<div class='dsv-visualizaition-control'></div>");
            controlDiv.append(visControl);
            var leftPanelCont = $("<div class='dsv-leftpanelcontainer'></div>");
            visControl.append(leftPanelCont);
            var rightPanel = $("<div class='dsv-rightpanel'></div>");
            visControl.append(rightPanel);
            var leftPanel = $("<div class='dsv-leftpanel'></div>");
            leftPanelCont.append(leftPanel);
            leftPanel.append($("<div class='plotlist'></div>"));
            rightPanel.append($("<div class='dsv-visualization-preview'></div>"));
            var navigationDiv = $("<div class='dsv-navigation-container'></div>").appendTo(visControl);
            navigationDiv.addClass('no-print');
            var rightpanel = this.rightpanel = controlDiv.find(".dsv-rightpanel");
            var leftpanel = controlDiv.find(".dsv-leftpanel");
            var leftPanelContainer = this.leftPanelContainer = controlDiv.find(".dsv-leftpanelcontainer");
            var isLeftpanelShown = false;
            this.plotViewer = new ChartViewer.PlotViewer(controlDiv.find(".dsv-visualization-preview"), navigationDiv, this.persistentViewState, this.transientViewState);
            var plotListDiv = controlDiv.find(".plotlist");
            this.plotList = new ChartViewer.PlotList(plotListDiv, this.plotViewer, this.persistentViewState, this.transientViewState);
            this.plotList.isEditable = false;
            var hideShowLegend = navigationDiv[0].children[0].firstChild.firstChild;
            $(hideShowLegend).click(function () {
                if (isLeftpanelShown) {
                    isLeftpanelShown = false;
                    leftpanel.hide();
                    $(hideShowLegend).removeClass("idd-onscreennavigation-showlegend").addClass("idd-onscreennavigation-hidelegend");
                }
                else {
                    isLeftpanelShown = true;
                    leftpanel.show();
                    $(hideShowLegend).removeClass("idd-onscreennavigation-hidelegend").addClass("idd-onscreennavigation-showlegend");
                }
                rightpanel.width(controlDiv.width() - leftPanelContainer.width() - that.rightPanelExtraShift - that.navigationPanelShift);
                that.plotViewer.updateLayout();
            });
            leftpanel.hide();
            rightpanel.width(controlDiv.width() - leftPanelContainer.width() - this.rightPanelExtraShift - this.navigationPanelShift);
            $(window).resize(function () { that.updateLayout(); });
            this.updateLayout();
        }
        ChartViewerControl.prototype.update = function (chartInfo) {
            var plotItems = {};
            for (var id in chartInfo) {
                var plotInfo = chartInfo[id];
                if (plotInfo != null) {
                    plotItems[id] = {
                        Id: id,
                        Definition: plotInfo
                    };
                    if (plotInfo.displayName === null || typeof plotInfo.displayName === "undefined") {
                        plotInfo = $.extend(false, {}, plotInfo);
                        plotInfo.displayName = id;
                        plotItems[id].Definition = plotInfo;
                    }
                }
                else
                    plotItems[id] = null;
            }
            plotItems = this.plotViewer.draw(plotItems);
        };
        ChartViewerControl.prototype.updateLayout = function () {
            var widthToSubtract = 0;
            if (this.controlDiv.width() < this.minWidthToShowLeftPanel && this.leftPanelContainer !== undefined)
                this.leftPanelContainer.hide();
            else if (this.leftPanelContainer !== undefined) {
                this.leftPanelContainer.show();
                widthToSubtract = this.leftPanelContainer.width();
            }
            this.rightpanel.width(this.controlDiv.width() - widthToSubtract - this.rightPanelExtraShift - this.navigationPanelShift);
            this.plotViewer.updateLayout();
        };
        ChartViewerControl.prototype.dispose = function () {
            this.plotList.remove();
            this.controlDiv.children().remove();
        };
        return ChartViewerControl;
    })();
    ChartViewer.ChartViewerControl = ChartViewerControl;
})(ChartViewer || (ChartViewer = {}));
var ChartViewer;
(function (ChartViewer) {
    function ProbesVM(initialProbes) {
        var that = this;
        var lastUsedProbeIndex = 0;
        var _callbacks = [];
        var _probes = [];
        var raiseProbeUpdated = function (probe, status) {
            if (_callbacks.length > 0) {
                for (var i = 0; i < _callbacks.length; i++) {
                    _callbacks[i]({ probe: probe, status: status });
                }
            }
        };
        this.subscribe = function (callback) {
            _callbacks.push(callback);
        };
        this.clear = function () {
            var probesToRemove = _probes.slice(0);
            for (var i = 0; i < probesToRemove.length; i++) {
                that.removeProbe(probesToRemove[i].id);
            }
        };
        this.addProbe = function (plotCoord) {
            var newProbe = { id: ++lastUsedProbeIndex, location: plotCoord, selected: false };
            _probes.push(newProbe);
            raiseProbeUpdated(newProbe, "add");
            return newProbe.id;
        };
        this.removeProbe = function (id) {
            var probeToRemove = undefined;
            for (var i = 0; i < _probes.length; i++) {
                var probe = _probes[i];
                if (probe.id == id) {
                    probeToRemove = probe;
                    break;
                }
            }
            if (probeToRemove !== undefined) {
                _probes = _probes.filter(function (p) { return p !== probeToRemove; });
                raiseProbeUpdated(probeToRemove, "remove");
            }
        };
        this.updateProbe = function (id, plotCoord) {
            var probeToUpdate = undefined;
            for (var i = 0; i < _probes.length; i++) {
                var probe = _probes[i];
                if (probe.id == id) {
                    probeToUpdate = probe;
                    break;
                }
            }
            if (probeToUpdate !== undefined) {
                probeToUpdate.location = plotCoord;
                raiseProbeUpdated(probeToUpdate, "update");
            }
        };
        this.selectProbe = function (id) {
            if (id === -1) {
                for (var i = 0; i < _probes.length; i++) {
                    var probe = _probes[i];
                    probe.selected = false;
                }
                raiseProbeUpdated(undefined, "unselected");
                return;
            }
            var selectedProbe = undefined;
            for (var i = 0; i < _probes.length; i++) {
                var probe = _probes[i];
                if (probe.id == id) {
                    selectedProbe = probe;
                    selectedProbe.selected = true;
                }
                else {
                    probe.selected = false;
                }
            }
            if (selectedProbe !== undefined) {
                raiseProbeUpdated(selectedProbe, "selected");
            }
        };
        this.fitToProbe = function (id) {
            var selectedProbe = undefined;
            for (var i = 0; i < _probes.length; i++) {
                var probe = _probes[i];
                if (probe.id == id) {
                    selectedProbe = probe;
                    raiseProbeUpdated(selectedProbe, "fit");
                }
            }
        };
        this.getProbes = function () {
            return _probes.slice(0);
        };
        this.getProbeContent = function (probe) {
            return undefined;
        };
        this.refresh = function () {
            if (that.onRefresh !== undefined) {
                that.onRefresh(_probes.slice(0));
            }
        };
        if (initialProbes !== undefined) {
            for (var i = 0; i < initialProbes.length; i++) {
                var newProbe = { id: initialProbes[i].id, location: { x: initialProbes[i].location.x, y: initialProbes[i].location.y }, selected: initialProbes[i].selected };
                _probes.push(newProbe);
                if (newProbe.id > lastUsedProbeIndex)
                    lastUsedProbeIndex = newProbe.id;
            }
        }
    }
    ChartViewer.ProbesVM = ProbesVM;
    function ProbesControl(div, hostDiv, persistentViewState, transientViewState) {
        var probesVM = persistentViewState.probesViewModel;
        var _host = hostDiv;
        var probeDivs = [];
        var getProbeDiv = function (probe) {
            div[0].style.display = "block";
            var probeDiv = $("<div></div>").addClass("probeCard");
            if (probe.selected === true) {
                probeDiv.addClass("probeCard-selected");
            }
            var iconScale = 0.6;
            var probeHeader = $("<div></div>").addClass("probeHeader").appendTo(probeDiv).height(40 * iconScale);
            var probeIcon = $("<div></div>").addClass("probe").css("float", "left").css("margin-right", 3).width(40 * iconScale).height(40 * iconScale).appendTo(probeHeader);
            if (probe.selected) {
                ChartViewer.createSmallProbe(probeIcon, probe.id, "#365C95", iconScale);
            }
            else {
                ChartViewer.createSmallProbe(probeIcon, probe.id, undefined, iconScale);
            }
            $("<div></div>").addClass("probeHeader-name").text(transientViewState.plotXFormatter.toString(probe.location.x) + ", " + transientViewState.plotYFormatter.toString(probe.location.y)).appendTo(probeHeader);
            var actionPanel = $("<div></div>").addClass("probeActionPanel").appendTo(probeDiv);
            var deleteBtn = $("<div></div>").addClass("probeCard-remove").appendTo(actionPanel);
            deleteBtn.click(function () {
                probesVM.removeProbe(probe.id);
                if (persistentViewState.uncertaintyRange !== undefined && persistentViewState.uncertaintyRange.probeid === probe.id) {
                    persistentViewState.uncertaintyRange = undefined;
                }
                if (hostDiv[0].childNodes.length == 0)
                    hostDiv[0].style.display = "none";
            });
            var fitBtn = $("<div></div>").addClass("probeCard-fit").appendTo(actionPanel);
            fitBtn.click(function () {
                probesVM.fitToProbe(probe.id);
            });
            var tooltip = probesVM.getProbeContent(probe);
            if (tooltip !== undefined) {
                for (var i = 0; i < tooltip.length; i++) {
                    var tt = $(tooltip[i]);
                    tt.addClass("probecard-record");
                    tt.appendTo(probeDiv);
                }
            }
            return probeDiv;
        };
        var refresh = function (probes) {
            _host.empty();
            probeDivs = [];
            for (var i = 0; i < probes.length; i++) {
                var probe = probes[i];
                var probeDiv = getProbeDiv(probe);
                var probeHost = $("<div></div>").css("display", "inline").appendTo(_host);
                probeDiv.appendTo(probeHost);
                probeDivs.push({ id: probe.id, div: probeDiv, host: probeHost });
            }
        };
        refresh(probesVM.getProbes());
        probesVM.subscribe(function (args) {
            var probe = args.probe;
            switch (args.status) {
                case "add":
                    hostDiv[0].style.display = "block";
                    var probeDiv = getProbeDiv(args.probe);
                    var probeHost = $("<div></div>").css("display", "inline").appendTo(_host);
                    probeDiv.appendTo(probeHost);
                    probeDivs.push({ id: probe.id, div: probeDiv, host: probeHost });
                    break;
                case "remove":
                    for (var i = 0; i < probeDivs.length; i++) {
                        var pDiv = probeDivs[i];
                        if (pDiv.id === probe.id) {
                            pDiv.host.remove();
                            probeDivs = probeDivs.filter(function (d) { return d.id !== probe.id; });
                            if (hostDiv[0].childNodes.length == 0)
                                hostDiv[0].style.display = "none";
                            break;
                        }
                    }
                    break;
                case "update":
                    for (var i = 0; i < probeDivs.length; i++) {
                        var pDiv = probeDivs[i];
                        if (pDiv.id === probe.id) {
                            pDiv.host.empty();
                            var probeDiv = getProbeDiv(args.probe);
                            probeDiv.appendTo(pDiv.host);
                            pDiv.div = probeDiv;
                            break;
                        }
                    }
                    break;
                case "selected":
                    refresh(probesVM.getProbes());
                    break;
                case "unselected":
                    refresh(probesVM.getProbes());
                    break;
            }
        });
        probesVM.onRefresh = function (probes) {
            refresh(probes);
        };
    }
    ChartViewer.ProbesControl = ProbesControl;
    function show(domElement, plots, viewState) {
        if (viewState)
            throw "viewState argument is not supported";
        var control = new ChartViewer.ChartViewerControl(domElement);
        control.update(plots);
        return control;
    }
    ChartViewer.show = show;
})(ChartViewer || (ChartViewer = {}));
var ChartViewer;
(function (ChartViewer) {
    ChartViewer.PlotRegistry["fallback"] = {
        initialize: function (plotDefinition, viewState, chart) {
            var div = $("<div></div>")
                .attr("data-idd-name", plotDefinition.displayName)
                .appendTo(chart.host);
            var plot = new FallbackPlot(div, chart.master);
            chart.addChild(plot);
            return [plot];
        },
        draw: function (plots, plotDefinition) {
            var drawArgs = {
                kind: plotDefinition.kind,
                error: plotDefinition["error"]
            };
            plots[0].draw(drawArgs);
        }
    };
    function FallbackPlot(div, master) {
        var that = this;
        var initializer = InteractiveDataDisplay.Utils.getDataSourceFunction(div, InteractiveDataDisplay.readCsv);
        var initialData = initializer(div);
        this.base = InteractiveDataDisplay.CanvasPlot;
        this.base(div, master);
        var _kind;
        var _error;
        if (initialData)
            _kind = initialData.kind;
        this.draw = function (data) {
            _kind = data.kind;
            _error = data.error;
            this.fireAppearanceChanged('error');
        };
        this.getLocalPadding = function () {
            return { left: 0, right: 0, top: 0, bottom: 0 };
        };
        this.renderCore = function (plotRect, screenSize) {
        };
        this.getLegend = function () {
            var that = this;
            var nameDiv = $("<span></span>");
            var contentDiv = $("<div class='plotcard-error'></div>");
            var setName = function () {
                nameDiv.text(that.name);
            };
            setName();
            var content = "";
            var setContent = function () {
                var content = "";
                if (_error)
                    content = _error;
                else if (_kind)
                    content = 'kind "' + _kind + '" is unknown';
                else
                    content = "Error plot definition!";
                contentDiv.text(content);
            };
            setContent();
            this.host.bind("appearanceChanged", function (event, propertyName) {
                if (!propertyName || propertyName == "error")
                    setContent();
                if (!propertyName || propertyName == "name")
                    setName();
            });
            var that = this;
            var onLegendRemove = function () {
                that.host.unbind("appearanceChanged");
                div[0].innerHTML = "";
                div.removeClass("idd-legend-item");
            };
            return { name: nameDiv, legend: { thumbnail: undefined, content: contentDiv }, onLegendRemove: onLegendRemove };
        };
    }
    ChartViewer.FallbackPlot = FallbackPlot;
    FallbackPlot.prototype = new InteractiveDataDisplay.CanvasPlot;
})(ChartViewer || (ChartViewer = {}));
var ChartViewer;
(function (ChartViewer) {
    ChartViewer.PlotRegistry["heatmap"] = {
        initialize: function (plotDefinition, viewState, chart) {
            var div = $("<div></div>")
                .attr("data-idd-name", plotDefinition.displayName)
                .appendTo(chart.host);
            var heatmap = new InteractiveDataDisplay.Heatmap(div, chart.master);
            chart.addChild(heatmap);
            var plots = [heatmap];
            return plots;
        },
        draw: function (plots, plotDefinition) {
            var heatmap = plotDefinition;
            plots[0].draw(heatmap, heatmap.titles);
        }
    };
})(ChartViewer || (ChartViewer = {}));
var ChartViewer;
(function (ChartViewer) {
    ChartViewer.PlotRegistry["line"] = {
        initialize: function (plotDefinition, viewState, chart) {
            var div = $("<div></div>")
                .attr("data-idd-name", plotDefinition.displayName)
                .appendTo(chart.host);
            var plot = new InteractiveDataDisplay.Polyline(div, chart.master);
            chart.addChild(plot);
            return [plot];
        },
        draw: function (plots, plotDefinition) {
            var plot = plots[0];
            var lineDef = plotDefinition;
            plot.draw(lineDef);
        }
    };
})(ChartViewer || (ChartViewer = {}));
var ChartViewer;
(function (ChartViewer) {
    ChartViewer.PlotRegistry["markers"] = {
        initialize: function (plotDefinition, viewState, chart) {
            var div = $("<div></div>")
                .attr("data-idd-name", plotDefinition.displayName)
                .appendTo(chart.host);
            var markerGraph = new InteractiveDataDisplay.Markers(div, chart.master);
            chart.addChild(markerGraph);
            return [markerGraph];
        },
        draw: function (plots, plotDefinition) {
            var plot = plotDefinition;
            plots[0].draw(plot, plot.titles);
            var getRange = function (arr) {
                return { min: ChartViewer.GetMin(arr), max: ChartViewer.GetMax(arr) };
            };
            var res = {
                x: { min: ChartViewer.GetMin(plot.x), max: ChartViewer.GetMax(plot.x) },
                y: { min: ChartViewer.GetMin(plot.y), max: ChartViewer.GetMax(plot.y) }
            };
            return res;
        }
    };
})(ChartViewer || (ChartViewer = {}));
var Plot;
(function (Plot) {
    var MarkerShape;
    (function (MarkerShape) {
        MarkerShape.Box = "box";
        MarkerShape.Circle = "circle";
        MarkerShape.Diamond = "diamond";
        MarkerShape.Cross = "cross";
        MarkerShape.Triangle = "triangle";
    })(MarkerShape = Plot.MarkerShape || (Plot.MarkerShape = {}));
    var HeatmapRenderType;
    (function (HeatmapRenderType) {
        HeatmapRenderType.Gradient = "gradient";
        HeatmapRenderType.Discrete = "discrete";
    })(HeatmapRenderType = Plot.HeatmapRenderType || (Plot.HeatmapRenderType = {}));
    var LineTreatAs;
    (function (LineTreatAs) {
        LineTreatAs.Function = "function";
        LineTreatAs.Trajectory = "trajectory";
    })(LineTreatAs = Plot.LineTreatAs || (Plot.LineTreatAs = {}));
    function line(element) {
        var plotInfo = element;
        plotInfo.kind = "line";
        return plotInfo;
    }
    Plot.line = line;
    function band(element) {
        var plotInfo = element;
        plotInfo.kind = "band";
        return plotInfo;
    }
    Plot.band = band;
    function boxplot(element) {
        var plotInfo = element;
        plotInfo.kind = "markers";
        plotInfo["shape"] = "boxwhisker";
        return plotInfo;
    }
    Plot.boxplot = boxplot;
    function markers(element) {
        var plotInfo = element;
        plotInfo.kind = "markers";
        return plotInfo;
    }
    Plot.markers = markers;
    function heatmap(element) {
        var plotInfo = element;
        plotInfo.kind = "heatmap";
        return plotInfo;
    }
    Plot.heatmap = heatmap;
})(Plot || (Plot = {}));
