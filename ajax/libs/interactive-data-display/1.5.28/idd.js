InteractiveDataDisplay = {
    MinSizeToShow: 1, // minimum size in pixels of the element to be rendered
    Padding: 20, // extra padding in pixels which is added to padding computed by the plots
    maxTickArrangeIterations: 5, // max number of iterations in loop of ticks creating
    tickLength: 10, // length of ordinary tick 
    minLabelSpace: 60, // minimum space (in px) between 2 labels on axis
    minTickSpace: 5, // minimum space (in px) between 2 ticks on axis
    minLogOrder: 4, // minimum order when labels on logarithmic scale are written with supscript
    minNumOrder: 8, // minimum order when labels on numeric scale are written with supscript
    TooltipDelay: 1, // delay (seconds) between mouse stops over an element and the tooltip appears
    TooltipDuration: 10, // duration (seconds) when tooltip is shown
    CssPrefix: '', // browser-dependent prefix for the set of css styles
    ZIndexNavigationLayer: 1000,
    ZIndexDOMMarkers: 1500,
    ZIndexTooltipLayer: 2000,
    MaxInteger: 9007199254740991,
    HeatmapworkerPath: undefined,// prefix for idd.heatmapworker.js for using in IE10 and IE11
    factory: {} // table of values (key: string, plot-factory: jqDiv x master plot -> plot)
};
;InteractiveDataDisplay = InteractiveDataDisplay || {};



// Utilities functions 
InteractiveDataDisplay.Utils =
    {
        //trim: function (s) { return s.replace(/^[\s\n]+|[\s\n]+$/g, ''); },

        logE10neg: 1.0 / Math.log(10),

        log10: (typeof Math.log10 !== "undefined") ? Math.log10 : function (x) { return Math.log(x) * InteractiveDataDisplay.Utils.logE10neg; },

        applyMask: function (mask, array, newLength) {
            var n = mask.length;
            var newArr = new Array(newLength);
            for (var i = 0, j = 0; i < n; i++) {
                if (mask[i] === 0) newArr[j++] = array[i];
            }
            return newArr;
        },

        maskNaN: function (mask, numArray) {
            for (var n = mask.length; --n >= 0;) {
                var v = numArray[n];
                if (v != v) // NaN
                    mask[n] = 1;
            }
        },

        //Returns true if value is Array or TypedArray
        isArray: function (arr) {
            return arr instanceof Array ||
                arr instanceof Float64Array ||
                arr instanceof Float32Array ||
                arr instanceof Int8Array ||
                arr instanceof Int16Array ||
                arr instanceof Int32Array ||
                arr instanceof Uint8Array ||
                arr instanceof Uint16Array ||
                arr instanceof Uint32Array;
        },

        isOrderedArray: function (arr) {
            if (arr.length <= 1)
                return true;
            else {
                if (isNaN(arr[1]))
                    return false;
                if (isNaN(arr[2]))
                    return false;

                var diff = arr[1] - arr[0];
                for (var i = 2; i < arr.length; i++) {
                    var diff_i = arr[i] - arr[i - 1];
                    if (diff * diff_i < 0)
                        return false;
                }
                return true;
            }
        },

        cutArray: function (arr, len) {
            if (arr == undefined) return arr;
            if (arr.length > len) {
                var result = new Array(len);
                for (var i = 0; i < len; i++) {
                    result[i] = arr[i];
                }
                return result;
            } else {
                return arr;
            }
        },
        // Returns intersection of two rectangles {x,y,width,height}, left-bottom corner
        // If no intersection, returns undefined.
        intersect: function (rect1, rect2) {
            if (!rect1 || !rect2) return undefined;
            var x1 = Math.max(rect1.x, rect2.x);
            var x2 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width);
            var y1 = Math.max(rect1.y, rect2.y);
            var y2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
            if (x2 >= x1 && y2 >= y1)
                return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 };
            return undefined;
        },

        // Returns boolean value indicating whether rectOuter includes entire rectInner, or not.
        // Rect is  {x,y,width,height}
        includes: function (rectOuter, rectInner) {
            if (!rectOuter || !rectInner) return false;
            return rectOuter.x <= rectInner.x && rectOuter.x + rectOuter.width >= rectInner.x + rectInner.width &&
                rectOuter.y <= rectInner.y && rectOuter.y + rectOuter.height >= rectInner.y + rectInner.height;
        },

        // Returns boolean value indicating whether rect1 equals rect2, or not.
        // Rect is  {x,y,width,height}
        equalRect: function (rect1, rect2) {
            if (!rect1 || !rect2) return false;
            return rect1.x == rect2.x && rect1.width == rect2.width &&
                rect1.y == rect2.y && rect1.height == rect2.height;
        },

        calcCSWithPadding: function (plotRect, screenSize, padding, aspectRatio) {
            var screenRect = { left: padding.left, top: padding.top, width: screenSize.width - padding.left - padding.right, height: screenSize.height - padding.top - padding.bottom };
            return new InteractiveDataDisplay.CoordinateTransform(plotRect, screenRect, aspectRatio);
        },

        // Browser-specific function. Should be replaced with the optimal implementation on the page loading.
        requestAnimationFrame: function (handler, args) {
            setTimeout(handler, 1000 / 60, args);
        },

        // Creates and initializes an array with values from start to end with step 1.
        range: function (start, end) {
            var n = end - start + 1;
            if (n <= 0) return [];
            var arr = new Array(n);
            for (var i = 0; i < n; i++) {
                arr[i] = i;
            }
            return arr;
        },

        //finalRect should contain units in its values. f.e. "px" or "%"
        arrangeDiv: function (div, finalRect) {
            //div.css("top", finalRect.y);
            //div.css("left", finalRect.x);
            div.width(finalRect.width);
            div.height(finalRect.height);
        },

        //Computes minimum rect, containing rect1 and rect 2
        unionRects: function (rect1, rect2) {
            if (rect1 === undefined)
                return rect2 === undefined ? undefined : { x: rect2.x, y: rect2.y, width: rect2.width, height: rect2.height };
            if (rect2 === undefined)
                return rect1 === undefined ? undefined : { x: rect1.x, y: rect1.y, width: rect1.width, height: rect1.height };

            var minX = Math.min(rect1.x, rect2.x);
            var minY = Math.min(rect1.y, rect2.y);
            var maxX = Math.max(rect1.x + rect1.width, rect2.x + rect2.width);
            var maxY = Math.max(rect1.y + rect1.height, rect2.y + rect2.height);

            return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
        },

        // Parses the attribute data-idd-style of jqElement and adds the properties to the target
        // e.g. data-idd-style="thickness: 5px; lineCap: round; lineJoin: round; stroke: #ff6a00"
        readStyle: function (jqElement, target) {
            var s = jqElement.attr("data-idd-style");
            if (s) {
                var items = s.split(";");
                var n = items.length;
                for (var i = 0; i < n; i++) {
                    var pair = items[i].split(':', 2);
                    if (pair && pair.length === 2) {
                        var name = pair[0].trim();
                        var val = pair[1].trim();
                        target[name] = val;
                    }
                }
                return target;
            } else {
                return undefined;
            }
        },

        // Updates one of property values in data-idd-style
        updateStyle: function (jqElement, styleObj, propName, propVal) {
            var styleObj = InteractiveDataDisplay.Utils.readStyle(jqElement, styleObj);

            if (!styleObj){
                styleObj = {};
            }
            styleObj[propName] = propVal;

            var updatedStyleStr = "";
            $.each( styleObj, function( key, value ) {
                updatedStyleStr += key + ": " + value + "; "; 
            });

            jqElement.attr("data-idd-style", updatedStyleStr);
        },

        getDataSourceFunction: function (jqElem, defaultSource) {
            var source = jqElem.attr("data-idd-datasource");
            if (source == "InteractiveDataDisplay.readTable")
                return InteractiveDataDisplay.readTable;
            else if (source == "InteractiveDataDisplay.readCsv")
                return InteractiveDataDisplay.readCsv;
            else if (source == "InteractiveDataDisplay.readCsv2d")            
                return InteractiveDataDisplay.readCsv2d;
            else if (source == "InteractiveDataDisplay.readBase64")
                return InteractiveDataDisplay.readBase64;
            else if (source)
                return function () {
                    return JSON.parse(source, function (key, value) {
                        if (value === null) {
                            return NaN;
                        }
                        return value;
                    });
                };
            return defaultSource;
        },

        makeNonEqual: function (range) {
            if (range.min == range.max) {
                if (range.min == 0) return { min: -1, max: 1 }
                else if (range.min > 0) return { min: range.min * 0.9, max: range.min * 1.1 }
                else return { min: range.min * 1.1, max: range.min * 0.9 }
            } else return range;
        },

        getMinMax: function (array) {
            if (!array || array.length === 0) return undefined;
            var n = array.length;
            var min, max;
            var v;
            for (var i = 0; i < n; i++) {
                v = array[i];
                if (v == v) {
                    min = max = v;
                    break;
                }
            }
            for (i++; i < n; i++) {
                v = array[i];
                if (v == v) {
                    if (v < min) min = v;
                    else if (v > max) max = v;
                }
            }
            return { min: min, max: max };
        },

        getMin: function (array) {
            if (!array || array.length === 0) return undefined;
            var n = array.length;
            var min;
            var v;
            for (var i = 0; i < n; i++) {
                v = array[i];
                if (v == v) {
                    min = v;
                    break;
                }
            }
            for (i++; i < n; i++) {
                v = array[i];
                if (v == v && v < min) min = v;
            }
            return min;
        },

        getMax: function (array) {
            if (!array || array.length === 0) return undefined;
            var n = array.length;
            var max;
            var v;
            for (var i = 0; i < n; i++) {
                v = array[i];
                if (v == v) {
                    max = v;
                    break;
                }
            }
            for (i++; i < n; i++) {
                v = array[i];
                if (v == v && v > max) max = v;
            }
            return max;
        },

        getMinMaxForPair: function (arrayx, arrayy) {
            if (!arrayx || arrayx.length === 0) return undefined;
            if (!arrayy || arrayx.length !== arrayy.length) throw 'Arrays should be equal';
            var n = arrayx.length;
            var minx, maxx;
            var miny, maxy;
            var vx, vy;
            for (var i = 0; i < n; i++) {
                vx = arrayx[i];
                vy = arrayy[i];

                if (isNaN(vx) || isNaN(vy)) continue;

                minx = maxx = vx;
                miny = maxy = vy;
                break;
            }
            for (i++; i < n; i++) {
                vx = arrayx[i];
                vy = arrayy[i];

                if (isNaN(vx) || isNaN(vy)) continue;

                if (vx < minx) minx = vx;
                else if (vx > maxx) maxx = vx;
                if (vy < miny) miny = vy;
                else if (vy > maxy) maxy = vy;
            }
            return { minx: minx, maxx: maxx, miny: miny, maxy: maxy };
        },

        // recursively gathers hierarchical plots into flattened array
        // reorders this array by plot.order field
        // returns flattened sorted array
        enumPlots: function (plot) {
            var plotsArray = [];
            var enumRec = function (p, plotsArray) {
                plotsArray.push(p);
                if (p.children)
                    p.children.forEach(function (child) {
                        enumRec(child, plotsArray);
                    });
            };
            enumRec(plot, plotsArray);
            plotsArray.sort(function (a, b) { return b.order - a.order; });
            return plotsArray;
        },

        reorder: function (p, p_before, isPrev) {
            // seem to be obsolete line. enumPlots() doesn't have side effects
            // var plots = p.master ? InteractiveDataDisplay.Utils.enumPlots(p.master) : InteractiveDataDisplay.Utils.enumPlots(p);
            
            p.order = isPrev ? (p_before.order) : (p_before.order + 1);

            var shift = function (masterPlot, p) {
                if (masterPlot.order >= p.order && masterPlot != p && masterPlot.order < InteractiveDataDisplay.MaxInteger)
                    masterPlot.order += 1;
                if (masterPlot.children)
                    masterPlot.children.forEach(function (child) {
                        shift(child, p);
                    });
            }
            shift(p.master, p);
        },

        getMaxOrder: function (p) {
            var z = p && p.order != InteractiveDataDisplay.MaxInteger ? p.order : 0;
            if (p && p.children)
                p.children.forEach(function (child) {
                    var order = InteractiveDataDisplay.Utils.getMaxOrder(child);
                    if (order != InteractiveDataDisplay.MaxInteger) z = Math.max(z, order);
                });
            return z;
        },

        getBoundingBoxForArrays: function (_x, _y, dataToPlotX, dataToPlotY) {
            var _bbox = undefined;
            if (_x && _y) {
                var range = InteractiveDataDisplay.Utils.getMinMaxForPair(_x, _y);

                if (range) {
                    if (dataToPlotX) {
                        range.minx = dataToPlotX(range.minx);
                        range.maxx = dataToPlotX(range.maxx);
                    }
                    if (dataToPlotY) {
                        range.miny = dataToPlotY(range.miny);
                        range.maxy = dataToPlotY(range.maxy);
                    }

                    var x = Math.min(range.minx, range.maxx);
                    var width = Math.abs(range.maxx - range.minx);
                    var y = Math.min(range.miny, range.maxy);
                    var height = Math.abs(range.maxy - range.miny);

                    _bbox = { x: x, y: y, width: width, height: height };
                }
            }
            return _bbox;
        },

        getIEVersion: function () {
            var sAgent = window.navigator.userAgent;
            var Idx = sAgent.indexOf("MSIE");

            // If IE, return version number.
            if (Idx > 0)
                return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));

            // If IE 11 then look for Updated user agent string.
            else if (!!navigator.userAgent.match(/Trident\/7\./))
                return 11;
            else
                return 0; //It is not IE
        },

        lastUsedIntId: 0,

        generateNextIntId: function () {
            return this.lastUsedIntId++;
        },

        resetLastUsedIntId: function () {
            this.lastUsedIntId = 0;
            return this.lastUsedIntId;
        },

        
        base64toByteArray: function(base64str) {
            var byteCharacters = atob(base64str)
            var byteNumbers = new Array(byteCharacters.length)
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i)
            }
            return new Uint8Array(byteNumbers);
        },

        byteArrayToTypedArray: function(byteArray,typeStr) {
            var arrayBuffer = byteArray.buffer
            var res;
            switch(typeStr) {
                case 'uint8': return byteArray;
                case 'float32': res = new Float32Array(arrayBuffer); break
                case 'float64': res = new Float64Array(arrayBuffer); break
                case 'int16': res = new Int16Array(arrayBuffer); break                    
                case 'int32': res = new Int32Array(arrayBuffer); break
                default:
                    throw "Unexpected array type: "+typeStr
            }
            return res
        }
    };
;InteractiveDataDisplay = InteractiveDataDisplay || {};
InteractiveDataDisplay.Binding = InteractiveDataDisplay.Binding || {};

(function () {
    // Table of bound plots: array of pairs (plot1, plot2, binding)
    var plotsBindingH = [];
    var plotsBindingV = [];
    var plotsReachableH = []; // array [{ plot, reachable : [plot...] }]
    var plotsReachableV = []; // array [{ plot, reachable : [plot...] }]

    var indexOf = function (plotsBinding, plot1, plot2) {
        for (var i = 0, length = plotsBinding.length; i < length; i++) {
            var p = plotsBinding[i];
            if ((p.plot1 === plot1 || p.plot1 === plot2) &&
                (p.plot2 === plot1 || p.plot2 === plot2)) return i;
        }
        return -1;
    };

    // edges is array of {plot1, plot2}
    // returns an array of plots reachable (by edges) from the 'plot'
    var getReachable = function (plot, edges) {
        var reachable = [];
        edges = edges.slice(0); // copy since we will modify the array

        var queue = [plot];
        while (queue.length > 0) {
            var p = queue.shift(); // take next reachable node 
            if (p != plot && reachable.indexOf(p) < 0) {
                reachable.push(p);
            }

            // looking for edges (p,x) and (x,p) and pushing x to a queue
            for (var i = edges.length; --i >= 0;) {
                var edge = edges[i];
                var p2 = null;
                if (edge.plot1 === p) p2 = edge.plot2;
                else if (edge.plot2 === p) p2 = edge.plot1;
                if (p2) {
                    queue.push(p2);
                    edges.splice(i, 1);
                }
            }
        }
        return reachable;
    };

    // Repopulates (clears and rebuilds) plotsReachable array using plot pairs (binding edges) from plotsBinding array
    var buildReachability = function (plotsBinding, plotsReachable) {
        // Building unique list of plotsBinding, saving to plots
        var plots = [];
        for (var i = 0, length = plotsBinding.length; i < length; i++) {
            var p = plotsBinding[i];
            if (plots.indexOf(p.plot1) < 0)
                plots.push(p.plot1);
            if (plots.indexOf(p.plot2) < 0)
                plots.push(p.plot2);
        }

        // repopulating plotsReachable
        plotsReachable.splice(0);
        for (var i = 0, length = plots.length; i < length; i++) {
            var reachable = getReachable(plots[i], plotsBinding);
            plotsReachable.push({ plot: plots[i], reachable: reachable });
        }
    };

    // Binds visible rectangles of two plots.
    // filter is either "v" (binds vertical ranges), "h" (binds horizontal ranges), or "vh" (default, binds both ranges).
    // Remarks.
    // Master plots of given plots are bound.
    // Binding is asynchronous and bi-directional.
    // Idempotent operation. Several "bindPlots" for same plots are equivalent to a single "bindPlots" and return same instance.
    // Thus, destroying the binding once removes the binding independingly on how many times "bindPlots" were called.
    InteractiveDataDisplay.Binding.bindPlots = function (plot1, plot2, filter) {
        if (filter == undefined || filter == "vh") {
            var b1 = InteractiveDataDisplay.Binding.bindPlots(plot1, plot2, "v");
            var b2 = InteractiveDataDisplay.Binding.bindPlots(plot1, plot2, "h");
            var isDestroyed = false;
            return {
                destroy: function () {
                    if (isDestroyed) return;
                    b1.destroy();
                    b2.destroy();
                    isDestroyed = true;
                }
            };
        }
        if (filter != "v" && filter != "h") throw "Parameter filter is incorrect";
        if (!plot1) throw "plot1 is incorrect";
        if (!plot2) throw "plot2 is incorrect";
        plot1 = plot1.master;
        plot2 = plot2.master;
        if (plot1 === plot2) throw "plot1 equals plot2";

        var plotsBinding = filter == "v" ? plotsBindingV : plotsBindingH;
        var k = indexOf(plotsBinding, plot1, plot2);
        if (k >= 0) return plotsBinding[k].binding;

        var reachability = filter == "v" ? plotsReachableV : plotsReachableH;
        var isDestroyed = false;
        var b = {
            plot1: plot1,
            plot2: plot2,
            binding: {
                destroy: function () {
                    if (isDestroyed) return;
                    var k = indexOf(plotsBinding, plot1, plot2);
                    if (k) plotsBinding.splice(k, 1);
                    buildReachability(plotsBinding, reachability);
                    isDestroyed = true;
                }
            }
        };
        plotsBinding.push(b);

        buildReachability(plotsBinding, reachability);
        plot1.requestUpdateLayout();
        return b.binding;
    };

    InteractiveDataDisplay.Binding.getBoundPlots = function (plot) {
        var reach = {
            h: [],
            v: []
        };
        for (var i = 0, length = plotsReachableH.length; i < length; i++) {
            if (plotsReachableH[i].plot === plot) {
                reach.h = plotsReachableH[i].reachable;
                break;
            }
        }
        for (var i = 0, length = plotsReachableV.length; i < length; i++) {
            if (plotsReachableV[i].plot === plot) {
                reach.v = plotsReachableV[i].reachable;
                break;
            }
        }
        return reach;
    };
})();;InteractiveDataDisplay.AdaptiveFormatter = function (series, segment) {

    var standardDeviation = function (array) {
        var avg = average(array);

        var squareDiffs = array.map(function (value) {
            var diff = value - avg;
            var sqrDiff = diff * diff;
            return sqrDiff;
        });

        var avgSquareDiff = average(squareDiffs);

        var stdDev = Math.sqrt(avgSquareDiff);
        return stdDev;
    };

    var average = function (data) {
        var sum = 0;
        var n = 0;
        for (var i = 0; i < data.length; i++) {
            if (isNaN(data[i])) continue;
            else {
                sum += data[i];
                ++n;
            }
        }
        return (n != 0) ? sum / n : NaN;
    };

    var power10 = function (p) {
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
    };

    this.getPrintFormat = function (min, max, std) {
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
                var c1 = power10(-p2);
                var exponent = p2;
                return {
                    toString: function (x) {
                        if (exponent > 0)
                            return (x * c1).toFixed(-alpha + p2) + "e+" + exponent;
                        else
                            return (x * c1).toFixed(-alpha + p2) + "e" + exponent
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
                var c1 = power10(-alpha - extraPrec);
                var exponent = alpha + extraPrec;
                return {
                    toString: function (x) {
                        if (exponent > 0)
                            return (x * c1).toFixed(extraPrec) + "e+" + exponent;
                        else
                            return (x * c1).toFixed(extraPrec) + "e" + exponent
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
    };

    var _std;
    var _min;
    var _max;

    if (series !== undefined && segment !== undefined) {
        _min = series;
        _max = segment;
        _std = (_max - _min) / 4;
    }
    else if (series !== undefined && segment === undefined) {
        var range = InteractiveDataDisplay.Utils.getMinMax(series);
        _min = range.min;
        _max = range.max;
        _std = standardDeviation(series);
    }

    return this.getPrintFormat(_min, _max, _std);
};;// Registers new plot type
// key: string, plot-factory: jqDiv x master plot -> plot
InteractiveDataDisplay.register = function (key, factory) {
    if (!key) throw 'key is undefined';
    if (!factory) throw 'factory is undefined';

    InteractiveDataDisplay.factory[key] = factory;
};


var _initializeInteractiveDataDisplay = function () { // determines settings depending on browser type

    "use strict";
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('firefox') >= 0) {
        InteractiveDataDisplay.CssPrefix = '-moz';
    } else if (userAgent.indexOf('chrome') >= 0 || userAgent.indexOf('safari') >= 0) {
        InteractiveDataDisplay.CssPrefix = '-webkit';
    }

    //if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
    //    // Suppress the default iOS elastic pan/zoom actions.
    //    document.addEventListener('touchmove', function (e) { e.preventDefault(); });
    //}

    if (window.requestAnimationFrame) {
        InteractiveDataDisplay.Utils.requestAnimationFrame = function (callback) {
            return window.requestAnimationFrame(callback);
        };
    }
    else if (window.msRequestAnimationFrame) {
        InteractiveDataDisplay.Utils.requestAnimationFrame = function (callback) {
            return window.msRequestAnimationFrame(callback);
        };
    }
    else if (window.webkitRequestAnimationFrame) {
        InteractiveDataDisplay.Utils.requestAnimationFrame = function (callback) {
            return window.webkitRequestAnimationFrame(callback);
        };
    }
    else if (window.mozRequestAnimationFrame) {
        InteractiveDataDisplay.Utils.requestAnimationFrame = function (callback) {
            return window.mozRequestAnimationFrame(callback);
        };
    }
    else if (window.oRequestAnimationFrame) {
        InteractiveDataDisplay.Utils.requestAnimationFrame = function (callback) {
            return window.oRequestAnimationFrame(callback);
        };
    }

    var initializePlot = function (jqDiv, master) {

        if (typeof (Modernizr) != 'undefined' && jqDiv) {
            if (!Modernizr.canvas) {
                jqDiv.replaceWith('<div">Browser does not support HTML5 canvas</div>');
            }
            else if (!Modernizr.borderradius) {
                jqDiv.replaceWith('<div">Browser does not support "border-radius" style property</div>');
            }
            else if (!Modernizr.boxshadow) {
                jqDiv.replaceWith('<div">Browser does not support "box-shadow" style property</div>');
            }
            else if (!Modernizr.csstransforms) {
                jqDiv.replaceWith('<div">Browser does not support 2d css transformations</div>');
            }
            else if (!Modernizr.hsla) {
                jqDiv.replaceWith('<div">Browser does not support hsla colors</div>');
            }
            else if (!Modernizr.rgba) {
                jqDiv.replaceWith('<div">Browser does not support rgba colors</div>');
            }
        }

        if (jqDiv.hasClass("idd-plot-master") || jqDiv.hasClass("idd-plot-dependant"))
            throw "The div element already is initialized as a plot";

        var plot = undefined;
        var plotType = jqDiv.attr("data-idd-plot");
        switch (plotType) {
            case "plot":
                plot = new InteractiveDataDisplay.Plot(jqDiv, master);
                plot.order = InteractiveDataDisplay.MaxInteger;
                break;
            case "polyline":
                plot = new InteractiveDataDisplay.Polyline(jqDiv, master);
                break;
            case "dom":
                plot = new InteractiveDataDisplay.DOMPlot(jqDiv, master);
                plot.order = InteractiveDataDisplay.MaxInteger;
                break;
            case "label":
                plot = new InteractiveDataDisplay.LabelPlot(jqDiv, master);
                plot.order = InteractiveDataDisplay.MaxInteger;
                break;
            case "figure":
                plot = new InteractiveDataDisplay.Figure(jqDiv, master);
                break;
            case "chart":
                plot = new InteractiveDataDisplay.Chart(jqDiv, master);
                break;
            case "grid":
                plot = new InteractiveDataDisplay.GridlinesPlot(jqDiv, master);
                break;
            case "markers":
                plot = new InteractiveDataDisplay.Markers(jqDiv, master);
                break;
            case "area":
                plot = new InteractiveDataDisplay.Area(jqDiv, master);
                break;
            case "bingMaps":
                plot = new InteractiveDataDisplay.BingMapsPlot(jqDiv, master);
                break;
        }

        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        if (MutationObserver) {
            var observer = new MutationObserver(function (mutations, observer) {
                mutations.forEach(function (mutation) {
                    var added = mutation.addedNodes, removed = mutation.removedNodes;
                    if (added.length > 0)
                        for (var i = 0; i < added.length; i++) {
                            var jqAdded = $(added[i]);
                            if (jqAdded.attr("data-idd-plot")) {
                                jqAdded.removeClass("idd-plot-master").removeClass("idd-plot-dependant");
                                var initializedPlot = initializePlot(jqAdded, master)
                                plot.addChild(initializedPlot);
                                plot.assignChildOrder(initializedPlot);
                            };
                        }
                    if (removed.length > 0)
                        for (var i = 0; i < removed.length; i++) {
                            var elem = removed[i];
                            if (typeof elem.getAttribute === "function") {
                                var plotAttr = elem.getAttribute("data-idd-plot");
                                if (plotAttr != null)
                                    plot.removeChild(elem.plot);
                            }
                        }
                });
            });

            observer.observe(jqDiv[0], {
                subtree: false,
                characterData: false,
                attributes: false,
                childList: true,
                attributeOldValue: false,
                characterDataOldValue: false
            });
        }
        else {
            console.warn("MutationObservers are not supported by the browser. DOM changes are not tracked by IDD");
        }

        if (plot) {
            return plot;
        };


        var factory = InteractiveDataDisplay.factory[plotType];
        if (factory) {
            return factory(jqDiv, master);
        }

        throw "Unknown plot type";
    };


    // Instantiates a plot for the given DIV element.
    // jqDiv is either ID of a DIV element within the HTML page or jQuery to the element to be initialized as a plot.
    // Returns new InteractiveDataDisplay.Plot instance.
    InteractiveDataDisplay.asPlot = function (div) {
        if (!div)
            throw "Plot must be attached to div!";

        var jqDiv;

        if (div.tagName !== undefined && div.tagName.toLowerCase() === "div") {
            jqDiv = $(div);
        } else if (typeof (div) === "string") {
            jqDiv = $("#" + div);
            if (jqDiv.length === 0) throw "There is no element with id " + div;
            div = jqDiv[0];
        } else if (div instanceof jQuery && div.is('div')) {
            jqDiv = div;
            div = div[0];
        } else
            throw "Invalid input parameter! It should be div or id of div or jQuery of single div";

        if (div.plot !== undefined)
            return div.plot;
        else {
            var plot = initializePlot(jqDiv);
            return plot;
        }
    };

    // Tries to get IDD plot object from jQuery selector
    // Returns null if selector is null or DOM object is not an IDD master plot
    InteractiveDataDisplay.tryGetMasterPlot = function (jqElem) {
        if (jqElem && jqElem.hasClass("idd-plot-master")) {
            var domElem = jqElem.get(0);
            if ('plot' in domElem)
                return domElem.plot;
            else
                return null;
        }
        return null;
    }

    // Traverses descendants of jQuery selector and invokes updateLayout 
    // for all IDD master plots
    InteractiveDataDisplay.updateLayouts = function (jqElem) {
        var plot = InteractiveDataDisplay.tryGetMasterPlot(jqElem);
        if (plot)
            plot.updateLayout();
        else {
            var c = jqElem.children();
            for (var i = 0; i < c.length; i++)
                InteractiveDataDisplay.updateLayouts(c.eq(i));
        }
    }

    InteractiveDataDisplay.Event = InteractiveDataDisplay.Event || {};
    InteractiveDataDisplay.Event.appearanceChanged = jQuery.Event("appearanceChanged");
    InteractiveDataDisplay.Event.childrenChanged = jQuery.Event("childrenChanged");
    InteractiveDataDisplay.Event.isAutoFitChanged = jQuery.Event("isAutoFitEnabledChanged");
    InteractiveDataDisplay.Event.visibleRectChanged = jQuery.Event("visibleRectChanged");
    InteractiveDataDisplay.Event.isVisibleChanged = jQuery.Event("visibleChanged");
    InteractiveDataDisplay.Event.plotRemoved = jQuery.Event("plotRemoved");
    InteractiveDataDisplay.Event.orderChanged = jQuery.Event("orderChanged");
    // Occurs when master plot has rendered a frame. It is fired only for the master plot.    
    InteractiveDataDisplay.Event.frameRendered = jQuery.Event("frameRendered");

    var _plotCounter = 0;

    InteractiveDataDisplay.Plot = function (div, master, myCentralPart) {

        if (div && (div.hasClass("idd-plot-master") || div.hasClass("idd-plot-dependant")))
            return;

        if (div) {
            div[0].addEventListener('touchstart', function (e) {
                e.preventDefault();
            }, false);
            div[0].addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false);
        }

        var _isMaster = master === undefined && div !== undefined;
        var _master = master || this;
        var _host = div; // JQuery for the hosting div element
        var _centralPart = myCentralPart || _host;
        var _xDataTransform;
        var _yDataTransform;
        var _coordinateTransform = _isMaster ? new InteractiveDataDisplay.CoordinateTransform() : undefined;
        var _children = []; // array of Plot containing children plots of this master plot (every child may have its children recursively)
        var _isVisible = true;
        var _isErrorVisible = false;
        var _aspectRatio; //actually scale ratio (xScale/yScale)
        var _isIgnoredByFitToView = false; //if true, the plot's bounding box is not respected during the common bounding box calculation
        var _isAutoFitEnabled = true;
        var _requestFitToView = false;
        var _requestFitToViewX = false;
        var _requestFitToViewY = false;
        var _doFitOnDataTransformChanged = true;
        var _isFlatRenderingOn = false;
        var _width, _height;
        var _name = "";
        var _order = 0;        
        var _padding = InteractiveDataDisplay.Padding; //extra padding in pixels which is added to padding computed by the plots
        // Contains user-readable titles for data series of a plot. They should be used in tooltips and legends.
        var _titles = {};
        // The flag is set in setVisibleRegion when it is called at me as a bound plot to notify that another plot is changed his visible.
        // I set this flag to suppress echo, i.e. I will not notify bound plots about my new visible rectangle.
        // The flag is reset when any other update request is received.
        var _suppressNotifyBoundPlots = false;
        var _tooltipSettings = undefined;

        var _plotRect;

        // reading property overrides from attributes
        // Note: data-idd-visible-region attribute is handled at the end of the constructor, as it needs more plot objects to be defined and valid 
        if (div) {
            _name = div.attr("data-idd-name") || div.attr("id") || "";

            if(div.attr("data-idd-X-log")) {                
                div.removeAttr("data-idd-X-log");                
                _xDataTransform = InteractiveDataDisplay.logTransform;
            }
            if(div.attr("data-idd-Y-log")) {                
                div.removeAttr("data-idd-Y-log");                
                _yDataTransform = InteractiveDataDisplay.logTransform;
            }

            var style = {};
            InteractiveDataDisplay.Utils.readStyle(div, style);
            if(style.hasOwnProperty("padding")) {
                _padding = Number(style["padding"]);
            }
            if(style.hasOwnProperty("suppress-tooltip-coords")) {
                _tooltipSettings = _tooltipSettings || {};
                _tooltipSettings.showCursorCoordinates = Boolean(style["suppress-tooltip-coords"]);
            }
            if(style.hasOwnProperty("ignored-by-fit-to-view")) {
                _isIgnoredByFitToView = Boolean(style["ignored-by-fit-to-view"]);
            }
            _tooltipSettings = _tooltipSettings || {};
            if(style.hasOwnProperty("tooltipDelay")) {
                _tooltipSettings.tooltipDelay = Number(style["tooltipDelay"]) * 1000;
            }
            else
                _tooltipSettings.tooltipDelay = InteractiveDataDisplay.TooltipDelay * 1000;


            div[0].plot = this; // adding a reference to the initialized DOM object of the plot, pointing to the plot instance.

            // Disables user selection for this element:
            div.attr('unselectable', 'on')
                .addClass('unselectable')
                .on('selectstart', false);
        }
        if (_isMaster) {
            this._sharedCanvas = undefined; // for flat rendering mode
        }


        var _localbbox;
        // Indicates whether the last frame included rendering of this plot or not.
        var _isRendered = false;

        this.requestsRender = false;
        this.isInAnimation = false;
        this.isAnimationFrameRequested = false;
        var renderAll = false;
        if (_isMaster) {
            this.requestsUpdateLayout = false;
        }

        // DG:  Seems that it affects the outputRect calculation during measure phase
        //      this is a function of parameters (outputRect,screenSize,hasScreenSizeChanged)
        var _constraint = undefined;

        var that = this;
        var _plotInstanceId = _plotCounter++;

        // Plot properties
        Object.defineProperty(this, "instanceId", { get: function () { return _plotInstanceId; }, configurable: false });
        Object.defineProperty(this, "isMaster", { get: function () { return _isMaster; }, configurable: false });
        // Indicates whether the last frame included rendering of this plot or not.
        Object.defineProperty(this, "isRendered", { get: function () { return _isRendered; }, configurable: false });
        Object.defineProperty(this, "flatRendering", {
            get: function () {
                if (!_isMaster) return master.flatRendering;
                return _isFlatRenderingOn;
            },
            set: function (value) {
                if (!_isMaster) {
                    master.flatRendering = value;
                    return;
                }
                if (_isFlatRenderingOn === value) return;
                _isFlatRenderingOn = value;
                that.requestUpdateLayout();
            }
        });
        Object.defineProperty(this, "isIgnoredByFitToView", {
            get: function () {
                return _isIgnoredByFitToView;
            },
            set: function (value) {
                _isIgnoredByFitToView = value;
                if (_isAutoFitEnabled)
                    this.requestUpdateLayout();
            }
        });
        Object.defineProperty(this, "master", { get: function () { return _master; }, configurable: false });
        Object.defineProperty(this, "host", { get: function () { return _host; }, configurable: false });
        Object.defineProperty(this, "centralPart", { get: function () { return _centralPart; }, configurable: false });
        Object.defineProperty(this, "name", {
            get: function () { return _name; },
            set: function (value) {
                if (_name === value) return;
                _name = value;
                this.fireAppearanceChanged("name");
            },
            configurable: false
        });
        Object.defineProperty(this, "children", { get: function () { return _children.slice(0); }, configurable: false });
        Object.defineProperty(this, "screenSize", {
            get: function () {
                if (_isMaster)
                    return { width: _width, height: _height };
                return _master.screenSize;
            }, configurable: false
        });
        Object.defineProperty(this, "xDataTransform", { get: function () { return _xDataTransform; }, set: function (value) { _xDataTransform = value; this.onDataTransformChanged("x"); }, configurable: false });
        Object.defineProperty(this, "yDataTransform", { get: function () { return _yDataTransform; }, set: function (value) { _yDataTransform = value; this.onDataTransformChanged("y"); }, configurable: false });
        Object.defineProperty(this, "coordinateTransform",
            {
                get: function () { return _isMaster ? _coordinateTransform.clone() : _master.coordinateTransform; },
                configurable: false
            }
        );
        Object.defineProperty(this, "doFitOnDataTransformChanged",
            {
                get: function () { return _isMaster ? _doFitOnDataTransformChanged : _master.doFitOnDataTransformChanged; },
                set: function (value) {
                    if (_isMaster) {
                        _doFitOnDataTransformChanged = value;
                    } else {
                        _master.doFitOnDataTransformChanged = value;
                    }
                },
                configurable: false
            }
        );

        /// Actually scale ratio (xScale/yScale). Value 1.0 indicates that square in plot coords will be square on screen
        Object.defineProperty(this, "aspectRatio", {
            get: function () { return _isMaster ? _aspectRatio : _master.aspectRatio; },
            set: function (value) {
                if (_isMaster) {
                    _aspectRatio = value;
                    this.updateLayout();
                }
                else
                    _master.aspectRatio = value;
            },
            configurable: false
        });

        Object.defineProperty(this, "isAutoFitEnabled", {
            get: function () { return _isMaster ? _isAutoFitEnabled : _master.isAutoFitEnabled; },
            set: function (value) {
                if (_isMaster) {
                    if (_isAutoFitEnabled === value) return;
                    _isAutoFitEnabled = value;
                    if (_isAutoFitEnabled) {
                        this.requestUpdateLayout();
                    } else {
                        _plotRect = that.visibleRect;
                    }
                    this.host.trigger(InteractiveDataDisplay.Event.isAutoFitChanged);
                }
                else {
                    _master.isAutoFitEnabled = value;
                }
            },
            configurable: false
        });

        Object.defineProperty(this, "isVisible", {
            get: function () { return _isVisible; },
            set: function (value) {
                if (_isVisible === value) return;
                _isVisible = value;
                this.onIsVisibleChanged();
                this.fireVisibleChanged(this);
            },
            configurable: false
        });

        Object.defineProperty(this, "isErrorVisible", {
            get: function () { return _isErrorVisible; },
            configurable: true
        });
        var SetIsErrorVisible = function (value) {
            if (_isErrorVisible === value) return;
            _isErrorVisible = value;
            this.onIsVisibleChanged();
            this.fireVisibleChanged(this);
        }
        Object.defineProperty(this, "order", {
            get: function () { return _order; },
            set: function (value) {
                if (_order === value) return;
                _order = value;
                this.fireOrderChanged();
            },
            configurable: false
        });
        Object.defineProperty(this, "padding", {
            get: function () { return _isMaster ? _padding : _master.padding; },
            set: function (value) {
                if (_isMaster) {
                    _padding = value;
                    this.updateLayout();
                }
                else
                    _master.padding = value;
            },
            configurable: false
        });
        Object.defineProperty(this, "visibleRect", {
            get: function () {
                if (_isMaster) {
                    return _coordinateTransform.getPlotRect({ x: 0, y: 0, width: _width, height: _height });
                }
                else {
                    return _master.visibleRect;
                }
            },
            configurable: false
        });


        var _mapControl = undefined;
        Object.defineProperty(this, "mapControl",
            {
                get: function () { return _isMaster ? _mapControl : _master.mapControl; },
                configurable: false
            }
        );
        
        Object.defineProperty(this, "tooltipSettings",
            {
                get: function () { return _isMaster ? _tooltipSettings : _master.tooltipSettings; },
                set: function (value) {
                    if (_isMaster) {
                        _tooltipSettings = value;
                    } else {
                        _master.tooltipSettings = value;
                    }
                },
                configurable: false
            }
        );

        var _isToolTipEnabled = true;
        Object.defineProperty(this, "isToolTipEnabled",
            {
                get: function () { return _isMaster ? _isToolTipEnabled : _master.isToolTipEnabled; },
                set: function (value) {
                    if (_isMaster) {
                        _isToolTipEnabled = value;
                    } else {
                        _master.isToolTipEnabled = value;
                    }
                },
                configurable: false
            }
        );

        Object.defineProperty(this, "titles",
            {
                get: function () { return $.extend({}, _titles); },

                // Allows to set titles for the plot's properties.
                // E.g. "{ color:'age' }" sets the 'age' title for the color data series.
                // Given titles are displayed in legends and tooltips.
                set: function (titles) {
                    this.setTitles(titles, false);
                }
            }
        );

        // DG: Why does master plot base code operates with .map, _mapControl?
        // Reint
        this.selfMapRefresh = function () {
            if (!_isMaster) {
                return;
            } else {
                if (this.map !== undefined) {
                    if (_mapControl !== undefined)
                        throw "Plot composition can have only 1 map!";
                    _mapControl = this.map;
                    this.requestUpdateLayout();
                }

                if (this.constraint) {
                    if (_constraint === undefined) {
                        _constraint = this.constraint;
                    }
                    else {
                        throw "Plot composition can have only 1 constraint function!";
                    }
                }
            }
        }

        // Returns a user-readable title for a property of a plot.
        // E.g. can return "age" for property "color".
        // If there is no user-defined title, returns the given property name as it is.
        this.getTitle = function (property) {
            if (typeof _titles !== "undefined" && typeof _titles[property] !== "undefined")
                return _titles[property];
            return property;
        }

        this.setTitles = function (titles, suppressFireAppearanceChanged) {
            _titles = titles;
            if (!suppressFireAppearanceChanged)
                this.fireAppearanceChanged();
        }

        // Uninitialize the plot (clears its input)
        this.destroy = function () {
            this.host.removeClass("idd-plot");
        };

        // Removes this plot from its master and physically destroys its host element.
        this.remove = function () {
            if (this.map !== undefined) {
                this.master.removeMap();
            }

            if (!this.isMaster)
                this.master.removeChild(this);
            this.firePlotRemoved(this);
            this.host.remove();
        };

        this.removeMap = function () {
            if (!_isMaster)
                return;
            else {
                _mapControl = undefined;
                _constraint = undefined;
                this.navigation.animation = new InteractiveDataDisplay.PanZoomAnimation();
                this.fitToView();
            }
        }

        //-------------------------------------------------------------------
        // Initialization of children

        // Adds a child to _children, fires the event and requests update.
        // (logical add)
        this.addChild = function (childPlot) {
            if (!childPlot) throw "Child plot is undefined";
            if (childPlot.master && (childPlot.master !== childPlot && childPlot.master !== this.master)) throw "Given child plot already added to another plot";
            if (childPlot.master !== this.master)
                childPlot.onAddedTo(this.master); // changing master
            _children.push(childPlot);
            if (this.master._sharedCanvas) {
                this.master._sharedCanvas.remove();
                this.master._sharedCanvas = undefined;
            }

            if (childPlot.constraint) {
                if (_constraint === undefined) {
                    _constraint = childPlot.constraint;
                }
                else {
                    throw "Plot composition can have only 1 constraint function!";
                }
            }

            if (childPlot.map !== undefined) {
                if (_mapControl !== undefined)
                    throw "Plot composition can have only 1 map!";
                _mapControl = childPlot.map;
            }

            this.fireChildrenChanged({ type: "add", plot: childPlot });
            this.requestUpdateLayout();
        };

        this.assignChildOrder = function (childPlot) {
            if (typeof childPlot.host.attr("data-idd-plot-order") == "undefined") {
                if (childPlot.order != InteractiveDataDisplay.MaxInteger)
                    childPlot.order = InteractiveDataDisplay.Utils.getMaxOrder(this.master) + 1;
            }
            else {
                childPlot.order = childPlot.host.attr("data-idd-plot-order");
                childPlot.host.removeAttr("data-idd-plot-order");
            }
            if (childPlot.order < InteractiveDataDisplay.MaxInteger) childPlot.host.css("z-index", childPlot.order);
        };

        // The function is called when this plot is added(removed) to the new master.
        // It (recursively for its children) updates state.
        this.onAddedTo = function (master) {
            _master = master;
            _isMaster = this === master;
            var n = _children.length;
            for (; --n >= 0;) _children[n].onAddedTo(master);

            if (_isMaster) {
                div.addClass("idd-plot-master").removeClass("idd-plot-dependant");
            }
            else {
                div.removeClass("idd-plot-master").addClass("idd-plot-dependant");
            }
        };

        // Removes a child from this plot.
        // Argument plot is either the plot object or its name
        // Returns true if the plot was found and removed.
        // (locical remove)
        this.removeChild = function (plot) {
            if (!plot) throw 'plot is undefined';
            var child;
            var n = _children.length;
            for (; --n >= 0;) {
                child = _children[n];
                if (child === plot || child.name === plot) {
                    _children.splice(n, 1);
                    child.onAddedTo(child);

                    if (this.master._sharedCanvas) {
                        this.master._sharedCanvas.remove();
                        this.master._sharedCanvas = undefined;
                    }

                    if (child.constraint !== undefined) {
                        _constraint = undefined;
                    }

                    if (child.map !== undefined) {
                        _mapControl = undefined;
                    }

                    this.fireChildrenChanged({ type: "remove", plot: child });
                    this.requestUpdateLayout();
                    return true;
                }
            }
            n = _children.length;
            for (; --n >= 0;) {
                child = _children[n];
                if (child.removeChild(plot)) return true;
            }
            return false;
        };

        //Gets linear list of plots from hierarchy
        this.getPlotsSequence = function () {
            var plots = [that];
            var n = _children.length;
            for (var i = 0; i < n; i++) {
                var plot = _children[i];
                var plotSeq = plot.getPlotsSequence();
                plotSeq.forEach(function (cp) { plots.push(cp); });
            }
            return plots;
        };

        // Gets the bounds of inner content of this plot (excluding its children plots)
        // Returns a rectangle {x,y,width,height} in the plot plane (x,y is left-bottom, i.e. less point).
        // This should not be overriden in derived plot objects (caches previous bounding box).
        // step = 1 indicates that preferred bounds are requested (some plots can be draws within any bounds, e.g. geo map images)
        // step = 2 indicates that effective bounds to be drawn in are requested (some plots can be draws within any bounds, e.g. geo map images)
        this.getLocalBounds = function (step, computedBounds) {
            if (!_localbbox)
                _localbbox = this.computeLocalBounds(step, computedBounds);
            return _localbbox;
        };

        // Computes bounds of inner content of this plot (excluding its children plots)
        // Returns a rectangle in the plot plane.
        // This should be overriden in derived plot objects.
        // step = 1 indicates that preferred bounds are requested (some plots can be draws within any bounds, e.g. geo map images)
        // step = 2 indicates that effective bounds to be drawn in are requested (some plots can be draws within any bounds, e.g. geo map images)
        this.computeLocalBounds = function (step, computedBounds) {
            return undefined;
        };

        // Invalidates local bounding box stored in the cache.
        // To be called by derived plots.
        // Returns previous local bounding box.
        this.invalidateLocalBounds = function () {
            var bb = _localbbox;
            _localbbox = undefined;
            return bb;
        };        

        // Aggregates all bounds of this plot and its children plots
        // Returns a rectangle in the plot plane (bounding box).
        this.aggregateBounds = function () {

            var plots = that.getPlotsSequence();
            var bounds = undefined;

            // there is tho pass approach here.
            // Some plots are ready to be drawn in any bounding box (e.g. geo map images), thus they return 'undefined' at the first pass
            // for such plots second pass is invoked. At second pass these plots must return some BB knowing the BB of others

            //First pass: calculating static plot rects
            var undefinedBBPlots = [];
            var n = plots.length;
            for (var i = 0; i < n; i++) {
                var plot = plots[i];
                if (plot.isIgnoredByFitToView)
                    continue;
                var plotBounds = plot.getLocalBounds(1);
                if (plot.isVisible && !plot.isErrorVisible) {
                    if (plotBounds === undefined) {
                        undefinedBBPlots.push(plot);
                    } else {
                        bounds = InteractiveDataDisplay.Utils.unionRects(bounds, plotBounds);
                    }
                }
            }

            //Second pass: calculating final plot rect
            n = undefinedBBPlots.length;
            var firstStepBounds = bounds;
            for (var i = 0; i < n; i++) {
                var plot = undefinedBBPlots[i];
                //On second step plot should return input bounds or extend them with itself bounds
                bounds = InteractiveDataDisplay.Utils.unionRects(bounds, plot.getLocalBounds(2, firstStepBounds));
            }

            if (bounds !== undefined) {
                var boundsWidthConstant = 100;
                if (bounds.width === 0) {
                    var absX = Math.max(0.1, Math.abs(bounds.x));
                    bounds.x = bounds.x - absX / (2 * boundsWidthConstant);
                    bounds.width = absX / boundsWidthConstant;
                }
                if (bounds.height === 0) {
                    var absY = Math.max(0.1, Math.abs(bounds.y));
                    bounds.y = bounds.y - absY / (2 * boundsWidthConstant);
                    bounds.height = absY / boundsWidthConstant;
                }
            }

            var isDefault = _isMaster && bounds === undefined;
            if (isDefault) {
                if (_mapControl !== undefined) {
                    bounds = { x: -180, y: -90, width: 360, height: 2 * 90 };
                } else {
                    bounds = { x: 0, y: 0, width: 1, height: 1 };
                }
            }
            return { bounds: bounds, isDefault: isDefault };
        };

        // Computes padding of inner content of this plot
        // Returns 4 margins in the screen coordinate system
        // This should be overriden in derived plot objects.
        this.getLocalPadding = function () {
            return { left: 0, right: 0, top: 0, bottom: 0 };
        };

        // Aggregates padding of both content of this plot and its children plots
        // Returns 4 margins in the plot plane coordinate system
        this.aggregatePadding = function () {
            var padding = that.getLocalPadding() || { left: 0, right: 0, top: 0, bottom: 0 };
            var n = _children.length;
            for (var i = 0; i < n; i++) {
                var plot = _children[i];
                var plotPadding = plot.aggregatePadding();
                padding = {
                    left: Math.max(padding.left, plotPadding.left),
                    right: Math.max(padding.right, plotPadding.right),
                    top: Math.max(padding.top, plotPadding.top),
                    bottom: Math.max(padding.bottom, plotPadding.bottom)
                };
            }
            padding.left = padding.left + this.padding || this.padding;
            padding.right = padding.right + this.padding || this.padding;
            padding.top = padding.top + this.padding || this.padding;
            padding.bottom = padding.bottom + this.padding || this.padding;
            return padding;
        };

        //-------------------------------------------------------------------------
        // Layout and Rendering

        // Makes children plots to render (recursive).
        // If renderAll is false, renders only plots with the property requestsRender set to true.
        var updatePlotsOutput = function () {            
            if (_master.flatRendering) { // flat rendering mode
                renderAll = true;
                if (_master._sharedCanvas) {
                    _master._sharedCanvas._dirty = true;
                }
            }
            if (that.requestsUpdateLayout) {
                that.requestsUpdateLayout = false;
                that.isAnimationFrameRequested = false;

                renderAll = true;
                // console.log('updating whole layout')
                that.updateLayout(); // this eventually fires the frameRendered event
            } else {
                that.isAnimationFrameRequested = false;

                var screenSize = that.screenSize;
                var plotRect = that.coordinateTransform.getPlotRect({ x: 0, y: 0, width: screenSize.width, height: screenSize.height }); // (x,y) is left/top            
                // rectangle in the plot plane which is visible, (x,y) is left/bottom (i.e. less) of the rectangle
                // console.log('updating only plots output')
                updatePlotsOutputRec(renderAll, _master, plotRect, screenSize);
                that.fireFrameRendered();
            }
            renderAll = false;

            if (_updateTooltip) _updateTooltip();
        };

        var updatePlotsOutputRec = function (renderAll, plot, plotRect, screenSize) {
            if (!plot || !plot.isVisible) return;

            if (renderAll || plot.requestsRender) {
                plot.requestsRender = false;
                plot.render(plotRect, screenSize);
            }
            var children = plot.children;
            var n = children.length;
            for (var i = 0; i < n; i++) {
                var child = children[i];
                updatePlotsOutputRec(renderAll, child, plotRect, screenSize);
            }
        };

        // When called, notifies that the given plot needs another render call at the next frame 
        // (to allow other system events to be handled between the renders).
        this.requestNextFrame = function (plot) {
            plot = plot || this;
            if (!_isMaster) {
                _master.requestNextFrame(plot);
                return;
            }
            plot.requestsRender = true;
            if (this.isAnimationFrameRequested) return;
            this.isAnimationFrameRequested = true;
            renderAll = false;
            InteractiveDataDisplay.Utils.requestAnimationFrame(updatePlotsOutput);
        };

        this.requestUpdateLayout = function (settings) {
            if (!_isMaster) {
                _master.requestUpdateLayout(settings);
                return;
            }
            renderAll = true;
            _suppressNotifyBoundPlots = settings && settings.suppressNotifyBoundPlots;
            if (this.requestsUpdateLayout) return;
            if(!settings || !settings.forceOnlyUpdatePlotsOutput) // this is hook for subplots functionality
                this.requestsUpdateLayout = true;
            if (this.isAnimationFrameRequested) return; // we use already set time out
            this.isAnimationFrameRequested = true; // because update layout includes rendering of all objects
            
            // DG: You may wonder why the method is called requetUpdateLayout, but
            //     schedules not this.updateLayout but updatePlotsOutput (see below) instead.
            //     Seems to be tricky dependent behevior here.
            //     updatePlotsOutput checks for this.requestsUpdateLayout and decides
            //     whether to call updateLayout or updatePlotsOutputRec            

            InteractiveDataDisplay.Utils.requestAnimationFrame(updatePlotsOutput);
        };

        this.onIsVisibleChanged = function () {
            this.updateLayout();
        };

        this.onDataTranformChangedCore = function (arg) {
        };

        this.onDataTransformChanged = function (arg) {
            _localbbox = undefined;
            this.onDataTranformChangedCore(arg);
            if (this.isAutoFitEnabled)
                this.master.requestUpdateLayout();
            else if (this.doFitOnDataTransformChanged)
                this.master.fitToView();
            //this.master.requestNextFrame(this);
        };

        // Updates output of this plot using the current coordinate transform and screen size.
        // plotRect     {x,y,width,height}  Rectangle in the plot plane which is visible, (x,y) is left/bottom of the rectangle
        // screenSize   {width,height}      Size of the output region to render inside
        // Returns true, if the plot actually has rendered something; otherwise, returns false.
        this.render = function (plotRect, screenSize) {
            
            var localbb = this.getLocalBounds(); //  {x,y,width,height}
            var nowIsRendered = false;

            // if localbb is undefined, plot is infinite and it is ready to render in any given region
            if (localbb) // has content to render
            {
                var intersection = InteractiveDataDisplay.Utils.intersect(localbb, plotRect); //  {x,y,width,height}
                if (intersection)  // visible
                {
                    SetIsErrorVisible.call(this, false);
                    this.renderCore(plotRect, screenSize);
                    nowIsRendered = true;

                    //var ct = this.coordinateTransform;
                    //var iw = ct.plotToScreenWidth(intersection.width);
                    //var ih = ct.plotToScreenHeight(intersection.height);
                    //if (iw >= InteractiveDataDisplay.MinSizeToShow && ih >= InteractiveDataDisplay.MinSizeToShow) // not too small
                    //{
                    //    doRender = true;
                    //}
                }
                else if (localbb.width != localbb.width || localbb.height != localbb.height || localbb.x != localbb.x || localbb.y != localbb.y ||
                    // Number.IsFinite is not supported in IE, thus using "isFinite"
                    !isFinite(localbb.width) || !isFinite(localbb.height) || !isFinite(localbb.y) || !isFinite(localbb.x)) {
                    SetIsErrorVisible.call(this, true);
                }
            } else {
                this.renderCore(plotRect, screenSize);
                nowIsRendered = true;
            }
            if (nowIsRendered !== _isRendered) {
                _isRendered = nowIsRendered;
                this.onIsRenderedChanged(); // todo: trigger event
            }
        };

        // Updates output of this plot using the current coordinate transform and screen size.
        // plotRect     {x,y,width,height}  Rectangle in the plot plane which is visible, (x,y) is left/bottom of the rectangle
        // screenSize   {width,height}      Size of the output region to render inside
        // This method should be implemented by derived plots.
        this.renderCore = function (plotRect, screenSize) {
        };

        /// Renders the plot to the svg and returns the svg object.
        this.exportToSvg = function () {
            if (!SVG.supported) throw "SVG is not supported";

            var screenSize = that.screenSize;
            var plotRect = that.coordinateTransform.getPlotRect({ x: 0, y: 0, width: screenSize.width, height: screenSize.height });

            var svgHost = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            var svg = SVG(svgHost).size(_host.width(), _host.height());
            that.exportContentToSvg(plotRect, screenSize, svg);
            return svg;
        };

        this.exportContentToSvg = function (plotRect, screenSize, svg) {
            var plots = InteractiveDataDisplay.Utils.enumPlots(this); //this.getPlotsSequence();
            for (var i = plots.length - 1; i >= 0; i--) {
                if (plots[i].isVisible) plots[i].renderCoreSvg(plotRect, screenSize, svg);
            }
        };

        this.exportLegendToSvg = function (legendDiv) {
            if (!SVG.supported) throw "SVG is not supported";

            var screenSize = that.screenSize;
            var plotRect = that.coordinateTransform.getPlotRect({ x: 0, y: 0, width: screenSize.width, height: screenSize.height });

            var svgHost = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            // hack
            // calculating non-compact legend expected height

            var svg = SVG(svgHost);
            var legend_g = svg.group();
            var plots = InteractiveDataDisplay.Utils.enumPlots(this);
            var commonSettings = { width: 170, height: 0 };
            var j = 0;
            var lastLine;
            for (var i = 0; i < plots.length; i++) {
                var legendSettings = { width: 170, height: 0 };
                if (plots[i].getLegend() != undefined) {
                    if (plots[i].isVisible) {
                        var item_g = legend_g.group();
                        if (legendDiv) {
                            legendSettings.legendDiv = legendDiv.children[j];
                            j++;
                        }
                        plots[i].buildSvgLegend(legendSettings, item_g);
                        item_g.translate(5, commonSettings.height);
                        legend_g.clipWith(item_g.rect(legendSettings.width, commonSettings.height + 30));
                        commonSettings.height += legendSettings.height + 10;
                        lastLine = svg.line(15, commonSettings.height, commonSettings.width, commonSettings.height).stroke({ width: 0.3, color: "gray" }).back();
                        commonSettings.height += 10;
                    }
                    else j++;
                }
            }
            if (lastLine != undefined) lastLine.remove();
            svg.size(200, commonSettings.height + 10)
            legend_g.clipWith(legend_g.rect(180, commonSettings.height + 10));            
            return svg;
        };

        // Renders this plot to svg using the current coordinate transform and screen size.
        // plotRect     {x,y,width,height}  Rectangle in the plot plane which is visible, (x,y) is left/bottom of the rectangle
        // screenSize   {width,height}      Size of the output region to render inside
        // This method should be implemented by derived plots.
        this.renderCoreSvg = function (plotRect, screenSize, svg) {
        };
        // Renders legend of this plot. This method should be implemented by derived plots.
        this.buildSvgLegend = function (legendSetting, svg) {
        };
        // Notifies derived plots that isRendered changed.
        // todo: make an event and bind in the derived plots
        this.onIsRenderedChanged = function () {
        };

        // DG: It seems that the function recomputes (updates)
        // plot's _plotRect and _coordinateTransform properties
        // 
        // It has side effects of saving screenSize into internal properties _width and _height
        // which is particularly important during plot initialization:
        // "fit" must be called before any updateLayout() calls
        //               
        // It also MAY compute and return the final output rect to be used in arrange phase
        // 
        // plotScreenSizeChanged is passed to _constraint
        this.fit = function (screenSize, finalPath, plotScreenSizeChanged) {
            _width = screenSize.width;
            _height = screenSize.height;

            var outputRect = undefined;

            if (_isAutoFitEnabled || _requestFitToView) {
                var aggregated = _master.aggregateBounds();
                var bounds = aggregated.bounds;
                if (bounds.x != bounds.x) bounds.x = 0;
                if (bounds.y != bounds.y) bounds.y = 0;
                if (bounds.width != bounds.width) bounds.width = 1;
                if (bounds.height != bounds.height) bounds.height = 1;
                // todo: this is an exceptional situation which should be properly handled
                _plotRect = bounds;
                var padding = aggregated.isDefault ? { left: 0, top: 0, bottom: 0, right: 0 } : _master.aggregatePadding();
                _coordinateTransform = InteractiveDataDisplay.Utils.calcCSWithPadding(_plotRect, screenSize, padding, _master.aspectRatio);


                outputRect = _coordinateTransform.getPlotRect({ x: 0, y: 0, width: screenSize.width, height: screenSize.height });

                if (_constraint !== undefined && finalPath === true) {
                    outputRect = _constraint(outputRect, screenSize, true);
                    _coordinateTransform = new InteractiveDataDisplay.CoordinateTransform(outputRect, { left: 0, top: 0, width: _width, height: _height }, _master.aspectRatio);
                }
            }
            else {
                var paddingX = undefined;
                var paddingY = undefined;
                var aggregatedPadding = undefined;
                var aggregated = undefined;

                if (_requestFitToViewX === true || _requestFitToViewY === true) {
                    aggregated = _master.aggregateBounds();
                    aggregatedPadding = aggregated.isDefault ? { left: 0, top: 0, bottom: 0, right: 0 } : _master.aggregatePadding();
                }

                if (_requestFitToViewX === true) {
                    _plotRect.width = aggregated.bounds.width;
                    _plotRect.x = aggregated.bounds.x;
                    paddingX = aggregated.isDefault ? { left: 0, top: 0, bottom: 0, right: 0 } : aggregatedPadding;
                }

                if (_requestFitToViewY === true) {
                    _plotRect.height = aggregated.bounds.height;
                    _plotRect.y = aggregated.bounds.y;
                    paddingY = aggregated.isDefault ? { left: 0, top: 0, bottom: 0, right: 0 } : aggregatedPadding;
                }

                var padding = undefined;
                if (paddingX !== undefined || paddingY !== undefined) {
                    padding = {
                        left: paddingX !== undefined ? paddingX.left : 0,
                        top: paddingY !== undefined ? paddingY.top : 0,
                        bottom: paddingY !== undefined ? paddingY.bottom : 0,
                        right: paddingX !== undefined ? paddingX.right : 0
                    }
                }

                if (padding !== undefined) {
                    _coordinateTransform = InteractiveDataDisplay.Utils.calcCSWithPadding(_plotRect, screenSize, padding, _master.aspectRatio);
                } else {
                    _coordinateTransform = new InteractiveDataDisplay.CoordinateTransform(_plotRect, { left: 0, top: 0, width: _width, height: _height }, _master.aspectRatio);
                }

                outputRect = _coordinateTransform.getPlotRect({ x: 0, y: 0, width: screenSize.width, height: screenSize.height });

                if (_constraint !== undefined && finalPath === true) {
                    outputRect = _constraint(outputRect, screenSize, plotScreenSizeChanged);
                    _coordinateTransform = new InteractiveDataDisplay.CoordinateTransform(outputRect, { left: 0, top: 0, width: _width, height: _height }, _master.aspectRatio);
                }

                _plotRect = outputRect;
            }

            if (finalPath) {
                _plotRect = outputRect;
            }
            return outputRect;
        };

        // Makes layout of all children elements of the plot and invalidates the plots' images.
        this.updateLayout = function () {
            that.requestsUpdateLayout = false;
            if (_isMaster) {

                var oldVisibleRect = that.visibleRect;
                var screenSize = { width: _host.width(), height: _host.height() };

                if (screenSize.width <= 1 || screenSize.height <= 1) {
                    // The first updateLayout call performs some late initialization (screenSize can be zero)
                    // thus we can not just "return" without measure-arrange calls.

                    // first "measure" call sets _width, _height, etc                    
                    var finalSize = that.measure({ width: 1, height: 1 }); // I pass ones here to avoid singularities
                    // first "arrange" call initializes _canvas, etc.
                    that.arrange(finalSize);
                    return;
                }

                var plotScreenSizeChanged = that.screenSize.width !== screenSize.width || that.screenSize.height !== screenSize.height;

                var finalSize = that.measure(screenSize, plotScreenSizeChanged);
                _requestFitToView = false;
                _requestFitToViewX = false;
                _requestFitToViewY = false;
                that.arrange(finalSize);

                var newVisibleRect = that.visibleRect;
                if (newVisibleRect.x !== oldVisibleRect.x || newVisibleRect.y !== oldVisibleRect.y || newVisibleRect.width !== oldVisibleRect.width || newVisibleRect.height !== oldVisibleRect.height) {
                    updatePlotsOutput();
                    that.fireVisibleRectChanged({ visibleRect: newVisibleRect });
                }

                renderAll = true;
                updatePlotsOutput();

                // Notifying bound plots about new visible rectangle
                if (!_suppressNotifyBoundPlots) {
                    var boundPlots = InteractiveDataDisplay.Binding.getBoundPlots(that);
                    var lengthH = boundPlots.h.length;
                    var lengthV = boundPlots.v.length;
                    if (lengthH > 0 || lengthV > 0) {
                        var plotRect = that.coordinateTransform.getPlotRect({ x: 0, y: 0, width: finalSize.width, height: finalSize.height }); // (x,y) is left/top            
                        boundPlots.v = boundPlots.v.slice(0);

                        // h or vh
                        for (var i = 0; i < lengthH; i++) {
                            var p = boundPlots.h[i];
                            var j = boundPlots.v.indexOf(p);
                            if (j >= 0) { // both v & h
                                boundPlots.v[j] = null; // already handled                            
                                p.navigation.setVisibleRect(plotRect, false, { suppressNotifyBoundPlots: true });
                            } else {
                                // binds only horizontal range
                                var exRect = p.visibleRect;
                                exRect.x = plotRect.x;
                                exRect.width = plotRect.width;
                                p.navigation.setVisibleRect(exRect, false, { suppressNotifyBoundPlots: true });
                            }
                        }

                        // just v
                        for (var i = 0; i < lengthV; i++) {
                            var p = boundPlots.v[i];
                            if (p == null) continue; // vh
                            // binds only vertical range
                            var exRect = p.visibleRect;
                            exRect.y = plotRect.y;
                            exRect.height = plotRect.height;
                            p.navigation.setVisibleRect(exRect, false, { suppressNotifyBoundPlots: true });
                        }
                    }
                }
                _suppressNotifyBoundPlots = false;
            }
            else {
                _master.updateLayout();
            }
        };

        // DG:  Looking at signature only, Why do we need to pass plotScreenSizeChanged here?
        //      We pass a size and whether this size changed (e.g. whether the first arg differs from prev call)
        //      If the function has dual responsibility of doing measure AND caching the result
        //      the responsibility of cache can be separated out
        this.measure = function (availibleSize, plotScreenSizeChanged) {

            if (this.mapControl !== undefined) {
                this.mapControl.setOptions({ width: availibleSize.width, height: availibleSize.height });
            }

            this.fit(availibleSize, true, plotScreenSizeChanged);

            if (_host) {
                _host.children("div")
                    .each(function () {
                        var jqElem = $(this); // refers the child DIV
                        jqElem.css("top", 0);
                        jqElem.css("left", 0);
                    });
            };

            return availibleSize;
        };

        this.arrange = function (finalRect) {
            if (!this.isMaster)
                InteractiveDataDisplay.Utils.arrangeDiv(this.host, finalRect);
            var myChildren = this.children;
            var n = myChildren.length;
            for (var i = 0; i < n; i++) {
                var dependant = myChildren[i];
                dependant.arrange(finalRect);
            }
        };

        // Requests to set the desired plot rect.
        // Can suppress notifications for bound plots to avoid echo.
        // Must be called by master plots.
        var setVisibleRegion = function (plotRect, settings) {
            if (that.isAutoFitEnabled) {
                that.isAutoFitEnabled = false;
            }


            _plotRect = plotRect;

            if (settings !== undefined && settings.syncUpdate !== undefined && settings.syncUpdate === true) {
                that.updateLayout();
            } else {
                that.requestUpdateLayout(settings);
            }
        };

        if(div) {
            if(div.attr("data-idd-visible-region")) {
                var regionStr = div.attr("data-idd-visible-region")
                
                var values = regionStr.split(' ')
                if(values.length != 4) 
                    throw "data-idd-visible-region must contain exactly 4 numbers (xmin,xmax,ymin,ymax) separated by single space"
                var xmin = Number(values[0])
                var xmax = Number(values[1])
                var ymin = Number(values[2])
                var ymax = Number(values[3])
                if(xmin>xmax)
                    throw "data-idd-visible-region attribute: xmax is less than xmin"
                if(ymin>ymax)
                    throw "data-idd-visible-region attribute: ymax is less than ymin"
                
                var dataToPlotX = this.xDataTransform && this.xDataTransform.dataToPlot;
                var dataToPlotY = this.yDataTransform && this.yDataTransform.dataToPlot;

                var plotXmin = dataToPlotX ? dataToPlotX(xmin) : xmin
                var plotXmax = dataToPlotX ? dataToPlotX(xmax) : xmax
                var plotYmin = dataToPlotY ? dataToPlotY(ymin) : ymin
                var plotYmax = dataToPlotY ? dataToPlotY(ymax) : ymax
                var plotRect = {x:plotXmin, width: plotXmax - plotXmin, y:plotYmin, height: plotYmax - plotYmin}
                setVisibleRegion(plotRect) // this call will disable fit to view
            }
        }

        //Disables IsAutoFitEnabled and fits all visible objects into screen with padding
        this.fitToView = function () {
            if (!_isMaster) {
                _master.fitToView();
            }
            else {
                this.isAutoFitEnabled = false;
                this.navigation.stop();

                _requestFitToView = true;
                this.requestUpdateLayout();
            }
        };

        this.fitToViewX = function () {
            if (!_isMaster) {
                _master.fitToViewX();
            }
            else {
                this.isAutoFitEnabled = false;
                this.navigation.stop();

                _requestFitToViewX = true;
                this.requestUpdateLayout();
            }
        };

        this.fitToViewY = function () {
            if (!_isMaster) {
                _master.fitToViewY();
            }
            else {
                this.isAutoFitEnabled = false;
                this.navigation.stop();

                _requestFitToViewY = true;
                this.requestUpdateLayout();
            }
        };

        // If auto fit is on and bound box changed, updates the layout; otherwise, requests next frame for this plot.
        // This method should be called from derived plots to efficiently update output.
        this.requestNextFrameOrUpdate = function () {
            if (this.isAutoFitEnabled)
                this.master.requestUpdateLayout();
            else
                this.master.requestNextFrame(this);
        };

        //------------------------------------------------------------------------------------
        // Mouse & tooltips

        // Implementation of this method for a particular plot should build and return
        // a tooltip element for the point (xd,yd) in data coordinates, and (xp, yp) in plot coordinates.
        // Method returns <div> element or undefined

        this.getTooltip = function (xd, yd, xp, yp) {
            return undefined;
        };

        var foreachDependentPlot = function (plot, f) {
            var myChildren = plot.children;
            var n = myChildren.length;
            for (var i = 0; i < n; i++) {
                var child = myChildren[i];
                foreachDependentPlot(child, f);
            }
            f(plot);
        };

        if (_isMaster) {
            var _tooltipTimer; // descriptor of the set timer to show the tooltip
            var _tooltip; // jQuery of <div> element which displays the tooltip. undefined means that there is no visible tooltip right now
            var _updateTooltip; // refills the content of the _tooltip. Useful for the tooltips of dynamically updated data

            this.enumAll = function (plot, f) {
                foreachDependentPlot(plot, f);
            };
            
            /// Instantly removes the supplied toolip and cancels any timers scheduled by it
            var destroyTooltipInstance = function(jqTooltip) {
                if (jqTooltip) {
                    
                    if (jqTooltip.fadeOutTimer) {
                        clearTimeout(jqTooltip.fadeOutTimer);
                        jqTooltip.fadeOutTimer = undefined;
                    }

                    jqTooltip.remove();
                    jqTooltip = undefined;
                }
            }

            // aborts (or cancels) the tooltip in any tooltip phase
            var clearTooltip = function () {                
                if (_tooltipTimer) {
                    clearTimeout(_tooltipTimer);
                    _tooltipTimer = undefined;
                }                           

                _updateTooltip = undefined;
                destroyTooltipInstance(_tooltip)
            };

            // Callback function which is called by the tooltip timer
            var onShowTooltip = function (origin_s, origin_p) {
                _tooltipTimer = undefined;
                clearTooltip();

                var getElements = function () {
                    var tooltips = [];
                    var xd, yd;
                    var px = origin_p.x, py = origin_p.y;

                    foreachDependentPlot(that, function (child) {
                        var my_xd = child.xDataTransform ? child.xDataTransform.plotToData(px) : px;
                        var my_yd = child.yDataTransform ? child.yDataTransform.plotToData(py) : py;

                        var myTooltip = child.getTooltip(my_xd, my_yd, px, py);
                        if (myTooltip) {
                            if (my_xd !== xd || my_yd !== yd) {
                                xd = my_xd;
                                yd = my_yd;

                                var formatter1 = new InteractiveDataDisplay.AdaptiveFormatter(_master.visibleRect.x, _master.visibleRect.x + _master.visibleRect.width);
                                var formatter2 = new InteractiveDataDisplay.AdaptiveFormatter(_master.visibleRect.y, _master.visibleRect.y + _master.visibleRect.height);
                                if (_tooltipSettings === undefined || _tooltipSettings.showCursorCoordinates !== false)
                                    tooltips.push("<div class='idd-tooltip-coordinates'>" + formatter1.toString(xd) + ", " + formatter2.toString(yd) + "</div>");
                            }
                            tooltips.push(myTooltip);
                        }
                    });
                    return tooltips;
                }

                var tooltips = getElements();
                if (tooltips.length === 0) return;

                _tooltip = $("<div></div>")
                    .addClass("idd-tooltip")
                    .hide()
                    .appendTo(that.host)
                    .css("position", "absolute")
                    .css("left", origin_s.x + 15)
                    .css("top", origin_s.y + 15)
                    .css("z-index", InteractiveDataDisplay.ZIndexTooltipLayer);

                var fillChildrenTooltips = function(tooltips) {
                    var n = tooltips.length;
                    for (var i = 0; i < n; i++) {
                        $(tooltips[i]).appendTo(_tooltip).addClass("idd-tooltip-item");
                    }
                }

                fillChildrenTooltips(tooltips)

                // Building content of the tooltip:
                // fills up _tooltip with appropriate up to date content
                _updateTooltip = function () {
                    if (!_tooltip) return;
                    _tooltip.empty();

                    var tooltips = getElements()

                    fillChildrenTooltips(tooltips)

                    return tooltips.length;
                }

                var localTooltip = _tooltip;
                
                function activateFadeOut () {
                    _updateTooltip = undefined;
                    localTooltip.fadeOut('fast');
                }

                function removeCertainTooltip (){
                    if (localTooltip.fadeOutTimer) {
                        clearTimeout(localTooltip.fadeOutTimer)
                        localTooltip.fadeOutTimer = undefined
                    }
                    //_updateTooltip = undefined
                    localTooltip.remove()
                    localTooltip = undefined
                }

                var afterFadeIn = function () {
                    if(_tooltipSettings.tooltipDelay === 0) {
                        localTooltip.show()
                        localTooltip.fadeOutTimer = setTimeout( removeCertainTooltip, InteractiveDataDisplay.TooltipDuration * 1000 )
                    }
                    else {
                        localTooltip.fadeOutTimer = setTimeout( activateFadeOut, InteractiveDataDisplay.TooltipDuration * 1000 )
                    }

                }

                if(_tooltipSettings.tooltipDelay === 0)
                    afterFadeIn()
                else
                    _tooltip.fadeIn('fast', afterFadeIn)
            };

            _centralPart.mousemove(function (event) {
                mouseDownPoint = undefined;
                var originHost = InteractiveDataDisplay.Gestures.getXBrowserMouseOrigin(_host, event);
                var originCentralPart = InteractiveDataDisplay.Gestures.getXBrowserMouseOrigin(_centralPart, event);
                var ct = that.coordinateTransform;
                var p = { // plot coordinates of the event
                    x: ct.screenToPlotX(originCentralPart.x),
                    y: ct.screenToPlotY(originCentralPart.y)
                };

                // Handling tooltip
                // Mouse move can accure in different tooltip lifetime phases (states):
                // 1) First mouse move over master plot (e.g. mouse entered the plot area)
                // 2) While the tooltipDelay timer is active (the delay before tooltip appearence after the mouse stopped moving)
                // 3) While the ttoltipDuration timer is active (the tooltip is on the screen)                

                // Handling phase 2.
                // We need to reset the tooltip delay timer, thus clearing the timer. It will be rescheduled below
                if (_tooltipTimer) {
                    clearTimeout(_tooltipTimer);
                    _tooltipTimer = undefined;
                }

                // Handling phase 3
                // we save the current tooltip to destroy it right after we create the new one
                var prevTooltip = _tooltip

                if (that.master.isToolTipEnabled) {
                    // Tooltip timer is scheduled in all three phases
                    if(_tooltipSettings.tooltipDelay === 0)
                        onShowTooltip(originHost, p)
                    else
                        _tooltipTimer = setTimeout(function () { onShowTooltip(originHost, p); }, _tooltipSettings.tooltipDelay );
                }

                destroyTooltipInstance(prevTooltip)

                var onmousemove_rec = function (plot, origin_s, origin_p) {
                    if (plot.onMouseMove) {
                        plot.onMouseMove(origin_s, origin_p);
                    }
                    var children = plot.children;
                    var n = children.length;
                    for (var i = 0; i < n; i++) {
                        onmousemove_rec(children[i], origin_s, origin_p);
                    }
                };
                onmousemove_rec(that, originCentralPart, p);
            });

            var mouseDownPoint;
            _centralPart.mousedown(function (event) {
                clearTooltip();

                mouseDownPoint = InteractiveDataDisplay.Gestures.getXBrowserMouseOrigin(_centralPart, event);
            });

            _centralPart.mouseup(function (event) {
                clearTooltip();

                var origin = InteractiveDataDisplay.Gestures.getXBrowserMouseOrigin(_centralPart, event);
                if (!mouseDownPoint || mouseDownPoint.x != origin.x || mouseDownPoint.y != origin.y) return;
                var ct = that.coordinateTransform;
                var p = { // plot coordinates of the event
                    x: ct.screenToPlotX(origin.x),
                    y: ct.screenToPlotY(origin.y)
                };

                var onclick_rec = function (plot, origin_s, origin_p) {
                    if (plot.onClick) {
                        plot.onClick(origin_s, origin_p);
                    }
                    var children = plot.children;
                    var n = children.length;
                    for (var i = 0; i < n; i++) {
                        onclick_rec(children[i], origin_s, origin_p);
                    }
                };
                onclick_rec(that, origin, p);
            });

            _centralPart.mouseleave(function (event) {
                clearTooltip();
            });
        }
        else {
            this.enumAll = _master.enumAll;
        }

        //------------------------------------------------------------------------------------
        // Other API

        // Gets the plot object with the given name.
        // If plot is not found, returns undefined.
        this.get = function (p) {
            var getrec = function (p, plot) {
                if (plot.name === p || plot.host[0].id === p || plot.host[0] === p) return plot;

                var children = plot.children;
                var n = children.length;
                for (var i = 0; i < n; i++) {
                    var res = getrec(p, children[i]);
                    if (res) return res;
                }

                return undefined;
            };
            return getrec(p, this.master);
        };

        var appearanceChanged = false;

        // fires the AppearanceChanged event
        this.fireAppearanceChanged = function (propertyName) {
            if (!appearanceChanged) {
                appearanceChanged = true;
                setTimeout(function () {
                    that.host.trigger(InteractiveDataDisplay.Event.appearanceChanged, propertyName);
                    appearanceChanged = false;
                }, 20);
            }
        };

        // fires the ChildrenChanged event
        this.fireChildrenChanged = function (propertyParams) {
            this.host.trigger(InteractiveDataDisplay.Event.childrenChanged, propertyParams);
        };

        this.fireFrameRendered = function (propertyParams) {
            this.host.trigger(InteractiveDataDisplay.Event.frameRendered, propertyParams);
        };

        // Occurs at a plot when its actual visible rectangle is changed. Handler gets (senderPlot, visibleRect) (in plot coordinates).
        // Actual visible rectangle can differ from the rectangle provided in Navigation.SetVisibleRect(), since it may be constrained by aspect ratio.
        this.fireVisibleRectChanged = function (propertyParams) {
            clearTooltip();
            this.master.host.trigger(InteractiveDataDisplay.Event.visibleRectChanged, propertyParams);
        };

        this.fireVisibleChanged = function (propertyParams) {
            this.host.trigger(InteractiveDataDisplay.Event.isVisibleChanged, propertyParams);
        };
        this.firePlotRemoved = function (propertyParams) {
            this.host.trigger(InteractiveDataDisplay.Event.plotRemoved, propertyParams);
            foreachDependentPlot(propertyParams, function (child) {
                child.host.trigger(InteractiveDataDisplay.Event.plotRemoved, child);
            });
        };
        this.fireOrderChanged = function (propertyParams) {
            this.host.trigger(InteractiveDataDisplay.Event.orderChanged, propertyParams);
        };
        //--------------------------------------------------------------------------------------
        // Plot factories

        // If this plot has no child plot with given name, it is created from the data;
        // otherwise, existing plot is updated.
        this.polyline = function (name, data) {
            var plot = this.get(name);
            if (!plot) {
                var div = $("<div></div>")
                    .attr("data-idd-name", name)
                    //  .attr("data-idd-plot", "polyline")
                    .appendTo(this.host);
                plot = new InteractiveDataDisplay.Polyline(div, this.master);
                this.addChild(plot);
                this.assignChildOrder(plot);
            }
            if (data !== undefined) {
                plot.draw(data);
            }
            return plot;
        };

        this.markers = function (name, data, titles) {
            var plot = this.get(name);
            if (!plot) {
                var div = $("<div></div>")
                    .attr("data-idd-name", name)
                    .appendTo(this.host);
                plot = new InteractiveDataDisplay.Markers(div, this.master);
                this.addChild(plot);
                this.assignChildOrder(plot);
            }
            if (data !== undefined) {
                plot.draw(data, titles);
            }

            return plot;
        };

        this.area = function (name, data) {
            var plot = this.get(name);
            if (!plot) {
                var div = $("<div></div>")
                    .attr("data-idd-name", name)
                    // .attr("data-idd-plot", "area")
                    .appendTo(this.host);
                plot = new InteractiveDataDisplay.Area(div, this.master);
                this.addChild(plot);
                this.assignChildOrder(plot);
            }
            if (data !== undefined) {
                plot.draw(data);
            }

            return plot;
        };

        this.heatmap = function (name, data, titles) {
            var plot = this.get(name);
            if (!plot) {
                var div = $("<div></div>")
                    .attr("data-idd-name", name)
                    //  .attr("data-idd-plot", "heatmap")
                    .appendTo(this.host);
                plot = new InteractiveDataDisplay.Heatmap(div, this.master);
                this.addChild(plot);
                this.assignChildOrder(plot);
            }
            if (data !== undefined) {
                plot.draw(data, titles);
            }
            return plot;
        };

        this.labels = function (name, data) {
            var plot = this.get(name);
            if (!plot) {
                var div = $("<div></div>")
                    .attr("data-idd-name", name)
                    .appendTo(this.host);
                plot = new InteractiveDataDisplay.LabelPlot(div, this.master);
                this.addChild(plot);
                this.assignChildOrder(plot);
            }
            if (data !== undefined) {
                plot.draw(data);
            }
            return plot;
        }

        //------------------------------------------------------------------------------
        //Navigation
        if (_isMaster) {
            //Initializing navigation
            var _navigation = new InteractiveDataDisplay.Navigation(this, setVisibleRegion);
        }

        Object.defineProperty(this, "navigation", { get: function () { if (_isMaster) return _navigation; else return _master.navigation; }, configurable: false });


        //-------------------------------------------------------------------
        // Initialization of children

        // Looking for children of this master plot (builds collection _children)
        if (_host) {
            _host.children("div")
                .each(function () {
                    var jqElem = $(this); // refers the child DIV
                    if (!jqElem.hasClass("idd-plot-master") && !jqElem.hasClass("idd-plot-dependant") && jqElem.attr("data-idd-plot") !== undefined && jqElem.attr("data-idd-plot") !== "figure" && jqElem.attr("data-idd-plot") !== "chart") { // it shouldn't be initialized and it shouldn't be a master plot (e.g. a figure)
                        var initializedPlot = initializePlot(jqElem, _master);
                        that.addChild(initializedPlot); // here children of the new child will be initialized recursively
                        that.assignChildOrder(initializedPlot);
                    }
                });
        }

        //------------------------------------------------------------------------
        // Legend
        this.getLegend = function () {
            return undefined;
        };
        setTimeout(function () {
            if (_host && _host.attr("data-idd-legend")) {
                var legendDiv = $("#" + _host.attr("data-idd-legend"));
                var _legend = new InteractiveDataDisplay.Legend(that, legendDiv, true);
                Object.defineProperty(that, "legend", { get: function () { return _legend; }, configurable: false });

                //Stop event propagation
                InteractiveDataDisplay.Gestures.FullEventList.forEach(function (eventName) {
                    legendDiv[0].addEventListener(eventName, function (e) {
                        e.stopPropagation();
                    }, false);
                });
            }
        }, 0);

        this.updateOrder = function (elem, elemIsPrev) {
            if (elem) InteractiveDataDisplay.Utils.reorder(this, elem, elemIsPrev);
            if (!_isFlatRenderingOn) {
                var plots = InteractiveDataDisplay.Utils.enumPlots(_master);
                for (var i = 0; i < plots.length; i++) {
                    if (plots[i].order < InteractiveDataDisplay.MaxInteger) plots[i].host.css('z-index', plots[i].order);
                }
            }
        };

        if (div) {
            if (_isMaster) {
                if (div.attr("data-idd-plot") !== 'figure' && div.attr("data-idd-plot") !== 'chart')
                    this.updateLayout();
                div.addClass("idd-plot-master");
            }
            else {
                div.addClass("idd-plot-dependant");
            }
        }
    };

    var _plotLegends = [];
    // Legend with hide/show function
    // _plot - where to find the children for gathering legend info from
    // _jqdiv - where to put generated legend items
    // isNotSortable - dragging the legend items is prohibited. Not is for compatibility reason
    InteractiveDataDisplay.Legend = function (_plot, _jqdiv, isCompact, hasTooltip,isNotSortable) {
        // Inner legends for this legend.
        var plotLegends = [];
        var plotSubs = [];
        var divStyle = _jqdiv[0].style;
        var updateIsLegendInduced = false;
        var that = this;
        that.div = _jqdiv

        var _isVisible = true;
        Object.defineProperty(this, "isVisible", {
            get: function () { return _isVisible; },
            set: function (value) {
                _isVisible = value;
                if (_isVisible) divStyle.display = "block";
                else divStyle.display = "none";
            },
            configurable: false
        });

        Object.defineProperty(this, "Host", {
            get: function() { return _jqdiv }
        })

        if (isCompact) _jqdiv.addClass("idd-legend-compact");
        else _jqdiv.addClass("idd-legend");
        _jqdiv.addClass("unselectable");
        if (!isNotSortable) {
            _jqdiv.sortable({ axis: 'y' });
            _jqdiv.on("sortupdate", function (e, ui) {
                that.updateIsLegendInduced = true; // LM: items order is changed in the legend itself
                var movedPlot = ui.item.data('plot'); // LM: the plot which card was moved
                var targetIndex;
                var next_elem, prev_elem;
                $("li", _jqdiv).each(function (idx, el) {
                    if (movedPlot == $(el).data('plot')) {
                        targetIndex = idx;
                        prev_elem = ($(el)).prev().data('plot');
                        next_elem = ($(el).next()).data('plot');
                        return false;
                    }
                }); // found new index of moved element
                for (var i = 0; i < plotLegends.length; ++i) { // LM: for each item in the legend
                    if (plotLegends[i].plot == movedPlot) { // LM: find an index of the moved plot in the unchanged plotLegends object
                        if (next_elem) { // LM: next legend item exists 
                            for (var j = 0; j < plotLegends.length; ++j) {
                                if (plotLegends[j].plot == next_elem) { // LM: find an index of a next legend item in the unchanged plotLegends object
                                    movedPlot.updateOrder(plotLegends[j].plot);
                                    break;
                                }
                            }
                        }
                        else { // LM: legend item was moved to the end of the legend
                            for (var j = 0; j < plotLegends.length; ++j) {
                                if (plotLegends[j].plot == prev_elem) { // LM: find an index of a previous legend item in the unchanged plotLegends object
                                    movedPlot.updateOrder(plotLegends[j].plot, true);
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
                that.updateIsLegendInduced = false;
            });
        }

        var subscribeToChanges = function (plot) {
            plot.host.bind("visibleChanged", visibleChangedHandler);
            plot.host.bind("childrenChanged", childrenChangedHandler);
            plotSubs.push(plot);
        };

        var unsubscribeFromChanges = function (plot) {
            plot.host.unbind("visibleChanged", visibleChangedHandler);
            plot.host.unbind("childrenChanged", childrenChangedHandler);
            for (var i = 0; i < plotSubs.length; i++) {
                if (plotSubs[i] === plot) {
                    plotSubs.splice(i, 1);
                }
            }
        };

        var unsubscribeAll = function () {
            for (var i = 0; i < plotSubs.length; i++) {
                var plot = plotSubs[i];
                plot.host.unbind("visibleChanged", visibleChangedHandler);
                plot.host.unbind("childrenChanged", childrenChangedHandler);
            }
            plotSubs = [];
        }

        /// refills (clears & populates) legend
        var createLegend = function () {
            _jqdiv.empty();
            for (var i = 0, len = plotLegends.length; i < len; i++) {
                removeLegend(plotLegends[i]);
            }
            unsubscribeAll();
            plotLegends = [];
            var plots = InteractiveDataDisplay.Utils.enumPlots(_plot);
            for (var i = 0; i < plots.length; i++) {
                var p = plots[plots.length - i - 1];
                subscribeToChanges(p);
                createLegendForPlot(p);
            }
            if (_jqdiv[0].hasChildNodes() && _isVisible) {
                divStyle.display = "block";
            }
        };

        var addVisibilityCheckBox = function (div, plot) {
            var cbx = $("<div></div>").addClass("idd-legend-isselected-false").appendTo(div);
            if (plot.isErrorVisible) {
                cbx.attr("class", "idd-legend-isselected-error");
                cbx.attr("title", "The data can not be displayed.");
            }
            else {
                cbx.attr("title", "");
                if (plot.isVisible) cbx.attr("class", "idd-legend-isselected-false");
                else cbx.attr("class", "idd-legend-isselected-true");
                cbx.click(function (e) {
                    e.stopPropagation();
                    if (!plot.isErrorVisible) {
                        if (plot.isVisible) {
                            cbx.attr("class", "idd-legend-isselected-true");
                            plot.isVisible = false;
                        } else {
                            cbx.attr("class", "idd-legend-isselected-false");
                            plot.isVisible = true;
                        }
                    }
                });
            }
        };

        /// removes particular legend item from current legend
        var removeLegend = function (legend) {
            for (var i = 0; i < _plotLegends.length; i++) {
                if (_plotLegends[i] == legend) {
                    _plotLegends.splice(i, 1);
                    break;
                }
            }
        };

        var containsLegendFor = function (plot) {
            for (var i = 0, len = plotSubs.length; i < len; i++)
                if (plotSubs[i] === plot) return true;
            return false;
        }

        var childrenChangedHandler = function (event, params) {

            if(params !== undefined){
                if (params.type === "add" && _jqdiv[0].hasChildNodes() && params.plot.master == _plot.master) {
                    if (containsLegendFor(params.plot)) {
                        return;
                    }
                    subscribeToChanges(params.plot);
                    createLegendForPlot(params.plot);
                }
                else if (params.type === "remove") {
                    var removeLegendItem = function (i) {
                        var legend = plotLegends[i];
                        plotLegends.splice(i, 1);
                        removeLegend(legend);
                        if (legend.onLegendRemove) legend.onLegendRemove();
                        legend[0].innerHTML = "";
                        if (isCompact) legend.removeClass("idd-legend-item-compact");
                        else legend.removeClass("idd-legend-item");
                        _jqdiv[0].removeChild(legend[0]);
                        var childDivs = legend.plot.children;
                        childDivs.forEach(function (childPlot) {
                            for (var j = 0, len = plotLegends.length; j < len; j++)
                                if (plotLegends[j].plot === childPlot) {
                                    removeLegendItem(plotLegends[j]);
                                }
                        });
                        $(legend[0]).css("display", "none");
                        if (plotLegends.length == 0) divStyle.display = "none";
                    };

                    for (var i = 0, len = plotLegends.length; i < len; i++)
                        if (plotLegends[i].plot === params.plot) {
                            removeLegendItem(i);
                            break;
                        }
                    unsubscribeFromChanges(params.plot);
                }
                else {
                    _jqdiv[0].innerHTML = "";
                    divStyle.display = "none";
                    len = plotLegends.length;
                    for (i = 0; i < len; i++) {
                        removeLegend(plotLegends[i]);
                        if (plotLegends[i].onLegendRemove) plotLegends[i].onLegendRemove();
                        plotLegends[i][0].innerHTML = "";
                        if (isCompact) plotLegends[i].removeClass("idd-legend-item-compact");
                        else plotLegends[i].removeClass("idd-legend-item");
                    }
                    unsubscribeAll();
                    plotLegends = [];
                    createLegend();
                }
            }
        };
        var orderChangedHandler = function (event, params) {
            if (!that.updateIsLegendInduced)
                createLegend();
        };
        var plotRemovedHandler = function (event, params) {
            if (_plot == params) _jqdiv.remove();
        };
        var visibleChangedHandler = function (event, params) {
            var updateLegendItem = function (i, isVisible, isErrorVisible) {
                var legend = _plotLegends[i];
                if (isErrorVisible) {
                    legend[0].firstElementChild.lastElementChild.setAttribute("class", "idd-legend-isselected-error");
                    legend[0].firstElementChild.lastElementChild.setAttribute("title", "The data can not be displayed.");
                }
                else {
                    legend[0].firstElementChild.lastElementChild.setAttribute("title", "");
                    if (isVisible) legend[0].firstElementChild.lastElementChild.setAttribute("class", "idd-legend-isselected-false");
                    else legend[0].firstElementChild.lastElementChild.setAttribute("class", "idd-legend-isselected-true");
                }
            };

            for (var i = 0, len = _plotLegends.length; i < len; i++)
                if (_plotLegends[i].plot === params) {
                    updateLegendItem(i, params.isVisible, params.isErrorVisible);
                }
        };

        /// asks plot to generate legend item
        /// inserts it into current legend
        /// saves legend item (div) into plotLegends
        var createLegendForPlot = function (plot) {
            var legend = plot.getLegend();
            if (legend) {
                var div = (isCompact) ? $("<div class='idd-legend-item-compact'></div>") : $("<li class='idd-legend-item'></li>");
                if (!isCompact) div.data("plot", plot);
                var title = (isCompact) ? $("<div class='idd-legend-item-title-compact'></div>") : $("<div class='idd-legend-item-title'></div>");
                if (legend.legend && legend.legend.thumbnail)
                    if (isCompact) legend.legend.thumbnail.addClass("idd-legend-item-title-thumb-compact").appendTo(title);
                    else legend.legend.thumbnail.addClass("idd-legend-item-title-thumb").appendTo(title);
                if (isCompact) legend.name.addClass("idd-legend-item-title-name-compact").appendTo(title);
                else legend.name.addClass("idd-legend-item-title-name").appendTo(title);
                addVisibilityCheckBox(title, plot);
                title.appendTo(div);
                if (legend.legend && legend.legend.content)
                    if (isCompact) legend.legend.content.addClass("idd-legend-item-info-compact").appendTo(div);
                    else legend.legend.content.addClass("idd-legend-item-info").appendTo(div);

                if (hasTooltip) {
                    $(div).bind('mouseenter', function () {
                        var $this = $(this);
                        var legendname = isCompact ? $this.find(".idd-legend-item-title-name-compact") : $this.find(".idd-legend-item-title-name");
                        if (legendname[0].offsetWidth < legendname[0].scrollWidth && $this.attr('title') === undefined) {
                            $this.attr('title', legendname.text());
                        }
                    });
                }
                div.prependTo(_jqdiv);
                div.plot = plot;
                plotLegends[plotLegends.length] = div;
                _plotLegends[_plotLegends.length] = div;
                div.plot.updateOrder();
            }
        };

        this.remove = function () {
            for (var i = 0, len = plotLegends.length; i < len; i++) {
                removeLegend(plotLegends[i]);
                if (plotLegends[i].onLegendRemove) plotLegends[i].onLegendRemove();
                plotLegends[i][0].innerHTML = "";
                if (isCompact) plotLegends[i].removeClass("idd-legend-item-compact");
                else plotLegends[i].removeClass("idd-legend-item");
            }
            plotLegends = [];
            unsubscribeAll();
            var removeLegendForPlot = function (plot) {
                plot.host.unbind("visibleChanged", visibleChangedHandler);
                var childDivs = plot.children;
                childDivs.forEach(function (childPlot) {
                    removeLegendForPlot(childPlot);
                });
            };
            removeLegendForPlot(_plot);
            _jqdiv[0].innerHTML = "";
            if (isCompact) _jqdiv.removeClass("idd-legend-compact");
            else _jqdiv.removeClass("idd-legend");
            _jqdiv.removeClass("unselectable");
            _plot.host.unbind("plotRemoved", plotRemovedHandler);
            _plot.host.unbind("orderChanged", orderChangedHandler);
        };
        _plot.host.bind("plotRemoved", plotRemovedHandler);
        _plot.host.bind("orderChanged", orderChangedHandler);
        _jqdiv[0].legend = that
        createLegend();
        _jqdiv.dblclick(function (event) {
            event.stopImmediatePropagation();
        });
    };
    //--------------------------------------------------------------------------------------------
    // Transforms

    //Class for coordinate transform, cs is build from plot rect and screen size
    InteractiveDataDisplay.CoordinateTransform = function (plotRect, screenRect, aspectRatio) {
        var offsetX = 0;
        var offsetY = 0;
        var scaleX = 1;
        var scaleY = 1;

        if (plotRect !== undefined && screenRect !== undefined) {
            //Perform Fit ...
            scaleX = screenRect.width / plotRect.width;
            scaleY = screenRect.height / plotRect.height;

            if (aspectRatio !== undefined && aspectRatio > 0) {
                if (aspectRatio * scaleY < scaleX)
                    scaleX = aspectRatio * scaleY;
                else
                    scaleY = scaleX / aspectRatio;
            }

            offsetX = screenRect.left - scaleX * plotRect.x;
            offsetY = screenRect.height + screenRect.top + scaleY * plotRect.y;
        }

        this.plotToScreenX = function (x) {
            return x * scaleX + offsetX;
        };

        this.plotToScreenY = function (y) {
            return offsetY - y * scaleY;
        };

        this.screenToPlotX = function (left) {
            return (left - offsetX) / scaleX;
        };

        this.screenToPlotY = function (top) {
            return (offsetY - top) / scaleY;
        };

        this.plotToScreenWidth = function (x) {
            return x * scaleX;
        };

        this.plotToScreenHeight = function (y) {
            return y * scaleY;
        };

        this.screenToPlotWidth = function (left) {
            return left / scaleX;
        };

        this.screenToPlotHeight = function (top) {
            return top / scaleY;
        };


        // Builds plot rectangle for the given screen rectangle
        // as {x,y,width,height}, where x,y are left/top of the rectangle.
        this.getPlotRect = function (screenRect) {
            var x = this.screenToPlotX(screenRect.x);
            var y = this.screenToPlotY(screenRect.height + screenRect.y);
            return {
                x: x,
                y: y,
                width: this.screenToPlotX(screenRect.x + screenRect.width) - x,
                height: this.screenToPlotY(screenRect.y) - y
            };
        };

        this.getScale = function () {
            return {
                x: scaleX,
                y: scaleY
            };
        };

        this.getOffset = function () {
            return {
                x: offsetX,
                y: offsetY
            };
        };

        this.clone = function () {
            var cloneTransform = new InteractiveDataDisplay.CoordinateTransform();
            cloneTransform.plotToScreenX = this.plotToScreenX;
            cloneTransform.plotToScreenY = this.plotToScreenY;
            cloneTransform.screenToPlotX = this.screenToPlotX;
            cloneTransform.screenToPlotY = this.screenToPlotY;

            cloneTransform.plotToScreenWidth = this.plotToScreenWidth;
            cloneTransform.plotToScreenHeight = this.plotToScreenHeight;
            cloneTransform.screenToPlotWidth = this.screenToPlotWidth;
            cloneTransform.screenToPlotHeight = this.screenToPlotHeight;

            cloneTransform.getPlotRect = this.getPlotRect;
            cloneTransform.getScale = this.getScale;
            cloneTransform.getOffset = this.getOffset;
            return cloneTransform;
        };
    };


    //-------------------------------------------------------------------------------------
    // Plots

    // Base class for plots rendering on a private canvas.
    InteractiveDataDisplay.CanvasPlot = function (div, master) {
        this.base = InteractiveDataDisplay.Plot;
        this.base(div, master);
        if (!div) return;

        var _canvas;
        var destroySharedCanvas = function () {
            if (master._sharedCanvas) {
                master._sharedCanvas.remove();
                master._sharedCanvas = undefined;
            }
        };

        this.getContext = function (doClear) {
            var canvas;
            var master = this.master;
            if (master.flatRendering) { // shared canvas
                canvas = master._sharedCanvas;
                doClear = master._sharedCanvas._dirty && doClear;
                master._sharedCanvas._dirty = false;
            } else { // individual canvas
                canvas = _canvas;
            }
            if (canvas === undefined) return;
            var context = canvas[0].getContext("2d");
            if (doClear) {
                var size = this.screenSize;
                context.clearRect(0, 0, size.width, size.height);
            }
            return context;
        };

        this.destroy = function () {
            InteractiveDataDisplay.CanvasPlot.prototype.destroy.call(this);
            this.host.children(".idd-plot-canvas").remove();
            destroySharedCanvas();
            return this;
        };


        this.arrange = function (finalRect) {
            InteractiveDataDisplay.CanvasPlot.prototype.arrange.call(this, finalRect);

            var canvas;
            var master = this.master;
            if (master.flatRendering) { // shared canvas                
                if (!master._sharedCanvas) { // i'm first who renders in the flat mode!
                    // let's use my canvas for everybody
                    if (_canvas) {
                        canvas = _canvas;
                        _canvas = undefined;
                    } else {
                        canvas = $("<canvas></canvas>")
                            .prependTo(this.host)
                            .addClass("idd-plot-canvas");
                    }
                    master._sharedCanvas = canvas;
                    master._sharedCanvas._dirty = false;
                } else {
                    canvas = master._sharedCanvas;
                }
                if (_canvas) { // removing canvas if just switched to flat mode
                    _canvas.remove();
                    _canvas = undefined;
                }
            } else { // individual canvas
                if (master._sharedCanvas) { // switched to individual mode                
                    destroySharedCanvas();
                }
                if (!_canvas) {
                    _canvas = $("<canvas></canvas>")
                        .prependTo(this.host)
                        .addClass("idd-plot-canvas");
                }
                canvas = _canvas;
            }

            var c = canvas[0];
            c.width = finalRect.width;
            c.height = finalRect.height;
        };

        // Gets transform functions from data to screen coordinates, from plot to screen coords
        // Returns { dataToScreenX, dataToScreenY, plotToScreenX, plotToScreenY}
        this.getTransform = function () {
            var ct = this.coordinateTransform;
            var plotToScreenX = ct.plotToScreenX;
            var plotToScreenY = ct.plotToScreenY;
            var dataToPlotX = this.xDataTransform && this.xDataTransform.dataToPlot;
            var dataToPlotY = this.yDataTransform && this.yDataTransform.dataToPlot;
            var dataToScreenX = dataToPlotX ? function (x) { return plotToScreenX(dataToPlotX(x)); } : plotToScreenX;
            var dataToScreenY = dataToPlotY ? function (y) { return plotToScreenY(dataToPlotY(y)); } : plotToScreenY;

            return {
                dataToScreenX: dataToScreenX, dataToScreenY: dataToScreenY,
                dataToPlotX: dataToPlotX, dataToPlotY: dataToPlotY,
                plotToScreenX: plotToScreenX,  plotToScreenY: plotToScreenY
            };
        };

        // Gets the transform functions from screen to data coordinates.
        // Returns { screenToDataX, screenToDataY }
        this.getScreenToDataTransform = function () {
            var ct = this.coordinateTransform;
            var screenToPlotX = ct.screenToPlotX;
            var screenToPlotY = ct.screenToPlotY;
            var plotToDataX = this.xDataTransform && this.xDataTransform.plotToData;
            var plotToDataY = this.yDataTransform && this.yDataTransform.plotToData;
            var screenToDataX = plotToDataX ? function (x) { return plotToDataX(screenToPlotX(x)); } : screenToPlotX;
            var screenToDataY = plotToDataY ? function (y) { return plotToDataY(screenToPlotY(y)); } : screenToPlotY;

            return { screenToDataX: screenToDataX, screenToDataY: screenToDataY };
        };
    };
    InteractiveDataDisplay.CanvasPlot.prototype = new InteractiveDataDisplay.Plot();


    // Renders a function y=f(x) as a polyline.
    InteractiveDataDisplay.Polyline = function (div, master) {
        var that = this;
        // Initialization (#1)
        var initializer = InteractiveDataDisplay.Utils.getDataSourceFunction(div, InteractiveDataDisplay.readCsv);
        var initialData = initializer(div);

        this.base = InteractiveDataDisplay.CanvasPlot;
        this.base(div, master);

        var _y;
        var _x;
        var _y_u68, _y_l68, _y_u95, _y_l95;
        var _fill68 = 'blue';
        var _fill95 = 'pink';
        var _thickness = 1;
        var _stroke = '#4169ed';
        var _lineCap = 'butt';
        var _lineJoin = 'miter';

        // default styles:
        if (initialData) {
            _thickness = typeof initialData.thickness != "undefined" ? initialData.thickness : _thickness;
            _stroke = typeof initialData.stroke != "undefined" ? initialData.stroke : _stroke;
            _lineCap = typeof initialData.lineCap != "undefined" ? initialData.lineCap : _lineCap;
            _lineJoin = typeof initialData.lineJoin != "undefined" ? initialData.lineJoin : _lineJoin;
            _fill68 = typeof initialData.fill68 != "undefined" ? initialData.fill68 : _fill68;
            _fill95 = typeof initialData.fill95 != "undefined" ? initialData.fill95 : _fill95;
        }

        this.draw = function (data) {
            var y = data.y.median ? data.y.median : data.y;
            if (!y) throw "Data series y is undefined";
            var n = y.length;

            if (!data.x) {
                data.x = InteractiveDataDisplay.Utils.range(0, n - 1);
            }
            if (n != data.x.length) throw "Data series x and y have different lengths";
            _y = y;
            _x = data.x;

            var y_u68 = data.y.upper68;
            if (y_u68 && y_u68.length !== n)
                throw "Data series y_u68 and y_median have different lengths";

            var y_l68 = data.y.lower68;
            if (y_l68 && y_l68.length !== n)
                throw "Data series y_l68 and y_median have different lengths";

            var y_u95 = data.y.upper95;
            if (y_u95 && y_u95.length !== n)
                throw "Data series y_u95 and y_median have different lengths";

            var y_l95 = data.y.lower95;
            if (y_l95 && y_l95.length !== n)
                throw "Data series y_l95 and y_median have different lengths";

            _y_u68 = y_u68;
            _y_l68 = y_l68;
            _y_u95 = y_u95;
            _y_l95 = y_l95;

            //sort
            var doSort = (data.treatAs && data.treatAs == "function") && !InteractiveDataDisplay.Utils.isOrderedArray(_x);
            if (InteractiveDataDisplay.Utils.isArray(data.y)) { // certain values
                _y = y;
                if (doSort) {
                    var len = Math.min(_x.length, y.length);
                    _y = InteractiveDataDisplay.Utils.cutArray(y, len);
                    _x = InteractiveDataDisplay.Utils.cutArray(_x, len);
                    if (doSort) {
                        var forSort = [];
                        for (var i = 0; i < len; i++)
                            if (!isNaN(_x[i])) {
                                forSort.push({
                                    x: _x[i],
                                    y: _y[i],
                                });
                            }
                        forSort.sort(function (a, b) { return a.x - b.x; });
                        _y = [];
                        _x = [];
                        for (var i = 0; i < forSort.length; i++) {
                            _y.push(forSort[i].y);
                            _x.push(forSort[i].x);
                        }
                    }
                }
            } else { // uncertain values
                var y = data.y;
                var len = Math.min(_x.length, y.median.length);
                if (y.upper68 && y.lower68) len = Math.min(len, Math.min(y.upper68.length, y.lower68.length));
                if (y.upper95 && y.lower95) len = Math.min(len, Math.min(y.upper95.length, y.lower95.length));
                _y = InteractiveDataDisplay.Utils.cutArray(y.median, len);
                _y_u68 = InteractiveDataDisplay.Utils.cutArray(y.upper68, len);
                _y_l68 = InteractiveDataDisplay.Utils.cutArray(y.lower68, len);
                _y_u95 = InteractiveDataDisplay.Utils.cutArray(y.upper95, len);
                _y_l95 = InteractiveDataDisplay.Utils.cutArray(y.lower95, len);
                _x = InteractiveDataDisplay.Utils.cutArray(_x, len);
                if (doSort) {
                    var forSort = [];
                    for (var i = 0; i < len; i++) {
                        if (!isNaN(_x[i])) {
                            forSort.push({
                                x: _x[i],
                                y: _y[i],
                                y_u68: _y_u68[i],
                                y_l68: _y_l68[i],
                                y_u95: _y_u95[i],
                                y_l95: _y_l95[i]
                            });
                        }
                    }
                    forSort.sort(function (a, b) { return a.x - b.x; });
                    _y = [];
                    _y_u68 = [];
                    _y_l68 = [];
                    _y_u95 = [];
                    _y_l95 = [];
                    _x = [];
                    for (var i = 0; i < forSort.length; i++) {
                        _y.push(forSort[i].y);
                        _y_u68.push(forSort[i].y_u68);
                        _y_l68.push(forSort[i].y_l68);
                        _y_u95.push(forSort[i].y_u95);
                        _y_l95.push(forSort[i].y_l95);
                        _x.push(forSort[i].x);
                    }
                }
            }

            // styles:
            _thickness = typeof data.thickness != "undefined" ? data.thickness : _thickness;
            if (typeof (_thickness) != "number")
                _thickness = parseFloat(_thickness) || 1;
            _stroke = typeof data.stroke != "undefined" ? data.stroke : _stroke;
            _lineCap = typeof data.lineCap != "undefined" ? data.lineCap : _lineCap;
            _lineJoin = typeof data.lineJoin != "undefined" ? data.lineJoin : _lineJoin;
            _fill68 = typeof data.fill68 != "undefined" ? data.fill68 : _fill68;
            _fill95 = typeof data.fill95 != "undefined" ? data.fill95 : _fill95;

            this.invalidateLocalBounds();

            this.requestNextFrameOrUpdate();
            this.fireAppearanceChanged();
        };

        // Returns a rectangle in the plot plane.
        this.computeLocalBounds = function (step, computedBounds) {
            var dataToPlotX = this.xDataTransform && this.xDataTransform.dataToPlot;
            var dataToPlotY = this.yDataTransform && this.yDataTransform.dataToPlot;

            var mean = InteractiveDataDisplay.Utils.getBoundingBoxForArrays(_x, _y, dataToPlotX, dataToPlotY);
            var u68 = InteractiveDataDisplay.Utils.getBoundingBoxForArrays(_x, _y_u68, dataToPlotX, dataToPlotY);
            var l68 = InteractiveDataDisplay.Utils.getBoundingBoxForArrays(_x, _y_l68, dataToPlotX, dataToPlotY);
            var u95 = InteractiveDataDisplay.Utils.getBoundingBoxForArrays(_x, _y_u95, dataToPlotX, dataToPlotY);
            var l95 = InteractiveDataDisplay.Utils.getBoundingBoxForArrays(_x, _y_l95, dataToPlotX, dataToPlotY);

            return InteractiveDataDisplay.Utils.unionRects(mean, InteractiveDataDisplay.Utils.unionRects(u68, InteractiveDataDisplay.Utils.unionRects(l68, InteractiveDataDisplay.Utils.unionRects(u95, l95))));

        };

        // Returns 4 margins in the screen coordinate system
        this.getLocalPadding = function () {
            return { left: 0, right: 0, top: 0, bottom: 0 };
        };

        this.getTooltip = function (xd, yd, px, py) {
            if (_x === undefined || _y == undefined)
                return;
            var n = _y.length;
            if (n == 0) return;

            if (!this.isVisible) return;
            var context = this.getContext(false);
            if (context === undefined) return;
            var t = this.getTransform();
            var ps = { x: t.dataToScreenX(xd), y: t.dataToScreenY(yd) };

            var myImageData = context.getImageData(ps.x - 1, ps.y - 1, 3, 3);
            var zeroPixels = 0;
            for (var k = 0; k < myImageData.data.length; k++) {
                if (myImageData.data[k] === 0) zeroPixels++;
            }
            if (zeroPixels === myImageData.data.length) return undefined;

            var $toolTip = $("<div></div>")
            $("<div></div>").addClass('idd-tooltip-name').text((this.name || "polyline")).appendTo($toolTip);
            return $toolTip;
        };
        var renderLine = function (_x, _y, _stroke, _thickness, plotRect, screenSize, context) {
            if (_x === undefined || _y == undefined)
                return;
            var n = _y.length;
            if (n == 0) return;

            var t = that.getTransform();
            var dataToScreenX = t.dataToScreenX;
            var dataToScreenY = t.dataToScreenY;

            // size of the canvas
            var w_s = screenSize.width;
            var h_s = screenSize.height;
            var xmin = 0, xmax = w_s;
            var ymin = 0, ymax = h_s;

            context.globalAlpha = 1.0;
            context.strokeStyle = _stroke;
            context.fillStyle = _stroke; // for single points surrounded with missing values
            context.lineWidth = _thickness;
            context.lineCap = _lineCap;
            context.lineJoin = _lineJoin;

            context.beginPath();
            var x1, x2, y1, y2;
            var i = 0;

            // Looking for non-missing value
            var nextValuePoint = function () {
                for (; i < n; i++) {
                    if (isNaN(_x[i]) || isNaN(_y[i])) continue; // missing value
                    x1 = dataToScreenX(_x[i]);
                    y1 = dataToScreenY(_y[i]);
                    c1 = code(x1, y1, xmin, xmax, ymin, ymax);
                    break;
                }
                if (c1 == 0) // point is inside visible rect 
                    context.moveTo(x1, y1);
            };
            nextValuePoint();

            var c1, c2, c1_, c2_;
            var dx, dy;
            var x2_, y2_;
            var m = 1; // number of points for the current batch
            for (i++; i < n; i++) {
                if (isNaN(_x[i]) || isNaN(_y[i])) // missing value
                {
                    if (m == 1) { // single point surrounded by missing values
                        context.stroke(); // finishing previous segment (it is broken by missing value)
                        var c = code(x1, y1, xmin, xmax, ymin, ymax);
                        if (c == 0) {
                            context.beginPath();
                            context.arc(x1, y1, _thickness / 2, 0, 2 * Math.PI);
                            context.fill();
                        }
                    } else {
                        context.stroke(); // finishing previous segment (it is broken by missing value)
                    }
                    context.beginPath();
                    i++;
                    nextValuePoint();
                    m = 1;
                    continue;
                }

                x2_ = x2 = dataToScreenX(_x[i]);
                y2_ = y2 = dataToScreenY(_y[i]);
                if (Math.abs(x1 - x2) < 1 && Math.abs(y1 - y2) < 1) continue;

                // Clipping and drawing segment p1 - p2:
                c1_ = c1;
                c2_ = c2 = code(x2, y2, xmin, xmax, ymin, ymax);

                while (c1 | c2) {
                    if (c1 & c2) break; // segment is invisible
                    dx = x2 - x1;
                    dy = y2 - y1;
                    if (c1) {
                        if (x1 < xmin) { y1 += dy * (xmin - x1) / dx; x1 = xmin; }
                        else if (x1 > xmax) { y1 += dy * (xmax - x1) / dx; x1 = xmax; }
                        else if (y1 < ymin) { x1 += dx * (ymin - y1) / dy; y1 = ymin; }
                        else if (y1 > ymax) { x1 += dx * (ymax - y1) / dy; y1 = ymax; }
                        c1 = code(x1, y1, xmin, xmax, ymin, ymax);
                    } else {
                        if (x2 < xmin) { y2 += dy * (xmin - x2) / dx; x2 = xmin; }
                        else if (x2 > xmax) { y2 += dy * (xmax - x2) / dx; x2 = xmax; }
                        else if (y2 < ymin) { x2 += dx * (ymin - y2) / dy; y2 = ymin; }
                        else if (y2 > ymax) { x2 += dx * (ymax - y2) / dy; y2 = ymax; }
                        c2 = code(x2, y2, xmin, xmax, ymin, ymax);
                    }
                }
                if (!(c1 & c2)) {
                    if (c1_ != 0) // point wasn't visible
                        context.moveTo(x1, y1);
                    context.lineTo(x2, y2);
                    m++;
                }

                x1 = x2_;
                y1 = y2_;
                c1 = c2_;
            }

            // Final stroke
            if (m == 1) { // single point surrounded by missing values
                context.stroke(); // finishing previous segment (it is broken by missing value)
                var c = code(x1, y1, xmin, xmax, ymin, ymax);
                if (c == 0) {
                    context.beginPath();
                    context.arc(x1, y1, _thickness / 2, 0, 2 * Math.PI);
                    context.fill();
                }
            } else {
                context.stroke(); // finishing previous segment (it is broken by missing value)
            }
        }
        this.renderCore = function (plotRect, screenSize) {
            InteractiveDataDisplay.Polyline.prototype.renderCore.call(this, plotRect, screenSize);

            var context = this.getContext(true);
            InteractiveDataDisplay.Area.render.call(this, _x, _y_l95, _y_u95, _fill95, plotRect, screenSize, context, 0.5);
            InteractiveDataDisplay.Area.render.call(this, _x, _y_l68, _y_u68, _fill68, plotRect, screenSize, context, 0.5);
            renderLine(_x, _y, _stroke, _thickness, plotRect, screenSize, context);
        };
        var renderLineSvg = function (plotRect, screenSize, svg) {
            if (_x === undefined || _y == undefined) return;
            var n = _y.length;
            if (n == 0) return;

            var t = that.getTransform();
            var dataToScreenX = t.dataToScreenX;
            var dataToScreenY = t.dataToScreenY;

            // size of the canvas
            var w_s = screenSize.width;
            var h_s = screenSize.height;
            var xmin = 0, xmax = w_s;
            var ymin = 0, ymax = h_s;

            var x1, x2, y1, y2;
            var i = 0;

            var segment;

            var strokeRgba = InteractiveDataDisplay.ColorPalette.colorFromString(_stroke)
            var strokeColor = 'rgb('+strokeRgba.r+','+strokeRgba.g+','+strokeRgba.b+')'
    


            var drawSegment = function () {
                svg.polyline(segment).style({ fill: "none", stroke: strokeColor, "stroke-width": _thickness, 'stroke-opacity':strokeRgba.a });
            }
            // Looking for non-missing value
            var nextValuePoint = function () {
                segment = new Array(0);
                for (; i < n; i++) {
                    if (isNaN(_x[i]) || isNaN(_y[i])) continue; // missing value
                    x1 = dataToScreenX(_x[i]);
                    y1 = dataToScreenY(_y[i]);
                    c1 = code(x1, y1, xmin, xmax, ymin, ymax);
                    break;
                }
                if (c1 == 0) // point is inside visible rect 
                    segment.push([x1, y1]);
            };
            nextValuePoint();

            var c1, c2, c1_, c2_;
            var dx, dy;
            var x2_, y2_;
            var m = 1; // number of points for the current batch
            for (i++; i < n; i++) {
                if (isNaN(_x[i]) || isNaN(_y[i])) // missing value
                {
                    if (m == 1) { // single point surrounded by missing values
                        drawSegment(); // finishing previous segment (it is broken by missing value)
                        var c = code(x1, y1, xmin, xmax, ymin, ymax);
                        if (c == 0) {
                            context.beginPath();
                            context.arc(x1, y1, _thickness / 2, 0, 2 * Math.PI);
                            context.fill();
                        }
                    } else {
                        drawSegment(); // finishing previous segment (it is broken by missing value)
                    }
                    i++;
                    nextValuePoint();
                    m = 1;
                    continue;
                }

                x2_ = x2 = dataToScreenX(_x[i]);
                y2_ = y2 = dataToScreenY(_y[i]);
                if (Math.abs(x1 - x2) < 1 && Math.abs(y1 - y2) < 1) continue;

                // Clipping and drawing segment p1 - p2:
                c1_ = c1;
                c2_ = c2 = code(x2, y2, xmin, xmax, ymin, ymax);

                while (c1 | c2) {
                    if (c1 & c2) break; // segment is invisible
                    dx = x2 - x1;
                    dy = y2 - y1;
                    if (c1) {
                        if (x1 < xmin) { y1 += dy * (xmin - x1) / dx; x1 = xmin; }
                        else if (x1 > xmax) { y1 += dy * (xmax - x1) / dx; x1 = xmax; }
                        else if (y1 < ymin) { x1 += dx * (ymin - y1) / dy; y1 = ymin; }
                        else if (y1 > ymax) { x1 += dx * (ymax - y1) / dy; y1 = ymax; }
                        c1 = code(x1, y1, xmin, xmax, ymin, ymax);
                    } else {
                        if (x2 < xmin) { y2 += dy * (xmin - x2) / dx; x2 = xmin; }
                        else if (x2 > xmax) { y2 += dy * (xmax - x2) / dx; x2 = xmax; }
                        else if (y2 < ymin) { x2 += dx * (ymin - y2) / dy; y2 = ymin; }
                        else if (y2 > ymax) { x2 += dx * (ymax - y2) / dy; y2 = ymax; }
                        c2 = code(x2, y2, xmin, xmax, ymin, ymax);
                    }
                }
                if (!(c1 & c2)) {
                    if (c1_ != 0) { // point wasn't visible
                        drawSegment();
                        segment = new Array(0);
                        segment.push([x1, y1]);
                    }
                    segment.push([x2, y2]);
                    m++;
                }

                x1 = x2_;
                y1 = y2_;
                c1 = c2_;
            }

            // Final stroke
            if (m == 1) { // single point surrounded by missing values
                drawSegment(); // finishing previous segment (it is broken by missing value)
                var c = code(x1, y1, xmin, xmax, ymin, ymax);
                if (c == 0) {
                    svg.circle(_thickness).translate(x1, y1).fill(strokeColor).opacity(strokeRgba.a);
                }
            } else {
                drawSegment(); // finishing previous segment (it is broken by missing value)
            }
        }
        this.renderCoreSvg = function (plotRect, screenSize, svg) {
            InteractiveDataDisplay.Area.renderSvg.call(this, plotRect, screenSize, svg, _x, _y_l95, _y_u95, _fill95);
            InteractiveDataDisplay.Area.renderSvg.call(this, plotRect, screenSize, svg, _x, _y_l68, _y_u68, _fill68);
            renderLineSvg(plotRect, screenSize, svg);
        };

        // Clipping algorithms
        var code = function (x, y, xmin, xmax, ymin, ymax) {
            return (x < xmin) << 3 | (x > xmax) << 2 | (y < ymin) << 1 | (y > ymax);
        };


        // Others
        this.onDataTransformChanged = function (arg) {
            this.invalidateLocalBounds();
            InteractiveDataDisplay.Polyline.prototype.onDataTransformChanged.call(this, arg);
        };

        Object.defineProperty(this, "thickness", {
            get: function () { return _thickness; },
            set: function (value) {
                if (value == _thickness) return;
                if (value <= 0) throw "Polyline thickness must be positive";
                _thickness = value;

                this.fireAppearanceChanged("thickness");
                this.requestNextFrameOrUpdate();
            },
            configurable: false
        });

        Object.defineProperty(this, "stroke", {
            get: function () { return _stroke; },
            set: function (value) {
                if (value == _stroke) return;
                _stroke = value;

                this.fireAppearanceChanged("stroke");
                this.requestNextFrameOrUpdate();
            },
            configurable: false
        });

        Object.defineProperty(this, "lineCap", {
            get: function () { return _lineCap; },
            set: function (value) {
                if (value == _lineCap) return;
                _lineCap = value;

                this.fireAppearanceChanged("lineCap");
                this.requestNextFrameOrUpdate();
            },
            configurable: false
        });

        Object.defineProperty(this, "lineJoin", {
            get: function () { return _lineJoin; },
            set: function (value) {
                if (value == _lineJoin) return;
                _lineJoin = value;

                this.fireAppearanceChanged("lineJoin");
                this.requestNextFrameOrUpdate();
            },
            configurable: false
        });

        Object.defineProperty(this, "fill68", {
            get: function () { return _fill68; },
            set: function (value) {
                if (value == _fill68) return;
                _fill68 = value;

                this.fireAppearanceChanged("fill68");
                this.requestNextFrameOrUpdate();
            },
            configurable: false
        });

        Object.defineProperty(this, "fill95", {
            get: function () { return _fill95; },
            set: function (value) {
                if (value == _fill95) return;
                _fill95 = value;

                this.fireAppearanceChanged("fill95");
                this.requestNextFrameOrUpdate();
            },
            configurable: false
        });
        this.getLegend = function () {
            var canvas = $("<canvas></canvas>");

            canvas[0].width = 40;
            canvas[0].height = 40;
            var ctx = canvas.get(0).getContext("2d");
            var isUncertainData95 = _y_u95 != undefined && _y_l95 != undefined;
            var isUncertainData68 = _y_u68 != undefined && _y_l68 != undefined;
            if (isUncertainData95) {
                ctx.globalAlpha = 0.5;
                ctx.strokeStyle = _fill95;
                ctx.fillStyle = _fill95;

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, 20);
                ctx.lineTo(20, 40);
                ctx.lineTo(40, 40);
                ctx.lineTo(40, 20);
                ctx.lineTo(20, 0);
                ctx.lineTo(0, 0);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
            if (isUncertainData68) {
                ctx.globalAlpha = 0.5;
                ctx.strokeStyle = _fill68;
                ctx.fillStyle = _fill68;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, 10);
                ctx.lineTo(30, 40);
                ctx.lineTo(40, 40);
                ctx.lineTo(40, 30);
                ctx.lineTo(10, 0);
                ctx.lineTo(0, 0);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
            ctx.strokeStyle = _stroke;
            ctx.lineWidth = _thickness;
            ctx.moveTo(0, 0);
            ctx.lineTo(40, 40);
            ctx.stroke();

            var that = this;
            var nameDiv = $("<span></span>");
            var setName = function () {
                nameDiv.text(that.name);
            }
            setName();

            this.host.bind("appearanceChanged",
                function (event, propertyName) {
                    if (!propertyName || propertyName == "name")
                        setName();

                    ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
                    var isUncertainData95 = _y_u95 != undefined && _y_l95 != undefined;
                    var isUncertainData68 = _y_u68 != undefined && _y_l68 != undefined;
                    if (isUncertainData95) {
                        ctx.globalAlpha = 0.5;
                        ctx.strokeStyle = _fill95;
                        ctx.fillStyle = _fill95;

                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(0, 20);
                        ctx.lineTo(20, 40);
                        ctx.lineTo(40, 40);
                        ctx.lineTo(40, 20);
                        ctx.lineTo(20, 0);
                        ctx.lineTo(0, 0);
                        ctx.fill();
                        ctx.stroke();
                        ctx.closePath();
                    }
                    if (isUncertainData68) {
                        ctx.globalAlpha = 0.5;
                        ctx.strokeStyle = _fill68;
                        ctx.fillStyle = _fill68;
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(0, 10);
                        ctx.lineTo(30, 40);
                        ctx.lineTo(40, 40);
                        ctx.lineTo(40, 30);
                        ctx.lineTo(10, 0);
                        ctx.lineTo(0, 0);
                        ctx.fill();
                        ctx.stroke();
                        ctx.closePath();
                    }
                    ctx.strokeStyle = _stroke;
                    ctx.lineWidth = _thickness;
                    ctx.moveTo(0, 0);
                    ctx.lineTo(40, 40);
                    ctx.stroke();
                });

            var that = this;

            var onLegendRemove = function () {
                that.host.unbind("appearanceChanged");

            };

            return { name: nameDiv, legend: { thumbnail: canvas, content: undefined }, onLegendRemove: onLegendRemove };
        };

        this.buildSvgLegend = function (legendSettings, svg) {
            var that = this;
            legendSettings.height = 30;
            svg.add(svg.rect(legendSettings.width, legendSettings.height).fill("white").opacity(0.5));
            var isUncertainData95 = _y_u95 != undefined && _y_l95 != undefined;
            var isUncertainData68 = _y_u68 != undefined && _y_l68 != undefined;

            var strokeRgba = InteractiveDataDisplay.ColorPalette.colorFromString(_stroke)
            var strokeColor = 'rgb('+strokeRgba.r+','+strokeRgba.g+','+strokeRgba.b+')'

            var fill95Rgba = InteractiveDataDisplay.ColorPalette.colorFromString(_fill95)
            var fill95Color = 'rgb('+fill95Rgba.r+','+fill95Rgba.g+','+fill95Rgba.b+')'

            var fill68Rgba = InteractiveDataDisplay.ColorPalette.colorFromString(_fill68)
            var fill68Color = 'rgb('+fill68Rgba.r+','+fill68Rgba.g+','+fill68Rgba.b+')'

            if (isUncertainData95) svg.add(svg.polyline([[0, 0], [0, 9], [9, 18], [18, 18], [18, 9], [9, 0], [0, 0]]).fill(fill95Color).opacity(fill95Rgba.a).translate(5, 5));
            if (isUncertainData68) svg.add(svg.polyline([[0, 0], [0, 4.5], [13.5, 18], [18, 18], [18, 13.5], [4.5, 0], [0, 0]]).fill(fill68Color).opacity(fill68Rgba.a).translate(5, 5));
            svg.add(svg.line(0, 0, 18, 18).stroke({ width: _thickness, color: strokeColor }).translate(5, 5));
            var style = window.getComputedStyle(legendSettings.legendDiv.children[0].children[1], null);
            var fontSize = parseFloat(style.getPropertyValue('font-size'));
            var fontFamily = style.getPropertyValue('font-family');
            var fontWeight = style ? style.getPropertyValue('font-weight') : undefined;
            svg.add(svg.text(that.name).font({ family: fontFamily, size: fontSize, weight: fontWeight }).translate(40, 0));
            svg.front();
        }
        // Initialization 
        if (initialData && typeof initialData.y != 'undefined')
            this.draw(initialData);
    }
    InteractiveDataDisplay.Polyline.prototype = new InteractiveDataDisplay.CanvasPlot;



    // Renders set of DOM elements in the data space of this plot
    var plotClickEvent = jQuery.Event("plotClick");
    InteractiveDataDisplay.DOMPlot = function (host, master) {
        this.base = InteractiveDataDisplay.Plot;
        this.base(host, master);
        // array of DOM elements located in the data space of this plot
        var domElements = [];
        var that = this;
        var addElement = function (jqElem, scaleMode, xld, ytd, wd, hd, ox, oy) {
            if (jqElem[0].tagName.toLowerCase() !== "div") throw "DOMPlot supports only DIV elements";
            jqElem._x = xld;
            jqElem._y = ytd;
            jqElem._width = wd && wd > 0 ? wd : 1;
            jqElem._height = hd && hd > 0 ? hd : 1;
            jqElem._originX = ox || 0;
            jqElem._originY = oy || 0;
            jqElem._scale = scaleMode || 'element';

            var updateElement = function (elt) {
                // transformations
                var screenToPlotX = that.coordinateTransform.screenToPlotX;
                var screenToPlotY = that.coordinateTransform.screenToPlotY;
                var plotToDataX = that.xDataTransform && that.xDataTransform.plotToData;
                var plotToDataY = that.yDataTransform && that.yDataTransform.plotToData;
                var screenToDataX = plotToDataX ? function (x) { return plotToDataX(screenToPlotX(x)) } : screenToPlotX;
                var screenToDataY = plotToDataY ? function (y) { return plotToDataY(screenToPlotY(y)) } : screenToPlotY;

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

            jqElem.addClass("idd-dom-marker");
            jqElem.css('display', 'none').css('z-index', InteractiveDataDisplay.ZIndexDOMMarkers);
            domElements.push(jqElem);
        };

        // todo: limit type of children
        host.children("div[data-idd-position]")
            .each(function () {
                var jqElem = $(this); // refers the child DIV

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
        }

        // Returns a rectangle in the plot plane.
        this.computeLocalBounds = function () {
            var _bbox;
            if (domElements) {
                var n = domElements.length;
                if (n > 0) {
                    var _x = [], _y = [];
                    for (var i = 0, j = 0; i < n; i++ , j++) {
                        var el = domElements[i];
                        if (el._scale != 'none') {
                            var pos = getPosition(el);
                            _x[j] = pos.left;
                            _y[j] = pos.top;
                            _x[++j] = pos.left + el._width;
                            _y[j] = pos.top - el._height;
                        }
                    }
                    var xrange = InteractiveDataDisplay.Utils.getMinMax(_x);
                    var yrange = InteractiveDataDisplay.Utils.getMinMax(_y);

                    if (xrange && yrange) {
                        var dataToPlotX = this.xDataTransform && this.xDataTransform.dataToPlot;
                        var dataToPlotY = this.yDataTransform && this.yDataTransform.dataToPlot;
                        if (dataToPlotX) {
                            xrange.min = dataToPlotX(xrange.min);
                            xrange.max = dataToPlotX(xrange.max);
                        }
                        if (dataToPlotY) {
                            yrange.min = dataToPlotY(yrange.min);
                            yrange.max = dataToPlotY(yrange.max);
                        }
                        _bbox = { x: xrange.min, y: yrange.min, width: xrange.max - xrange.min, height: yrange.max - yrange.min };
                    };
                }
            }
            return _bbox;
        }

        // Returns 4 margins in the screen coordinate system
        this.getLocalPadding = function () {
            var padding = 0;
            return { left: padding, right: padding, top: padding, bottom: padding };
        }

        this.arrange = function (finalRect) {
            InteractiveDataDisplay.CanvasPlot.prototype.arrange.call(this, finalRect);

            var width = finalRect.width;
            var height = finalRect.height;
            this.host.css('clip', 'rect(0px,' + width + 'px,' + height + 'px,0px)');
        };

        this.renderCore = function (plotRect, screenSize) {
            InteractiveDataDisplay.DOMPlot.prototype.renderCore.call(this, plotRect, screenSize);
            var n = domElements.length;
            if (n > 0) {
                //Define screen rectangle
                var screenTop = 0;
                var screenBottom = screenSize.height;
                var screenLeft = 0;
                var screenRight = screenSize.width;

                // transformations
                var plotToScreenX = this.coordinateTransform.plotToScreenX;
                var plotToScreenY = this.coordinateTransform.plotToScreenY;
                var dataToPlotX = this.xDataTransform && this.xDataTransform.dataToPlot;
                var dataToPlotY = this.yDataTransform && this.yDataTransform.dataToPlot;
                var dataToScreenX = dataToPlotX ? function (x) { return plotToScreenX(dataToPlotX(x)) } : plotToScreenX;
                var dataToScreenY = dataToPlotY ? function (y) { return plotToScreenY(dataToPlotY(y)) } : plotToScreenY;

                for (var i = 0; i < n; i++) {
                    var el = domElements[i];
                    var p; // screen coordinates of the el's left-top
                    var size_p; // screen size of the element

                    if (el._scale == 'none') {
                        size_p = {
                            x: el.width(),
                            y: el.height()
                        };

                        p = { // screen coordinates 
                            x: dataToScreenX(el._x), // left
                            y: dataToScreenY(el._y) // top
                        };

                        var left = p.x - el._originX * size_p.x;
                        var top = p.y - el._originY * size_p.y;

                        p = { x: left, y: top };
                    } else {
                        var pos; // plot coordinates of the el's left-top
                        pos = getPosition(el);

                        p = { // screen coordinates of the el's left-top
                            x: dataToScreenX(pos.left),
                            y: dataToScreenY(pos.top)
                        };
                        size_p = { // screen size of the el
                            x: dataToScreenX(pos.left + el._width) - p.x,
                            y: dataToScreenY(pos.top - el._height) - p.y
                        };
                    }

                    var clipRectTop = 0, clipRectLeft = 0, clipRectBottom = size_p.y, clipRectRight = size_p.x;
                    var elIsVisible;

                    //Vertical intersection ([a1,a2] are screen top and bottom, [b1,b2] are iframe top and bottom)
                    var a1 = screenTop; var a2 = screenBottom;
                    var b1 = p.y; var b2 = p.y + size_p.y; // a,b are in the screen coordinate system
                    var c1 = Math.max(a1, b1); var c2 = Math.min(a2, b2); //[c1,c2] is intersection        
                    elIsVisible = c1 < c2;
                    if (elIsVisible) { //clip, if [c1,c2] is not empty (if c1<c2)                    
                        clipRectTop = c1 - p.y;
                        clipRectBottom = c2 - p.y;

                        //Horizontal intersection ([a1,a2] are screen left and right, [b1,b2] are iframe left and right)
                        a1 = screenLeft; a2 = screenRight;
                        b1 = p.x; b2 = p.x + size_p.x;
                        c1 = Math.max(a1, b1); c2 = Math.min(a2, b2); //[c1,c2] is intersection   
                        elIsVisible = c1 < c2;
                        if (elIsVisible) { //clip, if [c1,c2] is not empty (if c1<c2)
                            clipRectLeft = c1 - p.x;
                            clipRectRight = c2 - p.x;

                            //Finally, reset style.
                            el.css('left', p.x + 'px');
                            el.css('top', p.y + 'px');
                            //el.css('clip', 'rect(' + clipRectTop + 'px,' + clipRectRight + 'px,' + clipRectBottom + 'px,' + clipRectLeft + 'px)');
                            el.css('display', 'block');

                            if (el._scale === 'content') {
                                var scalex = size_p.x / el.width();
                                var scaley = size_p.y / el.height();
                                el.css(InteractiveDataDisplay.CssPrefix + '-transform-origin', '0% 0%');
                                el.css(InteractiveDataDisplay.CssPrefix + '-transform', 'scale(' + scalex + ',' + scaley + ')');
                            } else if (el._scale === 'element') {
                                el.css('width', size_p.x + 'px');
                                el.css('height', size_p.y + 'px');
                            }

                            //el.css('opacity', opacity);
                            //el.css('filter', 'alpha(opacity=' + (opacity * 100) + ')');
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
            } else {
                var n = domElements.length;
                for (var i = 0; i < n; i++) {
                    var el = domElements[i];
                    el.css('z-index', InteractiveDataDisplay.ZIndexDOMMarkers);
                }
            }
        }

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


        // Adds new DIV element to the plot
        // element is an HTML describing the new DIV element
        // scaleMode is either 'element', 'content', or 'none'
        // left, top are coordinates of the element in the data space
        // width, height are optional size of the element in the data space
        // returns added DOM element
        this.add = function (element, scaleMode, x, y, width, height, originX, originY) {
            var el = $(element);
            if (!this.host[0].contains(el[0]))
                el.appendTo(this.host);
            addElement(el, scaleMode, x, y, width, height, originX, originY);
            this.invalidateLocalBounds();
            this.requestUpdateLayout();
            return el.get(0);
        };

        var getElement = function (domEl) {
            var a = jQuery.grep(domElements, function (e) {
                return e[0] === domEl;
            });
            if (a && a.length > 0) return a[0];
            return undefined;
        };

        // Removes DIV element from the plot
        // element is DOM object
        this.remove = function (element) {
            var removeJQ = function (jqe) {
                var el = getElement(jqe[0]);
                if (el) {
                    domElements.splice(domElements.indexOf(el), 1);
                }
                jqe.remove();
            };
            if (element.jquery) {
                removeJQ(element);
            } else {
                removeJQ($(element));
            }

            this.invalidateLocalBounds();
            this.requestUpdateLayout();
        };

        // Set the position and optionally width and height of the element
        // element is DOM object which must be added to the plot prior to call this method
        // left, top are new coordinates of the left top corner of the element in the plot's data space
        // width, height are optional new width and height of the element in the plot's data space (if not provided, remain same; valuable only for scale mode 'element' or 'content')
        // ox, oy are optional new originX and originY which range from 0 to 1 and determines binding point of element to plots coordinates 
        this.set = function (element, x, y, width, height, ox, oy) {
            var myEl = getElement(element);
            if (!myEl) throw "Element is not found in the plot";

            myEl._x = x;
            myEl._y = y;
            if (myEl.scale != 'none') {
                if (width && width > 0)
                    myEl._width = width;
                if (height && height > 0)
                    myEl._height = height;
            }

            myEl._originX = ox || myEl._originX;
            myEl._originY = oy || myEl._originY;

            this.invalidateLocalBounds();
            this.requestUpdateLayout();
        };

        this.enableClickablePanel = false;

        that.master.centralPart.click(function (e) {
            if (that.enableClickablePanel) {
                // transformations
                var screenToPlotX = that.coordinateTransform.screenToPlotX;
                var screenToPlotY = that.coordinateTransform.screenToPlotY;
                var plotToDataX = that.xDataTransform && that.xDataTransform.plotToData;
                var plotToDataY = that.yDataTransform && that.yDataTransform.plotToData;
                var screenToDataX = plotToDataX ? function (x) { return plotToDataX(screenToPlotX(x)) } : screenToPlotX;
                var screenToDataY = plotToDataY ? function (y) { return plotToDataY(screenToPlotY(y)) } : screenToPlotY;

                var origin = InteractiveDataDisplay.Gestures.getXBrowserMouseOrigin(that.master.centralPart, e);

                var x = screenToDataX(origin.x);
                var y = screenToDataY(origin.y);

                that.host.trigger(plotClickEvent, { x: x, y: y });
            }
        });

        Object.defineProperty(this, "domElements", { get: function () { return domElements.slice(0); }, configurable: false });
    }
    InteractiveDataDisplay.DOMPlot.prototype = new InteractiveDataDisplay.Plot;

    InteractiveDataDisplay.GridlinesPlot = function (host, master) {
        this.base = InteractiveDataDisplay.CanvasPlot;
        this.base(host, master);

        var _xAxis, _yAxis;
        var _thickness = "1px";
        var _stroke = "LightGray";

        var style = {};
        InteractiveDataDisplay.Utils.readStyle(this.host, style);
        if (style) {
            _stroke = typeof style.stroke != "undefined" ? style.stroke : _stroke;
            _thickness = typeof style.thickness != "undefined" ? style.thickness : _thickness;
        }

        Object.defineProperty(this, "xAxis", {
            get: function () { return _xAxis; },
            set: function (value) {
                if (value == _xAxis) return;
                _xAxis = value;
                this.requestUpdateLayout();
            },
            configurable: false
        });

        Object.defineProperty(this, "yAxis", {
            get: function () { return _yAxis; },
            set: function (value) {
                if (value == _yAxis) return;
                _yAxis = value;
                this.requestUpdateLayout();
            },
            configurable: false
        });

        Object.defineProperty(this, "thickness", {
            get: function () { return _thickness; },
            set: function (value) {
                if (value == _thickness) return;
                if (value <= 0) throw "GridLines thickness must be positive";
                _thickness = value;

                this.requestNextFrameOrUpdate();
            },
            configurable: false
        });

        Object.defineProperty(this, "stroke", {
            get: function () { return _stroke; },
            set: function (value) {
                if (value == _stroke) return;
                _stroke = value;

                this.requestNextFrameOrUpdate();
            },
            configurable: false
        });

        var initializeAxes = function () {
            if (!_xAxis) {
                var axisName = this.host.attr("data-idd-xaxis");
                if (axisName) {
                    var axis = this.master.get(axisName);
                    if (axis) _xAxis = axis;
                }
            }
            if (!_yAxis) {
                var axisName = this.host.attr("data-idd-yaxis");
                if (axisName) {
                    var axis = this.master.get(axisName);
                    if (axis) _yAxis = axis;
                }
            }
        };

        this.renderCore = function (plotRect, screenSize) {
            InteractiveDataDisplay.GridlinesPlot.prototype.renderCore.call(this, plotRect, screenSize);

            initializeAxes.call(this);
            var ctx = this.getContext(true);
            ctx.strokeStyle = _stroke;
            ctx.fillStyle = _stroke;
            ctx.lineWidth = 1;

            var strokeThickness = parseInt(_thickness.slice(0, -2));

            var ticks = [];
            var v;
            if (_xAxis)
                ticks = _xAxis.ticks;
            for (var i = 0, len = ticks.length; i < len; i++) {
                if (!ticks[i].invisible) {
                    v = _xAxis.getCoordinateFromTick(ticks[i].position);
                    ctx.fillRect(v, 0, strokeThickness, screenSize.height);
                }
            }

            ticks = [];
            if (_yAxis)
                ticks = _yAxis.ticks;
            for (var i = 0, len = ticks.length; i < len; i++) {
                if (!ticks[i].invisible) {
                    v = (screenSize.height - 1) - _yAxis.getCoordinateFromTick(ticks[i].position);
                    ctx.fillRect(0, v, screenSize.width, strokeThickness);
                }
            }
        };

        this.renderCoreSvg = function (plotRect, screenSize, svg) {
            initializeAxes.call(this);

            var strokeThickness = parseInt(_thickness.slice(0, -2));
            var style = { width: strokeThickness, color: _stroke };

            var ticks = [];
            var v;
            if (_xAxis)
                ticks = _xAxis.ticks;
            for (var i = 0, len = ticks.length; i < len; i++) {
                if (!ticks[i].invisible) {
                    v = _xAxis.getCoordinateFromTick(ticks[i].position);
                    if ((v<0) || (v > screenSize.width))
                        continue // skipping out of visible region lines
                    svg.polyline([[v, 0], [v, screenSize.height - 1]]).stroke(style).fill('none');
                }
            }

            ticks = [];
            if (_yAxis)
                ticks = _yAxis.ticks;
            for (var i = 0, len = ticks.length; i < len; i++) {
                if (!ticks[i].invisible) {
                    v = (screenSize.height - 1) - _yAxis.getCoordinateFromTick(ticks[i].position);
                    if ((v<0) || (v > screenSize.height))
                        continue // skipping out of visible region lines
                    svg.polyline([[0, v], [screenSize.width - 1, v]]).stroke(style).fill('none');
                }
            }
        };
    }
    InteractiveDataDisplay.GridlinesPlot.prototype = new InteractiveDataDisplay.CanvasPlot;
}();;InteractiveDataDisplay = InteractiveDataDisplay || {}



InteractiveDataDisplay.SubplotsTrapPlot = function (div, master) {
    this.base = InteractiveDataDisplay.Plot;
    this.base(div, master);
    if (!div) return;

	var that = this;
	
	this.renderCallback = function(visRegion) {}

	this.suppressRenderCallback =false

    this.renderCore = function (plotRect, screenSize) {		
		InteractiveDataDisplay.SubplotsTrapPlot.prototype.renderCore.call(this, plotRect, screenSize);
		if(this.suppressRenderCallback)
			return
		var plotToDataX = (this.xDataTransform && this.xDataTransform.plotToData) ? this.xDataTransform.plotToData : function(x) {return x}
		var plotToDataY = (this.yDataTransform && this.yDataTransform.plotToData) ? this.yDataTransform.plotToData : function(y) {return y}
		
		var x1 = plotToDataX(plotRect.x)
		var x2 = plotToDataX(plotRect.x + plotRect.width)
		var y1 = plotToDataY(plotRect.y)
		var y2 = plotToDataY(plotRect.y + plotRect.height)

		var visibleRegion = {
			x_min: (x1>x2 ? x2 : x1),
			x_max: (x1>x2 ? x1 : x2),
			y_min: (y1>y2 ? y2 : y1),
			y_max: (y1>y2 ? y1 : y2)
		}

		this.renderCallback(visibleRegion)
        return;
    };

    this.renderCoreSvg = function (plotRect, screenSize, svg) {
        return;        
    };        
};

InteractiveDataDisplay.factory['subplots-trap'] = function(jqDiv, master) { return new InteractiveDataDisplay.SubplotsTrapPlot(jqDiv, master) }


InteractiveDataDisplay.SubplotsTrapPlot.prototype = new InteractiveDataDisplay.Plot;

// subplots are grid like structure of plots (lets say N x M plots)
// The function must be applied as constructor to a <table> element of 3*N rows (<tr></tr>) and 3*M columns
// this is because each plot can have slots for axes and titles. This slots are implemented as separate grid cells
InteractiveDataDisplay.SubPlots = function (subplotsDiv) {
	if(!subplotsDiv)
		throw "SubPlots must be applied to <div> element"
	if(subplotsDiv.children.length !== 1 && subplotsDiv.children.length !== 2)
		throw "SubPlots div must contain one or two child elements: optional element div (subplots title) and mandatory element table"
	var div = $(subplotsDiv).children().last()[0]
	if(!div)
		throw "SubPlots div should contain at least one <div> element"
	if(div.children.length !== 1)
		throw "SubPlots child div must contain exactly one child element which is a <table>"
	var table = div.children[0]
	if(!table || table.nodeName!='TABLE')
		throw "SubPlots child div must contain exactly one child element which is a <table>"
	var _div = div
	var _table = table

	var _subplotsDiv = subplotsDiv;
	$(_subplotsDiv).css("flex-direction", "column")
	$(_div).addClass("idd-subplots-legendholder")
	if(subplotsDiv.children.length === 2){
		var _titleDiv = $(subplotsDiv).children()[0]
		$(_titleDiv).addClass("idd-subplots-title")
	}

	var _Ncol = 0
	var _Nrow = 0
	var _masterPlots = [] //Nrow/3 x Ncol/3 jagged array of plots
	var _trapPlots = [] // Nrow/3 x Ncol/3 jagged array of SubplotsTrapPlot plots (see task #6 below)

	// these two arrays modified simultaniously, have same length
	var _axes = [] // this one holds the axis objects
	var _isAxisVertical = [] // the same length as array above
	var _axisLocationIndices = [] // this one holds indices (array of two numbers) of cell, containing the axis
	var _horizontalAxes = [] // Nrow/3 x Ncol/3 jagged array of axes. these are back indices: grid cell -> associated horizontal axis
	var _verticalAxes =[] // Nrow/3 x Ncol/3 jagged array of axes. these are back indices: grid cell -> associated vertical axis

	// In case of plot bindings, the axes which are used as tick source for the grid lines
	var verticalMasterAxis = undefined
	var horizontalMasterAxis = undefined	

	var _extLegendPlacement = undefined
	var _extLegendRowIdx = undefined
	var _extLegendColIdx = undefined
	var _extLegend = undefined

	var _syncVisualRectH = $(_div).attr('data-idd-horizontal-binding')
	var _syncVisualRectV = $(_div).attr('data-idd-vertical-binding')
	if (typeof _syncVisualRectH !== typeof undefined && (_syncVisualRectH === "true" || _syncVisualRectH === "enabled"))
		_syncVisualRectH = true
	else
		_syncVisualRectH = false
	if (typeof _syncVisualRectV !== typeof undefined && (_syncVisualRectV === "true" || _syncVisualRectV === "enabled"))
		_syncVisualRectV = true
	else
		_syncVisualRectV = false
	
	var that = this;

	var initializeSubPlots = function() {
		// traversing whole table structure.
		// initializing plots and axes in the slots
		//
		// there are following tasks to do:
		// 1. Initialize axes (e.g. InitializeAxis())
		// 2. Init plots (e.g. asPlot())
		// 3. bind plot transforms to axis (e.g. axis.DataTrasform = plot.xTransform)
		// 4. bind grid lines to axes (e.g. grid.xAxis = axis1)
		// 5. activate navigation
		// 6. activate rendering & binding
		var jqTr = $("tr",_table)
		_Nrow = jqTr.length
		_masterPlots = new Array(_Nrow/3)
		_trapPlots = new Array(_Nrow/3)
		_verticalAxes = new Array(_Nrow/3)
		_horizontalAxes = new Array(_Nrow/3)


		// common code is separated into this function
		// if "whereToLook" contains <div> which is axis, inits it and saved into "_axis" & "_axisLocationIndices" vars
		var initAxisIfExists = function(rIdx, cIdx, whereToLook) {
			var jqAxis = $("div[data-idd-axis]",whereToLook)
			var axisCount = jqAxis.length
			if(axisCount>0) {
				if(axisCount>1)
					console.warn("subplots: work with multiple axes in a single slot is not implemented")
				else {
					var axis = InteractiveDataDisplay.InitializeAxis(jqAxis, {})
					_axes.push(axis)
					_axisLocationIndices.push([rIdx,cIdx])
					var isVertical = (rIdx % 3) === 1				
					_isAxisVertical.push(isVertical)
					var associatedPlotRow = Math.floor(rIdx/3)
					var associatedPlotCol = Math.floor(cIdx/3)
					axis.associatedPlotRow = associatedPlotRow
					axis.associatedPlotCol = associatedPlotCol
					if(isVertical) {
						_verticalAxes[associatedPlotRow][associatedPlotCol] = axis
					} else {
						_horizontalAxes[associatedPlotRow][associatedPlotCol] = axis
					}
				}
			}
		}

		jqTr.each(function(rIndex) {
			var jqTd = $("td",this)			
			if(_Ncol === 0)
				_NCol = jqTd.length
			else if(jqTd.length !== _NCol)
				throw "Different rows have non-equal number of columns"			
			if((rIndex-1) % 3 === 0) {
				// row containing plots	
				var pRowIdx = Math.floor(rIndex/3)
				_masterPlots[pRowIdx] = new Array(_NCol/3)
				_trapPlots[pRowIdx] = new Array(_NCol/3)
				_verticalAxes[pRowIdx] = new Array(_NCol/3)
				_horizontalAxes[pRowIdx] = new Array(_NCol/3)
				jqTd.each(function(cIndex) {
					var td = this
					if((cIndex-1) % 3 == 0) { // col containing plots
						var jqIdd = $("div[data-idd-plot='plot']",td)
						if(jqIdd.length>0) {
							// the slot contains plot (not the blank slot)
							// task #2						
							var pColIdx = Math.floor(cIndex/3)
							var master = InteractiveDataDisplay.asPlot(jqIdd)					
							_masterPlots[pRowIdx][pColIdx] = master
							master.subplotRowIdx = pRowIdx
							master.subplotColIdx = pColIdx
							_trapPlots[pRowIdx][pColIdx] = InteractiveDataDisplay.asPlot($("div[data-idd-plot='subplots-trap']",td))

							// controlling legend visibility
							var style = {};							
							InteractiveDataDisplay.Utils.readStyle(jqIdd, style);
							if (style) {
								var isLegendVisible = typeof style.isLegendVisible != "undefined" ? style.isLegendVisible : "true";
								if(isLegendVisible === "true") {
									var legendDiv = $("<div style='z-index: 10;'></div>").appendTo(jqIdd);
									var _legend = new InteractiveDataDisplay.Legend(master, legendDiv, true, true, true);
									legendDiv.css("float", "right");									

									//Stop event propagation
									InteractiveDataDisplay.Gestures.FullEventList.forEach(function (eventName) {
										legendDiv[0].addEventListener(eventName, function (e) {
											e.stopPropagation();
										}, false);
									});
								}
							}

						}
					} else { // col containing left/right slots
						// task #1
						initAxisIfExists(rIndex,cIndex,td)
					}
				})
			} else {
				// row contains top/bottom slots
				// task #1
				jqTd.each(function(cIndex) {
					var td = this				
					initAxisIfExists(rIndex,cIndex,td)
				})
			}			
	   	})
	   		
		var _dataIddStyle = {}
		_dataIddStyle = InteractiveDataDisplay.Utils.readStyle($(_div), _dataIddStyle)
		var subplotsMargin = undefined
		if(_dataIddStyle && _dataIddStyle["subplots-margin"]){
			subplotsMargin = _dataIddStyle["subplots-margin"]
			$(_div).find("td div.idd-subplots-margin-left").css("padding-left", subplotsMargin)
			$(_div).find("tr").find("td div.idd-subplots-margin-left:first").css("padding-left", "")
			$(_div).find("td div.idd-subplots-margin-bottom").css("padding-bottom", subplotsMargin)
			$(_div).find("tr").last().find("td div.idd-subplots-margin-bottom").css("padding-bottom", "")
		}
		else{
			subplotsMargin = $(_div).find("td div.idd-axis").parent().css("padding-left")
		}

		// by this point the tasks #1 and #2 (initializations) are done
		
		var extLegendAttr = _div.getAttribute("data-idd-ext-legend")
		if(extLegendAttr) {
			var splitted = extLegendAttr.split(" ")
			if(splitted.length !== 3)
				throw "data-idd-ext-legend attribute bust contain string in format 'placement plotRowIdx plotColIdx'"
			var placement = splitted[0]
			_extLegendRowIdx = parseInt(splitted[1])
			_extLegendColIdx = parseInt(splitted[2])

			var legendSource = _masterPlots[_extLegendRowIdx][_extLegendColIdx]
			var legendDiv = $("<div></div>")
			switch(placement.trim().toLowerCase()) {
				case "left":
				case "top":
					legendDiv.prependTo(_div)
					break
				case "right":
				case "bottom":
					legendDiv.appendTo(_div)
					break
				default:
					throw "Unexpected external legend placement"
			}
			switch(placement.trim().toLowerCase()) {
				case "left":
					$(_div).css("flex-direction", "row")
					if(subplotsMargin)
						legendDiv.css("margin-right", subplotsMargin)
					break
				case "right":
					$(_div).css("flex-direction", "row")
					if(subplotsMargin)
						legendDiv.css("margin-left", subplotsMargin)
					break
				case "top":
					$(_div).css("flex-direction", "column")
					if(subplotsMargin)
						legendDiv.css("margin-bottom", subplotsMargin)
					break
				case "bottom":
					$(_div).css("flex-direction", "column")
					if(subplotsMargin)
						legendDiv.css("margin-top", subplotsMargin)
					break
				default:
					throw "Unexpected external legend placement"
			}
			_extLegend = new InteractiveDataDisplay.Legend(legendSource, legendDiv, false, undefined, true);
		}


		// proceeding to bindings (tasks #3 and #4)

		// Task #3: binding plots transform to axes
	  for(var i=0; i < _axes.length; i++) {
			var axis = _axes[i]
			var cellRow = _axisLocationIndices[i][0]
			var cellCol = _axisLocationIndices[i][1]
			var plotRow = Math.floor(cellRow/3)
			var plotCol = Math.floor(cellCol/3)
			var plot = _masterPlots[plotRow][plotCol]
			if(cellRow % 3 === 1) { // row with plots => left/right slot => yTransform is needed				
				axis.dataTransform = plot.yDataTransform
				//TODO: hand vertical axis bindings here
			}
			else {// row without plots => bottom/top slots => xTransform is needed
				axis.dataTransform = plot.xDataTransform
				//TODO: hand horizontal axis bindings here
			}
	  }

		// Task #4: binding grid lines to axis ticks
	  //
		// this is tricky, as the plot may not contain axis in its slots
		// Also the axes can be bound	    
		$("div[data-idd-plot='grid']",_table).each(function(idx){
			var host = this
			var grid = host.plot
			var master = grid.master
			var subplotRowIdx = master.subplotRowIdx
			var subplotColIdx = master.subplotColIdx
			var horAxis = _horizontalAxes[subplotRowIdx][subplotColIdx]
			if(horAxis)
				grid.xAxis = horAxis
			else if(_syncVisualRectH){

				function findHorizontalAxisIndexInColumn(horizontalAxesArr, columnIndex){
					for (var rowN = 0; rowN < horizontalAxesArr.length; rowN++){
						if(horizontalAxesArr[rowN] && horizontalAxesArr[rowN][columnIndex])
							return rowN;
					}
						return -1;
				}
		
				var horizontalAxisRow = findHorizontalAxisIndexInColumn(_horizontalAxes, subplotColIdx)

				if(horizontalAxisRow !== -1)
					grid.xAxis = _horizontalAxes[horizontalAxisRow][subplotColIdx]
			}

			var vertAxis = _verticalAxes[subplotRowIdx][subplotColIdx]
			if(vertAxis)
				grid.yAxis = vertAxis
			else if(_syncVisualRectV){
				function findVerticalAxisIndexInRow(row) {
					for (var i = 0; i < row.length; i++) {
						if(row[i])
							return i;
					}
					return -1;
				}
		
				var verticalAxisColumn = findVerticalAxisIndexInRow(_verticalAxes[subplotRowIdx])
				if(verticalAxisColumn !== -1)
					grid.yAxis = _verticalAxes[subplotRowIdx][verticalAxisColumn]
			}
		
		})
		
		// Task #5: activate navigation
		// we traverse master plots
		for(var i = 0; i < _masterPlots.length; i++) {
			var row = _masterPlots[i]
			for(var j = 0; j < row.length; j++) {
				var plot = row[j]
				if(plot) { // only for non-blank slots
					var naviEnabled = $(plot.host).attr("data-idd-navigation-enabled")
					if(naviEnabled && naviEnabled==='true') {
						
						var jqPlot = $(plot.host)
						jqPlot.dblclick(function () {
							this.plot.master.fitToView();
						});	

						var rowIdx = plot.master.subplotRowIdx
						var colIdx = plot.master.subplotColIdx

						// attaching gesture sources & handling double clicks
						var gestureSource = InteractiveDataDisplay.Gestures.getGesturesStream(jqPlot)
						var horAxis = _horizontalAxes[rowIdx][colIdx]
						if(horAxis) {
							var jqAxisHost = horAxis.host
							var bottomAxisGestures = InteractiveDataDisplay.Gestures.applyHorizontalBehavior(InteractiveDataDisplay.Gestures.getGesturesStream(jqAxisHost));
							gestureSource = gestureSource.merge(bottomAxisGestures)

							jqAxisHost.dblclick(function() {
								var axis = this.axis
								_masterPlots[axis.associatedPlotRow][axis.associatedPlotCol].fitToViewX();
							});
						}
						var vertAxis = _verticalAxes[rowIdx][colIdx]
						if(vertAxis) {
							var jqAxisHost = vertAxis.host
							var leftAxisGestures = InteractiveDataDisplay.Gestures.applyVerticalBehavior(InteractiveDataDisplay.Gestures.getGesturesStream(jqAxisHost));
							gestureSource = gestureSource.merge(leftAxisGestures)
							jqAxisHost.dblclick(function () {
								var axis = this.axis
								_masterPlots[axis.associatedPlotRow][axis.associatedPlotCol].fitToViewY();
							});
						}					
						plot.navigation.gestureSource = gestureSource
					}
				}
			}
		}

		// Task #6: activate rendering & binding
		// rendering is very tricky!
		// During the plot rendering the axes must be updated first, then all of the dependent plots (incl grid lines which use the coords from axis)
		// to intercept plot rendering before the grid lines for axis update I use specially crafted plot type "SubplotsTrapPlot"
		// it exposes the renderCallback to be set externally
		// we traverse trap plots and set renderCallback for them

		var isRendering = false

		var renderCallback = function(vr) {
			// the master plot draws something
			// this could be during data update. ignoring it for now (TODO: handle it)
			// or due to navigation of master or due to binding update
			
			// to separate original navigation from binding "echos" I use isRendering flag
			if(!isRendering) {
				// this is user navigation
				isRendering = true // supressing echo updates for bound master plots

				yRange = { min: vr.y_min, max: vr.y_max}
				xRange = { min: vr.x_min, max: vr.x_max}

				// we need to update all of the bound axes & update visual rects of the bound plots				
				
				// 1) updating bound axes
				
				var master = this.master
				var subplotRowIdx = master.subplotRowIdx
				var subplotColIdx = master.subplotColIdx
				
				if(!_syncVisualRectH){
					var horAxis = _horizontalAxes[subplotRowIdx][subplotColIdx]
					if(horAxis)
						horAxis.update(xRange)
				}
				if(!_syncVisualRectV){
					var vertAxis = _verticalAxes[subplotRowIdx][subplotColIdx]
					if(vertAxis)
					vertAxis.update(yRange)
				}

				for(var i = 0; i < _axes.length; i++) {
					var axis = _axes[i]
					if(_isAxisVertical[i] && _syncVisualRectV)
						axis.update(yRange)
					else if(!_isAxisVertical[i] && _syncVisualRectH)
						axis.update(xRange)
				}


				// 2) updating bound plots
				// traversing all of the grid master plots. Calling set visible to everyone except for originator
				
				if(_syncVisualRectH || _syncVisualRectV){
					for(var i = 0; i < _masterPlots.length; i++) {
						var row = _masterPlots[i]
						for(var j = 0; j < row.length; j++) {
							var plot = row[j]
							if(plot === this.master)
								continue // skipping the originator
							
							var visRec = plot.visibleRect

							if(_syncVisualRectH){
								visRec.x = vr.x_min
								visRec.width = vr.x_max - vr.x_min
							}
							if(_syncVisualRectV){
								visRec.y = vr.y_min
								visRec.height = vr.y_max - vr.y_min
							}

							plot.navigation.setVisibleRect(visRec, false, { suppressNotifyBoundPlots: true, forceOnlyUpdatePlotsOutput:true, syncUpdate:true });								
						}
					}
				}

				isRendering = false
			} else {
				// this is binding triggered update
			}						
		}		

		for(var i = 0; i < _trapPlots.length; i++) {
			var row = _trapPlots[i]
			for(var j = 0; j < row.length; j++) {
				var trapPlot = row[j]
				if(trapPlot) {
					trapPlot.renderCallback = renderCallback
				}
			}
		}

		var visibleChangedHandler = function (event, params) {
			for(var i = 0; i < _masterPlots.length; i++) {
				for(var j = 0; j < _masterPlots[i].length; j++) {
					var plotsSeq = _masterPlots[i][j].getPlotsSequence();
					for(var k = 0; k < plotsSeq.length; k++) {
						if(params.name.length > 0 && plotsSeq[k].name === params.name)
							if(plotsSeq[k].isVisible !== params.isVisible)
							plotsSeq[k].isVisible = params.isVisible
					}
				}
			}
		}

		var _commonVisibilityEnabled = $(_div).attr("data-idd-common-visibility")
		if(_commonVisibilityEnabled && (_commonVisibilityEnabled === "true" || _commonVisibilityEnabled === "enabled")){
			for(var i = 0; i < _masterPlots.length; i++) {
				for(var j = 0; j < _masterPlots[i].length; j++) {
					if(_masterPlots[i][j])
						_masterPlots[i][j].host.bind("visibleChanged", visibleChangedHandler);
				}
			}
		}

		_subplotsDiv.subplots = that;
	}	

	this.renderSVG = function() {
		var searchForPlot = "div[data-idd-plot='plot']"; // subplots
		var searchForAxis = "div[data-idd-axis]"; // axes
		var searchForPlotTitle = "div.idd-subplot-title"; // titles of each subplots
		var searchForHAxisTitle = "div.idd-horizontalTitle"; // horizontal axis names
		var searchForVAxisTitle = "div.idd-verticalTitle"; // vertical axis names
		var searchForLegend = "div.idd-legend" // legend which is used in subplots
		var searchSubplotsTitle = "div.idd-subplots-title" // title of subplots as a group
		var elemsToSVG = $(_subplotsDiv).find(searchForPlot+', '+searchForAxis+', '+searchForPlotTitle+', '+searchForHAxisTitle+', '+searchForVAxisTitle+', '+searchForLegend+', '+searchSubplotsTitle)

		var svgs = []
		var svgHost = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		var svg = SVG(svgHost).size($(_subplotsDiv).width(), $(_subplotsDiv).height())
		var svgSubPlotsGroup = svg.nested()
		var leftOffsets = []
		var topOffsets = []
		var subplotsOffset = $(_subplotsDiv).offset()
		for (var i = 0; i < elemsToSVG.length; i++) {
			// offsets are calculated for all of the elements
			leftOffsets[i] = $(elemsToSVG[i]).offset().left - subplotsOffset.left
			topOffsets[i] = $(elemsToSVG[i]).offset().top - subplotsOffset.top + 1 // dont know why the 1 offset is needed, without it 1px border at the edge is not visible
			
			var plotOrAxis = $(elemsToSVG[i]); // plotOrAxis or legend actually...
			// text containing divs are handled specially
			if(plotOrAxis.is(searchForPlotTitle+', '+searchForHAxisTitle+', '+searchForVAxisTitle+', '+searchSubplotsTitle)){
				// subplot title
				var text = svg.text(elemsToSVG[i].innerText);
				svgs[i] = text.font({
					family:	$(elemsToSVG[i]).css("font-family")
				  , size:	$(elemsToSVG[i]).css("font-size")
				  , weight:	$(elemsToSVG[i]).css("font-weight")
				  })

				
				if(plotOrAxis.is(searchForVAxisTitle)){
					// vertical axis title
					switch ($(elemsToSVG[i]).css("vertical-align")) {
						case "top":
							svgs[i].move(leftOffsets[i], topOffsets[i]);
							break;
						case "bottom":
							svgs[i].move(leftOffsets[i], topOffsets[i] + $(elemsToSVG[i]).height() - svgs[i].bbox().w);
							svgs[i].rotate(-90, leftOffsets[i], topOffsets[i] + $(elemsToSVG[i]).height() - svgs[i].bbox().w);
							break;
						default:
							svgs[i].move(leftOffsets[i], topOffsets[i] + $(elemsToSVG[i]).height()/2 + svgs[i].bbox().w/2);
							svgs[i].rotate(-90, leftOffsets[i], topOffsets[i] + $(elemsToSVG[i]).height()/2 + svgs[i].bbox().w/2);
					}
				}
				else{
					// horizontal axis title
					switch ($(elemsToSVG[i]).css("text-align")) {
						case "left":
							svgs[i].move(leftOffsets[i], topOffsets[i]);
							break;
						case "right":
							svgs[i].move(leftOffsets[i] + $(elemsToSVG[i]).width() - svgs[i].bbox().w, topOffsets[i]);
							break;
						default:
							svgs[i].move(leftOffsets[i] + $(elemsToSVG[i]).width()/2 - svgs[i].bbox().w/2, topOffsets[i]);
					}
				}

			}
			else{
				if(plotOrAxis.is(searchForPlot)){
					// plot border
					var wth = $(elemsToSVG[i]).parent().width();
					var ht = $(elemsToSVG[i]).parent().height();
					var plotBox = svg.polyline('0,0 '+wth+',0 '+wth+','+ht+' 0,'+ht+' 0,0').fill('none');
					plotBox.stroke({ color: '#808080', width: 1 }).move(leftOffsets[i], topOffsets[i]);
					plotBox.attr('shape-rendering', 'crispEdges');
					svgSubPlotsGroup.add(plotBox);

					// subplot
					var plot = InteractiveDataDisplay.asPlot(plotOrAxis);
					svgs[i] = plot.exportToSvg();
					leftOffsets[i] += parseFloat($(elemsToSVG[i]).css('border-left-width').replace("px","")); 
					topOffsets[i] += parseFloat($(elemsToSVG[i]).css('border-top-width').replace("px",""));
				}
				else if(plotOrAxis.is(searchForAxis)){
					// axis
					svgs[i] = plotOrAxis[0].axis.exportToSvg();
				}
				else if(plotOrAxis.is(searchForLegend)) {
					svgs[i] = _masterPlots[_extLegendRowIdx][_extLegendColIdx].exportLegendToSvg(plotOrAxis[0])
				}
				else{
					throw "Unexpected element type. SVG export failure";
				}
				svgs[i].move(leftOffsets[i], topOffsets[i]);
			}

			// adding new svg element to the svg group
			svgSubPlotsGroup.add(svgs[i]);
		}

		return svg;
	}
	
	initializeSubPlots()
}

InteractiveDataDisplay.asSubPlots = function (div) {	
	if (div && div.subplots !== undefined)
		return div.subplots;
	else {
		return new InteractiveDataDisplay.SubPlots(div);
	}

};
InteractiveDataDisplay.readTable = function (jqPlotDiv) {
    var data = {};
    InteractiveDataDisplay.Utils.readStyle(jqPlotDiv, data);

    var table = jqPlotDiv.children("table:first-child");
    if (table && table.length > 0) {
        // Hiding table
        table.toggle();

        // Reading content
        var rows = table.children("tbody").children("tr");
        if (rows && rows.length > 0) {
            var header = rows.first();
            var map = [];
            header.children("th").each(function (index) {
                var name = $(this).text();
                map[index] = name;
                data[name] = [];
            });

            // data
            var dataRows = rows.toArray(); // each element is <tr>
            if (dataRows) {
                var n = dataRows.length;
                var m = map.length;
                for (var i = 1; i < n; i++) { // by rows
                    var columns = $(dataRows[i]).children("td").toArray();
                    for (var j = 0; j < m; j++) { // by columns
                        data[map[j]][i - 1] = parseFloat($(columns[j]).text()); 
                    }
                }
            }
        }
    }

    return data;
};

InteractiveDataDisplay.Utils.getAndClearTextContent = function(jqElement)
{
    jqElement[0].normalize(); // In a normalized sub-tree, no text nodes in the sub-tree are empty and there are no adjacent text nodes
    // we take here first text node
    var content = jqElement.contents().filter(
        function () {
            if (this.nodeType != 3) return false;
            if (!this.data || this.data.trim() == '') return false;
            return true;
        })[0];
    if (content && content.data) {
        var contentData = content.wholeText;
        if (typeof content.replaceWholeText != 'undefined')
            content.replaceWholeText('');
        else
            content.data = '';
        return contentData;
    }
}

InteractiveDataDisplay.readCsv = function (jqPlotDiv) {
    var data = {};
    InteractiveDataDisplay.Utils.readStyle(jqPlotDiv, data);

    var contentData = InteractiveDataDisplay.Utils.getAndClearTextContent(jqPlotDiv);
    if (contentData) {
        contentData = contentData.trim(); // trim data

        var splitWords = function (line) { return line.split(/\s+/g); };
        var lines = contentData.split(/\n/g);
        var n = lines.length - 1;
        if (n > 0) {
            var header = splitWords(lines[0]);
            var j0 = header[0] ? 0 : 1;
            for (var j = j0; j < header.length; j++) {
                data[header[j - j0]] = [];
            }
            for (var i = 0; i < n; i++) {
                var elems = splitWords(lines[i + 1]);
                j0 = elems[0] ? 0 : 1;
                for (var j = j0; j < elems.length; j++) {
                    var parsed = parseFloat(elems[j]);
                    if(isNaN(parsed))
                        data[header[j - j0]][i] = elems[j];
                    else
                        data[header[j - j0]][i] = parsed;
                }
            }

            for (var j = 0; j < header.length; j++)
            {
                var complexHeader = header[j].split('.');
                if (complexHeader.length > 1) {
                    if (!data[complexHeader[0]]) data[complexHeader[0]] = {};
                    data[complexHeader[0]][complexHeader[1]] = data[header[j]];
                    delete data[header[j]];
                }
            }
        }
    }
    return data;
};

InteractiveDataDisplay.readCsv2d = function (jqDiv) {
    var data = {};
    InteractiveDataDisplay.Utils.readStyle(jqDiv, data);

    var contentData = InteractiveDataDisplay.Utils.getAndClearTextContent(jqDiv);
    if (contentData) {
        contentData = contentData.trim(); // trim data
        var splitWords = function (line) { return line.trim().split(/\s+/g); };
        var lines = contentData.split(/\n/g);
        var m = lines.length - 1;
        if (m > 0) {
            var valx = splitWords(lines[0]);
            var n = valx.length - 1;
            if (n > 0) {
                var x = new Array(n);
                var y = new Array(m);
                var f = new Array(n);

                for (var i = 1; i <= n; i++) {
                    f[i - 1] = new Array(m);
                    x[i - 1] = parseFloat(valx[i]);
                }

                for (var j = 1; j <= m; j++) {
                    var valy = splitWords(lines[j]);
                    y[j - 1] = parseFloat(valy[0]);
                    for (var i = 1; i <= n; i++) {
                        f[i - 1][j - 1] = parseFloat(valy[i]);
                    }
                }
                data.x = x;
                data.y = y;
                data.values = f;
            }
        }
    }
    return data;
};

InteractiveDataDisplay.readBase64 = function (jqDiv) {
    function decodeBase64Array(data) {
        // e.g. data is "var_name float64.1D base64str"
        var a = data[0].split('.')
        var typeStr = a[0]
        var dimensionality = a[1]
        switch(dimensionality) {
            case '1D':                
                if (typeStr == 'string') {
                    var encoded = data[1]
                    var encodedArray = encoded.split(',')                    
                    var result= encodedArray.map(atob)
                    return result
                }
                else {
                    var byteArray = InteractiveDataDisplay.Utils.base64toByteArray(data[1])
                    var result = InteractiveDataDisplay.Utils.byteArrayToTypedArray(byteArray,typeStr)
                    return result            
                }
            case '2D':
                // e.g. data is "var_name float64.2D inner_dim_len base64str"
                var innerDimLen = parseInt(data[1])
                var byteArray = InteractiveDataDisplay.Utils.base64toByteArray(data[2])
                var flattened = InteractiveDataDisplay.Utils.byteArrayToTypedArray(byteArray,typeStr)
                // constructing jagged array with inner (second) dim len "innerDimLen
                if(flattened.length % innerDimLen != 0)
                    throw "InnerDimLen is not divisor of decoded flattened array len"
                var outerDimLen = flattened.length / innerDimLen
                var result = new Array(outerDimLen)
                for(var i=0; i<outerDimLen; i++) {
                    result[i] = flattened.slice(i*innerDimLen,((i+1)*innerDimLen))                    
                }
                return result
            default:
                throw('Unexpected dimensionality specified ('+(data[0])+')')
                
        }
    }

    var data = {};
    InteractiveDataDisplay.Utils.readStyle(jqDiv, data);

    var contentData = InteractiveDataDisplay.Utils.getAndClearTextContent(jqDiv);
    if (contentData) {
        contentData = contentData.trim(); // trim data
        var splitWords = function (line) { return line.split(/\s+/g); };
        var lines = contentData.split(/\n/g);
        var N = lines.length;        
        for(var i=0; i<N; i++) {
            var words = splitWords(lines[i].trim());
            var name = words[0]
            words.splice(0,1)
            var value = decodeBase64Array(words)
            data[name] = value
        }        
    }
    return data
}
;InteractiveDataDisplay.InitializeAxis = function (div, params) {
    
    if (div.hasClass("idd-axis"))
        throw "The div element already is initialized as an axis";
    var axisType = div.attr("data-idd-axis");
    switch (axisType) {
        case "numeric":
            div.axis = new InteractiveDataDisplay.NumericAxis(div);
            return div.axis;
        case "log":
            div.axis = new InteractiveDataDisplay.LogarithmicAxis(div);
            return div.axis;
        case "labels":
            if(typeof params === 'undefined'){
                var initializer = InteractiveDataDisplay.Utils.getDataSourceFunction(div, InteractiveDataDisplay.readCsv);
                var params = initializer(div);
            }
            div.axis = new InteractiveDataDisplay.LabelledAxis(div, params);
            return div.axis;
    }
};

// object that provides functions to render ticks    
InteractiveDataDisplay.TicksRenderer = function (div, source) {

    if (typeof (Modernizr) != 'undefined' && div) {
        if (!Modernizr.canvas) {
            div.replaceWith('<div">Browser does not support HTML5 canvas</div>');
        }
    }

    if (div && div.hasClass("idd-axis")) return;
    if (div) div[0].axis = this;
    var that = this;

    // link to div element - container of axis
    var _host = div;

    // orientation: horizontal or vertical
    var _mode = "";
    if (div) _mode = div.attr("data-idd-placement");
    if (_mode != "top" && _mode != "bottom" && _mode != "left" && _mode != "right")
        _mode == "bottom";
    var isHorizontal = (_mode == "top" || _mode == "bottom");
    this.rotateLabels = false;

    // _range of axis in plot coordinates
    var _range = { min: 0, max: 1 };

    // provider to calculate ticks and labels
    var _tickSource = source;
    var _ticks = [];

    var textOffset = 3;

    var randInt = InteractiveDataDisplay.Utils.generateNextIntId();
    // canvas to render ticks
    var canvas = $("<canvas id='canvas_" + randInt + "' style='position:relative; float:left'></canvas>");
    // div to place labels
    var labelsDiv = $("<div id='labelsDiv_" + randInt + "' style='position:relative; float:left'></div>");

    if (div) {
        if (_mode == "bottom" || _mode == "right") {
            div[0].appendChild(canvas[0]);
            div[0].appendChild(labelsDiv[0]);
        }
        else {
            div[0].appendChild(labelsDiv[0]);
            div[0].appendChild(canvas[0]);
        }

        var canvasSize = InteractiveDataDisplay.tickLength + 1;
        if (isHorizontal) canvas[0].height = canvasSize;
        else {
            canvas[0].width = canvasSize;
            if (_mode == "right") labelsDiv.css("left", textOffset);
            else canvas.css("left", textOffset);
        }
    }

    var _width, _height;
    var _size;
    var _deltaRange; // DG: seems to be a ratio between axis screen size and visible data range
    var _canvasHeight;
    var _rotateAngle; // angle in radians of label tilt

    // checks if size of host element changed and refreshes size of canvas and labels' div
    this.updateSize = function () {
        var prevSize = _size;
        if (div) {
            var divWidth = div.outerWidth(false);
            var divHeight = div.outerHeight(false);        
            if (isHorizontal) {            
                _width = divWidth;
                // height is set in render function (with respect to label sizes and rotations)
                _size = _width;
                if (_size != prevSize) {
                    canvas[0].width = _size;
                    labelsDiv.css("width", _width);
                }
            }
            else {
                _height = divHeight;
                // width is set in render function (with respect to label sizes and rotations)
                _size = _height;
                if (_size != prevSize) {
                    canvas[0].height = _size;
                    labelsDiv.css("height", _height);
                }
            }
        }   
        _deltaRange = (_size - 1) / (_range.max - _range.min);
        _canvasHeight = canvas[0].height;
    };

    var text_size = -1; 
    var smallTickLength = InteractiveDataDisplay.tickLength / 3;

    var strokeStyle = _host ? _host.css("color") : "Black";
    var ctx = canvas.get(0).getContext("2d");
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = strokeStyle;
    ctx.lineWidth = 1;

    var fontSize = 12;        
    var customFontSize = false;
    var fontFamily = "";

    if (_host) {       
        if (_host[0].currentStyle) {
            fontSize = _host[0].currentStyle["font-size"];
            fontFamily = _host[0].currentStyle["font-family"];
        }
        else if (document.defaultView && document.defaultView.getComputedStyle) {
            fontSize = document.defaultView.getComputedStyle(_host[0], null).getPropertyValue("font-size");
            fontFamily = document.defaultView.getComputedStyle(_host[0], null).getPropertyValue("font-family");
        }
        else if (_host[0].style) {
            fontSize = _host[0].style["font-size"];
            fontFamily = _host[0].style["font-family"];
        }
        ctx.font = fontSize + fontFamily;        
    }

    Object.defineProperty(this, "host", { get: function () { return _host; }, configurable: false });
    Object.defineProperty(this, "mode", { get: function () { return _mode; }, configurable: false });
    Object.defineProperty(this, "tickSource",
        {
            get: function () { return _tickSource; },
            set: function (value) {
                _tickSource = value;
                labelsDiv.empty();
                render();
            },
            configurable: false
        });
    Object.defineProperty(this, "range", { get: function () { return _range; }, configurable: false });
    Object.defineProperty(this, "ticks", { get: function () { return _ticks; }, configurable: false });

    Object.defineProperty(this, "DesiredSize", { get: function () { return { width: _width, height: _height }; }, configurable: false });
    Object.defineProperty(this, "axisSize", { get: function () { return _size; }, configurable: false });
    Object.defineProperty(this, "deltaRange", { get: function () { return _deltaRange; }, configurable: false });
    Object.defineProperty(this, "FontSize", { 
        get: function () { return _defaultFontSize; }, 
        set: function (newFontSize) {
            customFontSize = true;
            fontSize = newFontSize + "px";
            ctx.font = fontSize + fontFamily;  
            _tickSource.invalidate();
            that.update();
        },
        configurable: false
    });
    // Get or set label angle in degrees, from -90 to 90.
    Object.defineProperty(this, "rotateAngle", {
        get: function () { return _rotateAngle / Math.PI * 180.0; },
        set: function (value) {
            _rotateAngle = value * Math.PI / 180;
            _tickSource.invalidate();
            that.update();
        },
        configurable: false
    });
    this.sizeChanged = true;

    // transform data <-> plot: is applied before converting into screen coordinates
    var _dataTransform = undefined;
    Object.defineProperty(this, "dataTransform", {
        get: function () { return _dataTransform; },
        set: function (value) {
            _dataTransform = value;
            render();
        },
        configurable: false
    });

    var ticksInfo = [];

    // calculate and cache (to the "ticksInfo") positions of ticks and labels' size
    var getPositions = function (ticks) {
        var len = ticks.length;
        ticksInfo = new Array(len);
        var size, width, height;
        for (var i = 0; i < len; i++) {
            var tick = ticks[i];
            if (tick.label) {
                size = tick.label._size;
                width = size.width; 
                height = size.height;
                if(width == 0 || height == 0) {       
                  var inner = _tickSource.getInner(tick.position);
                  if(typeof inner === "string"){
                      var sz = ctx.measureText(inner);
                      width = sz.width;
                      height = sz.height; // height = (isHorizontal ? h : parseFloat(fontSize)) + 8;
                  }else{ // html element
                      var $div = $("<div></div>").append($(inner)).css({ "display":"block", "visibility":"hidden", "position":"absolute" }).appendTo($("body"));                        
                      width = $div.width();
                      height = $div.height();
                      $div.remove();
                  }
                }
                var rotatedWidth = _rotateAngle ? width * Math.abs(Math.cos(_rotateAngle)) + height * Math.abs(Math.sin(_rotateAngle)): width;
                var rotatedHeight = _rotateAngle ? width * Math.abs(Math.sin(_rotateAngle)) + height * Math.abs(Math.cos(_rotateAngle)) : height;                
                ticksInfo[i] = { position: that.getCoordinateFromTick(tick.position), width: rotatedWidth, height: rotatedHeight, hasLabel: true };
            } else { // no label
                ticksInfo[i] = { position: that.getCoordinateFromTick(tick.position), width: 0, height: 0, hasLabel: false };
            }
        }
    };

    // private function to check whether ticks overlay each other
    // DG: what result of 1 mean?
    // -1 - means that the tick labels overlap
    var checkLabelsArrangement = function (ticks) {

        var delta, deltaSize;
        var len = ticks.length - 1;

        addNewLabels(ticks);
        getPositions(ticks);

        if (len == -1) return 1;

        var i1 = 0;
        var i2 = 0;
        while (i2 < len) {
            i1 = i2;
            i2++;
            while (i2 < len + 1 && !ticksInfo[i2].hasLabel) i2++;
            if (i2 > len) break;
            if (ticksInfo[i1].hasLabel) {
                delta = Math.abs(ticksInfo[i2].position - ticksInfo[i1].position);
                if (delta < InteractiveDataDisplay.minTickSpace) return -1;
                if (isHorizontal) {
                    deltaSize = (ticksInfo[i1].width + ticksInfo[i2].width) / 2;
                    if (i1 == 0 && ticksInfo[i1].position - ticksInfo[i1].width / 2 < 0) deltaSize -= ticksInfo[i1].width / 2;
                    else if (i2 == len - 1 && ticksInfo[i2].position - ticksInfo[i2].width / 2 > _size) deltaSize -= ticksInfo[i2].width / 2;
                }
                else {
                    deltaSize = (ticksInfo[i1].height + ticksInfo[i2].height) / 2;
                    if (i1 == 0 && ticksInfo[i1].position - ticksInfo[i1].height / 2 < 0) deltaSize -= ticksInfo[i1].height / 2;
                    else if (i2 == len - 1 && ticksInfo[i2].position - ticksInfo[i2].height / 2 > _size) deltaSize -= ticksInfo[i2].height / 2;
                }
                if (delta - deltaSize < InteractiveDataDisplay.minLabelSpace) return -1;
            }
        }
        var res = 1;
        i1 = i2 = 0;
        while (i2 < len) {
            i1 = i2;
            i2++;
            while (i2 < len + 1 && !ticksInfo[i2].hasLabel) i2++;
            if (i2 > len) break;
            if (ticksInfo[i1].hasLabel) {
                delta = Math.abs(ticksInfo[i2].position - ticksInfo[i1].position);
                if (isHorizontal) {
                    deltaSize = (ticksInfo[i1].width + ticksInfo[i2].width) / 2;
                    if (i1 == 0 && ticksInfo[i1].position - ticksInfo[i1].width / 2 < 0) deltaSize -= ticksInfo[i1].width / 2;
                    else if (i2 == len - 1 && ticksInfo[i2].position - ticksInfo[i2].width / 2 > _size) deltaSize -= ticksInfo[i2].width / 2;
                }
                else {
                    deltaSize = (ticksInfo[i1].height + ticksInfo[i2].height) / 2;
                    if (i1 == 0 && ticksInfo[i1].position - ticksInfo[i1].height / 2 < 0) deltaSize -= ticksInfo[i1].height / 2;
                    else if (i2 == len - 1 && ticksInfo[i2].position - ticksInfo[i2].height / 2 > _size) deltaSize -= ticksInfo[i2].height / 2;
                }
                if (delta - deltaSize < InteractiveDataDisplay.minLabelSpace) {
                    res = 0;
                    break;
                }
            }
        }
        return res;
    };

    // returns x coordinate in pixels by given coordinate in plot
    if (!this.getCoordinateFromTick) {
        this.getCoordinateFromTick = function (x) {
            return x;
        };
    }
    
    var minTicks = false;    

    // function to render ticks and labels
    var render = function () {

        // refreshing size of axis if changed
        that.updateSize();

        if (_dataTransform) {
            var min = _dataTransform.plotToData(_range.min);
            var max = _dataTransform.plotToData(_range.max);
            _ticks = _tickSource.getTicks({ min: Math.min(min, max), max: Math.max(min, max) });
        }
        else _ticks = _tickSource.getTicks(_range);

        // check for possible labels overlay
        var result = checkLabelsArrangement(_ticks);
        var newTicks, newResult;
        var iterations = 0;

        if (result == -1) {
            // if labels overlay each other -> need to be decreased
            while (iterations++ < InteractiveDataDisplay.maxTickArrangeIterations) {
                newTicks = _tickSource.decreaseTickCount();
                newResult = checkLabelsArrangement(newTicks);
                _ticks = newTicks;
                if (newResult != -1)
                    break;
            }
        }
        if (result == 1) {
            // if labels do not overlay each other and there is enough space to increase them -> need to be increased
            while (iterations++ < InteractiveDataDisplay.maxTickArrangeIterations) {
                newTicks = _tickSource.increaseTickCount();
                newResult = checkLabelsArrangement(newTicks);
                if (newResult == -1) {
                    _ticks = _tickSource.decreaseTickCount();
                    getPositions(_ticks);
                    addNewLabels(_ticks);
                    break;
                }
                _ticks = newTicks;
                if (newResult == 0)
                    break;
            }
        }
        if (_rotateAngle) {
            _ticks = _tickSource.updateTransform(result, _rotateAngle, isHorizontal);
        }
        minTicks = false;
        if (_tickSource.getMinTicks) {
            if (newResult == -1 && iterations > InteractiveDataDisplay.maxTickArrangeIterations || _ticks.length < 2) {
                newTicks = _tickSource.getMinTicks();
                if (newTicks.length > 0) {
                    _ticks = newTicks;
                    addNewLabels(_ticks);
                    getPositions(_ticks);
                }
            }
        }
        if (_ticks.length == 2) {
            addNewLabels(_ticks);
            getPositions(_ticks);
            if (_ticks.length == 2) {
                var delta = ticksInfo[1].position - ticksInfo[0].position;
                var deltaSize;
                if (isHorizontal) deltaSize = (ticksInfo[0].width + ticksInfo[1].width) / 2;
                else deltaSize = (ticksInfo[0].height + ticksInfo[1].height) / 2;
                if (delta - deltaSize < InteractiveDataDisplay.minLabelSpace)
                    minTicks = true;
            }
        }

        var len = _ticks.length;
        var old_text_size = text_size;
        text_size = 0;
        this.sizeChanged = false;
        // calculate max size of labels (width or height) to set proper size of host
        if (isHorizontal) {
            for (var i = 0; i < len; i++) {
                text_size = Math.max(text_size, ticksInfo[i].height);
            }
            if (text_size != old_text_size && text_size != 0) {
                labelsDiv.css("height", text_size);
                canvas[0].height = canvasSize;
                _height = text_size + canvasSize; // labels div + ticks canvas
                _host.css("height", _height);
                this.sizeChanged = true;
            }
        }
        else {
            for (var i = 0; i < len; i++) {
                text_size = Math.max(text_size, ticksInfo[i].width);
            }
            if (text_size != old_text_size && text_size != 0) {
                labelsDiv.css("width", text_size);
                canvas[0].width = canvasSize;
                _width = text_size + canvasSize + textOffset;
                _host.css("width", _width);
                this.sizeChanged = true;
            }
        }

        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = strokeStyle;

        // clear canvas context and render base line
        if (isHorizontal) {
            ctx.clearRect(0, 0, _size, canvasSize);
            if (_mode == "bottom") ctx.fillRect(0, 0, _size, 1);
            else ctx.fillRect(0, InteractiveDataDisplay.tickLength, _size, 1);
        }
        else {
            ctx.clearRect(0, 0, canvasSize, _size);
            if (_mode == "right") ctx.fillRect(0, 0, 1, _size);
            else ctx.fillRect(InteractiveDataDisplay.tickLength, 0, 1, _size);
        }

        // DG: Do we need to draw base line for "left" and "top" modes ?

        // render ticks and labels (if necessary)
        // if range is single point - render only label in the middle of axis
        var x, shift;
        // x denotes the location of the label on the axis
        // but as renderer wants to have top-left corner of the label, we shift the label from X to the left
        // thus shift is usually the half size of the label (thus centre of the label is at the X)
        // but at the boundaries the shift may be coerced not to clip the labels (if there is space abailable)
        for (var i = 0; i < len; i++) {
            var curTick = _ticks[i] // position in _ticks are plot coords
            var curTickInfo = ticksInfo[i] // positions in tickInfo are screen offsets (0 - is axis bound)
            x = curTickInfo.position;
            
            var nextTickInfo = undefined
            var prevTickInfo = undefined                  
            if(i>0) {
                prevTickInfo = ticksInfo[i-1]
            }
            if(i<len-1) {
                nextTickInfo = ticksInfo[i+1]
            }
            var isIntervalLabel = prevTickInfo && nextTickInfo && !prevTickInfo.hasLabel && !nextTickInfo.hasClass && curTickInfo.hasLabel && curTick.invisible

            if (isHorizontal) {
                shift = curTickInfo.width / 2;
                if (minTicks) {
                    if (i == 0) shift *= 2;
                    else if (i == len - 1) shift = 0;
                }
                else {
                    // if (i == 0 && x < shift) shift = 0;
                    //  else
                    // if (i == len - 1 && x + shift > _size) shift *= 2;
                }

                if (!curTick.invisible) ctx.fillRect(x, 1, 1, InteractiveDataDisplay.tickLength);

                if (curTick.label) {
                    var finalLeft = undefined
                    var w = curTickInfo.width // the width of the div after the label rotation is applied
                    var beforeRotationW = curTick.label._size.width // this is plain width (before the CSS rotation is applied)
                    if(isIntervalLabel) {                                            
                        if(prevTickInfo.position <0 ) { // part of the interval is clipped by the visible rect, we can recenter the label
                            if(nextTickInfo.position >= w) { // is it possible to fit the whole label?
                                // placing the label in the centre of the vacant area                                
                                var vacantSpaceMiddleCoord = (0.0 + nextTickInfo.position) * 0.5 // we want that the label centre be at this coord      
                                finalLeft = vacantSpaceMiddleCoord - beforeRotationW*0.5 // we need to shift to the left as layout wants us to specify leftmost point                                            
                            } else {
                                // sticking the label maximum to the right (to the next interval bound)                                
                                finalLeft = nextTickInfo.position - (w+beforeRotationW)*0.5
                            }
                        } else if (nextTickInfo.position > _size) { 
                            // part of interval is clipped by the visible rect from right side
                            // we can recentre the label
                            if(_size - prevTickInfo.position >= w) { // is it possible to fit the whole label?
                                // placing the label in the centre of the vacant area
                                var vacantSpaceMiddleCoord = (prevTickInfo.position + _size) * 0.5 // we want that the label centre be at this coord                                
                                finalLeft = vacantSpaceMiddleCoord - beforeRotationW*0.5
                            } else {
                                // sticking the label maximum to the left (to the previous interval bound)
                                finalLeft = prevTickInfo.position - (beforeRotationW - w)*0.5
                            }
                        }
                        else
                            finalLeft = x - beforeRotationW/2
                    } else {
                            finalLeft = x - beforeRotationW/2
                    }                
                    curTick.label.css("left", finalLeft)                    
                }
            }
            else { // vertical
                x = (_size - 1) - x;
                shift = ticksInfo[i].height / 2;
                if (minTicks) {
                    if (i == 0) shift = 0;
                    else if (i == len - 1) shift *= 2;
                }
                else {
                    // if (i == 0 && x + shift > _size) shift *= 2;
                    // else if (i == len - 1 && x < shift) shift = 0;
                }

                if (!_ticks[i].invisible) ctx.fillRect(1, x, InteractiveDataDisplay.tickLength, 1);
                // if (_ticks[i].label) {
                //     _ticks[i].label.css("top", x - shift);
                //     if (_mode == "left") 
                //         _ticks[i].label.css("left", text_size - (this.rotateLabels ? ticksInfo[i].height : ticksInfo[i].width));
                // }
                if (curTick.label) {
                    var h = curTickInfo.height // the height of the div after the label rotation is applied
                    var beforeRotationH = curTick.label._size.height // this is plain height (before the CSS rotation is applied)                
                    if(isIntervalLabel) {                                            
                        if(prevTickInfo.position <0 ) { // part of the interval is clipped by the visible rect, we can recenter the label
                            // interval goes downward
                            if(nextTickInfo.position >= h) { // is it possible to fit the whole label?
                                // placing the label in the centre of the vacant area
                                var vacantSpaceMiddleCoord = (0.0 + nextTickInfo.position) * 0.5
                                var topCornerBeforeRotation = vacantSpaceMiddleCoord + beforeRotationH*0.5
                                var cssCoords = (_size-1) - topCornerBeforeRotation // switching to CSS coords system ("top") property
                                curTick.label.css("top", cssCoords)
                            } else {
                                // sticking the label maximum to the top (to the next interval bound)
                                var topCornerBeforeRotation = nextTickInfo.position - (h-beforeRotationH)*0.5
                                var cssCoords = (_size-1) - topCornerBeforeRotation // switching to CSS coords system ("top") property
                                curTick.label.css("top", cssCoords)
                            }
                        } else if (nextTickInfo.position > _size) { 
                            // part of interval is clipped by the visible rect from right side
                            // interval partially gone upward
                            // we can recentre the label
                            if(_size - prevTickInfo.position >= h) { // is it possible to fit the whole label?
                                // placing the label in the centre of the vacant area
                                var vacantSpaceMiddleCoord = (prevTickInfo.position + _size) * 0.5
                                var topCornerBeforeRotation = vacantSpaceMiddleCoord + beforeRotationH*0.5
                                var cssCoords = (_size-1) - topCornerBeforeRotation // switching to CSS coords system ("top") property
                                curTick.label.css("top", cssCoords)
                            } else {
                                // sticking the label maximum to the bottom (to the previous interval bound)
                                var topCornerBeforeRotation = prevTickInfo.position + (h+beforeRotationH)*0.5
                                var cssCoords = (_size-1) - topCornerBeforeRotation // switching to CSS coords system ("top") property
                                curTick.label.css("top", cssCoords)
                            }
                        }
                        else
                            curTick.label.css("top", x - beforeRotationH/2)    
                    } else {
                        curTick.label.css("top", x - beforeRotationH/2)
                    }                
                }
            }
        }

        // get and draw minor ticks
        var smallTicks = _tickSource.getSmallTicks(_ticks);
        if (smallTicks.length > 0) {
            // check for enough space
            var l = Math.abs(that.getCoordinateFromTick(smallTicks[1]) - that.getCoordinateFromTick(smallTicks[0]));
            for (var k = 1; k < smallTicks.length - 1; k++) {
                l = Math.min(l, Math.abs(that.getCoordinateFromTick(smallTicks[k + 1]) - that.getCoordinateFromTick(smallTicks[k])));
            }

            if (l >= InteractiveDataDisplay.minTickSpace) {
                for (var i = 0, len = smallTicks.length; i < len; i++) {
                    x = that.getCoordinateFromTick(smallTicks[i]);
                    if (_mode == "bottom") ctx.fillRect(x, 1, 1, smallTickLength);
                    else if (_mode == "top") ctx.fillRect(x, InteractiveDataDisplay.tickLength - smallTickLength, 1, smallTickLength);
                    else if (_mode == "left") ctx.fillRect(InteractiveDataDisplay.tickLength - smallTickLength, (_size - 1) - x, smallTickLength, 1);
                    else if (_mode == "right") ctx.fillRect(1, (_size - 1) - x, smallTickLength, 1);
                }
            }
        }
    };
    
    this.renderToSvg = function (svg) {
        var axisDivHeight = that.host.height()
        var axisDivWidth = that.host.width()

        // TODO: add clipping to clip the labels that span 
        // var origSvg = svg
        // var clip = svg.clip()
        // var clipRect = svg.rect(0,0,axisDivWidth,axisDivHeight)
        // var groupForClip = svg.group()
        // clip.add(groupForClip)
        // svg = clip

        var path = "";
        var drawHLine = function(x,y,w) {
            path += "M" + x + " " + y + "h" + w; 
        };
        var drawVLine = function(x,y,h) {
            path += "M" + x + " " + y + "v" + h; 
        };

        var textShift;
        var baseline;
        // render base line
        if (isHorizontal) {
            baseline = _height-1;
            if (_mode == "bottom"){
                drawHLine(0,0,_size);
                textShift = InteractiveDataDisplay.tickLength - textOffset;
            } else { // top
                drawHLine(0, baseline, _size);
                textShift = -textOffset;
            }
        }
        else {
            baseline = _width-1;
            if (_mode == "right"){ 
                drawVLine(0, 0, _size);
                textShift = InteractiveDataDisplay.tickLength + textOffset;
            }
            else {
                drawVLine(baseline,0,_size);
                textShift = 0;
            }
        }        

        svg.size(axisDivWidth,axisDivHeight)
        
        // render ticks and labels (if necessary)
        // if range is single point - render only label in the middle of axis
        var x, shift;
        var len = _ticks.length;
        var _fontSize, fontFamily;
        if(len > 0){
            var firstLabel = undefined;
            for (i = 0 ; i < _ticks.length; i++) {
                if (_ticks[i] && _ticks[i].label) {
                    firstLabel = _ticks[i].label[0];
                    break;
                }
            }
            var style = window.getComputedStyle(firstLabel, null);
            fontFamily = style ? style.getPropertyValue('font-family') : undefined;
            if(customFontSize){
                _fontSize = fontSize;
            }else{
                _fontSize = style ? parseFloat(style.getPropertyValue('font-size')): undefined; 
            }
        }
        var axisDocumentOffset = that.host.offset()
        var labelsDivDocumentOffset = labelsDiv.offset()
        // these two are labels divs offset relative to its parent: axis div
        var labelsDivRelativeX = labelsDivDocumentOffset.left - axisDocumentOffset.left
        var labelsDivRelativeY = labelsDivDocumentOffset.top - axisDocumentOffset.top
        for (var i = 0; i < len; i++) {
            x = ticksInfo[i].position;
            if(!_ticks[i].label  && ((x < 0) || (x > _size))) // the tick is out of visible range
                continue
            var rotWidth = ticksInfo[i].width // width, height after rotation applied        
            
            if (isHorizontal) { // horizontal (top and bottom)                
                if (!_ticks[i].invisible) {
                    if(_mode == "top") drawVLine(x, baseline, -InteractiveDataDisplay.tickLength);
                    else drawVLine(x, 0, InteractiveDataDisplay.tickLength); // bottom long tick
                }
                
                if (_ticks[i].label) {                    
                    var style = _ticks[i].label instanceof jQuery ? window.getComputedStyle(_ticks[i].label[0], null) : window.getComputedStyle(_ticks[i].label, null);
                    // transform reflects rotation and vertical displasement for horizontal axis

                    
                    var left = parseFloat(style.getPropertyValue("Left")) // horizontal displacement is controlled by Left style
                    var top = 0
                    if (_ticks[i].label.normalShift)
                        top = _ticks[i].label.normalShift // this was saved here (by updateTransform function) to avoid extraction from computedStyle. pure Y shift

                    var labelSvg = _tickSource.renderToSvg(_ticks[i], svg)
                        .font({
                            family: fontFamily,
                            size: _fontSize
                        })
                        
                    // transforms seem to be prepended (first added - last applied)
                    // applying horizontal translation
                    labelSvg.transform({x: left + labelsDivRelativeX})
                    // applying vertical translation
                    labelSvg.transform({y: top + labelsDivRelativeY - 1}, true) // true means prepend transform, not replace it
                    // rotation if needed (applied first)
                    if (_rotateAngle)
                        labelSvg.transform({ rotation: that.rotateAngle}, true)                
                }
            }
            else { // vertical (left and right)
                x = (_size - 1) - x;                

                if (!_ticks[i].invisible)
                    if(_mode == "left") drawHLine(baseline, x, -InteractiveDataDisplay.tickLength);
                    else drawHLine(0, x, InteractiveDataDisplay.tickLength);
                    
                if (_ticks[i].label) {
                    var style = _ticks[i].label instanceof jQuery ? window.getComputedStyle(_ticks[i].label[0], null) : window.getComputedStyle(_ticks[i].label, null);
                    // transform reflects rotation and vertical displacement for horizontal axis

                    
                    var left = 0
                    if(_ticks[i].label.normalShift)
                        left = _ticks[i].label.normalShift // this was saved here (by updateTransform function) to avoid extraction from computedStyle. pure X shift
                    var top = parseFloat(style.getPropertyValue("Top")) // vertical displacement is controlled by Top style
                    
                    var labelSvg = _tickSource.renderToSvg(_ticks[i], svg)
                        .font({
                            family: fontFamily,
                            size: _fontSize
                        })
                        
                    // transforms seem to be prepended (first added - last applied)
                    // applying horizontal translation
                    labelSvg.transform({x: left + labelsDivRelativeX})
                    // applying vertical translation
                    labelSvg.transform({y: top + labelsDivRelativeY}, true) // true means prepend transform, not replace it
                    // rotation if needed (applied first)
                    if (_rotateAngle)
                        labelSvg.transform({ rotation: that.rotateAngle}, true)                      
                }
            }       
        }
        
        // get and draw minor ticks
        var smallTicks = _tickSource.getSmallTicks(_ticks);
        if (smallTicks.length > 0) {
            // check for enough space
            var l = Math.abs(that.getCoordinateFromTick(smallTicks[1]) - that.getCoordinateFromTick(smallTicks[0]));
            for (var k = 1; k < smallTicks.length - 1; k++) {
                l = Math.min(l, Math.abs(that.getCoordinateFromTick(smallTicks[k + 1]) - that.getCoordinateFromTick(smallTicks[k])));
            }

            if (l >= InteractiveDataDisplay.minTickSpace) {
                for (var i = 0, len = smallTicks.length; i < len; i++) {
                    x = that.getCoordinateFromTick(smallTicks[i]);
                    if (_mode == "bottom") drawVLine(x, 0, smallTickLength);
                    else if (_mode == "top") drawVLine(x, baseline, -smallTickLength);
                    else if (_mode == "left") drawHLine(baseline, _size - x, -smallTickLength);
                    else if (_mode == "right") drawHLine(0.5, _size - x, smallTickLength);
                }
            }
        } 
        svg.path(path).stroke(strokeStyle).fill('none');

        // svg = origSvg        
        // clipRect.clipWith(clip) 
    };

    /// Renders an exis to the svg and returns the svg object.
    this.exportToSvg = function () {
        if (!SVG.supported) throw "SVG is not supported";
        
        var svgHost = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var svg = SVG(svgHost).size(_host.width(), _host.height());
        that.renderToSvg(svg);
        return svg;
    };

    // append all new label divs to host and add class for them
    var addNewLabels = function (ticks) {
        var label;
        for (var i = 0, len = ticks.length; i < len; i++) {
            label = ticks[i].label;
            if (label && !label.hasClass('idd-axis-label')) {
                var labelDiv = label[0];
                labelsDiv[0].appendChild(labelDiv);
                label.addClass('idd-axis-label');
                label._size = { width: labelDiv.offsetWidth, height: labelDiv.offsetHeight };
                if(customFontSize){
                    label.css("fontSize", fontSize);
                }
            }
        }
    };

    // function to set new _range
    this.update = function (newPlotRange) {
        if (newPlotRange) _range = newPlotRange;
        render();
    };

    // clears host element
    this.destroy = function () {
        _host[0].innerHTML = "";
        _host.removeClass("idd-axis");
        _host.removeClass("unselectable");
    };

    // destroys axis and removes it from parent
    this.remove = function () {
        var parent1 = _host[0].parentElement;
        if (parent1) {
            parent1.removeChild(_host[0]);
            var parent2 = parent1.parentElement;
            if (parent2 && (parent2.className == "idd-plot-master" || parent2.classList && parent2.classList.contains("idd-plot-master"))) {
                parent2.plot.removeDiv(parent1);
            }
        }
        this.destroy();
    };

    if (div) {
        render();
        div.addClass("idd-axis");
        div.addClass("unselectable");
    }
}

// decimal axis
// supports custom data transform
InteractiveDataDisplay.NumericAxis = function (div) {
    this.base = InteractiveDataDisplay.TicksRenderer;
    div[0].axis = this;

    var that = this;
    var inScientificNotation = true;
    var precision = 3;

    // DG: seems to be data coord -> screen coord transform
    //     ticks locations are transformed with this function to be put to screen
    this.getCoordinateFromTick = function (x) {
        var delta = this.deltaRange;
        if (isFinite(delta)) {
            var coord = x;
            var transform = this.dataTransform;
            if (transform) {
                coord = transform.dataToPlot(x);
            }
            return (coord - this.range.min) * delta;
        }
        else return this.axisSize / 2;
    };

    var scientificNotationAttr = div.attr("data-idd-scientific-notation");
    if(typeof scientificNotationAttr !== 'undefined'){
        if(scientificNotationAttr == "false" || scientificNotationAttr == "disable" || scientificNotationAttr == "disabled") inScientificNotation = false;
    }
    else inScientificNotation = false;
    this.base(div, new InteractiveDataDisplay.NumericTickSource(inScientificNotation));
}
InteractiveDataDisplay.NumericAxis.prototype = new InteractiveDataDisplay.TicksRenderer;

InteractiveDataDisplay.LogarithmicAxis = function (div) {
    this.base = InteractiveDataDisplay.TicksRenderer;

    this.getCoordinateFromTick = function (x) {
        var delta = this.deltaRange;
        if (isFinite(delta)) {
            var coord = InteractiveDataDisplay.Utils.log10(x);
            return (coord - this.range.min) * delta;
        }
        else return this.axisSize / 2;
    };

    this.base(div, new InteractiveDataDisplay.LogarithmicTickSource());
}
InteractiveDataDisplay.LogarithmicAxis.prototype = new InteractiveDataDisplay.TicksRenderer;

// axis with string labels (passed as array)
// supports data transform
InteractiveDataDisplay.LabelledAxis = function (div, params) {
    this.base = InteractiveDataDisplay.TicksRenderer;
    var that = this;

    // DG: seems to be data coord -> screen coord transform
    //     ticks locations are transformed with this function to be put to screen
    this.getCoordinateFromTick = function (x) {
        var delta = this.deltaRange;
        if (isFinite(delta)) {
            var coord = x;
            if (this.dataTransform) {
                coord = this.dataTransform.dataToPlot(x);
            }
            return (coord - this.range.min) * delta;
        }
        else return this.axisSize / 2;
    };

    this.updateLabels = function (params) {
        this.tickSource = new InteractiveDataDisplay.LabelledTickSource(params);
        if (params && params.rotate)
            this.rotateLabels = true;
        this.rotateAngle = params && params.rotateAngle ? params.rotateAngle : 0;
    };

    if (params && params.rotate)
        this.rotateLabels = true;            

    this.base(div, new InteractiveDataDisplay.LabelledTickSource(params));
    this.rotateAngle = params && params.rotateAngle ? params.rotateAngle : 0;

    // returns the string, that depicts the supplied data coordinate (associated label)    
    this.getToolTip = function(dataCoord) {
        // the function returns the tooltip only for the named intervals (e.g. when Ticks count is one more than labels count)
        var dataToPlot = function(x) { return that.dataTransform ? that.dataTransform(x) : x }
        var plotCoord = dataToPlot(dataCoord)
                    
        // finding "invisible" tick (tick hidden, label visible) after unlabeled visible tick
        var lessThanIndex = undefined
        var moreThanIndex = undefined
        for(var i=0; i<that.ticks.length; i++) {
            var curTick = that.ticks[i]
            if(curTick.text) // we skip labeled invisible ticks, analyzing only unlabled ones
                continue
            var curPlotCoord = dataToPlot(curTick.position)
            if(curPlotCoord>plotCoord && !moreThanIndex)
                moreThanIndex = i
            if(curPlotCoord<plotCoord)
                lessThanIndex = i                 
        }
        if(moreThanIndex && !lessThanIndex) {
            // left interval bound is out of visible region, right is inside
            if(that.ticks[moreThanIndex-1] && that.ticks[moreThanIndex-1].text)
                return that.ticks[moreThanIndex-1].text
        } else if (lessThanIndex && !moreThanIndex) {
            // right interval bound is out of visible region, left is inside
            if(that.ticks[lessThanIndex+1] && that.ticks[lessThanIndex+1].text)
                return that.ticks[lessThanIndex+1].text
        } else if (lessThanIndex && moreThanIndex && (moreThanIndex-lessThanIndex == 2)) {
            // left and right interval bounds are inside visible regions
            return that.ticks[lessThanIndex+1].text
        }                   
        return undefined
    }

    return this;
}
InteractiveDataDisplay.LabelledAxis.prototype = new InteractiveDataDisplay.TicksRenderer;

// object that provides functions to calculate ticks by given range
InteractiveDataDisplay.TickSource = function () {

    var divPool = [];
    var isUsedPool = [];
    var inners = [];
    var styles = [];
    var len = 0;

    this.start;
    this.finish;
    this.precision = 3;

    this.insertNumericTick = function (divjq, inner, inScientificNotation){
        var precision = 2;
        divjq.empty();
        if((typeof inner !== "string") || !inScientificNotation){
            divjq.append(inner);
        }
        else{
            var innerParsed = parseFloat(inner);
            if(isNaN(innerParsed)){
                divjq.text(inner);
            }
            else{
                if(Math.abs(innerParsed) < Math.pow(10,-precision) || Math.abs(innerParsed) >= Math.pow(10,precision+1))
                    divjq.append(InteractiveDataDisplay.Utils.getInScientificNotation(innerParsed));
                else
                    divjq.text(innerParsed);
            }
        }
    }

    // gets first available div (not used) or creates new one
    this.getDiv = function (x, isScientific) {
        var isInScientificNotation = (typeof isScientific === "undefined") ? false : isScientific;
        var inner = this.getInner(x);
        var i = inners.indexOf(inner);
        if (i != -1) {
            isUsedPool[i] = true;
            styles[i].display = "block";
            var div = divPool[i][0];
            divPool[i]._size = { width: div.offsetWidth, height: div.offsetHeight };
            return divPool[i];
        }
        else {
            var i = isUsedPool.indexOf(false);
            if (i != -1) {
                isUsedPool[i] = true;
                styles[i].display = "block";
                inners[i] = inner;
                var $div = divPool[i];                
                this.insertNumericTick($div, inner, isInScientificNotation);
                var div = $div[0];
                $div._size = { width: div.offsetWidth, height: div.offsetHeight };
                return divPool[i];
            }
            else {
                var $div = $("<div></div>");
                this.insertNumericTick($div, inner, isInScientificNotation);
                isUsedPool[len] = true;
                divPool[len] = $div;
                inners[len] = inner;
                styles[len] = $div[0].style;
                $div._size = undefined;
                len++;
                return $div;
            }
        }
    };

    // function to get div's innerText
    this.getInner = function (x) {
        if (x) {
            return x.toString();
        }
        return undefined;
    };

    this.invalidate = function() {
        for(var i = 0; i < divPool.length; i++){
            divPool[i].remove();
        }
        isUsedPool = [];
        divPool = [];
        inners = [];
        styles = [];
        len = 0;
    };

    // make all not used divs invisible (final step)
    this.refreshDivs = function () {
        for (var i = 0; i < len; i++) {
            if (isUsedPool[i]) isUsedPool[i] = false;
            else styles[i].display = "none";
        }
    };

    // calculates ticks for specific range (main and first function to call)
    this.getTicks = function (_range) {
        this.start = _range.min;
        this.finish = _range.max;
    };
    // function that decreases number of ticks and returns new array
    this.decreaseTickCount = function () {
    };
    // function that increases number of ticks and returns new array
    this.increaseTickCount = function () {
    };
}

// rounds value (x) to specific number (n) of decimal digits
InteractiveDataDisplay.Utils.round = function (x, n) {
    if (n <= 0) {
        if (-n > 15) return parseFloat(x.toFixed(15));
        return parseFloat(x.toFixed(-n));
    }
    else {
        var degree = Math.pow(10, n - 1);
        return Math.round(x / degree) * degree;
    }
}

// Represents a float number in a scientific notation (normalized):
// m × 10^n, where the exponent n:integer "order of magnitude" (0<|n|), and the coefficient m:real "significand/mantissa" (0<=|m|<10)
// when n >= prec parameter. Returns original float otherwise.
// Used when a number is too big or too small to be conveniently written in decimal form.
InteractiveDataDisplay.Utils.getInScientificNotation = function (floatNumber, prec, returnObject){
    var decPow = 0;
    var unsignedInner = Math.abs(floatNumber);
    var innerSign = floatNumber < 0 ? -1 : 1;
    var precision = (typeof prec === "undefined") ? 3 : prec;
    var returnAsObject = (typeof returnObject === "undefined") ? false : returnObject;
    if(unsignedInner > 1){
        var countZerosInner = unsignedInner;            
        while((countZerosInner >= 10) && (countZerosInner%10 == 0)){
            decPow++;
            countZerosInner = countZerosInner/10;
        }
        if(decPow < precision){ 
            decPow = 0; // indicates that scientific notation is not enforced
        }
        else{
            decPow = Math.floor(Math.log10(unsignedInner));
            unsignedInner = unsignedInner / Math.pow(10, Math.floor(Math.log10(unsignedInner)));
        }
    }
    else if(unsignedInner <= 1 && unsignedInner>0){
        // close to 0.0        
        decPow = Math.floor(Math.log10(unsignedInner));
        if(decPow > -1*precision){ 
            decPow = 0; // indicates that scientific notation is not enforced
        }
        else{
            decPow = Math.floor(Math.log10(unsignedInner));
            unsignedInner = unsignedInner / Math.pow(10, Math.floor(Math.log10(unsignedInner)));
            // to prevent precision related issues like 5.9999999999999 x 10^-4 I round here
            var m = 1e6;
            unsignedInner = Math.round(unsignedInner*m)/m;
        }
    }

    var resultStr = "";
    if(unsignedInner != 0) resultStr += innerSign*unsignedInner;
    else resultStr = "0";
    if(decPow != 0) resultStr += "&#215;10<sup>" + decPow + "</sup>";
    if(!returnAsObject)
        return resultStr;
    else
        return { "m": innerSign*unsignedInner, "pow": decPow };
};

// tick source for decimal axis
InteractiveDataDisplay.NumericTickSource = function (isInScientificNotation) {    
    this.base = InteractiveDataDisplay.TickSource;
    this.base();
    
    this.isScientific = (typeof isInScientificNotation === "undefined") ? false : isInScientificNotation;

    var delta, beta;

    var that = this;

    this.getInner = function (x, prec) {
        var minNumOrder = (typeof prec === "undefined") ? InteractiveDataDisplay.minNumOrder : prec;
        if (x == 0) return x.toString();
        else if (beta >= minNumOrder){
            var str = InteractiveDataDisplay.Utils.round(x / Math.pow(10, beta), -1) + "e+" + beta;
            return str;
        }
        return InteractiveDataDisplay.Utils.round(x, beta).toString();
    };

    this.getMPow = function (x, prec) {
        var minNumOrder = (typeof prec === "undefined") ? 3 : prec;
        if (x == 0) return { "m": x, "pow": 0 };
        else if (beta >= minNumOrder){
            return  { "m": InteractiveDataDisplay.Utils.round(x / Math.pow(10, beta), -1) , "pow": beta };
        }
        return { "m": InteractiveDataDisplay.Utils.round(x, beta), "pow": 0 };
    };

    this.getTicks = function (_range) {
        InteractiveDataDisplay.NumericTickSource.prototype.getTicks.call(this, _range);

        delta = 1;
        beta = Math.floor(InteractiveDataDisplay.Utils.log10(this.finish - this.start));

        return createTicks();
    };
    
    this.renderToSvg = function (tick, svg) {
        if(that.isScientific){
            var mPow = InteractiveDataDisplay.Utils.getInScientificNotation(tick.position, 3, true);
            return svg.text(function(add) {
                add.tspan(mPow.m).dy(18)
                if(mPow.pow != 0){
                    add.tspan('\u00D7')
                    add.tspan('10')
                    add.tspan(mPow.pow).style("font-size", "0.8em").dy(-10)
                }
            })
        }
        else{
            return svg.text(that.getInner(tick.position));
        }
    }

    var createTicks = function () {
        var ticks = [];

        if (that.start > that.finish) return ticks;

        if (isFinite(beta)) {
            var step = delta * Math.pow(10, beta);

            // calculate count of ticks to create
            var min = Math.floor(that.start / step);
            var count = Math.floor(that.finish / step) - min + 2;

            // calculate rounded ticks values
            var l = 0;
            var x0 = min * step;
            var x;
            for (var i = 0; i < count; i++) {
                x = x0 + i * step;
                if (x >= that.start && x <= that.finish) {
                    ticks[l] = { position: x, label: that.getDiv(x, that.isScientific) };
                    l++;
                }
            }
        }
        else {
            ticks[0] = { position: that.start, label: that.getDiv(that.start, that.isScientific), invisible: true };
        }

        that.refreshDivs();

        return ticks;
    };

    this.decreaseTickCount = function () {
        if (delta == 1) {
            delta = 2;
        }
        else if (delta == 2) {
            delta = 5;
        }
        else if (delta == 5) {
            delta = 1;
            beta++;
        }
        return createTicks();
    };
    this.increaseTickCount = function () {
        if (delta == 1) {
            delta = 5;
            beta--;
        }
        else if (delta == 2) {
            delta = 1;
        }
        else if (delta == 5) {
            delta = 2;
        }
        return createTicks();
    };

    // constructs array of small ticks
    this.getSmallTicks = function (ticks) {
        var smallTicks = [];
        var l = 0;
        if (ticks.length > 1) {
            var x = ticks[0].position;
            var dx = Math.abs(ticks[1].position - x) / 10;
            x -= dx;
            while (x > this.start && l < 10) {
                smallTicks[l] = x;
                l++;
                x -= dx;
            }
            var length = ticks.length;
            for (var i = 0; i < length - 1; i++) {
                x = ticks[i].position + dx;
                for (var j = 0; j < 9; j++) {
                    smallTicks[l] = x;
                    l++;
                    x += dx;
                }
            }
            x = ticks[length - 1].position + dx;
            var k = 0;
            while (x < this.finish && k < 10) {
                smallTicks[l] = x;
                l++;
                x += dx;
                k++;
            }
        }
        return smallTicks;
    };

    this.getMinTicks = function () {
        var ticks = [];

        beta = Math.floor(InteractiveDataDisplay.Utils.log10(this.finish - this.start));

        if (isFinite(beta)) {
            var step = Math.pow(10, beta);

            var min = Math.floor(that.start / step) * step;
            if (min < that.start) min += step;
            var max = Math.floor(that.finish / step) * step;
            if (max > that.finish) max -= step;

            if (min != max) {
                ticks[0] = { position: min, label: that.getDiv(InteractiveDataDisplay.Utils.round(min, beta)) };
                ticks[1] = { position: max, label: that.getDiv(InteractiveDataDisplay.Utils.round(max, beta)) };
            }
            else {
                beta--;
                delta = 5;
                step = delta * Math.pow(10, beta);

                min = Math.floor(that.start / step);
                var count = Math.floor(that.finish / step) - min + 2;

                // calculate rounded ticks values
                var l = 0;
                var x0 = min * step;
                var x;
                for (var i = 0; i < count; i++) {
                    x = x0 + i * step;
                    if (x >= that.start && x <= that.finish) {
                        ticks[l] = { position: x, label: that.getDiv(InteractiveDataDisplay.Utils.round(x, beta)) };
                        l++;
                    }
                }
            }
        }
        else {
            ticks[0] = { position: that.start, label: that.getDiv(that.start), invisible: true };
        }

        this.refreshDivs();

        return ticks;
    };
}
InteractiveDataDisplay.NumericTickSource.prototype = new InteractiveDataDisplay.TickSource;

// tick source for logarithmic axis
InteractiveDataDisplay.LogarithmicTickSource = function () {
    this.base = InteractiveDataDisplay.TickSource;
    this.base();

    var that = this;

    var delta = 1;
    var deltaX = 10;
    var start, finish;

    // redefined function for innerText - if degree is less than specific constant then render full number otherwise render 10 with degree
    this.getInner = function (x) {
        if (Math.abs(x) < InteractiveDataDisplay.minLogOrder)
            return Math.pow(10, x).toString();
        else {
            var html = "10<sup>" + x + "</sup>";
            var element = document.createElement("span");
            element.innerHTML = html;
            return element;
        }
    };

    this.renderToSvg = function (tick, svg) {
        var inner = tick.position;
        return svg.text(inner.toString());
        // todo: render exponential form in a special graphic representation
    }

    this.getTicks = function (_range) {
        InteractiveDataDisplay.LogarithmicTickSource.prototype.getTicks.call(this, _range);
        start = Math.pow(10, this.start);
        finish = Math.pow(10, this.finish);
        return createTicks();
    };    

    var createTicks = function () {
        var ticks = [];
        if (isFinite(Math.pow(10, -that.start)) && isFinite(finish)) {
            if (start == finish) {
                ticks[0] = { position: that.start, label: that.getDiv(that.start), invisible: true };
            }
            else {
                var x0 = (that.start / delta) | 0;
                var count = ((that.finish / delta) | 0) - x0 + 3;

                var order = (x0 - 1) * delta;
                var x = Math.pow(10, order);
                var l = 0;
                for (var i = 0; i < count; i++) {
                    if (x >= start && x <= finish) {
                        ticks[l] = { position: x, label: that.getDiv(order) };
                        l++;
                    }
                    order += delta;
                    x *= deltaX;
                }
            }
        }
        that.refreshDivs();
        return ticks;
    };

    this.decreaseTickCount = function () {
        delta *= 2;
        deltaX = Math.pow(10, delta);
        return createTicks();
    };
    this.increaseTickCount = function () {
        if (delta > 1) {
            delta /= 2;
            deltaX = Math.pow(10, delta);
        }
        return createTicks();
    };

    // constructs array of small ticks
    this.getSmallTicks = function (ticks) {
        var smallTicks = [];
        var finite = isFinite(Math.pow(10, -that.start)) && isFinite(finish);
        var l = 0;
        if (ticks.length > 0 && delta == 1 && finite) {
            var x = ticks[0].position;
            var dx = x / 10;
            x -= dx;
            while (x > start && l < 10) {
                smallTicks[l] = x;
                l++;
                x -= dx;
            }
            var length = ticks.length;
            for (var i = 0; i < length - 1; i++) {
                x = ticks[i].position;
                dx = (ticks[i + 1].position - x) / 10;
                x += dx;
                for (var j = 0; j < 9; j++) {
                    smallTicks[l] = x;
                    l++;
                    x += dx;
                }
            }
            x = ticks[length - 1].position;
            dx = x;
            x += dx;
            while (x < finish) {
                smallTicks[l] = x;
                l++;
                x += dx;
            }
        }

        return smallTicks;
    };

    this.getMinTicks = function () {
        var ticks = [];

        var finite = isFinite(Math.pow(10, -that.start)) && isFinite(finish);
        if (!finite) {
            ticks[0] = { position: 1, label: that.getDiv(0) };
            this.refreshDivs();
        }
        else if (start == finish) {
            ticks[0] = { position: that.start, label: that.getDiv(that.start), invisible: true };
            this.refreshDivs();
        }

        return ticks;
    };
}
InteractiveDataDisplay.LogarithmicTickSource.prototype = new InteractiveDataDisplay.TickSource;

// tick source for labelled axis (labels as finite array of strings)
InteractiveDataDisplay.LabelledTickSource = function (params) {
    this.base = InteractiveDataDisplay.TickSource;
    this.base();

    var that = this;

    var _labels = [];
    var _ticks = []; // DG: Seems that it is in data coords, as the coords are later processed with getCoordinateFromTick

    // if labels and ticks are defined - cache them
    // if ticks are undefined - they are calculated as an array of integers from 0 to length of labels
    if (params && params.labels) {
        var len = params.labels.length;
        for (var i = 0; i < len; i++)
            _labels[i] = params.labels[i].toString();

        if (!params.ticks) {
            for (var i = 0; i < len; i++)
                _ticks[i] = i;
        }
        else
            _ticks = params.ticks;
    }

    var step = 1;
    var min, max;
    var delta = _ticks.length - _labels.length;

    var rotateLabels = params && params.rotate ? params.rotate : false;

    this.getInner = function (x) {
        var hasNewLines = typeof x === "string" && x.indexOf("\n") !== -1;
        if (!hasNewLines)
            return x.toString();
        else {
            var element = document.createElement("span");
            element.title = x;
            element.innerText = x;
            $(element).css("white-space", "pre");
            return element;
        }
    };

    this.renderToSvg = function (tick, svg) {
        var text = tick.text ? tick.text : "";
        return svg.text(text);
    }

    this.getTicks = function (_range) {
        InteractiveDataDisplay.LabelledTickSource.prototype.getTicks.call(this, _range);
        step = 1;
        if (delta <= 0) {
            var i1 = 0;
            var i2 = _ticks.length - 1;
            var value = (this.start) | 0;
            if (value > _ticks[i1]) {
                while (i2 - i1 > 1) {
                    var mid = Math.round((i1 + i2) / 2);
                    if (_ticks[mid] < value) i1 = mid;
                    else i2 = mid;
                }
            }
            min = i1;

            i1 = 0;
            i2 = _ticks.length - 1;
            value = (this.finish) | 0 + 1;
            if (value < _ticks[i2]) {
                while (i2 - i1 > 1) {
                    var mid = Math.round((i1 + i2) / 2);
                    if (_ticks[mid] < value) i1 = mid;
                    else i2 = mid;
                }
            }
            max = i2;

            if (max > min) {
                var tempStep = (_ticks.length - 1) / (max - min);
                while (step < tempStep) step *= 2;
            }
        }

        return createTicks();
    };

    /// returns a "ticks" array, containing positions, div, text, etc
    /// uses _ticks var as input
    var createTicks = function () {

        var ticks = [];

        // if length of labels and ticks are equal - render each label under specific tick
        if (delta <= 0) {

            var currStep = Math.floor((_ticks.length - 1) / step);

            if (currStep > _ticks.length - 1)
                currStep = _ticks.length - 1;
            else if (currStep < 1)
                currStep = 1;

            var m = 0;
            var value = (that.start) | 0;
            while (_ticks[m] < value) m += currStep;
            if (m - currStep >= 0 && _ticks[m] > value) m -= currStep;

            var count = (max - min + 1);

            var l = 0;
            for (var i = 0; i < count; i++) {
                value = _ticks[m];
                if (value >= that.start && value <= that.finish) {
                    var div = that.getDiv(_labels[m]);
                    if (rotateLabels) {
                        div.addClass('idd-verticalText');
                    }
                    ticks[l] = { position: value, label: div, text: _labels[m] };
                    l++;
                }
                m += currStep;
            }
        }
            // otherwise render label between two neighbouring ticks
        else {
            var m1 = 0;
            // some pregenerated _ticks may be to the left of visible range
            // finding the index (m1) of the first one which is visible
            while (_ticks[m1] < that.start) m1++;
            if (m1 > 0) m1--; // one step back, m1 contains the first out of screen tick to the left
            // m1 is either the leftmostmost visible tick or the first out of screen to the left

            // finding m2 index
            // again, m2 is either rightmost visible tick index or the first out of screen tick to the right of visible range
            var m2 = _ticks.length - 1;
            while (_ticks[m2] > that.finish) m2--;
            if (m2 < _ticks.length - 1) m2++;

            var count = m2 - m1 + 1;
            var l = 0;
                        
            var nextBoundPos = _ticks[m1]; // _tick contains the position of named interval bounds
            for (var i = 0; i < count; i++) {
                boundPos = nextBoundPos
                //if (boundPos >= that.start && boundPos <= that.finish) {
                    ticks[l] = { position: boundPos }; // visible tick at interval bound
                    l++;
                //}
                m1++;
                var nextBoundPos = _ticks[m1]; // the next bound after the just added
                var scale = 1;
                if (step > 1) scale /= step;
                if (i != count - 1) { // if not last                    
                    // it is invisible 
                    var lebelPos = (boundPos + nextBoundPos) / 2;                    
                    var div = that.getDiv(_labels[m1 - 1]);
                    if (rotateLabels) { // DG: Is rotate labels sitll used? We have rotate angle now
                        div.addClass('idd-verticalText');
                        div.css("transform", "rotate(-90deg) scale(" + scale + ", " + scale + ")");
                    }
                    ticks[l] = { position: lebelPos, label: div, invisible: true, text: _labels[m1-1] };
                    // ticks[l] = { position: lebelPos, label: div, text: _labels[m1-1] };
                    l++;                    
                }
            }
        }
        that.refreshDivs();
        return ticks;
    };

    this.decreaseTickCount = function () {
        if (delta <= 0) step /= 2;
        else step++;
        return createTicks();
    };
    this.increaseTickCount = function () {
        if (delta <= 0) step *= 2;
        else step--;
        return createTicks();
    };
    
    /// result - returned by checkLabelsArrangement
    /// due to rotation the position correction can be needed
    this.updateTransform = function (result, rotateAngle, isHorizontal) {
        var ticks = createTicks();
        for (var i = 0; i < ticks.length; i++) {
            if (ticks[i].label) {
                var div = ticks[i].label;
                
                var degRotAngle = rotateAngle/Math.PI*180.0                

                var w = div._size.width // the sizes is prior to rotation
                var h = div._size.height

                var posAngle = Math.abs(rotateAngle)
                var sinA = Math.sin(posAngle)
                var cosA = Math.cos(posAngle)                

                // transforms are applied from right to left
                var transformValue ='rotate(' + degRotAngle + 'deg)'
                if(isHorizontal) {
                    var vertShift = 0.5 * (w*sinA+ h*cosA - h)
                    var transformValue = 'translateY('+vertShift+'px)' + transformValue
                    div.normalShift = vertShift // saving shift in a direction normal to axis (to be used is SVG export, to avoid extracting this info from matrix of transform series)
                } else {                                        
                    var horShift =  - 0.5*(w - (w*cosA+h*sinA))
                    var transformValue = 'translateX('+horShift+'px)' + transformValue
                    div.normalShift = horShift // saving shift in a direction normal to axis (to be used is SVG export, to avoid extracting this info from matrix of transform sereis)
                }
                
                div.css("-webkit-transform", transformValue);
                div.css("-moz-transform", transformValue);
                div.css("-ms-transform", transformValue);
                div.css("-o-transform", transformValue);
                div.css("transform", transformValue);                                
            }
        }
        return ticks;
    }

    // constructs array of small ticks
    this.getSmallTicks = function (ticks) {
        var smallTicks = [];

        if (delta <= 0) {
            var l = 0;
            var k = 0;
            for (var i = 0; i < _ticks.length; i++) {
                if (ticks.length > k && _ticks[i] == ticks[k].position) k++;
                else {
                    smallTicks[l] = _ticks[i];
                    l++;
                }
            }
        }

        return smallTicks;
    };

    this.getMinTicks = function () {
        var ticks = [];

        if (delta <= 0 && _labels.length > 0) {
            var div = that.getDiv(_labels[0]);
            if (rotateLabels) {
                div.addClass('idd-verticalText');
            }
            ticks[0] = { position: _ticks[0], label: div, text: _labels[0] };

            div = that.getDiv(_labels[_labels.length - 1]);
            if (rotateLabels) {
                div.addClass('idd-verticalText');
            }
            ticks[1] = { position: _ticks[_ticks.length - 1], label: div, text: _labels[_labels.length - 1] };
            that.refreshDivs();
        }
        return ticks;
    };
}
InteractiveDataDisplay.LabelledTickSource.prototype = new InteractiveDataDisplay.TickSource;

InteractiveDataDisplay.TicksRenderer.getAxisType = function (dataTransform) {
    if (dataTransform === undefined)
        return 'numeric';
    if (!dataTransform.type)
        return 'numeric';
    else if (dataTransform.type == 'log10')
        return 'log';
    else
        return 'numeric';
}
;InteractiveDataDisplay = InteractiveDataDisplay || {};

// Represents a mapping from a number to a value (e.g. a color)
// The function color has an domain [min,max]. If type is absolute, min and max are arbitrary numbers such that max>min.
// If type is relative, min=0,max=1, and a user of the palette should normalize the values to that range.
// Argument of the color is normalized to the domain of the function
// palettePoints is an array of hslaColor.
InteractiveDataDisplay.ColorPalette = function (isNormalized, range, palettePoints) {

    var _isNormalized;
    var _range;
    var _points; // Structure: { x : number, leftColor? : string, rightColor? : string }
    var that = this;

    Object.defineProperty(this, "isNormalized", { get: function () { return _isNormalized; }, configurable: false });
    Object.defineProperty(this, "range", { get: function () { return _range; }, configurable: false });
    Object.defineProperty(this, "points", { get: function () { return _points; }, configurable: false });

    _isNormalized = isNormalized;
    if (_isNormalized) _range = { min: 0, max: 1 };
    else _range = { min: range.min, max: range.max };

    if (_range.min >= _range.max) throw "range is incorrect (min >= max)";

    if (palettePoints == undefined) throw "points are undefined";
    if (palettePoints.length < 2) throw "Palette should have at least two points";
    _points = palettePoints.slice(0);

    this.getRgba = function (value) {
        var hsla = that.getHsla(value);
        return InteractiveDataDisplay.ColorPalette.HSLtoRGB(hsla);
    }

    this.getHsla = function (value) {
        var n = _points.length;
        if (value <= _points[0].x) {
            return _points[0].leftColor;
        }
        else if (value >= _points[n - 1].x) {
            return _points[n - 1].rightColor;
        }

        var i1 = 0;
        var i2 = n - 1;
        while (i2 - i1 > 1) {
            var mid = Math.round((i1 + i2) / 2);
            if (_points[mid].x < value) i1 = mid;
            else i2 = mid;
        }
        var p1 = _points[i1];
        if (p1.x == value) i2 = i1;
        var p2 = _points[i2];

        // todo: optimize solid segments
        var alpha = (value - p1.x) / (p2.x - p1.x);

        var c1 = p1.rightColor; // hsla
        var c2 = p2.leftColor; // hsla

        if (c1.h == 0 && c1.s == 0) c1.h = c2.h;
        if (c2.h == 0 && c2.s == 0) c2.h = c1.h;
        
        var c1h = c1.h;
        var c2h = c2.h;

        if (Math.abs(c2h - c1h) > 3) {
            if (c1h < c2h) c1h += 6;
            else c2h += 6;
        }
        var c = {
            h: c1h + (c2h - c1h) * alpha,
            s: c1.s + (c2.s - c1.s) * alpha,
            l: c1.l + (c2.l - c1.l) * alpha,
            a: c1.a + (c2.a - c1.a) * alpha
        };

        if (c.h >= 6) c.h -= 6;
        return c;
    }

    this.absolute = function (min, max) {
        var n = _points.length;
        var k = (max - min) / (_range.max - _range.min);
        var points = new Array(n);
        for (var i = 0; i < n; i++) {
            var oldp = _points[i];
            points[i] = { x: k * (oldp.x - _range.min) + min, rightColor: oldp.rightColor, leftColor: oldp.leftColor };
        }
        return new InteractiveDataDisplay.ColorPalette(false, { min: min, max: max }, points);
    };

    this.relative = function () {
        if (_isNormalized) return this;

        var n = _points.length;
        var k = 1 / (_range.max - _range.min);
        var points = new Array(n);
        for (var i = 0; i < n; i++) {
            var oldp = _points[i];
            points[i] = { x: k * (oldp.x - _range.min), rightColor: oldp.rightColor, leftColor: oldp.leftColor };
        }
        return new InteractiveDataDisplay.ColorPalette(true, { min: 0, max: 1 }, points);
    };

    this.banded = function (bands) {
        if (!bands) throw "bands is undefined";
        var uniformDistr = false;
        if (typeof bands === 'number') { // we got a number of bands
            if (bands < 1) throw new "number of bands is less than 1";
            uniformDistr = true;
            var nInner = bands - 1;
            var bandW = (_range.max - _range.min) / bands;
            bands = new Array(nInner);
            for (var i = 0; i < nInner; i++)
                bands[i] = (i + 1) * bandW + _range.min;
        }

        // bands contains inner points hence we add two from range
        var n = bands.length + 2; // number of points
        var boundsNumber = bands.length + 1;
        if (n < 2) throw "number of bands is less than 1";
        var points = new Array(n);
        var prevColor = this.getHsla(_range.min);
        var k = boundsNumber > 1 ? (_range.max - _range.min) / (boundsNumber - 1) : 0.5 * (_range.max - _range.min);
        var v, x;
        for (var i = 0; i < n - 1; i++) {
            if (i == 0) {
                v = _range.min;
                x = _range.min;
            } else {
                if (i == n - 2) { // i == bands.length
                    v = _range.max;
                }
                else {
                    if (uniformDistr) {
                        v = _range.min + i * k;
                    } else {
                        v = (bands[i - 1] + bands[i]) / 2;
                    }
                }
                if (x >= bands[i - 1]) throw "bands points are incorrect";
                x = bands[i - 1];
            }
            var color = this.getHsla(v);
            var p = { x: x, rightColor: color, leftColor: prevColor };
            points[i] = p;
            prevColor = color;
        }
        if (x >= _range.max) throw "bands points are incorrect";
        points[n - 1] = { x: _range.max, rightColor: prevColor, leftColor: prevColor };

        return new InteractiveDataDisplay.ColorPalette(_isNormalized, _range, points);
    };

    this.gradientString = function() {
        var colors = InteractiveDataDisplay.ColorPalette.getColorNames();
        var getHexColor = function(hsla){
            var toHex = function(v) {
                var h = v.toString(16);
                while(h.length < 2)
                    h = "0" + h;
                return h;
            }
            var rgba = InteractiveDataDisplay.ColorPalette.HSLtoRGB(hsla);
            var r = toHex(rgba.r);
            var g = toHex(rgba.g);
            var b = toHex(rgba.b);
            var color = "#" + r + g + b;

            var names = Object.keys(colors);            
            for(var i = 0; i < names.length; i++){
                var name = names[i];
                if(colors[name] == color){
                    color = name;
                    break;
                }
            }
            return color;
        }

        var str = "";
        var n = _points.length;
        if(!_isNormalized){
            str = _points[0].x + "=";
        }

        for(var i = 1; i < n; i++){
            var pl = _points[i-1];
            var pr = _points[i];

            if(pl.rightColor === pr.leftColor){
                str += getHexColor(pl.rightColor);
            }else{
                str += getHexColor(pl.rightColor) + "," + getHexColor(pr.leftColor);;
            }
            if(i < n-1){
                str += "=" + pr.x + "=";
            }
        }

        if(!_isNormalized){
            str += "=" + _points[n-1].x;
        }
        return str;
    };
};

InteractiveDataDisplay.ColorPalette.getColorNames = function() {
        return {
        "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff", "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
        "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff", "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1", "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
        "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff", "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
        "honeydew": "#f0fff0", "hotpink": "#ff69b4", "indianred ": "#cd5c5c", "indigo ": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c", "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
        "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de", "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
        "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee", "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead", "navy": "#000080", "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
        "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1", "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
        "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "transparent": "#00000000", "turquoise": "#40e0d0", "violet": "#ee82ee", "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5", "yellow": "#ffff00", "yellowgreen": "#9acd32"
        }
    };

// Discretizes the palette
// Returns an Uint8Array array of numbers with length (4 x number of colors), 
// contains 4 numbers (r,g,b,a) for each color, 
// where 0 <= r,g,b,a <= 255
InteractiveDataDisplay.ColorPalette.toArray = function (palette, n) {
    var colors = new Uint8Array(n << 2);
    var getColor = palette.getRgba;
    var k, min;

    if (palette.isNormalized) {
        k = 1.0 / (n - 1);
        min = 0;
    } else {
        min = palette.range.min;
        k = (palette.range.max - palette.range.min) / (n - 1);
    }

    var c;
    var j;
    for (var i = 0, j = 0; i < n; i++) {
        c = getColor(i * k + min);
        colors[j++] = c.r;
        colors[j++] = c.g;
        colors[j++] = c.b;
        colors[j++] = 255 * c.a;
    }

    return colors;
};

InteractiveDataDisplay.ColorPalette.create = function () {
    var colors = arguments;
    if (!colors || colors.length == 0) throw 'colors is undefined or empty';
    var n = colors.length;
    if (n == 1) {
        n++;
        colors = [colors[0], colors[0]];
    }
    var hslapoints = new Array(n);
    var dx = 1.0 / (n - 1);
    for (var i = 0; i < n; i++) {
        var p = colors[i];
        var hslp = typeof p.r === 'number' ? InteractiveDataDisplay.ColorPalette.RGBtoHSL(p) : p;
        hslapoints[i] = { x: i * dx, rightColor: hslp, leftColor: hslp };
    }
    return new InteractiveDataDisplay.ColorPalette(true, { min: 0, max: 1 }, hslapoints);
};

InteractiveDataDisplay.ColorPalette.parse = function (paletteString) {
    var isNormalized = true;
    var range;
    var points = [];

    if (paletteString == undefined) paletteString = "";
    if (paletteString == "")
        return InteractiveDataDisplay.palettes.grayscale;

    var lexer = new InteractiveDataDisplay.Lexer(paletteString);

    var state = -1;
    var lastNumber;

    if (lexer.readNext()) {
        points.push({ x: 0.0, rightColor: { h: 0, s: 0, l: 0, a: 1 }, leftColor: { h: 0, s: 0, l: 1, a: 1 } });
        if (lexer.currentLexeme == 'number') {
            points[points.length - 1].x = lexer.currentNumber;
            isNormalized = false;
            if (lexer.readNext() && (lexer.currentLexeme != 'separator' || lexer.currentSeparator != 'equal'))
                throw lexer.position + ": separator '=' expected";
            if (lexer.readNext() && lexer.currentLexeme != 'color')
                throw lexer.position + ": color expected";
        }
        if (lexer.currentLexeme == 'color') {
            points[points.length - 1].rightColor = lexer.currentColor;
            points[points.length - 1].leftColor = lexer.currentColor;
            points.push({ x: points[0].x, rightColor: lexer.currentColor, leftColor: lexer.currentColor });
        }
        else throw lexer.position + ": wrong lexeme";
    }

    lastNumber = points[0].x;

    while (lexer.readNext()) {
        if (lexer.currentLexeme == 'separator') {
            if (lexer.currentSeparator == 'equal') {
                if (lexer.readNext()) {
                    if (lexer.currentLexeme == 'number') {
                        if (lexer.currentNumber < lastNumber)
                            throw lexer.position + ": number is less than previous";
                        lastNumber = lexer.currentNumber;
                        if (state == -1) { //x1 = color = x2
                            points[points.length - 1].x = lexer.currentNumber;
                            state = 1;
                        }
                        else if (state == 0) { //color = x
                            points[points.length - 1].x = lexer.currentNumber;
                            state = 2;
                        }
                        else throw lexer.position + ": wrong lexeme";
                    }
                    else if (lexer.currentLexeme == 'color') {
                        if (state == 1 || state == 2) { //x = color (,x=color || color1=x=color2)
                            points[points.length - 1].rightColor = lexer.currentColor;
                            state = -1;
                        }
                        else if (state == 0 || state == -1) { //color1 = color2
                            points[points.length - 1].x = points[0].x - 1;
                            points[points.length - 1].rightColor = lexer.currentColor;
                            state = -1;
                        }
                        else throw lexer.position + ": wrong lexeme";
                    }
                    else throw lexer.position + ": wrong lexeme";
                }
            }
            else if (lexer.currentSeparator == 'comma') {
                if (lexer.readNext()) {
                    if (state == 1 || state == -1 || state == 2) {
                        if (lexer.currentLexeme == 'number') {
                            if (lexer.currentNumber <= lastNumber)
                                throw lexer.position + ": number is less than previous";
                            lastNumber = lexer.currentNumber;
                            //x1 = color, x2
                            if (lexer.readNext() && lexer.currentLexeme == 'separator' && lexer.currentSeparator == 'equal') {
                                if (lexer.readNext() && lexer.currentLexeme == 'color') {
                                    if (state != -1)
                                        points.push({ x: lexer.currentNumber, rightColor: lexer.currentColor, leftColor: lexer.currentColor });
                                    else {
                                        points[points.length - 1].x = lexer.currentNumber;
                                        points[points.length - 1].rightColor = lexer.currentColor;
                                        points[points.length - 1].leftColor = lexer.currentColor;
                                    }
                                    state = -1;
                                }
                                else throw lexer.position + ": color expected";
                            }
                            else throw lexer.position + ": wrong lexeme";
                        }
                        else if (lexer.currentLexeme == 'color') { // x = color1, color2
                            if (state == -1) points.pop();
                            state = 0;
                        }
                        else throw lexer.position + ": wrong lexeme";
                    }
                    else if (state == 0) {
                        if (lexer.currentLexeme == 'number') {
                            if (lexer.currentNumber <= lastNumber)
                                throw lexer.position + ": number is less than previous";
                            lastNumber = lexer.currentNumber;
                            //color, x
                            points[points.length - 1].x = points[0].x - 1;
                            if (lexer.readNext() && lexer.currentLexeme == 'separator' && lexer.currentSeparator == 'equal') {
                                if (lexer.readNext() && lexer.currentLexeme == 'color') {
                                    points.push({ x: lexer.currentNumber, rightColor: lexer.currentColor, leftColor: lexer.currentColor });
                                    state = -1;
                                }
                                else throw lexer.position + ": color expected";
                            }
                            else throw lexer.position + ": wrong lexeme";
                        }
                        else if (lexer.currentLexeme == 'color') { //color1, color2
                            points[points.length - 1].x = points[0].x - 1;
                            state = 0;
                        }
                        else throw lexer.position + ": wrong lexeme";
                    }
                }
            }
            if (state == -1)
                points.push({ x: points[0].x, rightColor: lexer.currentColor, leftColor: lexer.currentColor });
            else if (state == 0)
                points.push({ x: points[0].x, rightColor: lexer.currentColor, leftColor: lexer.currentColor });
        }
        else throw lexer.position + ": separator expected";
    }

    if (lexer.currentLexeme == 'separator') throw lexer.position + ": wrong lexeme";
    if ((lexer.currentLexeme == 'number' && isNormalized) || (lexer.currentLexeme == 'color' && !isNormalized))
        throw lexer.position + ": wrong ending";
    if (isNormalized) {
        points[points.length - 1].x = 1.0;
        if (points[points.length - 1].x < points[points.length - 2].x) throw lexer.position + ": number is less than previous";
    }
    points[points.length - 1].rightColor = points[points.length - 1].leftColor;
    if (points[0].x >= points[points.length - 1].x) throw lexer.position + ": wrong range of palette";
    range = { min: points[0].x, max: points[points.length - 1].x };

    var start = 1;
    var count = 0;
    for (var i = 1, len = points.length; i < len; i++) {
        if (points[i].x == points[0].x - 1) {
            if (count == 0) start = i;
            count++;
        }
        else if (count != 0) {
            var res_x = (points[start + count].x - points[start - 1].x) / (count + 1);
            for (var j = 0; j < count; j++) points[start + j].x = points[start - 1].x + res_x * (j + 1);
            count = 0;
            start = 1;
        }
    }

    return new InteractiveDataDisplay.ColorPalette(isNormalized, range, points);
};

InteractiveDataDisplay.Lexer = function (paletteString) {

    if (typeof (paletteString) !== "string")
        throw "wrong definition of palette: must be a string";

    var _currentColor;
    var _currentNumber;
    var _currentLexeme; // type of lexem: { Color, Separator, Number }
    var _currentSeparator; // type of separator: { Equal, Comma }

    var _paletteString = paletteString;
    var _position = 0;

    Object.defineProperty(this, "position", { get: function () { return _position; }, configurable: false });
    Object.defineProperty(this, "paletteString", { get: function () { return _paletteString; }, configurable: false });
    Object.defineProperty(this, "currentSeparator", { get: function () { return _currentSeparator; }, configurable: false });
    Object.defineProperty(this, "currentLexeme", { get: function () { return _currentLexeme; }, configurable: false });
    Object.defineProperty(this, "currentNumber", { get: function () { return _currentNumber; }, configurable: false });
    Object.defineProperty(this, "currentColor", { get: function () { return _currentColor; }, configurable: false });

    this.readNext = function () {
        if (_position >= _paletteString.length)
            return false;
        while (_paletteString[_position] === ' ') _position++;

        if (_paletteString[_position] === '#' || /^[a-z]/.test(_paletteString[_position].toLowerCase())) {
            _currentLexeme = 'color';
            var start = _position;
            while (_position < _paletteString.length && _paletteString[_position] != ' ' && _paletteString[_position] != '=' && _paletteString[_position] != ',') {
                _position++;
            }
            var color = InteractiveDataDisplay.ColorPalette.colorFromString(_paletteString.substring(start, _position));
            _currentColor = InteractiveDataDisplay.ColorPalette.RGBtoHSL(color);
        }
        else if (_paletteString[_position] === '=' || _paletteString[_position] === ',') {
            _currentLexeme = 'separator';
            if (_paletteString[_position] == '=') _currentSeparator = 'equal';
            else _currentSeparator = 'comma';
            _position++;
        }
        else {
            _currentLexeme = 'number';
            var start = _position;
            while (_position < _paletteString.length && _paletteString[_position] != ' ' && _paletteString[_position] != '=' && _paletteString[_position] != ',') {
                _position++;
            }
            var numberStr = _paletteString.substring(start, _position);
            var numberRes = (numberStr).replace(/[^0-9+-Ee.]/g, '');

            if (numberStr != numberRes) throw "wrong number value";
            _currentNumber = parseFloat(_paletteString.substring(start, _position));
        }
        return true;
    };
};

InteractiveDataDisplay.ColorPalette.colorFromString = function (hexColor) {
    // CSS color can be defined (https://www.w3schools.com/cssref/css_colors_legal.asp)
    // 
    // * Predefined/Cross-browser color names
    // * Hexadecimal colors
    // * RGB colors
    // * RGBA colors
    // * HSL colors
    // * HSLA colors    

    var colours = InteractiveDataDisplay.ColorPalette.getColorNames();
    if (typeof (hexColor) !== "string")
        throw "wrong definition of color: must be a string";

    var _r, _g, _b, _a;
    
    var parsed = false

    if (colours[hexColor.toLowerCase()]) { // handling Predefined/Cross-browser color names
        var hex = colours[hexColor.toLowerCase()];
        hexColor = hex;
    }
    if (hexColor.charAt(0) == '#') { // handling Hexadecimal colors
        // #RRGGBB, where the RR (red), GG (green) and BB (blue) hexadecimal integers specify the components of the color. All values must be between 00 and FF
        if (hexColor.length == 7) {
            _a = 1;
            _r = parseInt(hexColor.substring(1, 3), 16);
            _g = parseInt(hexColor.substring(3, 5), 16);
            _b = parseInt(hexColor.substring(5, 7), 16);
        }
        else if (hexColor.length == 9) { // DG: Is #RRGGBBAA supported by CSS?
            _r = parseInt(hexColor.substring(1, 3), 16);
            _g = parseInt(hexColor.substring(3, 5), 16);
            _b = parseInt(hexColor.substring(5, 7), 16);
            _a = parseInt(hexColor.substring(7, 9), 16) / 255.0;
        }
        else throw "wrong definition of hex color";
        parsed = true
    }
    if (!parsed) { //handling RGB colors
        // rgb(red, green, blue)
        // Each parameter (red, green, and blue) defines the intensity of the color and can be an integer between 0 and 255 or a percentage value (from 0% to 100%)
        // e.g. rgb(0,0,255) and rgb(0%,0%,100%)
        var rgbByteRegex = /rgb\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\s*\)/
        var rgbPercentRegex = /rgb\(\s*([0-9]|[1-8][0-9]|9[0-9]|100)%,\s*([0-9]|[1-8][0-9]|9[0-9]|100)%,\s*([0-9]|[1-8][0-9]|9[0-9]|100)%\s*\)/
    
        var match = rgbByteRegex.exec(hexColor);
        if (match !== null) {
            _a = 1
            _r = parseInt(match[1])
            _g = parseInt(match[2])
            _b = parseInt(match[3])
            parsed = true
        }
        if(!parsed) {
            match = rgbPercentRegex.exec(hexColor)
            if (match !== null) {
                _a = 1
                _r = Math.round(parseInt(match[1])*2.55)
                _g = Math.round(parseInt(match[2])*2.55)
                _b = Math.round(parseInt(match[3])*2.55)
                parsed = true
            }
        }
    }
    if (!parsed) { //handling RGBA colors
        // rgba(red, green, blue, alpha)
        // The alpha parameter is a number between 0.0 (fully transparent) and 1.0 (fully opaque).
        // rgba(255, 0, 0, 0.3)
        var rgbaByteRegex = /rgba\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([0|1]\.?\d+)\)/
    
        var match = rgbaByteRegex.exec(hexColor);
        if (match !== null) {            
            _r = parseInt(match[1])
            _g = parseInt(match[2])
            _b = parseInt(match[3])
            _a = parseFloat(match[4])
            parsed = true
        }        
    }
    
    if(!parsed)
        throw "Unsupported color definition";

    if (isNaN(_r) || isNaN(_g) || isNaN(_b) || isNaN(_a))
        throw "wrong definition of hex color";

    return { r: _r, g: _g, b: _b, a: _a };
};

// red, green, blue = [0, 255]
// alpha = [0, 1]
InteractiveDataDisplay.ColorPalette.RGBtoHSL = function (rgbaColor) {
    var _h, _s, _l, _a;

    _a = rgbaColor.a;

    var r = rgbaColor.r / 255.0;
    var g = rgbaColor.g / 255.0;
    var b = rgbaColor.b / 255.0;

    var maxcolor = Math.max(r, g);
    maxcolor = Math.max(maxcolor, b);

    var mincolor = Math.min(r, g);
    mincolor = Math.min(mincolor, b);

    _l = (maxcolor + mincolor) / 2.0;

    if (maxcolor == mincolor)
        _s = 0.0;
    else {
        if (_l < 0.5)
            _s = (maxcolor - mincolor) / (maxcolor + mincolor);
        else
            _s = (maxcolor - mincolor) / (2.0 - maxcolor - mincolor);
    }
    if (maxcolor == mincolor)
        _h = 0;
    else if (maxcolor == r) {
        if (g >= b)
            _h = (g - b) / (maxcolor - mincolor);
        else
            _h = (g - b) / (maxcolor - mincolor) + 6.0;
    }
    else if (maxcolor == g)
        _h = 2.0 + (b - r) / (maxcolor - mincolor);
    else if (maxcolor == b)
        _h = 4.0 + (r - g) / (maxcolor - mincolor);

    return { h: _h, s: _s, l: _l, a: _a };
};

// hue = [0, 6]
// saturation, lightness, alpha = [0, 1]
InteractiveDataDisplay.ColorPalette.HSLtoRGB = function (hslaColor) {
    var _r, _g, _b, _a;

    _a = hslaColor.a;

    var hue = hslaColor.h;
    var saturation = hslaColor.s;
    var lightness = hslaColor.l;

    var c = (1.0 - Math.abs(2.0 * lightness - 1.0)) * saturation;
    var x = c * (1.0 - Math.abs(hue % 2.0 - 1.0));

    if (hue < 2) {
        _b = 0;
        if (hue < 1) {
            _r = Math.round(c * 255);
            _g = Math.round(x * 255);
        }
        else {
            _r = Math.round(x * 255);
            _g = Math.round(c * 255);
        }
    }
    else if (hue < 4) {
        _r = 0;
        if (hue < 3) {
            _g = Math.round(c * 255);
            _b = Math.round(x * 255);
        }
        else {
            _g = Math.round(x * 255);
            _b = Math.round(c * 255);
        }
    }
    else if (hue < 6) {
        _g = 0;
        if (hue < 5) {
            _r = Math.round(x * 255);
            _b = Math.round(c * 255);
        }
        else {
            _r = Math.round(c * 255);
            _b = Math.round(x * 255);
        }
    }

    var m = (lightness - c / 2.0) * 255;
    var temp = _r + m;
    if (temp > 255) _r = 255;
    else if (temp < 0) _r = 0;
    else _r = Math.round(temp);

    temp = _g + m;
    if (temp > 255) _g = 255;
    else if (temp < 0) _g = 0;
    else _g = Math.round(temp);

    temp = _b + m;
    if (temp > 255) _b = 255;
    else if (temp < 0) _b = 0;
    else _b = Math.round(temp);

    return { r: _r, g: _g, b: _b, a: _a };
};

InteractiveDataDisplay.ColorPaletteViewer = function (div, palette, options) {
    var _host = div;
    var _width = _host.width();
    var _height = 20;
    var _axisVisible = true;
    var _logAxis = false;
    var _palette = palette;
    var _dataRange = undefined;

    // Get initial settings from options
    if (options !== undefined) {
        if (options.height !== undefined)
            _height = options.height;
        if (options.width !== undefined)
            _width = options.width;
        if (options.axisVisible !== undefined)
            _axisVisible = options.axisVisible;
        if (options.logAxis !== undefined)
            _logAxis = options.logAxis;
    }

    // canvas to render palette
    var _canvas = $("<canvas height='" + _height + "px'" + "width='" + _width + "px' style='display: block'></canvas>");
    _host[0].appendChild(_canvas[0]);
    var _ctx = _canvas.get(0).getContext("2d");

    var _axisDiv = null;
    var _axis = null;

    function dataToPlot(range){
         if(_logAxis){
             return { min : InteractiveDataDisplay.Utils.log10(range.min), max : InteractiveDataDisplay.Utils.log10(range.max) };
         }else{
            return range;
        }
    }

    function addAxis() {
        _axisDiv = $("<div data-idd-placement='bottom' style='width: " + _width + "px; color: rgb(0,0,0)'></div>");
        _host[0].appendChild(_axisDiv[0]);

        if(!_logAxis){
            _axis = new InteractiveDataDisplay.NumericAxis(_axisDiv);
        }else{
            _axis = new InteractiveDataDisplay.LogarithmicAxis(_axisDiv);
        }
        if (_palette && !_palette.isNormalized) // Take axis values from fixed palette
            _axis.update(dataToPlot({ min: _palette.range.min, max: _palette.range.max }));
        else if (_dataRange) // Try to take axis values from data range
            _axis.update(dataToPlot({ min: _dataRange.min, max: _dataRange.max }));
    }

    function removeAxis() {
        _host[0].removeChild(_axisDiv[0]);
        _axisDiv = null;
        _axis = null;
    }

    if (_axisVisible)
        addAxis();

    Object.defineProperty(this, "axisVisible", {
        get: function () { return _axisVisible; },
        set: function (value) {
            value = value ? true : false;
            if (_axisVisible != value) {
                _axisVisible = value;
                if (_axisVisible)
                    addAxis();
                else
                    removeAxis();
            }
        },
        configurable: false
    });

    Object.defineProperty(this, "palette", {
        get: function () { return _palette; },
        set: function (value) {
            if (value) {
                _palette = value;
                if (_axisVisible && (!_palette.isNormalized || !_dataRange))
                    _axis.update(dataToPlot({ min: _palette.range.min, max: _palette.range.max }));
                renderPalette();
            }
        },
        configurable: false
    });

    Object.defineProperty(this, "dataRange", {
        get: function () { return _dataRange; },
        set: function (value) {
            if (value) {
                _dataRange = value;
                if (_axisVisible && (!_palette || _palette.isNormalized)) {
                    _axis.update(dataToPlot({ min: _dataRange.min, max: _dataRange.max }));
                }
            }
        },
        configurable: false
    });


    var renderPalette = function () {
        var alpha = (_palette.range.max - _palette.range.min) / _width;
        var gradient = _ctx.createLinearGradient(0, 0, _width, 0);
        var color;
        var x = _palette.range.min;
        for (var i = 0; i < _width; i++) {
            color = _palette.getRgba(x);
            gradient.addColorStop(i / _width, "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")");
            x += alpha;
        }

        _ctx.fillStyle = gradient;
        _ctx.fillRect(0, 0, _width, _height);
    };

    if (_palette)
        renderPalette();
};
InteractiveDataDisplay.SvgColorPaletteViewer = function (svg, palette, elementDiv, options) {
    var _width = 170;
    var _height = 20;
    var _axisVisible = true;
    var _palette = palette;
    var _dataRange = undefined;

    // Get initial settings from options
    if (options !== undefined) {
        if (options.height !== undefined)
            _height = options.height;
        if (options.width !== undefined)
            _width = options.width;
        if (options.axisVisible !== undefined)
            _axisVisible = options.axisVisible;
    }
    var _axis = null;
    var _axis_g = svg.group();
    function addAxis() {
        var _axis = elementDiv.children[1];
        _axis.axis.renderToSvg(_axis_g);
        _axis_g.translate(0, _height + 0.5);
    }

    function removeAxis() {
        _axis = null;
    }

    if (_axisVisible)
        addAxis();

    var renderPalette = function () {
        var color;
        var alpha = (_palette.range.max - _palette.range.min) / _width;
        var gradient = svg.gradient("linear", function (stop) {
            var x = _palette.range.min;
            for (var i = 0; i < _width; i++) {
                color = _palette.getRgba(x);
                stop.at(i / _width, "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")");
                x += alpha;
            }
        });
        svg.rect(_width, _height).fill(gradient);
    };

    if (_palette)
        renderPalette();
};
//-----------------------------------------------------------------------------
// Size palette

// Size palette
// isNormalized: bool
// valueRange: {min, max}, min <= max
// sizeRange: {min, max}
InteractiveDataDisplay.SizePalette = function (isNormalized, sizeRange, valueRange) {
    var _isNormalized;
    var _range;
    var _sizeRange;
    var that = this;

    Object.defineProperty(this, "isNormalized", { get: function () { return _isNormalized; }, configurable: false });
    Object.defineProperty(this, "range", { get: function () { return _range; }, configurable: false });
    Object.defineProperty(this, "sizeRange", { get: function () { return _sizeRange; }, configurable: false });

    _isNormalized = isNormalized;
    if (_isNormalized) _range = { min: 0, max: 1 };
    else _range = { min: valueRange.min, max: valueRange.max };
    _sizeRange = { min: sizeRange.min, max: sizeRange.max };
    if (_range.min > _range.max) throw "valueRange is incorrect (min >= max)";

    var k = (_sizeRange.max - _sizeRange.min) / (_range.max - _range.min);

    this.getSize = function (value) {
        if (value <= _range.min) return _sizeRange.min;
        if (value >= _range.max) return _sizeRange.max;

        return k * (value - _range.min) + _sizeRange.min;
    };
};

InteractiveDataDisplay.SizePalette.Create = function (source) {
    if(source instanceof InteractiveDataDisplay.SizePalette) return source;
    var sizeRange = source.sizeRange;
    var valueRange = source.valueRange;
    return new InteractiveDataDisplay.SizePalette(typeof valueRange == "undefined", sizeRange, valueRange);
}

InteractiveDataDisplay.SizePaletteViewer = function (div, palette, options) {
    var _host = div;
    var _width = _host.width();
    var _height = 35;
    var _axisVisible = true;
    var _palette = palette;

    if (options !== undefined) {
        if (options.axisVisible !== undefined)
            _axisVisible = options.axisVisible;
        if (options.width !== undefined)
            _width = options.width;
        if (options.height !== undefined)
            _height = options.height;
    }

    // canvas to render palette
    var _canvas = $("<canvas height='" + _height + "px'" + "width='" + _width + "px' style='display: block'></canvas>");
    _host[0].appendChild(_canvas[0]);

    var _axis = null;
    var _axisDiv = null;
    function addAxis() {
        _axisDiv = $("<div data-idd-placement='bottom' style='width: " + _width + "px; margin-top: -1px; color: rgb(0,0,0)'></div>");
        _axis = new InteractiveDataDisplay.NumericAxis(_axisDiv);
        _host[0].appendChild(_axisDiv[0]);

        if (_palette) {
            if (!_palette.isNormalized) {
                _axis.update({ min: _palette.range.min, max: _palette.range.max });
            }
        } else if (_dataRange)
            _axis.update({ min: _dataRange.min, max: _dataRange.max });
    }

    function removeAxis() {
        _host[0].removeChild(_axisDiv[0]);
        _axisDiv = null;
        _axis = null;
    }

    if (_axisVisible)
        addAxis();

    Object.defineProperty(this, "axisVisible", {
        get: function () { return _axisVisible; },
        set: function (value) {
            value = value ? true : false;
            if (_axisVisible != value) {
                _axisVisible = value;
                if (_axisVisible)
                    addAxis();
                else
                    removeAxis();
            }
        },
        configurable: false
    });

    Object.defineProperty(this, "palette", {
        get: function () { return _palette; },
        set: function (value) {
            if (value) {
                _palette = value;
                if (_axisVisible && !_palette.isNormalized) {
                    _axis.update({ min: _palette.range.min, max: _palette.range.max });
                }
                renderPalette();
            }
        },
        configurable: false
    });

    var _dataRange = undefined;
    Object.defineProperty(this, "dataRange", {
        get: function () { return _dataRange; },
        set: function (value) {
            if (value) {
                _dataRange = value;
                if (_axisVisible && (!_palette || _palette.isNormalized)) {
                    _axis.update({ min: _dataRange.min, max: _dataRange.max });
                }
            }
        },
        configurable: false
    });

    var _ctx = _canvas.get(0).getContext("2d");

    var renderPalette = function () {
        var color;
        _ctx.clearRect(0, 0, _width, _height);

        _ctx.fillStyle = "lightgray";
        _ctx.strokeStyle = "black";

        var minHeight = 0;
        var maxHeight = _height;
        if (_palette && _palette.sizeRange) {
            minHeight = _palette.sizeRange.min;
            maxHeight = _palette.sizeRange.max;
        }
        var middle = _height * _width / Math.max(maxHeight, minHeight);

        _ctx.beginPath();
        _ctx.moveTo(0, _height);
        if (minHeight != 0) {
            _ctx.lineTo(0, Math.max(0, _height - minHeight));
        }

        if (middle < _width) {
            _ctx.lineTo(middle, 0);
            if (minHeight <= maxHeight) _ctx.lineTo(_width, 0);
            else _ctx.lineTo(_width, Math.max(0, _height - maxHeight));
        }
        else {
            _ctx.lineTo(_width, Math.max(0, _height - maxHeight));
        }
        _ctx.lineTo(_width, _height);
        _ctx.lineTo(0, _height);
        _ctx.closePath();
        _ctx.fill();
        _ctx.stroke();
    };

    renderPalette();
};

InteractiveDataDisplay.SvgSizePaletteViewer = function (svg, palette, elementDiv, options) {
    var _width = 170;
    var _height = 75;
    var _axisVisible = true;
    var _palette = palette;

    if (options !== undefined) {
        if (options.axisVisible !== undefined)
            _axisVisible = options.axisVisible;
        if (options.width !== undefined)
            _width = options.width;
        if (options.height !== undefined)
            _height = options.height;
    }

    var _axis = null;
    function addAxis() {
        var _axis = elementDiv.children[1];
        var _axis_g = svg.group();
        _axis.axis.renderToSvg(_axis_g);
        _axis_g.translate(0, _height);
    }
    function removeAxis() {
        _axis = null;
    }

    if (_axisVisible)
        addAxis();

    var renderPalette = function () {
        var minHeight = 0;
        var maxHeight = _height;
        if (_palette.sizeRange) {
            minHeight = _palette.sizeRange.min;
            maxHeight = _palette.sizeRange.max;
        }
        var middle = _height * _width / Math.max(maxHeight, minHeight);

        var points = [];
        if (minHeight != 0) points.push([0, Math.max(0, _height - minHeight)]);
        else points.push([0, _height]);//0
        if (middle < _width) {
            points.push([middle, 0]);//1
            if (minHeight <= maxHeight) points.push([_width, 0]);//2
            else points.push([_width, Math.max(0, _height - maxHeight)]);// 2
        }
        else {
            points.push([_width, Math.max(0, _height - maxHeight)]);// 1
            points.push([_width, Math.max(0, _height - maxHeight)]);
        }
        svg.polyline([[0, _height], points[0], points[1], points[2], [_width, _height], [0, _height]]).fill("lightgray").stroke("black");
    };

    renderPalette();
};

InteractiveDataDisplay.UncertaintySizePaletteViewer = function (div, options) {
    var _host = div;
    var _width = _host.width();
    var _height = 65;

    if (options !== undefined) {
        if (options.width !== undefined)
            _width = options.width;
        if (options.height !== undefined)
            _height = options.height;
    }

    var _maxDelta = undefined;
    Object.defineProperty(this, "maxDelta", {
        get: function () { return _maxDelta; },
        set: function (value) {
            if (value) {
                _maxDelta = value;
                renderPalette();
            }
        }
    });

    var canvas = $("<canvas height='50px'></canvas>");
    _host[0].appendChild(canvas[0]);
    var context = canvas[0].getContext("2d");
    var markers = [
        { x: 25, y: 20, min: 16, max: 16 },
        { x: 75, y: 20, min: 10, max: 16 },
        { x: 125, y: 20, min: 0, max: 16 }];

    var renderPalette = function () {
        //canvas[0].width = canvas[0].width;
        // draw sample markers
        for (var i = 0; i < markers.length; i++) {
            InteractiveDataDisplay.Petal.drawSample(context, markers[i].x, markers[i].y, markers[i].min, markers[i].max, "#484848");
        }
        // draw arrow
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(20, 45.5);
        context.lineTo(118, 45.5);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(118, 45.5);
        context.lineTo(103.5, 40.5);
        context.lineTo(103.5, 49.5);
        context.lineTo(118, 45.5);
        context.stroke();
        context.closePath();
        context.fill();
            
        // if maxData is known - stroke value
        context.strokeStyle = "black";
        context.fillStyle = "black";
        context.lineWidth = 1;
        if (_maxDelta) {
            context.fillText("X", 9, 49);
            context.fillText("X", 122, 49);
            context.beginPath();
            context.moveTo(134, 44.5);
            context.lineTo(141, 44.5);
            context.stroke();
            context.closePath();
            context.beginPath();
            context.moveTo(134, 48.5);
            context.lineTo(141, 48.5);
            context.stroke();
            context.closePath();
            context.beginPath();
            context.moveTo(137.5, 41);
            context.lineTo(137.5, 48);
            context.stroke();
            context.closePath();
            context.fillText("", round(_maxDelta, { min: 0, max: _maxDelta }, false), 145, 49);
        }
    }
    renderPalette();
     // add text 'uncertainty'
    $("<div style='margin-left: 30px; margin-top: -10px'>uncertainty</div>").appendTo(_host);
};

InteractiveDataDisplay.palettes = {
    grayscale: new InteractiveDataDisplay.ColorPalette(true, { min: 0, max: 1 }, [{ x: 0.0, rightColor: { h: 0, s: 0, l: 0, a: 1 }, leftColor: { h: 0, s: 0, l: 0, a: 1 } },
                                                              { x: 1.0, rightColor: { h: 0, s: 0, l: 1, a: 1 }, leftColor: { h: 0, s: 0, l: 1, a: 1 } }])
};

;InteractiveDataDisplay = InteractiveDataDisplay || {};

InteractiveDataDisplay.ColorPaletteEditor = function ($div, palette) {
    if($div.hasClass("idd-colorPaletteEditor")) return;

    $div.addClass("idd-colorPaletteEditor");
    $div[0].editor = this;

    var borderTemplate = "gray";
    var fillTemplate = "rgba(100,100,100,0.3)";

    var that = this;        
    var _palette = palette;
    Object.defineProperty(this, "palette", {
            get: function () { return _palette; },
            set: function (value) {
                _palette = value;
                paletteViewer.palette = _palette;
                updateMarkers();
            },
            configurable: false
    });
    var firePaletteChanged = function(newPalette){
        $div.trigger("paletteChanged", [ newPalette ]);
    }

    var isDraggingMarker = false;
    var isChoosingColor = false;
    
    var width = $div.width();
    var barHeight = 10;
    var paletteHeight = 20;    

    var $bar = 
        $("<div></div>")
        .height(barHeight)
        .width(width)
        .addClass("idd-colorPaletteEditor-bar")
        .appendTo($div);

    var $viewer = 
        $("<div></div>")
        .height(paletteHeight)
        .width(width)
        .addClass("idd-colorPaletteEditor-viewer")
        .appendTo($div);

    var options = {
        height : paletteHeight,
        axisVisible : false
    };
    var paletteViewer = new InteractiveDataDisplay.ColorPaletteViewer($viewer, _palette, options);
    var height = barHeight + $viewer.height();
    $div.height(height);

    var markers = [];

    var getCssColor = function(hsla){
        var rgba = InteractiveDataDisplay.ColorPalette.HSLtoRGB(hsla);
        return "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
    }

     var getHexColor = function(hsla){
        var toHex = function(v) {
            var h = v.toString(16);
            while(h.length < 2)
                h = "0" + h;
            return h;
        }
        var rgba = InteractiveDataDisplay.ColorPalette.HSLtoRGB(hsla);
        var r = toHex(rgba.r);
        var g = toHex(rgba.g);
        var b = toHex(rgba.b);
        return "#" + r + g + b;
    }

    var renderMarker = function(ctx, left, top, borderColor, leftColor, rightColor){
        var sz = barHeight;        
        if(leftColor){
            ctx.fillStyle = leftColor;
            ctx.beginPath();
            ctx.moveTo(left, top);
            ctx.lineTo(left + sz/2, top);
            ctx.lineTo(left + sz/2, top + sz);
            ctx.fill();
        }
        if(rightColor){
            ctx.fillStyle = rightColor;
            ctx.beginPath();
            ctx.moveTo(left + sz/2, top);
            ctx.lineTo(left + sz, top);
            ctx.lineTo(left + sz/2, top + sz);
            ctx.fill();
        }
        // outline:
        ctx.strokeStyle = borderColor;
        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(left + sz, top);
        ctx.lineTo(left + sz/2, top + sz);
        ctx.closePath();
        ctx.stroke();
    }

    var $canvasNew = 
        $("<canvas height='" + barHeight + "px'" + "width='" + width + "px' style='display: block'></canvas>")
        .css("position", "absolute")
        .appendTo($bar);
    var clearCanvasNew = function(){
        var ctx = $canvasNew[0].getContext("2d");
        ctx.clearRect(0, 0, width, barHeight);
    }

    var stopChoosingColor = function(){
        if(isChoosingColor){
            var $pickers = $(".idd-colorPaletteEditor-colorPicker", $bar);
            if($pickers.length > 0){
                var handler = $.data($pickers[0], "onClick");
                if(handler){
                    $(window).off("click", handler);
                }
                $(".idd-colorPaletteEditor-colorPicker", $bar).remove();
            }
            isChoosingColor = false;
        }
    }

    // Shows an element that allows to choose a color.
    // It is shown above the palette viewer.
    // Arguments:
    //  - xp: x-position relative to bars
    //  - hsla: initial color
    //  - onSelected: callback to set the chosen color
    var chooseColor = function(xp, hsla, onChosen){
        stopChoosingColor();
        isChoosingColor = true;

        var w = 60;
        var h = 20;

        var $colorPicker = 
            $("<div></div>")
            .addClass("idd-colorPaletteEditor-colorPicker")
            .css({ "position": "absolute", "left":  xp - w/2, "top": barHeight })            
            .appendTo($bar);

        $("<span>Color:</span>")
            .css("margin-right", 10)
            .appendTo($colorPicker);

        var $input = 
            $("<input type=color></input>")            
            .width(w)
            .height(h)
            .val(getHexColor(hsla))
            .change(function(){
                var color = $input.val();
                var rgba = InteractiveDataDisplay.ColorPalette.colorFromString(color);
                var hsla = InteractiveDataDisplay.ColorPalette.RGBtoHSL(rgba);
                onChosen(hsla);
                stopChoosingColor();
            })
            .appendTo($colorPicker);

        var onClick = function(e){
            var isOfColorPicker = 
                $(e.target).hasClass("idd-colorPaletteEditor-colorPicker") ||
                $colorPicker.has($(e.target)).length > 0;
            if(!isOfColorPicker){
                stopChoosingColor();
                e.stopPropagation();
            }
        }
        $(window).click(onClick);
        $.data($colorPicker[0], "onClick", onClick); // saves the handler to unsubscribe
    };

    // Computes position on the _palette range for the given marker element.
    var getMarkerX = function($marker) {
        var offset = $canvasNew.offset(); 
        var xp = $marker.offset().left + $marker.width()/2 - offset.left;
        var k = (_palette.range.max - _palette.range.min) / width;        
        var x = k * xp + _palette.range.min;
        return x;
    }

    var addMarker = function(point, leftX, rightX, isDraggable){
        var k = width / (_palette.range.max - _palette.range.min);
        var xp = k * (point.x - _palette.range.min);
        var lxp = k * (leftX - _palette.range.min);
        var rxp = k * (rightX - _palette.range.min);

        // Structure
        var sz = barHeight;
        var $marker = 
            $("<div style='position:absolute;'></div>")
            .addClass("idd-colorPaletteEditor-marker")
            .width(sz)
            .height(sz)
            .appendTo($bar);
        var $canvas = 
             $("<canvas height='" + sz + "px'" + "width='" + sz + "px' style='display: block'></canvas>")
            .appendTo($marker);
        $marker.css("left", xp - sz/2);

        if(isDraggable){
            var offset = $canvasNew.offset();
            var renderedAsRemoving = false;
            $marker.draggable({ 
                axis: "x", 
                containment: [ offset.left + lxp - sz/2, offset.top, offset.left + rxp - sz/2, offset.top + sz ],
                start: function(e){  // Starts dragging the marker
                    isDraggingMarker = true;
                    renderedAsRemoving = false;

                    stopChoosingColor();                    
                    clearCanvasNew();
                    var offset = $canvasNew.offset();
                    $(e.target).draggable("option", "containment",
                        [ offset.left + lxp - sz/2, offset.top, offset.left + rxp - sz/2, offset.top + sz ]);
                }, 
                drag: function(e){ // Dragging the marker
                    var parentOffset = $div.offset(); 
                    var cursorY = e.pageY - parentOffset.top;
                    if(cursorY < 0 || cursorY > height) { // cursor is above or below the bar panel ==> remove?
                        if(!renderedAsRemoving){
                            var ctx = $canvas[0].getContext("2d");
                            ctx.clearRect(0, 0, sz, sz);
                            renderMarker(ctx, 0, 0, borderTemplate, fillTemplate, fillTemplate);
                            renderedAsRemoving = true;
                        }
                    }else if(renderedAsRemoving) {
                        var ctx = $canvas[0].getContext("2d");
                        ctx.clearRect(0, 0, sz, sz);
                        renderMarker(ctx, 0, 0,
                            'black', 
                            point.leftColor && getCssColor(point.leftColor),
                            point.rightColor && getCssColor(point.rightColor));
                        renderedAsRemoving = false;
                    }
                },
                stop: function(e){ // Dragging stopped and we move the marker to new position                    
                    isDraggingMarker = false;
                    
                    var parentOffset = $div.offset(); 
                    var cursorY = e.pageY - parentOffset.top;

                    if(cursorY < 0 || cursorY > height) { // cursor is above or below the bar panel ==> remove
                        for(var i = 0; i < _palette.points.length; i++){
                            if(_palette.points[i].x == point.x){
                                _palette.points.splice(i, 1); // <-- remove the palette point
                                firePaletteChanged(_palette);
                                paletteViewer.palette = _palette;
                                break;
                            }
                        }
                    } else { // new position for the marker
                        var x = getMarkerX($marker)
                        if(x > _palette.range.min && x < _palette.range.max){
                            point.x = x;           // <-- new palette point                            
                            firePaletteChanged(_palette);  
                            paletteViewer.palette = _palette;
                        }
                    }                                        
                    updateMarkers();                    
                }
            });
        }

        $marker.click(function(e){ // <-- prompts a user to choose new color for the marker
            chooseColor(xp, point.rightColor ? point.rightColor : point.leftColor, 
                function(hsla) {  // <-- new color is chosen for the marker
                    if(point.leftColor) point.leftColor = hsla;
                    if(point.rightColor) point.rightColor = hsla;
                    paletteViewer.palette = _palette;
                    firePaletteChanged(_palette);
                    updateMarkers();
                });
            e.stopPropagation();
        });

        // Render   
        var ctx = $canvas[0].getContext("2d");
        renderMarker(ctx, 0, 0,
            'black', 
            point.leftColor && getCssColor(point.leftColor),
            point.rightColor && getCssColor(point.rightColor));
    }; // end of `addMarker`

    // Refreshes UI markers to correspond the `_palette`.
    var updateMarkers = function(){
        isDraggingMarker = false;
        stopChoosingColor();
        
        var $markers = $(".idd-colorPaletteEditor-marker", $bar);
        $markers.filter(".ui-draggable").each(function(){
            $(this).draggable("destroy");            
        });
        $markers.remove();

        // leftmost and rightmost markers are added separatly before others to have the lowes Z-index
        if(_palette.points.length>0) { 
            var leftX = _palette.range.min
            var rightX = _palette.points[1].x
            addMarker(_palette.points[0], leftX, rightX,false);
        }
        if(_palette.points.length>1) {
            var leftX = _palette.points[_palette.points.length-2].x;
            var rightX = _palette.range.max
            addMarker(_palette.points[_palette.points.length-1], leftX, rightX,false);
        }

        // now adding all the others
        for(var i = 1; i < _palette.points.length-1; i++){
            var leftX = _palette.points[i-1].x;
            var rightX =  _palette.points[i+1].x;
            addMarker(_palette.points[i], leftX, rightX, true);
        }
    }

    var addPalettePoint = function(p) { // <-- adds new palette point
        var points = _palette.points;
        if(points[0].x >= p.x || points[points.length-1].x <= p.x) return;
        var points2;
        for(var i = 1; i < points.length; i++){
            if(p.x == points[i].x) return;
            if(p.x < points[i].x){
                points2 = points.slice();
                points2.splice(i, 0, p);
                break;
            }
        }
        _palette = new InteractiveDataDisplay.ColorPalette(_palette.isNormalized, _palette.range, points2);
        paletteViewer.palette = _palette;
        firePaletteChanged(_palette);
        updateMarkers();
    }
    
    $canvasNew.mousemove(function(e){ // <-- draw a marker placeholder to indicate that it can be added here
        if(isDraggingMarker || isChoosingColor) return;

        var parentOffset = $canvasNew.offset(); 
        var relX = e.pageX - parentOffset.left;
        
        var ctx = $canvasNew[0].getContext("2d");
        ctx.clearRect(0, 0, width, barHeight);
        renderMarker(ctx, relX-barHeight/2, 0, borderTemplate, fillTemplate, fillTemplate);
    });
    $canvasNew.mouseleave(function(){
        clearCanvasNew();
    });
    $canvasNew.click(function(e){  // <-- user clicked to add new marker
        if(isDraggingMarker || isChoosingColor) return;

        var parentOffset = $canvasNew.offset(); 
        var relX = e.pageX - parentOffset.left;
        var k = (_palette.range.max - _palette.range.min) / width;
        
        var x = k * relX + _palette.range.min;
        var c = _palette.getHsla(x);
        var p = {
            x: x,
            leftColor: c,
            rightColor: c
        };
        addPalettePoint(p);
    });

    updateMarkers();
};InteractiveDataDisplay.Gestures = {};
InteractiveDataDisplay.Gestures.FullEventList = [
    "mousedown",
    "mousemove",
    "mouseup",
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
    "gesturestart",
    "gesturechange",
    "gestureend",
    "MSGestureStart",
    "MSGestureChange",
    "MSGestureEnd",
    "MSGestureCancel",
    "MSPointerDown", 
];
InteractiveDataDisplay.Gestures.zoomLevelFactor = 1.4;

/* Calculates local offset of mouse cursor in specified jQuery element.
@param jqelement  (JQuery to Dom element) jQuery element to get local offset for.
@param event   (Mouse event args) mouse event args describing mouse cursor.
*/
InteractiveDataDisplay.Gestures.getXBrowserMouseOrigin = function (jqelement, event) {
    var getPageCoordinates = function (element) {  
        var left = 0;
        var top = 0;

        while (element) {
            left += element.offsetLeft;
            top += element.offsetTop;

            element = element.offsetParent;
        }
        return { left: left, top: top };
    };

    var pageOffset = getPageCoordinates(jqelement[0]);

    var offsetX = event.pageX - pageOffset.left;
    var offsetY = event.pageY - pageOffset.top;
    return {
        x: offsetX,
        y: offsetY
    };
}

//Gesture for performing Pan operation
//Take horizontal and vertical offset in screen coordinates
//@param src    Source of gesture stream. ["Mouse", "Touch"]
InteractiveDataDisplay.Gestures.PanGesture = function (xOffset, yOffset, src) {
    this.Type = "Pan";
    this.Source = src;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
}

//Gesture for perfoming Zoom operation
//Takes zoom origin point in screen coordinates and scale value
InteractiveDataDisplay.Gestures.ZoomGesture = function (xOrigin, yOrigin, scaleFactor, src) {
    this.Type = "Zoom";
    this.Source = src;
    this.xOrigin = xOrigin;
    this.yOrigin = yOrigin;
    this.scaleFactor = scaleFactor;
}

//Gesture for performing Stop of all
//current transitions and starting to performing new
InteractiveDataDisplay.Gestures.PinGesture = function (src) {
    this.Type = "Pin";
    this.Source = src;
}


/*****************************************
* Gestures for non touch based devices   *
* mousedown, mousemove, mouseup          *
* xbrowserwheel                          *
******************************************/

//Subject that converts input mouse events into Pan gestures 
InteractiveDataDisplay.Gestures.createPanSubject = function (vc) {

    var _doc = $(document);

    var mouseDown = Rx.Observable.fromEvent(vc, "mousedown");
    var mouseMove = Rx.Observable.fromEvent(vc, "mousemove");
    var mouseUp = Rx.Observable.fromEvent(_doc, "mouseup");

    var mouseMoves = mouseMove.skip(1).zip(mouseMove, function (left, right) {
        return new InteractiveDataDisplay.Gestures.PanGesture(left.clientX - right.clientX, left.clientY - right.clientY, "Mouse");
    });

    var stopPanning = mouseUp;

    var mouseDrags = mouseDown.selectMany(function (md) {
        return mouseMoves.takeUntil(stopPanning);
    });

    return mouseDrags;
}

//Subject that converts input mouse events into Pin gestures
InteractiveDataDisplay.Gestures.createPinSubject = function (vc) {
    var mouseDown = Rx.Observable.fromEvent(vc, "mousedown");

    return mouseDown.select(function (md) {
        return new InteractiveDataDisplay.Gestures.PinGesture("Mouse");
    });
}

//Subject that converts input mouse events into Zoom gestures 
InteractiveDataDisplay.Gestures.createZoomSubject = function (vc) {
    vc.unbind('mousewheel');
    vc.mousewheel(function (objEvent, intDelta) {
        objEvent.preventDefault();
        var event = jQuery.Event("xbrowserwheel");
        event.delta = intDelta;
        event.origin = InteractiveDataDisplay.Gestures.getXBrowserMouseOrigin(vc, objEvent);
        vc.trigger(event);
    });

    var mouseWheel = Rx.Observable.fromEvent(vc, "xbrowserwheel");

    var mouseWheels = mouseWheel.zip(mouseWheel, function (arg) {
        return new InteractiveDataDisplay.Gestures.ZoomGesture(arg.origin.x, arg.origin.y, arg.delta > 0 ? 1 / InteractiveDataDisplay.Gestures.zoomLevelFactor : 1 * InteractiveDataDisplay.Gestures.zoomLevelFactor, "Mouse");
    });

    var mousedblclick = Rx.Observable.fromEvent(vc, "dblclick");

    var mousedblclicks = mousedblclick.zip(mousedblclick, function (event) {
        var origin = InteractiveDataDisplay.Gestures.getXBrowserMouseOrigin(vc, event);
        return new InteractiveDataDisplay.Gestures.ZoomGesture(origin.x, origin.y, 1.0 / InteractiveDataDisplay.Gestures.zoomLevelFactor, "Mouse");
    });

    //return mouseWheels.Merge(mousedblclicks); //disabling mouse double clicks, as it causes strange behavior in conjection with elliptical zooming on the clicked item.
    return mouseWheels;
}


/*********************************************************
* Gestures for iPad (or any webkit based touch browser)  *
* touchstart, touchmove, touchend, touchcancel           *
* gesturestart, gesturechange, gestureend                *  
**********************************************************/


//Subject that converts input touch events into Pan gestures
InteractiveDataDisplay.Gestures.createTouchPanSubject = function (vc) {
    var _doc = $(document);

    var touchStart = Rx.Observable.fromEvent(vc, "touchstart");
    var touchMove = Rx.Observable.fromEvent(vc, "touchmove");
    var touchEnd = Rx.Observable.fromEvent(_doc, "touchend");
    var touchCancel = Rx.Observable.fromEvent(_doc, "touchcancel");

    var gestures = touchStart.selectMany(function (o) {
        return touchMove.takeUntil(touchEnd.merge(touchCancel)).skip(1).zip(touchMove, function (left, right) {
            return { "left": left.originalEvent, "right": right.originalEvent };
        }).where(function (g) {
            return (g.left.targetTouches.length == 1 && g.right.targetTouches.length == 1 && g.left.changedTouches.length == 1 && g.right.changedTouches.length == 1)
        }).select(function (g) {
            return new InteractiveDataDisplay.Gestures.PanGesture(g.left.targetTouches[0].pageX - g.right.targetTouches[0].pageX, g.left.targetTouches[0].pageY - g.right.targetTouches[0].pageY, "Touch");
        });
    });

    return gestures;
}

//Subject that converts input touch events into Pin gestures
InteractiveDataDisplay.Gestures.createTouchPinSubject = function (vc) {
    var touchStart = Rx.Observable.fromEvent(vc, "touchstart");

    return touchStart.select(function (ts) {
        return new InteractiveDataDisplay.Gestures.PinGesture("Touch");
    });
}

//Subject that converts input touch events into Zoom gestures
InteractiveDataDisplay.Gestures.createTouchZoomSubject = function (vc) {
    var _doc = $(document);

    var gestureStart = Rx.Observable.fromEvent(vc, "touchstart");
    var gestureChange = Rx.Observable.fromEvent(vc, "touchmove");
    var gestureEnd = Rx.Observable.fromEvent(_doc, "touchend");
    var touchCancel = Rx.Observable.fromEvent(_doc, "touchcancel");

    var gestures = gestureStart.selectMany(function (o) {
        return gestureChange.takeUntil(gestureEnd.merge(touchCancel)).skip(1).zip(gestureChange, function (left, right) {
            return { "left": left.originalEvent, "right": right.originalEvent };
        }).where(function (g) {
            return (g.left.targetTouches.length == 2 && g.right.targetTouches.length == 2);
        }).select(function (g) {
            var start_dist = Math.sqrt((g.left.targetTouches[0].pageX - g.left.targetTouches[1].pageX) * (g.left.targetTouches[0].pageX - g.left.targetTouches[1].pageX) +
            (g.left.targetTouches[0].pageY - g.left.targetTouches[1].pageY) * (g.left.targetTouches[0].pageY - g.left.targetTouches[1].pageY));
            var end_dist = Math.sqrt((g.right.targetTouches[0].pageX - g.right.targetTouches[1].pageX) * (g.right.targetTouches[0].pageX - g.right.targetTouches[1].pageX) +
            (g.right.targetTouches[0].pageY - g.right.targetTouches[1].pageY) * (g.right.targetTouches[0].pageY - g.right.targetTouches[1].pageY));
            var delta = start_dist / end_dist;
            var center = {
                x: Math.abs(g.right.targetTouches[1].pageX - g.right.targetTouches[0].pageX),
                y: Math.abs(g.right.targetTouches[1].pageY - g.right.targetTouches[0].pageY)
            };
            return new InteractiveDataDisplay.Gestures.ZoomGesture(center.x, center.y, 1 / delta, "Touch");
        });
    });

    return gestures;
}


/**************************************************************
* Gestures for IE on Win8                                     *
* MSPointerUp, MSPointerDown                                  *
* MSGestureStart, MSGestureChange, MSGestureEnd, MSGestureTap *
***************************************************************/

//Subject that converts input touch events (on win8+) into Pan gestures
InteractiveDataDisplay.Gestures.createTouchPanSubjectWin8 = function (vc) {
    var gestureStart = Rx.Observable.fromEvent(vc, "MSGestureStart");
    var gestureChange = Rx.Observable.fromEvent(vc, "MSGestureChange");
    var gestureEnd = Rx.Observable.fromEvent($(document), "MSGestureEnd");

    var gestures = gestureStart.selectMany(function (o) {
        var changes = gestureChange.startWith({ originalEvent: { offsetX: o.originalEvent.offsetX, offsetY: o.originalEvent.offsetY } });

        return changes.takeUntil(gestureEnd).skip(1).zip(changes, function (left, right) {
            return { "left": left.originalEvent, "right": right.originalEvent };
        }).where(function (g) {
            return g.left.scale === g.right.scale && g.left.detail != g.left.MSGESTURE_FLAG_INERTIA && g.right.detail != g.right.MSGESTURE_FLAG_INERTIA;
        }).select(function (g) {
            return new InteractiveDataDisplay.Gestures.PanGesture(g.left.offsetX - g.right.offsetX, g.left.offsetY - g.right.offsetY, "Touch");
        });
    });

    return gestures;
}

//Subject that converts input touch events (on win8+) into Pin gestures
InteractiveDataDisplay.Gestures.createTouchPinSubjectWin8 = function (vc) {
    var pointerDown = Rx.Observable.fromEvent(vc, "MSPointerDown");

    return pointerDown.select(function (gt) {
        return new InteractiveDataDisplay.Gestures.PinGesture("Touch");
    });
}

//Subject that converts input touch events (on win8+) into Zoom gestures
InteractiveDataDisplay.Gestures.createTouchZoomSubjectWin8 = function (vc) {
    var gestureStart = Rx.Observable.fromEvent(vc, "MSGestureStart");
    var gestureChange = Rx.Observable.fromEvent(vc, "MSGestureChange");
    var gestureEnd = Rx.Observable.fromEvent(vc, "MSGestureEnd");

    var gestures = gestureStart.selectMany(function (o) {

        return gestureChange.takeUntil(gestureEnd).where(function (g) {
            return g.originalEvent.scale !== 1 && g.originalEvent.scale !== 0 && g.originalEvent.detail != g.originalEvent.MSGESTURE_FLAG_INERTIA;
        }).select(function (g) {
            return new InteractiveDataDisplay.Gestures.ZoomGesture(o.originalEvent.offsetX, o.originalEvent.offsetY, 1 / g.originalEvent.scale, "Touch");
        });
    });

    return gestures;
}

InteractiveDataDisplay.Gestures.GesturesPool = function () {
    var gesturesDictionary = [];

    this.addMSGestureSource = function (dom) {
        gesturesDictionary.forEach(function (child) {
            if (child === dom) {
                return;
            }
        });

        gesturesDictionary.push(dom);

        dom.addEventListener("MSPointerDown", function (e) {
            if (dom.gesture === undefined) {
                var newGesture = new MSGesture();
                newGesture.target = dom;
                dom.gesture = newGesture;
            }

            dom.gesture.addPointer(e.pointerId);
        }, false);
    };
};

InteractiveDataDisplay.Gestures.GesturesPool = new InteractiveDataDisplay.Gestures.GesturesPool();

//Creates gestures stream for specified jQuery element source
InteractiveDataDisplay.Gestures.getGesturesStream = function (source) {
    var panController;
    var zoomController;
    var pinController;

    //panController = InteractiveDataDisplay.Gestures.createPanSubject(source);
    //zoomController = InteractiveDataDisplay.Gestures.createZoomSubject(source);
    //pinController = InteractiveDataDisplay.Gestures.createPinSubject(source);
    //return pinController.Merge(panController.Merge(zoomController));

    if (window.navigator.msPointerEnabled && typeof(MSGesture) !== "undefined") {
        var domSource = source[0];
        InteractiveDataDisplay.Gestures.GesturesPool.addMSGestureSource(domSource);

        // win 8
        panController = InteractiveDataDisplay.Gestures.createTouchPanSubjectWin8(source);
        var zoomControllerTouch = InteractiveDataDisplay.Gestures.createTouchZoomSubjectWin8(source);
        var zoomControllerMouse = InteractiveDataDisplay.Gestures.createZoomSubject(source);
        zoomController = zoomControllerTouch.merge(zoomControllerMouse);
        pinController = InteractiveDataDisplay.Gestures.createTouchPinSubjectWin8(source);

    } else {
        // no touch support, only mouse events
        panController = InteractiveDataDisplay.Gestures.createPanSubject(source);
        zoomController = InteractiveDataDisplay.Gestures.createZoomSubject(source);
        pinController = InteractiveDataDisplay.Gestures.createPinSubject(source);
    }

    var seq = pinController.merge(panController.merge(zoomController));
    if ('ontouchstart' in document.documentElement) {
        // webkit browser
        panController = InteractiveDataDisplay.Gestures.createTouchPanSubject(source);
        zoomController = InteractiveDataDisplay.Gestures.createTouchZoomSubject(source);
        pinController = InteractiveDataDisplay.Gestures.createTouchPinSubject(source);

        seq = seq.merge(pinController.merge(panController.merge(zoomController)));
    }
    return seq;
}

//modify the gesture stream to apply the logic of gesture handling by the axis
InteractiveDataDisplay.Gestures.applyHorizontalBehavior = function (gestureSequence) {
    return gestureSequence
    .select(function (el) { //setting any vertical movement to zero 
        if (el.Type == "Pan")
            el.yOffset = 0;
        else if (el.Type == "Zoom")
            el.preventVertical = true;
        return el;
    });
}


InteractiveDataDisplay.Gestures.applyVerticalBehavior = function (gestureSequence) {
    return gestureSequence
    .select(function (el) { //setting any horizontal movement to zero
        if (el.Type == "Pan")
            el.xOffset = 0;
        else if (el.Type == "Zoom")
            el.preventHorizontal = true;
        return el;
    });
};InteractiveDataDisplay = typeof InteractiveDataDisplay == 'undefined' ? {} : InteractiveDataDisplay;
 
InteractiveDataDisplay.DataTransform = function (dataToPlot, plotToData, domain, type) {
    this.dataToPlot = dataToPlot;
    this.plotToData = plotToData;

    this.domain = domain || {
        isInDomain: function (value) {
            return true;
        }
    };

    this.type = type;
};

var mercator_maxPhi = 85.05112878; //87.1147576363384; // deg
var mercator_R = mercator_maxPhi / Math.log(Math.tan(mercator_maxPhi * Math.PI / 360.0 + Math.PI / 4));
InteractiveDataDisplay.mercatorTransform = new InteractiveDataDisplay.DataTransform(
    function (phi_deg) {
        if (phi_deg >= -mercator_maxPhi && phi_deg <= mercator_maxPhi)
            return mercator_R * Math.log(Math.tan(Math.PI * (phi_deg + 90) / 360));
        else return phi_deg;
    },
    function (y) {
        if (-mercator_maxPhi <= y && y <= mercator_maxPhi) {
            return 360 * Math.atan(Math.exp(y / mercator_R)) / Math.PI - 90;
        }
        return y;
    },
    undefined,
    "mercator"
);


Math.LOGE10 = Math.log(10);

InteractiveDataDisplay.logTransform = new InteractiveDataDisplay.DataTransform(
    function (x_d) {
        return Math.log(x_d) / Math.LOGE10;
    },
    function (x_p) {
        return Math.pow(10, x_p);
    },
    { isInDomain: function (x) { return x > 0.00000001; } },
    "log10"
);

InteractiveDataDisplay.identityTransform = new InteractiveDataDisplay.DataTransform(
    function (x_d) { return x_d; },
    function (x_p) { return x_p; },
    { isInDomain: function (x) { return true } },
    "identity"
);;InteractiveDataDisplay.AnimationBase = function () {
    var _obs = undefined;
    var that = this;

    this.isInAnimation = false;

    var observable = Rx.Observable.create(function (rx) {
        _obs = rx;
        return function () {
        };
    });

    Object.defineProperty(this, "currentObserver", {
        get: function () { return _obs; },
        configurable: false
    });

    Object.defineProperty(this, "currentObservable", { 
        get: function () { return observable; },
        configurable: false
    });

    this.targetPlotRect = undefined;

    this.getCurrentPlotRect = function () {
    }

    this.stop = function () {
        if (that.isInAnimation) {
            that.isInAnimation = false;
        }

        if (_obs) {
            _obs.onNext({ plotRect: that.getCurrentPlotRect(), isLast: true });
            _obs.onCompleted();
            _obs = undefined;
        }

        this.additionalStopRutines();
    };

    this.additionalStopRutines = function () {
    };

    this.animate = function (getVisible, finalPlotRect) {
    };
}

InteractiveDataDisplay.PanZoomAnimation = function () {
    this.base = InteractiveDataDisplay.AnimationBase;
    this.base();

    var that = this;

    var screenSize = undefined;
    var startPlotRect = undefined;
    var estimatedPlotRect = undefined;

    var prevTime = new Date();
    var prevFramePlotRect = undefined;
    var prevEstimatedPlotRect = undefined;
    var direction = undefined;
    var pathLength = 0;

    var animationHandle = undefined;
    var velocity = undefined;

    var deltaWidth = 0;
    var deltaHeight = 0;

    this.getCurrentPlotRect = function () {
        return prevFramePlotRect;
    }

    Object.defineProperty(this, "previousEstimatedPlotRect", {
        get: function () { return prevEstimatedPlotRect; },
        configurable: false
    });


    var generateNextPlotRect = function () {
        var _obs = that.currentObserver;
        if (_obs) {
            var curTime = new Date();
            var timeDiff = curTime.getTime() - prevTime.getTime();
            var k = velocity * timeDiff;

            var dx = estimatedPlotRect.x - prevFramePlotRect.x;
            var dy = estimatedPlotRect.y - prevFramePlotRect.y;

            var curDist = Math.max(estimatedPlotRect.width / 1000, Math.sqrt(dx * dx + dy * dy)); //Math.max(1.0, Math.sqrt(dx * dx + dy * dy));

            var newX = prevFramePlotRect.x + curDist * k * direction.x;
            var newY = prevFramePlotRect.y + curDist * k * direction.y;

            var newWidth = (estimatedPlotRect.width - prevFramePlotRect.width) * k + prevFramePlotRect.width;
            var newHeight = (estimatedPlotRect.height - prevFramePlotRect.height) * k + prevFramePlotRect.height;

            prevTime = curTime;

            dx = newX - startPlotRect.x;
            dy = newY - startPlotRect.y;
            var distToStart = Math.sqrt(dx * dx + dy * dy);

            var currentDeltaWidth = newWidth - startPlotRect.width;
            var currentDeltaHeight = newHeight - startPlotRect.height;

            if (distToStart >= pathLength //if we moved beyond the target point we must stop
                || Math.abs(currentDeltaWidth) > Math.abs(deltaWidth)
                || Math.abs(currentDeltaHeight) > Math.abs(deltaHeight)//if we changed the scale more than needed we must stop
            ) {
                //we have reach the target visible. stop
                that.isInAnimation = false;
                prevFramePlotRect = estimatedPlotRect;
                that.stop();
            }
            else {
                prevFramePlotRect = { x: newX, y: newY, width: newWidth, height: newHeight };

                that.currentPlotRect = prevFramePlotRect;
                _obs.onNext({ plotRect: prevFramePlotRect, isLast: false });
            }
        }
    }

    var animationStep = function () {
        generateNextPlotRect();
        if (that.isInAnimation) {
            animationHandle = setTimeout(function () { animationStep(); }, 1000 / 60);
        }
    }

    this.animate = function (getVisible, finalPlotRect) {

        if (InteractiveDataDisplay.Gestures.zoomLevelFactor != 1.2) {
            InteractiveDataDisplay.Gestures.zoomLevelFactor = 1.2;
        }

        if (animationHandle !== undefined) {
            clearTimeout(animationHandle);
            animationHandle = undefined;
        }

        prevEstimatedPlotRect = finalPlotRect;

        var startVisible = getVisible();

        startPlotRect = prevFramePlotRect === undefined ? startVisible.plotRect : prevFramePlotRect;

        estimatedPlotRect = finalPlotRect;

        prevFramePlotRect = startPlotRect;

        direction = {
            x: estimatedPlotRect.x - startPlotRect.x,
            y: estimatedPlotRect.y - startPlotRect.y
        };

        pathLength = Math.sqrt(direction.x * direction.x + direction.y * direction.y);

        if (pathLength > 1e-10) {
            direction = { x: direction.x / pathLength, y: direction.y / pathLength };
        }
        else {
            direction = { x: 0, y: 0 };
        }

        deltaWidth = finalPlotRect.width - startPlotRect.width;
        deltaHeight = finalPlotRect.height - startPlotRect.height;

        if (deltaWidth != 0 || deltaHeight != 0) {
            velocity = 0.008;
        }
        else {
            velocity = 0.009;
        }

        that.isInAnimation = true;
        animationStep();
    }

    this.additionalStopRutines = function () {
        if (animationHandle !== undefined) {
            clearTimeout(animationHandle);
            animationHandle = undefined;
        }

        that.isInAnimation = false;

        screenSize = undefined;
        startPlotRect = undefined;
        startCS = undefined;
        estimatedPlotRect = undefined;

        prevTime = new Date();
        prevFramePlotRect = undefined;
        prevEstimatedPlotRect = undefined;
        direction = undefined;
        pathLength = 0;

        startScreenCenter = undefined;
        previousFrameScreenCenter = undefined;
        endScreenCenter = undefined;

        animationHandle = undefined;

        deltaWidth = 0;
        deltaHeight = 0;
    };

}

InteractiveDataDisplay.PanZoomAnimation.prototype = new InteractiveDataDisplay.AnimationBase;;InteractiveDataDisplay.Utils.getPlotRectForMap = function (map, screenSize) {
    var maxLat = 85.05112878;

    var _screenSize = screenSize === undefined ? { width: map.getWidth(), height: map.getHeight() } : screenSize;
    var mapCenter = map.getCenter();

    var w_s = _screenSize.width;
    var h_s = _screenSize.height;

    var deltaLon = 30;
    var firstPoint = map.tryLocationToPixel({ latitude: 0, longitude: mapCenter.longitude }, Microsoft.Maps.PixelReference.control);
    var secondPoint = map.tryLocationToPixel({ latitude: 0, longitude: mapCenter.longitude + deltaLon }, Microsoft.Maps.PixelReference.control);
    var pixelDelta = secondPoint.x - firstPoint.x;

    if (pixelDelta < 0)
        pixelDelta = firstPoint.x - map.tryLocationToPixel({ latitude: 0, longitude: mapCenter.longitude - deltaLon }, Microsoft.Maps.PixelReference.control).x;

    var periodDelta = pixelDelta / deltaLon;
    var leftCoordinate = mapCenter.longitude - firstPoint.x / periodDelta;
    var rightCoordinate = mapCenter.longitude + (w_s - firstPoint.x) / periodDelta;

    var bounds = map.getBounds();
    var topCoordinate = bounds.getNorth();
    var bottomCoordinate = bounds.getSouth();

    var topPixelDelta = 0;
    if (topCoordinate >= maxLat) {
        topCoordinate = maxLat
        var topPixel = map.tryLocationToPixel({ latitude: topCoordinate, longitude: mapCenter.longitude }, Microsoft.Maps.PixelReference.control);
        topPixelDelta = topPixel.y;
    }

    var bottomPixelDelta = 0;
    if (bottomCoordinate <= -maxLat) {
        bottomCoordinate = -maxLat;
        var bottomPixel = map.tryLocationToPixel({ latitude: bottomCoordinate, longitude: mapCenter.longitude }, Microsoft.Maps.PixelReference.control);
        bottomPixelDelta = h_s - bottomPixel.y
    }

    var width = rightCoordinate - leftCoordinate;
    if (width < 0)
        width = bounds.width;

    var newPlotRect = { y: bottomCoordinate, x: leftCoordinate, width: width, height: topCoordinate - bottomCoordinate };

    var yBottomPlot = InteractiveDataDisplay.mercatorTransform.dataToPlot(newPlotRect.y);
    var yTopPlot = InteractiveDataDisplay.mercatorTransform.dataToPlot(newPlotRect.y + newPlotRect.height);
    newPlotRect.y = yBottomPlot;
    newPlotRect.height = yTopPlot - yBottomPlot;

    if (bottomPixelDelta != 0 || topPixelDelta != 0) {
        var realH = h_s - topPixelDelta - bottomPixelDelta;
        var scale = newPlotRect.height / realH;
        var bottomOffset = bottomPixelDelta * scale;
        var topOffset = topPixelDelta * scale;
        var newBottom = newPlotRect.y - bottomOffset;
        var newTop = newPlotRect.y + newPlotRect.height + topOffset;
        newPlotRect.y = newBottom;
        newPlotRect.height = newTop - newBottom;
    }

    return newPlotRect;
};

InteractiveDataDisplay.BingMapsAnimation = function (map) {
    this.base = InteractiveDataDisplay.AnimationBase;
    this.base();

    var that = this;
    var _map = map;

    //PanZoom animation variables
    var startPlotRect = undefined;
    var estimatedPlotRect = undefined;

    var prevTime = new Date();
    var prevFramePlotRect = undefined;
    var prevEstimatedPlotRect = undefined;
    var direction = undefined;
    var pathLength = 0;

    var animationHandle = undefined;
    var velocity = undefined;

    var deltaWidth = 0;
    var deltaHeight = 0;

    var isInnerBMAnimationUsed = false;

    Object.defineProperty(this, "previousEstimatedPlotRect", {
        get: function () { return prevEstimatedPlotRect; },
        configurable: false
    });


    var getMerkatorPlotRect = function (plotRect) {
        var yBottomPlot = InteractiveDataDisplay.mercatorTransform.dataToPlot(plotRect.y);
        var yTopPlot = InteractiveDataDisplay.mercatorTransform.dataToPlot(plotRect.y + plotRect.height);

        return { x: plotRect.x, y: yBottomPlot, width: plotRect.width, height: yTopPlot - yBottomPlot };
    }

    var generateNextPlotRect = function () {
        var _obs = that.currentObserver;
        if (_obs) {
            var curTime = new Date();
            var timeDiff = curTime.getTime() - prevTime.getTime();
            var k = velocity * timeDiff;

            var dx = estimatedPlotRect.x - prevFramePlotRect.x;
            var dy = estimatedPlotRect.y - prevFramePlotRect.y;

            var curDist = Math.max(estimatedPlotRect.width / 1000, Math.sqrt(dx * dx + dy * dy)); //Math.max(1.0, Math.sqrt(dx * dx + dy * dy));

            var newX = prevFramePlotRect.x + curDist * k * direction.x;
            var newY = prevFramePlotRect.y + curDist * k * direction.y;

            var newWidth = (estimatedPlotRect.width - prevFramePlotRect.width) * k + prevFramePlotRect.width;
            var newHeight = (estimatedPlotRect.height - prevFramePlotRect.height) * k + prevFramePlotRect.height;

            prevTime = curTime;

            dx = newX - startPlotRect.x;
            dy = newY - startPlotRect.y;
            var distToStart = Math.sqrt(dx * dx + dy * dy);

            if (distToStart >= pathLength) //if we moved beyond the target point we must stop
            {
                //we have reach the target visible. stop
                that.isInAnimation = false;
                setMapVisible(estimatedPlotRect);
                that.stop();
            }
            else {
                prevFramePlotRect = { x: newX, y: newY, width: newWidth, height: newHeight };

                that.currentPlotRect = prevFramePlotRect;
                setMapVisible(prevFramePlotRect);
            }
        }
    }


    var animationStep = function () {
        generateNextPlotRect();
        if (that.isInAnimation) {
            animationHandle = setTimeout(function () { animationStep(); }, 1000 / 60);
        }
    }


    this.animate = function (getVisible, finalPlotRect, settings) {

        if (InteractiveDataDisplay.Gestures.zoomLevelFactor != 1.4) {
            InteractiveDataDisplay.Gestures.zoomLevelFactor = 1.4;
        }

        if (animationHandle !== undefined) {
            clearTimeout(animationHandle);
            animationHandle = undefined;
        }

        prevEstimatedPlotRect = finalPlotRect;
        that.isInAnimation = true;

        if (settings && settings.isFirstFrame) {
            syncViews(true);
        }

        if (settings && settings.gestureType == "Pan") {
            isInnerBMAnimationUsed = false;


            var startVisible = getVisible();

            startPlotRect = prevFramePlotRect === undefined ? startVisible.plotRect : prevFramePlotRect;

            estimatedPlotRect = finalPlotRect;

            prevFramePlotRect = startPlotRect;

            direction = {
                x: estimatedPlotRect.x - startPlotRect.x,
                y: estimatedPlotRect.y - startPlotRect.y
            };

            pathLength = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
            if (pathLength > 1e-10) {
                direction = { x: direction.x / pathLength, y: direction.y / pathLength };
            } else {
                direction = { x: 0, y: 0 };
            }

            velocity = 0.008;

            animationStep();
        } else {
            isInnerBMAnimationUsed = true;
            setMapVisible(finalPlotRect);

        }
    }


    var oldRealZoom = 1;

    var getRealMapWidth = function () {
        var mapCenter = _map.getCenter();
        var _screenSize = { width: _map.getWidth(), height: _map.getHeight() };

        var w_s = _screenSize.width;
        var h_s = _screenSize.height;

        var deltaLon = 30;
        var firstPoint = _map.tryLocationToPixel({ latitude: 0, longitude: mapCenter.longitude }, Microsoft.Maps.PixelReference.control);
        var secondPoint = _map.tryLocationToPixel({ latitude: 0, longitude: mapCenter.longitude + deltaLon }, Microsoft.Maps.PixelReference.control);
        var pixelDelta = secondPoint.x - firstPoint.x;

        if (pixelDelta < 0)
            pixelDelta = firstPoint.x - _map.tryLocationToPixel({ latitude: 0, longitude: mapCenter.longitude - deltaLon }, Microsoft.Maps.PixelReference.control).x;

        var periodDelta = pixelDelta / deltaLon;
        var leftCoordinate = mapCenter.longitude - firstPoint.x / periodDelta;
        var rightCoordinate = mapCenter.longitude + (w_s - firstPoint.x) / periodDelta;

        return rightCoordinate - leftCoordinate;
    }

    var calcZoom = function (plotRect, screenSize, ceil) {
        var xZoom = Math.max(1, Math.log(screenSize.width / plotRect.width * 360 / 256) / Math.log(2));

        var yBottom = InteractiveDataDisplay.mercatorTransform.plotToData(plotRect.y);
        var yTop = InteractiveDataDisplay.mercatorTransform.plotToData(plotRect.y + plotRect.height);

        var yZoom = Math.max(1, Math.log(screenSize.height / (yTop - yBottom) * 180 / 256) / Math.log(2));

        if (ceil === true) {
            xZoom = Math.ceil(xZoom) - 1;
            yZoom = Math.ceil(yZoom);
        }

        return Math.min(xZoom, yZoom);
    }

    var calcSizeFromZoom = function (zoom, screenSize) {
        return { width: screenSize.width * 360 / (256 * Math.pow(2, zoom)), height: screenSize.height * 180 / (256 * Math.pow(2, zoom)) };
    }

    this.setMapView = function (plotRect, screenSize) {

        var mapScreenSize = screenSize;
        if (screenSize === undefined) {
            mapScreenSize = { width: _map.getWidth(), height: _map.getHeight() };
        }

        var realZoom = calcZoom(plotRect, mapScreenSize, true);
        var prevZoom = _map.getZoom();

        var plotCenter = {
            x: plotRect.x + plotRect.width / 2,
            y: InteractiveDataDisplay.mercatorTransform.plotToData(plotRect.y + plotRect.height / 2)
        };

        _map.setView({
            center: new Microsoft.Maps.Location(plotCenter.y, plotCenter.x),
            zoom: realZoom,
            animate: false
        });
    }

    var deltaZoom = 0;

    var setMapVisible = function (plotRect) {

        var realZoom;
        var prevZoom = _map.getZoom() + deltaZoom;
        deltaZoom = 0;

        if (isInnerBMAnimationUsed) {
            realZoom = calcZoom(plotRect, { width: _map.getWidth(), height: _map.getHeight() });
        } else {
            realZoom = prevZoom;
        }

        var plotCenter = {
            x: plotRect.x + plotRect.width / 2,
            y: InteractiveDataDisplay.mercatorTransform.plotToData(plotRect.y + plotRect.height / 2)
        };


        if (!isInnerBMAnimationUsed) {
            _map.setView({
                center: new Microsoft.Maps.Location(plotCenter.y, plotCenter.x),
                zoom: realZoom,
                animate: false
            });
        } else {
            if ((prevZoom > 1 || realZoom > prevZoom)) {
                var finalZoom = Math.round(realZoom);
                var finalSize = calcSizeFromZoom(finalZoom, { width: _map.getWidth(), height: _map.getHeight() });

                if (plotRect.zoomOrigin) {
                    var zoomOrigin = { x: plotRect.zoomOrigin.x, y: InteractiveDataDisplay.mercatorTransform.plotToData(plotRect.zoomOrigin.y) };
                    var zoomOffset = { x: zoomOrigin.x - plotCenter.x, y: zoomOrigin.y - plotCenter.y };
                    var scaleVec = { x: finalSize.width / plotRect.width, y: finalSize.height / plotRect.height };
                    var newCenter = { x: zoomOrigin.x - zoomOffset.x * scaleVec.x, y: zoomOrigin.y - zoomOffset.y * scaleVec.y };
                }
                else {
                    var newCenter = plotCenter;
                }

                _map.setView({ 
                    center: new Microsoft.Maps.Location(newCenter.y, newCenter.x), //Math.abs(curDeltaZoom) >= 0.5 ? new Microsoft.Maps.Location(newCenter.y, newCenter.x) : _map.getCenter(),
                    zoom: realZoom,
                    animate: true
                });
            } else {
                syncViews();
                prevEstimatedPlotRect = that.getCurrentPlotRect();
                that.stop();
            }
        }
    };

    var calcActualPlotRect = function () {
        return InteractiveDataDisplay.Utils.getPlotRectForMap(_map);
    }

    this.getCurrentPlotRect = function () {
        return calcActualPlotRect(_map.getBounds(), _map.getCenter());
    }

    var syncViews = function (syncUpdate) {
        var _obs = that.currentObserver;
        if (_obs !== undefined) {
            var currentPlotRect = that.getCurrentPlotRect();
            var args = { plotRect: currentPlotRect, isLast: false };
            if (syncUpdate !== undefined) {
                args.syncUpdate = syncUpdate;
            } 
            _obs.onNext(args);
        }
    }

    Microsoft.Maps.Events.addHandler(_map, 'viewchange', function (e) {
        syncViews();
    });

    Microsoft.Maps.Events.addHandler(_map, 'viewchangeend', function (e) {
        prevEstimatedPlotRect = that.getCurrentPlotRect();
        if (isInnerBMAnimationUsed || !that.isInAnimation) {
            that.stop();
        } else {
            syncViews(); 
        }
    });

    this.additionalStopRutines = function () {
        if (animationHandle !== undefined) {
            clearTimeout(animationHandle);
            animationHandle = undefined;
        }

        that.isInAnimation = false;

        startPlotRect = undefined;
        estimatedPlotRect = undefined;
        prevEstimatedPlotRect = undefined;

        prevTime = new Date();
        prevFramePlotRect = undefined;
        direction = undefined;
        pathLength = 0;

        animationHandle = undefined;

        deltaWidth = 0;
        deltaHeight = 0;
    };
}

InteractiveDataDisplay.BingMapsAnimation.prototype = new InteractiveDataDisplay.AnimationBase;
;
//extending basic events
InteractiveDataDisplay.Event = InteractiveDataDisplay.Event || {};
InteractiveDataDisplay.Event.widthScaleChanged = jQuery.Event("widthScaleChanged");
    

InteractiveDataDisplay.Navigation = function (_plot, _setVisibleRegion) {
    var plot = _plot;
    var that = this;

    plot.master.host.on('visibleRectChanged', function(arg) {
        var screenWidth = plot.screenSize.width;
        var screenHeight = plot.screenSize.width;            
            
        ct = plot.coordinateTransform;
        vis = ct.getPlotRect({ x: 0, y: 0, width: screenWidth, height: screenHeight });

        var scaleToReport = screenWidth/vis.width;
        //console.log('navigation: plot x='+vis.x+' y='+vis.y+' w='+vis.width+' h='+vis.height);
        // console.log('firing scale changed to:'+scaleToReport);
        plot.master.host.trigger(InteractiveDataDisplay.Event.widthScaleChanged, {'widthScale':scaleToReport});
    });        
    

    var getVisible = function () {
        var size = plot.screenSize;
        var ct = plot.coordinateTransform;
        var vis = ct.getPlotRect({ x: 0, y: 0, width: size.width, height: size.height });

        return { plotRect: vis, screenSize: size, cs: ct };
    }

    /** Calls externally set function that implements needed side effects. */     
    var setVisibleRegion = function(plotRect,settings){        
        _setVisibleRegion(plotRect,settings);                
    }

    var stream = undefined;
    var unsubscriber = undefined;

    var _animation = undefined;

    var prevCalcedPlotRect = undefined;

    Object.defineProperty(this, "animation", {
        get: function () { return _animation; },
        set: function (value) {
            that.stop();
            _animation = value;
        },
        configurable: false 
    });

    /** Calculates panned plotRect */
    var panPlotRect = InteractiveDataDisplay.NavigationUtils.calcPannedRect;

    /** Calculates zoomed plotRect */
    var zoomPlotRect = InteractiveDataDisplay.NavigationUtils.calcZoomedRect;    

    //How many screen units in one plot unit of width (units: screen pts/plot pts)
    Object.defineProperty(this, "widthScale", {
        get: function () {
            var scale = plot.coordinateTransform.getScale();
            return scale.x;
         },
        set: function (value) {
            that.stop();
            var visRect = plot.visibleRect;
            var screenWidth = plot.screenSize.width;
            var plotAspectRatio = visRect.width/visRect.height;
            var center = {x: visRect.x + visRect.width*0.5, y: visRect.y + visRect.height*0.5};
            var newPlotRectWidth = screenWidth / value;
            var newPlotRectHeight = newPlotRectWidth / plotAspectRatio;
            var newPlotRect = {x: center.x - newPlotRectWidth*0.5, y: center.y - newPlotRectHeight*0.5, width: newPlotRectWidth, height: newPlotRectHeight};            
            that.setVisibleRect(newPlotRect,false,{'suppressScaleChangeNotification': true});            
        },
        configurable: false 
    });
    
    var subscribeToAnimation = function () {
        if (_animation) {
            return _animation.currentObservable.subscribe(function (args) {
                if (args.isLast) {
                    plot.isInAnimation = false;
                    // I wanted to trigger scaleChanged (special key in settings object) only for the last update
                    // but the experience looks buggy, thus
                    // triggering on every animation update
                }
                var settings = { syncUpdate: args.syncUpdate };
                setVisibleRegion(args.plotRect, settings);
            }, function (err) {
            }, function () {
            }
            );
        }
    };
    
    // Changes the visible rectangle of the plot.
    // visible is { x, y, width, height } in the plot plane, (x,y) is the left-bottom corner
    // if animate is true, uses elliptical zoom animation
    this.setVisibleRect = function (visible, animate, settings) {
        that.stop();
        prevCalcedPlotRect = visible;
        if (animate) {
            if (!that.animation.isInAnimation) {
                subscribeToAnimation();
            }

            plot.isInAnimation = true;
            that.animation.animate(getVisible, visible); 
        }
        else {
            var coercedVisisble = visible;
            if (that.animation && that.animation.constraint) {
                coercedVisisble = that.animation.constraint(coercedVisisble);
            }

            setVisibleRegion(coercedVisisble, settings);
        }        
    };

    var processGesture = function (gesture) {

        var size = plot.screenSize;
        var ct;
        var vis;

        var prevEstimatedRect = that.animation !== undefined ? that.animation.previousEstimatedPlotRect : prevCalcedPlotRect;

        if (prevEstimatedRect !== undefined) {
            ct = InteractiveDataDisplay.Utils.calcCSWithPadding(prevEstimatedRect, { width: size.width, height: size.height }, { left: 0, top: 0, bottom: 0, right: 0 }, plot.aspectRatio);
            vis = prevEstimatedRect;
        }
        else {
            ct = plot.coordinateTransform;
            vis = ct.getPlotRect({ x: 0, y: 0, width: size.width, height: size.height });
        }

        if (gesture.Type == "Pin") {
            if (that.animation && that.animation.isInAnimation) {
                that.stop();
            }
            return;
        }
        
        var newPlotRect = undefined;
        if (gesture.Type == "Pan") {
            newPlotRect = panPlotRect(vis, size, gesture);
            prevCalcedPlotRect = newPlotRect
        } else if (gesture.Type == "Zoom") {
            newPlotRect = zoomPlotRect(vis, ct, gesture);

            if (newPlotRect.width < 1e-9) {
                newPlotRect.width = vis.width;
                newPlotRect.x = vis.x;
            }

            if (newPlotRect.height < 1e-9) {
                newPlotRect.height = vis.height;
                newPlotRect.y = vis.y;
            }

            prevCalcedPlotRect = newPlotRect;            
        }

        if (newPlotRect) {
            if (that.animation) {

                var firstFrame = !that.animation.isInAnimation;
                if (firstFrame) {
                    subscribeToAnimation();
                }

                plot.isInAnimation = true;
                that.animation.animate(getVisible, newPlotRect, { gestureType: gesture.Type, isFirstFrame: firstFrame });
            } else {
                setVisibleRegion(newPlotRect);                
            }
        }
    };

    this.stop = function () {
        plot.isInAnimation = false;
        prevCalcedPlotRect = undefined;
        if (that.animation) {
            that.animation.stop();
        }
    };

    Object.defineProperty(this, "gestureSource", {
        get: function () { return stream; },
        set: function (value) {
            if (stream == value) return;

            if (unsubscriber) {
                unsubscriber.dispose();
            }

            stream = value;

            if (stream !== undefined) {
                unsubscriber = stream.subscribe(function (gesture) {
                    processGesture(gesture);
                });
            }
        },
        configurable: false
    });

    that.animation = new InteractiveDataDisplay.PanZoomAnimation();
};


InteractiveDataDisplay.NavigationUtils = {};

// Suppress default multitouch for web pages to enable special handling of multitouch in InteractiveDataDisplay.
// Suitable for iPad, Mac.
// For Windows 8, idd.css contains special css property for this effect.
InteractiveDataDisplay.NavigationUtils.SuppressDefaultMultitouch = function () {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
        // Suppress the default iOS elastic pan/zoom actions.
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    }
    if (navigator.userAgent.indexOf('Mac') != -1) {
        // Disable Mac OS Scrolling Bounce Effect
        var body = document.getElementsByTagName('body')[0];
        body.style.overflow = "hidden";
    }
};

InteractiveDataDisplay.NavigationUtils.calcPannedRect = function (plotRect, screenSize, panGesture) {
    var scale = { x: plotRect.width / screenSize.width, y: plotRect.height / screenSize.height };
    var panX = panGesture.xOffset * scale.x;
    var panY = -panGesture.yOffset * scale.y;
    return { x: plotRect.x - panX, y: plotRect.y - panY, width: plotRect.width, height: plotRect.height };
};

InteractiveDataDisplay.NavigationUtils.calcZoomedRect = function (plotRect, coordinateTransform, zoomGesture) {
    //console.log("zoom origin: " + zoomGesture.xOrigin + ", " + zoomGesture.yOrigin);
    //console.log("zoom origin plot: " + coordinateTransform.screenToPlotX(zoomGesture.xOrigin) + ", " + coordinateTransform.screenToPlotY(zoomGesture.yOrigin));

    var scale = coordinateTransform.getScale();

    var screenCenterX = coordinateTransform.plotToScreenX(plotRect.x + plotRect.width / 2);
    var screenCenterY = coordinateTransform.plotToScreenY(plotRect.y + plotRect.height / 2);

    var panOffsetX = zoomGesture.preventHorizontal ? 0 : zoomGesture.xOrigin - screenCenterX;
    var panOffsetY = zoomGesture.preventVertical ? 0 : zoomGesture.yOrigin - screenCenterY;

    var pannedRect = { x: plotRect.x + panOffsetX / scale.x, y: plotRect.y - panOffsetY / scale.y, width: plotRect.width, height: plotRect.height };

    var newWidth = plotRect.width * (zoomGesture.preventHorizontal ? 1 : zoomGesture.scaleFactor);
    var newHeight = plotRect.height * (zoomGesture.preventVertical ? 1 : zoomGesture.scaleFactor);
    var newX = pannedRect.x + pannedRect.width / 2 - newWidth / 2;
    var newY = pannedRect.y + pannedRect.height / 2 - newHeight / 2;

    return { x: newX - zoomGesture.scaleFactor * panOffsetX / scale.x, y: newY + zoomGesture.scaleFactor * panOffsetY / scale.y, width: newWidth, height: newHeight, zoomOrigin: { x: coordinateTransform.screenToPlotX(zoomGesture.xOrigin), y: coordinateTransform.screenToPlotY(zoomGesture.yOrigin) } };
}

;//
// (optional) onTaskCompleted: source x task -> unit 
InteractiveDataDisplay.SharedRenderWorker = function (scriptUri, onTaskCompleted) {
    var isWorkerAvailable = !!window.Worker;
    if (!isWorkerAvailable && window.console) console.log("Web workers are not available");
    var worker = null;
    try {
        worker = isWorkerAvailable ? new Worker(scriptUri) : null;
    }
    catch (e) {
        console.error("Error creating Web worker from " + scriptUri + ": " + e.message);
    }
    var isWorking = false;
    // Array of task source descriptors: { source, pendingTask, index /* in this array */ }
    var sources = [];

    var that = this;

    // Finds or creates, and then returns the source descriptor for the given task source object.
    var getSourceDescriptor = function (source, dontCreateIfNotExists) {
        var n = sources.length;
        for (var i = 0; i < n; i++) {
            if (sources[i].source == source) return sources[i];
        }
        if (dontCreateIfNotExists) return undefined;
        // Descriptor not found, adding new one:
        var descr = {
            source: source,
            pendingTask: undefined,
            index: n
        };
        sources.push(descr);
        return descr;
    };

    var getPendingDescriptor = function (completedDescr) {
        var n = sources.length;
        var iStart = 0;
        if (completedDescr) {
            iStart = completedDescr.index;
            for (var i = iStart + 1; i < n; i++)
                if (sources[i].pendingTask) return sources[i];
            for (var i = 0; i < iStart; i++)
                if (sources[i].pendingTask) return sources[i];
            if (sources[iStart].pendingTask) return sources[iStart];
        } else {
            for (var i = 0; i < n; i++)
                if (sources[i].pendingTask) return sources[i];
        }
        return undefined;
    };

    if (worker) {
        worker.onmessage = function (event) {
            var task = event.data;
            var completedDescr = sources[task.sourceIndex];
            var pendingDescr = getPendingDescriptor(completedDescr);

            if (pendingDescr) {
                isWorking = true;
                worker.postMessage(pendingDescr.pendingTask);
                pendingDescr.pendingTask = undefined;
                //console.log("Starting render: " + pendingDescr.source.name);
            } else {
                isWorking = false;
            }

            //console.log("Complete render: " + completedDescr.source.name);
            if (onTaskCompleted)
                onTaskCompleted(completedDescr.source, task);
        };

        worker.onerror = function (event) {
            var str = event.message + " (" + event.filename + ":" + event.lineno + ")";
            if (typeof console === 'object')
                console.log(str);

            //todo: run next task
        };
    }

    ///////////// API ///////////////////////////////////////////

    this.enqueue = function (task, source) {
        var descr = getSourceDescriptor(source);
        task.sourceIndex = descr.index;
        //console.log("enqueue render: " + source.name);

        if (!isWorking) {
            isWorking = true;
            descr.pendingTask = undefined;

            worker.postMessage(task);
            //console.log("Starting render: " + source.name);
        }
        else {
            descr.pendingTask = task;
        }
    };

    // Cancels the pending task for the given source.
    this.cancelPending = function (source) {
        var descr = getSourceDescriptor(source, true);
        if (descr)
            descr.pendingTask = undefined;
    };


    if (!isWorkerAvailable) {
        this.enqueue = function (task, source) {
        };

        this.cancelPending = function (source) {
        };
    }
}
;InteractiveDataDisplay.heatmapBackgroundRendererCodeBase64 = "SW50ZXJhY3RpdmVEYXRhRGlzcGxheSA9IHR5cGVvZiBJbnRlcmFjdGl2ZURhdGFEaXNwbGF5ID09ICd1bmRlZmluZWQnID8ge30gOiBJbnRlcmFjdGl2ZURhdGFEaXNwbGF5Ow0KIA0KSW50ZXJhY3RpdmVEYXRhRGlzcGxheS5EYXRhVHJhbnNmb3JtID0gZnVuY3Rpb24gKGRhdGFUb1Bsb3QsIHBsb3RUb0RhdGEsIGRvbWFpbiwgdHlwZSkgew0KICAgIHRoaXMuZGF0YVRvUGxvdCA9IGRhdGFUb1Bsb3Q7DQogICAgdGhpcy5wbG90VG9EYXRhID0gcGxvdFRvRGF0YTsNCg0KICAgIHRoaXMuZG9tYWluID0gZG9tYWluIHx8IHsNCiAgICAgICAgaXNJbkRvbWFpbjogZnVuY3Rpb24gKHZhbHVlKSB7DQogICAgICAgICAgICByZXR1cm4gdHJ1ZTsNCiAgICAgICAgfQ0KICAgIH07DQoNCiAgICB0aGlzLnR5cGUgPSB0eXBlOw0KfTsNCg0KdmFyIG1lcmNhdG9yX21heFBoaSA9IDg1LjA1MTEyODc4OyAvLzg3LjExNDc1NzYzNjMzODQ7IC8vIGRlZw0KdmFyIG1lcmNhdG9yX1IgPSBtZXJjYXRvcl9tYXhQaGkgLyBNYXRoLmxvZyhNYXRoLnRhbihtZXJjYXRvcl9tYXhQaGkgKiBNYXRoLlBJIC8gMzYwLjAgKyBNYXRoLlBJIC8gNCkpOw0KSW50ZXJhY3RpdmVEYXRhRGlzcGxheS5tZXJjYXRvclRyYW5zZm9ybSA9IG5ldyBJbnRlcmFjdGl2ZURhdGFEaXNwbGF5LkRhdGFUcmFuc2Zvcm0oDQogICAgZnVuY3Rpb24gKHBoaV9kZWcpIHsNCiAgICAgICAgaWYgKHBoaV9kZWcgPj0gLW1lcmNhdG9yX21heFBoaSAmJiBwaGlfZGVnIDw9IG1lcmNhdG9yX21heFBoaSkNCiAgICAgICAgICAgIHJldHVybiBtZXJjYXRvcl9SICogTWF0aC5sb2coTWF0aC50YW4oTWF0aC5QSSAqIChwaGlfZGVnICsgOTApIC8gMzYwKSk7DQogICAgICAgIGVsc2UgcmV0dXJuIHBoaV9kZWc7DQogICAgfSwNCiAgICBmdW5jdGlvbiAoeSkgew0KICAgICAgICBpZiAoLW1lcmNhdG9yX21heFBoaSA8PSB5ICYmIHkgPD0gbWVyY2F0b3JfbWF4UGhpKSB7DQogICAgICAgICAgICByZXR1cm4gMzYwICogTWF0aC5hdGFuKE1hdGguZXhwKHkgLyBtZXJjYXRvcl9SKSkgLyBNYXRoLlBJIC0gOTA7DQogICAgICAgIH0NCiAgICAgICAgcmV0dXJuIHk7DQogICAgfSwNCiAgICB1bmRlZmluZWQsDQogICAgIm1lcmNhdG9yIg0KKTsNCg0KDQpNYXRoLkxPR0UxMCA9IE1hdGgubG9nKDEwKTsNCg0KSW50ZXJhY3RpdmVEYXRhRGlzcGxheS5sb2dUcmFuc2Zvcm0gPSBuZXcgSW50ZXJhY3RpdmVEYXRhRGlzcGxheS5EYXRhVHJhbnNmb3JtKA0KICAgIGZ1bmN0aW9uICh4X2QpIHsNCiAgICAgICAgcmV0dXJuIE1hdGgubG9nKHhfZCkgLyBNYXRoLkxPR0UxMDsNCiAgICB9LA0KICAgIGZ1bmN0aW9uICh4X3ApIHsNCiAgICAgICAgcmV0dXJuIE1hdGgucG93KDEwLCB4X3ApOw0KICAgIH0sDQogICAgeyBpc0luRG9tYWluOiBmdW5jdGlvbiAoeCkgeyByZXR1cm4geCA+IDAuMDAwMDAwMDE7IH0gfSwNCiAgICAibG9nMTAiDQopOw0KDQpJbnRlcmFjdGl2ZURhdGFEaXNwbGF5LmlkZW50aXR5VHJhbnNmb3JtID0gbmV3IEludGVyYWN0aXZlRGF0YURpc3BsYXkuRGF0YVRyYW5zZm9ybSgNCiAgICBmdW5jdGlvbiAoeF9kKSB7IHJldHVybiB4X2Q7IH0sDQogICAgZnVuY3Rpb24gKHhfcCkgeyByZXR1cm4geF9wOyB9LA0KICAgIHsgaXNJbkRvbWFpbjogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHRydWUgfSB9LA0KICAgICJpZGVudGl0eSINCik7O3NlbGYub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7DQogICAgdmFyIHhzY2FsZSA9IGV2ZW50LmRhdGEuc2NhbGVYLCB4b2Zmc2V0ID0gZXZlbnQuZGF0YS5vZmZzZXRYLCB5c2NhbGUgPSBldmVudC5kYXRhLnNjYWxlWSwgeW9mZnNldCA9IGV2ZW50LmRhdGEub2Zmc2V0WTsNCiAgICB2YXIgZGF0YVRvU2NyZWVuWCwgZGF0YVRvU2NyZWVuWTsNCiAgICB2YXIgaGFzZHRYLCBoYXNkdFk7DQoNCiAgICBpZiAodHlwZW9mIGV2ZW50LmRhdGEueERhdGFUcmFuc2Zvcm0gPT0gJ3N0cmluZycpIHsNCiAgICAgICAgdmFyIGR0ID0gZ2V0RGF0YVRyYW5zZm9ybShldmVudC5kYXRhLnhEYXRhVHJhbnNmb3JtKTsNCiAgICAgICAgdmFyIGYgPSBkdC5kYXRhVG9QbG90Ow0KICAgICAgICBoYXNkdFggPSB0cnVlOw0KICAgICAgICBkYXRhVG9TY3JlZW5YID0gZnVuY3Rpb24gKHgpIHsNCiAgICAgICAgICAgIHJldHVybiBmKHgpICogeHNjYWxlICsgeG9mZnNldDsNCiAgICAgICAgfTsNCiAgICB9IGVsc2Ugew0KICAgICAgICBoYXNkdFggPSBmYWxzZTsNCiAgICAgICAgZGF0YVRvU2NyZWVuWCA9IGZ1bmN0aW9uICh4KSB7DQogICAgICAgICAgICByZXR1cm4geHNjYWxlICogeCArIHhvZmZzZXQ7DQogICAgICAgIH07DQogICAgfQ0KICAgIGlmICh0eXBlb2YgZXZlbnQuZGF0YS55RGF0YVRyYW5zZm9ybSA9PSAnc3RyaW5nJykgew0KICAgICAgICB2YXIgZHQgPSBnZXREYXRhVHJhbnNmb3JtKGV2ZW50LmRhdGEueURhdGFUcmFuc2Zvcm0pOw0KICAgICAgICB2YXIgZiA9IGR0LmRhdGFUb1Bsb3Q7DQogICAgICAgIGhhc2R0WSA9IHRydWU7DQogICAgICAgIGRhdGFUb1NjcmVlblkgPSBmdW5jdGlvbiAoeSkgew0KICAgICAgICAgICAgcmV0dXJuIHlvZmZzZXQgLSBmKHkpICogeXNjYWxlOw0KICAgICAgICB9Ow0KICAgIH0gZWxzZSB7DQogICAgICAgIGhhc2R0WSA9IGZhbHNlOw0KICAgICAgICBkYXRhVG9TY3JlZW5ZID0gZnVuY3Rpb24gKHkpIHsNCiAgICAgICAgICAgIHJldHVybiB5b2Zmc2V0IC0geSAqIHlzY2FsZTsNCiAgICAgICAgfTsNCiAgICB9DQoNCiAgICB2YXIgd2lkdGggPSBldmVudC5kYXRhLndpZHRoOw0KICAgIHZhciBoZWlnaHQgPSBldmVudC5kYXRhLmhlaWdodDsNCg0KICAgIGlmIChldmVudC5kYXRhLngubGVuZ3RoICE9IGV2ZW50LmRhdGEuZi5sZW5ndGgpIHsNCiAgICAgICAgcmVuZGVyTWF0cml4KGV2ZW50LmRhdGEuaW1hZ2UsIHdpZHRoLCBoZWlnaHQsIGV2ZW50LmRhdGEueCwgZXZlbnQuZGF0YS55LCBldmVudC5kYXRhLmYsIGV2ZW50LmRhdGEuZm1pbiwgZXZlbnQuZGF0YS5mbWF4LCBldmVudC5kYXRhLnBhbGV0dGUsIGV2ZW50LmRhdGEucGxvdFJlY3QsIGRhdGFUb1NjcmVlblgsIGRhdGFUb1NjcmVlblksIGhhc2R0WCwgaGFzZHRZKTsNCiAgICB9IGVsc2Ugew0KICAgICAgICB2YXIgc2NyZWVuVG9EYXRhWCwgc2NyZWVuVG9EYXRhWTsNCiAgICAgICAgeHNjYWxlX3IgPSAxIC8geHNjYWxlOw0KICAgICAgICB5c2NhbGVfciA9IDEgLyB5c2NhbGU7DQogICAgICAgIGlmIChoYXNkdFgpIHsNCiAgICAgICAgICAgIHZhciBwbG90VG9EYXRhID0gZHQucGxvdFRvRGF0YTsNCiAgICAgICAgICAgIHNjcmVlblRvRGF0YVggPSBmdW5jdGlvbiAoeHMpIHsNCiAgICAgICAgICAgICAgICByZXR1cm4gcGxvdFRvRGF0YSgoeHMgLSB4b2Zmc2V0KSAqIHhzY2FsZV9yKTsNCiAgICAgICAgICAgIH07DQogICAgICAgIH0gZWxzZSB7DQogICAgICAgICAgICBzY3JlZW5Ub0RhdGFYID0gZnVuY3Rpb24gKHhzKSB7DQogICAgICAgICAgICAgICAgcmV0dXJuICh4cyAtIHhvZmZzZXQpICogeHNjYWxlX3I7DQogICAgICAgICAgICB9Ow0KICAgICAgICB9DQogICAgICAgIGlmIChoYXNkdFkpIHsNCiAgICAgICAgICAgIHZhciBwbG90VG9EYXRhID0gZHQucGxvdFRvRGF0YTsNCiAgICAgICAgICAgIHNjcmVlblRvRGF0YVkgPSBmdW5jdGlvbiAoeXMpIHsNCiAgICAgICAgICAgICAgICByZXR1cm4gcGxvdFRvRGF0YSgoeW9mZnNldCAtIHlzKSAqIHlzY2FsZV9yKTsNCiAgICAgICAgICAgIH07DQogICAgICAgIH0gZWxzZSB7DQogICAgICAgICAgICBzY3JlZW5Ub0RhdGFZID0gZnVuY3Rpb24gKHlzKSB7DQogICAgICAgICAgICAgICAgcmV0dXJuICh5b2Zmc2V0IC0geXMpICogeXNjYWxlX3I7DQogICAgICAgICAgICB9Ow0KICAgICAgICB9DQogICAgICAgIHJlbmRlckdyYWRpZW50KGV2ZW50LmRhdGEuaW1hZ2UsIHdpZHRoLCBoZWlnaHQsIGV2ZW50LmRhdGEueCwgZXZlbnQuZGF0YS55LCBldmVudC5kYXRhLmYsIGV2ZW50LmRhdGEuZm1pbiwgZXZlbnQuZGF0YS5mbWF4LCBldmVudC5kYXRhLnBhbGV0dGUsIGV2ZW50LmRhdGEucGxvdFJlY3QsIGRhdGFUb1NjcmVlblgsIHNjcmVlblRvRGF0YVgsIGRhdGFUb1NjcmVlblksIHNjcmVlblRvRGF0YVksIGhhc2R0WCwgaGFzZHRZKTsNCiAgICB9DQogICAgZXZlbnQuZGF0YS54ID0gdW5kZWZpbmVkOw0KICAgIGV2ZW50LmRhdGEueSA9IHVuZGVmaW5lZDsNCiAgICBldmVudC5kYXRhLmYgPSB1bmRlZmluZWQ7DQogICAgZXZlbnQuZGF0YS5wYWxldHRlID0gdW5kZWZpbmVkOw0KICAgIHNlbGYucG9zdE1lc3NhZ2UoZXZlbnQuZGF0YSk7DQp9Ow0KDQp2YXIgZ2V0RGF0YVRyYW5zZm9ybSA9IGZ1bmN0aW9uICh0eXBlKSB7DQogICAgaWYgKHR5cGUgPT0gJ21lcmNhdG9yJykNCiAgICAgICAgcmV0dXJuIEludGVyYWN0aXZlRGF0YURpc3BsYXkubWVyY2F0b3JUcmFuc2Zvcm07DQogICAgdGhyb3cgJ1Vua25vd24gZGF0YSB0cmFuc2Zvcm0nOw0KfTsNCg0KDQp2YXIgcmVuZGVyTWF0cml4ID0gZnVuY3Rpb24gKGltYWdlLCB3aWR0aCwgaGVpZ2h0LCB4LCB5LCBmLCBmbWluLCBmbWF4LCBwYWxldHRlLCBwbG90UmVjdCwgZGF0YVRvU2NyZWVuWCwgZGF0YVRvU2NyZWVuWSwgaGFzRGF0YVRyYW5zZm9ybVgsIGhhc0RhdGFUcmFuc2Zvcm1ZKSB7DQogICAgdmFyIG4gPSB4Lmxlbmd0aDsNCiAgICB2YXIgbSA9IHkubGVuZ3RoOw0KICAgIHZhciBpbWFnZURhdGEgPSBpbWFnZS5kYXRhOw0KICAgIHZhciB3ID0gd2lkdGg7DQogICAgdmFyIGggPSBoZWlnaHQ7DQoNCiAgICB2YXIgaTAsIGowOw0KICAgIHZhciB4MCwgeTA7IC8vIGluIGRhdGEgc3BhY2UNCg0KDQogICAgLy8gcHJlY29tcHV0aW5nIHkgaW4gc2NyZWVuIGNvb3JkaW5hdGVzOg0KICAgIHZhciB5c2NyID0gbmV3IEZsb2F0MzJBcnJheShtKTsNCiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG07IGkrKykNCiAgICAgICAgeXNjcltpXSA9IGRhdGFUb1NjcmVlblkoeVtpXSkgfCAwOyAvLyBmbG9vcjsNCg0KICAgIC8vIHN0YXJ0IGNlbGwNCiAgICB2YXIgbGVmdHAgPSBwbG90UmVjdC54Ow0KICAgIHZhciByaWdodHAgPSBsZWZ0cCArIHBsb3RSZWN0LndpZHRoOw0KICAgIGlmIChoYXNEYXRhVHJhbnNmb3JtWCkgew0KICAgICAgICBmb3IgKGkwID0gMDsgaTAgPCBuOyBpMCsrKSB7DQogICAgICAgICAgICBpZiAoZGF0YVRvU2NyZWVuWCh4W2kwXSkgPj0gMCkgew0KICAgICAgICAgICAgICAgIGlmIChpMCA9PSAwKSBpMCsrOw0KICAgICAgICAgICAgICAgIGJyZWFrOw0KICAgICAgICAgICAgfQ0KICAgICAgICB9DQogICAgfSBlbHNlIHsNCiAgICAgICAgZm9yIChpMCA9IDA7IGkwIDwgbjsgaTArKykgew0KICAgICAgICAgICAgaWYgKHhbaTBdID49IGxlZnRwKSB7DQogICAgICAgICAgICAgICAgaWYgKGkwID09IDApIGkwKys7DQogICAgICAgICAgICAgICAgYnJlYWs7DQogICAgICAgICAgICB9DQogICAgICAgIH0NCiAgICB9DQogICAgaWYgKGkwID09IG4pIHJldHVybjsNCg0KICAgIHZhciBib3R0b21wID0gcGxvdFJlY3QueTsNCiAgICB2YXIgdG9wcCA9IGJvdHRvbXAgKyBwbG90UmVjdC5oZWlnaHQ7DQogICAgZm9yIChqMCA9IDA7IGowIDwgbTsgajArKykgew0KICAgICAgICBpZiAoeXNjcltqMF0gPCBoKSB7DQogICAgICAgICAgICBpZiAoajAgPT0gMCkgajArKzsNCiAgICAgICAgICAgIGJyZWFrOw0KICAgICAgICB9DQogICAgfQ0KICAgIGlmIChqMCA9PSBtKSByZXR1cm47DQoNCiAgICAvLyByZW5kZXJpbmcgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBib3R0b20gdG8gdG9wDQogICAgdmFyIGNlbGxMZWZ0X3MgPSAwLCBjZWxsUmlnaHRfcyA9IDA7DQoNCiAgICB2YXIgaXNOb3JtYWxpemVkID0gcGFsZXR0ZS5pc05vcm1hbGl6ZWQ7DQogICAgdmFyIGNvbG9ycyA9IHBhbGV0dGUuY29sb3JzOw0KICAgIHZhciBjb2xOID0gKGNvbG9ycy5sZW5ndGggPj4gMikgLSAxOw0KICAgIGlmICghaXNOb3JtYWxpemVkKSB7DQogICAgICAgIGZtYXggPSBwYWxldHRlLnJhbmdlLm1heDsNCiAgICAgICAgZm1pbiA9IHBhbGV0dGUucmFuZ2UubWluOw0KICAgIH0NCiAgICB2YXIgcGFsZXR0ZUsgPSBmbWF4ICE9PSBmbWluID8gMS4wIC8gKGZtYXggLSBmbWluKSA6IDA7DQoNCiAgICBmb3IgKHZhciBpID0gaTA7IGkgPCBuICYmIGNlbGxSaWdodF9zIDwgdzsgaSsrKSB7DQogICAgICAgIC8vIGkwIGlzIHRoZSByaWdodCB2aXNpYmxlIGVkZ2Ugb2YgdGhlIGNlbGwNCiAgICAgICAgeDAgPSB4W2kgLSAxXTsNCiAgICAgICAgdmFyIHgxID0geFtpXTsNCg0KICAgICAgICBpZiAoeDAgIT0geDAgfHwgeDEgIT0geDEpIHsNCiAgICAgICAgICAgIGNlbGxSaWdodF9zID0gdW5kZWZpbmVkOw0KICAgICAgICAgICAgY29udGludWU7DQogICAgICAgIH0NCg0KICAgICAgICBpZiAoY2VsbFJpZ2h0X3MpDQogICAgICAgICAgICBjZWxsTGVmdF9zID0gY2VsbFJpZ2h0X3M7DQogICAgICAgIGVsc2UNCiAgICAgICAgICAgIGNlbGxMZWZ0X3MgPSBNYXRoLmNlaWwoZGF0YVRvU2NyZWVuWCh4MCkpOw0KDQogICAgICAgIGNlbGxSaWdodF9zID0gTWF0aC5jZWlsKGRhdGFUb1NjcmVlblgoeDEpKTsNCiAgICAgICAgaWYgKGNlbGxMZWZ0X3MgPCAwKSBjZWxsTGVmdF9zID0gMDsNCiAgICAgICAgaWYgKGNlbGxSaWdodF9zID49IHcpIGNlbGxSaWdodF9zID0gdzsNCg0KICAgICAgICAvL2lmIChpID09IG4gLSAxKSBjZWxsUmlnaHRfcysrOw0KICAgICAgICBpZiAoY2VsbFJpZ2h0X3MgLSBjZWxsTGVmdF9zID09IDApIGNvbnRpbnVlOw0KDQogICAgICAgIHkwID0geVtqMCAtIDFdOw0KICAgICAgICB2YXIgY2VsbEJvdHRvbV9zID0gMCwNCiAgICAgICAgICAgIGNlbGxUb3BfcyA9IHlzY3JbajAgLSAxXTsNCiAgICAgICAgZm9yICh2YXIgaiA9IGowOyBqIDwgbSAmJiBjZWxsQm90dG9tX3MgPj0gMDsgaisrKSB7DQogICAgICAgICAgICB5MCA9IHlbaiAtIDFdOw0KICAgICAgICAgICAgdmFyIHkxID0geVtqXTsNCg0KICAgICAgICAgICAgaWYgKHkwICE9IHkwIHx8IHkxICE9IHkxKSB7DQogICAgICAgICAgICAgICAgY2VsbFRvcF9zID0gdW5kZWZpbmVkOw0KICAgICAgICAgICAgICAgIGNvbnRpbnVlOw0KICAgICAgICAgICAgfQ0KDQogICAgICAgICAgICBpZiAoY2VsbFRvcF9zKQ0KICAgICAgICAgICAgICAgIGNlbGxCb3R0b21fcyA9IGNlbGxUb3BfczsNCiAgICAgICAgICAgIGVsc2UNCiAgICAgICAgICAgICAgICBjZWxsQm90dG9tX3MgPSB5c2NyW2ogLSAxXTsNCiAgICAgICAgICAgIGNlbGxUb3BfcyA9IHlzY3Jbal07DQogICAgICAgICAgICBpZiAoY2VsbFRvcF9zIDwgMCkgY2VsbFRvcF9zID0gLTE7DQogICAgICAgICAgICBpZiAoY2VsbEJvdHRvbV9zID49IGgpIGNlbGxCb3R0b21fcyA9IGggLSAxOw0KDQogICAgICAgICAgICBpZiAoY2VsbFRvcF9zIC0gY2VsbEJvdHRvbV9zID09IDApIGNvbnRpbnVlOw0KDQogICAgICAgICAgICB2YXIgX2YgPSBmW2kgLSAxXVtqIC0gMV07DQogICAgICAgICAgICBpZiAoX2YgIT0gX2YpIGNvbnRpbnVlOw0KICAgICAgICAgICAgdmFyIHBhbGV0dGVWYWwgPSBwYWxldHRlSyAqIChfZiAtIGZtaW4pOw0KICAgICAgICAgICAgdmFyIGsgPSAocGFsZXR0ZVZhbCAqIGNvbE4pIHwgMDsNCiAgICAgICAgICAgIGlmIChrIDwgMCkgayA9IDA7DQogICAgICAgICAgICBlbHNlIGlmIChrID4gY29sTikgayA9IGNvbE47DQogICAgICAgICAgICBrID0gayA8PCAyOw0KDQogICAgICAgICAgICAvLyBmaWxscyB0aGUgY2VsbCB3aXRoIHNhbWUgY29sb3INCiAgICAgICAgICAgIGZvciAodmFyIHlzID0gY2VsbFRvcF9zICsgMTsgeXMgPD0gY2VsbEJvdHRvbV9zOyB5cysrKSB7DQogICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gKHcgKiB5cyArIGNlbGxMZWZ0X3MpIDw8IDI7DQogICAgICAgICAgICAgICAgZm9yICh2YXIgeHMgPSBjZWxsTGVmdF9zOyB4cyA8IGNlbGxSaWdodF9zOyB4cysrKSB7DQogICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YVtpbmRleCsrXSA9IGNvbG9yc1trXTsNCiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhW2luZGV4KytdID0gY29sb3JzW2sgKyAxXTsNCiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhW2luZGV4KytdID0gY29sb3JzW2sgKyAyXTsNCiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhW2luZGV4KytdID0gY29sb3JzW2sgKyAzXTsNCiAgICAgICAgICAgICAgICB9DQogICAgICAgICAgICB9DQogICAgICAgICAgICBpZiAoY2VsbFRvcF9zIDw9IDApIGJyZWFrOw0KICAgICAgICB9DQogICAgICAgIGlmIChjZWxsUmlnaHRfcyA+PSB3KSBicmVhazsNCiAgICB9DQp9Ow0KDQoNCnZhciByZW5kZXJHcmFkaWVudCA9IGZ1bmN0aW9uIChpbWFnZSwgd2lkdGgsIGhlaWdodCwgeCwgeSwgZiwgZm1pbiwgZm1heCwgcGFsZXR0ZSwgcGxvdFJlY3QsIGRhdGFUb1NjcmVlblgsIHNjcmVlblRvRGF0YVgsIGRhdGFUb1NjcmVlblksIHNjcmVlblRvRGF0YVksIGhhc0RhdGFUcmFuc2Zvcm1YLCBoYXNEYXRhVHJhbnNmb3JtWSkgew0KICAgIHZhciBuID0geC5sZW5ndGg7DQogICAgdmFyIG0gPSB5Lmxlbmd0aDsNCiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2UuZGF0YTsNCiAgICB2YXIgdyA9IHdpZHRoOw0KICAgIHZhciBoID0gaGVpZ2h0Ow0KDQogICAgLy8gcHJlY29tcHV0aW5nIHkgaW4gc2NyZWVuIGNvb3JkaW5hdGVzOg0KICAgIHZhciB5c2NyID0gbmV3IEZsb2F0MzJBcnJheShtKTsNCiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG07IGkrKykNCiAgICAgICAgeXNjcltpXSA9IGRhdGFUb1NjcmVlblkoeVtpXSkgfCAwOyAvLyBmbG9vcjsNCg0KICAgIC8vIHByZXBhcmluZyBzY3JlZW4gdG8gZGF0YSBtYXBwaW5nDQogICAgdmFyIG1hcFNjcmVlblRvRGF0YVggPSBuZXcgRmxvYXQzMkFycmF5KHcpOw0KICAgIGZvciAodmFyIHhzID0gMDsgeHMgPCB3OyB4cysrKSB7DQogICAgICAgIG1hcFNjcmVlblRvRGF0YVhbeHNdID0gc2NyZWVuVG9EYXRhWCh4cyArIDAuNSk7IC8vIHRvZG86IG1ha2UgaW5saW5lIHRyYW5zZm9ybSBmb3IgbGluZWFyIGNhc2UNCiAgICB9DQogICAgdmFyIG1hcFNjcmVlblRvRGF0YVkgPSBuZXcgRmxvYXQzMkFycmF5KGgpOw0KICAgIGZvciAodmFyIHlzID0gMDsgeXMgPCBoOyB5cysrKSB7DQogICAgICAgIG1hcFNjcmVlblRvRGF0YVlbeXNdID0gc2NyZWVuVG9EYXRhWSh5cyArIDAuNSk7IC8vIHRvZG86IG1ha2UgaW5saW5lIHRyYW5zZm9ybSBmb3IgbGluZWFyIGNhc2UNCiAgICB9DQoNCiAgICB2YXIgaTAsIGowOw0KICAgIHZhciB4MCwgeTA7IC8vIGluIGRhdGEgc3BhY2UNCg0KICAgIC8vIHN0YXJ0IGNlbGwNCiAgICB2YXIgbGVmdHAgPSBwbG90UmVjdC54Ow0KICAgIHZhciByaWdodHAgPSBsZWZ0cCArIHBsb3RSZWN0LndpZHRoOw0KICAgIGlmIChoYXNEYXRhVHJhbnNmb3JtWCkgew0KICAgICAgICBmb3IgKGkwID0gMDsgaTAgPCBuOyBpMCsrKSB7DQogICAgICAgICAgICBpZiAoZGF0YVRvU2NyZWVuWCh4W2kwXSkgPj0gMCkgew0KICAgICAgICAgICAgICAgIGlmIChpMCA9PSAwKSBpMCsrOw0KICAgICAgICAgICAgICAgIGJyZWFrOw0KICAgICAgICAgICAgfQ0KICAgICAgICB9DQogICAgfSBlbHNlIHsNCiAgICAgICAgZm9yIChpMCA9IDA7IGkwIDwgbjsgaTArKykgew0KICAgICAgICAgICAgaWYgKHhbaTBdID49IGxlZnRwKSB7DQogICAgICAgICAgICAgICAgaWYgKGkwID09IDApIGkwKys7DQogICAgICAgICAgICAgICAgYnJlYWs7DQogICAgICAgICAgICB9DQogICAgICAgIH0NCiAgICB9DQogICAgaWYgKGkwID09IG4pIHJldHVybjsNCg0KICAgIHZhciBib3R0b21wID0gcGxvdFJlY3QueTsNCiAgICB2YXIgdG9wcCA9IGJvdHRvbXAgKyBwbG90UmVjdC5oZWlnaHQ7DQogICAgZm9yIChqMCA9IDA7IGowIDwgbTsgajArKykgew0KICAgICAgICBpZiAoeXNjcltqMF0gPCBoKSB7DQogICAgICAgICAgICBpZiAoajAgPT0gMCkgajArKzsNCiAgICAgICAgICAgIGJyZWFrOw0KICAgICAgICB9DQogICAgfQ0KICAgIGlmIChqMCA9PSBtKSByZXR1cm47DQoNCiAgICAvLyByZW5kZXJpbmcgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBib3R0b20gdG8gdG9wDQogICAgdmFyIGNlbGxMZWZ0X3MgPSAwLCBjZWxsUmlnaHRfcyA9IDA7DQoNCiAgICB2YXIgaXNOb3JtYWxpemVkID0gcGFsZXR0ZS5pc05vcm1hbGl6ZWQ7DQogICAgdmFyIGNvbG9ycyA9IHBhbGV0dGUuY29sb3JzOw0KICAgIHZhciBjb2xOID0gKGNvbG9ycy5sZW5ndGggPj4gMikgLSAxOw0KICAgIGlmICghaXNOb3JtYWxpemVkKSB7DQogICAgICAgIGZtYXggPSBwYWxldHRlLnJhbmdlLm1heDsNCiAgICAgICAgZm1pbiA9IHBhbGV0dGUucmFuZ2UubWluOw0KICAgIH0NCiAgICB2YXIgcGFsZXR0ZUsgPSBmbWF4ICE9PSBmbWluID8gMS4wIC8gKGZtYXggLSBmbWluKSA6IDA7DQoNCiAgICB2YXIgZmxiLCBmbHQsIGZydCwgZnJiOw0KICAgIHZhciBmaSwgZmkxOw0KDQogICAgLy8gcmVuZGVyaW5nIHRoZSBpbWFnZQ0KICAgIGZvciAodmFyIGkgPSBpMDsgaSA8IG4gJiYgY2VsbFJpZ2h0X3MgPCB3OyBpKyspIHsNCiAgICAgICAgLy8gaTAgaXMgdGhlIHJpZ2h0IHZpc2libGUgZWRnZSBvZiB0aGUgY2VsbA0KICAgICAgICB4MCA9IHhbaSAtIDFdOw0KICAgICAgICB2YXIgeDEgPSB4W2ldOw0KICAgICAgICBpZiAoeDAgIT0geDAgfHwgeDEgIT0geDEpIHsgLy8gYSAhPSBhICBlcXVpdi4gaXNOYU4oYSkNCiAgICAgICAgICAgIGNlbGxSaWdodF9zID0gdW5kZWZpbmVkOw0KICAgICAgICAgICAgY29udGludWU7DQogICAgICAgIH0NCg0KICAgICAgICBpZiAoY2VsbFJpZ2h0X3MpDQogICAgICAgICAgICBjZWxsTGVmdF9zID0gY2VsbFJpZ2h0X3M7DQogICAgICAgIGVsc2UNCiAgICAgICAgICAgIGNlbGxMZWZ0X3MgPSBNYXRoLmNlaWwoZGF0YVRvU2NyZWVuWCh4MCkpOw0KICAgICAgICBjZWxsUmlnaHRfcyA9IE1hdGguY2VpbChkYXRhVG9TY3JlZW5YKHgxKSk7DQogICAgICAgIGlmIChjZWxsTGVmdF9zIDwgMCkgY2VsbExlZnRfcyA9IDA7DQogICAgICAgIGlmIChjZWxsUmlnaHRfcyA+PSB3KSBjZWxsUmlnaHRfcyA9IHc7DQogICAgICAgIGlmIChjZWxsUmlnaHRfcyAtIGNlbGxMZWZ0X3MgPT0gMCkgY29udGludWU7DQoNCiAgICAgICAgdmFyIGNlbGxCb3R0b21fcyA9IDAsIGNlbGxUb3BfcyA9IDA7DQogICAgICAgIGZpID0gZltpXTsNCiAgICAgICAgZmkxID0gZltpIC0gMV07DQogICAgICAgIGZvciAodmFyIGogPSBqMDsgaiA8IG0gJiYgY2VsbEJvdHRvbV9zID49IDA7IGorKykgew0KICAgICAgICAgICAgeTAgPSB5W2ogLSAxXTsNCiAgICAgICAgICAgIHZhciB5MSA9IHlbal07DQogICAgICAgICAgICBpZiAoeTAgIT0geTAgfHwgeTEgIT0geTEpIHsNCiAgICAgICAgICAgICAgICBjZWxsVG9wX3MgPSB1bmRlZmluZWQ7DQogICAgICAgICAgICAgICAgY29udGludWU7DQogICAgICAgICAgICB9DQoNCiAgICAgICAgICAgIGlmIChjZWxsVG9wX3MpDQogICAgICAgICAgICAgICAgY2VsbEJvdHRvbV9zID0gY2VsbFRvcF9zOw0KICAgICAgICAgICAgZWxzZQ0KICAgICAgICAgICAgICAgIGNlbGxCb3R0b21fcyA9IHlzY3JbaiAtIDFdOw0KICAgICAgICAgICAgY2VsbFRvcF9zID0geXNjcltqXTsNCiAgICAgICAgICAgIGlmIChjZWxsVG9wX3MgPCAwKSBjZWxsVG9wX3MgPSAtMTsNCiAgICAgICAgICAgIGlmIChjZWxsQm90dG9tX3MgPj0gaCkgY2VsbEJvdHRvbV9zID0gaCAtIDE7DQogICAgICAgICAgICBpZiAoY2VsbEJvdHRvbV9zIC0gY2VsbFRvcF9zID09IDApIGNvbnRpbnVlOw0KDQogICAgICAgICAgICAvLyBmaWxscyB0aGUgY2VsbA0KICAgICAgICAgICAgZmx0ID0gZmkxW2pdOw0KICAgICAgICAgICAgZmxiID0gZmkxW2ogLSAxXTsNCiAgICAgICAgICAgIGZydCA9IGZpW2pdOw0KICAgICAgICAgICAgZnJiID0gZmlbaiAtIDFdOw0KDQogICAgICAgICAgICBpZiAoZmx0ICE9IGZsdCB8fCBmbGIgIT0gZmxiIHx8IGZydCAhPSBmcnQgfHwgZnJiICE9IGZyYikNCiAgICAgICAgICAgICAgICBjb250aW51ZTsNCg0KICAgICAgICAgICAgdmFyIGt5TGVmdCA9IChmbHQgLSBmbGIpIC8gKHkxIC0geTApOw0KICAgICAgICAgICAgdmFyIGt5UmlnaHQgPSAoZnJ0IC0gZnJiKSAvICh5MSAtIHkwKTsNCiAgICAgICAgICAgIGZvciAodmFyIHlzID0gY2VsbFRvcF9zICsgMTsgeXMgPD0gY2VsbEJvdHRvbV9zOyB5cysrKSB7DQogICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gKHcgKiB5cyArIGNlbGxMZWZ0X3MpIDw8IDI7DQogICAgICAgICAgICAgICAgdmFyIF95ID0gbWFwU2NyZWVuVG9EYXRhWVt5c107DQogICAgICAgICAgICAgICAgdmFyIGZsZWZ0ID0ga3lMZWZ0ICogKF95IC0geTApICsgZmxiOw0KICAgICAgICAgICAgICAgIHZhciBmcmlnaHQgPSBreVJpZ2h0ICogKF95IC0geTApICsgZnJiOw0KICAgICAgICAgICAgICAgIHZhciBreCA9IChmcmlnaHQgLSBmbGVmdCkgLyAoeDEgLSB4MCk7DQoNCiAgICAgICAgICAgICAgICBmb3IgKHZhciB4cyA9IGNlbGxMZWZ0X3M7IHhzIDwgY2VsbFJpZ2h0X3M7IHhzKyspIHsNCiAgICAgICAgICAgICAgICAgICAgdmFyIF94ID0gbWFwU2NyZWVuVG9EYXRhWFt4c107DQogICAgICAgICAgICAgICAgICAgIHZhciBfZiA9IGt4ICogKF94IC0geDApICsgZmxlZnQ7DQogICAgICAgICAgICAgICAgICAgIHZhciBwYWxldHRlVmFsID0gcGFsZXR0ZUsgKiAoX2YgLSBmbWluKTsNCiAgICAgICAgICAgICAgICAgICAgdmFyIGsgPSAocGFsZXR0ZVZhbCAqIGNvbE4pIHwgMDsNCiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPCAwKSBrID0gMDsNCiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoayA+IGNvbE4pIGsgPSBjb2xOOw0KICAgICAgICAgICAgICAgICAgICBrID0gayA8PCAyOw0KDQogICAgICAgICAgICAgICAgICAgIC8vdmFyIGNvbG9yID0gZ2V0Q29sb3IocGFsZXR0ZVZhbCk7DQogICAgICAgICAgICAgICAgICAgIC8vaWYgKHhzID09IGNlbGxMZWZ0X3MgfHwgeHMgPT0gY2VsbFJpZ2h0X3MgLSAxIHx8ICAvKiB1bmNvbW1lbnQgdG8gZHJhdyB0aGUgYm9yZGVyIG9mIGNlbGxzICovDQogICAgICAgICAgICAgICAgICAgIC8vICAgIHlzID09IGNlbGxUb3BfcyArIDEgfHwgeXMgPT0gY2VsbEJvdHRvbV9zKQ0KICAgICAgICAgICAgICAgICAgICAvLyAgICBjb2xvciA9IHsgYTogMSwgcjogMCwgZzogMCwgYjogMjU1IH07DQoNCiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhW2luZGV4KytdID0gY29sb3JzW2srK107DQogICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YVtpbmRleCsrXSA9IGNvbG9yc1trKytdOw0KICAgICAgICAgICAgICAgICAgICBpbWFnZURhdGFbaW5kZXgrK10gPSBjb2xvcnNbaysrXTsNCiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhW2luZGV4KytdID0gY29sb3JzW2tdOw0KICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIGlmIChjZWxsVG9wX3MgPD0gMCkgYnJlYWs7DQogICAgICAgIH0NCiAgICAgICAgaWYgKGNlbGxSaWdodF9zID49IHcpIGJyZWFrOw0KICAgIH0NCn07DQo=";;//Class for plots and axes arrangement. Takes into account "placement" property of an element use it for element arrangement
InteractiveDataDisplay.Figure = function (div, master) {
    if (master !== undefined)
        throw "Figure cannot be a dependent plot";

    if (!div) return;

    var centralPart;
    if (div) {
        centralPart = $("<div data-idd-plot='plot' data-idd-placement='center'></div>");
        centralPart.css("z-index", InteractiveDataDisplay.ZIndexNavigationLayer).css("background-color", "rgba(0,0,0,0)");
    }

    var childDivs = div.children().toArray();

    /*
    childDivs.forEach(function (child) {
        var jqchild = $(child);
        var plotAttr = jqchild.attr("data-idd-plot");
        if (plotAttr !== undefined) {
            jqchild.appendTo(centralPart);
        }
    });*/

    centralPart.appendTo(div);

    this.base = InteractiveDataDisplay.Plot;
    this.base(div, master, centralPart);

    var that = this;
    centralPart.dblclick(function () {
        that.master.fitToView();
    });

    // returns true if "position" of the element is not "absolute"
    // and changes the style is required.
    var checkElementPosition = function (jqdiv) {
        //checking element position
        var pos = jqdiv.css("position");
        if (pos == "static") {
            jqdiv.css("position", "relative");
        }
        else if (pos == "inherit") {
            jqdiv.css("position", "relative");
        }

        if (pos === undefined || pos == "")
            jqdiv.css("position", "relative");

        return jqdiv.css("position") == "relative";
    }

    //Distribute children via Placement
    var leftChildren = [];
    var bottomChildren = [];
    var centerChildren = [];
    var topChildren = [];
    var rightChildren = [];

    var initAxis = function (jqdiv, params) {
        if (jqdiv.attr("data-idd-axis")) {
            var axis = InteractiveDataDisplay.InitializeAxis(jqdiv, params);
            jqdiv.axis = axis;
            jqdiv.dblclick(function () {
                if (placement == "bottom" || placement == "top") that.master.fitToViewX();
                else that.master.fitToViewY();
            });
        }
    }

    var addRelativeDiv = function (jqdiv, params, insertBeforeDiv) {
        var packDiv = $("<div></div>");
        packDiv.appendTo(that.host).addClass("idd-figure-container");
        packDiv.content = jqdiv;
        jqdiv.appendTo(packDiv);

        var placement = jqdiv.attr("data-idd-placement");

        var addDiv = function (packs) {
            if (insertBeforeDiv) {
                var packDef = getPackOfDiv(insertBeforeDiv, packs);
                packs.splice(packDef.index, 0, packDiv);
            } else {
                packs.push(packDiv);
            }
        }

        if (placement == "left") {
            addDiv(leftChildren);
        } else if (placement == "bottom") {
            addDiv(bottomChildren);
        } else if (placement == "center") {
            addDiv(centerChildren);
        } else if (placement == "right") {
            addDiv(rightChildren);
        } else if (placement == "top") {
            addDiv(topChildren);
        }

        if (placement)
            packDiv.attr("data-idd-placement", placement);
    }

    this.getAxes = function (placement) {
        if (!placement) {
            var children = leftChildren.concat(bottomChildren).concat(rightChildren).concat(topChildren);
            var result = jQuery.grep(children, function (e) {
                if (e.content && e.content.axis) return e.content.axis;
            });
            if (result && result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    result[i] = result[i].content.axis;
                }
                return result;
            }
        }
        else {
            var result;
            if (placement == "top") {
                result = jQuery.grep(topChildren, function (e) {
                    if (e.content && e.content.axis && e.content.axis.mode == placement) return e.content.axis;
                });
            }
            else if (placement == "bottom") {
                result = jQuery.grep(bottomChildren, function (e) {
                    if (e.content && e.content.axis && e.content.axis.mode == placement) return e.content.axis;
                });
            }
            else if (placement == "left") {
                result = jQuery.grep(leftChildren, function (e) {
                    if (e.content && e.content.axis && e.content.axis.mode == placement) return e.content.axis;
                });
            }
            else if (placement == "right") {
                result = jQuery.grep(rightChildren, function (e) {
                    if (e.content && e.content.axis && e.content.axis.mode == placement) return e.content.axis;
                });
            }

            if (result && result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    result[i] = result[i].content.axis;
                }
                return result;
            }
        }
        return undefined;
    }

    this.get = function (p) {
        var plotResult = InteractiveDataDisplay.Figure.prototype.get.call(this, p);

        if (!plotResult) {
            var axes = this.getAxes();
            if (axes) {
                for (var i = 0; i < axes.length; i++) {
                    if (axes[i].host[0].id == p || axes[i].host[0] == p) return axes[i];
                }
            }
            return undefined;
        }
        return plotResult;
    }

    childDivs.forEach(function (cdiv) {
        var jqdiv = $(cdiv);
        //packing element to figure containers in figure packs
        if (checkElementPosition(jqdiv)) {
            addRelativeDiv(jqdiv);
            initAxis(jqdiv);
        }
    });

    var addJQDiv = function (htmlCode, placement, params, suspendUpdate, insertBeforeDiv) {
        var addedDiv = $(htmlCode);

        if (!addedDiv.is("div"))
            throw "Only DIVs can be added to figure!";

        if (placement !== undefined) {
            if (placement != "top" &&
                placement != "bottom" &&
                placement != "center" &&
                placement != "left" &&
                placement != "right")
                throw "Placement is incorrect!";

            addedDiv.attr("data-idd-placement", placement);
        }

        if (checkElementPosition(addedDiv) && addedDiv.attr("data-idd-placement") !== undefined) {
            addRelativeDiv(addedDiv, params, insertBeforeDiv);
        }
        else { // absolute
            if (insertBeforeDiv)
                addedDiv.insertBefore(insertBeforeDiv);
            else
                addedDiv.appendTo(that.host);
        }

        if (suspendUpdate === undefined || !suspendUpdate) {
            that.requestUpdateLayout();
        }

        return addedDiv;
    };

    this.addDiv = function (htmlCode, placement) {
        return addJQDiv(htmlCode, placement)[0];
    };

    var removeEmptyPackDiv = function (collection) {
        var emptyPackDiv = [];
        var resultCollection = [];
        collection.forEach(function (child) {
            if (child.children().toArray().length == 0) {
                emptyPackDiv.push(child);
            } else {
                resultCollection.push(child);
            }
        });
        emptyPackDiv.forEach(function (child) {
            child.remove();
        });

        return resultCollection;
    };

    var checkIfBelongsToChildren = function (div, divArray) {
        var a = jQuery.grep(divArray, function (e) {
            return e == div;
        });
        return a && a.length > 0;
    };

    var getPackOfDiv = function (div, packs) {
        for (var i = 0; i < packs.length; i++) {
            if (packs[i].content[0] == div) return { pack: div, index: i };
        }
        throw "Pack not found";
    }

    var checkIfBelongsToPack = function (div, divArray) {
        var a = jQuery.grep(divArray, function (e) {
            return e.content[0] == div;
        });
        return a && a.length > 0;
    };

    this.removeDiv = function (divToRemove) {
        if (divToRemove === undefined)
            throw "Unable to remove undefined object!";

        var directChildren = this.host.children().toArray();
        if (!checkIfBelongsToChildren(divToRemove, directChildren) &&
            !checkIfBelongsToPack(divToRemove, leftChildren) &&
            !checkIfBelongsToPack(divToRemove, bottomChildren) &&
            !checkIfBelongsToPack(divToRemove, centerChildren) &&
            !checkIfBelongsToPack(divToRemove, rightChildren) &&
            !checkIfBelongsToPack(divToRemove, topChildren))
            throw "Specified div doesn't belong to figure!";

        var jqdiv = $(divToRemove);
        jqdiv.remove();

        if (jqdiv.attr("data-idd-placement")) {
            if (jqdiv.attr("data-idd-placement") == "left") {
                leftChildren = removeEmptyPackDiv(leftChildren);
            } else if (jqdiv.attr("data-idd-placement") == "bottom") {
                bottomChildren = removeEmptyPackDiv(bottomChildren);
            } else if (jqdiv.attr("data-idd-placement") == "center") {
                centerChildren = removeEmptyPackDiv(centerChildren);
            } else if (jqdiv.attr("data-idd-placement") == "right") {
                rightChildren = removeEmptyPackDiv(rightChildren);
            } else if (jqdiv.attr("data-idd-placement") == "top") {
                topChildren = removeEmptyPackDiv(topChildren);
            }
        }

        that.requestUpdateLayout();
    };

    this.addAxis = function (placement, axisType, params, insertBeforeDiv) {
        var actualAxisType = axisType === undefined ? 'numeric' : axisType;
        var jqDiv = addJQDiv('<div data-idd-axis="' + actualAxisType + '"></div>', placement, params, false, insertBeforeDiv);
        initAxis(jqDiv, params);
        return jqDiv;
    }

    // Builds a tooltip <div> for a point
    this.getTooltip = function (xd, yd, xp, yp) {
        // the Figure is responsible for producing the tooltips for the axes (e.g. label axis)
        // tooltip must show relevant informative information from the axes
        // thus, traversing axes, gathering labels that corespond to mouse position
        var axes = that.getAxes();        
        var axisTooltipFound = false
        var labels = new Array()
        if (axes) {
            for (var i = 0; i < axes.length; i++) {
                // we build tooltip only for axes that are able to return tooltip
                var axis = axes[i]
                if(axis.getToolTip) {
                    axisTooltipFound = true
                    var coord;
                    if (axes[i].mode=="left" || axes[i].mode=="right")
                        coord = yd
                    else
                        coord = xd
                    var tooltipValue = axes[i].getToolTip(coord)
                    if(tooltipValue)
                        labels.push(tooltipValue)                        
                }
            }
        }
        if(axisTooltipFound) {
            var $content = $("<div></div>").addClass('idd-tooltip-compositevalue');            
            $content.append($("<div>"+labels.join(', ')+"</div>"));
            return $content
        }
        else
            return undefined
    }

    var finalSize;
    this.measure = function (screenSize) {

        var plotScreenSizeChanged = that.screenSize.width !== screenSize.width || that.screenSize.height !== screenSize.height;
        var plotRect = this.fit(screenSize);
        //console.log("first step: " + plotRect.y + "," + plotRect.height);


        finalSize = { x: 0, y: 0, width: screenSize.width, height: screenSize.height };

        var measureHorizontalPack = function (childrenCollection, width, range, topOffsetFunc, leftOffset, isTop) {
            var height = 0;
            var len = childrenCollection.length
            for (var i = len - 1; i >= 0; i--) {
                var child = childrenCollection[i];
                var content = child.content;
                child.width(width);
                if (isTop) {
                    child.css("top", topOffsetFunc(height));
                }
                child.css("left", leftOffset);
                if (content.axis !== undefined) {
                    content.width(width);
                    var axis = content.axis;
                    axis.update(range);

                    var contentHeight = content.height();
                    if (child.height() !== contentHeight) {
                        child.height(contentHeight);
                    }

                    height += child.height();
                }
                else {
                    height += child.height();
                }
                if (!isTop) {
                    child.css("top", topOffsetFunc(height));
                }
            }
            return height;
        };

        var measureVerticalPack = function (childrenCollection, height, range, leftOffsetFunc, topOffset, isLeft) {
            var width = 0;
            var len = childrenCollection.length
            for (var i = len - 1; i >= 0; i--) {
                var child = childrenCollection[i];
                var content = child.content;
                child.height(height);
                content.height(height);
                if (isLeft) {
                    child.css("left", leftOffsetFunc(width));
                }
                child.css("top", topOffset);
                if (content.axis !== undefined) {
                    content.height(height);
                    var axis = content.axis;
                    axis.update(range);

                    var contentWidth = content.width();
                    if (child.width() !== contentWidth) {
                        child.width(contentWidth);
                    }

                    width += child.width();
                }
                else {
                    width += child.width();
                }
                if (!isLeft) {
                    child.css("left", leftOffsetFunc(width));
                }
            }
            return width;
        };

        //First Iteration: Measuring top and bottom slots, 
        //then measuring left and right with top and bottom output values

        //Measuring top and bottom slots
        var topBottomHeight = 0;
        var topHeight = 0;
        var bottomHeight = 0;

        //Measure top slot
        topHeight = measureHorizontalPack(topChildren, screenSize.width, { min: plotRect.x, max: plotRect.x + plotRect.width }, function (height) { return height; }, 0, true);

        //Measure bottom slot
        bottomHeight = measureHorizontalPack(bottomChildren, screenSize.width, { min: plotRect.x, max: plotRect.x + plotRect.width }, function (height) { return screenSize.height - height; }, 0, false);

        topBottomHeight = topHeight + bottomHeight;

        //Measuring left and right slots
        var leftRightWidth = 0;
        var leftWidth = 0;
        var rightWidth = 0;

        //Measure left slot
        leftWidth = measureVerticalPack(leftChildren, screenSize.height - topBottomHeight, { min: plotRect.y, max: plotRect.y + plotRect.height }, function (width) { return width; }, topHeight, true);

        //Measure right slot
        rightWidth = measureVerticalPack(rightChildren, screenSize.height - topBottomHeight, { min: plotRect.y, max: plotRect.y + plotRect.height }, function (width) { return screenSize.width - width; }, topHeight, false);

        leftRightWidth = leftWidth + rightWidth;

        var availibleCenterSize = { width: screenSize.width - leftRightWidth, height: screenSize.height - topBottomHeight };

        if (availibleCenterSize.width < 0)
            availibleCenterSize.width = 0;
        if (availibleCenterSize.height < 0)
            availibleCenterSize.height = 0;

        if (that.mapControl !== undefined) {
            that.mapControl.setOptions({ width: availibleCenterSize.width, height: availibleCenterSize.height });
        }

        plotRect = this.fit(availibleCenterSize, true);

        centerChildren.forEach(function (child) {
            child.width(availibleCenterSize.width);
            child.height(availibleCenterSize.height);
            child.css("top", topHeight);
            child.css("left", leftWidth);
        });

        var childPlots = this.children;
        childPlots.forEach(function (child) {
            var childHost = child.host;
            childHost.width(availibleCenterSize.width);
            childHost.height(availibleCenterSize.height);
            childHost.css("top", topHeight);
            childHost.css("left", leftWidth);
        });

        //Second step: remeasure top and bottom slots
        //Measure top and bottom slots
        var topHeight2 = 0;
        var bottomHeight2 = 0;
        var topBottomHeight2 = 0;

        topHeight2 = measureHorizontalPack(topChildren, availibleCenterSize.width, { min: plotRect.x, max: plotRect.x + plotRect.width }, function (height) { return height; }, leftWidth, true);
        bottomHeight2 = measureHorizontalPack(bottomChildren, availibleCenterSize.width, { min: plotRect.x, max: plotRect.x + plotRect.width }, function (height) { return screenSize.height - height; }, leftWidth, false);

        if (topHeight2 != topHeight) {
            var scale = topHeight / topHeight2;
            var offset = 0;
            for (var i = 0; i < topChildren.length; i++) {
                child = topChildren[i];
                var transformString = "scaleY(" + scale + ") translate(0px," + offset + "px)";
                var transformOriginString = "0% 0%";
                child.css("-webkit-transform", transformString);
                child.css("-webkit-transform-origin", transformOriginString);
                child.css("-moz-transform", transformString);
                child.css("-moz-transform-origin", transformOriginString);
                child.css("-o-transform", transformString);
                child.css("-o-transform-origin", transformOriginString);
                child.css("-ms-transform", transformString);
                child.css("-ms-transform-origin", transformOriginString);
                child.css("transform", transformString);
                child.css("transform-origin", transformOriginString);
                offset += child.height() * (scale - 1);
            };
        }
        else {
            topChildren.forEach(function (child) {
                child.css("-ms-transform", '');
                child.css("-webkit-transform", '');
                child.css("-moz-transform", '');
                child.css("-o-transform", '');
                child.css("transform", '');
            });
        }

        if (bottomHeight != bottomHeight2) {
            var scale = bottomHeight / bottomHeight2;
            var offset = 0;
            for (var i = 0; i < bottomChildren.length; i++) {
                child = bottomChildren[i];
                var transformString = "scaleY(" + scale + ") translate(0px," + -offset + "px)";
                var transformOriginString = "0% 0%";
                child.css("-webkit-transform", transformString);
                child.css("-webkit-transform-origin", transformOriginString);
                child.css("-moz-transform", transformString);
                child.css("-moz-transform-origin", transformOriginString);
                child.css("-o-transform", transformString);
                child.css("-o-transform-origin", transformOriginString);
                child.css("-ms-transform", transformString);
                child.css("-ms-transform-origin", transformOriginString);
                child.css("transform", transformString);
                child.css("transform-origin", transformOriginString);
                offset += child.height() * (scale - 1);
            };
        }
        else {
            bottomChildren.forEach(function (child) {
                child.css("-ms-transform", '');
                child.css("-webkit-transform", '');
                child.css("-moz-transform", '');
                child.css("-o-transform", '');
                child.css("transform", '');
            });
        }

        //Measure left and right slots
        //Measuring left and right slots
        var leftRightWidth2 = 0;
        var leftWidth2 = 0;
        var rightWidth2 = 0;

        //Measure left slot
        leftWidth2 = measureVerticalPack(leftChildren, screenSize.height - topBottomHeight, { min: plotRect.y, max: plotRect.y + plotRect.height }, function (width) { return width; }, topHeight, true);

        //Measure right slot
        rightWidth2 = measureVerticalPack(rightChildren, screenSize.height - topBottomHeight, { min: plotRect.y, max: plotRect.y + plotRect.height }, function (width) { return screenSize.width - width; }, topHeight, false);

        leftRightWidth2 = leftWidth2 + rightWidth2;

        if (leftWidth != leftWidth2) {
            var scale = leftWidth / leftWidth2;
            var offset = 0;
            for (var i = 0; i < leftChildren.length; i++) {
                var child = leftChildren[i];
                var transformString = "scaleX(" + scale + ") translate(" + offset + "px, 0px)";
                var transformOriginString = "0% 0%";
                child.css("-webkit-transform", transformString);
                child.css("-webkit-transform-origin", transformOriginString);
                child.css("-moz-transform", transformString);
                child.css("-moz-transform-origin", transformOriginString);
                child.css("-o-transform", transformString);
                child.css("-o-transform-origin", transformOriginString);
                child.css("-ms-transform", transformString);
                child.css("-ms-transform-origin", transformOriginString);
                child.css("transform", transformString);
                child.css("transform-origin", transformOriginString);
                offset += child.width() * (scale - 1);
            }
        }
        else {
            leftChildren.forEach(function (child) {
                child.css("-ms-transform", '');
                child.css("-webkit-transform", '');
                child.css("-moz-transform", '');
                child.css("-o-transform", '');
                child.css("transform", '');
            });
        }

        if (rightWidth != rightWidth2) {
            var scale = rightWidth / rightWidth2;
            var offset = 0;
            for (var i = 0; i < rightChildren.length; i++) {
                var child = rightChildren[i];
                var transformString = "scaleX(" + scale + ") translate(" + -offset + "px, 0px)";
                var transformOriginString = "100% 0%";
                child.css("-webkit-transform", transformString);
                child.css("-webkit-transform-origin", transformOriginString);
                child.css("-moz-transform", transformString);
                child.css("-moz-transform-origin", transformOriginString);
                child.css("-o-transform", transformString);
                child.css("-o-transform-origin", transformOriginString);
                child.css("-ms-transform", transformString);
                child.css("-ms-transform-origin", transformOriginString);
                child.css("transform", transformString);
                child.css("transform-origin", transformOriginString);
                offset += child.width() * (scale - 1);
            }; 
        }
        else {
            rightChildren.forEach(function (child) {
                child.css("-ms-transform", '');
                child.css("-webkit-transform", '');
                child.css("-moz-transform", '');
                child.css("-o-transform", '');
                child.css("transform", '');
            });
        }

        return availibleCenterSize;
    };

    this.arrange = function (finalRect) {
        InteractiveDataDisplay.Figure.prototype.arrange.call(this, finalRect);
        //InteractiveDataDisplay.Utils.arrangeDiv(this.host, finalSize);
    };
    
    this.exportContentToSvg = function(plotRect, screenSize, svg) {
        var exportTextToSvg = function (div, svg) {
            var style = div instanceof jQuery ? window.getComputedStyle(div[0], null) : window.getComputedStyle(div, null);
            var transform = style ? style.getPropertyValue('transform') : undefined;
            var paddingBottom = style ? style.getPropertyValue('padding-bottom') : undefined;
            var fontSize = style ? parseFloat(style.getPropertyValue('font-size')) : undefined;
            var fontFamily = style ? style.getPropertyValue('font-family') : undefined;
            var fontWeight = style ? style.getPropertyValue('font-weight') : undefined;
            var textAlign = style ? style.getPropertyValue('text-align') : undefined;
            if (textAlign == 'center') textAlign = 'middle';
            if (textAlign == 'left') textAlign = 'start';
            if (textAlign == 'right') textAlign = 'end';
            var width;
            var height;
            if($(div).hasClass('idd-verticalTitle-inner')) { // hack to measure the actual size of the vertical slots
                width = $(div).parent().width()
                height = $(div).parent().height()
            } else {
                width = $(div).width();
                height = $(div).height();
            }

            var content = $(div).text().trim();
            var text = svg.text(content).font({ family: fontFamily, size: fontSize, weight: fontWeight, anchor: textAlign });

            if (textAlign == 'middle') text.translate(width / 2, -height / 2);
            else if (textAlign == "end") text.translate(width, -height / 2);
            else text.translate(0, -height / 2);

            if (transform != "none" && transform != undefined) {
                if (paddingBottom != undefined) paddingBottom = parseFloat(paddingBottom.substring(0, paddingBottom.length - 2));
                else paddingBottom = 0;
                text.attr({ transform: transform });
                text.translate(-paddingBottom, height / 2);
            }
        };

        var left_g = svg.group();
        var leftLine = 0;
        for(var i = leftChildren.length; --i>=0; ){
            var child = leftChildren[i];
            var child_g = left_g.group();
            child_g.translate(leftLine, 0);
            leftLine += child.width();
            if (child.content) {
                if (child.content.axis) {
                    child.content.axis.renderToSvg(child_g);
                }
                else {
                    var vertTitle = $("div.idd-verticalTitle-inner",child.content)
                    var isText = (vertTitle.length === 1) && (vertTitle[0].children.length === 0)
                    if (isText) exportTextToSvg(vertTitle, child_g);
                }
            }
        }
        
        var top_g = svg.group();
        var topLine = 0;
        for(var i = topChildren.length; --i>=0; ){
            var child = topChildren[i];
            var child_g = top_g.group();
            child_g.translate(leftLine, topLine);
            topLine += child.height();
            if (child.content) {
                if (child.content.axis) {
                    child.content.axis.renderToSvg(child_g);
                } else {
                    var isText = true;
                    $(child.content).contents().each(function () {
                        if (this.nodeType != 3) isText = false;
                    });
                    if (isText) exportTextToSvg(child.content, child_g)
                }
            }
        }
        left_g.translate(0, topLine);
        
        var bottom_g = svg.group();
        var bottomLine = topLine + screenSize.height;
        for(var i = 0; i < bottomChildren.length; i++){
            var child = bottomChildren[i];
            var child_g = bottom_g.group();
            child_g.translate(leftLine, bottomLine);
            bottomLine += child.height();
            if (child.content) {
                if (child.content.axis) {
                    child.content.axis.renderToSvg(child_g);
                } else {
                    var isText = true;
                    $(child.content).contents().each(function () {
                        if (this.nodeType != 3) isText = false;
                    });
                    if (isText) exportTextToSvg(child.content, child_g);
                }
            }
        }
        
        var right_g = svg.group();
        var rightLine = leftLine + screenSize.width;
        for(var i = 0; i < rightChildren.length; i++){
            var child = rightChildren[i];
            var child_g = right_g.group();
            child_g.translate(rightLine, topLine);
            rightLine += child.width();
            if (child.content) {
                if (child.content.axis) {
                    child.content.axis.renderToSvg(child_g);
                } else {
                    var vertTitle = $("div.idd-verticalTitle-inner",child.content)
                    var isText = (vertTitle.length === 1) && (vertTitle[0].children.length === 0)
                    if (isText) exportTextToSvg(vertTitle, child_g)
                }
            }
        }
      
        var plots_g = svg.group();
        plots_g
            .viewbox(0, 0, screenSize.width, screenSize.height)
            .translate(leftLine, topLine);

        InteractiveDataDisplay.Figure.prototype.exportContentToSvg.call(this, plotRect, screenSize, plots_g);
    };    

    this.requestUpdateLayout();
    
    if(div.attr("data-idd-navigation-enabled") === "true"){
        var gestureSource = InteractiveDataDisplay.Gestures.getGesturesStream(this.centralPart);
        this.navigation.gestureSource = gestureSource;
    }
    
    var legendDiv = $("<div></div>").prependTo(this.centralPart);
    var _legend = new InteractiveDataDisplay.Legend(this, legendDiv, true, undefined, true);
    legendDiv.css("float", "right");
    Object.defineProperty(this, "legend", { get: function () { return _legend; }, configurable: false });

    //Stop event propagation
    InteractiveDataDisplay.Gestures.FullEventList.forEach(function (eventName) {
        legendDiv[0].addEventListener(eventName, function (e) {
            e.stopPropagation();
        }, false);
    });

    var data = {};
    InteractiveDataDisplay.Utils.readStyle(div, data);
    var visible = data.isLegendVisible;
    
    if (visible) {
        if (visible == "true")
            _legend.isVisible = true;
        else if (visible == "false")
            _legend.isVisible = false;
    } else {
        _legend.isVisible = false // by default in the Figure
    }
}

InteractiveDataDisplay.Figure.prototype = new InteractiveDataDisplay.Plot;;InteractiveDataDisplay.Chart = function (div, master) {
    if (!div) return;

    if (master !== undefined)
        throw "Chart cannot be a dependent plot";

    var gridLines = $("<div data-idd-plot='grid' data-idd-placement='center'></div>").prependTo(div);

    var leftAxis = $('<div data-idd-axis="numeric" data-idd-placement="left"></div>').prependTo(div);
    var bottomAxis = $('<div data-idd-axis="numeric" data-idd-placement="bottom"></div>').prependTo(div);

    this.base = InteractiveDataDisplay.Figure;
    this.base(div, master);
    var that = this;

    //var leftAxis = that.addAxis("left", "numeric");
    //var bottomAxis = that.addAxis("bottom", "numeric");

    var grid = this.get(gridLines[0]);
    bottomAxis.axis = grid.xAxis = this.get(bottomAxis[0]);
    leftAxis.axis = grid.yAxis = this.get(leftAxis[0]);    

    var setDefaultGestureSource = function () {
        var gestureSource = InteractiveDataDisplay.Gestures.getGesturesStream(that.centralPart);
        var bottomAxisGestures = InteractiveDataDisplay.Gestures.applyHorizontalBehavior(InteractiveDataDisplay.Gestures.getGesturesStream(bottomAxis));
        var leftAxisGestures = InteractiveDataDisplay.Gestures.applyVerticalBehavior(InteractiveDataDisplay.Gestures.getGesturesStream(leftAxis));

        that.navigation.gestureSource = gestureSource.merge(bottomAxisGestures.merge(leftAxisGestures));
    }

    this.changeXAxis = function(axisType, params) {
        var oldAxis = bottomAxis;
        bottomAxis = that.addAxis("bottom", axisType, params, bottomAxis[0]);
        that.removeDiv(oldAxis[0]);
        oldAxis.axis.destroy();
        grid.xAxis = this.get(bottomAxis[0]);
        bottomAxis.axis.dataTransform = that.xDataTransform;
    }

    this.changeYAxis = function(axisType, params) {
        var oldAxis = leftAxis;
        leftAxis = that.addAxis("left", axisType, params, leftAxis[0]);
        that.removeDiv(oldAxis[0]);
        oldAxis.axis.destroy();
        grid.yAxis = this.get(leftAxis[0]);
        leftAxis.axis.dataTransform = that.yDataTransform;
    }

    this.onDataTranformChangedCore = function (arg) {
        if (arg == "y") {
            var newAxisType = InteractiveDataDisplay.TicksRenderer.getAxisType(that.yDataTransform);
            if (leftAxis.axis.host.attr("data-idd-axis") == newAxisType) {
                if (newAxisType != "log") {
                    leftAxis.axis.dataTransform = that.yDataTransform;
                }
            } else {
                var oldAxis = leftAxis;
                leftAxis = that.addAxis("left", newAxisType, true, leftAxis[0]);
                that.removeDiv(oldAxis[0]);
                oldAxis.axis.destroy();
                grid.yAxis = this.get(leftAxis[0]);
            }

            that.enumAll(that, function (plot) {
                if (plot != that) {
                    plot.yDataTransform = that.yDataTransform;
                }
            });
        }
        else if (arg == "x") { 
            var newAxisType = InteractiveDataDisplay.TicksRenderer.getAxisType(that.xDataTransform);
            if (bottomAxis.axis.host.attr("data-idd-axis") == newAxisType) {
                if (newAxisType != "log") {
                    bottomAxis.axis.dataTransform = that.xDataTransform;
                }
            } else {
                var oldAxis = bottomAxis;
                bottomAxis = that.addAxis("bottom", newAxisType, true, bottomAxis[0]);
                that.removeDiv(oldAxis[0]);
                oldAxis.axis.destroy();
                grid.xAxis = this.get(bottomAxis[0]);
            }

            that.enumAll(that, function (plot) {
                if (plot != that) {
                    plot.xDataTransform = that.xDataTransform;
                }
            });
        }
    }
    this.fireChildrenChanged = function (propertyName) {
        if (propertyName.type == "add") {
            if (that.xDataTransform) {
                propertyName.plot.xDataTransform = that.xDataTransform;
            }
            if (that.yDataTransform) {
                propertyName.plot.yDataTransform = that.yDataTransform;
            }
        }
        this.host.trigger(InteractiveDataDisplay.Event.childrenChanged, propertyName);
    };

    this.exportToSvg = function (plotRect, screenSize, svg) {
        if (!SVG.supported) throw "SVG is not supported";

        var screenSize = this.screenSize;
        var plotRect = this.coordinateTransform.getPlotRect({ x: 0, y: 0, width: screenSize.width, height: screenSize.height });

        var svgHost = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var svg = SVG(svgHost).size(div.width(), div.height());      
        var chart_g = svg.group();
        this.exportContentToSvg(plotRect, screenSize, chart_g);
        var legend_g = svg.group();
        var shift = div.width() + 20;

        if (that.legend.isVisible) {
            legend_g.add(this.exportLegendToSvg(that.legend.Host[0])).translate(shift, 20);
            svg.size(200 + shift, div.height());
        }
        return svg;
    };

    var data = {};
    InteractiveDataDisplay.Utils.readStyle(div, data);
    var visible = data.isLegendVisible;    
    if (!visible) {
        // the default legend visibility is "true" for the chart
        that.legend.isVisible = true
    }

    setDefaultGestureSource();
};



InteractiveDataDisplay.Chart.prototype = new InteractiveDataDisplay.Figure;;InteractiveDataDisplay.LabelPlot = function (div, master) {
    var that = this;

    this.base = InteractiveDataDisplay.CanvasPlot;
    this.base(div, master);

    var _text = [];
    var _x = [];
    var _y = [];
    var _placement = [];

    var size_p = {
        x: 120,
        y: 25
    };
    var shift = [];
    this.getData = function () {
        var data = [];
        var n = _text.length;
        for (var i = 0; i < n; i++) {
            data.push({
                text: _text[i], position: { x: _x[i], y: _y[i] }, placement: _placement[i] });
        }
        return data;
    }
    this.draw = function (data) {
        if (data) {
            var n = data.length;
            var text = [];
            var x = [];
            var y = [];
            var placement = [];
            for (var i = 0; i < n; i++) {
                text.push(data[i].text);
                x.push(data[i].position.x);
                y.push(data[i].position.y);
                if (data[i].placement) placement.push(data[i].placement)
                else placement.push('center');
                shift.push(0);
            }

            _text = text;
            _x = x;
            _y = y;
            _placement = placement;
        }
        this.invalidateLocalBounds();
        this.requestNextFrameOrUpdate();
        this.fireAppearanceChanged();
    };
    // Returns a rectangle in the plot plane.
    this.computeLocalBounds = function () {
        var dataToPlotX = this.xDataTransform && this.xDataTransform.dataToPlot;
        var dataToPlotY = this.yDataTransform && this.yDataTransform.dataToPlot;

        if (_x.length > 0 && _y.length > 0) {
            var xrange = InteractiveDataDisplay.Utils.getMinMax(_x);
            var yrange = InteractiveDataDisplay.Utils.getMinMax(_y);
            var xmin = xrange.min - 0.2;
            var xmax = xrange.max + 0.2;
            var ymin = yrange.min;
            var ymax = yrange.max;
            if (dataToPlotX) {
                xmin = dataToPlotX(xmin);
                xmax = dataToPlotX(xmax);
            }
            if (dataToPlotY) {
                ymin = dataToPlotY(ymin);
                ymax = dataToPlotY(ymax);
            }
            return { x: xmin, y: ymin, width: xmax - xmin, height: ymax - ymin };
        }
        
        return undefined;
    };
    // Returns 4 margins in the screen coordinate system
    this.getLocalPadding = function () {
        return { left: 0, right: 0, top: 0, bottom: 0 };
    };
    this.renderCore = function (plotRect, screenSize) {
        InteractiveDataDisplay.LabelPlot.prototype.renderCore.call(this, plotRect, screenSize);
        var context = this.getContext(true);

        var n = _text.length;
        if (n == 0) return;

        var t = this.getTransform();
        var dataToScreenX = t.dataToScreenX;
        var dataToScreenY = t.dataToScreenY;
        for (var i = 0; i < n; i++) {
            var p = { // screen coordinates 
                x: dataToScreenX(_x[i]), // left
                y: dataToScreenY(_y[i]) // top
            };
            if (_placement[i] == 'left') {
                p = { // screen coordinates 
                    x: dataToScreenX(_x[i]) - size_p.x, // left
                    y: dataToScreenY(_y[i]) // top
                }
            } else if (_placement[i] == 'right') {
                p = { // screen coordinates 
                    x: dataToScreenX(_x[i]) + size_p.x, // left
                    y: dataToScreenY(_y[i]) // top
                }
            } else if (_placement[i] == 'top') {
                p = { // screen coordinates 
                    x: dataToScreenX(_x[i]), // left
                    y: dataToScreenY(_y[i]) - size_p.y // top
                }
            } else if (_placement[i] == 'bottom') {
                p = { // screen coordinates 
                    x: dataToScreenX(_x[i]), // left
                    y: dataToScreenY(_y[i]) + size_p.y // top
                }
            };
            var style = window.getComputedStyle(document.body, null);
            var fontSize = style ? parseFloat(style.getPropertyValue('font-size')) : undefined;
            var fontFamily = style ? style.getPropertyValue('font-family') : undefined;
            var fontWeight = style ? style.getPropertyValue('font-weight') : undefined;
            var left = p.x - 0.5 * size_p.x;
            var top = p.y;
            context.fillStyle = "black";
            context.font = fontWeight + " " + fontSize + "px " + fontFamily;
            context.textALign = 'center';
            var text = _text[i];
            var textWidth = context.measureText(text).width;
            while (textWidth > size_p.x) {
                text = text.substring(0, text.length - 1);
                textWidth = context.measureText(text).width;
            }
            shift[i] = (size_p.x - textWidth) / 2;
            context.fillText(text, left + shift[i], top);
        }
    };
    this.renderCoreSvg = function (plotRect, screenSize, svg) {
        var n = _text.length;
        if (n > 0) {
            var h_s = screenSize.height;
            var w_s = screenSize.width;

            // transformations
            var plotToScreenX = this.coordinateTransform.plotToScreenX;
            var plotToScreenY = this.coordinateTransform.plotToScreenY;
            var dataToPlotX = this.xDataTransform && this.xDataTransform.dataToPlot;
            var dataToPlotY = this.yDataTransform && this.yDataTransform.dataToPlot;
            var dataToScreenX = dataToPlotX ? function (x) { return plotToScreenX(dataToPlotX(x)) } : plotToScreenX;
            var dataToScreenY = dataToPlotY ? function (y) { return plotToScreenY(dataToPlotY(y)) } : plotToScreenY;

            var labels_g = svg.group();
            for (var i = 0; i < n; i++) {
                var style = window.getComputedStyle(document.body, null);
                var fontSize = style ? parseFloat(style.getPropertyValue('font-size')) : undefined;
                var fontFamily = style ? style.getPropertyValue('font-family') : undefined;
                var fontWeight = style ? style.getPropertyValue('font-weight') : undefined;
                var p = { // screen coordinates 
                    x: dataToScreenX(_x[i]), // left
                    y: dataToScreenY(_y[i]) // top
                };
                if (_placement[i] == 'left') {
                    p = { // screen coordinates 
                        x: dataToScreenX(_x[i]) - size_p.x, // left
                        y: dataToScreenY(_y[i]) // top
                    }
                } else if (_placement[i] == 'right') {
                    p = { // screen coordinates 
                        x: dataToScreenX(_x[i]) + size_p.x, // left
                        y: dataToScreenY(_y[i]) // top
                    }
                } else if (_placement[i] == 'top') {
                    p = { // screen coordinates 
                        x: dataToScreenX(_x[i]), // left
                        y: dataToScreenY(_y[i]) - size_p.y // top
                    }
                } else if (_placement[i] == 'bottom') {
                    p = { // screen coordinates 
                        x: dataToScreenX(_x[i]), // left
                        y: dataToScreenY(_y[i]) + size_p.y // top
                    }
                };

                var left = p.x - 0.5 * size_p.x;
                var top = p.y - 0.9 * size_p.y;

                var elem_g = labels_g.group();
                elem_g.size(size_p.x, size_p.y);
                var text = elem_g.text(_text[i]).font({ family: fontFamily, size: fontSize, weight: fontWeight });
                
               
                elem_g.translate(left + shift[i], top);
                elem_g.clipWith(elem_g.rect(size_p.x, size_p.y));
            }
            labels_g.clipWith(labels_g.rect(w_s, h_s));
        }
    };
}
InteractiveDataDisplay.LabelPlot.prototype = new InteractiveDataDisplay.CanvasPlot;;InteractiveDataDisplay.MaxMarkersPerAnimationFrame = 3000;

InteractiveDataDisplay.Markers = function (div, master) {
    this.base = InteractiveDataDisplay.CanvasPlot;
    this.base(div, master);
    if (!div) return;

    var _originalData = {};
    var _shape = undefined;
    var _data = {};
    var _renderData = {};
    var _markerPushpins = undefined;
    var _pushpinsVisible = false;
    var _formatter = {};
    var that = this;

    var destroyPushpins = function () {
        if (that.mapControl == undefined || _markerPushpins == undefined) return;
        _markerPushpins.forEach(function (pp) {
            var index = that.mapControl.entities.indexOf(pp);
            if (index >= 0)
                that.mapControl.entities.removeAt(index);
        });
        _markerPushpins = undefined;
    };

    var createPushpins = function () {
        if (typeof _data.x == "undefined" || typeof _data.y == "undefined") return;
        var x = _data.x;
        var y = _data.y;
        if (InteractiveDataDisplay.Utils.isArray(x) && InteractiveDataDisplay.Utils.isArray(y)) {
            var n = Math.min(x.length, y.length);
            if (n <= InteractiveDataDisplay.MaxMarkersPerAnimationFrame) {
                _markerPushpins = new Array(n);
                for (var i = 0; i < n; i++) {
                    var newPushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(y[i], x[i]),
                        {
                            visible: false,
                            htmlContent: '<div style="background-color: white; opacity: 0.5; width: 10px; height: 10px"></div>',
                            anchor: new Microsoft.Maps.Point(5, 5)
                        });
                    _markerPushpins[i] = newPushpin;
                    that.mapControl.entities.push(newPushpin);
                }
            }
        }
    }

    var prepareDataRow = function (data) {
        var arrays = {};
        var scalars = {};
        var n = -1;
        for (var prop in data) {
            var vals = data[prop];
            if (InteractiveDataDisplay.Utils.isArray(vals)) {
                if (vals.length < n || n === -1) n = vals.length;
                arrays[prop] = vals;
            } else {
                scalars[prop] = vals;
            }
        }
        return { arrays: arrays, scalars: scalars, length: n === -1 ? 0 : n };
    }

    //return copy of data
    this.getDataCopy = function () {
        return _originalData;
    }

    // Draws the data as markers.
    this.draw = function (data, titles) {
        if (data == undefined || data == null) throw "The argument 'data' is undefined or null";
        _originalData = data;

        // Determines shape object for the data:        
        var shape;
        if (typeof data.shape === "undefined" || data.shape == null)
            shape = InteractiveDataDisplay.Markers.shapes["box"];
        else if (typeof data.shape === "string") {
            shape = InteractiveDataDisplay.Markers.shapes[data.shape];
            if (shape == undefined) throw "The given marker shape is unknown";
        } else if (typeof data.shape === "object" && data.shape != null && typeof data.shape.draw === "function") {
            shape = data.shape;
        }
        else throw "The argument 'data' is incorrect: value of the property 'shape' must be a string, a MarkerShape object, undefined or null";
        _shape = shape;

        // Copying data
        var dataFull = $.extend({}, data);

        // Preparing data specifically for the given marker shape
        if (shape.prepare != undefined)
            shape.prepare(dataFull);

        destroyPushpins();
        _data = dataFull;
        _renderData = {};

        this.invalidateLocalBounds();
        this.requestNextFrameOrUpdate();
        this.setTitles(titles, true);
        this.fireAppearanceChanged();
    };

    // Returns a rectangle in the plot plane.
    this.computeLocalBounds = function (step, computedBounds) {
        var dataToPlotX = this.xDataTransform && this.xDataTransform.dataToPlot;
        var dataToPlotY = this.yDataTransform && this.yDataTransform.dataToPlot;

        if(_shape && (typeof _shape.getBoundingBox !== "undefined" || typeof _shape.getPlotBoundingBox !== "undefined") && _data) {
            if (_data.x.length == 0) return undefined;
            var pattern = prepareDataRow(_data);
            var n = pattern.length;
            var arrays = pattern.arrays;
            var row = pattern.scalars;
            var found = [];
            var total_bb = undefined;
            if (_shape.hasOwnProperty("getBoundingBox")) {
                for (var i = 0; i < n; i++) {
                    for (var prop in arrays) row[prop] = arrays[prop][i];
                    var bb = _shape.getBoundingBox(row);
                    total_bb = InteractiveDataDisplay.Utils.unionRects(total_bb, bb);
                }
                if (dataToPlotX) {
                    var l = dataToPlotX(total_bb.x);
                    var r = dataToPlotX(total_bb.x + total_bb.width);
                    total_bb.x = l;
                    total_bb.width = r - l;
                }
                if (dataToPlotY) {
                    var b = dataToPlotY(total_bb.y);
                    var t = dataToPlotY(total_bb.y + total_bb.height);
                    total_bb.y = b;
                    total_bb.height = t - b;
                }
            }
            else
                if(_shape.hasOwnProperty("getPlotBoundingBox")) {
                    var transfrm = that.getTransform();
                    for (var i = 0; i < n; i++) {
                        for (var prop in arrays)
                            row[prop] = arrays[prop][i];
                        var pbb = _shape.getPlotBoundingBox(row, transfrm);
                        total_bb = InteractiveDataDisplay.Utils.unionRects(total_bb, pbb);
                    }
                }
                else {
                    throw 'Shape does not have neither getBoundingBox nor getPlotBoundingBox';
                }
            return total_bb;
        } else if (typeof _data.x != "undefined" && typeof _data.y != "undefined") {
            return InteractiveDataDisplay.Utils.getBoundingBoxForArrays(_data.x, _data.y, dataToPlotX, dataToPlotY);
        }
        return undefined;
    };

    // Returns 4 margins in the screen coordinate system
    this.getLocalPadding = function () {
        if (_shape && typeof _shape.getPadding !== "undefined")
            return _shape.getPadding(_data);
        var padding = 0;
        return { left: padding, right: padding, top: padding, bottom: padding };
    };

    this.renderCore = function (plotRect, screenSize) {
        InteractiveDataDisplay.Markers.prototype.renderCore.call(this, plotRect, screenSize);
        if (_shape == undefined) return;

        var dt = this.getTransform();
        var drawBasic = !that.master.isInAnimation || that.master.mapControl === undefined;

        if (that.mapControl !== undefined) {
            if (_markerPushpins === undefined) createPushpins();
            if (_markerPushpins !== undefined) {
                if (that.master.isInAnimation && !_pushpinsVisible) {
                    _markerPushpins.forEach(function (pp) { pp.setOptions({ visible: true }); });
                    _pushpinsVisible = true;
                }
                else if (!that.master.isInAnimation && _pushpinsVisible) {
                    _markerPushpins.forEach(function (pp) { pp.setOptions({ visible: false }); });
                    _pushpinsVisible = false;
                }
            }
        }

        if (drawBasic) {
            var context = this.getContext(true);
            _renderData = _data;
            if (typeof _shape.preRender != "undefined")
                _renderData = _shape.preRender(_data, plotRect, screenSize, dt, context);
            var pattern = prepareDataRow(_renderData);
            var n = pattern.length;
            var arrays = pattern.arrays;
            var row = pattern.scalars;
            for (var i = 0; i < n; i++) {
                for (var prop in arrays) row[prop] = arrays[prop][i];
                _shape.draw(row, plotRect, screenSize, dt, context, i);
            }
        }
    };

    this.renderCoreSvg = function (plotRect, screenSize, svg) {
        if (_shape == undefined || _shape.renderSvg == undefined) return;
        var t = this.getTransform();
        _shape.renderSvg(plotRect, screenSize, svg, _data, t);
    };
    this.findToolTipMarkers = function (xd, yd, xp, yp) {
        if (_shape == undefined || typeof _shape.hitTest == "undefined" || _renderData == undefined) return [];
        var that = this;
        var t = this.getTransform();
        var ps = { x: t.dataToScreenX(xd), y: t.dataToScreenY(yd) };
        var pd = { x: xd, y: yd };

        var pattern = prepareDataRow(_renderData);
        var n = pattern.length;
        var arrays = pattern.arrays;
        var row = pattern.scalars;
        var found = [];
        for (var i = 0; i < n; i++) {
            for (var prop in arrays) row[prop] = arrays[prop][i];
            if (_shape.hitTest(row, t, ps, pd) && typeof row.indices == "number") {
                // todo: this is a shape-dependent code; needs factorization or a rule of using `indices` property
                var j = row.indices;
                var dataRow = {};
                if (_shape.getTooltipData) dataRow = _shape.getTooltipData(_originalData, j);
                else {// makes slice of the original data row
                    for (var prop in _originalData) {
                        var vals = _originalData[prop];
                        if (InteractiveDataDisplay.Utils.isArray(vals) && j < vals.length) {
                            _formatter[prop] = new InteractiveDataDisplay.AdaptiveFormatter(vals);
                            dataRow[prop] = _formatter[prop].toString(vals[j]);
                        }// scalars do not go to the tooltip since they are identical for all markers
                    }
                    dataRow["index"] = j;
                }
                found.push(dataRow);
            }
        }
        return found;
    };

    // Builds a tooltip <div> for a point
    this.getTooltip = function (xd, yd, xp, yp) {
        var that = this;
        if (!this.isVisible || this.isErrorVisible) return;

        var resultMarkers = that.findToolTipMarkers(xd, yd, xp, yp);
        var buildTooltip = function (markerInfo) {
            var $content = $("<div></div>").addClass('idd-tooltip-compositevalue');
            for (var prop in markerInfo) {
                if (markerInfo.hasOwnProperty(prop)) {
                    var propTitle = that.getTitle(prop);
                    var markerContent = undefined;
                    if (typeof markerInfo[prop] == 'object') {
                        markerContent = buildTooltip(markerInfo[prop]);
                    }
                    if (markerContent)
                        $content.append($("<div>" + propTitle + ":</div>")).append(markerContent);
                    else {
                        $content.append($("<div>" + propTitle + ": " + markerInfo[prop] + "</div>"));

                    }
                }
            }
            return $content;
        };
        if (resultMarkers.length > 0) {
            var $toolTip = $("<div></div>")
            $("<div></div>").addClass('idd-tooltip-name').text((that.name || "markers")).appendTo($toolTip);
            resultMarkers.forEach(function (markerInfo) {
                buildTooltip(markerInfo).addClass('idd-tooltip-itemvalues').appendTo($toolTip);
            });
            return $toolTip;
        }
    };

    this.getLegend = function () {
        //var div = $("<div class='idd-legend-item'></div>");
        var nameDiv = $("<span></span>");
        var legendDiv = { thumbnail: $("<canvas></canvas>"), content: $("<div></div>") };
        var buildLegend = function () {
            nameDiv.empty();
            //nameDiv = $("<span></span>").appendTo(div);  
            if (_shape && typeof _shape.getLegend != "undefined") {
                legendDiv.content.empty();
                _shape.getLegend(_data, that.getTitle, legendDiv);
            }
            nameDiv.text(that.name);
        }
        this.host.bind("appearanceChanged", buildLegend);
        buildLegend();
        var onLegendRemove = function () {
            that.host.unbind("appearanceChanged", buildLegend);
            nameDiv.empty();
            //div.empty();
            //div.removeClass("idd-legend-item");
        };
        return { name: nameDiv, legend: legendDiv, onLegendRemove: onLegendRemove };
    };

    this.buildSvgLegend = function (legendSettings, svg) {
        var that = this;
        var legendElements = { thumbnail: svg.group(), content: svg.group() };
        legendSettings.height = 30;
        if (_shape && typeof _shape.buildSvgLegendElements != "undefined")
            legendElements = _shape.buildSvgLegendElements(legendSettings, svg, _data, that.getTitle);
        svg.rect(legendSettings.width, legendSettings.height).fill({ color: "white", opacity: 0 });
        svg.add(legendElements.thumbnail.translate(5, 5));
        var style = window.getComputedStyle(legendSettings.legendDiv.children[0].children[1], null);
        var fontSize = parseFloat(style.getPropertyValue('font-size'));
        var fontFamily = style.getPropertyValue('font-family');
        svg.add(svg.text(that.name).font({ family: fontFamily, size: fontSize }).translate(40, 0));
        svg.add(legendElements.content.translate(5, 30));
    }

    // Others
    this.onDataTransformChanged = function (arg) {
        this.invalidateLocalBounds();
        InteractiveDataDisplay.Markers.prototype.onDataTransformChanged.call(this, arg);
    };

    // Initialization 
    var initializer = InteractiveDataDisplay.Utils.getDataSourceFunction(div, InteractiveDataDisplay.readCsv);
    var initialData = initializer(div);
    if (initialData && typeof initialData.y != 'undefined'){
		if(initialData.shape == 'bars'){
        	barWidthFloat = parseFloat(initialData.barWidth);
        	if(!isNaN(barWidthFloat)){
        	    initialData.barWidth = barWidthFloat;
        	}
        	else{
        	    if(typeof initialData.barWidth == 'undefined')
        	        console.error("barWidth parameter of BarChart plot should be set")
        	    else
        	        console.error("barWidth parameter of BarChart plot should be a number")
       	    	initialData.barWidth = undefined;
        	}
		}
        this.draw(initialData);
    }
};

InteractiveDataDisplay.Markers.prototype = new InteractiveDataDisplay.CanvasPlot;

InteractiveDataDisplay.Markers.defaults = {
    color: "#4169ed",
    colorPalette: InteractiveDataDisplay.palettes.grayscale,
    border: "#000000",
    size: 10
}

InteractiveDataDisplay.Markers.shapes = InteractiveDataDisplay.Markers.shapes || {};
;(function() {
    var primitiveShape =
    {
        // Checks validity of the data and modifies it by replacing missing values with defaults
        // and applying palettes, if required. Filters out missing values, original indices are in `indices`.
        // Output data:
        // `shape`: shape is transformed to an integer value to enable fast switch. 
        // `y`: must be an array and its length must be length of other data series.
        // `x`: 
        //      input: either array of proper length or undefined; if undefined, [0,1,...] is taken;
        //      output: an array of numbers
        // 'border' 
        //      input: a color string, null, undefined or "none"
        //      output: becomes a string color or null, if no border
        // `color`: becomes either a string color or an array of string colors
        //   - if undefined, a default color is used
        //   - if an array of numbers, the color palette is applied, so 'color' is an array of colors.
        // `individualColors`: If data.color is a scalar string, the `data.individualColors` is true, otherwise false.
        // `colorPalette`: if undefined, uses default palette.
        // `size`: always becomes an array of numbers, those are sizes in pixels.
        // `sizeMax`: a number which is a maximum of marker size in pixels.
        // `inidices`: array of original marker index (may be required if there're missing values filtered out).
        prepare : function(data) { 
            // shape
            var invShape = data.shape ? data.shape.toLowerCase() : "box";
            if (invShape == "box") data.shape = 1;
            else if (invShape == "circle") data.shape = 2;
            else if (invShape == "diamond") data.shape = 3;
            else if (invShape == "cross") data.shape = 4;
            else if (invShape == "triangle") data.shape = 5;
            else throw "Unexpected value of property 'shape'";
            
            // y
            if(data.y == undefined || data.y == null) throw "The mandatory property 'y' is undefined or null";
            if(!InteractiveDataDisplay.Utils.isArray(data.y)) throw "The property 'y' must be an array of numbers";                
            var n = data.y.length;
            
            var mask = new Int8Array(n);
            InteractiveDataDisplay.Utils.maskNaN(mask, data.y);               
            
            // x
            if(data.x == undefined)
                data.x = InteractiveDataDisplay.Utils.range(0, n - 1);
            else if (!InteractiveDataDisplay.Utils.isArray(data.x)) throw "The property 'x' must be an array of numbers";  
            else if (data.x.length != n) throw "Length of the array which is a value of the property 'x' differs from lenght of 'y'"
            else InteractiveDataDisplay.Utils.maskNaN(mask, data.x);        
        
            // border
            if(data.border == undefined || data.border == "none")
                data.border = null; // no border
            
            // colors        
            if(data.color == undefined) data.color = InteractiveDataDisplay.Markers.defaults.color;
            if(InteractiveDataDisplay.Utils.isArray(data.color)) {
                if(data.color.length != n) throw "Length of the array 'color' is different than length of the array 'y'"            
                if(n > 0 && typeof(data.color[0]) !== "string"){ // color is a data series (otherwise, it is an array of string colors)                 
                    var palette = data.colorPalette;
                    if (palette == undefined) palette = InteractiveDataDisplay.Markers.defaults.colorPalette;
                    if (typeof palette == 'string') palette = new InteractiveDataDisplay.ColorPalette.parse(palette);
                    if (palette != undefined && palette.isNormalized) {
                        var r = InteractiveDataDisplay.Utils.getMinMax(data.color);
                        r = InteractiveDataDisplay.Utils.makeNonEqual(r);
                        palette = palette.absolute(r.min, r.max);
                    }
                    data.colorPalette = palette;
                    var colors = new Array(n);
                    for (var i = 0; i < n; i++){
                        var color = data.color[i];
                        if(color != color) // NaN
                            mask[i] = 1;
                        else {
                            var rgba = palette.getRgba(color);                        
                            colors[i] = "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
                        }
                    }
                    data.color = colors;
                }
                data.individualColors = true;            
            }else{
                data.individualColors = false;
            }
            //sizes
            var sizes = new Array(n);
            if (data.size == undefined) data.size = InteractiveDataDisplay.Markers.defaults.size;
            if (InteractiveDataDisplay.Utils.isArray(data.size)) {
                if (data.size.length != n) throw "Length of the array 'size' is different than length of the array 'y'"
                if (data.sizePalette != undefined) { // 'size' is a data series 
                    var palette = InteractiveDataDisplay.SizePalette.Create(data.sizePalette);
                    if (palette.isNormalized) {
                        var r = InteractiveDataDisplay.Utils.getMinMax(data.size);
                        r = InteractiveDataDisplay.Utils.makeNonEqual(r);
                        palette = new InteractiveDataDisplay.SizePalette(false, palette.sizeRange, r);
                    }
                    data.sizePalette = palette;
                    for (var i = 0; i < n; i++) {
                        var size = data.size[i];
                        if (size != size) // NaN
                            mask[i] = 1;
                        else
                            sizes[i] = palette.getSize(size)
                    }
                } else { // 'size' contains values in pixels
                    sizes = data.size;
                    data.sizeMax = InteractiveDataDisplay.Utils.getMax(data.size);
                }
            } else { // sizes is a constant
                for (var i = 0; i < n; i++) sizes[i] = data.size;
                data.sizeMax = data.size;
            }
            data.size = sizes;
            
            // Filtering out missing values
            var m = 0;
            for(var i = 0; i < n; i++) if(mask[i] === 1) m++;            
            if(m > 0){ // there are missing values
                m = n - m; 
                data.x = InteractiveDataDisplay.Utils.applyMask(mask, data.x, m);
                data.y = InteractiveDataDisplay.Utils.applyMask(mask, data.y, m);
                data.size = InteractiveDataDisplay.Utils.applyMask(mask, data.size, m);
                if(data.individualColors)
                    data.color = InteractiveDataDisplay.Utils.applyMask(mask, data.color, m);
                var indices = Array(m);
                for(var i = 0, j = 0; i < n; i++) if(mask[i] === 0) indices[j++] = i;
                data.indices = indices;
            }else{
                data.indices = InteractiveDataDisplay.Utils.range(0, n-1);
            }
        },
        
        preRender : function (data, plotRect, screenSize, dt, context){
            if(!data.individualColors)
                context.fillStyle = data.color;
            if(data.border != null)
                context.strokeStyle = data.border;
            return data;
        },
        
        draw : function (d, plotRect, screenSize, t, context, index){ 
            if(d.individualColors) context.fillStyle = d.color;
            var drawBorder = d.border != null;
            var x1 = t.dataToScreenX(d.x);
            var y1 = t.dataToScreenY(d.y);
            var w_s = screenSize.width;
            var h_s = screenSize.height;
            var localSize = d.size;
            var halfSize = localSize / 2;
            if ((x1 - halfSize) > w_s || (x1 + halfSize) < 0 || (y1 - halfSize) > h_s || (y1 + halfSize) < 0) return;
            switch (d.shape) {
                case 1: // box
                    context.fillRect(x1 - halfSize, y1 - halfSize, localSize, localSize);
                    if (drawBorder)
                        context.strokeRect(x1 - halfSize, y1 - halfSize, localSize, localSize);
                    break;
                case 2: // circle
                    context.beginPath();
                    context.arc(x1, y1, halfSize, 0, 2 * Math.PI);
                    context.fill();
                    if (drawBorder)
                        context.stroke();
                    break;
                case 3: // diamond
                    context.beginPath();
                    context.moveTo(x1 - halfSize, y1);
                    context.lineTo(x1, y1 - halfSize);
                    context.lineTo(x1 + halfSize, y1);
                    context.lineTo(x1, y1 + halfSize);
                    context.closePath();
                    context.fill();
                    if (drawBorder)
                        context.stroke();
                    break;
                case 4: // cross
                    var thirdSize = localSize / 3;
                    var halfThirdSize = thirdSize / 2;
                    if (drawBorder) {
                        context.beginPath();
                        context.moveTo(x1 - halfSize, y1 - halfThirdSize);
                        context.lineTo(x1 - halfThirdSize, y1 - halfThirdSize);
                        context.lineTo(x1 - halfThirdSize, y1 - halfSize);
                        context.lineTo(x1 + halfThirdSize, y1 - halfSize);
                        context.lineTo(x1 + halfThirdSize, y1 - halfThirdSize);
                        context.lineTo(x1 + halfSize, y1 - halfThirdSize);
                        context.lineTo(x1 + halfSize, y1 + halfThirdSize);
                        context.lineTo(x1 + halfThirdSize, y1 + halfThirdSize);
                        context.lineTo(x1 + halfThirdSize, y1 + halfSize);
                        context.lineTo(x1 - halfThirdSize, y1 + halfSize);
                        context.lineTo(x1 - halfThirdSize, y1 + halfThirdSize);
                        context.lineTo(x1 - halfSize, y1 + halfThirdSize);
                        context.closePath();
                        context.fill();
                        context.stroke();
                    } else {
                        context.fillRect(x1 - halfThirdSize, y1 - halfSize, thirdSize, localSize);
                        context.fillRect(x1 - halfSize, y1 - halfThirdSize, localSize, thirdSize);
                    }
                    break;
                case 5: // triangle
                    context.beginPath();
                    context.moveTo(x1 - halfSize, y1 + halfSize);
                    context.lineTo(x1, y1 - halfSize);
                    context.lineTo(x1 + halfSize, y1 + halfSize);
                    context.closePath();
                    context.fill();
                    if (drawBorder)
                        context.stroke();
                    break;
            }
        },
        
        getPadding : function(data) {
            var p = data.sizeMax / 2;
            return { left: p, right: p, top: p, bottom: p };
        },
        
        hitTest : function(d, t, ps, pd){
            var isInside = function (p, points) {
                var classify = function (p, p0, p1) {
                    var a = { x: p1.x - p0.x, y: p1.y - p0.y };
                    var b = { x: p.x - p0.x, y: p.y - p0.y };
                    var s = a.x * b.y - a.y * b.x;
                    if (s > 0) return 1; // left
                    if (s < 0) return 2; // right
                    return 0;
                }
                var n = points.length;
                for (var i = 0; i < n; i++) {
                    if (classify(p, points[i], points[(i + 1) % n]) != 1) return false;
                }
                return true;
            };
            
            var x1 = t.dataToScreenX(d.x);
            var y1 = t.dataToScreenY(d.y);
            var xs = ps.x;
            var ys = ps.y;
            var localSize = d.size;
            var halfSize = localSize / 2; // Checks bounding box hit:
            if (ps.x >= x1 - halfSize && ps.x <= x1 + halfSize && ps.y >= y1 - halfSize && ps.y <= y1 + halfSize) {
                switch (d.shape) {
                    case 1: // box
                        return true;
                    case 2: // circle
                        return ((x1 - xs) * (x1 - xs) + (y1 - ys) * (y1 - ys) <= halfSize * halfSize);
                    case 3: // diamond
                        return (isInside({ x: xs, y: ys }, [{ x: x1 - halfSize, y: y1 }, { x: x1, y: y1 - halfSize },
                                                        { x: x1 + halfSize, y: y1 }, { x: x1, y: y1 + halfSize }, ]));
                    case 4: // cross
                        var thirdSize = localSize / 3;
                        var halfThirdSize = thirdSize / 2;
                        return (isInside({ x: xs, y: ys }, [{ x: x1 - halfThirdSize, y: y1 + halfSize }, { x: x1 - halfThirdSize, y: y1 - halfSize },
                                                        { x: x1 + halfThirdSize, y: y1 - halfSize }, { x: x1 + halfThirdSize, y: y1 + halfSize }]) ||
                            isInside({ x: xs, y: ys }, [{ x: x1 - halfSize, y: y1 + halfThirdSize }, { x: x1 - halfSize, y: y1 - halfThirdSize },
                                                        { x: x1 + halfSize, y: y1 - halfThirdSize }, { x: x1 + halfSize, y: y1 + halfThirdSize }]));
                    case 5: // triangle
                        return (isInside({ x: xs, y: ys }, [{ x: x1 - halfSize, y: y1 + halfSize }, { x: x1, y: y1 - halfSize },
                                                        { x: x1 + halfSize, y: y1 + halfSize }]));
                }
            }
        },
        
        getLegend: function(data, getTitle, legendDiv) { // todo: should be refactored            
            var itemDiv = legendDiv.content;
            var fontSize = 14;
            if (document.defaultView && document.defaultView.getComputedStyle) {
                fontSize = parseFloat(document.defaultView.getComputedStyle(itemDiv[0], null).getPropertyValue("font-size"));
            }
            if (isNaN(fontSize) || fontSize == 0) fontSize = 14;

            //var thumbDiv = $("<div></div>");
            var canvas = legendDiv.thumbnail;
            var canvasIsVisible = true;
            var maxSize = fontSize * 1.5;
            var x1 = maxSize / 2 + 1;
            var y1 = x1;
            canvas[0].width = canvas[0].height = maxSize + 2;
            var canvasStyle = canvas[0].style;
            var context = canvas.get(0).getContext("2d");
            context.clearRect(0, 0, canvas[0].width, canvas[0].height);
            var item, itemDivStyle;
            var itemIsVisible = 0;

            var colorIsArray, color, border, drawBorder;
            var colorDiv, colorDivStyle, colorControl;
            var colorIsVisible = 0;

            var sizeIsArray, size, halfSize;
            var sizeDiv, sizeDivStyle, sizeControl;
            var sizeIsVisible = 0;

            var sizeTitle;
            var refreshSize = function () {
                size = maxSize;
                if (data.sizePalette) {
                    var szTitleText = getTitle("size");
                    if (sizeIsVisible == 0) {
                        sizeDiv = $("<div style='width: 170px; margin-top: 5px; margin-bottom: 5px'></div>").appendTo(itemDiv);
                        sizeTitle = $("<div class='idd-legend-item-property'></div>").text(szTitleText).appendTo(sizeDiv);
                        sizeDivStyle = sizeDiv[0].style;
                        var paletteDiv = $("<div style='width: 170px; color: rgb(0,0,0)'></div>").appendTo(sizeDiv);
                        sizeControl = new InteractiveDataDisplay.SizePaletteViewer(paletteDiv);
                        sizeIsVisible = 2;
                    } else {
                        sizeTitle.text(szTitleText);
                    }
                    sizeControl.palette = InteractiveDataDisplay.SizePalette.Create(data.sizePalette);
                }
                halfSize = size / 2;
            };

            var colorTitle;
            var refreshColor = function () {
                drawBorder = false;
                if (data.individualColors && data.colorPalette) {
                    var clrTitleText = getTitle("color");
                    if (colorIsVisible == 0) {                    
                        colorDiv = $("<div style='width: 170px; margin-top: 5px; margin-bottom: 5px'></div>").appendTo(itemDiv);
                        colorTitle = $("<div class='idd-legend-item-property'></div>").text(clrTitleText).appendTo(colorDiv);
                        colorDivStyle = colorDiv[0].style;
                        var paletteDiv = $("<div style='width: 170px; color: rgb(0,0,0); '></div>").appendTo(colorDiv);
                        colorControl = new InteractiveDataDisplay.ColorPaletteViewer(paletteDiv);
                        colorIsVisible = 2;
                    } else {
                        colorTitle.text(clrTitleText);
                    }
                    colorControl.palette = data.colorPalette;
                    if (colorIsVisible == 1) {
                        colorDivStyle.display = "block";
                        colorIsVisible = 2;
                    }
                }
                else {
                    if (colorIsVisible == 2) {
                        colorDivStyle.display = "none";
                        colorIsVisible = 1;
                    }
                }
                if (data.individualColors) {
                    border = "#000000";
                    color = "#ffffff";
                    drawBorder = true;
                }
                else {
                    color = data.color;
                    border = color;
                    if (data.border != null) {
                        drawBorder = true;
                        border = data.border;
                    }
                }
            };

            var renderShape = function () {                
                if (itemIsVisible == 2) {
                    itemDivStyle.display = "none";
                    itemIsVisible = 1;
                }
                context.clearRect(0, 0, maxSize + 2, maxSize + 2);
                context.strokeStyle = border;
                context.fillStyle = color;

                switch (data.shape) {
                    case 1: // box
                        context.fillRect(x1 - halfSize, y1 - halfSize, size, size);
                        if (drawBorder)
                            context.strokeRect(x1 - halfSize, y1 - halfSize, size, size);
                        break;
                    case 2: // circle
                        context.beginPath();
                        context.arc(x1, y1, halfSize, 0, 2 * Math.PI);
                        context.fill();
                        if (drawBorder)
                            context.stroke();
                        break;
                    case 3: // diamond
                        context.beginPath();
                        context.moveTo(x1 - halfSize, y1);
                        context.lineTo(x1, y1 - halfSize);
                        context.lineTo(x1 + halfSize, y1);
                        context.lineTo(x1, y1 + halfSize);
                        context.closePath();
                        context.fill();
                        if (drawBorder)
                            context.stroke();
                        break;
                    case 4: // cross
                        var thirdSize = size / 3;
                        var halfThirdSize = thirdSize / 2;
                        if (drawBorder) {
                            context.beginPath();
                            context.moveTo(x1 - halfSize, y1 - halfThirdSize);
                            context.lineTo(x1 - halfThirdSize, y1 - halfThirdSize);
                            context.lineTo(x1 - halfThirdSize, y1 - halfSize);
                            context.lineTo(x1 + halfThirdSize, y1 - halfSize);
                            context.lineTo(x1 + halfThirdSize, y1 - halfThirdSize);
                            context.lineTo(x1 + halfSize, y1 - halfThirdSize);
                            context.lineTo(x1 + halfSize, y1 + halfThirdSize);
                            context.lineTo(x1 + halfThirdSize, y1 + halfThirdSize);
                            context.lineTo(x1 + halfThirdSize, y1 + halfSize);
                            context.lineTo(x1 - halfThirdSize, y1 + halfSize);
                            context.lineTo(x1 - halfThirdSize, y1 + halfThirdSize);
                            context.lineTo(x1 - halfSize, y1 + halfThirdSize);
                            context.closePath();
                            context.fill();
                            context.stroke();
                        } else {
                            context.fillRect(x1 - halfThirdSize, y1 - halfSize, thirdSize, size);
                            context.fillRect(x1 - halfSize, y1 - halfThirdSize, size, thirdSize);
                        }
                        break;
                    case 5: // triangle
                        context.beginPath();
                        context.moveTo(x1 - halfSize, y1 + halfSize);
                        context.lineTo(x1, y1 - halfSize);
                        context.lineTo(x1 + halfSize, y1 + halfSize);
                        context.closePath();
                        context.fill();
                        if (drawBorder)
                            context.stroke();
                        break;
                }
                if (!canvasIsVisible) {
                    canvasStyle.display = "inline-block";
                    canvasIsVisible = true;
                }
            };

            refreshColor();
            refreshSize();
            renderShape();
        },

        renderSvg: function (plotRect, screenSize, svg, data, t) {
            var n = data.y.length;
            if (n == 0) return;

            var marker_g = svg.group();
            var dataToScreenX = t.dataToScreenX;
            var dataToScreenY = t.dataToScreenY;

            // size of the canvas
            var w_s = screenSize.width;
            var h_s = screenSize.height;
            var xmin = 0, xmax = w_s;
            var ymin = 0, ymax = h_s;

            var x1, y1;
            var i = 0;
            var nextValuePoint = function () {
                var border = data.border == null? 'none': data.border;
                for (; i < n; i++) {
                    x1 = dataToScreenX(data.x[i]);
                    y1 = dataToScreenY(data.y[i]);
                    var size = data.size[i];
                    var halfSize = size / 2;
                    c1 = ((x1 - halfSize) > w_s || (x1 + halfSize) < 0 || (y1 - halfSize) > h_s || (y1 + halfSize) < 0);
                    var color = data.individualColors ? data.color[i] : data.color;
                    if (!c1) {// point is inside visible rect
                        if (data.shape == 1) marker_g.rect(data.size[i], data.size[i]).translate(x1 - halfSize, y1 - halfSize).fill(color).style({ stroke: border });
                        else if (data.shape == 2) marker_g.circle(data.size[i]).translate(x1 - halfSize, y1 - halfSize).style({fill: color, stroke:border});
                        else if (data.shape == 3) marker_g.rect(data.size[i] / Math.sqrt(2), data.size[i] / Math.sqrt(2)).translate(x1, y1 - halfSize).style({fill:color, stroke:border}).rotate(45); //diamond
                        else if (data.shape == 4) {
                            var halfThirdSize = size / 6;
                            marker_g.polyline([[-halfSize, -halfThirdSize], [-halfThirdSize, -halfThirdSize], [-halfThirdSize, -halfSize], [halfThirdSize, -halfSize],
                                [halfThirdSize, -halfThirdSize], [halfSize, -halfThirdSize], [halfSize, halfThirdSize], [halfThirdSize, halfThirdSize], [halfThirdSize, halfSize],
                                [-halfThirdSize, halfSize], [-halfThirdSize, halfThirdSize], [-halfSize, halfThirdSize], [-halfSize, -halfThirdSize]]).translate(x1, y1).style({ fill: color, stroke: border });//cross
                        }
                        else if (data.shape == 5) {
                            var r = Math.sqrt(3) / 6 * size;
                            marker_g.polyline([[x1 - halfSize, y1 + r], [x1, y1 - r * 2], [x1 + halfSize, y1 + r], [x1 - halfSize, y1 + r]]).style({ fill: color, stroke: border });//triangle
                        }
    
                    }
                }
                marker_g.clipWith(marker_g.rect(w_s, h_s));
            };
            nextValuePoint();
        },

        buildSvgLegendElements: function (legendSettings, svg, data, getTitle) {
            var thumbnail = svg.group();
            var content = svg.group();
            var fontSize = 12;
            var size = fontSize * 1.5;
            var x1 = size / 2 + 1;
            var y1 = x1;
            var halfSize = size / 2;
            //thumbnail
            if (data.individualColors) {
                border = "#000000";
                color = "#ffffff";
            }
            else {
                color = data.color;
                border = "none";
                if (data.border != null) border = data.border;
            }
            switch (data.shape) {     
                case 1: // box
                    thumbnail.rect(size, size).translate(x1 - halfSize, y1 - halfSize).fill({color: color, opacity: 1}).stroke(border); 
                    break;
                case 2: // circle
                    thumbnail.circle(size).translate(x1 - halfSize, y1 - halfSize).fill(color).stroke(border);
                    break;
                case 3: // diamond
                    thumbnail.rect(size / Math.sqrt(2), size / Math.sqrt(2)).translate(x1, y1 - halfSize).fill(color).stroke(border).rotate(45);
                    break;
                case 4: // cross
                    var halfThirdSize = size / 6;
                    thumbnail.polyline([[-halfSize, -halfThirdSize], [-halfThirdSize, -halfThirdSize], [-halfThirdSize, -halfSize], [halfThirdSize, -halfSize],
                        [halfThirdSize, -halfThirdSize], [halfSize, -halfThirdSize], [halfSize, halfThirdSize], [halfThirdSize, halfThirdSize], [halfThirdSize, halfSize],
                        [-halfThirdSize, halfSize], [-halfThirdSize, halfThirdSize], [-halfSize, halfThirdSize], [-halfSize, -halfThirdSize]]).translate(x1, y1).fill(color).stroke(border);//cross    
                    break;
                case 5: // triangle
                    var r = Math.sqrt(3) / 6 * size;
                    thumbnail.polyline([[x1 - halfSize, y1 + r], [x1, y1 - r * 2], [x1 + halfSize, y1 + r], [x1 - halfSize, y1 + r]]).fill(color).stroke(border);//triangle    
                    break;
            }
            //content
            var shiftsizePalette = 0;
            var isContent = legendSettings.legendDiv.children[1];
            var isColor = data.individualColors && data.colorPalette;
            var isSize = data.sizePalette;
            var style = (isContent && legendSettings.legendDiv.children[1].children[0] && legendSettings.legendDiv.children[1].children[0].children[0]) ? window.getComputedStyle(legendSettings.legendDiv.children[1].children[0].children[0], null) : undefined;
            fontSize = style ? parseFloat(style.getPropertyValue('font-size')) : undefined;
            fontFamily = style ? style.getPropertyValue('font-family') : undefined;
            var fontWeight = style ? style.getPropertyValue('font-weight') : undefined;
            if (isColor) {
                var colorText = getTitle("color");
                content.text(colorText).font({ family: fontFamily, size: fontSize, weight: fontWeight });
                var colorPalette_g = svg.group();
                var width = legendSettings.width;
                var height = 20;
                InteractiveDataDisplay.SvgColorPaletteViewer(colorPalette_g, data.colorPalette, legendSettings.legendDiv.children[1].children[0].children[1], { width: width, height: height });
                colorPalette_g.translate(5, 50);
                shiftsizePalette = 50 + height;
                legendSettings.height += (50 + height);
            };
            if (data.sizePalette) {
                var sizeText = getTitle("size");
                content.add(svg.text(sizeText).font({ family: fontFamily, size: fontSize, weight: fontWeight }).translate(0, shiftsizePalette));
                var sizePalette_g = svg.group();
                var width = legendSettings.width;
                var height = 35;
                var sizeElement = isColor ? legendSettings.legendDiv.children[1].children[1].children[1] : legendSettings.legendDiv.children[1].children[0].children[1];
                InteractiveDataDisplay.SvgSizePaletteViewer(sizePalette_g, data.sizePalette, sizeElement, { width: width, height: height });
                sizePalette_g.translate(5, 50 + shiftsizePalette);

                legendSettings.height += (50 + height);
            };
            svg.front();
            return { thumbnail: thumbnail, content: content };
        }
    }
    InteractiveDataDisplay.Markers.shapes["box"] = primitiveShape;
    InteractiveDataDisplay.Markers.shapes["circle"] = primitiveShape;
    InteractiveDataDisplay.Markers.shapes["diamond"] = primitiveShape;
    InteractiveDataDisplay.Markers.shapes["cross"] = primitiveShape;
    InteractiveDataDisplay.Markers.shapes["triangle"] = primitiveShape;
})();;InteractiveDataDisplay.Petal = {
    prepare: function (data) {
        if (!data.maxDelta) {
            var i = 0;
            while (isNaN(data.size.upper95[i]) || isNaN(data.size.lower95[i])) i++;
            var maxDelta = data.size.upper95[i] - data.size.lower95[i];
            i++;
            for (; i < data.size.upper95.length; i++)
                if (!isNaN(data.size.upper95[i]) && !isNaN(data.size.lower95[i]))
                    maxDelta = Math.max(maxDelta, data.size.upper95[i] - data.size.lower95[i]);
            data.maxDelta = maxDelta;
        }
        // y
        if (data.y == undefined || data.y == null) throw "The mandatory property 'y' is undefined or null";
        if (!InteractiveDataDisplay.Utils.isArray(data.y)) throw "The property 'y' must be an array of numbers";
        var n = data.y.length;

        var mask = new Int8Array(n);
        InteractiveDataDisplay.Utils.maskNaN(mask, data.y);

        // x
        if (data.x == undefined)
            data.x = InteractiveDataDisplay.Utils.range(0, n - 1);
        else if (!InteractiveDataDisplay.Utils.isArray(data.x)) throw "The property 'x' must be an array of numbers";
        else if (data.x.length != n) throw "Length of the array which is a value of the property 'x' differs from lenght of 'y'"
        else InteractiveDataDisplay.Utils.maskNaN(mask, data.x);

        // border
        if (data.border == undefined || data.border == "none")
            data.border = null; // no border

        // colors        
        if (data.color == undefined) data.color = InteractiveDataDisplay.Markers.defaults.color;
        if (InteractiveDataDisplay.Utils.isArray(data.color)) {
            if (data.color.length != n) throw "Length of the array 'color' is different than length of the array 'y'"
            if (n > 0 && typeof (data.color[0]) !== "string") { // color is a data series                 
                var palette = data.colorPalette;
                if (palette == undefined) palette = InteractiveDataDisplay.Markers.defaults.colorPalette;
                if (typeof palette == 'string') palette = new InteractiveDataDisplay.ColorPalette.parse(palette);
                if (palette != undefined && palette.isNormalized) {
                    var r = InteractiveDataDisplay.Utils.getMinMax(data.color);
                    r = InteractiveDataDisplay.Utils.makeNonEqual(r);
                    palette = palette.absolute(r.min, r.max);
                }
                data.colorPalette = palette;
                var colors = new Array(n);
                for (var i = 0; i < n; i++) {
                    var color = data.color[i];
                    if (color != color) // NaN
                        mask[i] = 1;
                    else {
                        var rgba = palette.getRgba(color);                        
                        colors[i] = "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
                    }
                }
                data.color = colors;
            }
            data.individualColors = true;
        } else {
            data.individualColors = false;
        }

        // sizes    
        var sizes = new Array(n);
        if (InteractiveDataDisplay.Utils.isArray(data.size.lower95) && InteractiveDataDisplay.Utils.isArray(data.size.upper95)) {
            if (data.size.lower95.length != n && data.size.upper95.length != n) throw "Length of the array 'size' is different than length of the array 'y'";
            if (n > 0 && typeof (data.size.lower95[0]) === "number" && typeof (data.size.upper95[0]) === "number") { // color is a data series                 
                var sizes_u95 = [];
                var sizes_l95 = [];
                for (var i = 0; i < n; i++) {
                    var size_u95 = data.size.upper95[i];
                    var size_l95 = data.size.lower95[i];
                    if (size_u95 != size_u95 || size_l95 != size_l95)
                        mask[i] = 1;
                    else {
                        sizes_u95[i] = data.size.upper95[i];
                        sizes_l95[i] = data.size.lower95[i];
                    }
                }
                data.upper95 = sizes_u95;
                data.lower95 = sizes_l95;
            }
        }
        data.size = '15.0';
        for (var i = 0; i < n; i++) sizes[i] = data.size;
            data.sizeMax = data.size;
        data.size = sizes;

        // Filtering out missing values
        var m = 0;
        for (var i = 0; i < n; i++) if (mask[i] === 1) m++;
        if (m > 0) { // there are missing values
            m = n - m;
            data.x = InteractiveDataDisplay.Utils.applyMask(mask, data.x, m);
            data.y = InteractiveDataDisplay.Utils.applyMask(mask, data.y, m);
            data.size = InteractiveDataDisplay.Utils.applyMask(mask, data.size, m);
            data.upper95 = InteractiveDataDisplay.Utils.applyMask(mask, data.upper95, m);
            data.lower95 = InteractiveDataDisplay.Utils.applyMask(mask, data.lower95, m);
            if (data.individualColors)
                data.color = InteractiveDataDisplay.Utils.applyMask(mask, data.color, m);
            var indices = Array(m);
            for (var i = 0, j = 0; i < n; i++) if (mask[i] === 0) indices[j++] = i;
            data.indices = indices;
        } else {
            data.indices = InteractiveDataDisplay.Utils.range(0, n - 1);
        }
    },
    preRender: function (data, plotRect, screenSize, dt, context) {
        if (!data.individualColors)
            context.fillStyle = data.color;
        if (data.border != null)
            context.strokeStyle = data.border;
        return data;
    },
    draw: function (marker, plotRect, screenSize, transform, context) {
        var x0 = transform.dataToScreenX(marker.x);
        var y0 = transform.dataToScreenY(marker.y);
        if (x0 > screenSize.width || x0 < 0) return;
        if (y0 > screenSize.height || y0 < 0) return;

        var maxSize = marker.size / 2;
        var minSize = maxSize * (1 - (marker.upper95 - marker.lower95) / marker.maxDelta);
        if (marker.maxDelta <= 0) minSize = NaN;

        InteractiveDataDisplay.Petal.drawSample(context, x0, y0, minSize, maxSize, marker.color);
    },
    drawSample: function (context, x, y, minSize, maxSize, color) {
        var A, D;
        var C = Math.random() * Math.PI * 2;
        if (isNaN(minSize)) {
            A = 0;
            D = maxSize;
            context.fillStyle = "rgba(0, 0, 0, 0.2)";
        }
        else {
            A = (maxSize - minSize) / 2;
            D = (maxSize + minSize) / 2;
            context.fillStyle = color;
        }
        context.strokeStyle = "black";

        context.beginPath();
        var n = 200;
        var alpha = Math.PI * 2 / n;
        for (var i = 0; i < n; i++) {
            var phi = alpha * i;
            var r = A * Math.sin(6 * phi + C) + D;
            if (i == 0)
                context.moveTo(x + r * Math.cos(phi), y + r * Math.sin(phi));
            else
                context.lineTo(x + r * Math.cos(phi), y + r * Math.sin(phi));
        }
        context.stroke();
        context.closePath();
        context.fill();

        context.strokeStyle = "gray";
        context.beginPath();
        context.arc(x, y, 1, 0, Math.PI * 2);
        context.stroke();
        context.closePath();
    },
    hitTest: function (marker, transform, ps, pd) {
        var x = transform.dataToScreenX(marker.x);
        var y = transform.dataToScreenY(marker.y);
        var r = marker.size / 2;
        if (ps.x < x - r || ps.x > x + r) return false;
        if (ps.y < y - r || ps.y > y + r) return false;
        return true;
    },
    getLegend: function (data, getTitle, legendDiv) { // todo: should be refactored            
        var itemDiv = legendDiv.content;
        var fontSize = 14;
        if (document.defaultView && document.defaultView.getComputedStyle) {
            fontSize = parseFloat(document.defaultView.getComputedStyle(itemDiv[0], null).getPropertyValue("font-size"));
        }
        if (isNaN(fontSize) || fontSize == 0) fontSize = 14;

        var canvas = legendDiv.thumbnail;
        var canvasIsVisible = true;
        var maxSize = fontSize * 1.5;
        var x1 = maxSize / 2 + 1;
        var y1 = maxSize / 2 + 1;
        canvas[0].width = canvas[0].height = maxSize + 2;
        var canvasStyle = canvas[0].style;
        var context = canvas.get(0).getContext("2d");
        context.clearRect(0, 0, canvas[0].width, canvas[0].height);

        var color, border, drawBorder;
        var colorDiv, colorDivStyle, colorControl;
        var colorIsVisible = 0;

        var size, halfSize;
        var sizeDiv, sizeDivStyle, sizeControl;
        var sizeIsVisible = 0;

        var sizeTitle;
        var refreshSize = function () {
            size = maxSize;
            var szTitleText = getTitle("size");
            if (sizeIsVisible == 0) {
                sizeDiv = $("<div style='width: 170px; margin-top: 5px; margin-bottom: 5px'></div>").appendTo(itemDiv);
                sizeTitle = $("<div class='idd-legend-item-property'></div>").text(szTitleText).appendTo(sizeDiv);
                sizeDivStyle = sizeDiv[0].style;
                var paletteDiv = $("<div style='width: 170px;'></div>").appendTo(sizeDiv);
                sizeControl = new InteractiveDataDisplay.UncertaintySizePaletteViewer(paletteDiv);
                sizeIsVisible = 2;
            } else {
                sizeTitle.text(szTitleText);
            }
            halfSize = size / 2;
        };

        var colorTitle;
        var refreshColor = function () {
            drawBorder = false;
            if (data.individualColors && data.colorPalette) {
                var clrTitleText = getTitle("color");
                if (colorIsVisible == 0) {
                    colorDiv = $("<div style='width: 170px; margin-top: 5px; margin-bottom: 5px'></div>").appendTo(itemDiv);
                    colorTitle = $("<div class='idd-legend-item-property'></div>").text(clrTitleText).appendTo(colorDiv);
                    colorDivStyle = colorDiv[0].style;
                    var paletteDiv = $("<div style='width: 170px;'></div>").appendTo(colorDiv);
                    colorControl = new InteractiveDataDisplay.ColorPaletteViewer(paletteDiv);
                    colorIsVisible = 2;
                } else {
                    colorTitle.text(clrTitleText);
                }
                colorControl.palette = data.colorPalette;
                if (colorIsVisible == 1) {
                    colorDivStyle.display = "block";
                    colorIsVisible = 2;
                }
            }
            else {
                if (colorIsVisible == 2) {
                    colorDivStyle.display = "none";
                    colorIsVisible = 1;
                }
            }
            if (data.individualColors) {
                border = "#000000";
                color = "#ffffff";
                drawBorder = true;
            }
            else {
                color = data.color;
                border = color;
                if (data.border != null) {
                    drawBorder = true;
                    border = data.border;
                }
            }
        };

        var renderShape = function () {
            var sampleColor = "gray";
            var sampleBorderColor = "gray";

            InteractiveDataDisplay.Petal.drawSample(context, x1, y1, halfSize / 2, halfSize, sampleColor);
        };

        refreshColor();
        refreshSize();
        renderShape();
    },
    getTooltipData: function (originalData, index) {
        var dataRow = {};
        var formatter = {};
        if (InteractiveDataDisplay.Utils.isArray(originalData.x) && index < originalData.x.length) {
            formatter["x"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.x);
            dataRow['x'] = formatter["x"].toString(originalData.x[index]);
        }
        if (InteractiveDataDisplay.Utils.isArray(originalData.y) && index < originalData.y.length) {
            formatter["y"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.y);
            dataRow['y'] = formatter["y"].toString(originalData.y[index]);
        }
        if (InteractiveDataDisplay.Utils.isArray(originalData.color) && index < originalData.color.length) {
            formatter["color"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.color);
            dataRow['color'] = formatter["color"].toString(originalData.color[index]);
        }
        if (originalData.size) {
            dataRow['size'] = {};
            if (InteractiveDataDisplay.Utils.isArray(originalData.size.lower95) && index < originalData.size.lower95.length) {
                formatter["lower95"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.size.lower95);
                dataRow['size']["lower 95%"] = formatter["lower95"].toString(originalData.size.lower95[index]);
            }
            if (InteractiveDataDisplay.Utils.isArray(originalData.size.upper95) && index < originalData.size.upper95.length) {
                formatter["upper95"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.size.upper95);
                dataRow['size']["upper 95%"] = formatter["upper95"].toString(originalData.size.upper95[index]);
            }
        }
        dataRow["index"] = index;
        return dataRow;
    },
    renderSvg: function (plotRect, screenSize, svg, data, t) {
        var n = data.y.length;
        if (n == 0) return;

        var petal_g = svg.group();
        var dataToScreenX = t.dataToScreenX;
        var dataToScreenY = t.dataToScreenY;

        // size of the canvas
        var w_s = screenSize.width;
        var h_s = screenSize.height;
        var xmin = 0, xmax = w_s;
        var ymin = 0, ymax = h_s;
        var x1, y1;
        var i = 0;
        var size = data.size[0];
        var border = data.border == null ? 'none' : data.border;
        for (; i < n; i++) {
            x1 = dataToScreenX(data.x[i]);
            y1 = dataToScreenY(data.y[i]);
            var maxSize = size / 2;
            var minSize = maxSize * (1 - (data.upper95[i] - data.lower95[i]) / data.maxDelta);
            var color = data.color[i];

            c1 = (x1 > w_s || x1 < 0 || y1 > h_s || y1 < 0);
            if (!c1) {
                var A, D;
                var C = Math.random() * Math.PI * 2;
                A = (maxSize - minSize) / 2;
                D = (maxSize + minSize) / 2;

                var m = 200;
                var alpha = Math.PI * 2 / m;
                var segment = [];
                for (var j = 0; j < m; j++) {
                    var phi = alpha * j;
                    var r = A * Math.sin(6 * phi + C) + D;
                    segment.push([x1 + r * Math.cos(phi), y1 + r * Math.sin(phi)]);
                }
                petal_g.polyline(segment).fill(color).stroke("black");
                petal_g.circle(2).translate(x1 - 1, y1 - 1).fill("gray").stroke({ width: 2, color: "gray" });
            }
        }
        petal_g.clipWith(petal_g.rect(w_s, h_s));
    }
};
InteractiveDataDisplay.BullEye = {
    prepare: function (data) {
        data.bullEyeShape = data.bullEyeShape ? data.bullEyeShape.toLowerCase() : "circle";
        // y
        if (data.y == undefined || data.y == null) throw "The mandatory property 'y' is undefined or null";
        if (!InteractiveDataDisplay.Utils.isArray(data.y)) throw "The property 'y' must be an array of numbers";
        var n = data.y.length;

        var mask = new Int8Array(n);
        InteractiveDataDisplay.Utils.maskNaN(mask, data.y);

        // x
        if (data.x == undefined)
            data.x = InteractiveDataDisplay.Utils.range(0, n - 1);
        else if (!InteractiveDataDisplay.Utils.isArray(data.x)) throw "The property 'x' must be an array of numbers";
        else if (data.x.length != n) throw "Length of the array which is a value of the property 'x' differs from lenght of 'y'"
        else InteractiveDataDisplay.Utils.maskNaN(mask, data.x);

        // border
        if (data.border == undefined || data.border == "none")
            data.border = null; // no border

        // colors        
        if (InteractiveDataDisplay.Utils.isArray(data.color.lower95) && InteractiveDataDisplay.Utils.isArray(data.color.upper95)) {
            if (data.color.lower95.length != n && data.color.upper95.length != n) throw "Length of the array 'color' is different than length of the array 'y'"
            if (n > 0 && typeof (data.color.lower95[0]) !== "undefined" && typeof (data.color.upper95[0]) !== "string") { // color is a data series                 
                var palette = data.colorPalette;
                if (palette == undefined) palette = InteractiveDataDisplay.Markers.defaults.colorPalette;
                if (typeof palette == 'string') palette = new InteractiveDataDisplay.ColorPalette.parse(palette);
                if (palette != undefined && palette.isNormalized) {
                    var r = { min: InteractiveDataDisplay.Utils.getMin(data.color.lower95), max: InteractiveDataDisplay.Utils.getMax(data.color.upper95) };
                    r = InteractiveDataDisplay.Utils.makeNonEqual(r);
                    palette = palette.absolute(r.min, r.max);
                }
                data.colorPalette = palette;
                var colors_u95 = [];
                var colors_l95 = [];
                for (var i = 0; i < n; i++){
                    var color_u95 = data.color.upper95[i];
                    var color_l95 = data.color.lower95[i];
                    if (color_u95 != color_u95 || color_l95 != color_l95)
                        mask[i] = 1;
                    else {
                        var u95rgba = palette.getRgba(color_u95);
                        var l95rgba = palette.getRgba(color_l95);
                        colors_u95[i] = "rgba(" + u95rgba.r + "," + u95rgba.g + "," + u95rgba.b + "," + u95rgba.a + ")";
                        colors_l95[i] = "rgba(" + l95rgba.r + "," + l95rgba.g + "," + l95rgba.b + "," + l95rgba.a + ")";
                    }
                }
                data.upper95 = colors_u95;
                data.lower95 = colors_l95;
            }
            data.individualColors = true;
        } else {
            data.individualColors = false;
        }

        // sizes    
        var sizes = new Array(n);
        if (data.size == undefined) data.size = InteractiveDataDisplay.Markers.defaults.size;
        if (InteractiveDataDisplay.Utils.isArray(data.size)) {
            if (data.size.length != n) throw "Length of the array 'size' is different than length of the array 'y'"
            if (data.sizePalette != undefined) { // 'size' is a data series 
                var palette = InteractiveDataDisplay.SizePalette.Create(data.sizePalette);
                if (palette.isNormalized) {
                    var r = InteractiveDataDisplay.Utils.getMinMax(data.size);
                    r = InteractiveDataDisplay.Utils.makeNonEqual(r);
                    palette = new InteractiveDataDisplay.SizePalette(false, palette.sizeRange, r);
                }
                data.sizePalette = palette;
                for (var i = 0; i < n; i++) {
                    var size = data.size[i];
                    if (size != size) // NaN
                        mask[i] = 1;
                    else
                        sizes[i] = palette.getSize(size)
                }
            } else { // 'size' contains values in pixels
                data.sizeMax = InteractiveDataDisplay.Utils.getMax(data.size);
            }
        } else { // sizes is a constant
            for (var i = 0; i < n; i++) sizes[i] = data.size;
            data.sizeMax = data.size;
        }
        data.size = sizes;

        // Filtering out missing values
        var m = 0;
        for (var i = 0; i < n; i++) if (mask[i] === 1) m++;
        if (m > 0) { // there are missing values
            m = n - m;
            data.x = InteractiveDataDisplay.Utils.applyMask(mask, data.x, m);
            data.y = InteractiveDataDisplay.Utils.applyMask(mask, data.y, m);
            data.size = InteractiveDataDisplay.Utils.applyMask(mask, data.size, m);
            if (data.individualColors) {
                data.upper95 = InteractiveDataDisplay.Utils.applyMask(mask, data.upper95, m);
                data.lower95 = InteractiveDataDisplay.Utils.applyMask(mask, data.lower95, m);
            }
            var indices = Array(m);
            for (var i = 0, j = 0; i < n; i++) if (mask[i] === 0) indices[j++] = i;
            data.indices = indices;
        } else {
            data.indices = InteractiveDataDisplay.Utils.range(0, n - 1);
        }
    },
    preRender: function (data, plotRect, screenSize, dt, context) {
        if(data.border != null)
            context.strokeStyle = data.border;
        return data;
    },
    draw: function (marker, plotRect, screenSize, transform, context) {

          var mean = marker.y_mean;
          var u95 = marker.upper95;
          var l95 = marker.lower95;

          var msize = marker.size;
          var shift = msize / 2;
          var x = transform.dataToScreenX(marker.x);
          var y = transform.dataToScreenY(marker.y);

          if (x + shift < 0 || x - shift > screenSize.width) return;
          if (y + shift < 0 || y - shift > screenSize.height) return;
          InteractiveDataDisplay.BullEye.drawBullEye(context, marker.bullEyeShape, x, y, msize, msize, u95);
          InteractiveDataDisplay.BullEye.drawBullEye(context, marker.bullEyeShape, x, y, shift, shift, l95);
    },
    drawBullEye: function(context, shape, x, y, width, height, fill, stroke) {
        var w = width;
        var h = height;
        var useStroke = stroke !== "none";
        context.strokeStyle = stroke !== undefined ? stroke : "black";
        context.fillStyle = fill !== undefined ? fill : "black";

        var x1 = x;
        var y1 = y;

        var size = Math.min(w, h);
        var halfSize = 0.5 * size;
        var quarterSize = 0.5 * halfSize;

        context.clearRect(0, 0, w, h);
        switch (shape) {
            case "box": // box                
                if (useStroke) context.strokeRect(x1 - halfSize, y1 - halfSize, size, size);
                context.fillRect(x1 - halfSize, y1 - halfSize, size, size);
                break;
            case "circle": // circle
                context.beginPath();
                context.arc(x1, y1, halfSize, 0, 2 * Math.PI);
                if (useStroke) context.stroke();
                context.fill();
                break;
            case "diamond": // diamond
                context.beginPath();
                context.moveTo(x1 - halfSize, y1);
                context.lineTo(x1, y1 - halfSize);
                context.lineTo(x1 + halfSize, y1);
                context.lineTo(x1, y1 + halfSize);
                context.closePath();
                if (useStroke) context.stroke();
                context.fill();
                break;
            case "cross": // cross
                var thirdSize = size / 3;
                var halfThirdSize = thirdSize / 2;
                context.beginPath();
                context.moveTo(x1 - halfSize, y1 - halfThirdSize);
                context.lineTo(x1 - halfThirdSize, y1 - halfThirdSize);
                context.lineTo(x1 - halfThirdSize, y1 - halfSize);
                context.lineTo(x1 + halfThirdSize, y1 - halfSize);
                context.lineTo(x1 + halfThirdSize, y1 - halfThirdSize);
                context.lineTo(x1 + halfSize, y1 - halfThirdSize);
                context.lineTo(x1 + halfSize, y1 + halfThirdSize);
                context.lineTo(x1 + halfThirdSize, y1 + halfThirdSize);
                context.lineTo(x1 + halfThirdSize, y1 + halfSize);
                context.lineTo(x1 - halfThirdSize, y1 + halfSize);
                context.lineTo(x1 - halfThirdSize, y1 + halfThirdSize);
                context.lineTo(x1 - halfSize, y1 + halfThirdSize);
                context.closePath();
                if (useStroke) context.stroke();
                context.fill();
                break;
            case "triangle": // triangle
                var r = Math.sqrt(3) / 6 * size;
                context.beginPath();
                context.moveTo(x1 - halfSize, y1 + r);
                context.lineTo(x1, y1 - r * 2);
                context.lineTo(x1 + halfSize, y1 + r);
                context.closePath();
                if (useStroke) context.stroke();
                context.fill();
                break;
        }
    },
    hitTest: function (marker, transform, ps, pd) {
          var xScreen = transform.dataToScreenX(marker.x);
          var yScreen = transform.dataToScreenY(marker.y);

          var isIntersecting =
              ps.x > xScreen - marker.size / 2 &&
              ps.x < xScreen + marker.size / 2 &&
              ps.y > yScreen - marker.size / 2 &&
              ps.y < yScreen + marker.size / 2;

          return isIntersecting;
      },
    getPadding: function (data) {
          var padding = 0;
          return { left: padding, right: padding, top: padding, bottom: padding };
      },
    getLegend: function (data, getTitle, legendDiv) { // todo: should be refactored            
          var itemDiv = legendDiv.content;
          var fontSize = 14;
          if (document.defaultView && document.defaultView.getComputedStyle) {
              fontSize = parseFloat(document.defaultView.getComputedStyle(itemDiv[0], null).getPropertyValue("font-size"));
          }
          if (isNaN(fontSize) || fontSize == 0) fontSize = 14;

          var canvas = legendDiv.thumbnail;
          var canvasIsVisible = true;
          var maxSize = fontSize * 1.5;
          var x1 = maxSize / 2 + 1;
          var y1 = maxSize / 2 + 1;
          canvas[0].width = canvas[0].height = maxSize + 2;
          var canvasStyle = canvas[0].style;
          var context = canvas.get(0).getContext("2d");
          context.clearRect(0, 0, canvas[0].width, canvas[0].height);

          var color, border, drawBorder;
          var colorDiv, colorDivStyle, colorControl;
          var colorIsVisible = 0;

          var size, halfSize;
          var sizeDiv, sizeDivStyle, sizeControl;
          var sizeIsVisible = 0;

          var sizeTitle;
          var refreshSize = function () {
              size = maxSize;
              if (data.sizePalette) {
                  var szTitleText = getTitle("size");
                  if (sizeIsVisible == 0) {
                      sizeDiv = $("<div style='width: 170px; margin-top: 5px; margin-bottom: 5px'></div>").appendTo(itemDiv);
                      sizeTitle = $("<div class='idd-legend-item-property'></div>").text(szTitleText).appendTo(sizeDiv);
                      sizeDivStyle = sizeDiv[0].style;
                      var paletteDiv = $("<div style='width: 170px;'></div>").appendTo(sizeDiv);
                      sizeControl = new InteractiveDataDisplay.SizePaletteViewer(paletteDiv);
                      sizeIsVisible = 2;
                  } else {
                      sizeTitle.text(szTitleText);
                  }
                  sizeControl.palette = InteractiveDataDisplay.SizePalette.Create(data.sizePalette);
              }
              halfSize = size / 2;
          };

          var colorTitle;
          var refreshColor = function () {
              drawBorder = false;
              if (data.individualColors && data.colorPalette) {
                  var clrTitleText = getTitle("color");
                  if (colorIsVisible == 0) {
                      colorDiv = $("<div style='width: 170px; margin-top: 5px; margin-bottom: 5px'></div>").appendTo(itemDiv);
                      colorTitle = $("<div class='idd-legend-item-property'></div>").text(clrTitleText).appendTo(colorDiv);
                      colorDivStyle = colorDiv[0].style;
                      var paletteDiv = $("<div style='width: 170px;'></div>").appendTo(colorDiv);
                      colorControl = new InteractiveDataDisplay.ColorPaletteViewer(paletteDiv);
                      colorIsVisible = 2;
                  } else {
                      colorTitle.text(clrTitleText);
                  }
                  colorControl.palette = data.colorPalette;
                  if (colorIsVisible == 1) {
                      colorDivStyle.display = "block";
                      colorIsVisible = 2;
                  }
              }
              else {
                  if (colorIsVisible == 2) {
                      colorDivStyle.display = "none";
                      colorIsVisible = 1;
                  }
              }
              if (data.individualColors) {
                  border = "#000000";
                  color = "#ffffff";
                  drawBorder = true;
              }
              else {
                  color = data.color;
                  border = color;
                  if (data.border != null) {
                      drawBorder = true;
                      border = data.border;
                  }
              }
          };

          var renderShape = function () {
              var sampleColor = "gray";
              var sampleBorderColor = "gray";

              InteractiveDataDisplay.BullEye.drawBullEye(context, data.bullEyeShape, x1, y1, size, size, sampleColor, sampleBorderColor);
          };

          refreshColor();
          refreshSize();
          renderShape();
      },
    getTooltipData: function (originalData, index) {
        var dataRow = {};
        var formatter = {};
        if (InteractiveDataDisplay.Utils.isArray(originalData.x) && index < originalData.x.length) {
            formatter["x"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.x);
            dataRow['x'] = formatter["x"].toString(originalData.x[index]);
        }
        if (InteractiveDataDisplay.Utils.isArray(originalData.y) && index < originalData.y.length) {
            formatter["y"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.y);
            dataRow['y'] = formatter["y"].toString(originalData.y[index]);
        }
        if (originalData.color) {
            dataRow['color'] = {};
            if (InteractiveDataDisplay.Utils.isArray(originalData.color.lower95) && index < originalData.color.lower95.length) {
                formatter["lower95"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.color.lower95);
                dataRow['color']["lower 95%"] = formatter["lower95"].toString(originalData.color.lower95[index]);
            }
            if (InteractiveDataDisplay.Utils.isArray(originalData.color.upper95) && index < originalData.color.upper95.length) {
                formatter["upper95"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.color.upper95);
                dataRow['color']["upper 95%"] = formatter["upper95"].toString(originalData.color.upper95[index]);
            }
        }
        if (InteractiveDataDisplay.Utils.isArray(originalData.size) && index < originalData.size.length) {
            formatter["size"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.size);
            dataRow['size'] = formatter["size"].toString(originalData.size[index]);
        }
        dataRow["index"] = index;
        return dataRow;
    },
    renderSvg: function (plotRect, screenSize, svg, data, t) {
        var n = data.y.length;
        if (n == 0) return;

        var bulleye_g = svg.group();
        var dataToScreenX = t.dataToScreenX;
        var dataToScreenY = t.dataToScreenY;

        // size of the canvas
        var w_s = screenSize.width;
        var h_s = screenSize.height;
        var xmin = 0, xmax = w_s;
        var ymin = 0, ymax = h_s;

        var x1, y1;
        var i = 0;
        var size = data.size[0];
        var halfSize = 0.5 * size;
        var quarterSize = 0.5 * halfSize;
        for (; i < n; i++) {
            x1 = dataToScreenX(data.x[i]);
            y1 = dataToScreenY(data.y[i]);
            c1 = (x1 + halfSize < 0 || x1 - halfSize > w_s || y1 + halfSize < 0 || y1 - halfSize > h_s);
            var color_u95 = data.individualColors ? data.upper95[i] : data.upper95;
            var color_l95 = data.individualColors ? data.lower95[i] : data.lower95;
            if (!c1) {
                switch (data.bullEyeShape) {
                    case "box":
                        bulleye_g.rect(size, size).translate(x1 - halfSize, y1 - halfSize).fill(color_u95).stroke({ width: 0.5, color: "black" });
                        bulleye_g.rect(halfSize, halfSize).translate(x1 - quarterSize, y1 - quarterSize).fill(color_l95).stroke({ width: 0.5, color: "black" });
                        break;
                    case "circle":
                        bulleye_g.circle(size).translate(x1 - halfSize, y1 - halfSize).fill(color_u95).stroke({ width: 0.5, color: "black" });
                        bulleye_g.circle(halfSize).translate(x1 - quarterSize, y1 - quarterSize).fill(color_l95).stroke({ width: 0.5, color: "black" });
                        break;
                    case "diamond":
                        bulleye_g.rect(size / Math.sqrt(2), size / Math.sqrt(2)).translate(x1, y1 - halfSize).fill(color_u95).stroke({ width: 0.5, color: "black" }).rotate(45);
                        bulleye_g.rect(halfSize / Math.sqrt(2), halfSize / Math.sqrt(2)).translate(x1, y1 - quarterSize).fill(color_l95).stroke({ width: 0.5, color: "black" }).rotate(45);
                        break;
                    case "cross":
                        var halfThirdSize = size / 6;
                        var quarterThirdSize = halfSize / 6;
                        bulleye_g.polyline([[-halfSize, -halfThirdSize], [-halfThirdSize, -halfThirdSize], [-halfThirdSize, -halfSize], [halfThirdSize, -halfSize],
                                [halfThirdSize, -halfThirdSize], [halfSize, -halfThirdSize], [halfSize, halfThirdSize], [halfThirdSize, halfThirdSize], [halfThirdSize, halfSize],
                                [-halfThirdSize, halfSize], [-halfThirdSize, halfThirdSize], [-halfSize, halfThirdSize], [-halfSize, -halfThirdSize]]).translate(x1, y1).fill(color_u95).stroke({ width: 0.5, color: "black" });
                        bulleye_g.polyline([[-quarterSize, -quarterThirdSize], [-quarterThirdSize, -quarterThirdSize], [-quarterThirdSize, -quarterSize], [quarterThirdSize, -quarterSize],
                                [quarterThirdSize, -quarterThirdSize], [quarterSize, -quarterThirdSize], [quarterSize, quarterThirdSize], [quarterThirdSize, quarterThirdSize], [quarterThirdSize, quarterSize],
                                [-quarterThirdSize, quarterSize], [-quarterThirdSize, quarterThirdSize], [-quarterSize, quarterThirdSize], [-quarterSize, -quarterThirdSize]]).translate(x1, y1).fill(color_l95).stroke({ width: 0.5, color: "black" });
                        break;
                    case "triangle":
                        var r = Math.sqrt(3) / 6 * size;
                        var hr = Math.sqrt(3) / 6 * halfSize;
                        bulleye_g.polyline([[-halfSize, r], [0, -r * 2], [halfSize, r], [-halfSize, r]]).translate(x1, y1).fill(color_u95).stroke({ width: 0.5, color: "black" });
                        bulleye_g.polyline([[-quarterSize, hr], [0, -hr * 2], [quarterSize, hr], [-quarterSize, hr]]).translate(x1, y1).fill(color_l95).stroke({ width: 0.5, color: "black" });
                        break;
                }
            }
        }
        bulleye_g.clipWith(bulleye_g.rect(w_s, h_s));
    }
};
InteractiveDataDisplay.BoxWhisker = {
    prepare: function (data) {
        // y
        if (data.y.median == undefined || data.y.median == null) throw "The mandatory property 'y' is undefined or null";
        if (!InteractiveDataDisplay.Utils.isArray(data.y.median)) throw "The property 'y' must be an array of numbers";
        var n = data.y.median.length;

        var mask = new Int8Array(n);
        InteractiveDataDisplay.Utils.maskNaN(mask, data.y.median);        

        // x
        if (data.x == undefined)
            data.x = InteractiveDataDisplay.Utils.range(0, n - 1);
        else if (!InteractiveDataDisplay.Utils.isArray(data.x)) throw "The property 'x' must be an array of numbers";
        else if (data.x.length != n) throw "Length of the array which is a value of the property 'x' differs from lenght of 'y'"
        else InteractiveDataDisplay.Utils.maskNaN(mask, data.x);

        // border
        if (data.border == undefined || data.border == "none")
            data.border = null; // no border
        if (data.thickness == undefined || data.thickness == "none")
            data.thickness = 2;
        // colors        
        if (data.color == undefined) data.color = InteractiveDataDisplay.Markers.defaults.color;

        // sizes    
        var sizes = new Array(n);
        if (data.size == undefined) data.size = InteractiveDataDisplay.Markers.defaults.size;
        if (InteractiveDataDisplay.Utils.isArray(data.y.lower95) && InteractiveDataDisplay.Utils.isArray(data.y.upper95)) {
            if (data.y.lower95.length != n && data.y.upper95.length != n)
                throw "Length of the array 'y' is different than length of the array 'y'";
            if (n > 0 && typeof (data.y.lower95[0]) === "number" && typeof (data.y.upper95[0]) === "number") { // color is a data series                 
                var ys_u95 = [];
                var ys_l95 = [];
                for (var i = 0; i < n; i++) {
                    var y_u95 = data.y.upper95[i];
                    var y_l95 = data.y.lower95[i];
                    if (y_u95 != y_u95 || y_l95 != y_l95)
                        mask[i] = 1;
                    else {
                        ys_u95[i] = data.y.upper95[i];
                        ys_l95[i] = data.y.lower95[i];
                    }
                }
                data.upper95 = ys_u95;
                data.lower95 = ys_l95;
            }
        }
        if (InteractiveDataDisplay.Utils.isArray(data.y.lower68) && InteractiveDataDisplay.Utils.isArray(data.y.upper68)) {
            if (data.y.lower68.length != n && data.y.upper68.length != n)
                throw "Length of the array 'y' is different than length of the array 'y'";
            if (n > 0 && typeof (data.y.lower68[0]) === "number" && typeof (data.y.upper68[0]) === "number") { // color is a data series                 
                var ys_u68 = [];
                var ys_l68 = [];
                for (var i = 0; i < n; i++) {
                    var y_u68 = data.y.upper68[i];
                    var y_l68 = data.y.lower68[i];
                    if (y_u68 != y_u68 || y_l68 != y_l68)
                        mask[i] = 1;
                    else {
                        ys_u68[i] = data.y.upper68[i];
                        ys_l68[i] = data.y.lower68[i];
                    }
                }
                data.upper68 = ys_u68;
                data.lower68 = ys_l68;
            }
        }
        for (var i = 0; i < n; i++) sizes[i] = data.size;
        data.sizeMax = data.size;
        data.size = sizes;

        // Filtering out missing values
        var m = 0;
        for (var i = 0; i < n; i++) if (mask[i] === 1) m++;
        if (m > 0) { // there are missing values
            m = n - m;
            data.x = InteractiveDataDisplay.Utils.applyMask(mask, data.x, m);
            data.y = InteractiveDataDisplay.Utils.applyMask(mask, data.y.median, m);
            data.size = InteractiveDataDisplay.Utils.applyMask(mask, data.size, m);
            data.upper95 = InteractiveDataDisplay.Utils.applyMask(mask, data.upper95, m);
            data.lower95 = InteractiveDataDisplay.Utils.applyMask(mask, data.lower95, m);
            data.upper68 = InteractiveDataDisplay.Utils.applyMask(mask, data.upper68, m);
            data.lower68 = InteractiveDataDisplay.Utils.applyMask(mask, data.lower68, m);

            var indices = Array(m);
            for (var i = 0, j = 0; i < n; i++) if (mask[i] === 0) indices[j++] = i;
            data.indices = indices;
        } else {
            data.y = data.y.median;
            data.indices = InteractiveDataDisplay.Utils.range(0, n - 1);
        }
    },
    preRender: function (data, plotRect, screenSize, dt, context) {
        context.fillStyle = data.color;
        if (data.border != null)
            context.strokeStyle = data.border;
        return data;
    },
    draw: function (marker, plotRect, screenSize, transform, context) {

        var msize = marker.size;
        var shift = msize / 2;
        var x = transform.dataToScreenX(marker.x);
        var u68 = transform.dataToScreenY(marker.upper68);
        var l68 = transform.dataToScreenY(marker.lower68);
        var u95 = transform.dataToScreenY(marker.upper95);
        var l95 = transform.dataToScreenY(marker.lower95);
        var mean = transform.dataToScreenY(marker.y);

        context.beginPath();
        context.strokeStyle = marker.border === undefined ? "black" : marker.border;
        context.lineWidth = marker.thickness;
        if (marker.color) context.fillRect(x - shift, l68, msize, u68 - l68);
        context.strokeRect(x - shift, l68, msize, u68 - l68);

        context.moveTo(x - shift, u95);
        context.lineTo(x + shift, u95);

        context.moveTo(x, u95);
        context.lineTo(x, u68);
        context.moveTo(x, l68);
        context.lineTo(x, l95);

        context.moveTo(x - shift, l95);
        context.lineTo(x + shift, l95);

        context.moveTo(x - shift, mean);
        context.lineTo(x + shift, mean);
       
        context.stroke();
        

        if (marker.y_min !== undefined) {
            context.beginPath();
            context.arc(x, transform.dataToScreenY(marker.y_min), shift / 2, 0, 2 * Math.PI);
            context.stroke();
        }

        if (marker.y_max !== undefined) {
            context.beginPath();
            context.arc(x, transform.dataToScreenY(marker.y_max), shift / 2, 0, 2 * Math.PI);
            context.stroke();
        }
    },
    hitTest: function (marker, transform, ps, pd) {
        var xScreen = transform.dataToScreenX(marker.x);

        var ymax = transform.dataToScreenY(marker.y_min === undefined ? marker.lower95 : marker.y_min);
        var ymin = transform.dataToScreenY(marker.y_max === undefined ? marker.upper95 : marker.y_max);

        var isIntersecting =
            ps.x > xScreen - marker.size / 2 &&
            ps.x < xScreen + marker.size / 2 &&
            ps.y > ymin &&
            ps.y < ymax;

        return isIntersecting;
    },
    getBoundingBox: function (marker) {
        var size = marker.size;
        var xLeft = marker.x;
        var yBottom = marker.lower95 ? marker.lower95 : (marker.lower68 ? marker.lower68 : marker.y);
        var yTop = marker.upper95 ? marker.upper95 : (marker.upper68 ? marker.upper68 : marker.y);
        return { x: xLeft, y: yBottom, width: 0, height: Math.abs(yTop - yBottom) };
    },
    getPadding: function (data) {
        var padding = 0;
        return { left: padding, right: padding, top: padding, bottom: padding };
    },
    getLegend: function (data, getTitle, legendDiv) { // todo: should be refactored            
        var itemDiv = legendDiv.content;
        var fontSize = 14;
        if (document.defaultView && document.defaultView.getComputedStyle) {
            fontSize = parseFloat(document.defaultView.getComputedStyle(itemDiv[0], null).getPropertyValue("font-size"));
        }
        if (isNaN(fontSize) || fontSize == 0) fontSize = 14;

        var canvas = legendDiv.thumbnail;
        var canvasIsVisible = true;
        var maxSize = fontSize * 1.5;
        var x1 = maxSize / 2 + 1;
        var y1 = maxSize / 2 + 1;
        canvas[0].width = canvas[0].height = maxSize + 2;
        var canvasStyle = canvas[0].style;
        var context = canvas.get(0).getContext("2d");
        var itemIsVisible = 0;

        var color, border, drawBorder;
        var colorDiv, colorDivStyle, colorControl;
        var colorIsVisible = 0;

        var size, halfSize;
        var sizeDiv, sizeDivStyle, sizeControl;
        var sizeIsVisible = 0;

        var sizeTitle;
        var refreshSize = function () {
            size = maxSize;
            if (data.sizePalette) {
                var szTitleText = getTitle("size");
                if (sizeIsVisible == 0) {
                    sizeDiv = $("<div style='width: 170px; margin-top: 5px; margin-bottom: 5px'></div>").appendTo(itemDiv);
                    sizeTitle = $("<div class='idd-legend-item-property'></div>").text(szTitleText).appendTo(sizeDiv);
                    sizeDivStyle = sizeDiv[0].style;
                    var paletteDiv = $("<div style='width: 170px;'></div>").appendTo(sizeDiv);
                    sizeControl = new InteractiveDataDisplay.SizePaletteViewer(paletteDiv);
                    sizeIsVisible = 2;
                } else {
                    sizeTitle.text(szTitleText);
                }
                sizeControl.palette = InteractiveDataDisplay.SizePalette.Create(data.sizePalette);
            }
            halfSize = size / 2;
        };

        var colorTitle;
        var refreshColor = function () {
            drawBorder = false;
            if (data.individualColors && data.colorPalette) {
                var clrTitleText = getTitle("color");
                if (colorIsVisible == 0) {
                    colorDiv = $("<div style='width: 170px; margin-top: 5px; margin-bottom: 5px'></div>").appendTo(itemDiv);
                    colorTitle = $("<div class='idd-legend-item-property'></div>").text(clrTitleText).appendTo(colorDiv);
                    colorDivStyle = colorDiv[0].style;
                    var paletteDiv = $("<div style='width: 170px;'></div>").appendTo(colorDiv);
                    colorControl = new InteractiveDataDisplay.ColorPaletteViewer(paletteDiv);
                    colorIsVisible = 2;
                } else {
                    colorTitle.text(clrTitleText);
                }
                colorControl.palette = data.colorPalette;
                if (colorIsVisible == 1) {
                    colorDivStyle.display = "block";
                    colorIsVisible = 2;
                }
            }
            else {
                if (colorIsVisible == 2) {
                    colorDivStyle.display = "none";
                    colorIsVisible = 1;
                }
            }
            if (data.individualColors) {
                border = "#000000";
                color = "#ffffff";
                drawBorder = true;
            }
            else {
                color = data.color;
                border = color;
                if (data.border != null) {
                    drawBorder = true;
                    border = data.border;
                }
            }
        };

        var renderShape = function () {
            var sampleColor = typeof data.color == "string" ? data.color : "gray";
            var sampleBorderColor = typeof data.border == "string" ? data.border : "gray";
            var useStroke = sampleBorderColor !== "none";
            context.strokeStyle = sampleBorderColor !== undefined ? sampleBorderColor : "black";
            context.fillStyle = sampleColor !== undefined ? sampleColor : "black";

            var halfSize = 0.5 * size;
            var quarterSize = 0.5 * halfSize;
            context.clearRect(0, 0, size, size);
            context.fillRect(x1 - halfSize, y1 - quarterSize, size, halfSize);
            if (useStroke) context.strokeRect(x1 - halfSize, y1 - quarterSize, size, halfSize);
            
            context.beginPath();
            context.moveTo(x1 - halfSize, y1 + halfSize);
            context.lineTo(x1 + halfSize, y1 + halfSize);
            context.moveTo(x1 - halfSize, y1 - halfSize);
            context.lineTo(x1 + halfSize, y1 - halfSize);
            context.moveTo(x1, y1 + halfSize);
            context.lineTo(x1, y1 + quarterSize);
            context.moveTo(x1, y1 - halfSize);
            context.lineTo(x1, y1 - quarterSize);
            
            context.closePath();
            if (useStroke) context.stroke();
            if (useStroke) {
                context.beginPath();
                context.moveTo(x1 - halfSize, y1);
                context.lineTo(x1 + halfSize, y1);
                context.stroke();
            }
        };

        refreshColor();
        refreshSize();
        renderShape();
    },
    getTooltipData: function (originalData, index) {
        var dataRow = {};
        var formatter = {};
        if (InteractiveDataDisplay.Utils.isArray(originalData.x) && index < originalData.x.length) {
            formatter["x"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.x);
            dataRow['x'] = formatter["x"].toString(originalData.x[index]);
        }
        if (originalData.y) {
            dataRow['y'] = {};
            if (InteractiveDataDisplay.Utils.isArray(originalData.y.median) && index < originalData.y.median.length) {
                formatter["median"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.y.median);
                dataRow['y']["median"] = formatter["median"].toString(originalData.y.median[index]);
            }
            if (InteractiveDataDisplay.Utils.isArray(originalData.y.lower95) && index < originalData.y.lower95.length) {
                formatter["lower95"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.y.lower95);
                dataRow['y']["lower 95%"] = formatter["lower95"].toString(originalData.y.lower95[index]);
            }
            if (InteractiveDataDisplay.Utils.isArray(originalData.y.upper95) && index < originalData.y.upper95.length) {
                formatter["upper95"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.y.upper95);
                dataRow['y']["upper 95%"] = formatter["upper95"].toString(originalData.y.upper95[index]);
            }
            if (InteractiveDataDisplay.Utils.isArray(originalData.y.lower68) && index < originalData.y.lower68.length) {
                formatter["lower68"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.y.lower68);
                dataRow['y']["lower 68%"] = formatter["lower68"].toString(originalData.y.lower68[index]);
            }
            if (InteractiveDataDisplay.Utils.isArray(originalData.y.upper68) && index < originalData.y.upper68.length) {
                formatter["upper68"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.y.upper68);
                dataRow['y']["upper 68%"] = formatter["upper68"].toString(originalData.y.upper68[index]);
            }
        }
        if (InteractiveDataDisplay.Utils.isArray(originalData.size) && index < originalData.size.length) {
            formatter["size"] = new InteractiveDataDisplay.AdaptiveFormatter(originalData.size);
            dataRow['size'] = formatter["size"].toString(originalData.size[index]);
        }
        dataRow["index"] = index;
        return dataRow;
    },
    renderSvg: function (plotRect, screenSize, svg, data, t) {
        var n = data.y.length;
        if (n == 0) return;

        var bx_g = svg.group();
        var dataToScreenX = t.dataToScreenX;
        var dataToScreenY = t.dataToScreenY;

        // size of the canvas
        var w_s = screenSize.width;
        var h_s = screenSize.height;
        var xmin = 0, xmax = w_s;
        var ymin = 0, ymax = h_s;

        var x1, y1, u68, l68, u95, l95, mean;
        var i = 0;
        var size = data.size[0];
        var shift = size / 2;
        var color = data.color;
        var border = data.border == null ? 'none' : data.border;
        var thickness = data.thickness;
        for (; i < n; i++) {
            x1 = dataToScreenX(data.x[i]);
            y1 = dataToScreenY(data.y[i]);
            u68 = data.upper68 ? dataToScreenY(data.upper68[i]) : undefined;
            l68 = data.lower68 ? dataToScreenY(data.lower68[i]) : undefined;
            u95 = data.upper95 ? dataToScreenY(data.upper95[i]) : undefined;
            l95 = data.lower95 ? dataToScreenY(data.lower95[i]) : undefined;
            mean = dataToScreenY(data.y[i]);
            c1 = (x1 < 0 || x1 > w_s || y1 < 0 || y1 > h_s);
            if (!c1) {
                if (u95 != undefined && l95 != undefined) {
                    bx_g.polyline([[x1 - shift, u95], [x1 + shift, u95]]).style({ fill: "none", stroke: border, "stroke-width": thickness });
                    bx_g.polyline([[x1, u95], [x1, l95]]).style({ fill: "none", stroke: border, "stroke-width": thickness });
                    //bx_g.polyline([[x1, l68], [x1, l95]]).style({ fill: "none", stroke: border, "stroke-width": thickness });
                    bx_g.polyline([[x1 - shift, l95], [x1 + shift, l95]]).style({ fill: "none", stroke: border, "stroke-width": thickness });
                }
                if (u68 != undefined && l68 != undefined) bx_g.rect(size, Math.abs(u68 - l68)).translate(x1 - shift, u68).fill(color).style({ fill: color, stroke: border, "stroke-width": thickness });
                bx_g.polyline([[x1 - shift, mean], [x1 + shift, mean]]).style({ fill: "none", stroke: border, "stroke-width": thickness });
            }
        }
        bx_g.clipWith(bx_g.rect(w_s, h_s));
    }
};
InteractiveDataDisplay.Bars = {
    prepare: function (data) {
        var n, mask;
        // x
        if (data.orientation == "h") {
            if (data.x == undefined || data.x == null) throw "The mandatory property 'x' is undefined or null";
            if (!InteractiveDataDisplay.Utils.isArray(data.x)) throw "The property 'x' must be an array of numbers";
            n = data.x.length;
            mask = new Int8Array(n);
            InteractiveDataDisplay.Utils.maskNaN(mask, data.x);
            //x
            if (data.y == undefined)
                data.y = InteractiveDataDisplay.Utils.range(0, n - 1);
            else if (!InteractiveDataDisplay.Utils.isArray(data.y)) throw "The property 'x' must be an array of numbers";
            else if (data.y.length != n) throw "Length of the array which is a value of the property 'x' differs from length of 'y'"
            else InteractiveDataDisplay.Utils.maskNaN(mask, data.y);
        }
        else {
            if (data.y == undefined || data.y == null) throw "The mandatory property 'y' is undefined or null";
            if (!InteractiveDataDisplay.Utils.isArray(data.y)) throw "The property 'y' must be an array of numbers";
            n = data.y.length;
            mask = new Int8Array(n);
            InteractiveDataDisplay.Utils.maskNaN(mask, data.y);
            //x
            if (data.x == undefined)
                data.x = InteractiveDataDisplay.Utils.range(0, n - 1);
            else if (!InteractiveDataDisplay.Utils.isArray(data.x)) throw "The property 'x' must be an array of numbers";
            else if (data.x.length != n) throw "Length of the array which is a value of the property 'x' differs from length of 'y'"
            else InteractiveDataDisplay.Utils.maskNaN(mask, data.x);
        }
        //var mask = new Int8Array(n);
        //InteractiveDataDisplay.Utils.maskNaN(mask, data.y);
        ////x
        //if (data.x == undefined)
        //    data.x = InteractiveDataDisplay.Utils.range(0, n - 1);
        //else if (!InteractiveDataDisplay.Utils.isArray(data.x)) throw "The property 'x' must be an array of numbers";
        //else if (data.x.length != n) throw "Length of the array which is a value of the property 'x' differs from length of 'y'"
        //else InteractiveDataDisplay.Utils.maskNaN(mask, data.x);
        // border
        if (data.border == undefined || data.border == "none")
            data.border = null; // no border
        // shadow
        if (data.shadow == undefined || data.shadow == "none")
            data.shadow = null; // no shadow
        if (data.color == undefined) data.color = InteractiveDataDisplay.Markers.defaults.color;
        if (InteractiveDataDisplay.Utils.isArray(data.color)) {
            if (data.color.length != n) throw "Length of the array 'color' is different than length of the array 'y'"
            if (n > 0 && typeof (data.color[0]) !== "string") { // color is a data series                 
                var palette = data.colorPalette;
                if (palette == undefined) palette = InteractiveDataDisplay.Markers.defaults.colorPalette;
                if (typeof palette == 'string') palette = new InteractiveDataDisplay.ColorPalette.parse(palette);
                if (palette != undefined && palette.isNormalized) {
                    var r = InteractiveDataDisplay.Utils.getMinMax(data.color);
                    r = InteractiveDataDisplay.Utils.makeNonEqual(r);
                    palette = palette.absolute(r.min, r.max);
                }
                data.colorPalette = palette;
                var colors = new Array(n);
                for (var i = 0; i < n; i++) {
                    var color = data.color[i];
                    if (color != color) // NaN
                        mask[i] = 1;
                    else {
                        var rgba = palette.getRgba(color);                        
                        colors[i] = "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
                    }
                }
                data.color = colors;
            }
            data.individualColors = true;
        } else data.individualColors = false;

        // Filtering out missing values
        var m = 0;
        for (var i = 0; i < n; i++) if (mask[i] === 1) m++;
        if (m > 0) { // there are missing values
            m = n - m;
            data.x = InteractiveDataDisplay.Utils.applyMask(mask, data.x, m);
            data.y = InteractiveDataDisplay.Utils.applyMask(mask, data.y, m);
            if (data.individualColors)
                data.color = InteractiveDataDisplay.Utils.applyMask(mask, data.color, m);
            var indices = Array(m);
            for (var i = 0, j = 0; i < n; i++) if (mask[i] === 0) indices[j++] = i;
            data.indices = indices;
        } else {
            data.indices = InteractiveDataDisplay.Utils.range(0, n - 1);
        }
    },
    draw: function (marker, plotRect, screenSize, transform, context) {
        var xLeft, xRight, yTop, yBottom, barWidthScreenX, barWidthScreenY;
        if (marker.orientation == "h") {
            xLeft = transform.dataToScreenX(0);
            xRight = transform.dataToScreenX(marker.x);
            if (xLeft > xRight) {
                var k = xRight;
                xRight = xLeft;
                xLeft = k;
            }
            if (xLeft > screenSize.width || xRight < 0) return;
            barWidthScreenY = transform.plotToScreenY(marker.barWidth) - transform.plotToScreenY(0.0);
            yBottom = transform.dataToScreenY(marker.y) - barWidthScreenY / 2.0;
            yTop = transform.dataToScreenY(marker.y) + barWidthScreenY / 2.0;
            if (yTop > screenSize.height || yBottom < 0) return;
        } else {
            barWidthScreenX = transform.plotToScreenX(marker.barWidth) - transform.plotToScreenX(0.0);
            xLeft = transform.dataToScreenX(marker.x) - barWidthScreenX / 2.0;
            xRight = transform.dataToScreenX(marker.x) + barWidthScreenX / 2.0;
            if (xLeft > screenSize.width || xRight < 0) return;
            yBottom = transform.dataToScreenY(0);
            yTop = transform.dataToScreenY(marker.y);
            if (yTop > yBottom) {
                var k = yBottom;
                yBottom = yTop;
                yTop = k;
            }
            if (yTop > screenSize.height || yBottom < 0) return;
        }
        if (marker.shadow) {
            context.fillStyle = marker.shadow;
            context.fillRect(xLeft + 2, yTop + 2, xRight - xLeft, yBottom - yTop);
        }

        context.fillStyle = marker.color;
        context.fillRect(xLeft, yTop, xRight - xLeft, yBottom - yTop);
        if (marker.border) {
            context.strokeStyle = marker.border;
            context.strokeRect(xLeft, yTop, xRight - xLeft, yBottom - yTop);
        }
    },
    getPlotBoundingBox: function (marker, transforms) {
        var xPlot, yPlot, widthPlot, heightPlot;
        var barWidth = marker.barWidth;
        var dataToPlotX = transforms.dataToPlotX;
        var dataToPlotY = transforms.dataToPlotY;

        if(typeof dataToPlotX === 'undefined')
            dataToPlotX = function(x) { return x; };

        if(typeof dataToPlotY === 'undefined')
            dataToPlotY = function(y) { return y; };

        if (marker.orientation == "h") {
            xPlot = dataToPlotX(Math.min(0, marker.x));
            yPlot = dataToPlotY(marker.y) - barWidth / 2;
            widthPlot = dataToPlotX(Math.abs(marker.x));
            heightPlot = barWidth;
        }
        else {
            xPlot = dataToPlotX(marker.x) - barWidth / 2;
            yPlot = dataToPlotY(Math.min(0, marker.y));
            widthPlot = barWidth;
            heightPlot = dataToPlotY(Math.abs(marker.y));
        }

        return {
            x: xPlot,
            y: yPlot,
            width: widthPlot,
            height: heightPlot
        }
    },
    hitTest: function (marker, transform, ps, pd) {
        var barWidth = marker.barWidth;
        var xLeft = marker.orientation == "h"? Math.min(0, marker.x) : marker.x - barWidth / 2;
        var yBottom = marker.orientation == "h" ? marker.y - barWidth / 2 : Math.min(0, marker.y);
        if (marker.orientation == "h") {
            if (pd.x < xLeft || pd.x > xLeft  + Math.abs(marker.x)) return false;
            if (pd.y < yBottom || pd.y > yBottom + barWidth) return false;
            return true;
        }
        if (pd.x < xLeft || pd.x > xLeft + barWidth) return false;
        if (pd.y < yBottom || pd.y > yBottom + Math.abs(marker.y)) return false;
        return true;
    },
    getLegend: function (data, getTitle, legendDiv) {
        var itemDiv = legendDiv.content;
        var fontSize = 14;
        if (document.defaultView && document.defaultView.getComputedStyle) {
            fontSize = parseFloat(document.defaultView.getComputedStyle(itemDiv[0], null).getPropertyValue("font-size"));
        }
        if (isNaN(fontSize) || fontSize == 0) fontSize = 14;

        var canvas = legendDiv.thumbnail;
        var canvasIsVisible = true;
        var size = fontSize * 1.5;
        var x1 = size / 3 - 0.5;
        var x2 = size / 3 * 2;
        var x3 = size;
        var y1 = size / 2;
        var y2 = 0;
        var y3 = size / 3;
        var barWidth = size / 3;
        var shadowSize = 1;

        canvas[0].width = canvas[0].height = size + 2;
        var canvasStyle = canvas[0].style;
        var context = canvas.get(0).getContext("2d");
        var itemIsVisible = 0;

        var color, border, drawBorder, shadow, drawShadow;
        var colorDiv, colorDivStyle, colorControl;
        var colorIsVisible = 0;

        var colorTitle;
        var refreshColor = function () {
            drawBorder = false;
            drawShadow = false;
            if (data.individualColors && data.colorPalette) {
                var clrTitleText = getTitle("color");
                if (colorIsVisible == 0) {
                    colorDiv = $("<div style='width: 170px; margin-top: 5px; margin-bottom: 5px'></div>").appendTo(itemDiv);
                    colorTitle = $("<div class='idd-legend-item-property'></div>").text(clrTitleText).appendTo(colorDiv);
                    colorDivStyle = colorDiv[0].style;
                    var paletteDiv = $("<div style='width: 170px;'></div>").appendTo(colorDiv);
                    colorControl = new InteractiveDataDisplay.ColorPaletteViewer(paletteDiv);
                    colorIsVisible = 2;
                } else {
                    colorTitle.text(clrTitleText);
                }
                colorControl.palette = data.colorPalette;
                if (colorIsVisible == 1) {
                    colorDivStyle.display = "block";
                    colorIsVisible = 2;
                }
            }
            else {
                if (colorIsVisible == 2) {
                    colorDivStyle.display = "none";
                    colorIsVisible = 1;
                }
            }
            if (data.individualColors) {
                border = "#000000";
                color = "#ffffff";
                drawBorder = true;
                shadow = "grey";
                drawShadow = true;
            }
            else {
                color = data.color;
                border = color;
                shadow = "none";
                if (data.border != null) {
                    drawBorder = true;
                    border = data.border;
                }
                if (data.shadow != null) {
                    drawShadow = true;
                    shadow = data.shadow;
                }
            }
        };

        var renderShape = function () {
            var sampleColor = typeof data.color == "string" ? data.color : "lightgray";
            var sampleBorderColor = typeof data.border == "string" ? data.border : "gray";
            var sampleShadowColor = typeof data.shadow == "string" ? data.shadow : "gray";
            var useStroke = sampleBorderColor !== "none";

            context.clearRect(0, 0, size, size);
            if (sampleShadowColor) {
                context.fillStyle = sampleShadowColor;
                context.fillRect(0 + shadowSize, y1 + shadowSize, x1, size - y1);
                x1 += 1;
                context.fillRect(x1 + shadowSize, y2 + shadowSize, x2 - x1, size - y2);
                x2 += 1;
                context.fillRect(x2 + shadowSize, y3 + shadowSize, x3 - x2, size - y3);
            }

            context.strokeStyle = sampleBorderColor !== undefined ? sampleBorderColor : "black";
            context.fillStyle = sampleColor !== undefined ? sampleColor : "black";


            context.fillStyle = sampleColor;
            context.fillRect(0, y1, x1, size - y1);
            context.fillRect(x1, y2, x2 - x1, size - y2);
            context.fillRect(x2, y3, x3 - x2, size - y3);
            if (useStroke) {
                context.strokeStyle = sampleBorderColor;
                context.strokeRect(0, y1, x1, size - y1);
                context.strokeRect(x1, y2, x2 - x1, size - y2);
                context.strokeRect(x2, y3, x3 - x2, size - y3);
            }
        };

        refreshColor();
        renderShape();
    },
    renderSvg: function (plotRect, screenSize, svg, data, t) {
        var n = data.y.length;
        if (n == 0) return;

        var bars_g = svg.group();
        var dataToScreenX = t.dataToScreenX;
        var dataToScreenY = t.dataToScreenY;

        // size of the canvas
        var w_s = screenSize.width;
        var h_s = screenSize.height;
        var xmin = 0, xmax = w_s;
        var ymin = 0, ymax = h_s;

        var xLeft, xRight, yTop, yBottom, color;
        var i = 0;
        var barWidth = data.barWidth;
        var shift = barWidth / 2;
        var border = data.border == null ? 'none' : data.border;
        var shadow = data.shadow == null ? 'none' : data.shadow;
        for (; i < n; i++) {
            if (data.orientation == "h") {
                xLeft = dataToScreenX(0);
                xRight = dataToScreenX(data.x[i]);
                yTop = dataToScreenY(data.y[i] + shift);
                yBottom = dataToScreenY(data.y[i] - shift);
                if (xLeft > xRight) {
                    var k = xRight;
                    xRight = xLeft;
                    xLeft = k;
                }
            } else {
                xLeft = dataToScreenX(data.x[i] - shift);
                xRight = dataToScreenX(data.x[i] + shift);
                yTop = dataToScreenY(data.y[i]);
                yBottom = dataToScreenY(0);
                if (yTop > yBottom) {
                    var k = yBottom;
                    yBottom = yTop;
                    yTop = k;
                }
            }
            color = data.individualColors ? data.color[i] : data.color;
            c1 = (xRight < 0 || xLeft > w_s || yBottom < 0 || yTop > h_s);
            if (!c1) {
                bars_g.polyline([[xLeft + 2, yBottom + 2], [xLeft + 2, yTop + 2], [xRight + 2, yTop + 2], [xRight + 2, yBottom + 2], [xLeft + 2, yBottom + 2]]).fill(shadow);
                bars_g.polyline([[xLeft, yBottom], [xLeft, yTop], [xRight, yTop], [xRight, yBottom], [xLeft, yBottom]]).fill(color).stroke({ width: 1, color: border });
            }
        }
        bars_g.clipWith(bars_g.rect(w_s, h_s));
    },
    buildSvgLegendElements: function (legendSettings, svg, data, getTitle) {
        var thumbnail = svg.group();
        var content = svg.group();
        var fontSize = 12;
        var size = fontSize * 1.5;
        var x1 = size / 3 - 0.5;
        var x2 = size / 3 * 2;
        var x3 = size;
        var y1 = size / 2;
        var y2 = 0;
        var y3 = size / 3;
        var barWidth = size / 3;
        var shadowSize = 1;
        var shadow = 'none';
        //thumbnail
        if (data.individualColors) {
            border = "#000000";
            color = "lightgrey";
            shadow = "grey";
        }
        else {
            color = data.color;
            border = "none";
            if (data.border != null) border = data.border;
            if (data.shadow != null) shadow = data.shadow;
        }

        thumbnail.polyline([[shadowSize, size + shadowSize], [shadowSize, y1 + shadowSize], [x1 + shadowSize, y1 + shadowSize], [x1 + shadowSize, size + shadowSize], [shadowSize, size + shadowSize]]).fill(shadow);
        thumbnail.polyline([[0, size], [0, y1], [x1, y1], [x1, size], [0, size]]).fill(color).stroke({ width: 0.2, color: border });
        x1 += 1;
        thumbnail.polyline([[x1 + shadowSize, size + shadowSize], [x1 + shadowSize, y2 + shadowSize], [x2 + shadowSize, y2 + shadowSize], [x2 + shadowSize, size + shadowSize], [x1 + shadowSize, size + shadowSize]]).fill(shadow);
        thumbnail.polyline([[x1, size], [x1, y2], [x2, y2], [x2, size], [x1, size]]).fill(color).stroke({ width: 0.2, color: border });
        x2 += 1;
        thumbnail.polyline([[x2 + shadowSize, size + shadowSize], [x2 + shadowSize, y3 + shadowSize], [x3 + shadowSize, y3 + shadowSize], [x3 + shadowSize, size + shadowSize], [x2 + shadowSize, size + shadowSize]]).fill(shadow);
        thumbnail.polyline([[x2, size], [x2, y3], [x3, y3], [x3, size], [x2, size]]).fill(color).stroke({ width: 0.2, color: border });
        
        //content
        var isContent = legendSettings.legendDiv.children[1];
        var isColor = data.individualColors && data.colorPalette;
        var style = (isContent && legendSettings.legendDiv.children[1].children[0] && legendSettings.legendDiv.children[1].children[0].children[0]) ? window.getComputedStyle(legendSettings.legendDiv.children[1].children[0].children[0], null) : undefined;
        var fontSize = style ? parseFloat(style.getPropertyValue('font-size')) : undefined;
        var fontFamily = style ? style.getPropertyValue('font-family') : undefined;
        var fontWeight = style ? style.getPropertyValue('font-weight') : undefined;
        if (isColor) {
            var colorText = getTitle("color");
            content.text(colorText).font({ family: fontFamily, size: fontSize, weight: fontWeight });
            var colorPalette_g = svg.group();
            var width = legendSettings.width;
            var height = 20;
            InteractiveDataDisplay.SvgColorPaletteViewer(colorPalette_g, data.colorPalette, legendSettings.legendDiv.children[1].children[0].children[1], { width: width, height: height });
            colorPalette_g.translate(5, 50);
            shiftsizePalette = 50 + height;
            legendSettings.height += (50 + height);
        };
        svg.front();
        return { thumbnail: thumbnail, content: content };
    }
};

InteractiveDataDisplay.Markers.shapes["boxwhisker"] = InteractiveDataDisplay.BoxWhisker;
InteractiveDataDisplay.Markers.shapes["petals"] = InteractiveDataDisplay.Petal;
InteractiveDataDisplay.Markers.shapes["bulleye"] = InteractiveDataDisplay.BullEye;
InteractiveDataDisplay.Markers.shapes["bars"] = InteractiveDataDisplay.Bars;;// Area plot takes data with coordinates named 'x', 'y1', 'y2' and a fill colour named 'fill'. 
InteractiveDataDisplay.Area = function (div, master) {
    var that = this;
    var defaultFill = "rgba(65, 105, 237, 0.4)";    

    // Initialization (#1)
    var initializer = InteractiveDataDisplay.Utils.getDataSourceFunction(div, InteractiveDataDisplay.readCsv);
    var initialData = initializer(div);

    this.base = InteractiveDataDisplay.CanvasPlot;
    this.base(div, master);


    var _x; // an array of horizontal axis coordinates
    var _y1;
    var _y2; // arrays of lower and upper limits of the area
    var _fill = defaultFill;

    // default styles:
    if (initialData) {
        _fill = typeof initialData.fill != "undefined" ? initialData.fill : defaultFill;
    }

    this.draw = function (data) {
        var y1 = data.y1;
        if (!y1) throw "Data series y1 is undefined";
        var n = y1.length;

        var y2 = data.y2;
        if (!y2) throw "Data series y2 is undefined";
        if (y2.length !== n)
            throw "Data series y1 and y2 have different lengths";

        var x = data.x;
        if (!x) {
            x = InteractiveDataDisplay.Utils.range(0, n - 1);
        }
        if (x.length !== n)
            throw "Data series x and y1, y2 have different lengths";

        _y1 = y1;
        _y2 = y2;
        _x = x;

        // styles:
        _fill = typeof data.fill != "undefined" ? data.fill : defaultFill;
        this.invalidateLocalBounds();

        this.requestNextFrameOrUpdate();
        this.fireAppearanceChanged();
    };

    // Returns a rectangle in the plot plane.
    this.computeLocalBounds = function () {
        var dataToPlotX = this.xDataTransform && this.xDataTransform.dataToPlot;
        var dataToPlotY = this.yDataTransform && this.yDataTransform.dataToPlot;

        var y1 = InteractiveDataDisplay.Utils.getBoundingBoxForArrays(_x, _y1, dataToPlotX, dataToPlotY);
        var y2 = InteractiveDataDisplay.Utils.getBoundingBoxForArrays(_x, _y2, dataToPlotX, dataToPlotY);

        return InteractiveDataDisplay.Utils.unionRects(y1, y2);
    };

    // Returns 4 margins in the screen coordinate system
    this.getLocalPadding = function () {
        return { left: 0, right: 0, top: 0, bottom: 0 };
    };

    this.getTooltip = function (xd, yd, px, py) {
        if (_x === undefined || _y1 == undefined || _y2 == undefined)
            return;
        var n = _y1.length;
        if (n == 0) return;

        if (!this.isVisible) return;

        var context = this.getContext(false);
        if (context === undefined) return;
        var t = this.getTransform();
        var ps = { x: t.dataToScreenX(xd), y: t.dataToScreenY(yd) };

        var myImageData = context.getImageData(ps.x - 1, ps.y - 1, 3, 3);
        var zeroPixels = 0;
        for (var k = 0; k < myImageData.data.length; k++) {
            if (myImageData.data[k] === 0) zeroPixels++;
        }
        if (zeroPixels === myImageData.data.length) return undefined;

        var $toolTip = $("<div></div>")
        $("<div></div>").addClass('idd-tooltip-name').text((this.name || "area")).appendTo($toolTip);
        return $toolTip;
    };

    this.renderCore = function (plotRect, screenSize) {
        InteractiveDataDisplay.Area.prototype.renderCore.call(this, plotRect, screenSize);
        var context = this.getContext(true);

        InteractiveDataDisplay.Area.render.call(this, _x, _y1, _y2, _fill, plotRect, screenSize, context);
    };

    this.renderCoreSvg = function (plotRect, screenSize, svg) {
        InteractiveDataDisplay.Area.renderSvg.call(this, plotRect, screenSize, svg, _x, _y1, _y2, _fill);
    }

    // Clipping algorithms
    var code = function (x, y, xmin, xmax, ymin, ymax) {
        return (x < xmin) << 3 | (x > xmax) << 2 | (y < ymin) << 1 | (y > ymax);
    };


    // Others
    this.onDataTransformChanged = function (arg) {
        this.invalidateLocalBounds();
        InteractiveDataDisplay.Area.prototype.onDataTransformChanged.call(this, arg);
    };

    Object.defineProperty(this, "fill", {
        get: function () { return _fill; },
        set: function (value) {
            if (value == _fill) return;
            _fill = value;

            this.fireAppearanceChanged("fill");
            this.requestNextFrameOrUpdate();
        },
        configurable: false
    });    

    this.getLegend = function () {
        var that = this;
        var canvas = $("<canvas></canvas>");
        canvas[0].width = 40;
        canvas[0].height = 40;
        var ctx = canvas.get(0).getContext("2d");
        ctx.globalAlpha = 1;
        ctx.strokeStyle = _fill;
        ctx.fillStyle = _fill;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 10);
        ctx.lineTo(30, 40);
        ctx.lineTo(40, 40);
        ctx.lineTo(40, 30);
        ctx.lineTo(10, 0);
        ctx.lineTo(0, 0);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        var nameDiv = $("<span></span>");
        var setName = function () {
            nameDiv.text(that.name);
        }
        setName();

        this.host.bind("appearanceChanged",
            function (event, propertyName) {
                if (!propertyName || propertyName == "name")
                    setName();

                ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
                ctx.strokeStyle = _fill;
                ctx.fillStyle = _fill;

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, 10);
                ctx.lineTo(30, 40);
                ctx.lineTo(40, 40);
                ctx.lineTo(40, 30);
                ctx.lineTo(10, 0);
                ctx.lineTo(0, 0);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            });

        var that = this;

        var onLegendRemove = function () {
            that.host.unbind("appearanceChanged");

            //div[0].innerHTML = "";
            //div.removeClass("idd-legend-item");
        };

        //return { div: div, onLegendRemove: onLegendRemove };
        return { name: nameDiv, legend: { thumbnail: canvas, content: undefined }, onLegendRemove: onLegendRemove };
    };

    this.buildSvgLegend = function (legendSettings, svg) {
        var that = this;
        legendSettings.height = 30;
        svg.add(svg.rect(legendSettings.width, legendSettings.height).fill("white").opacity(0.5));
        var fillRgba = InteractiveDataDisplay.ColorPalette.colorFromString(_fill)
        var fillColor = 'rgb('+fillRgba.r+','+fillRgba.g+','+fillRgba.b+')'
        svg.add(svg.polyline([[0, 0], [0, 4.5], [13.5, 18], [18, 18], [18, 13.5], [4.5, 0], [0, 0]]).fill(fillColor).opacity(fillRgba.a).translate(5, 5));
        var style = window.getComputedStyle(legendSettings.legendDiv.children[0].children[1], null);
        var fontSize = parseFloat(style.getPropertyValue('font-size'));
        var fontFamily = style.getPropertyValue('font-family');
        var fontWeight = style ? style.getPropertyValue('font-weight') : undefined;
        svg.add(svg.text(that.name).font({ family: fontFamily, size: fontSize, weight: fontWeight }).translate(40, 0));
        svg.front();
    }

    // Initialization 
    if (initialData && initialData.x && initialData.y1 && initialData.y2)
        this.draw(initialData);

}
InteractiveDataDisplay.Area.prototype = new InteractiveDataDisplay.CanvasPlot;
InteractiveDataDisplay.Area.render = function (_x, _y1, _y2, _fill, plotRect, screenSize, context) {
    if (_x === undefined || _y1 == undefined || _y2 == undefined)
        return;
    var n = _y1.length;
    if (n == 0) return;

    var t = this.getTransform();
    var dataToScreenX = t.dataToScreenX;
    var dataToScreenY = t.dataToScreenY;

    // size of the canvas    

    context.fillStyle = _fill;

    //Drawing polygons
    var polygons = [];
    var curInd = undefined;
    for (var i = 0; i < n; i++) {
        if (isNaN(_x[i]) || isNaN(_y1[i]) || isNaN(_y2[i])) {
            if (curInd === undefined) {
                curInd = i;
            }
            else {
                polygons.push([curInd, i]);
                curInd = undefined;
            }
        } else {
            if (curInd === undefined) {
                curInd = i;
            }
            else {
                if (i === n - 1) {
                    polygons.push([curInd, i]);
                    curInd = undefined;
                }
            }
        }
    }

    var nPoly = polygons.length;
    for (var i = 0; i < nPoly; i++) {
        context.beginPath();
        var curPoly = polygons[i];
        context.moveTo(dataToScreenX(_x[curPoly[0]]), dataToScreenY(_y1[curPoly[0]]));
        for (var j = curPoly[0] + 1; j <= curPoly[1]; j++) {
            context.lineTo(dataToScreenX(_x[j]), dataToScreenY(_y1[j]));
        }
        for (var j = curPoly[1]; j >= curPoly[0]; j--) {
            context.lineTo(dataToScreenX(_x[j]), dataToScreenY(_y2[j]));
        }
        context.fill();
    }
};
InteractiveDataDisplay.Area.renderSvg = function (plotRect, screenSize, svg, _x, _y1, _y2, _fill) {
    if (_x === undefined || _y1 == undefined || _y2 == undefined) return;
    var n = _y1.length;
    if (n == 0) return;
    
    var t = this.getTransform();
    var dataToScreenX = t.dataToScreenX;
    var dataToScreenY = t.dataToScreenY;
    var area_g = svg.group();
    // size of the canvas
    var w_s = screenSize.width;
    var h_s = screenSize.height;
    var xmin = 0, xmax = w_s;
    var ymin = 0, ymax = h_s;

    var polygons = [];
    var curInd = undefined;
    for (var i = 0; i < n; i++) {
        if (isNaN(_x[i]) || isNaN(_y1[i]) || isNaN(_y2[i])) {
            if (curInd !== undefined) {
                polygons.push([curInd, i - 1]);
                curInd = undefined;
            }
        } else {
            if (curInd === undefined) {
                curInd = i;
            }
            else {
                if (i === n - 1) {
                    polygons.push([curInd, i]);
                    curInd = undefined;
                }
            }
        }
    }
    var segment = [];
    var nPoly = polygons.length;
    
    var fillRgba = InteractiveDataDisplay.ColorPalette.colorFromString(_fill)
    var fillColor = 'rgb('+fillRgba.r+','+fillRgba.g+','+fillRgba.b+')'
    
    for (var i = 0; i < nPoly; i++) {
        var curPoly = polygons[i];
        segment = [];
        segment.push([dataToScreenX(_x[curPoly[0]]), dataToScreenY(_y1[curPoly[0]])]);
        for (var j = curPoly[0] + 1; j <= curPoly[1]; j++) {
            segment.push([dataToScreenX(_x[j]), dataToScreenY(_y1[j])]);
        }
        for (var j = curPoly[1]; j >= curPoly[0]; j--) {
            segment.push([dataToScreenX(_x[j]), dataToScreenY(_y2[j])]);
        }
        segment.push([dataToScreenX(_x[curPoly[0]]), dataToScreenY(_y1[curPoly[0]])]);        
        area_g.polyline(segment).fill(fillColor).opacity(fillRgba.a);
    }
    area_g.clipWith(area_g.rect(w_s, h_s));
};// See http://jsperf.com/rendering-a-frame-in-image-data
InteractiveDataDisplay.heatmapBackgroundRenderer = undefined;

// Renders a fuction  f(x,y) on a regular grid (x,y) as a heat map using color palette
InteractiveDataDisplay.Heatmap = function (div, master) {

    // Initialization (#1)
    var initializer = InteractiveDataDisplay.Utils.getDataSourceFunction(div, InteractiveDataDisplay.readCsv2d);
    var initialData = initializer(div);
    if (initialData && typeof initialData.y !== 'undefined' && typeof initialData.values !== 'undefined') {
        var y = initialData.y;
        var f = initialData.values;
        var n = y.length;
        var m = f.length;
        if (n > 1 && m > 0 && y[0] > y[1]) {
            y.reverse();
            for (var i = 0; i < n; i++)
                f[i].reverse();
        }
    }

    this.base = InteractiveDataDisplay.CanvasPlot;
    this.base(div, master);
    if (!div) return;
    //create heatmap background renderer
    if (InteractiveDataDisplay.heatmapBackgroundRenderer == undefined) InteractiveDataDisplay.heatmapBackgroundRenderer = new InteractiveDataDisplay.SharedRenderWorker(
        function () {
            var workerCodeUri;
            if (typeof InteractiveDataDisplay.heatmapBackgroundRendererCodeBase64 === 'undefined' || /PhantomJS/.test(window.navigator.userAgent) || InteractiveDataDisplay.Utils.getIEVersion() > 0) {
                //Blob doesn't work in IE10 and IE11
                // Build process usually initializes the heatmapBackgroundRendererCodeBase64 with base64 encoded 
                // concatenation of idd.heatmapworker.js and idd.transforms.js.
                workerCodeUri = InteractiveDataDisplay.HeatmapworkerPath ? InteractiveDataDisplay.HeatmapworkerPath + "idd.heatmapworker.js" : "idd.heatmapworker.js";
            }
            else {
                var workerBlob = new Blob([window.atob(InteractiveDataDisplay.heatmapBackgroundRendererCodeBase64)], { type: 'text/javascript' });
                workerCodeUri = window.URL.createObjectURL(workerBlob);
            }
            return workerCodeUri
        }(),
        function (heatmapPlot, completedTask) {
            heatmapPlot.onRenderTaskCompleted(completedTask);
        });
    // default styles:
    var loadPalette = function (palette) {
        if (palette) {
            try {
                if (typeof palette == 'string')
                    _palette = InteractiveDataDisplay.ColorPalette.parse(palette);
                else
                    _palette = palette;
                _paletteColors = InteractiveDataDisplay.ColorPalette.toArray(_palette, 512);
            } catch (exc) {
                if (window.console) console.error("Failed to initialize the palette");
            }
        }
    };
    var loadOpacity = function (opacity) {
        _opacity = Math.min(1.0, Math.max(0.0, opacity));
    };

    var _innerCanvas = document.createElement("canvas");
    var _imageData;
    var _y;
    var _x;

    // _f contains values that are mapped to colors.
    // _log_f is log10(_f) and it is used only if options.logColors is enabled instead of _f for color mapping.
    // _f or _logf is passed to the heatmap render.
    // _fmin/_fmax (and corresponding log-versions) are min/max for _f (_log_f) and are used EXCLUSIVELY for palette range.
    // Log range are computed with respect to _logTolerance (taken from option.logTolerance).
    // _log_f is passed to rendered only.
    // _f is passed to renderer and to build tooltip value.
    var _f, _f_u68, _f_l68, _f_median, _fmin, _fmax;
    var _logColors, _logTolerance;
    var _log_f, _log_fmin, _log_fmax;


    var _opacity; // 1 is opaque, 0 is transparent
    var _mode; // gradient or matrix
    var _palette;
    var _dataChanged;
    var _paletteColors;

    // Uncertainty interval
    var _interval;
    var _originalInterval;
    var _heatmap_nav;

    var _formatter_f, _formatter_f_median, _formatter_f_l68, _formatter_f_u68, _formatter_interval;

    loadOpacity((initialData && typeof (initialData.opacity) != 'undefined') ? parseFloat(initialData.opacity) : 1.0);
    loadPalette((initialData && typeof (initialData.colorPalette) != 'undefined') ? initialData.colorPalette : InteractiveDataDisplay.palettes.grayscale);

    var findFminmax = function (f) {
        var n = f.length;
        if (n < 1) return;
        var m = f[0].length;
        if (m < 1) return;
        var fmin, fmax;
        fmin = fmax = f[0][0];
        for (var i = 0; i < n; i++) {
            var fi = f[i];
            for (var j = 0; j < m; j++) {
                var v = fi[j];
                if (v == v) {
                    if (v > fmax || isNaN(fmax)) fmax = v;
                    if (v < fmin || isNaN(fmin)) fmin = v;
                }
            }
        }
        return { min: fmin, max: fmax };
    };

    var lastCompletedTask;
    var that = this;

    //from chart viewer
    var makeHeatmapData = function(x, y, z, isDiscrete) {
        if (!x || !y || !z) return {};
        if (!x.length || !y.length || (z.v && !z.v.length) || (z.m && (!z.m.length || !z.lb68.length || !z.ub68.length))) return {};

        // Convert to Array.
        x = Array.prototype.slice.call(x);
        y = Array.prototype.slice.call(y);

        if (z.v) {
            z.v = Array.prototype.slice.call(z.v);
        } else if (z.m) {
            z.m = Array.prototype.slice.call(z.m);
            z.lb68 = Array.prototype.slice.call(z.lb68);
            z.ub68 = Array.prototype.slice.call(z.ub68);
        }

        // All arrays must have the same length.
        if (z.v && (x.length !== y.length || x.length !== z.v.length || y.length !== z.v.length)) {
            x.length = y.length = z.v.length = Math.min(x.length, y.length, z.v.length);
        } else if (z.m && (x.length !== y.length || x.length !== z.m.length || y.length !== z.m.length || z.m.length !== z.lb68.length || z.m.length !== z.ub68.length)) {
            x.length = y.length = z.m.length = z.lb68.length = z.ub68.length = Math.min(x.length, y.length, z.m.length, z.lb68.length, z.ub68.length);
        }

        // Remember indices in unsorted arrays.
        var ix = x.map(function (a, i) { return { v: a, i: i }; });
        var iy = y.map(function (a, i) { return { v: a, i: i }; });

        // Get sorted arrays.
        var sx = ix.sort(function (a, b) { return a.v < b.v ? -1 : a.v > b.v ? 1 : 0; });
        var sy = iy.sort(function (a, b) { return a.v < b.v ? -1 : a.v > b.v ? 1 : 0; });

        // Get unique sorted arrays of grid dimensions.
        var ux = sx.filter(function (a, i) { return !i || a.v != sx[i - 1].v; }).map(function (a) { return a.v; });
        var uy = sy.filter(function (a, i) { return !i || a.v != sy[i - 1].v; }).map(function (a) { return a.v; });

        // Using initial indices get arrays of grid indices for dimensions.
        var i, j, ifx = [], ify = [];
        i = 0; sx.forEach(function (a, k) { return ifx[a.i] = !k ? 0 : a.v != sx[k - 1].v ? ++i : i; });
        i = 0; sy.forEach(function (a, k) { return ify[a.i] = !k ? 0 : a.v != sy[k - 1].v ? ++i : i; });

        var f, m, lb68, ub68;

        // Initializes 2d array with NaNs.
        var initNaNs = function (d1, d2) {
            var a = [];
            for (var i = 0; i < d1; ++i) {
                a[i] = [];
                for (var j = 0; j < d2; ++j) {
                    a[i][j] = NaN;
                }
            }
            return a;
        }

        if (z.v) {
            f = initNaNs(ux.length, uy.length);

            for (i = 0; i < z.v.length; ++i) {
                f[ifx[i]][ify[i]] = z.v[i];
            }
        } else {
            m = initNaNs(ux.length, uy.length);
            lb68 = initNaNs(ux.length, uy.length);
            ub68 = initNaNs(ux.length, uy.length);

            for (i = 0; i < z.m.length; ++i) {
                m[ifx[i]][ify[i]] = z.m[i];
                lb68[ifx[i]][ify[i]] = z.lb68[i];
                ub68[ifx[i]][ify[i]] = z.ub68[i];
            }
        }


        if (isDiscrete) {
            if (ux.length >= 2) {
                var newx = [];
                newx.push(ux[0] - (ux[1] - ux[0]) / 2);
                var m;
                for (m = 1; m < ux.length; m++) {
                    newx.push(ux[m] - (ux[m] - ux[m - 1]) / 2);
                }
                newx.push(ux[ux.length - 1] + (ux[ux.length - 1] - ux[ux.length - 2]) / 2);
                ux = newx;
            }

            if (uy.length >= 2) {
                var newy = [];
                newy.push(uy[0] - (uy[1] - uy[0]) / 2);
                var k;
                for (k = 1; k < uy.length; k++) {
                    newy.push(uy[k] - (uy[k] - uy[k - 1]) / 2);
                }
                newy.push(uy[uy.length - 1] + (uy[uy.length - 1] - uy[uy.length - 2]) / 2);
                uy = newy;
            }
        }


        return {
            x: ux,
            y: uy,
            values: f,
            m: m,
            l68: lb68,
            u68: ub68
        };
    };

    var computePaletteMinMax = function() {
        var minmax = findFminmax(_f);
        _fmin = minmax.min;
        _fmax = minmax.max;

        if(_logColors){      
            _fmin = Math.max(_fmin, _logTolerance);
            _fmax = Math.max(_fmax, _logTolerance);
            // Palette range is in "plot coordinates", i.e. log10 of range.
            _log_fmin = InteractiveDataDisplay.Utils.log10(_fmin);
            _log_fmax = InteractiveDataDisplay.Utils.log10(_fmax);
        }
    }

    this.onRenderTaskCompleted = function (completedTask) {
        lastCompletedTask = completedTask;
        if (_innerCanvas.width !== lastCompletedTask.width || _innerCanvas.height !== lastCompletedTask.height) {
            _innerCanvas.width = lastCompletedTask.width;
            _innerCanvas.height = lastCompletedTask.height;
        }
        var context = _innerCanvas.getContext("2d");
        context.putImageData(lastCompletedTask.image, 0, 0);

        //console.log("Complete render " + this.name);

        that.requestNextFrame();
    };
    this.draw = function (data, titles) {
        var f = data.values;
        if (!f) throw "Data series f is undefined";
        var isOneDimensional = 
            f["median"] !== undefined && !InteractiveDataDisplay.Utils.isArray(f["median"][0])
            || !InteractiveDataDisplay.Utils.isArray(f[0]);
        var x = data.x;
        var y = data.y;
        if (_originalInterval == undefined && _interval == undefined) _originalInterval = data.interval;
        _interval = data.interval;


        _logColors = data.logPalette !== undefined && data.logPalette;
        _logTolerance = data.logTolerance ? data.logTolerance : 1e-12;

        if (f["median"]) { //uncertain data
            if (_heatmap_nav == undefined) {
                var div = $("<div></div>")
                    .attr("data-idd-name", "heatmap__nav_")
                    .appendTo(this.host);
                _heatmap_nav = new InteractiveDataDisplay.Heatmap(div, this.master);
                _heatmap_nav.getLegend = function () {
                    return undefined;
                };
                this.addChild(_heatmap_nav);
                _heatmap_nav.getTooltip = function (xd, yd, xp, yp) {
                    return undefined;
                }
            }
            if (isOneDimensional) {
                var r = makeHeatmapData(x, y, {
                    v: undefined,
                    m: f.median,
                    lb68: f.lower68,
                    ub68: f.upper68
                }, data.treatAs === 'discrete');
                _x = r.x;
                _y = r.y;
                _f = r.m;
                _f_median = r.m;
                _f_l68 = r.l68;
                _f_u68 = r.u68;

                _heatmap_nav.x = r.x;
                _heatmap_nav.y = r.y;
                _heatmap_nav.f_median = r.m;
                _heatmap_nav.f_l68 = r.l68;
                _heatmap_nav.f_u68 = r.u68;
            } else {
                _x = x;
                _y = y;
                _f = f.median;
                _f_median = f.median;
                _f_l68 = f.lower68;
                _f_u68 = f.upper68;

                _heatmap_nav.x = r.x;
                _heatmap_nav.y = r.y;
                _heatmap_nav.f_median = f.median68;
                _heatmap_nav.f_l68 = f.lower68;
                _heatmap_nav.f_u68 = f.upper68;
            }
            if (_interval) {
                updateInterval();
            }
        } else {
            if (_heatmap_nav) {
                _heatmap_nav.remove();
            }
            _heatmap_nav = undefined;
            if (isOneDimensional) {
                var r = makeHeatmapData(x, y, {
                    v: f
                }, data.treatAs === 'discrete');
                _x = r.x;
                _y = r.y;
                _f = r.values;
            } else {
                _f = f;
                _x = x;
                _y = y;
            }
        }

        // Logarithmic colors: builds log10(_f) to be rendered, so the color palette
        // is logarithmic.
        if(_logColors){
            _log_f = new Array(_f.length);
            for(var i = 0; i < _f.length; i++)
            {
                var row = _f[i];
                var logRow = _log_f[i] = new Float32Array(row.length);
                for(var j = 0; j < row.length; j++)
                {
                    logRow[j] = InteractiveDataDisplay.Utils.log10(row[j]);
                }
            }
        }

        _formatter_f = undefined;
        _formatter_f_median = undefined;
        _formatter_f_l68 = undefined;
        _formatter_f_u68 = undefined;

        var n = _f_median ? _f_median.length : _f.length;
        var m = _f_median ? _f_median[0].length : _f[0].length;
        if (!_x) {
            _x = InteractiveDataDisplay.Utils.range(0, n);
        } else {
            if (_x.length != n && _x.length != n + 1) throw "Data series x must have length equal or one more than length of data series f by first dimension";
        }
        if (!_y) {
             _y = InteractiveDataDisplay.Utils.range(0, m);
         } else {
             if (_y.length != m && _y.length != m + 1) throw "Data series y must have length equal or one more than length of data series f by second dimension";
         }

        if (_x.length == n) {
            if (_y.length != m) throw "Data series y must have length equal to length of data series f by second dimension";
            _mode = 'gradient';
        } else {
            if (_y.length != m + 1) throw "Data series y must have length equal to one more than length of data series f by second dimension";
            _mode = 'matrix';
        }

        if (_x.length < 2) throw "Data series x must have at least 2 elements by each dimension";
        if (_y.length < 2) throw "Data series y must have at least 2 elements by each dimension";

        // styles:
        if (data && typeof (data.opacity) != 'undefined') {
            loadOpacity(parseFloat(data.opacity));
        }
        if (data && typeof (data.colorPalette) != 'undefined')
            loadPalette(data.colorPalette);

        if (_palette.isNormalized) {
            computePaletteMinMax();
        }
        _dataChanged = true;
        var prevBB = this.invalidateLocalBounds();
        var bb = this.getLocalBounds();

        if (InteractiveDataDisplay.Utils.equalRect(prevBB, bb))
            this.requestNextFrame();
        else
            this.requestNextFrameOrUpdate();
        this.setTitles(titles, true);
        this.fireAppearanceChanged();
    };

    // Returns a rectangle in the plot plane.
    this.computeLocalBounds = function () {
        var _bbox;
        if (_x && _y) { // todo: fix for matrix mode
            var xmin, xmax, ymin, ymax;
            var n = _x.length;
            var m = _y.length;
            var i;
            for (i = 0; i < n; i++) {
                xmin = _x[i];
                if (xmin == xmin) break;
            }
            for (i = n; --i >= 0;) {
                xmax = _x[i];
                if (xmax == xmax) break;
            }
            for (i = 0; i < m; i++) {
                ymin = _y[i];
                if (ymin == ymin) break;
            }
            for (i = m; --i >= 0;) {
                ymax = _y[i];
                if (ymax == ymax) break;
            }

            var dataToPlotX = this.xDataTransform && this.xDataTransform.dataToPlot;
            var dataToPlotY = this.yDataTransform && this.yDataTransform.dataToPlot;
            if (dataToPlotX) {
                xmin = dataToPlotX(xmin);
                xmax = dataToPlotX(xmax);
            }
            if (dataToPlotY) {
                ymin = dataToPlotY(ymin);
                ymax = dataToPlotY(ymax);
            }
            _bbox = { x: Math.min(xmin, xmax), y: Math.min(ymin, ymax), width: Math.abs(xmax - xmin), height: Math.abs(ymax - ymin) };
        }
        return _bbox;
    };

    if (typeof (Modernizr) != 'undefined') {
        if (div && (!Modernizr.webworkers || !Modernizr.postmessage)) {
            var parent = div[0].parentElement;
            if (parent) {
                var hasText = false;
                for (var i = 0; i < parent.childNodes.length; i++) {
                    if ($(parent.childNodes[i]).hasClass("nowebworkers")) {
                        hasText = true;
                        break;
                    }
                }
                div[0].removeAttribute("data-idd-plot");
                div[0].innerText = "";
                if (!hasText) {
                    div[0].innerText = ' Heatmap cannot be rendered: browser does not support web workers.';
                    div.addClass("nowebworkers");
                }
                else div[0].innerText = "";
            }
            return;
        }
    }

    //Theess objects are used for renderfing on the map
    var polygon = undefined;
    var polygon2 = undefined;

    // Updates output of this plot using the current coordinate transform and screen size.
    // plotRect     {x,y,width,height}  Rectangle in the plot plane which is visible, (x,y) is left/bottom of the rectangle
    // screenSize   {width,height}      Size of the output region to render inside
    // Returns true, if the plot actually has rendered something; otherwise, returns false.
    this.renderCore = function (plotRect, screenSize) {
        InteractiveDataDisplay.Heatmap.prototype.renderCore.call(this, plotRect, screenSize);
        var context = this.getContext(true);
        if (_x == undefined || _y == undefined || _f == undefined)
            return;

        var ct = this.coordinateTransform;
        var plotToScreenX = ct.plotToScreenX;
        var plotToScreenY = ct.plotToScreenY;

        var bb = this.getLocalBounds();
        // this is a rectangle which we should fill:
        var visibleRect = InteractiveDataDisplay.Utils.intersect(bb, plotRect);
        if (!visibleRect) return;

        var drawBasic = true;

        if (master.mapControl !== undefined) {

            var left = bb.x;
            var middle = bb.x + bb.width / 2;
            var right = bb.x + bb.width;

            if (polygon === undefined) {
                var backColor = 120;
                var options = {
                    fillColor: new Microsoft.Maps.Color(backColor, backColor, backColor, backColor),
                    strokeColor: new Microsoft.Maps.Color(backColor, backColor, backColor, backColor),
                    strokeThickness: 0
                };

                polygon = new Microsoft.Maps.Polygon([
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y), left),
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y), middle),
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y + bb.height), middle),
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y + bb.height), left),
                ], options);

                polygon2 = new Microsoft.Maps.Polygon([
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y), middle),
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y), right),
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y + bb.height), right),
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y + bb.height), middle),
                ], options);

                master.mapControl.entities.push(polygon);
                master.mapControl.entities.push(polygon2);
            }

            if (_dataChanged) {
                polygon.setLocations([
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y), left),
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y), middle),
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y + bb.height), middle),
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y + bb.height), left),
                ]);

                polygon2.setLocations([
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y), middle),
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y), right),
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y + bb.height), right),
                    new Microsoft.Maps.Location(InteractiveDataDisplay.mercatorTransform.plotToData(bb.y + bb.height), middle),
                ]);
            }

            drawBasic = !master.isInAnimation;
            polygon.setOptions({ visible: master.isInAnimation });
            polygon2.setOptions({ visible: master.isInAnimation });
        }

        if (drawBasic) {
            var visibleRect_s = {
                left: Math.floor(plotToScreenX(visibleRect.x)),
                width: Math.ceil(ct.plotToScreenWidth(visibleRect.width)),
                top: Math.floor(plotToScreenY(visibleRect.y + visibleRect.height)),
                height: Math.ceil(ct.plotToScreenHeight(visibleRect.height))
            };

            var scale = ct.getScale();
            var offset = ct.getOffset();

            // rendering a placeholder to indicate that here will be real heatmap
            context.fillStyle = 'rgba(200,200,200,0.3)';
            context.fillRect(visibleRect_s.left, visibleRect_s.top, visibleRect_s.width, visibleRect_s.height);

            if (lastCompletedTask) {
                var taskRect = InteractiveDataDisplay.Utils.intersect(lastCompletedTask.plotRect, plotRect);
                // todo: draw bb here
                if (taskRect) {
                    var left_s = plotToScreenX(lastCompletedTask.plotRect.x);
                    var top_s = plotToScreenY(lastCompletedTask.plotRect.y + lastCompletedTask.plotRect.height);
                    var alpha;

                    if (_opacity != 1) {
                        alpha = context.globalAlpha;
                        context.globalAlpha = _opacity;
                    }
                    if (scale.x != lastCompletedTask.scaleX || scale.y != lastCompletedTask.scaleY) {
                        var sx = scale.x / lastCompletedTask.scaleX;
                        var sy = scale.y / lastCompletedTask.scaleY;
                        context.drawImage(_innerCanvas, 0, 0, lastCompletedTask.image.width, lastCompletedTask.image.height,
                            left_s, top_s, sx * lastCompletedTask.image.width, sy * lastCompletedTask.image.height);
                    } else {
                        context.drawImage(_innerCanvas, left_s, top_s);
                    }
                    if (_opacity != 1) {
                        context.globalAlpha = alpha;
                    }
                }
            }

            if (_dataChanged ||
                !this.master.isInAnimation &&
                (!lastCompletedTask || lastCompletedTask.scaleX != scale.x || lastCompletedTask.scaleY != scale.y || !InteractiveDataDisplay.Utils.includes(lastCompletedTask.plotRect, visibleRect))) {

                if (!_imageData || _imageData.width !== visibleRect_s.width || _imageData.height !== visibleRect_s.height) {
                    // avoiding creating new image data, 
                    // it is possible to reuse the image data since web worker marshalling makes a copy of it
                    _imageData = context.createImageData(visibleRect_s.width, visibleRect_s.height);
                }

                var task = {
                    image: _imageData,
                    width: _imageData.width,
                    height: _imageData.height,
                    x: _x,
                    y: _y,
                    f: _logColors ? _log_f : _f,
                    fmin: _logColors ? _log_fmin : _fmin,
                    fmax: _logColors ? _log_fmax : _fmax,
                    plotRect: visibleRect,
                    scaleX: scale.x,
                    scaleY: scale.y,
                    offsetX: offset.x - visibleRect_s.left,
                    offsetY: offset.y - visibleRect_s.top,
                    palette: {
                        isNormalized: _palette.isNormalized,
                        range: _palette.range,
                        points: _palette.points,
                        colors: _paletteColors
                    },
                    xDataTransform: this.xDataTransform && this.xDataTransform.type,
                    yDataTransform: this.yDataTransform && this.yDataTransform.type
                };

                //console.log("Heatmap " + this.name + " enqueues a task (isInAnimation: " + this.master.isInAnimation + ")");
                InteractiveDataDisplay.heatmapBackgroundRenderer.enqueue(task, this);
                _dataChanged = false;
            }
            //}
        }
    };
    this.renderCoreSvg = function (plotRect, screenSize, svg) {
        var imageData_g = svg.group();
        if (_x == undefined || _y == undefined || _f == undefined)
            return;
        var w_s = screenSize.width;
        var h_s = screenSize.height;
        var ct = this.coordinateTransform;
        var plotToScreenX = ct.plotToScreenX;
        var plotToScreenY = ct.plotToScreenY;
        var bb = this.getLocalBounds();
        // this is a rectangle which we should fill:
        var visibleRect = InteractiveDataDisplay.Utils.intersect(bb, plotRect);
        if (!visibleRect) return;

        var visibleRect_s = {
            left: Math.floor(plotToScreenX(visibleRect.x)),
            width: Math.ceil(ct.plotToScreenWidth(visibleRect.width)),
            top: Math.floor(plotToScreenY(visibleRect.y + visibleRect.height)),
            height: Math.ceil(ct.plotToScreenHeight(visibleRect.height))
        };
        var image = _innerCanvas.toDataURL("image/png");
        var svgimage = imageData_g.image(image, _imageData.width, _imageData.height).opacity(_opacity);
        svgimage.clipWith(imageData_g.rect(visibleRect_s.width, visibleRect_s.height));
        imageData_g.translate(visibleRect_s.left, visibleRect_s.top);
    }
    this.onIsRenderedChanged = function () {
        if (!this.isRendered) {
            InteractiveDataDisplay.heatmapBackgroundRenderer.cancelPending(this);
        }
    };

    // Others
    this.onDataTransformChanged = function (arg) {
        this.invalidateLocalBounds();
        InteractiveDataDisplay.Heatmap.prototype.onDataTransformChanged.call(this, arg);
    };


    var getCellContaining = function (x_d, y_d) {
        var n = _x.length;
        var m = _y.length;
        if (n == 0 || m == 0) return;

        if (x_d < _x[0] || y_d < _y[0] ||
            x_d > _x[n - 1] || y_d > _y[m - 1]) return;

        var i;
        for (i = 1; i < n; i++) {
            if (x_d <= _x[i]) {
                if (isNaN(_x[i - 1])) return NaN;
                break;
            }
        }

        var j;
        for (j = 1; j < m; j++) {
            if (y_d <= _y[j]) {
                if (isNaN(_y[j - 1])) return NaN;
                break;
            }
        }
        if (i >= n || j >= m) return NaN;
        return { iLeft: i - 1, jBottom: j - 1 };
    };

    /// Gets the value (probably, interpolated) for the heatmap
    /// in the point (xd,yd) in data coordinates.
    /// Depends on the heatmap mode.
    /// Returns null, if the point is outside of the plot.
    this.getValue = function (xd, yd, array) {
        var n = _x.length;
        var m = _y.length;
        if (n == 0 || m == 0) return null;

        var cell = getCellContaining(xd, yd);
        if (cell == undefined) return null;
        if (cell != cell) return "<div>" + (this.name || "heatmap") + ": (unknown value)</div>";

        var value;
        if (_mode === "gradient") {
            var flb, flt, frt, frb;
            flt = array[cell.iLeft][cell.jBottom + 1];
            flb = array[cell.iLeft][cell.jBottom];
            frt = array[cell.iLeft + 1][cell.jBottom + 1];
            frb = array[cell.iLeft + 1][cell.jBottom];

            if (isNaN(flt) || isNaN(flb) || isNaN(frt) || isNaN(frb)) {
                value = NaN;
            } else {
                var y0 = _y[cell.jBottom];
                var y1 = _y[cell.jBottom + 1];
                var kyLeft = (flt - flb) / (y1 - y0);
                var kyRight = (frt - frb) / (y1 - y0);
                var fleft = kyLeft * (yd - y0) + flb;
                var fright = kyRight * (yd - y0) + frb;
                var x0 = _x[cell.iLeft];
                var x1 = _x[cell.iLeft + 1];
                var kx = (fright - fleft) / (x1 - x0);
                value = kx * (xd - x0) + fleft;
            }
        } else {
            value = array[cell.iLeft][cell.jBottom];
        }
        return value;
    };
    var updateInterval = function () {
        var fmedian = _heatmap_nav.f_median;
        var shadeData = new Array(fmedian.length);
        for (var i = 0; i < fmedian.length; i++) {
            var fmedian_i = fmedian[i];
            shadeData[i] = new Array(fmedian_i.length);
            for (var j = 0; j < fmedian_i.length; j++) {
                shadeData[i][j] = (_heatmap_nav.f_l68[i][j] < _interval.max && _heatmap_nav.f_u68[i][j] > _interval.min) ? 0 : 1;
            }
        }
        _heatmap_nav.draw({ x: _heatmap_nav.x, y: _heatmap_nav.y, values: shadeData, opacity: 0.5, colorPalette: InteractiveDataDisplay.ColorPalette.parse("0=#00000000=#00000080=1") });
        _heatmap_nav.isVisible = true;
    };
    this.getTooltip = function (xd, yd, xp, yp, changeInterval) {
        if (_f === undefined)
            return;
        var that = this;

        if (!this.isVisible || this.IsErrorVisible) return;

        var pinCoord = { x: xd, y: yd };
        if (_f_u68 === undefined || _f_l68 === undefined || _f_median === undefined) {
            var fminmax = findFminmax(_f);
            _formatter_f = InteractiveDataDisplay.AdaptiveFormatter(fminmax.min, fminmax.max);
            var $toolTip = $("<div></div>");
            $("<div></div>").addClass('idd-tooltip-name').text((this.name || "heatmap")).appendTo($toolTip);
            var value = this.getValue(pinCoord.x, pinCoord.y, _f, _mode);
            if (value == null) return;
            var propTitle = this.getTitle("values");
            $("<div>" + propTitle + ": " + _formatter_f.toString(value) + "</div>").appendTo($toolTip);
            return $toolTip;
        } else {
            var fminmax = findFminmax(_f_median);
            _formatter_f_median = InteractiveDataDisplay.AdaptiveFormatter(fminmax.min, fminmax.max);
            fminmax = findFminmax(_f_l68);
            _formatter_f_l68 = InteractiveDataDisplay.AdaptiveFormatter(fminmax.min, fminmax.max);
            fminmax = findFminmax(_f_u68);
            _formatter_f_u68 = InteractiveDataDisplay.AdaptiveFormatter(fminmax.min, fminmax.max);
            var $toolTip = $("<div></div>");
            $("<div></div>").addClass('idd-tooltip-name').text((this.name || "heatmap")).appendTo($toolTip);
            var lb = this.getValue(pinCoord.x, pinCoord.y, _f_l68);
            var ub = this.getValue(pinCoord.x, pinCoord.y, _f_u68);
            var median = this.getValue(pinCoord.x, pinCoord.y, _f_median);
            if (lb == null || ub == null || median == null) return;
            var propTitle = this.getTitle("values");
            var uncertainContent = $("<div></div>").addClass('idd-tooltip-compositevalue');
            uncertainContent.append($("<div>median: " + _formatter_f_median.toString(median) + "</div>"));
            uncertainContent.append($("<div>lower 68%: " + _formatter_f_l68.toString(lb) + "</div>"));
            uncertainContent.append($("<div>upper 68%: " + _formatter_f_u68.toString(ub) + "</div>"));
            var $content = $("<div></div>");
            $content.append($("<div>" + propTitle + ":</div>")).append(uncertainContent);
            $content.appendTo($toolTip);

            var checkBoxCnt = $("<div></div>").css("display", "inline-block").appendTo($toolTip);
            var showSimilarBtn = $("<div></div>").addClass("checkButton").appendTo(checkBoxCnt);
            
            if (_interval ) {
                if (changeInterval) {
                    if (_interval != _originalInterval) {
                        _interval = { min: lb, max: ub };
                        $(".checkButton").removeClass("checkButton-checked");
                        showSimilarBtn.addClass("checkButton-checked");
                        this.fireAppearanceChanged("interval");
                    } else $(".checkButton").removeClass("checkButton-checked");
                }  else {
                    $(".checkButton").removeClass("checkButton-checked");
                    showSimilarBtn.addClass("checkButton-checked");
                }
                updateInterval();
            }
            showSimilarBtn.click(function () {
                if (showSimilarBtn.hasClass("checkButton-checked")) {
                    showSimilarBtn.removeClass("checkButton-checked");
                    if (_originalInterval) {
                        _interval = _originalInterval;
                        updateInterval();
                    } else {
                        _interval = undefined;
                        _heatmap_nav.isVisible = false;
                    }
                }
                else {
                    $(".checkButton").removeClass("checkButton-checked");
                    showSimilarBtn.addClass("checkButton-checked");
                    _interval = { min: lb, max: ub };
                    updateInterval();
                }
                that.fireAppearanceChanged("interval");
            });

            $($("<span style='margin-left:3px;'>highlight similar</span>")).appendTo(checkBoxCnt);
            return $toolTip;
        }
    };


    Object.defineProperty(this, "palette", {
        get: function () { return _palette; },
        set: function (value) {
            if (value == _palette) return;
            if (!value) throw "Heatmap palette is undefined";
            if (_palette && value.isNormalized && !_palette.isNormalized && _f) {
                computePaletteMinMax();
            }
            loadPalette(value);
            lastCompletedTask = undefined;

            this.fireAppearanceChanged("palette");
            this.requestNextFrame();
        },
        configurable: false
    });
    Object.defineProperty(this, "opacity", {
        get: function () { return _opacity; },
        set: function (value) {
            if (!value) throw "Heatmap opacity is undefined";
            if (value == _opacity) return;
            loadOpacity(value);

            this.fireAppearanceChanged("opacity");
            this.requestNextFrame();
        },
        configurable: false
    });
    Object.defineProperty(this, "mode", {
        get: function () { return _mode; },
        configurable: false
    });

    this.getLegend = function () {
        var canvas = $("<canvas></canvas>");
        var infoDiv = $("<div></div>");
        var that = this;
        var nameDiv = $("<span></span>");
        var setName = function () {
            nameDiv.text(that.name);
        }
        setName();
        var colorIsVisible = 0;
        var paletteControl, colorDiv, paletteDiv;
        colorDiv = $("<div class='idd-legend-item-palette'></div>").appendTo(infoDiv);

        var clrTitleText, colorTitle;
        var refreshColor = function () {
            clrTitleText = that.getTitle("values");
            if (colorIsVisible == 0) {
                colorDiv.empty();                
                colorTitle = $("<div class='idd-legend-item-property'></div>").text(clrTitleText).appendTo(colorDiv);
                paletteDiv = $("<div style='width: 170px; margin-top: 5px; margin-bottom: 5px;'></div>").appendTo(colorDiv);

                paletteControl = new InteractiveDataDisplay.ColorPaletteViewer(paletteDiv, _palette, { logAxis: _logColors });
                colorIsVisible = 2;
            } else colorTitle.text(clrTitleText);

            if (_palette && _palette.isNormalized) {
                paletteControl.dataRange = { min: _fmin, max: _fmax };
            }
        }
        refreshColor();
        var intervalDiv;
        var refreshInterval = function () {
            if (_interval == undefined && intervalDiv) intervalDiv.empty();
            else {
                if (_interval) {
                    _formatter_interval = InteractiveDataDisplay.AdaptiveFormatter(_interval.min, _interval.max);
                    if (intervalDiv) intervalDiv.text("highlighted interval: " + _formatter_interval.toString(_interval.min) + ", " + _formatter_interval.toString(_interval.max));
                    else intervalDiv = $("<div style='font-size:14px;'>highlighted interval: " + _formatter_interval.toString(_interval.min) + ", " + _formatter_interval.toString(_interval.max) + "</div>").appendTo(infoDiv);

                }
            }
        }
        refreshInterval();
        this.host.bind("appearanceChanged",
            function (event, propertyName) {
                if (!propertyName || propertyName == "name")
                    setName();
                if (!propertyName || propertyName == "interval")
                    refreshInterval();
                if (!propertyName || propertyName == "values" || propertyName == "colorPalette"){
                    colorIsVisible = 0;
                    refreshColor();
                }
                if (!propertyName || propertyName == "palette") paletteControl.palette = _palette;
                var oldRange = paletteControl.dataRange;
                if (_palette && _palette.isNormalized && (oldRange == undefined || oldRange.min != _fmin || oldRange.max != _fmax)) {
                    paletteControl.dataRange = { min: _fmin, max: _fmax };
                }
            });

        var onLegendRemove = function () {
            that.host.unbind("appearanceChanged");
        };

        return { name: nameDiv, legend: { thumbnail: canvas, content: infoDiv }, onLegendRemove: onLegendRemove };
    };

    this.buildSvgLegend = function (legendSettings, svg) {
        var that = this;
        legendSettings.height = 30;
        svg.add(svg.rect(legendSettings.width, legendSettings.height).fill("white").opacity(0.5));
        var style = window.getComputedStyle(legendSettings.legendDiv.children[0].children[1], null);
        var fontSize = parseFloat(style.getPropertyValue('font-size'));
        var fontFamily = style.getPropertyValue('font-family');
        var fontWeight = style ? style.getPropertyValue('font-weight') : undefined;
        svg.add(svg.text(that.name).font({ family: fontFamily, size: fontSize, weight: fontWeight }).translate(40, 0));
        //content
        var isContent = legendSettings.legendDiv.children[1];
        style = (isContent && legendSettings.legendDiv.children[1].children[0] && legendSettings.legendDiv.children[1].children[0].children[0]) ? window.getComputedStyle(legendSettings.legendDiv.children[1].children[0].children[0], null) : undefined;
        fontSize = style ? parseFloat(style.getPropertyValue('font-size')) : undefined;
        fontFamily = style ? style.getPropertyValue('font-family') : undefined;
        fontWeight = style ? style.getPropertyValue('font-weight') : undefined;
        var content = svg.group();
        var colorText = that.getTitle("values");
        content.text(colorText).font({ family: fontFamily, size: fontSize, weight: fontWeight });
        content.translate(5, 30);
        var colorPalette_g = svg.group();
        var width = legendSettings.width;
        var height = 20;
        InteractiveDataDisplay.SvgColorPaletteViewer(colorPalette_g, _palette, legendSettings.legendDiv.children[1].children[0].children[1], { width: width, height: height });
        colorPalette_g.translate(5, 50);
        legendSettings.height += (50 + height);
     
        if (_interval) {
            style = (isContent && legendSettings.legendDiv.children[1].children[1] && legendSettings.legendDiv.children[1].children[1]) ? window.getComputedStyle(legendSettings.legendDiv.children[1].children[1], null) : undefined;
            fontSize = style ? parseFloat(style.getPropertyValue('font-size')) : undefined;
            fontFamily = style ? style.getPropertyValue('font-family') : undefined;
            fontWeight = style ? style.getPropertyValue('font-weight') : undefined;

            var interval_g = svg.group();
            var text = $(legendSettings.legendDiv.children[1].children[1]).text();
            interval_g.add(interval_g.text(text).font({ family: fontFamily, size: fontSize, weight: fontWeight }));
            var width = legendSettings.width;
            var height = 25;
            interval_g.translate(5, 100);
            legendSettings.height += (50 + height);
        };
        
        svg.front();
    }
    // Initialization 
    if (initialData && typeof initialData.values != 'undefined')
        this.draw(initialData);
};
InteractiveDataDisplay.Heatmap.prototype = new InteractiveDataDisplay.CanvasPlot();

InteractiveDataDisplay.register("heatmap", function (jqDiv, master) {
    return new InteractiveDataDisplay.Heatmap(jqDiv, master);
});;InteractiveDataDisplay.NavigationPanel = function (plot, div, url) {
    var that = this;
    var leftKeyCode = 37;
    var upKeyCode = 38;
    var righKeyCode = 39;
    var downKeyCode = 40;
    var plusKeyCode = 107;
    var minusKeyCode = 109;
    var dashKeyCode = 189;
    var equalKey = 187;
    div.attr("tabindex", "0");
    div.addClass('idd-navigation-container');
    if (plot.legend) {
        var hideShowLegend = $('<div></div>').appendTo(div);
        if (plot.legend.isVisible) hideShowLegend.addClass("idd-onscreennavigation-showlegend");
        else hideShowLegend.addClass("idd-onscreennavigation-hidelegend");
        hideShowLegend.click(function () {
            if (plot.legend.isVisible) {
                plot.legend.isVisible = false;
                hideShowLegend.removeClass("idd-onscreennavigation-showlegend").addClass("idd-onscreennavigation-hidelegend");
            } else {
                plot.legend.isVisible = true;
                hideShowLegend.removeClass("idd-onscreennavigation-hidelegend").addClass("idd-onscreennavigation-showlegend");
            }
        });
    };
    var help;
    if (url) {
        help = $('<a style="display:block" target="_blank"></div>').addClass("idd-onscreennavigation-help").appendTo(div);
        help.attr('href', url);
    }
    else help = $('<a href="https://github.com/predictionmachines/InteractiveDataDisplay/wiki/UI-Guidelines" style="display:block" target="_blank"></div>').addClass("idd-onscreennavigation-help").appendTo(div);
    var exportSVG = $("<div></div>").addClass("idd-onscreennavigation-exportsvg").appendTo(div);
    var lockNavigation = $("<div></div>").addClass("idd-onscreennavigation-navigationlockpressed").appendTo(div);
    var ZoomAndPanDiv = $("<div style='overflow: hidden; height: 0px'></div>").appendTo(div);
    var pannerDiv = $("<div></div>").addClass("idd-onscreennavigation-panner").appendTo(ZoomAndPanDiv);
    var zoomInDiv = $("<div></div>").addClass("idd-onscreennavigation-zoomin").appendTo(ZoomAndPanDiv);
    var zoomOutDiv = $("<div></div>").addClass("idd-onscreennavigation-zoomout").appendTo(ZoomAndPanDiv);
    var fitDiv = $("<div></div>").addClass("idd-onscreennavigation-fit").appendTo(ZoomAndPanDiv);
    var logScale = $("<div></div>").addClass("idd-onscreennavigation-logscale").appendTo(ZoomAndPanDiv);
    var obs = undefined;
    var observable = Rx.Observable.create(function (rx) {
        obs = rx;
        return function () {
            obs = undefined;
        };
    });

    exportSVG.click(function () {
        try {
            var isFileSaverSupported = !!new Blob;
            var svg = plot.exportToSvg();
            var blob = new Blob([svg.svg()]);
            saveAs(blob, "chart.svg");
        } catch (e) { throw e.message; }
    });
    var LogScaleSwitcher = function (plot) {
        var prevState = undefined;
        var switchToState = function (state) {
            if (state !== prevState) {
                switch (state) {
                    case 0:
                        plot.xDataTransform = undefined;
                        plot.yDataTransform = undefined;
                        break;
                    case 1:
                        plot.xDataTransform = InteractiveDataDisplay.logTransform;
                        plot.yDataTransform = undefined;
                        break;
                    case 2:
                        plot.xDataTransform = undefined;
                        plot.yDataTransform = InteractiveDataDisplay.logTransform;
                        break;
                    case 3:
                        plot.xDataTransform = InteractiveDataDisplay.logTransform;
                        plot.yDataTransform = InteractiveDataDisplay.logTransform;
                        break;
                }
                prevState = state;
            }
        };
        this.switch = function () {
            if (plot.mapControl)
                return;
            var state = (((plot.xDataTransform ? 1 : 0) | (plot.yDataTransform ? 2 : 0)) + 1) % 4;
            switchToState(state);
            plot.isAutoFitEnabled = true;
            return state;
        };
    };
    var logScaleSwitcher = new LogScaleSwitcher(plot);
    logScale.click(function (e) {
        var currentState = logScaleSwitcher.switch();
        var gestureSource = plot.navigation.gestureSource;
        plot.navigation.gestureSource = gestureSource ? observable.merge(gestureSource) : observable;
        $(this).trigger('axisChanged', [currentState]);
    });
    var gestureSource = undefined;
    if (plot.navigation.gestureSource !== undefined) {
        gestureSource = observable.merge(plot.navigation.gestureSource);
    }
    else {
        gestureSource = observable;
    }
    plot.navigation.gestureSource = gestureSource;
    var panLeft = function () {
        if (obs)
            obs.onNext(new InteractiveDataDisplay.Gestures.PanGesture(10, 0, "Mouse"));
    };
    var panRight = function () {
        if (obs)
            obs.onNext(new InteractiveDataDisplay.Gestures.PanGesture(-10, 0, "Mouse"));
    };
    var panUp = function () {
        if (obs)
            obs.onNext(new InteractiveDataDisplay.Gestures.PanGesture(0, 10, "Mouse"));
    };
    var panDown = function () {
        if (obs)
            obs.onNext(new InteractiveDataDisplay.Gestures.PanGesture(0, -10, "Mouse"));
    };
    var getZoomFactor = function () {
        if (plot.mapControl === undefined)
            return InteractiveDataDisplay.Gestures.zoomLevelFactor;
        else
            return 3.0;
    };
    var zoomIn = function () {
        if (obs) 
            obs.onNext(new InteractiveDataDisplay.Gestures.ZoomGesture(plot.centralPart.width() / 2, plot.centralPart.height() / 2, 1.0 / getZoomFactor(), "Mouse"));
    };
    var zoomOut = function () {
        if (obs)
            obs.onNext(new InteractiveDataDisplay.Gestures.ZoomGesture(plot.centralPart.width() / 2, plot.centralPart.height() / 2, getZoomFactor(), "Mouse"));
    };
    var fitToView = function () {
        plot.fitToView();
    };
    var defaultGestureSource = plot.navigation.gestureSource;
    plot.navigation.gestureSource = undefined;
    lockNavigation.click(function () {
        if (plot.navigation.gestureSource !== undefined) {
            plot.navigation.gestureSource = undefined;
            lockNavigation.removeClass("idd-onscreennavigation-navigationlock").addClass("idd-onscreennavigation-navigationlockpressed");
            ZoomAndPanDiv.animate({
                height: 0,
            }, 200);
        }
        else {
            plot.navigation.gestureSource = defaultGestureSource;
            lockNavigation.removeClass("idd-onscreennavigation-navigationlockpressed").addClass("idd-onscreennavigation-navigationlock");
            ZoomAndPanDiv.animate({
                height: 225,
            }, 200);
        }
        $(this).trigger('classChanged');
    });
    zoomOutDiv.dblclick(function (e) {
        e.stopPropagation();
    });
    zoomOutDiv.click(function (e) {
        e.stopPropagation();
        zoomOut();
    });
    zoomInDiv.dblclick(function (e) {
        e.stopPropagation();
    });
    zoomInDiv.click(function (e) {
        e.stopPropagation();
        zoomIn();
    });
    if (plot.isAutoFitEnabled)
        fitDiv.attr("class", "idd-onscreennavigation-fit-pressed");
    fitDiv.click(function () {
        plot.isAutoFitEnabled = !plot.isAutoFitEnabled;
    });
    plot.host.on("isAutoFitEnabledChanged", function () {
        if (plot.isAutoFitEnabled) {
            fitDiv.attr("class", "idd-onscreennavigation-fit-pressed");
        }
        else {
            fitDiv.attr("class", "idd-onscreennavigation-fit");
        }
    });
    div.keydown(function (event) {
        var key = event.which;
        if (key == leftKeyCode) {
            panLeft();
            event.preventDefault();
        }
        else if (key == upKeyCode) {
            panUp();
            event.preventDefault();
        }
        else if (key == righKeyCode) {
            panRight();
            event.preventDefault();
        }
        else if (key == downKeyCode) {
            panDown();
            event.preventDefault();
        }
        else if (key == plusKeyCode || key == equalKey) {
            zoomIn();
            event.preventDefault();
        }
        else if (key == minusKeyCode || key == dashKeyCode) {
            zoomOut();
            event.preventDefault();
        }
    });
    var iid;
    var coords = { x: 0, y: 0 };
    pannerDiv.mousedown(function (event) {
        var offset = pannerDiv.offset();
        var xhalf = pannerDiv.outerWidth() / 2;
        coords.x = (event.pageX - offset.left - xhalf) / xhalf;
        coords.y = (event.pageY - offset.top - xhalf) / xhalf;
        if (coords.x * coords.x + coords.y * coords.y > 1)
            return;
        $(document).on("mousemove", mousemove);
        pannerDiv.removeClass("idd-onscreennavigation-panner").addClass("idd-onscreennavigation-panner-moved");
        iid = setInterval(function () {
            obs.onNext(new InteractiveDataDisplay.Gestures.PanGesture(-10 * coords.x, -10 * coords.y, "Mouse"));
        }, 25);
    });
    $(document).mouseup(function () {
        $(document).off("mousemove", mousemove);
        iid && clearInterval(iid);
        pannerDiv.removeClass("idd-onscreennavigation-panner-moved").addClass("idd-onscreennavigation-panner");
    });
    var mousemove = function (event) {
        var offset = pannerDiv.offset();
        var xhalf = pannerDiv.outerWidth() / 2;
        coords.x = (event.pageX - offset.left - xhalf) / xhalf;
        coords.y = (event.pageY - offset.top - xhalf) / xhalf;
    };
    this.remove = function () {
        plot.navigation.gestureSource = defaultGestureSource;
        div.removeClass('idd-navigation-container');
        div[0].innerHTML = "";
    };
};InteractiveDataDisplay.BingMaps = InteractiveDataDisplay.BingMaps || {};

InteractiveDataDisplay.BingMaps.ESRI = InteractiveDataDisplay.BingMaps.ESRI || {};

InteractiveDataDisplay.BingMaps.ESRI.GetWorldTopo = function () {
    function getTilePath(tile) {
        return "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/" + tile.levelOfDetail + "/" + tile.y + "/" + tile.x;
    }
    return new Microsoft.Maps.TileSource({ uriConstructor: getTilePath });
};

InteractiveDataDisplay.BingMaps.ESRI.GetDeLorme = function () { // DeLorme World Basemap
    function getTilePath(tile) {
        return "http://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/" + tile.levelOfDetail + "/" + tile.y + "/" + tile.x;
    }
    return new Microsoft.Maps.TileSource({ uriConstructor: getTilePath });
};

InteractiveDataDisplay.BingMaps.ESRI.GetWorldImagery = function () { // ESRI World Imagery
    function getTilePath(tile) {
        return "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/" + tile.levelOfDetail + "/" + tile.y + "/" + tile.x;
    }
    return new Microsoft.Maps.TileSource({ uriConstructor: getTilePath });
};

InteractiveDataDisplay.BingMaps.ESRI.GetOceanBasemap = function () { // Ocean Basemap
    function getTilePath(tile) {
        return "http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/" + tile.levelOfDetail + "/" + tile.y + "/" + tile.x;
    }
    return new Microsoft.Maps.TileSource({ uriConstructor: getTilePath });
};

InteractiveDataDisplay.BingMaps.ESRI.GetNationalGeographicMap = function () { // National Geographic World Map
    function getTilePath(tile) {
        return "http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/" + tile.levelOfDetail + "/" + tile.y + "/" + tile.x;
    }
    return new Microsoft.Maps.TileSource({ uriConstructor: getTilePath });
};

InteractiveDataDisplay.BingMaps.ESRI.GetWorldShadedRelief = function () { // World Shaded Relief
    function getTilePath(tile) {
        return "http://services.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/" + tile.levelOfDetail + "/" + tile.y + "/" + tile.x;
    }
    return new Microsoft.Maps.TileSource({ uriConstructor: getTilePath });
};

InteractiveDataDisplay.BingMaps.ESRI.GetWorldTerrainBase = function () { // World Terrain Base
    function getTilePath(tile) {
        return "http://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/" + tile.levelOfDetail + "/" + tile.y + "/" + tile.x;
    }
    return new Microsoft.Maps.TileSource({ uriConstructor: getTilePath });
};



InteractiveDataDisplay.BingMaps.OpenStreetMap = InteractiveDataDisplay.BingMaps.OpenStreet || {};

InteractiveDataDisplay.BingMaps.OpenStreetMap.GetTileSource = function () {
    function getTilePath(tile) {
        return "http://tile.openstreetmap.org/" + tile.levelOfDetail + "/" + tile.x + "/" + tile.y + ".png";
    }
    return new Microsoft.Maps.TileSource({ uriConstructor: getTilePath });
};



InteractiveDataDisplay.BingMapsPlot = function (div, master) {
    if (!div) return;

    var mapDiv = $('<div style="position: absolute"></div>').prependTo(div);

    this.base = InteractiveDataDisplay.Plot;
    this.base(div, master);

    var that = this;

    if (typeof Microsoft === 'undefined') {
        //BingMaps script wasn't loaded
        $("<p></p>").css("margin", 15).css("word-wrap", "break-word").text("BingMaps script is unavailable. Check your internet connection.").appendTo(div);
    } else {

        var navDiv = undefined;
        var navCanvas = undefined;
        if (that.children.length === 0) {
            navDiv = $('<div style="position: absolute;"></div>').appendTo(div);
            navDiv.css("z-index", InteractiveDataDisplay.ZIndexNavigationLayer);
            navCanvas = $('<canvas></canvas>').appendTo(navDiv);
        }

        var maxLat = 85.05112878;

        this.mapKey = div.attr("data-idd-mapKey");

        var _map = new Microsoft.Maps.Map(mapDiv[0], {
            credentials: that.mapKey,
            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
            enableClickableLogo: false,
            enableSearchLogo: false,
            showCopyright: false,
            showDashboard: false,
            showLogo: false,
            disablePanning: true,
            disableZooming: true,
            width: div.width(),
            height: div.height()
        });

        Object.defineProperty(this, "map", {
            get: function () { return _map; },
            configurable: false
        });

        var bingMapsAnimation = new InteractiveDataDisplay.BingMapsAnimation(_map);

        this.arrange = function (finalRect) {
            InteractiveDataDisplay.BingMapsPlot.prototype.arrange.call(this, finalRect);

            _map.width = finalRect.width;
            _map.height = finalRect.height;
        };

        // Sets the map provided as an argument which is either a tile source (Microsoft.Maps.TileSource, e.g. see InteractiveDataDisplay.BingMaps.OpenStreetMap.GetTileSource),
        // or a map type of Bing Maps (Microsoft.Maps.MapTypeId).
        this.setMap = function (map) {
            _map.setMapType(Microsoft.Maps.MapTypeId.mercator);
            _map.entities.clear();
            if (!map) return;

            if (map instanceof Microsoft.Maps.TileSource) {
                // Construct the layer using the tile source
                var tilelayer = new Microsoft.Maps.TileLayer({ mercator: map, opacity: 1 });
                _map.entities.push(tilelayer);
            } else {
                _map.setMapType(map);
            }
        };

        this.constraint = function (plotRect, screenSize, isPlotScreenChanged) {
            if (isPlotScreenChanged === true) {
                var mapWidth = _map.getWidth();
                var mapHeight = _map.getHeight();

                if (mapWidth <= 1 || mapHeight <= 1)
                    return plotRect;

                bingMapsAnimation.setMapView(plotRect, screenSize);
                mapRect = InteractiveDataDisplay.Utils.getPlotRectForMap(_map);
                return mapRect;
            }
            return plotRect;
        }

        this.arrange = function (finalRect) {
            InteractiveDataDisplay.CanvasPlot.prototype.arrange.call(this, finalRect);

            if (navDiv !== undefined) {
                navDiv.width(finalRect.width);
                navDiv.height(finalRect.height);
                navCanvas[0].width = finalRect.width;
                navCanvas[0].height = finalRect.height;
            }
        }

        bingMapsAnimation.constraint = this.constraint;
        that.navigation.animation = bingMapsAnimation;
        this.selfMapRefresh();
    }
}

InteractiveDataDisplay.BingMapsPlot.prototype = new InteractiveDataDisplay.Plot;;var InteractiveDataDisplay;
(function (InteractiveDataDisplay) {
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
        var HasPropertyInStorage = function (property) {
            return property != null && property != undefined && property != "undefined";
        };
        var plotRect = sessionStorage.getItem("plotRect");
        var _plotRect = HasPropertyInStorage(plotRect) ? JSON.parse(plotRect) : undefined;
        Object.defineProperty(this, "plotRect", {
            get: function () { return _plotRect; },
            set: function (value) {
                if (value == _plotRect)
                    return;
                _plotRect = value;
                sessionStorage.setItem("plotRect", JSON.stringify(_plotRect));
                raisePropertyChanged("plotRect");
            },
            configurable: false,
            enumerable: true
        });
        var isAutoFit = sessionStorage.getItem("isAutoFit");
        var _isAutoFit = HasPropertyInStorage(isAutoFit) ? JSON.parse(isAutoFit) : true;
        Object.defineProperty(this, "isAutoFit", {
            get: function () { return _isAutoFit; },
            set: function (value) {
                if (value == _isAutoFit)
                    return;
                _isAutoFit = value;
                sessionStorage.setItem("isAutoFit", JSON.stringify(_isAutoFit));
                raisePropertyChanged("isAutoFit");
            },
            configurable: false,
            enumerable: true
        });
        var selectedPlots = sessionStorage.getItem("selectedPlots");
        var _selectedPlots = HasPropertyInStorage(selectedPlots) ? JSON.parse(selectedPlots) : [];
        Object.defineProperty(this, "selectedPlots", {
            get: function () { return _selectedPlots; },
            set: function (value) {
                if (value == _selectedPlots)
                    return;
                _selectedPlots = value;
                sessionStorage.setItem("selectedPlots", JSON.stringify(_selectedPlots));
                raisePropertyChanged("selectedPlots");
            },
            configurable: false,
            enumerable: true
        });
        var probes = sessionStorage.getItem("probes");
        var _probesViewModel = HasPropertyInStorage(probes) ? new InteractiveDataDisplay.ProbesVM(JSON.parse(probes)) : new InteractiveDataDisplay.ProbesVM(undefined);
        _probesViewModel.subscribe(function (args) {
            sessionStorage.setItem("probes", JSON.stringify(_probesViewModel.getProbes()));
            raisePropertyChanged("probes");
        });
        Object.defineProperty(this, "probesViewModel", {
            get: function () { return _probesViewModel; },
            configurable: false,
            enumerable: true
        });
        var isLegendShown = sessionStorage.getItem("isLegendShown");
        var _isLegendShown = HasPropertyInStorage(isLegendShown) ? JSON.parse(isLegendShown) : false;
        Object.defineProperty(this, "isLegendShown", {
            get: function () {
                return _isLegendShown;
            },
            set: function (value) {
                if (value == _isLegendShown)
                    return;
                _isLegendShown = value;
                sessionStorage.setItem("isLegendShown", JSON.stringify(_isLegendShown));
                raisePropertyChanged("isLegendShown");
            },
            configurable: false,
            enumerable: true
        });
        var isNavigationPanelOpen = sessionStorage.getItem("isNavigationPanelOpen");
        var _isNavigationPanelOpen = HasPropertyInStorage(isNavigationPanelOpen) ? JSON.parse(isNavigationPanelOpen) : false;
        Object.defineProperty(this, "isNavigationPanelOpen", {
            get: function () {
                return _isNavigationPanelOpen;
            },
            set: function (value) {
                if (value == _isNavigationPanelOpen)
                    return;
                _isNavigationPanelOpen = value;
                sessionStorage.setItem("isNavigationPanelOpen", JSON.stringify(_isNavigationPanelOpen));
                raisePropertyChanged("isNavigationPanelOpen");
            },
            configurable: false,
            enumerable: true
        });
        var isLogAxis = sessionStorage.getItem("isLogAxis");
        var _isLogAxis = HasPropertyInStorage(isLogAxis) ? JSON.parse(isLogAxis) : 0;
        Object.defineProperty(this, "isLogAxis", {
            get: function () { return _isLogAxis; },
            set: function (value) {
                if (value == _isLogAxis)
                    return;
                _isLogAxis = value;
                sessionStorage.setItem("isLogAxis", JSON.stringify(_isLogAxis));
                raisePropertyChanged("isLogAxis");
            },
            configurable: false,
            enumerable: true
        });
        var mapType = sessionStorage.getItem("mapType");
        var _mapType = HasPropertyInStorage(mapType) ? JSON.parse(mapType) : undefined;
        Object.defineProperty(this, "mapType", {
            get: function () { return _mapType; },
            set: function (value) {
                if (value == _mapType)
                    return;
                _mapType = value;
                sessionStorage.setItem("mapType", JSON.stringify(_mapType));
                raisePropertyChanged("mapType");
            },
            configurable: false,
            enumerable: true
        });
        var xDataTransform = sessionStorage.getItem("xDataTransform");
        var _xDataTransform = HasPropertyInStorage(xDataTransform) ? JSON.parse(xDataTransform) : undefined;
        Object.defineProperty(this, "xDataTransform", {
            get: function () { return _xDataTransform; },
            set: function (value) {
                if (value == _xDataTransform)
                    return;
                _xDataTransform = value;
                sessionStorage.setItem("xDataTransform", JSON.stringify(_xDataTransform));
                raisePropertyChanged("xDataTransform");
            },
            configurable: false,
            enumerable: true
        });
        var yDataTransform = sessionStorage.getItem("yDataTransform");
        var _yDataTransform = HasPropertyInStorage(yDataTransform) ? JSON.parse(yDataTransform) : undefined;
        Object.defineProperty(this, "yDataTransform", {
            get: function () { return _yDataTransform; },
            set: function (value) {
                if (value == _yDataTransform)
                    return;
                _yDataTransform = value;
                sessionStorage.setItem("yDataTransform", JSON.stringify(_yDataTransform));
                raisePropertyChanged("yDataTransform");
            },
            configurable: false,
            enumerable: true
        });
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
    InteractiveDataDisplay.PersistentViewState = PersistentViewState;
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
        var _plotXFormatter = new InteractiveDataDisplay.AdaptiveFormatter(0, 1);
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
        var _plotYFormatter = new InteractiveDataDisplay.AdaptiveFormatter(0, 1);
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
    InteractiveDataDisplay.TransientViewState = TransientViewState;
})(InteractiveDataDisplay || (InteractiveDataDisplay = {}));
var InteractiveDataDisplay;
(function (InteractiveDataDisplay) {
    InteractiveDataDisplay.PlotRegistry = {};
})(InteractiveDataDisplay || (InteractiveDataDisplay = {}));
var InteractiveDataDisplay;
(function (InteractiveDataDisplay) {
    function createSmallProbe(jqDiv, num, fill, scale) {
        jqDiv.empty();
        var canvasScale = scale !== undefined ? scale : 1;
        var canvas = $("<canvas width='" + (40 * canvasScale) + "' height='" + 40 * canvasScale + "'></canvas>").appendTo(jqDiv);
        var ctx = canvas.get(0).getContext("2d");
        ctx.globalAlpha = 0.9;
        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 40 * canvasScale, 40 * canvasScale);
            if (num !== undefined) {
                ctx.fillStyle = "white";
                var fontsize = (num < 10 ? 14 : 11) * canvasScale;
                ctx.font = fontsize + "px Arial";
                var offsetX = (num < 10 ? 16 : 13) * canvasScale;
                ctx.fillText(num, offsetX, 20 * canvasScale);
            }
        };
        img.src = fill ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC45bDN+TgAAApdJREFUaEPtWc1KW0EUDrjL+9RVN2ZVNC1SaBdREewmYkW00NI+QVEkxJ+2/iBq1KX2CVrJM3Tj1ifIG9yebzhnvFxO4iR3Zm4C94Nvk8yc7zs/czOXVEower3eFLHqyCneVjxghk11iYkjsbbYRCDOJqzxfw+Pyf5NdyCxRtbz3viJQJDFrfG9624yv36STC8eDiTWYK2SSJwkIMSCxkSrc5/MrOyrZgextnKQtK/u04mETwICLGSEl75equaG4fK3TpwkEJgFjGB97ZdqaBS++XgcNgkE5MDezQuDJkHB8KQwAj7Gph8z41Rl+XxAJYim+jiwmrBP4mBzAn66QEFs9Ud52gzL2ocDf11ABYim+nh2a4IhCC1OIF8XaLOtvsuPlOXCnttnffh249RPFyQBXAE0oZCEZvwEHKr8wrETxSTgkWUCQJlADhaTQHmIn+g1Afyo4LaoCWnUquxaeTBzM82VgL1K7F78UcVCsHX5V8znv9BRgOhj5GV8BJIAWvpu60wV9EloeBkfAQWxYxSjC6nq5x8fAQWyXXjV/KEK+yBie62+AJUgmi6EfC/w9h6ggQLaLsyu+n+pR8wg1RegIsRgZyHI7GdBgW0XGp/PVSOjsPHlImz1BagM0XsXolRfQAK2C5vbd6qhYYgYUaovQIWIpgsQrq8dqcZciL0p8+GrL4AQC+YapaijkwUJ2lHa2vmtGhxE7Ik6OlmgYkQ7Su8/ud+TsLaQ0ckCwmzAGHq5/PydH2vGwrwABtiI0zWj0LnvBzJiz8PG91vVOIjvUtWPP/f9gEoS7Shp/yHgs7EanSxgiI0Zo3OrP615/KMz1uYFMMYGjeHXzbbhRJgXwCAbFdOTY14Ao0Qc7DQnw3yJoVCp/AcXkU+yAO498gAAAABJRU5ErkJggg=='
            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC45bDN+TgAAAylJREFUaEPVmdtOMjEUhX0Wn9CHwkPQeIxwwQ0SD1eaqIkHghEidxD1Dfrvb0KT+ScLpu0UEy6+xL1ou9fedGbKuNVqtTYaKW4SUkzl9/d329ipYVvNTUWKsWBqYW5guBoYk60QKYaCiYWZwc/PjxuNRu729tZdXl66drvtdnd3C/gbjc8+Pj4cY5mzmNuoECmGQGJv/PHx0R0fHzvTg2Ds09NTuZDkIqRYhzf/9fXlzs/PpckQLi4u3HQ6bVSEFFfhzb+/v7v9/X1pLAbWGA6HyUVIcRll8+xt07LAWqlFSFHhzbNtcnS+CmumbCcpKmzRHS66Jnu+Dq6JxYW9Y7H0UUWKVegIneFuY/FaeX5+jvoWpFiFjtCZmFtlKicnJ1HfghTL0Ak6wkPK4iAODg6CtGXwsCMnuS2WvjxSLEMnjOIpavGfcHd3RwFB34IUy/gCOApYvJKQLoeM6XQ6+QvgPGPxn3B4eJi/gJwPrjrIlb2Avb09mWwdkCt7AUdHRzLZOiBX9gK63a5MVibXRUyu7AVwa7P4T8h9Gy0eZJwWLQ5CdTmk856Yk6kUq9CJ7+/vKBOpkINc5LRY+ikjxSosZrh+vy+T5oQc5MpdQLGNPj8/ZdKckINc5LRY+ikjRQUdMYozu8VrgbXJQS6LpY8qUlTQEWPw8vIik+fg9fU1qvsgxWXQGc7qp6en0kATzs7Oon+NgRSXQWfo0NvbmzTRBF4UsDY5LJb5FVJcBR0yiiOvxVmIOT5XkeIq6JAxmEwm0kwKrMWarG2xzLsMKdZBpwx3fX0tDcVwc3OT3H2QYh10yhjM5/NGp1TmsgZrsaZpMt8qpBiCLyLmjFSlyStFjxRDscTFVrq6upIGV8Ec5rKGxXL9EKQYCp0ziq0U+3q96dbxSDEGXwRnmJDfzYwZj8dZzIMUY/FF3N/fS9NlGJPLPEgxBTNUHDN6vZ40Dnxm4xrv+zJSTIGOGoPZbFa83zTtP9D4jDGMZU4OpJiKL6L6PwT+RsttHqTYBF8EhzOLC1IPaiFIsSm+iIeHBwfrMg9SzMGiCB50sBbzIMVNQoqbhBQ3h9bWP/HfsYvIwP9AAAAAAElFTkSuQmCC';
    }
    InteractiveDataDisplay.createSmallProbe = createSmallProbe;
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
    InteractiveDataDisplay.ProbePull = ProbePull;
    ;
    function OnScreenNavigation(div, d3Chart, persistentViewState) {
        var that = this;
        InteractiveDataDisplay.NavigationPanel(d3Chart, div, 'https://github.com/predictionmachines/InteractiveDataDisplay/wiki/UI-Guidelines#chartviewer');
        var legendViewer = div.find('.idd-onscreennavigation-showlegend');
        legendViewer.remove();
        legendViewer = div.find('.idd-onscreennavigation-hidelegend');
        legendViewer.remove();
        var hideShowLegend = $('<div></div>').addClass("idd-onscreennavigation-hidelegend").prependTo(div);
        var lockNavigation = div.find('.idd-onscreennavigation-navigationlockpressed');
        if (persistentViewState.isNavigationPanelOpen)
            $(lockNavigation).click();
        $(lockNavigation).bind('classChanged', function () {
            persistentViewState.isNavigationPanelOpen = $(this).hasClass('idd-onscreennavigation-navigationlock');
        });
        var logSwitcher = div.find('.idd-onscreennavigation-logscale');
        for (var i = 0; i < persistentViewState.isLogAxis; i++)
            $(logSwitcher).click();
        $(logSwitcher).on('axisChanged', function (event, state) {
            persistentViewState.isLogAxis = state;
        });
    }
    InteractiveDataDisplay.OnScreenNavigation = OnScreenNavigation;
})(InteractiveDataDisplay || (InteractiveDataDisplay = {}));
var InteractiveDataDisplay;
(function (InteractiveDataDisplay) {
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
            iddChart.isToolTipEnabled = true;
            iddChart.doFitOnDataTransformChanged = false;
            var onscreenNavigationContainer = $("<div></div>").addClass("dsv-onscreennavigationcontainer").attr("data-idd-placement", "center").appendTo(navigationDiv);
            var onscreenNavigationDiv = $("<div></div>").addClass("dsv-onscreennavigation").appendTo(onscreenNavigationContainer);
            var onscreenNavigation = new InteractiveDataDisplay.OnScreenNavigation(onscreenNavigationDiv, iddChart, persistentViewState);
            var probesPlot_div = $("<div></div>")
                .attr("data-idd-name", "draggableMarkers")
                .appendTo(iddChart.host);
            var probesPlot = new InteractiveDataDisplay.DOMPlot(probesPlot_div, iddChart);
            probesPlot.order = 9007199254740991;
            iddChart.addChild(probesPlot);
            this.persistentViewState = persistentViewState;
            iddChart.navigation.setVisibleRect(this.persistentViewState.plotRect, false, { suppressNotifyBoundPlots: true });
            iddChart.isAutoFitEnabled = this.persistentViewState.isAutoFit;
            persistentViewState.probesViewModel.getProbeContent = function (probe) {
                var children = iddChart.children;
                var result = [];
                for (var i = 0; i < children.length; i++) {
                    if (children[i].isVisible) {
                        var px = children[i].xDataTransform ?
                            (children[i].xDataTransform.domain && children[i].xDataTransform.domain.isInDomain && children[i].xDataTransform.domain.isInDomain(probe.location.x) ?
                                children[i].xDataTransform.dataToPlot(probe.location.x) : probe.location.x) : probe.location.x;
                        var py = children[i].yDataTransform ?
                            (children[i].yDataTransform.domain && children[i].yDataTransform.domain.isInDomain && children[i].yDataTransform.domain.isInDomain(probe.location.y) ?
                                children[i].yDataTransform.dataToPlot(probe.location.y) : probe.location.y) : probe.location.y;
                        var tt = children[i].getTooltip(probe.location.x, probe.location.y, px, py, true);
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
                probesPlot.add(draggable[0], 'none', x, y, undefined, undefined, 0.5, 0.92);
                var children = probesPlot.domElements;
                var addedDragable = children[children.length - 1];
                addedDragable.id = id;
                draggable.draggable({
                    containment: probesPlot.master.centralPart[0],
                    scroll: false,
                    opacity: 0.9,
                    stop: function (event, ui) {
                        var pinCoord = { x: addedDragable._x, y: addedDragable._y };
                        persistentViewState.probesViewModel.updateProbe(id, pinCoord);
                    }
                });
                if (probe.selected) {
                    InteractiveDataDisplay.createSmallProbe(draggable, id, "#365C95");
                }
                else {
                    InteractiveDataDisplay.createSmallProbe(draggable, id);
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
                            InteractiveDataDisplay.createSmallProbe(possibleProbe, possibleProbe.id);
                        }
                        break;
                    case "selected":
                        var children = probesPlot.domElements;
                        for (var i = 0; i < children.length; i++) {
                            var possibleProbe = children[i];
                            if (possibleProbe.id === probe.id) {
                                InteractiveDataDisplay.createSmallProbe(possibleProbe, possibleProbe.id, "#365C95");
                            }
                            else {
                                InteractiveDataDisplay.createSmallProbe(possibleProbe, possibleProbe.id);
                            }
                        }
                        break;
                }
            });
            var existingProbes = persistentViewState.probesViewModel.getProbes();
            for (var i = 0; i < existingProbes.length; i++) {
                addNewProbe(existingProbes[i]);
            }
            iddDiv.on("visibleChanged", function () {
                var result = [];
                for (var id in that.currentPlots) {
                    var p = that.currentPlots[id];
                    var iddPlots = p.Plots;
                    if (iddPlots && iddPlots.length > 0) {
                        if (!iddPlots[0].isVisible) {
                            result.push(p.Id);
                        }
                    }
                }
                that.persistentViewState.selectedPlots = result;
            });
            iddDiv.on("isAutoFitEnabledChanged", function () {
                persistentViewState.isAutoFit = iddChart.isAutoFitEnabled;
            });
            iddDiv.on("visibleRectChanged", function () {
                var plotRect = iddChart.visibleRect;
                transientViewState.plotXFormatter = new InteractiveDataDisplay.AdaptiveFormatter(plotRect.x, plotRect.x + plotRect.width);
                transientViewState.plotYFormatter = new InteractiveDataDisplay.AdaptiveFormatter(plotRect.y, plotRect.y + plotRect.height);
                persistentViewState.plotRect = plotRect;
                if (persistentViewState.probesViewModel !== undefined) {
                    persistentViewState.probesViewModel.refresh();
                }
            });
        }
        PlotViewer.prototype.setupPlotsVisibility = function () {
            for (var id in this.currentPlots) {
                var p = this.currentPlots[id];
                var iddPlots = p.Plots;
                if (iddPlots) {
                    var isVisible = this.initiallySelectedPlots.indexOf(p.Id) == -1;
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
            return plot["x"] !== undefined && isLon(InteractiveDataDisplay.getTitle(plot, "x")) && plot["y"] !== undefined && isLat(InteractiveDataDisplay.getTitle(plot, "y"));
        };
        PlotViewer.prototype.addPlot = function (p) {
            var factory = InteractiveDataDisplay.PlotRegistry[p.Definition.kind] ? InteractiveDataDisplay.PlotRegistry[p.Definition.kind] : InteractiveDataDisplay.PlotRegistry["fallback"];
            p.Plots = factory.initialize(p.Definition, this.persistentViewState, this.iddChart);
            try {
                factory.draw(p.Plots, p.Definition);
            }
            catch (ex) {
                if (p.Plots !== undefined)
                    p.Plots.forEach(function (graph) { graph.remove(); });
                factory = InteractiveDataDisplay.PlotRegistry["fallback"];
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
                    var xStr = InteractiveDataDisplay.getTitle(def, "x");
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
                    var yStr = InteractiveDataDisplay.getTitle(def, "y");
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
                        $(this.iddChart.addDiv('<div class="idd-verticalTitle" style="font-size: larger;"></div>', "left"));
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
                }
                else {
                    if (this.persistentViewState.mapType)
                        this.bingMapsPlot.setMap(this.persistentViewState.mapType);
                }
                this.iddChart.yDataTransform = InteractiveDataDisplay.mercatorTransform;
                this.iddChart.xDataTransform = undefined;
                this.bingMapsPlot.navigation.animation.setMapView(this.persistentViewState.plotRect, this.iddChart.screenSize);
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
            this.currentPlots = InteractiveDataDisplay.updateBag(this.currentPlots, plots, function (id, oldPlot, newPlot) {
                if (oldPlot.Definition.kind == newPlot.Definition.kind) {
                    if (InteractiveDataDisplay.syncProps(oldPlot.Definition, newPlot.Definition))
                        InteractiveDataDisplay.PlotRegistry[oldPlot.Definition.kind].draw(oldPlot.Plots, oldPlot.Definition);
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
            this.updateMap();
            this.persistentViewState.probesViewModel.refresh();
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
                for (var j = 0; j < p.Plots.length; ++j) {
                    var plot_j = p.Plots[j];
                    plot_j.host.css("z-index", p.ZIndex);
                    plot_j.requestNextFrameOrUpdate();
                }
            }
            if (this.persistentViewState.selectedPlots) {
                this.initiallySelectedPlots = this.persistentViewState.selectedPlots;
                this.setupPlotsVisibility();
            }
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
    }());
    InteractiveDataDisplay.PlotViewer = PlotViewer;
})(InteractiveDataDisplay || (InteractiveDataDisplay = {}));
var InteractiveDataDisplay;
(function (InteractiveDataDisplay) {
    function PlotList(rootDiv, plotViewer, persistentViewState, transientViewState) {
        var that = this;
        var _isEditable = true;
        var _cards = [];
        var _plots = [];
        rootDiv.addClass("dsv-plotlist");
        var legendDiv = $("<div></div>").appendTo(rootDiv);
        var legend = new InteractiveDataDisplay.Legend(plotViewer.iddChart, legendDiv, false, true);
        plotViewer.iddChart.host.bind("visibleChanged", function () {
            persistentViewState.probesViewModel.refresh(persistentViewState.probesViewModel.getProbes());
        });
        persistentViewState.probesViewModel.refresh(persistentViewState.probesViewModel.getProbes());
        var probesDiv = $("<div></div>").addClass('probes').appendTo(rootDiv);
        var probesTitle = $("<div style='width:240px; margin-bottom: 16px'></div>").appendTo(probesDiv);
        var probePullDiv = $("<div></div>").addClass("dsv-onscreennavigation-probepull").appendTo(probesTitle);
        var probePull = new InteractiveDataDisplay.ProbePull(probePullDiv, plotViewer.iddChart.centralPart);
        var titleDiv = $("<div style='width: 195px; display:inline-block'></div>").appendTo(probesTitle);
        $("<div style='width:180px; height:1px; margin-bottom:6px; float:right; margin-top: 8px; background-color:lightgrey'></div>").appendTo(titleDiv);
        $("<div style='float:left; margin-left:15px;font-family: Segoe UI;font-size: 12px;color:grey; margin-bottom:16px'>Probes</div>").appendTo(titleDiv);
        var probeListHost = $("<div></div>").addClass("probes-list").appendTo(probesDiv);
        probeListHost[0].style.display = "none";
        var probesControl = new InteractiveDataDisplay.ProbesControl(probesDiv, probeListHost, persistentViewState, transientViewState);
        this.remove = function () {
            plotViewer.iddChart.host.bind("visibleChanged");
            legend.remove();
        };
    }
    InteractiveDataDisplay.PlotList = PlotList;
})(InteractiveDataDisplay || (InteractiveDataDisplay = {}));
var InteractiveDataDisplay;
(function (InteractiveDataDisplay) {
    var ChartViewerControl = (function () {
        function ChartViewerControl(container) {
            this.rightPanelExtraShift = 3;
            this.navigationPanelShift = 65;
            this.minWidthToShowLeftPanel = 540;
            this.plotList = undefined;
            this.viewState = undefined;
            var that = this;
            var controlDiv = this.controlDiv = $(container);
            this.persistentViewState = this.viewState = new InteractiveDataDisplay.PersistentViewState();
            this.transientViewState = new InteractiveDataDisplay.TransientViewState();
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
            var isLeftpanelShown = this.persistentViewState.isLegendShown;
            this.plotViewer = new InteractiveDataDisplay.PlotViewer(controlDiv.find(".dsv-visualization-preview"), navigationDiv, this.persistentViewState, this.transientViewState);
            var plotListDiv = controlDiv.find(".plotlist");
            this.plotList = new InteractiveDataDisplay.PlotList(plotListDiv, this.plotViewer, this.persistentViewState, this.transientViewState);
            this.plotList.isEditable = false;
            this.plotViewer.iddChart.exportToSvg = function (plotRect, screenSize, svg) {
                if (!SVG.supported)
                    throw "SVG is not supported";
                var screenSize = this.screenSize;
                var plotRect = this.coordinateTransform.getPlotRect({ x: 0, y: 0, width: screenSize.width, height: screenSize.height });
                var svgHost = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                var svg = SVG(svgHost).size(this.host.width(), this.host.height());
                var chart_g = svg.group();
                this.exportContentToSvg(plotRect, screenSize, chart_g);
                var legend_g = svg.group();
                var shift = this.host.width();
                if (isLeftpanelShown) {
                    legend_g.add(this.exportLegendToSvg(this.legend.div[0])).translate(shift, 30);
                    svg.size(200 + shift, this.host.height());
                }
                return svg;
            };
            var hideShowLegend = navigationDiv[0].children[0].firstChild.firstChild;
            $(hideShowLegend).click(function () {
                if (isLeftpanelShown) {
                    isLeftpanelShown = false;
                    that.persistentViewState.isLegendShown = false;
                    leftpanel.hide();
                    $(hideShowLegend).removeClass("idd-onscreennavigation-showlegend").addClass("idd-onscreennavigation-hidelegend");
                }
                else {
                    isLeftpanelShown = true;
                    that.persistentViewState.isLegendShown = true;
                    leftpanel.show();
                    $(hideShowLegend).removeClass("idd-onscreennavigation-hidelegend").addClass("idd-onscreennavigation-showlegend");
                }
                rightpanel.width(controlDiv.width() - leftPanelContainer.width() - that.rightPanelExtraShift - that.navigationPanelShift);
                that.plotViewer.updateLayout();
                that.persistentViewState.probesViewModel.refresh();
            });
            if (isLeftpanelShown) {
                leftpanel.show();
                $(hideShowLegend).removeClass("idd-onscreennavigation-hidelegend").addClass("idd-onscreennavigation-showlegend");
            }
            else
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
            this.persistentViewState.probesViewModel.refresh();
        };
        ChartViewerControl.prototype.dispose = function () {
            this.plotList.remove();
            this.controlDiv.children().remove();
        };
        return ChartViewerControl;
    }());
    InteractiveDataDisplay.ChartViewerControl = ChartViewerControl;
})(InteractiveDataDisplay || (InteractiveDataDisplay = {}));
var InteractiveDataDisplay;
(function (InteractiveDataDisplay) {
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
    InteractiveDataDisplay.ProbesVM = ProbesVM;
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
                InteractiveDataDisplay.createSmallProbe(probeIcon, probe.id, "#365C95", iconScale);
            }
            else {
                InteractiveDataDisplay.createSmallProbe(probeIcon, probe.id, undefined, iconScale);
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
            if (probes.length > 0)
                hostDiv[0].style.display = "block";
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
    InteractiveDataDisplay.ProbesControl = ProbesControl;
    function show(domElement, plots, viewState) {
        if (viewState)
            throw "viewState argument is not supported";
        var control = new InteractiveDataDisplay.ChartViewerControl(domElement);
        control.update(plots);
        return control;
    }
    InteractiveDataDisplay.show = show;
})(InteractiveDataDisplay || (InteractiveDataDisplay = {}));
var InteractiveDataDisplay;
(function (InteractiveDataDisplay) {
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
    InteractiveDataDisplay.updateBag = updateBag;
    function getTitle(def, seriesName) {
        if (def.titles && typeof def.titles[seriesName] != "undefined")
            return def.titles[seriesName];
        return seriesName;
    }
    InteractiveDataDisplay.getTitle = getTitle;
    function updateProp(propName, obj1, obj2) {
        if (obj1[propName] === obj2[propName]) {
            return true;
        }
        else {
            obj1[propName] = obj2[propName];
            return false;
        }
    }
    InteractiveDataDisplay.updateProp = updateProp;
    function isNumber(obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    }
    InteractiveDataDisplay.isNumber = isNumber;
    function isString(obj) {
        return obj === obj + "";
    }
    InteractiveDataDisplay.isString = isString;
    function isStringOrNumber(obj) {
        return isNumber(obj) || isString(obj);
    }
    InteractiveDataDisplay.isStringOrNumber = isStringOrNumber;
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
    InteractiveDataDisplay.deepCopyJS = deepCopyJS;
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
    InteractiveDataDisplay.syncProps = syncProps;
})(InteractiveDataDisplay || (InteractiveDataDisplay = {}));
var InteractiveDataDisplay;
(function (InteractiveDataDisplay) {
    InteractiveDataDisplay.PlotRegistry["area"] = {
        initialize: function (plotDefinition, viewState, chart) {
            var div = $("<div></div>")
                .attr("data-idd-name", plotDefinition.displayName)
                .appendTo(chart.host);
            var bandgraph = new InteractiveDataDisplay.Area(div, chart.master);
            chart.addChild(bandgraph);
            chart.assignChildOrder(bandgraph);
            return [bandgraph];
        },
        draw: function (plots, plotDefinition) {
            var plot = plots[0];
            var bandDef = plotDefinition;
            plot.draw(bandDef);
        }
    };
})(InteractiveDataDisplay || (InteractiveDataDisplay = {}));
var InteractiveDataDisplay;
(function (InteractiveDataDisplay) {
    InteractiveDataDisplay.PlotRegistry["fallback"] = {
        initialize: function (plotDefinition, viewState, chart) {
            var div = $("<div></div>")
                .attr("data-idd-name", plotDefinition.displayName)
                .appendTo(chart.host);
            var plot = new FallbackPlot(div, chart.master);
            chart.addChild(plot);
            chart.assignChildOrder(plot);
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
        Object.defineProperty(this, "isErrorVisible", {
            get: function () { return true; },
            configurable: true
        });
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
    InteractiveDataDisplay.FallbackPlot = FallbackPlot;
    FallbackPlot.prototype = new InteractiveDataDisplay.CanvasPlot;
})(InteractiveDataDisplay || (InteractiveDataDisplay = {}));
var InteractiveDataDisplay;
(function (InteractiveDataDisplay) {
    InteractiveDataDisplay.PlotRegistry["heatmap"] = {
        initialize: function (plotDefinition, viewState, chart) {
            var div = $("<div></div>")
                .attr("data-idd-name", plotDefinition.displayName)
                .appendTo(chart.host);
            var heatmap = new InteractiveDataDisplay.Heatmap(div, chart.master);
            chart.addChild(heatmap);
            chart.assignChildOrder(heatmap);
            var plots = [heatmap];
            return plots;
        },
        draw: function (plots, plotDefinition) {
            var heatmap = plotDefinition;
            plots[0].draw(heatmap, heatmap.titles);
        }
    };
})(InteractiveDataDisplay || (InteractiveDataDisplay = {}));
var InteractiveDataDisplay;
(function (InteractiveDataDisplay) {
    InteractiveDataDisplay.PlotRegistry["line"] = {
        initialize: function (plotDefinition, viewState, chart) {
            var div = $("<div></div>")
                .attr("data-idd-name", plotDefinition.displayName)
                .appendTo(chart.host);
            var plot = new InteractiveDataDisplay.Polyline(div, chart.master);
            chart.addChild(plot);
            chart.assignChildOrder(plot);
            return [plot];
        },
        draw: function (plots, plotDefinition) {
            var plot = plots[0];
            var lineDef = plotDefinition;
            plot.draw(lineDef);
        }
    };
})(InteractiveDataDisplay || (InteractiveDataDisplay = {}));
var InteractiveDataDisplay;
(function (InteractiveDataDisplay) {
    InteractiveDataDisplay.PlotRegistry["markers"] = {
        initialize: function (plotDefinition, viewState, chart) {
            var div = $("<div></div>")
                .attr("data-idd-name", plotDefinition.displayName)
                .appendTo(chart.host);
            var markerGraph = new InteractiveDataDisplay.Markers(div, chart.master);
            chart.addChild(markerGraph);
            chart.assignChildOrder(markerGraph);
            return [markerGraph];
        },
        draw: function (plots, plotDefinition) {
            var plot = plotDefinition;
            plots[0].draw(plot, plot.titles);
        }
    };
})(InteractiveDataDisplay || (InteractiveDataDisplay = {}));
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
    function area(element) {
        var plotInfo = element;
        plotInfo.kind = "area";
        return plotInfo;
    }
    Plot.area = area;
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
