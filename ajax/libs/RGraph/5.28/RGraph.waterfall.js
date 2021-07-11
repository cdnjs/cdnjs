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
    // The bar chart constructor
    //
    RGraph.Waterfall = function (conf)
    {
        this.id                = conf.id;
        this.canvas            = document.getElementById(this.id);
        this.context           = this.canvas.getContext ? this.canvas.getContext("2d") : null;
        this.canvas.__object__ = this;
        this.type              = 'waterfall';
        this.max               = 0;
        this.data              = conf.data;
        this.isRGraph          = true;
        this.isrgraph          = true;
        this.rgraph            = true;
        this.coords            = [];
        this.uid               = RGraph.createUID();
        this.canvas.uid        = this.canvas.uid ? this.canvas.uid : RGraph.createUID();
        this.colorsParsed      = false;
        this.coordsText        = [];
        this.original_colors   = [];
        this.firstDraw         = true; // After the first draw this will be false






        // Various config
        this.properties =
        {
            backgroundBarsCount:               null,
            backgroundBarsColor1:              'rgba(0,0,0,0)',
            backgroundBarsColor2:              'rgba(0,0,0,0)',
            backgroundGrid:                    true,
            backgroundGridAutofit:             true,
            backgroundGridAutofitAlign:        true,
            backgroundGridColor:               '#ddd',
            backgroundGridLinewidth:           1,
            backgroundGridHsize:               20,
            backgroundGridVsize:               20,
            backgroundGridVlines:              true,
            backgroundGridHlines:              true,
            backgroundGridBorder:              true,
            backgroundGridAlign:               true,
            backgroundGridHlinesCount:         5,
            backgroundGridVlinesCount:         20,
            backgroundImage:                   null,
            backgroundImageStretch:            true,
            backgroundImageX:                  null,
            backgroundImageY:                  null,
            backgroundImageW:                  null,
            backgroundImageH:                  null,
            backgroundImageAlign:              null,
            backgroundHbars:                   null,

            linewidth:                         1,

            colorsStroke:                      '#666',
            colors:                            ['green','red','blue'],
            colorsSequential:                  false,

            marginLeft:                        35,
            marginRight:                       35,
            marginTop:                         35,
            marginBottom:                      35,
            marginInner:                       5,

            xaxis:                   true,
            xaxisPosition:           'bottom',
            xaxisLinewidth:          1,
            xaxisColor:              'black',
            xaxisTickmarks:          true,
            xaxisTickmarksLength:    3,
            xaxisTickmarksLastLeft:  null,
            xaxisTickmarksLastRight: null,
            xaxisTickmarksCount:     null,
            xaxisLabels:             null,            
            xaxisLabelsSize:         null,
            xaxisLabelsFont:         null,
            xaxisLabelsItalic:       null,
            xaxisLabelsBold:         null,
            xaxisLabelsColor:        null,
            xaxisLabelsOffsetx:      0,
            xaxisLabelsOffsety:      0,
            xaxisLabelsHalign:       null,
            xaxisLabelsValign:       null,
            xaxisLabelsPosition:     'section',
            xaxisLabelsSpecificAlign:'LEFT',
            xaxisPosition:           'bottom',
            xaxisLabelsAngle:        0,
            xaxisTitle:              '',
            xaxisTitleBold:          null,
            xaxisTitleSize:          null,
            xaxisTitleFont:          null,
            xaxisTitleColor:         null,
            xaxisTitleItalic:        null,
            xaxisTitlePos:           null,
            xaxisTitleOffsetx:       0,
            xaxisTitleOffsety:       0,
            xaxisTitleX:             null,
            xaxisTitleY:             null,
            xaxisTitleHalign:        'center',
            xaxisTitleValign:        'top',


            yaxis:                    true,
            yaxisPosition:            'left',
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

            yaxisTitle:                        '',
            yaxisTitleBold:                    null,
            yaxisTitleItalic:                  null,
            yaxisTitleSize:                    null,
            yaxisTitleFont:                    null,
            yaxisTitleColor:                   null,
            yaxisTitlePos:                     null,
            yaxisTitleAlign:                   'left',
            yaxisTitleX:                       null,
            yaxisTitleY:                       null,
            yaxisLabels:                       true,
            yaxisLabelsCount:                  5,
            yaxisLabelsOffsetx:                0,
            yaxisLabelsOffsety:                0,
            yaxisLabelsFont:                   null,
            yaxisLabelsSize:                   null,
            yaxisLabelsColor:                  null,
            yaxisLabelsBold:                   null,
            yaxisLabelsItalic:                 null,
            yaxisScaleMax:                     null,
            yaxisScaleMin:                     0,
            yaxisScaleUnitsPre:                '',
            yaxisScaleUnitsPost:               '',
            yaxisScaleDecimals:                0,
            yaxisScalePoint:                   '.',
            yaxisScaleThousand:                ',',
            yaxisScaleFormatter:               null,

            labelsAbove:                       false,
            labelsAboveFont:                   null,
            labelsAboveSize:                   null,
            labelsAboveBold:                   null,
            labelsAboveItalic:                 null,
            labelsAboveColor:                  null,
            labelsAboveOffsetx:                0,
            labelsAboveOffsety:                0,
            labelsAboveSpecific:               null,
            labelsAboveDecimals:               0,
            labelsAboveUnitsPre:               '',
            labelsAboveUnitsPost:              '',
            labelsAbovePoint:                  '.',
            labelsAboveThousand:               ',',
            labelsAboveFormatter:              null,
            labelsAboveTotalItalic:            null,
            labelsAboveTotalBold:              null,
            labelsAboveTotalSize:              null,
            labelsAboveTotalFont:              null,
            labelsAboveTotalColor:             null,
            labelsAboveTotalDecimals:          null,
            labelsAboveTotalUnitsPre:          null,
            labelsAboveTotalUnitsPost:         null,
            labelsAboveTotalPoint:             null,
            labelsAboveTotalThousand:          null,
            labelsAboveTotalFormatter:         null,
            labelsAboveTotalOffsetx:           0,
            labelsAboveTotalOffsety:           0,

            textColor:                         'black',
            textSize:                          12,
            textFont:                          'Arial, Verdana, sans-serif',
            textBold:                          false,
            textItalic:                        false,
            textAccessible:                    true,
            textAccessibleOverflow:            'visible',
            textAccessiblePointerevents:       false,

            title:                             '',
            titleColor:                        'black',
            titleBackground:                   null,
            titleHpos:                         null,
            titleVpos:                         null,
            titleBold:                         null,
            titleFont:                         null,
            titleSize:                         null,
            titleItalic:                       null,
            titleColor:                        null,
            titleX:                            null,
            titleY:                            null,
            titleHalign:                       null,
            titleValign:                       null,
            titleOffsetx:                      0,
            titleOffsety:                      0,

            shadow:                            false,
            shadowColor:                       '#666',
            shadowOffsetx:                     3,
            shadowOffsety:                     3,
            shadowBlur:                        3,

            tooltips:                          null,
            tooltipsEffect:                    'fade',
            tooltipsCssClass:                  'RGraph_tooltip',
            tooltipsCss:                       null,
            tooltipsEvent:                     'onclick',
            tooltipsHighlight:                 true,
            tooltipsOverride:                  null,
            tooltipsFormattedThousand:         ',',
            tooltipsFormattedPoint:            '.',
            tooltipsFormattedDecimals:         0,
            tooltipsFormattedUnitsPre:         '',
            tooltipsFormattedUnitsPost:        '',
            tooltipsFormattedKeyColors:        null,
            tooltipsFormattedKeyColorsShape: 'square',
            tooltipsFormattedKeyLabels:        [],
            tooltipsFormattedListType:  'ul',
            tooltipsFormattedListItems: null,
            tooltipsFormattedTableHeaders: null,
            tooltipsFormattedTableData: null,
            tooltipsPointer:            true,
            tooltipsPositionStatic:     true,

            highlightStroke:                   'rgba(0,0,0,0)',
            highlightFill:                     'rgba(255,255,255,0.7)',

            contextmenu:                       null,

            crosshairs:                        false,
            crosshairsColor:                   '#333',
            crosshairsHline:                   true,
            crosshairsVline:                   true,

            annotatable:                       false,
            annotatableLinewidth:              1,
            annotatableColor:                  'black',

            resizable:                         false,
            resizableHandleBackground:         null,

            total:                             true,

            multiplierX:                       1, // Used for animation
            multiplierW:                       1, // Used for animation

            key:                               null,
            keyBackground:                     'white',
            keyPosition:                       'graph',
            keyHalign:                         'right',
            keyShadow:                         false,
            keyShadowColor:                    '#666',
            keyShadowBlur:                     3,
            keyShadowOffsetx:                  2,
            keyShadowOffsety:                  2,
            keyPositionGutterBoxed:            false,
            keyPositionX:                      null,
            keyPositionY:                      null,
            keyColorShape:                     'square',
            keyRounded:                        true,
            keyLinewidth:                      1,
            keyColors:                         null,
            keyInteractive:                    false,
            keyInteractiveHighlightChartStroke:'#000',
            keyInteractiveHighlightChartFill:  'rgba(255,255,255,0.7)',
            keyInteractiveHighlightLabel:      'rgba(255,0,0,0.2)',
            keyLabelsColor:                    null,
            keyLabelsFont:                     null,
            keyLabelsSize:                     null,
            keyLabelsBold:                     null,
            keyLabelsItalic:                   null,
            keyLabelsOffsetx:                  0,
            keyLabelsOffsety:                  0,

            barOffsetx:                        0, // Used to facilitate multiple dataset Waterfall charts
            barOffsety:                        0, // Used to facilitate multiple dataset Waterfall charts

            clearto:                           'rgba(0,0,0,0)'
        }

        // Check for support
        if (!this.canvas) {
            alert('[WATERFALL] No canvas support');
            return;
        }
        
        // Split a string
        this.data = RGraph.stringsToNumbers(this.data);




        //
        // Create the $ objects
        // 
        // 2/5/016: Now also use this loop to go through the dat conerting
        // strings to floats
        //
        for (var i=0,len=this.data.length; i<=len; ++i) {
            
            // Create the object for adding event listeners
            this['$' + i] = {}
            
            // Ensure that the data point is numeric
            //if (typeof this.data[i] === 'string') {
            //    this.data[i] = parseFloat(this.data[i]);
            //}
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
            // Parse the colors. This allows for simple gradient syntax
            //
            if (!this.colorsParsed) {
                this.parseColors();
                
                // Don't want to do this again
                this.colorsParsed = true;
            }
    
            
            //
            // Draw the background image
            //
            RGraph.drawBackgroundImage(this);



            //
            // Make the margins easy ro access
            //            
            this.marginLeft   = properties.marginLeft;
            this.marginRight  = properties.marginRight;
            this.marginTop    = properties.marginTop;
            this.marginBottom = properties.marginBottom;

            //
            // Stop the coords array from growing uncontrollably
            //
            this.coords = [];



            //
            // Stop this growing uncontrollably
            //
            this.coordsText = [];




            //
            // This gets used a lot
            //
            this.centery = ((this.canvas.height - this.marginTop - this.marginBottom) / 2) + this.marginTop;

            //
            // Work out a few things. They need to be here because they depend on things you can change after you instantiate the object
            //
            this.max            = 0;
            this.grapharea      = this.canvas.height - this.marginTop - this.marginBottom;
            this.graphwidth     = this.canvas.width - this.marginLeft - this.marginRight;
            this.halfTextHeight = properties.textSize / 2;
    
    
            //
            // Work out the maximum value
            //
            this.max     = this.getMax(this.data);
            var decimals = properties.yaxisScaleDecimals;

            this.scale2 = RGraph.getScale({object: this, options: {
                'scale.max':          typeof properties.yaxisScaleMax == 'number' ? properties.yaxisScaleMax : this.max,
                'scale.min':          properties.yaxisScaleMin,
                'scale.strict':       typeof properties.yaxisScaleMax === 'number' ? true : false,
                'scale.decimals':     Number(decimals),
                'scale.point':        properties.yaxisScalePoint,
                'scale.thousand':     properties.yaxisScaleThousand,
                'scale.round':        properties.yaxisScaleRound,
                'scale.units.pre':    properties.yaxisScaleUnitsPre,
                'scale.units.post':   properties.yaxisScaleUnitsPost,
                'scale.labels.count': properties.yaxisLabelsCount,
                'scale.formatter':    properties.yaxisScaleFormatter
            }});

            this.max = this.scale2.max;
            this.min = this.scale2.min;
    
            // Draw the background hbars
            RGraph.drawBars(this)

            // Progressively Draw the chart
            RGraph.Background.draw(this);
    
            this.drawAxes();
            this.drawBars();
            this.drawLabels();
            
//
// If the X axis is at the bottom AND ymin is 0 - draw the it
// again so that it appears "on top" of the bars
//
//if (   properties.xaxisPosition === 'bottom'
//    && properties.axes
//    && properties.xaxis
//    && properties.yaxisScaleMin === 0) {

//    this.context.strokeStyle = properties.axesColor;
//    this.context.strokeRect(
//        properties.marginLeft,
//        this.canvas.height - this.marginBottom,
//        this.canvas.width - this.marginLeft - this.marginRight,
//        0
//    );
//}
    
            //
            // Setup the context menu if required
            //
            if (properties.contextmenu) {
                RGraph.showContext(this);
            }
    
    
            //
            // This installs the event listeners
            //
            RGraph.installEventListeners(this);
            
            
            // Draw a key if necessary
            if (properties.key && properties.key.length) {
                RGraph.drawKey(this, properties.key, properties.colors);
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
        // Draws the charts axes
        //
        this.drawAxes = function ()
        {
            //
            // Draw the X axis
            //
            RGraph.drawXAxis(this);

            //
            // Draw the Y axis
            //
            RGraph.drawYAxis(this);
        };








        //
        // Draws the labels for the graph
        //
        this.drawLabels = function ()
        {
            //
            // Draw the labelsAbove labels
            //
            if (properties.labelsAbove) {
                this.drawLabelsAbove();
            }
        };








        //
        // This function draws all of the above labels
        //
        this.drawLabelsAbove = function ()
        {
            var data      = this.data,
                unitsPre  = properties.labelsAboveUnitsPre,
                unitsPost = properties.labelsAboveUnitsPost,
                decimals  = properties.labelsAboveDecimals,
                thousand  = properties.labelsAboveThousand,
                point     = properties.labelsAbovePoint,
                formatter = properties.labelsAboveFormatter;

            var textConf = RGraph.getTextConf({
                object: this,
                prefix: 'labelsAbove'
            });

            for (var i=0; i<this.data.length + (properties.total ? 1 : 0); ++i) {

                // Is this the "total" column
                if (properties.total && i === this.data.length) {
                    var isTotal = true;
                }
                
                // Get the value
                var value = Number(isTotal ? this.total : this.data[i]);
                
                // Determine the color based on whether the value is positive,
                // negative or the total
                if (typeof properties.labelsAboveColor === 'object' && properties.labelsAboveColor) {
                    if (isTotal && typeof properties.labelsAboveColor[2] === 'string') {
                        color = properties.labelsAboveColor[2];
                    } else if (this.data[i] < 0) {
                        color = properties.labelsAboveColor[1];
                    } else {
                        color = properties.labelsAboveColor[0];
                    }
                }
                
                
                // Do the color handling again if this is the last
                // label (and its an object) but using the
                // labelsAboveLastColor property if it's set
                if (typeof properties.labelsAboveTotalColor === 'object' && properties.labelsAboveTotalColor) {
                    if (   isTotal
                        && typeof properties.labelsAboveTotalColor[0] === 'string'
                        && typeof properties.labelsAboveTotalColor[1] === 'string'
                        ) {

                        if (this.total < 0) {
                            color = properties.labelsAboveTotalColor[1];
                        } else {
                            color = properties.labelsAboveTotalColor[0];
                        }
                    }
                }

                var coords = this.coords[i];




                // This code is repeated below for the last label. Temporarily
                // set the point and thousand properies because the numberFormat
                // function is dumb. These properties are reset after the last
                // label has been formatted
                var tmpScaleThousand = properties.yaxisScaleThousand,
                    tmpScalePoint    = properties.yaxisScaleDecimal;

                properties.yaxisScaleThousand = properties.labelsAboveThousand;
                properties.yaxisScalePoint    = properties.labelsAbovePoint;

                // Custom formatting or use the numberFormat function
                if (formatter) {
                    var str = (formatter)({
                        object: this,
                        value: value,
                        index: i
                    });
                } else {
                    var str = RGraph.numberFormat({
                        object:    this,
                        number:    String(value.toFixed(decimals)),
                        unitspre:  unitsPre,
                        unitspost: unitsPost,
                        point:     point,
                        thousand:  thousand
                    });
                }








                // Allow for the styling of the last label
                if (isTotal || i === this.data.length) {

                    if (typeof properties.labelsAboveTotalFont       === 'string')    textConf.font   = properties.labelsAboveTotalFont;
                    if (typeof properties.labelsAboveTotalColor      === 'string')    textConf.color  = properties.labelsAboveTotalColor;
                    if (typeof properties.labelsAboveTotalSize       === 'number')    textConf.size   = properties.labelsAboveTotalSize;
                    if (!RGraph.isNull(properties.labelsAboveTotalBold))              textConf.bold   = properties.labelsAboveTotalBold;
                    if (!RGraph.isNull(properties.labelsAboveTotalItalic))            textConf.italic = properties.labelsAboveTotalItalic;
                    if (typeof properties.labelsAboveTotalUnitsPre  === 'string')     unitsPre        = properties.labelsAboveTotalUnitsPre;
                    if (typeof properties.labelsAboveTotalUnitsPost === 'string')     unitsPost       = properties.labelsAboveTotalUnitsPost;
                    if (typeof properties.labelsAboveTotalDecimals   === 'number')    decimals        = properties.labelsAboveTotalDecimals;
                    if (typeof properties.labelsAboveTotalFormatter  === 'function')  formatter       = properties.labelsAboveTotalFormatter;
                    if (typeof properties.labelsAboveTotalThousand   === 'string')    thousand        = properties.labelsAboveTotalThousand;
                    if (typeof properties.labelsAboveTotalPoint      === 'string')    point           = properties.labelsAboveTotalPoint;




                    // Custom formatting or use the numberFormat function
                    // This code is repeated just up above
                    if (formatter) {
                        var str = (formatter)({
                            object: this,
                            value: value,
                            index: i
                        });
                    } else {

                        str = RGraph.numberFormat({
                            object:    this,
                            number:    String(value.toFixed(decimals)),
                            unitspre:  unitsPre,
                            unitspost: unitsPost,
                            point:     point,
                            thousand:  thousand
                        });
                    }



                    // These two variables can now be reset to what they were when we
                    // started
                    properties.yaxisScaleThousand = tmpScaleThousand;
                    properties.yaxisScalePoint    = tmpScalePoint;
                }

                // Allow for specific labels
                if (   typeof properties.labelsAboveSpecific === 'object'
                    && !RGraph.isNull(properties.labelsAboveSpecific)
                   ) {
                   
                   if ( typeof properties.labelsAboveSpecific[i] === 'string' || typeof properties.labelsAboveSpecific[i] === 'number' ) {
                       str = properties.labelsAboveSpecific[i];
                   } else {
                       str = '';
                   }
                }


                RGraph.text({
                            
               object: this,

                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:      coords[0] + (coords[2] / 2) + (isTotal ? properties.labelsAboveTotalOffsetx : properties.labelsAboveOffsetx),
                    y:      (isTotal ? this.total : this.data[i]) >= 0 ? (coords[1] - 3  + (isTotal ? properties.labelsAboveTotalOffsety : properties.labelsAboveOffsety)) : (coords[1] + coords[3] + 3 + (isTotal ? properties.labelsAboveTotalOffsety : properties.labelsAboveOffsety)),

                    text:   str,
                    valign: (isTotal ? this.total : this.data[i]) >= 0 ? 'bottom' : 'top',
                    halign: 'center',
                    tag:    'labels.above'
                });
            }
        };








        //
        // Draws the bars on to the chart
        //
        this.drawBars = function ()
        {
            var context      = this.context,
                canvas       = this.canvas,
                hmargin      = properties.marginInner,
                runningTotal = 0;
    
            this.context.lineWidth = properties.linewidth + 0.001;

            for (var i=0,len=this.data.length,seq=0; i<len; ++i,++seq) {

                this.context.beginPath();
                    
                    this.context.strokeStyle = properties.colorsStroke;

                    var x = Math.round( this.marginLeft + hmargin + (((this.graphwidth / (this.data.length + (properties.total ? 1 : 0))) * i) * properties.multiplierX));
                    
                    // Must be before the y coord calculation
                    var h  = this.getYCoord(0) - this.getYCoord(Math.abs(this.data[i]));

                    
                    
                    // Work out the Y coordinate
                    if (i === 0) {
                        y = this.getYCoord(0) - h;
                    } else {
                        y = this.getYCoord(runningTotal) - h;
                    }
                    y = Math.round(y);
                    




                    var w = ((this.canvas.width - this.marginLeft - this.marginRight) / (this.data.length + (properties.total ? 1 : 0 )) ) - (2 * properties.marginInner);
                        w = w * properties.multiplierW;


                    // Adjust the coords for negative values
                    if (this.data[i] < 0) {
                        y += h;
                    }

                    
                    // Allow for sequential colors
                    if (properties.colorsSequential) {
                        this.context.fillStyle = properties.colors[seq];
                    } else {
                        // Color
                        this.context.fillStyle = this.data[i] >= 0 ? properties.colors[0] : properties.colors[1];
                    }

                    
                    if (properties.shadow) {
                        RGraph.setShadow({
                            object: this,
                            prefix: 'shadow'
                        });
                    } else {
                        RGraph.noShadow(this);
                    }



                    //
                    // Draw the bar, first accounting for negative heights
                    //
                    if (h < 0) {
                        h = Math.abs(h);
                        y = y - h;
                    }

                    this.context.rect(
                        x + properties.barOffsetx,
                        Math.floor(y) + properties.barOffsety,
                        w,
                        Math.floor(h)
                    );

                    this.coords.push([x, y, w, h]);
                    


                    runningTotal += this.data[i];

                this.context.stroke();
                this.context.fill();
            }

            // Store the total
            this.total = runningTotal;

            if (properties.total) {

                // This is the height of the final bar
                if (properties.xaxisPosition === 'top') {
                    h = this.getYCoord(Math.abs(runningTotal)) - this.getYCoord(0);
                } else {
                    h = this.getYCoord(0) - this.getYCoord(Math.abs(runningTotal));
                }

                // Set the Y (ie the start point) value
                if (properties.xaxisPosition == 'center') {
                    y = runningTotal > 0 ? this.getYCoord(0) - h : this.getYCoord(0);
                
                } else if (properties.xaxisPosition == 'top') {
                    y = this.getYCoord(0);
                
                } else {
                    if (runningTotal > 0) {
                        y = this.getYCoord(0) - h;
                    } else {
                        y = this.getYCoord(0);
                    }
                }
            
                // This is the X position of the final bar
                x = x + (properties.marginInner * 2) + w;
            
                
                // Allow for sequential colors
                if (properties.colorsSequential) {
                    this.context.fillStyle = properties.colors[seq]
                } else {
                    // Final color
                    this.context.fillStyle = properties.colors[2];
                }

                this.path(
                    'b r % % % % s % f %',
                    x + properties.barOffsetx, y + properties.barOffsety, w, h,
                    this.context.strokeStyle,this.context.fillStyle
                );

                // This is set so that the next iteration of the loop will be able to
                // access THIS iterations coordinates
                var previousCoords = [x, y, w, Math.abs(h)];

                // Add the coordinates to the coords array (the previousCooords array, at
                // this point, is actually THIS iterations coords 
                this.coords.push(previousCoords);
            }





            // Turn off the shadow
            RGraph.noShadow(this);






            //
            // This draws the connecting lines
            //
            this.context.lineWidth   = 1;
            this.context.strokeStyle = '#666';
            
            this.context.beginPath();

            for (var i=1,len=this.coords.length; i<len; i+=1) {

                var prev     = this.coords[i - 1],
                    curr     = this.coords[i],
                    prevData = this.data[i-1];

                // CANNOT be a part of the var chain above
                if (properties.xaxisPosition === 'top') {
                    var y = (prevData > 0 ? prev[1] + prev[3] : prev[1]);
                } else {
                    var y = (prevData > 0 ? prev[1] : prev[1] + prev[3]);
                }


                this.context.moveTo(
                    prev[0] + prev[2] + properties.barOffsetx,
                    y + properties.barOffsety
                );

                this.context.lineTo(
                    curr[0] + properties.barOffsetx,
                    y + properties.barOffsety
                );

            }
            
            this.context.stroke();
        };








        //
        // Not used by the class during creating the graph, but is used by event handlers
        // to get the coordinates (if any) of the selected bar
        // 
        // @param object e The event object
        //
        this.getShape = function (e)
        {
            //
            // Loop through the bars determining if the mouse is over a bar
            //
            for (var i=0,len=this.coords.length; i<len; i++) {
    
                var mouseXY = RGraph.getMouseXY(e),
                    mouseX  = mouseXY[0],
                    mouseY  = mouseXY[1];
    
                var left   = this.coords[i][0],
                    top    = this.coords[i][1],
                    width  = this.coords[i][2],
                    height = this.coords[i][3];
    
                if (   mouseX >= left
                    && mouseX <= (left + width)
                    && mouseY >= top
                    && mouseY <= top + height) {
                    
                    var tooltip = RGraph.parseTooltipText ? RGraph.parseTooltipText(properties.tooltips, i) : null;
    
                    return {
                         object: this,
                              x: left,
                              y: top,
                          width: width,
                         height: height,
                          index: 0,
                        dataset: i,
                sequentialIndex: i,
                          label: properties.xaxisLabels && typeof properties.xaxisLabels[i] === 'string' ? properties.xaxisLabels[i] : null,
                        tooltip: typeof tooltip === 'string' ? tooltip : null
                    };
                }
            }
            
            return null;
        };








        //
        // The Waterfall is slightly different to Bar/Line charts so has this function to get the max value
        //
        this.getMax = function (data)
        {
            var runningTotal = 0, max = 0;
    
            for (var i=0,len=data.length; i<len; i+=1) {
                runningTotal += data[i];
                
                max = Math.max(Math.abs(runningTotal), max);
            }

            return Math.abs(max);
        };








        //
        // This function facilitates the installation of tooltip event
        // listeners if tooltips are defined.
        //
        this.allowTooltips = function ()
        {
            // Preload any tooltip images that are used in the tooltips
            RGraph.preLoadTooltipImages(this);
    
    
            //
            // This installs the window mousedown event listener that lears any
            // highlight that may be visible.
            //
            RGraph.installWindowMousedownTooltipListener(this);
    
    
            //
            // This installs the canvas mousemove event listener. This function
            // controls the pointer shape.
            //
            RGraph.installCanvasMousemoveTooltipListener(this);
    
    
            //
            // This installs the canvas mouseup event listener. This is the
            // function that actually shows the appropriate tooltip (if any).
            //
            RGraph.installCanvasMouseupTooltipListener(this);
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
            
            // Highlight all of the rects except this one - essentially an inverted highlight
            } else if (typeof properties.highlightStyle === 'string' && properties.highlightStyle === 'invert') {
                for (var i=0; i<this.coords.length; ++i) {
                    if (i !== shape.sequentialIndex) {
                        this.path(
                            'b r % % % % s % f %',
                            this.coords[i][0],this.coords[i][1],this.coords[i][2],this.coords[i][3],
                            properties.highlightStroke,
                            properties.highlightFill
                        );
                    }
                }
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
    
            if (
                   mouseXY[0] > this.marginLeft
                && mouseXY[0] < (this.canvas.width - this.marginRight)
                && mouseXY[1] > this.marginTop
                && mouseXY[1] < (this.canvas.height - this.marginBottom)
                ) {

                return this;
            }
        };








        //
        // This method returns the appropriate Y coord for the given value
        // 
        // @param number value The value
        //
        this.getYCoord = function (value)
        {
            // X axis position in the center
            if (properties.xaxisPosition == 'center') {

                if (value < (-1 * this.max)) {
                    return null;
                }
            
                var coord = (value / this.max) * (this.grapharea / 2);    
                return this.marginTop + (this.grapharea / 2) - coord;




            // X axis position at the top
            } else if (properties.xaxisPosition == 'top') {

                if (value < 0) return null;
            
                var coord = (value / this.max) * this.grapharea;    
                return this.marginTop + coord;





            } else {

                var coord = ( (value - this.scale2.min) / (this.max - this.scale2.min) ) * this.grapharea;
                    coord = coord + this.marginBottom;

                return this.canvas.height - coord;
            }
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors.colors                = RGraph.arrayClone(properties.colors);
                this.original_colors.keyColors             = RGraph.arrayClone(properties.keyColors);
                this.original_colors.crosshairsColor       = RGraph.arrayClone(properties.crosshairsColor);
                this.original_colors.highlightStroke       = RGraph.arrayClone(properties.highlightStroke);
                this.original_colors.highlightFill         = RGraph.arrayClone(properties.highlightFill);
                this.original_colors.backgroundBarsColor1  = RGraph.arrayClone(properties.backgroundBarsColor1);
                this.original_colors.backgroundBarsColor2  = RGraph.arrayClone(properties.backgroundBarsColor2);
                this.original_colors.backgroundGridColor   = RGraph.arrayClone(properties.backgroundGridColor);
                this.original_colors.colorsStroke          = RGraph.arrayClone(properties.colorsStroke);
                this.original_colors.xaxisColor            = RGraph.arrayClone(properties.xaxisColor);
                this.original_colors.yaxisColor            = RGraph.arrayClone(properties.yaxisColor);
            }


            // Colors
            var colors = properties.colors;

            if (colors) {
                for (var i=0,len=colors.length; i<len; ++i) {
                    colors[i] = this.parseSingleColorForGradient(colors[i]);
                }
            }
    
            // keyColors
            var colors = properties.keyColors;

            if (colors) {
                for (var i=0,len=colors.length; i<len; ++i) {
                    colors[i] = this.parseSingleColorForGradient(colors[i]);
                }
            }
    
             properties.crosshairsColor        = this.parseSingleColorForGradient(properties.crosshairsColor);
             properties.highlightStroke        = this.parseSingleColorForGradient(properties.highlightStroke);
             properties.highlightFill          = this.parseSingleColorForGradient(properties.highlightFill);
             properties.backgroundBarsColor1  = this.parseSingleColorForGradient(properties.backgroundBarsColor1);
             properties.backgroundBarsColor2  = this.parseSingleColorForGradient(properties.backgroundBarsColor2);
             properties.backgroundGridColor   = this.parseSingleColorForGradient(properties.backgroundGridColor);
             properties.colorsStroke          = this.parseSingleColorForGradient(properties.colorsStroke);
             properties.xaxisColor            = this.parseSingleColorForGradient(properties.xaxisColor);
             properties.yaxisColor            = this.parseSingleColorForGradient(properties.yaxisColor);
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
        // @param string color The color to parse for gradients
        //
        this.parseSingleColorForGradient = function (color)
        {
            if (!color || typeof color != 'string') {
                return color;
            }

            if (typeof color === 'string' && color.match(/^gradient\((.*)\)$/i)) {

                // Allow for JSON gradients
                if (color.match(/^gradient\(({.*})\)$/i)) {
                    return RGraph.parseJSONGradient({object: this, def: RegExp.$1});
                }

                var parts = RegExp.$1.split(':');
    
                // Create the gradient

                var grad = this.context.createLinearGradient(0,this.canvas.height - properties.marginBottom, 0, properties.marginTop);
    
                var diff = 1 / (parts.length - 1);
    
                grad.addColorStop(0, RGraph.trim(parts[0]));
    
                for (var j=1,len=parts.length; j<len; ++j) {
                    grad.addColorStop(j * diff, RGraph.trim(parts[j]));
                }
            }
                
            return grad ? grad : color;
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
        // This function runs once only
        // (put at the end of the file (before any effects))
        //
        this.firstDrawFunc = function ()
        {
        };








        //
        // Waterfall Grow
        // 
        // @param object Options. You can pass frames here - which should be a number
        // @param function An optional function which is called when the animation is finished
        //
        this.grow = function ()
        {
            var opt      = arguments[0] || {};
            var callback = arguments[1] || function () {};
            var frames   = opt.frames || 30;
            var numFrame = 0;
            var obj      = this;
            var data     = RGraph.arrayClone(obj.data);
            
            //Reset The data to zeros
            for (var i=0,len=obj.data.length; i<len; ++i) {
                obj.data[i] /= frames;
            }
            
            //
            // Fix the scale
            //
            if (obj.get('yaxisScaleMax') == null) {
                var max   = obj.getMax(data);
                var scale2 = RGraph.getScale({object: obj, options: {'scale.max': max}});
                obj.set('yaxisScaleMax', scale2.max);
            }
    
            function iterator ()
            {
                for (var i=0; i<obj.data.length; ++i) {
                    
                    // This produces a very slight easing effect
                    obj.data[i] = data[i] * RGraph.Effects.getEasingMultiplier(frames, numFrame);
                }
                
                RGraph.clear(obj.canvas);
                RGraph.redrawCanvas(obj.canvas);
    
                if (++numFrame <= frames) {
                    RGraph.Effects.updateCanvas(iterator);
                } else {
                    callback(obj);
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
            var value = this.data[opt.index];

            if (opt.index === this.data.length && properties.total) {
                value = this.total;
            }


            return {
                  index: opt.index,
                dataset: 0,
        sequentialIndex: opt.index,
                  value: value,
                 values: [value]
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
            // Determine the correct color array to use
            var colors = properties.colors;

            if (properties.tooltipsFormattedKeyColors) {
                colors = properties.tooltipsFormattedKeyColors;
            }

            var color = colors[0];
            
            // Change the color for negative bars
            if (specific.value < 0) {
                color = colors[1]; 
            }

            // Change the color for the last bar
            if (specific.index == this.data.length) {
                color = colors[2];
            }
                
            // Figure out the correct label
            if (typeof properties.tooltipsFormattedKeyLabels === 'object' && typeof properties.tooltipsFormattedKeyLabels[specific.index] === 'string') {
                var label = properties.tooltipsFormattedKeyLabels[specific.index];
            } else if (properties.xaxisLabels && typeof properties.xaxisLabels === 'object' && typeof properties.xaxisLabels[specific.index] === 'string') {
                var label = properties.xaxisLabels[specific.index];
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
                - 10                             // An arbitrary amount
                + obj.properties.tooltipsOffsety // Add any user defined offset
            ) + 'px';
            
            // If the top of the tooltip is off the top of the page
            // then move the tooltip down
            if(parseFloat(args.tooltip.style.top) < 0) {
                args.tooltip.style.top = parseFloat(args.tooltip.style.top) + (coords[3] / 2) + 5 + 'px';
            }
        };








        //
        // Now, because canvases can support multiple charts, canvases must always be registered
        //
        RGraph.register(this);








        //
        // This is the 'end' of the constructor so if the first argument
        // contains configuration data - handle that.
        //
        RGraph.parseObjectStyleConfig(this,conf.options);








        return this;
    };