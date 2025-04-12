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

    RGraph     = window.RGraph || {isrgraph:true,isRGraph:true,rgraph:true};
    RGraph.SVG = RGraph.SVG || {};
    
// Module pattern
(function (win, doc, undefined)
{
    //
    // Adds a zoom function to the chart
    //
    RGraph.SVG.addZoom = function (obj)
    {
        var state = {};
        state.mousedown = false;
        

        obj.svg.onmousedown = function (e)
        {
            if (e.button !== 0)
            {
                return;
            }

            var mouseXY = RGraph.SVG.getMouseXY(e);

            state.startXY   = mouseXY;
            state.mousedown = true;

            // Get the initial viewbox coords - used for
            // moving the zoom around
            if (obj.svg.getAttribute('viewBox')) {

                String(obj.svg.getAttribute('viewBox')).match(/([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+)/);

                state.initialViewbox = [
                    Number(RegExp.$1),
                    Number(RegExp.$2),
                    Number(RegExp.$3),
                    Number(RegExp.$4)
                ];
            }
            
            // If an outline exists already - remove it
            if (state.outline) {
                removeOutline();
            }

            if (!state.isZoomed) {
                state.outline   = RGraph.SVG.create({
                    svg: obj.svg,
                    type: 'rect',
                    parent: obj.svgAllGroup,
                    attr: {
                        x: mouseXY[0],
                        y: mouseXY[1],
                        width: 0,
                        height: 0,
                        stroke: 'black',
                        fill: 'rgba(255,0,0,0.25)',
                        'stroke-width': 2,
                        'stroke-dasharray': '3 3'
                    }
                });
            } else {
                // Move the zoomed in SVG around
                // Nada
            }
        };








        obj.svg.onmousemove = function (e)
        {
            var mouseXY = RGraph.SVG.getMouseXY(e);

            if (state.mousedown && !state.isZoomed) {
                
                state.endXY = mouseXY;
                
                // Update the width and height of the outline
                // rectangle
                state.outline.setAttribute(
                    'width',
                    state.endXY[0] - state.startXY[0]
                );

                state.outline.setAttribute(
                    'height',
                    (obj.height / obj.width) * (state.endXY[0] - state.startXY[0])
                );
                
                clearSelection();




            //
            // This facilitates moving the zoom around
            //
            } else if (state.isZoomed && state.mousedown) {

                var currentXY = RGraph.SVG.getMouseXY(e);

                var diffXY    = [
                    currentXY[0] - state.startXY[0],
                    currentXY[1] - state.startXY[1]
                ]

                // Get the existing viewBox coords
                obj.svg.getAttribute('viewBox').match(/^([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+)$/)


                // Set the new coordinates for the viewBox on the SVG tag

                obj.svg.setAttribute(
                    'viewBox',
                    vb = '{1} {2} {3} {4}'.format(
                        state.initialViewbox[0] + diffXY[0] * -1,
                        state.initialViewbox[1] + diffXY[1] * -1,
                        Number(RegExp.$3),
                        Number(RegExp.$4)
                    )
                );
                
                clearSelection();
            }
        };








        window.onmouseup = function (e)
        {
            state.mousedown = false;

            if (!state.isZoomed) {

                // Set the viewbox attribute on the SVG tag
                obj.svg.setAttribute(
                    'viewBox',
                    '{1} {2} {3} {4}'.format(
                        state.outline.getAttribute('x'),
                        state.outline.getAttribute('y'),
                        state.outline.getAttribute('width'),
                        state.outline.getAttribute('height')
                    )
                );
            
                // Get rid of the outline
                removeOutline();
                
                // Note that we're now zoomed
                state.isZoomed = true;
                
                // Clear any remaining selection
                clearSelection();
            }
        };








        obj.svg.onwheel = function (e)
        {
            if (state.isZoomed) {
                
                obj.svg.getAttribute('viewBox').match(/^([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+)$/);
                var viewbox = [
                    parseInt(RegExp.$1),
                    parseInt(RegExp.$2),
                    parseInt(RegExp.$3),
                    parseInt(RegExp.$4)
                ]

                var step = e.deltaY < 0 ? 3 : -3;

                if (step === -1) {
                    viewbox = [
                        viewbox[0] + step,
                        viewbox[1] + step,
                        viewbox[2] + (step * -2),
                        viewbox[3] + (step * -2)
                    ];
                } else {
                    viewbox = [
                        viewbox[0] + step,
                        viewbox[1] + step,
                        viewbox[2] + (step * -2),
                        viewbox[3] + (step * -2)
                    ];
                }

                // Set the new viewbox on the SVG
                obj.svg.setAttribute('viewBox', "{1} {2} {3} {4}".format(
                    viewbox[0],
                    viewbox[1],
                    viewbox[2],
                    viewbox[3]
                ));
                
                e.preventDefault();
            }
            

        };








        window.addEventListener('keydown', function (e)
        {
            if (e.keyCode === 27) {
                resetZoom();
                removeOutline();
            }
        });








        function resetZoom ()
        {
            obj.svg.setAttribute('viewBox', '0 0 {1} {2}'.format(obj.width, obj.height));
            state.isZoomed = false;
            clearSelection();
            removeOutline();
        }








        function removeOutline ()
        {
            if (state.outline) {
                state.outline.parentNode.removeChild(state.outline);
                state.outline = null;
            }
        }








        function clearSelection ()
        {
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document.selection) {
                document.selection.empty();
            }
        }
    };




// End module pattern
})(window, document);