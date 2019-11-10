(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription;
exports.RTCPeerConnection = window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;
exports.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var eventemitter3_1 = require("eventemitter3");
var negotiator_1 = require("./negotiator");
var reliable_1 = require("reliable");
function DataConnection(peer, provider, options) {
    if (!(this instanceof DataConnection))
        return new DataConnection(peer, provider, options);
    eventemitter3_1.EventEmitter.call(this);
    this.options = util_1.util.extend({
        serialization: "binary",
        reliable: false
    }, options);
    this.open = false;
    this.type = "data";
    this.peer = peer;
    this.provider = provider;
    this.id =
        this.options.connectionId || DataConnection._idPrefix + util_1.util.randomToken();
    this.label = this.options.label || this.id;
    this.metadata = this.options.metadata;
    this.serialization = this.options.serialization;
    this.reliable = this.options.reliable;
    this._buffer = [];
    this._buffering = false;
    this.bufferSize = 0;
    this._chunkedData = {};
    if (this.options._payload) {
        this._peerBrowser = this.options._payload.browser;
    }
    negotiator_1.Negotiator.startConnection(this, this.options._payload || {
        originator: true
    });
}
exports.DataConnection = DataConnection;
util_1.util.inherits(DataConnection, eventemitter3_1.EventEmitter);
DataConnection._idPrefix = "dc_";
DataConnection.prototype.initialize = function (dc) {
    this._dc = this.dataChannel = dc;
    this._configureDataChannel();
};
DataConnection.prototype._configureDataChannel = function () {
    var self = this;
    if (util_1.util.supports.sctp) {
        this._dc.binaryType = "arraybuffer";
    }
    this._dc.onopen = function () {
        util_1.util.log("Data channel connection success");
        self.open = true;
        self.emit("open");
    };
    if (!util_1.util.supports.sctp && this.reliable) {
        this._reliable = new reliable_1.Reliable(this._dc, util_1.util.debug);
    }
    if (this._reliable) {
        this._reliable.onmessage = function (msg) {
            self.emit("data", msg);
        };
    }
    else {
        this._dc.onmessage = function (e) {
            self._handleDataMessage(e);
        };
    }
    this._dc.onclose = function (e) {
        util_1.util.log("DataChannel closed for:", self.peer);
        self.close();
    };
};
DataConnection.prototype._handleDataMessage = function (e) {
    var self = this;
    var data = e.data;
    var datatype = data.constructor;
    if (this.serialization === "binary" || this.serialization === "binary-utf8") {
        if (datatype === Blob) {
            util_1.util.blobToArrayBuffer(data, function (ab) {
                data = util_1.util.unpack(ab);
                self.emit("data", data);
            });
            return;
        }
        else if (datatype === ArrayBuffer) {
            data = util_1.util.unpack(data);
        }
        else if (datatype === String) {
            var ab = util_1.util.binaryStringToArrayBuffer(data);
            data = util_1.util.unpack(ab);
        }
    }
    else if (this.serialization === "json") {
        data = JSON.parse(data);
    }
    if (data.__peerData) {
        var id = data.__peerData;
        var chunkInfo = this._chunkedData[id] || {
            data: [],
            count: 0,
            total: data.total
        };
        chunkInfo.data[data.n] = data.data;
        chunkInfo.count += 1;
        if (chunkInfo.total === chunkInfo.count) {
            delete this._chunkedData[id];
            data = new Blob(chunkInfo.data);
            this._handleDataMessage({ data: data });
        }
        this._chunkedData[id] = chunkInfo;
        return;
    }
    this.emit("data", data);
};
DataConnection.prototype.close = function () {
    if (!this.open) {
        return;
    }
    this.open = false;
    negotiator_1.Negotiator.cleanup(this);
    this.emit("close");
};
DataConnection.prototype.send = function (data, chunked) {
    if (!this.open) {
        this.emit("error", new Error("Connection is not open. You should listen for the `open` event before sending messages."));
        return;
    }
    if (this._reliable) {
        this._reliable.send(data);
        return;
    }
    var self = this;
    if (this.serialization === "json") {
        this._bufferedSend(JSON.stringify(data));
    }
    else if (this.serialization === "binary" ||
        this.serialization === "binary-utf8") {
        var blob = util_1.util.pack(data);
        var needsChunking = util_1.util.chunkedBrowsers[this._peerBrowser] ||
            util_1.util.chunkedBrowsers[util_1.util.browser];
        if (needsChunking && !chunked && blob.size > util_1.util.chunkedMTU) {
            this._sendChunks(blob);
            return;
        }
        if (!util_1.util.supports.sctp) {
            util_1.util.blobToBinaryString(blob, function (str) {
                self._bufferedSend(str);
            });
        }
        else if (!util_1.util.supports.binaryBlob) {
            util_1.util.blobToArrayBuffer(blob, function (ab) {
                self._bufferedSend(ab);
            });
        }
        else {
            this._bufferedSend(blob);
        }
    }
    else {
        this._bufferedSend(data);
    }
};
DataConnection.prototype._bufferedSend = function (msg) {
    if (this._buffering || !this._trySend(msg)) {
        this._buffer.push(msg);
        this.bufferSize = this._buffer.length;
    }
};
DataConnection.prototype._trySend = function (msg) {
    try {
        this._dc.send(msg);
    }
    catch (e) {
        this._buffering = true;
        var self = this;
        setTimeout(function () {
            self._buffering = false;
            self._tryBuffer();
        }, 100);
        return false;
    }
    return true;
};
DataConnection.prototype._tryBuffer = function () {
    if (this._buffer.length === 0) {
        return;
    }
    var msg = this._buffer[0];
    if (this._trySend(msg)) {
        this._buffer.shift();
        this.bufferSize = this._buffer.length;
        this._tryBuffer();
    }
};
DataConnection.prototype._sendChunks = function (blob) {
    var blobs = util_1.util.chunk(blob);
    for (var i = 0, ii = blobs.length; i < ii; i += 1) {
        var blob = blobs[i];
        this.send(blob, true);
    }
};
DataConnection.prototype.handleMessage = function (message) {
    var payload = message.payload;
    switch (message.type) {
        case "ANSWER":
            this._peerBrowser = payload.browser;
            negotiator_1.Negotiator.handleSDP(message.type, this, payload.sdp);
            break;
        case "CANDIDATE":
            negotiator_1.Negotiator.handleCandidate(this, payload.candidate);
            break;
        default:
            util_1.util.warn("Unrecognized message type:", message.type, "from peer:", this.peer);
            break;
    }
};

},{"./negotiator":5,"./util":8,"eventemitter3":9,"reliable":12}],3:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var adapter_1 = require("./adapter");
var socket_1 = require("./socket");
var mediaconnection_1 = require("./mediaconnection");
var dataconnection_1 = require("./dataconnection");
var peer_1 = require("./peer");
var negotiator_1 = require("./negotiator");
var js_binarypack_1 = __importDefault(require("js-binarypack"));
window.Socket = socket_1.Socket;
window.MediaConnection = mediaconnection_1.MediaConnection;
window.DataConnection = dataconnection_1.DataConnection;
window.Peer = peer_1.Peer;
window.RTCPeerConnection = adapter_1.RTCPeerConnection;
window.RTCSessionDescription = adapter_1.RTCSessionDescription;
window.RTCIceCandidate = adapter_1.RTCIceCandidate;
window.Negotiator = negotiator_1.Negotiator;
window.util = util_1.util;
window.BinaryPack = js_binarypack_1.default;

},{"./adapter":1,"./dataconnection":2,"./mediaconnection":4,"./negotiator":5,"./peer":6,"./socket":7,"./util":8,"js-binarypack":10}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var eventemitter3_1 = require("eventemitter3");
var negotiator_1 = require("./negotiator");
function MediaConnection(peer, provider, options) {
    if (!(this instanceof MediaConnection))
        return new MediaConnection(peer, provider, options);
    eventemitter3_1.EventEmitter.call(this);
    this.options = util_1.util.extend({}, options);
    this.open = false;
    this.type = "media";
    this.peer = peer;
    this.provider = provider;
    this.metadata = this.options.metadata;
    this.localStream = this.options._stream;
    this.id =
        this.options.connectionId || MediaConnection._idPrefix + util_1.util.randomToken();
    if (this.localStream) {
        negotiator_1.Negotiator.startConnection(this, {
            _stream: this.localStream,
            originator: true
        });
    }
}
exports.MediaConnection = MediaConnection;
util_1.util.inherits(MediaConnection, eventemitter3_1.EventEmitter);
MediaConnection._idPrefix = "mc_";
MediaConnection.prototype.addStream = function (remoteStream) {
    util_1.util.log("Receiving stream", remoteStream);
    this.remoteStream = remoteStream;
    this.emit("stream", remoteStream);
};
MediaConnection.prototype.handleMessage = function (message) {
    var payload = message.payload;
    switch (message.type) {
        case "ANSWER":
            negotiator_1.Negotiator.handleSDP(message.type, this, payload.sdp);
            this.open = true;
            break;
        case "CANDIDATE":
            negotiator_1.Negotiator.handleCandidate(this, payload.candidate);
            break;
        default:
            util_1.util.warn("Unrecognized message type:", message.type, "from peer:", this.peer);
            break;
    }
};
MediaConnection.prototype.answer = function (stream) {
    if (this.localStream) {
        util_1.util.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");
        return;
    }
    this.options._payload._stream = stream;
    this.localStream = stream;
    negotiator_1.Negotiator.startConnection(this, this.options._payload);
    var messages = this.provider._getMessages(this.id);
    for (var i = 0, ii = messages.length; i < ii; i += 1) {
        this.handleMessage(messages[i]);
    }
    this.open = true;
};
MediaConnection.prototype.close = function () {
    if (!this.open) {
        return;
    }
    this.open = false;
    negotiator_1.Negotiator.cleanup(this);
    this.emit("close");
};

},{"./negotiator":5,"./util":8,"eventemitter3":9}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var adapter_1 = require("./adapter");
exports.Negotiator = {
    pcs: {
        data: {},
        media: {}
    },
    queue: []
};
exports.Negotiator._idPrefix = "pc_";
exports.Negotiator.startConnection = function (connection, options) {
    var pc = exports.Negotiator._getPeerConnection(connection, options);
    connection.pc = connection.peerConnection = pc;
    if (connection.type === "media" && options._stream) {
        pc.addStream(options._stream);
    }
    if (options.originator) {
        if (connection.type === "data") {
            var config = {};
            if (!util_1.util.supports.sctp) {
                config = { reliable: options.reliable };
            }
            var dc = pc.createDataChannel(connection.label, config);
            connection.initialize(dc);
        }
        exports.Negotiator._makeOffer(connection);
    }
    else {
        exports.Negotiator.handleSDP("OFFER", connection, options.sdp);
    }
};
exports.Negotiator._getPeerConnection = function (connection, options) {
    if (!exports.Negotiator.pcs[connection.type]) {
        util_1.util.error(connection.type +
            " is not a valid connection type. Maybe you overrode the `type` property somewhere.");
    }
    if (!exports.Negotiator.pcs[connection.type][connection.peer]) {
        exports.Negotiator.pcs[connection.type][connection.peer] = {};
    }
    var peerConnections = exports.Negotiator.pcs[connection.type][connection.peer];
    var pc;
    if (options.pc) {
        pc = exports.Negotiator.pcs[connection.type][connection.peer][options.pc];
    }
    if (!pc || pc.signalingState !== "stable") {
        pc = exports.Negotiator._startPeerConnection(connection);
    }
    return pc;
};
exports.Negotiator._startPeerConnection = function (connection) {
    util_1.util.log("Creating RTCPeerConnection.");
    var id = exports.Negotiator._idPrefix + util_1.util.randomToken();
    var optional = {};
    if (connection.type === "data" && !util_1.util.supports.sctp) {
        optional = { optional: [{ RtpDataChannels: true }] };
    }
    else if (connection.type === "media") {
        optional = { optional: [{ DtlsSrtpKeyAgreement: true }] };
    }
    var pc = new adapter_1.RTCPeerConnection(connection.provider.options.config, optional);
    exports.Negotiator.pcs[connection.type][connection.peer][id] = pc;
    exports.Negotiator._setupListeners(connection, pc, id);
    return pc;
};
exports.Negotiator._setupListeners = function (connection, pc, pc_id) {
    var peerId = connection.peer;
    var connectionId = connection.id;
    var provider = connection.provider;
    util_1.util.log("Listening for ICE candidates.");
    pc.onicecandidate = function (evt) {
        if (evt.candidate) {
            util_1.util.log("Received ICE candidates for:", connection.peer);
            provider.socket.send({
                type: "CANDIDATE",
                payload: {
                    candidate: evt.candidate,
                    type: connection.type,
                    connectionId: connection.id
                },
                dst: peerId
            });
        }
    };
    pc.oniceconnectionstatechange = function () {
        switch (pc.iceConnectionState) {
            case "failed":
                util_1.util.log("iceConnectionState is disconnected, closing connections to " + peerId);
                connection.emit("error", new Error("Negotiation of connection to " + peerId + " failed."));
                connection.close();
                break;
            case "disconnected":
                util_1.util.log("iceConnectionState is disconnected, closing connections to " + peerId);
                connection.close();
                break;
            case "completed":
                pc.onicecandidate = util_1.util.noop;
                break;
        }
    };
    pc.onicechange = pc.oniceconnectionstatechange;
    util_1.util.log("Listening for data channel");
    pc.ondatachannel = function (evt) {
        util_1.util.log("Received data channel");
        var dc = evt.channel;
        var connection = provider.getConnection(peerId, connectionId);
        connection.initialize(dc);
    };
    util_1.util.log("Listening for remote stream");
    pc.ontrack = function (evt) {
        util_1.util.log("Received remote stream");
        var stream = evt.streams[0];
        var connection = provider.getConnection(peerId, connectionId);
        if (connection.type === "media") {
            connection.addStream(stream);
        }
    };
};
exports.Negotiator.cleanup = function (connection) {
    util_1.util.log("Cleaning up PeerConnection to " + connection.peer);
    var pc = connection.pc;
    if (!!pc &&
        ((pc.readyState && pc.readyState !== "closed") ||
            pc.signalingState !== "closed")) {
        pc.close();
        connection.pc = null;
    }
};
exports.Negotiator._makeOffer = function (connection) {
    var pc = connection.pc;
    pc.createOffer(function (offer) {
        util_1.util.log("Created offer.");
        if (!util_1.util.supports.sctp &&
            connection.type === "data" &&
            connection.reliable) {
            offer.sdp = Reliable.higherBandwidthSDP(offer.sdp);
        }
        pc.setLocalDescription(offer, function () {
            util_1.util.log("Set localDescription: offer", "for:", connection.peer);
            connection.provider.socket.send({
                type: "OFFER",
                payload: {
                    sdp: offer,
                    type: connection.type,
                    label: connection.label,
                    connectionId: connection.id,
                    reliable: connection.reliable,
                    serialization: connection.serialization,
                    metadata: connection.metadata,
                    browser: util_1.util.browser
                },
                dst: connection.peer
            });
        }, function (err) {
            if (err !=
                "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer") {
                connection.provider.emitError("webrtc", err);
                util_1.util.log("Failed to setLocalDescription, ", err);
            }
        });
    }, function (err) {
        connection.provider.emitError("webrtc", err);
        util_1.util.log("Failed to createOffer, ", err);
    }, connection.options.constraints);
};
exports.Negotiator._makeAnswer = function (connection) {
    var pc = connection.pc;
    pc.createAnswer(function (answer) {
        util_1.util.log("Created answer.");
        if (!util_1.util.supports.sctp &&
            connection.type === "data" &&
            connection.reliable) {
            answer.sdp = Reliable.higherBandwidthSDP(answer.sdp);
        }
        pc.setLocalDescription(answer, function () {
            util_1.util.log("Set localDescription: answer", "for:", connection.peer);
            connection.provider.socket.send({
                type: "ANSWER",
                payload: {
                    sdp: answer,
                    type: connection.type,
                    connectionId: connection.id,
                    browser: util_1.util.browser
                },
                dst: connection.peer
            });
        }, function (err) {
            connection.provider.emitError("webrtc", err);
            util_1.util.log("Failed to setLocalDescription, ", err);
        });
    }, function (err) {
        connection.provider.emitError("webrtc", err);
        util_1.util.log("Failed to create answer, ", err);
    });
};
exports.Negotiator.handleSDP = function (type, connection, sdp) {
    sdp = new adapter_1.RTCSessionDescription(sdp);
    var pc = connection.pc;
    util_1.util.log("Setting remote description", sdp);
    pc.setRemoteDescription(sdp, function () {
        util_1.util.log("Set remoteDescription:", type, "for:", connection.peer);
        if (type === "OFFER") {
            exports.Negotiator._makeAnswer(connection);
        }
    }, function (err) {
        connection.provider.emitError("webrtc", err);
        util_1.util.log("Failed to setRemoteDescription, ", err);
    });
};
exports.Negotiator.handleCandidate = function (connection, ice) {
    var candidate = ice.candidate;
    var sdpMLineIndex = ice.sdpMLineIndex;
    connection.pc.addIceCandidate(new adapter_1.RTCIceCandidate({
        sdpMLineIndex: sdpMLineIndex,
        candidate: candidate
    }));
    util_1.util.log("Added ICE candidate for:", connection.peer);
};

},{"./adapter":1,"./util":8}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var eventemitter3_1 = require("eventemitter3");
var socket_1 = require("./socket");
var mediaconnection_1 = require("./mediaconnection");
var dataconnection_1 = require("./dataconnection");
function Peer(id, options) {
    if (!(this instanceof Peer))
        return new Peer(id, options);
    eventemitter3_1.EventEmitter.call(this);
    if (id && id.constructor == Object) {
        options = id;
        id = undefined;
    }
    else if (id) {
        id = id.toString();
    }
    options = util_1.util.extend({
        debug: 0,
        host: util_1.util.CLOUD_HOST,
        port: util_1.util.CLOUD_PORT,
        path: "/",
        token: util_1.util.randomToken(),
        config: util_1.util.defaultConfig
    }, options);
    options.key = "peerjs";
    this.options = options;
    if (options.host === "/") {
        options.host = window.location.hostname;
    }
    if (options.path[0] !== "/") {
        options.path = "/" + options.path;
    }
    if (options.path[options.path.length - 1] !== "/") {
        options.path += "/";
    }
    if (options.secure === undefined && options.host !== util_1.util.CLOUD_HOST) {
        options.secure = util_1.util.isSecure();
    }
    else if (options.host == util_1.util.CLOUD_HOST) {
        options.secure = true;
    }
    if (options.logFunction) {
        util_1.util.setLogFunction(options.logFunction);
    }
    util_1.util.setLogLevel(options.debug);
    if (!util_1.util.supports.audioVideo && !util_1.util.supports.data) {
        this._delayedAbort("browser-incompatible", "The current browser does not support WebRTC");
        return;
    }
    if (!util_1.util.validateId(id)) {
        this._delayedAbort("invalid-id", 'ID "' + id + '" is invalid');
        return;
    }
    this.destroyed = false;
    this.disconnected = false;
    this.open = false;
    this.connections = {};
    this._lostMessages = {};
    this._initializeServerConnection();
    if (id) {
        this._initialize(id);
    }
    else {
        this._retrieveId();
    }
}
exports.Peer = Peer;
util_1.util.inherits(Peer, eventemitter3_1.EventEmitter);
Peer.prototype._initializeServerConnection = function () {
    var self = this;
    this.socket = new socket_1.Socket(this.options.secure, this.options.host, this.options.port, this.options.path, this.options.key, this.options.wsport);
    this.socket.on("message", function (data) {
        self._handleMessage(data);
    });
    this.socket.on("error", function (error) {
        self._abort("socket-error", error);
    });
    this.socket.on("disconnected", function () {
        if (!self.disconnected) {
            self.emitError("network", "Lost connection to server.");
            self.disconnect();
        }
    });
    this.socket.on("close", function () {
        if (!self.disconnected) {
            self._abort("socket-closed", "Underlying socket is already closed.");
        }
    });
};
Peer.prototype._retrieveId = function (cb) {
    var self = this;
    var http = new XMLHttpRequest();
    var protocol = this.options.secure ? "https://" : "http://";
    var url = protocol +
        this.options.host +
        ":" +
        this.options.port +
        this.options.path +
        this.options.key +
        "/id";
    var queryString = "?ts=" + new Date().getTime() + "" + Math.random();
    url += queryString;
    http.open("get", url, true);
    http.onerror = function (e) {
        util_1.util.error("Error retrieving ID", e);
        var pathError = "";
        if (self.options.path === "/" && self.options.host !== util_1.util.CLOUD_HOST) {
            pathError =
                " If you passed in a `path` to your self-hosted PeerServer, " +
                    "you'll also need to pass in that same path when creating a new " +
                    "Peer.";
        }
        self._abort("server-error", "Could not get an ID from the server." + pathError);
    };
    http.onreadystatechange = function () {
        if (http.readyState !== 4) {
            return;
        }
        if (http.status !== 200) {
            http.onerror();
            return;
        }
        self._initialize(http.responseText);
    };
    http.send(null);
};
Peer.prototype._initialize = function (id) {
    this.id = id;
    this.socket.start(this.id, this.options.token);
};
Peer.prototype._handleMessage = function (message) {
    var type = message.type;
    var payload = message.payload;
    var peer = message.src;
    var connection;
    switch (type) {
        case "OPEN":
            this.emit("open", this.id);
            this.open = true;
            break;
        case "ERROR":
            this._abort("server-error", payload.msg);
            break;
        case "ID-TAKEN":
            this._abort("unavailable-id", "ID `" + this.id + "` is taken");
            break;
        case "INVALID-KEY":
            this._abort("invalid-key", 'API KEY "' + this.options.key + '" is invalid');
            break;
        case "LEAVE":
            util_1.util.log("Received leave message from", peer);
            this._cleanupPeer(peer);
            break;
        case "EXPIRE":
            this.emitError("peer-unavailable", "Could not connect to peer " + peer);
            break;
        case "OFFER":
            var connectionId = payload.connectionId;
            connection = this.getConnection(peer, connectionId);
            if (connection) {
                connection.close();
                util_1.util.warn("Offer received for existing Connection ID:", connectionId);
            }
            if (payload.type === "media") {
                connection = new mediaconnection_1.MediaConnection(peer, this, {
                    connectionId: connectionId,
                    _payload: payload,
                    metadata: payload.metadata
                });
                this._addConnection(peer, connection);
                this.emit("call", connection);
            }
            else if (payload.type === "data") {
                connection = new dataconnection_1.DataConnection(peer, this, {
                    connectionId: connectionId,
                    _payload: payload,
                    metadata: payload.metadata,
                    label: payload.label,
                    serialization: payload.serialization,
                    reliable: payload.reliable
                });
                this._addConnection(peer, connection);
                this.emit("connection", connection);
            }
            else {
                util_1.util.warn("Received malformed connection type:", payload.type);
                return;
            }
            var messages = this._getMessages(connectionId);
            for (var i = 0, ii = messages.length; i < ii; i += 1) {
                connection.handleMessage(messages[i]);
            }
            break;
        default:
            if (!payload) {
                util_1.util.warn("You received a malformed message from " + peer + " of type " + type);
                return;
            }
            var id = payload.connectionId;
            connection = this.getConnection(peer, id);
            if (connection && connection.pc) {
                connection.handleMessage(message);
            }
            else if (id) {
                this._storeMessage(id, message);
            }
            else {
                util_1.util.warn("You received an unrecognized message:", message);
            }
            break;
    }
};
Peer.prototype._storeMessage = function (connectionId, message) {
    if (!this._lostMessages[connectionId]) {
        this._lostMessages[connectionId] = [];
    }
    this._lostMessages[connectionId].push(message);
};
Peer.prototype._getMessages = function (connectionId) {
    var messages = this._lostMessages[connectionId];
    if (messages) {
        delete this._lostMessages[connectionId];
        return messages;
    }
    else {
        return [];
    }
};
Peer.prototype.connect = function (peer, options) {
    if (this.disconnected) {
        util_1.util.warn("You cannot connect to a new Peer because you called " +
            ".disconnect() on this Peer and ended your connection with the " +
            "server. You can create a new Peer to reconnect, or call reconnect " +
            "on this peer if you believe its ID to still be available.");
        this.emitError("disconnected", "Cannot connect to new Peer after disconnecting from server.");
        return;
    }
    var connection = new dataconnection_1.DataConnection(peer, this, options);
    this._addConnection(peer, connection);
    return connection;
};
Peer.prototype.call = function (peer, stream, options) {
    if (this.disconnected) {
        util_1.util.warn("You cannot connect to a new Peer because you called " +
            ".disconnect() on this Peer and ended your connection with the " +
            "server. You can create a new Peer to reconnect.");
        this.emitError("disconnected", "Cannot connect to new Peer after disconnecting from server.");
        return;
    }
    if (!stream) {
        util_1.util.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");
        return;
    }
    options = options || {};
    options._stream = stream;
    var call = new mediaconnection_1.MediaConnection(peer, this, options);
    this._addConnection(peer, call);
    return call;
};
Peer.prototype._addConnection = function (peer, connection) {
    if (!this.connections[peer]) {
        this.connections[peer] = [];
    }
    this.connections[peer].push(connection);
};
Peer.prototype.getConnection = function (peer, id) {
    var connections = this.connections[peer];
    if (!connections) {
        return null;
    }
    for (var i = 0, ii = connections.length; i < ii; i++) {
        if (connections[i].id === id) {
            return connections[i];
        }
    }
    return null;
};
Peer.prototype._delayedAbort = function (type, message) {
    var self = this;
    util_1.util.setZeroTimeout(function () {
        self._abort(type, message);
    });
};
Peer.prototype._abort = function (type, message) {
    util_1.util.error("Aborting!");
    if (!this._lastServerId) {
        this.destroy();
    }
    else {
        this.disconnect();
    }
    this.emitError(type, message);
};
Peer.prototype.emitError = function (type, err) {
    util_1.util.error("Error:", err);
    if (typeof err === "string") {
        err = new Error(err);
    }
    err.type = type;
    this.emit("error", err);
};
Peer.prototype.destroy = function () {
    if (!this.destroyed) {
        this._cleanup();
        this.disconnect();
        this.destroyed = true;
    }
};
Peer.prototype._cleanup = function () {
    if (this.connections) {
        var peers = Object.keys(this.connections);
        for (var i = 0, ii = peers.length; i < ii; i++) {
            this._cleanupPeer(peers[i]);
        }
    }
    this.emit("close");
};
Peer.prototype._cleanupPeer = function (peer) {
    var connections = this.connections[peer];
    for (var j = 0, jj = connections.length; j < jj; j += 1) {
        connections[j].close();
    }
};
Peer.prototype.disconnect = function () {
    var self = this;
    util_1.util.setZeroTimeout(function () {
        if (!self.disconnected) {
            self.disconnected = true;
            self.open = false;
            if (self.socket) {
                self.socket.close();
            }
            self.emit("disconnected", self.id);
            self._lastServerId = self.id;
            self.id = null;
        }
    });
};
Peer.prototype.reconnect = function () {
    if (this.disconnected && !this.destroyed) {
        util_1.util.log("Attempting reconnection to server with ID " + this._lastServerId);
        this.disconnected = false;
        this._initializeServerConnection();
        this._initialize(this._lastServerId);
    }
    else if (this.destroyed) {
        throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");
    }
    else if (!this.disconnected && !this.open) {
        util_1.util.error("In a hurry? We're still trying to make the initial connection!");
    }
    else {
        throw new Error("Peer " +
            this.id +
            " cannot reconnect because it is not disconnected from the server!");
    }
};
Peer.prototype.listAllPeers = function (cb) {
    cb = cb || function () { };
    var self = this;
    var http = new XMLHttpRequest();
    var protocol = this.options.secure ? "https://" : "http://";
    var url = protocol +
        this.options.host +
        ":" +
        this.options.port +
        this.options.path +
        this.options.key +
        "/peers";
    var queryString = "?ts=" + new Date().getTime() + "" + Math.random();
    url += queryString;
    http.open("get", url, true);
    http.onerror = function (e) {
        self._abort("server-error", "Could not get peers from the server.");
        cb([]);
    };
    http.onreadystatechange = function () {
        if (http.readyState !== 4) {
            return;
        }
        if (http.status === 401) {
            var helpfulError = "";
            if (self.options.host !== util_1.util.CLOUD_HOST) {
                helpfulError =
                    "It looks like you're using the cloud server. You can email " +
                        "team@peerjs.com to enable peer listing for your API key.";
            }
            else {
                helpfulError =
                    "You need to enable `allow_discovery` on your self-hosted " +
                        "PeerServer to use this feature.";
            }
            cb([]);
            throw new Error("It doesn't look like you have permission to list peers IDs. " +
                helpfulError);
        }
        else if (http.status !== 200) {
            cb([]);
        }
        else {
            cb(JSON.parse(http.responseText));
        }
    };
    http.send(null);
};

},{"./dataconnection":2,"./mediaconnection":4,"./socket":7,"./util":8,"eventemitter3":9}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var eventemitter3_1 = require("eventemitter3");
function Socket(secure, host, port, path, key, wsport) {
    if (!(this instanceof Socket))
        return new Socket(secure, host, port, path, key, wsport);
    wsport = wsport || port;
    eventemitter3_1.EventEmitter.call(this);
    this.disconnected = false;
    this._queue = [];
    var httpProtocol = secure ? "https://" : "http://";
    var wsProtocol = secure ? "wss://" : "ws://";
    this._httpUrl = httpProtocol + host + ":" + port + path + key;
    this._wsUrl = wsProtocol + host + ":" + wsport + path + "peerjs?key=" + key;
}
exports.Socket = Socket;
util_1.util.inherits(Socket, eventemitter3_1.EventEmitter);
Socket.prototype.start = function (id, token) {
    this.id = id;
    this._httpUrl += "/" + id + "/" + token;
    this._wsUrl += "&id=" + id + "&token=" + token;
    this._startXhrStream();
    this._startWebSocket();
};
Socket.prototype._startWebSocket = function (id) {
    var self = this;
    if (this._socket) {
        return;
    }
    this._socket = new WebSocket(this._wsUrl);
    this._socket.onmessage = function (event) {
        try {
            var data = JSON.parse(event.data);
        }
        catch (e) {
            util_1.util.log("Invalid server message", event.data);
            return;
        }
        self.emit("message", data);
    };
    this._socket.onclose = function (event) {
        util_1.util.log("Socket closed.");
        self.disconnected = true;
        self.emit("disconnected");
    };
    this._socket.onopen = function () {
        if (self._timeout) {
            clearTimeout(self._timeout);
            setTimeout(function () {
                self._http.abort();
                self._http = null;
            }, 5000);
        }
        self._sendQueuedMessages();
        util_1.util.log("Socket open");
    };
};
Socket.prototype._startXhrStream = function (n) {
    try {
        var self = this;
        this._http = new XMLHttpRequest();
        this._http._index = 1;
        this._http._streamIndex = n || 0;
        this._http.open("post", this._httpUrl + "/id?i=" + this._http._streamIndex, true);
        this._http.onerror = function () {
            clearTimeout(self._timeout);
            self.emit("disconnected");
        };
        this._http.onreadystatechange = function () {
            if (this.readyState == 2 && this.old) {
                this.old.abort();
                delete this.old;
            }
            else if (this.readyState > 2 &&
                this.status === 200 &&
                this.responseText) {
                self._handleStream(this);
            }
        };
        this._http.send(null);
        this._setHTTPTimeout();
    }
    catch (e) {
        util_1.util.log("XMLHttpRequest not available; defaulting to WebSockets");
    }
};
Socket.prototype._handleStream = function (http) {
    var messages = http.responseText.split("\n");
    if (http._buffer) {
        while (http._buffer.length > 0) {
            var index = http._buffer.shift();
            var bufferedMessage = messages[index];
            try {
                bufferedMessage = JSON.parse(bufferedMessage);
            }
            catch (e) {
                http._buffer.shift(index);
                break;
            }
            this.emit("message", bufferedMessage);
        }
    }
    var message = messages[http._index];
    if (message) {
        http._index += 1;
        if (http._index === messages.length) {
            if (!http._buffer) {
                http._buffer = [];
            }
            http._buffer.push(http._index - 1);
        }
        else {
            try {
                message = JSON.parse(message);
            }
            catch (e) {
                util_1.util.log("Invalid server message", message);
                return;
            }
            this.emit("message", message);
        }
    }
};
Socket.prototype._setHTTPTimeout = function () {
    var self = this;
    this._timeout = setTimeout(function () {
        var old = self._http;
        if (!self._wsOpen()) {
            self._startXhrStream(old._streamIndex + 1);
            self._http.old = old;
        }
        else {
            old.abort();
        }
    }, 25000);
};
Socket.prototype._wsOpen = function () {
    return this._socket && this._socket.readyState == 1;
};
Socket.prototype._sendQueuedMessages = function () {
    for (var i = 0, ii = this._queue.length; i < ii; i += 1) {
        this.send(this._queue[i]);
    }
};
Socket.prototype.send = function (data) {
    if (this.disconnected) {
        return;
    }
    if (!this.id) {
        this._queue.push(data);
        return;
    }
    if (!data.type) {
        this.emit("error", "Invalid message");
        return;
    }
    var message = JSON.stringify(data);
    if (this._wsOpen()) {
        this._socket.send(message);
    }
    else {
        var http = new XMLHttpRequest();
        var url = this._httpUrl + "/" + data.type.toLowerCase();
        http.open("post", url, true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(message);
    }
};
Socket.prototype.close = function () {
    if (!this.disconnected && this._wsOpen()) {
        this._socket.close();
        this.disconnected = true;
    }
};

},{"./util":8,"eventemitter3":9}],8:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultConfig = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
var dataCount = 1;
var js_binarypack_1 = __importDefault(require("js-binarypack"));
var adapter_1 = require("./adapter");
exports.util = {
    noop: function () { },
    CLOUD_HOST: "0.peerjs.com",
    CLOUD_PORT: 443,
    chunkedBrowsers: { Chrome: 1 },
    chunkedMTU: 16300,
    logLevel: 0,
    setLogLevel: function (level) {
        var debugLevel = parseInt(level, 10);
        if (!isNaN(parseInt(level, 10))) {
            exports.util.logLevel = debugLevel;
        }
        else {
            exports.util.logLevel = level ? 3 : 0;
        }
        exports.util.log = exports.util.warn = exports.util.error = exports.util.noop;
        if (exports.util.logLevel > 0) {
            exports.util.error = exports.util._printWith("ERROR");
        }
        if (exports.util.logLevel > 1) {
            exports.util.warn = exports.util._printWith("WARNING");
        }
        if (exports.util.logLevel > 2) {
            exports.util.log = exports.util._print;
        }
    },
    setLogFunction: function (fn) {
        if (fn.constructor !== Function) {
            exports.util.warn("The log function you passed in is not a function. Defaulting to regular logs.");
        }
        else {
            exports.util._print = fn;
        }
    },
    _printWith: function (prefix) {
        return function () {
            var copy = Array.prototype.slice.call(arguments);
            copy.unshift(prefix);
            exports.util._print.apply(exports.util, copy);
        };
    },
    _print: function () {
        var err = false;
        var copy = Array.prototype.slice.call(arguments);
        copy.unshift("PeerJS: ");
        for (var i = 0, l = copy.length; i < l; i++) {
            if (copy[i] instanceof Error) {
                copy[i] = "(" + copy[i].name + ") " + copy[i].message;
                err = true;
            }
        }
        err ? console.error.apply(console, copy) : console.log.apply(console, copy);
    },
    defaultConfig: defaultConfig,
    browser: (function () {
        if (window.mozRTCPeerConnection) {
            return "Firefox";
        }
        else if (window.webkitRTCPeerConnection) {
            return "Chrome";
        }
        else if (window.RTCPeerConnection) {
            return "Supported";
        }
        else {
            return "Unsupported";
        }
    })(),
    supports: (function () {
        if (typeof adapter_1.RTCPeerConnection === "undefined") {
            return {};
        }
        var data = true;
        var audioVideo = true;
        var binaryBlob = false;
        var sctp = false;
        var onnegotiationneeded = !!window.webkitRTCPeerConnection;
        var pc, dc;
        try {
            pc = new adapter_1.RTCPeerConnection(defaultConfig, {
                optional: [{ RtpDataChannels: true }]
            });
        }
        catch (e) {
            data = false;
            audioVideo = false;
        }
        if (data) {
            try {
                dc = pc.createDataChannel("_PEERJSTEST");
            }
            catch (e) {
                data = false;
            }
        }
        if (data) {
            try {
                dc.binaryType = "blob";
                binaryBlob = true;
            }
            catch (e) { }
            var reliablePC = new adapter_1.RTCPeerConnection(defaultConfig, {});
            try {
                var reliableDC = reliablePC.createDataChannel("_PEERJSRELIABLETEST", {});
                sctp = reliableDC.reliable;
            }
            catch (e) { }
            reliablePC.close();
        }
        if (audioVideo) {
            audioVideo = !!pc.addStream;
        }
        if (pc) {
            pc.close();
        }
        return {
            audioVideo: audioVideo,
            data: data,
            binaryBlob: binaryBlob,
            binary: sctp,
            reliable: sctp,
            sctp: sctp,
            onnegotiationneeded: onnegotiationneeded
        };
    })(),
    validateId: function (id) {
        return !id || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.exec(id);
    },
    validateKey: function (key) {
        return !key || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.exec(key);
    },
    debug: false,
    inherits: function (ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    },
    extend: function (dest, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                dest[key] = source[key];
            }
        }
        return dest;
    },
    pack: js_binarypack_1.default.pack,
    unpack: js_binarypack_1.default.unpack,
    log: function () {
        if (exports.util.debug) {
            var err = false;
            var copy = Array.prototype.slice.call(arguments);
            copy.unshift("PeerJS: ");
            for (var i = 0, l = copy.length; i < l; i++) {
                if (copy[i] instanceof Error) {
                    copy[i] = "(" + copy[i].name + ") " + copy[i].message;
                    err = true;
                }
            }
            err
                ? console.error.apply(console, copy)
                : console.log.apply(console, copy);
        }
    },
    setZeroTimeout: (function (global) {
        var timeouts = [];
        var messageName = "zero-timeout-message";
        function setZeroTimeoutPostMessage(fn) {
            timeouts.push(fn);
            global.postMessage(messageName, "*");
        }
        function handleMessage(event) {
            if (event.source == global && event.data == messageName) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                if (timeouts.length) {
                    timeouts.shift()();
                }
            }
        }
        if (global.addEventListener) {
            global.addEventListener("message", handleMessage, true);
        }
        else if (global.attachEvent) {
            global.attachEvent("onmessage", handleMessage);
        }
        return setZeroTimeoutPostMessage;
    })(window),
    chunk: function (bl) {
        var chunks = [];
        var size = bl.size;
        var index;
        var start = (index = 0);
        var total = Math.ceil(size / exports.util.chunkedMTU);
        while (start < size) {
            var end = Math.min(size, start + exports.util.chunkedMTU);
            var b = bl.slice(start, end);
            var chunk = {
                __peerData: dataCount,
                n: index,
                data: b,
                total: total
            };
            chunks.push(chunk);
            start = end;
            index += 1;
        }
        dataCount += 1;
        return chunks;
    },
    blobToArrayBuffer: function (blob, cb) {
        var fr = new FileReader();
        fr.onload = function (evt) {
            cb(evt.target.result);
        };
        fr.readAsArrayBuffer(blob);
    },
    blobToBinaryString: function (blob, cb) {
        var fr = new FileReader();
        fr.onload = function (evt) {
            cb(evt.target.result);
        };
        fr.readAsBinaryString(blob);
    },
    binaryStringToArrayBuffer: function (binary) {
        var byteArray = new Uint8Array(binary.length);
        for (var i = 0; i < binary.length; i++) {
            byteArray[i] = binary.charCodeAt(i) & 0xff;
        }
        return byteArray.buffer;
    },
    randomToken: function () {
        return Math.random()
            .toString(36)
            .substr(2);
    },
    isSecure: function () {
        return location.protocol === "https:";
    }
};

},{"./adapter":1,"js-binarypack":10}],9:[function(require,module,exports){
'use strict';

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  if (!this._events || !this._events[event]) return [];
  if (this._events[event].fn) return [this._events[event].fn];

  for (var i = 0, l = this._events[event].length, ee = new Array(l); i < l; i++) {
    ee[i] = this._events[event][i].fn;
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  if (!this._events || !this._events[event]) return false;

  var listeners = this._events[event]
    , len = arguments.length
    , args
    , i;

  if ('function' === typeof listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  if (fn) {
    if (listeners.fn && (listeners.fn !== fn || (once && !listeners.once))) {
      events.push(listeners);
    }
    if (!listeners.fn) for (var i = 0, length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || (once && !listeners[i].once)) {
        events.push(listeners[i]);
      }
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) {
    this._events[event] = events.length === 1 ? events[0] : events;
  } else {
    delete this._events[event];
  }

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) delete this._events[event];
  else this._events = {};

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the module.
//
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.EventEmitter2 = EventEmitter;
EventEmitter.EventEmitter3 = EventEmitter;

//
// Expose the module.
//
module.exports = EventEmitter;

},{}],10:[function(require,module,exports){
var BufferBuilder = require('./bufferbuilder').BufferBuilder;
var binaryFeatures = require('./bufferbuilder').binaryFeatures;

var BinaryPack = {
  unpack: function(data){
    var unpacker = new Unpacker(data);
    return unpacker.unpack();
  },
  pack: function(data){
    var packer = new Packer();
    packer.pack(data);
    var buffer = packer.getBuffer();
    return buffer;
  }
};

module.exports = BinaryPack;

function Unpacker (data){
  // Data is ArrayBuffer
  this.index = 0;
  this.dataBuffer = data;
  this.dataView = new Uint8Array(this.dataBuffer);
  this.length = this.dataBuffer.byteLength;
}

Unpacker.prototype.unpack = function(){
  var type = this.unpack_uint8();
  if (type < 0x80){
    var positive_fixnum = type;
    return positive_fixnum;
  } else if ((type ^ 0xe0) < 0x20){
    var negative_fixnum = (type ^ 0xe0) - 0x20;
    return negative_fixnum;
  }
  var size;
  if ((size = type ^ 0xa0) <= 0x0f){
    return this.unpack_raw(size);
  } else if ((size = type ^ 0xb0) <= 0x0f){
    return this.unpack_string(size);
  } else if ((size = type ^ 0x90) <= 0x0f){
    return this.unpack_array(size);
  } else if ((size = type ^ 0x80) <= 0x0f){
    return this.unpack_map(size);
  }
  switch(type){
    case 0xc0:
      return null;
    case 0xc1:
      return undefined;
    case 0xc2:
      return false;
    case 0xc3:
      return true;
    case 0xca:
      return this.unpack_float();
    case 0xcb:
      return this.unpack_double();
    case 0xcc:
      return this.unpack_uint8();
    case 0xcd:
      return this.unpack_uint16();
    case 0xce:
      return this.unpack_uint32();
    case 0xcf:
      return this.unpack_uint64();
    case 0xd0:
      return this.unpack_int8();
    case 0xd1:
      return this.unpack_int16();
    case 0xd2:
      return this.unpack_int32();
    case 0xd3:
      return this.unpack_int64();
    case 0xd4:
      return undefined;
    case 0xd5:
      return undefined;
    case 0xd6:
      return undefined;
    case 0xd7:
      return undefined;
    case 0xd8:
      size = this.unpack_uint16();
      return this.unpack_string(size);
    case 0xd9:
      size = this.unpack_uint32();
      return this.unpack_string(size);
    case 0xda:
      size = this.unpack_uint16();
      return this.unpack_raw(size);
    case 0xdb:
      size = this.unpack_uint32();
      return this.unpack_raw(size);
    case 0xdc:
      size = this.unpack_uint16();
      return this.unpack_array(size);
    case 0xdd:
      size = this.unpack_uint32();
      return this.unpack_array(size);
    case 0xde:
      size = this.unpack_uint16();
      return this.unpack_map(size);
    case 0xdf:
      size = this.unpack_uint32();
      return this.unpack_map(size);
  }
}

Unpacker.prototype.unpack_uint8 = function(){
  var byte = this.dataView[this.index] & 0xff;
  this.index++;
  return byte;
};

Unpacker.prototype.unpack_uint16 = function(){
  var bytes = this.read(2);
  var uint16 =
    ((bytes[0] & 0xff) * 256) + (bytes[1] & 0xff);
  this.index += 2;
  return uint16;
}

Unpacker.prototype.unpack_uint32 = function(){
  var bytes = this.read(4);
  var uint32 =
     ((bytes[0]  * 256 +
       bytes[1]) * 256 +
       bytes[2]) * 256 +
       bytes[3];
  this.index += 4;
  return uint32;
}

Unpacker.prototype.unpack_uint64 = function(){
  var bytes = this.read(8);
  var uint64 =
   ((((((bytes[0]  * 256 +
       bytes[1]) * 256 +
       bytes[2]) * 256 +
       bytes[3]) * 256 +
       bytes[4]) * 256 +
       bytes[5]) * 256 +
       bytes[6]) * 256 +
       bytes[7];
  this.index += 8;
  return uint64;
}


Unpacker.prototype.unpack_int8 = function(){
  var uint8 = this.unpack_uint8();
  return (uint8 < 0x80 ) ? uint8 : uint8 - (1 << 8);
};

Unpacker.prototype.unpack_int16 = function(){
  var uint16 = this.unpack_uint16();
  return (uint16 < 0x8000 ) ? uint16 : uint16 - (1 << 16);
}

Unpacker.prototype.unpack_int32 = function(){
  var uint32 = this.unpack_uint32();
  return (uint32 < Math.pow(2, 31) ) ? uint32 :
    uint32 - Math.pow(2, 32);
}

Unpacker.prototype.unpack_int64 = function(){
  var uint64 = this.unpack_uint64();
  return (uint64 < Math.pow(2, 63) ) ? uint64 :
    uint64 - Math.pow(2, 64);
}

Unpacker.prototype.unpack_raw = function(size){
  if ( this.length < this.index + size){
    throw new Error('BinaryPackFailure: index is out of range'
      + ' ' + this.index + ' ' + size + ' ' + this.length);
  }
  var buf = this.dataBuffer.slice(this.index, this.index + size);
  this.index += size;

    //buf = util.bufferToString(buf);

  return buf;
}

Unpacker.prototype.unpack_string = function(size){
  var bytes = this.read(size);
  var i = 0, str = '', c, code;
  while(i < size){
    c = bytes[i];
    if ( c < 128){
      str += String.fromCharCode(c);
      i++;
    } else if ((c ^ 0xc0) < 32){
      code = ((c ^ 0xc0) << 6) | (bytes[i+1] & 63);
      str += String.fromCharCode(code);
      i += 2;
    } else {
      code = ((c & 15) << 12) | ((bytes[i+1] & 63) << 6) |
        (bytes[i+2] & 63);
      str += String.fromCharCode(code);
      i += 3;
    }
  }
  this.index += size;
  return str;
}

Unpacker.prototype.unpack_array = function(size){
  var objects = new Array(size);
  for(var i = 0; i < size ; i++){
    objects[i] = this.unpack();
  }
  return objects;
}

Unpacker.prototype.unpack_map = function(size){
  var map = {};
  for(var i = 0; i < size ; i++){
    var key  = this.unpack();
    var value = this.unpack();
    map[key] = value;
  }
  return map;
}

Unpacker.prototype.unpack_float = function(){
  var uint32 = this.unpack_uint32();
  var sign = uint32 >> 31;
  var exp  = ((uint32 >> 23) & 0xff) - 127;
  var fraction = ( uint32 & 0x7fffff ) | 0x800000;
  return (sign == 0 ? 1 : -1) *
    fraction * Math.pow(2, exp - 23);
}

Unpacker.prototype.unpack_double = function(){
  var h32 = this.unpack_uint32();
  var l32 = this.unpack_uint32();
  var sign = h32 >> 31;
  var exp  = ((h32 >> 20) & 0x7ff) - 1023;
  var hfrac = ( h32 & 0xfffff ) | 0x100000;
  var frac = hfrac * Math.pow(2, exp - 20) +
    l32   * Math.pow(2, exp - 52);
  return (sign == 0 ? 1 : -1) * frac;
}

Unpacker.prototype.read = function(length){
  var j = this.index;
  if (j + length <= this.length) {
    return this.dataView.subarray(j, j + length);
  } else {
    throw new Error('BinaryPackFailure: read index out of range');
  }
}

function Packer(){
  this.bufferBuilder = new BufferBuilder();
}

Packer.prototype.getBuffer = function(){
  return this.bufferBuilder.getBuffer();
}

Packer.prototype.pack = function(value){
  var type = typeof(value);
  if (type == 'string'){
    this.pack_string(value);
  } else if (type == 'number'){
    if (Math.floor(value) === value){
      this.pack_integer(value);
    } else{
      this.pack_double(value);
    }
  } else if (type == 'boolean'){
    if (value === true){
      this.bufferBuilder.append(0xc3);
    } else if (value === false){
      this.bufferBuilder.append(0xc2);
    }
  } else if (type == 'undefined'){
    this.bufferBuilder.append(0xc0);
  } else if (type == 'object'){
    if (value === null){
      this.bufferBuilder.append(0xc0);
    } else {
      var constructor = value.constructor;
      if (constructor == Array){
        this.pack_array(value);
      } else if (constructor == Blob || constructor == File) {
        this.pack_bin(value);
      } else if (constructor == ArrayBuffer) {
        if(binaryFeatures.useArrayBufferView) {
          this.pack_bin(new Uint8Array(value));
        } else {
          this.pack_bin(value);
        }
      } else if ('BYTES_PER_ELEMENT' in value){
        if(binaryFeatures.useArrayBufferView) {
          this.pack_bin(new Uint8Array(value.buffer));
        } else {
          this.pack_bin(value.buffer);
        }
      } else if (constructor == Object){
        this.pack_object(value);
      } else if (constructor == Date){
        this.pack_string(value.toString());
      } else if (typeof value.toBinaryPack == 'function'){
        this.bufferBuilder.append(value.toBinaryPack());
      } else {
        throw new Error('Type "' + constructor.toString() + '" not yet supported');
      }
    }
  } else {
    throw new Error('Type "' + type + '" not yet supported');
  }
  this.bufferBuilder.flush();
}


Packer.prototype.pack_bin = function(blob){
  var length = blob.length || blob.byteLength || blob.size;
  if (length <= 0x0f){
    this.pack_uint8(0xa0 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xda) ;
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdb);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  this.bufferBuilder.append(blob);
}

Packer.prototype.pack_string = function(str){
  var length = utf8Length(str);

  if (length <= 0x0f){
    this.pack_uint8(0xb0 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xd8) ;
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xd9);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  this.bufferBuilder.append(str);
}

Packer.prototype.pack_array = function(ary){
  var length = ary.length;
  if (length <= 0x0f){
    this.pack_uint8(0x90 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xdc)
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdd);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  for(var i = 0; i < length ; i++){
    this.pack(ary[i]);
  }
}

Packer.prototype.pack_integer = function(num){
  if ( -0x20 <= num && num <= 0x7f){
    this.bufferBuilder.append(num & 0xff);
  } else if (0x00 <= num && num <= 0xff){
    this.bufferBuilder.append(0xcc);
    this.pack_uint8(num);
  } else if (-0x80 <= num && num <= 0x7f){
    this.bufferBuilder.append(0xd0);
    this.pack_int8(num);
  } else if ( 0x0000 <= num && num <= 0xffff){
    this.bufferBuilder.append(0xcd);
    this.pack_uint16(num);
  } else if (-0x8000 <= num && num <= 0x7fff){
    this.bufferBuilder.append(0xd1);
    this.pack_int16(num);
  } else if ( 0x00000000 <= num && num <= 0xffffffff){
    this.bufferBuilder.append(0xce);
    this.pack_uint32(num);
  } else if (-0x80000000 <= num && num <= 0x7fffffff){
    this.bufferBuilder.append(0xd2);
    this.pack_int32(num);
  } else if (-0x8000000000000000 <= num && num <= 0x7FFFFFFFFFFFFFFF){
    this.bufferBuilder.append(0xd3);
    this.pack_int64(num);
  } else if (0x0000000000000000 <= num && num <= 0xFFFFFFFFFFFFFFFF){
    this.bufferBuilder.append(0xcf);
    this.pack_uint64(num);
  } else{
    throw new Error('Invalid integer');
  }
}

Packer.prototype.pack_double = function(num){
  var sign = 0;
  if (num < 0){
    sign = 1;
    num = -num;
  }
  var exp  = Math.floor(Math.log(num) / Math.LN2);
  var frac0 = num / Math.pow(2, exp) - 1;
  var frac1 = Math.floor(frac0 * Math.pow(2, 52));
  var b32   = Math.pow(2, 32);
  var h32 = (sign << 31) | ((exp+1023) << 20) |
      (frac1 / b32) & 0x0fffff;
  var l32 = frac1 % b32;
  this.bufferBuilder.append(0xcb);
  this.pack_int32(h32);
  this.pack_int32(l32);
}

Packer.prototype.pack_object = function(obj){
  var keys = Object.keys(obj);
  var length = keys.length;
  if (length <= 0x0f){
    this.pack_uint8(0x80 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xde);
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdf);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  for(var prop in obj){
    if (obj.hasOwnProperty(prop)){
      this.pack(prop);
      this.pack(obj[prop]);
    }
  }
}

Packer.prototype.pack_uint8 = function(num){
  this.bufferBuilder.append(num);
}

Packer.prototype.pack_uint16 = function(num){
  this.bufferBuilder.append(num >> 8);
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_uint32 = function(num){
  var n = num & 0xffffffff;
  this.bufferBuilder.append((n & 0xff000000) >>> 24);
  this.bufferBuilder.append((n & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((n & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((n & 0x000000ff));
}

Packer.prototype.pack_uint64 = function(num){
  var high = num / Math.pow(2, 32);
  var low  = num % Math.pow(2, 32);
  this.bufferBuilder.append((high & 0xff000000) >>> 24);
  this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((high & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((high & 0x000000ff));
  this.bufferBuilder.append((low  & 0xff000000) >>> 24);
  this.bufferBuilder.append((low  & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((low  & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((low  & 0x000000ff));
}

Packer.prototype.pack_int8 = function(num){
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_int16 = function(num){
  this.bufferBuilder.append((num & 0xff00) >> 8);
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_int32 = function(num){
  this.bufferBuilder.append((num >>> 24) & 0xff);
  this.bufferBuilder.append((num & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((num & 0x0000ff00) >>> 8);
  this.bufferBuilder.append((num & 0x000000ff));
}

Packer.prototype.pack_int64 = function(num){
  var high = Math.floor(num / Math.pow(2, 32));
  var low  = num % Math.pow(2, 32);
  this.bufferBuilder.append((high & 0xff000000) >>> 24);
  this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((high & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((high & 0x000000ff));
  this.bufferBuilder.append((low  & 0xff000000) >>> 24);
  this.bufferBuilder.append((low  & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((low  & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((low  & 0x000000ff));
}

function _utf8Replace(m){
  var code = m.charCodeAt(0);

  if(code <= 0x7ff) return '00';
  if(code <= 0xffff) return '000';
  if(code <= 0x1fffff) return '0000';
  if(code <= 0x3ffffff) return '00000';
  return '000000';
}

function utf8Length(str){
  if (str.length > 600) {
    // Blob method faster for large strings
    return (new Blob([str])).size;
  } else {
    return str.replace(/[^\u0000-\u007F]/g, _utf8Replace).length;
  }
}

},{"./bufferbuilder":11}],11:[function(require,module,exports){
var binaryFeatures = {};
binaryFeatures.useBlobBuilder = (function(){
  try {
    new Blob([]);
    return false;
  } catch (e) {
    return true;
  }
})();

binaryFeatures.useArrayBufferView = !binaryFeatures.useBlobBuilder && (function(){
  try {
    return (new Blob([new Uint8Array([])])).size === 0;
  } catch (e) {
    return true;
  }
})();

module.exports.binaryFeatures = binaryFeatures;
var BlobBuilder = module.exports.BlobBuilder;
if (typeof window != 'undefined') {
  BlobBuilder = module.exports.BlobBuilder = window.WebKitBlobBuilder ||
    window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder;
}

function BufferBuilder(){
  this._pieces = [];
  this._parts = [];
}

BufferBuilder.prototype.append = function(data) {
  if(typeof data === 'number') {
    this._pieces.push(data);
  } else {
    this.flush();
    this._parts.push(data);
  }
};

BufferBuilder.prototype.flush = function() {
  if (this._pieces.length > 0) {
    var buf = new Uint8Array(this._pieces);
    if(!binaryFeatures.useArrayBufferView) {
      buf = buf.buffer;
    }
    this._parts.push(buf);
    this._pieces = [];
  }
};

BufferBuilder.prototype.getBuffer = function() {
  this.flush();
  if(binaryFeatures.useBlobBuilder) {
    var builder = new BlobBuilder();
    for(var i = 0, ii = this._parts.length; i < ii; i++) {
      builder.append(this._parts[i]);
    }
    return builder.getBlob();
  } else {
    return new Blob(this._parts);
  }
};

module.exports.BufferBuilder = BufferBuilder;

},{}],12:[function(require,module,exports){
var util = require('./util');

/**
 * Reliable transfer for Chrome Canary DataChannel impl.
 * Author: @michellebu
 */
function Reliable(dc, debug) {
  if (!(this instanceof Reliable)) return new Reliable(dc);
  this._dc = dc;

  util.debug = debug;

  // Messages sent/received so far.
  // id: { ack: n, chunks: [...] }
  this._outgoing = {};
  // id: { ack: ['ack', id, n], chunks: [...] }
  this._incoming = {};
  this._received = {};

  // Window size.
  this._window = 1000;
  // MTU.
  this._mtu = 500;
  // Interval for setInterval. In ms.
  this._interval = 0;

  // Messages sent.
  this._count = 0;

  // Outgoing message queue.
  this._queue = [];

  this._setupDC();
};

// Send a message reliably.
Reliable.prototype.send = function(msg) {
  // Determine if chunking is necessary.
  var bl = util.pack(msg);
  if (bl.size < this._mtu) {
    this._handleSend(['no', bl]);
    return;
  }

  this._outgoing[this._count] = {
    ack: 0,
    chunks: this._chunk(bl)
  };

  if (util.debug) {
    this._outgoing[this._count].timer = new Date();
  }

  // Send prelim window.
  this._sendWindowedChunks(this._count);
  this._count += 1;
};

// Set up interval for processing queue.
Reliable.prototype._setupInterval = function() {
  // TODO: fail gracefully.

  var self = this;
  this._timeout = setInterval(function() {
    // FIXME: String stuff makes things terribly async.
    var msg = self._queue.shift();
    if (msg._multiple) {
      for (var i = 0, ii = msg.length; i < ii; i += 1) {
        self._intervalSend(msg[i]);
      }
    } else {
      self._intervalSend(msg);
    }
  }, this._interval);
};

Reliable.prototype._intervalSend = function(msg) {
  var self = this;
  msg = util.pack(msg);
  util.blobToBinaryString(msg, function(str) {
    self._dc.send(str);
  });
  if (self._queue.length === 0) {
    clearTimeout(self._timeout);
    self._timeout = null;
    //self._processAcks();
  }
};

// Go through ACKs to send missing pieces.
Reliable.prototype._processAcks = function() {
  for (var id in this._outgoing) {
    if (this._outgoing.hasOwnProperty(id)) {
      this._sendWindowedChunks(id);
    }
  }
};

// Handle sending a message.
// FIXME: Don't wait for interval time for all messages...
Reliable.prototype._handleSend = function(msg) {
  var push = true;
  for (var i = 0, ii = this._queue.length; i < ii; i += 1) {
    var item = this._queue[i];
    if (item === msg) {
      push = false;
    } else if (item._multiple && item.indexOf(msg) !== -1) {
      push = false;
    }
  }
  if (push) {
    this._queue.push(msg);
    if (!this._timeout) {
      this._setupInterval();
    }
  }
};

// Set up DataChannel handlers.
Reliable.prototype._setupDC = function() {
  // Handle various message types.
  var self = this;
  this._dc.onmessage = function(e) {
    var msg = e.data;
    var datatype = msg.constructor;
    // FIXME: msg is String until binary is supported.
    // Once that happens, this will have to be smarter.
    if (datatype === String) {
      var ab = util.binaryStringToArrayBuffer(msg);
      msg = util.unpack(ab);
      self._handleMessage(msg);
    }
  };
};

// Handles an incoming message.
Reliable.prototype._handleMessage = function(msg) {
  var id = msg[1];
  var idata = this._incoming[id];
  var odata = this._outgoing[id];
  var data;
  switch (msg[0]) {
    // No chunking was done.
    case 'no':
      var message = id;
      if (!!message) {
        this.onmessage(util.unpack(message));
      }
      break;
    // Reached the end of the message.
    case 'end':
      data = idata;

      // In case end comes first.
      this._received[id] = msg[2];

      if (!data) {
        break;
      }

      this._ack(id);
      break;
    case 'ack':
      data = odata;
      if (!!data) {
        var ack = msg[2];
        // Take the larger ACK, for out of order messages.
        data.ack = Math.max(ack, data.ack);

        // Clean up when all chunks are ACKed.
        if (data.ack >= data.chunks.length) {
          util.log('Time: ', new Date() - data.timer);
          delete this._outgoing[id];
        } else {
          this._processAcks();
        }
      }
      // If !data, just ignore.
      break;
    // Received a chunk of data.
    case 'chunk':
      // Create a new entry if none exists.
      data = idata;
      if (!data) {
        var end = this._received[id];
        if (end === true) {
          break;
        }
        data = {
          ack: ['ack', id, 0],
          chunks: []
        };
        this._incoming[id] = data;
      }

      var n = msg[2];
      var chunk = msg[3];
      data.chunks[n] = new Uint8Array(chunk);

      // If we get the chunk we're looking for, ACK for next missing.
      // Otherwise, ACK the same N again.
      if (n === data.ack[2]) {
        this._calculateNextAck(id);
      }
      this._ack(id);
      break;
    default:
      // Shouldn't happen, but would make sense for message to just go
      // through as is.
      this._handleSend(msg);
      break;
  }
};

// Chunks BL into smaller messages.
Reliable.prototype._chunk = function(bl) {
  var chunks = [];
  var size = bl.size;
  var start = 0;
  while (start < size) {
    var end = Math.min(size, start + this._mtu);
    var b = bl.slice(start, end);
    var chunk = {
      payload: b
    }
    chunks.push(chunk);
    start = end;
  }
  util.log('Created', chunks.length, 'chunks.');
  return chunks;
};

// Sends ACK N, expecting Nth blob chunk for message ID.
Reliable.prototype._ack = function(id) {
  var ack = this._incoming[id].ack;

  // if ack is the end value, then call _complete.
  if (this._received[id] === ack[2]) {
    this._complete(id);
    this._received[id] = true;
  }

  this._handleSend(ack);
};

// Calculates the next ACK number, given chunks.
Reliable.prototype._calculateNextAck = function(id) {
  var data = this._incoming[id];
  var chunks = data.chunks;
  for (var i = 0, ii = chunks.length; i < ii; i += 1) {
    // This chunk is missing!!! Better ACK for it.
    if (chunks[i] === undefined) {
      data.ack[2] = i;
      return;
    }
  }
  data.ack[2] = chunks.length;
};

// Sends the next window of chunks.
Reliable.prototype._sendWindowedChunks = function(id) {
  util.log('sendWindowedChunks for: ', id);
  var data = this._outgoing[id];
  var ch = data.chunks;
  var chunks = [];
  var limit = Math.min(data.ack + this._window, ch.length);
  for (var i = data.ack; i < limit; i += 1) {
    if (!ch[i].sent || i === data.ack) {
      ch[i].sent = true;
      chunks.push(['chunk', id, i, ch[i].payload]);
    }
  }
  if (data.ack + this._window >= ch.length) {
    chunks.push(['end', id, ch.length])
  }
  chunks._multiple = true;
  this._handleSend(chunks);
};

// Puts together a message from chunks.
Reliable.prototype._complete = function(id) {
  util.log('Completed called for', id);
  var self = this;
  var chunks = this._incoming[id].chunks;
  var bl = new Blob(chunks);
  util.blobToArrayBuffer(bl, function(ab) {
    self.onmessage(util.unpack(ab));
  });
  delete this._incoming[id];
};

// Ups bandwidth limit on SDP. Meant to be called during offer/answer.
Reliable.higherBandwidthSDP = function(sdp) {
  // AS stands for Application-Specific Maximum.
  // Bandwidth number is in kilobits / sec.
  // See RFC for more info: http://www.ietf.org/rfc/rfc2327.txt

  // Chrome 31+ doesn't want us munging the SDP, so we'll let them have their
  // way.
  var version = navigator.appVersion.match(/Chrome\/(.*?) /);
  if (version) {
    version = parseInt(version[1].split('.').shift());
    if (version < 31) {
      var parts = sdp.split('b=AS:30');
      var replace = 'b=AS:102400'; // 100 Mbps
      if (parts.length > 1) {
        return parts[0] + replace + parts[1];
      }
    }
  }

  return sdp;
};

// Overwritten, typically.
Reliable.prototype.onmessage = function(msg) {};

module.exports.Reliable = Reliable;

},{"./util":13}],13:[function(require,module,exports){
var BinaryPack = require('js-binarypack');

var util = {
  debug: false,
  
  inherits: function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  },
  extend: function(dest, source) {
    for(var key in source) {
      if(source.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
    return dest;
  },
  pack: BinaryPack.pack,
  unpack: BinaryPack.unpack,
  
  log: function () {
    if (util.debug) {
      var copy = [];
      for (var i = 0; i < arguments.length; i++) {
        copy[i] = arguments[i];
      }
      copy.unshift('Reliable: ');
      console.log.apply(console, copy);
    }
  },

  setZeroTimeout: (function(global) {
    var timeouts = [];
    var messageName = 'zero-timeout-message';

    // Like setTimeout, but only takes a function argument.	 There's
    // no time argument (always zero) and no arguments (you have to
    // use a closure).
    function setZeroTimeoutPostMessage(fn) {
      timeouts.push(fn);
      global.postMessage(messageName, '*');
    }		

    function handleMessage(event) {
      if (event.source == global && event.data == messageName) {
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        if (timeouts.length) {
          timeouts.shift()();
        }
      }
    }
    if (global.addEventListener) {
      global.addEventListener('message', handleMessage, true);
    } else if (global.attachEvent) {
      global.attachEvent('onmessage', handleMessage);
    }
    return setZeroTimeoutPostMessage;
  }(this)),
  
  blobToArrayBuffer: function(blob, cb){
    var fr = new FileReader();
    fr.onload = function(evt) {
      cb(evt.target.result);
    };
    fr.readAsArrayBuffer(blob);
  },
  blobToBinaryString: function(blob, cb){
    var fr = new FileReader();
    fr.onload = function(evt) {
      cb(evt.target.result);
    };
    fr.readAsBinaryString(blob);
  },
  binaryStringToArrayBuffer: function(binary) {
    var byteArray = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      byteArray[i] = binary.charCodeAt(i) & 0xff;
    }
    return byteArray.buffer;
  },
  randomToken: function () {
    return Math.random().toString(36).substr(2);
  }
};

module.exports = util;

},{"js-binarypack":10}]},{},[3]);
