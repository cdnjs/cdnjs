function IDD($, Rx) {;/**
* @param {Object} up
* @param {Object} down
* @param {Object} preventDefault
*/
$.fn.extend({
    mousewheel: function (up, down, preventDefault) {
        return this.hover(
			function () {
			    jQuery.event.mousewheel.giveFocus(this, up, down, preventDefault);
			},
			function () {
			    jQuery.event.mousewheel.removeFocus(this);
			}
		);
    },
    mousewheeldown: function (fn, preventDefault) {
        return this.mousewheel(function () { }, fn, preventDefault);
    },
    mousewheelup: function (fn, preventDefault) {
        return this.mousewheel(fn, function () { }, preventDefault);
    },
    unmousewheel: function () {
        return this.each(function () {
            var jq = jQuery(this);
            if (jq.unmouseover) {
                jq.unmouseover().unmouseout();
                jQuery.event.mousewheel.removeFocus(this);
            }
        });
    },
    unmousewheeldown: jQuery.fn.unmousewheel,
    unmousewheelup: jQuery.fn.unmousewheel
});


$.event.mousewheel = {
    giveFocus: function (el, up, down, preventDefault) {
        if (el._handleMousewheel) jQuery(el).unmousewheel();

        if (preventDefault == window.undefined && down && down.constructor != Function) {
            preventDefault = down;
            down = null;
        }

        el._handleMousewheel = function (event) {
            if (!event) event = window.event;
            if (preventDefault)
                if (event.preventDefault) event.preventDefault();
                else event.returnValue = false;
            var delta = 0;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
            } else if (event.detail) {
                delta = -event.detail / 3;
            }
            if (up && (delta > 0 || !down))
                up.apply(el, [event, delta]);
            else if (down && delta < 0)
                down.apply(el, [event, delta]);
        };

        if (window.addEventListener)
            window.addEventListener('DOMMouseScroll', el._handleMousewheel, false);
        window.onmousewheel = document.onmousewheel = el._handleMousewheel;
    },

    removeFocus: function (el) {
        if (!el._handleMousewheel) return;

        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', el._handleMousewheel, false);
        window.onmousewheel = document.onmousewheel = null;
        el._handleMousewheel = null;
    }
};;InteractiveDataDisplay = {
    MinSizeToShow: 1, // minimum size in pixels of the element to be rendered
    Padding: 20, // extra padding in pixels which is added to padding computed by the plots
    maxTickArrangeIterations: 5, // max number of iterations in loop of ticks creating
    tickLength: 10, // length of ordinary tick 
    minLabelSpace: 60, // minimum space (in px) between 2 labels on axis
    minTickSpace: 5, // minimum space (in px) between 2 ticks on axis
    minLogOrder: 4, // minimum order when labels on logarithmic scale are written with supscript
    minNumOrder: 5, // minimum order when labels on numeric scale are written with supscript
    TooltipDelay: 1, // delay (seconds) between mouse stops over an element and the tooltip appears
    TooltipDuration: 10, // duration (seconds) when tooltip is shown
    CssPrefix: '', // browser-dependent prefix for the set of css styles
    ZIndexNavigationLayer: 1000,
    ZIndexDOMMarkers: 1500,
    ZIndexTooltipLayer: 2000,
    factory: {} // table of values (key: string, plot-factory: jqDiv x master plot -> plot)
};
;InteractiveDataDisplay = InteractiveDataDisplay || {};

// Utilities functions 
InteractiveDataDisplay.Utils =
    {
        //trim: function (s) { return s.replace(/^[\s\n]+|[\s\n]+$/g, ''); },

        //Returns true if value is Array or TypedArray
        isArray: function(arr) {
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

        getDataSourceFunction: function (jqElem, defaultSource) {
            var source = jqElem.attr("data-idd-datasource");
            if (source)
                return eval(source);
            return defaultSource;
        },

        getMinMax: function (array) {
            if (!array || array.length === 0) return undefined;
            var n = array.length;
            var min, max;
            var v;
            for (var i = 0; i < n; i++) {
                v = array[i];
                if (!isNaN(v)) {
                    min = max = v;
                    break;
                }
            }
            for (i++; i < n; i++) {
                v = array[i];
                if (!isNaN(v)) {
                    if (v < min) min = v;
                    else if (v > max) max = v;
                }
            }
            return { min: min, max: max };
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

    var buildReachability = function (plotsBinding, plotsReachable) {
        // building list of plots
        var plots = [];
        for (var i = 0, length = plotsBinding.length; i < length; i++) {
            var p = plotsBinding[i];
            if (plots.indexOf(p.plot1) < 0)
                plots.push(p.plot1);
            if (plots.indexOf(p.plot2) < 0)
                plots.push(p.plot2);
        }

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
})();;// Registers new plot type
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
                break;
            case "polyline":
                plot = new InteractiveDataDisplay.Polyline(jqDiv, master);
                break;
            case "dom":
                plot = new InteractiveDataDisplay.DOMPlot(jqDiv, master);
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
        if(MutationObserver) {
          var observer = new MutationObserver(function(mutations, observer) {
            mutations.forEach(function(mutation) {
              var added=mutation.addedNodes, removed = mutation.removedNodes;
              if(added.length>0)
                  for(var i=0; i< added.length;i++) {
                      var jqAdded = $(added[i]);
                      if(jqAdded.attr("data-idd-plot")) {
                          jqAdded.removeClass("idd-plot-master").removeClass("idd-plot-dependant");
                          plot.addChild(initializePlot(jqAdded,master));
                      };
                  }
              if(removed.length>0)
                for(var i=0; i< removed.length;i++) {
                  var elem = removed[i];
                  if(typeof elem.getAttribute === "function") {
                    var plotAttr = elem.getAttribute("data-idd-plot");
                    if(plotAttr != null)
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
        
        if(plot) {
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
            throw "Invalid input parameter! It should be div of id of div of jQuery of div";

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
        if(jqElem && jqElem.hasClass("idd-plot-master")) {
            var domElem = jqElem.get(0);
            if('plot' in domElem)
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
        if(plot)
            plot.updateLayout();
        else {
            var c = jqElem.children();
            for(var i = 0;i<c.length;i++)
                InteractiveDataDisplay.updateLayouts(c.eq(i));        
        }
    }

    InteractiveDataDisplay.Event = InteractiveDataDisplay.Event || {};
    InteractiveDataDisplay.Event.appearanceChanged = jQuery.Event("appearanceChanged");
    InteractiveDataDisplay.Event.childrenChanged = jQuery.Event("childrenChanged");
    InteractiveDataDisplay.Event.isAutoFitChanged = jQuery.Event("isAutoFitEnabledChanged");
    InteractiveDataDisplay.Event.visibleRectChanged = jQuery.Event("visibleRectChanged");


    InteractiveDataDisplay.Plot = function (div, master, myCentralPart) {

        if (div && (div.hasClass("idd-plot-master") || div.hasClass("idd-plot-dependant")))
            return;

        if (div && (navigator.userAgent.match(/(iPhone|iPod|iPad)/) || navigator.userAgent.match(/Android/))) {
            div.bind('touchstart', function (e) { e.preventDefault(); });
            div.bind('touchmove', function (e) { e.preventDefault(); });
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
        var _aspectRatio;
        var _isAutoFitEnabled = true;
        var _requestFitToView = false;
        var _requestFitToViewX = false;
        var _requestFitToViewY = false;
        var _doFitOnDataTransformChanged = true;
        var _isFlatRenderingOn = false;
        var _width, _height;
        var _name = "";
        // Contains user-readable titles for data series of a plot. They should be used in tooltips and legends.
        var _titles = {};
        // The flag is set in setVisibleRegion when it is called at me as a bound plot to notify that another plot is changed his visible.
        // I set this flag to suppress echo, i.e. I will not notify bound plots about my new visible rectangle.
        // The flag is reset when any other update request is received.
        var _suppressNotifyBoundPlots = false;

        var _plotRect;


        if (div) {
            _name = div.attr("data-idd-name") || div.attr("id") || "";
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

        var _constraint = undefined;

        var that = this;

        // Plot properties
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

        var _tooltipSettings = undefined;
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

            this.master.removeChild(this);
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
            this.onChildrenChanged({ type: "add", plot: childPlot });
            this.requestUpdateLayout();
        };

        this.onChildrenChanged = function (arg) {
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
                    this.onChildrenChanged({ type: "remove", plot: child });
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
            var plots = [this];
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
        this.getLocalBounds = function (step, computedBounds) {
            if (!_localbbox)
                _localbbox = this.computeLocalBounds(step, computedBounds);
            return _localbbox;
        };

        // Computes bounds of inner content of this plot (excluding its children plots)
        // Returns a rectangle in the plot plane.
        // This should be overriden in derived plot objects.
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

        var getChildrenBounds = function () {
            var bounds = undefined;
            var plotsWithUndefinedBounds = [];
            var n = _children.length;
            for (var i = 0; i < n; i++) {
                var plot = _children[i];
                var plotBounds = plot.aggregateBounds().bounds;
                bounds = InteractiveDataDisplay.Utils.unionRects(bounds, plotBounds);
            }
        };

        // Aggregates all bounds of this plot and its children plots
        // Returns a rectangle in the plot plane.
        this.aggregateBounds = function () {

            var plots = that.getPlotsSequence();
            var bounds = undefined;

            //First path: calculating static plot rects
            var undefinedBBPlots = [];
            var n = plots.length;
            for (var i = 0; i < n; i++) {
                var plot = plots[i];
                var plotBounds = plot.getLocalBounds(1);
                if (plotBounds === undefined) {
                    undefinedBBPlots.push(plot);
                } else {
                    bounds = InteractiveDataDisplay.Utils.unionRects(bounds, plotBounds);
                }
            }

            //Second path: calculating final plot rect
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
            padding.left = padding.left + InteractiveDataDisplay.Padding || InteractiveDataDisplay.Padding;
            padding.right = padding.right + InteractiveDataDisplay.Padding || InteractiveDataDisplay.Padding;
            padding.top = padding.top + InteractiveDataDisplay.Padding || InteractiveDataDisplay.Padding;
            padding.bottom = padding.bottom + InteractiveDataDisplay.Padding || InteractiveDataDisplay.Padding;
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
                that.updateLayout();
            } else {
                that.isAnimationFrameRequested = false;

                var screenSize = that.screenSize;
                var plotRect = that.coordinateTransform.getPlotRect({ x: 0, y: 0, width: screenSize.width, height: screenSize.height }); // (x,y) is left/top            
                // rectangle in the plot plane which is visible, (x,y) is left/bottom (i.e. less) of the rectangle

                updatePlotsOutputRec(renderAll, _master, plotRect, screenSize);
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
            this.requestsUpdateLayout = true;
            if (this.isAnimationFrameRequested) return; // we use already set time out
            this.isAnimationFrameRequested = true; // because update layout includes rendering of all objects
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

        // Notifies derived plots that isRendered changed.
        // todo: make an event and bind in the derived plots
        this.onIsRenderedChanged = function () {
        };

        this.fit = function (screenSize, finalPath, plotScreenSizeChanged) {
            _width = screenSize.width;
            _height = screenSize.height;

            var outputRect = undefined;

            if (_isAutoFitEnabled || _requestFitToView) {
                var aggregated = _master.aggregateBounds();
                var bounds = aggregated.bounds;
                if (bounds.x != bounds.x || bounds.y != bounds.y || bounds.width != bounds.width || bounds.height != bounds.height)
                    bounds = { x: 0, width: 1, y: 0, height: 1 }; // todo: this is an exceptional situation which should be properly handled
                _plotRect = bounds;
                var padding = aggregated.isDefault ? { left: 0, top: 0, bottom: 0, right: 0 } : _master.aggregatePadding();
                _coordinateTransform = InteractiveDataDisplay.Utils.calcCSWithPadding(_plotRect, screenSize, padding, _master.aspectRatio);


                outputRect = _coordinateTransform.getPlotRect({ x: 0, y: 0, width: screenSize.width, height: screenSize.height });

                if (_constraint !== undefined && finalPath === true) {
                    outputRect = _constraint(outputRect, screenSize);
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

                if (_constraint !== undefined && finalPath === true && plotScreenSizeChanged === true) {
                    outputRect = _constraint(outputRect, screenSize);
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
            this.requestsUpdateLayout = false;
            if (_isMaster) {

                var oldVisibleRect = that.visibleRect;
                var screenSize = { width: _host.width(), height: _host.height() };

                if (screenSize.width <= 1 || screenSize.height <= 1)
                    return;

                var plotScreenSizeChanged = that.screenSize.width !== screenSize.width || that.screenSize.height !== screenSize.height;

                var finalSize = this.measure(screenSize, plotScreenSizeChanged);
                _requestFitToView = false;
                _requestFitToViewX = false;
                _requestFitToViewY = false;
                that.arrange(finalSize);

                var newVisibleRect = that.visibleRect;
                if (newVisibleRect.x !== oldVisibleRect.x || newVisibleRect.y !== oldVisibleRect.y || newVisibleRect.width !== oldVisibleRect.width || newVisibleRect.height !== oldVisibleRect.height) {
                    that.fireVisibleRectChanged({ visibleRect: newVisibleRect });
                }

                renderAll = true;
                updatePlotsOutput();

                // Notifying bound plots about new visible rectangle
                if (!_suppressNotifyBoundPlots) {
                    var boundPlots = InteractiveDataDisplay.Binding.getBoundPlots(this);
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

        if (_isMaster) {
            var _tooltipTimer; // descriptor of the set timer to show the tooltip
            var _tooltip; // <div> element which displays the tooltip
            var _updateTooltip;

            var foreachDependentPlot = function (plot, f) {
                var myChildren = plot.children;
                var n = myChildren.length;
                for (var i = 0; i < n; i++) {
                    var child = myChildren[i];
                    foreachDependentPlot(child, f);
                }
                f(plot);
            };

            this.enumAll = function (plot, f) {
                foreachDependentPlot(plot, f);
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

                                if (_tooltipSettings === undefined || _tooltipSettings.showCursorCoordinates !== false)
                                    tooltips.push("<div class='idd-tooltip-coordinates'>" + xd + ", " + yd + "</div>");
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
                var n = tooltips.length;
                for (var i = 0; i < n; i++) {
                    $(tooltips[i]).appendTo(_tooltip).addClass("idd-tooltip-item");
                }

                // Building content of the tooltip:
                _updateTooltip = function () {
                    if (!_tooltip) return;
                    _tooltip.empty();

                    var tooltips = getElements();
                    if (tooltips.length === 0) return 0;

                    var n = tooltips.length;
                    for (var i = 0; i < n; i++) {
                        $(tooltips[i]).appendTo(_tooltip).addClass("idd-tooltip-item");
                    }
                    return n;
                }

                var localTooltip = _tooltip;
                _tooltip.fadeIn('fast', function () {
                    localTooltip.fadeOutTimer = setTimeout(function () {
                        _updateTooltip = undefined;
                        localTooltip.fadeOut('fast');
                    }, InteractiveDataDisplay.TooltipDuration * 1000);
                });
            };

            var clearTooltip = function () {
                if (_tooltipTimer) {
                    clearTimeout(_tooltipTimer);
                    _tooltipTimer = undefined;
                }
                _updateTooltip = undefined;
                if (_tooltip) {
                    if (_tooltip.fadeOutTimer) {
                        clearTimeout(_tooltip.fadeOutTimer);
                        _tooltip.fadeOutTimer = undefined;
                    }
                    _tooltip.fadeOut('fast', function () { $(this).remove(); });
                    _tooltip = undefined;
                }
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

                clearTooltip();

                if (that.master.isToolTipEnabled) {
                    _tooltipTimer = setTimeout(function () { onShowTooltip(originHost, p); }, InteractiveDataDisplay.TooltipDelay * 1000);
                }

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

        // fires the AppearanceChanged event
        this.fireAppearanceChanged = function (propertyName) {
            this.host.trigger(InteractiveDataDisplay.Event.appearanceChanged, propertyName);
        };

        // fires the ChildrenChanged event
        this.fireChildrenChanged = function (propertyParams) {
            this.master.host.trigger(InteractiveDataDisplay.Event.childrenChanged, propertyParams);
        };

        // fires the VisibleRect event
        this.fireVisibleRectChanged = function (propertyParams) {
            clearTooltip();
            this.master.host.trigger(InteractiveDataDisplay.Event.visibleRectChanged, propertyParams);
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
                           .attr("data-idd-plot", "polyline")
                           .appendTo(this.host);
                plot = new InteractiveDataDisplay.Polyline(div, this.master);
                this.addChild(plot);
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
                plot = new InteractiveDataDisplay.Markers(div);
                this.addChild(plot);
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
                           .attr("data-idd-plot", "area")
                           .appendTo(this.host);
                plot = new InteractiveDataDisplay.Area(div);
                this.addChild(plot);
            }
            if (data !== undefined) {
                plot.draw(data);
            }

            return plot;
        };

        this.heatmap = function (name, data) {
            var plot = this.get(name);
            if (!plot) {
                var div = $("<div></div>")
                           .attr("data-idd-name", name)
                           .attr("data-idd-plot", "heatmap")
                           .appendTo(this.host);
                plot = new InteractiveDataDisplay.Heatmap(div, this.master);
                this.addChild(plot);
            }
            if (data !== undefined) {
                plot.draw(data);
            }
            return plot;
        };

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
                        that.addChild(initializePlot(jqElem, _master)); // here children of the new child will be initialized recursively
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
                var _legend = new InteractiveDataDisplay.Legend(that, legendDiv);
                Object.defineProperty(that, "legend", { get: function () { return _legend; }, configurable: false });
            }
        }, 0);

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

    InteractiveDataDisplay.Legend = function (_plot, _jqdiv) {

        var plotLegends = [];
        var divStyle = _jqdiv[0].style;

        //Stop event propagation
        InteractiveDataDisplay.Gestures.FullEventList.forEach(function (eventName) {
            _jqdiv[0].addEventListener(eventName, function (e) {
                e.stopPropagation();
            }, false);
        });

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

        divStyle.display = "none";
        _jqdiv.addClass("idd-legend");
        _jqdiv.addClass("unselectable");

        var createLegend = function () {
            createLegendForPlot(_plot);

            if (_jqdiv[0].hasChildNodes() && _isVisible) {
                divStyle.display = "block";
            }
        };

        var createLegendForPlot = function (plot) {
            var legend = plot.getLegend();

            plot.host.bind("childrenChanged",
                 function (event, params) {
                     if (params.type === "add" && _jqdiv[0].hasChildNodes() && params.plot.master == _plot.master) {
                         createLegendForPlot(params.plot);
                     }
                     else if (params.type === "remove") {
                         var removeLegendItem = function (i) {
                             var legend = plotLegends[i];
                             plotLegends.splice(i, 1);
                             legend.plot.host.unbind("childrenChanged");
                             if (legend.onLegendRemove) legend.onLegendRemove();
                             _jqdiv[0].removeChild(legend.div[0]);
                             var childDivs = legend.plot.children;
                             childDivs.forEach(function (childPlot) {
                                 for (var j = 0, len = plotLegends.length; j < len; j++)
                                     if (plotLegends[j].plot === childPlot) {
                                         removeLegendItem(plotLegends[j]);
                                     }
                             });
                             if (plotLegends.length === 0) divStyle.display = "none";
                         };

                         for (var i = 0, len = plotLegends.length; i < len; i++)
                             if (plotLegends[i].plot === params.plot) {
                                 removeLegendItem(i);
                                 break;
                             }
                     }
                     else {
                         _jqdiv[0].innerHTML = "";
                         divStyle.display = "none";
                         len = plotLegends.length;
                         for (i = 0; i < len; i++)
                             if (plotLegends[i].onLegendRemove) plotLegends[i].onLegendRemove();
                         plotLegends = [];

                         plot.host.unbind("childrenChanged");

                         createLegend();
                     }
                 });

            if (legend) {
                (legend.div).appendTo(_jqdiv);
                legend.plot = plot;
                plotLegends[plotLegends.length] = legend;
            }
            var childDivs = plot.children;
            childDivs.forEach(function (childPlot) {
                createLegendForPlot(childPlot);
            });
        };

        this.remove = function () {
            for (var i = 0, len = plotLegends.length; i < len; i++)
                if (plotLegends[i].onLegendRemove) plotLegends[i].onLegendRemove();
            plotLegends = [];

            var removeLegendForPlot = function (plot) {
                plot.host.unbind("childrenChanged");

                var childDivs = plot.children;
                childDivs.forEach(function (childPlot) {
                    removeLegendForPlot(childPlot);
                });
            };
            removeLegendForPlot(_plot);

            _jqdiv[0].innerHTML = "";
            _jqdiv.removeClass("idd-legend");
            _jqdiv.removeClass("unselectable");
        };

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

        // Gets the transform functions from data to screen coordinates.
        // Returns { dataToScreenX, dataToScreenY }
        this.getTransform = function () {
            var ct = this.coordinateTransform;
            var plotToScreenX = ct.plotToScreenX;
            var plotToScreenY = ct.plotToScreenY;
            var dataToPlotX = this.xDataTransform && this.xDataTransform.dataToPlot;
            var dataToPlotY = this.yDataTransform && this.yDataTransform.dataToPlot;
            var dataToScreenX = dataToPlotX ? function (x) { return plotToScreenX(dataToPlotX(x)); } : plotToScreenX;
            var dataToScreenY = dataToPlotY ? function (y) { return plotToScreenY(dataToPlotY(y)); } : plotToScreenY;

            return { dataToScreenX: dataToScreenX, dataToScreenY: dataToScreenY };
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

        // Initialization (#1)
        var initializer = InteractiveDataDisplay.Utils.getDataSourceFunction(div, InteractiveDataDisplay.readCsv);
        var initialData = initializer(div);

        this.base = InteractiveDataDisplay.CanvasPlot;
        this.base(div, master);

        var _y;
        var _x;
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
        }

        this.draw = function (data) {
            var y = data.y;
            if (!y) throw "Data series y is undefined";
            var n = y.length;

            if (!data.x) {
                data.x = InteractiveDataDisplay.Utils.range(0, n - 1);
            }
            if (n != data.x.length) throw "Data series x and y have different lengths";
            _y = y;
            _x = data.x;

            // styles:
            _thickness = typeof data.thickness != "undefined" ? data.thickness : _thickness;
            if (typeof (_thickness) != "number")
                _thickness = parseFloat(_thickness) || 1;
            _stroke = typeof data.stroke != "undefined" ? data.stroke : _stroke;
            _lineCap = typeof data.lineCap != "undefined" ? data.lineCap : _lineCap;
            _lineJoin = typeof data.lineJoin != "undefined" ? data.lineJoin : _lineJoin;

            this.invalidateLocalBounds();

            this.requestNextFrameOrUpdate();
            this.fireAppearanceChanged();
        };

        // Returns a rectangle in the plot plane.
        this.computeLocalBounds = function (step, computedBounds) {
            var dataToPlotX = this.xDataTransform && this.xDataTransform.dataToPlot;
            var dataToPlotY = this.yDataTransform && this.yDataTransform.dataToPlot;
            return InteractiveDataDisplay.Utils.getBoundingBoxForArrays(_x, _y, dataToPlotX, dataToPlotY);
        };

        // Returns 4 margins in the screen coordinate system
        this.getLocalPadding = function () {
            var padding = _thickness / 2;
            return { left: padding, right: padding, top: padding, bottom: padding };
        };


        this.getTooltip = function (xd, yd, px, py) {
            if (_x === undefined || _y == undefined)
                return;
            var n = _y.length;
            if (n == 0) return;

            var ct = this.coordinateTransform;
            var sx = ct.plotToScreenX(px);
            var sy = ct.plotToScreenY(py);

            var context = this.getContext(false);
            var myImageData = context.getImageData(sx, sy, 1, 1);
            if (myImageData.data[0] === 0 && myImageData.data[1] === 0 && myImageData.data[2] === 0 && myImageData.data[3] === 0)
                return undefined;
            return "<div>" + (this.name || "Polyline") + "</div>";
        };

        this.renderCore = function (plotRect, screenSize) {
            InteractiveDataDisplay.Polyline.prototype.renderCore.call(this, plotRect, screenSize);

            if (_x === undefined || _y == undefined)
                return;
            var n = _y.length;
            if (n == 0) return;

            var t = this.getTransform();
            var dataToScreenX = t.dataToScreenX;
            var dataToScreenY = t.dataToScreenY;

            // size of the canvas
            var w_s = screenSize.width;
            var h_s = screenSize.height;
            var xmin = 0, xmax = w_s;
            var ymin = 0, ymax = h_s;

            var context = this.getContext(true);
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

        this.getLegend = function () {
            var div = $("<div class='idd-legend-item'></div>");

            var canvas = $("<canvas style='margin-right: 15px'></canvas>").appendTo(div);
            canvas[0].width = 20;
            canvas[0].height = 20;
            var ctx = canvas.get(0).getContext("2d");
            ctx.strokeStyle = _stroke;
            ctx.lineWidth = _thickness;
            ctx.moveTo(0, 0);
            ctx.lineTo(20, 20);
            ctx.stroke();

            var that = this;
            var nameDiv = $("<span class='idd-legend-item-title'></span>").appendTo(div);
            var setName = function () {
                nameDiv.text(that.name);
            }
            setName();

            this.host.bind("appearanceChanged",
                function (event, propertyName) {
                    if (!propertyName || propertyName == "name")
                        setName();

                    ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
                    ctx.strokeStyle = _stroke;
                    ctx.lineWidth = _thickness;
                    ctx.moveTo(0, 0);
                    ctx.lineTo(20, 20);
                    ctx.stroke();
                });

            var that = this;

            var onLegendRemove = function () {
                that.host.unbind("appearanceChanged");

                div[0].innerHTML = "";
                div.removeClass("idd-legend-item");
            };

            return { div: div, onLegendRemove: onLegendRemove };
        };

        // Initialization 
        if (initialData && typeof initialData.y != 'undefined')
            this.draw(initialData);
    }
    InteractiveDataDisplay.Polyline.prototype = new InteractiveDataDisplay.CanvasPlot;



    // Renders set of DOM elements in the data space of this plot
    InteractiveDataDisplay.DOMPlot = function (host, master) {
        this.base = InteractiveDataDisplay.Plot;
        this.base(host, master);

        // array of DOM elements located in the data space of this plot
        var domElements = [];

        var addElement = function (jqElem, scaleMode, xld, ytd, wd, hd, ox, oy) {
            if (jqElem[0].tagName.toLowerCase() !== "div") throw "DOMPlot supports only DIV elements";
            jqElem._x = xld;
            jqElem._y = ytd;
            jqElem._width = wd && wd > 0 ? wd : 1;
            jqElem._height = hd && hd > 0 ? hd : 1;
            jqElem._originX = ox || 0;
            jqElem._originY = oy || 0;
            jqElem._scale = scaleMode || 'element';

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
                    for (var i = 0, j = 0; i < n; i++, j++) {
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
        this.set = function (element, x, y, width, height) {
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

            this.invalidateLocalBounds();
            this.requestUpdateLayout();
        };


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

        this.renderCore = function (plotRect, screenSize) {
            InteractiveDataDisplay.GridlinesPlot.prototype.renderCore.call(this, plotRect, screenSize);

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
    }
    InteractiveDataDisplay.GridlinesPlot.prototype = new InteractiveDataDisplay.CanvasPlot;
}();
;
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
                    data[header[j - j0]][i] = parseFloat(elems[j]);
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
                data.f = f;
            }
        }
    }
    return data;
};
;InteractiveDataDisplay.InitializeAxis = function (div, params) {
    
    if (div.hasClass("idd-axis"))
        throw "The div element already is initialized as an axis";

    var axisType = div.attr("data-idd-axis");
    switch (axisType) {
        case "numeric":
            return new InteractiveDataDisplay.NumericAxis(div);
            break;
        case "log":
            return new InteractiveDataDisplay.LogarithmicAxis(div);
            break;
        case "labels":
            return new InteractiveDataDisplay.LabelledAxis(div, params);
            break;
    }
};

// object that provides functions to render ticks    
InteractiveDataDisplay.TicksRenderer = function (div, source) {

    if (typeof (Modernizr) != 'undefined' && div) {
        if (!Modernizr.canvas) {
            div.replaceWith('<div">Browser does not support HTML5 canvas</div>');
        }
    }

    if (div && div.hasClass("idd-axis"))
        return;

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

    // canvas to render ticks
    var canvas = $("<canvas id='canvas' style='position:relative; float:left'></canvas>");
    // div to place labels
    var labelsDiv = $("<div id='labelsDiv' style='position:relative; float:left'></div>");

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
    var _deltaRange;
    var _canvasHeight;

    // checks if size of host element changed and refreshes size of canvas and labels' div
    this.updateSize = function () {
        var prevSize = _size;
        if (div) {
            _width = div.outerWidth(false);
            _height = div.outerHeight(false);
        }
        if (isHorizontal) {
            _size = _width;
            if (_size != prevSize) {
                canvas[0].width = _size;
                labelsDiv.css("width", _size);
            }
        }
        else {
            _size = _height;
            if (_size != prevSize) {
                canvas[0].height = _size;
                labelsDiv.css("height", _size);
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
    if (_host) {
        if (_host[0].currentStyle) {
            fontSize = _host[0].currentStyle["font-size"];
            ctx.font = fontSize + _host[0].currentStyle["font-family"];
        }
        else if (document.defaultView && document.defaultView.getComputedStyle) {
            fontSize = document.defaultView.getComputedStyle(_host[0], null).getPropertyValue("font-size");
            ctx.font = fontSize + document.defaultView.getComputedStyle(_host[0], null).getPropertyValue("font-family");
        }
        else if (_host[0].style) {
            fontSize = _host[0].style["font-size"];
            ctx.font = fontSize + _host[0].style["font-family"];
        }
    }

    Object.defineProperty(this, "host", { get: function () { return _host; }, configurable: false });
    Object.defineProperty(this, "mode", { get: function () { return _mode; }, configurable: false });
    Object.defineProperty(this, "tickSource", { get: function () { return _tickSource; }, configurable: false });
    Object.defineProperty(this, "range", { get: function () { return _range; }, configurable: false });
    Object.defineProperty(this, "ticks", { get: function () { return _ticks; }, configurable: false });

    Object.defineProperty(this, "DesiredSize", { get: function () { return { width: _width, height: _height }; }, configurable: false });
    Object.defineProperty(this, "axisSize", { get: function () { return _size; }, configurable: false });
    Object.defineProperty(this, "deltaRange", { get: function () { return _deltaRange; }, configurable: false });

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

    // calculate and cashe positions of ticks and labels' size
    var getPositions = function (ticks) {
        var len = ticks.length;
        ticksInfo = new Array(len);
        var size, width, height;
        var h = isHorizontal ? _canvasHeight : 0;
        for (var i = 0; i < len; i++) {
            var tick = ticks[i];
            if (tick.label) {
                size = tick.label._size;
                width = size.width;
                height = size.height;
                if (width == 0)
                    width = ctx.measureText(_tickSource.getInnerText(tick.position)).width;
                if (height == 0)
                    height = (isHorizontal ? h : parseFloat(fontSize)) + 8;
                ticksInfo[i] = { position: that.getCoordinateFromTick(tick.position), width: width, height: height, hasLabel: true };
            }
            else
                ticksInfo[i] = { position: that.getCoordinateFromTick(tick.position), width: 0, height: 0, hasLabel: false };
        }
    };

    // private function to check whether ticks overlay each other
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

        var minTicks = false;
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
                _height = text_size + canvasSize;
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

        // render ticks and labels (if necessary)
        // if range is single point - render only label in the middle of axis
        var x, shift;
        for (var i = 0; i < len; i++) {
            x = ticksInfo[i].position;
            if (isHorizontal) {
                shift = ticksInfo[i].width / 2;
                if (minTicks) {
                    if (i == 0) shift *= 2;
                    else if (i == len - 1) shift = 0;
                }
                else {
                    if (i == 0 && x < shift) shift = 0;
                    else if (i == len - 1 && x + shift > _size) shift *= 2;
                }

                if (!_ticks[i].invisible) ctx.fillRect(x, 1, 1, InteractiveDataDisplay.tickLength);
                if (_ticks[i].label) _ticks[i].label.css("left", x - shift);
            }
            else {
                x = (_size - 1) - x;
                shift = ticksInfo[i].height / 2;
                if (minTicks) {
                    if (i == 0) shift = 0;
                    else if (i == len - 1) shift *= 2;
                }
                else {
                    if (i == 0 && x + shift > _size) shift *= 2;
                    else if (i == len - 1 && x < shift) shift = 0;
                }

                if (!_ticks[i].invisible) ctx.fillRect(1, x, InteractiveDataDisplay.tickLength, 1);
                if (_ticks[i].label) {
                    _ticks[i].label.css("top", x - shift);
                    if (_mode == "left")
                        _ticks[i].label.css("left", text_size - (this.rotateLabels ? ticksInfo[i].height : ticksInfo[i].width));
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
            }
        }
    };

    // function to set new _range
    this.update = function (newRange) {
        if (newRange) _range = newRange;
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

    this.base(div, new InteractiveDataDisplay.NumericTickSource());
}
InteractiveDataDisplay.NumericAxis.prototype = new InteractiveDataDisplay.TicksRenderer;

InteractiveDataDisplay.LogarithmicAxis = function (div) {
    this.base = InteractiveDataDisplay.TicksRenderer;

    var logE10 = Math.log(10);

    this.getCoordinateFromTick = function (x) {
        var delta = this.deltaRange;
        if (isFinite(delta)) {
            var coord = Math.log(x) / logE10;
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

    if (params && params.rotate)
        this.rotateLabels = true;

    this.base(div, new InteractiveDataDisplay.LabelledTickSource(params));
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

    // gets first available div (not used) or creates new one
    this.getDiv = function (x) {
        var inner = this.getInnerText(x);
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
                var div = divPool[i][0];
                div.innerHTML = inner;
                divPool[i]._size = { width: div.offsetWidth, height: div.offsetHeight };
                return divPool[i];
            }
            else {
                var div = $("<div>" + inner + "</div>");
                isUsedPool[len] = true;
                divPool[len] = div;
                inners[len] = inner;
                styles[len] = div[0].style;
                div._size = undefined;
                len++;
                return div;
            }
        }
    };

    // function to get div's innerText
    this.getInnerText = function (x) {
        return x;
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

    // rounds value (x) to specific number (n) of decimal digits
    this.round = function (x, n) {
        if (n <= 0) {
            if (-n > 15) return parseFloat(x.toFixed(15));
            return parseFloat(x.toFixed(-n));
        }
        else {
            var degree = Math.pow(10, n - 1);
            return Math.round(x / degree) * degree;
        }
    };
}

// tick source for decimal axis
InteractiveDataDisplay.NumericTickSource = function () {
    this.base = InteractiveDataDisplay.TickSource;
    this.base();

    var that = this;

    var log10 = 1 / Math.log(10);
    var delta, beta;

    this.getInnerText = function (x) {
        if (x == 0) return x;
        else if (beta >= InteractiveDataDisplay.minNumOrder)
            return this.round(x / Math.pow(10, beta), -1) + "e+" + beta;
        return this.round(x, beta);
    };

    this.getTicks = function (_range) {
        InteractiveDataDisplay.NumericTickSource.prototype.getTicks.call(this, _range);

        delta = 1;
        beta = Math.floor(Math.log(this.finish - this.start) * log10);

        return createTicks();
    };

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
                    ticks[l] = { position: x, label: that.getDiv(x) };
                    l++;
                }
            }
        }
        else {
            ticks[0] = { position: that.start, label: that.getDiv(that.start), invisible: true };
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

        beta = Math.floor(Math.log(this.finish - this.start) * log10);

        if (isFinite(beta)) {
            var step = Math.pow(10, beta);

            var min = Math.floor(that.start / step) * step;
            if (min < that.start) min += step;
            var max = Math.floor(that.finish / step) * step;
            if (max > that.finish) max -= step;

            if (min != max) {
                ticks[0] = { position: min, label: that.getDiv(that.round(min, beta)) };
                ticks[1] = { position: max, label: that.getDiv(that.round(max, beta)) };
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
                        ticks[l] = { position: x, label: that.getDiv(that.round(x, beta)) };
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
    this.getInnerText = function (x) {
        if (Math.abs(x) < InteractiveDataDisplay.minLogOrder)
            return Math.pow(10, x);
        else
            return "10<sup>" + x + "</sup>";
    };

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
    var _ticks = [];

    // if labels and ticks are defined - cashe them
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
                    ticks[l] = { position: value, label: div };
                    l++;
                }
                m += currStep;
            }
        }

            // otherwise render label between two neighboring ticks
        else {
            var m1 = 0;
            while (_ticks[m1] < that.start) m1++;
            if (m1 > 0) m1--;

            var m2 = _ticks.length - 1;
            while (_ticks[m2] > that.finish) m2--;
            if (m2 < _ticks.length - 1) m2++;

            var count = m2 - m1 + 1;
            var l = 0;

            var value2 = _ticks[m1];
            for (var i = 0; i < count; i++) {
                value = value2;
                if (value >= that.start && value <= that.finish) {
                    ticks[l] = { position: value };
                    l++;
                }
                m1++;
                value2 = _ticks[m1];
                var scale = 1;
                if (step > 1) scale /= step;
                if (i != count - 1) {
                    var v = (Math.min(value2, that.finish) + Math.max(value, that.start)) / 2;
                    if (v >= that.start && v <= that.finish) {
                        var div = that.getDiv(_labels[m1 - 1]);
                        if (rotateLabels) {
                            div.addClass('idd-verticalText');
                            div.css("transform", "rotate(-90deg) scale(" + scale + ", " + scale + ")");
                        }
                        ticks[l] = { position: v, label: div, invisible: true };
                        l++;
                    }
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

        if (delta <= 0 && _labels.length == 0) {
            var div = that.getDiv(_labels[0]);
            if (rotateLabels) {
                div.addClass('idd-verticalText');
            }
            ticks[0] = { position: _ticks[0], label: div };

            div = that.getDiv(_labels[_labels.length - 1]);
            if (rotateLabels) {
                div.addClass('idd-verticalText');
            }
            ticks[1] = { position: _ticks[_ticks.length - 1], label: div };
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
    var _points;
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

    var colours = {
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
    };

    if (typeof (hexColor) !== "string")
        throw "wrong definition of color: must be a string";

    var _r, _g, _b, _a;

    if (colours[hexColor.toLowerCase()]) {
        var hex = colours[hexColor.toLowerCase()];
        hexColor = hex;
    }
    if (hexColor.charAt(0) == '#') {
        if (hexColor.length == 7) {
            _a = 1;
            _r = parseInt(hexColor.substring(1, 3), 16);
            _g = parseInt(hexColor.substring(3, 5), 16);
            _b = parseInt(hexColor.substring(5, 7), 16);
        }
        else if (hexColor.length == 9) {
            _r = parseInt(hexColor.substring(1, 3), 16);
            _g = parseInt(hexColor.substring(3, 5), 16);
            _b = parseInt(hexColor.substring(5, 7), 16);
            _a = parseInt(hexColor.substring(7, 9), 16) / 255.0;
        }
        else throw "wrong definition of hex color";
    }
    else throw "wrong definition of hex color";

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

    // Get initial settings from options
    if (options !== undefined) {
        if (options.height !== undefined)
            _height = options.height;
        if (options.width !== undefined)
            _width = options.width;
        if (options.axisVisible !== undefined)
            _axisVisible = options.axisVisible;
    }

    // canvas to render palette
    var _canvas = $("<canvas height='" + _height + "px'" + "width='" + _width + "px' style='display: block'></canvas>");
    _host[0].appendChild(_canvas[0]);

    var _axisDiv = null;
    var _axis = null;

    function addAxis() {
        _axisDiv = $("<div data-idd-placement='bottom' style='width: " + _width + "px'></div>");
        _host[0].appendChild(_axisDiv[0]);
        _axis = new InteractiveDataDisplay.NumericAxis(_axisDiv);
        if (_palette && !_palette.isNormalized) // Take axis values from fixed palette
            _axis.update({ min: _palette.range.min, max: _palette.range.max });
        else if (_dataRange) // Try to take axis values from data range
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

    var _palette = palette;
    Object.defineProperty(this, "palette", {
        get: function () { return _palette; },
        set: function (value) {
            if (value) {
                _palette = value;
                if (_axisVisible && (!_palette.isNormalized || !_dataRange))
                    _axis.update({ min: _palette.range.min, max: _palette.range.max });
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
        _axisDiv = $("<div data-idd-placement='bottom' style='width: " + _width + "px; margin-top: -1px'></div>");
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



InteractiveDataDisplay.palettes = {
    grayscale: new InteractiveDataDisplay.ColorPalette(true, { min: 0, max: 1 }, [{ x: 0.0, rightColor: { h: 0, s: 0, l: 0, a: 1 }, leftColor: { h: 0, s: 0, l: 0, a: 1 } },
                                                              { x: 1.0, rightColor: { h: 0, s: 0, l: 1, a: 1 }, leftColor: { h: 0, s: 0, l: 1, a: 1 } }])
};

;InteractiveDataDisplay.Gestures = {};
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
            return g.left.scale === g.right.scale;
        }).select(function (g) {
            return new InteractiveDataDisplay.Gestures.PanGesture(g.left.pageX - g.right.pageX, g.left.pageY - g.right.pageY, "Touch");
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

    var gestureStart = Rx.Observable.fromEvent(vc, "gesturestart");
    var gestureChange = Rx.Observable.fromEvent(vc, "gesturechange");
    var gestureEnd = Rx.Observable.fromEvent(_doc, "gestureend");
    var touchCancel = Rx.Observable.fromEvent(_doc, "touchcancel");

    var gestures = gestureStart.selectMany(function (o) {
        return gestureChange.takeUntil(gestureEnd.merge(touchCancel)).skip(1).zip(gestureChange, function (left, right) {
            return { "left": left.originalEvent, "right": right.originalEvent };
        }).where(function (g) {
            return g.left.scale !== g.right.scale && g.right.scale !== 0;
        }).select(function (g) {
            var delta = g.left.scale / g.right.scale;
            return new InteractiveDataDisplay.Gestures.ZoomGesture(o.originalEvent.layerX, o.originalEvent.layerY, 1 / delta, "Touch");
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
    { isInDomain: function (x) { return x > 0; } },
    "log10"
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
;InteractiveDataDisplay.Navigation = function (_plot, _setVisibleRegion) {
    var plot = _plot;
    var that = this;

    var setVisibleRegion = _setVisibleRegion;

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

    //Calculates panned plotRect
    var panPlotRect = InteractiveDataDisplay.NavigationUtils.calcPannedRect;

    //Calculates zoomed plotRect
    var zoomPlotRect = InteractiveDataDisplay.NavigationUtils.calcZoomedRect;

    var getVisible = function () {
        var size = plot.screenSize;
        var ct = plot.coordinateTransform;
        var vis = ct.getPlotRect({ x: 0, y: 0, width: size.width, height: size.height });

        return { plotRect: vis, screenSize: size, cs: ct };
    }

    var subscribeToAnimation = function () {
        if (_animation) {
            return _animation.currentObservable.subscribe(function (args) {
                if (args.isLast) {
                    plot.isInAnimation = false;
                }
                setVisibleRegion(args.plotRect, { syncUpdate: args.syncUpdate });
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
        document.addEventListener('touchmove', function (e) { e.preventDefault(); });
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
;InteractiveDataDisplay.heatmapBackgroundRendererCodeBase64 = "SW50ZXJhY3RpdmVEYXRhRGlzcGxheSA9IHR5cGVvZiBJbnRlcmFjdGl2ZURhdGFEaXNwbGF5ID09ICd1bmRlZmluZWQnID8ge30gOiBJbnRlcmFjdGl2ZURhdGFEaXNwbGF5OwogCkludGVyYWN0aXZlRGF0YURpc3BsYXkuRGF0YVRyYW5zZm9ybSA9IGZ1bmN0aW9uIChkYXRhVG9QbG90LCBwbG90VG9EYXRhLCBkb21haW4sIHR5cGUpIHsKICAgIHRoaXMuZGF0YVRvUGxvdCA9IGRhdGFUb1Bsb3Q7CiAgICB0aGlzLnBsb3RUb0RhdGEgPSBwbG90VG9EYXRhOwoKICAgIHRoaXMuZG9tYWluID0gZG9tYWluIHx8IHsKICAgICAgICBpc0luRG9tYWluOiBmdW5jdGlvbiAodmFsdWUpIHsKICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfQogICAgfTsKCiAgICB0aGlzLnR5cGUgPSB0eXBlOwp9OwoKdmFyIG1lcmNhdG9yX21heFBoaSA9IDg1LjA1MTEyODc4OyAvLzg3LjExNDc1NzYzNjMzODQ7IC8vIGRlZwp2YXIgbWVyY2F0b3JfUiA9IG1lcmNhdG9yX21heFBoaSAvIE1hdGgubG9nKE1hdGgudGFuKG1lcmNhdG9yX21heFBoaSAqIE1hdGguUEkgLyAzNjAuMCArIE1hdGguUEkgLyA0KSk7CkludGVyYWN0aXZlRGF0YURpc3BsYXkubWVyY2F0b3JUcmFuc2Zvcm0gPSBuZXcgSW50ZXJhY3RpdmVEYXRhRGlzcGxheS5EYXRhVHJhbnNmb3JtKAogICAgZnVuY3Rpb24gKHBoaV9kZWcpIHsKICAgICAgICBpZiAocGhpX2RlZyA+PSAtbWVyY2F0b3JfbWF4UGhpICYmIHBoaV9kZWcgPD0gbWVyY2F0b3JfbWF4UGhpKQogICAgICAgICAgICByZXR1cm4gbWVyY2F0b3JfUiAqIE1hdGgubG9nKE1hdGgudGFuKE1hdGguUEkgKiAocGhpX2RlZyArIDkwKSAvIDM2MCkpOwogICAgICAgIGVsc2UgcmV0dXJuIHBoaV9kZWc7CiAgICB9LAogICAgZnVuY3Rpb24gKHkpIHsKICAgICAgICBpZiAoLW1lcmNhdG9yX21heFBoaSA8PSB5ICYmIHkgPD0gbWVyY2F0b3JfbWF4UGhpKSB7CiAgICAgICAgICAgIHJldHVybiAzNjAgKiBNYXRoLmF0YW4oTWF0aC5leHAoeSAvIG1lcmNhdG9yX1IpKSAvIE1hdGguUEkgLSA5MDsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHk7CiAgICB9LAogICAgdW5kZWZpbmVkLAogICAgIm1lcmNhdG9yIgopOwoKCk1hdGguTE9HRTEwID0gTWF0aC5sb2coMTApOwoKSW50ZXJhY3RpdmVEYXRhRGlzcGxheS5sb2dUcmFuc2Zvcm0gPSBuZXcgSW50ZXJhY3RpdmVEYXRhRGlzcGxheS5EYXRhVHJhbnNmb3JtKAogICAgZnVuY3Rpb24gKHhfZCkgewogICAgICAgIHJldHVybiBNYXRoLmxvZyh4X2QpIC8gTWF0aC5MT0dFMTA7CiAgICB9LAogICAgZnVuY3Rpb24gKHhfcCkgewogICAgICAgIHJldHVybiBNYXRoLnBvdygxMCwgeF9wKTsKICAgIH0sCiAgICB7IGlzSW5Eb21haW46IGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ID4gMDsgfSB9LAogICAgImxvZzEwIgopOztzZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkgew0KICAgIHZhciB4c2NhbGUgPSBldmVudC5kYXRhLnNjYWxlWCwgeG9mZnNldCA9IGV2ZW50LmRhdGEub2Zmc2V0WCwgeXNjYWxlID0gZXZlbnQuZGF0YS5zY2FsZVksIHlvZmZzZXQgPSBldmVudC5kYXRhLm9mZnNldFk7DQogICAgdmFyIGRhdGFUb1NjcmVlblgsIGRhdGFUb1NjcmVlblk7DQogICAgdmFyIGhhc2R0WCwgaGFzZHRZOw0KDQogICAgaWYgKHR5cGVvZiBldmVudC5kYXRhLnhEYXRhVHJhbnNmb3JtID09ICdzdHJpbmcnKSB7DQogICAgICAgIHZhciBkdCA9IGdldERhdGFUcmFuc2Zvcm0oZXZlbnQuZGF0YS54RGF0YVRyYW5zZm9ybSk7DQogICAgICAgIHZhciBmID0gZHQuZGF0YVRvUGxvdDsNCiAgICAgICAgaGFzZHRYID0gdHJ1ZTsNCiAgICAgICAgZGF0YVRvU2NyZWVuWCA9IGZ1bmN0aW9uICh4KSB7DQogICAgICAgICAgICByZXR1cm4gZih4KSAqIHhzY2FsZSArIHhvZmZzZXQ7DQogICAgICAgIH07DQogICAgfSBlbHNlIHsNCiAgICAgICAgaGFzZHRYID0gZmFsc2U7DQogICAgICAgIGRhdGFUb1NjcmVlblggPSBmdW5jdGlvbiAoeCkgew0KICAgICAgICAgICAgcmV0dXJuIHhzY2FsZSAqIHggKyB4b2Zmc2V0Ow0KICAgICAgICB9Ow0KICAgIH0NCiAgICBpZiAodHlwZW9mIGV2ZW50LmRhdGEueURhdGFUcmFuc2Zvcm0gPT0gJ3N0cmluZycpIHsNCiAgICAgICAgdmFyIGR0ID0gZ2V0RGF0YVRyYW5zZm9ybShldmVudC5kYXRhLnlEYXRhVHJhbnNmb3JtKTsNCiAgICAgICAgdmFyIGYgPSBkdC5kYXRhVG9QbG90Ow0KICAgICAgICBoYXNkdFkgPSB0cnVlOw0KICAgICAgICBkYXRhVG9TY3JlZW5ZID0gZnVuY3Rpb24gKHkpIHsNCiAgICAgICAgICAgIHJldHVybiB5b2Zmc2V0IC0gZih5KSAqIHlzY2FsZTsNCiAgICAgICAgfTsNCiAgICB9IGVsc2Ugew0KICAgICAgICBoYXNkdFkgPSBmYWxzZTsNCiAgICAgICAgZGF0YVRvU2NyZWVuWSA9IGZ1bmN0aW9uICh5KSB7DQogICAgICAgICAgICByZXR1cm4geW9mZnNldCAtIHkgKiB5c2NhbGU7DQogICAgICAgIH07DQogICAgfQ0KDQogICAgdmFyIHdpZHRoID0gZXZlbnQuZGF0YS53aWR0aDsNCiAgICB2YXIgaGVpZ2h0ID0gZXZlbnQuZGF0YS5oZWlnaHQ7DQoNCiAgICBpZiAoZXZlbnQuZGF0YS54Lmxlbmd0aCAhPSBldmVudC5kYXRhLmYubGVuZ3RoKSB7DQogICAgICAgIHJlbmRlck1hdHJpeChldmVudC5kYXRhLmltYWdlLCB3aWR0aCwgaGVpZ2h0LCBldmVudC5kYXRhLngsIGV2ZW50LmRhdGEueSwgZXZlbnQuZGF0YS5mLCBldmVudC5kYXRhLmZtaW4sIGV2ZW50LmRhdGEuZm1heCwgZXZlbnQuZGF0YS5wYWxldHRlLCBldmVudC5kYXRhLnBsb3RSZWN0LCBkYXRhVG9TY3JlZW5YLCBkYXRhVG9TY3JlZW5ZLCBoYXNkdFgsIGhhc2R0WSk7DQogICAgfSBlbHNlIHsNCiAgICAgICAgdmFyIHNjcmVlblRvRGF0YVgsIHNjcmVlblRvRGF0YVk7DQogICAgICAgIHhzY2FsZV9yID0gMSAvIHhzY2FsZTsNCiAgICAgICAgeXNjYWxlX3IgPSAxIC8geXNjYWxlOw0KICAgICAgICBpZiAoaGFzZHRYKSB7DQogICAgICAgICAgICB2YXIgcGxvdFRvRGF0YSA9IGR0LnBsb3RUb0RhdGE7DQogICAgICAgICAgICBzY3JlZW5Ub0RhdGFYID0gZnVuY3Rpb24gKHhzKSB7DQogICAgICAgICAgICAgICAgcmV0dXJuIHBsb3RUb0RhdGEoKHhzIC0geG9mZnNldCkgKiB4c2NhbGVfcik7DQogICAgICAgICAgICB9Ow0KICAgICAgICB9IGVsc2Ugew0KICAgICAgICAgICAgc2NyZWVuVG9EYXRhWCA9IGZ1bmN0aW9uICh4cykgew0KICAgICAgICAgICAgICAgIHJldHVybiAoeHMgLSB4b2Zmc2V0KSAqIHhzY2FsZV9yOw0KICAgICAgICAgICAgfTsNCiAgICAgICAgfQ0KICAgICAgICBpZiAoaGFzZHRZKSB7DQogICAgICAgICAgICB2YXIgcGxvdFRvRGF0YSA9IGR0LnBsb3RUb0RhdGE7DQogICAgICAgICAgICBzY3JlZW5Ub0RhdGFZID0gZnVuY3Rpb24gKHlzKSB7DQogICAgICAgICAgICAgICAgcmV0dXJuIHBsb3RUb0RhdGEoKHlvZmZzZXQgLSB5cykgKiB5c2NhbGVfcik7DQogICAgICAgICAgICB9Ow0KICAgICAgICB9IGVsc2Ugew0KICAgICAgICAgICAgc2NyZWVuVG9EYXRhWSA9IGZ1bmN0aW9uICh5cykgew0KICAgICAgICAgICAgICAgIHJldHVybiAoeW9mZnNldCAtIHlzKSAqIHlzY2FsZV9yOw0KICAgICAgICAgICAgfTsNCiAgICAgICAgfQ0KICAgICAgICByZW5kZXJHcmFkaWVudChldmVudC5kYXRhLmltYWdlLCB3aWR0aCwgaGVpZ2h0LCBldmVudC5kYXRhLngsIGV2ZW50LmRhdGEueSwgZXZlbnQuZGF0YS5mLCBldmVudC5kYXRhLmZtaW4sIGV2ZW50LmRhdGEuZm1heCwgZXZlbnQuZGF0YS5wYWxldHRlLCBldmVudC5kYXRhLnBsb3RSZWN0LCBkYXRhVG9TY3JlZW5YLCBzY3JlZW5Ub0RhdGFYLCBkYXRhVG9TY3JlZW5ZLCBzY3JlZW5Ub0RhdGFZLCBoYXNkdFgsIGhhc2R0WSk7DQogICAgfQ0KICAgIGV2ZW50LmRhdGEueCA9IHVuZGVmaW5lZDsNCiAgICBldmVudC5kYXRhLnkgPSB1bmRlZmluZWQ7DQogICAgZXZlbnQuZGF0YS5mID0gdW5kZWZpbmVkOw0KICAgIGV2ZW50LmRhdGEucGFsZXR0ZSA9IHVuZGVmaW5lZDsNCiAgICBzZWxmLnBvc3RNZXNzYWdlKGV2ZW50LmRhdGEpOw0KfTsNCg0KdmFyIGdldERhdGFUcmFuc2Zvcm0gPSBmdW5jdGlvbiAodHlwZSkgew0KICAgIGlmICh0eXBlID09ICdtZXJjYXRvcicpDQogICAgICAgIHJldHVybiBJbnRlcmFjdGl2ZURhdGFEaXNwbGF5Lm1lcmNhdG9yVHJhbnNmb3JtOw0KICAgIHRocm93ICdVbmtub3duIGRhdGEgdHJhbnNmb3JtJzsNCn07DQoNCg0KdmFyIHJlbmRlck1hdHJpeCA9IGZ1bmN0aW9uIChpbWFnZSwgd2lkdGgsIGhlaWdodCwgeCwgeSwgZiwgZm1pbiwgZm1heCwgcGFsZXR0ZSwgcGxvdFJlY3QsIGRhdGFUb1NjcmVlblgsIGRhdGFUb1NjcmVlblksIGhhc0RhdGFUcmFuc2Zvcm1YLCBoYXNEYXRhVHJhbnNmb3JtWSkgew0KICAgIHZhciBuID0geC5sZW5ndGg7DQogICAgdmFyIG0gPSB5Lmxlbmd0aDsNCiAgICB2YXIgaW1hZ2VEYXRhID0gaW1hZ2UuZGF0YTsNCiAgICB2YXIgdyA9IHdpZHRoOw0KICAgIHZhciBoID0gaGVpZ2h0Ow0KDQogICAgdmFyIGkwLCBqMDsNCiAgICB2YXIgeDAsIHkwOyAvLyBpbiBkYXRhIHNwYWNlDQoNCg0KICAgIC8vIHByZWNvbXB1dGluZyB5IGluIHNjcmVlbiBjb29yZGluYXRlczoNCiAgICB2YXIgeXNjciA9IG5ldyBGbG9hdDMyQXJyYXkobSk7DQogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtOyBpKyspDQogICAgICAgIHlzY3JbaV0gPSBkYXRhVG9TY3JlZW5ZKHlbaV0pIHwgMDsgLy8gZmxvb3I7DQoNCiAgICAvLyBzdGFydCBjZWxsDQogICAgdmFyIGxlZnRwID0gcGxvdFJlY3QueDsNCiAgICB2YXIgcmlnaHRwID0gbGVmdHAgKyBwbG90UmVjdC53aWR0aDsNCiAgICBpZiAoaGFzRGF0YVRyYW5zZm9ybVgpIHsNCiAgICAgICAgZm9yIChpMCA9IDA7IGkwIDwgbjsgaTArKykgew0KICAgICAgICAgICAgaWYgKGRhdGFUb1NjcmVlblgoeFtpMF0pID49IDApIHsNCiAgICAgICAgICAgICAgICBpZiAoaTAgPT0gMCkgaTArKzsNCiAgICAgICAgICAgICAgICBicmVhazsNCiAgICAgICAgICAgIH0NCiAgICAgICAgfQ0KICAgIH0gZWxzZSB7DQogICAgICAgIGZvciAoaTAgPSAwOyBpMCA8IG47IGkwKyspIHsNCiAgICAgICAgICAgIGlmICh4W2kwXSA+PSBsZWZ0cCkgew0KICAgICAgICAgICAgICAgIGlmIChpMCA9PSAwKSBpMCsrOw0KICAgICAgICAgICAgICAgIGJyZWFrOw0KICAgICAgICAgICAgfQ0KICAgICAgICB9DQogICAgfQ0KICAgIGlmIChpMCA9PSBuKSByZXR1cm47DQoNCiAgICB2YXIgYm90dG9tcCA9IHBsb3RSZWN0Lnk7DQogICAgdmFyIHRvcHAgPSBib3R0b21wICsgcGxvdFJlY3QuaGVpZ2h0Ow0KICAgIGZvciAoajAgPSAwOyBqMCA8IG07IGowKyspIHsNCiAgICAgICAgaWYgKHlzY3JbajBdIDwgaCkgew0KICAgICAgICAgICAgaWYgKGowID09IDApIGowKys7DQogICAgICAgICAgICBicmVhazsNCiAgICAgICAgfQ0KICAgIH0NCiAgICBpZiAoajAgPT0gbSkgcmV0dXJuOw0KDQogICAgLy8gcmVuZGVyaW5nIGZyb20gbGVmdCB0byByaWdodCwgYm90dG9tIHRvIHRvcA0KICAgIHZhciBjZWxsTGVmdF9zID0gMCwgY2VsbFJpZ2h0X3MgPSAwOw0KDQogICAgdmFyIGlzTm9ybWFsaXplZCA9IHBhbGV0dGUuaXNOb3JtYWxpemVkOw0KICAgIHZhciBjb2xvcnMgPSBwYWxldHRlLmNvbG9yczsNCiAgICB2YXIgY29sTiA9IChjb2xvcnMubGVuZ3RoID4+IDIpIC0gMTsNCiAgICBpZiAoIWlzTm9ybWFsaXplZCkgew0KICAgICAgICBmbWF4ID0gcGFsZXR0ZS5yYW5nZS5tYXg7DQogICAgICAgIGZtaW4gPSBwYWxldHRlLnJhbmdlLm1pbjsNCiAgICB9DQogICAgdmFyIHBhbGV0dGVLID0gZm1heCAhPT0gZm1pbiA/IDEuMCAvIChmbWF4IC0gZm1pbikgOiAwOw0KDQogICAgZm9yICh2YXIgaSA9IGkwOyBpIDwgbiAmJiBjZWxsUmlnaHRfcyA8IHc7IGkrKykgew0KICAgICAgICAvLyBpMCBpcyB0aGUgcmlnaHQgdmlzaWJsZSBlZGdlIG9mIHRoZSBjZWxsDQogICAgICAgIHgwID0geFtpIC0gMV07DQogICAgICAgIHZhciB4MSA9IHhbaV07DQoNCiAgICAgICAgaWYgKHgwICE9IHgwIHx8IHgxICE9IHgxKSB7DQogICAgICAgICAgICBjZWxsUmlnaHRfcyA9IHVuZGVmaW5lZDsNCiAgICAgICAgICAgIGNvbnRpbnVlOw0KICAgICAgICB9DQoNCiAgICAgICAgaWYgKGNlbGxSaWdodF9zKQ0KICAgICAgICAgICAgY2VsbExlZnRfcyA9IGNlbGxSaWdodF9zOw0KICAgICAgICBlbHNlDQogICAgICAgICAgICBjZWxsTGVmdF9zID0gTWF0aC5jZWlsKGRhdGFUb1NjcmVlblgoeDApKTsNCg0KICAgICAgICBjZWxsUmlnaHRfcyA9IE1hdGguY2VpbChkYXRhVG9TY3JlZW5YKHgxKSk7DQogICAgICAgIGlmIChjZWxsTGVmdF9zIDwgMCkgY2VsbExlZnRfcyA9IDA7DQogICAgICAgIGlmIChjZWxsUmlnaHRfcyA+PSB3KSBjZWxsUmlnaHRfcyA9IHc7DQoNCiAgICAgICAgLy9pZiAoaSA9PSBuIC0gMSkgY2VsbFJpZ2h0X3MrKzsNCiAgICAgICAgaWYgKGNlbGxSaWdodF9zIC0gY2VsbExlZnRfcyA9PSAwKSBjb250aW51ZTsNCg0KICAgICAgICB5MCA9IHlbajAgLSAxXTsNCiAgICAgICAgdmFyIGNlbGxCb3R0b21fcyA9IDAsDQogICAgICAgICAgICBjZWxsVG9wX3MgPSB5c2NyW2owIC0gMV07DQogICAgICAgIGZvciAodmFyIGogPSBqMDsgaiA8IG0gJiYgY2VsbEJvdHRvbV9zID49IDA7IGorKykgew0KICAgICAgICAgICAgeTAgPSB5W2ogLSAxXTsNCiAgICAgICAgICAgIHZhciB5MSA9IHlbal07DQoNCiAgICAgICAgICAgIGlmICh5MCAhPSB5MCB8fCB5MSAhPSB5MSkgew0KICAgICAgICAgICAgICAgIGNlbGxUb3BfcyA9IHVuZGVmaW5lZDsNCiAgICAgICAgICAgICAgICBjb250aW51ZTsNCiAgICAgICAgICAgIH0NCg0KICAgICAgICAgICAgaWYgKGNlbGxUb3BfcykNCiAgICAgICAgICAgICAgICBjZWxsQm90dG9tX3MgPSBjZWxsVG9wX3M7DQogICAgICAgICAgICBlbHNlDQogICAgICAgICAgICAgICAgY2VsbEJvdHRvbV9zID0geXNjcltqIC0gMV07DQogICAgICAgICAgICBjZWxsVG9wX3MgPSB5c2NyW2pdOw0KICAgICAgICAgICAgaWYgKGNlbGxUb3BfcyA8IDApIGNlbGxUb3BfcyA9IC0xOw0KICAgICAgICAgICAgaWYgKGNlbGxCb3R0b21fcyA+PSBoKSBjZWxsQm90dG9tX3MgPSBoIC0gMTsNCg0KICAgICAgICAgICAgaWYgKGNlbGxUb3BfcyAtIGNlbGxCb3R0b21fcyA9PSAwKSBjb250aW51ZTsNCg0KICAgICAgICAgICAgdmFyIF9mID0gZltpIC0gMV1baiAtIDFdOw0KICAgICAgICAgICAgaWYgKF9mICE9IF9mKSBjb250aW51ZTsNCiAgICAgICAgICAgIHZhciBwYWxldHRlVmFsID0gcGFsZXR0ZUsgKiAoX2YgLSBmbWluKTsNCiAgICAgICAgICAgIHZhciBrID0gKHBhbGV0dGVWYWwgKiBjb2xOKSB8IDA7DQogICAgICAgICAgICBpZiAoayA8IDApIGsgPSAwOw0KICAgICAgICAgICAgZWxzZSBpZiAoayA+IGNvbE4pIGsgPSBjb2xOOw0KICAgICAgICAgICAgayA9IGsgPDwgMjsNCg0KICAgICAgICAgICAgLy8gZmlsbHMgdGhlIGNlbGwgd2l0aCBzYW1lIGNvbG9yDQogICAgICAgICAgICBmb3IgKHZhciB5cyA9IGNlbGxUb3BfcyArIDE7IHlzIDw9IGNlbGxCb3R0b21fczsgeXMrKykgew0KICAgICAgICAgICAgICAgIHZhciBpbmRleCA9ICh3ICogeXMgKyBjZWxsTGVmdF9zKSA8PCAyOw0KICAgICAgICAgICAgICAgIGZvciAodmFyIHhzID0gY2VsbExlZnRfczsgeHMgPCBjZWxsUmlnaHRfczsgeHMrKykgew0KICAgICAgICAgICAgICAgICAgICBpbWFnZURhdGFbaW5kZXgrK10gPSBjb2xvcnNba107DQogICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YVtpbmRleCsrXSA9IGNvbG9yc1trICsgMV07DQogICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YVtpbmRleCsrXSA9IGNvbG9yc1trICsgMl07DQogICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YVtpbmRleCsrXSA9IGNvbG9yc1trICsgM107DQogICAgICAgICAgICAgICAgfQ0KICAgICAgICAgICAgfQ0KICAgICAgICAgICAgaWYgKGNlbGxUb3BfcyA8PSAwKSBicmVhazsNCiAgICAgICAgfQ0KICAgICAgICBpZiAoY2VsbFJpZ2h0X3MgPj0gdykgYnJlYWs7DQogICAgfQ0KfTsNCg0KDQp2YXIgcmVuZGVyR3JhZGllbnQgPSBmdW5jdGlvbiAoaW1hZ2UsIHdpZHRoLCBoZWlnaHQsIHgsIHksIGYsIGZtaW4sIGZtYXgsIHBhbGV0dGUsIHBsb3RSZWN0LCBkYXRhVG9TY3JlZW5YLCBzY3JlZW5Ub0RhdGFYLCBkYXRhVG9TY3JlZW5ZLCBzY3JlZW5Ub0RhdGFZLCBoYXNEYXRhVHJhbnNmb3JtWCwgaGFzRGF0YVRyYW5zZm9ybVkpIHsNCiAgICB2YXIgbiA9IHgubGVuZ3RoOw0KICAgIHZhciBtID0geS5sZW5ndGg7DQogICAgdmFyIGltYWdlRGF0YSA9IGltYWdlLmRhdGE7DQogICAgdmFyIHcgPSB3aWR0aDsNCiAgICB2YXIgaCA9IGhlaWdodDsNCg0KICAgIC8vIHByZWNvbXB1dGluZyB5IGluIHNjcmVlbiBjb29yZGluYXRlczoNCiAgICB2YXIgeXNjciA9IG5ldyBGbG9hdDMyQXJyYXkobSk7DQogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtOyBpKyspDQogICAgICAgIHlzY3JbaV0gPSBkYXRhVG9TY3JlZW5ZKHlbaV0pIHwgMDsgLy8gZmxvb3I7DQoNCiAgICAvLyBwcmVwYXJpbmcgc2NyZWVuIHRvIGRhdGEgbWFwcGluZw0KICAgIHZhciBtYXBTY3JlZW5Ub0RhdGFYID0gbmV3IEZsb2F0MzJBcnJheSh3KTsNCiAgICBmb3IgKHZhciB4cyA9IDA7IHhzIDwgdzsgeHMrKykgew0KICAgICAgICBtYXBTY3JlZW5Ub0RhdGFYW3hzXSA9IHNjcmVlblRvRGF0YVgoeHMgKyAwLjUpOyAvLyB0b2RvOiBtYWtlIGlubGluZSB0cmFuc2Zvcm0gZm9yIGxpbmVhciBjYXNlDQogICAgfQ0KICAgIHZhciBtYXBTY3JlZW5Ub0RhdGFZID0gbmV3IEZsb2F0MzJBcnJheShoKTsNCiAgICBmb3IgKHZhciB5cyA9IDA7IHlzIDwgaDsgeXMrKykgew0KICAgICAgICBtYXBTY3JlZW5Ub0RhdGFZW3lzXSA9IHNjcmVlblRvRGF0YVkoeXMgKyAwLjUpOyAvLyB0b2RvOiBtYWtlIGlubGluZSB0cmFuc2Zvcm0gZm9yIGxpbmVhciBjYXNlDQogICAgfQ0KDQogICAgdmFyIGkwLCBqMDsNCiAgICB2YXIgeDAsIHkwOyAvLyBpbiBkYXRhIHNwYWNlDQoNCiAgICAvLyBzdGFydCBjZWxsDQogICAgdmFyIGxlZnRwID0gcGxvdFJlY3QueDsNCiAgICB2YXIgcmlnaHRwID0gbGVmdHAgKyBwbG90UmVjdC53aWR0aDsNCiAgICBpZiAoaGFzRGF0YVRyYW5zZm9ybVgpIHsNCiAgICAgICAgZm9yIChpMCA9IDA7IGkwIDwgbjsgaTArKykgew0KICAgICAgICAgICAgaWYgKGRhdGFUb1NjcmVlblgoeFtpMF0pID49IDApIHsNCiAgICAgICAgICAgICAgICBpZiAoaTAgPT0gMCkgaTArKzsNCiAgICAgICAgICAgICAgICBicmVhazsNCiAgICAgICAgICAgIH0NCiAgICAgICAgfQ0KICAgIH0gZWxzZSB7DQogICAgICAgIGZvciAoaTAgPSAwOyBpMCA8IG47IGkwKyspIHsNCiAgICAgICAgICAgIGlmICh4W2kwXSA+PSBsZWZ0cCkgew0KICAgICAgICAgICAgICAgIGlmIChpMCA9PSAwKSBpMCsrOw0KICAgICAgICAgICAgICAgIGJyZWFrOw0KICAgICAgICAgICAgfQ0KICAgICAgICB9DQogICAgfQ0KICAgIGlmIChpMCA9PSBuKSByZXR1cm47DQoNCiAgICB2YXIgYm90dG9tcCA9IHBsb3RSZWN0Lnk7DQogICAgdmFyIHRvcHAgPSBib3R0b21wICsgcGxvdFJlY3QuaGVpZ2h0Ow0KICAgIGZvciAoajAgPSAwOyBqMCA8IG07IGowKyspIHsNCiAgICAgICAgaWYgKHlzY3JbajBdIDwgaCkgew0KICAgICAgICAgICAgaWYgKGowID09IDApIGowKys7DQogICAgICAgICAgICBicmVhazsNCiAgICAgICAgfQ0KICAgIH0NCiAgICBpZiAoajAgPT0gbSkgcmV0dXJuOw0KDQogICAgLy8gcmVuZGVyaW5nIGZyb20gbGVmdCB0byByaWdodCwgYm90dG9tIHRvIHRvcA0KICAgIHZhciBjZWxsTGVmdF9zID0gMCwgY2VsbFJpZ2h0X3MgPSAwOw0KDQogICAgdmFyIGlzTm9ybWFsaXplZCA9IHBhbGV0dGUuaXNOb3JtYWxpemVkOw0KICAgIHZhciBjb2xvcnMgPSBwYWxldHRlLmNvbG9yczsNCiAgICB2YXIgY29sTiA9IChjb2xvcnMubGVuZ3RoID4+IDIpIC0gMTsNCiAgICBpZiAoIWlzTm9ybWFsaXplZCkgew0KICAgICAgICBmbWF4ID0gcGFsZXR0ZS5yYW5nZS5tYXg7DQogICAgICAgIGZtaW4gPSBwYWxldHRlLnJhbmdlLm1pbjsNCiAgICB9DQogICAgdmFyIHBhbGV0dGVLID0gZm1heCAhPT0gZm1pbiA/IDEuMCAvIChmbWF4IC0gZm1pbikgOiAwOw0KDQogICAgdmFyIGZsYiwgZmx0LCBmcnQsIGZyYjsNCiAgICB2YXIgZmksIGZpMTsNCg0KICAgIC8vIHJlbmRlcmluZyB0aGUgaW1hZ2UNCiAgICBmb3IgKHZhciBpID0gaTA7IGkgPCBuICYmIGNlbGxSaWdodF9zIDwgdzsgaSsrKSB7DQogICAgICAgIC8vIGkwIGlzIHRoZSByaWdodCB2aXNpYmxlIGVkZ2Ugb2YgdGhlIGNlbGwNCiAgICAgICAgeDAgPSB4W2kgLSAxXTsNCiAgICAgICAgdmFyIHgxID0geFtpXTsNCiAgICAgICAgaWYgKHgwICE9IHgwIHx8IHgxICE9IHgxKSB7IC8vIGEgIT0gYSAgZXF1aXYuIGlzTmFOKGEpDQogICAgICAgICAgICBjZWxsUmlnaHRfcyA9IHVuZGVmaW5lZDsNCiAgICAgICAgICAgIGNvbnRpbnVlOw0KICAgICAgICB9DQoNCiAgICAgICAgaWYgKGNlbGxSaWdodF9zKQ0KICAgICAgICAgICAgY2VsbExlZnRfcyA9IGNlbGxSaWdodF9zOw0KICAgICAgICBlbHNlDQogICAgICAgICAgICBjZWxsTGVmdF9zID0gTWF0aC5jZWlsKGRhdGFUb1NjcmVlblgoeDApKTsNCiAgICAgICAgY2VsbFJpZ2h0X3MgPSBNYXRoLmNlaWwoZGF0YVRvU2NyZWVuWCh4MSkpOw0KICAgICAgICBpZiAoY2VsbExlZnRfcyA8IDApIGNlbGxMZWZ0X3MgPSAwOw0KICAgICAgICBpZiAoY2VsbFJpZ2h0X3MgPj0gdykgY2VsbFJpZ2h0X3MgPSB3Ow0KICAgICAgICBpZiAoY2VsbFJpZ2h0X3MgLSBjZWxsTGVmdF9zID09IDApIGNvbnRpbnVlOw0KDQogICAgICAgIHZhciBjZWxsQm90dG9tX3MgPSAwLCBjZWxsVG9wX3MgPSAwOw0KICAgICAgICBmaSA9IGZbaV07DQogICAgICAgIGZpMSA9IGZbaSAtIDFdOw0KICAgICAgICBmb3IgKHZhciBqID0gajA7IGogPCBtICYmIGNlbGxCb3R0b21fcyA+PSAwOyBqKyspIHsNCiAgICAgICAgICAgIHkwID0geVtqIC0gMV07DQogICAgICAgICAgICB2YXIgeTEgPSB5W2pdOw0KICAgICAgICAgICAgaWYgKHkwICE9IHkwIHx8IHkxICE9IHkxKSB7DQogICAgICAgICAgICAgICAgY2VsbFRvcF9zID0gdW5kZWZpbmVkOw0KICAgICAgICAgICAgICAgIGNvbnRpbnVlOw0KICAgICAgICAgICAgfQ0KDQogICAgICAgICAgICBpZiAoY2VsbFRvcF9zKQ0KICAgICAgICAgICAgICAgIGNlbGxCb3R0b21fcyA9IGNlbGxUb3BfczsNCiAgICAgICAgICAgIGVsc2UNCiAgICAgICAgICAgICAgICBjZWxsQm90dG9tX3MgPSB5c2NyW2ogLSAxXTsNCiAgICAgICAgICAgIGNlbGxUb3BfcyA9IHlzY3Jbal07DQogICAgICAgICAgICBpZiAoY2VsbFRvcF9zIDwgMCkgY2VsbFRvcF9zID0gLTE7DQogICAgICAgICAgICBpZiAoY2VsbEJvdHRvbV9zID49IGgpIGNlbGxCb3R0b21fcyA9IGggLSAxOw0KICAgICAgICAgICAgaWYgKGNlbGxCb3R0b21fcyAtIGNlbGxUb3BfcyA9PSAwKSBjb250aW51ZTsNCg0KICAgICAgICAgICAgLy8gZmlsbHMgdGhlIGNlbGwNCiAgICAgICAgICAgIGZsdCA9IGZpMVtqXTsNCiAgICAgICAgICAgIGZsYiA9IGZpMVtqIC0gMV07DQogICAgICAgICAgICBmcnQgPSBmaVtqXTsNCiAgICAgICAgICAgIGZyYiA9IGZpW2ogLSAxXTsNCg0KICAgICAgICAgICAgaWYgKGZsdCAhPSBmbHQgfHwgZmxiICE9IGZsYiB8fCBmcnQgIT0gZnJ0IHx8IGZyYiAhPSBmcmIpDQogICAgICAgICAgICAgICAgY29udGludWU7DQoNCiAgICAgICAgICAgIHZhciBreUxlZnQgPSAoZmx0IC0gZmxiKSAvICh5MSAtIHkwKTsNCiAgICAgICAgICAgIHZhciBreVJpZ2h0ID0gKGZydCAtIGZyYikgLyAoeTEgLSB5MCk7DQogICAgICAgICAgICBmb3IgKHZhciB5cyA9IGNlbGxUb3BfcyArIDE7IHlzIDw9IGNlbGxCb3R0b21fczsgeXMrKykgew0KICAgICAgICAgICAgICAgIHZhciBpbmRleCA9ICh3ICogeXMgKyBjZWxsTGVmdF9zKSA8PCAyOw0KICAgICAgICAgICAgICAgIHZhciBfeSA9IG1hcFNjcmVlblRvRGF0YVlbeXNdOw0KICAgICAgICAgICAgICAgIHZhciBmbGVmdCA9IGt5TGVmdCAqIChfeSAtIHkwKSArIGZsYjsNCiAgICAgICAgICAgICAgICB2YXIgZnJpZ2h0ID0ga3lSaWdodCAqIChfeSAtIHkwKSArIGZyYjsNCiAgICAgICAgICAgICAgICB2YXIga3ggPSAoZnJpZ2h0IC0gZmxlZnQpIC8gKHgxIC0geDApOw0KDQogICAgICAgICAgICAgICAgZm9yICh2YXIgeHMgPSBjZWxsTGVmdF9zOyB4cyA8IGNlbGxSaWdodF9zOyB4cysrKSB7DQogICAgICAgICAgICAgICAgICAgIHZhciBfeCA9IG1hcFNjcmVlblRvRGF0YVhbeHNdOw0KICAgICAgICAgICAgICAgICAgICB2YXIgX2YgPSBreCAqIChfeCAtIHgwKSArIGZsZWZ0Ow0KICAgICAgICAgICAgICAgICAgICB2YXIgcGFsZXR0ZVZhbCA9IHBhbGV0dGVLICogKF9mIC0gZm1pbik7DQogICAgICAgICAgICAgICAgICAgIHZhciBrID0gKHBhbGV0dGVWYWwgKiBjb2xOKSB8IDA7DQogICAgICAgICAgICAgICAgICAgIGlmIChrIDwgMCkgayA9IDA7DQogICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPiBjb2xOKSBrID0gY29sTjsNCiAgICAgICAgICAgICAgICAgICAgayA9IGsgPDwgMjsNCg0KICAgICAgICAgICAgICAgICAgICAvL3ZhciBjb2xvciA9IGdldENvbG9yKHBhbGV0dGVWYWwpOw0KICAgICAgICAgICAgICAgICAgICAvL2lmICh4cyA9PSBjZWxsTGVmdF9zIHx8IHhzID09IGNlbGxSaWdodF9zIC0gMSB8fCAgLyogdW5jb21tZW50IHRvIGRyYXcgdGhlIGJvcmRlciBvZiBjZWxscyAqLw0KICAgICAgICAgICAgICAgICAgICAvLyAgICB5cyA9PSBjZWxsVG9wX3MgKyAxIHx8IHlzID09IGNlbGxCb3R0b21fcykNCiAgICAgICAgICAgICAgICAgICAgLy8gICAgY29sb3IgPSB7IGE6IDEsIHI6IDAsIGc6IDAsIGI6IDI1NSB9Ow0KDQogICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YVtpbmRleCsrXSA9IGNvbG9yc1trKytdOw0KICAgICAgICAgICAgICAgICAgICBpbWFnZURhdGFbaW5kZXgrK10gPSBjb2xvcnNbaysrXTsNCiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhW2luZGV4KytdID0gY29sb3JzW2srK107DQogICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YVtpbmRleCsrXSA9IGNvbG9yc1trXTsNCiAgICAgICAgICAgICAgICB9DQogICAgICAgICAgICB9DQogICAgICAgICAgICBpZiAoY2VsbFRvcF9zIDw9IDApIGJyZWFrOw0KICAgICAgICB9DQogICAgICAgIGlmIChjZWxsUmlnaHRfcyA+PSB3KSBicmVhazsNCiAgICB9DQp9Ow0K";;//Class for plots and axes arrangement. Takes into account "placement" property of an element use it for element arrangement
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

    var addRelativeDiv = function (jqdiv, params, insertBeforeDiv) {
        var packDiv = $("<div></div>");
        packDiv.appendTo(that.host).addClass("idd-figure-container");
        packDiv.content = jqdiv;
        jqdiv.appendTo(packDiv);

        var placement = jqdiv.attr("data-idd-placement");

        if (jqdiv.attr("data-idd-axis")) {
            var axis = InteractiveDataDisplay.InitializeAxis(jqdiv, params);
            jqdiv.axis = axis;
            jqdiv.dblclick(function () {
                if (placement == "bottom" || placement == "top") that.master.fitToViewX();
                else that.master.fitToViewY();
            });
        }

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
        return addJQDiv('<div data-idd-axis="' + actualAxisType + '"></div>', placement, params, false, insertBeforeDiv);
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

    this.requestUpdateLayout();
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

    var legendDiv = $("<div></div>").prependTo(this.centralPart); 
    var _legend = new InteractiveDataDisplay.Legend(this, legendDiv);
    legendDiv.css("float", "right");
    Object.defineProperty(this, "legend", { get: function () { return _legend; }, configurable: false }); 

    var data = {};
    InteractiveDataDisplay.Utils.readStyle(div, data);
    var visible = data.isLegendVisible;
    if (visible) {
        if (visible == "true")
            _legend.isVisible = true;
        else if (visible == "false")
            _legend.isVisible = false;
    }
    var setDefaultGestureSource = function () {
        var gestureSource = InteractiveDataDisplay.Gestures.getGesturesStream(that.centralPart);
        var bottomAxisGestures = InteractiveDataDisplay.Gestures.applyHorizontalBehavior(InteractiveDataDisplay.Gestures.getGesturesStream(bottomAxis));
        var leftAxisGestures = InteractiveDataDisplay.Gestures.applyVerticalBehavior(InteractiveDataDisplay.Gestures.getGesturesStream(leftAxis));

        that.navigation.gestureSource = gestureSource.merge(bottomAxisGestures.merge(leftAxisGestures));
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

                setDefaultGestureSource();
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

                setDefaultGestureSource();
            }

            that.enumAll(that, function (plot) {
                if (plot != that) {
                    plot.xDataTransform = that.xDataTransform;
                }
            });
        }
    }

    this.onChildrenChanged = function (arg) {
        if (arg.type == "add") {
            if (that.xDataTransform) {
                arg.plot.xDataTransform = that.xDataTransform;
            }
            if (that.yDataTransform) {
                arg.plot.yDataTransform = that.yDataTransform;
            }
        }
    };

    setDefaultGestureSource();
};



InteractiveDataDisplay.Chart.prototype = new InteractiveDataDisplay.Figure;;// Represents a custom marker to be provided as a shape to a markers plot.
// draw is a function (marker, plotRect, screenSize, transform, context) 
//    it is called once for each marker to render it on a canvas
//    marker is an object with properties representing a slice of data provided in MarkerPlot.draw() method
//    plotRect     {x,y,width,height}  Rectangle in the plot plane which is visible, (x,y) is left/bottom of the rectangle
//    screenSize   {width,height}      Size of the output region to render.
//    transform  { dataToScreenX, dataToScreenY } Transform functions from data to screen coordinates
//    context (canvas context2d) A context to render.
InteractiveDataDisplay.CustomMarkerShape = function (draw, getBoundingBox, getLegendItem) {
    this.draw = draw;
    this.getBoundingBox = getBoundingBox;
    this.getLegendItem = getLegendItem;
};

InteractiveDataDisplay.MaxMarkersPerAnimationFrame = 3000;

InteractiveDataDisplay.Markers = function (div, master) {

    // Initialization (#1)
    var initializer = InteractiveDataDisplay.Utils.getDataSourceFunction(div, InteractiveDataDisplay.readCsv);
    var initialData = initializer(div);

    this.base = InteractiveDataDisplay.CanvasPlot;
    this.base(div, master);
    if (!div) return;

    var _data = {};
    var _shape;
    var _colorPalette, _sizePalette;
    var _colorRange, _sizeRange;
    
    var _dataUpdated = false;

    var _markerPushpins = undefined;
    var _pushpinsVisible = false;
    
    var that = this;
    var _preRender;

    var iconDiv = $("<div></div>");
    iconDiv.width(10);
    iconDiv.height(10);
    var iconCv = $("<canvas></canvas>").appendTo(iconDiv);
    var iconCtx = iconCv[0].getContext("2d");
    iconCtx.fillStyle = "rgba(100,100,100,0.3)";
    iconCtx.fillRect(0, 0, 10, 10);

    // default styles:
    var defaultShape = "box";
    var defaultColor = "#4169ed";
    var defaultBorder = "#000000";
    var defaultSize = 10;
    if (initialData) {
        _data.x = initialData.x;
        _data.y = initialData.y;
        _data.size = typeof initialData.size != "undefined" ? initialData.size : defaultSize;
        _data.color = typeof initialData.color != "undefined" ? initialData.color : defaultColor;
        _data.border = typeof initialData.border != "undefined" ? initialData.border : defaultBorder;
        
        _shape = typeof initialData.shape != "undefined" ? initialData.shape : defaultShape;
        _colorPalette = typeof initialData.colorPalette != "undefined" ? initialData.colorPalette : undefined;
        _sizePalette = typeof initialData.sizePalette != "undefined" ? initialData.sizePalette : undefined;
    }

    // Draws the data as markers.
    // { x, y, 
    //   color, colorPalette,
    //   size, sizePalette,
    //   border  
    // }
    // x (optional) is an array of numbers. If absent, sequential numbers are taken.
    // y is an array of numbers, length(y) = length(x).
    // border (optional) is a color, value "none" means no border.
    // size is either a number, or an array of numbers (length(size) = length(y)) those are sizes in pixel or values for sizePalette.
    // sizePalette is InteractiveDataDisplay.SizePalette, if size is an array of numbers it is used to get the pixel size of a marker by size element.
    this.draw = function (data, titles) {
        var y2 = data.y;
        if (!y2) throw "Data series y is undefined";
        var n = y2.length;

        if (!data.x) {
            data.x = InteractiveDataDisplay.Utils.range(0, n - 1);
        }
        if (n != data.x.length) throw "Data series x and y have different lengths";
                
        for (var prop in data) {
            if (prop == "shape" && data[prop] != "undefined")
                _shape = data[prop];
            else if (prop == "sizePalette" && data[prop] != "undefined")
                _sizePalette = data[prop];
            else if (prop == "colorPalette" && data[prop] != "undefined")
                _colorPalette = data[prop];
            else
                _data[prop] = data[prop] != "undefined" ? data[prop] : _data[prop];
        }

        if (_colorPalette && _colorPalette.isNormalized) {
            _colorRange = InteractiveDataDisplay.Utils.getMinMax(_data.color);
        }
        if (_sizePalette && _sizePalette.isNormalized) {
            _sizeRange = InteractiveDataDisplay.Utils.getMinMax(_data.size);
        }
        
        if (typeof _shape == "string") {
            if (!isStandartShape(_shape))
                _shape = eval(_shape);
        }
        
        _dataUpdated = true;

        this.invalidateLocalBounds();

        this.requestNextFrameOrUpdate();
        this.setTitles(titles, true);
        this.fireAppearanceChanged();
    };

    // Returns a rectangle in the plot plane.
    this.computeLocalBounds = function (step, computedBounds) {
        var dataToPlotX = this.xDataTransform && this.xDataTransform.dataToPlot;
        var dataToPlotY = this.yDataTransform && this.yDataTransform.dataToPlot;
        return InteractiveDataDisplay.Utils.getBoundingBoxForArrays(_data.x, _data.y, dataToPlotX, dataToPlotY);
    }

    // Returns 4 margins in the screen coordinate system
    this.getLocalPadding = function () {
        var padding = 0;
        if (_shape && typeof _shape.getPadding == 'function') {
            return _shape.getPadding(_data);
        }
        var size = _data.size;
        if (InteractiveDataDisplay.Utils.isArray(size)) {
            if (_sizePalette)
                padding = _sizePalette.sizeRange.max / 2;
            else {
                padding = InteractiveDataDisplay.Utils.getMinMax(size).max / 2;
            }
        }
        else {
            padding = size / 2;
        }
        return { left: padding, right: padding, top: padding, bottom: padding };
    };
    
    var isStandartShape = function (shape) {
        if (typeof (shape) == "string") {
            var invShape = shape.toLowerCase();
            if (invShape == "box") return 1;
            else if (invShape == "circle") return 2;
            else if (invShape == "diamond") return 3;
            else if (invShape == "cross") return 4;
            else if (invShape == "triangle") return 5;
            return false;
        }
        else
            return false;
    }

    this.renderCore = function (plotRect, screenSize) {
        InteractiveDataDisplay.Markers.prototype.renderCore.call(this, plotRect, screenSize);

        var _x = _data.x;
        var _y = _data.y;
        if (_x === undefined || _y == undefined) return;
        var n = _y.length;
        if (n == 0) return;

        var dt = this.getTransform();
        var dataToScreenX = dt.dataToScreenX;
        var dataToScreenY = dt.dataToScreenY;

        // size of the canvas
        var w_s = screenSize.width;
        var h_s = screenSize.height;
        var xmin = 0, xmax = w_s;
        var ymin = 0, ymax = h_s;
        var drawBasic = !that.master.isInAnimation || !(that.master.mapControl !== undefined);

        if (that.mapControl !== undefined) {
            if (_dataUpdated || _markerPushpins === undefined) {
                //removing old pushpins
                if (_markerPushpins !== undefined) {
                    _markerPushpins.forEach(function (pp) {
                        var index = that.mapControl.entities.indexOf(pp);
                        if (index >= 0)
                            that.mapControl.entities.removeAt(index);
                    });

                    _markerPushpins = undefined;
                }

                //Creating pushpins if necessary
                if (that.mapControl !== undefined && n <= InteractiveDataDisplay.MaxMarkersPerAnimationFrame) {
                    _markerPushpins = [];
                    for (var i = 0; i < n; i++) {
                        var newPushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(_y[i], _x[i]),
                            {
                                visible: false,
                                htmlContent: '<div style="background-color: white; opacity: 0.5; width: 10px; height: 10px"></div>',
                                anchor: new Microsoft.Maps.Point(5, 5)
                            });
                        _markerPushpins.push(newPushpin);
                        that.mapControl.entities.push(newPushpin); 
                    }
                }
                _dataUpdated = false;
            }

            if (that.master.isInAnimation === true && _markerPushpins !== undefined) {
                if (_pushpinsVisible === false) {
                    _markerPushpins.forEach(function (pp) { pp.setOptions({ visible: true }); });
                    _pushpinsVisible = true;
                }
            }
            else {
                if (_pushpinsVisible === true) {
                    _markerPushpins.forEach(function (pp) { pp.setOptions({ visible: false }); });
                    _pushpinsVisible = false;
                }
            }
        }

        if (drawBasic) {

            // copy array of properties before changings
            var markersData = {};
            for (var prop in _data) {
                markersData[prop] = _data[prop];
            }

            if (_preRender)
                _preRender(markersData, plotRect, screenSize, dt, context);

            // adding aditional field to check whether value is array or not
            for (var prop in markersData) {
                var v = markersData[prop];
                markersData[prop] = { value: v, isArray: InteractiveDataDisplay.Utils.isArray(v) };
            }

            _x = markersData.x.value;
            _y = markersData.y.value;
            if (_x === undefined || _y == undefined) return;
            n = _y.length;
            if (n == 0) return;

            var context = this.getContext(true);
            var i = 0;
            var dx, dy;
            var localSize;
            var localColor = markersData.color.value;
            var colorIsArray = markersData.color.isArray;
            var sizeIsArray = markersData.size.isArray;
            var colorPaletteNormalized = _colorPalette && _colorPalette.isNormalized;
            var sizePaletteNormalized = _sizePalette && _sizePalette.isNormalized;
            
            if (!colorIsArray) {
                context.strokeStyle = localColor;
                context.fillStyle = localColor; // for single points surrounded with missing values
            }
            var drawBorder = false;
            if (markersData.border.value && markersData.border.value !== "none") {
                drawBorder = true;
                context.strokeStyle = markersData.border.value;
            }

            if (typeof _shape == "object") {
                var draw = _shape.draw;
                for (; i < n; i++) {
                    dx = _x[i];
                    dy = _y[i];
                    if ((dx != dx) || (dy != dy)) continue; // missing value

                    var drawData = {}; // construct data (appearance properties) for marker
                    for (var prop in markersData) {
                        var v = markersData[prop];
                        if (v.isArray) drawData[prop] = v.value[i];
                        else drawData[prop] = v.value;
                    }
                    
                    if (sizeIsArray) {
                        localSize = drawData.size;
                        if (localSize != localSize) continue;
                        if (_sizePalette) {
                            if (sizePaletteNormalized)
                                localSize = (localSize - _sizeRange.min) / (_sizeRange.max - _sizeRange.min);
                            drawData.size = _sizePalette.getSize(localSize);
                        }
                    }
                    if (colorIsArray) {
                        localColor = drawData.color;
                        if (localColor != localColor) continue;
                        if (_colorPalette) {
                            if (colorPaletteNormalized)
                                localColor = (localColor - _colorRange.min) / (_colorRange.max - _colorRange.min);
                            rgba = _colorPalette.getRgba(localColor);
                            drawData.color = "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
                        }
                    }
                    
                    draw(drawData, plotRect, screenSize, dt, context);
                }
            }
            else {
                var invShape = isStandartShape(_shape);
                var rgba;
                var x1, x2;
                for (; i < n; i++) {
                    dx = _x[i];
                    dy = _y[i];
                    if ((dx != dx) || (dy != dy)) continue; // missing value

                    var drawData = {}; // construct data (appearence properties) for marker
                    for (var prop in markersData) {
                        var v = markersData[prop];
                        if (v.isArray) drawData[prop] = v.value[i];
                        else drawData[prop] = v.value;
                    }

                    if (sizeIsArray) {
                        localSize = drawData.size;
                        if (localSize != localSize) continue;
                        if (_sizePalette) {
                            if (sizePaletteNormalized)
                                localSize = (localSize - _sizeRange.min) / (_sizeRange.max - _sizeRange.min);
                            drawData.size = _sizePalette.getSize(localSize);
                        }
                    }

                    if (colorIsArray) {
                        localColor = drawData.color;
                        if (localColor != localColor) continue;
                        if (_colorPalette) {
                            if (colorPaletteNormalized)
                                localColor = (localColor - _colorRange.min) / (_colorRange.max - _colorRange.min);
                            rgba = _colorPalette.getRgba(localColor);
                            drawData.color = "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
                        }
                        context.fillStyle = drawData.color;
                    }
                    
                    x1 = dataToScreenX(drawData.x);
                    y1 = dataToScreenY(drawData.y);
                    localSize = drawData.size;
                    var halfSize = localSize / 2;
                    if ((x1 - halfSize) > w_s || (x1 + halfSize) < 0 || (y1 - halfSize) > h_s || (y1 + halfSize) < 0) continue;

                    // Drawing the marker
                    switch (invShape) {
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
                }
            }
        }
    };

    this.findToolTipMarkers = function (xd, yd, xp, yp) {
        var result = [];

        var _x = _data.x;
        var _y = _data.y;
        if (_x == undefined || _y == undefined)
            return result;
        var n = _x.length;
        var m = _y.length;
        if (n == 0 || m == 0) return result;

        var x1, x2
        var i = 0;
        var localSize = _data.size;
        var sizeIsArray = InteractiveDataDisplay.Utils.isArray(localSize);
        var colorIsArray = InteractiveDataDisplay.Utils.isArray(_data.color);
        var sizePaletteNormalized = _sizePalette && _sizePalette.isNormalized;

        var t = this.getTransform();
        var xs = t.dataToScreenX(xd);
        var ys = t.dataToScreenY(yd);

        var that = this;

        if (typeof (_shape) == "object") {
            if (typeof (_shape.hitTest) == "function") {
                var ps = { x: xs, y: ys };
                var pd = { x: xd, y: yd };
                for (var i = 0; i < n; i++) {
                    var drawData = {};
                    for (var prop in _data) {
                        var v = _data[prop];
                        if (InteractiveDataDisplay.Utils.isArray(v)) drawData[prop] = v[i];
                        else drawData[prop] = v;
                    }
                    if (sizeIsArray) {
                        localSize = drawData.size;
                        if (_sizePalette) {
                            if (sizePaletteNormalized)
                                localSize = (localSize - _sizeRange.min) / (_sizeRange.max - _sizeRange.min);
                            drawData.size = _sizePalette.getSize(localSize);
                        }
                    }
                    if (_shape.hitTest(drawData, t, ps, pd)) {
                        var drawData = {};
                        for (var prop in _data) {
                            var v = _data[prop];
                            if (InteractiveDataDisplay.Utils.isArray(v)) drawData[prop] = v[i];
                        }
                        drawData.index = i;
                        result.push(drawData);
                    }
                }
            }
        }
        else {
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

            var invShape = isStandartShape(_shape);
            for (; i < n; i++) {
                var dx = _x[i];
                var dy = _y[i];
                if ((dx != dx) || (dy != dy)) continue; // missing value

                if (sizeIsArray) {
                    localSize = _data.size[i];
                    if (_sizePalette) {
                        if (sizePaletteNormalized)
                            localSize = (localSize - _sizeRange.min) / (_sizeRange.max - _sizeRange.min);
                        localSize = _sizePalette.getSize(localSize);
                    }
                }

                x1 = t.dataToScreenX(dx);
                y1 = t.dataToScreenY(dy);
                var halfSize = localSize / 2; // Checks bounding box hit:
                if (xs >= x1 - halfSize && xs <= x1 + halfSize && ys >= y1 - halfSize && ys <= y1 + halfSize) {
                    var drawData = {};
                    for (var prop in _data) {
                        var v = _data[prop];
                        if (InteractiveDataDisplay.Utils.isArray(v)) drawData[prop] = v[i];
                    }
                    drawData.index = i;
                                        
                    // Drawing the marker
                    switch (invShape) {
                        case 1: // box
                            result.push(drawData);
                            break;
                        case 2: // circle
                            if ((x1 - xs) * (x1 - xs) + (y1 - ys) * (y1 - ys) <= halfSize * halfSize)
                                result.push(drawData);
                            break;
                        case 3: // diamond
                            if (isInside({ x: xs, y: ys }, [{ x: x1 - halfSize, y: y1 }, { x: x1, y: y1 - halfSize },
                                                            { x: x1 + halfSize, y: y1 }, { x: x1, y: y1 + halfSize }, ]))
                                result.push(drawData);
                            break;
                        case 4: // cross
                            var thirdSize = localSize / 3;
                            var halfThirdSize = thirdSize / 2;
                            if (isInside({ x: xs, y: ys }, [{ x: x1 - halfThirdSize, y: y1 + halfSize }, { x: x1 - halfThirdSize, y: y1 - halfSize },
                                                            { x: x1 + halfThirdSize, y: y1 - halfSize }, { x: x1 + halfThirdSize, y: y1 + halfSize }]) ||
                                isInside({ x: xs, y: ys }, [{ x: x1 - halfSize, y: y1 + halfThirdSize }, { x: x1 - halfSize, y: y1 - halfThirdSize },
                                                            { x: x1 + halfSize, y: y1 - halfThirdSize }, { x: x1 + halfSize, y: y1 + halfThirdSize }]))
                                result.push(drawData);
                            break;
                        case 5: // triangle
                            if (isInside({ x: xs, y: ys }, [{ x: x1 - halfSize, y: y1 + halfSize }, { x: x1, y: y1 - halfSize },
                                                            { x: x1 + halfSize, y: y1 + halfSize }]))
                                result.push(drawData);
                            break;
                    }
                }
            }
        }

        return result;
    };

    // Builds a tooltip <div> for a point
    this.getTooltip = function (xd, yd, xp, yp) {
        var that = this;
        var resultMarkers = that.findToolTipMarkers(xd, yd, xp, yp);
        var buildTooltip = function (markerInfo) {
            var content = undefined;
            for (var prop in markerInfo) {
                if (markerInfo.hasOwnProperty(prop)) {
                    var propTitle = that.getTitle(prop);
                    if (content)
                        content += "<br/><b>" + propTitle + "</b>: " + markerInfo[prop];
                    else
                        content = "<b>" + propTitle + "</b>: " + markerInfo[prop];
                }
            }
            return "<div>" + content + "</div>";
        };
        if (resultMarkers.length > 0) {
            var toolTip = "<b>" + that.name + "</b>";
            resultMarkers.forEach(function (markerInfo) {
                toolTip += "<br/>" + buildTooltip(markerInfo);
            });
            return "<div>" + toolTip + "</div>";
        }
    };

    // Others
    this.onDataTransformChanged = function (arg) {
        this.invalidateLocalBounds();
        InteractiveDataDisplay.Markers.prototype.onDataTransformChanged.call(this, arg);
    };

    Object.defineProperty(this, "color", {
        get: function () { return _data.color; },
        set: function (value) {
            if (value == _data.color) return;
            _data.color = value;

            this.fireAppearanceChanged("color");
            this.requestNextFrameOrUpdate();
        },
        configurable: false
    });

    Object.defineProperty(this, "colorPalette", {
        get: function () { return _colorPalette; },
        set: function (value) {
            if (value == _colorPalette) return;
            _colorPalette = value;
            if (value.isNormalized) {
                _colorRange = InteractiveDataDisplay.Utils.getMinMax(_data.color);
            }

            this.fireAppearanceChanged("colorPalette");
            this.requestNextFrameOrUpdate();
        },
        configurable: false
    });

    Object.defineProperty(this, "size", {
        get: function () { return _data.size; },
        set: function (value) {
            if (value == _data.size) return;
            _data.size = value;

            this.fireAppearanceChanged("size");
            this.requestNextFrameOrUpdate();
        },
        configurable: false
    });

    Object.defineProperty(this, "sizePalette", {
        get: function () { return _sizePalette; },
        set: function (value) {
            if (value == _sizePalette) return;
            _sizePalette = value;
            if (value.isNormalized) {
                _sizeRange = InteractiveDataDisplay.Utils.getMinMax(_data.size);
            }

            this.fireAppearanceChanged("sizePalette");
            this.requestNextFrameOrUpdate();
        },
        configurable: false
    });

    Object.defineProperty(this, "shape", {
        get: function () { return _shape; },
        set: function (value) {
            if (value == _shape) return;
            _shape = value;

            this.fireAppearanceChanged("shape");
            this.requestNextFrameOrUpdate();
        },
        configurable: false
    });

    Object.defineProperty(this, "border", {
        get: function () { return _data.border; },
        set: function (value) {
            if (value == _data.border) return;
            _data.border = value;

            this.fireAppearanceChanged("border");
            this.requestNextFrameOrUpdate();
        },
        configurable: false
    });

    Object.defineProperty(this, "preRender", {
        get: function () { return _preRender; },
        set: function (value) {
            if (value == _preRender) return;
            _preRender = value;

            this.fireAppearanceChanged("preRender");
            this.requestNextFrameOrUpdate();
        },
        configurable: false
    });

    this.getLegend = function () {
        var that = this;
        var div = $("<div class='idd-legend-item'></div>");

        var itemDiv = $("<div></div>").appendTo(div);

        var fontSize = 14;
        if (document.defaultView && document.defaultView.getComputedStyle) {
            fontSize = parseFloat(document.defaultView.getComputedStyle(div[0], null).getPropertyValue("font-size"));
        }
        if (isNaN(fontSize) || fontSize == 0) fontSize = 14;

        var canvas = $("<canvas style='margin-right: 10px; display: inline-block'></canvas>").appendTo(itemDiv);
        var canvasIsVisible = true;
        var maxSize = fontSize * 1.5;
        var x1 = maxSize / 2 + 1;
        var y1 = x1;
        canvas[0].width = canvas[0].height = maxSize + 2;
        var canvasStyle = canvas[0].style;
        var context = canvas.get(0).getContext("2d");

        var nameDiv = $("<span class='idd-legend-item-title'></span>").appendTo(itemDiv);
        var setName = function () {
            nameDiv.text(that.name);
        }
        setName();

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
            sizeIsArray = InteractiveDataDisplay.Utils.isArray(_data.size);
            if (sizeIsArray) {
                size = maxSize;
                if (_sizePalette) {
                    var szTitleText = that.getTitle("size");
                    if (sizeIsVisible == 0) {
                        sizeDiv = $("<div style='width: 170px; margin-top: 5px; margin-bottom: 5px'></div>").appendTo(div);
                        sizeTitle = $("<div class='idd-legend-item-property'></div>").text(szTitleText).appendTo(sizeDiv);
                        sizeDivStyle = sizeDiv[0].style;
                        var paletteDiv = $("<div></div>").appendTo(sizeDiv);
                        sizeControl = new InteractiveDataDisplay.SizePaletteViewer(paletteDiv);
                        sizeIsVisible = 2;
                    } else {
                        sizeTitle.text(szTitleText);
                    }
                    sizeControl.palette = _sizePalette;
                    if (_sizePalette.isNormalized) {
                        sizeControl.dataRange = _sizeRange;
                    }
                    if (sizeIsVisible == 1) {
                        sizeDivStyle.display = "block";
                        sizeIsVisible = 2;
                    }
                }
            }
            else {
                size = Math.min(_data.size, maxSize);
                if (sizeIsVisible == 2) {
                    sizeDivStyle.display = "none";
                    sizeIsVisible = 1;
                }
            }
            halfSize = size / 2;
        };

        var colorTitle;
        var refreshColor = function () {
            colorIsArray = InteractiveDataDisplay.Utils.isArray(_data.color);
            drawBorder = false;
            if (colorIsArray && _colorPalette) {
                var clrTitleText = that.getTitle("color");
                if (colorIsVisible == 0) {                    
                    colorDiv = $("<div style='width: 170px; margin-top: 5px; margin-bottom: 5px'></div>").appendTo(div);
                    colorTitle = $("<div class='idd-legend-item-property'></div>").text(clrTitleText).appendTo(colorDiv);
                    colorDivStyle = colorDiv[0].style;
                    var paletteDiv = $("<div></div>").appendTo(colorDiv);
                    colorControl = new InteractiveDataDisplay.ColorPaletteViewer(paletteDiv);
                    colorIsVisible = 2;
                } else {
                    colorTitle.text(clrTitleText);
                }
                colorControl.palette = _colorPalette;
                if (_colorPalette.isNormalized) {
                    colorControl.dataRange = _colorRange;
                }
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
            if (colorIsArray) {
                border = "#000000";
                color = "#ffffff";
                drawBorder = true;
            }
            else {
                color = _data.color;
                border = color;
                if (_data.border) {
                    drawBorder = true;
                    border = _data.border;
                }
            }
        };

        var renderShape = function () {
            if (typeof (_shape) == "object") {
                if (_shape.getLegendItem) {
                    var drawData = { size: size, color: color, border: border };
                    for (var prop in _data) {
                        if (prop != "size" && prop != "color" && prop != "border") {
                            var v = _data[prop];
                            if (InteractiveDataDisplay.Utils.isArray(v)) drawData[prop] = v[i];
                            else drawData[prop] = v;
                        }
                    }

                    if (itemIsVisible == 0) {
                        item = _shape.getLegendItem(drawData);
                        itemDiv[0].insertBefore(item[0], name[0]);
                    }
                    else {
                        var newItem = _shape.getLegendItem(drawData);
                        item.replaceWith(newItem);
                        item = newItem;
                    }
                    itemDivStyle = item[0].style;
                    itemIsVisible = 2;
                }
                if (canvasIsVisible) {
                    canvasStyle.display = "none";
                    canvasIsVisible = false;
                }
            }
            else {
                if (itemIsVisible == 2) {
                    itemDivStyle.display = "none";
                    itemIsVisible = 1;
                }
                context.clearRect(0, 0, maxSize + 2, maxSize + 2);
                context.strokeStyle = border;
                context.fillStyle = color;

                var invShape = isStandartShape(_shape);
                switch (invShape) {
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
            }
        };

        refreshColor();
        refreshSize();
        renderShape();
        var that = this;

        this.host.bind("appearanceChanged",
            function (event, propertyName) {
                if (!propertyName || propertyName == "name")
                    setName();
                if (!propertyName || propertyName == "color" || propertyName == "colorPalette") 
                    refreshColor();
                if (!propertyName || propertyName == "size" || propertyName == "sizePalette")
                    refreshSize();                
                renderShape();
            });

        var onLegendRemove = function () {
            that.host.unbind("appearanceChanged");

            div[0].innerHTML = "";
            div.removeClass("idd-legend-item");
        };

        return { div: div, onLegendRemove: onLegendRemove };
    };

    // Initialization 
    if (initialData && typeof initialData.y != 'undefined')
        this.draw(initialData);
};

InteractiveDataDisplay.Markers.prototype = new InteractiveDataDisplay.CanvasPlot;

InteractiveDataDisplay.AdaptMarkerSize = function (markers, plotRect, screenSize, transform, context) {
    var visibleMarkers = 0;
    var x = markers.x;
    var y = markers.y;
    var xi, yi;
    for (var i = 0, n = x.length; i < n; i++) {
        xi = x[i];
        yi = y[i];
        if (xi >= plotRect.x && xi <= plotRect.x + plotRect.width && yi >= plotRect.y && yi <= plotRect.y + plotRect.height)
            visibleMarkers++;
    }
    // constants
    var areaConst = 0.2;
    var minAdaptiveSize = 15;
    var maxAdaptiveSize = 100;
    // adaptive size in plot coordinates
    var adaptiveSize = Math.sqrt(areaConst * plotRect.width * plotRect.height / visibleMarkers);
    // transform to screen coordinates and check limits
    adaptiveSize = transform.dataToScreenX(adaptiveSize) - transform.dataToScreenX(0);
    if (adaptiveSize < minAdaptiveSize) adaptiveSize = minAdaptiveSize;
    else if (adaptiveSize > maxAdaptiveSize) adaptiveSize = maxAdaptiveSize;
    markers.size = adaptiveSize;
};



;// Area plot takes data with coordinates named 'x', 'y1', 'y2' and a fill colour named 'fill'. 

InteractiveDataDisplay.Area = function (div, master) {
    var that = this;
    var defaultFill = "rgba(0,0,0,0.2)";

    // Initialization (#1)
    var initializer = InteractiveDataDisplay.Utils.getDataSourceFunction(div, InteractiveDataDisplay.readCsv);
    var initialData = initializer(div);

    this.base = InteractiveDataDisplay.CanvasPlot;
    this.base(div, master);


    var _x = []; // an array of horizontal axis coordinates
    var _y1 = [];
    var _y2 = []; // arrays of lower and upper limits of the band
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

    this.renderCore = function (plotRect, screenSize) {
        InteractiveDataDisplay.Area.prototype.renderCore.call(this, plotRect, screenSize);
        var context = that.getContext(true);

        if (_x === undefined || _y1 == undefined || _y2 == undefined)
            return;
        var n = _y1.length;
        if (n == 0) return;

        var t = that.getTransform();
        var dataToScreenX = t.dataToScreenX;
        var dataToScreenY = t.dataToScreenY;

        // size of the canvas
        var w_s = screenSize.width;
        var h_s = screenSize.height;
        var xmin = 0, xmax = w_s;
        var ymin = 0, ymax = h_s;

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

    // Clipping algorithms
    var code = function (x, y, xmin, xmax, ymin, ymax) {
        return (x < xmin) << 3 | (x > xmax) << 2 | (y < ymin) << 1 | (y > ymax);
    };


    // Others
    this.onDataTransformChanged = function (arg) {
        this.invalidateLocalBounds();
        InteractiveDataDisplay.Area.prototype.onDataTransformChanged.call(this, arg);
    };

    // Initialization 
    if (initialData && initialData.x && initialData.y1 && initialData.y2)
        this.draw(initialData);
}

InteractiveDataDisplay.Area.prototype = new InteractiveDataDisplay.CanvasPlot;
;// See http://jsperf.com/rendering-a-frame-in-image-data
InteractiveDataDisplay.heatmapBackgroundRenderer = new InteractiveDataDisplay.SharedRenderWorker(
    function() {
        var workerCodeUri;
        if(typeof InteractiveDataDisplay.heatmapBackgroundRendererCodeBase64 === 'undefined' || /PhantomJS/.test(window.navigator.userAgent)) {
            // Build process usually initializes the heatmapBackgroundRendererCodeBase64 with base64 encoded 
            // concatenation of idd.heatmapworker.js and idd.transforms.js.
            workerCodeUri = "idd.heatmapworker.js";
        }
        else {
           var workerBlob = new Blob([ window.atob(InteractiveDataDisplay.heatmapBackgroundRendererCodeBase64) ], { type: 'text/javascript' });
           workerCodeUri = window.URL.createObjectURL(workerBlob);
        }
        return workerCodeUri
    } (),
    function (heatmapPlot, completedTask) {
        heatmapPlot.onRenderTaskCompleted(completedTask);
    });

// Renders a fuction  f(x,y) on a regular grid (x,y) as a heat map using color palette
InteractiveDataDisplay.Heatmap = function (div, master) {

    // Initialization (#1)
    var initializer = InteractiveDataDisplay.Utils.getDataSourceFunction(div, InteractiveDataDisplay.readCsv2d);
    var initialData = initializer(div);
    if (initialData && typeof initialData.y !== 'undefined' && typeof initialData.f !== 'undefined') {
        var y = initialData.y;
        var f = initialData.f;
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
    var _f;
    var _fmin, _fmax;
    var _opacity; // 1 is opaque, 0 is transparent
    var _mode; // gradient or matrix
    var _palette;
    var _dataChanged;
    var _paletteColors;

    loadOpacity((initialData && typeof (initialData.opacity) != 'undefined') ? parseFloat(initialData.opacity) : 1.0);
    loadPalette((initialData && typeof (initialData.palette) != 'undefined') ? initialData.palette : InteractiveDataDisplay.palettes.grayscale);

    var findFminmax = function () {
        var n = _f.length;
        if (n < 1) return;
        var m = _f[0].length;
        if (m < 1) return;
        _fmin = _fmax = _f[0][0];
        for (var i = 0; i < n; i++) {
            var fi = _f[i];
            for (var j = 0; j < m; j++) {
                var v = fi[j];
                if (v == v) {
                    if (v > _fmax) _fmax = v;
                    else if (v < _fmin) _fmin = v;
                }
            }
        }
    };

    var lastCompletedTask;
    var that = this;

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

    this.draw = function (data) {
        var f = data.f;
        if (!f) throw "Data series f is undefined";
        var n = f.length;
        var m = f[0].length;

        var x = data.x;
        if (!x) {
            x = InteractiveDataDisplay.Utils.range(0, n);
        } else {
            if (x.length != n && x.length != n + 1) throw "Data series x must have length equal or one more than length of data series f by first dimension";
        }

        var y = data.y;
        if (!y) {
            y = InteractiveDataDisplay.Utils.range(0, m);
        } else {
            if (y.length != m && y.length != m + 1) throw "Data series y must have length equal or one more than length of data series f by second dimension";
        }

        _x = x;
        _y = y;
        _f = f;
        if (x.length == n) {
            if (y.length != m) throw "Data series y must have length equal to length of data series f by second dimension";
            _mode = 'gradient';
        } else {
            if (y.length != m + 1) throw "Data series y must have length equal to one more than length of data series f by second dimension";
            _mode = 'matrix';
        }

        if (_x.length < 2) throw "Data series x must have at least 2 elements by each dimension";
        if (_y.length < 2) throw "Data series y must have at least 2 elements by each dimension";

        // styles:
        if (data && typeof (data.opacity) != 'undefined') {
            loadOpacity(parseFloat(data.opacity));
        }
        if (data && typeof (data.palette) != 'undefined')
            loadPalette(data.palette);
        if (_palette.isNormalized) findFminmax();

        _dataChanged = true;
        var prevBB = this.invalidateLocalBounds();
        var bb = this.getLocalBounds();

        if (InteractiveDataDisplay.Utils.equalRect(prevBB, bb))
            this.requestNextFrame();
        else
            this.requestNextFrameOrUpdate();
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
                    f: _f,
                    fmin: _fmin,
                    fmax: _fmax,
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
    this.getValue = function (xd, yd) {
        var n = _x.length;
        var m = _y.length;
        if (n == 0 || m == 0) return null;

        var cell = getCellContaining(xd, yd);
        if (cell == undefined) return null;
        if (cell != cell) return "<div>" + (this.name || "heatmap") + ": (unknown value)</div>";

        var value;
        if (_mode === "gradient") {
            var flb, flt, frt, frb;
            flt = _f[cell.iLeft][cell.jBottom + 1];
            flb = _f[cell.iLeft][cell.jBottom];
            frt = _f[cell.iLeft + 1][cell.jBottom + 1];
            frb = _f[cell.iLeft + 1][cell.jBottom];

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
            value = _f[cell.iLeft][cell.jBottom];
        }
        return value;
    };

    this.getTooltip = function (xd, yd) {
        if (_f === undefined)
            return;

        var value = this.getValue(xd, yd);
        if (value == null) return;
        return "<div>" + (this.name || "heatmap") +
            ": " + value + "</div>";
    };


    Object.defineProperty(this, "palette", {
        get: function () { return _palette; },
        set: function (value) {
            if (value == _palette) return;
            if (!value) throw "Heatmap palette is undefined";
            if (_palette && value.isNormalized && !_palette.isNormalized && _f) {
                findFminmax();
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
        var div = $("<div class='idd-legend-item'></div>");
        var that = this;
        var nameDiv = $("<span class='idd-legend-item-title'></span>").appendTo(div);
        var setName = function () {
            nameDiv.text(that.name);
        }
        setName();

        var paletteDiv = $("<div style='width: 170px; margin-top: 5px; margin-bottom: 5px'></div>").appendTo(div);
        var paletteControl = new InteractiveDataDisplay.ColorPaletteViewer(paletteDiv, _palette);
        if (_palette && _palette.isNormalized) {
            paletteControl.dataRange = { min: _fmin, max: _fmax };
        }

        this.host.bind("appearanceChanged",
            function (event, propertyName) {
                if (!propertyName || propertyName == "name")
                    setName();
                if (!propertyName || propertyName == "palette") paletteControl.palette = _palette;
                var oldRange = paletteControl.dataRange;
                if (_palette && _palette.isNormalized && (oldRange == undefined || oldRange.min != _fmin || oldRange.max != _fmax)) {
                    paletteControl.dataRange = { min: _fmin, max: _fmax };
                }
            });

        var onLegendRemove = function () {
            that.host.unbind("appearanceChanged");

            div[0].innerHTML = "";
            div.removeClass("idd-legend-item");
        };

        return { div: div, onLegendRemove: onLegendRemove };
    };

    // Initialization 
    if (initialData && typeof initialData.f != 'undefined')
        this.draw(initialData);
};
InteractiveDataDisplay.Heatmap.prototype = new InteractiveDataDisplay.CanvasPlot();

InteractiveDataDisplay.register("heatmap", function (jqDiv, master) {
    return new InteractiveDataDisplay.Heatmap(jqDiv, master);
});
;InteractiveDataDisplay.BingMaps = InteractiveDataDisplay.BingMaps || {};

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

        this.constraint = function (plotRect, screenSize) {
            var mapWidth = _map.getWidth();
            var mapHeight = _map.getHeight();

            if (mapWidth <= 1 || mapHeight <= 1)
                return plotRect;

            bingMapsAnimation.setMapView(plotRect, screenSize);
            mapRect = InteractiveDataDisplay.Utils.getPlotRectForMap(_map);
            return mapRect;
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

InteractiveDataDisplay.BingMapsPlot.prototype = new InteractiveDataDisplay.Plot;;}
(function () {
    if (window.define) {
        define(['jquery', 'rx'],
            function ($, Rx) {
                IDD($, Rx);
                return InteractiveDataDisplay;
            });
    } else {
        IDD($, Rx);
        window.InteractiveDataDisplay = InteractiveDataDisplay;
    }
}());