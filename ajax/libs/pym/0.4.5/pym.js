/*! pym.js - v0.4.4 - 2015-07-16 */
/*
* Pym.js is library that resizes an iframe based on the width of the parent and the resulting height of the child.
* Check out the docs at http://blog.apps.npr.org/pym.js/ or the readme at README.md for usage.
*/

/* global module */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        window.pym = factory.call(this);
    }
})(function() {
    var MESSAGE_DELIMITER = 'xPYMx';

    var lib = {};

    /**
    * Generic function for parsing URL params.
    * Via http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    *
    * @method _getParameterByName
    * @param {String} name The name of the paramter to get from the URL.
    */
    var _getParameterByName = function(name) {
        var regex = new RegExp("[\\?&]" + name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]') + '=([^&#]*)');
        var results = regex.exec(location.search);

        if (results === null) {
            return '';
        }

        return decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    /**
     * Check the message to make sure it comes from an acceptable xdomain.
     * Defaults to '*' but can be overriden in config.
     *
     * @method _isSafeMessage
     * @param {Event} e The message event.
     * @param {Object} settings Configuration.
     */
    var _isSafeMessage = function(e, settings) {
        if (settings.xdomain !== '*') {
            // If origin doesn't match our xdomain, return.
            if (!e.origin.match(new RegExp(settings.xdomain + '$'))) { return; }
        }

        return true;
    };

    /**
     * Construct a message to send between frames.
     *
     * NB: We use string-building here because JSON message passing is
     * not supported in all browsers.
     *
     * @method _makeMessage
     * @param {String} id The unique id of the message recipient.
     * @param {String} messageType The type of message to send.
     * @param {String} message The message to send.
     */
    var _makeMessage = function(id, messageType, message) {
        var bits = ['pym', id, messageType, message];

        return bits.join(MESSAGE_DELIMITER);
    };

    /**
     * Construct a regex to validate and parse messages.
     *
     * @method _makeMessageRegex
     * @param {String} id The unique id of the message recipient.
     */
    var _makeMessageRegex = function(id) {
        var bits = ['pym', id, '(\\S+)', '(.+)'];

        return new RegExp('^' + bits.join(MESSAGE_DELIMITER) + '$');
    };

    /**
     * Initialize Pym for elements on page that have data-pym attributes.
     *
     * @method _autoInit
     */
    var _autoInit = function() {
        var elements = document.querySelectorAll(
            '[data-pym-src]:not([data-pym-auto-initialized])'
        );

        var length = elements.length;

        for (var idx = 0; idx < length; ++idx) {
            var element = elements[idx];

            /*
            * Mark automatically-initialized elements so they are not
            * re-initialized if the user includes pym.js more than once in the
            * same document.
            */
            element.setAttribute('data-pym-auto-initialized', '');

            // Ensure elements have an id
            if (element.id === '') {
                element.id = 'pym-' + idx;
            }

            var src = element.getAttribute('data-pym-src');
            var xdomain = element.getAttribute('data-pym-xdomain');
            var config = {};

            if (xdomain) {
               config.xdomain = xdomain;
            }

            new lib.Parent(element.id, src, config);
        }
    };

    /**
     * The Parent half of a response iframe.
     *
     * @class Parent
     * @param {String} id The id of the div into which the iframe will be rendered.
     * @param {String} url The url of the iframe source.
     * @param {Object} config Configuration to override the default settings.
     */
    lib.Parent = function(id, url, config) {
        this.id = id;
        this.url = url;
        this.el = document.getElementById(id);
        this.iframe = null;

        this.settings = {
            xdomain: '*'
        };

        this.messageRegex = _makeMessageRegex(this.id);
        this.messageHandlers = {};

        // ensure a config object
        config = (config || {});

        /**
         * Construct the iframe.
         *
         * @memberof Parent.prototype
         * @method _constructIframe
         */
        this._constructIframe = function() {
            // Calculate the width of this element.
            var width = this.el.offsetWidth.toString();

            // Create an iframe element attached to the document.
            this.iframe = document.createElement('iframe');

            // Save fragment id
            var hash = '';
            var hashIndex = this.url.indexOf('#');

            if (hashIndex > -1) {
                hash = this.url.substring(hashIndex, this.url.length);
                this.url = this.url.substring(0, hashIndex);
            }

            // If the URL contains querystring bits, use them.
            // Otherwise, just create a set of valid params.
            if (this.url.indexOf('?') < 0) {
                this.url += '?';
            } else {
                this.url += '&';
            }

            // Append the initial width as a querystring parameter, and the fragment id
            this.iframe.src = this.url +
                'initialWidth=' + width +
                '&childId=' + this.id +
                '&parentUrl=' + encodeURIComponent(window.location.href) +
                hash;

            // Set some attributes to this proto-iframe.
            this.iframe.setAttribute('width', '100%');
            this.iframe.setAttribute('scrolling', 'no');
            this.iframe.setAttribute('marginheight', '0');
            this.iframe.setAttribute('frameborder', '0');

            // Append the iframe to our element.
            this.el.appendChild(this.iframe);

            // Add an event listener that will handle redrawing the child on resize.
            window.addEventListener('resize', this._onResize);
        };

        /**
         * Send width on resize.
         *
         * @memberof Parent.prototype
         * @method _onResize
         */
        this._onResize = function() {
            this.sendWidth();
        }.bind(this);

        /**
         * Fire all event handlers for a given message type.
         *
         * @memberof Parent.prototype
         * @method _fire
         * @param {String} messageType The type of message.
         * @param {String} message The message data.
         */
        this._fire = function(messageType, message) {
            if (messageType in this.messageHandlers) {
                for (var i = 0; i < this.messageHandlers[messageType].length; i++) {
                   this.messageHandlers[messageType][i].call(this, message);
                }
            }
        };

        /**
         * Remove this parent from the page and unbind it's event handlers.
         *
         * @memberof Parent.prototype
         * @method remove
         */
        this.remove = function() {
            window.removeEventListener('message', this._processMessage);
            window.removeEventListener('resize', this._onResize);

            this.el.removeChild(this.iframe);
        };

        /**
         * @callback Parent~onMessageCallback
         * @param {String} message The message data.
         */

        /**
         * Process a new message from the child.
         *
         * @memberof Parent.prototype
         * @method _processMessage
         * @param {Event} e A message event.
         */
        this._processMessage = function(e) {
            // First, punt if this isn't from an acceptable xdomain.
            if (!_isSafeMessage(e, this.settings)) {
                return;
            }

            // Discard object messages, we only care about strings
            if (typeof e.data !== 'string') {
                return;
            }

            // Grab the message from the child and parse it.
            var match = e.data.match(this.messageRegex);

            // If there's no match or too many matches in the message, punt.
            if (!match || match.length !== 3) {
                return false;
            }

            var messageType = match[1];
            var message = match[2];

            this._fire(messageType, message);
        }.bind(this);

        /**
         * Resize iframe in response to new height message from child.
         *
         * @memberof Parent.prototype
         * @method _onHeightMessage
         * @param {String} message The new height.
         */
        this._onHeightMessage = function(message) {
            /*
             * Handle parent height message from child.
             */
            var height = parseInt(message);

            this.iframe.setAttribute('height', height + 'px');
        };

        /**
         * Navigate parent to a new url.
         *
         * @memberof Parent.prototype
         * @method _onNavigateToMessage
         * @param {String} message The url to navigate to.
         */
        this._onNavigateToMessage = function(message) {
            /*
             * Handle parent scroll message from child.
             */
             document.location.href = message;
        };

        /**
         * Bind a callback to a given messageType from the child.
         *
         * Reserved message names are: "height", "scrollTo" and "navigateTo".
         *
         * @memberof Parent.prototype
         * @method onMessage
         * @param {String} messageType The type of message being listened for.
         * @param {Parent~onMessageCallback} callback The callback to invoke when a message of the given type is received.
         */
        this.onMessage = function(messageType, callback) {
            if (!(messageType in this.messageHandlers)) {
                this.messageHandlers[messageType] = [];
            }

            this.messageHandlers[messageType].push(callback);
        };

        /**
         * Send a message to the the child.
         *
         * @memberof Parent.prototype
         * @method sendMessage
         * @param {String} messageType The type of message to send.
         * @param {String} message The message data to send.
         */
        this.sendMessage = function(messageType, message) {
            this.el.getElementsByTagName('iframe')[0].contentWindow.postMessage(_makeMessage(this.id, messageType, message), '*');
        };

        /**
         * Transmit the current iframe width to the child.
         *
         * You shouldn't need to call this directly.
         *
         * @memberof Parent.prototype
         * @method sendWidth
         */
        this.sendWidth = function() {
            var width = this.el.offsetWidth.toString();

            this.sendMessage('width', width);
        };

        // Add any overrides to settings coming from config.
        for (var key in config) {
            this.settings[key] = config[key];
        }

        // Bind required message handlers
        this.onMessage('height', this._onHeightMessage);
        this.onMessage('navigateTo', this._onNavigateToMessage);

        // Add a listener for processing messages from the child.
        window.addEventListener('message', this._processMessage, false);

        // Construct the iframe in the container element.
        this._constructIframe();

        return this;
    };

    /**
     * The Child half of a responsive iframe.
     *
     * @class Child
     * @param {Object} config Configuration to override the default settings.
     */
    lib.Child = function(config) {
        this.parentWidth = null;
        this.id = null;
        this.parentUrl = null;

        this.settings = {
            renderCallback: null,
            xdomain: '*',
            polling: 0
        };

        this.messageRegex = null;
        this.messageHandlers = {};

        // Ensure a config object
        config = (config || {});

        /**
         * Bind a callback to a given messageType from the child.
         *
         * Reserved message names are: "width".
         *
         * @memberof Child.prototype
         * @method onMessage
         * @param {String} messageType The type of message being listened for.
         * @param {Child~onMessageCallback} callback The callback to invoke when a message of the given type is received.
         */
        this.onMessage = function(messageType, callback) {
            if (!(messageType in this.messageHandlers)) {
                this.messageHandlers[messageType] = [];
            }

            this.messageHandlers[messageType].push(callback);
        };

        /**
         * @callback Child~onMessageCallback
         * @param {String} message The message data.
         */

        /**
         * Fire all event handlers for a given message type.
         *
         * @memberof Parent.prototype
         * @method _fire
         * @param {String} messageType The type of message.
         * @param {String} message The message data.
         */
        this._fire = function(messageType, message) {
            /*
             * Fire all event handlers for a given message type.
             */
            if (messageType in this.messageHandlers) {
                for (var i = 0; i < this.messageHandlers[messageType].length; i++) {
                   this.messageHandlers[messageType][i].call(this, message);
                }
            }
        };

        /**
         * Process a new message from the parent.
         *
         * @memberof Child.prototype
         * @method _processMessage
         * @param {Event} e A message event.
         */
        this._processMessage = function(e) {
            /*
            * Process a new message from parent frame.
            */
            // First, punt if this isn't from an acceptable xdomain.
            if (!_isSafeMessage(e, this.settings)) {
                return;
            }

            // Discard object messages, we only care about strings
            if (typeof e.data !== 'string') {
                return;
            }

            // Get the message from the parent.
            var match = e.data.match(this.messageRegex);

            // If there's no match or it's a bad format, punt.
            if (!match || match.length !== 3) { return; }

            var messageType = match[1];
            var message = match[2];

            this._fire(messageType, message);
        }.bind(this);

        /**
         * Resize iframe in response to new width message from parent.
         *
         * @memberof Child.prototype
         * @method _onWidthMessage
         * @param {String} message The new width.
         */
        this._onWidthMessage = function(message) {
            /*
             * Handle width message from the child.
             */
            var width = parseInt(message);

            // Change the width if it's different.
            if (width !== this.parentWidth) {
                this.parentWidth = width;

                // Call the callback function if it exists.
                if (this.settings.renderCallback) {
                    this.settings.renderCallback(width);
                }

                // Send the height back to the parent.
                this.sendHeight();
            }
        };

        /**
         * Send a message to the the Parent.
         *
         * @memberof Child.prototype
         * @method sendMessage
         * @param {String} messageType The type of message to send.
         * @param {String} message The message data to send.
         */
        this.sendMessage = function(messageType, message) {
            /*
             * Send a message to the parent.
             */
            window.parent.postMessage(_makeMessage(this.id, messageType, message), '*');
        };

        /**
         * Transmit the current iframe height to the parent.
         *
         * Call this directly in cases where you manually alter the height of the iframe contents.
         *
         * @memberof Child.prototype
         * @method sendHeight
         */
        this.sendHeight = function() {
            // Get the child's height.
            var height = document.getElementsByTagName('body')[0].offsetHeight.toString();

            // Send the height to the parent.
            this.sendMessage('height', height);
        }.bind(this);

        /**
         * Scroll parent to a given element id.
         *
         * @memberof Child.prototype
         * @method scrollParentTo
         * @param {String} hash The id of the element to scroll to.
         */
        this.scrollParentTo = function(hash) {
            this.sendMessage('navigateTo', '#' + hash);
        };

        /**
         * Navigate parent to a given url.
         *
         * @memberof Parent.prototype
         * @method navigateParentTo
         * @param {String} url The url to navigate to.
         */
        this.navigateParentTo = function(url) {
            this.sendMessage('navigateTo', url);
        };

        // Identify what ID the parent knows this child as.
        this.id = _getParameterByName('childId') || config.id;
        this.messageRegex = new RegExp('^pym' + MESSAGE_DELIMITER + this.id + MESSAGE_DELIMITER + '(\\S+)' + MESSAGE_DELIMITER + '(.+)$');

        // Get the initial width from a URL parameter.
        var width = parseInt(_getParameterByName('initialWidth'));

        // Get the url of the parent frame
        this.parentUrl = _getParameterByName('parentUrl');

        // Bind the required message handlers
        this.onMessage('width', this._onWidthMessage);

        // Initialize settings with overrides.
        for (var key in config) {
            this.settings[key] = config[key];
        }

        // Set up a listener to handle any incoming messages.
        window.addEventListener('message', this._processMessage, false);

        // If there's a callback function, call it.
        if (this.settings.renderCallback) {
            this.settings.renderCallback(width);
        }

        // Send the initial height to the parent.
        this.sendHeight();

        // If we're configured to poll, create a setInterval to handle that.
        if (this.settings.polling) {
            window.setInterval(this.sendHeight, this.settings.polling);
        }

        return this;
    };

    // Initialize elements with pym data attributes
    _autoInit();

    return lib;
});
