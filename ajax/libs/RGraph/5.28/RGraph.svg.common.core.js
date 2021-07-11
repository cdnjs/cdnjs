// Version: 2021-03-01
//
    // o--------------------------------------------------------------------------------o
    // | This file is part of the RGraph package - you can learn more at:               |
    // |                                                                                |
    // |                         https://www.rgraph.net                                 |
    // |                                                                                |
    // | RGraph is licensed under the Open Source MIT license. That means that it's     |
    // | totally free to use and there are no restrictions on what you can do with it!  |
    // o--------------------------------------------------------------------------------o

    RGraph        = window.RGraph || {isrgraph:true,isRGraph:true,rgraph:true};
    RGraph.SVG    = RGraph.SVG    || {};
    RGraph.SVG.FX = RGraph.SVG.FX || {};


// Module pattern
(function (win, doc, undefined)
{
    RGraph.SVG.REG = {
        store: []
    };
    
    // ObjectRegistry
    RGraph.SVG.OR = {objects: []};
    
    // Used to categorise trigonometery functions
    RGraph.SVG.TRIG        = {};
    RGraph.SVG.TRIG.HALFPI = Math.PI * .4999;
    RGraph.SVG.TRIG.PI     = RGraph.SVG.TRIG.HALFPI * 2;
    RGraph.SVG.TRIG.TWOPI  = RGraph.SVG.TRIG.PI * 2;
    
    RGraph.SVG.events = [];


    // This allows you to set globalconfiguration values that are copied to
    // all objects automatically.
    RGraph.SVG.GLOBALS = {};


    RGraph.SVG.ISFF     = navigator.userAgent.indexOf('Firefox') != -1;
    RGraph.SVG.ISOPERA  = navigator.userAgent.indexOf('Opera') != -1;
    RGraph.SVG.ISCHROME = navigator.userAgent.indexOf('Chrome') != -1;
    RGraph.SVG.ISSAFARI = navigator.userAgent.indexOf('Safari') != -1 && !RGraph.SVG.ISCHROME;
    RGraph.SVG.ISWEBKIT = navigator.userAgent.indexOf('WebKit') != -1;

    RGraph.SVG.ISIE     = navigator.userAgent.indexOf('Trident') > 0 || navigator.userAgent.indexOf('MSIE') > 0;
    RGraph.SVG.ISIE9    = navigator.userAgent.indexOf('MSIE 9') > 0;
    RGraph.SVG.ISIE10   = navigator.userAgent.indexOf('MSIE 10') > 0;
    RGraph.SVG.ISIE11UP = navigator.userAgent.indexOf('MSIE') == -1 && navigator.userAgent.indexOf('Trident') > 0;
    RGraph.SVG.ISIE10UP = RGraph.SVG.ISIE10 || RGraph.SVG.ISIE11UP;
    RGraph.SVG.ISIE9UP  = RGraph.SVG.ISIE9 || RGraph.SVG.ISIE10UP;
    
    // Some commonly used bits of info
    RGraph.SVG.MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    RGraph.SVG.MONTHS_LONG  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    RGraph.SVG.DAYS_SHORT   = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    RGraph.SVG.DAYS_LONG    = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];








    //
    // Create an SVG tag
    //
    RGraph.SVG.createSVG = function (opt)
    {
        var container = opt.container,
            obj       = opt.object;

        if (container.__svg__) {
            return container.__svg__;
        }

        var svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute('style', 'top: 0; left: 0; position: absolute');
            svg.setAttribute('width', container.offsetWidth);
            svg.setAttribute('height', container.offsetHeight);
            svg.setAttribute('version', '1.1');
            svg.setAttributeNS("http://www.w3.org/2000/xmlns/", 'xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            svg.__object__    = obj;
            svg.__container__ = container;
        container.appendChild(svg);

        container.__svg__    = svg;
        container.__object__ = obj;

        var style = getComputedStyle(container);
        if (style.position !== 'absolute' && style.position !== 'fixed' && style.position !== 'sticky') {
            container.style.position = 'relative';
        }

        // Add the groups that facilitate "background layers"

        var numLayers = 10;

        for (var i=1; i<=numLayers; ++i) {
            
            var group = RGraph.SVG.create({
                svg: svg,
                type: 'g',
                attr: {
                    className: 'background' + i
                }
            });

            // Store a reference to the group
            obj.layers['background' + i] = group;
            svg['background' + i]        = group;
        }
        
        // Add the group tag to the SVG that contains all of the elements
        var group = RGraph.SVG.create({
            svg: svg,
            type: 'g',
            attr: {
                className: 'all-elements'
            }
        });

        container.__svg__.all = group;

        return svg;
    };








    //
    // Create a defs tag inside the SVG
    //
    RGraph.SVG.createDefs = function (obj)
    {
        if (!obj.svg.defs) {

            var defs = RGraph.SVG.create({
                svg: obj.svg,
                type: 'defs'
            });
    
            obj.svg.defs = defs;
        }

        return defs;
    };








    //
    // Creates a tag depending on the args that you give
    //
    //@param opt object The options for the function
    //
    RGraph.SVG.create = function (opt)
    {
        var ns  = "http://www.w3.org/2000/svg",
            tag = doc.createElementNS(ns, opt.type);

        // Add the attributes
        for (var o in opt.attr) {
            if (typeof o === 'string') {
            
                var name = o;

                if (o === 'className') {
                    name = 'class';
                }
                if ( (opt.type === 'a' || opt.type === 'image') && o === 'xlink:href') {
                    tag.setAttributeNS('http://www.w3.org/1999/xlink', o, String(opt.attr[o]));
                } else {
                    if (RGraph.SVG.isNull(opt.attr[o])) {
                        opt.attr[o] = '';
                    }
                    tag.setAttribute(name, String(opt.attr[o]));
                }
            }
        }
        
        // Add the style
        for (var o in opt.style) {
            if (typeof o === 'string') {
                tag.style[o] = String(opt.style[o]);
            }
        }

        if (opt.parent) {
            opt.parent.appendChild(tag);
        } else {
            opt.svg.appendChild(tag);
        }

        return tag;
    };








    //
    // Function that adds up all of the offsetLeft and offsetTops to get
    // X/Y coords for the mouse
    //
    //@param object e The event object
    //@return array   The X/Y coordinate pair representing the mouse
    //                location in relation to the SVG tag.
    //
    RGraph.SVG.getMouseXY = function(e)
    {
        // This is necessary for IE9
        if (!e.target) {
            return;
        }

        var el      = e.target,
            offsetX = 0,
            offsetY = 0,
            x,
            y;


        if (typeof el.offsetParent !== 'undefined') { 
            do {
                offsetX += el.offsetLeft;
                offsetY += el.offsetTop;
            } while ((el = el.offsetParent));
        }

        x = e.pageX;
        y = e.pageY;

        x -= (2 * (parseInt(document.body.style.borderLeftWidth) || 0));
        y -= (2 * (parseInt(document.body.style.borderTopWidth) || 0));

        // We return a javascript array with x and y defined
        return [x, y];
    };








    //
    // Draws an X axis
    //
    //@param The chart object
    //
    RGraph.SVG.drawXAxis = function (obj)
    {
        var properties = obj.properties;

        // Draw the axis
        if (properties.xaxis) {

            var y = obj.type === 'hbar' ? obj.height - properties.marginBottom : obj.getYCoord(obj.scale.min < 0 && obj.scale.max < 0 ? obj.scale.max : (obj.scale.min > 0 && obj.scale.max > 0 ? obj.scale.min : 0));

            var axis = RGraph.SVG.create({
                svg: obj.svg,
                parent: obj.svg.all,
                type: 'path',
                attr: {
                    d: 'M{1} {2} L{3} {4}'.format(
                        properties.marginLeft,
                        y,
                        obj.width - properties.marginRight,
                        y
                    ),
                    fill: properties.xaxisColor,
                    stroke: properties.xaxisColor,
                    'stroke-width': typeof properties.xaxisLinewidth === 'number' ? properties.xaxisLinewidth : 1,
                    'shape-rendering': 'crispEdges',
                    'stroke-linecap': 'square'
                }
            });


            // HBar X axis
            if (obj.type === 'hbar') {
                var width  = obj.graphWidth / obj.data.length,
                    x      = properties.marginLeft,
                    startY = (obj.height - properties.marginBottom),
                    endY   = (obj.height - properties.marginBottom) + properties.xaxisTickmarksLength;

            // Line/Bar/Waterfall/Scatter X axis
            } else {
                var width  = obj.graphWidth / obj.data.length,
                    x      = properties.marginLeft,
                    startY = obj.getYCoord(0) - (properties.yaxisScaleMin < 0 ? properties.xaxisTickmarksLength : 0),
                    endY   = obj.getYCoord(0) + properties.xaxisTickmarksLength;
                    
                if (obj.scale.min < 0 && obj.scale.max <= 0) {
                    startY = properties.marginTop;
                    endY   = properties.marginTop - properties.xaxisTickmarksLength;
                }

                if (obj.scale.min > 0 && obj.scale.max > 0) {
                    startY = obj.getYCoord(obj.scale.min);
                    endY   = obj.getYCoord(obj.scale.min) + properties.xaxisTickmarksLength;
                }

                if (obj.mirrorScale) {
                    startY = obj.height / 2 -  properties.xaxisTickmarksLength;
                    endY   = obj.height / 2 + properties.xaxisTickmarksLength;
                }
            }








            // Draw the tickmarks
            if (properties.xaxisTickmarks) {

                // The HBar uses a scale
                if (properties.xaxisScale) {
                
                    var zeroXCoord = obj.getXCoord(0);

                    for (var i=0; i<(typeof properties.xaxisLabelsPositionEdgeTickmarksCount === 'number' ? properties.xaxisLabelsPositionEdgeTickmarksCount : (obj.scale.numlabels + (properties.yaxis && properties.xaxisScaleMin === 0 ? 0 : 1))); ++i) {

                        if (obj.type === 'hbar') {
                            var dataPoints = obj.data.length;
                        }
                    
                        x = properties.marginLeft + ((i+(properties.yaxis && properties.xaxisScaleMin === 0 && properties.yaxisPosition === 'left' ? 1 : 0)) * (obj.graphWidth / obj.scale.numlabels));

                        // Allow Manual specification of number of tickmarks
                        if (typeof properties.xaxisLabelsPositionEdgeTickmarksCount === 'number') {
                            dataPoints = properties.xaxisLabelsPositionEdgeTickmarksCount;
                            var gap    = (obj.graphWidth / properties.xaxisLabelsPositionEdgeTickmarksCount );
                            x          = (gap * i) + properties.marginLeft + gap;
                            
                            // Allow for the Y axis being on the right so the tickmarks
                            // have to be adjusted
                            if (properties.yaxisPosition === 'right') {
                                x -= gap;
                            }
                        }
                        
                        // Don't draw a tick at the zero position
                        if (
                                properties.yaxis
                            && x < (zeroXCoord + 3)
                            && x > (zeroXCoord - 3)
                           ) {
                            continue;
                        }

                        RGraph.SVG.create({
                            svg: obj.svg,
                            parent: obj.svg.all,
                            type: 'path',
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    x,
                                    startY,
                                    x,
                                    endY
                                ),
                                stroke: properties.xaxisColor,
                                'stroke-width': typeof properties.xaxisLinewidth === 'number' ? properties.xaxisLinewidth : 1,
                                'shape-rendering': "crispEdges"
                            }
                        });
                        
                    }

                    // Draw an extra tickmark in some conditions. This
                    // is a bit of a edge-case
                    if (   properties.yaxisPosition === 'right'
                        && properties.xaxisScaleMin < 0
                        && properties.xaxisScaleMax > 0
                       ) {


                        RGraph.SVG.create({
                            svg: obj.svg,
                            parent: obj.svg.all,
                            type: 'path',
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    obj.width - properties.marginRight,
                                    startY,
                                    obj.width - properties.marginRight,
                                    endY
                                ),
                                stroke: properties.xaxisColor,
                                'stroke-width': typeof properties.xaxisLinewidth === 'number' ? properties.xaxisLinewidth : 1,
                                'shape-rendering': "crispEdges"
                            }
                        });
                    }



                } else {

                    // This style is used by Bar and Scatter charts
                    if (properties.xaxisLabelsPosition === 'section') {

                        if (obj.type === 'bar' || obj.type === 'waterfall') {
                            var dataPoints = obj.data.length;
                        } else if (obj.type === 'line'){
                            var dataPoints = obj.data[0].length;
                        } else if (obj.type === 'scatter') {
                            var dataPoints = properties.xaxisLabels ? properties.xaxisLabels.length : 10;
                        }
                        
                        // Allow Manual specification of number of tickmarks
                        if (typeof properties.xaxisLabelsPositionSectionTickmarksCount === 'number') {
                            dataPoints = properties.xaxisLabelsPositionSectionTickmarksCount;
                        }

                        for (var i=0; i<dataPoints; ++i) {
        
                            // Allow for a right hand Y axis so move the tickmarks to the left
                            if (properties.yaxisPosition === 'right') {
                                x = properties.marginLeft + (properties.marginInnerLeft || 0) + (i * ( (obj.graphWidth - (properties.marginInnerLeft || 0) - (properties.marginInnerRight || 0) ) / dataPoints));
                            } else {
                                x = properties.marginLeft + (properties.marginInnerLeft || 0) + ((i+1) * ( (obj.graphWidth - (properties.marginInnerLeft || 0) - (properties.marginInnerRight || 0) ) / dataPoints));
                            }


                            RGraph.SVG.create({
                                svg: obj.svg,
                                parent: obj.svg.all,
                                type: 'path',
                                attr: {
                                    d: 'M{1} {2} L{3} {4}'.format(
                                        x + 0.001,
                                        startY,
                                        x,
                                        endY
                                    ),
                                    stroke: properties.xaxisColor,
                                    'stroke-width': typeof properties.xaxisLinewidth === 'number' ? properties.xaxisLinewidth : 1,
                                    'shape-rendering': "crispEdges"
                                }
                            });
                        }
                        
                        
                        // Draw an extra tickmark if the X axis is on the right but not being shown
                        if (properties.yaxisPosition === 'right' && !properties.yaxis) {
                            RGraph.SVG.create({
                                svg: obj.svg,
                                parent: obj.svg.all,
                                type: 'path',
                                attr: {
                                    d: 'M{1} {2} L{3} {4}'.format(
                                        obj.width - properties.marginRight  + 0.001,
                                        startY,
                                        obj.width - properties.marginRight  + 0.001,
                                        endY
                                    ),
                                    stroke: properties.xaxisColor,
                                    'stroke-width': typeof properties.xaxisLinewidth === 'number' ? properties.xaxisLinewidth : 1,
                                    'shape-rendering': "crispEdges"
                                }
                            });
                        }

                    // This style is used by line charts
                    } else if (properties.xaxisLabelsPosition === 'edge') {

                        if (typeof properties.xaxisLabelsPositionEdgeTickmarksCount === 'number') {
                            var len = properties.xaxisLabelsPositionEdgeTickmarksCount;
                        } else {
                            var len = obj.data && obj.data[0] && obj.data[0].length ? obj.data[0].length : 0;
                        }
    
                        for (var i=0; i<len; ++i) {

                            var gap = ( (obj.graphWidth) / (len - 1));
                            
                            if (properties.yaxisPosition === 'right') {
                                x = properties.marginLeft + (i * gap);
                                
                                // If the X position is within 3 pizels of the X position of the Y
                                // axis then skip it
                                if (properties.yaxis && x > (obj.width - properties.marginRight - 3) && x < (obj.width - properties.marginRight + 3)) {
                                    continue;
                                }
                            } else {
                                x = properties.marginLeft + ((i+1) * gap);
                            }

                            RGraph.SVG.create({
                                svg: obj.svg,
                                parent: obj.svg.all,
                                type: 'path',
                                attr: {
                                    d: 'M{1} {2} L{3} {4}'.format(
                                        x + 0.001,
                                        startY,
                                        x,
                                        endY
                                    ),
                                    stroke: properties.xaxisColor,
                                    'stroke-width': typeof properties.xaxisLinewidth === 'number' ? properties.xaxisLinewidth : 1,
                                    'shape-rendering': "crispEdges"
                                }
                            });
                        }
                    }
                }






                // Draw an extra tick if the Y axis is not being shown
                if (properties.yaxis === false || (properties.marginInnerLeft || 0) > 0) {
                    RGraph.SVG.create({
                        svg: obj.svg,
                        parent: obj.svg.all,
                        type: 'path',
                        attr: {
                            d: 'M{1} {2} L{3} {4}'.format(
                                properties.marginLeft + (properties.marginInnerLeft || 0) + 0.001,
                                startY,
                                properties.marginLeft + (properties.marginInnerLeft || 0),
                                endY
                            ),
                            stroke: obj.properties.xaxisColor,
                            'stroke-width': typeof properties.xaxisLinewidth === 'number' ? properties.xaxisLinewidth : 1,
                            'shape-rendering': "crispEdges",
                            parent: obj.svg.all,
                        }
                    });
                }
            }
        }












        
        // Get the text configuration
        var textConf = RGraph.SVG.getTextConf({
            object: obj,
            prefix: 'xaxisLabels'
        });

        //
        // Draw an X axis scale
        //
        if (properties.xaxisScale) {

            if (obj.type === 'scatter') {
                obj.xscale = RGraph.SVG.getScale({
                    object:    obj,
                    numlabels: properties.xaxisLabelsCount,
                    unitsPre:  properties.xaxisScaleUnitsPre,
                    unitsPost: properties.xaxisScaleUnitsPost,
                    max:       properties.xaxisScaleMax,
                    min:       properties.xaxisScaleMin,
                    point:     properties.xaxisScalePoint,
                    round:     properties.xaxisScaleRound,
                    thousand:  properties.xaxisScaleThousand,
                    decimals:  properties.xaxisScaleDecimals,
                    strict:    typeof properties.xaxisScaleMax === 'number',
                    formatter: properties.xaxisScaleFormatter
                });
                
                
                
                
                
                
                
                var segment = obj.graphWidth / properties.xaxisLabelsCount
                
                for (var i=0; i<obj.xscale.labels.length; ++i) {
                
                    var x = properties.marginLeft + (segment * i) + segment + properties.xaxisLabelsOffsetx;
                    var y = (obj.height - properties.marginBottom) + (properties.xaxis ? properties.xaxisTickmarksLength + 6 : 10) + (properties.xaxisLinewidth || 1) + properties.xaxisLabelsOffsety;
                
                    RGraph.SVG.text({
                        
                        object: obj,
                        parent: obj.svg.all,
                        tag:    'labels.xaxis',
                        
                        text:   obj.xscale.labels[i],
                        
                        x:      x,
                        y:      y,
                        
                        halign: 'center',
                        valign: 'top',

                        font:   textConf.font,
                        size:   textConf.size,
                        bold:   textConf.bold,
                        italic: textConf.italic,
                        color:  textConf.color
                    });
                }
                
                
                
                

                // Add the minimum label if labels are enabled
                if (properties.xaxisLabelsCount > 0) {
                    var y   = obj.height - properties.marginBottom + properties.xaxisLabelsOffsety + (properties.xaxis ? properties.xaxisTickmarksLength + 6 : 10),
                        str = RGraph.SVG.numberFormat({
                            object:     obj,
                            num:        properties.xaxisScaleMin.toFixed(properties.xaxisScaleDecimals),
                            prepend:    properties.xaxisScaleUnitsPre,
                            append:     properties.xaxisScaleUnitsPost,
                            point:      properties.xaxisScalePoint,
                            thousand:   properties.xaxisScaleThousand,
                            formatter:  properties.xaxisScaleFormatter
                        });

                    var text = RGraph.SVG.text({
                        
                        object: obj,
                        parent: obj.svg.all,
                        tag:    'labels.xaxis',
                        
                        text: typeof properties.xaxisScaleFormatter === 'function' ? (properties.xaxisScaleFormatter)(this, properties.xaxisScaleMin) : str,
                        
                        x: properties.marginLeft + properties.xaxisLabelsOffsetx,
                        y: y,
                        
                        halign: 'center',
                        valign: 'top',

                        font:   textConf.font,
                        size:   textConf.size,
                        bold:   textConf.bold,
                        italic: textConf.italic,
                        color:  textConf.color
                    });
                }
            
            
            // =========================================================================
            } else {

                var segment = obj.graphWidth / properties.xaxisLabelsCount,
                    scale   = obj.scale;

                for (var i=0; i<scale.labels.length; ++i) {

                    var x = properties.marginLeft + (segment * i) + segment + properties.xaxisLabelsOffsetx;
                    var y = (obj.height - properties.marginBottom) + (properties.xaxis ? properties.xaxisTickmarksLength + 6 : 10) + (properties.xaxisLinewidth || 1) + properties.xaxisLabelsOffsety;

                    // If the Y axis is positioned on the RHS then the
                    // labels should be reversed (HBar)
                    if (   (obj.type === 'hbar' || (obj.type === 'scatter' && properties.xaxis))
                        && properties.yaxisPosition === 'right'
                       ) {
                        x = obj.width - properties.marginRight - (segment * i) - segment + properties.xaxisLabelsOffsetx;
                    }

                    RGraph.SVG.text({
                        
                        object: obj,
                        parent: obj.svg.all,
                        
                        text:   obj.scale.labels[i],
                        x:      x,
                        y:      y,
                        halign: 'center',
                        valign: 'top',
                        
                        tag:    'labels.xaxis',
                        
                        font:   textConf.font,
                        size:   textConf.size,
                        bold:   textConf.bold,
                        italic: textConf.italic,
                        color:  textConf.color
                    });
                }
                
                
                
                
    
                // Add the minimum label if labels are enabled
                if (properties.xaxisLabelsCount > 0) {
                    var y   = obj.height - properties.marginBottom + properties.xaxisLabelsOffsety + (properties.xaxis ? properties.xaxisTickmarksLength + 6 : 10),
                        str = RGraph.SVG.numberFormat({
                            object:     obj,
                            num:        properties.xaxisScaleMin.toFixed(properties.xaxisScaleDecimals),
                            prepend:    properties.xaxisScaleUnitsPre,
                            append:     properties.xaxisScaleUnitsPost,
                            point:      properties.xaxisScalePoint,
                            thousand:   properties.xaxisScaleThousand,
                            formatter:  properties.xaxisScaleFormatter
                        });

                    var text = RGraph.SVG.text({
                        
                        object: obj,
                        parent: obj.svg.all,
                        tag:    'labels.xaxis',
                        
                        text: typeof properties.xaxisScaleFormatter === 'function' ? (properties.xaxisScaleFormatter)(this, properties.xaxisScaleMin) : str,

                        x: properties.yaxisPosition === 'right' ? obj.width - properties.marginRight + properties.xaxisLabelsOffsetx : properties.marginLeft + properties.xaxisLabelsOffsetx,
                        y: y,
                        
                        halign: 'center',
                        valign: 'top',
                        
                        font:   textConf.font,
                        size:   textConf.size,
                        bold:   textConf.bold,
                        italic: textConf.talic,
                        color:  textConf.color
                    });
                }
            }

        //
        // Draw the X axis labels
        //
        } else {
            if (typeof properties.xaxisLabels === 'object' && !RGraph.SVG.isNull(properties.xaxisLabels) ) {
            
                var angle = properties.xaxisLabelsAngle;

                // Loop through the X labels
                if (properties.xaxisLabelsPosition === 'section') {
                
                    var segment = (obj.width - properties.marginLeft - properties.marginRight - (properties.marginInnerLeft || 0) - (properties.marginInnerRight || 0) ) / properties.xaxisLabels.length;
                
                    for (var i=0; i<properties.xaxisLabels.length; ++i) {
                    
                        var x = properties.marginLeft + (properties.marginInnerLeft || 0) + (segment / 2) + (i * segment);

                        if (obj.scale.max <=0 && obj.scale.min < obj.scale.max) {
                            var y = properties.marginTop - (RGraph.SVG.ISFF ? 5 : 10)  - (properties.xaxisLinewidth || 1) + properties.xaxisLabelsOffsety;
                            var valign = 'bottom';
                        } else {
                            var y = obj.height - properties.marginBottom + (RGraph.SVG.ISFF ? 5 : 10) + (properties.xaxisLinewidth || 1) + properties.xaxisLabelsOffsety;
                            var valign = 'top';
                        }

                        RGraph.SVG.text({
                            
                            object: obj,
                            parent: obj.svg.all,
                            tag:    'labels.xaxis',
                            
                            text: properties.xaxisLabels[i],
                            
                            x: x + properties.xaxisLabelsOffsetx,
                            y: y,
                            
                            valign: (typeof angle === 'number' && angle) ? 'center' : valign,
                            halign: (typeof angle === 'number' && angle) ? 'right' : 'center',

                            angle: angle,

                            size:   textConf.size,
                            italic: textConf.italic,
                            font:   textConf.font,
                            bold:   textConf.bold,
                            color:  textConf.color
                        });
                    }

                } else if (properties.xaxisLabelsPosition === 'edge') {
    
                    if (obj.type === 'line') {
                        var hmargin = properties.marginInner;
                    } else {
                        var hmargin = 0;
                    }
    
    
    
                    var segment = (obj.graphWidth - hmargin - hmargin) / (properties.xaxisLabels.length - 1);

                    for (var i=0; i<properties.xaxisLabels.length; ++i) {
                    
                        var x = properties.marginLeft + (i * segment) + hmargin;

                        if (obj.scale.max <= 0 && obj.scale.min < 0) {
                            valign = 'bottom';
                            y = properties.marginTop - (RGraph.SVG.ISFF ? 5 : 10) - (properties.xaxisTickmarksLength - 5)  - (properties.xaxisLinewidth || 1) + properties.xaxisLabelsOffsety
                        } else {
                            valign = 'top';
                            y = obj.height - properties.marginBottom + (RGraph.SVG.ISFF ? 5 : 10) + (properties.xaxisTickmarksLength - 5) + (properties.xaxisLinewidth || 1) + properties.xaxisLabelsOffsety;
                        }
                    
                        RGraph.SVG.text({

                            object: obj,
                            parent: obj.svg.all,
                            tag:    'labels.xaxis',

                            text: properties.xaxisLabels[i],

                            x: x + properties.xaxisLabelsOffsetx,
                            y: y,

                            valign: (typeof angle === 'number' && angle) ? 'center' : valign,
                            halign: (typeof angle === 'number' && angle) ? 'right' : 'center',

                            angle: angle,

                            size:   textConf.size,
                            italic: textConf.italic,
                            font:   textConf.font,
                            bold:   textConf.bold,
                            color:  textConf.color
                        });
                    }
                }
            }
        }

    // Save this so that it can be used for the title
    var labelsY = y + properties.xaxisLabelsOffsety;


























        //
        // DRAW THE TITLE
        //
        if (properties.xaxisTitle) {

            // Get the size of the X axis labels
            var textConf_labels = RGraph.SVG.getTextConf({
                object: obj,
                prefix: obj.type === 'hbar' ? 'yaxisLabels' : 'xaxisLabels'
            });

            var x = properties.marginLeft + ((obj.width - properties.marginLeft - properties.marginRight) / 2) + (properties.xaxisTitleOffsetx || 0);
            var y = labelsY + (textConf_labels.size * 1.5);

            
            // Get the size of the X axis title
            //if (properties.xaxisScale || (properties.xaxisLabels && properties.xaxisLabels.length) ) {
            var textConf = RGraph.SVG.getTextConf({
                object: obj,
                prefix: 'xaxisTitle'
            });
            //}


            // Specific X and Y coordinates for the title
            if (typeof properties.xaxisTitleX === 'number') x = properties.xaxisTitleX;
            if (typeof properties.xaxisTitleY === 'number') y = properties.xaxisTitleY;

            RGraph.SVG.text({
                object: obj,
                parent: obj.svg.all,
                tag:    'xaxisTitle',
                
                text:   String(properties.xaxisTitle),
                
                x:      x + (properties.xaxisTitleOffsetx || 0),
                y:      y + (properties.xaxisTitleOffsety || 0),

                valign: typeof properties.xaxisTitleValign === 'string' ? properties.xaxisTitleValign : 'top',
                halign: typeof properties.xaxisTitleHalign === 'string' ? properties.xaxisTitleHalign : 'center',
                
                size:   textConf.size,
                italic: textConf.italic,
                font:   textConf.font,
                bold:   textConf.bold,
                color:  textConf.color
            });
        }
    };








    //
    // Draws an Y axis
    //
    //@param The chart object
    //
    RGraph.SVG.drawYAxis = function (obj)
    {
        var properties = obj.properties;

        if (properties.yaxis) {

            // The X coordinate that the Y axis is positioned at
            if (obj.type === 'hbar') {
                
                var x = obj.getXCoord(properties.xaxisScaleMin > 0 ? properties.xaxisScaleMin : 0);
    
                if (properties.xaxisScaleMin < 0 && properties.xaxisScaleMax <= 0) {
                    x = obj.getXCoord(properties.xaxisScaleMax);
                }
            } else {
                if (properties.yaxisPosition === 'right') {
                    var x = obj.width - properties.marginRight;
                } else {
                    var x = properties.marginLeft;
                }
            }


            var axis = RGraph.SVG.create({
                svg: obj.svg,
                parent: obj.svg.all,
                type: 'path',
                attr: {
                    d: 'M{1} {2} L{3} {4}'.format(
                        x,
                        properties.marginTop,
                        x,
                        obj.height - properties.marginBottom
                    ),
                    stroke: properties.yaxisColor,
                    fill: properties.yaxisColor,
                    'stroke-width': typeof properties.yaxisLinewidth === 'number' ? properties.yaxisLinewidth : 1,
                    'shape-rendering': "crispEdges",
                    'stroke-linecap': 'square'
                }
            });

    
    
    

    

            if (obj.type === 'hbar') {

                var height = (obj.graphHeight - properties.marginInnerTop - properties.marginInnerBottom) / properties.yaxisLabels.length,
                    y      = properties.marginTop + properties.marginInnerTop,
                    len    = properties.yaxisLabels.length,
                    startX = obj.getXCoord(0) + (properties.xaxisScaleMin < 0 ? properties.yaxisTickmarksLength : 0),
                    endX   = obj.getXCoord(0) - properties.yaxisTickmarksLength;

                // Now change the startX/endX if the Y axisPosition is right
                if (properties.yaxisPosition == 'right') {
                    startX = obj.getXCoord(0) + (properties.xaxisScaleMax > 0 && properties.xaxisScaleMin < 0 ? -3 : 0);
                    endX   = obj.getXCoord(0) + properties.yaxisTickmarksLength;
                }

                if (properties.xaxisScaleMin < 0 && properties.xaxisScaleMax <=0) {
                    startX = obj.getXCoord(properties.xaxisScaleMax);
                    endX   = obj.getXCoord(properties.xaxisScaleMax) + 5;
                }
                
                // A custom number of tickmarks
                if (typeof properties.yaxisLabelsPositionSectionTickmarksCount === 'number') {
                    len    = properties.yaxisLabelsPositionSectionTickmarksCount;
                    height = (obj.graphHeight - properties.marginInnerTop - properties.marginInnerBottom) / len;
                }

                //
                // Draw the tickmarks
                //
                if (properties.yaxisTickmarks) {
                    for (var i=0; i<len; ++i) {
                        // Draw the axis
                        var axis = RGraph.SVG.create({
                            svg: obj.svg,
                            parent: obj.svg.all,
                            type: 'path',
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    startX,
                                    y,
                                    endX,
                                    y + 0.001
                                ),
                                stroke: properties.yaxisColor,
                                'stroke-width': typeof properties.yaxisLinewidth === 'number' ? properties.yaxisLinewidth : 1,
                                'shape-rendering': "crispEdges"
                            }
                        });
                        
                        y += height;
                    }
    
    
                    // Draw an extra tick if the X axis position is not zero or
                    // if the xaxis is not being shown
                    if (properties.xaxis === false) {

                        if (obj.type === 'hbar' && properties.xaxisScaleMin <= 0 && properties.xaxisScaleMax < 0) {
                            var startX = obj.getXCoord(properties.xaxisScaleMax);
                            var endX   = obj.getXCoord(properties.xaxisScaleMax) + properties.yaxisTickmarksLength;

                        } else {
                            var startX = obj.getXCoord(0) - properties.yaxisTickmarksLength;
                            var endX   = obj.getXCoord(0) + (properties.xaxisScaleMin < 0 ? properties.yaxisTickmarksLength : 0);

                            if (properties.yaxisPosition === 'right') {
                                var startX = obj.getXCoord(0) - (obj.scale.min === 0 && !obj.mirrorScale ? 0 : properties.yaxisTickmarksLength);
                                var endX   = obj.getXCoord(0) + properties.yaxisTickmarksLength;
                            }
                        }

                        var axis = RGraph.SVG.create({
                            svg: obj.svg,
                            parent: obj.svg.all,
                            type: 'path',
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    startX,
                                    Math.round(obj.height - properties.marginBottom - parseFloat(properties.marginInnerBottom)),

                                    endX,
                                    Math.round(obj.height - properties.marginBottom - parseFloat(properties.marginInnerBottom))
                                ),
                                stroke: obj.properties.yaxisColor,
                                'stroke-width': typeof properties.yaxisLinewidth === 'number' ? properties.yaxisLinewidth : 1,
                                'shape-rendering': "crispEdges"
                            }
                        });
                    }
                }

            //
            // Bar, Line etc types of chart
            //
            } else {

                var height = obj.graphHeight / properties.yaxisLabelsCount,
                    y      = properties.marginTop,
                    len    = properties.yaxisLabelsCount,
                    startX = properties.marginLeft,
                    endX   = properties.marginLeft - properties.yaxisTickmarksLength;
                
                // Adjust the startX and endX positions for when the Y axis is
                // on the RHS
                if (properties.yaxisPosition === 'right') {
                    startX = obj.width - properties.marginRight;
                    endX   = startX + properties.yaxisTickmarksLength;
                }

                // A custom number of tickmarks
                if (typeof properties.yaxisLabelsPositionEdgeTickmarksCount === 'number') {
                    len    = properties.yaxisLabelsPositionEdgeTickmarksCount;
                    height = obj.graphHeight / len;
                }

                //
                // Draw the tickmarks
                //
                if (properties.yaxisTickmarks) {
                    for (var i=0; i<len; ++i) {

                        // Draw the axis
                        var axis = RGraph.SVG.create({
                            svg: obj.svg,
                            parent: obj.svg.all,
                            type: 'path',
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    startX,
                                    y,
                                    endX,
                                    y
                                ),
                                stroke: properties.yaxisColor,
                                'stroke-width': typeof properties.yaxisLinewidth === 'number' ? properties.yaxisLinewidth : 1,
                                'shape-rendering': "crispEdges"
                            }
                        });
                        
                        y += height;
                    }
    
    
                    // Draw an extra tick if the X axis position is not zero or
                    // if the xaxis is not being shown
                    if (    (properties.yaxisScaleMin !== 0 || properties.xaxis === false || obj.mirrorScale)
                        && !(obj.scale.min > 0 && obj.scale.max > 0) ) {
                        
                        // Adjust the startX and endX positions for when the Y axis is
                        // on the RHS
                        if (properties.yaxisPosition === 'right') {
                            startX = obj.width - properties.marginRight;
                            endX   = startX + properties.yaxisTickmarksLength;
                        }

                        var axis = RGraph.SVG.create({
                            svg: obj.svg,
                            parent: obj.svg.all,
                            type: 'path',
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    startX,
                                    obj.height - properties.marginBottom,
                                    endX,
                                    obj.height - properties.marginBottom - 0.001
                                ),
                                stroke: properties.yaxisColor,
                                'stroke-width': typeof properties.yaxisLinewidth === 'number' ? properties.yaxisLinewidth : 1,
                                'shape-rendering': "crispEdges"
                            }
                        });
                    }
                }
            }
        }



        // Get the text configuration
        var textConf = RGraph.SVG.getTextConf({
            object: obj,
            prefix: 'yaxisLabels'
        });


        //
        // Draw the Y axis labels
        //
        if (properties.yaxisScale) {

            var segment = (obj.height - properties.marginTop - properties.marginBottom) / properties.yaxisLabelsCount;

            for (var i=0; i<obj.scale.labels.length; ++i) {

                var y = obj.height - properties.marginBottom - (segment * i) - segment;

                RGraph.SVG.text({
                    
                    object: obj,
                    parent: obj.svg.all,
                    tag:    'labels.yaxis',
                    
                    text:   obj.scale.labels[i],

                    x:      properties.yaxisPosition === 'right'
                                ? (obj.width - properties.marginRight + 7 + (properties.yaxis ? (properties.yaxisTickmarksLength - 3) : 0) + properties.yaxisLabelsOffsetx)
                                : (properties.marginLeft - 7 - (properties.yaxis ? (properties.yaxisTickmarksLength - 3) : 0) + properties.yaxisLabelsOffsetx),
                    y:      y + properties.yaxisLabelsOffsety,

                    halign: properties.yaxisLabelsHalign || (properties.yaxisPosition === 'right' ? 'left' : 'right'),
                    valign: properties.yaxisLabelsValign || 'center',
                    
                    font:   textConf.font,
                    size:   textConf.size,
                    bold:   textConf.bold,
                    italic: textConf.italic,
                    color:  textConf.color
                });
            }




            //
            // Add the minimum label
            //
            var y   = obj.height - properties.marginBottom,
                // Changed this to use obj.scale.min instead of properties.yaxisScaleMin
                // on 11/11/18 because mirrored scales had zero as the bottom
                // value when it should have been a mirror of the top value
                str = (properties.yaxisScaleUnitsPre + obj.scale.min.toFixed(properties.yaxisScaleDecimals).replace(/\./, properties.yaxisScalePoint) + properties.yaxisScaleUnitsPost);
                
            // Fix a bugettte that's showing the - sign after the unitsPre - should
            // be showing them before
            str = str.replace(properties.yaxisScaleUnitsPre + '-', '-' + properties.yaxisScaleUnitsPre);

            var text = RGraph.SVG.text({
                
                object: obj,
                parent: obj.svg.all,
                tag:    'labels.yaxis',
                
                text: typeof properties.yaxisScaleFormatter === 'function' ? (properties.yaxisScaleFormatter)(this, properties.yaxisScaleMin) : str,
                
                x: properties.yaxisPosition === 'right'
                       ? (obj.width - properties.marginRight + 7 + (properties.yaxis ? (properties.yaxisTickmarksLength - 3) : 0) + properties.yaxisLabelsOffsetx)
                       : (properties.marginLeft - 7 - (properties.yaxis ? (properties.yaxisTickmarksLength - 3) : 0) + properties.yaxisLabelsOffsetx),
                y: y + properties.yaxisLabelsOffsety,

                halign: (properties.yaxisPosition === 'right' ? 'left' : 'right'),
                valign: 'center',
                
                font:   textConf.font,
                size:   textConf.size,
                bold:   textConf.bold,
                italic: textConf.italic,
                color:  textConf.color
            });
        
        
        //
        // Draw Y axis labels (eg when specific labels are defined or
        // the chart is an HBar
        //
        } else if (properties.yaxisLabels && properties.yaxisLabels.length) {

            for (var i=0; i<properties.yaxisLabels.length; ++i) {

                var segment = (obj.graphHeight - (properties.marginInnerTop || 0) - (properties.marginInnerBottom || 0) ) / properties.yaxisLabels.length,
                    y       = properties.marginTop + (properties.marginInnerTop || 0) + (segment * i) + (segment / 2) + properties.yaxisLabelsOffsety,
                    x       = properties.marginLeft - 7 - (properties.yaxisLinewidth || 1) + properties.yaxisLabelsOffsetx,
                    halign  = 'right';
                
                if (properties.yaxisPosition === 'right') {
                    halign = 'left';
                    x      = obj.width - properties.marginRight + 7 + (properties.yaxisLinewidth || 1) + properties.yaxisLabelsOffsetx;
                }

                // HBar labels
                if (
                       obj.type === 'hbar'
                    && (
                          (obj.scale.min < obj.scale.max && obj.scale.max <= 0)
                        || properties.yaxisPosition === 'right'
                       )
                    ) {

                    halign = 'left';
                    x      = obj.width - properties.marginRight + 7 + properties.yaxisLabelsOffsetx;
                
                // HBar labels (again?)
                } else if (obj.type === 'hbar' && !properties.yaxisLabelsSpecific) {
                    var segment = (obj.graphHeight - (properties.marginInnerTop || 0) - (properties.marginInnerBottom || 0) ) / (properties.yaxisLabels.length);
                    y = properties.marginTop + (properties.marginInnerTop || 0) + (segment * i) + (segment / 2) + properties.yaxisLabelsOffsety;

                // Specific scale
                } else {
                    var segment = (obj.graphHeight - (properties.marginInnerTop || 0) - (properties.marginInnerBottom || 0) ) / (properties.yaxisLabels.length - 1);
                    y = obj.height - properties.marginBottom - (segment * i) + properties.yaxisLabelsOffsety;
                }

                var text = RGraph.SVG.text({

                    object: obj,
                    parent: obj.svg.all,
                    tag:    'labels.yaxis',
                    
                    text:   properties.yaxisLabels[i] ? properties.yaxisLabels[i] : '',

                    x:      x,
                    y:      y,

                    halign: halign,
                    valign: 'center',

                    font:   textConf.font,
                    size:   textConf.size,
                    bold:   textConf.bold,
                    italic: textConf.italic,
                    color:  textConf.color
                });
            }
        }
























        //
        // Draw the title
        //
        if (properties.yaxisTitle) {
            //
            // Get the text width of the labels so that the position of the title
            // can be adjusted
            //
            if (obj.scale && obj.scale.labels) {

                var textConf = RGraph.SVG.getTextConf({
                    object: obj,
                    prefix: 'yaxisLabels'
                });

                var maxLabelLength = RGraph.SVG.measureText({
                    text:   obj.scale.labels[obj.scale.labels.length - 1],
                    bold:   textConf.bold,
                    font:   textConf.font,
                    size:   textConf.size,
                    italic: textConf.italic
                })[0];
            }


            // If the chart is an HBar chart then the maximum length of the labels
            // needs to be calculated so that the Y axis title doesn't overlap them
            if ((obj.type === 'hbar' && properties.yaxisLabels && properties.yaxisLabels.length)) {
                maxLabelLength = (function (labels)
                {
                    var textConf = RGraph.SVG.getTextConf({
                        object: obj,
                        prefix: 'yaxisLabels'
                    });

                    for (var i=0,max=0; i<labels.length; ++i) {
                        var dim = RGraph.SVG.measureText({
                            text:   labels[i],
                            bold:   textConf.bold,
                            font:   textConf.font,
                            size:   textConf.size,
                            italic: textConf.italic
                        });

                        max = Math.max(max, dim[0]);
                    }

                    return max;
                })(properties.yaxisLabels);
            }

            var x = properties.yaxisPosition === 'right' ? (obj.width - properties.marginRight) + 5 + maxLabelLength + 10 : properties.marginLeft - 5 - maxLabelLength - 10;
            var y = ((obj.height - properties.marginTop - properties.marginBottom) / 2) + properties.marginTop;


            // Specific X and Y coordinates for the title
            if (typeof properties.yaxisTitleOffsetx === 'number') x += properties.yaxisTitleOffsetx;
            if (typeof properties.yaxisTitleOffsety === 'number') y += properties.yaxisTitleOffsety;

            // Specific X and Y coordinates for the title
            if (typeof properties.yaxisTitleX === 'number') x = properties.yaxisTitleX;
            if (typeof properties.yaxisTitleY === 'number') y = properties.yaxisTitleY;



            // Get the Y axis title configuration
            var textConf = RGraph.SVG.getTextConf({
                object: obj,
                prefix: 'yaxisTitle'
            });

            // Draw the text
            RGraph.SVG.text({

              object:     obj,
              parent:     obj.svg.all,
              tag:        'yaxis.title',

                font:   textConf.font,
                size:   textConf.size,
                bold:   textConf.bold,
                italic: textConf.italic,
                color:  textConf.color,

                x:          x,
                y:          y,

                text:       properties.yaxisTitle.toString(),
                
                valign:     properties.yaxisTitleValign || 'bottom',
                halign:     properties.yaxisTitleHalign || 'center',
                
                angle: properties.yaxisPosition === 'right' ? 270 : 90
            });
        }
    };








    //
    // Draws the background
    //
    //@param The chart object
    //
    RGraph.SVG.drawBackground = function (obj)
    {
        var properties = obj.properties;

        // Set these properties so that if it doesn't exist things don't fail
        if (typeof properties.variant3dOffsetx !== 'number') properties.variant3dOffsetx = 0;
        if (typeof properties.variant3dOffsety !== 'number') properties.variant3dOffsety = 0;




        if (properties.backgroundColor) {

            RGraph.SVG.create({
                svg:  obj.svg,
                parent: obj.svg.all,
                type: 'rect',
                attr: {
                    x: -1 + properties.variant3dOffsetx + properties.marginLeft,
                    y: -1 - properties.variant3dOffsety + properties.marginTop,
                    width: parseFloat(obj.svg.getAttribute('width')) + 2 - properties.marginLeft - properties.marginRight,
                    height: parseFloat(obj.svg.getAttribute('height')) + 2 - properties.marginTop - properties.marginBottom,
                    fill: properties.backgroundColor
                }
            });
        }













        // Render a background image
        // <image xlink:href="firefox.jpg" x="0" y="0" height="50px" width="50px"/>
        if (properties.backgroundImage) {
        
            var attr = {
                'xlink:href': properties.backgroundImage,
                //preserveAspectRatio: 'xMidYMid slice',
                preserveAspectRatio: properties.backgroundImageAspect || 'none',
                x: properties.marginLeft,
                y: properties.marginTop
            };

            if (properties.backgroundImageStretch) {

                attr.x      = properties.marginLeft + properties.variant3dOffsetx;
                attr.y      = properties.marginTop + properties.variant3dOffsety;
                attr.width  = obj.width - properties.marginLeft - properties.marginRight;
                attr.height = obj.height - properties.marginTop - properties.marginBottom;

            } else {

                if (typeof properties.backgroundImageX === 'number') {
                    attr.x =  properties.backgroundImageX + properties.variant3dOffsetx;
                } else {
                    attr.x =  properties.marginLeft + properties.variant3dOffsetx;
                }

                if (typeof properties.backgroundImageY === 'number') {
                    attr.y =  properties.backgroundImageY + properties.variant3dOffsety;
                } else {
                    attr.y =  properties.marginTop + properties.variant3dOffsety;
                }

                if (typeof properties.backgroundImageW === 'number') {
                    attr.width =  properties.backgroundImageW;
                }
                 

                if (typeof properties.backgroundImageH === 'number') {
                    attr.height =  properties.backgroundImageH;
                }

            }

            //
            // Account for the chart being 3d
            //
            if (properties.variant === '3d') {
                attr.x += properties.variant3dOffsetx;
                attr.y -= properties.variant3dOffsety;
            }



            var img = RGraph.SVG.create({
                svg:  obj.svg,
                parent: obj.svg.all,
                type: 'image',
                attr: attr,
                style: {
                    opacity: typeof properties.backgroundImageOpacity === 'number' ? properties.backgroundImageOpacity : 1
                }
            });
            
            // Set the width and height if necessary
            if (!properties.backgroundImageStretch) {
                var img2    = new Image();
                img2.src    = properties.backgroundImage;
                img2.onload = function ()
                {
                    if (properties.backgroundImageW === 'number') img.setAttribute('width', properties.backgroundImageW);
                    if (properties.backgroundImageH === 'number') img.setAttribute('height', properties.backgroundImageH);
                };
            }
        }











        if (properties.backgroundGrid) {

            var parts = [];



            // Add the horizontal lines to the path
            if (properties.backgroundGridHlines) {

                if (typeof properties.backgroundGridHlinesCount === 'number') {
                    var count = properties.backgroundGridHlinesCount;
                } else if (obj.type === 'hbar' || obj.type === 'bipolar') {
                    if (typeof properties.yaxisLabels === 'object' && !RGraph.SVG.isNull(properties.yaxisLabels) && properties.yaxisLabels.length) {
                        var count = properties.yaxisLabels.length;
                    } else if (obj.type === 'hbar') {
                        var count = obj.data.length;
                    } else if (obj.type === 'bipolar') {
                        var count = obj.left.length;
                    }
                } else {
                    var count = properties.yaxisLabelsCount || 5;
                }

                for (var i=0; i<=count; ++i) {

                    parts.push('M{1} {2} L{3} {4}'.format(
                        properties.marginLeft + properties.variant3dOffsetx,
                        properties.marginTop + (obj.graphHeight / count) * i - properties.variant3dOffsety,
                        obj.width - properties.marginRight + properties.variant3dOffsetx,
                        properties.marginTop + (obj.graphHeight / count) * i - properties.variant3dOffsety
                    ));
                }


                // Add an extra background grid line to the path - this its
                // underneath the X axis and shows up if its not there.
                parts.push('M{1} {2} L{3} {4}'.format(
                    properties.marginLeft + properties.variant3dOffsetx,
                    obj.height - properties.marginBottom - properties.variant3dOffsety,
                    obj.width - properties.marginRight + properties.variant3dOffsetx,
                    obj.height - properties.marginBottom - properties.variant3dOffsety
                ));
            }



            // Add the vertical lines to the path
            if (properties.backgroundGridVlines) {

                if (obj.type === 'line' && RGraph.SVG.isArray(obj.data[0])) {
                    var len = obj.data[0].length;
                } else if (obj.type === 'hbar') {
                    var len = properties.xaxisLabelsCount || 10;
                } else if (obj.type === 'bipolar') {
                    var len = properties.xaxisLabelsCount || 10;
                } else if (obj.type === 'scatter') {
                    var len = (properties.xaxisLabels && properties.xaxisLabels.length) || 10;
                } else if (obj.type === 'waterfall') {
                    var len = obj.data.length;

                } else {
                    var len = obj.data.length;
                }

                var count = typeof properties.backgroundGridVlinesCount === 'number' ? properties.backgroundGridVlinesCount : len;

                if (properties.xaxisLabelsPosition === 'edge') {
                    count--;
                }
            
                for (var i=0; i<=count; ++i) {
                    parts.push('M{1} {2} L{3} {4}'.format(
                        properties.marginLeft + ((obj.graphWidth / count) * i) + properties.variant3dOffsetx,
                        properties.marginTop - properties.variant3dOffsety,
                        properties.marginLeft + ((obj.graphWidth / count) * i) + properties.variant3dOffsetx,
                        obj.height - properties.marginBottom - properties.variant3dOffsety
                    ));
                }
            }





            // Add the box around the grid
            if (properties.backgroundGridBorder) {
                parts.push('M{1} {2} L{3} {4} L{5} {6} L{7} {8} z'.format(
                    
                    properties.marginLeft + properties.variant3dOffsetx,
                    properties.marginTop  - properties.variant3dOffsety,
                    
                    obj.width - properties.marginRight + properties.variant3dOffsetx,
                    properties.marginTop - properties.variant3dOffsety,
                    
                    obj.width - properties.marginRight + properties.variant3dOffsetx,
                    obj.height - properties.marginBottom - properties.variant3dOffsety,
                    
                    properties.marginLeft + properties.variant3dOffsetx,
                    obj.height - properties.marginBottom - properties.variant3dOffsety
                ));
            }

            
            // Get the dash array if its defined to be dotted or dashed
            var dasharray;

            if (properties.backgroundGridDashed) {
                dasharray = [3,5];
            } else if (properties.backgroundGridDotted) {
                dasharray = [1,3];
            } else if (properties.backgroundGridDashArray) {
                dasharray = properties.backgroundGridDashArray;
            } else {
                dasharray = '';
            }


            // Now draw the path
            var grid = RGraph.SVG.create({
                svg: obj.svg,
                parent: obj.svg.all,
                type: 'path',
                attr: {
                    className: 'rgraph_background_grid',
                    d: parts.join(' '),
                    stroke: properties.backgroundGridColor,
                    fill: 'rgba(0,0,0,0)',
                    'stroke-width': properties.backgroundGridLinewidth,
                    'shape-rendering': "crispEdges",
                    'stroke-dasharray': dasharray
                },
                style: {
                    pointerEvents: 'none'
                }
            });

        }





        // Draw the title and subtitle
        if (obj.type !== 'bipolar') {
            RGraph.SVG.drawTitle(obj);
        }
    };








    //
    // Returns true/false as to whether the given variable is null or not
    // 
    // @param mixed arg The argument to check
    //
    RGraph.SVG.isNull = function (arg)
    {
        // must BE DOUBLE EQUALS - NOT TRIPLE
        if (arg == null || typeof arg === 'object' && !arg) {
            return true;
        }
        
        return false;
    };








    //
    // Returns an appropriate scale. The return value is actualy an object consisting of:
    //  scale.max
    //  scale.min
    //  scale.scale
    // 
    // @param  opt object Configuration properties for the function
    // @return     object An object containg scale information
    //
    RGraph.SVG.getScale = function (opt)
    {
        var obj          = opt.object,
            properties   = obj.properties,
            numlabels    = opt.numlabels,
            unitsPre     = opt.unitsPre,
            unitsPost    = opt.unitsPost,
            max          = Number(opt.max),
            min          = Number(opt.min),
            strict       = opt.strict,
            decimals     = Number(opt.decimals),
            point        = opt.point,
            thousand     = opt.thousand,
            originalMax  = max,
            round        = opt.round,
            scale        = {max:1,labels:[],values:[]},
            formatter    = opt.formatter;


        //
        // Special case for 0
        // 
        // ** Must be first **
        //

        if (max === 0 && min === 0) {

            var max = 1;

            for (var i=0; i<numlabels; ++i) {

                var label = ((((max - min) / numlabels) * (i + 1)) + min).toFixed(decimals);

                scale.labels.push(unitsPre + label + unitsPost);
                scale.values.push(parseFloat(label))
            }

        //
        // Manually do decimals
        //
        } else if (max <= 1 && !strict) {

            var arr = [
                1,0.5,
                0.10,0.05,
                0.010,0.005,
                0.0010,0.0005,
                0.00010,0.00005,
                0.000010,0.000005,
                0.0000010,0.0000005,
                0.00000010,0.00000005,
                0.000000010,0.000000005,
                0.0000000010,0.0000000005,
                0.00000000010,0.00000000005,
                0.000000000010,0.000000000005,
                0.0000000000010,0.0000000000005
            ], vals = [];



            for (var i=0; i<arr.length; ++i) {
                if (max > arr[i]) {
                    i--;
                    break;
                }
            }


            scale.max    = arr[i]
            scale.labels = [];
            scale.values = [];


            for (var j=0; j<numlabels; ++j) {
                
                var value = ((((arr[i] - min) / numlabels) * (j + 1)) + min).toFixed(decimals);

                scale.values.push(value);
                scale.labels.push(RGraph.SVG.numberFormat({
                    object: obj,
                    num: value,
                    prepend: unitsPre,
                    append: unitsPost,
                    point: properties.yaxisScalePoint,
                    thousand: properties.yaxisScaleThousand,
                    formatter: formatter
                }));
            }




        } else if (!strict) {

            //
            // Now comes the scale handling for integer values
            //

            // This accommodates decimals by rounding the max up to the next integer
            max = Math.ceil(max);

            var interval = Math.pow(10, Math.max(1, Number(String(Number(max) - Number(min)).length - 1)) );
            var topValue = interval;

            while (topValue < max) {
                topValue += (interval / 2);
            }

            // Handles cases where the max is (for example) 50.5
            if (Number(originalMax) > Number(topValue)) {
                topValue += (interval / 2);
            }

            // Custom if the max is greater than 5 and less than 10
            if (max <= 10) {
                topValue = (Number(originalMax) <= 5 ? 5 : 10);
            }
    
    
            // Added 02/11/2010 to create "nicer" scales
            if (obj && typeof round == 'boolean' && round) {
                topValue = 10 * interval;
            }

            scale.max = topValue;


            for (var i=0; i<numlabels; ++i) {

                var label = RGraph.SVG.numberFormat({
                    object: obj,
                    num: ((((i+1) / numlabels) * (topValue - min)) + min).toFixed(decimals),
                    prepend: unitsPre,
                    append: unitsPost,
                    point: point,
                    thousand: thousand,
                    formatter: formatter
                });

                scale.labels.push(label);
                scale.values.push(((((i+1) / numlabels) * (topValue - min)) + min).toFixed(decimals));
            }

        } else if (typeof max === 'number' && strict) {

            //
            // ymax is set and also strict
            //
            for (var i=0; i<numlabels; ++i) {
                
                scale.labels.push(RGraph.SVG.numberFormat({
                    object: obj,
                    formatter: formatter,
                    num: ((((i+1) / numlabels) * (max - min)) + min).toFixed(decimals),
                    prepend: unitsPre,
                    append: unitsPost,
                    point: point,
                    thousand: thousand
                }));


                scale.values.push(
                    ((((i+1) / numlabels) * (max - min)) + min).toFixed(decimals)
                );
            }

            // ???
            scale.max = max;
        }

        
        scale.unitsPre  = unitsPre;
        scale.unitsPost = unitsPost;
        scale.point     = point;
        scale.decimals  = decimals;
        scale.thousand  = thousand;
        scale.numlabels = numlabels;
        scale.round     = Boolean(round);
        scale.min       = min;

        //
        // Convert all of the scale values to numbers
        //
        for (var i=0; i<scale.values.length; ++i) {
            scale.values[i] = parseFloat(scale.values[i]);
        }

        return scale;
    };








    //
    // Pads/fills the array
    // 
    // @param  array arr The array
    // @param  int   len The length to pad the array to
    // @param  mixed     The value to use to pad the array (optional)
    //
    RGraph.SVG.arrayFill = 
    RGraph.SVG.arrayPad  = function (opt)
    {
        var arr   = opt.array,
            len   = opt.length,
            value = (typeof opt.value === 'undefined' ? null : opt.value);

        if (arr.length < len) {            
            for (var i=arr.length; i<len; i+=1) {
                arr[i] = value;
            }
        }
        
        return arr;
    };








    //
    // An array sum function
    // 
    // @param  array arr The  array to calculate the total of
    // @return int       The summed total of the arrays elements
    //
    RGraph.SVG.arraySum = function (arr)
    {
        // Allow integers
        if (typeof arr === 'number') {
            return arr;
        }
        
        // Account for null
        if (RGraph.SVG.isNull(arr)) {
            return 0;
        }

        var i, sum, len = arr.length;

        for(i=0,sum=0;i<len;sum+=arr[i++]);

        return sum;
    };








    //
    // Returns the maximum numeric value which is in an array. This function IS NOT
    // recursive
    // 
    // @param  array arr The array (can also be a number, in which case it's returned as-is)
    // @param  int       Whether to ignore signs (ie negative/positive)
    // @return int       The maximum value in the array
    //
    RGraph.SVG.arrayMax = function (arr)
    {
        var max = null
        
        if (typeof arr === 'number') {
            return arr;
        }
        
        if (RGraph.SVG.isNull(arr)) {
            return 0;
        }

        for (var i=0,len=arr.length; i<len; ++i) {
            if (typeof arr[i] === 'number') {

                var val = arguments[1] ? Math.abs(arr[i]) : arr[i];
                
                if (typeof max === 'number') {
                    max = Math.max(max, val);
                } else {
                    max = val;
                }
            }
        }

        return max;
    };








    //
    // Returns the minimum numeric value which is in an array
    // 
    // @param  array arr The array (can also be a number, in which case it's returned as-is)
    // @param  int       Whether to ignore signs (ie negative/positive)
    // @return int       The minimum value in the array
    //
    RGraph.SVG.arrayMin = function (arr)
    {
        var max = null,
            min = null,
            ma  = Math;
        
        if (typeof arr === 'number') {
            return arr;
        }
        
        if (RGraph.SVG.isNull(arr)) {
            return 0;
        }

        for (var i=0,len=arr.length; i<len; ++i) {
            if (typeof arr[i] === 'number') {

                var val = arguments[1] ? Math.abs(arr[i]) : arr[i];
                
                if (typeof min === 'number') {
                    min = Math.min(min, val);
                } else {
                    min = val;
                }
            }
        }

        return min;
    };








    //
    // Returns the maximum value which is in an array
    // 
    // @param  array arr The array
    // @param  int   len The length to pad the array to
    // @param  mixed     The value to use to pad the array (optional)
    //
    RGraph.SVG.arrayPad = function (arr, len)
    {
        if (arr.length < len) {
            var val = arguments[2] ? arguments[2] : null;
            
            for (var i=arr.length; i<len; i+=1) {
                arr[i] = val;
            }
        }
        
        return arr;
    };








    //
    // An array sum function
    // 
    // @param  array arr The  array to calculate the total of
    // @return int       The summed total of the arrays elements
    //
    RGraph.SVG.arraySum = function (arr)
    {
        // Allow integers
        if (typeof arr === 'number') {
            return arr;
        }
        
        // Account for null
        if (RGraph.SVG.isNull(arr)) {
            return 0;
        }

        var i, sum, len = arr.length;

        for(i=0,sum=0;i<len;sum+=arr[i++]);

        return sum;
    };








    //
    // Takes any number of arguments and adds them to one big linear array
    // which is then returned
    // 
    // @param ... mixed The data to linearise. You can strings, booleans, numbers or arrays
    //
    RGraph.SVG.arrayLinearize = function ()
    {
        var arr  = [],
            args = arguments

        for (var i=0,len=args.length; i<len; ++i) {

            if (typeof args[i] === 'object' && args[i]) {
                for (var j=0,len2=args[i].length; j<len2; ++j) {
                    var sub = RGraph.SVG.arrayLinearize(args[i][j]);
                    
                    for (var k=0,len3=sub.length; k<len3; ++k) {
                        arr.push(sub[k]);
                    }
                }
            } else {
                arr.push(args[i]);
            }
        }

        return arr;
    };








    //
    // Takes one off the front of the given array and returns the new array.
    // 
    // @param array arr The array from which to take one off the front of array 
    // 
    // @return array The new array
    //
    RGraph.SVG.arrayShift = function(arr)
    {
        var ret = [];
        
        for(var i=1,len=arr.length; i<len; ++i) {
            ret.push(arr[i]);
        }
        
        return ret;
    };








    //
    // Reverses the order of an array
    // 
    // @param array arr The array to reverse
    //
    RGraph.SVG.arrayReverse = function (arr)
    {
        if (!arr) {
            return;
        }

        var newarr=[];

        for(var i=arr.length - 1; i>=0; i-=1) {
            newarr.push(arr[i]);
        }
        
        return newarr;
    };








    //
    // Makes a clone of an object
    // 
    // @param obj val The object to clone
    //
    RGraph.SVG.arrayClone = function (obj)
    {
        if(obj === null || typeof obj !== 'object') {
            return obj;
        }

        if (RGraph.SVG.isArray(obj)) {

            var temp = [];
    
            for (var i=0,len=obj.length;i<len; ++i) {
    
                if (typeof obj[i]  === 'number') {
                    temp[i] = (function (arg) {return Number(arg);})(obj[i]);
    
                } else if (typeof obj[i]  === 'string') {
                    temp[i] = (function (arg) {return String(arg);})(obj[i]);
                
                } else if (typeof obj[i] === 'function') {
                    temp[i] = obj[i];
                
                } else {
                    temp[i] = RGraph.SVG.arrayClone(obj[i]);
                }
            }
        } else if (typeof obj === 'object') {
            
            var temp = {};
            
            for (var i in obj) {
                if (typeof i === 'string') {
                    temp[i] = obj[i];
                }
            }
        }

        return temp;
    };








    //
    // Converts an the truthy values to falsey values and vice-versa
    //
    RGraph.SVG.arrayInvert = function (arr)
    {
        for (var i=0,len=arr.length; i<len; ++i) {
            arr[i] = !arr[i];
        }

        return arr;
    };








    //
    // An array_trim function that removes the empty elements off
    //both ends
    //
    RGraph.SVG.arrayTrim = function (arr)
    {
        var out = [], content = false;

        // Trim the start
        for (var i=0; i<arr.length; i++) {
        
            if (arr[i]) {
                content = true;
            }
        
            if (content) {
                out.push(arr[i]);
            }
        }
        
        // Reverse the array and trim the start again
        out = RGraph.SVG.arrayReverse(out);

        var out2 = [], content = false ;
        for (var i=0; i<out.length; i++) {
        
            if (out[i]) {
                content = true;
            }
        
            if (content) {
                out2.push(out[i]);
            }
        }
        
        // Now reverse the array and return it
        out2 = RGraph.SVG.arrayReverse(out2);

        return out2;
    };








    //
    // Determines if the given object is an array or not
    // 
    // @param mixed obj The variable to test
    //
    RGraph.SVG.isArray = function (obj)
    {
        if (obj && obj.constructor) {
            var pos = obj.constructor.toString().indexOf('Array');
        } else {
            return false;
        }

        return obj != null &&
               typeof pos === 'number' &&
               pos > 0 &&
               pos < 20;
    };








    //
    // Returns the absolute value of a number. You can also pass in an
    // array and it will run the abs() function on each element. It
    // operates recursively so sub-arrays are also traversed.
    // 
    // @param array arr The number or array to work on
    //
    RGraph.SVG.abs = function (value)
    {
        if (typeof value === 'string') {
            value = parseFloat(value) || 0;
        }

        if (typeof value === 'number') {
            return Math.abs(value);
        }

        if (typeof value === 'object') {
            for (i in value) {
                if (   typeof i === 'string'
                    || typeof i === 'number'
                    || typeof i === 'object') {

                    value[i] = RGraph.SVG.abs(value[i]);
                }
            }
            
            return value;
        }
        
        return 0;
    };








    //
    // Formats a number with thousand seperators so it's easier to read
    //
    // @param opt object The options to the function
    //
    RGraph.SVG.numberFormat = function (opt)
    {
        var obj                = opt.object,
            prepend            = opt.prepend ? String(opt.prepend) : '',
            append             = opt.append ? String(opt.append) : '',
            output             = '',
            decimal_seperator  = typeof opt.point === 'string' ? opt.point : '.',
            thousand_seperator = typeof opt.thousand === 'string' ? opt.thousand : ',',
            num                = opt.num
            decimals_trim      = opt.decimals_trim;

        RegExp.$1   = '';

        if (typeof opt.formatter === 'function') {
            return opt.formatter(obj, num);
        }

        // Ignore the preformatted version of "1e-2"
        if (String(num).indexOf('e') > 0) {
            return String(prepend + String(num) + append);
        }

        // We need then number as a string
        num = String(num);
        
        // Take off the decimal part - we re-append it later
        if (num.indexOf('.') > 0) {
            var tmp = num;
            num     = num.replace(/\.(.*)/, ''); // The front part of the number
            decimal = tmp.replace(/(.*)\.(.*)/, '$2'); // The decimal part of the number
        } else {
            decimal = '';
        }

        // Thousand seperator
        //var seperator = arguments[1] ? String(arguments[1]) : ',';
        var seperator = thousand_seperator;
        
        //
        // Work backwards adding the thousand seperators
        //
        var foundPoint;
        for (i=(num.length - 1),j=0; i>=0; j++,i--) {
            var character = num.charAt(i);
            
            if ( j % 3 == 0 && j != 0) {
                output += seperator;
            }
            
            //
            // Build the output
            //
            output += character;
        }
        
        //
        // Now need to reverse the string
        //
        var rev = output;
        output = '';
        for (i=(rev.length - 1); i>=0; i--) {
            output += rev.charAt(i);
        }

        // Tidy up
        //output = output.replace(/^-,/, '-');
        if (output.indexOf('-' + thousand_seperator) == 0) {
            output = '-' + output.substr(('-' + thousand_seperator).length);
        }

        // Reappend the decimal
        if (decimal.length) {
            output =  output + decimal_seperator + decimal;
            decimal = '';
            RegExp.$1 = '';
        }

        //
        // Trim the decimals if it's all zeros
        //
        if (decimals_trim) {
            output = output.replace(/0+$/,'');
            output = output.replace(/\.$/,'');
        }

        // Minor bugette
        if (output.charAt(0) == '-') {
            output = output.replace(/-/, '');
            prepend = '-' + prepend;
        }

        return prepend + output + append;
    };








    //
    // A function that adds text to the chart
    //
    RGraph.SVG.text = function (opt)
    {
        // Get the defaults for the text function from RGraph.SVG.text.defaults object
        for (var i in RGraph.SVG.text.defaults) {
            if (typeof i === 'string' && typeof opt[i] === 'undefined') {
                opt[i] = RGraph.SVG.text.defaults[i];
            }
        }

        var obj               = opt.object,
            parent            = opt.parent || opt.object.svg.all,
            size              = typeof opt.size === 'number' ? opt.size + 'pt' : (typeof opt.size === 'string' ? opt.size.replace(/pt$/,'') : 12) + 'pt',
            bold              = opt.bold ? 'bold' : 'normal',
            font              = opt.font ? opt.font : 'sans-serif',
            italic            = opt.italic ? 'italic' : 'normal',
            halign            = opt.halign,
            valign            = opt.valign,
            str               = opt.text,
            x                 = opt.x,
            y                 = opt.y,
            color             = opt.color ? opt.color : 'black',
            background        = opt.background || null,
            backgroundRounded = opt.backgroundRounded || 0,
            padding           = opt.padding || 0,
            link              = opt.link || '',
            linkTarget        = opt.linkTarget || '_blank',
            events            = (opt.events === true ? true : false),
            angle             = opt.angle;




        
        
        //
        // Change numbers to strings
        //
        if (typeof str === 'number') {
            str = String(str);
        }
        
        //
        // Change null values to an empty string
        //
        if (RGraph.SVG.isNull(str)) {
            str = '';
        }
        
        //
        // If the string starts with a carriage return add a unicode non-breaking
        // space to the start of it.
        //
        if (str && str.substr(0,2) == '\r\n' || str.substr(0,1) === '\n') {
            str = "\u00A0" + str;
        }




        // Horizontal alignment
        if (halign === 'right') {
            halign = 'end';
        } else if (halign === 'center' || halign === 'middle') {
            halign = 'middle';
        } else {
            halign = 'start';
        }

        // Vertical alignment
        if (valign === 'top') {
            valign = 'hanging';
        } else if (valign === 'center' || valign === 'middle') {
            valign = 'central';
            valign = 'middle';
        } else {
            valign = 'bottom';
        }

        //
        // If a link has been specified then the text node should
        // be a child of an a node
        if (link) {
            var a = RGraph.SVG.create({
                svg: obj.svg,
                type: 'a',
                parent: parent,
                attr: {
                    'xlink:href': link,
                    target: linkTarget
                }
            });
        }

        //
        // Text does not include carriage returns
        //
        if (str && str.indexOf && str.indexOf("\n") === -1) {
            var text = RGraph.SVG.create({
                svg: obj.svg,
                parent: link ? a : opt.parent,
                type: 'text',
                attr: {
                    tag: opt.tag ? opt.tag : '',
                    fill: color,
                    x: x,
                    y: y,
                    'font-size':         size,
                    'font-weight':       bold,
                    'font-family':       font,
                    'font-style':        italic,
                    'text-anchor':       halign,
                    'dominant-baseline': valign
                }
            });
    
            var textNode = document.createTextNode(str);
            text.appendChild(textNode);

            if (!events) {
                text.style.pointerEvents = 'none';
            }


        
        //
        // Includes carriage returns
        //
        } else if (str && str.indexOf) {
            
            // Measure the text
            var dimensions = RGraph.SVG.measureText({
                text: 'My',
                bold: bold,
                font: font,
                size: size
            });
            
            var lineHeight = dimensions[1];

            str = str.split(/\r?\n/);





            //
            // Account for the carriage returns and move the text
            // up as required
            //
            if (valign === 'bottom') {
                y -= str.length * lineHeight;
            }

            if (valign === 'center' || valign === 'middle') {
                y -= (str.length * lineHeight) / 2;
            }





            var text = RGraph.SVG.create({
                svg: obj.svg,
                parent: link ? a : opt.parent,
                type: 'text',
                attr: {
                    tag: opt.tag ? opt.tag : '',
                    fill: color,
                    x: x,
                    y: y,
                    'font-size':         size,
                    'font-weight':       bold,
                    'font-family':       font,
                    'font-style':        italic,
                    'text-anchor':       halign,
                    'dominant-baseline': valign
                }
            });

            if (!events) {
                text.style.pointerEvents = 'none';
            }


            for (var i=0; i<str.length; ++i) {

                var tspan = RGraph.SVG.create({
                    svg: obj.svg,
                    parent: text,
                    type: 'tspan',
                    attr: {
                        x: x,
                        dy: dimensions ? (dimensions[1] * (i ? 1 : 0)) + 3 : 0
                    }
                });

                var textNode = document.createTextNode(str[i]);
                tspan.appendChild(textNode);

                if (!events) {
                    tspan.style.pointerEvents = 'none';
                }

                var dimensions = RGraph.SVG.measureText({
                    text: str[i],
                    bold: bold,
                    font: font,
                    size: parseInt(size)
                });
            }
        }
        
        
        // Now add the rotation if necessary
        if (typeof angle === 'number' && angle && text) {
            text.setAttribute('x', 0);
            text.setAttribute('y', 0);
            text.setAttribute('transform', 'translate({1} {2}) rotate({3})'.format(x, y, -1 * angle));
        }



        //
        // Add a background color if specified
        //

        if (typeof background === 'string') {

            var parent = link ? a : parent;

            var bbox = text.getBBox(),
                rect = RGraph.SVG.create({
                    svg:    obj.svg,
                    parent: parent,
                    type:   'rect',
                    attr: {
                        x:      bbox.x - padding,
                        y:      bbox.y - padding,
                        width:  bbox.width + (padding * 2),
                        height: bbox.height + (padding * 2),
                        fill:   background,
                        rx: backgroundRounded,
                        ry: backgroundRounded
                    }
                });
                
                if (!events) {
                    rect.style.pointerEvents = 'none';
                }

            text.parentNode.insertBefore(rect, text);
        }



        if (RGraph.SVG.ISIE && (valign === 'hanging') && text) {
            text.setAttribute('y', y + (text.scrollHeight / 2));

        } else if (RGraph.SVG.ISIE && valign === 'middle' && text) {
            text.setAttribute('y', y + (text.scrollHeight / 3));
        }




        if (RGraph.SVG.ISFF && text) {
            Y = y + (text.scrollHeight / 3);
        }
        
        return text;
    };
    
    RGraph.SVG.text.defaults = {};








    //
    // Helps you get hold of the SPAN tag nodes that hold the text on the chart
    //
    RGraph.SVG.text.find = function (opt)
    {
        // Search criteria should include:
        //  o text (literal string and regex)
        if (typeof opt.object === 'object' && opt.object.isRGraph) {
            var svg = opt.object.svg;
        } else if (typeof opt.svg === 'object' && opt.svg.all) {
            var svg    = opt.svg;
            opt.object = svg.__object__;
        }
        
        // Look for text nodes based on the text
        var nodes = svg.getElementsByTagName('text');
        var found = [];

        for (var i=0,len=nodes.length; i<len; ++i) {

            var text = false,
                tag  = false;

            // Exact match or regex on the text
            if (typeof opt.text === 'string' && nodes[i].innerHTML === opt.text) {
                text = true;
            } else if (typeof opt.text === 'object' && nodes[i].innerHTML.match(opt.text)) {
                text = true;
            } else if (typeof opt.text === 'undefined') {
                text = true;
            }


            // Exact match or regex on the tag
            if (typeof opt.tag === 'string' && nodes[i].getAttribute('tag') === opt.tag) {
                tag = true;
            } else if (typeof opt.tag === 'object' && nodes[i].getAttribute('tag').match(opt.tag)) {
                tag = true;
            } else if (typeof opt.tag === 'undefined') {
                tag = true;
            }


            // Did all of the conditions pass?
            if (text === true && tag === true) {
                found.push(nodes[i])
            }
        }

        // If a callback has been specified then call it whilst
        // passing it the text
        if (typeof opt.callback === 'function') {
            (opt.callback)({nodes: found,object: opt.object});
        }

        return found;
    };








    //
    // Creates a UID that is applied to the object
    //
    RGraph.SVG.createUID = function ()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
        {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };








    //
    // Determines if the SVG DIV container is fixed
    //
    RGraph.SVG.isFixed = function (svg)
    {
        var obj = svg.parentNode,
            i   = 0;

        while (obj && obj.tagName.toLowerCase() != 'body' && i < 99) {

            if (obj.style.position === 'fixed') {
                return obj;
            }
            
            obj = obj.offsetParent;
        }

        return false;
    };








    //
    // Sets an object in the RGraph registry
    // 
    // @param string name The name of the value to set
    //
    RGraph.SVG.REG.set = function (name, value)
    {
        RGraph.SVG.REG.store[name] = value;
        
        return value;
    };








    //
    // Gets an object from the RGraph registry
    // 
    // @param string name The name of the value to fetch
    //
    RGraph.SVG.REG.get = function (name)
    {
        return RGraph.SVG.REG.store[name];
    };








    //
    // Removes white-space from the start aqnd end of a string
    // 
    // @param string str The string to trim
    //
    RGraph.SVG.trim = function (str)
    {
        return RGraph.SVG.ltrim(RGraph.SVG.rtrim(str));
    };








    //
    // Trims the white-space from the start of a string
    // 
    // @param string str The string to trim
    //
    RGraph.SVG.ltrim = function (str)
    {
        return str.replace(/^(\s|\0)+/, '');
    };








    //
    // Trims the white-space off of the end of a string
    // 
    // @param string str The string to trim
    //
    RGraph.SVG.rtrim = function (str)
    {
        return str.replace(/(\s|\0)+$/, '');
    };








    //
    // Hides the currently shown tooltip
    //
    RGraph.SVG.hideTooltip = function ()
    {
        var tooltip = RGraph.SVG.REG.get('tooltip');

        if (tooltip && tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
            
            tooltip.style.display    = 'none';                
            tooltip.style.visibility = 'hidden';
            
            RGraph.SVG.REG.set('tooltip', null);
        }

        if (tooltip && tooltip.__object__) {
            RGraph.SVG.removeHighlight(tooltip.__object__);
        }
    };








    //
    // Creates a shadow
    //
    RGraph.SVG.setShadow = function (options)
    {
        var obj     = options.object,
            offsetx = options.offsetx  || 0,
            offsety = options.offsety || 0,
            blur    = options.blur || 0,
            opacity = options.opacity || 0,
            id      = options.id;

        var filter = RGraph.SVG.create({
            svg: obj.svg,
            parent: obj.svg.defs,
            type: 'filter',
            attr: {
                id: id,
                 width: "130%",
                 height: "130%"
            }
        });

        RGraph.SVG.create({
            svg: obj.svg,
            parent: filter,
            type: 'feOffset',
            attr: {
                result: 'offOut',
                'in': 'SourceGraphic',
                dx: offsetx,
                dy: offsety
            }
        });

        RGraph.SVG.create({
            svg: obj.svg,
            parent: filter,
            type: 'feColorMatrix',
            attr: {
                result: 'matrixOut',
                'in': 'offOut',
                type: 'matrix',
                values: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 {1} 0'.format(
                    opacity
                )
            }
        });

        RGraph.SVG.create({
            svg: obj.svg,
            parent: filter,
            type: 'feGaussianBlur',
            attr: {
                result: 'blurOut',
                'in': 'matrixOut',
                stdDeviation: blur
            }
        });

        RGraph.SVG.create({
            svg: obj.svg,
            parent: filter,
            type: 'feBlend',
            attr: {
                'in': 'SourceGraphic',
                'in2': 'blurOut',
                mode: 'normal'
            }
        });
    };








    //
    // Takes a sequential index and returns the group/index variation of it. Eg if you have a
    // sequential index from a grouped bar chart this function can be used to convert that into
    // an appropriate group/index combination
    // 
    // @param nindex number The sequential index
    // @param data   array  The original data (which is grouped)
    // @return              The group/index information
    //
    RGraph.SVG.sequentialIndexToGrouped = function (index, data)
    {
        var group         = 0,
            grouped_index = 0;

        while (--index >= 0) {

            if (RGraph.SVG.isNull(data[group])) {
                group++;
                grouped_index = 0;
                continue;
            }

            // Allow for numbers as well as arrays in the dataset
            if (typeof data[group] == 'number') {
                group++
                grouped_index = 0;
                continue;
            }
            

            grouped_index++;
            
            if (grouped_index >= data[group].length) {
                group++;
                grouped_index = 0;
            }
        }

        return [group, grouped_index];
    };








    //
    // This is the reverse of the above function - converting
    // group/index to a sequential index
    //
    // @return number The sequential index
    //
    RGraph.SVG.groupedIndexToSequential = function (opt)
    {
        var dataset = opt.dataset,
            index   = opt.index,
            obj     = opt.object;

        for (var i=0,seq=0; i<=dataset; ++i) {
            for (var j=0; j<obj.data[dataset].length; ++j) {
                
                if (i === dataset && j === index) {
                    return seq;
                }
                seq++;
            }
        }
        
        return seq;
    };








    //
    // Takes any number of arguments and adds them to one big linear array
    // which is then returned
    //
    // @param ... mixed The data to linearise. You can strings, booleans, numbers or arrays
    //
    RGraph.SVG.arrayLinearize = function ()
    {
        var arr  = [],
            args = arguments

        for (var i=0,len=args.length; i<len; ++i) {

            if (typeof args[i] === 'object' && args[i]) {
                for (var j=0,len2=args[i].length; j<len2; ++j) {
                    var sub = RGraph.SVG.arrayLinearize(args[i][j]);
                    
                    for (var k=0,len3=sub.length; k<len3; ++k) {
                        arr.push(sub[k]);
                    }
                }
            } else {
                arr.push(args[i]);
            }
        }

        return arr;
    };








    //
    // This function converts coordinates into the type understood by
    // SVG for drawing arcs
    //@param object options An object consisting of:
    //                       o cx:    The center X coordinate
    //                       o cy:    The center Y coordinate
    //                       o angle: The angle
    //                       o r:     The radius
    //
    RGraph.SVG.TRIG.toCartesian = function (options)
    {
        return {
            x: options.cx + (options.r * Math.cos(options.angle)),
            y: options.cy + (options.r * Math.sin(options.angle))
        };
    };








    //
    // This function, when given the x1,x2,y1,y2 coordinates will return
    //the diagonal length between the two using pythagorous.
    //
    RGraph.SVG.TRIG.getHypLength = function (opt)
    {
        var h = Math.abs(opt.x2 - opt.x1)
            v = Math.abs(opt.y2 - opt.y1),
            r = Math.sqrt(
                  (h * h)
                + (v * v)
            );

        return r;
    };








        // This takes centerx, centery, x and y coordinates and returns the
        // appropriate angle relative to the canvas angle system. Remember
        // that the canvas angle system starts at the EAST axis
        // 
        // @param  number cx  The centerx coordinate
        // @param  number cy  The centery coordinate
        // @param  number x   The X coordinate (eg the mouseX if coming from a click)
        // @param  number y   The Y coordinate (eg the mouseY if coming from a click)
        // @return number     The relevant angle (measured in in RADIANS)
        //
        RGraph.SVG.TRIG.getAngleByXY = function (opt)
        {
            var cx = opt.cx,
                cy = opt.cy,
                x  = opt.x,
                y  = opt.y;

            var angle = Math.atan((y - cy) / (x - cx));

            if (x >= cx && y >= cy) {
                angle += RGraph.SVG.TRIG.HALFPI;
            } else if (x >= cx && y < cy) {
                angle = angle + RGraph.SVG.TRIG.HALFPI;
            } else if (x < cx && y < cy) {
                angle = angle + RGraph.SVG.TRIG.PI + RGraph.SVG.TRIG.HALFPI;
            } else {
                angle = angle + RGraph.SVG.TRIG.PI + RGraph.SVG.TRIG.HALFPI;
            }

            return angle;
        };








    //
    // Gets a path that is usable by the SVG A path command
    //
    // @patam object options The options/arg to the function
    //
    // NB ** Still used by the Pie chart and the semi-circular Meter **
    //
    RGraph.SVG.TRIG.getArcPath = function (options)
    {
        //
        // Make circles start at the top instead of the right hand side
        //
        options.start -= 1.57;
        options.end   -= 1.57;

        var start = RGraph.SVG.TRIG.toCartesian({
            cx:    options.cx,
            cy:    options.cy,
            r:     options.r,
            angle: options.start}
        );

        var end = RGraph.SVG.TRIG.toCartesian({
            cx:    options.cx,
            cy:    options.cy,
            r:     options.r,
            angle: options.end
        });

        var diff = options.end - options.start;
        
        // Initial values
        var largeArc = '0';
        var sweep    = '0';

        if (options.anticlockwise && diff > 3.14) {
            largeArc = '0';
            sweep    = '0';
        } else if (options.anticlockwise && diff <= 3.14) {
            largeArc = '1';
            sweep    = '0';
        } else if (!options.anticlockwise && diff > 3.14) {
            largeArc = '1';
            sweep    = '1';
        } else if (!options.anticlockwise && diff <= 3.14) {
            largeArc = '0';
            sweep    = '1';
        }
        
        if (options.start > options.end && options.anticlockwise && diff <= 3.14) {
            largeArc = '0';
            sweep    = '0';
        }

        if (options.start > options.end && options.anticlockwise && diff > 3.14) {
            largeArc = '1';
            sweep    = '1';
        }


        if (typeof options.moveto === 'boolean' && options.moveto === false) {
            var d = [
                "A", options.r, options.r, 0, largeArc, sweep, end.x, end.y
            ];
        } else {
            var d = [
                "M", start.x, start.y, 
                "A", options.r, options.r, 0, largeArc, sweep, end.x, end.y
            ];
        }
        
        if (options.array === true) {
            return d;
        } else {
            return d.join(" ");
        }
    };








    //
    // Gets a path that is usable by the SVG A path command
    //
    // @patam object options The options/arg to the function
    //
    RGraph.SVG.TRIG.getArcPath2 = function (options)
    {
        //
        // Make circles start at the top instead of the right hand side
        //
        options.start -= 1.57;
        options.end   -= 1.57;

        var start = RGraph.SVG.TRIG.toCartesian({
            cx:    options.cx,
            cy:    options.cy,
            r:     options.r,
            angle: options.start
        });

        var end = RGraph.SVG.TRIG.toCartesian({
            cx:    options.cx,
            cy:    options.cy,
            r:     options.r,
            angle: options.end
        });

        var diff = Math.abs(options.end - options.start);
        
        // Initial values
        var largeArc = '0';
        var sweep    = '0';

        //TODO Put various options here for the correct combination of flags to use
        if (!options.anticlockwise) {
            if (diff > RGraph.SVG.TRIG.PI) {
                largeArc = '1';
                sweep    = '1';
            } else {
                largeArc = '0';
                sweep    = '1';
            }
        } else {
            if (diff > RGraph.SVG.TRIG.PI) {
                largeArc = '1';
                sweep    = '0';
            } else {
                largeArc = '0';
                sweep    = '0';
            }
        }

        if (typeof options.lineto === 'boolean' && options.lineto === false) {
            var d = [
                "M", start.x, start.y,
                "A", options.r, options.r, 0, largeArc, sweep, end.x, end.y
            ];
        } else {
            var d = [
                "M", options.cx, options.cy,
                "L", start.x, start.y, 
                "A", options.r, options.r, 0, largeArc, sweep, end.x, end.y
            ];
        }

        if (options.array === true) {
            return d;
        } else {
            return d.join(" ");
        }
    };








    //
    // Gets a path that is usable by the SVG A path command
    //
    // @param object options The options/arg to the function
    //
    RGraph.SVG.TRIG.getArcPath3 = function (options)
    {
        // Make sure the args are numbers
        options.cx     = Number(options.cx);
        options.cy     = Number(options.cy);
        options.radius = Number(options.radius);
        options.start  = Number(options.start);
        options.end    = Number(options.end);

        //
        // Make circles start at the top instead of the right hand side
        //
        options.start -= (Math.PI / 2);
        options.end   -= (Math.PI / 2);

        var start = RGraph.SVG.TRIG.toCartesian({
            cx:    options.cx,
            cy:    options.cy,
            r:     options.r,
            angle: options.start
        });

        var end = RGraph.SVG.TRIG.toCartesian({
            cx:    options.cx,
            cy:    options.cy,
            r:     options.r,
            angle: options.end
        });

        var diff = Math.abs(options.end - options.start);

        // Initial values
        var largeArc = '0';
        var sweep    = '0';

        //TODO Put various options here for the correct combination of flags to use
        if (!options.anticlockwise) {
            if (diff > RGraph.SVG.TRIG.PI) {
                largeArc = '1';
                sweep    = '1';
            } else {
                largeArc = '0';
                sweep    = '1';
            }
        } else {
            if (diff > RGraph.SVG.TRIG.PI) {
                largeArc = '1';
                sweep    = '0';
            } else {
                largeArc = '0';
                sweep    = '0';
            }
        }

        if (typeof options.lineto === 'boolean' && options.lineto === false) {
            var d = [
                "M", start.x, start.y,
                "A", options.r, options.r, 0, largeArc, sweep, end.x, end.y
            ];
        } else {
            var d = [
                "L", start.x, start.y,
                "A", options.r, options.r, 0, largeArc, sweep, end.x, end.y
            ];
        }

        if (options.array === true) {
            return d;
        } else {
            return d.join(" ");
        }
    };








    //
    // This function gets the end point (X/Y coordinates) of a given radius.
    // You pass it the center X/Y and the radius and this function will return
    // the endpoint X/Y coordinates.
    // 
    // @param number cx    The center X coord
    // @param number cy    The center Y coord
    // @param number r     The length of the radius
    // @param number angle The angle to use
    //
    RGraph.SVG.TRIG.getRadiusEndPoint = function (opt)
    {
        // Allow for two arguments style
        if (arguments.length === 1) {

            var angle = opt.angle,
                r     = opt.r;

        } else if (arguments.length === 4) {

            var angle = arguments[0],
                r     = arguments[1];
        }

        var x = Math.cos(angle) * r,
            y = Math.sin(angle) * r;

        return [x, y];
    };








    //
    // This function draws the title. This function also draws the subtitle.
    //
    RGraph.SVG.drawTitle = function (obj)
    {
        var properties = obj.properties;

        // Work out the X cooordinate for the title and subtitle
        var x      = ((obj.width - properties.marginLeft - properties.marginRight) / 2) + properties.marginLeft,
            y      = properties.marginTop - 10,
            valign = 'bottom';

        // If theres key defined then move the title up
        if (!RGraph.SVG.isNull(obj.properties.key)) {
            y -= 20;
        }

        // If X axis is at the top then move the title up
        if (   typeof obj.properties.yaxisScaleMax === 'number'
            && obj.properties.yaxisScaleMax <= 0
            && obj.properties.yaxisScaleMin < obj.properties.yaxisScaleMax
           ) {
            valign = 'top';
            y = obj.height - obj.properties.marginBottom + 10;
        }

        // Custom X coordinate
        if (typeof properties.titleX === 'number') {
            x = properties.titleX;
        }

        // Custom Y coordinate
        if (typeof properties.titleY === 'number') {
            y = properties.titleY;
        }
        
        // Custom X coordinate
        if (typeof properties.titleOffsetx === 'number') {
            x += properties.titleOffsetx;
        }

        // Custom Y coordinate
        if (typeof properties.titleOffsety === 'number') {
            y += properties.titleOffsety;
        }

        // Move the Y coord up if there's a subtitle
        if (typeof properties.titleSubtitle === 'string' || typeof properties.titleSubtitle === 'number') {
            var titleSubtitleDim = RGraph.SVG.measureText({
                bold:   properties.titleSubtitleBold,
                italic: properties.titleSubtitleItalic,
                size:   properties.titleSubtitleSize,
                font:   properties.titleSubtitleFont,
                text:   'Mg'
            });
            
            y -= titleSubtitleDim[1];
        }



        // Draw the title
        if (properties.title) {

            RGraph.SVG.text({
                object: obj,
                svg:    obj.svg,
                parent: obj.svg.all,
                tag:    'title',
                text:   properties.title.toString(),
                x:      x,
                y:      y,
                halign: properties.titleHalign || 'center',
                valign: valign,
                color:  properties.titleColor  || properties.textColor,
                size:   typeof properties.titleSize === 'number' ? properties.titleSize : properties.textSize + 4,
                bold:   typeof properties.titleBold === 'boolean' ? properties.titleBold : properties.textBold,
                italic: typeof properties.titleItalic === 'boolean' ? properties.titleItalic : properties.textItalic,
                font:   properties.titleFont || properties.textFont
            });
        }




        // Draw the subtitle if there's one defined
        if (
               (typeof properties.title === 'string' || typeof properties.title === 'number')
            && (typeof properties.titleSubtitle === 'string' || typeof properties.titleSubtitle === 'number')
           ) {

            RGraph.SVG.text({
                object: obj,
                svg:    obj.svg,
                parent: obj.svg.all,
                tag:    'subtitle',
                text:   properties.titleSubtitle,
                x:      x,
                y:      y + 5,
                halign: properties.titleHalign || 'center',
                valign: 'top',
                size:   typeof properties.titleSubtitleSize === 'number' ? properties.titleSubtitleSize : properties.textSize - 2,
                color:  properties.titleSubtitleColor || properties.textColor,
                bold:   typeof properties.titleSubtitleBold === 'boolean' ? properties.titleSubtitleBold : properties.textBold,
                italic: typeof properties.titleSubtitleItalic === 'boolean' ? properties.titleSubtitleItalic : properties.textItalic,
                font:   properties.titleSubtitleFont || properties.textFont
            });
        }
    };








    //
    // Removes white-space from the start and end of a string
    // 
    // @param string str The string to trim
    //
    RGraph.SVG.trim = function (str)
    {
        return RGraph.SVG.ltrim(RGraph.SVG.rtrim(str));
    };








    //
    // Trims the white-space from the start of a string
    // 
    // @param string str The string to trim
    //
    RGraph.SVG.ltrim = function (str)
    {
        return String(str).replace(/^(\s|\0)+/, '');
    };








    //
    // Trims the white-space off of the end of a string
    // 
    // @param string str The string to trim
    //
    RGraph.SVG.rtrim = function (str)
    {
        return String(str).replace(/(\s|\0)+$/, '');
    };








    //
    // This parses a single color value
    //
    RGraph.SVG.parseColorLinear = function (opt)
    {
        var obj   = opt.object,
            color = opt.color;

        if (!color || typeof color !== 'string') {
            return color;
        }

        if (color.match(/^gradient\((.*)\)$/i)) {
            
            var parts = RegExp.$1.split(':'),
                diff  = 1 / (parts.length - 1);

            if (opt && opt.direction && opt.direction === 'horizontal') {
                var grad = RGraph.SVG.create({
                    type: 'linearGradient',
                    parent: obj.svg.defs,
                    attr: {
                        id: 'RGraph-linear-gradient-' + obj.uid + '-' + obj.gradientCounter,
                        x1: opt.start || 0,
                        x2: opt.end || '100%',
                        y1: 0,
                        y2: 0,
                        gradientUnits: opt.gradientUnits || "userSpaceOnUse"
                    }
                });

            } else {

                var grad = RGraph.SVG.create({
                    type: 'linearGradient',
                    parent: obj.svg.defs,
                    attr: {
                        id: 'RGraph-linear-gradient-' + obj.uid + '-' + obj.gradientCounter,
                        x1: 0,
                        x2: 0,
                        y1: opt.start || 0,
                        y2: opt.end || '100%',
                        gradientUnits: opt.gradientUnits || "userSpaceOnUse"
                    }
                });
            }

            // Add the first color stop
            var stop = RGraph.SVG.create({
                type: 'stop',
                parent: grad,
                attr: {
                    offset: '0%',
                    'stop-color': RGraph.SVG.trim(parts[0])
                }
            });

            // Add the rest of the color stops
            for (var j=1,len=parts.length; j<len; ++j) {
                
                RGraph.SVG.create({
                    type: 'stop',
                    parent: grad,
                    attr: {
                        offset: (j * diff * 100) + '%',
                        'stop-color': RGraph.SVG.trim(parts[j])
                    }
                });
            }
        }
        
        color = grad ? 'url(#RGraph-linear-gradient-' + obj.uid + '-' + (obj.gradientCounter++) + ')' : color;

        return color;
    };








    //
    // This parses a single color value
    //
    RGraph.SVG.parseColorRadial = function (opt)
    {
        var obj   = opt.object,
            color = opt.color;

        if (!color || typeof color !== 'string') {
            return color;
        }

        if (color.match(/^gradient\((.*)\)$/i)) {

            var parts = RegExp.$1.split(':'),
                diff  = 1 / (parts.length - 1);


            var grad = RGraph.SVG.create({
                type: 'radialGradient',
                parent: obj.svg.defs,
                attr: {
                    id: 'RGraph-radial-gradient-' + obj.uid + '-' + obj.gradientCounter,
                    gradientUnits: opt.gradientUnits || 'userSpaceOnUse',
                    cx: opt.cx || obj.centerx,
                    cy: opt.cy || obj.centery,
                    fx: opt.fx || obj.centerx,
                    fy: opt.fy || obj.centery,
                    r:  opt.r  || obj.radius
                }
            });

            // Add the first color stop
            var stop = RGraph.SVG.create({
                type: 'stop',
                parent: grad,
                attr: {
                    offset: '0%',
                    'stop-color': RGraph.SVG.trim(parts[0])
                }
            });

            // Add the rest of the color stops
            for (var j=1,len=parts.length; j<len; ++j) {
                
                RGraph.SVG.create({
                    type: 'stop',
                    parent: grad,
                    attr: {
                        offset: (j * diff * 100) + '%',
                        'stop-color': RGraph.SVG.trim(parts[j])
                    }
                });
            }
        }
        
        color = grad ? 'url(#RGraph-radial-gradient-' + obj.uid + '-' + (obj.gradientCounter++) + ')' : color;

        return color;
    };








    //
    // Reset all of the color values to their original values
    // 
    // @param object
    //
    RGraph.SVG.resetColorsToOriginalValues = function (opt)
    {
        var obj = opt.object;

        if (obj.originalColors) {
            // Reset the colors to their original values
            for (var j in obj.originalColors) {
                if (typeof j === 'string') {
                    obj.properties[j] = RGraph.SVG.arrayClone(obj.originalColors[j]);
                }
            }
        }

        //
        // If the function is present on the object to reset specific
        // colors - use that
        //
        if (typeof obj.resetColorsToOriginalValues === 'function') {
            obj.resetColorsToOriginalValues();
        }

        // Hmmm... Should this be necessary? I don't think it will
        // do any harm to leave it in.
        obj.originalColors = {};



        // Reset the colorsParsed flag so that they're parsed for gradients again
        obj.colorsParsed = false;
        
        // Reset the gradient counter
        obj.gradientCounter = 1;
    };








    //
    // Clear the SVG tag by deleting all of its
    // child nodes
    //
    // @param [OPTIONAL] svg The SVG tag (same as what is returned
    //                   by document.getElementById() )
    //
    RGraph.SVG.clear = function ()
    {
        // No arguments given - so clear all of the registered
        // SVG tags.
        if (arguments.length === 0) {
            for (var i=0; i<RGraph.SVG.OR.objects.length; i++) {
                RGraph.SVG.clear(RGraph.SVG.OR.objects[i].svg);
            }
            
            return;
        
        // An SVG tag has been given
        } else {
            var svg = arguments[0];
        }

        // Allow the svg to be a string
        if (typeof svg === 'string') {
            var div = document.getElementById(svg);
            var svg = div.__svg__;
        

        }

        // Clear all the layer nodes
        for (var i=1; i<=100; ++i) {
            if (svg['background' + i]) {
                
                // Clear all the nodes within this group
                while (svg['background' + i].lastChild) {
                    svg['background' + i].removeChild(svg['background' + i].lastChild);
                }
            } else {
                break;
            }
        }

        if (svg.all) {
            // Clear all the node within the "all" group
            while (svg.all.lastChild) {
                svg.all.removeChild(svg.all.lastChild);
            }
            
            // Clear Line chart hotspots
            if (svg.all.line_tooltip_hotspots) {
                while (svg.all.line_tooltip_hotspots.lastChild) {
                    svg.all.line_tooltip_hotspots.removeChild(svg.all.line_tooltip_hotspots.lastChild);
                }
            }
        }
    };








    //
    // The reset function is like the clear function but also clears the
    // ObjectRegistry for this canvas
    //
    RGraph.SVG.reset = function ()
    {
        // Reset all registered SVG tags
        if (arguments.length === 0) {
            for (var i=0; i<RGraph.SVG.OR.objects.length; i++) {
                RGraph.SVG.reset(RGraph.SVG.OR.objects[i].svg);
            }

            return;

        // Reset a single SVG tag
        } else {
            var svg = arguments[0];
        }

        // Allow the svg to be a string
        if (typeof svg === 'string') {
            var div = document.getElementById(svg);
            var svg = div.__svg__;
        }

        RGraph.SVG.clear(svg);

        // Make sure every element is removed from the SVG tag
        while (svg.lastChild) {
            svg.removeChild(svg.lastChild);
        }

        // Remove the SVG tag from the ObjectRegistry
        RGraph.SVG.OR.clear(svg);
    };








    //
    // Adds an event listener
    // 
    // @param object obj   The graph object
    // @param string event The name of the event, eg ontooltip
    // @param object func  The callback function
    //
    RGraph.SVG.addCustomEventListener = function (obj, name, func)
    {
        // Initialise the events array if necessary
        if (typeof RGraph.SVG.events[obj.uid] === 'undefined') {
            RGraph.SVG.events[obj.uid] = [];
        }
        
        // Prepend "on" if necessary
        if (name.substr(0, 2) !== 'on') {
            name = 'on' + name;
        }

        RGraph.SVG.events[obj.uid].push({
            object: obj,
            event:  name,
            func:   func
        });

        return RGraph.SVG.events[obj.uid].length - 1;
    };








    //
    // Used to fire one of the RGraph custom events
    // 
    // @param object obj   The graph object that fires the event
    // @param string event The name of the event to fire
    //
    RGraph.SVG.fireCustomEvent = function (obj, name)
    {
        if (obj && obj.isRGraph) {
            
            var uid = obj.uid;

            if (   typeof uid === 'string'
                && typeof RGraph.SVG.events === 'object'
                && typeof RGraph.SVG.events[uid] === 'object'
                && RGraph.SVG.events[uid].length > 0) {

                for(var j=0,len=RGraph.SVG.events[uid].length; j<len; ++j) {
                    if (RGraph.SVG.events[uid][j] && RGraph.SVG.events[uid][j].event === name) {
                        RGraph.SVG.events[uid][j].func(obj);
                    }
                }
            }
        }
    };








    //
    // Clears all the custom event listeners that have been registered
    // 
    // @param string optional Limits the clearing to this object UID
    //
    RGraph.SVG.removeAllCustomEventListeners = function ()
    {
        var uid = arguments[0];

        if (uid && RGraph.SVG.events[uid]) {
            RGraph.SVG.events[uid] = {};
        } else {
            RGraph.SVG.events = [];
        }
    };








    //
    // Clears a particular custom event listener
    // 
    // @param object obj The graph object
    // @param number i   This is the index that is return by .addCustomEventListener()
    //
    RGraph.SVG.removeCustomEventListener = function (obj, i)
    {
        if (   typeof RGraph.SVG.events === 'object'
            && typeof RGraph.SVG.events[obj.uid] === 'object'
            && typeof RGraph.SVG.events[obj.uid][i] === 'object') {
            
            RGraph.SVG.events[obj.uid][i] = null;
        }
    };








    //
    // Removes the highlight from the chart added by tooltips (possibly others too)
    //
    RGraph.SVG.removeHighlight = function (obj)
    {
        var highlight = RGraph.SVG.REG.get('highlight');

        if (highlight && RGraph.SVG.isArray(highlight) && highlight.length) {
            for (var i=0,len=highlight.length; i<len; ++i) {
                if (highlight[i].parentNode) {
                    //obj.svg.removeChild(highlight[i]);
                    highlight[i].parentNode.removeChild(highlight[i]);
                }
            }
        } else if (highlight && highlight.parentNode) {
            if (obj.type === 'scatter') {
                highlight.setAttribute('stroke0width', '0');
                highlight.setAttribute('stroke', 'transparent');
                highlight.setAttribute('fill', 'transparent');
            } else {
                highlight.parentNode.removeChild(highlight);
            }
        }
    };








    //
    // Removes the highlight from the chart added by tooltips (possibly others too)
    //
    RGraph.SVG.redraw = function ()
    {
        if (arguments.length === 1) {

            var svg = arguments[0];

            if (svg.parentNode) {
                RGraph.SVG.clear(svg);
    
                var objects = RGraph.SVG.OR.get('id:' + svg.parentNode.id);
    
                for (var i=0,len=objects.length; i<len; ++i) {
    
                    // Reset the colors to the original values
                    RGraph.SVG.resetColorsToOriginalValues({object: objects[i]});
    
                    objects[i].draw();
                }
            }
        } else {

            var tags = RGraph.SVG.OR.tags();

            for (var i in tags) {
                RGraph.SVG.redraw(tags[i]);
            }
        }
    };








    //
    // A better, more flexible, date parsing function
    //
    //@param  string str The string to parse
    //@return number     A number, as returned by Date.parse()
    //
    RGraph.SVG.parseDate = function (str)
    {
        var d = new Date();

        // Initialise the default values
        var defaults = {
            seconds: '00',
            minutes: '00',
              hours: '00',
               date: d.getDate(),
              month: d.getMonth() + 1,
               year: d.getFullYear()
        };

        // Create the months array for turning textual months back to numbers
        var months       = ['january','february','march','april','may','june','july','august','september','october','november','december'],
            months_regex = months.join('|');

        for (var i=0; i<months.length; ++i) {
            months[months[i]] = i;
            months[months[i].substring(0,3)] = i;
            months_regex = months_regex + '|' + months[i].substring(0,3);
        }

        // These are the seperators allowable for d/m/y and y/m/d dates
        // (Its part of a regexp so the position of the square brackets
        //  is crucial)
        var sep = '[-./_=+~#:;,]+';


        // Tokenise the string
        var tokens = str.split(/ +/);

        // Loop through each token checking what it is
        for (var i=0,len=tokens.length; i<len; ++i) {
            if (tokens[i]) {
                
                // Year
                if (tokens[i].match(/^\d\d\d\d$/)) {
                    defaults.year = tokens[i];
                }

                // Month
                var res = isMonth(tokens[i]);
                if (typeof res === 'number') {
                    defaults.month = res + 1; // Months are zero indexed
                }

                // Date
                if (tokens[i].match(/^\d?\d(?:st|nd|rd|th)?$/)) {
                    defaults.date = parseInt(tokens[i]);
                }

                // Time
                if (tokens[i].match(/^(\d\d):(\d\d):?(?:(\d\d))?$/)) {
                    defaults.hours   = parseInt(RegExp.$1);
                    defaults.minutes = parseInt(RegExp.$2);
                    
                    if (RegExp.$3) {
                        defaults.seconds = parseInt(RegExp.$3);
                    }
                }

                // Dateformat: XXXX-XX-XX
                if (tokens[i].match(new RegExp('^(\\d\\d\\d\\d)' + sep + '(\\d\\d)' + sep + '(\\d\\d)$', 'i'))) {
                    defaults.date  = parseInt(RegExp.$3);
                    defaults.month = parseInt(RegExp.$2);
                    defaults.year  = parseInt(RegExp.$1);

                }

                // Dateformat: XX-XX-XXXX
                if (tokens[i].match(new RegExp('^(\\d\\d)' + sep + '(\\d\\d)' + sep + '(\\d\\d\\d\\d)$','i') )) {
                    defaults.date  = parseInt(RegExp.$1);
                    defaults.month = parseInt(RegExp.$2);
                    defaults.year  = parseInt(RegExp.$3);
                }
            }
        }

        // Now put the defaults into a format thats recognised by Date.parse()
        str = '{1}/{2}/{3} {4}:{5}:{6}'.format(
            defaults.year,
            String(defaults.month).length     === 1 ? '0' + (defaults.month) : defaults.month,
            String(defaults.date).length      === 1 ? '0' + (defaults.date)      : defaults.date,
            String(defaults.hours).length     === 1 ? '0' + (defaults.hours)     : defaults.hours,
            String(defaults.minutes).length   === 1 ? '0' + (defaults.minutes)   : defaults.minutes,
            String(defaults.seconds).length   === 1 ? '0' + (defaults.seconds)   : defaults.seconds
        );

        return Date.parse(str);

        //
        // Support functions
        //
        function isMonth(str)
        {
            var res = str.toLowerCase().match(months_regex);

            return res ? months[res[0]] : false;
        }
    };








    // The ObjectRegistry add function
    RGraph.SVG.OR.add = function (obj)
    {
        RGraph.SVG.OR.objects.push(obj);

        return obj;
    };








    // The ObjectRegistry function that returns all of the objects. Th argument
    // can aither be:
    //
    // o omitted  All of the registered objects are returned
    // o id:XXX  All of the objects on that SVG tag are returned
    // o type:XXX All the objects of that type are returned
    //
    RGraph.SVG.OR.get = function ()
    {
        // Fetch objects that are on a particular SVG tag
        if (typeof arguments[0] === 'string' && arguments[0].substr(0, 3).toLowerCase() === 'id:') {
            
            var ret = [];

            for (var i=0; i<RGraph.SVG.OR.objects.length; ++i) {
                if (RGraph.SVG.OR.objects[i] && RGraph.SVG.OR.objects[i].id === arguments[0].substr(3)) {
                    ret.push(RGraph.SVG.OR.objects[i]);
                }
            }

            return ret;
        }


        // Fetch objects that are of a particular type
        //
        // TODO Allow multiple types to be specified
        if (typeof arguments[0] === 'string' && arguments[0].substr(0, 4).toLowerCase() === 'type') {
            
            var ret = [];
            
            for (var i=0; i<RGraph.SVG.OR.objects.length; ++i) {
                if (RGraph.SVG.OR.objects[i].type === arguments[0].substr(5)) {
                    ret.push(RGraph.SVG.OR.objects[i]);
                }
            }
            
            return ret;
        }


        // Fetch an object that has a specific UID
        if (typeof arguments[0] === 'string' && arguments[0].substr(0, 3).toLowerCase() === 'uid') {
            
            var ret = [];
            
            for (var i=0; i<RGraph.SVG.OR.objects.length; ++i) {
                if (RGraph.SVG.OR.objects[i].uid === arguments[0].substr(4)) {
                    ret.push(RGraph.SVG.OR.objects[i]);
                }
            }
            
            return ret;
        }

        return RGraph.SVG.OR.objects;
    };







    //
    // Clear the ObjectRegistry of charts
    //
    // @param [OPTIONAL] string You can optionally give an ID so only objects
    //                          pertaining to that SVG tag are cleared.
    //
    RGraph.SVG.OR.clear = function ()
    {
        // Clear the ObjectRegistry of objects for a particular ID
        if (typeof arguments[0] === 'string') {
            for (var i=0; i<RGraph.SVG.OR.objects.length; ++i) {
                if (RGraph.SVG.OR.objects[i].id === arguments[0]) {
                    RGraph.SVG.OR.objects[i] = null;
                }
            }
        
        // If an RGraph object is given then clear that object
        } else if (typeof arguments[0] === 'object') {
            for (var i=0; i<RGraph.SVG.OR.objects.length; ++i) {
                if (RGraph.SVG.OR.objects[i].uid === arguments[0].uid) {
                    RGraph.SVG.OR.objects[i] = null;
                }
            }

        // Clear the entire ObjectRegistry
        } else {
            RGraph.SVG.OR.objects = [];
        }
    };








    // The ObjectRegistry function that returns all of the registeredt SVG tags
    //
    RGraph.SVG.OR.tags = function ()
    {
        var tags = [];

        for (var i=0; i<RGraph.SVG.OR.objects.length; ++i) {
            if (RGraph.SVG.OR.objects[i] && !tags[RGraph.SVG.OR.objects[i].svg.parentNode.id]) {
                tags[RGraph.SVG.OR.objects[i].svg.parentNode.id] = RGraph.SVG.OR.objects[i].svg;
            }
        }

        return tags;
    };








    //
    // This function returns a two element array of the SVG x/y position in
    // relation to the page
    // 
    // @param object svg
    //
    RGraph.SVG.getSVGXY = function (svg)
    {
        var x  = 0,
            y  = 0,
            el = svg.parentNode; // !!!

        do {

            x += el.offsetLeft;
            y += el.offsetTop;

            // Account for tables in webkit
            if (el.tagName.toLowerCase() == 'table' && (RGraph.SVG.ISCHROME || RGraph.SVG.ISSAFARI)) {
                x += parseInt(el.border) || 0;
                y += parseInt(el.border) || 0;
            }

            el = el.offsetParent;

        } while (el && el.tagName && el.tagName.toLowerCase() != 'body');


        var paddingLeft = svg.style.paddingLeft ? parseInt(svg.style.paddingLeft) : 0,
            paddingTop  = svg.style.paddingTop ? parseInt(svg.style.paddingTop) : 0,
            borderLeft  = svg.style.borderLeftWidth ? parseInt(svg.style.borderLeftWidth) : 0,
            borderTop   = svg.style.borderTopWidth  ? parseInt(svg.style.borderTopWidth) : 0;

        if (navigator.userAgent.indexOf('Firefox') > 0) {
            x += parseInt(document.body.style.borderLeftWidth) || 0;
            y += parseInt(document.body.style.borderTopWidth) || 0;
        }

        return [x + paddingLeft + borderLeft, y + paddingTop + borderTop];
    };








    //
    // This function is a compatibility wrapper around
    // the requestAnimationFrame function.
    //
    // @param function func The function to give to the
    //                      requestAnimationFrame function
    //
    RGraph.SVG.FX.update = function (func)
    {
        win.requestAnimationFrame =
            win.requestAnimationFrame ||
            win.webkitRequestAnimationFrame ||
            win.msRequestAnimationFrame ||
            win.mozRequestAnimationFrame ||
            (function (func){setTimeout(func, 16.666);});
        
        win.requestAnimationFrame(func);
    };








    //
    // This function returns an easing multiplier for effects so they eas out towards the
    // end of the effect.
    // 
    // @param number frames The total number of frames
    // @param number frame  The frame number
    //
    RGraph.SVG.FX.getEasingMultiplier = function (frames, frame)
    {
        var multiplier = Math.pow(Math.sin((frame / frames) * RGraph.SVG.TRIG.HALFPI), 3);

        return multiplier;
    };








    //
    // Measures text by creating a DIV in the document and adding the relevant
    // text to it, then checking the .offsetWidth and .offsetHeight.
    // 
    // @param  object opt An object containing the following:
    //                        o text( string) The text to measure
    //                        o bold (bool)   Whether the text is bold or not
    //                        o font (string) The font to use
    //                        o size (number) The size of the text (in pts)
    // 
    // @return array         A two element array of the width and height of the text
    //
    RGraph.SVG.measureText = function (opt)
    {
        //text, bold, font, size
        var text   = opt.text   || '',
            bold   = opt.bold   || false,
            italic = opt.italic || false,
            font   = opt.font   || 'sans-serif',
            size   = opt.size   || 12,
            str    = text + ':' + italic + ':' + bold + ':' + font + ':' + size;

        // Add the sizes to the cache as adding DOM elements is costly and causes slow downs
        if (typeof RGraph.SVG.measuretext_cache === 'undefined') {
            RGraph.SVG.measuretext_cache = [];
        }

        if (opt.cache !== false && typeof RGraph.SVG.measuretext_cache == 'object' && RGraph.SVG.measuretext_cache[str]) {
            return RGraph.SVG.measuretext_cache[str];
        }

        
        if (!RGraph.SVG.measuretext_cache['text-span'] || opt.cache === false) {
            var span = document.createElement('SPAN');
                span.style.position   = 'absolute';
                span.style.padding    = 0;
                span.style.display    = 'inline';
                span.style.top        = '-200px';
                span.style.left       = '-200px';
                span.style.lineHeight = '1em';
            document.body.appendChild(span);
            
            // Now store the newly created DIV
            RGraph.SVG.measuretext_cache['text-span'] = span;

        } else if (RGraph.SVG.measuretext_cache['text-span']) {
            var span = RGraph.SVG.measuretext_cache['text-span'];

            // Clear the contents of the SPAN tag
            while(span.firstChild){
                span.removeChild(span.firstChild);
            }
        }

        //span.innerHTML        = text.replace(/\r?\n/g, '<br />');
        span.insertAdjacentHTML('afterbegin', String(text).replace(/\r?\n/g, '<br />'));

        span.style.fontFamily = font;
        span.style.fontWeight = bold ? 'bold' : 'normal';
        span.style.fontStyle  = italic ? 'italic' : 'normal';
        span.style.fontSize   = String(size).replace(/pt$/, '') + 'pt';

        var sizes = [span.offsetWidth, span.offsetHeight];

        //document.body.removeChild(span);
        RGraph.SVG.measuretext_cache[str] = sizes;

        return sizes;
    };








    //
    // This function converts an array of strings to an array of numbers. Its used by the meter/gauge
    // style charts so that if you want you can pass in a string. It supports various formats:
    // 
    // '45.2'
    // '-45.2'
    // ['45.2']
    // ['-45.2']
    // '45.2,45.2,45.2' // A CSV style string
    // 
    // @param number frames The string or array to parse
    //
    RGraph.SVG.stringsToNumbers = function (str)
    {
        // An optional seperator to use intead of a comma
        var sep = arguments[1] || ',';



        // Remove preceding square brackets
        if (typeof str === 'string' && str.trim().match(/^\[ *\d+$/)) {
            str = str.replace('[', '');
        }
        
        
        // If it's already a number just return it
        if (typeof str === 'number') {
            return str;
        }





        if (typeof str === 'string') {
            if (str.indexOf(sep) != -1) {
                str = str.split(sep);
            } else {
                str = parseFloat(str);

                if (isNaN(str)) {
                    str = null;
                }
            }
        }






        if (typeof str === 'object'  && !RGraph.SVG.isNull(str)) {
            for (var i=0,len=str.length; i<len; i+=1) {
                str[i] = RGraph.SVG.stringsToNumbers(
                    str[i],
                    sep
                );
            }
        }

        return str;
    };








    // This function allows for numbers that are given as a +/- adjustment
    RGraph.SVG.getAdjustedNumber = function (opt)
    {
        var value = opt.value,
            prop  = opt.prop;
    
        if (typeof prop === 'string' && match(/^(\+|-)([0-9.]+)/)) {
            if (RegExp.$1 === '+') {
                value += parseFloat(RegExp.$2);
            } else if (RegExp.$1 === '-') {
                value -= parseFloat(RegExp.$2);
            }
        }
        
        return value;
    };








    // NOT USED ANY MORE
    RGraph.SVG.attribution=function(){return;};








    //
    // Parse a gradient and returns the various parts
    // 
    // @param string str The gradient string
    //
    RGraph.SVG.parseGradient = function (str)
    {
    };








    //
    // Generates a random number between the minimum and maximum
    // 
    // @param number min The minimum value
    // @param number max The maximum value
    // @param number     OPTIONAL Number of decimal places
    //
    RGraph.SVG.random = function (opt)
    {
        var min = opt.min,
            max = opt.max,
            dp  = opt.dp || opt.decimals || 0,
            r   = Math.random();

        return Number((((max - min) * r) + min).toFixed(dp));
    };








    //
    // Fill an array full of random numbers
    //
    RGraph.SVG.arrayRandom  = function (opt)
    {
        var num = opt.num,
            min = opt.min,
            max = opt.max,
            dp  = opt.dp || opt.decimals || 0;

        for(var i=0,arr=[]; i<num; i+=1) {
            arr.push(RGraph.SVG.random({min: min, max: max, dp: dp}));
        }
        
        return arr;
    };








    //
    // This function is called by each objects setter so that common BC
    // and adjustments are centralised. And there's less typing for me too.
    //
    // @param object opt An object of options to the function, which are:
    //                    object: The chart object
    //                    name:   The name of the config parameter
    //                    value:  The value thats being set
    //
    RGraph.SVG.commonSetter = function (opt)
    {
        var obj   = opt.object,
            name  = opt.name,
            value = opt.value;

        // The default event for tooltips is click
        if (name === 'tooltipsEvent'&& value !== 'click' && value !== 'mousemove') {
            value = 'click';
        }

        return {
            name:  name,
            value: value
        };
    };








    //
    // Generates logs for... log charts
    //
    // @param object opt The options:
    //                     o num  The number
    //                     o base The base
    //
    RGraph.SVG.log = function (opt)
    {
        var num  = opt.num,
            base = opt.base;

        return Math.log(num) / (base ? Math.log(base) : 1);
    };








    RGraph.SVG.donut = function (opt)
    {
        var arcPath1 = RGraph.SVG.TRIG.getArcPath3({
            cx: opt.cx,
            cy: opt.cy,
            r: opt.outerRadius,
            start: 0,
            end: RGraph.SVG.TRIG.TWOPI,
            anticlockwise: false,
            lineto: false
        });

        var arcPath2 = RGraph.SVG.TRIG.getArcPath3({
            cx: opt.cx,
            cy: opt.cy,
            r: opt.innerRadius,
            start: RGraph.SVG.TRIG.TWOPI,
            end: 0,
            anticlockwise: true,
            lineto: false
        });

        //
        // Create the red circle
        //
        var path = RGraph.SVG.create({
            svg: opt.svg,
            type: 'path',
            attr: {
                d: arcPath1 + arcPath2,
                stroke: opt.stroke,
                fill: opt.fill
            }
        });
        
        return path;
    };








    //
    // Copy the globals (if any have been set) from the global object to
    // this instances configuration
    //
    RGraph.SVG.getGlobals = function (obj)
    {
        var properties = obj.properties;
        
        for (var i in RGraph.SVG.GLOBALS) {
            if (typeof i === 'string') {
                obj.set(i, RGraph.SVG.arrayClone(RGraph.SVG.GLOBALS[i]));
            }
        }
    };








    //
    // This function adds a link to the SVG document
    //
    // @param object opt The various options to the function
    //
    RGraph.SVG.link = function (opt)
    {
        var a = RGraph.SVG.create({
            svg: bar.svg,
            type: 'a',
            parent: bar.svg.all,
            attr: {
                'xlink:href': href,
                target:       target
            }
        });
        
        var text = RGraph.SVG.create({
            svg: bar.svg,
            type: 'text',
            parent: a,
            attr: {
                x: x,
                y: y,
                fill: fill
            }
        });
        
        //text.innerHTML = text;
        text.insertAdjacentHTML('afterbegin', String(text));
    };








    // This function is used to get the errorbar MAXIMUM value. Its in the common
    // file because it's used by multiple chart libraries
    //
    // @param object opt An object containing the arguments to the function
    //         o object: The chart object
    //         o index:  The index to fetch
    RGraph.SVG.getErrorbarsMaxValue = function (opt)
    {
        var obj        = opt.object,
            properties = obj.properties,
            index      = opt.index;

        if (typeof properties.errorbars === 'object' && !RGraph.SVG.isNull(properties.errorbars) && typeof properties.errorbars[index] === 'number') {
            var value = properties.errorbars[index];
        } else if (   typeof properties.errorbars === 'object'
                   && !RGraph.SVG.isNull(properties.errorbars)
                   && typeof properties.errorbars[index] === 'object'
                   && !RGraph.SVG.isNull(properties.errorbars[index])
                   && typeof properties.errorbars[index].max === 'number'
                  ) {
            var value = properties.errorbars[index].max;
        } else {
            var value = 0;
        }
        
        return value;
    };








    // This function is used to get the errorbar MINIMUM value. Its in the common
    // file because it's used by multiple chart libraries
    //
    // @param object opt An object containing the arguments to the function
    //         o object: The chart object
    //         o index:  The index to fetch
    RGraph.SVG.getErrorbarsMinValue = function (opt)
    {
        var obj        = opt.object,
            properties = obj.properties,
            index      = opt.index;

        if (   typeof properties.errorbars === 'object'
            && !RGraph.SVG.isNull(properties.errorbars)
            && typeof properties.errorbars[index] === 'object'
            && !RGraph.SVG.isNull(properties.errorbars[index])
            && typeof properties.errorbars[index].min === 'number'
           ) {
            var value = properties.errorbars[index].min;
        } else {
            var value = null;
        }
        
        return value;
    };








    // This function is used to get the errorbar color. Its in the common
    // file because it's used by multiple chart libraries
    //
    // @param object opt An object containing the arguments to the function
    //         o object: The chart object
    //         o index:  The index to fetch
    RGraph.SVG.getErrorbarsColor = function (opt)
    {
        var obj        = opt.object,
            properties = obj.properties,
            index      = opt.index;

        var color = properties.errorbarsColor || 'black';

        if (typeof properties.errorbars === 'object' && !RGraph.SVG.isNull(properties.errorbars) && typeof properties.errorbars[index] === 'object' && !RGraph.SVG.isNull(properties.errorbars[index]) && typeof properties.errorbars[index].color === 'string') {
            color = properties.errorbars[index].color;
        }
        
        return color;
    };








    // This function is used to get the errorbar linewidth. Its in the common
    // file because it's used by multiple chart libraries
    //
    // @param object opt An object containing the arguments to the function
    //         o object: The chart object
    //         o index:  The index to fetch
    RGraph.SVG.getErrorbarsLinewidth = function (opt)
    {
        var obj        = opt.object,
            properties = obj.properties,
            index      = opt.index;

        var linewidth = properties.errorbarsLinewidth || 1

        if (typeof properties.errorbars === 'object' && !RGraph.SVG.isNull(properties.errorbars) && typeof properties.errorbars[index] === 'object' && !RGraph.SVG.isNull(properties.errorbars[index]) && typeof properties.errorbars[index].linewidth === 'number') {
            linewidth = properties.errorbars[index].linewidth;
        }

        return linewidth;
    };








    // This function is used to get the errorbar capWidth. Its in the common
    // file because it's used by multiple chart libraries
    //
    // @param object opt An object containing the arguments to the function
    //         o object: The chart object
    //         o index:  The index to fetch
    RGraph.SVG.getErrorbarsCapWidth = function (opt)
    {
        var obj        = opt.object,
            properties = obj.properties,
            index      = opt.index;

        var capwidth = properties.errorbarsCapwidth || 10

        if (   typeof properties.errorbars === 'object'
            && !RGraph.SVG.isNull(properties.errorbars)
            && typeof properties.errorbars[index] === 'object'
            && !RGraph.SVG.isNull(properties.errorbars[index])
            && typeof properties.errorbars[index].capwidth === 'number'
            ) {

            capwidth = properties.errorbars[index].capwidth;
        }

        return capwidth;
    };








    // Allows the conversion of older names and values to newer
    // ones.
    //
    // *** When adding this to a new chart library there needs to be
    // *** two changes done:
    // ***  o Add the list of aliases as a object variable (eg this.aliases = {}; )
    // ***  o The bit that goes in the setter that calls the
    // ***    RGraph.propertyNameAlias() function - copy this from the Bar chart object
    //
    RGraph.SVG.propertyNameAlias = function () {};















    //
    // This is here so that if the tooltip library has not
    // been included, this function will show an alert
    //informing the user
    //
    if (typeof RGraph.SVG.tooltip !== 'function') {
        RGraph.SVG.tooltip = function ()
        {
            $a('The tooltip library has not been included!');
        };
    }








    //
    // The responsive function. This installs the rules as stipulated
    // in the rules array.
    //
    // @param object conf An object map of properties/arguments for the function.
    //                    This should consist of:
    //                     o maxWidth
    //                     o width
    //                     o height
    //                     o options
    //                     o css
    //                     o parentCss
    //                     o callback
    //
    RGraph.SVG.responsive = function (conf)
    {
        var obj = this;

        //
        // Sort the configuration so that it descends in order of biggest screen
        // to smallest
        //
        conf.sort(function (a, b)
        {
            var aNull = RGraph.SVG.isNull(a.maxWidth);
            var bNull = RGraph.SVG.isNull(b.maxWidth);
            
            if (aNull && bNull) return 0;
            if (aNull && !bNull) return -1;
            if (!aNull && bNull) return 1;

            return b.maxWidth - a.maxWidth;
        });

        //
        // Preparse the configuration adding any missing minWidth values to the configuration
        //
        for (var i=0; i<conf.length; ++i) {
            if (conf[i+1] && typeof conf[i+1].maxWidth === 'number') {
                conf[i].minWidth = conf[i+1].maxWidth;
            } else if (!conf[i+1]) {
                conf[i].minWidth = 0;
            }
        }

        //
        // Loop through the configurations
        //
        for (var i=0; i<conf.length; ++i) {
        
            // Set the minimum and maximum
            conf[i].minWidth = RGraph.SVG.isNull(conf[i].minWidth) ?      0 : conf[i].minWidth;
            conf[i].maxWidth = RGraph.SVG.isNull(conf[i].maxWidth) ? 100000 : conf[i].maxWidth;
            
            // Create the media query string
            var str = 'screen and (min-width: %1px) and (max-width: %2px)'.format(
                conf[i].minWidth,
                conf[i].maxWidth
            );
        
            var mediaQuery = window.matchMedia(str);
            (function (index)
            {
                mediaQuery.addListener(function (e)
                {
                    if (e.matches) {
                        matchFunction(conf[index]);
                    }
                });
            })(i);
            
            // An Initial test
            if (   document.documentElement.clientWidth >= conf[i].minWidth
                && document.documentElement.clientWidth < conf[i].maxWidth) {
                matchFunction(conf[i]);
            }
        }

        //
        // If a rule matches - this is the function that runs
        //
        function matchFunction (rule)
        {
            // If a width is defined for this rule set it
            if (typeof rule.width === 'number') {
                obj.svg.setAttribute('width',  rule.width);
                obj.container.style.width = rule.width + 'px';
            }


            //
            // If a height is defined for this rule set it
            //
            if (typeof rule.height === 'number') {
                obj.svg.setAttribute('height',  rule.height);
                obj.container.style.height = rule.height + 'px';
            }





            // Are there any options to be set?
            //
            if (typeof rule.options === 'object') {
                for (var j in rule.options) {
                    if (typeof j === 'string') {
                        obj.set(j, rule.options[j]);
                    }
                }
            }





            //
            // This function simply sets a CSS property on the object.
            // It accommodates certain name changes
            //
            var setCSS = function (el, name, value)
            {
                var replacements = [
                    ['float', 'cssFloat']
                ];
                
                // Replace the name if necessary
                for (var i=0; i<replacements.length; ++i) {
                    if (name === replacements[i][0]) {
                        name = replacements[i][1];
                    }
                }

                el.style[name] = value;
            };




            //
            // Are there any CSS properties to set on the SVG tag?
            //
            if (typeof rule.css === 'object') {
                for (var j in rule.css) {
                    if (typeof j === 'string') {
                        setCSS(obj.svg.parentNode, j, rule.css[j])
                    }
                }
            }



            //
            // Are there any CSS properties to set on the SVGs PARENT tag?
            //
            if (typeof rule.parentCss === 'object') {
                for (var j in rule.parentCss) {
                    if (typeof j === 'string') {
                        setCSS(obj.svg.parentNode.parentNode, j, rule.parentCss[j])
                    }
                }
            }




            // Redraw the chart - with SVG this is done by the redraw() function
            RGraph.SVG.redraw();




            // Run the callback function if it's defined
            if (typeof rule.callback === 'function') {
                (rule.callback)(obj);
            }
        }
        
        // Returning the object facilitates chaining
        return obj;
    };








    //
    // This function can be used to resize the canvas when the screen size changes. You
    // specify various rules and they're then checked.
    //
    RGraph.SVG.responsiveOld = function (conf)
    {
        var opt = arguments[1] || {},
            
            // This function is added to each object in their constructors so the this
            // variable is the chart object.
            obj   = this,
            
            // The func variable becomes the function that is fired by the resize event
            func  = null,
            
            // This is the timer reference
            timer = null;
        
        // The resizie function will run This many milliseconds after the
        // resize has "finished"
        opt.delay = typeof opt.delay === 'number' ? opt.delay : 200;

        // [TODO] Store defaults that are used if there's no match
        var func = function ()
        {
            // This is set to true if a rule matches
            var matched = false;

            // Loop through all of the rules
            for (var i=0; i<conf.length; ++i) {

                //
                // If a maxWidth is stipulated test that
                //
                if (!matched && (document.documentElement.clientWidth <= conf[i].maxWidth || RGraph.SVG.isNull(conf[i].maxWidth))) {
                
                    matched = true;
                    
                    // If a width is defined for this rule set it
                    if (typeof conf[i].width === 'number') {                        
                        obj.svg.setAttribute('width',  conf[i].width);
                        obj.container.style.width = conf[i].width + 'px';
                    }




                    //
                    // If a height is defined for this rule set it
                    //
                    if (typeof conf[i].height === 'number') {
                        obj.svg.setAttribute('height',  conf[i].height);
                        obj.container.style.height = conf[i].height + 'px';
                    }




                    //
                    // Are there any options to be set?
                    //
                    if (typeof conf[i].options === 'object' && typeof conf[i].options === 'object') {
                        for (var j in conf[i].options) {
                            if (typeof j === 'string') {

                                obj.set(j, conf[i].options[j]);
                            }
                        }
                    }




                    //
                    // This function simply sets a CSS property on the object.
                    // It accommodates certain name changes
                    //
                    var setCSS = function (el, name, value)
                    {
                        var replacements = [
                            ['float', 'cssFloat']
                        ];
                        
                        // Replace the name if necessary
                        for (var i=0; i<replacements.length; ++i) {
                            if (name === replacements[i][0]) {
                                name = replacements[i][1];
                            }
                        }

                        el.style[name] = value;
                    };




                    //
                    // Are there any CSS properties to set on the SVG tag?
                    //
                    if (typeof conf[i].css === 'object') {
                        for (var j in conf[i].css) {
                            if (typeof j === 'string') {
                                setCSS(obj.svg.parentNode, j, conf[i].css[j])
                            }
                        }
                    }

                    //
                    // Are there any CSS properties to set on the SVGs PARENT tag?
                    //
                    if (typeof conf[i].parentCss === 'object') {
                        for (var j in conf[i].parentCss) {
                            if (typeof j === 'string') {
                                setCSS(obj.svg.parentNode.parentNode, j, conf[i].parentCss[j])
                            }
                        }
                    }



                    // Redraw the chart with SVG this is done by the redraw() function
                    RGraph.SVG.redraw();

                    // Run the callback function if it's defined
                    if (typeof conf[i].callback === 'function') {
                        (conf[i].callback)(obj);
                    }
                }
            }
        }






        // Install the resize event listener
        window.addEventListener('resize', function ()
        {
            // Set a new timer in order to fire the func() function
            if (opt.delay > 0) {
                // Clear the timeout
                clearTimeout(timer);
                
                // Start a new timer going
                timer = setTimeout(func, opt.delay);
            
            // If you don't want a delay before the resizing occurs
            // then set the delay to zero and it will be fired immediately
            } else {
                func();
            }
        });

        
        // Call the function initially otherwise it may never run
        func();
        
        // This facilitates chaining
        return obj;
    };








    //
    // This function gets the text properties when given a relevant prefix.
    // So if you give it 'text' as the prefix you'll get the:
    //
    //  o textFont
    //  o textSize
    //  o textColor
    //  o textBold
    //  o textItalic
    //
    // ...properties. On the other hand if you give it 'yaxisScaleLabels'
    // as the prefix you'll get:
    //
    //  o yaxisScaleLabelsFont
    //  o yaxisScaleLabelsSize
    //  o yaxisScaleLabelsColor
    //  o yaxisScaleLabelsBold
    //  o yaxisScaleLabelsItalic
    // 
    // @param  args object An object consisting of:
    //                      o object
    //                      o prefix
    //
    RGraph.SVG.getTextConf = function (args)
    {
        var obj        = args.object,
            properties = obj.properties,
            prefix     = args.prefix;

        // Has to be a seperate var statement
        var font   = typeof properties[prefix + 'Font']   === 'string'  ? properties[prefix + 'Font']   : properties.textFont,
            size   = typeof properties[prefix + 'Size']   === 'number'  ? properties[prefix + 'Size']   : properties.textSize,
            color  = typeof properties[prefix + 'Color']  === 'string'  ? properties[prefix + 'Color']  : properties.textColor,
            bold   = typeof properties[prefix + 'Bold']   === 'boolean' ? properties[prefix + 'Bold']   : properties.textBold,
            italic = typeof properties[prefix + 'Italic'] === 'boolean' ? properties[prefix + 'Italic'] : properties.textItalic;

        return {font: font, size: size, color: color, bold: bold, italic: italic};
    };








// End module pattern
})(window, document);








//
// Loosly mimicks the PHP function print_r();
//
window.$p = function (obj)
{
    var indent = (arguments[2] ? arguments[2] : '    ');
    var str    = '';

    var counter = typeof arguments[3] == 'number' ? arguments[3] : 0;
    
    if (counter >= 5) {
        return '';
    }
    
    switch (typeof obj) {
        
        case 'string':    str += obj + ' (' + (typeof obj) + ', ' + obj.length + ')'; break;
        case 'number':    str += obj + ' (' + (typeof obj) + ')'; break;
        case 'boolean':   str += obj + ' (' + (typeof obj) + ')'; break;
        case 'function':  str += 'function () {}'; break;
        case 'undefined': str += 'undefined'; break;
        case 'null':      str += 'null'; break;
        
        case 'object':
            // In case of null
            if (RGraph.SVG.isNull(obj)) {
                str += indent + 'null\n';
            } else {
                str += indent + 'Object {' + '\n'
                for (j in obj) {
                    str += indent + '    ' + j + ' => ' + window.$p(obj[j], true, indent + '    ', counter + 1) + '\n';
                }
                str += indent + '}';
            }
            break;
        
        
        default:
            str += 'Unknown type: ' + typeof obj + '';
            break;
    }


    //
    // Finished, now either return if we're in a recursed call, or alert()
    // if we're not.
    //
    if (!arguments[1]) {
        alert(str);
    }
    
    return str;
};







//
// A shorthand for the default alert() function
//
window.$a = function (v)
{
    alert(v);
};








//
// Short-hand for console.log
//
// @param mixed v The variable to log to the console
//
window.$cl = function (v)
{
    return console.log(v);
};








//
// A basic string formatting function. Use it like this:
// 
// var str = '{1} {2} {3}'.format('a', 'b', 'c');
//
// Outputs: a b c
//
    String.prototype.format = function()
    {

        //
        // Allow for this type of formatting: {myVar} $myVar $myVar$ %myVar% [myVar]
        //
        if (arguments.length === 0) {
        
            var s = this;
        
            // Allow for {myVar} style
            if (s.match(/{[a-z0-9]+?}/i)) {
                var s = this.replace(/{[a-z0-9]+?}/gi, function(str, idx)
                {
                    str = str.substr(1)
                    str = str.substr(0, str.length - 1)
    
                    return window[str];
                });
            }

            return s;
        }





        var args = arguments;
        
        var s = this.replace(/{(\d+)}/g, function(str, idx)
        {
          return typeof args[idx - 1] !== 'undefined' ? args[idx - 1] : str;
        });
        
        
        // Save percentage signs that are escaped with either another
        // percent or a backslash
        s = s.replace(/(?:%|\\)%(\d)/g,'__PPEERRCCEENNTT__$1');
        
        s = s.replace(/%(\d+)/g, function(str, idx)
        {
          return typeof args[idx - 1] !== 'undefined' ? args[idx - 1] : str;
        });
        
        // Now replace those saved percentage signs with a percentage sign
        return s.replace('__PPEERRCCEENNTT__', '%');
    };








    // Some utility functions that help identify the type of an object
    //
    // Note that isUndefined() should be used like this or you'll get an
    // error (ie with the window. prefix):
    //
    //        RGraph.isUndefined(window.foo)
    //
    RGraph.SVG.isString    = function (obj){return typeof obj === 'string';};
    RGraph.SVG.isNumber    = function (obj){return typeof obj === 'number';};
    //RGraph.SVG.isArray Defined above
    RGraph.SVG.isObject    = function (obj){return typeof obj === 'object' && obj.constructor.toString().toLowerCase().indexOf('object') > 0;};
    //RGraph.SVG.isNull  Defined above
    RGraph.SVG.isFunction  = function (obj){return typeof obj === 'function';};
    RGraph.SVG.isUndefined = function (obj){return typeof obj === 'undefined';};