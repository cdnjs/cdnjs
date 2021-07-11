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
    RGraph.SVG.Radar = function (conf)
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








        this.id              = conf.id;
        this.uid             = RGraph.SVG.createUID();
        this.container       = document.getElementById(this.id);
        this.layers          = {}; // MUST be before the SVG tag is created!
        this.svg             = RGraph.SVG.createSVG({object: this,container: this.container});
        this.isRGraph        = true;
        this.isrgraph        = true;
        this.rgraph          = true;
        this.width           = Number(this.svg.getAttribute('width'));
        this.height          = Number(this.svg.getAttribute('height'));
        this.data            = RGraph.SVG.arrayClone(conf.data);
        this.originalData    = RGraph.SVG.arrayClone(conf.data);
        this.type            = 'radar';
        this.coords          = [];
        this.coords2         = [];
        this.angles          = [];
        this.angles2         = [];
        this.colorsParsed    = false;
        this.originalColors  = {};
        this.gradientCounter = 1;
        this.nodes           = [];
        this.shadowNodes     = [];
        this.max             = 0;
        this.redraw          = false;
        this.highlight_node  = null;

        // Convert the data to numbers in case they're passed in as strings
        this.originalData = RGraph.SVG.stringsToNumbers(this.originalData);

        //The originalData array should be a multi-dimensional array of each dataset, even if
        // there's only one dataset
        if (typeof this.originalData[0] === 'number') {
            this.originalData = [this.originalData];
        }







        // Add this object to the ObjectRegistry
        RGraph.SVG.OR.add(this);
        
        // Set the DIV container to be inline-block
        this.container.style.display = 'inline-block';





        this.properties =
        {
            centerx: null,
            centery: null,
            radius:  null,
            
            marginLeft:    35,
            marginRight:   35,
            marginTop:     35,
            marginBottom:  35,
            
            backgroundGrid: true,
            backgroundGridColor:            '#ddd',
            backgroundGridRadialsCount:     null,
            backgroundGridConcentricsCount: 5,
            backgroundGridLinewidth:        1,
            backgroundGridPoly:             true,

            colors: [
                'red', 'black', 'orange', 'green', '#6ff', '#ccc',
                'pink', 'orange', 'cyan', 'maroon', 'olive', 'teal'
            ],
            filled: false,
            filledOpacity: 0.25,
            filledAccumulative: true,
            
            textColor:  'black',
            textFont:   'Arial, Verdana, sans-serif',
            textSize:   12,
            textBold:   false,
            textItalic: false,

            labels: [],
            labelsFont:   null,
            labelsColor:  null,
            labelsSize:   null,
            labelsBold:   null,
            labelsItalic: null,
            labelsOffset: 0,

            scaleVisible:     true,
            scaleUnitsPre:    '',
            scaleUnitsPost:   '',
            scaleMax:         null,
            scaleMin:         0,
            scalePoint:       '.',
            scaleThousand:    ',',
            scaleRound:       false,
            scaleDecimals:    0,
            scaleFormatter:   null,
            scaleBold:        null,
            scaleItalic:      null,
            scaleColor:       null,
            scaleSize:        null,
            scaleFont:        null,
            scaleLabelsCount: 5,

            linewidth: 1,
            
            tooltips:                        null,
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
            tooltipsPositionStatic:          true,

            highlightStroke: 'rgba(0,0,0,0)',
            highlightFill: 'rgba(255,255,255,0.7)',
            highlightLinewidth: 1,
            
            tickmarksStyle: 'circle',
            tickmarksLinewidth: 1,
            tickmarksSize: 6,
            tickmarksFill: 'white',
            
            title: '',
            titleX: null,
            titleY: null,
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
            
            shadow: false,
            shadowOffsetx: 2,
            shadowOffsety: 2,
            shadowBlur: 2,
            shadowOpacity: 0.25,



            key:            null,
            keyColors:      null,
            keyOffsetx:     0,
            keyOffsety:     0,
            keyLabelsOffsetx: 0,
            keyLabelsOffsety: -1,
            keyLabelsSize:    null,
            keyLabelsBold:    null,
            keyLabelsItalic:  null,
            keyLabelsFont:  null,
            keyLabelsColor:  null
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

            //
            // The datasets have to have the same number of elements
            //
            if (this.data.length > 1) {

                var len = this.data[0].length;

                for (var i=1; i<this.data.length; ++i) {
                    if (this.data[i].length !== len) {
                        alert('[ERROR] The Radar chart datasets must have the same number of elements!');
                    }
                }
            }



            // Reset the coords array to stop them growing
            this.angles  = [];
            this.angles2 = [];
            this.coords  = [];
            this.coords2 = [];





            // Create the defs tag if necessary
            RGraph.SVG.createDefs(this);




            this.graphWidth  = this.width - properties.marginLeft - properties.marginRight;
            this.graphHeight = this.height - properties.marginTop - properties.marginBottom;



            // Work out the center point
            this.centerx = (this.graphWidth / 2) + properties.marginLeft;
            this.centery = (this.graphHeight / 2) + properties.marginTop;
            this.radius  = Math.min(this.graphWidth, this.graphHeight) / 2;



            // Allow the user to override the calculated centerx/y/radius
            this.centerx = typeof properties.centerx === 'number' ? properties.centerx : this.centerx;
            this.centery = typeof properties.centery === 'number' ? properties.centery : this.centery;
            this.radius  = typeof properties.radius  === 'number' ? properties.radius  : this.radius;
            
            //
            // Allow the centerx/centery/radius to be a plus/minus
            //
            if (typeof properties.radius  === 'string' && properties.radius.match(/^\+|-\d+$/) )  this.radius  += parseFloat(properties.radius);
            if (typeof properties.centerx === 'string' && properties.centerx.match(/^\+|-\d+$/) ) this.centery += parseFloat(properties.centerx);
            if (typeof properties.centery === 'string' && properties.centery.match(/^\+|-\d+$/) ) this.centerx += parseFloat(properties.centery);





            //
            // Add the data to the .originalData array and work out the max value
            // 
            // 2/5/14 Now also use this loop to ensure that the data pieces
            //        are numbers
            //
            if (RGraph.SVG.isArray(this.data) && (typeof this.data[0] === 'number' || typeof this.data[0] === 'string')) {
                this.data = [this.data];
            }

            // Convert strings to numbers
            for (var i=0; i<this.data.length; ++i) {
            
                for (var j=0; j<this.data[i].length; ++j) {
            
                    if (typeof this.data[i][j] === 'string') {
                        this.data[i][j] = RGraph.SVG.stringsToNumbers(this.data[i][j]);
                    }
                }
            }






            // Modify the datasets to represent the stacked data
            // (if its stacked)
            if (properties.filled && properties.filledAccumulative) {
                for (var dataset=1; dataset<this.data.length; ++dataset) {
                    for (var i=0; i<this.data[dataset].length; ++i) {
                        this.data[dataset][i] += this.data[dataset - 1][i];
                    }
                }
            }





            // Get the max value
            this.getMaxValue();







            // Parse the colors for gradients
            RGraph.SVG.resetColorsToOriginalValues({object:this});
            this.parseColors();

            //
            // Get the scale
            //

            this.scale = RGraph.SVG.getScale({
                object:    this,
                numlabels: typeof properties.scaleLabelsCount === 'number' ? properties.scaleLabelsCount : properties.backgroundGridConcentricCount,
                unitsPre:  properties.scaleUnitsPre,
                unitsPost: properties.scaleUnitsPost,
                max:       typeof properties.scaleMax === 'number' ? properties.scaleMax : this.max,
                min:       properties.scaleMin,
                point:     properties.scalePoint,
                round:     properties.scaleRound,
                thousand:  properties.scaleThousand,
                decimals:  properties.scaleDecimals,
                strict:    typeof properties.scaleMax === 'number',
                formatter: properties.scaleFormatter
            });

            this.max = this.scale.max;

            
            
            // Draw the background 'grid'
            this.drawBackground();

            

            // Draw the chart
            this.drawRadar();



            // Draw the tickmarks for the chart
            this.drawTickmarks();



            // Draw the labels
            this.drawLabels();



            // Draw the title and subtitle
            RGraph.SVG.drawTitle(this);



            // Add the tooltip hotspots
            this.addTooltipHotspots();






            // Draw the key
            if (typeof properties.key !== null && RGraph.SVG.drawKey) {
                RGraph.SVG.drawKey(this);
            } else if (!RGraph.SVG.isNull(properties.key)) {
                alert('The drawKey() function does not exist - have you forgotten to include the key library?');
            }



            
            
            // Add the attribution link. If you're adding this elsewhere on your page/site
            // and you don't want it displayed then there are options available to not
            // show it.
            RGraph.SVG.attribution(this);

            // Create the shadow definition if needed
            if (properties.shadow) {
                RGraph.SVG.setShadow({
                    object:  this,
                    offsetx: properties.shadowOffsetx,
                    offsety: properties.shadowOffsety,
                    blur:    properties.shadowBlur,
                    opacity: properties.shadowOpacity,
                    id:      'dropShadow'
                });
            }



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
        // Draw the background grid
        //
        this.drawBackground = function ()
        {
            if (properties.backgroundGrid) {
            
                // Create the background grid group tag
                var grid = RGraph.SVG.create({
                    svg: this.svg,
                    parent: this.svg.all,
                    type: 'g',
                    attr: {
                        className: 'rgraph_radar_grid',
                        fill: 'rgba(0,0,0,0)',
                        stroke: properties.backgroundGridColor
                    }
                });
            
                // Draw the concentric "rings" grid lines that are
                // arranged around the centerx/centery along with
                // the radials that eminate from the center outwards

                var origin      = 0 - (RGraph.SVG.TRIG.PI / 2),
                    radials     = (typeof properties.backgroundGridRadialsCount === 'number' ? properties.backgroundGridRadialsCount :  this.data[0].length),
                    concentrics = properties.backgroundGridConcentricsCount,
                    step        = RGraph.SVG.TRIG.TWOPI / radials;





                // First draw the radial lines that emanate from the
                // center outwards
                if (radials > 0) {

                    for (var i=0,len=radials; i<len; ++i) {
    
                        var coords = RGraph.SVG.TRIG.toCartesian({
                            cx: this.centerx,
                            cy: this.centery,
                            r: this.radius,
                            angle: origin + (i * step)
                        });
    
                        var str = 'M {1} {2} L {3} {4}'.format(
                            this.centerx,
                            this.centery,
                            coords.x,
                            coords.y
                        );
    
                        RGraph.SVG.create({
                            svg: this.svg,
                            type: 'path',
                            parent: grid,
                            attr: {
                                d: str,
                                stroke: properties.backgroundGridColor,
                                'stroke-width': properties.backgroundGridLinewidth
                            }
                        });
                    }
                }





                // Draw the concentrics
                if (concentrics > 0) {

                    if (properties.backgroundGridPoly) {
                        for (var j=1; j<=concentrics; j++) {
                            for (var i=0,len=radials,path=[]; i<len; ++i) {
        
                                var coords = RGraph.SVG.TRIG.toCartesian({
                                    cx: this.centerx,
                                    cy: this.centery,
                                    r: this.radius * (j/concentrics),
                                    angle: origin + (i * step)
                                });
            
                                path.push('{1} {2} {3}'.format(
                                    i === 0 ? 'M' : 'L',
                                    coords.x,
                                    coords.y
                                ));
        
                            }
            
                            // Now add the path to the scene
                            RGraph.SVG.create({
                                svg: this.svg,
                                type: 'path',
                                parent: grid,
                                attr: {
                                    d: path.join(' ') + ' z',
                                    fill: 'transparent',
                                    stroke: properties.backgroundGridColor,
                                    'stroke-width': properties.backgroundGridLinewidth
                                }
                            });
                        }





                    // Draw the background "grid" as concentric circles
                    } else {






                        for (var j=1; j<=concentrics; j++) {

                            // Add circle to the scene
                            RGraph.SVG.create({
                                svg: this.svg,
                                type: 'circle',
                                parent: grid,
                                attr: {
                                    cx: this.centerx,
                                    cy: this.centery,
                                    r: this.radius * (j/concentrics),
                                    fill: 'transparent',
                                    stroke: properties.backgroundGridColor,
                                    'stroke-width': properties.backgroundGridLinewidth
                                }
                            });
                        }
                    }
                }
            }
        };








        //
        // Draws the radar
        //
        this.drawRadar = function (opt)
        {
            for (var dataset=0,len=this.data.length; dataset<len; ++dataset) {
            
                // Ensure these exist
                this.coords2[dataset] = [];
                this.angles2[dataset] = [];
            
                // Initialise the path
                var path = [];
            
                for (var i=0,len2=this.data[dataset].length; i<len2; ++i) {
                
                    var value = this.data[dataset][i];

                    var xy = RGraph.SVG.TRIG.toCartesian({
                        cx: this.centerx,
                        cy: this.centery,
                        r: this.getRadius(this.data[dataset][i]),
                        angle: (RGraph.SVG.TRIG.TWOPI / len2) * i - RGraph.SVG.TRIG.HALFPI
                    });

                    xy.r     = (( (value - properties.scaleMin) / (this.max - properties.scaleMin) ) ) * this.radius;
                    xy.angle = (RGraph.SVG.TRIG.TWOPI / len2) * i - RGraph.SVG.TRIG.HALFPI;

                    path.push('{1}{2} {3}'.format(
                        i === 0 ? 'M' : 'L',
                        xy.x,
                        xy.y
                    ));

                    // Save the coordinates and angle
                    this.angles.push({
                        object:  this,
                        dataset: dataset,
                        index:   i,
                        x:       xy.x,
                        y:       xy.y,
                        cx:      this.centerx,
                        cy:      this.centery,
                        r:       xy.r,
                        angle:   xy.angle
                    });
                    this.angles2[dataset].push({
                        object:  this,
                        dataset: dataset,
                        index:   i,
                        x:       xy.x,
                        y:       xy.y,
                        cx:      this.centerx,
                        cy:      this.centery,
                        r:       xy.r,
                        angle:   xy.angle
                    });

                    // These coords arrays just store the coordinates of the points.
                    this.coords.push([
                        xy.x,
                        xy.y
                    ]);
                    this.coords2[dataset].push([
                        xy.x,
                        xy.y
                    ]);
                }
                
                // If a stacked filled charts then add the reverse path
                if (dataset > 0 && properties.filled && properties.filledAccumulative) {
                
                    // Add a line completing the "circle"
                    path.push('L {1} {2}'.format(
                        this.coords2[dataset][0][0],
                        this.coords2[dataset][0][1]
                    ));
                    
                    // Move to the previous dataset
                    path.push('M {1} {2}'.format(
                        this.coords2[dataset - 1][0][0],
                        this.coords2[dataset - 1][0][1]
                    ));
                    
                    // Now backtrack over the previous dataset
                    for (var i=this.coords2[dataset - 1].length - 1; i>=0; --i) {
                        path.push('L {1} {2}'.format(
                            this.coords2[dataset - 1][i][0],
                            this.coords2[dataset - 1][i][1]
                        ));
                    }
                    
                    this.redraw = true;

                } else {
                    // Add the closepath
                    path.push('z');
                }


                var path = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'path',
                    parent: this.svg.all,
                    attr: {
                        d: path.join(" "),
                        stroke: properties.colors[dataset],
                        fill: properties.filled ? properties.colors[dataset] : 'transparent',
                        'fill-opacity': properties.filledOpacity,
                        'stroke-width': properties.linewidth,
                        'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : '',
                        filter: properties.shadow ? 'url(#dropShadow)' : '',
                    }
                });

                path.setAttribute('data-dataset', dataset);
            }
            
            
            // Redraw the chart (this only runs if necessary
            this.redrawRadar();
        };








        //
        // Redraws the chart if required
        //
        this.redrawRadar = function ()
        {
            if (this.redraw) {
                
                this.redraw = false;
                
                // Loop through ths coordinates
                for (var dataset = 0; dataset<this.coords2.length; ++dataset) {

                    var path = [];

                    for (var i=0; i<this.coords2[dataset].length; ++i) {
                        if (i === 0) {
                            path.push('M {1} {2}'.format(
                                this.coords2[dataset][i][0],
                                this.coords2[dataset][i][1]
                            ));
                        } else {
                            path.push('L {1} {2}'.format(
                                this.coords2[dataset][i][0],
                                this.coords2[dataset][i][1]
                            ))
                        }
                    }
                        
                    path.push('z')

                    RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: this.svg.all,
                        attr: {
                            d: path.join(" "),
                            stroke: properties.colors[dataset],
                            fill: 'transparent',
                            'stroke-width': properties.linewidth
                        }
                    });
                }
            }
        };








        //
        // Draw the tickmarks
        //
        this.drawTickmarks = function ()
        {
            var group = RGraph.SVG.create({
                svg:  this.svg,
                parent: this.svg.all,
                type: 'g',
                attr: {
                    className: 'rgraph_radar_tickmarks'
                }
            });

            for (var i=0; i<this.coords2.length; ++i) {
                for (var j=0; j<this.coords2[i].length; ++j) {
                    if (properties.tickmarksStyle === 'circle' || properties.tickmarksStyle === 'filledcircle' ) {
                        var c = RGraph.SVG.create({
                            svg:  this.svg,
                            type: 'circle',
                            parent: group,
                            attr: {
                                cx: this.coords2[i][j][0],
                                cy: this.coords2[i][j][1],
                                r: properties.tickmarksSize,
                                fill: properties.tickmarksStyle === 'filledcircle' ? properties.colors[i] : properties.tickmarksFill,
                                stroke: properties.colors[i],
                                'stroke-width': properties.tickmarksLinewidth,
                                'clip-path': this.isTrace ? 'url(#trace-effect-clip)' : ''
                            }
                        });
                        
                        c.setAttribute('data-dataset', i);
                        c.setAttribute('data-index', j);
                    
                    
                    } else if (properties.tickmarksStyle === 'rect' || properties.tickmarksStyle === 'filledrect') {
                        
                        var halfTickmarkSize = properties.tickmarksSize / 2;
                        var fill = typeof properties.tickmarksFill === 'object' && properties.tickmarksFill[i] ? properties.tickmarksFill[i] : properties.tickmarksFill;
                        
                        var s = RGraph.SVG.create({
                            svg:  this.svg,
                            type: 'rect',
                            parent: group,
                            attr: {
                                x: this.coords2[i][j][0] - halfTickmarkSize,
                                y: this.coords2[i][j][1] - halfTickmarkSize,
                                width: properties.tickmarksSize,
                                height: properties.tickmarksSize,
                                fill: properties.tickmarksStyle === 'filledrect' ? properties.colors[i] : fill,
                                stroke: properties.colors[i],
                                'stroke-width': properties.tickmarksLinewidth
                            }
                        });
                        
                        s.setAttribute('data-dataset', i);
                        s.setAttribute('data-index', j);
                    }
                }
            }
        };








        //
        // Draw the labels
        //
        this.drawLabels = function ()
        {
            var angles = this.angles2,
                labels = properties.labels;
            
            // Get the text configuration
            var textConf = RGraph.SVG.getTextConf({
                object: this,
                prefix: 'labels'
            });

            for (var i=0,len=labels.length; i<len; ++i) {

                if (!labels[i]) {
                    continue;
                }

                var endpoint = RGraph.SVG.TRIG.getRadiusEndPoint({
                    angle: RGraph.SVG.TRIG.TWOPI / labels.length * i - RGraph.SVG.TRIG.HALFPI,
                    r: this.radius + 20 + properties.labelsOffset
                });
                
                var x = endpoint[0] + this.centerx,
                    y = endpoint[1] + this.centery;

                //
                // Horizontal alignment

                if ((i / len) < 0.5) {
                    halign = 'left';
                } else {
                    halign = 'right';
                }

                //
                // Vertical alignment
                //
                if ((i / len) < 0.25 || (i / len) > 0.75) {
                    valign = 'bottom';
                } else {
                    valign = 'top';
                }

                // Specify the alignment for labels which are on the axes
                if ( (i / len) === 0 )    {halign = 'center';}
                if ( (i / len) === 0.25 ) {valign = 'center';}
                if ( (i / len) === 0.5 )  {halign = 'center';}
                if ( (i / len) === 0.75 ) {valign = 'center';}


                RGraph.SVG.text({
                    object: this,
                    svg:    this.svg,
                    parent: this.svg.all,
                    tag:    'labels',

                    text:   labels[i],

                    x:      x,
                    y:      y,

                    halign: halign,
                    valign: 'center',

                    size:   textConf.size,
                    color:  textConf.color,
                    bold:   textConf.bold,
                    italic: textConf.italic,
                    font:   textConf.font
                });
            }
            
            
            
            
            
            
            
            
            
            
            

            // Draw the scale if required
            if (properties.scaleVisible) {
            
                // Get the text configuration
                var textConf = RGraph.SVG.getTextConf({
                    object: this,
                    prefix: 'scale'
                });

                for (var i=0; i<this.scale.labels.length; ++i) {
    
                    var x = this.centerx;
                    var y = this.centery - (this.radius / this.scale.labels.length * (i+1) );
    

                    RGraph.SVG.text({
                        
                        object: this,
                        parent: this.svg.all,
                        tag:    'labels.scale',
                        
                        text:   this.scale.labels[i],
                        
                        x:       x,
                        y:       y,

                        halign: 'center',
                        valign: 'center',

                        background: 'rgba(255,255,255,0.7)',
                        padding:2,
                        
                        size:   textConf.size,
                        color:  textConf.color,
                        bold:   textConf.bold,
                        italic: textConf.italic,
                        font:   textConf.font
                    });
                }
    
                // Draw the zero label
                var str = RGraph.SVG.numberFormat({
                    object:    this,
                    num:       this.scale.min.toFixed(properties.scaleDecimals),
                    prepend:   properties.scaleUnitsPre,
                    append:    properties.scaleUnitsPost,
                    point:     properties.scalePoint,
                    thousand:  properties.scaleThousand,
                    formatter: properties.scaleFormatter
                });

                RGraph.SVG.text({
                    object: this,
                    parent: this.svg.all,
                    tag:    'labels.scale',

                    text:   str,

                    x:      this.centerx,
                    y:      this.centery,
                    
                    halign: 'center',
                    valign: 'center',
                    
                    background: 'rgba(255,255,255,0.7)',
                    padding:2,

                    size:   textConf.size,
                    color:  textConf.color,
                    bold:   textConf.bold,
                    italic: textConf.italic,
                    font:   textConf.font
                });
            }
        };








        //
        // This function can be used to highlight a segment on the chart
        // 
        // @param object circle The circle to highlight
        //
        this.highlight = function (circle)
        {                
            circle.setAttribute('fill', properties.highlightFill);
            circle.setAttribute('stroke', properties.highlightStroke);
            circle.setAttribute('stroke-width', properties.highlightLinewidth);
                
            this.highlight_node = circle;

            RGraph.SVG.REG.set('highlight', circle);
        };








        // Add the hide function
        //this.hideHighlight = function ()
        //{
        //    var highlight = RGraph.SVG.REG.get('highlight');

        //    if (highlight) {
        //        highlight.setAttribute('fill', 'transparent');
        //        highlight.setAttribute('stroke', 'transparent');
        //    }
        //};








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function () 
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (!Object.keys(this.originalColors).length) {
                this.originalColors = {
                    colors:        RGraph.SVG.arrayClone(properties.colors),
                    highlightFill: RGraph.SVG.arrayClone(properties.highlightFill)
                }
            }
            
            
            // colors
            var colors = properties.colors;

            if (colors) {
                for (var i=0; i<colors.length; ++i) {
                    colors[i] = RGraph.SVG.parseColorRadial({
                        object: this,
                        color: colors[i]
                    });
                }
            }
            
            // Highlight fill
            properties.highlightFill = RGraph.SVG.parseColorRadial({
                object: this,
                color: properties.highlightFill
            });
        };








        //
        // Get the maximum value
        //
        this.getMaxValue = function ()
        {
            var max = 0;

            if (properties.filled && properties.filledAccumulative) {
                this.max = RGraph.SVG.arrayMax(this.data[this.data.length - 1]);
            } else {
                for (var dataset=0,max=0; dataset<this.data.length; ++dataset) {
                    this.max = Math.max(this.max, RGraph.SVG.arrayMax(this.data[dataset]));
                }
            }
        };








        //
        // Gets the radius of a value
        //
        //@param number The value to get the radius for
        //
        this.getRadius = function (value)
        {
            return ( (value - properties.scaleMin) / (this.scale.max - properties.scaleMin) ) * this.radius;
        };








        //
        // Adds the circular hotspot that facilitate tooltips
        // (to a single point)
        //
        this.addTooltipHotspots = function ()
        {
            if (properties.tooltips && properties.tooltips.length > 0) {

                // Make the tooltipsEvent default to click
                if (properties.tooltipsEvent !== 'mousemove') {
                    properties.tooltipsEvent = 'click';
                }
                
                var group = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'g',
                    parent: this.svg.all,
                    attr: {
                        className: 'rgraph-radar-tooltip-hotspots'
                    }
                });

                for (var dataset=0,seq=0; dataset<this.coords2.length; ++dataset) {
                    for (var i=0; i<this.coords2[dataset].length; ++i) {

                        var circle = RGraph.SVG.create({
                            svg:  this.svg,
                            type: 'circle',
                            parent: group,
                            attr: {
                                cx: this.coords2[dataset][i][0],
                                cy: this.coords2[dataset][i][1],
                                r: properties.tickmarksSize,
                                fill: 'transparent',
                                stroke: 'transparent',
                                'stroke-width': 0,
                                'data-sequential-index': seq
                            },
                            style: {
                                cursor: properties['tooltips'][seq] ? 'pointer' : 'default'
                            }
                        });

                        (function (dataset, index, seq, obj)
                        {
                            if (properties.tooltips[seq] || typeof properties.tooltips === 'string') {
                                circle.addEventListener(properties.tooltipsEvent, function (e)
                                {
                                    var tooltip = RGraph.SVG.REG.get('tooltip');
    
                                    //obj.hideHighlight();
                                    
                                    if (tooltip && tooltip.__sequentialIndex__ === seq) {
                                        return;
                                    }
    
                                    // Show the tooltip
                                    RGraph.SVG.tooltip({
                                        object:  obj,
                                        dataset: dataset,
                                        index:   index,
                                sequentialIndex: seq,
                                        text:    typeof properties.tooltips === 'string' ? properties.tooltips : properties.tooltips[seq],
                                        event:   e
                                    });
    
                                    // Highlight the shape that has been clicked on
                                    obj.highlight(this);
                                    
                                }, false);
            
                                // Install the event listener that changes the
                                // cursor if necessary
                                if (properties.tooltipsEvent === 'click') {
                                    circle.addEventListener('mousemove', function (e)
                                    {
                                        e.target.style.cursor = 'pointer';
                                    }, false);
                                }
                            }
                            
                        }(dataset, i, seq++, this));
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
        // Removes the tooltip highlight from the chart
        //
        this.removeHighlight =
        this.hideHighlight   = function ()
        {
            var highlight = RGraph.SVG.REG.get('highlight');

            if (highlight && this.highlight_node) {
                this.highlight_node.setAttribute('fill','transparent');
                this.highlight_node.setAttribute('stroke','transparent');
                
                RGraph.SVG.REG.set('highlight', null);
            }
        };








    //
    // The trace effect
    //
    // @param ... object Options to the effect
    // @param ... function A callback function to run when the effect finishes
    //
    this.trace = function ()
    {
        var opt      = arguments[0] || {},
            frame    = 1,
            frames   = opt.frames || 120,
            obj      = this
            step     = 360 / frames;

        this.isTrace = true;

        this.draw();

        // Create the clip area
        var clipPath = RGraph.SVG.create({
            svg: this.svg,
            parent: this.svg.defs,
            type: 'clipPath',
            attr: {
                id: 'trace-effect-clip'
            }
        });
        
        clipPathArcPath = RGraph.SVG.TRIG.getArcPath2({
            cx:    this.angles[0].cx,
            cy:    this.angles[0].cy,
            r:     this.angles[0].r * 2,
            start: 0,
            end:   0
        });

        var clipPathArc = RGraph.SVG.create({
            svg: this.svg,
            parent: clipPath,
            type: 'path',
            attr: {
                d: clipPathArcPath
            }
        });
        
        
        var iterator = function ()
        {
            var width = (frame++) / frames * obj.width;
            var deg   = (360 / frames) * frame++,
                rad   = (RGraph.SVG.TRIG.TWOPI / 360) * deg

            clipPathArc.setAttribute('d', RGraph.SVG.TRIG.getArcPath2({
                cx:    obj.angles[0].cx,
                cy:    obj.angles[0].cy,
                r:     obj.angles[0].r * 2,
                start: 0,
                end:   rad
            }));
            
            if (frame <= frames) {
                RGraph.SVG.FX.update(iterator);
            } else if (opt.callback) {
                (opt.callback)(obj);
            }
        };
        
        iterator();
        
        return this;
    };








        //
        // A worker function that handles Bar chart specific tooltip substitutions
        //
        this.tooltipSubstitutions = function (opt)
        {
            var indexes = RGraph.SVG.sequentialIndexToGrouped(opt.index, this.data);

            // Create the values array which contains each datasets value
            for (var i=0,values=[]; i<this.originalData.length; ++i) {
                values.push(this.originalData[i][indexes[1]]);
            }

            return {
                  index: indexes[1],
                dataset: indexes[0],
        sequentialIndex: opt.index,
                  value: typeof this.data[indexes[0]] === 'number' ? this.data[indexes[0]] : this.data[indexes[0]][indexes[1]],
                 values: values
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
        // A worker function that returns the correct color/label/value
        //
        // @param object specific The indexes that are applicable
        // @param number index    The appropriate index
        //
        this.tooltipsFormattedCustom = function (specific, index, colors)
        {
            var color = (!RGraph.SVG.isNull(properties.tooltipsFormattedKeyColors) && typeof properties.tooltipsFormattedKeyColors === 'object' && properties.tooltipsFormattedKeyColors[index])
                            ? properties.tooltipsFormattedKeyColors[index]
                            : '';

            return {
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
                + coords[0]                      // The X coordinate of the point on the chart
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
            ) + 'px';

            args.tooltip.style.top  = (
                  svgXY[1]                       // The Y coordinate of the canvas
                + coords[1]                      // The Y coordinate of the point on the chart
                - tooltip.offsetHeight           // The height of the tooltip
                - 15                             // An arbitrary amount
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