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
    // The odometer constructor. Pass it the ID of the canvas tag, the start value of the odo,
    // the end value, and the value that the pointer should point to.
    //
    RGraph.Odometer = function (conf)
    {
        var id                 = conf.id;
        var canvas             = document.getElementById(id);
        var min                = conf.min;
        var max                = conf.max;
        var value              = conf.value;

        this.id                = id;
        this.canvas            = canvas;
        this.context           = this.canvas.getContext ? this.canvas.getContext("2d", {alpha: (typeof id === 'object' && id.alpha === false) ? false : true}) : null;
        this.canvas.__object__ = this;
        this.type              = 'odo';
        this.isRGraph          = true;
        this.isrgraph          = true;
        this.rgraph            = true;
        this.min               = RGraph.stringsToNumbers(min);
        this.max               = RGraph.stringsToNumbers(max);
        this.value             = RGraph.stringsToNumbers(value);
        this.currentValue      = null;
        this.uid               = RGraph.createUID();
        this.canvas.uid        = this.canvas.uid ? this.canvas.uid : RGraph.createUID();
        this.colorsParsed      = false;
        this.coordsText        = [];
        this.original_colors   = [];
        this.firstDraw         = true; // After the first draw this will be false



        this.properties =
        {
            backgroundBorder:          'black',
            backgroundColor:           '#eee',
            backgroundLinesColor:      '#ddd',
            
            centerx:                   null,
            centery:                   null,
            radius:                    null,

            labelsMargin:              35,
            labelsFont:                null,
            labelsSize:                null,
            labelsColor:               null,
            labelsBold:                null,
            labelsItalic:              null,
            labelsValue:               false,
            labelsValueDecimals:       0,
            labelsValuePoint:          '.',
            labelsValueThousand:       ',',
            labelsValueUnitsPre:       '',
            labelsValueUnitsPost:      '',
            labelsValueFont:           null,
            labelsValueSize:           null,
            labelsValueColor:          null,
            labelsValueBold:           null,
            labelsValueItalic:         null,
            labelsValueOffsetx:        0,
            labelsValueOffsety:        0,

            needleColor:               'black',
            needleWidth:               2,
            needleHead:                true,
            needleTail:                true,
            needleType:                'pointer',
            needleExtra:               [],
            needleTriangleBorder:      '#aaa',

            textSize:                  12,
            textColor:                 'black',
            textFont:                  'Arial, Verdana, sans-serif',
            textBold:                  false,
            textItalic:                false,
            textAccessible:            false,
            textAccessibleOverflow:    'visible',
            textAccessiblePointerevents: false,

            colorsGreenMax:            max * 0.75,
            colorsGreenColor:          'Gradient(white:#0c0)',
            colorsYellowColor:         'Gradient(white:#ff0)',
            colorsRedMin:              max * 0.9,
            colorsRedColor:            'Gradient(white:#f00)',

            marginLeft:                35,
            marginRight:               35,
            marginTop:                 35,
            marginBottom:              35,

            title:                     '',
            titleBackground:           null,
            titleHpos:                 null,
            titleVpos:                 null,
            titleFont:                 null,
            titleBold:                 null,
            titleItalic:               null,
            titleSize:                 null,
            titleColor:                null,
            titleX:                    null,
            titleY:                    null,
            titleHalign:               null,
            titleValign:               null,
            titleOffsetx:              0,
            titleOffsety:              0,
            
            contextmenu:               null,

            linewidth:                 1,
            
            shadowInner:               false,
            shadowInnerColor:          'black',
            shadowInnerOffsetx:        3,
            shadowInnerOffsety:        3,
            shadowInnerBlur:           6,
            shadowOuter:               false,
            shadowOuterColor:          'black',
            shadowOuterOffsetx:        3,
            shadowOuterOffsety:        3,
            shadowOuterBlur:           6,
            
            annotatable:               false,
            annotatableColor:          'black',
            
            scaleDecimals:             0,
            scalePoint:                '.',
            scaleThousand:             ',',
            scaleUnitsPre:             '',
            scaleUnitsPost:            '',
            scaleZerostart:            false,
            
            resizable:                 false,
            resizableHandleAdjust:     [0,0],
            resizableHandleBackground: null,
            
            border:                    true,
            borderColor1:              '#BEBCB0',
            borderColor2:              '#F0EFEA',
            borderColor3:              '#BEBCB0',

            tickmarks:                 false,
            tickmarksHighlighted:      true,
            tickmarksLargeColor:       '#999',

            labels:                    null,

            key:                       null,
            keyBackground:             'white',
            keyPosition:               'graph',
            keyShadow:                 false,
            keyShadowColor:            '#666',
            keyShadowBlur:             3,
            keyShadowOffsetx:          2,
            keyShadowOffsety:          2,
            keyPositionMarginBoxed:    false,
            keyPositionX:              null,
            keyPositionY:              null,
            keyHalign:                 'right',
            keyColorShape:             'square',
            keyRounded:                true,
            keyColors:                 null,
            keyLabelsSize:             null,
            keyLabelsFont:             null,
            keyLabelsColor:            null,
            keyLabelsBold:             null,
            keyLabelsItalic:           null,
            keyLabelsOffsetx:          0,
            keyLabelsOffsety:          0,

            adjustable:                false,

            clearto:                   'rgba(0,0,0,0)'
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
        // A peudo setter
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
        // Draws the odometer
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
            // Set the current value
            //
            this.currentValue = this.value;
    
            //
            // No longer allow values outside the range of the Odo
            //
            if (this.value > this.max) {
                this.value = this.max;
            }
    
            if (this.value < this.min) {
                this.value = this.min;
            }



            //
            // Make the margins easy ro access
            //            
            this.marginLeft   = properties.marginLeft;
            this.marginRight  = properties.marginRight;
            this.marginTop    = properties.marginTop;
            this.marginBottom = properties.marginBottom;
    
            // Work out a few things
            this.radius   = Math.min(
                (this.canvas.width - this.marginLeft - this.marginRight) / 2,
                (this.canvas.height - this.marginTop - this.marginBottom) / 2
            ) - (properties.border ? 25 : 0);

            this.diameter   = 2 * this.radius;
            this.centerx    = ((this.canvas.width - this.marginLeft- this.marginRight) / 2) + this.marginLeft;
            this.centery    = ((this.canvas.height - this.marginTop - this.marginBottom) / 2) + this.marginTop;
            this.range      = this.max - this.min;
            this.coordsText = [];
            
            //
            // Move the centerx if the key is defined
            //
            if (properties.key && properties.key.length > 0 && this.canvas.width > this.canvas.height) this.centerx = 5 + this.radius;
            if (typeof properties.centerx === 'number') this.centerx = properties.centerx;
            if (typeof properties.centery === 'number') this.centery = properties.centery;
    
            
            //
            // Allow custom setting of the radius
            //
            if (typeof properties.radius === 'number') {
                this.radius = properties.radius;
                
                if (properties.border) {
                    this.radius -= 25;
                }
            }
    
    
            //
            // Parse the colors for gradients. Its down here so that the center X/Y can be used
            //
            if (!this.colorsParsed) {
    
                this.parseColors();
    
                // Don't want to do this again
                this.colorsParsed = true;
            }
    
    
    
            this.context.lineWidth = properties.linewidth;
    
            // Draw the background
            this.drawBackground();
    
            // And lastly, draw the labels
            this.drawLabels();
    
            // Draw the needle
            this.drawNeedle(this.value, properties.needleColor);
            
            //
            // Draw any extra needles
            //
            if (properties.needleExtra.length > 0) {
                for (var i=0; i<properties.needleExtra.length; ++i) {
                    var needle = properties.needleExtra[i];
                    this.drawNeedle(needle[0], needle[1], needle[2]);
                }
            }

            //
            // Draw the key if requested
            //
            if (properties.key && properties.key.length > 0) {
                // Build a colors array out of the needle colors
                var colors = [properties.needleColor];
                
                if (properties.needleExtra.length > 0) {
                    for (var i=0; i<properties.needleExtra.length; ++i) {
                        var needle = properties.needleExtra[i];
                        colors.push(needle[1]);
                    }
                }
    
                RGraph.drawKey(this, properties.key, colors);
            }
            
            
            //
            // Setup the context menu if required
            //
            if (properties.contextmenu) {
                RGraph.showContext(this);
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
        // Draws the background
        //
        this.drawBackground = function ()
        {
            this.context.beginPath();

            //
            // Turn on the shadow if need be
            //
            if (properties.shadowOuter) {
                RGraph.setShadow(
                    this,
                    properties.shadowOuterColor,
                    properties.shadowOuterOffsetx,
                    properties.shadowOuterOffsety,
                    properties.shadowOuterBlur
                );
            }
    
            var backgroundColor = properties.backgroundColor;
    
            // Draw the grey border
            this.context.fillStyle = backgroundColor;
            this.context.arc(this.centerx, this.centery, this.radius, 0.0001, RGraph.TWOPI, false);
            this.context.fill();
    
            //
            // Turn off the shadow
            //
            RGraph.noShadow(this);

    
            // Draw a circle
            this.context.strokeStyle = '#666';
            this.context.arc(this.centerx, this.centery, this.radius, 0, RGraph.TWOPI, false);
    
            // Now draw a big white circle to make the lines appear as tick marks
            // This is solely for Chrome
            this.context.fillStyle = backgroundColor;
            this.context.arc(this.centerx, this.centery, this.radius, 0, RGraph.TWOPI, false);
            this.context.fill();
    
            //
            // Draw more tickmarks
            //
            if (properties.tickmarks) {
                this.context.beginPath();
                this.context.strokeStyle = '#bbb';
            
                for (var i=0; i<=360; i+=3) {
                    this.context.arc(this.centerx, this.centery, this.radius, 0, i / 57.3, false);
                    this.context.lineTo(this.centerx, this.centery);
                }
                this.context.stroke();
            }
    
            this.context.beginPath();
            this.context.lineWidth   = 1;
            this.context.strokeStyle = 'black';
    
            // Now draw a big white circle to make the lines appear as tick marks
            this.context.fillStyle   = backgroundColor;
            this.context.strokeStyle = backgroundColor;
            this.context.arc(this.centerx, this.centery, this.radius - 5, 0, RGraph.TWOPI, false);
            this.context.fill();
            this.context.stroke();

            // Gray lines at 18 degree intervals
            this.context.beginPath();
            this.context.strokeStyle = properties.backgroundLinesColor;
            for (var i=0; i<360; i+=18) {
                this.context.arc(this.centerx, this.centery, this.radius, 0, RGraph.toRadians(i), false);
                this.context.lineTo(this.centerx, this.centery);
            }
            this.context.stroke();

            // Redraw the outer circle
            this.context.beginPath();
            this.context.strokeStyle = properties.backgroundBorder;
            this.context.arc(this.centerx, this.centery, this.radius, 0, RGraph.TWOPI, false);
            this.context.stroke();
    
            //
            // Now draw the center bits shadow if need be
            //
            if (properties.shadowInner) {
                this.context.beginPath();
                RGraph.setShadow(
                    this,
                    properties.shadowInnerColor,
                    properties.shadowInnerOffsetx,
                    properties.shadowInnerOffsety,
                    properties.shadowInnerBlur
                );
                this.context.arc(this.centerx, this.centery, this.radius - properties.labelsMargin, 0, RGraph.TWOPI, 0);
                this.context.fill();
                this.context.stroke();
        
                //
                // Turn off the shadow
                //
                RGraph.noShadow(this);
            }
    
            //
            // Draw the green area
            //
            var greengrad = properties.colorsGreenColor;
    
            // Draw the "tick highlight"
            if (properties.tickmarksHighlighted) {
                this.context.beginPath();
                this.context.lineWidth = 5;
                this.context.strokeStyle = greengrad;
                this.context.arc(this.centerx, this.centery, this.radius - 2.5,
                
                    -1 * RGraph.HALFPI,
                    (((properties.colorsGreenMax - this.min)/ (this.max - this.min)) * RGraph.TWOPI) - RGraph.HALFPI,
                    0);
    
                this.context.stroke();
                
                this.context.lineWidth = 1;
            }

            this.context.beginPath();
                this.context.fillStyle = greengrad;
                this.context.arc(
                        this.centerx,
                        this.centery,
                        this.radius - properties.labelsMargin,
                        0 - RGraph.HALFPI,
                        (((properties.colorsGreenMax - this.min)/ (this.max - this.min)) * RGraph.TWOPI) - RGraph.HALFPI,
                        false
                       );
                this.context.lineTo(this.centerx, this.centery);
            this.context.closePath();
            this.context.fill();
    
    
            //
            // Draw the yellow area
            //
            var yellowgrad = properties.colorsYellowColor;
    
            // Draw the "tick highlight"
            if (properties.tickmarksHighlighted) {
                this.context.beginPath();
                this.context.lineWidth = 5;
                this.context.strokeStyle = yellowgrad;
                this.context.arc(this.centerx, this.centery, this.radius - 2.5, (
                
                    ((properties.colorsGreenMax - this.min) / (this.max - this.min)) * RGraph.TWOPI) - RGraph.HALFPI,
                    (((properties.colorsRedMin - this.min) / (this.max - this.min)) * RGraph.TWOPI) - RGraph.HALFPI,
                    0);
    
                this.context.stroke();
                
                this.context.lineWidth = 1;
            }
    
            this.context.beginPath();
                this.context.fillStyle = yellowgrad;
                this.context.arc(
                        this.centerx,
                        this.centery,
                        this.radius - properties.labelsMargin,
                        ( ((properties.colorsGreenMax - this.min) / (this.max - this.min)) * RGraph.TWOPI) - RGraph.HALFPI,
                        ( ((properties.colorsRedMin - this.min) / (this.max - this.min)) * RGraph.TWOPI) - RGraph.HALFPI,
                        false
                       );
                this.context.lineTo(this.centerx, this.centery);
            this.context.closePath();
            this.context.fill();
    
            //
            // Draw the red area
            //
            var redgrad = properties.colorsRedColor;
    
            // Draw the "tick highlight"
            if (properties.tickmarksHighlighted) {
                this.context.beginPath();
                this.context.lineWidth = 5;
                this.context.strokeStyle = redgrad;
                this.context.arc(this.centerx, this.centery, this.radius - 2.5,(((properties.colorsRedMin - this.min) / (this.max - this.min)) * RGraph.TWOPI) - RGraph.HALFPI,RGraph.TWOPI - RGraph.HALFPI,0);
                this.context.stroke();
                
                this.context.lineWidth = 1;
            }

            this.context.beginPath();
                this.context.fillStyle = redgrad;
                this.context.strokeStyle = redgrad;
                this.context.arc(
                        this.centerx,
                        this.centery,
                        this.radius - properties.labelsMargin,
                        (((properties.colorsRedMin - this.min) / (this.max - this.min)) * RGraph.TWOPI) - RGraph.HALFPI,
                        RGraph.TWOPI - RGraph.HALFPI,
                        false
                       );
                this.context.lineTo(this.centerx, this.centery);
            this.context.closePath();
            this.context.fill();
    
    
            //
            // Draw the thick border
            //
            if (properties.border) {
    
                var grad = this.context.createRadialGradient(this.centerx, this.centery, this.radius, this.centerx, this.centery, this.radius + 20);
                grad.addColorStop(0, properties.borderColor1);
                grad.addColorStop(0.5, properties.borderColor2);
                grad.addColorStop(1, properties.borderColor3);
    
                
                this.context.beginPath();
                    this.context.fillStyle   = grad;
                    this.context.strokeStyle = 'rgba(0,0,0,0)'
                    this.context.lineWidth   = 0.001;
                    this.context.arc(this.centerx, this.centery, this.radius + 20, 0, RGraph.TWOPI, 0);
                    this.context.arc(this.centerx, this.centery, this.radius - 2, RGraph.TWOPI, 0, 1);
                this.context.fill();
            }
            
            // Put the linewidth back to what it was
            this.context.lineWidth = properties.linewidth;
    
    
            //
            // Draw the title if specified
            //
            if (properties.title) {
                RGraph.drawTitle(
                    this,
                    properties.title,
                    this.centery - this.radius,
                    null,
                    properties.titleSize ? properties.titleSize : properties.textSize + 2
                );
            }
    

            // Draw the big tick marks
            if (!properties.tickmarksHighlighted) {
                for (var i=18; i<=360; i+=36) {
                    this.context.beginPath();
                        this.context.strokeStyle = properties.tickmarksLargeColor;
                        this.context.lineWidth = 2;
                        this.context.arc(this.centerx, this.centery, this.radius - 1, RGraph.toRadians(i), RGraph.toRadians(i+0.01), false);
                        this.context.arc(this.centerx, this.centery, this.radius - 7, RGraph.toRadians(i), RGraph.toRadians(i+0.01), false);
                    this.context.stroke();
                }
            }
        };








        //
        // Draws the needle of the odometer
        // 
        // @param number value The value to represent
        // @param string color The color of the needle
        // @param number       The OPTIONAL length of the needle
        //
        this.drawNeedle = function (value, color)
        {
            // The optional length of the needle
            var length = arguments[2] ? arguments[2] : this.radius - properties.labelsMargin;
    
            // ===== First draw a grey background circle =====
            
            this.context.fillStyle = '#999';
    
            this.context.beginPath();
                this.context.moveTo(this.centerx, this.centery);
                this.context.arc(this.centerx, this.centery, 10, 0, RGraph.TWOPI, false);
                this.context.fill();
            this.context.closePath();
    
            this.context.fill();
    
            // ===============================================
            
            this.context.fillStyle = color
            this.context.strokeStyle = '#666';
    
            // Draw the centre bit
            this.context.beginPath();
                this.context.moveTo(this.centerx, this.centery);
                this.context.arc(this.centerx, this.centery, 8, 0, RGraph.TWOPI, false);
                this.context.fill();
            this.context.closePath();
            
            this.context.stroke();
            this.context.fill();
    
            if (properties.needleType == 'pointer') {
    
                this.context.strokeStyle = color;
                this.context.lineWidth   = properties.needleWidth;
                this.context.lineCap     = 'round';
                this.context.lineJoin    = 'round';
                
                // Draw the needle
                this.context.beginPath();
                    // The trailing bit on the opposite side of the dial
                    this.context.beginPath();
                        this.context.moveTo(this.centerx, this.centery);
                        
                        if (properties.needleTail) {
    
                            this.context.arc(this.centerx,
                                   this.centery,
                                   20,
                                    (((value / this.range) * 360) + 90) / (180 / RGraph.PI),
                                   (((value / this.range) * 360) + 90 + 0.01) / (180 / RGraph.PI), // The 0.01 avoids a bug in ExCanvas and Chrome 6
                                   false
                                  );
                        }
    
                    // Draw the long bit on the opposite side
                    this.context.arc(this.centerx,
                            this.centery,
                            length - 10,
                            (((value / this.range) * 360) - 90) / (180 / RGraph.PI),
                            (((value / this.range) * 360) - 90 + 0.1 ) / (180 / RGraph.PI), // The 0.1 avoids a bug in ExCanvas and Chrome 6
                            false
                           );
                this.context.closePath();
                
                //this.context.stroke();
                //this.context.fill();
            
    
            } else if (properties.needleType == 'triangle') {
    
                this.context.lineWidth = 0.01;
                this.context.lineEnd  = 'square';
                this.context.lineJoin = 'miter';
    
                //
                // This draws the version of the pointer that becomes the border
                //
                this.context.beginPath();
                    this.context.fillStyle = properties.needleTriangleBorder;
                    this.context.arc(this.centerx, this.centery, 11, (((value / this.range) * 360)) / 57.3, ((((value / this.range) * 360)) + 0.01) / 57.3, 0);
                    this.context.arc(this.centerx, this.centery, 11, (((value / this.range) * 360) + 180) / 57.3, ((((value / this.range) * 360) + 180) + 0.01)/ 57.3, 0);
                    this.context.arc(this.centerx, this.centery, length - 5, (((value / this.range) * 360) - 90) / 57.3, ((((value / this.range) * 360) - 90) / 57.3) + 0.01, 0);
                this.context.closePath();
                this.context.fill();
    
                this.context.beginPath();
                this.context.arc(this.centerx, this.centery, 15, 0, RGraph.TWOPI, 0);
                this.context.closePath();
                this.context.fill();
    
                // This draws the pointer
                this.context.beginPath();
                this.context.strokeStyle = 'black';
                this.context.fillStyle = color;
                this.context.arc(this.centerx, this.centery, 7, (((value / this.range) * 360)) / 57.3, ((((value / this.range) * 360)) + 0.01) / 57.3, 0);
                this.context.arc(this.centerx, this.centery, 7, (((value / this.range) * 360) + 180) / 57.3, ((((value / this.range) * 360) + 180) + 0.01)/ 57.3, 0);
                this.context.arc(this.centerx, this.centery, length - 13, (((value / this.range) * 360) - 90) / 57.3, ((((value / this.range) * 360) - 90) / 57.3) + 0.01, 0);
                this.context.closePath();
                this.context.stroke();
                this.context.fill();


                //
                // This is here to accommodate the MSIE/ExCanvas combo
                //
                this.context.beginPath();
                this.context.arc(this.centerx, this.centery, 7, 0, RGraph.TWOPI, 0);
                this.context.closePath();
                this.context.fill();
            }
    
    
            this.context.stroke();
            this.context.fill();
    
            // Draw the mini center circle
            this.context.beginPath();
            this.context.fillStyle = color;
            this.context.arc(this.centerx, this.centery, properties.needleType == 'pointer' ? 7 : 12, 0.01, RGraph.TWOPI, false);
            this.context.fill();
    
            // This draws the arrow at the end of the line
            if (properties.needleHead && properties.needleType == 'pointer') {
                this.context.lineWidth = 1;
                this.context.fillStyle = color;
    
                // round, bevel, miter
                this.context.lineJoin = 'miter';
                this.context.lineCap  = 'butt';
    
                this.context.beginPath();
                    this.context.arc(this.centerx, this.centery, length - 5, (((value / this.range) * 360) - 90) / 57.3, (((value / this.range) * 360) - 90 + 0.1) / 57.3, false);
    
                    this.context.arc(this.centerx,
                           this.centery,
                           length - 20,
                           RGraph.toRadians( ((value / this.range) * 360) - (length < 60 ? 80 : 85) ),
                           RGraph.toRadians( ((value / this.range) * 360) - (length < 60 ? 100 : 95) ),
                           1);
                this.context.closePath();
        
                this.context.fill();
                //this.context.stroke();
            }


            //
            // Draw a white circle at the centre
            //
            this.context.beginPath();
            this.context.fillStyle = 'gray';
            this.context.moveTo(this.centerx, this.centery);
            this.context.arc(this.centerx,this.centery,2,0,6.2795,false);
            this.context.closePath();
    
            this.context.fill();
        };








        //
        // Draws the labels for the Odo
        //
        this.drawLabels = function ()
        {
            var centerx    = this.centerx,
                centery    = this.centery,
                r          = this.radius - (properties.labelsMargin / 2) - 5,
                start      = this.min,
                end        = this.max,
                decimals   = properties.scaleDecimals,
                point      = properties.scalePoint, 
                thousand   = properties.scaleThousand,
                labels     = properties.labels,
                units_pre  = properties.scaleUnitsPre,
                units_post = properties.scaleUnitsPost;
    
            this.context.beginPath();
            this.context.fillStyle = properties.textColor;
            
            var textConf = RGraph.getTextConf({
                object: this,
                prefix: 'labels'
            });

            //
            // If labels are specified, use those
            //
            if (labels) {
                for (var i=0; i<labels.length; ++i) {

                    RGraph.text({
						
                   object: this,

                     font: textConf.font,
                     size: textConf.size,
                    color: textConf.color,
                     bold: textConf.bold,
                   italic: textConf.italic,

                        x:      centerx + (Math.cos(((i / labels.length) * RGraph.TWOPI) - RGraph.HALFPI) * (this.radius - (properties.labelsMargin / 2) ) ), // Sin A = Opp / Hyp
                        y:      centery + (Math.sin(((i / labels.length) * RGraph.TWOPI) - RGraph.HALFPI) * (this.radius - (properties.labelsMargin / 2) ) ), // Cos A = Adj / Hyp
                        text:   String(labels[i]),
                        valign: 'center',
                        halign: 'center',
                        tag:    'labels'
                    });
                }
    
            //
            // If not, use the maximum value
            //
            } else {

                this.scale2 = RGraph.getScale({object: this, options: {
                    'scale.max':          this.max,
                    'scale.strict':       true,
                    'scale.min':          this.min,
                    'scale.thousand':     properties.scaleThousand,
                    'scale.point':        properties.scalePoint,
                    'scale.decimals':     properties.scaleDecimals,
                    'scale.labels.count': 10,
                    'scale.round':        false,
                    'scale.units.pre':    properties.scaleUnitsPre,
                    'scale.units.post':   properties.scaleUnitsPost
                }});

                RGraph.text({object:this,font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx + (0.588 * r ),y:centery - (0.809 * r ),text:RGraph.numberFormat({object: this, number: (((end - start) * (1/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:36,tag: 'scale'});
                RGraph.text({object:this,font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx + (0.951 * r ),y:centery - (0.309 * r),text:RGraph.numberFormat({object: this, number: (((end - start) * (2/10)) + start).toFixed(decimals), unitspre:units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:72,tag: 'scale'});
                RGraph.text({object:this,font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx + (0.949 * r),y:centery + (0.31 * r),text:RGraph.numberFormat({object: this, number: (((end - start) * (3/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:108,tag: 'scale'});
                RGraph.text({object:this,font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx + (0.588 * r ),y:centery + (0.809 * r ),text:RGraph.numberFormat({object: this, number: (((end - start) * (4/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:144,tag: 'scale'});
                RGraph.text({object:this,font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx,y:centery + r,text:RGraph.numberFormat({object: this, number: (((end - start) * (5/10)) + start).toFixed(decimals),unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:180,tag: 'scale'});
    
                RGraph.text({object:this,font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx - (0.588 * r ),y:centery + (0.809 * r ),text:RGraph.numberFormat({object: this, number: (((end - start) * (6/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:216,tag: 'scale'});
                RGraph.text({object:this,font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx - (0.949 * r),y:centery + (0.300 * r),text:RGraph.numberFormat({object: this, number: (((end - start) * (7/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:252,tag: 'scale'});
                RGraph.text({object:this,font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx - (0.951 * r),y:centery - (0.309 * r),text:RGraph.numberFormat({object: this, number: (((end - start) * (8/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:288,tag: 'scale'});
                RGraph.text({object:this,font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx - (0.588 * r ),y:centery - (0.809 * r ),text:RGraph.numberFormat({object: this, number: (((end - start) * (9/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',angle:324,tag: 'scale'});
                RGraph.text({object:this,font: textConf.font, size: textConf.size, color: textConf.color, bold: textConf.bold, italic: textConf.italic,x:centerx,y:centery - r,text: RGraph.numberFormat({object: this, number: (((end - start) * (10/10)) + start).toFixed(decimals), unitspre: units_pre, unitspost: units_post,point: point,thousand: thousand}),halign:'center',valign:'center',tag: 'scale'});
            }
            
            this.context.fill();

            //
            // Draw the text label below the center point
            //
            if (properties.labelsValue) {
                this.context.strokeStyle = 'black';
    
                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'labelsValue'
                });

                RGraph.text({
                    
               object: this,

                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:            centerx + properties.labelsValueOffsetx,
                    y:            centery + textConf.size + 15 + properties.labelsValueOffsety,

                    text:         RGraph.numberFormat({
                                      object:    this,
                                      number:    this.value.toFixed(this.value === 0 ? 0 : properties.labelsValueDecimals),
                                      unitspre:  properties.labelsValueUnitsPre,
                                      unitspost: properties.labelsValueUnitsPost,
                                      point:     properties.labelsValuePoint,
                                      thousand:  properties.labelsValueThousand
                                  }),

                    halign:       'center',
                    valign:       'center',

                    bounding:     true,
                    boundingFill: 'rgba(255,255,255,0.7)',
                    boundingStroke: 'rgba(0,0,0,0)',
                    tag:          'value.text'
                });
            }
        };








        //
        // A placeholder function
        // 
        // @param object The event object
        //
        this.getShape = function (e) {};








        //
        // This function returns the pertinent value at the point of click
        // 
        // @param object The event object
        //
        this.getValue = function (e)
        {
            var mouseXY = RGraph.getMouseXY(e)
            var angle   = RGraph.getAngleByXY(this.centerx, this.centery, mouseXY[0], mouseXY[1]);
                angle  += RGraph.HALFPI;
            
            if (mouseXY[0] >= this.centerx && mouseXY[1] <= this.centery) {
                angle -= RGraph.TWOPI;
            }
    
            var value = ((angle / RGraph.TWOPI) * (this.max - this.min)) + this.min;
    
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
            var mouseXY = RGraph.getMouseXY(e);
            var radius  = RGraph.getHypLength(this.centerx, this.centery, mouseXY[0], mouseXY[1]);
    
            if (
                   mouseXY[0] > (this.centerx - this.radius)
                && mouseXY[0] < (this.centerx + this.radius)
                && mouseXY[1] > (this.centery - this.radius)
                && mouseXY[1] < (this.centery + this.radius)
                && radius <= this.radius
                ) {
    
                return this;
            }
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
            // Higher than max or lower than min
            if (value > this.max || value < this.min) {
                return null;
            }
    
            var angle = (((value - this.min) / (this.max - this.min)) * RGraph.TWOPI);
                angle -= RGraph.HALFPI;
    
            return angle;
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors.colorsGreenColor  = RGraph.arrayClone(properties.colorsGreenColor);
                this.original_colors.colorsYellowColor = RGraph.arrayClone(properties.colorsYellowColor);
                this.original_colors.colorsRedColor    = RGraph.arrayClone(properties.colorsRedColor);
            }

            // Parse the basic colors
            properties.colorsGreenColor  = this.parseSingleColorForGradient(properties.colorsGreenColor);
            properties.colorsYellowColor = this.parseSingleColorForGradient(properties.colorsYellowColor);
            properties.colorsRedColor    = this.parseSingleColorForGradient(properties.colorsRedColor);
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
        // Odo Grow
        // 
        // This effect gradually increases the represented value
        // 
        // @param              An object of effect properties - eg: {frames: 30}
        // @param function     An optional callback function
        //
        this.grow = function ()
        {
            var obj       = this;
            var opt       = arguments[0] || {};
            var frames    = opt.frames || 30;
            var frame     = 0;
            var current   = this.currentValue || 0;
            var origValue = Number(obj.currentValue);
            var newValue  = this.value;
            var diff      = newValue - origValue;
            var step      = (diff / frames);
            var callback  = arguments[1] || function () {};



            function iterator ()
            {
                obj.value = origValue + (frame * step);
    
                RGraph.clear(obj.canvas);
                RGraph.redrawCanvas(obj.canvas);
    
                if (frame++ < frames) {
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