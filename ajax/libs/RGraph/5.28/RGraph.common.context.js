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

    RGraph = window.RGraph || {isrgraph:true,isRGraph: true,rgraph:true};

// Module pattern
(function (win, doc, undefined)
{
    var ua  = navigator.userAgent;

    //
    // This gunction shows a context menu containing the parameters
    // provided to it
    // 
    // @param object canvas    The canvas object
    // @param array  menuitems The context menu menuitems
    // @param object e         The event object
    //
    RGraph.contextMenu = function ()
    {
        var args      = RGraph.getArgs(arguments, 'object,menuitems,event'),
            obj       = args.object,
            menuitems = args.menuitems,
            e         = args.event,
            canvas    = obj.canvas;

        //
        // Fire the custom RGraph event onbeforecontextmenu
        //
        RGraph.fireCustomEvent(obj, 'onbeforecontextmenu');

        //
        // Hide any existing menu
        //
        if (RGraph.Registry.get('contextmenu')) {
            RGraph.hideContext();
        }
        
        // Hide any zoomed canvas
        //
        // Commented out on 13th October 2019
        //
        //RGraph.hideZoomedCanvas();

        //
        // Hide the palette if necessary
        //
        RGraph.hidePalette();
        
        //
        // This is here to ensure annotating is OFF
        //
        obj.set('mousedown', false);

        var x      = e.pageX;
        var y      = e.pageY;
        var div    = document.createElement('div');
        var bg     = document.createElement('div');

        div.className             = 'RGraph_contextmenu';
        div.__canvas__            = canvas; // Store a reference to the canvas on the contextmenu object
        div.style.position        = 'absolute';
        div.style.left            = 0;
        div.style.top             = 0;
        div.style.border          = '1px solid #666';
        div.style.backgroundColor = 'white';
        div.style.boxShadow       = '1px 1px 3px #ddd';
        div.style.MozBoxShadow    = '1px 1px 3px #ddd';
        div.style.WebkitBoxShadow = '1px 1px 3px #ddd';
        div.style.opacity         = 0;
        div.style.lineHeight      = 'initial';

        bg.className             = 'RGraph_contextmenu_background';
        bg.style.position        = 'absolute';
        bg.style.backgroundColor = '#ccc';
        bg.style.borderRight     = '1px solid #aaa';
        bg.style.top             = 0;
        bg.style.left            = 0;
        bg.style.width           = '18px';
        bg.style.height          = '100%';
        bg.style.opacity         = 0;


        div = document.body.appendChild(div);
        bg  = div.appendChild(bg);


        //
        // Now add the context menu items
        //
        for (i=0; i<menuitems.length; ++i) {
            
            var menuitem = document.createElement('div');
            
            menuitem.__object__      = obj;
            menuitem.__canvas__      = canvas;
            menuitem.__contextmenu__ = div;
            menuitem.className       = 'RGraph_contextmenu_item';

            if (menuitems[i]) {
                menuitem.style.padding = '2px 5px 2px 23px';
                menuitem.style.fontFamily = 'Arial';
                menuitem.style.fontSize = '10pt';
                menuitem.style.textAlign = 'left';
                menuitem.style.fontWeight = 'normal';
                menuitem.innerHTML = menuitems[i][0];

                if (RGraph.isArray(menuitems[i][1])) {
                    menuitem.style.backgroundImage = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAQUlEQVQImY3NoQ2AMABE0ZewABMyGQ6mqWODzlAclBSFO8HZl8uf0FFxCHtwYkt4Y6ChYE44cGH9/fyae2p2LAleW9oVTQuVf6gAAAAASUVORK5CYII=)';
                    menuitem.style.backgroundRepeat = 'no-repeat';
                    menuitem.style.backgroundPosition = '97% center';
                }

                // Add the mouseover event
                if (menuitems[i][1]) {
                    if (menuitem.addEventListener) {
                        menuitem.addEventListener("mouseover", function (e) {RGraph.hideContextSubmenu(); e.target.style.backgroundColor = 'rgba(0,0,0,0.2)'; e.target.style.cursor = 'pointer';}, false);
                        menuitem.addEventListener("mouseout", function (e) {e.target.style.backgroundColor = 'inherit'; e.target.style.cursor = 'default';}, false);
                    } else  {
                        menuitem.attachEvent("onmouseover", function () {RGraph.hideContextSubmenu();event.srcElement.style.backgroundColor = '#eee';event.srcElement.style.cursor = 'pointer';}
                    , false);
                        menuitem.attachEvent("onmouseout", function () {event.srcElement.style.backgroundColor = 'inherit'; event.srcElement.style.cursor = 'default';}, false);
                    }
                } else {
                    if (menuitem.addEventListener) {
                        menuitem.addEventListener("mouseover", function (e) {e.target.style.cursor = 'default';}, false);
                        menuitem.addEventListener("mouseout", function (e) {e.target.style.cursor = 'default';}, false);
                    } else  {
                        menuitem.attachEvent("onmouseover", function () {event.srcElement.style.cursor = 'default'}, false);
                        menuitem.attachEvent("onmouseout", function () {event.srcElement.style.cursor = 'default';}, false);
                    }
                }

            } else {
                menuitem.style.borderBottom = '1px solid #ddd';
                menuitem.style.marginLeft = '25px';
            }

            div.appendChild(menuitem);

            //
            // Install the event handler that calls the menuitem
            //
            if (menuitems[i] && menuitems[i][1] && typeof menuitems[i][1] == 'function') {
                
                menuitem.addEventListener('click', menuitems[i][1], false);
            
            // Submenu
            } else if (menuitems[i] && menuitems[i][1] && RGraph.isArray(menuitems[i][1])) {
                (function ()
                {
                    var tmp = menuitems[i][1]; // This is here because of "references vs primitives" and how they're passed around in Javascript
                    
                    // TODO This may need attention
                    menuitem.addEventListener('mouseover', function (e) {RGraph.contextMenu_submenu(obj, tmp, e.target);}, false);
                })();
            }
        }

        //
        // Now all the menu items have been added, set the shadow width
        // Shadow now handled by CSS3
        //
        div.style.width = (div.offsetWidth + 10) + 'px';
        div.style.height = (div.offsetHeight - 2) + 'px';

        // Show the menu to the left or the right (normal) of the cursor?
        if (x + div.offsetWidth > document.body.offsetWidth) {
            x -= div.offsetWidth;
        }
        
        // Reposition the menu (now we have the real offsetWidth)
        div.style.left = x + 'px';
        div.style.top = y + 'px';

        //
        // Do a little fade in effect
        //
        setTimeout("if (obj = RGraph.Registry.get('contextmenu')) obj.style.opacity = 0.2", 50);
        setTimeout("if (obj = RGraph.Registry.get('contextmenu')) obj.style.opacity = 0.4", 100);
        setTimeout("if (obj = RGraph.Registry.get('contextmenu')) obj.style.opacity = 0.6", 150);
        setTimeout("if (obj = RGraph.Registry.get('contextmenu')) obj.style.opacity = 0.8", 200);
        setTimeout("if (obj = RGraph.Registry.get('contextmenu')) obj.style.opacity = 1", 250);

        // The fade in effect on the left gray bar
        setTimeout("if (obj = RGraph.Registry.get('contextmenu.bg')) obj.style.opacity = 0.2", 50);
        setTimeout("if (obj = RGraph.Registry.get('contextmenu.bg')) obj.style.opacity = 0.4", 100);
        setTimeout("if (obj = RGraph.Registry.get('contextmenu.bg')) obj.style.opacity = 0.6", 150);
        setTimeout("if (obj = RGraph.Registry.get('contextmenu.bg')) obj.style.opacity = 0.8", 200);
        setTimeout("if (obj = RGraph.Registry.get('contextmenu.bg')) obj.style.opacity = 1", 250);

        // Store the context menu in the registry
        RGraph.Registry.set('contextmenu', div);
        RGraph.Registry.set('contextmenu.bg', bg);
        RGraph.Registry.get('contextmenu').oncontextmenu = function () {return false;};
        RGraph.Registry.get('contextmenu.bg').oncontextmenu = function () {return false;};

        //
        // Install the event handlers that hide the context menu
        //
        canvas.addEventListener('click', function () {RGraph.hideContext();}, false);

        window.addEventListener('click', function ()
        {
            RGraph.hideContext();
        }, false);

        window.addEventListener('resize', function ()
        {
            RGraph.hideContext();
        }, false);

        
        //
        // Add the __shape__ object to the context menu
        //
        
        //
        // Set the shape coords from the .getShape()  method
        //
        if (typeof obj.getShape == 'function') {
            RGraph.Registry.get('contextmenu').__shape__ = obj.getShape(e);
        }


        e.stopPropagation();

        //
        // Fire the (RGraph) oncontextmenu event
        //
        RGraph.fireCustomEvent(obj, 'oncontextmenu');

        return false;
    };








    //
    // Hides the context menu if it's currently visible
    //
    RGraph.hideContext = function ()
    {
        var cm   = RGraph.Registry.get('contextmenu');
        var cmbg = RGraph.Registry.get('contextmenu.bg');
        
        //Hide any submenu currently being displayed
        RGraph.hideContextSubmenu();

        if (cm) {
            cm.parentNode.removeChild(cm);
            cmbg.parentNode.removeChild(cmbg);

            cm.style.visibility = 'hidden';
            cm.style.display = 'none';
            RGraph.Registry.set('contextmenu', null);
            
            cmbg.style.visibility = 'hidden';
            cmbg.style.display = 'none';
            RGraph.Registry.set('contextmenu.bg', null);
        }
    };








    //
    // Hides the context menus SUBMENU if it's currently visible
    //
    RGraph.hideContextSubmenu = function ()
    {
        var sub  = RGraph.Registry.get('contextmenu.submenu');

        if (sub) {
            sub.style.visibility = 'none';
            sub.style.display    = 'none';
            RGraph.Registry.set('contextmenu.submenu', null);
        }
    };








    //
    // Shows the context menu after making a few checks - not opera (doesn't support oncontextmenu,
    // not safari (tempermentality), not chrome (hmmm)
    //
    RGraph.showContext = function ()
    {
        var args = RGraph.getArgs(arguments, 'object'),
            obj  = args.object;

        RGraph.hidePalette();

        if (obj.get('contextmenu') && obj.get('contextmenu').length) {

            var isOpera      = navigator.userAgent.indexOf('Opera') >= 0;
            var isSafari     = navigator.userAgent.indexOf('Safari') >= 0;
            var isChrome     = navigator.userAgent.indexOf('Chrome') >= 0;
            var isMacFirefox = navigator.userAgent.indexOf('Firefox') > 0 && navigator.userAgent.indexOf('Mac') > 0;
            var isIE9        = navigator.userAgent.indexOf('MSIE 9') >= 0;

            if (((!isOpera && !isSafari) || isChrome) && !isMacFirefox) {

                obj.canvas.oncontextmenu = function (e)
                {
                    if (e.ctrlKey) return true;

                    RGraph.contextMenu(obj, obj.get('contextmenu'), e);

                    return false;
                }

            // Accomodate Opera and Safari - use double click event
            } else {

                obj.canvas.addEventListener('dblclick', function (e)
                {
                    if (e.ctrlKey) return true;

                    if (!RGraph.Registry.get('contextmenu')) {
                        RGraph.contextMenu(obj, obj.get('contextmenu'), e);
                    }
                }, false);
            }
        }
    };








    //
    // This draws a submenu should it be necessary
    // 
    // @param object obj  The graph object
    // @param object menu The context menu
    //
    RGraph.contextMenu_submenu = function ()
    {
        var args           = RGraph.getArgs(arguments, 'object,menuitems,parentMenuItem'),
            obj            = args.object,
            menuitems      = args.menuitems,
            parentMenuItem = args.parentMenuItem;

        RGraph.hideContextSubmenu();

        var canvas  = obj.canvas;
        var context = obj.context;
        var menu    = parentMenuItem.parentNode;

        var subMenu = document.createElement('DIV');
        subMenu.style.position = 'absolute';
        subMenu.style.width = '100px';
        subMenu.style.top = menu.offsetTop + parentMenuItem.offsetTop + 'px';
        subMenu.style.left            = (menu.offsetLeft + menu.offsetWidth - (RGraph.ISOLD ? 9 : 0)) + 'px';
        subMenu.style.backgroundColor = 'white';
        subMenu.style.border          = '1px solid black';
        subMenu.className             = 'RGraph_contextmenu';
        subMenu.__contextmenu__       = menu;
        subMenu.style.lineHeight      = 'initial';
        subMenu.style.boxShadow       = '3px 3px 3px rgba(96,96,96,0.5)';
        subMenu.style.MozBoxShadow    = '3px 3px 3px rgba(96,96,96,0.5)';
        subMenu.style.WebkitBoxShadow = '3px 3px 3px rgba(96,96,96,0.5)';
        subMenu.style.filter          = 'progid:DXImageTransform.Microsoft.Shadow(color=#aaaaaa,direction=135)';
        document.body.appendChild(subMenu);
        
        for (var i=0; i<menuitems.length; ++i) {
                    
            var menuitem = document.createElement('DIV');
            
            menuitem.__canvas__      = canvas;
            menuitem.__contextmenu__ = menu;
            menuitem.className       = 'RGraph_contextmenu_item';
            
            if (menuitems[i]) {
                menuitem.style.padding = '2px 5px 2px 23px';
                menuitem.style.fontFamily = 'Arial';
                menuitem.style.fontSize = '10pt';
                menuitem.style.fontWeight = 'normal';
                menuitem.style.textAlign = 'left';
                menuitem.innerHTML = menuitems[i][0];
        
                if (menuitems[i][1]) {
                    if (menuitem.addEventListener) {
                        menuitem.addEventListener("mouseover", function (e) {e.target.style.backgroundColor = 'rgba(0,0,0,0.2)'; e.target.style.cursor = 'pointer';}, false);
                        menuitem.addEventListener("mouseout", function (e) {e.target.style.backgroundColor = 'inherit'; e.target.style.cursor = 'default';}, false);
                    } else  {
                        menuitem.attachEvent("onmouseover", function () {event.srcElement.style.backgroundColor = 'rgba(0,0,0,0.2)'; event.srcElement.style.cursor = 'pointer'}, false);
                        menuitem.attachEvent("onmouseout", function () {event.srcElement.style.backgroundColor = 'inherit'; event.srcElement.style.cursor = 'default';}, false);
                    }
                } else {
                    if (menuitem.addEventListener) {
                        menuitem.addEventListener("mouseover", function (e) {e.target.style.cursor = 'default';}, false);
                        menuitem.addEventListener("mouseout", function (e) {e.target.style.cursor = 'default';}, false);
                    } else  {
                        menuitem.attachEvent("onmouseover", function () {event.srcElement.style.cursor = 'default'}, false);
                        menuitem.attachEvent("onmouseout", function () {event.srcElement.style.cursor = 'default';}, false);
                    }
                }
            } else {
                menuitem.style.borderBottom = '1px solid #ddd';
                menuitem.style.marginLeft = '25px';
            }
            
            subMenu.appendChild(menuitem);
        
            if (menuitems[i] && menuitems[i][1]) {
                if (document.all) {
                    menuitem.attachEvent('onclick', menuitems[i][1]);
                } else {
                    menuitem.addEventListener('click', menuitems[i][1], false);
                }
            }
        }


        var bg                   = document.createElement('DIV');
        bg.className             = 'RGraph_contextmenu_background';
        bg.style.position        = 'absolute';
        bg.style.backgroundColor = '#ccc';
        bg.style.borderRight     = '1px solid #aaa';
        bg.style.top             = 0;
        bg.style.left            = 0;
        bg.style.width           = '18px';
        bg.style.height          = '100%';

        bg  = subMenu.appendChild(bg);

        RGraph.Registry.set('contextmenu.submenu', subMenu);
    };








    //
    // A function designed to be used in conjunction with thed context menu
    // to allow people to get image versions of canvases.
    // 
    // @param      canvas Optionally you can pass in the canvas, which will be used
    //
    RGraph.showPNG = function ()
    {
        if (RGraph.ISIE8) {
            alert('[RGRAPH PNG] Sorry, showing a PNG is not supported on MSIE8.');
            return;
        }

        if (arguments[0] && arguments[0].id) {
            var canvas = arguments[0];
            var event  = arguments[1];
        
        } else if (RGraph.Registry.get('contextmenu')) {
            var canvas = RGraph.Registry.get('contextmenu').__canvas__;
        
        } else {
            alert('[RGRAPH SHOWPNG] Could not find canvas!');
        }

        var obj = canvas.__object__;

        //
        // Create the gray background DIV to cover the page
        //
        var bg = document.createElement('DIV');
            bg.id = '__rgraph_image_bg__';
            bg.style.position = 'fixed';
            bg.style.top = '-10px';
            bg.style.left = '-10px';
            bg.style.width = '5000px';
            bg.style.height = '5000px';
            bg.style.backgroundColor = 'rgb(204,204,204)';
            bg.style.opacity = 0;
        document.body.appendChild(bg);
        
        
        //
        // Create the div that the graph sits in
        //
        var div = document.createElement('DIV');
            div.style.backgroundColor = 'white';
            div.style.opacity = 0;
            div.style.border = '1px solid black';
            div.style.position = 'fixed';
            div.style.top = '20%';
            div.style.width = canvas.width + 'px';
            div.style.height = canvas.height + 35 + 'px';
            div.style.left = (document.body.clientWidth / 2) - (canvas.width / 2) + 'px';
            div.style.padding = '5px';

            div.style.borderRadius = '10px';
            div.style.MozBorderRadius = '10px';
            div.style.WebkitBorderRadius = '10px';

            div.style.boxShadow    = '0 0 15px rgba(96,96,96,0.5)';
            div.style.MozBoxShadow = '0 0 15px rgba(96,96,96,0.5)';
            div.style.WebkitBoxShadow = 'rgba(96,96,96,0.5) 0 0 15px';

            div.__canvas__ = canvas;
            div.__object__ = obj;
            div.id = '__rgraph_image_div__';
        document.body.appendChild(div);

        
        //
        // Add the HTML text inputs
        //
        div.innerHTML += '<div style="position: absolute; margin-left: 10px; top: ' + canvas.height + 'px; width: ' + (canvas.width - 50) + 'px; height: 25px"><span style="font-size: 12pt;display: inline; display: inline-block; width: 65px; text-align: right">URL:</span><textarea style="float: right; overflow: hidden; height: 20px; width: ' + (canvas.width - obj.gutterLeft - obj.gutterRight - 80) + 'px" onclick="this.select()" readonly="readonly" id="__rgraph_dataurl__">' + canvas.toDataURL() + '</textarea></div>';
        div.innerHTML += '<div style="position: absolute; top: ' + (canvas.height + 25) + 'px; left: ' + (obj.gutterLeft - 65 + (canvas.width / 2)) + 'px; width: ' + (canvas.width - obj.gutterRight) + 'px; font-size: 65%">A link using the URL: <a href="' + canvas.toDataURL() + '">View</a></div>'

        
        
        //
        // Create the image rendition of the graph
        //
        var img = document.createElement('IMG');
        RGraph.Registry.set('png', img);
        img.__canvas__ = canvas;
        img.__object__ = obj;
        img.id = '__rgraph_image_img__';
        img.className = 'RGraph_png';

        img.src = canvas.toDataURL();

        div.appendChild(img);
        
        setTimeout(function () {document.getElementById("__rgraph_dataurl__").select();}, 50);
        
        window.addEventListener('resize', function (e){var img = RGraph.Registry.get('png');img.style.left = (document.body.clientWidth / 2) - (img.width / 2) + 'px';}, false);
        
        bg.onclick = function (e)
        {
            var div = document.getElementById("__rgraph_image_div__");
            var bg = document.getElementById("__rgraph_image_bg__");

            if (div) {
                div.style.opacity = 0;

                div.parentNode.removeChild(div);

                div.id = '';
                div.style.display = 'none';
                div = null;
            }

            if (bg) {
                bg.style.opacity = 0;

                bg.id = '';
                bg.style.display = 'none';
                bg = null;
            }
        }
        
        window.addEventListener('resize', function (e) {bg.onclick(e);}, false)
        
        //
        // This sets the image BG and the DIV as global variables, circumventing repeated calls to document.getElementById()
        //
        RGraph.showpng_image_bg  = bg;
        RGraph.showpng_image_div = div;

        setTimeout('RGraph.showpng_image_div.style.opacity = 0.2', 50);
        setTimeout('RGraph.showpng_image_div.style.opacity = 0.4', 100);
        setTimeout('RGraph.showpng_image_div.style.opacity = 0.6', 150);
        setTimeout('RGraph.showpng_image_div.style.opacity = 0.8', 200);
        setTimeout('RGraph.showpng_image_div.style.opacity = 1', 250);

        setTimeout('RGraph.showpng_image_bg.style.opacity = 0.1', 50);
        setTimeout('RGraph.showpng_image_bg.style.opacity = 0.2', 100);
        setTimeout('RGraph.showpng_image_bg.style.opacity = 0.3', 150);
        setTimeout('RGraph.showpng_image_bg.style.opacity = 0.4', 200);
        setTimeout('RGraph.showpng_image_bg.style.opacity = 0.5', 250);


        
        img.onclick = function (e)
        {
            if (e.stopPropagation) e.stopPropagation();
            else event.cancelBubble = true;
        }
        
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
    };








// End module pattern
})(window, document);