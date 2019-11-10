/*
    Copyright (c) 2011-2012 Ternary Labs. All Rights Reserved.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
*/

/*
# Websequencediagrams.com
participant abc.com
participant "iFrame proxy xyz.com"
participant "iFrame proxy abc.com"
participant "iFrame xyz.com"
abc.com->iFrame proxy xyz.com: postMessage(data, targetOrigin)
note left of "iFrame proxy xyz.com": Set url fragment and change size
iFrame proxy xyz.com->iFrame proxy xyz.com: onResize Event
note right of "iFrame proxy xyz.com": read url fragment
iFrame proxy xyz.com->iFrame xyz.com: forwardMessageEvent(event)
iFrame xyz.com->iFrame proxy abc.com: postMessage(data, targetOrigin)
note right of "iFrame proxy abc.com": Set url fragment and change size
iFrame proxy abc.com->iFrame proxy abc.com: onResize Event
note right of "iFrame proxy abc.com": read url fragment
iFrame proxy abc.com->abc.com: forwardMessageEvent(event)
*/

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(window){
    'use strict';
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    var PortholeClass = function(){};

    // Create a new Class that inherits from this class
    PortholeClass.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = PortholeClass.extend;

        return Class;
    };

    /**
     * @overview Porthole, JavaScript Library for Secure Cross Domain iFrame Communication.
     * @author <a href="mailto:georges@ternarylabs.com">Georges Auberger</a>
     * @copyright 2011-2012 Ternary Labs, All Rights Reserved.
     *
     * Namespace for Porthole
     * @module Porthole
     */
    var Porthole = {
        debug: false,

        /**
         * Utility function to trace to console
         * @private
         */
        trace: function(s) {
            if (this.debug && window.console !== undefined) {
                window.console.log('Porthole: ' + s);
            }
        },

        /**
         * Utility function to send errors to console
         * @private
         */
        error: function(s) {
            if (typeof window.console !== undefined && typeof window.console.error === 'function') {
                window.console.error('Porthole: ' + s);
            }
        }
    };

    /**
     * @class
     * @classdesc Proxy window object to post message to target window
     * @param {string} proxyIFrameUrl - Fully qualified url to proxy iframe, or null to create a receiver only window
     * @param {string} targetWindowName - Name of the proxy iframe window
     */
    Porthole.WindowProxy = function(){};

    Porthole.WindowProxy.prototype = {
        /**
         * Post a message to the target window only if the content comes from the target origin.
         * <code>targetOrigin</code> can be a url or *
         * @public
         * @param {Object} data - Payload
         * @param {String} targetOrigin
         */
        post: function(data, targetOrigin) {},
        /**
         * Add an event listener to receive messages.
         * @public
         * @param {Function} eventListenerCallback
         * @returns {Function} eventListenerCallback
         */
        addEventListener: function(f) {},
        /**
         * Remove an event listener.
         * @public
         * @param {Function} eventListenerCallback
         */
        removeEventListener: function(f) {}
    };

    Porthole.WindowProxyBase = PortholeClass.extend({
        init: function(targetWindowName) {
            if (targetWindowName === undefined) {
                targetWindowName = '';
            }
            this.targetWindowName = targetWindowName;
            this.origin = window.location.protocol + '//' + window.location.host;
            this.eventListeners = [];
        },

        getTargetWindowName: function() {
            return this.targetWindowName;
        },

        getOrigin: function() {
            return this.origin;
        },

        /**
         * Lookup window object based on target window name
         * @private
         * @return {string} targetWindow
         */
        getTargetWindow: function() {
            return Porthole.WindowProxy.getTargetWindow(this.targetWindowName);
        },

        post: function(data, targetOrigin) {
            if (targetOrigin === undefined) {
                targetOrigin = '*';
            }
            this.dispatchMessage({
                'data' : data,
                'sourceOrigin' : this.getOrigin(),
                'targetOrigin' : targetOrigin,
                'sourceWindowName' : window.name,
                'targetWindowName' : this.getTargetWindowName()
            });
        },

        addEventListener: function(f) {
            this.eventListeners.push(f);
            return f;
        },

        removeEventListener: function(f) {
            var index;
            try {
                index = this.eventListeners.indexOf(f);
                this.eventListeners.splice(index, 1);
            } catch(e) {
                this.eventListeners = [];
            }
        },

        dispatchEvent: function(event) {
            var i;
            for (i = 0; i < this.eventListeners.length; i++) {
                try {
                    this.eventListeners[i](event);
                } catch(e) {
                    Porthole.error(e);
                }
            }
        }
    });

    /**
     * Legacy browser implementation of proxy window object to post message to target window
     *
     * @private
     * @constructor
     * @param {string} proxyIFrameUrl - Fully qualified url to proxy iframe
     * @param {string} targetWindowName - Name of the proxy iframe window
     */
    Porthole.WindowProxyLegacy = Porthole.WindowProxyBase.extend({
        init: function(proxyIFrameUrl, targetWindowName) {
            this._super(targetWindowName);

            if (proxyIFrameUrl !== null) {
                this.proxyIFrameName = this.targetWindowName + 'ProxyIFrame';
                this.proxyIFrameLocation = proxyIFrameUrl;

                // Create the proxy iFrame and add to dom
                this.proxyIFrameElement = this.createIFrameProxy();
            } else {
                // Won't be able to send messages
                this.proxyIFrameElement = null;
                Porthole.trace("proxyIFrameUrl is null, window will be a receiver only");
                this.post = function(){ throw new Error("Receiver only window");};
            }
        },

        /**
         * Create an iframe and load the proxy
         *
         * @private
         * @returns iframe
         */
        createIFrameProxy: function() {
            var iframe = document.createElement('iframe');

            iframe.setAttribute('id', this.proxyIFrameName);
            iframe.setAttribute('name', this.proxyIFrameName);
            iframe.setAttribute('src', this.proxyIFrameLocation);
            // IE needs this otherwise resize event is not fired
            iframe.setAttribute('frameBorder', '1');
            iframe.setAttribute('scrolling', 'auto');
            // Need a certain size otherwise IE7 does not fire resize event
            iframe.setAttribute('width', 30);
            iframe.setAttribute('height', 30);
            iframe.setAttribute('style', 'position: absolute; left: -100px; top:0px;');
            // IE needs this because setting style attribute is broken. No really.
            if (iframe.style.setAttribute) {
                iframe.style.setAttribute('cssText', 'position: absolute; left: -100px; top:0px;');
            }
            document.body.appendChild(iframe);
            return iframe;
        },

        dispatchMessage: function(message) {
            var encode = window.encodeURIComponent;

            if (this.proxyIFrameElement) {
                var src = this.proxyIFrameLocation + '#' + encode(Porthole.WindowProxy.serialize(message));
                this.proxyIFrameElement.setAttribute('src', src);
                this.proxyIFrameElement.height = this.proxyIFrameElement.height > 50 ? 50 : 100;
            }
        }
    });

    /**
     * Implementation for modern browsers that supports it
     */
    Porthole.WindowProxyHTML5 = Porthole.WindowProxyBase.extend({
        init: function(proxyIFrameUrl, targetWindowName) {
            this._super(targetWindowName);
            this.eventListenerCallback = null;
        },

        dispatchMessage: function(message) {
            this.getTargetWindow().postMessage(Porthole.WindowProxy.serialize(message), message.targetOrigin);
        },

        addEventListener: function(f) {
            if (this.eventListeners.length === 0) {
                var self = this;
                if (window.addEventListener) {
                    this.eventListenerCallback = function(event) { self.eventListener(self, event); };
                    window.addEventListener('message', this.eventListenerCallback, false);
                } else if (window.attachEvent) {
                    // Make IE8 happy, just not that 1. postMessage only works for IFRAMES/FRAMES http://blogs.msdn.com/b/ieinternals/archive/2009/09/16/bugs-in-ie8-support-for-html5-postmessage-sessionstorage-and-localstorage.aspx
                    this.eventListenerCallback = function(event) { self.eventListener(self, window.event); };
                    window.attachEvent("onmessage", this.eventListenerCallback);
                }
            }
            return this._super(f);
        },

        removeEventListener: function(f) {
            this._super(f);

            if (this.eventListeners.length === 0) {
                if (window.removeEventListener) {
                    window.removeEventListener('message', this.eventListenerCallback);
                } else if (window.detachEvent) { // Make IE8, happy, see above
                    // see jquery, detachEvent needed property on element, by name of that event, to properly expose it to GC
                    if (typeof window.onmessage === 'undefined') window.onmessage = null;
                    window.detachEvent('onmessage', this.eventListenerCallback);
                }
                this.eventListenerCallback = null;
            }
        },

        eventListener: function(self, nativeEvent) {
            var data = Porthole.WindowProxy.unserialize(nativeEvent.data);
            if (data && (self.targetWindowName === '' || data.sourceWindowName == self.targetWindowName)) {
                self.dispatchEvent(new Porthole.MessageEvent(data.data, nativeEvent.origin, self));
            }
        }
    });

    if (!window.postMessage) {
        Porthole.trace('Using legacy browser support');
        Porthole.WindowProxy = Porthole.WindowProxyLegacy.extend({});
    } else {
        Porthole.trace('Using built-in browser support');
        Porthole.WindowProxy = Porthole.WindowProxyHTML5.extend({});
    }

    /**
     * Serialize an object using JSON.stringify
     *
     * @param {Object} obj The object to be serialized
     * @return {String}
     */
    Porthole.WindowProxy.serialize = function(obj) {
        if (typeof JSON === 'undefined') {
            throw new Error('Porthole serialization depends on JSON!');
        }

        return JSON.stringify(obj);
    };

    /**
     * Unserialize using JSON.parse
     *
     * @param {String} text Serialization
     * @return {Object}
     */
    Porthole.WindowProxy.unserialize =  function(text) {
        if (typeof JSON === 'undefined') {
            throw new Error('Porthole unserialization dependens on JSON!');
        }
        try {
            var json = JSON.parse(text);
        } catch (e) {
            return false;
        }
        return json;
    };

    Porthole.WindowProxy.getTargetWindow = function(targetWindowName) {
        if (targetWindowName === '') {
            return parent;
        } else if (targetWindowName === 'top' || targetWindowName === 'parent') {
            return window[targetWindowName];
        }
        return window.frames[targetWindowName];
    };

    /**
     * @classdesc Event object to be passed to registered event handlers
     * @class
     * @param {String} data
     * @param {String} origin - url of window sending the message
     * @param {Object} source - window object sending the message
     */
    Porthole.MessageEvent = function MessageEvent(data, origin, source) {
        this.data = data;
        this.origin = origin;
        this.source = source;
    };

    /**
     * @classdesc Dispatcher object to relay messages.
     * @public
     * @constructor
     */
    Porthole.WindowProxyDispatcher = {
        /**
         * Forward a message event to the target window
         * @private
         */
        forwardMessageEvent: function(e) {
            var message,
                decode = window.decodeURIComponent,
                targetWindow,
                windowProxy;

            if (document.location.hash.length > 0) {
                // Eat the hash character
                message = Porthole.WindowProxy.unserialize(decode(document.location.hash.substr(1)));

                targetWindow = Porthole.WindowProxy.getTargetWindow(message.targetWindowName);

                windowProxy =
                    Porthole.WindowProxyDispatcher.findWindowProxyObjectInWindow(
                        targetWindow,
                        message.sourceWindowName
                    );

                if (windowProxy) {
                    if (windowProxy.origin === message.targetOrigin || message.targetOrigin === '*') {
                        windowProxy.dispatchEvent(
                            new Porthole.MessageEvent(message.data, message.sourceOrigin, windowProxy));
                    } else {
                        Porthole.error('Target origin ' +
                            windowProxy.origin +
                            ' does not match desired target of ' +
                            message.targetOrigin);
                    }
                } else {
                    Porthole.error('Could not find window proxy object on the target window');
                }
            }
        },

        /**
         * Look for a window proxy object in the target window
         * @private
         */
        findWindowProxyObjectInWindow: function(w, sourceWindowName) {
            var i;

            if (w) {
                for (i in w) {
                    if (Object.prototype.hasOwnProperty.call(w, i)) {
                        try {
                            // Ensure that we're finding the proxy object
                            // that is declared to be targetting the window that is calling us
                            if (w[i] !== null &&
                                typeof w[i] === 'object' &&
                                w[i] instanceof w.Porthole.WindowProxy &&
                                w[i].getTargetWindowName() === sourceWindowName) {
                                return w[i];
                            }
                        } catch(e) {
                            // Swallow exception in case we access an object we shouldn't
                        }
                    }
                }
            }
            return null;
        },

        /**
         * Start a proxy to relay messages.
         * @public
         */
        start: function() {
            if (window.addEventListener) {
                window.addEventListener('resize',
                    Porthole.WindowProxyDispatcher.forwardMessageEvent,
                    false);
            } else if (window.attachEvent && window.postMessage !== 'undefined') {
                window.attachEvent('onresize',
                    Porthole.WindowProxyDispatcher.forwardMessageEvent);
            } else if (document.body.attachEvent) {
                window.attachEvent('onresize',
                    Porthole.WindowProxyDispatcher.forwardMessageEvent);
            } else {
                // Should never happen
                Porthole.error('Cannot attach resize event');
            }
        }
    };

    // Support testing in node.js:
    if (typeof exports !== 'undefined') {
        module.exports = Porthole;
    } else {
        window.Porthole = Porthole;
    }
})(typeof window !== "undefined" ? window : this);
