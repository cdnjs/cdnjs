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
    RGraph.SVG.Rose = function (conf)
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
        this.layers          = {}; // MUST be before the SVG tag is created!
        this.svg             = RGraph.SVG.createSVG({object: this,container: this.container});
        this.isRGraph        = true;
        this.isrgraph        = true;
        this.rgraph          = true;
        this.width           = Number(this.svg.getAttribute('width'));
        this.height          = Number(this.svg.getAttribute('height'));
        this.data            = RGraph.SVG.arrayClone(conf.data);
        this.originalData    = RGraph.SVG.arrayClone(conf.data);
        this.type            = 'rose';
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
            amargin:       '3deg',
            
            backgroundGrid: true,
            backgroundGridColor:            '#ddd',
            backgroundGridRadialsCount:     null,
            backgroundGridRadialsAngleOffset: 0,
            backgroundGridConcentricsCount: 5,
            backgroundGridLinewidth:        1,

            colorsStroke: 'white',
            colors: [
                'red', 'black', 'orange', 'green', '#6ff', '#ccc',
                'pink', 'orange', 'cyan', 'maroon', 'olive', 'teal'
            ],
            colorsOpacity: 1,
            
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
            labelsRadialMargin: 10,
            labelsAngleOffset: 0,

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
            highlightFill: 'rgba(255,255,255,0.7)',
            highlightLinewidth: 1,
            
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

            exploded: 0,


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
            
            segmentsAngleOffset: 0,
            variant: 'normal',
            
            effectGrowMultiplier:       1,// Do not delete this
            effectRoundrobinMultiplier: 1 // Do not delete this
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



            // Reset the angles array to stop it growing
            this.angles  = [];
            
            // Create the arrays in the angles2 array based on
            // the data that we've been passed
            for (var i=0; i<this.data.length; ++i) {
                this.angles2[i] = [];
            }





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
            // Convert the nargin from strings to a number
            //
            if (typeof properties.amargin === 'string' && properties.amargin.match(/([0-9.]+)deg/)) {
                properties.amargin = RegExp.$1 / (180 / Math.PI);
            }




            //
            // Add the data to the .originalData array and work out the max value
            // 
            // 2/5/14 Now also use this loop to ensure that the data pieces
            //        are numbers
            // 
            // **Is this necessary **
            //
            //if (RGraph.SVG.isArray(this.data) && (typeof this.data[0] === 'number' || typeof this.data[0] === 'string')) {
            //    this.data = [this.data];
            //}

            // Convert strings to numbers
            for (var i=0; i<this.data.length; ++i) {
                if (typeof this.data[i] === 'object') {
                    for (var j=0; j<this.data[i].length; ++j) {            
                        if (typeof this.data[i][j] === 'string') {
                            this.data[i][j] = RGraph.SVG.stringsToNumbers(this.data[i][j]);
                        }
                    }
                } else if (typeof this.data[i] === 'string') {
                    this.data[i] = RGraph.SVG.stringsToNumbers(this.data[i]);
                }
            }









            // Get the max value. This sets the maximum value on the
            // this.max variable
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
            this.drawRose();






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
                    },
                    style: {
                        pointerEvents: 'none'
                    }
                });
            
                // Draw the concentric "rings" grid lines that are
                // arranged around the centerx/centery along with
                // the radials that eminate from the center outwards

                var origin      = 0 - (RGraph.SVG.TRIG.PI / 2),
                    radials     = (typeof properties.backgroundGridRadialsCount === 'number' ? properties.backgroundGridRadialsCount :  this.data.length),
                    concentrics = properties.backgroundGridConcentricsCount,
                    step        = RGraph.SVG.TRIG.TWOPI / radials;





                // First draw the radial lines that emanate from the
                // center outwards
                if (radials > 0) {
                    // This draws the radials for the non-equi-angular ONLY
                    if (properties.variant === 'non-equi-angular') {














                            // Number of radials always matches the number of data pieces
                            var radials = this.data.length;
                            
                            // Work out the total of the second part of each data bit
                            for (var i=0,total=0; i<this.data.length; ++i) {
                                total += this.data[i][1];
                            }

                            for (var i=0,sum=0; i<this.data.length; ++i) {

                                var coords = RGraph.SVG.TRIG.toCartesian({
                                    cx: this.centerx,
                                    cy: this.centery,
                                    r: this.radius,
                                    angle: origin + ( (sum / total) * RGraph.SVG.TRIG.TWOPI) + properties.backgroundGridRadialsAngleOffset
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
                                
                                sum += this.data[i][1];
                            }












                    // This draws the radials for normal and STACKED Rose charts
                    } else {
                        for (var i=0,len=radials; i<len; ++i) {
        
                            var coords = RGraph.SVG.TRIG.toCartesian({
                                cx: this.centerx,
                                cy: this.centery,
                                r: this.radius,
                                angle: origin + (i * step) + properties.backgroundGridRadialsAngleOffset
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
                }





                // Draw the concentrics
                if (concentrics > 0) {

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
        };








        //
        // Draws the Rose chart
        //
        this.drawRose = function ()
        {
            var opt = arguments[0] || {};


            // Empty the this.coords array so that animations don't
            // continually add new segments on top of old ones.
            for (var i=0; i<this.angles.length; ++i) {
                this.angles[i].element.parentNode.removeChild(this.angles[i].element);
            }






            // Reset the angles array to stop it growing.
            //
            // This needs to be here so that the grow effect does cause the
            // angles arrays to grow and grow and grow...
            this.angles  = [];
            
            // Create the arrays in the angles2 array based on
            // the data that we've been passed
            for (var i=0; i<this.data.length; ++i) {
                this.angles2[i] = [];
            }




            // Jump to another function if we're drawing a non-equi-angular chart
            if (properties.variant === 'non-equi-angular') {
                return this.drawRoseNonEquiAngular(opt);
            }






            var radians = RGraph.SVG.TRIG.TWOPI / this.data.length;

            // Don't add this group twice
            if (!document.getElementById('rgraph_rose_segments_' + this.uid)) {
                var group = RGraph.SVG.create({
                    svg: this.svg,
                    type:'g',
                    parent: this.svg.all,
                    attr: {
                        id: 'rgraph_rose_segments_' + this.uid
                    }
                });
            } else {
                var group = document.getElementById('rgraph_rose_segments_' + this.uid);
            }


            // Now loop thru the data
            for (var i=0,seq=0; i<this.data.length; ++i,++seq) {

                var radius = (this.data[i] / this.scale.max) * this.radius * properties.effectGrowMultiplier,
                    start  = (i / this.data.length) * RGraph.SVG.TRIG.TWOPI * properties.effectRoundrobinMultiplier,
                    end    = (((i / this.data.length) * RGraph.SVG.TRIG.TWOPI) + radians) * properties.effectRoundrobinMultiplier;

                // Get the exploded distance
                var explosion = this.getExploded({
                    index: i,
                    start: start - RGraph.SVG.TRIG.HALFPI,
                    end: end - RGraph.SVG.TRIG.HALFPI
                });



















                // Is the data piece an array or a number?
                if (typeof this.data[i] === 'object' && !RGraph.SVG.isNull(this.data[i])) {
                
                    // Create a group for the parts of this segment
                    if (!document.getElementById('rose_' + this.uid + '_segment_group_' + i)) {
                        var segment_group = RGraph.SVG.create({
                            svg: this.svg,
                            type: 'g',
                            parent: group,
                            attr: {
                                id: 'rose_' + this.uid + '_segment_group_' + i
                            }
                        });
                    } else {
                        var segment_group = document.getElementById('rose_' + this.uid + '_segment_group_' + i)
                    }
                
                    for (var j=0,sum=0,accRadius=0; j<this.data[i].length; ++j,++seq) {
                    
                        //
                        // Must reset the prevradius variable
                        //
                        if (j === 0) {
                            prevRadius = 0;
                        }
                    
                        sum += this.data[i][j];
                        
                        var radius = (sum / this.scale.max) * this.radius * properties.effectGrowMultiplier,
                            cx     = this.centerx + (explosion[0] * properties.effectRoundrobinMultiplier),
                            cy     = this.centery + (explosion[1] * properties.effectRoundrobinMultiplier);
                        
                        // This (I think is the OUTER curve in the segment
                        var arcPath = RGraph.SVG.TRIG.getArcPath2({
                            cx: cx,
                            cy: cy,
                            r: radius,
                            start: ((start + properties.amargin) * properties.effectRoundrobinMultiplier) + properties.segmentsAngleOffset,
                            end: ((end - properties.amargin) * properties.effectRoundrobinMultiplier) + properties.segmentsAngleOffset,
                            anticlockwise: false
                        });
                        
                        // The inner most segment
                        if (j === 0) {
                            arcPath = '{1} z'.format(
                                arcPath
                            );
                        } else {
                        
                            var arcPath2 = RGraph.SVG.TRIG.getArcPath2({
                                cx: cx,
                                cy: cy,
                                r: prevRadius,
                                start: ((end - properties.amargin) * properties.effectRoundrobinMultiplier) + properties.segmentsAngleOffset,
                                end: ((start + properties.amargin) * properties.effectRoundrobinMultiplier) + properties.segmentsAngleOffset,
                                anticlockwise: true
                            });
                            arcPath = '{1} L {2} {3} {4}'.format(
                                arcPath,
                                cx,
                                cy,
                                arcPath2
                            );
                        }

                        var path = RGraph.SVG.create({
                            svg: this.svg,
                            type: 'path',
                            parent: segment_group,
                            attr: {
                                d: arcPath,
                                fill: properties.colorsSequential ? properties.colors[seq]  : properties.colors[j],
                                'fill-opacity': properties.colorsOpacity,
                                stroke: properties.colorsStroke,
                                'stroke-width': properties.linewidth,
                                
                                'data-tooltip': (!RGraph.SVG.isNull(properties.tooltips) && properties.tooltips.length) ? properties.tooltips[seq] : '',
                                'data-index': i,
                                'data-centerx': cx,
                                'data-centery': cy,
                                'data-group': i,
                                'data-subindex': j,
                                'data-value': this.data[i][j],
                                'data-start-angle': start + properties.amargin + properties.segmentsAngleOffset,
                                'data-end-angle': end - properties.amargin + properties.segmentsAngleOffset,
                                'data-radius': radius,
                                'data-radius-inner': typeof prevRadius === 'number' ? prevRadius * properties.effectGrowMultiplier : 0,
                                'data-sequential-index': seq
                            }
                        });


                        // Install the tooltip listener
                        if (properties.tooltips && (properties.tooltips[seq] || typeof properties.tooltips === 'string') ) {
                        
                            // Make the tooltipsEvent default to click
                            if (properties.tooltipsEvent !== 'mousemove') {
                                properties.tooltipsEvent = 'click';
                            }
        
                            (function (index, group, seq, obj)
                            {
                                path.addEventListener(properties.tooltipsEvent, function (e)
                                {
                                    obj.removeHighlight();

                                    // Show the tooltip
                                    RGraph.SVG.tooltip({
                                        object: obj,
                                        group: group,
                                        index: index,
                                        sequentialIndex: seq,
                                        text: typeof properties.tooltips === 'string' ? properties.tooltips : properties.tooltips[seq],
                                        event: e
                                    });
                                    
                                    // Highlight the segment that has been clicked on
                                    obj.highlight(e.target);
                                    
                                    var highlight = RGraph.SVG.REG.get('highlight');
                                    
                                    if (properties.tooltipsEvent === 'mousemove') {
                                        highlight.style.cursor = 'pointer';
                                    }
                                    
                                }, false);
        
                                // Install the event listener that changes the
                                // cursor if necessary
                                if (properties.tooltipsEvent === 'click') {
                                    path.addEventListener('mousemove', function (e)
                                    {
                                        e.target.style.cursor = 'pointer';
                                    }, false);
                                }
                                
                            }(j, i, seq, this));
                        }

                        // Add the segment to the angles and angles2 array
                        this.angles.push({
                            object: this,
                            element: path
                        });

                        this.angles2[i].push({
                            object: this,
                            element: path
                        });
                    
                        var prevRadius = radius;
                    }










                    seq--;













                // A regular number
                } else {
                    
                    var cx = this.centerx + (explosion[0] * properties.effectRoundrobinMultiplier),
                        cy = this.centery + (explosion[1] * properties.effectRoundrobinMultiplier);

                    var arcPath = RGraph.SVG.TRIG.getArcPath2({
                        cx: cx,
                        cy: cy,
                        r: radius,
                        start: ((start + properties.amargin) * properties.effectRoundrobinMultiplier) + properties.segmentsAngleOffset,
                        end: ((end - properties.amargin) * properties.effectRoundrobinMultiplier) + properties.segmentsAngleOffset,
                        anticlockwise: false
                    });

                    var path = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: group,
                        attr: {
                            d: '{1} z'.format(
                                arcPath
                            ),
                            fill: properties.colorsSequential ? properties.colors[i]  : properties.colors[0],
                            'fill-opacity': properties.colorsOpacity,
                            stroke: properties.colorsStroke,
                            'stroke-width': properties.linewidth,
                            
                            'data-tooltip': (!RGraph.SVG.isNull(properties.tooltips) && properties.tooltips.length) ? properties.tooltips[i] : '',
                            'data-index': i,
                            'data-centerx': cx,
                            'data-centery': cy,
                            'data-value': this.data[i],
                            'data-start-angle': start + properties.amargin + properties.segmentsAngleOffset,
                            'data-end-angle': end - properties.amargin + properties.segmentsAngleOffset,
                            'data-radius': radius,
                            'data-sequential': seq
                        }
                    });

                    // Add the segment to the angles array
                    this.angles.push({
                        object: this,
                        element: path
                    });

                    this.angles2[i].push({
                        object: this,
                        element: path
                    });




                    if (properties.tooltips && (properties.tooltips[i] || typeof properties.tooltips === 'string') ) {
                    
                        // Make the tooltipsEvent default to click
                        if (properties.tooltipsEvent !== 'mousemove') {
                            properties.tooltipsEvent = 'click';
                        }
    
                        (function (index, obj)
                        {
                            path.addEventListener(properties.tooltipsEvent, function (e)
                            {
                                obj.removeHighlight();

                                // Show the tooltip
                                RGraph.SVG.tooltip({
                                    object: obj,
                                    index: index,
                                    group: index,
                                    sequentialIndex: index,
                                    text: typeof properties.tooltips === 'string' ? properties.tooltips : properties.tooltips[index],
                                    event: e
                                });
                                
                                // Highlight the rect that has been clicked on
                                obj.highlight(e.target);
                                
                                var highlight = RGraph.SVG.REG.get('highlight');
                                
                                if (properties.tooltipsEvent === 'mousemove') {
                                    highlight.style.cursor = 'pointer';
                                }
                                
                            }, false);
    
                            // Install the event listener that changes the
                            // cursor if necessary
                            if (properties.tooltipsEvent === 'click') {
                                path.addEventListener('mousemove', function (e)
                                {
                                    e.target.style.cursor = 'pointer';
                                }, false);
                            }
                            
                        }(i, this));
                    }
                }
            }
        };








        //
        // Draws the radar, but only the non-equi-angular variant
        //
        this.drawRoseNonEquiAngular = function (opt)
        {
            if (!document.getElementById('rgraph_rose_segments_' + this.uid)) {
                var group = RGraph.SVG.create({
                    svg: this.svg,
                    type:'g',
                    parent: this.svg.all,
                    attr: {
                        id: 'rgraph_rose_segments_' + this.uid
                    }
                });
            } else {
                var group = document.getElementById('rgraph_rose_segments_' + this.uid)
            }
            
            //Loop through the data summing the second data-pieces
            for (var i=0,total=0; i<this.data.length; ++i) {
                total += parseFloat(this.data[i][1]);
            }











            // The initial angles
            var start = 0;




            // Now loop thru the data
            for (var i=0,seq=0; i<this.data.length; ++i,++seq) {

                var radians = (this.data[i][1] / total) * RGraph.SVG.TRIG.TWOPI,
                    end     = start + radians;

                // Get the exploded distance
                var explosion = this.getExploded({
                    index: i,
                    start: start - RGraph.SVG.TRIG.HALFPI,
                    end: end - RGraph.SVG.TRIG.HALFPI
                });















                // A stacked non-equi-angular segment
                if (typeof this.data[i][0] === 'object' && !RGraph.SVG.isNull(this.data[i][0])) {

                    if (!document.getElementById('rgraph_rose_' + this.uid + '_segment_group_' + i)) {
                        var segment_group = RGraph.SVG.create({
                            svg: this.svg,
                            type:'g',
                            parent: group,
                            attr: {
                                id: 'rgraph_rose_' + this.uid + '_segment_group_' + i
                            }
                        });
                    } else {
                        var segment_group = document.getElementById('rgraph_rose_' + this.uid + '_segment_group_' + i)
                    }

                    // Loop thru the set of values for this segment
                    for (var j=0,sum=0; j<this.data[i][0].length; ++j,++seq) {

                        sum += this.data[i][0][j];

                        // First segment in the stack or not?
                        if (j === 0) {
                            
                            var prevRadius = 0,
                                radius     = (sum / this.scale.max) * this.radius * properties.effectGrowMultiplier,
                                cx         = this.centerx + (explosion[0] * properties.effectRoundrobinMultiplier),
                                cy         = this.centery + (explosion[1] * properties.effectRoundrobinMultiplier);
                            
                            var arcPath = RGraph.SVG.TRIG.getArcPath2({
                                cx: cx,
                                cy: cy,
                                r: radius,
                                start: ((start + properties.amargin) * properties.effectRoundrobinMultiplier) + properties.segmentsAngleOffset,
                                end: ((end - properties.amargin) * properties.effectRoundrobinMultiplier) + properties.segmentsAngleOffset,
                                anticlockwise: false
                            });
                            
                            var arcPath2   = '';

                        } else {
                            
                            var prevRadius = radius, // The previous iterations radius
                                radius     = (sum / this.scale.max) * this.radius * properties.effectGrowMultiplier,
                                cx         = this.centerx + (explosion[0] * properties.effectRoundrobinMultiplier),
                                cy         = this.centery + (explosion[1] * properties.effectRoundrobinMultiplier);

                            var arcPath = RGraph.SVG.TRIG.getArcPath2({
                                cx: cx,
                                cy: cy,
                                r: radius,
                                start: ((start + properties.amargin) * properties.effectRoundrobinMultiplier) + properties.segmentsAngleOffset,
                                end: ((end - properties.amargin) * properties.effectRoundrobinMultiplier) + properties.segmentsAngleOffset,
                                anticlockwise: false
                            });

                            var arcPath2 = RGraph.SVG.TRIG.getArcPath2({
                                cx: cx,
                                cy: cy,
                                r: prevRadius,
                                start: ((end - properties.amargin) * properties.effectRoundrobinMultiplier) + properties.segmentsAngleOffset,
                                end: ((start + properties.amargin) * properties.effectRoundrobinMultiplier) + properties.segmentsAngleOffset,
                                anticlockwise: true
                            });
                        }

                        var path = RGraph.SVG.create({
                            svg: this.svg,
                            type: 'path',
                            parent: segment_group,
                            attr: {
                                d: '{1} {2} z'.format(
                                    arcPath,
                                    arcPath2
                                ),
                                fill:                properties.colorsSequential ? properties.colors[seq]  : properties.colors[j],
                                'fill-opacity':      properties.colorsOpacity,
                                stroke:              properties.colorsStroke,
                                'stroke-width':      properties.linewidth,
                                'data-tooltip':      (!RGraph.SVG.isNull(properties.tooltips) && properties.tooltips.length) ? properties.tooltips[i] : '',
                                'data-centerx':      cx,
                                'data-centery':      cy,
                                'data-index':        i,
                                'data-subindex':     j,
                                'data-value':        this.data[i][0][j],
                                'data-start-angle':  start + properties.amargin + properties.segmentsAngleOffset,
                                'data-end-angle':    end - properties.amargin + properties.segmentsAngleOffset,
                                'data-radius':       radius,
                                'data-radius-inner': prevRadius,
                                'data-sequential':   seq
                            }
                        });



                        // Add the segment to the angles array
                        this.angles.push({
                            object: this,
                            element: path
                        });
                       
                       this.angles2[i].push({
                            object: this,
                            element: path
                        });




                        // Install tooltips listeners
                        if (properties.tooltips && (properties.tooltips[seq] || typeof properties.tooltips === 'string') ) {

                            // Make the tooltipsEvent default to click
                            if (properties.tooltipsEvent !== 'mousemove') {
                                properties.tooltipsEvent = 'click';
                            }

                            (function (index,group,seq,obj)
                            {
                                path.addEventListener(properties.tooltipsEvent, function (e)
                                {
                                    obj.removeHighlight();

                                    // Show the tooltip
                                    RGraph.SVG.tooltip({
                                        object: obj,
                                        index: index,
                                        group: group,
                                        sequentialIndex: seq,
                                        text: typeof properties.tooltips === 'string' ? properties.tooltips : properties.tooltips[seq],
                                        event: e
                                    });
                                    
                                    // Highlight the rect that has been clicked on
                                    obj.highlight(e.target);
                                    
                                    var highlight = RGraph.SVG.REG.get('highlight');
                                    
                                    if (properties.tooltipsEvent === 'mousemove') {
                                        highlight.style.cursor = 'pointer';
                                    }
                                    
                                }, false);
        
                                // Install the event listener that changes the
                                // cursor if necessary
                                if (properties.tooltipsEvent === 'click') {
                                    path.addEventListener('mousemove', function (e)
                                    {
                                        e.target.style.cursor = 'pointer';
                                    }, false);
                                }
                                
                            }(j, i, seq, this));
                        }
                        var prevRadius = radius;
                    }
                    seq--



                    
















                // A regular non-equi-angular segment
                } else {
                    var radius = (this.data[i][0] / this.scale.max) * this.radius * properties.effectGrowMultiplier,
                        cx     = this.centerx + (explosion[0] * properties.effectRoundrobinMultiplier),
                        cy     = this.centery + (explosion[1] * properties.effectRoundrobinMultiplier);

                    var arcPath = RGraph.SVG.TRIG.getArcPath2({
                        cx: cx,
                        cy: cy,
                        r: radius,
                        start: ((start + properties.amargin) * properties.effectRoundrobinMultiplier) + properties.segmentsAngleOffset,
                        end: ((end - properties.amargin) * properties.effectRoundrobinMultiplier) + properties.segmentsAngleOffset,
                        anticlockwise: false
                    });

                    var path = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: group,
                        attr: {
                            d: '{1} z'.format(
                                arcPath
                            ),
                            fill: properties.colorsSequential ? properties.colors[i]  : properties.colors[0],
                            'fill-opacity': properties.colorsOpacity,
                            stroke: properties.colorsStroke,
                            'stroke-width': properties.linewidth,
                            
                            'data-tooltip': (!RGraph.SVG.isNull(properties.tooltips) && properties.tooltips.length) ? properties.tooltips[i] : '',
                            'data-centerx': cx,
                            'data-centery': cy,
                            'data-index': i,
                            'data-value': this.data[i][0],
                            'data-start-angle': start + properties.amargin + properties.segmentsAngleOffset,
                            'data-end-angle': end - properties.amargin + properties.segmentsAngleOffset,
                            'data-radius': radius,
                            'data-sequential': seq
                        }
                    });
    
                    // Add the segment to the angles array
                    this.angles.push({
                        object: this,
                        element: path
                    });
                   
                   this.angles2[i].push({
                        object: this,
                        element: path
                    });
    
    
    

                    if (properties.tooltips && (properties.tooltips[i] || typeof properties.tooltips === 'string') ) {
                    
                        // Make the tooltipsEvent default to click
                        if (properties.tooltipsEvent !== 'mousemove') {
                            properties.tooltipsEvent = 'click';
                        }
    
                        (function (index, group, seq, obj)
                        {
                            path.addEventListener(properties.tooltipsEvent, function (e)
                            {
                                obj.removeHighlight();
    
                                // Show the tooltip
                                RGraph.SVG.tooltip({
                                    object: obj,
                                    index: index,
                                    group: index,
                                    sequentialIndex: seq,
                                    text: typeof properties.tooltips === 'string' ? properties.tooltips : properties.tooltips[index],
                                    event: e
                                });
                                
                                // Highlight the rect that has been clicked on
                                obj.highlight(e.target);
                                
                                var highlight = RGraph.SVG.REG.get('highlight');
                                
                                if (properties.tooltipsEvent === 'mousemove') {
                                    highlight.style.cursor = 'pointer';
                                }
                                
                            }, false);
    
                            // Install the event listener that changes the
                            // cursor if necessary
                            if (properties.tooltipsEvent === 'click') {
                                path.addEventListener('mousemove', function (e)
                                {
                                    e.target.style.cursor = 'pointer';
                                }, false);
                            }
                            
                        }(i, i, seq, this));
                    }
                }
                
                
                // Increment the start angle for the next iteration of the loop
                start += radians;
            }
        };








        //
        // Redraws the chart if required
        //
        this.redrawRose = function ()
        {
        };








        //
        // Draw the labels
        //
        this.drawLabels = function ()
        {
            // Draw the scale if required
            if (properties.scaleVisible) {




                // Don't add this group twice
                if (!document.getElementById('rgraph_rose_scale_labels_' + this.uid)) {
                    var group = RGraph.SVG.create({
                        svg: this.svg,
                        type:'g',
                        parent: this.svg.all,
                        attr: {
                            id: 'rgraph_rose_scale_labels_' + this.uid
                        }
                    });
                } else {
                    var group = document.getElementById('rgraph_rose_scale_labels_' + this.uid);
                }
                
                // Get the text configuration
                var textConf = RGraph.SVG.getTextConf({
                    object: this,
                    prefix: 'scale'
                });



                for (var i=0; i<this.scale.labels.length; ++i) {
    
                    var x = this.centerx,
                        y = this.centery - (this.radius / this.scale.labels.length * (i+1) );



                    RGraph.SVG.text({
                        
                        object:     this,
                        svg:        this.svg,
                        parent:     group,

                        tag:        'labels.scale',
                        
                        text:       this.scale.labels[i],
                        
                        x:          x,
                        y:          y,
                        
                        halign:     'center',
                        valign:     'center',
                        
                        background: 'rgba(255,255,255,0.7)',
                        padding:    2,
                        
                        size:       textConf.size,
                        color:      textConf.color,
                        bold:       textConf.bold,
                        italic:     textConf.italic,
                        font:       textConf.font
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
                    
                    object:     this,
                    parent:     group,
                    tag:        'labels.scale',

                    text:       str,

                    x:          this.centerx,
                    y:          this.centery,

                    halign:     'center',
                    valign:     'center',

                    background: 'rgba(255,255,255,0.7)',
                    padding:    2,

                    size:       textConf.size,
                    color:      textConf.color,
                    bold:       textConf.bold,
                    italic:     textConf.italic,
                    font:       textConf.font
                });
            }







            // Used further down
            var halign;


            // Don't add this group twice
            if (!document.getElementById('rgraph_rose_circular_labels_' + this.uid)) {
                var group = RGraph.SVG.create({
                    svg: this.svg,
                    type:'g',
                    parent: this.svg.all,
                    attr: {
                        id: 'rgraph_rose_circular_labels_' + this.uid
                    }
                });
            } else {
                var group = document.getElementById('rgraph_rose_circular_labels_' + this.uid);
            }

            // Set a default size for the labels
            if (typeof properties.labelsSize !== 'number') {
                properties.labelsSize = properties.textSize + 4;
            }



            // Draw the circular labels
        
            // Get the text configuration for the circular labels
            var textConf = RGraph.SVG.getTextConf({
                object: this,
                prefix: 'labels'
            });

            for (var i=0; i<properties.labels.length; ++i) {

                if (properties.variant === 'non-equi-angular') {
                    var angle  = ((Number(this.angles2[i][0].element.getAttribute('data-end-angle')) - Number(this.angles2[i][0].element.getAttribute('data-start-angle'))) / 2) + Number(this.angles2[i][0].element.getAttribute('data-start-angle')) - RGraph.SVG.TRIG.HALFPI;
                } else {
                    var angle = (((RGraph.SVG.TRIG.TWOPI / properties.labels.length)) * i) - RGraph.SVG.TRIG.HALFPI + properties.labelsAngleOffset + (RGraph.SVG.TRIG.TWOPI / (2 * properties.labels.length));
                }

                var endpoint = RGraph.SVG.TRIG.getRadiusEndPoint({
                    r:     this.radius + properties.labelsRadialMargin,
                    angle: angle
                });

                // Accommodate the explosion for the label
                var explosion = this.getExploded({
                    index: i,
                    start: Number(this.angles2[i][0].element.getAttribute('data-start-angle')) - RGraph.SVG.TRIG.HALFPI,
                    end: Number(this.angles2[i][0].element.getAttribute('data-end-angle')) - RGraph.SVG.TRIG.HALFPI
                });


                endpoint[0] += this.centerx + explosion[0];
                endpoint[1] += this.centery + explosion[1];


                // Do the alignment based on which quadrant the label is in
                if (Math.round(endpoint[0]) > this.centerx) {
                    halign = 'left';
                } else if (Math.round(endpoint[0]) === this.centerx) {
                    halign = 'center';
                } else {
                    halign = 'right';
                }





                RGraph.SVG.text({

                    object: this,
                    svg:    this.svg,
                    parent: group,
                    tag:    'labels',

                    text:   typeof properties.labels[i] === 'string' ? properties.labels[i] : '',
                    
                    x:      endpoint[0],
                    y:      endpoint[1],
                    
                    halign: halign,
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
        this.highlight = function (path)
        {
            //
            // Get the details of the segment and then uswe the arcPath as
            // the d attribute to a path object.
            //
            var centerx     = path.getAttribute('data-centerx'),
                centery     = path.getAttribute('data-centery'),
                radius      = path.getAttribute('data-radius'),
                radiusInner = path.getAttribute('data-radius-inner'),
                start       = path.getAttribute('data-start-angle'),
                end         = path.getAttribute('data-end-angle');
            
            var arcPath = RGraph.SVG.TRIG.getArcPath3({
                cx:     centerx,
                cy:     centery,
                r:      radius,
                start:  start,
                end:    end,
                lineto: true
            });
            
            var arcPath_array = RGraph.SVG.TRIG.getArcPath3({
                cx:     centerx,
                cy:     centery,
                r:      radius,
                start:  start,
                end:    end,
                lineto: true,
                array: true
            });

            if (radiusInner) {
                var arcPath2 = RGraph.SVG.TRIG.getArcPath3({
                    cx:     centerx,
                    cy:     centery,
                    r:      radiusInner,
                    start:  end,
                    end:    start,
                    lineto: true,
                    anticlockwise: true
                });
            } else {
                arcPath2 = ' L {1} {2}'.format(centerx, centery);
            }

            var highlight = RGraph.SVG.create({
                svg: this.svg,
                parent: this.svg.all,
                type: 'path',
                attr: {
                    d: 'M {1} {2} '.format(arcPath_array[1], arcPath_array[2]) + arcPath + ' ' + arcPath2 + ' z',
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

            if (properties.variant === 'non-equi-angular') {
                for (var i=0; i<this.data.length; ++i) {
                    if (!RGraph.SVG.isNull(this.data[i])) {
                        if (typeof this.data[i][0] === 'number') {
                            max = Math.max(max, this.data[i][0]);
                        } else if (typeof this.data[i][0] === 'object'){
                            max = Math.max(max, RGraph.SVG.arraySum(this.data[i][0]));
                        }
                    }
                }
            } else {
                for (var i=0; i<this.data.length; ++i) {
                    if (!RGraph.SVG.isNull(this.data[i])) {
                        if (typeof this.data[i] === 'number') {
                            max = Math.max(max, this.data[i]);
                        } else if (typeof this.data[i] === 'object') {
                            max = Math.max(max, RGraph.SVG.arraySum(this.data[i]));
                        }
                    }
                }
            }
            
            this.max = max;
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
        // A roundRobin effect for the Pie chart
        //
        // @param object    Options for the effect
        // @param function  An optional callback function to call when
        //                  the effect is complete
        //
        this.roundRobin = function ()
        {
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

            if (highlight) { // && this.highlight_node

                highlight.setAttribute('fill','transparent');
                highlight.setAttribute('stroke','transparent');
                highlight = null;
                
                RGraph.SVG.REG.set('highlight', null);
            }
        };








        //
        // Returns the exploded X/Y for a given explosion
        //
        //TODO Needs updating to current coding style, including converting
        //     arguments to an object
        //
        this.getExploded = function (opt)
        {
            var index    = opt.index,
                start    = opt.start,
                end      = opt.end,
                exploded = properties.exploded,
                explodedX,
                explodedY;

            //
            // Retrieve any exploded - the exploded can be an array of numbers or a single number
            // (which is applied to all segments)
            //
            if (typeof exploded === 'object' && typeof exploded[index] === 'number') {
                explodedX = Math.cos(((end - start) / 2) + start) * exploded[index];
                explodedY = (Math.sin(((end - start) / 2) + start) * exploded[index]);

            } else if (typeof exploded === 'number') {
                explodedX = Math.cos(((end - start) / 2) + start) * exploded;
                explodedY = Math.sin(((end - start) / 2) + start) * exploded;
    
            } else {
                explodedX = 0;
                explodedY = 0;
            }
            
            return [explodedX, explodedY];
        };








        //
        // The grow effect
        //
        this.grow = function (opt)
        {
            var obj      = this,
                opt      = arguments[0] || {},
                frame    = -1,
                frames   = opt.frames || 60,
                callback = opt.callback || function () {};

            properties.effectGrowMultiplier = 0.01;
            
            this.draw();
            
            function iterator ()
            {
                // Increase the frame counter
                ++frame;
                
                // Get the multiplier using easing
                var multiplier = RGraph.SVG.FX.getEasingMultiplier(frames, frame);

                // Set the multiplier that the radius of the segments is
                // multiplied with.
                properties.effectGrowMultiplier = multiplier;

                // Redraw the segments
                obj.drawRose();

                if (frame >= frames) {
                    callback(obj);
                } else {
                    RGraph.SVG.FX.update(iterator);
                }
            }
            
            iterator();
            
            return this;
        };








        //
        // The grow effect
        //
        this.roundrobin = function (opt)
        {
            var obj      = this,
                opt      = arguments[0] || {},
                frame    = -1,
                frames   = opt.frames || 60,
                callback = opt.callback || function () {};

            properties.effectRoundrobinMultiplier = 0.01;
            
            this.draw();
            
            function iterator ()
            {
                // Increase the frame counter
                ++frame;
                
                // Get the multiplier using easing
                var multiplier = RGraph.SVG.FX.getEasingMultiplier(frames, frame);

                // Set the multiplier that the radius of the segments is
                // multiplied with.
                properties.effectRoundrobinMultiplier = multiplier;

                // Redraw the segments
                obj.drawRose();

                if (frame >= frames) {
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

            if (properties.variant === 'non-equi-angular') {

                // Stacked
                if (typeof this.data[0][0] === 'object') {
                
                    var tmp = [];
                
                    // Add all of the arrays to a temporary array
                    for (var i=0; i<this.data.length; ++i) {
                        tmp[i] = this.data[i][0];
                    }
                    
                    // Determine again the indexes
                    var indexes = RGraph.SVG.sequentialIndexToGrouped(opt.index, tmp);
                    var ret =  {
                          index: indexes[1],
                        dataset: indexes[0],
                sequentialIndex: opt.index,
                          value: this.data[indexes[0]][0][indexes[1]],
                         value2: this.data[indexes[0]][1],
                         values: this.data[indexes[0]][0]
                    };
                    
                    return ret;

                // Non-stacked
                } else {

                    return {
                          index: 0,
                        dataset: opt.index,
                sequentialIndex: opt.index,
                          value: (typeof this.data[opt.index] === 'object' && typeof this.data[opt.index][0] === 'number') ? this.data[opt.index][0] : mill,
                         value2: (typeof this.data[opt.index] === 'object' && typeof this.data[opt.index][1] === 'number') ? this.data[opt.index][1] : null,
                         values: typeof this.data[indexes[0]] === 'number' ? [this.data[indexes[0]]] : this.data[indexes[0]]
                    };
                }

            } else {

                return {
                      index: indexes[1],
                    dataset: indexes[0],
            sequentialIndex: opt.index,
                      value: typeof this.data[indexes[0]] === 'number' ? this.data[indexes[0]] : this.data[indexes[0]][indexes[1]],
                     value2: typeof value2 === 'number' ? value2 : null,
                     values: typeof this.data[indexes[0]] === 'number' ? [this.data[indexes[0]]] : this.data[indexes[0]]
                };
            }
        };








        //
        // A worker function that returns the correct color/label/value
        //
        // @param object specific The indexes that are applicable
        // @param number index    The appropriate index
        //
        this.tooltipsFormattedCustom = function (specific, index, colors)
        {
            var color, label, value, value2;

            color = properties.colors[index];

            // Different variations of the Rose chart

            // REGULAR CHART
            if (typeof this.data[specific.dataset] === 'number') {
                label = properties.tooltipsFormattedKeyLabels[specific.dataset] || '';
                color = !RGraph.SVG.isNull(properties.tooltipsFormattedKeyColors) && properties.tooltipsFormattedKeyColors[specific.index]
                            ? properties.tooltipsFormattedKeyColors[specific.index]
                            : color;

            // NON-EQUI-ANGULAR CHART
            } else if (typeof this.data[specific.dataset] === 'object' && properties.variant === 'non-equi-angular') {

                // REGULAT NON-EQUI-ANGULAR
                if (RGraph.SVG.isNumber(this.data[specific.dataset][0])) {
                    
                    // Don't show the second value on a non-equi-angular chart
                    if (index > 0) {
                        return {continue: true};
                    }

                    color = colors[specific.index];
                    value = this.data[specific.dataset][0];
                   value2 = typeof this.data[specific.dataset][1] === 'number' ? this.data[specific.dataset][1] : null
                    label = properties.tooltipsFormattedKeyLabels[specific.dataset];//this.data[specific.dataset][0];

                // STACKED NON-EQUI-ANGULAR
                } else if (RGraph.SVG.isArray(this.data[specific.dataset][0])) {

                    color = colors[index];
                    value = this.data[specific.dataset][0][index];
                    value = typeof this.data[specific.dataset][0][index] === 'number' ? this.data[specific.dataset][0][index] : null;
                   value2 = typeof this.data[specific.dataset][1] === 'number' ? this.data[specific.dataset][1] : null;
                    label = properties.tooltipsFormattedKeyLabels[index];
                }
            // STACKED REGULAR CHART
            } else if (typeof this.data[specific.dataset] === 'object') {
                //label = properties.tooltipsFormattedKeyLabels[specific.dataset] || '';
                color = !RGraph.SVG.isNull(properties.tooltipsFormattedKeyColors) && properties.tooltipsFormattedKeyColors[index]
                            ? properties.tooltipsFormattedKeyColors[index]
                            : color;
            }

            return {
                label: label,
                color: color,
                value: value,
               value2: value2
            };
        };








        //
        // This allows for static tooltip positioning
        //
        this.positionTooltipStatic = function (args)
        {
            var obj        = args.object,
                e          = args.event,
                tooltip    = args.tooltip,
                index      = args.index,
                svgXY      = RGraph.SVG.getSVGXY(obj.svg),
                angles     = this.angles[index];
                
                // Get the angles from the data attributes on the tag and
                // REMEMBER TO CONVERT THEM TO NUMBERS
                var startAngle  = parseFloat(angles.element.getAttribute('data-start-angle'));
                var endAngle    = parseFloat(angles.element.getAttribute('data-end-angle'));
                var radiusInner = parseFloat(angles.element.getAttribute('data-radius-inner'));
                var radiusOuter = parseFloat(angles.element.getAttribute('data-radius'));
                var angle       = ((endAngle - startAngle) / 2) + startAngle - RGraph.SVG.TRIG.HALFPI;
                
                if (isNaN(radiusInner)) {
                    radiusInner = 0;
                }

                var coords = RGraph.SVG.TRIG.toCartesian({
                    cx: this.centerx,
                    cy: this.centery,
                    r:  ((radiusOuter - radiusInner) / 2) + radiusInner,
                    angle: angle
                });


            // Position the tooltip in the X direction
            args.tooltip.style.left = (
                  svgXY[0]                  // The X coordinate of the canvas
                - (tooltip.offsetWidth / 2) // Subtract half of the tooltip width
                 + coords.x
            ) + 'px';

            args.tooltip.style.top  = (
                  svgXY[1]              // The Y coordinate of the canvas
                - tooltip.offsetHeight  // The height of the tooltip
                - 10                    // An arbitrary amount
                + coords.y
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