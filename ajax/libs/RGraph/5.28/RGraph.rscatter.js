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
    // The chart constuctor
    //
    RGraph.RScatter = function (conf)
    {
       // Store the data set(s)
        this.data = RGraph.arrayClone(conf.data);


        // Account for just one dataset being given
        if (typeof conf.data === 'object' && typeof conf.data[0] === 'object' && (typeof conf.data[0][0] === 'number' || typeof conf.data[0][0] === 'string') ) {
            
            var tmp = RGraph.arrayClone(conf.data);
            
            conf.data    = new Array();
            conf.data[0] = RGraph.arrayClone(tmp);

            this.data = RGraph.arrayClone(conf.data);
        }






        this.id                = conf.id
        this.canvas            = document.getElementById(this.id)
        this.context           = this.canvas.getContext ? this.canvas.getContext("2d") : null;
        this.canvas.__object__ = this;
        this.type              = 'rscatter';
        this.hasTooltips       = false;
        this.isRGraph          = true;
        this.isrgraph          = true;
        this.rgraph            = true;
        this.uid               = RGraph.createUID();
        this.canvas.uid        = this.canvas.uid ? this.canvas.uid : RGraph.createUID();
        this.colorsParsed      = false;
        this.coordsText        = [];
        this.original_colors   = [];
        this.firstDraw         = true; // After the first draw this will be false






        this.centerx = 0;
        this.centery = 0;
        this.radius  = 0;
        this.max     = 0;

        // Convert all of the data pieces to numbers as necessary
        for (var i=0; i<this.data.length; ++i) { // For each dataset
            for (var j=0; j<this.data[i].length; ++j) { // Gor each datapiece
                if (typeof this.data[i][j][0] === 'string') { // Check the first value (the X value)
                    this.data[i][j][0] = parseFloat(this.data[i][j][0]);
                }

                if (typeof this.data[i][j][1] === 'string') { // Check the second value (the Y value)
                    this.data[i][j][1] = parseFloat(this.data[i][j][1]);
                }
            }
        }











        this.properties =
        {
            backgroundColor:                        'transparent',
            backgroundGrid:                         true,
            backgroundGridRadials:                  true,
            backgroundGridRadialsCount:             null,
            backgroundGridCircles:                  true,
            backgroundGridCirclesCount:             null,
            backgroundGridLinewidth:                1,
            backgroundGridColor:                    '#ccc',

            centerx:                                null,
            centery:                                null,
            radius:                                 null,

            colors:                                 [], // This is used internally for the key
            colorsDefault:                          'black',

            marginLeft:                             35,
            marginRight:                            35,
            marginTop:                              35,
            marginBottom:                           35,

            title:                                  '',
            titleBackground:                        null,
            titleHpos:                              null,
            titleVpos:                              null,
            titleBold:                              null,
            titleFont:                              null,
            titleSize:                              null,
            titleItalic:                            null,
            titleColor:                             null,
            titleX:                                 null,
            titleY:                                 null,
            titleHalign:                            null,
            titleValign:                            null,
            titleOffsetx:                           0,
            titleOffsety:                           0,

            labels:                                 null,
            labelsOffsetRadius:                     0,
            labelsColor:                            null,
            labelsFont:                             null,
            labelsSize:                             null,
            labelsItalic:                           null,
            labelsBold:                             null,
            labelsAxes:                             'n',
            labelsAxesBackground:                   'rgba(255,255,255,0.7)',
            labelsAxesCount:                        5,
            labelsAxesFont:                         null,
            labelsAxesSize:                         null,
            labelsAxesColor:                        null,
            labelsAxesBold:                         null,
            labelsAxesItalic:                       null,
            labelsAxesOffsetx:                      0,
            labelsAxesOffsety:                      0,

            textColor:                              'black',
            textFont:                               'Arial, Verdana, sans-serif',
            textSize:                               12,
            textBold:                               false,
            textItalic:                             false,
            textAccessible:                         true,
            textAccessibleOverflow:                 'visible',
            textAccessiblePointerevents:            false,

            key:                                    null,
            keyBackground:                          'white',
            keyPosition:                            'graph',
            keyHalign:                              'right',
            keyShadow:                              false,
            keyShadowColor:                         '#666',
            keyShadowBlur:                          3,
            keyShadowOffsetx:                       2,
            keyShadowOffsety:                       2,
            keyPositionGutterBoxed:                 false,
            keyPositionX:                           null,
            keyPositionY:                           null,
            keyColorShape:                          'square',
            keyRounded:                             true,
            keyLinewidth:                           1,
            keyColors:                              null,
            keyInteractive:                         false,
            keyInteractiveHighlightChartFill:       'rgba(255,0,0,0.9)',
            keyInteractiveHighlightLabel:           'rgba(255,0,0,0.2)',
            keyLabelsColor:                         null,
            keyLabelsFont:                          null,
            keyLabelsSize:                          null,
            keyLabelsBold:                          null,
            keyLabelsItalic:                        null,
            keyLabelsOffsetx:                       0,
            keyLabelsOffsety:                       0,

            contextmenu:                            null,

            tooltips:                               null,
            tooltipsEvent:                          'onmousemove',
            tooltipsEffect:                         'fade',
            tooltipsCssClass:                       'RGraph_tooltip',
            tooltipsCss:                            null,
            tooltipsHighlight:                      true,
            tooltipsHotspot:                        3,
            tooltipsCoordsPage:                     false,
            tooltipsFormattedThousand:              ',',
            tooltipsFormattedPoint:                 '.',
            tooltipsFormattedDecimals:              0,
            tooltipsFormattedUnitsPre:              '',
            tooltipsFormattedUnitsPost:             '',
            tooltipsFormattedKeyColors:             null,
            tooltipsFormattedKeyColorsShape: 'square',
            tooltipsFormattedKeyLabels:             [],
            tooltipsFormattedListType:  'ul',
            tooltipsFormattedListItems: null,
            tooltipsFormattedTableHeaders: null,
            tooltipsFormattedTableData: null,
            tooltipsPointer:            true,
            tooltipsPositionStatic:     true,

            annotatable:                            false,
            annotatableColor:                       'black',
            annotatableLinewidth:                   1,

            resizable:                              false,
            resizableHandleBackground:              null,

            scaleMax:                               null,
            scaleMin:                               0, // TODO Not fully implemented
            scaleDecimals:                          null,
            scalePoint:                             '.',
            scaleThousand:                          ',',
            scaleRound:                             false,
            scaleZerostart:                         true,
            scaleUnitsPre:                          '',
            scaleUnitsPost:                         '',

            tickmarks:                              'cross',
            tickmarksSize:                          3,

            axesColor:                              'transparent',

            highlightStroke:                        'transparent',
            highlightFill:                          'rgba(255,255,255,0.7)',
            highlightPointRadius:                   3,

            segmentHighlight:                       false,
            segmentHighlightCount:                  null,
            segmentHighlightFill:                   'rgba(0,255,0,0.5)',
            segmentHighlightStroke:                 'rgba(0,0,0,0)',

            line:                                   false,
            lineClose:                              false,
            lineLinewidth:                          1,
            lineColors:                             ['black'],
            lineShadow:                             false,
            lineShadowColor:                        'black',
            lineShadowBlur:                         2,
            lineShadowOffsetx:                      3,
            lineShadowOffsety:                      3,

            clearto:                                'rgba(0,0,0,0)'
        }
        



        //
        // Create the $ objects so that functions can be added to them
        //
        for (var i=0,idx=0; i<this.data.length; ++i) {
            for (var j=0,len=this.data[i].length; j<len; j+=1,idx+=1) {
                this['$' + idx] = {}
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
        // @param string name The name of the property to get
        //
        this.get = function (name)
        {
            return properties[name];
        };








        //
        // This method draws the rose chart
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
            // Make the margins easy ro access
            //            
            this.marginLeft   = properties.marginLeft;
            this.marginRight  = properties.marginRight;
            this.marginTop    = properties.marginTop;
            this.marginBottom = properties.marginBottom;
    
            // Calculate the radius
            this.radius  = (Math.min(this.canvas.width - this.marginLeft - this.marginRight, this.canvas.height - this.marginTop - this.marginBottom) / 2);
            this.centerx = ((this.canvas.width - this.marginLeft - this.marginRight) / 2) + this.marginLeft;
            this.centery = ((this.canvas.height - this.marginTop - this.marginBottom) / 2) + this.marginTop;
            this.coords  = [];
            this.coords2 = [];



            //
            // Stop this growing uncontrollably
            //
            this.coordsText = [];




            //
            // If there's a user specified radius/centerx/centery, use them
            //
            if (typeof properties.centerx == 'number') this.centerx = properties.centerx;
            if (typeof properties.centery == 'number') this.centery = properties.centery;
            if (typeof properties.radius  == 'number') this.radius  = properties.radius;
    
    
    
            //
            // Parse the colors for gradients. Its down here so that the center X/Y can be used
            //
            if (!this.colorsParsed) {
    
                this.parseColors();
    
                // Don't want to do this again
                this.colorsParsed = true;
            }
    
    
            //
            // Work out the scale
            //
            var max = properties.scaleMax;
            var min = properties.scaleMin;
            
            if (typeof max == 'number') {
                this.max    = max;
                this.scale2 = RGraph.getScale({object: this, options: {
                    'scale.max':          max,
                    'scale.min':          min,
                    'scale.strict':       true,
                    'scale.decimals':     Number(properties.scaleDecimals),
                    'scale.point':        properties.scalePoint,
                    'scale.thousand':     properties.scaleThousand,
                    'scale.round':        properties.scaleRound,
                    'scale.units.pre':    properties.scaleUnitsPre,
                    'scale.units.post':   properties.scaleUnitsPost,
                    'scale.labels.count': properties.labelsAxesCount
                }});
            } else {
    
                for (var i=0; i<this.data.length; i+=1) {
                    for (var j=0,len=this.data[i].length; j<len; j+=1) {
                        this.max = Math.max(this.max, this.data[i][j][1]);
                    }
                }

                this.min = 0;
    
                this.scale2 = RGraph.getScale({object: this, options: {
                    'scale.max':          this.max,
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
            }
    
            //
            // Change the centerx marginally if the key is defined
            //
            if (properties.key && properties.key.length > 0 && properties.key.length >= 3) {
                this.centerx = this.centerx - properties.marginRight + 5;
            }

            //
            // Populate the colors array for the purposes of generating the key
            //
            if (typeof properties.key === 'object' && RGraph.isArray(properties.key) && properties.key[0]) {

                // Reset the colors array
                properties.colors = [];

                for (var i=0; i<this.data.length; i+=1) {
                    for (var j=0,len=this.data[i].length; j<len; j+=1) {
                        if (typeof this.data[i][j][2] == 'string') {
                            properties.colors.push(this.data[i][j][2]);
                        }
                    }
                }
            }

    
    
    
            //
            // Populate the tooltips array
            //
            this.set('tooltips', []);

            for (var i=0; i<this.data.length; i+=1) {
                for (var j=0,len=this.data[i].length; j<len; j+=1) {
                    properties.tooltips.push(this.data[i][j][3]);
                }
            }
    
    
    
            // This resets the chart drawing state
            this.context.beginPath();
    
            this.drawBackground();
            this.drawRscatter();
            this.drawLabels();
            
    
            //
            // Draw the key
            //
            var key = properties.key;

            if (key && key.length) {
                RGraph.drawKey(this, properties.key, properties.colors);
            }
    
    
    
    
            //
            // Setup the context menu if required
            //
            if (properties.contextmenu) {
                RGraph.showContext(this);
            }
    
    
    
            // Draw the title if any has been set
            if (properties.title) {
                RGraph.drawTitle(
                    this,
                    properties.title,
                    this.centery - this.radius - 10,
                    this.centerx,
                    properties.titleSize ? properties.titleSize : properties.textSize + 2
                );
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
            // Allow the segments to be highlighted
            //
            if (properties.segmentHighlight) {
                RGraph.allowSegmentHighlight({
                    object: this,

                    // This is duplicated in the drawBackground function
                    count:  typeof properties.segmentHighlightCount === 'number' ? properties.segmentHighlightCount : ((properties.backgroundGridDiagonalsCount ? properties.backgroundGridDiagonalsCount : (properties.labels ? properties.labels.length : 8))),

                    fill:   properties.segmentHighlightFill,
                    stroke: properties.segmentHighlightStroke
                });
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
        // This method draws the rscatter charts background
        //
        this.drawBackground = function ()
        {
            // Draw the background color first
            if (properties.backgroundColor != 'transparent') {
                this.path(
                    'b a % % % % % false f %',
                    this.centerx, this.centery, this.radius, 0, 2 * Math.PI,
                    properties.backgroundColor
                );
            }


            var gridEnabled  = properties.backgroundGrid;


            if (gridEnabled) {
                
                this.context.lineWidth = properties.backgroundGridLinewidth;
        
        
                // Draw the background grey circles
                if (properties.backgroundGridCircles) {

                    this.context.strokeStyle = properties.backgroundGridColor;
                    this.context.beginPath();
                    
                    if (RGraph.isNull(properties.backgroundGridCirclesCount)) {
                        properties.backgroundGridCirclesCount = properties.labelsAxesCount;
                    }

                    // Radius must be greater than 0 for Opera to work
                    
                    var r = this.radius / properties.backgroundGridCirclesCount;

                    for (var i=0,len=this.radius; i<=len; i+=r) {
                
                        // Radius must be greater than 0 for Opera to work
                        this.context.moveTo(this.centerx + i, this.centery);
                        this.context.arc(
                            this.centerx,
                            this.centery,
                            i,
                            0,
                            RGraph.TWOPI,
                            0
                        );
                    }
                    this.context.stroke();
                }
        
        
        
        
        
        
        
                // Draw the background lines that go from the center outwards
                if (properties.backgroundGridRadials) {

                    this.context.strokeStyle = properties.backgroundGridColor;
                
                    this.context.beginPath();
                    
                    // This is duplicated in the allowSegmentHighlight call
                    if (typeof properties.backgroundGridRadialsCount === 'number') {
                        var inc = 360 / properties.backgroundGridRadialsCount;
                    } else if (properties.labels && properties.labels.length) {
                        var inc = 360 / properties.labels.length;
                    } else {
                        var inc = 45; //360 / 8
                    }


                    for (var i=0; i<360; i+=inc) {
                    
                        // Radius must be greater than 0 for Opera to work
                        this.context.arc(
                            this.centerx,
                            this.centery,
                            this.radius,
                            (i / (180 / RGraph.PI)) - RGraph.HALFPI,
                            ((i + 0.01) / (180 / RGraph.PI)) - RGraph.HALFPI,
                            0
                        );
                    
                        this.context.lineTo(this.centerx, this.centery);
                    }
                    this.context.stroke();
                }
            }
            
            // Reset the linewidth
            this.context.lineWidth = 1;
    
    
    
    
    
    
    
    
    
    
    
    
    
            this.context.beginPath();
            this.context.strokeStyle = properties.axesColor;
        
            // Draw the X axis
            this.context.moveTo(this.centerx - this.radius, Math.round(this.centery));
            this.context.lineTo(this.centerx + this.radius, Math.round(this.centery));
        
            // Draw the X ends
            this.context.moveTo(Math.round(this.centerx - this.radius), this.centery - 5);
            this.context.lineTo(Math.round(this.centerx - this.radius), this.centery + 5);
            this.context.moveTo(Math.round(this.centerx + this.radius), this.centery - 5);
            this.context.lineTo(Math.round(this.centerx + this.radius), this.centery + 5);
            
            
            var numticks = properties.labelsAxesCount;
            
            if (numticks) {
                // Draw the X check marks
                for (var i=(this.centerx - this.radius); i<(this.centerx + this.radius); i+=(this.radius / numticks)) {
                    this.context.moveTo(Math.round(i),  this.centery - 3);
                    this.context.lineTo(Math.round(i),  this.centery + 3);
                }
                
                // Draw the Y check marks
                for (var i=(this.centery - this.radius); i<(this.centery + this.radius); i+=(this.radius / numticks)) {
                    this.context.moveTo(this.centerx - 3, Math.round(i));
                    this.context.lineTo(this.centerx + 3, Math.round(i));
                }
            }
        
            // Draw the Y axis
            this.context.moveTo(Math.round(this.centerx), this.centery - this.radius);
            this.context.lineTo(Math.round(this.centerx), this.centery + this.radius);
        
            // Draw the Y ends
            if (properties.axesCaps) {
                this.context.moveTo(this.centerx - 5, Math.round(this.centery - this.radius));
                this.context.lineTo(this.centerx + 5, Math.round(this.centery - this.radius));

                this.context.moveTo(this.centerx - 5, Math.round(this.centery + this.radius));
                this.context.lineTo(this.centerx + 5, Math.round(this.centery + this.radius));
            }
            
            // Stroke it
            this.context.closePath();
            this.context.stroke();
        };








        //
        // This method draws a set of data on the graph
        //
        this.drawRscatter = function ()
        {
            for (var dataset=0; dataset<this.data.length; dataset+=1) {

                var data = this.data[dataset];

                // Don't do this
                // this.coords = [];

                this.coords2[dataset] = [];

                var drawPoints = function (obj)
                {
                    for (var i=0; i<data.length; ++i) {

                        var d1      = data[i][0],
                            d2      = data[i][1],
                            a       = d1 / (180 / RGraph.PI), // RADIANS
                            r       = ( (d2 - properties.scaleMin) / (obj.scale2.max - obj.scale2.min) ) * obj.radius,
                            x       = Math.sin(a) * r,
                            y       = Math.cos(a) * r,
                            color   = data[i][2] ? data[i][2] : properties.colorsDefault,
                            tooltip = data[i][3] ? data[i][3] : null
            
                        if (tooltip && String(tooltip).length) {
                            obj.hasTooltips = true;
                        }
            
                        //
                        // Account for the correct quadrant
                        //
                        x = x + obj.centerx;
                        y = obj.centery - y;
            
            
                        obj.drawTick(x, y, color);
                        
                        // Populate the coords array with the coordinates and the tooltip

                        obj.coords.push([x, y, color, tooltip]);
                        obj.coords2[dataset].push([x, y, color, tooltip]);
                    }
                }

                drawPoints(this);

                if (properties.line) {
                    this.drawLine(dataset);
                }
            }
        };








        //
        // Draws a connecting line through the points if requested
        // 
        // @param object opt The options to the line
        //
        this.drawLine = function (idx)
        {
            var opt = {
                dataset:        idx,
                coords:        this.coords2[idx],
                color:         properties.lineColors[idx],
                shadow:        properties.lineShadow,
                shadowColor:   properties.lineShadowColor,
                shadowOffsetX: properties.lineShadowOffsetx,
                shadowOffsetY: properties.lineShadowOffsety,
                shadowBlur:    properties.lineShadowBlur,
                linewidth:     properties.lineLinewidth
            };

            this.context.beginPath();

            this.context.strokeStyle = this.parseSingleColorForGradient(opt.color);
              this.context.lineWidth = typeof properties.lineLinewidth === 'object' ? properties.lineLinewidth[idx] : properties.lineLinewidth;
                this.context.lineCap = 'round';

            if (opt.shadow) {
                RGraph.setShadow(
                    this,
                    opt.shadowColor,
                    opt.shadowOffsetX,
                    opt.shadowOffsetY,
                    opt.shadowBlur
                );
            }

            for (var i=0; i<this.coords2[idx].length; ++i) {
                if (i === 0) {
                    this.context.moveTo(this.coords2[idx][i][0], this.coords2[idx][i][1]);
                    
                    var startCoords = RGraph.arrayClone(this.coords2[idx]);

                } else {
                    this.context.lineTo(this.coords2[idx][i][0], this.coords2[idx][i][1]);
                }
            }
            
            // Draw the line back to the start?
            if (
                   (typeof properties.lineClose === 'boolean' && properties.lineClose)
                || (typeof properties.lineClose === 'object' && properties.lineClose[idx])
                ) {
                this.context.lineTo(this.coords2[idx][0][0], this.coords2[idx][0][1]);
            }
            
            this.context.stroke();
            
            RGraph.noShadow(this);
        };








        //
        // Unsuprisingly, draws the labels
        //
        this.drawLabels = function ()
        {
            this.context.lineWidth = 1;
            
            // Default the color to black
            this.context.fillStyle = 'black';
            this.context.strokeStyle = 'black';
            
            var key        = properties.key;
            var r          = this.radius;
            var axesColor  = properties.axesColor;
            var italic     = properties.textItalic;
            var bold       = properties.textBold;
            var color      = properties.textColor;
            var font       = properties.textFont;
            var size       = properties.textSize;
            var axes       = properties.labelsAxes.toLowerCase();
            var units_pre  = properties.scaleUnitsPre;
            var units_post = properties.scaleUnitsPost;
            var decimals   = properties.scaleDecimals;
            var centerx    = this.centerx;
            var centery    = this.centery;
            
            this.context.fillStyle = properties.textColor;
    
            // Draw any labels
            if (typeof properties.labels == 'object' && properties.labels) {
                this.drawCircularLabels(this.context, properties.labels, font , size, r);
            }
    

            //
            // If the axes are transparent - then the labels should have no offset,
            // otherwise it defaults to true. Similarly the labels can or can't be
            // centered if there's no axes
            //
            var offset   = 10;
            var centered = false;

            if (   axesColor === 'rgba(0,0,0,0)'
                || axesColor === 'rgb(0,0,0)'
                || axesColor === 'transparent') {
                
                offset = 0;
                centered = true;
            }


                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'labelsAxes'
                });

    
            // Draw the axis labels
            for (var i=0,len=this.scale2.labels.length; i<len; ++i) {
                if (axes.indexOf('n') > -1) RGraph.text({object: this,tag: 'scale',font: textConf.font,size: textConf.size,color: textConf.color,bold: textConf.bold,italic: textConf.italic,x:centerx - offset + properties.labelsAxesOffsetx,y:centery - (r * ((i+1) / len)) + properties.labelsAxesOffsety,text:this.scale2.labels[i],valign:'center',halign:centered ? 'center' : 'right',bounding: true, boundingFill: properties.labelsAxesBackground, boundingStroke: 'rgba(0,0,0,0)'});
                if (axes.indexOf('s') > -1) RGraph.text({object: this,tag: 'scale',font: textConf.font,size: textConf.size,color: textConf.color,bold: textConf.bold,italic: textConf.italic,x:centerx - offset + properties.labelsAxesOffsetx,y:centery + (r * ((i+1) / len)) + properties.labelsAxesOffsety,text:this.scale2.labels[i],valign:'center',halign:centered ? 'center' : 'right',bounding: true, boundingFill: properties.labelsAxesBackground, boundingStroke: 'rgba(0,0,0,0)'});
                if (axes.indexOf('e') > -1) RGraph.text({object: this,tag: 'scale',font: textConf.font,size: textConf.size,color: textConf.color,bold: textConf.bold,italic: textConf.italic,x:centerx + (r * ((i+1) / len)) + properties.labelsAxesOffsetx,y:centery + offset + properties.labelsAxesOffsety,text:this.scale2.labels[i],valign:centered ? 'center' : 'top',halign:'center',bounding: true, boundingFill: properties.labelsAxesBackground, boundingStroke: 'rgba(0,0,0,0)'});
                if (axes.indexOf('w') > -1) RGraph.text({object: this,tag: 'scale',font: textConf.font,size: textConf.size,color: textConf.color,bold: textConf.bold,italic: textConf.italic,x:centerx - (r * ((i+1) / len)) + properties.labelsAxesOffsetx,y:centery + offset + properties.labelsAxesOffsety,text:this.scale2.labels[i],valign:centered ? 'center' : 'top',halign:'center',bounding: true, boundingFill: properties.labelsAxesBackground, boundingStroke: 'rgba(0,0,0,0)'});
            }
    
            // Draw the center minimum value (but only if there's at least one axes labels stipulated)
            if (properties.labelsAxes.length > 0 && properties.scaleZerostart) {
                RGraph.text({

                    object:         this,

                    font:           textConf.font,
                    size:           textConf.size,
                    color:          textConf.color,
                    bold:           textConf.bold,
                    italic:         textConf.italic,

                    x:              centerx + properties.labelsAxesOffsetx,
                    y:              centery + properties.labelsAxesOffsety,

                    text:           RGraph.numberFormat({
                                        object:    this,
                                        number:    Number(this.scale2.min).toFixed(this.scale2.decimals),
                                        unitspre:  this.scale2.units_pre,
                                        unitspost: this.scale2.units_post
                                    }),
                    valign:         'center',
                    halign:         'center',
                    bounding:       true,
                    boundingFill:   properties.labelsAxesBackground,
                    boundingStroke: 'rgba(0,0,0,0)',
                    tag:            'scale'
                });
            }
        };








        //
        // Draws the circular labels that go around the charts
        // 
        // @param labels array The labels that go around the chart
        //
        this.drawCircularLabels = function (context, labels, font_face, font_size, r)
        {
            var r = r + properties.labelsOffsetRadius + 25,
                color = properties.labelsColor;

            for (var i=0; i<labels.length; ++i) {

                var a = (360 / labels.length) * (i + 1) - (360 / (labels.length * 2));
                var a = a - 90 + (properties.labelsPosition == 'edge' ? ((360 / labels.length) / 2) : 0);
    
                var x = Math.cos(a / (180/RGraph.PI) ) * r;
                var y = Math.sin(a / (180/RGraph.PI)) * r;
    
                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'labels'
                });


                RGraph.text({
                    
                   object:  this,

                     font:  textConf.font,
                     size:  textConf.size,
                    color:  textConf.color,
                     bold:  textConf.bold,
                   italic:  textConf.italic,

                    x:      this.centerx + x,
                    y:      this.centery + y,

                    text:   String(labels[i]),

                    valign: 'center',
                    halign: ((this.centerx + x) > this.centerx) ? 'left' : 'right',
                    tag:    'labels',
                  cssClass: RGraph.getLabelsCSSClassName({
                              object: this,
                                name: 'labelsClass',
                               index: i
                            })
                });
            }
        };








        //
        // Draws a single tickmark
        //
        this.drawTick = function (x, y, color)
        {
            var tickmarks = properties.tickmarks;
            var ticksize  = properties.tickmarksSize;
    
            this.context.strokeStyle = color;
            this.context.fillStyle   = color;
    
            // Set the linewidth for the tickmark to 1
            var prevLinewidth = this.context.lineWidth;
            this.context.lineWidth = 1;
    
            // Cross
            if (tickmarks == 'cross') {
    
                this.context.beginPath();
                this.context.moveTo(x + ticksize, y + ticksize);
                this.context.lineTo(x - ticksize, y - ticksize);
                this.context.stroke();
        
                this.context.beginPath();
                this.context.moveTo(x - ticksize, y + ticksize);
                this.context.lineTo(x + ticksize, y - ticksize);
                this.context.stroke();
            
            // Circle
            } else if (tickmarks == 'circle') {
    
                this.context.beginPath();
                this.context.arc(x, y, ticksize, 0, 6.2830, false);
                this.context.fill();
    
            // Square
            } else if (tickmarks == 'square') {
    
                this.context.beginPath();
                this.context.fillRect(x - ticksize, y - ticksize, 2 * ticksize, 2 * ticksize);
                this.context.fill();
            
            // Diamond shape tickmarks
             } else if (tickmarks == 'diamond') {
    
                this.context.beginPath();
                    this.context.moveTo(x, y - ticksize);
                    this.context.lineTo(x + ticksize, y);
                    this.context.lineTo(x, y + ticksize);
                    this.context.lineTo(x - ticksize, y);
                this.context.closePath();
                this.context.fill();
    
            // Plus style tickmarks
            } else if (tickmarks == 'plus') {
            
                this.context.lineWidth = 1;
    
                this.context.beginPath();
                    this.context.moveTo(x, y - ticksize);
                    this.context.lineTo(x, y + ticksize);
                    this.context.moveTo(x - ticksize, y);
                    this.context.lineTo(x + ticksize, y);
                this.context.stroke();
            }
            
            
            this.context.lineWidth = prevLinewidth;
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
    
            for (var i=0,len=this.coords.length; i<len; ++i) {

                var x       = this.coords[i][0];
                var y       = this.coords[i][1];
                var tooltip = this.coords[i][3];
    
                if (
                    mouseX < (x + offset) &&
                    mouseX > (x - offset) &&
                    mouseY < (y + offset) &&
                    mouseY > (y - offset)
                   ) {

                    if (RGraph.parseTooltipText) {
                        var tooltip = RGraph.parseTooltipText(properties.tooltips, i);
                    }

                    var indexes = RGraph.sequentialIndexToGrouped(i, this.data);

                    return {
                        object: this,
                             x: x,
                             y: y,
                       dataset: indexes[0],
                         index: indexes[1],
               sequentialIndex: i,
                       tooltip: typeof tooltip === 'string' ? tooltip : null
                    };
                }
            }
        };








        //
        // This function facilitates the installation of tooltip event listeners if
        // tooltips are defined.
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





            } else if (properties.highlightStyle === 'invert') {
            
                var radius = 25;

                this.path(
                    'b a % % % -1 6.29 false',
                    this.centerx, this.centery, this.radius
                );

                this.path(
                    'a % % % 0 6.29 true c s rgba(0,0,0,0) f %',
                    shape.x, shape.y, radius,
                    properties.highlightFill
                );
                
                // Draw a border around the circular cutout
                this.path(
                    'b a % % % 0 6.29 false s %',
                    shape.x, shape.y, radius,
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
            var mouseX  = mouseXY[0];
            var mouseY  = mouseXY[1];
            var centerx = this.centerx;
            var centery = this.centery;
            var radius  = this.radius;
    
            if (
                   mouseX > (centerx - radius)
                && mouseX < (centerx + radius)
                && mouseY > (centery - radius)
                && mouseY < (centery + radius)
                ) {
    
                return this;
            }
        };








        //
        // This function returns the radius (ie the distance from the center) for a particular
        // value.
        // 
        // @param number value The value you want the radius for
        //
        this.getRadius = function (value)
        {
            var max = this.max;

            if (value < 0 || value > max) {
                return null;
            }
            
            var r = (value / max) * this.radius;
            
            return r;
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors.data                   = RGraph.arrayClone(this.data);
                this.original_colors.highlightStroke        = RGraph.arrayClone(properties.highlightStroke);
                this.original_colors.highlightFill          = RGraph.arrayClone(properties.highlightFill);
                this.original_colors.colorsDefault          = RGraph.arrayClone(properties.colorsDefault);
                this.original_colors.backgroundGridColor    = RGraph.arrayClone(properties.backgroundGridColor);
                this.original_colors.backgroundColor        = RGraph.arrayClone(properties.backgroundColor);
                this.original_colors.segmentHighlightStroke = RGraph.arrayClone(properties.segmentHighlightStroke);
                this.original_colors.segmentHighlightFill   = RGraph.arrayClone(properties.segmentHighlightFill);
            }






            // Go through the data
            for (var i=0; i<this.data.length; i+=1) {
                for (var j=0,len=this.data[i].length; j<len; j+=1) {
                    this.data[i][j][2] = this.parseSingleColorForGradient(this.data[i][j][2]);
                }
            }
    
            properties.highlightStroke         = this.parseSingleColorForGradient(properties.highlightStroke);
            properties.highlightFill           = this.parseSingleColorForGradient(properties.highlightFill);
            properties.colorsDefault           = this.parseSingleColorForGradient(properties.colorsDefault);
            properties.backgroundGridColor    = this.parseSingleColorForGradient(properties.backgroundGridColor);
            properties.backgroundColor         = this.parseSingleColorForGradient(properties.backgroundColor);
            properties.segmentHighlightStroke = this.parseSingleColorForGradient(properties.segmentHighlightStroke);
            properties.segmentHighlightFill   = this.parseSingleColorForGradient(properties.segmentHighlightFill);
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








        //
        // This function handles highlighting an entire data-series for the interactive
        // key
        // 
        // @param int index The index of the data series to be highlighted
        //
        this.interactiveKeyHighlight = function (index)
        {
            var obj = this;

            if (this.coords2 && this.coords2[index] && this.coords2[index].length) {
                this.coords2[index].forEach(function (value, idx, arr)
                {
                    obj.context.beginPath();
                    obj.context.fillStyle = properties.keyInteractiveHighlightChartFill;
                    obj.context.arc(value[0], value[1], properties.tickmarksSize + 2, 0, RGraph.TWOPI, false);
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
                    this.data[i][j][2] = RGraph.arrayClone(this.original_colors.data[i][j][2]);
                }
            }
        };








        //
        // This function runs once only
        // (put at the end of the file (before any effects))
        //
        this.firstDrawFunc = function ()
        {
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
            var color = this.data[specific.dataset][specific.index][2] ? this.data[specific.dataset][specific.index][2] : properties.colorsDefault;
            
            // The tooltipsFormattedKeyColors property has been specified so use that if
            // there's a relevant color
            if (!RGraph.isNull(properties.tooltipsFormattedKeyColors) && typeof properties.tooltipsFormattedKeyColors === 'object' && typeof properties.tooltipsFormattedKeyColors[specific.dataset] === 'string') {
                color = properties.tooltipsFormattedKeyColors[specific.dataset];
            }
            
            // Figure out the correct label to use if one has indeed been specified
            label = (!RGraph.isNull(properties.tooltipsFormattedKeyLabels) && typeof properties.tooltipsFormattedKeyLabels === 'object' && typeof properties.tooltipsFormattedKeyLabels[specific.dataset] === 'string')
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
                canvasXY = RGraph.getCanvasXY(obj.canvas)
                coords   = this.coords[args.index];

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