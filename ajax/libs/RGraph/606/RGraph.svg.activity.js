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
    RGraph.SVG.Activity = function (conf)
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








        this.min             = RGraph.SVG.stringsToNumbers(conf.min);
        this.max             = RGraph.SVG.stringsToNumbers(conf.max);
        this.value           = RGraph.SVG.stringsToNumbers(conf.value);
        this.currentValue    = null; // Used by animations
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
        this.type            = 'activity';
        this.colorsParsed    = false;
        this.originalColors  = {};
        this.gradientCounter = 1;
        this.adjusting_index = null;
        this.nodes           = {};
        this.firstDraw       = true; // After the first draw this will be false









        // Add this object to the ObjectRegistry
        RGraph.SVG.OR.add(this);

        // Set the DIV container to be inline-block
        this.container.style.display = 'inline-block';

        this.properties =
        {
            radius:                             null,
            centerx:                            null,
            centery:                            null,
            width:                              null,
            ends:                               'round',

            marginLeft:                            15,
            marginRight:                           15,
            marginTop:                             15,
            marginBottom:                          15,
            marginInner:                           1,

            backgroundColor:                    'black',
            backgroundGrid:                     false,
            backgroundGridColor:                '#ddd',
            backgroundGridRadials:              true,
            backgroundGridRadialsCount:         8,
            backgroundRings:                    true,
            backgroundRingsColors:              null,
            backgroundRingsAlpha:               0.5,

            colors:                             ['#F45B5B','#90EE7E','#2B908F','red','green','blue','yellow','pink'],

            icons:                                 null,
            iconsWidth:                            null,
            iconsHeight:                           null,
            iconsOffsetx:                          0,
            iconsOffsety:                          0,
            
            textFont:                              'Arial, Verdana, sans-serif',
            textSize:                              12,
            textColor:                             '#aaa',
            textBold:                              false,
            textItalic:                            false,
            text:                                  null,

            labelsCenter:                              false,
            labelsCenterIndex:                         0,
            labelsCenterFont:                          null,
            labelsCenterSize:                          40,
            labelsCenterColor:                         null,
            labelsCenterBold:                          null,
            labelsCenterItalic:                        null,
            labelsCenterUnitsPre:                      '',
            labelsCenterUnitsPost:                     '',
            labelsCenterDecimals:                      0,
            labelsCenterPoint:                         '.',
            labelsCenterThousand:                      ',',
            labelsCenterSpecific:                      null,
            labelsCenterHalign:                        'center',
            labelsCenterValign:                        'center',
            labelsCenterOffsetx:                       0,
            labelsCenterOffsety:                       0,
            labels:                                    [],
            labelsColor:                               null,
            labelsFont:                                null,
            labelsSize:                                null,
            labelsBold:                                null,
            labelsItalic:                              null,
            labelsBackgroundFill:                      'transparent',
            labelsBackgroundStroke:                    'transparent',
            labelsHalign:                              'right',
            labelsValign:                              'center',
            labelsOffsetx:                             0,
            labelsOffsety:                             0,
            labelsFormattedDecimals:                   0,
            labelsFormattedPoint:                      '.',
            labelsFormattedThousand:                   ',',
            labelsFormattedUnitsPre:                   '',
            labelsFormattedUnitsPost:                  '',

            adjustable:                         false,

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

            highlightStroke:                    'rgba(0,0,0,0)',
            highlightFill:                      'rgba(255,255,255,0.7)',
            highlightLinewidth:                 1
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


            //
            // Convert the value to an array if its a number
            //
            if (typeof this.value === 'number') {
                this.value = [this.value];
            }

            // Bounds checking
            for (var i=0; i<this.value.length; ++i) {
                if (this.value[i] > this.max) this.value[i] = this.max;
                if (this.value[i] < this.min) this.value[i] = this.min;
            }

            // Reset this to prevent it from growing
            this.nodes = {};

            // Should the first thing that's done inthe.draw() function
            // except for the onbeforedraw event
            this.width  = Number(this.svg.getAttribute('width'));
            this.height = Number(this.svg.getAttribute('height'));



            // Create the defs tag if necessary
            RGraph.SVG.createDefs(this);



            // Add these
            this.graphWidth  = this.width  - properties.marginLeft - properties.marginRight;
            this.graphHeight = this.height - properties.marginTop  - properties.marginBottom;



            // Work out the center point
            this.centerx = (this.graphWidth / 2) + properties.marginLeft;
            this.centery = (this.graphHeight / 2) + properties.marginTop;
            this.radius  = Math.min(this.graphWidth / 2, this.graphHeight / 2);



            // Allow the user to override the calculated centerx/y/radius
            this.centerx = typeof properties.centerx === 'number' ? properties.centerx : this.centerx;
            this.centery = typeof properties.centery === 'number' ? properties.centery : this.centery;
            this.radius  = typeof properties.radius  === 'number' ? properties.radius  : this.radius;

            //
            // Allow the centerx/centery/radius to be a plus/minus
            //
            if (typeof properties.radius  === 'string' && properties.radius.match(/^\+|-\d+$/) )  this.radius  += parseFloat(properties.radius);
            if (typeof properties.centerx === 'string' && properties.centerx.match(/^\+|-\d+$/) ) this.centerx += parseFloat(properties.centerx);
            if (typeof properties.centery === 'string' && properties.centery.match(/^\+|-\d+$/) ) this.centery += parseFloat(properties.centery);
            
            
            
            // Parse the colors for gradients
            RGraph.SVG.resetColorsToOriginalValues({object:this});
            this.parseColors();




            // Calculate the width
            if (!properties.width) {
                properties.width  = (this.radius * 0.75) / this.value.length;
                properties.width -= (2 * properties.marginInner);
            }








            // Draw the background
            this.drawBackground();




            // Draw the meter
            this.drawMeter();




            // Draw the labels
            this.drawLabels();
            
            
            
            
            
            
            // Draw the icons
            this.drawIcons();








            //
            // Ajusting
            //
            if (properties.adjustable && !this.adjusting_event_listeners_installed) {
                
                this.adjusting_mousedown = false;
                
                var obj = this;

                var func = function (e)
                {
                    var div     = e.currentTarget,
                        mouseX  = e.offsetX,
                        mouseY  = e.offsetY;
                        
                        if (RGraph.SVG.ISFF) {
                            mouseX = e.pageX - e.currentTarget.offsetLeft;
                            mouseY = e.pageY - e.currentTarget.offsetTop;
                        }

                    // Get the radius of the click
                    var radius = obj.getRadius(e);
                    

                    


                    if (radius > obj.radius) {
                        return;
                    }
                    
                    if (typeof obj.adjusting_index !== 'number') {
                        var index = obj.getIndexByRadius({radius: radius});
                        obj.adjusting_index = index;
                    } else {
                        var index = obj.adjusting_index;
                    }

                    var value        = obj.getValue(e);
                    obj.value[index] = value;
                    obj.currentValue = RGraph.SVG.arrayClone(value);

                    RGraph.SVG.clear(obj.svg);
                    obj.draw();
                };




                this.container.addEventListener('mousedown', function (e)
                {
                    obj.adjusting_mousedown = true;
                    
                    func(e);

                    // Fire the beforedraw event
                    RGraph.SVG.fireCustomEvent(obj, 'onadjustbegin');

                }, false);
                
                this.container.addEventListener('mousemove', function (e)
                {
                    if (obj.adjusting_mousedown) {
                        func(e);
                        
                        // Fire the beforedraw event
                        RGraph.SVG.fireCustomEvent(obj, 'onadjust');
                    }
                }, false);
                
                window.addEventListener('mouseup', function (e)
                {
                    obj.adjusting_mousedown = false;
                    obj.adjusting_index     = null;

                    // Fire the beforedraw event
                    RGraph.SVG.fireCustomEvent(obj, 'onadjustend');
                }, false);
                
                this.adjusting_event_listeners_installed = true;
            }

            // Add the event listener that clears the highlight rect if
            // there is any. Must be MOUSEDOWN (ie before the click event)
            var obj = this; document.body.addEventListener('mouseup', function (e)
            {
                obj.removeHighlight();
            
            }, false);








            //
            // Allow the addition of custom text via the
            // text: property.
            //
            RGraph.SVG.addCustomText(this);













            //
            // Fire the onfirstdraw event
            //
            if (this.firstDraw) {
                this.firstDraw = false;
                RGraph.SVG.fireCustomEvent(this, 'onfirstdraw');
            }




            // Fire the draw event
            RGraph.SVG.fireCustomEvent(this, 'ondraw');



            return this;
        };








        //
        // Go through the bars looking for the correct one for the given radius
        //
        this.getIndexByRadius = function (opt)
        {
            var radius = opt.radius;

            for (var i=0; i<this.nodes.bars.length; ++i) {
                var radiusInner = parseFloat(this.nodes.bars[i].getAttribute('data-radius-inner'));
                var radiusOuter = parseFloat(this.nodes.bars[i].getAttribute('data-radius-outer'));
                
                if (radius >= radiusInner && radius <= radiusOuter) {
                    return i;
                }
            }
            
            return null;
        };








        //
        // Draw the background"grid"
        //
        this.drawBackground = function ()
        {
            // First thing to do is clear the canvas to the backgroundColor
            if (properties.backgroundColor) {
                RGraph.SVG.create({
                    svg: this.svg,
                    type: 'rect',
                    parent: this.svg.all, 
                    attr: {
                        fill: properties.backgroundColor,
                        x: 0,
                        y: 0,
                        width: this.width,
                        height: this.height
                    }
                });
            }




            //
            // Draw the grid?
            //
            if (properties.backgroundGrid) {

                // Determine how many background circles
                // should be shown on the data points
                var count = this.value.length + 1;

                for (var i=0; i<count; i++) {
                
                    var radius = this.radius - (i * (properties.width + (2 * properties.marginInner)));

                   RGraph.SVG.create({
                        svg: this.svg,
                        type: 'circle',
                        parent: this.svg.all, 
                        attr: {
                            fill: 'transparent',
                            stroke: properties.backgroundGridColor,
                            cx: this.centerx,
                            cy: this.centery,
                            r:  radius
                        }
                   });
                }


                // Rename the variable so that it makes a little more sense
                // when used further down
                var minRadius = radius




                //
                // Draw the background lines that go from the center outwards
                //
                if (properties.backgroundGridRadials) {

                    var angle = (RGraph.SVG.TRIG.TWOPI / properties.backgroundGridRadialsCount);

                    for (var i=0; i<=properties.backgroundGridRadialsCount; ++i) {

                        var path1 = RGraph.SVG.TRIG.getArcPath3({
                            svg:    this.svg,
                            cx:     this.centerx,
                            cy:     this.centery,
                            radius: this.radius,
                            start:  i * angle,
                            end:    i * angle,
                            lineto: false
                        });
                        
                        var path2 = RGraph.SVG.TRIG.getArcPath3({
                            svg:    this.svg,
                            cx:     this.centerx,
                            cy:     this.centery,
                            radius: minRadius,
                            start:  i * angle,
                            end:    i * angle,
                            lineto: true
                        });

                        RGraph.SVG.create({
                            svg: this.svg,
                            type: 'path',
                            parent: this.svg.all, 
                            attr: {
                                fill: 'transparent',
                                stroke: properties.backgroundGridColor,
                                d: path1 + ' ' + path2
                            }
                        });
                    }
                }
            }
        };








        //
        // Draws the meter
        //
        this.drawMeter = function ()
        {
            this.nodes.bars = [];

            //
            // Loop through the values and draw the background rings
            //                
            for (var i=0; i<this.value.length; ++i) {

                // The radiuses of the ring
                var inner = this.radius - properties.marginInner - (i * properties.marginInner * 2) - (i * properties.width) - properties.width,
                    outer = this.radius - properties.marginInner - (i * properties.marginInner * 2) - (i * properties.width);

                // Determine the color
                if (RGraph.SVG.isArray(properties.backgroundRingsColors) && typeof properties.backgroundRingsColors[i] === 'string') {
                    var color = properties.backgroundRingsColors[i];
                } else {
                    var color = properties.colors[i];
                }






                // Draw the background rings if enabled
                if (properties.backgroundRings) {

                    // Draw the background ring
                    var path = RGraph.SVG.donut({
                        svg:         this.svg.all,
                        cx:          this.centerx,
                        cy:          this.centery,
                        innerRadius: inner,
                        outerRadius: outer,
                        fill:        color,
                        opacity:     properties.backgroundRingsAlpha
                    });
                    
                    path.setAttribute('data-radiusInner', inner);
                    path.setAttribute('data-radiusOuter', outer);
                    path.setAttribute('data-centerx', this.centerx);
                    path.setAttribute('data-centery', this.centery);
                }

                
                
                // Create the group the main path and the ends path objects will be children of.
                // This does not include the background of the ring
                //
                // *** IMPORTANT ***
                //
                // This group must be created and added to the SVG document AFTER the
                // background ring or the background rings will sit on top of the clickable
                // bit and prevent tooltips from working
                //
                var group = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'g',
                    parent: this.svg.all,
                    attr: {
                        'data-index': i
                    }
                });



                // First calculate the angle that the indicator bar extends to
                var angle = ((this.value[i] - this.min) / (this.max - this.min)) * RGraph.SVG.TRIG.TWOPI;


















                //
                // Draw the foreground to the ring
                //
                var arcPath = this.pathBar({
                    radiusInner: inner,
                    radiusOuter: outer,
                    angle:       angle
                });

                var path = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'path',
                    parent: group, 
                    attr: {
                        fill: properties.colors[i],
                        d: arcPath,
                        'data-index': i,
                        'data-centerx':      this.centerx,
                        'data-centery':      this.centery,
                        'data-angles-info':  'These angles are designed to be used with the RGraph.SVG.TRIG.getArcPath3() function',
                        'data-start-angle':  0,
                        'data-end-angle':    angle,
                        'data-radius-inner': inner,
                        'data-radius-outer': outer
                    }
                });
                
                // Set the angle and radiuses on the group tag too
                group.setAttribute('data-centerx',     this.centerx);
                group.setAttribute('data-centery',     this.centery);
                group.setAttribute('data-start-angle', 0);
                group.setAttribute('data-end-angle',   angle);
                group.setAttribute('data-radius-inner', inner);
                group.setAttribute('data-radius-outer', outer);
                
                this.nodes.bars[i] = group;
                











                //
                // Draw the circles at each end of the bar if necessary
                //
                if (properties.ends === 'round' && 0) {
    
                    var endcircle1 = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'circle',
                        parent: group, 
                        attr: {
                            fill: color,
                            cx: this.centerx,
                            cy: this.centery - outer + (properties.width / 2),
                            r:  properties.width / 2
                        }
                    });
                    
                    // Calculate the endpoint for the second circle
                    var endpoint = RGraph.SVG.TRIG.getRadiusEndPoint({
                        cx:     this.centerx,
                        cy:     this.centery,
                        radius: outer - (properties.width / 2),
                        angle:  angle - RGraph.SVG.TRIG.HALFPI
                    });
    
                    var endcircle2 = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'circle',
                        parent: group,
                        attr: {
                            fill: color,
                            cx: this.centerx + endpoint[0],
                            cy: this.centery + endpoint[1],
                            r:  properties.width / 2
                        }
                    });
                }






                //
                // Add the tooltip if necessary
                //
                if (   !RGraph.SVG.isNull(properties.tooltips)
                    && (!RGraph.SVG.isNull(properties.tooltips[i]) || typeof properties.tooltips === 'string')
                   ) {

                    var obj = this;

                    //
                    // Add tooltip event listeners
                    //
                    (function (index)
                    {
                        group.addEventListener(properties.tooltipsEvent.replace(/^on/, ''), function (e)
                        {
                            obj.removeHighlight();

                            // Show the tooltip
                            RGraph.SVG.tooltip({
                                object: obj,
                                 index: index,
                                 group: null,
                       sequentialIndex: index,
                                  text: typeof properties.tooltips === 'string' ?  properties.tooltips : properties.tooltips[index],
                                 event: e
                            });
                            
                            // Highlight the group that has been clicked on
                            obj.highlight(e.target);
                        }, false);

                        group.addEventListener('mousemove', function (e)
                        {
                            e.target.style.cursor = 'pointer';
                        }, false);
                    })(i);
                }
            }









            
            // Store the new value as the currentValue
            this.currentValue = RGraph.SVG.arrayClone(this.value);
        };








        //
        // This function creates the path for the indicator bar. It only creates the
        // path - it does not create an element or add anything to the DOM
        //
        this.pathBar = function (opt)
        {
            var inner = opt.radiusInner,
                outer = opt.radiusOuter,
                angle = opt.angle;

            var arcPath1 = RGraph.SVG.TRIG.getArcPath3({
                svg:    this.svg,
                cx:     this.centerx,
                cy:     this.centery,
                radius: outer,
                start:  0,
                end:    angle,
                lineto: false
            });
            
            // Draw a round end
            if (properties.ends === 'round') {
                var endpoint1 = RGraph.SVG.TRIG.getRadiusEndPoint({
                    cx:     this.centerx,
                    cy:     this.centery,
                    radius: ((outer - inner) / 2) + inner,
                    angle:  opt.angle - RGraph.SVG.TRIG.HALFPI
                });

                var endPath1 = RGraph.SVG.TRIG.getArcPath3({
                    svg:    this.svg,
                    cx:     this.centerx + endpoint1[0],
                    cy:     this.centery + endpoint1[1],
                    radius: (outer - inner) / 2,
                    start:  angle,
                    end:    angle + RGraph.SVG.TRIG.PI,
                    lineto: false,
                    moveto: false
                });

            } else {
                endPath1 = '';
            }
            

            var arcPath2 = RGraph.SVG.TRIG.getArcPath3({
                svg:           this.svg,
                cx:            this.centerx,
                cy:            this.centery,
                radius:        inner,
                start:         angle,
                end:           0,
                anticlockwise: true
            });


            
            // Draw a round end
            if (properties.ends === 'round') {
                var endPath2 = RGraph.SVG.TRIG.getArcPath3({
                    svg:     this.svg,
                    cx:      this.centerx,
                    cy:      this.centery - inner - ((outer - inner) / 2),
                    radius:  (outer - inner) / 2,
                    start:   RGraph.SVG.TRIG.PI,
                    end:     RGraph.SVG.TRIG.TWOPI,
                    lineto:  true
                });
            } else {
                endPath2 = '';
            }

            return    arcPath1
                    + ' ' + endPath1
                    + ' ' + arcPath2
                    + ' ' + endPath2
                    + ' z';
        };








        //
        // Highlights a bar when it has been clicked
        //
        // @param el object The element that has been clicked on
        //
        this.highlight = function (el)
        {
            var group       = el.parentNode,
                index       = group.getAttribute('data-index'),
                radiusInner = parseFloat(group.getAttribute('data-radius-inner')),
                radiusOuter = parseFloat(group.getAttribute('data-radius-outer')),
                angle       = parseFloat(group.getAttribute('data-end-angle'));



            // Create a group for the highlight
            var highlightGroup = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: this.svg.all,
                attr: {
                    fill:   properties.highlightFill,
                    stroke: properties.highlightStroke,
                },
                style: {
                    pointerEvents: 'none'
                }
            });



            // Get the path for the highlight node
            var arcPath = this.pathBar({
                radiusInner: radiusInner,
                radiusOuter: radiusOuter,
                      angle: angle
            });




            // Create the highlight node
            var path = RGraph.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: highlightGroup, 
                attr: {
                    d:              arcPath,
                    'stroke-width': properties.highlightLinewidth,

                    'data-highlight':    'true',
                    'data-index':        index,
                    'data-centerx':      this.centerx,
                    'data-centery':      this.centery,
                    'data-angles-info':  'These angles are designed to be used with the RGraph.SVG.TRIG.getArcPath3() function',
                    'data-start-angle':  0,
                    'data-end-angle':    angle,
                    'data-radius-inner': radiusInner,
                    'data-radius-outer': radiusOuter
                }
            });








            this.nodes.highlight = highlightGroup;
            RGraph.SVG.REG.set('highlight', highlightGroup);
        };








        //
        // Removes any highlight from the chart
        //
        this.removeHighlight = function ()
        {
            var highlight = RGraph.SVG.REG.get('highlight');

            if (highlight && highlight.parentNode) {
                highlight.parentNode.removeChild(highlight);
            }
            
            RGraph.SVG.REG.set('highlight', null);
        };








        //
        // Draw the labels
        //
        this.drawLabels = function ()
        {
             // Draw the center label
            if (properties.labelsCenter) {

                var label = RGraph.SVG.numberFormat({
                    object:    this,
                    num:       this.value[properties.labelsCenterIndex].toFixed(properties.labelsCenterDecimals),
                    prepend:   properties.labelsCenterUnitsPre,
                    append:    properties.labelsCenterUnitsPost,
                    point:     properties.labelsCenterPoint,
                    thousand:  properties.labelsCenterThousand,
                    formatter: properties.labelsCenterFormatter
                });


                // Get the text configuration
                var textConf = RGraph.SVG.getTextConf({
                    object: this,
                    prefix: 'labelsCenter'
                });

                var text = RGraph.SVG.text({
                    object: this,
                    parent: this.svg.all,
                    tag:    'labels.center',
                    
                    text:   typeof properties.labelsCenterSpecific === 'string' ? properties.labelsCenterSpecific : label,
                    
                    x:      this.centerx + properties.labelsCenterOffsetx,
                    y:      this.centery + properties.labelsCenterOffsety,
                    
                    valign: properties.labelsCenterValign,
                    halign: properties.labelsCenterHalign,

                    font:   textConf.font,
                    size:   textConf.size,
                    bold:   textConf.bold,
                    italic: textConf.italic,
                    color:  textConf.color
                });

                // Store a reference to the center label
                this.nodes.labelsCenter = text;
            }









            if (properties.labels.length) {
                
                var textConf = RGraph.SVG.getTextConf({
                    object: this,
                    prefix: 'labels'
                });

                if (typeof properties.labels === 'string') {
                    properties.labels = RGraph.SVG.arrayPad({
                        array:  [],
                        length: this.value.length,
                        value:  properties.labels
                    });
                }

    
                // Loop thru the labels
                for (var i=0; i<properties.labels.length; ++i) {
    
                    if ( typeof properties.labels === 'object' && properties.labels.length && typeof properties.labels[i] === 'string' ) {

                        var text = RGraph.SVG.labelSubstitution({
                            object:    this,
                            text:      properties.labels[i],
                            index:     i,
                            value:     this.value[i],
                            decimals:  properties.labelsFormattedDecimals,
                            point:     properties.labelsFormattedPoint,
                            thousand:  properties.labelsFormattedThousand,
                            unitsPre:  properties.labelsFormattedUnitsPre,
                            unitsPost: properties.labelsFormattedUnitsPost,
                        });
                    }

                    RGraph.SVG.text({
                        object: this,
                        parent: this.svg.all,
                        
                         color: textConf.color,
                          font: textConf.font,
                          size: textConf.size,
                          bold: textConf.bold,
                        italic: textConf.italic,

                          text: text,

                             x: this.centerx - 5 + properties.labelsOffsetx - (properties.ends ? (properties.width / 2) : 0),
                             y: this.centery - this.radius + properties.marginInner + (i * properties.width) + (properties.width / 2) + (i * 2 * properties.marginInner) + properties.labelsOffsety,

                        valign: properties.labelsValign,
                        halign: properties.labelsHalign,
                  
                    background: properties.labelsBackground,
                  
                       padding: 2
                    });
                }
            }
        };








        //
        // Draw icons if they're wanted
        //
        this.drawIcons = function ()
        {
            if (RGraph.SVG.isArray(properties.icons))  {
                for (var i=0,images=[]; i<this.value.length; ++i) {
                    if (typeof properties.icons[i] === 'string' && properties.icons[i].length) {
    
                        // Use this to store the SVG image tags that are created in
                        var svg_images = [];
                        
                        // A reference to this chart object
                        var obj = this;


                        images[i]       = new Image();
                        images[i].src   = properties.icons[i];
                        images[i].index = i;

                        svg_images[i] = RGraph.SVG.create({
                            svg:  this.svg,
                            parent: this.svg.all,
                            type: 'image',
                            attr: {
                                href: properties.icons[i],
                                x: this.centerx + properties.iconsOffsetx - (properties.ends ? (properties.width / 2) : 0) + 5,
                                y: this.centery - this.radius + properties.marginInner + (i * properties.width) + (properties.width / 2) + (i * 2 * properties.marginInner) + properties.iconsOffsety,
                                index: i
                            }
                        });

                        // Set the width/height on the image if requested
                        if (typeof properties.iconsWidth === 'number')  svg_images[i].setAttribute('width', properties.iconsWidth);
                        if (typeof properties.iconsHeight === 'number') svg_images[i].setAttribute('height', properties.iconsHeight);

                        // Now move the SVG image as required
                        svg_images[i].onload = function ()
                        {
                            var index  = this.getAttribute('index'),
                                width  = properties.iconsWidth || images[index].width,
                                height = properties.iconsHeight || images[index].height;

                            // Reposition the image
                            //this.setAttribute('x', parseInt(this.getAttribute('x')) + (width / 2));
                            this.setAttribute('y', parseInt(this.getAttribute('y')) - (height / 2));
                        }
                    }
                }
            }
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (!Object.keys(this.originalColors).length) {
                this.originalColors = {
                    colors:          RGraph.SVG.arrayClone(properties.colors),
                    backgroundColor: RGraph.SVG.arrayClone(properties.backgroundColor)
                }
            }


            // colors
            var colors = properties.colors;

            if (colors) {
                for (var i=0; i<colors.length; ++i) {
                    colors[i] = RGraph.SVG.parseColorLinear({
                        object: this,
                         color: colors[i],
                         start: this.centerx - this.radius,
                           end: this.centerx + this.radius,
                           direction: 'horizontal'
                    });
                }
            }
            
            // Background color
            properties.backgroundColor = RGraph.SVG.parseColorLinear({
                object: this,
                color: properties.backgroundColor,
                start: properties.marginLeft,
                  end: this.width - properties.marginRight,
                  direction: 'horizontal'
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
        // This function returns the pertinent angle for a particular click (or other mouse event)
        // 
        // @param obj e The event object
        //                      OR
        //        int e An integer value for
        //              which to the relevant
        //              angle
        //
        this.getAngle = function (e)
        {
            if (typeof e === 'number') {
                var angle = ((e - this.min) / (this.max - this.min)) * RGraph.SVG.TRIG.TWOPI;
                    angle -= RGraph.SVG.TRIG.HALFPI;

            } else {
                var mouseX = e.offsetX,
                    mouseY = e.offsetY;
    
                var angle = RGraph.SVG.TRIG.getAngleByXY({
                    cx: this.centerx,
                    cy: this.centery,
                    x:  mouseX,
                    y:  mouseY
                });
                
                angle -= RGraph.SVG.TRIG.HALFPI;
            }
    
            return angle;
        };








        //
        // This function returns the pertinent value for a particular click (or other mouse event)
        // 
        // @param obj e The event object
        //              
        //
        this.getValue = function (e)
        {
            // Treat the argument as an angle (given in radians)
            if (typeof e === 'number') {
                var angle = e;
                
            // Treat the argument as an event object
            } else {
                // Get the angle of the click
                var angle = this.getAngle(e);
            }

            // Calculate the value based on the angle and min/max values
            var value = (((angle + RGraph.SVG.TRIG.HALFPI) / RGraph.SVG.TRIG.TWOPI) * (this.max - this.min)) + this.min;

            // Ensure that the value is in range
            value = Math.max(value, this.min);
            value = Math.min(value, this.max);

            return value;
        };








        //
        // This function returns the pertinent radius (from the centerx/y) of a given event object
        // (eg from a click or mouse event).
        // 
        // @param obj e The event object
        //
        this.getRadius = function (e)
        {
            var x = e.offsetX,
                y = e.offsetY;

            var radius = RGraph.SVG.TRIG.getHypLength({
                x1: x,
                y1: y,
                x2: this.centerx,
                y2: this.centery
            });
            
            return radius;
        };








        //
        // SVG Activity meter grow()
        // 
        // This effect gradually increases the represented value
        // 
        // @param              An object of options - eg: {frames: 60}
        // @param function     An optional callback function
        //
        this.grow = function ()
        {
            var obj = this;


            //
            // Convert the value to an array if its a number
            //
            if (typeof this.value === 'number') {
                this.value = [this.value];
            }

            //this.currentValue = this.currentValue || obj.min;
            if (RGraph.SVG.isNull(this.currentValue)) {
                
                this.currentValue = [];
                
                for (var i=0; i<this.value.length; ++i) {
                    this.currentValue[i] = this.min;
                }
            }

            var opt      = arguments[0] || {},
                frames   = opt.frames || 30,
                frame    = 0,
                diff     = [],
                step     = [],
                callback = arguments[1] || function () {},
                initial  = [];

            // Set a few properties too by looping through the data
            for (var i=0; i<this.value.length; ++i) {
                diff[i] = this.value[i] - this.currentValue[i];
                step[i] = diff[i] / frames;
                initial[i] = this.currentValue[i];
            }





            function iterator ()
            {
                for (var i=0; i<obj.value.length; ++i) {
                    obj.value[i] = initial[i] + (frame * step[i]);
                }
                
                // Increment the frame
                frame++;
    
                RGraph.SVG.clear(obj.svg);
                RGraph.SVG.redraw();
            
                if (frame <= frames) {
                    RGraph.SVG.FX.update(iterator);
                } else {
                    callback(obj);
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
            var indexes = [0, opt.index];

            return {
                  index: indexes[1],
                dataset: indexes[0],
        sequentialIndex: indexes[1],
                  value: this.value[indexes[1]],
                 values: [this.value[indexes[1]]]
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
            return {
                label: (RGraph.SVG.isArray(properties.tooltipsFormattedKeyLabels) && typeof properties.tooltipsFormattedKeyLabels[specific.index] === 'string') ? properties.tooltipsFormattedKeyLabels[specific.index] : properties.labels[specific.index],
                color: (RGraph.SVG.isArray(properties.tooltipsFormattedKeyColors) && properties.tooltipsFormattedKeyColors[specific.index]) ? properties.tooltipsFormattedKeyColors[specific.index] : properties.colors[specific.index],
                value: this.value[specific.index]
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
                svgXY       = RGraph.SVG.getSVGXY(obj.svg),
                radiusOuter = parseFloat(this.nodes.bars[index].firstChild.getAttribute('data-radius-outer')),
                radiusInner = parseFloat(this.nodes.bars[index].firstChild.getAttribute('data-radius-inner')),
                start       = parseFloat(this.nodes.bars[index].firstChild.getAttribute('data-start-angle')) - RGraph.SVG.TRIG.HALFPI;
                end         = parseFloat(this.nodes.bars[index].firstChild.getAttribute('data-end-angle')) - RGraph.SVG.TRIG.HALFPI;



            var endpoint = RGraph.SVG.TRIG.getRadiusEndPoint({
                    cx: this.centerx,
                    cy: this.centery,
                radius: radiusInner + ((radiusOuter - radiusInner) / 2) ,
                 angle: ((end - start) / 2) + start
            });

            // Position the tooltip in the X direction
            args.tooltip.style.left = (
                  svgXY[0]                       // The X coordinate of the canvas
                + (this.centerx + endpoint[0])
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
            ) + 'px';

            // Position the tooltip in the Y direction
            args.tooltip.style.top  = (
                  svgXY[1]                          // The Y coordinate of the canvas
                + (this.centery + endpoint[1])      // The Y coordinate of the position
                - tooltip.offsetHeight              // The height of the tooltip
                - 10                                 // An arbitrary amount
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
    
    
    
        return this;
    };








// End module pattern
})(window, document);