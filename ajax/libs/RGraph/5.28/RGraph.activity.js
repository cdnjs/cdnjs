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
    // The Activity meter constructor
    //
    RGraph.Activity = function (conf)
    {
        var id     = conf.id,
            canvas = document.getElementById(id),
            min    = conf.min,
            max    = conf.max,
            value  = conf.value;

        // id, min, max, value
        // Get the canvas and context objects
        this.id                = id;
        this.canvas            = canvas;
        this.context           = this.canvas.getContext ? this.canvas.getContext("2d", {alpha: (typeof id === 'object' && id.alpha === false) ? false : true}) : null;
        this.canvas.__object__ = this;
        this.type              = 'activity';
        this.min               = RGraph.stringsToNumbers(min);
        this.max               = RGraph.stringsToNumbers(max);
        this.value             = RGraph.stringsToNumbers(value);
        this.centerx           = null;
        this.centery           = null;
        this.radius            = null;
        this.isRGraph          = true;
        this.isrgraph          = true;
        this.rgraph            = true;
        this.currentValue      = null;
        this.uid               = RGraph.createUID();
        this.canvas.uid        = this.canvas.uid ? this.canvas.uid : RGraph.createUID();
        this.colorsParsed      = false;
        this.coordsText        = [];
        this.angles            =
        this.coords            = [];
        this.original_colors   = [];
        this.images            = [];
        this.firstDraw         = true; // After the first draw this will be false

        //
        // If the value is zero set it to very
        // slightly more than zero so the meter
        // is drawn correctly.
        //
        // Likewise with the maximum value
        //
        if (typeof this.value === 'number') {
            this.value = [this.value];
        }
        
        for (var i=0; i<this.value.length; ++i) {
            if (this.value[i] <= 0.0000001) {
                this.value[i] = 0.0000001;
            }
        }
        


        // Various config type stuff
        this.properties =
        {
            radius:                             null,
            centerx:                            null,
            centery:                            null,
            width:                              null,
            ends:                               'round',

            marginLeft:                            15,
            marginRight:                           15,
            marginTop:                             15,
            marginBottom:                          15,
            marginInner:                           1,

            backgroundColor:                    'black',
            backgroundGrid:                     false,
            backgroundGridColor:                '#666',
            backgroundGridCircles:              true,
            backgroundGridCirclesCount:         null,
            backgroundGridRadials:              true,
            backgroundGridRadialsCount:         8,
            backgroundRings:                    true,
            backgroundRingsColors:              null,
            backgroundRingsAlpha:               0.5,

            colors:                             ['#F45B5B','#90EE7E','#2B908F','red','green','blue','yellow','pink','cyan','white','gray','black','brown','orange','red','green','blue','yellow','pink','cyan','white','gray','black','brown','orange'],
            
            
            icons:                              [],
            iconsWidth:                         null,
            iconsHeight:                        null,
            iconsOffsetx:                       0,
            iconsOffsety:                       0,
            
            textFont:                              'Arial, Verdana, sans-serif',
            textSize:                              12,
            textColor:                             '#aaa',
            textBold:                              false,
            textItalic:                            false,
            textAccessible:                        true,
            textAccessibleOverflow:                'visible',
            textAccessiblePointerevents:           false,

            labelsCenter:                              false,
            labelsCenterIndex:                         0,
            labelsCenterFont:                          null,
            labelsCenterSize:                          50,
            labelsCenterColor:                         null,
            labelsCenterBold:                          null,
            labelsCenterItalic:                        null,
            labelsCenterUnitsPre:                      '',
            labelsCenterUnitsPost:                     '',
            labelsCenterDecimals:                      0,
            labelsCenterPoint:                         '.',
            labelsCenterThousand:                      ',',
            labelsCenterSpecific:                      '',
            labelsCenterOffsetx:                       0,
            labelsCenterOffsety:                       0,
            labels:                                    [],
            labelsColor:                               null,
            labelsFont:                                null,
            labelsSize:                                null,
            labelsBold:                                null,
            labelsItalic:                              null,
            labelsBackgroundFill:                      'transparent',
            labelsBackgroundStroke:                    'transparent',
            labelsOffsetx:                             0,
            labelsOffsety:                             0,

            contextmenu:                        null,
            annotatable:                        false,
            annotatableColor:                   'black',
            annotatableLinewidth:               1,
            adjustable:                         false,
            tooltips:                           null,
            tooltipsEffect:                     'fade',
            tooltipsCssClass:                   'RGraph_tooltip',
            tooltipsCss:                        null,
            tooltipsEvent:                      'onclick',
            tooltipsHighlight:                  true,
            tooltipsHotspotXonly:               false,
            tooltipsFormattedThousand:          ',',
            tooltipsFormattedPoint:             '.',
            tooltipsFormattedDecimals:          0,
            tooltipsFormattedUnitsPre:          '',
            tooltipsFormattedUnitsPost:         '',
            tooltipsFormattedKeyColors:         null,
            tooltipsFormattedKeyColorsShape:    'square',
            tooltipsFormattedKeyLabels:         [],
            tooltipsFormattedListType:          'ul',
            tooltipsFormattedListItems:         null,
            tooltipsFormattedTableHeaders:      null,
            tooltipsFormattedTableData:         null,
            tooltipsPointer:                    true,
            tooltipsPositionStatic:             true,
            
            effectRoundrobinMultiplier:         1,

            highlightStyle:                     null,
            highlightStroke:                    'rgba(0,0,0,0)',
            highlightFill:                      'rgba(255,255,255,0.5)',

            clearto:                            'rgba(0,0,0,0)'
        }


        // Check for support
        if (!this.canvas) {
            alert('[SDONUT] No canvas support');
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
        // A setter
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
            
            // Ensure that the obj.value property is an array
            if (typeof this.value === 'number') {
                this.value = [this.value];
            }
            



            //
            // Constrain the value to be within the min and max
            //
            for (var i=0; i<this.value.length; ++i) {
                if (this.value[i] > this.max) this.value[i] = this.max;
                if (this.value[i] < this.min) this.value[i] = this.min;
            }
    
            //
            // Set the current value
            //
            this.currentValue = RGraph.arrayClone(this.value);



            //
            // Make the margins easy to access
            //
            this.marginLeft   = properties.marginLeft;
            this.marginRight  = properties.marginRight;
            this.marginTop    = properties.marginTop;
            this.marginBottom = properties.marginBottom;
            
            this.centerx = ((this.canvas.width - this.marginLeft - this.marginRight) / 2) + this.marginLeft;
            this.centery = ((this.canvas.height - this.marginBottom - this.marginTop) / 2) + this.marginTop;
            this.radius  = Math.min(
                (this.canvas.width - this.marginLeft - this.marginRight) / 2,
                (this.canvas.height - this.marginTop - this.marginBottom) / 2
            );
                
            //
            // Stop this growing uncontrollably
            //
            this.coordsText = [];
    
    
    
            //
            // Custom centerx, centery and radius
            //
            if (typeof properties.centerx === 'number') this.centerx = properties.centerx;
            if (typeof properties.centery === 'number') this.centery = properties.centery;
            if (typeof properties.radius  === 'number') this.radius  = properties.radius;

            // The width variable is the width of an individual ring
            this.width = typeof properties.width === 'number' ? properties.width : ((this.radius * 0.75) / this.value.length);
            this.width = this.width - properties.marginInner - properties.marginInner;

            // Allow for +/-xx style width
            if (typeof properties.width === 'string') {
                this.width += Number(properties.width);
            }

    
            //
            // Parse the colors for gradients. Its down here so that the center X/Y can be used
            //
            if (!this.colorsParsed) {
    
                this.parseColors();
    
                // Don't want to do this again
                this.colorsParsed = true;
            }
    

            //
            // Draw the meter and its label
            //
            this.drawBackground();
            this.drawMeter();
            this.drawLabels();
            this.drawIcons();
            this.drawEnds();

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
        // Draw the background"grid"
        //
        this.drawBackground = function ()
        {
            // First thing to do is clear the canvas to the backgroundColor
            if (properties.backgroundColor) {
                this.path(
                    'fs % fr -5 -5 % %',
                    properties.backgroundColor,
                    this.canvas.width + 10,
                    this.canvas.height + 10
                );
            }




            // Draw the grid?
            if (properties.backgroundGrid) {

                // Draw the background grey circles
                if (properties.backgroundGridCircles) {

                    // How many background circles?
                    if (typeof properties.backgroundGridCirclesCount === 'number') {
                        var count = properties.backgroundGridCirclesCount;
                    } else {
                        var count = this.value.length + 1;
                    }

                    for (var i=0; i<count; i++) {
                    
                        var radius = this.radius - (i * (this.width + (2 * properties.marginInner)));

                        this.path(
                            'b a % % % 0 6.29 false s %',
                            this.centerx, this.centery, radius,
                            properties.backgroundGridColor
                        );
                    }
        
        
        
        


                    //
                    // Draw the background lines that go from the center outwards
                    //
                    if (properties.backgroundGridRadials) {
    
                        var angle = (RGraph.TWOPI / properties.backgroundGridRadialsCount);
    
                        for (var i=0; i<=properties.backgroundGridRadialsCount; ++i) {
                        
                            // Radius must be greater than 0 for Opera to work
                            this.path(
                                'b    a % % % % % %     a % % % % % %    s %',
                                this.centerx, this.centery, radius, (i * angle) - RGraph.HALFPI, (i * angle) - RGraph.HALFPI, false,
                                this.centerx, this.centery, this.radius, (i * angle) - RGraph.HALFPI, (i * angle) - RGraph.HALFPI, false,
                                properties.backgroundGridColor
                            );
                        }
                    }
                }
            }
        };








        //
        // Draws the meter
        //
        this.drawMeter = function ()
        {
            var color;            
            
            
            // This is the maximum radius of the outer ring
            var r = (this.radius - properties.marginInner);


            // Draw the background rings if enabled
            if (properties.backgroundRings) {
                //
                // Loop through the values and draw the background rings
                //
                this.context.globalAlpha = properties.backgroundRingsAlpha;
                
                for (var i=0; i<this.value.length; ++i) {
                
                    // Determine the color
                    if (RGraph.isArray(properties.backgroundRingsColors) && typeof properties.backgroundRingsColors[i] === 'string') {
                        color = properties.backgroundRingsColors[i];
                    } else {
                        color = properties.colors[i];
                    }

                    
                    this.path(
                        'b       a % % % % % false          a % % % % % true       f %',
                        
                        this.centerx,
                        this.centery,
                        r - (i * (properties.marginInner + properties.marginInner + this.width)),
                        0 - RGraph.HALFPI,
                        RGraph.TWOPI - RGraph.HALFPI,
                        
                        this.centerx,
                        this.centery,
                        r - this.width - (i * (properties.marginInner + properties.marginInner + this.width)),
                        RGraph.TWOPI - RGraph.HALFPI,
                        0 - RGraph.HALFPI,
                        
                        color
                    );
                }
                
                // Reset the alpha value
                this.context.globalAlpha = 1;
            }








            //
            // Now loop through the values and draw each circle
            //
            for (var i=0; i<this.value.length; ++i) {

                var radians = ((this.value[i] - this.min) / (this.max - this.min)) * RGraph.TWOPI;

                this.path(
                    'b       a % % % % % false          a % % % % % true       f %',
                    
                    this.centerx,
                    this.centery,
                    r - (i * (properties.marginInner + properties.marginInner + this.width)),
                    0 - RGraph.HALFPI,
                    radians - RGraph.HALFPI,
                    
                    this.centerx,
                    this.centery,
                    r - this.width - (i * (properties.marginInner + properties.marginInner + this.width)),
                    radians - RGraph.HALFPI,
                    0 - RGraph.HALFPI,
                    
                    properties.colors[i]
                );




                // Store the coordinates of the ring
                this.angles[i] =
                this.coords[i] = {
                    x:           this.centerx,
                    y:           this.centery,
                    angleStart:  0 - RGraph.HALFPI,
                    angleEnd:    radians - RGraph.HALFPI,
                    radiusInner: r - this.width - (i * (properties.marginInner + properties.marginInner + this.width)),
                    radiusOuter: r - (i * (properties.marginInner + properties.marginInner + this.width)),
                    color:      properties.colors[i],
                };
            }








            //
            // By calling the RGraph.text() function with a blank string the text accessible wrapper DIV
            // will be created and the responsive function will work as expected (ie the css: and parentCss:
            // options).
            //
            RGraph.text({
                object: this,
                     x: -10000,
                     y: -10000,
                 color: 'transparent',
                  text: ''
            });
        };








        //
        // Draws the center label and the vertical labels if enabled
        //
        this.drawLabels = function ()
        {
            //
            // Draw the label if specified
            //
            if (properties.labelsCenter) {

                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'labelsCenter'
                });

                 RGraph.text({

                    object:  this,

                    text: String(properties.labelsCenterSpecific ? properties.labelsCenterSpecific : RGraph.numberFormat({
                        object:    this,
                        number:    this.value[properties.labelsCenterIndex].toFixed(properties.labelsCenterDecimals),
                        unitspre:  properties.labelsCenterUnitsPre,
                        unitspost: properties.labelsCenterUnitsPost,
                        point:     properties.labelsCenterPoint,
                        thousand:  properties.labelsCenterThousand
                    })),
                    
                    x:       this.centerx + properties.labelsCenterOffsetx,
                    y:       this.centery + properties.labelsCenterOffsety,
                    
                    halign:  'center',
                    valign:  'center',
                    
                    color:   textConf.color,
                    size:    textConf.size,
                    font:    textConf.font,
                    bold:    textConf.bold,
                    italic:  textConf.italic
                });
            }

            if (properties.labels.length) {
                
                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'labels'
                });

                // Loop thru the labels
                for (var i=0; i<this.coords.length; ++i) {
                    RGraph.text({
                        object: this,

                          text: (typeof properties.labels[i] === 'string' || typeof properties.labels[i] === 'number') ?  properties.labels[i] : '',

                             x: this.coords[i].x - 5 + properties.labelsOffsetx,
                             y: this.coords[i].y - this.coords[i].radiusOuter + ((this.coords[i].radiusOuter - this.coords[i].radiusInner) / 2) + properties.labelsOffsety,

                        valign: 'center',
                        halign: 'right',
                  
                      bounding: true,
                  boundingFill: properties.labelsBackgroundFill,
                boundingStroke: properties.labelsBackgroundStroke,

                textConfPrefix: 'labels',
                
                
                    });
                }
            }
        };








        //
        // Draws the icons at the start of the circles.
        //
        this.drawIcons = function ()
        {
            for (var i=0; i<this.value.length; ++i) {
                if (typeof properties.icons[i] === 'string' && properties.icons[i].length) {

                    this.images[i]       = new Image();
                    this.images[i].src   = properties.icons[i];
                    this.images[i].index = i;
                    var obj              = this;

                    this.images[i].onload = function ()
                    {
                        // Aids readability
                        var img = this;

                        // IMPORTANT:
                        //
                        // In this callback the 'this' variable is the image object. The
                        // 'obj' variable is the chart object.
                        //
                        var width  = img.width;
                        var height = width;
                        
                        // Reduce the size of the icon if necessary
                        if (width >= obj.width) {
                            width  -= 10;
                            height -= 10;
                        }

                        // If a width has been stipulated then use it
                        if (typeof properties.iconsWidth === 'number') {
                            width  = properties.iconsWidth;
                        }
                        
                        // If a height has been specified then use it
                        if (typeof properties.iconsHeight === 'number') {
                            height  = properties.iconsHeight;
                        }
                        
                        var x = obj.centerx - (width / 3) + ((properties.ends === 'straight' || properties.ends === 'square') ? 15 : 0);
                        var y = (obj.centery - obj.coords[this.index].radiusOuter + ((obj.coords[this.index].radiusOuter - obj.coords[this.index].radiusInner) / 2)  - (height / 2) );
                        
                        x += properties.iconsOffsetx;
                        y += properties.iconsOffsety;

                        obj.context.drawImage(
                            this, x, y, width, height
                        );
                    };
                }
            }
        };








        //
        // Draws the rounded ends to the bars
        //
        this.drawEnds = function ()
        {
            if (properties.ends === 'straight' || properties.ends === 'square') {
                return;
            }

            for (var i=0; i<this.coords.length; ++i) {
                
                var x = this.coords[i].x;
                var y = this.coords[i].y - ((this.coords[i].radiusOuter - this.coords[i].radiusInner) / 2) - this.coords[i].radiusInner;
                
                this.path(
                    'b a % % % % % false f %',
                    x,
                    y,
                    this.width / 2,
                    0,
                    6.29,
                    properties.colors[i]
                );
                
                
                // cx,cy,angle,radius
                var xy = RGraph.getRadiusEndPoint({
                        cx: this.centerx,
                        cy: this.centery,
                     angle: this.coords[i].angleEnd,
                    radius: ((this.coords[i].radiusOuter - this.coords[i].radiusInner) / 2) + this.coords[i].radiusInner
                });
                
                this.path(
                    'b a % % % % % false f %',
                    xy[0],
                    xy[1],
                    (this.coords[i].radiusOuter - this.coords[i].radiusInner) / 2,
                    0,
                    6.29,
                    properties.colors[i]
                );
            }
        };








        //
        // A placeholder function
        // 
        // @param object The event object
        //
        this.getShape = function (e)
        {
            var mouseXY = RGraph.getMouseXY(e);
            var mouseX  = mouseXY[0];
            var mouseY  = mouseXY[1];

            // Go through the obj.coords array and find the correct index/shape
            for (var i=0; i<this.coords.length; ++i) {


                // Recreate the shape but don't fill/stroke it
                this.path(
                    'b    a % % % % % false    a % % % % % true',
                    
                    this.coords[i].x,
                    this.coords[i].y,
                    this.coords[i].radiusOuter,
                    this.coords[i].angleStart,
                    this.coords[i].angleEnd,
                    
                    this.coords[i].x,
                    this.coords[i].y,
                    this.coords[i].radiusInner,
                    this.coords[i].angleEnd,
                    this.coords[i].angleStart
                );




                //
                // Add the ends to the path if the bars are capped
                //
                if (properties.ends) {

                    this.path(
                        'a % % % % % false',
                        this.coords[i].x,
                        this.coords[i].y - this.coords[i].radiusInner - (this.width / 2),
                        this.width / 2,
                        RGraph.HALFPI,
                        RGraph.PI + RGraph.HALFPI
                    );


                    // cx,cy,angle,radius of the circle at the end of the bar
                    var xy = RGraph.getRadiusEndPoint({
                            cx: this.centerx,
                            cy: this.centery,
                         angle: this.coords[i].angleEnd,
                        radius: ((this.coords[i].radiusOuter - this.coords[i].radiusInner) / 2) + this.coords[i].radiusInner
                    });

                    this.path(
                        'm % %    a % % % % % false',

                        xy[0],
                        xy[1],

                        xy[0],
                        xy[1],
                        (this.coords[i].radiusOuter - this.coords[i].radiusInner) / 2,
                        0,
                        6.29
                    );
                }




                if (this.context.isPointInPath(mouseX, mouseY)) {

                    if (RGraph.parseTooltipText) {
                        var tooltip = RGraph.parseTooltipText(properties.tooltips, i);
                    }

                    return {
                    object: this,
                         x: this.coords[i].x,
                         y: this.coords[i].y,
               radiusInner: this.coords[i].radiusInner,
               radiusOuter: this.coords[i].radiusOuter,
                angleStart: this.coords[i].angleStart,
                  angleEnd: this.coords[i].angleEnd,
                   tooltip: typeof tooltip === 'string' ? tooltip : null,
                     label: properties.labels && typeof properties.labels[i] === 'string' ? properties.labels[i] : null,
                   dataset: 0,
                     index: i,
           sequentialIndex: i
                    };
                }
            }
        };








        //
        // This function returns the pertinent value for a particular click (or other mouse event)
        // 
        // @param obj e The event object
        //
        this.getValue = function (e)
        {
            var mouseXY = RGraph.getMouseXY(e);
            var angle   = RGraph.getAngleByXY(
                this.centerx,
                this.centery,
                mouseXY[0],
                mouseXY[1]
            );

            // Adjust the angle because canvas angles
            // start at the east axis
            angle += RGraph.HALFPI;
            if (angle > RGraph.TWOPI) {
                angle -= RGraph.TWOPI;
            }

            // Calculate the value based on the angle and min/max values
            var value = ((angle / RGraph.TWOPI) * (this.max - this.min)) + this.min;

            // Ensure that the value is in range
            value = Math.max(value, this.min);
            value = Math.min(value, this.max);

            return value;
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
            var mouseXY = RGraph.getMouseXY(e),
                width   = this.width;

            // Work out the radius
            var radius = RGraph.getHypLength(
                this.centerx,
                this.centery,
                mouseXY[0],
                mouseXY[1]
            );

            if (radius > this.radius || radius < (this.radius * 0.25) ) {
                return null;
            }

            return this;
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

                var mouseXY = RGraph.getMouseXY(e);

                var radius = RGraph.getHypLength(
                    this.centerx,
                    this.centery,
                    mouseXY[0],
                    mouseXY[1]
                );

                var index  = this.getIndexByRadius(radius);
                
                // Store the index in the radius
                if (typeof RGraph.Registry.get('adjusting.index') !== 'number') {
                    RGraph.Registry.set('adjusting.index', index);
                    RGraph.addCustomEventListener(this, 'onadjustend', function ()
                    {
                        RGraph.Registry.set('adjusting.index', null);
                    });
                } else {
                    index = RGraph.Registry.get('adjusting.index')
                }

                if (typeof index === 'number') {
                    this.value[index] = this.getValue(e);
    
                    RGraph.clear(this.canvas);
                    RGraph.redrawCanvas(this.canvas);
                    RGraph.fireCustomEvent(this, 'onadjust');
                }
            }
        };








        //
        // Returns the relevant index of the relevant datapoint.
        // But only if it's in range.
        //
        // @param number radius The radius to check
        //
        this.getIndexByRadius = function (radius)
        {
            // Loop through the shapes to determine the correct shape
            for (var i=0; i<this.coords.length; ++i) {
                if (radius < this.coords[i].radiusOuter && radius > this.coords[i].radiusInner) {
                    return i;
                }
            }
            
            return null;
        };








        //
        // This method returns the appropriate angle for a value
        // 
        // @param number value The value
        //
        this.getAngle = function (value)
        {
            // Higher than max
            if (value > this.max || value < this.min) {
                return null;
            }

            var angle = (((value - this.min) / (this.max - this.min)) * RGraph.TWOPI) - RGraph.HALFPI;

            if (value === this.max) angle -= 0.00001;
            if (value === this.min) angle += 0.00001;
            
            return angle;
        };








        //
        // Each object type has its own Highlight() function which highlights the appropriate shape
        //
        // @param object shape The shape to highlight
        //
        this.highlight = function (shape)
        {
            if (typeof properties.highlightStyle === 'function') {
                
                if (properties.tooltipsHighlight) {
                    (properties.highlightStyle)(shape);
                }




            // Highlight all of the rings except this one - essentially an inverted highlight
            } else if (typeof properties.highlightStyle === 'string' && properties.highlightStyle === 'invert') {
            
                if (properties.tooltipsHighlight) {
                    this.context.beginPath();
                    
                    for (var i=0; i<this.coords.length; ++i) {
                        if (shape.index !== i) {
                            this.pathBar(i);
                        }
                    }
                
                    this.context.fillStyle   = properties.highlightFill;
                    this.context.strokeStyle = properties.highlightStroke;
                    this.context.stroke();
                    this.context.fill();
                }




            // Regular highlighting
            } else {
                
                if (properties.tooltipsHighlight) {
                    this.context.beginPath();
                    
                    this.pathBar(shape.index);
                
                    this.context.fillStyle   = properties.highlightFill;
                    this.context.strokeStyle = properties.highlightStroke;
                    this.context.stroke();
                    this.context.fill();
                }
            }




        };








        //
        // Paths a bar given an index but does not:
        //  o stroke
        //  o fill
        //  o issue a beginPath() call
        //  o issue a closePath() call
        //
        // Do NOT use when drawing the bars initially - the .coords array
        // must already be populated.
        //
        this.pathBar = function (index)
        {
            // Path the outer edge
            this.path(
                'a % % % % % false',
                this.coords[index].x,
                this.coords[index].y,
                this.coords[index].radiusOuter,
                0 - RGraph.HALFPI,
                this.coords[index].angleEnd
            );
            
            // Get the center x/y coords of the end of the bar
            var xy = RGraph.getRadiusEndPoint({
                cx:     this.centerx,
                cy:     this.centery,
                angle:  this.coords[index].angleEnd,
                radius: this.coords[index].radiusInner + ((this.coords[index].radiusOuter - this.coords[index].radiusInner) / 2)
            });
        
            // Path the ending curved end if the ends are round
            if (properties.ends === 'round') {
                this.path(
                    'a % % % % % false',
                    xy[0],
                    xy[1],
                    this.width / 2,
                    this.coords[index].angleEnd,
                    this.coords[index].angleEnd + RGraph.PI
                );
            }
        
            // Path the inner edge
            this.path(
                'a % % % % % true',
                this.coords[index].x,
                this.coords[index].y,
                this.coords[index].radiusInner,
                this.coords[index].angleEnd,
                this.coords[index].angleStart
            );
        
            // Path the starting curved end if the ends are round
            if (properties.ends === 'round') {
                this.path(
                    'a % % % % % false',
                    this.centerx,
                    this.centery - this.coords[index].radiusInner - ((this.coords[index].radiusOuter - this.coords[index].radiusInner) / 2),
                    this.width / 2,
                    RGraph.HALFPI,
                    RGraph.PI  + RGraph.HALFPI
                );
            }
        };








        //
        // A worker function that handles Activity chart specific tooltip substitutions
        //
        this.tooltipSubstitutions = function (opt)
        {

            return {
                  index: opt.index,
                dataset: 0,
        sequentialIndex: opt.index,
                  value: this.value[opt.index],
                 values: this.value
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
            return {
                label: properties.tooltipsFormattedKeyLabels[index]
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

            //cx,cy,angle,radius
            var point = RGraph.getRadiusEndPoint({
                cx:     this.centerx,
                cy:     this.centery,
                radius: ((coords.radiusOuter - coords.radiusInner) / 2) + coords.radiusInner,
                angle:  ((coords.angleEnd - coords.angleStart) / 2) + (0 - RGraph.HALFPI)
            });

            // Position the tooltip in the X direction
            //args.tooltip.style.left = point[0] - (tooltip.offsetWidth / 2) + 'px';
            args.tooltip.style.left =
                  canvasXY[0]
                + point[0]
                - (tooltip.offsetWidth / 2)
                + obj.properties.tooltipsOffsetx
                + 'px';

            args.tooltip.style.top =
                  canvasXY[1]
                + point[1]
                - tooltip.offsetHeight
                - 10
                + obj.properties.tooltipsOffsety
                + 'px';
            
            // If the top of the tooltip is off the top of the page
            // then move the tooltip down
            if(parseFloat(args.tooltip.style.top) < 0) {
                args.tooltip.style.top = 5 + 'px';
            }
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors.backgroundColor  = RGraph.arrayClone(properties.backgroundColor);
                this.original_colors.colors           = RGraph.arrayClone(properties.colors);
            }

            // Parse the background color
            properties.backgroundColor = this.parseSingleColorForGradient(properties.backgroundColor);

    
            // Parse colors
            var colors = properties.colors;

            if (colors && colors.length) {
                for (var i=0; i<colors.length; ++i) {
                    colors[i] = this.parseSingleColorForGradient(colors[i]);
                }
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
                    return RGraph.parseJSONGradient({
                        object: this,
                        def:    RegExp.$1,
                        radial: true
                    });
                }

                var parts = RegExp.$1.split(':');
                
                // Create the gradient
                var grad = this.context.createLinearGradient(
                    properties.marginLeft,
                    0,
                    this.canvas.width - properties.marginLeft - properties.marginRight,
                    0
                );
                
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
        // This function runs once only
        // (put at the end of the file (before any effects))
        //
        this.firstDrawFunc = function ()
        {
        };








        //
        // Meter Grow
        // 
        // This effect gradually increases the represented value
        // 
        // @param              An object of options - eg: {frames: 60}
        // @param function     An optional callback function
        //
        this.grow = function ()
        {
            var obj = this;
            
            //
            // Convert the value to an array if its a number
            //
            if (typeof this.value === 'number') {
                this.value = [this.value];
            }

            //this.currentValue = this.currentValue || obj.min;
            if (RGraph.isNull(this.currentValue)) {
                
                this.currentValue=[];
                
                for (var i=0; i<this.value.length; ++i) {
                    this.currentValue[i] = this.min;
                }
            }

            var opt      = arguments[0] || {},
                frames   = opt.frames || 30,
                frame    = 0,
                diff     = [],
                step     = [],
                callback = arguments[1] || function () {},
                initial  = [];
            
            // Set a few properties too by looping through the data
            for (var i=0; i<this.value.length; ++i) {
                diff[i] = this.value[i] - this.currentValue[i];
                step[i] = diff[i] / frames;
                initial[i] = this.currentValue[i];
            }



            function iterator ()
            {
                for (var i=0; i<obj.value.length; ++i) {
                    obj.value[i] = initial[i] + (frame * step[i]);
                }
                
                // Increment the frame
                frame++;
    
                RGraph.clear(obj.canvas);
                RGraph.redrawCanvas(obj.canvas);
            
                if (frame <= frames) {
                    RGraph.Effects.updateCanvas(iterator);
                } else {
                    callback(obj);
                }
            }
            
            iterator();
            
            return this;
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