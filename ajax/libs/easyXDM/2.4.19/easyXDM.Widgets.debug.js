/**
 * easyXDM
 * http://easyxdm.net/
 * Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/*jslint browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM, window */
/**
 * easyXDM
 * http://easyxdm.net/
 * Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @class easyXDM.WidgetManager
 * A class for managing widgets.<br/>
 * Handles initializing widgets, and does all of the message distribution.
 <pre><code>
 _widgetManager = new easyXDM.WidgetManager({
 local: "../hash.html",
 container: document.getElementById("defaultcontainer")
 },function(){
 _widgetManager.addWidget("http://provider.easyxdm.net/example/widget.html",{});
 });
 </code></pre>
 * Widgets can by dynamically added using the addWidget method
 <pre><code>
 _widgetManager.addWidget("http://provider.easyxdm.net/example/widget.html",{
 container document.getElementById("widgetcontainer")
 });
 </code></pre>
 * @constructor
 * @param {Object} config The WidgetManagers configuration
 * @namespace easyXDM
 */
easyXDM.WidgetManager = function(config){
    var WidgetManager = this, _hashUrl = config.local, _channelNr = 0;
    var Events = {
        WidgetInitialized: "widgetinitialized",
        WidgetFailed: "widgetfailed"
    };
    var _widgets = {}, _subscribers = {};
    var _widgetSettings = {
        hosturl: location.href
    };
    easyXDM.apply(_widgetSettings, config.widgetSettings);
    var _container = config.container || document.body;
    
    /**
     * @private
     * Raises the specified event
     * @param {String} event The raised event
     * @param {Object} arg
     */
    function _raiseEvent(event, arg){
        if (config.listeners && config.listeners[event]) {
            config.listeners[event](WidgetManager, arg);
        }
    }
    
    /**
     * @private
     * Adds the widghet to the list of subscribers for the given topic
     * @param {String} url The widgets url
     * @param {String} topic The topic to subscribe to
     */
    function _subscribe(url, topic){
        if (!(topic in _subscribers)) {
            _subscribers[topic] = [];
        }
        _subscribers[topic].push(url);
    }
    
    /**
     * @private
     * Initialized the widget.<br/>
     * This is called after the widget has notified that it is ready.
     * @param {Object} widget The widget
     * @param {String} url The widgets url
     * @param {Object} widgetConfig The widgets configuration
     */
    function _initializeWidget(widget, url, widgetConfig){
        widget.initialize(_widgetSettings, function(response){
            if (response.isInitialized) {
                _widgets[url] = widget;
                var i = response.subscriptions.length;
                while (i--) {
                    _subscribe(url, response.subscriptions[i]);
                }
                _raiseEvent(Events.WidgetInitialized, {
                    url: url
                });
            }
            else {
                widget.destroy();
                _raiseEvent(Events.WidgetFailed, {
                    url: url
                });
            }
        });
    }
    
    /**
     * @private
     * Publishes the data to the topics subscribers
     * @param {String} url The senders url
     * @param {String} topic The datas topic
     * @param {Object} data The data to publish
     */
    function _publish(url, topic, data){
        var subscribers = _subscribers[topic];
        if (subscribers) {
            var i = subscribers.length, widgetUrl;
            while (i--) {
                widgetUrl = subscribers[i];
                if (widgetUrl !== url) {
                    _widgets[widgetUrl].send(url, topic, data);
                }
            }
        }
    }
    
    /**
     * @private
     * Sets up a new widget
     * @param {String} url The widgets url
     * @param {Object} widgetConfig The widgets configuration
     */
    function _setUpWidget(url, widgetConfig){
        var widget = new easyXDM.Rpc({
            channel: "widget" + _channelNr++,
            local: _hashUrl,
            remote: url,
            container: widgetConfig.container || _container,
            swf: config.swf,
            onReady: function(){
                _initializeWidget(widget, url, widgetConfig);
            }
        }, {
            local: {
                subscribe: {
                    isVoid: true,
                    method: function(topic){
                        _subscribe(url, topic);
                    }
                },
                publish: {
                    isVoid: true,
                    method: function(topic, data){
                        _publish(url, topic, data);
                    }
                }
            },
            remote: {
                initialize: {},
                send: {
                    isVoid: true
                }
            }
        });
    }
    
    /**
     * Adds a widget to the collection
     * @param {String} url The url to load the widget from
     * @param {Object} widgetConfig The widgets url
     */
    this.addWidget = function(url, widgetConfig){
        if (url in _widgets) {
            throw new Error("A widget with this url has already been initialized");
        }
        _setUpWidget(url, widgetConfig);
    };
    
    /**
     * Removes the widget
     * @param {Object} url
     */
    this.removeWidget = function(url){
        if (url in _widgets) {
            for (var topic in _subscribers) {
                if (_subscribers.hasOwnProperty(topic)) {
                    var subscribers = _subscribers[topic], i = subscribers.length;
                    while (i--) {
                        if (subscribers[i] === url) {
                            subscribers.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            _widgets[url].destroy();
            delete _widgets[url];
        }
    };
    
    /**
     * Publish data to a topics subscribers
     * @param {String} topic The topic to publish to
     * @param {Object} data The data to publish
     */
    this.publish = function(topic, data){
        _publish("", topic, data);
    };
    
    /**
     * Broadcasts data to all the widgets
     * @param {Object} data The data to broadcast
     */
    this.broadcast = function(data){
        for (var url in _widgets) {
            if (_widgets.hasOwnPropert(url)) {
                _widgets[url].send({
                    url: "",
                    topic: "broadcast",
                    data: data
                });
            }
        }
    };
};

/**
 * @class easyXDM.Widget
 * The base framework for creating widgets
 * @constructor
 * @param {Object} config The widgets configuration
 * @param {Function} onReady A method to run after the widget has been initialized.
 * @namespace easyXDM
 */
easyXDM.Widget = function(config){
    var _widget = this;
    var _incomingMessageHandler;
    var _widgetHost = new easyXDM.Rpc({
        swf: config.swf
    }, {
        remote: {
            subscribe: {
                isVoid: true
            },
            publish: {
                isVoid: true
            }
        },
        local: {
            initialize: {
                method: function(settings){
                    config.initialized(_widget, _widgetHost);
                    return {
                        isInitialized: true,
                        subscriptions: config.subscriptions
                    };
                }
            },
            send: {
                isVoid: true,
                method: function(url, topic, data){
                    _incomingMessageHandler(url, topic, data);
                }
            }
        }
    });
    
    /**
     * @private
     * Destroy the interface on unload
     */
    window.onunload = function(){
        _widgetHost.destroy();
    };
    
    /**
     * Publish data to subscribers to a topic
     * @param {String} topic The topic to publish to
     * @param {Object} data The data to publish
     */
    this.publish = function(topic, data){
        _widgetHost.publish(topic, data);
    };
    
    /**
     * Subscribe to a topic
     * @param {String} topic The topic to subscribe to
     */
    this.subscribe = function(topic){
        _widgetHost.subscribe(topic);
    };
    
    /**
     * Register the method that will handle incoming messages
     * @param {Function} fn The handler
     */
    this.registerMessageHandler = function(fn){
        _incomingMessageHandler = fn;
    };
    
    config.initialize(this, _widgetHost);
};
