/**
 * smoothState.js is a jQuery plugin to stop page load jank.
 *
 * This jQuery plugin progressively enhances page loads to 
 * behave more like a single-page application.
 *
 * @author  Miguel Ángel Pérez   reachme@miguel-perez.com
 * @see     https://github.com/miguel-perez/jquery.smoothState.js
 * 
 */

;(function ( $, window, document, undefined ) {
    "use strict";

    var
        /** Used later to scroll page to the top */
        $body       = $('html, body'),
        
        /** Used in development mode to console out useful warnings */
        consl       = (window.console || false),
        
        /** Used to match tags that get removed when trying to do $('html') */
        matchTag    = /<(\/?)(html|head|body|title|base|meta)(\s+[^>]*)?>/ig,
        
        /** Used to protect tags that get removed when trying to do $('html') */
        prefix      = 'ss' + Math.round(Math.random() * 100000),
        
        /** Plugin default options */
        defaults    = {

            /** If set to true, smoothState will prefetch a link's contents on hover */
            prefetch : false,
            
            /** A selecor that deinfes with links should be ignored by smoothState */
            blacklist : ".no-smoothstate, [target]",
            
            /** If set to true, smoothState will log useful debug information instead of aborting */
            development : false,
            
            /** The number of pages smoothState will try to store in memory and not request again */
            pageCacheSize : 0,
            
            /** A function that can be used to alter urls before they are used to request content */
            alterRequestUrl : function (url) {
                return url;
            },
            
            /** Run when a link has been activated */
            onStart : function (url, $container) {
                $body.scrollTop(0);
            },

            /** Run if the page request is still pending and onStart has finished animating */
            onProgress : function (url, $container) {
                $body.css('cursor', 'wait');
                $body.find('a').css('cursor', 'wait');
            },

            /** Run when requested content is ready to be injected into the page  */
            onEnd : function (url, $container, $content) {
                $body.css('cursor', 'auto');
                $body.find('a').css('cursor', 'auto');
                $container.html($content);
            }
        },
        
        /** Utility functions that are decoupled from SmoothState */
        utility     = {

            /**
             * Checks to see if the url is external
             * @param   {string}    url - url being evaluated
             * @see     http://stackoverflow.com/questions/6238351/fastest-way-to-detect-external-urls
             * 
             */
            isExternal: function (url) {
                var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
                if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) {
                    return true;
                }
                if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + {"http:": 80, "https:": 443}[location.protocol] + ")?$"), "") !== location.host) {
                    return true;
                }
                return false;
            },

            /**
             * Checks to see if the url is an internal hash
             * @param   {string}    url - url being evaluated
             * 
             */
            isHash: function (url) {
                var hasPathname = (url.indexOf(window.location.pathname) > 0) ? true : false,
                    hasHash = (url.indexOf("#") > 0) ? true : false;
                return (hasPathname && hasHash) ? true : false;
            },

            /**
             * Checks to see if we should be loading this URL
             * @param   {string}    url - url being evaluated
             * 
             */
            shouldLoad: function ($anchor, blacklist) {
                var url = $anchor.prop("href");
                // URL will only be loaded if it's not an external link, hash, or blacklisted
                return (!utility.isExternal(url) && !utility.isHash(url) && !$anchor.is(blacklist));
            },

            /**
             * Prevents jQuery from stripping elements from $(html)
             * @param   {string}    url - url being evaluated
             * @author  Ben Alman   http://benalman.com/
             * @see     https://gist.github.com/cowboy/742952
             * 
             */
            htmlDoc: function (html) {
                var parent,
                    elems = $(),
                    htmlParsed = html.replace(matchTag, function(tag, slash, name, attrs) {
                        var obj = {};
                        if (!slash) {
                            elems = elems.add('<' + name + '/>');
                            if (attrs) {
                                $.each($('<div' + attrs + '/>')[0].attributes, function(i, attr) {
                                obj[attr.name] = attr.value;
                                });
                            }
                            elems.eq(-1).attr(obj);
                        }
                        return '<' + slash + 'div' + (slash ? '' : ' id="' + prefix + (elems.length - 1) + '"') + '>';
                    });

                // If no placeholder elements were necessary, just return normal
                // jQuery-parsed HTML.
                if (!elems.length) {
                    return $(html);
                }
                // Create parent node if it hasn't been created yet.
                if (!parent) {
                    parent = $('<div/>');
                }
                // Create the parent node and append the parsed, place-held HTML.
                parent.html(htmlParsed);
                
                // Replace each placeholder element with its intended element.
                $.each(elems, function(i) {
                    var elem = parent.find('#' + prefix + i).before(elems[i]);
                    elems.eq(i).html(elem.contents());
                    elem.remove();
                });

                return parent.children().unwrap();
            },

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
            clearIfOverCapacity: function (obj, cap) {
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
            },

            /**
             * Grabs the new container's contents from the cache
             * @param   {string}    id
             * @param   {object}    $html
             * 
             */
            getContentById: function (id, $html) {
                var updatedContainer    = $(id, $html).html(),
                    newContent          = (updatedContainer.length) ? $(updatedContainer) : null;
                return newContent;
            },

            /**
             * Stores html content as jquery object in given object
             * @param   {object}    object - object contents will be stored into
             * @param   {string}    url - url to be used as the prop
             * @param   {string}    html - contents to store
             * 
             */
            storePageIn: function (object, url, html) {
                var $htmlDoc = utility.htmlDoc(html);
                object[url] = { // Content is indexed by the url
                    status: "loaded",
                    title: $htmlDoc.find("title").text(), // Stores the title of the page
                    html: $htmlDoc // Stores the contents of the page
                };
                return object;
            },

            /**
             * Fires a custom event when all animations are complete
             * @param   {object}    $element - jQuery object that should trigger event
             * 
             */
            triggerAllAnimationEndEvent: function ($element) {
                var animationCount      = 0,
                    animationstart      = "animationstart webkitAnimationStart oanimationstart MSAnimationStart",
                    animationend        = "animationend webkitAnimationEnd oanimationend MSAnimationEnd",
                    eventname           = "ss.allanimationend",
                    unbindHandlers      = function(e){
                        $element.trigger(eventname);
                        utility.redraw($element);
                    },
                    onAnimationStart    = function (e) {
                        e.stopPropagation();
                        animationCount ++;
                    },
                    onAnimationEnd      = function (e) {
                        e.stopPropagation();
                        animationCount --;
                        if(animationCount === 0) {
                            unbindHandlers();
                        }
                    };
                
                $element.on(animationstart, onAnimationStart);
                $element.on(animationend, onAnimationEnd);
            },

            /**
             * Fires a custom callback when all animations are finished
             * @param   {object}    $element - jQuery object that should trigger event
             * @param   {function}  callback - function to run
             * 
             */
            triggerCallback: function ($element, callback) {
                $element.one("ss.allanimationend", callback);

                // Fires fake animation events in case no animations are used
                setTimeout(function(){
                    $element.trigger("animationstart");
                    $element.trigger("animationend");
                }, 100);
            },

            /** Forces browser to redraw elements */
            redraw: function ($element) {
                $element.hide(0, function() {
                    $(this).show();
                });
            }
        },

        /** Handles the popstate event, like when the user hits 'back' */
        onPopState = function ( e ) {
            if(e.state !== null) {
                var url  = window.location.href,
                    page = $('#' + e.state.id).data('smoothState');
                if(page.href !== url && !utility.isHash(url)) {
                    page.load(url, true);
                }
            }
        },

        /** Constructor function */
        SmoothState = function ( element, options ) {
            var
                /** Container element smoothState is run on */
                $container  = $(element),
                
                /** Variable that stores pages after they are requested */
                cache       = {},
                
                /** Url of the content that is currently displayed */
                currentHref = window.location.href,

                /**
                 * Loads the contents of a url into our container 
                 *
                 * @param   {string}    url
                 * @param   {bool}      isPopped - used to determine if whe should
                 *                      add a new item into the history object
                 * 
                 */
                load = function (url, isPopped) {
                    
                    /** Makes this an optional variable by setting a default */
                    isPopped = isPopped || false;

                    var
                        /** Used to check if the onProgress function has been run */
                        hasRunCallback  = false,
                        
                        /** List of responses for the states of the page request */
                        responses       = {

                            /** Page is ready, update the content */
                            loaded: function() {
                                updateContent(url);
                                if(!isPopped) {
                                    history.pushState({ id: $container.prop('id') }, cache[url].title, url);
                                }
                                $container.data('smoothState').href = url;
                            },

                            /** Loading, wait 10 ms and check again */
                            fetching: function() {
                                setTimeout(function () {
                                    if(!hasRunCallback) {
                                        utility.triggerCallback($container, function(){
                                            options.onProgress(url, $container, null);
                                        });
                                        hasRunCallback = true;
                                    }
                                    responses[cache[url].status]();
                                }, 10);
                            },

                            /** Error, abort and redirect */
                            error: function(){
                                window.location = url;
                            }
                        };
                    
                    if (!cache.hasOwnProperty(url)) {
                        fetch(url);
                    }

                    options.onStart(url, $container, null);

                    responses[cache[url].status]();

                },

                /** Updates the contents from cache[url] */
                updateContent = function (url) {
                    // If the content has been requested and is done:
                    var containerId = '#' + $container.prop('id'),
                        $content    = utility.getContentById(containerId, cache[url].html);

                    if($content) {
                        utility.triggerCallback($container, function(){
                            options.onEnd(url, $container, $content);
                        });
                    } else if (!$content && options.development && consl) {
                        // Throw warning to help debug in development mode
                        consl.warn("No element with an id of " + containerId + "' in response from " + url + " in " + object);
                    } else {
                        // No content availble to update with, aborting...
                        window.location = url;
                    }
                },

                /**
                 * Fetches the contents of a url and stores it in the 'cache' varible
                 * @param   {string}    url
                 * @todo    Rethink cache structure
                 * 
                 */
                fetch = function (url) {
                    cache[url] = { status: "fetching" };
                    var requestUrl  = options.alterRequestUrl(url) || url,
                        request     = $.ajax(requestUrl);

                    // Store contents in cache variable if successful
                    request.success(function (html) {
                        // Clear cache varible if it's getting too big
                        cache = utility.clearIfOverCapacity(cache, options.pageCacheSize);
                        utility.storePageIn(cache, url, html);
                    });

                    // Mark as error
                    request.error(function () {
                        cache[url].status = "error";
                    });
                },

                /**
                 * Binds to the hover event of a link, used for prefetching content
                 *
                 * @param   {object}    event
                 * 
                 */
                hoverAnchor = function (event) {
                    event.stopPropagation();
                    var $anchor = $(event.currentTarget),
                        url     = $anchor.prop("href");
                    if (utility.shouldLoad($anchor, options.blacklist)) {
                        fetch(url);
                    }
                },

                /**
                 * Binds to the click event of a link, used to show the content
                 *
                 * @param   {object}    event
                 * @todo    Allow loading from a template in addition to an ajax request
                 * 
                 */
                clickAnchor = function (event) {
                    // stopPropagation so that event doesn't fire on parent containers.
                    event.stopPropagation();

                    var $anchor     = $(event.currentTarget),
                        url         = $anchor.prop("href"),
                        $container  = $(event.delegateTarget);

                    if (utility.shouldLoad($anchor, options.blacklist)) {
                        event.preventDefault();
                        load(url);
                    }
                },

                /**
                 * Binds all events and inits functionality
                 *
                 * @param   {object}    event
                 * @todo    Allow loading from a template in addition to an ajax request
                 * 
                 */
                bindEventHandlers = function ($element) {
                    //@todo: Handle form submissions
                    $element.on("click", "a", clickAnchor);
                    if (options.prefetch) {
                        $element.on("mouseover touchstart", "a", hoverAnchor);
                    }
                },

                /** Used to restart css animations with a class */
                toggleAnimationClass = function (string) {
                    var classes = $container.addClass(string).prop('class');
                    $container.removeClass(classes);
                    setTimeout(function(){
                        $container.addClass(classes);
                        utility.triggerCallback($container, function(){
                            $container.removeClass(string);
                        });
                    }, 0);
                };

            /** Override defaults with options passed in */
            options = $.extend(defaults, options);

            /** Sets a default state */
            if(history.state === null) {
                history.replaceState({ id: $container.prop('id') }, document.title, currentHref);
            }

            /** Stores the current page in cache variable */
            utility.storePageIn(cache, currentHref, document.documentElement.outerHTML);

            /** Bind all of the event handlers on the container, not anchors */
            bindEventHandlers($container);

            /** Set to fire our custom event when all animations are complete */
            utility.triggerAllAnimationEndEvent($container);

            /** Public methods */
            return {
                href: currentHref,
                cache: cache,
                load: load,
                fetch: fetch,
                toggleAnimationClass: toggleAnimationClass
            };
        },

        /** Returns elements with SmoothState attached to it */
        declareSmoothState = function ( options ) {
            return this.each(function () {
                // Checks to make sure the smoothState element has an id and isn't already bound
                if(this.id && !$.data(this, 'smoothState')) {
                    // Makes public methods available via $('element').data('smoothState');
                    $.data(this, 'smoothState', new SmoothState(this, options));
                } else if (!this.id && consl) {
                    // Throw warning if in development mode
                    consl.warn("Every smoothState container needs an id but the following one does not have one:", this);
                }
            });
        };

    /** Sets the popstate function */
    window.onpopstate = onPopState;

    /** Makes utility functions public for unit tests */
    $.smoothStateUtility = utility;

    /** Defines the smoothState plugin */
    $.fn.smoothState = declareSmoothState;

})(jQuery, window, document);
