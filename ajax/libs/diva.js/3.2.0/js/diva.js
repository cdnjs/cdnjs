/*
Copyright (C) 2011-2015 by Wendy Liu, Evan Magoni, Andrew Hankinson, Andrew Horwitz, Laurent Pugin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

window.divaPlugins = [];

// this pattern was taken from http://www.virgentech.com/blog/2009/10/building-object-oriented-jquery-plugin.html
(function ($)
{
    var Diva = function (element, options)
    {
        // These are elements that can be overridden upon instantiation
        // See https://github.com/DDMAL/diva.js/wiki/Settings for more details
        var defaults = {
            adaptivePadding: 0.05,      // The ratio of padding to the page dimension
            arrowScrollAmount: 40,      // The amount (in pixels) to scroll by when using arrow keys
            blockMobileMove: true,      // Prevent moving or scrolling the page on mobile devices
            objectData: '',             // URL to the JSON file that provides the object dimension data - *MANDATORY*
            enableAutoTitle: true,      // Shows the title within a div of id diva-title
            enableFilename: true,       // Uses filenames and not page numbers for links (i=bm_001.tif, not p=1)
            enableFullscreen: true,     // Enable or disable fullscreen icon (mode still available)
            enableGotoPage: true,       // A "go to page" jump box
            enableGridIcon: true,       // A grid view of all the pages
            enableGridControls: 'buttons',  // Specify control of pages per grid row in Grid view. Possible values: 'buttons' (+/-), 'slider'. Any other value disables the controls.
            enableImageTitles: true,    // Adds "Page {n}" title to page images if true
            enableKeyScroll: true,      // Captures scrolling using the arrow and page up/down keys regardless of page focus. When off, defers to default browser scrolling behavior.
            enableLinkIcon: true,       // Controls the visibility of the link icon
            enableSpaceScroll: false,   // Scrolling down by pressing the space key
            enableToolbar: true,        // Enables the toolbar. Note that disabling this means you have to handle all controls yourself.
            enableZoomControls: 'buttons', // Specify controls for zooming in and out. Possible values: 'buttons' (+/-), 'slider'. Any other value disables the controls.
            fixedPadding: 10,           // Fallback if adaptive padding is set to 0
            fixedHeightGrid: true,      // So each page in grid view has the same height (only widths differ)
            goDirectlyTo: 0,            // Default initial page to show (0-indexed)
            iipServerURL: '',           // The URL to the IIPImage installation, including the `?FIF=` - *MANDATORY*
            inFullscreen: false,        // Set to true to load fullscreen mode initially
            inGrid: false,              // Set to true to load grid view initially
            imageDir: '',               // Image directory, either absolute path or relative to IIP's FILESYSTEM_PREFIX - *MANDATORY*
            maxPagesPerRow: 8,          // Maximum number of pages per row in grid view
            maxZoomLevel: -1,           // Optional; defaults to the max zoom returned in the JSON response
            minPagesPerRow: 2,          // Minimum pages per row in grid view. Recommended default.
            minZoomLevel: 0,            // Defaults to 0 (the minimum zoom)
            onDocumentLoaded: null,     // Callback function for when the document is fully loaded (Callbacks are deprecated, use Events)
            onModeToggle: null,         // Callback for toggling fullscreen mode
            onViewToggle: null,         // Callback for switching between grid and document view
            onJump: null,               // Callback function for jumping to a specific page (using the gotoPage feature)
            onPageLoad: null,           // Callback function for loading pages
            onPageLoaded: null,         // Callback function for after the page has been loaded
            onReady: null,              // Callback function for initial load
            onScroll: null,             // Callback function for scrolling
            onScrollDown: null,         // Callback function for scrolling down, only
            onScrollUp: null,           // Callback function for scrolling up only
            onSetCurrentPage: null,     // Callback function for when the current page is set
            onZoom: null,               // Callback function for zooming in general
            onZoomIn: null,             // Callback function for zooming in only
            onZoomOut: null,            // Callback function for zooming out only
            pageLoadTimeout: 200,       // Number of milliseconds to wait before loading pages
            pagesPerRow: 5,             // The default number of pages per row in grid view
            rowLoadTimeout: 50,         // Number of milliseconds to wait before loading a row
            throbberTimeout: 100,       // Number of milliseconds to wait before showing throbber
            tileHeight: 256,            // The height of each tile, in pixels; usually 256
            tileWidth: 256,             // The width of each tile, in pixels; usually 256
            toolbarParentObject: options.parentObject, // The toolbar parent object.
            verticallyOriented: true,   // Determines vertical vs. horizontal orientation
            viewportMargin: 200,        // Pretend tiles +/- 200px away from viewport are in
            zoomLevel: 2                // The initial zoom level (used to store the current zoom level)
        };

        // Apply the defaults, or override them with passed-in options.
        var settings = $.extend({}, defaults, options);

        // Things that cannot be changed because of the way they are used by the script
        // Many of these are declared with arbitrary values that are changed later on
        var globals = {
            allTilesLoaded: [],         // A boolean for each page, indicating if all tiles have been loaded
            averageHeights: [],         // The average page height for each zoom level
            averageWidths: [],          // The average page width for each zoom level
            currentPageIndex: 0,        // The current page in the viewport (center-most page)
            divaIsFullWindow: false,    // Set to true when the parent of diva-wrapper is the body tag. Used for resizing.
            doubleClickZoom: false,     // Flag to determine whether handleZoom was called from a double-click
            firstPageLoaded: -1,        // The ID of the first page loaded (value set later)
            firstRowLoaded: -1,         // The index of the first row loaded
            gridPageWidth: 0,           // Holds the max width of each row in grid view. Calculated in loadGrid()
            hashParamSuffix: '',        // Used when there are multiple document viewers on a page
            horizontalOffset: 0,        // Distance from the center of the diva element to the top of the current page
            horizontalPadding: 0,       // Either the fixed padding or adaptive padding
            ID: null,                   // The prefix of the IDs of the elements (usually 1-diva-)
            initialKeyScroll: false,    // Holds the initial state of enableKeyScroll
            initialSpaceScroll: false,  // Holds the initial state of enableSpaceScroll
            innerObject: '',            // $(settings.ID + 'inner'), for selecting the .diva-inner element
            isActiveDiva: true,         // In the case that multiple diva panes exist on the same page, this should have events funneled to it.
            isScrollable: true,         // Used in enable/disableScrollable public methods
            itemTitle: '',              // The title of the document
            lastPageLoaded: -1,         // The ID of the last page loaded (value set later)
            lastRowLoaded: -1,          // The index of the last row loaded
            loaded: false,              // A flag for when everything is loaded and ready to go.
            maxWidths: [],              // The width of the widest page for each zoom level
            maxHeights: [],             // The height of the tallest page for each zoom level
            maxRatio: 0,                // The max height/width ratio (for grid view)
            minRatio: 0,                // The minimum height/width ratio for a page
            mobileWebkit: false,        // Checks if the user is on a touch device (iPad/iPod/iPhone/Android)
            numPages: 0,                // Number of pages in the array
            numRows: 0,                 // Number of rows
            oldZoomLevel: -1,           // Holds the previous zoom level after zooming in or out
            outerObject: '',            // $(settings.ID + 'outer'), for selecting the .diva-outer element
            pages: [],                  // An array containing the data for all the pages
            pageLeftOffsets: [],        // Distance from the left side of each page to the left side of the diva-inner object
            pageTopOffsets: [],         // Distance from the top side of each page to the top side of the diva-inner object
            pageTimeouts: [],           // Stack to hold the loadPage timeouts
            pageTools: '',              // The string for page tools
            panelHeight: 0,             // Height of the document viewer pane
            panelWidth: 0,              // Width of the document viewer pane
            plugins: [],                // Filled with the enabled plugins from window.divaPlugins
            previousLeftScroll: 0,      // Used to determine horizontal scroll direction
            previousTopScroll: 0,       // Used to determine vertical scroll direction
            realMaxZoom: -1,            // To hold the true max zoom level of the document (needed for calculations)
            resizeTimer: -1,            // Holds the ID of the timeout used when resizing the window (for clearing)
            rowHeight: 0,               // Holds the max height of each row in grid view. Calculated in loadGrid()
            scaleWait: false,           // For preventing double-zoom on touch devices (iPad, etc)
            scrollbarWidth: 0,          // Set to the actual scrollbar width in init()
            selector: '',               // Uses the generated ID prefix to easily select elements
            singleClick: false,         // Used for catching ctrl+double-click events in Firefox in Mac OS
            singleTap: false,           // Used for caching double-tap events on mobile browsers
            throbberTimeoutID: -1,      // Holds the ID of the throbber loading timeout
            toolbar: null,              // Holds an object with some toolbar-related functions
            totalHeights: [],           // The total height of all pages (stacked together) for each zoom level
            totalHeight: 0,             // The total height for the current zoom level (including padding)
            totalWidths: [],            // The total height of all pages (stacked together) for each zoom level
            totalWidth: 0,              // The total height for the current zoom level (including padding)
            verticalOffset: 0,          // Distance from the center of the diva element to the left side of the current page
            verticalPadding: 0          // Either the fixed padding or adaptive padding
        };

        $.extend(settings, globals);

        // Executes a callback function with the diva instance set as the context
        // Can take an unlimited number to arguments to pass to the callback function
        var self = this;

        var executeCallback = (function (callback)
        {
            var firstRun = true;
            return function(callback)
            {
                var args, i, length;

                if (typeof callback === "function")
                {
                    args = [];
                    for (i = 1, length = arguments.length; i < length; i++)
                    {
                        args.push(arguments[i]);
                    }

                    if (firstRun)
                    {
                        console.warn("The use of callback functions is deprecated. Use diva.Events.subscribe(\"Event\", function) instead.");
                        firstRun = false;
                    }

                    callback.apply(self, args);

                    return true;
                }

                return false;
            };
        })();

        var getPageData = function (pageIndex, attribute)
        {
            return settings.pages[pageIndex].d[settings.zoomLevel][attribute];
        };

        // Returns the page index associated with the given filename; must called after settings settings.pages
        var getPageIndex = function (filename)
        {
            var i,
                np = settings.numPages;

            for (i = 0; i < np; i++)
            {
                if (settings.pages[i].f === filename)
                {
                    return i;
                }
            }

            return -1;
        };

        // Checks if a page or tile is within the viewport horizontally
        var isHorizontallyInViewport = function (left, right)
        {
            var leftOfViewport = $("#" + settings.ID + "outer").scrollLeft() - settings.viewportMargin;
            var rightOfViewport = leftOfViewport + settings.panelWidth + settings.viewportMargin * 2;

            var leftVisible = left >= leftOfViewport && left <= rightOfViewport;
            var middleVisible = left <= leftOfViewport && right >= rightOfViewport;
            var rightVisible = right >= leftOfViewport && right <= rightOfViewport;

            return (leftVisible || middleVisible || rightVisible);
        };

        // Checks if a page or tile is within the viewport vertically
        var isVerticallyInViewport = function (top, bottom)
        {
            var topOfViewport = $("#" + settings.ID + "outer" ).scrollTop() - settings.viewportMargin;
            var bottomOfViewport = topOfViewport + settings.panelHeight + settings.viewportMargin * 2;

            var topVisible = top >= topOfViewport && top <= bottomOfViewport;
            var middleVisible = top <= topOfViewport && bottom >= bottomOfViewport;
            var bottomVisible = bottom >= topOfViewport && bottom <= bottomOfViewport;

            return (topVisible || middleVisible || bottomVisible);
        };

        // Check if a tile is near the viewport and thus should be loaded
        var isTileVisible = function (pageIndex, tileRow, tileCol)
        {
            var tileTop, tileLeft;

            if (settings.verticallyOriented)
            {
                tileTop = settings.pageTopOffsets[pageIndex] + (tileRow * settings.tileHeight) + settings.verticalPadding;
                tileLeft = settings.pageLeftOffsets[pageIndex] + (tileCol * settings.tileWidth);
            }
            else
            {
                tileTop = settings.pageTopOffsets[pageIndex] + (tileRow * settings.tileHeight);
                tileLeft = settings.pageLeftOffsets[pageIndex] + (tileCol * settings.tileWidth) + settings.horizontalPadding;
            }

            var tileBottom = tileTop + settings.tileHeight;
            var tileRight = tileLeft + settings.tileWidth;

            return isVerticallyInViewport(tileTop, tileBottom) && isHorizontallyInViewport(tileLeft, tileRight);
        };

        // Check if a tile has been appended to the DOM
        var isTileLoaded = function (pageIndex, tileIndex)
        {
            return !!document.getElementById(settings.ID + 'tile-' + pageIndex + '-' + tileIndex);
        };

        // Check if a page index is valid
        var isPageValid = function (pageIndex)
        {
            return pageIndex >= 0 && pageIndex < settings.numPages;
        };

        // Check if a page is in or near the viewport and thus should be loaded
        var isPageVisible = function (pageIndex)
        {
            var topOfPage = settings.pageTopOffsets[pageIndex];
            var bottomOfPage = topOfPage + getPageData(pageIndex, 'h') + settings.verticalPadding;

            var leftOfPage = settings.pageLeftOffsets[pageIndex];
            var rightOfPage = leftOfPage + getPageData(pageIndex, 'w') + settings.horizontalPadding;

            return (isVerticallyInViewport(topOfPage, bottomOfPage) && isHorizontallyInViewport(leftOfPage, rightOfPage));
        };

        // Check if a page has been appended to the DOM
        var isPageLoaded = function (pageIndex)
        {
            return !!document.getElementById(settings.ID + 'page-' + pageIndex);
        };

        // Appends the page directly into the document body, or loads the relevant tiles
        var loadPage = function (pageIndex)
        {
            // If the page and all of its tiles have been loaded, exit
            if (isPageLoaded(pageIndex) && settings.allTilesLoaded[pageIndex])
                return;

            // Load some data for this page
            var filename = settings.pages[pageIndex].f;
            var width = getPageData(pageIndex, 'w');
            var height = getPageData(pageIndex, 'h');
            var heightFromTop = settings.pageTopOffsets[pageIndex] + settings.verticalPadding;
            var widthFromLeft = settings.pageLeftOffsets[pageIndex] + settings.horizontalPadding;
            var pageSelector = settings.selector + 'page-' + pageIndex;
            var plugin;

            // If the page has not been loaded yet, append the div to the DOM
            if (!isPageLoaded(pageIndex))
            {
                var innerElement = document.getElementById(settings.ID + "inner");

                var pageElement = document.createElement('div');
                pageElement.id = settings.ID + 'page-' + pageIndex;
                pageElement.classList.add('diva-document-page');
                pageElement.setAttribute('data-index', pageIndex);
                pageElement.setAttribute('data-filename', filename);
                if (settings.enableImageTitles) pageElement.title = "Page " + (pageIndex + 1);
                pageElement.innerHTML = settings.pageTools;
                pageElement.style.width = width + 'px';
                pageElement.style.height = height + 'px';

                if (settings.verticallyOriented)
                {
                    pageElement.style.top = heightFromTop + 'px';
                    pageElement.classList.add('diva-page-vertical');
                }
                else
                {
                    pageElement.style.left = widthFromLeft + 'px';
                    pageElement.classList.add('diva-page-horizontal');
                }

                innerElement.appendChild(pageElement);
                // Call the callback function
                executeCallback(settings.onPageLoad, pageIndex, filename, pageSelector);
                diva.Events.publish("PageWillLoad", [pageIndex, filename, pageSelector], self);

                // @TODO: Replace this with a notification.
                // Execute the callback functions for any of the enabled plugins
                for (plugin in settings.plugins)
                {
                    executeCallback(settings.plugins[plugin].onPageLoad, pageIndex, filename, pageSelector);
                }
            }

            // There are still tiles to load, so try to load those (after a delay)
            var pageLoadFunction = function (pageIndex)
            {
                var pageElement = document.getElementById(settings.ID + 'page-' + pageIndex);

                // If the page is no longer in the viewport, don't load any tiles
                if (!isPageLoaded(pageIndex))
                    return;

                var imdir = settings.imageDir + "/";
                // Load some more data and initialise some variables
                var rows = getPageData(pageIndex, 'r');
                var cols = getPageData(pageIndex, 'c');
                var maxZoom = settings.pages[pageIndex].m;
                var baseURL = settings.iipServerURL + "?FIF=" + imdir + filename + '&JTL=';
                var content = [];
                var allTilesLoaded = true;
                var tileIndex = 0;
                var i;

                // Calculate the width and height of outer tiles (non-standard dimensions)
                var lastHeight = height - (rows - 1) * settings.tileHeight;
                var lastWidth = width - (cols - 1) * settings.tileWidth;

                // Declare variables used within the loops
                var row, col, tileHeight, tileWidth, top, left, displayStyle, zoomLevel, imageURL;

                // Adjust the zoom level based on the max zoom level of the page
                zoomLevel = settings.zoomLevel + maxZoom - settings.realMaxZoom;
                baseImageURL = baseURL + zoomLevel + ',';

                // Loop through all the tiles in this page
                row = 0;

                while (row < rows)
                {
                    col = 0;
                    // If the tile is in the last row or column, its dimensions will be different
                    tileHeight = (row === rows - 1) ? lastHeight : settings.tileHeight;

                    while (col < cols)
                    {
                        top = row * settings.tileHeight;
                        left = col * settings.tileWidth;

                        tileWidth = (col === cols - 1) ? lastWidth : settings.tileWidth;

                        imageURL = baseImageURL + tileIndex;

                        // this check looks to see if the tile is already loaded, and then if
                        // it isn't, if it should be visible.
                        if (!isTileLoaded(pageIndex, tileIndex))
                        {
                            if (isTileVisible(pageIndex, row, col))
                            {
                                /*
                                    content.push('<div id="' + settings.ID + 'tile-' + pageIndex + '-' + tileIndex + '"
                                    class="diva-document-tile"
                                    style="display:inline; position: absolute; top: ' + top + 'px; left: ' + left + 'px;
                                    background-image: url(\'' + imageURL + '\'); height: ' + tileHeight + 'px; width: ' + tileWidth + 'px;"></div>');
                                */
                                var tileElem = document.createElement('div');
                                tileElem.id = settings.ID + 'tile-' + pageIndex + '-' + tileIndex;
                                tileElem.classList.add('diva-document-tile');
                                tileElem.style.display = 'inline';
                                tileElem.style.position = 'absolute';
                                tileElem.style.top = top + 'px';
                                tileElem.style.left = left + 'px';
                                tileElem.style.backgroundImage = "url('" + imageURL + "')";
                                tileElem.style.height = tileHeight + "px";
                                tileElem.style.width = tileWidth + "px";

                                // content.push(tileElem);
                                pageElement.appendChild(tileElem);
                            }
                            else
                                allTilesLoaded = false;  // The tile does not need to be loaded - not all have been loaded
                        }

                        tileIndex++;
                        col++;
                    }

                    row++;
                }

                settings.allTilesLoaded[pageIndex] = allTilesLoaded;

                executeCallback(settings.onPageLoaded, pageIndex, filename, pageSelector);
                diva.Events.publish("PageDidLoad", [pageIndex, filename, pageSelector], self);
            };
            settings.pageTimeouts.push(setTimeout(pageLoadFunction, settings.pageLoadTimeout, pageIndex));
        };

        // Delete a page from the DOM; will occur when a page is scrolled out of the viewport
        var deletePage = function (pageIndex)
        {
            // $(document.getElementById(settings.ID + 'page-' + pageIndex)).empty().remove();
            var theNode = document.getElementById(settings.ID + 'page-' + pageIndex);

            if (theNode === null)
                return;

            while (theNode.firstChild)
            {
                theNode.removeChild(theNode.firstChild);
            }
            theNode.parentNode.removeChild(theNode);
        };

        // Check if the bottom of a page is above the top of a viewport (scrolling down)
        // For when you want to keep looping but don't want to load a specific page
        var pageAboveViewport = function (pageIndex)
        {
            var bottomOfPage = settings.pageTopOffsets[pageIndex] + getPageData(pageIndex, 'h') + settings.verticalPadding;
            var topOfViewport = document.getElementById(settings.ID + "outer").scrollTop;

            return bottomOfPage < topOfViewport;
        };

        // Check if the top of a page is below the bottom of a viewport (scrolling up)
        var pageBelowViewport = function (pageIndex)
        {
            var topOfPage = settings.pageTopOffsets[pageIndex];
            var bottomOfViewport = document.getElementById(settings.ID + "outer").scrollTop + settings.panelHeight;

            return topOfPage > bottomOfViewport;
        };

        // Check if the left side of a page is to the left of a viewport (scrolling right)
        // For when you want to keep looping but don't want to load a specific page
        var pageLeftOfViewport = function (pageIndex)
        {
            var rightOfPage = settings.pageLeftOffsets[pageIndex] + getPageData(pageIndex, 'w') + settings.horizontalPadding;
            var leftOfViewport = document.getElementById(settings.ID + "outer").scrollLeft;

            return rightOfPage < leftOfViewport;
        };

        // Check if the right side of a page is to the right of a viewport (scrolling left)
        var pageRightOfViewport = function (pageIndex)
        {
            var leftOfPage = settings.pageLeftOffsets[pageIndex];
            var rightOfViewport = document.getElementById(settings.ID + "outer").scrollLeft + settings.panelWidth;

            return leftOfPage > rightOfViewport;
        };

        //shorthand functions to determine which is the right "before" viewport function to use
        var pageBeforeViewport = function (pageIndex)
        {
            return (settings.verticallyOriented ? pageAboveViewport(pageIndex) : pageLeftOfViewport(pageIndex));
        };

        //shorthand functions to determine which is the right "after" viewport function to use
        var pageAfterViewport = function (pageIndex)
        {
            return (settings.verticallyOriented ? pageBelowViewport(pageIndex) : pageRightOfViewport(pageIndex));
        };

        // Called by adjust pages - determine what pages should be visible, and show them
        var attemptPageShow = function (pageIndex, direction)
        {
            if (direction > 0)
            {
                // Direction is positive - we're scrolling down
                if (isPageValid(pageIndex))
                {
                    // If the page should be visible, then yes, add it
                    if (isPageVisible(pageIndex))
                    {
                        loadPage(pageIndex);
                        settings.lastPageLoaded = pageIndex;

                        // Recursively call this function until there's nothing to add
                        attemptPageShow(settings.lastPageLoaded + 1, direction);
                    }
                    else if (pageBeforeViewport(pageIndex))
                    {
                        // If the page is below the viewport. try to load the next one
                        attemptPageShow(pageIndex + 1, direction);
                    }
                }
            }
            else
            {
                // Direction is negative - we're scrolling up
                if (isPageValid(pageIndex))
                {
                    // If it's near the viewport, yes, add it
                    if (isPageVisible(pageIndex))
                    {
                        loadPage(pageIndex);

                        // Reset the first page loaded to this one
                        settings.firstPageLoaded = pageIndex;

                        // Recursively call this function until there's nothing to add
                        attemptPageShow(settings.firstPageLoaded - 1, direction);
                    }
                    else if (pageAfterViewport(pageIndex))
                    {
                        // Attempt to call this on the next page, do not increment anything
                        attemptPageShow(pageIndex - 1, direction);
                    }
                }
            }
        };

        // Called by adjustPages - see what pages need to be hidden, and hide them
        var attemptPageHide = function (pageIndex, direction)
        {
            if (direction > 0)
            {
                // Scrolling down - see if this page needs to be deleted from the DOM
                if (isPageValid(pageIndex) && pageBeforeViewport(pageIndex))
                {
                    // Yes, delete it, reset the first page loaded
                    deletePage(pageIndex);
                    settings.firstPageLoaded = pageIndex + 1;

                    // Try to call this function recursively until there's nothing to delete
                    attemptPageHide(settings.firstPageLoaded, direction);
                }
            }
            else
            {
                // Direction must be negative (not 0 - see adjustPages), we're scrolling up
                if (isPageValid(pageIndex) && pageAfterViewport(pageIndex))
                {
                    // Yes, delete it, reset the last page loaded
                    deletePage(pageIndex);
                    settings.lastPageLoaded = pageIndex - 1;

                    // Try to call this function recursively until there's nothing to delete
                    attemptPageHide(settings.lastPageLoaded, direction);
                }
            }
        };

        // Handles showing and hiding pages when the user scrolls
        var adjustPages = function (direction)
        {
            var i;

            if (direction < 0)
            {
                // Direction is negative, so we're scrolling up/left (doesn't matter for these calls)
                attemptPageShow(settings.firstPageLoaded, direction);
                setCurrentPage(-1);
                attemptPageHide(settings.lastPageLoaded, direction);
            }
            else if (direction > 0)
            {
                // Direction is positive so we're scrolling down/right (doesn't matter for these calls)
                attemptPageShow(settings.lastPageLoaded, direction);
                setCurrentPage(1);
                attemptPageHide(settings.firstPageLoaded, direction);
            }
            else
            {
                // Non-primary scroll, check if we need to reveal any tiles
                var lpl = settings.lastPageLoaded;
                for (i = Math.max(settings.firstPageLoaded, 0); i <= lpl; i++)
                {
                    if (isPageVisible(i))
                        loadPage(i);
                }
            }

            var scrollSoFar = (settings.verticallyOriented ? document.getElementById(settings.ID + "outer").scrollTop : document.getElementById(settings.ID + "outer").scrollLeft);

            executeCallback(settings.onScroll, scrollSoFar);
            diva.Events.publish("ViewerDidScroll", [scrollSoFar], self);

            if (direction > 0)
            {
                // scrolling forwards
                executeCallback(settings.onScrollDown, scrollSoFar);
                diva.Events.publish("ViewerDidScrollDown", [scrollSoFar], self);
            }
            else if (direction < 0)
            {
                // scrolling backwards
                executeCallback(settings.onScrollUp, scrollSoFar);
                diva.Events.publish("ViewerDidScrollUp", [scrollSoFar], self);
            }
        };

        // Check if a row index is valid
        var isRowValid = function (rowIndex)
        {
            return rowIndex >= 0 && rowIndex < settings.numRows;
        };

        // Check if a row should be visible in the viewport
        var isRowVisible = function (rowIndex)
        {
            var topOfRow = settings.rowHeight * rowIndex;
            var bottomOfRow = topOfRow + settings.rowHeight + settings.fixedPadding;

            return isVerticallyInViewport(topOfRow, bottomOfRow);
        };

        // Check if a row (in grid view) is present in the DOM
        var isRowLoaded = function (rowIndex)
        {
            return !!document.getElementById(settings.ID + 'row-' + rowIndex);
        };

        var loadRow = function (rowIndex)
        {
            // If the row has already been loaded, don't attempt to load it again
            if (isRowLoaded(rowIndex))
                return;

            // Load some data for this and initialise some variables
            var heightFromTop = (settings.rowHeight * rowIndex) + settings.fixedPadding;
            var content = [];
            var innerElem = document.getElementById(settings.ID + "inner");

            // Create the row div
            var rowDiv = document.createElement('div');
            rowDiv.id = settings.ID + 'row-' + rowIndex;
            rowDiv.classList.add('diva-row');
            rowDiv.style.height = settings.rowHeight + 'px';
            rowDiv.style.top = heightFromTop + 'px';

            // Create the opening tag for the row div
            innerElem.appendChild(rowDiv);

            // Declare variables used in the loop
            var i, pageIndex, filename, realWidth, realHeight, pageWidth, pageHeight, leftOffset, imageURL;
            var imdir = settings.imageDir + "/";

            // Load each page within that row
            var ppr = settings.pagesPerRow;
            for (i = 0; i < ppr; i++)
            {
                pageIndex = rowIndex * settings.pagesPerRow + i;

                // If this page is the last row, don't try to load a nonexistent page
                if (!isPageValid(pageIndex))
                    break;

                // Calculate the width, height and horizontal placement of this page
                filename = settings.pages[pageIndex].f;
                realWidth = getPageData(pageIndex, 'w');
                realHeight = getPageData(pageIndex, 'h');
                pageWidth = (settings.fixedHeightGrid) ? (settings.rowHeight - settings.fixedPadding) * realWidth / realHeight : settings.gridPageWidth;
                pageHeight = (settings.fixedHeightGrid) ? settings.rowHeight - settings.fixedPadding : pageWidth / realWidth * realHeight;
                leftOffset = parseInt(i * (settings.fixedPadding + settings.gridPageWidth) + settings.fixedPadding, 10);

                // Make sure they're all integers for nice, round numbers
                pageWidth = parseInt(pageWidth, 10);
                pageHeight = parseInt(pageHeight, 10);

                // Center the page if the height is fixed (otherwise, there is no horizontal padding)
                leftOffset += (settings.fixedHeightGrid) ? (settings.gridPageWidth - pageWidth) / 2 : 0;
                imageURL = encodeURI(settings.iipServerURL + "?FIF=" + imdir + filename + '&HEI=' + (pageHeight + 2) + '&CVT=JPEG');

                settings.pageTopOffsets[pageIndex] = heightFromTop;
                settings.pageLeftOffsets[pageIndex] = leftOffset;


                // Append the HTML for this page to the string builder array
                var pageDiv = document.createElement('div');
                pageDiv.id = settings.ID + 'page-' + pageIndex;
                var pageSelector = settings.selector + 'page-' + pageIndex;
                pageDiv.classList.add('diva-page');
                pageDiv.style.width = pageWidth + 'px';
                pageDiv.style.height = pageHeight + 'px';
                pageDiv.style.left = leftOffset + 'px';
                pageDiv.setAttribute('data-index', pageIndex);
                pageDiv.setAttribute('data-filename', filename);
                if (settings.enableImageTitles) pageDiv.title = "Page " + (pageIndex + 1);

                rowDiv.appendChild(pageDiv);

                diva.Events.publish("PageWillLoad", [pageIndex, filename, pageSelector], self);

                // Add each image to a queue so that images aren't loaded unnecessarily
                addPageToQueue(rowIndex, pageIndex, imageURL, pageWidth, pageHeight);
            }
        };

        var deleteRow = function (rowIndex)
        {
            var theNode = document.getElementById(settings.ID + 'row-' + rowIndex);
            if (theNode === null)
                return;

            while (theNode.firstChild)
            {
                theNode.removeChild(theNode.firstChild);
            }
            theNode.parentNode.removeChild(theNode);
        };

        // Check if the bottom of a row is above the top of the viewport (scrolling down)
        var rowAboveViewport = function (rowIndex)
        {
            var bottomOfRow = settings.rowHeight * (rowIndex + 1);
            var topOfViewport = document.getElementById(settings.ID + "outer").scrollTop;

            return (bottomOfRow < topOfViewport);
        };

        // Check if the top of a row is below the bottom of the viewport (scrolling up)
        var rowBelowViewport = function (rowIndex)
        {
            var topOfRow = settings.rowHeight * rowIndex;
            var bottomOfViewport = document.getElementById(settings.ID + "outer").scrollTop + settings.panelHeight;

            return (topOfRow > bottomOfViewport);
        };

        // Same thing as attemptPageShow only with rows
        var attemptRowShow = function (rowIndex, direction)
        {
            if (direction > 0)
            {
                if (isRowValid(rowIndex))
                {
                    if (isRowVisible(rowIndex))
                    {
                        loadRow(rowIndex);
                        settings.lastRowLoaded = rowIndex;

                        attemptRowShow(settings.lastRowLoaded + 1, direction);
                    }
                    else if (rowAboveViewport(rowIndex))
                    {
                        attemptRowShow(rowIndex + 1, direction);
                    }
                }
            }
            else
            {
                if (isRowValid(rowIndex))
                {
                    if (isRowVisible(rowIndex))
                    {
                        loadRow(rowIndex);
                        settings.firstRowLoaded = rowIndex;

                        attemptRowShow(settings.firstRowLoaded - 1, direction);
                    }
                    else if (rowBelowViewport(rowIndex))
                    {
                        attemptRowShow(rowIndex - 1, direction);
                    }
                }
            }
        };

        var attemptRowHide = function (rowIndex, direction)
        {
            if (direction > 0)
            {
                if (isRowValid(rowIndex) && rowAboveViewport(rowIndex))
                {
                    deleteRow(rowIndex);
                    settings.firstRowLoaded++;

                    attemptRowHide(settings.firstRowLoaded, direction);
                }
            }
            else
            {
                if (isRowValid(rowIndex) && rowBelowViewport(rowIndex))
                {
                    deleteRow(rowIndex);
                    settings.lastRowLoaded--;

                    attemptRowHide(settings.lastRowLoaded, direction);
                }
            }
        };

        var adjustRows = function (direction)
        {
            if (direction < 0)
            {
                attemptRowShow(settings.firstRowLoaded, -1);
                setCurrentRow(-1);
                attemptRowHide(settings.lastRowLoaded, -1);
            }
            else if (direction > 0)
            {
                attemptRowShow(settings.lastRowLoaded, 1);
                setCurrentRow(1);
                attemptRowHide(settings.firstRowLoaded, 1);
            }

            var newTopScroll = document.getElementById(settings.ID + "outer").scrollTop;

            executeCallback(settings.onScroll, newTopScroll);
            diva.Events.publish("ViewerDidScroll", [newTopScroll], self);

            // If we're scrolling down
            if (direction > 0)
            {
                executeCallback(settings.onScrollDown, newTopScroll);
                diva.Events.publish("ViewerDidScrollDown", [newTopScroll], self);
            }
            else if (direction < 0)
            {
                // We're scrolling up
                executeCallback(settings.onScrollUp, newTopScroll);
                diva.Events.publish("ViewerDidScrollUp", [newTopScroll], self);
            }
        };

        // Used to delay loading of page images in grid view to prevent unnecessary loads
        var addPageToQueue = function (rowIndex, pageIndex, imageURL, pageWidth, pageHeight)
        {
            var loadFunction = function (rowIndex, pageIndex, imageURL, pageWidth, pageHeight)
            {
                if (isRowLoaded(rowIndex))
                {
                    var imgEl = document.createElement('img');
                    imgEl.src = imageURL;
                    imgEl.style.width = pageWidth + 'px';
                    imgEl.style.height = pageHeight + 'px';
                    document.getElementById(settings.ID + 'page-' + pageIndex).appendChild(imgEl);
                }
            };

            settings.pageTimeouts.push(
                window.setTimeout(loadFunction, settings.rowLoadTimeout, rowIndex, pageIndex, imageURL, pageWidth, pageHeight));
        };

        // Determines and sets the "current page" (settings.currentPageIndex); called within adjustPages
        // The "direction" is either 1 (downward scroll) or -1 (upward scroll)
        var setCurrentPage = function (direction)
        {
            var currentPage = settings.currentPageIndex;
            var pageToConsider = currentPage + direction;

            if (!isPageValid(pageToConsider))
                return false;

            var middleOfViewport = (settings.verticallyOriented ? document.getElementById(settings.ID + "outer").scrollTop + (settings.panelHeight / 2) : document.getElementById(settings.ID + "outer").scrollLeft + (settings.panelWidth / 2));
            var changeCurrentPage = false;
            var pageSelector = settings.selector + 'page-' + pageToConsider;

            if (direction < 0)
            {
                // When scrolling forwards:
                // If the previous page > middle of viewport
                if (settings.verticallyOriented)
                {
                    if (pageToConsider >= 0 && (settings.pageTopOffsets[pageToConsider] + getPageData(pageToConsider, 'h') + (settings.verticalPadding) >= middleOfViewport))
                    {
                        changeCurrentPage = true;
                    }
                }
                else
                {
                    if (pageToConsider >= 0 && (settings.pageLeftOffsets[pageToConsider] + getPageData(pageToConsider, 'w') + (settings.horizontalPadding) >= middleOfViewport))
                    {
                        changeCurrentPage = true;
                    }
                }
            }
            else if (direction > 0)
            {
                // When scrolling backwards:
                // If this page < middle of viewport
                if (settings.verticallyOriented)
                {
                    if (settings.pageTopOffsets[currentPage] + getPageData(currentPage, 'h') + settings.verticalPadding < middleOfViewport)
                    {
                        changeCurrentPage = true;
                    }
                }
                else
                {
                    if (settings.pageLeftOffsets[currentPage] + getPageData(currentPage, 'w') + settings.horizontalPadding < middleOfViewport)
                    {
                        changeCurrentPage = true;
                    }
                }
            }

            if (changeCurrentPage)
            {
                // Set this to the current page
                settings.currentPageIndex = pageToConsider;
                // Now try to change the next page, given that we're not going to a specific page
                // Calls itself recursively - this way we accurately obtain the current page
                if (direction !== 0)
                {
                    if (!setCurrentPage(direction))
                    {
                        var filename = settings.pages[pageToConsider].f;
                        executeCallback(settings.onSetCurrentPage, pageToConsider, filename);
                        diva.Events.publish("VisiblePageDidChange", [pageToConsider, filename], self);
                    }
                }
                return true;
            }

            return false;
        };

        // Sets the current page in grid view
        var setCurrentRow = function (direction)
        {
            var currentRow = Math.floor(settings.currentPageIndex / settings.pagesPerRow);
            var rowToConsider = currentRow + parseInt(direction, 10);
            var topScroll = document.getElementById(settings.ID + "outer").scrollTop;
            var middleOfViewport = topScroll + (settings.panelHeight / 2);
            var changeCurrentRow = false;

            if (direction < 0)
            {
                if (rowToConsider >= 0 && (settings.rowHeight * currentRow >= middleOfViewport || settings.rowHeight * rowToConsider >= topScroll))
                {
                    changeCurrentRow = true;
                }
            }
            else if (direction > 0)
            {
                if ((settings.rowHeight * (currentRow + 1)) < topScroll && isRowValid(rowToConsider))
                {
                    changeCurrentRow = true;
                }
            }

            if (changeCurrentRow)
            {
                settings.currentPageIndex = rowToConsider * settings.pagesPerRow;

                if (direction !== 0)
                {
                    if (!setCurrentRow(direction))
                    {
                        var pageIndex = settings.currentPageIndex;
                        var filename = settings.pages[pageIndex].f;
                        diva.Events.publish("VisiblePageDidChange", [pageIndex, filename], self);
                    }
                }

                return true;
            }

            return false;
        };

        //Helper function for going to the top of a specific page
        var gotoPageTop = function (pageIndex)
        {
            var verticalOffset = getYOffset(pageIndex, "top");
            var horizontalOffset = getXOffset(pageIndex, "center");

            gotoPage(pageIndex, verticalOffset, horizontalOffset);
        };

        // Helper function for going to a particular page
        // Vertical offset: from center of diva element to top of current page
        // Horizontal offset: from the center of the page; can be negative if to the left
        var gotoPage = function (pageIndex, verticalOffset, horizontalOffset)
        {
            //convert offsets to 0 if undefined
            horizontalOffset = (typeof horizontalOffset !== 'undefined') ? horizontalOffset: 0;
            verticalOffset = (typeof verticalOffset !== 'undefined') ? verticalOffset : 0;

            var desiredVerticalCenter = settings.pageTopOffsets[pageIndex] + verticalOffset;
            var desiredTop = desiredVerticalCenter - parseInt(settings.panelHeight / 2, 10);

            var desiredHorizontalCenter = settings.pageLeftOffsets[pageIndex] + horizontalOffset;
            var desiredLeft = desiredHorizontalCenter - parseInt(settings.panelWidth / 2, 10);

            settings.outerObject.scrollTop(desiredTop);
            settings.outerObject.scrollLeft(desiredLeft);

            // Pretend that this is the current page
            if (pageIndex !== settings.currentPageIndex)
            {
                settings.currentPageIndex = pageIndex;
                var filename = settings.pages[pageIndex].f;

                executeCallback(settings.onSetCurrentPage, pageIndex, filename);
                diva.Events.publish("VisiblePageDidChange", [pageIndex, filename], self);
            }

            // Execute the onJump callback
            executeCallback(settings.onJump, pageIndex);
            diva.Events.publish("ViewerDidJump", [pageIndex], self);
        };

        // Calculates the desired row, then scrolls there
        var gotoRow = function (pageIndex)
        {
            var desiredRow = Math.floor(pageIndex / settings.pagesPerRow);
            var desiredTop = desiredRow * settings.rowHeight;
            settings.outerObject.scrollTop(desiredTop);

            // Pretend that this is the current page (it probably isn't)
            settings.currentPageIndex = pageIndex;
            var filename = settings.pages[pageIndex].f;
            diva.Events.publish("VisiblePageDidChange", [pageIndex, filename], self);
        };

        // Don't call this when not in grid mode please
        // Scrolls to the relevant place when in grid view
        var gridScroll = function ()
        {
            // Figure out and scroll to the row containing the current page
            gotoRow(settings.goDirectlyTo);
        };

        // If the given zoom level is valid, returns it; else, returns the min
        var getValidZoomLevel = function (zoomLevel)
        {
            return (zoomLevel >= settings.minZoomLevel && zoomLevel <= settings.maxZoomLevel) ? zoomLevel : settings.minZoomLevel;
        };

        var getValidPagesPerRow = function (pagesPerRow)
        {
            return (pagesPerRow >= settings.minPagesPerRow && pagesPerRow <= settings.maxPagesPerRow) ? pagesPerRow : settings.maxPagesPerRow;
        };

        // Reset some settings and empty the viewport
        var clearViewer = function ()
        {
            settings.allTilesLoaded = [];
            settings.outerObject.scrollTop(0);
            settings.innerObject.empty();
            settings.firstPageLoaded = 0;
            settings.firstRowLoaded = -1;
            settings.previousTopScroll = 0;
            settings.previousLeftScroll = 0;

            // Clear all the timeouts to prevent undesired pages from loading
            clearTimeout(settings.resizeTimer);

            while (settings.pageTimeouts.length)
            {
                clearTimeout(settings.pageTimeouts.pop());
            }
        };

        // Called when we don't necessarily know which view to go into
        var loadViewer = function ()
        {
            if (settings.inGrid)
                loadGrid();
            else
                loadDocument();
        };

        // Called every time we need to load document view (after zooming, fullscreen, etc)
        var loadDocument = function ()
        {
            clearViewer();

            settings.zoomLevel = getValidZoomLevel(settings.zoomLevel);
            var z = settings.zoomLevel;

            // Now reset some things that need to be changed after each zoom
            settings.totalHeight = settings.totalHeights[z] + settings.verticalPadding * (settings.numPages + 1);
            settings.totalWidth = settings.totalWidths[z] + settings.horizontalPadding * (settings.numPages + 1);

            // Determine the width of the inner element (based on the max width)
            var maxWidthToSet = settings.maxWidths[z] + settings.horizontalPadding * 2;
            var maxHeightToSet = settings.maxHeights[z] + settings.verticalPadding * 2;
            var widthToSet = Math.max(maxWidthToSet, settings.panelWidth);
            var heightToSet = Math.max(maxHeightToSet, settings.panelHeight);

            //Set the inner element to said width
            var innerEl = document.getElementById(settings.ID + 'inner');
            if (settings.verticallyOriented)
            {
                innerEl.style.height = Math.round(settings.totalHeight) + 'px';
                innerEl.style.width = Math.round(widthToSet) + 'px';
            }
            else
            {
                innerEl.style.height = Math.round(heightToSet) + 'px';
                innerEl.style.width = Math.round(settings.totalWidth) + 'px';
            }

            // Set settings.pageTopOffsets/pageLeftOffsets to determine where we're going to need to scroll, reset them in case they were used for grid before
            var heightSoFar = 0;
            var widthSoFar = 0;
            var i;

            settings.pageTopOffsets = [];
            settings.pageLeftOffsets = [];

            for (i = 0; i < settings.numPages; i++)
            {
                // First set the height above that page by adding this height to the previous total
                // A page includes the padding above it
                settings.pageTopOffsets[i] = parseInt(settings.verticallyOriented ? heightSoFar : (heightToSet - getPageData(i, 'h')) / 2, 10);
                settings.pageLeftOffsets[i] = parseInt(settings.verticallyOriented ? (widthToSet - getPageData(i, 'w')) / 2 : widthSoFar, 10);

                // Has to be done this way otherwise you get the height of the page included too
                heightSoFar = settings.pageTopOffsets[i] + getPageData(i, 'h') + settings.verticalPadding;
                widthSoFar = settings.pageLeftOffsets[i] + getPageData(i, 'w') + settings.horizontalPadding;
            }

            // Make sure the value for settings.goDirectlyTo is valid
            if (!isPageValid(settings.goDirectlyTo))
                settings.goDirectlyTo = 0;

            // Scroll to the proper place using stored y/x offsets (relative to the center of the page)
            gotoPage(settings.goDirectlyTo, settings.verticalOffset, settings.horizontalOffset);

            // Once the viewport is aligned, we can determine which pages will be visible and load them
            var pageBlockFound = false;
            for (i = 0; i < settings.numPages; i++)
            {
                if (isPageVisible(i))
                {
                    loadPage(i);
                    settings.lastPageLoaded = i;
                    pageBlockFound = true;
                }
                else if (pageBlockFound) // There will only be one consecutive block of pages to load; once we find a page that's invisible, we can terminate this loop.
                {
                    break;
                }
            }

            // If this is not the initial load, execute the zoom callbacks
            if (settings.oldZoomLevel >= 0)
            {
                if (settings.oldZoomLevel < settings.zoomLevel)
                {
                    executeCallback(settings.onZoomIn, z);
                    diva.Events.publish("ViewerDidZoomIn", [z], self);
                }
                else
                {
                    executeCallback(settings.onZoomOut, z);
                    diva.Events.publish("ViewerDidZoomOut", [z], self);
                }

                executeCallback(settings.onZoom, z);
            }
            else
            {
                settings.oldZoomLevel = settings.zoomLevel;
            }

            // For the iPad - wait until this request finishes before accepting others
            if (settings.scaleWait)
                settings.scaleWait = false;

            var fileName = settings.pages[settings.currentPageIndex].f;
            executeCallback(settings.onDocumentLoaded, settings.currentPageIndex, fileName);
            diva.Events.publish("DocumentDidLoad", [settings.currentPageIndex, fileName], self);
        };

        var loadGrid = function ()
        {
            var pageIndex = settings.currentPageIndex;
            settings.verticalOffset = (settings.verticallyOriented ? (settings.panelHeight / 2) : getPageData(pageIndex, "h") / 2);
            settings.horizontalOffset = (settings.verticallyOriented ? getPageData(pageIndex, "w") / 2 : (settings.panelWidth / 2));

            clearViewer();

            // Make sure the pages per row setting is valid
            settings.pagesPerRow = getValidPagesPerRow(settings.pagesPerRow);

            var horizontalPadding = settings.fixedPadding * (settings.pagesPerRow + 1);
            var pageWidth = (settings.panelWidth - horizontalPadding) / settings.pagesPerRow;
            settings.gridPageWidth = pageWidth;

            // Calculate the row height depending on whether we want to fix the width or the height
            settings.rowHeight = (settings.fixedHeightGrid) ? settings.fixedPadding + settings.minRatio * pageWidth : settings.fixedPadding + settings.maxRatio * pageWidth;
            settings.numRows = Math.ceil(settings.numPages / settings.pagesPerRow);
            settings.totalHeight = settings.numRows * settings.rowHeight + settings.fixedPadding;

            var innerEl = document.getElementById(settings.ID + 'inner');
            innerEl.style.height = Math.round(settings.totalHeight) + 'px';
            innerEl.style.width = Math.round(settings.panelWidth) + 'px';

            // First scroll directly to the row containing the current page
            gridScroll();

            var i, rowIndex;
            settings.pageTopOffsets = [];
            settings.pageLeftOffsets = [];


            // Figure out the row each page is in
            var np = settings.numPages;
            for (i = 0; i < np; i += settings.pagesPerRow)
            {
                rowIndex = Math.floor(i / settings.pagesPerRow);

                if (isRowVisible(rowIndex))
                {
                    settings.firstRowLoaded = (settings.firstRowLoaded < 0) ? rowIndex : settings.firstRowLoaded;
                    loadRow(rowIndex);
                    settings.lastRowLoaded = rowIndex;
                }
            }
        };

        //Shortcut for closing fullscreen with the escape key
        var escapeListener = function (e)
        {
            if (e.keyCode == 27)
                toggleFullscreen();
        };

        // Handles switching in and out of fullscreen mode
        // Should only be called after changing settings.inFullscreen
        var handleModeChange = function (changeView)
        {
            // Toggle the classes
            settings.outerObject.toggleClass('diva-fullscreen');
            $('body').toggleClass('diva-hide-scrollbar');
            settings.parentObject.toggleClass('diva-full-width');

            // Adjust margin a bit if in mobile
            if (settings.mobileWebkit)
            {
                var leftMarginComped = parseInt(settings.outerObject.css('margin-left'), 10) - parseInt($('body').css('margin-left'), 10);
                settings.outerObject.css('margin-left', leftMarginComped);
            }

            // Adjust Diva's internal panel size, keeping the old values
            var storedHeight = settings.panelHeight;
            var storedWidth = settings.panelWidth;
            updatePanelSize();

            // If this isn't the original load...
            if (settings.oldZoomLevel >= 0 && !settings.inGrid)
            {
                //get the updated panel size
                var newHeight = settings.panelHeight;
                var newWidth = settings.panelWidth;

                //and re-center the new panel on the same point
                if (settings.inFullscreen)
                {
                    settings.verticalOffset -= ((newHeight - storedHeight) / 2);
                    settings.horizontalOffset -= ((newWidth - storedWidth) / 2);
                }
                else
                {
                    settings.verticalOffset += ((storedHeight - newHeight) / 2);
                    settings.horizontalOffset += ((storedWidth - newWidth) / 2);
                }
            }

            // If setState changes both view and mode, trigger that here
            if (changeView)
            {
                settings.inGrid = !settings.inGrid;
                handleViewChange();
            }
            else
            {
                loadViewer();
            }

            //turn on/off escape key listener
            if (settings.inFullscreen)
                $(document).on('keyup', escapeListener);
            else
                $(document).off('keyup', escapeListener);

            // Execute callbacks
            executeCallback(settings.onModeToggle, settings.inFullscreen);
            diva.Events.publish("ModeDidSwitch", [settings.inFullscreen], self);
        };

        // Handles switching in and out of grid view
        // Should only be called after changing settings.inGrid
        var handleViewChange = function ()
        {
            loadViewer();
            executeCallback(settings.onViewToggle, settings.inGrid);

            // Switch the slider
            diva.Events.publish("ViewDidSwitch", [settings.inGrid], self);
        };

        // Called when the fullscreen icon is clicked
        var toggleFullscreen = function ()
        {
            settings.goDirectlyTo = settings.currentPageIndex;
            settings.inFullscreen = !settings.inFullscreen;
            handleModeChange(false);
        };

        // Called when the grid icon is clicked
        var toggleGrid = function ()
        {
            settings.goDirectlyTo = settings.currentPageIndex;

            settings.inGrid = !settings.inGrid;
            handleViewChange();
        };

        //toggles between orientations
        var toggleOrientation = function ()
        {
            settings.verticallyOriented = !settings.verticallyOriented;
            settings.verticalOffset = getYOffset();
            settings.horizontalOffset = getXOffset();
            settings.goDirectlyTo = settings.currentPageIndex;

            loadDocument();
            return settings.verticallyOriented;
        };

        // Called after double-click or ctrl+double-click events on pages in document view
        var handleDocumentDoubleClick = function (event)
        {
            var pageOffset = $(this).offset();

            settings.doubleClickZoom = true;
            settings.horizontalOffset = event.pageX - pageOffset.left;
            settings.verticalOffset = event.pageY - pageOffset.top;
            settings.goDirectlyTo = parseInt($(this).attr('data-index'), 10); //page index

            // Hold control to zoom out, otherwise, zoom in
            var newZoomLevel = (event.ctrlKey) ? settings.zoomLevel - 1 : settings.zoomLevel + 1;

            handleZoom(newZoomLevel);
        };

        // Called after double-clicking on a page in grid view
        var handleGridDoubleClick = function (event)
        {
            var pageIndex = parseInt($(this).attr('data-index'), 10);
            settings.goDirectlyTo = pageIndex;
            var pageOffset = $(this).offset();
            var zoomProportion = getPageData(pageIndex, "w") / $(this).width();

            settings.horizontalOffset = (event.pageX - pageOffset.left) * zoomProportion;
            settings.verticalOffset = (event.pageY - pageOffset.top) * zoomProportion;

            // Leave grid view, jump directly to the desired page
            settings.inGrid = false;
            handleViewChange();
        };

        // Handles pinch-zooming for mobile devices
        var handlePinchZoom = function (zoomDelta, event)
        {
            var newZoomLevel = settings.zoomLevel;

            // First figure out the new zoom level:
            if (zoomDelta > 100 && newZoomLevel < settings.maxZoomLevel)
                newZoomLevel++;
            else if (zoomDelta < -100 && newZoomLevel > settings.minZoomLevel)
                newZoomLevel--;
            else
                return;

            // Set scaleWait to true so that we wait for this scale event to finish
            settings.scaleWait = true;

            // Store the offset information so that it can be used in loadDocument()
            var pageOffset = $(this).offset();
            settings.horizontalOffset = event.pageX - pageOffset.left;
            settings.verticalOffset = event.pageY - pageOffset.top;
            settings.goDirectlyTo = parseInt($(this).attr('data-index'), 10); //page index

            handleZoom(newZoomLevel);
        };

        // Called to handle any zoom level
        var handleZoom = function (newValue)
        {
            var newZoomLevel = getValidZoomLevel(newValue);

            // If the zoom level provided is invalid, return false
            if (newZoomLevel !== newValue)
                return false;

            var zoomRatio = Math.pow(2, newZoomLevel - settings.zoomLevel);

            // offsets refer to the distance from the top/left of the current page that the center of the viewport is.
            // for example: if the viewport is 800 pixels and the active page is 600 pixels wide and starts at 100 pixels, verticalOffset will be 300 pixels.
            if (settings.doubleClickZoom)
            {
                settings.verticalOffset *= zoomRatio;
                settings.horizontalOffset *= zoomRatio;
                settings.doubleClickZoom = false;
            }
            else
            {
                settings.goDirectlyTo = settings.currentPageIndex;
                settings.verticalOffset = zoomRatio * getCurrentYOffset();
                settings.horizontalOffset = zoomRatio * getCurrentXOffset();
            }

            settings.oldZoomLevel = settings.zoomLevel;
            settings.zoomLevel = newZoomLevel;

            // Update the slider
            diva.Events.publish("ZoomLevelDidChange", [newZoomLevel], self);
            loadDocument();

            return true;
        };

        // Called to handle changing the pages per row slider
        var handleGrid = function (newValue)
        {
            var newPagesPerRow = getValidPagesPerRow(newValue);

            // If the value provided is invalid, return false
            if (newPagesPerRow !== newValue)
                return false;

            settings.pagesPerRow = newPagesPerRow;

            // Update the slider
            diva.Events.publish("GridRowNumberDidChange", [newPagesPerRow], self);

            settings.goDirectlyTo = settings.currentPageIndex;
            loadGrid();

            return true;
        };

        /*
        Gets the Y-offset for a specific point on a specific page
        Acceptable values for "anchor":
            "top" (default) - will anchor top of the page to the top of the diva-outer element
            "bottom" - top, s/top/bottom
            "center" - will center the page on the diva element
        Returned value will be the distance from the center of the diva-outer element to the top of the current page for the specified anchor
        */
        var getYOffset = function (pageIndex, anchor)
        {
            pageIndex = (typeof(pageIndex) === "undefined" ? settings.currentPageIndex : pageIndex);

            if (anchor === "center" || anchor === "centre") //how you can tell an American coded this
            {
                return parseInt(getPageData(pageIndex, "h") / 2, 10);
            }
            else if (anchor === "bottom")
            {
                return parseInt(getPageData(pageIndex, "h") - settings.panelHeight / 2, 10);
            }
            else
            {
                return parseInt(settings.panelHeight / 2, 10);
            }
        };

        //Same as getYOffset with "left" and "right" as acceptable values instead of "top" and "bottom"
        var getXOffset = function (pageIndex, anchor)
        {
            pageIndex = (typeof(pageIndex) === "undefined" ? settings.currentPageIndex : pageIndex);

            if (anchor === "left")
            {
                return parseInt(settings.panelWidth / 2, 10);
            }
            else if (anchor === "right")
            {
                return parseInt(getPageData(pageIndex, "w") - settings.panelWidth / 2, 10);
            }
            else
            {
                return parseInt(getPageData(pageIndex, "w") / 2, 10);
            }
        };

        //gets distance from the center of the diva-outer element to the top of the current page
        var getCurrentYOffset = function()
        {
            var scrollTop = document.getElementById(settings.ID + 'outer').scrollTop;
            var elementHeight = settings.panelHeight;

            return (scrollTop - settings.pageTopOffsets[settings.currentPageIndex] + parseInt(elementHeight / 2, 10));
        };

        //gets distance from the center of the diva-outer element to the left of the current page
        var getCurrentXOffset = function()
        {
            var scrollLeft = document.getElementById(settings.ID + 'outer').scrollLeft;
            var elementWidth = settings.panelWidth;

            return (scrollLeft - settings.pageLeftOffsets[settings.currentPageIndex] + parseInt(elementWidth / 2, 10));
        };

        var getState = function ()
        {
            var state = {
                'f': settings.inFullscreen,
                'g': settings.inGrid,
                'z': settings.zoomLevel,
                'n': settings.pagesPerRow,
                'i': (settings.enableFilename) ? settings.pages[settings.currentPageIndex].f : false,
                'p': (settings.enableFilename) ? false : settings.currentPageIndex + 1,
                'y': (settings.inGrid) ? false : getCurrentYOffset(),
                'x': (settings.inGrid) ? false : getCurrentXOffset()
            };

            return state;
        };

        var getURLHash = function ()
        {
            var hashParams = getState();
            var hashStringBuilder = [];
            var param;

            for (param in hashParams)
            {
                if (hashParams[param] !== false)
                    hashStringBuilder.push(param + settings.hashParamSuffix + '=' + hashParams[param]);
            }

            return hashStringBuilder.join('&');
        };

        // Returns the URL to the current state of the document viewer (so it should be an exact replica)
        var getCurrentURL = function ()
        {
            return location.protocol + '//' + location.host + location.pathname + '#' + getURLHash();
        };

        // updates panelHeight/panelWidth on resize
        var updatePanelSize = function ()
        {
            var outerElem = document.getElementById(settings.ID + 'outer');
            settings.panelHeight = outerElem.clientHeight - (outerElem.scrollWidth > outerElem.clientWidth ? settings.scrollbarWidth : 0);
            settings.panelWidth = outerElem.clientWidth - (outerElem.scrollHeight > outerElem.clientHeight ? settings.scrollbarWidth : 0);

            settings.horizontalOffset = getCurrentXOffset();
            settings.verticalOffset = getCurrentYOffset();

            gotoPage(settings.currentPageIndex, settings.verticalOffset, settings.horizontalOffset);
            return true;
        };

        // Bind mouse events (drag to scroll, double-click)
        var bindMouseEvents = function()
        {
            // Set drag scroll on first descendant of class dragger on both selected elements
            if (!settings.mobileWebkit)
            {
                settings.outerObject.dragscrollable({dragSelector: '.diva-dragger', acceptPropagatedEvent: true});
                settings.innerObject.dragscrollable({dragSelector: '.diva-dragger', acceptPropagatedEvent: true});
            }

            // Double-click to zoom
            settings.outerObject.on('dblclick', '.diva-document-page', function (event)
            {
                handleDocumentDoubleClick.call(this, event);
            });

            // Handle the control key for macs (in conjunction with double-clicking)
            settings.outerObject.on('contextmenu', '.diva-document-page', function (event)
            {
                if (event.ctrlKey)
                {
                    // In Firefox, this doesn't trigger a double-click, so we apply one manually
                    clearTimeout(settings.singleClickTimeout);

                    if (settings.singleClick)
                    {
                        handleDocumentDoubleClick.call(this, event);
                        settings.singleClick = false;
                    }
                    else
                    {
                        settings.singleClick = true;

                        // Set it to false again after 500 milliseconds (standard double-click timeout)
                        settings.singleClickTimeout = setTimeout(function ()
                        {
                            settings.singleClick = false;
                        }, 500);
                    }

                    return false;
                }
            });

            settings.outerObject.on('dblclick', '.diva-row', function (event)
            {
                handleGridDoubleClick.call($(event.target).parent(), event);
            });

        };

        // Pythagorean theorem to get the distance between two points (used for calculating finger distance for double-tap and pinch-zoom)
        var distance = function(x2, x1, y2, y1)
        {
            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        };

        // Binds most of the event handlers (some more in createToolbar)
        var handleEvents = function ()
        {
            // Change the cursor for dragging
            settings.innerObject.mouseover(function ()
            {
                $(this).removeClass('diva-grabbing').addClass('diva-grab');
            });

            settings.innerObject.mouseout(function ()
            {
                $(this).removeClass('diva-grab');
            });

            settings.innerObject.mousedown(function ()
            {
                $(this).removeClass('diva-grab').addClass('diva-grabbing');
            });

            settings.innerObject.mouseup(function ()
            {
                $(this).removeClass('diva-grabbing').addClass('diva-grab');
            });

            bindMouseEvents();

            // Handle the scroll
            var scrollFunction = function ()
            {
                var direction;
                var newScrollTop = document.getElementById(settings.ID + "outer").scrollTop;
                var newScrollLeft = document.getElementById(settings.ID + "outer").scrollLeft;

                if (settings.verticallyOriented || settings.inGrid)
                    direction = newScrollTop - settings.previousTopScroll;
                else
                    direction = newScrollLeft - settings.previousLeftScroll;

                //give adjustPages the direction we care about
                if (settings.inGrid)
                    adjustRows(direction);
                else
                    adjustPages(direction);

                settings.previousTopScroll = newScrollTop;
                settings.previousLeftScroll = newScrollLeft;

                settings.horizontalOffset = getCurrentXOffset();
                settings.verticalOffset = getCurrentYOffset();
            };

            settings.outerObject.scroll(scrollFunction);

            var upArrowKey = 38,
                downArrowKey = 40,
                leftArrowKey = 37,
                rightArrowKey = 39,
                spaceKey = 32,
                pageUpKey = 33,
                pageDownKey = 34,
                homeKey = 36,
                endKey = 35;

            // Catch the key presses in document
            $(document).keydown(function (event)
            {
                if (!settings.isActiveDiva)
                    return true;

                // Space or page down - go to the next page
                if ((settings.enableSpaceScroll && !event.shiftKey && event.keyCode === spaceKey) || (settings.enableKeyScroll && event.keyCode === pageDownKey))
                {
                    settings.outerObject.scrollTop(document.getElementById(settings.ID + "outer").scrollTop + settings.panelHeight);
                    return false;
                }
                else if (!settings.enableSpaceScroll && event.keyCode === spaceKey)
                {
                    event.preventDefault();
                }

                if (settings.enableKeyScroll)
                {
                    switch (event.keyCode)
                    {
                        case pageUpKey:
                            // Page up - go to the previous page
                            settings.outerObject.scrollTop(document.getElementById(settings.ID + "outer").scrollTop - settings.panelHeight);
                            return false;

                        case upArrowKey:
                            // Up arrow - scroll up
                            settings.outerObject.scrollTop(document.getElementById(settings.ID + "outer").scrollTop - settings.arrowScrollAmount);
                            return false;

                        case downArrowKey:
                            // Down arrow - scroll down
                            settings.outerObject.scrollTop(document.getElementById(settings.ID + "outer").scrollTop + settings.arrowScrollAmount);
                            return false;

                        case leftArrowKey:
                            // Left arrow - scroll left
                            settings.outerObject.scrollLeft(document.getElementById(settings.ID + "outer").scrollLeft - settings.arrowScrollAmount);
                            return false;

                        case rightArrowKey:
                            // Right arrow - scroll right
                            settings.outerObject.scrollLeft(document.getElementById(settings.ID + "outer").scrollLeft + settings.arrowScrollAmount);
                            return false;

                        case homeKey:
                            // Home key - go to the beginning of the document
                            settings.outerObject.scrollTop(0);
                            return false;

                        case endKey:
                            // End key - go to the end of the document
                            settings.outerObject.scrollTop(settings.totalHeight);
                            return false;

                        default:
                            return true;
                    }
                }
                return true;
            });

            // Check if the user is on a iPhone or iPod touch or iPad
            if (settings.mobileWebkit)
            {
                // Prevent resizing (below from http://matt.might.net/articles/how-to-native-iphone-ipad-apps-in-javascript/)
                var toAppend = [];
                toAppend.push('<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1" />');

                // Eliminate URL and button bars if added to home screen
                toAppend.push('<meta name="apple-mobile-web-app-capable" content="yes" />');

                // Choose how to handle the phone status bar
                toAppend.push('<meta name="apple-mobile-web-app-status-bar-style" content="black" />');
                $('head').append(toAppend.join('\n'));

                // Block the user from moving the window only if it's not integrated
                if (settings.blockMobileMove)
                {
                    $('body').bind('touchmove', function (event)
                    {
                        var e = event.originalEvent;
                        e.preventDefault();

                        return false;
                    });
                }

                // Inertial scrolling
                settings.outerObject.kinetic({
                    triggerHardware: true
                });

                // Bind events for pinch-zooming
                var start = [],
                    move = [],
                    startDistance = 0;

                settings.outerObject.on('touchstart', '.diva-document-page', function(event)
                {
                    if (event.originalEvent.touches.length === 2)
                    {
                        start = [event.originalEvent.touches[0].clientX,
                                 event.originalEvent.touches[0].clientY,
                                 event.originalEvent.touches[1].clientX,
                                 event.originalEvent.touches[1].clientY];

                        startDistance = distance(start[2], start[0], start[3], start[1]);
                    }
                });

                settings.outerObject.on('touchmove', '.diva-document-page', function(event)
                {
                    if (event.originalEvent.touches.length === 2)
                    {
                        move = [event.originalEvent.touches[0].clientX,
                                event.originalEvent.touches[0].clientY,
                                event.originalEvent.touches[1].clientX,
                                event.originalEvent.touches[1].clientY];

                        var moveDistance = distance(move[2], move[0], move[3], move[1]);
                        var zoomDelta = moveDistance - startDistance;

                        if (!settings.scaleWait)
                        {
                            // Save the page we're currently on so we scroll there
                            settings.goDirectlyTo = settings.currentPageIndex;

                            if (settings.inGrid)
                            {
                                settings.inGrid = false;
                                handleViewChange();
                            }
                            else
                            {
                                handlePinchZoom.call(this, zoomDelta, event);
                            }
                        }
                    }
                });

                var firstTapCoordinates = {},
                    tapDistance = 0;

                var bindDoubleTap = function(event)
                {
                    if (settings.singleTap)
                    {
                        // Doubletap has occurred
                        var touchEvent = {
                            pageX: event.originalEvent.changedTouches[0].clientX,
                            pageY: event.originalEvent.changedTouches[0].clientY
                        };

                        // If first tap is close to second tap (prevents interference with scale event)
                        tapDistance = distance(firstTapCoordinates.pageX, touchEvent.pageX, firstTapCoordinates.pageY, touchEvent.pageY);
                        if (tapDistance < 50 && settings.zoomLevel < settings.maxZoomLevel)
                            if (settings.inGrid)
                                handleGridDoubleClick.call($(event.target).parent(), touchEvent);
                            else
                                handleDocumentDoubleClick.call(this, touchEvent);

                        settings.singleTap = false;
                        firstTapCoordinates = {};
                    }
                    else
                    {
                        settings.singleTap = true;
                        firstTapCoordinates.pageX = event.originalEvent.changedTouches[0].clientX;
                        firstTapCoordinates.pageY = event.originalEvent.changedTouches[0].clientY;

                        // Cancel doubletap after 250 milliseconds
                        settings.singleTapTimeout = setTimeout(function()
                        {
                            settings.singleTap = false;
                            firstTapCoordinates = {};
                        }, 250);
                    }
                };

                // Document view: Double-tap to zoom in
                settings.outerObject.on('touchend', '.diva-document-page', bindDoubleTap);

                // Grid view: Double-tap to jump to current page in document view
                settings.outerObject.on('touchend', '.diva-page', bindDoubleTap);

                // Handle window resizing events
                var orientationEvent = "onorientationchange" in window ? "orientationchange" : "resize";
                $(window).bind(orientationEvent, function (event)
                {
                    var oldWidth = settings.panelWidth;
                    var oldHeight = settings.panelHeight;
                    updatePanelSize();

                    settings.horizontalOffset -= (settings.panelWidth - oldWidth) / 2;
                    settings.verticalOffset -= (settings.panelHeight - oldHeight) / 2;

                    // Reload the viewer to account for the resized viewport
                    settings.goDirectlyTo = settings.currentPageIndex;
                    loadViewer();
                });
            }
            // Handle window resizing events
            else
            {
                $(window).resize(function ()
                {
                    updatePanelSize();
                    // Cancel any previously-set resize timeouts
                    clearTimeout(settings.resizeTimer);

                    settings.resizeTimer = setTimeout(function ()
                    {
                        settings.goDirectlyTo = settings.currentPageIndex;
                        settings.verticalOffset = getCurrentYOffset();
                        settings.horizontalOffset = getCurrentXOffset();
                        loadViewer();
                    }, 200);
                });
            }
            diva.Events.subscribe('PanelSizeDidChange', updatePanelSize);

        };

        // Handles all status updating etc (both fullscreen and not)
        var createToolbar = function ()
        {
            // Prepare the HTML for the various components
            var gridIconHTML = (settings.enableGridIcon) ? '<div class="diva-grid-icon button' + (settings.inGrid ? ' diva-in-grid' : '') + '" id="' + settings.ID + 'grid-icon" title="Toggle grid view"></div>' : '';
            var linkIconHTML = (settings.enableLinkIcon) ? '<div class="diva-link-icon button" id="' + settings.ID + 'link-icon" style="' + (settings.enableGridIcon ? 'border-left: 0px' : '') + '" title="Link to this page"></div>' : '';
            var zoomSliderHTML = (settings.enableZoomControls === 'slider') ? '<input type="range" id="' + settings.ID + 'zoom-slider" class="zoom-slider" value="' + settings.zoomLevel +'" min="' + settings.minZoomLevel + '" max="' + settings.maxZoomLevel + '">' : '';
            var zoomButtonsHTML = (settings.enableZoomControls === 'buttons') ? '<div id="' + settings.ID + 'zoom-out-button" class="diva-zoom-out-button button" title="Zoom Out"></div><div id="' + settings.ID + 'zoom-in-button" class="diva-zoom-in-button button" title="Zoom In"></div>' : '';
            var gridSliderHTML = (settings.enableGridControls === 'slider') ? '<input type="range" id="' + settings.ID + 'grid-slider" class="grid-slider" value="' + settings.pagesPerRow +'" min="' + settings.minPagesPerRow + '" max="' + settings.maxPagesPerRow + '">' : '';
            var gridButtonsHTML = (settings.enableGridControls === 'buttons') ? '<div id="' + settings.ID + 'grid-out-button" class="diva-grid-out-button button" title="Zoom Out"></div><div id="' + settings.ID + 'grid-in-button" class="diva-grid-in-button button" title="Zoom In"></div>' : '';
            var gotoPageHTML = (settings.enableGotoPage) ? '<form id="' + settings.ID + 'goto-page" class="diva-goto-form"><input type="text" id="' + settings.ID + 'goto-page-input" / class="diva-input"> <input type="submit" value="Go" style="margin-top: 0px;" /></form>' : '';
            var zoomSliderLabelHTML = (settings.enableZoomControls === 'slider') ? '<div id="' + settings.ID + 'zoom-slider-label" class="diva-slider-label">Zoom level: <span id="' + settings.ID + 'zoom-level">' + settings.zoomLevel + '</span></div>' : '';
            var zoomButtonsLabelHTML = (settings.enableZoomControls === 'buttons') ? '<div id="' + settings.ID + 'zoom-buttons-label" class="diva-buttons-label">Zoom level: <span id="' + settings.ID + 'zoom-level">' + settings.zoomLevel + '</span></div>' : '';
            var gridSliderLabelHTML = (settings.enableGridControls === 'slider') ? '<div id="' + settings.ID + 'grid-slider-label" class="diva-slider-label">Pages per row: <span id="' + settings.ID + 'pages-per-row">' + settings.pagesPerRow + '</span></div>' : '';
            var gridButtonsLabelHTML = (settings.enableGridControls === 'buttons') ? '<div id="' + settings.ID + 'grid-buttons-label" class="diva-buttons-label">Pages per row: <span id="' + settings.ID + 'pages-per-row">' + settings.pagesPerRow + '</span></div>' : '';
            var pageNumberHTML = '<div class="diva-page-label">Page <span id="' + settings.ID + 'current-page">1</span> of <span id="' + settings.ID + 'num-pages">' + settings.numPages + '</span></div>';
            var fullscreenIconHTML = (settings.enableFullscreen) ? '<div id="' + settings.ID + 'fullscreen" class="diva-fullscreen-icon button" title="Toggle fullscreen mode"></div>' : '';

            var toolbarHTML = '<div id="' + settings.ID + 'tools-left" class="diva-tools-left' + '">' + zoomSliderHTML + zoomButtonsHTML + gridSliderHTML + gridButtonsHTML + zoomSliderLabelHTML + zoomButtonsLabelHTML + gridSliderLabelHTML + gridButtonsLabelHTML + '</div><div id="' + settings.ID + 'tools-right" class="diva-tools-right">' + fullscreenIconHTML + linkIconHTML + gridIconHTML + '<div id="' + settings.ID + 'page-nav" class="diva-page-nav">' + gotoPageHTML + pageNumberHTML + '</div></div>';

            settings.toolbarParentObject.prepend('<div id="' + settings.ID + 'tools" class="diva-tools">' + toolbarHTML + '</div>');

            // bind zoom slider
            $(settings.selector + 'zoom-slider').on('input', function(e)
            {
                var intValue = parseInt(this.value, 10);

                handleZoom(intValue);
            });

            $(settings.selector + 'zoom-slider').on('change', function(e)
            {
                var intValue = parseInt(this.value, 10);
                if (intValue !== settings.zoomLevel)
                    handleZoom(intValue);
            });

            // Zoom when zoom buttons clicked
            var zoomButtonClicked = function (direction)
            {
                handleZoom(settings.zoomLevel + direction);
            };

            // Bind the click event to zoom buttons
            $(settings.selector + 'zoom-out-button').click(function ()
            {
                zoomButtonClicked(-1);
            });

            $(settings.selector + 'zoom-in-button').click(function ()
            {
                zoomButtonClicked(1);
            });

            //bind grid slider
            $(settings.selector + 'grid-slider').on('input', function(e)
            {
                var intValue = parseInt(this.value, 10);
                handleGrid(intValue);
            });

            $(settings.selector + 'grid-slider').on('change', function(e)
            {
                var intValue = parseInt(this.value, 10);
                if (intValue !== settings.zoomLevel)
                    handleGrid(intValue);
            });

            // Bind fullscreen button
            $(settings.selector + 'fullscreen').click(function()
            {
                toggleFullscreen();
            });

            // Bind the grid buttons
            $(settings.selector + 'grid-out-button').click(function ()
            {
                handleGrid(settings.pagesPerRow - 1);
            });

            $(settings.selector + 'grid-in-button').click(function ()
            {
                handleGrid(settings.pagesPerRow + 1);
            });

            // Handle clicking of the grid icon
            $(settings.selector + 'grid-icon').click(function ()
            {
                toggleGrid();
            });

            // Handle going to a specific page using the input box
            $(settings.selector + 'goto-page').submit(function ()
            {
                var desiredPage = parseInt($(settings.selector + 'goto-page-input').val(), 10);
                var pageIndex = desiredPage - 1;

                if (!isPageValid(pageIndex))
                {
                    alert("Invalid page number");
                }
                else
                {
                    if (settings.inGrid)
                        gotoRow(pageIndex);
                    else
                        gotoPageTop(pageIndex);
                }

                // Prevent the default action of reloading the page
                return false;
            });

            var linkIcon = $(settings.selector + 'link-icon');
            // Handle the creation of the link popup box
            linkIcon.click(function ()
            {
                $('body').prepend('<div id="' + settings.ID + 'link-popup" class="diva-popup diva-link-popup"><input id="' + settings.ID + 'link-popup-input" class="diva-input" type="text" value="' + getCurrentURL() + '"/></div>');

                if (settings.inFullscreen)
                {
                    $(settings.selector + 'link-popup').addClass('in-fullscreen');
                }
                else
                {
                    // Calculate the left and top offsets
                    var leftOffset = linkIcon.offset().left - 222 + linkIcon.outerWidth();
                    var topOffset = linkIcon.offset().top + linkIcon.outerHeight() - 1;

                    $(settings.selector + 'link-popup').removeClass('in-fullscreen').css(
                    {
                        'top': topOffset + 'px',
                        'left': leftOffset + 'px'
                    });
                }

                // Catch onmouseup events outside of this div
                $('body').mouseup(function (event)
                {
                    var targetID = event.target.id;

                    if (targetID !== settings.ID + 'link-popup' && targetID !== settings.ID + 'link-popup-input')
                        $(settings.selector + 'link-popup').remove();
                });

                // Also delete it upon scroll and page up/down key events
                settings.outerObject.scroll(function ()
                {
                    $(settings.selector + 'link-popup').remove();
                });
                $(settings.selector + 'link-popup input').click(function ()
                {
                    $(this).focus().select();
                });

                return false;
            });

            // Show the relevant slider (or buttons, depending on settings)
            var currentSlider = (settings.inGrid) ? 'grid' : 'zoom';
            $(settings.selector + currentSlider + '-slider').show();
            $(settings.selector + currentSlider + '-out-button').show();
            $(settings.selector + currentSlider + '-in-button').show();
            $(settings.selector + currentSlider + '-slider-label').show();
            $(settings.selector + currentSlider + '-buttons-label').show();

            var switchMode = function ()
            {
                // Switch from fullscreen to not
                $(settings.selector + 'tools').toggleClass('diva-fullscreen-tools');

                if (!settings.inFullscreen)
                {
                    // Leaving fullscreen
                    //$(settings.selector + 'tools-left').after($(settings.selector + 'tools-right'));
                    $(settings.selector + 'tools-left').removeClass('in-fullscreen');
                }
                else
                {
                    // Entering fullscreen
                    //$(settings.selector + 'tools-right').after($(settings.selector + 'tools-left'));
                    $(settings.selector + 'tools-left').addClass('in-fullscreen');
                }
            };

            var switchView = function ()
            {
                // Switch from grid to document view etc
                $(settings.selector + currentSlider + '-slider').hide();
                $(settings.selector + currentSlider + '-out-button').hide();
                $(settings.selector + currentSlider + '-in-button').hide();
                $(settings.selector + currentSlider + '-slider-label').hide();
                $(settings.selector + currentSlider + '-buttons-label').hide();
                currentSlider = (settings.inGrid) ? 'grid' : 'zoom';
                $(settings.selector + currentSlider + '-slider').show();
                $(settings.selector + currentSlider + '-out-button').show();
                $(settings.selector + currentSlider + '-in-button').show();
                $(settings.selector + currentSlider + '-slider-label').show();
                $(settings.selector + currentSlider + '-buttons-label').show();

                // Also change the image for the grid icon
                $(settings.selector + 'grid-icon').toggleClass('diva-in-grid');
            };

            var toolbar =
            {
                updateCurrentPage: function ()
                {
                    document.getElementById(settings.ID + 'current-page').textContent = settings.currentPageIndex + 1;
                },
                setNumPages: function (newNumber)
                {
                    document.getElementById(settings.ID + 'num-pages').textContent = newNumber;
                },
                updateZoomSlider: function ()
                {
                    // Update the position of the handle within the slider
                    if (settings.zoomLevel !== $(settings.selector + 'zoom-slider').val())
                    {
                        $(settings.selector + 'zoom-slider').val(settings.zoomLevel);
                    }

                    // Update the slider label
                    document.getElementById(settings.ID + 'zoom-level').textContent = settings.zoomLevel;
                },
                updateZoomButtons: function ()
                {
                    // Update the buttons label
                    document.getElementById(settings.ID + 'zoom-level').textContent = settings.zoomLevel;
                },
                updateGridSlider: function ()
                {
                    // Update the position of the handle within the slider
                    if (settings.pagesPerRow !== $(settings.selector + 'grid-slider').val())
                    {
                        $(settings.selector + 'grid-slider').val(settings.pagesPerRow);
                    }

                    // Update the slider label
                    document.getElementById(settings.ID + 'pages-per-row').textContent = settings.pagesPerRow;
                },
                updateGridButtons: function ()
                {
                    // Update the buttons label
                    document.getElementById(settings.ID + 'pages-per-row').textContent = settings.pagesPerRow;
                },
                closePopups: function ()
                {
                    $('.diva-popup').css('display', 'none');
                },
                switchView: switchView,
                switchMode: switchMode
            };

            return toolbar;
        };

        var initPlugins = function ()
        {
            if (window.divaPlugins)
            {
                var pageTools = [];

                // Add all the plugins that have not been explicitly disabled to settings.plugins
                $.each(window.divaPlugins, function (index, plugin)
                {
                    var pluginProperName = plugin.pluginName[0].toUpperCase() + plugin.pluginName.substring(1);

                    if (settings['enable' + pluginProperName])
                    {
                        // Call the init function and check return value
                        var enablePlugin = plugin.init(settings, self);

                        // If int returns false, consider the plugin disabled
                        if (!enablePlugin)
                            return;

                        // If the title text is undefined, use the name of the plugin
                        var titleText = plugin.titleText || pluginProperName + " plugin";

                        // Create the pageTools bar if handleClick is set to a function
                        if (typeof plugin.handleClick === 'function')
                        {
                            pageTools.push('<div class="diva-' + plugin.pluginName + '-icon" title="' + titleText + '"></div>');

                            // Delegate the click event - pass it the settings
                            var clickEvent = (settings.mobileWebkit) ? 'touchend' : 'click';
                            settings.outerObject.on(clickEvent, '.diva-' + plugin.pluginName + '-icon', function (event)
                            {
                                plugin.handleClick.call(this, event, settings, self);
                            });
                        }

                        // Add it to settings.plugins so it can be used later
                        settings.plugins.push(plugin);
                    }
                });

                // Save the page tools bar so it can be added for each page
                if (pageTools.length)
                    settings.pageTools = '<div class="diva-page-tools">' + pageTools.join('') + '</div>';
            }
        };

        var hideThrobber = function ()
        {
            // Clear the timeout, if it hasn't executed yet
            clearTimeout(settings.throbberTimeoutID);

            // Hide the throbber if it has already executed
            $(settings.selector + 'throbber').hide();
        };

        var setupViewer = function ()
        {
            // Create the throbber element
            var throbberHTML = '<div id="' + settings.ID + 'throbber" class="diva-throbber"></div>';
            settings.outerObject.append(throbberHTML);

            // If the request hasn't completed after a specified time, show it
            settings.throbberTimeoutID = setTimeout(function ()
            {
                $(settings.selector + 'throbber').show();
            }, settings.throbberTimeout);

            $.ajax({
                url: settings.objectData,
                cache: true,
                dataType: 'json',
                error: function (jqxhr, status, error)
                {
                    hideThrobber();

                    // Show a basic error message within the document viewer pane
                    var requestError = '<div id="' + settings.ID + 'error" class="diva-error">' +
                            '<p><strong>Error</strong></p>' +
                            '<p>Invalid objectData. Error code: ' + status + ' ' + error + '</p>';

                    // Detect and handle CORS errors
                    var dataHasAbsolutePath = settings.objectData.lastIndexOf('http', 0) === 0;

                    if (dataHasAbsolutePath && error === '')
                    {
                        var jsonHost = settings.objectData.replace(/https?:\/\//i, "").split(/[/?#]/)[0];
                        if (location.hostname !== jsonHost)
                        {
                            requestError += '<p>Attempted to access cross-origin data without CORS.</p>' +
                                '<p>You may need to update your server configuration to support CORS. ' +
                                'For help, see the <a href="https://github.com/DDMAL/diva.js/wiki/' +
                                'Installation#a-note-about-cross-site-requests" target="_blank">' +
                                'cross-site request documentation.</a></p>';
                        }
                    }

                    requestError += '</div>';
                    settings.outerObject.append(requestError);
                },
                success: function (data, status, jqxhr)
                {
                    hideThrobber();

                    // Save all the data we need
                    settings.pages = data.pgs;
                    settings.maxRatio = data.dims.max_ratio;
                    settings.minRatio = data.dims.min_ratio;
                    settings.itemTitle = data.item_title;
                    settings.numPages = data.pgs.length;

                    // These are arrays, the index corresponding to the zoom level
                    settings.maxWidths = data.dims.max_w;
                    settings.maxHeights = data.dims.max_h;
                    settings.averageWidths = data.dims.a_wid;
                    settings.averageHeights = data.dims.a_hei;
                    settings.totalHeights = data.dims.t_hei;
                    settings.totalWidths = data.dims.t_wid;

                    // Make sure the set max and min values are valid
                    settings.realMaxZoom = data.max_zoom;
                    settings.maxZoomLevel = (settings.maxZoomLevel >= 0 && settings.maxZoomLevel <= data.max_zoom) ? settings.maxZoomLevel : data.max_zoom;
                    settings.minZoomLevel = (settings.minZoomLevel >= 0 && settings.minZoomLevel <= settings.maxZoomLevel) ? settings.minZoomLevel : 0;
                    settings.zoomLevel = getValidZoomLevel(settings.zoomLevel);
                    settings.minPagesPerRow = Math.max(2, settings.minPagesPerRow);
                    settings.maxPagesPerRow = Math.max(settings.minPagesPerRow, settings.maxPagesPerRow);

                    // Check that the desired page is in range
                    if (settings.enableFilename)
                    {
                        var iParam = $.getHashParam('i' + settings.hashParamSuffix);
                        var iParamPage = getPageIndex(iParam);

                        if (isPageValid(iParamPage))
                        {
                            settings.goDirectlyTo = iParamPage;
                            settings.currentPageIndex = iParamPage;
                        }
                    }
                    else
                    {
                        // Not using the i parameter, check the p parameter
                        // Subtract 1 to get the page index
                        var pParam = parseInt($.getHashParam('p' + settings.hashParamSuffix), 10) - 1;

                        if (isPageValid(pParam))
                        {
                            settings.goDirectlyTo = pParam;
                            settings.currentPageIndex = pParam;
                        }
                    }

                    // Execute the setup hook for each plugin (if defined)
                    $.each(settings.plugins, function (index, plugin)
                    {
                        executeCallback(plugin.setupHook, settings);
                    });

                    // Create the toolbar and display the title + total number of pages
                    if (settings.enableToolbar)
                    {
                        settings.toolbar = createToolbar();
                        diva.Events.subscribe("VisiblePageDidChange", settings.toolbar.updateCurrentPage);
                        diva.Events.subscribe("ModeDidSwitch", settings.toolbar.switchMode);
                        diva.Events.subscribe("ViewDidSwitch", settings.toolbar.switchView);
                        diva.Events.subscribe("ZoomLevelDidChange", settings.toolbar.updateZoomSlider);
                        diva.Events.subscribe("ZoomLevelDidChange", settings.toolbar.updateZoomButtons);
                        diva.Events.subscribe("GridRowNumberDidChange", settings.toolbar.updateGridSlider);
                        diva.Events.subscribe("ZoomLevelDidChange", settings.toolbar.updateGridButtons);
                    }

                    $(settings.selector + 'current label').text(settings.numPages);

                    if (settings.enableAutoTitle)
                    {
                        settings.parentObject.prepend('<div id="' + settings.ID + 'title" class="diva-title">' + settings.itemTitle + '</div>');
                    }

                    //if the parent is the body and there are no siblings, we don't want to use this to base size off, we want window instead
                    if (settings.parentObject.parent()[0] === document.body)
                    {
                        if (!settings.parentObject.siblings().not('#diva-canvas-backdrop')[0])
                            settings.divaIsFullWindow = true;
                    }

                    // Adjust the document panel dimensions
                    updatePanelSize();

                    // Make sure the value for settings.goDirectlyTo is valid
                    if (!isPageValid(parseInt(settings.goDirectlyTo), 10))
                        settings.goDirectlyTo = 0;

                    // Calculate the horizontal and vertical inter-page padding
                    if (settings.adaptivePadding > 0)
                    {
                        var z = settings.zoomLevel;
                        settings.horizontalPadding = parseInt(settings.averageWidths[z] * settings.adaptivePadding, 10);
                        settings.verticalPadding = parseInt(settings.averageHeights[z] * settings.adaptivePadding, 10);
                    }
                    else
                    {
                        // It's less than or equal to 0; use fixedPadding instead
                        settings.horizontalPadding = settings.fixedPadding;
                        settings.verticalPadding = settings.fixedPadding;
                    }

                    // Make sure the vertical padding is at least 40, if plugin icons are enabled
                    if (settings.pageTools.length)
                    {
                        settings.verticalPadding = Math.max(40, settings.verticalPadding);
                    }

                    // y - vertical offset from the top of the relevant page
                    var yParam = parseInt($.getHashParam('y' + settings.hashParamSuffix), 10);

                    if (!isNaN(yParam))
                    {
                        settings.verticalOffset = yParam;
                    }
                    else
                    {
                        settings.verticalOffset = getYOffset(settings.currentPageIndex, "top");
                    }

                    // x - horizontal offset from the center of the page
                    var xParam = parseInt($.getHashParam('x' + settings.hashParamSuffix), 10);

                    if (!isNaN(xParam))
                    {
                        settings.horizontalOffset = xParam;
                    }
                    else
                    {
                        settings.horizontalOffset = getXOffset(settings.currentPageIndex, "center");
                    }

                    if (settings.inFullscreen)
                        handleModeChange(false);
                    else
                        loadViewer();

                    //prep dimensions one last time now that pages have loaded
                    updatePanelSize();

                    // Execute the callback
                    executeCallback(settings.onReady, settings);
                    diva.Events.publish("ViewerDidLoad", [settings], self);

                    // signal that everything should be set up and ready to go.
                    settings.loaded = true;
                }
            });
        };

        var checkLoaded = function()
        {
            if (!settings.loaded)
            {
                console.warn("The viewer is not completely initialized. This is likely because it is still downloading data. To fix this, only call this function if the isReady() method returns true.");
                return false;
            }
            return true;
        };

        var init = function ()
        {
            // First figure out the width of the scrollbar in this browser
            settings.scrollbarWidth = $.getScrollbarWidth();

            // If window.orientation is defined, then it's probably mobileWebkit
            settings.mobileWebkit = window.orientation !== undefined;

            // Generate an ID that can be used as a prefix for all the other IDs
            settings.ID = $.generateId('diva-');
            settings.selector = '#' + settings.ID;

            // Figure out the hashParamSuffix from the ID
            var divaNumber = parseInt(settings.ID, 10);

            if (divaNumber > 1)
            {
                // If this is document viewer #1, don't use a suffix; otherwise, use the document viewer number
                settings.hashParamSuffix = divaNumber;
            }

            // Create the inner and outer panels
            settings.parentObject.append('<div id="' + settings.ID + 'outer" class="diva-outer"></div>');
            settings.outerObject = $(settings.selector + 'outer');
            settings.outerObject.append('<div id="' + settings.ID + 'inner" class="diva-inner diva-dragger"></div>');
            settings.innerObject = $(settings.selector + 'inner');

            // First, n - check if it's in range
            var nParam = parseInt($.getHashParam('n' + settings.hashParamSuffix), 10);

            if (nParam >= settings.minPagesPerRow && nParam <= settings.maxPagesPerRow)
            {
                settings.pagesPerRow = nParam;
            }

            // Now z - check that it's in range
            var zParam = $.getHashParam('z' + settings.hashParamSuffix);

            if (zParam !== '')
            {
                // If it's empty, we don't want to change the default zoom level
                zParam = parseInt(zParam, 10);

                // Can't check if it exceeds the max zoom level or not because that data is not available yet ...
                if (zParam >= settings.minZoomLevel)
                {
                    settings.zoomLevel = zParam;
                }
            }

            // If the "fullscreen" hash param is true, go to fullscreen initially
            // If the grid hash param is true, go to grid view initially
            var gridParam = $.getHashParam('g' + settings.hashParamSuffix);
            var goIntoGrid = gridParam === 'true';
            var fullscreenParam = $.getHashParam('f' + settings.hashParamSuffix);
            var goIntoFullscreen = fullscreenParam === 'true';

            settings.inGrid = (settings.inGrid && gridParam !== 'false') || goIntoGrid;
            settings.inFullscreen = (settings.inFullscreen && fullscreenParam !== 'false') || goIntoFullscreen;

            // Do the initial AJAX request and viewer loading
            setupViewer();

            // Do all the plugin initialisation
            initPlugins();

            handleEvents();
        };

        // Call the init function when this object is created.
        init();

        /* PUBLIC FUNCTIONS
        ===============================================
        */

        // Returns the title of the document, based on the directory name
        this.getItemTitle = function ()
        {
            return settings.itemTitle;
        };

        // Go to a particular page by its page number (with indexing starting at 1)
            //xAnchor may either be "left", "right", or default "center"; the (xAnchor) side of the page will be anchored to the (xAnchor) side of the diva-outer element
            //yAnchor may either be "top", "bottom", or default "center"; same process as xAnchor.
        // returns True if the page number passed is valid; false if it is not.
        this.gotoPageByNumber = function (pageNumber, xAnchor, yAnchor)
        {
            var pageIndex = pageNumber - 1;
            if (isPageValid(pageIndex))
            {
                gotoPage(pageIndex, getYOffset(pageIndex, yAnchor), getXOffset(pageIndex, xAnchor));
                return true;
            }
            return false;
        };

        // Go to a particular page (with indexing starting at 0)
            //xAnchor may either be "left", "right", or default "center"; the (xAnchor) side of the page will be anchored to the (xAnchor) side of the diva-outer element
            //yAnchor may either be "top", "bottom", or default "center"; same process as xAnchor.
        // returns True if the page index is valid; false if it is not.
        this.gotoPageByIndex = function (pageIndex, xAnchor, yAnchor)
        {
            if (isPageValid(pageIndex))
            {
                gotoPage(pageIndex, getYOffset(pageIndex, yAnchor), getXOffset(pageIndex, xAnchor));
                return true;
            }
            return false;
        };

        // Returns the page index (with indexing starting at 0)
        this.getCurrentPage = function ()
        {
            console.warn("The call to getCurrentPage is deprecated. Use getCurrentPageIndex instead.");
            return settings.currentPageIndex;
        };

        this.getNumberOfPages = function ()
        {
            if (!checkLoaded())
                return false;

            return settings.numPages;
        };

        // Returns the dimensions of a given page index at a given zoom level
        this.getPageDimensionsAtZoomLevel = function (pageIdx, zoomLevel)
        {
            if (!checkLoaded())
                return false;

            if (zoomLevel > settings.maxZoomLevel)
                zoomLevel = settings.maxZoomLevel;

            var pg = settings.pages[pageIdx];
            var pgAtZoom = pg.d[parseInt(zoomLevel, 10)];
            return {'width': pgAtZoom.w, 'height': pgAtZoom.h};
        };

        // Returns the dimensions of the current page at the current zoom level
        this.getCurrentPageDimensionsAtCurrentZoomLevel = function ()
        {
            return this.getPageDimensionsAtZoomLevel(settings.currentPageIndex, settings.zoomLevel);
        };

        this.isReady = function ()
        {
            return settings.loaded;
        };

        this.getCurrentPageIndex = function ()
        {
            return settings.currentPageIndex;
        };

        this.getCurrentPageFilename = function ()
        {
            return settings.pages[settings.currentPageIndex].f;
        };

        this.getCurrentPageNumber = function ()
        {
            return settings.currentPageIndex + 1;
        };

        // Returns an array of all filenames in the document
        this.getFilenames = function ()
        {
            var filenames = [];

            for (var i = 0; i < settings.numPages; i++)
            {
                filenames[i] = settings.pages[i].f;
            }

            return filenames;
        };

        // Returns the current zoom level
        this.getZoomLevel = function ()
        {
            return settings.zoomLevel;
        };

        // gets the maximum zoom level for the entire document
        this.getMaxZoomLevel = function ()
        {
            return settings.maxZoomLevel;
        };

        // gets the max zoom level for a given page
        this.getMaxZoomLevelForPage = function (pageIdx)
        {
            if (!checkLoaded)
                return false;

            return settings.pages[pageIdx].m;
        };

        this.getMinZoomLevel = function ()
        {
            return settings.minZoomLevel;
        };

        // Use the provided zoom level (will check for validity first)
        // Returns false if the zoom level is invalid, true otherwise
        this.setZoomLevel = function (zoomLevel)
        {
            if (settings.inGrid)
                toggleGrid();

            return handleZoom(zoomLevel);
        };

        // Zoom in. Will return false if it's at the maximum zoom
        this.zoomIn = function ()
        {
            return this.setZoomLevel(settings.zoomLevel + 1);
        };

        // Zoom out. Will return false if it's at the minimum zoom
        this.zoomOut = function ()
        {
            return this.setZoomLevel(settings.zoomLevel - 1);
        };

        // Check if something (e.g. a highlight box on a particular page) is visible
        this.inViewport = function (pageNumber, leftOffset, topOffset, width, height)
        {
            var pageIndex = pageNumber - 1;
            var top = settings.pageTopOffsets[pageIndex] + topOffset;
            var bottom = top + height;
            var left = settings.pageLeftOffsets[pageIndex] + leftOffset;
            var right = left + width;

            return isVerticallyInViewport(top, bottom) && isHorizontallyInViewport(left, right);
        };

        //Public wrapper for isPageVisible
        //Determines if a page is currently in the viewport
        this.isPageInViewport = function (pageIndex)
        {
            return isPageVisible(pageIndex);
        };

        //Public wrapper for isPageLoaded
        //Determines if a page is currently in the DOM
        this.isPageInDOM = function (pageIndex)
        {
            return isPageLoaded(pageIndex);
        };

        // Toggle fullscreen mode
        this.toggleFullscreenMode = function ()
        {
            toggleFullscreen();
        };

        // Close toolbar popups
        this.closePopups = function ()
        {
            settings.toolbar.closePopups();
        };

        // Enter fullscreen mode if currently not in fullscreen mode
        // Returns false if in fullscreen mode initially, true otherwise
        // This function will work even if enableFullscreen is set to false
        this.enterFullscreenMode = function ()
        {
            if (!settings.inFullscreen)
            {
                toggleFullscreen();
                return true;
            }

            return false;
        };

        // Leave fullscreen mode if currently in fullscreen mode
        // Returns true if in fullscreen mode intitially, false otherwise
        this.leaveFullscreenMode = function ()
        {
            if (settings.inFullscreen)
            {
                toggleFullscreen();
                return true;
            }

            return false;
        };

        // Toggle grid view
        this.toggleGridView = function ()
        {
            toggleGrid();
        };

        // Enter grid view if currently not in grid view
        // Returns false if in grid view initially, true otherwise
        this.enterGridView = function ()
        {
            if (!settings.inGrid)
            {
                toggleGrid();
                return true;
            }

            return false;
        };

        // Leave grid view if currently in grid view
        // Returns true if in grid view initially, false otherwise
        this.leaveGridView = function ()
        {
            if (settings.inGrid)
            {
                toggleGrid();
                return true;
            }

            return false;
        };

        // Jump to a page based on its filename
        // Returns true if successful and false if the filename is invalid
        this.gotoPageByName = function (filename, xAnchor, yAnchor)
        {
            var pageIndex = getPageIndex(filename);

            if (isPageValid(pageIndex))
            {
                gotoPage(pageIndex, getYOffset(pageIndex, yAnchor), getXOffset(pageIndex, xAnchor));
                return true;
            }

            return false;
        };

        // Get the page index (0-based) corresponding to a given filename
        // If the page index doesn't exist, this will return -1
        this.getPageIndex = function (filename)
        {
            return getPageIndex(filename);
        };

        // Get the current URL (exposes the private method)
        this.getCurrentURL = function ()
        {
            return getCurrentURL();
        };

        // Get the hash part only of the current URL (without the leading #)
        this.getURLHash = function ()
        {
            return getURLHash();
        };

        // Get an object representing the state of this diva instance (for setState)
        this.getState = function ()
        {
            return getState();
        };

        // Get the instance selector for this instance, since it's auto-generated.
        this.getInstanceSelector = function ()
        {
            return settings.selector;
        };

        // Get the instance ID -- essentially the selector without the leading '#'.
        this.getInstanceId = function ()
        {
            return settings.ID;
        };

        this.getSettings = function ()
        {
            return settings;
        };

        /*
            Translates a measurement from the zoom level on the largest size
            to one on the current zoom level.

            For example, a point 1000 on an image that is on zoom level 2 of 5
            translates to a position of 111.111... (1000 / (5 - 2)^2).

            Works for a single pixel co-ordinate or a dimension (e.g., translates a box
            that is 1000 pixels wide on the original to one that is 111.111 pixels wide
            on the current zoom level).
        */
        this.translateFromMaxZoomLevel = function (position)
        {
            var zoomDifference = settings.maxZoomLevel - settings.zoomLevel;
            return position / Math.pow(2, zoomDifference);
        };

        /*
            Translates a measurement from the current zoom level to the position on the
            largest zoom level.

            Works for a single pixel co-ordinate or a dimension (e.g., translates a box
            that is 111.111 pixels wide on the current image to one that is 1000 pixels wide
            on the current zoom level).
        */
        this.translateToMaxZoomLevel = function (position)
        {
            var zoomDifference = settings.maxZoomLevel - settings.zoomLevel;

            // if there is no difference, it's a box on the max zoom level and
            // we can just return the position.
            if (zoomDifference === 0)
                return position;

            return position * Math.pow(2, zoomDifference);
        };

        // Align this diva instance with a state object (as returned by getState)
        this.setState = function (state)
        {
            var pageIndex;

            // Only change settings.goDirectlyTo if state.i or state.p is valid
            pageIndex = getPageIndex(state.i);

            if (isPageValid(pageIndex))
                settings.goDirectlyTo = pageIndex;
            else if (isPageValid(state.p))
                settings.goDirectlyTo = state.p;

            horizontalOffset = parseInt(state.x, 10);
            verticalOffset = parseInt(state.y, 10);

            // Only change the zoom if state.z is valid
            if (state.z >= settings.minZoomLevel && state.z <= settings.maxZoomLevel)
                settings.zoomLevel = state.z;

            // Only change the pages per row setting if state.n is valid
            if (state.n >= settings.minPagesPerRow && state.n <= settings.maxPagesPerRow)
                settings.pagesPerRow = state.n;

            if (settings.inFullscreen !== state.f)
            {
                // The parameter determines if we need to change the view as well
                settings.inFullscreen = state.f;
                handleModeChange(settings.inGrid !== state.g);
                settings.horizontalOffset = horizontalOffset;
                settings.verticalOffset = verticalOffset;
                gotoPage(pageIndex, settings.verticalOffset, settings.horizontalOffset);
            }
            else
            {
                settings.horizontalOffset = horizontalOffset;
                settings.verticalOffset = verticalOffset;
                // Don't need to change the mode, may need to change view
                if (settings.inGrid !== state.g)
                {
                    settings.inGrid = state.g;
                    handleViewChange();
                }
                else
                {
                    // Reload the viewer, just in case
                    loadViewer();
                }
            }
        };

        // Re-enables document dragging, scrolling (by keyboard if set), and zooming by double-clicking
        this.enableScrollable = function()
        {
            if (!settings.isScrollable)
            {
                bindMouseEvents();
                settings.enableKeyScroll = settings.initialKeyScroll;
                settings.enableSpaceScroll = settings.initialSpaceScroll;
                settings.outerObject.css('overflow', 'auto');
                settings.isScrollable = true;
            }
        };

        // Disables document dragging, scrolling (by keyboard if set), and zooming by double-clicking
        this.disableScrollable = function ()
        {
            if (settings.isScrollable)
            {
                // block dragging/double-click zooming
                if (settings.innerObject.hasClass('diva-dragger'))
                    settings.innerObject.unbind('mousedown');
                settings.outerObject.unbind('dblclick');
                settings.outerObject.unbind('contextmenu');

                // disable all other scrolling actions
                settings.outerObject.css('overflow', 'hidden');

                // block scrolling keys behavior, respecting initial scroll settings
                settings.initialKeyScroll = settings.enableKeyScroll;
                settings.initialSpaceScroll = settings.enableSpaceScroll;
                settings.enableKeyScroll = false;
                settings.enableSpaceScroll = false;

                settings.isScrollable = false;
            }
        };

        //Changes between horizontal layout and vertical layout. Returns true if document is now vertically oriented, false otherwise.
        this.toggleOrientation = function ()
        {
            return toggleOrientation();
        };

        //Returns distance between the northwest corners of diva-inner and page index
        this.getPageOffset = function(pageIndex)
        {
            return {
                'top': parseInt(settings.pageTopOffsets[pageIndex]),
                'left': parseInt(settings.pageLeftOffsets[pageIndex])
            };
        };

        //shortcut to getPageOffset for current page
        this.getCurrentPageOffset = function()
        {
            return this.getPageOffset(settings.currentPageIndex);
        };

        //Returns the page position and size (ulx, uly, h, w properties) of page pageIndex when there are pagesPerRow pages per row
        //TODO: calculate all grid height levels and store them so this can be AtGridLevel(pageIndex, pagesPerRow) ?
        this.getPageDimensionsAtCurrentGridLevel = function(pageIndex)
        {
            pageIndex = (isPageValid(pageIndex) ? pageIndex : settings.currentPageIndex);

            var pageHeight = settings.rowHeight - settings.fixedPadding;
            var pageWidth = (settings.fixedHeightGrid) ? (settings.rowHeight - settings.fixedPadding) * getPageData(pageIndex, 'w') / getPageData(pageIndex, 'h') : settings.gridPageWidth;

            return {
                'height': parseInt(pageHeight, 10),
                'width': parseInt(pageWidth, 10)
            };
        };

        /*
            Given a pageX and pageY value (as could be retreived from a jQuery event object),
                returns either the page visible at that (x,y) position or "false" if no page is.
        */
        this.getPageIndexForPageXYValues = function(pageX, pageY)
        {
            //get the four edges of the outer element
            var outerObj = document.getElementById(settings.ID + "outer")
            var outerOffset = outerObj.getBoundingClientRect();
            var outerTop = outerOffset.top;
            var outerLeft = outerOffset.left;
            var outerBottom = outerOffset.bottom;
            var outerRight = outerOffset.right;

            //if the clicked position was outside the diva-outer object, it was not on a visible portion of a page
            if (pageX < outerLeft || pageX > outerRight)
                return false;

            if (pageY < outerTop || pageY > outerBottom)
                return false;

            //navigate through all diva page objects
            var pages = document.getElementsByClassName("diva-document-page");
            var curPageIdx = pages.length;
            while (curPageIdx--)
            {
                //get the offset for each page
                var curPage = pages[curPageIdx];
                var curOffset = curPage.getBoundingClientRect();

                //if this point is outside the horizontal boundaries of the page, continue
                if (pageX < curOffset.left || pageX > curOffset.right)
                    continue;

                //same with vertical boundaries
                if (pageY < curOffset.top || pageY > curOffset.bottom)
                    continue;

                //if we made it through the above two, we found the page we're looking for
                return curPage.getAttribute('data-index');
            }

            //if we made it through that entire while loop, we didn't click on a page
            return false;
        };

        //Pretty self-explanatory.
        this.isVerticallyOriented = function()
        {
            return settings.verticallyOriented;
        };

        this.activate = function ()
        {
            settings.isActiveDiva = true;
        };

        this.deactivate = function ()
        {
            settings.isActiveDiva = false;
        };

        // Destroys this instance, tells plugins to do the same (for testing)
        this.destroy = function ()
        {
            // Removes the hide-scrollbar class from the body
            $('body').removeClass('diva-hide-scrollbar');

            // Empty the parent container and remove any diva-related data
            settings.parentObject.empty().removeData('diva');

            // Call the destroy function for all the enabled plugins (if it exists)
            $.each(settings.plugins, function (index, plugin)
            {
                executeCallback(plugin.destroy, settings, self);
            });

            // Remove any additional styling on the parent element
            settings.parentObject.removeAttr('style').removeAttr('class');

            // Clear the Events cache
            diva.Events.unsubscribeAll();
        };
    };

    $.fn.diva = function (options)
    {
        return this.each(function ()
        {
            // Save the reference to the container element
            options.parentObject = $(this);

            // Return early if this element already has a plugin instance
            if (options.parentObject.data('diva'))
                return;

            // Otherwise, instantiate the document viewer
            var diva = new Diva(this, options);
            options.parentObject.data('diva', diva);
        });
    };

})(jQuery);
