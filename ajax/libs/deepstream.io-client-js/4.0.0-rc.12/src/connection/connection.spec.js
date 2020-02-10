"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var bluebird_1 = require("bluebird");
var chai_1 = require("chai");
var sinon_1 = require("sinon");
var connection_1 = require("./connection");
var mocks_1 = require("../test/mocks");
var client_options_1 = require("../client-options");
var constants_1 = require("../constants");
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var Emitter = require("component-emitter2");
describe('connection', function () {
    var connection;
    var services;
    var options;
    var emitter;
    var emitterMock;
    var socket;
    var socketMock;
    var loggerMock;
    var authCallback;
    var url = 'wss://localhost:6020/deepstream';
    var authData = { password: '123456' };
    var clientData = { name: 'elton' };
    var heartbeatInterval = 15;
    var initialUrl = 'wss://localhost:6020/deepstream';
    var otherUrl = 'wss://otherhost:6020/deepstream';
    var reconnectIntervalIncrement = 20;
    var maxReconnectAttempts = 3;
    var maxReconnectInterval = 300;
    var offlineBufferTimeout = 10;
    beforeEach(function () {
        services = mocks_1.getServicesMock();
        options = Object.assign(client_options_1.DefaultOptions, {
            heartbeatInterval: heartbeatInterval,
            reconnectIntervalIncrement: reconnectIntervalIncrement,
            maxReconnectAttempts: maxReconnectAttempts,
            maxReconnectInterval: maxReconnectInterval,
            offlineBufferTimeout: offlineBufferTimeout
        });
        emitter = new Emitter();
        emitterMock = sinon_1.mock(emitter);
        connection = new connection_1.Connection(services, options, initialUrl, emitter);
        getSocketMock();
        getLoggerMock();
        authCallback = sinon_1.spy();
    });
    afterEach(function () {
        services.verify();
        emitterMock.verify();
        loggerMock.verify();
    });
    it('supports happiest path', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, awaitConnectionAck()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sendChallenge()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, receiveChallengeAccept()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, sendAuth()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, receiveAuthResponse()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, sendMessage()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, closeConnection()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, recieveConnectionClose()];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('send pong when ping received across all states', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, openConnection()];
                case 1:
                    _a.sent();
                    sendPong();
                    receivePing();
                    return [2 /*return*/];
            }
        });
    }); });
    it('miss heartbeat once', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, openConnection()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, bluebird_1.Promise.delay(heartbeatInterval * 1.5)
                        // verify no errors in afterAll
                    ];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('miss a heartbeat twice and receive error', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loggerMock
                        .expects('error')
                        .once()
                        .withExactArgs({ topic: message_constants_1.TOPIC.CONNECTION }, constants_1.EVENT.HEARTBEAT_TIMEOUT);
                    socket.getTimeSinceLastMessage = function () { return 200; };
                    return [4 /*yield*/, openConnection()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('get redirected to server B while connecting to server A, reconnect to server A when connection to server B is lost', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, awaitConnectionAck()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sendChallenge()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, receiveRedirect()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, openConnectionToRedirectedServer()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, sendChallenge()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, receiveChallengeAccept()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, loseConnection()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, reconnectToInitialServer()];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('handles challenge denial', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emitterMock
                        .expects('emit')
                        .once()
                        .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.CHALLENGE_DENIED);
                    return [4 /*yield*/, awaitConnectionAck()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sendChallenge()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, receiveChallengeReject()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('handles authentication when challenge was denied', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loggerMock
                        .expects('error')
                        .once()
                        .withArgs({ topic: message_constants_1.TOPIC.CONNECTION }, constants_1.EVENT.IS_CLOSED);
                    emitterMock
                        .expects('emit')
                        .once()
                        .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.CHALLENGE_DENIED);
                    return [4 /*yield*/, awaitConnectionAck()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sendChallenge()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, receiveChallengeReject()];
                case 3:
                    _a.sent();
                    connection.authenticate(authData, authCallback);
                    sinon_1.assert.callCount(authCallback, 0);
                    return [4 /*yield*/, bluebird_1.Promise.delay(10)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('handles successful authentication', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, awaitConnectionAck()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sendChallenge()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, receiveChallengeAccept()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, sendAuth()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, receiveAuthResponse()];
                case 5:
                    _a.sent();
                    sinon_1.assert.calledOnce(authCallback);
                    sinon_1.assert.calledWithExactly(authCallback, true, clientData);
                    return [2 /*return*/];
            }
        });
    }); });
    it('handles rejected authentication', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emitterMock
                        .expects('emit')
                        .once()
                        .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.AWAITING_AUTHENTICATION);
                    return [4 /*yield*/, awaitConnectionAck()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sendChallenge()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, receiveChallengeAccept()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, sendAuth()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, receiveAuthRejectResponse()];
                case 5:
                    _a.sent();
                    sinon_1.assert.calledOnce(authCallback);
                    sinon_1.assert.calledWithExactly(authCallback, false, { reason: constants_1.EVENT.INVALID_AUTHENTICATION_DETAILS });
                    return [2 /*return*/];
            }
        });
    }); });
    it('handles authenticating too may times', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emitterMock
                        .expects('emit')
                        .once()
                        .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.TOO_MANY_AUTH_ATTEMPTS);
                    return [4 /*yield*/, awaitConnectionAck()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sendChallenge()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, receiveChallengeAccept()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, sendAuth()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, receiveTooManyAuthAttempts()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('handles authentication timeout', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emitterMock
                        .expects('emit')
                        .once()
                        .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.AUTHENTICATION_TIMEOUT);
                    // loggerMock
                    //   .expects('error')
                    //   .once()
                    //   .withExactArgs(
                    //     { topic: TOPIC.CONNECTION },
                    //     EVENT.AUTHENTICATION_TIMEOUT
                    // )
                    return [4 /*yield*/, awaitConnectionAck()];
                case 1:
                    // loggerMock
                    //   .expects('error')
                    //   .once()
                    //   .withExactArgs(
                    //     { topic: TOPIC.CONNECTION },
                    //     EVENT.AUTHENTICATION_TIMEOUT
                    // )
                    _a.sent();
                    return [4 /*yield*/, sendChallenge()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, receiveChallengeAccept()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, receiveAuthenticationTimeout()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('try to authenticate with invalid data and receive error', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, awaitConnectionAck()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sendChallenge()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, receiveChallengeAccept()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, sendBadAuthDataAndReceiveError()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('tries to reconnect every time connection fails, stops when max reconnection attempts is reached and closes connection', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emitterMock
                        .expects('emit')
                        .once()
                        .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.CLOSING);
                    emitterMock
                        .expects('emit')
                        .once()
                        .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.RECONNECTING);
                    emitterMock
                        .expects('emit')
                        .once()
                        .withExactArgs(constants_1.EVENT[constants_1.EVENT.MAX_RECONNECTION_ATTEMPTS_REACHED], 3);
                    return [4 /*yield*/, awaitConnectionAck()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sendChallenge()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, receiveChallengeAccept()
                        // try to reconnect first time
                    ];
                case 3:
                    _a.sent();
                    // try to reconnect first time
                    return [4 /*yield*/, receiveConnectionError()];
                case 4:
                    // try to reconnect first time
                    _a.sent();
                    return [4 /*yield*/, bluebird_1.Promise.delay(0)
                        // try to reconnect second time
                    ];
                case 5:
                    _a.sent();
                    // try to reconnect second time
                    return [4 /*yield*/, receiveConnectionError()];
                case 6:
                    // try to reconnect second time
                    _a.sent();
                    return [4 /*yield*/, bluebird_1.Promise.delay(25)
                        // try to reconnect third time (now max is reached)
                    ];
                case 7:
                    _a.sent();
                    // try to reconnect third time (now max is reached)
                    return [4 /*yield*/, receiveConnectionError()];
                case 8:
                    // try to reconnect third time (now max is reached)
                    _a.sent();
                    return [4 /*yield*/, bluebird_1.Promise.delay(45)
                        // try to reconnect fourth time (try to surpass the allowed max, fail)
                    ];
                case 9:
                    _a.sent();
                    // try to reconnect fourth time (try to surpass the allowed max, fail)
                    return [4 /*yield*/, receiveConnectionError()];
                case 10:
                    // try to reconnect fourth time (try to surpass the allowed max, fail)
                    _a.sent();
                    return [4 /*yield*/, bluebird_1.Promise.delay(70)];
                case 11:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('tries to reconnect if the connection drops unexpectedly', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emitterMock
                        .expects('emit')
                        .once()
                        .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.RECONNECTING);
                    return [4 /*yield*/, awaitConnectionAck()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sendChallenge()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, receiveChallengeAccept()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, receiveConnectionError()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('emits reauthenticationFailure if reauthentication is rejected', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emitterMock
                        .expects('emit')
                        .once()
                        .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.RECONNECTING);
                    emitterMock
                        .expects('emit')
                        .once()
                        .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.AWAITING_AUTHENTICATION);
                    emitterMock
                        .expects('emit')
                        .once()
                        .withExactArgs(constants_1.EVENT.REAUTHENTICATION_FAILURE, { reason: constants_1.EVENT.INVALID_AUTHENTICATION_DETAILS });
                    return [4 /*yield*/, awaitConnectionAck()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sendChallenge()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, receiveChallengeAccept()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, sendAuth()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, receiveAuthResponse()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, receiveConnectionError()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, awaitConnectionAck()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, sendChallenge()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, receiveChallengeAcceptAndResendAuth()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, receiveAuthRejectResponse()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                case 12:
                    _a.sent();
                    sinon_1.assert.calledOnce(authCallback);
                    return [2 /*return*/];
            }
        });
    }); });
    it('goes into limbo on connection lost', function () { return __awaiter(_this, void 0, void 0, function () {
        var limboSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, openConnection()];
                case 1:
                    _a.sent();
                    limboSpy = sinon_1.spy();
                    connection.onExitLimbo(limboSpy);
                    return [4 /*yield*/, loseConnection()];
                case 2:
                    _a.sent();
                    chai_1.expect(connection.isInLimbo).to.equal(true);
                    return [4 /*yield*/, bluebird_1.Promise.delay(20)];
                case 3:
                    _a.sent();
                    sinon_1.assert.calledOnce(limboSpy);
                    chai_1.expect(connection.isInLimbo).to.equal(false);
                    return [2 /*return*/];
            }
        });
    }); });
    function openConnection() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        socket.simulateOpen();
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function awaitConnectionAck() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emitterMock.expects('emit')
                            .once()
                            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.AWAITING_CONNECTION);
                        emitterMock.expects('emit')
                            .once()
                            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.CHALLENGING);
                        chai_1.expect(socket.url).to.equal(initialUrl);
                        socket.simulateOpen();
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function sendChallenge() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        socketMock
                            .expects('sendParsedMessage')
                            .once()
                            .withExactArgs([{
                                topic: message_constants_1.TOPIC.CONNECTION,
                                action: message_constants_1.CONNECTION_ACTIONS.CHALLENGE,
                                url: url
                            }]);
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function receiveChallengeAccept() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emitterMock.expects('emit')
                            .once()
                            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.AWAITING_AUTHENTICATION);
                        socket.simulateMessages([{
                                topic: message_constants_1.TOPIC.CONNECTION,
                                action: message_constants_1.CONNECTION_ACTIONS.ACCEPT
                            }]);
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function receiveChallengeAcceptAndResendAuth() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emitterMock.expects('emit')
                            .once()
                            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.AWAITING_AUTHENTICATION);
                        emitterMock.expects('emit')
                            .once()
                            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.AUTHENTICATING);
                        socketMock
                            .expects('sendParsedMessage')
                            .once()
                            .withExactArgs({
                            topic: message_constants_1.TOPIC.AUTH,
                            action: message_constants_1.AUTH_ACTIONS.REQUEST,
                            parsedData: authData
                        });
                        socket.simulateMessages([{
                                topic: message_constants_1.TOPIC.CONNECTION,
                                action: message_constants_1.CONNECTION_ACTIONS.ACCEPT
                            }]);
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function receiveChallengeReject() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        socket.simulateMessages([{
                                topic: message_constants_1.TOPIC.CONNECTION,
                                action: message_constants_1.CONNECTION_ACTIONS.REJECT
                            }]);
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function sendAuth() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emitterMock.expects('emit')
                            .once()
                            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.AUTHENTICATING);
                        socketMock
                            .expects('sendParsedMessage')
                            .once()
                            .withExactArgs({
                            topic: message_constants_1.TOPIC.AUTH,
                            action: message_constants_1.AUTH_ACTIONS.REQUEST,
                            parsedData: authData
                        });
                        connection.authenticate(authData, authCallback);
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function sendBadAuthDataAndReceiveError() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chai_1.expect(function () {
                            connection.authenticate('Bad Auth Data', authCallback);
                        }).to.throw('invalid argument authParamsOrCallback');
                        chai_1.expect(function () {
                            connection.authenticate({}, 'Bad Auth Data');
                        }).to.throw('invalid argument callback');
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    // async function sendInvalidAuth () {
    //   emitterMock.expects('emit')
    //     .once()
    //     .withExactArgs(EVENT.CONNECTION_STATE_CHANGED, CONNECTION_STATE.AUTHENTICATING)
    //   socketMock
    //     .expects('sendParsedMessage')
    //     .once()
    //     .withExactArgs({
    //       topic: TOPIC.AUTH,
    //       action: AUTH_ACTION.REQUEST,
    //       parsedData: { _username: 'invalid' } // assume this is invalid
    //     })
    //   connection.authenticate({ _username: 'invalid' }, authCallback)
    //   await BBPromise.delay(0)
    // }
    function receiveAuthResponse(data) {
        return __awaiter(this, void 0, void 0, function () {
            var receivedClientData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        receivedClientData = data || clientData;
                        emitterMock.expects('emit')
                            .once()
                            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.OPEN);
                        emitterMock.expects('emit')
                            .once()
                            .withExactArgs(constants_1.EVENT.CLIENT_DATA_CHANGED, Object.assign({}, receivedClientData));
                        socket.simulateMessages([{
                                topic: message_constants_1.TOPIC.AUTH,
                                action: message_constants_1.AUTH_ACTIONS.AUTH_SUCCESSFUL,
                                parsedData: Object.assign({}, receivedClientData)
                            }]);
                        return [4 /*yield*/, bluebird_1.Promise.delay(5)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function sendMessage() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        socket.simulateMessages([{
                                topic: message_constants_1.TOPIC.EVENT,
                                action: message_constants_1.EVENT_ACTIONS.EMIT,
                                name: 'eventA'
                            }]);
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function closeConnection() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emitterMock.expects('emit')
                            .once()
                            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.CLOSING);
                        socketMock
                            .expects('sendParsedMessage')
                            .once()
                            .withExactArgs({
                            topic: message_constants_1.TOPIC.CONNECTION,
                            action: message_constants_1.CONNECTION_ACTIONS.CLOSING
                        });
                        connection.close();
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function recieveConnectionClose() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emitterMock.expects('emit')
                            .once()
                            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.CLOSED);
                        socket.simulateMessages([{
                                topic: message_constants_1.TOPIC.CONNECTION,
                                action: message_constants_1.CONNECTION_ACTIONS.CLOSING
                            }]);
                        socket.simulateRemoteClose();
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function receivePing() {
        socket.simulateMessages([{
                topic: message_constants_1.TOPIC.CONNECTION,
                action: message_constants_1.CONNECTION_ACTIONS.PING
            }]);
    }
    function sendPong() {
        socketMock
            .expects('sendParsedMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.CONNECTION,
            action: message_constants_1.CONNECTION_ACTIONS.PONG
        });
    }
    function receiveConnectionError() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loggerMock
                            .expects('error')
                            .once()
                            .withExactArgs({ topic: message_constants_1.TOPIC.CONNECTION }, constants_1.EVENT.CONNECTION_ERROR, JSON.stringify({ code: 1234 }));
                        socket.simulateError();
                        return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function receiveRedirect() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emitterMock
                            .expects('emit')
                            .once()
                            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.REDIRECTING);
                        socket.simulateMessages([{
                                topic: message_constants_1.TOPIC.CONNECTION,
                                action: message_constants_1.CONNECTION_ACTIONS.REDIRECT,
                                url: otherUrl
                            }]);
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function openConnectionToRedirectedServer() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emitterMock
                            .expects('emit')
                            .once()
                            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.AWAITING_CONNECTION);
                        emitterMock
                            .expects('emit')
                            .once()
                            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.CHALLENGING);
                        getSocketMock();
                        chai_1.expect(socket.url).to.equal(otherUrl);
                        socket.simulateOpen();
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function receiveAuthRejectResponse() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        socket.simulateMessages([{
                                topic: message_constants_1.TOPIC.AUTH,
                                action: message_constants_1.AUTH_ACTIONS.AUTH_UNSUCCESSFUL,
                                parsedData: message_constants_1.AUTH_ACTIONS.INVALID_MESSAGE_DATA
                            }]);
                        return [4 /*yield*/, bluebird_1.Promise.delay(10)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function loseConnection() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emitterMock
                            .expects('emit')
                            .once()
                            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.RECONNECTING);
                        socket.close();
                        return [4 /*yield*/, bluebird_1.Promise.delay(2)];
                    case 1:
                        _a.sent();
                        chai_1.expect(connection.isConnected).to.equal(false);
                        return [2 /*return*/];
                }
            });
        });
    }
    function reconnectToInitialServer() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        socketMock
                            .expects('onopen')
                            .once();
                        socketMock
                            .expects('sendParsedMessage')
                            .once()
                            .withExactArgs({
                            topic: message_constants_1.TOPIC.CONNECTION,
                            action: message_constants_1.CONNECTION_ACTIONS.CHALLENGE,
                            url: url
                        });
                        socket.simulateOpen();
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    // async function connectionClosedError () {
    //   loggerMock
    //     .expects('error')
    //     .once()
    //     .withExactArgs({ topic: TOPIC.CONNECTION }, EVENT.IS_CLOSED)
    //   await BBPromise.delay(0)
    // }
    // async function receiveInvalidParseError () {
    //   socket.simulateMessages([{
    //     topic: TOPIC.AUTH,
    //     action: AUTH_ACTION.INVALID_MESSAGE_DATA,
    //     data: 'invalid authentication message'
    //   }])
    //   await BBPromise.delay(0)
    //   assert.calledOnce(authCallback)
    //   assert.calledWithExactly(authCallback, false, { reason: EVENT.INVALID_AUTHENTICATION_DETAILS })
    //   await BBPromise.delay(0)
    // }
    function receiveTooManyAuthAttempts() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        socket.simulateMessages([{
                                topic: message_constants_1.TOPIC.AUTH,
                                action: message_constants_1.AUTH_ACTIONS.TOO_MANY_AUTH_ATTEMPTS
                            }]);
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function receiveAuthenticationTimeout() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        socket.simulateMessages([{
                                topic: message_constants_1.TOPIC.CONNECTION,
                                action: message_constants_1.CONNECTION_ACTIONS.AUTHENTICATION_TIMEOUT
                            }]);
                        return [4 /*yield*/, bluebird_1.Promise.delay(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    // function losesConnection () {
    //   emitterMock
    //     .expects('emit')
    //     .once()
    //     .withExactArgs(EVENT.CONNECTION_STATE_CHANGED, CONNECTION_STATE.RECONNECTING)
    //   socket.simulateRemoteClose()
    // }
    function getSocketMock() {
        var socketService = services.getSocket();
        socket = socketService.socket;
        socketMock = socketService.socketMock;
    }
    function getLoggerMock() {
        var loggerService = services.getLogger();
        loggerMock = loggerService.loggerMock;
    }
});
