/*!
 * jQuery Lazy - v1.6.5
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2016, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * $("img.lazy").lazy();
 */

;(function($, window, document, undefined)
{
    "use strict";

    // make lazy a bit more case-insensitive :)
    $.fn.Lazy = $.fn.lazy = function(settings)
    {
        return new LazyPlugin(this, settings);
    };

    /**
     * contains all logic and the whole element handling
     * is packed in a private function outside class to reduce memory usage, because it will not be created on every plugin instance
     * @access private
     * @type {function}
     * @param {LazyPlugin} instance
     * @param {function} configuration
     * @param {object} items
     * @param {object} events
     * @return void
     */
    function _executeLazy(instance, configuration, items, events)
    {
        /**
         * a helper to trigger the 'onFinishedAll' callback after all other events
         * @access private
         * @type {number}
         */
        var _awaitingAfterLoad = 0,

        /**
         * visible content width
         * @access private
         * @type {number}
         */
        _actualWidth = -1,

        /**
         * visible content height
         * @access private
         * @type {number}
         */
        _actualHeight = -1,

        /**
         * determine possible detected high pixel density
         * @access private
         * @type {boolean}
         */
        _isRetinaDisplay = false;

        /**
         * initialize plugin
         * bind loading to events or set delay time to load all items at once
         * @access private
         * @return void
         */
        function _initialize()
        {
            // detect actual device pixel ratio
            // noinspection JSUnresolvedVariable
            _isRetinaDisplay = window.devicePixelRatio > 1;

            // prepare all initial items
            _prepareItems(items);

            // if delay time is set load all items at once after delay time
            if( configuration("delay") >= 0 ) setTimeout(function() { _lazyLoadItems(true); }, configuration("delay"));

            // if no delay is set or combine usage is active bind events
            if( configuration("delay") < 0 || configuration("combined") )
            {
                // create unique event function
                events.e = _throttle(configuration("throttle"), function(event)
                {
                    // reset detected window size on resize event
                    if( event.type === "resize" )
                        _actualWidth = _actualHeight = -1;

                    // execute 'lazy magic'
                    _lazyLoadItems(event.all);
                });

                // create function to add new items to instance
                events.a = function(additionalItems)
                {
                    _prepareItems(additionalItems);
                    items.push.apply(items, additionalItems);
                };

                // create function to get all instance items left
                events.g = function()
                {
                    return items;
                };

                // load initial items
                _lazyLoadItems();

                // bind lazy load functions to scroll and resize event
                $(configuration("appendScroll")).on("scroll." + instance.name + " resize." + instance.name, events.e);
            }
        }

        /**
         * prepare items before handle them
         * @access private
         * @param {Array|object|jQuery} items
         * @return void
         */
        function _prepareItems(items)
        {
            // filter items and only add those who not handled yet and got needed attributes available
            items = $(items).filter(function()
            {
                return !$(this).data(configuration("handledName")) && ($(this).attr(configuration("attribute")) || $(this).attr(configuration("loaderAttribute")));
            })

            // append plugin instance to all elements
            .data("plugin_" + instance.name, instance);

            // set default image and/or placeholder to elements if configured
            if( configuration("defaultImage") || configuration("placeholder") )
                for( var i = 0; i < items.length; i++ )
                {
                    var element = $(items[i]),
                        tag = items[i].tagName.toLowerCase(),
                        propertyName = "background-image";

                    // set default image on every element without source
                    if( tag == "img" && configuration("defaultImage") && !element.attr("src") )
                        element.attr("src", configuration("defaultImage"));

                    // set placeholder on every element without background image
                    else if( tag != "img" && configuration("placeholder") && (!element.css(propertyName) || element.css(propertyName) == "none") )
                        element.css(propertyName, "url(" + configuration("placeholder") + ")");
                }
        }

        /**
         * the 'lazy magic' - check all items
         * @access private
         * @param {boolean} [allItems]
         * @return void
         */
        function _lazyLoadItems(allItems)
        {
            // skip if no items where left
            if( !items.length )
            {
                // destroy instance if option is enabled
                if( configuration("autoDestroy") )
                    // noinspection JSUnresolvedFunction
                    instance.destroy();

                return;
            }

            // helper to see if something was changed
            var loadTriggered = false,

            // get image base once, not on every image loop
            imageBase = configuration("imageBase") ? configuration("imageBase") : "";

            // loop all available items
            for( var i = 0; i < items.length; i++ )
                (function(item)
                {
                    // item is at least in loadable area
                    if( _isInLoadableArea(item) || allItems )
                    {
                        var element = $(item),
                            tag = item.tagName.toLowerCase(),
                            attribute = element.attr(configuration("attribute")),
                            customLoader;

                            // is not already handled 
                        if( !element.data(configuration("handledName")) &&
                            // and is visible or visibility doesn't matter
                            (!configuration("visibleOnly") || element.is(":visible")) && (
                            // and image source attribute is available
                            attribute && (
                            // and is image tag where attribute is not equal source
                            (tag == "img" && imageBase + attribute != element.attr("src")) ||
                            // or is non image tag where attribute is not equal background
                            (tag != "img" && imageBase + attribute != element.css("background-image")) ) ||
                            // or custom loader is available
                            (customLoader = element.attr(configuration("loaderAttribute"))) ))
                        {
                            // mark element always as handled as this point to prevent double loading
                            loadTriggered = true;
                            element.data(configuration("handledName"), true);

                            // load item
                            _handleItem(element, tag, imageBase, customLoader);
                        }
                    }
                })(items[i]);

            // when something was loaded remove them from remaining items
            if( loadTriggered )
                items = $(items).filter(function()
                {
                    return !$(this).data(configuration("handledName"));
                });
        }

        /**
         * load the given element the lazy way
         * @access private
         * @param {object} element
         * @param {string} tag
         * @param {string} imageBase
         * @param {function} [customLoader]
         * @return void
         */
        function _handleItem(element, tag, imageBase, customLoader)
        {
            // increment count of items waiting for after load
            ++_awaitingAfterLoad;

            // extended error callback for correct 'onFinishedAll' handling
            var errorCallback = function()
            {
                _triggerCallback("onError", element);
                _reduceAwaiting();
            };

            // trigger function before loading image
            _triggerCallback("beforeLoad", element);

            // handle custom loader
            if( customLoader )
            {
                // bind error event to trigger callback and reduce waiting amount
                element.off("error").one("error", errorCallback);

                // bind after load callback to image
                element.one("load", function()
                {
                    // remove attribute from element
                    if( configuration("removeAttribute") )
                        element.removeAttr(configuration("loaderAttribute"));

                    // call after load event
                    _triggerCallback("afterLoad", element);

                    // remove item from waiting queue and possible trigger finished event
                    _reduceAwaiting();
                });

                // trigger custom loader
                if( !_triggerCallback(customLoader, element, function(response)
                {
                    if( response ) element.load();
                    else element.error();
                })) element.error();
            }

            // handle images
            else
            {
                // create image object
                var imageObj = $(new Image());

                // bind error event to trigger callback and reduce waiting amount
                imageObj.one("error", errorCallback);

                // bind after load callback to image
                imageObj.one("load", function()
                {
                    // remove element from view
                    element.hide();

                    // set image back to element
                    if( tag == "img" ) element.attr("src", imageObj.attr("src"));
                    else element.css("background-image", "url(" + imageObj.attr("src") + ")");

                    // bring it back with some effect!
                    element[configuration("effect")](configuration("effectTime"));

                    // remove attribute from element
                    if( configuration("removeAttribute") )
                        element.removeAttr(configuration("attribute") + " " + configuration("retinaAttribute"));

                    // call after load event
                    _triggerCallback("afterLoad", element);

                    // cleanup image object
                    imageObj.remove();

                    // remove item from waiting queue and possible trigger finished event
                    _reduceAwaiting();
                });

                // set source
                imageObj.attr("src", imageBase + element.attr(configuration(_isRetinaDisplay && element.attr(configuration("retinaAttribute")) ? "retinaAttribute" : "attribute")));

                // call after load even on cached image
                if( imageObj.complete ) imageObj.load();
            }
        }

        /**
         * check if the given element is inside the current viewport or threshold
         * @access private
         * @param {object} element
         * @return {boolean}
         */
        function _isInLoadableArea(element)
        {
            var elementBound = element.getBoundingClientRect(),
                direction    = configuration("scrollDirection"),
                threshold    = configuration("threshold"),
                vertical     = // check if element is in loadable area from top
                               ((_getActualHeight() + threshold) > elementBound.top) &&
                               // check if element is even in loadable are from bottom
                               (-threshold < elementBound.bottom),
                horizontal   = // check if element is in loadable area from left
                               ((_getActualWidth() + threshold) > elementBound.left) &&
                               // check if element is even in loadable area from right
                               (-threshold < elementBound.right);

            if( direction == "vertical" ) return vertical;
            else if( direction == "horizontal" ) return horizontal;

            return vertical && horizontal;
        }

        /**
         * receive the current viewed width of the browser
         * @access private
         * @return {number}
         */
        function _getActualWidth()
        {
            return _actualWidth >= 0 ? _actualWidth : (_actualWidth = $(window).width());
        }

        /**
         * receive the current viewed height of the browser
         * @access private
         * @return {number}
         */
        function _getActualHeight()
        {
            return _actualHeight >= 0 ? _actualHeight : (_actualHeight = $(window).height());
        }

        /**
         * helper function to throttle down event triggering
         * @access private
         * @param {number} delay
         * @param {function} callback
         * @return {function}
         */
        function _throttle(delay, callback)
        {
            var timeout, lastExecute = 0;

            return function(event, ignoreThrottle)
            {
                var elapsed = +new Date() - lastExecute;

                function run()
                {
                    lastExecute = +new Date();
                    callback.call(instance, event);
                }

                timeout && clearTimeout(timeout);

                if( elapsed > delay || !configuration("enableThrottle") || ignoreThrottle ) run();
                else timeout = setTimeout(run, delay - elapsed);
            };
        }

        /**
         * reduce count of awaiting elements to 'afterLoad' event and fire 'onFinishedAll' if reached zero
         * @access private
         * @return void
         */
        function _reduceAwaiting()
        {
            --_awaitingAfterLoad;

            // if no items were left trigger finished event
            if( !items.size() && !_awaitingAfterLoad ) _triggerCallback("onFinishedAll");
        }

        /**
         * single implementation to handle callbacks, pass element and set 'this' to current instance
         * @access private
         * @param {string|function} callback
         * @param {object} [element]
         * @param {*} [args]
         * @return {boolean}
         */
        function _triggerCallback(callback, element, args)
        {
            if( (callback = configuration(callback)) )
            {
                // jQuery's internal '$(arguments).slice(1)' are causing problems at least on old iPads
                // below is shorthand of 'Array.prototype.slice.call(arguments, 1)'
                callback.apply(instance, [].slice.call(arguments, 1));
                return true;
            }

            return false;
        }

        // set up lazy
        (function()
        {
            // if event driven don't wait for page loading
            if( configuration("bind") == "event" ) _initialize();

            // otherwise load initial items and start lazy after page load
            else $(window).load(_initialize);
        })();
    }

    /**
     * lazy plugin class constructor
     * @constructor
     * @access private
     * @param {object} elements
     * @param {object} settings
     * @return {object|LazyPlugin}
     */
    function LazyPlugin(elements, settings)
    {
        /**
         * this lazy plugin instance
         * @access private
         * @type {object|LazyPlugin}
         */
        var _instance = this,

        /**
         * this lazy plugin instance configuration
         * @access private
         * @type {object}
         */
        _config = $.extend({}, _instance.configuration, settings),

        /**
         * instance generated event executed on container scroll or resize
         * packed in an object to be referenceable and short named because properties will not be minified
         * @access private
         * @type {object}
         */
        _events = {};

        // noinspection JSUndefinedPropertyAssignment
        /**
         * wrapper to get or set an entry from plugin instance configuration
         * much smaller on minify as direct access
         * @access private
         * @type {function}
         * @param {string} entryName
         * @param {*} [value]
         * @return {LazyPlugin|*}
         */
        _instance.config = function(entryName, value)
        {
            if( value === undefined )
                return _config[entryName];
            else
                _config[entryName] = value;

            return _instance;
        };

        // noinspection JSUndefinedPropertyAssignment
        /**
         * add additional items to current instance
         * @access public
         * @param {Array|object|string} items
         * @return {LazyPlugin}
         */
        _instance.addItems = function(items)
        {
            if( _events.a )
                _events.a($.type(items) === "string" ? $(items) : items);

            return _instance;
        };

        // noinspection JSUndefinedPropertyAssignment
        /**
         * get all left items of this instance
         * @access public
         * @returns {object}
         */
        _instance.getItems = function()
        {
            return _events.g ? _events.g() : {};
        };

        // noinspection JSUndefinedPropertyAssignment
        /**
         * force lazy to load all items in loadable area right now
         * by default without throttle
         * @access public
         * @type {function}
         * @param {boolean} [useThrottle]
         * @return {LazyPlugin}
         */
        _instance.update = function(useThrottle)
        {
            if( _events.e )
                _events.e({}, !useThrottle);

            return _instance;
        };

        // noinspection JSUndefinedPropertyAssignment
        /**
         * force lazy to load all available items right now
         * this call ignores throttling
         * @access public
         * @type {function}
         * @return {LazyPlugin}
         */
        _instance.loadAll = function()
        {
            if( _events.e )
                _events.e({all: true}, true);

            return _instance;
        };

        // noinspection JSUndefinedPropertyAssignment
        /**
         * destroy this plugin instance
         * @access public
         * @type {function}
         * @return undefined
         */
        _instance.destroy = function ()
        {
            // unbind instance generated events
            // noinspection JSUnresolvedFunction
            $(_instance.config("appendScroll")).off("." + _instance.name, _events.e);

            // clear events
            _events = {};

            return undefined;
        };

        // start using lazy and return all elements to be chainable or instance for further use
        // noinspection JSUnresolvedVariable
        _executeLazy(_instance, _instance.config, elements, _events);
        // noinspection JSUnresolvedFunction
        return _instance.config("chainable") ? elements : _instance;
    }

    // use jquery to extend class prototype without conflicts
    $.extend(LazyPlugin.prototype,
    {
        /**
         * internal name used for bindings and namespaces
         * @access public
         * @var {string}
         */
        name: "lazy",

        /**
         * settings and configuration data
         * @access public
         * @type {object}
         */
        configuration:
        {
            // general
            chainable       : true,
            autoDestroy     : true,
            bind            : "load",
            threshold       : 500,
            visibleOnly     : false,
            appendScroll    : window,
            scrollDirection : "both",
            imageBase       : null,
            defaultImage    : "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            placeholder     : null,
            delay           : -1,
            combined        : false,

            // attributes
            attribute       : "data-src",
            retinaAttribute : "data-retina",
            loaderAttribute : "data-loader",
            removeAttribute : true,
            handledName     : "handled",

            // effect
            effect          : "show",
            effectTime      : 0,

            // throttle
            enableThrottle  : true,
            throttle        : 250,

            // callbacks
            beforeLoad      : null,
            afterLoad       : null,
            onError         : null,
            onFinishedAll   : null
        }
    });
})(jQuery, window, document);