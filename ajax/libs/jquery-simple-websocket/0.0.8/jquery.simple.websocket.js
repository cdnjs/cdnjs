/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*
* jQuery Simple Websocket
* https://github.com/jbloemendal/jquery-simple-websocket
*/

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
      module.exports = factory(require("jquery"));
  } else {
      factory(jQuery);
  }
}(function($) {

    var SimpleWebSocket = function(opt) {
        this._opt = null;

        if (this._isNotEmpty(opt, 'url')) {
            this._opt = opt;
        } else {
            throw new Error("Missing argument, example usage: $.simpleWebSocket({ url: 'ws://127.0.0.1:3000' }); ");
        }

        this._ws = null;
        this._reConnectTries = 60;
        this._reConnectDeferred = null;
        this._listeners = [];

        var self = this;
        this._api = (function() {
            return {
                connect: function() {
                    return $.extend(self._api, self._reConnect.apply(self, []));
                },

                isConnected: function(callback) {
                    if (callback) {
                        callback.apply(this, [self._isConnected.apply(self, [])]);
                        return self._api;
                    } else {
                        return self._isConnected.apply(self, []);
                    }
                },

                send: function(data) {
                    return $.extend(self._api, self._send.apply(self, [data]));
                },

                listen: function(listener) {
                    return $.extend(self._api, self._listenReconnect.apply(self, [listener]));
                },

                remove: function(listener) {
                    self._remove.apply(self, [listener]);
                    return self._api;
                },

                removeAll: function() {
                    self._removeAll.apply(self, []);
                    return self._api;
                },

                close: function() {
                    self._close.apply(self, []);
                    return self._api;
                }
            };
        })();

        return this._api;
    };

    SimpleWebSocket.prototype = {

         _webSocket: function(opt) {
            var ws;
            if (opt.protocols) {
                ws = (typeof window.MozWebSocket !== 'undefined') ? new MozWebSocket(opt.url, opt.protocols) : window.WebSocket ? new WebSocket(opt.url, opt.protocols) : null;
            } else {
                ws = (typeof window.MozWebSocket !== 'undefined') ? new MozWebSocket(opt.url) : window.WebSocket ? new WebSocket(opt.url) : null;
            }

            if (!ws) {
                throw new Error('Error, websocket could not be initialized.');
            }

            $(ws).bind('open', opt.open)
            .bind('close', opt.close)
            .bind('message', function(e) {
                var json = $.evalJSON(e.originalEvent.data);
                if (opt[e.type]) {
                    opt[e.type].call(this, json);
                }
            }).bind('error', function(e) {
                if (opt.error) {
                    opt.error.call(this, e);
                }
            });

            return ws;
         },

         _connect: function() {
            var self = this;

             var attempt = $.Deferred();
             if (this._ws) {
                 if (this._ws.readyState === 2 || this._ws.readyState === 3) {
                     // close previous socket
                     this._ws.close();
                 } else if (this._ws.readyState === 0) {
                     return attempt.promise();
                 } else if (this._ws.readyState === 1) {
                     attempt.resolve(this._ws);
                     return attempt.promise();
                 }
             }

            this._ws = this._webSocket($.extend(this._opt, {
                open: function(e) {
                    var sock = this;
                    if (attempt) {
                        attempt.resolve(sock);
                    }
                },
                close: function(e) {
                    if (attempt) {
                        attempt.rejectWith(e);
                    }
                },
                message: function(message) {
                    for (var i=0, len=self._listeners.length; i<len; i++) {
                        try {
                            self._listeners[i].deferred.notify.apply(self, [message]);
                        } catch (error) {
                        }
                    }
                },
                error: function(e) {
                    self._ws = null;
                    for (var i=0, len=self._listeners.length; i<len; i++) {
                        self._listeners[i].deferred.reject.apply(self, [e]);
                    }
                    if (attempt) {
                        attempt.rejectWith.apply(self, [e]);
                    }
                }
            }));
            return attempt.promise();
         },

         _close: function() {
            if (this._ws) {
                this._ws.close();
                this._ws = null;
                this._reConnectDeferred = null;
            }
         },

         _isConnected: function() {
             return this._ws !== null && this._ws.readyState === 1;
         },

         _reConnect: function() {
             var self = this;
             if (!this._reConnectDeferred || this._reConnectDeferred.state() !== 'pending') {
                 this._reConnectTries = this._prop(this._opt, 'attempts', 60); // default 10min
                 this._reConnectDeferred = $.Deferred();
             }

             if (this._ws && this._ws.readyState === 1) {
                 this._reConnectDeferred.resolve(this._ws);
             } else {
                 this._connect().done(function() {
                    self._reConnectDeferred.resolve.apply(self, [self._ws]);
                 }).fail(function(e) {
                    self._reConnectTries--;
                    if (self._reConnectTries > 0) {
                       window.setTimeout(function() {
                           self._reConnect.apply(self, []);
                       }, self._prop.apply(self, [self._opt, 'timeout', 10000]));
                    } else {
                       self._reConnectDeferred.rejectWith.apply(self, [e]);
                    }
                 });
             }

             return self._reConnectDeferred.promise.apply(self, []);
         },

         _send: function(data) {
             var self = this;
             var attempt = $.Deferred();

             (function(json) {
                 self._reConnect.apply(self, []).done(function(ws) {
                     ws.send(json);
                     attempt.resolve.apply(self, [self._api]);
                 }).fail(function(e) {
                     attempt.rejectWith.apply(self, [e]);
                 });
             })(JSON.stringify(data));

             return attempt.promise();
         },

         _indexOfListener: function(listener) {
            for (var i=0, len=this._listeners.length; i<len; i++) {
                if (this._listeners[i].listener === listener) {
                    return i;
                }
            }
            return -1;
         },

         _isNotEmpty: function(obj, property) {
                return typeof obj !== 'undefined' &&
                    obj !== null &&
                    typeof property !== 'undefined' &&
                    property !== null &&
                    property !== '' &&
                    typeof obj[property] !== 'undefined' &&
                    obj[property] !== null &&
                    obj[property] !== '';
         },

         _prop: function(obj, property, defaultValue) {
             if (this._isNotEmpty(obj, property)) {
                return obj[property];
             }
            return defaultValue;
         },

         _listen: function(listener) {
            var self = this;
            var dInternal = $.Deferred();
             self._reConnect.apply(self, []).done(function() {
                 dInternal.progress(function() {
                     listener.apply(this, arguments);
                 });
                 self._remove.apply(self, [listener]);
                 self._listeners.push({ 'deferred': dInternal, 'listener': listener });
             }).fail(function(e) {
                 dInternal.reject(e);
             });
             return dInternal.promise();
         },

         _listenReconnect: function(listener) {
            var dExternal = $.Deferred();

            var self = this;
            this._listen(listener)
            .fail(function() {
                dExternal.notify(arguments);
                self._listenReconnect.apply(self, [listener]);
            }).done(function() {
                dExternal.resolve();
            });

            return dExternal.promise();
         },

         _remove: function(listener) {
             var index = this._indexOfListener(listener);
             if (index !== -1) {
                 this._listeners[index].deferred.resolve();
                 this._listeners.splice(index, 1);
             }
         },

         _removeAll: function() {
            for (var i=0, len=this._listeners.length; i<len; i++) {
                this._listeners[i].deferred.resolve();
            }
            this._listeners = [];
         }
     };

    $.extend({
        simpleWebSocket: function(opt) {
            return new SimpleWebSocket(opt);
        }
    });
}));
