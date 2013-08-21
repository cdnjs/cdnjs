/**@preserve
 ===         CoolQueue.io          ===
 \                                    \
  ===      Act fast, be cool        ===
 /                                    /
 ===   Socket.io offline failsafe  ===
 \                                    \
  ===      For the Gentlemen        ===
 /                                    /
 ===      CodeBuffet Original      ===
 \                                    \
  ===       www.codebuffet.co       ===
 /                                    /
 ===    Author: Peter Willemsen    ===

 Copyright (C) 2013 Peter Willemsen <peter@codebuffeat.co>

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function() {

    function CoolQueueEntry (name, data) {

        this.name = name;
        this.data = data;

    };

    var createCoolQueue = function(settings) {
        var push, save, socket = null, ignoreKeys = {}, _emit = null;

        // Our Namespace
        var CoolQueue = {
            log: function(msg) {
                console.log("CoolQueue > " + msg);
            },
            settings: {
                persistent: true,
                queueKey: "my_queue",
                ignoreKeys: []
            },
            connected: false,
            queue: []
        };

        // Extend our settings from default values
        if (typeof settings !== 'undefined') {
            for (var k in settings) {
                CoolQueue.settings[k] = settings[k];
            }
        }

        push = function(entry) {

            CoolQueue.queue.push(entry);
            save();

            CoolQueue.log("Pushing " + JSON.stringify(entry));

        };

        save = function() {
            if (!CoolQueue.settings.persistent) return;
            $.jStorage.set(CoolQueue.settings.queueKey, CoolQueue.queue);
        }

        // Map our ignoreKeys to a dict for easier and faster lookup
        var len = CoolQueue.settings.ignoreKeys.length;
        for (var i = 0; i < len; i++) {
            ignoreKeys[CoolQueue.settings.ignoreKeys[i]] = 1;
        }

        CoolQueue.queue = $.jStorage.get(CoolQueue.settings.queueKey, []);

        CoolQueue.empty = function () {
            CoolQueue.queue = [];
            $.jStorage.set(CoolQueue.settings.queueKey, []);
        }

        CoolQueue.sendQueue = function () {

            var clone = CoolQueue.queue.slice(0);
            var len = clone.length;

            if (len > 0) {

                for (var i = 0; i < len; i++) {

                    var entry =  clone[i];
                    if (CoolQueue.connected) {
                        CoolQueue.log("Sending " + JSON.stringify(entry.data));
                        _emit.apply(socket, entry.data);
                        CoolQueue.queue.splice(i, 1);
                    }

                }

                save();

            }

        };

        CoolQueue.spit = function () {

            // Destroy our overriding and put the socket back to it's original state
            if (socket != null) {

                socket.emit = _emit;
                socket = null;

            }

        };

        // doing some hardcore hacking
        CoolQueue.swallow = function(_socket) {

            socket = _socket;

            // Capture the original emit() and override it with our own
            _emit = socket.emit;

            socket.emit = function(name) {

                // HTML5 storage has some trouble with arguments being passed on directly...
                // Let's make a plain array of it!
                var argumentsArray = [];

                var len = arguments.length;
                for (var i = 0; i < len; i++) {
                    argumentsArray.push(arguments[i]);
                }

                var key = arguments[0];

                if (CoolQueue.connected) {

                    // Just do the normal socket.io stuff
                    return _emit.apply(socket, argumentsArray);

                } else {

                    // Not in our ignoreKeys mapping, it's allowed to be added
                    if (typeof ignoreKeys[key] === 'undefined') {
                        var entry = new CoolQueueEntry(key, argumentsArray);
                        push(entry);
                    }

                }

            }

            socket.on('connect', function () {

                CoolQueue.connected = true;

            });

            socket.on('disconnect', function() {

                CoolQueue.connected = false;

            });
        };
        return CoolQueue;
    };

    // Expose the main methods
    window.createCoolQueue = createCoolQueue;

})();
