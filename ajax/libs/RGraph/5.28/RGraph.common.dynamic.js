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
    // Initialise the various objects
    //
    RGraph = window.RGraph || {isrgraph:true,isRGraph: true,rgraph:true};

// Module pattern
(function (win, doc, undefined)
{
    var ua = navigator.userAgent;

    //
    // This is the window click event listener. It redraws all canvas tags on the page.
    //
    RGraph.installWindowMousedownListener = function (obj)
    {
        if (!RGraph.window_mousedown_event_listener) {

            RGraph.window_mousedown_event_listener = function (e)
            {
                //
                // For firefox add the window.event object
                //
                if (navigator.userAgent.indexOf('Firefox') >= 0) win.event = e;

                if (RGraph.hideTooltip && RGraph.Registry.get('tooltip')) {
                    RGraph.clear(RGraph.Registry.get('tooltip').__canvas__);
                    RGraph.redraw();
                    RGraph.hideTooltip();
                }
            };
            win.addEventListener('mousedown', RGraph.window_mousedown_event_listener, false);
        }
    };








    //
    // This is the window click event listener. It redraws all canvas tags on the page.
    //
    RGraph.installWindowMouseupListener = function (obj)
    {
        if (!RGraph.window_mouseup_event_listener) {
            RGraph.window_mouseup_event_listener = function (e)
            {
                //
                // For firefox add the window.event object
                //
                if (navigator.userAgent.indexOf('Firefox') >= 0) win.event = e;
    
                //
                // Stop any annotating that may be going on
                //
                if (RGraph.annotating_window_onmouseup) {
                    RGraph.annotating_window_onmouseup(e);
                    return;
                }
    
                //
                // End adjusting
                //
                if (RGraph.Registry.get('adjusting') || RGraph.Registry.get('adjusting.gantt')) {
                
                    var obj = RGraph.Registry.get('adjusting');

                    // If it's a line chart update the data_arr variable
                    if (obj && obj.type === 'line') {
                        obj.data_arr = RGraph.arrayLinearize(obj.data);
                    }

                    RGraph.fireCustomEvent(RGraph.Registry.get('adjusting'), 'onadjustend');
                }
    
                RGraph.Registry.set('adjusting', null);
                RGraph.Registry.set('adjusting.shape', null);
                RGraph.Registry.set('adjusting.gantt', null);
    
    
                // ==============================================
                // Finally, redraw the chart
                // ==============================================

                var tags = document.getElementsByTagName('canvas');
                for (var i=0; i<tags.length; ++i) {
                    if (tags[i].__object__ && tags[i].__object__.isRGraph) {
                        if (!tags[i].__object__.get('annotatable')) {
                            if (!tags[i].__rgraph_trace_cover__ && !noredraw) {
                                RGraph.clear(tags[i]);
                            } else {
                                var noredraw = true;
                            }
                        }
                    }
                }
    
                if (!noredraw) {
                    RGraph.redraw();
                }
            };
            win.addEventListener('mouseup', RGraph.window_mouseup_event_listener, false);
        }
    };








    //
    // This is the canvas mouseup event listener. It installs the mouseup event for the
    // canvas. The mouseup event then checks the relevant object.
    // 
    // @param object obj The chart object
    //
    RGraph.installCanvasMouseupListener = function (obj)
    {
        if (!obj.canvas.rgraph_mouseup_event_listener) {
            obj.canvas.rgraph_mouseup_event_listener = function (e)
            {

                //
                // For firefox add the window.event object
                //
                if (navigator.userAgent.indexOf('Firefox') >= 0) window.event = e;
    
                // *************************************************************************
                // Tooltips
                // *************************************************************************

    
                // This causes things at the edge of the chart area - eg line chart hotspots - not to fire because the
                // cursor is out of the chart area
                var objects = RGraph.ObjectRegistry.getObjectsByXY(e);
                //var objects = RGraph.ObjectRegistry.getObjectsByCanvasID(e.target.id);


                if (objects) {

                    for (var i=0,len=objects.length; i<len; i+=1) {

                        var obj = objects[i],
                            id  = objects[i].id;

    
                        // =========================================================================
                        // The drawing API text object supports the link configuration property
                        // ========================================================================
                        var link = obj.get('link');
                        
                        if (obj.type == 'drawing.text' && typeof link === 'string') {

                            var link_target  = obj.get('linkTarget');
                            var link_options = obj.get('linkOptions');

                            window.open(link, link_target ? link_target : null, link_options);
                        }

    
                        // ========================================================================
                        // Tooltips
                        // ========================================================================
    

                        if (!RGraph.isNull(obj) && RGraph.tooltip) {
    
                            var shape = obj.getShape(e);

                            if (shape && shape.tooltip) {

                                var text = shape.tooltip;

                                if (text) {

                                    var type = shape.object.type;
    
                                    RGraph.clear(obj.canvas);
                                    RGraph.redraw();
                                    RGraph.Registry.set('tooltip.shape', shape);
                                    
                                    // Note that tooltips are positioned at the pointer
                                    // now; and thats done within the .tooltip() function
                                    RGraph.tooltip(obj, text, 0, 0, shape.sequentialIndex, e);

                                    obj.highlight(shape);

                                    // Add the shape that triggered the tooltip
                                    if (RGraph.Registry.get('tooltip')) {
                                        
                                        RGraph.Registry.get('tooltip').__shape__ = shape;
    
                                        RGraph.evaluateCursor(e);
                                    }
    
                                    e.cancelBubble = true;
                                    e.stopPropagation();
                                    return false;
                                }
                            }
                        }
    
    
    
    
    
                        // =========================================================================
                        // Adjusting
                        // ========================================================================
        
        
        
                        if (RGraph.Registry.get('adjusting') || RGraph.Registry.get('adjusting.gantt')) {

                        //var obj = RGraph.Registry.get('adjusting');
                    
                        // If it's a line chart update the data_arr variable
                        if (obj && obj.type === 'line') {
                            obj.data_arr = RGraph.arrayLinearize(obj.data);
                        }

                            RGraph.fireCustomEvent(RGraph.Registry.get('adjusting'), 'onadjustend');
                        }
        
                        RGraph.Registry.set('adjusting', null);
                        RGraph.Registry.set('adjusting.shape', null);
                        RGraph.Registry.set('adjusting.gantt', null);
    
                        //
                        // If the mouse pointer is over a "front" chart this prevents charts behind it
                        // from firing their events.
                        //
                        if (shape || (obj.overChartArea && obj.overChartArea(e)) ) {
                            break;
                        }
                    }
                }
            };
            obj.canvas.addEventListener('mouseup', obj.canvas.rgraph_mouseup_event_listener, false);
        }
    };








    //
    // This is the canvas mousemove event listener.
    // 
    // @param object obj The chart object
    //
    RGraph.installCanvasMousemoveListener = function (obj)
    {
        if (!obj.canvas.rgraph_mousemove_event_listener) {
            obj.canvas.rgraph_mousemove_event_listener = function (e)
            {
                //
                // For firefox add the window.event object
                //
                if (navigator.userAgent.indexOf('Firefox') >= 0) window.event = e;

    
    
    
                //
                // Go through all the objects and check them to see if anything needs doing
                //
                var objects = RGraph.OR.getObjectsByXY(e);

                // Necessary to track which objects have had the mouseover
                // triggered on them
                var uids = [];

                if (objects && objects.length > 0) {

                    for (var i=0,len=objects.length; i<len; i+=1) {

                        var obj = objects[i];
                        var id  = obj.id;


                        // Record the uid
                        uids[obj.uid] = true;


                        if (!obj.getShape) {
                            continue;
                        }
    

                        var shape = obj.getShape(e);

                        // If the object has changed (based on the UID) then
                        // fire the prior objects mouseout event
                        if (RGraph.last_mouseover_uid && RGraph.last_mouseover_uid !== obj.uid) {

                            RGraph.fireCustomEvent(RGraph.last_mouseover_object, 'onmouseout');

                            RGraph.last_mouseover_object.__mouseover_shape_index__ = null;
                            RGraph.last_mouseover_object.__mouseover_shape__       = null;
                            RGraph.last_mouseover_object = null;
                            RGraph.last_mouseover_uid    = null;
                        }

                        // Fire the onmouseout event if necessary
                        if (
                               (!shape && typeof obj.__mouseover_shape_index__ === 'number')
                            || (shape && typeof obj.__mouseover_shape_index__ === 'number' && shape.index !== obj.__mouseover_shape_index__)
                            
                            ) {

                            RGraph.fireCustomEvent(obj, 'onmouseout');
                        }







                        //
                        // If the mouse is over a key element add the details
                        // of it to the Registry
                        //
                        if (obj.coords && obj.coords.key && obj.coords.key.length) {

                            var mouseXY = RGraph.getMouseXY(e);

                            for (var i=0,overkey=false; i<obj.coords.key.length; ++i) {

                                if (
                                       mouseXY[0] >= obj.coords.key[i][0]
                                    && mouseXY[0] <= (obj.coords.key[i][0] + obj.coords.key[i][2])
                                    && mouseXY[1] >= obj.coords.key[i][1]
                                    && mouseXY[1] <= (obj.coords.key[i][1] + obj.coords.key[i][3])
                                   ) {

                                    RGraph.Registry.set('key-element', obj.coords.key[i]);
                                    overkey = true;
                                }

                                if (!overkey) {
                                    RGraph.Registry.set('key-element', null);
                                }
                            }
                        }




                        // ================================================================================================ //
                        // This facilitates the onmousemove facility
                        // ================================================================================================ //
                        
                        var func = null;    
                        if (!func && typeof obj.onmousemove == 'function') {
                            var func = obj.onmousemove;
                        }

                        //
                        // 
                        //
                        if (shape) {

                            var index = shape.sequentialIndex;

                            if (typeof obj['$' + index] === 'object' && typeof obj['$' + index].onmousemove == 'function') {
                                var func2 = obj['$' + index].onmousemove;
                            }
                        }

                        //
                        // This bit saves the current pointer style if there isn't one already saved
                        //
                        if (shape && (typeof func == 'function' || typeof func2 == 'function' || typeof obj.get('link') === 'string')) {

                            if (obj.get('eventsMousemoveRevertto') == null) {
                                obj.set('eventsMousemoveRevertto', e.target.style.cursor);
                            }

                            if (typeof func  == 'function')  RGraph.custom_events_mousemove_pointer = func(e, shape);
                            if (typeof func2 == 'function') RGraph.custom_events_mousemove_pointer  = RGraph.custom_events_mousemove_pointer || func2(e, shape);

                            // Go through the RGraph.events array looking for more
                            // event listeners
                            if (   typeof RGraph.events === 'object'
                                && typeof RGraph.events[obj.uid] === 'object') {
                                
                                for (i in RGraph.events[obj.uid]) {
                                
                                    if (   typeof i === 'string'
                                        && typeof RGraph.events[obj.uid][i] === 'object'
                                        && RGraph.events[obj.uid][i][1] === 'onmousemove'
                                        && typeof RGraph.events[obj.uid][i][2] === 'function') {
                                        
                                        (RGraph.events[obj.uid][i][2])(obj);
                                    }
                                }
                            }
                            //return;
    
                        } else if (typeof obj.get('eventsMousemoveRevertto') == 'string') {
                        
                            RGraph.cursor.push('default');
                            obj.set('eventsMousemoveRevertto', null);
                        }





















                        // ======================================================
                        // This bit of code facilitates the onmouseover event
                        // ======================================================



                        var func = null;

                        if (!func && typeof obj.onmouseover === 'function') {
                            func = obj.onmouseover;
                        }


                        // Allow for individually index functions to be specified
                        if (shape) {
                        
                            var index = shape.sequentialIndex;

                            if (typeof obj['$' + index] == 'object' && typeof obj['$' + index].onmouseover == 'function') {
                                var func2 = obj['$' + index].onmouseover;
                            }
                        } else {

                            obj.__mouseover_shape_index__ = null;
                            RGraph.__mouseover_objects__  = [];
                            RGraph.last_mouseover_uid     = null;
                            RGraph.last_mouseover_object  = null;
                        }

                        if (typeof RGraph.__mouseover_objects__ === 'undefined') {
                            RGraph.__mouseover_objects__ = [];
                            RGraph.last_mouseover_uid    = null;
                            RGraph.last_mouseover_object = null;
                        }


                        if (shape) {
                            if ((obj.__mouseover_shape_index__ === shape.index) === false) {

                                obj.__mouseover_shape__       = shape;
                                obj.__mouseover_shape_index__ = shape.index;
                                RGraph.last_mouseover_uid    = obj.uid;
                                RGraph.last_mouseover_object = obj;
                                RGraph.__mouseover_objects__.push(obj);

                                if (func) func(e, shape);
                                if (func2) func2(e, shape);

                                // Go through the RGraph.events array looking for more
                                // event listeners
                                if (   typeof RGraph.events === 'object'
                                    && typeof RGraph.events[obj.uid] === 'object') {
                                    
                                    for (i in RGraph.events[obj.uid]) {
                                    
                                        if (   typeof i === 'string'
                                            && typeof RGraph.events[obj.uid][i] === 'object'
                                            && RGraph.events[obj.uid][i][1] === 'onmouseover'
                                            && typeof RGraph.events[obj.uid][i][2] === 'function') {
                                            
                                            (RGraph.events[obj.uid][i][2])(obj);
                                        }
                                    }
                                }
                            }
                        } else {
                            obj.__mouseover_shape_index__ = null;
                            RGraph.__mouseover_objects__      = [];
                            RGraph.last_mouseover_uid         = null;
                            RGraph.last_mouseover_object      = null;
                        }






















    
                        // ================================================================================================ //
                        // Tooltips
                        // ================================================================================================ //
                        var current_tooltip = RGraph.Registry.get('tooltip');
                        var tooltips        = obj.get('tooltips');
                        var tooltips_event  = obj.get('tooltipsEvent');


                        if (   shape
                            && (tooltips && tooltips[shape.index] || shape.tooltip)
                            && tooltips_event.indexOf('mousemove')  !== -1
                            && (   RGraph.isNull(current_tooltip)             // Is there a tooltip being shown?
                                || obj.uid != current_tooltip.__object__.uid  // Same object?
                                || (current_tooltip.__index__ != shape.sequentialIndex) // Same datapiece index? [UPDATE ON 29/10/2019 TO TRY AND MATCH THE sequentialIndex]
                                || (typeof shape.dataset === 'number' && shape.dataset != current_tooltip.__shape__.dataset) // Different dataset index
                                )
                           ) {

                            RGraph.clear(obj.canvas);
                            RGraph.hideTooltip();
                            RGraph.redraw();
                            obj.canvas.rgraph_mouseup_event_listener(e);
    
                            return;
                        }
            
            
                        // ================================================================================================ //
                        // Adjusting
                        // ================================================================================================ //
            

                        if (obj && obj.get('adjustable')) {
                            obj.adjusting_mousemove(e);
                        }
                    
    
                        //
                        // This facilitates breaking out of the loop when a shape has been found - 
                        // ie the cursor is over a shape an upper chart
                        //
                        if (shape || (obj.overChartArea && obj.overChartArea(e) )) {
                            break;
                        }
                    }
                    
                    //
                    // For all objects that are NOT mouseover'ed, reset the
                    // mouseover flag back to null
                    //
                    var objects = RGraph.OR.getObjectsByCanvasID(e.target.id);

                    for (var i=0; i<objects.length; ++i) {
                        if (!uids[objects[i].uid]) {
                            objects[i].__mouseover_shape_index__ = null;
                        }
                    }

                } else {

                    // Reset the mouseover flag on all of this canvas tags objects
                    var objects = RGraph.OR.getObjectsByCanvasID(e.target.id);

                    for (var i=0; i<objects.length; i++) {
                        if (typeof objects[i].__mouseover_shape_index__ === 'number') {
                            RGraph.fireCustomEvent(objects[i], 'onmouseout');
                        }

                        objects[i].__mouseover_shape_index__ = null;
                    }

                    RGraph.__mouseover_objects__ = [];
                    RGraph.last_mouseover_uid         = null;
                    RGraph.last_mouseover_object      = null;
                }







                // ================================================================================================ //
                // Crosshairs
                // ================================================================================================ //
    

                if (e.target && e.target.__object__ && e.target.__object__.get('crosshairs')) {
                    RGraph.drawCrosshairs(e, e.target.__object__);
                }
            
            
                // ================================================================================================ //
                // Interactive key No LONGER REQUIRED
                // ================================================================================================ //
    
    
                //if (typeof InteractiveKey_line_mousemove == 'function') InteractiveKey_line_mousemove(e);
                //if (typeof InteractiveKey_pie_mousemove == 'function') InteractiveKey_pie_mousemove(e);
    
    
                // ================================================================================================ //
                // Annotating
                // ================================================================================================ //
    
    
                if (e.target.__object__ && e.target.__object__.get('annotatable') && RGraph.annotating_canvas_onmousemove) {
                    RGraph.annotating_canvas_onmousemove(e);
                }
    
    
    
                //
                // Determine the pointer
                //
                RGraph.evaluateCursor(e);
            };
            obj.canvas.addEventListener('mousemove', obj.canvas.rgraph_mousemove_event_listener, false);
        }
    };








    //
    // This is the canvas mousedown event listener.
    // 
    // @param object obj The chart object
    //
    RGraph.installCanvasMousedownListener = function (obj)
    {
        if (!obj.canvas.rgraph_mousedown_event_listener) {
            obj.canvas.rgraph_mousedown_event_listener = function (e)
            {
                //
                // For firefox add the window.event object
                //
                if (navigator.userAgent.indexOf('Firefox') >= 0) window.event = e;

    
                //
                // Annotating
                //
                if (e.target.__object__ && e.target.__object__.get('annotatable') && RGraph.annotating_canvas_onmousedown) {
                    RGraph.annotating_canvas_onmousedown(e);
                    return;
                }
    
                var obj = RGraph.ObjectRegistry.getObjectByXY(e);

                if (obj) {

                    var id = obj.id;
                    



                    //
                    // Handle adjusting for all object types
                    //
                    if (obj && obj.isRGraph && obj.get('adjustable')) {
                        //
                        // Check the cursor is in the correct area
                        //
                        var obj = RGraph.OR.getObjectByXY(e);
    
                        if (obj && obj.isRGraph) {
                        
                            // If applicable, get the appropriate shape and store it in the registry
                            switch (obj.type) {
                                case 'bar':   var shape = obj.getShapeByX(e); break;
                                case 'gantt':
                                    
                                    var shape = obj.getShape(e);

                                    if (shape) {
                                        
                                        var data =    typeof obj.data[shape.dataset] === 'object'
                                                   && obj.data[shape.dataset][shape.index]
                                                   && obj.data[shape.dataset][shape.index].start
                                                   ?
                                                    obj.data[shape.dataset][shape.index] :
                                                    obj.data[shape.dataset];

                                        var mouseXY = RGraph.getMouseXY(e);

                                        RGraph.Registry.set('adjusting.gantt', {
                                            dataset:        shape.dataset,
                                            index:          shape.index,
                                            object:         obj,
                                            mousex:         mouseXY[0],
                                            mousey:         mouseXY[1],
                                            event:          data,
                                            event_start:    data.start,
                                            event_duration: data.duration,
                                            mode:           (mouseXY[0] > (shape.x + shape.width - 5) ? 'resize' : 'move'),
                                            shape:          shape
                                        });
                                    }
                                    break;
                                case 'line':      var shape = obj.getShape(e); break;
                                case 'hbar':      var shape = obj.getShapeByY(e); break;
                                case 'activity':  var shape = obj.getShape(e); break;
                                default:          var shape = null;
                            }

                            //
                            // Added 30/9/2016
                            // Now check the index in the adjustingLimitto property
                            // If that property is an object and the appropriate index is
                            // truthy then allow adjusting, otherwise don't.
                            //
                            if (
                                   RGraph.isNull(obj.properties.adjustableOnly)
                                || typeof obj.properties.adjustableOnly === 'undefined'
                                ||
                                   (
                                       RGraph.isArray(obj.properties.adjustableOnly)
                                    && obj.isAdjustable
                                    && obj.isAdjustable(shape)
                                   )
                               ) {

                                RGraph.Registry.set('adjusting.shape', shape);


                                // Fire the onadjustbegin event
                                RGraph.fireCustomEvent(obj, 'onadjustbegin');
        
                                RGraph.Registry.set('adjusting', obj);
            
        
                                // Liberally redraw the canvas
                                RGraph.clear(obj.canvas);
                                RGraph.redraw();
            
                                // Call the mousemove event listener so that the canvas
                                // is adjusted even though the mouse isn't moved
                                obj.canvas.rgraph_mousemove_event_listener(e);
                            }
                        }
                    }
    
    
                    RGraph.clear(obj.canvas);
                    RGraph.redraw();
                }
            };
            obj.canvas.addEventListener('mousedown', obj.canvas.rgraph_mousedown_event_listener, false);
        }
    };








    //
    // This is the canvas click event listener. Used by the pseudo event listener
    // 
    // @param object obj The chart object
    //
    RGraph.installCanvasClickListener = function (obj)
    {
        if (!obj.canvas.rgraph_click_event_listener) {
            obj.canvas.rgraph_click_event_listener = function (e)
            {
                //
                // For firefox add the window.event object
                //
                if (navigator.userAgent.indexOf('Firefox') >= 0) window.event = e;
    
                var objects = RGraph.ObjectRegistry.getObjectsByXY(e);

                for (var i=0,len=objects.length; i<len; i+=1) {

                    var obj   = objects[i];
                    var id    = obj.id;
                    var shape = obj.getShape(e);

                    //
                    // This bit saves the current pointer style if there isn't one already saved
                    //
                    var func = null;                    
                    if (!func && typeof obj.onclick == 'function') {
                        func = obj.onclick;
                    }

                    if (shape && typeof func == 'function') {

                        func(e, shape);

                        // Go through the RGraph.events array looking for more
                        // event listeners

                        if (   typeof RGraph.events === 'object'
                            && typeof RGraph.events[obj.uid] === 'object') {

                            for (i in RGraph.events[obj.uid]) {

                                if (   typeof i === 'string'
                                    && typeof RGraph.events[obj.uid][i] === 'object'
                                    && RGraph.events[obj.uid][i][1] === 'onclick'
                                    && typeof RGraph.events[obj.uid][i][2] === 'function') {
                                    
                                    (RGraph.events[obj.uid][i][2])(obj);
                                }
                            }
                        }
                        
                        //
                        // If objects are layered on top of each other this return
                        // stops objects underneath from firing once the "top"
                        // objects user event has fired
                        //
                        return;
                    }
                    
                    
                    
                    //
                    // Handle the key click event
                    //
                    var key = RGraph.Registry.get('key-element');
                    if (key) {
                        RGraph.fireCustomEvent(obj, 'onkeyclick');
                    }





                    //
                    // The property takes priority over this.
                    //
                    if (shape) {
    
                        var index = shape.sequentialIndex;
        
                        if (typeof index == 'number' && obj['$' + index]) {
                            
                            var func = obj['$' + index].onclick;

                            if (typeof func == 'function') {
                                
                                func(e, shape);
                                
                                //
                                // If objects are layered on top of each other this return
                                // stops objects underneath from firing once the "top"
                                // objects user event has fired
                                //
                                return;
                            }
                        }
                    }
                    
                    //
                    // This facilitates breaking out of the loop when a shape has been found - 
                    // ie the cursor is over a shape an upper chart
                    //
                    if (shape || (obj.overChartArea && obj.overChartArea(e)) ) {
                        break;
                    }
                }
            };
            obj.canvas.addEventListener('click', obj.canvas.rgraph_click_event_listener, false);
        }
    };








    //
    // This function evaluates the various cursor settings and if there's one for pointer, changes it to that
    //
    RGraph.evaluateCursor = function (e)
    {
        if (e.rgraph_evaluateCursor === false) {
            return;
        }

        var obj     = null;
        var mouseXY = RGraph.getMouseXY(e);
        var mouseX  = mouseXY[0];
        var mouseY  = mouseXY[1];
        var canvas  = e.target;

        //
        // Tooltips cause the mouse pointer to change
        //
        var objects = RGraph.OR.getObjectsByCanvasID(canvas.id);
        
        for (var i=0,len=objects.length; i<len; i+=1) {
            if ((objects[i].getShape && objects[i].getShape(e)) || (objects[i].overChartArea && objects[i].overChartArea(e))) {
                var obj = objects[i];
                var id  = obj.id;
            }
        }

        if (!RGraph.isNull(obj)) {
            if (obj.getShape && obj.getShape(e)) {

                var shape = obj.getShape(e);

                if (obj.get('tooltips')) {

                    var text = RGraph.parseTooltipText(obj.get('tooltips'), shape.sequentialIndex);

                    if (!text && shape.object.type == 'scatter' && shape.index) {
                        text = RGraph.parseTooltipText(obj.get('tooltips'), shape.index);
                    }

                    //
                    // This essentially makes front charts "hide" the back charts
                    //
                    if (text) {
                        var pointer = true;
                    }
                }
            }

            //
            // Now go through the key coords and see if it's over that.
            //
            if (!RGraph.isNull(obj) && obj.get('keyInteractive')) {
                for (var j=0; j<obj.coords.key.length; ++j) {
                    if (mouseX > obj.coords.key[j][0] && mouseX < (obj.coords.key[j][0] + obj.coords.key[j][2]) && mouseY > obj.coords.key[j][1] && mouseY < (obj.coords.key[j][1] + obj.coords.key[j][3])) {
                        var pointer = true;
                    }
                }
            }
        }

        //
        // It can be specified in the user mousemove event - remember it can now
        // be specified in THREE ways
        //
        if (RGraph.custom_events_mousemove_pointer) {
            var pointer = true;
            RGraph.custom_events_mousemove_pointer = false;
        }
//
//
//            
//            var index = shape.object.type == 'scatter' ? shape.index_adjusted : shape.index;
//
//            if (!RGraph.isNull(obj['$' + index]) && typeof obj['$' + index].onmousemove == 'function') {
//                var str = (obj['$' + index].onmousemove).toString();
//                if (str.match(/pointer/) && str.match(/cursor/) && str.match(/style/)) { 
//                    var pointer = true;
//                }
//            }
//        }
//

        //
        // Is the chart resizable? Go through all the objects again
        //
        var objects = RGraph.OR.objects.byCanvasID;

        for (var i=0,len=objects.length; i<len; i+=1) {
            if (objects[i] && objects[i][1].get('resizable')) {
                var resizable = true;
            }
        }

        if (resizable && mouseX > (e.target.width - 32) && mouseY > (e.target.height - 16)) {
            pointer = true;
        }


        if (pointer) {
            e.target.style.cursor = 'pointer';
        } else if (e.target.style.cursor == 'pointer') {
            e.target.style.cursor = 'default';
        } else {
            e.target.style.cursor = null;
        }

        

        // =========================================================================
        // Resize cursor - check mouseis in bottom left corner and if it is change it
        // =========================================================================


        if (resizable && mouseX >= (e.target.width - 15) && mouseY >= (e.target.height - 15)) {
            e.target.style.cursor = 'move';
        
        } else if (e.target.style.cursor === 'move') {
            e.target.style.cursor = 'default';
        }


        // =========================================================================
        // Interactive key
        // =========================================================================



        if (typeof mouse_over_key == 'boolean' && mouse_over_key) {
            e.target.style.cursor = 'pointer';
        }

        
        // =========================================================================
        // Gantt chart adjusting
        // =========================================================================

        //if (obj && obj.type == 'gantt' && obj.get('adjustable')) {
        //    if (obj.getShape && obj.getShape(e)) {
        //        e.target.style.cursor = 'ew-resize';
        //    } else {
        //        e.target.style.cursor = 'default';
        //    }
        //} else if (!obj || !obj.type) {
        //    e.target.style.cursor = cursor;
        //}

        
        // =========================================================================
        // Line chart adjusting
        // =========================================================================


        if (obj && obj.type == 'line' && obj.get('adjustable')) {
            if (obj.getShape) {

                var shape = obj.getShape(e);

                if (shape && obj.isAdjustable(shape)) {
                    e.target.style.cursor = 'ns-resize';
                }
            } else {
                e.target.style.cursor = 'default';
            }
        }

        
        // =========================================================================
        // Annotatable
        // =========================================================================


        if (e.target.__object__ && e.target.__object__.get('annotatable')) {
            e.target.style.cursor = 'crosshair';
        }

        
        // =========================================================================
        // Drawing API link
        // =========================================================================


        if (obj && obj.type === 'drawing.text' && shape && typeof obj.get('link') === 'string') {
            e.target.style.cursor = 'pointer';
        }
    };








    //
    // This function handles the tooltip text being a string, function
    // 
    // @param mixed tooltip This could be a string or a function. If it's a function it's called and
    //                       the return value is used as the tooltip text
    // @param numbr idx The index of the tooltip.
    //
    RGraph.parseTooltipText = function (tooltips, idx)
    {
        // No tooltips
        if (!tooltips) {
            return null;
        }


        // Get the tooltip text
        if (typeof tooltips == 'function') {
            var text = tooltips(idx);

        // A single tooltip. Now with template support
        } else if (typeof tooltips == 'string') {
            var text = tooltips;

        } else if (typeof tooltips === 'object' && typeof tooltips[idx] == 'function') {
            var text = tooltips[idx](idx);
        
        } else if (typeof tooltips === 'object' && (RGraph.isNull(tooltips[idx]) || typeof tooltips[idx] === 'undefined') ) {
            return null;

        } else if (typeof tooltips[idx] == 'string' && tooltips[idx]) {
            var text = tooltips[idx];

        } else {
            var text = '';
        }

        if (typeof text === 'undefined') {
            text = '';
        } else if (typeof text === 'null') {
            text = '';
        }

        // Conditional in case the tooltip file isn't included
        return RGraph.getTooltipTextFromDIV ? RGraph.getTooltipTextFromDIV(text) : text;
    };








    //
    // Draw crosshairs if enabled
    // 
    // @param object obj The graph object (from which we can get the context and canvas as required)
    //
    RGraph.drawCrosshairs = function (e, obj)
    {
        var width        = obj.canvas.width,
            height       = obj.canvas.height,
            mouseXY      = RGraph.getMouseXY(e),
            x            = mouseXY[0],
            y            = mouseXY[1],
            marginLeft   = obj.marginLeft,
            marginRight  = obj.marginRight,
            marginTop    = obj.marginTop,
            marginBottom = obj.marginBottom,
            prop         = obj.properties,
            properties   = obj.properties;

        RGraph.redrawCanvas(obj.canvas);

        if (   x >= marginLeft
            && y >= marginTop
            && x <= (width - marginRight)
            && y <= (height - marginBottom)
           ) {

            var linewidth = properties.crosshairsLinewidth ? properties.crosshairsLinewidth : 1;
            obj.context.lineWidth = linewidth ? linewidth : 1;

            obj.context.beginPath();
            obj.context.strokeStyle = properties.crosshairsColor;





            //
            // The crosshairsSnap option
            //
            if (properties.crosshairsSnap) {
            
                // Linear search for the closest point
                var point = null;
                var dist  = null;
                var len   = null;
                
                if (obj.type == 'line') {
            
                    for (var i=0; i<obj.coords.length; ++i) {
                    
                        var length = RGraph.getHypLength(obj.coords[i][0], obj.coords[i][1], x, y);
            
                        // Check the mouse X coordinate
                        if (typeof dist != 'number' || length < dist) {
                            var point = i;
                            var dist = length;
                        }
                    }
                
                    x = obj.coords[point][0];
                    y = obj.coords[point][1];
                    
                    // Get the dataset
                    for (var dataset=0; dataset<obj.coords2.length; ++dataset) {
                        for (var point=0; point<obj.coords2[dataset].length; ++point) {
                            if (obj.coords2[dataset][point][0] == x && obj.coords2[dataset][point][1] == y) {
                                obj.canvas.__crosshairs_snap_dataset__ = dataset;
                                obj.canvas.__crosshairs_snap_point__   = point;
                            }
                        }
                    }

                } else {
            
                    for (var i=0; i<obj.coords.length; ++i) {
                        for (var j=0; j<obj.coords[i].length; ++j) {
                            
                            // Check the mouse X coordinate
                            var len = RGraph.getHypLength(obj.coords[i][j][0], obj.coords[i][j][1], x, y);
            
                            if (typeof dist != 'number' || len < dist) {
            
                                var dataset = i;
                                var point   = j;
                                var dist   = len;
                            }
                        }
            
                    }
                    obj.canvas.__crosshairs_snap_dataset__ = dataset;
                    obj.canvas.__crosshairs_snap_point__   = point;

            
                    x = obj.coords[dataset][point][0];
                    y = obj.coords[dataset][point][1];
                }
            }






            // Draw a vertical line
            if (properties.crosshairsVline) {
                obj.context.moveTo(Math.round(x), Math.round(marginTop));
                obj.context.lineTo(Math.round(x), Math.round(height - marginBottom));
            }

            // Draw a horizontal line
            if (properties.crosshairsHline) {
                obj.context.moveTo(Math.round(marginLeft), Math.round(y));
                obj.context.lineTo(Math.round(width - marginRight), Math.round(y));
            }

            obj.context.stroke();
            
            
            //
            // Need to show the coords?
            //
            if (obj.type == 'scatter' && properties.crosshairsCoords) {

                var xCoord = (((x - marginLeft) / (width - marginLeft - marginRight)) * (properties.xaxisScaleMax - properties.xaxisScaleMin)) + properties.xaxisScaleMin;
                    xCoord = xCoord.toFixed(properties.yaxisScaleDecimals);
                var yCoord = obj.max - (((y - properties.marginTop) / (height - marginTop - marginBottom)) * (obj.max - obj.scale2.min));

                if (obj.type == 'scatter' && obj.properties.xaxisPosition === 'center') {
                    yCoord = (yCoord - (obj.max / 2)) * 2;
                }

                yCoord = yCoord.toFixed(properties.yaxisScaleDecimals);

                var div      = RGraph.Registry.get('coordinates.coords.div');
                var mouseXY  = RGraph.getMouseXY(e);
                var canvasXY = RGraph.getCanvasXY(obj.canvas);

                if (!div) {
                    var div = document.createElement('DIV');
                        div.__object__               = obj;
                        div.style.position           = 'absolute';
                        div.style.backgroundColor    = 'white';
                        div.style.border             = '1px solid gray';
                        div.style.fontFamily         = 'Arial, Verdana, sans-serif';
                        div.style.fontSize           = '10pt'
                        div.style.padding            = '2px';
                        div.style.opacity            = 1;
                        div.style.WebkitBorderRadius = '3px';
                        div.style.borderRadius       = '3px';
                        div.style.MozBorderRadius    = '3px';
                        div.style.lineHeight         = RGraph.ISIE ? 'normal' : 'initial';
                    document.body.appendChild(div);
                    
                    RGraph.Registry.set('coordinates.coords.div', div);
                }

                // Convert the X/Y pixel coords to correspond to the scale
                div.style.opacity = 1;
                div.style.display = 'inline';

                if (!properties.crosshairsCoordsFixed) {
                    div.style.left = Math.max(2, (e.pageX - div.offsetWidth - 3)) + 'px';
                    div.style.top = Math.max(2, (e.pageY - div.offsetHeight - 3))  + 'px';
                } else {
                    div.style.left = canvasXY[0] + marginLeft + 3 + 'px';
                    div.style.top  = canvasXY[1] + marginTop + 3 + 'px';
                }

                // Use the formatter functions if defined. This allows the user to format them as they wish
                if (typeof properties.crosshairsCoordsFormatterX === 'function') {
                    xCoord = (properties.crosshairsCoordsFormatterX)({object: obj, value: parseInt(xCoord)});
                }
                if (typeof properties.crosshairsCoordsFormatterY === 'function') {
                    yCoord = (properties.crosshairsCoordsFormatterY)({object: obj, value: parseInt(yCoord)});
                }

                div.innerHTML = '<span style="color: #666">' + properties.crosshairsCoordsLabelsX + ':</span> ' + xCoord + '<br><span style="color: #666">' + properties.crosshairsCoordsLabelsY + ':</span> ' + yCoord;

                obj.canvas.addEventListener('mouseout', RGraph.hideCrosshairCoords, false);

                obj.canvas.__crosshairs_labels__ = div;
                obj.canvas.__crosshairs_x__ = xCoord;
                obj.canvas.__crosshairs_y__ = yCoord;

            } else if (properties.crosshairsCoords) {
                alert('[RGRAPH] Showing crosshair coordinates is only supported on the Scatter chart');
            }

            //
            // Fire the oncrosshairs custom event
            //
            RGraph.fireCustomEvent(obj, 'oncrosshairs');

        } else {
            RGraph.hideCrosshairCoords();
        }
    };








    //
    // Adds a mousemove event listener that highlights a segment based on th
    // mousemove event. Used in the Rose and the RScatter charts
    //
    //@param int segments The number of segments to allow
    //
    RGraph.allowSegmentHighlight = function (opt)
    {
        var obj    = opt.object,
            count  = opt.count,
            fill   = opt.fill,
            stroke = opt.stroke

        if (!RGraph.segmentHighlightFunction) {

            RGraph.segmentHighlightFunction = function (e)
            {
                var mouseXY = RGraph.getMouseXY(e);
                var angle   = RGraph.getAngleByXY(obj.centerx, obj.centery, mouseXY[0], mouseXY[1]);

                angle += RGraph.HALFPI;

                if (angle > RGraph.TWOPI) {
                    angle -= RGraph.TWOPI;
                }

                RGraph.redraw();
        
                var start = 0;
                var end   = 0;
                var a     = (Math.PI * 2) / count;
                
                //
                // Radius
                //
                var r = obj.radius;


                (function ()
                {
                    for (i=0; i<count; i+=1) {
                        if (angle < (a * (i + 1))) {
                            start = i * a;
                            end   = (i + 1) * a;
                            
                            return;
                        }
                    }
                })();
                
                start -= RGraph.HALFPI;
                end   -= RGraph.HALFPI;
                

                obj.path(
                    'b m % % a % % % % % false c s % f %',
                    obj.centerx, obj.centery,
                    obj.centerx,obj.centery,r,start,end,
                    stroke, fill
                );
        
            };
            obj.canvas.addEventListener(
                'mousemove',
                RGraph.segmentHighlightFunction,
                false
            );
        }
    }








// End module pattern
})(window, document);