(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["diva"] = factory(require("jquery"));
	else
		root["diva"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var diva = __webpack_require__(2);

	diva.registerPlugin(__webpack_require__(6));
	diva.registerPlugin(__webpack_require__(42));
	diva.registerPlugin(__webpack_require__(43));
	diva.registerPlugin(__webpack_require__(44));
	diva.registerPlugin(__webpack_require__(45));
	diva.registerPlugin(__webpack_require__(46));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(3);

	var Events = __webpack_require__(4);
	var PluginRegistry = __webpack_require__(5);

	var diva = module.exports = {
	    Events: new Events(),

	    registerPlugin: function (plugin)
	    {
	        PluginRegistry.register(plugin);
	    },

	    /**
	     * Create a new Diva instance at the given element
	     *
	     * @param element {Element}
	     * @param options {Object}
	     * @returns {Diva}
	     */
	    create: function (element, options)
	    {
	        if (diva.find(element))
	            throw new Error('Diva is already initialized on ' + reprElem(element));

	        var $elem = $(element);
	        $elem.diva(options);

	        return $elem.data('diva');
	    },

	    /**
	     * Return the Diva instance attached to the
	     * element, if any.
	     *
	     * @param element
	     * @returns {Diva|null}
	     */
	    find: function (element)
	    {
	        return $(element).data('diva') || null;
	    }
	};

	function reprElem(elem)
	{
	    var id = elem.id ? '#' + elem.id : elem.id;
	    var classes = elem.className ? '.' + elem.className.split(/\s+/g).join('.') : '';

	    return (id ? id : elem.tagName.toLowerCase()) + classes;
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = Events;

	/**
	 *      Events. Pub/Sub system for Loosely Coupled logic.
	 *      Based on Peter Higgins' port from Dojo to jQuery
	 *      https://github.com/phiggins42/bloody-jquery-plugins/blob/master/pubsub.js
	 *
	 *      Re-adapted to vanilla Javascript
	 *
	 *      @class Events
	 */
	function Events()
	{
	    this._cache = {};
	}

	/**
	 *      diva.Events.publish
	 *      e.g.: diva.Events.publish("PageDidLoad", [pageIndex, filename, pageSelector], this);
	 *
	 *      @class Events
	 *      @method publish
	 *      @param topic {String}
	 *      @param args  {Array}
	 *      @param scope {Object=} Optional - Subscribed functions will be executed with the supplied object as `this`.
	 *          It is necessary to supply this argument with the self variable when within a Diva instance.
	 *          The scope argument is matched with the instance ID of subscribers to determine whether they
	 *              should be executed. (See instanceID argument of subscribe.)
	 */
	Events.prototype.publish = function (topic, args, scope)
	{
	    if (this._cache[topic])
	    {
	        var thisTopic = this._cache[topic];

	        if (typeof thisTopic.global !== 'undefined')
	        {
	            var thisTopicGlobal = thisTopic.global;
	            var globalCount = thisTopicGlobal.length;

	            for (var i=0; i < globalCount; i++)
	            {
	                thisTopicGlobal[i].apply(scope || null, args || []);
	            }
	        }

	        if (scope && typeof scope.getInstanceId !== 'undefined')
	        {
	            // get publisher instance ID from scope arg, compare, and execute if match
	            var instanceID = scope.getInstanceId();

	            if (this._cache[topic][instanceID])
	            {
	                var thisTopicInstance = this._cache[topic][instanceID];
	                var scopedCount = thisTopicInstance.length;

	                for (var j=0; j < scopedCount; j++)
	                {
	                    thisTopicInstance[j].apply(scope, args || []);
	                }
	            }
	        }
	    }
	};

	/**
	 *      diva.Events.subscribe
	 *      e.g.: diva.Events.subscribe("PageDidLoad", highlight, settings.ID)
	 *
	 *      @class Events
	 *      @method subscribe
	 *      @param topic {String}
	 *      @param callback {Function}
	 *      @param instanceID {String=} Optional - String representing the ID of a Diva instance; if provided,
	 *                                            callback only fires for events published from that instance.
	 *      @return Event handler {Array}
	 */
	Events.prototype.subscribe = function (topic, callback, instanceID)
	{
	    if (!this._cache[topic])
	    {
	        this._cache[topic] = {};
	    }

	    if (typeof instanceID === 'string')
	    {
	        if (!this._cache[topic][instanceID])
	        {
	            this._cache[topic][instanceID] = [];
	        }

	        this._cache[topic][instanceID].push(callback);
	    }
	    else
	    {
	        if (!this._cache[topic].global)
	        {
	            this._cache[topic].global = [];
	        }

	        this._cache[topic].global.push(callback);
	    }

	    var handle = instanceID ? [topic, callback, instanceID] : [topic, callback];

	    return handle;
	};

	/**
	 *      diva.Events.unsubscribe
	 *      e.g.: var handle = Events.subscribe("PageDidLoad", highlight);
	 *              Events.unsubscribe(handle);
	 *
	 *      @class Events
	 *      @method unsubscribe
	 *      @param handle {Array}
	 *      @param completely {Boolean=} - Unsubscribe all events for a given topic.
	 *      @return success {Boolean}
	 */
	Events.prototype.unsubscribe = function (handle, completely)
	{
	    var t = handle[0];

	    if (this._cache[t])
	    {
	        var topicArray;
	        var instanceID = handle.length === 3 ? handle[2] : 'global';

	        topicArray = this._cache[t][instanceID];

	        if (!topicArray)
	        {
	            return false;
	        }

	        if (completely)
	        {
	            delete this._cache[t][instanceID];
	            return topicArray.length > 0;
	        }

	        var i = topicArray.length;
	        while (i--)
	        {
	            if (topicArray[i] === handle[1])
	            {
	                this._cache[t][instanceID].splice(i, 1);
	                return true;
	            }
	        }
	    }

	    return false;
	};

	/**
	 *      diva.Events.unsubscribeAll
	 *      e.g.: diva.Events.unsubscribeAll('global');
	 *
	 *      @class Events
	 *      @param instanceID {String=} Optional - instance ID to remove subscribers from or 'global' (if omitted,
	 *                                   subscribers in all scopes removed)
	 *      @method unsubscribeAll
	 */
	Events.prototype.unsubscribeAll = function (instanceID)
	{
	    if (instanceID)
	    {
	        var topics = Object.keys(this._cache);
	        var i = topics.length;
	        var topic;

	        while (i--)
	        {
	            topic = topics[i];

	            if (typeof this._cache[topic][instanceID] !== 'undefined')
	            {
	                delete this._cache[topic][instanceID];
	            }
	        }
	    }
	    else
	    {
	        this._cache = {};
	    }
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * @module
	 * @private
	 * The global plugin registry.
	 */

	var plugins = [];

	module.exports = {
	    register: function (plugin)
	    {
	        plugins.push(plugin);
	    },
	    getAll: function ()
	    {
	        return plugins;
	    }
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Diva.JS autoscroll plugin
	Author: Andrew Horwitz

	Lets Diva scroll in the primary direction (as determined by
	settings.verticallyOriented) automatically at a given/changeable rate.

	Relevant settings:
	    -scrollSpeed: pixels per second (defaults to 10)
	    -disableManualScroll: disables manual scroll while automatic scroll is on (defaults to false)
	    -currentlyAutoScrolling: whether or not autoscroll is currently on
	    -autoScrollRefresh: ms between scrolling actions
	    -disableAutoscrollPrefs: disables the autoscroll preferences panel

	Relevant methods:
	    -startScrolling, stopScrolling, toggleScrolling
	    -changeRefresh, changeScrollSpeed (setters for respective options)
	    -disableManualScroll, enableManualScroll
	*/

	var jQuery = __webpack_require__(3);
	var diva = __webpack_require__(7);

	(function ($)
	{
	    module.exports = (function()
	    {
	        var settings = {};
	        var retval =
	        {
	            init: function(divaSettings, divaInstance)
	            {
	                var pixelsPerScroll;
	                var disableManualScroll;
	                var autoScrollRefresh;
	                var defaultAutoRefresh;
	                var scrollSpeed;

	                function log10(x)
	                {
	                    return Math.log(x) / Math.log(10);
	                }

	                divaInstance.startScrolling = function()
	                {
	                    if (divaSettings.currentlyAutoScrolling)
	                    {
	                        console.warn("You are trying to start autoscrolling, but it is already scrolling.");
	                        return;
	                    }

	                    $("#" + divaSettings.ID + "autoscroll-toggle").text("Turn off");
	                    if (disableManualScroll)
	                    {
	                        divaInstance.disableScrollable();
	                    }

	                    divaSettings.currentlyAutoScrolling = true;
	                    restartScrollingInterval();
	                };

	                var restartScrollingInterval = function()
	                {
	                    clearInterval(divaSettings.autoScrollInterval);
	                    if (divaSettings.verticallyOriented)
	                    {
	                        divaSettings.autoScrollInterval = setInterval(function(){
	                            divaSettings.viewportObject.scrollTop(divaSettings.viewportObject.scrollTop() + pixelsPerScroll);
	                        }, autoScrollRefresh);
	                    }
	                    else
	                    {
	                        divaSettings.autoScrollInterval = setInterval(function(){
	                            divaSettings.viewportObject.scrollLeft(divaSettings.viewportObject.scrollLeft() + pixelsPerScroll);
	                        }, autoScrollRefresh);
	                    }
	                };

	                divaInstance.stopScrolling = function()
	                {
	                    if (!divaSettings.currentlyAutoScrolling)
	                    {
	                        console.warn("You are trying to stop autoscrolling, but it is not currently active.");
	                        return;
	                    }

	                    $("#" + divaSettings.ID + "autoscroll-toggle").text("Turn on");
	                    if (disableManualScroll)
	                    {
	                        divaInstance.enableScrollable();
	                    }

	                    divaSettings.currentlyAutoScrolling = false;
	                    clearInterval(divaSettings.autoScrollInterval);
	                };

	                divaInstance.toggleScrolling = function()
	                {
	                    if (divaSettings.currentlyAutoScrolling)
	                        divaInstance.stopScrolling();
	                    else
	                        divaInstance.startScrolling();
	                };

	                divaInstance.changeRefresh = function(newRefresh)
	                {
	                    autoScrollRefresh = newRefresh;
	                    updatePixelsPerScroll();
	                };

	                divaInstance.changeScrollSpeed = function(newSpeed)
	                {
	                    scrollSpeed = newSpeed;
	                    updatePixelsPerScroll();

	                    $("#" + divaSettings.ID + "autoscroll-pps").val(log10(scrollSpeed));
	                    if (divaSettings.currentlyAutoScrolling)
	                    {
	                        restartScrollingInterval();
	                    }
	                };

	                var updatePixelsPerScroll = function()
	                {
	                    autoScrollRefresh = defaultAutoRefresh;
	                    pixelsPerScroll = scrollSpeed / (1000 / autoScrollRefresh);

	                    //should be minimum of one otherwise it won't change the actual value
	                    //user can change autoscrollrefresh or scrollspeed; this may overwrite autoScrollRefresh
	                    if (pixelsPerScroll < 1)
	                    {
	                        autoScrollRefresh = autoScrollRefresh * (1 / pixelsPerScroll);
	                        pixelsPerScroll = scrollSpeed / (1000 / autoScrollRefresh);
	                    }
	                };

	                divaInstance.disableManualScroll = function()
	                {
	                    disableManualScroll = true;
	                    if (divaSettings.currentlyAutoScrolling)
	                    {
	                        divaInstance.disableScrollable();
	                    }
	                };

	                divaInstance.enableManualScroll = function()
	                {
	                    disableManualScroll = false;
	                    if (divaSettings.currentlyAutoScrolling)
	                    {
	                        divaInstance.enableScrollable();
	                    }
	                };

	                divaSettings.currentlyAutoScrolling = false;
	                divaSettings.autoScrollInterval = "";

	                disableManualScroll = divaSettings.disableManualScroll || false;
	                autoScrollRefresh = divaSettings.autoScrollRefresh || 50;
	                defaultAutoRefresh = autoScrollRefresh;

	                divaInstance.changeScrollSpeed((divaSettings.scrollSpeed || 10));

	                $(window).on('keyup', function(e)
	                {
	                    if (e.shiftKey && e.keyCode === 32)
	                    {
	                        divaInstance.toggleScrolling();
	                    }
	                });

	                if (!divaSettings.disableAutoscrollPrefs)
	                {
	                    var setPosition = function(isFullscreen)
	                    {
	                        if (divaSettings.inFullscreen)
	                        {
	                            var fullscreenTools = $(divaSettings.selector + 'tools');
	                            var toolsMargin = fullscreenTools.css('right');
	                            settings.jqObj.css({
	                                'right': toolsMargin,
	                                'margin-right': 0,
	                                'top': fullscreenTools.offset().top + fullscreenTools.outerHeight() + 15
	                            });
	                        }
	                        else
	                        {
	                            settings.jqObj.css({
	                                'right': $(window).width() - (divaSettings.viewportObject.offset().left + divaSettings.viewportObject.outerWidth()) + divaSettings.scrollbarWidth,
	                                'margin-right': '.6em'
	                            });
	                            settings.jqObj.offset({'top': divaSettings.viewportObject.offset().top + 1});
	                        }
	                    };

	                    diva.Events.subscribe('ModeDidSwitch', setPosition, divaSettings.ID);

	                    diva.Events.subscribe('ViewerDidLoad', function(s)
	                    {
	                        var autoscrollPrefsString =
	                        "<div id='" + divaSettings.ID + "autoscroll-prefs' class='diva-autoscroll-prefs diva-popup'>" +
	                            "<b>Autoscrolling options:</b><br>" +
	                            "<span class='diva-autoscroll-prefs-text'>Speed:</span>" +
	                            "<input type='range' id='" + divaSettings.ID + "autoscroll-pps' class='diva-autoscroll-pps diva-autoscroll-prefs-input' value='" + log10(scrollSpeed) + "' min='0' max='3' step='0.1'><br>" +
	                            "<span class='diva-autoscroll-prefs-text'>Allow manual scroll:</span>" +
	                            "<input type='checkbox' id='" + divaSettings.ID + "autoscroll-manual' class='diva-autoscroll-manual diva-autoscroll-prefs-input' checked='checked'><br>" +
	                            "<button id='" + divaSettings.ID + "autoscroll-toggle' class='diva-autoscroll-prefs-toggle diva-autoscroll-prefs-input'> Turn on </button>" +
	                        "</div>";
	                        $("#" + divaSettings.ID + "page-nav").before("<div id='" + divaSettings.ID + "autoscroll-icon' class='diva-button diva-autoscroll-icon' title='Expand autoscroll options'></div>");
	                        $("body").prepend(autoscrollPrefsString);

	                        $("#" + divaSettings.ID + "autoscroll-pps").on('change', function(e)
	                        {
	                            divaInstance.changeScrollSpeed(Math.pow(10, e.target.value));
	                        });

	                        $("#" + divaSettings.ID + "autoscroll-manual").on('change', function(e)
	                        {
	                            if (e.target.checked)
	                                divaInstance.enableManualScroll();
	                            else
	                                divaInstance.disableManualScroll();
	                        });

	                        $("#" + divaSettings.ID + "autoscroll-toggle").on('click', divaInstance.toggleScrolling);

	                        $("#" + divaSettings.ID + "autoscroll-icon").on('click', function(e)
	                        {
	                            settings.jqObj = $("#" + divaSettings.ID + "autoscroll-prefs");

	                            if (settings.jqObj.css('display') === 'none')
	                            {
	                                settings.jqObj.css({'display': 'block'});

	                                setPosition(divaSettings.inFullscreen);

	                            }
	                            else
	                            {
	                                settings.jqObj.css('display', 'none');
	                            }
	                        });
	                    }, divaSettings.ID);
	                }
	            },
	            pluginName: 'autoscroll',
	            titleText: 'Automatically scrolls page along primary axis'
	        };
	        return retval;
	    })();
	})(jQuery);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (C) 2011-2016 by Wendy Liu, Evan Magoni, Andrew Hankinson, Andrew Horwitz, Laurent Pugin

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

	var jQuery = __webpack_require__(3);

	var elt = __webpack_require__(8);
	var HashParams = __webpack_require__(9);

	var ActiveDivaController = __webpack_require__(10);
	var diva = __webpack_require__(2);
	var ImageManifest = __webpack_require__(11);
	var createToolbar = __webpack_require__(13);
	var ViewerCore = __webpack_require__(14);

	// Start the active Diva tracker
	var activeDiva = new ActiveDivaController(); // jshint ignore: line

	module.exports = diva;

	// this pattern was taken from http://www.virgentech.com/blog/2009/10/building-object-oriented-jquery-plugin.html
	(function ($)
	{
	    var Diva = function (element, options)
	    {
	        // Global instance variables (set way down in `init`)
	        var settings, viewerState, divaState;
	        var self = this;

	        // These are elements that can be overridden upon instantiation
	        // See https://github.com/DDMAL/diva.js/wiki/Settings for more details
	        options = $.extend({
	            adaptivePadding: 0.05,      // The ratio of padding to the page dimension
	            arrowScrollAmount: 40,      // The amount (in pixels) to scroll by when using arrow keys
	            blockMobileMove: false,     // Prevent moving or scrolling the page on mobile devices
	            objectData: '',             // A IIIF Manifest or a JSON file generated by process.py that provides the object dimension data, or a URL pointing to such data - *REQUIRED*
	            enableAutoTitle: true,      // Shows the title within a div of id diva-title
	            enableFilename: true,       // Uses filenames and not page numbers for links (i=bm_001.tif, not p=1)
	            enableFullscreen: true,     // Enable or disable fullscreen icon (mode still available)
	            enableGotoPage: true,       // A "go to page" jump box
	            enableGotoSuggestions: true, // Controls whether suggestions are shown under the input field when the user is typing in the 'go to page' form
	            enableGridIcon: true,       // A grid view of all the pages
	            enableGridControls: 'buttons',  // Specify control of pages per grid row in Grid view. Possible values: 'buttons' (+/-), 'slider'. Any other value disables the controls.
	            enableImageTitles: true,    // Adds "Page {n}" title to page images if true
	            enableKeyScroll: true,      // Captures scrolling using the arrow and page up/down keys regardless of page focus. When off, defers to default browser scrolling behavior.
	            enableLinkIcon: true,       // Controls the visibility of the link icon
	            enableNonPagedVisibilityIcon: true, // Controls the visibility of the icon to toggle the visibility of non-paged pages. (Automatically hidden if no 'non-paged' pages).
	            enableSpaceScroll: false,   // Scrolling down by pressing the space key
	            enableToolbar: true,        // Enables the toolbar. Note that disabling this means you have to handle all controls yourself.
	            enableZoomControls: 'buttons', // Specify controls for zooming in and out. Possible values: 'buttons' (+/-), 'slider'. Any other value disables the controls.
	            fillParentHeight: true,     // Use a flexbox layout to allow Diva to fill its parent's height
	            fixedPadding: 10,           // Fallback if adaptive padding is set to 0
	            fixedHeightGrid: true,      // So each page in grid view has the same height (only widths differ)
	            goDirectlyTo: 0,            // Default initial page to show (0-indexed)
	            hashParamSuffix: null,      // Used when there are multiple document viewers on a page
	            iipServerURL: '',           // The URL to the IIPImage installation, including the `?FIF=` - *REQUIRED*, unless using IIIF
	            inFullscreen: false,        // Set to true to load fullscreen mode initially
	            inBookLayout: false,       // Set to true to view the document with facing pages in document mode
	            inGrid: false,              // Set to true to load grid view initially
	            imageDir: '',               // Image directory, either absolute path or relative to IIP's FILESYSTEM_PREFIX - *REQUIRED*, unless using IIIF
	            maxPagesPerRow: 8,          // Maximum number of pages per row in grid view
	            maxZoomLevel: -1,           // Optional; defaults to the max zoom returned in the JSON response
	            minPagesPerRow: 2,          // Minimum pages per row in grid view. Recommended default.
	            minZoomLevel: 0,            // Defaults to 0 (the minimum zoom)
	            onGotoSubmit: null,         // When set to a function that takes a string and returns a page index, this will override the default behaviour of the 'go to page' form submission
	            pageAliases: {},            // An object mapping specific page indices to aliases (has priority over 'pageAliasFunction'
	            pageAliasFunction: function(){return false;},  // A function mapping page indices to an alias. If false is returned, default page number is displayed
	            pageLoadTimeout: 200,       // Number of milliseconds to wait before loading pages
	            pagesPerRow: 5,             // The default number of pages per row in grid view
	            showNonPagedPages: false,   // Whether pages tagged as 'non-paged' (in IIIF manifests only) should be visible after initial load
	            throbberTimeout: 100,       // Number of milliseconds to wait before showing throbber
	            tileHeight: 256,            // The height of each tile, in pixels; usually 256
	            tileWidth: 256,             // The width of each tile, in pixels; usually 256
	            toolbarParentObject: null,  // The toolbar parent object.
	            verticallyOriented: true,   // Determines vertical vs. horizontal orientation
	            viewportMargin: 200,        // Pretend tiles +/- 200px away from viewport are in
	            zoomLevel: 2                // The initial zoom level (used to store the current zoom level)
	        }, options);

	        // Returns the page index associated with the given filename; must called after setting settings.manifest
	        var getPageIndex = function (filename)
	        {
	            return getPageIndexForManifest(settings.manifest, filename);
	        };

	        var getPageIndexForManifest = function (manifest, filename)
	        {
	            var i,
	                np = manifest.pages.length;

	            for (i = 0; i < np; i++)
	            {
	                if (!manifest.pages[i])
	                {
	                    return -1;
	                }

	                if (manifest.pages[i].f === filename)
	                {
	                    return i;
	                }
	            }

	            return -1;
	        };

	        // Check if a page index is valid
	        var isPageValid = function (pageIndex)
	        {
	            return settings.manifest.isPageValid(pageIndex, settings.showNonPagedPages);
	        };

	        var reloadViewer = function (newOptions)
	        {
	            return divaState.viewerCore.reload(newOptions);
	        };

	        // Called when the change view icon is clicked
	        var changeView = function (destinationView)
	        {
	            switch (destinationView)
	            {
	                case 'document':
	                    return reloadViewer({
	                        inGrid: false,
	                        inBookLayout: false
	                    });

	                case 'book':
	                    return reloadViewer({
	                        inGrid: false,
	                        inBookLayout: true
	                    });

	                case 'grid':
	                    return reloadViewer({
	                        inGrid: true
	                    });

	                default:
	                    return false;
	            }
	        };

	        //toggles between orientations
	        var toggleOrientation = function ()
	        {
	            var verticallyOriented = !settings.verticallyOriented;

	            //if in grid, switch out of grid
	            reloadViewer({
	                inGrid: false,
	                verticallyOriented: verticallyOriented,
	                goDirectlyTo: settings.currentPageIndex,
	                verticalOffset: divaState.viewerCore.getYOffset(),
	                horizontalOffset: divaState.viewerCore.getXOffset()
	            });

	            return verticallyOriented;
	        };

	        // Called when the fullscreen icon is clicked
	        var toggleFullscreen = function ()
	        {
	            reloadViewer({
	                inFullscreen: !settings.inFullscreen
	            });
	        };

	        var getState = function ()
	        {
	            var view;

	            if (settings.inGrid)
	            {
	                view = 'g';
	            }
	            else if (settings.inBookLayout)
	            {
	                view = 'b';
	            }
	            else
	            {
	                view = 'd';
	            }

	            var layout = divaState.viewerCore.getCurrentLayout();
	            var pageOffset = layout.getPageToViewportCenterOffset(settings.currentPageIndex, viewerState.viewport);

	            var state = {
	                'f': settings.inFullscreen,
	                'v': view,
	                'z': settings.zoomLevel,
	                'n': settings.pagesPerRow,
	                'i': settings.enableFilename ? settings.manifest.pages[settings.currentPageIndex].f : false,
	                'p': settings.enableFilename ? false : settings.currentPageIndex + 1,
	                'y': pageOffset ? pageOffset.y : false,
	                'x': pageOffset ? pageOffset.x : false
	            };

	            return state;
	        };

	        var getLoadOptionsForState = function (state, manifest)
	        {
	            manifest = manifest || settings.manifest;

	            var options = ('v' in state) ? getViewState(state.v) : {};

	            if ('f' in state)
	                options.inFullscreen = state.f;

	            if ('z' in state)
	                options.zoomLevel = state.z;

	            if ('n' in state)
	                options.pagesPerRow = state.n;

	            // Only change specify the page if state.i or state.p is valid
	            var pageIndex = getPageIndexForManifest(manifest, state.i);

	            if (!(pageIndex >= 0 && pageIndex < manifest.pages.length))
	            {
	                pageIndex = state.p - 1;

	                // Possibly NaN
	                if (!(pageIndex >= 0 && pageIndex < manifest.pages.length))
	                    pageIndex = null;
	            }

	            if (pageIndex !== null)
	            {
	                var horizontalOffset = parseInt(state.x, 10);
	                var verticalOffset = parseInt(state.y, 10);

	                options.goDirectlyTo = pageIndex;
	                options.horizontalOffset = horizontalOffset;
	                options.verticalOffset = verticalOffset;
	            }

	            return options;
	        };

	        var getURLHash = function ()
	        {
	            var hashParams = getState();
	            var hashStringBuilder = [];
	            var param;

	            for (param in hashParams)
	            {
	                if (hashParams[param] !== false)
	                    hashStringBuilder.push(param + settings.hashParamSuffix + '=' + encodeURIComponent(hashParams[param]));
	            }

	            return hashStringBuilder.join('&');
	        };

	        // Returns the URL to the current state of the document viewer (so it should be an exact replica)
	        var getCurrentURL = function ()
	        {
	            return location.protocol + '//' + location.host + location.pathname + location.search + '#' + getURLHash();
	        };

	        var getViewState = function(view)
	        {
	            switch (view)
	            {
	                case 'd':
	                    return {
	                        inGrid: false,
	                        inBookLayout: false
	                    };

	                case 'b':
	                    return {
	                        inGrid: false,
	                        inBookLayout: true
	                    };

	                case 'g':
	                    return {
	                        inGrid: true,
	                        inBookLayout: false
	                    };

	                default:
	                    return null;
	            }
	        };

	        var showError = function(message)
	        {
	            divaState.viewerCore.showError(message);
	        };

	        var ajaxError = function(jqxhr, status, error)
	        {
	            // Show a basic error message within the document viewer pane

	            var errorMessage = ['Invalid objectData setting. Error code: ' + jqxhr.status + ' ' + error];

	            // Detect and handle CORS errors
	            var dataHasAbsolutePath = settings.objectData.lastIndexOf('http', 0) === 0;

	            if (dataHasAbsolutePath && error === '')
	            {
	                var jsonHost = settings.objectData.replace(/https?:\/\//i, "").split(/[/?#]/)[0];

	                if (location.hostname !== jsonHost)
	                {
	                    errorMessage.push(
	                        elt('p', 'Attempted to access cross-origin data without CORS.'),
	                        elt('p',
	                            'You may need to update your server configuration to support CORS. For help, see the ',
	                            elt('a', {
	                                href: 'https://github.com/DDMAL/diva.js/wiki/Installation#a-note-about-cross-site-requests',
	                                target: '_blank'
	                            }, 'cross-site request documentation.')
	                        )
	                    );
	                }
	            }

	            showError(errorMessage);
	        };

	        var loadObjectData = function (responseData, hashState)
	        {
	            var isIIIF, manifest;

	            // parse IIIF manifest if it is an IIIF manifest. TODO improve IIIF detection method
	            if (responseData.hasOwnProperty('@context') && (responseData['@context'].indexOf('iiif') !== -1 ||
	                responseData['@context'].indexOf('shared-canvas') !== -1))
	            {
	                isIIIF = true;

	                // trigger ManifestDidLoad event
	                // FIXME: Why is this triggered before the manifest is parsed? See https://github.com/DDMAL/diva.js/issues/357
	                diva.Events.publish('ManifestDidLoad', [responseData], self);

	                manifest = ImageManifest.fromIIIF(responseData);
	            }
	            else
	            {
	                // IIP support is now deprecated
	                console.warn("Usage of IIP manifests is deprecated. Consider switching to IIIF manifests. Visit http://iiif.io/ for more information.");

	                isIIIF = false;
	                manifest = ImageManifest.fromLegacyManifest(responseData, {
	                    iipServerURL: settings.iipServerURL,
	                    imageDir: settings.imageDir
	                });
	            }

	            var loadOptions = hashState ? getLoadOptionsForState(hashState, manifest) : {};

	            divaState.viewerCore.setManifest(manifest, isIIIF, loadOptions);
	        };

	        /** Parse the hash parameters into the format used by getState and setState */
	        var getHashParamState = function ()
	        {
	            var state = {};

	            ['f', 'v', 'z', 'n', 'i', 'p', 'y', 'x'].forEach(function (param)
	            {
	                var value = HashParams.get(param + settings.hashParamSuffix);

	                // `false` is returned if the value is missing
	                if (value !== false)
	                    state[param] = value;
	            });

	            // Do some awkward special-casing, since this format is kind of weird.

	            // For inFullscreen (f), true and false strings should be interpreted
	            // as booleans.
	            if (state.f === 'true')
	                state.f = true;
	            else if (state.f === 'false')
	                state.f = false;

	            // Convert numerical values to integers, if provided
	            ['z', 'n', 'p', 'x', 'y'].forEach(function (param)
	            {
	                if (param in state)
	                    state[param] = parseInt(state[param], 10);
	            });

	            return state;
	        };

	        var checkLoaded = function()
	        {
	            if (!viewerState.loaded)
	            {
	                console.warn("The viewer is not completely initialized. This is likely because it is still downloading data. To fix this, only call this function if the isReady() method returns true.");
	                return false;
	            }
	            return true;
	        };

	        var init = function ()
	        {
	            // In order to fill the height, use a wrapper div displayed using a flexbox layout
	            var wrapperElement = elt('div', {
	                class: "diva-wrapper" + (options.fillParentHeight ? " diva-wrapper-flexbox" : "")
	            });
	            element.appendChild(wrapperElement);
	            options.toolbarParentObject = options.toolbarParentObject || $(wrapperElement);

	            var viewerCore = new ViewerCore(wrapperElement, options, self);

	            viewerState = viewerCore.getInternalState();
	            settings = viewerCore.getSettings();

	            // Add the ID to the wrapper element now that the ID has been generated by the viewer core
	            wrapperElement.id = settings.ID + 'wrapper';

	            divaState = {
	                viewerCore: viewerCore,
	                toolbar: settings.enableToolbar ? createToolbar(self) : null
	            };

	            var hashState = getHashParamState();

	            if (typeof settings.objectData === 'object')
	            {
	                // Defer execution until initialization has completed
	                setTimeout(function ()
	                {
	                    loadObjectData(settings.objectData, hashState);
	                }, 0);
	            }
	            else
	            {
	                var pendingManifestRequest = $.ajax({
	                    url: settings.objectData,
	                    cache: true,
	                    dataType: 'json',
	                    error: ajaxError,
	                    success: function (responseData)
	                    {
	                        loadObjectData(responseData, hashState);
	                    }
	                });

	                // Store the pending request so that it can be cancelled in the event that Diva needs to be destroyed
	                viewerCore.setPendingManifestRequest(pendingManifestRequest);
	            }
	        };

	        /* PUBLIC FUNCTIONS
	        ===============================================
	        */

	        // Returns the title of the document, based on the directory name
	        this.getItemTitle = function ()
	        {
	            return settings.manifest.itemTitle;
	        };

	        // Go to a particular page by its page number (with indexing starting at 1)
	            //xAnchor may either be "left", "right", or default "center"; the (xAnchor) side of the page will be anchored to the (xAnchor) side of the diva-outer element
	            //yAnchor may either be "top", "bottom", or default "center"; same process as xAnchor.
	        // returns True if the page number passed is valid; false if it is not.
	        this.gotoPageByNumber = function (pageNumber, xAnchor, yAnchor)
	        {
	            console.warn("This method is deprecated. Consider using gotoPageByIndex(pageIndex, xAnchor, yAnchor) instead.");
	            var pageIndex = parseInt(pageNumber, 10) - 1;
	            return this.gotoPageByIndex(pageIndex, xAnchor, yAnchor);
	        };

	        // Go to a particular page (with indexing starting at 0)
	            //xAnchor may either be "left", "right", or default "center"; the (xAnchor) side of the page will be anchored to the (xAnchor) side of the diva-outer element
	            //yAnchor may either be "top", "bottom", or default "center"; same process as xAnchor.
	        // returns True if the page index is valid; false if it is not.
	        this.gotoPageByIndex = function (pageIndex, xAnchor, yAnchor)
	        {
	            pageIndex = parseInt(pageIndex, 10);
	            if (isPageValid(pageIndex))
	            {
	                var xOffset = divaState.viewerCore.getXOffset(pageIndex, xAnchor);
	                var yOffset = divaState.viewerCore.getYOffset(pageIndex, yAnchor);

	                viewerState.renderer.goto(pageIndex, yOffset, xOffset);
	                return true;
	            }
	            return false;
	        };

	        this.getNumberOfPages = function ()
	        {
	            if (!checkLoaded())
	                return false;

	            return settings.numPages;
	        };

	        // Get page dimensions in the current view and zoom level
	        this.getPageDimensions = function (pageIndex)
	        {
	            if (!checkLoaded())
	                return null;

	            return divaState.viewerCore.getCurrentLayout().getPageDimensions(pageIndex);
	        };

	        // Returns the dimensions of a given page index at a given zoom level
	        this.getPageDimensionsAtZoomLevel = function (pageIdx, zoomLevel)
	        {
	            if (!checkLoaded())
	                return false;

	            if (zoomLevel > settings.maxZoomLevel)
	                zoomLevel = settings.maxZoomLevel;

	            var pg = settings.manifest.pages[parseInt(pageIdx, 10)];
	            var pgAtZoom = pg.d[parseInt(zoomLevel, 10)];
	            return {'width': pgAtZoom.w, 'height': pgAtZoom.h};
	        };

	        // Returns the dimensions of a given page at the current zoom level
	        // The current page index will be used if no pageIndex is specified
	        // Also works in Grid view
	        this.getPageDimensionsAtCurrentZoomLevel = function(pageIndex)
	        {
	            pageIndex = isPageValid(pageIndex) ? pageIndex : settings.currentPageIndex;

	            if (!isPageValid(pageIndex))
	                throw new Error('Invalid Page Index');

	            return divaState.viewerCore.getCurrentLayout().getPageDimensions(pageIndex);
	        };

	        // Returns the dimensions of the current page at the current zoom level
	        // Also works in Grid view
	        this.getCurrentPageDimensionsAtCurrentZoomLevel = function ()
	        {
	            return this.getPageDimensionsAtCurrentZoomLevel(settings.currentPageIndex);
	        };

	        this.isReady = function ()
	        {
	            return viewerState.loaded;
	        };

	        this.getCurrentPageIndex = function ()
	        {
	            return settings.currentPageIndex;
	        };

	        this.getCurrentPageFilename = function ()
	        {
	            return settings.manifest.pages[settings.currentPageIndex].f;
	        };

	        this.getCurrentPageNumber = function ()
	        {
	            console.warn("This method is deprecated. Consider using getCurrentPageIndex() instead.");
	            return settings.currentPageIndex + 1;
	        };

	        // Returns an array of all filenames in the document
	        this.getFilenames = function ()
	        {
	            var filenames = [];

	            for (var i = 0; i < settings.numPages; i++)
	            {
	                filenames[i] = settings.manifest.pages[i].f;
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

	            return settings.manifest.pages[pageIdx].m;
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
	            {
	                reloadViewer({
	                    inGrid: false
	                });
	            }

	            return divaState.viewerCore.zoom(zoomLevel);
	        };

	        this.getGridPagesPerRow = function ()
	        {
	            // TODO(wabain): Add test case
	            return this.pagesPerRow;
	        };

	        this.setGridPagesPerRow = function (newValue)
	        {
	            // TODO(wabain): Add test case
	            if (!divaState.viewerCore.isValidOption('pagesPerRow', newValue))
	                return false;

	            return reloadViewer({
	                inGrid: true,
	                pagesPerRow: newValue
	            });
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
	        this.isRegionInViewport = function (pageIndex, leftOffset, topOffset, width, height)
	        {
	            var layout = divaState.viewerCore.getCurrentLayout();

	            if (!layout)
	                return false;

	            var offset = layout.getPageOffset(pageIndex);

	            var top = offset.top + topOffset;
	            var left = offset.left + leftOffset;

	            return viewerState.viewport.intersectsRegion({
	                top: top,
	                bottom: top + height,
	                left: left,
	                right: left + width
	            });
	        };

	        //Public wrapper for isPageVisible
	        //Determines if a page is currently in the viewport
	        this.isPageInViewport = function (pageIndex)
	        {
	            return viewerState.renderer.isPageVisible(pageIndex);
	        };

	        //Public wrapper for isPageLoaded
	        //Determines if a page is currently in the DOM
	        this.isPageLoaded = function (pageIndex)
	        {
	            console.warn("This method is deprecated. Consider using isPageInViewport(pageIndex) instead.");
	            return this.isPageInViewport(pageIndex);
	        };

	        // Toggle fullscreen mode
	        this.toggleFullscreenMode = function ()
	        {
	            toggleFullscreen();
	        };

	        // Show/Hide non-paged pages
	        this.toggleNonPagedPagesVisibility = function ()
	        {
	            reloadViewer({ showNonPagedPages: !settings.showNonPagedPages });
	        };

	        // Show non-paged pages
	        this.showNonPagedPages = function ()
	        {
	            reloadViewer({ showNonPagedPages: true });
	        };

	        // Hide non-paged pages
	        this.hideNonPagedPages = function ()
	        {
	            reloadViewer({ showNonPagedPages: false });
	        };

	        // Close toolbar popups
	        this.closePopups = function ()
	        {
	            divaState.toolbar.closePopups();
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

	        this.isInFullscreen = function ()
	        {
	            return settings.inFullscreen;
	        };

	        // Change views. Takes 'document', 'book', or 'grid' to specify which view to switch into
	        this.changeView = function(destinationView)
	        {
	            return changeView(destinationView);
	        };

	        // Enter grid view if currently not in grid view
	        // Returns false if in grid view initially, true otherwise
	        this.enterGridView = function ()
	        {
	            if (!settings.inGrid)
	            {
	                changeView('grid');
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
	                reloadViewer({ inGrid: false });
	                return true;
	            }

	            return false;
	        };

	        // Jump to a page based on its filename
	        // Returns true if successful and false if the filename is invalid
	        this.gotoPageByName = function (filename, xAnchor, yAnchor)
	        {
	            var pageIndex = getPageIndex(filename);
	            return this.gotoPageByIndex(pageIndex, xAnchor, yAnchor);
	        };

	        this.gotoPageByLabel = function (label, xAnchor, yAnchor)
	        {
	            var pages = settings.manifest.pages;
	            for (var i = 0, len = pages.length; i < len; i++)
	            {
	                if (pages[i].l.toLowerCase().indexOf(label.toLowerCase()) > -1)
	                    return this.gotoPageByIndex(i, xAnchor, yAnchor);
	            }

	            // If no label was found, try to parse a page number
	            var pageIndex = parseInt(label, 10) - 1;
	            return this.gotoPageByIndex(pageIndex, xAnchor, yAnchor);
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

	        // Check if a page index is within the range of the document
	        this.isPageIndexValid = function (pageIndex)
	        {
	            return isPageValid(pageIndex);
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

	        // Align this diva instance with a state object (as returned by getState)
	        this.setState = function (state)
	        {
	            reloadViewer(getLoadOptionsForState(state));
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

	        // Re-enables document dragging, scrolling (by keyboard if set), and zooming by double-clicking
	        this.enableScrollable = function()
	        {
	            divaState.viewerCore.enableScrollable();
	        };

	        // Disables document dragging, scrolling (by keyboard if set), and zooming by double-clicking
	        this.disableScrollable = function ()
	        {
	            divaState.viewerCore.disableScrollable();
	        };

	        //Changes between horizontal layout and vertical layout. Returns true if document is now vertically oriented, false otherwise.
	        this.toggleOrientation = function ()
	        {
	            return toggleOrientation();
	        };

	        //Returns distance between the northwest corners of diva-inner and page index
	        this.getPageOffset = function(pageIndex, options)
	        {
	            var region = divaState.viewerCore.getPageRegion(pageIndex, options);

	            return {
	                top: region.top,
	                left: region.left
	            };
	        };

	        //shortcut to getPageOffset for current page
	        this.getCurrentPageOffset = function()
	        {
	            return this.getPageOffset(settings.currentPageIndex);
	        };

	        //Returns the page dimensions of given page at the current zoom level
	        this.getPageDimensionsAtCurrentGridLevel = function(pageIndex)
	        {
	            console.warn("This method is deprecated. Consider using getPageDimensionsAtCurrentZoomLevel(pageIndex) instead.");
	            return this.getPageDimensionsAtCurrentZoomLevel(pageIndex);
	        };

	        /*
	            Given a pageX and pageY value (as could be retreived from a jQuery event object),
	                returns either the page visible at that (x,y) position or -1 if no page is.
	        */
	        this.getPageIndexForPageXYValues = function(pageX, pageY)
	        {
	            //get the four edges of the outer element
	            var outerOffset = viewerState.outerElement.getBoundingClientRect();
	            var outerTop = outerOffset.top;
	            var outerLeft = outerOffset.left;
	            var outerBottom = outerOffset.bottom;
	            var outerRight = outerOffset.right;

	            //if the clicked position was outside the diva-outer object, it was not on a visible portion of a page
	            if (pageX < outerLeft || pageX > outerRight)
	                return -1;

	            if (pageY < outerTop || pageY > outerBottom)
	                return -1;

	            //navigate through all diva page objects
	            var pages = document.getElementsByClassName('diva-page');
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
	            return -1;
	        };

	        /**
	         * Returns a URL for the image of the page at the given index. The
	         * optional size parameter supports setting the image width or height
	         * (default is full-sized).
	         */
	        this.getPageImageURL = function (pageIndex, size)
	        {
	            return settings.manifest.getPageImageURL(pageIndex, size);
	        };

	        //Pretty self-explanatory.
	        this.isVerticallyOriented = function()
	        {
	            return settings.verticallyOriented;
	        };

	        this.changeObject = function(objectData)
	        {
	            viewerState.loaded = false;
	            divaState.viewerCore.clear();

	            if (viewerState.renderer)
	                viewerState.renderer.destroy();

	            viewerState.options.objectData = objectData;

	            if (typeof objectData === 'object')
	            {
	                setTimeout(function ()
	                {
	                    loadObjectData(objectData);
	                });

	                return;
	            }

	            viewerState.throbberTimeoutID = setTimeout(function ()
	            {
	                $(settings.selector + 'throbber').show();
	            }, settings.throbberTimeout);

	            $.ajax({
	                url: settings.objectData,
	                cache: true,
	                dataType: 'json',
	                error: ajaxError,
	                success: function (responseData)
	                {
	                    loadObjectData(responseData);
	                }
	            });
	        };

	        this.activate = function ()
	        {
	            viewerState.isActiveDiva = true;
	        };

	        this.deactivate = function ()
	        {
	            viewerState.isActiveDiva = false;
	        };

	        // Destroys this instance, tells plugins to do the same (for testing)
	        this.destroy = function ()
	        {
	            divaState.viewerCore.destroy();
	        };

	        // "Secretly" expose the page overlay API for the highlight plugin
	        this.__addPageOverlay = function (overlay)
	        {
	            divaState.viewerCore.addPageOverlay(overlay);
	        };

	        this.__removePageOverlay = function (overlay)
	        {
	            divaState.viewerCore.removePageOverlay(overlay);
	        };

	        /**** Page Alias Functions ****/
	        /*
	         Main function. Will return the first of these three that
	         resolves to boolean true:
	         -Explicit alias as defined in pageAliases
	         -Result of pageAliasFunction
	         -originalPageIndex + 1 (to simulate the original mapping)

	         Else the function will return false.
	         */
	        this.getAliasForPageIndex = function(originalPageIndex)
	        {
	            var pageIndex = parseInt(originalPageIndex, 10);
	            return settings.pageAliases[pageIndex] || settings.pageAliasFunction(pageIndex) || pageIndex + 1;
	        };

	        /*
	         Returns the first page index found for a given aliased number or false if not found.
	         This may cause issues if a specific alias is found for multiple page indices; use getPageIndicesForAlias and reimplement functions as necessary if this is the case.
	         */
	        this.getPageIndexForAlias = function(aliasedNumber)
	        {
	            for(var idx = 0; idx < settings.numPages; idx++)
	            {
	                if(this.getAliasForPageIndex(idx) === aliasedNumber)
	                {
	                    return idx;
	                }
	            }
	            return false;
	        };

	        //Returns array of page indices for a given aliased number. Returns an empty array if none are found.
	        this.getPageIndicesForAlias = function(aliasedNumber)
	        {
	            var indexArr = [];
	            for(var idx = 0; idx < settings.numPages; idx++)
	            {
	                if(this.getAliasForPageIndex(idx) === aliasedNumber)
	                {
	                    indexArr.push(idx);
	                }
	            }
	            return indexArr;
	        };


	        //Maps the current page index to getAliasForPageIndex
	        this.getCurrentAliasedPageIndex = function()
	        {
	            return this.getAliasForPageIndex(settings.currentPageIndex);
	        };

	        //Wrapper for gotoPageByIndex, keeping the aliased numbers in mind
	        this.gotoPageByAliasedNumber = function(aliasedNumber, xAnchor, yAnchor)
	        {
	            return this.gotoPageByIndex(this.getPageIndexForAlias(aliasedNumber), xAnchor, yAnchor);
	        };

	        // Call the init function when this object is created.
	        init();
	    };

	    $.fn.diva = function (options)
	    {
	        return this.each(function ()
	        {
	            var divaParent = $(this);

	            // Return early if this element already has a plugin instance
	            if (divaParent.data('diva'))
	                return;

	            // Throw an error if the element is not in the DOM, since it causes some problems
	            if (!document.body.contains(this))
	                throw new Error('Diva could not be initialized because this element is not attached to the DOM');

	            // Otherwise, instantiate the document viewer
	            var diva = new Diva(this, options);
	            divaParent.data('diva', diva);
	        });
	    };
	})(jQuery);


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = elt;
	module.exports.setAttributes = setDOMAttributes;

	/**
	 * Convenience function to create a DOM element, set attributes on it, and
	 * append children. All arguments which are not of primitive type, are not
	 * arrays, and are not DOM nodes are treated as attribute hashes and are
	 * handled as described for setDOMAttributes. Children can either be a DOM
	 * node or a primitive value, which is converted to a text node. Arrays are
	 * handled recursively. Null and undefined values are ignored.
	 *
	 * Inspired by the ProseMirror helper of the same name.
	 */
	function elt(tag)
	{
	    var el = document.createElement(tag);
	    var args = Array.prototype.slice.call(arguments, 1);

	    while (args.length)
	    {
	        var arg = args.shift();
	        handleEltConstructorArg(el, arg);
	    }

	    return el;
	}

	function handleEltConstructorArg(el, arg)
	{
	    if (arg == null)
	        return;

	    if (typeof arg !== 'object' && typeof arg !== 'function')
	    {
	        // Coerce to string
	        el.appendChild(document.createTextNode(arg));
	    }
	    else if (arg instanceof window.Node)
	    {
	        el.appendChild(arg);
	    }
	    else if (arg instanceof Array)
	    {
	        var childCount = arg.length;
	        for (var i = 0; i < childCount; i++)
	            handleEltConstructorArg(el, arg[i]);
	    }
	    else
	    {
	        setDOMAttributes(el, arg);
	    }
	}

	/**
	 * Set attributes of a DOM element. The `style` property is special-cased to
	 * accept either a string or an object whose own attributes are assigned to
	 * el.style.
	 */
	function setDOMAttributes(el, attributes)
	{
	    for (var prop in attributes)
	    {
	        if (!attributes.hasOwnProperty(prop))
	            continue;

	        if (prop === 'style')
	        {
	            setStyle(el, attributes.style);
	        }
	        else
	        {
	            el.setAttribute(prop, attributes[prop]);
	        }
	    }
	}

	function setStyle(el, style)
	{
	    if (!style)
	        return;

	    if (typeof style !== 'object')
	    {
	        el.style.cssText = style;
	        return;
	    }

	    for (var cssProp in style)
	    {
	        if (!style.hasOwnProperty(cssProp))
	            continue;

	        el.style[cssProp] = style[cssProp];
	    }
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports.get = getHashParam;
	module.exports.update = updateHashParam;

	// For getting the #key values from the URL. For specifying a page and zoom level
	// Look into caching, because we only need to get this during the initial load
	// Although for the tests I guess we would need to override caching somehow
	function getHashParam(key) {
	    var hash = window.location.hash;
	    if (hash !== '') {
	        // Check if there is something that looks like either &key= or #key=
	        var startIndex = (hash.indexOf('&' + key + '=') > 0) ? hash.indexOf('&' + key + '=') : hash.indexOf('#' + key + '=');

	        // If startIndex is still -1, it means it can't find either
	        if (startIndex >= 0) {
	            // Add the length of the key plus the & and =
	            startIndex += key.length + 2;

	            // Either to the next ampersand or to the end of the string
	            var endIndex = hash.indexOf('&', startIndex);
	            if (endIndex > startIndex) {
	                return decodeURIComponent(hash.substring(startIndex, endIndex));
	            } else if (endIndex < 0) {
	                // This means this hash param is the last one
	                return decodeURIComponent(hash.substring(startIndex));
	            }
	            // If the key doesn't have a value I think
	            return '';
	        } else {
	            // If it can't find the key
	            return false;
	        }
	    } else {
	        // If there are no hash params just return false
	        return false;
	    }
	}

	function updateHashParam(key, value) {
	    // First make sure that we have to do any work at all
	    var originalValue = getHashParam(key);
	    var hash = window.location.hash;
	    if (originalValue !== value) {
	        // Is the key already in the URL?
	        if (typeof originalValue == 'string') {
	            // Already in the URL. Just get rid of the original value
	            var startIndex = (hash.indexOf('&' + key + '=') > 0) ? hash.indexOf('&' + key + '=') : hash.indexOf('#' + key + '=');
	            var endIndex = startIndex + key.length + 2 + originalValue.length;
	            // # if it's the first, & otherwise
	            var startThing = (startIndex === 0) ? '#' : '&';
	            window.location.replace(hash.substring(0, startIndex) + startThing + key + '=' + value + hash.substring(endIndex));
	        } else {
	            // It's not present - add it
	            if (hash.length === 0) {
	                window.location.replace('#' + key + '=' + value);
	            } else {
	                // Append it
	                window.location.replace(hash + '&' + key + '=' + value);
	            }
	        }
	    }
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var jQuery = __webpack_require__(3);

	//Used to keep track of whether Diva was last clicked or which Diva was last clicked when there are multiple
	var ActiveDivaController = (function ($)
	{
	    return function ()
	    {
	        var active;

	        //global click listener
	        $(document).on('click', function(e)
	        {
	            updateActive($(e.target));
	        });

	        //parameter should already be a jQuery selector
	        var updateActive = function (target)
	        {
	            var nearestOuter;

	            //these will find 0 or 1 objects, never more
	            var findOuter = target.find('.diva-outer');
	            var closestOuter = target.closest('.diva-outer');
	            var outers = document.getElementsByClassName('diva-outer');
	            var outerLen = outers.length;
	            var idx;

	            //clicked on something that was not either a parent or sibling of a diva-outer
	            if (findOuter.length > 0)
	            {
	                nearestOuter = findOuter;
	            }
	            //clicked on something that was a child of a diva-outer
	            else if (closestOuter.length > 0)
	            {
	                nearestOuter = closestOuter;
	            }
	            //clicked on something that was not in any Diva tree
	            else
	            {
	                //deactivate everything and return
	                for (idx = 0; idx < outerLen; idx++)
	                {
	                    $(outers[idx].parentElement.parentElement).data('diva').deactivate();
	                }
	                return;
	            }

	            //if we found one, activate it...
	            nearestOuter.parent().parent().data('diva').activate();
	            active = nearestOuter.parent();

	            //...and deactivate all the others
	            outers = document.getElementsByClassName('diva-outer');
	            for(idx = 0; idx < outerLen; idx++)
	            {
	                //getAttribute to attr - comparing DOM element to jQuery element
	                if (outers[idx].getAttribute('id') != nearestOuter.attr('id'))
	                    $(outers[idx].parentElement.parentElement).data('diva').deactivate();
	            }
	        };

	        //public accessor in case. Will return a jQuery selector.
	        this.getActive = function()
	        {
	            return active;
	        };
	    };
	})(jQuery);

	module.exports = ActiveDivaController;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint unused: true */

	var parseIIIFManifest = __webpack_require__(12);

	module.exports = ImageManifest;

	function ImageManifest(data, urlAdapter)
	{
	    // Save all the data we need
	    this.pages = data.pgs;
	    this.maxZoom = data.max_zoom;
	    this.maxRatio = data.dims.max_ratio;
	    this.minRatio = data.dims.min_ratio;
	    this.itemTitle = data.item_title;

	    // Only given for IIIF manifests
	    this.paged = !!data.paged;

	    // These are arrays, the index corresponding to the zoom level
	    this._maxWidths = data.dims.max_w;
	    this._maxHeights = data.dims.max_h;
	    this._averageWidths = data.dims.a_wid;
	    this._averageHeights = data.dims.a_hei;
	    this._totalHeights = data.dims.t_hei;
	    this._totalWidths = data.dims.t_wid;

	    this._urlAdapter = urlAdapter;
	}

	ImageManifest.fromIIIF = function (iiifManifest)
	{
	    var data = parseIIIFManifest(iiifManifest);
	    return new ImageManifest(data, new IIIFSourceAdapter());
	};

	ImageManifest.fromLegacyManifest = function (data, config)
	{
	    // For IIP manifests, use the page number (indexed starting from 1) as a label for each page
	    for (var i = 0, len = data.pgs.length; i < len; i++)
	        data.pgs[i].l = (i + 1).toString();

	    return new ImageManifest(data, new LegacyManifestSourceAdapter(config));
	};

	ImageManifest.prototype.isPageValid = function (pageIndex, showNonPagedPages)
	{
	    if (!showNonPagedPages && this.paged && !this.pages[pageIndex].paged)
	        return false;

	    return pageIndex >= 0 && pageIndex < this.pages.length;
	};

	ImageManifest.prototype.getMaxPageDimensions = function (pageIndex)
	{
	    var maxDims = this.pages[pageIndex].d[this.maxZoom];

	    return {
	        height: maxDims.h,
	        width: maxDims.w
	    };
	};

	ImageManifest.prototype.getPageDimensionsAtZoomLevel = function (pageIndex, zoomLevel)
	{
	    var maxDims = this.pages[pageIndex].d[this.maxZoom];

	    var scaleRatio = getScaleRatio(this.maxZoom, zoomLevel);

	    return {
	        height: maxDims.h * scaleRatio,
	        width: maxDims.w * scaleRatio
	    };
	};

	/**
	 * Returns a URL for the image of the given page. The optional size
	 * parameter supports setting the image width or height (default is
	 * full-sized).
	 */
	ImageManifest.prototype.getPageImageURL = function (pageIndex, size)
	{
	    return this._urlAdapter.getPageImageURL(this, pageIndex, size);
	};

	/**
	 * Return an array of tile objects for the specified page and integer zoom level
	 */
	ImageManifest.prototype.getPageImageTiles = function (pageIndex, zoomLevel, tileDimensions)
	{
	    var page = this.pages[pageIndex];

	    if (!isFinite(zoomLevel) || zoomLevel % 1 !== 0)
	        throw new TypeError('Zoom level must be an integer: ' + zoomLevel);

	    var rows = Math.ceil(page.d[zoomLevel].h / tileDimensions.height);
	    var cols = Math.ceil(page.d[zoomLevel].w / tileDimensions.width);

	    var tiles = [];

	    var row, col, url;

	    for (row = 0; row < rows; row++)
	    {
	        for (col = 0; col < cols; col++)
	        {
	            url = this._urlAdapter.getTileImageURL(this, pageIndex, {
	                row: row,
	                col: col,
	                rowCount: rows,
	                colCount: cols,
	                zoomLevel: zoomLevel,
	                tileDimensions: tileDimensions
	            });

	            // FIXME: Dimensions should account for partial tiles (e.g. the
	            // last row and column in a tiled image)
	            tiles.push({
	                row: row,
	                col: col,
	                zoomLevel: zoomLevel,
	                dimensions: {
	                    height: tileDimensions.height,
	                    width: tileDimensions.width
	                },
	                offset: {
	                    top: row * tileDimensions.height,
	                    left: col * tileDimensions.width
	                },
	                url: url
	            });
	        }
	    }

	    return {
	        zoomLevel: zoomLevel,
	        rows: rows,
	        cols: cols,
	        tiles: tiles
	    };
	};

	ImageManifest.prototype.getMaxWidth = zoomedPropertyGetter('_maxWidths');
	ImageManifest.prototype.getMaxHeight = zoomedPropertyGetter('_maxHeights');
	ImageManifest.prototype.getAverageWidth = zoomedPropertyGetter('_averageWidths');
	ImageManifest.prototype.getAverageHeight = zoomedPropertyGetter('_averageHeights');
	ImageManifest.prototype.getTotalWidth = zoomedPropertyGetter('_totalWidths');
	ImageManifest.prototype.getTotalHeight = zoomedPropertyGetter('_totalHeights');

	function zoomedPropertyGetter(privateName)
	{
	    return function (zoomLevel)
	    {
	        return this[privateName][zoomLevel];
	    };
	}

	function getScaleRatio(sourceZoomLevel, targetZoomLevel)
	{
	    return 1 / Math.pow(2, sourceZoomLevel - targetZoomLevel);
	}

	function IIIFSourceAdapter()
	{
	    // No-op
	}

	IIIFSourceAdapter.prototype.getPageImageURL = function (manifest, pageIndex, size)
	{
	    var dimens;

	    if (!size || (size.width == null && size.height == null))
	        dimens = 'full';
	    else
	        dimens = (size.width == null ? '' : size.width) + ',' + (size.height == null ? '' : size.height);

	    var page = manifest.pages[pageIndex];
	    var quality = (page.api > 1.1) ? 'default' : 'native';

	    return encodeURI(page.url + 'full/' + dimens + '/0/' + quality + '.jpg');
	};

	IIIFSourceAdapter.prototype.getTileImageURL = function (manifest, pageIndex, params)
	{
	    var page = manifest.pages[pageIndex];

	    var height, width;

	    if (params.row === params.rowCount - 1)
	        height = page.d[params.zoomLevel].h - (params.rowCount - 1) * params.tileDimensions.height;
	    else
	        height = params.tileDimensions.height;

	    if (params.col === params.colCount - 1)
	        width = page.d[params.zoomLevel].w - (params.colCount - 1) * params.tileDimensions.width;
	    else
	        width = params.tileDimensions.width;

	    var zoomDifference = Math.pow(2, manifest.maxZoom - params.zoomLevel);

	    var x = params.col * params.tileDimensions.width * zoomDifference;
	    var y = params.row * params.tileDimensions.height * zoomDifference;

	    if (page.hasOwnProperty('xoffset'))
	    {
	        x += page.xoffset;
	        y += page.yoffset;
	    }

	    var region = [x, y, width * zoomDifference, height * zoomDifference].join(',');

	    var quality = (page.api > 1.1) ? 'default' : 'native';

	    return encodeURI(page.url + region + '/' + width + ',' + height + '/0/' + quality + '.jpg');
	};

	function LegacyManifestSourceAdapter(config)
	{
	    this._config = config;
	}

	LegacyManifestSourceAdapter.prototype.getPageImageURL = function (manifest, pageIndex, size)
	{
	    // Without width or height specified, IIPImage defaults to full-size
	    var dimens = '';

	    if (size)
	    {
	        if (size.width != null)
	            dimens += '&WID=' + size.width;

	        if (size.height != null)
	            dimens += '&HEI=' + size.height;
	    }

	    var filename = manifest.pages[pageIndex].f;

	    return this._config.iipServerURL + "?FIF=" + this._config.imageDir + '/' + filename + dimens + '&CVT=JPEG';
	};

	LegacyManifestSourceAdapter.prototype.getTileImageURL = function (manifest, pageIndex, params)
	{
	    var page = manifest.pages[pageIndex];
	    var requestedZoomLevel = params.zoomLevel + page.m - manifest.maxZoom;
	    var index = (params.row * params.colCount) + params.col;
	    var jtl = requestedZoomLevel + ',' + index;

	    return encodeURI(this._config.iipServerURL + "?FIF=" + this._config.imageDir + '/' + page.f + '&JTL=' + jtl + '&CVT=JPEG');
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	/* jshint unused: true */
	/* jshint -W097 */
	"use strict";

	module.exports = parseIIIFManifest;

	var getMaxZoomLevel = function (width, height)
	{
	    var largestDimension = Math.max(width, height);
	    return Math.ceil(Math.log((largestDimension + 1) / (256 + 1)) / Math.log(2));
	};

	var incorporateZoom = function (imageDimension, zoomDifference)
	{
	    return imageDimension / (Math.pow(2, zoomDifference));
	};

	var getOtherImageData = function(otherImages, lowestMaxZoom, canvasWidth, canvasHeight)
	{
	    return otherImages.map(
	        function (itm)
	        {
	            var w = itm.width || canvasWidth;
	            var h = itm.height || canvasHeight;

	            var dims = new Array(lowestMaxZoom + 1);
	            for (var j = 0; j < lowestMaxZoom + 1; j++)
	            {
	                dims[j] = {
	                    h: Math.floor(incorporateZoom(h, lowestMaxZoom - j)),
	                    w: Math.floor(incorporateZoom(w, lowestMaxZoom - j))
	                };
	            }
	            return {
	                label: itm.label || "",
	                dims: dims
	            };
	        }
	    );
	};

	/**
	 * Parses a IIIF Presentation API Manifest and converts it into a Diva.js-format object
	 * (See https://github.com/DDMAL/diva.js/wiki/Development-notes#data-received-through-ajax-request)
	 * (This is a client-side re-implementation of generate_json.py)
	 *
	 * @param {Object} manifest - an object that represents a valid IIIF manifest
	 * @returns {Object} divaServiceBlock - the data needed by Diva to show a view of a single document
	 */
	function parseIIIFManifest(manifest)
	{
	    var sequence = manifest.sequences[0];
	    var canvases = sequence.canvases;
	    var numCanvases = canvases.length;

	    var pages = new Array(canvases.length);

	    var thisCanvas, thisResource, thisImage, otherImages, context, url, info, imageAPIVersion,
	        width, height, maxZoom, canvas, label, imageLabel, zoomDimensions, widthAtCurrentZoomLevel,
	        heightAtCurrentZoomLevel;

	    var lowestMaxZoom = 100;
	    var maxRatio = 0;
	    var minRatio = 100;

	    // quickly determine the lowest possible max zoom level (i.e., the upper bound for images) across all canvases.
	    // while we're here, compute the global ratios as well.
	    for (var z = 0; z < numCanvases; z++)
	    {
	        var c = canvases[z];

	        // if this canvas has an empty width or height, don't factor that into our calculations.
	        if (c.width === 0 || c.height === 0)
	        {
	            continue;
	        }

	        var w = c.width;
	        var h = c.height;
	        var mz = getMaxZoomLevel(w, h);
	        var ratio = w / h;
	        maxRatio = Math.max(ratio, maxRatio);
	        minRatio = Math.min(ratio, minRatio);

	        lowestMaxZoom = Math.min(lowestMaxZoom, mz);
	    }

	    // Uint8Arrays are pre-initialized with zeroes.
	    var totalWidths = new Array(lowestMaxZoom + 1).fill(0);
	    var totalHeights = new Array(lowestMaxZoom + 1).fill(0);
	    var maxWidths = new Array(lowestMaxZoom + 1).fill(0);
	    var maxHeights = new Array(lowestMaxZoom + 1).fill(0);

	    for (var i = 0; i < numCanvases; i++)
	    {
	        thisCanvas = canvases[i];
	        canvas = thisCanvas['@id'];

	        if (!thisCanvas.images || thisCanvas.images.length === 0)
	        {
	            console.warn("An empty canvas was found: " + canvas);
	            continue;
	        }

	        label = thisCanvas.label;
	        thisResource = thisCanvas.images[0].resource;

	        /*
	         * If a canvas has multiple images it will be encoded
	         * with a resource type of "oa:Choice". The primary image will be available
	         * on the 'default' key, with other images available under 'item.'
	         * */
	        if (thisResource['@type'] === "oa:Choice")
	        {
	            thisImage = thisResource.default;
	        }
	        else
	        {
	            thisImage = thisResource;
	        }

	        // Prioritize the canvas height / width first, since images may not have h/w
	        width = thisCanvas.width || thisImage.width;
	        height = thisCanvas.height || thisImage.height;
	        maxZoom = getMaxZoomLevel(width, height);

	        if (thisResource.item)
	        {
	            otherImages = getOtherImageData(thisResource.item, lowestMaxZoom, width, height);
	        }

	        imageLabel = thisImage.label || null;

	        info = parseImageInfo(thisImage);
	        url = info.url.slice(-1) !== '/' ? info.url + '/' : info.url;  // append trailing slash to url if it's not there.

	        context = thisImage.service['@context'];

	        if (context === 'http://iiif.io/api/image/2/context.json')
	        {
	            imageAPIVersion = 2;
	        }
	        else if (context === 'http://library.stanford.edu/iiif/image-api/1.1/context.json')
	        {
	            imageAPIVersion = 1.1;
	        }
	        else
	        {
	            imageAPIVersion = 1.0;
	        }

	        zoomDimensions = new Array(lowestMaxZoom + 1);

	        for (var k = 0; k < lowestMaxZoom + 1; k++)
	        {
	            widthAtCurrentZoomLevel = Math.floor(incorporateZoom(width, lowestMaxZoom - k));
	            heightAtCurrentZoomLevel = Math.floor(incorporateZoom(height, lowestMaxZoom - k));
	            zoomDimensions[k] = {
	                h: heightAtCurrentZoomLevel,
	                w: widthAtCurrentZoomLevel
	            };

	            var currentTotalWidths = totalWidths[k] + widthAtCurrentZoomLevel;
	            var currentTotalHeights = totalHeights[k] + heightAtCurrentZoomLevel;

	            totalWidths[k] = currentTotalWidths;
	            totalHeights[k] = currentTotalHeights;
	            maxWidths[k] = Math.max(widthAtCurrentZoomLevel, maxWidths[k]);
	            maxHeights[k] = Math.max(heightAtCurrentZoomLevel, maxHeights[k]);
	        }

	        pages[i] = {
	            d: zoomDimensions,
	            m: maxZoom,
	            l: label,         // canvas label ('page 1, page 2', etc.)
	            il: imageLabel,   // default image label ('primary image', 'UV light', etc.)
	            f: url,
	            url: url,
	            api: imageAPIVersion,
	            paged: thisCanvas.viewingHint !== 'non-paged',
	            facingPages: thisCanvas.viewingHint === 'facing-pages',
	            canvas: canvas,
	            otherImages: otherImages,
	            xoffset: info.x || null,
	            yoffset: info.y || null
	        };
	    }

	    var averageWidths = new Array(lowestMaxZoom + 1).fill(0);
	    var averageHeights = new Array(lowestMaxZoom + 1).fill(0);

	    for (var a = 0; a < lowestMaxZoom + 1; a++)
	    {
	        averageWidths[a] = totalWidths[a] / numCanvases;
	        averageHeights[a] = totalHeights[a] / numCanvases;
	    }

	    var dims = {
	        a_wid: averageWidths,
	        a_hei: averageHeights,
	        max_w: maxWidths,
	        max_h: maxHeights,
	        max_ratio: maxRatio,
	        min_ratio: minRatio,
	        t_hei: totalHeights,
	        t_wid: totalWidths
	    };

	    return {
	        item_title: manifest.label,
	        dims: dims,
	        max_zoom: lowestMaxZoom,
	        pgs: pages,
	        pages: manifest.viewingHint === 'paged' || sequence.viewingHint === 'paged'
	    };
	}

	/**
	 * Takes in a resource block from a canvas and outputs the following information associated with that resource:
	 * - Image URL
	 * - Image region to be displayed
	 *
	 * @param {Object} resource - an object representing the resource block of a canvas section in a IIIF manifest
	 * @returns {Object} imageInfo - an object containing image URL and region
	 */
	function parseImageInfo(resource)
	{
	    var url = resource['@id'];
	    var fragmentRegex = /#xywh=([0-9]+,[0-9]+,[0-9]+,[0-9]+)/;
	    var xywh = '';
	    var stripURL = true;

	    if (/\/([0-9]+,[0-9]+,[0-9]+,[0-9]+)\//.test(url))
	    {
	        // if resource in image API format, extract region x,y,w,h from URL (after 4th slash from last)
	        // matches coordinates in URLs of the form http://www.example.org/iiif/book1-page1/40,50,1200,1800/full/0/default.jpg
	        var urlArray = url.split('/');
	        xywh = urlArray[urlArray.length - 4];
	    }
	    else if (fragmentRegex.test(url))
	    {
	        // matches coordinates of the style http://www.example.org/iiif/book1/canvas/p1#xywh=50,50,320,240
	        var result = fragmentRegex.exec(url);
	        xywh = result[1];
	    }
	    else if (resource.service && resource.service['@id'])
	    {
	        // assume canvas size based on image size
	        url = resource.service['@id'];
	        // this URL excludes region parameters so we don't need to remove them
	        stripURL = false;
	    }

	    if (stripURL)
	    {
	        // extract URL up to identifier (we eliminate the last 5 parameters: /region/size/rotation/quality.format)
	        url = url.split('/').slice(0, -4).join('/');
	    }

	    var imageInfo = {
	        url: url
	    };

	    if (xywh.length)
	    {
	        // parse into separate components
	        var dimensions = xywh.split(',');
	        imageInfo.x = parseInt(dimensions[0], 10);
	        imageInfo.y = parseInt(dimensions[1], 10);
	        imageInfo.w = parseInt(dimensions[2], 10);
	        imageInfo.h = parseInt(dimensions[3], 10);
	    }

	    return imageInfo;
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(3);

	var diva = __webpack_require__(2);
	var elt = __webpack_require__(8);

	module.exports = createToolbar;

	function createToolbar(viewer)
	{
	    var settings = viewer.getSettings();

	    // FIXME(wabain): Temporarily copied from within Diva
	    var elemAttrs = function (ident, base)
	    {
	        var attrs = {
	            id: settings.ID + ident,
	            class: 'diva-' + ident
	        };

	        if (base)
	            return $.extend(attrs, base);
	        else
	            return attrs;
	    };

	    /** Convenience function to subscribe to a Diva event */
	    var subscribe = function (event, callback)
	    {
	        diva.Events.subscribe(event, callback, settings.ID);
	    };

	    // Creates a toolbar button
	    var createButtonElement = function(name, label, callback)
	    {
	        var button = elt('button', {
	            type: 'button',
	            id: settings.ID + name,
	            class: 'diva-' + name + ' diva-button',
	            title: label
	        });

	        if (callback)
	            button.addEventListener('click', callback, false);

	        return button;
	    };

	    // Higher-level function for creators of zoom and grid controls
	    var getResolutionControlCreator = function (config)
	    {
	        return function ()
	        {
	            var controls;

	            switch (settings[config.controllerSetting])
	            {
	                case 'slider':
	                    controls = config.createSlider();
	                    break;

	                case 'buttons':
	                    controls = config.createButtons();
	                    break;

	                default:
	                    // Don't display anything
	                    return null;
	            }

	            var wrapper = elt('span',
	                controls,
	                config.createLabel()
	            );

	            var updateWrapper = function ()
	            {
	                if (settings.inGrid === config.showInGrid)
	                    wrapper.style.display = 'inline';
	                else
	                    wrapper.style.display = 'none';
	            };

	            subscribe('ViewDidSwitch', updateWrapper);
	            subscribe('ObjectDidLoad', updateWrapper);

	            // Set initial value
	            updateWrapper();

	            return wrapper;
	        };
	    };

	    // Zoom controls
	    var createZoomControls = getResolutionControlCreator({
	        controllerSetting: 'enableZoomControls',
	        showInGrid: false,

	        createSlider: function ()
	        {
	            var elem = createSlider('zoom-slider', {
	                step: 0.1,
	                value: settings.zoomLevel,
	                min: settings.minZoomLevel,
	                max: settings.maxZoomLevel
	            });
	            var $elem = $(elem);

	            $elem.on('input', function()
	            {
	                var floatValue = parseFloat(this.value);
	                viewer.setZoomLevel(floatValue);
	            });

	            $elem.on('change', function ()
	            {
	                var floatValue = parseFloat(this.value);
	                if (floatValue !== settings.zoomLevel)
	                    viewer.setZoomLevel(floatValue);
	            });

	            var updateSlider = function ()
	            {
	                if (settings.zoomLevel !== $elem.val())
	                    $elem.val(settings.zoomLevel);
	            };

	            subscribe('ZoomLevelDidChange', updateSlider);
	            subscribe('ViewerDidLoad', function ()
	            {
	                elt.setAttributes(elem, {
	                    min: settings.minZoomLevel,
	                    max: settings.maxZoomLevel
	                });

	                updateSlider();
	            });

	            return elem;
	        },

	        createButtons: function ()
	        {
	            return elt('span',
	                createButtonElement('zoom-out-button', 'Zoom Out', function ()
	                {
	                    viewer.setZoomLevel(settings.zoomLevel - 1);
	                }),
	                createButtonElement('zoom-in-button', 'Zoom In', function ()
	                {
	                    viewer.setZoomLevel(settings.zoomLevel + 1);
	                })
	            );
	        },

	        createLabel: function ()
	        {
	            var elem = createLabel('diva-zoom-label', 'zoom-label', 'Zoom level: ', 'zoom-level', settings.zoomLevel);
	            var textSpan = $(elem).find(settings.selector + 'zoom-level')[0];

	            var updateText = function ()
	            {
	                textSpan.textContent = settings.zoomLevel.toFixed(2);
	            };

	            subscribe('ZoomLevelDidChange', updateText);
	            subscribe('ViewerDidLoad', updateText);

	            return elem;
	        }
	    });

	    // Grid controls
	    var createGridControls = getResolutionControlCreator({
	        controllerSetting: 'enableGridControls',
	        showInGrid: true,

	        createSlider: function ()
	        {
	            var elem = createSlider('grid-slider', {
	                value: settings.pagesPerRow,
	                min: settings.minPagesPerRow,
	                max: settings.maxPagesPerRow
	            });
	            var $elem = $(elem);

	            $elem.on('input', function()
	            {
	                var intValue = parseInt(elem.value, 10);
	                viewer.setGridPagesPerRow(intValue);
	            });

	            $elem.on('change', function ()
	            {
	                var intValue = parseInt(elem.value, 10);
	                if (intValue !== settings.pagesPerRow)
	                    viewer.setGridPagesPerRow(intValue);
	            });

	            subscribe('GridRowNumberDidChange', function ()
	            {
	                // Update the position of the handle within the slider
	                if (settings.pagesPerRow !== $elem.val())
	                    $elem.val(settings.pagesPerRow);
	            });

	            return elem;
	        },

	        createButtons: function ()
	        {
	            return elt('span',
	                createButtonElement('grid-out-button', 'Zoom Out', function ()
	                {
	                    viewer.setGridPagesPerRow(settings.pagesPerRow - 1);
	                }),
	                createButtonElement('grid-in-button', 'Zoom In', function ()
	                {
	                    viewer.setGridPagesPerRow(settings.pagesPerRow + 1);
	                })
	            );
	        },

	        createLabel: function ()
	        {
	            var elem = createLabel('diva-grid-label', 'grid-label', 'Pages per row: ', 'pages-per-row', settings.pagesPerRow);
	            var textSpan = $(elem).find(settings.selector + 'pages-per-row')[0];

	            subscribe('GridRowNumberDidChange', function ()
	            {
	                textSpan.textContent = settings.pagesPerRow;
	            });

	            return elem;
	        }
	    });

	    var createViewMenu = function()
	    {
	        var viewOptionsList = elt('div', elemAttrs('view-options'));

	        var changeViewButton = createButtonElement('view-icon', 'Change view', function ()
	        {
	            $(viewOptionsList).toggle();
	        });

	        $(document).mouseup(function (event)
	        {
	            var container = $(viewOptionsList);

	            if (!container.is(event.target) && container.has(event.target).length === 0 && event.target.id !== settings.ID + 'view-icon')
	            {
	                container.hide();
	            }
	        });

	        var selectView = function (view)
	        {
	            viewer.changeView(view);

	            //hide view menu
	            $(viewOptionsList).hide();
	        };

	        var updateViewMenu = function()
	        {
	            var viewIconClasses = ' diva-view-icon diva-button';

	            // display the icon of the mode we're currently in (?)
	            if (settings.inGrid)
	            {
	                changeViewButton.className = 'diva-grid-icon' + viewIconClasses;
	            }
	            else if (settings.inBookLayout)
	            {
	                changeViewButton.className = 'diva-book-icon' + viewIconClasses;
	            }
	            else
	            {
	                changeViewButton.className = 'diva-document-icon' + viewIconClasses;
	            }

	            var viewOptions = document.createDocumentFragment();

	            // then display document, book, and grid buttons in that order, excluding the current view
	            if (settings.inGrid || settings.inBookLayout)
	                viewOptions.appendChild(createButtonElement('document-icon', 'Document View', selectView.bind(null, 'document')));

	            if (settings.inGrid || !settings.inBookLayout)
	                viewOptions.appendChild(createButtonElement('book-icon', 'Book View', selectView.bind(null, 'book')));

	            if (!settings.inGrid)
	                viewOptions.appendChild(createButtonElement('grid-icon', 'Grid View', selectView.bind(null, 'grid')));

	            // remove old menu
	            while (viewOptionsList.firstChild)
	            {
	                viewOptionsList.removeChild(viewOptionsList.firstChild);
	            }

	            // insert new menu
	            viewOptionsList.appendChild(viewOptions);
	        };

	        subscribe('ViewDidSwitch', updateViewMenu);
	        subscribe('ObjectDidLoad', updateViewMenu);

	        return elt('div', elemAttrs('view-menu'),
	            changeViewButton,
	            viewOptionsList
	        );
	    };

	    var createSlider = function(name, options)
	    {
	        return elt('input', options, {
	            id: settings.ID + name,
	            class: 'diva-' + name + ' diva-slider',
	            type: 'range'
	        });
	    };

	    var createLabel = function(name, id, label, innerName, innerValue)
	    {
	        return elt('div', {
	                id: settings.ID + id,
	                class: name + ' diva-label'
	            },
	            [
	                label,
	                elt('span', {
	                    id: settings.ID + innerName
	                }, innerValue)
	            ]);
	    };

	    var createPageNavigationControls = function ()
	    {
	        // Go to page form
	        var gotoForm = settings.enableGotoPage ? createGotoPageForm() : null;

	        return elt('span', elemAttrs('page-nav'),
	            createPageLabel(), // 'Page x of y' label
	            gotoForm
	        );
	    };

	    var createGotoPageForm = function ()
	    {
	        var gotoPageInput = elt('input', {
	            id: settings.ID + 'goto-page-input',
	            class: 'diva-input diva-goto-page-input',
	            autocomplete: 'off',
	            type: 'text'
	        });

	        var gotoPageSubmit = elt('input', {
	            id: settings.ID + 'goto-page-submit',
	            class: 'diva-button diva-button-text',
	            type: 'submit',
	            value: 'Go'
	        });

	        var inputSuggestions = elt('div', {
	                id: settings.ID + 'input-suggestions',
	                class: 'diva-input-suggestions'
	            }
	        );

	        var gotoForm = elt('form', {
	                id: settings.ID + 'goto-page',
	                class: 'diva-goto-form'
	            },
	            gotoPageInput,
	            gotoPageSubmit,
	            inputSuggestions
	        );

	        $(gotoForm).on('submit', function ()
	        {
	            var desiredPageLabel = gotoPageInput.value;

	            if (settings.onGotoSubmit && typeof settings.onGotoSubmit === "function")
	            {
	                var pageIndex = settings.onGotoSubmit(desiredPageLabel);
	                if (!viewer.gotoPageByIndex(pageIndex))
	                    alert("No page could be found with that label or page number");

	            }
	            else // Default if no function is specified in the settings
	            {
	                if (!viewer.gotoPageByLabel(desiredPageLabel))
	                    alert("No page could be found with that label or page number");
	            }

	            // Hide the suggestions
	            inputSuggestions.style.display = 'none';

	            // Prevent the default action of reloading the page
	            return false;
	        });

	        $(gotoPageInput).on('input focus', function ()
	        {
	            inputSuggestions.innerHTML = ''; // Remove all previous suggestions

	            var value = gotoPageInput.value;
	            var numSuggestions = 0;
	            if (settings.enableGotoSuggestions && value)
	            {
	                var pages = settings.manifest.pages;
	                for (var i = 0, len = pages.length; i < len && numSuggestions < 10; i++)
	                {
	                    if (pages[i].l.toLowerCase().indexOf(value.toLowerCase()) > -1)
	                    {
	                        var newInputSuggestion = elt('div', {
	                                class: 'diva-input-suggestion'
	                            },
	                            pages[i].l
	                        );

	                        inputSuggestions.appendChild(newInputSuggestion);

	                        numSuggestions++;
	                    }
	                }

	                // Show label suggestions
	                if (numSuggestions > 0)
	                    inputSuggestions.style.display = 'block';
	            }
	            else
	                inputSuggestions.style.display = 'none';
	        });

	        $(gotoPageInput).on('keydown', function (e)
	        {
	            var el;
	            if (e.keyCode === 13) // 'Enter' key
	            {
	                var active = $('.active', inputSuggestions);
	                if (active.length)
	                    gotoPageInput.value = active.text();

	            }
	            if (e.keyCode === 38) // Up arrow key
	            {
	                el = $('.active', inputSuggestions);
	                var prevEl = el.prev();
	                if (prevEl.length)
	                {
	                    el.removeClass('active');
	                    prevEl.addClass('active');
	                }
	                else
	                {
	                    el.removeClass('active');
	                    $('.diva-input-suggestion:last', inputSuggestions).addClass('active');
	                }
	            }
	            else if (e.keyCode === 40) // Down arrow key
	            {
	                el = $('.active', inputSuggestions);
	                var nextEl = el.next();
	                if (nextEl.length)
	                {
	                    el.removeClass('active');
	                    nextEl.addClass('active');
	                }
	                else
	                {
	                    el.removeClass('active');
	                    $('.diva-input-suggestion:first', inputSuggestions).addClass('active');
	                }
	            }
	        });

	        $(inputSuggestions).on('mousedown', '.diva-input-suggestion', function()
	        {
	            gotoPageInput.value = this.textContent;
	            inputSuggestions.style.display = 'none';
	            $(gotoPageInput).trigger('submit');
	        });

	        $(gotoPageInput).on('blur', function ()
	        {
	            // Hide label suggestions
	            inputSuggestions.style.display = 'none';
	        });

	        return gotoForm;
	    };

	    var createPageLabel = function()
	    {
	        // Current page
	        var currentPage = elt('span', {
	            id: settings.ID + 'current-page'
	        });

	        var updateCurrentPage = function ()
	        {
	            currentPage.textContent = viewer.getCurrentAliasedPageIndex();
	        };

	        subscribe('VisiblePageDidChange', updateCurrentPage);
	        subscribe('ViewerDidLoad', updateCurrentPage);

	        // Number of pages
	        var numPages = elt('span', {
	            id: settings.ID + 'num-pages'
	        });

	        var updateNumPages = function ()
	        {
	            numPages.textContent = settings.numPages;
	        };

	        subscribe('NumberOfPagesDidChange', updateNumPages);
	        subscribe('ObjectDidLoad', updateNumPages);

	        return elt('span', {
	                class: 'diva-page-label diva-label'
	            },
	            'Page ', currentPage, ' of ', numPages
	        );
	    };

	    var createToolbarButtonGroup = function ()
	    {
	        var buttons = [createViewMenu()];

	        if (settings.enableLinkIcon)
	            buttons.push(createLinkIcon());

	        if (settings.enableNonPagedVisibilityIcon)
	            buttons.push(createToggleNonPagedButton());

	        if (settings.enableFullscreen)
	            buttons.push(createFullscreenButton());

	        return elt('span', elemAttrs('toolbar-button-group'), buttons);
	    };

	    var createLinkIcon = function ()
	    {
	        var elem = createButtonElement('link-icon', 'Link to this page');
	        var linkIcon = $(elem);

	        linkIcon.on('click', function ()
	        {
	            $('body').prepend(
	                elt('div', {
	                    id: settings.ID + 'link-popup',
	                    class: 'diva-popup diva-link-popup'
	                }, [
	                    elt('input', {
	                        id: settings.ID + 'link-popup-input',
	                        class: 'diva-input',
	                        type: 'text',
	                        value: viewer.getCurrentURL()
	                    })
	                ])
	            );

	            if (settings.inFullscreen)
	            {
	                $(settings.selector + 'link-popup').addClass('in-fullscreen');
	            }
	            else
	            {
	                // Calculate the left and top offsets
	                var leftOffset = linkIcon.offset().left - 222 + linkIcon.outerWidth();
	                var topOffset = linkIcon.offset().top + linkIcon.outerHeight() - 1;

	                $(settings.selector + 'link-popup').css({
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
	            // FIXME(wabain): This is aggressive
	            settings.viewportObject.scroll(function ()
	            {
	                $(settings.selector + 'link-popup').remove();
	            });
	            $(settings.selector + 'link-popup input').click(function ()
	            {
	                $(this).focus().select();
	            });

	            return false;
	        });

	        return elem;
	    };

	    var createFullscreenButton = function ()
	    {
	        return createButtonElement('fullscreen-icon', 'Toggle fullscreen mode', function ()
	        {
	            viewer.toggleFullscreenMode();
	        });
	    };

	    var createToggleNonPagedButton = function ()
	    {
	        var getClassName = function()
	        {
	            return 'toggle-nonpaged-icon' + (viewer.getSettings().showNonPagedPages ? '-active' : '');
	        };

	        var toggleNonPagedButton = createButtonElement(getClassName(), 'Toggle visibility of non-paged pages', function()
	        {
	            viewer.toggleNonPagedPagesVisibility();
	            var newClassName = 'diva-' + getClassName();
	            this.className = this.className.replace(/diva-toggle-nonpaged-icon(-active)?/, newClassName);
	        });

	        var updateNonPagedButtonVisibility = function ()
	        {
	            var pages = settings.manifest.pages;
	            for (var i = 0; i < pages.length; i++)
	            {
	                if (settings.manifest.paged && !pages[i].paged)
	                {
	                    // Show the button, there is at least one non-paged page
	                    toggleNonPagedButton.style.display = 'inline-block';
	                    return;
	                }
	            }

	            // No non-paged pages were found, hide the button
	            toggleNonPagedButton.style.display = 'none';
	        };
	        subscribe('ObjectDidLoad', updateNonPagedButtonVisibility);

	        return toggleNonPagedButton;
	    };

	    // Handles all status updating etc (both fullscreen and not)
	    var init = function ()
	    {
	        var leftTools = [createZoomControls(), createGridControls()];
	        var rightTools = [createPageNavigationControls(), createToolbarButtonGroup()];

	        var tools = elt('div', elemAttrs('tools'),
	            elt('div', elemAttrs('tools-left'), leftTools),
	            elt('div', elemAttrs('tools-right'), rightTools)
	        );

	        settings.toolbarParentObject.prepend(tools);

	        // Handle entry to and exit from fullscreen mode
	        var switchMode = function ()
	        {
	            var toolsRightElement = document.getElementById(settings.ID + 'tools-right');
	            var pageNavElement = document.getElementById(settings.ID + 'page-nav');

	            if (!settings.inFullscreen)
	            {
	                // Leaving fullscreen
	                $(tools).removeClass('diva-fullscreen-tools');

	                //move ID-page-nav to beginning of tools right
	                toolsRightElement.removeChild(pageNavElement);
	                toolsRightElement.insertBefore(pageNavElement, toolsRightElement.firstChild);
	            }
	            else
	            {
	                // Entering fullscreen
	                $(tools).addClass('diva-fullscreen-tools');

	                //move ID-page-nav to end of tools right
	                toolsRightElement.removeChild(pageNavElement);
	                toolsRightElement.appendChild(pageNavElement);
	            }
	        };

	        subscribe('ModeDidSwitch', switchMode);
	        subscribe('ViewerDidLoad', switchMode);

	        var toolbar = {
	            element: tools,
	            closePopups: function ()
	            {
	                $('.diva-popup').css('display', 'none');
	            }
	        };

	        return toolbar;
	    };

	    return init();
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(3);

	__webpack_require__(15);

	var elt = __webpack_require__(8);
	var getScrollbarWidth = __webpack_require__(16);

	var gestureEvents = __webpack_require__(17);
	var diva = __webpack_require__(2);
	var DocumentHandler = __webpack_require__(18);
	var GridHandler = __webpack_require__(22);
	var PageOverlayManager = __webpack_require__(23);
	var PluginRegistry = __webpack_require__(5);
	var Renderer = __webpack_require__(24);
	var getPageLayouts = __webpack_require__(34);
	var createSettingsView = __webpack_require__(39);
	var ValidationRunner = __webpack_require__(40);
	var Viewport = __webpack_require__(41);

	var debug = __webpack_require__(25)('diva:ViewerCore');

	module.exports = ViewerCore;

	// Define validations
	var optionsValidations = [
	    {
	        key: 'goDirectlyTo',
	        validate: function (value, settings)
	        {
	            if (value < 0 || value >= settings.manifest.pages.length)
	                return 0;
	        }
	    },
	    {
	        key: 'minPagesPerRow',
	        validate: function (value)
	        {
	            return Math.max(2, value);
	        }
	    },
	    {
	        key: 'maxPagesPerRow',
	        validate: function (value, settings)
	        {
	            return Math.max(value, settings.minPagesPerRow);
	        }
	    },
	    {
	        key: 'pagesPerRow',
	        validate: function (value, settings)
	        {
	            // Default to the maximum
	            if (value < settings.minPagesPerRow || value > settings.maxPagesPerRow)
	                return settings.maxPagesPerRow;
	        }
	    },
	    {
	        key: 'maxZoomLevel',
	        validate: function (value, settings, config)
	        {
	            // Changing this value isn't really an error, it just depends on the
	            // source manifest
	            config.suppressWarning();

	            if (value < 0 || value > settings.manifest.maxZoom)
	                return settings.manifest.maxZoom;
	        }
	    },
	    {
	        key: 'minZoomLevel',
	        validate: function (value, settings, config)
	        {
	            // Changes based on the manifest value shouldn't trigger a
	            // warning
	            if (value > settings.manifest.maxZoom)
	            {
	                config.suppressWarning();
	                return 0;
	            }

	            if (value < 0 || value > settings.maxZoomLevel)
	                return 0;
	        }
	    },
	    {
	        key: 'zoomLevel',
	        validate: function (value, settings, config)
	        {
	            if (value > settings.manifest.maxZoom)
	            {
	                config.suppressWarning();
	                return 0;
	            }

	            if (value < settings.minZoomLevel || value > settings.maxZoomLevel)
	                return settings.minZoomLevel;
	        }
	    }
	];

	function ViewerCore(element, options, publicInstance)
	{
	    var self = this;
	    var parentObject = $(element);

	    // Things that cannot be changed because of the way they are used by the script
	    // Many of these are declared with arbitrary values that are changed later on
	    var viewerState = {
	        currentPageIndex: 0,        // The current page in the viewport (center-most page)
	        horizontalOffset: 0,        // Distance from the center of the diva element to the top of the current page
	        horizontalPadding: 0,       // Either the fixed padding or adaptive padding
	        ID: null,                   // The prefix of the IDs of the elements (usually 1-diva-)
	        initialKeyScroll: false,    // Holds the initial state of enableKeyScroll
	        initialSpaceScroll: false,  // Holds the initial state of enableSpaceScroll
	        innerElement: null,         // The native .diva-outer DOM object
	        innerObject: {},            // $(settings.ID + 'inner'), for selecting the .diva-inner element
	        isActiveDiva: true,         // In the case that multiple diva panes exist on the same page, this should have events funneled to it.
	        isIIIF: false,              // Specifies whether objectData is in Diva native or IIIF Manifest format
	        isScrollable: true,         // Used in enable/disableScrollable public methods
	        isZooming: false,           // Flag to keep track of whether zooming is still in progress, for handleZoom
	        loaded: false,              // A flag for when everything is loaded and ready to go.
	        manifest: null,
	        mobileWebkit: false,        // Checks if the user is on a touch device (iPad/iPod/iPhone/Android)
	        numPages: 0,                // Number of pages in the array
	        oldZoomLevel: -1,           // Holds the previous zoom level after zooming in or out
	        options: options,
	        outerElement: null,         // The native .diva-outer DOM object
	        outerObject: {},            // $(settings.ID + 'outer'), for selecting the .diva-outer element
	        pageOverlays: new PageOverlayManager(),
	        pageTools: [],              // The plugins which are enabled as page tools
	        parentObject: parentObject, // JQuery object referencing the parent element
	        pendingManifestRequest: null, // Reference to the xhr request retrieving the manifest. Used to cancel the request on destroy()
	        plugins: [],                // Filled with the enabled plugins from the registry
	        renderer: null,
	        resizeTimer: -1,            // Holds the ID of the timeout used when resizing the window (for clearing)
	        scrollbarWidth: 0,          // Set to the actual scrollbar width in init()
	        selector: '',               // Uses the generated ID prefix to easily select elements
	        throbberTimeoutID: -1,      // Holds the ID of the throbber loading timeout
	        toolbar: null,              // Holds an object with some toolbar-related functions
	        verticalOffset: 0,          // Distance from the center of the diva element to the left side of the current page
	        verticalPadding: 0,         // Either the fixed padding or adaptive padding
	        viewHandler: null,
	        viewport: null,             // Object caching the viewport dimensions
	        viewportElement: null,
	        viewportObject: null
	    };

	    var settings = createSettingsView([options, viewerState]);

	    // Aliases for compatibilty
	    Object.defineProperties(settings, {
	        // Height of the document viewer pane
	        panelHeight: {
	            get: function ()
	            {
	                return viewerState.viewport.height;
	            }
	        },
	        // Width of the document viewer pane
	        panelWidth: {
	            get: function ()
	            {
	                return viewerState.viewport.width;
	            }
	        }
	    });

	    var optionsValidator = new ValidationRunner({
	        additionalProperties: [
	            {
	                key: 'manifest',
	                get: function ()
	                {
	                    return viewerState.manifest;
	                }
	            }
	        ],

	        validations: optionsValidations
	    });

	    var isValidOption = function (key, value)
	    {
	        return optionsValidator.isValid(key, value, viewerState.options);
	    };

	    var elemAttrs = function (ident, base)
	    {
	        var attrs = {
	            id: settings.ID + ident,
	            class: 'diva-' + ident
	        };

	        if (base)
	            return $.extend(attrs, base);
	        else
	            return attrs;
	    };

	    var getPageData = function (pageIndex, attribute)
	    {
	        return settings.manifest.pages[pageIndex].d[settings.zoomLevel][attribute];
	    };

	    // Reset some settings and empty the viewport
	    var clearViewer = function ()
	    {
	        viewerState.viewport.top = 0;

	        // Clear all the timeouts to prevent undesired pages from loading
	        clearTimeout(viewerState.resizeTimer);
	    };

	    /**
	     * Update settings to match the specified options. Load the viewer,
	     * fire appropriate events for changed options.
	     */
	    var reloadViewer = function (newOptions)
	    {
	        var queuedEvents = [];

	        newOptions = optionsValidator.getValidatedOptions(settings, newOptions);

	        // Set the zoom level if valid and fire a ZoomLevelDidChange event
	        if (hasChangedOption(newOptions, 'zoomLevel'))
	        {
	            viewerState.oldZoomLevel = settings.zoomLevel;
	            viewerState.options.zoomLevel = newOptions.zoomLevel;
	            queuedEvents.push(["ZoomLevelDidChange", newOptions.zoomLevel]);
	        }

	        // Set the pages per row if valid and fire an event
	        if (hasChangedOption(newOptions, 'pagesPerRow'))
	        {
	            viewerState.options.pagesPerRow = newOptions.pagesPerRow;
	            queuedEvents.push(["GridRowNumberDidChange", newOptions.pagesPerRow]);
	        }

	        // Update verticallyOriented (no event fired)
	        if (hasChangedOption(newOptions, 'verticallyOriented'))
	            viewerState.options.verticallyOriented = newOptions.verticallyOriented;

	        // Show/Hide non-paged pages
	        if (hasChangedOption(newOptions, 'showNonPagedPages'))
	        {
	            viewerState.options.showNonPagedPages = newOptions.showNonPagedPages;
	        }

	        // Update page position (no event fired here)
	        if ('goDirectlyTo' in newOptions)
	        {
	            viewerState.options.goDirectlyTo = newOptions.goDirectlyTo;

	            if ('verticalOffset' in newOptions)
	                viewerState.verticalOffset = newOptions.verticalOffset;

	            if ('horizontalOffset' in newOptions)
	                viewerState.horizontalOffset = newOptions.horizontalOffset;
	        }
	        else
	        {
	            // Otherwise the default is to remain on the current page
	            viewerState.options.goDirectlyTo = settings.currentPageIndex;
	        }

	        if (hasChangedOption(newOptions, 'inGrid') || hasChangedOption(newOptions, 'inBookLayout'))
	        {
	            if ('inGrid' in newOptions)
	                viewerState.options.inGrid = newOptions.inGrid;

	            if ('inBookLayout' in newOptions)
	                viewerState.options.inBookLayout = newOptions.inBookLayout;

	            queuedEvents.push(["ViewDidSwitch", settings.inGrid]);
	        }

	        // Note: prepareModeChange() depends on inGrid and the vertical/horizontalOffset (for now)
	        if (hasChangedOption(newOptions, 'inFullscreen'))
	        {
	            viewerState.options.inFullscreen = newOptions.inFullscreen;
	            prepareModeChange(newOptions);
	            queuedEvents.push(["ModeDidSwitch", settings.inFullscreen]);
	        }

	        clearViewer();
	        updateViewHandlerAndRendering();

	        if (viewerState.renderer)
	        {
	            // TODO: The usage of padding variables is still really
	            // messy and inconsistent
	            var rendererConfig = {
	                pageLayouts: getPageLayouts(settings),
	                padding: getPadding(),
	                maxZoomLevel: settings.inGrid ? null : viewerState.manifest.maxZoom,
	                verticallyOriented: settings.verticallyOriented || settings.inGrid,
	            };

	            var viewportPosition = {
	                zoomLevel: settings.inGrid ? null : settings.zoomLevel,
	                anchorPage: settings.goDirectlyTo,
	                verticalOffset: viewerState.verticalOffset,
	                horizontalOffset: viewerState.horizontalOffset
	            };

	            var sourceProvider = getCurrentSourceProvider();

	            if (debug.enabled)
	            {
	                var serialized = Object.keys(rendererConfig)
	                    .filter(function (key)
	                    {
	                        // Too long
	                        return key !== 'pageLayouts' && key !== 'padding';
	                    })
	                    .map(function (key)
	                    {
	                        var value = rendererConfig[key];
	                        return key + ': ' + JSON.stringify(value);
	                    })
	                    .join(', ');

	                debug('reload with %s', serialized);
	            }

	            viewerState.renderer.load(rendererConfig, viewportPosition, sourceProvider);
	        }

	        queuedEvents.forEach(function (params)
	        {
	            publish.apply(null, params);
	        });

	        return true;
	    };

	    var hasChangedOption = function (options, key)
	    {
	        return key in options && options[key] !== settings[key];
	    };

	    // Handles switching in and out of fullscreen mode
	    var prepareModeChange = function (options)
	    {
	        // Toggle the classes
	        var changeClass = options.inFullscreen ? 'addClass' : 'removeClass';
	        viewerState.outerObject[changeClass]('diva-fullscreen');
	        $('body')[changeClass]('diva-hide-scrollbar');
	        settings.parentObject[changeClass]('diva-full-width');

	        // Adjust Diva's internal panel size, keeping the old values
	        var storedHeight = settings.panelHeight;
	        var storedWidth = settings.panelWidth;
	        viewerState.viewport.invalidate();

	        // If this isn't the original load, the offsets matter, and the position isn't being changed...
	        if (!viewerState.loaded && !settings.inGrid && !('verticalOffset' in options))
	        {
	            //get the updated panel size
	            var newHeight = settings.panelHeight;
	            var newWidth = settings.panelWidth;

	            //and re-center the new panel on the same point
	            viewerState.verticalOffset += ((storedHeight - newHeight) / 2);
	            viewerState.horizontalOffset += ((storedWidth - newWidth) / 2);
	        }

	        //turn on/off escape key listener
	        if (options.inFullscreen)
	            $(document).on('keyup', escapeListener);
	        else
	            $(document).off('keyup', escapeListener);
	    };

	    // Update the view handler and the view rendering for the current view
	    var updateViewHandlerAndRendering = function ()
	    {
	        var Handler = settings.inGrid ? GridHandler : DocumentHandler;

	        if (viewerState.viewHandler && !(viewerState.viewHandler instanceof Handler))
	        {
	            viewerState.viewHandler.destroy();
	            viewerState.viewHandler = null;
	        }

	        if (!viewerState.viewHandler)
	            viewerState.viewHandler = new Handler(self);

	        if (!viewerState.renderer)
	            initializeRenderer();
	    };

	    // TODO: This could probably be done upon ViewerCore initialization
	    var initializeRenderer = function ()
	    {
	        var compatErrors = Renderer.getCompatibilityErrors();

	        if (compatErrors)
	        {
	            showError(compatErrors);
	        }
	        else
	        {
	            var options = {
	                viewport: viewerState.viewport,
	                outerElement: viewerState.outerElement,
	                innerElement: viewerState.innerElement
	            };

	            var hooks = {
	                onViewWillLoad: function ()
	                {
	                    viewerState.viewHandler.onViewWillLoad();
	                },
	                onViewDidLoad: function ()
	                {
	                    updatePageOverlays();
	                    viewerState.viewHandler.onViewDidLoad();
	                },
	                onViewDidUpdate: function (pages, targetPage)
	                {
	                    updatePageOverlays();
	                    viewerState.viewHandler.onViewDidUpdate(pages, targetPage);
	                },
	                onViewDidTransition: function ()
	                {
	                    updatePageOverlays();
	                },
	                onPageWillLoad: function (pageIndex)
	                {
	                    publish('PageWillLoad', pageIndex);
	                }
	            };

	            viewerState.renderer = new Renderer(options, hooks);
	        }
	    };

	    var getCurrentSourceProvider = function ()
	    {
	        if (settings.inGrid)
	        {
	            var gridSourceProvider = {
	                getAllZoomLevelsForPage: function (page)
	                {
	                    return [gridSourceProvider.getBestZoomLevelForPage(page)];
	                },
	                getBestZoomLevelForPage: function (page)
	                {
	                    var url = settings.manifest.getPageImageURL(page.index, {
	                        width: page.dimensions.width
	                    });

	                    return {
	                        zoomLevel: 1, // FIXME
	                        rows: 1,
	                        cols: 1,
	                        tiles: [{
	                            url: url,
	                            zoomLevel: 1, // FIXME
	                            row: 0,
	                            col: 0,
	                            dimensions: page.dimensions,
	                            offset: {
	                                top: 0,
	                                left: 0
	                            }
	                        }]
	                    };
	                }
	            };

	            return gridSourceProvider;
	        }

	        var tileDimens = {
	            width: settings.tileWidth,
	            height: settings.tileHeight
	        };

	        return {
	            getBestZoomLevelForPage: function (page)
	            {
	                return settings.manifest.getPageImageTiles(page.index, Math.ceil(settings.zoomLevel), tileDimens);
	            },
	            getAllZoomLevelsForPage: function (page)
	            {
	                var levels = [];

	                var levelCount = viewerState.manifest.maxZoom;
	                for (var level=0; level <= levelCount; level++)
	                {
	                    levels.push(settings.manifest.getPageImageTiles(page.index, level, tileDimens));
	                }

	                levels.reverse();

	                return levels;
	            }
	        };
	    };

	    var getPadding = function ()
	    {
	        var topPadding, leftPadding;
	        var docVPadding, docHPadding;

	        if (settings.inGrid)
	        {
	            docVPadding = settings.fixedPadding;
	            topPadding = leftPadding = docHPadding = 0;
	        }
	        else
	        {
	            topPadding = settings.verticallyOriented ? viewerState.verticalPadding : 0;
	            leftPadding = settings.verticallyOriented ? 0 : viewerState.horizontalPadding;

	            docVPadding = settings.verticallyOriented ? 0 : viewerState.verticalPadding;
	            docHPadding = settings.verticallyOriented ? viewerState.horizontalPadding : 0;
	        }

	        return {
	            document: {
	                top: docVPadding,
	                bottom: docVPadding,
	                left: docHPadding,
	                right: docHPadding
	            },
	            page: {
	                top: topPadding,
	                bottom: 0,
	                left: leftPadding,
	                right: 0
	            }
	        };
	    };

	    var updatePageOverlays = function ()
	    {
	        viewerState.pageOverlays.updateOverlays(viewerState.renderer.getRenderedPages());
	    };

	    //Shortcut for closing fullscreen with the escape key
	    var escapeListener = function (e)
	    {
	        if (e.keyCode == 27)
	        {
	            reloadViewer({
	                inFullscreen: !settings.inFullscreen
	            });
	        }
	    };

	    // Called to handle any zoom level
	    var handleZoom = function (newZoomLevel, focalPoint)
	    {
	        // If the zoom level provided is invalid, return false
	        if (!isValidOption('zoomLevel', newZoomLevel))
	            return false;

	        // If no focal point was given, zoom on the center of the viewport
	        if (focalPoint == null)
	        {
	            var viewport = viewerState.viewport;
	            var currentRegion = viewerState.renderer.layout.getPageRegion(settings.currentPageIndex);

	            focalPoint = {
	                anchorPage: settings.currentPageIndex,
	                offset: {
	                    left: (viewport.width / 2) - (currentRegion.left - viewport.left),
	                    top: (viewport.height / 2) - (currentRegion.top - viewport.top)
	                }
	            };
	        }

	        var pageRegion = viewerState.renderer.layout.getPageRegion(focalPoint.anchorPage);

	        // calculate distance from cursor coordinates to center of viewport
	        var focalXToCenter = (pageRegion.left + focalPoint.offset.left) -
	            (settings.viewport.left + (settings.viewport.width / 2));
	        var focalYToCenter = (pageRegion.top + focalPoint.offset.top) -
	            (settings.viewport.top + (settings.viewport.height / 2));

	        function getPositionForZoomLevel(zoomLevel)
	        {
	            var zoomRatio = Math.pow(2, zoomLevel - initialZoomLevel);

	            //TODO(jeromepl): Calculate position from page top left to viewport top left
	            // calculate horizontal/verticalOffset: distance from viewport center to page upper left corner
	            var horizontalOffset = (focalPoint.offset.left * zoomRatio) - focalXToCenter;
	            var verticalOffset = (focalPoint.offset.top * zoomRatio) - focalYToCenter;

	            return {
	                zoomLevel: zoomLevel,
	                anchorPage: focalPoint.anchorPage,
	                verticalOffset: verticalOffset,
	                horizontalOffset: horizontalOffset
	            };
	        }

	        var initialZoomLevel = viewerState.oldZoomLevel = settings.zoomLevel;
	        viewerState.options.zoomLevel = newZoomLevel;

	        var endPosition = getPositionForZoomLevel(newZoomLevel);
	        viewerState.options.goDirectlyTo = endPosition.anchorPage;
	        viewerState.verticalOffset = endPosition.verticalOffset;
	        viewerState.horizontalOffset = endPosition.horizontalOffset;

	        viewerState.renderer.transitionViewportPosition({
	            duration: 300,
	            parameters: {
	                zoomLevel: {
	                    from: initialZoomLevel,
	                    to: newZoomLevel
	                }
	            },
	            getPosition: function (parameters)
	            {
	                return getPositionForZoomLevel(parameters.zoomLevel);
	            },
	            onEnd: function (info)
	            {
	                viewerState.viewportObject.scroll(scrollFunction);

	                if (info.interrupted)
	                    viewerState.oldZoomLevel = newZoomLevel;
	            }
	        });

	        // Update the slider
	        publish("ZoomLevelDidChange", newZoomLevel);

	        // While zooming, don't update scroll offsets based on the scaled version of diva-inner
	        viewerState.viewportObject.off('scroll');

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

	    // updates panelHeight/panelWidth on resize
	    var updatePanelSize = function ()
	    {
	        viewerState.viewport.invalidate();

	        // FIXME(wabain): This should really only be called after initial load
	        if (viewerState.renderer)
	        {
	            updateOffsets();
	            viewerState.renderer.goto(settings.currentPageIndex, viewerState.verticalOffset, viewerState.horizontalOffset);
	        }

	        return true;
	    };

	    var updateOffsets = function ()
	    {
	        var pageOffset = viewerState.renderer.layout.getPageToViewportCenterOffset(settings.currentPageIndex, viewerState.viewport);

	        if (pageOffset)
	        {
	            viewerState.horizontalOffset = pageOffset.x;
	            viewerState.verticalOffset = pageOffset.y;
	        }
	    };

	    // Bind mouse events (drag to scroll, double-click)
	    var bindMouseEvents = function()
	    {
	        // Set drag scroll on first descendant of class dragger on both selected elements
	        viewerState.viewportObject.dragscrollable({dragSelector: '.diva-dragger', acceptPropagatedEvent: true});
	        viewerState.innerObject.dragscrollable({dragSelector: '.diva-dragger', acceptPropagatedEvent: true});

	        gestureEvents.onDoubleClick(viewerState.viewportObject, function (event, coords)
	        {
	            debug('Double click at %s, %s', coords.left, coords.top);
	            viewerState.viewHandler.onDoubleClick(event, coords);
	        });
	    };

	    var onResize = function()
	    {
	        updatePanelSize();
	        // Cancel any previously-set resize timeouts
	        clearTimeout(viewerState.resizeTimer);

	        viewerState.resizeTimer = setTimeout(function ()
	        {
	            var pageOffset = viewerState.renderer.layout.getPageToViewportCenterOffset(settings.currentPageIndex, viewerState.viewport);

	            if (pageOffset)
	            {
	                reloadViewer({
	                    goDirectlyTo: settings.currentPageIndex,
	                    verticalOffset: pageOffset.y,
	                    horizontalOffset: pageOffset.x
	                });
	            }
	            else
	            {
	                reloadViewer({
	                    goDirectlyTo: settings.currentPageIndex
	                });
	            }
	        }, 200);
	    };

	    // Bind touch and orientation change events
	    var bindTouchEvents = function()
	    {
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

	        // Touch events for swiping in the viewport to scroll pages
	        viewerState.viewportObject.kinetic({
	            triggerHardware: true
	        });

	        gestureEvents.onPinch(viewerState.viewportObject, function (event, coords, start, end)
	        {
	            debug('Pinch %s at %s, %s', end - start, coords.left, coords.top);
	            viewerState.viewHandler.onPinch(event, coords, start, end);
	        });

	        gestureEvents.onDoubleTap(viewerState.viewportObject, function (event, coords)
	        {
	            debug('Double tap at %s, %s', coords.left, coords.top);
	            viewerState.viewHandler.onDoubleClick(event, coords);
	        });
	    };

	    // Handle the scroll
	    var scrollFunction = function ()
	    {
	        var previousTopScroll = viewerState.viewport.top;
	        var previousLeftScroll = viewerState.viewport.left;

	        var direction;

	        viewerState.viewport.invalidate();

	        var newScrollTop = viewerState.viewport.top;
	        var newScrollLeft = viewerState.viewport.left;

	        if (settings.verticallyOriented || settings.inGrid)
	            direction = newScrollTop - previousTopScroll;
	        else
	            direction = newScrollLeft - previousLeftScroll;

	        //give adjust the direction we care about
	        viewerState.renderer.adjust(direction);

	        var primaryScroll = (settings.verticallyOriented || settings.inGrid) ? newScrollTop : newScrollLeft;

	        publish("ViewerDidScroll", primaryScroll);

	        if (direction > 0)
	        {
	            publish("ViewerDidScrollDown", primaryScroll);
	        }
	        else if (direction < 0)
	        {
	            publish("ViewerDidScrollUp", primaryScroll);
	        }

	        updateOffsets();
	    };

	    // Binds most of the event handlers (some more in createToolbar)
	    var handleEvents = function ()
	    {
	        // Change the cursor for dragging
	        viewerState.innerObject.mousedown(function ()
	        {
	            viewerState.innerObject.addClass('diva-grabbing');
	        });

	        viewerState.innerObject.mouseup(function ()
	        {
	            viewerState.innerObject.removeClass('diva-grabbing');
	        });

	        bindMouseEvents();

	        viewerState.viewportObject.scroll(scrollFunction);

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
	        $(document).on('keydown.diva', function (event)
	        {
	            if (!viewerState.isActiveDiva)
	                return true;

	            // Space or page down - go to the next page
	            if ((settings.enableSpaceScroll && !event.shiftKey && event.keyCode === spaceKey) || (settings.enableKeyScroll && event.keyCode === pageDownKey))
	            {
	                viewerState.viewport.top += settings.panelHeight;
	                return false;
	            }
	            else if (!settings.enableSpaceScroll && event.keyCode === spaceKey)
	            {
	                event.preventDefault();
	            }

	            if (settings.enableKeyScroll)
	            {
	                // Don't steal keyboard shortcuts (metaKey = command [OS X], super [Win/Linux])
	                if (event.shiftKey || event.ctrlKey || event.metaKey)
	                    return true;

	                switch (event.keyCode)
	                {
	                    case pageUpKey:
	                        // Page up - go to the previous page
	                        viewerState.viewport.top -= settings.panelHeight;
	                        return false;

	                    case upArrowKey:
	                        // Up arrow - scroll up
	                        viewerState.viewport.top -= settings.arrowScrollAmount;
	                        return false;

	                    case downArrowKey:
	                        // Down arrow - scroll down
	                        viewerState.viewport.top += settings.arrowScrollAmount;
	                        return false;

	                    case leftArrowKey:
	                        // Left arrow - scroll left
	                        viewerState.viewport.left -= settings.arrowScrollAmount;
	                        return false;

	                    case rightArrowKey:
	                        // Right arrow - scroll right
	                        viewerState.viewport.left += settings.arrowScrollAmount;
	                        return false;

	                    case homeKey:
	                        // Home key - go to the beginning of the document
	                        viewerState.viewport.top = 0;
	                        return false;

	                    case endKey:
	                        // End key - go to the end of the document
	                        // Count on the viewport coordinate value being normalized
	                        if (settings.verticallyOriented)
	                            viewerState.viewport.top = Infinity;
	                        else
	                            viewerState.viewport.left = Infinity;

	                        return false;

	                    default:
	                        return true;
	                }
	            }
	            return true;
	        });

	        diva.Events.subscribe('ViewerDidTerminate', function()
	        {
	            $(document).off('keydown.diva');
	        }, settings.ID);

	        bindTouchEvents();

	        // Handle window resizing events
	        window.addEventListener('resize', onResize, false);

	        diva.Events.subscribe('ViewerDidTerminate', function()
	        {
	            window.removeEventListener('resize', onResize, false);
	        }, settings.ID);

	        // Handle orientation change separately
	        if ('onorientationchange' in window)
	        {
	            window.addEventListener('orientationchange', onResize, false);

	            diva.Events.subscribe('ViewerDidTerminate', function()
	            {
	                window.removeEventListener('orientationchange', onResize, false);
	            }, settings.ID);
	        }

	        diva.Events.subscribe('PanelSizeDidChange', updatePanelSize, settings.ID);

	        // Clear page and resize timeouts when the viewer is destroyed
	        diva.Events.subscribe('ViewerDidTerminate', function ()
	        {
	            if (viewerState.renderer)
	                viewerState.renderer.destroy();

	            clearTimeout(viewerState.resizeTimer);
	        }, settings.ID);
	    };

	    var initPlugins = function ()
	    {
	        // Add all the plugins that have not been explicitly disabled to
	        // settings.plugins
	        PluginRegistry.getAll().forEach(function (plugin)
	        {
	            var pluginProperName = plugin.pluginName[0].toUpperCase() + plugin.pluginName.substring(1);

	            if (settings['enable' + pluginProperName])
	            {
	                // Call the init function and check return value
	                var enablePlugin = plugin.init(settings, publicInstance);

	                // If int returns false, consider the plugin disabled
	                if (!enablePlugin)
	                    return;

	                // Create the pageTools bar if handleClick is set to a function
	                if (typeof plugin.handleClick === 'function')
	                {
	                    viewerState.pageTools.push(plugin);
	                }

	                // Add it to settings.plugins so it can be used later
	                settings.plugins.push(plugin);
	            }
	        });
	    };

	    var showThrobber = function ()
	    {
	        hideThrobber();

	        viewerState.throbberTimeoutID = setTimeout(function ()
	        {
	            $(settings.selector + 'throbber').show();
	        }, settings.throbberTimeout);
	    };

	    var hideThrobber = function ()
	    {
	        // Clear the timeout, if it hasn't executed yet
	        clearTimeout(viewerState.throbberTimeoutID);

	        // Hide the throbber if it has already executed
	        $(settings.selector + 'throbber').hide();
	    };

	    var showError = function(message)
	    {
	        var errorElement = elt('div', elemAttrs('error'), [
	            elt('button', elemAttrs('error-close', {'aria-label': 'Close dialog'})),
	            elt('p',
	                elt('strong', 'Error')
	            ),
	            elt('div', message)
	        ]);

	        viewerState.outerObject.append(errorElement);

	        //bind dialog close button
	        $(settings.selector + 'error-close').on('click', function()
	        {
	            errorElement.parentNode.removeChild(errorElement);
	        });
	    };

	    var setManifest = function (manifest, isIIIF, loadOptions)
	    {
	        viewerState.manifest = manifest;

	        // FIXME: is isIIIF even needed?
	        viewerState.isIIIF = isIIIF;

	        hideThrobber();

	        // Convenience value
	        viewerState.numPages = settings.manifest.pages.length;

	        optionsValidator.validate(viewerState.options);

	        publish('NumberOfPagesDidChange', settings.numPages);

	        if (settings.enableAutoTitle)
	        {
	            if ($(settings.selector + 'title').length)
	                $(settings.selector + 'title').html(settings.manifest.itemTitle);
	            else
	                settings.parentObject.prepend(elt('div', elemAttrs('title'), [settings.manifest.itemTitle]));
	        }

	        // Calculate the horizontal and vertical inter-page padding based on the dimensions of the average zoom level
	        if (settings.adaptivePadding > 0)
	        {
	            var z = Math.floor((settings.minZoomLevel + settings.maxZoomLevel) / 2);
	            viewerState.horizontalPadding = parseInt(settings.manifest.getAverageWidth(z) * settings.adaptivePadding, 10);
	            viewerState.verticalPadding = parseInt(settings.manifest.getAverageHeight(z) * settings.adaptivePadding, 10);
	        }
	        else
	        {
	            // It's less than or equal to 0; use fixedPadding instead
	            viewerState.horizontalPadding = settings.fixedPadding;
	            viewerState.verticalPadding = settings.fixedPadding;
	        }

	        // Make sure the vertical padding is at least 40, if plugin icons are enabled
	        if (viewerState.pageTools.length)
	        {
	            viewerState.verticalPadding = Math.max(40, viewerState.verticalPadding);
	        }

	        // If we detect a viewingHint of 'paged' in the manifest or sequence, enable book view by default
	        if (settings.manifest.paged)
	        {
	            viewerState.options.inBookLayout = true;
	        }

	        // Plugin setup hooks should be bound to the ObjectDidLoad event
	        publish('ObjectDidLoad', settings);

	        // Adjust the document panel dimensions
	        updatePanelSize();

	        var needsXCoord, needsYCoord;

	        var anchoredVertically = false;
	        var anchoredHorizontally = false;

	        if (loadOptions.goDirectlyTo == null)
	        {
	            loadOptions.goDirectlyTo = settings.goDirectlyTo;
	            needsXCoord = needsYCoord = true;
	        }
	        else
	        {
	            needsXCoord = loadOptions.horizontalOffset == null || isNaN(loadOptions.horizontalOffset);
	            needsYCoord = loadOptions.verticalOffset == null || isNaN(loadOptions.verticalOffset);
	        }

	        // Set default values for the horizontal and vertical offsets
	        if (needsXCoord)
	        {
	            // FIXME: What if inBookLayout/verticallyOriented is changed by loadOptions?
	            if (loadOptions.goDirectlyTo === 0 && settings.inBookLayout && settings.verticallyOriented)
	            {
	                // if in book layout, center the first opening by default
	                loadOptions.horizontalOffset = viewerState.horizontalPadding;
	            }
	            else
	            {
	                anchoredHorizontally = true;
	                loadOptions.horizontalOffset = getXOffset(loadOptions.goDirectlyTo, "center");
	            }
	        }

	        if (needsYCoord)
	        {
	            anchoredVertically = true;
	            loadOptions.verticalOffset = getYOffset(loadOptions.goDirectlyTo, "top");
	        }

	        reloadViewer(loadOptions);

	        //prep dimensions one last time now that pages have loaded
	        updatePanelSize();

	        // FIXME: This is a hack to ensure that the outerElement scrollbars are taken into account
	        if (settings.verticallyOriented)
	            viewerState.innerElement.style.minWidth = settings.panelWidth + 'px';
	        else
	            viewerState.innerElement.style.minHeight = settings.panelHeight + 'px';

	        // FIXME: If the page was supposed to be positioned relative to the viewport we need to
	        // recalculate it to take into account the scrollbars
	        if (anchoredVertically || anchoredHorizontally)
	        {
	            if (anchoredVertically)
	                viewerState.verticalOffset = getYOffset(settings.currentPageIndex, "top");

	            if (anchoredHorizontally)
	                viewerState.horizontalOffset = getXOffset(settings.currentPageIndex, "center");

	            viewerState.renderer.goto(settings.currentPageIndex, viewerState.verticalOffset, viewerState.horizontalOffset);
	        }

	        // signal that everything should be set up and ready to go.
	        viewerState.loaded = true;

	        publish("ViewerDidLoad", settings);
	    };

	    var publish = function (event)
	    {
	        var args = Array.prototype.slice.call(arguments, 1);
	        diva.Events.publish(event, args, publicInstance);
	    };

	    var init = function ()
	    {
	        // First figure out the width of the scrollbar in this browser
	        // TODO(wabain): Cache this somewhere else
	        // Only some of the plugins rely on this now
	        viewerState.scrollbarWidth = getScrollbarWidth();

	        // If window.orientation is defined, then it's probably mobileWebkit
	        viewerState.mobileWebkit = window.orientation !== undefined;

	        // Generate an ID that can be used as a prefix for all the other IDs
	        var idNumber = generateId();
	        viewerState.ID = 'diva-' + idNumber + '-';
	        viewerState.selector = '#' + settings.ID;

	        if (options.hashParamSuffix === null)
	        {
	            // Omit the suffix from the first instance
	            if (idNumber === 1)
	                options.hashParamSuffix = '';
	            else
	                options.hashParamSuffix = idNumber + '';
	        }

	        // Create the inner and outer panels
	        var innerElem = elt('div', elemAttrs('inner', { class: 'diva-inner diva-dragger' }));
	        var viewportElem = elt('div', elemAttrs('viewport'), innerElem);
	        var outerElem = elt('div', elemAttrs('outer'),
	            viewportElem,
	            elt('div', elemAttrs('throbber')));

	        viewerState.innerElement = innerElem;
	        viewerState.viewportElement = viewportElem;
	        viewerState.outerElement = outerElem;

	        viewerState.innerObject = $(innerElem);
	        viewerState.viewportObject = $(viewportElem);
	        viewerState.outerObject = $(outerElem);

	        settings.parentObject.append(outerElem);

	        viewerState.viewport = new Viewport(viewerState.viewportElement, {
	            intersectionTolerance: settings.viewportMargin
	        });

	        // Do all the plugin initialisation
	        initPlugins();

	        handleEvents();

	        // Show the throbber while waiting for the manifest to load
	        showThrobber();
	    };

	    this.getSettings = function ()
	    {
	        return settings;
	    };

	    // Temporary accessor for the state of the viewer core
	    // TODO: Replace this with a more restricted view of whatever needs
	    // be exposed through settings for backwards compat
	    this.getInternalState = function ()
	    {
	        return viewerState;
	    };

	    this.getPublicInstance = function ()
	    {
	        return publicInstance;
	    };

	    this.getPageTools = function ()
	    {
	        return viewerState.pageTools;
	    };

	    this.getCurrentLayout = function ()
	    {
	        return viewerState.renderer ? viewerState.renderer.layout : null;
	    };

	    /** Get a copy of the current viewport dimensions */
	    this.getViewport = function ()
	    {
	        var viewport = viewerState.viewport;

	        return {
	            top: viewport.top,
	            left: viewport.left,
	            bottom: viewport.bottom,
	            right: viewport.right,

	            width: viewport.width,
	            height: viewport.height
	        };
	    };

	    this.addPageOverlay = function (overlay)
	    {
	        viewerState.pageOverlays.addOverlay(overlay);
	    };

	    this.removePageOverlay = function (overlay)
	    {
	        viewerState.pageOverlays.removeOverlay(overlay);
	    };

	    this.getPageRegion = function (pageIndex, options)
	    {
	        var layout = viewerState.renderer.layout;
	        var region = layout.getPageRegion(pageIndex, options);

	        if (options && options.incorporateViewport)
	        {
	            var secondaryDim = settings.verticallyOriented ? 'width' : 'height';

	            if (viewerState.viewport[secondaryDim] > layout.dimensions[secondaryDim])
	            {
	                var docOffset = (viewerState.viewport[secondaryDim] - layout.dimensions[secondaryDim]) / 2;

	                if (settings.verticallyOriented)
	                {
	                    return {
	                        top: region.top,
	                        bottom: region.bottom,

	                        left: region.left + docOffset,
	                        right: region.right + docOffset
	                    };
	                }
	                else
	                {
	                    return {
	                        top: region.top + docOffset,
	                        bottom: region.bottom + docOffset,

	                        left: region.left,
	                        right: region.right
	                    };
	                }
	            }
	        }

	        return region;
	    };

	    this.getPagePositionAtViewportOffset = function (coords)
	    {
	        var docCoords = {
	            left: coords.left + viewerState.viewport.left,
	            top: coords.top + viewerState.viewport.top
	        };

	        var renderedPages = viewerState.renderer.getRenderedPages();
	        var pageCount = renderedPages.length;

	        // Find the page on which the coords occur
	        for (var i=0; i < pageCount; i++)
	        {
	            var pageIndex = renderedPages[i];
	            var region = viewerState.renderer.layout.getPageRegion(pageIndex);

	            if (region.left <= docCoords.left && region.right >= docCoords.left &&
	                region.top <= docCoords.top && region.bottom >= docCoords.top)
	            {
	                return {
	                    anchorPage: pageIndex,
	                    offset: {
	                        left: docCoords.left - region.left,
	                        top: docCoords.top - region.top
	                    }
	                };
	            }
	        }

	        // Fall back to current page
	        // FIXME: Would be better to use the closest page or something
	        var currentRegion = viewerState.renderer.layout.getPageRegion(settings.currentPageIndex);

	        return {
	            anchorPage: settings.currentPageIndex,
	            offset: {
	                left: docCoords.left - currentRegion.left,
	                top: docCoords.top - currentRegion.top
	            }
	        };
	    };

	    this.setManifest = function (manifest, isIIIF, loadOptions)
	    {
	        setManifest(manifest, isIIIF, loadOptions || {});
	    };

	    /**
	     * Set the current page to the given index, firing VisiblePageDidChange
	     *
	     * @param pageIndex
	     */
	    this.setCurrentPage = function (pageIndex)
	    {
	        if (viewerState.currentPageIndex !== pageIndex)
	        {
	            viewerState.currentPageIndex = pageIndex;
	            publish("VisiblePageDidChange", pageIndex, this.getPageName(pageIndex));
	        }
	    };

	    this.getPageName = function (pageIndex)
	    {
	        return viewerState.manifest.pages[pageIndex].f;
	    };

	    this.reload = function (newOptions)
	    {
	        reloadViewer(newOptions);
	    };

	    this.zoom = function (zoomLevel, focalPoint)
	    {
	        return handleZoom(zoomLevel, focalPoint);
	    };

	    this.enableScrollable = function ()
	    {
	        if (!viewerState.isScrollable)
	        {
	            bindMouseEvents();
	            viewerState.options.enableKeyScroll = viewerState.initialKeyScroll;
	            viewerState.options.enableSpaceScroll = viewerState.initialSpaceScroll;
	            viewerState.viewportElement.style.overflow = 'auto';
	            viewerState.isScrollable = true;
	        }
	    };

	    this.disableScrollable = function ()
	    {
	        if (viewerState.isScrollable)
	        {
	            // block dragging/double-click zooming
	            if (viewerState.innerObject.hasClass('diva-dragger'))
	                viewerState.innerObject.unbind('mousedown');
	            viewerState.outerObject.unbind('dblclick');
	            viewerState.outerObject.unbind('contextmenu');

	            // disable all other scrolling actions
	            viewerState.viewportElement.style.overflow = 'hidden';

	            // block scrolling keys behavior, respecting initial scroll settings
	            viewerState.initialKeyScroll = settings.enableKeyScroll;
	            viewerState.initialSpaceScroll = settings.enableSpaceScroll;
	            viewerState.options.enableKeyScroll = false;
	            viewerState.options.enableSpaceScroll = false;

	            viewerState.isScrollable = false;
	        }
	    };

	    this.isValidOption = function (key, value)
	    {
	        return isValidOption(key, value);
	    };

	    this.showError = function (message)
	    {
	        // FIXME: Not totally sure it makes sense to always do that here
	        hideThrobber();

	        var errorElement = elt('div', elemAttrs('error'), [
	            elt('button', elemAttrs('error-close', {'aria-label': 'Close dialog'})),
	            elt('p',
	                elt('strong', 'Error')
	            ),
	            elt('div', message)
	        ]);

	        viewerState.outerObject.append(errorElement);

	        //bind dialog close button
	        $(settings.selector + 'error-close').on('click', function()
	        {
	            errorElement.parentNode.removeChild(errorElement);
	        });
	    };

	    this.getXOffset = function (pageIndex, xAnchor)
	    {
	        return getXOffset(pageIndex, xAnchor);
	    };

	    this.getYOffset = function (pageIndex, yAnchor)
	    {
	        return getYOffset(pageIndex, yAnchor);
	    };

	    this.publish = publish;

	    this.clear = function ()
	    {
	        clearViewer();
	    };

	    this.setPendingManifestRequest = function (pendingManifestRequest)
	    {
	        viewerState.pendingManifestRequest = pendingManifestRequest;
	    };

	    // Destroys this instance, tells plugins to do the same (for testing)
	    this.destroy = function ()
	    {
	        // Useful event to access elements in diva before they get destroyed. Used by the highlight plugin.
	        publish('ViewerWillTerminate', settings);

	        // Cancel any pending request retrieving a manifest
	        if (settings.pendingManifestRequest)
	            settings.pendingManifestRequest.abort();

	        // Removes the hide-scrollbar class from the body
	        $('body').removeClass('diva-hide-scrollbar');

	        // Empty the parent container and remove any diva-related data
	        settings.parentObject.parent().empty().removeData('diva');

	        // Remove any additional styling on the parent element
	        settings.parentObject.parent().removeAttr('style').removeAttr('class');

	        publish('ViewerDidTerminate', settings);

	        // Clear the Events cache
	        diva.Events.unsubscribeAll(settings.ID);
	    };

	    // Call the init function when this object is created.
	    init();
	}

	generateId.counter = 1;

	function generateId() {
	    return generateId.counter++;
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint unused: false */

	var jQuery = __webpack_require__(3);

	/* istanbul ignore next This is a vendored dependency */
	/*
	 * jQuery dragscrollable Plugin
	 * version: 1.0 (25-Jun-2009)
	 * Copyright (c) 2009 Miquel Herrera
	 * http://plugins.jquery.com/project/Dragscrollable
	 *
	 * Dual licensed under the MIT and GPL licenses:
	 *   http://www.opensource.org/licenses/mit-license.php
	 *   http://www.gnu.org/licenses/gpl.html
	 *
	 */
	(function ($) { // secure $ jQuery alias

	    /**
	     * Adds the ability to manage elements scroll by dragging
	     * one or more of its descendant elements. Options parameter
	     * allow to specifically select which inner elements will
	     * respond to the drag events.
	     *
	     * options properties:
	     * ------------------------------------------------------------------------
	     *  dragSelector         | jquery selector to apply to each wrapped element
	     *                       | to find which will be the dragging elements.
	     *                       | Defaults to '>:first' which is the first child of
	     *                       | scrollable element
	     * ------------------------------------------------------------------------
	     *  acceptPropagatedEvent| Will the dragging element accept propagated
	     *                       | events? default is yes, a propagated mouse event
	     *                       | on a inner element will be accepted and processed.
	     *                       | If set to false, only events originated on the
	     *                       | draggable elements will be processed.
	     * ------------------------------------------------------------------------
	     *  preventDefault       | Prevents the event to propagate further effectivey
	     *                       | dissabling other default actions. Defaults to true
	     * ------------------------------------------------------------------------
	     *
	     *  usage examples:
	     *
	     *  To add the scroll by drag to the element id=viewport when dragging its
	     *  first child accepting any propagated events
	     *  $('#viewport').dragscrollable();
	     *
	     *  To add the scroll by drag ability to any element div of class viewport
	     *  when dragging its first descendant of class dragMe responding only to
	     *  evcents originated on the '.dragMe' elements.
	     *  $('div.viewport').dragscrollable({dragSelector:'.dragMe:first',
	 *                                    acceptPropagatedEvent: false});
	     *
	     *  Notice that some 'viewports' could be nested within others but events
	     *  would not interfere as acceptPropagatedEvent is set to false.
	     *
	     */
	    $.fn.dragscrollable = function( options ){

	        var settings = $.extend(
	            {
	                dragSelector:'>:first',
	                acceptPropagatedEvent: true,
	                preventDefault: true
	            },options || {});


	        var dragscroll= {
	            mouseDownHandler : function(event) {
	                // mousedown, left click, check propagation
	                if (event.which!=1 ||
	                    (!event.data.acceptPropagatedEvent && event.target != this)){
	                    return false;
	                }

	                // Initial coordinates will be the last when dragging
	                event.data.lastCoord = {left: event.clientX, top: event.clientY};

	                $.event.add( document, "mouseup",
	                    dragscroll.mouseUpHandler, event.data );
	                $.event.add( document, "mousemove",
	                    dragscroll.mouseMoveHandler, event.data );
	                if (event.data.preventDefault) {
	                    event.preventDefault();
	                    return false;
	                }
	            },
	            mouseMoveHandler : function(event) { // User is dragging
	                // How much did the mouse move?
	                var delta = {left: (event.clientX - event.data.lastCoord.left),
	                    top: (event.clientY - event.data.lastCoord.top)};

	                // Set the scroll position relative to what ever the scroll is now
	                event.data.scrollable.scrollLeft(
	                    event.data.scrollable.scrollLeft() - delta.left);
	                event.data.scrollable.scrollTop(
	                    event.data.scrollable.scrollTop() - delta.top);

	                // Save where the cursor is
	                event.data.lastCoord={left: event.clientX, top: event.clientY};
	                if (event.data.preventDefault) {
	                    event.preventDefault();
	                    return false;
	                }

	            },
	            mouseUpHandler : function(event) { // Stop scrolling
	                $.event.remove( document, "mousemove", dragscroll.mouseMoveHandler);
	                $.event.remove( document, "mouseup", dragscroll.mouseUpHandler);
	                if (event.data.preventDefault) {
	                    event.preventDefault();
	                    return false;
	                }
	            }
	        };

	        // set up the initial events
	        this.each(function() {
	            // closure object data for each scrollable element
	            var data = {scrollable : $(this),
	                acceptPropagatedEvent : settings.acceptPropagatedEvent,
	                preventDefault : settings.preventDefault };
	            // Set mouse initiating event on the desired descendant
	            $(this).find(settings.dragSelector).
	            bind('mousedown', data, dragscroll.mouseDownHandler);
	        });
	    }; //end plugin dragscrollable

	})( jQuery ); // confine scope

	/* istanbul ignore next This is a vendored dependency */
	/**
	 jQuery.kinetic v2.2.1
	 Dave Taylor http://davetayls.me

	 @license The MIT License (MIT)
	 @preserve Copyright (c) 2012 Dave Taylor http://davetayls.me
	 */
	(function ($){
	    'use strict';

	    var ACTIVE_CLASS = 'kinetic-active';

	    /**
	     * Provides requestAnimationFrame in a cross browser way.
	     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	     */
	    if (!window.requestAnimationFrame){

	        window.requestAnimationFrame = ( function (){

	            return window.webkitRequestAnimationFrame ||
	                window.mozRequestAnimationFrame ||
	                window.oRequestAnimationFrame ||
	                window.msRequestAnimationFrame ||
	                function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element){
	                    window.setTimeout(callback, 1000 / 60);
	                };

	        }());

	    }

	    // add touch checker to jQuery.support
	    $.support = $.support || {};
	    $.extend($.support, {
	        touch: 'ontouchend' in document
	    });


	    // KINETIC CLASS DEFINITION
	    // ======================

	    var Kinetic = function (element, settings) {
	        this.settings = settings;
	        this.el       = element;
	        this.$el      = $(element);

	        this._initElements();

	        return this;
	    };

	    Kinetic.DATA_KEY = 'kinetic';
	    Kinetic.DEFAULTS = {
	        cursor: 'move',
	        decelerate: true,
	        triggerHardware: false,
	        threshold: 0,
	        y: true,
	        x: true,
	        slowdown: 0.9,
	        maxvelocity: 40,
	        throttleFPS: 60,
	        invert: false,
	        movingClass: {
	            up: 'kinetic-moving-up',
	            down: 'kinetic-moving-down',
	            left: 'kinetic-moving-left',
	            right: 'kinetic-moving-right'
	        },
	        deceleratingClass: {
	            up: 'kinetic-decelerating-up',
	            down: 'kinetic-decelerating-down',
	            left: 'kinetic-decelerating-left',
	            right: 'kinetic-decelerating-right'
	        }
	    };


	    // Public functions

	    Kinetic.prototype.start = function (options){
	        this.settings = $.extend(this.settings, options);
	        this.velocity = options.velocity || this.velocity;
	        this.velocityY = options.velocityY || this.velocityY;
	        this.settings.decelerate = false;
	        this._move();
	    };

	    Kinetic.prototype.end = function (){
	        this.settings.decelerate = true;
	    };

	    Kinetic.prototype.stop = function (){
	        this.velocity = 0;
	        this.velocityY = 0;
	        this.settings.decelerate = true;
	        if ($.isFunction(this.settings.stopped)){
	            this.settings.stopped.call(this);
	        }
	    };

	    Kinetic.prototype.detach = function (){
	        this._detachListeners();
	        this.$el
	            .removeClass(ACTIVE_CLASS)
	            .css('cursor', '');
	    };

	    Kinetic.prototype.attach = function (){
	        if (this.$el.hasClass(ACTIVE_CLASS)) {
	            return;
	        }
	        this._attachListeners(this.$el);
	        this.$el
	            .addClass(ACTIVE_CLASS)
	            .css('cursor', this.settings.cursor);
	    };


	    // Internal functions

	    Kinetic.prototype._initElements = function (){
	        this.$el.addClass(ACTIVE_CLASS);

	        $.extend(this, {
	            xpos: null,
	            prevXPos: false,
	            ypos: null,
	            prevYPos: false,
	            mouseDown: false,
	            throttleTimeout: 1000 / this.settings.throttleFPS,
	            lastMove: null,
	            elementFocused: null
	        });

	        this.velocity = 0;
	        this.velocityY = 0;

	        // make sure we reset everything when mouse up
	        $(document)
	            .mouseup($.proxy(this._resetMouse, this))
	            .click($.proxy(this._resetMouse, this));

	        this._initEvents();

	        this.$el.css('cursor', this.settings.cursor);

	        if (this.settings.triggerHardware){
	            this.$el.css({
	                '-webkit-transform': 'translate3d(0,0,0)',
	                '-webkit-perspective': '1000',
	                '-webkit-backface-visibility': 'hidden'
	            });
	        }
	    };

	    Kinetic.prototype._initEvents = function(){
	        var self = this;
	        this.settings.events = {
	            touchStart: function (e){
	                var touch;
	                if (self._useTarget(e.target, e)){
	                    touch = e.originalEvent.touches[0];
	                    self.threshold = self._threshold(e.target, e);
	                    self._start(touch.clientX, touch.clientY);
	                    e.stopPropagation();
	                }
	            },
	            touchMove: function (e){
	                var touch;
	                if (self.mouseDown){
	                    touch = e.originalEvent.touches[0];
	                    self._inputmove(touch.clientX, touch.clientY);
	                    if (e.preventDefault){
	                        e.preventDefault();
	                    }
	                }
	            },
	            inputDown: function (e){
	                if (self._useTarget(e.target, e)){
	                    self.threshold = self._threshold(e.target, e);
	                    self._start(e.clientX, e.clientY);
	                    self.elementFocused = e.target;
	                    if (e.target.nodeName === 'IMG'){
	                        e.preventDefault();
	                    }
	                    e.stopPropagation();
	                }
	            },
	            inputEnd: function (e){
	                if (self._useTarget(e.target, e)){
	                    self._end();
	                    self.elementFocused = null;
	                    if (e.preventDefault){
	                        e.preventDefault();
	                    }
	                }
	            },
	            inputMove: function (e){
	                if (self.mouseDown){
	                    self._inputmove(e.clientX, e.clientY);
	                    if (e.preventDefault){
	                        e.preventDefault();
	                    }
	                }
	            },
	            scroll: function (e){
	                if ($.isFunction(self.settings.moved)){
	                    self.settings.moved.call(self, self.settings);
	                }
	                if (e.preventDefault){
	                    e.preventDefault();
	                }
	            },
	            inputClick: function (e){
	                if (Math.abs(self.velocity) > 0){
	                    e.preventDefault();
	                    return false;
	                }
	            },
	            // prevent drag and drop images in ie
	            dragStart: function (e){
	                if (self._useTarget(e.target, e) && self.elementFocused){
	                    return false;
	                }
	            },
	            // prevent selection when dragging
	            selectStart: function (e){
	                if ($.isFunction(self.settings.selectStart)){
	                    return self.settings.selectStart.apply(self, arguments);
	                } else if (self._useTarget(e.target, e)) {
	                    return false;
	                }
	            }
	        };

	        this._attachListeners(this.$el, this.settings);

	    };

	    Kinetic.prototype._inputmove = function (clientX, clientY){
	        var $this = this.$el;
	        var el = this.el;

	        if (!this.lastMove || new Date() > new Date(this.lastMove.getTime() + this.throttleTimeout)){
	            this.lastMove = new Date();

	            if (this.mouseDown && (this.xpos || this.ypos)){
	                var movedX = (clientX - this.xpos);
	                var movedY = (clientY - this.ypos);
	                if (this.settings.invert) {
	                    movedX *= -1;
	                    movedY *= -1;
	                }
	                if(this.threshold > 0){
	                    var moved = Math.sqrt(movedX * movedX + movedY * movedY);
	                    if(this.threshold > moved){
	                        return;
	                    } else {
	                        this.threshold = 0;
	                    }
	                }
	                if (this.elementFocused){
	                    $(this.elementFocused).blur();
	                    this.elementFocused = null;
	                    $this.focus();
	                }

	                this.settings.decelerate = false;
	                this.velocity = this.velocityY = 0;

	                var scrollLeft = this.scrollLeft();
	                var scrollTop = this.scrollTop();

	                this.scrollLeft(this.settings.x ? scrollLeft - movedX : scrollLeft);
	                this.scrollTop(this.settings.y ? scrollTop - movedY : scrollTop);

	                this.prevXPos = this.xpos;
	                this.prevYPos = this.ypos;
	                this.xpos = clientX;
	                this.ypos = clientY;

	                this._calculateVelocities();
	                this._setMoveClasses(this.settings.movingClass);

	                if ($.isFunction(this.settings.moved)){
	                    this.settings.moved.call(this, this.settings);
	                }
	            }
	        }
	    };

	    Kinetic.prototype._calculateVelocities = function (){
	        this.velocity = this._capVelocity(this.prevXPos - this.xpos, this.settings.maxvelocity);
	        this.velocityY = this._capVelocity(this.prevYPos - this.ypos, this.settings.maxvelocity);
	        if (this.settings.invert) {
	            this.velocity *= -1;
	            this.velocityY *= -1;
	        }
	    };

	    Kinetic.prototype._end = function (){
	        if (this.xpos && this.prevXPos && this.settings.decelerate === false){
	            this.settings.decelerate = true;
	            this._calculateVelocities();
	            this.xpos = this.prevXPos = this.mouseDown = false;
	            this._move();
	        }
	    };

	    Kinetic.prototype._useTarget = function (target, event){
	        if ($.isFunction(this.settings.filterTarget)){
	            return this.settings.filterTarget.call(this, target, event) !== false;
	        }
	        return true;
	    };

	    Kinetic.prototype._threshold = function (target, event){
	        if ($.isFunction(this.settings.threshold)){
	            return this.settings.threshold.call(this, target, event);
	        }
	        return this.settings.threshold;
	    };

	    Kinetic.prototype._start = function (clientX, clientY){
	        this.mouseDown = true;
	        this.velocity = this.prevXPos = 0;
	        this.velocityY = this.prevYPos = 0;
	        this.xpos = clientX;
	        this.ypos = clientY;
	    };

	    Kinetic.prototype._resetMouse = function (){
	        this.xpos = false;
	        this.ypos = false;
	        this.mouseDown = false;
	    };

	    Kinetic.prototype._decelerateVelocity = function (velocity, slowdown){
	        return Math.floor(Math.abs(velocity)) === 0 ? 0 // is velocity less than 1?
	            : velocity * slowdown; // reduce slowdown
	    };

	    Kinetic.prototype._capVelocity = function (velocity, max){
	        var newVelocity = velocity;
	        if (velocity > 0){
	            if (velocity > max){
	                newVelocity = max;
	            }
	        } else {
	            if (velocity < (0 - max)){
	                newVelocity = (0 - max);
	            }
	        }
	        return newVelocity;
	    };

	    Kinetic.prototype._setMoveClasses = function (classes){
	        // FIXME: consider if we want to apply PL #44, this should not remove
	        // classes we have not defined on the element!
	        var settings = this.settings;
	        var $this = this.$el;

	        $this.removeClass(settings.movingClass.up)
	            .removeClass(settings.movingClass.down)
	            .removeClass(settings.movingClass.left)
	            .removeClass(settings.movingClass.right)
	            .removeClass(settings.deceleratingClass.up)
	            .removeClass(settings.deceleratingClass.down)
	            .removeClass(settings.deceleratingClass.left)
	            .removeClass(settings.deceleratingClass.right);

	        if (this.velocity > 0){
	            $this.addClass(classes.right);
	        }
	        if (this.velocity < 0){
	            $this.addClass(classes.left);
	        }
	        if (this.velocityY > 0){
	            $this.addClass(classes.down);
	        }
	        if (this.velocityY < 0){
	            $this.addClass(classes.up);
	        }

	    };


	    // do the actual kinetic movement
	    Kinetic.prototype._move = function (){
	        var $scroller = this._getScroller();
	        var scroller = $scroller[0];
	        var self = this;
	        var settings = self.settings;

	        // set scrollLeft
	        if (settings.x && scroller.scrollWidth > 0){
	            this.scrollLeft(this.scrollLeft() + this.velocity);
	            if (Math.abs(this.velocity) > 0){
	                this.velocity = settings.decelerate ?
	                    self._decelerateVelocity(this.velocity, settings.slowdown) : this.velocity;
	            }
	        } else {
	            this.velocity = 0;
	        }

	        // set scrollTop
	        if (settings.y && scroller.scrollHeight > 0){
	            this.scrollTop(this.scrollTop() + this.velocityY);
	            if (Math.abs(this.velocityY) > 0){
	                this.velocityY = settings.decelerate ?
	                    self._decelerateVelocity(this.velocityY, settings.slowdown) : this.velocityY;
	            }
	        } else {
	            this.velocityY = 0;
	        }

	        self._setMoveClasses(settings.deceleratingClass);

	        if ($.isFunction(settings.moved)){
	            settings.moved.call(this, settings);
	        }

	        if (Math.abs(this.velocity) > 0 || Math.abs(this.velocityY) > 0){
	            if (!this.moving) {
	                this.moving = true;
	                // tick for next movement
	                window.requestAnimationFrame(function (){
	                    self.moving = false;
	                    self._move();
	                });
	            }
	        } else {
	            self.stop();
	        }
	    };

	    // get current scroller to apply positioning to
	    Kinetic.prototype._getScroller = function(){
	        var $scroller = this.$el;
	        if (this.$el.is('body') || this.$el.is('html')){
	            $scroller = $(window);
	        }
	        return $scroller;
	    };

	    // set the scroll position
	    Kinetic.prototype.scrollLeft = function(left){
	        var $scroller = this._getScroller();
	        if (typeof left === 'number'){
	            $scroller.scrollLeft(left);
	            this.settings.scrollLeft = left;
	        } else {
	            return $scroller.scrollLeft();
	        }
	    };
	    Kinetic.prototype.scrollTop = function(top){
	        var $scroller = this._getScroller();
	        if (typeof top === 'number'){
	            $scroller.scrollTop(top);
	            this.settings.scrollTop = top;
	        } else {
	            return $scroller.scrollTop();
	        }
	    };

	    Kinetic.prototype._attachListeners = function (){
	        var $this = this.$el;
	        var settings = this.settings;

	        if ($.support.touch){
	            $this
	                .bind('touchstart', settings.events.touchStart)
	                .bind('touchend', settings.events.inputEnd)
	                .bind('touchmove', settings.events.touchMove);
	        }

	        $this
	            .mousedown(settings.events.inputDown)
	            .mouseup(settings.events.inputEnd)
	            .mousemove(settings.events.inputMove);

	        $this
	            .click(settings.events.inputClick)
	            .scroll(settings.events.scroll)
	            .bind('selectstart', settings.events.selectStart)
	            .bind('dragstart', settings.events.dragStart);
	    };

	    Kinetic.prototype._detachListeners = function (){
	        var $this = this.$el;
	        var settings = this.settings;
	        if ($.support.touch){
	            $this
	                .unbind('touchstart', settings.events.touchStart)
	                .unbind('touchend', settings.events.inputEnd)
	                .unbind('touchmove', settings.events.touchMove);
	        }

	        $this
	            .unbind('mousedown', settings.events.inputDown)
	            .unbind('mouseup', settings.events.inputEnd)
	            .unbind('mousemove', settings.events.inputMove);

	        $this
	            .unbind('click', settings.events.inputClick)
	            .unbind('scroll', settings.events.scroll)
	            .unbind('selectstart', settings.events.selectStart)
	            .unbind('dragstart', settings.events.dragStart);
	    };


	    // EXPOSE KINETIC CONSTRUCTOR
	    // ==========================
	    $.Kinetic = Kinetic;

	    // KINETIC PLUGIN DEFINITION
	    // =======================

	    $.fn.kinetic = function (option, callOptions) {
	        return this.each(function () {
	            var $this    = $(this);
	            var instance = $this.data(Kinetic.DATA_KEY);
	            var options  = $.extend({}, Kinetic.DEFAULTS, $this.data(), typeof option === 'object' && option);

	            if (!instance) {
	                $this.data(Kinetic.DATA_KEY, (instance = new Kinetic(this, options)));
	            }

	            if (typeof option === 'string') {
	                instance[option](callOptions);
	            }

	        });
	    };

	}(jQuery));

	/* istanbul ignore next
	    We should maybe be testing this, but realistically that would mean maintaining a real fork */

	// jQuery.kinetic core modifications for diva.js (compatible with jQuery.kinetic 2.2.1)
	// use jQuery.kinetic for touch handlers only since we are using dragscrollable for mouse handlers
	//    - (kinetic provides inertial scrolling [ease into stopped state on release] for touch events and dragscrollable
	//      allows non-inertial scrolling which we like for mice)

	(function($)
	{
	    $.Kinetic.prototype._attachListeners = function()
	    {
	        // attach only touch listeners
	        var $this = this.$el;
	        var settings = this.settings;

	        if ($.support.touch)
	        {
	            $this
	                .bind('touchstart', settings.events.touchStart)
	                .bind('touchend', settings.events.inputEnd)
	                .bind('touchmove', settings.events.touchMove);
	        }

	        $this
	            .click(settings.events.inputClick)
	            .scroll(settings.events.scroll)
	            .bind('selectstart', settings.events.selectStart)
	            .bind('dragstart', settings.events.dragStart);
	    };

	    $.Kinetic.prototype._detachListeners = function()
	    {
	        // detach only touch listeners
	        var $this = this.$el;
	        var settings = this.settings;

	        if ($.support.touch)
	        {
	            $this
	                .unbind('touchstart', settings.events.touchStart)
	                .unbind('touchend', settings.events.inputEnd)
	                .unbind('touchmove', settings.events.touchMove);
	        }

	        $this
	            .unbind('click', settings.events.inputClick)
	            .unbind('scroll', settings.events.scroll)
	            .unbind('selectstart', settings.events.selectStart)
	            .unbind('dragstart', settings.events.dragStart);
	    };
	})(jQuery);


/***/ },
/* 16 */
/***/ function(module, exports) {

	// From http://www.alexandre-gomes.com/?p=115, modified slightly
	module.exports = function getScrollbarWidth() {
	    var inner = document.createElement('p');
	    inner.style.width = '100%';
	    inner.style.height = '200px';

	    var outer = document.createElement('div');
	    outer.style.position = 'absolute';
	    outer.style.top = '0px';
	    outer.style.left = '0px';
	    outer.style.visibility = 'hidden';
	    outer.style.width = '200px';
	    outer.style.height = '150px';
	    outer.style.overflow = 'hidden';
	    outer.appendChild(inner);

	    document.body.appendChild(outer);

	    var w1 = inner.offsetWidth;
	    outer.style.overflow = 'scroll';
	    var w2 = inner.offsetWidth;
	    if (w1 == w2) {
	        w2 = outer.clientWidth; // for IE i think
	    }

	    document.body.removeChild(outer);
	    return w1 - w2;
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = {
	    onDoubleClick: onDoubleClick,
	    onPinch: onPinch,
	    onDoubleTap: onDoubleTap
	};

	var DOUBLE_CLICK_TIMEOUT = 500;

	var DOUBLE_TAP_DISTANCE_THRESHOLD = 50;
	var DOUBLE_TAP_TIMEOUT = 250;

	function onDoubleClick(elem, callback)
	{
	    elem.on('dblclick', function (event)
	    {
	        if (!event.ctrlKey)
	        {
	            callback(event, getRelativeOffset(event.currentTarget, event));
	        }
	    });

	    // Handle the control key for macs (in conjunction with double-clicking)
	    // FIXME: Does a click get handled with ctrl pressed on non-Macs?
	    var tracker = createDoubleEventTracker(DOUBLE_CLICK_TIMEOUT);

	    elem.on('contextmenu', function (event)
	    {
	        event.preventDefault();

	        if (event.ctrlKey)
	        {
	            if (tracker.isTriggered())
	            {
	                tracker.reset();
	                callback(event, getRelativeOffset(event.currentTarget, event));
	            }
	            else
	            {
	                tracker.trigger();
	            }
	        }
	    });
	}

	function onPinch(elem, callback)
	{
	    var startDistance = 0;

	    elem.on('touchstart', function(event)
	    {
	        // Prevent mouse event from firing
	        event.preventDefault();

	        if (event.originalEvent.touches.length === 2)
	        {
	            startDistance = distance(
	                event.originalEvent.touches[0].clientX,
	                event.originalEvent.touches[0].clientY,
	                event.originalEvent.touches[1].clientX,
	                event.originalEvent.touches[1].clientY
	            );
	        }
	    });

	    elem.on('touchmove', function(event)
	    {
	        // Prevent mouse event from firing
	        event.preventDefault();

	        if (event.originalEvent.touches.length === 2)
	        {
	            var touches = event.originalEvent.touches;

	            var moveDistance = distance(
	                touches[0].clientX,
	                touches[0].clientY,
	                touches[1].clientX,
	                touches[1].clientY
	            );

	            var zoomDelta = moveDistance - startDistance;

	            if (Math.abs(zoomDelta) > 0)
	            {
	                var touchCenter = {
	                    pageX: (touches[0].clientX + touches[1].clientX) / 2,
	                    pageY: (touches[0].clientY + touches[1].clientY) / 2
	                };

	                callback(event, getRelativeOffset(event.currentTarget, touchCenter), startDistance, moveDistance);
	            }
	        }
	    });
	}

	function onDoubleTap(elem, callback)
	{
	    var tracker = createDoubleEventTracker(DOUBLE_TAP_TIMEOUT);
	    var firstTap = null;

	    elem.on('touchend', function (event)
	    {
	        // Prevent mouse event from firing
	        event.preventDefault();

	        if (tracker.isTriggered())
	        {
	            tracker.reset();

	            // Doubletap has occurred
	            var secondTap = {
	                pageX: event.originalEvent.changedTouches[0].clientX,
	                pageY: event.originalEvent.changedTouches[0].clientY
	            };

	            // If first tap is close to second tap (prevents interference with scale event)
	            var tapDistance = distance(firstTap.pageX, firstTap.pageY, secondTap.pageX, secondTap.pageY);

	            // TODO: Could give something higher-level than secondTap to callback
	            if (tapDistance < DOUBLE_TAP_DISTANCE_THRESHOLD)
	                callback(event, getRelativeOffset(event.currentTarget, secondTap));

	            firstTap = null;
	        }
	        else
	        {
	            firstTap = {
	                pageX: event.originalEvent.changedTouches[0].clientX,
	                pageY: event.originalEvent.changedTouches[0].clientY
	            };

	            tracker.trigger();
	        }
	    });
	}

	// Pythagorean theorem to get the distance between two points (used for
	// calculating finger distance for double-tap and pinch-zoom)
	function distance(x1, y1, x2, y2)
	{
	    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
	}

	// Utility to keep track of whether an event has been triggered twice
	// during a a given duration
	function createDoubleEventTracker(timeoutDuration)
	{
	    var triggered = false;
	    var timeoutId = null;

	    return {
	        trigger: function ()
	        {
	            triggered = true;
	            resetTimeout();
	            timeoutId = setTimeout(function ()
	            {
	                triggered = false;
	                timeoutId = null;
	            }, timeoutDuration);
	        },
	        isTriggered: function ()
	        {
	            return triggered;
	        },
	        reset: function ()
	        {
	            triggered = false;
	            resetTimeout();
	        }
	    };

	    function resetTimeout()
	    {
	        if (timeoutId !== null)
	        {
	            clearTimeout(timeoutId);
	            timeoutId = null;
	        }
	    }
	}

	function getRelativeOffset(elem, pageCoords)
	{
	    var bounds = elem.getBoundingClientRect();

	    return {
	        left: pageCoords.pageX - bounds.left,
	        top: pageCoords.pageY - bounds.top
	    };
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var maxBy = __webpack_require__(19);
	var PageToolsOverlay = __webpack_require__(21);

	module.exports = DocumentHandler;

	function DocumentHandler(viewerCore)
	{
	    this._viewerCore = viewerCore;
	    this._viewerState = viewerCore.getInternalState();
	    this._overlays = [];

	    if (viewerCore.getPageTools().length)
	    {
	        var numPages = viewerCore.getSettings().numPages;

	        for (var i=0; i < numPages; i++)
	        {
	            var overlay = new PageToolsOverlay(i, viewerCore);
	            this._overlays.push(overlay);
	            viewerCore.addPageOverlay(overlay);
	        }
	    }
	}

	// USER EVENTS
	DocumentHandler.prototype.onDoubleClick = function (event, coords)
	{
	    var settings = this._viewerCore.getSettings();
	    var newZoomLevel = event.ctrlKey ? settings.zoomLevel - 1 : settings.zoomLevel + 1;

	    var position = this._viewerCore.getPagePositionAtViewportOffset(coords);

	    this._viewerCore.zoom(newZoomLevel, position);
	};

	DocumentHandler.prototype.onPinch = function (event, coords, startDistance, endDistance)
	{
	    // FIXME: Do this check in a way which is less spaghetti code-y
	    var viewerState = this._viewerCore.getInternalState();
	    var settings = this._viewerCore.getSettings();

	    var newZoomLevel = Math.log(Math.pow(2, settings.zoomLevel) * endDistance / (startDistance * Math.log(2))) / Math.log(2);
	    newZoomLevel = Math.max(settings.minZoomLevel, newZoomLevel);
	    newZoomLevel = Math.min(settings.maxZoomLevel, newZoomLevel);

	    if (newZoomLevel === settings.zoomLevel)
	        return;

	    var position = this._viewerCore.getPagePositionAtViewportOffset(coords);

	    var layout = this._viewerCore.getCurrentLayout();
	    var centerOffset = layout.getPageToViewportCenterOffset(position.anchorPage, viewerState.viewport);
	    var scaleRatio = 1 / Math.pow(2, settings.zoomLevel - newZoomLevel);

	    this._viewerCore.reload({
	        zoomLevel: newZoomLevel,
	        goDirectlyTo: position.anchorPage,
	        horizontalOffset: (centerOffset.x - position.offset.left) + position.offset.left * scaleRatio,
	        verticalOffset: (centerOffset.y - position.offset.top) + position.offset.top * scaleRatio
	    });
	};

	// VIEW EVENTS
	DocumentHandler.prototype.onViewWillLoad = function ()
	{
	    this._viewerCore.publish('DocumentWillLoad', this._viewerCore.getSettings());
	};

	DocumentHandler.prototype.onViewDidLoad = function ()
	{
	    // TODO: Should only be necessary to handle changes on view update, not
	    // initial load
	    this._handleZoomLevelChange();

	    var currentPageIndex = this._viewerCore.getSettings().currentPageIndex;
	    var fileName = this._viewerCore.getPageName(currentPageIndex);
	    this._viewerCore.publish("DocumentDidLoad", currentPageIndex, fileName);
	};

	DocumentHandler.prototype.onViewDidUpdate = function (renderedPages, targetPage)
	{
	    var currentPage = (targetPage !== null) ?
	        targetPage :
	        getCentermostPage(renderedPages, this._viewerCore.getCurrentLayout(), this._viewerCore.getViewport());

	    // Don't change the current page if there is no page in the viewport
	    // FIXME: Would be better to fall back to the page closest to the viewport
	    if (currentPage !== null)
	        this._viewerCore.setCurrentPage(currentPage);

	    if (targetPage !== null)
	        this._viewerCore.publish("ViewerDidJump", targetPage);

	    this._handleZoomLevelChange();
	};

	DocumentHandler.prototype._handleZoomLevelChange = function ()
	{
	    var viewerState = this._viewerState;
	    var zoomLevel = viewerState.options.zoomLevel;

	    // If this is not the initial load, trigger the zoom events
	    if (viewerState.oldZoomLevel !== zoomLevel && viewerState.oldZoomLevel >= 0)
	    {
	        if (viewerState.oldZoomLevel < zoomLevel)
	        {
	            this._viewerCore.publish("ViewerDidZoomIn", zoomLevel);
	        }
	        else
	        {
	            this._viewerCore.publish("ViewerDidZoomOut", zoomLevel);
	        }

	        this._viewerCore.publish("ViewerDidZoom", zoomLevel);
	    }

	    viewerState.oldZoomLevel = zoomLevel;
	};

	DocumentHandler.prototype.destroy = function ()
	{
	    this._overlays.forEach(function (overlay)
	    {
	        this._viewerCore.removePageOverlay(overlay);
	    }, this);
	};

	function getCentermostPage(renderedPages, layout, viewport)
	{
	    var centerY = viewport.top + (viewport.height / 2);
	    var centerX = viewport.left + (viewport.width / 2);

	    // Find the minimum distance from the viewport center to a page.
	    // Compute minus the squared distance from viewport center to the page's border.
	    // http://gamedev.stackexchange.com/questions/44483/how-do-i-calculate-distance-between-a-point-and-an-axis-aligned-rectangle
	    var centerPage = maxBy(renderedPages, function (pageIndex)
	    {
	        var dims = layout.getPageDimensions(pageIndex);
	        var imageOffset = layout.getPageOffset(pageIndex, {excludePadding: false});

	        var midX = imageOffset.left + (dims.height / 2);
	        var midY = imageOffset.top + (dims.width / 2);

	        var dx = Math.max(Math.abs(centerX - midX) - (dims.width / 2), 0);
	        var dy = Math.max(Math.abs(centerY - midY) - (dims.height / 2), 0);

	        return -(dx * dx + dy * dy);
	    });

	    return centerPage != null ? centerPage : null;
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/,
	    reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/** Built-in value references. */
	var Symbol = root.Symbol,
	    Uint8Array = root.Uint8Array,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable,
	    splice = arrayProto.splice;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView'),
	    Map = getNative(root, 'Map'),
	    Promise = getNative(root, 'Promise'),
	    Set = getNative(root, 'Set'),
	    WeakMap = getNative(root, 'WeakMap'),
	    nativeCreate = getNative(Object, 'create');

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	}

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache) {
	    var pairs = cache.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      return this;
	    }
	    cache = this.__data__ = new MapCache(pairs);
	  }
	  cache.set(key, value);
	  return this;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	/**
	 * The base implementation of methods like `_.max` and `_.min` which accepts a
	 * `comparator` to determine the extremum value.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The iteratee invoked per iteration.
	 * @param {Function} comparator The comparator used to compare values.
	 * @returns {*} Returns the extremum value.
	 */
	function baseExtremum(array, iteratee, comparator) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    var value = array[index],
	        current = iteratee(value);

	    if (current != null && (computed === undefined
	          ? (current === current && !isSymbol(current))
	          : comparator(current, computed)
	        )) {
	      var computed = current,
	          result = value;
	    }
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}

	/**
	 * The base implementation of `_.gt` which doesn't coerce arguments.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if `value` is greater than `other`,
	 *  else `false`.
	 */
	function baseGt(value, other) {
	  return value > other;
	}

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!seen.has(othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.add(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge < 14, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var result,
	      index = -1,
	      length = path.length;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result) {
	    return result;
	  }
	  var length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function(string) {
	  string = toString(string);

	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	/**
	 * This method is like `_.max` except that it accepts `iteratee` which is
	 * invoked for each element in `array` to generate the criterion by which
	 * the value is ranked. The iteratee is invoked with one argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Math
	 * @param {Array} array The array to iterate over.
	 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	 * @returns {*} Returns the maximum value.
	 * @example
	 *
	 * var objects = [{ 'n': 1 }, { 'n': 2 }];
	 *
	 * _.maxBy(objects, function(o) { return o.n; });
	 * // => { 'n': 2 }
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.maxBy(objects, 'n');
	 * // => { 'n': 2 }
	 */
	function maxBy(array, iteratee) {
	  return (array && array.length)
	    ? baseExtremum(array, baseIteratee(iteratee, 2), baseGt)
	    : undefined;
	}

	module.exports = maxBy;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(20)(module)))

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var elt = __webpack_require__(8);

	module.exports = PageToolsOverlay;

	function PageToolsOverlay(pageIndex, viewerCore)
	{
	    this.page = pageIndex;

	    this._viewerCore = viewerCore;

	    this._innerElement = viewerCore.getSettings().innerElement;
	    this._pageToolsElem = null;
	}

	PageToolsOverlay.prototype.mount = function ()
	{
	    if (this._pageToolsElem === null)
	    {
	        var buttons = this._initializePageToolButtons();

	        this._pageToolsElem = elt('div', {class: 'diva-page-tools-wrapper'},
	            elt('div', {class: 'diva-page-tools'}, buttons)
	        );
	    }

	    this.refresh();
	    this._innerElement.appendChild(this._pageToolsElem);
	};

	PageToolsOverlay.prototype._initializePageToolButtons = function ()
	{
	    // Callback parameters
	    var settings = this._viewerCore.getSettings();
	    var publicInstance = this._viewerCore.getPublicInstance();
	    var pageIndex = this.page;

	    return this._viewerCore.getPageTools().map(function (plugin)
	    {
	        // If the title text is undefined, use the name of the plugin
	        var titleText = plugin.titleText || plugin.pluginName[0].toUpperCase() + plugin.pluginName.substring(1) + " plugin";

	        var button = elt('div', {
	            class: 'diva-' + plugin.pluginName + '-icon',
	            title: titleText
	        });

	        button.addEventListener('click', function (event)
	        {
	            plugin.handleClick.call(this, event, settings, publicInstance, pageIndex);
	        }, false);

	        button.addEventListener('touchend', function (event)
	        {
	            // Prevent firing of emulated mouse events
	            event.preventDefault();

	            plugin.handleClick.call(this, event, settings, publicInstance, pageIndex);
	        }, false);

	        return button;
	    }, this);
	};

	PageToolsOverlay.prototype.unmount = function ()
	{
	    this._innerElement.removeChild(this._pageToolsElem);
	};

	PageToolsOverlay.prototype.refresh = function ()
	{
	    var pos = this._viewerCore.getPageRegion(this.page, {
	        excludePadding: true,
	        incorporateViewport: true
	    });

	    this._pageToolsElem.style.top = pos.top + 'px';
	    this._pageToolsElem.style.left = pos.left + 'px';
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var maxBy = __webpack_require__(19);

	module.exports = GridHandler;

	function GridHandler(viewerCore)
	{
	    this._viewerCore = viewerCore;
	}

	// USER EVENTS
	GridHandler.prototype.onDoubleClick = function (event, coords)
	{
	    var position = this._viewerCore.getPagePositionAtViewportOffset(coords);

	    var layout = this._viewerCore.getCurrentLayout();
	    var viewport = this._viewerCore.getViewport();
	    var pageToViewportCenterOffset = layout.getPageToViewportCenterOffset(position.anchorPage, viewport);

	    this._viewerCore.reload({
	        inGrid: false,
	        goDirectlyTo: position.anchorPage,
	        horizontalOffset: pageToViewportCenterOffset.x + position.offset.left,
	        verticalOffset: pageToViewportCenterOffset.y + position.offset.top
	    });
	};

	GridHandler.prototype.onPinch = function ()
	{
	    this._viewerCore.reload({ inGrid: false });
	};

	// VIEW EVENTS
	GridHandler.prototype.onViewWillLoad = function ()
	{
	    // FIXME(wabain): Should something happen here?
	    /* No-op */
	};

	GridHandler.prototype.onViewDidLoad = function ()
	{
	    // FIXME(wabain): Should something happen here?
	    /* No-op */
	};

	GridHandler.prototype.onViewDidUpdate = function (renderedPages, targetPage)
	{
	    if (targetPage !== null)
	    {
	        this._viewerCore.setCurrentPage(targetPage);
	        return;
	    }

	    // Select the current page from the first row if it is fully visible, or from
	    // the second row if it is fully visible, or from the centermost row otherwise.
	    // If the current page is in that group then don't change it. Otherwise, set
	    // the current page to the group's first page.

	    var layout = this._viewerCore.getCurrentLayout();
	    var groups = [];
	    renderedPages.forEach(function (pageIndex)
	    {
	        var group = layout.getPageInfo(pageIndex).group;
	        if (groups.length === 0 || group !== groups[groups.length - 1])
	            groups.push(group);
	    });

	    var viewport = this._viewerCore.getViewport();
	    var chosenGroup;

	    if (groups.length === 1 || groups[0].region.top >= viewport.top)
	        chosenGroup = groups[0];
	    else if (groups[1].region.bottom <= viewport.bottom)
	        chosenGroup = groups[1];
	    else
	        chosenGroup = getCentermostGroup(groups, viewport);

	    var currentPage = this._viewerCore.getSettings().currentPageIndex;

	    var hasCurrentPage = chosenGroup.pages.some(function (page)
	    {
	        return page.index === currentPage;
	    });

	    if (!hasCurrentPage)
	        this._viewerCore.setCurrentPage(chosenGroup.pages[0].index);
	};

	GridHandler.prototype.destroy = function ()
	{
	    // No-op
	};

	function getCentermostGroup(groups, viewport)
	{
	    var viewportMiddle = viewport.top + viewport.height / 2;

	    return maxBy(groups, function (group)
	    {
	        var groupMiddle = group.region.top + group.dimensions.height / 2;
	        return -Math.abs(viewportMiddle - groupMiddle);
	    });
	}


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = PageOverlayManager;

	/**
	 * Manages a collection of page overlays, which implement a low-level
	 * API for synchronizing HTML pages to the canvas. Each overlay needs
	 * to implement the following protocol:
	 *
	 *   mount(): Called when a page is first rendered
	 *   refresh(): Called when a page is moved
	 *   unmount(): Called when a previously rendered page has stopped being rendered
	 *
	 * @class
	 */

	function PageOverlayManager()
	{
	    this._pages = {};
	    this._renderedPages = [];
	    this._renderedPageMap = {};
	}

	PageOverlayManager.prototype.addOverlay = function (overlay)
	{
	    var overlaysByPage = this._pages[overlay.page] || (this._pages[overlay.page] = []);

	    overlaysByPage.push(overlay);

	    if (this._renderedPageMap[overlay.page])
	        overlay.mount();
	};

	PageOverlayManager.prototype.removeOverlay = function (overlay)
	{
	    var page = overlay.page;
	    var overlaysByPage = this._pages[page];

	    if (!overlaysByPage)
	        return;

	    var overlayIndex = overlaysByPage.indexOf(overlay);

	    if (overlayIndex === -1)
	        return;

	    if (this._renderedPageMap[page])
	        overlaysByPage[overlayIndex].unmount();

	    overlaysByPage.splice(overlayIndex, 1);

	    if (overlaysByPage.length === 0)
	        delete this._pages[page];
	};

	PageOverlayManager.prototype.updateOverlays = function (renderedPages)
	{
	    var previouslyRendered = this._renderedPages;
	    var newRenderedMap = {};

	    renderedPages.forEach(function (pageIndex)
	    {
	        newRenderedMap[pageIndex] = true;

	        if (!this._renderedPageMap[pageIndex])
	        {
	            this._renderedPageMap[pageIndex] = true;

	            this._invokeOnOverlays(pageIndex, function (overlay)
	            {
	                overlay.mount();
	            });
	        }
	    }, this);

	    previouslyRendered.forEach(function (pageIndex)
	    {
	        if (newRenderedMap[pageIndex])
	        {
	            this._invokeOnOverlays(pageIndex, function (overlay)
	            {
	                overlay.refresh();
	            });
	        }
	        else
	        {
	            delete this._renderedPageMap[pageIndex];

	            this._invokeOnOverlays(pageIndex, function (overlay)
	            {
	                overlay.unmount();
	            });
	        }
	    }, this);

	    this._renderedPages = renderedPages;
	};

	PageOverlayManager.prototype._invokeOnOverlays = function (pageIndex, func)
	{
	    var overlays = this._pages[pageIndex];
	    if (overlays)
	        overlays.forEach(func, this);
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var debug = __webpack_require__(25)('diva:Renderer');
	var debugPaints = __webpack_require__(25)('diva:Renderer:paints');

	var elt = __webpack_require__(8);

	var CompositeImage = __webpack_require__(29);
	var DocumentLayout = __webpack_require__(30);
	var ImageCache = __webpack_require__(31);
	var ImageRequestHandler = __webpack_require__(32);
	var InterpolateAnimation = __webpack_require__(33);

	var REQUEST_DEBOUNCE_INTERVAL = 250;


	module.exports = Renderer;

	function Renderer(options, hooks)
	{
	    this._viewport = options.viewport;
	    this._outerElement = options.outerElement;
	    this._documentElement = options.innerElement;

	    this._hooks = hooks || {};

	    this._canvas = elt('canvas', { class: 'diva-viewer-canvas' });
	    this._ctx = this._canvas.getContext('2d');

	    this.layout = null;

	    this._sourceResolver = null;
	    this._renderedPages = null;
	    this._config = null;
	    this._zoomLevel = null;
	    this._compositeImages = null;
	    this._renderedTiles = null;
	    this._animation = null;

	    // FIXME(wabain): What level should this be maintained at?
	    // Diva global?
	    this._cache = new ImageCache();
	    this._pendingRequests = {};
	}

	Renderer.getCompatibilityErrors = function ()
	{
	    if (typeof HTMLCanvasElement !== 'undefined')
	        return null;

	    return [
	        'Your browser lacks support for the ', elt('pre', 'canvas'),
	        ' element. Please upgrade your browser.'
	    ];
	};

	Renderer.prototype.load = function (config, viewportPosition, sourceResolver)
	{
	    this._clearAnimation();

	    if (this._hooks.onViewWillLoad)
	        this._hooks.onViewWillLoad();

	    this._sourceResolver = sourceResolver;
	    this._config = config;
	    this._compositeImages = {};
	    this._setLayoutToZoomLevel(viewportPosition.zoomLevel);

	    // FIXME(wabain): Remove this when there's more confidence the check shouldn't be needed
	    if (!this.layout.getPageInfo(viewportPosition.anchorPage))
	        throw new Error('invalid page: ' + viewportPosition.anchorPage);

	    if (this._canvas.width !== this._viewport.width || this._canvas.height !== this._viewport.height)
	    {
	        debug('Canvas dimension change: (%s, %s) -> (%s, %s)', this._canvas.width, this._canvas.height,
	            this._viewport.width, this._viewport.height);

	        this._canvas.width = this._viewport.width;
	        this._canvas.height = this._viewport.height;
	    } else {
	        debug('Reload, no size change');
	    }

	    // FIXME: What hooks should be called here?
	    this.goto(viewportPosition.anchorPage, viewportPosition.verticalOffset, viewportPosition.horizontalOffset);

	    if (this._canvas.parentNode !== this._outerElement)
	        this._outerElement.insertBefore(this._canvas, this._outerElement.firstChild);

	    if (this._hooks.onViewDidLoad)
	        this._hooks.onViewDidLoad();
	};

	Renderer.prototype._setViewportPosition = function (viewportPosition)
	{
	    if (viewportPosition.zoomLevel !== this._zoomLevel)
	    {
	        if (this._zoomLevel === null)
	            throw new TypeError('The current view is not zoomable');
	        else if (viewportPosition.zoomLevel === null)
	            throw new TypeError('The current view requires a zoom level');

	        this._setLayoutToZoomLevel(viewportPosition.zoomLevel);
	    }

	    this._goto(viewportPosition.anchorPage, viewportPosition.verticalOffset, viewportPosition.horizontalOffset);
	};

	Renderer.prototype._setLayoutToZoomLevel = function (zoomLevel)
	{
	    this.layout = new DocumentLayout(this._config, zoomLevel);
	    this._zoomLevel = zoomLevel;

	    elt.setAttributes(this._documentElement, {
	        style: {
	            height: this.layout.dimensions.height + 'px',
	            width: this.layout.dimensions.width + 'px'
	        }
	    });

	    this._viewport.setInnerDimensions(this.layout.dimensions);
	};

	Renderer.prototype.adjust = function (direction)
	{
	    this._clearAnimation();

	    this._render(direction);

	    if (this._hooks.onViewDidUpdate)
	    {
	        this._hooks.onViewDidUpdate(this._renderedPages.slice(), null);
	    }
	};

	// FIXME(wabain): Remove the direction argument if it doesn't end up being needed.
	Renderer.prototype._render = function (direction) // jshint ignore:line
	{
	    var newRenderedPages = [];
	    this.layout.pageGroups.forEach(function (group)
	    {
	        if (!this._viewport.intersectsRegion(group.region))
	            return;

	        var visiblePages = group.pages
	            .filter(function (page)
	            {
	                return this.isPageVisible(page.index);
	            }, this)
	            .map(function (page)
	            {
	                return page.index;
	            });

	        newRenderedPages.push.apply(newRenderedPages, visiblePages);
	    }, this);

	    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
	    this._paintOutline(newRenderedPages);

	    newRenderedPages.forEach(function (pageIndex)
	    {
	        if (!this._compositeImages[pageIndex])
	        {
	            var page = this.layout.getPageInfo(pageIndex);
	            var zoomLevels = this._sourceResolver.getAllZoomLevelsForPage(page);
	            var composite = new CompositeImage(zoomLevels);
	            composite.updateFromCache(this._cache);
	            this._compositeImages[pageIndex] = composite;
	        }
	    }, this);

	    this._initiateTileRequests(newRenderedPages);

	    var changes = findChanges(this._renderedPages || [], newRenderedPages);

	    changes.removed.forEach(function (pageIndex)
	    {
	        delete this._compositeImages[pageIndex];
	    }, this);

	    this._renderedPages = newRenderedPages;
	    this._paint();

	    if (this._hooks.onPageWillLoad)
	    {
	        changes.added.forEach(function (pageIndex)
	        {
	            this._hooks.onPageWillLoad(pageIndex);
	        }, this);
	    }
	};

	Renderer.prototype._paint = function ()
	{
	    debug('Repainting');

	    var renderedTiles = [];

	    this._renderedPages.forEach(function (pageIndex)
	    {
	        this._compositeImages[pageIndex].getTiles(this._zoomLevel).forEach(function (source)
	        {
	            var scaled = getScaledTileRecord(source, this._zoomLevel);

	            if (this._isTileVisible(pageIndex, scaled))
	            {
	                renderedTiles.push(source.url);
	                this._drawTile(pageIndex, scaled, this._cache.get(source.url));
	            }
	        }, this);
	    }, this);

	    var cache = this._cache;

	    var changes = findChanges(this._renderedTiles || [], renderedTiles);

	    changes.added.forEach(function (url)
	    {
	        cache.acquire(url);
	    });

	    changes.removed.forEach(function (url)
	    {
	        cache.release(url);
	    });

	    if (changes.removed)
	    {
	        // FIXME: Should only need to update the composite images
	        // for which tiles were removed
	        this._renderedPages.forEach(function (pageIndex)
	        {
	            this._compositeImages[pageIndex].updateFromCache(this._cache);
	        }, this);
	    }

	    this._renderedTiles = renderedTiles;
	};

	// Paint a page outline while the tiles are loading.
	Renderer.prototype._paintOutline = function (pages)
	{
	    pages.forEach(function (pageIndex)
	    {
	        var pageInfo = this.layout.getPageInfo(pageIndex);
	        var pageOffset = this._getImageOffset(pageIndex);

	        // Ensure the document is drawn to the center of the viewport
	        var viewportPaddingX = Math.max(0, (this._viewport.width - this.layout.dimensions.width) / 2);
	        var viewportPaddingY = Math.max(0, (this._viewport.height - this.layout.dimensions.height) / 2);

	        var viewportOffsetX = pageOffset.left - this._viewport.left + viewportPaddingX;
	        var viewportOffsetY = pageOffset.top - this._viewport.top + viewportPaddingY;

	        var destXOffset = viewportOffsetX < 0 ? -viewportOffsetX : 0;
	        var destYOffset = viewportOffsetY < 0 ? -viewportOffsetY : 0;

	        var canvasX = Math.max(0, viewportOffsetX);
	        var canvasY = Math.max(0, viewportOffsetY);

	        var destWidth = pageInfo.dimensions.width - destXOffset;
	        var destHeight = pageInfo.dimensions.height - destYOffset;

	        this._ctx.strokeStyle = '#AAA';
	        // In order to get a 1px wide line using strokes, we need to start at a 'half pixel'
	        this._ctx.strokeRect(canvasX + 0.5, canvasY + 0.5, destWidth, destHeight);
	    }, this);
	};

	// This method should be sent all visible pages at once because it will initiate
	// all image requests and cancel any remaining image requests. In the case that
	// a request is ongoing and the tile is still visible in the viewport, the old request
	// is kept active instead of restarting it. The image requests are given a timeout
	// before loading in order to debounce them and have a small reaction time
	// to cancel them and avoid useless requests.
	Renderer.prototype._initiateTileRequests = function(pages)
	{
	    // Only requests in this object are kept alive, since all others are not visible in the viewport
	    var newPendingRequests = {};

	    // Used later as a closure to initiate the image requests with the right source and pageIndex
	    var initiateRequest = function (source, pageIndex)
	    {
	        var composite = this._compositeImages[pageIndex];

	        newPendingRequests[source.url] = new ImageRequestHandler({
	            url: source.url,
	            timeoutTime: REQUEST_DEBOUNCE_INTERVAL,
	            load: function (img)
	            {
	                delete this._pendingRequests[source.url];
	                this._cache.put(source.url, img);

	                // Awkward way to check for updates
	                if (composite === this._compositeImages[pageIndex])
	                {
	                    composite.updateWithLoadedUrls([source.url]);

	                    if (this._isTileForSourceVisible(pageIndex, source))
	                        this._paint();
	                    else
	                        debugPaints('Page %s, tile %s no longer visible on image load', pageIndex, source.url);
	                }
	            }.bind(this),
	            error: function ()
	            {
	                // TODO: Could make a limited number of retries, etc.
	                delete this._pendingRequests[source.url];
	            }.bind(this)
	        });
	    }.bind(this);

	    for (var i = 0; i < pages.length; i++)
	    {
	        var pageIndex = pages[i];
	        var tiles = this._sourceResolver.getBestZoomLevelForPage(this.layout.getPageInfo(pageIndex)).tiles;

	        for (var j = 0; j < tiles.length; j++)
	        {
	            var source = tiles[j];
	            if (this._cache.has(source.url) || !this._isTileForSourceVisible(pageIndex, source))
	                continue;

	            // Don't create a new request if the tile is already being loaded
	            if (this._pendingRequests[source.url])
	            {
	                newPendingRequests[source.url] = this._pendingRequests[source.url];
	                delete this._pendingRequests[source.url];
	                continue;
	            }

	            // Use a closure since the load and error methods are going to be called later and
	            // we need to keep the right reference to the source and the page index
	            initiateRequest(source, pageIndex);
	        }
	    }

	    for (var url in this._pendingRequests)
	        this._pendingRequests[url].abort();
	    this._pendingRequests = newPendingRequests;
	};

	Renderer.prototype._drawTile = function (pageIndex, scaledTile, img)
	{
	    var tileOffset = this._getTileToDocumentOffset(pageIndex, scaledTile);

	    // Ensure the document is drawn to the center of the viewport
	    var viewportPaddingX = Math.max(0, (this._viewport.width - this.layout.dimensions.width) / 2);
	    var viewportPaddingY = Math.max(0, (this._viewport.height - this.layout.dimensions.height) / 2);

	    var viewportOffsetX = tileOffset.left - this._viewport.left + viewportPaddingX;
	    var viewportOffsetY = tileOffset.top - this._viewport.top + viewportPaddingY;

	    var destXOffset = viewportOffsetX < 0 ? -viewportOffsetX : 0;
	    var destYOffset = viewportOffsetY < 0 ? -viewportOffsetY : 0;

	    var sourceXOffset = destXOffset / scaledTile.scaleRatio;
	    var sourceYOffset = destYOffset / scaledTile.scaleRatio;

	    var canvasX = Math.max(0, viewportOffsetX);
	    var canvasY = Math.max(0, viewportOffsetY);

	    // Ensure that the specified dimensions are no greater than the actual
	    // size of the image. Safari won't display the tile if they are.
	    var destWidth = Math.min(scaledTile.dimensions.width, img.width * scaledTile.scaleRatio) - destXOffset;
	    var destHeight = Math.min(scaledTile.dimensions.height, img.height * scaledTile.scaleRatio) - destYOffset;

	    var sourceWidth = destWidth / scaledTile.scaleRatio;
	    var sourceHeight = destHeight / scaledTile.scaleRatio;

	    if (debugPaints.enabled) {
	        debugPaints('Drawing page %s, tile %sx (%s, %s) from %s, %s to viewport at %s, %s, scale %s%%',
	            pageIndex,
	            scaledTile.sourceZoomLevel, scaledTile.row, scaledTile.col,
	            sourceXOffset, sourceYOffset,
	            canvasX, canvasY,
	            Math.round(scaledTile.scaleRatio * 100));
	    }

	    this._ctx.drawImage(
	        img,
	        sourceXOffset, sourceYOffset,
	        sourceWidth, sourceHeight,
	        canvasX, canvasY,
	        destWidth, destHeight);
	};

	Renderer.prototype._isTileForSourceVisible = function (pageIndex, tileSource)
	{
	    return this._isTileVisible(pageIndex, getScaledTileRecord(tileSource, this._zoomLevel));
	};

	Renderer.prototype._isTileVisible = function (pageIndex, scaledTile)
	{
	    var tileOffset = this._getTileToDocumentOffset(pageIndex, scaledTile);

	    // FIXME(wabain): This check is insufficient during a zoom transition
	    return this._viewport.intersectsRegion({
	        top: tileOffset.top,
	        bottom: tileOffset.top + scaledTile.dimensions.height,
	        left: tileOffset.left,
	        right: tileOffset.left + scaledTile.dimensions.width
	    });
	};

	Renderer.prototype._getTileToDocumentOffset = function (pageIndex, scaledTile)
	{
	    var imageOffset = this._getImageOffset(pageIndex);

	    return {
	        top: imageOffset.top + scaledTile.offset.top,
	        left: imageOffset.left + scaledTile.offset.left
	    };
	};

	Renderer.prototype._getImageOffset = function (pageIndex)
	{
	    return this.layout.getPageOffset(pageIndex, {excludePadding: true});
	};

	// TODO: Update signature
	Renderer.prototype.goto = function (pageIndex, verticalOffset, horizontalOffset)
	{
	    this._clearAnimation();
	    this._goto(pageIndex, verticalOffset, horizontalOffset);
	    if (this._hooks.onViewDidUpdate)
	    {
	        this._hooks.onViewDidUpdate(this._renderedPages.slice(), pageIndex);
	    }
	};

	Renderer.prototype._goto = function (pageIndex, verticalOffset, horizontalOffset)
	{
	    // FIXME(wabain): Move this logic to the viewer
	    var pageOffset = this.layout.getPageOffset(pageIndex);

	    var desiredVerticalCenter = pageOffset.top + verticalOffset;
	    var top = desiredVerticalCenter - parseInt(this._viewport.height / 2, 10);

	    var desiredHorizontalCenter = pageOffset.left + horizontalOffset;
	    var left = desiredHorizontalCenter - parseInt(this._viewport.width / 2, 10);

	    this._viewport.top = top;
	    this._viewport.left = left;

	    this._render(0);
	};

	Renderer.prototype.transitionViewportPosition = function (options)
	{
	    this._clearAnimation();

	    var getPosition = options.getPosition;
	    var self = this;

	    var onViewDidTransition = this._hooks.onViewDidTransition;

	    this._animation = InterpolateAnimation.animate({
	        duration: options.duration,
	        parameters: options.parameters,
	        onUpdate: function (values)
	        {
	            // TODO: Do image preloading, work with that
	            self._setViewportPosition(getPosition(values));

	            if (onViewDidTransition)
	                onViewDidTransition();
	        },
	        onEnd: function (info)
	        {
	            if (options.onEnd)
	                options.onEnd(info);

	            if (self._hooks.onViewDidUpdate && !info.interrupted)
	            {
	                self._hooks.onViewDidUpdate(self._renderedPages.slice(), null);
	            }
	        }
	    });
	};

	Renderer.prototype._clearAnimation = function ()
	{
	    if (this._animation)
	    {
	        this._animation.cancel();
	        this._animation = null;
	    }
	};

	Renderer.prototype.preload = function ()
	{
	    // TODO
	};

	Renderer.prototype.isPageVisible = function (pageIndex)
	{
	    if (!this.layout)
	        return false;

	    var page = this.layout.getPageInfo(pageIndex);

	    if (!page)
	        return false;

	    return this._viewport.intersectsRegion(this.layout.getPageRegion(pageIndex));
	};

	Renderer.prototype.getRenderedPages = function ()
	{
	    return this._renderedPages.slice();
	};

	Renderer.prototype.destroy = function ()
	{
	    this._clearAnimation();

	    // FIXME(wabain): I don't know if we should actually do this
	    Object.keys(this._pendingRequests).forEach(function (req)
	    {
	        var handler = this._pendingRequests[req];
	        delete this._pendingRequests[req];

	        handler.abort();
	    }, this);

	    this._canvas.parentNode.removeChild(this._canvas);
	};

	function getScaledTileRecord(source, scaleFactor)
	{
	    var scaleRatio;

	    if (scaleFactor === null)
	        scaleRatio = 1;
	    else
	        scaleRatio = Math.pow(2, scaleFactor - source.zoomLevel);

	    return {
	        sourceZoomLevel: source.zoomLevel,
	        scaleRatio: scaleRatio,
	        row: source.row,
	        col: source.col,
	        dimensions: {
	            width: source.dimensions.width * scaleRatio,
	            height: source.dimensions.height * scaleRatio
	        },
	        offset: {
	            left: source.offset.left * scaleRatio,
	            top: source.offset.top * scaleRatio
	        },
	        url: source.url
	    };
	}

	function findChanges(oldArray, newArray)
	{
	    if (oldArray === newArray)
	    {
	        return {
	            added: [],
	            removed: []
	        };
	    }

	    var removed = oldArray.filter(function (oldEntry)
	    {
	        return newArray.indexOf(oldEntry) === -1;
	    });

	    var added = newArray.filter(function (newEntry)
	    {
	        return oldArray.indexOf(newEntry) === -1;
	    });

	    return {
	        added: added,
	        removed: removed
	    };
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(27);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window && typeof window.process !== 'undefined' && window.process.type === 'renderer') {
	    return true;
	  }

	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && document && 'WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (typeof window !== 'undefined' && window && window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
	    // double check webkit in userAgent just in case we are in a worker
	    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return;

	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit')

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (!r && typeof process !== 'undefined' && 'env' in process) {
	    r = process.env.DEBUG;
	  }

	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)))

/***/ },
/* 26 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(28);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */

	exports.formatters = {};

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */

	function selectColor(namespace) {
	  var hash = 0, i;

	  for (i in namespace) {
	    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
	    hash |= 0; // Convert to 32bit integer
	  }

	  return exports.colors[Math.abs(hash) % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function createDebug(namespace) {

	  function debug() {
	    // disabled?
	    if (!debug.enabled) return;

	    var self = debug;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // turn the `arguments` into a proper Array
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %O
	      args.unshift('%O');
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    // apply env-specific formatting (colors, etc.)
	    exports.formatArgs.call(self, args);

	    var logFn = debug.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }

	  debug.namespace = namespace;
	  debug.enabled = exports.enabled(namespace);
	  debug.useColors = exports.useColors();
	  debug.color = selectColor(namespace);

	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
	    exports.init(debug);
	  }

	  return debug;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  exports.names = [];
	  exports.skips = [];

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000
	var m = s * 60
	var h = m * 60
	var d = h * 24
	var y = d * 365.25

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function (val, options) {
	  options = options || {}
	  var type = typeof val
	  if (type === 'string' && val.length > 0) {
	    return parse(val)
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ?
				fmtLong(val) :
				fmtShort(val)
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
	}

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str)
	  if (str.length > 10000) {
	    return
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
	  if (!match) {
	    return
	  }
	  var n = parseFloat(match[1])
	  var type = (match[2] || 'ms').toLowerCase()
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n
	    default:
	      return undefined
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd'
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h'
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm'
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's'
	  }
	  return ms + 'ms'
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms'
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) {
	    return
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's'
	}


/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = CompositeImage;

	/**
	 * @class CompositeImage
	 * @private
	 *
	 * Utility class to composite tiles into a complete image
	 * and track the rendered state of an image as new tiles
	 * load.
	 */

	/**
	 * @param levels {Array.<Array.<Tile>>}
	 * @constructor
	 */
	function CompositeImage(levels)
	{
	    this._levels = levels;  // Assume levels sorted high-res first
	    var urlsToTiles = this._urlsToTiles = {};

	    levels.forEach(function (level)
	    {
	        level.tiles.forEach(function (tile)
	        {
	            urlsToTiles[tile.url] = {
	                zoomLevel: level.zoomLevel,
	                row: tile.row,
	                col: tile.col
	            };
	        });
	    });

	    this.clear();
	}

	CompositeImage.prototype.clear = function ()
	{
	    var loadedByLevel = this._loadedByLevel = {};

	    this._levels.forEach(function (level)
	    {
	        loadedByLevel[level.zoomLevel] = new TileCoverageMap(level.rows, level.cols);
	    });
	};

	CompositeImage.prototype.getTiles = function (baseZoomLevel)
	{
	    var toRenderByLevel = [];
	    var highestZoomLevel = this._levels[0].zoomLevel;
	    var covered = new TileCoverageMap(this._levels[0].rows, this._levels[0].cols);

	    var bestLevelIndex;

	    // Default to the lowest zoom level
	    if (baseZoomLevel === null)
	    {
	        bestLevelIndex = 0;
	    }
	    else
	    {
	        var ceilLevel = Math.ceil(baseZoomLevel);
	        bestLevelIndex = findIndex(this._levels, function (level)
	        {
	            return level.zoomLevel <= ceilLevel;
	        });
	    }


	    // The best level, followed by higher-res levels in ascending order of resolution,
	    // followed by lower-res levels in descending order of resolution
	    var levelsByPreference = this._levels.slice(0, bestLevelIndex + 1).reverse()
	        .concat(this._levels.slice(bestLevelIndex + 1));

	    levelsByPreference.forEach(function (level)
	    {
	        var loaded = this._loadedByLevel[level.zoomLevel];

	        var additionalTiles = level.tiles.filter(function (tile)
	        {
	            return loaded.isLoaded(tile.row, tile.col);
	        });

	        // Filter out entirely covered tiles

	        // FIXME: Is it better to draw all of a partially covered tile,
	        // with some of it ultimately covered, or to pick out the region
	        // which needs to be drawn?
	        // See https://github.com/DDMAL/diva.js/issues/358

	        var scaleRatio = Math.pow(2, highestZoomLevel - level.zoomLevel);

	        additionalTiles = additionalTiles.filter(function (tile)
	        {
	            var isNeeded = false;

	            var highResRow = tile.row * scaleRatio;
	            var highResCol = tile.col * scaleRatio;

	            for (var i=0; i < scaleRatio; i++)
	            {
	                for (var j=0; j < scaleRatio; j++)
	                {
	                    if (!covered.isLoaded(highResRow + i, highResCol + j))
	                    {
	                        isNeeded = true;
	                        covered.set(highResRow + i, highResCol + j, true);
	                    }
	                }
	            }

	            return isNeeded;
	        });

	        toRenderByLevel.push(additionalTiles);
	    }, this);

	    // Less-preferred tiles should come first
	    toRenderByLevel.reverse();

	    var tiles = [];

	    toRenderByLevel.forEach(function (byLevel)
	    {
	        tiles.push.apply(tiles, byLevel);
	    });

	    return tiles;
	};

	/**
	 * Update the composite image to take into account all the URLs
	 * loaded in an image cache.
	 *
	 * @param cache {ImageCache}
	 */
	CompositeImage.prototype.updateFromCache = function (cache)
	{
	    this.clear();

	    this._levels.forEach(function (level)
	    {
	        var loaded = this._loadedByLevel[level.zoomLevel];

	        level.tiles.forEach(function (tile)
	        {
	            if (cache.has(tile.url))
	                loaded.set(tile.row, tile.col, true);
	        });
	    }, this);
	};

	CompositeImage.prototype.updateWithLoadedUrls = function (urls)
	{
	    urls.forEach(function (url)
	    {
	        var entry = this._urlsToTiles[url];
	        this._loadedByLevel[entry.zoomLevel].set(entry.row, entry.col, true);
	    }, this);
	};

	function TileCoverageMap(rows, cols)
	{
	    this._rows = rows;
	    this._cols = cols;

	    this._map = fill(rows).map(function ()
	    {
	        return fill(cols, false);
	    });
	}

	TileCoverageMap.prototype.isLoaded = function (row, col)
	{
	    // Return true for out of bounds tiles because they
	    // don't need to load. (Unfortunately this will also
	    // mask logical errors.)
	    if (row >= this._rows || col >= this._cols)
	        return true;

	    return this._map[row][col];
	};

	TileCoverageMap.prototype.set = function (row, col, value)
	{
	    this._map[row][col] = value;
	};

	function fill(count, value)
	{
	    var arr = new Array(count);

	    for (var i=0; i < count; i++)
	        arr[i] = value;

	    return arr;
	}

	function findIndex(array, predicate)
	{
	    var length = array.length;
	    for (var i = 0; i < length; i++)
	    {
	        if (predicate(array[i], i))
	            return i;
	    }

	    return -1;
	}


/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = DocumentLayout;

	/**
	 * Translate page layouts, as generated by page-layouts, into an
	 * object which computes layout information for the document as
	 * a whole.
	 */
	function DocumentLayout(config, zoomLevel)
	{
	    var computedLayout = getComputedLayout(config, zoomLevel);

	    this.dimensions = computedLayout.dimensions;
	    this.pageGroups = computedLayout.pageGroups;
	    this._pageLookup = getPageLookup(computedLayout.pageGroups);
	}

	/**
	 * @typedef {Object} PageInfo
	 * @property {number} index
	 * @property {{index, dimensions, pages, region, padding}} group
	 * @property {{height: number, width: number}} dimensions
	 * @property {{top: number, left: number}} groupOffset
	 */

	/**
	 * @param pageIndex
	 * @returns {PageInfo|null}
	 */
	DocumentLayout.prototype.getPageInfo = function (pageIndex)
	{
	    return this._pageLookup[pageIndex] || null;
	};

	/**
	 * Get the dimensions of a page
	 *
	 * @param pageIndex
	 * @returns {{height: number, width: number}}
	 */
	DocumentLayout.prototype.getPageDimensions = function (pageIndex)
	{
	    if (!this._pageLookup || !this._pageLookup[pageIndex])
	        return null;

	    var region = getPageRegionFromPageInfo(this._pageLookup[pageIndex]);

	    return {
	        height: region.bottom - region.top,
	        width: region.right - region.left
	    };
	};

	// TODO(wabain): Get rid of this; it's a subset of the page region, so
	// give that instead
	/**
	 * Get the top-left coordinates of a page, including*** padding
	 *
	 * @param pageIndex
	 * @param options
	 * @returns {{top: number, left: number} | null}
	 */
	DocumentLayout.prototype.getPageOffset = function (pageIndex, options)
	{
	    var region = this.getPageRegion(pageIndex, options);

	    if (!region)
	        return null;

	    return {
	        top: region.top,
	        left: region.left
	    };
	};

	DocumentLayout.prototype.getPageRegion = function (pageIndex, options)
	{
	    var pageInfo = this._pageLookup[pageIndex];

	    if (!pageInfo)
	        return null;

	    var region = getPageRegionFromPageInfo(pageInfo);

	    if (options && options.excludePadding)
	    {
	        // FIXME?
	        var padding = pageInfo.group.padding;

	        return {
	            top: region.top + padding.top,
	            left: region.left + padding.left,
	            bottom: region.bottom,
	            right: region.right
	        };
	    }

	    return region;
	};

	/**
	 * Get the distance from the top-right of the page to the center of the
	 * specified viewport region
	 *
	 * @param pageIndex
	 * @param viewport {{top: number, left: number, bottom: number, right: number}}
	 * @returns {{x: number, y: number}}
	 */
	DocumentLayout.prototype.getPageToViewportCenterOffset = function (pageIndex, viewport)
	{
	    var scrollLeft = viewport.left;
	    var elementWidth = viewport.right - viewport.left;

	    var offset = this.getPageOffset(pageIndex);

	    var x = scrollLeft - offset.left + parseInt(elementWidth / 2, 10);

	    var scrollTop = viewport.top;
	    var elementHeight = viewport.bottom - viewport.top;

	    var y = scrollTop - offset.top + parseInt(elementHeight / 2, 10);

	    return {
	        x: x,
	        y: y
	    };
	};

	function getPageRegionFromPageInfo(page)
	{
	    var top    = page.groupOffset.top  + page.group.region.top;
	    var bottom = top + page.dimensions.height;
	    var left   = page.groupOffset.left + page.group.region.left;
	    var right  = left + page.dimensions.width;

	    return {
	        top: top,
	        bottom: bottom,
	        left: left,
	        right: right
	    };
	}

	function getPageLookup(pageGroups)
	{
	    var pageLookup = {};

	    pageGroups.forEach(function (group)
	    {
	        group.pages.forEach(function (page)
	        {
	            pageLookup[page.index] = {
	                index: page.index,
	                group: group,
	                dimensions: page.dimensions,
	                groupOffset: page.groupOffset
	            };
	        });
	    });

	    return pageLookup;
	}

	function getComputedLayout(config, zoomLevel)
	{
	    var scaledLayouts = zoomLevel === null ? config.pageLayouts : getScaledPageLayouts(config, zoomLevel);

	    var documentSecondaryExtent = getExtentAlongSecondaryAxis(config, scaledLayouts);

	    // The current position in the document along the primary axis
	    var primaryDocPosition = config.verticallyOriented ?
	        config.padding.document.top :
	        config.padding.document.left;

	    var pageGroups = [];

	    // TODO: Use bottom, right as well
	    var pagePadding = {
	        top: config.padding.page.top,
	        left: config.padding.page.left
	    };

	    scaledLayouts.forEach(function (layout, index)
	    {
	        var top, left;

	        if (config.verticallyOriented)
	        {
	            top = primaryDocPosition;
	            left = (documentSecondaryExtent - layout.dimensions.width) / 2;
	        }
	        else
	        {
	            top = (documentSecondaryExtent - layout.dimensions.height) / 2;
	            left = primaryDocPosition;
	        }

	        var region = {
	            top: top,
	            bottom: top + pagePadding.top + layout.dimensions.height,
	            left: left,
	            right: left + pagePadding.left + layout.dimensions.width
	        };

	        pageGroups.push({
	            index: index,
	            dimensions: layout.dimensions,
	            pages: layout.pages,
	            region: region,
	            padding: pagePadding
	        });

	        primaryDocPosition = config.verticallyOriented ? region.bottom : region.right;
	    });

	    var height, width;

	    if (config.verticallyOriented)
	    {
	        height = primaryDocPosition + pagePadding.top;
	        width = documentSecondaryExtent;
	    }
	    else
	    {
	        height = documentSecondaryExtent;
	        width = primaryDocPosition + pagePadding.left;
	    }

	    return {
	        dimensions: {
	            height: height,
	            width: width
	        },
	        pageGroups: pageGroups
	    };
	}

	function getScaledPageLayouts(config, zoomLevel)
	{
	    var scaleRatio = Math.pow(2, zoomLevel - config.maxZoomLevel);

	    return config.pageLayouts.map(function (group)
	    {
	        return {
	            dimensions: scaleDimensions(group.dimensions, scaleRatio),
	            pages: group.pages.map(function (page)
	            {
	                return {
	                    index: page.index,
	                    groupOffset: {
	                        top: Math.floor(page.groupOffset.top * scaleRatio),
	                        left: Math.floor(page.groupOffset.left * scaleRatio)
	                    },
	                    dimensions: scaleDimensions(page.dimensions, scaleRatio)
	                };
	            })
	        };
	    });
	}

	function scaleDimensions(dimensions, scaleRatio)
	{
	    return {
	        height: Math.floor(dimensions.height * scaleRatio),
	        width: Math.floor(dimensions.width * scaleRatio)
	    };
	}

	function getExtentAlongSecondaryAxis(config, scaledLayouts)
	{
	    // Get the extent of the document along the secondary axis
	    var secondaryDim, secondaryPadding;
	    var docPadding = config.padding.document;

	    if (config.verticallyOriented)
	    {
	        secondaryDim = 'width';
	        secondaryPadding = docPadding.left + docPadding.right;
	    }
	    else
	    {
	        secondaryDim = 'height';
	        secondaryPadding = docPadding.top + docPadding.bottom;
	    }

	    return secondaryPadding + scaledLayouts.reduce(function (maxDim, layout)
	    {
	        return Math.max(layout.dimensions[secondaryDim], maxDim);
	    }, 0);
	}


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var debug = __webpack_require__(25)('diva:ImageCache');

	module.exports = ImageCache;

	/* FIXME(wabain): The caching strategy here is completely
	 * arbitrary and the implementation isn't especially efficient.
	 */

	var DEFAULT_MAX_KEYS = 100;

	function ImageCache(options)
	{
	    options = options || { maxKeys: DEFAULT_MAX_KEYS };
	    this.maxKeys = options.maxKeys || DEFAULT_MAX_KEYS;

	    this._held = {};
	    this._urls = {};
	    this._lru = [];
	}

	ImageCache.prototype.get = function (url)
	{
	    var record = this._urls[url];
	    return record ? record.img : null;
	};

	ImageCache.prototype.has = function (url)
	{
	    return !!this._urls[url];
	};

	ImageCache.prototype.put = function (url, img)
	{
	    var record = this._urls[url];
	    if (record)
	    {
	        // FIXME: Does this make sense for this use case?
	        record.img = img;
	        this._promote(record);
	    }
	    else
	    {
	        record = {
	            img: img,
	            url: url
	        };

	        this._urls[url] = record;
	        this._tryEvict(1);
	        this._lru.unshift(record);
	    }
	};

	ImageCache.prototype._promote = function (record)
	{
	    var index = this._lru.indexOf(record);
	    this._lru.splice(index, 1);
	    this._lru.unshift(record);
	};

	ImageCache.prototype._tryEvict = function (extraCapacity)
	{
	    var allowedEntryCount = this.maxKeys - extraCapacity;

	    if (this._lru.length <= allowedEntryCount)
	        return;

	    var evictionIndex = this._lru.length - 1;

	    for (;;)
	    {
	        var target = this._lru[evictionIndex];

	        if (!this._held[target.url])
	        {
	            debug('Evicting image %s', target.url);
	            this._lru.splice(evictionIndex, 1);
	            delete this._urls[target.url];

	            if (this._lru.length <= allowedEntryCount)
	                break;
	        }

	        if (evictionIndex === 0)
	        {
	            /* istanbul ignore next */
	            debug.enabled && debug('Cache overfull by %s (all entries are being held)',
	                this._lru.length - allowedEntryCount);

	            break;
	        }

	        evictionIndex--;
	    }
	};

	ImageCache.prototype.acquire = function (url)
	{
	    this._held[url] = (this._held[url] || 0) + 1;
	    this._promote(this._urls[url]);
	};

	ImageCache.prototype.release = function (url)
	{
	    var count = this._held[url];

	    if (count > 1)
	        this._held[url]--;
	    else
	        delete this._held[url];

	    this._tryEvict(0);
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var debug = __webpack_require__(25)('diva:ImageRequestHandler');

	module.exports = ImageRequestHandler;

	/**
	 * Handler for the request for an image tile
	 *
	 * @param url
	 * @param callback
	 * @constructor
	 */
	function ImageRequestHandler(options)
	{
	    this._url = options.url;
	    this._callback = options.load;
	    this._errorCallback = options.error;
	    this.timeoutTime = options.timeoutTime || 0;
	    this._aborted = this._complete = false;

	    //Use a timeout to allow the requests to be debounced (as they are in renderer)
	    this.timeout = setTimeout(function()
	    {
	        // Initiate the request
	        this._image = new Image();
	        this._image.crossOrigin = "anonymous";
	        this._image.onload = this._handleLoad.bind(this);
	        this._image.onerror = this._handleError.bind(this);
	        this._image.src = options.url;

	        debug('Requesting image %s', options.url);
	    }.bind(this), this.timeoutTime);
	}

	ImageRequestHandler.prototype.abort = function ()
	{
	    debug('Aborting request to %s', this._url);

	    clearTimeout(this.timeout);

	    // FIXME
	    // People on the Internet say that doing this {{should/should not}} abort the request. I believe
	    // it corresponds to what the WHATWG HTML spec says should happen when the UA
	    // updates the image data if selected source is null.
	    //
	    // Sources:
	    //
	    // https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element
	    // http://stackoverflow.com/questions/7390888/does-changing-the-src-attribute-of-an-image-stop-the-image-from-downloading
	    if (this._image)
	    {
	        this._image.onload = this._image.onerror = null;

	        this._image.src = '';
	    }

	    this._aborted = true;
	};

	ImageRequestHandler.prototype._handleLoad = function ()
	{
	    if (this._aborted)
	    {
	        console.error('ImageRequestHandler invoked on cancelled request for ' + this._url);
	        return;
	    }

	    if (this._complete)
	    {
	        console.error('ImageRequestHandler invoked on completed request for ' + this._url);
	        return;
	    }

	    this._complete = true;

	    debug('Received image %s', this._url);
	    this._callback(this._image);
	};

	ImageRequestHandler.prototype._handleError = function ()
	{
	    debug('Failed to load image %s', this._url);
	    this._errorCallback(this._image);
	};


/***/ },
/* 33 */
/***/ function(module, exports) {

	/* global performance */

	// TODO: requestAnimationFrame fallback

	module.exports = {
	    animate: animate,
	    easing: {
	        linear: linearEasing
	    }
	};

	function animate(options)
	{
	    var durationMs = options.duration;
	    var parameters = options.parameters;
	    var onUpdate = options.onUpdate;
	    var onEnd = options.onEnd;

	    // Setup
	    // Times are in milliseconds from a basically arbitrary start
	    var start = now();
	    var end = start + durationMs;

	    var tweenFns = {};
	    var values = {};
	    var paramKeys = Object.keys(parameters);

	    paramKeys.forEach(function (key)
	    {
	        var config = parameters[key];
	        tweenFns[key] = interpolate(config.from, config.to, config.easing || linearEasing);
	    });

	    // Run it!
	    var requestId = requestAnimationFrame(update);

	    return {
	        cancel: function ()
	        {
	            if (requestId !== null)
	            {
	                cancelAnimationFrame(requestId);
	                handleAnimationCompletion({
	                    interrupted: true
	                });
	            }
	        }
	    };

	    function update()
	    {
	        var current = now();
	        var elapsed = Math.min((current - start) / durationMs, 1);

	        updateValues(elapsed);
	        onUpdate(values);

	        if (current < end)
	            requestId = requestAnimationFrame(update);
	        else
	            handleAnimationCompletion({
	                interrupted: false
	            });
	    }

	    function updateValues(elapsed)
	    {
	        paramKeys.forEach(function (key)
	        {
	            values[key] = tweenFns[key](elapsed);
	        });
	    }

	    function handleAnimationCompletion(info)
	    {
	        requestId = null;

	        if (onEnd)
	            onEnd(info);
	    }
	}

	function interpolate(start, end, easing)
	{
	    return function (elapsed)
	    {
	        return start + (end - start) * easing(elapsed);
	    };
	}

	function linearEasing(e)
	{
	    return e;
	}

	var now;

	if (typeof performance !== 'undefined' && performance.now)
	{
	    now = function ()
	    {
	        return performance.now();
	    };
	}
	else
	{
	    now = function ()
	    {
	        return Date.now();
	    };
	}


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var getBookLayoutGroups = __webpack_require__(35);
	var getSinglesLayoutGroups = __webpack_require__(37);
	var getGridLayoutGroups = __webpack_require__(38);

	module.exports = getPageLayouts;

	/** Get the relative positioning of pages for the current view */
	function getPageLayouts(settings)
	{
	    if (settings.inGrid)
	    {
	        return getGridLayoutGroups(pluck(settings, [
	            'manifest',
	            'viewport',
	            'pagesPerRow',
	            'fixedHeightGrid',
	            'fixedPadding',
	            'showNonPagedPages'
	        ]));
	    }
	    else
	    {
	        var config = pluck(settings, ['manifest', 'verticallyOriented', 'showNonPagedPages']);

	        if (settings.inBookLayout)
	            return getBookLayoutGroups(config);
	        else
	            return getSinglesLayoutGroups(config);
	    }
	}

	function pluck(obj, keys)
	{
	    var out = {};
	    keys.forEach(function (key)
	    {
	        out[key] = obj[key];
	    });
	    return out;
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var getPageDimensions = __webpack_require__(36);

	module.exports = getBookLayoutGroups;

	function getBookLayoutGroups(viewerConfig)
	{
	    var groupings = getGroupings(viewerConfig);

	    return groupings.map(function (grouping)
	    {
	        return getGroupLayoutsFromPageGrouping(viewerConfig, grouping);
	    });
	}

	function getGroupings(viewerConfig)
	{
	    var manifest = viewerConfig.manifest;

	    var pagesByGroup = [];
	    var leftPage = null;
	    var nonPagedPages = []; // Pages to display below the current group

	    var _addNonPagedPages = function()
	    {
	        for (var i = 0; i < nonPagedPages.length; i++)
	        {
	            pagesByGroup.push([ nonPagedPages[i] ]);
	        }
	        nonPagedPages = [];
	    };

	    manifest.pages.forEach(function (page, index)
	    {
	        var pageRecord = {
	            index: index,
	            dimensions: getPageDimensions(index, manifest),
	            paged: (!manifest.paged || page.paged)
	        };

	        // Only display non-paged pages if specified in the settings
	        if (!viewerConfig.showNonPagedPages && !pageRecord.paged)
	            return;

	        if (!pageRecord.paged)
	        {
	            nonPagedPages.push(pageRecord);
	        }
	        else if (index === 0 || page.facingPages)
	        {
	            // The first page is placed on its own
	            pagesByGroup.push([pageRecord]);
	            _addNonPagedPages();
	        }
	        else if (leftPage === null)
	        {
	            leftPage = pageRecord;
	        }
	        else
	        {
	            pagesByGroup.push([leftPage, pageRecord]);
	            leftPage = null;
	            _addNonPagedPages();
	        }
	    });

	    // Flush a final left page
	    if (leftPage !== null)
	    {
	        pagesByGroup.push([leftPage]);
	        _addNonPagedPages();
	    }

	    return pagesByGroup;
	}

	function getGroupLayoutsFromPageGrouping(viewerConfig, grouping)
	{
	    var verticallyOriented = viewerConfig.verticallyOriented;

	    if (grouping.length === 2)
	        return getFacingPageGroup(grouping[0], grouping[1], verticallyOriented);

	    var page = grouping[0];
	    var pageDims = page.dimensions;

	    // The first page is placed on its own to the right in vertical orientation.
	    // NB that this needs to be the page with index 0; if the first page is excluded
	    // from the layout then this special case shouldn't apply.
	    // If the page is tagged as 'non-paged', center it horizontally
	    var leftOffset;
	    if (page.paged)
	        leftOffset = (page.index === 0 && verticallyOriented) ? pageDims.width : 0;
	    else
	        leftOffset = (verticallyOriented) ? pageDims.width / 2 : 0;

	    var shouldBeHorizontallyAdjusted =
	        verticallyOriented && !viewerConfig.manifest.pages[page.index].facingPages;

	    // We need to left-align the page in vertical orientation, so we double
	    // the group width
	    return {
	        dimensions: {
	            height: pageDims.height,
	            width: shouldBeHorizontallyAdjusted ? pageDims.width * 2 : pageDims.width
	        },
	        pages: [{
	            index: page.index,
	            groupOffset: {
	                top: 0,
	                left: leftOffset
	            },
	            dimensions: pageDims
	        }]
	    };
	}

	function getFacingPageGroup(leftPage, rightPage, verticallyOriented)
	{
	    var leftDims = leftPage.dimensions;
	    var rightDims = rightPage.dimensions;

	    var height = Math.max(leftDims.height, rightDims.height);

	    var width, firstLeftOffset, secondLeftOffset;

	    if (verticallyOriented)
	    {
	        var midWidth = Math.max(leftDims.width, rightDims.width);

	        width = midWidth * 2;

	        firstLeftOffset = midWidth - leftDims.width;
	        secondLeftOffset = midWidth;
	    }
	    else
	    {
	        width = leftDims.width + rightDims.width;
	        firstLeftOffset = 0;
	        secondLeftOffset = leftDims.width;
	    }

	    return {
	        dimensions: {
	            height: height,
	            width: width
	        },
	        pages: [
	            {
	                index: leftPage.index,
	                dimensions: leftDims,
	                groupOffset: {
	                    top: 0,
	                    left: firstLeftOffset
	                }
	            },
	            {
	                index: rightPage.index,
	                dimensions: rightDims,
	                groupOffset: {
	                    top: 0,
	                    left: secondLeftOffset
	                }
	            }
	        ]
	    };
	}


/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = function getPageDimensions(pageIndex, manifest)
	{
	    var dims = manifest.getMaxPageDimensions(pageIndex);

	    return {
	        width: Math.floor(dims.width),
	        height: Math.floor(dims.height)
	    };
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var getPageDimensions = __webpack_require__(36);

	module.exports = function getSinglesLayoutGroups(viewerConfig)
	{
	    var manifest = viewerConfig.manifest;

	    // Render each page alone in a group
	    var pages = [];
	    manifest.pages.forEach(function (page, index)
	    {
	        if (!viewerConfig.showNonPagedPages && manifest.paged && !page.paged)
	            return;

	        var pageDims = getPageDimensions(index, manifest);

	        pages.push({
	            dimensions: pageDims,
	            pages: [
	                {
	                    index: index,
	                    groupOffset: {top: 0, left: 0},
	                    dimensions: pageDims
	                }
	            ]
	        });
	    });

	    return pages;
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = getGridLayoutGroups;

	function getGridLayoutGroups(viewerConfig)
	{
	    var viewportWidth = viewerConfig.viewport.width;
	    var manifest = viewerConfig.manifest;
	    var pagesPerRow = viewerConfig.pagesPerRow;
	    var fixedHeightGrid = viewerConfig.fixedHeightGrid;
	    var fixedPadding = viewerConfig.fixedPadding;
	    var showNonPagedPages = viewerConfig.showNonPagedPages;

	    var horizontalPadding = fixedPadding * (pagesPerRow + 1);
	    var pageWidth = (viewportWidth - horizontalPadding) / pagesPerRow;
	    var gridPageWidth = pageWidth;

	    // Calculate the row height depending on whether we want to fix the width or the height
	    var rowHeight = (fixedHeightGrid) ? fixedPadding + manifest.minRatio * pageWidth : fixedPadding + manifest.maxRatio * pageWidth;

	    var groups = [];
	    var currentPages = [];

	    var getGridPageDimensions = function (pageData)
	    {
	        // Calculate the width, height and horizontal placement of this page
	        // Get dimensions at max zoom level, although any level should be fine
	        var pageDimenData = pageData.d[pageData.d.length - 1];
	        var heightToWidthRatio = pageDimenData.h / pageDimenData.w;

	        var pageWidth, pageHeight;

	        if (fixedHeightGrid)
	        {
	            pageWidth = (rowHeight - fixedPadding) / heightToWidthRatio;
	            pageHeight = rowHeight - fixedPadding;
	        }
	        else
	        {
	            pageWidth = gridPageWidth;
	            pageHeight = pageWidth * heightToWidthRatio;
	        }

	        return {
	            width: Math.round(pageWidth),
	            height: Math.round(pageHeight)
	        };
	    };

	    var rowDimensions = {
	        height: rowHeight,
	        width: viewportWidth
	    };

	    manifest.pages.forEach(function (page, pageIndex)
	    {
	        if (!showNonPagedPages && manifest.paged && !page.paged)
	            return;

	        // Calculate the width, height and horizontal placement of this page
	        var pageDimens = getGridPageDimensions(page);
	        var leftOffset = Math.floor(currentPages.length * (fixedPadding + gridPageWidth) + fixedPadding);

	        // Center the page if the height is fixed (otherwise, there is no horizontal padding)
	        if (fixedHeightGrid)
	        {
	            leftOffset += (gridPageWidth - pageDimens.width) / 2;
	        }

	        // TODO: Precompute page dimensions everywhere
	        currentPages.push({
	            index: pageIndex,
	            dimensions: pageDimens,
	            groupOffset: {
	                top: 0,
	                left: leftOffset
	            }
	        });

	        if (currentPages.length === pagesPerRow)
	        {
	            groups.push({
	                dimensions: rowDimensions,
	                pages: currentPages
	            });

	            currentPages = [];
	        }
	    });

	    if (currentPages.length > 0)
	    {
	        groups.push({
	            dimensions: rowDimensions,
	            pages: currentPages
	        });
	    }

	    return groups;
	}


/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = createSettingsView;

	function createSettingsView(sources)
	{
	    var obj = {};

	    sources.forEach(function (source)
	    {
	        registerMixin(obj, source);
	    });

	    return obj;
	}

	function registerMixin(obj, mixin)
	{
	    Object.keys(mixin).forEach(function (key)
	    {
	        Object.defineProperty(obj, key, {
	            get: function ()
	            {
	                return mixin[key];
	            },
	            set: function ()
	            {
	                // TODO: Make everything strict mode so this isn't needed
	                throw new TypeError('Cannot set settings.' + key);
	            }
	        });
	    });
	}


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var extend = __webpack_require__(3).extend;

	module.exports = ValidationRunner;

	function ValidationRunner(options)
	{
	    this.whitelistedKeys = options.whitelistedKeys || [];
	    this.additionalProperties = options.additionalProperties || [];
	    this.validations = options.validations;
	}

	ValidationRunner.prototype.isValid = function (key, value, settings)
	{
	    // Get the validation index
	    var validationIndex = null;

	    this.validations.some(function (validation, index)
	    {
	        if (validation.key !== key)
	            return false;

	        validationIndex = index;
	        return true;
	    });

	    if (validationIndex === null)
	        return true;

	    // Run the validation
	    var dummyChanges = {};
	    dummyChanges[key] = value;
	    var proxier = createSettingsProxier(settings, dummyChanges, this);

	    return !this._runValidation(validationIndex, value, proxier);
	};

	ValidationRunner.prototype.validate = function (settings)
	{
	    this._validateOptions({}, settings);
	};

	ValidationRunner.prototype.getValidatedOptions = function (settings, options)
	{
	    var cloned = extend({}, options);
	    this._validateOptions(settings, cloned);
	    return cloned;
	};

	ValidationRunner.prototype._validateOptions = function (settings, options)
	{
	    var settingsProxier = createSettingsProxier(settings, options, this);
	    this._applyValidations(options, settingsProxier);
	};

	ValidationRunner.prototype._applyValidations = function (options, proxier)
	{
	    this.validations.forEach(function (validation, index)
	    {
	        if (!options.hasOwnProperty(validation.key))
	            return;

	        var input = options[validation.key];
	        var corrected = this._runValidation(index, input, proxier);

	        if (corrected)
	        {
	            if (!corrected.warningSuppressed)
	                emitWarning(validation.key, input, corrected.value);

	            options[validation.key] = corrected.value;
	        }
	    }, this);
	};

	ValidationRunner.prototype._runValidation = function (index, input, proxier)
	{
	    var validation = this.validations[index];

	    proxier.index = index;

	    var warningSuppressed = false;
	    var config = {
	        suppressWarning: function ()
	        {
	            warningSuppressed = true;
	        }
	    };

	    var outputValue = validation.validate(input, proxier.proxy, config);

	    if (outputValue === undefined || outputValue === input)
	        return null;

	    return {
	        value: outputValue,
	        warningSuppressed: warningSuppressed
	    };
	};

	/**
	 * The settings proxy wraps the settings object and ensures that
	 * only values which have previously been validated are accessed,
	 * throwing a TypeError otherwise.
	 *
	 * FIXME(wabain): Is it worth keeping this? When I wrote it I had
	 * multiple validation stages and it was a lot harder to keep track
	 * of everything, so this was more valuable.
	 */
	function createSettingsProxier(settings, options, runner)
	{
	    var proxier = {
	        proxy: {},
	        index: null
	    };

	    var lookup = lookupValue.bind(null, settings, options);

	    var properties = {};

	    runner.whitelistedKeys.forEach(function (whitelisted)
	    {
	        properties[whitelisted] = {
	            get: lookup.bind(null, whitelisted)
	        };
	    });

	    runner.additionalProperties.forEach(function (additional)
	    {
	        properties[additional.key] = {
	            get: additional.get
	        };
	    });

	    runner.validations.forEach(function (validation, validationIndex)
	    {
	        properties[validation.key] = {
	            get: function ()
	            {
	                if (validationIndex < proxier.index)
	                    return lookup(validation.key);

	                var currentKey = runner.validations[proxier.index].key;
	                throw new TypeError('Cannot access setting ' + validation.key + ' while validating ' + currentKey);
	            }
	        };
	    });

	    Object.defineProperties(proxier.proxy, properties);

	    return proxier;
	}

	function emitWarning(key, original, corrected)
	{
	    console.warn('Invalid value for ' + key + ': ' + original + '. Using ' + corrected + ' instead.');
	}

	function lookupValue(base, extension, key)
	{
	    if (key in extension)
	        return extension[key];

	    return base[key];
	}


/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = Viewport;

	function Viewport(outer, options)
	{
	    options = options || {};

	    this.intersectionTolerance = options.intersectionTolerance || 0;
	    this.maxExtent = options.maxExtent || 2000;

	    this.outer = outer;

	    this._top = this._left = this._width = this._height = this._innerDimensions = null;

	    this.invalidate();
	}

	Viewport.prototype.intersectsRegion = function (region)
	{
	    return this.hasHorizontalOverlap(region) && this.hasVerticalOverlap(region);
	};

	Viewport.prototype.hasVerticalOverlap = function (region)
	{
	    var top = this.top - this.intersectionTolerance;
	    var bottom = this.bottom + this.intersectionTolerance;

	    return (
	        fallsBetween(region.top, top, bottom) ||
	        fallsBetween(region.bottom, top, bottom) ||
	        (region.top <= top && region.bottom >= bottom)
	    );
	};

	Viewport.prototype.hasHorizontalOverlap = function (region)
	{
	    var left = this.left - this.intersectionTolerance;
	    var right = this.right + this.intersectionTolerance;

	    return (
	        fallsBetween(region.left, left, right) ||
	        fallsBetween(region.right, left, right) ||
	        (region.left <= left && region.right >= right)
	    );
	};

	Viewport.prototype.invalidate = function ()
	{
	    // FIXME: Should this check the inner dimensions as well?
	    this._width = clampMax(this.outer.clientWidth, this.maxExtent);
	    this._height = clampMax(this.outer.clientHeight, this.maxExtent);

	    this._top = this.outer.scrollTop;
	    this._left = this.outer.scrollLeft;
	};

	Viewport.prototype.setInnerDimensions = function (dimensions)
	{
	    this._innerDimensions = dimensions;

	    if (dimensions)
	    {
	        this._top = clamp(this._top, 0, dimensions.height - this._height);
	        this._left = clamp(this._left, 0, dimensions.width - this._width);
	    }
	};

	Object.defineProperties(Viewport.prototype, {
	    top: getCoordinateDescriptor('top', 'height'),
	    left: getCoordinateDescriptor('left', 'width'),

	    width: getDimensionDescriptor('width'),
	    height: getDimensionDescriptor('height'),

	    bottom: {
	        get: function ()
	        {
	            return this._top + this._height;
	        }
	    },
	    right: {
	        get: function ()
	        {
	            return this._left + this._width;
	        }
	    }
	});

	function getCoordinateDescriptor(coord, associatedDimension)
	{
	    var privateProp = '_' + coord;
	    var source = 'scroll' + coord.charAt(0).toUpperCase() + coord.slice(1);

	    return {
	        get: function ()
	        {
	            return this[privateProp];
	        },
	        set: function (newValue)
	        {
	            var normalized;

	            if (this._innerDimensions)
	            {
	                var maxAllowed = this._innerDimensions[associatedDimension] - this[associatedDimension];
	                normalized = clamp(newValue, 0, maxAllowed);
	            }
	            else
	            {
	                normalized = clampMin(newValue, 0);
	            }

	            this[privateProp] = this.outer[source] = normalized;
	        }
	    };
	}

	function getDimensionDescriptor(dimen)
	{
	    return {
	        get: function ()
	        {
	            return this['_' + dimen];
	        }
	    };
	}

	function fallsBetween(point, start, end)
	{
	    return point >= start && point <= end;
	}

	function clamp(value, min, max)
	{
	    return clampMin(clampMax(value, max), min);
	}

	function clampMin(value, min)
	{
	    return Math.max(value, min);
	}

	function clampMax(value, max)
	{
	    return Math.min(value, max);
	}


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/*

	Canvas plugin for diva.js
	Adds an adjustment icon next to each image

	*/

	var jQuery = __webpack_require__(3);
	var diva = __webpack_require__(7);

	__webpack_require__(15);

	(function ($)
	{
	    module.exports = (function ()
	    {
	        var canvas = {},
	            map = {},
	            settings = {},
	            image,
	            sliders,
	            sliderMode;

	        // Set up some default settings (can be overridden the normal way)
	        var defaults = {
	            brightnessMax: 150,
	            brightnessMin: -100,
	            brightnessStep: 1,
	            contrastMax: 3,
	            contrastMin: -1,
	            contrastStep: 0.05,
	            localStoragePrefix: 'canvas-',
	            mobileWebkitMaxZoom: 2,
	            rgbMax: 50,
	            rgbMin: -50,
	            throbberFadeSpeed: 200,
	            throbberTimeout: 100,
	            buttons: [
	                'contrast',
	                'brightness',
	                'rotation',
	                'zoom'
	            ]
	        };

	        // Convert an angle from degrees to radians
	        var toRadians = function (angle)
	        {
	            return angle * Math.PI / 180;
	        };

	        // Determine the new center of the page after rotating by the given angle
	        var getNewCenter = function (currentCenter, angle)
	        {
	            var x = currentCenter.x - canvas.centerX;
	            // Take the negative because the rotation is counterclockwise
	            var y = -(currentCenter.y - canvas.centerY);

	            var theta = toRadians(sliders.rotation.previous - angle);
	            var newX = Math.cos(theta) * x - Math.sin(theta) * y + canvas.centerX;
	            var newY = -(Math.sin(theta) * x + Math.cos(theta) * y) + canvas.centerY;

	            return {'x': newX, 'y': newY};
	        };

	        // Rotates the image on the given canvas by the given angle
	        var rotateCanvas = function (aCanvas, angle)
	        {
	            var context = aCanvas.context;
	            var center = aCanvas.size / 2;
	            var startX = -(aCanvas.width / 2);
	            var startY = -(aCanvas.height / 2);

	            // Clear the canvas so that remnants of the old image don't show
	            context.clearRect(0, 0, aCanvas.size, aCanvas.size);

	            // Do the rotation
	            context.save();
	            context.translate(center, center);
	            context.rotate(toRadians(angle));
	            context.drawImage(image, startX, startY, aCanvas.width, aCanvas.height);
	            context.restore();

	            // Save the new pixel data so that it can later be adjusted in adjustLevels
	            aCanvas.data = context.getImageData(0, 0, aCanvas.size, aCanvas.size);
	        };

	        // Determine if we need to update the large canvas
	        var shouldAdjustLevels = function ()
	        {
	            var slider;

	            // Returns true if something has been changed
	            for (slider in sliders)
	            {
	                if (sliders[slider].current !== sliders[slider].previous)
	                {
	                    return true;
	                }
	            }

	            return false;
	        };

	        // Sets the "previous" value to the "current" value for every slider
	        var updatePreviousLevels = function ()
	        {
	            var slider;

	            for (slider in sliders)
	            {
	                sliders[slider].previous = sliders[slider].current;
	            }
	        };

	        // Update the thumbnail preview (called when a slider is moved/reset)
	        var updateMap = function ()
	        {
	            rotateCanvas(map, sliders.rotation.current);
	            adjustLevels(map);
	        };

	        // Update the large canvas (rotation, zooming, scrolling, pixel manipulation)
	        var updateCanvas = function ()
	        {
	            var angle = sliders.rotation.current;
	            var oldAngle = sliders.rotation.previous;
	            var zoomLevel = sliders.zoom.current;
	            var oldZoomLevel = sliders.zoom.previous;

	            // Scroll the user to the desired location
	            if (angle !== oldAngle || zoomLevel !== oldZoomLevel)
	            {
	                // First figure out the current center of the viewport
	                var leftScroll = $('#diva-canvas-wrapper').scrollLeft();
	                var topScroll = $('#diva-canvas-wrapper').scrollTop();
	                var leftOffset = settings.viewport.width / 2;
	                var topOffset = settings.viewport.height / 2;

	                // Then determine the new center (the same part of the image)
	                var newCenter = getNewCenter({x: leftScroll + leftOffset, y: topScroll + topOffset}, angle);

	                // Incorporate the zoom change ratio (would be 1 if no change)
	                var zoomChange = Math.pow(2, zoomLevel - oldZoomLevel);
	                var toLeftScroll = zoomChange * newCenter.x - leftOffset;
	                var toTopScroll = zoomChange * newCenter.y - topOffset;

	                // Rotate the large canvas
	                rotateCanvas(canvas, angle);

	                // Scroll to the new center
	                $('#diva-canvas-wrapper').scrollLeft(toLeftScroll);
	                $('#diva-canvas-wrapper').scrollTop(toTopScroll);
	            }

	            // Only call adjustLevels again if we really need to (expensive)
	            if (shouldAdjustLevels())
	            {
	                adjustLevels(canvas);
	                updatePreviousLevels();
	            }
	        };

	        // Copies the canvas' pixel array and returns the copy
	        var copyImageData = function (aCanvas)
	        {
	            var oldImageData = aCanvas.data;
	            var newImageData = aCanvas.context.createImageData(oldImageData);
	            var pixelArray = newImageData.data;
	            var i, length;

	            for (i = 0, length = pixelArray.length; i < length; i++)
	            {
	                pixelArray[i] = oldImageData.data[i];
	            }

	            return newImageData;
	        };

	        // Determines whether or not we need to adjust this level - very simple
	        var shouldAdjust = function (mode)
	        {
	            var thisChanged = sliders[mode].current !== sliders[mode].previous;
	            var thisNotDefault = sliders[mode].current !== sliders[mode].initial;

	            return thisChanged || thisNotDefault;
	        };

	        var adjustLevels = function (aCanvas)
	        {
	            // Copy the pixel array to avoid destructively modifying the original
	            var imageData = copyImageData(aCanvas);
	            var pixelArray = imageData.data;

	            // Store and calculate some scale factors and offsets
	            var brightness = sliders.brightness.current;
	            var contrast = sliders.contrast.current;

	            var brightMul = 1 + Math.min(settings.brightnessMax, Math.max(settings.brightnessMin, brightness)) / settings.brightnessMax;
	            var brightTimesContrast = brightMul * contrast;
	            var contrastOffset = 128 - (contrast * 128);

	            var redOffset = sliders.red.current;
	            var greenOffset = sliders.green.current;
	            var blueOffset = sliders.blue.current;

	            // Determine whether or not we need to adjust certain things
	            var adjustRed = shouldAdjust('red');
	            var adjustGreen = shouldAdjust('green');
	            var adjustBlue = shouldAdjust('blue');

	            var adjustBrightness = shouldAdjust('brightness');
	            var adjustContrast = shouldAdjust('contrast');
	            var adjustOthers = adjustBrightness || adjustContrast;

	            var x, y, width, height, offset, r, g, b;

	            for (x = 0, width = imageData.width; x < width; x++)
	            {
	                for (y = 0, height = imageData.height; y < height; y++)
	                {
	                    offset = (y * width + x) * 4;

	                    r = pixelArray[offset];
	                    g = pixelArray[offset + 1];
	                    b = pixelArray[offset + 2];

	                    // Only do something if the pixel is not black originally
	                    if (r + g + b > 0)
	                    {
	                        // Only adjust individual colour channels if necessary
	                        if (adjustRed && r)
	                            r += redOffset;

	                        if (adjustGreen && g)
	                            g += greenOffset;

	                        if (adjustBlue && b)
	                            b += blueOffset;

	                        // If we need to adjust brightness and/or contrast
	                        if (adjustOthers)
	                        {
	                            if (r)
	                                r = r * brightTimesContrast + contrastOffset;

	                            if (g)
	                                g = g * brightTimesContrast + contrastOffset;

	                            if (b)
	                                b = b * brightTimesContrast + contrastOffset;
	                        }

	                        pixelArray[offset] = r;
	                        pixelArray[offset + 1] = g;
	                        pixelArray[offset + 2] = b;
	                    }
	                }
	            }

	            aCanvas.context.clearRect(0, 0, width, height);
	            aCanvas.context.putImageData(imageData, 0, 0);
	        };

	        // Update the box in the preview showing where you currently are
	        var updateViewbox = function ()
	        {
	            // Determine the top left corner coordinates based on our current position
	            var cornerX = $('#diva-canvas-wrapper').scrollLeft() * map.scaleFactor;
	            var cornerY = $('#diva-canvas-wrapper').scrollTop() * map.scaleFactor;

	            // Subtract 4 to compensate for the borders
	            var height = Math.min(Math.round(settings.viewport.height * map.scaleFactor), settings.mapSize) - 4;
	            var width = Math.min(Math.round(settings.viewport.width * map.scaleFactor), settings.mapSize) - 4;

	            $('#diva-map-viewbox').height(height).width(width).css({top: cornerY, left: cornerX});
	        };

	        // Draw the thumbnail preview in the toolbar
	        var loadMap = function (image)
	        {
	            map.canvas = document.getElementById('diva-canvas-minimap');
	            map.size = settings.mapSize;
	            map.canvas.width = map.size;
	            map.canvas.height = map.size;

	            // Give it a black background
	            map.context = map.canvas.getContext('2d');
	            map.context.fillRect(0, 0, map.size, map.size);

	            // Determine the coordinates/dimensions of the preview
	            map.scaleFactor = settings.mapSize / canvas.size;
	            map.cornerX = canvas.cornerX * map.scaleFactor;
	            map.cornerY = canvas.cornerY * map.scaleFactor;
	            map.width = image.width * map.scaleFactor;
	            map.height = image.height * map.scaleFactor;

	            // Draw the image within the map (no adjustments) and save the pixel array
	            map.context.drawImage(image, map.cornerX, map.cornerY, map.width, map.height);
	            map.data = map.context.getImageData(0, 0, settings.mapSize, settings.mapSize);

	            // Show the viewbox, make it reflect where we currently are
	            $('#diva-map-viewbox').show();
	            updateViewbox();
	        };

	        // Load the image within the large and small canvases
	        var loadCanvas = function (imageURL, callback)
	        {
	            image = new Image();
	            image.crossOrigin = "anonymous";

	            image.onload = function ()
	            {
	                // Determine the size of the (square) canvas based on the hypoteneuse
	                canvas.size = Math.sqrt(image.width * image.width + image.height * image.height);

	                // Resize the canvas if necessary
	                canvas.canvas = document.getElementById('diva-canvas');
	                canvas.canvas.width = canvas.size;
	                canvas.canvas.height = canvas.size;
	                canvas.cornerX = (canvas.size - image.width) / 2;
	                canvas.cornerY = (canvas.size - image.height) / 2;
	                canvas.width = image.width;
	                canvas.height = image.height;
	                canvas.centerX = canvas.size / 2;
	                canvas.centerY = canvas.size / 2;

	                // Draw the image to the large canvas, and save the pixel array
	                canvas.context = canvas.canvas.getContext('2d');
	                canvas.context.drawImage(image, canvas.cornerX, canvas.cornerY, canvas.width, canvas.height);
	                try
	                {
	                    canvas.data = canvas.context.getImageData(0, 0, canvas.size, canvas.size);
	                }
	                catch (error)
	                {
	                    var canvasError = '<div id="diva-error" class="diva-error"><p><strong>Error</strong></p><p>' + error.message + '</p>';

	                    if (error.name === 'SecurityError')
	                    {
	                        canvasError += '<p>You may need to update your server configuration in order to use the image manipulation tools. ' +
	                        'For help, see the <a href="https://github.com/DDMAL/diva.js/wiki/The-API-and-Plugins#a-note-about-' +
	                        'canvas-and-cross-site-data" target="_blank">canvas cross-site data documentation</a>.</p>' +
	                        '</div>';
	                    }
	                    else
	                    {
	                        throw error;
	                    }

	                    canvasError += '</div>';
	                    $('#diva-canvas-backdrop').append(canvasError);
	                    hideThrobber();
	                }

	                // Only load the map the first time (when there is no callback)
	                if (callback === undefined) {
	                    loadMap(image);
	                }

	                // Update the map and the canvas if necessary
	                updateMap();
	                updateCanvas(canvas);

	                // Hide the throbber if it is visible
	                hideThrobber();

	                // If the callback function exists, execute it (for zooming)
	                if (typeof callback === 'function')
	                    callback.call(callback);
	            };

	            image.src = imageURL;

	            // make sure the load event fires for cached images too
	            if ( image.complete || image.complete === undefined ) {
	                image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
	                image.src = imageURL;
	            }
	        };

	        var updateSliderLabel = function ()
	        {
	            var thisSlider = sliders[sliderMode];
	            var value = thisSlider.current;
	            var stringValue = (thisSlider.transform) ? thisSlider.transform(value) : value;
	            $('#diva-canvas-value').html(stringValue);
	        };

	        var updateSliderValue = function ()
	        {
	            $('#diva-canvas-slider').val(sliders[sliderMode].current);
	        };

	        // Returns the URL for the image at the specified zoom level
	        var getImageURL = function (zoomLevel)
	        {
	            var width = settings.zoomWidthRatio * Math.pow(2, zoomLevel);

	            return settings.divaInstance.getPageImageURL(settings.selectedPageIndex, { width: width });
	        };

	        var showThrobber = function ()
	        {
	            // Only show the throbber if it will take a long time
	            if (sliders.zoom.current > 0 || settings.mobileWebkit)
	                $(settings.selector + 'throbber').addClass('canvas-throbber').show();
	        };

	        // Hides the loading indicator icon
	        var hideThrobber = function ()
	        {
	            $(settings.selector + 'throbber').removeClass('canvas-throbber').hide();
	        };

	        // If any modifications have been applied, save them to localStorage
	        var saveSettings = function ()
	        {
	            var sliderSettings = {};
	            var changed = false;
	            var storageKey = settings.localStoragePrefix + settings.filename;
	            var slider;

	            for (slider in sliders)
	            {
	                if (sliders[slider].previous !== sliders[slider].initial)
	                {
	                    sliderSettings[slider] = sliders[slider].previous;
	                    changed = true;
	                }
	            }

	            // If modifications need to be saved, update the canvas plugin icon
	            if (changed)
	            {
	                settings.pluginIcon.addClass('new');
	                storeObject(storageKey, sliderSettings);
	            }
	            else
	            {
	                settings.pluginIcon.removeClass('new');
	                localStorage.removeItem(storageKey);
	            }
	        };

	        // Handles zooming in when the zoom slider is changed and the change is applied
	        var updateZoom = function (newZoomLevel, callback)
	        {
	            settings.zoomLevel = newZoomLevel;

	            // Figure out the URL for the image at this new zoom level
	            var imageURL = getImageURL(newZoomLevel);

	            loadCanvas(imageURL, function ()
	            {
	                // Set the new scale factor and update the viewbox
	                map.scaleFactor = map.size / canvas.size;
	                updateViewbox();

	                saveSettings();
	            });
	        };

	        var bindCanvasKeyEvents = function (event)
	        {
	            var upArrowKey = 38,
	                downArrowKey = 40,
	                leftArrowKey = 37,
	                rightArrowKey = 39;

	            switch (event.keyCode)
	            {
	                case upArrowKey:
	                    // Up arrow - scroll up
	                    $('#diva-canvas-wrapper').scrollTop(document.getElementById('diva-canvas-wrapper').scrollTop - settings.arrowScrollAmount);
	                    return false;

	                case downArrowKey:
	                    // Down arrow - scroll down
	                    $('#diva-canvas-wrapper').scrollTop(document.getElementById('diva-canvas-wrapper').scrollTop + settings.arrowScrollAmount);
	                    return false;

	                case leftArrowKey:
	                    // Left arrow - scroll left
	                    $('#diva-canvas-wrapper').scrollLeft(document.getElementById('diva-canvas-wrapper').scrollLeft - settings.arrowScrollAmount);
	                    return false;

	                case rightArrowKey:
	                    // Right arrow - scroll right
	                    $('#diva-canvas-wrapper').scrollLeft(document.getElementById('diva-canvas-wrapper').scrollLeft + settings.arrowScrollAmount);
	                    return false;
	            }
	        };

	        // Serialize an object to JSON and save it in localStorage
	        var storeObject = function (key, value) {
	            localStorage.setItem(key, JSON.stringify(value));
	        };

	        // Load and deserialize a localStorage object
	        var loadStoredObject = function (key) {
	            var value = localStorage.getItem(key);
	            return value && JSON.parse(value);
	        };

	        var retval =
	        {
	            init: function (divaSettings, divaInstance)
	            {
	                // If the browser does not support canvas, do nothing
	                // And, disable this plugin
	                var canvasSupported = !!window.HTMLCanvasElement;
	                if (!canvasSupported)
	                    return false;

	                // Override all the configurable settings defined under canvasPlugin
	                $.extend(settings, defaults, divaSettings.canvasPlugin);

	                settings.divaInstance = divaInstance;
	                settings.inCanvas = false;
	                settings.iipServerURL = divaSettings.iipServerURL;
	                settings.imageDir = divaSettings.imageDir;
	                settings.selector = divaSettings.selector;
	                settings.mobileWebkit = divaSettings.mobileWebkit;
	                settings.arrowScrollAmount = divaSettings.arrowScrollAmount;

	                // Set up the settings for the sliders/icons
	                sliders = {
	                    'contrast': {
	                        'initial': 1,
	                        'min': settings.contrastMin,
	                        'max': settings.contrastMax,
	                        'step': settings.contrastStep,
	                        'transform': function (value) {
	                            return value.toFixed(2);
	                        },
	                        'title': 'Change the contrast'
	                    },
	                    'brightness': {
	                        'initial': 0,
	                        'min': settings.brightnessMin,
	                        'max': settings.brightnessMax,
	                        'step': settings.brightnessStep,
	                        'title': 'Adjust the brightness'
	                    },
	                    'rotation': {
	                        'initial': 0,
	                        'min': 0,
	                        'max': 359,
	                        'step': 1,
	                        'transform': function (value) {
	                            return value + '&deg;';
	                        },
	                        'title': 'Rotate the image'
	                    },
	                    'zoom': {
	                        // Default, min and max values updated within setupHook
	                        'initial': 0,
	                        'min': 0,
	                        'max': 0,
	                        'step': 1,
	                        'title': 'Adjust the zoom level'
	                    },
	                    'red': {
	                        'initial': 0,
	                        'min': settings.rgbMin,
	                        'max': settings.rgbMax,
	                        'step': 1,
	                        'title': 'Adjust the red channel'
	                    },
	                    'green': {
	                        'initial': 0,
	                        'min': settings.rgbMin,
	                        'max': settings.rgbMax,
	                        'step': 1,
	                        'title': 'Adjust the green channel'
	                    },
	                    'blue': {
	                        'initial': 0,
	                        'min': settings.rgbMin,
	                        'max': settings.rgbMax,
	                        'step': 1,
	                        'title': 'Adjust the blue channel'
	                    }
	                };

	                // Copy the "default" value into "value" and "previous" for each slider
	                var resetSliders = function ()
	                {
	                    var defaultValue, thisSlider, slider;
	                    for (slider in sliders)
	                    {
	                        thisSlider = sliders[slider];
	                        defaultValue = thisSlider.initial;
	                        thisSlider.current = defaultValue;
	                        thisSlider.previous = defaultValue;
	                    }
	                };

	                resetSliders();

	                // Create the DOM elements if they haven't already been created
	                if ($('#diva-canvas-backdrop').length)
	                {
	                    // Return true to keep the plugin enabled
	                    return true;
	                }

	                var canvasButtonsList = [];
	                var buttonHTML, button, buttonTitle, i;

	                for (i in settings.buttons)
	                {
	                    button = settings.buttons[i];
	                    buttonTitle = sliders[button].title;
	                    buttonHTML = '<div class="' + button + '" title="' + buttonTitle + '"></div>';
	                    canvasButtonsList.push(buttonHTML);
	                }
	                var canvasButtons = canvasButtonsList.join('');

	                var canvasTools = '<div id="diva-canvas-tools">' +
	                    '<div id="diva-canvas-toolbar">' +
	                        '<div id="diva-canvas-close" title="Return to the document viewer"></div>' +
	                        '<div id="diva-canvas-minimise" title="Minimise the toolbar"></div>' +
	                        '<span id="diva-canvas-info">Test</span>' +
	                    '</div>' +
	                    '<div id="diva-canvas-toolwindow">' +
	                        '<div id="diva-map-viewbox"></div>' +
	                        '<canvas id="diva-canvas-minimap"></canvas>' +
	                        '<div id="diva-canvas-buttons">' +
	                            canvasButtons +
	                        '</div>' +
	                        '<div id="diva-canvas-pane">' +
	                            '<p id="diva-canvas-tooltip">' +
	                                '<span id="diva-canvas-mode">contrast</span>: ' +
	                                '<span id="diva-canvas-value">0</span> ' +
	                                '<span id="diva-canvas-reset" class="link">(Reset)</span>' +
	                            '</p>' +
	                            '<input type="range" id="diva-canvas-slider"></input>' +
	                        '</div>' +
	                        '<br />' +
	                        '<div class="action-buttons">' +
	                            '<a href="#" id="diva-canvas-reset-all">Reset all</a>' +
	                            '<a href="#" id="diva-canvas-apply">Apply</a>' +
	                        '</div>' +
	                    '</div>' +
	                '</div>';
	                var canvasWrapper = '<div id="diva-canvas-wrapper">' +
	                    '<canvas id="diva-canvas"></canvas>' +
	                '</div>';
	                var canvasString = '<div id="diva-canvas-backdrop">' +
	                    canvasTools +
	                    canvasWrapper +
	                '</div>';

	                $('body').append(canvasString);

	                // Save the size of the map, as defined in the CSS
	                settings.mapSize = $('#diva-canvas-minimap').width();

	                // Adjust the slider when something is clicked, and make that the current mode
	                $('#diva-canvas-buttons div').click(function ()
	                {
	                    $('#diva-canvas-buttons .clicked').removeClass('clicked');
	                    updateSlider($(this).attr('class'));
	                });

	                var updateSlider = function (newMode)
	                {
	                    sliderMode = newMode;
	                    var sliderData = sliders[sliderMode];

	                    $('#diva-canvas-buttons .' + sliderMode).addClass('clicked');

	                    $('#diva-canvas-mode').text(sliderMode);

	                    var newValue = sliderData.current;
	                    var newValueString = (sliderData.transform) ? sliderData.transform(newValue) : newValue;

	                    var slider = document.getElementById('diva-canvas-slider');
	                    slider.min = sliderData.min;
	                    slider.max = sliderData.max;
	                    slider.step = sliderData.step;
	                    $('#diva-canvas-slider').val(newValue);
	                    $('#diva-canvas-value').html(newValueString);
	                };

	                updateSlider('contrast');

	                // Create the slider
	                $('#diva-canvas-slider').on('input', function(e){
	                    sliders[sliderMode].current = parseFloat(this.value);
	                    updateSliderLabel();
	                    updateMap();
	                });

	                // Reset all the sliders to the default value
	                $('#diva-canvas-reset-all').click(function ()
	                {
	                    var slider;

	                    for (slider in sliders)
	                    {
	                        sliders[slider].current = sliders[slider].initial;
	                    }

	                    // Change the value of the label
	                    updateSliderLabel();
	                    updateSliderValue();

	                    // Update the preview
	                    updateMap();
	                });

	                // Reset the current slider to the default value
	                $('#diva-canvas-reset').click(function ()
	                {
	                    // Update the current value and the slider
	                    sliders[sliderMode].current = sliders[sliderMode].initial;
	                    updateSliderLabel();
	                    updateSliderValue();

	                    // Update the preview
	                    updateMap();
	                });

	                // Update the large canvas when the apply button is clicked
	                $('#diva-canvas-apply').click(function ()
	                {
	                    if (shouldAdjustLevels())
	                    {
	                        showThrobber();

	                        setTimeout(function ()
	                        {
	                            if (sliders.zoom.current !== sliders.zoom.previous)
	                            {
	                                updateZoom(sliders.zoom.current);
	                            }
	                            else
	                            {
	                                updateCanvas();
	                                hideThrobber();

	                                // Save modifications to localSettings (also done in updateZoom callback)
	                                saveSettings();
	                            }
	                        }, settings.throbberTimeout);
	                    }
	                });

	                // Handle exiting canvas mode
	                $('#diva-canvas-close').click(function ()
	                {
	                    $('body').removeClass('overflow-hidden');

	                    // Clear the canvases and hide things
	                    // This needs to be improved - not done properly?
	                    canvas.context.clearRect(0, 0, canvas.size, canvas.size);
	                    map.context.clearRect(0, 0, map.size, map.size);
	                    $('#diva-canvas-wrapper').scrollTop(0).scrollLeft(0);
	                    $('#diva-canvas-backdrop').hide();
	                    $('#diva-map-viewbox').hide();
	                    hideThrobber();

	                    // Re-enable scrolling of diva when it is in the background
	                    divaInstance.enableScrollable();
	                    $(document).off('keydown', bindCanvasKeyEvents);

	                    // Reset everything
	                    resetSliders();
	                    updateSliderLabel();
	                    updateSliderValue();
	                    $('#diva-canvas-buttons .clicked').removeClass('clicked');
	                    updateSlider('contrast');

	                    diva.Events.publish("CanvasViewDidHide");
	                });

	                // Hide the toolbar when the minimise icon is clicked
	                $('#diva-canvas-minimise').click(function ()
	                {
	                    $('#diva-canvas-toolwindow').slideToggle('fast');
	                });

	                // Adjust the size of the canvas when the browser window is resized
	                $(window).resize(function ()
	                {
	                    settings.viewport = {
	                        height: window.innerHeight - divaSettings.scrollbarWidth,
	                        width: window.innerWidth - divaSettings.scrollbarWidth
	                    };

	                    // Always update the settings but only redraw if in canvas
	                    if (settings.inCanvas)
	                        updateViewbox();
	                });

	                // Update the viewbox when the large canvas is scrolled
	                $('#diva-canvas-wrapper').scroll(function ()
	                {
	                    if (settings.inCanvas)
	                        updateViewbox();
	                });

	                // Handle clicking/dragging of the viewbox (should scroll the large canvas)
	                $('#diva-canvas-minimap, #diva-map-viewbox').mouseup(function (event)
	                {
	                    // Consider caching this eventually (can't be done in init though)
	                    var offset = $('#diva-canvas-minimap').offset();

	                    var scaledX = (event.pageX - offset.left) / map.scaleFactor;
	                    var scaledY = (event.pageY - offset.top) / map.scaleFactor;

	                    $('#diva-canvas-wrapper').scrollTop(scaledY - settings.viewport.height / 2);
	                    $('#diva-canvas-wrapper').scrollLeft(scaledX - settings.viewport.width / 2);
	                });

	                // Enable drag scroll
	                $('#diva-canvas').mousedown(function ()
	                {
	                    $(this).addClass('grabbing');
	                }).mouseup(function ()
	                {
	                    $(this).removeClass('grabbing');
	                });

	                // touch events
	                $('#diva-canvas-wrapper').kinetic();

	                // mouse events
	                $('#diva-canvas-wrapper').dragscrollable({
	                    acceptPropagatedEvent: true
	                });

	                diva.Events.subscribe('ObjectDidLoad', this.setupHook, divaSettings.ID);
	                diva.Events.subscribe('ViewerDidTerminate', this.destroy, divaSettings.ID);
	                diva.Events.subscribe('PageDidLoad', this.onPageLoad, divaSettings.ID);

	                return true;
	            },

	            pluginName: 'canvas',

	            titleText: 'View the image on a canvas and adjust various settings',

	            setupHook: function(divaSettings)
	            {
	                settings.viewport = {
	                    height: window.innerHeight - divaSettings.scrollbarWidth,
	                    width: window.innerWidth - divaSettings.scrollbarWidth
	                };

	                // Save the min and max zoom level, and update the zoom slider
	                settings.minZoomLevel = divaSettings.minZoomLevel;
	                settings.maxZoomLevel = divaSettings.maxZoomLevel;

	                // If we're on the iPad, limit the max zoom level to 2
	                // Can't do canvas elements that are > 5 megapixels (issue #112)
	                if (settings.mobileWebkit)
	                    settings.maxZoomLevel = Math.min(settings.maxZoomLevel, settings.mobileWebkitMaxZoom);

	                sliders.zoom.min = settings.minZoomLevel;
	                sliders.zoom.max = settings.maxZoomLevel;
	            },

	            handleClick: function(event, divaSettings, divaInstance, selectedPageIndex)
	            {
	                // loadCanvas() calls all the other necessary functions to load
	                var filename = divaInstance.getFilenames()[selectedPageIndex];

	                // TODO: Move rationale for -1 from Wiki (TLDR an old IIP bug)
	                var width = divaInstance
	                    .getPageDimensions(selectedPageIndex)
	                    .width - 1;

	                var zoomLevel = divaSettings.zoomLevel;
	                var slider;

	                settings.zoomWidthRatio = width / Math.pow(2, zoomLevel);
	                settings.pluginIcon = $(this);

	                settings.manifest = divaSettings.manifest;
	                settings.selectedPageIndex = selectedPageIndex;

	                // Limit the max zoom level if we're on the iPad
	                if (settings.mobileWebkit) {
	                    zoomLevel = Math.min(settings.maxZoomLevel, zoomLevel);
	                }

	                settings.filename = filename;
	                sliders.zoom.initial = zoomLevel;
	                sliders.zoom.current = zoomLevel;

	                // Find the settings stored in localStorage, if they exist
	                var sliderSettings = loadStoredObject(settings.localStoragePrefix + settings.filename);
	                if (sliderSettings)
	                {
	                    for (slider in sliderSettings)
	                    {
	                        sliders[slider].current = sliderSettings[slider];

	                        // If the current slider's value has changed, update it
	                        if (slider === sliderMode)
	                        {
	                            updateSliderLabel();
	                            updateSliderValue();
	                        }

	                        if (slider === 'zoom')
	                        {
	                            zoomLevel = sliderSettings[slider];
	                        }
	                    }
	                }

	                sliders.zoom.previous = zoomLevel;

	                // Prevent scroll in body, and show the canvas backdrop
	                $('body').addClass('overflow-hidden');
	                $('#diva-canvas-backdrop').show();

	                // Disable scrolling on main diva instance
	                divaInstance.disableScrollable();
	                // Enable canvas scrolling
	                $(document).keydown(bindCanvasKeyEvents);

	                // Set this to true so events can be captured
	                settings.inCanvas = true;

	                var imageURL = getImageURL(zoomLevel);

	                // Change the title of the page
	                // FIXME: This is legacy behaviour. Should this be a filename/label?
	                $('#diva-canvas-info').text('Page ' + (selectedPageIndex + 1));

	                showThrobber();

	                diva.Events.publish('CanvasViewDidActivate', [selectedPageIndex]);

	                loadCanvas(imageURL);
	            },

	            onPageLoad: function(pageIndex, filename, selector)
	            {
	                // If something exists for this page in localStorage, then change icon color
	                var storageKey = settings.localStoragePrefix + filename;

	                if (localStorage.getItem(storageKey) !== null)
	                {
	                    $(selector).find('.diva-canvas-icon').addClass('new');
	                }
	            },

	            destroy: function(divaSettings, divaInstance)
	            {
	                $('#diva-canvas-backdrop').remove();
	            }
	        };

	        // this returns an object with all of the necessary hooks and callbacks
	        // embedded.
	        return retval;

	    })();
	})(jQuery);


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Download plugin for diva.js
	Allows you to download images served by IIPImage or IIIF compatible image servers
	*/

	var jQuery = __webpack_require__(3);

	(function ($)
	{
	    module.exports = (function()
	    {
	        var settings = {};
	        var retval =
	        {
	            init: function(divaSettings, divaInstance)
	            {
	                settings.divaInstance = divaInstance;
	                return true;
	            },
	            pluginName: 'download',
	            titleText: 'Download image at the given zoom level',
	            handleClick: function(event, divaSettings, divaInstance, pageIndex)
	            {
	                // TODO: Move rationale for -1 from Wiki (TLDR an old IIP bug)
	                var width = divaInstance
	                        .getPageDimensions(pageIndex)
	                        .width - 1;

	                var image = settings.divaInstance.getPageImageURL(pageIndex, { width: width });

	                window.open(image);
	            }
	        };

	        return retval;
	    })();
	})(jQuery);


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Highlight plugin for diva.js
	Allows you to highlight regions of a page image
	*/

	var jQuery = __webpack_require__(3);
	var elt = __webpack_require__(8);
	var diva = __webpack_require__(7);

	(function ($)
	{
	    module.exports = (function()
	    {
	        var retval =
	        {
	            init: function(divaSettings, divaInstance)
	            {
	                var highlightManager = new HighlightManager(divaInstance);
	                divaSettings.parentObject.data('highlightManager', highlightManager);

	                var currentHighlight;

	                /*
	                    Reset the highlights object and removes all highlights from the document.
	                */
	                divaInstance.resetHighlights = function()
	                {
	                    highlightManager.clear();
	                };

	                /*
	                    Resets the highlights for a single page.
	                */
	                divaInstance.removeHighlightsOnPage = function(pageIdx)
	                {
	                    highlightManager.removeHighlightsOnPage(pageIdx);
	                };

	                /*
	                    Highlights regions on multiple pages.
	                    @param pageIdxs An array of page index numbers
	                    @param regions  An array of regions
	                    @param colour   (optional) A colour for the highlighting, specified in RGBA CSS format
	                */
	                divaInstance.highlightOnPages = function(pageIdxs, regions, colour, divClass)
	                {
	                    var j = pageIdxs.length;
	                    while (j--)
	                    {
	                        divaInstance.highlightOnPage(pageIdxs[j], regions[j], colour, divClass);
	                    }
	                };

	                /*
	                    Highlights regions on a page.
	                    @param pageIdx  A page index number
	                    @param regions  An array of regions. Use {'width':i, 'height':i, 'ulx':i, 'uly': i, 'divID': str} for each region.
	                    @param colour   (optional) A colour for the highlighting, specified in RGBA CSS format
	                    @param divClass (optional) A class to identify a group of highlighted regions on a specific page by
	                */
	                divaInstance.highlightOnPage = function(pageIdx, regions, colour, divClass)
	                {
	                    if (colour === undefined)
	                    {
	                        colour = 'rgba(255, 0, 0, 0.2)';
	                    }

	                    if (divClass === undefined)
	                    {
	                        divClass = divaSettings.ID + 'highlight diva-highlight';
	                    }
	                    else
	                    {
	                        divClass = divaSettings.ID + 'highlight diva-highlight ' + divClass;
	                    }

	                    highlightManager.addHighlight({
	                        page: pageIdx,
	                        regions: regions,
	                        colour: colour,
	                        divClass: divClass
	                    });

	                    return true;
	                };

	                /*
	                    Jumps to a highlight somewhere in the document.
	                    @param divID The ID of the div to jump to. This ID must be attached to the div using .highlightOnPage(s) as the highlight may not be currently appended to the DOM.
	                */
	                divaInstance.gotoHighlight = function(divID)
	                {
	                    var result = highlightManager.getHighlightByRegionId(divID);

	                    if (result)
	                        return gotoDiv(result.highlight.page, result.region);

	                    console.warn("Diva just tried to find a highlight that doesn't exist.");
	                    return false;
	                };

	                /**
	                * Moves the diva pane to (page) and makes a darker border on (thisDiv)
	                */
	                var gotoDiv = function(page, thisDiv)
	                {
	                    //gets center of the div
	                    var centerYOfDiv = parseFloat(thisDiv.uly) + parseFloat(thisDiv.height) / 2;
	                    var centerXOfDiv = parseFloat(thisDiv.ulx) + parseFloat(thisDiv.width) / 2;

	                    var desiredY = divaInstance.translateFromMaxZoomLevel(centerYOfDiv);
	                    var desiredX = divaInstance.translateFromMaxZoomLevel(centerXOfDiv);

	                    //navigates to the page
	                    page = parseInt(page, 10);
	                    divaInstance.gotoPageByIndex(page);
	                    var viewportObject = divaInstance.getSettings().viewportObject;
	                    var currentTop = viewportObject.scrollTop() + desiredY - (viewportObject.height() / 2) + divaSettings.verticalPadding;
	                    var currentLeft = viewportObject.scrollLeft() + desiredX - (viewportObject.width() / 2) + divaSettings.horizontalPadding;

	                    //changes the scroll location to center on the div as much as is possible
	                    viewportObject.scrollTop(currentTop);
	                    viewportObject.scrollLeft(currentLeft);

	                    currentHighlight = {
	                        region: thisDiv,
	                        page: page
	                    };

	                    diva.Events.publish("SelectedHighlightChanged", [thisDiv.id, currentHighlight.page]);

	                    //selects the highlight
	                    updateCurrentHighlight(divaInstance, currentHighlight);
	                    return thisDiv.id;
	                };

	                var getDivCenter = function(thisDiv)
	                {
	                    if (divaSettings.verticallyOriented) return divaInstance.translateFromMaxZoomLevel(parseFloat(thisDiv.uly) + parseFloat(thisDiv.height) / 2);
	                    else return divaInstance.translateFromMaxZoomLevel(parseFloat(thisDiv.ulx) + parseFloat(thisDiv.width) / 2);
	                };

	                /*
	                    Jumps to the next highlight along the primary axis of the document.
	                */
	                var findAdjacentHighlight = function(forward)
	                {
	                    var centerOfTargetDiv;
	                    var highlightFound = false;
	                    var centerOfCurrentDiv;
	                    var currentPage;
	                    var regionArr, arrIndex;
	                    var pageDims;
	                    var centerOfDiv, targetDiv;

	                    var thisDiv;
	                    var compFunction;

	                    // If currentHighlight does not already exists,
	                    // just pretend we're starting at the northwest corner of diva-inner
	                    if (!currentHighlight)
	                    {
	                        centerOfCurrentDiv = 0;
	                        currentPage = 0;
	                    }
	                    else {
	                        currentPage = currentHighlight.page;

	                        //find the center of the current div
	                        centerOfCurrentDiv = getDivCenter(currentHighlight.region);
	                    }

	                    //if we do have a current highlight, try to find the next one in the same page

	                    regionArr = highlightManager.getHighlightRegions(currentPage);
	                    arrIndex = regionArr.length;
	                    pageDims = divaInstance.getPageDimensionsAtZoomLevel(currentPage, divaInstance.getZoomLevel());

	                    //initialize the center of the div to the maximum possible value
	                    if(forward) centerOfTargetDiv = (divaSettings.verticallyOriented) ? pageDims.height : pageDims.width;
	                    else centerOfTargetDiv = 0;

	                    if(forward)
	                    {
	                        compFunction = function(thisC, curC, targetC)
	                        {
	                            return (thisC > curC && thisC < targetC);
	                        };
	                    }
	                    else
	                    {
	                        compFunction = function(thisC, curC, targetC)
	                        {
	                            return (thisC < curC && thisC > targetC);
	                        };
	                    }

	                    while(arrIndex--)
	                    {
	                        thisDiv = regionArr[arrIndex];
	                        centerOfDiv = getDivCenter(thisDiv);

	                        //if this div is farther along the main axis but closer than the current closest
	                        if (compFunction(centerOfDiv, centerOfCurrentDiv, centerOfTargetDiv))
	                        {
	                            //update targetDiv
	                            highlightFound = true;
	                            centerOfTargetDiv = centerOfDiv;
	                            targetDiv = thisDiv;
	                        }
	                    }

	                    //if a highlight was found on the current page that was next; this can get overwritten but we're still good
	                    if (highlightFound) return gotoDiv(currentPage, targetDiv);
	                    //if it wasn't found, continue on...

	                    //find the minimum div on the next page with highlights and loop around if necessary

	                    //find the next page in the pageArr; this will be in order
	                    var pageArr = highlightManager.getHighlightedPages();
	                    var curIdx = pageArr.indexOf(currentPage.toString());

	                    var targetPage;

	                    if(forward)
	                    {
	                        while (!targetPage || !divaInstance.isPageIndexValid (targetPage))
	                        {
	                            //default to first page, move to next if possible
	                            if (curIdx == pageArr.length - 1) targetPage = pageArr[0];
	                            else targetPage = pageArr[++curIdx];
	                        }
	                    }

	                    else
	                    {
	                        while (!targetPage || !divaInstance.isPageIndexValid (targetPage))
	                        {
	                            //default to last page, move to previous if possible
	                            if (curIdx === 0) targetPage = pageArr[pageArr.length - 1];
	                            else targetPage = pageArr[--curIdx];
	                        }
	                    }

	                    //reset regionArr and centerOfTargetDiv for the new page we're testing
	                    regionArr = highlightManager.getHighlightRegions(targetPage);
	                    arrIndex = regionArr.length;
	                    pageDims = divaInstance.getPageDimensionsAtZoomLevel(targetPage, divaInstance.getMaxZoomLevel());

	                    if(forward) centerOfTargetDiv = (divaSettings.verticallyOriented) ? pageDims.height : pageDims.width;
	                    else centerOfTargetDiv = 0;

	                    //find the minimum this time
	                    if(forward)
	                    {
	                        compFunction = function(thisC, targetC)
	                        {
	                            return (thisC < targetC);
	                        };
	                    }
	                    else
	                    {
	                        compFunction = function(thisC, targetC)
	                        {
	                            return (thisC > targetC);
	                        };
	                    }

	                    while(arrIndex--)
	                    {
	                        thisDiv = regionArr[arrIndex];
	                        centerOfDiv = getDivCenter(thisDiv);
	                        if (compFunction(centerOfDiv, centerOfTargetDiv))
	                        {
	                            highlightFound = true;
	                            centerOfTargetDiv = centerOfDiv;
	                            targetDiv = thisDiv;
	                        }
	                    }

	                    //we've found it this time, as there'll be a region in the full regionArr to be the minimum
	                    return gotoDiv(targetPage, targetDiv);
	                };

	                /*
	                    Jumps to the next highlight along the primary axis of the document.
	                */
	                divaInstance.gotoNextHighlight = function()
	                {
	                    if (highlightManager.getHighlightCount() > 0)
	                        return findAdjacentHighlight(true);
	                    else
	                        return false;
	                };

	                /*
	                    Jumps to the previous highlight along the primary axis of the document.
	                */
	                divaInstance.gotoPreviousHighlight = function()
	                {
	                    if (highlightManager.getHighlightCount() > 0)
	                        return findAdjacentHighlight(false);
	                    else
	                        return false;
	                };

	                diva.Events.subscribe('ViewerWillTerminate', this.destroy, divaSettings.ID);

	                return true;
	            },
	            destroy: function (divaSettings)
	            {
	                var highlightManager = divaSettings.parentObject.data('highlightManager');
	                highlightManager.clear();
	                divaSettings.parentObject.removeData('highlightManager');
	            },
	            pluginName: 'highlight',
	            titleText: 'Highlight regions of pages',

	            // Exposed export
	            HighlightManager: HighlightManager
	        };
	        return retval;
	    })();
	})(jQuery);

	/** Manages the addition and removal of the page overlays which display the highlights */
	function HighlightManager(divaInstance, getCurrentHighlight)
	{
	    this._divaInstance = divaInstance;
	    this._overlays = {};
	    this._getCurrentHighlight = getCurrentHighlight;
	}

	HighlightManager.prototype.getHighlightCount = function ()
	{
	    var count = 0;
	    Object.keys(this._overlays).forEach(function (key)
	    {
	        count += this._overlays[key].highlight.regions.length;
	    }, this);

	    return count;
	};

	HighlightManager.prototype.getHighlightRegions = function (pageIndex)
	{
	    if (!this._overlays[pageIndex])
	        return [];

	    return this._overlays[pageIndex].highlight.regions;
	};

	HighlightManager.prototype.getHighlightedPages = function ()
	{
	    // FIXME: Conceptually awkward that these are strings
	    return Object.keys(this._overlays);
	};

	HighlightManager.prototype.getHighlightByRegionId = function (id)
	{
	    for (var i in this._overlays)
	    {
	        if (!this._overlays.hasOwnProperty(i))
	            continue;

	        var regions = this._overlays[i].highlight.regions;
	        for (var j in regions)
	        {
	            if (!regions.hasOwnProperty(j))
	                continue;

	            if (regions[j].divID === id)
	            {
	                return {
	                    highlight: this._overlays[i].highlight,
	                    region: regions[j]
	                };
	            }
	        }
	    }

	    return null;
	};

	HighlightManager.prototype.addHighlight = function (highlight)
	{
	    var existingOverlay = this._overlays[highlight.page];

	    if (existingOverlay)
	        this._divaInstance.__removePageOverlay(existingOverlay);

	    var overlay = new HighlightPageOverlay(highlight, this._divaInstance, this._getCurrentHighlight);
	    this._overlays[highlight.page] = overlay;
	    this._divaInstance.__addPageOverlay(overlay);
	};

	HighlightManager.prototype.removeHighlightsOnPage = function (pageIndex)
	{
	    if (!this._overlays[pageIndex])
	        return;

	    this._divaInstance.__removePageOverlay(this._overlays[pageIndex]);
	    delete this._overlays[pageIndex];
	};

	HighlightManager.prototype.clear = function ()
	{
	    for (var i in this._overlays)
	    {
	        if (!this._overlays.hasOwnProperty(i))
	            continue;

	        this._divaInstance.__removePageOverlay(this._overlays[i]);
	    }

	    this._overlays = {};
	};

	/**
	 When a new page is loaded, this overlay will be called with the
	 page index for the page. It looks at the 'highlights' data object
	 set on the diva parent element, and determines whether
	 highlights exist for that page.

	 If so, the overlay will create and render elements for every
	 highlighted box.

	 @param highlight
	 @param divaInstance
	 @param getCurrentHighlight (optional)
	 */
	function HighlightPageOverlay(highlight, divaInstance, getCurrentHighlight)
	{
	    this.page = highlight.page;
	    this.highlight = highlight;
	    this._highlightRegions = [];
	    this._divaInstance = divaInstance;
	    this._getCurrentHighlight = getCurrentHighlight;
	}

	HighlightPageOverlay.prototype.mount = function ()
	{
	    var divaSettings = this._divaInstance.getSettings();

	    var highlight = this.highlight;
	    var regions = highlight.regions;
	    var colour = highlight.colour;
	    var divClass = highlight.divClass;

	    var j = regions.length;
	    while (j--)
	    {
	        var region = regions[j];

	        // FIXME: Use CSS class instead of inline style
	        var box = elt('div', {
	            class: divClass,
	            style: {
	                background: colour,
	                border: "1px solid #555",
	                position: "absolute",
	                zIndex: 100
	            }
	        });

	        if (region.divID !== undefined)
	        {
	            box.setAttribute('data-highlight-id', region.divID);
	        }

	        // Used by IIIFHighlight
	        if (region.name !== undefined)
	        {
	            box.setAttribute('data-name', region.name);
	        }

	        this._highlightRegions.push({
	            element: box,
	            region: region
	        });
	    }

	    this.refresh();

	    var frag = document.createDocumentFragment();
	    this._highlightRegions.forEach(function (highlight)
	    {
	        frag.appendChild(highlight.element);
	    });

	    divaSettings.innerElement.appendChild(frag);

	    if (this._getCurrentHighlight)
	        updateCurrentHighlight(this._divaInstance, this._getCurrentHighlight());

	    diva.Events.publish("HighlightCompleted", [this.page, this._divaInstance.getFilenames()[this.page]]);
	};

	HighlightPageOverlay.prototype.unmount = function ()
	{
	    var innerElement = this._divaInstance.getSettings().innerElement;

	    this._highlightRegions.forEach(function (highlight)
	    {
	        innerElement.removeChild(highlight.element);
	    });

	    this._highlightRegions = [];
	};

	// FIXME: Updating a box per highlight region might be too expensive
	// Maybe stick all the elements in a container and then scale it using CSS transforms?
	HighlightPageOverlay.prototype.refresh = function ()
	{
	    var maxZoom = this._divaInstance.getMaxZoomLevel();

	    var maxZoomWidth = this._divaInstance.getPageDimensionsAtZoomLevel(this.page, maxZoom).width;
	    var currentWidth = this._divaInstance.getPageDimensions(this.page).width;
	    var zoomDifference = Math.log(maxZoomWidth / currentWidth) / Math.log(2);

	    var pageOffset = this._divaInstance.getPageOffset(this.page, {
	        excludePadding: true,
	        incorporateViewport: true
	    });

	    this._highlightRegions.forEach(function (highlight)
	    {
	        var region = highlight.region;

	        elt.setAttributes(highlight.element, {
	            style: {
	                width: incorporateZoom(region.width, zoomDifference) + "px",
	                height: incorporateZoom(region.height, zoomDifference) + "px",
	                top: pageOffset.top + incorporateZoom(region.uly, zoomDifference) + "px",
	                left: pageOffset.left + incorporateZoom(region.ulx, zoomDifference) + "px"
	            }
	        });
	    });
	};

	function incorporateZoom(position, zoomDifference)
	{
	    return position / Math.pow(2, zoomDifference);
	}

	function updateCurrentHighlight(divaInstance, currentHighlight)
	{
	    var classString = divaInstance.getInstanceId() + "selected-highlight";
	    var classElem = document.getElementsByClassName(classString);
	    var idx;
	    var box;
	    var boxes;

	    for (idx = 0; idx < classElem.length; idx++)
	    {
	        box = classElem[idx];
	        if (box.id !== currentHighlight.id)
	        {
	            box.className = box.className.replace(' '+classString, '');
	            box.style.border = "1px solid #555";
	        }
	    }

	    if (divaInstance.isPageInViewport(currentHighlight.page))
	    {
	        boxes = document.querySelectorAll("*[data-highlight-id=" + currentHighlight.id + "]");
	        for(idx = 0; idx < boxes.length; idx++)
	        {
	            box = boxes[idx];
	            box.className = box.className + " " + classString;
	            box.style.border = "2px solid #000";
	        }
	    }
	}


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/*
	IIIF Highlight plugin for diva.js
	Allows you to highlight regions of a page image based off of annotations in a IIIF Manifest
	*/

	var jQuery = __webpack_require__(3);
	var diva = __webpack_require__(7);
	var HighlightManager = __webpack_require__(44).HighlightManager;

	(function ($)
	{
	    module.exports = (function()
	    {
	        var settings = {};
	        var retval =
	        {
	            init: function(divaSettings, divaInstance)
	            {
	                var highlightManager = new HighlightManager(divaInstance);
	                divaSettings.parentObject.data('highlightManager', highlightManager);

	                settings.highlightedPages = [];

	                /*
	                    Reset the highlights object and removes all highlights from the document.
	                */
	                divaInstance.resetHighlights = function()
	                {
	                    highlightManager.clear();
	                };

	                /*
	                    Resets the highlights for a single page.
	                */
	                divaInstance.removeHighlightsOnPage = function(pageIdx)
	                {
	                    highlightManager.removeHighlightsOnPage(pageIdx);
	                };

	                divaInstance.hideHighlights = function()
	                {
	                    settings.highlightsVisible = false;
	                    $(divaSettings.innerElement).addClass('annotations-hidden');
	                };

	                divaInstance.showHighlights = function()
	                {
	                    settings.highlightsVisible = true;
	                    $(divaSettings.innerElement).removeClass('annotations-hidden');
	                };

	                /*
	                    Highlights regions on multiple pages.
	                    @param pageIdxs An array of page index numbers
	                    @param regions  An array of regions
	                    @param colour   (optional) A colour for the highlighting, specified in RGBA CSS format
	                */
	                divaInstance.highlightOnPages = function(pageIdxs, regions, colour, divClass)
	                {
	                    var j = pageIdxs.length;
	                    while (j--)
	                    {
	                        divaInstance.highlightOnPage(pageIdxs[j], regions[j], colour, divClass);
	                    }
	                };

	                /*
	                    Highlights regions on a page.
	                    @param pageIdx  A page index number
	                    @param regions  An array of regions. Use {'width':i, 'height':i, 'ulx':i, 'uly': i, 'divID': str} for each region.
	                    @param colour   (optional) A colour for the highlighting, specified in RGBA CSS format
	                    @param divClass (optional) A class to identify a group of highlighted regions on a specific page by
	                */
	                divaInstance.highlightOnPage = function(pageIdx, regions, colour, divClass)
	                {
	                    if (colour === undefined)
	                    {
	                        colour = 'rgba(255, 0, 0, 0.2)';
	                    }

	                    if (divClass === undefined)
	                    {
	                        divClass = divaSettings.ID + 'highlight diva-highlight';
	                    }
	                    else
	                    {
	                        divClass = divaSettings.ID + 'highlight diva-highlight ' + divClass;
	                    }

	                    highlightManager.addHighlight({
	                        page: pageIdx,
	                        regions: regions,
	                        colour: colour,
	                        divClass: divClass
	                    });

	                    return true;
	                };

	                                /*
	                    Jumps to a highlight somewhere in the document.
	                    @param divID The ID of the div to jump to. This ID must be attached to the div using .highlightOnPage(s) as the highlight may not be appended to the DOM.
	                */
	                divaInstance.gotoHighlight = function(divID)
	                {
	                    var result = highlightManager.getHighlightByRegionId(divID);

	                    if (result)
	                        return gotoDiv(result.highlight.page, result.region);

	                    console.warn("Diva just tried to find a highlight that doesn't exist.");
	                    return false;
	                };

	                /**
	                 * Moves the diva pane to (page)
	                 */
	                var gotoDiv = function(page, thisDiv)
	                {
	                    //gets center of the div
	                    var centerYOfDiv = parseFloat(thisDiv.uly) + parseFloat(thisDiv.height) / 2;
	                    var centerXOfDiv = parseFloat(thisDiv.ulx) + parseFloat(thisDiv.width) / 2;

	                    var desiredY = divaInstance.translateFromMaxZoomLevel(centerYOfDiv);
	                    var desiredX = divaInstance.translateFromMaxZoomLevel(centerXOfDiv);

	                    //navigates to the page
	                    page = parseInt(page, 10);
	                    divaInstance.gotoPageByIndex(page);
	                    var viewportObject = divaInstance.getSettings().viewportObject;
	                    var currentTop = viewportObject.scrollTop() + desiredY - (viewportObject.height() / 2) + divaSettings.verticalPadding;
	                    var currentLeft = viewportObject.scrollLeft() + desiredX - (viewportObject.width() / 2) + divaSettings.horizontalPadding;

	                    //changes the scroll location to center on the div as much as is possible
	                    viewportObject.scrollTop(currentTop);
	                    viewportObject.scrollLeft(currentLeft);
	                };

	                var showAnnotations = function(canvasIndex)
	                {
	                    return function(data, status, jqXHR)
	                    {
	                        var canvasAnnotations = data;
	                        var numAnnotations = data.length;

	                        //convert annotations in annotations object to diva highlight objects
	                        var regions = [];

	                        //loop over annotations in a single canvas
	                        for (var k = 0; k < numAnnotations; k++)
	                        {
	                            var currentAnnotation = canvasAnnotations[k];
	                            // get text content
	                            var text = currentAnnotation.resource.chars;

	                            // get x,y,w,h (slice string from '#xywh=' to end)
	                            var onString = currentAnnotation.on;
	                            var coordString = onString.slice(onString.indexOf('#xywh=') + 6);
	                            var coordinates = coordString.split(',');

	                            var region = {
	                                ulx: parseInt(coordinates[0], 10),
	                                uly: parseInt(coordinates[1], 10),
	                                width: parseInt(coordinates[2], 10),
	                                height: parseInt(coordinates[3], 10),
	                                name: text
	                            };

	                            regions.push(region);
	                        }

	                        divaInstance.highlightOnPage(canvasIndex, regions);
	                        //flag this page's annotations as having been retrieved
	                        settings.highlightedPages.push(canvasIndex);
	                    };
	                };

	                var getAnnotationsList = function(pageIndex)
	                {
	                    //if page has annotationList
	                    var canvases = settings.manifest.sequences[0].canvases;

	                    if (canvases[pageIndex].hasOwnProperty('otherContent'))
	                    {
	                        var otherContent = canvases[pageIndex].otherContent;

	                        for (var j = 0; j < otherContent.length; j++)
	                        {
	                            if (otherContent[j]['@type'] === 'sc:AnnotationList')
	                            {
	                                // canvas has annotations. get the annotations:
	                                $.ajax({
	                                    url: otherContent[j]['@id'],
	                                    cache: true,
	                                    dataType: 'json',
	                                    success: showAnnotations(pageIndex)
	                                });
	                            }
	                        }
	                    }
	                };

	                var setManifest = function(manifest)
	                {
	                    settings.manifest = manifest;
	                };

	                diva.Events.subscribe('ManifestDidLoad', setManifest, divaSettings.ID);

	                diva.Events.subscribe('PageWillLoad', function(pageIndex)
	                {
	                    if (!settings.highlightsVisible)
	                    {
	                        return;
	                    }

	                    //if highlights for this page have already been checked/loaded, return
	                    for (var i = 0; i < settings.highlightedPages.length; i++)
	                    {
	                        if (settings.highlightedPages[i] === pageIndex)
	                        {
	                            return;
	                        }
	                    }

	                    getAnnotationsList(pageIndex, settings.manifest);
	                }, divaSettings.ID);

	                var activeOverlays = [];

	                //on mouseover, show the annotation text
	                divaSettings.innerObject.on('mouseenter', '.' + divaSettings.ID + 'highlight', function(e)
	                {
	                    var annotationElement = e.target;
	                    var name = annotationElement.dataset.name;
	                    var textOverlay = document.createElement('div');

	                    textOverlay.style.top = (annotationElement.offsetTop + annotationElement.offsetHeight - 1) + 'px';
	                    textOverlay.style.left = annotationElement.style.left;
	                    textOverlay.style.background = '#fff';
	                    textOverlay.style.border = '1px solid #555';
	                    textOverlay.style.position = 'absolute';
	                    textOverlay.style.zIndex = 101;
	                    textOverlay.className = 'annotation-overlay';
	                    textOverlay.textContent = name;

	                    annotationElement.parentNode.appendChild(textOverlay);
	                    activeOverlays.push(textOverlay);
	                });

	                divaSettings.innerObject.on('mouseleave', '.' + divaSettings.ID + 'highlight', function(e)
	                {
	                    while (activeOverlays.length)
	                    {
	                        var textOverlay = activeOverlays.pop();
	                        textOverlay.parentNode.removeChild(textOverlay);
	                    }
	                });

	                diva.Events.subscribe('ViewerDidLoad', function(){
	                    //button to toggle annotations
	                    $('#' + divaSettings.ID + 'page-nav').before('<div id="' + divaSettings.ID + 'annotations-icon" class="diva-button diva-annotations-icon" title="Turn annotations on or off"></div>');

	                    $(divaSettings.selector + 'annotations-icon').addClass('annotations-icon-active');

	                    $('#' + divaSettings.ID + 'annotations-icon').on('click', function(e)
	                    {
	                        //toggle visibility of annotations
	                        if (settings.highlightsVisible)
	                        {
	                            divaInstance.hideHighlights();
	                            $(divaSettings.selector + 'annotations-icon').removeClass('annotations-icon-active');
	                        }
	                        else
	                        {
	                            divaInstance.showHighlights();
	                            $(divaSettings.selector + 'annotations-icon').addClass('annotations-icon-active');
	                        }
	                    });
	                }, divaSettings.ID);

	                //enable annotations by default
	                settings.highlightsVisible = true;

	                return true;
	            },
	            destroy: function (divaSettings, divaInstance)
	            {
	                divaSettings.parentObject.removeData('highlights');
	            },
	            pluginName: 'IIIFHighlight',
	            titleText: 'Highlight regions of pages'
	        };
	        return retval;
	    })();
	})(jQuery);


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// IIIF Metadata plugin for diva.js
	// Displays object metadata from a IIIF manifest

	var jQuery = __webpack_require__(3);
	var diva = __webpack_require__(7);

	(function ($)
	{
	    module.exports = (function()
	    {
	        var retval =
	        {
	            init: function(divaSettings, divaInstance)
	            {
	                var _displayMetadata = function(manifest)
	                {
	                    var showMetadata = function(label, value)
	                    {
	                        var labelProper = label.charAt(0).toUpperCase() + label.slice(1);
	                        var labelFormatted = labelProper.replace('_', ' ');

	                        if (value.match(/^https?:\/\//))
	                        {
	                            value = '<a href="' + value + '" target="_blank">' + value + '</a>';
	                        }

	                        return '<div class="metadata-row"><span class="metadata-label">' + labelFormatted + ':</span> <span class="metadata-value">' +
	                            value  + '</span></div>';
	                    };

	                    var getDataForLanguage = function(data, language)
	                    {
	                        for (var i = 0; i < data.length; i++)
	                        {
	                            if (data[i]['@language'] === language)
	                            {
	                                return data[i]['@value'];
	                            }
	                        }

	                        // Handle the case where no language is specified, or when a single object is passed
	                        return data[0]['@value'] || data['@value'];
	                    };

	                    /**
	                     * Shows metadata from label names (if the metadata exists).
	                     * @param names {Array} - An array of strings representing field names to display.
	                     */
	                    var showMetadataFromLabelNames = function(names)
	                    {
	                        var elements = '';

	                        for (var i = 0; i < names.length; i++)
	                        {
	                            var field = names[i];

	                            if (manifest.hasOwnProperty(field))
	                            {
	                                if (manifest[field].constructor === Array)
	                                {
	                                    //multiple languages
	                                    var localizedData = getDataForLanguage(manifest[field], 'en');
	                                    elements += showMetadata(field, localizedData);
	                                }
	                                else
	                                {
	                                    elements += showMetadata(field, manifest[field]);
	                                }
	                            }
	                        }

	                        return elements;
	                    };

	                    var metadataElement = '<div id="' + divaSettings.ID + 'metadata" class="diva-modal">';
	                    metadataElement += showMetadataFromLabelNames(['label']);

	                    if (manifest.hasOwnProperty('metadata'))
	                    {
	                        var metadataField = manifest.metadata;

	                        for (var i = 0; i < metadataField.length; i++)
	                        {
	                            if (metadataField[i].value.constructor === Array)
	                            {
	                                var canonicalData = getDataForLanguage(metadataField[i].value, 'en');
	                                metadataElement += showMetadata(metadataField[i].label, canonicalData);
	                            }
	                            else
	                            {
	                                metadataElement += showMetadata(metadataField[i].label, metadataField[i].value);
	                            }
	                        }
	                    }

	                    metadataElement += showMetadataFromLabelNames([
	                        'description',
	                        'within',
	                        'see_also',
	                        'license',
	                        'attribution'
	                    ]);

	                    metadataElement += '</div>';

	                    divaSettings.parentObject.prepend(metadataElement);
	                    $(divaSettings.selector + 'metadata').hide();
	                };

	                //subscribe to ManifestDidLoad event, get the manifest
	                diva.Events.subscribe('ManifestDidLoad', _displayMetadata, divaSettings.ID);

	                divaSettings.parentObject.prepend('<div style="text-align: center; clear: both"><a href="#" id="' + divaSettings.ID + 'metadata-link" class="diva-metadata-link">Details</a></div>');
	                // $(divaSettings.selector + 'title').append('<div><a href="#" id="' + divaSettings.ID + 'metadata-link" class="diva-metadata-link">Details</a></div>');

	                $(divaSettings.selector + 'metadata-link').on('click', function(e)
	                {
	                    $(divaSettings.selector + 'metadata').fadeToggle('fast');
	                });

	                return true;
	            },
	            destroy: function (divaSettings, divaInstance)
	            {
	            },
	            pluginName: 'IIIFMetadata',
	            titleText: 'Show metadata from a IIIF manifest'
	        };
	        return retval;
	    })();
	})(jQuery);


/***/ }
/******/ ])
});
;
//# sourceMappingURL=diva.js.map