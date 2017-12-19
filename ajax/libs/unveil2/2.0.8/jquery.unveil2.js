/**
 * Unveil2.js
 * A very lightweight jQuery plugin to lazy load images
 * Based on https://github.com/luis-almeida/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2015 Joram van den Boezem
 * https://github.com/nabble/unveil2
 */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function ($) {

    "use strict";

    /**
     * # GLOBAL VARIABLES
     * ---
     */

    /**
     * Store the string 'unveil' in a variable to save some bytes
     */
    var unveilString = 'unveil',

    /**
     * jQuery event namespace
     */
        unveilNamespace = '.' + unveilString,

    /**
     * Store the string 'src' in a variable to save some bytes
     */
        srcString = 'src',

    /**
     * Store the string 'placeholder' in a variable to save some bytes
     */
        placeholderString = 'placeholder';

    /**
     * # PLUGIN
     * ---
     */

    /**
     * @param {object} options An object of options, see API section in README
     * @returns {$}
     */
    $.fn.unveil = function (options) {

        options = options || {};

        // Initialize variables
        var $window = $(window),
            height = $window.height(),
            defaults = {
                // Public API
                placeholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                offset: 0,
                breakpoints: [],
                throttle: 250,
                debug: false,
                attribute: srcString,
                container: $window,

                // Undocumented
                retina: window.devicePixelRatio > 1,

                // Deprecated
                loading: null,
                loaded: null
            },
            settings = $.extend(true, {}, defaults, options);

        if (settings.debug) console.log('Called unveil on', this.length, 'elements with the following options:', settings);

        /**
         * Sort sizes array, arrange highest minWidth to front of array
         */
        settings.breakpoints.sort(function (a, b) {
            return b.minWidth - a.minWidth;
        });

        var containerContext = settings.container.data(unveilString);
        if (!containerContext) {
            containerContext = {
                images: $(),
                initialized: false
            };
            settings.container.data(unveilString, containerContext);
        }

        /**
         * # UNVEIL IMAGES
         * ---
         */

        /**
         * This is the actual plugin logic, which determines the source attribute to use based on window width and presence of a retina screen, changes the source of the image, handles class name changes and triggers a callback if set. Once the image has been loaded, start the unveil lookup because the page layout could have changed.
         */
        this.one(unveilString + unveilNamespace, function () {
            var i, $this = $(this), windowWidth = $window.width(),
                attrib = settings.attribute, targetSrc, defaultSrc, retinaSrc;

            // Determine attribute to extract source from
            for (i = 0; i < settings.breakpoints.length; i++) {
                var dataAttrib = settings.breakpoints[i].attribute.replace(/^data-/, '');
                if (windowWidth >= settings.breakpoints[i].minWidth && $this.data(dataAttrib)) {
                    attrib = dataAttrib;
                    break;
                }
            }

            // Extract source
            defaultSrc = retinaSrc = $this.data(attrib);

            // Do we have a retina source?
            if (defaultSrc && defaultSrc.indexOf("|") !== -1) {
                retinaSrc = defaultSrc.split("|")[1];
                defaultSrc = defaultSrc.split("|")[0];
            }

            // Change attribute on image
            if (defaultSrc) {
                targetSrc = (settings.retina && retinaSrc) ? retinaSrc : defaultSrc;

                if (settings.debug) console.log('Unveiling image', {
                    attribute: attrib,
                    retina: settings.retina,
                    defaultSrc: defaultSrc,
                    retinaSrc: retinaSrc,
                    targetSrc: targetSrc
                });

                // Change classes
                $this.addClass(unveilString + '-loading');

                // Fire up the callback if it's a function...
                if (typeof settings.loading === 'function') {
                    settings.loading.call(this);
                }
                // ...and trigger custom event
                $this.trigger('loading' + unveilNamespace);

                // When new source has loaded, do stuff
                $this.one('load' + unveilNamespace, function () {

                    // Change classes
                    classLoaded($this);

                    // Fire up the callback if it's a function...
                    if (typeof settings.loaded === 'function') {
                        settings.loaded.call(this);
                    }
                    // ...and trigger custom event
                    $this.trigger('loaded' + unveilNamespace);

                    // Loading the image may have modified page layout,
                    // so unveil again
                    lookup();
                });

                // Set new source
                if (this.nodeName === 'IMG') {
                    $this.prop(srcString, targetSrc);
                } else {
                    $('<img/>').attr(srcString, targetSrc).one('load' + unveilNamespace, function() {
                        $(this).remove();
                        $this.css('backgroundImage', 'url(' + targetSrc + ')').trigger('load' + unveilNamespace);
                    });
                }

                // If the image has instantly loaded, change classes now
                if (this.complete) {
                    classLoaded($this);
                }
            }
        });

        this.one('destroy' + unveilNamespace, function () {
            $(this).off(unveilNamespace).removeData(unveilString);
            if (containerContext.images) {
                containerContext.images = containerContext.images.not(this);
                if (!containerContext.images.length) {
                    destroyContainer();
                }
            }
        });

        /**
         * # HELPER FUNCTIONS
         * ---
         */

        /**
         * Sets the classes when an image is done loading
         *
         * @param {object} $elm
         */
        function classLoaded($elm) {
            $elm.removeClass(unveilString + '-' + placeholderString + ' ' + unveilString + '-loading');
            $elm.addClass(unveilString + '-loaded');
        }

        /**
         * Filter function which returns true when a given image is in the viewport.
         *
         * @returns {boolean}
         */
        function inview() {
            // jshint validthis: true
            var $this = $(this);

            if ($this.is(':hidden')) {
                return;
            }

            var viewport = {top: 0 - settings.offset, bottom: $window.height() + settings.offset},
                isCustomContainer = settings.container[0] !== $window[0],
                elementRect = this.getBoundingClientRect();
            if (isCustomContainer) {
                var containerRect = settings.container[0].getBoundingClientRect();
                if (contains(viewport, containerRect)) {
                    var top = containerRect.top - settings.offset;
                    var bottom = containerRect.bottom + settings.offset;
                    var containerRectWithOffset = {
                        top: top > viewport.top ? top : viewport.top,
                        bottom: bottom < viewport.bottom ? bottom : viewport.bottom
                    };
                    return contains(containerRectWithOffset, elementRect);
                }
                return false;
            } else {
                return contains(viewport, elementRect);
            }
        }

        /**
         * Whether `viewport` contains `rect` vertically
         */
        function contains(viewport, rect) {
            return rect.bottom >= viewport.top && rect.top <= viewport.bottom;
        }

        /**
         * Sets the window height and calls the lookup function
         */
        function resize() {
            height = $window.height();
            lookup();
        }

        /**
         * Throttle function with function call in tail. Based on http://sampsonblog.com/749/simple-throttle-function
         *
         * @param {function} callback
         * @returns {function}
         */
        function throttle(callback) {
            var wait = false;                  // Initially, we're not waiting
            return function () {               // We return a throttled function
                if (!wait) {                   // If we're not waiting
                    wait = true;               // Prevent future invocations
                    setTimeout(function () {   // After a period of time
                        callback();            // Execute users function
                        wait = false;          // And allow future invocations
                    }, settings.throttle);
                }
            };
        }

        /**
         * # LOOKUP FUNCTION
         * ---
         */

        /**
         * Function which filters images which are in view and triggers the unveil event on those images.
         */
        function lookup() {
            if (settings.debug) console.log('Unveiling');

            if (containerContext.images) {
                var batch = containerContext.images.filter(inview);

                batch.trigger(unveilString + unveilNamespace);
                containerContext.images = containerContext.images.not(batch);

                if (batch.length) {
                    if (settings.debug) console.log('New images in view', batch.length, ', leaves', containerContext.length, 'in collection');
                }
            }
        }

        function destroyContainer() {
            settings.container.off(unveilNamespace).removeData(unveilString);
            containerContext.images.off(unveilNamespace).removeData(unveilString);
            containerContext.initialized = false;
            containerContext.images = null;
        }

        /**
         * # BOOTSTRAPPING
         * ---
         */

        /**
         * Read and reset the src attribute, to prevent loading of original images
         */
        this.each(function () {
            var $this = $(this),
                elmPlaceholder = $this.data(srcString + '-' + placeholderString) || settings.placeholder;

            // If this element has been called before,
            // don't set placeholder now to prevent FOUI (Flash Of Ustyled Image)
            if (!$this.data(unveilString)) {

                // Add element to global array
                containerContext.images = $(containerContext.images).add(this);

                // Set the unveil flag
                $this.data(unveilString, true);

                // Set data-src if not set
                if (!$this.data(settings.attribute)) {
                    $this.data(settings.attribute, $this.prop(settings.attribute));
                }

                // Set placeholder
                $this
                    .one('load' + unveilNamespace, function () {
                        var $this = $(this);

                        if ($this.hasClass(unveilString + '-loaded')) {
                            return;
                        }

                        $this.addClass(unveilString + '-' + placeholderString);
                        lookup();
                    })
                    .prop(srcString, '')
                    .prop(srcString, elmPlaceholder);
            }
        });

        if (settings.debug) console.log('Images now in collection', containerContext.images.length);

        /**
         * Bind global listeners
         */
        {if (!containerContext.initialized) {
            settings.container
                .on('resize' + unveilNamespace, throttle(resize))
                .on('scroll' + unveilNamespace, throttle(lookup))
                .on('lookup' + unveilNamespace, lookup)
                .on('destroy' + unveilNamespace, destroyContainer);
            containerContext.initialized = true;
        }}

        /**
         * Wait a little bit for the placeholder to be set, so the src attribute is not empty (which will mark the image as hidden)
         */
        {setTimeout(lookup, 0);}

        /**
         * That's all folks!
         */
        return this;

    };

}));
