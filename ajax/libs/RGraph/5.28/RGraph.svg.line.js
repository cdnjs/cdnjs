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

    RGraph     = window.RGraph || {isrgraph:true,isRGraph:true,rgraph:true};
    RGraph.SVG = RGraph.SVG || {};

// Module pattern
(function (win, doc, undefined)
{
    RGraph.SVG.Line = function (conf)
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
        this.uid             = RGraph.SVG.createUID();
        this.container       = document.getElementById(this.id);
        this.layers          = {}; // MUST be before the SVG tag is created!
        this.svg             = RGraph.SVG.createSVG({object: this,container: this.container});
        this.isRGraph        = true;
        this.isrgraph        = true;
        this.rgraph          = true;
        this.width           = Number(this.svg.getAttribute('width'));
        this.height          = Number(this.svg.getAttribute('height'));





        // Convert strings to numbers
        conf.data = RGraph.SVG.stringsToNumbers(conf.data);





        // Convert single datasets to a multi-dimensional format
        if (RGraph.SVG.isArray(conf.data) && RGraph.SVG.isArray(conf.data[0])) {
            this.data = RGraph.SVG.arrayClone(conf.data);
        } else if (RGraph.SVG.isArray(conf.data)) {
            this.data = [RGraph.SVG.arrayClone(conf.data)];
        } else {
            this.data = [[]];
        }

        this.type            = 'line';
        this.coords          = [];
        this.coords2         = [];
        this.coordsSpline    = [];
        this.hasMultipleDatasets = typeof this.data[0] === 'object' && typeof this.data[1] === 'object' ? true : false;
        this.colorsParsed    = false;
        this.originalColors  = {};
        this.gradientCounter = 1;
        this.originalData    = RGraph.SVG.arrayClone(this.data);
        this.filledGroups    = [];







        // Add this object to the ObjectRegistry
        RGraph.SVG.OR.add(this);

        this.container.style.display = 'inline-block';

        this.properties =
        {
            marginLeft:   35,
            marginRight:  35,
            marginTop:    35,
            marginBottom: 35,
            marginInner:  0,

            backgroundColor:            null,
            backgroundImage:            null,
            backgroundImageStretch:     true,
            backgroundImageAspect:      'none',
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
            
            colors:           ['red', '#0f0', 'blue', '#ff0', '#0ff', 'green'],
            
            filled:             false,
            filledColors:       [],
            filledClick:        null,
            filledOpacity:      1,
            filledAccumulative: false,
            
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
            yaxisLabelsFont:        null,
            yaxisLabelsSize:        null,
            yaxisLabelsColor:       null,
            yaxisLabelsBold:        null,
            yaxisLabelsItalic:      null,
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
            xaxisLabelsOffsetx:   0,
            xaxisLabelsOffsety:   0,
            xaxisLabelsPosition:  'edge',
            xaxisLabelsPositionEdgeTickmarksCount: null,
            xaxisColor:           'black',
            xaxisLabelsFont:      null,
            xaxisLabelsSize:      null,
            xaxisLabelsColor:     null,
            xaxisLabelsBold:      null,
            xaxisLabelsItalic:    null,
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

            textColor:  'black',
            textFont:   'Arial, Verdana, sans-serif',
            textSize:   12,
            textBold:   false,
            textItalic: false,

            linewidth: 1,

            tooltips:                        null,
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

            //highlightStroke: 'rgba(0,0,0,0)',
            //highlightFill: 'rgba(255,255,255,0.7)',
            //highlightLinewidth: 1,
            
            tickmarksStyle: 'none',
            tickmarksSize: 5,
            tickmarksFill: 'white',
            tickmarksLinewidth: 1,

            labelsAbove:                  false,
            labelsAboveFont:              null,
            labelsAboveSize:              null,
            labelsAboveBold:              null,
            labelsAboveItalic:            null,
            labelsAboveColor:             null,
            labelsAboveBackground:        'rgba(255,255,255,0.7)',
            labelsAboveBackgroundPadding: 2,
            labelsAboveUnitsPre:          null,
            labelsAboveUnitsPost:         null,
            labelsAbovePoint:             null,
            labelsAboveThousand:          null,
            labelsAboveFormatter:         null,
            labelsAboveDecimals:          null,
            labelsAboveOffsetx:           0,
            labelsAboveOffsety:           -10,
            labelsAboveHalign:            'center',
            labelsAboveValign:            'bottom',
            labelsAboveSpecific:          null,

            shadow: false,
            shadowOffsetx: 2,
            shadowOffsety: 2,
            shadowBlur: 2,
            shadowOpacity: 0.25,
            
            spline: false,
            stepped: false,
            
            title:       '',
            titleX:      null,
            titleY:      null,
            titleHalign: 'center',
            titleValign: null,
            titleSize:   null,
            titleColor:  null,
            titleFont:   null,
            titleBold:   null,
            titleItalic: null,
            
            titleSubtitle:       null,
            titleSubtitleSize:   null,
            titleSubtitleColor:  '#aaa',
            titleSubtitleFont:   null,
            titleSubtitleBold:   null,
            titleSubtitleItalic: null,
            
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
            keyLabelsSize:    null,
            keyLabelsBold:    null,
            keyLabelsItalic:  null,
            keyLabelsFont:  null,
            keyLabelsColor:  null,
            
            dasharray: [1,0],
            dashed: false,
            dotted: false
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
















            // Create the defs tag
            RGraph.SVG.createDefs(this);





            this.graphWidth  = this.width - properties.marginLeft - properties.marginRight;
            this.graphHeight = this.height - properties.marginTop - properties.marginBottom;



            // Parse the colors for gradients
            RGraph.SVG.resetColorsToOriginalValues({object:this});
            this.parseColors();
            
            // Clear the coords arrays
            this.coords       = [];
            this.coords2      = [];
            this.coordsSpline = [];
            
            // Reset the data back to the original
            this.data = RGraph.SVG.arrayClone(this.originalData);

            
            // Set this to zero
            this.tooltipsSequentialIndex = 0;
            
            
            
            
            // If the line is set to be dotted or dashed then set the dash array
            if (properties.dashed) {
                properties.dasharray = [5,5];
            }
            if (properties.dotted) {
                properties.dasharray = [1,4];
            }









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



            // Go through all the data working out the max value
            // whilst taking errorbars into account
            for (var i=0,tmp=[]; i<this.data.length; ++i) {
                for (var j=0; j<this.data[i].length; ++j) {

                    // Init the tmp array slot
                    if (typeof tmp[j] === 'undefined') {
                        tmp[j] = 0;
                    }

                    if (properties.filled && properties.filledAccumulative) {
                        tmp[j] += this.data[i][j];
                        
                        // Only add this once (from the last dataset)
                        if (i === (this.data.length - 1) ) {
                             tmp[j] += (properties.errorbars ? properties.errorbars[RGraph.SVG.groupedIndexToSequential({object: this, dataset: i, index: j})].max : 0)
                        }
                    } else {
                        tmp[j] = Math.max(
                            tmp[j],
                            this.data[i][j] + (properties.errorbars ? properties.errorbars[RGraph.SVG.groupedIndexToSequential({object: this, dataset: i, index: j})].max : 0)
                        );
                    }

                }
            }


            // Go through the data and work out the maximum value
            var values = [];

            // Go thru each dataset
            for (var i=0,max=0; i<this.data.length; ++i) {
                
                if (RGraph.SVG.isArray(this.data[i]) && !properties.filledAccumulative) {
                    values.push(RGraph.SVG.arrayMax(tmp));

                } else if (RGraph.SVG.isArray(this.data[i]) && properties.filled && properties.filledAccumulative) {
                
                   for (var j=0; j<this.data[i].length; ++j) {
                        values[j] = values[j]  || 0;
                        values[j] = values[j] + this.data[i][j];
                        
                        // This adds values to prior values in order
                        // to create the stacking effect.
                        this.data[i][j] = values[j];
                    }
                }
            }

            
            
            if (properties.filled && properties.filledAccumulative) {
                var max = RGraph.SVG.arrayMax(tmp)
            } else {
                var max = RGraph.SVG.arrayMax(values);
            }
















            // A custom, user-specified maximum value
            if (typeof properties.yaxisScaleMax === 'number') {
                max = properties.yaxisScaleMax;
            }

            // Set the ymin to zero if it's set mirror
            if (properties.yaxisScaleMin === 'mirror') {
                this.mirrorScale = true;
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
            // Set the ymin to zero if it's szet mirror
            if (this.mirrorScale) {
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
            
            // Taken out 14/01/18 so that the scale is not fixed across draws
            //properties.yaxisScaleMax = this.scale.max;
            //properties.yaxisScaleMin = this.scale.min;




            // Draw the background first
            RGraph.SVG.drawBackground(this);


            // Draw the axes over the bars
            RGraph.SVG.drawXAxis(this);
            RGraph.SVG.drawYAxis(this);


            for (var i=0; i<this.data.length; ++i) {
                this.drawLine(this.data[i], i);
            }

            // Always redraw the liines now so that tickmarks are drawn
            this.redrawLines();








            
            
            // Draw the key
            if (typeof properties.key !== null && RGraph.SVG.drawKey) {
                RGraph.SVG.drawKey(this);
            } else if (!RGraph.SVG.isNull(properties.key)) {
                alert('The drawKey() function does not exist - have you forgotten to include the key library?');
            }







            // Draw the labelsAbove labels
            this.drawLabelsAbove();



            // Add the event listener that clears the highlight if
            // there is any. Must be MOUSEDOWN (ie before the click event)
            var obj = this;
            document.body.addEventListener('mousedown', function (e)
            {
                RGraph.SVG.removeHighlight(obj);

            }, false);



            // Fire the draw event
            RGraph.SVG.fireCustomEvent(this, 'ondraw');



            return this;
        };








        //
        // Draws the bars
        //
        this.drawLine = function (data, index)
        {
            var coords = [],
                path   = [];

            // Generate the coordinates
            for (var i=0,len=data.length; i<len; ++i) {
                
                var val = data[i],
                    x   = (( (this.graphWidth - properties.marginInner - properties.marginInner) / (len - 1) ) * i) + properties.marginLeft + properties.marginInner,
                    y   = this.getYCoord(val);

                coords.push([x,y]);
            }


            // Go through the coordinates and create the path that draws the line
            for (var i=0; i<coords.length; ++i) {

                if (i === 0 || RGraph.SVG.isNull(data[i]) || RGraph.SVG.isNull(data[i - 1])) {
                    var action = 'M';

                } else {
                     // STEPPED Add extra lines
                    if (properties.stepped) {
                        path.push('L {1} {2}'.format(
                            coords[i][0],
                            coords[i - 1][1]
                        ));
                    }
                    var action = 'L';
                }

                path.push(action + '{1} {2}'.format(
                    coords[i][0],
                    RGraph.SVG.isNull(data[i]) ? 0 : coords[i][1]
                ));
            }







            //
            // Add the coordinates to the coords array, coords2 array and if
            // necessary, the coordsSpline array 
            //

            // The coords array

            for (var k=0; k<coords.length; ++k) {
                
                this.coords.push(RGraph.SVG.arrayClone(coords[k]));

                this.coords[this.coords.length - 1].x      = coords[k][0];
                this.coords[this.coords.length - 1].y      = coords[k][1];
                this.coords[this.coords.length - 1].object = this;
                this.coords[this.coords.length - 1].value  = data[k];
                this.coords[this.coords.length - 1].index  = k;
                this.coords[this.coords.length - 1].path = path;
            }

            // The coords2 array
            this.coords2[index] = RGraph.SVG.arrayClone(coords);

            for (var k=0; k<coords.length; ++k) {
                
                //Get the sequential index
                var seq = RGraph.SVG.groupedIndexToSequential({
                    object:  this,
                    dataset: index,
                    index:   k
                });

                this.coords2[index][k].x          = coords[k][0];
                this.coords2[index][k].y          = coords[k][1];
                this.coords2[index][k].object     = this;
                this.coords2[index][k].value      = data[k];
                this.coords2[index][k].index      = k;
                this.coords2[index][k].path       = path;
                this.coords2[index][k].sequential = seq;    

                // Draw the errorbar if required
                if (properties.errorbars) {
                    this.drawErrorbar({
                        object:     this,
                        dataset:    index,
                        index:      k,
                        sequential: seq,
                        x:          x,
                        y:          y
                    });
                }
            }




            // The coordsSpline array
            if (properties.spline) {
                this.coordsSpline[index] = this.drawSpline(coords);
            }




            // If the line should be filled, draw the fill part
            if (properties.filled === true || (typeof properties.filled === 'object' && properties.filled[index]) ) {

                if (properties.spline) {
                    
                    var fillPath = ['M{1} {2}'.format(
                        this.coordsSpline[index][0][0],
                        this.coordsSpline[index][0][1]
                    )];

                    for (var i=1; i<this.coordsSpline[index].length; ++i) {
                        fillPath.push('L{1} {2}'.format(
                            this.coordsSpline[index][i][0] + ((i === (this.coordsSpline[index].length) - 1) ? 1 : 0),
                            this.coordsSpline[index][i][1]
                        ));
                    }

                } else {
                    var fillPath = RGraph.SVG.arrayClone(path);
                }


                // Draw a line down to the X axis
                fillPath.push('L{1} {2}'.format(
                    this.coords2[index][this.coords2[index].length - 1][0] + 1,
                    index > 0 && properties.filledAccumulative ? (properties.spline ? this.coordsSpline[index - 1][this.coordsSpline[index - 1].length - 1][1] : this.coords2[index - 1][this.coords2[index - 1].length - 1][1]) : this.getYCoord(properties.yaxisScaleMin > 0 ? properties.yaxisScaleMin : 0) + (properties.xaxis ? 0 : 1)
                ));

                if (index > 0 && properties.filledAccumulative) {
                    
                    var path2 = RGraph.SVG.arrayClone(path);
                    
                    if (index > 0 && properties.filledAccumulative) {
                        if (properties.spline) {
                            for (var i=this.coordsSpline[index - 1].length-1; i>=0; --i) {
                                fillPath.push('L{1} {2}'.format(
                                    this.coordsSpline[index - 1][i][0],
                                    this.coordsSpline[index - 1][i][1]
                                ));
                            }
                        } else {
                            for (var i=this.coords2[index - 1].length-1; i>=0; --i) {

                                fillPath.push('L{1} {2}'.format(
                                    this.coords2[index - 1][i][0],
                                    this.coords2[index - 1][i][1]
                                ));
                                
                                // For STEPPED charts
                                if (properties.stepped && i > 0) {
                                    fillPath.push('L{1} {2}'.format(
                                        this.coords2[index - 1][i][0],
                                        this.coords2[index - 1][i - 1][1]
                                    ));
                                }
                            }
                        }
                    }
                } else {

                    // This is the bottom left corner. The +1 is so that
                    // the fill doesn't go over the axis
                    fillPath.push('L{1} {2}'.format(
                        this.coords2[index][0][0] + (properties.yaxis ? 0 : 0),
                        // this.coords2[index][0][0] + (properties.yaxis ? 1 : 0),
                        this.getYCoord(properties.yaxisScaleMin > 0 ? properties.yaxisScaleMin : 0) + (properties.xaxis ? 0 : 1)
                    ));
                }

                // Find the first none-null value and use that
                // values X value
                fillPath.push('L{1} {2}'.format(
                    this.coords2[index][0][0] + (properties.yaxis ? 1 : 0),
                    this.coords2[index][0][1]
                ));

                for (var i=0; i<this.data[index].length; ++i) {
                    if (!RGraph.SVG.isNull(this.data[index][i])) {
                        fillPath.push('L{1} {2}'.format(
                            this.coords2[index][i][0],
                            this.getYCoord(0)
                        ));
                        break;
                    }
                }

                // Create a group that the fill is added to. Later the line
                // will also be added to it
                this.filledGroups[index] = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'g',
                    parent: this.svg.all,
                    attr: {
                        'class': 'rgraph_filled_line_' + index
                    }
                });

                // Add the fill path to the scene
                var fillPathObject = RGraph.SVG.create({
                    svg: this.svg,
                    parent: this.filledGroups[index],
                    type: 'path',
                    attr: {
                        d: fillPath.join(' '),
                        stroke: 'rgba(0,0,0,0)',
                        'fill': properties.filledColors && properties.filledColors[index] ? properties.filledColors[index] : properties.colors[index],
                        'fill-opacity': properties.filledOpacity,
                        'stroke-width': 1,
                        'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                    }
                });


                if (properties.filledClick) {
                    
                    var obj = this;
                    fillPathObject.addEventListener('click', function (e)
                    {
                        properties.filledClick(e, obj, index);
                    }, false);
                    
                    fillPathObject.addEventListener('mousemove', function (e)
                    {
                        e.target.style.cursor = 'pointer';
                    }, false);
                }
            }









            //
            // Create the drop shadow effect if its required
            //
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














            // Add the path to the scene
            if (properties.spline) {

                // Make the raw coords into a path
                var str = ['M{1} {2}'.format(
                    this.coordsSpline[index][0][0],
                    this.coordsSpline[index][0][1]
                )];

                for (var i=1; i<this.coordsSpline[index].length; ++i) {
                    str.push('L{1} {2}'.format(
                        this.coordsSpline[index][i][0],
                        this.coordsSpline[index][i][1]
                    ));
                }
                
                str = str.join(' ');

                var line = RGraph.SVG.create({
                    svg: this.svg,
                    parent: properties.filled ? this.filledGroups[index] : this.svg.all,
                    type: 'path',
                    attr: {
                        d: str,
                        stroke: properties['colors'][index],
                        'fill':'none',
                        'stroke-width':  this.hasMultipleDatasets && properties.filled && properties.filledAccumulative ? 0.1 : (RGraph.SVG.isArray(properties.linewidth) ? properties.linewidth[index] : properties.linewidth + 0.01),
                        'stroke-dasharray': properties.dasharray,
                        'stroke-linecap': 'round',
                        'stroke-linejoin': 'round',
                        filter: properties.shadow ? 'url(#dropShadow)' : '',
                        'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                    }
                });

            } else {

                var path2 = RGraph.SVG.arrayClone(path);

                if (properties.filled && properties.filledAccumulative && index > 0) {
                    for (var i=this.coords2[index - 1].length-1; i>=0; --i) {
                        path2.push('L{1} {2}'.format(
                            this.coords2[index - 1][i][0],
                            this.coords2[index - 1][i][1]
                        ));
                    }
                }

                path2 = path2.join(' ');

                var line = RGraph.SVG.create({
                    svg: this.svg,
                    parent: properties.filled ? this.filledGroups[index] : this.svg.all,
                    type: 'path',
                    attr: {
                        d: path2,
                        stroke: properties.colors[index],
                        'fill':'none',
                        'stroke-dasharray': properties.dasharray,
                        'stroke-width': this.hasMultipleDatasets && properties.filled && properties.filledAccumulative ? 0.1 : (RGraph.SVG.isArray(properties.linewidth) ? properties.linewidth[index]: properties.linewidth + 0.01),
                        'stroke-linecap': 'round',
                        'stroke-linejoin': 'round',
                        filter: properties.shadow ? 'url(#dropShadow)' : '',
                        'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                    }
                });
            }






            if (properties.tooltips && properties.tooltips.length) {

                if (!this.svg.all.line_tooltip_hotspots) {

                    var group = RGraph.SVG.create({
                        svg: this.svg,
    
                        // Taken out on 11/12/17 so that hotspots can sit in this group
                        //parent: this.svg.all,
    
                        type: 'g',
                        attr: {
                            'fill': 'transparent',
                            className: "rgraph_hotspots"
                        },
                        style: {
                            cursor: 'pointer'
                        }
                    });
                    
                    // Store the group so it can be easily got to later on
                    this.svg.all.line_tooltip_hotspots = group;
                } else {
                    group = this.svg.all.line_tooltip_hotspots;
                }
                

                //for (var i=0; i<this.coords2[index].length; ++i,++this.tooltipsSequentialIndex) {
                for (var i=0;
                     i<this.coords2[index].length && (typeof properties.tooltips === 'string' ? true : this.tooltipsSequentialIndex < properties.tooltips.length);
                     ++i,++this.tooltipsSequentialIndex
                    ) {

                    if (!RGraph.SVG.isNull(this.originalData[index][i]) && (properties.tooltips[this.tooltipsSequentialIndex] || typeof properties.tooltips === 'string') && this.coords2[index][i][0] && this.coords2[index][i][1]) {

                        var hotspot = RGraph.SVG.create({
                            svg: this.svg,
                            parent: group,
                            type: 'circle',
                            attr: {
                                cx: this.coords2[index][i][0],
                                cy: this.coords2[index][i][1],
                                r: 10,
                                fill: 'transparent',
                                'data-dataset': index,
                                'data-index': i
                            },
                            style: {
                                cursor: 'pointer'
                            }
                        });

                        var obj = this;
                        (function (sequentialIndex)
                        {
                            hotspot.addEventListener(properties.tooltipsEvent, function (e)
                            {
                                var indexes = RGraph.SVG.sequentialIndexToGrouped(sequentialIndex, obj.data),
                                    index   = indexes[1],
                                    dataset = indexes[0];


                                if (RGraph.SVG.REG.get('tooltip') &&
                                    RGraph.SVG.REG.get('tooltip').__index__ === index &&
                                    RGraph.SVG.REG.get('tooltip').__dataset__ === dataset &&
                                    RGraph.SVG.REG.get('tooltip').__object__.uid === obj.uid) { // Added on the 27th/6/2019
                                    return;
                                }
                                
                                obj.removeHighlight();

                                RGraph.SVG.hideTooltip();

                                RGraph.SVG.tooltip({
                                    object:          obj,
                                    index:           index,
                                    dataset:         dataset,
                                    sequentialIndex: sequentialIndex,
                                    text:            typeof properties.tooltips === 'string' ? properties.tooltips : properties.tooltips[sequentialIndex],
                                    event:           e
                                });


                                // Highlight the chart here
                                var outer_highlight1 = RGraph.SVG.create({
                                    svg: obj.svg,
                                    parent: obj.svg.all,
                                    type: 'circle',
                                    attr: {
                                        cx: obj.coords2[dataset][index][0],
                                        cy: obj.coords2[dataset][index][1],
                                        r: 5,
                                        fill: obj.properties.colors[dataset],
                                        'fill-opacity': 0.5
                                    },
                                    style: {
                                        cursor: 'pointer'
                                    }
                                });


                                var outer_highlight2 = RGraph.SVG.create({
                                    svg: obj.svg,
                                    parent: obj.svg.all,
                                    type: 'circle',
                                    attr: {
                                        cx: obj.coords2[dataset][index][0],
                                        cy: obj.coords2[dataset][index][1],
                                        r: 14,
                                        fill: 'white',
                                        'fill-opacity': 0.75
                                    },
                                    style: {
                                        cursor: 'pointer'
                                    }
                                });


                                var inner_highlight1 = RGraph.SVG.create({
                                    svg: obj.svg,
                                    parent: obj.svg.all,
                                    type: 'circle',
                                    attr: {
                                        cx: obj.coords2[dataset][index][0],
                                        cy: obj.coords2[dataset][index][1],
                                        r: 6,
                                        fill: 'white'
                                    },
                                    style: {
                                        cursor: 'pointer'
                                    }
                                });


                                var inner_highlight2 = RGraph.SVG.create({
                                    svg: obj.svg,
                                    parent: obj.svg.all,
                                    type: 'circle',
                                    attr: {
                                        cx: obj.coords2[dataset][index][0],
                                        cy: obj.coords2[dataset][index][1],
                                        r: 5,
                                        fill: obj.properties.colors[dataset]
                                    },
                                    style: {
                                        cursor: 'pointer'
                                    }
                                });
                                
                                // Set the highlight in the registry
                                RGraph.SVG.REG.set('highlight', [
                                    outer_highlight1,
                                    outer_highlight2,
                                    inner_highlight1,
                                    inner_highlight2
                                ]);
                                
                            }, false);
                        })(this.tooltipsSequentialIndex);
    
                    }
                }
            }
        };








        //
        // Draws tickmarks
        //
        // @param number index  The index of the line/dataset of coordinates
        // @param object data   The origvinal line data points
        // @param object coords The coordinates of the points
        //
        this.drawTickmarks = function (index, data, coords)
        {
            var style      = typeof properties.tickmarksStyle === 'object'     ? properties.tickmarksStyle[index]     : properties.tickmarksStyle,
                size       = typeof properties.tickmarksSize === 'object'      ? properties.tickmarksSize[index]      : properties.tickmarksSize,
                fill       = typeof properties.tickmarksFill === 'object'      ? properties.tickmarksFill[index]      : properties.tickmarksFill,
                linewidth  = typeof properties.tickmarksLinewidth === 'object' ? properties.tickmarksLinewidth[index] : properties.tickmarksLinewidth;

            for (var i=0; i<data.length; ++i) {

                if (typeof data[i] === 'number') {
                    switch (style) {
                        case 'filledcircle':
                        case 'filledendcircle':
                            if (style === 'filledcircle' || (i === 0 || i === data.length - 1) ) {
                                var circle = RGraph.SVG.create({
                                    svg: this.svg,
                                    parent: this.svg.all,
                                    type: 'circle',
                                    attr: {
                                        cx: coords[index][i][0],
                                        cy: coords[index][i][1],
                                        r: size,
                                        'fill': properties.colors[index],
                                        filter: properties.shadow? 'url(#dropShadow)' : '',
                                        'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                                    }
                                });
                            }


                            break;

                        case 'circle':
                        case 'endcircle':

                            if (style === 'circle' || (style === 'endcircle' && (i === 0 || i === data.length - 1)) ) {

                                var outerCircle = RGraph.SVG.create({
                                    svg: this.svg,
                                    parent: this.svg.all,
                                    type: 'circle',
                                    attr: {
                                        cx: coords[index][i][0],
                                        cy: coords[index][i][1],
                                        r: size + this.get('linewidth'),
                                        'fill': properties.colors[index],
                                        filter: properties.shadow? 'url(#dropShadow)' : '',
                                        'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                                    }
                                });

                                var innerCircle = RGraph.SVG.create({
                                    svg: this.svg,
                                    parent: this.svg.all,
                                    type: 'circle',
                                    attr: {
                                        cx: coords[index][i][0],
                                        cy: coords[index][i][1],
                                        r: size,
                                        'fill': fill,
                                        'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                                    }
                                });

                                break;
                            }
                            break;

                        case 'endrect':
                        case 'rect':
                            if (style === 'rect' || (style === 'endrect' && (i === 0 || i === data.length - 1)) ) {
                            
                                var fill = typeof fill === 'object'&& typeof fill[index] === 'string' ? fill[index] : fill;
                            
                                var rect = RGraph.SVG.create({
                                    svg: this.svg,
                                    parent: this.svg.all,
                                    type: 'rect',
                                    attr: {
                                        x:      coords[index][i][0] - size,
                                        y:      coords[index][i][1] - size,
                                        width:  size + size + linewidth,
                                        height: size + size + linewidth,
                                        'stroke-width': this.get('linewidth'),
                                        'stroke': properties.colors[index],
                                        'fill': fill,
                                        'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                                    }
                                });
                            }
                            
                            break;

                        case 'filledendrect':
                        case 'filledrect':
                            if (style === 'filledrect' || (style === 'filledendrect' && (i === 0 || i === data.length - 1)) ) {

                                var fill = properties.colors[index];

                                var rect = RGraph.SVG.create({
                                    svg: this.svg,
                                    parent: this.svg.all,
                                    type: 'rect',
                                    attr: {
                                        x:      coords[index][i][0] - size,
                                        y:      coords[index][i][1] - size,
                                        width:  size + size + linewidth,
                                        height: size + size + linewidth,
                                        'fill': fill,
                                        'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                                    }
                                });
                            }
                    }
                }
            }
        };








        //
        // Redraws the line in certain circumstances:
        //  o filled
        //  o filledAccumulative
        //  o Multiple lines
        //
        this.redrawLines = function ()
        {
            if (properties.spline) {
                for (var i=0; i<this.coordsSpline.length; ++i) {

                    var linewidth = RGraph.SVG.isArray(properties.linewidth) ? properties.linewidth[i] : properties.linewidth,
                        color     = properties['colors'][i],
                        path      = '';
                    
                    // Create the path from the spline coordinates
                    for (var j=0; j<this.coordsSpline[i].length; ++j) {
                        if (j === 0) {
                            path += 'M{1} {2} '.format(
                                this.coordsSpline[i][j][0],
                                this.coordsSpline[i][j][1]
                            );
                        } else {
                            path += 'L{1} {2} '.format(
                                this.coordsSpline[i][j][0],
                                this.coordsSpline[i][j][1]
                            );
                        }
                    }



                    RGraph.SVG.create({
                        svg: this.svg,
                        parent: properties.filled ? this.filledGroups[i] : this.svg.all,
                        type: 'path',
                        attr: {
                            d: path,
                            stroke: color,
                            'fill':'none',
                            'stroke-dasharray': properties.dasharray,
                            'stroke-width':  linewidth + 0.01,
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            filter: properties.shadow ? 'url(#dropShadow)' : '',
                            'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                        }
                    });
                }
                

                // Now draw the tickmarks
                for (var dataset=0; dataset<this.coords2.length; ++dataset) {
                    this.drawTickmarks(
                        dataset,
                        this.data[dataset],
                        this.coords2
                    );
                }

            } else {


                for (var i=0; i<this.coords2.length; ++i) {

                    var linewidth = RGraph.SVG.isArray(properties.linewidth) ? properties.linewidth[i] : properties.linewidth,
                        color     = properties['colors'][i],
                        path      = '';

                    // Create the path from the coordinates
                    for (var j=0; j<this.coords2[i].length; ++j) {
                        if (j === 0 || RGraph.SVG.isNull(this.data[i][j]) || RGraph.SVG.isNull(this.data[i][j - 1])) {
                            path += 'M{1} {2} '.format(
                                this.coords2[i][j][0],
                                RGraph.SVG.isNull(this.data[i][j]) ? 0 : this.coords2[i][j][1]
                            );
                        } else {
                            if (properties.stepped) {
                                path += 'L{1} {2} '.format(
                                    this.coords2[i][j][0],
                                    this.coords2[i][j - 1][1]
                                );
                            }

                            path += 'L{1} {2} '.format(
                                this.coords2[i][j][0],
                                this.coords2[i][j][1]
                            );
                        }
                    }



                    RGraph.SVG.create({
                        svg: this.svg,
                        parent: properties.filled ? this.filledGroups[i] : this.svg.all,
                        type: 'path',
                        attr: {
                            d: path,
                            stroke: color,
                            'fill':'none',
                            'stroke-dasharray': properties.dasharray,
                            'stroke-width':  linewidth + 0.01,
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            filter: properties.shadow ? 'url(#dropshadow)' : '',
                            'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                        }
                    });

                }

                // Now draw the tickmarks
                for (var dataset=0; dataset<this.coords2.length; ++dataset) {
                    this.drawTickmarks(
                        dataset,
                        this.data[dataset],
                        this.coords2
                    );
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
            var y;

            if (value > this.scale.max) {
                return null;
            }

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
        // TODO This function looks like its needs updating
        // 
        // @param object rect The rectangle to highlight
        //
        this.highlight = function (rect)
        {
            var x = rect.getAttribute('x'),
                y = rect.getAttribute('y');
        };








        //
        // Remove highlight from the chart (tooltips)
        //
        this.removeHighlight = function ()
        {
            var highlight = RGraph.SVG.REG.get('highlight');

            if (highlight && highlight.parentNode) {
                highlight.parentNode.removeChild(highlight);
            
            } else if (highlight) {
                // The highlight is an array
                for (var i=0; i<highlight.length; ++i) {
                    if (highlight[i] && highlight[i].parentNode) {
                        highlight[i].parentNode.removeChild(highlight[i]);
                    }
                }
            }
            
            RGraph.SVG.REG.set('highlight', null);
        };








        //
        // Draw a spline Line chart
        //
        // @param array coords The coords for the line
        //
        this.drawSpline = function (coords)
        {
            var xCoords      = [];
                marginLeft   = properties.marginLeft,
                marginRight  = properties.marginRight,
                hmargin      = properties.marginInner,
                interval     = (this.graphWidth - (2 * hmargin)) / (coords.length - 1),
                coordsSpline = [];

            //
            // The drawSpline function takes an array of JUST Y coords - not X/Y coords. So the line coords need converting
            // if we've been given X/Y pairs
            //
            for (var i=0,len=coords.length; i<len;i+=1) {
                if (typeof coords[i] == 'object' && coords[i] && coords[i].length == 2) {
                    coords[i] = Number(coords[i][1]);
                }
            }

            //
            // Get the Points array in the format we want - the first value should
            // be null along with the lst value
            //
            var P = [coords[0]];
            for (var i=0; i<coords.length; ++i) {
                P.push(coords[i]);
            }
            P.push(coords[coords.length - 1] + (coords[coords.length - 1] - coords[coords.length - 2]));

            for (var j=1; j<P.length-2; ++j) {
                for (var t=0; t<10; ++t) {
                    
                    var yCoord = spline( t/10, P[j-1], P[j], P[j+1], P[j+2] );
    
                    xCoords.push(((j-1) * interval) + (t * (interval / 10)) + marginLeft + hmargin);

                    coordsSpline.push([
                        xCoords[xCoords.length - 1],
                        yCoord
                    ]);
                    
                    if (typeof index === 'number') {
                        coordsSpline[index].push([
                            xCoords[xCoords.length - 1],
                            yCoord
                        ]);
                    }
                }
            }


            // Draw the last section
            coordsSpline.push([
                ((j-1) * interval) + marginLeft + hmargin,
                P[j]
            ]);

            if (typeof index === 'number') {
                coordsSpline.push([
                    ((j-1) * interval) + marginLeft + hmargin,
                    P[j]
                ]);
            }

            function spline (t, P0, P1, P2, P3)
            {
                return 0.5 * ((2 * P1) +
                             ((0-P0) + P2) * t +
                             ((2*P0 - (5*P1) + (4*P2) - P3) * (t*t) +
                             ((0-P0) + (3*P1)- (3*P2) + P3) * (t*t*t)));
            }
            
            // Add some properties to the coordinates
            for (var i=0; i<coordsSpline.length; ++i) {
                coordsSpline[i].object = this;
                coordsSpline[i].x      = this;
                coordsSpline[i].y      = this;
            }

            return coordsSpline;
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function () 
        {
            if (!Object.keys(this.originalColors).length) {
                this.originalColors = {
                    colors:              RGraph.SVG.arrayClone(properties.colors),
                    filledColors:        RGraph.SVG.arrayClone(properties.filledColors),
                    backgroundGridColor: RGraph.SVG.arrayClone(properties.backgroundGridColor),
                    //highlightFill:       RGraph.SVG.arrayClone(properties.highlightFill),
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
            
            
            // Fill colors
            var filledColors = properties.filledColors;

            if (filledColors) {
                for (var i=0; i<filledColors.length; ++i) {
                    filledColors[i] = RGraph.SVG.parseColorLinear({
                        object: this,
                        color: filledColors[i]
                    });
                }
            }

            properties.backgroundGridColor = RGraph.SVG.parseColorLinear({object: this, color: properties.backgroundGridColor});
            //properties.highlightFill       = RGraph.SVG.parseColorLinear({object: this, color: properties.highlightFill});
            properties.backgroundColor     = RGraph.SVG.parseColorLinear({object: this, color: properties.backgroundColor});
        };








        //
        // Draws the labelsAbove
        //
        this.drawLabelsAbove = function ()
        {
            // Go through the above labels
            if (properties.labelsAbove) {
            
                var data_seq = RGraph.SVG.arrayLinearize(this.data),
                    seq      = 0;

                for (var dataset=0; dataset<this.coords2.length; ++dataset,seq++) {
                    for (var i=0; i<this.coords2[dataset].length; ++i,seq++) {
    
                        var str = RGraph.SVG.numberFormat({
                            object:    this,
                            num:       this.data[dataset][i].toFixed(properties.labelsAboveDecimals ),
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
                        
                        // Get the text configuration for the above labels
                        var textConf = RGraph.SVG.getTextConf({
                            object: this,
                            prefix: 'labelsAbove'
                        });

                        RGraph.SVG.text({

                            object:     this,
                            parent:     this.svg.all,
                            tag:        'labels.above',

                            text:       str,

                            x:          parseFloat(this.coords2[dataset][i][0]) + properties.labelsAboveOffsetx,
                            y:          parseFloat(this.coords2[dataset][i][1]) + properties.labelsAboveOffsety,

                            halign:     properties.labelsAboveHalign,
                            valign:     properties.labelsAboveValign,
                            
                            font:   textConf.font,
                            size:   textConf.size,
                            bold:   textConf.bold,
                            italic: textConf.italic,
                            color:  textConf.color,

                            background: properties.labelsAboveBackground        || null,
                            padding:    properties.labelsAboveBackgroundPadding || 0
                        });
                    }
                    
                    // Necessary so that the seq doesn't get incremented twice
                    seq--;
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








        // This function is used to draw the errorbar. Its in the common
        // file because it's used by multiple chart libraries
        this.drawErrorbar = function (opt)
        {
            var linewidth = RGraph.SVG.getErrorbarsLinewidth({object: this, index: opt.index}),
                color     = RGraph.SVG.getErrorbarsColor({object: this, index: opt.sequential}),
                capwidth  = RGraph.SVG.getErrorbarsCapWidth({object: this, index: opt.index}),
                index     = opt.index,
                dataset   = opt.dataset,
                x         = opt.x,
                y         = opt.y,
                value     = this.data[dataset][index];

            
            // Get the Y coord of the point
            var y = this.getYCoord(y);

        
        
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
        
        
        
        
        
        
            var x = this.coords2[dataset][index].x,
                y = this.coords2[dataset][index].y,
                halfCapWidth = capwidth / 2,
                y1 = this.getYCoord(value + max),
                y3 = this.getYCoord(value - min) === null ? y : this.getYCoord(value - min);
        
        
            if (max > 0) {
        
                // Draw the UPPER vertical line
                var errorbarLine = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'line',
                    parent: this.svg.all,
                    attr: {
                        x1: x,
                        y1: y,
                        x2: x,
                        y2: y1,
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
                        x1: x - halfCapWidth,
                        y1: y1,
                        x2: x + halfCapWidth,
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
                    parent: this.svg.all,
                    attr: {
                        x1: x,
                        y1: y,
                        x2: x,
                        y2: y3,
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
                        x1: x - halfCapWidth,
                        y1: y3,
                        x2: x + halfCapWidth,
                        y2: y3,
                        stroke: color,
                        'stroke-width': linewidth
                    }
                });
            }
        };








        //
        // A trace effect
        //
        //  @param object    Options to give to the effect
        // @param  function  A function to call when the effect has completed
        //
        this.trace = function ()
        {
            var opt      = arguments[0] || {},
                frame    = 1,
                frames   = opt.frames || 60,
                obj      = this;
            
            this.isTrace = true;

            this.draw();
                


            // Create the clip area
            var clippath = RGraph.SVG.create({
                svg: this.svg,
                parent: this.svg.defs,
                type: 'clipPath',
                attr: {
                    id: 'trace-effect-clip'
                }
            });

            var clippathrect = RGraph.SVG.create({
                svg: this.svg,
                parent: clippath,
                type: 'rect',
                attr: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: this.height
                }
            });

            var iterator = function ()
            {
                var width = (frame++) / frames * obj.width;

                clippathrect.setAttribute("width", width);

                if (frame <= frames) {
                    RGraph.SVG.FX.update(iterator);
                } else {
                    
                    // Remove the clippath
                    clippath.parentNode.removeChild(clippath);
                    
                    if (opt.callback) {
                        (opt.callback)(obj);
                    }
                }
            };
            
            iterator();
            
            return this;
        };








        //
        // A worker function that handles Bar chart specific tooltip substitutions
        //
        this.tooltipSubstitutions = function (opt)
        {
            var indexes = RGraph.SVG.sequentialIndexToGrouped(opt.index, this.data);

            // Create the values array which contains each datasets value
            for (var i=0,values=[]; i<this.originalData.length; ++i) {
                values.push(this.originalData[i][indexes[1]]);
            }

            return {
                  index: indexes[1],
                dataset: indexes[0],
        sequentialIndex: opt.index,
                  value: typeof this.data[indexes[0]] === 'number' ? this.data[indexes[0]] : this.data[indexes[0]][indexes[1]],
                 values: values
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
                + coords[0]                      // The X coordinate of the bar on the chart
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
            ) + 'px';

            args.tooltip.style.top  = (
                  svgXY[1]                       // The Y coordinate of the canvas
                + coords[1]                      // The Y coordinate of the bar on the chart
                - tooltip.offsetHeight           // The height of the tooltip
                - 15                             // An arbitrary amount
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
    }
    
    
    
    return this;




// End module pattern
})(window, document);