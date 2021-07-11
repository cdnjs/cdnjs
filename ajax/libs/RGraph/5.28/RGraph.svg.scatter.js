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

    RGraph = window.RGraph || {isrgraph:true,isRGraph:true,rgraph:true};
    RGraph.SVG = RGraph.SVG || {};

// Module pattern
(function (win, doc, undefined)
{
    RGraph.SVG.Scatter = function (conf)
    {
        //
        // A setter that the constructor uses (at the end)
        // to set all of the properties
        //
        // @param string name  The name of the property to set
        // @param string value The value to set the property to
        //
        this.set = function (name, value)
        {
            if (arguments.length === 1 && typeof name === 'object') {
                for (i in arguments[0]) {
                    if (typeof i === 'string') {
                        
                        name  = ret.name;
                        value = ret.value;

                        this.set(name, value);
                    }
                }
            } else {

                var ret = RGraph.SVG.commonSetter({
                    object: this,
                    name:   name,
                    value:  value
                });
                
                name  = ret.name;
                value = ret.value;

                // If setting the colors, update the originalColors
                // property too
                if (name === 'colors') {
                    this.originalColors = RGraph.SVG.arrayClone(value);
                    this.colorsParsed = false;
                }
                
                // BC for labelsAboveSeperator
                if (name === 'labelsAboveSeperator') {
                    name = labelsAboveSeparator;
                }

                this.properties[name] = value;
            }

            return this;
        };








        //
        // A getter.
        // 
        // @param name  string The name of the property to get
        //
        this.get = function (name)
        {
            return this.properties[name];
        };






        this.id               = conf.id;
        this.uid              = RGraph.SVG.createUID();
        this.container        = document.getElementById(this.id);
        this.layers          = {}; // MUST be before the SVG tag is created!
        this.svg              = RGraph.SVG.createSVG({object: this,container: this.container});
        this.isRGraph        = true;
        this.isrgraph        = true;
        this.rgraph          = true;
        this.width            = Number(this.svg.getAttribute('width'));
        this.height           = Number(this.svg.getAttribute('height'));
        this.data             = conf.data;
        this.type             = 'scatter';
        this.coords           = [];
        this.coords2          = [];
        this.colorsParsed     = false;
        this.originalColors   = {};
        this.gradientCounter  = 1;
        this.sequential       = 0;
        this.line_groups      = [];








        // Add this object to the ObjectRegistry
        RGraph.SVG.OR.add(this);
        
        this.container.style.display = 'inline-block';

        this.properties =
        {
            marginLeft:   35,
            marginRight:  35,
            marginTop:    35,
            marginBottom: 35,
           
            backgroundColor:            null,
            backgroundImage:            null,
            backgroundImageAspect:      'none',
            backgroundImageStretch:     true,
            backgroundImageOpacity:     null,
            backgroundImageX:           null,
            backgroundImageY:           null,
            backgroundImageW:           null,
            backgroundImageH:           null,
            backgroundGrid:             true,
            backgroundGridColor:        '#ddd', 
            backgroundGridLinewidth:    1,
            backgroundGridHlines:       true,
            backgroundGridHlinesCount:  null,
            backgroundGridVlines:       true,
            backgroundGridVlinesCount:  null,
            backgroundGridBorder:       true,
            backgroundGridDashed:       false,
            backgroundGridDotted:       false,
            backgroundGridDashArray:    null,

            tickmarksStyle:       'cross',
            tickmarksSize:        7,
            colors:               ['black'],
            
            line:                 false,
            lineColors:           null,
            lineLinewidth:        1,
            
            errorbarsColor:       'black',
            errorbarsLinewidth:   1,
            errorbarsCapwidth:    10,

            yaxis:                true,
            yaxisTickmarks:       true,
            yaxisTickmarksLength: 3,
            yaxisColor:           'black',
            yaxisScale:           true,
            yaxisLabels:          null,
            yaxisLabelsOffsetx:   0,
            yaxisLabelsOffsety:   0,
            yaxisLabelsCount:     5,
            yaxisScaleUnitsPre:        '',
            yaxisScaleUnitsPost:       '',
            yaxisScaleStrict:          false,
            yaxisScaleDecimals:        0,
            yaxisScalePoint:           '.',
            yaxisScaleThousand:        ',',
            yaxisScaleRound:           false,
            yaxisScaleMax:             null,
            yaxisScaleMin:             0,
            yaxisScaleFormatter:       null,
            yaxisTitle:                '',
            yaxisTitleBold:            null,
            yaxisTitleSize:            null,
            yaxisTitleFont:            null,
            yaxisTitleColor:           null,
            yaxisTitleItalic:          null,
            yaxisTitleOffsetx:         0,
            yaxisTitleOffsety:         0,
            yaxisTitleX:               null,
            yaxisTitleY:               null,
            yaxisTitleHalign:          null,
            yaxisTitleValign:          null,

            xaxis:                true,
            xaxisTickmarks:       true,
            xaxisTickmarksLength: 5,
            xaxisLabels:          null,
            xaxisLabelsPosition:  'section',
            xaxisLabelsPositionEdgeTickmarksCount: 10,
            xaxisColor:           'black',
            xaxisLabelsOffsetx:   0,
            xaxisLabelsOffsety:   0,
            xaxisLabelsCount:     10,
            xaxisLabelsFont:      null,
            xaxisLabelsSize:      null,
            xaxisLabelsColor:     null,
            xaxisLabelsBold:      null,
            xaxisLabelsItalic:    null,
            xaxisScaleUnitsPre:        '',
            xaxisScaleUnitsPost:       '',
            xaxisScaleMax:             null,
            xaxisScaleMin:            0,
            xaxisScalePoint:           '.',
            xaxisRound:           false,
            xaxisScaleThousand:        ',',
            xaxisScaleDecimals:        0,
            xaxisScaleFormatter:       null,
            xaxisTitle:           '',
            xaxisTitleBold:       null,
            xaxisTitleSize:       null,
            xaxisTitleFont:       null,
            xaxisTitleColor:      null,
            xaxisTitleItalic:     null,
            xaxisTitleOffsetx:    0,
            xaxisTitleOffsety:    0,
            xaxisTitleX:          null,
            xaxisTitleY:          null,
            xaxisTitleHalign:     null,
            xaxisTitleValign:     null,

            textColor:            'black',
            textFont:             'Arial, Verdana, sans-serif',
            textSize:             12,
            textBold:             false,
            textItalic:           false,


            labelsAboveFont:              null,
            labelsAboveSize:              null,
            labelsAboveBold:              null,
            labelsAboveItalic:            null,
            labelsAboveColor:             null,
            labelsAboveBackground:        'rgba(255,255,255,0.7)',
            labelsAboveBackgroundPadding: 2,
            labelsAboveXUnitsPre:          null,
            labelsAboveXUnitsPost:         null,
            labelsAboveXPoint:             null,
            labelsAboveXThousand:          null,
            labelsAboveXFormatter:         null,
            labelsAboveXDecimals:          null,
            labelsAboveYUnitsPre:          null,
            labelsAboveYUnitsPost:         null,
            labelsAboveYPoint:             null,
            labelsAboveYThousand:          null,
            labelsAboveYFormatter:         null,
            labelsAboveYDecimals:          null,
            labelsAboveOffsetx:           0,
            labelsAboveOffsety:           -10,
            labelsAboveHalign:            'center',
            labelsAboveValign:            'bottom',
            labelsAboveSeparator:         ',',

            tooltipsOverride:                null,
            tooltipsEffect:                  'fade',
            tooltipsCssClass:                'RGraph_tooltip',
            tooltipsCss:                     null,
            tooltipsEvent:                   'mousemove',
            tooltipsFormattedThousand:       ',',
            tooltipsFormattedPoint:          '.',
            tooltipsFormattedDecimals:       0,
            tooltipsFormattedUnitsPre:       '',
            tooltipsFormattedUnitsPost:      '',
            tooltipsFormattedKeyColors:      null,
            tooltipsFormattedKeyColorsShape: 'square',
            tooltipsFormattedKeyLabels:      [],
            tooltipsFormattedTableHeaders:   null,
            tooltipsFormattedTableData:      null,
            tooltipsPointer:                 true,
            tooltipsPositionStatic:          true,

            highlightStroke:      'rgba(0,0,0,0)',
            highlightFill:        'rgba(255,255,255,0.7)',
            highlightLinewidth:   1,
            
            title:                '',
            titleX:               null,
            titleY:               null,
            titleHalign:          'center',
            titleValign:          null,
            titleSize:            null,
            titleColor:           null,
            titleFont:            null,
            titleBold:            null,
            titleItalic:          null,
            
            titleSubtitle:        null,
            titleSubtitleSize:    null,
            titleSubtitleColor:   '#aaa',
            titleSubtitleFont:    null,
            titleSubtitleBold:    null,
            titleSubtitleItalic:  null,

            key:            null,
            keyColors:      null,
            keyOffsetx:     0,
            keyOffsety:     0,
            keyLabelsOffsetx: 0,
            keyLabelsOffsety: -1,
            keyLabelsFont:    null,
            keyLabelsSize:    null,
            keyLabelsColor:   null,
            keyLabelsBold:    null,
            keyLabelsItalic:  null,
            
            bubble:            false,
            bubbleMaxValue:    null,
            bubbleMaxRadius:   null,
            bubbleColorsSolid: false,
            
            errorbars:            null,
            errorbarsColor:       'black',
            errorbarsLinewidth:   1,
            errorbarsCapwidth:    10,
            
            outofbounds: false
        };




        //
        // Copy the global object properties to this instance
        //
        RGraph.SVG.getGlobals(this);





        //
        // Set the options that the user has provided
        //
        for (i in conf.options) {
            if (typeof i === 'string') {
                this.set(i, conf.options[i]);
            }
        }





        // Handles the data that was supplied to the object. If only one dataset
        // was given, convert it into into a multiple dataset style array
        if (this.data[0] && !RGraph.SVG.isArray(this.data[0])) {
            this.data = [];
            this.data[0] = conf.data;
        }




        // Go through the data converting the various X and Y options
        // from strings to numbers if necessary
        //
        // THIS MESSES UP DATETIME CHART
        //
        //for (var i=0; i<this.data.length; ++i) {
        //    for (var j=0; j<this.data[i].length; ++j) {
        //        if (typeof this.data[i][j].x       === 'string') this.data[i][j].x       = parseFloat(this.data[i][j].x);
        //        if (typeof this.data[i][j].y       === 'string') this.data[i][j].y       = parseFloat(this.data[i][j].y);
        //        if (typeof this.data[i][j].size    === 'string') this.data[i][j].size    = parseFloat(this.data[i][j].size);
        //        if (typeof this.data[i][j].opacity === 'string') this.data[i][j].opacity = parseFloat(this.data[i][j].opacity);
        //    }
        //}




        //
        // "Decorate" the object with the generic effects if the effects library has been included
        //
        if (RGraph.SVG.FX && typeof RGraph.SVG.FX.decorate === 'function') {
            RGraph.SVG.FX.decorate(this);
        }





        // Add the responsive function to the object
        this.responsive = RGraph.SVG.responsive;




        var properties = this.properties;
        
        
        //
        // Convert string X values to timestamps
        //
        if (typeof properties.xaxisScaleMin === 'string') {
            properties.xaxisScaleMin = RGraph.SVG.parseDate(properties.xaxisScaleMin);
        }

        if (typeof properties.xaxisScaleMax === 'string') {
            properties.xaxisScaleMax = RGraph.SVG.parseDate(properties.xaxisScaleMax);
        }

        for (var i=0; i<this.data.length; ++i) {
            for (var j=0; j<this.data[i].length; ++j) {
                if (typeof this.data[i][j].x === 'string') {
                    this.data[i][j].x = RGraph.SVG.parseDate(this.data[i][j].x);
                }
            }
        }







        //
        // The draw method draws the Bar chart
        //
        this.draw = function ()
        {
            // Fire the beforedraw event
            RGraph.SVG.fireCustomEvent(this, 'onbeforedraw');
            
            // Reset the sequential counter
            this.sequential = 0;

            // Should the first thing that's done inthe.draw() function
            // except for the onbeforedraw event
            this.width  = Number(this.svg.getAttribute('width'));
            this.height = Number(this.svg.getAttribute('height'));




            // Create the defs tag if necessary
            RGraph.SVG.createDefs(this);





            this.graphWidth  = this.width - properties.marginLeft - properties.marginRight;
            this.graphHeight = this.height - properties.marginTop - properties.marginBottom;
            
            
            // Prevents these from growing
            this.coords  = [];
            this.coords2 = [];




            // Parse the colors for gradients
            RGraph.SVG.resetColorsToOriginalValues({object:this});
            this.parseColors();




            // Work out the maximum value
            for (var ds=0,max=0; ds<this.data.length; ++ds) { // Datasets
                for (var dp=0; dp<this.data[ds].length; ++dp) { // Datapoints
                    max = Math.max(
                        max,
                        this.data[ds][dp].y + (this.data[ds][dp].errorbar ? (typeof this.data[ds][dp].errorbar === 'number' ? this.data[ds][dp].errorbar : this.data[ds][dp].errorbar.max) : 0)
                    );
                }
            }






            // A custom, user-specified maximum value
            if (typeof properties.yaxisScaleMax === 'number') {
                max = properties.yaxisScaleMax;
            }
            
            // Set the ymin to zero if it's set mirror
            if (properties.yaxisScaleMin === 'mirror' || properties.yaxisScaleMin === 'middle' || properties.yaxisScaleMin === 'center') {
                var mirrorScale = true;
                properties.yaxisScaleMin   = 0;
            }


            //
            // Generate an appropiate scale
            //
            this.scale = RGraph.SVG.getScale({
                object:    this,
                numlabels: properties.yaxisLabelsCount,
                unitsPre:  properties.yaxisScaleUnitsPre,
                unitsPost: properties.yaxisScaleUnitsPost,
                max:       max,
                min:       properties.yaxisScaleMin,
                point:     properties.yaxisScalePoint,
                round:     properties.yaxisScaleRound,
                thousand:  properties.yaxisScaleThousand,
                decimals:  properties.yaxisScaleDecimals,
                strict:    typeof properties.yaxisScaleMax === 'number',
                formatter: properties.yaxisScaleFormatter
            });



            //
            // Get the scale a second time if the ymin should be mirored
            //
            // Set the ymin to zero if it's set mirror
            if (mirrorScale) {
                this.scale = RGraph.SVG.getScale({
                    object: this,
                    numlabels: properties.yaxisLabelsCount,
                    unitsPre:  properties.yaxisScaleUnitsPre,
                    unitsPost: properties.yaxisScaleUnitsPost,
                    max:       this.scale.max,
                    min:       this.scale.max * -1,
                    point:     properties.yaxisScalePoint,
                    round:     false,
                    thousand:  properties.yaxisScaleThousand,
                    decimals:  properties.yaxisScaleDecimals,
                    strict:    typeof properties.yaxisScaleMax === 'number',
                    formatter: properties.yaxisScaleFormatter
                });
            }

            // Now the scale has been generated adopt its max value
            this.max      = this.scale.max;
            this.min      = this.scale.min;
            properties.yaxisScaleMax = this.scale.max;
            properties.yaxisScaleMin = this.scale.min;




            // Draw the background first
            RGraph.SVG.drawBackground(this);







            // Draw the axes under the points

            RGraph.SVG.drawXAxis(this);
            RGraph.SVG.drawYAxis(this);






            // Create a group for all of the datasets
            var dataset_group = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: this.svg.all,
                attr: {
                    className: 'scatter_datasets_' + this.uid
                }
            });

            // Draw the points for all of the datasets
            for (var i=0; i<this.data.length; ++i) {

                var group = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'g',
                    parent: this.svg.all,
                    attr: {
                        id: 'scatter_line_' + i + this.uid
                    }
                });
                
                this.line_groups[i] = group;

                this.drawPoints({
                    index: i,
                    data: this.data[i],
                    group: dataset_group
                });

                // Draw a line for this dataset
                if (properties.line === true || (typeof properties.line === 'object' && properties.line[i] === true)) {
                    this.drawLine({
                         index: i,
                        coords: this.coords2[i],
                    });
                }
            }



            // Draw the key
            if (typeof properties.key !== null && RGraph.SVG.drawKey) {
                RGraph.SVG.drawKey(this);
            } else if (!RGraph.SVG.isNull(properties.key)) {
                alert('The drawKey() function does not exist - have you forgotten to include the key library?');
            }




            // Add the event listener that clears the highlight rect if
            // there is any. Must be MOUSEDOWN (ie before the click event)
            //var obj = this;
            //document.body.addEventListener('mousedown', function (e)
            //{
                //RGraph.SVG.removeHighlight(obj);

            //}, false);



            // Fire the draw event
            RGraph.SVG.fireCustomEvent(this, 'ondraw');





            return this;
        };








        //
        // Draws the Points
        //
        // @param opt object Options to the function which can consist of:
        //                     o index:   The numerical index of the DATASET
        //                     o dataset: The dataset.
        //
        this.drawPoints = function (opt)
        {
            var index = opt.index,
                data  = opt.data,
                group = opt.group;

            // Initialise the array for coordinates
            if (!this.coords2[index]) {
                this.coords2[index] = [];
            }

            //
            // Create the <g> tag that the datapoints are added to
            //
            var group = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: group,
                attr: {
                    className: 'scatter_dataset_' + index + '_' + this.uid
                }
            });

            // Loop through the data
            for (var i=0; i<data.length; ++i) {

                var point = data[i];
            
                if (typeof point.x === 'number'&& typeof point.y === 'number') {

                    var ret = this.drawSinglePoint({
                        dataset:    data,
                        datasetIdx: index,
                        point:      point,
                        index:      i,
                        group:      group, // The SVG <g> tag the points are added to
                        sequential: this.sequential
                    });

                    // Add the coordinates to the coords arrays
                    this.coords.push({
                        x:       ret.x,
                        y:       ret.y,
                        z:       ret.size,
                        type:    ret.type,
                        element: ret.mark,
                        object:  this
                    });

                    this.coords2[index][i] = {
                        x:       ret.x,
                        y:       ret.y,
                        z:       ret.size,
                        type:    ret.type,
                        element: ret.mark,
                        object:  this
                    };
                    
                    this.sequential++
                }













                //
                // Add tooltip highlight to the point
                //
                if ( (typeof data[i].tooltip === 'string' && data[i].tooltip) || (typeof data[i].tooltip === 'number') || (typeof properties.tooltips === 'string') ) {

                    // Convert the tooltip to a string
                    data[i].tooltip = String(data[i].tooltip);

                    // Make the tooltipsEvent default to click
                    if (properties.tooltipsEvent !== 'mousemove') {
                        properties.tooltipsEvent = 'click';
                    }

                    if (!group_tooltip_hotspots) {
                        var group_tooltip_hotspots = RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svg.all,
                            type: 'g',
                            attr: {
                                className: 'rgraph-scatter-tooltip-hotspots'
                            }
                        });
                    }

                    var rect = RGraph.SVG.create({
                        svg:  this.svg,
                        parent: this.svg.all,
                        type: 'rect',
                        parent: group_tooltip_hotspots,
                        attr: {
                            x: ret.x - (ret.size / 2),
                            y: ret.y - (ret.size / 2),
                            width: ret.size,
                            height: ret.size,
                            fill: 'transparent',
                            stroke: 'transparent',
                            'stroke-width': 0
                        },
                        style: {
                            cursor: 'pointer'
                        }
                    });

                    // Add the hotspot to the original tickmark
                    ret.mark.hotspot = rect;

                    (function (dataset, index, seq, obj)
                    {
                        rect.addEventListener(properties.tooltipsEvent, function (e)
                        {
                            var tooltip = RGraph.SVG.REG.get('tooltip');

                            if (tooltip && tooltip.__dataset__ === dataset && tooltip.__index__ === index) {
                                return;
                            }
                
                            obj.removeHighlight();

                            // Show the tooltip
                            RGraph.SVG.tooltip({
                                object:          obj,
                                dataset:         dataset,
                                index:           index,
                                sequentialIndex: seq,
                                text:            typeof properties.tooltips === 'string' ? properties.tooltips : obj.data[dataset][index].tooltip,
                                event:           e
                            });


                            // Highlight the shape that has been clicked on
                            if (RGraph.SVG.REG.get('tooltip')) {
                                obj.highlight(this);
                            }
                            
                        }, false);
                
                        // Install the event listener that changes the
                        // cursor if necessary
                        if (properties.tooltipsEvent === 'click') {
                            rect.addEventListener('mousemove', function (e)
                            {
                                e.target.style.cursor = 'pointer';
                            }, false);
                        }
                        
                    }(index, i, this.sequential - 1, this));
                }
            }
        };








        //
        // Draws a single point on the chart
        //
        this.drawSinglePoint = function (opt)
        {
            var dataset    = opt.dataset,
                datasetIdx = opt.datasetIdx,
                seq        = opt.sequential,
                point      = opt.point,
                index      = opt.index,
                valueX     = opt.point.x,
                valueY     = opt.point.y,
                conf       = opt.point || {},
                group      = opt.group,
                coordX     = opt.coordx = this.getXCoord(valueX),
                coordY     = opt.coordy = this.getYCoord(valueY);

            
            

            // Get the above label
            if (conf.labelsAbove) {
                var above = true;
            } else if (conf.labelAbove) {
                var above = true;
            } else if (conf.above) {
                var above = true;
            }






            // Allow shape to be synonym for type
            if (typeof conf.type === 'undefined' && typeof conf.shape !== 'undefined') {
                conf.type = conf.shape;
            }






            // set the type to the default if its not set
            if (typeof conf.type !== 'string') {
                if (typeof properties.tickmarksStyle === 'string') {
                    conf.type = properties.tickmarksStyle;
                } else if (typeof properties.tickmarksStyle === 'object' && typeof properties.tickmarksStyle[datasetIdx] === 'string') {
                    conf.type = properties.tickmarksStyle[datasetIdx];
                } else {
                    conf.type = 'cross';
                }
            }












            // set the size to the default if its not set
            if (typeof conf.size !== 'number' && typeof properties.tickmarksSize === 'number') {
                conf.size = properties.tickmarksSize;
            } else if (typeof conf.size !== 'number' && typeof properties.tickmarksSize === 'object' && typeof properties.tickmarksSize[datasetIdx] === 'number') {
                conf.size = properties.tickmarksSize[datasetIdx];
            }







            // Set the color to the default if its not set and then blacck if thats not set either
            if (typeof conf.color === 'string') {
                // nada
            } else if (typeof properties.colors[datasetIdx] === 'string') {
                conf.color = properties.colors[datasetIdx];
            } else {
                conf.color = 'black';
            }







            // Set the opacity of this point
            if (typeof conf.opacity === 'undefined') {
                conf.opacity = 1;
            } else if (typeof conf.opacity === 'number') {
                // nada
            }






            //  Draw the errorbar here
            //
            // First convert the errorbar information in the data into an array in the properties
            //
            properties.errorbars = [];
            for (var ds=0,max=0; ds<this.data.length; ++ds) {
                for (var idx=0; idx<this.data[ds].length; ++idx) {
                    properties.errorbars.push(this.data[ds][idx].errorbar);
                }
            }

            this.drawErrorbar({
                object:     this,
                dataset:    datasetIdx,
                index:      index,
                group:      group,
                sequential: seq,
                x:          coordX,
                y:          coordY,
                valueX:     valueX,
                valueY:     valueY,
                parent:     group
            });











            // Bubble charts are drawn by their own function
            if (properties.bubble) {
                //return this.drawBubble(opt, conf);
                this.drawBubble(opt, conf);
            }





















            // Handle the various shapes for tickmarks here
            switch (conf.type) {
                case 'image:' + conf.type.substr(6):
                
                    var src = conf.type.substr(6);

                    var img = new Image();
                    img.src = src;
                    
                    var mark = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'image',
                        parent: group,
                        attr: {
                            preserveAspectRatio: 'xMidYMid meet',
                            'xlink:href': src
                        }
                    });

                    // Once the image has loaded the x/y/width/height can be set
                    // (both the image and it's hotspot)
                    img.onload = function ()
                    {
                        var x = coordX - (img.width / 2),
                            y = coordY - (img.height / 2),
                            w = img.width,
                            h = img.height;

                        mark.setAttribute('x', x);
                        mark.setAttribute('y', y);
                        mark.setAttribute('width', w);
                        mark.setAttribute('height', h);

                        if (mark && mark.hotspot) {
                            mark.hotspot.setAttribute('x', x);
                            mark.hotspot.setAttribute('y', y);
                            mark.hotspot.setAttribute('width', w);
                            mark.hotspot.setAttribute('height', h);
                        }
                    };

                    break;

                case 'triangle':
                    var mark = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: group,
                        attr: {
                            d: 'M {1} {2} L {3} {4} L {5} {6}'.format(
                                coordX - (conf.size / 2),
                                coordY + (conf.size / 2),
                                coordX,
                                coordY - (conf.size / 2),
                                coordX + (conf.size / 2),
                                coordY + (conf.size / 2)
                            ),
                            fill: conf.color,
                            'fill-opacity': conf.opacity
                        }
                    });
                break;

                case 'plus':
                    var mark = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: group,
                        attr: {
                            d: 'M {1} {2} L {3} {4} M {5} {6} L {7} {8}'.format(
                                coordX - (conf.size / 2),
                                coordY,
                                coordX +  (conf.size / 2),
                                coordY,
                                coordX,
                                coordY - (conf.size / 2),
                                coordX,
                                coordY + (conf.size / 2)
                            ),
                            stroke: conf.color,
                            'stroke-opacity': conf.opacity
                        }
                    });
                break;

                case 'square':
                case 'rect':
                    var mark = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'rect',
                        parent: group,
                        attr: {
                            x: coordX - (conf.size / 2),
                            y: coordY - (conf.size / 2),
                            width: conf.size,
                            height: conf.size,
                            fill: conf.color,
                            'fill-opacity': conf.opacity
                        }
                    });
                break;



                case 'dot':
                case 'circle':
                    var mark = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'circle',
                        parent: group,
                        attr: {
                            cx: coordX,
                            cy: coordY,
                            r: conf.size / 2,
                            fill: conf.color,
                            'fill-opacity': conf.opacity
                        }
                    });
                break;



                case 'cross':
                default:
                    var mark = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: group,  
                        attr: {
                            d: 'M {1} {2} L {3} {4} M {5} {6} L {7} {8}'.format(
                                coordX - (conf.size / 2), coordY - (conf.size / 2),
                                coordX + (conf.size / 2), coordY + (conf.size / 2),
                                coordX - (conf.size / 2), coordY + (conf.size / 2),
                                coordX + (conf.size / 2), coordY - (conf.size / 2)
                            ),
                            stroke: conf.color,
                            'stroke-opacity': conf.opacity
                        }
                    });
                    break;
            }
            
            //
            // Draw the above label if it's present
            //
            if (typeof conf.above === 'string' || (typeof conf.above !== 'string' && conf.above) ) {
                this.drawLabelsAbove({
                     point: conf,
                    coordX: coordX,
                    coordY: coordY
                });
            }




            // Add some data attributes that save various values
            mark.setAttribute('data-index', index);
            mark.setAttribute('data-dataset', datasetIdx);
            mark.setAttribute('data-original-opacity', conf.opacity);
            mark.setAttribute('data-original-color', conf.color);
            mark.setAttribute('data-original-coordx', coordX);
            mark.setAttribute('data-original-coordy', coordY);
            mark.setAttribute('data-size', conf.size);
            mark.setAttribute('data-sequential', seq);
            mark.setAttribute('data-type', conf.type);

            return {
                x: coordX,
                y: coordY,
                size: conf.type.substr(0,6) === 'image:' ? img.width : conf.size,
                mark: mark,
                type: conf.type
            };
        };







        // Draw a bubble on a bubble chart
        this.drawBubble = function (opt, conf)
        {
            var size = (conf.z / properties.bubbleMaxValue) * properties.bubbleMaxRadius;

            var color = RGraph.SVG.parseColorRadial({
                object: this,
                color: properties.bubbleColorsSolid ? conf.color : 'Gradient(white:' + conf.color + ')',
                cx: opt.coordx + (size / 4),
                cy: opt.coordy - (size / 4),
                fx: opt.coordx + (size / 4),
                fy: opt.coordy - (size / 4),
                r: size * 1.5
            });

            var circle = RGraph.SVG.create({
                svg: this.svg,
                type: 'circle',
                attr: {
                    cx: opt.coordx,
                    cy: opt.coordy,
                    r: size,
                    fill: color,
                    'fill-opacity': conf.opacity
                }
            });

            // Add some data attributes that save various values
            circle.setAttribute('data-index', opt.index);
            circle.setAttribute('data-dataset', opt.datasetIdx);
            circle.setAttribute('data-original-opacity', conf.opacity);
            circle.setAttribute('data-original-color', conf.color);
            circle.setAttribute('data-original-coordx', opt.coordx);
            circle.setAttribute('data-original-coordy', opt.coordy);
            circle.setAttribute('data-size', size);
            circle.setAttribute('data-sequential', opt.sequential);
            circle.setAttribute('data-type', 'bubble');

            return {
                x: opt.coordx,
                y: opt.coordy,
                z: opt.coordz
            };
        };








        //
        // This functions draws a line if required
        //
        this.drawLine = function (opt)
        {
            var linewidth = 1,
                color     = 'black';



            // Calculate the linewidth
            if (typeof properties.lineLinewidth === 'object' && typeof properties.lineLinewidth[opt.index] === 'number') {
                linewidth = properties.lineLinewidth[opt.index];
            } else if (typeof properties.lineLinewidth === 'number') {
                linewidth = properties.lineLinewidth;
            } else {
                linewidth = 1;
            }






            // Determine the color
             if (!RGraph.SVG.isNull(properties.lineColors) && properties.lineColors && properties.lineColors[opt.index]) {
                color = properties.lineColors[opt.index];
             } else if (!RGraph.SVG.isNull(properties.colors) && properties.colors.length && typeof properties.colors[opt.index] === 'string') {
                color = properties.colors[opt.index];
            } else if (typeof properties.lineColors === 'string') {
                color = properties.lineColors;
            } else {
                color = 'black';
            }





            for (var i=0,path=''; i<this.coords2[opt.index].length; ++i) {
                path += '{1} {2} {3} '.format(
                    i === 0 ? 'M' : 'L',
                    this.coords2[opt.index][i].x,
                    this.coords2[opt.index][i].y
                );
            }

            RGraph.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: this.line_groups[opt.index],
                attr: {
                    d: path,
                    fill: 'transparent',
                    stroke: color,
                    'stroke-width': linewidth,
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round'
                }
            });
        };








        //
        // This function can be used to retrieve the relevant X coordinate for a
        // particular value.
        // 
        // @param int value The value to get the X coordinate for
        //
        this.getXCoord = function (value)
        {
            var x;

            if (value > properties.xaxisScaleMax) {
                return null;
            }

            if (value < properties.xaxisScaleMin) {
                return null;
            }

            x  = ((value - properties.xaxisScaleMin) / (properties.xaxisScaleMax - properties.xaxisScaleMin));
            x *= (this.width - properties.marginLeft - properties.marginRight);

            x = properties.marginLeft + x;

            return x;
        };








        //
        // This function can be used to retrieve the relevant Y coordinate for a
        // particular value.
        // 
        // @param int value The value to get the Y coordinate for
        //
        this.getYCoord = function (value)
        {
            if (value > this.scale.max && properties.outofbounds === false) {
                return null;
            }

            var y, xaxispos = properties.xaxispos;

            if (value < this.scale.min && properties.outofbounds === false) {
                return null;
            }

            y  = ((value - this.scale.min) / (this.scale.max - this.scale.min));
            y *= (this.height - properties.marginTop - properties.marginBottom);

            y = this.height - properties.marginBottom - y;

            return y;
        };








        //
        // This function can be used to highlight a bar on the chart
        // 
        // @param object rect The rectangle to highlight
        //
        this.highlight = function (rect)
        {
            rect.setAttribute('stroke', properties.highlightStroke);
            rect.setAttribute('stroke-width', properties.highlightLinewidth);
            rect.setAttribute('fill', properties.highlightFill);

            // Store the highlight rect in the registry so
            // it can be reset later
            RGraph.SVG.REG.set('highlight', rect);
        };








        //
        // Draws the labelsAbove
        //
        // @param opt An object that consists of various arguments to the function
        //
        this.drawLabelsAbove = function (opt)
        {
            var conf   = opt.point,
                coordX = opt.coordX,
                coordY = opt.coordY;

            
            // Facilitate labelsAboveSpecific
            if (typeof conf.above === 'string') {
                var str = conf.above;
            } else {

                conf.x = RGraph.SVG.numberFormat({
                    object:        this,
                    num:           conf.x.toFixed(properties.labelsAboveXDecimals ),
                    prepend:       typeof properties.labelsAboveXUnitsPre  === 'string'   ? properties.labelsAboveXUnitsPre  : null,
                    append:        typeof properties.labelsAboveXUnitsPost === 'string'   ? properties.labelsAboveXUnitsPost : null,
                    point:         typeof properties.labelsAboveXPoint     === 'string'   ? properties.labelsAboveXPoint     : null,
                    thousand:      typeof properties.labelsAboveXThousand  === 'string'   ? properties.labelsAboveXThousand  : null,
                    formatter:     typeof properties.labelsAboveXFormatter === 'function' ? properties.labelsAboveXFormatter : null
                });
    
                conf.y = RGraph.SVG.numberFormat({
                    object:        this,
                    num:           conf.y.toFixed(properties.labelsAboveYDecimals ),
                    prepend:       typeof properties.labelsAboveYUnitsPre  === 'string'   ? properties.labelsAboveYUnitsPre  : null,
                    append:        typeof properties.labelsAboveYUnitsPost === 'string'   ? properties.labelsAboveYUnitsPost : null,
                    point:         typeof properties.labelsAboveYPoint     === 'string'   ? properties.labelsAboveYPoint     : null,
                    thousand:      typeof properties.labelsAboveYThousand  === 'string'   ? properties.labelsAboveYThousand  : null,
                    formatter:     typeof properties.labelsAboveYFormatter === 'function' ? properties.labelsAboveYFormatter : null
                });

                var str = '{1}{2}{3}'.format(
                    conf.x,
                    properties.labelsAboveSeparator,
                    conf.y
                );
            }

            // Get the text configuration
            var textConf = RGraph.SVG.getTextConf({
                object: this,
                prefix: 'labelsAbove'
            });

            // Add the text to the scene
            RGraph.SVG.text({
                object:     this,
                parent:     this.svg.all,
                tag:        'labels.above',

                text:       str,

                x:          parseFloat(coordX) + properties.labelsAboveOffsetx,
                y:          parseFloat(coordY) + properties.labelsAboveOffsety,

                halign:     properties.labelsAboveHalign,
                valign:     properties.labelsAboveValign,
                
                font:       textConf.font,
                size:       textConf.size,
                bold:       textConf.bold,
                italic:     textConf.italic,
                color:      textConf.color,
                
                background: properties.labelsAboveBackground        || null,
                padding:    properties.labelsAboveBackgroundPadding || 0
            });
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function () 
        {

// TODO Loop thru the data parsing the color for gradients too

            // Save the original colors so that they can be restored when
            // the canvas is cleared
            if (!Object.keys(this.originalColors).length) {
                this.originalColors = {
                    colors:              RGraph.SVG.arrayClone(properties.colors),
                    backgroundGridColor: RGraph.SVG.arrayClone(properties.backgroundGridColor),
                    highlightFill:       RGraph.SVG.arrayClone(properties.highlightFill),
                    backgroundColor:     RGraph.SVG.arrayClone(properties.backgroundColor)
                }
            }

            
            // colors
            var colors = properties.colors;

            // IMPORTANT: Bubble chart gradients are parse in the drawBubble()
            //            function below
            if (colors && !properties.bubble) {
                for (var i=0; i<colors.length; ++i) {
                    colors[i] = RGraph.SVG.parseColorLinear({
                        object: this,
                        color: colors[i]
                    });
                }
            }

            properties.backgroundGridColor = RGraph.SVG.parseColorLinear({object: this, color: properties.backgroundGridColor});
            properties.highlightFill       = RGraph.SVG.parseColorLinear({object: this, color: properties.highlightFill});
            properties.backgroundColor     = RGraph.SVG.parseColorLinear({object: this, color: properties.backgroundColor});
        };








        //
        // Using a function to add events makes it easier to facilitate method
        // chaining
        // 
        // @param string   type The type of even to add
        // @param function func 
        //
        this.on = function (type, func)
        {
            if (type.substr(0,2) !== 'on') {
                type = 'on' + type;
            }
            
            RGraph.SVG.addCustomEventListener(this, type, func);
    
            return this;
        };








        //
        // Used in chaining. Runs a function there and then - not waiting for
        // the events to fire (eg the onbeforedraw event)
        // 
        // @param function func The function to execute
        //
        this.exec = function (func)
        {
            func(this);
            
            return this;
        };








        //
        // Remove highlight from the chart (tooltips)
        //
        this.removeHighlight = function ()
        {
            var highlight = RGraph.SVG.REG.get('highlight');
            
            if (highlight) {
                highlight.setAttribute('fill', 'transparent');
                RGraph.SVG.REG.set('highlight', null);
            }
        };







        //
        // Draws a single errorbar
        //
        this.drawErrorbar = function (opt)
        {
            // Get the error bar value
            var max = RGraph.SVG.getErrorbarsMaxValue({
                object: this,
                index: opt.sequential
            });
        
        
            // Get the error bar value
            var min = RGraph.SVG.getErrorbarsMinValue({
                object: this,
                index: opt.sequential
            });
    
            if (!max && !min) {
                return;
            }
    
            var linewidth    = RGraph.SVG.getErrorbarsLinewidth({object: this,  index: opt.sequential}),
                color        = RGraph.SVG.getErrorbarsColor({object: this,      index: opt.sequential}),
                capwidth     = RGraph.SVG.getErrorbarsCapWidth({object: this,   index: opt.sequential}),
                halfCapWidth = capwidth / 2;
    
    
    
    
    

            if (max !== 0 || min !== 0) {

                var y1 = this.getYCoord(opt.valueY + max)
                    y2 = this.getYCoord(opt.valueY - min);

                // Draw the UPPER vertical line
                var errorbarLine = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'line',
                    parent: opt.parent,
                    attr: {
                        x1: opt.x,
                        y1: opt.y,
                        x2: opt.x,
                        y2: y1,
                        stroke: color,
                        'stroke-width': linewidth
                    }
                });
        
        
                // Draw the cap to the UPPER line
                var errorbarCap = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'line',
                    parent: opt.parent,
                    attr: {
                        x1: opt.x - halfCapWidth,
                        y1: y1,
                        x2: opt.x + halfCapWidth,
                        y2: y1,
                        stroke: color,
                        'stroke-width': linewidth
                    }
                });
            }
    
    
    
    
    
    
    
    
    
    
    
    
    

            // Draw the minimum errorbar if necessary
            if (typeof min === 'number') {
        
                var errorbarLine = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'line',
                    parent: opt.parent,
                    attr: {
                        x1: opt.x,
                        y1: opt.y,
                        x2: opt.x,
                        y2: y2,
                        stroke: color,
                        'stroke-width': linewidth
                    }
                });
        
                // Draw the cap to the UPPER line
                var errorbarCap = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'line',
                    parent: opt.parent,
                    attr: {
                        x1: opt.x - halfCapWidth,
                        y1: y2,
                        x2: opt.x + halfCapWidth,
                        y2: y2,
                        stroke: color,
                        'stroke-width': linewidth
                    }
                });
            }
        };








        //
        // A worker function that handles Bar chart specific tooltip substitutions
        //
        this.tooltipSubstitutions = function (opt)
        {
            var indexes = RGraph.SVG.sequentialIndexToGrouped(opt.index, this.data),
                dataset = indexes[0],
                index   = indexes[1];

            return {
                  index: index,
                dataset: dataset,
        sequentialIndex: opt.index,
                  value: this.data[dataset][index].y,
                 values: [this.data[dataset][index].y]
            };
        };








        //
        // A worker function that returns the correct color/label/value
        //
        // @param object specific The indexes that are applicable
        // @param number index    The appropriate index
        //
        this.tooltipsFormattedCustom = function (specific, index, colors)
        {
            var color = this.data[specific.dataset][specific.index].color
                            ? this.data[specific.dataset][specific.index].color
                            : properties.colorsDefault;
            if (properties.tooltipsFormattedKeyColors && properties.tooltipsFormattedKeyColors[specific.dataset]) {
                color = properties.tooltipsFormattedKeyColors[specific.dataset];
            }

            var label = properties.tooltipsFormattedKeyLabels[specific.dataset]
                            ? properties.tooltipsFormattedKeyLabels[specific.dataset]
                            : '';

            return {
                label: label,
                color: color
            };
        };








        //
        // This allows for static tooltip positioning
        //
        this.positionTooltipStatic = function (args)
        {
            var obj      = args.object,
                e        = args.event,
                tooltip  = args.tooltip,
                index    = args.index,
                svgXY    = RGraph.SVG.getSVGXY(obj.svg),
                coords   = this.coords[args.index];

            // Position the tooltip in the X direction
            args.tooltip.style.left = (
                  svgXY[0]                       // The X coordinate of the SVG tag
                + coords.x                       // The X coordinate of the bar on the chart
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
            ) + 'px';

            args.tooltip.style.top  = (
                  svgXY[1]                       // The Y coordinate of the SVG tag
                + coords.y                       // The Y coordinate of the bar on the chart
                - tooltip.offsetHeight           // The height of the tooltip
                - 15                             // An arbitrary amount
            ) + 'px';
        };








        return this;
    };
    
    
    
    
    
    
    
    
    
    

// End module pattern
})(window, document);