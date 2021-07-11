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

    //
    // The traditional radar chart constructor
    // 
    // @param string id   The ID of the canvas
    // @param array  data An array of data to represent
    //
    RGraph.Radar = function (conf)
    {
        conf.data = RGraph.stringsToNumbers(conf.data);

        if (typeof conf.data[0] === 'number') {
            conf.data = [conf.data];
        }

        this.id                = conf.id;
        this.canvas            = document.getElementById(conf.id);
        this.context           = this.canvas.getContext ? this.canvas.getContext("2d") : null;
        this.canvas.__object__ = this;
        this.type              = 'radar';
        this.isRGraph          = true;
        this.isrgraph          = true;
        this.rgraph            = true;
        this.data              = [];
        this.max               = 0;
        this.uid               = RGraph.createUID();
        this.canvas.uid        = this.canvas.uid ? this.canvas.uid : RGraph.createUID();
        this.colorsParsed      = false;
        this.coords            = [];
        this.coordsText        = [];
        this.original_data     = [];
        this.original_colors   = [];
        this.firstDraw         = true; // After the first draw this will be false





        //
        // Add the data to the .original_data array and work out the max value
        // 
        // 2/5/14 Now also use this loop to ensure that the data pieces
        //        are numbers
        //
        for (var i=0,len=conf.data.length; i<len; ++i) {
        
            // Convert strings to numbers
            for (var j=0; j<conf.data[i].length; ++j) {
                if (typeof conf.data[i][j] === 'string') {
                    conf.data[i][j] = parseFloat(conf.data[i][j]);
                }
            }
        
            this.original_data.push(RGraph.arrayClone(conf.data[i]));
            this.data.push(RGraph.arrayClone(conf.data[i]));
            this.max = Math.max(this.max, RGraph.arrayMax(conf.data[i]));
        }


        this.properties =
        {
            marginLeft:           35,
            marginRight:          35,
            marginTop:            35,
            marginBottom:         35,

            linewidth:             1,

            colorsStroke:           '#aaa',
            colors:                ['rgba(255,0,0,0.75)','rgba(0,255,255,0.25)','rgba(255,0,0,0.5)', 'red', 'green', 'blue', 'pink', 'aqua','brown','orange','grey'],
            colorsAlpha:          null,
            circle:                0,

            circleFill:           'red',
            circleStroke:         'black',

            labels:                [],
            labelsFont:           null,
            labelsSize:           null,
            labelsColor:          null,
            labelsBold:           null,
            labelsSize:           null,
            labelsOffsetRadius:   0,

            labelsBackgroundFill: 'white',
            labelsBoxed:           false,

            labelsAxes:            '',
            labelsAxesFont:       null,
            labelsAxesSize:       null,
            labelsAxesColor:      null,
            labelsAxesBold:       null,
            labelsAxesItalic:     null,
            labelsAxesBoxed:      null, // This defaults to true - but that's set in the Draw() method
            labelsAxesBoxedZero: true,
            labelsAxesBoxedBackground: 'rgba(255,255,255,0.7)',
            labelsAxesSpecific:   null,
            labelsAxesCount:      5,
            labelsAxesOffsetx:    0,
            labelsAxesOffsety:    0,

            backgroundCircles:    true,
            backgroundCirclesCount: null,
            backgroundCirclesColor: '#ddd',
            backgroundCirclesPoly:  true,
            backgroundCirclesSpokes: 24,

            textSize:             12,
            textFont:             'Arial, Verdana, sans-serif',
            textColor:            'black',
            textBold:             false,
            textItalic:           false,
            textAccessible:               true,
            textAccessibleOverflow:      'visible',
            textAccessiblePointerevents: false,

            title:                 '',
            titleBackground:      null,
            titleHpos:            null,
            titleVpos:            null,
            titleColor:           null,
            titleBold:            null,
            titleItalic:          null,
            titleSize:            null,
            titleFont:            null,
            titleX:               null,
            titleY:               null,
            titleHalign:          null,
            titleValign:          null,
            titleOffsetx:         0,
            titleOffsety:         0,

            linewidth:             1,

            key:                   null,
            keyBackground:        'white',
            keyShadow:            false,
            keyShadowColor:       '#666',
            keyShadowBlur:        3,
            keyShadowOffsetx:     2,
            keyShadowOffsety:     2,
            keyPosition:          'graph',
            keyHalign:             'right',
            keyPositionGutterBoxed: false,
            keyPositionX:         null,
            keyPositionY:         null,
            keyColorShape:        'square',
            keyRounded:            true,
            keyLinewidth:          1,
            keyColors:             null,
            keyInteractive:        false,
            keyInteractiveHighlightChartStroke: 'rgba(255,0,0,0.3)',
            keyInteractiveHighlightLabel: 'rgba(255,0,0,0.2)',
            keyLabelsColor:        null,
            keyLabelsFont:         null,
            keyLabelsSize:         null,
            keyLabelsBold:         null,
            keyLabelsItalic:       null,
            keyLabelsOffsetx:      0,
            keyLabelsOffsety:      0,

            contextmenu:           null,

            annotatable:           false,
            annotateColor:        'black',
            annotateLinewidth:    1,

            tooltips:                   null,
            tooltipsEvent:              'mousemove',
            tooltipsEffect:             'fade',
            tooltipsCssClass:           'RGraph_tooltip',
            tooltipsCss:                null,
            tooltipsHighlight:          true,
            tooltipsNohideonclear:      false,
            tooltipsFormattedThousand:  ',',
            tooltipsFormattedPoint:     '.',
            tooltipsFormattedDecimals:  0,
            tooltipsFormattedUnitsPre:  '',
            tooltipsFormattedUnitsPost: '',
            tooltipsFormattedKeyColors: null,
            tooltipsFormattedKeyColorsShape: 'square',
            tooltipsFormattedKeyLabels: [],
            tooltipsFormattedListType:  'ul',
            tooltipsFormattedListItems: null,
            tooltipsFormattedTableHeaders: null,
            tooltipsFormattedTableData: null,
            tooltipsPointer:            true,
            tooltipsPositionStatic:     true,

            highlightStroke:       'gray',
            highlightFill:         'rgba(255,255,255,0.7)',
            highlightPointRadius: 2,

            resizable:              false,
            resizeHandleAdjust:   [0,0],
            resizeHandleBackground: null,

            scaleMax:              null,
            scaleDecimals:         0,
            scalePoint:            '.',
            scaleThousand:         ',',
            scaleUnitsPre:        '',
            scaleUnitsPost:       '',

            accumulative:           false,

            radius:                 null,

            centerx:              null,
            centery:              null,
            radius:               null,

            xaxisTickmarksCount:  5,

            yaxisTickmarksCount:  5,

            axesColor:           'rgba(0,0,0,0)',

            highlights:           false,
            highlightsStroke:    '#ddd',
            highlightsFill:      null,
            highlightsRadius:    3,
            highlightStyleInvertStroke: 'transparent',
            highlightStyleInvertFill: 'rgba(255,255,255,0.7)',

            fillClick:           null,
            fillMousemove:       null,
            fillTooltips:        null,
            fillHighlightFill:   'rgba(255,255,255,0.7)',
            fillHighlightStroke: 'rgba(0,0,0,0)',
            fillMousemoveRedraw: false,

            animationTraceClip: 1,

            clearto:   'rgba(0,0,0,0)'
        }



        // Must have at least 3 points
        for (var dataset=0; dataset<this.data.length; ++dataset) {
            if (this.data[dataset].length < 3) {
                alert('[RADAR] You must specify at least 3 data points');
                return;
            }
        }
        
        
        //
        // Linearize the data and then create the $ objects
        //
        var idx = 0;
        this.data_arr = [];
        for (var dataset=0; dataset<this.data.length; ++dataset) {
            for (var i=0,len=this.data[dataset].length; i<len; ++i) {
                this['$' + (idx++)] = {};
                this.data_arr.push(this.data[dataset][i])
            }
        }




        // Easy access to  properties and the path function
        var properties = this.properties;
        this.path      = RGraph.pathObjectFunction;
        
        
        
        //
        // "Decorate" the object with the generic effects if the effects library has been included
        //
        if (RGraph.Effects && typeof RGraph.Effects.decorate === 'function') {
            RGraph.Effects.decorate(this);
        }
        
        
        
        // Add the responsive method. This method resides in the common file.
        this.responsive = RGraph.responsive;








        //
        // A simple setter
        //
        this.set = function (name)
        {

            var value = typeof arguments[1] === 'undefined' ? null : arguments[1];

            if (name === 'labelsOffset') {
                name = 'labelsOffsetRadius';
            }

            // the number of arguments is only one and it's an
            // object - parse it for configuration data and return.
            if (arguments.length === 1 && typeof arguments[0] === 'object') {
                for (i in arguments[0]) {
                    if (typeof i === 'string') {
                        this.set(i, arguments[0][i]);
                    }
                }

                return this;
            }

            properties[name] = value;

            return this;
        };








        //
        // A simple getter
        // 
        // @param string name  The name of the property to get
        //
        this.get = function (name)
        {
            return properties[name];
        };






 

        //
        // The draw method which does all the brunt of the work
        //
        this.draw = function ()
        {
            //
            // Fire the onbeforedraw event
            //
            RGraph.fireCustomEvent(this, 'onbeforedraw');



            // Translate half a pixel for antialiasing purposes - but only if it hasn't been
            // done already
            //
            // MUST be the first thing done!
            //
            if (!this.canvas.__rgraph_aa_translated__) {
                this.context.translate(0.5,0.5);
            
                this.canvas.__rgraph_aa_translated__ = true;
            }


            // NB: Colors are parsed further down
    
            // Reset the coords array to stop it growing
            this.coords     = [];
            this.coords2    = [];
            this.coordsText = [];
    
            //
            // Reset the data to the original_data
            //
            this.data = RGraph.arrayClone(this.original_data);

            // Loop thru the data array if the accumulative option is enable checking to see if all the
            // datasets have the same number of elements.
            if (properties.accumulative) {
                for (var i=0; i<this.data.length; ++i) {
                    if (this.data[i].length != this.data[0].length) {
                        alert('[RADAR] Error! When the radar has the accumulative option set to true all the datasets must have the same number of elements');
                    }
                }
            }
    
    
            //
            // This defaults to true, but needs to be an array with a size matching the number of
            // labels.
            //
            if (RGraph.isNull(properties.labelsAxesBoxed)) {
                properties.labelsAxesBoxed = [];
                for (var i=0; i<( (RGraph.isArray(properties.labelsAxesSpecific) && properties.labelsAxesSpecific.length) || properties.labelsAxesCount || 5); ++i) {
                    properties.labelsAxesBoxed[i] = false;
                }
            }



            //
            // Make the margins easy to access
            //            
            this.marginLeft   = properties.marginLeft;
            this.marginRight  = properties.marginRight;
            this.marginTop    = properties.marginTop;
            this.marginBottom = properties.marginBottom;
    
            this.centerx  = ((this.canvas.width - this.marginLeft - this.marginRight) / 2) + this.marginLeft;
            this.centery  = ((this.canvas.height - this.marginTop - this.marginBottom) / 2) + this.marginTop;
            this.radius   = Math.min(this.canvas.width - this.marginLeft - this.marginRight, this.canvas.height - this.marginTop - this.marginBottom) / 2;
    
    
    
            //
            // Allow these to be set by hand
            //
            if (typeof properties.centerx === 'number') this.centerx = 2 * properties.centerx;
            if (typeof properties.centery === 'number') this.centery = 2 * properties.centery;
            if (typeof properties.radius  === 'number') this.radius  = properties.radius;
    
    
            //
            // Parse the colors for gradients. Its down here so that the center X/Y can be used
            //
            if (!this.colorsParsed) {
    
                this.parseColors();
    
                // Don't want to do this again
                this.colorsParsed = true;
            }
    
    
    
            // Work out the maximum value and the sum
            if (!properties.scaleMax) {
    
                // this.max is calculated in the constructor
    
                // Work out this.max again if the chart is (now) set to be accumulative
                if (properties.accumulative) {
                    
                    var accumulation = [];
                    var len = this.original_data[0].length
    
                    for (var i=1; i<this.original_data.length; ++i) {
                        if (this.original_data[i].length != len) {
                            alert('[RADAR] Error! Stacked Radar chart datasets must all be the same size!');
                        }
                        
                        for (var j=0; j<this.original_data[i].length; ++j) {
                            this.data[i][j] += this.data[i - 1][j];
                            this.max = Math.max(this.max, this.data[i][j]);
                        }
                    }
                }
    
    
                this.scale2 = RGraph.getScale({object: this, options: {
                    'scale.max':          typeof properties.scaleMax === 'number' ? properties.scaleMax : this.max,
                    'scale.min':          0,
                    'scale.decimals':     Number(properties.scaleDecimals),
                    'scale.point':        properties.scalePoint,
                    'scale.thousand':     properties.scaleThousand,
                    'scale.round':        properties.scaleRound,
                    'scale.units.pre':    properties.scaleUnitsPre,
                    'scale.units.post':   properties.scaleUnitsPost,
                    'scale.labels.count': properties.labelsAxesCount
                }});
                this.max = this.scale2.max;
    
            } else {
                
                var ymax = properties.scaleMax;
    
                this.scale2 = RGraph.getScale({object: this, options: {
                    'scale.max':          ymax,
                    'scale.min':          0,
                    'scale.strict':       true,
                    'scale.decimals':     Number(properties.scaleDecimals),
                    'scale.point':        properties.scalePoint,
                    'scale.thousand':     properties.scaleThousand,
                    'scale.round':        properties.scaleRound,
                    'scale.units.pre':    properties.scaleUnitsPre,
                    'scale.units.post':   properties.scaleUnitsPost,
                    'scale.labels.count': properties.labelsAxesCount
                }});
                this.max = this.scale2.max;
            }

            this.drawBackground();
            this.drawAxes();
            this.drawCircle();
            this.drawLabels();


            //
            // Allow clipping (for the trace() effect for example)
            //
            this.context.save();
                this.context.beginPath();
                    this.context.arc(this.centerx, this.centery, this.radius * 2, -RGraph.HALFPI, (RGraph.TWOPI * properties.animationTraceClip) - RGraph.HALFPI, false);
                    this.context.lineTo(this.centerx, this.centery);
                this.context.closePath();
                this.context.clip();
    
                this.drawChart();
                this.drawHighlights();
            this.context.restore();
            
            //
            // Draw the axis labels
            //
            this.drawAxisLabels();
            
            // Draw the title
            if (properties.title) {
                RGraph.drawTitle(
                    this,
                    properties.title,
                    this.marginTop,
                    null,
                    null
                )
            }
    
            // Draw the key if necessary
            // obj, key, colors
            if (properties.key) {
                RGraph.drawKey(this, properties.key, properties.colors);
            }
    
            //
            // Show the context menu
            //
            if (properties.contextmenu) {
                RGraph.showContext(this);
            }
    
            
            //
            // This function enables resizing
            //
            if (properties.resizable) {
                RGraph.allowResizing(this);
            }
    
    
            //
            // This installs the event listeners
            //
            RGraph.installEventListeners(this);

            //
            // This installs the Radar chart specific area listener
            //
            if ( (properties.fillClick || properties.fillMousemove || !RGraph.isNull(properties.fillTooltips)) && !this.__fill_click_listeners_installed__) {
                this.addFillListeners();
                this.__fill_click_listeners_installed__ = true;
            }



            //
            // Fire the onfirstdraw event
            //
            if (this.firstDraw) {
                this.firstDraw = false;
                RGraph.fireCustomEvent(this, 'onfirstdraw');
                this.firstDrawFunc();
            }




            //
            // Fire the RGraph draw event
            //
            RGraph.fireCustomEvent(this, 'ondraw');
            
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
        // Draws the background circles
        //
        this.drawBackground = function ()
        {
            var color   = properties.backgroundCirclesColor;
            var poly    = properties.backgroundCirclesPoly;
            var spacing = properties.backgroundCirclesSpacing;
            var spokes  = properties.backgroundCirclesSpokes;
    
    
    
    
            // Set the linewidth for the grid (so that repeated redrawing works OK)
            this.context.lineWidth = 1;
    
    
    
    
            //
            // Draws the background circles
            //
            if (properties.backgroundCircles && poly == false) {
    
    
    
    
    
                // Draw the concentric circles
                this.context.strokeStyle = color;
               this.context.beginPath();
                    
                    var numrings = typeof properties.backgroundCirclesCount == 'number' ? properties.backgroundCirclesCount : properties.labelsAxesCount;

                    // TODO Currently set to 5 - needs changing
                   for (var r=0; r<=this.radius; r+=(this.radius / numrings)) {
                        this.context.moveTo(this.centerx, this.centery);
                        this.context.arc(this.centerx, this.centery,r, 0, RGraph.TWOPI, false);
                    }
                this.context.stroke();
    
    
    
    
        
                //
                // Draw the diagonals/spokes
                //
                this.context.strokeStyle = color;
    
                for (var i=0; i<360; i+=(360 / spokes)) {
                    this.context.beginPath();
                        this.context.arc(
                            this.centerx,
                            this.centery,
                            this.radius,
                            (i / 360) * RGraph.TWOPI,
                            ((i+0.001) / 360) * RGraph.TWOPI,
                            false
                        ); // The 0.01 avoids a bug in Chrome 6
                        this.context.lineTo(this.centerx, this.centery);
                    this.context.stroke();
                }
    
    
    
    
    
    
            //
            // The background"circles" are actually drawn as a poly based on how
            // many points there are
            // (ie hexagons if there are 6 points, squares if there are four etc)
            //
            } else if (properties.backgroundCircles && poly == true) {

                //
                // Draw the diagonals/spokes
                //
                this.context.strokeStyle = color;
                var increment = 360 / this.data[0].length
    
                for (var i=0; i<360; i+=increment) {

                    this.context.beginPath();
                        this.context.arc(
                            this.centerx,
                            this.centery,
                            this.radius,
                            ((i / 360) * RGraph.TWOPI) - RGraph.HALFPI,
                            (((i + 0.001) / 360) * RGraph.TWOPI) - RGraph.HALFPI,
                        false); // The 0.001 avoids a bug in Chrome 6
                        this.context.lineTo(this.centerx, this.centery);
                    this.context.stroke();
                }
    
    
                //
                // Draw the lines that go around the Radar chart
                //
                this.context.strokeStyle = color;
                
                var numrings = typeof properties.backgroundCirclesCount === 'number' ? properties.backgroundCirclesCount : properties.labelsAxesCount;

                for (var r=0; r<=this.radius; r+=(this.radius / numrings)) {
                    this.context.beginPath();
                        for (var a=0; a<=360; a+=(360 / this.data[0].length)) {
                            this.context.arc(
                                this.centerx,
                                this.centery,
                                r,
                                RGraph.toRadians(a) - RGraph.HALFPI,
                                RGraph.toRadians(a) + 0.001 - RGraph.HALFPI,
                                false
                            );
                        }
                    this.context.closePath();
                    this.context.stroke();
                }
            }
        };








        //
        // Draws the axes
        //
        this.drawAxes = function ()
        {
            this.context.strokeStyle = properties.axesColor;
            this.context.lineWidth   = properties.axesLinewidth;
    
            var halfsize = this.radius;
    
            this.context.beginPath();
                //
                // The Y axis
                //
                this.context.moveTo(Math.round(this.centerx), this.centery + this.radius);
                this.context.lineTo(Math.round(this.centerx), this.centery - this.radius);
                
        
                // Draw the bits at either end of the Y axis
                this.context.moveTo(this.centerx - 5, Math.round(this.centery + this.radius));
                this.context.lineTo(this.centerx + 5, Math.round(this.centery + this.radius));
                this.context.moveTo(this.centerx - 5, Math.round(this.centery - this.radius));
                this.context.lineTo(this.centerx + 5, Math.round(this.centery - this.radius));
    
                // Draw Y axis tick marks
                for (var y=(this.centery - this.radius); y<(this.centery + this.radius); y+=(this.radius/properties.yaxisTickmarksCount)) {
                    this.context.moveTo(this.centerx - 3, Math.round(y));
                    this.context.lineTo(this.centerx + 3, Math.round(y));
                }
        
                //
                // The X axis
                //
                this.context.moveTo(this.centerx - this.radius, Math.round(this.centery));
                this.context.lineTo(this.centerx + this.radius, Math.round(this.centery));
        
                // Draw the bits at the end of the X axis
                this.context.moveTo(Math.round(this.centerx - this.radius), this.centery - 5);
                this.context.lineTo(Math.round(this.centerx - this.radius), this.centery + 5);
                this.context.moveTo(Math.round(this.centerx + this.radius), this.centery - 5);
                this.context.lineTo(Math.round(this.centerx + this.radius), this.centery + 5);
        
                // Draw X axis tick marks
                for (var x=(this.centerx - this.radius); x<(this.centerx + this.radius); x+=(this.radius/properties.xaxisTickmarksCount)) {
                    this.context.moveTo(Math.round(x), this.centery - 3);
                    this.context.lineTo(Math.round(x), this.centery + 3);
                }
    
            // Stroke it
            this.context.stroke();
        };








        //
        // The function which actually draws the radar chart
        //
        this.drawChart = function ()
        {
            var alpha = properties.colorsAlpha;
    
            if (typeof alpha == 'number') {
                var oldAlpha = this.context.globalAlpha;
                this.context.globalAlpha = alpha;
            }

            var numDatasets = this.data.length;
    
            for (var dataset=0; dataset<this.data.length; ++dataset) {
    
                this.context.beginPath();
    
                    var coords_dataset = [];
        
                    for (var i=0; i<this.data[dataset].length; ++i) {
                        
                        var coords = this.getCoordinates(dataset, i);
    
                        if (coords_dataset == null) {
                            coords_dataset = [];
                        }
    
                        coords_dataset.push(coords);
                        this.coords.push(coords);
                    }
                    
                    this.coords2[dataset] = coords_dataset;
                    
    
                    //
                    // Now go through the coords and draw the chart itself
                    //
                    // 18/5/2012 - colorsStroke can now be an array of colors as well as a single color
                    //
    
                    this.context.strokeStyle = (typeof properties.colorsStroke == 'object' && properties.colorsStroke[dataset]) ? properties.colorsStroke[dataset] : properties.colorsStroke;
                    this.context.fillStyle   = properties.colors[dataset] ? properties.colors[dataset] : 'rgba(0,0,0,0)';
                    if (this.context.fillStyle === 'transparent') {
                        this.context.fillStyle = 'rgba(0,0,0,0)';
                    }
                    this.context.lineWidth   = properties.linewidth;
    
                    for (i=0; i<coords_dataset.length; ++i) {
                        if (i == 0) {
                            this.context.moveTo(coords_dataset[i][0], coords_dataset[i][1]);
                        } else {
                            this.context.lineTo(coords_dataset[i][0], coords_dataset[i][1]);
                        }
                    }
                    
    
                    // If on the second or greater dataset, backtrack
                    if (properties.accumulative && dataset > 0) {
    
                        // This goes back to the start coords of this particular dataset
                        this.context.lineTo(coords_dataset[0][0], coords_dataset[0][1]);
                        
                        //Now move down to the end point of the previous dataset
                        this.context.moveTo(last_coords[0][0], last_coords[0][1]);
    
                        for (var i=coords_dataset.length - 1; i>=0; --i) {
                            this.context.lineTo(last_coords[i][0], last_coords[i][1]);
                        }
                    }
                
                // This is used by the next iteration of the loop
                var last_coords = coords_dataset;
    
                this.context.closePath();
        
                this.context.fill();
                this.context.stroke();
            }
            
            // Reset the globalAlpha
            if (typeof alpha == 'number') {
                this.context.globalAlpha = oldAlpha;
            }
        };








        //
        // Gets the coordinates for a particular mark
        // 
        // @param  number i The index of the data (ie which one it is)
        // @return array    A two element array of the coordinates
        //
        this.getCoordinates = function (dataset, index)
        {
            // The number  of data points
            var len = this.data[dataset].length;
    
            // The magnitude of the data (NOT the x/y coords)
            var mag = (this.data[dataset][index] / this.max) * this.radius;
    
            //
            // Get the angle
            //
            var angle = (RGraph.TWOPI / len) * index; // In radians
                angle -= RGraph.HALFPI;
    
    
            //
            // Work out the X/Y coordinates
            //
            var x = Math.cos(angle) * mag;
            var y = Math.sin(angle) * mag;
    
            //
            // Put the coordinate in the right quadrant
            //
            x = this.centerx + x;
            y = this.centery + y;
            
            return [x,y];
        };








        //
        // This function adds the labels to the chart
        //
        this.drawLabels = function ()
        {
            var labels = properties.labels;

            if (labels && labels.length > 0) {
    
                this.context.lineWidth = 1;
                this.context.strokeStyle = 'gray';
                this.context.fillStyle = properties.labelsColor || properties.textColor;
                
                var bgFill  = properties.labelsBackgroundFill,
                    bold    = properties.labelsBold,
                    bgBoxed = properties.labelsBoxed,
                    offset  = properties.labelsOffsetRadius,
                    font    = properties.textFont,
                    size    = properties.textSize,
                    radius  = this.radius,
                    color   = properties.labelsColor || properties.textColor

                for (var i=0; i<labels.length; ++i) {
                    
                    var angle  = (RGraph.TWOPI / properties.labels.length) * i;
                        angle -= RGraph.HALFPI;
    
                    var x = this.centerx + (Math.cos(angle) * (radius + 10 + offset));
                    var y = this.centery + (Math.sin(angle) * (radius + 10 + offset));

                    //
                    // Horizontal alignment
                    //
                    var halign = x < this.centerx ? 'right' : 'left' ;
                    if (i == 0 || (i / labels.length) == 0.5) halign = 'center';
    
                    if (labels[i] && labels[i].length) {
                        
                        var textConf = RGraph.getTextConf({
                            object: this,
                            prefix: 'labels'
                        });
                       
                        RGraph.text({
                            
                         object: this,
                    
                           font: textConf.font,
                           size: textConf.size,
                          color: textConf.color,
                           bold: textConf.bold,
                         italic: textConf.italic,

                              x: x,
                              y: y,
                           text: labels[i],
                         valign: 'center',
                         halign: halign,
                       bounding: bgBoxed,
                   boundingFill: bgFill,
                            tag: 'labels',
                       cssClass: RGraph.getLabelsCSSClassName({
                                     object: this,
                                       name: 'labelsClass',
                                      index: i
                                 })
                        });
                    }
                }
            }
        };








        //
        // Draws the circle. No arguments as it gets the information from the object properties.
        //
        this.drawCircle = function ()
        {
            var circle = {};
                circle.limit  = properties.circle;
                circle.fill   = properties.circleFill;
                circle.stroke = properties.circleStroke;
    
            if (circle.limit) {
    
                var r = (circle.limit / this.max) * this.radius;
                
                this.context.fillStyle = circle.fill;
                this.context.strokeStyle = circle.stroke;
    
                this.context.beginPath();
                this.context.arc(this.centerx, this.centery, r, 0, RGraph.TWOPI, 0);
                this.context.fill();
                this.context.stroke();
            }
        };








        //
        // Draws the labels
        //
        this.drawAxisLabels = function ()
        {
            //
            // Draw specific axis labels
            //
            if (RGraph.isArray(properties.labelsAxesSpecific) && properties.labelsAxesSpecific.length) {
                this.drawSpecificAxisLabels();
                return;
            }
    
            this.context.lineWidth = 1;
            
            // Set the color to black
            this.context.fillStyle   = 'black';
            this.context.strokeStyle = 'black';
    
            var r          = this.radius,
                font       = properties.textFont,
                axes       = properties.labelsAxes.toLowerCase(),
                color      = properties.labelsAxesBoxedBackground,
                drawzero   = false,
                units_pre  = properties.scaleUnitsPre,
                units_post = properties.scaleUnitsPost,
                decimals   = properties.scaleDecimals,
                bold       = properties.labelsAxesBold,
                boxed      = properties.labelsAxesBoxed,
                centerx    = this.centerx,
                centery    = this.centery,
                scale      = this.scale;

            this.context.fillStyle = properties.textColor;
            
            var textConf = RGraph.getTextConf({
                object: this,
                prefix: 'labelsAxes'
            });

            // The "North" axis labels
            if (axes.indexOf('n') > -1) {
            
                for (var i=0; i<this.scale2.labels.length; ++i) {
                    RGraph.text({
                        
                   object: this,

                     font: textConf.font,
                     size: textConf.size,
                    color: textConf.color,
                     bold: textConf.bold,
                   italic: textConf.italic,

                        x:              centerx + properties.labelsAxesOffsetx,
                        y:              centery - (r * ((i+1)/this.scale2.labels.length)) + properties.labelsAxesOffsety,

                        text:           this.scale2.labels[i],
                        valign:         'center',
                        halign:         'center',
                        bounding:       boxed[i] || color,
                        boundingFill:   color,
                        boundingStroke: 'rgba(0,0,0,0)',
                        tag:            'scale'
                    });
                }
                
                drawzero = true;
            }
    
            // The "South" axis labels
            if (axes.indexOf('s') > -1) {
                for (var i=0; i<this.scale2.labels.length; ++i) {
                    RGraph.text({
                        
                   object: this,

                     font: textConf.font,
                     size: textConf.size,
                    color: textConf.color,
                     bold: textConf.bold,
                   italic: textConf.italic,

                        x:              centerx + properties.labelsAxesOffsetx,
                        y:              centery + (r * ((i+1)/this.scale2.labels.length)) + properties.labelsAxesOffsety,

                        text:           this.scale2.labels[i],
                        valign:         'center',
                        halign:         'center',
                        bounding:       boxed[i] || color,
                        boundingFill:   color,
                        boundingStroke: 'rgba(0,0,0,0)',
                        tag:            'scale'
                    });
                }
                
                drawzero = true;
            }
            
            // The "East" axis labels
            if (axes.indexOf('e') > -1) {
                
                for (var i=0; i<this.scale2.labels.length; ++i) {
                    RGraph.text({
                        
                   object: this,

                     font: textConf.font,
                     size: textConf.size,
                    color: textConf.color,
                     bold: textConf.bold,
                   italic: textConf.italic,

                        x:              centerx + (r * ((i+1)/this.scale2.labels.length)) + properties.labelsAxesOffsetx,
                        y:              centery + properties.labelsAxesOffsety,

                        text:           this.scale2.labels[i],
                        valign:         'center',
                        halign:         'center',
                        bounding:       boxed[i]|| color,
                        boundingFill:   color,
                        boundingStroke: 'rgba(0,0,0,0)',
                        tag:            'scale'
                    });
                }
    
                drawzero = true;
            }
    
            // The "West" axis labels
            if (axes.indexOf('w') > -1) {
    
                for (var i=0; i<this.scale2.labels.length; ++i) {
                    RGraph.text({
                        
                   object: this,

                     font: textConf.font,
                     size: textConf.size,
                    color: textConf.color,
                     bold: textConf.bold,
                   italic: textConf.italic,

                        x:              centerx - (r * ((i+1)/this.scale2.labels.length)) + properties.labelsAxesOffsetx,
                        y:              centery + properties.labelsAxesOffsety,

                        text:           this.scale2.labels[i],
                        valign:         'center',
                        halign:         'center',
                        bounding:       boxed[i]|| color,
                        boundingFill:   color,
                        boundingStroke: 'rgba(0,0,0,0)',
                        tag:            'scale'
                    });
                }
    
                drawzero = true;
            }
    
            if (drawzero) {
                RGraph.text({
                    
               object: this,

                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:              centerx + properties.labelsAxesOffsetx,
                    y:              centery + properties.labelsAxesOffsety,

                    text: RGraph.numberFormat({
                        object:    this,
                        number:    Number(0).toFixed(),
                        unitspre:  units_pre,
                        unitspost: units_post
                    }),
                    valign:         'center',
                    halign:         'center',
                    bounding:       color ? true : false,
                    boundingFill:   color,
                    boundingStroke: 'rgba(0,0,0,0)',
                    tag:            'scale'
                });
            }
        };








        //
        // Draws specific axis labels
        //
        this.drawSpecificAxisLabels = function ()
        {
            //
            // Specific axis labels
            //
            var labels          = properties.labelsAxesSpecific;
            //var bold            = RGraph.arrayPad(properties.labelsAxesBold,labels.length);
            var boxed           = RGraph.arrayPad(properties.labelsAxesBoxed,labels.length);
            var reversed_labels = RGraph.arrayReverse(labels);
            //var reversed_bold   = RGraph.arrayReverse(bold);
            var reversed_boxed  = RGraph.arrayReverse(boxed);
            //var font            = properties.textFont;
            var axes            = properties.labelsAxes.toLowerCase();

            //this.context.fillStyle = properties.textColor;
            
            var textConf = RGraph.getTextConf({
                object: this,
                prefix: 'labelsAxes'
            });
            
             
            for (var i=0; i<labels.length; ++i) {
    
                if (axes.indexOf('n') > -1) RGraph.text({object: this,font: textConf.font,size: textConf.size,color: textConf.color,bold: textConf.bold,italic: textConf.italic,tag: 'labels.axes.specific', x:this.centerx,y:this.centery - this.radius + ((this.radius / labels.length) * i),text:reversed_labels[i],valign:'center',halign:'center',bounding:reversed_boxed[i],boundingFill:'white'});
                if (axes.indexOf('s') > -1) RGraph.text({object: this,font: textConf.font,size: textConf.size,color: textConf.color,bold: textConf.bold,italic: textConf.italic,tag: 'labels.axes.specific', x:this.centerx,y:this.centery + ((this.radius / labels.length) * (i+1)),text:labels[i],valign:'center',halign:'center',bounding:boxed[i],boundingFill:'white'});
                
                if (axes.indexOf('w') > -1) RGraph.text({object: this,font: textConf.font,size: textConf.size,color: textConf.color,bold: textConf.bold,italic: textConf.italic,tag: 'labels.axes.specific', x:this.centerx - this.radius + ((this.radius / labels.length) * i),y:this.centery,text:reversed_labels[i],valign:'center',halign:'center',bounding:reversed_boxed[i],boundingFill:'white'});
                if (axes.indexOf('e') > -1) RGraph.text({object: this,font: textConf.font,size: textConf.size,color: textConf.color,bold: textConf.bold,italic: textConf.italic,tag: 'labels.axes.specific', x:this.centerx + ((this.radius / labels.length) * (i+1)),y:this.centery,text:labels[i],valign:'center',halign:'center',bounding:boxed[i],boundingFill:'white'});
            }
        };








        //
        // This method eases getting the focussed point (if any)
        // 
        // @param event e The event object
        //
        this.getShape = function (e)
        {
            for (var i=0; i<this.coords.length; ++i) {

                var x        = this.coords[i][0];
                var y        = this.coords[i][1];
                var tooltips = properties.tooltips;
                var index    = Number(i);
                var mouseXY  = RGraph.getMouseXY(e);
                var mouseX   = mouseXY[0];
                var mouseY   = mouseXY[1];
    
                if (   mouseX < (x + 5)
                    && mouseX > (x - 5)
                    && mouseY > (y - 5)
                    && mouseY < (y + 5)
                   ) {

                    if (RGraph.parseTooltipText) {
                        var tooltip = RGraph.parseTooltipText(properties.tooltips, index);
                    }

                    var indexes = RGraph.sequentialIndexToGrouped(index, this.data);
                    var dataset = indexes[0];
                    var idx     = indexes[1];

                    return {
                     object: this,
                          x: x,
                          y: y,
                      index: idx,
                    dataset: dataset,
            sequentialIndex: index,
                      label: properties.labels && typeof properties.labels[idx] === 'string' ? properties.labels[idx] : null,
                    tooltip: typeof tooltip === 'string' ? tooltip : null
                    }
                }
            }
        };








        //
        // Each object type has its own Highlight() function which highlights the appropriate shape
        // 
        // @param object shape The shape to highlight
        //
        this.highlight = function (shape)
        {
            if (typeof properties.highlightStyle === 'function') {
                (properties.highlightStyle)(shape);
            
            
            
            
            
            // Inverted highlighting
            } else if (properties.highlightStyle === 'invert') {
            
                var radius = 25;

                this.path(
                    'b a % % % % % true',
                    shape.x,shape.y,radius,4.72, -1.57
                );

               for (var a=0; a<=360; a+=(360 / this.data[0].length)) {
                    this.path('a % % % % % false');
                    this.context.arc(
                        this.centerx,
                        this.centery,
                        this.radius,
                        RGraph.toRadians(a) - RGraph.HALFPI,
                        RGraph.toRadians(a) + 0.001 - RGraph.HALFPI,
                        false
                    );
                }
                
                // Go back to the top of the chart and then stroke/fill it
                this.path(
                    'a % % % % % false c f %',
                    this.centerx,this.centery,this.radius,0 - RGraph.HALFPI,0.001 - RGraph.HALFPI,
                    properties.highlightFill
                );
                
                // Draw the stroke around the circular cutout
                this.path(
                    'b a % % % % % false s %',
                    shape.x,shape.y,radius,0,6.29,
                    properties.highlightStroke
                );







            } else {
                RGraph.Highlight.point(this, shape);
            }
        };








        //
        // The getObjectByXY() worker method. Don't call this call:
        // 
        // RGraph.ObjectRegistry.getObjectByXY(e)
        // 
        // @param object e The event object
        //
        this.getObjectByXY = function (e)
        {
            var mouseXY = RGraph.getMouseXY(e);
            var extra   = 5;
    
            if (
                   mouseXY[0] > (this.centerx - this.radius - extra)
                && mouseXY[0] < (this.centerx + this.radius + extra)
                && mouseXY[1] > (this.centery - this.radius - extra)
                && mouseXY[1] < (this.centery + this.radius + extra)
                ) {
    
                return this;
            }
        };








        //
        // This draws highlights on the points
        //
        this.drawHighlights = function ()
        {
            if (properties.highlights) {
                
                var sequentialIdx = 0;
                var dataset       = 0;
                var index         = 0;
                var radius        = properties.highlightsRadius;
                
    
                
                for (var dataset=0; dataset <this.data.length; ++dataset) {
                    for (var index=0; index<this.data[dataset].length; ++index) {
                        this.context.beginPath();
                            this.context.strokeStyle = properties.highlightsStroke;
                            this.context.fillStyle = properties.highlightsFill ? properties.highlightsFill : ((typeof properties.colorsStroke == 'object' && properties.colorsStroke[dataset]) ? properties.colorsStroke[dataset] : properties.colorsStroke);
                            this.context.arc(this.coords[sequentialIdx][0], this.coords[sequentialIdx][1], radius, 0, RGraph.TWOPI, false);
                        this.context.stroke();
                        this.context.fill();
                        ++sequentialIdx;
                    }
                }
                
            }
        };








        //
        // This function returns the radius (ie the distance from the center) for a particular
        // value. Note that if you want the angle for a point you can use getAngle(index)
        // 
        // @param number value The value you want the radius for
        //
        this.getRadius = function (value)
        {
            if (value < 0 || value > this.max) {
                return null;
            }
    
            // Radar doesn't support minimum value
            var radius = (value / this.max) * this.radius;
            
            return radius;
        };








        //
        // This function returns the angle (in radians) for a particular index.
        // 
        // @param number numitems The total number of items
        // @param number index    The zero index number of the item to get the angle for
        //
        this.getAngle = function (numitems, index)
        {
            var angle = (RGraph.TWOPI / numitems) * index;
                angle -= RGraph.HALFPI;
            
            return angle;
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors.colors          = RGraph.arrayClone(properties.colors);
                this.original_colors.keyColors       = RGraph.arrayClone(properties.keyColors);
                this.original_colors.titleColor      = RGraph.arrayClone(properties.titleColor);
                this.original_colors.textColor       = RGraph.arrayClone(properties.textColor);
                this.original_colors.labelsColor     = RGraph.arrayClone(properties.labelsColor);
                this.original_colors.labelsAxesColor = RGraph.arrayClone(properties.labelsAxesColor);
                this.original_colors.highlightStroke = RGraph.arrayClone(properties.highlightStroke);
                this.original_colors.highlightFill   = RGraph.arrayClone(properties.highlightFill);
                this.original_colors.circleFill      = RGraph.arrayClone(properties.circleFill);
                this.original_colors.circleStroke    = RGraph.arrayClone(properties.circleStroke);
                this.original_colors.colorsStroke    = RGraph.arrayClone(properties.colorsStroke);
            }

            for (var i=0; i<properties.colors.length; ++i) {
                properties.colors[i] = this.parseSingleColorForGradient(properties.colors[i]);
            }
            
            var keyColors = properties.keyColors;
    
            if (typeof keyColors != 'null' && keyColors && keyColors.length) {
                for (var i=0; i<properties.keyColors.length; ++i) {
                    properties.keyColors[i] = this.parseSingleColorForGradient(properties.keyColors[i]);
                }
            }
    
            properties.titleColor      = this.parseSingleColorForGradient(properties.titleColor);
            properties.textColor       = this.parseSingleColorForGradient(properties.textColor);
            properties.labelsColor     = this.parseSingleColorForGradient(properties.labelsColor);
            properties.labelsAxesColor= this.parseSingleColorForGradient(properties.labelsAxesColor);
            properties.highlightStroke = this.parseSingleColorForGradient(properties.highlightStroke);
            properties.highlightFill   = this.parseSingleColorForGradient(properties.highlightFill);
            properties.circleFill      = this.parseSingleColorForGradient(properties.circleFill);
            properties.circleStroke    = this.parseSingleColorForGradient(properties.circleStroke);
            
            // Strokestyle can be an array
            if (typeof properties.colorsStroke === 'object') {
                for (var i=0; i<properties.colorsStroke.length; ++i) {
                    properties.colorsStroke[i] = this.parseSingleColorForGradient(properties.colorsStroke[i]);
                }
            } else {
                properties.colorsStroke = this.parseSingleColorForGradient(properties.colorsStroke);
            }
        };








        //
        // Use this function to reset the object to the post-constructor state. Eg reset colors if
        // need be etc
        //
        this.reset = function ()
        {
        };








        //
        // This parses a single color value
        //
        this.parseSingleColorForGradient = function (color)
        {
            if (!color || typeof color != 'string') {
                return color;
            }

            if (color.match(/^gradient\((.*)\)$/i)) {

                // Allow for JSON gradients
                if (color.match(/^gradient\(({.*})\)$/i)) {
                    return RGraph.parseJSONGradient({object: this, def: RegExp.$1});
                }

                var parts = RegExp.$1.split(':');
    
                // Create the gradient
                var grad = this.context.createRadialGradient(this.centerx, this.centery, 0, this.centerx, this.centery, this.radius);
    
                var diff = 1 / (parts.length - 1);
    
                grad.addColorStop(0, RGraph.trim(parts[0]));
    
                for (var j=1; j<parts.length; ++j) {
                    grad.addColorStop(j * diff, RGraph.trim(parts[j]));
                }
            }
    
            return grad ? grad : color;
        };








        this.addFillListeners = function (e)
        {
            var obj = this;

            var func = function (e)
            {
                //var canvas  = e.target;
                //var context = canvas.getContext('2d');
                var coords  = obj.coords;
                var coords2 = obj.coords2;
                var mouseXY = RGraph.getMouseXY(e);
                var dataset = 0;

                if (e.type == 'mousemove' && properties.fillMousemoveRedraw) {
                    RGraph.redrawCanvas(obj.canvas);
                }

                for (var dataset=(obj.coords2.length-1); dataset>=0; --dataset) {
                    
                    // Draw the path again so that it can be checked
                    obj.context.beginPath();
                        obj.context.moveTo(obj.coords2[dataset][0][0], obj.coords2[dataset][0][1]);
                        for (var j=0; j<obj.coords2[dataset].length; ++j) {
                            obj.context.lineTo(obj.coords2[dataset][j][0], obj.coords2[dataset][j][1]);
                        }
                        
                    // Draw a line back to the starting point
                    obj.context.lineTo(obj.coords2[dataset][0][0], obj.coords2[dataset][0][1]);
        
                    // Go thru the previous datasets coords in reverse order
                    if (properties.accumulative && dataset > 0) {
                        obj.context.lineTo(obj.coords2[dataset - 1][0][0], obj.coords2[dataset - 1][0][1]);
                        for (var j=(obj.coords2[dataset - 1].length - 1); j>=0; --j) {
                            obj.context.lineTo(obj.coords2[dataset - 1][j][0], obj.coords2[dataset - 1][j][1]);
                        }
                    }
    
                    obj.context.closePath();
                    
                    if (obj.context.isPointInPath(mouseXY[0], mouseXY[1])) {
                        var inPath = true;
                        break;
                    }
                }
                
                // Call the events
                if (inPath) {
    
                    var fillTooltips = properties.fillTooltips;
    
                    //
                    // Click event
                    //
                    if (e.type == 'click') {
                        if (properties.fillClick) {
                            properties.fillClick(e, dataset);
                        }
                    
                        if (properties.fillTooltips && properties.fillTooltips[dataset]) {
                            obj.datasetTooltip(e, dataset);
                        }
                    }

    
    
                    //
                    // Mousemove event
                    //
                    if (e.type == 'mousemove') {
    
                        if (properties.fillMousemove) {
                            properties.fillMousemove(e, dataset);
                        }
                        
                        if (!RGraph.isNull(fillTooltips)) {
                            e.target.style.cursor = 'pointer';
                        }
                    
                        if (properties.fillTooltips && properties.fillTooltips[dataset]) {
                            e.target.style.cursor = 'pointer';
                        }
                    }
    
                    e.stopPropagation();
                
                } else if (e.type == 'mousemove') {
                    obj.canvas.style.cursor = 'default';
                }
            };
            
            //
            // Add the click listener
            //
            if (properties.fillClick || !RGraph.isNull(properties.fillTooltips)) {
                this.canvas.addEventListener('click', func, false);
            }
    
            //
            // Add the mousemove listener
            //
            if (properties.fillMousemove || !RGraph.isNull(properties.fillTooltips)) {
                this.canvas.addEventListener('mousemove', func, false);
            }
        };








        //
        // This highlights a specific dataset on the chart
        // 
        // @param number dataset The index of the dataset (which starts at zero)
        //
        this.highlightDataset = function (dataset)
        {
            this.context.beginPath();
            for (var j=0; j<this.coords2[dataset].length; ++j) {
                if (j == 0) {
                    this.context.moveTo(this.coords2[dataset][0][0], this.coords2[dataset][0][1]);
                } else {
                    this.context.lineTo(this.coords2[dataset][j][0], this.coords2[dataset][j][1]);
                }
            }
    
            this.context.lineTo(this.coords2[dataset][0][0], this.coords2[dataset][0][1]);
            
            if (properties.accumulative && dataset > 0) {
                this.context.lineTo(this.coords2[dataset - 1][0][0], this.coords2[dataset - 1][0][1]);
                for (var j=(this.coords2[dataset - 1].length - 1); j>=0; --j) {
                    this.context.lineTo(this.coords2[dataset - 1][j][0], this.coords2[dataset - 1][j][1]);
                }
            }
    
            this.context.strokeStyle = properties.fillHighlightStroke;
            this.context.fillStyle   = properties.fillHighlightFill;
    
            this.context.stroke();
            this.context.fill();
        };








        //
        // Shows a tooltip for a dataset (a "fill" tooltip), You can pecify these
        // with the fillTooltips option
        //
        this.datasetTooltip = function (e, dataset)
        {
            // Highlight the dataset
            this.highlightDataset(dataset);

            // Use the First datapoints coords for the Y position of the tooltip NOTE The X position is changed in the
            // obj.positionTooltip() method so set the index to be the first one
            var text = properties.fillTooltips[dataset];
            var x    = this.coords2[dataset][0][0] + RGraph.getCanvasXY(this.canvas)[0];
            var y    = this.coords2[dataset][0][1] + RGraph.getCanvasXY(this.canvas)[1];
    

            // Show a tooltip
            RGraph.tooltip({
                object: this,
                  text: text,
                     x: x,
                     y: y,
                 index: 0,
                 event: e
                });
        };








        //
        // This function handles highlighting an entire data-series for the interactive
        // key
        // 
        // @param int index The index of the data series to be highlighted
        //
        this.interactiveKeyHighlight = function (index)
        {
            var coords = this.coords2[index];

            if (coords) {
                
                var pre_linewidth = this.context.lineWidth;
                var pre_linecap   = this.context.lineCap;
                
                
                
                
                // ------------------------------------------ //

                this.context.lineWidth   = properties.linewidth + 10;
                this.context.lineCap     = 'round';
                this.context.strokeStyle = properties.keyInteractiveHighlightChartStroke;

                
                this.context.beginPath();
                for (var i=0,len=coords.length; i<len; i+=1) {
                    if (i == 0) {
                        this.context.moveTo(coords[i][0], coords[i][1]);
                    } else {
                        this.context.lineTo(coords[i][0], coords[i][1]);
                    }
                }
                this.context.closePath();
                this.context.stroke();
                
                // ------------------------------------------ //
                
                
                
                
                // Reset the lineCap and lineWidth
                this.context.lineWidth = pre_linewidth;
                this.context.lineCap = pre_linecap;
            }
        };








        //
        // Using a function to add events makes it easier to facilitate method chaining
        // 
        // @param string   type The type of even to add
        // @param function func 
        //
        this.on = function (type, func)
        {
            if (type.substr(0,2) !== 'on') {
                type = 'on' + type;
            }
            
            if (typeof this[type] !== 'function') {
                this[type] = func;
            } else {
                RGraph.addCustomEventListener(this, type, func);
            }
    
            return this;
        };








        //
        // This function runs once only
        // (put at the end of the file (before any effects))
        //
        this.firstDrawFunc = function ()
        {
        };








        //
        // Radar chart grow
        // 
        // This effect gradually increases the magnitude of the points on the radar chart
        // 
        // @param object     Options for the effect
        // @param function   An optional callback that is run when the effect is finished
        //
        this.grow = function ()
        {
            var obj           = this;
            var callback      = arguments[1] ? arguments[1] : function () {};
            var opt           = arguments[0] ? arguments[0] : {};
            var frames        = opt.frames ? opt.frames : 30;
            var frame         = 0;
            var data          = RGraph.arrayClone(obj.data);

            function iterator ()
            {
                for (var i=0,len=data.length; i<len; ++i) {

                    //if (obj.original_data[i] == null) {
                    //    obj.original_data[i] = [];
                    //}
    
                    for (var j=0,len2=data[i].length; j<len2; ++j) {
                        obj.original_data[i][j] = (frame / frames)  * data[i][j];
                    }
                }
    
                RGraph.clear(obj.canvas);
                RGraph.redrawCanvas(obj.canvas);
    
                if (frame < frames) {
                    frame++;
                    RGraph.Effects.updateCanvas(iterator);
                } else {
                    callback(obj);
                }
            }
            
            iterator();
            
            return this;
        };








        //
        // Trace (Radar chart)
        // 
        // This is a Trace effect for the Radar chart
        // 
        // @param object     Options for the effect. Currently only "frames" is available.
        // @param function   A function that is called when the ffect is complete
        //
        this.trace = function ()
        {
            var obj       = this;
            var opt       = arguments[0] || {};
            var frames    = opt.frames || 60;
            var frame     = 0;
            var callback  = arguments[1] || function () {};
    
            obj.set('animationTraceClip', 0);


            var iterator = function ()
            {
                if (frame < frames) {
        
                    obj.set('animationTraceClip', frame / frames);
        
                    frame++;
                    RGraph.redrawCanvas(obj.canvas);
                    RGraph.Effects.updateCanvas(iterator);

                } else {

                    obj.set('animationTraceClip', 1);
                    RGraph.redrawCanvas(obj.canvas);
                    callback(obj);
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
            var indexes = RGraph.sequentialIndexToGrouped(opt.index, this.data);

            // Create the values array which contains each datasets value
            for (var i=0,values=[]; i<this.data.length; ++i) {
                values.push(this.data[i][indexes[1]]);
            }

            return {
                  index: indexes[1],
                dataset: indexes[0],
        sequentialIndex: opt.index,
                  value: this.data_arr[opt.index],
                 values: values
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
            var color = (   !RGraph.isNull((properties.tooltipsFormattedKeyColors))
                        && typeof properties.tooltipsFormattedKeyColors === 'object'
                        && properties.tooltipsFormattedKeyColors[i])
                           ? properties.tooltipsFormattedKeyColors[i]
                           : '';

            var label = (   !RGraph.isNull((properties.tooltipsFormattedKeyLabels))
                        && typeof properties.tooltipsFormattedKeyLabels === 'object'
                        && properties.tooltipsFormattedKeyLabels[index])
                           ? properties.tooltipsFormattedKeyLabels[index]
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
                canvasXY = RGraph.getCanvasXY(obj.canvas)
                coords   = this.coords[index];

            // Position the tooltip in the X direction
            args.tooltip.style.left = (
                canvasXY[0]                      // The X coordinate of the canvas
                + coords[0]                      // The X coordinate of the point on the chart
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
                + obj.properties.tooltipsOffsetx // Add any user defined offset
            ) + 'px';

            args.tooltip.style.top  = (
                  canvasXY[1]                    // The Y coordinate of the canvas
                + coords[1]                      // The Y coordinate of the bar on the chart
                - tooltip.offsetHeight           // The height of the tooltip
                + obj.properties.tooltipsOffsety // Add any user defined offset
                - 15
                - (properties.highlightsRadius - 4)
            ) + 'px';
        };








        //
        // Always register the object
        //
        RGraph.register(this);








        //
        // This is the 'end' of the constructor so if the first argument
        // contains configuration data - handle that.
        //
        RGraph.parseObjectStyleConfig(this, conf.options);
    };