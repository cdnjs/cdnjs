/**
 * Unveil2.js
 * A very lightweight jQuery/Zepto plugin to lazy load images
 * Based on https://github.com/luis-almeida/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2015 Joram van den Boezem
 * https://github.com/nabble/unveil2
 */
(function ($) {

    "use strict";

    /**
     * # GLOBAL VARIABLES
     * ---
     */

    /**
     * Store the string 'unveil' in a variable to save some bytes
     *
     */
    var unveilString = 'unveil';

    /**
     * A jQuery/Zepto collection of images which will be lazy loaded
     */
    var images = $();

    /**
     * A flag to set initialized state, so we can set global listeners only once
     */
    var initialized = false;

    /**
     * # PLUGIN
     * ---
     */

    /**
     * @param {object} opts An object of options, see API section in README
     * @returns {$}
     */
    $.fn.unveil = function (opts) {

        opts = opts || {};

        // Initialize variables
        var $window = $(window),
            height = $window.height(),
            retina = window.devicePixelRatio > 1;

        // Initialize defaults
        var $container = opts.container || $window,
            placeholder = opts.placeholder || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            offset = opts.offset || 0,
            breakpoints = opts.breakpoints || [],
            throttleTimeout = opts.throttle || 250,
            debug = opts.debug || false;

        if (debug) console.log('Called unveil on', this.length, 'elements with the following options:', opts);

        /**
         * Sort sizes array, arrange highest minWidth to front of array
         */
        breakpoints.sort(function (a, b) {
            return b.minWidth - a.minWidth;
        });

        /**
         * # UNVEIL IMAGES
         * ---
         */

        /**
         * This is the actual plugin logic, which determines the source attribute to use based on window width and presence of a retina screen, changes the source of the image, handles class name changes and triggers a callback if set. Once the image has been loaded, start the unveil lookup because the page layout could have changed.
         */
        this.one(unveilString, function () {
            var i, $this = $(this), windowWidth = $window.width(),
                attrib = 'src', targetSrc, defaultSrc, retinaSrc;

            // Determine attribute to extract source from
            for (i = 0; i < breakpoints.length; i++) {
                var dataAttrib = breakpoints[i].attribute.replace(/^data-/, '');
                if (windowWidth >= breakpoints[i].minWidth && $this.data(dataAttrib)) {
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
                targetSrc = (retina && retinaSrc) ? retinaSrc : defaultSrc;

                if (debug) console.log('Unveiling image', {
                    attribute: attrib,
                    retina: retina,
                    defaultSrc: defaultSrc,
                    retinaSrc: retinaSrc,
                    targetSrc: targetSrc
                });

                // Change classes
                classLoading($this);

                // Set new source
                $this.prop("src", targetSrc);

                // When new source has loaded, do stuff
                $this.one('load', function () {

                    // Change classes
                    classLoaded($this);

                    // Fire up the callback if it's a function
                    if (typeof opts.loaded === "function") {
                        opts.loaded.call(this);
                    }

                    // Loading the image may have modified page layout,
                    // so unveil again
                    lookup();
                });

                // If the image has instantly loaded, change classes now
                if (this.complete) {
                    classLoaded($this);
                }
            }
        });

        /**
         * # HELPER FUNCTIONS
         * ---
         */

        /**
         * Zepto doesn't support the :visible and :hidden selector by default
         *
         * @param {object} $elm
         * @returns {boolean}
         */
        function visible($elm) {
            return !!($elm.width() || $elm.height()) && $elm.css("display") !== "none";
        }

        /**
         * Sets the classes when an image is loading
         *
         * @param {object} $elm
         */
        function classLoading($elm) {
            $elm.addClass(unveilString + '-loading');
        }

        /**
         * Sets the classes when an image is done loading
         *
         * @param {object} $elm
         */
        function classLoaded($elm) {
            $elm.removeClass(unveilString + '-placeholder ' + unveilString + '-loading');
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

            if (!visible($this)) {
                return;
            }

            var viewportTop = $window.scrollTop(),
                viewportEnd = viewportTop + height,
                containerTop = $container !== $window ? viewportTop - $container.offset().top : 0,
                elementTop = $this.offset().top + containerTop,
                elementEnd = elementTop + $this.height();

            return elementEnd >= viewportTop - offset && elementTop <= viewportEnd + offset;
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
                    }, throttleTimeout);
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
            if (debug) console.log('Unveiling');

            var batch = images.filter(inview);

            batch.trigger(unveilString);
            images = images.not(batch);

            if (batch.length) {
                if (debug) console.log('New images in view', batch.length, ', leaves', images.length, 'in collection');
            }
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
                elmPlaceholder = $this.data('src-placeholder') || placeholder;

            // Add element to global array
            images = $(images).add(this);

            // If this element has been called before,
            // don't set placeholder now to prevent FOUI (Flash Of Ustyled Image)
            if (!$this.data(unveilString)) {

                // Set the unveil flag
                $this.data(unveilString, true);

                // Set data-src if not set
                if (!$this.data('src')) {
                    $this.data('src', $this.prop('src'));
                }

                // Set placeholder
                $this
                    .one('load', function () {
                        $(this).addClass(unveilString + '-placeholder');
                        lookup();
                    })
                    .prop('src', '')
                    .prop('src', elmPlaceholder);
            }
        });

        if (debug) console.log('Images now in collection', images.length);

        /**
         * Bind global listeners
         */
        {if (!initialized) {
            $container.on({
                'resize.unveil': throttle(resize),
                'scroll.unveil': throttle(lookup),
                'lookup.unveil': lookup
            });
            initialized = true;
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

})(window.jQuery || window.Zepto);