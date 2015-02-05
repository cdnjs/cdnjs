/*! Lazy Load XT v0.8.10 2014-01-07
 * http://ressio.github.io/lazy-load-xt
 * (C) 2014 RESS.io
 * Licensed under MIT */

(function ($, window, document, undefined) {
    // options
    var options = {
            autoInit: true,
            selector: 'img',
            classNojs: 'lazy',
            blankImage: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            throttle: 99,
            loadEvent: 'pageshow', // check AJAX-loaded content in jQueryMobile
            updateEvent: 'load orientationchange resize scroll', // page-modified events
            forceEvent: '', // force loading of all elements
            oninit: null, // init handler
            onshow: null, // start loading handler
            onload: null, // load success handler
            onerror: null // error handler
        },
        elementOptions = {
            srcAttr: 'data-src',
            edgeX: 0,
            edgeY: 0,
            visibleOnly: true
        },
        $window = $(window),
        dataLazied = 'lazied',
        elements = [],
        viewportTop,
        viewportBottom,
        viewportLeft,
        viewportRight,
        $data = $.data || function (el, name) {
            return $(el).data(name);
        },
        topLazy = 0,
    /*
     waitingMode=0 : no setTimeout
     waitingMode=1 : setTimeout, no deferred events
     waitingMode=2 : setTimeout, deferred events
     */
        waitingMode = 0;

    $.lazyLoadXT = $.extend(options, elementOptions, $.lazyLoadXT);

    /**
     * Add new elements to lazy-load list:
     * $(elements).lazyLoadXT() or $(window).lazyLoadXT()
     *
     * @param {object} [overrides] loading of all elements
     */
    $.fn.lazyLoadXT = function (overrides) {
        overrides = overrides || {};

        var elementOptionsOverrides = {},
            blankImage = overrides.blankImage || options.blankImage,
            classNojs = overrides.classNojs || options.classNojs,
            checkDuplicates = overrides.checkDuplicates || true,
            prop;

        for (prop in elementOptions) {
            elementOptionsOverrides[prop] = (overrides[prop] === undefined) ? options[prop] : overrides[prop];
        }

        return this.each(function () {
            if (this === window) {
                $(options.selector).lazyLoadXT(overrides);
            } else {
                // prevent duplicates
                if (checkDuplicates && $data(this, dataLazied)) {
                    return;
                }

                var $el = $(this);

                $el
                    .data(dataLazied, 1)
                    .removeClass(classNojs);

                if (blankImage && $el[0].tagName === 'IMG' && !$el.attr('src')) {
                    $el.attr('src', blankImage);
                }

                // clone elementOptionsOverrides object
                $el.lazyLoadXT = $.extend({}, elementOptionsOverrides);

                triggerEvent('init', $el);

                elements.unshift($el); // push it in the first position as we iterate elements in reverse order
            }
        });
    };


    /**
     * Save visible viewport boundary to viewportXXX variables
     */
    function calcViewport() {
        viewportTop = $window.scrollTop();
        viewportBottom = viewportTop + (window.innerHeight || $window.height());

        viewportLeft = window.pageXOffset || 0;
        viewportRight = viewportLeft + (window.innerWidth || $window.width());
    }


    /**
     * Process function/object event handler
     * @param {string} event suffix
     * @param {jQuery} $el
     */
    function triggerEvent(event, $el) {
        $el.trigger('lazy' + event, [$el]);

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
     * Trigger onload/onerror handler
     * @param {Event} e
     */
    function triggerLoadOrError(e) {
        triggerEvent(e.type, $(this).off('load error', triggerLoadOrError));
    }


    /**
     * Load visible elements
     * @param {bool} [force] loading of all elements
     */
    function checkLazyElements(force) {
        if (!elements.length) {
            return;
        }

        topLazy = Infinity;
        calcViewport();

        for (var i = elements.length - 1; i >= 0; i--) {
            var $el = elements[i],
                el = $el[0],
                objData = $el.lazyLoadXT;

            // remove items that are not in DOM
            if (!$.contains(document.documentElement, el)) {
                elements.splice(i, 1);
            } else if (force || !objData.visibleOnly || el.offsetWidth > 0 || el.offsetHeight > 0) {
                var offset = $el.offset(),
                    elTop = offset.top,
                    elLeft = offset.left,
                    edgeX = objData.edgeX,
                    edgeY = objData.edgeY,
                    topEdge = elTop - edgeY;

                if (force ||
                    ((topEdge <= viewportBottom) && (elTop + $el.height() > viewportTop - edgeY) &&
                        (elLeft <= viewportRight + edgeX) && (elLeft + $el.width() > viewportLeft - edgeX))) {

                    triggerEvent('show', $el);

                    var srcAttr = objData.srcAttr,
                        src = $.isFunction(srcAttr) ? srcAttr($el) : $el.attr(srcAttr);
                    if (src) {
                        $el
                            .on('load error', triggerLoadOrError)
                            .attr('src', src);
                    }

                    elements.splice(i, 1);
                } else {
                    if (topEdge < topLazy) {
                        topLazy = topEdge;
                    }
                }
            }
        }

        if (!elements.length) {
            $(document).trigger('lazyloadall');
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
        $window.lazyLoadXT();
        queueCheckLazyElements();
    }


    /**
     * Loading of all elements
     */
    function forceLoadAll() {
        checkLazyElements(true);
    }


    /**
     * Initialization
     */
    $(document).ready(function () {
        $window
            .on(options.loadEvent, initLazyElements)
            .on(options.updateEvent, queueCheckLazyElements)
            .on(options.forceEvent, forceLoadAll);

        if (options.autoInit) {
            initLazyElements(); // standard initialization
        }
    });

})(window.jQuery || window.Zepto, window, document);


(function ($) {
    var options = $.lazyLoadXT;

    options.selector += ',video,iframe[data-src]';
    options.videoPoster = 'data-poster';

    $(document).on('lazyshow', 'video', function (e, $el) {
        var srcAttr = $el.lazyLoadXT.srcAttr,
            isFuncSrcAttr = $.isFunction(srcAttr);

        $el
            .attr('poster', $el.attr(options.videoPoster))
            .children('source,track')
            .each(function () {
                var $child = $(this);
                $child.attr('src', isFuncSrcAttr ? srcAttr($child) : $child.attr(srcAttr));
            });

        // reload video
        this.load();
    });

})(window.jQuery || window.Zepto);
