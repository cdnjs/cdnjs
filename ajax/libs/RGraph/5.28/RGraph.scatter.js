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
    // The scatter graph constructor
    //
    RGraph.Scatter = function (conf)
    {
        this.data = new Array(conf.data.length);

       // Store the data set(s)
        this.data = RGraph.arrayClone(conf.data);


        // Account for just one dataset being given
        if (typeof conf.data === 'object' && typeof conf.data[0] === 'object' && (typeof conf.data[0][0] === 'number' || typeof conf.data[0][0] === 'string')) {
            var tmp = RGraph.arrayClone(conf.data);
            conf.data = new Array();
            conf.data[0] = RGraph.arrayClone(tmp);
            
            this.data = RGraph.arrayClone(conf.data);
        }



        // First, if there's only been a single passed to us, convert it to
        // the multiple dataset format
        if (!RGraph.isArray(this.data[0][0])) {
            this.data = [this.data];
        }







        // If necessary convert X/Y values passed as strings to numbers
        for (var i=0,len=this.data.length; i<len; ++i) { // Datasets
            for (var j=0,len2=this.data[i].length; j<len2; ++j) { // Points

                // Handle the conversion of X values
                if (typeof this.data[i][j] === 'object' && !RGraph.isNull(this.data[i][j]) && typeof this.data[i][j][0] === 'string') {
                    if (this.data[i][j][0].match(/^[.0-9]+$/)) {
                        this.data[i][j][0] = parseFloat(this.data[i][j][0]);
                    } else if (this.data[i][j][0] === '') {
                        this.data[i][j][0] = 0;
                    }
                }

                // Handle the conversion of Y values
                if (typeof this.data[i][j] === 'object' && !RGraph.isNull(this.data[i][j]) && typeof this.data[i][j][1] === 'string') {
                    if (this.data[i][j][1].match(/[.0-9]+/)) {
                        this.data[i][j][1] = parseFloat(this.data[i][j][1]);
                    } else if (this.data[i][j][1] === '') {
                        this.data[i][j][1] = 0;
                    }
                }
            }
        }


        this.id                = conf.id;
        this.canvas            = document.getElementById(this.id);
        this.canvas.__object__ = this;
        this.context           = this.canvas.getContext ? this.canvas.getContext('2d') : null;
        this.max               = 0;
        this.coords            = [];
        this.type              = 'scatter';
        this.isRGraph          = true;
        this.isrgraph          = true;
        this.rgraph            = true;
        this.uid               = RGraph.createUID();
        this.canvas.uid        = this.canvas.uid ? this.canvas.uid : RGraph.createUID();
        this.colorsParsed      = false;
        this.coordsText        = [];
        this.coordsBubble      = [];
        this.original_colors   = [];
        this.firstDraw         = true; // After the first draw this will be false




        // Various config properties
        this.properties = {
            backgroundBarsCount:        null,
            backgroundBarsColor1:       'rgba(0,0,0,0)',
            backgroundBarsColor2:       'rgba(0,0,0,0)',
            backgroundHbars:            null,
            backgroundVbars:            null,
            backgroundGrid:             true,
            backgroundGridLinewidth:    1,
            backgroundGridColor:        '#ddd',
            backgroundGridHsize:        20,
            backgroundGridVsize:        20,
            backgroundGridVlines:       true,
            backgroundGridHlines:       true,
            backgroundGridBorder:       true,
            backgroundGridAutofit:      true,
            backgroundGridAutofitAlign: true,
            backgroundGridHlinesCount:  5,
            backgroundGridVlinesCount:  20,
            backgroundImage:            null,
            backgroundImageStretch:     true,
            backgroundImageX:           null,
            backgroundImageY:           null,
            backgroundImageW:           null,
            backgroundImageH:           null,
            backgroundImageAlign:       null,
            backgroundColor:            null,

            colors:                     [], // This is used internally for the tooltip key
            colorsBubbleGraduated:      true,
            
            textColor:                  'black',
            textFont:                   'Arial, Verdana, sans-serif',
            textSize:                   12,
            textBold:                   false,
            textItalic:                 false,
            textAccessible:             true,
            textAccessibleOverflow:     'visible',
            textAccessiblePointerevents:false,
            
            tooltips:                   [], // Default must be an empty array
            tooltipsEffect:             'fade',
            tooltipsEvent:              'onmousemove',
            tooltipsHotspot:            3,
            tooltipsCssClass:           'RGraph_tooltip',
            tooltipsCss:                null,
            tooltipsHighlight:          true,
            tooltipsCoordsPage:         false,
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


            xaxis:                      true,
            xaxisLinewidth:             1,
            xaxisColor:                 'black',
            xaxisTickmarks:             true,
            xaxisTickmarksLength:       3,
            xaxisTickmarksLastLeft:     null,
            xaxisTickmarksLastRight:    null,
            xaxisTickmarksCount:        null,
            xaxisLabels:                null,            
            xaxisLabelsSize:            null,
            xaxisLabelsFont:            null,
            xaxisLabelsItalic:          null,
            xaxisLabelsBold:            null,
            xaxisLabelsColor:           null,
            xaxisLabelsOffsetx:         0,
            xaxisLabelsOffsety:         0,
            xaxisLabelsHalign:          null,
            xaxisLabelsValign:          null,
            xaxisLabelsPosition:        'section',
            xaxisLabelsSpecificAlign:   'left',
            xaxisPosition:              'bottom',
            xaxisLabelsAngle:           0,
            xaxisTitle:                 '',
            xaxisTitleBold:             null,
            xaxisTitleSize:             null,
            xaxisTitleFont:             null,
            xaxisTitleColor:            null,
            xaxisTitleItalic:           null,
            xaxisTitlePos:              null,
            xaxisTitleOffsetx:          0,
            xaxisTitleOffsety:          0,
            xaxisTitleX:                null,
            xaxisTitleY:                null,
            xaxisTitleHalign:           'center',
            xaxisTitleValign:           'top',
            xaxisScale:                 false,
            xaxisScaleMin:              0,
            xaxisScaleMax:              null,
            xaxisScaleUnitsPre:         '',
            xaxisScaleUnitsPost:        '',
            xaxisScaleLabelsCount:      10,
            xaxisScaleFormatter:        null,
            xaxisScaleDecimals:         0,
            xaxisScaleThousand:         ',',
            xaxisScalePoint:            '.',

            yaxis:                    true,
            yaxisLinewidth:           1,
            yaxisColor:               'black',
            yaxisTickmarks:           true,
            yaxisTickmarksCount:      null,
            yaxisTickmarksLastTop:    null,
            yaxisTickmarksLastBottom: null,
            yaxisTickmarksLength:     3,
            yaxisScale:               true,
            yaxisScaleMin:            0,
            yaxisScaleMax:            null,
            yaxisScaleUnitsPre:       '',
            yaxisScaleUnitsPost:      '',
            yaxisScaleDecimals:       0,
            yaxisScalePoint:          '.',
            yaxisScaleThousand:       ',',
            yaxisScaleRound:          false,
            yaxisScaleInvert:         false,
            yaxisScaleFormatter:      null,
            yaxisLabelsSpecific:      null,
            yaxisLabelsCount:         5,
            yaxisLabelsOffsetx:       0,
            yaxisLabelsOffsety:       0,
            yaxisLabelsHalign:        null,
            yaxisLabelsValign:        null,
            yaxisLabelsFont:          null,
            yaxisLabelsSize:          null,
            yaxisLabelsColor:         null,
            yaxisLabelsBold:          null,
            yaxisLabelsItalic:        null,
            yaxisLabelsPosition:      'edge',
            yaxisPosition:            'left',
            yaxisTitle:               '',
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
            
            tickmarksStyle:             'cross',
            tickmarksStyleImageHalign:  'center',
            tickmarksStyleImageValign:  'center',
            tickmarksStyleImageOffsetx: 0,
            tickmarksStyleImageOffsety: 0,
            tickmarksSize:              5,
            
            marginLeft:                 35,
            marginRight:                35,
            marginTop:                  35,
            marginBottom:               35,

            title:                      '',
            titleBackground:            null,
            titleHpos:                  null,
            titleVpos:                  null,
            titleBold:                  null,
            titleItalic:                null,
            titleFont:                  null,
            titleSize:                  null,
            titleItalic:                null,
            titleX:                     null,
            titleY:                     null,
            titleHalign:                null,
            titleValign:                null,
            titleOffsetx:               0,
            titleOffsety:               0,

            labelsIngraph:              null,
            labelsIngraphFont:          null,
            labelsIngraphSize:          null,
            labelsIngraphColor:         null,
            labelsIngraphBold:          null,
            labelsIngraphItalic:        null,
            labelsIngraphOffsetx:       0,
            labelsIngraphOffsety:       0,
            labelsAbove:                false,
            labelsAboveSize:            null,
            labelsAboveFont:            null,
            labelsAboveColor:           null,
            labelsAboveBold:            null,
            labelsAboveItalic:          null,
            labelsAboveDecimals:        0,
            labelsAboveOffsetx:         0,
            labelsAboveOffsety:         0,
            
            contextmenu:                null,
            
            colorsDefault:              'black',

            crosshairs:                 false,
            crosshairsHline:            true,
            crosshairsVline:            true,
            crosshairsColor:            '#333',
            crosshairsLinewidth:        1,
            crosshairsCoords:           false,
            crosshairsCoordsFixed:      true,
            crosshairsCoordsLabelsX:    'X',
            crosshairsCoordsLabelsY:    'Y',
            crosshairsCoordsFormatterX: null,
            crosshairsCoordsFormatterY: null,

            annotatable:                false,
            annotatableColor:           'black',
            annotatableLinewidth:       1,

            line:                       false,
            lineLinewidth:              1,
            lineColors:                 ['green', 'red','blue','orange','pink','brown','black','gray'],
            lineShadowColor:            'rgba(0,0,0,0)',
            lineShadowBlur:             2,
            lineShadowOffsetx:          3,
            lineShadowOffsety:          3,
            lineStepped:                false,
            lineVisible:                true,

            key:                        null,
            keyBackground:              'white',
            keyPosition:                'graph',
            keyHalign:                  'right',
            keyShadow:                  false,
            keyShadowColor:             '#666',
            keyShadowBlur:              3,
            keyShadowOffsetx:           2,
            keyShadowOffsety:           2,
            keyPositionGutterBoxed:     false,
            keyPositionX:               null,
            keyPositionY:               null,
            keyInteractive:             false,
            keyInteractiveHighlightChartFill: 'rgba(255,0,0,0.9)',
            keyInteractiveHighlightLabel:     'rgba(255,0,0,0.2)',
            keyColorShape:              'square',
            keyRounded:                 true,
            keyLinewidth:               1,
            keyColors:                  null,
            keyLabelsColor:             null,
            keyLabelsFont:              null,
            keyLabelsSize:              null,
            keyLabelsBold:              null,
            keyLabelsItalic:            null,
            keyLabelsOffsetx:           0,
            keyLabelsOffsety:           0,

            boxplotWidth:               10,
            boxplotCapped:              true,

            trendline:                  false,
            trendlineColor:             'gray',
            trendlineLinewidth:         1,
            trendlineMargin:            15,
            trendlineDashed:            true,
            trendlineDotted:            false,
            trendlineDashArray:         null,
            trendlineClipping:          null,

            highlightStroke:            'rgba(0,0,0,0)',
            highlightFill:              'rgba(255,255,255,0.7)',
            
            bubbleMin:                  0,
            bubbleMax:                  null,
            bubbleWidth:                null,
            bubbleData:                 null,

            clearto:                    'rgba(0,0,0,0)',
            
            outofbounds:                false,

            animationTrace:             false,
            animationTraceClip:         1
        }

        //
        // This allows the data points to be given as dates as well as numbers. Formats supported by RGraph.parseDate() are accepted.
        // 
        // ALSO: unrelated but this loop is also used to convert null values to an
        // empty array
        //
        for (var i=0; i<this.data.length; ++i) {
            for (var j=0; j<this.data[i].length; ++j) {
                
                // Convert null data points to an empty erray
                if ( RGraph.isNull(this.data[i][j]) ) {
                    this.data[i][j] = [];
                }

                // Allow for the X point to be dates
                if (this.data[i][j] && typeof this.data[i][j][0] == 'string') {
                    this.data[i][j][0] = RGraph.parseDate(this.data[i][j][0]);
                }
            }
        }


        //
        // Now make the data_arr array - all the data as one big array
        //
        this.data_arr = [];

        for (var i=0; i<this.data.length; ++i) {
            for (var j=0; j<this.data[i].length; ++j) {
                this.data_arr.push(this.data[i][j]);
            }
        }

        // Create the $ objects so that they can be used
        for (var i=0; i<this.data_arr.length; ++i) {
            this['$' + i] = {}
        }


        // Check for support
        if (!this.canvas) {
            alert('[SCATTER] No canvas support');
            return;
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
        // @param string name  The name of the property to set
        // @param string value The value of the property
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


            
            // If a single tooltip has been given add it to each datapiece
            if (name === 'tooltips' && typeof value === 'string') {
                this.populateTooltips();
            }

            return this;
        };








        //
        // A simple getter
        // 
        // @param string name  The name of the property to set
        //
        this.get = function (name)
        {
            return properties[name];
        };








        //
        // The function you call to draw the Scatter chart
        //
        this.draw = function ()
        {
            // MUST be the first thing done!
            if (typeof properties.backgroundImage === 'string') {
                RGraph.drawBackgroundImage(this);
            }
    

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
            // Parse the colors. This allows for simple gradient syntax
            //
            if (!this.colorsParsed) {
                this.parseColors();
                
                // Don't want to do this again
                this.colorsParsed = true;
            }
    



            //
            // Stop this growing uncontrollably
            //
            this.coordsText = [];



            //
            // Make the margins easy ro access
            //
            this.marginLeft   = properties.marginLeft;
            this.marginRight  = properties.marginRight;
            this.marginTop    = properties.marginTop;
            this.marginBottom = properties.marginBottom;
    
            // Go through all the data points and see if a tooltip has been given
            this.hasTooltips = false;
            var overHotspot  = false;
    
            // Reset the coords array
            this.coords = [];
    
            //
            // This facilitates the xmax, xmin and X values being dates
            //
            if (typeof properties.xaxisScaleMin == 'string') properties.xaxisScaleMin = RGraph.parseDate(properties.xaxisScaleMin);
            if (typeof properties.xaxisScaleMax == 'string') properties.xaxisScaleMax = RGraph.parseDate(properties.xaxisScaleMax);

            //
            // Look for tooltips and populate the tooltips
            // 
            // NB 26/01/2011 Updated so that the tooltips property is ALWAYS populated
            //
            //if (!RGraph.ISOLD) {
                this.set('tooltips', []);
                for (var i=0,len=this.data.length; i<len; i+=1) {
                    for (var j =0,len2=this.data[i].length;j<len2; j+=1) {
    
                        if (this.data[i][j] && this.data[i][j][3]) {
                            properties.tooltips.push(this.data[i][j][3]);
                            this.hasTooltips = true;
                        } else {
                            properties.tooltips.push(null);
                        }
                    }
                }
            //}
    
            // Reset the maximum value
            this.max = 0;
    
            // Work out the maximum Y value
            //if (properties.ymax && properties.ymax > 0) {
            if (typeof properties.yaxisScaleMax === 'number') {

                this.max   = properties.yaxisScaleMax;
                this.min   = properties.yaxisScaleMin ? properties.yaxisScaleMin : 0;


                this.scale2 = RGraph.getScale({object: this, options: {
                    'scale.max':          this.max,
                    'scale.min':          this.min,
                    'scale.strict':       true,
                    'scale.thousand':     properties.yaxisScaleThousand,
                    'scale.point':        properties.yaxisScalePoint,
                    'scale.decimals':     properties.yaxisScaleDecimals,
                    'scale.labels.count': properties.yaxisLabelsCount,
                    'scale.round':        properties.yaxisScaleRound,
                    'scale.units.pre':    properties.yaxisScaleUnitsPre,
                    'scale.units.post':   properties.yaxisScaleUnitsPost
                }});
                
                this.max = this.scale2.max;
                this.min = this.scale2.min;
                var decimals = properties.yaxisScaleDecimals;
    
            } else {
    
                var i = 0;
                var j = 0;

                for (i=0,len=this.data.length; i<len; i+=1) {
                    for (j=0,len2=this.data[i].length; j<len2; j+=1) {
                        if (!RGraph.isNull(this.data[i][j]) && this.data[i][j][1] != null) {
                            this.max = Math.max(this.max, typeof this.data[i][j][1] == 'object' ? RGraph.arrayMax(this.data[i][j][1]) : Math.abs(this.data[i][j][1]));
                        }
                    }
                }
    
                this.min   = properties.yaxisScaleMin ? properties.yaxisScaleMin : 0;

                this.scale2 = RGraph.getScale({object: this, options: {
                    'scale.max':          this.max,
                    'scale.min':          this.min,
                    'scale.thousand':     properties.yaxisScaleThousand,
                    'scale.point':        properties.yaxisScalePoint,
                    'scale.decimals':     properties.yaxisScaleDecimals,
                    'scale.labels.count': properties.yaxisLabelsCount,
                    'scale.round':        properties.yaxisScaleRound,
                    'scale.units.pre':    properties.yaxisScaleUnitsPre,
                    'scale.units.post':   properties.yaxisScaleUnitsPost
                }});

                this.max = this.scale2.max;
                this.min = this.scale2.min;
            }
    
            this.grapharea = this.canvas.height - this.marginTop - this.marginBottom;
    
    

            // Progressively Draw the chart
            RGraph.Background.draw(this);
    
            //
            // Draw any horizontal bars that have been specified
            //
            if (properties.backgroundHbars && properties.backgroundHbars.length) {
                RGraph.drawBars(this);
            }
    
            //
            // Draw any vertical bars that have been specified
            //
            if (properties.backgroundVbars && properties.backgroundVbars.length) {
                this.drawVBars();
            }

            //
            // Draw an X scale
            //
            if (!properties.xaxisScaleMax) {
              
                var xmax = 0;
                var xmin = properties.xaxisScaleMin;
              
                for (var ds=0,len=this.data.length; ds<len; ds+=1) {
                    for (var point=0,len2=this.data[ds].length; point<len2; point+=1) {
                        xmax = Math.max(xmax, this.data[ds][point][0]);
                    }
                }
            } else {
                xmax = properties.xaxisScaleMax;
                xmin = properties.xaxisScaleMin
            }

            if (properties.xaxisScale) {
                this.xscale2 = RGraph.getScale({object: this, options: {
                    'scale.max':          xmax,
                    'scale.min':          xmin,
                    'scale.decimals':     properties.xaxisScaleDecimals,
                    'scale.point':        properties.xaxisScalePoint,
                    'scale.thousand':     properties.xaxisScaleThousand,
                    'scale.units.pre':    properties.xaxisScaleUnitsPre,
                    'scale.units.post':   properties.xaxisScaleUnitsPost,
                    'scale.labels.count': properties.xaxisLabelsCount,
                    'scale.strict':       true
                }});

                this.set('xaxisScaleMax', this.xscale2.max);
            }

            this.drawAxes();







            this.drawLabels();

            // Clip the canvas so that the trace2 effect is facilitated
            if (properties.animationTrace) {
                this.context.save();
                this.context.beginPath();
                this.context.rect(0, 0, this.canvas.width * properties.animationTraceClip, this.canvas.height);
                this.context.clip();
            }

                for(i=0; i<this.data.length; ++i) {
                    
                    this.drawMarks(i);

                    // Draw bubbles
                    if (RGraph.isArray(properties.bubbleData)) {
                        this.drawBubble(i);
                    }
        
                    // Set the shadow
                    this.context.shadowColor   = properties.lineShadowColor;
                    this.context.shadowOffsetX = properties.lineShadowOffsetx;
                    this.context.shadowOffsetY = properties.lineShadowOffsety;
                    this.context.shadowBlur    = properties.lineShadowBlur;
    
                    this.drawLine(i);
        
                    // Turn the shadow off
                    RGraph.noShadow(this);
                }
        
        
                if (properties.line) {
                    for (var i=0,len=this.data.length;i<len; i+=1) {
                        this.drawMarks(i); // Call this again so the tickmarks appear over the line
                    }
                }
            
            if (properties.animationTrace) {
                this.context.restore();
            }
            
            
            //
            // Draw a trendline if requested
            //
            if (properties.trendline) {
                for (var i=0; i<this.data.length; ++i) {
                    if (properties.trendline === true || (typeof properties.trendline === 'object' && properties.trendline[i] === true) ) {
                        this.drawTrendline(i);
                    }
                }
            }
    
    
    
            //
            // Setup the context menu if required
            //
            if (properties.contextmenu) {
                RGraph.showContext(this);
            }
    
            
            
            //
            // Draw the key if necessary
            //
            if (properties.key && properties.key.length) {
                RGraph.drawKey(this, properties.key, properties.lineColors);
            }
    
    
            //
            // Draw " above" labels if enabled
            //
            if (properties.labelsAbove) {
                this.drawAboveLabels();
            }
    
            //
            // Draw the "in graph" labels, using the member function, NOT the shared function in RGraph.common.core.js
            //
            this.drawInGraphLabels(this);
    
    
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
        }








        //
        // Draws the axes of the scatter graph
        //
        this.drawAxes = function ()
        {            
            // Draw the X axis
            RGraph.drawXAxis(this);
            
            // Draw the Y axis
            RGraph.drawYAxis(this);

            // Reset the linewidth back to one
            //
            this.context.lineWidth = 1;
        };








        //
        // Draws the labels on the scatter graph
        //
        this.drawLabels = function ()
        {
            // Nothing to do here because the labels are drawn in the RGraph.drawXAxis() and
            // RGrapth.drawYAxis functions
        };








        //
        // Draws the actual scatter graph marks
        // 
        // @param i integer The dataset index
        //
        this.drawMarks = function (i)
        {
            //
            //  Reset the coords array
            //
            this.coords[i] = [];
    
            //
            // Plot the values
            //
            var xmax          = properties.xaxisScaleMax;
            var default_color = properties.colorsDefault;

            for (var j=0,len=this.data[i].length; j<len; j+=1) {
                //
                // This is here because tooltips are optional
                //
                var data_points = this.data[i];
                
                // Allow for null points
                if (RGraph.isNull(data_points[j])) {
                    continue;
                }

                var xCoord  = data_points[j][0];
                var yCoord  = data_points[j][1];
                var color   = data_points[j][2] ? data_points[j][2] : default_color;
                var tooltip = (data_points[j] && data_points[j][3]) ? data_points[j][3] : null;
    

                this.drawMark(
                    i,
                    xCoord,
                    yCoord,
                    xmax,
                    this.scale2.max,
                    color,
                    tooltip,
                    this.coords[i],
                    data_points,
                    j
                );
            }
        };








        //
        // Draws a single scatter mark
        //
        this.drawMark = function (data_set_index, x, y, xMax, yMax, color, tooltip, coords, data, data_index)
        {
            var tickmarks = properties.tickmarksStyle,
                tickSize  = properties.tickmarksSize,
                xMin      = properties.xaxisScaleMin,
                x         = ((x - xMin) / (xMax - xMin)) * (this.canvas.width - this.marginLeft - this.marginRight),
                originalX = x,
                originalY = y;

            //
            // This allows the tickmarks property to be an array
            //
            if (tickmarks && typeof tickmarks == 'object') {
                tickmarks = tickmarks[data_set_index];
            }
    
    
            //
            // This allows the ticksize property to be an array
            //
            if (typeof tickSize == 'object') {
                var tickSize     = tickSize[data_set_index];
                var halfTickSize = tickSize / 2;
            } else {
                var halfTickSize = tickSize / 2;
            }
    
    
            //
            // This bit is for boxplots only
            //
            if (   y
                && typeof y === 'object'
                && typeof y[0] === 'number'
                && typeof y[1] === 'number'
                && typeof y[2] === 'number'
                && typeof y[3] === 'number'
                && typeof y[4] === 'number'
               ) {
    
                this.set('boxplot', true);
    
    
                var y0   = this.getYCoord(y[0], properties.outofbounds),
                    y1   = this.getYCoord(y[1], properties.outofbounds),
                    y2   = this.getYCoord(y[2], properties.outofbounds),
                    y3   = this.getYCoord(y[3], properties.outofbounds),
                    y4   = this.getYCoord(y[4], properties.outofbounds),
                    col1 = y[5],
                    col2 = y[6],
                    boxWidth = typeof y[7]  == 'number' ? y[7] : properties.boxplotWidth;
    
    
            } else {
    
                //
                // The new way of getting the Y coord. This function (should) handle everything
                //
                var yCoord = this.getYCoord(y, properties.outofbounds);
            }
    
            //
            // Account for the X axis being at the centre
            //
            // This is so that points are on the graph, and not the gutter - which helps
            x += this.marginLeft;
    
    
    
    
            this.context.beginPath();
            
            // Color
            this.context.strokeStyle = color;
    
    
    
            //
            // Boxplots
            //
            if (properties.boxplot) {

                // boxWidth is a scale value, so convert it to a pixel vlue
                boxWidth = (boxWidth / properties.xaxisScaleMax) * (this.canvas.width - this.marginLeft - this.marginRight);
    
                var halfBoxWidth = boxWidth / 2;
    
                if (properties.lineVisible) {
                    this.context.beginPath();
                        
                        // Set the outline color of the box

                        if (typeof y[8] === 'string') {
                            this.context.strokeStyle = y[8];
                        }
                        this.context.strokeRect(x - halfBoxWidth, y1, boxWidth, y3 - y1);
            
                        // Draw the upper coloured box if a value is specified
                        if (col1) {
                            this.context.fillStyle = col1;
                            this.context.fillRect(x - halfBoxWidth, y1, boxWidth, y2 - y1);
                        }
            
                        // Draw the lower coloured box if a value is specified
                        if (col2) {
                            this.context.fillStyle = col2;
                            this.context.fillRect(x - halfBoxWidth, y2, boxWidth, y3 - y2);
                        }
                    this.context.stroke();
        
                    // Now draw the whiskers
                    this.context.beginPath();
                    if (properties.boxplotCapped) {
                        this.context.moveTo(x - halfBoxWidth, Math.round(y0));
                        this.context.lineTo(x + halfBoxWidth, Math.round(y0));
                    }
        
                    this.context.moveTo(Math.round(x), y0);
                    this.context.lineTo(Math.round(x ), y1);
        
                    if (properties.boxplotCapped) {
                        this.context.moveTo(x - halfBoxWidth, Math.round(y4));
                        this.context.lineTo(x + halfBoxWidth, Math.round(y4));
                    }
        
                    this.context.moveTo(Math.round(x), y4);
                    this.context.lineTo(Math.round(x), y3);

                    this.context.stroke();
                }
            }
    
    
            //
            // Draw the tickmark, but not for boxplots
            //
            if (properties.lineVisible && typeof y == 'number' && !y0 && !y1 && !y2 && !y3 && !y4) {
    
                if (tickmarks == 'circle') {
                    this.context.arc(x, yCoord, halfTickSize, 0, 6.28, 0);
                    this.context.fillStyle = color;
                    this.context.fill();
                
                } else if (tickmarks == 'plus') {
    
                    this.context.moveTo(x, yCoord - halfTickSize);
                    this.context.lineTo(x, yCoord + halfTickSize);
                    this.context.moveTo(x - halfTickSize, yCoord);
                    this.context.lineTo(x + halfTickSize, yCoord);
                    this.context.stroke();
                
                } else if (tickmarks == 'square') {
                    this.context.strokeStyle = color;
                    this.context.fillStyle = color;
                    this.context.fillRect(
                        x - halfTickSize,
                        yCoord - halfTickSize,
                        tickSize,
                        tickSize
                    );
    
                } else if (tickmarks == 'cross') {
    
                    this.context.moveTo(x - halfTickSize, yCoord - halfTickSize);
                    this.context.lineTo(x + halfTickSize, yCoord + halfTickSize);
                    this.context.moveTo(x + halfTickSize, yCoord - halfTickSize);
                    this.context.lineTo(x - halfTickSize, yCoord + halfTickSize);
                    
                    this.context.stroke();
                
                //
                // Diamond shape tickmarks
                //
                } else if (tickmarks == 'diamond') {
                    this.context.fillStyle = this.context.strokeStyle;
    
                    this.context.moveTo(x, yCoord - halfTickSize);
                    this.context.lineTo(x + halfTickSize, yCoord);
                    this.context.lineTo(x, yCoord + halfTickSize);
                    this.context.lineTo(x - halfTickSize, yCoord);
                    this.context.lineTo(x, yCoord - halfTickSize);
    
                    this.context.fill();
                    this.context.stroke();
    
                //
                // Custom tickmark style
                //
                } else if (typeof tickmarks == 'function') {
    
                    var graphWidth  = this.canvas.width - this.marginLeft - this.marginRight,
                        graphheight = this.canvas.height - this.marginTop - this.marginBottom,
                        xVal = ((x - this.marginLeft) / graphWidth) * xMax,
                        yVal = ((graphheight - (yCoord - this.marginTop)) / graphheight) * yMax;
    
                    tickmarks(this, data, x, yCoord, xVal, yVal, xMax, yMax, color, data_set_index, data_index)

















                //
                // Image based tickmark
                //
                // lineData, xPos, yPos, color, isShadow, prevX, prevY, tickmarks, index
                } else if (
                           typeof tickmarks === 'string' &&
                            (
                             tickmarks.substr(0, 6) === 'image:'  ||
                             tickmarks.substr(0, 5) === 'data:'   ||
                             tickmarks.substr(0, 1) === '/'       ||
                             tickmarks.substr(0, 3) === '../'     ||
                             tickmarks.substr(0, 7) === 'images/'
                            )
                          ) {
    
                    var img = new Image();
                    
                    if (tickmarks.substr(0, 6) === 'image:') {
                        img.src = tickmarks.substr(6);
                    } else {
                        img.src = tickmarks;
                    }
    
                    var obj = this;
                    img.onload = function ()
                    {
                        if (properties.tickmarksStyleImageHalign === 'center') x -= (this.width / 2);
                        if (properties.tickmarksStyleImageHalign === 'right')  x -= this.width;

                        if (properties.tickmarksStyleImageValign === 'center') yCoord -= (this.height / 2);
                        if (properties.tickmarksStyleImageValign === 'bottom') yCoord -= this.height;
                        
                        x += properties.tickmarksStyleImageOffsetx;
                        yCoord += properties.tickmarksStyleImageOffsety;
    
                        obj.context.drawImage(this, x, yCoord);
                    }





                //
                // No tickmarks
                //
                } else if (tickmarks === null) {
        
                //
                // Unknown tickmark type
                //
                } else {
                    alert('[SCATTER] (' + this.id + ') Unknown tickmark style: ' + tickmarks );
                }
            }
    
            //
            // Add the tickmark to the coords array
            //

            if (   properties.boxplot
                && typeof y0 === 'number'
                && typeof y1 === 'number'
                && typeof y2 === 'number'
                && typeof y3 === 'number'
                && typeof y4 === 'number') {
    
                x      = [x - halfBoxWidth, x + halfBoxWidth];
                yCoord = [y0, y1, y2, y3, y4];
            }
    
            coords.push([x, yCoord, tooltip]);
        };








        //
        // Draws an optional line connecting the tick marks.
        // 
        // @param i The index of the dataset to use
        //
        this.drawLine = function (i)
        {
            if (typeof properties.lineVisible == 'boolean' && properties.lineVisible == false) {
                return;
            }
    
            if (properties.line && this.coords[i].length >= 2) {
            
                if (properties.lineDash && typeof this.context.setLineDash === 'function') {
                    this.context.setLineDash(properties.lineDash);
                }

                this.context.lineCap     = 'round';
                this.context.lineJoin    = 'round';
                this.context.lineWidth   = this.getLineWidth(i);// i is the index of the set of coordinates
                this.context.strokeStyle = properties.lineColors[i];

                this.context.beginPath();

                    var prevY = null;
                    var currY = null;
        
                    for (var j=0,len=this.coords[i].length; j<len; j+=1) {
                    
        
                        var xPos = this.coords[i][j][0];
                        var yPos = this.coords[i][j][1];
                        
                        if (j > 0) prevY = this.coords[i][j - 1][1];
                        currY = yPos;
    
                        if (j == 0 || RGraph.isNull(prevY) || RGraph.isNull(currY)) {
                            this.context.moveTo(xPos, yPos);
                        } else {
                        
                            // Stepped?
                            var stepped = properties.lineStepped;
        
                            if (   (typeof stepped == 'boolean' && stepped)
                                || (typeof stepped == 'object' && stepped[i])
                               ) {
                                this.context.lineTo(this.coords[i][j][0], this.coords[i][j - 1][1]);
                            }
        
                            this.context.lineTo(xPos, yPos);
                        }
                    }
                this.context.stroke();
            
                //
                // Set the linedash back to the default
                //
                if (properties.lineDash && typeof this.context.setLineDash === 'function') {
                    this.context.setLineDash([1,0]);
                }
            }

            //
            // Set the linewidth back to 1
            //
            this.context.lineWidth = 1;
        };








        //
        // Returns the linewidth
        // 
        // @param number i The index of the "line" (/set of coordinates)
        //
        this.getLineWidth = function (i)
        {
            var linewidth = properties.lineLinewidth;
            
            if (typeof linewidth == 'number') {
                return linewidth;
            
            } else if (typeof linewidth == 'object') {
                if (linewidth[i]) {
                    return linewidth[i];
                } else {
                    return linewidth[0];
                }
    
                alert('[SCATTER] Error! The linewidth property should be a single number or an array of one or more numbers');
            }
        };








        //
        // Draws vertical bars. Line chart doesn't use a horizontal scale, hence this function
        // is not common
        //
        this.drawVBars = function ()
        {
            var vbars = properties.backgroundVbars;
            var graphWidth = this.canvas.width - this.marginLeft - this.marginRight;

            if (vbars) {
            
                var xmax = properties.xaxisScaleMax;
                var xmin = properties.xaxisScaleMin;
                
                for (var i=0,len=vbars.length; i<len; i+=1) {
                    
                    var key = i;
                    var value = vbars[key];

                    //
                    // Accomodate date/time values
                    //
                    if (typeof value[0] == 'string') value[0] = RGraph.parseDate(value[0]);
                    if (typeof value[1] == 'string') value[1] = RGraph.parseDate(value[1]) - value[0];

                    var x     = (( (value[0] - xmin) / (xmax - xmin) ) * graphWidth) + this.marginLeft;
                    var width = (value[1] / (xmax - xmin) ) * graphWidth;

                    this.context.fillStyle = value[2];
                    this.context.fillRect(x, this.marginTop, width, (this.canvas.height - this.marginTop - this.marginBottom));
                }
            }
        };








        //
        // Draws in-graph labels.
        // 
        // @param object obj The graph object
        //
        this.drawInGraphLabels = function (obj)
        {
            var labels  = obj.get('labelsIngraph');
            var labels_processed = [];
    
            if (!labels) {
                return;
            }
    
            // Defaults
            var fgcolor   = 'black';
            var bgcolor   = 'white';
            var direction = 1;

    
            var textConf = RGraph.getTextConf({
                object: this,
                prefix: 'labelsIngraph'
            });

            //
            // Preprocess the labels array. Numbers are expanded
            //
            for (var i=0,len=labels.length; i<len; i+=1) {
                if (typeof labels[i] == 'number') {
                    for (var j=0; j<labels[i]; ++j) {
                        labels_processed.push(null);
                    }
                } else if (typeof labels[i] == 'string' || typeof labels[i] == 'object') {
                    labels_processed.push(labels[i]);
                
                } else {
                    labels_processed.push('');
                }
            }

            //
            // Turn off any shadow
            //
            RGraph.noShadow(obj);
    
            if (labels_processed && labels_processed.length > 0) {
    
                var i=0;
    
                for (var set=0; set<obj.coords.length; ++set) {
                    for (var point = 0; point<obj.coords[set].length; ++point) {
                        if (labels_processed[i]) {
                            var x = obj.coords[set][point][0] + properties.labelsIngraphOffsetx;
                            var y = obj.coords[set][point][1] + properties.labelsIngraphOffsety;
                            var length = typeof labels_processed[i][4] == 'number' ? labels_processed[i][4] : 25;
                                
                            var text_x = x;
                            var text_y = y - 5 - length;
    
                            this.context.moveTo(x, y - 5);
                            this.context.lineTo(x, y - 5 - length);
                            
                            this.context.stroke();
                            this.context.beginPath();
                            
                            // This draws the arrow
                            this.context.moveTo(x, y - 5);
                            this.context.lineTo(x - 3, y - 10);
                            this.context.lineTo(x + 3, y - 10);
                            this.context.closePath();

                            this.context.beginPath();
                                // Fore ground color
                                this.context.fillStyle = (typeof labels_processed[i] == 'object' && typeof labels_processed[i][1] == 'string') ? labels_processed[i][1] : 'black';
                                
                                RGraph.text({
                                    
                              object: this,
                                
                                font:   textConf.font,
                                size:   textConf.size,
                                color:  textConf.color,
                                bold:   textConf.bold,
                                italic: textConf.italic,

                                    x:            text_x,
                                    y:            text_y,
                                    text:         (typeof labels_processed[i] == 'object' && typeof labels_processed[i][0] == 'string') ? labels_processed[i][0] : labels_processed[i],
                                    valign:       'bottom',
                                    halign:       'center',
                                    bounding:     true,
                                    boundingFill: (typeof labels_processed[i] == 'object' && typeof labels_processed[i][2] == 'string') ? labels_processed[i][2] : 'white',
                                    tag:          'labels.ingraph'
                                });
                            this.context.fill();
                        }
                        
                        i++;
                    }
                }
            }
        };








        //
        // This function makes it much easier to get the (if any) point that is currently being hovered over.
        // 
        // @param object e The event object
        //
        this.getShape = function (e)
        {
            var mouseXY     = RGraph.getMouseXY(e);
            var mouseX      = mouseXY[0];
            var mouseY      = mouseXY[1];
            var overHotspot = false;
            var offset      = properties.tooltipsHotspot; // This is how far the hotspot extends
    
            for (var set=0,len=this.coords.length; set<len; ++set) {
                for (var i=0,len2=this.coords[set].length; i<len2; ++i) {

                    var x = this.coords[set][i][0];
                    var y = this.coords[set][i][1];
                    var tooltip = this.data[set][i][3];
    
                    if (typeof y == 'number') {
                        if (mouseX <= (x + offset) &&
                            mouseX >= (x - offset) &&
                            mouseY <= (y + offset) &&
                            mouseY >= (y - offset)) {
    
                            if (RGraph.parseTooltipText) {
                                var tooltip = RGraph.parseTooltipText(this.data[set][i][3], 0);
                            }
                            var sequentialIndex = i;
    
                            for (var ds=(set-1); ds >=0; --ds) {
                                sequentialIndex += this.data[ds].length;
                            }
    
                            return {
                                object: this,
                                     x: x,
                                     y: y,
                               tooltip: typeof tooltip === 'string' ? tooltip : null,
                               dataset: set,
                                 index: i,
                       sequentialIndex: sequentialIndex
                            };
                        }




                    } else if (RGraph.isNull(y)) {
                        // Nothing to see here





                    // Boxplots
                    } else {

                        var mark = this.data[set][i];

                        //
                        // Determine the width
                        //
                        var width = properties.boxplotWidth;
                        
                        if (typeof mark[1][7] === 'number') {
                            width = mark[1][7];
                        }

                        if (   typeof x === 'object'
                            && mouseX > x[0]
                            && mouseX < x[1]
                            && mouseY > y[1]
                            && mouseY < y[3]
                            ) {

                            var tooltip = RGraph.parseTooltipText(this.data[set][i][3], 0);

                            // Determine the sequential index
                            var sequentialIndex = i;    
                            for (var ds=(set-1); ds >=0; --ds) {
                                sequentialIndex += this.data[ds].length;
                            }

                            return {
                             object: this,
                                  x: x[0],
                                  y: y[3],
                              width: Math.abs(x[1] - x[0]),
                             height: Math.abs(y[1] - y[3]),
                            dataset: set,
                              index: i,
                    sequentialIndex: sequentialIndex,
                            tooltip: tooltip
                            };
                        }
                    }
                }
            }
        };








        //
        // Draws the above line labels
        //
        this.drawAboveLabels = function ()
        {
            var size       = properties.labelsAboveSize;
            var font       = properties.textFont;
            var units_pre  = properties.yaxisScaleUnitsPre;
            var units_post = properties.yaxisScaleUnitsPost;
            
            var textConf = RGraph.getTextConf({
                object: this,
                prefix: 'labelsAbove'
            });
    
            for (var set=0,len=this.coords.length; set<len; ++set) {
                for (var point=0,len2=this.coords[set].length; point<len2; ++point) {
                    
                    var x_val = this.data[set][point][0];
                    var y_val = this.data[set][point][1];
                    
                    if (!RGraph.isNull(y_val)) {
                        
                        // Use the top most value from a box plot
                        if (RGraph.isArray(y_val)) {
                            var max = 0;
                            for (var i=0; i<y_val; ++i) {
                                max = Math.max(max, y_val[i]);
                            }
                            
                            y_val = max;
                        }
                        
                        var x_pos = this.coords[set][point][0];
                        var y_pos = this.coords[set][point][1];


                        var xvalueFormatter = properties.labelsAboveFormatterX;
                        var yvalueFormatter = properties.labelsAboveFormatterY;

                        RGraph.text({
                                    
                      object: this,

                        font:   textConf.font,
                        size:   textConf.size,
                        color:  textConf.color,
                        bold:   textConf.bold,
                        italic: textConf.italic,

                            x:            x_pos + properties.labelsAboveOffsetx,
                            y:            y_pos - 5 - size + properties.labelsAboveOffsety,
                            
                            text:         
                                (typeof xvalueFormatter === 'function' ? xvalueFormatter(this, x_val) : x_val.toFixed(properties.labelsAboveDecimals)) +
                                ', ' +
                                (typeof yvalueFormatter === 'function' ? yvalueFormatter(this, y_val) : y_val.toFixed(properties.labelsAboveDecimals)),
                            
                            valign:       'bottom',
                            halign:       'center',
                            bounding:     true,
                            boundingFill: 'rgba(255, 255, 255, 0.7)',
                            boundingStroke: 'rgba(0,0,0,0.1)',
                            tag:          'labels.above'
                        });
                    }
                }
            }
        };








        //
        // When you click on the chart, this method can return the Y value at that point. It works for any point on the
        // chart (that is inside the gutters) - not just points within the Bars.
        // 
        // @param object e The event object
        //
        this.getYValue = function (arg)
        {
            if (arg.length == 2) {
                var mouseX = arg[0];
                var mouseY = arg[1];
            } else {
                var mouseCoords = RGraph.getMouseXY(arg);
                var mouseX      = mouseCoords[0];
                var mouseY      = mouseCoords[1];
            }
            
            var obj = this;
    
            if (   mouseY < this.marginTop
                || mouseY > (this.canvas.height - this.marginBottom)
                || mouseX < this.marginLeft
                || mouseX > (this.canvas.width - this.marginRight)
               ) {
                return null;
            }
            
            if (properties.xaxisPosition == 'center') {
                var value = (((this.grapharea / 2) - (mouseY - this.marginTop)) / this.grapharea) * (this.max - this.min)
                value *= 2;
                
                
                // Account for each side of the X axis
                if (value >= 0) {
                    value += this.min

                    if (properties.yaxisScaleInvert) {
                        value -= this.min;
                        value = this.max - value;
                    }
                
                } else {

                    value -= this.min;
                    if (properties.yaxisScaleInvert) {
                        value += this.min;
                        value = this.max + value;
                        value *= -1;
                    }
                }

            } else {

                var value = ((this.grapharea - (mouseY - this.marginTop)) / this.grapharea) * (this.max - this.min)
                value += this.min;
                
                if (properties.yaxisScaleInvert) {
                    value -= this.min;
                    value = this.max - value;
                }
            }
    
            return value;
        };








        //
        // When you click on the chart, this method can return the X value at that point.
        // 
        // @param mixed  arg This can either be an event object or the X coordinate
        // @param number     If specifying the X coord as the first arg then this should be the Y coord
        //
        this.getXValue = function (arg)
        {
            if (arg.length == 2) {
                var mouseX = arg[0];
                var mouseY = arg[1];
            } else {
                var mouseXY = RGraph.getMouseXY(arg);
                var mouseX  = mouseXY[0];
                var mouseY  = mouseXY[1];
            }
            var obj = this;
            
            if (   mouseY < this.marginTop
                || mouseY > (this.canvas.height - this.marginBottom)
                || mouseX < this.marginLeft
                || mouseX > (this.canvas.width - this.marginRight)
               ) {
                return null;
            }
    
            var width = (this.canvas.width - this.marginLeft - this.marginRight);
            var value = ((mouseX - this.marginLeft) / width) * (properties.xaxisScaleMax - properties.xaxisScaleMin)
            value += properties.xaxisScaleMin;

            return value;
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
            
            // Inverted highlight style
            } else if (properties.highlightStyle === 'invert') {
            
                var tickmarksSize = properties.tickmarksSize;

                // Clip to the graph area
                this.path(
                    'sa b r % % % % cl',
                    properties.marginLeft - tickmarksSize, properties.marginTop - tickmarksSize,
                    this.canvas.width - properties.marginLeft - properties.marginRight + tickmarksSize + tickmarksSize,
                    this.canvas.height - properties.marginTop - properties.marginBottom + tickmarksSize + tickmarksSize
                );

                this.path(
                    'b m % % a % % 25 4.71 4.72 true l % % l % % l % % l % % l % % c f %',
                    shape.x, properties.marginTop,
                    shape.x, shape.y,
                    shape.x, 0,
                    this.canvas.width, 0,
                    this.canvas.width, this.canvas.height,
                    0, this.canvas.height,
                    0, 0,
                    properties.highlightFill
                );
                
                // Draw a border around the circular cutout
                this.path(
                    'b a % % 25 0 6.29 false s % rs',
                    shape.x, shape.y,
                    properties.highlightStroke
                );
            } else {
                // Boxplot highlight
                if (shape.height) {
                    RGraph.Highlight.rect(this, shape);
        
                // Point highlight
                } else {
                    RGraph.Highlight.point(this, shape);
                }
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
    
            if (
                   mouseXY[0] > (this.marginLeft - 3)
                && mouseXY[0] < (this.canvas.width - this.marginRight + 3)
                && mouseXY[1] > (this.marginTop - 3)
                && mouseXY[1] < ((this.canvas.height - this.marginBottom) + 3)
                ) {
    
                return this;
            }
        };








        //
        // This function can be used when the canvas is clicked on (or similar - depending on the event)
        // to retrieve the relevant X coordinate for a particular value.
        // 
        // @param int value The value to get the X coordinate for
        //
        this.getXCoord = function (value)
        {
            if (typeof value != 'number' && typeof value != 'string') {
                return null;
            }
            
            // Allow for date strings to be passed
            if (typeof value === 'string') {
                value = RGraph.parseDate(value);
            }

            var xmin = properties.xaxisScaleMin;
            var xmax = properties.xaxisScaleMax;
            var x;
    
            if (value < xmin) return null;
            if (value > xmax) return null;
    
            if (properties.yaxisPosition == 'right') {
                x = ((value - xmin) / (xmax - xmin)) * (this.canvas.width - this.marginLeft - this.marginRight);
                x = (this.canvas.width - this.marginRight - x);
            } else {
                x = ((value - xmin) / (xmax - xmin)) * (this.canvas.width - this.marginLeft - this.marginRight);
                x = x + this.marginLeft;
            }
            
            return x;
        };








        //
        // Returns the applicable Y COORDINATE when given a Y value
        // 
        // @param int value The value to use
        // @return int The appropriate Y coordinate
        //
        this.getYCoord = function (value)
        {
            var outofbounds = arguments[1];

            if (typeof value != 'number') {

                return null;
            }

            var invert          = properties.yaxisScaleInvert;
            var xaxispos        = properties.xaxisPosition;
            var graphHeight     = this.canvas.height - this.marginTop - this.marginBottom;
            var halfGraphHeight = graphHeight / 2;
            var ymax            = this.max;
            var ymin            = properties.yaxisScaleMin;
            var coord           = 0;
    
            if (   (value > ymax && !outofbounds)
                || (properties.xaxisPosition === 'bottom' && value < ymin && !outofbounds)
                || (properties.xaxisPosition === 'center' && ((value > 0 && value < ymin) || (value < 0 && value > (-1 * ymin))))
               ) {
                return null;
            }

            //
            // This calculates scale values if the X axis is in the center
            //
            if (xaxispos == 'center') {
    
                coord = ((Math.abs(value) - ymin) / (ymax - ymin)) * halfGraphHeight;
    
                if (invert) {
                    coord = halfGraphHeight - coord;
                }
                
                if (value < 0) {
                    coord += this.marginTop;
                    coord += halfGraphHeight;
                } else {
                    coord  = halfGraphHeight - coord;
                    coord += this.marginTop;
                }
    
            //
            // And this calculates scale values when the X axis is at the bottom
            //
            } else {
    
                coord = ((value - ymin) / (ymax - ymin)) * graphHeight;

                if (invert) {
                    coord = graphHeight - coord;
                }
    
                // Invert the coordinate because the Y scale starts at the top
                coord = graphHeight - coord;

                // And add on the top gutter
                coord = this.marginTop + coord;
            }
    
            return coord;
        };








        //
        // Draws a bubble chart
        //
        // @param dataset int The dataset index
        //
        this.drawBubble = function (dataset)
        {
            var data  = RGraph.isArray(properties.bubbleData) && RGraph.isArray(properties.bubbleData[dataset]) ? properties.bubbleData[dataset] : properties.bubbleData;
            var min   = RGraph.isArray(properties.bubbleMin) ? properties.bubbleMin[dataset] : properties.bubbleMin;
            var max   = RGraph.isArray(properties.bubbleMax) ? properties.bubbleMax[dataset] : properties.bubbleMax;
            var width = RGraph.isArray(properties.bubbleWidth) ? properties.bubbleWidth[dataset] : properties.bubbleWidth;

            // Initialise the coordinates array
            this.coordsBubble[dataset] = [];

            // Loop through all the points (first dataset)
            for (var i=0; i<this.coords[dataset].length; ++i) {

                data[i] = Math.max(data[i], min);
                data[i] = Math.min(data[i], max);

                var radius = (((data[i] - min) / (max - min) ) * width) / 2,
                    color  = this.data[dataset][i][2] ? this.data[dataset][i][2] : properties.colorsDefault;

                this.context.beginPath();
                this.context.fillStyle = RGraph.radialGradient({
                    object: this,
                    x1:     this.coords[dataset][i][0] + (radius / 2.5),
                    y1:     this.coords[dataset][i][1] - (radius / 2.5),
                    r1:     0,
                    x2:     this.coords[dataset][i][0] + (radius / 2.5),
                    y2:     this.coords[dataset][i][1] - (radius / 2.5),
                    r2:     radius,
                    colors: [
                        properties.colorsBubbleGraduated ? 'white' : color,
                        color
                    ]
                });

                // Draw the bubble
                this.context.arc(
                    this.coords[dataset][i][0],
                    this.coords[dataset][i][1],
                    radius,
                    0,
                    RGraph.TWOPI,
                    false
                );

                this.context.fill();

                this.coordsBubble[dataset][i] = [
                    this.coords[dataset][i][0],
                    this.coords[dataset][i][1],
                    radius,
                    this.context.fillStyle
                ];
            }
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors.data                 = RGraph.arrayClone(this.data);
                this.original_colors.backgroundVbars      = RGraph.arrayClone(properties.backgroundVbars);
                this.original_colors.backgroundHbars      = RGraph.arrayClone(properties.backgroundHbars);
                this.original_colors.lineColors           = RGraph.arrayClone(properties.lineColors);
                this.original_colors.colorsDefault        = RGraph.arrayClone(properties.colorsDefault);
                this.original_colors.crosshairsColor      = RGraph.arrayClone(properties.crosshairsColor);
                this.original_colors.highlightStroke      = RGraph.arrayClone(properties.highlightStroke);
                this.original_colors.highlightFill        = RGraph.arrayClone(properties.highlightFill);
                this.original_colors.backgroundBarsColor1 = RGraph.arrayClone(properties.backgroundBarsColor1);
                this.original_colors.backgroundBarsColor2 = RGraph.arrayClone(properties.backgroundBarsColor2);
                this.original_colors.backgroundGridColor  = RGraph.arrayClone(properties.backgroundGridColor);
                this.original_colors.backgroundColor      = RGraph.arrayClone(properties.backgroundColor);
                this.original_colors.axesColor            = RGraph.arrayClone(properties.axesColor);
            }





            // Colors
            var data = this.data;
            if (data) {
                for (var dataset=0; dataset<data.length; ++dataset) {
                    for (var i=0; i<this.data[dataset].length; ++i) {

                        // Boxplots
                        if (this.data[dataset][i] && typeof this.data[dataset][i][1] == 'object' && this.data[dataset][i][1]) {

                            if (typeof this.data[dataset][i][1][5] == 'string') this.data[dataset][i][1][5] = this.parseSingleColorForGradient(this.data[dataset][i][1][5]);
                            if (typeof this.data[dataset][i][1][6] == 'string') this.data[dataset][i][1][6] = this.parseSingleColorForGradient(this.data[dataset][i][1][6]);
                        }
                        
                        if (!RGraph.isNull(this.data[dataset][i])) {
                            this.data[dataset][i][2] = this.parseSingleColorForGradient(this.data[dataset][i][2]);
                        }
                    }
                }
            }
            
            // Parse HBars
            var hbars = properties.backgroundHbars;
            if (hbars) {
                for (i=0; i<hbars.length; ++i) {
                    hbars[i][2] = this.parseSingleColorForGradient(hbars[i][2]);
                }
            }
            
            // Parse HBars
            var vbars = properties.backgroundVbars;
            if (vbars) {
                for (i=0; i<vbars.length; ++i) {
                    vbars[i][2] = this.parseSingleColorForGradient(vbars[i][2]);
                }
            }
            
            // Parse line colors
            var colors = properties.lineColors;
            if (colors) {
                for (i=0; i<colors.length; ++i) {
                    colors[i] = this.parseSingleColorForGradient(colors[i]);
                }
            }
    
             properties.colorsDefault         = this.parseSingleColorForGradient(properties.colorsDefault);
             properties.crosshairsColor       = this.parseSingleColorForGradient(properties.crosshairsColor);
             properties.highlightStroke       = this.parseSingleColorForGradient(properties.highlightStroke);
             properties.highlightFill         = this.parseSingleColorForGradient(properties.highlightFill);
             properties.backgroundBarsColor1  = this.parseSingleColorForGradient(properties.backgroundBarsColor1);
             properties.backgroundBarsColor2  = this.parseSingleColorForGradient(properties.backgroundBarsColor2);
             properties.backgroundGridColor   = this.parseSingleColorForGradient(properties.backgroundGridColor);
             properties.backgroundColor       = this.parseSingleColorForGradient(properties.backgroundColor);
             properties.axesColor             = this.parseSingleColorForGradient(properties.axesColor);
        };








        //
        // Use this function to reset the object to the post-constructor state. Eg reset colors if
        // need be etc
        //
        this.reset = function ()
        {
        };








        //
        // This parses a single color value for a gradient
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

                // Allow for JSON gradients
                if (color.match(/^gradient\(({.*})\)$/i)) {
                    return RGraph.parseJSONGradient({object: this, def: RegExp.$1});
                }

                var parts = RegExp.$1.split(':');
    
                // Create the gradient
                var grad = this.context.createLinearGradient(0,this.canvas.height - properties.marginBottom, 0, properties.marginTop);
    
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
            if (this.coords && this.coords[index] && this.coords[index].length) {
                
                var obj = this;
                
                this.coords[index].forEach(function (value, idx, arr)
                {
                    obj.context.beginPath();
                    obj.context.fillStyle = properties.keyInteractiveHighlightChartFill;
                    obj.context.arc(value[0], value[1], properties.tickmarksSize + 3, 0, RGraph.TWOPI, false);
                    obj.context.fill();
                });
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
        // Draws a trendline on the Scatter chart. This is also known
        // as a "best-fit line"
        //
        //@param dataset The index of the dataset to use
        //
        this.drawTrendline = function  ()
        {
            var args = RGraph.getArgs(arguments, 'dataset');

            var color     = properties.trendlineColor,
                linewidth = properties.trendlineLinewidth,
                margin    = properties.trendlineMargin;
            
            // handle the options being arrays
            if (typeof color === 'object' && color[args.dataset]) {
                color = color[args.dataset];
            } else if (typeof color === 'object') {
                color = 'gray';
            }
            
            if (typeof linewidth === 'object' && typeof linewidth[args.dataset] === 'number') {
                linewidth = linewidth[args.dataset];
            } else if (typeof linewidth === 'object') {
                linewidth = 1;
            }
            
            if (typeof margin === 'object' && typeof margin[args.dataset] === 'number') {
                margin = margin[args.dataset];
            } else if (typeof margin === 'object'){
                margin = 25;
            }
            

            // Step 1: Calculate the mean values of the X coords and the Y coords
            for (var i=0,totalX=0,totalY=0; i<this.data[args.dataset].length; ++i) {
                totalX += this.data[args.dataset][i][0];
                totalY += this.data[args.dataset][i][1];
            }
            
            var averageX = totalX / this.data[args.dataset].length;
            var averageY = totalY / this.data[args.dataset].length;

            // Step 2: Calculate the slope of the line
            
            // a: The X/Y values minus the average X/Y value
            for (var i=0,xCoordMinusAverageX=[],yCoordMinusAverageY=[],valuesMultiplied=[],xCoordMinusAverageSquared=[]; i<this.data[args.dataset].length; ++i) {
                xCoordMinusAverageX[i] = this.data[args.dataset][i][0] - averageX;
                yCoordMinusAverageY[i] = this.data[args.dataset][i][1] - averageY;
                
                // b. Multiply the averages
                valuesMultiplied[i] = xCoordMinusAverageX[i] * yCoordMinusAverageY[i];
                xCoordMinusAverageSquared[i] = xCoordMinusAverageX[i] * xCoordMinusAverageX[i];
            }
                
            var sumOfValuesMultiplied = RGraph.arraySum(valuesMultiplied);
            var sumOfXCoordMinusAverageSquared = RGraph.arraySum(xCoordMinusAverageSquared);

            // Calculate m (???)
            var m = sumOfValuesMultiplied / sumOfXCoordMinusAverageSquared;
            var b = averageY - (m * averageX);

            // y = mx + b
            
            coords =  [
                [properties.xaxisScaleMin, m * properties.xaxisScaleMin + b],
                [properties.xaxisScaleMax, m * properties.xaxisScaleMax + b]
            ];

            //
            // Draw the line
            //
            
            // Set dotted, dash or a custom dash array
            if (properties.trendlineDashed) {
                this.context.setLineDash([4,4]);
            }
            
            if (properties.trendlineDotted) {
                this.context.setLineDash([1,4]);
            }
            
            if (!RGraph.isNull(properties.trendlineDashArray) && typeof properties.trendlineDashArray === 'object') {
                this.context.setLineDash(properties.trendlineDashArray);
            }


            // Clip the canvas again so that the line doesn't look overly long
            // (use the minimum an maximum points for this)
            for (var i=0,xValues=[],yValues=[]; i<this.data[args.dataset].length; ++i) {
                if (typeof this.data[args.dataset][i][0] === 'number') {
                    xValues.push(this.data[args.dataset][i][0]);
                }
            
                if (typeof this.data[args.dataset][i][1] === 'number') {
                    yValues.push(this.data[args.dataset][i][1]);
                }
            }

            // These are the minimum and maximum X/Y values for this dataset
            var x1 = RGraph.arrayMin({array: xValues});
            var y1 = RGraph.arrayMin({array: yValues});
            var x2 = RGraph.arrayMax({array: xValues});
            var y2 = RGraph.arrayMax({array: yValues});
            
            
            // Convert the X/Y values into coordinates on the canvas
            x1 = this.getXCoord(x1);
            y1 = this.getYCoord(y1, properties.outofbounds);
            x2 = this.getXCoord(x2);
            y2 = this.getYCoord(y2, properties.outofbounds);


            // Draw the line
            this.path(
                ' lw % sa b r % % % % cl b r % % % % cl b m % % l % % s % rs',
                linewidth,
                    
                // These are the rect arguments
                properties.marginLeft + margin,
                properties.marginTop + margin,
                this.canvas.width - properties.marginLeft - properties.marginRight - margin - margin,
                this.canvas.height - properties.marginTop - properties.marginBottom - margin - margin,
                    
                // These are the second rect arguments
                properties.trendlineClipping === false ? 0 : x1 - 25,
                properties.trendlineClipping === false ? 0 : y2 - 25,
                properties.trendlineClipping === false ? this.canvas.width  : x2 - x1 + 25 + 25,
                properties.trendlineClipping === false ? this.canvas.height : y1 - y2 + 25 + 25,
                
                // moveTo
                this.getXCoord(coords[0][0]), this.getYCoord(coords[0][1], true),
                
                // lineTo
                this.getXCoord(coords[1][0]), this.getYCoord(coords[1][1], true),
                
                // stroke color
                color
            );
            
            // Reset the line dash array
            this.context.setLineDash([5,0]);
        };







        //
        // Trace2
        // 
        // This is a new version of the Trace effect which no longer requires jQuery and is more compatible
        // with other effects (eg Expand). This new effect is considerably simpler and less code.
        // 
        // @param object     Options for the effect. Currently only "frames" is available.
        // @param int        A function that is called when the ffect is complete
        //
        this.trace  = function ()
        {
            var obj       = this,
                callback  = arguments[2],
                opt       = arguments[0] || {},
                frames    = opt.frames || 30,
                frame     = 0,
                callback  = arguments[1] || function () {}

            obj.set('animationTrace', true);
            obj.set('animationTraceClip', 0);
    
            function iterator ()
            {
                RGraph.clear(obj.canvas);

                RGraph.redrawCanvas(obj.canvas);

                if (frame++ < frames) {
                    obj.set('animationTraceClip', frame / frames);
                    RGraph.Effects.updateCanvas(iterator);
                } else {
                    callback(obj);
                }
            }
            
            iterator();
            
            return this;
        };








        //
        // This helps the Gantt reset colors when the reset function is called.
        // It handles going through the data and resetting the colors.
        //
        this.resetColorsToOriginalValues = function ()
        {
            //
            // Copy the original colors over for single-event-per-line data
            //
            for (var i=0,len=this.original_colors.data.length; i<len; ++i) {
                for (var j=0,len2=this.original_colors.data[i].length; j<len2;++j) {

                    // The color for the point
                    this.data[i][j][2] = RGraph.arrayClone(this.original_colors.data[i][j][2]);
                    
                    // Handle boxplots
                    if (typeof this.data[i][j][1] === 'object') {
                        this.data[i][j][1][5] = RGraph.arrayClone(this.original_colors.data[i][j][1][5]);
                        this.data[i][j][1][6] = RGraph.arrayClone(this.original_colors.data[i][j][1][6]);
                    }
                }
            }
        };








        // If only one tooltip has been given populate each data-piece with it
        this.populateTooltips = function ()
        {
            for (var i=0; i<this.data.length; ++i) { // for each dataset...
                for (var j=0; j<this.data[i].length; ++j) { // For each point in the dataset
                    this.data[i][j][3] = properties.tooltips;
                }
            }
        };








        //
        // A worker function that handles Bar chart specific tooltip substitutions
        //
        this.tooltipSubstitutions = function (opt)
        {
            var indexes = RGraph.sequentialIndexToGrouped(opt.index, this.data);

            return {
                  index: indexes[1],
                dataset: indexes[0],
        sequentialIndex: opt.index,
                  value: this.data[indexes[0]][indexes[1]][1],
                 values: [this.data[indexes[0]][indexes[1]][1]]
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
            // The tooltipsFormattedKeyColors property has been specified so use that if
            // there's a relevant color
            if (   !RGraph.isNull(properties.tooltipsFormattedKeyColors)
                && typeof properties.tooltipsFormattedKeyColors === 'object'
                && typeof properties.tooltipsFormattedKeyColors[specific.dataset] === 'string'
               ) {
                var color = properties.tooltipsFormattedKeyColors[specific.dataset];
            }

            // If a color is defined for this point then use it
            if (this.data[specific.dataset][specific.index][2]) {
                color = this.data[specific.dataset][specific.index][2];
            }


            var label = properties.tooltipsFormattedKeyLabels[specific.index]
                           ? properties.tooltipsFormattedKeyLabels[specific.index]
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
                canvasXY = RGraph.getCanvasXY(obj.canvas),
                indexes  = RGraph.sequentialIndexToGrouped(args.index, this.data),
                coords   = this.coords[indexes[0]][indexes[1]];



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
                - 15                             // An arbitrary amount
                + obj.properties.tooltipsOffsety // Add any user defined offset
            ) + 'px';

        };








        //
        // Register the object
        //
        RGraph.register(this);








        //
        // This is the 'end' of the constructor so if the first argument
        // contains configuration data - handle that.
        //
        RGraph.parseObjectStyleConfig(this, conf.options);
    };