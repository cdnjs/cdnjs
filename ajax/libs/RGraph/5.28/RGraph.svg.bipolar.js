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
    RGraph.SVG.Bipolar = function (conf)
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

                this.properties[name] = value;

                // If setting the colors, update the originalColors
                // property too
                if (name === 'colors') {
                    this.originalColors = RGraph.SVG.arrayClone(value);
                    this.colorsParsed = false;
                }
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








        this.id                    = conf.id;
        this.uid                   = RGraph.SVG.createUID();
        this.container             = document.getElementById(this.id);
        this.layers                = {}; // MUST be before the SVG tag is created!
        this.svg                   = RGraph.SVG.createSVG({object: this,container: this.container});
        this.isRGraph              = true;
        this.isrgraph              = true;
        this.rgraph                = true;
        this.data                  = [conf.left, conf.right];
        this.left                  = conf.left;
        this.right                 = conf.right;
        this.type                  = 'bipolar';
        this.coords                = [];
        this.coordsLeft            = [];
        this.coordsRight           = [];
        this.coords2               = [];
        this.coords2Left           = [];
        this.coords2Right          = [];
        this.stackedBackfacesLeft  = [];
        this.stackedBackfacesRight = [];
        this.originalColors        = {};
        this.gradientCounter       = 1;
        this.sequentialIndex       = 0; // Used for tooltips
        
        //
        // Convert strings to numbers
        //
        this.data[0] = RGraph.SVG.stringsToNumbers(this.data[0]);
        this.data[1] = RGraph.SVG.stringsToNumbers(this.data[1]);
        this.left    = RGraph.SVG.stringsToNumbers(this.left);
        this.right   = RGraph.SVG.stringsToNumbers(this.right);








        //
        // Make the .data_arr variable (All data in a linear array)
        //
        this.data_arr = [];
        for (var i=0; i<this.left.length; ++i)  this.data_arr.push(this.left[i]);
        for (var i=0; i<this.right.length; ++i) this.data_arr.push(this.right[i]);



        // Add this object to the ObjectRegistry
        RGraph.SVG.OR.add(this);
        
        this.container.style.display = 'inline-block';

        this.properties =
        {
            marginLeft:   35,
            marginRight:  35,
            marginTop:    35,
            marginBottom: 35,
            marginCenter: null,

            backgroundColor:            null,
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

            xaxis:                true,
            xaxisLinewidth:       1,
            xaxisTickmarks:       true,
            xaxisTickmarksLength: 5,
            xaxisLabelsCount:     5,
            xaxisLabelsPositionEdgeTickmarksCount: 5,
            xaxisColor:           'black',
            xaxisLabelsOffsetx:   0,
            xaxisLabelsOffsety:   0,
            xaxisLabelsFont:        null,
            xaxisLabelsSize:        null,
            xaxisLabelsBold:        null,
            xaxisLabelsItalic:      null,
            xaxisLabelsColor:       null,
            xaxisScaleUnitsPre:        '',
            xaxisScaleUnitsPost:       '',
            xaxisScaleStrict:          false,
            xaxisScaleDecimals:        0,
            xaxisScalePoint:           '.',
            xaxisScaleThousand:        ',',
            xaxisScaleRound:           false,
            xaxisScaleMax:             null,
            xaxisScaleMin:             0,
            xaxisScaleFormatter:       null,

            yaxis:                true,
            yaxisTickmarks:       true,
            yaxisTickmarksLength: 5,
            yaxisColor:           'black',
            yaxisScale:           false,
            yaxisLabels:          null,
            yaxisLabelsOffsetx:   0,
            yaxisLabelsOffsety:   0,
            yaxisLabelsFont:        null,
            yaxisLabelsSize:        null,
            yaxisLabelsBold:        null,
            yaxisLabelsItalic:      null,
            yaxisLabelsColor:       null,
            
            // 20 colors. If you need more you need to set the colors property
            colors: [
                'red', '#0f0', '#00f', '#ff0', '#0ff', '#0f0','pink','orange','gray','black',
                'red', '#0f0', '#00f', '#ff0', '#0ff', '#0f0','pink','orange','gray','black'
            ],
            colorsSequential:     false,
            colorsStroke:          'rgba(0,0,0,0)',
            
            marginInner:              3,
            marginInnerGrouped:       2,

            labelsAbove:                  false,
            labelsAboveFont:              null,
            labelsAboveSize:              null,
            labelsAboveBold:              null,
            labelsAboveItalic:            null,
            labelsAboveColor:             null,
            labelsAboveBackground:        null,
            labelsAboveBackgroundPadding: 0,
            labelsAboveUnitsPre:          null,
            labelsAboveUnitsPost:         null,
            labelsAbovePoint:             null,
            labelsAboveThousand:          null,
            labelsAboveFormatter:         null,
            labelsAboveDecimals:          null,
            labelsAboveOffsetx:           0,
            labelsAboveOffsety:           0,
            labelsAboveSpecific:          null,
            
            textColor:            'black',
            textFont:             'Arial, Verdana, sans-serif',
            textSize:             12,
            textBold:             false,
            textItalic:           false,

            linewidth:            1,
            grouping:             'grouped',
            
            tooltips:                   null,
            tooltipsOverride:           null,
            tooltipsEffect:             'fade',
            tooltipsCssClass:           'RGraph_tooltip',
            tooltipsCss:                null,
            tooltipsEvent:              'click',
            tooltipsFormattedThousand:  ',',
            tooltipsFormattedPoint:     '.',
            tooltipsFormattedDecimals:  0,
            tooltipsFormattedUnitsPre:  '',
            tooltipsFormattedUnitsPost: '',
            tooltipsFormattedKeyColors: null,
            tooltipsFormattedKeyColorsShape: 'square',
            tooltipsFormattedKeyLabels: [],
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
            titleSubtitleColor:   '#aaa',
            titleSubtitleSize:    null,
            titleSubtitleFont:    null,
            titleSubtitleBold:    null,
            titleSubtitleItalic:  null,
            
            shadow:               false,
            shadowOffsetx:        2,
            shadowOffsety:        2,
            shadowBlur:           2,
            shadowOpacity:        0.25,

            key:             null,
            keyColors:       null,
            keyOffsetx:      0,
            keyOffsety:      0,
            keyLabelsOffsetx:  0,
            keyLabelsOffsety:  -1,
            keyLabelsSize:   null,
            keyLabelsBold:   null,
            keyLabelsItalic: null,
            keyLabelsFont:   null,
            keyLabelsColor:  null
        };




        //
        // Copy the global object properties to this instance
        //
        RGraph.SVG.getGlobals(this);





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
        // The draw method draws the Bar chart
        //
        this.draw = function ()
        {
            // Fire the beforedraw event
            RGraph.SVG.fireCustomEvent(this, 'onbeforedraw');






            // Should the first thing that's done inthe.draw() function
            // except for the onbeforedraw event
            this.width  = Number(this.svg.getAttribute('width'));
            this.height = Number(this.svg.getAttribute('height'));










            // Create the defs tag if necessary
            RGraph.SVG.createDefs(this);

            




            //
            // Autosize the center gutter to allow for big labels

            // 16th September 2019 - took out the IF() condition so that the centermargin i
            // ALWAYS calculated

            properties.marginCenter = this.getMarginCenter();
            //}


            // Reset the coords arrays
            this.coords       = [];
            this.coordsLeft   = [];
            this.coordsRight  = [];
            this.coords2      = [];
            this.coords2Left  = [];
            this.coords2Right = [];


            // (Re)set this to zero
            this.sequentialIndex = 0;


            this.graphWidth  = (this.width - properties.marginLeft - properties.marginRight - properties.marginCenter) / 2;
            this.graphHeight = this.height - properties.marginTop - properties.marginBottom;



            //
            // Parse the colors. This allows for simple gradient syntax
            //

            // Parse the colors for gradients
            RGraph.SVG.resetColorsToOriginalValues({object:this});
            this.parseColors();



            // Go through the data and work out the maximum value
            var values = [];

            for (var i=0; i<2; ++i) {
                for (var j=0,max=0; j<this.data[i].length; ++j) {
                    if (typeof this.data[i][j] === 'number') {
                        values.push(this.data[i][j]);
                    
                    } else if (RGraph.SVG.isArray(this.data[i][j]) && properties.grouping === 'grouped') {
                        values.push(RGraph.SVG.arrayMax(this.data[i][j]));
    
                    } else if (RGraph.SVG.isArray(this.data[i][j]) && properties.grouping === 'stacked') {
                        values.push(RGraph.SVG.arraySum(this.data[i][j]));
                    }
                }
            }
            
            var max = RGraph.SVG.arrayMax(values);

            // A custom, user-specified maximum value
            if (typeof properties.xaxisScaleMax === 'number') {
                max = properties.xaxisScaleMax;
            }



            //
            // Generate an appropiate scale
            //
            this.scale = RGraph.SVG.getScale({
                object:    this,
                numlabels: properties.xaxisLabelsCount,
                unitsPre:  properties.xaxisScaleUnitsPre,
                unitsPost: properties.xaxisScaleUnitsPost,
                max:       max,
                min:       properties.xaxisScaleMin,
                point:     properties.xaxisScalePoint,
                round:     properties.xaxisScaleRound,
                thousand:  properties.xaxisScaleThousand,
                decimals:  properties.xaxisScaleDecimals,
                strict:    typeof properties.xaxisScaleMax === 'number',
                formatter: properties.xaxisScaleFormatter
            });





            // Now the scale has been generated adopt its max value
            this.max           = this.scale.max;
            this.min           = this.scale.min;
            properties.yaxisScaleMax = this.scale.max;
            properties.yaxisScaleMin = this.scale.min;



            // Draw the background first
            this.drawBackground(this);
            
            // Draw the title
            this.drawTitle();



            // Draw the bars
            this.drawBars();


            // Draw the axes over the bars
            this.drawAxes();


            // Draw the labels for both of the axes
            this.drawLabels()
            
            
            // Draw the labelsAbove labels
            this.drawLabelsAbove();



            
            
            // Draw the key
            if (typeof properties.key !== null && RGraph.SVG.drawKey) {
                RGraph.SVG.drawKey(this);
            } else if (!RGraph.SVG.isNull(properties.key)) {
                alert('The drawKey() function does not exist - have you forgotten to include the key library?');
            }



            // Fire the draw event
            RGraph.SVG.fireCustomEvent(this, 'ondraw');

            return this;
        };








        //
        // Draws the background
        //
        this.drawBackground = function ()
        {
            // For some reason this appears to be necessary
            var properties = this.properties;

            // Save the original margin properties
            var originalMarginRight = properties.marginRight,
                originalMarginLeft  = properties.marginLeft;
            
            // Draw the LEFT background
            properties.marginRight = this.width - (properties.marginLeft + this.graphWidth);
            if (RGraph.SVG.isNull(properties.backgroundGridHlinesCount)) {
                var resetToNull = true;
                properties.backgroundGridHlinesCount = this.left.length;
            }





            // Set the LEFT background image properties
            var props = ['','Aspect','Opacity','Stretch','X','Y','W','H',];
            
            for (i in props) {
                if (typeof props[i] === 'string') {
                    properties['backgroundImage' + String(props[i])] = properties['backgroundImageLeft' + props[i]];
                }
            }




            RGraph.SVG.drawBackground(this);
            
            if (resetToNull) {
                properties.backgroundGridHlinesCount = null;
            }
















            // Draw the RIGHT background
            properties.marginRight = originalMarginRight;
            properties.marginLeft  = this.width - (properties.marginRight + this.graphWidth);

            if (RGraph.SVG.isNull(properties.backgroundGridHlinesCount)) {
                properties.backgroundGridHlinesCount = this.right.length;
            }














            // Set the RIGHT background image properties
            var props = ['','Aspect','Opacity','Stretch','X','Y','W','H',];
            
            for (i in props) {
                if (typeof props[i] === 'string') {
                    properties['backgroundImage' + props[i]] = properties['backgroundImageRight' + props[i]];
                }
            }





            // Draw the background
            RGraph.SVG.drawBackground(this);






            // Reset the margin properties to the original values
            properties.marginLeft  = originalMarginLeft;
            properties.marginRight = originalMarginRight;
        };



























        //
        // Draws the axes
        //
        this.drawAxes = function ()
        {
            // Draw the LEFT X axes
            if (properties.xaxis) {
                RGraph.SVG.create({
                    svg: this.svg,
                    type: 'path',
                    parent: this.svg.all,
                    attr: {
                        d: 'M {1} {2} L {3} {4}'.format(
                            properties.marginLeft,
                            this.height - properties.marginBottom,
                            properties.marginLeft + this.graphWidth,
                            this.height - properties.marginBottom
                        ),
                        'stroke-width': properties.xaxisLinewidth,
                        stroke: properties.xaxisColor,
                        fill: 'rgba(0,0,0,0)',
                        'shape-rendering': 'crispEdges'
                    }
                });




                // Draw the right X axis
                var foo2 = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'path',
                    parent: this.svg.all,
                    attr: {
                        d: 'M {1} {2} L {3} {4}'.format(
                            this.width - properties.marginRight,
                            this.height - properties.marginBottom,
                            this.width - properties.marginRight - this.graphWidth,
                            this.height - properties.marginBottom
                        ),
                        'stroke-width': properties.xaxisLinewidth,
                        stroke: properties.xaxisColor,
                        fill: 'rgba(0,0,0,0)',
                        'shape-rendering': 'crispEdges'
                    }
                });

                //
                // Draw tickmarks if necessary
                //
                if (properties.xaxisTickmarks) {
                
                    var startY = this.height - properties.marginBottom,
                        endY   = this.height - properties.marginBottom + properties.xaxisTickmarksLength;

                    // Draw the LEFT sides tickmarks
                    for (var i=0; i<properties.xaxisLabelsPositionEdgeTickmarksCount; ++i) {
    
                        var x = properties.marginLeft + (i * (this.graphWidth / properties.xaxisLabelsPositionEdgeTickmarksCount));

                        RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svg.all,
                            type: 'path',
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    x + 0.001,
                                    startY,
                                    x,
                                    endY
                                ),
                                stroke: properties.xaxisColor,
                                'stroke-width': properties.xaxisLinewidth,
                                'shape-rendering': "crispEdges"
                            }
                        });
                    }
                    
                    // Draw an extra LEFT tick if no Y axis is being shown
                    if (!properties.yaxis) {
                        
                        var x = properties.marginLeft + this.graphWidth;

                        RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svg.all,
                            type: 'path',
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    x + 0.001,
                                    startY,
                                    x,
                                    endY
                                ),
                                stroke: properties.xaxisColor,
                                'stroke-width': properties.xaxisLinewidth,
                                'shape-rendering': "crispEdges"
                            }
                        });
                    }









                    // Draw the RIGHT sides tickmarks
                    for (var i=0; i<properties.xaxisLabelsPositionEdgeTickmarksCount; ++i) {
    
                        var x = properties.marginLeft + properties.marginCenter + this.graphWidth + ((i+1) * (this.graphWidth / properties.xaxisLabelsPositionEdgeTickmarksCount));

                        RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svg.all,
                            type: 'path',
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    x + 0.001,
                                    startY,
                                    x,
                                    endY
                                ),
                                stroke: properties.xaxisColor,
                                'stroke-width': properties.xaxisLinewidth,
                                'shape-rendering': "crispEdges"
                            }
                        });
                    }


                    // Draw an extra RIGHT tick if no Y axis is being shown
                    if (!properties.yaxis) {
                        
                        var x = properties.marginLeft + this.graphWidth + properties.marginCenter;

                        RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svg.all,
                            type: 'path',
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    x + 0.001,
                                    startY,
                                    x,
                                    endY
                                ),
                                stroke: properties.xaxisColor,
                                'stroke-width': properties.xaxisLinewidth,
                                'shape-rendering': "crispEdges"
                            }
                        });
                    }
                }
            }














            // Draw the LEFT vertical axes
            if (properties.yaxis) {
                RGraph.SVG.create({
                    svg: this.svg,
                    type: 'path',
                    parent: this.svg.all,
                    attr: {
                        d: 'M {1} {2} L {3} {4}'.format(
                            properties.marginLeft + this.graphWidth,
                            this.height - properties.marginBottom,
                            properties.marginLeft + this.graphWidth,
                            properties.marginTop
                        ),
                        'stroke-width': properties.yaxisLinewidth,
                        stroke: properties.yaxisColor,
                        fill: 'rgba(0,0,0,0)',
                        'shape-rendering': 'crispEdges',
                        'stroke-linecap': 'square'
                    }
                });




                // Draw the RIGHT vertical  axis
                RGraph.SVG.create({
                    svg: this.svg,
                    type: 'path',
                    parent: this.svg.all,
                    attr: {
                        d: 'M {1} {2} L {3} {4}'.format(
                            properties.marginLeft + this.graphWidth + properties.marginCenter,
                            this.height - properties.marginBottom,
                            properties.marginLeft + this.graphWidth + properties.marginCenter,
                            properties.marginTop
                        ),
                        'stroke-width': properties.yaxisLinewidth,
                        stroke: properties.yaxisColor,
                        fill: 'rgba(0,0,0,0)',
                        'shape-rendering': 'crispEdges',
                        'stroke-linecap': 'square'
                    }
                });




                //
                // Draw Y axis tickmarks if necessary
                //
                if (properties.yaxisTickmarks) {
                
                    var startX   = properties.marginLeft + this.graphWidth,
                        endX     = properties.marginLeft + this.graphWidth + properties.yaxisTickmarksLength,
                        numticks = this.left.length;
    
                    // Draw the left sides tickmarks
                    for (var i=0; i<numticks; ++i) {
    
                        var y = properties.marginTop + (i * (this.graphHeight / numticks));
    
                        RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svg.all,
                            type: 'path',
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    startX + 0.001,
                                    y,
                                    endX,
                                    y
                                ),
                                stroke: properties.yaxisColor,
                                'stroke-width': properties.yaxisLinewidth,
                                'shape-rendering': "crispEdges"
                            }
                        });
                    }
                    
                    // Draw an extra LEFT tickmark if the X axis is not being shown
                    if (!properties.xaxis) {

                        var y = properties.marginTop + this.graphHeight;
    
                        RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svg.all,
                            type: 'path',
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    startX + 0.001,
                                    y,
                                    endX,
                                    y
                                ),
                                stroke: properties.yaxisColor,
                                'stroke-width': properties.yaxisLinewidth,
                                'shape-rendering': "crispEdges"
                            }
                        });
                    }












                    var startX   = properties.marginLeft + this.graphWidth + properties.marginCenter,
                        endX     = properties.marginLeft + this.graphWidth + properties.marginCenter - properties.yaxisTickmarksLength,
                        numticks = this.right.length;



                    for (var i=0; i<numticks; ++i) {
    
                        var y = properties.marginTop + (i * (this.graphHeight / numticks));
    
                        RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svg.all,
                            type: 'path',
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    startX + 0.001,
                                    y,
                                    endX,
                                    y
                                ),
                                stroke: properties.yaxisColor,
                                'stroke-width': properties.yaxisLinewidth,
                                'shape-rendering': "crispEdges"
                            }
                        });
                    }
                    
                    // Draw an extra RIGHT tickmark if the X axis is not being shown
                    if (!properties.xaxis) {

                        var y = properties.marginTop + this.graphHeight;
    
                        RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svg.all,
                            type: 'path',
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    startX + 0.001,
                                    y,
                                    endX,
                                    y
                                ),
                                stroke: properties.yaxisColor,
                                'stroke-width': properties.yaxisLinewidth,
                                'shape-rendering': "crispEdges"
                            }
                        });
                    }
                }
            }
        };








        //
        // Draws the labels
        //
        this.drawLabels = function ()
        {
            //
            // Draw the Y axis labels
            //
            var numlabels = properties.yaxisLabels ? properties.yaxisLabels.length : 5
            
            // Get the Y axis labels configuration
            var textConf = RGraph.SVG.getTextConf({
                object: this,
                prefix: 'yaxisLabels'
            });

            for (var i=0; i<numlabels; ++i) {

                var segment = this.graphHeight / numlabels,
                    y       = properties.marginTop + (segment * i) + (segment / 2) + properties.yaxisLabelsOffsety,
                    x       = properties.marginLeft + this.graphWidth + (properties.marginCenter / 2) + properties.yaxisLabelsOffsetx;

                var text = RGraph.SVG.text({
                    
                    object: this,
                    parent: this.svg.all,
                    tag:    'labels.yaxis',
                    
                    text:   properties.yaxisLabels && properties.yaxisLabels[i] ? properties.yaxisLabels[i] : '',

                    x:      x,
                    y:      y,
                    
                    halign: 'center',
                    valign: 'center',

                    font:   textConf.font,
                    size:   textConf.size,
                    bold:   textConf.bold,
                    italic: textConf.italic,
                    color:  textConf.color
                });
            }





            //
            // Add the minimum label for the LEFT side
            //
            var y   = this.height - properties.marginBottom + 10,
                str = (typeof properties.xaxisScaleFormatter === 'function') ?
                    properties.xaxisScaleFormatter(this, properties.xaxisScaleMin)
                    :
                    (properties.xaxisScaleUnitsPre + properties.xaxisScaleMin.toFixed(properties.xaxisScaleDecimals).replace(/\./, properties.xaxisScalePoint) + properties.xaxisScaleUnitsPost);

            // Get the Y axis labels configuration
            var textConf = RGraph.SVG.getTextConf({
                object: this,
                prefix: 'xaxisLabels'
            });

            var text = RGraph.SVG.text({
                
                object:     this,
                parent:     this.svg.all,
                
                text:       str,
                
                x:          properties.marginLeft + this.graphWidth + properties.xaxisLabelsOffsetx,
                y:          y + properties.xaxisLabelsOffsety,
                halign:     'center',
                valign:     'top',
                
                tag:        'labels.xaxis',
                
                font:       textConf.font,
                size:       textConf.size,
                bold:       textConf.bold,
                italic:     textConf.italic,
                color:      textConf.color
            });


            //
            // Draw the X axis scale for the LEFT side
            //
            var segment = this.graphWidth / properties.xaxisLabelsCount;

            for (var i=0; i<this.scale.labels.length; ++i) {

                RGraph.SVG.text({
                    
                    object: this,
                    parent: this.svg.all,
                    
                    text:   this.scale.labels[i],
                    
                    x:      properties.marginLeft + this.graphWidth - (segment * (i+1)) + properties.xaxisLabelsOffsetx,
                    y:      this.height - properties.marginBottom + 10 + properties.xaxisLabelsOffsety,
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











            //
            // Add the minimum label for the RIGHT side
            //
            var text = RGraph.SVG.text({
                
                object: this,
                parent: this.svg.all,
                tag:    'labels.xaxis',
                
                text:   (typeof properties.xaxisScaleFormatter == 'function') ?
                            properties.xaxisScaleFormatter(this, properties.xaxisScaleMin)
                            :
                            properties.xaxisScaleUnitsPre + properties.xaxisScaleMin.toFixed(properties.xaxisScaleDecimals).replace(/\./, properties.xaxisScalePoint) + properties.xaxisScaleUnitsPost,
                
                x:      properties.marginLeft + this.graphWidth + properties.marginCenter + properties.xaxisLabelsOffsetx,
                y:      this.height - properties.marginBottom + 10 + properties.xaxisLabelsOffsety,
                
                halign: 'center',
                valign: 'top',
                
                font:   textConf.font,
                size:   textConf.size,
                bold:   textConf.bold,
                italic: textConf.italic,
                color:  textConf.color
            });

            //
            // Draw the X axis scale for the RIGHT side
            //
            for (var i=0; i<this.scale.labels.length; ++i) {

                RGraph.SVG.text({
                    
                    object: this,
                    parent: this.svg.all,
                    tag:    'labels.xaxis',
                    
                    text:   this.scale.labels[i],
                    
                    x:      properties.marginLeft + this.graphWidth + properties.marginCenter + (segment * (i + 1)) + properties.xaxisLabelsOffsetx,
                    y:      this.height - properties.marginBottom + 10 + properties.xaxisLabelsOffsety,
                    
                    halign: 'center',
                    valign: 'top',

                    font:   textConf.font,
                    size:   textConf.size,
                    bold:   textConf.bold,
                    italic: textConf.italic,
                    color:  textConf.color
                });
            }





        };








        //
        // Draws the bars
        //
        this.drawBars = function ()
        {
            if (properties.shadow) {
                RGraph.SVG.setShadow({
                    object:  this,
                    offsetx: properties.shadowOffsetx,
                    offsety: properties.shadowOffsety,
                    blur:    properties.shadowBlur,
                    opacity: properties.shadowOpacity,
                    id:      'dropShadow'
                });
            }







            // Go thru the LEFT data and draw the bars
            for (var i=0; i<this.left.length; ++i) {

                // LEFT REGULAR NUMBER
                if (typeof this.left[i] === 'number') {

                    var color   = properties.colors[this.sequentialIndex],
                        tooltip = RGraph.SVG.isNull(properties.tooltips) ? null : properties.tooltips[this.sequentialIndex],
                        y       = properties.marginTop + ((this.graphHeight / this.left.length) * i) + properties.marginInner,
                        width   = this.getWidth(this.left[i]),
                        x       = properties.marginLeft + this.graphWidth - width,
                        height  = (this.graphHeight / this.left.length) - properties.marginInner - properties.marginInner;
                        
        
                    var rect = RGraph.SVG.create({
                        svg: this.svg,
                        parent: this.svg.all,
                        type: 'rect',
                        attr: {
                            x:                       x,
                            y:                       y,
                            width:                   width,
                            height:                  height,
                            fill:                    properties.colorsSequential ? properties.colors[this.sequentialIndex] : properties.colors[0],
                            stroke:                  properties.colorsStroke,
                            'stroke-width':          properties.linewidth,
                            'shape-rendering':       'crispEdges',
                            'data-original-x':       x,
                            'data-original-y':       y,
                            'data-original-width':   width,
                            'data-original-height':  height,
                            'data-tooltop':          (tooltip || ''),
                            'data-index':            i,
                            'data-sequential-index': this.sequentialIndex,
                            'data-value':            this.left[i],
                            filter: properties.shadow ? 'url(#dropShadow)' : ''
                        }
                    });











                    this.coords.push({
                        object:  this,
                        element: rect,
                        x:      parseFloat(rect.getAttribute('x')),
                        y:      parseFloat(rect.getAttribute('y')),
                        width:  parseFloat(rect.getAttribute('width')),
                        height: parseFloat(rect.getAttribute('height'))
                    });

                    this.coordsLeft.push({
                        object:  this,
                        element: rect,
                        x:      parseFloat(rect.getAttribute('x')),
                        y:      parseFloat(rect.getAttribute('y')),
                        width:  parseFloat(rect.getAttribute('width')),
                        height: parseFloat(rect.getAttribute('height'))
                    });




                    this.installTooltipsEventListeners({
                        rect: rect,
                        index: i,
                        sequentialIndex: this.sequentialIndex
                    });

                    this.sequentialIndex++;







                // LEFT STACKED
                } else if (RGraph.SVG.isArray(this.left[i]) && properties.grouping === 'stacked') {

                    var accWidth = 0;

                    for (var j=0; j<this.left[i].length; ++j) {

                        var color    = properties.colors[this.sequentialIndex],
                            tooltip  = RGraph.SVG.isNull(properties.tooltips) ? null : properties.tooltips[this.sequentialIndex],
                            y        = properties.marginTop + ((this.graphHeight / this.left.length) * i) + properties.marginInner,
                            width    = this.getWidth(this.left[i][j]),
                            accWidth = accWidth + width,
                            x        = properties.marginLeft + this.graphWidth - accWidth,
                            height   = (this.graphHeight / this.left.length) - properties.marginInner - properties.marginInner;











                        // If this is the first iteration of the loop and a shadow
                        // is requested draw a rect here to create it.
                        if (j === 0 && properties.shadow) {
                            
                            var shadowBackfaceX = properties.marginLeft + this.graphWidth - this.getWidth(RGraph.SVG.arraySum(this.left[i])),
                                shadowBackfaceWidth = this.getWidth(RGraph.SVG.arraySum(this.left[i]));
                                

                            var rect = RGraph.SVG.create({
                                svg: this.svg,
                                parent: this.svg.all,
                                type: 'rect',
                                attr: {
                                    fill: '#eee',
                                    x: shadowBackfaceX,
                                    y: y,
                                    width: shadowBackfaceWidth,
                                    height: height,
                                    'stroke-width': 0,
                                    'data-index': i,
                                    filter: 'url(#dropShadow)'
                                }
                            });

                            this.stackedBackfacesLeft[i] = rect;
                        }






                        var rect = RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svg.all,
                            type: 'rect',
                            attr: {
                                x:                      x,
                                y:                      y,
                                width:                  width,
                                height:                 height,
                                fill:                   properties.colorsSequential ? properties.colors[this.sequentialIndex] : properties.colors[j],
                                stroke:                 properties.colorsStroke,
                                'stroke-width':         properties.linewidth,
                                'shape-rendering':      'crispEdges',
                                'data-original-x':       x,
                                'data-original-y':       y,
                                'data-original-width':   width,
                                'data-original-height':  height,
                                'data-tooltop':          (tooltip || ''),
                                'data-index':            i,
                                'data-subindex':         j,
                                'data-sequential-index': this.sequentialIndex,
                                'data-value':            this.left[i][j]
                            }
                        });






                        this.coords.push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });

                        this.coordsLeft.push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });

                        if (!this.coords2[i]) {
                            this.coords2[i] = [];
                        }

                        if (!this.coords2Left[i]) {
                            this.coords2Left[i] = [];
                        }

                        this.coords2[i].push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });

                        this.coords2Left[i].push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });










                        this.installTooltipsEventListeners({
                            rect: rect,
                            index: i,
                            sequentialIndex: this.sequentialIndex
                        });
                        
                        
                        this.sequentialIndex++;
                    }









                // LEFT GROUPED
                } else if (RGraph.SVG.isArray(this.left[i]) && properties.grouping === 'grouped') {

                    for (var j=0; j<this.left[i].length; ++j) {

                        var color    = properties.colors[this.sequentialIndex],
                            tooltip  = RGraph.SVG.isNull(properties.tooltips) ? null : properties.tooltips[this.sequentialIndex],
                            height   = ((this.graphHeight / this.left.length) - properties.marginInner - properties.marginInner - (properties.marginInnerGrouped * (this.left[i].length - 1))) / this.left[i].length,
                            y        = properties.marginTop + ((this.graphHeight / this.left.length) * i) + properties.marginInner + (height * j) + (j * properties.marginInnerGrouped),
                            width    = this.getWidth(this.left[i][j]),
                            x        = properties.marginLeft + this.graphWidth - width;

            
                        var rect = RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svg.all,
                            type: 'rect',
                            attr: {
                                x:                      x,
                                y:                      y,
                                width:                  width,
                                height:                 height,
                                fill:                   properties.colorsSequential ? properties.colors[this.sequentialIndex] : properties.colors[j],
                                stroke:                 properties.colorsStroke,
                                'stroke-width':         properties.linewidth,
                                'shape-rendering':      'crispEdges',
                                'data-original-x':       x,
                                'data-original-y':       y,
                                'data-original-width':   width,
                                'data-original-height':  height,
                                'data-tooltop':          (tooltip || ''),
                                'data-index':            i,
                                'data-subindex':         j,
                                'data-sequential-index': this.sequentialIndex,
                                'data-value':            this.left[i][j],
                                filter: properties.shadow ? 'url(#dropShadow)' : ''
                            }
                        });






                        this.coords.push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });

                        this.coordsLeft.push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });


                        if (!this.coords2[i]) {
                            this.coords2[i] = [];
                        }

                        if (!this.coords2Left[i]) {
                            this.coords2Left[i] = [];
                        }

                        this.coords2[i].push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });

                        this.coords2Left[i].push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });

                        this.installTooltipsEventListeners({
                            rect: rect,
                            index: i,
                            sequentialIndex: this.sequentialIndex
                        });

                        this.sequentialIndex++;
                    }
                }
            }


















            // Go thru the RIGHT data and draw the bars
            for (var i=0; i<this.right.length; ++i) {

                // RIGHT REGULAR
                if (typeof this.right[i] === 'number') {

                    var color   = properties.colors[this.sequentialIndex],
                        tooltip = RGraph.SVG.isNull(properties.tooltips) ? null : properties.tooltips[this.sequentialIndex],
                        y       = properties.marginTop + ((this.graphHeight / this.right.length) * i) + properties.marginInner,
                        width   = this.getWidth(this.right[i]),
                        x       = properties.marginLeft + this.graphWidth + properties.marginCenter,
                        height  = (this.graphHeight / this.right.length) - properties.marginInner - properties.marginInner;
                        
        
                    var rect = RGraph.SVG.create({
                        svg: this.svg,
                        parent: this.svg.all,
                        type: 'rect',
                        attr: {
                            x:                       x,
                            y:                       y,
                            width:                   width,
                            height:                  height,
                            fill:                    properties.colorsSequential ? properties.colors[this.sequentialIndex] : properties.colors[0],
                            stroke:                  properties.colorsStroke,
                            'stroke-width':          properties.linewidth,
                            'shape-rendering':       'crispEdges',
                            'data-original-x':       x,
                            'data-original-y':       y,
                            'data-original-width':   width,
                            'data-original-height':  height,
                            'data-tooltop':          (tooltip || ''),
                            'data-index':            i,
                            'data-sequential-index': this.sequentialIndex,
                            'data-value':            this.right[i],
                            filter: properties.shadow ? 'url(#dropShadow)' : ''
                        }
                    });

                    this.coords.push({
                        object:  this,
                        element: rect,
                        x:      parseFloat(rect.getAttribute('x')),
                        y:      parseFloat(rect.getAttribute('y')),
                        width:  parseFloat(rect.getAttribute('width')),
                        height: parseFloat(rect.getAttribute('height'))
                    });

                    this.coordsRight.push({
                        object:  this,
                        element: rect,
                        x:      parseFloat(rect.getAttribute('x')),
                        y:      parseFloat(rect.getAttribute('y')),
                        width:  parseFloat(rect.getAttribute('width')),
                        height: parseFloat(rect.getAttribute('height'))
                    });

                    this.installTooltipsEventListeners({
                        rect: rect,
                        index: i,
                        sequentialIndex: this.sequentialIndex
                    });
                    
                    this.sequentialIndex++;


                // RIGHT STACKED
                } else if (RGraph.SVG.isArray(this.right[i]) && properties.grouping === 'stacked') {


                    var accWidth = 0;

                    for (var j=0; j<this.right[i].length; ++j) {

                        var color    = properties.colors[this.sequentialIndex],
                            tooltip  = RGraph.SVG.isNull(properties.tooltips) ? null : properties.tooltips[this.sequentialIndex],
                            y        = properties.marginTop + ((this.graphHeight / this.right.length) * i) + properties.marginInner,
                            width    = this.getWidth(this.right[i][j]),
                            x        = properties.marginLeft + this.graphWidth + properties.marginCenter + accWidth,
                            accWidth = accWidth + width,
                            height   = (this.graphHeight / this.left.length) - properties.marginInner - properties.marginInner;








                        // If this is the first iteration of the loop and a shadow
                        // is requested draw a rect here to create it.
                        if (j === 0 && properties.shadow) {
                            
                            var shadowBackfaceX     = properties.marginLeft + this.graphWidth + properties.marginCenter,
                                shadowBackfaceWidth = this.getWidth(RGraph.SVG.arraySum(this.right[i]));
                                

                            var rect = RGraph.SVG.create({
                                svg: this.svg,
                                parent: this.svg.all,
                                type: 'rect',
                                attr: {
                                    fill: '#eee',
                                    x: shadowBackfaceX,
                                    y: y,
                                    width: shadowBackfaceWidth,
                                    height: height,
                                    'stroke-width': 0,
                                    'data-index': i,
                                    filter: 'url(#dropShadow)'
                                }
                            });
                            
                            this.stackedBackfacesRight[i] = rect;
                        }
















                        var rect = RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svg.all,
                            type: 'rect',
                            attr: {
                                x:                       x,
                                y:                       y,
                                width:                   width,
                                height:                  height,
                                fill:                    properties.colorsSequential ? properties.colors[this.sequentialIndex] : properties.colors[j],
                                stroke:                  properties.colorsStroke,
                                'stroke-width':          properties.linewidth,
                                'shape-rendering':       'crispEdges',
                                'data-original-x':       x,
                                'data-original-y':       y,
                                'data-original-width':   width,
                                'data-original-height':  height,
                                'data-tooltop':          (tooltip || ''),
                                'data-index':            i,
                                'data-subindex':         j,
                                'data-sequential-index': this.sequentialIndex,
                                'data-value':            this.right[i][j]
                            }
                        });









                        this.coords.push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });

                        this.coordsRight.push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });



                        if (!this.coords2[i + this.left.length]) {
                            this.coords2[i + this.left.length] = [];
                        }

                        if (!this.coords2Right[i]) {
                            this.coords2Right[i] = [];
                        }

                        this.coords2[i + this.left.length].push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });

                        this.coords2Right[i].push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });

                        this.installTooltipsEventListeners({
                            rect: rect,
                            index: i,
                            sequentialIndex: this.sequentialIndex
                        });

                        this.sequentialIndex++;
                    }













                // RIGHT GROUPED
                } else if (RGraph.SVG.isArray(this.right[i]) && properties.grouping === 'grouped') {

                    for (var j=0; j<this.right[i].length; ++j) {

                        var color    = properties.colors[this.sequentialIndex],
                            tooltip  = RGraph.SVG.isNull(properties.tooltips) ? null : properties.tooltips[this.sequentialIndex],
                            height   = ((this.graphHeight / this.right.length) - properties.marginInner - properties.marginInner - (properties.marginInnerGrouped * (this.right[i].length - 1))) / this.right[i].length,
                            y        = properties.marginTop + ((this.graphHeight / this.right.length) * i) + properties.marginInner + (height * j) + (j * properties.marginInnerGrouped),
                            width    = this.getWidth(this.right[i][j]),
                            x        = properties.marginLeft + this.graphWidth + properties.marginCenter;

            
                        var rect = RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svg.all,
                            type: 'rect',
                            attr: {
                                x:                      x,
                                y:                      y,
                                width:                  width,
                                height:                 height,
                                fill:                   properties.colorsSequential ? properties.colors[this.sequentialIndex] : properties.colors[j],
                                stroke:                 properties.colorsStroke,
                                'stroke-width':         properties.linewidth,
                                'shape-rendering':      'crispEdges',
                                'data-original-x':       x,
                                'data-original-y':       y,
                                'data-original-width':   width,
                                'data-original-height':  height,
                                'data-tooltop':          (tooltip || ''),
                                'data-index':            i,
                                'data-subindex':         j,
                                'data-sequential-index': this.sequentialIndex,
                                'data-value':            this.right[i][j],
                                filter: properties.shadow ? 'url(#dropShadow)' : ''
                            }
                        });









                        this.coords.push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });

                        this.coordsRight.push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });









                        if (!this.coords2[i + this.left.length]) {
                            this.coords2[i + this.left.length] = [];
                        }

                        if (!this.coords2Right[i]) {
                            this.coords2Right[i] = [];
                        }

                        this.coords2[i + this.left.length].push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });

                        this.coords2Right[i].push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });










                        this.installTooltipsEventListeners({
                            rect: rect,
                            index: i,
                            sequentialIndex: this.sequentialIndex
                        });

                        this.sequentialIndex++;
                    }
                }
            }
        };








        //
        // Installs the tooltips event lissteners. This is called from the
        // above function.
        //
        // @param object opt The various arguments to the function
        //
        this.installTooltipsEventListeners = function (opt)
        {
            var obj = this;

            // Add the tooltip events
            if (!RGraph.SVG.isNull(properties.tooltips) && (properties.tooltips[this.sequentialIndex] || typeof properties.tooltips === 'string') ) {
                //
                // Add tooltip event listeners
                //
                (function (idx, seq)
                {
                    opt.rect.addEventListener(properties.tooltipsEvent.replace(/^on/, ''), function (e)
                    {
                        obj.removeHighlight();

                        // Show the tooltip
                        RGraph.SVG.tooltip({
                            object:          obj,
                            index:           idx,
                            group:           null,
                            sequentialIndex: seq,
                            text:            typeof properties.tooltips === 'string' ? properties.tooltips : properties.tooltips[seq],
                            event:           e
                        });
                        
                        // Highlight the rect that has been clicked on
                        obj.highlight(e.target);
                    }, false);

                    opt.rect.addEventListener('mousemove', function (e)
                    {
                        e.target.style.cursor = 'pointer'
                    }, false);
                })(opt.index, opt.sequentialIndex);
            }
        };








        //
        // 
        // 
        // @param int value The value to get the width for.
        //
        this.getWidth = function (value)
        {
            var x1 = this.getLeftXCoord(0),
                x2 = this.getLeftXCoord(value);

            if (RGraph.SVG.isNull(x1) || RGraph.SVG.isNull(x2)) {
                return null;
            }

            return x1 - x2;
        };








        //
        // This function is similar to the above but instead 
        // of a width it gets a relevant coord for a value
        // on the LEFT side
        // 
        // @param int value The value to get the coordinate for.
        //
        this.getLeftXCoord = function (value)
        {
            var width;

            if (value > this.scale.max) {
                return null;
            }

            if (value < this.scale.min) {
                return null;
            }

            width  = ((value - this.scale.min) / (this.scale.max - this.scale.min));
            width *= this.graphWidth;
            
            // Calculate the X coord
            var x  = properties.marginLeft + this.graphWidth - width;

            return x;
        };








        //
        // This function gets an X coordinate for the RIGHT
        // side.
        // 
        // @param int value The value to get the coordinate for.
        //
        this.getRightXCoord = function (value)
        {
            var width;

            if (value > this.scale.max) {
                return null;
            }

            if (value < this.scale.min) {
                return null;
            }

            width  = ((value - this.scale.min) / (this.scale.max - this.scale.min));
            width *= this.graphWidth;
            
            // Calculate the X coord
            var x  = properties.marginLeft + this.graphWidth + properties.marginCenter + width;

            return x;
        };








        //
        // This function can be used to highlight a bar on the chart
        // 
        // @param object rect The rectangle to highlight
        //
        this.highlight = function (rect)
        {
            var x      = parseInt(rect.getAttribute('x')),
                y      = parseInt(rect.getAttribute('y')),
                width  = parseInt(rect.getAttribute('width')),
                height = parseInt(rect.getAttribute('height'));

            var highlight = RGraph.SVG.create({
                svg: this.svg,
                parent: this.svg.all,
                type: 'rect',
                attr: {
                    'stroke-width': properties.highlightLinewidth,
                    stroke:         properties.highlightStroke,
                    fill:           properties.highlightFill,
                    x:              x - 1,
                    y:              y - 1,
                    width:          width + 2,
                    height:         height + 2
                },
                style: {
                    pointerEvents: 'none'
                }
            });


            // Store the highlight rect in the rebistry so
            // it can be cleared later
            RGraph.SVG.REG.set('highlight', highlight);
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function () 
        {
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

            if (colors) {
                for (var i=0; i<colors.length; ++i) {
                    colors[i] = RGraph.SVG.parseColorLinear({
                        object: this,
                        color: colors[i],
                        direction: 'horizontal'
                    });
                }
            }

            properties.backgroundGridColor = RGraph.SVG.parseColorLinear({object: this, color: properties.backgroundGridColor,direction:'horizontal'});
            properties.highlightFill       = RGraph.SVG.parseColorLinear({object: this, color: properties.highlightFill,direction:'horizontal'});
            properties.backgroundColor     = RGraph.SVG.parseColorLinear({object: this, color: properties.backgroundColor,direction:'horizontal'});
        };








        //
        // Draws the labelsAbove
        //
        this.drawLabelsAbove = function ()
        {
            // Go through the above labels
            if (properties.labelsAbove) {

                //var data_seq      = RGraph.SVG.arrayLinearize(this.data),
                //    seq           = 0,
                //    stacked_total = 0;
                
                // Get the text configuration
                var textConf = RGraph.SVG.getTextConf({
                    object: this,
                    prefix: 'labelsAbove'
                });

                for (var dataset=0,seq=0; dataset<this.data.length; ++dataset,++seq) {
                    for (var i=0; i<this.data[dataset].length; ++i,++seq) {

                        var value   = this.data[dataset][i],
                            halign  = dataset === 0 ? 'right' : 'left',
                            valign  = 'center',
                            hoffset = dataset === 0 ? -10 : 10;

                        // REGULAR CHART
                        if (typeof value === 'number') {

                            if (this.coords[seq]) {

                                var x      = parseInt(this.coords[seq].element.getAttribute('x')) + hoffset + properties.labelsAboveOffsetx;
                                var height = parseInt(this.coords[seq].element.getAttribute('height'));
                                var y      = parseInt(this.coords[seq].element.getAttribute('y')) + (height / 2) + properties.labelsAboveOffsety;
                                var width  = parseInt(this.coords[seq].element.getAttribute('width'));

                                // If the dataset is the RHS (which would equal )
                                // then set the alignment appropriately
                                if (dataset === 1) {
                                    x += width;
                                }
    
                                var str = RGraph.SVG.numberFormat({
                                    object:    this,
                                    num:       value.toFixed(properties.labelsAboveDecimals),
                                    prepend:   typeof properties.labelsAboveUnitsPre  === 'string'   ? properties.labelsAboveUnitsPre  : null,
                                    append:    typeof properties.labelsAboveUnitsPost === 'string'   ? properties.labelsAboveUnitsPost : null,
                                    point:     typeof properties.labelsAbovePoint     === 'string'   ? properties.labelsAbovePoint     : null,
                                    thousand:  typeof properties.labelsAboveThousand  === 'string'   ? properties.labelsAboveThousand  : null,
                                    formatter: typeof properties.labelsAboveFormatter === 'function' ? properties.labelsAboveFormatter : null
                                });
    
    
                                // Facilitate labelsAboveSpecific
                                if (properties.labelsAboveSpecific && properties.labelsAboveSpecific.length && (typeof properties.labelsAboveSpecific[seq] === 'string' || typeof properties.labelsAboveSpecific[seq] === 'number') ) {
                                    str = String(properties.labelsAboveSpecific[seq]);
                                } else if ( properties.labelsAboveSpecific && properties.labelsAboveSpecific.length && typeof properties.labelsAboveSpecific[seq] !== 'string' && typeof properties.labelsAboveSpecific[seq] !== 'number') {
                                    continue;
                                }
        
                                // Add the text to the SVG
                                RGraph.SVG.text({

                                    object:     this,
                                    parent:     this.svg.all,
                                    tag:        'labels.above',

                                    text:       str,

                                    x:          x,
                                    y:          y,

                                    halign:     halign,
                                    valign:     valign,

                                    font:       textConf.font,
                                    size:       textConf.size,
                                    bold:       textConf.bold,
                                    italic:     textConf.italic,
                                    color:      textConf.color,

                                    background: properties.labelsAboveBackground,
                                    padding:    properties.labelsAboveBackgroundPadding
                                });
                            }














                        // STACKED CHART
                        } else if (!RGraph.SVG.isNull(value) && typeof value === 'object' && properties.grouping === 'stacked') {

                            for (var k=0,sum=0,width=0; k<this.coords2[seq].length; ++k) {
                                sum += parseFloat(this.coords2[seq][k].element.getAttribute('data-value'));
                            }

                            var len =this.coords2[seq].length;

                            if (dataset === 0) {
                                var x      = parseFloat(this.coords2[seq][len - 1].x) + hoffset,
                                    height = parseFloat(this.coords2[seq][len - 1].height),
                                    y      = parseFloat(this.coords2[seq][0].y) + (height / 2);
                            } else {
                                var x      = parseFloat(this.coords2[this.data[0].length + i][0].x) + hoffset + properties.labelsAboveOffsetx,
                                    height = parseFloat(this.coords2[seq][len - 1].height),
                                    y      = parseFloat(this.coords2[seq][0].y) + (height / 2) + properties.labelsAboveOffsety;

                                // Work out the total width by summing all the individual widths

                                for (var j=0; j<this.coords2Right[i].length; ++j) {
                                    x += this.coords2Right[i][j].width;
                                }
                            }

                            var str = RGraph.SVG.numberFormat({
                                object:    this,
                                num:       sum.toFixed(properties.labelsAboveDecimals),
                                prepend:   typeof properties.labelsAboveUnitsPre  === 'string'   ? properties.labelsAboveUnitsPre  : null,
                                append:    typeof properties.labelsAboveUnitsPost === 'string'   ? properties.labelsAboveUnitsPost : null,
                                point:     typeof properties.labelsAbovePoint     === 'string'   ? properties.labelsAbovePoint     : null,
                                thousand:  typeof properties.labelsAboveThousand  === 'string'   ? properties.labelsAboveThousand  : null,
                                formatter: typeof properties.labelsAboveFormatter === 'function' ? properties.labelsAboveFormatter : null
                            });

                            // Facilitate labelsAboveSpecific
                            if (properties.labelsAboveSpecific && properties.labelsAboveSpecific.length && (typeof properties.labelsAboveSpecific[seq] === 'string' || typeof properties.labelsAboveSpecific[seq] === 'number') ) {
                                str = String(properties.labelsAboveSpecific[seq]);
                            } else if ( properties.labelsAboveSpecific && properties.labelsAboveSpecific.length && typeof properties.labelsAboveSpecific[seq] !== 'string' && typeof properties.labelsAboveSpecific[seq] !== 'number') {
                                continue;
                            }
    
                            // Add the text to the SVG
                            RGraph.SVG.text({
                                
                                object:     this,
                                parent:     this.svg.all,
                                tag:        'labels.above',
                                
                                text:       str,
                                
                                x:          x,
                                y:          y,
                                
                                halign:     halign,
                                valign:     valign,

                                font:       textConf.font,
                                size:       textConf.size,
                                bold:       textConf.bold,
                                italic:     textConf.italic,
                                color:      textConf.color,
                                
                                background: properties.labelsAboveBackground,
                                padding:    properties.labelsAboveBackgroundPadding
                            });


















                        // GROUPED CHART
                        } else if (!RGraph.SVG.isNull(value) && typeof value === 'object' && properties.grouping === 'grouped') {

                            for (var k=0; k<value.length; ++k) {
                            
                                val = value[k];
                                
                                if (typeof val !== 'number') {
                                    val = '';
                                }


                                var x      = parseInt(this.coords[seq].element.getAttribute('x')) + hoffset + properties.labelsAboveOffsetx,
                                    height = parseInt(this.coords[seq].element.getAttribute('height')),
                                    y      = parseInt(this.coords[seq].element.getAttribute('y')) + (height / 2) + properties.labelsAboveOffsety,
                                    width  = parseInt(this.coords[seq].element.getAttribute('width'));
                                
                                // If the dataset is the RHS (which would equal )
                                // then set the alignment appropriately
                                if (dataset === 1) {
                                    x += width;
                                }

                                var str = RGraph.SVG.numberFormat({
                                    object:    this,
                                    num:       parseFloat(val).toFixed(properties.labelsAboveDecimals),
                                    prepend:   typeof properties.labelsAboveUnitsPre  === 'string'   ? properties.labelsAboveUnitsPre  : null,
                                    append:    typeof properties.labelsAboveUnitsPost === 'string'   ? properties.labelsAboveUnitsPost : null,
                                    point:     typeof properties.labelsAbovePoint     === 'string'   ? properties.labelsAbovePoint     : null,
                                    thousand:  typeof properties.labelsAboveThousand  === 'string'   ? properties.labelsAboveThousand  : null,
                                    formatter: typeof properties.labelsAboveFormatter === 'function' ? properties.labelsAboveFormatter : null
                                });

                                if (val === 0 || RGraph.SVG.isNull(val) || val === '') {                                    
                                    str = '';
                                }

                                // Facilitate labelsAboveSpecific
                                if (properties.labelsAboveSpecific && properties.labelsAboveSpecific.length && (typeof properties.labelsAboveSpecific[seq] === 'string' || typeof properties.labelsAboveSpecific[seq] === 'number') ) {
                                    str = String(properties.labelsAboveSpecific[seq]);
                                } else if ( properties.labelsAboveSpecific && properties.labelsAboveSpecific.length && typeof properties.labelsAboveSpecific[seq] !== 'string' && typeof properties.labelsAboveSpecific[seq] !== 'number') {
                                    continue;
                                }

                                // Add the text to the SVG
                                RGraph.SVG.text({
                                    
                                    object:     this,
                                    parent:     this.svg.all,
                                    tag:        'labels.above',

                                    text:       str,

                                    x:          x,
                                    y:          y,

                                    halign:     halign,
                                    valign:     valign,

                                    font:       textConf.font,
                                    size:       textConf.size,
                                    bold:       textConf.bold,
                                    italic:     textConf.italic,
                                    color:      textConf.color,

                                    background: properties.labelsAboveBackground,
                                    padding:    properties.labelsAboveBackgroundPadding
                                });
                                
                                seq++;
                            }
                            
                            seq--;
                        } else if (RGraph.SVG.isNull(value)) {
                            --seq;
                        }
                    }

                    --seq;
                }
            }
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
            if (highlight && highlight.parentNode) {
                highlight.parentNode.removeChild(highlight);
            }
            
            RGraph.SVG.REG.set('highlight', null);
        };








        //
        // Calulate the center gutter size
        //
        this.getMarginCenter =
        this.getGutterCenter = function ()
        {
            var bold  = typeof properties.yaxisLabelsBold === 'boolean' ? properties.yaxisLabelsBold : properties.textBold,
                font  = typeof properties.yaxisLabelsFont === 'string'  ? properties.yaxisLabelsFont : properties.textFont,
                size  = typeof properties.yaxisLabelsSize === 'number'  ? properties.yaxisLabelsSize : properties.textSize,
                width = 0;

            // Loop through the labels measuring them
            if (properties.yaxisLabels) {

                for (var i=0,len=properties.yaxisLabels.length; i<len; ++i) {

                    width = Math.max(width, RGraph.SVG.measureText({
                        text: properties.yaxisLabels[i],
                        bold: bold,
                        font: font,
                        size: size
                    })[0]);

                }
            } else {
                var width = 50;
            }

            return width + 15;
        };








        //
        // Draw the title
        //
        this.drawTitle = function ()
        {
            // Taken out on 16th Sep 2019 to accommodate responsive()ness. Setting the titleX
            // property was causing the smaller charts to rtain the larger charts titleX
            //position

            //if (RGraph.SVG.isNull(properties.titleX)) {
            //    properties.titleX = ((this.width - properties.marginLeft - properties.marginRight) / 2) + properties.marginLeft;
            //}

            RGraph.SVG.drawTitle(this);
        };







        //
        // The Bar chart grow effect
        //
        this.grow = function ()
        {
            var opt      = arguments[0] || {},
                frames   = opt.frames || 30,
                frame    = 0,
                obj      = this,
                left     = RGraph.SVG.arrayClone(this.left),
                right    = RGraph.SVG.arrayClone(this.right),
                seq      = 0;

            this.draw();

            var iterate = function ()
            {
                // LOOP THROUGH THE LEFT DATA
                for (var i=0,seq=0,len=obj.coordsLeft.length; i<len; ++i, ++seq) {

                    var   multiplier = (frame / frames)
                        // RGraph.SVG.FX.getEasingMultiplier(frames, frame)
                        // RGraph.SVG.FX.getEasingMultiplier(frames, frame);
                
                


                    // The main loop through the data
                    // LEFT REGULAR
                    if (typeof left[i] === 'number') {

                        width   = Math.abs(obj.getLeftXCoord(left[i]) - obj.getLeftXCoord(0));
                        left[i] = obj.left[i] * multiplier;

                        // Set the new height on the rect
                        obj.coordsLeft[i].element.setAttribute(
                            'width',
                            width
                        );

                        // Set the correct Y coord on the object
                        obj.coords[seq].element.setAttribute(
                            'x',
                            obj.getLeftXCoord(0) - width
                        );





                    // LEFT STACKED
                    } else if (typeof left[i] === 'object' && properties.grouping === 'stacked') {

                        var accumulativeWidth = 0;

                        for (var j=0,len2=left[i].length; j<len2; ++j, ++seq) {

                            width      = Math.abs(obj.getLeftXCoord(left[i][j]) - obj.getLeftXCoord(0));
                            left[i][j] = obj.left[i][j] * multiplier;

                            obj.coords[seq].element.setAttribute(
                                'width',
                                width
                            );

                            obj.coords[seq].element.setAttribute(
                                'x',
                                obj.getLeftXCoord(0) - width - accumulativeWidth
                            );

                            accumulativeWidth += (properties.grouping === 'stacked' ? width : 0);
                        }



                        //
                        // Set the width and X coord of the backfaces
                        //
                        if (obj.stackedBackfacesLeft[i]) {
                            obj.stackedBackfacesLeft[i].setAttribute(
                                'width',
                                accumulativeWidth
                            );
    
                            obj.stackedBackfacesLeft[i].setAttribute(
                                'x',
                                obj.getLeftXCoord(0) - accumulativeWidth
                            );
                        }

                        // Decrease seq by one so that it's not incremented twice
                        --seq;

                    // LEFT GROUPED
                    } else if (typeof left[i] === 'object' && properties.grouping === 'grouped') {

                        // Loop thru the group
                        for (var j=0,len2=left[i].length; j<len2; ++j, ++seq) {

                            width      = Math.abs(obj.getLeftXCoord(left[i][j]) - obj.getLeftXCoord(0));
                            left[i][j] = obj.left[i][j] * multiplier;

                            obj.coords[seq].element.setAttribute(
                                'width',
                                width
                            );

                            obj.coords[seq].element.setAttribute(
                                'x',
                                obj.getLeftXCoord(0) - width
                            );
                        }

                        // Decrease seq by one so that it's not incremented twice
                        --seq;
                    }
                }









                // LOOP THROUGH THE RIGHT DATA
                for (var i=0,seq=0,len=obj.coordsRight.length; i<len; ++i, ++seq) {

                    var   multiplier = (frame / frames)
                        // RGraph.SVG.FX.getEasingMultiplier(frames, frame)
                        // RGraph.SVG.FX.getEasingMultiplier(frames, frame);
                
                


                    // The main loop through the data
                    // RIGHT REGULAR
                    if (typeof right[i] === 'number') {

                        width    = Math.abs(obj.getRightXCoord(right[i]) - obj.getRightXCoord(0));
                        right[i] = obj.right[i] * multiplier;

                        // Set the new height on the rect
                        obj.coordsRight[i].element.setAttribute(
                            'width',
                            width
                        );

                        // Set the correct Y coord on the object
                        obj.coordsRight[seq].element.setAttribute(
                            'x',
                            obj.getRightXCoord(0)
                        );





                    // RIGHT STACKED
                    } else if (typeof right[i] === 'object' && properties.grouping === 'stacked') {

                        var accumulativeWidth = 0;

                        for (var j=0,len2=right[i].length; j<len2; ++j, ++seq) {

                            width      = Math.abs(obj.getRightXCoord(right[i][j]) - obj.getRightXCoord(0));
                            right[i][j] = obj.right[i][j] * multiplier;

                            obj.coordsRight[seq].element.setAttribute(
                                'width',
                                width
                            );

                            obj.coordsRight[seq].element.setAttribute(
                                'x',
                                obj.getRightXCoord(0) + accumulativeWidth
                            );

                            accumulativeWidth += width;
                        }



                        //
                        // Set the width and X coord of the backfaces
                        //
                        if (obj.stackedBackfacesRight[i]) {
                            obj.stackedBackfacesRight[i].setAttribute(
                                'width',
                                accumulativeWidth
                            );
    
                            obj.stackedBackfacesRight[i].setAttribute(
                                'x',
                                obj.getRightXCoord(0)
                            );
                        }

                        // Decrease seq by one so that it's not incremented twice
                        --seq;

                    // RIGHT GROUPED
                    } else if (typeof right[i] === 'object' && properties.grouping === 'grouped') {

                        // Loop thru the group
                        for (var j=0,len2=right[i].length; j<len2; ++j, ++seq) {

                            width      = Math.abs(obj.getRightXCoord(right[i][j]) - obj.getRightXCoord(0));
                            right[i][j] = obj.right[i][j] * multiplier;

                            obj.coordsRight[seq].element.setAttribute(
                                'width',
                                width
                            );

                            obj.coordsRight[seq].element.setAttribute(
                                'x',
                                obj.getRightXCoord(0)
                            );
                        }

                        // Decrease seq by one so that it's not incremented twice
                        --seq;
                    }
                }







                if (frame++ <= frames) {
                    RGraph.SVG.FX.update(iterate);
                } else if (opt.callback) {
                    (opt.callback)(obj);
                }
            };

            iterate();
            
            return this;
        };








        //
        // HBar chart Wave effect.
        // 
        // @param object OPTIONAL An object map of options. You specify 'frames'
        //                        here to give the number of frames in the effect
        //                        and also callback to specify a callback function
        //                        thats called at the end of the effect
        //
        this.wave = function ()
        {
            var obj                   = this,
                opt                   = arguments[0] || {},
                frames                = opt.frames || 120,
                startFrames_left      = [],
                startFrames_right     = [],
                counters_left         = [],
                counters_right        = [];

            var framesperbar    = frames / 3,
                frame_left      = -1,
                frame_right     = -1,
                callback        = arguments[1] || function () {},
                original_left   = RGraph.SVG.arrayClone(this.left),
                original_right  = RGraph.SVG.arrayClone(this.right);

            for (var i=0,len=this.left.length,seq=0; i<len; i+=1,++seq) {

                startFrames_left[seq]  = ((frames / 3) / (RGraph.SVG.arrayLinearize(this.left).length - 1)) * i;
                startFrames_right[seq] = ((frames / 3) / (RGraph.SVG.arrayLinearize(this.right).length - 1)) * i;
                counters_left[seq]     = 0;
                counters_right[seq]    = 0;

                if (RGraph.SVG.isArray(this.left[i])) {
                    for (var j=0; j<this.left[i].length; ++j,seq++) {
                        startFrames_left[seq]  = ((frames / 3) / (RGraph.SVG.arrayLinearize(this.left).length - 1)) * seq;
                        startFrames_right[seq] = ((frames / 3) / (RGraph.SVG.arrayLinearize(this.right).length - 1)) * seq;
                        counters_left[seq]     = 0;
                        counters_right[seq]    = 0;
                    }
                    
                    --seq;
                }
            }




            // This stops the chart from jumping
            this.draw();


            // Zero all of the data and set all of the rect widths to zero
            for (var i=0,len=this.left.length; i<len; i+=1) {
                if (typeof this.left[i] === 'number') {
                    this.left[i]  = 0;
                    this.right[i] = 0;

                    if (this.coordsLeft[i] && this.coordsLeft[i].element) this.coordsLeft[i].element.setAttribute('width', 0);
                    if (this.coordsRight[i] && this.coordsRight[i].element) this.coordsRight[i].element.setAttribute('width', 0);

                } else if (typeof this.left[i] === 'object' && !RGraph.SVG.isNull(this.left[i])) {
                    for (var j=0; j<this.left[i].length; ++j) {
                        this.left[i][j]  = 0;
                        this.right[i][j] = 0;
                        this.coords2Left[i][j].element.setAttribute('width', 0);
                        this.coords2Right[i][j].element.setAttribute('width', 0);
                    }
                }
            }

            //
            // Iterate over the left side
            //
            function iteratorLeft ()
            {
                ++frame_left;

                for (var i=0,len=obj.left.length,seq=0; i<len; i+=1,seq+=1) {

                    if (frame_left >= startFrames_left[seq]) {

                        var isNull = RGraph.SVG.isNull(obj.left[i]);

                        // Regular bars
                        if (typeof obj.left[i] === 'number') {
                            
                            obj.left[i] = Math.min(
                                Math.abs(original_left[i]),
                                Math.abs(original_left[i] * ( (counters_left[i]++) / framesperbar))
                            );
                            
                            var rect_left = obj.coords[i].element;
                            
                            rect_left.setAttribute(
                                'width',
                                parseFloat(rect_left.getAttribute('data-original-width')) * (obj.left[i] / rect_left.getAttribute('data-value'))
                            );
                            
                            rect_left.setAttribute(
                                'x',
                                obj.properties.marginLeft + obj.graphWidth - (parseFloat(rect_left.getAttribute('data-original-width')) * (obj.left[i] / rect_left.getAttribute('data-value')))
                            );


                        // Stacked or grouped bars
                        } else if (RGraph.SVG.isArray(obj.left[i])) {

                            for (var j=0,accWidth=0; j<obj.left[i].length; ++j,++seq) {

                                obj.left[i][j] = Math.min(
                                    Math.abs(original_left[i][j]),
                                    Math.abs(original_left[i][j] * ( (counters_left[seq]++) / framesperbar))
                                );

                                var rect_left = obj.coords[seq].element;

                                rect_left.setAttribute(
                                    'width',
                                    parseFloat(rect_left.getAttribute('data-original-width')) * (obj.left[i][j] / rect_left.getAttribute('data-value'))
                                );

                                rect_left.setAttribute(
                                    'x',
                                    obj.properties.marginLeft + obj.graphWidth - (parseFloat(rect_left.getAttribute('data-original-width')) * (obj.left[i][j] / rect_left.getAttribute('data-value'))) - accWidth
                                );
                                
                                // Only update this for stacked charts
                                if (obj.properties.grouping === 'stacked') {
                                    accWidth += parseFloat(rect_left.getAttribute('width'));
                                }
                            }
                            
                            seq--;
                        }
                            
                        if (isNull) {
                            obj.left[i] = null;
                        }
                    } else {
                        obj.left[i] = typeof obj.left[i] === 'object' && obj.left[i] ? RGraph.SVG.arrayPad([], obj.left[i].length, 0) : (RGraph.SVG.isNull(obj.left[i]) ? null : 0);
                    }
                }


                // No callback here - only called by the right function
                if (frame_left <= frames) {
                    RGraph.SVG.FX.update(iteratorLeft);
                }
            }












            //
            // Iterate over the right side
            //
            function iteratorRight ()
            {
                ++frame_right;

                for (var i=0,len=obj.right.length,seq=0; i<len; i+=1,seq+=1) {

                    if (frame_right >= startFrames_right[seq]) {

                        var isNull = RGraph.SVG.isNull(obj.right[i]);

                        // Regular bars
                        if (typeof obj.right[i] === 'number') {

                            obj.right[i] = Math.min(
                                Math.abs(original_right[i]),
                                Math.abs(original_right[i] * ( (counters_right[i]++) / framesperbar))
                            );

                            var rect_right = obj.coords[i + obj.left.length].element;

                            rect_right.setAttribute(
                                'width',
                                parseFloat(rect_right.getAttribute('data-original-width')) * (obj.right[i] / rect_right.getAttribute('data-value'))
                            );
                            
                            rect_right.setAttribute(
                                'x',
                                obj.properties.marginLeft + obj.graphWidth + properties.marginCenter
                            );

                        // Stacked or grouped bars
                        } else if (RGraph.SVG.isArray(obj.right[i])) {

                            for (var j=0,accWidth=0; j<obj.right[i].length; ++j,++seq) {

                                obj.right[i][j] = Math.min(
                                    Math.abs(original_right[i][j]),
                                    Math.abs(original_right[i][j] * ( (counters_right[seq]++) / framesperbar))
                                );

                                var rect_right = obj.coordsRight[seq].element;

                                rect_right.setAttribute(
                                    'width',
                                    parseFloat(rect_right.getAttribute('data-original-width')) * (obj.right[i][j] / rect_right.getAttribute('data-value'))
                                );

                                rect_right.setAttribute(
                                    'x',
                                    obj.properties.marginLeft + obj.graphWidth + properties.marginCenter + accWidth
                                );


                                
                                // Only update this for stacked charts
                                if (obj.properties.grouping === 'stacked') {
                                    accWidth += parseFloat(rect_right.getAttribute('width'));
                                }
                            }
                            
                            seq--;
                        }
                            
                        if (isNull) {
                            obj.right[i] = null;
                        }
                    } else {
                        obj.right[i] = typeof obj.right[i] === 'object' && obj.right[i] ? RGraph.SVG.arrayPad([], obj.right[i].length, 0) : (RGraph.SVG.isNull(obj.right[i]) ? null : 0);
                    }
                }


                // Call the callback if necessary
                if (frame_right <= frames) {
                    RGraph.SVG.FX.update(iteratorRight);
                } else {
                    // Fini - call the callback
                }
            }



            iteratorLeft();
            iteratorRight();

            return this;
        };









        //
        // A worker function that handles Bipolar chart specific tooltip substitutions
        //
        this.tooltipSubstitutions = function (opt)
        {
            var indexes        = RGraph.SVG.sequentialIndexToGrouped(opt.index, this.data);
            var linear_indexes = RGraph.SVG.sequentialIndexToGrouped(opt.index, this.data_arr);

            return {
                  index: linear_indexes[1],
                dataset: linear_indexes[0],
               dataset2: linear_indexes[0] >= this.left.length ? linear_indexes[0] - this.left.length : linear_indexes[0],
        sequentialIndex: opt.index,
                  value: typeof this.data_arr[linear_indexes[0]] === 'number'
                            ? this.data_arr[linear_indexes[0]]
                            : this.data_arr[linear_indexes[0]][linear_indexes[1]],
                 values: typeof this.data_arr[linear_indexes[0]] === 'number'
                            ? [this.data_arr[linear_indexes[0]]]
                            : this.data_arr[linear_indexes[0]]
            };
        };








        //
        // A worker function that returns the correct color/label/value
        //
        // @param object specific The indexes that are applicable
        // @param number index    The appropriate index
        //
        this.tooltipsFormattedCustom = function (specific, index)
        {
            var side = ((specific.dataset + 1) > this.left.length) ? 'right' : 'left';

            var color = (!RGraph.SVG.isNull(properties.tooltipsFormattedKeyColors) && typeof properties.tooltipsFormattedKeyColors === 'object' && properties.tooltipsFormattedKeyColors[index])
                            ? properties.tooltipsFormattedKeyColors[index]
                            : properties.colors[index];

            if (typeof this[side][specific.dataset2] === 'object') {

                var label = (!RGraph.SVG.isNull(properties.tooltipsFormattedKeyLabels) && typeof properties.tooltipsFormattedKeyLabels === 'object' && properties.tooltipsFormattedKeyLabels[index])
                                ? properties.tooltipsFormattedKeyLabels[index]
                                : '';
            } else {
                var label = (!RGraph.SVG.isNull(properties.tooltipsFormattedKeyLabels) && typeof properties.tooltipsFormattedKeyLabels === 'object' && properties.tooltipsFormattedKeyLabels[specific.dataset2])
                                ? properties.tooltipsFormattedKeyLabels[specific.dataset2]
                                : '';
            }

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
                  svgXY[0]                       // The X coordinate of the canvas
                + coords.x                       // The X coordinate of the bar on the chart
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
                + (coords.width / 2)                // Add half of the bar width
            ) + 'px';

            args.tooltip.style.top  = (
                  svgXY[1]                       // The Y coordinate of the canvas
                + coords.y                      // The Y coordinate of the bar on the chart
                - tooltip.offsetHeight           // The height of the tooltip
                - 10                             // An arbitrary amount
            ) + 'px';
        };








        //
        // Set the options that the user has provided
        //
        for (i in conf.options) {
            if (typeof i === 'string') {
                this.set(i, conf.options[i]);
            }
        }
    };
            
    return this;

// End module pattern
})(window, document);