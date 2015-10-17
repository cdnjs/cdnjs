/*!
 * jQuery Lazy - v0.2.2
 * http://jquery.eisbehr.de/lazy/
 * http://eisbehr.de
 *
 * Copyright 2014, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * jQuery("img.lazy").lazy();
 */

(function($, window, document, undefined)
{
    $.fn.lazy = function(settings)
    {
        /**
         * settings and configuration data
         * @type {}
         */
        var configuration =
        {
            // general
            bind            : "load",
            threshold       : 500,
            fallbackHeight  : 2000,
            visibleOnly     : true,
            appendScroll    : window,

            // delay
            delay           : -1,
            combined        : false,

            // attribute
            attribute       : "data-src",
            removeAttribute : true,

            // effect
            effect          : "show",
            effectTime      : 0,

            // throttle
            enableThrottle  : false,
            throttle        : 250,

            // callback
            beforeLoad      : null,
            onLoad          : null,
            afterLoad       : null,
            onError         : null,
            onFinishedAll   : null
        };

        // overwrite configuration with custom user settings
        if( settings ) $.extend(configuration, settings);

        // all given items by jQuery selector
        var items = this;

        // a helper to trigger the onFinishedAll after all other events
        var awaitingAfterLoad = 0;

        // on first page load get initial images
        if( configuration.bind == "load" ) $(window).load(_init);

        // if event driven don't wait for page loading
        else if( configuration.bind == "event" ) _init();

        // bind error callback to images if wanted
        if( configuration.onError ) items.bind("error", function() { _triggerCallback(configuration.onError, $(this)); });

        /**
         * lazyLoadImages(allImages)
         *
         * the 'lazy magic'
         * check and load all needed images
         *
         * @param allImages boolean
         * @return void
         */
        function lazyLoadImages(allImages)
        {
            if( typeof allImages != "boolean" ) allImages = false;

            items.each(function()
            {
                var element = $(this);
                var tag = this.tagName.toLowerCase();

                if( _isInLoadableArea(element) || allImages )
                {
                    // the lazy magic
                    if( // image source attribute is available
                        element.attr(configuration.attribute) &&
                        // and is image tag where attribute is not equal source 
                        ((tag == "img" && element.attr(configuration.attribute) != element.attr("src")) ||
                        // or is non image tag where attribute is not equal background
                        ((tag != "img" && element.attr(configuration.attribute) != element.css("background-image"))) ) &&
                        // and is not actually loaded just before
                        !element.data("loaded") &&
                        // and is visible or visibility doesn't matter
                        (element.is(":visible") || !configuration.visibleOnly) )
                    {
                        // create image object						
                        var imageObj = $(new Image());

                        // increment count of items waiting for after load
                        ++awaitingAfterLoad;

                        // bind error event if wanted, otherwise only reduce waiting count
                        if(configuration.onError) imageObj.error(function() { _triggerCallback(configuration.onError, element); _reduceAwaiting(); });
                        else imageObj.error(function() { _reduceAwaiting(); });

                        // bind after load callback to image
                        var onLoad = true;
                        imageObj.one("load", function()
                        {
                            var callable = function()
                            {
                                if( onLoad )
                                {
                                    window.setTimeout(callable, 100);
                                    return;
                                }

                                // remove element from view
                                element.hide();

                                // set image back to element
                                if( tag == "img" ) element.attr("src", imageObj.attr("src"));
                                else element.css("background-image", "url(" + imageObj.attr("src") + ")");

                                // bring it back with some effect!
                                element[configuration.effect](configuration.effectTime);

                                // remove attribute from element
                                if( configuration.removeAttribute ) element.removeAttr(configuration.attribute);

                                // call after load event
                                _triggerCallback(configuration.afterLoad, element);

                                // unbind event and remove image object
                                imageObj.unbind("load");
                                imageObj.remove();

                                // remove item from waiting cue and possible trigger finished event
                                _reduceAwaiting();
                            };

                            callable();
                        });

                        // trigger function before loading image
                        _triggerCallback(configuration.beforeLoad, element);

                        // set source
                        imageObj.attr("src", element.attr(configuration.attribute));

                        // trigger function before loading image
                        _triggerCallback(configuration.onLoad, element);
                        onLoad = false;

                        // call after load even on cached image
                        if( imageObj.complete ) imageObj.load();

                        // mark element always as loaded
                        element.data("loaded", true);
                    }
                }
            });

            // cleanup all items which are already loaded
            items = $(items).filter(function()
            {
                return !$(this).data("loaded");
            });
        }

        /**
         * _init()
         *
         * initialize lazy plugin
         * bind loading to events or set delay time to load all images at once
         *
         * @return void
         */
        function _init()
        {
            // if delay time is set load all images at once after delay time
            if( configuration.delay >= 0 ) setTimeout(function() { lazyLoadImages(true); }, configuration.delay);

            // if no delay is set or combine usage is active bind events
            if( configuration.delay < 0 || configuration.combined )
            {
                // load initial images
                lazyLoadImages(false);

                // bind lazy load functions to scroll and resize event
                $(configuration.appendScroll).bind("scroll", _throttle(configuration.throttle, lazyLoadImages));
                $(configuration.appendScroll).bind("resize", _throttle(configuration.throttle, lazyLoadImages));
            }
        }

        /**
         * _isInLoadableArea(element)
         *
         * check if the given element is inside the current viewport or threshold
         *
         * @param element jQuery
         * @return boolean
         */
        function _isInLoadableArea(element)
        {
            var scrolledFromTop  = _getScrolledFromTop(),
                viewedHeight     = _getActualHeight(),
                elementTopOffset = element.offset().top,
                elementHeight    = element.height();

                   // check if element is in loadable area from top
            return ((scrolledFromTop + viewedHeight + configuration.threshold) > elementTopOffset) &&  
                   // check if element is even in loadable are from bottom
                   ((elementTopOffset + elementHeight) > (scrolledFromTop - configuration.threshold)); 
        }

        /**
         * _getScrolledFromTop()
         *
         * allocate actual scroll distance from document top
         * by different ways for cross-compatibility
         *
         * @return number
         */
        function _getScrolledFromTop()
        {
            if( document.documentElement.scrollTop )
                return document.documentElement.scrollTop;

            return document.body.scrollTop
        }

        /**
         * _getActualHeight()
         *
         * try to allocate current viewed height of the browser
         * uses fallback option when no height is found
         *
         * @return number
         */
        function _getActualHeight()
        {
            if( window.innerHeight ) return window.innerHeight;
            if( document.documentElement && document.documentElement.clientHeight ) return document.documentElement.clientHeight;
            if( document.body && document.body.clientHeight ) return document.body.clientHeight;
            if( document.body && document.body.offsetHeight ) return document.body.offsetHeight;

            return configuration.fallbackHeight;
        }

        /**
         * _throttle(delay, call)
         *
         * helper function to throttle down event triggering
         *
         * @param delay integer
         * @param call function object
         * @return function object
         */
        function _throttle(delay, call)
        {
            var _timeout;
            var _exec = 0;

            function callable()
            {
                var elapsed = +new Date() - _exec;

                function run()
                {
                    _exec = +new Date();
                    call.apply();
                }

                _timeout && clearTimeout(_timeout);

                if( elapsed > delay || !configuration.enableThrottle ) run();
                else _timeout = setTimeout(run, delay - elapsed);
            }

            return callable;
        }

        /**
         * _reduceAwaiting()
         *
         * reduce count of awaiting elements to the afterLoad event and fire onFinishedAll if reached zero
         *
         * @return void
         */
        function _reduceAwaiting()
        {
            --awaitingAfterLoad;

            // if no items were left trigger finished event 
            if( !items.size() && !awaitingAfterLoad ) _triggerCallback(configuration.onFinishedAll, null);
        }

        /**
         * _triggerCallback(callback, element)
         *
         * single implementation to handle callbacks and pass parameter
         *
         * @param callback function object
         * @param element jQuery
         * @return void
         */
        function _triggerCallback(callback, element)
        {
            if( callback )
            {
                if( element !== null )
                    callback(element);
                else
                    callback();
            }
        }

        return this;
    };

    // make lazy a bit more case-insensitive :)
    $.fn.Lazy = $.fn.lazy;

})(jQuery, window, document);