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
    // Initialise the various objects
    //
    RGraph = window.RGraph || {isrgraph:true,isRGraph: true,rgraph:true};

    //
    // The constructor
    //
    RGraph.starburst =
    RGraph.Starburst =
    RGraph.StarBurst = function (conf)
    {
        var id                 = conf.id,
            canvas             = document.getElementById(id);

        // Get the canvas and context objects
        this.id                = id;
        this.canvas            = canvas;
        this.context           = this.canvas.getContext('2d');
        this.type              = 'starburst';
        this.imageCache        = [];
        this.frame             = 1;
        this.rotatedAngle      = (0 - (Math.PI / 2));
        this.isRGraph          = true;
        this.isrgraph          = true;
        this.rgraph            = true;

        this.properties =
        {
            colors:             ['white','#666'],
            
            radius:             500,
            delay:              null,
            segments:           12,
            centerx:            null,
            centery:            null,
            
            callback:           null,
            
            animationStep:      0.0005,

            radiusMultiplier:   0,
            radiusIncrement:    0.01,

            image:              null,
            imageHalign:        'center',
            imageValign:        'center',
            imageScale:         1,
            imageX:             null,
            imageY:             null,
            imageW:             null,
            imageH:             null,
            imageShadow:        false,
            imageShadowOffsetx: 3,
            imageShadowOffsety: 3,
            imageShadowColor:   '#666',
            imageShadowBlur:    3,
        };



        var prop       = this.properties;
        var properties = this.properties;








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








        // Returns the requested property
        this.get = function (name)
        {
            return properties[name];
        }








        //
        // The main draw function that gets everything going
        //
        this.draw = function ()
        {
            // Determine the starting angle
            var start = (0 - (Math.PI / 2)) + ((properties.frame / (180 / Math.PI) / 10));

            if (this.isNull(properties.centerx)) properties.centerx = canvas.width / 2;
            if (this.isNull(properties.centery)) properties.centery = canvas.height / 2;

            // Start by clearing the canvas
            this.context.clearRect(-5,-5, this.canvas.width + 10, this.canvas.height + 10);
    
    
            var grad = this.context.createRadialGradient(properties.centerx, properties.centery, 0, properties.centerx, properties.centery, properties.radius);
            grad.addColorStop(0,properties.colors[0]);
    
            for (var i=1,len=properties.colors.length; i<len; ++i) {
                grad.addColorStop((1 / (len - 1)) * i, properties.colors[i]);
            }
    

            // The main loop that does the drawing
            for (var i=0; i<(properties.segments * 2); ++i) {

                this.startAngle  = this.rotatedAngle + (((360 / (properties.segments * 2)) * i) / (180 / Math.PI) );
                this.endAngle    = this.startAngle + (((360 / (properties.segments * 2))) / (180 / Math.PI) ),
                color            = (i % 2 === 0 ? grad : 'rgba(0,0,0,0)');
                this.startAngle += this.frame * properties.animationStep;
                this.endAngle   += this.frame * properties.animationStep;

                // This draws an arm of the StarBurst
                this.context.beginPath();
                this.context.fillStyle = color;
                this.context.moveTo(properties.centerx, properties.centery);
                this.context.arc(
                    properties.centerx,
                    properties.centery,
                    properties.radius  * (properties.animationStep === 0 ? 1 : properties.radiusMultiplier),
                    this.startAngle,
                    this.endAngle,
                    false
                );
                this.context.fill();
            }
            
            
            
            
            
            
            
            
            //
            // Draw an image if one is specified
            //
            if (properties.image) {
    
                //
                // If there was an image specified then load it if it isn't
                // cached and then draw it on the canvas
                //
                if (properties.image && !this.imageCache[properties.image]) {
                    this.imageCache[properties.image] = new Image();
                    this.imageCache[properties.image].src = properties.image;
                    
                    var obj = this;
                    this.imageCache[properties.image].onload = function ()
                    {
                        obj.draw();
                    };
                    return;
                }
        
                var frameMultiplier = Math.min(1, properties.frame);                
                
                // Work out the image coordinates
                if (!this.imageCoordsCalculated) {

                    //
                    // Centered alignment
                    //
                    var imageX = properties.centerx,
                        imageY = properties.centery,
                        imageW = this.imageCache[properties.image].width * properties.imageScale,
                        imageH = this.imageCache[properties.image].height * properties.imageScale;

                    // Custom coords given
                    if (typeof properties.imageX === 'number') imageX = properties.imageX;
                    if (typeof properties.imageY === 'number') imageY = properties.imageY;
                    if (typeof properties.imageW === 'number') imageW = properties.imageW;
                    if (typeof properties.imageH === 'number') imageH = properties.imageH;



                    if (properties.imageHalign === 'right')  {
                        imageX = imageX - imageW;
                    } else if (properties.imageHalign === 'left') {
                        imageX = imageX;
                    } else {
                        imageX = imageX - (imageW / 2);
                    }

                    // Handle valign being top or bottom
                    if (properties.imageValign === 'bottom') {
                        imageY = imageY - imageH;
                    } else if (properties.imageValign === 'top') {
                        imageY = imageY;
                    } else {
                        imageY = imageY - (imageH / 2);
                    }


                    properties.imageX = imageX;
                    properties.imageY = imageY;
                    properties.imageW = imageW;
                    properties.imageH = imageH;

                    // Don't do this again
                    this.imageCoordsCalculated = true;
                }

        
        
        
                // Add shadow if necessary
                if (properties.imageShadow) {
                    this.context.shadowOffsetX = properties.imageShadowOffsetx;
                    this.context.shadowOffsetY = properties.imageShadowOffsety;
                    this.context.shadowColor   = properties.imageShadowColor;
                    this.context.shadowBlur    = properties.imageShadowBlur;
                }
        

                // Call the canvas API drawImage function
                this.context.drawImage(
                    this.imageCache[properties.image],
                    properties.imageX,
                    properties.imageY,
                    properties.imageW,
                    properties.imageH
                );
                
                // If the shadow is enabled turn it off
                if (properties.imageShadow) {
                    this.context.shadowOffsetX = 0;
                    this.context.shadowOffsetY = 0;
                    this.context.shadowColor   = 'rgba(0,0,0,0)';
                    this.context.shadowBlur    = 0;
                }
            }
    
    
    
    
    
    
    
    
    
    
    
            // Call the user defined function that was passed into the
            // function. The callback.
            if (typeof properties.callback === 'function') {
                var callbackReturn = properties.callback(this);
            }
    
    
    
    
    
    
    
    
    
    
    
    
            // Increment the frame counter
            this.frame = ++this.frame;

            // Update the radiusMultiplier
            if (properties.radiusMultiplier < 1) {
                properties.radiusMultiplier += properties.radiusIncrement;
            }
    
            // Call the StarBurst() function again after a small delay
            if (callbackReturn !== false && properties.animationStep !== 0) {

                var obj = this;            
            
                if (window.requestAnimationFrame && this.isNull(properties.delay)) {
                    window.requestAnimationFrame(function ()
                    {
                        obj.draw();
                    })
                } else {

                    setTimeout(function ()
                    {
                        obj.draw();
                    }, properties.delay);
                } // end if
            } // end if
            
            // Facilitate chaining
            return this;

        } // end draw function








        //
        // Returns true/false as to whether the given variable is null or not
        // 
        // @param mixed arg The argument to check
        //
        this.isNull = function (arg)
        {
            // MUST BE DOUBLE EQUALS FOR THE FIRST TEST - NOT TRIPLE
            if (arg == null || typeof arg === 'object' && !arg) {
                return true;
            }
            
            return false;
        }; // End RGraph.isNull function









        // Set the configuration properties
        for (var i in conf.options) {
            if (typeof i === 'string') {
                this.set(i, conf.options[i]);
            }
        }

        // This facilitates chaining
        return this;

    }; // end RGraph.StarBurst function