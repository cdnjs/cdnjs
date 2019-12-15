/*!
 * jQuery & Zepto Lazy - v1.7.9
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2018, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * $("img.lazy").lazy();
 */

;(function(window, undefined) {
    "use strict";

    // noinspection JSUnresolvedVariable
    /**
     * library instance - here and not in construct to be shorter in minimization
     * @return void
     */
    var $ = window.jQuery || window.Zepto,

    /**
     * unique plugin instance id counter
     * @type {number}
     */
    lazyInstanceId = 0,

    /**
     * helper to register window load for jQuery 3
     * @type {boolean}
     */    
    windowLoaded = false;

    /**
     * make lazy available to jquery - and make it a bit more case-insensitive :)
     * @access public
     * @type {function}
     * @param {object} settings
     * @return {LazyPlugin}
     */
    $.fn.Lazy = $.fn.lazy = function(settings) {
        return new LazyPlugin(this, settings);
    };

    /**
     * helper to add plugins to lazy prototype configuration
     * @access public
     * @type {function}
     * @param {string|Array} names
     * @param {string|Array|function} [elements]
     * @param {function} loader
     * @return void
     */
    $.Lazy = $.lazy = function(names, elements, loader) {
        // make second parameter optional
        if ($.isFunction(elements)) {
            loader = elements;
            elements = [];
        }

        // exit here if parameter is not a callable function
        if (!$.isFunction(loader)) {
            return;
        }

        // make parameters an array of names to be sure
        names = $.isArray(names) ? names : [names];
        elements = $.isArray(elements) ? elements : [elements];

        var config = LazyPlugin.prototype.config,
            forced = config._f || (config._f = {});

        // add the loader plugin for every name
        for (var i = 0, l = names.length; i < l; i++) {
            if (config[names[i]] === undefined || $.isFunction(config[names[i]])) {
                config[names[i]] = loader;
            }
        }

        // add forced elements loader
        for (var c = 0, a = elements.length; c < a; c++) {
            forced[elements[c]] = names[0];
        }
    };

    /**
     * contains all logic and the whole element handling
     * is packed in a private function outside class to reduce memory usage, because it will not be created on every plugin instance
     * @access private
     * @type {function}
     * @param {LazyPlugin} instance
     * @param {object} config
     * @param {object|Array} items
     * @param {object} events
     * @param {string} namespace
     * @return void
     */
    function _executeLazy(instance, config, items, events, namespace) {
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
         * determine possibly detected high pixel density
         * @access private
         * @type {boolean}
         */
        _isRetinaDisplay = false, 

        /**
         * dictionary entry for better minimization
         * @access private
         * @type {string}
         */
        _afterLoad = 'afterLoad',

        /**
         * dictionary entry for better minimization
         * @access private
         * @type {string}
         */
        _load = 'load',

        /**
         * dictionary entry for better minimization
         * @access private
         * @type {string}
         */
        _error = 'error',

        /**
         * dictionary entry for better minimization
         * @access private
         * @type {string}
         */
        _img = 'img',

        /**
         * dictionary entry for better minimization
         * @access private
         * @type {string}
         */
        _src = 'src',

        /**
         * dictionary entry for better minimization
         * @access private
         * @type {string}
         */
        _srcset = 'srcset',

        /**
         * dictionary entry for better minimization
         * @access private
         * @type {string}
         */
        _sizes = 'sizes',

        /**
         * dictionary entry for better minimization
         * @access private
         * @type {string}
         */
        _backgroundImage = 'background-image';

        /**
         * initialize plugin
         * bind loading to events or set delay time to load all items at once
         * @access private
         * @return void
         */
        function _initialize() {
            // detect actual device pixel ratio
            // noinspection JSUnresolvedVariable
            _isRetinaDisplay = window.devicePixelRatio > 1;

            // prepare all initial items
            items = _prepareItems(items);

            // if delay time is set load all items at once after delay time
            if (config.delay >= 0) {
                setTimeout(function() {
                    _lazyLoadItems(true);
                }, config.delay);
            }

            // if no delay is set or combine usage is active bind events
            if (config.delay < 0 || config.combined) {
                // create unique event function
                events.e = _throttle(config.throttle, function(event) {
                    // reset detected window size on resize event
                    if (event.type === 'resize') {
                        _actualWidth = _actualHeight = -1;
                    }

                    // execute 'lazy magic'
                    _lazyLoadItems(event.all);
                });

                // create function to add new items to instance
                events.a = function(additionalItems) {
                    additionalItems = _prepareItems(additionalItems);
                    items.push.apply(items, additionalItems);
                };

                // create function to get all instance items left
                events.g = function() {
                    // filter loaded items before return in case internal filter was not running until now
                    return (items = $(items).filter(function() {
                        return !$(this).data(config.loadedName);
                    }));
                };

                // create function to force loading elements
                events.f = function(forcedItems) {
                    for (var i = 0; i < forcedItems.length; i++) {
                        // only handle item if available in current instance
                        // use a compare function, because Zepto can't handle object parameter for filter
                        // var item = items.filter(forcedItems[i]);
                        /* jshint loopfunc: true */
                        var item = items.filter(function() {
                            return this === forcedItems[i];
                        });

                        if (item.length) {
                            _lazyLoadItems(false, item);   
                        }
                    }
                };

                // load initial items
                _lazyLoadItems();

                // bind lazy load functions to scroll and resize event
                // noinspection JSUnresolvedVariable
                $(config.appendScroll).on('scroll.' + namespace + ' resize.' + namespace, events.e);
            }
        }

        /**
         * prepare items before handle them
         * @access private
         * @param {Array|object|jQuery} items
         * @return {Array|object|jQuery}
         */
        function _prepareItems(items) {
            // fetch used configurations before loops
            var defaultImage = config.defaultImage,
                placeholder = config.placeholder,
                imageBase = config.imageBase,
                srcsetAttribute = config.srcsetAttribute,
                loaderAttribute = config.loaderAttribute,
                forcedTags = config._f || {};

            // filter items and only add those who not handled yet and got needed attributes available
            items = $(items).filter(function() {
                var element = $(this),
                    tag = _getElementTagName(this);

                return !element.data(config.handledName) && 
                       (element.attr(config.attribute) || element.attr(srcsetAttribute) || element.attr(loaderAttribute) || forcedTags[tag] !== undefined);
            })

            // append plugin instance to all elements
            .data('plugin_' + config.name, instance);

            for (var i = 0, l = items.length; i < l; i++) {
                var element = $(items[i]),
                    tag = _getElementTagName(items[i]),
                    elementImageBase = element.attr(config.imageBaseAttribute) || imageBase;

                // generate and update source set if an image base is set
                if (tag === _img && elementImageBase && element.attr(srcsetAttribute)) {
                    element.attr(srcsetAttribute, _getCorrectedSrcSet(element.attr(srcsetAttribute), elementImageBase));
                }

                // add loader to forced element types
                if (forcedTags[tag] !== undefined && !element.attr(loaderAttribute)) {
                    element.attr(loaderAttribute, forcedTags[tag]);
                }

                // set default image on every element without source
                if (tag === _img && defaultImage && !element.attr(_src)) {
                    element.attr(_src, defaultImage);
                }

                // set placeholder on every element without background image
                else if (tag !== _img && placeholder && (!element.css(_backgroundImage) || element.css(_backgroundImage) === 'none')) {
                    element.css(_backgroundImage, "url('" + placeholder + "')");
                }
            }

            return items;
        }

        /**
         * the 'lazy magic' - check all items
         * @access private
         * @param {boolean} [allItems]
         * @param {object} [forced]
         * @return void
         */
        function _lazyLoadItems(allItems, forced) {
            // skip if no items where left
            if (!items.length) {
                // destroy instance if option is enabled
                if (config.autoDestroy) {
                    // noinspection JSUnresolvedFunction
                    instance.destroy();
                }

                return;
            }

            var elements = forced || items,
                loadTriggered = false,
                imageBase = config.imageBase || '',
                srcsetAttribute = config.srcsetAttribute,
                handledName = config.handledName;

            // loop all available items
            for (var i = 0; i < elements.length; i++) {
                // item is at least in loadable area
                if (allItems || forced || _isInLoadableArea(elements[i])) {
                    var element = $(elements[i]),
                        tag = _getElementTagName(elements[i]),
                        attribute = element.attr(config.attribute),
                        elementImageBase = element.attr(config.imageBaseAttribute) || imageBase,
                        customLoader = element.attr(config.loaderAttribute);

                        // is not already handled 
                    if (!element.data(handledName) &&
                        // and is visible or visibility doesn't matter
                        (!config.visibleOnly || element.is(':visible')) && (
                        // and image source or source set attribute is available
                        (attribute || element.attr(srcsetAttribute)) && (
                            // and is image tag where attribute is not equal source or source set
                            (tag === _img && (elementImageBase + attribute !== element.attr(_src) || element.attr(srcsetAttribute) !== element.attr(_srcset))) ||
                            // or is non image tag where attribute is not equal background
                            (tag !== _img && elementImageBase + attribute !== element.css(_backgroundImage))
                        ) ||
                        // or custom loader is available
                        customLoader))
                    {
                        // mark element always as handled as this point to prevent double handling
                        loadTriggered = true;
                        element.data(handledName, true);

                        // load item
                        _handleItem(element, tag, elementImageBase, customLoader);
                    }
                }
            }

            // when something was loaded remove them from remaining items
            if (loadTriggered) {
                items = $(items).filter(function() {
                    return !$(this).data(handledName);
                });
            }
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
        function _handleItem(element, tag, imageBase, customLoader) {
            // increment count of items waiting for after load
            ++_awaitingAfterLoad;

            // extended error callback for correct 'onFinishedAll' handling
            var errorCallback = function() {
                _triggerCallback('onError', element);
                _reduceAwaiting();

                // prevent further callback calls
                errorCallback = $.noop;
            };

            // trigger function before loading image
            _triggerCallback('beforeLoad', element);

            // fetch all double used data here for better code minimization
            var srcAttribute = config.attribute,
                srcsetAttribute = config.srcsetAttribute,
                sizesAttribute = config.sizesAttribute,
                retinaAttribute = config.retinaAttribute,
                removeAttribute = config.removeAttribute,
                loadedName = config.loadedName,
                elementRetina = element.attr(retinaAttribute);

            // handle custom loader
            if (customLoader) {
                // on load callback
                var loadCallback = function() {
                    // remove attribute from element
                    if (removeAttribute) {
                        element.removeAttr(config.loaderAttribute);
                    }

                    // mark element as loaded
                    element.data(loadedName, true);

                    // call after load event
                    _triggerCallback(_afterLoad, element);

                    // remove item from waiting queue and possibly trigger finished event
                    // it's needed to be asynchronous to run after filter was in _lazyLoadItems
                    setTimeout(_reduceAwaiting, 1);

                    // prevent further callback calls
                    loadCallback = $.noop;
                };

                // bind error event to trigger callback and reduce waiting amount
                element.off(_error).one(_error, errorCallback)

                // bind after load callback to element
                .one(_load, loadCallback);

                // trigger custom loader and handle response
                if (!_triggerCallback(customLoader, element, function(response) {
                    if(response) {
                        element.off(_load);
                        loadCallback();
                    }
                    else {
                        element.off(_error);
                        errorCallback();
                    }
                })) {
                    element.trigger(_error);
                }
            }

            // handle images
            else {
                // create image object
                var imageObj = $(new Image());

                // bind error event to trigger callback and reduce waiting amount
                imageObj.one(_error, errorCallback)

                // bind after load callback to image
                .one(_load, function() {
                    // remove element from view
                    element.hide();

                    // set image back to element
                    // do it as single 'attr' calls, to be sure 'src' is set after 'srcset'
                    if (tag === _img) {
                        element.attr(_sizes, imageObj.attr(_sizes))
                               .attr(_srcset, imageObj.attr(_srcset))
                               .attr(_src, imageObj.attr(_src));
                    }
                    else {
                        element.css(_backgroundImage, "url('" + imageObj.attr(_src) + "')");
                    }

                    // bring it back with some effect!
                    element[config.effect](config.effectTime);

                    // remove attribute from element
                    if (removeAttribute) {
                        element.removeAttr(srcAttribute + ' ' + srcsetAttribute + ' ' + retinaAttribute + ' ' + config.imageBaseAttribute);

                        // only remove 'sizes' attribute, if it was a custom one
                        if (sizesAttribute !== _sizes) {
                            element.removeAttr(sizesAttribute);
                        }
                    }

                    // mark element as loaded
                    element.data(loadedName, true);

                    // call after load event
                    _triggerCallback(_afterLoad, element);

                    // cleanup image object
                    imageObj.remove();

                    // remove item from waiting queue and possibly trigger finished event
                    _reduceAwaiting();
                });

                // set sources
                // do it as single 'attr' calls, to be sure 'src' is set after 'srcset'
                var imageSrc = (_isRetinaDisplay && elementRetina ? elementRetina : element.attr(srcAttribute)) || '';
                imageObj.attr(_sizes, element.attr(sizesAttribute))
                        .attr(_srcset, element.attr(srcsetAttribute))
                        .attr(_src, imageSrc ? imageBase + imageSrc : null);

                // call after load even on cached image
                imageObj.complete && imageObj.trigger(_load); // jshint ignore : line
            }
        }

        /**
         * check if the given element is inside the current viewport or threshold
         * @access private
         * @param {object} element
         * @return {boolean}
         */
        function _isInLoadableArea(element) {
            var elementBound = element.getBoundingClientRect(),
                direction    = config.scrollDirection,
                threshold    = config.threshold,
                vertical     = // check if element is in loadable area from top
                               ((_getActualHeight() + threshold) > elementBound.top) &&
                               // check if element is even in loadable are from bottom
                               (-threshold < elementBound.bottom),
                horizontal   = // check if element is in loadable area from left
                               ((_getActualWidth() + threshold) > elementBound.left) &&
                               // check if element is even in loadable area from right
                               (-threshold < elementBound.right);

            if (direction === 'vertical') {
                return vertical;
            }
            else if (direction === 'horizontal') {
                return horizontal;
            }

            return vertical && horizontal;
        }

        /**
         * receive the current viewed width of the browser
         * @access private
         * @return {number}
         */
        function _getActualWidth() {
            return _actualWidth >= 0 ? _actualWidth : (_actualWidth = $(window).width());
        }

        /**
         * receive the current viewed height of the browser
         * @access private
         * @return {number}
         */
        function _getActualHeight() {
            return _actualHeight >= 0 ? _actualHeight : (_actualHeight = $(window).height());
        }

        /**
         * get lowercase tag name of an element
         * @access private
         * @param {object} element
         * @returns {string}
         */
        function _getElementTagName(element) {
            return element.tagName.toLowerCase();
        }

        /**
         * prepend image base to all srcset entries
         * @access private
         * @param {string} srcset
         * @param {string} imageBase
         * @returns {string}
         */
        function _getCorrectedSrcSet(srcset, imageBase) {
            if (imageBase) {
                // trim, remove unnecessary spaces and split entries
                var entries = srcset.split(',');
                srcset = '';

                for (var i = 0, l = entries.length; i < l; i++) {
                    srcset += imageBase + entries[i].trim() + (i !== l - 1 ? ',' : '');
                }
            }

            return srcset;
        }

        /**
         * helper function to throttle down event triggering
         * @access private
         * @param {number} delay
         * @param {function} callback
         * @return {function}
         */
        function _throttle(delay, callback) {
            var timeout,
                lastExecute = 0;

            return function(event, ignoreThrottle) {
                var elapsed = +new Date() - lastExecute;

                function run() {
                    lastExecute = +new Date();
                    // noinspection JSUnresolvedFunction
                    callback.call(instance, event);
                }

                timeout && clearTimeout(timeout); // jshint ignore : line

                if (elapsed > delay || !config.enableThrottle || ignoreThrottle) {
                    run();
                }
                else {
                    timeout = setTimeout(run, delay - elapsed);
                }
            };
        }

        /**
         * reduce count of awaiting elements to 'afterLoad' event and fire 'onFinishedAll' if reached zero
         * @access private
         * @return void
         */
        function _reduceAwaiting() {
            --_awaitingAfterLoad;

            // if no items were left trigger finished event
            if (!items.length && !_awaitingAfterLoad) {
                _triggerCallback('onFinishedAll');
            }
        }

        /**
         * single implementation to handle callbacks, pass element and set 'this' to current instance
         * @access private
         * @param {string|function} callback
         * @param {object} [element]
         * @param {*} [args]
         * @return {boolean}
         */
        function _triggerCallback(callback, element, args) {
            if ((callback = config[callback])) {
                // jQuery's internal '$(arguments).slice(1)' are causing problems at least on old iPads
                // below is shorthand of 'Array.prototype.slice.call(arguments, 1)'
                callback.apply(instance, [].slice.call(arguments, 1));
                return true;
            }

            return false;
        }

        // if event driven or window is already loaded don't wait for page loading
        if (config.bind === 'event' || windowLoaded) {
            _initialize();
        }

        // otherwise load initial items and start lazy after page load
        else {
            // noinspection JSUnresolvedVariable
            $(window).on(_load + '.' + namespace, _initialize);
        }  
    }

    /**
     * lazy plugin class constructor
     * @constructor
     * @access private
     * @param {object} elements
     * @param {object} settings
     * @return {object|LazyPlugin}
     */
    function LazyPlugin(elements, settings) {
        /**
         * this lazy plugin instance
         * @access private
         * @type {object|LazyPlugin|LazyPlugin.prototype}
         */
        var _instance = this,

        /**
         * this lazy plugin instance configuration
         * @access private
         * @type {object}
         */
        _config = $.extend({}, _instance.config, settings),

        /**
         * instance generated event executed on container scroll or resize
         * packed in an object to be referenceable and short named because properties will not be minified
         * @access private
         * @type {object}
         */
        _events = {},

        /**
         * unique namespace for instance related events
         * @access private
         * @type {string}
         */
        _namespace = _config.name + '-' + (++lazyInstanceId);

        // noinspection JSUndefinedPropertyAssignment
        /**
         * wrapper to get or set an entry from plugin instance configuration
         * much smaller on minify as direct access
         * @access public
         * @type {function}
         * @param {string} entryName
         * @param {*} [value]
         * @return {LazyPlugin|*}
         */
        _instance.config = function(entryName, value) {
            if (value === undefined) {
                return _config[entryName];
            }

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
        _instance.addItems = function(items) {
            _events.a && _events.a($.type(items) === 'string' ? $(items) : items); // jshint ignore : line
            return _instance;
        };

        // noinspection JSUndefinedPropertyAssignment
        /**
         * get all left items of this instance
         * @access public
         * @returns {object}
         */
        _instance.getItems = function() {
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
        _instance.update = function(useThrottle) {
            _events.e && _events.e({}, !useThrottle); // jshint ignore : line
            return _instance;
        };

        // noinspection JSUndefinedPropertyAssignment
        /**
         * force element(s) to load directly, ignoring the viewport
         * @access public
         * @param {Array|object|string} items
         * @return {LazyPlugin}
         */
        _instance.force = function(items) {
            _events.f && _events.f($.type(items) === 'string' ? $(items) : items); // jshint ignore : line
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
        _instance.loadAll = function() {
            _events.e && _events.e({all: true}, true); // jshint ignore : line
            return _instance;
        };

        // noinspection JSUndefinedPropertyAssignment
        /**
         * destroy this plugin instance
         * @access public
         * @type {function}
         * @return undefined
         */
        _instance.destroy = function() {
            // unbind instance generated events
            // noinspection JSUnresolvedFunction, JSUnresolvedVariable
            $(_config.appendScroll).off('.' + _namespace, _events.e);
            // noinspection JSUnresolvedVariable
            $(window).off('.' + _namespace);

            // clear events
            _events = {};

            return undefined;
        };

        // start using lazy and return all elements to be chainable or instance for further use
        // noinspection JSUnresolvedVariable
        _executeLazy(_instance, _config, elements, _events, _namespace);
        return _config.chainable ? elements : _instance;
    }

    /**
     * settings and configuration data
     * @access public
     * @type {object|*}
     */
    LazyPlugin.prototype.config = {
        // general
        name               : 'lazy',
        chainable          : true,
        autoDestroy        : true,
        bind               : 'load',
        threshold          : 500,
        visibleOnly        : false,
        appendScroll       : window,
        scrollDirection    : 'both',
        imageBase          : null,
        defaultImage       : 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        placeholder        : null,
        delay              : -1,
        combined           : false,

        // attributes
        attribute          : 'data-src',
        srcsetAttribute    : 'data-srcset',
        sizesAttribute     : 'data-sizes',
        retinaAttribute    : 'data-retina',
        loaderAttribute    : 'data-loader',
        imageBaseAttribute : 'data-imagebase',
        removeAttribute    : true,
        handledName        : 'handled',
        loadedName         : 'loaded',

        // effect
        effect             : 'show',
        effectTime         : 0,

        // throttle
        enableThrottle     : true,
        throttle           : 250,

        // callbacks
        beforeLoad         : undefined,
        afterLoad          : undefined,
        onError            : undefined,
        onFinishedAll      : undefined
    };

    // register window load event globally to prevent not loading elements
    // since jQuery 3.X ready state is fully async and may be executed after 'load' 
    $(window).on('load', function() {
        windowLoaded = true;
    });
})(window);