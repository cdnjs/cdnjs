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

    //
    // This is a library of a few functions that make it easier to do
    // effects like fade-ins or eaxpansion.
    //

    //
    // Initialise the various objects
    //
    RGraph        = window.RGraph || {isrgraph:true,isRGraph:true,rgraph:true};
    RGraph.SVG    = RGraph.SVG    || {};
    RGraph.SVG.FX = RGraph.SVG.FX || {};

// Module pattern
(function (win, doc, undefined)
{
    //
    // This functions adds the generic effects to thechart object
    // 
    // @param object obj The chart object
    //
    RGraph.SVG.FX.decorate = function (obj)
    {
        for (i in RGraph.SVG.FX) {
            if (typeof RGraph.SVG.FX[i] === 'function') {
                obj[i] = RGraph.SVG.FX[i];
            }
        }
    };








    //
    // fadeIn
    // 
    // This function simply uses the CSS opacity property - initially set to zero and
    // increasing to 1 over the period of 0.5 second
    //
    RGraph.SVG.FX.fadein = function ()
    {
        // This function gets added to the chart object - so the this
        // variable is the chart object
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            duration = (frames / 60) * 1000,
            frame    = 0,
            callback = opt.callback || function () {};


        // Initially the opacity should be zero
        obj.svg.style.opacity = 0;
        
        // Draw the chart
        RGraph.SVG.redraw(this.svg);

        // Now fade the chart in
        for (var i=1; i<=frames; ++i) {
            (function (index)
            {
                setTimeout(function ()
                {
                    obj.svg.style.opacity = (index / frames);

                    if (index >= frames) {
                        callback(obj);
                    }

                }, (index / frames) * duration);
            })(i)
        }
        
        
        return this;
    };








    //
    // fadeOut
    // 
    // This function is a reversal of the above function - fading out instead of in
    //
    RGraph.SVG.FX.fadeout = function ()
    {
        // This function gets added to the chart object - so the this
        // variable is the chart object
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            duration = (frames / 60) * 1000,
            frame    = 0,
            callback = opt.callback || function () {};
        
         //RGraph.SVG.redraw()

        // Now fade the chart out
        for (var i=1; i<=frames; ++i) {
            (function (index)
            {
                setTimeout(function ()
                {
                    obj.svg.style.opacity = 1 - (index / frames);

                    if (index >= frames) {
                        callback(obj);
                    }
                }, (index / frames) * duration);
            })(i)
        }

        return this;
    };








    //
    // fadeSlideIn
    // 
    // This function fades the canvas in in a sliding motion
    //
    RGraph.SVG.FX.fadeslidein = function ()
    {
        // This function gets added to the chart object - so the this
        // variable is the chart object
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            frame    = 0,
            pc       = -20,
            step     = (120 - pc) / frames,
            color    = opt.color || 'white',
            width    = this.container.offsetWidth,
            height   = this.container.offsetHeight,
            callback = opt.callback || function () {};

        
        // Draw the chart
        RGraph.SVG.redraw(this.svg);


        // Create the cover
        jQuery('<div id="rgraph_fadeslide_cover_' + obj.id + '"></div>').css({
            background: 'linear-gradient(135deg, rgba(255,255,255,0) ' + pc + '%, ' + color + ' ' + (pc + 20) + '%)',
            width:      width  + 'px',
            height:     height + 'px',
            top:        0,
            left:       0,
            position:   'absolute'
        }).appendTo(jQuery(this.container));


        function iterator ()
        {
            if (pc < 120) {
                jQuery('div#rgraph_fadeslide_cover_' + obj.id).css({
                    background: 'linear-gradient(135deg, rgba(255,255,255,0) ' + pc + '%, ' + color + ' ' + (pc + 20) + '%)'
                });
                pc += step;
                RGraph.SVG.FX.update(iterator);
            
            } else {
            
                jQuery('div#rgraph_fadeslide_cover_' + obj.id).remove();

                callback(obj);
            }
        }
        
        iterator();

        return this;
    };







    //
    // fadeSlideOut
    //
    // Fades the canvas out in a sliding motion. This function gets added
    // to the chart object - so the this variable is the chart object
    //
    RGraph.SVG.FX.fadeslideout = function ()
    {
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            frame    = 0,
            pc       = -20,
            step     = (120 - pc) / frames,
            canvasXY = RGraph.SVG.getSVGXY(obj.svg),
            color    = opt.color || 'white',
            width    = this.container.offsetWidth,
            height   = this.container.offsetHeight,
            callback = opt.callback || function () {};


        // Draw the chart
        //RGraph.SVG.redraw(this.svg);

        // Create the cover
        jQuery('<div id="rgraph_fadeslide_cover_' + obj.id + '"></div>').css({
            background: 'linear-gradient(135deg, ' + color + ' ' + pc + '%, rgba(255,255,255,0) ' + (pc + 20) + '%)',
            width:      width + 'px',
            height:     height + 'px',
            top:        0,
            left:       0,
            position:   'absolute'
        }).appendTo(jQuery(obj.svg.parentNode));

        function iterator ()
        {
            if (pc < 120) {
                jQuery('div#rgraph_fadeslide_cover_' + obj.id).css({
                                                               background: 'linear-gradient(135deg, ' + color + ' ' + pc + '%, rgba(255,255,255,0) ' + (pc + 20) + '%)'
                                                              });
                pc += step;
                RGraph.SVG.FX.update(iterator);
            
            } else {

                RGraph.SVG.clear(obj.svg);
            
                jQuery('div#rgraph_fadeslide_cover_' + obj.id).remove();

                callback(obj);
            }
        }
        
        iterator();
        
        return this;
    };








    //
    // fadeCircularIn
    // 
    // This function uses radial CSS gradients to cover the canvas with a radial fade in effect
    // (from the center outwards)
    //
    RGraph.SVG.FX.fadecircularinoutwards = function ()
    {
        // This function gets added to the chart object - so the 'this'
        // variable is the chart object
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            frame    = 1,
            radius   = 0,
            svgXY    = RGraph.SVG.getSVGXY(obj.svg),
            color    = opt.color || 'white',
            callback = opt.callback || function () {};




        // Draw the chart
        RGraph.SVG.redraw(this.svg);



        // Create the cover
        jQuery('<div id="rgraph_fadecircularinoutwards_cover_' + obj.id + '"></div>').css({
            background: 'radial-gradient(rgba(255,255,255,0) 0%, ' + color + ' ' + radius + '%)',
            width:      this.container.offsetWidth + 'px',
            height:     this.container.offsetHeight + 'px',
            top:        0,
            left:       0,
            position:   'absolute'
        }).appendTo(jQuery(obj.svg.parentNode));




        function iterator ()
        {
            if (frame < frames) {

                    jQuery('div#rgraph_fadecircularinoutwards_cover_' + obj.id).css({
                        background: 'radial-gradient(rgba(255,255,255,0) ' + ((frame++ / frames) * 100) + '%, ' + color + ' ' + ((frame++ / frames) * 150) + '%)'
                    });

                    RGraph.SVG.FX.update(iterator);
            
            } else {
            
                jQuery('div#rgraph_fadecircularinoutwards_cover_' + obj.id).remove();

                callback(obj);
            }
        }
        
        iterator();
        
        return this;
    };








    //
    // fadecircularoutoutwards
    // 
    // This function uses radial CSS gradients to cover the canvas with a radial fade out effect
    // (from the center outwards)
    //
    RGraph.SVG.FX.fadecircularoutoutwards = function ()
    {
        // This function gets added to the chart object - so the this
        // variable is the chart object
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            frame    = 0,
            width    = this.container.offsetWidth,
            height   = this.container.offsetHeight,
            canvasXY = RGraph.SVG.getSVGXY(obj.svg),
            color    = opt.color || 'white',
            callback = opt.callback || function () {};





        // Draw the chart
        //RGraph.SVG.redraw(this.svg);





        // Create the cover
        jQuery('<div id="rgraph_fadeslide_cover_' + obj.id + '"></div>').css({
            background: 'radial-gradient(rgba(255,255,255,0) 0%, transparent 0%)',
            width:      width + 'px',
            height:     height + 'px',
            top:        0,
            left:       0,
            position:   'absolute'
        }).appendTo(jQuery(obj.svg.parentNode));




        function iterator ()
        {
            if (frame < frames) {

                    jQuery('div#rgraph_fadeslide_cover_' + obj.id).css({
                        background: 'radial-gradient(' + color + ' ' + ((frame++ / frames) * 100) + '%, rgba(255,255,255,0) ' + ((frame++ / frames) * 150) + '%)'
                    });
                    RGraph.SVG.FX.update(iterator);
            
            } else {

                RGraph.SVG.clear(obj.svg);

                jQuery('div#rgraph_fadeslide_cover_' + obj.id).remove();

                callback(obj);
            }
        }
        
        iterator();
        
        return this;
    };








    //
    // fadeCircularInInwards
    //
    // This function gets added to the chart object - so the 'this'
    // variable is the chart object
    //
    RGraph.SVG.FX.fadecircularininwards = function ()
    {
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            frame    = 0,
            radius   = Math.max(
                obj.container.offsetWidth,
                obj.container.offsetHeight
            ),
            color    = opt.color || 'white',
            callback = opt.callback || function () {};


        // Draw the chart
        RGraph.SVG.redraw(this.svg);



        // Create the cover
        jQuery('<div id="rgraph_fadeslide_cover_' + obj.id + '"></div>').css({
            background: 'radial-gradient(rgba(255,255,255,0) 100%, rgba(255,255,255,0) 0%)',
            width:      this.container.offsetWidth + 'px',
            height:     this.container.offsetHeight + 'px',
            top:        0,
            left:       0,
            position:   'absolute'
        }).appendTo(jQuery(obj.svg.parentNode));

        function iterator ()
        {
            if (frame < frames) {

                    jQuery('div#rgraph_fadeslide_cover_' + obj.id).css({
                        background: 'radial-gradient(' + color + ' ' + (( (frames - frame++) / frames) * 100) + '%, rgba(255,255,255,0) ' + (( (frames - frame++) / frames) * 120) + '%)'
                    });
                    RGraph.SVG.FX.update(iterator);
            
            } else {
            
                jQuery('div#rgraph_fadeslide_cover_' + obj.id).remove();

                callback(obj);
            }
        }
        
        iterator();
        
        return this;
    };








    //
    // fadecircularoutinwards
    //
    // This function gets added to the chart object - so the this
    // variable is the chart object
    //
    RGraph.SVG.FX.fadecircularoutinwards = function ()
    {
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            frame    = 0,
            radius   = Math.max(
                this.container.offsetWidth,
                this.container.offsetHeight
            ),
            color    = opt.color || 'white',
            callback = opt.callback || function () {};



        // Draw the chart
        //RGraph.SVG.redraw(this.svg);



        // Create the cover
        jQuery('<div id="rgraph_fadeslide_cover_' + this.id + '"></div>').css({
            background: 'radial-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0) 0%)',
            width:      this.container.offsetWidth + 'px',
            height:     this.container.offsetHeight + 'px',
            top:        0,
            left:       0,
            position:   'absolute'
        }).appendTo(jQuery(obj.svg.parentNode));

        function iterator ()
        {
            if (frame < frames) {

                    jQuery('div#rgraph_fadeslide_cover_' + obj.id).css({
                        background: 'radial-gradient(rgba(255,255,255,0) ' + (( (frames - frame++) / frames) * 100) + '%, ' + color + ' ' + (( (frames - frame++) / frames) * 120) + '%)'
                    });
                    
                    RGraph.SVG.FX.update(iterator);
            
            } else {
            
                RGraph.SVG.clear(obj.svg);

                jQuery('div#rgraph_fadeslide_cover_' + obj.id).remove();

                callback(obj);
            }
        }
        
        iterator();
        
        return this;
    };




    //
    // Reveal
    // 
    // With this effect the chart is slowly revealed from the centre outwards. This
    // function gets added to the chart object - so the 'this' variable is the chart
    // object
    // 
    // @param object    Options for the effect. You can give frames here
    // @param function  An optional callback function
    //
    RGraph.SVG.FX.reveal = function ()
    {
        var obj       = this,
            opt       = arguments[0] || {}
            color     = opt.color    || 'white',
            frames    = opt.frames   || 90,
            duration  = (frames / 60) * 1000,
            callback  = opt.callback || function () {}

        var divs = [
            ['rgraph_reveal_left_'   + this.id, 0, 0, this.container.offsetWidth  / 2, this.container.offsetHeight],
            ['rgraph_reveal_right_'  + this.id,(this.container.offsetWidth  / 2),0,(this.container.offsetWidth  / 2),this.container.offsetHeight],
            ['rgraph_reveal_top_'    + this.id,0,0,this.container.offsetWidth,(this.container.offsetHeight / 2)],
            ['rgraph_reveal_bottom_' + this.id,0,(this.container.offsetHeight  / 2),this.container.offsetWidth,(this.container.offsetHeight / 2)]
        ];
        
        for (var i=0,len=divs.length; i<len; ++i) {
            var div = doc.createElement('DIV');
                div.id                    = divs[i][0];
                div.style.left            = divs[i][1] + 'px';
                div.style.top             = divs[i][2] + 'px';
                div.style.width           = divs[i][3] + 'px';
                div.style.height          = divs[i][4] + 'px';
                div.style.position        = 'absolute';
                div.style.backgroundColor = color;
            this.container.appendChild(div);
        }


        // Redraw
        RGraph.SVG.redraw(obj.svg);


        // Animate the shrinking of the DIVs
        jQuery('#rgraph_reveal_left_'   + obj.id).animate({width: 0}, duration);
        jQuery('#rgraph_reveal_right_'  + obj.id).animate({left: '+=' + (this.container.offsetWidth / 2),width: 0}, duration);
        jQuery('#rgraph_reveal_top_'    + obj.id).animate({height: 0}, duration);
        jQuery('#rgraph_reveal_bottom_' + obj.id).animate({top: '+=' + (this.container.offsetHeight / 2),height: 0}, duration);
        
        // Remove the DIVs from the DOM 100ms after the animation ends
        setTimeout(function ()
        {
            obj.container.removeChild(doc.getElementById("rgraph_reveal_top_" + obj.id));
            obj.container.removeChild(doc.getElementById("rgraph_reveal_bottom_" + obj.id));
            obj.container.removeChild(doc.getElementById("rgraph_reveal_left_" + obj.id));
            obj.container.removeChild(doc.getElementById("rgraph_reveal_right_" + obj.id));
            
            callback(obj);
        }, duration);
        
        
        return this;
    };








    //
    // Conceal
    // 
    // This effect is the reverse of the Reveal effect - instead of revealing
    // the canvas it conceals it. Combined with the reveal effect would make
    // for a nice wipe effect.
    // 
    // @param object obj The chart object
    ///
    RGraph.SVG.FX.conceal = function ()
    {
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames   || 90,
            callback = opt.callback || function () {},
            color    = opt.color    || 'white',
            duration = (frames / 60) * 1000,
            frame    = 0;



        var divs = [
            ['rgraph_conceal_left_' + obj.id, 0, 0, 0, this.container.offsetHeight],
            ['rgraph_conceal_right_' + obj.id,this.container.offsetWidth,0,0,this.container.offsetHeight],
            ['rgraph_conceal_top_' + obj.id,0,0,this.container.offsetWidth,0],
            ['rgraph_conceal_bottom_' + obj.id,0,this.container.offsetHeight,this.container.offsetWidth,0]
        ];




        for (var i=0,len=divs.length; i<len; ++i) {
            var div = doc.createElement('DIV');
                div.id                    = divs[i][0];
                div.style.left            = divs[i][1] + 'px';
                div.style.top             = divs[i][2] + 'px';
                div.style.width           = divs[i][3] + 'px';
                div.style.height          = divs[i][4] + 'px';
                div.style.position        = 'absolute';
                div.style.backgroundColor = color;
            this.container.appendChild(div);
        }

        jQuery('#rgraph_conceal_left_' + obj.id).animate({width: '+=' + (this.container.offsetWidth / 2)}, duration);
        jQuery('#rgraph_conceal_right_' + obj.id).animate({left: '-=' + (this.container.offsetWidth / 2),width: (this.container.offsetWidth / 2)}, duration);
        jQuery('#rgraph_conceal_top_' + obj.id).animate({height: '+=' + (this.container.offsetHeight / 2)}, duration);
        jQuery('#rgraph_conceal_bottom_' + obj.id).animate({top: '-=' + (this.container.offsetHeight / 2),height: (this.container.offsetHeight / 2)}, duration);
        
        // Remove the DIVs from the DOM 100ms after the animation ends
        setTimeout(
            function ()
            {
                obj.container.removeChild(doc.getElementById("rgraph_conceal_top_" + obj.id));
                obj.container.removeChild(doc.getElementById("rgraph_conceal_bottom_" + obj.id));
                obj.container.removeChild(doc.getElementById("rgraph_conceal_left_" + obj.id));
                obj.container.removeChild(doc.getElementById("rgraph_conceal_right_" + obj.id));
                
                RGraph.SVG.clear(obj.svg);
                
                callback(obj);
            
            },
            duration
        );
        
        return this;
    };








    //
    // Horizontal Blinds (open)
    // 
    // @params object obj The graph object
    //
    RGraph.SVG.FX.hblindsopen = function ()
    {
        // This function gets added to the chart object - so the this
        // variable is the chart object
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            duration = (frames / 60) * 1000,
            frame    = 0,
            callback = opt.callback || function () {},
            color    = opt.color || 'white',
            height   = this.container.offsetHeight / 5;

        //
        // First draw the chart
        //
        RGraph.SVG.redraw(this.svg);

        for (var i=0; i<5; ++i) {
            var div = doc.createElement('DIV');
                div.id                    = 'rgraph_hblinds_' + i + '_' + obj.id;
                div.style.left            = 0;
                div.style.top             = ((this.container.offsetHeight * (i / 5))) + 'px';
                div.style.width           = this.container.offsetWidth + 'px';
                div.style.height          = (this.container.offsetHeight / 5) + 'px';
                div.style.position        = 'absolute';
                div.style.backgroundColor = color;
            this.container.appendChild(div);

            jQuery('#rgraph_hblinds_' + i + '_' + obj.id).animate({height: 0}, duration);
        }

        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_hblinds_0_' + obj.id));}, duration);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_hblinds_1_' + obj.id));}, duration);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_hblinds_2_' + obj.id));}, duration);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_hblinds_3_' + obj.id));}, duration);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_hblinds_4_' + obj.id));}, duration);
        setTimeout(function () {callback(obj);}, duration);
        
        return this;
    };








    //
    // Horizontal Blinds (close)
    // 
    // This function gets added to the chart object - so the this
    // variable is the chart object
    //
    // @params object obj The graph object
    //
    RGraph.SVG.FX.hblindsclose = function ()
    {
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            duration = (frames / 60) * 1000,
            frame    = 0,
            callback = opt.callback || function () {},
            color    = opt.color = 'white',
            height   = this.container.offsetHeight / 5;



        for (var i=0; i<5; ++i) {
            var div = doc.createElement('DIV');
                div.id                    = 'rgraph_hblinds_' + i + '_' + obj.id;
                div.style.left            = 0;
                div.style.top             = (this.container.offsetHeight * (i / 5)) + 'px';
                div.style.width           = this.container.offsetWidth + 'px';
                div.style.height          = 0;
                div.style.position        = 'absolute';
                div.style.backgroundColor = color;
            this.container.appendChild(div);

            jQuery('#rgraph_hblinds_' + i + '_' + obj.id)
                .animate({
                    height: height + 'px'
                }, duration);
        }



        setTimeout(function () {RGraph.SVG.clear(obj.svg);}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_hblinds_0_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_hblinds_1_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_hblinds_2_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_hblinds_3_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_hblinds_4_' + obj.id));}, duration + 100);
        setTimeout(function () {callback(obj);}, duration + 100);
    };








    //
    // Vertical Blinds (open)
    // 
    // @params object obj The graph object
    //
    // This function gets added to the chart object - so the this
    // variable is the chart object
    RGraph.SVG.FX.vblindsopen = function ()
    {
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            duration = (frames / 60) * 1000,
            frame    = 0,
            callback = opt.callback || function () {},
            color    = opt.color || 'white',
            width    = this.container.offsetWidth / 10;
        
        //
        // First draw the chart
        //
        RGraph.SVG.redraw(obj.svg);

        for (var i=0; i<10; ++i) {
            var div = doc.createElement('DIV');
                div.id = 'rgraph_vblinds_' + i + '_' + obj.id;
                div.style.width           =  width + 'px';
                div.style.height          = this.container.offsetHeight + 'px';
                div.style.left            = (this.container.offsetWidth * (i / 10)) + 'px';
                div.style.top             = 0;
                div.style.position        = 'absolute';
                div.style.backgroundColor = color;
            obj.container.appendChild(div);

            jQuery('#rgraph_vblinds_' + i + '_' + obj.id).animate({width: 0}, duration);
        }

        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_0_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_1_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_2_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_3_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_4_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_5_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_6_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_7_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_8_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_9_' + obj.id));}, duration + 100);
        
        setTimeout(function () {callback(obj);}, duration + 100);

        return this;
    };








    //
    // Vertical Blinds (close)
    //
    // This function gets added to the chart object - so the this
    // variable is the chart object
    // 
    // @params object obj The graph object
    //
    RGraph.SVG.FX.vblindsclose = function ()
    {
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            duration = (frames / 60) * 1000,
            frame    = 0,
            callback = opt.callback || function () {},
            color    = opt.color || 'white',
            width    = this.container.offsetWidth / 10;

        // Create the blinds
        for (var i=0; i<10; ++i) {
            var div = doc.createElement('DIV');
                div.id                    = 'rgraph_vblinds_' + i + '_' + obj.id;
                div.style.left            = (this.container.offsetWidth * (i / 10)) + 'px';
                div.style.top             = 0;
                div.style.width           = 0;
                div.style.height          = this.container.offsetHeight + 'px';
                div.style.position        = 'absolute';
                div.style.backgroundColor = color;
            this.container.appendChild(div);

            jQuery('#rgraph_vblinds_' + i + '_' + obj.id).animate({width: width}, duration);
        }

        setTimeout(function () {RGraph.SVG.clear(obj.svg);}, duration + 100);

        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_0_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_1_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_2_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_3_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_4_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_5_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_6_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_7_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_8_' + obj.id));}, duration + 100);
        setTimeout(function () {obj.container.removeChild(doc.getElementById('rgraph_vblinds_9_' + obj.id));}, duration + 100);
        
        setTimeout(function () {callback(obj);}, duration + 100);

        return this;
    };








    //
    // Slide in
    // 
    // This function is a wipe that can be used when switching the canvas to a
    // new graph
    //
    // This function gets added to the chart object - so the this
    // variable is the chart object
    // 
    // @param object obj The graph object
    //
    RGraph.SVG.FX.slidein = function ()
    {
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            duration = (frames / 60) * 1000,
            frame    = 0,
            callback = opt.callback || function () {},
            color    = opt.color || 'white',
            width    = this.container.offsetWidth / 10,
            from     = opt.from || 'left';

        this.container.style.overflow = 'hidden';

        RGraph.SVG.redraw(this.svg);

        this.svg.style.position = 'relative';
        
        if (from == 'left') {
            this.svg.style.left = (0 - this.container.offsetWidth) + 'px';
            this.svg.style.top  = 0;
        } else if (from == 'top') {
            this.svg.style.left = 0;
            this.svg.style.top  = (0 - this.container.offsetHeight) + 'px';
        } else if (from == 'bottom') {
            this.svg.style.left = 0;
            this.svg.style.top  = this.container.offsetHeight + 'px';
        } else {
            this.svg.style.left = this.container.offsetWidth + 'px';
            this.svg.style.top  = 0;
        }
        
        jQuery(this.svg).animate({left:0,top:0}, duration, function ()
        {
            callback(obj);
        });
        
        return this;
    };








    //
    // Slide out
    // 
    // This function is a wipe that can be used when switching the canvas to a new graph
    // 
    // @param object   Optional object containing configuration.
    // @param function Optional callback function
    //
    RGraph.SVG.FX.slideout = function ()
    {
        // This function gets added to the chart object - so the this
        // variable is the chart object
        var opt      = arguments[0] || {},
            frames   = opt.frames   || 90,
            color    = opt.color    || 'white',
            to       = opt.to       || 'left',
            duration = (frames / 60) * 1000,
            frame    = 0,
            callback = opt.callback || function () {},
            width    = this.container.offetsWidth / 10;

        this.container.style.overflow= 'hidden';
        
        this.svg.style.position = 'relative';
        this.svg.style.left     = 0;
        this.svg.style.top      = 0;
        
        if (to == 'left') {
            jQuery(this.svg).animate({left: (0 - this.container.offsetWidth) + 'px'}, duration, function () {callback(this);});
        } else if (to == 'top') {
            jQuery(this.svg).animate({left: 0, top: (0 - this.container.offsetHeight) + 'px'}, duration, function () {callback(this);});
        } else if (to == 'bottom') {
            jQuery(this.svg).animate({top: (0 + this.container.offsetHeight) + 'px'}, duration, function () {callback(this);});
        } else {
            jQuery(this.svg).animate({left: (0 + this.container.offsetWidth) + 'px'}, duration, function () {callback(this);});
        }
        
        return this;
    };








    //
    // Horizontal Scissors (open)
    //
    // This function gets added to the chart object - so the this
    // variable is the chart object
    // 
    // @param object      Optional array of options
    // @param function     Optional callback function
    // 
    //
    RGraph.SVG.FX.hscissorsopen = function ()
    {
        var opt      = arguments[0] || {},
            obj      = this,
            frames   = opt.frames   || 90,
            callback = opt.callback || function () {},
            color    = opt.color    || 'white',
            to       = opt.to       || 'left',
            frame    = 0,
            duration = (frames / 60) * 1000,
            width    = this.container.offsetWidth / 10,
            height   = this.container.offsetHeight / 5;


        //
        // First draw the chart
        //
        RGraph.SVG.redraw(this.svg);


        for (var i=0; i<5; ++i) {
            var div = doc.getElementById("rgraph_hscissors_" + i + '_' + this.id)
            if (!div) {
                var div    = doc.createElement('DIV');
                    div.id = 'rgraph_hscissors_' + i + '_' + this.id;
                    div.style.width =  this.container.offsetWidth + 'px';
                    div.style.height = (this.container.offsetHeight / 5) + 'px';
                    div.style.left   = 0;
                    div.style.top   = (this.container.offsetHeight * (i / 5)) + 'px';
                    div.style.position = 'absolute';
                    div.style.backgroundColor = color;
                this.container.appendChild(div);
            }
    
            if (i % 2 == 0) {
                jQuery('#' + 'rgraph_hscissors_' + i + '_' + this.id).animate({left: this.container.offsetWidth + 'px', width: 0}, duration);
            } else {
                jQuery('#' + 'rgraph_hscissors_' + i + '_' + this.id).animate({width: 0}, duration);
            }
        }

        setTimeout(function ()
        {
            obj.container.removeChild(doc.getElementById('rgraph_hscissors_0_' + obj.id));
            obj.container.removeChild(doc.getElementById('rgraph_hscissors_1_' + obj.id));
            obj.container.removeChild(doc.getElementById('rgraph_hscissors_2_' + obj.id));
            obj.container.removeChild(doc.getElementById('rgraph_hscissors_3_' + obj.id));
            obj.container.removeChild(doc.getElementById('rgraph_hscissors_4_' + obj.id));
            
            callback(obj);
        }, duration);
        
        
        return this;
    };








    //
    // Horizontal Scissors (Close)
    //
    // This function gets added to the chart object - so the this
    // variable is the chart object
    // 
    // @param @object      Optional object of options
    // @param function     Optional callback function
    // 
    //
    RGraph.SVG.FX.hscissorsclose = function ()
    {
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 60,
            duration = (frames / 60) * 1000,
            frame    = 0,
            callback = opt.callback || function () {},
            color    = opt.color || 'white',
            height   = this.container.offsetHeight / 5;


        for (var i=0; i<5; ++i) {
            var div                       = doc.createElement('DIV');
                div.id                    = 'rgraph_hscissors_' + i + '_' + this.id;
                div.style.width           = 0;
                div.style.height          = height + 'px';
                div.style.left            = (i % 2 == 0 ? this.container.offsetWidth : 0) + 'px';
                div.style.top             = (this.container.offsetHeight * (i / 5)) + 'px';
                div.style.position        = 'absolute';
                div.style.backgroundColor = color;
            this.container.appendChild(div);

            if (i % 2 == 0) {
                jQuery('#' + 'rgraph_hscissors_' + i + '_' + this.id).animate({left: 0, width: this.container.offsetWidth + 'px'}, duration);
            } else {
                jQuery('#' + 'rgraph_hscissors_' + i + '_' + this.id).animate({width: this.container.offsetWidth + 'px'}, duration);
            }
        }
        
        setTimeout(function ()
        {
            RGraph.SVG.clear(obj.svg);
            jQuery('#' + 'rgraph_hscissors_' + 0 + '_' + obj.id).remove();
            jQuery('#' + 'rgraph_hscissors_' + 1 + '_' + obj.id).remove();
            jQuery('#' + 'rgraph_hscissors_' + 2 + '_' + obj.id).remove();
            jQuery('#' + 'rgraph_hscissors_' + 3 + '_' + obj.id).remove();
            jQuery('#' + 'rgraph_hscissors_' + 4 + '_' + obj.id).remove();
            callback(obj);
        }, duration);
        
        return this;
    };








    //
    // Vertical Scissors (open)
    // 
    // @param @object  Optional An object of options. It can consist of:
    //                  o color    - The color of the scissors. The default is white
    //                  o frames   - Number of animation frames in the effect. Default
    //                               is 60
    //                  o callback - A function that's called when the effect is
    //                               finished
    //
    RGraph.SVG.FX.vscissorsopen = function ()
    {
        // This function gets added to the chart object - so the this
        // variable is the chart object
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            duration = (frames / 60) * 1000,
            frame    = 0,
            callback = opt.callback || function () {},
            color    = opt.color || 'white',
            width    = this.container.offsetWidth / 10;



        //
        // First (re)draw the chart
        //
        RGraph.SVG.redraw(this.svg);



        for (var i=0; i<10; ++i) {
            var div = doc.getElementById("rgraph_vscissors_" + i + '_' + this.id);

            if (!div) {
                var div = doc.createElement('DIV');
                    div.id = 'rgraph_vscissors_' + i + '_' + this.id;
                    div.style.width           =  width + 'px';
                    div.style.height          = this.container.offsetHeight + 'px';
                    div.style.left            = this.container.offsetWidth * (i / 10) + 'px';
                    div.style.top             = 0;
                    div.style.position        = 'absolute';
                    div.style.backgroundColor = color;
                this.container.appendChild(div);
            }

            if (i % 2 == 0) {
                jQuery('#' + 'rgraph_vscissors_' + i + '_' + this.id).animate({top: this.container.offsetHeight + 'px', height: 0}, duration);
            } else {
                jQuery('#' + 'rgraph_vscissors_' + i + '_' + this.id).animate({height: 0}, duration);
            }
        }

        setTimeout(function ()
        {
            obj.container.removeChild(doc.getElementById('rgraph_vscissors_0' + '_' + obj.id));
            obj.container.removeChild(doc.getElementById('rgraph_vscissors_1' + '_' + obj.id));
            obj.container.removeChild(doc.getElementById('rgraph_vscissors_2' + '_' + obj.id));
            obj.container.removeChild(doc.getElementById('rgraph_vscissors_3' + '_' + obj.id));
            obj.container.removeChild(doc.getElementById('rgraph_vscissors_4' + '_' + obj.id));
            
            callback(obj);

        }, duration);

        return this;
    };








    //
    // Vertical Scissors (close)
    //
    RGraph.SVG.FX.vscissorsclose = function ()
    {
        // This function gets added to the chart object - so the this
        // variable is the chart object
        var obj      = this,
            opt      = arguments[0] || {},
            frames   = opt.frames || 90,
            duration = (frames / 60) * 1000,
            frame    = 0,
            callback = opt.callback || function () {},
            color    = opt.color  || 'white',
            width    = this.container.offsetWidth / 10;


        for (var i=0; i<10; ++i) {
            var div = doc.getElementById("rgraph_vscissors_" + i + '_' + this.id)
            if (!div) {
                var div                = doc.createElement('DIV');
                    div.id             = 'rgraph_vscissors_' + i + '_' + this.id;
                    div.style.width    =  width + 'px';
                    div.style.height   = 0;
                    div.style.left     = (width * i) + 'px';
                    div.style.top      = (i % 2 == 0 ? this.container.offsetHeight : 0) + 'px';
                    div.style.position = 'absolute';
                    div.style.backgroundColor = color;
                this.container.appendChild(div);
            }

            if (i % 2 == 0) {
                jQuery('#' + 'rgraph_vscissors_' + i + '_' + this.id).animate({top: 0, height: this.container.offsetHeight + 'px'}, duration);
            } else {
                jQuery('#' + 'rgraph_vscissors_' + i + '_' + this.id).animate({height: this.container.offsetHeight + 'px'}, duration);
            }
        }
        
        setTimeout(function ()
        {
            RGraph.SVG.clear(obj.svg);
            for (var i=0; i<10; i++) {
                jQuery('#rgraph_vscissors_' + i + '_' + obj.id).remove();
            }
            callback(obj);
        }, duration);
        
        return this;
    };








// End Module pattern
})(window, document);