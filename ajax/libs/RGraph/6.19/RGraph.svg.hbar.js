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
    RGraph.SVG = RGraph.SVG || {};

// Module pattern
(function (win, doc, undefined)
{
    RGraph.SVG.HBar = function (conf)
    {
        //
        // A setter that the constructor uses (at the end)
        // to set all of the properties
        //
        // @param string name  The name of the property to set
        // @param string value The value to set the property to
        //
        this.set = function (name, value)
        {
            if (arguments.length === 1 && typeof name === 'object') {
                for (i in arguments[0]) {
                    if (typeof i === 'string') {
                        this.set(i, arguments[0][i]);
                    }
                }
            } else {

                // Go through all of the properties and make sure
                // that they're using the correct capitalisation
                name = this.properties_lowercase_map[name.toLowerCase()] || name;
                
                var ret = RGraph.SVG.commonSetter({
                    object: this,
                    name:   name,
                    value:  value
                });

                name  = ret.name;
                value = ret.value;

                this.properties[name] = value;

                // If setting the colors, update the originalColors
                // property too
                if (name === 'colors') {
                    this.originalColors = RGraph.SVG.arrayClone(value, true);
                    this.colorsParsed = false;
                }
            }

            return this;
        };








        //
        // A getter.
        // 
        // @param name  string The name of the property to get
        //
        this.get = function (name)
        {
            // Go through all of the properties and make sure
            // that they're using the correct capitalisation
            name = this.properties_lowercase_map[name.toLowerCase()] || name;

            return this.properties[name];
        };







        // Convert strings to numbers
        conf.data = RGraph.SVG.stringsToNumbers(conf.data);





        this.type             = 'hbar';
        this.id               = conf.id;
        this.uid              = RGraph.SVG.createUID();
        this.container        = document.getElementById(this.id);
        this.layers           = {}; // MUST be before the SVG tag is created!
        this.svg              = RGraph.SVG.createSVG({object: this,container: this.container});
        this.svgAllGroup      = RGraph.SVG.createAllGroup(this);
        this.clipid           = null; // Used to clip the canvas
        this.isRGraph         = true;
        this.isrgraph         = true;
        this.rgraph           = true;
        this.width            = Number(this.svg.getAttribute('width'));
        this.height           = Number(this.svg.getAttribute('height'));
        this.data             = conf.data;
        this.coords           = [];
        this.coords2          = [];
        this.coordsSpline     = [];
        this.stackedBackfaces = [];
        this.colorsParsed     = false;
        this.originalColors   = {};
        this.gradientCounter  = 1;
        this.isTrace          = false; // Used for the vertical line trace effect
        this.firstDraw        = true; // After the first draw this will be false











        // Add this object to the ObjectRegistry
        RGraph.SVG.OR.add(this);
        
        this.container.style.display = 'inline-block';

        this.properties =
        {
            marginLeft:      100,
            marginRight:     35,
            marginRightAuto: null,
            marginTop:       35,
            marginBottom:    35,
            marginLeftAuto:  true,

            backgroundColor:            null,
            backgroundImage:            null,
            backgroundImageAspect:      'none',
            backgroundImageStretch:     true,
            backgroundImageOpacity:     null,
            backgroundImageX:           null,
            backgroundImageY:           null,
            backgroundImageW:           null,
            backgroundImageH:           null,
            backgroundGrid:             true,
            backgroundGridColor:        '#ddd',
            backgroundGridLinewidth:    1,
            backgroundGridHlines:       true,
            backgroundGridHlinesCount:  null,
            backgroundGridVlines:       true,
            backgroundGridVlinesCount:  null,
            backgroundGridBorder:       true,
            backgroundGridDashed:       false,
            backgroundGridDotted:       false,
            backgroundGridDashArray:    null,
            
            // 20 colors. If you need more you need to set the colors property
            colors: [
                'red', '#0f0', '#00f', '#ff0', '#0ff', '#0f0','pink','orange','gray','black',
                'red', '#0f0', '#00f', '#ff0', '#0ff', '#0f0','pink','orange','gray','black'
            ],
            colorsSequential:     false,
            colorsStroke:          'rgba(0,0,0,0)',

            marginInner:              3,
            marginInnerGrouped:       2,
            marginInnerTop:           0,
            marginInnerBottom:        0,

            xaxis:                true,
            xaxisLinewidth:       1,
            xaxisTickmarks:       true,
            xaxisTickmarksLength: 5,
            xaxisColor:           'black',
            xaxisLabels:          [],
            xaxisLabelsOffsetx:   0,
            xaxisLabelsOffsety:   0,
            xaxisLabelsCount:     5,
            xaxisScale:           true,
            xaxisScaleUnitsPre:        '',
            xaxisScaleUnitsPost:       '',
            xaxisScaleStrict:          false,
            xaxisScaleDecimals:        0,
            xaxisScaleThousand:           '.',
            xaxisScaleThousand:        ',',
            xaxisScaleRound:           false,
            xaxisScaleMax:             null,
            xaxisScaleMin:             0,
            xaxisScaleFormatter:       null,
            xaxisLabelsPositionEdgeTickmarksCount: null,
            xaxisLabelsColor:       null,
            xaxisLabelsBold:        null,
            xaxisLabelsItalic:      null,
            xaxisLabelsFont:        null,
            xaxisLabelsSize:        null,
            xaxisTitle:           '',
            xaxisTitleBold:       null,
            xaxisTitleSize:       null,
            xaxisTitleFont:       null,
            xaxisTitleColor:      null,
            xaxisTitleItalic:     null,
            xaxisTitleOffsetx:    0,
            xaxisTitleOffsety:    0,
            xaxisTitleX:          null,
            xaxisTitleY:          null,
            xaxisTitleHalign:     null,
            xaxisTitleValign:     null,

            yaxis:                true,
            yaxisLinewidth:       1,
            yaxisTickmarks:       true,
            yaxisTickmarksLength: 3,
            yaxisTickmarksCount: 5,
            yaxisLabels:          [],
            yaxisLabelsPosition:  'section',
            yaxisLabelsOffsetx:   0,
            yaxisLabelsOffsety:   0,
            yaxisScale:           false,
            yaxisLabelsPositionSectionTickmarksCount: null,
            yaxisColor:           'black',
            yaxisLabelsFont:      null,
            yaxisLabelsSize:      null,
            yaxisLabelsColor:     null,
            yaxisLabelsBold:      null,
            yaxisLabelsItalic:    null,
            yaxisPosition:        'left',
            yaxisLabelsFormattedDecimals:  0,
            yaxisLabelsFormattedUnitsPre:  '',
            yaxisLabelsFormattedUnitsPost: '',
            yaxisLabelsFormattedThousand:  ',',
            yaxisLabelsFormattedPoint:     '.',
            yaxisTitle:           '',
            yaxisTitleBold:       null,
            yaxisTitleSize:       null,
            yaxisTitleFont:       null,
            yaxisTitleColor:      null,
            yaxisTitleItalic:     null,
            yaxisTitleOffsetx:    0,
            yaxisTitleOffsety:    0,
            yaxisTitleX:          null,
            yaxisTitleY:          null,
            yaxisTitleHalign:     null,
            yaxisTitleValign:     null,

            textColor:            'black',
            textFont:             'Arial, Verdana, sans-serif',
            textSize:             12,
            textBold:             false,
            textItalic:           false,
            text:                 null,
            
            labelsAbove:                  false,
            labelsAboveFont:              null,
            labelsAboveSize:              null,
            labelsAboveBold:              null,
            labelsAboveItalic:            null,
            labelsAboveColor:             null,
            labelsAboveBackground:        null,
            labelsAboveBackgroundPadding: 0,
            labelsAboveUnitsPre:          null,
            labelsAboveUnitsPost:         null,
            labelsAbovePoint:             null,
            labelsAboveThousand:          null,
            labelsAboveFormatter:         null,
            labelsAboveDecimals:          null,
            labelsAboveOffsetx:           0,
            labelsAboveOffsety:           0,
            labelsAboveHalign:            null,
            labelsAboveValign:            'center',
            labelsAboveSpecific:          null,
            
            labelsInbar:                  false,
            labelsInbarHalign:            'center',
            labelsInbarValign:            'center',
            labelsInbarFont:              null,
            labelsInbarSize:              null,
            labelsInbarBold:              null,
            labelsInbarItalic:            null,
            labelsInbarColor:             null,
            labelsInbarBackground:        null,
            labelsInbarBackgroundPadding: 0,
            labelsInbarUnitsPre:          null,
            labelsInbarUnitsPost:         null,
            labelsInbarPoint:             null,
            labelsInbarThousand:          null,
            labelsInbarFormatter:         null,
            labelsInbarDecimals:          null,
            labelsInbarOffsetx:           0,
            labelsInbarOffsety:           0,
            labelsInbarSpecific:          null,

            linewidth:            1,
            grouping:             'grouped',
            
            tooltips:                        null,
            tooltipsOverride:                null,
            tooltipsEffect:                  'fade',
            tooltipsCssClass:                'RGraph_tooltip',
            tooltipsCss:                     null,
            tooltipsEvent:                   'click',
            tooltipsFormattedThousand:       ',',
            tooltipsFormattedPoint:          '.',
            tooltipsFormattedDecimals:       0,
            tooltipsFormattedUnitsPre:       '',
            tooltipsFormattedUnitsPost:      '',
            tooltipsFormattedKeyColors:      null,
            tooltipsFormattedKeyColorsShape: 'square',
            tooltipsFormattedKeyLabels:      [],
            tooltipsFormattedTableHeaders:   null,
            tooltipsFormattedTableData:      null,
            tooltipsPointer:                 true,
            tooltipsPointerOffsetx:          0,
            tooltipsPointerOffsety:          0,
            tooltipsPositionStatic:          true,

            highlightStroke:      'rgba(0,0,0,0)',
            highlightFill:        'rgba(255,255,255,0.7)',
            highlightLinewidth:   1,
            
            title:                '',
            titleX:               null,
            titleY:               null,
            titleHalign:          'center',
            titleValign:          null,
            titleSize:            null,
            titleColor:           null,
            titleFont:            null,
            titleBold:            null,
            titleItalic:          null,
            
            titleSubtitle:        null,
            titleSubtitleColor:   '#aaa',
            titleSubtitleSize:    null,
            titleSubtitleFont:    null,
            titleSubtitleBold:    null,
            titleSubtitleItalic:  null,
            
            shadow:               false,
            shadowOffsetx:        2,
            shadowOffsety:        2,
            shadowBlur:           2,
            shadowColor:          'rgba(0,0,0,0.25)',



            key:              null,
            keyColors:        null,
            keyOffsetx:       0,
            keyOffsety:       0,
            keyLabelsOffsetx: 0,
            keyLabelsOffsety: -1,
            keyLabelsSize:    null,
            keyLabelsBold:    null,
            keyLabelsItalic:  null,
            keyLabelsColor:   null,
            keyLabelsFont:    null,

            line:                           false,
            lineLinejoin:                   'round',
            lineLinecap:                    'round',
            lineLinewidth:                  2,
            lineTickmarksLinewidth:         2,
            lineTickmarksStyle:             null,
            lineTickmarksSize:              5,
            lineColor:                      'black',
            lineShadow:                     true,
            lineShadowColor:               '#666',
            lineShadowBlur:                 2,
            lineShadowOffsetx:              2,
            lineShadowOffsety:              2,
            lineSpline:                     false,
            lineTickmarksDrawNonNull:       false,
            
            clip:                           null,
            
            zoom:                           false
        };


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



        //
        // Copy the global object properties to this instance
        //
        RGraph.SVG.getGlobals(this);





        //
        // "Decorate" the object with the generic effects if the effects library has been included
        //
        if (RGraph.SVG.FX && typeof RGraph.SVG.FX.decorate === 'function') {
            RGraph.SVG.FX.decorate(this);
        }





        // Add the responsive function to the object
        this.responsive = RGraph.SVG.responsive;





        var properties = this.properties;








        //
        // The draw method draws the Bar chart
        //
        this.draw = function ()
        {
            // Fire the beforedraw event
            RGraph.SVG.fireCustomEvent(this, 'onbeforedraw');




            //
            // Do the yaxis label substitution. This has to be called
            // before the left (or right) margin size is calculated.
            //
            this.yaxisLabelSubstitution();




            // Should be the first(ish) thing that's done in the
            // .draw() function except for the onbeforedraw event
            // and the installation of clipping.
            this.width  = Number(this.svg.getAttribute('width'));
            this.height = Number(this.svg.getAttribute('height'));
            
            this.coords  = [];
            this.coords2 = [];



            // Create the defs tag if necessary
            RGraph.SVG.createDefs(this);


            //
            // Handle the marginLeft autosizing
            //
            if (properties.marginLeftAuto) {

                var textConf = RGraph.SVG.getTextConf({                    
                    object: this,
                    prefix: 'yaxisLabels'
                });

                for (var i=0,len=properties.yaxisLabels.length,maxLength=0; i<len; ++i) {
                    var sizes = RGraph.SVG.measureText({
                        text:   properties.yaxisLabels[i],
                        bold:   textConf.bold,
                        size:   textConf.size,
                        font:   textConf.font,
                        italic: textConf.italic
                    });
                    
                    maxLength = Math.max(maxLength, sizes[0]);
                }
                
                //
                // If there's a Y axis title specified then account for that
                //
                if (properties.yaxisTitle) {
                    var textConf_title = RGraph.SVG.getTextConf({                    
                        object: this,
                        prefix: 'yaxisTitle'
                    });

                    var yaxisTitleSize = RGraph.SVG.measureText({
                        text: properties.yaxisTitle,
                        bold: textConf_title.bold,
                        size: textConf_title.size,
                        font: textConf_title.font,
                        font: textConf_title.italic
                    });
                    
                    maxLength = maxLength + yaxisTitleSize[1];
                }

                properties.marginLeft = maxLength + 15;

                // Minimum left margin of 15
                if (properties.marginLeft < 15) {
                    properties.marginLeft = 15;
                }
            }
            
            // Handle margin right autosizing for when the
            // yaxisPosition is set to ight
            if (properties.yaxisPosition === 'right' && properties.marginRightAuto !== false) {
                for (var i=0,len=properties.yaxisLabels.length,maxLength=0; i<len; ++i) {
                    var sizes = RGraph.SVG.measureText({
                        text: properties.yaxisLabels[i],
                        bold: properties.yaxisLabelsBold || properties.textBold,
                        size: properties.yaxisLabelsSize || properties.textSize,
                        font: properties.yaxisLabelsFont || properties.textFont
                    });
                    
                    maxLength = Math.max(maxLength, sizes[0]);
                }
                
                properties.marginRight = maxLength + 15;

                // Minimum right margin of 15
                if (properties.marginRight < 15) {
                    properties.marginRight = 15;
                }
            }




            this.graphWidth  = this.width - properties.marginLeft - properties.marginRight;
            this.graphHeight = this.height - properties.marginTop - properties.marginBottom;



            // Parse the colors for gradients
            RGraph.SVG.resetColorsToOriginalValues({object:this});
            this.parseColors();



            // Go through the data and work out the maximum value
            var values = [];

            for (var i=0,max=0; i<this.data.length; ++i) {
                if (typeof this.data[i] === 'number') {
                    values.push(this.data[i]);
                
                } else if (RGraph.SVG.isArray(this.data[i]) && properties.grouping === 'grouped') {
                    values.push(RGraph.SVG.arrayMax(this.data[i]));

                } else if (RGraph.SVG.isArray(this.data[i]) && properties.grouping === 'stacked') {
                    values.push(RGraph.SVG.arraySum(this.data[i]));
                }
            }
            var max = RGraph.SVG.arrayMax(values);

            // A custom, user-specified maximum value
            if (typeof properties.xaxisScaleMax === 'number') {
                max = properties.xaxisScaleMax;
            }
            
            // Set the ymin to zero if it's set to mirror
            if (properties.xaxisScaleMin === 'mirror' || properties.xaxisScaleMin === 'middle' || properties.xaxisScaleMin === 'center') {
                this.mirrorScale   = true;
                properties.xaxisScaleMin = properties.xaxisScaleMax * -1;
            }


            //
            // Generate an appropiate scale
            //
            this.scale = RGraph.SVG.getScale({
                object:    this,
                numlabels: properties.xaxisLabelsCount,
                unitsPre:  properties.xaxisScaleUnitsPre,
                unitsPost: properties.xaxisScaleUnitsPost,
                max:       max,
                min:       properties.xaxisScaleMin,
                point:     properties.xaxisScalePoint,
                round:     properties.xaxisScaleRound,
                thousand:  properties.xaxisScaleThousand,
                decimals:  properties.xaxisScaleDecimals,
                strict:    typeof properties.xaxisScaleMax === 'number',
                formatter: properties.xaxisScaleFormatter
            });



            //
            // Get the scale a second time if the xmin should be mirored
            //
            // Set the xmin to zero if it's set mirror
            if (this.mirrorScale) {
                this.scale = RGraph.SVG.getScale({
                    object:    this,
                    numlabels: properties.xaxisLabelsCount,
                    unitsPre:  properties.xaxisScaleUnitsPre,
                    unitsPost: properties.xaxisScaleUnitsPost,
                    max:       this.scale.max,
                    min:       this.scale.max * -1,
                    point:     properties.xaxisScaleThousand,
                    round:     false,
                    thousand:  properties.xaxisScaleThousand,
                    decimals:  properties.xaxisScaleDecimals,
                    strict:    true,
                    formatter: properties.xaxisScaleFormatter
                });
            }

            // Now the scale has been generated adopt its max value
            this.max      = this.scale.max;
            properties.xaxisScaleMax = this.scale.max;

            this.min      = this.scale.min;
            properties.xaxisScaleMin = this.scale.min;












            // Install clipping if requested
            if (this.properties.clip) {

                this.clipid = RGraph.SVG.installClipping(this);

                // Add the clip ID to the all group
                this.svgAllGroup.setAttribute(
                    'clip-path',
                    'url(#{1})'.format(this.clipid)
                );
            } else {
                // No clipping - so ensure that there's no clip-path
                // attribute
                this.clipid = null;
                this.svgAllGroup.removeAttribute('clip-path');
            }














            // Draw the background first
            RGraph.SVG.drawBackground(this);

            // Draw the bars
            this.drawBars();


            // Draw the axes over the bars
            RGraph.SVG.drawXAxis(this);
            RGraph.SVG.drawYAxis(this);


            // Draw the labelsAbove
            this.drawLabelsAbove();


            // Draw the labelsInbar
            this.drawLabelsInbar();
            
            
            // Draw the verical line
            if (this.properties.line) {
                this.drawLine();
            }






            // Draw the key
            if (typeof properties.key !== null && RGraph.SVG.drawKey) {
                RGraph.SVG.drawKey(this);
            } else if (!RGraph.SVG.isNullish(properties.key)) {
                alert('The drawKey() function does not exist - have you forgotten to include the key library?');
            }




            
            




            // Add the event listener that clears the highlight rect if
            // there is any. Must be MOUSEDOWN (ie before the click event)
            var obj = this;
            document.body.addEventListener('mousedown', function (e)
            {
                RGraph.SVG.removeHighlight(obj);

            }, false);








            //
            // Allow the addition of custom text via the
            // text: property.
            //
            RGraph.SVG.addCustomText(this);






            //
            // Add vertical lines
            //
            this.drawVerticalLines();





            // Lastly - install the zoom event listeners if
            // requested
            if (this.properties.zoom) {
                RGraph.SVG.addZoom(this);
            }












            //
            // Fire the onfirstdraw event
            //
            if (this.firstDraw) {
                this.firstDraw = false;
                RGraph.SVG.fireCustomEvent(this, 'onfirstdraw');
            }






            // Fire the draw event
            RGraph.SVG.fireCustomEvent(this, 'ondraw');







            //
            // Install any inline responsive configuration. This
            // should be last in the draw function - even after
            // the draw events.
            //
            RGraph.SVG.installInlineResponsive(this);












            return this;
        };








        //
        // New create() shortcut function
        // For example:
        //    this.create('rect,x:0,y:0,width:100,height:100'[,parent]);
        //
        // @param str string The tag definition to parse and create
        // @param     object The (optional) parent element
        // @return    object The new tag
        //
        this.create = function (str)
        {
            var def = RGraph.SVG.create.parseStr(this, str);
            def.svg = this.svg;
            
            // By default the parent is the SVG tag - but if
            // requested then change it to the tag that has
            // been given
            if (arguments[1]) {
                def.parent = arguments[1];
            }

            return RGraph.SVG.create(def);
        };








        //
        // Do the label substitution. This is called from the top of the
        // draw function
        //
        this.yaxisLabelSubstitution = function ()
        {
            if (properties.yaxisLabels && properties.yaxisLabels.length) {
                //
                // If the yaxisLabels option is a string then turn it
                // into an array.
                //
                if (typeof properties.yaxisLabels === 'string') {
                    properties.yaxisLabels = RGraph.SVG.arrayPad({
                        array:  [],
                        length: this.data.length,
                        value:  properties.yaxisLabels
                    });
                }

                //
                // Label substitution
                //
                for (var i=0; i<properties.yaxisLabels.length; ++i) {
                    properties.yaxisLabels[i] = RGraph.SVG.labelSubstitution({
                        object:    this,
                        text:      properties.yaxisLabels[i],
                        index:     i,
                        value:     this.data[i],
                        decimals:  properties.yaxisLabelsFormattedDecimals  || 0,
                        unitsPre:  properties.yaxisLabelsFormattedUnitsPre  || '',
                        unitsPost: properties.yaxisLabelsFormattedUnitsPost || '',
                        thousand:  properties.yaxisLabelsFormattedThousand  || ',',
                        point:     properties.yaxisLabelsFormattedPoint     || '.'
                    });
                }
            }
        };








        //
        // Draws the bars
        //
        this.drawBars = function ()
        {
            if (properties.shadow) {
                RGraph.SVG.setShadow({
                    object:  this,
                    offsetx: properties.shadowOffsetx,
                    offsety: properties.shadowOffsety,
                    blur:    properties.shadowBlur,
                    color:   properties.shadowColor,
                    id:      'dropShadow'
                });
            }

            // Go through the bars
            for (var i=0,sequentialIndex=0; i<this.data.length; ++i,++sequentialIndex) {

                // Put place holders in the coords arrays
                // for NULL VALUES
                if (RGraph.SVG.isNullish(this.data[i])) {
                    this.coords.push([]);
                    this.coords2.push([]);
                }

                //
                // NORMAL bars
                //
                if (typeof this.data[i] === 'number') {

                    var outerSegment = (this.graphHeight - properties.marginInnerTop - properties.marginInnerBottom) / this.data.length,
                        width        = this.getWidth(this.data[i]),
                        height       = ( (this.graphHeight - properties.marginInnerTop - properties.marginInnerBottom) / this.data.length) - properties.marginInner - properties.marginInner,
                        x            = this.getXCoord(
                                            (this.scale.min < 0 && this.scale.max < 0) || (this.scale.min > 0 && this.scale.max > 0) ? this.scale.min : 0
                                        ) - (this.data[i] <  0 ? width : 0),
                        y            = properties.marginTop + properties.marginInnerTop + properties.marginInner + (outerSegment * i);

                    // Allow for the Y axis to be positioned on the right hand side
                    if (properties.yaxisPosition === 'right' && this.scale.min >= 0) {
                        x = this.getXCoord(this.data[i]);
                    }
                    
                    if (properties.yaxisPosition === 'right' && this.scale.min < 0) {
                        x = this.getXCoord(0);
                    }

                    // If theres a min set but both the min and max are below
                    // zero the bars should be aligned to the right hand
                    // side
                    if (this.scale.min < 0 && this.scale.max < 0) {
                        x = this.width - properties.marginRight - width;
                    }
                    
                    // Adjust for a negative value
                    if (this.mirrorScale && properties.yaxisPosition === 'right') {
                        if (this.data[i] > 0) {
                            x = this.getXCoord(0) - width;
                        } else {
                            x = this.getXCoord(0);
                        }
                    }
                    
                    // If the X axis is right, move the bar left
                    if (this.data[i] > 0 && properties.yaxisPosition === 'right') {
                        x = this.getXCoord(0) - width;
                    }

                    var rect = RGraph.SVG.create({
                        svg: this.svg,
                        parent: this.svgAllGroup,
                        type: 'rect',
                        attr: {
                            stroke: properties.colorsStroke,
                            fill: properties.colorsSequential ? (properties.colors[sequentialIndex] ? properties.colors[sequentialIndex] : properties.colors[properties.colors.length - 1]) : properties.colors[0],
                            x: x,
                            y: y,
                            width: width,
                            height: height,
                            'stroke-width': properties.linewidth,
                            'data-tooltip': (!RGraph.SVG.isNullish(properties.tooltips) && properties.tooltips.length) ? properties.tooltips[i] : '',
                            'data-index': i,
                            'data-original-x': x,
                            'data-original-y': y,
                            'data-original-width': width,
                            'data-original-height': height,
                            'data-sequential-index': sequentialIndex,
                            'data-value': this.data[i],
                            filter: properties.shadow ? 'url(#dropShadow)' : ''
                        }
                    });

                    this.coords.push({
                        object:  this,
                        element: rect,
                        x:      parseFloat(rect.getAttribute('x')),
                        y:      parseFloat(rect.getAttribute('y')),
                        width:  parseFloat(rect.getAttribute('width')),
                        height: parseFloat(rect.getAttribute('height'))
                    });
                    
                    if (!this.coords2[i]) {
                        this.coords2[i] = [];
                    }

                    this.coords2[i].push({
                        object:  this,
                        element: rect,
                        x:      parseFloat(rect.getAttribute('x')),
                        y:      parseFloat(rect.getAttribute('y')),
                        width:  parseFloat(rect.getAttribute('width')),
                        height: parseFloat(rect.getAttribute('height'))
                    });





                    // Add toooltips if necessary
                    if (!RGraph.SVG.isNullish(properties.tooltips) && (properties.tooltips[sequentialIndex] || typeof properties.tooltips === 'string')) {

                        var obj = this;

                        //
                        // Add tooltip event listeners
                        //
                        (function (idx, seq)
                        {
                            rect.addEventListener(properties.tooltipsEvent.replace(/^on/, ''), function (e)
                            {
                                obj.removeHighlight();

                                // Show the tooltip
                                RGraph.SVG.tooltip({
                                    object: obj,
                                    index: idx,
                                    group: null,
                                    sequentialIndex: seq,
                                    text: typeof properties.tooltips === 'string' ? properties.tooltips : properties.tooltips[seq],
                                    event: e
                                });
                                
                                // Highlight the rect that has been clicked on
                                obj.highlight(e.target);
                            }, false);
                            
                            rect.addEventListener('mousemove', function (e)
                            {
                                e.target.style.cursor = 'pointer';
                            }, false);
                        })(i, sequentialIndex);
                    }




                //
                // GROUPED charts
                //
                } else if (RGraph.SVG.isArray(this.data[i]) && properties.grouping === 'grouped') {

                    var outerSegment = ( (this.graphHeight - properties.marginInnerTop - properties.marginInnerBottom) / this.data.length),
                        innerSegment = outerSegment - (2 * properties.marginInner);

                    // Loop through the group
                    for (var j=0; j<this.data[i].length; ++j,++sequentialIndex) {

                        var width  = Math.abs((this.data[i][j] / (this.max - this.min)) * this.graphWidth),
                            height = ( (innerSegment - ((this.data[i].length - 1) * properties.marginInnerGrouped)) / this.data[i].length),
                            y      = properties.marginTop + properties.marginInner + properties.marginInnerTop + (outerSegment * i) + (j * height) + (j * properties.marginInnerGrouped),
                            x      = this.getXCoord(0) - (this.data[i][j] <  0 ? width : 0);

                        // Work out some coordinates for the width and X coords ///////////////////////
                        if (this.scale.max < 0 && this.scale.min < this.scale.max) {
                            var x1 = this.getXCoord(this.data[i][j]);
                            var x2 = this.getXCoord(this.scale.max);
                            x      = x1;
                            width  = x2 - x1;
                        
                        } else if (this.scale.min > 0 && this.scale.max > this.scale.min) {
                            var x1 = this.getXCoord(this.data[i][j]);
                            var x2 = this.getXCoord(this.scale.min);
                            x      = this.getXCoord(this.scale.min);
                            width  = x1 - x2;

                        }
                        //////////////////////////////////////////////////////////////////////////////

                        // Allow for the Y axis to be positioned on the right hand side
                        if (properties.yaxisPosition === 'right' && this.scale.min === 0) {
                            x = this.getXCoord(this.data[i][j]);
                        }

                        // Allow for the Y axis to be positioned on the right hand side
                        // with a scale of (for example) -5 -> 20
                        if (   properties.yaxisPosition === 'right'
                            && this.scale.min < 0
                            && this.scale.max >= 0) {

                            if (this.data[i][j] < 0) {
                                x = this.getXCoord(0);
                            } else {
                                x = this.getXCoord(this.data[i][j]);
                            }
                        }

                        // Fixes an odd bug
                        //if (this.mirrorScale && properties.yaxisPosition === 'right') {
                        //    if (this.data[i][j] > 0) {
                        //        x -= width;
                        //    } else {
                        //        x += width;
                        //    }
                        //}








                        //
                        // Determine the fill color
                        //
                        var fill;
                        
                        if (properties.colorsSequential) {
                            if (properties.colors[sequentialIndex]) {
                                fill = properties.colors[sequentialIndex];
                            }
                        } else {
                            if (properties.colors[j]) {
                                fill = properties.colors[j];
                            } else {
                                fill = properties.colors[properties.colors.length - 1];
                            }
                        }




                        var rect = RGraph.SVG.create({
                            svg: this.svg,
                            type: 'rect',
                            parent: this.svgAllGroup,
                            attr: {
                                stroke: properties['colorsStroke'],
                                fill: fill,
                                x: x,
                                y: y,
                                width: width,
                                height: height,
                                'stroke-width': properties.linewidth,
                                'data-index': i,
                                'data-original-x': x,
                                'data-original-y': y,
                                'data-original-width': width,
                                'data-original-height': height,
                                'data-sequential-index': sequentialIndex,
                                'data-tooltip': (!RGraph.SVG.isNullish(properties.tooltips) && properties.tooltips.length) ? properties.tooltips[sequentialIndex] : '',
                                'data-value': this.data[i][j],
                                filter: properties.shadow ? 'url(#dropShadow)' : ''
                            }
                        });
                    
                        this.coords.push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });

                        if (!this.coords2[i]) {
                            this.coords2[i] = [];
                        }
        
                        this.coords2[i].push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });


                        // Add the tooltip data- attribute
                        if (!RGraph.SVG.isNullish(properties.tooltips) && (properties.tooltips[sequentialIndex] || typeof properties.tooltips === 'string') ) {
                        
                            var obj = this;
    
                        
                            //
                            // Add tooltip event listeners
                            //
                            (function (idx, seq)
                            {
                                var indexes = RGraph.SVG.sequentialIndexToGrouped(seq, obj.data);

                                rect.addEventListener(properties.tooltipsEvent.replace(/^on/, ''), function (e)
                                {
                                    obj.removeHighlight();

                                    // Show the tooltip
                                    RGraph.SVG.tooltip({
                                        object: obj,
                                        group: idx,
                                        index: indexes[1],
                                        sequentialIndex: seq,
                                        text: typeof properties.tooltips === 'string' ? properties.tooltips : properties.tooltips[seq],
                                        event: e
                                    });
                                    
                                    // Highlight the rect that has been clicked on
                                    obj.highlight(e.target);
    
                                }, false);
                                
                                rect.addEventListener('mousemove', function (e)
                                {
                                    e.target.style.cursor = 'pointer'
                                }, false);
                            })(i, sequentialIndex);
                        }
                    }

                    --sequentialIndex;
                        


                //
                // STACKED CHARTS
                //
                } else if (RGraph.SVG.isArray(this.data[i]) && properties.grouping === 'stacked') {

                    // This is each bars "segment" of the chart
                    var section = ( (this.graphHeight - properties.marginInnerTop - properties.marginInnerBottom) / this.data.length);
                    
                    // Initialise the X coordinate
                    var x = this.getXCoord(0);

                    // Loop through the stack
                    for (var j=0; j<this.data[i].length; ++j,++sequentialIndex) {

                        var outerHeight = (this.graphHeight - properties.marginInnerTop - properties.marginInnerBottom) / this.data.length,
                            width       = Math.abs((this.data[i][j] / (this.max - this.min)) * this.graphWidth),
                            height      = outerHeight - (2 * properties.marginInner),
                            y           = properties.marginTop + properties.marginInner + properties.marginInnerTop + (outerHeight * i);

                        if (properties.yaxisPosition === 'right') {
                            x -= width;
                        }

                        // If this is the first iteration of the loop and a shadow
                        // is requested draw a rect here to create it.
                        if (j === 0 && properties.shadow) {

                            var fullWidth = Math.abs((RGraph.SVG.arraySum(this.data[i]) / (this.max - this.min)) * this.graphWidth);

                            var rect = RGraph.SVG.create({
                                svg: this.svg,
                                parent: this.svgAllGroup,
                                type: 'rect',
                                attr: {
                                    x: properties.yaxisPosition === 'right' ? this.getXCoord(0) - fullWidth : this.getXCoord(0),
                                    y: y,
                                    width: fullWidth,
                                    height: height,
                                    fill: 'white',
                                    'stroke-width': 0,
                                    'data-index': i,
                                    filter: 'url(#dropShadow)'
                                }
                            });
                            
                            this.stackedBackfaces[i] = rect;
                        }



                        // Create the visible bar
                        var rect = RGraph.SVG.create({
                            svg: this.svg,
                            type: 'rect',
                            parent: this.svgAllGroup,
                            attr: {
                                stroke: properties['colorsStroke'],
                                fill: properties.colorsSequential ? (properties.colors[sequentialIndex] ? properties.colors[sequentialIndex] : properties.colors[properties.colors.length - 1]) : (properties.colors[j] ? properties.colors[j] : properties.colors[properties.colors.length - 1]),
                                x: x,
                                y: y,
                                width: width,
                                height: height,
                                'stroke-width': properties.linewidth,
                                'data-original-width': width,
                                'data-original-height': height,
                                'data-original-x': x - width,
                                'data-original-y': y,
                                'data-index': i,
                                'data-sequential-index': sequentialIndex,
                                'data-tooltip': (!RGraph.SVG.isNullish(properties.tooltips) && properties.tooltips.length) ? properties.tooltips[sequentialIndex] : '',
                                'data-value': this.data[i][j]
                            }
                        });

                        this.coords.push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });

                        if (!this.coords2[i]) {
                            this.coords2[i] = [];
                        }
        
                        this.coords2[i].push({
                            object:  this,
                            element: rect,
                            x:      parseFloat(rect.getAttribute('x')),
                            y:      parseFloat(rect.getAttribute('y')),
                            width:  parseFloat(rect.getAttribute('width')),
                            height: parseFloat(rect.getAttribute('height'))
                        });



                        // Add the tooltips 
                        if (!RGraph.SVG.isNullish(properties.tooltips) && (properties.tooltips[sequentialIndex] || typeof properties.tooltips === 'string')) {
                        
                            var obj = this;
    
                        
                            //
                            // Add tooltip event listeners
                            //
                            (function (idx, seq)
                            {
                                rect.addEventListener(properties.tooltipsEvent.replace(/^on/, ''), function (e)
                                {
                                    obj.removeHighlight();

                                    var indexes = RGraph.SVG.sequentialIndexToGrouped(seq, obj.data);

                                    // Show the tooltip
                                    RGraph.SVG.tooltip({
                                        object: obj,
                                        index: indexes[1],
                                        group: idx,
                                        sequentialIndex: seq,
                                        text: typeof properties.tooltips === 'string' ? properties.tooltips : properties.tooltips[seq],
                                        event: e
                                    });
                                    
                                    // Highlight the rect that has been clicked on
                                    obj.highlight(e.target);
                                }, false);
                                
                                rect.addEventListener('mousemove', function (e)
                                {
                                    e.target.style.cursor = 'pointer'
                                }, false);
                            })(i, sequentialIndex);
                        }
                        
                        
                        // Adjust the X coord
                        if (properties.yaxisPosition === 'right') {
                            //x -= width;
                        } else {
                            x += width;
                        }

                    }

                    --sequentialIndex;
                }
            }

        };









        //
        // This function can be used to retrieve the relevant X coordinate for a
        // particular value.
        // 
        // @param int value The value to get the X coordinate for
        //
        this.getXCoord = function (value)
        {
            var prop = this.properties;

            if (value > this.scale.max) {
                return null;
            }

            if (value < this.scale.min) {
                return null;
            }

            var x  = ((value - this.scale.min) / (this.scale.max - this.scale.min));
                x *= this.graphWidth;

            if (properties.yaxisPosition === 'right') {
                x  = this.width - properties.marginRight - x;
            } else {
                x += properties.marginLeft;
            }

            return x;
        };









        //
        // This function can be used to retrieve the relevant X coordinate for a
        // particular value.
        // 
        // @param int value The value to get the X coordinate for
        //
        this.getWidth = function (value)
        {
            if (this.scale.max <= 0 && this.scale.min < this.scale.max) {
                var x1 = this.getXCoord(this.scale.max);
                var x2 = this.getXCoord(value);
            
            } else if (this.scale.min > 0 && this.scale.max > this.scale.min) {
                var x1 = this.getXCoord(this.scale.min);
                var x2 = this.getXCoord(value);
            
            } else {
                var x1 = this.getXCoord(0);
                var x2 = this.getXCoord(value);
            }

            return Math.abs(x1 - x2);
        };
        
        //Math.abs(((this.data[i] - this.scale.min) / (this.max - this.scale.min)) * this.graphWidth)








        //
        // This function can be used to highlight a bar on the chart
        // 
        // @param object rect The rectangle to highlight
        //
        this.highlight = function (rect)
        {
            var x      = parseFloat(rect.getAttribute('x')) - 0.5,
                y      = parseFloat(rect.getAttribute('y')) - 0.5,
                width  = parseFloat(rect.getAttribute('width')) + 1,
                height = parseFloat(rect.getAttribute('height')) + 1;
            
            var highlight = RGraph.SVG.create({
                svg: this.svg,
                type: 'rect',
                parent: this.svgAllGroup,
                attr: {
                    stroke: properties.highlightStroke,
                    fill: properties.highlightFill,
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                    'stroke-width': properties.highlightLinewidth
                },
                style: {
                    pointerEvents: 'none'
                }
            });


            //if (properties.tooltipsEvent === 'mousemove') {
            //    highlight.addEventListener('mouseout', function (e)
            //    {
            //        highlight.parentNode.removeChild(highlight);
            //        RGraph.SVG.hideTooltip();

            //        RGraph.SVG.REG.set('highlight', null);
            //    }, false);
            //}


            // Store the highlight rect in the rebistry so
            // it can be cleared later
            RGraph.SVG.REG.set('highlight', highlight);
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function () 
        {
            // Save the original colors so that they can be restored when
            // the canvas is cleared
            if (!Object.keys(this.originalColors).length) {
                this.originalColors = {
                    colors:              RGraph.SVG.arrayClone(properties.colors, true, true),
                    backgroundGridColor: RGraph.SVG.arrayClone(properties.backgroundGridColor, true),
                    highlightFill:       RGraph.SVG.arrayClone(properties.highlightFill, true),
                    backgroundColor:     RGraph.SVG.arrayClone(properties.backgroundColor, true),
                    lineColor:           RGraph.SVG.arrayClone(properties.lineColor, true),
                    lineFilledColor:     RGraph.SVG.arrayClone(properties.lineFilledColor, true)
                }
            }

            
            // colors
            var colors = properties.colors;

            if (colors) {
                for (var i=0; i<colors.length; ++i) {
                    colors[i] = RGraph.SVG.parseColorLinear({
                        object: this,
                        color: colors[i],
                        direction: 'horizontal',
                        start: properties.marginLeft,
                        end: this.width - properties.marginRight
                    });
                }
            }

            properties.backgroundGridColor = RGraph.SVG.parseColorLinear({object: this, color: properties.backgroundGridColor, direction: 'horizontal',start: properties.marginLeft,end: this.width - properties.marginRight});
            properties.highlightFill       = RGraph.SVG.parseColorLinear({object: this, color: properties.highlightFill, direction: 'horizontal',start: properties.marginLeft,end: this.width - properties.marginRight});
            properties.backgroundColor     = RGraph.SVG.parseColorLinear({object: this, color: properties.backgroundColor});
            properties.lineColor           = RGraph.SVG.parseColorLinear({object: this, color: properties.lineColor});
            properties.lineFilledColor     = RGraph.SVG.parseColorLinear({object: this, color: properties.lineFilledColor});
        };








        //
        // Draws the labelsAbove
        //
        this.drawLabelsAbove = function ()
        {
            // Go through the above labels
            if (properties.labelsAbove) {

                // Get the text configuration for the labels
                var textConf = RGraph.SVG.getTextConf({
                    object: this,
                    prefix: 'labelsAbove'
                });
                
                var data = RGraph.SVG.arrayLinearize(this.data);

                for (var i=0; i<this.coords.length; ++i) {

                    var value = data[i].toFixed(typeof properties.labelsAboveDecimals === 'number' ? properties.labelsAboveDecimals : properties.xaxisScaleDecimals);
                    var indexes = RGraph.SVG.sequentialIndexToGrouped(i, this.data);



                    if (RGraph.SVG.isArray(this.data[indexes[0]]) && properties.grouping === 'stacked') {
                        if ((indexes[1] + 1) === this.data[indexes[0]].length) {
                            value = RGraph.SVG.arraySum(this.data[indexes[0]]);
                            value = value.toFixed(typeof properties.labelsAboveDecimals === 'number' ? properties.labelsAboveDecimals : properties.xaxisScaleDecimals);
                        } else {
                            continue;
                        }
                    }


                    var str = properties.labelsAboveSpecific ? properties.labelsAboveSpecific[i]?.toString() : RGraph.SVG.numberFormat({
                        object:    this,
                        num:       value,
                        prepend:   typeof properties.labelsAboveUnitsPre  === 'string'   ? properties.labelsAboveUnitsPre  : null,
                        append:    typeof properties.labelsAboveUnitsPost === 'string'   ? properties.labelsAboveUnitsPost : null,
                        point:     typeof properties.labelsAbovePoint     === 'string'   ? properties.labelsAbovePoint     : null,
                        thousand:  typeof properties.labelsAboveThousand  === 'string'   ? properties.labelsAboveThousand  : null,
                        formatter: typeof properties.labelsAboveFormatter === 'function' ? properties.labelsAboveFormatter : null
                    });

                    var halign = properties.labelsAboveHalign,
                        valign = properties.labelsAboveValign;


                    var dimensions = RGraph.SVG.measureText({
                        text: str,
                        bold: textConf.bold,
                        font: textConf.font,
                        size: textConf.size
                    });

                    var x      = (value >= 0)
                                   ? (parseFloat(this.coords[i].element.getAttribute('x')) + 7 + properties.labelsAboveOffsetx)
                                   : parseFloat(this.coords[i].element.getAttribute('x') - 7 - properties.labelsAboveOffsetx),
                        y      = parseFloat(this.coords[i].element.getAttribute('y')) + parseFloat(this.coords[i].element.getAttribute('height') / 2) + properties.labelsAboveOffsety,
                        width  = dimensions[0],
                        height = dimensions[1],
                        halign = (value >= 0) ? 'left': 'right';

                    // Corner case
                    if (properties.yaxisPosition === 'left' && properties.grouping === 'grouped') {
                        x = parseFloat(this.coords[i].element.getAttribute('x')) + parseFloat(this.coords[i].element.getAttribute('width')) + 7 + properties.labelsAboveOffsetx
                    }






                    // ADjust the values if the Y axis is on the RHS
                    if (properties.yaxisPosition === 'right') {
                        x = (value >= 0)
                            ? (parseFloat(this.coords[i].element.getAttribute('x')) - 7 - properties.labelsAboveOffsetx)
                            : parseFloat(this.coords[i].element.getAttribute('x') + 7 + properties.labelsAboveOffsetx),
                        halign = (value >= 0) ? 'right': 'left';
                    
                    // Special case for an oddity
                    } else if (RGraph.SVG.isArray(this.data[indexes[0]]) && properties.grouping === 'stacked' && properties.yaxisPosition === 'left') {
                        x += this.coords2[indexes[0]][indexes[1]].width;
                    }

                    // Another corner case
                    if (
                           properties.yaxisPosition === 'right'
                        && properties.grouping === 'grouped'
                        && properties.xaxisScaleMax > 0
                        && properties.xaxisScaleMin < 0
                       ) {
                        
                        var value = this.coords[i].element.getAttribute('data-value');
                       
                        if (value < 0) {
                            x = this.getXCoord(value) + 7;
                        } else {
                            x = this.getXCoord(value) - 7;
                        }
                    }

                    // Another corner case
                    if (
                           properties.yaxisPosition === 'left'
                        && properties.grouping === 'grouped'
                        && properties.xaxisScaleMax > 0
                        && properties.xaxisScaleMin < 0
                       ) {
                        
                        var value = this.coords[i].element.getAttribute('data-value');
                       
                        if (value < 0) {
                            x = this.getXCoord(value) - 7;
                        } else {
                            x = this.getXCoord(value) + 7;
                        }
                    }


                    // Account for the labels going off the edge of the SVG tag (whilst the Y axis
                    // is on the left)
                    if (properties.yaxisPosition === 'right') {
                        if (x - width < properties.marginLeft && value > 0) {
                            halign = 'left';
                            x      = properties.marginLeft + 5;
                            properties.labelsAboveBackground = properties.labelsAboveBackground || 'rgba(255,255,255,0.95)';
                        }
                    } else {
                        if (x + width > this.width && value > 0) {
                            halign = 'right';
                            x      = this.width - 5;
                            properties.labelsAboveBackground = properties.labelsAboveBackground || 'rgba(255,255,255,0.95)';
                        }
                    }
                    
                    // Another oddity - when there's regular data but the grouping
                    // is set to stacked and the Y axis is on the left
                    if (properties.grouping === 'stacked' && typeof this.data[indexes[0]] === 'number' && properties.yaxisPosition === 'left') {
                        x += parseInt(this.coords[i].element.getAttribute('width'));
                    }

                    // Horizontal alignment
                    if (typeof properties.labelsAboveHalign === 'string') {
                        halign = properties.labelsAboveHalign;
                    }

                    var text = RGraph.SVG.text({
                        
                        object:     this,
                        parent:     this.svgAllGroup,
                        tag:        'labels.above',
                        
                        text:       str,
                        
                        x:          x,
                        y:          y,
                        
                        halign:     halign,
                        valign:     valign,
                        
                        font:       textConf.font,
                        size:       textConf.size,
                        bold:       textConf.bold,
                        italic:     textConf.italic,
                        color:      textConf.color,
                        
                        background: properties.labelsAboveBackground        || null,
                        padding:    properties.labelsAboveBackgroundPadding || 0
                    });
                }
            }
        };








        //
        // Draws the labelsInbar
        //
        this.drawLabelsInbar = function ()
        {
            // Go through the above labels
            if (properties.labelsInbar) {
            
                // Default alignment
                var valign = properties.labelsInbarValign,
                    halign = properties.labelsInbarHalign;

                // Get the text configuration for the labels
                var textConf = RGraph.SVG.getTextConf({
                    object: this,
                    prefix: 'labelsInbar'
                });
                
                var data = RGraph.SVG.arrayLinearize(this.data);

                for (var i=0; i<this.coords.length; ++i) {
                    if (RGraph.SVG.isNumber(data[i]) && !isNaN(data[i]) ) {
                        // The rect element that represents the bar
                        var el      = this.coords[i].element;                    
                        var value   = data[i].toFixed(properties.labelsInbarDecimals);
                        var indexes = RGraph.SVG.sequentialIndexToGrouped(i, this.data);
    
    
                        var dimensions = RGraph.SVG.measureText({
                            text: str,
                            bold: textConf.bold,
                            font: textConf.font,
                            size: textConf.size
                        });
    
                        var x      = parseFloat(el.getAttribute('x')) + (parseFloat(el.getAttribute('width')) / 2) + properties.labelsInbarOffsetx,
                            y      = parseFloat(el.getAttribute('y')) + (parseFloat(el.getAttribute('height')) / 2) + properties.labelsInbarOffsety,
                            width  = dimensions[0],
                            height = dimensions[1];
                            
                        //
                        // Horizontal alignment
                        //
                        if (properties.labelsInbarHalign === 'left') {
                            halign = 'left';
                            x      = parseFloat(el.getAttribute('x')) + 5 + properties.labelsInbarOffsetx;
                        } else if (properties.labelsInbarHalign === 'right') {
                            halign = 'right';
                            x      = parseFloat(el.getAttribute('x')) + parseFloat(el.getAttribute('width')) - 5 + properties.labelsInbarOffsetx;
                        }

                        //
                        // Vertical alignment
                        //
                        if (properties.labelsInbarValign === 'bottom') {
                            valign = 'bottom';
                            y      = parseFloat(el.getAttribute('y')) - 5 + parseFloat(el.getAttribute('height')) + properties.labelsInbarOffsety;
                        } else if (properties.labelsInbarValign === 'top') {
                            valign = 'top';
                            y      = parseFloat(el.getAttribute('y')) + 5 + properties.labelsInbarOffsety;
                        }
    
                        var str = properties.labelsInbarSpecific ? properties.labelsInbarSpecific[i]?.toString() : RGraph.SVG.numberFormat({
                            object:    this,
                            num:       value,
                            prepend:   typeof properties.labelsInbarUnitsPre  === 'string'   ? properties.labelsInbarUnitsPre  : null,
                            append:    typeof properties.labelsInbarUnitsPost === 'string'   ? properties.labelsInbarUnitsPost : null,
                            point:     typeof properties.labelsInbarPoint     === 'string'   ? properties.labelsInbarPoint     : null,
                            thousand:  typeof properties.labelsInbarThousand  === 'string'   ? properties.labelsInbarThousand  : null,
                            formatter: typeof properties.labelsInbarFormatter === 'function' ? properties.labelsInbarFormatter : null
                        });
                        
                        // Specific label given
                        if (RGraph.SVG.isArray(properties.labelsInbarSpecific) && (RGraph.SVG.isString(properties.labelsInbarSpecific[i]) || RGraph.SVG.isNumber(properties.labelsInbarSpecific[i]))) {
                            str = properties.labelsInbarSpecific[i];
                        }
    
                        var text = RGraph.SVG.text({
                            object:     this,
                            parent:     this.svgAllGroup,
                            tag:        'labels.inbar',
                            text:       str,
                            x:          x,
                            y:          y,
                            halign:     halign,
                            valign:     valign,
                            font:       textConf.font,
                            size:       textConf.size,
                            bold:       textConf.bold,
                            italic:     textConf.italic,
                            color:      textConf.color,
                            background: properties.labelsInbarBackground        || null,
                            padding:    properties.labelsInbarBackgroundPadding || 0
                        });
                    }
                }
            }
        };








        //
        // Using a function to add events makes it easier to facilitate method
        // chaining
        // 
        // @param string   type The type of even to add
        // @param function func 
        //
        this.on = function (type, func)
        {
            if (type.substr(0,2) !== 'on') {
                type = 'on' + type;
            }
            
            RGraph.SVG.addCustomEventListener(this, type, func);
    
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
        // Remove highlight from the chart (tooltips)
        //
        this.removeHighlight = function ()
        {
            //var highlight = RGraph.SVG.REG.get('highlight');
            //if (highlight && highlight.parentNode) {
            //    highlight.parentNode.removeChild(highlight);
            //}
            
            //RGraph.SVG.REG.set('highlight', null);
            
            RGraph.SVG.removeHighlight();
        };








        //
        // The Bar chart grow effect
        //
        this.grow = function ()
        {
            var opt      = arguments[0] || {},
                frames   = opt.frames || 30,
                frame    = 0,
                obj      = this,
                data     = [],
                height   = null,
                seq      = 0;

            //
            // Copy the data
            //
            data = RGraph.SVG.arrayClone(this.data, true);

            this.draw();

            var iterate = function ()
            {
                for (var i=0,seq=0,len=obj.coords.length; i<len; ++i, ++seq) {

                    var   multiplier = (frame / frames)
                        // RGraph.SVG.FX.getEasingMultiplier(frames, frame)
                        // RGraph.SVG.FX.getEasingMultiplier(frames, frame);
                
                
                
                
                    // TODO Go through the data and update the value according to
                    // the frame number
                    if (typeof data[i] === 'number') {

                        width       = Math.abs(obj.getXCoord(data[i]) - obj.getXCoord(0));
                        obj.data[i] = data[i] * multiplier;
                        width       = multiplier * width;
                        
                        // Set the new width on the rect
                        obj.coords[seq].element.setAttribute(
                            'width',
                            width
                        );

                        // Set the correct Y coord on the object
                        obj.coords[seq].element.setAttribute(
                            'x',
                            data[i] > 0
                                ? obj.getXCoord(0) - (properties.yaxisPosition === 'right' ? width : 0)
                                : (properties.xaxisScaleMin < 0 && properties.xaxisScaleMax > 0 ? (properties.yaxisPosition === 'right' ? obj.getXCoord(0) : obj.getXCoord(0) - width) : obj.getXCoord(0))
                        );

                    } else if (typeof data[i] === 'object') {

                        var accumulativeWidth = 0;

                        for (var j=0,len2=data[i].length; j<len2; ++j, ++seq) {

                            width          = Math.abs(obj.getXCoord(data[i][j]) - obj.getXCoord(0));
                            width          = multiplier * width;
                            obj.data[i][j] = data[i][j] * multiplier;

                            accumulativeWidth += width;

                            obj.coords[seq].element.setAttribute(
                                'width',
                                width
                            );

                            if (properties.yaxisPosition === 'right') {
                                if (properties.grouping === 'stacked') {
                                    obj.coords[seq].element.setAttribute(
                                        'x',
                                        obj.getXCoord(0) - accumulativeWidth
                                    );
                                } else {
                                    obj.coords[seq].element.setAttribute(
                                        'x',
                                        obj.getXCoord(0) - (obj.coords[seq].element.getAttribute('data-value') < 0 ? 0 : width)
                                    );
                                }
                            
                            } else {

                                obj.coords[seq].element.setAttribute(
                                    'x',
                                    properties.grouping === 'stacked'
                                        ? obj.getXCoord(0) + (accumulativeWidth - width)
                                        : properties.grouping === 'grouped' && obj.coords[seq].element.getAttribute('data-value') < 0 ? obj.getXCoord(0) - width : obj.getXCoord(0)
                                );
                            }
                        }

                        //
                        // Set the height and Y cooord of the backfaces if necessary
                        //
                        if (obj.stackedBackfaces[i]) {
                            obj.stackedBackfaces[i].setAttribute(
                                'width',
                                accumulativeWidth
                            );

                            obj.stackedBackfaces[i].setAttribute(
                                'x',
                                properties.yaxisPosition === 'right' ? obj.getXCoord(0) - accumulativeWidth : obj.getXCoord(0)
                            );
                        }

                        // Decrease seq by one so that it's not incremented twice
                        --seq;
                    }
                }

                if (frame++ < frames) {
                    //setTimeout(iterate, frame > 1 ? opt.delay : 200);
                    RGraph.SVG.FX.update(iterate);
                } else if (opt.callback) {
                    RGraph.SVG.redraw();
                    (opt.callback)(obj);
                }
            };

            iterate();
            
            return this;
        };








        //
        // HBar chart Wave effect.
        // 
        // @param object OPTIONAL An object map of options. You specify 'frames'
        //                        here to give the number of frames in the effect
        //                        and also callback to specify a callback function
        //                        thats called at the end of the effect
        //
        // **************************************************************
        // *** In order to deal with stacked charts, this function is ***
        // *** complicated - probably significantly more so than it   ***
        // *** needs to be. As such it most definitely needs          ***
        // *** refactoring                                            ***
        // **************************************************************
        //
        this.wave = function ()
        {
            var stackedAccumulativeWidth = 0;

            // First draw the chart
            this.draw();


            var obj = this,
                opt = arguments[0] || {};
            
            opt.frames      = opt.frames || 60;
            opt.startFrames = [];
            opt.counters    = [];

            var framesperbar = opt.frames / 3,
                frame        = -1,
                callback     = opt.callback || function () {},
                width;

            for (var i=0,len=this.coords.length; i<len; i+=1) {
                opt.startFrames[i] = ((opt.frames / 2) / (obj.coords.length - 1)) * i;
                opt.counters[i]    = 0;
                
                // Now zero the width of the bar
                this.coords[i].element.setAttribute('width', 0);
                
                // Use this loop to set the stackedBackfaces to 0 width
                if (properties.grouping === 'stacked' && obj.stackedBackfaces[i]) {
                    obj.stackedBackfaces[i].setAttribute('width', 0);
                }
            }
            
            // Edge-case
            if (properties.grouping === 'stacked' && properties.yaxisPosition === 'right') {                
                previousX = obj.width - properties.marginRight;
                previousW = 0;
            }


            function iterator ()
            {
                ++frame;
                var group = 0;

                for (var i=0,len=obj.coords.length; i<len; i+=1) {
                    if (frame > opt.startFrames[i]) {
                        
                        var originalWidth = obj.coords[i].element.getAttribute('data-original-width'),
                            value         = parseFloat(obj.coords[i].element.getAttribute('data-value')),
                            seq           = i;
                            indexes       = RGraph.SVG.sequentialIndexToGrouped(i, obj.data);
                            
                            if (indexes[0] !== group) {
                                group = indexes[0];
                            }

                        obj.coords[i].element.setAttribute(
                            'width',
                            width = Math.min(
                                ((frame - opt.startFrames[i]) / framesperbar) * originalWidth,
                                originalWidth
                            )
                        );

                        stackedAccumulativeWidth += width;

                        if (properties.yaxisPosition === 'right') {
                            if (properties.grouping === 'stacked') {

                                if (indexes[1] === 0) {
                                    obj.coords[i].element.setAttribute('x',obj.width - properties.marginRight - width);
                                    
                                    var previousX = obj.coords[i].element.getAttribute('x');
                                } else {
                                    obj.coords[i].element.setAttribute(
                                        'x',
                                        previousX - width
                                    );
                                }
                                
                            
                            } else {
                                obj.coords[i].element.setAttribute(
                                    'x',
                                    value >=0
                                        ? obj.getXCoord(0) - width
                                        : obj.getXCoord(0)
                                );
                            }
                        } else {
                            obj.coords[i].element.setAttribute(
                                'x',
                                value >=0 ? obj.getXCoord(0) : obj.getXCoord(0) - width
                            );
                        }
                        
                        
                        if (properties.grouping === 'stacked' && RGraph.SVG.isArray(obj.data[indexes[0]])) {

                            // Are these two needed any more? //
                            //var seq = obj.coords[i].element.getAttribute('data-sequential-index');
                            //var indexes = RGraph.SVG.sequentialIndexToGrouped(seq, obj.data);
                            ////////////////////////////////////

                            if (properties.yaxisPosition === 'left' && indexes[1] > 0) {
                                obj.coords[i].element.setAttribute(
                                    'x',
                                    parseInt(obj.coords[i - 1].element.getAttribute('x')) + parseInt(obj.coords[i - 1].element.getAttribute('width'))
                                );
                            }

                            // Not really related to the code above, reuse this if()
                            // condition to set the width of the backface
                            //obj.stackedBackfaces[indexes[0]].setAttribute('width', width);
                            for (var j=0,cumulativeWidth=0; j<obj.coords2[indexes[0]].length; ++j) {
                                cumulativeWidth += parseInt(obj.coords2[indexes[0]][j].element.getAttribute('width'))
                            }
                            
                            if (properties.yaxisPosition === 'right') {
                                obj.stackedBackfaces[indexes[0]].setAttribute('width', cumulativeWidth);
                                obj.stackedBackfaces[indexes[0]].setAttribute('x', obj.width - properties.marginRight - cumulativeWidth);
                            } else {
                            
                                obj.stackedBackfaces[indexes[0]].setAttribute('x', obj.getXCoord(0));

                                obj.stackedBackfaces[indexes[0]].setAttribute(
                                    'width',
                                    cumulativeWidth
                                );
                            }
                            
                            previousX = obj.coords[i].element.getAttribute('x');
                            previousW = obj.coords[i].element.getAttribute('width');
                        }
                    }
                }


                if (frame >= opt.frames) {
                    callback(obj);
                } else {
                    RGraph.SVG.FX.update(iterator);
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
            var indexes = RGraph.SVG.sequentialIndexToGrouped(opt.index, this.data);

            return {
                  index: indexes[1],
                dataset: indexes[0],
        sequentialIndex: opt.index,
                  value: typeof this.data[indexes[0]] === 'number' ? this.data[indexes[0]] : this.data[indexes[0]][indexes[1]],
                 values: typeof this.data[indexes[0]] === 'number' ? [this.data[indexes[0]]] : this.data[indexes[0]]
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
            if (typeof this.data[0] === 'object') {
                var label = (!RGraph.SVG.isNullish(properties.tooltipsFormattedKeyLabels) && typeof properties.tooltipsFormattedKeyLabels === 'object' && properties.tooltipsFormattedKeyLabels[index])
                                ? properties.tooltipsFormattedKeyLabels[index]
                                : '';

            } else {
                var label = (!RGraph.SVG.isNullish(properties.tooltipsFormattedKeyLabels) && typeof properties.tooltipsFormattedKeyLabels === 'object' && properties.tooltipsFormattedKeyLabels[specific.index])
                                ? properties.tooltipsFormattedKeyLabels[specific.index]
                                : '';
            }


            return {
                label: label
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
                svgXY    = RGraph.SVG.getSVGXY(obj.svg),
                coords   = this.coords[args.index];

            // Position the tooltip in the X direction
            args.tooltip.style.left = (
                  svgXY[0]                       // The X coordinate of the canvas
                + coords.x                       // The X coordinate of the bar on the chart
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
                + (coords.width / 2)                // Add half of the bar width
            ) + 'px';

            args.tooltip.style.top  = (
                  svgXY[1]                       // The Y coordinate of the canvas
                + coords.y                      // The Y coordinate of the bar on the chart
                - tooltip.offsetHeight           // The height of the tooltip
                - 10                             // An arbitrary amount
            ) + 'px';
        };








        //
        // Draw a line on the chart - just each of the X points
        // (ie the top of the bars) connected by a line. This
        // does mean you can set the colors property to transparent
        // and you have a vertical line.
        //
        this.drawLine = function ()
        {
            if (this.properties.lineShadow) {
                RGraph.SVG.setShadow({
                    object:     this,
                    id:         'lineDropShadow_' + this.uid,
                    offsetx:    this.properties.lineShadowOffsetx,
                    offsety:    this.properties.lineShadowOffsety,
                    blur:       this.properties.lineShadowBlur,
                    color:      this.properties.lineShadowColor
                });
            }

            if (this.properties.lineSpline) {
                
                // Set this so that we can refer to the object
                var obj = this;
                var c   = RGraph.SVG.arrayClone(this.coords, true);

                // Get the coordinates for the spline line
                // coordinates
                var coordinates = Spline(c, {return: true});
                
                // Draw a line back to the X axis (whichever side
                // that may be)
                if (this.properties.lineFilled) {
                
                    // Copy the coordinates array so that the coordinates of
                    // the axis can bw added to it
                    var fillAreaCoordinates = RGraph.SVG.arrayClone(coordinates, true);
                
                    // Add the coordinates that take the fill back
                    // to the Y axis
                    if (this.properties.yaxisPosition === 'right') {
                        fillAreaCoordinates.push([this.width - this.properties.marginRight, coordinates[coordinates.length - 1][1]]);
                        fillAreaCoordinates.push([this.width - this.properties.marginRight, coordinates[0][1]]);
                    } else {
                        fillAreaCoordinates.push([this.properties.marginLeft, coordinates[coordinates.length - 1][1]]);
                        fillAreaCoordinates.push([this.properties.marginLeft, coordinates[0][1]]);
                    }
                
                    RGraph.SVG.create({
                        svg: obj.svg,
                        parent: obj.svgAllGroup,
                        type: 'path',
                        attr: {
                            fill:              obj.properties.lineFilledColor,
                            stroke:            'transparent',
                            d:                 RGraph.SVG.create.pathString(fillAreaCoordinates),
                            'clip-path':       obj.isTrace ? 'url(#trace-effect-clip)' : ''
                        }
                    });
                }
                
                RGraph.SVG.create({
                    svg: obj.svg,
                    parent: obj.svgAllGroup,
                    type: 'path',
                    attr: {
                        fill:              "transparent",
                        stroke:            obj.properties.lineColor,
                        'stroke-width':    obj.properties.lineLinewidth,
                        'stroke-linejoin': 'round',
                        'stroke-linecap':  'round',
                        d:                 RGraph.SVG.create.pathString(coordinates),
                        filter:            obj.properties.lineShadow ? 'url(#lineDropShadow_' + obj.uid + ')' : '',
                        'clip-path':       obj.isTrace ? 'url(#trace-effect-clip)' : ''
                    }
                });

            } else {
            
                // TODO Need to skip null values at the start
                //      of the array here
            
                var d = '';

                // Move to the first coordinate
                if (RGraph.SVG.isNumber(this.data[0])) {
                    if (this.properties.yaxisPosition === 'right') {
                        d = 'M {1} {2} '.format(
                            this.coords[0].x,
                            this.coords[0].y + (this.coords[0].height / 2)
                        );
                    } else {

                        var v = Number(this.coords[0].element.getAttribute('data-value'));

                        d = 'M {1} {2} '.format(
                            this.coords[0].x + (v < 0 ? 0 : this.coords[0].width),
                            this.coords[0].y + (this.coords[0].height / 2)
                        );
                    }
                }

                // Draw a line to subsequent points unless
                // that point is null, in which case move
                // to it instead
                for (let i=0; i<this.coords.length; ++i) {

                    if (RGraph.SVG.isNullish(this.data[i])) {
                        var action = 'M';
                        var x      = 0;
                        var y      = 0;
                    } else if (RGraph.SVG.isNullish(this.data[i - 1])) {
                        var action  = 'M';
                        var x       = this.coords[i].x + (this.properties.yaxisPosition === 'right' ? 0 : this.coords[i].width);
                        var y       = this.coords[i].y + (this.coords[i].height / 2);
                    } else {
                        var action  = 'L';
                        var x       = this.coords[i].x + (this.properties.yaxisPosition === 'right' ? (this.data[i] < 0 ? this.coords[i].width : 0) : (this.data[i] < 0 ? 0 : this.coords[i].width) );
                        var y       = this.coords[i].y + (this.coords[i].height / 2);
                    }

                    d += 
                        '{1} {2} {3} '.format(
                        action,x, y
                    );
                }






                if (properties.lineFilled) {
                
                    RGraph.SVG.create({
                        svg:    this.svg,
                        type:   'path',
                        parent: this.svgAllGroup,
                        attr: {
                            d: d + ' L ' + (properties.yaxisPosition === 'right' ? [this.width - this.properties.marginRight, y].join(' ') : [this.properties.marginLeft, y].join(' '))
                                 + ' L ' + (properties.yaxisPosition === 'right' ? [this.width - this.properties.marginRight, this.coords[0].y + (this.coords[0].height / 2)] : [this.properties.marginLeft, (this.coords[0].y + (this.coords[0].height / 2))]).join(' ')
                                 + ' z',
                            stroke: 'transparent',
                            fill:   !RGraph.SVG.isNullish(this.properties.lineFilledColor) ? this.properties.lineFilledColor : this.properties.lineColor,
                            'stroke-width': 0.001,
                            'stroke-linecap': this.properties.lineLinecap,
                            'stroke-linejoin': this.properties.lineLinejoin,
                            //filter: this.properties.lineShadow ? 'url(#lineDropShadow_' + this.uid + ')' : '',
                            'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                        }
                    });
                }





                var path = RGraph.SVG.create({
                    svg:    this.svg,
                    type:   'path',
                    parent: this.svgAllGroup,
                    attr: {
                        d:      d,
                        stroke: this.properties.lineColor,
                        fill:   'transparent',
                        'stroke-width': this.properties.lineLinewidth,
                        'stroke-linecap': this.properties.lineLinecap,
                        'stroke-linejoin': this.properties.lineLinejoin,
                        filter: this.properties.lineShadow ? 'url(#lineDropShadow_' + this.uid + ')' : '',
                        'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                    }
                });

            }











            //
            // TODO Add more styles of tickmarks
            //
            var obj = this;
            this.coords.forEach(function (v, k, arr)
            {
                if (typeof obj.properties.lineTickmarksStyle === 'string') {
                    
                    var isEndTick  = (k === 0 || k === (arr.length - 1));
                    var isNull     = RGraph.SVG.isNullish(obj.data[k]);
                    var prevIsNull = RGraph.SVG.isNullish(obj.data[k - 1]);
                    var nextIsNull = RGraph.SVG.isNullish(obj.data[k + 1]);
                    var isLast     = k === (arr.length - 1);

                    //
                    // Does this tickmark need to be drawn?
                    //
                    if (isNull && !obj.properties.lineTickmarksDrawNull) return;
                    if (!isNull && prevIsNull && nextIsNull && !obj.properties.lineTickmarksDrawNonNull) return;

                    //
                    // Draw the various styles of tickmark
                    //
                    switch (obj.properties.lineTickmarksStyle) {
                        case 'circle':
                        case 'filledcircle':
                        case 'filledendcircle':
                        case 'endcircle':
                            if (
                                   (obj.properties.lineTickmarksStyle.indexOf('end') >= 0 && isEndTick)
                                || obj.properties.lineTickmarksStyle.indexOf('end') === -1
                               ) {



                                    var x = v.x;
                                    var y = v.y + (v.height / 2);

                                    // Adjust the tickmark if the
                                    // Y-axis position is on the left
                                    // and the value is positive
                                    if (   obj.properties.yaxisPosition === 'left'
                                        && Number(v.element.getAttribute('data-value')) > 0
                                       ) {
                                        x += v.width;
                                    }

                                    // Adjust the tickmark if the
                                    // Y-axis position is on the right
                                    // and the value is negative
                                    if (   obj.properties.yaxisPosition === 'right'
                                        && Number(v.element.getAttribute('data-value')) < 0
                                       ) {
                                        x += v.width;
                                    }


                                RGraph.SVG.create({
                                    svg:  obj.svg,
                                    type: 'circle',
                                    parent: obj.svgAllGroup,
                                    attr: {
                                        cx:          x,
                                        cy:          y,
                                        r:           obj.properties.lineTickmarksSize,
                                        fill:        obj.properties.lineColor,
                                        filter:      obj.properties.lineShadow ? 'url(#lineDropShadow_' + obj.uid + ')' : '',
                                        'clip-path': obj.isTrace ? 'url(#trace-effect-clip)' : ''
                                    }
                                });

                                // Draw the center part of the circle tickmark
                                if (obj.properties.lineTickmarksStyle.indexOf('filled') < 0) {

                                    RGraph.SVG.create({
                                        svg:    obj.svg,
                                        type:   'circle',
                                        parent: obj.svgAllGroup,
                                        attr: {
                                            cx:         x,
                                            cy:         y,
                                            r:          RGraph.SVG.isNumber(obj.properties.lineTickmarksLinewidth)
                                                          ? (obj.properties.lineTickmarksSize - obj.properties.lineTickmarksLinewidth)
                                                          : (obj.properties.lineTickmarksSize - 3),
                                            fill:       'white',
                                            'clip-path':obj.isTrace ? 'url(#trace-effect-clip)' : ''
                                        }
                                    });
                                }
                            }
                            break;

                        case 'square':
                        case 'rect':
                        case 'filledsquare':
                        case 'filledrect':
                        case 'filledendsquare':
                        case 'filledendrect':
                        case 'endsquare':
                        case 'endrect':
                            if (
                                   (obj.properties.lineTickmarksStyle.indexOf('end') >= 0 && isEndTick)
                                || obj.properties.lineTickmarksStyle.indexOf('end') === -1
                               ) {

                                    var x = v.x - obj.properties.lineTickmarksSize + (RGraph.SVG.isNullish(obj.properties.lineTickmarksLinewidth) ? 3 : obj.properties.lineTickmarksLinewidth);
                                    var y = v.y + (v.height / 2) - obj.properties.lineTickmarksSize;

                                    // Adjust the tickmark if the
                                    // Y-axis position is on the left
                                    // and the value is positive
                                    if (   obj.properties.yaxisPosition === 'left'
                                        && Number(v.element.getAttribute('data-value')) > 0
                                       ) {
                                        x += v.width;
                                    }

                                    // Adjust the tickmark if the
                                    // Y-axis position is on the right
                                    // and the value is negative
                                    if (   obj.properties.yaxisPosition === 'right'
                                        && Number(v.element.getAttribute('data-value')) < 0
                                       ) {
                                        x += v.width;
                                    }

                                    RGraph.SVG.create({
                                        svg:    obj.svg,
                                        type:   'rect',
                                        parent: obj.svgAllGroup,
                                        attr: {
                                            x:           x,
                                            y:           y,
                                            width:       obj.properties.lineTickmarksSize * 2,
                                            height:      obj.properties.lineTickmarksSize * 2,
                                            fill:        obj.properties.lineColor,
                                            filter:      obj.properties.lineShadow ? 'url(#lineDropShadow_' + obj.uid + ')' : '',
                                            'clip-path': obj.isTrace ? 'url(#trace-effect-clip)' : ''
                                        }
                                    });

                                // Draw the center part of the rect tickmark
                                if (obj.properties.lineTickmarksStyle.indexOf('filled') < 0) {
                                
                                
                                    RGraph.SVG.create({
                                        svg:    obj.svg,
                                        type:   'rect',
                                        parent: obj.svgAllGroup,
                                        attr: {
                                            x:           x + (obj.properties.lineTickmarksLinewidth),
                                            y:           y + (obj.properties.lineTickmarksLinewidth),
                                            width:       RGraph.SVG.isNumber(obj.properties.lineTickmarksLinewidth)
                                                            ? (obj.properties.lineTickmarksSize * 2) - (2 * obj.properties.lineTickmarksLinewidth)
                                                            : (obj.properties.lineTickmarksSize * 2) - 3 - 3,
                                            height:      RGraph.SVG.isNumber(obj.properties.lineTickmarksLinewidth)
                                                            ? (obj.properties.lineTickmarksSize * 2) - (2 * obj.properties.lineTickmarksLinewidth)
                                                            : (obj.properties.lineTickmarksSize * 2) - 3 - 3,
                                            fill:        'white',
                                            'clip-path': obj.isTrace ? 'url(#trace-effect-clip)' : ''
                                        }
                                    });
                                }
                            }
                            break;    
                    }
                }
            });






            //
            // This function draws a spline using the HBar coords
            // 
            // @param array  coords  The coordinates
            //
            function Spline (coords, opt = {})
            {
                var coordsSpline = [[]];

                var yCoords     = [],
                    interval    = (obj.height - obj.properties.marginTop - obj.properties.marginBottom) / coords.length;
                    path        = [];

                //
                // The drawSpline function needs an array of JUST
                // the X values - so put the coords into the correct
                // format
                //

                for (var i=0; i<coords.length;++i) {
                    coords[i] = Number(coords[i].x) +
                                    (obj.properties.yaxisPosition === 'right'
                                        ? (obj.data[i] < 0 ? Number(coords[i].width) : 0)
                                        : (obj.data[i] < 0 ? 0 : Number(coords[i].width))
                                    );
                }

    

    
                //
                // Get the Points array in the format we want -
                // first value should be null along with the lst
                // value
                //
                var P = [coords[0]];
                for (var i=0; i<coords.length; ++i) {
                    P.push(coords[i]);
                }
                P.push(
                    coords[coords.length - 1] + (coords[coords.length - 1] - coords[coords.length - 2])
                );

                // This is is necessary to center the points
                // within each bar/section
                var halfsection = ((obj.height - obj.properties.marginTop - obj.properties.marginBottom) / obj.data.length) / 2

                for (var j=1; j<P.length-2; ++j) {
                    for (var t=0; t<10; ++t) {
                        
                        var xCoord = Spline( t/10, P[j-1], P[j], P[j+1], P[j+2] );

                        yCoords.push(
                            ((j-1) * interval) + (t * (interval / 10)) + obj.properties.marginTop + halfsection
                        );

                        path.push([
                            xCoord,
                            yCoords[yCoords.length - 1]
                        ]);
    
                        
                        if (typeof index == 'number') {
                            coordsSpline[0].push([
                                xCoords[xCoords.length - 1],
                                yCoords[yCoords.length - 1]
                            ]);
                        }
                    }
                }

    
                // Draw the last section
                var last = [
                    obj.coords[obj.coords.length - 1].x + (obj.properties.yaxisPosition === 'right'  ? obj.coords[obj.coords.length - 1].width : 0),
                    obj.coords[obj.coords.length - 1].y + (obj.coords[obj.coords.length - 1].height / 2)
                ];
                
                // Adjust the position of the last point
                if (obj.properties.yaxisPosition === 'left' && obj.coords[j - 1].element.getAttribute('data-value') > 0) {
                    last[0] += obj.coords[obj.coords.length - 1].width;
                }
                
                // Adjust the position of the last point
                if (obj.properties.yaxisPosition === 'right' && obj.coords[j - 1].element.getAttribute('data-value') > 0) {
                    last[0] -= obj.coords[obj.coords.length - 1].width;
                }

                path.push([
                    last[0],
                    last[1]
                ]);

                if (typeof index === 'number') {
                    coordsSpline[0].push([
                        last[0],
                        last[1]
                    ]);
                }

                var str = '';
                path.forEach(function (v,k,arr)
                {
                    var command = (k === 0 ? 'M' : 'L');
                    str += ' {1} {2} {3}'.format(command, v[0], v[1]);
                });



                //
                // Create the path which depicts the spline
                //
                if (opt.return) {

                    // The 'path' variable appears to contain all
                    // of the coordinates.
                    return path;

                } else {

                    RGraph.SVG.create({
                        svg: obj.svg,
                        parent: obj.svgAllGroup,
                        type: 'path',
                        attr: {
                            fill:              "transparent",
                            stroke:            obj.properties.lineColor,
                            'stroke-width':    obj.properties.lineLinewidth,
                            'stroke-linejoin': 'round',
                            'stroke-linecap':  'round',
                            d:                 str,
                            filter:            obj.properties.lineShadow ? 'url(#lineDropShadow_' + obj.uid + ')' : '',
                            'clip-path':       obj.isTrace ? 'url(#trace-effect-clip)' : ''
                        }
                    });
                }

    
        
                function Spline (t, P0, P1, P2, P3)
                {
                    return 0.5 * ((2 * P1) +
                                 ((0-P0) + P2) * t +
                                 ((2*P0 - (5*P1) + (4*P2) - P3) * (t*t) +
                                 ((0-P0) + (3*P1)- (3*P2) + P3) * (t*t*t)));
                }
            }
        };








        //
        // A trace effect for the line
        //
        // @param object    Options to give to the effect
        // @param  function A function to call when the effect has completed
        //
        this.trace = function ()
        {
            var opt      = arguments[0] || {},
                frame    = 1,
                frames   = opt.frames || 60,
                obj      = this;
            
            this.isTrace = true;

            this.draw();
                


            // Create the clip area

            var clippath = RGraph.SVG.create({
                svg:  this.svg,
                type: 'clipPath',
                parent: this.svg.defs,
                attr: {
                    id: 'trace-effect-clip'
                }
            });

            var clippathrect = RGraph.SVG.create({
                svg: this.svg,
                type: 'rect',
                parent: clippath,
                attr: {
                    x: 0,
                    y: 0,
                    width: this.width,
                    height: 0
                }
            });

            var iterator = function ()
            {
                var height = (frame++) / frames * obj.height;

                clippathrect.setAttribute("height", height);

                if (frame <= frames) {
                    RGraph.SVG.FX.update(iterator);
                } else {
                    
                    // Remove the clippath
                    clippath.parentNode.removeChild(clippath);
                    
                    if (opt.callback) {
                        (opt.callback)(obj);
                    }
                }
            };
            
            iterator();
            
            return this;
        };








        //
        // This function handles clipping to scale values. Because
        // each chart handles scales differently, a worker function
        // is needed instead of it all being done centrally.
        //
        // @param object clipPath The <clipPath> node
        //
        this.clipToScaleWorker = function (clipPath)
        {
            // The Regular expression is actually done by the
            // calling RGraph.clipTo.start() function  in the core
            // library
            if (RegExp.$1 === 'min') from = this.min; else from = Number(RegExp.$1);
            if (RegExp.$2 === 'max') to   = this.max; else to   = Number(RegExp.$2);

            var height  = this.height,
                x1     = this.getXCoord(from),
                x2     = this.getXCoord(to),
                width  = Math.abs(x2 - x1),
                y      = 0,
                x      = Math.min(x1, x2);


            // Increase the width if the maximum value is "max"
            if (RegExp.$2 === 'max') {
                width += this.properties.marginRight;
            }
        
            // Increase the height if the minimum value is "min"
            if (RegExp.$1 === 'min') {
                x = 0;
                width += this.properties.marginLeft;
            }


            RGraph.SVG.create({
                svg:    this.svg,
                type:   'rect',
                parent: clipPath,
                attr: {
                    x:      x,
                    y:      y,
                    width:  width,
                    height: height
                }
            });
            
            // Now set the clip-path attribute on the first
            // Line charts all-elements group
            this.svgAllGroup.setAttribute(
                'clip-path',
                'url(#' + clipPath.id + ')'
            );
        };








    //
    // This function allows the drawing of custom lines
    //
    this.drawVerticalLines = function ()
    {
        var lines = this.properties.verticalLines,
            avg,x,y,label,halign,valign,hmargin = 5,vmargin = 10,
            position,textFont,textSize,textColor,textBold,textItalic,
            data,linewidth,data_linear;

        if (lines) {
        
            data_linear = RGraph.SVG.arrayLinearize(this.data);

            //
            // Set some defaults for the configuration of
            // each line
            //
            var defaults = {
                dotted:             false,
                dashed:             true,
                color:              '#666', // Same as labelColor property below
                linewidth:          1,
                label:              'Average (%{value})',
                labelPosition:      'top',
                labelColor:         '#666', // Same as color property above
                labelOffsetx:       0,
                labelOffsety:       0
            };

        
            // Loop through each line to be drawn
            for (var i=0; i<this.properties.verticalLines.length; ++i) {

                var conf       = lines[i],
                    textFont   = conf.labelFont  || this.properties.textFont,
                    textColor  = conf.labelColor || defaults.labelColor,
                    textSize   = conf.labelSize  || this.properties.textSize,
                    textBold   = conf.labelBold   ? conf.labelBold   : this.properties.textBold,
                    textItalic = conf.labelItalic ? conf.labelItalic : this.properties.textItalic;








                    if (typeof conf.value === 'number') {
                        x = this.getXCoord(conf.value);
                    
                    } else {
                        conf.value = 'average';
                        avg = RGraph.SVG.arraySum(data_linear) /  data_linear.length;
                        x   = this.getXCoord(avg);
                    }










                //
                // Dotted or dashed lines
                //
                linedash = '';

                if (conf.dotted === true) {
                    linedash = '1 3';
                }
                
                if (conf.dashed === true || (RGraph.SVG.isUndefined(conf.dashed) && RGraph.SVG.isUndefined(conf.dotted)) ) {
                    linedash = '6 6';
                }










                //
                // Draw the line
                //
                RGraph.SVG.create({
                    svg:    this.svg,
                    type:   'line',
                    parent: this.svgAllGroup,
                    attr: {
                        x1:                 x,
                        y1:                 this.properties.marginTop,
                        x2:                 x,
                        y2:                 this.height - this.properties.marginBottom,
                        'stroke-width':     typeof conf.linewidth === 'number' ? conf.linewidth : defaults.linewidth,
                        'stroke-dasharray': linedash,
                        stroke:             conf.color || defaults.color
                    }
                });





                //
                // Draw the label
                //




                

                // Default position for the label
                conf.labelPosition = conf.labelPosition || defaults.labelPosition;

                labelPosition = conf.labelPosition.trim();



                // Account for linewidth
                linewidth = typeof conf.linewidth === 'number' ? conf.linewidth : defaults.linewidth;

                //
                // Determine the value to show
                //
                if (RGraph.SVG.isString(conf.value) && conf.value === 'average') {
                    num = avg;
                    num = num.toFixed(conf.labelValueDecimals);
                    
                } else {
                    var num = Number(conf.value).toFixed(conf.labelValueDecimals);
                }

                num = RGraph.SVG.numberFormat({
                   object: this,
                      num: num,
                  prepend: conf.labelValueUnitsPre,
                   append: conf.labelValueUnitsPost,
                 thousand: conf.labelValueThousand,
                    point: conf.labelValuePoint,
                formatter: conf.labelValueFormatter,
                 decimals: conf.labelValueDecimals
                });



                //
                // Is the label positioned at the top or the bottom
                //
                
                // Default labelPosition is the top
                if (!conf.labelPosition) {
                    conf.labelPosition = 'top';
                }
                
                // Determine the position of the label
                if (conf.labelPosition === 'bottom') {
                    var y = this.height - this.properties.marginBottom + (conf.labelOffsety || 0) + 7;
                } else {
                    var y = (this.properties.marginTop + (conf.labelOffsety || 0) - 7);
                }

                //
                // Draw the label
                //
                RGraph.SVG.text({
                    object: this,
                      text: (RGraph.SVG.isString(conf.label) ? conf.label : defaults.label).replace('%{value}', num),
                         x: RGraph.SVG.isNumber(conf.labelX) ? conf.labelX : (x + (conf.labelOffsetx || 0)),
                         y: RGraph.SVG.isNumber(conf.labelY) ? conf.labelY : y,
                    valign: RGraph.SVG.isString(conf.labelValign) ? conf.labelValign : (conf.labelPosition === 'bottom' ? 'top' : 'bottom'),
                    halign: RGraph.SVG.isString(conf.labelHalign) ? conf.labelHalign : 'center',
                      size: textSize,
                      font: textFont,
                     color: textColor,
                    italic: textItalic,
                      bold: textBold,
                background: conf.label ? '#fff9' : null
                });
            }
        }
    };








        //
        // Set the options that the user has provided
        //
        for (i in conf.options) {
            if (typeof i === 'string') {
                this.set(i, conf.options[i]);
            }
        }
    };
            
    return this;

// End module pattern
})(window, document);