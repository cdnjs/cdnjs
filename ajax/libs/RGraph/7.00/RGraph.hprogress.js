    // o---------------------------------------------------------------------------------o
    // | This file is part of the RGraph package - you can learn more at:                |
    // |                                                                                 |
    // |                       https://www.rgraph.net/license.html                       |
    // |                                                                                 |
    // | RGraph is dual-licensed under the Open Source GPL license. That means that it's |
    // | free to use and there are no restrictions on what you can use RGraph for!       |
    // | If the GPL license does not suit you however, then there's an inexpensive       |
    // | commercial license option available. See the URL above for more details.        |
    // o---------------------------------------------------------------------------------o

    RGraph = window.RGraph || {isrgraph:true,isRGraph:true,rgraph:true};

    // The progress bar constructor
    RGraph.HProgress = function (conf)
    {
        var id                      = conf.id,
            canvas                  = document.getElementById(id),
            min                     = conf.min,
            max                     = conf.max,
            value                   = conf.value;
        this.id                     = id;
        this.canvas                 = canvas;
        this.context                = this.canvas.getContext('2d');
        this.canvas.__object__      = this;
        this.min                    = RGraph.stringsToNumbers(min);
        this.max                    = RGraph.stringsToNumbers(max);
        this.value                  = RGraph.stringsToNumbers(value);
        this.type                   = 'hprogress';
        this.isRGraph               = true;
        this.isrgraph               = true;
        this.rgraph                 = true;
        this.currentValue           = null;
        this.uid                    = RGraph.createUID();
        this.canvas.uid             = this.canvas.uid ? this.canvas.uid : RGraph.createUID();
        this.colorsParsed           = false;
        this.coords                 = [];
        this.coordsText             = [];
        this.original_colors        = [];
        this.firstDraw              = true; // After the first draw this will be false
        this.stopAnimationRequested = false;// Used to control the animations








        this.properties =
        {
            colors:                             ['#0c0','red','green','yellow','pink','cyan','black','white','gray'],
            colorsStrokeInner:                  '#999',
            colorsStrokeOuter:                  '#999',

            tickmarksColor:                      '#999',
            tickmarksInnerCount:                0,
            tickmarksOuterCount:                0,

            backgroundColor:                    'Gradient(#ccc:#eee:#efefef)',
            //backgroundColor:                    '#eee',

            marginLeft:                         35,
            marginRight:                        35,
            marginTop:                          35,
            marginBottom:                       35,

            shadow:                             false,
            shadowColor:                        'rgba(0,0,0,0.5)',
            shadowBlur:                         3,
            shadowOffsetx:                      3,
            shadowOffsety:                      3,

            
            
            title:                 '',
            titleX:                null,
            titleY:                null,
            titleHalign:           null,
            titleValign:           null,
            titleFont:             null,
            titleSize:             null,
            titleColor:            null,
            titleBold:             true,
            titleItalic:           null,
            titleOffsetx:          0,
            titleOffsety:          0,
            titleSubtitle:        '',
            titleSubtitleSize:    null,
            titleSubtitleColor:   '#aaa',
            titleSubtitleFont:    null,
            titleSubtitleBold:    null,
            titleSubtitleItalic:  null,
            titleSubtitleOffsetx: 0,
            titleSubtitleOffsety: 0,

            textSize:                           12,
            textColor:                          'black',
            textFont:                           'Arial, Verdana, sans-serif',
            textBold:                           false,
            textItalic:                         false,
            textAccessible:                     false,
            textAccessibleOverflow:             'visible',
            textAccessiblePointerevents:        false,
            text:                               null,

            contextmenu:                        null,

            scaleUnitsPre:                      '',
            scaleUnitsPost:                     '',
            scaleDecimals:                      0,
            scalePoint:                         '.',
            scaleThousand:                      ',',

            adjustable:                         false,

            tooltips:                           null,
            tooltipsEffect:                     'slide',
            tooltipsCssClass:                   'RGraph_tooltip',
            tooltipsCss:                        null,
            tooltipsHighlight:                  true,
            tooltipsPersistent:                 false,
            tooltipsEvent:                      'onclick',
            tooltipsFormattedThousand:          ',',
            tooltipsFormattedPoint:             '.',
            tooltipsFormattedDecimals:          0,
            tooltipsFormattedUnitsPre:          '',
            tooltipsFormattedUnitsPost:         '',
            tooltipsFormattedKeyColors:         null,
            tooltipsFormattedKeyColorsShape: 'square',
            tooltipsFormattedKeyLabels:         [],
            tooltipsFormattedListType:  'ul',
            tooltipsFormattedListItems: null,
            tooltipsFormattedTableHeaders: null,
            tooltipsFormattedTableData: null,
            tooltipsPointer:            true,
            tooltipsPointerOffsetx:     0,
            tooltipsPointerOffsety:     0,
            tooltipsPositionStatic:     true,
            tooltipsHotspotIgnore:      null,

            highlightLinewidth:                 1,
            highlightStroke:                    'rgba(0,0,0,0)',
            highlightFill:                      'rgba(255,255,255,0.7)',

            annotatable:                        false,
            annotateColor:                      'black',

            arrows:                             false,

            marginInner:                        0,

            labelsPosition:                     'bottom',
            labelsSpecific:                     null,
            labelsSpecificFormattedDecimals:    0,
            labelsSpecificFormattedPoint:       '.',
            labelsSpecificFormattedThousand:    ',',
            labelsSpecificFormattedUnitsPre:    '',
            labelsSpecificFormattedUnitsPost:   '',
            labelsCount:                        10,
            labelsOffsetx:                      0,
            labelsOffsety:                      0,
            labelsFont:                         null,
            labelsSize:                         null,
            labelsColor:                        null,
            labelsBold:                         null,
            labelsItalic:                       null,
            
            labelsInner:                        false,
            labelsInnerFont:                    null,
            labelsInnerSize:                    null,
            labelsInnerColor:                   null,
            labelsInnerBold:                    null,
            labelsInnerItalic:                  null,
            labelsInnerOffsetx:                 0,
            labelsInnerOffsety:                 0,
            labelsInnerDecimals:                0,
            labelsInnerBackgroundFill:          'rgba(255,255,255,0.7)',
            labelsInnerBorder:                  true,
            labelsInnerBorderLinewidth:         1,
            labelsInnerBorderColor:             '#ccc',
            labelsInnerScalePoint:              null,
            labelsInnerScaleThousand:           null,
            labelsInnerUnitsPre:                '',
            labelsInnerUnitsPost:               '',
            labelsInnerSpecific:                null,

            key:                                null,
            keyBackground:                      'white',
            keyPosition:                        'margin',
            keyHalign:                          'right',
            keyShadow:                          false,
            keyShadowColor:                     '#666',
            keyShadowBlur:                      3,
            keyShadowOffsetx:                   2,
            keyShadowOffsety:                   2,
            keyPositionMarginBoxed:             false,
            keyPositionMarginHSpace:   0,
            keyPositionX:                       null,
            keyPositionY:                       null,
            keyColorShape:                      'square',
            keyRounded:                         true,
            keyLinewidth:                       1,
            keyColors:                          null,
            keyColorShape:                      'square',
            keyInteractive:                     false,
            keyInteractiveHighlightChartLinewidth: 2,
            keyInteractiveHighlightChartStroke: 'black',
            keyInteractiveHighlightChartFill:   'rgba(255,255,255,0.7)',
            keyInteractiveHighlightLabel:       'rgba(255,0,0,0.2)',
            keyLabelsColor:                     null,
            keyLabelsFont:                      null,
            keyLabelsSize:                      null,
            keyLabelsBold:                      null,
            keyLabelsItalic:                    null,
            keyLabelsOffsetx:                   0,
            keyLabelsOffsety:                   0,
            keyFormattedDecimals:               0,
            keyFormattedPoint:                  '.',
            keyFormattedThousand:               ',',
            keyFormattedUnitsPre:               '',
            keyFormattedUnitsPost:              '',
            keyFormattedValueSpecific:          null,
            keyFormattedItemsCount:             null,

            borderInner:                        true,
            
            corners:                             'square', // Can also be round
            cornersRoundRadius:                   10,

            clearto:                            'rgba(0,0,0,0)',
            
            events:                             {},
            
            scale:                  true,
            scaleFactor:            2,
            antialiasTranslate:     false
        };




        //
        // These are the properties that get scaled up if the
        // scale option is enabled.
        //
        this.properties_scale = [
            'marginLeft',
            'marginRight',
            'marginTop',
            'marginBottom',
            'marginInner',
            
            'shadowBlur',
            'shadowOffsetx',
            'shadowOffsety',
            
            'titleX',
            'titleY',
            'titleSize',
            'titleOffsetx',
            'titleOffsety',
            'titleSubtitleSize',
            'titleSubtitleOffsetx',
            'titleSubtitleOffsety',
            
            'textSize',
            
            'highlightLinewidth',
            
            'labelsOffsetx',
            'labelsOffsety',
            'labelsSize',
            
            'labelsInnerSize',
            'labelsInnerOffsetx',
            'labelsInnerOffsety',
            'labelsInnerBorderLinewidth',
            
            'keyShadowBlur',
            'keyShadowOffsetx',
            'keyShadowOffsety',
            'keyPositionX',
            'keyPositionY',
            'keyLinewidth',
            'keyInteractiveHighlightChartLinewidth',
            'keyLabelsSize',
            'keyLabelsOffsetx',
            'keyLabelsOffsety',
            
            'cornersRoundRadius'
        ];









        //
        // Add the reverse look-up table  for property names
        // so that property names can be specified in any case.
        //
        this.properties_lowercase_map = [];
        for (var i in this.properties) {
            if (typeof i === 'string') {
                this.properties_lowercase_map[i.toLowerCase()] = i;
            }
        }


        // Check for support
        if (!this.canvas) {
            alert('[HPROGRESS] No canvas support');
            return;
        }


        //
        // Create the dollar objects so that functions can be added to them
        //
        var linear_data = RGraph.arrayLinearize(value);
        for (var i=0; i<linear_data.length; ++i) {
            this['$' + i] = {};
        }



        // Short variable names
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
        // @param string name  The name of the property to set
        // @param string value The value of the poperty
        //
        this.set = function (name)
        {
            var value = typeof arguments[1] === 'undefined' ? null : arguments[1];

            // Go through all of the properties and make sure
            // that they're using the correct capitalisation
            if (typeof name === 'string') {
                name = this.properties_lowercase_map[name.toLowerCase()] || name;
            }

            // Set the colorsParsed flag to false if the colors
            // property is being set
            if (   name === 'colors'
                || name === 'tickmarksColor'
                || name === 'colorsStrokeInner'
                || name === 'colorsStrokeOuter'
                || name === 'highlightFill'
                || name === 'highlightStroke'
                || name === 'highlightColor'
                ) {
                this.colorsParsed = false;
            }

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
            // Go through all of the properties and make sure
            // that they're using the correct capitalisation
            name = this.properties_lowercase_map[name.toLowerCase()] || name;

            return properties[name];
        };








        //
        // Draws the progress bar
        //
        this.draw = function ()
        {
            // MUST be the first thing that's done - but only
            // once!!
            RGraph.runOnce(`scale-up-the-canvas-once-in-the-draw-function-${this.id}-${this.uid}`,  () =>
            {
                // Note that we're in an arrow function so the
                // 'this' variable is OK to be used and refers
                // to the RGraph Line chart object.
                RGraph.scale(this);
            });











            //
            // Fire the onbeforedraw event
            //
            RGraph.fireCustomEvent(this, 'onbeforedraw');
    


            // Translate half a pixel for antialiasing purposes - but
            // only if it hasn't been done already
            //
            // The old style antialias fix
            //
            if (   !this.properties.scale
                && this.properties.antialiasTranslate
                && !this.canvas.__rgraph_aa_translated__) {

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
            this.width      = this.canvas.width - this.marginLeft - this.marginRight;
            this.height     = this.canvas.height - this.marginTop - this.marginBottom;
            this.coords     = [];
            this.coordsText = [];









            //
            // Install clipping
            //
            // MUST be the first thing that's done after the
            // beforedraw event
            //
            if (!RGraph.isNullish(this.properties.clip)) {
                RGraph.clipTo.start(this, this.properties.clip);
            }










            this.drawbar();
            this.drawTickMarks();
            this.drawLabels();
            this.drawTitle();
    
    
            //
            // Setup the context menu if required
            //
            if (properties.contextmenu) {
                RGraph.showContext(this);
            }
    
    
            // Draw the key if necessary
            if (properties.key && properties.key.length) {
                RGraph.drawKey(
                    this,
                    properties.key,
                    properties.colors
                );
            }
            
            //
            // Reset the strokestyle to black
            //
            this.context.strokeStyle = 'black';




            //
            // Add custom text thats specified
            //
            RGraph.addCustomText(this);




    
    
    
    
    
            //
            // This installs the event listeners
            //
            RGraph.installEventListeners(this);
            
            //
            // End clipping
            //
            if (!RGraph.isNullish(this.properties.clip)) {
                RGraph.clipTo.end();
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








            //
            // Install any inline responsive configuration. This
            // should be last in the draw function - even after
            // the draw events.
            //
            RGraph.installInlineResponsive(this);














            
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
        // Draws the bar
        //
        this.drawbar = function ()
        {
            //
            // First get the scale
            //
            this.scale2 = RGraph.getScale({object: this, options: {
                'scale.max':          this.max,
                'scale.min':          this.min,
                'scale.strict':       true,
                'scale.thousand':     properties.scaleThousand,
                'scale.point':        properties.scalePoint,
                'scale.decimals':     properties.scaleDecimals,
                'scale.labels.count': properties.labelsCount,
                'scale.round':        properties.scaleRound,
                'scale.units.pre':    properties.scaleUnitsPre,
                'scale.units.post':   properties.scaleUnitsPost
            }});

            // Set a shadow if requested
            if (properties.shadow) {
                RGraph.setShadow({
                    object: this,
                    prefix: 'shadow'
                });
            }





            //
            // Draw the background
            //
            this.context.fillStyle   = properties.backgroundColor;
            this.context.strokeStyle = properties.colorsStrokeOuter;

            if (properties.corners === 'round') {
                this.context.beginPath();
                this.path(
                    'b rr % % % % % s % f %',
                    this.marginLeft,
                    this.marginTop,
                    this.width,
                    this.height,
                    properties.cornersRoundRadius,
                    properties.colorsStrokeOuter,
                    properties.backgroundColor
                );
            } else {
                this.context.fillStyle   = properties.backgroundColor;
                this.context.strokeStyle = properties.colorsStrokeOuter;
                
                this.context.strokeRect(this.marginLeft, this.marginTop, this.width, this.height);
                this.context.fillRect(this.marginLeft, this.marginTop, this.width, this.height);
            }
    
            //
            // Turn off any shadow
            //
            RGraph.noShadow(this);
    
            this.context.fillStyle   = properties.colors[0];
            this.context.strokeStyle = properties.colorsStrokeOuter;
            
            var margin = properties.marginInner;

            // Draw the actual bar itself
            var barWidth = Math.min(this.width, ((RGraph.arraySum(this.value) - this.min) / (this.max - this.min) ) * this.width);
    
            if (properties.tickmarksInnerCount > 0) {
    
                var spacing = (this.canvas.width - this.marginLeft - this.marginRight) / properties.tickmarksInnerCount;
    
                this.context.lineWidth   = 1;
                this.context.strokeStyle = properties.colorsStrokeOuter;
    
                this.context.beginPath();
                for (var x = this.marginLeft; x<this.canvas.width - this.marginRight; x+=spacing) {
                    this.context.moveTo(Math.round(x), this.marginTop);
                    this.context.lineTo(Math.round(x), this.marginTop + 2);
    
                    this.context.moveTo(Math.round(x), this.canvas.height - this.marginBottom);
                    this.context.lineTo(Math.round(x), this.canvas.height - this.marginBottom - 2);
                }
                this.context.stroke();
            }


            //
            // This bit draws the actual progress bar
            //
            if (typeof this.value === 'number') {

                if (properties.borderInner) {
                    this.path(
                        'b rr % % % % % s %',
                        this.marginLeft,
                        this.marginTop + margin,
                        barWidth,
                        this.height - margin - margin,
                        properties.cornersRoundRadius,
                        properties.colorsStrokeInner
                    );
                }

                this.path(
                    'b rr % % % % % f %',
                    this.marginLeft,
                    this.marginTop + margin,
                    barWidth,
                    this.height - margin - margin,
                    properties.corners === 'round' ? properties.cornersRoundRadius : 0,
                    properties.colors[0]
                );

                // Store the coords
                this.coords.push([
                    this.marginLeft,
                    this.marginTop + margin,
                    barWidth,
                    this.height - margin - margin
                ]);
    
            } else if (typeof this.value === 'object') {

                this.context.beginPath();
    
                var startPoint = this.marginLeft;
                
                for (var i=0,len=this.value.length; i<len; ++i) {
    
                    var segmentLength = (this.value[i] / RGraph.arraySum(this.value)) * barWidth;
    
                    if (properties.borderInner) {
                        this.path(
                            'b rr % % % % % s %',
                            startPoint,
                            this.marginTop + margin,
                            segmentLength,
                            this.height - margin - margin,
                            properties.corners === 'round' ? properties.cornersRoundRadius : 0,
                            properties.colorsStrokeInner
                        );
                    }

                    // DON'T use the RGraph.path() function for this
                    this.context.beginPath();
                    this.drawbarStackedSection(
                        startPoint,
                        this.marginTop + margin,
                        segmentLength,
                        this.height - margin - margin,
                        i,
                        i === (len - 1)
                    );
                    this.context.fillStyle = properties.colors[i];
                    this.context.fill();


                    // Store the coords
                    this.coords.push([
                        startPoint,
                        this.marginTop + margin,
                        segmentLength,
                        this.height - margin - margin
                    ]);

                    startPoint += segmentLength;
                }
            }
    
            //
            // Draw the arrows indicating the level if requested
            //
            if (properties.arrows) {
                var x = this.marginLeft + barWidth;
                var y = this.marginTop;
                
                this.context.lineWidth   = 1;
                this.context.fillStyle   = 'black';
                this.context.strokeStyle = 'black';
    
                this.context.beginPath();
                    this.context.moveTo(x, y - 3);
                    this.context.lineTo(x + 2, y - 7);
                    this.context.lineTo(x - 2, y - 7);
                this.context.closePath();
    
                this.context.stroke();
                this.context.fill();
    
                this.context.beginPath();
                    this.context.moveTo(x, y + this.height + 4);
                    this.context.lineTo(x + 2, y + this.height + 9);
                    this.context.lineTo(x - 2, y + this.height + 9);
                this.context.closePath();
    
                this.context.stroke();
                this.context.fill()
            }










            //
            // Draw the inner label
            //
            if (properties.labelsInner) {
            
                // Format the number
                if (typeof properties.labelsInnerSpecific === 'string') {
                    var text = String(properties.labelsInnerSpecific);
                } else {
                
                    var value = typeof this.value === 'number' ? this.value : RGraph.arraySum(this.value);
                    var value = value.toFixed(typeof properties.labelsInnerDecimals === 'number' ? properties.labelsInnerDecimals : properties.scaleDecimals);
                    var text  = RGraph.numberFormat({
                        object:    this,
                        number:    value,
                        unitspre:  typeof properties.labelsInnerUnitsPre === 'string' ? properties.labelsInnerUnitsPre   : properties.scaleUnitsPre,
                        unitspost: typeof properties.labelsInnerUnitsPost === 'string' ? properties.labelsInnerUnitsPost : properties.scaleUnitsPost,
                        point:     typeof properties.labelsInnerPoint      === 'string' ? properties.labelsInnerPoint      : properties.scalePoint,
                        thousand:  typeof properties.labelsInnerThousand   === 'string' ? properties.labelsInnerThousand   : properties.scaleThousand
                    });
                }

                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'labelsInner'
                });

                RGraph.text({
                
               object: this,
                 
                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:           this.marginLeft + barWidth + 5 + properties.labelsInnerOffsetx,
                    y:           this.marginTop + (this.height / 2) + properties.labelsInnerOffsety,

                    text:        text,
                    valign:      'center',
                    halign:      'left',
                    bounding:          typeof properties.labelsInnerBackgroundFill === 'string' ? true : false,
                    boundingFill:      properties.labelsInnerBackgroundFill,
                    boundingStroke:    properties.labelsInnerBorder ? properties.labelsInnerBorderColor : 'rgba(0,0,0,0)',
                    boundingLinewidth: properties.labelsInnerBorderLinewidth,
                    tag:               'label.inner'
                });
            }

            // This is here to stop colors being changed by later fills
            this.path('b');
        };








        //
        // Draws the bar (or part of the bar in a stacked chart)
        // accounting for rounded corners. This function deos not
        // do a beginPath and nor does it stroke or fill the bar
        // or set colors.
        //
        // @param x      number The X coord
        // @param y      number The Y coord
        // @param width  number The width of the bar
        // @param height number The height of the bar
        // @param index  number The index numbr of the bar (0-whatever)
        //
        this.drawbarStackedSection = function (x, y, width, height, index)
        {
            this.context.roundRect(
                x,
                y,
                width,
                height,
                properties.corners === 'round' ? [
                    (index === 0) ? this.properties.cornersRoundRadius : 0,
                    (index === (this.value.length - 1) || typeof this.value === 'number') ? this.properties.cornersRoundRadius : 0,
                    (index === (this.value.length - 1) || typeof this.value === 'number') ? this.properties.cornersRoundRadius : 0,
                    (index === 0) ? this.properties.cornersRoundRadius : 0
                ] : 0
            );
        };






        //
        // The function that draws the tick marks. Apt name...
        //
        this.drawTickMarks = function ()
        {
            this.context.strokeStyle = properties.tickmarksColor;

            if (properties.tickmarksOuterCount > 0) {

                this.context.beginPath();        
    
                // This is used by the label function below
                this.tickInterval = this.width / properties.tickmarksOuterCount;

                var start = 0;
    
                if (properties.labelsPosition === 'top') {
                    for (var i=this.marginLeft + start; i<=(this.width + this.marginLeft + 0.1); i+=this.tickInterval) {
                        this.context.moveTo(Math.round(i), this.marginTop);
                        this.context.lineTo(Math.round(i), this.marginTop - 4);
                    }

                } else {

                    for (var i=this.marginLeft + start; i<=(this.width + this.marginLeft + 0.1); i+=this.tickInterval) {
                        this.context.moveTo(Math.round(i), this.marginTop + this.height);
                        this.context.lineTo(Math.round(i), this.marginTop + this.height + 4);
                    }
                }
    
                this.context.stroke();
            }
        };








        //
        // The function that draws the labels
        //
        this.drawLabels = function ()
        {
            var scaleFactor = RGraph.getScaleFactor(this);

            if (!RGraph.isNullish(properties.labelsSpecific)) {
                return this.drawSpecificLabels();
            }
            
            if (properties.labelsCount === 0) {
                return;
            }

            this.context.fillStyle = properties.textColor;
    
            var xPoints = [],
                yPoints = [],
                bold    = properties.textBold,
                italic  = properties.textItalic,
                color   = properties.textColor,
                font    = properties.textFont,
                size    = properties.textSize,
                offsetx = properties.labelsOffsetx,
                offsety = properties.labelsOffsety;


            for (i=0,len=this.scale2.labels.length; i<len; i++) {

                if (properties.labelsPosition == 'top') {
                    var x = this.width * (i/this.scale2.labels.length) + this.marginLeft + (this.width / this.scale2.labels.length);
                    var y = this.marginTop - (6 * scaleFactor);
                    var valign = 'bottom';
                } else {
                    var x = this.width * (i/this.scale2.labels.length) + this.marginLeft + (this.width / this.scale2.labels.length);
                    var y = this.height + this.marginTop + (4 * scaleFactor);
                    var valign = 'top';
                }

                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'labels'
                });

                RGraph.text({
                
               object: this,

                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:      x + offsetx,
                    y:      y + offsety,
                    text:   this.scale2.labels[i],
                    valign: valign,
                    halign: 'center',
                    tag:    'scale'
                });
            }
            
            var text  = RGraph.numberFormat({
                object:    this,
                number:    Number(this.min).toFixed(properties.scaleDecimals),
                unitspre:  properties.scaleUnitsPre,
                unitspost: properties.scaleUnitsPost
            });

            if (properties.labelsPosition == 'top') {
                RGraph.text({
                
               object: this,

                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:      this.marginLeft + offsetx,
                    y:      this.marginTop - 6 + offsety,
                    text:   text,
                    valign: 'bottom',
                    halign: 'center',
                    tag:    'scale'
                });
            } else {

                RGraph.text({
                
               object: this,

                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:      this.marginLeft + offsetx,
                    y:      this.canvas.height - this.marginBottom + 5 + offsety,
                    text:   text,
                    valign: 'top',
                    halign: 'center',
                    tag:    'scale'
                });
            }
        };








        //
        // Returns the focused bar
        // 
        // @param event e The event object
        //
        this.getShape = function (e)
        {
            var mouseXY = RGraph.getMouseXY(e),
                mouseX = mouseXY[0],
                mouseY = mouseXY[1];

            for (var i=0,len=this.coords.length; i<len; i++) {

                if (RGraph.tooltipsHotspotIgnore(this, i)) {
                    continue;
                }

                var x   = this.coords[i][0],
                    y   = this.coords[i][1],
                    w   = this.coords[i][2],
                    h   = this.coords[i][3],
                    idx = i;

                this.context.beginPath();


if (properties.corners === 'round') {
    this.path(
        'r % % % %',
        x,y,w,h
    );

} else {

    this.path(
        'r % % % %',
        x,y,w,h
    );
}
    
                if (
                       this.context.isPointInPath(mouseX, mouseY)
                    && (this.properties.clip ? RGraph.clipTo.test(this, mouseX, mouseY) : true)
                   ) {
                
                    if (RGraph.parseTooltipText) {
                        var tooltip = RGraph.parseTooltipText(properties.tooltips, idx);
                    }

                    return {
                        object: this,
                             x: x,
                             y: y,
                         width: w,
                        height: h,
                       dataset: 0,
                         index: idx,
               sequentialIndex: idx,
                       tooltip: typeof tooltip === 'string' ? tooltip : null
                    }
                }
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
            var mouseXY = RGraph.getMouseXY(e);
                
            var value = (mouseXY[0] - this.marginLeft) / this.width;
                value *= this.max - this.min;
                value += this.min;
                
            if (mouseXY[0] < this.marginLeft) {
                value = this.min;
            }
            if (mouseXY[0] > (this.canvas.width - this.marginRight) ) {
                value = this.max
            }
    
            return value;
        };








        //
        // Each object type has its own Highlight() function which
        // highlights the appropriate shape.
        // 
        // @param object shape The shape to highlight
        //
        this.highlight = function (shape)
        {
            var isLast = shape.index === this.coords.length - 1;

            if (!properties.tooltipsHighlight) {
                return;
            }

            // Call a function to highlight the chart
            if (typeof properties.highlightStyle === 'function') {
                (properties.highlightStyle)(shape);
            
            // Highlight all of the rects except the selected one - essentially an inverted highlight
            } else if (typeof properties.highlightStyle === 'string' && properties.highlightStyle === 'invert') {
                for (var i=0; i<this.coords.length; ++i) {
                    if (i !== shape.sequentialIndex) {
                        if (this.properties.corners === 'round') {
                            
                            this.context.beginPath();
                            this.context.lineWidth = properties.highlightLinewidth;

                            this.drawbarStackedSection(
                                this.coords[i][0],
                                this.coords[i][1],
                                this.coords[i][2],
                                this.coords[i][3],
                                i
                            );

                            this.context.strokeStyle = properties.highlightStroke;
                            this.context.fillStyle   = properties.highlightFill;
                            this.context.stroke();
                            this.context.fill();

                        } else {
                            this.path(
                                'b lw % r % % % % s % f %',
                                properties.highlightLinewidth,
                                this.coords[i][0] - 0.5,
                                this.coords[i][1] - 0.5,
                                this.coords[i][2] + 1,
                                this.coords[i][3] + 1,
                                properties.highlightStroke,
                                properties.highlightFill
                            );
                        }
                    }
                }

            } else {

                if (properties.corners === 'round') {

                    this.context.beginPath();
                    this.context.lineWidth = properties.highlightLinewidth;
                
                    this.drawbarStackedSection(
                        shape.x,
                        shape.y,
                        shape.width,
                        shape.height,
                        shape.index
                    );
                
                    this.context.strokeStyle = properties.highlightStroke;
                    this.context.fillStyle   = properties.highlightFill;
                    this.context.stroke();
                    this.context.fill();
                
                } else {
                
                    this.path(
                        'b lw % r % % % % s % f %',
                        properties.highlightLinewidth,
                        shape.x,
                        shape.y,
                        shape.width,
                        shape.height,
                        properties.highlightStroke,
                        properties.highlightFill
                    );
                }

                // Reset the linewidth
                this.path('lw %', 1);
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
    
                var mouseXY = RGraph.getMouseXY(e);
                var value   = this.getValue(e);
                
                if (typeof value === 'number') {
        
                    this.value = Number(value.toFixed(properties.scaleDecimals));
                    RGraph.redrawCanvas(this.canvas);
    
                    // Fire the onadjust event
                    RGraph.fireCustomEvent(this, 'onadjust');
                }
            }
        };








        //
        // Draws labelsSpecific
        //
        this.drawSpecificLabels = function ()
        {
            //
            // If the xaxisLabels option is a string then turn it
            // into an array.
            //
            if (properties.labelsSpecific && properties.labelsSpecific.length) {
                if (typeof properties.labelsSpecific === 'string') {
                    properties.labelsSpecific = RGraph.arrayPad({
                        array:  [],
                        length: properties.labelsCount,
                        value:  properties.labelsSpecific
                    });
                }

            // Label substitution
            //
                for (var i=0; i<properties.labelsSpecific; ++i) {
                    properties.labelsSpecific[i] = RGraph.labelSubstitution({
                        object:    this,
                        text:      properties.labelsSpecific[i],
                        index:     i,
                        value:     typeof this.value === 'object' && typeof this.value[i] === 'number' ? this.value[i] : this.value,
                        decimals:  properties.labelsSpecificFormattedDecimals  || 0,
                        unitsPre:  properties.labelsSpecificFormattedUnitsPre  || '',
                        unitsPost: properties.labelsSpecificFormattedUnitsPost || '',
                        thousand:  properties.labelsSpecificFormattedThousand  || ',',
                        point:     properties.labelsSpecificFormattedPoint     || '.'
                    });
                }
            }

        
            var labels = properties.labelsSpecific;

            if (labels) {
    
                var valign  = (properties.labelsPosition == 'top' ? 'bottom' : 'top'),
                    step    = this.width / (labels.length - 1),
                    offsetx = properties.labelsOffsetx,
                    offsety = properties.labelsOffsety

                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'labels'
                });

                this.context.beginPath();
                    this.context.fillStyle = properties.textColor;
                    for (var i=0; i<labels.length; ++i) {
                        RGraph.text({
                       
                       object: this,

                         font: textConf.font,
                         size: textConf.size,
                        color: textConf.color,
                         bold: textConf.bold,
                       italic: textConf.italic,

                            x:      this.marginLeft + (step * i) + offsetx,
                            y:        properties.labelsPosition == 'top'
                                    ? this.marginTop - 7  + offsety
                                    : this.canvas.height - this.marginBottom + 7 + offsety,
                            text:   labels[i],
                            valign: valign,
                            halign: 'center',
                            tag:    'labels.specific',
                        cssClass:   properties.labelsSpecific
                                  ? RGraph.getLabelsCSSClassName({
                                      object: this,
                                        name: 'labelsClass',
                                       index: i
                                    })
                                  : ''
                        });
                    }
                this.context.fill();
            }
        };








        //
        // This function returns the appropriate X coordinate for the given value
        // 
        // @param  int value The value you want the coordinate for
        // @returm int       The coordinate
        //
        this.getXCoord = function (value)
        {
            var min = this.min;
    
            if (value < min || value > this.max) {
                return null;
            }
    
            var barWidth = this.canvas.width - this.marginLeft - this.marginRight;
            var coord = ((value - min) / (this.max - min)) * barWidth;
            coord = this.marginLeft + coord;
            
            return coord;
        };








        //
        // This returns true/false as to whether the cursor is over the chart area.
        // The cursor does not necessarily have to be over the bar itself.
        //
        this.overChartArea = function  (e)
        {
            var mouseXY = RGraph.getMouseXY(e);
            var mouseX  = mouseXY[0];
            var mouseY  = mouseXY[1];
            
            if (   mouseX >= this.marginLeft
                && mouseX <= (this.canvas.width - this.marginRight)
                && mouseY >= this.marginTop
                && mouseY <= (this.canvas.height - this.marginBottom)
                ) {
                
                return true;
            }
    
            return false;
        };








        //
        // 
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors.backgroundColor   = RGraph.arrayClone(properties.backgroundColor, {structuredClone: false});
                this.original_colors.colors            = RGraph.arrayClone(properties.colors, {structuredClone: false});
                this.original_colors.tickmarksColor    = RGraph.arrayClone(properties.tickmarksColor, {structuredClone: false});
                this.original_colors.colorsStrokeInner = RGraph.arrayClone(properties.colorsStrokeInner, {structuredClone: false});
                this.original_colors.colorsStrokeOuter = RGraph.arrayClone(properties.colorsStrokeOuter, {structuredClone: false});
                this.original_colors.highlightFill     = RGraph.arrayClone(properties.highlightFill, {structuredClone: false});
                this.original_colors.highlightStroke   = RGraph.arrayClone(properties.highlightStroke, {structuredClone: false});
                this.original_colors.highlightColor    = RGraph.arrayClone(properties.highlightColor, {structuredClone: false});
            }




            var colors = properties.colors;
    
            for (var i=0; i<colors.length; ++i) {
                colors[i] = this.parseSingleColorForGradient(colors[i]);
            }

            properties.tickmarksColor     = this.parseSingleColorForGradient(properties.tickmarksColor);
            properties.colorsStrokeInner = this.parseSingleColorForGradient(properties.colorsStrokeInner);
            properties.colorsStrokeOuter = this.parseSingleColorForGradient(properties.colorsStrokeOuter);
            properties.highlightFill      = this.parseSingleColorForGradient(properties.highlightFill);
            properties.highlightStroke    = this.parseSingleColorForGradient(properties.highlightStroke);
            properties.backgroundColor    = this.parseSingleColorForGradient(properties.backgroundColor);
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
                var grad = this.context.createLinearGradient(
                    properties.marginLeft,
                    0,
                    this.canvas.width - properties.marginRight,
                    0
                );
    
                var diff = 1 / (parts.length - 1);
    
                grad.addColorStop(0, RGraph.trim(parts[0]));
    
                for (var j=1; j<parts.length; ++j) {
                    grad.addColorStop(j * diff, RGraph.trim(parts[j]));
                }
            }
                
            return grad ? grad : color;
        };








        //
        // Draw the titles
        //
        this.drawTitle = function ()
        {
            RGraph.drawTitle(this);
        };








        //
        // This function handles highlighting an entire data-series
        // for the interactive key
        // 
        // @param int index The index of the data series to be highlighted
        //
        this.interactiveKeyHighlight = function (index)
        {
            this.path(
                'b lw %',
                typeof properties.keyInteractiveHighlightChartLinewidth === 'number' ? properties.keyInteractiveHighlightChartLinewidth : 2
            );

            if (properties.corners === 'round') {
                

                this.context.roundRect(
                    
                    this.coords[index][0],
                    this.coords[index][1],
                    this.coords[index][2],
                    this.coords[index][3],
                    
                    [ // Corners
                        index === 0 ? properties.cornersRoundRadius : 0,
                        index === (this.coords.length - 1) ? properties.cornersRoundRadius : 0,
                        index === (this.coords.length - 1) ? properties.cornersRoundRadius : 0,
                        index === 0? properties.cornersRoundRadius : 0,
                    ]
                );

                this.path(
                    'f % s % lw 1',
                    properties.keyInteractiveHighlightChartFill,
                    properties.keyInteractiveHighlightChartStroke
                );
            } else {
                this.path(
                    'b r % % % % f % s % lw 1',
                    this.coords[index][0],
                    this.coords[index][1],
                    this.coords[index][2],
                    this.coords[index][3],
                    properties.keyInteractiveHighlightChartFill,
                    properties.keyInteractiveHighlightChartStroke
                );
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
        // HProgress Grow effect (which is also the the same as the
        // VPogress Grow effect)
        // 
        // @param object obj The chart object
        //
        this.grow = function ()
        {
            // Cancel any stop request if one is pending
            this.cancelStopAnimation();

            var obj           = this;
            var canvas        = obj.canvas;
            var context       = obj.context;
            var initial_value = obj.currentValue;
            var opt           = arguments[0] || {};
            var numFrames     = opt.frames || 30;
            var frame         = 0
            var callback      = arguments[1] || function () {};
    
            if (typeof obj.value === 'object') {
    
                if (RGraph.isNullish(obj.currentValue)) {
                    obj.currentValue = [];
                    for (var i=0,len=obj.value.length; i<len; ++i) {
                        obj.currentValue[i] = 0;
                    }
                }
    
                var diff      = [];
                var increment = [];
    
                for (var i=0,len=obj.value.length; i<len; ++i) {
                    diff[i]      = obj.value[i] - Number(obj.currentValue[i]);
                    increment[i] = diff[i] / numFrames;
                }
                
                if (initial_value == null) {
                    initial_value = [];
                    for (var i=0,len=obj.value.length; i<len; ++i) {
                        initial_value[i] = 0;
                    }
                }
    
            } else {
    
                var diff = obj.value - Number(obj.currentValue);
                var increment = diff  / numFrames;
            }






            function iterator ()
            {
                if (obj.stopAnimationRequested) {
    
                    // Reset the flag
                    obj.stopAnimationRequested = false;
    
                    return;
                }

                frame++;
    
                if (frame <= numFrames) {
    
                    if (typeof obj.value == 'object') {
                        obj.value = [];
                        for (var i=0,len=initial_value.length; i<len; ++i) {
                            obj.value[i] = initial_value[i] + (increment[i] * frame);
                        }
                    } else {
                        obj.value = initial_value + (increment * frame);
                    }
    
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
        // Couple of functions that allow you to control the
        // animation effect
        //
        this.stopAnimation = function ()
        {
            this.stopAnimationRequested = true;
        };

        this.cancelStopAnimation = function ()
        {
            this.stopAnimationRequested = false;
        };








        //
        // A worker function that handles Bar chart specific tooltip substitutions
        //
        this.tooltipSubstitutions = function (opt)
        {
            var values = typeof this.value === 'number' ? [this.value] : this.value;

            //
            // Return the values to the user
            //
            return {
                  index: opt.index,
                dataset: 0,
        sequentialIndex: opt.index,
                  value: typeof this.value === 'number' ? this.value : this.value[opt.index],
                 values: typeof this.value === 'number' ? [this.value] : [this.value[opt.index]]
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
            var color = properties.colors[specific.index];
            var label = RGraph.isString(properties.tooltipsFormattedKeyLabels[specific.index]) ? properties.tooltipsFormattedKeyLabels[specific.index] : '';

            if (properties.tooltipsFormattedKeyColors && properties.tooltipsFormattedKeyColors[specific.index]) {
                color = properties.tooltipsFormattedKeyColors[specific.index];
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
            var obj         = args.object,
                e           = args.event,
                tooltip     = args.tooltip,
                index       = args.index,
                canvasXY    = RGraph.getCanvasXY(obj.canvas)
                coords      = this.coords[args.index],
                scaleFactor = RGraph.getScaleFactor(this);

            // Position the tooltip in the X direction
            args.tooltip.style.left = (
                  canvasXY[0]                    // The X coordinate of the canvas
                + (coords[0] / scaleFactor)      // The X coordinate of the bar on the chart
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
                + ((coords[2] / 2) / scaleFactor)  // Add half of the bar width
                + obj.properties.tooltipsOffsetx // Add any user defined offset
            ) + 'px';

            args.tooltip.style.top  = (
                  canvasXY[1]                    // The Y coordinate of the canvas
                + (coords[1] / scaleFactor)                      // The Y coordinate of the bar on the chart
                - tooltip.offsetHeight           // The height of the tooltip
                - 10                             // An arbitrary amount
                + obj.properties.tooltipsOffsety // Add any user defined offset
            ) + 'px';


            
            // If the top of the tooltip is off the top of the page
            // then move the tooltip down
            if(parseFloat(args.tooltip.style.top) < 0) {
                args.tooltip.style.top = parseFloat(args.tooltip.style.top) + 20 + 'px';
            }
        };








        //
        // This returns the relevant value for the formatted key
        // macro %{value}. THIS VALUE SHOULD NOT BE FORMATTED.
        //
        // @param number index The index in the dataset to get
        //                     the value for
        //
        this.getKeyValue = function (index)
        {
            return RGraph.isArray(this.properties.keyFormattedValueSpecific) && RGraph.isNumber(this.properties.keyFormattedValueSpecific[index])
                    ? this.properties.keyFormattedValueSpecific[index]
                    : (RGraph.isArray(this.value) ? this.value[index] : this.value);
        };








        //
        // Returns how many data-points there should be when a string
        // based key property has been specified. For example, this:
        //
        // key: '%{property:_labels[%{index}]} %{value_formatted}'
        //
        // ...depending on how many bits of data ther is might get
        // turned into this:
        //
        // key: [
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        // ]
        //
        // ... ie in that case there would be 4 data-points so the
        // template is repeated 4 times.
        //
        this.getKeyNumDatapoints = function ()
        {
            return this.value.length;
        };








        //
        // This function handles clipping to scale values. Because
        // each chart handles scales differently, a worker function
        // is needed instead of it all being done centrally in the
        // RGraph.clipTo.start() function.
        //
        // @param string clip The clip string as supplied by the
        //                    user in the chart configuration
        //
        this.clipToScaleWorker = function (clip)
        {
            // The Regular expression is actually done by the
            // calling RGraph.clipTo.start() function  in the core
            // library
            if (RegExp.$1 === 'min') from = this.min; else from = Number(RegExp.$1);
            if (RegExp.$2 === 'max') to   = this.max; else to   = Number(RegExp.$2);

            var x1 = this.getXCoord(from),
                x2 = this.getXCoord(to);

            // Change the angle if the number is "min"
            if (RegExp.$1 === 'min') {
                x1 = 0;
            }

            // Change the angle if the number is "max"
            if (RegExp.$2 === 'max') {
                x2 = this.canvas.width;
            }

            this.path(
                'sa b r % % % % cl',
                x1,0,Math.max(x1,x2) - Math.min(x1,x2), this.canvas.height
            );
        };








        //
        // This function handles TESTING clipping to scale values.
        // Because each chart handles scales differently, a worker
        // function is needed instead of it all being done
        // centrally in the RGraph.clipTo.start() function.
        //
        // @param string clip The clip string as supplied by the
        //                    user in the chart configuration
        //
        this.clipToScaleTestWorker = function (clip)
        {
            // The Regular expression is actually done by the
            // calling RGraph.clipTo.start() function  in the core
            // library
            if (RegExp.$1 === 'min') from = this.min; else from = Number(RegExp.$1);
            if (RegExp.$2 === 'max') to   = this.max; else to   = Number(RegExp.$2);

            var x1 = this.getXCoord(from),
                x2 = this.getXCoord(to);

            // Change the angle if the number is "min"
            if (RegExp.$1 === 'min') {
                x1 = 0;
            }

            // Change the angle if the number is "max"
            if (RegExp.$2 === 'max') {
                x2 = this.canvas.width;
            }

            this.path(
                'b r % % % %',
                x1,0,Math.max(x1,x2) - Math.min(x1,x2), this.canvas.height
            );
        };








        //
        // Scale worker function that increases the size of
        // properties as required. Called by the RGraph.scale()
        // function.
        //
        // @param string name The name of the property
        // @param mixed value The value of the property
        //
        this.scalePropertiesWorker = function (name, value)
        {
            var scaleFactor = this.properties.scaleFactor;

            if (name === 'linewidth') {
                for (var i=0; i<value.length; ++i) {
                    value[i] *= scaleFactor;
                }
            } else if (name === 'titleY') {
                value = String(parseFloat(value) * scaleFactor);
            
            } else if (name === 'titleX') {
                value = String(parseFloat(value) * scaleFactor);
            }

            return value;
        };








        //
        // Register the object for redrawing
        //
        RGraph.register(this);








        //
        // This is the 'end' of the constructor so if the first argument
        // contains configuration data - handle that.
        //
        RGraph.parseObjectStyleConfig(this, conf.options);
    };