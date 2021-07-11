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
    // The progress bar constructor
    //
    RGraph.SemiCircularProgress = function (conf)
    {
        this.id                = conf.id;
        this.canvas            = document.getElementById(this.id);
        this.context           = this.canvas.getContext('2d');
        this.canvas.__object__ = this;

        this.min               = RGraph.stringsToNumbers(conf.min);
        this.max               = RGraph.stringsToNumbers(conf.max);
        this.value             = RGraph.stringsToNumbers(conf.value);
        this.type              = 'semicircularprogress';
        this.coords            = [];
        this.isRGraph          = true;
        this.isrgraph          = true;
        this.rgraph            = true;
        this.currentValue      = null;
        this.uid               = RGraph.createUID();
        this.canvas.uid        = this.canvas.uid ? this.canvas.uid : RGraph.createUID();
        this.colorsParsed      = false;
        this.coordsText        = [];
        this.original_colors   = [];
        this.firstDraw         = true; // After the first draw this will be false


        this.properties =
        {
            backgroundColor:            'rgba(0,0,0,0)',

            colors:                     ['#0c0'],

            linewidth:                  2,

            colorsStroke:               '#666',

            marginLeft:                 35,
            marginRight:                35,
            marginTop:                  35,
            marginBottom:               35,

            radius:                     null,
            centerx:                    null,
            centery:                    null,

            width:                      null,

            anglesStart:                Math.PI,
            anglesEnd:                  (2 * Math.PI),

            scaleDecimals:              0,
            scalePoint:                 '.',
            scaleThousand:              ',',
            scaleFormatter:             null,
            scaleRound:                 false,
            scaleUnitsPre:              '',
            scaleUnitsPost:             '',

            shadow:                     false,
            shadowColor:                'rgba(220,220,220,1)',
            shadowBlur:                 2,
            shadowOffsetx:              2,
            shadowOffsety:              2,

            labelsCenter:               true,
            labelsCenterFade:           false,
            labelsCenterSize:           40,
            labelsCenterColor:          null,
            labelsCenterBold:           null,
            labelsCenterItalic:         null,
            labelsCenterFont:           null,
            labelsCenterValign:         'bottom',
            labelsCenterOffsetx:        0,
            labelsCenterOffsety:        0,
            labelsMinColor:             null,
            labelsMinFont:              null,
            labelsMinBold:              null,
            labelsMinSize:              null,
            labelsMinItalic:            null,
            labelsMinOffsetAngle:       0,
            labelsMinOffsetx:           0,
            labelsMinOffsety:           5,
            labelsMaxColor:             null,
            labelsMaxFont:              null,
            labelsMaxBold:              null,
            labelsMaxSize:              null,
            labelsMaxItalic:            null,
            labelsMaxOffsetAngle:       0,
            labelsMaxOffsetx:           0,
            labelsMaxOffsety:           5,
            
            title:                      '',
            titleBold:                  null,
            titleItalic:                null,
            titleFont:                  null,
            titleSize:                  null,
            titleColor:                 null,
            titleOffsetx:               0,
            titleOffsety:               0,
            
            textSize:                   12,
            textColor:                  'black',
            textFont:                   'Arial, Verdana, sans-serif',
            textBold:                   false,
            textItalic:                 false,
            textAccessible:             true,
            textAccessibleOverflow:     'visible',
            textAccessiblePointerevents:false,

            contextmenu:                null,

            tooltips:                   null,
            tooltipsEffect:             'fade',
            tooltipsCssClass:           'RGraph_tooltip',
            tooltipsCss:                null,
            tooltipsHighlight:          true,
            tooltipsEvent:              'onclick',
            tooltipsCoordsPage:         true,
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

            highlightStroke:            'rgba(0,0,0,0)',
            highlightFill:              'rgba(255,255,255,0.7)',

            annotatable:                false,
            annotatebleColor:           'black',
            annotatebleLinewidth:       1,

            resizable:                  false,
            resizableHandleAdjust:      [0,0],
            resizableHandleBackground:  null,

            adjustable:                 false,

            clearto:                    'rgba(0,0,0,0)'
        }

        // Check for support
        if (!this.canvas) {
            alert('[SEMICIRCULARPROGRESS] No canvas support');
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
        // A generic setter
        // 
        // @param string name  The name of the property to set or it can also be an object containing
        //                     object style configuration
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
        // A generic getter
        // 
        // @param string name  The name of the property to get
        //
        this.get = function (name)
        {
            return properties[name];
        };








        //
        // Draws the progress bar
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
            // Set the current value
            //
            this.currentValue = this.value;



            //
            // Make the margins easy ro access
            //
            this.marginLeft   = properties.marginLeft;
            this.marginRight  = properties.marginRight;
            this.marginTop    = properties.marginTop;
            this.marginBottom = properties.marginBottom;
    
            // Figure out the width and height
            this.radius = Math.min(
                (this.canvas.width - properties.marginLeft - properties.marginRight) / 2,
                this.canvas.height - properties.marginTop - properties.marginBottom
            );
            this.centerx = ((this.canvas.width - this.marginLeft - this.marginRight) / 2) + this.marginLeft;
            this.centery = this.canvas.height - this.marginBottom;
            this.width   = this.radius / 3;
             
            // User specified centerx/y/radius
            if (typeof properties.radius  === 'number') this.radius = properties.radius;
            if (typeof properties.centerx === 'number') this.centerx = properties.centerx;
            if (typeof properties.centery === 'number') this.centery = properties.centery;
            if (typeof properties.width   === 'number') this.width   = properties.width;

            this.coords = [];



            //
            // Stop this growing uncontrollably
            //
            this.coordsText = [];




    
            //
            // Draw the meter
            //
            this.drawMeter();
            this.drawLabels();
    
    
    
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
            // This function enables resizing
            //
            if (properties.resizable) {
                RGraph.allowResizing(this);
            }
            
            //
            // Instead of using RGraph.common.adjusting.js, handle them here
            //
            this.allowAdjusting();


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
        // Draw the bar itself
        //
        this.drawMeter = function ()
        {
            //
            // The start/end angles
            //
            var start = properties.anglesStart,
                end   = properties.anglesEnd;

            //
            // Calculate a scale (though only two labels are shown)
            //

            this.scale2 = RGraph.getScale({object: this, options: {
                'scale.max':          this.max,
                'scale.strict':       true,
                'scale.min':          this.min,
                'scale.thousand':     properties.scaleThousand,
                'scale.point':        properties.scalePoint,
                'scale.decimals':     properties.scaleDecimals,
                'scale.labels.count': 5,
                'scale.units.pre':    properties.scaleUnitsPre,
                'scale.units.post':   properties.scaleUnitsPost
            }});

            // Draw the backgrundColor
            if (properties.backgroundColor !== 'rgba(0,0,0,0)') {
                this.path(
                    'fs % fr % % % %',
                    properties.backgroundColor,
                    0,0,this.canvas.width, this.canvas.height
                );
            }


            // Draw the main semi-circle background and then lighten it by filling it again
            // in semi-transparent white
            this.path(
                'lw % b a % % % % % false a % % % % % true c s % f % sx % sy % sc % sb % f % sx 0 sy 0 sb 0 sc rgba(0,0,0,0) lw 1',
                properties.linewidth,
                this.centerx, this.centery, this.radius, start, end,
                this.centerx, this.centery, this.radius - this.width, end, start,
                properties.colorsStroke,
                typeof properties.colors[1] !== 'undefined' ? properties.colors[1] : properties.colors[0],
                properties.shadowOffsetx, properties.shadowOffsety, properties.shadow ? properties.shadowColor : 'rgba(0,0,0,0)', properties.shadowBlur,
                typeof properties.colors[1] !== 'undefined' ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.85)'
            );

            var angle = start + ((end - start) * ((this.value - this.scale2.min) / (this.max - this.scale2.min)));

            // Draw the meter
            this.path(
                'b a % % % % % false a % % % % % true c f %',
                this.centerx, this.centery, this.radius, start, angle,
                this.centerx, this.centery, this.radius - this.width, start + ((end - start) * ((this.value - this.scale2.min) / (this.max - this.scale2.min))), start,
                properties.colors[0]
            );

            this.coords = [[
                this.centerx,
                this.centery,
                this.radius,
                start,
                end,
                this.width,
                angle
            ]];
        };








        //
        // The function that draws the labels
        //
        this.drawLabels = function ()
        {
            var min = RGraph.numberFormat({
                object:    this,
                number:    this.scale2.min.toFixed(typeof properties.labelsMinDecimals === 'number'? properties.labelsMinDecimals : properties.scaleDecimals),
                unitspre:  typeof properties.labelsMinUnitsPre  === 'string' ? properties.labelsMinUnitsPre  : properties.scaleUnitsPre,
                unitspost: typeof properties.labelsMinUnitsPost === 'string' ? properties.labelsMinUnitsPost : properties.scaleUnitsPost,
                point:     typeof properties.labelsMinPoint      === 'string' ? properties.labelsMinPoint      : properties.scalePoint,
                thousand:  typeof properties.labelsMinThousand   === 'string' ? properties.labelsMinThousand   : properties.scaleThousand
            });

            var max = RGraph.numberFormat({
                object:    this,
                number:    this.scale2.max.toFixed(typeof properties.labelsMaxDecimals === 'number'? properties.labelsMaxDecimals : properties.scaleDecimals),
                unitspre:  typeof properties.labelsMaxUnitsPre  === 'string' ? properties.labelsMaxUnitsPre  : properties.scaleUnitsPre,
                unitspost: typeof properties.labelsMaxUnitsPost === 'string' ? properties.labelsMaxUnitsPost : properties.scaleUnitsPost,
                point:     typeof properties.labelsMaxPoint      === 'string' ? properties.labelsMaxPoint      : properties.scalePoint,
                thousand:  typeof properties.labelsMaxThousand   === 'string' ? properties.labelsMaxThousand   : properties.scaleThousand
            });


            // Determine the horizontal and vertical alignment for the text
            if (properties.anglesStart === RGraph.PI) {
                var halign = 'center';
                var valign = 'top';
            
            } else if (properties.anglesStart <= RGraph.PI) {
                var halign = 'left';
                var valign = 'center';
            
            } else if (properties.anglesStart >= RGraph.PI) {
                var halign = 'right';
                var valign = 'center';
            }

            // Get the X/Y for the min label
            // cx, cy, angle, radius
            var xy = RGraph.getRadiusEndPoint(
                this.centerx,
                this.centery,
                properties.anglesStart + properties.labelsMinOffsetAngle,
                this.radius - (this.width / 2)
            );
            
            var textConf = RGraph.getTextConf({
                object: this,
                prefix: 'labelsMin'
            });


            // Draw the min label
            RGraph.text({
                
                object: this,
     
                font:   textConf.font,
                size:   textConf.size,
                color:  textConf.color,
                bold:   textConf.bold,
                italic: textConf.italic,

                x: xy[0] + properties.labelsMinOffsetx,
                y: xy[1] + properties.labelsMinOffsety,
                valign: valign,
                halign: halign,
                text: min
            });










            // Determine the horizontal and vertical alignment for the text
            if (properties.anglesEnd === RGraph.TWOPI) {
                var halign = 'center';
                var valign = 'top';
            
            } else if (properties.anglesEnd >= RGraph.TWOPI) {
                var halign = 'right';
                var valign = 'center';
            
            } else if (properties.anglesEnd <= RGraph.TWOPI) {
                var halign = 'left';
                var valign = 'center';
            }
            
            // Get the X/Y for the max label
            // cx, cy, angle, radius
            var xy = RGraph.getRadiusEndPoint(
                this.centerx,
                this.centery,
                properties.anglesEnd + properties.labelsMaxOffsetAngle,
                this.radius - (this.width / 2)
            );

            var textConf = RGraph.getTextConf({
                object: this,
                prefix: 'labelsMax'
            });

            // Draw the max label
            RGraph.text({
                
                object: this,
     
                font:   textConf.font,
                size:   textConf.size,
                color:  textConf.color,
                bold:   textConf.bold,
                italic: textConf.italic,

                x: xy[0] + properties.labelsMaxOffsetx,
                y: xy[1] + properties.labelsMaxOffsety,
                valign: valign,
                halign: halign,
                text: max
            });














            // Draw the big label in the center
            if (properties.labelsCenter) {

                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'labelsCenter'
                });

                var ret = RGraph.text({
                    
                    object: this,

                    font:   textConf.font,
                    size:   textConf.size,
                    color:  textConf.color,
                    bold:   textConf.bold,
                    italic: textConf.italic,

                    x:          this.centerx + properties.labelsCenterOffsetx,
                    y:          this.centery + properties.labelsCenterOffsety,

                    valign:     properties.labelsCenterValign,
                    halign:     'center',
                    
                    text: RGraph.numberFormat({
                        object:    this,
                        number:    this.value.toFixed(typeof properties.labelsCenterDecimals === 'number' ? properties.labelsCenterDecimals : properties.scaleDecimals),
                        unitspre:  typeof properties.labelsCenterUnitsPre  === 'string' ? properties.labelsCenterUnitsPre  : properties.scaleUnitsPre,
                        unitspost: typeof properties.labelsCenterUnitsPost === 'string' ? properties.labelsCenterUnitsPost : properties.scaleUnitsPost,
                        point:     typeof properties.labelsCenterPoint      === 'string' ? properties.labelsCenterPoint      : properties.scalePoint,
                        thousand:  typeof properties.labelsCenterThousand   === 'string' ? properties.labelsCenterThousand   : properties.scaleThousand
                    })
                });
                
                // Allows the center label to fade in
                if (properties.labelsCenterFade && ret.node) {
                    ret.node.style.opacity = 0;
    
                    var delay = 25,
                        incr  = 0.1;
    
                    for (var i=0; i<10; ++i) {
                        (function (index)
                        {
                            setTimeout(function  ()
                            {
                                ret.node.style.opacity = incr * index;
                            }, delay * (index + 1));
                        })(i);
                    }
                }
            }
            
            // Draw the title
            RGraph.drawTitle(
                this,
                properties.title,
                this.marginTop,
                null,
                properties.titleSize
            );
        };








        //
        // Returns the focused bar
        // 
        // @param event e The event object
        //
        this.getShape = function (e)
        {
            var mouseXY = RGraph.getMouseXY(e),
                mouseX  = mouseXY[0],
                mouseY  = mouseXY[1]

            // Draw the meter here but don't stroke or fill it
            // so that it can be tested with isPointInPath()
            this.path(
                'b a % % % % % false a % % % % % true',
                this.coords[0][0], this.coords[0][1], this.coords[0][2], this.coords[0][3], this.coords[0][6],
                this.coords[0][0], this.coords[0][1], this.coords[0][2] - this.coords[0][5], this.coords[0][6], this.coords[0][3]
            );



            if (this.context.isPointInPath(mouseX, mouseY)) {

                if (RGraph.parseTooltipText) {
                    var tooltip = RGraph.parseTooltipText(properties.tooltips, 0);
                }

                return {
                    object: this,
                         x: this.coords[0][0],
                         y: this.coords[0][1],
               radiusOuter: this.coords[0][2],
               radiusInner: this.coords[0][2] - this.width,
                     width: this.coords[0][5],
                angleStart: this.coords[0][3],
                  angleEnd: this.coords[0][6],
                     index: 0,
                   dataset: 0,
           sequentialIndex: 0,
                   tooltip: typeof tooltip === 'string' ? tooltip : null
                };
            }
        };








        //
        // This function returns the value that the mouse is positioned at, regardless of
        // the actual indicated value.
        // 
        // @param object e The event object
        //
        this.getValue = function (e)
        {
            var mouseXY = RGraph.getMouseXY(e),
                mouseX  = mouseXY[0],
                mouseY  = mouseXY[1],
                angle   = RGraph.getAngleByXY(
                    this.centerx,
                    this.centery,
                    mouseX,
                    mouseY
                );
                
                if (
                    angle &&
                    mouseX >= this.centerx
                    && mouseY > this.centery
                    ) {
                    
                    angle += RGraph.TWOPI;
                }

            if (angle < properties.anglesStart && mouseX > this.centerx) { angle = properties.anglesEnd; }
            if (angle < properties.anglesStart) { angle = properties.anglesStart; }

            var value = (((angle - properties.anglesStart) / (properties.anglesEnd - properties.anglesStart)) * (this.max - this.min)) + this.min;

            value = Math.max(value, this.min);
            value = Math.min(value, this.max);

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
            } else {
                this.path(
                    'lw 5 b a % % % % % false a % % % % % true c f % s % lw 1',
                    shape.x, shape.y, shape.radiusOuter, shape.angleStart, shape.angleEnd,
                    shape.x, shape.y, shape.radiusInner, shape.angleEnd, shape.angleStart,
                    properties.highlightFill, properties.highlightStroke
                );
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

            // Draw a Path so that the coords can be tested
            // (but don't stroke/fill it
            this.path(
                'b a % % % % % false',
                this.centerx,this.centery,this.radius,properties.anglesStart,properties.anglesEnd
            );

            this.path(
                'a % % % % % true',
                this.centerx,this.centery,this.radius - this.width,properties.anglesEnd,properties.anglesStart
            );

            return this.context.isPointInPath(mouseXY[0], mouseXY[1]) ? this : null;
        };








        //
        // This function allows the progress to be  adjustable.
        // UPDATE: Not any more
        //
        this.allowAdjusting = function () {};








        //
        // This method handles the adjusting calculation for when the mouse is moved
        // 
        // @param object e The event object
        //
        this.adjusting_mousemove = function (e)
        {
            //
            // Handle adjusting for the HProgress
            //
            if (properties.adjustable && RGraph.Registry.get('adjusting') && RGraph.Registry.get('adjusting').uid == this.uid) {

                var value   = this.getValue(e);
                
                if (typeof value === 'number') {
    
                    // Fire the onadjust event
                    RGraph.fireCustomEvent(this, 'onadjust');

                    this.value = Number(value.toFixed(properties.scaleDecimals));
                    RGraph.redrawCanvas(this.canvas);
                }
            }
        };








        //
        // This function returns the appropriate angle (in radians) for the given
        // Y value
        // 
        // @param  int value The Y value you want the angle for
        // @returm int       The angle
        //
        this.getAngle = function (value)
        {
            if (value > this.max || value < this.min) {
                return null;
            }

            var angle = (value / this.max) * (properties.anglesEnd - properties.anglesStart)
                angle += properties.anglesStart;

            return angle;
        };








        //
        // This returns true/false as to whether the cursor is over the chart area.
        // The cursor does not necessarily have to be over the bar itself.
        //
        this.overChartArea = function  (e)
        {
            var mouseXY = RGraph.getMouseXY(e),
                mouseX  = mouseXY[0],
                mouseY  = mouseXY[1]

            // Draw the background to the Progress but don't stroke or fill it
            // so that it can be tested with isPointInPath()
            this.path(
                'b a % % % % % false a % % % % % true',
                this.coords[0][0], this.coords[0][1], this.coords[0][2], properties.anglesStart, properties.anglesEnd,
                this.coords[0][0], this.coords[0][1], this.coords[0][2] - this.coords[0][5], properties.anglesEnd, properties.anglesStart
            );

            return this.context.isPointInPath(mouseX, mouseY);
        };








        //
        // 
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors.backgroundColor = RGraph.arrayClone(properties.backgroundColor);
                this.original_colors.colors          = RGraph.arrayClone(properties.colors);
            }

            properties.colors[0] = this.parseSingleColorForGradient(properties.colors[0]);
            properties.colors[1] = this.parseSingleColorForGradient(properties.colors[1]);
            
            properties.colorsStroke      = this.parseSingleColorForGradient(properties.colorsStroke);
            properties.backgroundColor = this.parseSingleColorForGradient(properties.backgroundColor);
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
                var grad = this.context.createLinearGradient(properties.marginLeft,0,this.canvas.width - properties.marginRight,0);
    
                var diff = 1 / (parts.length - 1);
    
                grad.addColorStop(0, RGraph.trim(parts[0]));
    
                for (var j=1,len=parts.length; j<len; ++j) {
                    grad.addColorStop(j * diff, RGraph.trim(parts[j]));
                }
                
                return grad ? grad : color;
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
        // HProgress Grow effect (which is also the VPogress Grow effect)
        // 
        // @param object obj The chart object
        //
        this.grow = function ()
        {
            var obj           = this,
                initial_value = this.currentValue,
                opt           = arguments[0] || {},
                numFrames     = opt.frames || 30,
                frame         = 0,
                callback      = arguments[1] || function () {},
                diff          = this.value - Number(this.currentValue),
                increment     = diff  / numFrames;



            function iterator ()
            {
                frame++;
    
                if (frame <= numFrames) {
    
                    obj.value = initial_value + (increment * frame);
    
                    RGraph.clear(obj.canvas);
                    RGraph.redrawCanvas(obj.canvas);
                    
                    RGraph.Effects.updateCanvas(iterator);
                } else {
                    callback();
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
            return {
                  index: 0,
                dataset: 0,
        sequentialIndex: 0,
                  value: this.value,
                 values: [this.value]
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
            var color = (properties.tooltipsFormattedKeyColors && properties.tooltipsFormattedKeyColors[0]) ? properties.tooltipsFormattedKeyColors[0] : properties.colors[0];
            var label = (properties.tooltipsFormattedKeyLabels && properties.tooltipsFormattedKeyLabels[0]) ? properties.tooltipsFormattedKeyLabels[0] : '';

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
                shape = this.getShape(e),
                angle = ((shape.angleEnd - shape.angleStart) / 2) + shape.angleStart;

            var endpoint = RGraph.getRadiusEndPoint(
                shape.x,
                shape.y,
                angle,
                ((shape.radiusOuter - shape.radiusInner) / 2) + shape.radiusInner
            );


            // Position the tooltip in the X direction
            args.tooltip.style.left = (
                  canvasXY[0]                    // The X coordinate of the canvas
                + endpoint[0]                      // The X coordinate of the bar on the chart
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
                + obj.properties.tooltipsOffsetx // Add any user defined offset
            ) + 'px';

            args.tooltip.style.top  = (
                  canvasXY[1]                    // The Y coordinate of the canvas
                + endpoint[1]                      // The Y coordinate of the bar on the chart
                - tooltip.offsetHeight           // The height of the tooltip
                + obj.properties.tooltipsOffsety // Add any user defined offset
                - 10                             // Account for the pointer
            ) + 'px';
        };








        //
        // The chart is now always registered
        //
        RGraph.register(this);








        //
        // This is the 'end' of the constructor so if the first argument
        // contains configuration data - handle that.
        //
        RGraph.parseObjectStyleConfig(this, conf.options);
    };