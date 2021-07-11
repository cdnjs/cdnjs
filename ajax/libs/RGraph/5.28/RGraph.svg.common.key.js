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

    RGraph          = window.RGraph || {isrgraph:true,isRGraph:true,rgraph:true};
    RGraph.SVG      = RGraph.SVG || {};
    RGraph.SVG.HTML = RGraph.SVG.HTML || {};
    
// Module pattern
(function (win, doc, undefined)
{
    //
    // Draws the graph key (used by various graphs)
    // 
    // @param object obj The graph object
    // @param array  key An array of the texts to be listed in the key
    // @param colors An array of the colors to be used
    //
    RGraph.SVG.drawKey = function (obj)
    {
        var properties    = obj.properties,
            key           = properties.key,
            colors        = properties.keyColors || properties.colors,
            defaultFont   = 'Arial',
            blobSize      = 0,
            width         = 0,
            keyColorShape = properties.keyColorShape;
        
        // Work out the center point of the SVG tag
        var centerx = obj.svg.getAttribute('width') / 2;
        
        // If we're drawing a key on a funnel then work out the center of
        // the chart differently. This may be useful to other chart types
        // too
        if (obj.type === 'funnel') {
            centerx = (obj.graphWidth / 2) + properties.marginLeft;
        }




        // Loop thru the key and draw them
        if (key && key.length) {

            // First measure the length so that the key can be centered
            for (var i=0,length = 0; i<key.length; i++) {

                // First measure the text
                var textDimensions = RGraph.SVG.measureText({
                    text:   key[i],
                    italic: properties.keyLabelsItalic || properties.textItalic,
                    bold:   properties.keyLabelsBold   || properties.textBold,
                    font:   properties.keyLabelsFont   || properties.textFont || defaultFont,
                    size:   properties.keyLabelsSize   || properties.textSize,
                    cache:  false
                });

                blobSize = Math.max(blobSize, textDimensions[1]);
        
                width = width + 10 + blobSize + 5 + textDimensions[0];
            }
        
            // Center the key
            x = centerx - width / 2;









            // Get the text configuration
            var textConf = RGraph.SVG.getTextConf({
                object: obj,
                prefix: 'keyLabels'
            });


            for (var i=0,y=properties.marginTop - 5; i<key.length; ++i) {
            
                // Do this on the first iteration only
                if (i === 0) {
                    if (obj.type === 'pie' && properties.highlightStyle == 'outline') {
                        y -= properties.highlightStyleOutlineWidth;
                    }
                }
            
            
                // First measure the text
                var textDimensions = RGraph.SVG.measureText({
                    text: key[i],
                    italic: properties.keyLabelsItalic || properties.textItalic,
                    bold:   properties.keyLabelsBold   || properties.textBold,
                    font:   properties.keyLabelsFont   || properties.textFont || defaultFont,
                    size:   properties.keyLabelsSize   || properties.textSize,
                    cache: false
                });












                //
                // Draw the blob of color (accounting for it being an array first)
                //

                var shape = properties.keyColorShape;

                if (typeof shape === 'object') {
                    shape = properties.keyColorShape[i];
                }







                // A circle
                if (shape === 'circle') {
                    RGraph.SVG.create({
                        svg: obj.svg,
                        type: 'circle',
                        parent: obj.svg.all,
                        attr: {
                            cx: x + (blobSize / 2)  + properties.keyOffsetx,
                            cy: y - (blobSize / 2) + properties.keyOffsety,
                            r: blobSize / 2,
                            fill: colors[i]
                        }
                    });





                // A triangle
                } else if (shape === 'triangle') {
                    RGraph.SVG.create({
                        svg: obj.svg,
                        type: 'path',
                        parent: obj.svg.all,
                        attr: {
                            d: 'M {1} {2} L {3} {4} L {5} {6} z'.format(
                                x + properties.keyOffsetx + (blobSize / 2),
                                y - blobSize + properties.keyOffsety,
                                
                                x + properties.keyOffsetx + blobSize,
                                y + properties.keyOffsety,
                                
                                x + properties.keyOffsetx,
                                y + properties.keyOffsety                                
                            ),
                            fill: colors[i]
                        }
                    });





                // A line
                } else if (shape === 'line') {
                    RGraph.SVG.create({
                        svg: obj.svg,
                        type: 'path',
                        parent: obj.svg.all,
                        attr: {
                            d: 'M {1} {2} L {3} {4}'.format(
                                x + properties.keyOffsetx,
                                y - (blobSize / 2) + properties.keyOffsety,
                                
                                x + properties.keyOffsetx + blobSize,
                                y - (blobSize / 2) + properties.keyOffsety
                            ),
                            stroke: colors[i],
                            'stroke-width': 2,
                            'stroke-linecap': 'round'
                        }
                    });





                // A dot
                } else if (shape === 'dot') {

                    RGraph.SVG.create({
                        svg: obj.svg,
                        type: 'path',
                        parent: obj.svg.all,
                        attr: {
                            d: 'M {1} {2} L {3} {4}'.format(
                                x + properties.keyOffsetx,
                                y - (blobSize / 2) + properties.keyOffsety,
                                
                                x + properties.keyOffsetx + blobSize,
                                y - (blobSize / 2) + properties.keyOffsety
                            ),
                            stroke: colors[i],
                            'stroke-width': 2,
                            'stroke-linecap': 'round'
                        }
                    });

                    RGraph.SVG.create({
                        svg: obj.svg,
                        type: 'circle',
                        parent: obj.svg.all,
                        attr: {
                            cx: x + (blobSize / 2)  + properties.keyOffsetx,
                            cy: y - (blobSize / 2) + properties.keyOffsety,
                            r: blobSize / 4,
                            fill: colors[i]
                        }
                    });

                // A dot
                } else if (shape === 'squaredot' || shape === 'rectdot') {

                    // Create the line
                    RGraph.SVG.create({
                        svg: obj.svg,
                        type: 'path',
                        parent: obj.svg.all,
                        attr: {
                            d: 'M {1} {2} L {3} {4}'.format(
                                x + properties.keyOffsetx,
                                y - (blobSize / 2) + properties.keyOffsety,

                                x + properties.keyOffsetx + blobSize,
                                y - (blobSize / 2) + properties.keyOffsety
                            ),
                            stroke: colors[i],
                            'stroke-width': 2,
                            'stroke-linecap': 'round'
                        }
                    });

                    RGraph.SVG.create({
                        svg: obj.svg,
                        type: 'rect',
                        parent: obj.svg.all,
                        attr: {
                            x: x + (blobSize / 4) + properties.keyOffsetx,
                            y: y + (blobSize / 4) - blobSize + properties.keyOffsety,
                            width: blobSize / 2,
                            height: blobSize / 2,
                            fill: colors[i]
                        }
                    });



                // Ccustom
                } else if (typeof shape === 'function') {
                    RGraph.SVG.create({
                        svg: obj.svg,
                        type: 'path',
                        parent: obj.svg.all,
                        attr: {
                            d: 'M {1} {2} L {3} {4}'.format(
                                x + properties.keyOffsetx,
                                y - (blobSize / 2) + properties.keyOffsety,
                                
                                x + properties.keyOffsetx + blobSize,
                                y - (blobSize / 2) + properties.keyOffsety
                            ),
                            stroke: colors[i],
                            'stroke-width': 2,
                            'stroke-linecap': 'round'
                        }
                    });



                // A rectangle default
                } else {
                    RGraph.SVG.create({
                        svg: obj.svg,
                        type: 'rect',
                        parent: obj.svg.all,
                        attr: {
                            x: x + properties.keyOffsetx,
                            y: y - blobSize + properties.keyOffsety,
                            width: blobSize,
                            height: blobSize,
                            fill: colors[i]
                        }
                    });
                }

                //
                // Add the text
                //
                RGraph.SVG.text({
                    
                    object:     obj,
                    parent:     obj.svg.all,
                    tag:        'key',
                    
                    size:       textConf.size,
                    bold:       textConf.bold,
                    italic:     textConf.italic,
                    font:       textConf.font,
                    color:      textConf.color,

                    halign:     'left',
                    valign:     'bottom',
                    
                    text:       key[i],
                    
                    x:          x + blobSize + 5 + properties.keyLabelsOffsetx + properties.keyOffsetx,
                    y:          y + properties.keyLabelsOffsety + properties.keyOffsety,
                    
                    background: properties.keyLabelsBackground || 'white',
                    padding:    0
                })
    
                x += 10 + blobSize + 5 + textDimensions[0];
            }
        }
    };








    //
    // Create a TABLE based HTML key. There's lots of options so it's
    // suggested that you consult the documentation page
    // 
    // @param mixed id   This should be a string consisting of the ID of the container
    // @param object prop An object map of the various properties that you can use to
    //                    configure the key. See the documentation page for a list.
    //
    RGraph.SVG.HTML.key = function (id, properties)
    {
        var div = doc.getElementById(id);

        
        //
        // Create the table that becomes the key
        //
        var str = '<table border="0" cellspacing="0" cellpadding="0" id="rgraph_key" style="display: inline;' + (function ()
            {
                var style = ''
                for (i in properties.tableCss) {
                    if (typeof i === 'string') {
                        style = style + i + ': ' + properties.tableCss[i] + ';';
                    }
                }
                return style;
            })() + '" ' + (properties.tableClass ? 'class="' + properties.tableClass + '"' : '') + '>';



        //
        // Add the individual key elements
        //
        for (var i=0; i<properties.labels.length; i+=1) {
            str += '<tr><td><div style="' + (function ()
            {
                var style = '';

                for (var j in properties.blobCss) {
                    if (typeof j === 'string') {
                        style = style + j + ': ' + properties.blobCss[j] + ';';
                    }
                }

                return style;
            })() + 'display: inline-block; margin-right: 5px; margin-top: 4px; width: 15px; height: 15px; background-color: ' + properties.colors[i] + '"' + (properties.blobClass ? 'class="' + properties.blobClass + '"' : '') + '>&nbsp;</div><td>' + (properties.links && properties.links[i] ? '<a href="' + properties.links[i] + '">' : '') + '<span ' + (properties.labelClass ? 'class="' + properties.labelClass + '"' : '') + '" style="' + (function ()
            {
                var style = '';

                for (var j in properties.labelCss) {
                    if (typeof j === 'string') {
                        style = style + j + ': ' + properties.labelCss[j] + ';';
                    }
                }

                return style;
            })() + '" ' + (function ()
            {
                var style = '';

                if (properties['labelCss_' + i]) {
                    for (var j in properties['labelCss_' + i]) {
                        style = style + j + ': ' + properties['labelCss_' + i][j] + ';';
                    }
                }

                return style ? 'style="' + style + '"' : '';
            })() + '>' + properties.labels[i] + '</span>' + (properties.links && properties.links[i] ? '</a>' : '') + '</td></tr>';
        }
        
        div.innerHTML += (str + '</table>');

        // Return the TABLE object that is the HTML key
        return doc.getElementById('rgraph_key');
    };




// End module pattern
})(window, document);