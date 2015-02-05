/*! xively-js v1.0.4 | Copyright Xively (LogMeIn Inc.) | BSD 3-Clause license */
(function() {
    "use strict";
    // Save a reference to the global object
    var root = this, // Allow use of jQuery, Zepto or ender with Xively.js in the style of Backbone
    $ = root.jQuery || root.Zepto || root.ender || root.$, protocol = function() {
        return document.location.protocol === "https:" ? "https:" : "http:";
    }, // Wraps all socket connection and message sending logic
    SocketTransport = function(apiHost) {
        var self = this, socket = false, socketReady = false, queue = [], execute = function(arr) {
            if (typeof arr === "function") {
                arr.apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (Object.prototype.toString.apply(arr) === "[object Array]") {
                var x = arr.length;
                while (x--) {
                    arr[x].apply(this, Array.prototype.slice.call(arguments, 1));
                }
            }
        };
        this.connect = function(callback) {
            var SocketProvider = window.SockJS || window.MozWebSocket || window.WebSocket, socketEndpoint, socketPort;
            if (!socket && SocketProvider) {
                if (window.SockJS) {
                    socketPort = protocol() === "https:" ? 8093 : 8082;
                    // TODO: double-check these ports are right
                    socketEndpoint = protocol() + "//" + apiHost + ":" + socketPort + "/sockjs";
                } else {
                    socketPort = protocol() === "https:" ? 8094 : 8080;
                    // TODO: double-check these ports are right
                    socketEndpoint = (protocol() === "https:" ? "wss:" : "ws:") + "//" + apiHost + ":" + socketPort;
                }
                socket = new SocketProvider(socketEndpoint);
                socket.onerror = function(e) {
                    if (self.error) {
                        self.error(e, this);
                    }
                    self.connect();
                };
                socket.onclose = function(e) {
                    if (self.close) {
                        self.close(e, this);
                    }
                    self.connect();
                };
                socket.onopen = function(e) {
                    socketReady = true;
                    if (self.open) {
                        self.open(e, this);
                    }
                    if (queue.length) {
                        execute(queue);
                    }
                    if (callback) {
                        callback(this);
                    }
                };
                socket.onmessage = function(e) {
                    var data = e.data, response = JSON.parse(data);
                    if (response.body) {
                        $("body").trigger("xively." + response.resource, response.body);
                    }
                };
            }
        };
        this.send = function(message) {
            if (!socketReady) {
                this.connect();
                queue.push(function() {
                    socket.send(message);
                });
            } else {
                socket.send(message);
            }
        };
    };
    // Main Xively client object
    var XivelyClient = function(apiHost) {
        // set the default api host
        apiHost = apiHost || "api.xively.com";
        // private stuff
        var self = this, version = "1.0.4", apiEndpoint = protocol() + "//" + apiHost + "/v2", cacheRequest = false, apiKey, // var which will hold the public API we are going to expose
        methods, // log helper method that doesn't break in environments without console.log
        log = function(msg) {
            if (window.console && window.console.log) {
                window.console.log(msg);
            }
        }, // Ajax request
        request = function(options) {
            var settings = $.extend({
                type: "get"
            }, options);
            if (!apiKey) {
                return log("(xivelyJS) ::: No API key ::: Set your API key first with xively.setKey( YOUR_API_KEY ) before using any methods. Check docs for more info.");
            }
            if (!settings.url) {
                return;
            }
            settings.type = settings.type.toUpperCase();
            if (settings.type === "PUT" || settings.type === "POST") {
                if (!settings.data || typeof settings.data !== "object") {
                    return;
                } else {
                    settings.data = JSON.stringify(settings.data);
                }
            }
            $.ajax({
                url: settings.url,
                type: settings.type,
                headers: {
                    "X-ApiKey": apiKey,
                    "Content-Type": "application/json"
                },
                data: settings.data,
                crossDomain: true,
                dataType: "json",
                cache: cacheRequest
            }).done(settings.done).fail(settings.fail).always(settings.always);
        }, resources = [];
        // disable caching
        $.ajaxSetup({
            cache: cacheRequest
        });
        this.socket = function() {
            if (this._ws) {
                return this._ws;
            }
            return this._ws = new SocketTransport(apiHost);
        };
        this.version = function() {
            return version;
        };
        // ---------------------------------
        // Set API Key
        //
        this.setKey = function(newKey) {
            apiKey = newKey;
        };
        // ---------------------------------
        // Expose api endpoint
        //
        this.apiEndpoint = apiEndpoint;
        // ---------------------------------
        // General API interaction functions
        //
        this.request = request;
        // this.subscribe = ws.subscribe.bind(ws);
        this.subscribe = function(resource, callback) {
            var request = '{"headers":{"X-ApiKey":"' + apiKey + '"}, "method":"subscribe", "resource":"' + resource + '"}';
            if (!apiKey) {
                return log("(xivelyJS) ::: No API key ::: Set your API key first with xively.setKey( YOUR_API_KEY ) before using any methods. Check docs for more info.");
            }
            if (resources.indexOf(resource) < 0) {
                resources.push(resource);
                this.socket().send(request);
            }
            if (callback && typeof callback === "function") {
                $(document).on("xively." + resource, callback);
            }
        };
        this.unsubscribe = function(resource) {
            if (!apiKey) {
                return log("(xivelyJS) ::: No API key ::: Set your API key first with xively.setKey( YOUR_API_KEY ) before using any methods. Check docs for more info.");
            }
            var index = resources.indexOf(resource);
            if (index >= 0) {
                resources.splice(index, 1);
                this.socket().send('{"headers":{"X-ApiKey":"' + apiKey + '"}, "method":"unsubscribe", "resource":"' + resource + '"}');
            }
        };
        this.live = function(selector, resource) {
            var callback = function(event, data) {
                var response = event.current_value ? event : data;
                if (response.current_value) {
                    $(selector).each(function() {
                        $(this).html(response.current_value).attr("data-xively-resource", resource);
                    });
                }
            };
            request({
                url: apiEndpoint + resource,
                always: callback
            });
            this.subscribe(resource, callback);
        };
        this.stop = function(selector) {
            this.unsubscribe($(selector).first().attr("data-xively-resource"));
        };
        // ---------------------------------
        // Feed module
        //
        this.feed = {
            get: function(id, callback) {
                request({
                    url: apiEndpoint + "/feeds/" + id,
                    always: callback
                });
            },
            update: function(id, data, callback) {
                request({
                    type: "put",
                    url: apiEndpoint + "/feeds/" + id + ".json",
                    data: data,
                    always: callback
                });
            },
            "new": function(data, callback) {
                request({
                    type: "post",
                    url: apiEndpoint + "/feeds",
                    data: data,
                    always: callback
                });
            },
            "delete": function(id, callback) {
                request({
                    type: "delete",
                    url: apiEndpoint + "/feeds/" + id,
                    always: callback
                });
            },
            history: function(id, options, callback) {
                request({
                    url: apiEndpoint + "/feeds/" + id + ".json",
                    data: options,
                    always: callback
                });
            },
            list: function(options, callback) {
                request({
                    url: apiEndpoint + "/feeds",
                    data: options,
                    always: callback
                });
            },
            subscribe: function(id, callback) {
                if (id) {
                    self.subscribe("/feeds/" + id, callback);
                }
            },
            unsubscribe: function(id, callback) {
                if (id) {
                    self.unsubscribe("/feeds/" + id);
                }
            }
        };
        // ---------------------------------
        // Datastream module
        //
        this.datastream = {
            get: function(feed_id, datastream_id, callback) {
                request({
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + ".json",
                    always: callback
                });
            },
            update: function(feed_id, datastream_id, data, callback) {
                request({
                    type: "put",
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + ".json",
                    data: data,
                    always: callback
                });
            },
            "new": function(feed_id, data, callback) {
                request({
                    type: "post",
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams",
                    data: data,
                    always: callback
                });
            },
            "delete": function(feed_id, datastream_id, callback) {
                request({
                    type: "delete",
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id,
                    always: callback
                });
            },
            history: function(feed_id, datastream_id, options, callback) {
                request({
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + ".json",
                    data: options,
                    always: callback
                });
            },
            list: function(feed_id, callback) {
                request({
                    url: apiEndpoint + "/feeds/" + feed_id + ".json",
                    always: function(data) {
                        callback.call(this, data.datastreams);
                    }
                });
            },
            subscribe: function(feed_id, datastream_id, callback) {
                if (feed_id && datastream_id) {
                    self.subscribe("/feeds/" + feed_id + "/datastreams/" + datastream_id, callback);
                }
            },
            unsubscribe: function(feed_id, datastream_id, callback) {
                if (feed_id && datastream_id) {
                    self.unsubscribe("/feeds/" + feed_id + "/datastreams/" + datastream_id);
                }
            },
            live: function(element, feed_id, datastream_id) {
                if (element && feed_id && datastream_id) {
                    self.live(element, "/feeds/" + feed_id + "/datastreams/" + datastream_id);
                }
            },
            stop: function(element) {
                if (element) {
                    self.stop(element);
                }
            }
        };
        // ---------------------------------
        // Datapoint module
        //
        this.datapoint = {
            get: function(feed_id, datastream_id, timestamp, callback) {
                request({
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + "/datapoints/" + timestamp,
                    always: callback
                });
            },
            update: function(feed_id, datastream_id, timestamp, value, callback) {
                request({
                    type: "put",
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + "/datapoints/" + timestamp,
                    data: {
                        value: value
                    },
                    always: callback
                });
            },
            "new": function(feed_id, datastream_id, data, callback) {
                request({
                    type: "post",
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + "/datapoints",
                    data: data,
                    always: callback
                });
            },
            "delete": function(feed_id, datastream_id, timestamp, callback) {
                var req_options = {
                    type: "delete",
                    always: callback
                };
                if (typeof timestamp === "object") {
                    req_options.url = apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + "/datapoints";
                    req_options.data = timestamp;
                } else {
                    req_options.url = apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + "/datapoints/" + timestamp;
                }
                request(req_options);
            },
            history: function(feed_id, datastream_id, options, callback) {
                request({
                    url: apiEndpoint + "/feeds/" + feed_id + "/datastreams/" + datastream_id + ".json",
                    data: options,
                    always: function(data) {
                        callback.call(this, data.datapoints);
                    }
                });
            }
        };
        this._settings = function() {
            return {
                apiKey: apiKey,
                apiHost: apiHost,
                cacheRequest: cacheRequest
            };
        };
        return this;
    };
    root.XivelyClient = XivelyClient;
    root.xively = root.Xively = new XivelyClient();
}).call(this);

/*
 *
 *   JQUERY PLUGIN
 *
 */
(function($) {
    var resourcify = function(options) {
        if (typeof options === "object") {
            return "/feeds/" + options.feed + (options.datastream ? "/datastreams/" + options.datastream : "");
        } else if (typeof options === "string" && options !== "") {
            return options;
        } else {
            return "";
        }
    }, methods = {
        live: function(options) {
            xively.live(this, resourcify(options));
            return this;
        },
        get: function(options) {
            var $this = $(this);
            xively.request({
                url: xively.apiEndpoint + resourcify(options) + ".json",
                always: function(data) {
                    $this.each(function() {
                        $(this).html(data.current_value);
                    });
                }
            });
            return this;
        },
        stop: function() {
            xively.stop(this);
            return this;
        }
    };
    $.fn.xively = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on jQuery.xively");
        }
    };
})(jQuery);