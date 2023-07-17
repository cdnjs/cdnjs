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
        this.id                     = conf.id;
        this.canvas                 = document.getElementById(this.id);
        this.context                = this.canvas.getContext('2d');
        this.canvas.__object__      = this;
        this.min                    = RGraph.stringsToNumbers(conf.min);
        this.max                    = RGraph.stringsToNumbers(conf.max);
        this.value                  = RGraph.stringsToNumbers(conf.value);
        this.type                   = 'semicircularprogress';
        this.coords                 = [];
        this.isRGraph               = true;
        this.isrgraph               = true;
        this.rgraph                 = true;
        this.currentValue           = null;
        this.uid                    = RGraph.createUID();
        this.canvas.uid             = this.canvas.uid ? this.canvas.uid : RGraph.createUID();
        this.colorsParsed           = false;
        this.coordsText             = [];
        this.original_colors        = [];
        this.firstDraw              = true; // After the first draw this will be false
        this.stopAnimationRequested = false;// Used to control the animations


        this.properties =
        {
            backgroundColor:            'rgba(0,0,0,0)',
            backgroundGrid:             false,
            backgroundGridMargin:       20,
            backgroundGridColor:        '#ddd',
            backgroundGridLinewidth:    1,
            backgroundGridCircles:      true,
            backgroundGridRadials:      true,
            backgroundGridRadialsCount: 10,
            backgroundBackdrop:         true,

            colors:                     ['#0c0', '#f66', '#66f', 'yellow', 'pink','#ccc','#cc0','#0cc','#c0c'],

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

            scale:                      false,
            scaleMin:                   0,
            scaleMax:                   null, // Defaults to the charts max value
            scaleDecimals:              0,
            scalePoint:                 '.',
            scaleThousand:              ',',
            scaleFormatter:             null,
            scaleUnitsPre:              '',
            scaleUnitsPost:             '',
            scaleLabelsCount:           10,
            scaleLabelsFont:            null,
            scaleLabelsSize:            null,
            scaleLabelsColor:           null,
            scaleLabelsBold:            null,
            scaleLabelsItalic:          null,
            scaleLabelsOffsetr:         0,
            scaleLabelsOffsetx:         0,
            scaleLabelsOffsety:         0,

            shadow:                     false,
            shadowColor:                'rgba(220,220,220,1)',
            shadowBlur:                 2,
            shadowOffsetx:              2,
            shadowOffsety:              2,

            labelsCenter:               true,
            labelsCenterIndex:          0,
            labelsCenterFade:           false,
            labelsCenterSize:           40,
            labelsCenterColor:          null,
            labelsCenterBold:           null,
            labelsCenterItalic:         null,
            labelsCenterFont:           null,
            labelsCenterValign:         'bottom',
            labelsCenterOffsetx:        0,
            labelsCenterOffsety:        0,
            labelsCenterThousand:       ',',
            labelsCenterPoint:          '.',
            labelsCenterDecimals:       0,
            labelsCenterUnitsPost:      '',
            labelsCenterUnitsPre:       '',
            labelsCenterSpecific:       null,

            labelsMin:                  true,
            labelsMinColor:             null,
            labelsMinFont:              null,
            labelsMinBold:              null,
            labelsMinSize:              null,
            labelsMinItalic:            null,
            labelsMinOffsetAngle:       0,
            labelsMinOffsetx:           0,
            labelsMinOffsety:           5,
            labelsMinThousand:       ',',
            labelsMinPoint:          '.',
            labelsMinDecimals:       0,
            labelsMinUnitsPost:      '',
            labelsMinUnitsPre:       '',
            labelsMinSpecific:       null,

            labelsMax:                  true,
            labelsMaxColor:             null,
            labelsMaxFont:              null,
            labelsMaxBold:              null,
            labelsMaxSize:              null,
            labelsMaxItalic:            null,
            labelsMaxOffsetAngle:       0,
            labelsMaxOffsetx:           0,
            labelsMaxOffsety:           5,
            labelsMaxThousand:       ',',
            labelsMaxPoint:          '.',
            labelsMaxDecimals:       0,
            labelsMaxUnitsPost:      '',
            labelsMaxUnitsPre:       '',
            labelsMaxSpecific:       null,

            title:                      '',
            titleBold:                  null,
            titleItalic:                null,
            titleFont:                  null,
            titleSize:                  null,
            titleColor:                 null,
            titleHalign:                null,
            titleValign:                null,
            titleOffsetx:               0,
            titleOffsety:               0,
            titleSubtitle:        '',
            titleSubtitleSize:    null,
            titleSubtitleColor:   '#aaa',
            titleSubtitleFont:    null,
            titleSubtitleBold:    null,
            titleSubtitleItalic:  null,
            titleSubtitleOffsetx: 0,
            titleSubtitleOffsety: 0,

            textSize:                   12,
            textColor:                  'black',
            textFont:                   'Arial, Verdana, sans-serif',
            textBold:                   false,
            textItalic:                 false,
            textAccessible:             false,
            textAccessibleOverflow:     'visible',
            textAccessiblePointerevents:false,
            text:                       null,

            contextmenu:                null,

            tooltips:                        null,
            tooltipsEffect:                  'slide',
            tooltipsOverride:                null,
            tooltipsCssClass:                'RGraph_tooltip',
            tooltipsCss:                     null,
            tooltipsEvent:                   'onclick',
            tooltipsHighlight:               true,
            tooltipsHotspotXonly:            false,
            tooltipsFormattedThousand:       ',',
            tooltipsFormattedPoint:          '.',
            tooltipsFormattedDecimals:       0,
            tooltipsFormattedUnitsPre:       '',
            tooltipsFormattedUnitsPost:      '',
            tooltipsFormattedKeyColors:      null,
            tooltipsFormattedKeyColorsShape: 'square',
            tooltipsFormattedKeyColorsCss:   null,
            tooltipsFormattedKeyLabels:      [],
            tooltipsFormattedListType:       'ul',
            tooltipsFormattedListItems:      null,
            tooltipsFormattedTableHeaders:   null,
            tooltipsFormattedTableData:      null,
            tooltipsPointer:                 true,
            tooltipsPointerCss:              null,
            tooltipsPositionStatic:          true,
            tooltipsOffsetx:                 0,
            tooltipsOffsety:                 0,
            tooltipsHotspotIgnore:           null,

            highlightStyle:             null,
            highlightStroke:            'rgba(0,0,0,0)',
            highlightFill:              'rgba(255,255,255,0.7)',

            annotatable:                false,
            annotatebleColor:           'black',
            annotatebleLinewidth:       1,

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
            keyPositionMarginHSpace:            0,
            keyPositionX:                       null,
            keyPositionY:                       null,
            keyColorShape:                      'square',
            keyRounded:                         true,
            keyLinewidth:                       1,
            keyColors:                          null,
            keyInteractive:                     false,
            keyInteractiveHighlightChartStroke: 'rgba(0,0,0,0)',
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

            adjustable:                 false,
            
            variant:                    'default',

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
            // Constrain the value to be within the min and max
            //
            if (this.value > this.max) this.value = this.max;
            if (this.value < this.min) this.value = this.min;

            if (RGraph.isArray(this.value) && RGraph.arraySum(this.value) > this.max) {
                alert('[SEMI-CIRCULAR PROGRESS] Total value is over the maximum value');
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
            
            // Allow specify the centerx/centery/radius as a string for adjustments
            if (RGraph.isString(properties.centerx)) this.centerx += Number(properties.centerx);
            if (RGraph.isString(properties.centery)) this.centery += Number(properties.centery);
            if (RGraph.isString(properties.radius))  this.radius  += Number(properties.radius);

            this.coords = [];



            //
            // Stop this growing uncontrollably
            //
            this.coordsText = [];
            
            
            
            
    
            //
            // Draw the meter
            //
            this.drawBackgroundGrid();
            this.drawMeter();
            this.drawLabels();
            this.drawScale();
            
    
    
    
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
            // Add custom text thats specified
            //
            RGraph.addCustomText(this);




    
    
    
    
            //
            // This installs the event listeners
            //
            RGraph.installEventListeners(this);

            
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
        this.drawMeter = function ()
        {
            // Reset the .coords array
            this.coords = [];



            //
            // The start/end angles
            //
            var start = properties.anglesStart,
                end   = properties.anglesEnd;

            //
            // Calculate a scale
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

            // Draw the backgroundColor
            if (properties.backgroundColor !== 'rgba(0,0,0,0)') {
                this.path(
                    'fs % fr % % % %',
                    properties.backgroundColor,
                    0,0,this.canvas.width, this.canvas.height
                );
            }








            //
            // Draw the background for the bar which is a similar
            // color to the bar - just faded out a bit
            //
            if (properties.backgroundBackdrop) {
                this.path(
                    'lw % b ',
                    this.linewidth
                );
    
                // Draw the path for the bar
                this.pathBar({
                    startValue: 0,
                    endValue:   this.max
                });
    
                // Finish the paths and stroke/fill it
                this.path(
                    'c s % f % sx % sy % sc % sb % f % sx 0 sy 0 sb 0 sc rgba(0,0,0,0) lw 1',
                    properties.colorsStroke,
                    properties.colors[0],
                    properties.shadowOffsetx, properties.shadowOffsety, properties.shadow ? properties.shadowColor : 'rgba(0,0,0,0)', properties.shadowBlur,
                    'rgba(255,255,255,0.85)'
                );
            }

















            //
            // Draw a single value on the meter
            //
            if (RGraph.isNumber(this.value)) {

                // Begein anew...
                this.context.beginPath();
                
                // Draw the path for the indicator bar (not
                // stroking or filling it just yet)
                this.pathBar({
                    startValue: 0,
                    endValue: this.value
                });

                // Close the path and fill the bar with the
                // requested color
                this.path('c f %', properties.colors[0]);


                this.coords = [[
                    this.centerx,
                    this.centery,
                    this.radius,
                    this.getAngle(0),
                    this.getAngle(this.value),
                    this.width,
                    this.getAngle(this.value) - this.getAngle(0)
                ]];
            
            // Draw multiple values on the meter
            } else if (RGraph.isArray(this.value)) {

                for (var i=0,accValue=0; i<this.value.length; ++i) {

                    this.context.beginPath();
                    this.pathBar({
                        startValue: accValue,
                        endValue: accValue + this.value[i],
                        index: i
                    });
                    this.path('c f %', properties.colors[i]);

                    // Store the coordinates of this segment
                    this.coords.push([
                        this.centerx,
                        this.centery,
                        this.radius,
                        this.getAngle(accValue),
                        this.getAngle(accValue + this.value[i]),
                        this.width,
                        this.getAngle(accValue + this.value[i]) - this.getAngle(accValue)
                    ]);
                    
                    accValue += this.value[i];
                }
            }
        };








        //
        // A function to path the bar. This function only
        // PATHs the bar - it does not stroke or fill the
        // bar
        //
        // @param number start The start angle of the segment
        // @param number end   The end angle of the segment
        //
        this.pathBar = function (args)
        {
            // If the start value has been given instead of the
            // angle - work out the angle
            if (RGraph.isNumber(args.startValue)) {
                args.startAngle = this.getAngle(args.startValue);
            }

            // If the end value has been given instead of the
            // angle - work out the angle
            if (RGraph.isNumber(args.endValue)) {
                args.endAngle = this.getAngle(args.endValue);
            }








            // Get the end point for the middle of the END of the
            // meter
            var endpoint1 = RGraph.getRadiusEndPoint(
                this.centerx,
                this.centery,
                args.endAngle,
                this.radius - (this.width / 2)
            );

            // Get the end point for the middle of the START of the
            // meter
            var endpoint2 = RGraph.getRadiusEndPoint(
                this.centerx,
                this.centery,
                args.startAngle,
                this.radius - (this.width / 2)
            );

            // Draw the outside arc from the LHS to the RHS
            this.path(
                'a % % % % % false',
                this.centerx,
                this.centery,
                this.radius,
                args.startAngle,
                args.endAngle
            );

            // Draw the RHS rounded end if the variant is set
            // to rounded
            if (properties.variant === 'rounded') {
                this.path(
                    'a % % % % % false',
                    endpoint1[0],
                    endpoint1[1],
                    this.width / 2,
                    args.endAngle,
                    args.endAngle + RGraph.PI,
                );
            }
            
            // Draw the inner arc from the RHS back to the LHS
            this.path(
                ' a % % % % % true',
                this.centerx,
                this.centery,
                this.radius - this.width,
                args.endAngle,
                args.startAngle
            );
            
            // Draw the LHS rounded end if the variant is set
            // to rounded
            if (properties.variant === 'rounded') {
                this.path(
                    'a % % % % % %',
                    endpoint2[0],
                    endpoint2[1],
                    this.width / 2,
                    args.startAngle + RGraph.PI,
                    args.startAngle,
                    args.index > 0
                );
            }
        };







        //
        // The function that draws the labels
        //
        this.drawLabels = function ()
        {
            // Draw the labelsMin label
            if (properties.labelsMin) {
                //
                // Allow for a specific label
                //
                if (!RGraph.isNull(properties.labelsMinSpecific)) {
                    var text = properties.labelsMinSpecific;
                } else {
    
                    var text = RGraph.numberFormat({
                        object:    this,
                        number:    this.scale2.min.toFixed(typeof properties.labelsMinDecimals === 'number'? properties.labelsMinDecimals : properties.scaleDecimals),
                        unitspre:  properties.labelsMinUnitsPre,
                        unitspost: properties.labelsMinUnitsPost,
                        point:     properties.labelsMinPoint,
                        thousand:  properties.labelsMinThousand
                    });
                }
    
    
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
                    x:      xy[0] + properties.labelsMinOffsetx,
                    y:      xy[1] + properties.labelsMinOffsety,
                    valign: valign,
                    halign: halign,
                    text:   text
                });
            }









            // Draw the labelsMax label
            if (properties.labelsMax) {
                
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
    
    
    
                // Get the formatted max label number

                //
                // Allow for a specific label
                //
                if (!RGraph.isNull(properties.labelsMaxSpecific)) {
                    var text = properties.labelsMaxSpecific;
                } else {
                    var text = RGraph.numberFormat({
                        object:    this,
                        number:    this.scale2.max.toFixed(typeof properties.labelsMaxDecimals === 'number'? properties.labelsMaxDecimals : properties.scaleDecimals),
                        unitspre:  properties.labelsMaxUnitsPre,
                        unitspost: properties.labelsMaxUnitsPost,
                        point:     properties.labelsMaxPoint,
                        thousand:  properties.labelsMaxThousand
                    });
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
                    text: text
                });
            }














            // Draw the big label in the center
            if (properties.labelsCenter) {
                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'labelsCenter'
                });
                
                //
                // Allow for a specific label
                //
                if (!RGraph.isNull(properties.labelsCenterSpecific)) {
                    var text = properties.labelsCenterSpecific;
                } else {

                    var text = RGraph.numberFormat({
                        object:    this,
                        number:
                                   RGraph.isNumber(this.value)
                                       ? this.value.toFixed(   RGraph.isNumber(properties.labelsCenterDecimals) ? properties.labelsCenterDecimals : properties.scaleDecimals    )
                                       : this.value[properties.labelsCenterIndex].toFixed(
                                             RGraph.isNumber(properties.labelsCenterDecimals)
                                                 ? properties.labelsCenterDecimals
                                                 : properties.scaleDecimals
                                         ),
                        unitspre:  properties.labelsCenterUnitsPre,
                        unitspost: properties.labelsCenterUnitsPost,
                        point:     properties.labelsCenterPoint,
                        thousand:  properties.labelsCenterThousand
                    })
                }

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
                    text:       text
                });
                
                // Allows the center label to fade in
                if (properties.labelsCenterFade && ret.node) {
                    ret.node.style.opacity = 0;
    
                    var delay = 25,
                        incr  = 0.05;
    
                    for (var i=0; i<20; ++i) {
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
            RGraph.drawTitle(this);
        };








        //
        // Draws the background "grid"
        //
        this.drawBackgroundGrid = function ()
        {
            if (properties.backgroundGrid) {

                var margin      = properties.backgroundGridMargin;
                var outerRadius = this.radius + margin;
                var innerRadius = this.radius - this.width - margin;

                // Draw the background grid "circles"
                if (properties.backgroundGridCircles) {
                    
                    // Draw the outer arc
                    this.path(
                        'b lw % a % % % % % false',
                        properties.backgroundGridLinewidth,
                        this.centerx, this.centery,
                        outerRadius,
                        properties.anglesStart, properties.anglesEnd
                    );
        
                    // Draw the inner arc
                    this.path(
                        p = 'a % % % % % true c s %',
                        this.centerx, this.centery,
                        innerRadius, properties.anglesEnd, properties.anglesStart,
                        properties.backgroundGridColor
                    );
                }
                
                //
                // Draw the background grid radials
                //
                if (properties.backgroundGridRadials) {
                
                    // Calculate the radius increment
                    var increment = (properties.anglesEnd - properties.anglesStart) / properties.backgroundGridRadialsCount;
                    var angle     = properties.anglesStart;
    
                    for (var i=0; i<properties.backgroundGridRadialsCount; ++i) {

                        this.path(
                            ' b a % % % % % false a % % % % % false s %',
                            this.centerx,this.centery,innerRadius,angle,angle,
                            this.centerx,this.centery,outerRadius,angle,angle,
                            properties.backgroundGridColor
                        );

                        angle += increment;

                    }
                }                
            }
        };








        //
        // This function draws the scale
        //
        this.drawScale = function ()
        {
            if (properties.scale) {
            
                // Get the max value

                this.scale2 = RGraph.getScale({
                    object:              this,
                    options: {
                        'scale.max':         properties.scaleMax || this.max,
                        'scale.strict':      true,
                        'scale.min':         properties.scaleMin,
                        'scale.thousand':    properties.scaleThousand,
                        'scale.point':       properties.scalePoint,
                        'scale.decimals':    properties.scaleDecimals,
                        'scale.labels.count':properties.scaleLabelsCount,
                        'scale.round':       false,
                        'scale.units.pre':   properties.scaleUnitsPre,
                        'scale.units.post':  properties.scaleUnitsPost,
                        'scale.formatter':   properties.scaleFormatter
                    }
                });



                //
                // Loop thru the number of labels
                //
                for (var i=0; i<this.scale2.labels.length; ++i) {
                    
                    var textConf = RGraph.getTextConf({
                        object: this,
                        prefix: 'scaleLabels'
                    });

                    var xy = RGraph.getRadiusEndPoint({
                        cx:     this.centerx,
                        cy:     this.centery,
                        angle:  properties.anglesStart + (((i+1) / this.scale2.labels.length) * (properties.anglesEnd - properties.anglesStart) ),
                        radius: this.radius + (properties.backgroundGrid ? properties.backgroundGridMargin : 0) + textConf.size + properties.scaleLabelsOffsetr + 5
                    });

                    // Draw the label
                    RGraph.text({
                        object: this,
                        tag:    'scale',
                        font:   textConf.font,
                        size:   textConf.size,
                        color:  textConf.color,
                        bold:   textConf.bold,
                        italic: textConf.italic,
                        x: xy[0] + (properties.scaleLabelsOffsetx || 0),
                        y: xy[1] + (properties.scaleLabelsOffsety || 0),
                        valign: 'center',
                        halign: 'center',
                        text: this.scale2.labels[i]
                    });
                }










                //
                // Draw the zero label
                //
                var xy = RGraph.getRadiusEndPoint({
                    cx:     this.centerx,
                    cy:     this.centery,
                    angle:  properties.anglesStart,
                    radius: this.radius + (properties.backgroundGrid ? properties.backgroundGridMargin : 0) + textConf.size + properties.scaleLabelsOffsetr + 5
                });

                RGraph.text({
                    object: this,
                    font:   textConf.font,
                    size:   textConf.size,
                    color:  textConf.color,
                    bold:   textConf.bold,
                    italic: textConf.italic,
                    x:      xy[0] + (properties.scaleLabelsOffsetx || 0),
                    y:      xy[1] + (properties.scaleLabelsOffsety || 0),
                    valign: 'center',
                    halign: 'center',
                    text:   typeof properties.scaleFormatter === 'function'
                              ? (properties.scaleFormatter)({
                                    object:     this,
                                    number:     0,
                                    unitspre:   properties.scaleUnitsPre,
                                    unitspost:  properties.scaleUnitsPost,
                                    point:      properties.scalePoint,
                                    thousand:   properties.scaleThousand,
                                    formatter:  properties.scaleFormatter
                                })
                              : (properties.scaleUnitsPre || '') + properties.scaleMin.toFixed(properties.scaleDecimals).replace(/\./, properties.scalePoint) + (properties.scaleUnitsPost || '')
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

            // Loop through the coordinates checking for a match
            for (var i=0; i<this.coords.length; ++i) {

                if (RGraph.tooltipsHotspotIgnore(this, i)) {
                    continue;
                }
                
                // Draw the meter here but don't stroke or fill it
                // so that it can be tested with isPointInPath()
                this.context.beginPath();

                this.pathBar({
                    startAngle: this.coords[i][3],
                    endAngle: this.coords[i][4]
                });
    
    
    
                if (this.context.isPointInPath(mouseX, mouseY)) {
    
                    if (RGraph.parseTooltipText) {
                        var tooltip = RGraph.parseTooltipText(properties.tooltips, i);
                    }
    
                    return {
                        object: this,
                             x: this.coords[i][0],
                             y: this.coords[i][1],
                   radiusOuter: this.coords[i][2],
                   radiusInner: this.coords[i][2] - this.coords[i][5],
                         width: this.coords[i][5],
                    angleStart: this.coords[i][3],
                      angleEnd: this.coords[i][4],
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
                this.context.beginPath();
                
                this.pathBar({
                    startAngle: shape.angleStart,
                    endAngle:   shape.angleEnd,
                    index:      shape.index
                });

                this.path(
                    'c f % s % lw 1',
                    properties.highlightFill,
                    properties.highlightStroke
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
            var [mx, my] = RGraph.getMouseXY(e),
                rounded  = properties.variant === 'rounded',
                cx       = this.centerx
                cy       = this.centery,
                start    = properties.anglesStart,
                end      = properties.anglesEnd,
                radius   = this.radius;

            // Draw a Path so that the coords can be tested
            // (but don't stroke/fill it
            this.path(
                'b a % % % % % false',
                cx,
                cy,
                radius,
                start - (rounded ? 0.25 : 0),
                end + (rounded ? 0.25 : 0)
            );

            this.path(
                'a % % % % % true',
                cx,
                cy,
                radius - this.width,
                end + (rounded ? 0.25 : 0),
                start - (rounded ? 0.25 : 0)
            );

            return this.context.isPointInPath(mx, my) ? this : null;
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
        // This returns true/false as to whether the cursor is
        // over the chart area. The cursor does not necessarily
        // have to be over the bar itself - just the bar or the
        // background to the bar.
        //
        this.overChartArea = function  (e)
        {
            var mouseXY = RGraph.getMouseXY(e),
                mouseX  = mouseXY[0],
                mouseY  = mouseXY[1]

            // Draw the background to the Progress but don't stroke or fill it
            // so that it can be tested with isPointInPath()
            this.context.beginPath();
            
            this.pathBar({
                startValue: this.min,
                endValue:   this.max
            });


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
                this.original_colors.keyColors       = RGraph.arrayClone(properties.keyColors);
            }

            properties.colors[0] = this.parseSingleColorForGradient(properties.colors[0]);
            properties.colors[1] = this.parseSingleColorForGradient(properties.colors[1]);


            
            // keyColors
            var colors = properties.keyColors;
            if (colors) {
                for (var i=0; i<colors.length; ++i) {
                    colors[i] = this.parseSingleColorForGradient(colors[i]);
                }
            }

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
        // This function handles highlighting an entire data-series for the interactive
        // key
        // 
        // @param int index The index of the data series to be highlighted
        //
        this.interactiveKeyHighlight = function (index)
        {
            if (!this.coords[index]) {
                return;
            }

            var coords = this.coords[index];

            // Draw some highlight over the top of the segment
            this.context.beginPath();

            this.pathBar({
                startAngle: coords[3],
                endAngle: coords[4],
                index: index
            });
            
            this.path(
                's % f %',
                properties.keyInteractiveHighlightChartStroke,
                properties.keyInteractiveHighlightChartFill
            );
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
            // Cancel any stop request if one is pending
            this.cancelStopAnimation();

            var obj           = this,
                opt           = arguments[0] || {},
                numFrames     = opt.frames || 30,
                frame         = 0,
                callback      = arguments[1] || function () {};
            
            // Do this if showing a single number
            if (RGraph.isNumber(this.value)) {
                
                var initial_value = this.currentValue,
                    diff          = this.value - Number(this.currentValue),
                    increment     = diff  / numFrames;
            
            // Do this if showing multiple numbers
            } else {
            
                var initial_value = [],
                    diff          = [],
                    increment     = [];
                
                for (var i=0; i<this.value.length; ++i) {
                    initial_value[i] = RGraph.isNull(this.currentValue) ? 0 : this.currentValue[i];
                    diff[i]          = this.value[i] - Number(RGraph.isNull(this.currentValue) ? 0 : this.currentValue[i]);
                    increment[i]     = diff[i]  / numFrames;
                }
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
    
                    if (RGraph.isNumber(obj.value)) {
                        obj.value = initial_value + (increment * frame);
                    } else {
                        for (var i=0; i<obj.value.length; ++i) {
                            obj.value[i] = initial_value[i] + (increment[i] * frame);
                        }
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
            var color = (properties.tooltipsFormattedKeyColors && properties.tooltipsFormattedKeyColors[specific.index]) ? properties.tooltipsFormattedKeyColors[specific.index] : properties.colors[specific.index];
            var label = (properties.tooltipsFormattedKeyLabels && properties.tooltipsFormattedKeyLabels[specific.index]) ? properties.tooltipsFormattedKeyLabels[specific.index] : '';
            var value = specific.values[0][specific.index]


            return {
                label: label,
                color: color,
                value: value
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
        // The chart is now always registered
        //
        RGraph.register(this);








        //
        // This is the 'end' of the constructor so if the first argument
        // contains configuration data - handle that.
        //
        RGraph.parseObjectStyleConfig(this, conf.options);
    };