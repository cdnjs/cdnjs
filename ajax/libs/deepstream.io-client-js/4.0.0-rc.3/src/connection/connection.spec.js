"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
const connection_1 = require("./connection");
const mocks_1 = require("../test/mocks");
const client_options_1 = require("../client-options");
const constants_1 = require("../constants");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const Emitter = require("component-emitter2");
describe('connection', () => {
    let connection;
    let services;
    let options;
    let emitter;
    let emitterMock;
    let socket;
    let socketMock;
    let loggerMock;
    let authCallback;
    const url = 'wss://localhost:6020/deepstream';
    const authData = { password: '123456' };
    const clientData = { name: 'elton' };
    const heartbeatInterval = 15;
    const initialUrl = 'wss://localhost:6020/deepstream';
    const otherUrl = 'wss://otherhost:6020/deepstream';
    const reconnectIntervalIncrement = 20;
    const maxReconnectAttempts = 3;
    const maxReconnectInterval = 300;
    const offlineBufferTimeout = 10;
    beforeEach(() => {
        services = mocks_1.getServicesMock();
        options = Object.assign(client_options_1.DefaultOptions, {
            heartbeatInterval,
            reconnectIntervalIncrement,
            maxReconnectAttempts,
            maxReconnectInterval,
            offlineBufferTimeout
        });
        emitter = new Emitter();
        emitterMock = sinon_1.mock(emitter);
        connection = new connection_1.Connection(services, options, initialUrl, emitter);
        getSocketMock();
        getLoggerMock();
        authCallback = sinon_1.spy();
    });
    afterEach(() => {
        services.verify();
        emitterMock.verify();
        loggerMock.verify();
    });
    it('supports happiest path', () => __awaiter(this, void 0, void 0, function* () {
        yield awaitConnectionAck();
        yield sendChallenge();
        yield receiveChallengeAccept();
        yield sendAuth();
        yield receiveAuthResponse();
        yield sendMessage();
        yield closeConnection();
        yield recieveConnectionClose();
    }));
    it('send pong when ping received across all states', () => __awaiter(this, void 0, void 0, function* () {
        yield openConnection();
        sendPong();
        receivePing();
    }));
    it('miss heartbeat once', () => __awaiter(this, void 0, void 0, function* () {
        yield openConnection();
        yield bluebird_1.Promise.delay(heartbeatInterval * 1.5);
        // verify no errors in afterAll
    }));
    it('miss a heartbeat twice and receive error', () => __awaiter(this, void 0, void 0, function* () {
        loggerMock
            .expects('error')
            .once()
            .withExactArgs({ topic: message_constants_1.TOPIC.CONNECTION }, constants_1.EVENT.HEARTBEAT_TIMEOUT);
        socket.getTimeSinceLastMessage = () => 200;
        yield openConnection();
    }));
    it('get redirected to server B while connecting to server A, reconnect to server A when connection to server B is lost', () => __awaiter(this, void 0, void 0, function* () {
        yield awaitConnectionAck();
        yield sendChallenge();
        yield receiveRedirect();
        yield openConnectionToRedirectedServer();
        yield sendChallenge();
        yield receiveChallengeAccept();
        yield loseConnection();
        yield reconnectToInitialServer();
    }));
    it('handles challenge denial', () => __awaiter(this, void 0, void 0, function* () {
        emitterMock
            .expects('emit')
            .once()
            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.CHALLENGE_DENIED);
        yield awaitConnectionAck();
        yield sendChallenge();
        yield receiveChallengeReject();
    }));
    it('handles authentication when challenge was denied', () => __awaiter(this, void 0, void 0, function* () {
        loggerMock
            .expects('error')
            .once()
            .withArgs({ topic: message_constants_1.TOPIC.CONNECTION }, constants_1.EVENT.IS_CLOSED);
        emitterMock
            .expects('emit')
            .once()
            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.CHALLENGE_DENIED);
        yield awaitConnectionAck();
        yield sendChallenge();
        yield receiveChallengeReject();
        connection.authenticate(authData, authCallback);
        sinon_1.assert.callCount(authCallback, 0);
        yield bluebird_1.Promise.delay(10);
    }));
    it('handles successful authentication', () => __awaiter(this, void 0, void 0, function* () {
        yield awaitConnectionAck();
        yield sendChallenge();
        yield receiveChallengeAccept();
        yield sendAuth();
        yield receiveAuthResponse();
        sinon_1.assert.calledOnce(authCallback);
        sinon_1.assert.calledWithExactly(authCallback, true, clientData);
    }));
    it('handles rejected authentication', () => __awaiter(this, void 0, void 0, function* () {
        emitterMock
            .expects('emit')
            .once()
            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.AWAITING_AUTHENTICATION);
        yield awaitConnectionAck();
        yield sendChallenge();
        yield receiveChallengeAccept();
        yield sendAuth();
        yield receiveAuthRejectResponse();
        sinon_1.assert.calledOnce(authCallback);
        sinon_1.assert.calledWithExactly(authCallback, false, { reason: constants_1.EVENT.INVALID_AUTHENTICATION_DETAILS });
    }));
    it('handles authenticating too may times', () => __awaiter(this, void 0, void 0, function* () {
        emitterMock
            .expects('emit')
            .once()
            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.TOO_MANY_AUTH_ATTEMPTS);
        yield awaitConnectionAck();
        yield sendChallenge();
        yield receiveChallengeAccept();
        yield sendAuth();
        yield receiveTooManyAuthAttempts();
    }));
    it('handles authentication timeout', () => __awaiter(this, void 0, void 0, function* () {
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
        yield awaitConnectionAck();
        yield sendChallenge();
        yield receiveChallengeAccept();
        yield receiveAuthenticationTimeout();
    }));
    it('try to authenticate with invalid data and receive error', () => __awaiter(this, void 0, void 0, function* () {
        yield awaitConnectionAck();
        yield sendChallenge();
        yield receiveChallengeAccept();
        yield sendBadAuthDataAndReceiveError();
    }));
    it('tries to reconnect every time connection fails, stops when max reconnection attempts is reached and closes connection', () => __awaiter(this, void 0, void 0, function* () {
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
        yield awaitConnectionAck();
        yield sendChallenge();
        yield receiveChallengeAccept();
        // try to reconnect first time
        yield receiveConnectionError();
        yield bluebird_1.Promise.delay(0);
        // try to reconnect second time
        yield receiveConnectionError();
        yield bluebird_1.Promise.delay(25);
        // try to reconnect third time (now max is reached)
        yield receiveConnectionError();
        yield bluebird_1.Promise.delay(45);
        // try to reconnect fourth time (try to surpass the allowed max, fail)
        yield receiveConnectionError();
        yield bluebird_1.Promise.delay(70);
    }));
    it('tries to reconnect if the connection drops unexpectedly', () => __awaiter(this, void 0, void 0, function* () {
        emitterMock
            .expects('emit')
            .once()
            .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.RECONNECTING);
        yield awaitConnectionAck();
        yield sendChallenge();
        yield receiveChallengeAccept();
        yield receiveConnectionError();
    }));
    it('emits reauthenticationFailure if reauthentication is rejected', () => __awaiter(this, void 0, void 0, function* () {
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
        yield awaitConnectionAck();
        yield sendChallenge();
        yield receiveChallengeAccept();
        yield sendAuth();
        yield receiveAuthResponse();
        yield receiveConnectionError();
        yield bluebird_1.Promise.delay(0);
        yield awaitConnectionAck();
        yield sendChallenge();
        yield receiveChallengeAcceptAndResendAuth();
        yield receiveAuthRejectResponse();
        yield bluebird_1.Promise.delay(0);
        sinon_1.assert.calledOnce(authCallback);
    }));
    it('goes into limbo on connection lost', () => __awaiter(this, void 0, void 0, function* () {
        yield openConnection();
        const limboSpy = sinon_1.spy();
        connection.onExitLimbo(limboSpy);
        yield loseConnection();
        chai_1.expect(connection.isInLimbo).to.equal(true);
        yield bluebird_1.Promise.delay(20);
        sinon_1.assert.calledOnce(limboSpy);
        chai_1.expect(connection.isInLimbo).to.equal(false);
    }));
    function openConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            socket.simulateOpen();
            yield bluebird_1.Promise.delay(0);
        });
    }
    function awaitConnectionAck() {
        return __awaiter(this, void 0, void 0, function* () {
            emitterMock.expects('emit')
                .once()
                .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.AWAITING_CONNECTION);
            emitterMock.expects('emit')
                .once()
                .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.CHALLENGING);
            chai_1.expect(socket.url).to.equal(initialUrl);
            socket.simulateOpen();
            yield bluebird_1.Promise.delay(0);
        });
    }
    function sendChallenge() {
        return __awaiter(this, void 0, void 0, function* () {
            socketMock
                .expects('sendParsedMessage')
                .once()
                .withExactArgs([{
                    topic: message_constants_1.TOPIC.CONNECTION,
                    action: message_constants_1.CONNECTION_ACTIONS.CHALLENGE,
                    url
                }]);
            yield bluebird_1.Promise.delay(0);
        });
    }
    function receiveChallengeAccept() {
        return __awaiter(this, void 0, void 0, function* () {
            emitterMock.expects('emit')
                .once()
                .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.AWAITING_AUTHENTICATION);
            socket.simulateMessages([{
                    topic: message_constants_1.TOPIC.CONNECTION,
                    action: message_constants_1.CONNECTION_ACTIONS.ACCEPT
                }]);
            yield bluebird_1.Promise.delay(0);
        });
    }
    function receiveChallengeAcceptAndResendAuth() {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield bluebird_1.Promise.delay(0);
        });
    }
    function receiveChallengeReject() {
        return __awaiter(this, void 0, void 0, function* () {
            socket.simulateMessages([{
                    topic: message_constants_1.TOPIC.CONNECTION,
                    action: message_constants_1.CONNECTION_ACTIONS.REJECT
                }]);
            yield bluebird_1.Promise.delay(0);
        });
    }
    function sendAuth() {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield bluebird_1.Promise.delay(0);
        });
    }
    function sendBadAuthDataAndReceiveError() {
        return __awaiter(this, void 0, void 0, function* () {
            chai_1.expect(() => {
                connection.authenticate('Bad Auth Data', authCallback);
            }).to.throw('invalid argument authParamsOrCallback');
            chai_1.expect(() => {
                connection.authenticate({}, 'Bad Auth Data');
            }).to.throw('invalid argument callback');
            yield bluebird_1.Promise.delay(0);
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
        return __awaiter(this, void 0, void 0, function* () {
            const receivedClientData = data || clientData;
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
            yield bluebird_1.Promise.delay(5);
        });
    }
    function sendMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            socket.simulateMessages([{
                    topic: message_constants_1.TOPIC.EVENT,
                    action: message_constants_1.EVENT_ACTIONS.EMIT,
                    name: 'eventA'
                }]);
            yield bluebird_1.Promise.delay(0);
        });
    }
    function closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield bluebird_1.Promise.delay(0);
        });
    }
    function recieveConnectionClose() {
        return __awaiter(this, void 0, void 0, function* () {
            emitterMock.expects('emit')
                .once()
                .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.CLOSED);
            socket.simulateMessages([{
                    topic: message_constants_1.TOPIC.CONNECTION,
                    action: message_constants_1.CONNECTION_ACTIONS.CLOSING
                }]);
            socket.simulateRemoteClose();
            yield bluebird_1.Promise.delay(0);
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
        return __awaiter(this, void 0, void 0, function* () {
            loggerMock
                .expects('error')
                .once()
                .withExactArgs({ topic: message_constants_1.TOPIC.CONNECTION }, constants_1.EVENT.CONNECTION_ERROR, JSON.stringify({ code: 1234 }));
            socket.simulateError();
            yield bluebird_1.Promise.delay(1);
        });
    }
    function receiveRedirect() {
        return __awaiter(this, void 0, void 0, function* () {
            emitterMock
                .expects('emit')
                .once()
                .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.REDIRECTING);
            socket.simulateMessages([{
                    topic: message_constants_1.TOPIC.CONNECTION,
                    action: message_constants_1.CONNECTION_ACTIONS.REDIRECT,
                    url: otherUrl
                }]);
            yield bluebird_1.Promise.delay(0);
        });
    }
    function openConnectionToRedirectedServer() {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield bluebird_1.Promise.delay(0);
        });
    }
    function receiveAuthRejectResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            socket.simulateMessages([{
                    topic: message_constants_1.TOPIC.AUTH,
                    action: message_constants_1.AUTH_ACTIONS.AUTH_UNSUCCESSFUL,
                    parsedData: message_constants_1.AUTH_ACTIONS.INVALID_MESSAGE_DATA
                }]);
            yield bluebird_1.Promise.delay(10);
        });
    }
    function loseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            emitterMock
                .expects('emit')
                .once()
                .withExactArgs(constants_1.EVENT.CONNECTION_STATE_CHANGED, constants_1.CONNECTION_STATE.RECONNECTING);
            socket.close();
            yield bluebird_1.Promise.delay(2);
            chai_1.expect(connection.isConnected).to.equal(false);
        });
    }
    function reconnectToInitialServer() {
        return __awaiter(this, void 0, void 0, function* () {
            socketMock
                .expects('onopen')
                .once();
            socketMock
                .expects('sendParsedMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.CONNECTION,
                action: message_constants_1.CONNECTION_ACTIONS.CHALLENGE,
                url
            });
            socket.simulateOpen();
            yield bluebird_1.Promise.delay(0);
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
        return __awaiter(this, void 0, void 0, function* () {
            socket.simulateMessages([{
                    topic: message_constants_1.TOPIC.AUTH,
                    action: message_constants_1.AUTH_ACTIONS.TOO_MANY_AUTH_ATTEMPTS
                }]);
            yield bluebird_1.Promise.delay(0);
        });
    }
    function receiveAuthenticationTimeout() {
        return __awaiter(this, void 0, void 0, function* () {
            socket.simulateMessages([{
                    topic: message_constants_1.TOPIC.CONNECTION,
                    action: message_constants_1.CONNECTION_ACTIONS.AUTHENTICATION_TIMEOUT
                }]);
            yield bluebird_1.Promise.delay(0);
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
        const socketService = services.getSocket();
        socket = socketService.socket;
        socketMock = socketService.socketMock;
    }
    function getLoggerMock() {
        const loggerService = services.getLogger();
        loggerMock = loggerService.loggerMock;
    }
});
//# sourceMappingURL=connection.spec.js.map