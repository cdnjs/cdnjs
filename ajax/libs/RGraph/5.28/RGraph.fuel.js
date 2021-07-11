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

    RGraph = window.RGraph || {isrgraph:true,isRGraph:true,rgraph:true};

    //
    // The Fuel widget constructor
    //
    RGraph.Fuel = function (conf)
    {
        var id                        = conf.id,
            canvas                    = document.getElementById(id),
            min                       = conf.min,
            max                       = conf.max,
            value                     = conf.value;

        // Get the canvas and context objects
        this.id                = id;
        this.canvas            = canvas;
        this.context           = this.canvas.getContext ? this.canvas.getContext("2d", {alpha: (typeof id === 'object' && id.alpha === false) ? false : true}) : null;
        this.canvas.__object__ = this;
        this.type              = 'fuel';
        this.isRGraph          = true;
        this.isrgraph          = true;
        this.rgraph            = true;
        this.min               = RGraph.stringsToNumbers(min);
        this.max               = RGraph.stringsToNumbers(max);
        this.value             = RGraph.stringsToNumbers(value);
        this.angles            = {};
        this.currentValue      = null;
        this.uid               = RGraph.createUID();
        this.canvas.uid        = this.canvas.uid ? this.canvas.uid : RGraph.createUID();
        this.coordsText        = [];
        this.original_colors   = [];
        this.firstDraw         = true; // After the first draw this will be false

        // Check for support
        if (!this.canvas) {
            alert('[FUEL] No canvas support');
            return;
        }

        //
        // The funnel charts properties
        //
        this.properties =
        {
            centerx:                    null,
            centery:                    null,            
            radius:                     null,

            colors:                      ['red'],
            
            needleColor:                 'red',
            needleRadiusOffset:          45,
            
            marginLeft:                  5,
            marginRight:                 5,
            marginTop:                   5,
            marginBottom:                5,
            
            textSize:                    12,
            textColor:                   'black', // Does not support gradients
            textFont:                    'Arial, Verdana, sans-serif',
            textBold:                    false,
            textItalic:                  false,
            textAccessible:              true,
            textAccessibleOverflow:      'visible',
            textAccessiblePointerevents: false,
            
            contextmenu:                 null,
            
            annotatable:                 false,
            annotatableColor:            'black',
            
            adjustable:                  false,
            
            resizable:                   false,
            resizableHandleBackground:   null,
            
            icon:                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAfCAYAAAD0ma06AAAEGElEQVRIS7VXSyhtYRT+jnfe5FEMjAwUBiQGHikzRWIkkgy8YyDK+xnJK5JCeZSUGKBMiAyYkMxMJAMpSfJ+2/d8695/33NunSPnHqt2Z5+91/9/' + '/' + '/et9a/1b8Pn56dmMBhg/IWDgwNoNzc38PHxkXtN0+Tiexp9eH18fIDj1Bj63N/fw8vLS/wsmcHoqKmXT09PuL29RVFREU5OTvTJ6UIAgioQ+vLe09MTb29v8PX1RWBgICYnJ+XXIqDRWXN0dJT3nIDsWlpadP+lpSWZlD4KmL/8/' + '/7+Ls/S09N1/7y8PISHh+sK/QssDJWcHEyGCnB1dRUDAwPIzMzUx5GpAnZ1dcXy8jK2trbM5j06OsLc3JzISx8q4OzsLOOsAq6treHg4AAeHh4WJbq7u0Nzc7P+PiYmBnt7ezg9PcXExAQCAgLg5OSEx8dHuLu7Wwfc3t7G/v6+yEcjO8rIROGKaWdnZ+jr6zMDjI6OxvT0tDzr6uqS2KtksspwZ2cHjY2NuqSUhnHmilUCraysmElaWloKJpQCjI2NRX5+Pl5eXr6WlCv08/MTEMVOZDH+Zzw4CdlfX1/rDHt7ezE1NQXGkcYEKi4ulkVKYlpLGouBs/JiaGgIZL25uSlecXFxohAz/ccAz8/P4e/vj7q6Ojw8PMje5DNRy94MQ0JCUFtbK2wqKipE+sHBQbi4uPwMQ86ak5ODxMREVFdXIywsDCUlJRJDXnZlmJqaip6eHuTm5kqikGlycjIyMjL+ZrY9JSUgMzQiIgINDQ2ypaqqqkCZWXHsnjQEHB8fR0pKigAxabq7uyWOlJNxtLukTJDs7GxUVlZKDNl5oqKi8Pr6+jOAIyMjiI+Pl5JGQG4F1Qy+LN7f3fiUdGZmBsHBwRgbG8Pw8LD01ba2NmlX0rTtnTQLCwvSjEdHR3FxcSExLCwsRGRkpBR9vePzeMDyw3bT1NT0XXLiT4a7u7s4Pj4GGzd7K8GCgoKEsRR8I4Cm6hwHXV5eiv62GAE5npMTmFuBTCkzmzT7qs5Q9TlW/o6ODlvwhCHPM5SVPZIxYzNeXFxEa2srvL29YTC2GI3aMm3Zeq6urv4LMC0tDRsbG1K8k5KS9DgS0IwhKVFjSsJA22r9/f0oKCgQdvPz83JEmZ2dlcpD9maSshow0KZnlO8Csx9yK3BLKCMJPpf2xGMigdi9WXooaWdn53dxdP+amhrZh4eHh1hfX5cTW319vZyBnp+ffzNkBWBmhYaGysB/j322oCckJCArK0uGMlsJ5ubmBoPxRiMzFlomjr2MGdne3i5ANILRJEtJt6ysTG8h9gDl4am8vFwSUWron1O9LulXIOqk9pWftfdSS40yyj5Uh101wPRryuR7R1ZMX/U1pfy5IF40xcgUnGAc9wsGYxsFhy87kwAAAABJRU5ErkJggg==',
            iconRedraw:                  true,
            
            backgroundImageStretch:      false,
            backgroundImageX:            null,
            backgroundImageY:            null,
            backgroundImageW:            null,
            backgroundImageH:            null,
            backgroundImagealign:        null,
            
            labelsFull:                  'F',
            labelsFullOffsetx:           0,
            labelsFullOffsety:           0,
            labelsFullOffsetRadius:      0,
            labelsEmpty:                 'E',
            labelsEmptyOffsetx:          0,
            labelsEmptyOffsety:          0,
            labelsEmptyOffsetRadius:     0,
            labelsFont:                  null,
            labelsSize:                  null,
            labelsColor:                 null,
            labelsBold:                  null,
            labelsItalic:                null,
            
            scaleVisible:                false,
            scaleDecimals:               0,
            scaleUnitsPre:               '',
            scaleUnitsPost:              '',
            scalePoint:                  '.',
            scaleThousand:               ',',
            scaleLabelsCount:            5,
            
            clearto:                     'rgba(0,0,0,0)'
        }
        
        //
        // Bounds checking - if the value is outside the scale
        //
        if (this.value > this.max) this.value = this.max;
        if (this.value < this.min) this.value = this.min;




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
        // A setter
        // 
        // @param name  string The name of the property to set
        // @param value mixed  The value of the property
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
        // A getter
        // 
        // @param name  string The name of the property to get
        //
        this.get = function (name)
        {
            return properties[name];
        };








        //
        // The function you call to draw the bar chart
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
    
    
    
            //
            // Get the center X and Y of the chart. This is the center of the needle bulb
            //
            this.centerx = ((this.canvas.width - this.marginLeft - this.marginRight) / 2) + this.marginLeft;
            this.centery = this.canvas.height - 20 - this.marginBottom
    
    
    
            //
            // Work out the radius of the chart
            //
            this.radius = this.canvas.height - this.marginTop - this.marginBottom - 20;
            
                        //
            // Stop this growing uncntrollably
            //
            this.coordsText = [];
            
            
            
            //
            // You can now specify chart.centerx, chart.centery and chart.radius
            //
            if (typeof properties.centerx == 'number') this.centerx = properties.centerx;
            if (typeof properties.centery == 'number') this.centery = properties.centery;
            if (typeof properties.radius == 'number')  this.radius  = properties.radius;
    
    
    
    
            //
            // Parse the colors. This allows for simple gradient syntax
            //
            if (!this.colorsParsed) {
                this.parseColors();
                
                // Don't want to do this again
                this.colorsParsed = true;
            }
    
    
            //
            // The start and end angles of the chart
            //
            this.angles.start  = (RGraph.PI + RGraph.HALFPI) - 0.5;
            this.angles.end    = (RGraph.PI + RGraph.HALFPI) + 0.5;
            this.angles.needle = this.getAngle(this.value);
    
    
    
            //
            // Draw the labels on the chart
            //
            this.drawLabels();
    
    
            //
            // Draw the fuel guage
            //
            this.drawChart();
    
    
    
            
            
            //
            // Setup the context menu if required
            //
            if (properties.contextmenu) {
                RGraph.showContext(this);
            }
    
            
            //
            // This function enables resizing
            //
            if (properties.resizable) {
                RGraph.allowResizing(this);
            }
    
    
            //
            // This installs the event listeners
            //
            RGraph.installEventListeners(this);
    
    

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
        // This function actually draws the chart
        //
        this.drawChart = function ()
        {
            //
            // Draw the "Scale"
            //
            this.drawScale();
            
            // Place the icon on the canvas
            this.drawIcon();
    
    
    
            //
            // Draw the needle
            //
            this.drawNeedle();
        };








        //
        // Draws the labels
        //
        this.drawLabels = function ()
        {
            if (!properties.scaleVisible) {
                
                var radius = (this.radius - 20);
                
                this.context.fillStyle = properties.textColor;
                
                // Draw the left label
                var y = this.centery - Math.sin(this.angles.start - RGraph.PI) * (this.radius - 17 + properties.labelsEmptyOffsetRadius);
                var x = this.centerx - Math.cos(this.angles.start - RGraph.PI) * (this.radius - 17 + properties.labelsEmptyOffsetRadius);

                // Get the text configuration
                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'labels'
                });

                var ret = RGraph.text({
                
                  object: this,

                    font:   textConf.font,
                    size:   textConf.size,
                    color:  textConf.color,
                    bold:   textConf.bold,
                    italic: textConf.italic,

                    x:        x + properties.labelsEmptyOffsetx,
                    y:        y + properties.labelsEmptyOffsety,
                    
                    text:     properties.labelsEmpty,
                    
                    halign:   'left',
                    valign:   'top',
                    
                    tag:      'labels',
                    cssClass: RGraph.getLabelsCSSClassName({
                                object: this,
                                  name: 'labelsClass',
                                 index: 0
                              })
                });













                // Draw the right label
                var y = this.centery - Math.sin(this.angles.start - RGraph.PI) * (this.radius - 17 + properties.labelsFullOffsetRadius);
                var x = this.centerx + Math.cos(this.angles.start - RGraph.PI) * (this.radius - 17 + properties.labelsFullOffsetRadius);
                var ret = RGraph.text({
                
                  object:     this,

                    font:     textConf.font,
                    size:     textConf.size,
                   color:     textConf.color,
                    bold:     textConf.bold,
                  italic:     textConf.italic,

                    x:        x + properties.labelsFullOffsetx,
                    y:        y + properties.labelsFullOffsety,
                    
                    text:     properties.labelsFull,
                    
                    halign:   'right',
                    valign:   'top',
                    
                    tag:      'labels',
                    cssClass: RGraph.getLabelsCSSClassName({
                                object: this,
                                  name: 'labelsClass',
                                 index: 1
                              })
                });
            }

            // Add any CSS class to the text
            var className = '';
            
            if (typeof properties.labelsClass === 'string') {
                className = properties.labelsClass;
            } else if (typeof properties.labelsClass === 'object' && typeof properties.labelsClass[1] === 'string') {
                className = properties.labelsClass[1];
            }
            
            if (className && ret.node.className.indexOf(className) === -1) {
                ret.node.className += ' ' + className;
            }
        };








        //
        // Draws the needle
        //
        this.drawNeedle = function ()
        {
            // Draw the needle
            this.context.beginPath();
                this.context.lineWidth = 5;
                this.context.lineCap = 'round';
                this.context.strokeStyle = properties.needleColor;
    
                //
                // The angle for the needle
                //
                var angle = this.angles.needle;
    
                this.context.arc(this.centerx, this.centery, this.radius - properties.needleRadiusOffset, angle, angle + 0.0001, false);
                this.context.lineTo(this.centerx, this.centery);
            this.context.stroke();
            
            this.context.lineWidth = 1;
    
            // Create the gradient for the bulb
            var cx   = this.centerx + 10;
            var cy   = this.centery - 10

            var grad = this.context.createRadialGradient(cx, cy, 35, cx, cy, 0);
            grad.addColorStop(0, 'black');
            grad.addColorStop(1, '#eee');
    
            if (navigator.userAgent.indexOf('Firefox/6.0') > 0) {
                grad = this.context.createLinearGradient(cx + 10, cy - 10, cx - 10, cy + 10);
                grad.addColorStop(1, '#666');
                grad.addColorStop(0.5, '#ccc');
            }
    
            // Draw the bulb
            this.context.beginPath();
                this.context.fillStyle = grad;
                this.context.moveTo(this.centerx, this.centery);
                this.context.arc(this.centerx, this.centery, 20, 0, RGraph.TWOPI, 0);
            this.context.fill();
        };








        //
        // Draws the "scale"
        //
        this.drawScale = function ()
        {
            var a, x, y;
    
            //First draw the fill background
            this.context.beginPath();
                this.context.strokeStyle = 'black';
                this.context.fillStyle = 'white';
                this.context.arc(this.centerx, this.centery, this.radius, this.angles.start, this.angles.end, false);
                this.context.arc(this.centerx, this.centery, this.radius - 10, this.angles.end, this.angles.start, true);
            this.context.closePath();
            this.context.stroke();
            this.context.fill();
    
            //First draw the fill itself
            var start = this.angles.start;
            var end   = this.angles.needle;
    
            this.context.beginPath();
                this.context.fillStyle = properties.colors[0];
                this.context.arc(this.centerx, this.centery, this.radius, start, end, false);
                this.context.arc(this.centerx, this.centery, this.radius - 10, end, start, true);
            this.context.closePath();
            //this.context.stroke();
            this.context.fill();

            // This draws the tickmarks
            for (a = this.angles.start; a<=this.angles.end + 0.01; a+=((this.angles.end - this.angles.start) / 5)) {
                this.context.beginPath();
                    this.context.arc(this.centerx, this.centery, this.radius - 10, a, a + 0.0001, false);
                    this.context.arc(this.centerx, this.centery, this.radius - 15, a + 0.0001, a, true);
                this.context.stroke();
            }
            
            //
            // If chart.scale.visible is specified draw the textual scale
            //
            if (properties.scaleVisible) {

                this.context.fillStyle = properties.textColor;

                // The labels
                var numLabels  = properties.scaleLabelsCount;
                var decimals   = properties.scaleDecimals;
                var units_post = properties.scaleUnitsPost;
                var units_pre  = properties.scaleUnitsPre;
                var font       = properties.textFont;
                var size       = properties.textSize;
                var color      = properties.textColor;
                var bold       = properties.textBold;
                var italic     = properties.textItalic;

                for (var i=0; i<=numLabels; ++i) {
                    
                    a = ((this.angles.end - this.angles.start) * (i/numLabels)) + this.angles.start;
                    y = this.centery - Math.sin(a - RGraph.PI) * (this.radius - 17);
                    x = this.centerx - Math.cos(a - RGraph.PI) * (this.radius - 17);
                    

                    // Get the text configuration
                    var textConf = RGraph.getTextConf({
                        object: this,
                        prefix: 'labels'
                    });

                    RGraph.text({
                    
                      object: this,
    
                        font:   textConf.font,
                        size:   textConf.size,
                        color:  textConf.color,
                        bold:   textConf.bold,
                        italic: textConf.italic,
                        
                        x:      x,
                        y:      y,
                        text: RGraph.numberFormat({
                            object:    this,
                            number:    (this.min + ((this.max - this.min) * (i/numLabels))).toFixed(decimals),
                            unitspre:  units_pre,
                            unitspost: units_post,
                            point:     properties.scalePoint,
                            thousand:  properties.scaleThousand
                        }),
                        halign: 'center',
                        valign: 'top',
                        tag:    'scale'
                    });
                }
            }
        };








        //
        // A placeholder function that is here to prevent errors
        //
        this.getShape = function (e) {};








        //
        // This function returns the pertinent value based on a click
        // 
        // @param  object e An event object
        // @return number   The relevant value at the point of click
        //
        this.getValue = function (e)
        {
            var mouseXY = RGraph.getMouseXY(e);
            var angle   = RGraph.getAngleByXY(this.centerx, this.centery, mouseXY[0], mouseXY[1]);

            //
            // Boundary checking
            //
            if (angle >= this.angles.end) {
                return this.max;
            } else if (angle <= this.angles.start) {
                return this.min;
            }
    
            var value = (angle - this.angles.start) / (this.angles.end - this.angles.start);
                value = value * (this.max - this.min);
                value = value + this.min;
    
            return value;
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
            var mouseXY  = RGraph.getMouseXY(e);
            var angle    = RGraph.getAngleByXY(this.centerx, this.centery, mouseXY[0], mouseXY[1]);
            var accuracy = 15;

            var leftMin   = this.centerx - this.radius;
            var rightMax  = this.centerx + this.radius;
            var topMin    = this.centery - this.radius;
            var bottomMax = this.centery + this.radius;
    
            if (
                   mouseXY[0] > leftMin
                && mouseXY[0] < rightMax
                && mouseXY[1] > topMin
                && mouseXY[1] < bottomMax
                ) {
    
                return this;
            }
        };








        //
        // Draws the icon
        //
        this.drawIcon = function ()
        {
            if (!this.__icon__ || !this.__icon__.__loaded__) {
                var img = new Image();
                img.src = properties.icon;
                img.__object__ = this;
                this.__icon__ = img;
            
                img.onload = function (e)
                {
                    img.__loaded__ = true;
                    var obj = img.__object__;
                
                    obj.context.drawImage(img,obj.centerx - (img.width / 2), obj.centery - obj.radius + 35);
    
                    obj.drawNeedle();
    
                    if (properties.iconRedraw) {
                        obj.set('iconRedraw', false);
                        RGraph.clear(obj.canvas);
                        RGraph.redrawCanvas(obj.canvas);
                    }
                }
            } else {
                var img = this.__icon__;
                this.context.drawImage(img,this.centerx - (img.width / 2), this.centery - this.radius + 35);
            }
    
            this.drawNeedle();
        };








        //
        // This method handles the adjusting calculation for when the mouse is moved
        // 
        // @param object e The event object
        //
        this.adjusting_mousemove = function (e)
        {
            //
            // Handle adjusting for the Fuel gauge
            //
            if (properties.adjustable && RGraph.Registry.get('adjusting') && RGraph.Registry.get('adjusting').uid == this.uid) {
                this.value = this.getValue(e);
                RGraph.redrawCanvas(this.canvas);
                RGraph.fireCustomEvent(this, 'onadjust');
            }
        };








        //
        // This method gives you the relevant angle (in radians) that a particular value is
        // 
        // @param number value The relevant angle
        //
        this.getAngle = function (value)
        {
            // Range checking
            if (value < this.min || value > this.max) {
                return null;
            }
    
            var angle = (((value - this.min) / (this.max - this.min)) * (this.angles.end - this.angles.start)) + this.angles.start;
    
            return angle;
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors.colors      = RGraph.arrayClone(properties.colors);
                this.original_colors.needleColor = RGraph.arrayClone(properties.needleColor);
            }

            var colors = properties.colors;
    
            for (var i=0; i<colors.length; ++i) {
                colors[i] = this.parseSingleColorForLinearGradient(colors[i]);
            }
            
            properties.needleColor = this.parseSingleColorForRadialGradient(properties.needleColor);
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
        this.parseSingleColorForLinearGradient = function (color)
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
    
                for (var j=1; j<parts.length; ++j) {
                    grad.addColorStop(j * diff, RGraph.trim(parts[j]));
                }
            }
                
            return grad ? grad : color;
        };








        //
        // This parses a single color value
        //
        this.parseSingleColorForRadialGradient = function (color)
        {
            if (!color || typeof color != 'string') {
                return color;
            }
    
            if (color.match(/^gradient\((.*)\)$/i)) {
                
                var parts = RegExp.$1.split(':');
    
                // Create the gradient
                var grad = this.context.createRadialGradient(this.centerx, this.centery, 0, this.centerx, this.centery, this.radius);
    
                var diff = 1 / (parts.length - 1);
    
                grad.addColorStop(0, RGraph.trim(parts[0]));
    
                for (var j=1; j<parts.length; ++j) {
                    grad.addColorStop(j * diff, RGraph.trim(parts[j]));
                }
            }
                
            return grad ? grad : color;
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
        // Grow
        // 
        // The Fuel chart Grow effect gradually increases the values of the Fuel chart
        // 
        // @param object obj The graph object
        //
        this.grow = function ()
        {
            var callback  = arguments[1] || function () {};
            var opt       = arguments[0] || {};
            var numFrames = opt.frames || 30;
            var frame     = 0;
            var obj       = this;
            var origValue = Number(this.currentValue);
            
            if (this.currentValue == null) {
                this.currentValue = this.min;
                origValue = this.min;
            }
    
            var newValue  = this.value;
            var diff      = newValue - origValue;
            var step      = (diff / numFrames);
            var frame     = 0;
    
    
            function iterator ()
            {
                frame++;
    
                obj.value = ((frame / numFrames) * diff) + origValue
    
                if (obj.value > obj.max) obj.value = obj.max;
                if (obj.value < obj.min) obj.value = obj.min;
    
                RGraph.clear(obj.canvas);
                RGraph.redrawCanvas(obj.canvas);
    
                if (frame < numFrames) {
                    RGraph.Effects.updateCanvas(iterator);
                
                // The callback variable is always function
                } else  {
                    callback(obj);
                }
            }
    
            iterator();
            
            return this;
        };








        //
        // Now need to register all chart types. MUST be after the setters/getters are defined
        // 
        // *** MUST BE LAST IN THE CONSTRUCTOR ***
        //
        RGraph.register(this);








        //
        // This is the 'end' of the constructor so if the first argument
        // contains configuration data - handle that.
        //
        RGraph.parseObjectStyleConfig(this, conf.options);
    };