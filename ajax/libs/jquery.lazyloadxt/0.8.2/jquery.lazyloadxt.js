/*! Lazy Load XT v0.8.2 2013-12-08
 * https://github.com/ressio/lazy-load-xt
 * (C) 2013 RESS.io
 * Licensed under MIT */

(function ($, window) {
// options
    var options = {
            autoInit: true,
            selector: 'img',
            srcAttr: 'data-src',
            classNojs: 'lazy',
            blankImage: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            edgeX: 0,
            edgeY: 0,
            throttle: 99,
            visibleOnly: true,
            loadEvent: 'pageshow', // check AJAX-loaded content in jQueryMobile
            updateEvent: 'load orientationchange resize scroll', // page-modified events
            oninit: null, // init handler
            onshow: null, // start loading handler
            onload: null, // load success handler
            onerror: null // error handler
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
     * Process function/object event handler
     * @param {string} event suffix
     * @param {jQuery} $el
     */
    function triggerEvent(event, $el) {
        $el.trigger('lazy' + event);
        var handler = options['on' + event];
        if (handler) {
            if ($.isFunction(handler)) {
                handler.call($el[0]);
            } else {
                $el
                    .addClass(handler.addClass)
                    .removeClass(handler.removeClass);
            }
        }
        // queue next check as images may be resized after loading of actual file
        queueCheckLazyElements();
    }


    /**
     * Add element to lazy-load list
     * Call: addElement(idx, el) or addElement(el)
     * @param idx
     * @param {HTMLElement} [el]
     */
    function addElement(idx, el) {
        var $el = $(el || idx);

        // prevent duplicates
        if ($el.data('lazied')) {
            return;
        }
        $el
            .data('lazied', 1)
            .removeClass(options.classNojs);

        if (options.blankImage && $el[0].tagName === 'IMG' && !$el.attr('src')) {
            $el.attr('src', options.blankImage);
        }

        triggerEvent('init', $el);

        elements.unshift($el); // push it in the first position as we iterate elements in reverse order
    }


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
     * Trigger onload handler
     */
    function triggerLoad() {
        triggerEvent('load', $(this));
    }


    /**
     * Trigger onerror handler
     */
    function triggerError() {
        triggerEvent('error', $(this));
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
            srcAttr = options.srcAttr,
            isFuncSrcAttr = $.isFunction(srcAttr);
        for (; i >= 0; i--) {
            var $el = elements[i],
                el = $el[0];

            // remove items that are not in DOM
            if (!el.parentNode) {
                elements.splice(i, 1);
            } else if (!options.visibleOnly || el.offsetWidth > 0 || el.offsetHeight > 0) {
                var offset = $el.offset(),
                    elTop = offset.top,
                    elLeft = offset.left;

                if ((elTop < viewportBottom) && (elTop + $el.height() > viewportTop) &&
                    (elLeft < viewportRight) && (elLeft + $el.width() > viewportLeft)) {

                    triggerEvent('show', $el);

                    var src = isFuncSrcAttr ? srcAttr($el) : $el.attr(srcAttr);
                    if (src) {
                        $el
                            .on('load', triggerLoad)
                            .on('error', triggerError)
                            .attr('src', src);
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
            checkLazyElements();
            setTimeout(timeoutLazyElements, options.throttle);
            waitingMode = 1;
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
        calcViewport();
        if (e && e.type === 'scroll' && topLazy >= viewportBottom) {
            return;
        }

        if (!waitingMode) {
            waitingMode = 2;
            timeoutLazyElements();
        } else {
            waitingMode = 2;
        }
    }

    /**
     * Add batch of new elements: $(container).lazyLoadXT([optional selector])
     * or single one:             $(image).lazyLoadXT()
     */
    $.fn.lazyLoadXT = function (selector) {
        selector = selector || options.selector;

        this.each(function () {
            if ('src' in this) {
                addElement(this);
            } else {
                if (this === window) {
                    $(selector).each(addElement);
                } else {
                    $(this)
                        .find(selector)
                        .each(addElement);
                }
            }
        });

        queueCheckLazyElements();
        return this;
    };


    /**
     * Initialize list of hidden elements
     */
    function initLazyElements() {
        $window.lazyLoadXT();
    }


    /**
     * Initialization
     */
    $(document).ready(function () {
        $window.bind(options.loadEvent, initLazyElements);
        $window.bind(options.updateEvent, queueCheckLazyElements);

        if (options.autoInit) {
            initLazyElements(); // standard initialization
        }
    });

}(window.jQuery || window.Zepto, window));
