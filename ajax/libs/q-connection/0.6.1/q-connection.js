var Q = require("q");
var LruMap = require("collections/lru-map");
var Map = require("collections/map");
var UUID = require("./lib/uuid");
var adapt = require("./adapt");

function debug() {
    //typeof console !== "undefined" && console.log.apply(console, arguments);
}

var rootId = "";

var has = Object.prototype.hasOwnProperty;

/**
 * @param connection
 * @param local
 */
module.exports = Connection;
function Connection(connection, local, options) {
    options = options || {};
    var makeId = options.makeId || function () {
        return UUID.generate();
    };
    var root = Q.defer();
    root.resolve(local);
    var locals = LruMap(null, options.capacity || options.max || Infinity);
    connection = adapt(connection, options.origin);

    var debugKey = Math.random().toString(16).slice(2, 4).toUpperCase() + ":";
    function _debug() {
        debug.apply(null, [debugKey].concat(Array.prototype.slice.call(arguments)));
    }

    // Some day, the following will merely be:
    //  connection.forEach(function (message) {
    //      receive(message);
    //  })
    //  .then(function () {
    //      var error = new Error("Connection closed");
    //      locals.forEach(function (local) {
    //          local.reject(error);
    //      });
    //  })
    //  .done()

    // message receiver loop
    connection.get().then(get);
    function get(message) {
        _debug("receive:", message);
        connection.get().then(get);
        receive(message);
    }

    if (connection.closed) {
        connection.closed.then(function (error) {
            if (typeof error !== "object") {
                error = new Error(error);
            }
            var closedError = new Error("Connection closed because: " + error.message);
            closedError.cause = error;
            locals.forEach(function (local) {
                local.reject(closedError);
            });
        });
    }

    // message receiver
    function receive(message) {
        message = JSON.parse(message);
        _debug("receive: parsed message", message);

        if (!receivers[message.type])
            return; // ignore bad message types
        if (!hasLocal(message.to)) {
            if (typeof options.onmessagelost === "function") {
                options.onmessagelost(message);
            }
            // ignore messages to non-existant or forgotten promises
            return;
        }
        receivers[message.type](message);
    }

    // message receiver handlers by message type
    var receivers = {
        "resolve": function (message) {
            if (hasLocal(message.to)) {
                dispatchLocal(message.to, "resolve", decode(message.resolution));
            }
        },
        "notify": function (message) {
            if (hasLocal(message.to)) {
                dispatchLocal(message.to, "notify", decode(message.resolution));
            }
        },
        // a "send" message forwards messages from a remote
        // promise to a local promise.
        "send": function (message) {

            // forward the message to the local promise,
            // which will return a response promise
            var local = getLocal(message.to).promise;
            var response = local.dispatch(message.op, decode(message.args));
            var envelope;

            // connect the local response promise with the
            // remote response promise:

            // if the value is ever resolved, send the
            // fulfilled value across the wire
            response.then(function (resolution) {
                try {
                    resolution = encode(resolution);
                } catch (exception) {
                    try {
                        resolution = {"!": encode(exception)};
                    } catch (_exception) {
                        resolution = {"!": null};
                    }
                }
                envelope = JSON.stringify({
                    "type": "resolve",
                    "to": message.from,
                    "resolution": resolution
                });
                connection.put(envelope);
            }, function (reason) {
                try {
                    reason = encode(reason);
                } catch (exception) {
                    try {
                        reason = encode(exception);
                    } catch (_exception) {
                        reason = null;
                    }
                }
                envelope = JSON.stringify({
                    "type": "resolve",
                    "to": message.from,
                    "resolution": {"!": reason}
                });
                connection.put(envelope);
            }, function (progress) {
                try {
                    progress = encode(progress);
                    envelope = JSON.stringify({
                        "type": "notify",
                        "to": message.from,
                        "resolution": progress
                    });
                } catch (exception) {
                    try {
                        progress = {"!": encode(exception)};
                    } catch (_exception) {
                        progress = {"!": null};
                    }
                    envelope = JSON.stringify({
                        "type": "resolve",
                        "to": message.from,
                        "resolution": progress
                    });
                }
                connection.put(envelope);
            })
            .done();

        }
    };

    function hasLocal(id) {
        return id === rootId ? true : locals.has(id);
    }

    function getLocal(id) {
        return id === rootId ? root : locals.get(id);
    }

    // construct a local promise, such that it can
    // be resolved later by a remote message
    function makeLocal(id) {
        if (hasLocal(id)) {
            return getLocal(id).promise;
        } else {
            var deferred = Q.defer();
            locals.set(id, deferred);
            return deferred.promise;
        }
    }

    // a utility for resolving the local promise
    // for a given identifier.
    function dispatchLocal(id, op, value) {
//        _debug(op + ':', "L" + JSON.stringify(id), JSON.stringify(value), typeof value);
        getLocal(id)[op](value);
    }

    // makes a promise that will send all of its events to a
    // remote object.
    function makeRemote(id) {
        return Q.makePromise({
            when: function () {
                return this;
            }
        }, function (op, args) {
            var localId = makeId();
            var response = makeLocal(localId);
            _debug("sending:", "R" + JSON.stringify(id), JSON.stringify(op), JSON.stringify(encode(args)));
            connection.put(JSON.stringify({
                "type": "send",
                "to": id,
                "from": localId,
                "op": op,
                "args": encode(args)
            }));
            return response;
        });
    }

    // serializes an object tree, encoding promises such
    // that JSON.stringify on the result will produce
    // "QSON": serialized promise objects.
    function encode(object, memo, path ) {
        memo = memo || new Map();
        path = path || "";
        if (object === undefined) {
            return {"%": "undefined"};
        } else if (Object(object) !== object) {
            if (typeof object == "number") {
                if (object === Number.POSITIVE_INFINITY) {
                    return {"%": "+Infinity"};
                } else if (object === Number.NEGATIVE_INFINITY) {
                    return {"%": "-Infinity"};
                } else if (isNaN(object)) {
                    return {"%": "NaN"};
                }
            }
            return object;
        } else {
            var id;
            if (memo.has(object)) {
                return {"$": memo.get(object)};
            } else {
                memo.set(object, path);
            }

            if (Q.isPromise(object) || typeof object === "function") {
                id = makeId();
                makeLocal(id);
                dispatchLocal(id, "resolve", object);
                return {"@": id, "type": typeof object};
            } else if (Array.isArray(object)) {
                return object.map(function (value, index) {
                    return encode(value, memo, path + "/" + index);
                });
            } else if (
                (
                    object.constructor === Object &&
                    Object.getPrototypeOf(object) === Object.prototype
                ) ||
                object instanceof Error
            ) {
                var result = {};
                if (object instanceof Error) {
                    result.message = object.message;
                    result.stack = object.stack;
                }
                for (var key in object) {
                    if (has.call(object, key)) {
                        var newKey = key.replace(/[@!%\$\/\\]/, function ($0) {
                            return "\\" + $0;
                        });
                        result[newKey] = encode(object[key], memo, path + "/" + newKey);
                    }
                }
                return result;
            } else {
                id = makeId();
                makeLocal(id);
                dispatchLocal(id, "resolve", object);
                return {"@": id, "type": typeof object};
            }
        }
    }

    // decodes QSON
    function decode(object, memo, path) {
        memo = memo || new Map();
        path = path || "";
        if (Object(object) !== object) {
            return object;
        } else if (object["$"] !== void 0) {
            return memo.get(object["$"]);
        } else if (object["%"]) {
            if (object["%"] === "undefined") {
                return undefined;
            } else if (object["%"] === "+Infinity") {
                return Number.POSITIVE_INFINITY;
            } else if (object["%"] === "-Infinity") {
                return Number.NEGATIVE_INFINITY;
            } else if (object["%"] === "NaN") {
                return Number.NaN;
            } else {
                return Q.reject(new TypeError("Unrecognized type: " + object["%"]));
            }
        } else if (object["!"]) {
            return Q.reject(object["!"]);
        } else if (object["@"]) {
            var remote = makeRemote(object["@"]);
            if (object.type === "function") {
                return function () {
                    return Q.fapply(remote, Array.prototype.slice.call(arguments));
                };
            } else {
                return remote;
            }
        } else {
            var newObject = Array.isArray(object) ? [] : {};
            memo.set(path, newObject);
            for (var key in object) {
                if (has.call(object, key)) {
                    var newKey = key.replace(/\\([\\!@%\$\/])/, function ($0, $1) {
                        return $1;
                    });
                    newObject[newKey] = decode(object[key], memo, path + "/" + key);
                }
            }
            return newObject;
        }
    }

    // a peer-to-peer promise connection is symmetric: both
    // the local and remote side have a "root" promise
    // object. On each side, the respective remote object is
    // returned, and the object passed as an argument to
    // Connection is used as the local object.  The identifier of
    // the root object is an empty-string by convention.
    // All other identifiers are numbers.
    return makeRemote(rootId);

}

