/*! Lazy Load XT v0.8.9 2014-01-06
 * http://ressio.github.io/lazy-load-xt
 * (C) 2014 RESS.io
 * Licensed under MIT */

(function ($, window, document) {
    // options
    var options = {
            selector: 'img',
            srcAttr: 'data-src',
            classNojs: 'lazy',
            edgeX: 0,
            edgeY: 0,
            throttle: 99,
            visibleOnly: true,
            loadEvent: 'pageshow', // check AJAX-loaded content in jQueryMobile
            updateEvent: 'load orientationchange resize scroll' // page-modified events
        },
        $window = $(window),
        elements = [],
        viewportTop,
        viewportBottom,
        viewportLeft,
        viewportRight,
        topLazy = 0,
    /*
     waitingMode=0 : no setTimeout
     waitingMode=1 : setTimeout, no deferred events
     waitingMode=2 : setTimeout, deferred events
     */
        waitingMode = 0;

    $.lazyLoadXT = $.extend(options, $.lazyLoadXT);

    /**
     * Add new elements to lazy-load list:
     * $(elements).lazyLoadXT() or $(window).lazyLoadXT()
     */
    $.fn.lazyLoadXT = function () {
        this.each(function () {
            if (this === window) {
                $(options.selector).lazyLoadXT();
                return;
            }

            var $el = $(this);

            // prevent duplicates
            if ($el.data('lazied')) {
                return;
            }

            $el
                .data('lazied', 1)
                .removeClass(options.classNojs);

            elements.unshift($el); // push it in the first position as we iterate elements in reverse order
        });

        // queue next check as images may be resized after loading of actual file
        queueCheckLazyElements();

        return this;
    };


    /**
     * Save visible viewport boundary to viewportXXX variables
     */
    function calcViewport() {
        var scrollTop = $window.scrollTop(),
            scrollLeft = window.pageXOffset || 0,
            edgeX = options.edgeX,
            edgeY = options.edgeY;

        viewportTop = scrollTop - edgeY;
        viewportBottom = scrollTop + (window.innerHeight || $window.height()) + edgeY;
        viewportLeft = scrollLeft - edgeX;
        viewportRight = scrollLeft + (window.innerWidth || $window.width()) + edgeX;
    }


    /**
     * Load visible elements
     */
    function checkLazyElements() {
        if (!elements.length) {
            return;
        }

        topLazy = Infinity;
        calcViewport();

        var i = elements.length - 1,
            srcAttr = options.srcAttr;
        for (; i >= 0; i--) {
            var $el = elements[i],
                el = $el[0];

            // remove items that are not in DOM
            if (!$.contains(document.documentElement, el)) {
                elements.splice(i, 1);
            } else if (!options.visibleOnly || el.offsetWidth > 0 || el.offsetHeight > 0) {
                var offset = $el.offset(),
                    elTop = offset.top,
                    elLeft = offset.left;

                if ((elTop < viewportBottom) && (elTop + $el.height() > viewportTop) &&
                    (elLeft < viewportRight) && (elLeft + $el.width() > viewportLeft)) {

                    var src = $el.attr(srcAttr);
                    if (src) {
                        $el.attr('src', src);
                    }

                    elements.splice(i, 1);
                } else {
                    if (elTop < topLazy) {
                        topLazy = elTop;
                    }
                }
            }
        }
    }


    /**
     * Run check of lazy elements after timeout
     */
    function timeoutLazyElements() {
        if (waitingMode > 1) {
            waitingMode = 1;
            checkLazyElements();
            setTimeout(timeoutLazyElements, options.throttle);
        } else {
            waitingMode = 0;
        }
    }


    /**
     * Queue check of lazy elements because of event e
     * @param {Event} [e]
     */
    function queueCheckLazyElements(e) {
        if (!elements.length) {
            return;
        }

        // fast check for scroll event without new visible elements
        if (e && e.type === 'scroll') {
            calcViewport();
            if (topLazy >= viewportBottom) {
                return;
            }
        }

        if (!waitingMode) {
            setTimeout(timeoutLazyElements, 0);
        }

        waitingMode = 2;
    }


    /**
     * Initialize list of hidden elements
     */
    function initLazyElements() {
        $(window).lazyLoadXT();
    }


    /**
     * Initialization
     */
    $(document).ready(function () {
        $window
            .on(options.loadEvent, initLazyElements)
            .on(options.updateEvent, queueCheckLazyElements);

        initLazyElements(); // standard initialization
    });

})(window.jQuery || window.Zepto, window, document);
