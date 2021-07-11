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

    RGraph     = window.RGraph || {isrgraph:true,isRGraph:true,rgraph:true};
    RGraph.SVG = RGraph.SVG || {};

// Module pattern
(function (win, doc, undefined)
{
    RGraph.SVG.Funnel = function (conf)
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
                    this.originalColors = RGraph.SVG.arrayClone(value);
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
            return this.properties[name];
        };











        // Convert strings to numbers
        conf.data = RGraph.SVG.stringsToNumbers(conf.data);
        //if (typeof conf.data === 'string') {
        //    conf.data = conf.data.split(/,|\|/);
        //}

        //for (var i=0; i<conf.data.length; ++i) {
        //    if (typeof conf.data[i] === 'string') {
        //        conf.data[i] = parseFloat(conf.data[i]);
        //    }
        //}












        this.id              = conf.id;
        this.uid             = RGraph.SVG.createUID();
        this.container       = document.getElementById(this.id);
        this.layers          = {}; // MUST be before the SVG element is created!
        this.svg             = RGraph.SVG.createSVG({object: this,container: this.container});
        this.isRGraph        = true;
        this.isrgraph        = true;
        this.rgraph          = true;
        this.width           = Number(this.svg.getAttribute('width'));
        this.height          = Number(this.svg.getAttribute('height'));
        this.data            = RGraph.SVG.arrayClone(conf.data);
        this.originalData    = RGraph.SVG.arrayClone(conf.data);
        this.type            = 'funnel';
        this.coords          = [];
        this.colorsParsed    = false;
        this.originalColors  = {};
        this.gradientCounter = 1;
        this.nodes           = [];
        this.shadowNodes     = [];
        this.max             = 0;
        this.redraw          = false;
        this.highlight_node  = null;






        // Add this object to the ObjectRegistry
        RGraph.SVG.OR.add(this);
        
        // Set the DIV container to be inline-block
        this.container.style.display = 'inline-block';
        
        // Determine the maximum value by going thru the data
        var obj = this;
        this.data.forEach(function (val, key, arr)
        {
            obj.max = Math.max(obj.max, val);
        });






        this.properties =
        {
            marginLeft:    35,
            marginRight:   35,
            marginTop:     35,
            marginBottom:  35,
            
            backgroundBars: false,
            backgroundBarsOpacity: 0.25,
            backgroundBarsColors: null,

            colorsStroke: 'white',
            colors: ['red', 'black', 'orange', 'green', '#6ff', '#ccc', 'pink', 'orange', 'cyan', 'maroon', 'olive', 'teal'],
            
            textColor:  'black',
            textFont:   'Arial, Verdana, sans-serif',
            textSize:   12,
            textBold:   false,
            textItalic: false,

            labels:       [],
            labelsFont:   null,
            labelsSize:   null,
            labelsColor:  null,
            labelsBold:   null,
            labelsItalic: null,
            labelsBackground: null,
            labelsHalign: 'center',
            labelsPosition: 'section', // This can be section or edge

            linewidth: 1,
            
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
            tooltipsPositionStatic:          true,

            highlightStroke: 'rgba(0,0,0,0)',
            // Lighter than usual because the backgroundBars option can
            // mean highlight segments fade into the background
            highlightStroke: 'rgba(0,0,0,0)',
            highlightFill: 'rgba(255,255,255,0.7)',
            highlightLinewidth: 1,
            
            title: '',
            titleX:      null,
            titleY:      null,
            titleHalign: 'center',
            titleValign: null,
            titleSize:   null,
            titleColor:  null,
            titleFont:   null,
            titleBold:   null,
            titleItalic: null,
            
            titleSubtitle: null,
            titleSubtitleSize:   null,
            titleSubtitleColor:  '#aaa',
            titleSubtitleFont:   null,
            titleSubtitleBold:   null,
            titleSubtitleItalic: null,

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
            keyLabelsItalic:  null
        };




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









            // Should the first thing that's done inthe.draw() function
            // except for the onbeforedraw event
            this.width  = Number(this.svg.getAttribute('width'));
            this.height = Number(this.svg.getAttribute('height'));












            // Reset the data back to the original values
            this.data = RGraph.SVG.arrayClone(this.originalData);



            // Reset the coords array to stop it growing
            this.coords = [];





            // Create the defs tag if necessary
            RGraph.SVG.createDefs(this);



            this.graphWidth  = this.width - properties.marginLeft - properties.marginRight;
            this.graphHeight = this.height - properties.marginTop - properties.marginBottom;

            //
            // Add the data to the .originalData array and work out the max value
            // 
            // 2/5/14 Now also use this loop to ensure that the data pieces
            //        are numbers
            //

            // Convert strings to numbers
            for (var i=0,len=this.data.length; i<len; ++i) {
                if (typeof this.data[i] === 'string') {
                    this.data[i] = RGraph.SVG.stringsToNumbers(this.data[i]);
                }
            }












            // Parse the colors for gradients
            RGraph.SVG.resetColorsToOriginalValues({object:this});
            this.parseColors();


            

            // Draw the chart
            this.drawFunnel();
            
            
            
            // Draw the background bars
            this.drawBackgroundBars();






            // Draw the labels
            this.drawLabels();



            // Draw the title and subtitle
            RGraph.SVG.drawTitle(this);






            // Draw the key
            if (typeof properties.key !== null && RGraph.SVG.drawKey) {
                RGraph.SVG.drawKey(this);
            } else if (!RGraph.SVG.isNull(properties.key)) {
                alert('The drawKey() function does not exist - have you forgotten to include the key library?');
            }



            // Create the shadow definition if needed
            //if (properties.shadow) {
            //    RGraph.SVG.setShadow({
            //        object:  this,
            //        offsetx: properties.shadowOffsetx,
            //        offsety: properties.shadowOffsety,
            //        blur:    properties.shadowBlur,
            //        opacity: properties.shadowOpacity,
            //        id:      'dropShadow'
            //    });
            //}



            // Add the event listener that clears the highlight if
            // there is any. Must be MOUSEDOWN (ie before the click event)
            var obj = this;
            document.body.addEventListener('mousedown', function (e)
            {
                obj.hideHighlight(obj);
            }, false);



            // Fire the draw event
            RGraph.SVG.fireCustomEvent(this, 'ondraw');



            return this;
        };








        //
        // Draws the radar.
        //
        //@param opt object Options for the function (if any)
        //
        this.drawFunnel = function (opt)
        {
            // This is the center of the Funnel ONLY - not the whole chart
            var centerx = properties.marginLeft + (this.graphWidth / 2);

            // This first loop calculates the coordinates only - it DOES NOT
            // draw the Funnel on to the scene
            for (var i=0; i<(this.data.length - 1); ++i) {

                var value      = this.data[i],
                    nextValue  = this.data[i+1],
                    maxWidth   = this.graphWidth,
                    width      = (value / this.max) * this.graphWidth,
                    height     = this.graphHeight / (this.data.length - 1), // The heights are equal
                    nextWidth  = (nextValue / this.max) * this.graphWidth,
                    nextHeight = height;

                // The coordinates
                var x1 = centerx - (width / 2),
                    y1 = properties.marginTop + (height * i),
                    x2 = centerx + (width / 2),
                    y2 = properties.marginTop + (height * i);
                    x3 = centerx + (nextWidth / 2),
                    y3 = properties.marginTop + (height * (i+1)),
                    x4 = centerx - (nextWidth / 2),
                    y4 = properties.marginTop + (height * (i+1));

                // Store the coords
                this.coords.push({
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    x3: x3,
                    y3: y3,
                    x4: x4,
                    y4: y4,
                    widthTop: x2 - x1,
                    widthBottom: x3 - x4,
                    height: y3 - y2,
                    object: this
                    
                });
            }




            // Now go thru the coods and draw the shapes
            for (var i=0,len=this.coords.length,sequentialIndex=0; i<len; ++i,++sequentialIndex) {

                if (i < len) {
                    var coords = this.coords[i];
    
                    var path = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: this.svg.all,
                        attr: {
                            d: 'M {1} {2} L {3} {4} L {5} {6} L {7} {8} z'.format(
                                coords.x1,
                                coords.y1,
                                coords.x2,
                                coords.y2,
                                coords.x3,
                                coords.y3,
                                coords.x4,
                                coords.y4
                            ),
                            stroke: properties.colorsStroke,
                            fill: properties.colors[i],
                            'stroke-width': properties.linewidth,
                            'data-value': this.data[i],
                            'data-index': i
                        }
                    });





                    // Store a reference to the SVG path object just created
                    coords.element = path;












                    // Install tooltips event listener

                    // Add the tooltip data- attribute
                    if (!RGraph.SVG.isNull(properties.tooltips) && (properties.tooltips[i] || typeof properties.tooltips === 'string') ) {

                        var obj = this;

                        //
                        // Add tooltip event listeners
                        //
                        (function (idx, seq)
                        {
                            path.addEventListener(properties.tooltipsEvent.replace(/^on/, ''), function (e)
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

                            path.addEventListener('mousemove', function (e)
                            {
                                e.target.style.cursor = 'pointer'
                            }, false);
                        })(i, sequentialIndex);

                    } // end if
                } // end if
            } // end for
        };








        //
        // Redraws the chart if required
        //
        this.redrawFunnel = function ()
        {
        };
        
        //
        // Draws the background bars. This is called AFTER the .draw() function
        // and manages to draw the background bars behind the funnel by utilising
        // the background layers (or one of them at least)
        //
        this.drawBackgroundBars = function ()
        {
            if (properties.backgroundBars) {

                for (var i=0; i<this.coords.length; ++i) {

                    var coords = this.coords[i];

                    RGraph.SVG.create({
                        svg: this.svg,
                        type: 'rect',
                        parent: this.layers.background1,
                        attr: {
                            x: 0,
                            y: coords.y1,
                            width: this.width,
                            height: coords.y3 - coords.y2,
                            fill: properties.backgroundBarsColors && typeof properties.backgroundBarsColors === 'object' && typeof properties.backgroundBarsColors[i] === 'string' ? properties.backgroundBarsColors[i] : properties.colors[i],
                            'fill-opacity': properties.backgroundBarsOpacity
                        }
                    });
                }
            }
        };








        //
        // Draw the labels
        //
        this.drawLabels = function ()
        {
            // Create the group that the labels are added to
            var labelsGroup = RGraph.SVG.create({
                svg: this.svg,
                parent: this.svg.all,
                type: 'g'
            });
            
            // Get the text configuration for the labels
            var textConf = RGraph.SVG.getTextConf({
                object: this,
                prefix: 'labels'
            });
            
            // Determine the alignment
            if (properties.labelsHalign === 'left') {
                var x      = 15;
                var halign = 'left';
            
            } else if (properties.labelsHalign === 'right') {
                var x      = this.width - 15;
                var halign = 'right';
            
            } else {
                var x      = this.width / 2;
                var halign = 'center';
            }


            if (properties.labels && properties.labels.length) {
                if (properties.labelsPosition === 'section') {
                    
                    var sectionHeight = this.graphHeight / properties.labels.length;
                    
                    for (var i=0; i<properties.labels.length; ++i) {

                        RGraph.SVG.text({
                            
                            object:     this,
                            svg:        this.svg,
                            parent:     labelsGroup,
                            tag:        'labels',
                            
                            text:       typeof properties.labels[i] === 'string' || properties.labels[i] === 'number' ? properties.labels[i].toString() : '',
                            
                            x:          x,
                            y:          properties.marginTop + (sectionHeight / 2) + (i * sectionHeight),
                            
                            halign:     halign,
                            valign:     'center',
                            
                            background: properties.labelsBackground || 'rgba(255,255,255,0.5)',
                            padding:    2,
                            
                            color:      textConf.color,
                            size:       textConf.size,
                            bold:       textConf.bold,
                            italic:     textConf.italic,
                            font:       textConf.font
                        });
                    }

                // edge Positioning
                } else {

                    for (var i=0; i<properties.labels.length; ++i) {
                        RGraph.SVG.text({
                            
                            object:     this,
                            svg:        this.svg,
                            parent:     labelsGroup,
                            tag:        'labels',
                            
                            text:       typeof properties.labels[i] === 'string' || properties.labels[i] === 'number' ? properties.labels[i].toString() : '',
                            
                            x:          x,
                            y:          properties.marginTop + ((this.graphHeight / (properties.labels.length - 1) ) * i),
                            
                            halign:     halign,
                            valign:     'center',
                            
                            background: properties.labelsBackground || 'rgba(255,255,255,0.5)',
                            padding:    2,
                            
                            size:       textConf.size,
                            bold:       textConf.bold,
                            italic:     textConf.italic,
                            color:      textConf.color,
                            font:       textConf.font
                        });
                    }
                }
            }
        };








        //
        // This function can be used to highlight a segment on the chart
        // 
        // @param object circle The circle to highlight
        //
        this.highlight = function (path)
        {
            var path = path.getAttribute('d');

            var highlight = RGraph.SVG.create({
                svg: this.svg,
                parent: this.svg.all,
                type: 'path',
                attr: {
                    d: path,
                    fill: properties.highlightFill,
                    stroke: properties.highlightStroke,
                    'stroke-width': properties.highlightLinewidth
                },
                style: {
                    pointerEvents: 'none'
                }
            });


            if (properties.tooltipsEvent === 'mousemove') {
                highlight.addEventListener('mouseout', function (e)
                {
                    highlight.parentNode.removeChild(highlight);
                    RGraph.SVG.hideTooltip();

                    RGraph.SVG.REG.set('highlight', null);
                }, false);
            }


            // Store the highlight rect in the registry so
            // it can be cleared later
            RGraph.SVG.REG.set('highlight', highlight);

        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function () 
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (!Object.keys(this.originalColors).length) {
                this.originalColors = {
                    colors:               RGraph.SVG.arrayClone(properties.colors),
                    highlightFill:        RGraph.SVG.arrayClone(properties.highlightFill),
                    backgroundBarsColors: RGraph.SVG.arrayClone(properties.backgroundBarsColors)
                }
            }
            
            
            // colors
            var colors = properties.colors;

            if (colors) {
                for (var i=0; i<colors.length; ++i) {
                    colors[i] = RGraph.SVG.parseColorLinear({
                        object: this,
                        color: colors[i],
                        direction:'horizontal'
                    });
                }
            }
            
            // backgroundBarsColors
            if (properties.backgroundBarsColors && properties.backgroundBarsColors.length) {
                for (var i=0; i<properties.backgroundBarsColors.length; ++i) {
                    properties.backgroundBarsColors[i] = RGraph.SVG.parseColorLinear({
                        object: this,
                        color: properties.backgroundBarsColors[i],
                        direction:'horizontal'
                    });
                }
            }
            
            // Highlight fill
            properties.highlightFill = RGraph.SVG.parseColorLinear({
                object: this,
                color: properties.highlightFill
            });
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
        // Removes the tooltip highlight from the chart
        //
        this.removeHighlight =
        this.hideHighlight   = function ()
        {

            var highlight = RGraph.SVG.REG.get('highlight');

            if (highlight) {
                highlight.setAttribute('fill','transparent');
                highlight.setAttribute('stroke','transparent');
                
                RGraph.SVG.REG.set('highlight', null);
            }
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
                  value: this.data[opt.index],
                 values: [this.data[opt.index]]
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
            var color = colors[specific.index];
            var label = ( (typeof properties.tooltipsFormattedKeyLabels === 'object' && typeof properties.tooltipsFormattedKeyLabels[specific.index] === 'string') ? properties.tooltipsFormattedKeyLabels[specific.index] : '');

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
                  svgXY[0]                       // The X coordinate of the canvas
                + coords.x1                      // The first X coordinate of the segment on the chart
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
                + ((coords.x2 - coords.x1) / 2)
            ) + 'px';

            args.tooltip.style.top  = (
                  svgXY[1]                       // The Y coordinate of the canvas
                + coords.y1                      // The Y coordinate of the bar on the chart
                - tooltip.offsetHeight           // The height of the tooltip
                - 10                             // An arbitrary amount
            ) + 'px';
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