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
    var RG  = RGraph;
    RGraph.SVG.Gauge = function (conf)
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
                //
                // NB Don't need to do this for this chart type
                //if (name === 'colors') {
                //    this.originalColors = RGraph.SVG.arrayClone(value);
                //    this.colorsParsed = false;
                //}
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







        this.type            = 'gauge';
        this.innerMin        = RGraph.SVG.stringsToNumbers(conf.innerMin);
        this.innerMax        = RGraph.SVG.stringsToNumbers(conf.innerMax);
        this.outerMin        = RGraph.SVG.stringsToNumbers(conf.outerMin);
        this.outerMax        = RGraph.SVG.stringsToNumbers(conf.outerMax);
        this.value           = RGraph.SVG.stringsToNumbers(conf.value);
        this.angleStart      = 0 - RGraph.SVG.TRIG.HALFPI - (RGraph.SVG.TRIG.HALFPI / 2);
        this.angleEnd        = 0 + RGraph.SVG.TRIG.HALFPI + (RGraph.SVG.TRIG.HALFPI / 2);
        this.angleSpan       = this.angleEnd - this.angleStart;
        this.id              = conf.id;
        this.uid             = RGraph.SVG.createUID();
        this.container       = document.getElementById(this.id);
        this.layers          = {}; // MUST be before the SVG tag is created!
        this.svg             = RGraph.SVG.createSVG({
                                   object:    this,
                                   container: this.container
                               });
        this.isRGraph        = true;
        this.isrgraph        = true;
        this.rgraph          = true;
        this.width           = Number(this.svg.getAttribute('width'));
        this.height          = Number(this.svg.getAttribute('height'));

        this.colorsParsed    = false;
        this.originalColors  = {};
        this.gradientCounter = 1;
        this.nodes           = {};
        this.shadowNodes     = [];
        
        // Some bounds checking for the value
        if (this.value > this.innerMax) this.value = this.innerMax;
        if (this.value < this.innerMin) this.value = this.innerMin;







        // Add this object to the ObjectRegistry
        RGraph.SVG.OR.add(this);

        // Set the DIV container to be inline-block
        this.container.style.display = 'inline-block';

        this.properties =
        {
            centerx: null,
            centery: null,
            radius:  null,

            marginLeft:   35,
            marginRight:  35,
            marginTop:    35,
            marginBottom: 35,
            rmargin:      null, // This is set below
            
            backgroundFill: 'Gradient(white:#FEFEFE:#E6E6E6:#dedede)',
            backgroundStroke: '#ddd',

            linewidth:   1,
            colors: ['black','black'],
            innerGap:    5,

            tickmarksOuterSize: 3,
            tickmarksInnerSize: 3,
            tickmarksCount:     10,

            textColor:      'black',
            textFont:       'Arial, Verdana, sans-serif',
            textSize:       12 ,
            textBold:       false,
            textItalic:     false,
            
            labelsIngraph:           true,
            labelsIngraphFont:       null,
            labelsIngraphSize:       null,
            labelsIngraphBold:       null,
            labelsIngraphItalic:     null,
            labelsIngraphColor:      null,
            labelsIngraphUnitsPre:   '',
            labelsIngraphUnitsPost:  '',
            labelsIngraphThousand:   ',',
            labelsIngraphPoint:      '.',
            labelsIngraphFormatter:  null,
            labelsIngraphDecimals:   0,
            labelsIngraphPadding:    3,
            labelsIngraphBackground: 'Gradient(#ddd:#eee)',
            labelsIngraphRounded:    2,

            scaleInnerFont:      null,
            scaleInnerSize:      null,
            scaleInnerBold:      null,
            scaleInnerItalic:    null,
            scaleInnerColor:     null,
            scaleInnerUnitsPre:  '',
            scaleInnerUnitsPost: '',
            scaleInnerPoint:     '.',
            scaleInnerThousand:  ',',
            scaleInnerDecimals:  0,
            scaleInnerFormatter: null,
            scaleInnerLabelsCount: 10,
            scaleInnerRound:       false,

            scaleOuter:          true,
            scaleOuterFont:      null,
            scaleOuterSize:      null,
            scaleOuterBold:      null,
            scaleOuterItalic:    null,
            scaleOuterColor:     null,
            scaleOuterUnitsPre:  '',
            scaleOuterUnitsPost: '',
            scaleOuterPoint:     '.',
            scaleOuterThousand:  ',',
            scaleOuterDecimals:  0,
            scaleOuterFormatter: null,
            scaleOuterLabelsCount: 10,
            scaleOuterRound:       false,
            
            shadow:        false,
            shadowOffsetx: 2,
            shadowOffsety: 2,
            shadowOpacity: 0.25,
            shadowBlur:    2,

            title:       '',
            titleX:      null,
            titleY:      null,
            titleHalign: 'center',
            titleValign: 'bottom',
            titleSize:   null,
            titleColor:  null,
            titleFont:   null,
            titleBold:   null,
            titleItalic: null,

            titleSubtitle:       null,
            titleSubtitleSize:   null,
            titleSubtitleColor:  '#aaa',
            titleSubtitleFont:   null,
            titleSubtitleBold:   null,
            titleSubtitleItalic: null,
            
            needleColor: '#666',
            
            centerpinRadius: 15,
            
            adjustable: false
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


            // Reset this to prevent it from growing
            this.nodes = {};

            // Should be the first thing that's done inthe.draw() function
            // except for the onbeforedraw event
            this.width  = Number(this.svg.getAttribute('width'));
            this.height = Number(this.svg.getAttribute('height'));



            // Create the defs tag if necessary
            RGraph.SVG.createDefs(this);



            // Add these
            this.graphWidth  = this.width - properties.marginLeft - properties.marginRight;
            this.graphHeight = this.height - properties.marginTop  - properties.marginBottom;

            // If a title is specified then adjust the centery down
            //
            // NO LONGER NECESSARY NOW THAT THE drawTitle() FUNCTION HAS BEEN
            // REWRITTEN
            //
            //if (properties.title.length > 0) {
            //    this.graphHeight -= properties.marginTop;
            //}

            // Work out the center point
            this.centerx = (this.graphWidth / 2) + properties.marginLeft;
            this.centery = (this.graphHeight / 2) + properties.marginTop;
            this.radius  = Math.min(this.graphWidth / 2, this.graphHeight / 2);
            




            // Allow the user to override the calculated centerx/y/radius
            this.centerx = typeof properties.centerx === 'number' ? properties.centerx : this.centerx;
            this.centery = typeof properties.centery === 'number' ? properties.centery : this.centery;
            this.radius  = typeof properties.radius  === 'number' ? properties.radius  : this.radius;

            // Allow the centerx/centery/radius to be a plus/minus
            if (typeof properties.radius  === 'string' && properties.radius.match(/^\+|-\d+$/) )   this.radius  += parseFloat(properties.radius);
            if (typeof properties.centerx === 'string' && properties.centerx.match(/^\+|-\d+$/) ) this.centery += parseFloat(properties.centerx);
            if (typeof properties.centery === 'string' && properties.centery.match(/^\+|-\d+$/) ) this.centerx += parseFloat(properties.centery);

            
            
            
            // Parse the colors for gradients
            RGraph.SVG.resetColorsToOriginalValues({object:this});
            this.parseColors();




            // Change the rmargin if it wasnt set manually
            if (properties.rmargin === null) {
                if (properties.scaleOuter) {
                    properties.rmargin = 40;
                } else {
                    properties.rmargin = 25;
                }
            }






            // Draw the meter
            this.drawMeter();


            // Draw the needle
            this.drawNeedle();
            
            

            // Draw the ingraph label
            if (properties.labelsIngraph) {
                this.drawIngraph();
            }



            // Draw the title and subtitle
            RGraph.SVG.drawTitle(this);


            // Ajusting
            if (properties.adjustable) {
                
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

                    var radius = RGraph.SVG.TRIG.getHypLength({
                        x1: mouseX,
                        y1: mouseY,
                        x2: obj.centerx,
                        y2: obj.centery,
                        object: obj
                    });

                    if (radius > obj.radius) {
                        return;
                    }

                    var value = obj.getValue(e);

                    obj.value = value;
                    obj.drawNeedle();
                };
                
                // Create a reference so that code thats inside
                // the event listeners can easily access the
                // object
                
                this.container.addEventListener('mousedown', function (e)
                {
                    obj.adjusting_mousedown = true;
                    func(e);
                }, false);
                
                this.container.addEventListener('mousemove', function (e)
                {
                    if (obj.adjusting_mousedown) {
                        func(e);
                    }
                }, false);
                
                window.addEventListener('mouseup', function (e)
                {
                    obj.adjusting_mousedown = false;
                }, false);
            }




            // Fire the draw event
            RGraph.SVG.fireCustomEvent(this, 'ondraw');


            return this;
        };








        // Generate the inner scale
        this.drawMeter = function ()
        {
            // Generate the Inner scale
            this.scaleInner = RGraph.SVG.getScale({
                object:    this,
                numlabels: properties.scaleInnerLabelsCount,
                unitsPre:  properties.scaleInnerUnitsPre,
                unitsPost: properties.scaleInnerUnitsPost,
                max:       this.innerMax,
                min:       this.innerMin,
                point:     properties.scaleInnerPoint,
                round:     properties.scaleInnerRound,
                thousand:  properties.scaleInnerThousand,
                decimals:  properties.scaleInnerDecimals,
                strict:    true,
                formatter: properties.scaleInnerFormatter
            });

            // Generate the outer scale
            this.scaleOuter = RGraph.SVG.getScale({
                object:    this,
                numlabels: properties.scaleOuterLabelsCount,
                unitsPre:  properties.scaleOuterUnitsPre,
                unitsPost: properties.scaleOuterUnitsPost,
                max:       this.outerMax,
                min:       this.outerMin,
                point:     properties.scaleOuterPoint,
                round:     properties.scaleOuterRound,
                thousand:  properties.scaleOuterThousand,
                decimals:  properties.scaleOuterDecimals,
                strict:    true,
                formatter: properties.scaleOuterFormatter
            });

            // If a shadow is requested - define it
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


            // Draw the background circle
            this.nodes.background = RGraph.SVG.create({
                svg: this.svg,
                type: 'circle',
                parent: this.svg.all,
                attr: {
                    cx: this.centerx,
                    cy: this.centery,
                    r: this.radius,
                    stroke: properties.backgroundStroke,
                    fill: properties.backgroundFill,
                    filter: properties.shadow ? 'url(#dropShadow)' : ''
                }
            });


            // Create the axis groups
            this.nodes.innerAxisGroup = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: this.svg.all,
                attr: {
                    id: 'innerAxisGroup',
                }
            });


            this.nodes.outerAxisGroup = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: this.svg.all,
                attr: {
                    id: 'outerAxisGroup',
                }
            });





            //
            // Draw the circular lines
            //
            var innerPath = RGraph.SVG.TRIG.getArcPath3({
                cx: this.centerx,
                cy: this.centery,
                r:  this.radius - properties.innerGap - properties.rmargin,
                start: this.angleStart,
                end: this.angleEnd,
                anticlockwise: false,
                lineto: false
            });

            var inner = RGraph.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: this.nodes.innerAxisGroup,
                attr: {
                    d: innerPath,
                    stroke: properties.colors[1],
                    fill: 'transparent',
                    'stroke-width': properties.linewidth
                }
            });














            // Draw the outer partial circle
            var outerPath = RGraph.SVG.TRIG.getArcPath3({
                cx: this.centerx,
                cy: this.centery,
                r:  this.radius - properties.rmargin,
                start: this.angleStart,
                end: this.angleEnd,
                anticlockwise: false,
                lineto: false
            });

            var outer = RGraph.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: this.nodes.outerAxisGroup,
                attr: {
                    d: outerPath,
                    stroke: properties.colors[0],
                    fill: 'transparent',
                    'stroke-width': properties.linewidth
                }
            });
            
            // Store references to the circles
            this.nodes.outerAxis = outerPath;
            this.nodes.innerAxis = innerPath;

















            var numticks  = properties.tickmarksCount,
                gap       = this.angleSpan / numticks,
                numlabels = properties.tickmarksCount;



            //
            // Get the text configurations
            //
            var textConfOuter = RGraph.SVG.getTextConf({
                object: this,
                prefix: 'scaleOuter'
            });
            
            var textConfInner = RGraph.SVG.getTextConf({
                object: this,
                prefix: 'scaleInner'
            });


            for (var i=0; i<=numticks; ++i) {

                if (properties.scaleOuter) {
                    
                    // Draw the OUTER tickmarks
                    var path_a = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  this.radius - properties.rmargin,
                        start: this.angleStart + (i * gap),
                        end: this.angleStart + (i * gap),
                        anticlockwise: false,
                        lineto: false
                    });
        
                    var path_b = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  this.radius + properties.tickmarksOuterSize - properties.rmargin,
                        start: this.angleStart + (i * gap),
                        end: this.angleStart + (i * gap),
                        anticlockwise: false,
                        lineto: true
                    });
        
                    RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: this.nodes.outerAxisGroup,
                        attr: {
                            d: path_a + ' ' + path_b,
                            stroke: properties.colors[0],
                            fill: 'transparent',
                            'stroke-width': properties.linewidth,
                            'stroke-linecap':  'square'
                        }
                    });

                    //
                    // Determine the correct gap for the outer labels#
                    //
                    var outerLabelGap = (this.angleEnd - this.angleStart) / properties.scaleOuterLabelsCount;

                    // Calculate the coordinates for the text label
                    var coords = RGraph.SVG.TRIG.toCartesian({
                        cx:    this.centerx,
                        cy:    this.centery,
                        r:     this.radius + properties.tickmarksOuterSize + 10 - properties.rmargin,
                        angle: this.angleStart - RGraph.SVG.TRIG.HALFPI + (i * outerLabelGap)
                    });
                    
                    var halign = (coords.x > this.centerx ? 'left' : 'right');
    
                    if (i / numlabels === 0.5) {
                        halign = 'center';
                    }

                    var zerolabel = RGraph.SVG.numberFormat({
                        object:   this,
                        prepend:  properties.scaleOuterUnitsPre,
                        append:   properties.scaleOuterUnitsPost,
                        num:      this.outerMin.toFixed(properties.scaleOuterDecimals),
                        point:    properties.scaleOuterPoint,
                        thousand: properties.scaleOuterThousand
                    });
                    
                    if (typeof properties.scaleOuterFormatter === 'function') {
                        zerolabel = (properties.scaleOuterFormatter)(zerolabel);
                    }
    
                    // Add an outer text label
                    var textnode = RGraph.SVG.text({
                        object:     this,
                        svg:        this.svg,
                        parent:     this.nodes.outerAxisGroup,
                        tag:        'scale.outer',
                        text:       (i === 0 ? zerolabel : this.scaleOuter.labels[i - 1]),
                        x:          coords.x,
                        y:          coords.y,
                        halign:     halign,
                        valign:     'center',
                        padding:    2,
                        
                        size:       textConfOuter.size,
                        color:      textConfOuter.color,
                        bold:       textConfOuter.bold,
                        italic:     textConfOuter.italic,
                        font:       textConfOuter.font
                    });
                    
                    textnode.style.pointerEvents = 'none';
                } else {



                    // Close the circles



                    var path_a = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  this.radius - properties.rmargin,
                        start: this.angleStart,
                        end: this.angleStart,
                        anticlockwise: false,
                        lineto: false
                    });
        
                    var path_b = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  this.radius - properties.innerGap - properties.rmargin,
                        start: this.angleStart,
                        end: this.angleStart,
                        anticlockwise: false,
                        lineto: true
                    });
        
                    RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: this.nodes.innerAxisGroup,
                        attr: {
                            d: path_a + path_b,
                            stroke: properties.colors[1],
                            fill: 'transparent',
                            'stroke-width': properties.linewidth,
                            'stroke-linecap':  'square'
                        }
                    });






                    var path_a = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  this.radius - properties.rmargin,
                        start: this.angleEnd,
                        end: this.angleEnd,
                        anticlockwise: false,
                        lineto: false
                    });
        
                    var path_b = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  this.radius - properties.innerGap - properties.rmargin,
                        start: this.angleEnd,
                        end: this.angleEnd,
                        anticlockwise: false,
                        lineto: true
                    });
        
                    RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: this.nodes.innerAxisGroup,
                        attr: {
                            d: path_a + path_b,
                            stroke: properties.colors[1],
                            fill: 'transparent',
                            'stroke-width': properties.linewidth,
                            'stroke-linecap':  'square'
                        }
                    });

                }
    
    
    
    
    
    
    
    
                // Draw the INNER tickmarks




                var path_a = RGraph.SVG.TRIG.getArcPath3({
                    cx: this.centerx,
                    cy: this.centery,
                    r:  this.radius - properties.rmargin - properties.innerGap,
                    start: this.angleStart + (i * gap),
                    end: this.angleStart + (i * gap),
                    anticlockwise: false,
                    lineto: false
                });
                
                var path_b = RGraph.SVG.TRIG.getArcPath3({
                    cx: this.centerx,
                    cy: this.centery,
                    r:  this.radius  - properties.innerGap - properties.tickmarksOuterSize - properties.rmargin,
                    start: this.angleStart + (i * gap),
                    end: this.angleStart + (i * gap),
                    anticlockwise: false,
                    lineto: true
                });

                RGraph.SVG.create({
                    svg: this.svg,
                    type: 'path',
                    parent: this.nodes.innerAxisGroup,
                    attr: {
                        d: path_a + ' ' + path_b,
                        stroke: properties.colors[1],
                        fill: 'transparent',
                        'stroke-width': properties.linewidth,
                        'stroke-linecap':  'square'
                    }
                });


                //
                // Determine the correct gap for the outer labels#
                //
                var innerLabelGap = (this.angleEnd - this.angleStart) / properties.scaleInnerLabelsCount;


                // Calculate the coordinates for the text label
                var coords = RGraph.SVG.TRIG.toCartesian({
                    cx:    this.centerx,
                    cy:    this.centery,
                    r:     this.radius - properties.innerGap - properties.tickmarksInnerSize - 10 - properties.rmargin,
                    angle: this.angleStart - RGraph.SVG.TRIG.HALFPI + (i * innerLabelGap)
                });
                
                var halign = (coords.x > this.centerx ? 'right' : 'left');


                var zerolabel = RGraph.SVG.numberFormat({
                    object:   this,
                    prepend:  properties.scaleInnerUnitsPre,
                    append:   properties.scaleInnerUnitsPost,
                    num:      this.innerMin.toFixed(properties.scaleInnerDecimals),
                    point:    properties.scaleInnerPoint,
                    thousand: properties.scaleInnerThousand
                });
                
                if (typeof properties.scaleInnerFormatter === 'function') {
                    zerolabel = (properties.scaleInnerFormatter)(zerolabel);
                }

                // Change the horizontal alignment for the center label
                if (
                       coords.x > (this.centerx - 2)
                    && coords.x < (this.centerx + 2)
                   ) {
                    halign = 'center';
                }

                // Add an inner text label
                RGraph.SVG.text({
                    object:     this,
                    svg:        this.svg,
                    parent:     this.nodes.innerAxisGroup,
                    tag:        'scale.inner',
                    
                    text:       (i === 0 ? zerolabel : this.scaleInner.labels[i - 1]),

                    x:          coords.x,
                    y:          coords.y,
                    halign:     halign,
                    valign:     'center',
                    padding:    2,

                    size:       textConfInner.size,
                    color:      textConfInner.color,
                    bold:       textConfInner.bold,
                    italic:     textConfInner.italic,
                    font:       textConfInner.font
                });
            }
        };








        // Draws the label that sits below the needle,
        // inside the meter
        this.drawIngraph = function ()
        {
            // If the group already exists remove it
            if (this.nodes.labelsIngraphGroup) {
                this.nodes.labelsIngraphGroup.parentNode.removeChild(this.nodes.labelsIngraphGroup);
            }

            this.nodes.labelsIngraphGroup = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: this.svg.all,
                attr: {
                    id: 'labelsIngraphGroup',
                }
            });
            
            // Get the text configuration
            var textConf = RGraph.SVG.getTextConf({
                object: this,
                prefix: 'labelsIngraph'
            });

            this.nodes.labelsIngraph = RGraph.SVG.text({
                object: this,
                parent: this.nodes.labelsIngraphGroup,
                text:   RGraph.SVG.numberFormat({
                    prepend:   properties.labelsIngraphUnitsPre,
                    append:    properties.labelsIngraphUnitsPost,
                    point:     properties.labelsIngraphPoint,
                    thousand:  properties.labelsIngraphThousand,
                    formatter: properties.labelsIngraphFormatter,
                    num:       this.value.toFixed(properties.labelsIngraphDecimals)
                }),
                x:                 this.centerx,
                y:                 this.centery + this.radius - properties.rmargin - 30,
                background:        properties.labelsIngraphBackground,
                backgroundRounded: properties.labelsIngraphRounded,
                padding:           properties.labelsIngraphPadding,
                halign:            'center',
                valign:            'center',
                
                size:              textConf.size,
                bold:              textConf.bold,
                italic:            textConf.italic,
                font:              textConf.font,
                color:             textConf.color
            });
            
            // Add a border to the rect
            var rect = this.nodes.labelsIngraph.previousSibling;
            
            rect.setAttribute('stroke', '#aaa');

            // Prevent clicks on the label from affecting the rest of the
            // chart if adjusting is enabled
            var func = function (e) {e.stopPropagation();};
            
            rect.addEventListener('mousedown', func, false);
            this.nodes.labelsIngraph.addEventListener('mousedown', func, false);
        };








        // Draws the needle of the meter.
        //
        // This function is used by the adkusting feature to redraw just
        // the needle instead of redrawing the whole chart
        //
        this.drawNeedle = function ()
        {
            // Remove any pre-existing needle
            if (this.nodes.needleGroup) {
                this.nodes.needleGroup.parentNode.removeChild(this.nodes.needleGroup);
            }



            this.nodes.needleGroup = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: this.svg.all,
                attr: {
                    id: 'needle-group',
                    fill: properties.needleColor,
                    stroke: properties.needleColor
                }
            });
            
            
            
            

            // Calculate the end coords of the needle
            var angle = (this.value - this.innerMin) / (this.innerMax - this.innerMin) * this.angleSpan;
                angle += RGraph.SVG.TRIG.HALFPI + (RGraph.SVG.TRIG.HALFPI / 2);

            // These are the coords of the tip of the needle
            var coords = RGraph.SVG.TRIG.toCartesian({
                cx:    this.centerx,
                cy:    this.centery,
                r:     this.radius - 60,
                angle: angle
            });

            // These are the coords of the left of the needle
            var coords2 = RGraph.SVG.TRIG.toCartesian({
                cx:    this.centerx,
                cy:    this.centery,
                r:     properties.centerpinRadius,
                angle: angle - RGraph.SVG.TRIG.HALFPI
            });

            // These are the coords of the right of the needle
            var coords3 = RGraph.SVG.TRIG.toCartesian({
                cx:    this.centerx,
                cy:    this.centery,
                r:     properties.centerpinRadius,
                angle: angle + RGraph.SVG.TRIG.HALFPI
            });

            // Now draw the needle
            RGraph.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: this.nodes.needleGroup,
                attr: {
                    'stroke-width': 1,
                    'stroke-linecap': "round",
                    d: 'M{1} {2} L{3} {4} L{5} {6} z'.format(
                        coords.x,
                        coords.y,
                        coords2.x,
                        coords2.y,
                        coords3.x,
                        coords3.y
                        
                    )
                }
            });

            // Draw a center circle
            RGraph.SVG.create({
                svg: this.svg,
                type: 'circle',
                parent: this.nodes.needleGroup,
                attr: {
                    cx:this.centerx,
                    cy: this.centery,
                    r: properties.centerpinRadius
                }
            });
                    
            
            
            
            // Update the ingraph label if it's enabled
            if (properties.labelsIngraph) {
                this.drawIngraph();
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
                    colors:                  RGraph.SVG.arrayClone(properties.colors),
                    backgroundFill:          RGraph.SVG.arrayClone(properties.backgroundFill),
                    backgroundStroke:        RGraph.SVG.arrayClone(properties.backgroundStroke),
                    labelsIngraphBackground: RGraph.SVG.arrayClone(properties.labelsIngraphBackground)
                }
            }

            // backgroundFill
            properties.backgroundFill = RGraph.SVG.parseColorLinear({
                object: this,
                color: properties.backgroundFill,
                start: properties.marginTop,
                  end: this.height - properties.marginBottom,
                direction: 'vertical'
            });

            // backgroundStroke
            properties.backgroundStroke = RGraph.SVG.parseColorLinear({
                object: this,
                color: properties.backgroundStroke,
                start: properties.marginTop,
                  end: this.height - properties.marginBottom,
                direction: 'vertical'
            });

            // labelsIngraphBackground
            properties.labelsIngraphBackground = RGraph.SVG.parseColorLinear({
               object: this,
                color: properties.labelsIngraphBackground,
            direction: 'vertical',
        gradientUnits: 'objectBoundingBox'
            });
        };








        // Returns the value of a click
        //
        // @param e object The event object
        this.getValue = function (e)
        {
            var mouseX  = e.offsetX,
                mouseY  = e.offsetY;
            
            if (RGraph.SVG.ISFF) {
                mouseX = e.pageX - e.currentTarget.offsetLeft;
                mouseY = e.pageY - e.currentTarget.offsetTop;
            }

            var angle = RGraph.SVG.TRIG.getAngleByXY({
                cx: this.centerx,
                cy: this.centery,
                x: mouseX,
                y: mouseY
            });

            if (mouseX < this.centerx) {
                angle = angle - RGraph.SVG.TRIG.TWOPI;
            }

            var value = ((angle - this.angleStart) / (this.angleEnd - this.angleStart));
            value = value * (this.innerMax - this.innerMin);
            value = value + this.innerMin;
        
            if (value < this.innerMin) value = this.innerMin;
            if (value > this.innerMax) value = this.innerMax;

            return value;
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