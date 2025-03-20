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


    //
    // The progress bar constructor
    //
    RGraph.VProgress = function (conf)
    {
        this.id                = conf.id;
        this.canvas            = document.getElementById(this.id);
        this.context           = this.canvas.getContext('2d');
        this.canvas.__object__ = this;

        this.min                    = RGraph.stringsToNumbers(conf.min);
        this.max                    = RGraph.stringsToNumbers(conf.max);
        this.value                  = RGraph.stringsToNumbers(conf.value);
        this.type                   = 'vprogress';
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
            colors:                         ['#0c0','red','blue','yellow','pink','cyan','black','white','gray'],
            colorsStrokeInner:              '#999',
            colorsStrokeOuter:              '#999',

            tickmarksOuter:                 true,
            tickmarksInner:                 false,
            tickmarksOuterCount:            0,
            tickmarksInnerCount:            0,
            tickmarksOuterColor:            '#999',
            tickmarksInnerColor:            '#999',
            
            marginLeft:                     35,
            marginRight:                    35,
            marginTop:                      35,
            marginBottom:                   35,
            marginInner:                    0,


            //backgroundColor:                'Gradient(#ccc:#eee:#efefef)',
            backgroundColor:                '#eee',

            shadow:                         false,
            shadowColor:                    'rgba(0,0,0,0.5)',
            shadowBlur:                     3,
            shadowOffsetx:                  3,
            shadowOffsety:                  3,

            title:                          '',
            titleBold:                      null,
            titleItalic:                    null,
            titleFont:                      null,
            titleSize:                      null,
            titleColor:                     null,
            titleHalign:                    null,
            titleValign:                    null,
            titleOffsetx:                   0,
            titleOffsety:                   0,
            titleSubtitle:        '',
            titleSubtitleSize:    null,
            titleSubtitleColor:   '#aaa',
            titleSubtitleFont:    null,
            titleSubtitleBold:    null,
            titleSubtitleItalic:  null,
            titleSubtitleOffsetx: 0,
            titleSubtitleOffsety: 0,
            
            titleSide:                      null,
            titleSideFont:                  null,
            titleSideSize:                  null,
            titleSideColor:                 null,
            titleSideBold:                  null,
            titleSideItalic:                null,
            titleSideOffsetx:               0,
            titleSideOffsety:               0,

            textSize:                       12,
            textColor:                      'black',
            textFont:                       'Arial, Verdana, sans-serif',
            textBold:                       false,
            textItalic:                     false,
            textAccessible:                 false,
            textAccessibleOverflow:         'visible',
            textAccessiblePointerevents:    false,
            text:                           null,

            contextmenu:                    null,

            scaleDecimals:                  0,
            scaleThousand:                  ',',
            scalePoint:                     '.',
            scaleUnitsPre:                  '',
            scaleUnitsPost:                 '',

            tooltips:                       null,
            tooltipsEffect:                 'slide',
            tooltipsCssClass:               'RGraph_tooltip',
            tooltipsCss:                    null,
            tooltipsHighlight:              true,
            tooltipsEvent:                  'onclick',
            tooltipsFormattedThousand:      ',',
            tooltipsFormattedPoint:         '.',
            tooltipsFormattedDecimals:      0,
            tooltipsFormattedUnitsPre:      '',
            tooltipsFormattedUnitsPost:     '',
            tooltipsFormattedKeyColors:     null,
            tooltipsFormattedKeyColorsShape: 'square',
            tooltipsFormattedKeyLabels:     [],
            tooltipsFormattedListType:  'ul',
            tooltipsFormattedListItems: null,
            tooltipsFormattedTableHeaders: null,
            tooltipsFormattedTableData: null,
            tooltipsPointer:            true,
            tooltipsPointerOffsetx:     0,
            tooltipsPointerOffsety:     0,
            tooltipsPositionStatic:     true,
            tooltipsHotspotIgnore:      null,

            highlightLinewidth:             1,
            highlightStroke:                'rgba(0,0,0,0)',
            highlightFill:                  'rgba(255,255,255,0.7)',

            annotatable:                    false,
            annotatableColor:               'black',

            arrows:                         false,

            labelsInner:                    false,
            labelsInnerFont:                null,
            labelsInnerSize:                null,
            labelsInnerColor:               null,
            labelsInnerBold:                null,
            labelsInnerItalic:              null,
            labelsInnerBackgroundFill:      'rgba(255,255,255,0.75)',
            labelsInnerBorder:              true,
            labelsInnerBorderLinewidth:     1,
            labelsInnerBorderColor:         '#ccc',
            labelsInnerDecimals:            0,
            labelsInnerUnitsPre:            '',
            labelsInnerUnitsPost:           '',
            labelsInnerScaleThousand:       null,
            labelsInnerScalePoint:          null,
            labelsInnerSpecific:            null,
            labelsInnerOffsetx:             0,
            labelsInnerOffsety:             0,

            labelsCount:                    10,
            labelsPosition:                 'right',
            labelsOffsetx:                  0,
            labelsOffsety:                  0,
            labelsFont:                     null,
            labelsSize:                     null,
            labelsColor:                    null,
            labelsBold:                     null,
            labelsItalic:                   null,
            labelsSpecific:                 null,
            labelsSpecificFormattedDecimals:    0,
            labelsSpecificFormattedUnitsPre:    '',
            labelsSpecificFormattedUnitsPost:   '',
            labelsSpecificFormattedThousand:    ',',
            labelsSpecificFormattedPoint:       '.',

            adjustable:                     false,

            key:                            null,
            keyBackground:                  'white',
            keyPosition:                    'graph',
            keyHalign:                      'right',
            keyShadow:                      false,
            keyShadowColor:                 '#666',
            keyShadowBlur:                  3,
            keyShadowOffsetx:               2,
            keyShadowOffsety:               2,
            keyPositionGutterBoxed:         false,
            keyPositionX:                   null,
            keyPositionY:                   null,
            keyColorShape:                  'square',
            keyRounded:                     true,
            keyLinewidth:                   1,
            keyColors:                      null,
            keyInteractive:                 false,
            keyInteractiveHighlightChartLinewidth: 2,
            keyInteractiveHighlightChartStroke: '#000',
            keyInteractiveHighlightChartFill:   'rgba(255,255,255,0.7)',
            keyInteractiveHighlightLabel:   'rgba(255,0,0,0.2)',
            keyLabelsColor:                 null,
            keyLabelsFont:                  null,
            keyLabelsSize:                  null,
            keyLabelsBold:                  null,
            keyLabelsItalic:                null,
            keyLabelsOffsetx:               0,
            keyLabelsOffsety:               0,
            keyFormattedDecimals:           0,
            keyFormattedPoint:              '.',
            keyFormattedThousand:           ',',
            keyFormattedUnitsPre:           '',
            keyFormattedUnitsPost:          '',
            keyFormattedValueSpecific:      null,
            keyFormattedItemsCount:         null,

            borderInner:                    true,

            corners:                             'square', // Can also be round
            cornersRoundRadius:                   10,

            clearto:                        'rgba(0,0,0,0)'
        }

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
            alert('[PROGRESS] No canvas support');
            return;
        }


        //
        // Create the dollar objects so that functions can be added to them
        //
        var linear_data = RGraph.arrayLinearize(this.value);
        for (var i=0; i<linear_data.length; ++i) {
            this['$' + i] = {};
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

            // Go through all of the properties and make sure
            // that they're using the correct capitalisation
            if (typeof name === 'string') {
                name = this.properties_lowercase_map[name.toLowerCase()] || name;
            }

            // Set the colorsParsed flag to false if the colors
            // property is being set
            if (
                   name === 'colors'
                || name === 'tickmarksInnerColor'
                || name === 'tickmarksOuterColor'
                || name === 'colorsStrokeInner'
                || name === 'colorsStrokeOuter'
                || name === 'highlightFill'
                || name === 'highlightStroke'
                || name === 'backgroundColor'
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
            // Populate the labels string/array if its a string
            //
            if (properties.labelsSpecific && properties.labelsSpecific.length) {
                //
                // If the labels option is a string then turn it
                // into an array.
                //
                if (typeof properties.labelsSpecific === 'string') {
                    properties.labelsSpecific = RGraph.arrayPad({
                        array:  [],
                        length: properties.labelsCount,
                        value:  properties.labelsSpecific
                    });
                }

                for (var i=0; i<properties.labelsSpecific.length; ++i) {
                    properties.labelsSpecific[i] = RGraph.labelSubstitution({
                        object:    this,
                        text:      properties.labelsSpecific[i],
                        index:     i,
                        value:     (typeof this.value === 'object' && typeof this.value[i] === 'number') ? this.value[i] : this.value,
                        decimals:  properties.labelsSpecificFormattedDecimals  || 0,
                        unitsPre:  properties.labelsSpecificFormattedUnitsPre  || '',
                        unitsPost: properties.labelsSpecificFormattedUnitsPost || '',
                        thousand:  properties.labelsSpecificFormattedThousand  || ',',
                        point:     properties.labelsSpecificFormattedPoint     || '.'
                    });
                }
            }




            //
            // Make the margins easy ro access
            //
            this.marginLeft   = properties.marginLeft;
            this.marginRight  = properties.marginRight;
            this.marginTop    = properties.marginTop;
            this.marginBottom = properties.marginBottom;
    
            // Figure out the width and height
            this.width  = this.canvas.width - this.marginLeft - this.marginRight;
            this.height = this.canvas.height - this.marginTop - this.marginBottom;



            //
            // Stop these growing uncontrollably
            //
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
            this.drawTitles();

    
    
    
            //
            // Setup the context menu if required
            //
            if (properties.contextmenu) {
                RGraph.showContext(this);
            }




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
            
            // Draw a key if necessary
            if (properties.key && properties.key.length) {
                RGraph.drawKey(this, properties.key, properties.colors);
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










            //
            // Install any inline responsive configuration. This
            // should be last in the draw function - even after
            // the draw events.
            //
            RGraph.installInlineResponsive(this);








            
            return this;
        };








        //
        // Draw the bar itself
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
                RGraph.setShadow(
                    this,
                    properties.shadowColor,
                    properties.shadowOffsetx,
                    properties.shadowOffsety,
                    properties.shadowBlur
                );
            }

            // Draw the outline
            this.context.fillStyle   = properties.backgroundColor;
            this.context.strokeStyle = properties.colorsStrokeOuter;


            if (properties.corners === 'round') {
            
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
                
                this.path(
                    'b r % % % % s % f %',
                    this.marginLeft,
                    this.marginTop,
                    this.width,
                    this.height,
                    properties.colorsStrokeOuter,
                    properties.backgroundColor
                );
            }


            // Turn off any shadow
            RGraph.noShadow(this);

            this.context.strokeStyle = properties.colorsStrokeOuter;
            this.context.fillStyle   = properties.colors[0];
            var margin     = properties.marginInner;
            var barHeight  = (this.canvas.height - this.marginTop - this.marginBottom) * ((RGraph.arraySum(this.value) - this.min) / (this.max - this.min));

            // Draw the actual bar itself
            if (typeof this.value === 'number') {

                this.context.lineWidth   = 1;
                this.context.strokeStyle = properties.colorsStrokeInner;

                if (properties.borderInner) {
                    this.path(
                        'b rr % % % % % s %',
                        this.marginLeft + margin,
                        this.canvas.height - properties.marginBottom - barHeight,
                        this.width - margin - margin,
                        barHeight,
                        properties.corners === 'round' ? properties.cornersRoundRadius : 0,
                        properties.colorsStrokeInner
                    );
                }

                this.path(
                    'b rr % % % % % f %',
                    this.marginLeft + margin,
                    this.canvas.height - properties.marginBottom - barHeight,
                    this.width - margin - margin,
                    barHeight,
                    properties.corners === 'round' ? properties.cornersRoundRadius : 0,
                    properties.colors[0]
                );
            } else if (typeof this.value == 'object') {

                this.context.beginPath();
                this.context.strokeStyle = properties.colorsStrokeInner;
    
                var startPoint = this.canvas.height - this.marginBottom;
    
                for (var i=0,len=this.value.length; i<len; ++i) {

                    var segmentHeight = ( (this.value[i] - this.min) / (this.max - this.min) ) * (this.canvas.height - this.marginBottom - this.marginTop);

                    if (properties.borderInner) {
                        this.path(
                            'b rr % % % % % s %',
                            this.marginLeft + margin,
                            startPoint - segmentHeight,
                            this.width - margin - margin,
                            segmentHeight,
                            this.context.strokeStyle
                        );
                    }

                    // DON'T use the RGraph.path() function for this
                    this.context.beginPath();
                    this.drawbarStackedSection(
                        this.marginLeft + margin,
                        startPoint - segmentHeight,
                        this.width - margin - margin,
                        segmentHeight,
                        i,
                        i === (len - 1)
                    );
                    this.context.fillStyle = properties.colors[i];
                    this.context.fill();

                    // Store the coords
                    this.coords.push([
                        this.marginLeft + margin,
                        startPoint - segmentHeight,
                        this.width - margin - margin,
                        segmentHeight
                    ]);
    
                    startPoint -= segmentHeight;
                }

                this.context.fill();
            }



            //
            // Inner inner tickmarks
            //
            if (properties.tickmarksInnerCount > 0) {
            
                var spacing = (this.canvas.height - this.marginTop - this.marginBottom) / properties.tickmarksInnerCount;
    
                this.context.lineWidth   = 1;
                this.context.strokeStyle = properties.colorsStrokeInner;

                this.context.beginPath();
    
                for (var y = this.marginTop; y<this.canvas.height - this.marginBottom; y+=spacing) {
                    this.context.moveTo(this.marginLeft, Math.round(y));
                    this.context.lineTo(this.marginLeft + 3, Math.round(y));
    
                    this.context.moveTo(this.canvas.width - this.marginRight, Math.round(y));
                    this.context.lineTo(this.canvas.width - this.marginRight - 3, Math.round(y));
                }
    
                this.context.stroke();
            }

            this.context.beginPath();
            this.context.strokeStyle = properties.colorsStrokeInner;

            if (typeof this.value == 'number') {
                
                if (properties.borderInner) {
                    this.path(
                        'b rr % % % %',
                        this.marginLeft + margin,
                        this.marginTop + this.height - barHeight,
                        this.width - margin - margin,
                        barHeight
                    );
                }


                this.path(
                    'b rr % % % %',
                    this.marginLeft + margin,
                    this.marginTop + this.height - barHeight,
                    this.width - margin - margin,
                    barHeight
                );
    
                // Store the coords
                this.coords.push([
                    this.marginLeft + margin,
                    this.marginTop + this.height - barHeight,
                    this.width - margin - margin,
                    barHeight
                ]);
            }

    
            //
            // Draw the arrows indicating the level if requested
            //
            if (properties.arrows) {
                var x = this.marginLeft - 4;
                var y = this.canvas.height - this.marginBottom - barHeight;
                
                this.context.lineWidth = 1;
                this.context.fillStyle = 'black';
                this.context.strokeStyle = 'black';
    
                this.context.beginPath();
                    this.context.moveTo(x, y);
                    this.context.lineTo(x - 4, y - 2);
                    this.context.lineTo(x - 4, y + 2);
                this.context.closePath();
    
                this.context.stroke();
                this.context.fill();
    
                x +=  this.width + 8;
    
                this.context.beginPath();
                    this.context.moveTo(x, y);
                    this.context.lineTo(x + 4, y - 2);
                    this.context.lineTo(x + 4, y + 2);
                this.context.closePath();
    
                this.context.stroke();
                this.context.fill();
                
                this.context.beginPath();
            }
    
    

    
            //
            // Draw the "in-bar" label
            //
            if (properties.labelsInner) {

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

                    x:                 ((this.canvas.width - this.marginLeft - this.marginRight) / 2) + this.marginLeft + properties.labelsInnerOffsetx,
                    y:                 this.coords[this.coords.length - 1][1] - 5 + properties.labelsInnerOffsety,

                    text:              typeof properties.labelsInnerSpecific === 'string'
                                            ? 
                                            properties.labelsInnerSpecific
                                            :
                                            RGraph.numberFormat({
                                                object:    this,
                                                number:    RGraph.arraySum(this.value).toFixed(typeof properties.labelsInnerDecimals === 'number' ? properties.labelsInnerDecimals : properties.scaleDecimals),
                                                unitspre:  typeof properties.labelsInnerUnitsPre  === 'string' ? properties.labelsInnerUnitsPre  : properties.scaleUnitsPre,
                                                unitspost: typeof properties.labelsInnerUnitsPost === 'string' ? properties.labelsInnerUnitsPost : properties.scaleUnitsPost,
                                                point:     typeof properties.labelsInnerPoint      === 'string' ? properties.labelsInnerPoint      : properties.scalePoint,
                                                thousand:  typeof properties.labelsInnerThousand   === 'string' ? properties.labelsInnerThousand   : properties.scaleThousand
                                            }),
                    valign:            'bottom',
                    halign:            'center',
                    bounding:          true,
                    boundingFill:      properties.labelsInnerBackgroundFill,
                    boundingStroke:    properties.labelsInnerBorder ? properties.labelsInnerBorderColor : 'rgba(0,0,0,0)',
                    boundingLinewidth: properties.labelsInnerBorderLinewidth,
                    tag:               'labels.inner'
                });
            }
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
        // @param index  number The index number of the bar (0-whatever)
        //
        this.drawbarStackedSection = function (x, y, width, height, index)
        {
            this.context.roundRect(
                x,
                y,
                width,
                height,
                properties.corners === 'round' ? [
                    (index === (this.value.length - 1) || typeof this.value === 'number') ? this.properties.cornersRoundRadius : 0,
                    (index === (this.value.length - 1) || typeof this.value === 'number') ? this.properties.cornersRoundRadius : 0,
                    (index === 0 || typeof this.value === 'number') ? this.properties.cornersRoundRadius : 0,
                    (index === 0 || typeof this.value === 'number') ? this.properties.cornersRoundRadius : 0
                ] : 0
            );
        };








        //
        // The function that draws the OUTER tick marks.
        //
        this.drawTickMarks = function ()
        {
            this.context.strokeStyle = properties.colorsStrokeOuter;
    
            if (properties.tickmarksOuter) {
                this.context.beginPath();
                    for (var i=0; i<=properties.tickmarksOuterCount; i++) {
                        
                        var startX = properties.labelsPosition === 'left' ? this.marginLeft : this.canvas.width - properties.marginRight,
                            endX   = properties.labelsPosition === 'left' ? startX - 4 : startX + 4,
                            yPos   = (this.height * (i / properties.tickmarksOuterCount)) + this.marginTop;
    
                        this.context.moveTo(startX, Math.round(yPos));
                        this.context.lineTo(endX, Math.round(yPos));
                    }
                this.context.stroke();
            }
        };








        //
        // The function that draws the labels
        //
        this.drawLabels = function ()
        {
            if (!RGraph.isNullish(properties.labelsSpecific)) {
                return this.drawSpecificLabels();
            }
    
            this.context.fillStyle = properties.textColor;

            var position   = properties.labelsPosition.toLowerCase();
            var xAlignment = position === 'left' ? 'right' : 'left';
            var yAlignment = 'center';
            var count      = properties.labelsCount;
            var units_pre  = properties.scaleUnitsPre;
            var units_post = properties.scaleUnitsPost;
            var text_size  = properties.textSize;
            var text_font  = properties.textFont;
            var decimals   = properties.scaleDecimals;
            var offsetx    = properties.labelsOffsetx;
            var offsety    = properties.labelsOffsety;
    
            if (properties.tickmarksOuter) {

                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'labels'
                });

                for (var i=0; i<count ; ++i) {
                    RGraph.text({
                    
                    object: this,

                     font: textConf.font,
                     size: textConf.size,
                    color: textConf.color,
                     bold: textConf.bold,
                   italic: textConf.italic,

                        x:      position == 'left' ? (this.marginLeft - 7 + offsetx) : (this.canvas.width - this.marginRight + 7) + offsetx,
                        y:      (((this.canvas.height - this.marginTop - this.marginBottom) / count) * i) + this.marginTop + offsety,
                        text:   this.scale2.labels[this.scale2.labels.length - (i+1)],
                        valign: yAlignment,
                        halign: xAlignment,
                        tag:    'scale'
                    });
                }
                
                //
                // Show zero?
                //            
                if (this.min == 0) {

                    RGraph.text({
                        
                    object: this,

                     font: textConf.font,
                     size: textConf.size,
                    color: textConf.color,
                     bold: textConf.bold,
                   italic: textConf.italic,

                        x:      position == 'left' ? (this.marginLeft - 5 + offsetx) : (this.canvas.width - this.marginRight + 5 + offsetx),
                        y:      this.canvas.height - this.marginBottom + offsety,
                        text:   RGraph.numberFormat({
                                    object:    this,
                                    number:    this.min.toFixed(this.min === 0 ? 0 : decimals),
                                    unitspre:  units_pre,
                                    unitspost: units_post,
                                    point:     properties.scalePoint,
                                    thousand:  properties.scaleThousand,
                                }),
                        valign: yAlignment,
                        halign: xAlignment,
                        tag:    'scale'
                    });
                }




                //
                // min is set
                //
                if (this.min != 0) {
                    RGraph.text({
                    
                    object: this,

                     font: textConf.font,
                     size: textConf.size,
                    color: textConf.color,
                     bold: textConf.bold,
                   italic: textConf.italic,

                        x:      position == 'left' ? (this.marginLeft - 5 + offsetx) : (this.canvas.width - this.marginRight + 5 + offsetx),
                        y:      this.canvas.height - this.marginBottom + offsety,
                        text:   RGraph.numberFormat({
                                    object:    this,
                                    number:    this.min.toFixed(decimals),
                                    unitspre:  units_pre,
                                    unitspost: units_post
                                }),
                        valign: yAlignment,
                        halign: xAlignment,
                        tag:    'scale'
                    });
                }
            }
        };








        //
        // Draws titles
        //
        this.drawTitles = function ()
        {
            // Draw the main title and subtitle
            RGraph.drawTitle(this);





            // Draw side title
            if (properties.titleSide) {
    
                this.context.fillStyle = properties.titleSideColor;
    

                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'titleSide'
                });
                var x = properties.labelsPosition == 'right' ? this.marginLeft - 10 : (this.canvas.width - this.marginRight) + 10;
                var y = this.marginTop + (this.height / 2);

                // Add any use specified offset
                if (typeof properties.titleSideOffsetx === 'number') x += properties.titleSideOffsetx;
                if (typeof properties.titleSideOffsety === 'number') y += properties.titleSideOffsety;

                RGraph.text({
               object:      this,                 
                 font:      textConf.font,
                 size:      textConf.size,
                color:      textConf.color,
                 bold:      textConf.bold,
               italic:      textConf.italic,
                    x:      x,
                    y:      y,
                    text:   properties.titleSide,
                    valign: 'bottom',
                    halign: 'center',
                    accessible: false,
                    angle:  properties.labelsPosition == 'right' ? 270 : 90,
                    tag:    'title.side'
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
                mouseX  = mouseXY[0],
                mouseY  = mouseXY[1]

            for (var i=0,len=this.coords.length; i<len; i++) {

                if (RGraph.tooltipsHotspotIgnore(this, i)) {
                    continue;
                }

                var x   = this.coords[i][0],
                    y   = this.coords[i][1],
                    w   = this.coords[i][2],
                    h   = this.coords[i][3],
                    idx = i;

                //
                // Draw the section of the bar again
                //
if (properties.corners === 'round') {
    this.path(
        'b rr % % % % %',
        x,y,w,h,properties.cornersRoundRadius
    );

} else {

    this.path(
        'b r % % % %',
        x,y,w,h
    );
}

                if (
                       this.context.isPointInPath(mouseX, mouseY)
                    && (this.properties.clip ? RGraph.clipTo.test(this, mouseX, mouseY) : true)
                   ) {

                    var tooltip = RGraph.parseTooltipText ? RGraph.parseTooltipText(properties.tooltips, i) : null;
                
                    return {
                        object: this,
                             x: x,
                             y: y,
                         width: w,
                        height: h,
                         index: i,
                       dataset: 0,
               sequentialIndex: i,
                       tooltip: typeof tooltip === 'string' ? tooltip : null
                    };
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
            var mouseCoords = RGraph.getMouseXY(e);
            var mouseX      = mouseCoords[0];
            var mouseY      = mouseCoords[1];
    
            var value = (this.height - (mouseY - this.marginTop)) / this.height;
                value *= this.max - this.min;
                value += this.min;

            // Bounds checking
            if (value > this.max) value = this.max;
            if (value < this.min) value = this.min;

            return value;
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
                
                // Highlight all of the rects except this one - essentially an inverted highlight
                } else if (typeof properties.highlightStyle === 'string' && properties.highlightStyle === 'invert') {
                    for (var i=0; i<this.coords.length; ++i) {
                        if (i !== shape.sequentialIndex) {
                            if (properties.corners === 'round') {

                                this.path(
                                    'b lw %',
                                    properties.highlightLinewidth
                                );
                                
                                this.drawbarStackedSection(
                                    this.coords[i][0],
                                    this.coords[i][1],
                                    this.coords[i][2],
                                    this.coords[i][3],
                                    i
                                );
                                
                                this.path(
                                    's % f %',
                                    properties.highlightStroke,
                                    properties.highlightFill
                                );
                            } else {
                                this.path(
                                    'b lw % r % % % % s % f %',
                                    properties.highlightLinewidth,
                                    this.coords[i][0],
                                    this.coords[i][1],
                                    this.coords[i][2],
                                    this.coords[i][3],
                                    properties.highlightStroke,
                                    properties.highlightFill
                                );
                            }
                        }
                    }
    
                } else {

                    if (properties.corners === 'round') {
    
                        this.path(
                            'b lw %',
                            properties.highlightLinewidth
                        );

                        this.drawbarStackedSection(
                            shape.x,
                            shape.y,
                            shape.width,
                            shape.height,
                            shape.index
                        );
                    
                        this.path(
                            's % f %',
                            properties.highlightStroke,
                            properties.highlightFill
                        );
                    
                    } else {

                        this.path(
                            'b lw % r % % % % s % f %',
                            properties.highlightLinewidth,
                            this.coords[shape.index][0],
                            this.coords[shape.index][1],
                            this.coords[shape.index][2],
                            this.coords[shape.index][3],
                            properties.highlightStroke,
                            properties.highlightFill
                        );
                    }
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
                && mouseXY[1] >= this.marginTop
                && mouseXY[1] <= (this.canvas.height - this.marginBottom)
                ) {

                return this;
            }
        };








        //
        // This function allows the VProgress to be  adjustable.
        // UPDATE: Not any more
        //
        this.allowAdjusting = function () {return;};








        //
        // This method handles the adjusting calculation for when the mouse
        // is moved
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
    
                    // Fire the onadjust event
                    RGraph.fireCustomEvent(this, 'onadjust');
        
                    this.value = Number(value.toFixed(properties.scaleDecimals));
                    RGraph.redrawCanvas(this.canvas);
                }
            }
        };








        //
        // Draws labelsSpecific
        //
        this.drawSpecificLabels = function ()
        {
            var labels = properties.labelsSpecific;
    
            if (labels) {
    
                var halign = properties.labelsPosition === 'right' ? 'left' : 'right';
                var step   = this.height / (labels.length - 1);
        
                this.context.beginPath();
    
                    this.context.fillStyle = properties.textColor;
    
                    for (var i=0; i<labels.length; ++i) {

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

                            x:          properties.labelsPosition == 'right' ? this.canvas.width - this.marginRight + 7 : this.marginLeft - 7,
                            y:          (this.height + this.marginTop) - (step * i),
                            text:       labels[i],
                            valign:     'center',
                            halign:     halign,
                            tag:        'labels.specific',
                          cssClass:     properties.labelsSpecific
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
        // This function returns the appropriate Y coordinate for the given Y value
        // 
        // @param  int value The Y value you want the coordinate for
        // @returm int       The coordinate
        //
        this.getYCoord = function (value)
        {
            if (value > this.max || value < this.min) {
                return null;
            }

            var barHeight = this.canvas.height - properties.marginTop - properties.marginBottom;
            var coord = ((value - this.min) / (this.max - this.min)) * barHeight;
            coord = this.canvas.height - coord - properties.marginBottom;
            
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
                this.original_colors.colors              = RGraph.arrayClone(properties.colors, {structuredClone: false});
                this.original_colors.tickmarksInnerColor = RGraph.arrayClone(properties.tickmarksInnerColor, {structuredClone: false});
                this.original_colors.tickmarksOuterColor = RGraph.arrayClone(properties.tickmarksOuterColor, {structuredClone: false});
                this.original_colors.colorsStrokeInner   = RGraph.arrayClone(properties.colorsStrokeInner, {structuredClone: false});
                this.original_colors.colorsStrokeOuter   = RGraph.arrayClone(properties.colorsStrokeOuter, {structuredClone: false});
                this.original_colors.highlightFill       = RGraph.arrayClone(properties.highlightFill, {structuredClone: false});
                this.original_colors.highlightStroke     = RGraph.arrayClone(properties.highlightStroke, {structuredClone: false});
                this.original_colors.backgroundColor     = RGraph.arrayClone(properties.backgroundColor, {structuredClone: false});
            }

            var colors = properties.colors;
    
            for (var i=0,len=colors.length; i<len; ++i) {
                colors[i] = this.parseSingleColorForGradient(colors[i]);
            }
    
            properties.tickmarksInnerColor = this.parseSingleColorForGradient(properties.tickmarksInnerColor);
            properties.tickmarksOuterColor = this.parseSingleColorForGradient(properties.tickmarksOuterColor);
            properties.colorsStrokeInner   = this.parseSingleColorForGradient(properties.colorsStrokeInner);
            properties.colorsStrokeOuter   = this.parseSingleColorForGradient(properties.colorsStrokeOuter);
            properties.highlightFill       = this.parseSingleColorForGradient(properties.highlightFill);
            properties.highlightStroke     = this.parseSingleColorForGradient(properties.highlightStroke);
            properties.backgroundColor     = this.parseSingleColorForGradient(properties.backgroundColor);
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
                        def: RegExp.$1
                    });
                }

                var parts = RegExp.$1.split(':');
    
                // Create the gradient
                var grad = this.context.createLinearGradient(0, this.canvas.height - properties.marginBottom, 0, properties.marginTop);
    
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
        // This function handles highlighting an entire data-series for the interactive
        // key
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
                    
                    // Corners
                    [
                        index === (this.coords.length - 1) ? properties.cornersRoundRadius : 0,
                        index === (this.coords.length - 1) ? properties.cornersRoundRadius : 0,
                        index === 0 ? properties.cornersRoundRadius : 0,
                        index === 0 ? properties.cornersRoundRadius : 0
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
        // Draws a bar with a curved end
        // 
        // DOESN'T DRAW A CURVED BAR ANY MORE - JUST A REGULAR SQUARE ENDED BAR
        // 
        // @param object opt The coords and colours
        //
        this.drawCurvedBar = function (opt)
        {
            this.path(
                'b r % % % %',
                opt.x,opt.y,opt.width,opt.height
            );

            if (opt.stroke) {
                this.context.strokeStyle = opt.stroke;
                this.context.stroke();
            }
            
            if (opt.fill) {
                this.context.fillStyle = opt.fill;
                this.context.fill();
            }
        };








        //
        // This function runs once only
        // (put at the end of the file (before any effects))
        //
        this.firstDrawFunc = function ()
        {
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
        // HProgress Grow effect (which is also the VPogress Grow effect)
        // 
        // @param object obj The chart object
        //
        this.grow = function ()
        {
            // Cancel any stop request if one is pending
            this.cancelStopAnimation();


            var obj           = this;
            var canvas        = this.canvas;
            var context       = this.context;
            var initial_value = this.currentValue;
            var opt           = arguments[0] || {};
            var numFrames     = opt.frames || 30;
            var frame         = 0
            var callback      = arguments[1] || function () {};
    
            if (typeof this.value === 'object') {
    
                if (RGraph.isNullish(this.currentValue)) {
                    this.currentValue = [];
                    for (var i=0; i<this.value.length; ++i) {
                        this.currentValue[i] = 0;
                    }
                }
    
                var diff      = [];
                var increment = [];
    
                for (var i=0; i<this.value.length; ++i) {
                    diff[i]      = this.value[i] - Number(this.currentValue[i]);
                    increment[i] = diff[i] / numFrames;
                }
                
                if (initial_value == null) {
                    initial_value = [];
                    for (var i=0; i< this.value.length; ++i) {
                        initial_value[i] = 0;
                    }
                }
    
            } else {
    
                var diff = this.value - Number(this.currentValue);
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
                        for (var i=0; i<initial_value.length; ++i) {
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
            return {
                  index: opt.index,
                dataset: 0,
        sequentialIndex: opt.index,
                  value: typeof this.value === 'object' ? this.value[opt.index] : this.value,
                 values: typeof this.value === 'object' ? [this.value[opt.index]] : [this.value]
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
            var color = (properties.tooltipsFormattedKeyColors && properties.tooltipsFormattedKeyColors[specific.index]) ? properties.tooltipsFormattedKeyColors[specific.index] : properties.colors[specific.index];
            var label = (properties.tooltipsFormattedKeyLabels && properties.tooltipsFormattedKeyLabels[specific.index]) ? properties.tooltipsFormattedKeyLabels[specific.index] : '';

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
                  canvasXY[0]                    // The X coordinate of the canvas
                + coords[0]                      // The X coordinate of the bar on the chart
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
                + (coords[2] / 2)                // Add half of the bar width
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

            var y1 = this.getYCoord(from),
                y2 = this.getYCoord(to);

            // Change the angle if the number is "max"
            if (RegExp.$2 === 'max') {
                y2 = 0;
            }

            // Change the angle if the number is "min"
            if (RegExp.$1 === 'min') {
                y1 = this.canvas.height;
            }

            this.path(
                'sa b r % % % % cl',
                0,y2,this.canvas.width, Math.max(y1, y2) - Math.min(y1, y2)
            );
        };








        //
        // This function handles TESTING clipping to scale values.
        // Because each chart handles scales differently, a worker
        // function is needed instead of it all being done centrally
        // in the RGraph.clipTo.start() function.
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

            var y1 = this.getYCoord(from),
                y2 = this.getYCoord(to);

            // Change the angle if the number is "max"
            if (RegExp.$2 === 'max') {
                y2 = 0;
            }

            // Change the angle if the number is "min"
            if (RegExp.$1 === 'min') {
                y1 = this.canvas.height;
            }

            this.path(
                'b r % % % %',
                0,y2,this.canvas.width, Math.max(y1, y2) - Math.min(y1, y2)
            );
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