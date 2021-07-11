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
    RGraph.SVG.Bar = function (conf)
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








        this.id               = conf.id;
        this.uid              = RGraph.SVG.createUID();
        this.container        = document.getElementById(this.id);
        this.layers           = {}; // MUST be before the SVG tag is created!
        this.svg              = RGraph.SVG.createSVG({object: this,container: this.container});
        this.isRGraph         = true;
        this.isrgraph         = true;
        this.rgraph           = true;
        this.data             = conf.data;
        this.type             = 'bar';
        this.coords           = [];
        this.coords2          = [];
        this.stackedBackfaces = [];
        this.originalColors   = {};
        this.gradientCounter  = 1;



        // Convert strings to numbers
        this.data = RGraph.SVG.stringsToNumbers(this.data);




        // Add this object to the ObjectRegistry
        RGraph.SVG.OR.add(this);
        
        this.container.style.display = 'inline-block';

        this.properties =
        {
            marginLeft:   35,
            marginRight:  35,
            marginTop:    35,
            marginBottom: 35,
            
            variant:          null,
            variant3dOffsetx: 10,
            variant3dOffsety: 5,

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
            
            // 20 colors. If you need more you need to set the colors property
            colors: [
                'red', '#0f0', '#00f', '#ff0', '#0ff', '#0f0','pink','orange','gray','black',
                'red', '#0f0', '#00f', '#ff0', '#0ff', '#0f0','pink','orange','gray','black'
            ],
            colorsSequential:     false,
            colorsStroke:         'rgba(0,0,0,0)',
            
            errorbars:            null,
            
            marginInner:          3,
            marginInnerGrouped:   2,
            marginInnerLeft:      0,
            marginInnerRight:     0,

            yaxis:                true,
            yaxisTickmarks:       true,
            yaxisTickmarksLength: 3,
            yaxisColor:           'black',
            yaxisScale:           true,
            yaxisLabels:          null,
            yaxisLabelsFont:      null,
            yaxisLabelsSize:      null,
            yaxisLabelsColor:     null,
            yaxisLabelsBold:      null,
            yaxisLabelsItalic:    null,
            yaxisLabelsOffsetx:   0,
            yaxisLabelsOffsety:   0,
            yaxisLabelsCount:     5,
            yaxisScaleUnitsPre:   '',
            yaxisScaleUnitsPost:  '',
            yaxisScaleStrict:     false,
            yaxisScaleDecimals:   0,
            yaxisScalePoint:      '.',
            yaxisScaleThousand:   ',',
            yaxisScaleRound:      false,
            yaxisScaleMax:        null,
            yaxisScaleMin:        0,
            yaxisScaleFormatter:  null,
            yaxisTitle:           '',
            yaxisTitleBold:       null,
            yaxisTitleSize:       null,
            yaxisTitleFont:       null,
            yaxisTitleColor:      null,
            yaxisTitleItalic:     null,
            yaxisTitleOffsetx:    0,
            yaxisTitleOffsety:    0,
            yaxisTitleX:          null,
            yaxisTitleY:          null,
            yaxisTitleHalign:     null,
            yaxisTitleValign:     null,

            xaxis:                true,
            xaxisTickmarks:       true,
            xaxisTickmarksLength: 5,
            xaxisLabels:          null,
            xaxisLabelsFont:      null,
            xaxisLabelsSize:      null,
            xaxisLabelsColor:     null,
            xaxisLabelsBold:      null,
            xaxisLabelsItalic:    null,
            xaxisLabelsPosition:  'section',
            xaxisLabelsPositionSectionTickmarksCount: null,
            xaxisLabelsOffsetx:   0,
            xaxisLabelsOffsety:   0,
            xaxisColor:           'black',
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
            labelsAboveHalign:            'center',
            labelsAboveValign:            'bottom',
            labelsAboveSpecific:          null,
            
            textColor:            'black',
            textFont:             'Arial, Verdana, sans-serif',
            textSize:             12,
            textBold:             false,
            textItalic:           false,

            linewidth:            1,
            grouping:             'grouped',
            
            tooltips:                        null,
            tooltipsOverride:                null,
            tooltipsEffect:                  'fade',
            tooltipsCssClass:                'RGraph_tooltip',
            tooltipsCss:                     null,
            tooltipsEvent:                   'click',
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
            //titleValign:          null,
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
            
            shadow:               false,
            shadowOffsetx:        2,
            shadowOffsety:        2,
            shadowBlur:           2,
            shadowOpacity:        0.25,
            
            errorbars:            null,
            errorbarsColor:       'black',
            errorbarsLinewidth:   1,
            errorbarsCapwidth:    10,

            key:            null,
            keyColors:      null,
            keyOffsetx:     0,
            keyOffsety:     0,
            keyLabelsOffsetx: 0,
            keyLabelsOffsety: -1,
            keyLabelsColor:   null,
            keyLabelsSize:    null,
            keyLabelsBold:    null,
            keyLabelsItalic:  null,
            keyLabelsFont:    null
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






        // A shortcut
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


            // Zero these if the 3D effect is not wanted
            if (properties.variant !== '3d') {
                properties.variant3dOffsetx = 0;
                properties.variant3dOffsety = 0;

            } else {

                // Set the skew transform on the all group if necessary
                this.svg.all.setAttribute('transform', 'skewY(5)');
            }



            // Create the defs tag if necessary
            RGraph.SVG.createDefs(this);

            





            // Reset the coords array
            this.coords  = [];
            this.coords2 = [];


            this.graphWidth  = this.width - properties.marginLeft - properties.marginRight;
            this.graphHeight = this.height - properties.marginTop - properties.marginBottom;















            // Make the data sequential first
            this.data_seq = RGraph.SVG.arrayLinearize(this.data);

            // This allows the errorbars to be a variety of formats and convert
            // them all into an array of objects which have the min and max
            // properties set
            if (properties.errorbars) {
                // Go through the error bars and convert numbers to objects
                for (var i=0; i<this.data_seq.length; ++i) {
    
                    if (typeof properties.errorbars[i] === 'undefined' || RGraph.SVG.isNull(properties.errorbars[i]) ) {
                        properties.errorbars[i] = {max: null, min: null};
                    
                    } else if (typeof properties.errorbars[i] === 'number') {
                        properties.errorbars[i] = {
                            min: properties.errorbars[i],
                            max: properties.errorbars[i]
                        };
                    
                    // Max is undefined
                    } else if (typeof properties.errorbars[i] === 'object' && typeof properties.errorbars[i].max === 'undefined') {
                        properties.errorbars[i].max = null;
                    
                    // Min is not defined
                    } else if (typeof properties.errorbars[i] === 'object' && typeof properties.errorbars[i].min === 'undefined') {
                        properties.errorbars[i].min = null;
                    }
                }
            }










            //
            // Parse the colors. This allows for simple gradient syntax
            //

            // Parse the colors for gradients
            RGraph.SVG.resetColorsToOriginalValues({object:this});
            this.parseColors();



            // Go through the data and work out the maximum value
            // This now also accounts for errorbars
            var values = [];

            for (var i=0,max=0; i<this.data.length; ++i) {
                
                // Errorbars affect the max value
                if (properties.errorbars && typeof properties.errorbars[i] === 'number') {
                    var errorbar = properties.errorbars[i];
                } else if (properties.errorbars && typeof properties.errorbars[i] === 'object' && typeof  properties.errorbars[i].max === 'number') {
                    var errorbar = properties.errorbars[i].max;
                } else {
                    var errorbar = 0;
                }


                if (typeof this.data[i] === 'number') {
                    values.push(this.data[i] + errorbar);
                
                } else if (RGraph.SVG.isArray(this.data[i]) && properties.grouping === 'grouped') {
                    values.push(RGraph.SVG.arrayMax(this.data[i]) + errorbar);

                } else if (RGraph.SVG.isArray(this.data[i]) && properties.grouping === 'stacked') {
                    values.push(RGraph.SVG.arraySum(this.data[i]) + errorbar);
                }
            }
            var max = RGraph.SVG.arrayMax(values);

            // A custom, user-specified maximum value
            if (typeof properties.yaxisScaleMax === 'number') {
                max = properties.yaxisScaleMax;
            }

            // Set the ymin to zero if it's set mirror
            if (properties.yaxisScaleMin === 'mirror' || properties.yaxisScaleMin === 'middle' || properties.yaxisScaleMin === 'center') {
                this.mirrorScale = true;
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

// Commenting these two lines out allows the data to change and
// subsequently a new max can be generated to accommodate the
// new data
//properties.yaxisScaleMax = this.scale.max;
//properties.yaxisScaleMin = this.scale.min;



            // Draw the background first
            RGraph.SVG.drawBackground(this);



            // Draw the threeD axes here so everything else is drawn on top of
            // it, but after the scale generation
            if (properties.variant === '3d') {




                // Draw the 3D Y axis
                RGraph.SVG.create({
                    svg: this.svg,
                    parent: this.svg.all,
                    type: 'path',
                    attr: {
                        d: 'M {1} {2} L {3} {4} L {5} {6} L {7} {8}'.format(
                            properties.marginLeft,
                            properties.marginTop,
                            
                            properties.marginLeft + properties.variant3dOffsetx,
                            properties.marginTop - properties.variant3dOffsety,
                            
                            properties.marginLeft + properties.variant3dOffsetx,
                            this.height - properties.marginBottom - properties.variant3dOffsety,
                            
                            properties.marginLeft,
                            this.height - properties.marginBottom,
                            
                            properties.marginLeft,
                            properties.marginTop
                        ),
                        fill: '#ddd',
                        stroke: '#ccc'
                    }
                });




                // Add the group that the negative bars are added to. This makes them
                // appear below the axes
                this.threed_xaxis_group = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'g',
                    parent: this.svg.all,
                    attr: {
                        className: 'rgraph_3d_bar_xaxis_negative'
                    }
                });



                // Draw the 3D X axis
                RGraph.SVG.create({
                    svg: this.svg,
                    parent: this.svg.all,
                    type: 'path',
                    attr: {
                        d: 'M {1} {2} L {3} {4} L {5} {6} L {7} {8}'.format(
                            properties.marginLeft,
                            this.getYCoord(0),
                            
                            properties.marginLeft + properties.variant3dOffsetx,
                            this.getYCoord(0) - properties.variant3dOffsety,
                            
                            this.width - properties.marginRight + properties.variant3dOffsetx,
                            this.getYCoord(0) - properties.variant3dOffsety,
                            
                            this.width - properties.marginRight,
                            this.getYCoord(0),
                            
                            properties.marginLeft,
                            this.getYCoord(0)
                        ),
                        fill: '#ddd',
                        stroke: '#ccc'
                    }
                });
            }






            // Draw the bars
            this.drawBars();


            // Draw the axes over the bars
            RGraph.SVG.drawXAxis(this);
            RGraph.SVG.drawYAxis(this);
            
            
            // Draw the labelsAbove labels
            this.drawLabelsAbove();



            
            
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
            //    //RGraph.SVG.removeHighlight(obj);
            //
            //}, false);



            // Fire the draw event
            RGraph.SVG.fireCustomEvent(this, 'ondraw');




            return this;
        };








        //
        // Draws the bars
        //
        this.drawBars = function ()
        {
            var y = this.getYCoord(0);

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

            // Go through the bars
            for (var i=0,sequentialIndex=0; i<this.data.length; ++i,++sequentialIndex) {

                //
                // REGULAR BARS
                //
                if (typeof this.data[i] === 'number') {

                    var outerSegment = (this.graphWidth - properties.marginInnerLeft - properties.marginInnerRight) / this.data.length,
                        height       = (Math.abs(this.data[i]) - Math.abs(this.scale.min)) / (Math.abs(this.scale.max) - Math.abs(this.scale.min)) * this.graphHeight,
                        width        = ( (this.graphWidth - properties.marginInnerLeft - properties.marginInnerRight) / this.data.length) - properties.marginInner - properties.marginInner,
                        x            = properties.marginLeft + properties.marginInner + properties.marginInnerLeft + (outerSegment * i);

                    // Work out the height and the Y coord of the Bar
                    if (this.scale.min >= 0 && this.scale.max > 0) {
                        y = this.getYCoord(this.scale.min) - height;

                    } else if (this.scale.min < 0 && this.scale.max > 0) {
                        height = (Math.abs(this.data[i]) / (this.scale.max - this.scale.min)) * this.graphHeight;
                        y      = this.getYCoord(0) - height;
                        
                        if (this.data[i] < 0) {
                            y = this.getYCoord(0);
                        }
                    } else if (this.scale.min < 0 && this.scale.max < 0) {
                        height = (Math.abs(this.data[i]) - Math.abs(this.scale.max)) / (Math.abs(this.scale.min) - Math.abs(this.scale.max)) * this.graphHeight;
                        y = properties.marginTop;
                    }









                    var rect = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'rect',
                        parent: properties.variant === '3d' && this.data[i] < 0 ? this.threed_xaxis_group : this.svg.all, 
                        attr: {
                            stroke: properties.colorsStroke,
                            fill: properties.colorsSequential ? (properties.colors[sequentialIndex] ? properties.colors[sequentialIndex] : properties.colors[properties.colors.length - 1]) : properties.colors[0],
                            x: x,
                            y: y,
                            width: width < 0 ? 0 : width,
                            height: height,
                            'stroke-width': properties.linewidth,
                            'data-original-x': x,
                            'data-original-y': y,
                            'data-original-width': width,
                            'data-original-height': height,
                            'data-tooltip': (!RGraph.SVG.isNull(properties.tooltips) && properties.tooltips.length) ? properties.tooltips[i] : '',
                            'data-index': i,
                            'data-sequential-index': sequentialIndex,
                            'data-value': this.data[i],
                            filter: properties.shadow ? 'url(#dropShadow)' : ''
                        }
                    });









                    // Draw the errorbar if required
                    this.drawErrorbar({
                        object:    this,
                        element:   rect,
                        index:     i,
                        value:     this.data[i],
                        type:      'normal'
                    });





                    this.coords.push({
                        object:  this,
                        element: rect,
                        x:      parseFloat(rect.getAttribute('x')),
                        y:      parseFloat(rect.getAttribute('y')),
                        width:  parseFloat(rect.getAttribute('width')),
                        height: parseFloat(rect.getAttribute('height'))
                    });

                    if (!this.coords2[0]) {
                        this.coords2[0] = [];
                    }
                
                    this.coords2[0].push({
                        object:  this,
                        element: rect,
                        x:      parseFloat(rect.getAttribute('x')),
                        y:      parseFloat(rect.getAttribute('y')),
                        width:  parseFloat(rect.getAttribute('width')),
                        height: parseFloat(rect.getAttribute('height'))
                    });



                    //
                    // Add the 3D faces if required
                    //
                    if (properties.variant === '3d') {
                        this.drawTop3dFace({rect: rect, value: this.data[i]});
                        this.drawSide3dFace({rect: rect, value: this.data[i]});
                    }





                    // Add the tooltip data- attribute
                    if (   !RGraph.SVG.isNull(properties.tooltips)
                        && (!RGraph.SVG.isNull(properties.tooltips[sequentialIndex]) || typeof properties.tooltips === 'string')
                       ) {

                        var obj = this;

                        //
                        // Add tooltip event listeners
                        //
                        (function (idx, seq)
                        {
                            rect.addEventListener(properties.tooltipsEvent.replace(/^on/, ''), function (e)
                            {
                                obj.removeHighlight();

                                // Show the tooltip
                                RGraph.SVG.tooltip({
                                    object: obj,
                                     index: idx,
                                     group: null,
                           sequentialIndex: seq,
                                      text: typeof properties.tooltips === 'string' ?  properties.tooltips : properties.tooltips[seq],
                                     event: e
                                });
                                
                                // Highlight the rect that has been clicked on
                                obj.highlight(e.target);
                            }, false);

                            rect.addEventListener('mousemove', function (e)
                            {
                                e.target.style.cursor = 'pointer'
                            }, false);
                        })(i, sequentialIndex);
                    }





                //
                // GROUPED BARS
                //
                } else if (RGraph.SVG.isArray(this.data[i]) && properties.grouping === 'grouped') {

                    var outerSegment = ( (this.graphWidth - properties.marginInnerLeft - properties.marginInnerRight) / this.data.length),
                        innerSegment = outerSegment - (2 * properties.marginInner);

                    // Loop through the group
                    for (var j=0; j<this.data[i].length; ++j,++sequentialIndex) {

                        var width  = ( (innerSegment - ((this.data[i].length - 1) * properties.marginInnerGrouped)) / this.data[i].length),
                            x      = (outerSegment * i) + properties.marginInner + properties.marginLeft + properties.marginInnerLeft + (j * width) + ((j - 1) * properties.marginInnerGrouped);
                        
                        x = properties.marginLeft + properties.marginInnerLeft + (outerSegment * i) + (width * j) + properties.marginInner + (j * properties.marginInnerGrouped);















// Calculate the height
// eg 0 -> 10
if (this.scale.min === 0 && this.scale.max > this.scale.min) {
    var height = ((this.data[i][j] - this.scale.min) / (this.scale.max - this.scale.min)) * this.graphHeight,
             y = this.getYCoord(0) - height;

// eg -5 -> -15
} else if (this.scale.max <= 0 && this.scale.min < this.scale.max) {
    var height = ((this.data[i][j] - this.scale.max) / (this.scale.max - this.scale.min)) * this.graphHeight,
             y = this.getYCoord(this.scale.max);
    
    height = Math.abs(height);

// eg 10 -> -10
} else if (this.scale.max > 0 && this.scale.min < 0) {

    var height = (Math.abs(this.data[i][j]) / (this.scale.max - this.scale.min)) * this.graphHeight,
             y = this.data[i][j] < 0 ? this.getYCoord(0) : this.getYCoord(this.data[i][j]);

// eg 5 -> 10
} else if (this.scale.min > 0 && this.scale.max > this.scale.min) {
    var height = (Math.abs(this.data[i][j] - this.scale.min) / (this.scale.max - this.scale.min)) * this.graphHeight,
             y = this.getYCoord(this.scale.min) - height;
}







                        // Add the rect tag
                        var rect = RGraph.SVG.create({
                            svg: this.svg,
                            parent: properties.variant === '3d' && this.data[i][j] < 0 ? this.threed_xaxis_group : this.svg.all,
                            type: 'rect',
                            attr: {
                                stroke: properties.colorsStroke,
                                fill: (properties.colorsSequential && properties.colors[sequentialIndex]) ? properties.colors[sequentialIndex] : properties.colors[j],
                                x: x,
                                y: y,
                                width: width,
                                height: height,
                                'stroke-width': properties.linewidth,
                                'data-original-x': x,
                                'data-original-y': y,
                                'data-original-width': width,
                                'data-original-height': height,
                                'data-index': i,
                                'data-subindex': j,
                                'data-sequential-index': sequentialIndex,
                                'data-tooltip': (!RGraph.SVG.isNull(properties.tooltips) && properties.tooltips.length) ? properties.tooltips[sequentialIndex] : '',
                                'data-value': this.data[i][j],
                                filter: properties.shadow ? 'url(#dropShadow)' : ''
                            }
                        });










                        // Draw the errorbar if required
                        this.drawErrorbar({
                            object:    this,
                            element:   rect,
                            index:     sequentialIndex,
                            value:     this.data[i][j],
                            type:      'grouped'
                        });










                        this.coords.push({
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
                    
                        this.coords2[i].push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });




                        //
                        // Add the 3D faces if required
                        //
                        if (properties.variant === '3d') {
                            this.drawTop3dFace({rect: rect, value: this.data[i][j]});
                            this.drawSide3dFace({rect: rect, value: this.data[i][j]});
                        }







                        // Add the tooltip data- attribute
                        if (   !RGraph.SVG.isNull(properties.tooltips)
                            && (properties.tooltips[sequentialIndex] || typeof properties.tooltips === 'string')
                           ) {

                            var obj = this;
    
                        
                            //
                            // Add tooltip event listeners
                            //
                            (function (idx, seq)
                            {
                                obj.removeHighlight();

                                var indexes = RGraph.SVG.sequentialIndexToGrouped(seq, obj.data);

                                rect.addEventListener(properties.tooltipsEvent.replace(/^on/, ''), function (e)
                                {
                                    // Show the tooltip
                                    RGraph.SVG.tooltip({
                                        object: obj,
                                        group: idx,
                                        index: indexes[1],
                                        sequentialIndex: seq,
                                        text: typeof properties.tooltips === 'string' ? properties.tooltips : properties.tooltips[seq],
                                        event: e
                                    });
                                    
                                    // Highlight the rect that has been clicked on
                                    obj.highlight(e.target);
    
                                }, false);
                                
                                rect.addEventListener('mousemove', function (e)
                                {
                                    e.target.style.cursor = 'pointer'
                                }, false);
                            })(i, sequentialIndex);
                        }
                    }

                    --sequentialIndex;










                //
                // STACKED CHARTS
                //
                } else if (RGraph.SVG.isArray(this.data[i]) && properties.grouping === 'stacked') {

                    var section = ( (this.graphWidth - properties.marginInnerLeft - properties.marginInnerRight) / this.data.length);

                    
                    // Intialise the Y coordinate to the bottom gutter
                    var y = this.getYCoord(0);

                    

                    // Loop through the stack
                    for (var j=0; j<this.data[i].length; ++j,++sequentialIndex) {

                        var height  = (this.data[i][j] / (this.max - this.min)) * this.graphHeight,
                            width   = section - (2 * properties.marginInner),
                            x       = properties.marginLeft + properties.marginInnerLeft + (i * section) + properties.marginInner,
                            y       = y - height;

                        // If this is the first iteration of the loop and a shadow
                        // is requested draw a rect here to create it.
                        if (j === 0 && properties.shadow) {
                            
                            var fullHeight = (RGraph.SVG.arraySum(this.data[i]) / (this.max - this.min)) * this.graphHeight;

                            var rect = RGraph.SVG.create({
                                svg: this.svg,
                                parent: this.svg.all,
                                type: 'rect',
                                attr: {
                                    fill: 'white',
                                    x: x,
                                    y: this.height - properties.marginBottom - fullHeight,
                                    width: width,
                                    height: fullHeight,
                                    'stroke-width': 0,
                                    'data-index': i,
                                    filter: 'url(#dropShadow)'
                                }
                            });
                            
                            this.stackedBackfaces[i] = rect;
                        }



                        // Create the visible bar
                        var rect = RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svg.all,
                            type: 'rect',
                            attr: {
                                stroke: properties.colorsStroke,
                                fill: properties.colorsSequential ? (properties.colors[sequentialIndex] ? properties.colors[sequentialIndex] : properties.colors[properties.colors.length - 1]) : properties.colors[j],
                                x: x,
                                y: y,
                                width: width,
                                height: height,
                                'stroke-width': properties.linewidth,
                                'data-original-x': x,
                                'data-original-y': y,
                                'data-original-width': width,
                                'data-original-height': height,
                                'data-index': i,
                                'data-subindex': j,
                                'data-sequential-index': sequentialIndex,
                                'data-tooltip': (!RGraph.SVG.isNull(properties.tooltips) && properties.tooltips.length) ? properties.tooltips[sequentialIndex] : '',
                                'data-value': this.data[i][j]
                            }
                        });







                        // Draw the errorbar if required
                        if (j === (this.data[i].length - 1)) {

                            this.drawErrorbar({
                                object:    this,
                                element:   rect,
                                index:     i,
                                value:     this.data[i][j],
                                type:      'stacked'
                            });
                        }









                        this.coords.push({
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
                    
                        this.coords2[i].push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });






                        //
                        // Add the 3D faces if required
                        //
                        if (properties.variant === '3d') {
                            this.drawTop3dFace({rect: rect, value: this.data[i][j]});
                            this.drawSide3dFace({rect: rect, value: this.data[i][j]});
                        }








                        // Add the tooltip data- attribute
                        if (   !RGraph.SVG.isNull(properties.tooltips)
                            && (properties.tooltips[sequentialIndex] || typeof properties.tooltips === 'string')
                           ) {
                        
                            var obj = this;
    
                        
                            //
                            // Add tooltip event listeners
                            //
                            (function (idx, seq)
                            {
                                rect.addEventListener(properties.tooltipsEvent.replace(/^on/, ''), function (e)
                                {
                                    obj.removeHighlight();

                                    var indexes = RGraph.SVG.sequentialIndexToGrouped(seq, obj.data);

                                    // Show the tooltip
                                    RGraph.SVG.tooltip({
                                        object: obj,
                                        index: indexes[1],
                                        group: idx,
                                        sequentialIndex: seq,
                                        text: typeof properties.tooltips === 'string' ? properties.tooltips : properties.tooltips[seq],
                                        event: e
                                    });
                                    
                                    // Highlight the rect that has been clicked on
                                    obj.highlight(e.target);
                                }, false);
                                
                                rect.addEventListener('mousemove', function (e)
                                {
                                    e.target.style.cursor = 'pointer';
                                }, false);
                            })(i, sequentialIndex);
                        }
                    }

                    --sequentialIndex;
                }
            }
        };








        //
        // This function can be used to retrieve the relevant Y coordinate for a
        // particular value.
        // 
        // @param int value The value to get the Y coordinate for
        //
        this.getYCoord = function (value)
        {
            if (value > this.scale.max) {
                return null;
            }

            var y, xaxispos = properties.xaxispos;

            if (value < this.scale.min) {
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
            var x      = rect.getAttribute('x'),
                y      = rect.getAttribute('y'),
                width  = rect.getAttribute('width'),
                height = rect.getAttribute('height');
            
            var highlight = RGraph.SVG.create({
                svg: this.svg,
                parent: this.svg.all,
                type: 'rect',
                attr: {
                    stroke: properties.highlightStroke,
                    fill: properties.highlightFill,
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                    'stroke-width': properties.highlightLinewidth
                },
                style: {
                    pointerEvents: 'none'
                }
            });


            if (properties.tooltipsEvent === 'mousemove') {
                
                //var obj = this;
                
                //highlight.addEventListener('mouseout', function (e)
                //{
                //    obj.removeHighlight();
                //    RGraph.SVG.hideTooltip();
                //    RGraph.SVG.REG.set('highlight', null);
                //}, false);
            }


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
                        color: colors[i]
                    });
                }
            }

            properties.backgroundGridColor = RGraph.SVG.parseColorLinear({object: this, color: properties.backgroundGridColor});
            properties.highlightFill       = RGraph.SVG.parseColorLinear({object: this, color: properties.highlightFill});
            properties.backgroundColor     = RGraph.SVG.parseColorLinear({object: this, color: properties.backgroundColor});
        };








        //
        // Draws the labelsAbove
        //
        this.drawLabelsAbove = function ()
        {
            // Go through the above labels
            if (properties.labelsAbove) {

                var data_seq      = RGraph.SVG.arrayLinearize(this.data),
                    seq           = 0,
                    stacked_total = 0;;

                for (var i=0; i<this.coords.length; ++i,seq++) {
                    
                    var num = typeof this.data[i] === 'number' ? this.data[i] : data_seq[seq] ;

            
            
            
            
                    // If this is a stacked chart then only dothe label
                    // if it's the top segment
                    if (properties.grouping === 'stacked') {
                        
                        var indexes   = RGraph.SVG.sequentialIndexToGrouped(i, this.data);
                        var group     = indexes[0];
                        var datapiece = indexes[1];

                        if (datapiece !== (this.data[group].length - 1) ) {
                            continue;
                        } else {
                            num = RGraph.SVG.arraySum(this.data[group]);
                        }
                    }





                    var str = RGraph.SVG.numberFormat({
                        object:    this,
                        num:       num.toFixed(properties.labelsAboveDecimals),
                        prepend:   typeof properties.labelsAboveUnitsPre  === 'string'   ? properties.labelsAboveUnitsPre  : null,
                        append:    typeof properties.labelsAboveUnitsPost === 'string'   ? properties.labelsAboveUnitsPost : null,
                        point:     typeof properties.labelsAbovePoint     === 'string'   ? properties.labelsAbovePoint     : null,
                        thousand:  typeof properties.labelsAboveThousand  === 'string'   ? properties.labelsAboveThousand  : null,
                        formatter: typeof properties.labelsAboveFormatter === 'function' ? properties.labelsAboveFormatter : null
                    });

                    // Facilitate labelsAboveSpecific
                    if (properties.labelsAboveSpecific && properties.labelsAboveSpecific.length && (typeof properties.labelsAboveSpecific[seq] === 'string' || typeof properties.labelsAboveSpecific[seq] === 'number') ) {
                        str = properties.labelsAboveSpecific[seq];
                    } else if ( properties.labelsAboveSpecific && properties.labelsAboveSpecific.length && typeof properties.labelsAboveSpecific[seq] !== 'string' && typeof properties.labelsAboveSpecific[seq] !== 'number') {
                        continue;
                    }

                    var x = parseFloat(this.coords[i].element.getAttribute('x')) + parseFloat(this.coords[i].element.getAttribute('width') / 2) + properties.labelsAboveOffsetx;

                    if (data_seq[i] >= 0) {
                        var y = parseFloat(this.coords[i].element.getAttribute('y')) - 7 + properties.labelsAboveOffsety;
                        var valign = properties.labelsAboveValign;
                    } else {
                        var y = parseFloat(this.coords[i].element.getAttribute('y')) + parseFloat(this.coords[i].element.getAttribute('height')) + 7 - properties.labelsAboveOffsety;
                        var valign = properties.labelsAboveValign === 'top' ? 'bottom' : 'top';
                    }
                    
                    var textConf = RGraph.SVG.getTextConf({
                        object: this,
                        prefix: 'labelsAbove'
                    });

                    RGraph.SVG.text({
                        object:     this,
                        parent:     this.svg.all,
                        tag:        'labels.above',

                        text:       str,
                        
                        x:          x,
                        y:          y,
                        
                        halign:     properties.labelsAboveHalign,
                        valign:     valign,

                        font:       textConf.font,
                        size:       textConf.size,
                        bold:       textConf.bold,
                        italic:     textConf.italic,
                        color:      textConf.color,

                        background: properties.labelsAboveBackground        || null,
                        padding:    properties.labelsAboveBackgroundPadding || 0
                    });
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
        // Draws the top of 3D bars
        //
        this.drawTop3dFace = function (opt)
        {
            var rect  = opt.rect,
                arr   = [parseInt(rect.getAttribute('fill')), 'rgba(255,255,255,0.7)'],
                x     = parseInt(rect.getAttribute('x')),
                y     = parseInt(rect.getAttribute('y')),
                w     = parseInt(rect.getAttribute('width')),
                h     = parseInt(rect.getAttribute('height')),
                value = parseFloat(rect.getAttribute('data-value'));


            rect.rgraph_3d_top_face = [];


            for (var i=0; i<2; ++i) {
            
                var color = (i === 0 ? rect.getAttribute('fill') : 'rgba(255,255,255,0.7)');

                var face = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'path',
                    parent: properties.variant === '3d' && opt.value < 0  ? this.threed_xaxis_group : this.svg.all,
                    attr: {
                        stroke: properties.colorsStroke,
                        fill: color,
                        'stroke-width': properties.linewidth,
                        d: 'M {1} {2} L {3} {4} L {5} {6} L {7} {8}'.format(
                            x,
                            y,

                            x + properties.variant3dOffsetx,
                            y - properties.variant3dOffsety,

                            x + w + properties.variant3dOffsetx,
                            y - properties.variant3dOffsety,

                            x + w,
                            y
                        )
                    }
                });



                // Store a reference to the rect on the front face of the bar
                rect.rgraph_3d_top_face[i] = face
            }
        };








        //
        // Draws the top of 3D bars
        //
        this.drawSide3dFace = function (opt)
        {
            var rect  = opt.rect,
                arr   = [parseInt(rect.getAttribute('fill')), 'rgba(0,0,0,0.3)'],
                x     = parseInt(rect.getAttribute('x')),
                y     = parseInt(rect.getAttribute('y')),
                w     = parseInt(rect.getAttribute('width')),
                h     = parseInt(rect.getAttribute('height'));
            
            rect.rgraph_3d_side_face = [];

            for (var i=0; i<2; ++i) {
            
                var color = (i === 0 ? rect.getAttribute('fill') : 'rgba(0,0,0,0.3)');

                var face = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'path',
                    parent: properties.variant === '3d' && opt.value < 0  ? this.threed_xaxis_group : this.svg.all,
                    attr: {
                        stroke: properties.colorsStroke,
                        fill: color,
                        'stroke-width': properties.linewidth,
                        d: 'M {1} {2} L {3} {4} L {5} {6} L {7} {8}'.format(
                            x + w,
                            y,

                            x + w + properties.variant3dOffsetx,
                            y - properties.variant3dOffsety,

                            x + w + properties.variant3dOffsetx,
                            y + h - properties.variant3dOffsety,

                            x + w,
                            y + h
                        )
                    }
                });


                // Store a reference to the rect on the front face of the bar
                rect.rgraph_3d_side_face[i] = face
            }
        };








        // This function is used to draw the errorbar. Its in the common
        // file because it's used by multiple chart libraries
        this.drawErrorbar = function (opt)
        {
            var index     = opt.index,
                datapoint = opt.value,
                linewidth = RGraph.SVG.getErrorbarsLinewidth({object: this, index: index}),
                color     = RGraph.SVG.getErrorbarsColor({object: this, index: index}),
                capwidth  = RGraph.SVG.getErrorbarsCapWidth({object: this, index: index}),
                element   = opt.element,
                type      = opt.type;
            
            

            // Get the error bar value
            var max = RGraph.SVG.getErrorbarsMaxValue({
                object: this,
                index: index
            });

            

            // Get the error bar value
            var min = RGraph.SVG.getErrorbarsMinValue({
                object: this,
                index: index
            });




            if (!max && !min) {
                return;
            }


            // Accounts for stacked bars
            if (type === 'stacked') {
                datapoint = RGraph.SVG.arraySum(this.data[index]);
            }


            if (datapoint >= 0) {
            
                var x1 = parseFloat(element.getAttribute('x')) + (parseFloat(element.getAttribute('width')) / 2);

                // Draw the UPPER vertical line
                var errorbarLine = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'line',
                    parent: this.svg.all,
                    attr: {
                        x1: x1,
                        y1: parseFloat(element.getAttribute('y')),
                        x2: x1,
                        y2: this.getYCoord(parseFloat(datapoint + max)),
                        stroke: color,
                        'stroke-width': linewidth
                    }
                });
    
                // Draw the cap to the UPPER line
                var errorbarCap = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'line',
                    parent: this.svg.all,
                    attr: {
                        x1: parseFloat(errorbarLine.getAttribute('x1')) - (capwidth / 2),
                        y1: errorbarLine.getAttribute('y2'),
                        x2: parseFloat(errorbarLine.getAttribute('x1')) + (capwidth / 2),
                        y2: errorbarLine.getAttribute('y2'),
                        stroke: color,
                        'stroke-width': linewidth
                    }
                });
















                // Draw the minimum errorbar if necessary
                if (typeof min === 'number') {

                    var errorbarLine = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'line',
                        parent: this.svg.all,
                        attr: {
                            x1: x1,
                            y1: parseFloat(element.getAttribute('y')),
                            x2: x1,
                            y2: this.getYCoord(parseFloat(datapoint - min)),
                            stroke: color,
                            'stroke-width': linewidth
                        }
                    });
        
                    // Draw the cap to the UPPER line
                    var errorbarCap = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'line',
                        parent: this.svg.all,
                        attr: {
                            x1: parseFloat(errorbarLine.getAttribute('x1')) - (capwidth / 2),
                            y1: errorbarLine.getAttribute('y2'),
                            x2: parseFloat(errorbarLine.getAttribute('x1')) + (capwidth / 2),
                            y2: errorbarLine.getAttribute('y2'),
                            stroke: color,
                            'stroke-width': linewidth
                        }
                    });
                }














            } else if (datapoint < 0) {

                var x1 = parseFloat(element.getAttribute('x')) + (parseFloat(element.getAttribute('width')) / 2),
                    y1 = parseFloat(element.getAttribute('y')) + parseFloat(element.getAttribute('height')),
                    y2 = this.getYCoord(parseFloat(datapoint - Math.abs(max) ))

                // Draw the vertical line
                var errorbarLine = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'line',
                    parent: this.svg.all,
                    attr: {
                        x1: x1,
                        y1: y1,
                        x2: x1,
                        y2: y2,
                        stroke: color,
                        'stroke-width': linewidth
                    }
                });

                // Draw the cap to the vertical line
                var errorbarCap = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'line',
                    parent: this.svg.all,
                    attr: {
                        x1: parseFloat(errorbarLine.getAttribute('x1')) - (capwidth / 2),
                        y1: errorbarLine.getAttribute('y2'),
                        x2: parseFloat(errorbarLine.getAttribute('x1')) + (capwidth / 2),
                        y2: errorbarLine.getAttribute('y2'),
                        stroke: color,
                        'stroke-width': linewidth
                    }
                });












                // Draw the minimum errorbar if necessary
                if (typeof min === 'number') {

                    var x1 = parseFloat(element.getAttribute('x')) + (parseFloat(element.getAttribute('width')) / 2);

                    var errorbarLine = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'line',
                        parent: this.svg.all,
                        attr: {
                            x1: x1,
                            y1: this.getYCoord(parseFloat(datapoint + min)),
                            x2: x1,
                            y2: this.getYCoord(parseFloat(datapoint)),
                            stroke: color,
                            'stroke-width': linewidth
                        }
                    });
        
                    // Draw the cap to the UPPER line
                    var errorbarCap = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'line',
                        parent: this.svg.all,
                        attr: {
                            x1: parseFloat(errorbarLine.getAttribute('x1')) - (capwidth / 2),
                            y1: errorbarLine.getAttribute('y1'),
                            x2: parseFloat(errorbarLine.getAttribute('x1')) + (capwidth / 2),
                            y2: errorbarLine.getAttribute('y1'),
                            stroke: color,
                            'stroke-width': linewidth
                        }
                    });
                }
            }
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
                data     = [],
                height   = null,
                seq      = 0;

            //
            // Copy the data
            //
            data = RGraph.SVG.arrayClone(this.data);

            this.draw();

            var iterate = function ()
            {

                for (var i=0,seq=0,len=obj.coords.length; i<len; ++i, ++seq) {

                    var   multiplier = (frame / frames)
                        // RGraph.SVG.FX.getEasingMultiplier(frames, frame)
                        // RGraph.SVG.FX.getEasingMultiplier(frames, frame);
                
                


                    // TODO Go through the data and update the value according to
                    // the frame number
                    if (typeof data[i] === 'number') {

                        height      = Math.abs(obj.getYCoord(data[i]) - obj.getYCoord(0));
                        obj.data[i] = data[i] * multiplier;
                        height      = multiplier * height;

                        // Set the new height on the rect
                        obj.coords[seq].element.setAttribute(
                            'height',
                            height
                        );

                        // Set the correct Y coord on the object
                        obj.coords[seq].element.setAttribute(
                            'y',
                            data[i] < 0 ? obj.getYCoord(0) : obj.getYCoord(0) - height
                        );



                        // This upadtes the size of the 3D sides to the bar
                        if (properties.variant === '3d') {
                        
                            // Remove the 3D sides to the bar
                            if (obj.coords[i].element.rgraph_3d_side_face[0].parentNode) obj.coords[i].element.rgraph_3d_side_face[0].parentNode.removeChild(obj.coords[i].element.rgraph_3d_side_face[0]);
                            if (obj.coords[i].element.rgraph_3d_side_face[1].parentNode) obj.coords[i].element.rgraph_3d_side_face[1].parentNode.removeChild(obj.coords[i].element.rgraph_3d_side_face[1]);
                            
                            if (obj.coords[i].element.rgraph_3d_top_face[0].parentNode) obj.coords[i].element.rgraph_3d_top_face[0].parentNode.removeChild(obj.coords[i].element.rgraph_3d_top_face[0]);
                            if (obj.coords[i].element.rgraph_3d_top_face[1].parentNode) obj.coords[i].element.rgraph_3d_top_face[1].parentNode.removeChild(obj.coords[i].element.rgraph_3d_top_face[1]);
                            
                            // Add the 3D sides to the bar (again)
                            obj.drawSide3dFace({rect: obj.coords[i].element});
                            
                            // Draw the top side of the 3D bar
                            if (properties.grouping === 'grouped') {
                                obj.drawTop3dFace({rect: obj.coords[i].element   });
                            }

                            // Now remove and immediately re-add the front face of
                            // the bar - this is so that the front face appears
                            // above the other sides
                            if (obj.coords[i].element.parentNode) {
                                var parent = obj.coords[i].element.parentNode;
                                var node   = parent.removeChild(obj.coords[i].element);
                                parent.appendChild(node);
                            }
                        }


                    } else if (typeof data[i] === 'object') {

                        var accumulativeHeight = 0;

                        for (var j=0,len2=data[i].length; j<len2; ++j, ++seq) {

                            height         = Math.abs(obj.getYCoord(data[i][j]) - obj.getYCoord(0));
                            height         = multiplier * height;
                            obj.data[i][j] = data[i][j] * multiplier;
                            height = Math.round(height);

                            obj.coords[seq].element.setAttribute(
                                'height',
                                height
                            );

                            obj.coords[seq].element.setAttribute(
                                'y',
                                data[i][j] < 0 ? (obj.getYCoord(0) + accumulativeHeight) : (obj.getYCoord(0) - height - accumulativeHeight)
                            );




    
                            // This updates the size of the 3D sides to the bar
                            if (properties.variant === '3d') {

                                // Remove the 3D sides to the bar
                                if (obj.coords[seq].element.rgraph_3d_side_face[0].parentNode) obj.coords[seq].element.rgraph_3d_side_face[0].parentNode.removeChild(obj.coords[seq].element.rgraph_3d_side_face[0]);
                                if (obj.coords[seq].element.rgraph_3d_side_face[1].parentNode) obj.coords[seq].element.rgraph_3d_side_face[1].parentNode.removeChild(obj.coords[seq].element.rgraph_3d_side_face[1]);
                                
                                if (obj.coords[seq].element.rgraph_3d_top_face[0].parentNode) obj.coords[seq].element.rgraph_3d_top_face[0].parentNode.removeChild(obj.coords[seq].element.rgraph_3d_top_face[0]);
                                if (obj.coords[seq].element.rgraph_3d_top_face[1].parentNode) obj.coords[seq].element.rgraph_3d_top_face[1].parentNode.removeChild(obj.coords[seq].element.rgraph_3d_top_face[1]);
                                
                                // Add the 3D sides to the bar (again)
                                obj.drawSide3dFace({rect: obj.coords[seq].element});

// Draw the top side of the 3D bar
// TODO Need to only draw the top face when the bar is either
//      not stacked or is the last segment in the stack
obj.drawTop3dFace({rect: obj.coords[seq].element});
    
                                // Now remove and immediately re-add the front face of
                                // the bar - this is so that the front face appears
                                // above the other sides
                                if (obj.coords[seq].element.parentNode) {
                                    var parent = obj.coords[seq].element.parentNode;
                                    var node   = parent.removeChild(obj.coords[seq].element);
                                    parent.appendChild(node);
                                }
                            }
                            accumulativeHeight += (properties.grouping === 'stacked' ? height : 0);

                        }

                        //
                        // Set the height and Y cooord of the backfaces if necessary
                        //
                        if (obj.stackedBackfaces[i]) {
                            obj.stackedBackfaces[i].setAttribute(
                                'height',
                                accumulativeHeight
                            );
    
                            obj.stackedBackfaces[i].setAttribute(
                                'y',
                                obj.height - properties.marginBottom - accumulativeHeight
                            );
                        }

                        // Decrease seq by one so that it's not incremented twice
                        --seq;
                    }
                }

                if (frame++ < frames) {
                    //setTimeout(iterate, frame > 1 ? opt.delay : 200);
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
            // First draw the chart
            this.draw();

            var obj = this,
                opt = arguments[0] || {};
            
            opt.frames      = opt.frames || 60;
            opt.startFrames = [];
            opt.counters    = [];

            var framesperbar    = opt.frames / 3,
                frame           = -1,
                callback        = opt.callback || function () {};

            for (var i=0,len=this.coords.length; i<len; i+=1) {

                opt.startFrames[i] = ((opt.frames / 2) / (obj.coords.length - 1)) * i;
                opt.counters[i]    = 0;
                
                // Now zero the height of the bar (and remove the 3D faces)
                this.coords[i].element.setAttribute('height', 0);
                
                if (this.coords[i].element.rgraph_3d_side_face) {
                
                    var parent = this.coords[i].element.rgraph_3d_side_face[0].parentNode;
                    
                    parent.removeChild(this.coords[i].element.rgraph_3d_side_face[0]);
                    parent.removeChild(this.coords[i].element.rgraph_3d_side_face[1]);
                    
                    parent.removeChild(this.coords[i].element.rgraph_3d_top_face[0]);
                    parent.removeChild(this.coords[i].element.rgraph_3d_top_face[1]);
                }
            }

            function iterator ()
            {
                ++frame;

                for (var i=0,len=obj.coords.length; i<len; i+=1) {

                    if (frame > opt.startFrames[i]) {
                        
                        var originalHeight = obj.coords[i].element.getAttribute('data-original-height'),
                            height,
                            value = parseFloat(obj.coords[i].element.getAttribute('data-value'));

                        var height = Math.min(
                            ((frame - opt.startFrames[i]) / framesperbar) * originalHeight,
                            originalHeight
                        );

                        obj.coords[i].element.setAttribute(
                            'height',
                            height < 0 ? 0 : height
                        );

                        obj.coords[i].element.setAttribute(
                            'y',
                            value >=0 ? obj.getYCoord(0) - height : obj.getYCoord(0)
                        );



                        // This updates the size of the 3D sides to the bar
                        if (properties.variant === '3d') {
                        
                            // Remove the 3D sides to the bar
                            var parent = obj.coords[i].element.rgraph_3d_side_face[0].parentNode;
        
                            if (parent) parent.removeChild(obj.coords[i].element.rgraph_3d_side_face[0]);
                            if (parent) parent.removeChild(obj.coords[i].element.rgraph_3d_side_face[1]);
                            
                            var parent = obj.coords[i].element.rgraph_3d_top_face[0].parentNode;
                            if (parent) parent.removeChild(obj.coords[i].element.rgraph_3d_top_face[0]);
                            if (parent) parent.removeChild(obj.coords[i].element.rgraph_3d_top_face[1]);
                            


                            // Now remove and immediately re-add the front face of
                            // the bar - this is so that the front face appears
                            // above the other sides
                            if (obj.coords[i].element.parentNode) {
                                var parent = obj.coords[i].element.parentNode;
                                var node   = parent.removeChild(obj.coords[i].element);
                                parent.appendChild(node);
                            }
                        }


                        if (properties.grouping === 'stacked') {
                            
                            var seq = obj.coords[i].element.getAttribute('data-sequential-index');
                            var indexes = RGraph.SVG.sequentialIndexToGrouped(seq, obj.data);
                            
                            if (indexes[1] > 0) {
                                obj.coords[i].element.setAttribute(
                                    'y',
                                    parseInt(obj.coords[i - 1].element.getAttribute('y')) - height
                                );
                            }
                        }

                        if (properties.variant === '3d') {
                            // Add the 3D sides to the bar (again)
                            obj.drawSide3dFace({
                                rect:  obj.coords[i].element,
                                value: obj.coords[i].element.getAttribute('data-value')
                            });
    
                            // Draw the top side of the 3D bar
                            if (properties.grouping === 'grouped' || (properties.grouping === 'stacked' && (indexes[1] + 1) === obj.data[indexes[0]].length) ) {
                                obj.drawTop3dFace({
                                    rect:  obj.coords[i].element,
                                    value: obj.coords[i].element.getAttribute('data-value')
                                });
                            }
                        }
                    }
                }


                if (frame >= opt.frames) {
                    callback(obj);
                } else {
                    RGraph.SVG.FX.update(iterator);
                }
            }
            
            iterator();

            return this;
        };








        //
        // A worker function that handles Bar chart specific tooltip substitutions
        //
        this.tooltipSubstitutions = function (opt)
        {
            var indexes = RGraph.SVG.sequentialIndexToGrouped(opt.index, this.data);

            return {
                  index: indexes[1],
                dataset: indexes[0],
        sequentialIndex: opt.index,
                  value: typeof this.data[indexes[0]] === 'number' ? this.data[indexes[0]] : this.data[indexes[0]][indexes[1]],
                 values: typeof this.data[indexes[0]] === 'number' ? [this.data[indexes[0]]] : this.data[indexes[0]]
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
            if (typeof this.data[0] === 'object') {
                var label = (!RGraph.SVG.isNull(properties.tooltipsFormattedKeyLabels) && typeof properties.tooltipsFormattedKeyLabels === 'object' && properties.tooltipsFormattedKeyLabels[index])
                                ? properties.tooltipsFormattedKeyLabels[index]
                                : '';
    
            } else {

                var label = (   !RGraph.SVG.isNull(properties.tooltipsFormattedKeyLabels)
                            && typeof properties.tooltipsFormattedKeyLabels === 'object'
                            && properties.tooltipsFormattedKeyLabels[specific.index])
                                ? properties.tooltipsFormattedKeyLabels[specific.index]
                                : '';
            }

            return {
                label: label
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




            // If the chart is a 3D version the tooltip Y position needs this
            // adjustment
            var adjustment = 0;
            
            if (properties.variant === '3d') {
                var left  = coords.x;
                var top   = coords.y;
                var angle = 5 / (180 / Math.PI);
                
                var adjustment = Math.tan(angle) * left;
            }




            args.tooltip.style.top  = (
                  svgXY[1]                      // The Y coordinate of the canvas
                + coords.y                      // The Y coordinate of the bar on the chart
                - tooltip.offsetHeight          // The height of the tooltip
                - 15                            // An arbitrary amount
                + adjustment                    // Account for the 3D
            ) + 'px';


            // If the bar is a negative one, add half the height to the Y coord
            var data_arr = RGraph.SVG.arrayLinearize(this.data);

            if (data_arr[index] < 0) {
                args.tooltip.style.top = 
                       parseFloat(args.tooltip.style.top)
                    + (coords.height / 2)
                    + 'px';
            }


            
            // If the top of the tooltip is off the top of the page
            // then move the tooltip down
            if(parseFloat(args.tooltip.style.top) < 0) {
                args.tooltip.style.top = parseFloat(args.tooltip.style.top) + 20 + 'px';
            }
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