/*!
 * jQuery Lazy - v0.3.8
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
        "use strict";

        /**
         * settings and configuration data
         * @access private
         * @type {*}
         */
        var _configuration =
        {
            // general
            bind            : "load",
            threshold       : 500,
            fallbackWidth   : 2000,
            fallbackHeight  : 2000,
            visibleOnly     : false,
            appendScroll    : window,
            scrollDirection : "both",
            defaultImage    : "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            placeholder     : null,

            // delay
            delay           : -1,
            combined        : false,

            // attributes
            attribute       : "data-src",
            retinaAttribute : "data-retina",
            removeAttribute : true,
            handledName     : "handled",

            // effect
            effect          : "show",
            effectTime      : 0,

            // throttle
            enableThrottle  : false,
            throttle        : 250,

            // queue
            enableQueueing  : true,

            // callbacks
            beforeLoad      : null,
            onLoad          : null,
            afterLoad       : null,
            onError         : null,
            onFinishedAll   : null
        },

        /**
         * all given items by jQuery selector
         * @access private
         * @type {*}
         */
        _items = this,

        /**
         * a helper to trigger the onFinishedAll after all other events
         * @access private
         * @type {number}
         */
        _awaitingAfterLoad = 0,

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
         * detected device pixel ration
         * @access private
         * @type {boolean}
         */
        _isRetinaDisplay = false,

        /**
         * queue timer instance
         * @access private
         * @type {null|number}
         */
        _queueTimer = null,

        /**
         * array of items in queue
         * @access private
         * @type {Array}
         */
        _queueItems = [],

        /**
         * identifies if queue actually contains the lazy magic
         * @access private
         * @type {boolean}
         */
        _queueContainsMagic = false;

        /**
         * initialize plugin - bind loading to events or set delay time to load all images at once
         * @access private
         * @return void
         */
        function _init()
        {
            // detect actual device pixel ratio
            // noinspection JSUnresolvedVariable
            _isRetinaDisplay = window.devicePixelRatio > 1;

            // set default image and placeholder to all images if nothing other is set
            if( _configuration.defaultImage !== null || _configuration.placeholder !== null )
                for( var i = 0; i < _items.length; i++ )
                {
                    var element = $(_items[i]);

                    // default image
                    if( _configuration.defaultImage !== null && !element.attr("src") )
                        element.attr("src", _configuration.defaultImage);

                    // placeholder
                    if( _configuration.placeholder !== null && (!element.css("background-image") || element.css("background-image") == "none") )
                        element.css("background-image", "url(" + _configuration.placeholder + ")");
                }

            // if delay time is set load all images at once after delay time
            if( _configuration.delay >= 0 ) setTimeout(function() { _lazyLoadImages(true); }, _configuration.delay);

            // if no delay is set or combine usage is active bind events
            if( _configuration.delay < 0 || _configuration.combined )
            {
                // load initial images
                _lazyLoadImages(false);

                // bind lazy load functions to scroll event
                _addToQueue(function()
                {
                    $(_configuration.appendScroll).bind("scroll", _throttle(_configuration.throttle, function()
                    {
                        _addToQueue(function() { _lazyLoadImages(false) }, this, true);
                    }));
                }, this);

                // bind lazy load functions to resize event
                _addToQueue(function()
                {
                    $(_configuration.appendScroll).bind("resize", _throttle(_configuration.throttle, function()
                    {
                        _actualWidth = _actualHeight = -1;
                        _addToQueue(function() { _lazyLoadImages(false) }, this, true);
                    }));
                }, this);
            }
        }

        /**
         * the 'lazy magic' - check all items
         * @access private
         * @param {boolean} allImages
         * @return void
         */
        function _lazyLoadImages(allImages)
        {
            // stop if no items where left
            if( !_items.length ) return;

            // helper to see if something was changed
            var loadedImages = false;

            for( var i = 0; i < _items.length; i++ )
            {
                (function()
                {
                    var item = _items[i], element = $(item);

                    if( _isInLoadableArea(item) || allImages )
                    {
                        var tag = item.tagName.toLowerCase();

                        if( // image source attribute is available
                            element.attr(_configuration.attribute) &&
                            // and is image tag where attribute is not equal source 
                            ((tag == "img" && element.attr(_configuration.attribute) != element.attr("src")) ||
                            // or is non image tag where attribute is not equal background
                            ((tag != "img" && element.attr(_configuration.attribute) != element.css("background-image"))) ) &&
                            // and is not actually loaded just before
                            !element.data(_configuration.handledName) &&
                            // and is visible or visibility doesn't matter
                            (element.is(":visible") || !_configuration.visibleOnly) )
                        {
                            loadedImages = true;

                            // mark element always as handled as this point to prevent double loading
                            element.data(_configuration.handledName, true);

                            // add item to loading queue
                            _addToQueue(function() { _handleItem(element, tag) }, this);
                        }
                    }
                })();
            }

            // when something was loaded remove them from remaining items
            if( loadedImages ) _addToQueue(function()
            {
                _items = $(_items).filter(function()
                {
                    return !$(this).data(_configuration.handledName);
                });
            }, this);
        }

        /**
         * load the given element the lazy way
         * @access private
         * @param {object} element
         * @param {string} tag
         * @return void
         */
        function _handleItem(element, tag)
        {
            // create image object
            var imageObj = $(new Image());

            // increment count of items waiting for after load
            ++_awaitingAfterLoad;

            // bind error event if wanted, otherwise only reduce waiting count
            if( _configuration.onError ) imageObj.error(function() { _triggerCallback(_configuration.onError, element); _reduceAwaiting(); });
            else imageObj.error(function() { _reduceAwaiting(); });

            // bind after load callback to image
            var onLoad = false;
            imageObj.one("load", function()
            {
                var callable = function()
                {
                    if( !onLoad )
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
                    element[_configuration.effect](_configuration.effectTime);

                    // remove attribute from element
                    if( _configuration.removeAttribute )
                    {
                        element.removeAttr(_configuration.attribute);
                        element.removeAttr(_configuration.retinaAttribute);
                    }

                    // call after load event
                    _triggerCallback(_configuration.afterLoad, element);

                    // unbind event and remove image object
                    imageObj.unbind("load").remove();

                    // remove item from waiting cue and possible trigger finished event
                    _reduceAwaiting();
                };

                callable();
            });

            // trigger function before loading image
            _triggerCallback(_configuration.beforeLoad, element);

            // set source
            imageObj.attr("src", _isRetinaDisplay && element.attr(_configuration.retinaAttribute) ?
                                 element.attr(_configuration.retinaAttribute) : element.attr(_configuration.attribute));

            // trigger function before loading image
            _triggerCallback(_configuration.onLoad, element);
            onLoad = true;

            // call after load even on cached image
            if( imageObj.complete ) imageObj.load();
        }

        /**
         * check if the given element is inside the current view or threshold
         * @access private
         * @param {object} element
         * @return {boolean}
         */
        function _isInLoadableArea(element)
        {
            var viewedWidth  = _getActualWidth(),
                viewedHeight = _getActualHeight(),
                elementBound = element.getBoundingClientRect(),
                vertical     = // check if element is in loadable area from top
                               ((viewedHeight + _configuration.threshold) > elementBound.top) &&
                               // check if element is even in loadable are from bottom
                               (-_configuration.threshold < elementBound.bottom),
                horizontal   = // check if element is in loadable area from left
                               ((viewedWidth + _configuration.threshold) > elementBound.left) &&
                               // check if element is even in loadable are from right
                               (-_configuration.threshold < elementBound.right);

            if( _configuration.scrollDirection == "vertical" ) return vertical;
            else if( _configuration.scrollDirection == "horizontal" ) return horizontal;

            return vertical && horizontal;
        }

        /**
         * try to allocate current viewed width of the browser
         * uses fallback option when no height is found
         * @access private
         * @return {number}
         */
        function _getActualWidth()
        {
            if( _actualWidth >= 0 ) return _actualWidth;

            _actualWidth = window.innerWidth ||
                           document.documentElement.clientWidth ||
                           document.body.clientWidth ||
                           document.body.offsetWidth ||
                           _configuration.fallbackWidth;

            return _actualWidth;
        }

        /**
         * try to allocate current viewed height of the browser
         * uses fallback option when no height is found
         * @access private
         * @return {number}
         */
        function _getActualHeight()
        {
            if( _actualHeight >= 0 ) return _actualHeight;

            _actualHeight = window.innerHeight ||
                            document.documentElement.clientHeight ||
                            document.body.clientHeight ||
                            document.body.offsetHeight ||
                            _configuration.fallbackHeight;

            return _actualHeight;
        }

        /**
         * helper function to throttle down event triggering
         * @access private
         * @param {number} delay
         * @param {function} call
         * @return {function}
         */
        function _throttle(delay, call)
        {
            var _timeout, _exec = 0;

            function callable()
            {
                var elapsed = +new Date() - _exec;

                function run()
                {
                    _exec = +new Date();
                    call.apply(undefined);
                }

                _timeout && clearTimeout(_timeout);

                if( elapsed > delay || !_configuration.enableThrottle ) run();
                else _timeout = setTimeout(run, delay - elapsed);
            }

            return callable;
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
            if( !_items.size() && !_awaitingAfterLoad ) _triggerCallback(_configuration.onFinishedAll, null);
        }

        /**
         * single implementation to handle callbacks and pass parameter
         * @access private
         * @param {function} callback
         * @param {object} [element]
         * @return void
         */
        function _triggerCallback(callback, element)
        {
            if( callback )
            {
                if( element )
                    _addToQueue(function() { callback(element); }, this);
                else
                    _addToQueue(callback, this);
            }
        }

        /**
         * set next timer for queue execution
         * @access private
         * @return void
         */
        function _setQueueTimer()
        {
            _queueTimer = setTimeout(function()
            {
                _addToQueue();
                if( _queueItems.length ) _setQueueTimer();
            }, 2);
        }

        /**
         * add new execution to queue
         * @access private
         * @param {object} [callable]
         * @param {object} [context]
         * @param {boolean} [isLazyMagic]
         * @returns void
         */
        function _addToQueue(callable, context, isLazyMagic)
        {
            if( callable )
            {
                // execute directly when queue is disabled and stop queuing
                if( !_configuration.enableQueueing )
                {
                    callable.call(context || window);
                    return;
                }

                // let the lazy magic only be once in queue
                if( !isLazyMagic || (isLazyMagic && !_queueContainsMagic) )
                {
                    _queueItems.push([callable, context, isLazyMagic]);
                    if( isLazyMagic ) _queueContainsMagic = true;
                }

                if( _queueItems.length == 1 ) _setQueueTimer();

                return;
            }

            var next = _queueItems.shift();

            if( !next ) return;
            if( next[2] ) _queueContainsMagic = false;

            next[0].call(next[1] || window);
        }

        // set up lazy
        (function()
        {
            // overwrite configuration with custom user settings
            if( settings ) $.extend(_configuration, settings);

            // late-bind error callback to images if set
            if( _configuration.onError ) _items.each(function()
            {
                var item = this;
                _addToQueue(function()
                {
                    $(item).bind("error", function()
                    {
                        _triggerCallback(_configuration.onError, $(this));
                    });
                }, item);
            });

            // on first page load get initial images
            if( _configuration.bind == "load" ) $(window).load(_init);

            // if event driven don't wait for page loading
            else if( _configuration.bind == "event" ) _init();
        })();

        return this;
    };

    // make lazy a bit more case-insensitive :)
    $.fn.Lazy = $.fn.lazy;

})(jQuery, window, document);