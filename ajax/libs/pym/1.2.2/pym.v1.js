/*! pym.js - v1.2.2 - 2017-05-20 */
/*
* Pym.js is library that resizes an iframe based on the width of the parent and the resulting height of the child.
* Check out the docs at http://blog.apps.npr.org/pym.js/ or the readme at README.md for usage.
*/

/** @module pym */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    }
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        window.pym = factory.call(this);
    }
})(function() {
    var MESSAGE_DELIMITER = 'xPYMx';

    var lib = {};

    /**
    * Create and dispatch a custom pym event
    *
    * @method _raiseCustomEvent
    * @inner
    *
    * @param {String} eventName
    */
   var _raiseCustomEvent = function(eventName) {
     var event = document.createEvent('Event');
     event.initEvent('pym:' + eventName, true, true);
     document.dispatchEvent(event);
   };

    /**
    * Generic function for parsing URL params.
    * Via http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    *
    * @method _getParameterByName
    * @inner
    *
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
     * @inner
     *
     * @param {Event} e The message event.
     * @param {Object} settings Configuration.
     */
    var _isSafeMessage = function(e, settings) {
        if (settings.xdomain !== '*') {
            // If origin doesn't match our xdomain, return.
            if (!e.origin.match(new RegExp(settings.xdomain + '$'))) { return; }
        }

        // Ignore events that do not carry string data #151
        if (typeof e.data !== 'string') { return; }

        return true;
    };

    /**
     * Construct a message to send between frames.
     *
     * NB: We use string-building here because JSON message passing is
     * not supported in all browsers.
     *
     * @method _makeMessage
     * @inner
     *
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
     * @inner
     *
     * @param {String} id The unique id of the message recipient.
     */
    var _makeMessageRegex = function(id) {
        var bits = ['pym', id, '(\\S+)', '(.*)'];

        return new RegExp('^' + bits.join(MESSAGE_DELIMITER) + '$');
    };

    /**
     * Clean autoInit Instances: those that point to contentless iframes
     * @method _cleanAutoInitInstances
     * @inner
     */
    var _cleanAutoInitInstances = function() {
        var length = lib.autoInitInstances.length;

        // Loop backwards to avoid index issues
        for (var idx = length - 1; idx >= 0; idx--) {
            var instance = lib.autoInitInstances[idx];
            // If instance has been removed or is contentless then remove it
            if (instance.el.getElementsByTagName('iframe').length &&
                instance.el.getElementsByTagName('iframe')[0].contentWindow) {
                continue;
            }
            else {
                // Remove the reference to the removed or orphan instance
                lib.autoInitInstances.splice(idx,1);
            }
        }
    };

    /**
     * Store auto initialized Pym instances for further reference
     * @name module:pym#autoInitInstances
     * @type Array
     * @default []
     */
    lib.autoInitInstances = [];

    /**
     * Initialize Pym for elements on page that have data-pym attributes.
     * Expose autoinit in case we need to call it from the outside
     * @instance
     * @method autoInit
     * @param {Boolean} doNotRaiseEvents flag to avoid sending custom events
     */
    lib.autoInit = function(doNotRaiseEvents) {
        var elements = document.querySelectorAll('[data-pym-src]:not([data-pym-auto-initialized])');
        var length = elements.length;

        // Clean stored instances in case needed
        _cleanAutoInitInstances();
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
                element.id = 'pym-' + idx + "-" + Math.random().toString(36).substr(2,5);
            }

            var src = element.getAttribute('data-pym-src');

            // List of data attributes to configure the component
            // structure: {'attribute name': 'type'}
            var settings = {'xdomain': 'string', 'title': 'string', 'name': 'string', 'id': 'string',
                            'sandbox': 'string', 'allowfullscreen': 'boolean',
                            'parenturlparam': 'string', 'parenturlvalue': 'string',
                            'optionalparams': 'boolean'};

            var config = {};

            for (var attribute in settings) {
                // via https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute#Notes
               if (element.getAttribute('data-pym-'+attribute) !== null) {
                  switch (settings[attribute]) {
                    case 'boolean':
                       config[attribute] = !(element.getAttribute('data-pym-'+attribute) === 'false'); // jshint ignore:line
                       break;
                    case 'string':
                       config[attribute] = element.getAttribute('data-pym-'+attribute);
                       break;
                    default:
                       console.err('unrecognized attribute type');
                  }
               }
            }

            // Store references to autoinitialized pym instances
            var parent = new lib.Parent(element.id, src, config);
            lib.autoInitInstances.push(parent);
        }

        // Fire customEvent
        if (!doNotRaiseEvents) {
            _raiseCustomEvent("pym-initialized");
        }
        // Return stored autoinitalized pym instances
        return lib.autoInitInstances;
    };

    /**
     * The Parent half of a response iframe.
     *
     * @memberof module:pym
     * @class Parent
     * @param {String} id The id of the div into which the iframe will be rendered. sets {@link module:pym.Parent~id}
     * @param {String} url The url of the iframe source. sets {@link module:pym.Parent~url}
     * @param {Object} [config] Configuration for the parent instance. sets {@link module:pym.Parent~settings}
     * @param {string} [config.xdomain='*'] - xdomain to validate messages received
     * @param {string} [config.title] - if passed it will be assigned to the iframe title attribute
     * @param {string} [config.name] - if passed it will be assigned to the iframe name attribute
     * @param {string} [config.id] - if passed it will be assigned to the iframe id attribute
     * @param {boolean} [config.allowfullscreen] - if passed and different than false it will be assigned to the iframe allowfullscreen attribute
     * @param {string} [config.sandbox] - if passed it will be assigned to the iframe sandbox attribute (we do not validate the syntax so be careful!!)
     * @param {string} [config.parenturlparam] - if passed it will be override the default parentUrl query string parameter name passed to the iframe src
     * @param {string} [config.parenturlvalue] - if passed it will be override the default parentUrl query string parameter value passed to the iframe src
     * @param {string} [config.optionalparams] - if passed and different than false it will strip the querystring params parentUrl and parentTitle passed to the iframe src
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe iFrame}
     */
    lib.Parent = function(id, url, config) {
        /**
         * The id of the container element
         *
         * @memberof module:pym.Parent
         * @member {string} id
         * @inner
         */
        this.id = id;
        /**
         * The url that will be set as the iframe's src
         *
         * @memberof module:pym.Parent
         * @member {String} url
         * @inner
         */
        this.url = url;

        /**
         * The container DOM object
         *
         * @memberof module:pym.Parent
         * @member {HTMLElement} el
         * @inner
         */
        this.el = document.getElementById(id);
        /**
         * The contained child iframe
         *
         * @memberof module:pym.Parent
         * @member {HTMLElement} iframe
         * @inner
         * @default null
         */
        this.iframe = null;
        /**
         * The parent instance settings, updated by the values passed in the config object
         *
         * @memberof module:pym.Parent
         * @member {Object} settings
         * @inner
         */
        this.settings = {
            xdomain: '*',
            optionalparams: true,
            parenturlparam: 'parentUrl',
            parenturlvalue: window.location.href
        };
        /**
         * RegularExpression to validate the received messages
         *
         * @memberof module:pym.Parent
         * @member {String} messageRegex
         * @inner
         */
        this.messageRegex = _makeMessageRegex(this.id);
        /**
         * Stores the registered messageHandlers for each messageType
         *
         * @memberof module:pym.Parent
         * @member {Object} messageHandlers
         * @inner
         */
        this.messageHandlers = {};

        // ensure a config object
        config = (config || {});

        /**
         * Construct the iframe.
         *
         * @memberof module:pym.Parent
         * @method _constructIframe
         * @inner
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

            // Append the initial width as a querystring parameter
            // and optional params if configured to do so
            this.iframe.src = this.url + 'initialWidth=' + width +
                                         '&childId=' + this.id;

            if (this.settings.optionalparams) {
                this.iframe.src += '&parentTitle=' + encodeURIComponent(document.title);
                this.iframe.src += '&'+ this.settings.parenturlparam + '=' + encodeURIComponent(this.settings.parenturlvalue);
            }
            this.iframe.src +=hash;

            // Set some attributes to this proto-iframe.
            this.iframe.setAttribute('width', '100%');
            this.iframe.setAttribute('scrolling', 'no');
            this.iframe.setAttribute('marginheight', '0');
            this.iframe.setAttribute('frameborder', '0');

            if (this.settings.title) {
                this.iframe.setAttribute('title', this.settings.title);
            }

            if (this.settings.allowfullscreen !== undefined && this.settings.allowfullscreen !== false) {
                this.iframe.setAttribute('allowfullscreen','');
            }

            if (this.settings.sandbox !== undefined && typeof this.settings.sandbox === 'string') {
                this.iframe.setAttribute('sandbox', this.settings.sandbox);
            }

            if (this.settings.id) {
                if (!document.getElementById(this.settings.id)) {
                    this.iframe.setAttribute('id', this.settings.id);
                }
            }

            if (this.settings.name) {
                this.iframe.setAttribute('name', this.settings.name);
            }

            // Replace the child content if needed
            // (some CMSs might strip out empty elements)
            while(this.el.firstChild) { this.el.removeChild(this.el.firstChild); }
            // Append the iframe to our element.
            this.el.appendChild(this.iframe);

            // Add an event listener that will handle redrawing the child on resize.
            window.addEventListener('resize', this._onResize);
        };

        /**
         * Send width on resize.
         *
         * @memberof module:pym.Parent
         * @method _onResize
         * @inner
         */
        this._onResize = function() {
            this.sendWidth();
        }.bind(this);

        /**
         * Fire all event handlers for a given message type.
         *
         * @memberof module:pym.Parent
         * @method _fire
         * @inner
         *
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
         * @memberof module:pym.Parent
         * @method remove
         * @instance
         */
        this.remove = function() {
            window.removeEventListener('message', this._processMessage);
            window.removeEventListener('resize', this._onResize);

            this.el.removeChild(this.iframe);
            // _cleanAutoInitInstances in case this parent was autoInitialized
            _cleanAutoInitInstances();
        };

        /**
         * Process a new message from the child.
         *
         * @memberof module:pym.Parent
         * @method _processMessage
         * @inner
         *
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
         * @memberof module:pym.Parent
         * @method _onHeightMessage
         * @inner
         *
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
         * @memberof module:pym.Parent
         * @method _onNavigateToMessage
         * @inner
         *
         * @param {String} message The url to navigate to.
         */
        this._onNavigateToMessage = function(message) {
            /*
             * Handle parent scroll message from child.
             */
            document.location.href = message;
        };

        /**
         * Scroll parent to a given child position.
         *
         * @memberof module:pym.Parent
         * @method _onScrollToChildPosMessage
         * @inner
         *
         * @param {String} message The offset inside the child page.
         */
        this._onScrollToChildPosMessage = function(message) {
            // Get the child container position using getBoundingClientRect + pageYOffset
            // via https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
            var iframePos = document.getElementById(this.id).getBoundingClientRect().top + window.pageYOffset;

            var totalOffset = iframePos + parseInt(message);
            window.scrollTo(0, totalOffset);
        };

        /**
         * Bind a callback to a given messageType from the child.
         *
         * Reserved message names are: "height", "scrollTo" and "navigateTo".
         *
         * @memberof module:pym.Parent
         * @method onMessage
         * @instance
         *
         * @param {String} messageType The type of message being listened for.
         * @param {module:pym.Parent~onMessageCallback} callback The callback to invoke when a message of the given type is received.
         */
        this.onMessage = function(messageType, callback) {
            if (!(messageType in this.messageHandlers)) {
                this.messageHandlers[messageType] = [];
            }

            this.messageHandlers[messageType].push(callback);
        };

        /**
         * @callback module:pym.Parent~onMessageCallback
         * @param {String} message The message data.
         */

        /**
         * Send a message to the the child.
         *
         * @memberof module:pym.Parent
         * @method sendMessage
         * @instance
         *
         * @param {String} messageType The type of message to send.
         * @param {String} message The message data to send.
         */
        this.sendMessage = function(messageType, message) {
            // When used alongside with pjax some references are lost
            if (this.el.getElementsByTagName('iframe').length) {
                if (this.el.getElementsByTagName('iframe')[0].contentWindow) {
                    this.el.getElementsByTagName('iframe')[0].contentWindow
                        .postMessage(_makeMessage(this.id, messageType, message), '*');
                }
                else {
                    // Contentless child detected remove listeners and iframe
                    this.remove();
                }
            }
        };

        /**
         * Transmit the current iframe width to the child.
         *
         * You shouldn't need to call this directly.
         *
         * @memberof module:pym.Parent
         * @method sendWidth
         * @instance
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
        this.onMessage('scrollToChildPos', this._onScrollToChildPosMessage);

        // Add a listener for processing messages from the child.
        window.addEventListener('message', this._processMessage, false);

        // Construct the iframe in the container element.
        this._constructIframe();

        return this;
    };

    /**
     * The Child half of a responsive iframe.
     *
     * @memberof module:pym
     * @class Child
     * @param {Object} [config] Configuration for the child instance. sets {@link module:pym.Child~settings}
     * @param {function} [config.renderCallback=null] Callback invoked after receiving a resize event from the parent, sets {@link module:pym.Child#settings.renderCallback}
     * @param {string} [config.xdomain='*'] - xdomain to validate messages received
     * @param {number} [config.polling=0] - polling frequency in milliseconds to send height to parent
     * @param {number} [config.id] - parent container id used when navigating the child iframe to a new page but we want to keep it responsive.
     * @param {string} [config.parenturlparam] - if passed it will be override the default parentUrl query string parameter name expected on the iframe src
     */
    lib.Child = function(config) {
        /**
         * The initial width of the parent page
         *
         * @memberof module:pym.Child
         * @member {string} parentWidth
         * @inner
         */
        this.parentWidth = null;
        /**
         * The id of the parent container
         *
         * @memberof module:pym.Child
         * @member {String} id
         * @inner
         */
        this.id = null;
        /**
         * The title of the parent page from document.title.
         *
         * @memberof module:pym.Child
         * @member {String} parentTitle
         * @inner
         */
        this.parentTitle = null;
        /**
         * The URL of the parent page from window.location.href.
         *
         * @memberof module:pym.Child
         * @member {String} parentUrl
         * @inner
         */
        this.parentUrl = null;
        /**
         * The settings for the child instance. Can be overriden by passing a config object to the child constructor
         * i.e.: var pymChild = new pym.Child({renderCallback: render, xdomain: "\\*\.npr\.org"})
         *
         * @memberof module:pym.Child.settings
         * @member {Object} settings - default settings for the child instance
         * @inner
         */
        this.settings = {
            renderCallback: null,
            xdomain: '*',
            polling: 0,
            parenturlparam: 'parentUrl'
        };

        /**
         * The timerId in order to be able to stop when polling is enabled
         *
         * @memberof module:pym.Child
         * @member {String} timerId
         * @inner
         */
        this.timerId = null;
        /**
         * RegularExpression to validate the received messages
         *
         * @memberof module:pym.Child
         * @member {String} messageRegex
         * @inner
         */
        this.messageRegex = null;
        /**
         * Stores the registered messageHandlers for each messageType
         *
         * @memberof module:pym.Child
         * @member {Object} messageHandlers
         * @inner
         */
        this.messageHandlers = {};

        // Ensure a config object
        config = (config || {});

        /**
         * Bind a callback to a given messageType from the child.
         *
         * Reserved message names are: "width".
         *
         * @memberof module:pym.Child
         * @method onMessage
         * @instance
         *
         * @param {String} messageType The type of message being listened for.
         * @param {module:pym.Child~onMessageCallback} callback The callback to invoke when a message of the given type is received.
         */
        this.onMessage = function(messageType, callback) {

            if (!(messageType in this.messageHandlers)) {
                this.messageHandlers[messageType] = [];
            }

            this.messageHandlers[messageType].push(callback);
        };

        /**
         * @callback module:pym.Child~onMessageCallback
         * @param {String} message The message data.
         */


        /**
         * Fire all event handlers for a given message type.
         *
         * @memberof module:pym.Child
         * @method _fire
         * @inner
         *
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
         * @memberof module:pym.Child
         * @method _processMessage
         * @inner
         *
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
         * @memberof module:pym.Child
         * @method _onWidthMessage
         * @inner
         *
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
         * @memberof module:pym.Child
         * @method sendMessage
         * @instance
         *
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
         * @memberof module:pym.Child
         * @method sendHeight
         * @instance
         */
        this.sendHeight = function() {
            // Get the child's height.
            var height = document.getElementsByTagName('body')[0].offsetHeight.toString();

            // Send the height to the parent.
            this.sendMessage('height', height);

            return height;
        }.bind(this);

        /**
         * Scroll parent to a given element id.
         *
         * @memberof module:pym.Child
         * @method scrollParentTo
         * @instance
         *
         * @param {String} hash The id of the element to scroll to.
         */
        this.scrollParentTo = function(hash) {
            this.sendMessage('navigateTo', '#' + hash);
        };

        /**
         * Navigate parent to a given url.
         *
         * @memberof module:pym.Child
         * @method navigateParentTo
         * @instance
         *
         * @param {String} url The url to navigate to.
         */
        this.navigateParentTo = function(url) {
            this.sendMessage('navigateTo', url);
        };

        /**
         * Scroll parent to a given child element id.
         *
         * @memberof module:pym.Child
         * @method scrollParentToChildEl
         * @instance
         *
         * @param {String} id The id of the child element to scroll to.
         */
        this.scrollParentToChildEl = function(id) {
            // Get the child element position using getBoundingClientRect + pageYOffset
            // via https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
            var topPos = document.getElementById(id).getBoundingClientRect().top + window.pageYOffset;
            this.scrollParentToChildPos(topPos);
        };

        /**
         * Scroll parent to a particular child offset.
         *
         * @memberof module:pym.Child
         * @method scrollParentToChildPos
         * @instance
         *
         * @param {Number} pos The offset of the child element to scroll to.
         */
        this.scrollParentToChildPos = function(pos) {
            this.sendMessage('scrollToChildPos', pos.toString());
        };

        /**
         * Mark Whether the child is embedded or not
         * executes a callback in case it was passed to the config
         *
         * @memberof module:pym.Child
         * @method _markWhetherEmbedded
         * @inner
         *
         * @param {module:pym.Child~onMarkedEmbeddedStatus} The callback to execute after determining whether embedded or not.
         */
        var _markWhetherEmbedded = function(onMarkedEmbeddedStatus) {
          var htmlElement = document.getElementsByTagName('html')[0],
              newClassForHtml,
              originalHtmlClasses = htmlElement.className;
          try {
            if(window.self !== window.top) {
              newClassForHtml = "embedded";
            }else{
              newClassForHtml = "not-embedded";
            }
          }catch(e) {
            newClassForHtml = "embedded";
          }
          if(originalHtmlClasses.indexOf(newClassForHtml) < 0) {
            htmlElement.className = originalHtmlClasses ? originalHtmlClasses + ' ' + newClassForHtml : newClassForHtml;
            if(onMarkedEmbeddedStatus){
              onMarkedEmbeddedStatus(newClassForHtml);
            }
            _raiseCustomEvent("marked-embedded");
          }
        };

        /**
         * @callback module:pym.Child~onMarkedEmbeddedStatus
         * @param {String} classname "embedded" or "not-embedded".
         */

        /**
         * Unbind child event handlers and timers.
         *
         * @memberof module:pym.Child
         * @method remove
         * @instance
         */
        this.remove = function() {
            window.removeEventListener('message', this._processMessage);
            if (this.timerId) {
                clearInterval(this.timerId);
            }
        };

        // Initialize settings with overrides.
        for (var key in config) {
            this.settings[key] = config[key];
        }

        // Identify what ID the parent knows this child as.
        this.id = _getParameterByName('childId') || config.id;
        this.messageRegex = new RegExp('^pym' + MESSAGE_DELIMITER + this.id + MESSAGE_DELIMITER + '(\\S+)' + MESSAGE_DELIMITER + '(.*)$');

        // Get the initial width from a URL parameter.
        var width = parseInt(_getParameterByName('initialWidth'));

        // Get the url of the parent frame
        this.parentUrl = _getParameterByName(this.settings.parenturlparam);

        // Get the title of the parent frame
        this.parentTitle = _getParameterByName('parentTitle');

        // Bind the required message handlers
        this.onMessage('width', this._onWidthMessage);

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
            this.timerId = window.setInterval(this.sendHeight, this.settings.polling);
        }

        _markWhetherEmbedded(config.onMarkedEmbeddedStatus);

        return this;
    };

    // Initialize elements with pym data attributes
    // if we are not in server configuration
    if(typeof document !== "undefined") {
        lib.autoInit(true);
    }

    return lib;
});

