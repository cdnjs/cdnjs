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
    // The Segmented Donut chart constructor
    //
    RGraph.Segmented = function (conf)
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
        this.type              = 'segmented';
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
        this.original_colors   = [];
        this.firstDraw         = true; // After the first draw this will be false

        //
        // If the value is zero set it to very
        // slightly more than zero so the meter
        // is drawn correctly.
        //
        // Likewise with the maximum value
        //
        if (this.value <= 0.0000001) {
            this.value = 0.0000001;
        }
        


        // Various config type stuff
        this.properties =
        {
            radius:                             null,
            centerx:                            null,
            centery:                            null,
            width:                              null,

            marginLeft:                            15,
            marginRight:                           15,
            marginTop:                             15,
            marginBottom:                          15,

            backgroundColor:                    'black',
            colors:                             ['red','#ddd'],
            
            textFont:                              'Arial, Verdana, sans-serif',
            textSize:                              null,
            textColor:                             'gray',
            textBold:                              false,
            textItalic:                            false,
            textAccessible:                        true,
            textAccessibleOverflow:                'visible',
            textAccessiblePointerevents:           false,

            labelsCenterFont:                          null,
            labelsCenterSize:                          null,
            labelsCenterColor:                         null,
            labelsCenterBold:                          null,
            labelsCenterItalic:                        null,
            labelsCenterUnitsPre:                      '',
            labelsCenterUnitsPost:                     '',
            labelsCenterDecimals:                      0,
            labelsCenterPoint:                         '.',
            labelsCenterThousand:                      ',',
            labelsCenterSpecific:                      '',
            labelsCenterOffsetx:                        0,
            labelsCenterOffsety:                        0,
            
            radialsCount:                       36,

            contextmenu:                        null,

            annotatable:                        false,
            annotatableColor:                   'black',

            adjustable:                         false,
            
            effectRoundrobinMultiplier:         1,

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
            



            //
            // Constrain the value to be within the min and max
            //
            if (this.value > this.max) this.value = this.max;
            if (this.value < this.min) this.value = this.min;
    
            //
            // Set the current value
            //
            this.currentValue = this.value;



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
            this.drawMeter();
            this.drawLabel();

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
        // Draws the meter
        //
        this.drawMeter = function ()
        {
            var width = typeof properties.width === 'number' ? properties.width : this.radius / 2;
            
            // Allow for +/-xx style width
            if (typeof properties.width === 'string') {
                width += Number(properties.width);
            }
            
            
            // First thing to do is clear the canvas to the backgroundColor
            if (properties.backgroundColor) {
                this.path(
                    'fs % fr -5 -5 % %',
                    properties.backgroundColor,
                    this.canvas.width + 10,
                    this.canvas.height + 10
                );
            }


            // Draw the circle that becomes the non-indicator part of the chart
            var degrees  = 360 / properties.radialsCount;
                degrees /= 2,
                colored  = Math.round(((this.value - this.min) / (this.max - this.min)) * (properties.radialsCount * 2));

            //
            // Draw the background segments
            //
            for (var i=1; i<(properties.radialsCount * 2); i+=2) {
            
                var start = (RGraph.toRadians( (i * degrees) - (degrees / 2)) * properties.effectRoundrobinMultiplier) - RGraph.HALFPI,
                    end   = (RGraph.toRadians( (i * degrees) + (degrees / 2)) * properties.effectRoundrobinMultiplier) - RGraph.HALFPI;


                this.path(
                    
                    'b a % % % % % false a % % % % % true f % ',
    
                    this.centerx,
                    this.centery,
                    this.radius,
                    start,
                    end,
    
                    this.centerx,
                    this.centery,
                    this.radius - width,
                    end,
                    start,
    
                    i >= colored ? properties.colors[1] : properties.colors[0]
                );
            }


            // Reset the linewidth back to 1
            this.context.lineWidth = 1;
        };








        //
        // This function draws the text label
        //
        this.drawLabel = function ()
        {
            //
            // Set the text size
            //
            if (RGraph.isNull(properties.textSize)) {
                properties.textSize = this.radius / 2.5;
            }


            // Get the text configuration
            var textConf = RGraph.getTextConf({
                object: this,
                prefix: 'labelsCenter'
            });

            // Draw the large center label
            RGraph.text({

             object: this,

                font:   textConf.font,
                italic: textConf.italic,
                bold:   textConf.bold,
                size:   textConf.size,
                color:  textConf.color,

                  x: this.centerx + properties.labelsCenterOffsetx,
                  y: this.centery + properties.labelsCenterOffsety,

               text: properties.labelsCenterSpecific ? properties.labelsCenterSpecific : RGraph.numberFormat({
                   object:    this,
                   number:    (this.value * properties.effectRoundrobinMultiplier).toFixed(properties.labelsCenterDecimals),
                   unitspre:  properties.labelsCenterUnitsPre,
                   unitspost: properties.labelsCenterUnitsPost,
                   point:     properties.labelsCenterPoint,
                   thousand:  properties.labelsCenterThousand
               }),

             halign: 'center',
             valign: 'center',
         accessible: properties.textAccessible
            });
        };








        //
        // A placeholder function
        // 
        // @param object The event object
        //
        this.getShape = function (e) {};








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
                width   = properties.width;

            // Work out the radius
            var radius = RGraph.getHypLength(
                this.centerx,
                this.centery,
                mouseXY[0],
                mouseXY[1]
            );

            if (typeof width === 'string') {
                width = (this.radius / 2) + parseFloat(width);
            
            } else if (RGraph.isNull(width)) {
                width = this.radius / 2;
            }

            if (radius > this.radius || radius < (this.radius - width) ) {
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
                this.value = this.getValue(e);
                RGraph.clear(this.canvas);
                RGraph.redrawCanvas(this.canvas);
                RGraph.fireCustomEvent(this, 'onadjust');
            }
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

            obj.currentValue = obj.currentValue || obj.min;

            var opt      = arguments[0] || {},
                frames   = opt.frames || 30,
                frame    = 0,
                diff     = obj.value - obj.currentValue,
                step     = diff / frames,
                callback = arguments[1] || function () {},
                initial  = obj.currentValue



            function iterator ()
            {
                obj.value = initial + (frame++ * step);
    
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
        // RoundRobin
        // 
        // This effect does two things:
        //  1. Gradually increases the size of each segment
        //  2. Gradually increases the size of the radius from 0
        // 
        // @param object OPTIONAL Options for the effect
        // @param function OPTIONAL A callback function
        //
        this.roundRobin = function ()
        {
            var obj      = this,
                opt      = arguments[0] || {},
                callback = arguments[1] || function () {},
                frame    = 0,
                frames  = opt.frames || 30,
                radius  = this.radius;

            var iterator = function ()
            {
                obj.set({
                    effectRoundrobinMultiplier: RGraph.Effects.getEasingMultiplier(frames, frame)
                });

                //obj.value = initial + (frame++ * step);

                RGraph.redrawCanvas(obj.canvas);

                if (frame < frames) {
                    RGraph.Effects.updateCanvas(iterator);
                    frame++;
                
                } else {
                    RGraph.redrawCanvas(obj.canvas);
                    callback(obj);
                }
            };
    
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