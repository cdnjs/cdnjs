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
    RGraph.SVG.Scatter = function (conf)
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
                        
                        name  = ret.name;
                        value = ret.value;

                        this.set(name, value);
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

                // If setting the colors, update the originalColors
                // property too
                if (name === 'colors') {
                    this.originalColors = RGraph.SVG.arrayClone(value, true);
                    this.colorsParsed = false;
                }
                
                // BC for labelsAboveSeperator
                if (name === 'labelsAboveSeperator') {
                    name = labelsAboveSeparator;
                }

                this.properties[name] = value;
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





        this.type             = 'scatter';
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
        this.coordsBubble     = [];
        this.coordsTrendline  = [];
        this.colorsParsed     = false;
        this.originalColors   = {};
        this.gradientCounter  = 1;
        this.sequential       = 0;
        this.line_groups      = [];
        this.firstDraw        = true; // After the first draw this will be false








        // Add this object to the ObjectRegistry
        RGraph.SVG.OR.add(this);
        
        this.container.style.display = 'inline-block';

        this.properties =
        {
            marginLeft:   35,
            marginRight:  35,
            marginTop:    35,
            marginBottom: 35,
           
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

            tickmarksStyle:       'cross',
            tickmarksSize:        7,
            
            colors:               null,
            colorsDefault:        'black',
            
            line:                 false,
            lineColors:           null,
            lineLinewidth:        1,
            
            errorbarsColor:       'black',
            errorbarsLinewidth:   1,
            errorbarsCapwidth:    10,

            yaxis:                true,
            yaxisLinewidth:       1,
            yaxisTickmarks:       true,
            yaxisTickmarksLength: 3,
            yaxisColor:           'black',
            yaxisScale:           true,
            yaxisLabels:          null,
            yaxisLabelsOffsetx:   0,
            yaxisLabelsOffsety:   0,
            yaxisLabelsCount:     5,
            yaxisScaleUnitsPre:        '',
            yaxisScaleUnitsPost:       '',
            yaxisScaleStrict:          false,
            yaxisScaleDecimals:        0,
            yaxisScalePoint:           '.',
            yaxisScaleThousand:        ',',
            yaxisScaleRound:           false,
            yaxisScaleMax:             null,
            yaxisScaleMin:             0,
            yaxisScaleFormatter:       null,
            yaxisTitle:                '',
            yaxisTitleBold:            null,
            yaxisTitleSize:            null,
            yaxisTitleFont:            null,
            yaxisTitleColor:           null,
            yaxisTitleItalic:          null,
            yaxisTitleOffsetx:         0,
            yaxisTitleOffsety:         0,
            yaxisTitleX:               null,
            yaxisTitleY:               null,
            yaxisTitleHalign:          null,
            yaxisTitleValign:          null,

            xaxis:                true,
            xaxisLinewidth:       1,
            xaxisTickmarks:       true,
            xaxisTickmarksLength: 5,
            xaxisLabels:          null,
            xaxisLabelsPosition:  'section',
            xaxisLabelsPositionEdgeTickmarksCount: 10,
            xaxisColor:           'black',
            xaxisLabelsOffsetx:   0,
            xaxisLabelsOffsety:   0,
            xaxisLabelsCount:     10,
            xaxisLabelsFont:      null,
            xaxisLabelsSize:      null,
            xaxisLabelsColor:     null,
            xaxisLabelsBold:      null,
            xaxisLabelsItalic:    null,
            xaxisScaleUnitsPre:   '',
            xaxisScaleUnitsPost:  '',
            xaxisScaleMax:        null,
            xaxisScaleMin:        0,
            xaxisScalePoint:      '.',
            xaxisRound:           false,
            xaxisScaleThousand:   ',',
            xaxisScaleDecimals:   0,
            xaxisScaleFormatter:  null,
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

            textColor:            'black',
            textFont:             'Arial, Verdana, sans-serif',
            textSize:             12,
            textBold:             false,
            textItalic:           false,
            text:                 null,


            labelsAboveFont:              null,
            labelsAboveSize:              null,
            labelsAboveBold:              null,
            labelsAboveItalic:            null,
            labelsAboveColor:             null,
            labelsAboveBackground:        'rgba(255,255,255,0.7)',
            labelsAboveBackgroundPadding: 2,
            labelsAboveXUnitsPre:          null,
            labelsAboveXUnitsPost:         null,
            labelsAboveXPoint:             null,
            labelsAboveXThousand:          null,
            labelsAboveXFormatter:         null,
            labelsAboveXDecimals:          null,
            labelsAboveYUnitsPre:          null,
            labelsAboveYUnitsPost:         null,
            labelsAboveYPoint:             null,
            labelsAboveYThousand:          null,
            labelsAboveYFormatter:         null,
            labelsAboveYDecimals:          null,
            labelsAboveOffsetx:           0,
            labelsAboveOffsety:           -10,
            labelsAboveHalign:            'center',
            labelsAboveValign:            'bottom',
            labelsAboveSeparator:         ',',

            tooltipsOverride:                null,
            tooltipsEffect:                  'fade',
            tooltipsCssClass:                'RGraph_tooltip',
            tooltipsCss:                     null,
            tooltipsEvent:                   'mousemove',
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
            titleSubtitleSize:    null,
            titleSubtitleColor:   '#aaa',
            titleSubtitleFont:    null,
            titleSubtitleBold:    null,
            titleSubtitleItalic:  null,

            key:            null,
            keyColors:      null,
            keyOffsetx:     0,
            keyOffsety:     0,
            keyLabelsOffsetx: 0,
            keyLabelsOffsety: -1,
            keyLabelsFont:    null,
            keyLabelsSize:    null,
            keyLabelsColor:   null,
            keyLabelsBold:    null,
            keyLabelsItalic:  null,
            
            bubble:              false,
            bubbleMaxValue:      null,
            bubbleMaxRadius:     null,
            bubbleColorsSolid:   false,
            bubbleShadow:        false,
            bubbleShadowOffsetx: 2,
            bubbleShadowOffsety: 2,
            bubbleShadowBlur:    1,
            bubbleShadowColor:   '#aaa',
            
            errorbars:            null,
            errorbarsColor:       'black',
            errorbarsLinewidth:   1,
            errorbarsCapwidth:    10,

            trendline:                  false,
            trendlineColors:            ['gray'],
            trendlineLinewidth:         1,
            trendlineMargin:            15,
            trendlineDashed:            true,
            trendlineDotted:            false,
            trendlineDashArray:         null,
            trendlineClipping:          null,
            
            outofbounds: true,

            clip: null
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
        // Set the options that the user has provided
        //
        for (i in conf.options) {
            if (typeof i === 'string') {
                this.set(i, conf.options[i]);
            }
        }





        // Handles the data that was supplied to the object. If only one dataset
        // was given, convert it into into a multiple dataset style array
        if (this.data[0] && !RGraph.SVG.isArray(this.data[0])) {
            this.data = [];
            this.data[0] = conf.data;
        }




        // Go through the data converting the various X and Y options
        // from strings to numbers if necessary
        //
        // THIS MESSES UP DATETIME CHART
        //
        //for (var i=0; i<this.data.length; ++i) {
        //    for (var j=0; j<this.data[i].length; ++j) {
        //        if (typeof this.data[i][j].x       === 'string') this.data[i][j].x       = parseFloat(this.data[i][j].x);
        //        if (typeof this.data[i][j].y       === 'string') this.data[i][j].y       = parseFloat(this.data[i][j].y);
        //        if (typeof this.data[i][j].size    === 'string') this.data[i][j].size    = parseFloat(this.data[i][j].size);
        //        if (typeof this.data[i][j].opacity === 'string') this.data[i][j].opacity = parseFloat(this.data[i][j].opacity);
        //    }
        //}




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
        // Convert string X values to timestamps
        //
        if (typeof properties.xaxisScaleMin === 'string') {
            properties.xaxisScaleMin = RGraph.SVG.parseDate(properties.xaxisScaleMin);
        }

        if (typeof properties.xaxisScaleMax === 'string') {
            properties.xaxisScaleMax = RGraph.SVG.parseDate(properties.xaxisScaleMax);
        }

        for (var i=0; i<this.data.length; ++i) {
            for (var j=0; j<this.data[i].length; ++j) {
                if (typeof this.data[i][j].x === 'string') {
                    this.data[i][j].x = RGraph.SVG.parseDate(this.data[i][j].x);
                }
            }
        }







        //
        // The draw method draws the Bar chart
        //
        this.draw = function ()
        {
            // Fire the beforedraw event
            RGraph.SVG.fireCustomEvent(this, 'onbeforedraw');
            
            // Reset the sequential counter
            this.sequential = 0;

            // Should be the first(ish) thing that's done in the
            // .draw() function except for the onbeforedraw event
            // and the installation of clipping.
            this.width  = Number(this.svg.getAttribute('width'));
            this.height = Number(this.svg.getAttribute('height'));




            //
            // If the labels option is a string then turn it
            // into an array.
            //
            if (properties.xaxisLabels && properties.xaxisLabels.length) {
                
                if (typeof properties.xaxisLabels === 'string') {
                    properties.xaxisLabels = RGraph.SVG.arrayPad({
                        array:  [],
                        length: properties.xaxisLabelsCount,
                        value:  properties.xaxisLabels
                    });
                }

                //
                // Label substitution
                //
                for (var i=0; i<properties.xaxisLabels.length; ++i) {
                    properties.xaxisLabels[i] = RGraph.SVG.labelSubstitution({
                        object:    this,
                        text:      properties.xaxisLabels[i],
                        index:     i,
                        value:     this.data[0][i],
                        decimals:  properties.xaxisLabelsFormattedDecimals  || 0,
                        unitsPre:  properties.xaxisLabelsFormattedUnitsPre  || '',
                        unitsPost: properties.xaxisLabelsFormattedUnitsPost || '',
                        thousand:  properties.xaxisLabelsFormattedThousand  || ',',
                        point:     properties.xaxisLabelsFormattedPoint     || '.'
                    });
                }
            }








            // Create the defs tag if necessary
            RGraph.SVG.createDefs(this);




            this.graphWidth  = this.width - properties.marginLeft - properties.marginRight;
            this.graphHeight = this.height - properties.marginTop - properties.marginBottom;
            
            
            // Prevents these from growing
            this.coords       = [];
            this.coords2      = [];
            this.coordsBubble = [];




            // Parse the colors for gradients
            RGraph.SVG.resetColorsToOriginalValues({object:this});
            this.parseColors();




            // Work out the maximum value
            for (var ds=0,max=0; ds<this.data.length; ++ds) { // Datasets
                for (var dp=0; dp<this.data[ds].length; ++dp) { // Datapoints
                    max = Math.max(
                        max,
                        this.data[ds][dp].y + (this.data[ds][dp].errorbar ? (typeof this.data[ds][dp].errorbar === 'number' ? this.data[ds][dp].errorbar : this.data[ds][dp].errorbar.max) : 0)
                    );
                }
            }






            // A custom, user-specified maximum value
            if (typeof properties.yaxisScaleMax === 'number') {
                max = properties.yaxisScaleMax;
            }
            
            // Set the ymin to zero if it's set mirror
            if (properties.yaxisScaleMin === 'mirror' || properties.yaxisScaleMin === 'middle' || properties.yaxisScaleMin === 'center') {
                var mirrorScale = true;
                properties.yaxisScaleMin   = 0;
            }


            //
            // Generate an appropiate scale
            //
            this.scale = RGraph.SVG.getScale({
                object:    this,
                numlabels: properties.yaxisLabelsCount,
                unitsPre:  properties.yaxisScaleUnitsPre,
                unitsPost: properties.yaxisScaleUnitsPost,
                max:       max,
                min:       properties.yaxisScaleMin,
                point:     properties.yaxisScalePoint,
                round:     properties.yaxisScaleRound,
                thousand:  properties.yaxisScaleThousand,
                decimals:  properties.yaxisScaleDecimals,
                strict:    typeof properties.yaxisScaleMax === 'number',
                formatter: properties.yaxisScaleFormatter
            });



            //
            // Get the scale a second time if the ymin should be
            // mirored
            //
            // Set the ymin to zero if it's set mirror
            if (mirrorScale) {
                this.scale = RGraph.SVG.getScale({
                    object:    this,
                    numlabels: properties.yaxisLabelsCount,
                    unitsPre:  properties.yaxisScaleUnitsPre,
                    unitsPost: properties.yaxisScaleUnitsPost,
                    max:       this.scale.max,
                    min:       this.scale.max * -1,
                    point:     properties.yaxisScalePoint,
                    round:     false,
                    thousand:  properties.yaxisScaleThousand,
                    decimals:  properties.yaxisScaleDecimals,
                    strict:    true,
                    formatter: properties.yaxisScaleFormatter
                });
            }

            // Now the scale has been generated adopt its max value
            this.max      = this.scale.max;
            this.min      = this.scale.min;
            properties.yaxisScaleMax = this.scale.max;
            properties.yaxisScaleMin = this.scale.min;


















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







            // Draw the axes under the points

            RGraph.SVG.drawXAxis(this);
            RGraph.SVG.drawYAxis(this);






            // Create a group for all of the datasets
            var dataset_group = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: this.svgAllGroup,
                attr: {
                    className: 'scatter_datasets_' + this.uid
                }
            });

            // Draw the points for all of the datasets
            for (var i=0; i<this.data.length; ++i) {

                var group = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'g',
                    parent: this.svgAllGroup,
                    attr: {
                        id: 'scatter_line_' + i + this.uid
                    }
                });
                
                this.line_groups[i] = group;

                this.drawPoints({
                    index: i,
                    data: this.data[i],
                    group: dataset_group
                });

                // Draw a line for this dataset
                if (properties.line === true || (typeof properties.line === 'object' && properties.line[i] === true)) {
                    this.drawLine({
                         index: i,
                        coords: this.coords2[i],
                    });
                }
            }









            //
            // Draw a trendline if requested
            //
            if (properties.trendline) {
                for (var i=0; i<this.data.length; ++i) {
                    if (properties.trendline === true || (typeof properties.trendline === 'object' && properties.trendline[i] === true) ) {
                        this.drawTrendline(i);
                    }
                }
            }








            // Draw the key
            if (typeof properties.key !== null && RGraph.SVG.drawKey) {
                RGraph.SVG.drawKey(this);
            } else if (!RGraph.SVG.isNullish(properties.key)) {
                alert('The drawKey() function does not exist - have you forgotten to include the key library?');
            }




            // Add the event listener that clears the highlight rect if
            // there is any. Must be MOUSEDOWN (ie before the click event)
            //var obj = this;
            //document.body.addEventListener('mousedown', function (e)
            //{
                //RGraph.SVG.removeHighlight(obj);

            //}, false);








            //
            // Allow the addition of custom text via the
            // text: property.
            //
            RGraph.SVG.addCustomText(this);










            // Draw any custom lines that have been defined
            RGraph.SVG.drawHorizontalLines(this);










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
        // Draws the Points
        //
        // @param opt object Options to the function which can consist of:
        //                     o index:   The numerical index of the DATASET
        //                     o dataset: The dataset.
        //
        this.drawPoints = function (opt)
        {
            var index = opt.index,
                data  = opt.data,
                group = opt.group;

            // Initialise the array for coordinates
            if (!this.coords2[index]) {
                this.coords2[index] = [];
            }

            //
            // Create the <g> tag that the bubbles are added to
            // if a bubble chart has been requested. If not -
            // then this group sits empty.
            //
            this.svgBubbleGroup = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: this.svgAllGroup,
                attr: {
                    className: 'scatter_bubble_dataset_' + index + '_' + this.uid
                }
            });

            //
            // Create the <g> tag that the datapoints are added to
            //
            var group = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: group,
                attr: {
                    className: 'scatter_dataset_' + index + '_' + this.uid
                }
            });

            // Loop through the data
            for (var i=0; i<data.length; ++i) {

                var point = data[i];

                if (RGraph.SVG.isNumber(point.x) && RGraph.SVG.isNumber(point.y)) {

                    var ret = this.drawSinglePoint({
                        dataset:    data,
                        datasetIdx: index,
                        point:      point,
                        index:      i,
                        group:      group, // The SVG <g> tag the points are added to
                        sequential: this.sequential
                    });

                    // Add the coordinates to the coords arrays
                    this.coords.push({
                        x:       ret.x,
                        y:       ret.y,
                        z:       ret.size,
                        type:    ret.type,
                        element: ret.mark,
                        object:  this
                    });

                    this.coords2[index][i] = {
                        x:       ret.x,
                        y:       ret.y,
                        z:       ret.size,
                        type:    ret.type,
                        element: ret.mark,
                        object:  this
                    };
                    
                    this.sequential++
                }













                //
                // Add tooltip highlight to the point
                //
                if (   (typeof data[i].tooltip === 'string' && data[i].tooltip)
                    || (typeof data[i].tooltip === 'number')
                    || (typeof properties.tooltips === 'string')
                   ) {

                    // Convert the tooltip to a string
                    data[i].tooltip = String(data[i].tooltip);

                    // Make the tooltipsEvent default to click
                    if (properties.tooltipsEvent !== 'mousemove') {
                        properties.tooltipsEvent = 'click';
                    }

                    if (!group_tooltip_hotspots) {
                        var group_tooltip_hotspots = RGraph.SVG.create({
                            svg: this.svg,
                            parent: this.svgAllGroup,
                            type: 'g',
                            attr: {
                                className: 'rgraph-scatter-tooltip-hotspots'
                            }
                        });
                    }

                    var rect = RGraph.SVG.create({
                        svg:  this.svg,
                        parent: this.svgAllGroup,
                        type: RGraph.SVG.isNumber(this.data[index][i].z) ? 'circle' : 'rect',
                        parent: group_tooltip_hotspots,
                        attr: {
                            // If the hotspot is a circle (for a
                            // bubble chart) then these attributes
                            // are here to size it
                            cx: this.coords2[index][i].x,
                            cy: this.coords2[index][i].y,
                            r:  this.data[index][i].z ? this.coordsBubble[index][i].z : this.coords2[index][i].r,
                        
                            // If the hotspot is a rect then these are
                            // the rect sizing attributes
                            x: ret.x - (ret.size / 2),
                            y: ret.y - (ret.size / 2),
                            width: ret.size,
                            height: ret.size,

                            stroke: 'transparent',
                            fill: 'transparent',
                            'stroke-width': 3,
                            'data-dataset': index,
                            'data-index': i,
                            'data-x': this.data[index][i].x,
                            'data-y': this.data[index][i].y,
                            'data-z': this.data[index][i].z
                        },
                        style: {
                            cursor: 'pointer'
                        }
                    });

                    // Add the hotspot to the original tickmark
                    ret.mark.hotspot = rect;

                    (function (dataset, index, seq, obj)
                    {
                        rect.addEventListener(properties.tooltipsEvent, function (e)
                        {
                            // TODO work out the bubble radius
                            // so the highlight can be increased
                            // in size
                            var isBubble = false
;
                            if (RGraph.SVG.isNumber(obj.data[dataset][index].z)) {
                                var isBubble = true;
                                var bubbleMaxRadius = obj.get('bubbleMaxRadius');
                                var bubbleMaxValue  = obj.get('bubbleMaxValue');
                                var bubbleValue     = obj.data[dataset][index].z;
                                var bubbleWidth     = bubbleValue / bubbleMaxValue * bubbleMaxRadius;
                            }

                            var tooltip = RGraph.SVG.REG.get('tooltip');

                            if (tooltip && tooltip.__dataset__ === dataset && tooltip.__index__ === index && tooltip.__object__.uid === obj.uid) {
                                return;
                            }
                
                            obj.removeHighlight();

                            // Show the tooltip
                            RGraph.SVG.tooltip({
                                object:          obj,
                                dataset:         dataset,
                                index:           index,
                                sequentialIndex: seq,
                                text:            typeof properties.tooltips === 'string' ? properties.tooltips : obj.data[dataset][index].tooltip,
                                event:           e
                            });


                            // Highlight the shape that has been clicked on
                            if (RGraph.SVG.REG.get('tooltip')) {
                                obj.highlight(this, {width: isBubble ? bubbleWidth : null});
                            }
                            
                        }, false);
                
                        // Install the event listener that changes the
                        // cursor if necessary
                        if (properties.tooltipsEvent === 'click') {
                            rect.addEventListener('mousemove', function (e)
                            {
                                e.target.style.cursor = 'pointer';
                            }, false);
                        }
                        
                    }(index, i, this.sequential - 1, this));
                }
            }
        };








        //
        // Draws a single point on the chart
        //
        this.drawSinglePoint = function (opt)
        {
            var dataset    = opt.dataset,
                datasetIdx = opt.datasetIdx,
                seq        = opt.sequential,
                point      = opt.point,
                index      = opt.index,
                valueX     = opt.point.x,
                valueY     = opt.point.y,
                conf       = opt.point || {},
                group      = opt.group,
                coordX     = opt.coordx = this.getXCoord(valueX),
                coordY     = opt.coordy = this.getYCoord(valueY);

            
            

            // Get the above label
            if (conf.labelsAbove) { // Plural
                var above = true;
            } else if (conf.labelAbove) { // Not plural
                var above = true;
            } else if (conf.above) {
                var above = true;
            }






            // Allow shape to be synonym for type
            if (typeof conf.type === 'undefined' && typeof conf.shape !== 'undefined') {
                var type = conf.shape;
            }






            // set the type to the default if its not set
            if (typeof conf.type !== 'string') {
                if (typeof properties.tickmarksStyle === 'string') {
                    var type = properties.tickmarksStyle;
                } else if (typeof properties.tickmarksStyle === 'object' && typeof properties.tickmarksStyle[datasetIdx] === 'string') {
                    var type = properties.tickmarksStyle[datasetIdx];
                } else {
                    var type = 'cross';
                }
            } else {
                var type = conf.type;
            }












            // set the size to the default if its not set
            if (typeof conf.size !== 'number' && typeof properties.tickmarksSize === 'number') {
                var size = properties.tickmarksSize;
            } else if (typeof conf.size !== 'number' && typeof properties.tickmarksSize === 'object' && typeof properties.tickmarksSize[datasetIdx] === 'number') {
                var size = properties.tickmarksSize[datasetIdx];
            } else if (RGraph.SVG.isNumber(conf.size)) {
                var size = conf.size;
            }







            // Set the color to the default if its not set
            if (conf.color) {
                var color = conf.color;
            } else if (RGraph.SVG.isArray(properties.colors) && properties.colors[datasetIdx]) {
                var color = properties.colors[datasetIdx];
            } else {
                var color = properties.colorsDefault;
            }







            // Set the opacity of this point
            if (typeof conf.opacity === 'undefined') {
                var opacity = 1;
            } else if (typeof conf.opacity === 'number') {
                var opacity = conf.opacity;
            }






            //  Draw the errorbar here
            //
            // First convert the errorbar information in the data into an array in the properties
            //
            properties.errorbars = [];
            for (var ds=0,max=0; ds<this.data.length; ++ds) {
                for (var idx=0; idx<this.data[ds].length; ++idx) {
                    properties.errorbars.push(this.data[ds][idx].errorbar);
                }
            }

            this.drawErrorbar({
                object:     this,
                dataset:    datasetIdx,
                index:      index,
                group:      group,
                sequential: seq,
                x:          coordX,
                y:          coordY,
                valueX:     valueX,
                valueY:     valueY,
                parent:     group
            });











            // Bubble charts are drawn by their own function
            if (properties.bubble) {
                var bubbleRet = this.drawBubble(opt, conf);
            }





















            // Handle the various shapes for tickmarks here
            switch (type) {
                case 'image:' + type.substr(6):
                
                    var src = type.substr(6);

                    var img = new Image();
                    img.src = src;
                    
                    var mark = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'image',
                        parent: group,
                        attr: {
                            preserveAspectRatio: 'xMidYMid meet',
                            'xlink:href': src,
                            'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                        }
                    });

                    // Once the image has loaded the x/y/width/height can be set
                    // (both the image and it's hotspot)
                    img.onload = function ()
                    {
                        var x = coordX - (img.width / 2),
                            y = coordY - (img.height / 2),
                            w = img.width,
                            h = img.height;

                        mark.setAttribute('x', x);
                        mark.setAttribute('y', y);
                        mark.setAttribute('width', w);
                        mark.setAttribute('height', h);

                        if (mark && mark.hotspot) {
                            mark.hotspot.setAttribute('x', x);
                            mark.hotspot.setAttribute('y', y);
                            mark.hotspot.setAttribute('width', w);
                            mark.hotspot.setAttribute('height', h);
                        }
                    };

                    break;

                case 'triangle':
                    var mark = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: group,
                        attr: {
                            d: 'M {1} {2} L {3} {4} L {5} {6}'.format(
                                coordX - (size / 2),
                                coordY + (size / 2),
                                coordX,
                                coordY - (size / 2),
                                coordX + (size / 2),
                                coordY + (size / 2)
                            ),
                            fill: color,
                            'fill-opacity': opacity,
                            'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                        }
                    });
                break;

                case 'plus':
                    var mark = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: group,
                        attr: {
                            d: 'M {1} {2} L {3} {4} M {5} {6} L {7} {8}'.format(
                                coordX - (size / 2),
                                coordY,
                                coordX +  (size / 2),
                                coordY,
                                coordX,
                                coordY - (size / 2),
                                coordX,
                                coordY + (size / 2)
                            ),
                            stroke: color,
                            'stroke-opacity': opacity,
                            'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                        }
                    });
                break;

                case 'square':
                case 'rect':
                    var mark = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'rect',
                        parent: group,
                        attr: {
                            x: coordX - (size / 2),
                            y: coordY - (size / 2),
                            width: size,
                            height: size,
                            fill: color,
                            'fill-opacity': opacity,
                            'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                        }
                    });
                break;



                case 'dot':
                case 'circle':
                    var mark = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'circle',
                        parent: group,
                        attr: {
                            cx: coordX,
                            cy: coordY,
                            r: size / 2,
                            fill: color,
                            'fill-opacity': opacity,
                            'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                        }
                    });
                break;



                case 'cross':
                default:

                    var mark = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: group,  
                        attr: {
                            d: 'M {1} {2} L {3} {4} M {5} {6} L {7} {8}'.format(
                                coordX - (size / 2), coordY - (size / 2),
                                coordX + (size / 2), coordY + (size / 2),
                                coordX - (size / 2), coordY + (size / 2),
                                coordX + (size / 2), coordY - (size / 2)
                            ),
                            stroke: color,
                            'stroke-opacity': opacity,
                            'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                        }
                    });
                    break;
            }
            
            //
            // Draw the above label if it's present
            //
            if (   RGraph.SVG.isString(conf.above)
                || (!RGraph.SVG.isString(conf.above) && conf.above)
               ) {
                this.drawLabelsAbove({
                     point: conf,
                    coordX: coordX,
                    coordY: coordY
                });
            }




            // Add some data attributes that save various values
            mark.setAttribute('data-index', index);
            mark.setAttribute('data-dataset', datasetIdx);
            mark.setAttribute('data-original-opacity', opacity);
            mark.setAttribute('data-original-color', color);
            mark.setAttribute('data-original-coordx', coordX);
            mark.setAttribute('data-original-coordy', coordY);
            mark.setAttribute('data-original-coordz', bubbleRet ? bubbleRet.z : null);
            mark.setAttribute('data-size', size);
            mark.setAttribute('data-sequential', seq);
            mark.setAttribute('data-type', type);

            return {
                x:    coordX,
                y:    coordY,
                size: type.substr(0,6) === 'image:' ? img.width : size,
                mark: mark,
                type: type
            };
        };







        //
        // Draw a bubble on a bubble chart
        //
        // @param opt object  The internal configuration of the point
        // @param conf object The configuration of the point as supplied by the user
        //
        this.drawBubble = function (opt, conf)
        {
            // Check whether this point has a z: value
            if (typeof conf.z !== 'number') {
                return;
            }
            
            //
            // Check that the coords array exists
            //
            if (!RGraph.SVG.isArray(this.coordsBubble[opt.datasetIdx])) {
                this.coordsBubble[opt.datasetIdx] = [];
            }



            var size = (conf.z / properties.bubbleMaxValue) * properties.bubbleMaxRadius;

            var color = RGraph.SVG.parseColorRadial({
                object: this,
                color: properties.bubbleColorsSolid ? conf.color : 'Gradient(white:' + conf.color + ')',
                cx: opt.coordx + (size / 4),
                cy: opt.coordy - (size / 4),
                fx: opt.coordx + (size / 4),
                fy: opt.coordy - (size / 4),
                r: size * 1.5
            });

            var circle = RGraph.SVG.create({
                svg: this.svg,
                type: 'circle',
                parent: this.svgBubbleGroup,
                attr: {
                    cx: opt.coordx,
                    cy: opt.coordy,
                    r: size,
                    fill: color,
                    'fill-opacity': conf.opacity,
                    'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                }
            });

            // Add some data attributes that save various values
            circle.setAttribute('data-index', opt.index);
            circle.setAttribute('data-dataset', opt.datasetIdx);
            circle.setAttribute('data-original-opacity', conf.opacity);
            circle.setAttribute('data-original-color', conf.color);
            circle.setAttribute('data-original-coordx', opt.coordx);
            circle.setAttribute('data-original-coordy', opt.coordy);
            circle.setAttribute('data-size', size);
            circle.setAttribute('data-r', size);
            circle.setAttribute('data-sequential', opt.sequential);
            circle.setAttribute('data-type', 'bubble');
            circle.setAttribute('data-x', conf.x);
            circle.setAttribute('data-y', conf.y);
            circle.setAttribute('data-z', conf.z);



            //
            // Set a shadow if requested
            //
            if (this.properties.bubbleShadow) {
                RGraph.SVG.setShadow({
                    object:  this,
                    offsetx: this.properties.bubbleShadowOffsetx,
                    offsety: this.properties.bubbleShadowOffsety,
                    blur:    this.properties.bubbleShadowBlur,
                    color:   this.properties.bubbleShadowColor,
                    id:      'bubble-chart-dropshadow'
                });
            
                circle.setAttribute('filter', 'url(#bubble-chart-dropshadow)');
            }

            this.coordsBubble[opt.datasetIdx][opt.index] = {
                x: opt.coordx,
                y: opt.coordy,
                z: size
            };


            return {
                x: opt.coordx,
                y: opt.coordy,
                z: size
            };
        };








        //
        // This functions draws a line if required
        //
        this.drawLine = function (opt)
        {
            var linewidth = 1,
                color     = 'black';



            // Calculate the linewidth
            if (typeof properties.lineLinewidth === 'object' && typeof properties.lineLinewidth[opt.index] === 'number') {
                linewidth = properties.lineLinewidth[opt.index];
            } else if (typeof properties.lineLinewidth === 'number') {
                linewidth = properties.lineLinewidth;
            } else {
                linewidth = 1;
            }






            // Determine the color
             if (!RGraph.SVG.isNullish(properties.lineColors) && properties.lineColors && properties.lineColors[opt.index]) {
                color = properties.lineColors[opt.index];
             } else if (!RGraph.SVG.isNullish(properties.colors) && properties.colors.length && typeof properties.colors[opt.index] === 'string') {
                color = properties.colors[opt.index];
            } else if (typeof properties.lineColors === 'string') {
                color = properties.lineColors;
            } else {
                color = 'black';
            }





            for (var i=0,path=''; i<this.coords2[opt.index].length; ++i) {
                path += '{1} {2} {3} '.format(
                    i === 0 ? 'M' : 'L',
                    this.coords2[opt.index][i].x,
                    this.coords2[opt.index][i].y
                );
            }

            RGraph.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: this.line_groups[opt.index],
                attr: {
                    d: path,
                    fill: 'transparent',
                    stroke: color,
                    'stroke-width': linewidth,
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                }
            });
        };








        //
        // This function can be used to retrieve the relevant X coordinate for a
        // particular value.
        // 
        // @param int value The value to get the X coordinate for
        //
        this.getXCoord = function (value)
        {
            var x;

            if (value > properties.xaxisScaleMax) {
                return null;
            }

            if (value < properties.xaxisScaleMin) {
                return null;
            }

            x  = ((value - properties.xaxisScaleMin) / (properties.xaxisScaleMax - properties.xaxisScaleMin));
            x *= (this.width - properties.marginLeft - properties.marginRight);

            x = properties.marginLeft + x;

            return x;
        };








        //
        // This function can be used to retrieve the relevant Y coordinate for a
        // particular value.
        // 
        // @param int value The value to get the Y coordinate for
        //
        this.getYCoord = function (value)
        {
            if (value > this.scale.max && properties.outofbounds === false) {
                return null;
            }

            var y, xaxispos = properties.xaxispos;

            if (value < this.scale.min && properties.outofbounds === false) {
                return null;
            }

            y  = ((value - this.scale.min) / (this.scale.max - this.scale.min));
            y *= (this.height - properties.marginTop - properties.marginBottom);

            y = this.height - properties.marginBottom - y;

            return y;
        };








        //
        // This function can be used to highlight a bar on the
        // chart
        //
        // TODO On bubble charts need to highlight the entire
        //      bubble.
        // 
        // @param object rect The rectangle to highlight
        //
        this.highlight = function (rect, opt = {})
        {
            // Get the center point and size of the rect
            // on the chart and then cover it with a
            // circle
            if (rect.toString().toLowerCase().indexOf('circle') > 0) {
                var cx     = rect.getAttribute('cx'),
                    cy     = rect.getAttribute('cy'),
                    radius = rect.getAttribute('r');

            } else {
                var cx      = parseFloat(rect.getAttribute('x')) + (parseFloat(rect.getAttribute('width')) / 2),
                    cy      = parseFloat(rect.getAttribute('y')) + (parseFloat(rect.getAttribute('height')) / 2),
                    radius  = parseFloat(rect.getAttribute('width')) + 1;

            }

            if (RGraph.SVG.isNumber(opt.width)) {
                radius = opt.width + 1;
            }

            var highlight = RGraph.SVG.create({
                svg: this.svg,
                type: 'circle',
                parent: this.svgAllGroup,
                attr: {
                    stroke: properties.highlightStroke,
                    fill:   properties.highlightFill,
                    cx: cx,
                    cy: cy,
                    r: radius,
                    'stroke-width': properties.highlightLinewidth
                },
                style: {
                    pointerEvents: 'none'
                }
            });


            // Store the highlight rect in the rebistry so
            // it can be cleared later
            RGraph.SVG.REG.set('highlight', highlight);
            
            
            
            
            //rect.setAttribute('stroke', properties.highlightStroke);
            //rect.setAttribute('stroke-width', properties.highlightLinewidth);
            //rect.setAttribute('fill', properties.highlightFill);

            // Store the highlight rect in the registry so
            // it can be reset later
            //RGraph.SVG.REG.set('highlight', rect);
        };








        //
        // Draws the labelsAbove
        //
        // @param opt An object that consists of various arguments to the function
        //
        this.drawLabelsAbove = function (opt)
        {
            var x      = opt.point.x,
                y      = opt.point.y,
                above  = opt.point.above,
                coordX = opt.coordX,
                coordY = opt.coordY;



            // Facilitate labelsAboveSpecific
            if (typeof above === 'string') {
                var str = above;
            } else {

                x = RGraph.SVG.numberFormat({
                    object:        this,
                    num:           x.toFixed(properties.labelsAboveXDecimals ),
                    prepend:       typeof properties.labelsAboveXUnitsPre  === 'string'   ? properties.labelsAboveXUnitsPre  : null,
                    append:        typeof properties.labelsAboveXUnitsPost === 'string'   ? properties.labelsAboveXUnitsPost : null,
                    point:         typeof properties.labelsAboveXPoint     === 'string'   ? properties.labelsAboveXPoint     : null,
                    thousand:      typeof properties.labelsAboveXThousand  === 'string'   ? properties.labelsAboveXThousand  : null,
                    formatter:     typeof properties.labelsAboveXFormatter === 'function' ? properties.labelsAboveXFormatter : null
                });

                y = RGraph.SVG.numberFormat({
                    object:        this,
                    num:           y.toFixed(properties.labelsAboveYDecimals ),
                    prepend:       typeof properties.labelsAboveYUnitsPre  === 'string'   ? properties.labelsAboveYUnitsPre  : null,
                    append:        typeof properties.labelsAboveYUnitsPost === 'string'   ? properties.labelsAboveYUnitsPost : null,
                    point:         typeof properties.labelsAboveYPoint     === 'string'   ? properties.labelsAboveYPoint     : null,
                    thousand:      typeof properties.labelsAboveYThousand  === 'string'   ? properties.labelsAboveYThousand  : null,
                    formatter:     typeof properties.labelsAboveYFormatter === 'function' ? properties.labelsAboveYFormatter : null
                });

                var str = '{1}{2}{3}'.format(
                    x,
                    properties.labelsAboveSeparator,
                    y
                );
            }

            // Get the text configuration
            var textConf = RGraph.SVG.getTextConf({
                object: this,
                prefix: 'labelsAbove'
            });

            // Add the text to the scene
            var text = RGraph.SVG.text({
                object:     this,
                parent:     this.svgAllGroup,
                tag:        'labels.above',
                text:       str,
                x:          parseFloat(coordX) + properties.labelsAboveOffsetx,
                y:          parseFloat(coordY) + properties.labelsAboveOffsety,
                halign:     properties.labelsAboveHalign,
                valign:     properties.labelsAboveValign,
                font:       textConf.font,
                size:       textConf.size,
                bold:       textConf.bold,
                italic:     textConf.italic,
                color:      textConf.color,
                background: properties.labelsAboveBackground        || null,
                padding:    properties.labelsAboveBackgroundPadding || 0
            });
            
            if (this.isTrace) {
                text.setAttribute(
                    'clip-path',
                    'url(#trace-effect-clip)'
                );
            }
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function () 
        {

// TODO Loop thru the data parsing the color for gradients too

            // Save the original colors so that they can be restored when
            // the canvas is cleared
            if (!Object.keys(this.originalColors).length) {
                this.originalColors = {
                    colors:              RGraph.SVG.arrayClone(properties.colors, true),
                    backgroundGridColor: RGraph.SVG.arrayClone(properties.backgroundGridColor, true),
                    highlightFill:       RGraph.SVG.arrayClone(properties.highlightFill, true),
                    backgroundColor:     RGraph.SVG.arrayClone(properties.backgroundColor, true)
                }
            }

            
            // colors
            var colors = properties.colors;

            // IMPORTANT: Bubble chart gradients are parse in the drawBubble()
            //            function below
            if (colors && !properties.bubble) {
                for (var i=0; i<colors.length; ++i) {
                    colors[i] = RGraph.SVG.parseColorLinear({
                        object: this,
                        color: colors[i]
                    });
                }
            }

            properties.backgroundGridColor = RGraph.SVG.parseColorLinear({object: this, color: properties.backgroundGridColor});
            properties.highlightFill       = RGraph.SVG.parseColorLinear({object: this, color: properties.highlightFill});
            properties.backgroundColor     = RGraph.SVG.parseColorLinear({object: this, color: properties.backgroundColor});
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
            RGraph.SVG.removeHighlight();
        };







        //
        // Draws a single errorbar
        //
        this.drawErrorbar = function (opt)
        {
            // Get the error bar value
            var max = RGraph.SVG.getErrorbarsMaxValue({
                object: this,
                index: opt.sequential
            });
        
        
            // Get the error bar value
            var min = RGraph.SVG.getErrorbarsMinValue({
                object: this,
                index: opt.sequential
            });
    
            if (!max && !min) {
                return;
            }
    
            var linewidth    = RGraph.SVG.getErrorbarsLinewidth({object: this,  index: opt.sequential}),
                color        = RGraph.SVG.getErrorbarsColor({object: this,      index: opt.sequential}),
                capwidth     = RGraph.SVG.getErrorbarsCapWidth({object: this,   index: opt.sequential}),
                halfCapWidth = capwidth / 2;
    
    
    
    
    

            if (max !== 0 || min !== 0) {

                var y1 = this.getYCoord(opt.valueY + max)
                    y2 = this.getYCoord(opt.valueY - min);

                // Draw the UPPER vertical line
                var errorbarLine = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'line',
                    parent: opt.parent,
                    attr: {
                        x1: opt.x,
                        y1: opt.y,
                        x2: opt.x,
                        y2: y1,
                        stroke: color,
                        'stroke-width': linewidth,
                        'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                    }
                });
        
        
                // Draw the cap to the UPPER line
                var errorbarCap = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'line',
                    parent: opt.parent,
                    attr: {
                        x1: opt.x - halfCapWidth,
                        y1: y1,
                        x2: opt.x + halfCapWidth,
                        y2: y1,
                        stroke: color,
                        'stroke-width': linewidth,
                        'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                    }
                });
            }
    
    
    
    
    
    
    
    
    
    
    
    
    

            // Draw the minimum errorbar if necessary
            if (typeof min === 'number') {
        
                var errorbarLine = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'line',
                    parent: opt.parent,
                    attr: {
                        x1: opt.x,
                        y1: opt.y,
                        x2: opt.x,
                        y2: y2,
                        stroke: color,
                        'stroke-width': linewidth,
                        'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                    }
                });
        
                // Draw the cap to the LOWER line
                var errorbarCap = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'line',
                    parent: opt.parent,
                    attr: {
                        x1: opt.x - halfCapWidth,
                        y1: y2,
                        x2: opt.x + halfCapWidth,
                        y2: y2,
                        stroke: color,
                        'stroke-width': linewidth,
                        'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                    }
                });
            }
        };








        //
        // A worker function that handles Bar chart specific tooltip substitutions
        //
        this.tooltipSubstitutions = function (opt)
        {
            var indexes = RGraph.SVG.sequentialIndexToGrouped(opt.index, this.data),
                dataset = indexes[0],
                index   = indexes[1];

            return {
                  index: index,
                dataset: dataset,
        sequentialIndex: opt.index,
                  value: this.data[dataset][index].y,
                 values: [this.data[dataset][index].y]
            };
        };








        //
        // A worker function that returns the correct color/label/value
        //
        // @param object specific The indexes that are applicable
        // @param number index    The appropriate index
        //
        this.tooltipsFormattedCustom = function (specific, index, colors)
        {
            var color = this.data[specific.dataset][specific.index].color
                            ? this.data[specific.dataset][specific.index].color
                            : properties.colorsDefault;
            if (properties.tooltipsFormattedKeyColors && properties.tooltipsFormattedKeyColors[specific.dataset]) {
                color = properties.tooltipsFormattedKeyColors[specific.dataset];
            }

            var label = properties.tooltipsFormattedKeyLabels[specific.dataset]
                            ? properties.tooltipsFormattedKeyLabels[specific.dataset]
                            : '';

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
                svgXY    = RGraph.SVG.getSVGXY(obj.svg),
                coords   = this.coords[args.index];

            // Position the tooltip in the X direction
            args.tooltip.style.left = (
                  svgXY[0]                       // The X coordinate of the SVG tag
                + coords.x                       // The X coordinate of the bar on the chart
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
            ) + 'px';

            args.tooltip.style.top  = (
                  svgXY[1]                       // The Y coordinate of the SVG tag
                + coords.y                       // The Y coordinate of the bar on the chart
                - tooltip.offsetHeight           // The height of the tooltip
                - 15                             // An arbitrary amount
            ) + 'px';
        };








        //
        // A trace effect
        //
        //  @param object    Options to give to the effect
        // @param  function  A function to call when the effect has completed
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
                svg: this.svg,
                parent: this.svg.defs,
                type: 'clipPath',
                attr: {
                    id: 'trace-effect-clip'
                }
            });

            var clippathrect = RGraph.SVG.create({
                svg: this.svg,
                parent: clippath,
                type: 'rect',
                attr: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: this.height
                }
            });
            


            var iterator = function ()
            {
                var width = (frame++) / frames * obj.width;

                clippathrect.setAttribute("width", width);

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
        // Draws a trendline on the Scatter chart. This is also known
        // as a "best-fit line"
        //
        // @param dataset The index of the dataset to use
        //
        this.drawTrendline = function  (dataset)
        {
            var colors    = properties.trendlineColors,
                linewidth = properties.trendlineLinewidth,
                margin    = properties.trendlineMargin;

            // Allow for trendlineColor as well (note  - no "s")
            if (RGraph.SVG.isString(properties.trendlineColor)) {
                colors = [properties.trendlineColor];
            }

            // handle the options being arrays
            if (typeof colors === 'object' && colors[dataset]) {
                color = colors[dataset];
            } else if (typeof color === 'object') {
                color = 'gray';
            }
            
            if (typeof linewidth === 'object' && typeof linewidth[dataset] === 'number') {
                linewidth = linewidth[dataset];
            } else if (typeof linewidth === 'object') {
                linewidth = 1;
            }
            
            if (typeof margin === 'object' && typeof margin[dataset] === 'number') {
                margin = margin[dataset];
            } else if (typeof margin === 'object'){
                margin = 25;
            } else {
                margin = 0;
            }
            

            // Step 1: Calculate the mean values of the X coords and the Y coords
            for (var i=0,totalX=0,totalY=0; i<this.data[dataset].length; ++i) {
                totalX += Number(this.data[dataset][i].x);
                totalY += Number(this.data[dataset][i].y);
            }
            
            var averageX = totalX / this.data[dataset].length;
            var averageY = totalY / this.data[dataset].length;

            // Step 2: Calculate the slope of the line
            
            // a: The X/Y values minus the average X/Y value
            for (var i=0,xCoordMinusAverageX=[],yCoordMinusAverageY=[],valuesMultiplied=[],xCoordMinusAverageSquared=[]; i<this.data[dataset].length; ++i) {
                xCoordMinusAverageX[i] = this.data[dataset][i].x - averageX;
                yCoordMinusAverageY[i] = this.data[dataset][i].y - averageY;
                
                // b. Multiply the averages
                valuesMultiplied[i] = xCoordMinusAverageX[i] * yCoordMinusAverageY[i];
                xCoordMinusAverageSquared[i] = xCoordMinusAverageX[i] * xCoordMinusAverageX[i];
            }

            var sumOfValuesMultiplied = RGraph.SVG.arraySum(valuesMultiplied);
            var sumOfXCoordMinusAverageSquared = RGraph.SVG.arraySum(xCoordMinusAverageSquared);

            // Calculate m (???)
            var m = sumOfValuesMultiplied / sumOfXCoordMinusAverageSquared;
            var b = averageY - (m * averageX);

            // y = mx + b
            
            var coords =  [
                [properties.xaxisScaleMin, m * properties.xaxisScaleMin + b],
                [properties.xaxisScaleMax, m * properties.xaxisScaleMax + b]
            ];

            //
            // Draw the line
            //
            
            // Set dotted, dash or a custom dash array
            var strokeDasharray = ''
            
            if (properties.trendlineDashed) {
                strokeDasharray = '4,4';
                
            }

            if (properties.trendlineDotted) {
                strokeDasharray = '1, 4';
            }
            
            if (!RGraph.SVG.isNullish(properties.trendlineDashArray) && typeof properties.trendlineDashArray === 'object') {
                strokeDasharray = String(properties.trendlineDashArray).replace(/[|]/, '');
            }


            // Clip the canvas again so that the line doesn't look overly long
            // (use the minimum an maximum points for this)
            for (var i=0,xValues=[],yValues=[]; i<this.data[dataset].length; ++i) {
                if (typeof this.data[dataset][i].x === 'number') {
                    xValues.push(this.data[dataset][i].x);
                }
            
                if (typeof this.data[dataset][i].y === 'number') {
                    yValues.push(this.data[dataset][i].y);
                }
            }

            // These are the minimum and maximum X/Y values for this dataset
            var x1 = RGraph.SVG.arrayMin(xValues);
            var y1 = RGraph.SVG.arrayMin(yValues);
            var x2 = RGraph.SVG.arrayMax(xValues);
            var y2 = RGraph.SVG.arrayMax(yValues);

            
            // Convert the X/Y values into coordinates on the canvas
            x1 = this.getXCoord(x1);
            y1 = this.getYCoord(y1, properties.outofbounds);
            x2 = this.getXCoord(x2);
            y2 = this.getYCoord(y2, properties.outofbounds);








            // Create the SVG clipPath region
            var clippath = RGraph.SVG.create({
                svg: this.svg,
                parent: this.svg.defs,
                type: 'clipPath',
                attr: {
                    id: 'trendline-clippath-dataset-' + dataset
                }
            });

            
            RGraph.SVG.create({
                svg: this.svg,
                parent: clippath,
                type: 'rect',
                attr: {
                    x: properties.trendlineClipping === false ? properties.marginLeft : x1 - margin,
                    y: properties.trendlineClipping === false ? properties.marginTop : y2 - margin,
                    width: properties.trendlineClipping === false ?
                               (this.width - properties.marginLeft - properties.marginRight) :
                               x2 - x1 + margin + margin,
                    height: properties.trendlineClipping === false ?
                                this.height  - properties.marginTop - properties.marginBottom:
                                y1 - y2 + margin + margin
                }
            });






            //
            // The coordinates for the trendline
            //
            var x1 = this.getXCoord(coords[0][0]);
            var y1 = this.getYCoord(coords[0][1]);
            var x2 = this.getXCoord(coords[1][0]);
            var y2 = this.getYCoord(coords[1][1]);

            var line = RGraph.SVG.create({
                svg: this.svg,
                parent: this.svgAllGroup,
                type: 'path',
                attr: {
                    d: 'M{1} {2} L{3} {4}'.format(x1,y1,x2,y2),
                    stroke: color,
                    fill:'none',
                    'stroke-width':  linewidth,
                    'stroke-dasharray': strokeDasharray,
                    'stroke-linecap': 'round',
                    
                    // Makes trendline clipping redundant in favour
                    // of the trace effect
                    //'clip-path': 'url(#trendline-clippath-dataset-' + dataset + ')'
                    //
                    'clip-path': 'url(#trace-effect-clip)'
                }
            });
            
            // Store the coordinates
            this.coordsTrendline[dataset] = [
                [x1, y1],
                [x2, y2]
            ];
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

            var width  = this.width,
                y1     = this.getYCoord(from),
                y2     = this.getYCoord(to),
                height = Math.abs(y2 - y1),
                x      = 0,
                y      = Math.min(y1, y2);


            // Increase the height if the maximum value is "max"
            if (RegExp.$2 === 'max') {
                y = 0;
                height += this.properties.marginTop;
            }
        
            // Increase the height if the minimum value is "min"
            if (RegExp.$1 === 'min') {
                height += this.properties.marginBottom;
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








        return this;
    };








    //
    // This is a "wrapper" function that creaters a dual-color
    // trendline Line chart for you. Options to give to
    // the frunction are (the sole argument is an object):
    //
    //   id:            The id of the canvas tag
    //   data:          The data for the chart
    //   options:       The chart options that get applied to
    //                  both Line charts (the one above
    //                  and also the one below the trendline.)
    //   optionsTop:    With this option you can specify
    //                  configuration values that are specific to
    //                  the top chart (eg color)
    //   optionsBottom: With this option you can specify
    //                  configuration values that are specific to
    //                  the bottom chart (eg color)
    //
    RGraph.SVG.Scatter.dualColorTrendline = function (args)
    {
        // Check that a trendline is enabled
        if(!args.options.trendline) {
            alert('[ALERT] A trendline is not enabled in your charts configuration');
            return;
        }

        //
        // Draw the red part of the Scatter chart (the bottom
        // half)
        //
        var obj1 = new RGraph.SVG.Scatter({
            id: args.id,
            data: RGraph.SVG.arrayClone(args.data, true),
            options: RGraph.SVG.arrayClone(args.options, true)
        }).draw();
        
        
        
        // The coordinates of the first (and only) trendline
        var coords = obj1.coordsTrendline[0];



        //
        // Calculate the coordinates for the top part of the chart
        // (above the trendline)
        //
        var coords_top = [
            [0,coords[0][1]],
            ...coords,
            [obj1.width,coords[1][1]],
            [obj1.width, 0],
            [0,0]
        ];


        //
        // Calculate the coordinates for the bottom part of the chart
        // (below the trendline)
        //
        var coords_bottom = [
            [0,coords[0][1]],
            ...coords,
            [obj1.width,coords[1][1]],
            [obj1.width, obj1.height],
            [0,obj1.height]
        ];

        //
        // Now that we have the coordinates, clipping can be
        // installed on the chart that's already been drawn
        // (the top part of the chart).
        //
        obj1.set('clip', coords_top);
        
        // Set any options that have been specified that are
        // specific to the top Scatter chart
        if (RGraph.SVG.isObject(args.optionsTop)) {
            for (i in args.optionsTop) {
                if (RGraph.SVG.isString(i)) {
                    obj1.set(i, args.optionsTop[i]);
                }
            }
        }



        //
        // Create a new chart that's clipped to the bottom part
        // coordinates.
        //
        var obj2 = new RGraph.SVG.Scatter({
            id: args.id,
            data: RGraph.SVG.arrayClone(args.data, true),
            options: {
                ...RGraph.SVG.arrayClone(args.options, true),
                clip: coords_bottom // Clip to the part of the canvas
                                    // that's below the trendline
            }
        });

        // Set any options that have been specified that are
        // specific to the bottom Scatter chart
        if (RGraph.SVG.isObject(args.optionsBottom)) {
            for (i in args.optionsBottom) {
                if (RGraph.SVG.isString(i)) {
                    obj2.set(i, args.optionsBottom[i]);
                }
            }
        }

        //
        // Now draw both of the charts using the RGraph.redraw
        // API function or the requested animation effect
        if (    RGraph.SVG.isString(args.animationEffect)
            && obj1[args.animationEffect]
            && obj1[args.animationEffect]
           ) {

            RGraph.SVG.clear(obj1.svg);
           
            var effect         = args.animationEffect;
            var effectOptions  = args.animationEffectOptions ? args.animationEffectOptions : {};
                effectOptions.callback = function ()
                {
                    RGraph.SVG.runOnce('rgraph-svg-scatter-dual-color-effect-callback', function ()
                    {
                        args.animationEffectCallback ? args.animationEffectCallback() : function () {};
                    });
                }

            obj1[effect](effectOptions);
            obj2[effect](effectOptions);
        } else {
            RGraph.SVG.redraw();
        }
        
        return [obj1, obj2];
    };
    
    
    
    
    
    
    
    
    
    

// End module pattern
})(window, document);