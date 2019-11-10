
(function ($) {

    "use strict";

    /**
     * This is jQuery plugin that progressively enhances page loads 
     * to behave more like single-page application.
     *
     * The approach taken here is that of a mix of ajax, pushstate,
     * and a series of render functions that output the scafolding markup
     * needed for CSS animations on an interval. The jquery plugin is run
     * on a container element. This container will listen for links that are
     * interacted with and fetch the content, run the render functions, and
     * update the URL of the page.
     *
     * @author  Miguel Ángel Pérez   reachme@miguel-perez.com
     * @param   {object}             options - List of configuarable variables
     * 
     */
    $.fn.smoothState = function (options) {

        var popedState  = false, // used later to check if we need to update the URL
            cache       = {}, // used to store the contents that we fetch with ajax
            $body       = $("body"),
            $wind       = $(window),
            consl       = (window.console || false);

        // Defaults
        options = $.extend({
            innerPageSelector   : "",
            prefetch            : false,
            blacklist           : ".no-smoothstate, [rel='nofollow'], [target]",
            loadingBodyClass    : "loading-cursor",
            development         : false,
            pageCacheSize       : 5,
            frameDelay          : 400,
            renderFrame         : [
                function ($content) {
                    return $("<div/>").append($content).html();
                }
            ],
            alterRequestUrl     : function (url) {
                return url;
            },
            onAfter             : function () {},
            onBefore            : function () {
                $wind.scrollTop(0);
            }
        }, options);


        /**
         * Loads the contents of a url into a specified container 
         *
         * @todo    Don't wait until the response is done to start animating content
         * @param   {string}    url
         * @param   {jQuery}    $container - container the new content
         *                      will be injected into.
         * 
         */
        function load(url, $container) {
            // Checks to see if we already have the contents of this URL
            if (cache.hasOwnProperty(url)) {
                // Null is an indication that the Ajax request has been
                // fired but has not completed.
                if (cache[url] === null) {
                    // If the content has been request but is not done,
                    // wait 10ms and try again and add a loading indicator.
                    setTimeout(function () {
                        $body.addClass(options.loadingBodyClass);
                        load(url, $container);
                    }, 10);
                } else if (cache[url] === "error") {
                    // If there was an error, abort and redirect
                    window.location = url;
                } else {
                    // If the content has been requested and is done:
                    // 1. Remove loading class
                    $body.removeClass(options.loadingBodyClass);
                    // 2. Run onBefore function
                    options.onBefore(url, $container);
                    // 3. Start to update the page
                    updatePage(url, $container);
                }
            } else {
                // Starts to fetch and load the content if we haven't started
                // to load the content.
                fetch(url);
                load(url, $container);
            }
        }


        /**
         * Fetches the contents of a url and stores it in the 'cache' varible
         * @param   {string}    url
         * 
         */
        function fetch(url) {
            if (!cache.hasOwnProperty(url)) {
                cache[url] = null;

                var requestUrl  = options.alterRequestUrl(url),
                    request     = $.ajax(requestUrl);

                // Store contents in cache variable if successful
                request.success(function (html) {

                    // Clear cache varible if it's getting too big
                    cache = clearIfOverCapacity(cache, options.pageCacheSize);

                    cache[url] = { // Content is indexed by the url
                        title: $(html).filter("title").text(), // Stores the title of the page
                        html: html // Stores the contents of the page
                    };
                });

                // Mark as error
                request.error(function () {
                    cache[url] = "error";
                });
            }
        }


        /**
         * Resets an object if it has too many properties
         *
         * This is used to clear the 'cache' object that stores
         * all of the html. This would prevent the client from
         * running out of memory and allow the user to hit the 
         * server for a fresh copy of the content.
         *
         * @param   {object}    obj
         * @param   {number}    cap
         * 
         */
        function clearIfOverCapacity(obj, cap) {

            // Polyfill Object.keys if it doesn't exist
            if (!Object.keys) {
                Object.keys = function (obj) {
                    var keys = [],
                        k;
                    for (k in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, k)) {
                            keys.push(k);
                        }
                    }
                    return keys;
                };
            }

            if (Object.keys(obj).length > cap) {
                obj = {};
            }

            return obj;
        }


        /**
         * Fetches the contents of a url and stores it in the 'cache' varible
         * @param   {string}    url
         * 
         */
        function updatePage(url, $container) {
            var containerId = $container.prop("id"),
                $content    = (containerId.length) ? $($(cache[url].html).find("#" + containerId).html()) : "";

            // We check to see if the container we hope to update is 
            // returned in the request so that we can replace existing
            // content with the updated markup.
            if (containerId.length && $content.length) {
                animateContent($content, $container);
                updateState(cache[url].title, url, containerId);
            } else if (options.development && consl) { // Throw warning to help debug
                if (!containerId.length) { // No container ID
                    consl.warn("The following container has no ID: ", $container[0]);
                } else if (!$content.length) { // No container in the response
                    consl.warn("No element with an ID of '#" + containerId + "' in response from " + url);
                }
            } else {
                // If the container isn't in the response, just abort.
                window.location = url;
            }
        }


        /**
         * Begins to loop through all of the render functions that alter the DOM
         * @param   {jquery}    $content - the markup that will replace the
         *                      contents of the container.
         * @param   {jquery}    $container - the container that is listening for
         *                      interactions to links.
         * 
         */
        function animateContent($content, $container) {
            var i, isLastFrame;
            for (i = 0; i < options.renderFrame.length; i += 1) {
                isLastFrame = (i === options.renderFrame.length - 1);
                showFrame(i, $content, $container, isLastFrame);
            }
        }


        /**
         * Updates the page title and URL
         * @param   {string}    title - title of the page we fetched content from
         * @param   {string}    url - url that we just fetched content from
         * @param   {string}    id - the id of the container that was updated
         * 
         */
        function updateState(title, url, id) {
            document.title = title;
            if (!popedState && history.pushState) {
                // the id is used to know what needs to be updated on the popState event
                history.pushState({ id: id }, title, url);
            }
        }


        /**
         * Defines when the render functions will run
         * @param   {number}    i - index of the function in options.renderFrame
         * @param   {jquery}    $content - the markup that will replace the
         *                      contents of the container.
         * @param   {jquery}    $container - the container that is listening for
         *                      interactions to links.
         * @param   {bool}      isLastFrame - used to determine if the callback should fire
         * 
         */
        function showFrame(i, $content, $container, isLastFrame) {
            var timing = options.frameDelay * i;
            setTimeout(function () {
                var html = options.renderFrame[i]($content, $container);
                $container.html(html);
                if (isLastFrame) {
                    options.onAfter($content, $container);
                }
            }, timing);
        }


        /**
         * Checks to see if the url is external
         * @param   {string}    url - url being evaluated
         * @see     http://stackoverflow.com/questions/6238351/fastest-way-to-detect-external-urls
         * 
         */
        function isExternal(url) {
            var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
            if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) {
                return true;
            }
            if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + {"http:": 80, "https:": 443}[location.protocol] + ")?$"), "") !== location.host) {
                return true;
            }
            return false;
        }


        /**
         * Checks to see if the url is an internal hash
         * @param   {string}    url - url being evaluated
         * 
         */
        function isHash(url) {
            var hasPathname = (url.indexOf(window.location.pathname) > 0) ? true : false,
                hasHash = (url.indexOf("#") > 0) ? true : false;
            return (hasPathname && hasHash) ? true : false;
        }


        /**
         * Checks to see if we should be loading this URL
         * @param   {string}    url - url being evaluated
         * 
         */
        function shouldLoad($anchor) {
            var url = $anchor.prop("href");
            // URL will only be loaded if it's not an external link, hash, or blacklisted
            return (!isExternal(url) && !isHash(url) && !$anchor.is(options.blacklist));
        }


        /**
         * Figures out where the new content should be injected.
         *
         * If an element matching a given selector is found
         * it'll try to load the content in there. If not, it will set
         * the container to be the element the plugin was init'ed on.
         *
         * @param   {page}    url - url being evaluated
         * 
         */
        function getTargetContainer(container, selector) {
            var $container      = $(container),
                $childContainer = $(selector, $container).first();
            return ($childContainer.length) ? $childContainer : $container;
        }


        /**
         * Binds to the hover event of a link, used for prefetching content
         *
         * @param   {object}    event
         * 
         */
        function hoverAnchor(event) {
            event.stopPropagation();
            var $anchor = $(event.currentTarget),
                url     = $anchor.prop("href");
            if (shouldLoad($anchor)) {
                fetch(url);
            }
        }


        /**
         * Binds to the click event of a link, used to show the content
         *
         * @param   {object}    event
         * @todo    Allow loading from a template in addition to an ajax request
         * 
         */
        function clickAnchor(event) {
            // stopPropagation so that event doesn't fire on parent containers.
            event.stopPropagation();

            var $anchor     = $(event.currentTarget),
                url         = $anchor.prop("href"),
                $container  = getTargetContainer(event.delegateTarget, options.innerPageSelector);

            if (shouldLoad($anchor)) {
                event.preventDefault();
                load(url, $container);
            }
        }


        /**
         * Handles the popstate event, like when the user hits 'back'
         *
         * @param   {object}    event
         * @see     https://developer.mozilla.org/en-US/docs/Web/API/Window.onpopstate
         * 
         */
        function onPopState() {
            var url = window.location.href;
            if (!isExternal(url) && !isHash(url) && history.state) {
                // Sets the flag that we've begun to pop states
                popedState = true;
                // Update content if we know what needs to be updated
                load(url, $("#" + history.state.id));
            } else if (history.state === null && popedState) {
                window.location = url;
            }
        }

        // Sets the popstate function
        window.onpopstate = onPopState;


        // Returns the jquery object
        return this.each(function () {
            //@todo: Handle form submissions
            var $this = $(this);
            $this.on("click touchend", "a", clickAnchor);
            if (options.prefetch) {
                $this.on("mouseover touchstart", "a", hoverAnchor);
            }
        });
    };

})(jQuery);
