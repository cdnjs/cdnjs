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

    RGraph      = window.RGraph || {isrgraph:true,isRGraph: true,rgraph:true};
    RGraph.HTML = RGraph.HTML || {};

// Module pattern
(function (win, doc, undefined)
{
    //
    // Draws the graph key (used by various graphs)
    //
    RGraph.drawKey = function ()
    {
        var args = RGraph.getArgs(arguments, 'object,key,colors');

        if (!args.key) {
            return;
        }

        var prop       = args.object.properties,
            properties = args.object.properties,
            obj        = args.object,

            // Key positioned in the margin
            keypos          = properties.keyPosition,
            textsize        = properties.textSize,
            key_non_null    = [],
            colors_non_null = []
            scaleFactor     = RGraph.getScaleFactor(obj);

        args.object.context.lineWidth = 1;
        args.object.context.beginPath();

        //
        // Change the older keyVpos to keyPositionY
        //
        if (typeof properties.keyVpos == 'number') {
            args.object.set('keyPositionY', properties.keyVpos * args.object.get('marginTop'));
        }











        // Account for the key now (March 2023) being able to be
        // a string
        if (RGraph.isString(args.key)) {
            
            var len = 0;
        
            if (RGraph.isNumber(args.object.properties.keyFormattedItemsCount)) {
                len = args.object.properties.keyFormattedItemsCount;
            } else {
                len = args.object.getKeyNumDatapoints();
            }
            
            args.key = (new Array(len)).fill(args.key);
        }














        //
        // Account for null values in the key
        //
        for (var i=0; i<args.key.length; ++i) {
            if (args.key[i] !== null) {
                colors_non_null.push(args.colors[i]);
                key_non_null.push(args.key[i]);
            }
        }
        
        key    = key_non_null;
        colors = colors_non_null;

        // The key does not use accessible text by default
        var textAccessible = false;
        
        if (typeof properties.keyTextAccessible === 'boolean') {
            textAccessible = properties.keyTextAccessible;
        }





























        //
        // This does the actual drawing of the key when it's in the graph
        // 
        // @param object obj The graph object
        // @param array  key The key items to draw
        // @param array colors An aray of colors that the key will use
        //
        function drawKey_graph ()
        {
            var marginLeft   = args.object.marginLeft,
                marginRight  = args.object.marginRight,
                marginTop    = args.object.marginTop,
                marginBottom = args.object.marginBottom,
                hpos         = properties.yaxisPosition == 'right' ? marginLeft + (10 * scaleFactor) : args.object.canvas.width - marginRight - (10 * scaleFactor),
                vpos         = marginTop + (10 * scaleFactor),
                title        = properties.title,
                hmargin      = 8 * scaleFactor, // This is the size of the gaps between the blob of color and the text
                vmargin      = 4 * scaleFactor, // This is the vertical margin of the key
                fillstyle    = properties.keyBackground,
                strokestyle  = '#333',
                height       = 0,
                width        = 0;
                
                // Get the text configuration
                var textConf = RGraph.getTextConf({
                    object: args.object,
                    prefix: 'keyLabels'
                });

            blob_size = textConf.size; // The blob of color
            text_size = textConf.size;

            if (!args.object.coords) {
                args.object.coords = {};
            }
            
            args.object.coords.key = [];

            // Need to set this so that measuring the text works out OK
            args.object.context.font = (textConf.italic ? 'italic ' : '') +
                      (textConf.bold ? 'bold ' : '') +
                      textConf.size + 'pt ' +
                      textConf.font;

            // Work out the longest bit of text
            for (i=0; i<key.length; ++i) {

                ////////////////////////////////////
                // Label substitution for the key //
                ////////////////////////////////////
                key[i] = RGraph.labelSubstitution({
                    object:    args.object,
                    text:      key[i],
                    index:     i,
                    value:     args.object.getKeyValue(i),
                    unitsPre:  args.object.properties.keyFormattedUnitsPre,
                    unitsPost: args.object.properties.keyFormattedUnitsPost,
                    thousand:  args.object.properties.keyFormattedThousand,
                    point:     args.object.properties.keyFormattedPoint,
                    decimals:  args.object.properties.keyFormattedDecimals
                });
                //////////// Label substitution for the key ////////////

                width = Math.max(
                    width,
                    args.object.context.measureText(key[i]).width);
            }
    
            width += (5 * scaleFactor);
            width += (blob_size);
            width += (5 * scaleFactor);
            width += (5 * scaleFactor);
            width += (5 * scaleFactor);
    
            //
            // Now we know the width, we can move the key left
            // more accurately
            //
            if (   properties.yaxisPosition == 'left'
                || (args.object.type === 'pie'       && !properties.yaxisPosition)
                || (args.object.type === 'pie'       && !properties.yaxisPosition)
                || (args.object.type === 'hbar'      && !properties.yaxisPosition)
                || (args.object.type === 'hbar'      && properties.yaxisPosition === 'center')
                || (args.object.type === 'hbar'      && properties.yaxisPosition === 'right')
                || (args.object.type === 'rscatter'  && !properties.yaxisPosition)
                || (args.object.type === 'radar'     && !properties.yaxisPosition)
                || (args.object.type === 'rose'      && !properties.yaxisPosition)
                || (args.object.type === 'funnel'    && !properties.yaxisPosition)
                || (args.object.type === 'vprogress' && !properties.yaxisPosition)
                || (args.object.type === 'hprogress' && !properties.yaxisPosition)
               ) {

                hpos -= width;
            }

            //
            // Horizontal alignment
            //
            if (typeof properties.keyHalign == 'string') {
                if (properties.keyHalign === 'left') {
                    hpos = marginLeft + (10 * scaleFactor);
                } else if (properties.keyHalign == 'right') {
                    hpos = args.object.canvas.width - marginRight - width;
                }
            }
    
            //
            // Specific location coordinates
            //
            if (typeof properties.keyPositionX === 'number') {hpos = properties.keyPositionX;}
            if (typeof properties.keyPositionY === 'number') {vpos = properties.keyPositionY;}
            
            // Now allow for offsetting the key
            if (typeof properties.keyPositionOffsetx === 'number') {hpos += properties.keyPositionOffsetx;}
            if (typeof properties.keyPositionOffsety === 'number') {vpos += properties.keyPositionOffsety;}
    
    
            // Stipulate the shadow for the key box
            if (properties.keyShadow) {
                args.object.context.shadowColor   = properties.keyShadowColor;
                args.object.context.shadowBlur    = properties.keyShadowBlur;
                args.object.context.shadowOffsetX = properties.keyShadowOffsetx;
                args.object.context.shadowOffsetY = properties.keyShadowOffsety;
            }
    
    
    
    
            // Draw the box that the key resides in
            args.object.context.beginPath();
            args.object.context.fillStyle   = properties.keyBackground;
            args.object.context.strokeStyle = 'black';

            if (typeof properties.keyPositionGraphBoxed == 'undefined' || (typeof properties.keyPositionGraphBoxed == 'boolean' && properties.keyPositionGraphBoxed) ) {
                if (arguments[3] != false) {
        
                    args.object.context.lineWidth = typeof properties.keyLinewidth == 'number' ? properties.keyLinewidth : 1 * scaleFactor;
    
                    // The older square rectangled key
                    if (properties.keyRounded == true) {

                        args.object.context.beginPath();

                        RGraph.roundedRect({
                            context: args.object.context,
                                  x: Math.round(hpos),
                                  y: Math.round(vpos),
                              width: width - (5 * scaleFactor),
                             height: (5 * scaleFactor) + ( (text_size + (5 * scaleFactor) ) * RGraph.getKeyLength(key)),
                             radius: (4 * scaleFactor)
                        });

                        args.object.context.strokeStyle = strokestyle;
                        args.object.context.stroke();
                        args.object.context.fill();
    
                        RGraph.noShadow(args.object);
                
                    //
                    // keyRounded = false
                    //
                    } else {
                        var x = Math.round(hpos),
                            y = Math.round(vpos),
                            w = width - (5 * scaleFactor),
                            h = (5 * scaleFactor) + ( (text_size + (5 * scaleFactor)) * RGraph.getKeyLength(key));

                        args.object.context.strokeRect(x,y,w,h);
                        args.object.context.fillRect(x,y,w,h);
                    }
                }
            }

            RGraph.noShadow(args.object);
    
            args.object.context.beginPath();
    
                //
                // Custom colors for the key
                //
                if (properties.keyColors) {
                    colors = properties.keyColors;
                }

    
    
                ////////////////////////////////////////////////////////////////////////////////////////////
    
    

                // Draw the labels given
                for (var i=key.length - 1; i>=0; i--) {

                    var j = Number(i) + 1;

                    //
                    // Draw the blob of color
                    //
                    // An array element, string
                    if (typeof properties.keyColorShape === 'object' && typeof properties.keyColorShape[i] === 'string') {
                        var blob_shape = properties.keyColorShape[i];
                    
                    // An array element, function
                    } else if (typeof properties.keyColorShape === 'object' && typeof properties.keyColorShape[i] === 'function') {
                        var blob_shape = properties.keyColorShape[i];
                    
                    // No array - just a string
                    } else if (typeof properties.keyColorShape === 'string') {
                        var blob_shape = properties.keyColorShape;
                    
                    // No array - just a function
                    } else if (typeof properties.keyColorShape === 'function') {
                        var blob_shape = properties.keyColorShape;

                    // Unknown
                    } else {
                        var blob_shape = 'rect';
                    }

                    if (blob_shape == 'circle') {
                        args.object.context.beginPath();
                            args.object.context.fillStyle = colors[i];
                            args.object.context.arc(
                                hpos + (5 * scaleFactor) + (blob_size / 2),
                                vpos + (5 * j * scaleFactor) + (text_size * j) - text_size + (blob_size / 2),
                                blob_size / 2
                                ,
                                0,
                                6.26,
                                0
                            );
                        args.object.context.fill();
                    
                    } else if (blob_shape == 'line') {
                        args.object.context.beginPath();
                            args.object.context.strokeStyle = colors[i];
                            args.object.context.moveTo(hpos + (5 * scaleFactor), vpos + (5 * j * scaleFactor) + (text_size * j) - text_size + (blob_size / 2));
                            args.object.context.lineTo(hpos + blob_size + (5 * scaleFactor), vpos + (5 * j * scaleFactor) + (text_size * j) - text_size + (blob_size / 2));
                        args.object.context.stroke();
                    
                    } else if (blob_shape == 'triangle') {
                        args.object.context.beginPath();
                            args.object.context.strokeStyle = colors[i];
                            args.object.context.moveTo(hpos + (5 * scaleFactor), vpos + (5 * j * scaleFactor) + (text_size * j) - text_size + blob_size);
                            args.object.context.lineTo(hpos + (blob_size / 2) + (5 * scaleFactor), vpos + (5 * j * scaleFactor) + (text_size * j) - text_size );
                            args.object.context.lineTo(hpos + blob_size + (5 * scaleFactor), vpos + (5 * j * scaleFactor) + (text_size * j) - text_size + blob_size);
                        args.object.context.closePath();
                        args.object.context.fillStyle =  colors[i];
                        args.object.context.fill();

                    } else if (typeof blob_shape === 'function') {

                        blob_shape({
                            object: args.object,
                            color: colors[i],
                            x: hpos + 5,
                            y: vpos + (5 * j) + (text_size * j) - text_size,
                            width: text_size,
                            height: text_size + 1
                        });
                    } else {
                        args.object.context.fillStyle =  colors[i];
                        args.object.context.fillRect(
                            hpos + (5 * scaleFactor),
                            vpos + (5 * j * scaleFactor) + (text_size * j) - text_size,
                            text_size,
                            text_size + 1
                        );
                    }
                    
                    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    

                    args.object.context.beginPath();
                    //args.object.context.fillStyle = typeof text_color == 'object' ? text_color[i] : text_color;
                    


                    ret = RGraph.text({
                    
                        object:     args.object,
                        
                        font:       textConf.font,
                        size:       textConf.size,
                        bold:       textConf.bold,
                        italic:     textConf.italic,
                        color:      typeof textConf.color == 'object' ? textConf.color[i] : textConf.color,

                        x:          hpos + blob_size + (5 * scaleFactor) + (5 * scaleFactor) + (properties.keyLabelsOffsetx || 0),
                        y:          vpos + (5 * j * scaleFactor) + (text_size * j) + (3 * scaleFactor) + (properties.keyLabelsOffsety || 0),
                        text:       key[i],
                        accessible: textAccessible
                    });

                    args.object.coords.key[i] = [
                        ret.x,
                        ret.y,
                        ret.width,
                        ret.height,
                        key[i],
                        colors[i],
                        args.object
                    ];
                }
            args.object.context.fill();
        }






































        //
        // This does the actual drawing of the key when it's in the margin
        //
        var drawKey_margin = function ()
        {
            var scaleFactor  = RGraph.getScaleFactor(obj),
                text_size    = typeof properties.keyLabelsSize == 'number' ? properties.keyLabelsSize : properties.textSize,
                text_bold    = properties.keyLabelsBold,
                text_italic  = properties.keyLabelsItalic,
                text_font    = properties.keyLabelsFont || properties.keyFont || properties.textFont,
                text_color   = properties.keyLabelsColor || properties.textColor,
                marginLeft   = args.object.marginLeft,
                marginRight  = args.object.marginRight,
                marginTop    = args.object.marginTop,
                marginBottom = args.object.marginBottom,
                hpos         = ((args.object.canvas.width - marginLeft - marginRight) / 2) + args.object.marginLeft,
                vpos         = marginTop - text_size - 6,
                title        = properties.title,
                blob_size    = text_size, // The blob of color
                hmargin      = 8 * scaleFactor, // This is the size of the gaps between the blob of color and the text
                vmargin      = 4 * scaleFactor, // This is the vertical margin of the key
                fillstyle    = properties.keyBackground,
                strokestyle  = '#999',
                length       = 0;

            if (!args.object.coords) {
                args.object.coords = {};
            }
            args.object.coords.key = [];


    
            // Need to work out the length of the key first
            args.object.context.font = (args.object.properties.keyLabelsItalic ? 'italic ' : '') + (args.object.properties.keyLabelsBold ? 'bold ' : '') + text_size + 'pt ' + text_font;

            for (i=0; i<key.length; ++i) {

                ////////////////////////////////////
                // Label substitution for the key //
                ////////////////////////////////////
                key[i] = RGraph.labelSubstitution({
                    object:    args.object,
                    text:      key[i],
                    index:     i,
                    value:     args.object.getKeyValue(i),
                    unitsPre:  args.object.properties.keyFormattedUnitsPre,
                    unitsPost: args.object.properties.keyFormattedUnitsPost,
                    thousand:  args.object.properties.keyFormattedThousand,
                    point:     args.object.properties.keyFormattedPoint,
                    decimals:  args.object.properties.keyFormattedDecimals
                });
                //////////// Label substitution for the key ////////////




                length += hmargin;
                length += blob_size;
                length += hmargin;
                length += args.object.context.measureText(key[i]).width;
                length += (properties.keyPositionMarginHSpace ? properties.keyPositionMarginHSpace : 0);
            }
            length += hmargin;

            // Don't why we need this but here it is...
            length += (properties.keyPositionMarginHSpace ? properties.keyPositionMarginHSpace : 0);
    

    
    
            //
            // Work out hpos since in the Pie it isn't necessarily dead center
            //
            if (args.object.type == 'pie') {
                if (properties.align == 'left') {
                    var hpos = args.object.radius + marginLeft;
                    
                } else if (properties.align == 'right') {
                    var hpos = args.object.canvas.width - args.object.radius - marginRight;
    
                } else {
                    hpos = args.object.canvas.width / 2;
                }
            }

    
    
    
    
            //
            // This makes the key centered
            //  
            hpos -= (length / 2);


            //
            // Override the horizontal/vertical positioning
            //
            if (typeof properties.keyPositionX === 'number') {hpos = properties.keyPositionX;}
            if (typeof properties.keyPositionY === 'number') {vpos = properties.keyPositionY;}
            
            // Now allow for offsetting the key
            if (typeof properties.keyPositionOffsetx === 'number') {hpos += properties.keyPositionOffsetx;}
            if (typeof properties.keyPositionOffsety === 'number') {vpos += properties.keyPositionOffsety;}

    

            //
            // Draw the box that the key sits in
            //
            if (   args.object.get('keyPositionGutterBoxed')
                || args.object.get('keyPositionMarginBoxed')
               ) {

                if (properties.keyShadow) {
                    args.object.context.shadowColor   = properties.keyShadowColor;
                    args.object.context.shadowBlur    = properties.keyShadowBlur;
                    args.object.context.shadowOffsetX = properties.keyShadowOffsetx;
                    args.object.context.shadowOffsetY = properties.keyShadowOffsety;
                }


                args.object.context.beginPath();

                    args.object.context.lineWidth = scaleFactor || 1;
                    args.object.context.fillStyle = fillstyle;
                    args.object.context.strokeStyle = strokestyle;

                    if (properties.keyRounded) {

                        RGraph.roundedRect({
                            context: args.object.context,
                                  x: hpos,
                                  y: vpos - vmargin - (scaleFactor * 4),
                              width: length,
                             height: text_size + vmargin + vmargin,
                             radius:  2 * scaleFactor
                        });
                    } else {
                        args.object.context.rect(
                            hpos,
                            vpos - vmargin  - (scaleFactor * 4),
                            length,
                            text_size + vmargin + vmargin
                        );
                    }

                args.object.context.stroke();
                args.object.context.fill();
    
    
                RGraph.noShadow(args.object);
            }

    
            //
            // Draw the blobs of color and the text
            //

            // Custom colors for the key
            if (properties.keyColors) {
                colors = properties.keyColors;
            }

            for (var i=0, pos=hpos; i<key.length; ++i) {

                pos += hmargin;

    

                //////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
                // Draw the blob of color
                if (typeof properties.keyColorShape === 'object' && typeof properties.keyColorShape[i] === 'string') {
                    var blob_shape = properties.keyColorShape[i];
                
                } else if (typeof properties.keyColorShape === 'object' && typeof properties.keyColorShape[i] === 'function') {
                    var blob_shape = properties.keyColorShape[i];
                
                // No array - just a function
                } else if (typeof properties.keyColorShape === 'function') {
                    var blob_shape = properties.keyColorShape;
                
                } else if (typeof properties.keyColorShape == 'string') {
                    var blob_shape = properties.keyColorShape;
                
                } else {
                    var blob_shape = 'rect';
                }

                // Allow for the keyPositionMarginHSpace property
                pos  += (properties.keyPositionMarginHSpace ? properties.keyPositionMarginHSpace : 0);


                //
                // Draw the blob of color - line
                //
                if (blob_shape =='line') {
                    
                    args.object.context.beginPath();
                        args.object.context.lineWidth = scaleFactor;
                        args.object.context.strokeStyle = colors[i];
                        args.object.context.moveTo(pos, vpos + (blob_size / 2) - 3);
                        args.object.context.lineTo(pos + blob_size, vpos + (blob_size / 2) - 3);
                    args.object.context.stroke();
                    
                // Circle
                } else if (blob_shape == 'circle') {
                    
                    args.object.context.beginPath();
                        args.object.context.fillStyle = colors[i];
                        args.object.context.moveTo(pos, vpos + (blob_size / 2));
                        args.object.context.arc(pos + (blob_size / 2), vpos + (blob_size / 2) - (scaleFactor === 2 ? 8 : 3), (blob_size / 2), 0, 6.28, 0);
                    args.object.context.fill();
                
                } else if (blob_shape == 'triangle') {
                
                    args.object.context.fillStyle = colors[i];
                    args.object.context.beginPath();
                        args.object.context.strokeStyle = colors[i];
                        args.object.context.moveTo(pos, vpos + blob_size - (scaleFactor ? 8 : 4) );
                        args.object.context.lineTo(pos + (blob_size / 2), vpos - (scaleFactor ? 8 : 4) );
                        args.object.context.lineTo(pos + blob_size, vpos + blob_size - (scaleFactor ? 8 : 4) );
                    args.object.context.closePath();
                    args.object.context.fill();

                } else if (typeof blob_shape === 'function') {

                    blob_shape({
                        object: args.object,
                        color: colors[i],
                        x: pos,
                        y: vpos,
                        width: blob_size,
                        height: blob_size
                    });

                } else {

                    args.object.context.beginPath();
                        args.object.context.fillStyle = colors[i];
                        args.object.context.rect(pos, vpos - (obj.properties.scale ? 8 : 4), blob_size, blob_size);
                    args.object.context.fill();
                }
    

    
                //////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    
                pos += blob_size;
                
                pos += hmargin;
    
                args.object.context.beginPath();
                    args.object.context.fillStyle = (typeof text_color === 'object') ? text_color[i] : text_color;

                    var ret = RGraph.text({
                        object:     args.object,
                        font:       text_font,
                        bold:       text_bold,
                        size:       text_size,
                        italic:     text_italic,
                        x:          pos +  + (properties.keyLabelsOffsetx || 0),
                        y:          vpos + text_size + 1 +  + (properties.keyLabelsOffsety || 0),
                        text:       key[i],
                        accessible: textAccessible
                    });
                args.object.context.fill();
                pos += args.object.context.measureText(key[i]).width;

                args.object.coords.key[i] = [
                    ret.x,
                    ret.y,
                    ret.width,
                    ret.height,
                    key[i],
                    colors[i],
                    args.object
                ];
            }
        };


















        if (keypos && (keypos === 'gutter' || keypos === 'margin')) {
            drawKey_margin();
        } else if (keypos && (keypos === 'graph' || keypos === 'chart') ) {
            drawKey_graph();
        } else {
            alert('[KEY] (' + args.object.id + ') Unknown key position: ' + keypos);
        }






        if (properties.keyInteractive) {

            if (!RGraph.Drawing || !RGraph.Drawing.Rect) {
                alert('[INTERACTIVE KEY] The drawing API Rect library does not appear to have been included (which the interactive key uses)');
            }



            //
            // Check that the RGraph.common.dynamic.js file has been included
            //
            if (!RGraph.installWindowMousedownListener) {
                alert('[INTERACTIVE KEY] The dynamic library does not appear to have been included');
            }



            // Determine the maximum width of the labels
            for (var i=0,len=args.object.coords.key.length,maxlen=0; i<len; i+=1) {
                maxlen = Math.max(maxlen, args.object.coords.key[i][2]);
            }


            //args.object.coords.key.forEach(function (value, index, arr)
            //{

            for (var i=0,len=args.object.coords.key.length; i<len; i+=1) {

                // Because the loop would have finished when the i variable is needed - put
                // the onclick function inside a new context so that the value of the i
                // variable is what we expect when the key has been clicked
                (function (idx)
                {
                    var arr   = args.object.coords.key;
                    var value = args.object.coords.key[idx];
                    var index = idx;
    

                    var rect = new RGraph.Drawing.Rect({
                        id:     args.object.id,
                        x:      value[0],
                        y:      value[1],
                        width:  (properties.keyPosition === 'gutter' || properties.keyPosition === 'margin') ? value[2] : maxlen,
                        height: value[3],
                        options: {
                            colorsFill: 'rgba(0,0,0,0)',
                            events: {
                                click: function (e, shape)
                                {
                                    rect.context.fillStyle = properties.keyInteractiveHighlightLabel;
                                    rect.context.fillRect(shape.x, shape.y, shape.width, shape.height);
            
                                    if (typeof args.object.interactiveKeyHighlight == 'function') {
            
                                        args.object.set('keyInteractiveIndex', idx);
            
                                        RGraph.fireCustomEvent(args.object, 'onbeforeinteractivekey');
                                        args.object.interactiveKeyHighlight(index);
                                        RGraph.fireCustomEvent(args.object, 'onafterinteractivekey');
                                    }
                                },
                                mousemove: function (e, shape)
                                {
                                    return true;
                                }
                            }
                        }
                    }).draw();
                    
                    //
                    // 27th June 2025
                    //
                    // Change the __object__ reference back to the
                    // Line chart object.
                    //
                    // After implementing the canvas antialiasing
                    // fix this is, evidentally, necessary. But
                    // why...?! Very strange. One for Mulder and
                    // Scully...
                    //
                    args.object.canvas.__object__ = args.object;
                })(i);
            }
        }
    };








    //
    // Returns the key length, but accounts for null values
    // 
    // @param array key The key elements
    //
    RGraph.getKeyLength = function (key)
    {
        var length = 0;

        for (var i=0,len=key.length; i<len; i+=1) {
            if (key[i] != null) {
                ++length;
            }
        }

        return length;
    };








    //
    // Create a TABLE based HTML key. There's lots of options so it's
    // suggested that you consult the documentation page
    // 
    // @param mixed id   This should be a string consisting of the ID of the container
    // @param object prop An object map of the various properties that you can use to
    //                    configure the key. See the documentation page for a list.
    //
    RGraph.HTML.key =
    RGraph.HTML.Key = function (id, properties)
    {
        var div = doc.getElementById(id);
        var uid = RGraph.createUID();

        
        //
        // Create the table that becomes the key. CSS Styles for
        // the table, the color blobs and the labels are set below
        // using the RGraph.setCSS() function.
        //
        var str = '<table border="0" cellspacing="0" cellpadding="0" id="rgraph_key_' + uid + '" ' + (properties.tableClass ? 'class="' + properties.tableClass + '"' : '') + '>';
        // 


        //
        // Add the individual key elements
        //
        for (var i=0; i<properties.labels.length; i+=1) {
            str += '<tr><td valign="top"><div id="rgraph_html_key_blob_' + i + '"     ' + (properties.blobClass ? 'class="rgraph_html_key_blob ' + properties.blobClass + '"' : 'rgraph_html_key_blob') + '>&nbsp;</div><td>' + (properties.links && properties.links[i] ? '<a href="' + properties.links[i] + '">' : '') + '<span ' + (properties.labelClass ? 'class="' + properties.labelClass + '"' : '') + '" id="rgraph_html_key_label_' + i + '">' + properties.labels[i] + '</span>' + (properties.links && properties.links[i] ? '</a>' : '') + '</td></tr>';
        }

        div.innerHTML += (str + '</table>');

        for (var i=0; i<properties.labels.length; i+=1) {
            var n = document.getElementById('rgraph_html_key_blob_' + i);
            n.style.width  = '20px';
            n.style.height = '20px';
        }













        // Set CSS for the whole table that has been specified
        RGraph.setCSS(doc.getElementById('rgraph_key_' + uid),
        {
            display: 'inline',
            ...properties.tableCss
        });




        
        
        
        
        
        
        
        
        // Set the CSS for each entry in the key
        for (var i=0; i<properties.labels.length; i+=1) {
            // Set Styles on each color blob
            RGraph.setCSS(doc.getElementById('rgraph_html_key_blob_' + i),
            {
                display: 'inline-block',
                marginRight: '5px',
                marginTop: '4px',
                width: '15px',
                height: '15px',
                backgroundColor: properties.colors[i],
                ...properties.blobCss
            });








            // Set the CSS that comes from the labelCss property
            RGraph.setCSS(
                doc.getElementById('rgraph_html_key_label_' + i),
                properties.labelCss
            );








            // If there are styles set for a particular label,
            // apply those too
            if (properties['labelCss_' + i]) {
                RGraph.setCSS(
                    doc.getElementById('rgraph_html_key_label_' + i),
                    properties['labelCss_' + i]
                );
            }
        }














        // Return the TABLE object that is the HTML key
        return doc.getElementById('rgraph_key_' + uid);
    };




// End module pattern
})(window, document);