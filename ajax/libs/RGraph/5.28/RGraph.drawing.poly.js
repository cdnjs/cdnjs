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
    RGraph.Drawing.Poly = function (conf)
    {
        var id                        = conf.id,
            coords                    = conf.coords;

        this.id                = id;
        this.canvas            = document.getElementById(this.id);
        this.context           = this.canvas.getContext('2d');
        this.colorsParsed      = false;
        this.canvas.__object__ = this;
        this.coords            = coords;
        this.coordsText        = [];
        this.original_colors   = [];
        this.firstDraw         = true; // After the first draw this will be false

        //
        // This defines the type of this shape
        //
        this.type = 'drawing.poly';


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
            linewidth:               1,

            colorsStroke:            'black',
            colorsFill:              'red',

            tooltips:                   null,
            tooltipsOverride:           null,
            tooltipsEffect:             'fade',
            tooltipsCssClass:           'RGraph_tooltip',
            tooltipsCss:                null,
            tooltipsEvent:              'onclick',
            tooltipsHighlight:          true,
            tooltipsFormattedPoint:     '.',
            tooltipsFormattedThousand:  ',',
            tooltipsFormattedDecimals:  0,
            tooltipsFormattedUnitsPre:  '',
            tooltipsFormattedUnitsPost: '',
            tooltipsFormattedListType:  'ul',
            tooltipsFormattedListItems: null,
            tooltipsPointer:            true,
            tooltipsPositionStatic:     true,

            highlightStroke:        'rgba(0,0,0,0)',
            highlightFill:          'rgba(255,255,255,0.7)',

            shadow:                  false,
            shadowColor:             'rgba(0,0,0,0.2)',
            shadowOffsetx:           3,
            shadowOffsety:           3,
            shadowBlur:              5,

            clearto:                 'rgba(0,0,0,0)'
        }

        //
        // A simple check that the browser has canvas support
        //
        if (!this.canvas) {
            alert('[DRAWING.POLY] No canvas support');
            return;
        }
        
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
        // A setter method for setting properties.
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
        // Draws the shape
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
            // Stop this growing uncontrollably
            //
            this.coordsText = [];




    
            //
            // DRAW THE SHAPE HERE
            //

            if (properties.shadow) {
                this.context.shadowColor   = properties.shadowColor;
                this.context.shadowOffsetX = properties.shadowOffsetx;
                this.context.shadowOffsetY = properties.shadowOffsety;
                this.context.shadowBlur    = properties.shadowBlur;
            }

            this.context.strokeStyle = properties.colorsStroke;
            this.context.fillStyle   = properties.colorsFill;

            this.drawPoly();
            
            this.context.lineWidth = properties.linewidth;
            RGraph.noShadow(this);
    
    
    
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
        // Draw the Poly but doesn't stroke or fill - that's left to other functions
        //
        this.drawPoly = function ()
        {
            var coords = this.coords;
            
            this.path('b m % %', coords[0][0], coords[0][1]);

            // Draw lines to subsequent coords
            for (var i=1,len=coords.length; i<len; ++i) {
                this.context.lineTo(coords[i][0],coords[i][1]);
            }

            // Close the path and stroke/fill it with whatever the current fill/stroke styles are
            this.path(
                'lw % c f % s %',
                properties.linewidth,
                this.context.fillStyle,
                this.context.strokeStyle
            );
        };




        //
        // Not used by the class during creating the graph, but is used by event handlers
        // to get the coordinates (if any) of the selected bar
        // 
        // @param object e The event object
        //
        this.getShape = function (e)
        {
            var coords  = this.coords,
                mouseXY = RGraph.getMouseXY(e),
                mouseX  = mouseXY[0],
                mouseY  = mouseXY[1];
    
            // Should redraw the poly but not stroke or fill it and then use isPointInPath() to test it
            // DON'T USE PATH OBJECT HERE
            
            // Need to save these so that they can be reset
            var old_strokestyle = this.context.strokeStyle,
                old_fillstyle   = this.context.fillStyle;
            
            this.context.beginPath();
                this.context.strokeStyle = 'rgba(0,0,0,0)';
                this.context.fillStyle = 'rgba(0,0,0,0)';
            this.drawPoly();
            
            // Reset the colors
            this.context.strokeStyle = old_strokestyle;
            this.context.fillStyle   = old_fillstyle;

    
            if (this.context.isPointInPath(mouseX, mouseY)) {

                if (RGraph.parseTooltipText && properties.tooltips) {
                    var tooltip = RGraph.parseTooltipText(properties.tooltips, 0);
                }

                return {
                    object: this,
                    coords: this.coords,
                   dataset: 0,
                     index: 0,
           sequentialIndex: 0,
                   tooltip: typeof tooltip === 'string' ? tooltip : null
                };
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
            // Evidentally this is necessary
            this.context.fillStyle = properties.colorsFill;

            // Close a path thats been left open.
            //
            // Taken out 17/11/19
            //
            // this.path(
            //     'c f % s %',
            //     properties.highlightFill,
            //     properties.highlightStroke
            // );

            // Add the new highlight
            if (properties.tooltipsHighlight) {
                if (typeof properties.highlightStyle === 'function') {
                    (properties.highlightStyle)(shape);
                } else {
                    this.path('b');
                    this.drawPoly();
                    this.path('f % s %', properties.highlightFill, properties.highlightStroke);
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
                this.original_colors.highlightStroke = RGraph.arrayClone(properties.highlightStroke);
                this.original_colors.highlightFill   = RGraph.arrayClone(properties.highlightFill);
            }

            var func = this.parseSingleColorForGradient;
    
            //
            // Parse various properties for colors
            //
            properties.colorsFill      = func(properties.colorsFill);
            properties.colorsStroke    = func(properties.colorsStroke);
            properties.highlightStroke = func(properties.highlightStroke);
            properties.highlightFill   = func(properties.highlightFill);
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
                    grad  = this.context.createLinearGradient(0,0,this.canvas.width,0),
                    diff  = 1 / (parts.length - 1);
    
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

            // Calculate the minimum X coordinate
            for (var i=0,minx=this.coords[0][0],maxx=0,miny=this.coords[0][1],maxy=0; i<this.coords.length; ++i) {
                // Find the minimum and maximum X coordinate
                minx = Math.min(minx, this.coords[i][0]);
                maxx = Math.max(maxx, this.coords[i][0]);
                
                // Find the minimum and maximum Y coordinate
                miny = Math.min(miny, this.coords[i][1]);
                maxy = Math.max(maxy, this.coords[i][1]);
            }

            var x = ((maxx - minx) / 2) + minx,
                y = ((maxy - miny) / 2) + miny;

            // Position the tooltip in the X direction
            args.tooltip.style.left = (
                canvasXY[0]                            // The X coordinate of the canvas
                - (tooltip.offsetWidth / 2)            // Subtract half of the tooltip width
                + obj.properties.tooltipsOffsetx       // Add any user defined offset
                + x
            ) + 'px';

            args.tooltip.style.top  = (
                  canvasXY[1]                            // The Y coordinate of the canvas
                - tooltip.offsetHeight                   // The height of the tooltip
                + obj.properties.tooltipsOffsety         // Add any user defined offset
                + y
                 - 10
            ) + 'px';
        };








        //
        // Objects are now always registered so that the chart is redrawn if need be.
        //
        RGraph.register(this);




        //
        // This is the 'end' of the constructor so if the first argument
        // contains configuration data - handle that.
        //
        RGraph.parseObjectStyleConfig(this, conf.options);
    };