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
    
    //
    // Having this here means that the RGraph libraries can be included in any order, instead of you having
    // to include the common core library first.
    //

    // Define the RGraph global variable
    RGraph = window.RGraph || {isrgraph:true,isRGraph: true,rgraph:true};
    RGraph.Drawing = RGraph.Drawing || {};

    //
    // The constructor. This function sets up the object.
    //
    RGraph.Drawing.Marker2 = function (conf)
    {
        var id                        = conf.id,
            canvas                    = document.getElementById(id),
            x                         = conf.x,
            y                         = conf.y,
            text                      = conf.text;

        this.id                = id;
        this.canvas            = document.getElementById(this.id);
        this.context           = this.canvas.getContext('2d')
        this.colorsParsed      = false;
        this.canvas.__object__ = this;
        this.original_colors   = [];
        this.firstDraw         = true; // After the first draw this will be false

        //
        // Store the properties
        //
        this.x    = x;
        this.y    = y;
        this.text = text;


        //
        // This defines the type of this shape
        //
        this.type = 'drawing.marker2';


        //
        // This facilitates easy object identification, and should always be true
        //
        this.isRGraph = true;
        this.isrgraph = true;
        this.rgraph   = true;


        //
        // This adds a uid to the object that you can use for identification purposes
        //
        this.uid = RGraph.createUID();


        //
        // This adds a UID to the canvas for identification purposes
        //
        this.canvas.uid = this.canvas.uid ? this.canvas.uid : RGraph.createUID();


        //
        // Some example background properties
        //
        this.properties =
        {
            colorsStroke:               'black',
            colorsFill:                 'white',

            textColor:                  'black',
            textSize:                   12,
            textFont:                   'Arial, Verdana, sans-serif',
            textBold:                   false,
            textItalic:                 false,
            textAccessible:             true,
            textAccessibleOverflow:     'visible',
            textAccessiblePointerevents: false,

            shadow:                     true,
            shadowColor:                'gray',
            shadowOffsetx:              3,
            shadowOffsety:              3,
            shadowBlur:                 5,

            highlightStyle:             null,
            highlightStroke:            'rgba(0,0,0,0)',
            highlightFill:              '#fcc',

            tooltips:                   null,
            tooltipsHighlight:          true,
            tooltipsCssClass:           'RGraph_tooltip',
            tooltipsCss:                null,
            tooltipsEvent:              'onclick',
            tooltipsFormattedPoint:     '.',
            tooltipsFormattedThousand:  ',',
            tooltipsFormattedDecimals:  0,
            tooltipsFormattedUnitsPre:  '',
            tooltipsFormattedUnitsPost: '',
            tooltipsFormattedListType:  'ul',
            tooltipsFormattedListItems: null,
            tooltipsPointer:            true,
            tooltipsPositionStatic:     true,

            voffset:                    20,

            clearto:                    'rgba(0,0,0,0)'
        }

        //
        // A simple check that the browser has canvas support
        //
        if (!this.canvas) {
            alert('[DRAWING.MARKER2] No canvas support');
            return;
        }
        
        //
        // These are used to store coords
        //
        this.coords = [];
        this.coordsText = [];


        //
        // Create the dollar object so that functions can be added to them
        //
        this.$0 = {};




        // Easy access to  properties and the path function
        var properties = this.properties;
        this.path      = RGraph.pathObjectFunction;
        
        
        
        //
        // "Decorate" the object with the generic effects if the effects library has been included
        //
        if (RGraph.Effects && typeof RGraph.Effects.decorate === 'function') {
            RGraph.Effects.decorate(this);
        }








        //
        // A setter method for setting graph properties. It can be used like this: obj.set('colorsStroke', '#666');
        // 

        // @param name  string The name of the property to set OR it can be a map
        //                     of name/value settings like what you set in the constructor
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
        // A getter method for retrieving graph properties. It can be used like this: obj.get('colorsStroke');
        // 
        // @param name  string The name of the property to get
        //
        this.get = function (name)
        {
            return properties[name];
        };








        //
        // Draws the marker
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
            // Reset the linewidth
            //
            this.context.lineWidth = 1;
    

            this.metrics = RGraph.measureText(
                this.text,
                properties.textBold,
                properties.textFont,
                properties.textSize
            );



            if (this.x + this.metrics[0] >= this.canvas.width) {
                this.alignRight = true;
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
            // Draw the box *
            //

            var x      = this.alignRight ? this.x - this.metrics[0] - 6 : this.x,
                y      = this.y - 6 - properties.voffset - this.metrics[1],
                width  = this.metrics[0] + 6,
                height = this.metrics[1];
            
            // Store these coords as the coords of the label
            this.coords[0] = [x, y, width, height];
            
            
            
            //
            // Stop this growing uncntrollably
            //
            this.coordsText = [];
            
            
            // Set the linewidth
            this.context.lineWidth = properties.linewidth;

            
            
            
            
            //
            // Draw the box that the text sits in
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

            this.context.strokeStyle = properties.colorsStroke;
            this.context.fillStyle   = properties.colorsFill;
            
            // This partcular strokeRect has 0 width and so ends up being a line
            this.context.strokeRect(x + (this.alignRight ? width : 0), y, 0, height + properties.voffset - 6);

            this.context.strokeRect(x, y, width, height);
            this.context.fillRect(x, y, width, height);
            
            RGraph.noShadow(this);
            
            this.context.fillStyle = properties.textColor;

            // Draw the text
            RGraph.text({
            
              object: this,

                font:   properties.textFont,
                size:   properties.textSize,
                color:  properties.textColor,
                bold:   properties.textBold,
                italic: properties.textItalic,

                x:      Math.round(this.x) - (this.alignRight ? this.metrics[0] + 3 : -3),
                y:      y + (height / 2),
                text:   this.text,
                valign: 'center',
                halign: 'left',
                tag:    'labels'
            });
            
            this.coords[0].push([
                x,
                y,
                width,
                height
            ]);







            
            // Must turn the shadow off
            RGraph.noShadow(this);
    
    
    
            //
            // Reset the testBaseline
            //
            this.context.textBaseline = 'alphabetic';
    
    
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
            // Fire the draw event
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
        // The getObjectByXY() worker method
        //
        this.getObjectByXY = function (e)
        {
            if (this.getShape(e)) {
                return this;
            }
        };








        //
        // Not used by the class during creating the shape, but is used by event handlers
        // to get the coordinates (if any) of the selected bar
        // 
        // @param object e The event object
        // @param object   OPTIONAL You can pass in the bar object instead of the
        //                          function using "this"
        //
        this.getShape = function (e)
        {
            var mouseXY = RGraph.getMouseXY(e),
                mouseX  = mouseXY[0],
                mouseY  = mouseXY[1];
    
            if (mouseX >= this.coords[0][0] && mouseX <= (this.coords[0][0] + this.coords[0][2]) ) {

                if (mouseY >= this.coords[0][1] && mouseY <= (this.coords[0][1] + this.coords[0][3])) {

                    if (RGraph.parseTooltipText && properties.tooltips) {
                        var tooltip = RGraph.parseTooltipText(properties.tooltips, 0);
                    }

                    return {
                        object: this,
                             x: this.coords[0][0],
                             y: this.coords[0][1],
                         width: this.coords[0][2],
                        height: this.coords[0][3],
                       dataset: 0,
                         index: 0,
               sequentialIndex: 0,
                       tooltip: typeof tooltip === 'string' ? tooltip : null
                    };
                }
            }
            
            return null;
        };








        //
        // Each object type has its own Highlight() function which highlights the appropriate shape
        // 
        // @param object shape The shape to highlight
        //
        this.highlight = function (shape)
        {
            if (properties.tooltipsHighlight) {
                if (typeof properties.highlightStyle === 'function') {
                    (properties.highlightStyle)(shape);
                } else {

                    this.path(
                        'b r % % % % f % s %',
                        this.coords[0][0],this.coords[0][1],this.coords[0][2],this.coords[0][3],
                        properties.highlightFill,properties.highlightStroke
                    );

                    this.path(
                        'b r % % % % f % s %',
                        this.coords[0][0],this.coords[0][1],this.coords[0][2],this.coords[0][3],
                        properties.highlightFill,properties.highlightStroke
                    );
                }
            }
        };




        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors.colorsFill      = RGraph.arrayClone(properties.colorsFill);
                this.original_colors.colorsStroke    = RGraph.arrayClone(properties.colorsStroke);
                this.original_colors.highlightFill   = RGraph.arrayClone(properties.highlightFill);
                this.original_colors.highlightStroke = RGraph.arrayClone(properties.highlightStroke);
                this.original_colors.textColor       = RGraph.arrayClone(properties.textColor);
            }

            //
            // Parse various properties for colors
            //
            properties.colorsFill      = this.parseSingleColorForGradient(properties.colorsFill);
            properties.colorsStroke    = this.parseSingleColorForGradient(properties.colorsStroke);
            properties.highlightStroke = this.parseSingleColorForGradient(properties.highlightStroke);
            properties.highlightFill   = this.parseSingleColorForGradient(properties.highlightFill);
            properties.textColor       = this.parseSingleColorForGradient(properties.textColor);
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
            if (!color) {
                return color;
            }
    
            if (typeof color === 'string' && color.match(/^gradient\((.*)\)$/i)) {



                // Allow for JSON gradients
                if (color.match(/^gradient\(({.*})\)$/i)) {
                    return RGraph.parseJSONGradient({object: this, def: RegExp.$1});
                }

                // Create the gradient
                var parts = RegExp.$1.split(':'),
                    grad  = this.context.createLinearGradient(
                        this.x,
                        this.y,
                        this.x + this.metrics[0],
                        this.y
                    ),
                    diff = 1 / (parts.length - 1);
    
                grad.addColorStop(0, RGraph.trim(parts[0]));
    
                for (var j=1; j<parts.length; ++j) {
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
        // A worker function that handles Bar chart specific tooltip substitutions
        //
        this.tooltipSubstitutions = function (opt)
        {
            return {
                  index: 0,
                dataset: 0,
        sequentialIndex: 0,
                  value: null
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
                canvasXY = RGraph.getCanvasXY(obj.canvas);

            // Position the tooltip in the X direction
            args.tooltip.style.left = (
                canvasXY[0]                            // The X coordinate of the canvas
                - (tooltip.offsetWidth / 2)            // Subtract half of the tooltip width
                + obj.properties.tooltipsOffsetx       // Add any user defined offset
                + this.coords[0][0]
                + (this.coords[0][2] / 2)
            ) + 'px';

            args.tooltip.style.top  = (
                  canvasXY[1]                            // The Y coordinate of the canvas
                - tooltip.offsetHeight                   // The height of the tooltip
                + obj.properties.tooltipsOffsety         // Add any user defined offset
                + this.coords[0][1]
                 - 10
            ) + 'px';
        };








        //
        // Objects are now always registered so that the chart is redrawn if need be.
        //
        RGraph.register(this);








        //
        // the number of arguments is only one and it's an
        // object - parse it for configuration data and return.
        //
        RGraph.parseObjectStyleConfig(this, conf.options);
    };