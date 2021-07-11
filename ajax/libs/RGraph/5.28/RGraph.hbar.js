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
    // The horizontal bar chart constructor. The horizontal bar is a minor variant
    // on the bar chart. If you have big labels, this may be useful as there is usually
    // more space available for them.
    //
    RGraph.HBar = function (conf)
    {
        //
        // Allow for object config style
        //
        var id                 = conf.id
        var canvas             = document.getElementById(id);
        var data               = conf.data;


        this.id                = id;
        this.canvas            = canvas;
        this.context           = this.canvas.getContext ? this.canvas.getContext("2d", {alpha: (typeof id === 'object' && id.alpha === false) ? false : true}) : null;
        this.canvas.__object__ = this;
        this.data              = data;
        this.type              = 'hbar';
        this.isRGraph          = true;
        this.isrgraph          = true;
        this.rgraph            = true;
        this.uid               = RGraph.createUID();
        this.canvas.uid        = this.canvas.uid ? this.canvas.uid : RGraph.createUID();
        this.colorsParsed      = false;
        this.coords            = [];
        this.coords2           = [];
        this.coordsText        = [];
        this.original_colors   = [];
        this.firstDraw         = true; // After the first draw this will be false
        this.yaxisLabelsSize   = 0;    // Used later when the margin is auto calculated
        this.yaxisTitleSize    = 0;    // Used later when the margin is auto calculated


        
        this.max = 0;
        this.stackedOrGrouped  = false;

        // Default properties
        this.properties =
        {
            marginLeft:            75,
            marginLeftAuto:       true,
            marginRight:           35,
            marginTop:             35,
            marginBottom:          35,
            marginInner:                2,
            marginInnerGrouped:        2,
            
            backgroundBarsCount:       null,
            backgroundBarsColor1:      'rgba(0,0,0,0)',
            backgroundBarsColor2:      'rgba(0,0,0,0)',
            backgroundGrid:            true,
            backgroundGridColor:       '#ddd',
            backgroundGridLinewidth:   1,
            backgroundGridHsize:       25,
            backgroundGridVsize:       25,
            backgroundGridHlines:      true,
            backgroundGridVlines:      true,
            backgroundGridBorder:      true,
            backgroundGridAutofit:     true,
            backgroundGridAutofitAlign:true,
            backgroundGridHlinesCount: null,
            backgroundGridVlinesCount: 5,
            backgroundGridDashed:      false,
            backgroundGridDotted:      false,
            backgroundColor:           null,

            linewidth:              1,

            title:                  '',
            titleBackground:       null,
            titleHpos:             null,
            titleVpos:             null,
            titleBold:             null,
            titleItalic:           null,
            titleFont:             null,
            titleSize:             null,
            titleColor:            null,
            titleX:                null,
            titleY:                null,
            titleHalign:           null,
            titleValign:           null,
            titleOffsetx:          0,
            titleOffsety:          0,

            textSize:              12,
            textColor:             'black',
            textFont:              'Arial, Verdana, sans-serif',
            textBold:              false,
            textItalic:            false,
            textAngle:             0,
            textAccessible:               true,
            textAccessibleOverflow:      'visible',
            textAccessiblePointerevents: false,

            colors:                 ['red', 'blue', 'green', 'pink', 'yellow', 'cyan', 'navy', 'gray', 'black'],
            colorsSequential:       false,
            colorsStroke:           'rgba(0,0,0,0)',

            xaxis:                true,
            xaxisLinewidth:       1,
            xaxisColor:           'black',
            xaxisPosition:        'bottom',
            xaxisTickmarks:          true,
            xaxisTickmarksLength:    3,
            xaxisTickmarksLastLeft:  null,
            xaxisTickmarksLastRight: null,
            xaxisTickmarksCount:     null,
            xaxisLabels:          true,
            xaxisLabelsCount:     5,
            xaxisLabelsBold:      null,
            xaxisLabelsItalic:    null,
            xaxisLabelsFont:      null,
            xaxisLabelsSize:      null,
            xaxisLabelsColor:     null,
            xaxisLabelsSpecific:  null,
            xaxisLabelsAngle:     0,
            xaxisLabelsOffsetx:   0,
            xaxisLabelsOffsety:   0,
            xaxisLabelsHalign:    null,
            xaxisLabelsValign:    null,
            xaxisLabelsPosition:  'edge',
            xaxisLabelsSpecificAlign:'left',
            xaxisScale:           true,
            xaxisScaleUnitsPre:   '',
            xaxisScaleUnitsPost:  '',
            xaxisScaleMin:        0,
            xaxisScaleMax:        0,
            xaxisScalePoint:      '.',
            xaxisScaleThousand:   ',',
            xaxisScaleDecimals:   null,
            xaxisScaleZerostart:  true,
            xaxisTitle:            '',
            xaxisTitleBold:       null,
            xaxisTitleItalic:     null,
            xaxisTitleSize:       null,
            xaxisTitleFont:       null,
            xaxisTitleColor:      null,
            xaxisTitleX:          null,
            xaxisTitleY:          null,
            xaxisTitleOffsetx:    null,
            xaxisTitleOffsety:    null,
            xaxisTitlePos:        null,
            xaxisTitleHalign:     null,
            xaxisTitleValign:     null,

            yaxis:                    true,
            yaxisLinewidth:           1,
            yaxisColor:               'black',
            yaxisTickmarks:           true,
            yaxisTickmarksCount:      null,
            yaxisTickmarksLastTop:    null,
            yaxisTickmarksLastBottom: null,
            yaxisTickmarksLength:     3,
            yaxisScale:               false,
            yaxisLabels:              null,
            yaxisLabelsCount:         null, // Not used by the HBar
            yaxisLabelsOffsetx:       0,
            yaxisLabelsOffsety:       0,
            yaxisLabelsHalign:        null,
            yaxisLabelsValign:        null,
            yaxisLabelsFont:          null,
            yaxisLabelsSize:          null,
            yaxisLabelsColor:         null,
            yaxisLabelsBold:          null,
            yaxisLabelsItalic:        null,
            yaxisLabelsPosition:      'section',
            yaxisPosition:            'left',
            yaxisTitle:               null,
            yaxisTitleBold:           null,
            yaxisTitleSize:           null,
            yaxisTitleFont:           null,
            yaxisTitleColor:          null,
            yaxisTitleItalic:         null,
            yaxisTitlePos:            null,
            yaxisTitleX:              null,
            yaxisTitleY:              null,
            yaxisTitleOffsetx:        0,
            yaxisTitleOffsety:        0,
            yaxisTitleHalign:         null,
            yaxisTitleValign:         null,
            yaxisTitleAccessible:     null,

            labelsAbove:           false,
            labelsAboveDecimals:  0,
            labelsAboveSpecific:  null,
            labelsAboveUnitsPre:  '',
            labelsAboveUnitsPost: '',
            labelsAboveColor:      null,
            labelsAboveFont:       null,
            labelsAboveSize:       null,
            labelsAboveBold:       null,
            labelsAboveItalic:     null,
            labelsAboveOffsetx:    0,
            labelsAboveOffsety:    0,

            contextmenu:            null,
            
            key:                    null,
            keyBackground:         'white',
            keyPosition:           'graph',
            keyHalign:             'right',
            keyShadow:             false,
            keyShadowColor:       '#666',
            keyShadowBlur:        3,
            keyShadowOffsetx:     2,
            keyShadowOffsety:     2,
            keyPositionMarginBoxed: false,
            keyPositionX:         null,
            keyPositionY:         null,
            keyColorShape:        'square',
            keyRounded:            true,
            keyLinewidth:          1,
            keyColors:             null,
            keyInteractive:        false,
            keyInteractiveHighlightChartStroke: 'black',
            keyInteractiveHighlightChartFill:'rgba(255,255,255,0.7)',
            keyInteractiveHighlightLabel:'rgba(255,0,0,0.2)',
            keyLabelsColor:        null,
            keyLabelsFont:         null,
            keyLabelsSize:         null,
            keyLabelsBold:         null,
            keyLabelsItalic:       null,
            keyLabelsOffsetx:      0,
            keyLabelsOffsety:      0,

            unitsIngraph:          false,
            
            shadow:                 false,
            shadowColor:           '#666',
            shadowBlur:            3,
            shadowOffsetx:         3,
            shadowOffsety:         3,

            grouping:             'grouped',

            tooltips:                   null,
            tooltipsEvent:              'onclick',
            tooltipsEffect:             'fade',
            tooltipsCssClass:           'RGraph_tooltip',
            tooltipsCss:                null,
            tooltipsHighlight:          true,
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
            tooltipsHotspotYonly:       false,

            highlightFill:         'rgba(255,255,255,0.7)',
            highlightStroke:       'rgba(0,0,0,0)',
            highlightStyle:        null,

            annotatable:            false,
            annotatableColor:         'black',
            annotatableLinewidth:     1,

            resizable:                   false,
            resizableHandleAdjust:     [0,0],
            resizableHandleBackground: null,

            redraw:               true,

            variant:                'hbar',
            variantThreedAngle:   0.1,
            variantThreedOffsetx: 10,
            variantThreedOffsety: 5,
            variantThreedXaxis:   true,
            variantThreedYaxis:   true,
            
            adjustable:             false,
            adjustableOnly:        null,

            clearto:                'rgba(0,0,0,0)'
        }

        // Check for support
        if (!this.canvas) {
            alert('[HBAR] No canvas support');
            return;
        }
        
        //
        // Allow the data to be given as a string
        //
        this.data = RGraph.stringsToNumbers(this.data);


        // This loop is used to check for stacked or grouped charts and now
        // also to convert strings to numbers. And now also undefined values
        // (29/07/2016
        for (i=0,len=this.data.length; i<len; ++i) {
            if (typeof this.data[i] === 'object' && !RGraph.isNull(this.data[i])) {
                this.stackedOrGrouped = true;
            }
        }


        //
        // Create the dollar objects so that functions can be added to them
        //
        var linear_data = RGraph.arrayLinearize(data);
        for (var i=0,len=linear_data.length; i<len; ++i) {
            this['$' + i] = {};
        }



        //
        // Create the linear data array
        //
        this.data_arr = RGraph.arrayLinearize(this.data);




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
        // A setter
        // 
        // @param name  string The name of the property to set
        // @param value mixed  The value of the property
        //
        this.set = function (name)
        {
            var value = typeof arguments[1] === 'undefined' ? null : arguments[1];

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
        // A getter
        // 
        // @param name  string The name of the property to get
        //
        this.get = function (name)
        {
            return properties[name];
        };








        //
        // The function you call to draw the bar chart
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


            //
            // Check that the bHBar isn't stacked with adjusting enabled 
            //
            if (properties.adjustable && properties.grouping === 'stacked') {
                alert('[RGRAPH] The HBar does not support stacked charts with adjusting');
            }

            //
            // Set the correct number of horizontal grid lines if
            // it hasn't been set already
            //
            if (RGraph.isNull(properties.backgroundGridHlines.count)) {
                this.set('backgroundGridHlinesCount', this.data.length);
            }

            //
            // If the chart is 3d then angle it
            //

            if (properties.variant === '3d') {
                
                if (properties.textAccessible) {
                    // Nada
                } else {
                    this.context.setTransform(1,properties.variantThreedAngle,0,1,0.5,0.5);
                }
                
                // Enlarge the margin if its 25
                if (properties.marginBottom === 25) {
                    this.set('marginBottom', 80);
                }
            }



    
            //
            // Parse the colors. This allows for simple gradient syntax
            //
            if (!this.colorsParsed) {
                this.parseColors();
                
                // Don't want to do this again
                this.colorsParsed = true;
            }
            

            
            // Reset this so that it doesn't grow uncontrollably
            this.yaxisTitleSize = 0;


            // Calculate the size of the labels regardless of anything else
            if ( properties.yaxisLabels) {
            
                var labels     =  properties.yaxisLabels,
                    marginName =  properties.yaxisPosition === 'right' ? 'marginRight' : 'marginLeft';

                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'yaxisLabels'
                });

                for (var i=0,len=0; i<labels.length; i+=1) {
                    
                    var length = RGraph.measureText(
                        labels[i],
                        textConf.bold,
                        textConf.font,
                        textConf.size
                    )[0] || 0;

                    this.yaxisLabelsSize = Math.max(len, length);
                    len = this.yaxisLabelsSize;
                }

                // Is a title Specified? If so accommodate that
                if ( properties.yaxisTitle) {

                    var textConf = RGraph.getTextConf({
                        object: this,
                        prefix: 'yaxisTitle'
                    });

                    var titleSize = RGraph.measureText(
                         properties.yaxisTitle,
                        textConf.bold,
                        textConf.font,
                        textConf.size
                    ) || [];


                    this.yaxisTitleSize += titleSize[1];
                    properties[marginName]    += this.yaxisTitleSize;
                }
            }

            

            //
            // Accomodate autosizing the left/right margin
            //
            if (properties.marginLeftAuto) {
                var name =  properties.yaxisPosition === 'right' ? 'marginRight' : 'marginLeft';

                this.set(
                    name,
                    this.yaxisLabelsSize + this.yaxisTitleSize + 10
                );
            }



            //
            // Make the margins easy to access
            //            
            this.marginLeft   = properties.marginLeft;
            this.marginRight  = properties.marginRight;
            this.marginTop    = properties.marginTop;
            this.marginBottom = properties.marginBottom;

            


            //
            // Stop the coords array from growing uncontrollably
            //
            this.coords     = [];
            this.coords2    = [];
            this.coordsText = [];
            this.max        = 0;
    
            //
            // Check for xaxisScaleMin in stacked charts
            //
            if ( properties.xaxisScaleMin > 0 && properties.grouping === 'stacked') {
                alert('[HBAR] Using xaxisScaleMin is not supported with stacked charts, resetting xaxisScaleMin to zero');
                this.set('xaxisScaleMin', 0);
            }
    
            //
            // Work out a few things. They need to be here because they depend on things you can change before you
            // call Draw() but after you instantiate the object
            //
            this.graphwidth     = this.canvas.width - this.marginLeft - this.marginRight;
            this.graphheight    = this.canvas.height - this.marginTop - this.marginBottom;
            this.halfgrapharea  = this.grapharea / 2;
            this.halfTextHeight = properties.textSize / 2;
            this.halfway        = Math.round((this.graphwidth / 2) + this.marginLeft);
    
    
    
    
    





            // Progressively Draw the chart
            RGraph.Background.draw(this);
    
            this.drawbars();
            this.drawAxes();
            this.drawLabels();
    
    
            // Draw the key if necessary
            if (properties.key && properties.key.length) {
                RGraph.drawKey(this, properties.key, properties.colors);
            }
    
    
    
            //
            // Setup the context menu if required
            //
            if (properties.contextmenu) {
                RGraph.showContext(this);
            }


    
            //
            // Draw "in graph" labels
            //
            RGraph.drawInGraphLabels(this);
    
            
            //
            // This function enables resizing
            //
            //if (properties.resizable) {
            //    RGraph.allowResizing(this);
            //}
    
    
            //
            // This installs the event listeners
            //
            RGraph.installEventListeners(this);
    

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
        // This draws the axes
        //
        this.drawAxes = function ()
        {
            // Draw the X axis
            RGraph.drawXAxis(this);

            // Draw the Y axis
            RGraph.drawYAxis(this);
        };








        //
        // This draws the labels for the graph
        //
        this.drawLabels = function ()
        {
            // Labels are now drawn by the RGraph.drawYaxis() function
        };








        //
        // This function draws the bars. It also draw 3D axes as the axes drawing bit
        // is don AFTER the bars are drawn
        //
        this.drawbars = function ()
        {
            this.context.lineWidth   = properties.linewidth;
            this.context.strokeStyle = properties.colorsStroke;
            this.context.fillStyle   = properties.colors[0];

            var prevX = 0,
                prevY = 0;
            
    
            //
            // Work out the max value
            //

            if ( properties.xaxisScaleMax) {

                this.scale2 = RGraph.getScale({object: this, options: {
                    'scale.max':           properties.xaxisScaleMax,
                    'scale.min':           properties.xaxisScaleMin,
                    'scale.decimals':     Number( properties.xaxisScaleDecimals),
                    'scale.point':         properties.xaxisScalePoint,
                    'scale.thousand':      properties.xaxisScaleThousand,
                    'scale.round':         properties.xaxisScaleRound,
                    'scale.units.pre':     properties.xaxisScaleUnitsPre,
                    'scale.units.post':    properties.xaxisScaleUnitsPost,
                    'scale.labels.count':  properties.xaxisLabelsCount,
                    'scale.strict':       true
                 }});

                this.max = this.scale2.max;
    
            } else {

                var grouping = properties.grouping;

                for (i=0; i<this.data.length; ++i) {
                    if (typeof this.data[i] == 'object') {
                        var value = grouping == 'grouped' ? Number(RGraph.arrayMax(this.data[i], true)) : Number(RGraph.arraySum(this.data[i]));
                    } else {
                        var value = Number(Math.abs(this.data[i]));
                    }
    
                    this.max = Math.max(Math.abs(this.max), Math.abs(value));
                }

                this.scale2 = RGraph.getScale({object: this, options: {
                    'scale.max':          this.max,
                    'scale.min':           properties.xaxisScaleMin,
                    'scale.decimals':     Number( properties.xaxisScaleDecimals),
                    'scale.point':         properties.xaxisScalePoint,
                    'scale.thousand':      properties.xaxisScaleThousand,
                    'scale.round':         properties.xaxisScaleRound,
                    'scale.units.pre':     properties.xaxisScaleUnitsPre,
                    'scale.units.post':    properties.xaxisScaleUnitsPost,
                    'scale.labels.count':  properties.xaxisLabelsCount
                }});


                this.max = this.scale2.max;
                this.min = this.scale2.min;
            }
    
            if ( properties.xaxisScaleDecimals == null && Number(this.max) == 1) {
                this.set('xaxisScaleDecimals', 1);
            }
            
            //
            // This is here to facilitate sequential colors
            //
            var colorIdx = 0;
            
            //
            // For grouped bars we need to calculate the number of bars
            //
            this.numbars = RGraph.arrayLinearize(this.data).length;




            //
            // if the chart is adjustable fix the scale so that it doesn't change.
            // 
            // It's here (after the scale generation) so that the max value can be
            // set to the maximum scale value)
            //
            if (properties.adjustable && ! properties.xaxisScaleMax) {
                this.set('xaxisScaleMax', this.scale2.max);
            }



            // Draw the 3d axes if necessary
            if (properties.variant === '3d') {
                RGraph.draw3DAxes(this);
            }






            //
            // The bars are drawn HERE
            //
            var graphwidth = (this.canvas.width - this.marginLeft - this.marginRight);
            var halfwidth  = graphwidth / 2;

            for (i=(len=this.data.length-1); i>=0; --i) {

                // Work out the width and height
                var width  = Math.abs((this.data[i] / this.max) *  graphwidth);
                var height = this.graphheight / this.data.length;

                var orig_height = height;

                var x       = this.getXCoord(0);
                var y       = this.marginTop + (i * height);
                var vmargin = properties.marginInner;

                // Account for the Y axis being on the right hand side
                if ( properties.yaxisPosition === 'right') {
                    x = this.canvas.width - this.marginRight - Math.abs(width);
                }

                // Account for negative lengths - Some browsers (eg Chrome) don't like a negative value
                if (width < 0) {
                    x -= width;
                    width = Math.abs(width);
                }
    
                //
                // Turn on the shadow if need be
                //
                if (properties.shadow) {
                    this.context.shadowColor   = properties.shadowColor;
                    this.context.shadowBlur    = properties.shadowBlur;
                    this.context.shadowOffsetX = properties.shadowOffsetx;
                    this.context.shadowOffsetY = properties.shadowOffsety;
                }

                //
                // Draw the bar
                //
                this.context.beginPath();

                    // Standard (non-grouped and non-stacked) bars here
                    if (typeof this.data[i] == 'number' || RGraph.isNull(this.data[i])) {

                        var barHeight = height - (2 * vmargin),
                            barWidth  = ((this.data[i] -  properties.xaxisScaleMin) / (this.max -  properties.xaxisScaleMin)) * this.graphwidth,
                            barX      = x;
                        
                        // Accommodate an offset Y axis
                        if (this.scale2.min < 0 && this.scale2.max > 0 &&  properties.yaxisPosition === 'left') {
                            barWidth = (this.data[i] / (this.max -  properties.xaxisScaleMin)) * this.graphwidth;
                        }

                        // Account for Y axis pos
                        if ( properties.yaxisPosition == 'center') {
                            barWidth /= 2;
                            barX += halfwidth;
                            
                            if (this.data[i] < 0) {
                                barWidth = (Math.abs(this.data[i]) -  properties.xaxisScaleMin) / (this.max -  properties.xaxisScaleMin);
                                barWidth = barWidth * (this.graphwidth / 2);
                                barX = ((this.graphwidth / 2) + this.marginLeft) - barWidth;
                            } else if (this.data[i] > 0) {
                                barX = (this.graphwidth / 2) + this.marginLeft;
                            }
                            

                        } else if ( properties.yaxisPosition == 'right') {

                            barWidth = Math.abs(barWidth);
                            barX = this.canvas.width - this.marginRight - barWidth;

                        }

                        // Set the fill color
                        this.context.strokeStyle = properties.colorsStroke;
                        this.context.fillStyle   = properties.colors[0];

                        // Sequential colors
                        ++colorIdx;
                        if (properties.colorsSequential && typeof colorIdx === 'number') {
                            if (properties.colors[this.numbars - colorIdx]) {
                                this.context.fillStyle = properties.colors[this.numbars - colorIdx];
                            } else {
                                this.context.fillStyle = properties.colors[properties.colors.length - 1];
                            }
                        }



                        this.context.strokeRect(barX, this.marginTop + (i * height) + properties.marginInner, barWidth, barHeight);
                        this.context.fillRect(barX, this.marginTop + (i * height) + properties.marginInner, barWidth, barHeight);


                            



                        this.coords.push([
                            barX,
                            y + vmargin,
                            barWidth,
                            height - (2 * vmargin),
                            this.context.fillStyle,
                            this.data[i],
                            true
                        ]);






                        // Draw the 3D effect using the coords that have just been stored
                        if (properties.variant === '3d' && typeof this.data[i] == 'number') {


                            var prevStrokeStyle = this.context.strokeStyle,
                                prevFillStyle   = this.context.fillStyle;

                            //
                            // Turn off the shadow for the 3D bits
                            //
                            RGraph.noShadow(this);
                            
                            // DRAW THE 3D BITS HERE
                            var barX    = barX,
                                barY    = y + vmargin,
                                barW    = barWidth,
                                barH    = height - (2 * vmargin),
                                offsetX = properties.variantThreedOffsetx,
                                offsetY = properties.variantThreedOffsety,
                                value   = this.data[i];


                            this.path(
                                'b m % % l % % l % % l % % c s % f % f rgba(255,255,255,0.6)',
                                barX, barY,
                                barX + offsetX - ( properties.yaxisPosition == 'left' && value < 0 ? offsetX : 0), barY - offsetY,
                                barX + barW + offsetX - ( properties.yaxisPosition == 'center' && value < 0 ? offsetX : 0), barY - offsetY,
                                barX + barW, barY,
                                this.context.strokeStyle,this.context.fillStyle
                            );

                            if (    properties.yaxisPosition !== 'right'
                                && !( properties.yaxisPosition === 'center' && value < 0)
                                && value >= 0
                                && !RGraph.isNull(value)
                               ) {

                                this.path(
                                    'b fs % m % % l % % l % % l % % c s % f % f rgba(0,0,0,0.25)',
                                    prevFillStyle,
                                    barX + barW, barY,
                                    barX + barW + offsetX, barY - offsetY,
                                    barX + barW + offsetX, barY - offsetY + barH,
                                    barX + barW, barY + barH,
                                    this.context.strokeStyle,prevFillStyle
                                );
                            }

                        }






                    //
                    // Stacked bar chart
                    //
                    } else if (typeof this.data[i] == 'object' && properties.grouping == 'stacked') {

                        if ( properties.yaxisPosition == 'center') {
                            alert('[HBAR] You can\'t have a stacked chart with the Y axis in the center, change it to grouped');
                        } else if ( properties.yaxisPosition == 'right') {
                            var x = this.canvas.width - this.marginRight
                        }

                        var barHeight = height - (2 * vmargin);

                        if (typeof this.coords2[i] == 'undefined') {
                            this.coords2[i] = [];
                        }

                        for (j=0; j<this.data[i].length; ++j) {

                            // The previous 3D segments would have turned the shadow off - so turn it back on
                            if (properties.shadow && properties.variant === '3d') {
                                this.context.shadowColor   = properties.shadowColor;
                                this.context.shadowBlur    = properties.shadowBlur;
                                this.context.shadowOffsetX = properties.shadowOffsetx;
                                this.context.shadowOffsetY = properties.shadowOffsety;
                            }

                            //
                            // Ensure the number is positive
                            //(even though having the X axis on the right implies a
                            //negative value)
                            //
                            if (!RGraph.isNull(this.data[i][j])) this.data[i][j] = Math.abs(this.data[i][j]);

    
                            var last = (j === (this.data[i].length - 1) );
                            
                            // Set the fill/stroke colors
                            this.context.strokeStyle = properties.colorsStroke;

                            // Sequential colors
                            ++colorIdx;
                            if (properties.colorsSequential && typeof colorIdx === 'number') {
                                if (properties.colors[this.numbars - colorIdx]) {
                                    this.context.fillStyle = properties.colors[this.numbars - colorIdx];
                                } else {
                                    this.context.fillStyle = properties.colors[properties.colors.length - 1];
                                }
                            } else if (properties.colors[j]) {
                                this.context.fillStyle = properties.colors[j];
                            }
                            
    
                            var width = (((this.data[i][j]) / (this.max))) * this.graphwidth;
                            var totalWidth = (RGraph.arraySum(this.data[i]) / this.max) * this.graphwidth;
                            
                            if ( properties.yaxisPosition === 'right') {
                                x -= width;
                            }
                            


                            this.context.strokeRect(x, this.marginTop + properties.marginInner + (this.graphheight / this.data.length) * i, width, height - (2 * vmargin) );
                            this.context.fillRect(x, this.marginTop + properties.marginInner + (this.graphheight / this.data.length) * i, width, height - (2 * vmargin) );


                            //
                            // Store the coords for tooltips
                            //
    
                            // The last property of this array is a boolean which tells you whether the value is the last or not
                            this.coords.push([
                                x,
                                y + vmargin,
                                width,
                                height - (2 * vmargin),
                                this.context.fillStyle,
                                RGraph.arraySum(this.data[i]),
                                j == (this.data[i].length - 1)
                            ]);

                            this.coords2[i].push([
                                x,
                                y + vmargin,
                                width,
                                height - (2 * vmargin),
                                this.context.fillStyle,
                                RGraph.arraySum(this.data[i]),
                                j == (this.data[i].length - 1)
                            ]);






                            // 3D effect
                            if (properties.variant === '3d') {
                            
                                //
                                // Turn off the shadow for the 3D bits
                                //
                                RGraph.noShadow(this);

                                var prevStrokeStyle = this.context.strokeStyle,
                                    prevFillStyle   = this.context.fillStyle;

                                // DRAW THE 3D BITS HERE
                                var barX    = x,
                                    barY    = y + vmargin,
                                    barW    = width,
                                    barH    = height - (2 * vmargin),
                                    offsetX = properties.variantThreedOffsetx,
                                    offsetY = properties.variantThreedOffsety,
                                    value   = this.data[i][j];

                                if (!RGraph.isNull(value)) {
                                    this.path(
                                        'b m % % l % % l % % l % % c s % f % f rgba(255,255,255,0.6)',
                                        barX, barY,
                                        barX + offsetX, barY - offsetY,
                                        barX + barW + offsetX, barY - offsetY,
                                        barX + barW, barY,
                                        this.context.strokeStyle,this.context.fillStyle
                                    );
                                }
    
                                if (    properties.yaxisPosition !== 'right'
                                    && !( properties.yaxisPosition === 'center' && value < 0)
                                    && !RGraph.isNull(value)
                                   ) {

                                    this.path(
                                        'fs % b m % % l % % l % % l % % c s % f % f rgba(0,0,0,0.25)',
                                        prevFillStyle,
                                        barX + barW, barY,
                                        barX + barW + offsetX, barY - offsetY,
                                        barX + barW + offsetX, barY - offsetY + barH,
                                        barX + barW, barY + barH,
                                        this.context.strokeStyle,prevFillStyle
                                    );
                                }
                            
                                this.context.beginPath();
                                this.context.strokeStyle = prevStrokeStyle;
                                this.context.fillStyle   = prevFillStyle;
                            }
    
    
    
    
    
    
                            if ( properties.yaxisPosition !== 'right') {
                                x += width;
                            }
                        }








                    //
                    // A grouped bar chart
                    //
                    } else if (typeof this.data[i] == 'object' && properties.grouping == 'grouped') {

                        var vmarginGrouped      = properties.marginInnerGrouped;
                        var individualBarHeight = ((height - (2 * vmargin) - ((this.data[i].length - 1) * vmarginGrouped)) / this.data[i].length)
                        
                        if (typeof this.coords2[i] == 'undefined') {
                            this.coords2[i] = [];
                        }
                        
                        for (j=(this.data[i].length - 1); j>=0; --j) {
    
                            //
                            // Turn on the shadow if need be
                            //
                            if (properties.shadow) {
                                RGraph.setShadow(
                                    this,
                                    properties.shadowColor,
                                    properties.shadowOffsetx,
                                    properties.shadowOffsety,
                                    properties.shadowBlur
                                );
                            }
    
                            // Set the fill/stroke colors
                            this.context.strokeStyle = properties.colorsStroke;

                            // Sequential colors
                            ++colorIdx;
                            if (properties.colorsSequential && typeof colorIdx === 'number') {
                                if (properties.colors[this.numbars - colorIdx]) {
                                    this.context.fillStyle = properties.colors[this.numbars - colorIdx];
                                } else {
                                    this.context.fillStyle = properties.colors[properties.colors.length - 1];
                                }
                            } else if (properties.colors[j]) {
                                this.context.fillStyle = properties.colors[j];
                            }
    
    
    
                            var startY = this.marginTop + (height * i) + (individualBarHeight * j) + vmargin + (vmarginGrouped * j);
                            var width = ((this.data[i][j] -  properties.xaxisScaleMin) / (this.max -  properties.xaxisScaleMin)) * (this.canvas.width - this.marginLeft - this.marginRight );
                            var startX = this.marginLeft;

    

                            // Account for the Y axis being in the middle
                            if ( properties.yaxisPosition == 'center') {
                                width  /= 2;
                                startX += halfwidth;
                            
                            // Account for the Y axis being on the right
                            } else if ( properties.yaxisPosition == 'right') {
                                width = Math.abs(width);
                                startX = this.canvas.width - this.marginRight - Math.abs(width);
                            }
                            
                            if (width < 0) {
                                startX += width;
                                width *= -1;
                            }
    
                            this.context.strokeRect(startX, startY, width, individualBarHeight);
                            this.context.fillRect(startX, startY, width, individualBarHeight);






                            this.coords.push([
                                startX,
                                startY,
                                width,
                                individualBarHeight,
                                this.context.fillStyle,
                                this.data[i][j],
                                true
                            ]);
    
                            this.coords2[i].push([
                                startX,
                                startY,
                                width,
                                individualBarHeight,
                                this.context.fillStyle,
                                this.data[i][j],
                                true
                            ]);












                            // 3D effect
                            if (properties.variant === '3d') {
                            
                                //
                                // Turn off the shadow for the 3D bits
                                //
                                RGraph.noShadow(this);

                                var prevStrokeStyle = this.context.strokeStyle,
                                    prevFillStyle   = this.context.fillStyle;
                            
                                // DRAW THE 3D BITS HERE
                                var barX    = startX,
                                    barY    = startY,
                                    barW    = width,
                                    barH    = individualBarHeight,
                                    offsetX = properties.variantThreedOffsetx,
                                    offsetY = properties.variantThreedOffsety,
                                    value   = this.data[i][j];
                                
                                this.path(
                                    'b m % % l % % l % % l % % c s % f % f rgba(255,255,255,0.6)',
                                    barX, barY,
                                    barX + offsetX, barY - offsetY,
                                    barX + barW + offsetX - (value < 0 ? offsetX : 0), barY - offsetY,
                                    barX + barW, barY,
                                    this.context.strokeStyle,this.context.fillStyle
                                );
    
                                if (    properties.yaxisPosition !== 'right'
                                    && !( properties.yaxisPosition === 'center' && value < 0)
                                    && value >= 0
                                    && !RGraph.isNull(value)
                                   ) {

                                    this.path(
                                        'fs % b m % %  l % % l % % l % % c s % f % f rgba(0,0,0,0.25)',
                                        prevFillStyle,
                                        barX + barW, barY,
                                        barX + barW + offsetX, barY - offsetY,
                                        barX + barW + offsetX, barY - offsetY + barH,
                                        barX + barW, barY + barH,
                                        this.context.strokeStyle,prevFillStyle
                                    );
                                }





                                this.context.beginPath();
                                this.context.strokeStyle = prevStrokeStyle;
                                this.context.fillStyle   = prevFillStyle;
                            }






                        }
                        
                        startY += vmargin;
                    }
    
                this.context.closePath();
            }
    
            this.context.stroke();
            this.context.fill();
            
            // Under certain circumstances we can cover the shadow
            // overspill with a white rectangle
            if ( properties.yaxisPosition === 'right') {
                this.path(
                    'cr % % % %',
                    this.canvas.width - this.marginRight + properties.variantThreedOffsetx,'0',this.marginRight,this.canvas.height
                );
            }






            // Draw the 3d axes AGAIN if the Y axis is on the right
            if (    properties.yaxisPosition === 'right'
                && properties.variant === '3d'
               ) {
                RGraph.draw3DYAxis(this);
            }
    
            //
            // Now the bars are stroke()ed, turn off the shadow
            //
            RGraph.noShadow(this);
            
            
            //
            // Reverse the coords arrays as the bars are drawn from the borrom up now
            //
            this.coords  = RGraph.arrayReverse(this.coords);
            
            if (properties.grouping === 'grouped') {
                for (var i=0; i<this.coords2.length; ++i) {
                    this.coords2[i] = RGraph.arrayReverse(this.coords2[i]);
                }
            }
            

            this.redrawBars();
        };








        //
        // This function goes over the bars after they been drawn, so that upwards shadows are underneath the bars
        //
        this.redrawBars = function ()
        {
            if (!properties.redraw) {
                return;
            }
    
            var coords = this.coords;
    
            var font   = properties.textFont,
                size   = properties.textSize,
                color  = properties.textColor;
    
            RGraph.noShadow(this);
            this.context.strokeStyle = properties.colorsStroke;
    
            for (var i=0; i<coords.length; ++i) {

                if (properties.shadow) {
                    
                    this.path(
                        'b lw % r % % % % s % f %',
                        properties.linewidth,
                        coords[i][0],coords[i][1],coords[i][2],coords[i][3],
                        properties.colorsStroke,coords[i][4]
                    );
                }





                // Draw labels "above" the bar
                var halign = 'left';
                if (properties.labelsAbove && coords[i][6]) {
    
                    var border = (coords[i][0] + coords[i][2] + 7 + this.context.measureText(properties.labelsAboveUnitsPre + this.coords[i][5] + properties.labelsAboveUnitsPost).width) > this.canvas.width ? true : false,
                        text   = RGraph.numberFormat({
                            object:    this,
                            number:    (this.coords[i][5]).toFixed(properties.labelsAboveDecimals),
                            unitspre:  properties.labelsAboveUnitsPre,
                            unitspost: properties.labelsAboveUnitsPost,
                            point:     properties.labelsAbovePoint,
                            thousand:  properties.labelsAboveThousand
                        });

                    RGraph.noShadow(this);

                    // Check for specific labels
                    if (typeof properties.labelsAboveSpecific === 'object' && properties.labelsAboveSpecific && properties.labelsAboveSpecific[i]) {
                        text = properties.labelsAboveSpecific[i];
                    }

                    var x = coords[i][0] + coords[i][2] + 5;
                    var y = coords[i][1] + (coords[i][3] / 2);
                    
                    if ( properties.yaxisPosition === 'right') {
                        x = coords[i][0] - 5;
                        halign = 'right';
                    } else if ( properties.yaxisPosition === 'center' && this.data_arr[i] < 0) {
                        x = coords[i][0] - 5;
                        halign = 'right';
                    }
                    
                    var textConf = RGraph.getTextConf({
                        object: this,
                        prefix: 'labelsAbove'
                    });




                    RGraph.text({
                    
                   object: this,

                     font: textConf.font,
                     size: textConf.size,
                    color: textConf.color,
                     bold: textConf.bold,
                   italic: textConf.italic,

                        x:          x + properties.labelsAboveOffsetx,
                        y:          y + properties.labelsAboveOffsety,
                        text:       text,
                        valign:     'center',
                        halign:     halign,
                        tag:        'labels.above'
                    });
                }
            }
        };








        //
        // This function can be used to get the appropriate bar information (if any)
        // 
        // @param  e Event object
        // @return   Appriate bar information (if any)
        //
        this.getShape = function (e)
        {
            var mouseXY = RGraph.getMouseXY(e);

            //
            // Loop through the bars determining if the mouse is over a bar
            //
            for (var i=0,len=this.coords.length; i<len; i++) {
    
                var mouseX = mouseXY[0],  // In relation to the canvas
                    mouseY = mouseXY[1],  // In relation to the canvas
                    left   = this.coords[i][0],
                    top    = this.coords[i][1],
                    width  = this.coords[i][2],
                    height = this.coords[i][3],
                    idx    = i;



                // Recreate the path/rectangle so that it can be tested
                //  ** DO NOT STROKE OR FILL IT **
                if (properties.tooltipsHotspotYonly) {
                    this.path(
                        'b r % % % % ',
                        this.marginLeft, top, this.canvas.width - this.marginRight - this.marginLeft, height
                    );
                } else {
                    this.path(
                        'b r % % % %',
                        left,top,width,height
                    );
                }

                if (this.context.isPointInPath(mouseX, mouseY)) {

                    if (RGraph.parseTooltipText) {
                        var tooltip = RGraph.parseTooltipText(properties.tooltips, i);
                    }

                    var indexes = RGraph.sequentialIndexToGrouped(idx, this.data);
                    var group   = indexes[0];
                    var index   = indexes[1];

                    return {
                        object: this,
                             x: left,
                             y: top,
                         width: width,
                        height: height,
               sequentialIndex: idx,
                       dataset: group,
                         index: index,
                         label:  properties.yaxisLabels && typeof  properties.yaxisLabels[group] === 'string' ?  properties.yaxisLabels[group] : null,
                       tooltip: typeof tooltip === 'string' ? tooltip : null
                    };
                }
            }
        };








        //
        // When you click on the chart, this method can return the X value at that point. It works for any point on the
        // chart (that is inside the margins) - not just points within the Bars.
        // 
        // @param object e The event object
        //
        this.getValue = function (arg)
        {
            if (arg.length == 2) {
                var mouseX = arg[0];
                var mouseY = arg[1];
            } else {
                var mouseCoords = RGraph.getMouseXY(arg);
                var mouseX      = mouseCoords[0];
                var mouseY      = mouseCoords[1];
            }

            if (   mouseY < this.marginTop
                || mouseY > (this.canvas.height - this.marginBottom)
                || mouseX < this.marginLeft
                || mouseX > (this.canvas.width - this.marginRight)
               ) {
                return null;
            }





            if ( properties.yaxisPosition == 'center') {
                var value = ((mouseX - this.marginLeft) / (this.graphwidth / 2)) * (this.max -  properties.xaxisScaleMin);
                    value = value - this.max

                    // Special case if xmin is defined
                    if ( properties.xaxisScaleMin > 0) {
                        value = ((mouseX - this.marginLeft - (this.graphwidth / 2)) / (this.graphwidth / 2)) * (this.max -  properties.xaxisScaleMin);
                        value +=  properties.xaxisScaleMin;
                        
                        if (mouseX < (this.marginLeft + (this.graphwidth / 2))) {
                            value -= (2 *  properties.xaxisScaleMin);
                        }
                    }
            
            
            // TODO This needs fixing
            } else if ( properties.yaxisPosition == 'right') {
                var value = ((mouseX - this.marginLeft) / this.graphwidth) * (this.scale2.max -  properties.xaxisScaleMin);
                    value = this.scale2.max - value;

            } else {
                var value = ((mouseX - this.marginLeft) / this.graphwidth) * (this.scale2.max -  properties.xaxisScaleMin);
                    value +=  properties.xaxisScaleMin;
            }

            return value;
        };








        //
        // Each object type has its own Highlight() function which highlights the appropriate shape
        // 
        // @param object shape The shape to highlight
        //
        this.highlight = function (shape)
        {
            // highlightStyle is a function - user defined highlighting
            if (typeof properties.highlightStyle === 'function') {
                (properties.highlightStyle)(shape);
            
            // Highlight all of the rects except this one - essentially an inverted highlight
            } else if (typeof properties.highlightStyle === 'string' && properties.highlightStyle === 'invert') {
                for (var i=0; i<this.coords.length; ++i) {
                    if (i !== shape.sequentialIndex) {
                        this.path(
                            'b r % % % % s % f %',
                            this.coords[i][0] + 1,this.coords[i][1],this.coords[i][2],this.coords[i][3],
                            properties.highlightStroke,
                            properties.highlightFill
                        );
                    }
                }
            
            // Standard higlight
            } else {
                RGraph.Highlight.rect(this, shape);
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

            // Adjust the mouse Y coordinate for when the bar chart is
            // a 3D variant
            if (properties.variant === '3d' && !properties.textAccessible) {
                var adjustment = properties.variantThreedAngle * mouseXY[0];
                mouseXY[1] -= adjustment;
            }


            if (
                   mouseXY[0] >= this.marginLeft
                && mouseXY[0] <= (this.canvas.width - this.marginRight)
                && mouseXY[1] >= this.marginTop
                && mouseXY[1] <= (this.canvas.height - this.marginBottom)
                ) {
    
                return this;
            }
        };








        //
        // Returns the appropriate X coord for the given value
        // 
        // @param number value The value to get the coord for
        //
        this.getXCoord = function (value)
        {
            if ( properties.yaxisPosition == 'center') {
        
                // Range checking
                if (value > this.max || value < (-1 * this.max)) {
                    return null;
                }
    
                var width = (this.canvas.width - properties.marginLeft - properties.marginRight) / 2;
                var coord = (((value -  properties.xaxisScaleMin) / (this.max -  properties.xaxisScaleMin)) * width) + width;
    
                    coord = properties.marginLeft + coord;
            } else {
            
                // Range checking
                if (value > this.max || value < 0) {
                    return null;
                }

                var width = this.canvas.width - properties.marginLeft - properties.marginRight;
                var coord = ((value -  properties.xaxisScaleMin) / (this.max -  properties.xaxisScaleMin)) * width;
    
                    coord = properties.marginLeft + coord;
            }
    
            return coord;
        };








        //
        // 
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                //this.original_colors['chart.'] = RGraph.arrayClone(properties.);
                this.original_colors.colors               = RGraph.arrayClone(properties.colors);
                this.original_colors.backgroundGridColor  = RGraph.arrayClone(properties.backgroundGridColor);
                this.original_colors.backgroundColor      = RGraph.arrayClone(properties.backgroundColor);
                this.original_colors.backgroundBarsColor1 = RGraph.arrayClone(properties.backgroundBarsColor1);
                this.original_colors.backgroundBarsColor2 = RGraph.arrayClone(properties.backgroundBarsColor2);
                this.original_colors.textColor            = RGraph.arrayClone(properties.textColor);
                this.original_colors.yaxisLabelsColor     = RGraph.arrayClone(properties.yaxisLabelsColor);
                this.original_colors.colorsStroke         = RGraph.arrayClone(properties.colorsStroke);
                this.original_colors.axesColor            = RGraph.arrayClone(properties.axesColor);
                this.original_colors.highlightFill        = RGraph.arrayClone(properties.highlightFill);
                this.original_colors.highlightStroke      = RGraph.arrayClone(properties.highlightStroke);
                this.original_colors.annotatableColor     = RGraph.arrayClone(properties.annotatableColor);
                
            }

            var colors = properties.colors;
    
            for (var i=0; i<colors.length; ++i) {
                colors[i] = this.parseSingleColorForGradient(colors[i]);
            }
            
            properties.backgroundGridColor  = this.parseSingleColorForGradient(properties.backgroundGridColor);
            properties.backgroundColor      = this.parseSingleColorForGradient(properties.backgroundColor);
            properties.backgroundBarsColor1 = this.parseSingleColorForGradient(properties.backgroundBarsColor1);
            properties.backgroundBarsColor2 = this.parseSingleColorForGradient(properties.backgroundBarsColor2);
            properties.textColor            = this.parseSingleColorForGradient(properties.textColor);
            properties.yaxisLabelsColor     = this.parseSingleColorForGradient(properties.yaxisLabelsColor);
            properties.colorsStroke         = this.parseSingleColorForGradient(properties.colorsStroke);
            properties.axesColor            = this.parseSingleColorForGradient(properties.axesColor);
            properties.highlightFill        = this.parseSingleColorForGradient(properties.highlightFill);
            properties.highlightStroke      = this.parseSingleColorForGradient(properties.highlightStroke);
            properties.annotatableColor     = this.parseSingleColorForGradient(properties.annotatableColor);
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
                
                if ( properties.yaxisPosition === 'right') {
                    parts = RGraph.arrayReverse(parts);
                }
    
                // Create the gradient
                var grad = this.context.createLinearGradient(properties.marginLeft,0,this.canvas.width - properties.marginRight,0);
    
                var diff = 1 / (parts.length - 1);
    
                grad.addColorStop(0, RGraph.trim(parts[0]));
    
                for (var j=1; j<parts.length; ++j) {
                    grad.addColorStop(j * diff, RGraph.trim(parts[j]));
                }
            }
                
            return grad ? grad : color;
        };








        //
        // This function handles highlighting an entire data-series for the interactive
        // key
        // 
        // @param int index The index of the data series to be highlighted
        //
        this.interactiveKeyHighlight = function (index)
        {
            var obj = this;

            this.coords2.forEach(function (value, idx, arr)
            {
                var coords        = obj.coords2[idx][index],
                    pre_linewidth = obj.context.lineWidth;

                obj.path(
                    'b lw 2 r % % % % f % s % lw %',
                    coords[0], coords[1], coords[2], coords[3],
                    properties.keyInteractiveHighlightChartFill,
                    properties.keyInteractiveHighlightChartStroke,
                    pre_linewidth
                );
            });
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
        // This retrives the bar based on the X coordinate only.
        // 
        // @param object e The event object
        // @param object   OPTIONAL You can pass in the bar object instead of the
        //                          function using "this"
        //
        this.getShapeByY = function (e)
        {
            var mouseXY = RGraph.getMouseXY(e);
    
    
            // This facilitates you being able to pass in the bar object as a parameter instead of
            // the function getting it from itself
            var obj = arguments[1] ? arguments[1] : this;
    
    
            //
            // Loop through the bars determining if the mouse is over a bar
            //
            for (var i=0,len=obj.coords.length; i<len; i++) {

                if (obj.coords[i].length == 0) {
                    continue;
                }

                var mouseX = mouseXY[0],
                    mouseY = mouseXY[1],    
                    left   = obj.coords[i][0],
                    top    = obj.coords[i][1],
                    width  = obj.coords[i][2],
                    height = obj.coords[i][3];
    
                if (mouseY >= top && mouseY <= (top + height)) {

                    var indexes = RGraph.sequentialIndexToGrouped(i, this.data);
                    var group   = indexes[0];
                    var index   = indexes[1];

                    if (properties.tooltips) {
                        var tooltip = RGraph.parseTooltipText ? RGraph.parseTooltipText(properties.tooltips, i) : properties.tooltips[i];
                    }    

                    return {
                         object: obj,
                              x: left,
                              y: top,
                          width: width,
                         height: height,
                        dataset: group,
                          index: index,
                sequentialIndex: i,
                        tooltip: tooltip || null
                    };
                }
            }
            
            return null;
        };








        //
        // This method handles the adjusting calculation for when the mouse is moved
        // 
        // @param object e The event object
        //
        this.adjusting_mousemove = function (e)
        {
            //
            // Handle adjusting for the Bar
            //
            if (properties.adjustable && RGraph.Registry.get('adjusting') && RGraph.Registry.get('adjusting').uid == this.uid) {

                // Rounding the value to the given number of decimals make the chart step
                var value = Number(this.getValue(e)),
                    shape = RGraph.Registry.get('adjusting.shape');

                if (shape) {

                    RGraph.Registry.set('adjusting.shape', shape);

                    if (this.stackedOrGrouped && properties.grouping == 'grouped') {

                        var indexes = RGraph.sequentialIndexToGrouped(shape.sequentialIndex, this.data);

                        if (typeof this.data[indexes[0]] == 'number') {
                            this.data[indexes[0]] = Number(value);
                        } else if (!RGraph.isNull(this.data[indexes[0]])) {
                            this.data[indexes[0]][indexes[1]] = Number(value);
                        }
                    } else if (typeof this.data[shape.dataset] == 'number') {

                        this.data[shape.dataset] = Number(value);
                    }
    
                    RGraph.redrawCanvas(e.target);
                    RGraph.fireCustomEvent(this, 'onadjust');
                }
            }
        };








        //
        // Grow
        // 
        // The HBar chart Grow effect gradually increases the values of the bars
        // 
        // @param object   OPTIONAL Options for the effect. You can pass frames here
        // @param function OPTIONAL A callback function
        //
        //this.grow = function ()
        //{
        //    var obj         = this,
        //        opt         = arguments[0] || {},
        //        frames      = opt.frames || 30,
        //        frame       = 0,
        //        callback    = arguments[1] || function () {},
        //        labelsAbove = properties.labelsAbove;
        //    
        //    this.set('labelsAbove', false);


        //    // Save the data
        //    obj.original_data = RGraph.arrayClone(obj.data);


        //    // Stop the scale from changing by setting xaxisScaleMax (if it's not already set)

        //    if ( properties.xaxisScaleMax == 0) {

        //        var xmax = 0;
    
        //        for (var i=0; i<obj.data.length; ++i) {
        //            if (RGraph.isArray(obj.data[i]) && properties.grouping == 'stacked') {
        //                xmax = Math.max(xmax, RGraph.arraySum(obj.data[i]));
        //            } else if (RGraph.isArray(obj.data[i]) && properties.grouping == 'grouped') {
        //                xmax = Math.max(xmax, RGraph.arrayMax(obj.data[i]));
        //            } else {
        //                xmax = Math.max(xmax, Math.abs(RGraph.arrayMax(obj.data[i])));
        //            }
        //        }

        //        var scale2 = RGraph.getScale({object: obj, options: {'scale.max': xmax,'scale.round': obj.properties.xaxisScaleRound}});
        //        obj.set('xaxisScaleMax', scale2.max);
        //    }

        //    function iterator ()
        //    {
        //        // Alter the Bar chart data depending on the frame
        //        for (var j=0,len=obj.original_data.length; j<len; ++j) {
        //            
        //            // This stops the animation from being completely linear
        //            var easingFactor = RGraph.Effects.getEasingMultiplier(frames, frame);
    
        //            if (typeof obj.data[j] === 'object' && obj.data[j]) {
        //                for (var k=0,len2=obj.data[j].length; k<len2; ++k) {
        //                    obj.data[j][k] = RGraph.isNull(obj.data[j][k]) ? null : obj.original_data[j][k] * easingFactor;
        //                }
        //            } else {
        //                obj.data[j] = RGraph.isNull(obj.data[j]) ? null : obj.original_data[j] * easingFactor;
        //            }
        //        }
    
    

        //       RGraph.redrawCanvas(obj.canvas);
    
        //        if (frame < frames) {
        //            frame += 1;
        //           RGraph.Effects.updateCanvas(iterator);
        //        } else {

        //            if (labelsAbove) {
        //                obj.set('labelsAbove', true);
        //                RGraph.redraw();
        //            }

        //            callback(obj);
        //        }
        //    }
            
        //    iterator();
            
        //    return this;
        //};








        //
        // Grow
        //
        // The HBar chart Grow effect gradually increases the values of the bars
        //
        // @param object       An object of options - eg: {frames: 30}
        // @param function     A function to call when the effect is complete
        //
        this.grow = function ()
        {
            // Callback
            var opt         = arguments[0] || {},
                frames      = opt.frames || 30,
                frame       = 0,
                callback    = arguments[1] || function () {},
                obj         = this,
                labelsAbove = this.get('labelsAbove')




            this.original_data = RGraph.arrayClone(this.data);



            // Stop the scale from changing by setting xaxisScalemax (if it's not already set)
            if ( properties.xaxisScaleMax == 0) {

                var xmax = 0;
    
                for (var i=0; i<obj.data.length; ++i) {
                    if (RGraph.isArray(obj.data[i]) && properties.grouping == 'stacked') {
                        xmax = Math.max(xmax, RGraph.arraySum(obj.data[i]));
                    } else if (RGraph.isArray(obj.data[i]) && properties.grouping == 'grouped') {
                        xmax = Math.max(xmax, RGraph.arrayMax(obj.data[i]));
                    } else {
                        xmax = Math.max(xmax, Math.abs(RGraph.arrayMax(obj.data[i])));
                    }
                }

                var scale2 = RGraph.getScale({object: obj, options: {'scale.max':xmax, 'scale.round': obj.properties.xaxisScaleRound}});
                obj.set('xaxisScaleMax', scale2.max);
            }


            // Go through the data and change string arguments of the format +/-[0-9]
            // to absolute numbers
            if (RGraph.isArray(opt.data)) {

                var xmax = 0;

                for (var i=0; i<opt.data.length; ++i) {
                    if (typeof opt.data[i] === 'object') {
                        for (var j=0; j<opt.data[i].length; ++j) {
                            if (typeof opt.data[i][j] === 'string'&& opt.data[i][j].match(/(\+|\-)([0-9]+)/)) {
                                if (RegExp.$1 === '+') {
                                    opt.data[i][j] = this.original_data[i][j] + parseInt(RegExp.$2);
                                } else {
                                    opt.data[i][j] = this.original_data[i][j] - parseInt(RegExp.$2);
                                }
                            }

                            xmax = Math.max(xmax, opt.data[i][j]);
                        }
                    } else if (typeof opt.data[i] === 'string' && opt.data[i].match(/(\+|\-)([0-9]+)/)) {
                        if (RegExp.$1 === '+') {
                            opt.data[i] = this.original_data[i] + parseFloat(RegExp.$2);
                        } else {
                            opt.data[i] = this.original_data[i] - parseFloat(RegExp.$2);
                        }

                        xmax = Math.max(xmax, opt.data[i]);
                    } else {
                        xmax = Math.max(xmax, opt.data[i]);
                    }
                }


                var scale = RGraph.getScale({object: this, options: {'scale.max':xmax}});
                if (RGraph.isNull(this.get('xaxisScaleMax'))) {
                    this.set('xaxisScaleMax', scale.max);
                }
            }








            //
            // turn off the labelsAbove option whilst animating
            //
            this.set('labelsAbove', false);








            // Stop the scale from changing by setting xaxisScaleMax (if it's not already set)
            if (RGraph.isNull( properties.xaxisScaleMax)) {

                var xmax = 0;

                for (var i=0; i<obj.data.length; ++i) {
                    if (RGraph.isArray(this.data[i]) && properties.grouping === 'stacked') {
                        xmax = Math.max(xmax, Math.abs(RGraph.arraySum(this.data[i])));

                    } else if (RGraph.isArray(this.data[i]) && properties.grouping === 'grouped') {

                        for (var j=0,group=[]; j<this.data[i].length; j++) {
                            group.push(Math.abs(this.data[i][j]));
                        }

                        xmax = Math.max(xmax, Math.abs(RGraph.arrayMax(group)));

                    } else {
                        xmax = Math.max(xmax, Math.abs(this.data[i]));
                    }
                }

                var scale = RGraph.getScale({object: this, options: {'scale.max':xmax}});
                this.set('xaxisScaleMax', scale.max);
            }

            // You can give an xmax to the grow function
            if (typeof opt.xmax === 'number') {
                obj.set('xaxisScaleMax', opt.xmax);
            }



            var iterator = function ()
            {
                var easingMultiplier = RGraph.Effects.getEasingMultiplier(frames, frame);

                // Alter the Bar chart data depending on the frame
                for (var j=0,len=obj.original_data.length; j<len; ++j) {
                    if (typeof obj.data[j] === 'object' && !RGraph.isNull(obj.data[j])) {
                        for (var k=0,len2=obj.data[j].length; k<len2; ++k) {
                            if (obj.firstDraw || !opt.data) {
                                obj.data[j][k] = easingMultiplier * obj.original_data[j][k];
                            } else if (opt.data && opt.data.length === obj.original_data.length) {
                                var diff    = opt.data[j][k] - obj.original_data[j][k];
                                obj.data[j][k] = (easingMultiplier * diff) + obj.original_data[j][k];
                            }
                        }
                    } else {

                        if (obj.firstDraw || !opt.data) {
                            obj.data[j] = easingMultiplier * obj.original_data[j];
                        } else if (opt.data && opt.data.length === obj.original_data.length) {
                            var diff    = opt.data[j] - obj.original_data[j];
                            obj.data[j] = (easingMultiplier * diff) + obj.original_data[j];
                        }
                    }
                }




                //RGraph.clear(obj.canvas);
                RGraph.redrawCanvas(obj.canvas);




                if (frame < frames) {
                    frame += 1;

                    RGraph.Effects.updateCanvas(iterator);

                // Call the callback function
                } else {





                    // Do some housekeeping if new data was specified thats done in
                    // the constructor - but needs to be redone because new data
                    // has been specified
                    if (RGraph.isArray(opt.data)) {

                        var linear_data = RGraph.arrayLinearize(data);

                        for (var i=0; i<linear_data.length; ++i) {
                            if (!obj['$' + i]) {
                                obj['$' + i] = {};
                            }
                        }
                    }



                    obj.data = data;
                    obj.original_data = RGraph.arrayClone(data);





                    if (labelsAbove) {
                        obj.set('labelsAbove', true);
                        RGraph.redraw();
                    }
                    callback(obj);
                }
            };

            iterator();

            return this;
        };








        //
        // (new) Bar chart Wave effect. This is a rewrite that should be smoother
        // because it just uses a single loop and not setTimeout
        // 
        // @param object   OPTIONAL An object map of options. You specify 'frames' here to give the number of frames in the effect
        // @param function OPTIONAL A function that will be called when the effect is complete
        //
        this.wave = function ()
        {
            var obj = this,
                opt = arguments[0] || {};
                opt.frames      = opt.frames || 60;
                opt.startFrames = [];
                opt.counters    = [];

            var framesperbar   = opt.frames / 3,
                frame          = -1,
                callback       = arguments[1] || function () {},
                original       = RGraph.arrayClone(obj.data),
                labelsAbove    = properties.labelsAbove;

            this.set('labelsAbove', false);

            for (var i=0,len=obj.data.length; i<len; i+=1) {
                opt.startFrames[i] = ((opt.frames / 2) / (obj.data.length - 1)) * i;
                
                if (typeof obj.data[i] === 'object' && obj.data[i]) {
                    opt.counters[i] = [];
                    for (var j=0; j<obj.data[i].length; j++) {
                        opt.counters[i][j] = 0;
                    }
                } else {
                    opt.counters[i]    = 0;
                }
            }

            //
            // This stops the chart from jumping
            //
            obj.draw();
            obj.set('xaxisScaleMax', obj.scale2.max);
            RGraph.clear(obj.canvas);

            function iterator ()
            {
                ++frame;

                for (var i=0,len=obj.data.length; i<len; i+=1) {
                    if (frame > opt.startFrames[i]) {
                        if (typeof obj.data[i] === 'number') {
                            
                            obj.data[i] = Math.min(
                                Math.abs(original[i]),
                                Math.abs(original[i] * ( (opt.counters[i]++) / framesperbar))
                            );
                            
                            // Make the number negative if the original was
                            if (original[i] < 0) {
                                obj.data[i] *= -1;
                            }
                        } else if (!RGraph.isNull(obj.data[i])) {
                            for (var j=0,len2=obj.data[i].length; j<len2; j+=1) {
                                
                                obj.data[i][j] = Math.min(
                                    Math.abs(original[i][j]),
                                    Math.abs(original[i][j] * ( (opt.counters[i][j]++) / framesperbar))
                                );

                                // Make the number negative if the original was
                                if (original[i][j] < 0) {
                                    obj.data[i][j] *= -1;
                                }
                            }
                        }
                    } else {
                        obj.data[i] = typeof obj.data[i] === 'object' && obj.data[i] ? RGraph.arrayPad([], obj.data[i].length, 0) : (RGraph.isNull(obj.data[i]) ? null : 0);
                    }
                }


                if (frame >= opt.frames) {

                    if (labelsAbove) {
                        obj.set('labelsAbove', true);
                        RGraph.redrawCanvas(obj.canvas);
                    }

                    callback(obj);
                } else {
                    RGraph.redrawCanvas(obj.canvas);
                    RGraph.Effects.updateCanvas(iterator);
                }
            }
            
            iterator();

            return this;
        };








        //
        // Determines whether the given shape is adjustable or not
        //
        // @param object The shape that pertains to the relevant bar
        //
        this.isAdjustable = function (shape)
        {
            if (RGraph.isNull(properties.adjustableOnly)) {
                return true;
            }

            if (RGraph.isArray(properties.adjustableOnly) && properties.adjustableOnly[shape.sequentialIndex]) {
                return true;
            }

            return false;
        };








        //
        // A worker function that handles Bar chart specific tooltip substitutions
        //
        this.tooltipSubstitutions = function (opt)
        {
            var indexes = RGraph.sequentialIndexToGrouped(opt.index, this.data);
            
            if (typeof this.data[indexes[0]] === 'object') {
                var values = this.data[indexes[0]];
            } else {
                var values = [this.data[indexes[0]]];
            }
            
            var value = this.data_arr[opt.index];
            var index = indexes[1];
            var seq   = opt.index;

            // Skirt an indexes bug
            if (typeof this.data[indexes[0]] === 'object' && properties.grouping === 'stacked') {
                value = this.data[indexes[0]][this.data[indexes[0]].length - 1 - indexes[1]];
            }

            //
            // Return the values to the user
            //
            return {
                  index: index,
                dataset: indexes[0],
        sequentialIndex: seq,
                  value: value,
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
           if (this.stackedOrGrouped) {
                var label = (!RGraph.isNull(properties.tooltipsFormattedKeyLabels) && typeof properties.tooltipsFormattedKeyLabels === 'object' && properties.tooltipsFormattedKeyLabels[index])
                                ? properties.tooltipsFormattedKeyLabels[index]
                                : '';

            } else {
                var label = (
                             !RGraph.isNull(properties.tooltipsFormattedKeyLabels)
                             && typeof properties.tooltipsFormattedKeyLabels === 'object'
                             && properties.tooltipsFormattedKeyLabels[specific.index]
                            )
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
                canvasXY = RGraph.getCanvasXY(obj.canvas)
                coords   = this.coords[args.index];

            // Position the tooltip in the X direction
            args.tooltip.style.left = (
                canvasXY[0]                      // The X coordinate of the canvas
                + coords[0]                      // The X coordinate of the point on the chart
                + (coords[2] / 2)                // Add half of the width of the bar
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
                + obj.properties.tooltipsOffsetx // Add any user defined offset
            ) + 'px';

            args.tooltip.style.top  = (
                  canvasXY[1]                    // The Y coordinate of the canvas
                + coords[1]                      // The Y coordinate of the bar on the chart
                - tooltip.offsetHeight           // The height of the tooltip
                - 15                             // An arbitrary amount
                + obj.properties.tooltipsOffsety // Add any user defined offset
            ) + 'px';












// If the chart is a 3D version the tooltip Y position needs this
// adjustment
if (properties.variant === '3d') {
    var left  = parseInt(args.tooltip.style.left);
    var top   = coords[1];
    var angle = properties.variantThreedAngle;

    var adjustment = Math.tan(angle) * left;

    args.tooltip.style.top = parseInt(args.tooltip.style.top) + adjustment - (properties.textAccessible ? 20 : 0) + 'px';
}















            // If the top of the tooltip is off the top of the page
            // then move the tooltip down
            if(parseFloat(args.tooltip.style.top) < 0) {
                args.tooltip.style.top = parseFloat(args.tooltip.style.top) + (coords[3] / 2) + 5 + 'px';
            }
        };








        //
        // Charts are now always registered
        //
        RGraph.register(this);








        //
        // This is the 'end' of the constructor so if the first argument
        // contains configuration data - handle that.
        //
        RGraph.parseObjectStyleConfig(this, conf.options);
    };