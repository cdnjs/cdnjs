"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const message_parser_1 = require("../../binary-protocol/src/message-parser");
const state_machine_1 = require("../util/state-machine");
const utils = require("../util/utils");
const Emitter = require("component-emitter2");
class Connection {
    constructor(services, options, url, emitter) {
        this.options = options;
        this.services = services;
        this.authParams = null;
        this.handlers = new Map();
        this.isConnected = false;
        // tslint:disable-next-line:no-empty
        this.authCallback = null;
        this.emitter = emitter;
        this.internalEmitter = new Emitter();
        let isReconnecting = false;
        let firstOpen = true;
        this.stateMachine = new state_machine_1.StateMachine(this.services.logger, {
            init: constants_1.CONNECTION_STATE.CLOSED,
            onStateChanged: (newState, oldState) => {
                if (newState === oldState) {
                    return;
                }
                this.isConnected = newState === constants_1.CONNECTION_STATE.OPEN;
                emitter.emit(constants_1.EVENT.CONNECTION_STATE_CHANGED, newState);
                if (newState === constants_1.CONNECTION_STATE.RECONNECTING) {
                    isReconnecting = true;
                    if (oldState !== constants_1.CONNECTION_STATE.RECONNECTING) {
                        this.internalEmitter.emit(constants_1.EVENT.CONNECTION_LOST);
                    }
                }
                else if (newState === constants_1.CONNECTION_STATE.OPEN && (isReconnecting || firstOpen)) {
                    firstOpen = false;
                    this.internalEmitter.emit(constants_1.EVENT.CONNECTION_REESTABLISHED);
                }
            },
            transitions: [
                { name: "connected" /* CONNECTED */, from: constants_1.CONNECTION_STATE.CLOSED, to: constants_1.CONNECTION_STATE.AWAITING_CONNECTION },
                { name: "connected" /* CONNECTED */, from: constants_1.CONNECTION_STATE.REDIRECTING, to: constants_1.CONNECTION_STATE.AWAITING_CONNECTION },
                { name: "connected" /* CONNECTED */, from: constants_1.CONNECTION_STATE.RECONNECTING, to: constants_1.CONNECTION_STATE.AWAITING_CONNECTION },
                { name: "challenge" /* CHALLENGE */, from: constants_1.CONNECTION_STATE.AWAITING_CONNECTION, to: constants_1.CONNECTION_STATE.CHALLENGING },
                { name: "redirected" /* CONNECTION_REDIRECTED */, from: constants_1.CONNECTION_STATE.CHALLENGING, to: constants_1.CONNECTION_STATE.REDIRECTING },
                { name: "challenge-denied" /* CHALLENGE_DENIED */, from: constants_1.CONNECTION_STATE.CHALLENGING, to: constants_1.CONNECTION_STATE.CHALLENGE_DENIED },
                { name: "accepted" /* CHALLENGE_ACCEPTED */, from: constants_1.CONNECTION_STATE.CHALLENGING, to: constants_1.CONNECTION_STATE.AWAITING_AUTHENTICATION, handler: this.onAwaitingAuthentication.bind(this) },
                { name: "authentication-timeout" /* AUTHENTICATION_TIMEOUT */, from: constants_1.CONNECTION_STATE.AWAITING_CONNECTION, to: constants_1.CONNECTION_STATE.AUTHENTICATION_TIMEOUT },
                { name: "authentication-timeout" /* AUTHENTICATION_TIMEOUT */, from: constants_1.CONNECTION_STATE.AWAITING_AUTHENTICATION, to: constants_1.CONNECTION_STATE.AUTHENTICATION_TIMEOUT },
                { name: "authenticate" /* AUTHENTICATE */, from: constants_1.CONNECTION_STATE.AWAITING_AUTHENTICATION, to: constants_1.CONNECTION_STATE.AUTHENTICATING },
                { name: "unsuccesful-login" /* UNSUCCESFUL_LOGIN */, from: constants_1.CONNECTION_STATE.AUTHENTICATING, to: constants_1.CONNECTION_STATE.AWAITING_AUTHENTICATION },
                { name: "succesful-login" /* SUCCESFUL_LOGIN */, from: constants_1.CONNECTION_STATE.AUTHENTICATING, to: constants_1.CONNECTION_STATE.OPEN },
                { name: "too-many-auth-attempts" /* TOO_MANY_AUTH_ATTEMPTS */, from: constants_1.CONNECTION_STATE.AUTHENTICATING, to: constants_1.CONNECTION_STATE.TOO_MANY_AUTH_ATTEMPTS },
                { name: "too-many-auth-attempts" /* TOO_MANY_AUTH_ATTEMPTS */, from: constants_1.CONNECTION_STATE.AWAITING_AUTHENTICATION, to: constants_1.CONNECTION_STATE.TOO_MANY_AUTH_ATTEMPTS },
                { name: "authentication-timeout" /* AUTHENTICATION_TIMEOUT */, from: constants_1.CONNECTION_STATE.AWAITING_AUTHENTICATION, to: constants_1.CONNECTION_STATE.AUTHENTICATION_TIMEOUT },
                { name: "reconnect" /* RECONNECT */, from: constants_1.CONNECTION_STATE.RECONNECTING, to: constants_1.CONNECTION_STATE.RECONNECTING },
                { name: "closed" /* CLOSED */, from: constants_1.CONNECTION_STATE.CLOSING, to: constants_1.CONNECTION_STATE.CLOSED },
                { name: "error" /* ERROR */, to: constants_1.CONNECTION_STATE.RECONNECTING },
                { name: "connection-lost" /* LOST */, to: constants_1.CONNECTION_STATE.RECONNECTING },
                { name: "close" /* CLOSE */, to: constants_1.CONNECTION_STATE.CLOSING },
            ]
        });
        this.originalUrl = utils.parseUrl(url, this.options.path);
        this.url = this.originalUrl;
        this.createEndpoint();
    }
    onLost(callback) {
        this.internalEmitter.on(constants_1.EVENT.CONNECTION_LOST, callback);
    }
    onReestablished(callback) {
        this.internalEmitter.on(constants_1.EVENT.CONNECTION_REESTABLISHED, callback);
    }
    registerHandler(topic, callback) {
        this.handlers.set(topic, callback);
    }
    sendMessage(message) {
        if (!this.isOpen()) {
            this.services.logger.error(message, constants_1.EVENT.IS_CLOSED);
            return;
        }
        this.endpoint.sendParsedMessage(message);
    }
    /**
     * Sends the specified authentication parameters
     * to the server. Can be called up to <maxAuthAttempts>
     * times for the same connection.
     *
     * @param   {Object}   authParams A map of user defined auth parameters.
     *                E.g. { username:<String>, password:<String> }
     * @param   {Function} callback   A callback that will be invoked with the authenticationr result
     */
    authenticate(authParamsOrCallback, callback) {
        if (authParamsOrCallback &&
            typeof authParamsOrCallback !== 'object' &&
            typeof authParamsOrCallback !== 'function') {
            throw new Error('invalid argument authParamsOrCallback');
        }
        if (callback && typeof callback !== 'function') {
            throw new Error('invalid argument callback');
        }
        if (this.stateMachine.state === constants_1.CONNECTION_STATE.CHALLENGE_DENIED ||
            this.stateMachine.state === constants_1.CONNECTION_STATE.TOO_MANY_AUTH_ATTEMPTS ||
            this.stateMachine.state === constants_1.CONNECTION_STATE.AUTHENTICATION_TIMEOUT) {
            this.services.logger.error({ topic: message_constants_1.TOPIC.CONNECTION }, constants_1.EVENT.IS_CLOSED);
            return;
        }
        if (authParamsOrCallback) {
            this.authParams = typeof authParamsOrCallback === 'object' ? authParamsOrCallback : {};
        }
        if (authParamsOrCallback && typeof authParamsOrCallback === 'function') {
            this.authCallback = authParamsOrCallback;
        }
        else if (callback) {
            this.authCallback = callback;
        }
        else {
            this.authCallback = () => { };
        }
        // if (this.stateMachine.state === CONNECTION_STATE.CLOSED && !this.endpoint) {
        //   this.createEndpoint()
        //   return
        // }
        if (this.stateMachine.state === constants_1.CONNECTION_STATE.AWAITING_AUTHENTICATION && this.authParams) {
            this.sendAuthParams();
        }
    }
    /*
    * Returns the current connection state.
    */
    getConnectionState() {
        return this.stateMachine.state;
    }
    isOpen() {
        const connState = this.getConnectionState();
        return connState !== constants_1.CONNECTION_STATE.CLOSED
            && connState !== constants_1.CONNECTION_STATE.ERROR
            && connState !== constants_1.CONNECTION_STATE.CLOSING;
    }
    /**
     * Closes the connection. Using this method
     * will prevent the client from reconnecting.
     */
    close() {
        this.services.timerRegistry.remove(this.heartbeatInterval);
        this.sendMessage({
            topic: message_constants_1.TOPIC.CONNECTION,
            action: message_constants_1.CONNECTION_ACTIONS.CLOSING
        });
        this.stateMachine.transition("close" /* CLOSE */);
    }
    /**
     * Creates the endpoint to connect to using the url deepstream
     * was initialised with.
     */
    createEndpoint() {
        this.endpoint = this.services.socketFactory(this.url, this.options.socketOptions);
        this.endpoint.onopen = this.onOpen.bind(this);
        this.endpoint.onerror = this.onError.bind(this);
        this.endpoint.onclose = this.onClose.bind(this);
        this.endpoint.onparsedmessages = this.onMessages.bind(this);
    }
    /********************************
    ****** Endpoint Callbacks ******
    /********************************/
    /**
    * Will be invoked once the connection is established. The client
    * can't send messages yet, and needs to get a connection ACK or REDIRECT
    * from the server before authenticating
    */
    onOpen() {
        this.clearReconnect();
        this.lastHeartBeat = Date.now();
        this.checkHeartBeat();
        this.stateMachine.transition("connected" /* CONNECTED */);
        this.sendMessage({
            topic: message_constants_1.TOPIC.CONNECTION,
            action: message_constants_1.CONNECTION_ACTIONS.CHALLENGE,
            url: this.originalUrl,
            protocolVersion: '0.1a'
        });
        this.stateMachine.transition("challenge" /* CHALLENGE */);
    }
    /**
     * Callback for generic connection errors. Forwards
     * the error to the client.
     *
     * The connection is considered broken once this method has been
     * invoked.
     */
    onError(error) {
        /*
         * If the implementation isn't listening on the error event this will throw
         * an error. So let's defer it to allow the reconnection to kick in.
         */
        setTimeout(() => {
            let msg;
            if (error.code === 'ECONNRESET' || error.code === 'ECONNREFUSED') {
                msg = `Can't connect! Deepstream server unreachable on ${this.originalUrl}`;
            }
            else {
                try {
                    msg = JSON.stringify(error);
                }
                catch (e) {
                    msg = error.toString();
                }
            }
            this.services.logger.error({ topic: message_constants_1.TOPIC.CONNECTION }, constants_1.EVENT.CONNECTION_ERROR, msg);
        }, 1);
        this.services.timerRegistry.remove(this.heartbeatInterval);
        this.stateMachine.transition("error" /* ERROR */);
        this.tryReconnect();
    }
    /**
     * Callback when the connection closes. This might have been a deliberate
     * close triggered by the client or the result of the connection getting
     * lost.
     *
     * In the latter case the client will try to reconnect using the configured
     * strategy.
     */
    onClose() {
        this.services.timerRegistry.remove(this.heartbeatInterval);
        if (this.stateMachine.state === constants_1.CONNECTION_STATE.REDIRECTING) {
            this.createEndpoint();
            return;
        }
        if (this.stateMachine.state === constants_1.CONNECTION_STATE.CHALLENGE_DENIED ||
            this.stateMachine.state === constants_1.CONNECTION_STATE.TOO_MANY_AUTH_ATTEMPTS ||
            this.stateMachine.state === constants_1.CONNECTION_STATE.AUTHENTICATION_TIMEOUT) {
            return;
        }
        if (this.stateMachine.state === constants_1.CONNECTION_STATE.CLOSING) {
            this.stateMachine.transition("closed" /* CLOSED */);
            return;
        }
        this.stateMachine.transition("connection-lost" /* LOST */);
        this.tryReconnect();
    }
    /**
     * Callback for messages received on the connection.
     */
    onMessages(parseResults) {
        parseResults.forEach(parseResult => {
            if (parseResult.parseError) {
                this.services.logger.error({ topic: message_constants_1.TOPIC.PARSER }, parseResult.action, parseResult.raw && parseResult.raw.toString());
                return;
            }
            const message = parseResult;
            const res = message_parser_1.parseData(message);
            if (res !== true) {
                this.services.logger.error({ topic: message_constants_1.TOPIC.PARSER }, message_constants_1.PARSER_ACTIONS.INVALID_MESSAGE, res);
            }
            if (message === null) {
                return;
            }
            if (message.topic === message_constants_1.TOPIC.CONNECTION) {
                this.handleConnectionResponse(message);
                return;
            }
            if (message.topic === message_constants_1.TOPIC.AUTH) {
                this.handleAuthResponse(message);
                return;
            }
            const handler = this.handlers.get(message.topic);
            if (!handler) {
                // this should never happen
                return;
            }
            handler(message);
        });
    }
    /**
    * Sends authentication params to the server. Please note, this
    * doesn't use the queued message mechanism, but rather sends the message directly
    */
    sendAuthParams() {
        this.stateMachine.transition("authenticate" /* AUTHENTICATE */);
        this.sendMessage({
            topic: message_constants_1.TOPIC.AUTH,
            action: message_constants_1.AUTH_ACTIONS.REQUEST,
            parsedData: this.authParams
        });
    }
    /**
    * Ensures that a heartbeat was not missed more than once, otherwise it considers the connection
    * to have been lost and closes it for reconnection.
    */
    checkHeartBeat() {
        const heartBeatTolerance = this.options.heartbeatInterval * 2;
        if (Date.now() - this.lastHeartBeat > heartBeatTolerance) {
            this.services.timerRegistry.remove(this.heartbeatInterval);
            this.services.logger.error({ topic: message_constants_1.TOPIC.CONNECTION }, constants_1.EVENT.HEARTBEAT_TIMEOUT);
            this.endpoint.close();
            return;
        }
        this.heartbeatInterval = this.services.timerRegistry.add({
            duration: this.options.heartbeatInterval,
            callback: this.checkHeartBeat,
            context: this
        });
    }
    /**
    * If the connection drops or is closed in error this
    * method schedules increasing reconnection intervals
    *
    * If the number of failed reconnection attempts exceeds
    * options.maxReconnectAttempts the connection is closed
    */
    tryReconnect() {
        if (this.reconnectTimeout !== null) {
            return;
        }
        if (this.reconnectionAttempt < this.options.maxReconnectAttempts) {
            this.stateMachine.transition("reconnect" /* RECONNECT */);
            this.reconnectTimeout = setTimeout(this.tryOpen.bind(this), Math.min(this.options.maxReconnectInterval, this.options.reconnectIntervalIncrement * this.reconnectionAttempt));
            this.reconnectionAttempt++;
            return;
        }
        this.emitter.emit(constants_1.EVENT[constants_1.EVENT.MAX_RECONNECTION_ATTEMPTS_REACHED], this.reconnectionAttempt);
        this.clearReconnect();
        this.close();
    }
    /**
     * Attempts to open a errourosly closed connection
     */
    tryOpen() {
        if (this.stateMachine.state !== constants_1.CONNECTION_STATE.REDIRECTING) {
            this.url = this.originalUrl;
        }
        this.createEndpoint();
        this.reconnectTimeout = null;
    }
    /**
     * Stops all further reconnection attempts,
     * either because the connection is open again
     * or because the maximal number of reconnection
     * attempts has been exceeded
     */
    clearReconnect() {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }
        this.reconnectTimeout = null;
        this.reconnectionAttempt = 0;
    }
    /**
     * The connection response will indicate whether the deepstream connection
     * can be used or if it should be forwarded to another instance. This
     * allows us to introduce load-balancing if needed.
     *
     * If authentication parameters are already provided this will kick of
     * authentication immediately. The actual 'open' event won't be emitted
     * by the client until the authentication is successful.
     *
     * If a challenge is recieved, the user will send the url to the server
     * in response to get the appropriate redirect. If the URL is invalid the
     * server will respond with a REJECTION resulting in the client connection
     * being permanently closed.
     *
     * If a redirect is recieved, this connection is closed and updated with
     * a connection to the url supplied in the message.
     */
    handleConnectionResponse(message) {
        if (message.action === message_constants_1.CONNECTION_ACTIONS.PING) {
            this.lastHeartBeat = Date.now();
            if (this.getConnectionState() !== constants_1.CONNECTION_STATE.CLOSING) {
                this.sendMessage({ topic: message_constants_1.TOPIC.CONNECTION, action: message_constants_1.CONNECTION_ACTIONS.PONG });
            }
            return;
        }
        if (message.action === message_constants_1.CONNECTION_ACTIONS.ACCEPT) {
            this.stateMachine.transition("accepted" /* CHALLENGE_ACCEPTED */);
            return;
        }
        if (message.action === message_constants_1.CONNECTION_ACTIONS.REJECT) {
            this.stateMachine.transition("challenge-denied" /* CHALLENGE_DENIED */);
            this.endpoint.close();
            return;
        }
        if (message.action === message_constants_1.CONNECTION_ACTIONS.REDIRECT) {
            this.url = message.url;
            this.stateMachine.transition("redirected" /* CONNECTION_REDIRECTED */);
            this.endpoint.close();
            return;
        }
        if (message.action === message_constants_1.CONNECTION_ACTIONS.AUTHENTICATION_TIMEOUT) {
            this.deliberateClose = true;
            this.stateMachine.transition("authentication-timeout" /* AUTHENTICATION_TIMEOUT */);
            this.services.logger.error(message);
        }
    }
    /**
     * Callback for messages received for the AUTH topic. If
     * the authentication was successful this method will
     * open the connection and send all messages that the client
     * tried to send so far.
     */
    handleAuthResponse(message) {
        if (message.action === message_constants_1.AUTH_ACTIONS.TOO_MANY_AUTH_ATTEMPTS) {
            this.deliberateClose = true;
            this.stateMachine.transition("too-many-auth-attempts" /* TOO_MANY_AUTH_ATTEMPTS */);
            this.services.logger.error(message);
            return;
        }
        if (message.action === message_constants_1.AUTH_ACTIONS.AUTH_UNSUCCESSFUL) {
            this.stateMachine.transition("unsuccesful-login" /* UNSUCCESFUL_LOGIN */);
            this.onAuthUnSuccessful();
            return;
        }
        if (message.action === message_constants_1.AUTH_ACTIONS.AUTH_SUCCESSFUL) {
            this.stateMachine.transition("succesful-login" /* SUCCESFUL_LOGIN */);
            this.onAuthSuccessful(message.parsedData);
            return;
        }
    }
    onAwaitingAuthentication() {
        if (this.authParams) {
            this.sendAuthParams();
        }
    }
    onAuthSuccessful(clientData) {
        this.updateClientData(clientData);
        if (this.authCallback === null) {
            return;
        }
        this.authCallback(true, this.clientData);
        this.authCallback = null;
    }
    onAuthUnSuccessful() {
        const reason = { reason: constants_1.EVENT[constants_1.EVENT.INVALID_AUTHENTICATION_DETAILS] };
        if (this.authCallback === null) {
            this.emitter.emit(constants_1.EVENT.REAUTHENTICATION_FAILURE, reason);
            return;
        }
        this.authCallback(false, reason);
        this.authCallback = null;
    }
    updateClientData(data) {
        const newClientData = data || null;
        if (this.clientData === undefined &&
            (newClientData === null || Object.keys(newClientData).length === 0)) {
            return;
        }
        if (!utils.deepEquals(this.clientData, data)) {
            this.emitter.emit(constants_1.EVENT.CLIENT_DATA_CHANGED, Object.assign({}, newClientData));
            this.clientData = newClientData;
        }
    }
}
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map