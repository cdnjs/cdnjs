/**
 * jQuery Unveil2
 * A very lightweight jQuery plugin to lazy load images
 * Based on https://github.com/luis-almeida/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2015 Joram van den Boezem
 * https://github.com/hongaar/unveil2
 */

(function ($) {

    var images = $(),
        initialized = false;

    $.fn.unveil = function (opts) {

        opts = opts || {};

        console.log('Initializing unveil2 with the following options:', opts);

        // Initialize variables
        var $window = $(window),
            placeholder = opts.placeholder || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            treshold = opts.treshold || 0,
            breakpoints = opts.breakpoints || [],
            retina = window.devicePixelRatio > 1,
            loaded;

        // Sort sizes array, arrange highest minWidth to front of array
        breakpoints.sort(function(a, b) {
            return a.minWidth < b.minWidth;
        });

        // Read and reset the src attribute first, to prevent loading
        // of original images
        this.each(function () {
            var $this = $(this),
                elmPlaceholder = $this.data('src-placeholder') || placeholder;

            // Add element to global array
            images = $(images).add(this);

            // If this element has been called before,
            // don't set placeholder now to prevent FOUI (Flash Of Ustyled Image)
            if (!$this.data('unveil')) {

                // Set the unveil flag
                $this.data('unveil', true);

                // Set data-src if not set
                if (!$this.data('src')) {
                    $this.data('src', $this.prop('src'));
                }

                // Set placeholder
                $this.one('load', function() {
                    $(this).addClass('unveil-placeholder');
                    unveil();
                }).prop('src', '').prop('src', elmPlaceholder);
            }
        });

        console.log('Images now in collection', images.length);

        // This triggers an image source to be set on the target,
        // based on window width and presence of retina screen
        this.one("unveil", function () {
            var $this = $(this), windowWidth = $window.width(),
                attrib = 'src', targetSrc, defaultSrc, retinaSrc;

            // Determine attribute to extract source from
            for (var i = 0; i < breakpoints.length; i++) {
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

                console.log('Unveiling image', {
                    attribute: attrib,
                    retina: retina,
                    defaultSrc: defaultSrc,
                    retinaSrc: retinaSrc,
                    targetSrc: targetSrc
                });

                $this.addClass('unveil-loading');
                $this.prop("src", targetSrc);
                $this.one('load', function() {
                    $this.removeClass('unveil-placeholder unveil-loading');
                    $this.addClass('unveil-loaded');
                    unveil();
                });

                // Fire up the callback if it's a function
                if (typeof opts.success === "function") {
                    opts.success.call(this);
                }
            }
        });

        var unveil = function() {
            console.log('Unveiling');

            var inview = images.filter(function () {
                var $e = $(this);

                if ($e.is(":hidden")) return;

                var viewportStart = $window.scrollTop(),
                    viewportEnd = viewportStart + $window.height(),
                    elementTop = $e.offset().top,
                    elementEnd = elementTop + $e.height();

                return elementEnd >= viewportStart - treshold && elementTop <= viewportEnd + treshold;
            });

            inview.trigger("unveil");
            images = images.not(inview);

            if (inview.length) {
                console.log('New images in view', inview.length, ', leaves' , images.length, 'in collection');
            }
        };

        if (!initialized) {
            $window.on("scroll.unveil resize.unveil lookup.unveil", unveil);
        }

        // Wait a little bit for the placeholder to be set, so the src attribute
        // is not empty (which will mark the image as hidden)
        setTimeout(unveil, 0);

        initialized = true;

        return this;

    };

})(window.jQuery || window.Zepto);