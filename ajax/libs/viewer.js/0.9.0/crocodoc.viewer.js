/*! Crocodoc Viewer - v0.9.0 | (c) 2014 Box */

(function (window) {
    /*global jQuery*/
    /*jshint unused:false, undef:false*/
    'use strict';
    window.Crocodoc = (function(fn) {
        if (typeof exports === 'object') {
            // nodejs / browserify - export a function that accepts a jquery impl
            module.exports = fn;
        } else {
            // normal browser environment
            return fn(jQuery);
        }
    }(function($) {

/*jshint unused:false*/

if (typeof $ === 'undefined') {
    throw new Error('jQuery is required');
}

/**
 * The one global object for Crocodoc JavaScript.
 * @namespace
 */
var Crocodoc = (function () {

    'use strict';

    var components = {},
        utilities = {};

    /**
     * Find circular dependencies in component mixins
     * @param   {string} componentName   The component name that is being added
     * @param   {Array} dependencies  Array of component mixin dependencies
     * @param   {void} path           String used to keep track of depencency graph
     * @returns {void}
     */
    function findCircularDependencies(componentName, dependencies, path) {
        var i;
        path = path || componentName;
        for (i = 0; i < dependencies.length; ++i) {
            if (componentName === dependencies[i]) {
                throw new Error('Circular dependency detected: ' + path + '->' + dependencies[i]);
            } else if (components[dependencies[i]]) {
                findCircularDependencies(componentName, components[dependencies[i]].mixins, path + '->' + dependencies[i]);
            }
        }
    }

    return {
        // Zoom, scroll, page status, layout constants
        ZOOM_FIT_WIDTH:                 'fitwidth',
        ZOOM_FIT_HEIGHT:                'fitheight',
        ZOOM_AUTO:                      'auto',
        ZOOM_IN:                        'in',
        ZOOM_OUT:                       'out',

        SCROLL_PREVIOUS:                'previous',
        SCROLL_NEXT:                    'next',

        LAYOUT_VERTICAL:                'vertical',
        LAYOUT_VERTICAL_SINGLE_COLUMN:  'vertical-single-column',
        LAYOUT_HORIZONTAL:              'horizontal',
        LAYOUT_PRESENTATION:            'presentation',
        LAYOUT_PRESENTATION_TWO_PAGE:   'presentation-two-page',

        PAGE_STATUS_CONVERTING:         'converting',
        PAGE_STATUS_NOT_LOADED:         'not loaded',
        PAGE_STATUS_LOADING:            'loading',
        PAGE_STATUS_LOADED:             'loaded',
        PAGE_STATUS_ERROR:              'error',

        // The number of times to retry loading an asset before giving up
        ASSET_REQUEST_RETRIES: 1,

        // exposed for testing purposes only
        // should not be accessed directly otherwise
        components: components,
        utilities: utilities,

        /**
         * Create and return a viewer instance initialized with the given parameters
         * @param {string|Element|jQuery} el The element to bind the viewer to
         * @param {Object} config            The viewer configuration parameters
         * @returns {Object}                 The viewer instance
         */
        createViewer: function (el, config) {
            return new Crocodoc.Viewer(el, config);
        },

        /**
         * Get a viewer instance by id
         * @param {number} id   The id
         * @returns {Object}    The viewer instance
         */
        getViewer: function (id) {
            return Crocodoc.Viewer.get(id);
        },

        /**
         * Register a new component
         * @param  {string} name      The (unique) name of the component
         * @param  {Array} mixins     Array of component names to instantiate and pass as mixinable objects to the creator method
         * @param  {Function} creator Factory function used to create an instance of the component
         * @returns {void}
         */
        addComponent: function (name, mixins, creator) {
            if (mixins instanceof Function) {
                creator = mixins;
                mixins = [];
            }
            // make sure this component won't cause a circular mixin dependency
            findCircularDependencies(name, mixins);
            components[name] = {
                mixins: mixins,
                creator: creator
            };
        },

        /**
         * Create and return an instance of the named component
         * @param  {string} name The name of the component to create
         * @param  {Crocodoc.Scope} scope The scope object to create the component on
         * @returns {?Object}     The component instance or null if the component doesn't exist
         */
        createComponent: function (name, scope) {
            var component = components[name];

            if (component) {
                var args = [];
                for (var i = 0; i < component.mixins.length; ++i) {
                    args.push(this.createComponent(component.mixins[i], scope));
                }
                args.unshift(scope);
                return component.creator.apply(component.creator, args);
            }

            return null;
        },

        /**
         * Register a new Crocodoc plugin
         * @param  {string} name      The (unique) name of the plugin
         * @param  {Function} creator Factory function used to create an instance of the plugin
         * @returns {void}
         */
        addPlugin: function (name, creator) {
            this.addComponent('plugin-' + name, creator);
        },

        /**
         * Register a new Crocodoc data provider
         * @param {string} modelName The model name this data provider provides
         * @param {Function} creator Factory function used to create an instance of the data provider.
         */
        addDataProvider: function(modelName, creator) {
            this.addComponent('data-provider-' + modelName, creator);
        },

        /**
         * Register a new utility
         * @param  {string} name    The (unique) name of the utility
         * @param  {Function} creator Factory function used to create an instance of the utility
         * @returns {void}
         */
        addUtility: function (name, creator) {
            utilities[name] = {
                creator: creator,
                instance: null
            };
        },

        /**
         * Retrieve the named utility
         * @param {string} name The name of the utility to retrieve
         * @returns {?Object}    The utility or null if the utility doesn't exist
         */
        getUtility: function (name) {
            var utility = utilities[name];

            if (utility) {
                if (!utility.instance) {
                    utility.instance = utility.creator(this);
                }

                return utility.instance;
            }

            return null;
        }
    };
})();

(function () {

    'use strict';

    /**
     * Scope class used for component scoping (creating, destroying, broadcasting messages)
     * @constructor
     */
    Crocodoc.Scope = function Scope(config) {

        //----------------------------------------------------------------------
        // Private
        //----------------------------------------------------------------------

        var util = Crocodoc.getUtility('common');

        var instances = [],
            messageQueue = [],
            dataProviders = {},
            ready = false;

        /**
         * Broadcast a message to all components in this scope that have registered
         * a listener for the named message type
         * @param  {string} messageName The message name
         * @param  {any} data The message data
         * @returns {void}
         * @private
         */
        function broadcast(messageName, data) {
            var i, len, instance, messages;
            for (i = 0, len = instances.length; i < len; ++i) {
                instance = instances[i];
                if (!instance) {
                    continue;
                }
                messages = instance.messages || [];

                if (util.inArray(messageName, messages) !== -1) {
                    if (typeof instance.onmessage === 'function') {
                        instance.onmessage.call(instance, messageName, data);
                    }
                }
            }
        }

        /**
         * Broadcasts any (pageavailable) messages that were queued up
         * before the viewer was ready
         * @returns {void}
         * @private
         */
        function broadcastQueuedMessages() {
            var message;
            while (messageQueue.length) {
                message = messageQueue.shift();
                broadcast(message.name, message.data);
            }
            messageQueue = null;
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        config.dataProviders = config.dataProviders || {};

        /**
         * Create and return an instance of the named component,
         * and add it to the list of instances in this scope
         * @param  {string} componentName The name of the component to create
         * @returns {?Object}     The component instance or null if the component doesn't exist
         */
        this.createComponent = function (componentName) {
            var instance = Crocodoc.createComponent(componentName, this);
            if (instance) {
                instance.componentName = componentName;
                instances.push(instance);
            }
            return instance;
        };

        /**
         * Remove and call the destroy method on a component instance
         * @param  {Object} instance The component instance to remove
         * @returns {void}
         */
        this.destroyComponent = function (instance) {
            var i, len;

            for (i = 0, len = instances.length; i < len; ++i) {
                if (instance === instances[i]) {
                    if (typeof instance.destroy === 'function') {
                        instance.destroy();
                    }
                    instances.splice(i, 1);
                    break;
                }
            }
        };

        /**
         * Remove and call the destroy method on all instances in this scope
         * @returns {void}
         */
        this.destroy = function () {
            var i, len, instance;

            for (i = 0, len = instances.length; i < len; ++i) {
                instance = instances[i];
                if (typeof instance.destroy === 'function') {
                    instance.destroy();
                }
            }
            instances = [];
            dataProviders = {};
        };

        /**
         * Broadcast a message or queue it until the viewer is ready
         * @param   {string} name The name of the message
         * @param   {*} data The message data
         * @returns {void}
         */
        this.broadcast = function (messageName, data) {
            if (ready) {
                broadcast(messageName, data);
            } else {
                messageQueue.push({ name: messageName, data: data });
            }
        };

        /**
         * Passthrough method to the framework that retrieves utilities.
         * @param {string} name The name of the utility to retrieve
         * @returns {?Object}    An object if the utility is found or null if not
         */
        this.getUtility = function (name) {
            return Crocodoc.getUtility(name);
        };

        /**
         * Get the config object associated with this scope
         * @returns {Object} The config object
         */
        this.getConfig = function () {
            return config;
        };

        /**
         * Tell the scope that the viewer is ready and broadcast queued messages
         * @returns {void}
         */
        this.ready = function () {
            if (!ready) {
                ready = true;
                broadcastQueuedMessages();
            }
        };

        /**
         * Get a model object from a data provider. If the objectType is listed
         * in config.dataProviders, this will get the value from the data
         * provider that is specified in that map instead.
         * @param {string} objectType The type of object to retrieve ('page-svg', 'page-text', etc)
         * @param {string} objectKey  The key of the object to retrieve
         * @returns {$.Promise}
         */
        this.get = function(objectType, objectKey) {
            var newObjectType = config.dataProviders[objectType] || objectType;

            var provider = this.getDataProvider(newObjectType);
            if (provider) {
                return provider.get(objectType, objectKey);
            }
            return $.Deferred().reject('data-provider not found').promise();
        };

        /**
         * Get an instance of a data provider. Ignores config.dataProviders
         * overrides.
         * @param {string} objectType The type of object to retrieve a data provider for ('page-svg', 'page-text', etc)
         * @returns {Object} The data provider
         */
        this.getDataProvider = function (objectType) {
            var provider;
            if (dataProviders[objectType]) {
                provider = dataProviders[objectType];
            } else {
                provider = this.createComponent('data-provider-' + objectType);
                dataProviders[objectType] = provider;
            }

            return provider;
        };
    };
})();

(function () {
    'use strict';

    /**
     * Build an event object for the given type and data
     * @param   {string} type The event type
     * @param   {Object} data The event data
     * @returns {Object}      The event object
     */
    function buildEventObject(type, data) {
        var isDefaultPrevented = false;
        return {
            type: type,
            data: data,

            /**
             * Prevent the default action for this event
             * @returns {void}
             */
            preventDefault: function () {
                isDefaultPrevented = true;
            },

            /**
             * Return true if preventDefault() has been called on this event
             * @returns {Boolean}
             */
            isDefaultPrevented: function () {
                return isDefaultPrevented;
            }
        };
    }

    /**
     * An object that is capable of generating custom events and also
     * executing handlers for events when they occur.
     * @constructor
     */
    Crocodoc.EventTarget = function() {

        /**
         * Map of events to handlers. The keys in the object are the event names.
         * The values in the object are arrays of event handler functions.
         * @type {Object}
         * @private
         */
        this._handlers = {};
    };

    Crocodoc.EventTarget.prototype = {

        // restore constructor
        constructor: Crocodoc.EventTarget,

        /**
         * Adds a new event handler for a particular type of event.
         * @param {string} type The name of the event to listen for.
         * @param {Function} handler The function to call when the event occurs.
         * @returns {void}
         */
        on: function(type, handler) {
            if (typeof this._handlers[type] === 'undefined') {
                this._handlers[type] = [];
            }

            this._handlers[type].push(handler);
        },

        /**
         * Fires an event with the given name and data.
         * @param {string} type The type of event to fire.
         * @param {Object} data An object with properties that should end up on
         *      the event object for the given event.
         * @returns {Object} The event object
         */
        fire: function(type, data) {
            var handlers,
                i,
                len,
                event = buildEventObject(type, data);

            // if there are handlers for the event, call them in order
            handlers = this._handlers[event.type];
            if (handlers instanceof Array) {
                // @NOTE: do a concat() here to create a copy of the handlers array,
                // so that if another handler is removed of the same type, it doesn't
                // interfere with the handlers array
                handlers = handlers.concat();
                for (i = 0, len = handlers.length; i < len; i++) {
                    if (handlers[i]) {
                        handlers[i].call(this, event);
                    }
                }
            }

            // call handlers for `all` event type
            handlers = this._handlers.all;
            if (handlers instanceof Array) {
                // @NOTE: do a concat() here to create a copy of the handlers array,
                // so that if another handler is removed of the same type, it doesn't
                // interfere with the handlers array
                handlers = handlers.concat();
                for (i = 0, len = handlers.length; i < len; i++) {
                    if (handlers[i]) {
                        handlers[i].call(this, event);
                    }
                }
            }

            return event;
        },

        /**
         * Removes an event handler from a given event.
         * If the handler is not provided, remove all handlers of the given type.
         * @param {string} type The name of the event to remove from.
         * @param {Function} handler The function to remove as a handler.
         * @returns {void}
         */
        off: function(type, handler) {
            var handlers = this._handlers[type],
                i,
                len;

            if (handlers instanceof Array) {
                if (!handler) {
                    handlers.length = 0;
                    return;
                }
                for (i = 0, len = handlers.length; i < len; i++) {
                    if (handlers[i] === handler || handlers[i].handler === handler) {
                        handlers.splice(i, 1);
                        break;
                    }
                }
            }
        },


        /**
         * Adds a new event handler that should be removed after it's been triggered once.
         * @param {string} type The name of the event to listen for.
         * @param {Function} handler The function to call when the event occurs.
         * @returns {void}
         */
        one: function(type, handler) {
            var self = this,
                proxy = function (event) {
                    self.off(type, proxy);
                    handler.call(self, event);
                };
            proxy.handler = handler;
            this.on(type, proxy);
        }
    };

})();

/**
 * The Crocodoc.Viewer namespace
 * @namespace
 */
(function () {
    'use strict';

    var CSS_CLASS_TEXT_DISABLED  = 'crocodoc-text-disabled',
        CSS_CLASS_LINKS_DISABLED = 'crocodoc-links-disabled';

    var viewerInstanceCount = 0,
        instances = {};

    /**
     * Crocodoc.Viewer constructor
     * @param {jQuery|string|Element} el The element to wrap
     * @param {Object} options           Configuration options
     * @constructor
     */
    Crocodoc.Viewer = function (el, options) {
        // call the EventTarget constructor to init handlers
        Crocodoc.EventTarget.call(this);

        var util = Crocodoc.getUtility('common');
        var layout,
            $el = $(el),
            config = util.extend(true, {}, Crocodoc.Viewer.defaults, options),
            scope = new Crocodoc.Scope(config),
            viewerBase = scope.createComponent('viewer-base');

        //Container exists?
        if ($el.length === 0) {
            throw new Error('Invalid container element');
        }

        this.id = config.id = ++viewerInstanceCount;
        config.api = this;
        config.$el = $el;
        // register this instance
        instances[this.id] = this;

        function init() {
            viewerBase.init();
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        /**
         * Destroy the viewer instance
         * @returns {void}
         */
        this.destroy = function () {
            // unregister this instance
            delete instances[config.id];

            // broadcast a destroy message
            scope.broadcast('destroy');

            // destroy all components and plugins in this scope
            scope.destroy();
        };

        /**
         * Intiate loading of document assets
         * @returns {void}
         */
        this.load = function () {
            viewerBase.loadAssets();
        };

        /**
         * Set the layout to the given mode, destroying and cleaning up the current
         * layout if there is one
         * @param  {string} mode The layout mode
         * @returns {void}
         */
        this.setLayout = function (mode) {
            // removing old reference to prevent errors when handling layoutchange message
            layout = null;
            layout = viewerBase.setLayout(mode);
        };

        /**
         * Zoom to the given value
         * @param  {float|string} val Numeric zoom level to zoom to or one of:
         *                            Crocodoc.ZOOM_IN
         *                            Crocodoc.ZOOM_OUT
         *                            Crocodoc.ZOOM_AUTO
         *                            Crocodoc.ZOOM_FIT_WIDTH
         *                            Crocodoc.ZOOM_FIT_HEIGHT
         * @returns {void}
         */
        this.zoom = function (val) {
            // adjust for page scale if passed value is a number
            var valFloat = parseFloat(val);
            if (layout) {
                if (valFloat) {
                    val = valFloat / (config.pageScale || 1);
                }
                layout.setZoom(val);
            }
        };

        /**
         * Scroll to the given page
         * @param  {int|string} page Page number or one of:
         *                           Crocodoc.SCROLL_PREVIOUS
         *                           Crocodoc.SCROLL_NEXT
         * @returns {void}
         */
        this.scrollTo = function (page) {
            if (layout) {
                layout.scrollTo(page);
            }
        };

        /**
         * Scrolls by the given pixel amount from the current location
         * @param  {int} left Left offset to scroll to
         * @param  {int} top  Top offset to scroll to
         * @returns {void}
         */
        this.scrollBy = function (left, top) {
            if (layout) {
                layout.scrollBy(left, top);
            }
        };

        /**
         * Focuses the viewport so it can be natively scrolled with the keyboard
         * @returns {void}
         */
        this.focus = function () {
            if (layout) {
                layout.focus();
            }
        };

        /**
         * Enable text selection, loading text assets per page if necessary
         * @returns {void}
         */
        this.enableTextSelection = function () {
            if (!config.enableTextSelection) {
                $el.removeClass(CSS_CLASS_TEXT_DISABLED);
                config.enableTextSelection = true;
                scope.broadcast('textenabledchange', { enabled: true });
            }
        };

        /**
         * Disable text selection, hiding text layer on pages if it's already there
         * and disabling the loading of new text assets
         * @returns {void}
         */
        this.disableTextSelection = function () {
            if (config.enableTextSelection) {
                $el.addClass(CSS_CLASS_TEXT_DISABLED);
                config.enableTextSelection = false;
                scope.broadcast('textenabledchange', { enabled: false });
            }
        };

        /**
         * Enable links
         * @returns {void}
         */
        this.enableLinks = function () {
            if (!config.enableLinks) {
                $el.removeClass(CSS_CLASS_LINKS_DISABLED);
                config.enableLinks = true;
            }
        };

        /**
         * Disable links
         * @returns {void}
         */
        this.disableLinks = function () {
            if (config.enableLinks) {
                $el.addClass(CSS_CLASS_LINKS_DISABLED);
                config.enableLinks = false;
            }
        };

        /**
         * Force layout update
         * @returns {void}
         */
        this.updateLayout = function () {
            if (layout) {
                // force update layout (incl. calculating page paddings)
                layout.updatePageStates(true);
                layout.setZoom();
            }
        };

        init();
    };

    Crocodoc.Viewer.prototype = new Crocodoc.EventTarget();
    Crocodoc.Viewer.prototype.constructor = Crocodoc.Viewer;

    /**
     * Get a viewer instance by id
     * @param {number} id   The id
     * @returns {Object}    The viewer instance
     */
    Crocodoc.Viewer.get = function (id) {
        return instances[id];
    };

    // Global defaults
    Crocodoc.Viewer.defaults = {
        // the url to load the assets from (required)
        url: null,

        // document viewer layout
        layout: Crocodoc.LAYOUT_VERTICAL,

        // initial zoom level
        zoom: Crocodoc.ZOOM_AUTO,

        // page to start on
        page: 1,

        // enable/disable text layer
        enableTextSelection: true,

        // enable/disable links layer
        enableLinks: true,

        // enable/disable click-and-drag
        enableDragging: false,

        // query string parameters to append to all asset requests
        queryParams: null,

        // plugin configs
        plugins: {},

        // whether to use the browser window as the viewport into the document (this
        // is useful when the document should take up the entire browser window, e.g.,
        // on mobile devices)
        useWindowAsViewport: false,

        //--------------------------------------------------------------------------
        // The following are undocumented, internal, or experimental options,
        // which are very subject to change and likely to be broken.
        // --
        // USE AT YOUR OWN RISK!
        //--------------------------------------------------------------------------

        // whether or not the conversion is finished (eg., pages are ready to be loaded)
        conversionIsComplete: true,

        // template for loading assets... this should rarely (if ever) change
        template: {
            svg: 'page-{{page}}.svg',
            img: 'page-{{page}}.png',
            html: 'text-{{page}}.html',
            css: 'stylesheet.css',
            json: 'info.json'
        },

        // default data-providers
        dataProviders: {
            metadata: 'metadata',
            stylesheet: 'stylesheet',
            'page-svg': 'page-svg',
            'page-text': 'page-text',
            'page-img': 'page-img'
        },

        // page to start/end on (pages outside this range will not be shown)
        pageStart: null,
        pageEnd: null,

        // whether or not to automatically load page one assets immediately (even
        // if conversion is not yet complete)
        autoloadFirstPage: true,

        // zoom levels are relative to the viewport size,
        // and the dynamic zoom levels (auto, fitwidth, etc) will be added into the mix
        zoomLevels: [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 3.0]
    };
})();


Crocodoc.addDataProvider('metadata', function(scope) {
    'use strict';

    var ajax = scope.getUtility('ajax'),
        util = scope.getUtility('common'),
        config = scope.getConfig();

    /**
     * Process metadata json and return the result
     * @param   {string} json The original JSON text
     * @returns {string}      The processed JSON text
     * @private
     */
    function processJSONContent(json) {
        return util.parseJSON(json);
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Retrieve the info.json asset from the server
         * @returns {$.Promise} A promise with an additional abort() method that will abort the XHR request.
         */
        get: function() {
            var url = this.getURL(),
                $promise = ajax.fetch(url, Crocodoc.ASSET_REQUEST_RETRIES);

            // @NOTE: promise.then() creates a new promise, which does not copy
            // custom properties, so we need to create a futher promise and add
            // an object with the abort method as the new target
            return $promise.then(processJSONContent).promise({
                abort: $promise.abort
            });
        },

        /**
         * Build and return the URL to the metadata JSON
         * @returns {string}         The URL
         */
        getURL: function () {
            var jsonPath = config.template.json;
            return config.url + jsonPath + config.queryString;
        }
    };
});

Crocodoc.addDataProvider('page-img', function(scope) {
    'use strict';

    var util = scope.getUtility('common'),
        config = scope.getConfig();

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Retrieve the page image asset from the server
         * @param {string} objectType The type of data being requested
         * @param {number} pageNum The page number for which to request the page image
         * @returns {$.Promise}    A promise with an additional abort() method that will abort the img request.
         */
        get: function(objectType, pageNum) {
            var img = this.getImage(),
                retries = Crocodoc.ASSET_REQUEST_RETRIES,
                loaded = false,
                url = this.getURL(pageNum),
                $deferred = $.Deferred();

            function loadImage() {
                img.setAttribute('src', url);
            }

            function abortImage() {
                img.removeAttribute('src');
            }

            // add load and error handlers
            img.onload = function () {
                loaded = true;
                $deferred.resolve(img);
            };

            img.onerror = function () {
                if (retries > 0) {
                    retries--;
                    abortImage();
                    loadImage();
                } else {
                    img = null;
                    loaded = false;
                    $deferred.reject({
                        error: 'image failed to load',
                        resource: url
                    });
                }
            };

            // load the image
            loadImage();

            return $deferred.promise({
                abort: function () {
                    if (!loaded) {
                        abortImage();
                        $deferred.reject();
                    }
                }
            });
        },

        /**
         * Build and return the URL to the PNG asset for the specified page
         * @param   {number} pageNum The page number
         * @returns {string}         The URL
         */
        getURL: function (pageNum) {
            var imgPath = util.template(config.template.img, { page: pageNum });
            return config.url + imgPath + config.queryString;
        },

        /**
         * Create and return a new image element (used for testing purporses)
         * @returns {Image}
         */
        getImage: function () {
            return new Image();
        }
    };
});

Crocodoc.addDataProvider('page-svg', function(scope) {
    'use strict';

    var MAX_DATA_URLS = 1000;

    var util = scope.getUtility('common'),
        ajax = scope.getUtility('ajax'),
        browser = scope.getUtility('browser'),
        subpx = scope.getUtility('subpx'),
        config = scope.getConfig(),
        destroyed = false,
        cache = {};

    /**
     * Interpolate CSS text into the SVG text
     * @param   {string} text    The SVG text
     * @param   {string} cssText The CSS text
     * @returns {string}         The full SVG text
     */
    function interpolateCSSText(text, cssText) {
        // CSS text
        var stylesheetHTML = '<style>' + cssText + '</style>';

        // If using Firefox with no subpx support, add "text-rendering" CSS.
        // @NOTE(plai): We are not adding this to Chrome because Chrome supports "textLength"
        // on tspans and because the "text-rendering" property slows Chrome down significantly.
        // In Firefox, we're waiting on this bug: https://bugzilla.mozilla.org/show_bug.cgi?id=890692
        // @TODO: Use feature detection instead (textLength)
        if (browser.firefox && !subpx.isSubpxSupported()) {
            stylesheetHTML += '<style>text { text-rendering: geometricPrecision; }</style>';
        }

        // inline the CSS!
        text = text.replace(/<xhtml:link[^>]*>/, stylesheetHTML);

        return text;
    }

    /**
     * Process SVG text and return the embeddable result
     * @param   {string} text The original SVG text
     * @returns {string}      The processed SVG text
     * @private
     */
    function processSVGContent(text) {
        if (destroyed) {
            return;
        }

        var query = config.queryString.replace('&', '&#38;'),
            dataUrlCount;

        dataUrlCount = util.countInStr(text, 'xlink:href="data:image');
        // remove data:urls from the SVG content if the number exceeds MAX_DATA_URLS
        if (dataUrlCount > MAX_DATA_URLS) {
            // remove all data:url images that are smaller than 5KB
            text = text.replace(/<image[\s\w-_="]*xlink:href="data:image\/[^"]{0,5120}"[^>]*>/ig, '');
        }

        // @TODO: remove this, because we no longer use any external assets in this way
        // modify external asset urls for absolute path
        text = text.replace(/href="([^"#:]*)"/g, function (match, group) {
            return 'href="' + config.url + group + query + '"';
        });

        return scope.get('stylesheet').then(function (cssText) {
            return interpolateCSSText(text, cssText);
        });
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Retrieve a SVG asset from the server
         * @param {string} objectType The type of data being requested
         * @param {number} pageNum The page number for which to request the SVG
         * @returns {$.Promise}    A promise with an additional abort() method that will abort the XHR request.
         */
        get: function(objectType, pageNum) {
            var url = this.getURL(pageNum),
                $promise;

            if (cache[pageNum]) {
                return cache[pageNum];
            }

            $promise = ajax.fetch(url, Crocodoc.ASSET_REQUEST_RETRIES);

            // @NOTE: promise.then() creates a new promise, which does not copy
            // custom properties, so we need to create a futher promise and add
            // an object with the abort method as the new target
            cache[pageNum] = $promise.then(processSVGContent).promise({
                abort: function () {
                    $promise.abort();
                    if (cache) {
                        delete cache[pageNum];
                    }
                }
            });
            return cache[pageNum];
        },

        /**
         * Build and return the URL to the SVG asset for the specified page
         * @param   {number} pageNum The page number
         * @returns {string}         The URL
         */
        getURL: function (pageNum) {
            var svgPath = util.template(config.template.svg, { page: pageNum });
            return config.url + svgPath + config.queryString;
        },

        /**
         * Cleanup the data-provider
         * @returns {void}
         */
        destroy: function () {
            destroyed = true;
            util = ajax = subpx = browser = config = cache = null;
        }
    };
});

Crocodoc.addDataProvider('page-text', function(scope) {
    'use strict';

    var MAX_TEXT_BOXES = 256;

    var util = scope.getUtility('common'),
        ajax = scope.getUtility('ajax'),
        config = scope.getConfig(),
        destroyed = false,
        cache = {};

    /**
     * Process HTML text and return the embeddable result
     * @param   {string} text The original HTML text
     * @returns {string}      The processed HTML text
     * @private
     */
    function processTextContent(text) {
        if (destroyed) {
            return;
        }

        // in the text layer, divs are only used for text boxes, so
        // they should provide an accurate count
        var numTextBoxes = util.countInStr(text, '<div');
        // too many textboxes... don't load this page for performance reasons
        if (numTextBoxes > MAX_TEXT_BOXES) {
            return '';
        }

        // remove reference to the styles
        text = text.replace(/<link rel="stylesheet".*/, '');

        return text;
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Retrieve a text asset from the server
         * @param {string} objectType The type of data being requested
         * @param {number} pageNum The page number for which to request the text HTML
         * @returns {$.Promise}    A promise with an additional abort() method that will abort the XHR request.
         */
        get: function(objectType, pageNum) {
            var url = this.getURL(pageNum),
                $promise;

            if (cache[pageNum]) {
                return cache[pageNum];
            }

            $promise = ajax.fetch(url, Crocodoc.ASSET_REQUEST_RETRIES);

            // @NOTE: promise.then() creates a new promise, which does not copy
            // custom properties, so we need to create a futher promise and add
            // an object with the abort method as the new target
            cache[pageNum] = $promise.then(processTextContent).promise({
                abort: function () {
                    $promise.abort();
                    if (cache) {
                        delete cache[pageNum];
                    }
                }
            });
            return cache[pageNum];
        },

        /**
         * Build and return the URL to the HTML asset for the specified page
         * @param   {number} pageNum The page number
         * @returns {string}         The URL
         */
        getURL: function (pageNum) {
            var textPath = util.template(config.template.html, { page: pageNum });
            return config.url + textPath + config.queryString;
        },

        /**
         * Cleanup the data-provider
         * @returns {void}
         */
        destroy: function () {
            destroyed = true;
            util = ajax = config = cache = null;
        }
    };
});

Crocodoc.addDataProvider('stylesheet', function(scope) {
    'use strict';

    var ajax = scope.getUtility('ajax'),
        browser = scope.getUtility('browser'),
        config = scope.getConfig(),
        $cachedPromise;

    /**
     * Process stylesheet text and return the embeddable result
     * @param   {string} text The original CSS text
     * @returns {string}      The processed CSS text
     * @private
     */
    function processStylesheetContent(text) {
        // @NOTE: There is a bug in IE that causes the text layer to
        // not render the font when loaded for a second time (i.e.,
        // destroy and recreate a viewer for the same document), so
        // namespace the font-family so there is no collision
        if (browser.ie) {
            text = text.replace(/font-family:[\s\"\']*([\w-]+)\b/g,
                '$0-' + config.id);
        }

        return text;
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Retrieve the stylesheet.css asset from the server
         * @returns {$.Promise} A promise with an additional abort() method that will abort the XHR request.
         */
        get: function() {
            if ($cachedPromise) {
                return $cachedPromise;
            }

            var $promise = ajax.fetch(this.getURL(), Crocodoc.ASSET_REQUEST_RETRIES);

            // @NOTE: promise.then() creates a new promise, which does not copy
            // custom properties, so we need to create a futher promise and add
            // an object with the abort method as the new target
            $cachedPromise = $promise.then(processStylesheetContent).promise({
                abort: function () {
                    $promise.abort();
                    $cachedPromise = null;
                }
            });
            return $cachedPromise;
        },

        /**
         * Build and return the URL to the stylesheet CSS
         * @returns {string}         The URL
         */
        getURL: function () {
            var cssPath = config.template.css;
            return config.url + cssPath + config.queryString;
        },

        /**
         * Cleanup the data-provider
         * @returns {void}
         */
        destroy: function () {
            ajax = browser = config = null;
            $cachedPromise = null;
        }
    };
});

Crocodoc.addUtility('ajax', function (framework) {

    'use strict';

    var util = framework.getUtility('common'),
        support = framework.getUtility('support'),
        urlUtil = framework.getUtility('url');

    /**
     * Creates a request object to call the success/fail handlers on
     * @param {XMLHttpRequest} req The request object to wrap
     * @returns {Object} The request object
     * @private
     */
    function createRequestWrapper(req) {
        var status,
            statusText,
            responseText;
        try {
            status = req.status;
            statusText = req.statusText;
            responseText = req.responseText;
        } catch (e) {
            status = 0;
            statusText = '';
            responseText = null;
        }
        return {
            status: status,
            statusText: statusText,
            responseText: responseText,
            rawRequest: req
        };
    }

    /**
    * Returns true if the url is referencing a local file
    * @param   {string}  url The URL
    * @param   {Boolean}
    */
    function isRequestToLocalFile(url) {
        return urlUtil.parse(url).protocol === 'file:';
    }

    /**
     * Return true if the given status code looks successful
     * @param   {number}  status The http status code
     * @returns {Boolean}
     */
    function isSuccessfulStatusCode(status) {
        return status >= 200 && status < 300 || status === 304;
    }

    /**
     * Parse AJAX options
     * @param   {Object} options The options
     * @returns {Object}         The parsed options
     */
    function parseOptions(options) {
        options = util.extend(true, {}, options || {});
        options.method = options.method || 'GET';
        options.headers = options.headers || [];
        options.data = options.data || '';

        if (typeof options.data !== 'string') {
            options.data = $.param(options.data);
            if (options.method !== 'GET') {
                options.data = options.data;
                options.headers.push(['Content-Type', 'application/x-www-form-urlencoded']);
            }
        }
        return options;
    }

    /**
     * Set XHR headers
     * @param {XMLHttpRequest} req The request object
     * @param {Array} headers      Array of headers to set
     */
    function setHeaders(req, headers) {
        var i;
        for (i = 0; i < headers.length; ++i) {
            req.setRequestHeader(headers[i][0], headers[i][1]);
        }
    }

    /**
     * Make an XHR request
     * @param   {string}   url     request URL
     * @param   {string}   method  request method
     * @param   {*}        data    request data to send
     * @param   {Array}    headers request headers
     * @param   {Function} success success callback function
     * @param   {Function} fail    fail callback function
     * @returns {XMLHttpRequest}   Request object
     * @private
     */
    function doXHR(url, method, data, headers, success, fail) {
        var req = support.getXHR();
        req.open(method, url, true);
        req.onreadystatechange = function () {
            var status;
            if (req.readyState === 4) { // DONE
                // remove the onreadystatechange handler,
                // because it could be called again
                // @NOTE: we replace it with a noop function, because
                // IE8 will throw an error if the value is not of type
                // 'function' when using ActiveXObject
                req.onreadystatechange = function () {};

                try {
                    status = req.status;
                } catch (e) {
                    // NOTE: IE (9?) throws an error when the request is aborted
                    fail(req);
                    return;
                }

                // status is 0 for successful local file requests, so assume 200
                if (status === 0 && isRequestToLocalFile(url)) {
                    status = 200;
                }

                if (isSuccessfulStatusCode(status)) {
                    success(req);
                } else {
                    fail(req);
                }
            }
        };
        setHeaders(req, headers);
        req.send(data);
        return req;
    }

    /**
     * Make an XDR request
     * @param   {string}   url     request URL
     * @param   {string}   method  request method
     * @param   {*}        data    request data to send
     * @param   {Function} success success callback function
     * @param   {Function} fail    fail callback function
     * @returns {XDomainRequest} Request object
     * @private
     */
    function doXDR(url, method, data, success, fail) {
        var req = support.getXDR();
        try {
            req.open(method, url);
            req.onload = function () { success(req); };
            // NOTE: IE (8/9) requires onerror, ontimeout, and onprogress
            // to be defined when making XDR to https servers
            req.onerror = function () { fail(req); };
            req.ontimeout = function () { fail(req); };
            req.onprogress = function () {};
            req.send(data);
        } catch (e) {
            return fail({
                status: 0,
                statusText: e.message
            });
        }
        return req;
    }

    return {
        /**
         * Make a raw AJAX request
         * @param   {string}     url               request URL
         * @param   {Object}     [options]         AJAX request options
         * @param   {string}     [options.method]  request method, eg. 'GET', 'POST' (defaults to 'GET')
         * @param   {Array}      [options.headers] request headers (defaults to [])
         * @param   {*}          [options.data]    request data to send (defaults to null)
         * @param   {Function}   [options.success] success callback function
         * @param   {Function}   [options.fail]    fail callback function
         * @returns {XMLHttpRequest|XDomainRequest} Request object
         */
        request: function (url, options) {
            var opt = parseOptions(options),
                method = opt.method,
                data = opt.data,
                headers = opt.headers;

            if (method === 'GET' && data) {
                url = urlUtil.appendQueryParams(url, data);
                data = '';
            }

            /**
             * Function to call on successful AJAX request
             * @returns {void}
             * @private
             */
            function ajaxSuccess(req) {
                if (util.isFn(opt.success)) {
                    opt.success.call(createRequestWrapper(req));
                }
                return req;
            }

            /**
             * Function to call on failed AJAX request
             * @returns {void}
             * @private
             */
            function ajaxFail(req) {
                if (util.isFn(opt.fail)) {
                    opt.fail.call(createRequestWrapper(req));
                }
                return req;
            }

            // is XHR supported at all?
            if (!support.isXHRSupported()) {
                return opt.fail({
                    status: 0,
                    statusText: 'AJAX not supported'
                });
            }

            // cross-domain request? check if CORS is supported...
            if (urlUtil.isCrossDomain(url) && !support.isCORSSupported()) {
                // the browser supports XHR, but not XHR+CORS, so (try to) use XDR
                return doXDR(url, method, data, ajaxSuccess, ajaxFail);
            } else {
                // the browser supports XHR and XHR+CORS, so just do a regular XHR
                return doXHR(url, method, data, headers, ajaxSuccess, ajaxFail);
            }
        },

        /**
         * Fetch an asset, retrying if necessary
         * @param {string} url      A url for the desired asset
         * @param {number} retries  The number of times to retry if the request fails
         * @returns {$.Promise}     A promise with an additional abort() method that will abort the XHR request.
         */
        fetch: function (url, retries) {
            var req,
                aborted = false,
                ajax = this,
                $deferred = $.Deferred();

            /**
             * If there are retries remaining, make another attempt, otherwise
             * give up and reject the deferred
             * @param   {Object} error The error object
             * @returns {void}
             * @private
             */
            function retryOrFail(error) {
                if (retries > 0) {
                    // if we have retries remaining, make another request
                    retries--;
                    req = request();
                } else {
                    // finally give up
                    $deferred.reject(error);
                }
            }

            /**
             * Make an AJAX request for the asset
             * @returns {XMLHttpRequest|XDomainRequest} Request object
             * @private
             */
            function request() {
                return ajax.request(url, {
                    success: function () {
                        if (!aborted) {
                            if (this.responseText) {
                                $deferred.resolve(this.responseText);
                            } else {
                                // the response was empty, so consider this a
                                // failed request
                                retryOrFail({
                                    error: 'empty response',
                                    status: this.status,
                                    resource: url
                                });
                            }
                        }
                    },
                    fail: function () {
                        if (!aborted) {
                            retryOrFail({
                                error: this.statusText,
                                status: this.status,
                                resource: url
                            });
                        }
                    }
                });
            }

            req = request();
            return $deferred.promise({
                abort: function() {
                    aborted = true;
                    req.abort();
                }
            });
        }
    };
});

Crocodoc.addUtility('browser', function () {

    'use strict';

    var ua = navigator.userAgent,
        version,
        browser = {},
        ios = /ip(hone|od|ad)/i.test(ua),
        android = /android/i.test(ua),
        blackberry = /blackberry/i.test(ua),
        webos = /webos/i.test(ua),
        kindle = /silk|kindle/i.test(ua),
        ie = /MSIE|Trident/i.test(ua);

    if (ie) {
        browser.ie = true;
        if (/MSIE/i.test(ua)) {
            version = /MSIE\s+(\d+\.\d+)/i.exec(ua);
        } else {
            version = /Trident.*rv[ :](\d+\.\d+)/.exec(ua);
        }
        browser.version = version && parseFloat(version[1]);
        browser.ielt9 = browser.version < 9;
        browser.ielt10 = browser.version < 10;
        browser.ielt11 = browser.version < 11;
    }
    if (ios) {
        browser.ios = true;
        version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        browser.version = version && parseFloat(version[1] + '.' + version[2]);
    }
    browser.mobile = /mobile/i.test(ua) || ios || android || blackberry || webos || kindle;
    browser.firefox = /firefox/i.test(ua);
    if (/safari/i.test(ua)) {
        browser.chrome = /chrome/i.test(ua);
        browser.safari = !browser.chrome;
    }
    if (browser.safari) {
        version = (navigator.appVersion).match(/Version\/(\d+(\.\d+)?)/);
        browser.version = version && parseFloat(version[1]);
    }

    return browser;
});

/**
 * Common utility functions used throughout Crocodoc JS
 */
Crocodoc.addUtility('common', function () {

    'use strict';

    var DEFAULT_PT2PX_RATIO = 1.33333;

    var util = {};

    util.extend = $.extend;
    util.each = $.each;
    util.map = $.map;
    util.param = $.param;
    util.parseJSON = $.parseJSON;
    util.stringifyJSON = typeof window.JSON !== 'undefined' ?
        window.JSON.stringify : // IE 8+
        function () {
            throw new Error('JSON.stringify not supported');
        };

    return $.extend(util, {

        /**
         * Left bistect of list, optionally of property of objects in list
         * @param   {Array} list List of items to bisect
         * @param   {number} x    The number to bisect against
         * @param   {string} [prop] Optional property to check on list items instead of using the item itself
         * @returns {int}      The index of the bisection
         */
        bisectLeft: function (list, x, prop) {
            var val, mid, low = 0, high = list.length;
            while (low < high) {
                mid = Math.floor((low + high) / 2);
                val = prop ? list[mid][prop] : list[mid];
                if (val < x) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            return low;
        },

        /**
         * Right bistect of list, optionally of property of objects in list
         * @param   {Array} list List of items to bisect
         * @param   {number} x    The number to bisect against
         * @param   {string} [prop] Optional property to check on list items instead of using the item itself
         * @returns {int}      The index of the bisection
         */
        bisectRight: function (list, x, prop) {
            var val, mid, low = 0, high = list.length;
            while (low < high) {
                mid = Math.floor((low + high) / 2);
                val = prop ? list[mid][prop] : list[mid];
                if (x < val) {
                    high = mid;
                } else {
                    low = mid + 1;
                }
            }
            return low;
        },

        /**
         * Clamp x to range [a,b]
         * @param   {number} x The value to clamp
         * @param   {number} a Low value
         * @param   {number} b High value
         * @returns {number}   The clamped value
         */
        clamp: function (x, a, b) {
            if (x < a) {
                return a;
            } else if (x > b) {
                return b;
            }
            return x;
        },

        /**
         * Returns the sign of the given number
         * @param   {number} value The number
         * @returns {number}       The sign (-1 or 1), or 0 if value === 0
         */
        sign: function(value) {
            var number = parseInt(value, 10);
            if (!number) {
                return number;
            }
            return number < 0 ? -1 : 1;
        },

        /**
         * Returns true if the given value is a function
         * @param   {*} val Any value
         * @returns {Boolean} true if val is a function, false otherwise
         */
        isFn: function (val) {
            return typeof val === 'function';
        },

        /**
         * Search for a specified value within an array, and return its index (or -1 if not found)
         * @param   {*} value       The value to search for
         * @param   {Array} array   The array to search
         * @returns {int}           The index of value in array or -1 if not found
         */
        inArray: function (value, array) {
            if (util.isFn(array.indexOf)) {
                return array.indexOf(value);
            } else {
                return $.inArray(value, array);
            }
        },

        /**
         * Constrains the range [low,high] to the range [0,max]
         * @param   {number} low  The low value
         * @param   {number} high The high value
         * @param   {number} max  The max value (0 is implicit min)
         * @returns {Object}      The range object containing min and max values
         */
        constrainRange: function (low, high, max) {
            var length = high - low;
            low = util.clamp(low, 0, max);
            high = util.clamp(low + length, 0, max);
            if (high - low < length) {
                low = util.clamp(high - length, 0, max);
            }
            return {
                min: low,
                max: high
            };
        },

        /**
         * Return the current time since epoch in ms
         * @returns {int} The current time
         */
        now: function () {
            return (new Date()).getTime();
        },

        /**
         * Creates and returns a new, throttled version of the passed function,
         * that, when invoked repeatedly, will only actually call the original
         * function at most once per every wait milliseconds
         * @param   {int}      wait Time to wait between calls in ms
         * @param   {Function} fn   The function to throttle
         * @returns {Function}      The throttled function
         */
        throttle: function (wait, fn) {
            var context,
                args,
                timeout,
                result,
                previous = 0;

            function later () {
                previous = util.now();
                timeout = null;
                result = fn.apply(context, args);
            }

            return function throttled() {
                var now = util.now(),
                    remaining = wait - (now - previous);
                context = this;
                args = arguments;
                if (remaining <= 0) {
                    clearTimeout(timeout);
                    timeout = null;
                    previous = now;
                    result = fn.apply(context, args);
                } else if (!timeout) {
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
        },

        /**
         * Creates and returns a new debounced version of the passed function
         * which will postpone its execution until after wait milliseconds
         * have elapsed since the last time it was invoked.
         * @param   {int}      wait Time to wait between calls in ms
         * @param   {Function} fn   The function to debounced
         * @returns {Function}      The debounced function
         */
        debounce: function (wait, fn) {
            var context,
                args,
                timeout,
                timestamp,
                result;

            function later() {
                var last = util.now() - timestamp;
                if (last < wait) {
                    timeout = setTimeout(later, wait - last);
                } else {
                    timeout = null;
                    result = fn.apply(context, args);
                    context = args = null;
                }
            }

            return function debounced() {
                context = this;
                args = arguments;
                timestamp = util.now();
                if (!timeout) {
                    timeout = setTimeout(later, wait);
                }
                return result;
            };
        },

        /**
         * Insert the given CSS string into the DOM and return the resulting DOMElement
         * @param   {string} css The CSS string to insert
         * @returns {Element}    The <style> element that was created and inserted
         */
        insertCSS: function (css) {
            var styleEl = document.createElement('style'),
                cssTextNode = document.createTextNode(css);
            try {
                styleEl.setAttribute('type', 'text/css');
                styleEl.appendChild(cssTextNode);
            } catch (err) {
                // uhhh IE < 9
            }
            document.getElementsByTagName('head')[0].appendChild(styleEl);
            return styleEl;
        },

        /**
         * Append a CSS rule to the given stylesheet
         * @param   {CSSStyleSheet} sheet The stylesheet object
         * @param   {string} selector     The selector
         * @param   {string} rule         The rule
         * @returns {int}                 The index of the new rule
         */
        appendCSSRule: function (sheet, selector, rule) {
            var index;
            if (sheet.insertRule) {
                return sheet.insertRule(selector + '{' + rule + '}', sheet.cssRules.length);
            } else {
                index = sheet.addRule(selector, rule, sheet.rules.length);
                if (index < 0) {
                    index = sheet.rules.length - 1;
                }
                return index;
            }
        },

        /**
         * Delete a CSS rule at the given index from the given stylesheet
         * @param   {CSSStyleSheet} sheet The stylesheet object
         * @param   {int} index           The index of the rule to delete
         * @returns {void}
         */
        deleteCSSRule: function (sheet, index) {
            if (sheet.deleteRule) {
                sheet.deleteRule(index);
            } else {
                sheet.removeRule(index);
            }
        },

        /**
         * Get the parent element of the (first) text node that is currently selected
         * @returns {Element} The selected element
         * @TODO: return all selected elements
         */
        getSelectedNode: function () {
            var node, sel, range;
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    if (!range.collapsed) {
                        node = sel.anchorNode.parentNode;
                    }
                }
            } else if (document.selection) {
                node = document.selection.createRange().parentElement();
            }
            return node;
        },

        /**
         * Cross-browser getComputedStyle, which is faster than jQuery.css
         * @param   {HTMLElement} el      The element
         * @returns {CSSStyleDeclaration} The computed styles
         */
        getComputedStyle: function (el) {
            if ('getComputedStyle' in window) {
                return window.getComputedStyle(el);
            }
            // IE <= 8
            return el.currentStyle;
        },

        /**
         * Calculates the size of 1pt in pixels
         * @returns {number} The pixel value
         */
        calculatePtSize: function () {
            var style,
                px,
                testSize = 10000,
                div = document.createElement('div');
            div.style.display = 'block';
            div.style.position = 'absolute';
            div.style.width = testSize + 'pt';
            document.body.appendChild(div);
            style = util.getComputedStyle(div);
            if (style && style.width) {
                px = parseFloat(style.width) / testSize;
            } else {
                // @NOTE: there is a bug in Firefox where `getComputedStyle()`
                // returns null if called in a hidden (`display:none`) iframe
                // (https://bugzilla.mozilla.org/show_bug.cgi?id=548397), so we
                // fallback to a default value if this happens.
                px = DEFAULT_PT2PX_RATIO;
            }
            document.body.removeChild(div);
            return px;
        },

        /**
         * Count and return the number of occurrences of token in str
         * @param   {string} str   The string to search
         * @param   {string} token The string to search for
         * @returns {int}          The number of occurrences
         */
        countInStr: function (str, token) {
            var total = 0, i;
            while ((i = str.indexOf(token, i) + 1)) {
                total++;
            }
            return total;
        },

        /**
         * Apply the given data to a template
         * @param   {string} template  The template
         * @param   {Object} data The data to apply to the template
         * @returns {string}      The filled template
         */
        template: function (template, data) {
            var p;
            for (p in data) {
                if (data.hasOwnProperty(p)) {
                    template = template.replace(new RegExp('\\{\\{' + p + '\\}\\}', 'g'), data[p]);
                }
            }
            return template;
        }
    });
});

/*global window, document*/
Crocodoc.addUtility('subpx', function (framework) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var CSS_CLASS_SUBPX_FIX = 'crocodoc-subpx-fix',
        TEST_SPAN_TEMPLATE = '<span style="font:{{size}}px serif; color:transparent; white-space:nowrap;">' +
            (new Array(100)).join('A') + '</span>'; // repeat 'A' character;

    var util = framework.getUtility('common');

    /**
     * Return true if subpixel rendering is supported
     * @returns {Boolean}
     * @private
     */
    function isSubpixelRenderingSupported() {
        // Test if subpixel rendering is supported
        // @NOTE: jQuery.support.leadingWhitespace is apparently false if browser is IE6-8
        if (!$.support.leadingWhitespace) {
            return false;
        } else {
            //span #1 - desired font-size: 12.5px
            var span = $(util.template(TEST_SPAN_TEMPLATE, { size: 12.5 }))
                .appendTo(document.documentElement).get(0);
            var fontsize1 = $(span).css('font-size');
            var width1 = $(span).width();
            $(span).remove();

            //span #2 - desired font-size: 12.6px
            span = $(util.template(TEST_SPAN_TEMPLATE, { size: 12.6 }))
                .appendTo(document.documentElement).get(0);
            var fontsize2 = $(span).css('font-size');
            var width2 = $(span).width();
            $(span).remove();

            // is not mobile device?
            // @NOTE(plai): Mobile WebKit supports subpixel rendering even though the browser fails the following tests.
            // @NOTE(plai): When modifying these tests, make sure that these tests will work even when the browser zoom is changed.
            // @TODO(plai): Find a better way of testing for mobile Safari.
            if (!('ontouchstart' in window)) {

                //font sizes are the same? (Chrome and Safari will fail this)
                if (fontsize1 === fontsize2) {
                    return false;
                }

                //widths are the same? (Firefox on Windows without GPU will fail this)
                if (width1 === width2) {
                    return false;
                }
            }
        }

        return true;
    }

    var subpixelRenderingIsSupported = isSubpixelRenderingSupported();

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Apply the subpixel rendering fix to the given element if necessary.
         * @NOTE: Fix is only applied if the "zoom" CSS property exists
         *        (ie., this fix is never applied in Firefox)
         * @param   {Element} el The element
         * @returns {Element} The element
         */
        fix: function (el) {
            if (!subpixelRenderingIsSupported) {
                if (document.body.style.zoom !== undefined) {
                    var $wrap = $('<div>').addClass(CSS_CLASS_SUBPX_FIX);
                    $(el).children().wrapAll($wrap);
                }
            }
            return el;
        },

        /**
         * Is sub-pixel text rendering supported?
         * @param   {void}
         * @returns {boolean} true if sub-pixel tex rendering is supported
         */
        isSubpxSupported: function() {
            return subpixelRenderingIsSupported;
        }
    };
});

Crocodoc.addUtility('support', function () {

    'use strict';
    var prefixes = ['Moz', 'Webkit', 'O', 'ms'],
        xhrSupported = null,
        xhrCORSSupported = null;

    /**
     * Helper function to get the proper vendor property name
     * (`transition` => `WebkitTransition`)
     * @param {string} prop The property name to test for
     * @returns {string|boolean} The vendor-prefixed property name or false if the property is not supported
     */
    function getVendorCSSPropertyName(prop) {
        var testDiv = document.createElement('div'),
            prop_, i, vendorProp;

        // Handle unprefixed versions (FF16+, for example)
        if (prop in testDiv.style) {
            return prop;
        }

        prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

        if (prop in testDiv.style) {
            return prop;
        }

        for (i = 0; i < prefixes.length; ++i) {
            vendorProp = prefixes[i] + prop_;
            if (vendorProp in testDiv.style) {
                if (vendorProp.indexOf('ms') === 0) {
                    vendorProp = '-' + vendorProp;
                }
                return uncamel(vendorProp);
            }
        }

        return false;
    }

    /**
     * Converts a camelcase string to a dasherized string.
     * (`marginLeft` => `margin-left`)
     * @param {stirng} str The camelcase string to convert
     * @returns {string} The dasherized string
     */
    function uncamel(str) {
        return str.replace(/([A-Z])/g, function(letter) { return '-' + letter.toLowerCase(); });
    }

    // requestAnimationFrame based on:
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    var raf, caf;
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        raf = window.requestAnimationFrame;
        caf = window.cancelAnimationFrame;
        for (var x = 0; x < vendors.length && !raf; ++x) {
            raf = window[vendors[x] + 'RequestAnimationFrame'];
            caf = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!raf) {
            raf = function(callback) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
            caf = function(id) {
                clearTimeout(id);
            };
        }
    }());


    return {
        svg: document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1'),
        csstransform: getVendorCSSPropertyName('transform'),
        csstransition: getVendorCSSPropertyName('transition'),
        csszoom: getVendorCSSPropertyName('zoom'),

        /**
         * Return true if XHR is supported
         * @returns {boolean}
         */
        isXHRSupported: function () {
            if (xhrSupported === null) {
                xhrSupported = !!this.getXHR();
            }
            return xhrSupported;
        },

        /**
         * Return true if XHR is supported and is CORS-enabled
         * @returns {boolean}
         */
        isCORSSupported: function () {
            if (xhrCORSSupported === null) {
                xhrCORSSupported = this.isXHRSupported() &&
                                   ('withCredentials' in this.getXHR());
            }
            return xhrCORSSupported;
        },

        /**
         * Return true if XDR is supported
         * @returns {boolean}
         */
        isXDRSupported: function () {
            return typeof window.XDomainRequest !== 'undefined';
        },

        /**
         * Get a XHR object
         * @returns {XMLHttpRequest} An XHR object
         */
        getXHR: function () {
            if (window.XMLHttpRequest) {
                return new window.XMLHttpRequest();
            } else {
                try {
                    return new ActiveXObject('MSXML2.XMLHTTP.3.0');
                }
                catch(ex) {
                    return null;
                }
            }
        },

        /**
         * Get a CORS-enabled request object
         * @returns {XMLHttpRequest|XDomainRequest} The request object
         */
        getXDR: function () {
            if (this.isXDRSupported()) {
                return new window.XDomainRequest();
            }
            return null;
        },

        /**
         * Request an animation frame with the given arguments
         * @returns {int} The frame id
         */
        requestAnimationFrame: function () {
            return raf.apply(window, arguments);
        },

        /**
         * Cancel the animation frame with the given id
         * @returns {void}
         */
        cancelAnimationFrame: function () {
            caf.apply(window, arguments);
        }
    };
});

/**
 * URL utility
 */
Crocodoc.addUtility('url', function (framework) {

    'use strict';

    var browser = framework.getUtility('browser'),
        parsedLocation;

    return {
        /**
         * Return the current page's URL
         * @returns {string} The current URL
         */
        getCurrentURL: function () {
            return window.location.href;
        },

        /**
         * Make the given path absolute
         *  - if path doesn't contain protocol and domain, prepend the current protocol and domain
         *  - if the path is relative (eg. doesn't begin with /), also fill in the current path
         * @param   {string} path The path to make absolute
         * @returns {string}      The absolute path
         */
        makeAbsolute: function (path) {
            return this.parse(path).href;
        },

        /**
         * Returns true if the given url is external to the current domain
         * @param   {string}  url The URL
         * @returns {Boolean} Whether or not the url is external
         */
        isCrossDomain: function (url) {
            var parsedURL = this.parse(url);

            if (!parsedLocation) {
                parsedLocation = this.parse(this.getCurrentURL());
            }

            // IE7 does not properly parse relative URLs, so the hostname is empty
            if (!parsedURL.hostname) {
                return false;
            }

            return parsedURL.protocol !== parsedLocation.protocol ||
                   parsedURL.hostname !== parsedLocation.hostname ||
                   parsedURL.port !== parsedLocation.port;
        },

        /**
         * Append a query parameters string to the given URL
         * @param   {string} url The URL
         * @param   {string} str The query parameters
         * @returns {string}     The new URL
         */
        appendQueryParams: function (url, str) {
            if (url.indexOf('?') > -1) {
                return url + '&' + str;
            } else {
                return url + '?' + str;
            }
        },

        /**
         * Parse a URL into protocol, host, port, etc
         * @param   {string} url The URL to parse
         * @returns {object}     The parsed URL parts
         */
        parse: function (url) {
            var parsed = document.createElement('a'),
                pathname;

            parsed.href = url;

            // @NOTE: IE does not automatically parse relative urls,
            // but requesting href back from the <a> element will return
            // an absolute URL, which can then be fed back in to get the
            // expected result. WTF? Yep!
            if (browser.ie && url !== parsed.href) {
                url = parsed.href;
                parsed.href = url;
            }

            // @NOTE: IE does not include the preceding '/' in pathname
            pathname = parsed.pathname;
            if (!/^\//.test(pathname)) {
                pathname = '/' + pathname;
            }

            return {
                href: parsed.href,
                protocol: parsed.protocol, // includes :
                host: parsed.host, // includes port
                hostname: parsed.hostname, // does not include port
                port: parsed.port,
                pathname: pathname,
                hash: parsed.hash,  // inclues #
                search: parsed.search // incudes ?
            };
        }
    };
});

/**
 * Dragger component definition
 */
Crocodoc.addComponent('dragger', function (scope) {

    'use strict';

    var $el,
        $window = $(window),
        downScrollPosition,
        downMousePosition;

    /**
     * Handle mousemove events
     * @param   {Event} event The event object
     * @returns {void}
     */
    function handleMousemove(event) {
        $el.scrollTop(downScrollPosition.top - (event.clientY - downMousePosition.y));
        $el.scrollLeft(downScrollPosition.left - (event.clientX - downMousePosition.x));
        event.preventDefault();
    }

    /**
     * Handle mouseup events
     * @param   {Event} event The event object
     * @returns {void}
     */
    function handleMouseup(event) {
        scope.broadcast('dragend');
        $window.off('mousemove', handleMousemove);
        $window.off('mouseup', handleMouseup);
        event.preventDefault();
    }

    /**
     * Handle mousedown events
     * @param   {Event} event The event object
     * @returns {void}
     */
    function handleMousedown(event) {
        scope.broadcast('dragstart');
        downScrollPosition = {
            top: $el.scrollTop(),
            left: $el.scrollLeft()
        };
        downMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        $window.on('mousemove', handleMousemove);
        $window.on('mouseup', handleMouseup);
        event.preventDefault();
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Initialize the scroller component
         * @param   {Element} el The Element
         * @returns {void}
         */
        init: function (el) {
            $el = $(el);
            $el.on('mousedown', handleMousedown);
        },

        /**
         * Destroy the scroller component
         * @returns {void}
         */
        destroy: function () {
            $el.off('mousedown', handleMousedown);
            $el.off('mousemove', handleMousemove);
            $window.off('mouseup', handleMouseup);
        }
    };
});

/**
 * Base layout component for controlling viewer layout and viewport
 */
Crocodoc.addComponent('layout-base', function (scope) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var CSS_CLASS_LAYOUT_PREFIX = 'crocodoc-layout-',
        CSS_CLASS_CURRENT_PAGE = 'crocodoc-current-page',
        CSS_CLASS_PAGE_PREFIX = 'crocodoc-page-',
        CSS_CLASS_PAGE_VISIBLE = CSS_CLASS_PAGE_PREFIX + 'visible',
        CSS_CLASS_PAGE_AUTOSCALE = CSS_CLASS_PAGE_PREFIX + 'autoscale',
        STYLE_PADDING_PREFIX = 'padding-',
        STYLE_PADDING_TOP = STYLE_PADDING_PREFIX + 'top',
        STYLE_PADDING_RIGHT = STYLE_PADDING_PREFIX + 'right',
        STYLE_PADDING_LEFT = STYLE_PADDING_PREFIX + 'left',
        STYLE_PADDING_BOTTOM = STYLE_PADDING_PREFIX + 'bottom',
        // threshold for removing similar zoom levels (closer to 1 is more similar)
        ZOOM_LEVEL_SIMILARITY_THRESHOLD = 0.95,
        // threshold for removing similar zoom presets (e.g., auto, fit-width, etc)
        ZOOM_LEVEL_PRESETS_SIMILARITY_THRESHOLD = 0.99;

    var util = scope.getUtility('common'),
        support = scope.getUtility('support');

    /**
     * Apply a zoom transform to the layout using width/height
     * (using width/height instead)
     * @param   {float} zoom The zoom value
     * @returns {void}
     * @private
     */
    function applyZoomResize(layout, zoom) {
        // manually resize pages width/height
        var i, len, pageState, cssRule,
            state = layout.state,
            selector = '.' + layout.config.namespace + ' .' + CSS_CLASS_PAGE_AUTOSCALE,
            stylesheet = layout.config.stylesheet,
            pages = state.pages,
            scale = zoom * layout.config.pageScale,
            percent = 100 / scale;

        // apply css transform or zoom to autoscale layer (eg., text, links, user content)
        if (support.csstransform) {
            cssRule = support.csstransform + ':scale(' + scale + ');' +
                'width:' + percent + '%;' +
                'height:' + percent + '%;';
        } else if (support.csszoom) {
            cssRule = 'zoom:' + scale;
        } else {
            // should not happen...
            cssRule = '';
        }

        // remove the previous style if there is one
        if (state.previousStyleIndex) {
            util.deleteCSSRule(stylesheet, state.previousStyleIndex);
        }
        // create a new rule for the autoscale layer
        state.previousStyleIndex = util.appendCSSRule(stylesheet, selector, cssRule);

        // update width/height/padding on all pages
        for (i = 0, len = pages.length; i < len; ++i) {
            pageState = pages[i];
            layout.$pages.eq(i).css({
                width: pageState.actualWidth * zoom,
                height: pageState.actualHeight * zoom,
                paddingTop: pageState.paddingTop * zoom,
                paddingRight: pageState.paddingRight * zoom,
                paddingBottom: pageState.paddingBottom * zoom,
                paddingLeft: pageState.paddingLeft * zoom
            });
        }
    }

    /**
     * Get the maximum y1 value for pages in the current row
     * (or Infinity if there are no pages in the current row yet)
     * @param {Array} pages Array of pages to search
     * @param {Array} row   Array of page indexes (i.e., the row)
     * @returns {number} The max y1 value
     * @private
     */
    function getMaxY1InRow(pages, row) {
        if (!row || row.length === 0) {
            return Infinity;
        }
        var y1s = util.map(row, function (pageIndex) {
            return pages[pageIndex].y1;
        });
        return Math.max.apply(Math, y1s);
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        messages: [
            'resize',
            'scroll',
            'scrollend'
        ],

        /**
         * Handle framework messages
         * @param {string} name The name of the message
         * @param {Object} data The related data for the message
         * @returns {void}
         */
        onmessage: function (name, data) {
            switch (name) {
                case 'resize':
                    this.handleResize(data);
                    break;
                case 'scroll':
                    this.handleScroll(data);
                    break;
                case 'scrollend':
                    this.handleScrollEnd(data);
                    break;
                // no default
            }
        },

        /**
         * Initialize the Layout component
         * @returns {void}
         */
        init: function () {
            var config = scope.getConfig();
            this.config = config;
            // shortcut references to jq DOM objects
            this.$el = config.$el;
            this.$doc = config.$doc;
            this.$viewport = config.$viewport;
            this.$pages = config.$pages;
            this.numPages = config.numPages;

            // add the layout css class
            this.layoutClass = CSS_CLASS_LAYOUT_PREFIX + config.layout;
            this.$el.addClass(this.layoutClass);

            this.initState();
            this.updatePageStates();
            this.updateZoomLevels();
        },

        /**
         * Initalize the state object
         * @returns {void}
         */
        initState: function () {
            var viewportEl = this.$viewport[0],
                dimensionsEl = viewportEl;

            // use the documentElement for viewport dimensions
            // if we are using the window as the viewport
            if (viewportEl === window) {
                dimensionsEl = document.documentElement;
            }
            // setup initial state
            this.state = {
                pages: [],
                widestPage: {
                    index: 0,
                    actualWidth: 0
                },
                tallestPage: {
                    index: 0,
                    actualHeight: 0
                },
                sumWidths: 0,
                sumHeights: 0,
                rows: [],
                scrollTop: viewportEl.scrollTop,
                scrollLeft: viewportEl.scrollLeft,
                viewportDimensions: {
                    clientWidth: dimensionsEl.clientWidth,
                    clientHeight: dimensionsEl.clientHeight,
                    offsetWidth: dimensionsEl.offsetWidth,
                    offsetHeight: dimensionsEl.offsetHeight
                },
                zoomState: {
                    zoom: 1,
                    prevZoom: 0,
                    zoomMode: null
                },
                currentPage: null,
                visiblePages: [],
                fullyVisiblePages: [],
                initialWidth: 0,
                initialHeight: 0
            };
            this.zoomLevels = [];
        },

        /**
         * Destroy the Layout component
         * @returns {void}
         */
        destroy: function () {
            this.$doc.removeAttr('style');
            this.$pages.css('padding', '');
            this.$el.removeClass(this.layoutClass);
        },

        /**
         * Set the zoom level for the layout
         * @param {float|string} val The zoom level (float or one of the zoom constants)
         */
        setZoom: function (val) {
            var state = this.state,
                zoom = this.parseZoomValue(val),
                zoomState = state.zoomState,
                currentZoom = zoomState.zoom,
                zoomMode,
                shouldNotCenter;

            // update the zoom mode if we landed on a named mode
            zoomMode = this.calculateZoomMode(val, zoom);

            //respect zoom constraints
            zoom = util.clamp(zoom, state.minZoom, state.maxZoom);

            scope.broadcast('beforezoom', util.extend({
                page: state.currentPage,
                visiblePages: util.extend([], state.visiblePages),
                fullyVisiblePages: util.extend([], state.fullyVisiblePages)
            }, zoomState));

            // update the zoom state
            zoomState.prevZoom = currentZoom;
            zoomState.zoom = zoom;
            zoomState.zoomMode = zoomMode;

            // apply the zoom to the actual DOM element(s)
            this.applyZoom(zoom);

            // can the document be zoomed in/out further?
            zoomState.canZoomIn = this.calculateNextZoomLevel(Crocodoc.ZOOM_IN) !== false;
            zoomState.canZoomOut = this.calculateNextZoomLevel(Crocodoc.ZOOM_OUT) !== false;

            // update page states, because they will have changed after zooming
            this.updatePageStates();

            // layout mode specific stuff
            this.updateLayout();

            // update scroll position for the new zoom
            // @NOTE: updateScrollPosition() must be called AFTER updateLayout(),
            // because the scrollable space may change in updateLayout
            // @NOTE: shouldNotCenter is true when using a named zoom level
            // so that resizing the browser zooms to the current page offset
            // rather than to the center like when zooming in/out
            shouldNotCenter = val === Crocodoc.ZOOM_AUTO ||
                              val === Crocodoc.ZOOM_FIT_WIDTH ||
                              val === Crocodoc.ZOOM_FIT_HEIGHT;
            this.updateScrollPosition(shouldNotCenter);

            // update again, because updateLayout could have changed page positions
            this.updatePageStates();

            // make sure the visible pages are accurate (also update css classes)
            this.updateVisiblePages(true);

            // broadcast zoom event with new zoom state
            scope.broadcast('zoom', util.extend({
                page: state.currentPage,
                visiblePages: util.extend([], state.visiblePages),
                fullyVisiblePages: util.extend([], state.fullyVisiblePages),
                isDraggable: this.isDraggable()
            }, zoomState));
        },

        /**
         * Returns true if the layout is currently draggable
         * (in this case that means that the viewport is scrollable)
         * @returns {Boolean} Whether this layout is draggable
         */
        isDraggable: function () {
            var state = this.state;
            return (state.viewportDimensions.clientHeight < state.totalHeight) ||
                   (state.viewportDimensions.clientWidth < state.totalWidth);
        },

        /**
         * Parse the given zoom value into a number to zoom to.
         * @param   {float|string} val The zoom level (float or one of the zoom constants)
         * @returns {float} The parsed zoom level
         */
        parseZoomValue: function (val) {
            var zoomVal = parseFloat(val),
                state = this.state,
                zoomState = state.zoomState,
                currentZoom = zoomState.zoom,
                nextZoom = currentZoom;

            // number
            if (zoomVal) {
                nextZoom = zoomVal;
            } else {
                switch (val) {
                    case Crocodoc.ZOOM_FIT_WIDTH:
                        // falls through
                    case Crocodoc.ZOOM_FIT_HEIGHT:
                        // falls through
                    case Crocodoc.ZOOM_AUTO:
                        nextZoom = this.calculateZoomValue(val);
                        break;

                    case Crocodoc.ZOOM_IN:
                        // falls through
                    case Crocodoc.ZOOM_OUT:
                        nextZoom = this.calculateNextZoomLevel(val) || currentZoom;
                        break;

                    // bad mode or no value
                    default:
                        // if there hasn't been a zoom set yet
                        if (!currentZoom) {
                            //use default zoom
                            nextZoom = this.calculateZoomValue(this.config.zoom || Crocodoc.ZOOM_AUTO);
                        }
                        else if (zoomState.zoomMode) {
                            //adjust zoom
                            nextZoom = this.calculateZoomValue(zoomState.zoomMode);
                        } else {
                            nextZoom = currentZoom;
                        }
                        break;
                }
            }

            return nextZoom;
        },

        /**
         * Calculates the new zoomMode given the input val and the parsed zoom value
         * @param   {float|string} val  The input zoom value
         * @param   {float} parsedZoom  The parsed zoom value
         * @returns {string|null}       The new zoom move
         */
        calculateZoomMode: function (val, parsedZoom) {
            // check if we landed on a named mode
            switch (parsedZoom) {
                case this.calculateZoomValue(Crocodoc.ZOOM_AUTO):
                    // if the value passed is a named zoom mode, use that, because
                    // fitheight and fitwidth can sometimes clash with auto (else use auto)
                    if (typeof val === 'string' &&
                        (val === Crocodoc.ZOOM_FIT_WIDTH || val === Crocodoc.ZOOM_FIT_HEIGHT))
                    {
                        return val;
                    }
                    return Crocodoc.ZOOM_AUTO;
                case this.calculateZoomValue(Crocodoc.ZOOM_FIT_WIDTH):
                    return Crocodoc.ZOOM_FIT_WIDTH;
                case this.calculateZoomValue(Crocodoc.ZOOM_FIT_HEIGHT):
                    return Crocodoc.ZOOM_FIT_HEIGHT;
                default:
                    return null;
            }
        },

        /**
         * Update zoom levels and the min and max zoom
         * @returns {void}
         */
        updateZoomLevels: function () {
            var i, lastZoomLevel,
                zoomLevels = this.config.zoomLevels.slice() || [1],
                auto = this.calculateZoomValue(Crocodoc.ZOOM_AUTO),
                fitWidth = this.calculateZoomValue(Crocodoc.ZOOM_FIT_WIDTH),
                fitHeight = this.calculateZoomValue(Crocodoc.ZOOM_FIT_HEIGHT),
                presets = [fitWidth, fitHeight];

            // update min and max zoom before adding presets into the mix
            // because presets should not be able to override min/max zoom
            this.state.minZoom = this.config.minZoom || zoomLevels[0];
            this.state.maxZoom = this.config.maxZoom || zoomLevels[zoomLevels.length - 1];

            // if auto is not the same as fitWidth or fitHeight,
            // add it as a possible next zoom
            if (auto !== fitWidth && auto !== fitHeight) {
                presets.push(auto);
            }

            // add auto-zoom levels and sort
            zoomLevels = zoomLevels.concat(presets);
            zoomLevels.sort(function sortZoomLevels(a, b){
                return a - b;
            });

            this.zoomLevels = [];

            /**
             * Return true if we should use this zoom level
             * @param   {number} zoomLevel The zoom level to consider
             * @returns {boolean}          True if we should keep this level
             * @private
             */
            function shouldUseZoomLevel(zoomLevel) {
                var similarity = lastZoomLevel / zoomLevel;
                // remove duplicates
                if (zoomLevel === lastZoomLevel) {
                    return false;
                }
                // keep anything that is within the similarity threshold
                if (similarity < ZOOM_LEVEL_SIMILARITY_THRESHOLD) {
                    return true;
                }
                // check if it's a preset
                if (util.inArray(zoomLevel, presets) > -1) {
                    // keep presets if they are within a higher threshold
                    if (similarity < ZOOM_LEVEL_PRESETS_SIMILARITY_THRESHOLD) {
                        return true;
                    }
                }
                return false;
            }

            // remove duplicates from sorted list, and remove unnecessary levels
            // @NOTE: some zoom levels end up being very close to the built-in
            // presets (fit-width/fit-height/auto), which makes zooming previous
            // or next level kind of annoying when the zoom level barely changes.
            // This fixes that by applying a threshold to the zoom levels to
            // each preset, and removing the non-preset version if the
            // ratio is below the threshold.
            lastZoomLevel = 0;
            for (i = 0; i < zoomLevels.length; ++i) {
                if (shouldUseZoomLevel(zoomLevels[i])) {
                    lastZoomLevel = zoomLevels[i];
                    this.zoomLevels.push(lastZoomLevel);
                }
            }
        },

        /**
         * Calculate the next zoom level for zooming in or out
         * @param   {string} direction Can be either Crocodoc.ZOOM_IN or Crocodoc.ZOOM_OUT
         * @returns {number|boolean} The next zoom level or false if the viewer cannot be
         *                               zoomed in the given direction
         */
        calculateNextZoomLevel: function (direction) {
            var i,
                zoom = false,
                currentZoom = this.state.zoomState.zoom,
                zoomLevels = this.zoomLevels;

            if (direction === Crocodoc.ZOOM_IN) {
                for (i = 0; i < zoomLevels.length; ++i) {
                    if (zoomLevels[i] > currentZoom) {
                        zoom = zoomLevels[i];
                        break;
                    }
                }
            } else if (direction === Crocodoc.ZOOM_OUT) {
                for (i = zoomLevels.length - 1; i >= 0; --i) {
                    if (zoomLevels[i] < currentZoom) {
                        zoom = zoomLevels[i];
                        break;
                    }
                }
            }

            return zoom;
        },

        /**
         * Calculate the numeric value for a given zoom mode (or return the value if it's already numeric)
         * @param   {string} mode The mode to zoom to
         * @returns {float}       The zoom value
         */
        calculateZoomValue: function (mode) {
            var state = this.state,
                val = parseFloat(mode);
            if (val) {
                return val;
            }
            if (mode === Crocodoc.ZOOM_FIT_WIDTH) {
                return state.viewportDimensions.clientWidth / state.widestPage.totalActualWidth;
            }
            else if (mode === Crocodoc.ZOOM_FIT_HEIGHT) {
                return state.viewportDimensions.clientHeight / state.tallestPage.totalActualHeight;
            }
            else if (mode === Crocodoc.ZOOM_AUTO) {
                return this.calculateZoomAutoValue();
            } else {
                return state.zoomState.zoom;
            }
        },

        /**
         * Apply the given zoom to the pages
         * @param   {float} zoom The zoom value
         * @returns {void}
         */
        applyZoom: function (zoom) {
            applyZoomResize(this, zoom);
        },

        /**
         * Scroll to the given value (page number or one of the scroll constants)
         * @param   {int|string} val  The value to scroll to
         * @returns {void}
         */
        scrollTo: function (val) {
            var state = this.state,
                pageNum = parseInt(val, 10);
            if (typeof val === 'string') {
                if (val === Crocodoc.SCROLL_PREVIOUS && state.currentPage > 1) {
                    pageNum = this.calculatePreviousPage();
                }
                else if (val === Crocodoc.SCROLL_NEXT && state.currentPage < this.numPages) {
                    pageNum = this.calculateNextPage();
                }
                else if (!pageNum) {
                    return;
                }
            }
            else if (!pageNum && pageNum !== 0) {
                // pageNum is not a number
                return;
            }
            pageNum = util.clamp(pageNum, 1, this.numPages);
            this.scrollToPage(pageNum);
        },

        /**
         * Scrolls by the given pixel amount from the current location
         * @param  {int} left Left offset to scroll to
         * @param  {int} top  Top offset to scroll to
         * @returns {void}
         */
        scrollBy: function (left, top) {
            left = parseInt(left, 10) || 0;
            top = parseInt(top, 10) || 0;
            this.scrollToOffset(left + this.state.scrollLeft, top + this.state.scrollTop);
        },

        /**
         * Scroll to the given page number
         * @param   {int} page The page number to scroll to
         * @returns {void}
         */
        scrollToPage: function (page) {
            var offset = this.calculateScrollPositionForPage(page);
            this.scrollToOffset(offset.left, offset.top);
        },

        /**
         * Calculate which page is currently the "focused" page.
         * By default, it's just the state's current page.
         * @NOTE: this method will be overridden in most layouts.
         * @returns {int} The current page
         */
        calculateCurrentPage: function () {
            return this.state.currentPage;
        },

        /**
         * Given a page number, return an object with top and left properties
         * of the scroll position for that page
         * @param   {int} pageNum The page number
         * @returns {Object}      The scroll position object
         */
        calculateScrollPositionForPage: function (pageNum) {
            var index = util.clamp(pageNum - 1, 0, this.numPages - 1),
                page = this.state.pages[index];
            return { top: page.y0, left: page.x0 };
        },

        /**
         * Calculates the current range of pages that are visible
         * @returns {Object} Range object with min and max values
         */
        calculateVisibleRange: function () {
            var state = this.state,
                viewportY0 = state.scrollTop,
                viewportY1 = viewportY0 + state.viewportDimensions.clientHeight,
                viewportX0 = state.scrollLeft,
                viewportX1 = viewportX0 + state.viewportDimensions.clientWidth,
                lowY = util.bisectLeft(state.pages, viewportY0, 'y1'),
                highY = util.bisectRight(state.pages, viewportY1, 'y0') - 1,
                lowX = util.bisectLeft(state.pages, viewportX0, 'x1'),
                highX = util.bisectRight(state.pages, viewportX1, 'x0') - 1,
                low = Math.max(lowX, lowY),
                high = Math.min(highX, highY);
            return util.constrainRange(low, high, this.numPages - 1);
        },

        /**
         * Calculates the current range of pages that are fully visible
         * @returns {Object} Range object with min and max values
         */
        calculateFullyVisibleRange: function () {
            var state = this.state,
                viewportY0 = state.scrollTop,
                viewportY1 = viewportY0 + state.viewportDimensions.clientHeight,
                viewportX0 = state.scrollLeft,
                viewportX1 = viewportX0 + state.viewportDimensions.clientWidth,
                lowY = util.bisectLeft(state.pages, viewportY0, 'y0'),
                highY = util.bisectRight(state.pages, viewportY1, 'y1') - 1,
                lowX = util.bisectLeft(state.pages, viewportX0, 'x0'),
                highX = util.bisectRight(state.pages, viewportX1, 'x1') - 1,
                low = Math.max(lowX, lowY),
                high = Math.min(highX, highY);
            return util.constrainRange(low, high, this.numPages - 1);
        },

        /**
         * Scroll to the given left and top offset
         * @param   {int} left The left offset
         * @param   {int} top  The top offset
         * @returns {void}
         */
        scrollToOffset: function (left, top) {
            this.$viewport.scrollLeft(left);
            this.$viewport.scrollTop(top);
        },

        /**
         * Set the current page, update the visible pages, and broadcast a
         * pagefocus  message if the given page is not already the current page
         * @param {int} page The page number
         */
        setCurrentPage: function (page) {
            var state = this.state;
            if (state.currentPage !== page) {
                // page has changed
                state.currentPage = page;
                this.updateVisiblePages();
                scope.broadcast('pagefocus', {
                    page: state.currentPage,
                    numPages: this.numPages,
                    visiblePages: util.extend([], state.visiblePages),
                    fullyVisiblePages: util.extend([], state.fullyVisiblePages)
                });
            } else {
                // still update visible pages!
                this.updateVisiblePages();
            }
        },

        /**
         * Calculate and update which pages are visible,
         * possibly updating CSS classes on the pages
         * @param {boolean} updateClasses Wheter to update page CSS classes as well
         * @returns {void}
         */
        updateVisiblePages: function (updateClasses) {
            var i, len, $page,
                state = this.state,
                visibleRange = this.calculateVisibleRange(),
                fullyVisibleRange = this.calculateFullyVisibleRange();
            state.visiblePages.length = 0;
            state.fullyVisiblePages.length = 0;
            for (i = 0, len = this.$pages.length; i < len; ++i) {
                $page = this.$pages.eq(i);
                if (i < visibleRange.min || i > visibleRange.max) {
                    if (updateClasses && $page.hasClass(CSS_CLASS_PAGE_VISIBLE)) {
                        $page.removeClass(CSS_CLASS_PAGE_VISIBLE);
                    }
                } else {
                    if (updateClasses && !$page.hasClass(CSS_CLASS_PAGE_VISIBLE)) {
                        $page.addClass(CSS_CLASS_PAGE_VISIBLE);
                    }
                    state.visiblePages.push(i + 1);
                }
                if (i >= fullyVisibleRange.min && i <= fullyVisibleRange.max) {
                    state.fullyVisiblePages.push(i + 1);
                }
            }
        },

        /**
         * Update page positions, sizes, and rows
         * @param {boolean} [forceUpdatePaddings] If true, force update page paddings
         * @returns {void}
         */
        updatePageStates: function (forceUpdatePaddings) {
            var state = this.state,
                pages = state.pages,
                rows = state.rows,
                scrollTop = this.$viewport.scrollTop(),
                scrollLeft = this.$viewport.scrollLeft(),
                rowIndex = 0,
                lastY1 = 0,
                rightmostPageIndex = 0,
                bottommostPageIndex = 0,
                i,
                len,
                page,
                pageEl,
                $pageEl;

            rows.length = state.sumWidths = state.sumHeights = state.totalWidth = state.totalHeight = 0;
            state.widestPage.totalActualWidth = state.tallestPage.totalActualHeight = 0;

            // update the x/y positions and sizes of each page
            // this is basically used as a cache, since accessing the DOM is slow
            for (i = 0, len = this.$pages.length; i < len; ++i) {
                $pageEl = this.$pages.eq(i);
                pageEl = $pageEl[0];
                page = pages[i];
                if (!page || forceUpdatePaddings) {
                    $pageEl.css('padding', '');
                    page = {
                        index: i,
                        // only get paddings on the first updatePageStates
                        // @TODO: look into using numeric versions of these styles in IE for better perf
                        paddingLeft: parseFloat($pageEl.css(STYLE_PADDING_LEFT)),
                        paddingRight: parseFloat($pageEl.css(STYLE_PADDING_RIGHT)),
                        paddingTop: parseFloat($pageEl.css(STYLE_PADDING_TOP)),
                        paddingBottom: parseFloat($pageEl.css(STYLE_PADDING_BOTTOM))
                    };
                }

                if (!page.actualWidth) {
                    page.actualWidth = parseFloat(pageEl.getAttribute('data-width'));
                }
                if (!page.actualHeight) {
                    page.actualHeight = parseFloat(pageEl.getAttribute('data-height'));
                }

                page.totalActualWidth = page.actualWidth + page.paddingLeft + page.paddingRight;
                page.totalActualHeight = page.actualHeight + page.paddingTop + page.paddingBottom;

                page.width = pageEl.offsetWidth;
                page.height = pageEl.offsetHeight;
                page.x0 = pageEl.offsetLeft;
                page.y0 = pageEl.offsetTop;

                page.x1 = page.width + page.x0;
                page.y1 = page.height + page.y0;

                // it is in the same rowIndex as the prev if y0 >= prev rowIndex max y1
                // @NOTE: we add two pixels to y0, because sometimes there
                // seems to be a little overlap #youcantexplainthat
                // @TODO: #explainthat
                if (lastY1 && getMaxY1InRow(pages, rows[rowIndex]) <= page.y0 + 2) {
                    rowIndex++;
                }
                lastY1 = page.y1;
                if (!rows[rowIndex]) {
                    rows[rowIndex] = [];
                }
                // all pages are not created equal
                if (page.totalActualWidth > state.widestPage.totalActualWidth) {
                    state.widestPage = page;
                }
                if (page.totalActualHeight > state.tallestPage.totalActualHeight) {
                    state.tallestPage = page;
                }
                state.sumWidths += page.width;
                state.sumHeights += page.height;
                page.rowIndex = rowIndex;
                pages[i] = page;
                rows[rowIndex].push(i);

                if (pages[rightmostPageIndex].x0 + pages[rightmostPageIndex].width < page.x0 + page.width) {
                    rightmostPageIndex = i;
                }
                if (pages[bottommostPageIndex].y0 + pages[bottommostPageIndex].height < page.y0 + page.height) {
                    bottommostPageIndex = i;
                }
            }

            state.totalWidth = pages[rightmostPageIndex].x0 + pages[rightmostPageIndex].width;
            state.totalHeight = pages[bottommostPageIndex].y0 + pages[bottommostPageIndex].height;
            state.scrollTop = scrollTop;
            state.scrollLeft = scrollLeft;
            this.setCurrentPage(this.calculateCurrentPage());
        },

        /**
         * Calculate and update the current page
         * @returns {void}
         */
        updateCurrentPage: function () {
            var currentPage = this.calculateCurrentPage();
            this.setCurrentPage(currentPage);
        },

        /**
         * Handle resize messages
         * @param   {Object} data Object containing width and height of the viewport
         * @returns {void}
         */
        handleResize: function (data) {
            var zoomMode = this.state.zoomState.zoomMode;
            this.state.viewportDimensions = data;
            this.updateZoomLevels();
            this.setZoom(zoomMode);
        },

        /**
         * Handle scroll messages
         * @param   {Object} data Object containing scrollTop and scrollLeft of the viewport
         * @returns {void}
         */
        handleScroll: function (data) {
            this.state.scrollTop = data.scrollTop;
            this.state.scrollLeft = data.scrollLeft;
        },

        /**
         * Handle scrollend messages (forwarded to handleScroll)
         * @param   {Object} data Object containing scrollTop and scrollLeft of the viewport
         * @returns {void}
         */
        handleScrollEnd: function (data) {
            // update CSS classes
            this.$doc.find('.' + CSS_CLASS_CURRENT_PAGE).removeClass(CSS_CLASS_CURRENT_PAGE);
            this.$pages.eq(this.state.currentPage - 1).addClass(CSS_CLASS_CURRENT_PAGE);
            this.updateVisiblePages(true);
            this.handleScroll(data);
        },

        /**
         * Update the scroll position after a zoom
         * @param {bool} shouldNotCenter Whether or not the scroll position
         *                               should be updated to center the new
         *                               zoom level
         * @returns {void}
         */
        updateScrollPosition: function (shouldNotCenter) {
            var state = this.state,
                zoomState = state.zoomState,
                ratio = zoomState.zoom / zoomState.prevZoom,
                newScrollLeft, newScrollTop;

            // update scroll position
            newScrollLeft = state.scrollLeft * ratio;
            newScrollTop = state.scrollTop * ratio;

            // zoom to center
            if (shouldNotCenter !== true) {
                newScrollTop += state.viewportDimensions.offsetHeight * (ratio - 1) / 2;
                newScrollLeft += state.viewportDimensions.offsetWidth * (ratio - 1) / 2;
            }

            // scroll!
            this.scrollToOffset(newScrollLeft, newScrollTop);
        },

        /**
         * Focuses the viewport so it can be natively scrolled with the keyboard
         * @returns {void}
         */
        focus: function () {
            this.$viewport.focus();
        },

        /** MUST BE IMPLEMENTED IN LAYOUT **/
        updateLayout: function () {},
        calculateZoomAutoValue: function () { return 1; },
        calculateNextPage: function () { return 1; },
        calculatePreviousPage: function () { return 1; },

        /**
         * Shortcut method to extend this layout
         * @param   {Object} layout The layout mixins
         * @returns {Object}        The extended layout
         */
        extend: function (layout) {
            return util.extend({}, this, layout);
        }
    };
});

/**
 * The horizontal layout
 */
Crocodoc.addComponent('layout-' + Crocodoc.LAYOUT_HORIZONTAL, ['layout-base'], function (scope, base) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var util = scope.getUtility('common'),
        browser = scope.getUtility('browser');

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return base.extend({

        /**
         * Calculate the numeric value for zoom 'auto' for this layout mode
         * @returns {float} The zoom value
         */
        calculateZoomAutoValue: function () {
            var state = this.state,
                fitWidth = this.calculateZoomValue(Crocodoc.ZOOM_FIT_WIDTH),
                fitHeight = this.calculateZoomValue(Crocodoc.ZOOM_FIT_HEIGHT);

            // landscape
            if (state.widestPage.actualWidth > state.tallestPage.actualHeight) {
                return Math.min(fitWidth, fitHeight);
            }
            // portrait
            else {
                if (browser.mobile) {
                    return fitHeight;
                }
                // limit max zoom to 1.0
                return Math.min(1, fitHeight);
            }
        },

        /**
         * Calculate which page is currently the "focused" page.
         * In horizontal mode, this is the page farthest to the left,
         * where at least half of the page is showing.
         * @returns {int} The current page
         */
        calculateCurrentPage: function () {
            var prev, page,
                state = this.state,
                pages = state.pages;

            prev = util.bisectRight(pages, state.scrollLeft, 'x0') - 1;
            page = util.bisectRight(pages, state.scrollLeft + pages[prev].width / 2, 'x0') - 1;
            return 1 + page;
        },

        /**
         * Calculates the next page
         * @returns {int} The next page number
         */
        calculateNextPage: function () {
            return this.state.currentPage + 1;
        },

        /**
         * Calculates the previous page
         * @returns {int} The previous page number
         */
        calculatePreviousPage: function () {
            return this.state.currentPage - 1;
        },

        /**
         * Handle resize mesages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handleResize: function (data) {
            base.handleResize.call(this, data);
            this.updateCurrentPage();
        },

        /**
         * Handle scroll mesages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handleScroll: function (data) {
            base.handleScroll.call(this, data);
            this.updateCurrentPage();
        },

        /**
         * Updates the layout elements (pages, doc, etc) CSS
         * appropriately for the current zoom level
         * @returns {void}
         */
        updateLayout: function () {
            var state = this.state,
                zoomState = state.zoomState,
                zoom = zoomState.zoom,
                zoomedWidth = state.sumWidths,
                zoomedHeight = Math.floor(state.tallestPage.totalActualHeight * zoom),
                docWidth = Math.max(zoomedWidth, state.viewportDimensions.clientWidth),
                docHeight = Math.max(zoomedHeight, state.viewportDimensions.clientHeight);

            this.$doc.css({
                height: docHeight,
                lineHeight: docHeight + 'px',
                width: docWidth
            });
        }
    });
});


/**
 * The presentation-two-page layout
 */
Crocodoc.addComponent('layout-' + Crocodoc.LAYOUT_PRESENTATION_TWO_PAGE, ['layout-' + Crocodoc.LAYOUT_PRESENTATION], function (scope, presentation) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var util = scope.getUtility('common');

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return presentation.extend({
        /**
         * Initialize the presentation-two-page layout component
         * @returns {void}
         */
        init: function () {
            this.twoPageMode = true;
            presentation.init.call(this);
        },

        /**
         * Calculates the next page
         * @returns {int} The next page number
         */
        calculateNextPage: function () {
            return this.state.currentPage + 2;
        },

        /**
         * Calculates the previous page
         * @returns {int} The previous page number
         */
        calculatePreviousPage: function () {
            return this.state.currentPage - 2;
        },

        /**
         * Calculate the numeric value for a given zoom mode (or return the value if it's already numeric)
         * @param   {string} mode The mode to zoom to
         * @returns {float}       The zoom value
         */
        calculateZoomValue: function (mode) {
            var baseVal = presentation.calculateZoomValue.call(this, mode);
            if (mode === Crocodoc.ZOOM_FIT_WIDTH) {
                baseVal /= 2;
            }
            return baseVal;
        },

        /**
         * Scroll to the given page number
         * @param   {int} page The page number to scroll to
         * @returns {void}
         */
        scrollToPage: function (page) {
            // pick the left page
            presentation.scrollToPage.call(this, page - (page + 1) % 2);
        },

        /**
         * Calculates the current range of pages that are visible
         * @returns {Object} Range object with min and max values
         */
        calculateVisibleRange: function () {
            var min = this.state.currentPage - 1,
                max = min + 1;
            return util.constrainRange(min, max, this.numPages);
        },

        /**
         * Calculates the current range of pages that are fully visible
         * @NOTE: this can be incorrect for presentations that are zoomed in
         * past the size of the viewport... I'll fix it if it becomes an issue
         * @returns {Object} Range object with min and max values
         */
        calculateFullyVisibleRange: function () {
            return this.calculateVisibleRange();
        }
    });
});

/**
 *The presentation layout
 */
Crocodoc.addComponent('layout-' + Crocodoc.LAYOUT_PRESENTATION, ['layout-base'], function (scope, base) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var CSS_CLASS_PAGE_PREFIX = 'crocodoc-page-',
        CSS_CLASS_PAGE_PREV = CSS_CLASS_PAGE_PREFIX + 'prev',
        CSS_CLASS_PAGE_NEXT = CSS_CLASS_PAGE_PREFIX + 'next',
        CSS_CLASS_PAGE_BEFORE = CSS_CLASS_PAGE_PREFIX + 'before',
        CSS_CLASS_PAGE_AFTER = CSS_CLASS_PAGE_PREFIX + 'after',
        CSS_CLASS_PAGE_BEFORE_BUFFER = CSS_CLASS_PAGE_PREFIX + 'before-buffer',
        CSS_CLASS_PAGE_AFTER_BUFFER = CSS_CLASS_PAGE_PREFIX + 'after-buffer',
        CSS_CLASS_CURRENT_PAGE = 'crocodoc-current-page',
        CSS_CLASS_PRECEDING_PAGE = 'crocodoc-preceding-page',
        PRESENTATION_CSS_CLASSES = [
            CSS_CLASS_PAGE_NEXT,
            CSS_CLASS_PAGE_AFTER,
            CSS_CLASS_PAGE_PREV,
            CSS_CLASS_PAGE_BEFORE,
            CSS_CLASS_PAGE_BEFORE_BUFFER,
            CSS_CLASS_PAGE_AFTER_BUFFER
        ].join(' ');

    var util = scope.getUtility('common');

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return base.extend({
        /**
         * Initialize the presentation layout component
         * @returns {void}
         */
        init: function () {
            base.init.call(this);
            this.updatePageMargins();
            this.updatePageClasses();
        },

        /**
         * Destroy the component
         * @returns {void}
         */
        destroy: function () {
            base.destroy.call(this);
            this.$pages.css({ margin: '', left: '' }).removeClass(PRESENTATION_CSS_CLASSES);
        },

        /**
         * Calculate the numeric value for zoom 'auto' for this layout mode
         * @returns {float} The zoom value
         */
        calculateZoomAutoValue: function () {
            var fitWidth = this.calculateZoomValue(Crocodoc.ZOOM_FIT_WIDTH),
                fitHeight = this.calculateZoomValue(Crocodoc.ZOOM_FIT_HEIGHT);
            return Math.min(fitWidth, fitHeight);
        },

        /**
         * Calculate which page is currently the "focused" page.
         * In presentation mode, it's just the state's current page.
         * @returns {int} The current page
         */
        calculateCurrentPage: function () {
            return this.state.currentPage;
        },

        /**
         * Calculates the next page
         * @returns {int} The next page number
         */
        calculateNextPage: function () {
            return this.state.currentPage + 1;
        },

        /**
         * Calculates the previous page
         * @returns {int} The previous page number
         */
        calculatePreviousPage: function () {
            return this.state.currentPage - 1;
        },

        /**
         * Calculates the current range of pages that are visible
         * @returns {Object} Range object with min and max values
         */
        calculateVisibleRange: function () {
            var index = this.state.currentPage - 1;
            return util.constrainRange(index, index, this.numPages);
        },

        /**
         * Calculates the current range of pages that are fully visible
         * @NOTE: this can be incorrect for presentations that are zoomed in
         * past the size of the viewport... I'll fix it if it becomes an issue
         * @returns {Object} Range object with min and max values
         */
        calculateFullyVisibleRange: function () {
            return this.calculateVisibleRange();
        },

        /**
         * Set the current page and updatePageClasses
         * @param {int} page The page number
         */
        setCurrentPage: function (page) {
            var index = util.clamp(page - 1, 0, this.numPages),
                $precedingPage,
                $currentPage;

            base.setCurrentPage.call(this, page);

            // update CSS classes
            this.$doc.find('.' + CSS_CLASS_PRECEDING_PAGE)
                .removeClass(CSS_CLASS_PRECEDING_PAGE);

            $precedingPage = this.$doc.find('.' + CSS_CLASS_CURRENT_PAGE);
            $currentPage = this.$pages.eq(index);

            if ($precedingPage[0] !== $currentPage[0]) {
                $precedingPage
                    .addClass(CSS_CLASS_PRECEDING_PAGE)
                    .removeClass(CSS_CLASS_CURRENT_PAGE);
                $currentPage.addClass(CSS_CLASS_CURRENT_PAGE);
            }

            this.updateVisiblePages(true);
            this.updatePageClasses(index);
        },

        /**
         * Scroll to the given page number
         * @param   {int} page The page number to scroll to
         * @returns {void}
         */
        scrollToPage: function (page) {
            this.setCurrentPage(page);
        },

        /**
         * Updates the layout elements (pages, doc, etc) CSS
         * appropriately for the current zoom level
         * @returns {void}
         */
        updateLayout: function () {
            var state = this.state,
                zoomState = state.zoomState,
                zoom = zoomState.zoom,
                page = this.currentPage || 1,
                currentPage = state.pages[page - 1],
                secondPage = this.twoPageMode ? state.pages[page] : currentPage,
                viewportWidth = state.viewportDimensions.clientWidth,
                viewportHeight = state.viewportDimensions.clientHeight,
                secondPageWidth,
                currentPageWidth,
                currentPageHeight,
                zoomedWidth, zoomedHeight,
                docWidth, docHeight;

            secondPageWidth = secondPage.actualWidth;
            currentPageWidth = currentPage.actualWidth + (this.twoPageMode ? secondPageWidth : 0);
            currentPageHeight = currentPage.actualHeight;

            zoomedWidth = Math.floor((currentPageWidth + currentPage.paddingLeft + secondPage.paddingRight) * zoom);
            zoomedHeight = Math.floor((currentPage.totalActualHeight) * zoom);

            docWidth = Math.max(zoomedWidth, viewportWidth);
            docHeight = Math.max(zoomedHeight, viewportHeight);

            this.$doc.css({
                width: docWidth,
                height: docHeight
            });

            this.updatePageMargins();

            if (docWidth > viewportWidth || docHeight > viewportHeight) {
                this.$el.addClass('crocodoc-scrollable');
            } else {
                this.$el.removeClass('crocodoc-scrollable');
            }
        },

        /**
         * Update page margins for the viewport size and zoom level
         * @returns {void}
         */
        updatePageMargins: function () {
            var i, len, page, $page,
                width, height, left, top, paddingH,
                state = this.state,
                viewportWidth = state.viewportDimensions.clientWidth,
                viewportHeight = state.viewportDimensions.clientHeight;
            // update pages so they are centered (preserving margins)
            for (i = 0, len = this.$pages.length; i < len; ++i) {
                $page = this.$pages.eq(i);
                page = state.pages[i];

                if (this.twoPageMode) {
                    paddingH = (i % 2 === 1) ? page.paddingRight : page.paddingLeft;
                } else {
                    paddingH = page.paddingRight + page.paddingLeft;
                }
                width = (page.actualWidth + paddingH) * state.zoomState.zoom;
                height = (page.actualHeight + page.paddingTop + page.paddingBottom) * state.zoomState.zoom;

                if (this.twoPageMode) {
                    left = Math.max(0, (viewportWidth - width * 2) / 2);
                    if (i % 2 === 1) {
                        left += width;
                    }
                } else {
                    left = (viewportWidth - width) / 2;
                }
                top = (viewportHeight - height) / 2;
                left = Math.max(left, 0);
                top = Math.max(top, 0);
                $page.css({
                    marginLeft: left,
                    marginTop: top
                });
            }
        },

        /**
         * Update page classes for presentation mode transitions
         * @returns {void}
         */
        updatePageClasses: function () {
            var $pages = this.$pages,
                index = this.state.currentPage - 1,
                next = index + 1,
                prev = index - 1,
                buffer = 20;

            // @TODO: optimize this a bit
            // add/removeClass is expensive, so try using hasClass
            $pages.removeClass(PRESENTATION_CSS_CLASSES);
            if (this.twoPageMode) {
                next = index + 2;
                prev = index - 2;
                $pages.slice(Math.max(prev, 0), index).addClass(CSS_CLASS_PAGE_PREV);
                $pages.slice(next, next + 2).addClass(CSS_CLASS_PAGE_NEXT);
            } else {
                if (prev >= 0) {
                    $pages.eq(prev).addClass(CSS_CLASS_PAGE_PREV);
                }
                if (next < this.numPages) {
                    $pages.eq(next).addClass(CSS_CLASS_PAGE_NEXT);
                }
            }
            $pages.slice(0, index).addClass(CSS_CLASS_PAGE_BEFORE);
            $pages.slice(Math.max(0, index - buffer), index).addClass(CSS_CLASS_PAGE_BEFORE_BUFFER);
            $pages.slice(next).addClass(CSS_CLASS_PAGE_AFTER);
            $pages.slice(next, Math.min(this.numPages, next + buffer)).addClass(CSS_CLASS_PAGE_AFTER_BUFFER);

            /*
            // OPTIMIZATION CODE NOT YET WORKING PROPERLY
            $pages.slice(0, index).each(function () {
                var $p = $(this),
                    i = $p.index(),
                    toAdd = '',
                    toRm = '';
                if (!$p.hasClass(beforeClass.trim())) toAdd += beforeClass;
                if ($p.hasClass(nextClass.trim())) toRm += nextClass;
                if ($p.hasClass(afterClass.trim())) toRm += afterClass;
                if ($p.hasClass(afterBufferClass.trim())) toRm += afterBufferClass;
                if (i >= index - buffer && !$p.hasClass(beforeBufferClass.trim()))
                    toAdd += beforeBufferClass;
                else if ($p.hasClass(beforeBufferClass.trim()))
                    toRm += beforeBufferClass;
                if (i >= prev && !$p.hasClass(prevClass.trim()))
                    toAdd += prevClass;
                else if ($p.hasClass(prevClass.trim()))
                    toRm += prevClass;
                $p.addClass(toAdd).removeClass(toRm);
//                console.log('before', $p.index(), toRm, toAdd);
            });
            $pages.slice(next).each(function () {
                var $p = $(this),
                    i = $p.index(),
                    toAdd = '',
                    toRm = '';
                if (!$p.hasClass(afterClass.trim())) toAdd += afterClass;
                if ($p.hasClass(prevClass.trim())) toRm += prevClass;
                if ($p.hasClass(beforeClass.trim())) toRm += beforeClass;
                if ($p.hasClass(beforeBufferClass.trim())) toRm += beforeBufferClass;
                if (i <= index + buffer && !$p.hasClass(afterBufferClass.trim()))
                    toAdd += afterBufferClass;
                else if ($p.hasClass(afterBufferClass.trim()))
                    toRm += afterBufferClass;
                if (i <= next + 1 && !$p.hasClass(nextClass.trim()))
                    toAdd += nextClass;
                else if ($p.hasClass(nextClass.trim()))
                    toRm += nextClass;
                $p.addClass(toAdd).removeClass(toRm);
//                console.log('after', $p.index(), toRm, toAdd);
            });*/
        }
    });
});

/**
 * The vertical-single-column layout
 */
Crocodoc.addComponent('layout-' + Crocodoc.LAYOUT_VERTICAL_SINGLE_COLUMN, ['layout-' + Crocodoc.LAYOUT_VERTICAL], function (scope, vertical) {

    'use strict';

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    // there is nothing different about this layout aside from the name (and CSS class name)
    // so we can just return the vertical layout
    return vertical;
});

/**
 * The vertical layout
 */
Crocodoc.addComponent('layout-' + Crocodoc.LAYOUT_VERTICAL, ['layout-base'], function (scope, base) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var util = scope.getUtility('common'),
        browser = scope.getUtility('browser');

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return base.extend({

        /**
         * Calculate the numeric value for zoom 'auto' for this layout mode
         * @returns {float} The zoom value
         */
        calculateZoomAutoValue: function () {
            var state = this.state,
                fitWidth = this.calculateZoomValue(Crocodoc.ZOOM_FIT_WIDTH),
                fitHeight = this.calculateZoomValue(Crocodoc.ZOOM_FIT_HEIGHT);

            if (state.widestPage.actualWidth > state.tallestPage.actualHeight) {
                // landscape
                // max zoom 1 for vertical mode
                return Math.min(1, fitWidth, fitHeight);
            } else {
                // portrait
                if (browser.mobile) {
                    return fitWidth;
                }
                // limit max zoom to 100% of the doc
                return Math.min(1, fitWidth);
            }
        },

        /**
         * Calculate which page is currently the "focused" page.
         * In vertical mode, this is the page at the top (and if multiple columns, the leftmost page),
         * where at least half of the page is showing.
         * @returns {int} The current page
         */
        calculateCurrentPage: function () {
            var prevPageIndex,
                currentPageIndex,
                rowIndex,
                row,
                offset,
                state = this.state,
                pages = state.pages;

            prevPageIndex = util.bisectRight(pages, state.scrollTop, 'y0') - 1;
            if (prevPageIndex < 0) {
                return 1;
            }
            offset = state.scrollTop + pages[prevPageIndex].height / 2;
            currentPageIndex = util.bisectRight(pages, offset, 'y0') - 1;
            rowIndex = pages[currentPageIndex].rowIndex;
            row = state.rows[rowIndex];
            return 1 + row[0];

        },

        /**
         * Calculates the next page
         * @returns {int} The next page number
         */
        calculateNextPage: function () {
            var state = this.state,
                currentPage = state.pages[state.currentPage - 1],
                rowIndex = currentPage.rowIndex,
                nextRow = state.rows[rowIndex + 1];
            return nextRow && nextRow[0] + 1 || state.currentPage;
        },

        /**
         * Calculates the previous page
         * @returns {int} The previous page number
         */
        calculatePreviousPage: function () {
            var state = this.state,
                currentPage = state.pages[state.currentPage - 1],
                rowIndex = currentPage.rowIndex,
                prevRow = state.rows[rowIndex - 1];
            return prevRow && prevRow[0] + 1 || state.currentPage;
        },

        /**
         * Handle resize mesages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handleResize: function (data) {
            base.handleResize.call(this, data);
            this.updateCurrentPage();
        },

        /**
         * Handle scroll mesages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handleScroll: function (data) {
            base.handleScroll.call(this, data);
            this.updateCurrentPage();
        },

        /**
         * Updates the layout elements (pages, doc, etc) CSS
         * appropriately for the current zoom level
         * @returns {void}
         */
        updateLayout: function () {
            // vertical stuff
            var state = this.state,
                zoom = state.zoomState.zoom,
                zoomedWidth,
                docWidth;

            zoomedWidth = Math.floor(state.widestPage.totalActualWidth * zoom);

            // use clientWidth for the doc (prevent scrollbar)
            // use width:auto when possible
            if (zoomedWidth <= state.viewportDimensions.clientWidth) {
                docWidth = 'auto';
            } else {
                docWidth = zoomedWidth;
            }

            this.$doc.css({
                width: docWidth
            });
        }
    });
});


/*global setTimeout, clearTimeout*/

/**
 * lazy-loader component for controlling when pages should be loaded and unloaded
 */
Crocodoc.addComponent('lazy-loader', function (scope) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var util = scope.getUtility('common'),
        browser = scope.getUtility('browser'),
        api = {},
        pages,
        numPages,
        pagefocusTriggerLoadingTID,
        readyTriggerLoadingTID,
        pageLoadTID,
        pageLoadQueue = [],
        pageLoadRange = 1,
        pageLoadingStopped = true,
        scrollDirection = 1,
        ready = false,
        layoutState = {
            page: 1,
            visiblePages: [1]
        };

    var PAGE_LOAD_INTERVAL = (browser.mobile || browser.ielt10) ? 100 : 50, //ms between initiating page loads
        MAX_PAGE_LOAD_RANGE = (browser.mobile || browser.ielt10) ? 8 : 32,
        // the delay in ms to wait before triggering preloading after `ready`
        READY_TRIGGER_PRELOADING_DELAY = 1000;

    /**
     * Create and return a range object (eg., { min: x, max: y })
     * for the current pageLoadRange constrained to the number of pages
     * @param  {int} range The range from current page
     * @returns {Object}    The range object
     * @private
     */
    function calculateRange(range) {
        range = range || pageLoadRange;
        var currentIndex = layoutState.page - 1,
            low = currentIndex - range,
            high = currentIndex + range;
        return util.constrainRange(low, high, numPages - 1);
    }

    /**
     * Loop through the pageLoadQueue and load pages sequentially,
     * setting a timeout to run again after PAGE_LOAD_INTERVAL ms
     * until the queue is empty
     * @returns {void}
     * @private
     */
    function pageLoadLoop() {
        var index;
        clearTimeout(pageLoadTID);
        if (pageLoadQueue.length > 0) {
            // found a page to load
            index = pageLoadQueue.shift();
            // page exists and not reached max errors?
            if (pages[index]) {
                api.loadPage(index, function loadPageCallback(pageIsLoading) {
                    if (pageIsLoading === false) {
                        // don't wait if the page is not loading
                        pageLoadLoop();
                    } else {
                        pageLoadTID = setTimeout(pageLoadLoop, PAGE_LOAD_INTERVAL);
                    }
                });
            } else {
                pageLoadLoop();
            }
        } else {
            stopPageLoadLoop();
        }
    }

    /**
     * Start the page load loop
     * @returns {void}
     * @private
     */
    function startPageLoadLoop() {
        clearTimeout(pageLoadTID);
        pageLoadingStopped = false;
        pageLoadTID = setTimeout(pageLoadLoop, PAGE_LOAD_INTERVAL);
    }

    /**
     * Stop the page load loop
     * @returns {void}
     * @private
     */
    function stopPageLoadLoop() {
        clearTimeout(pageLoadTID);
        pageLoadingStopped = true;
    }

    /**
     * Add a page to the page load queue and start the page
     * load loop if necessary
     * @param  {int} index The index of the page to add
     * @returns {void}
     * @private
     */
    function pushPageLoadQueue(index) {
        pageLoadQueue.push(index);
        if (pageLoadingStopped) {
            startPageLoadLoop();
        }
    }

    /**
     * Clear all pages from the page load queue and stop the loop
     * @returns {void}
     * @private
     */
    function clearPageLoadQueue() {
        pageLoadQueue.length = 0;
        stopPageLoadLoop();
    }

    /**
     * Returns true if the given index is in the page load range, and false otherwise
     * @param   {int} index The page index
     * @param   {int} rangeLength The page range length
     * @returns {bool}      Whether the page index is in the page load range
     * @private
     */
    function indexInRange(index, rangeLength) {
        var range = calculateRange(rangeLength);
        if (index >= range.min && index <= range.max) {
            return true;
        }
        return false;
    }

    /**
     * Returns true if the given page index should be loaded, and false otherwise
     * @param   {int} index The page index
     * @returns {bool}      Whether the page should be loaded
     * @private
     */
    function shouldLoadPage(index) {
        var page = pages[index];

        // does the page exist?
        if (page) {

            // within page load range?
            if (indexInRange(index)) {
                return true;
            }

            // is it visible?
            if (pageIsVisible(index)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Returns true if the given page index should be unloaded, and false otherwise
     * @param   {int} index The page index
     * @param   {int} rangeLength The range length
     * @returns {bool}      Whether the page should be unloaded
     * @private
     */
    function shouldUnloadPage(index, rangeLength) {

        // within page load range?
        if (indexInRange(index, rangeLength)) {
            return false;
        }

        // is it visible?
        if (pageIsVisible(index)) {
            return false;
        }

        return true;
    }

    /**
     * Returns true if the given page is visible, and false otherwise
     * @param   {int} index The page index
     * @returns {bool}      Whether the page is visible
     * @private
     */
    function pageIsVisible(index) {
        // is it visible?
        return util.inArray(index + 1, layoutState.visiblePages) > -1;
    }

    /**
     * Queues pages to load in order from indexFrom to indexTo
     * @param   {number} start The page index to start at
     * @param   {number} end   The page index to end at
     * @returns {void}
     */
    function queuePagesToLoadInOrder(start, end) {
        var increment = util.sign(end - start);

        while (start !== end) {
            api.queuePageToLoad(start);
            start += increment;
        }
        api.queuePageToLoad(start);
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return util.extend(api, {
        messages: [
            'beforezoom',
            'pageavailable',
            'pagefocus',
            'ready',
            'scroll',
            'scrollend',
            'zoom'
        ],

        /**
         * Handle framework messages
         * @param {string} name The name of the message
         * @param {Object} data The related data for the message
         * @returns {void}
         */
        onmessage: function (name, data) {
            switch (name) {
                case 'beforezoom':
                    this.handleBeforeZoom(data);
                    break;
                case 'pageavailable':
                    this.handlePageAvailable(data);
                    break;
                case 'pagefocus':
                    this.handlePageFocus(data);
                    break;
                case 'ready':
                    this.handleReady();
                    break;
                case 'scroll':
                    this.handleScroll();
                    break;
                case 'scrollend':
                    this.handleScrollEnd();
                    break;
                case 'zoom':
                    this.handleZoom(data);
                    break;
                // no default
            }
        },

        /**
         * Initialize the LazyLoader component
         * @param {Array} pageComponents The array of page components to lazily load
         * @returns {void}
         */
        init: function (pageComponents) {
            pages = pageComponents;
            numPages = pages.length;
            pageLoadRange = Math.min(MAX_PAGE_LOAD_RANGE, numPages);
        },

        /**
         * Destroy the LazyLoader component
         * @returns {void}
         */
        destroy: function () {
            this.cancelAllLoading();
        },

        /**
         * Updates the current layout state and scroll direction
         * @param   {Object} state The layout state
         * @returns {void}
         */
        updateLayoutState: function (state) {
            scrollDirection = util.sign(state.page - layoutState.page);
            layoutState = state;
        },

        /**
         * Queue pages to load in the following order:
         * 1) current page
         * 2) visible pages
         * 3) pages within pageLoadRange of the viewport
         * @returns {void}
         * @NOTE: this function is debounced so it will not load and abort
         * several times if called a lot in a short time
         */
        loadNecessaryPages: util.debounce(100, function () {
            // cancel anything that happens to be loading first
            this.cancelAllLoading();

            // load current page first
            this.queuePageToLoad(layoutState.page - 1);

            // then load pages that are visible in the viewport
            this.loadVisiblePages();

            // then load pages beyond the viewport
            this.loadPagesInRange(pageLoadRange);
        }),

        /**
         * Queue pages to load within the given range such that
         * proceeding pages are added before preceding pages
         * @param  {int} range The range to load beyond the current page
         * @returns {void}
         */
        loadPagesInRange: function (range) {
            var currentIndex = layoutState.page - 1;
            if (range > 0) {
                range = calculateRange(range);
                // load pages in the order of priority based on the direction
                // the user is scrolling (load nearest page first, working in
                // the scroll direction, then start on the opposite side of
                // scroll direction and work outward)
                // NOTE: we're assuming that a negative scroll direction means
                // direction of previous pages, and positive is next pages...
                if (scrollDirection >= 0) {
                    queuePagesToLoadInOrder(currentIndex + 1, range.max);
                    queuePagesToLoadInOrder(currentIndex - 1, range.min);
                } else {
                    queuePagesToLoadInOrder(currentIndex - 1, range.min);
                    queuePagesToLoadInOrder(currentIndex + 1, range.max);
                }
            }
        },

        /**
         * Queue to load all pages that are visible according
         * to the current layoutState
         * @returns {void}
         */
        loadVisiblePages: function () {
            var i, len;
            for (i = 0, len = layoutState.visiblePages.length; i < len; ++i) {
                this.queuePageToLoad(layoutState.visiblePages[i] - 1);
            }
        },

        /**
         * Add the page at the given index to the page load queue
         * and call the preload function on the page
         * @param  {int} index The index of the page to load
         * @returns {void}
         */
        queuePageToLoad: function (index) {
            if (shouldLoadPage(index)) {
                pages[index].preload();
                pushPageLoadQueue(index);
            }
        },

        /**
         * Clear the page load queue
         * @returns {void}
         */
        cancelAllLoading: function () {
            clearTimeout(readyTriggerLoadingTID);
            clearTimeout(pagefocusTriggerLoadingTID);
            clearPageLoadQueue();
        },

        /**
         * Call the load method on the page object at the specified index
         * @param  {int}      index    The index of the page to load
         * @param  {Function} callback Callback function to call always (regardless of page load success/fail)
         * @returns {void}
         */
        loadPage: function (index, callback) {
            $.when(pages[index] && pages[index].load())
                .always(callback);
        },

        /**
         * Call the unload method on the page object at the specified index
         * @param  {int} index The page index
         * @returns {void}
         */
        unloadPage: function (index) {
            var page = pages[index];
            if (page) {
                page.unload();
            }
        },

        /**
         * Unload all pages that are not within the given range (nor visible)
         * @param {int} rangeLength The page range length
         * @returns {void}
         */
        unloadUnnecessaryPages: function (rangeLength) {
            var i, l;
            // remove out-of-range SVG from DOM
            for (i = 0, l = pages.length; i < l; ++i) {
                if (shouldUnloadPage(i, rangeLength)) {
                    this.unloadPage(i);
                }
            }
        },

        /**
         * Handle ready messages
         * @returns {void}
         */
        handleReady: function () {
            ready = true;
            this.loadVisiblePages();
            readyTriggerLoadingTID = setTimeout(function () {
                api.loadNecessaryPages();
            }, READY_TRIGGER_PRELOADING_DELAY);
        },

        /**
         * Handle pageavailable messages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handlePageAvailable: function (data) {
            if (!ready) {
                return;
            }
            var i;
            if (data.all === true) {
                data.upto = numPages;
            }
            if (data.page) {
                this.queuePageToLoad(data.page - 1);
            } else if (data.upto) {
                for (i = 0; i < data.upto; ++i) {
                    this.queuePageToLoad(i);
                }
            }
        },

        /**
         * Handle pagefocus messages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handlePageFocus: function (data) {
            // NOTE: update layout state before `ready`
            this.updateLayoutState(data);
            if (!ready) {
                return;
            }
            this.cancelAllLoading();
            // set a timeout to trigger loading so we dont cause unnecessary layouts while scrolling
            pagefocusTriggerLoadingTID = setTimeout(function () {
                api.loadNecessaryPages();
            }, 200);
        },

        /**
         * Handle beforezoom messages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handleBeforeZoom: function (data) {
            if (!ready) {
                return;
            }
            this.cancelAllLoading();
            // @NOTE: for performance reasons, we unload as many pages as possible just before zooming
            // so we don't have to layout as many pages at a time immediately after the zoom.
            // This is arbitrarily set to 2x the number of visible pages before the zoom, and
            // it seems to work alright.
            this.unloadUnnecessaryPages(data.visiblePages.length * 2);
        },

        /**
         * Handle zoom messages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handleZoom: function (data) {
            // NOTE: update layout state before `ready`
            this.updateLayoutState(data);
            if (!ready) {
                return;
            }
            this.loadNecessaryPages();
        },

        /**
         * Handle scroll messages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handleScroll: function () {
            this.cancelAllLoading();
        },

        /**
         * Handle scrollend messages
         * @param   {Object} data The message data
         * @returns {void}
         */
        handleScrollEnd: function () {
            if (!ready) {
                return;
            }
            this.loadNecessaryPages();
            this.unloadUnnecessaryPages(pageLoadRange);
        }
    });
});

/**
 * page-img component used to display raster image instead of SVG content for
 * browsers that do not support SVG
 */
Crocodoc.addComponent('page-img', function (scope) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var browser = scope.getUtility('browser');

    var $img, $el,
        $loadImgPromise,
        page,
        imageLoaded = false,
        removeOnUnload = browser.mobile;

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Initialize the page-img component
         * @param  {Element} el     The element to insert the image into
         * @param  {number} pageNum The page number
         * @returns {void}
         */
        init: function (el, pageNum) {
            $el = $(el);
            page = pageNum;
        },

        /**
         * Destroy the page-img component
         * @returns {void}
         */
        destroy: function () {
            removeOnUnload = true;
            this.unload();
            $el.empty();
        },

        /**
         * Prepare the element for loading
         * @returns {void}
         */
        prepare: function () { /* noop */ },

        /**
         * Preload the image
         * @returns {void}
         */
        preload: function () {
            if (!$loadImgPromise) {
                $loadImgPromise = scope.get('page-img', page);
            }
        },

        /**
         * Load the image
         * @returns {$.Promise}    A jQuery Promise object
         */
        load: function () {
            this.preload();

            $loadImgPromise.done(function loadImgSuccess(img) {
                if (!imageLoaded) {
                    imageLoaded = true;
                    $img = $(img).appendTo($el);
                }
                // always show the image
                $img.show();
            });

            $loadImgPromise.fail(function loadImgFail(error) {
                imageLoaded = false;
                if (error) {
                    scope.broadcast('asseterror', error);
                }
            });

            return $loadImgPromise;
        },

        /**
         * Unload (or hide) the img
         * @returns {void}
         */
        unload: function () {
            if ($loadImgPromise) {
                $loadImgPromise.abort();
                $loadImgPromise = null;
            }
            if (removeOnUnload) {
                if ($img) {
                    $img.remove();
                    $img = null;
                }
                imageLoaded = false;
            } else if ($img) {
                $img.hide();
            }
        }
    };
});

/**
 * page-links component definition
 */
Crocodoc.addComponent('page-links', function (scope) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var CSS_CLASS_PAGE_LINK = 'crocodoc-page-link';

    var $el,
        browser = scope.getUtility('browser');

    /**
     * Create a link element given link data
     * @param   {Object} link The link data
     * @returns {void}
     * @private
     */
    function createLink(link) {
        var $link = $('<a>').addClass(CSS_CLASS_PAGE_LINK),
            left = link.bbox[0],
            top = link.bbox[1],
            attr = {};

        if (browser.ie) {
            // @NOTE: IE doesn't allow override of ctrl+click on anchor tags,
            // but there is a workaround to add a child element (which triggers
            // the onclick event first)
            $('<span>')
                .appendTo($link)
                .on('click', handleClick);
        }

        $link.css({
            left: left + 'pt',
            top: top + 'pt',
            width: link.bbox[2] - left + 'pt',
            height: link.bbox[3] - top + 'pt'
        });

        if (link.uri) {
            if (/^http|^mailto/.test(link.uri)) {
                attr.href = encodeURI(link.uri);
                attr.target = '_blank';
            } else {
                // don't embed this link... we don't trust the protocol
                return;
            }
        } else if (link.destination) {
            attr.href = '#page-' + link.destination.pagenum;
        }

        $link.attr(attr);
        $link.data('link', link);
        $link.appendTo($el);
    }

    /**
     * Handle link clicks
     * @param   {Event} event The event object
     * @returns {void}
     * @private
     */
    function handleClick(event) {
        var targetEl = browser.ie ? event.target.parentNode : event.target,
            $link = $(targetEl),
            data = $link.data('link');

        if (data) {
            scope.broadcast('linkclick', data);
        }
        event.preventDefault();
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Initialize the page-links component
         * @param  {Array} links Links configuration array
         * @returns {void}
         * @TODO (possible): make a links data-provider instead of passing
         * them in as an argument?
         */
        init: function (el, links) {
            $el = $(el);
            this.createLinks(links);
            if (!browser.ie) {
                // @NOTE: event handlers are individually bound in IE, because
                // the ctrl+click workaround fails when using event delegation
                $el.on('click', '.' + CSS_CLASS_PAGE_LINK, handleClick);
            }
        },

        /**
         * Destroy the page-links component
         * @returns {void}
         */
        destroy: function () {
            // @NOTE: individual click event handlers needed for IE are
            // implicitly removed by jQuery when we empty the links container
            $el.empty().off('click');
            $el = browser = null;
        },

        /**
         * Create and insert link elements into the element
         * @param   {Array} links Array of link data
         * @returns {void}
         */
        createLinks: function (links) {
            var i, len;
            for (i = 0, len = links.length; i < len; ++i) {
                createLink(links[i]);
            }
        }
    };
});

/**
 * page-svg component
 */
Crocodoc.addComponent('page-svg', function (scope) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    // @NOTE: MAX_DATA_URLS is the maximum allowed number of data-urls in svg
    // content before we give up and stop rendering them
    var SVG_MIME_TYPE = 'image/svg+xml',
        HTML_TEMPLATE = '<style>html,body{width:100%;height:100%;margin:0;overflow:hidden;}</style>',
        SVG_CONTAINER_TEMPLATE = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><script><![CDATA[('+proxySVG+')()]]></script></svg>',

        // Embed the svg in an iframe (initialized to about:blank), and inject
        // the SVG directly to the iframe window using document.write()
        // @NOTE: this breaks images in Safari because [?]
        EMBED_STRATEGY_IFRAME_INNERHTML = 1,

        // Embed the svg with a data-url
        // @NOTE: ff allows direct script access to objects embedded with a data url,
        //        and this method prevents a throbbing spinner because document.write
        //        causes a spinner in ff
        // @NOTE: NOT CURRENTLY USED - this breaks images in firefox because:
        //        https://bugzilla.mozilla.org/show_bug.cgi?id=922433
        EMBED_STRATEGY_DATA_URL = 2,

        // Embed the svg directly in html via inline svg.
        // @NOTE: NOT CURRENTLY USED -  seems to be slow everywhere, but I'm keeping
        //        this here because it's very little extra code, and inline SVG might
        //        be better some day?
        EMBED_STRATEGY_INLINE_SVG = 3,

        // Embed the svg directly with an object tag; don't replace linked resources
        // @NOTE: NOT CURRENTLY USED - this is only here for testing purposes, because
        //        it works in every browser; it doesn't support query string params
        //        and causes a spinner
        EMBED_STRATEGY_BASIC_OBJECT = 4,

        // Embed the svg directly with an img tag; don't replace linked resources
        // @NOTE: NOT CURRENTLY USED - this is only here for testing purposes
        EMBED_STRATEGY_BASIC_IMG = 5,

        // Embed a proxy svg script as an object tag via data:url, which exposes a
        // loadSVG method on its contentWindow, then call the loadSVG method directly
        // with the svg text as the argument
        // @NOTE: only works in firefox because of its security policy on data:uri
        EMBED_STRATEGY_DATA_URL_PROXY = 6,

        // Embed in a way similar to the EMBED_STRATEGY_DATA_URL_PROXY, but in this
        // method we use an iframe initialized to about:blank and embed the proxy
        // script before calling loadSVG on the iframe's contentWindow
        // @NOTE: this is a workaround for the image issue with EMBED_STRATEGY_IFRAME_INNERHTML
        //        in safari; it also works in firefox
        EMBED_STRATEGY_IFRAME_PROXY = 7,

        // Embed in an img tag via data:url, downloading stylesheet separately, and
        // injecting it into the data:url of SVG text before embedding
        // @NOTE: this method seems to be more performant on IE
        EMBED_STRATEGY_DATA_URL_IMG = 8;

    var browser = scope.getUtility('browser'),
        DOMParser = window.DOMParser;

    var $svg, $svgLayer,
        $loadSVGPromise,
        page,
        destroyed = false,
        unloaded = false,
        svgLoaded = false,
        viewerConfig = scope.getConfig(),
        removeOnUnload = browser.mobile || browser.ielt10,
        // * IE 9-10 and firefox perform better with <img> elements
        // * IE 11 crashes when using img elements for some reason
        // * Everything else is happy with iframe + innerhtml
        embedStrategy = browser.ielt11 || browser.firefox ?
                        EMBED_STRATEGY_DATA_URL_IMG :
                        EMBED_STRATEGY_IFRAME_INNERHTML;

    /**
     * Create and return a jQuery object for the SVG element
     * @returns {Object} The SVG $element
     * @private
     */
    function createSVGEl() {
        switch (embedStrategy) {
            case EMBED_STRATEGY_IFRAME_INNERHTML:
            case EMBED_STRATEGY_IFRAME_PROXY:
                return $('<iframe>');

            case EMBED_STRATEGY_DATA_URL_PROXY:
            case EMBED_STRATEGY_DATA_URL:
                return $('<object>').attr({
                    type: SVG_MIME_TYPE,
                    data: 'data:'+SVG_MIME_TYPE+';base64,' + window.btoa(SVG_CONTAINER_TEMPLATE)
                });

            case EMBED_STRATEGY_INLINE_SVG:
                return $('<div>');

            case EMBED_STRATEGY_BASIC_OBJECT:
                return $('<object>');

            case EMBED_STRATEGY_BASIC_IMG:
            case EMBED_STRATEGY_DATA_URL_IMG:
                return $('<img>');

            // no default
        }
    }

    /**
     * Create the svg element if it hasn't been created,
     * insert the SVG into the DOM if necessary
     * @returns {void}
     * @private
     */
    function prepareSVGContainer() {
        if (!$svg || $svg.length === 0) {
            svgLoaded = false;
            $svg = createSVGEl();
        }
        if ($svg.parent().length === 0) {
            $svg.appendTo($svgLayer);
        }
    }

    /**
     * Load svg text if necessary
     * @returns {$.Promise}
     * @private
     */
    function loadSVGText() {
        if (svgLoaded ||
            // @NOTE: these embed strategies don't require svg text to be loaded
            embedStrategy === EMBED_STRATEGY_BASIC_OBJECT ||
            embedStrategy === EMBED_STRATEGY_BASIC_IMG)
        {
            // don't load the SVG text, just return an empty promise
            return $.Deferred().resolve().promise({
                abort: function() {}
            });
        } else {
            return scope.get('page-svg', page);
        }
    }

    /**
     * Fixes a bug in Safari where <use> elements are not supported properly
     * by replacing each <use> element with a clone of its referenced <image>
     * @param   {Document} contentDocument The SVG document
     * @returns {void}
     */
    function fixUseElements(contentDocument) {
        // find all <use> elements
        var useEls = contentDocument.querySelectorAll('use');
        [].forEach.call(useEls, function (use) {
            var id = use.getAttribute('xlink:href'),
                // clone the referenced <image> element
                image = contentDocument.querySelector(id).cloneNode(),
                parent = use.parentNode;
            // remove the id so we don't have duplicates
            image.removeAttribute('id');
            // copy over the transform
            image.setAttribute('transform', use.getAttribute('transform'));
            // replace the use with the image
            parent.replaceChild(image, use);
        });
    }

    /**
     * Embed the SVG into the page
     * @returns {void}
     * @private
     */
    function embedSVG(svgText) {
        var domParser,
            svgDoc,
            svgEl,
            html,
            dataURLPrefix,
            contentDocument = $svg[0].contentDocument,
            contentWindow = $svg[0].contentWindow ||
                             // @NOTE: supports older versions of ff
                            contentDocument && contentDocument.defaultView;

        switch (embedStrategy) {
            case EMBED_STRATEGY_IFRAME_INNERHTML:
                // @NOTE: IE 9 fix. This line in the file is causing the page not to render in IE 9.
                // The link is not needed here anymore because we are including the stylesheet separately.
                if (browser.ielt10) {
                    svgText = svgText.replace(/<xhtml:link.*/,'');
                }
                html = HTML_TEMPLATE + svgText;
                // @NOTE: documentElement.innerHTML is read-only in IE
                if (browser.ielt10) {
                    contentDocument.body.innerHTML = html;
                } else {
                    contentDocument.documentElement.innerHTML = html;
                    // @NOTE: there is a bug in Safari 6 where <use>
                    // elements don't work properly
                    if ((browser.ios || browser.safari) && browser.version < 7) {
                        fixUseElements(contentDocument);
                    }
                }
                svgEl = contentDocument.getElementsByTagName('svg')[0];
                break;

            case EMBED_STRATEGY_IFRAME_PROXY:
                contentDocument.documentElement.innerHTML = HTML_TEMPLATE;
                var head = contentDocument.getElementsByTagName('head')[0] || contentDocument.documentElement,
                    script = contentDocument.createElement('script'),
                    data = '('+proxySVG+')()'; // IIFE to create window.loadSVG
                script.type = 'text/javascript';
                try {
                    // doesn't work on ie...
                    script.appendChild(document.createTextNode(data));
                } catch(e) {
                    // IE has funky script nodes
                    script.text = data;
                }
                head.insertBefore(script, head.firstChild);
                if (contentDocument.readyState === 'complete') {
                    contentWindow.loadSVG(svgText);
                } else {
                    contentWindow.onload = function () {
                        this.loadSVG(svgText);
                    };
                }
                // NOTE: return is necessary here because we are waiting for a callback
                // before unsetting svgText
                return;

            case EMBED_STRATEGY_DATA_URL:
                domParser = new DOMParser();
                svgDoc = domParser.parseFromString(svgText, SVG_MIME_TYPE);
                svgEl = contentDocument.importNode(svgDoc.documentElement, true);
                contentDocument.documentElement.appendChild(svgEl);
                break;

            case EMBED_STRATEGY_DATA_URL_PROXY:
                contentWindow.loadSVG(svgText);
                svgEl = contentDocument.querySelector('svg');
                break;

            case EMBED_STRATEGY_INLINE_SVG:
                domParser = new DOMParser();
                svgDoc = domParser.parseFromString(svgText, SVG_MIME_TYPE);
                svgEl = document.importNode(svgDoc.documentElement, true);
                $svg.append(svgEl);
                break;

            case EMBED_STRATEGY_BASIC_OBJECT:
                $svg.attr({
                    type: SVG_MIME_TYPE,
                    data: scope.getDataProvider('page-svg').getURL(page)
                });
                svgEl = $svg[0];
                break;

            case EMBED_STRATEGY_BASIC_IMG:
                svgEl = $svg[0];
                svgEl.src = scope.getDataProvider('page-svg').getURL(page);
                break;

            case EMBED_STRATEGY_DATA_URL_IMG:
                svgEl = $svg[0];
                dataURLPrefix = 'data:' + SVG_MIME_TYPE;
                if (!browser.ie && window.btoa) {
                    svgEl.src = dataURLPrefix + ';base64,' + window.btoa(svgText);
                } else {
                    svgEl.src = dataURLPrefix + ',' + encodeURIComponent(svgText);
                }
                break;

            // no default
        }

        // make sure the svg width/height are explicity set to 100%
        svgEl.setAttribute('width', '100%');
        svgEl.setAttribute('height', '100%');
    }

    /**
     * Creates a global method for loading svg text into the proxy svg object
     * @NOTE: this function should never be called directly in this context;
     * it's converted to a string and encoded into the proxy svg data:url
     * @returns {void}
     * @private
     */
    function proxySVG() {
        window.loadSVG = function (svgText) {
            var domParser = new window.DOMParser(),
                svgDoc = domParser.parseFromString(svgText, 'image/svg+xml'),
                svgEl = document.importNode(svgDoc.documentElement, true);
            // make sure the svg width/height are explicity set to 100%
            svgEl.setAttribute('width', '100%');
            svgEl.setAttribute('height', '100%');

            if (document.body) {
                document.body.appendChild(svgEl);
            } else {
                document.documentElement.appendChild(svgEl);
            }
        };
    }

    /**
     * handle SVG load success
     * @param   {string} text The SVG text
     * @returns {void}
     */
    function loadSVGSuccess(text) {
        if (!destroyed && !unloaded) {
            if (!svgLoaded && text) {
                embedSVG(text);
                svgLoaded = true;
                if (!removeOnUnload) {
                    // cleanup the promise (abort will remove the svg text from
                    // the in-memory cache as well)
                    $loadSVGPromise.abort();
                    $loadSVGPromise = null;
                }
            }
            // always insert and show the svg el when load was successful
            if ($svg.parent().length === 0) {
                $svg.appendTo($svgLayer);
            }
            $svg.show();
        }
    }

    /**
     * Handle SVG load failure
     * @param   {*} error The error
     * @returns {void}
     */
    function loadSVGFail(error) {
        scope.broadcast('asseterror', error);
        svgLoaded = false;
        if ($loadSVGPromise) {
            $loadSVGPromise.abort();
        }
        // don't set the promise to null, because when it fails it should fail
        // for good...
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------


    return {
        /**
         * Initialize the page-svg component
         * @param {jQuery} $el The element to load SVG layer into
         * @param  {number} pageNum The page number
         * @returns {void}
         */
        init: function ($el, pageNum) {
            $svgLayer = $el;
            page = pageNum;
            embedStrategy = viewerConfig.embedStrategy || embedStrategy;
        },

        /**
         * Destroy the page-svg component
         * @returns {void}
         */
        destroy: function () {
            destroyed = true;
            removeOnUnload = true;
            this.unload();
            $svgLayer.empty();
        },

        /**
         * Prepare the element for loading
         * @returns {void}
         */
        prepare: function () {
            prepareSVGContainer();
        },

        /**
         * Prepare the SVG object to be loaded and start loading SVG text
         * @returns {void}
         */
        preload: function () {
            this.prepare();

            if (!$loadSVGPromise) {
                $loadSVGPromise = loadSVGText();
            }
        },

        /**
         * Load the SVG and call callback when complete.
         * If there was an error, callback's first argument will be
         * an error message, and falsy otherwise.
         * @returns {$.Promise}    A jQuery promise object
         */
        load: function () {
            unloaded = false;
            this.preload();

            $loadSVGPromise
                .done(loadSVGSuccess)
                .fail(loadSVGFail);
            return $loadSVGPromise;
        },

        /**
         * Unload (or hide) the SVG object
         * @returns {void}
         */
        unload: function () {
            unloaded = true;
            // stop loading the page if it hasn't finished yet
            if ($loadSVGPromise && $loadSVGPromise.state() !== 'resolved') {
                $loadSVGPromise.abort();
                $loadSVGPromise = null;
            }

            // remove the svg element if necessary
            if (removeOnUnload) {
                if ($svg) {
                    $svg.remove();
                    $svg = null;
                }
                svgLoaded = false;
            } else if ($svg) {
                // just hide the svg element
                $svg.hide();
            }
        }
    };
});

/**
 * page-text component
 */
Crocodoc.addComponent('page-text', function (scope) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var CSS_CLASS_PAGE_TEXT = 'crocodoc-page-text';

    var browser = scope.getUtility('browser'),
        subpx   = scope.getUtility('subpx');

    var destroyed = false,
        loaded = false,
        $textLayer,
        $loadTextPromise,
        page,
        viewerConfig = scope.getConfig();

    /**
     * Return true if we should use the text layer, false otherwise
     * @returns {bool}
     * @private
     */
    function shouldUseTextLayer() {
        return viewerConfig.enableTextSelection && !browser.ielt9;
    }

    /**
     * Handle success loading HTML text
     * @param {string} text The HTML text
     * @returns {void}
     * @private
     */
    function loadTextLayerHTMLSuccess(text) {
        var doc, textEl;

        if (!text || loaded || destroyed) {
            return;
        }

        loaded = true;

        // create a document to parse the html text
        doc = document.implementation.createHTMLDocument('');
        doc.getElementsByTagName('body')[0].innerHTML = text;
        text = null;

        // select just the element we want (CSS_CLASS_PAGE_TEXT)
        textEl = document.importNode(doc.querySelector('.' + CSS_CLASS_PAGE_TEXT), true);
        $textLayer.attr('class', textEl.getAttribute('class'));
        $textLayer.html(textEl.innerHTML);
        subpx.fix($textLayer);
    }

    function loadTextLayerHTMLFail(error) {
        if (error) {
            scope.broadcast('asseterror', error);
        }
    }

    /**
     * Load text html if necessary and insert it into the element
     * @returns {$.Promise}
     * @private
     */
    function loadTextLayerHTML() {
        // already load(ed|ing)?
        if (!$loadTextPromise) {
            if (shouldUseTextLayer()) {
                $loadTextPromise = scope.get('page-text', page);
            } else {
                $loadTextPromise = $.Deferred().resolve().promise({
                    abort: function () {}
                });
            }
        }

        return $loadTextPromise;
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * Initialize the page-text component
         * @param {jQuery} $el The jQuery element to load the text layer into
         * @returns {void}
         */
        init: function ($el, pageNum) {
            $textLayer = $el;
            page = pageNum;
        },

        /**
         * Destroy the page-text component
         * @returns {void}
         */
        destroy: function () {
            destroyed = true;
            this.unload();
            $textLayer.empty();
        },

        /**
         * Start loading HTML text
         * @returns {void}
         */
        preload: function () {
            loadTextLayerHTML();
        },

        /**
         * Load the html text for the text layer and insert it into the element
         * if text layer is enabled and is not loading/has not already been loaded
         * @returns {$.Promise} A promise to load the text layer
         */
        load: function () {
            return loadTextLayerHTML()
                .done(loadTextLayerHTMLSuccess)
                .fail(loadTextLayerHTMLFail);
        },

        /**
         * Stop loading the text layer (no need to actually remove it)
         * @returns {void}
         */
        unload: function () {
            if ($loadTextPromise && $loadTextPromise.state() !== 'resolved') {
                $loadTextPromise.abort();
                $loadTextPromise = null;
            }
        },

        /**
         * Enable text selection
         * @returns {void}
         */
        enable: function () {
            $textLayer.css('display', '');
            // we created an empty promise if text selection was previously disabled,
            // so we can scrap it so a new promise will be created next time this
            // page is requested
            if ($loadTextPromise && !loaded) {
                $loadTextPromise = null;
            }
        },

        /**
         * Disable text selection
         * @returns {void}
         */
        disable: function () {
            $textLayer.css('display', 'none');
        }
    };
});

/**
 * Page component
 */
Crocodoc.addComponent('page', function (scope) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var CSS_CLASS_PAGE_PREFIX = 'crocodoc-page-',
        CSS_CLASS_PAGE_LOADING = CSS_CLASS_PAGE_PREFIX + 'loading',
        CSS_CLASS_PAGE_ERROR = CSS_CLASS_PAGE_PREFIX + 'error',
        CSS_CLASS_PAGE_TEXT = CSS_CLASS_PAGE_PREFIX + 'text',
        CSS_CLASS_PAGE_SVG = CSS_CLASS_PAGE_PREFIX + 'svg',
        CSS_CLASS_PAGE_LINKS = CSS_CLASS_PAGE_PREFIX + 'links';

    var support = scope.getUtility('support'),
        util = scope.getUtility('common');

    var $el,
        pageText, pageContent, pageLinks,
        pageNum, index,
        isVisible, status,
        loadRequested = false;

    return {
        messages: [
            'pageavailable',
            'pagefocus',
            'textenabledchange',
            'zoom'
        ],

        /**
         * Handle framework messages
         * @param {string} name The name of the message
         * @param {Object} data The related data for the message
         * @returns {void}
         */
        onmessage: function (name, data) {
            switch (name) {
                case 'pageavailable':
                    if (data.page === index + 1 || data.upto > index || data.all === true) {
                        if (status === Crocodoc.PAGE_STATUS_CONVERTING) {
                            status = Crocodoc.PAGE_STATUS_NOT_LOADED;
                        }
                    }
                    break;
                case 'textenabledchange':
                    if (data.enabled === true) {
                        this.enableTextSelection();
                    } else {
                        this.disableTextSelection();
                    }
                    break;
                case 'pagefocus':
                    // falls through
                case 'zoom':
                    isVisible = pageNum === data.page || (util.inArray(pageNum, data.visiblePages) > -1);
                    break;

                // no default
            }
        },

        /**
         * Initialize the Page component
         * @returns {void}
         */
        init: function ($pageEl, config) {
            var $text, $svg, $links;
            $el = $pageEl;
            $svg = $pageEl.find('.' + CSS_CLASS_PAGE_SVG);
            $text = $pageEl.find('.' + CSS_CLASS_PAGE_TEXT);
            $links = $pageEl.find('.' + CSS_CLASS_PAGE_LINKS);

            status = config.status || Crocodoc.PAGE_STATUS_NOT_LOADED;
            index = config.index;
            pageNum = index + 1;
            this.config = config;

            config.url = config.url || '';
            pageText = scope.createComponent('page-text');
            pageContent = support.svg ?
                    scope.createComponent('page-svg') :
                    scope.createComponent('page-img');

            pageText.init($text, pageNum);
            pageContent.init($svg, pageNum);

            if (config.enableLinks && config.links.length) {
                pageLinks = scope.createComponent('page-links');
                pageLinks.init($links, config.links);
            }
        },

        /**
         * Destroy the page component
         * @returns {void}
         */
        destroy: function () {
            this.unload();
        },

        /**
         * Preload the SVG if the page is not loaded
         * @returns {void}
         */
        preload: function () {
            pageContent.prepare();
            if (status === Crocodoc.PAGE_STATUS_NOT_LOADED) {
                pageContent.preload();
                pageText.preload();
            }
        },

        /**
         * Load and show SVG and text assets for this page
         * @returns {$.Promise}    jQuery Promise object or false if the page is not loading
         */
        load: function () {
            var pageComponent = this;

            loadRequested = true;

            // the page has failed to load for good... don't try anymore
            if (status === Crocodoc.PAGE_STATUS_ERROR) {
                return false;
            }

            // don't actually load if the page is converting
            if (status === Crocodoc.PAGE_STATUS_CONVERTING) {
                return false;
            }

            // request assets to be loaded... but only ACTUALLY load if it is
            // not loaded already
            if (status !== Crocodoc.PAGE_STATUS_LOADED) {
                status = Crocodoc.PAGE_STATUS_LOADING;
            }
            return $.when(pageContent.load(), pageText.load())
                .done(function handleLoadDone() {
                    if (loadRequested) {
                        if (status !== Crocodoc.PAGE_STATUS_LOADED) {
                            $el.removeClass(CSS_CLASS_PAGE_LOADING);
                            status = Crocodoc.PAGE_STATUS_LOADED;
                            scope.broadcast('pageload', { page: pageNum });
                        }
                    } else {
                        pageComponent.unload();
                    }
                })
                .fail(function handleLoadFail(error) {
                    status = Crocodoc.PAGE_STATUS_ERROR;
                    $el.addClass(CSS_CLASS_PAGE_ERROR);
                    scope.broadcast('pagefail', { page: index + 1, error: error });
                });
        },

        /**
         * Unload/hide SVG and text assets for this page
         * @returns {void}
         */
        unload: function () {
            loadRequested = false;
            pageContent.unload();
            pageText.unload();
            if (status === Crocodoc.PAGE_STATUS_LOADED) {
                status = Crocodoc.PAGE_STATUS_NOT_LOADED;
                $el.addClass(CSS_CLASS_PAGE_LOADING);
                $el.removeClass(CSS_CLASS_PAGE_ERROR);
                scope.broadcast('pageunload', { page: pageNum });
            }
        },

        /**
         * Enable text selection, loading text assets if the page is visible
         * @returns {void}
         */
        enableTextSelection: function () {
            pageText.enable();
            if (isVisible) {
                pageText.load();
            }
        },

        /**
         * Disable text selection
         * @returns {void}
         */
        disableTextSelection: function () {
            pageText.disable();
        }
    };
});



/**
 * resizer component definition
 */
Crocodoc.addComponent('resizer', function (scope) {

    'use strict';

    var support = scope.getUtility('support');

    // shorter way of defining
    // 'fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange'
    var FULLSCREENCHANGE_EVENT = ['', ' webkit', ' moz', ' ']
        .join('fullscreenchange') +
        // @NOTE: IE 11 uses upper-camel-case for this, which is apparently necessary
        'MSFullscreenChange';

    var $window = $(window),
        $document = $(document),
        element,
        frameWidth = 0,
        currentClientWidth,
        currentClientHeight,
        currentOffsetWidth,
        currentOffsetHeight,
        resizeFrameID,
        inIframe = (function () {
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        })();

    /**
     * Fire the resize event with the proper data
     * @returns {void}
     * @private
     */
    function broadcast() {
        scope.broadcast('resize', {
            // shortcuts for offsetWidth/height
            width: currentOffsetWidth,
            height: currentOffsetHeight,
            // client width is width of the inner, visible area
            clientWidth: currentClientWidth,
            clientHeight: currentClientHeight,
            // offset width is the width of the element, including border,
            // padding, and scrollbars
            offsetWidth: currentOffsetWidth,
            offsetHeight: currentOffsetHeight
        });
    }

    /**
     * Check if the element has resized every animation frame
     * @returns {void}
     * @private
     */
    function loop() {
        support.cancelAnimationFrame(resizeFrameID);
        checkResize();
        resizeFrameID = support.requestAnimationFrame(loop, element);
    }

    /**
     * Check if the element has resized, and broadcast the resize event if so
     * @returns {void}
     * @private
     */
    function checkResize () {
        var newOffsetHeight = element.offsetHeight,
            newOffsetWidth = element.offsetWidth;

        // check if we're in a frame
        if (inIframe) {
            // firefox has an issue where styles aren't calculated in hidden iframes
            // if the iframe was hidden and is now visible, broadcast a
            // layoutchange event
            if (frameWidth === 0 && window.innerWidth !== 0) {
                frameWidth = window.innerWidth;
                scope.broadcast('layoutchange');
                return;
            }
        }

        //on touch devices, the offset height is sometimes zero as content is loaded
        if (newOffsetHeight) {
            if (newOffsetHeight !== currentOffsetHeight || newOffsetWidth !== currentOffsetWidth) {
                currentOffsetHeight = newOffsetHeight;
                currentOffsetWidth = newOffsetWidth;
                currentClientHeight = element.clientHeight;
                currentClientWidth = element.clientWidth;
                broadcast();
            }
        }
    }

    return {

        messages: [
            'layoutchange'
        ],

        /**
         * Handle framework messages
         * @returns {void}
         */
        onmessage: function () {
            // force trigger resize when layout changes
            // @NOTE: we do this because the clientWidth/Height
            // could be different based on the layout (and whether
            // or not the new layout changes scrollbars)
            currentOffsetHeight = null;
            checkResize();
        },

        /**
         * Initialize the Resizer component with an element to watch
         * @param  {HTMLElement} el The element to watch
         * @returns {void}
         */
        init: function (el) {
            element = $(el).get(0);

            // use the documentElement for viewport dimensions
            // if we are using the window as the viewport
            if (element === window) {
                element = document.documentElement;
                $window.on('resize', checkResize);
                // @NOTE: we don't need to loop with
                // requestAnimationFrame in this case,
                // because we can rely on window.resize
                // events if the window is our viewport
                checkResize();
            } else {
                loop();
            }
           $document.on(FULLSCREENCHANGE_EVENT, checkResize);
        },

        /**
         * Destroy the Resizer component
         * @returns {void}
         */
        destroy: function () {
            $document.off(FULLSCREENCHANGE_EVENT, checkResize);
            $window.off('resize', checkResize);
            support.cancelAnimationFrame(resizeFrameID);
        }
    };
});

/*global setTimeout, clearTimeout */

Crocodoc.addComponent('scroller', function (scope) {

    'use strict';

    var util = scope.getUtility('common'),
        browser = scope.getUtility('browser');

    var GHOST_SCROLL_TIMEOUT = 3000,
        GHOST_SCROLL_INTERVAL = 30,
        SCROLL_EVENT_THROTTLE_INTERVAL = 200,
        SCROLL_END_TIMEOUT = browser.mobile ? 500 : 250;

    var $el,
        scrollendTID,
        scrollingStarted = false,
        touchStarted = false,
        touchEnded = false,
        touchMoved = false,
        touchEndTime = 0,
        ghostScrollStart = null;

    /**
     * Build event data object for firing scroll events
     * @returns {Object} Scroll event data object
     * @private
     */
    function buildEventData() {
        return {
            scrollTop: $el.scrollTop(),
            scrollLeft: $el.scrollLeft()
        };
    }

    /**
     * Broadcast a scroll event
     * @returns {void}
     * @private
     */
    var fireScroll = util.throttle(SCROLL_EVENT_THROTTLE_INTERVAL, function () {
        scope.broadcast('scroll', buildEventData());
    });

    /**
     * Handle scrollend
     * @returns {void}
     * @private
     */
    function handleScrollEnd() {
        scrollingStarted = false;
        ghostScrollStart = null;
        clearTimeout(scrollendTID);
        scope.broadcast('scrollend', buildEventData());
    }

    /**
     * Handle scroll events
     * @returns {void}
     * @private
     */
    function handleScroll() {
        // if we are just starting scrolling, fire scrollstart event
        if (!scrollingStarted) {
            scrollingStarted = true;
            scope.broadcast('scrollstart', buildEventData());
        }
        clearTimeout(scrollendTID);
        scrollendTID = setTimeout(handleScrollEnd, SCROLL_END_TIMEOUT);
        fireScroll();
    }

    /**
     * Handle touch start events
     * @returns {void}
     * @private
     */
    function handleTouchstart() {
        touchStarted = true;
        touchEnded = false;
        touchMoved = false;
        handleScroll();
    }

    /**
     * Handle touchmove events
     * @returns {void}
     * @private
     */
    function handleTouchmove() {
        touchMoved = true;
        handleScroll();
    }

    /**
     * Handle touchend events
     * @returns {void}
     * @private
     */
    function handleTouchend() {
        touchStarted = false;
        touchEnded = true;
        touchEndTime = new Date().getTime();
        if (touchMoved) {
            ghostScroll();
        }
    }

    /**
     * Fire fake scroll events.
     * iOS doesn't fire events during the 'momentum' part of scrolling
     * so this is used to fake these events until the page stops moving.
     * @returns {void}
     * @private
     */
    function ghostScroll() {
        clearTimeout(scrollendTID);
        if (ghostScrollStart === null) {
            ghostScrollStart = new Date().getTime();
        }
        if (new Date().getTime() - ghostScrollStart > GHOST_SCROLL_TIMEOUT) {
            handleScrollEnd();
            return;
        }
        fireScroll();
        scrollendTID = setTimeout(ghostScroll, GHOST_SCROLL_INTERVAL);
    }

    return {
        /**
         * Initialize the scroller component
         * @param   {Element} el The Element
         * @returns {void}
         */
        init: function (el) {
            $el = $(el);
            $el.on('scroll', handleScroll);
            $el.on('touchstart', handleTouchstart);
            $el.on('touchmove', handleTouchmove);
            $el.on('touchend', handleTouchend);
        },

        /**
         * Destroy the scroller component
         * @returns {void}
         */
        destroy: function () {
            clearTimeout(scrollendTID);
            $el.off('scroll', handleScroll);
            $el.off('touchstart', handleTouchstart);
            $el.off('touchmove', handleTouchmove);
            $el.off('touchend', handleTouchend);
        }
    };
});

Crocodoc.addComponent('viewer-base', function (scope) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    var CSS_CLASS_PREFIX         = 'crocodoc-',
        ATTR_SVG_VERSION         = 'data-svg-version',
        CSS_CLASS_VIEWER         = CSS_CLASS_PREFIX + 'viewer',
        CSS_CLASS_DOC            = CSS_CLASS_PREFIX + 'doc',
        CSS_CLASS_VIEWPORT       = CSS_CLASS_PREFIX + 'viewport',
        CSS_CLASS_LOGO           = CSS_CLASS_PREFIX + 'viewer-logo',
        CSS_CLASS_DRAGGABLE      = CSS_CLASS_PREFIX + 'draggable',
        CSS_CLASS_DRAGGING       = CSS_CLASS_PREFIX + 'dragging',
        CSS_CLASS_TEXT_SELECTED  = CSS_CLASS_PREFIX + 'text-selected',
        CSS_CLASS_MOBILE         = CSS_CLASS_PREFIX + 'mobile',
        CSS_CLASS_IELT9          = CSS_CLASS_PREFIX + 'ielt9',
        CSS_CLASS_SUPPORTS_SVG   = CSS_CLASS_PREFIX + 'supports-svg',
        CSS_CLASS_WINDOW_AS_VIEWPORT = CSS_CLASS_PREFIX + 'window-as-viewport',
        CSS_CLASS_PAGE           = CSS_CLASS_PREFIX + 'page',
        CSS_CLASS_PAGE_INNER     = CSS_CLASS_PAGE + '-inner',
        CSS_CLASS_PAGE_CONTENT   = CSS_CLASS_PAGE + '-content',
        CSS_CLASS_PAGE_SVG       = CSS_CLASS_PAGE + '-svg',
        CSS_CLASS_PAGE_TEXT      = CSS_CLASS_PAGE + '-text',
        CSS_CLASS_PAGE_LINKS     = CSS_CLASS_PAGE + '-links',
        CSS_CLASS_PAGE_AUTOSCALE = CSS_CLASS_PAGE + '-autoscale',
        CSS_CLASS_PAGE_LOADING   = CSS_CLASS_PAGE + '-loading';

    var VIEWER_HTML_TEMPLATE =
        '<div tabindex="-1" class="' + CSS_CLASS_VIEWPORT + '">' +
            '<div class="' + CSS_CLASS_DOC + '">' +
            '</div>' +
        '</div>' +
        '<div class="' + CSS_CLASS_LOGO + '"></div>';

    var PAGE_HTML_TEMPLATE =
        '<div class="' + CSS_CLASS_PAGE + ' ' + CSS_CLASS_PAGE_LOADING + '" ' +
            'style="width:{{w}}px; height:{{h}}px;" data-width="{{w}}" data-height="{{h}}">' +
            '<div class="' + CSS_CLASS_PAGE_INNER + '">' +
                '<div class="' + CSS_CLASS_PAGE_CONTENT + '">' +
                    '<div class="' + CSS_CLASS_PAGE_SVG + '"></div>' +
                    '<div class="' + CSS_CLASS_PAGE_AUTOSCALE + '">' +
                        '<div class="' + CSS_CLASS_PAGE_TEXT + '"></div>' +
                        '<div class="' + CSS_CLASS_PAGE_LINKS + '"></div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

    // the width to consider the 100% zoom level; zoom levels are calculated based
    // on this width relative to the actual document width
    var DOCUMENT_100_PERCENT_WIDTH = 1024;

    var util = scope.getUtility('common'),
        browser = scope.getUtility('browser'),
        support = scope.getUtility('support');

    var api, // the viewer API object
        config,
        $el,
        stylesheetEl,
        lazyLoader,
        layout,
        scroller,
        resizer,
        dragger,
        $assetsPromise;

    /**
     * Add CSS classes to the element for necessary feature/support flags
     * @returns {void}
     * @private
     */
    function setCSSFlags() {
        // add SVG version number flag
        $el.attr(ATTR_SVG_VERSION, config.metadata.version || '0.0.0');

        //add CSS flags
        if (browser.mobile) {
            $el.addClass(CSS_CLASS_MOBILE);      //Mobile?
        }
        if (browser.ielt9) {
            $el.addClass(CSS_CLASS_IELT9);       //IE7 or IE8?
        }
        if (support.svg) {
            $el.addClass(CSS_CLASS_SUPPORTS_SVG);
        }
    }

    /**
     * Validates the config options
     * @returns {void}
     * @private
     */
    function validateConfig() {
        var metadata = config.metadata;
        config.numPages = metadata.numpages;
        if (!config.pageStart) {
            config.pageStart = 1;
        } else if (config.pageStart < 0) {
            config.pageStart = metadata.numpages + config.pageStart;
        }
        config.pageStart = util.clamp(config.pageStart, 1, metadata.numpages);
        if (!config.pageEnd) {
            config.pageEnd = metadata.numpages;
        } else if (config.pageEnd < 0) {
            config.pageEnd = metadata.numpages + config.pageEnd;
        }
        config.pageEnd = util.clamp(config.pageEnd, config.pageStart, metadata.numpages);
        config.numPages = config.pageEnd - config.pageStart + 1;
    }

    /**
     * Create and insert basic viewer DOM structure
     * @returns {void}
     * @private
     */
    function initViewerHTML() {
        // create viewer HTML
        $el.html(VIEWER_HTML_TEMPLATE);
        if (config.useWindowAsViewport) {
            config.$viewport = $(window);
            $el.addClass(CSS_CLASS_WINDOW_AS_VIEWPORT);
        } else {
            config.$viewport = $el.find('.' + CSS_CLASS_VIEWPORT);
        }
        config.$doc = $el.find('.' + CSS_CLASS_DOC);
    }

    /**
     * Create the html skeleton for the viewer and pages
     * @returns {void}
     * @private
     */
    function prepareDOM() {
        var i, pageNum,
            zoomLevel, maxZoom,
            ptWidth, ptHeight,
            pxWidth, pxHeight,
            pt2px = util.calculatePtSize(),
            dimensions = config.metadata.dimensions,
            skeleton = '';

        // adjust page scale if the pages are too small/big
        // it's adjusted so 100% == DOCUMENT_100_PERCENT_WIDTH px;
        config.pageScale = DOCUMENT_100_PERCENT_WIDTH / (dimensions.width * pt2px);

        // add zoom levels to accomodate the scale
        zoomLevel = config.zoomLevels[config.zoomLevels.length - 1];
        maxZoom = 3 / config.pageScale;
        while (zoomLevel < maxZoom) {
            zoomLevel += zoomLevel / 2;
            config.zoomLevels.push(zoomLevel);
        }

        dimensions.exceptions = dimensions.exceptions || {};

        // create skeleton
        for (i = config.pageStart - 1; i < config.pageEnd; i++) {
            pageNum = i + 1;
            if (pageNum in dimensions.exceptions) {
                ptWidth = dimensions.exceptions[pageNum].width;
                ptHeight = dimensions.exceptions[pageNum].height;
            } else {
                ptWidth = dimensions.width;
                ptHeight = dimensions.height;
            }
            pxWidth = ptWidth * pt2px;
            pxHeight = ptHeight * pt2px;
            pxWidth *= config.pageScale;
            pxHeight *= config.pageScale;
            skeleton += util.template(PAGE_HTML_TEMPLATE, {
                w: pxWidth,
                h: pxHeight
            });
        }

        // insert skeleton and keep a reference to the jq object
        config.$pages = $(skeleton).appendTo(config.$doc);
    }

    /**
     * Initialize all plugins specified for this viewer instance
     * @returns {void}
     * @private
     */
    function initPlugins() {
        var name,
            plugin,
            plugins = config.plugins || {};
        for (name in plugins) {
            plugin = scope.createComponent('plugin-' + name);
            if (plugin && util.isFn(plugin.init)) {
                plugin.init(config.plugins[name]);
            }
        }
    }

    /**
     * Complete intialization after document metadata has been loaded;
     * ie., bind events, init lazyloader and layout, broadcast ready message
     * @returns {void}
     * @private
     */
    function completeInit() {
        setCSSFlags();

        // create viewer skeleton
        prepareDOM();

        // setup pages
        createPages();

        initHandlers();

        // Setup lazy loader and layout manager
        lazyLoader = scope.createComponent('lazy-loader');
        lazyLoader.init(config.pages);

        // initialize scroller and resizer components
        scroller = scope.createComponent('scroller');
        scroller.init(config.$viewport);
        resizer = scope.createComponent('resizer');
        resizer.init(config.$viewport);

        // disable links if necessary
        // @NOTE: links are disabled in IE < 9
        if (!config.enableLinks || browser.ielt9) {
            api.disableLinks();
        }

        // set the initial layout
        api.setLayout(config.layout);

        // broadcast ready message
        scope.broadcast('ready', {
            page: config.page || 1,
            numPages: config.numPages
        });

        scope.ready();
    }

    /**
     * Return the expected conversion status of the given page index
     * @param   {int} pageIndex The page index
     * @returns {string}        The page status
     */
    function getPageStatus(pageIndex) {
        if (pageIndex === 0 || config.conversionIsComplete) {
            return Crocodoc.PAGE_STATUS_NOT_LOADED;
        }
        return Crocodoc.PAGE_STATUS_CONVERTING;
    }

    /**
     * Create and init all necessary page component instances
     * @returns {void}
     * @private
     */
    function createPages() {
        var i,
            pages = [],
            page,
            start = config.pageStart - 1,
            end = config.pageEnd,
            links = sortPageLinks();

        //initialize pages
        for (i = start; i < end; i++) {
            page = scope.createComponent('page');
            page.init(config.$pages.eq(i - start), {
                index: i,
                status: getPageStatus(i),
                enableLinks: config.enableLinks,
                links: links[i],
                pageScale: config.pageScale
            });
            pages.push(page);
        }
        config.pages = pages;
    }

    /**
     * Returns all links associated with the given page
     * @param  {int} page The page
     * @returns {Array}   Array of links
     * @private
     */
    function sortPageLinks() {
        var i, len, link,
            links = config.metadata.links || [],
            sorted = [];

        for (i = 0, len = config.metadata.numpages; i < len; ++i) {
            sorted[i] = [];
        }

        for (i = 0, len = links.length; i < len; ++i) {
            link = links[i];
            sorted[link.pagenum - 1].push(link);
        }

        return sorted;
    }

    /**
     * Init window and document events
     * @returns {void}
     * @private
     */
    function initHandlers() {
        $(document).on('mouseup', handleMouseUp);
    }

    /**
     * Handler for linkclick messages
     * @returns {void}
     * @private
     */
    function handleLinkClick(data) {
        var event = api.fire('linkclick', data);
        if (!event.isDefaultPrevented()) {
            if (data.uri) {
                window.open(data.uri);
            } else if (data.destination) {
                api.scrollTo(data.destination.pagenum);
            }
        }
    }

    /**
     * Handle mouseup events
     * @returns {void}
     * @private
     */
    function handleMouseUp() {
        updateSelectedPages();
    }

    /**
     * Check if text is selected on any page, and if so, add a css class to that page
     * @returns {void}
     * @TODO(clakenen): this method currently only adds the selected class to one page,
     * so we should modify it to add the class to all pages with selected text
     * @private
     */
    function updateSelectedPages() {
        var node = util.getSelectedNode();
        var $page = $(node).closest('.'+CSS_CLASS_PAGE);
        $el.find('.'+CSS_CLASS_TEXT_SELECTED).removeClass(CSS_CLASS_TEXT_SELECTED);
        if (node && $el.has(node)) {
            $page.addClass(CSS_CLASS_TEXT_SELECTED);
        }
    }

    /**
     * Enable or disable the dragger given the `isDraggable` flag
     * @param   {Boolean} isDraggable Whether or not the layout is draggable
     * @returns {void}
     * @private
     */
    function updateDragger(isDraggable) {
        if (isDraggable) {
            if (!dragger) {
                $el.addClass(CSS_CLASS_DRAGGABLE);
                dragger = scope.createComponent('dragger');
                dragger.init(config.$viewport);
            }
        } else {
            if (dragger) {
                $el.removeClass(CSS_CLASS_DRAGGABLE);
                scope.destroyComponent(dragger);
                dragger = null;
            }
        }
    }

    /**
     * Validates and normalizes queryParams config option
     * @returns {void}
     */
    function validateQueryParams() {
        var queryString;
        if (config.queryParams) {
            if (typeof config.queryParams === 'string') {
                // strip '?' if it's there, because we add it below
                queryString = config.queryParams.replace(/^\?/, '');
            } else {
                queryString = util.param(config.queryParams);
            }
        }
        config.queryString = queryString ? '?' + queryString : '';
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        messages: [
            'asseterror',
            'destroy',
            'dragend',
            'dragstart',
            'fail',
            'layoutchange',
            'linkclick',
            'pagefail',
            'pagefocus',
            'pageload',
            'pageunload',
            'ready',
            'resize',
            'scrollstart',
            'scrollend',
            'zoom'
        ],

        /**
         * Handle framework messages
         * @param {string} name The name of the message
         * @param {any} data The related data for the message
         * @returns {void}
         */
        onmessage: function (name, data) {
            switch (name) {
                case 'layoutchange':
                    api.updateLayout();
                    break;

                case 'linkclick':
                    handleLinkClick(data);
                    break;

                case 'zoom':
                    // artificially adjust the reported zoom to be accuate given the page scale
                    data.zoom *= config.pageScale;
                    data.prevZoom *= config.pageScale;
                    if (config.enableDragging) {
                        updateDragger(data.isDraggable);
                    }

                    // forward zoom event to external event handlers
                    api.fire(name, data);
                    break;

                case 'dragstart':
                    if (!$el.hasClass(CSS_CLASS_DRAGGING)) {
                        $el.addClass(CSS_CLASS_DRAGGING);
                    }
                    // forward zoom event to external event handlers
                    api.fire(name, data);
                    break;

                case 'dragend':
                    if ($el.hasClass(CSS_CLASS_DRAGGING)) {
                        $el.removeClass(CSS_CLASS_DRAGGING);
                    }
                    // forward zoom event to external event handlers
                    api.fire(name, data);
                    break;

                default:
                    // forward subscribed framework messages to external event handlers
                    api.fire(name, data);
                    break;
            }
        },

        /**
         * Initialize the viewer api
         * @returns {void}
         */
        init: function () {
            config = scope.getConfig();
            api = config.api;

            // create a unique CSS namespace for this viewer instance
            config.namespace = CSS_CLASS_VIEWER + '-' + config.id;

            // Setup container
            $el = config.$el;

            // add crocodoc viewer and namespace classes
            $el.addClass(CSS_CLASS_VIEWER);
            $el.addClass(config.namespace);

            // add a / to the end of the base url if necessary
            if (config.url) {
                if (!/\/$/.test(config.url)) {
                    config.url += '/';
                }
            } else {
                throw new Error('no URL given for viewer assets');
            }

            if (browser.ielt9) {
                api.disableTextSelection();
            }

            // make the url absolute
            config.url = scope.getUtility('url').makeAbsolute(config.url);

            validateQueryParams();
            initViewerHTML();
            initPlugins();
        },

        /**
         * Destroy the viewer-base component
         * @returns {void}
         */
        destroy: function () {
            // remove document event handlers
            $(document).off('mouseup', handleMouseUp);

            // empty container and remove all class names that contain "crocodoc"
            $el.empty().removeClass(function (i, cls) {
                var match = cls.match(new RegExp('crocodoc\\S+', 'g'));
                return match && match.join(' ');
            });

            // remove the stylesheet
            $(stylesheetEl).remove();

            if ($assetsPromise) {
                $assetsPromise.abort();
            }
        },

        /**
         * Set the layout to the given mode, destroying and cleaning up the current
         * layout if there is one
         * @param  {string} layoutMode The layout mode
         * @returns {Layout} The layout object
         */
        setLayout: function (layoutMode) {
            var lastPage = config.page,
                lastZoom = config.zoom || 1,
                // create a layout component with the new layout config
                newLayout;

            // if there is already a layout, save some state
            if (layout) {
                // ignore this if we already have the specified layout
                if (layoutMode === config.layout) {
                    return layout;
                }
                lastPage = layout.state.currentPage;
                lastZoom = layout.state.zoomState;
            }

            newLayout = scope.createComponent('layout-' + layoutMode);
            if (!newLayout) {
                throw new Error('Invalid layout ' +  layoutMode);
            }

            // remove and destroy the existing layout component
            // @NOTE: this must be done after we decide if the
            // new layout exists!
            if (layout) {
                scope.destroyComponent(layout);
            }


            var previousLayoutMode = config.layout;
            config.layout = layoutMode;

            layout = newLayout;
            layout.init();
            layout.setZoom(lastZoom.zoomMode || lastZoom.zoom || lastZoom);
            layout.scrollTo(lastPage);

            config.currentLayout = layout;

            scope.broadcast('layoutchange', {
                // in the context of event data, `layout` and `previousLayout`
                // are actually the name of those layouts, and not the layout
                // objects themselves
                previousLayout: previousLayoutMode,
                layout: layoutMode
            });
            return layout;
        },

        /**
         * Load the metadata and css for this document
         * @returns {void}
         */
        loadAssets: function () {
            var $loadStylesheetPromise,
                $loadMetadataPromise,
                $pageOneContentPromise,
                $pageOneTextPromise;

            if ($assetsPromise) {
                return;
            }

            $loadMetadataPromise = scope.get('metadata');
            $loadMetadataPromise.then(function handleMetadataResponse(metadata) {
                config.metadata = metadata;
                validateConfig();
            });

            // don't load the stylesheet for IE < 9
            if (browser.ielt9) {
                stylesheetEl = util.insertCSS('');
                config.stylesheet = stylesheetEl.styleSheet;
                $loadStylesheetPromise = $.when('').promise({
                    abort: function () {}
                });
            } else {
                $loadStylesheetPromise = scope.get('stylesheet');
                $loadStylesheetPromise.then(function handleStylesheetResponse(cssText) {
                    stylesheetEl = util.insertCSS(cssText);
                    config.stylesheet = stylesheetEl.sheet;
                });
            }


            // load page 1 assets immediately if necessary
            if (config.autoloadFirstPage &&
                (!config.pageStart || config.pageStart === 1)) {
                if (support.svg) {
                    $pageOneContentPromise = scope.get('page-svg', 1);
                } else if (config.conversionIsComplete) {
                    // unfortunately, page-1.png is not necessarily available
                    // on View API's document.viewable event, so we can only
                    // prefetch page-1.png if conversion is complete
                    $pageOneContentPromise = scope.get('page-img', 1);
                }
                if (config.enableTextSelection) {
                    $pageOneTextPromise = scope.get('page-text', 1);
                }
            }

            // when both metatadata and stylesheet are done or if either fails...
            $assetsPromise = $.when($loadMetadataPromise, $loadStylesheetPromise)
                .fail(function (error) {
                    if ($assetsPromise) {
                        $assetsPromise.abort();
                    }
                    scope.ready();
                    scope.broadcast('asseterror', error);
                    scope.broadcast('fail', error);
                })
                .then(completeInit)
                .promise({
                    abort: function () {
                        $assetsPromise = null;
                        $loadMetadataPromise.abort();
                        $loadStylesheetPromise.abort();
                        if ($pageOneContentPromise) {
                            $pageOneContentPromise.abort();
                        }
                        if ($pageOneTextPromise) {
                            $pageOneTextPromise.abort();
                        }
                    }
                });
        }
    };
});


        return Crocodoc;
    }));
})(typeof window !== 'undefined' ? window : this);
