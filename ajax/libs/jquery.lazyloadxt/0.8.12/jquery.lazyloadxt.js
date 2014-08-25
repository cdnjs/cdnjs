/*! Lazy Load XT v0.8.12 2014-01-12
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
            updateEvent: 'load orientationchange resize scroll touchmove', // page-modified events
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
        $isFunction = $.isFunction,
        docElement = document.documentElement,
    //  autoload all images in Opera Mini and some mobile browsers without scroll event or getBoundingClientRect()
        autoLoad = (window.onscroll === undefined || !!window.operamini || !docElement.getBoundingClientRect),
        dataLazied = 'lazied',
        load_error = 'load error',
        elements = [],
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
     * Return def if value is undefined, otherwise return value
     * @param {*} value
     * @param {*} def
     * @returns *
     */
    function getOrDef(value, def) {
        return value === undefined ? def : value;
    }


    /**
     * Add new elements to lazy-load list:
     * $(elements).lazyLoadXT() or $(window).lazyLoadXT()
     *
     * @param {object} [overrides] loading of all elements
     */
    $.fn.lazyLoadXT = function (overrides) {
        overrides = overrides || {};

        var elementOptionsOverrides = {},
            blankImage = getOrDef(overrides.blankImage, options.blankImage),
            classNojs = getOrDef(overrides.classNojs, options.classNojs),
            checkDuplicates = getOrDef(overrides.checkDuplicates, true),
            prop;

        for (prop in elementOptions) {
            elementOptionsOverrides[prop] = getOrDef(overrides[prop], options[prop]);
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

                if (blankImage && $el[0].tagName === 'IMG' && !this.src) {
                    this.src = blankImage;
                }

                // clone elementOptionsOverrides object
                $el.lazyLoadXT = $.extend({}, elementOptionsOverrides);

                triggerEvent('init', $el);

                elements.unshift($el); // push it in the first position as we iterate elements in reverse order
            }
        });
    };


    /**
     * Process function/object event handler
     * @param {string} event suffix
     * @param {jQuery} $el
     */
    function triggerEvent(event, $el) {
        $el.trigger('lazy' + event, [$el]);

        var handler = options['on' + event];
        if (handler) {
            if ($isFunction(handler)) {
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
        triggerEvent(e.type, $(this).off(load_error, triggerLoadOrError));
    }


    /**
     * Load visible elements
     * @param {bool} [force] loading of all elements
     */
    function checkLazyElements(force) {
        if (!elements.length) {
            return;
        }

        force = force || autoLoad;

        topLazy = Infinity;

        var viewportTop = $window.scrollTop(),
            viewportHeight = window.innerHeight || $window.height(),
            viewportWidth = window.innerWidth || $window.width(),
            i;

        for (i = elements.length - 1; i >= 0; i--) {
            var $el = elements[i],
                el = $el[0],
                objData = $el.lazyLoadXT;

            // remove items that are not in DOM
            if (!$.contains(docElement, el)) {
                elements.splice(i, 1);
            } else if (force || !objData.visibleOnly || el.offsetWidth > 0 || el.offsetHeight > 0) {
                var elPos = el.getBoundingClientRect(),
                    edgeX = objData.edgeX,
                    edgeY = objData.edgeY,
                    topEdge = (elPos.top + viewportTop - edgeY) - viewportHeight;

                if (force || (topEdge <= viewportTop && elPos.bottom > -edgeY &&
                        elPos.left <= viewportWidth + edgeX && elPos.right > -edgeX)) {

                    triggerEvent('show', $el);

                    var srcAttr = objData.srcAttr,
                        src = $isFunction(srcAttr) ? srcAttr($el) : el.getAttribute(srcAttr);
                    if (src) {
                        $el.on(load_error, triggerLoadOrError);
                        el.src = src;
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
            if (topLazy >= $window.scrollTop()) {
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
