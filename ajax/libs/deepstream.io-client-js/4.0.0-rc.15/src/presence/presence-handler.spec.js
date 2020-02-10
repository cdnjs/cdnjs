"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var mocks_1 = require("../test/mocks");
var constants_1 = require("../constants");
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var client_options_1 = require("../client-options");
var presence_handler_1 = require("./presence-handler");
describe('Presence handler', function () {
    var userA = 'userA';
    var userB = 'userB';
    var userC = 'userC';
    var services;
    var presenceHandler;
    var handle;
    var callbackSpy;
    var promiseSuccess;
    var promiseError;
    var options = __assign({}, client_options_1.DefaultOptions, { subscriptionInterval: 10 });
    var counter;
    beforeEach(function () {
        services = mocks_1.getServicesMock();
        presenceHandler = new presence_handler_1.PresenceHandler(services, options);
        handle = services.getHandle();
        callbackSpy = sinon_1.spy();
        promiseSuccess = sinon_1.spy();
        promiseError = sinon_1.spy();
        counter = 0;
    });
    afterEach(function () {
        services.verify();
    });
    it('validates parameters on subscribe, unsubscribe and getAll', function () {
        chai_1.expect(presenceHandler.subscribe.bind(presenceHandler)).to.throw();
        chai_1.expect(presenceHandler.subscribe.bind(presenceHandler, 'name')).to.throw();
        chai_1.expect(presenceHandler.subscribe.bind(presenceHandler, '', function () { })).to.throw();
        chai_1.expect(presenceHandler.unsubscribe.bind(presenceHandler, '')).to.throw();
    });
    it('can\'t query getAll when client is offline', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    services.connection.isConnected = false;
                    presenceHandler.getAll(callbackSpy);
                    presenceHandler.getAll().then(promiseSuccess).catch(promiseError);
                    return [4 /*yield*/, bluebird_1.Promise.delay(5)];
                case 1:
                    _a.sent();
                    sinon_1.assert.calledOnce(callbackSpy);
                    sinon_1.assert.calledWithExactly(callbackSpy, constants_1.EVENT.CLIENT_OFFLINE);
                    sinon_1.assert.notCalled(promiseSuccess);
                    sinon_1.assert.calledOnce(promiseError);
                    sinon_1.assert.calledWithExactly(promiseError, constants_1.EVENT.CLIENT_OFFLINE);
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls query for all users callback with error message when connection is lost', function () { return __awaiter(_this, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    presenceHandler.getAll(callbackSpy);
                    promise = presenceHandler.getAll();
                    promise.then(promiseSuccess).catch(promiseError);
                    services.simulateConnectionLost();
                    return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                case 1:
                    _a.sent();
                    sinon_1.assert.calledOnce(callbackSpy);
                    sinon_1.assert.calledWithExactly(callbackSpy, constants_1.EVENT.CLIENT_OFFLINE);
                    sinon_1.assert.notCalled(promiseSuccess);
                    sinon_1.assert.calledOnce(promiseError);
                    sinon_1.assert.calledWithExactly(promiseError, constants_1.EVENT.CLIENT_OFFLINE);
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls query for specific users callback with error message when connection is lost', function () { return __awaiter(_this, void 0, void 0, function () {
        var users, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    users = ['userA', 'userB'];
                    presenceHandler.getAll(users, callbackSpy);
                    promise = presenceHandler.getAll(users);
                    promise.then(promiseSuccess).catch(promiseError);
                    services.simulateConnectionLost();
                    return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                case 1:
                    _a.sent();
                    sinon_1.assert.calledOnce(callbackSpy);
                    sinon_1.assert.calledWithExactly(callbackSpy, constants_1.EVENT.CLIENT_OFFLINE);
                    sinon_1.assert.notCalled(promiseSuccess);
                    sinon_1.assert.calledOnce(promiseError);
                    sinon_1.assert.calledWithExactly(promiseError, constants_1.EVENT.CLIENT_OFFLINE);
                    return [2 /*return*/];
            }
        });
    }); });
    it('subscribes to presence with user a', function () { return __awaiter(_this, void 0, void 0, function () {
        var subscribeMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subscribeMessage = {
                        topic: message_constants_1.TOPIC.PRESENCE,
                        action: message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE_BULK,
                        names: [userA],
                        correlationId: '0'
                    };
                    services.connectionMock
                        .expects('sendMessage')
                        .once()
                        .withExactArgs(subscribeMessage);
                    services.timeoutRegistryMock
                        .expects('add')
                        .once()
                        .withExactArgs({ message: subscribeMessage });
                    presenceHandler.subscribe(userA, callbackSpy);
                    return [4 /*yield*/, bluebird_1.Promise.delay(options.subscriptionInterval * 2)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('subscribes to presence for all users', function () { return __awaiter(_this, void 0, void 0, function () {
        var subscribeAllMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subscribeAllMessage = {
                        topic: message_constants_1.TOPIC.PRESENCE,
                        action: message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE_ALL
                    };
                    services.connectionMock
                        .expects('sendMessage')
                        .once()
                        .withExactArgs(subscribeAllMessage);
                    services.timeoutRegistryMock
                        .expects('add')
                        .once()
                        .withExactArgs({ message: subscribeAllMessage });
                    presenceHandler.subscribe(callbackSpy);
                    return [4 /*yield*/, bluebird_1.Promise.delay(options.subscriptionInterval * 2)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('queries for specific users presence', function () {
        var users = ['userA', 'userB'];
        var queryMessage = {
            topic: message_constants_1.TOPIC.PRESENCE,
            action: message_constants_1.PRESENCE_ACTIONS.QUERY,
            correlationId: counter.toString(),
            names: users
        };
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(queryMessage);
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({ message: queryMessage });
        presenceHandler.getAll(users, callbackSpy);
    });
    it('queries for all users presence', function () {
        var queryAllMessage = {
            topic: message_constants_1.TOPIC.PRESENCE,
            action: message_constants_1.PRESENCE_ACTIONS.QUERY_ALL
        };
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(queryAllMessage);
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({ message: queryAllMessage });
        presenceHandler.getAll(callbackSpy);
    });
    it('sends unsubscribe for specific user presence', function () { return __awaiter(_this, void 0, void 0, function () {
        var user, subMsg, unsubMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = 'user';
                    subMsg = { topic: message_constants_1.TOPIC.PRESENCE, action: message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE_BULK, names: [user], correlationId: '0' };
                    unsubMsg = { topic: message_constants_1.TOPIC.PRESENCE, action: message_constants_1.PRESENCE_ACTIONS.UNSUBSCRIBE_BULK, names: [user], correlationId: '1' };
                    services.connectionMock
                        .expects('sendMessage')
                        .once()
                        .withExactArgs(subMsg);
                    services.timeoutRegistryMock
                        .expects('add')
                        .once()
                        .withExactArgs({ message: subMsg });
                    presenceHandler.subscribe(user, callbackSpy);
                    return [4 /*yield*/, bluebird_1.Promise.delay(options.subscriptionInterval * 2)];
                case 1:
                    _a.sent();
                    services.connectionMock
                        .expects('sendMessage')
                        .once()
                        .withExactArgs(unsubMsg);
                    services.timeoutRegistryMock
                        .expects('add')
                        .once()
                        .withExactArgs({ message: unsubMsg });
                    presenceHandler.unsubscribe(user);
                    return [4 /*yield*/, bluebird_1.Promise.delay(options.subscriptionInterval * 2)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sends unsubscribe for all users presence', function () { return __awaiter(_this, void 0, void 0, function () {
        var subMsg, unsubMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subMsg = { topic: message_constants_1.TOPIC.PRESENCE, action: message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE_ALL };
                    unsubMsg = { topic: message_constants_1.TOPIC.PRESENCE, action: message_constants_1.PRESENCE_ACTIONS.UNSUBSCRIBE_ALL };
                    services.connectionMock
                        .expects('sendMessage')
                        .once()
                        .withExactArgs(subMsg);
                    services.timeoutRegistryMock
                        .expects('add')
                        .once()
                        .withExactArgs({ message: subMsg });
                    presenceHandler.subscribe(callbackSpy);
                    return [4 /*yield*/, bluebird_1.Promise.delay(options.subscriptionInterval * 2)];
                case 1:
                    _a.sent();
                    services.connectionMock
                        .expects('sendMessage')
                        .once()
                        .withExactArgs(unsubMsg);
                    services.timeoutRegistryMock
                        .expects('add')
                        .once()
                        .withExactArgs({ message: unsubMsg });
                    presenceHandler.unsubscribe();
                    return [4 /*yield*/, bluebird_1.Promise.delay(options.subscriptionInterval * 2)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('handles acks messages', function () {
        var messageAck = {
            topic: message_constants_1.TOPIC.PRESENCE,
            action: message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE_BULK_ACK,
            isAck: true
        };
        services.timeoutRegistryMock
            .expects('remove')
            .once()
            .withExactArgs(messageAck);
        handle(messageAck);
    });
    it('resubscribes subscriptions when client reconnects', function () { return __awaiter(_this, void 0, void 0, function () {
        var users, messageSubscribeAll, messageSubscribe;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    users = [userA, userB];
                    presenceHandler.subscribe(userA, function () { });
                    presenceHandler.subscribe(userB, function () { });
                    presenceHandler.subscribe(function () { });
                    return [4 /*yield*/, bluebird_1.Promise.delay(options.subscriptionInterval * 2)];
                case 1:
                    _a.sent();
                    counter = parseInt(mocks_1.getLastMessageSent().correlationId, 10) + 1;
                    messageSubscribeAll = message(message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE_ALL);
                    messageSubscribe = {
                        topic: message_constants_1.TOPIC.PRESENCE,
                        action: message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE_BULK,
                        names: users,
                        correlationId: '1'
                    };
                    services.connectionMock
                        .expects('sendMessage')
                        .once()
                        .withExactArgs(messageSubscribeAll);
                    services.timeoutRegistryMock
                        .expects('add')
                        .once()
                        .withExactArgs({ message: messageSubscribeAll });
                    services.connectionMock
                        .expects('sendMessage')
                        .once()
                        .withExactArgs(messageSubscribe);
                    services.timeoutRegistryMock
                        .expects('add')
                        .once()
                        .withExactArgs({ message: messageSubscribe });
                    services.simulateConnectionReestablished();
                    return [4 /*yield*/, bluebird_1.Promise.delay(options.subscriptionInterval * 2)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('when server responds for getAll for all users ', function () {
        var callback;
        var users;
        beforeEach(function () {
            callback = sinon_1.spy();
            users = ['userA', 'userB'];
            presenceHandler.getAll(callback);
            var promise = presenceHandler.getAll();
            promise.then(promiseSuccess).catch(promiseError);
        });
        it('receives data for query all users', function () { return __awaiter(_this, void 0, void 0, function () {
            var messageForCallback, messageForPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageForCallback = messageResponseQueryAll(counter, users);
                        messageForPromise = messageResponseQueryAll(counter + 1, users);
                        services.timeoutRegistryMock
                            .expects('remove')
                            .once()
                            .withExactArgs(Object.assign({}, messageForCallback, { action: message_constants_1.PRESENCE_ACTIONS.QUERY_ALL_RESPONSE }));
                        services.timeoutRegistryMock
                            .expects('remove')
                            .once()
                            .withExactArgs(Object.assign({}, messageForPromise, { action: message_constants_1.PRESENCE_ACTIONS.QUERY_ALL_RESPONSE }));
                        handle(messageForCallback);
                        handle(messageForPromise);
                        return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(callback);
                        sinon_1.assert.calledWithExactly(callback, null, users);
                        sinon_1.assert.notCalled(promiseError);
                        sinon_1.assert.calledOnce(promiseSuccess);
                        sinon_1.assert.calledWithExactly(promiseSuccess, users);
                        return [2 /*return*/];
                }
            });
        }); });
        it('recieves error message for query all users', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, messageForCallback, messageForPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = message_constants_1.PRESENCE_ACTIONS.MESSAGE_DENIED;
                        messageForCallback = errorMessageResponseQueryAll(counter, error);
                        messageForPromise = errorMessageResponseQueryAll(counter + 1, error);
                        services.timeoutRegistryMock
                            .expects('remove')
                            .once()
                            .withExactArgs(messageForCallback);
                        services.timeoutRegistryMock
                            .expects('remove')
                            .once()
                            .withExactArgs(messageForPromise);
                        handle(messageForCallback);
                        handle(messageForPromise);
                        return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(callback);
                        sinon_1.assert.calledWithExactly(callback, message_constants_1.PRESENCE_ACTIONS[error]);
                        sinon_1.assert.calledOnce(promiseError);
                        sinon_1.assert.calledWithExactly(promiseError, message_constants_1.PRESENCE_ACTIONS[error]);
                        sinon_1.assert.notCalled(promiseSuccess);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when server responds for getAll for specific users ', function () {
        var callback;
        var users;
        var usersPresence;
        beforeEach(function () {
            callback = sinon_1.spy();
            users = ['userA', 'userB'];
            usersPresence = { userA: true, userB: false };
            presenceHandler.getAll(users, callback);
            var promise = presenceHandler.getAll(users);
            promise.then(promiseSuccess).catch(promiseError);
        });
        it('receives data for query specific users', function () { return __awaiter(_this, void 0, void 0, function () {
            var messageForCallback, messageForPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageForCallback = messageResponseQuery(counter, usersPresence);
                        messageForPromise = messageResponseQuery(counter + 1, usersPresence);
                        services.timeoutRegistryMock
                            .expects('remove')
                            .once()
                            .withExactArgs(Object.assign({}, messageForCallback, { action: message_constants_1.PRESENCE_ACTIONS.QUERY_RESPONSE }));
                        services.timeoutRegistryMock
                            .expects('remove')
                            .once()
                            .withExactArgs(Object.assign({}, messageForPromise, { action: message_constants_1.PRESENCE_ACTIONS.QUERY_RESPONSE }));
                        handle(messageForCallback);
                        handle(messageForPromise);
                        return [4 /*yield*/, bluebird_1.Promise.delay(2)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(callback);
                        sinon_1.assert.calledWithExactly(callback, null, usersPresence);
                        sinon_1.assert.notCalled(promiseError);
                        sinon_1.assert.calledOnce(promiseSuccess);
                        sinon_1.assert.calledWithExactly(promiseSuccess, usersPresence);
                        return [2 /*return*/];
                }
            });
        }); });
        it('recieves error message for query users', function () { return __awaiter(_this, void 0, void 0, function () {
            var error, messageForCallback, messageForPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = message_constants_1.PRESENCE_ACTIONS.MESSAGE_DENIED;
                        messageForCallback = errorMessageResponseQuery(counter, error);
                        messageForPromise = errorMessageResponseQuery(counter + 1, error);
                        services.timeoutRegistryMock
                            .expects('remove')
                            .once()
                            .withExactArgs(messageForCallback);
                        services.timeoutRegistryMock
                            .expects('remove')
                            .once()
                            .withExactArgs(messageForPromise);
                        handle(messageForCallback);
                        handle(messageForPromise);
                        return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(callback);
                        sinon_1.assert.calledWithExactly(callback, message_constants_1.PRESENCE_ACTIONS[error]);
                        sinon_1.assert.calledOnce(promiseError);
                        sinon_1.assert.calledWithExactly(promiseError, message_constants_1.PRESENCE_ACTIONS[error]);
                        sinon_1.assert.notCalled(promiseSuccess);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when subscribing to userA, userB and all', function () {
        var userACallback;
        var userBCallback;
        var allUsersCallback;
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userACallback = sinon_1.spy();
                        userBCallback = sinon_1.spy();
                        allUsersCallback = sinon_1.spy();
                        presenceHandler.subscribe(userA, userACallback);
                        presenceHandler.subscribe(userB, userBCallback);
                        presenceHandler.subscribe(allUsersCallback);
                        return [4 /*yield*/, bluebird_1.Promise.delay(options.subscriptionInterval * 2)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('notifies when userA logs in', function () {
            handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN, userA));
            handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN_ALL, userA));
            sinon_1.assert.calledOnce(userACallback);
            sinon_1.assert.calledWithExactly(userACallback, userA, true);
            sinon_1.assert.notCalled(userBCallback);
            sinon_1.assert.calledOnce(allUsersCallback);
            sinon_1.assert.calledWithExactly(allUsersCallback, userA, true);
        });
        it('notifies when userB logs out', function () {
            handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_LEAVE, userB));
            handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_LEAVE_ALL, userB));
            sinon_1.assert.notCalled(userACallback);
            sinon_1.assert.calledOnce(userBCallback);
            sinon_1.assert.calledWithExactly(userBCallback, userB, false);
            sinon_1.assert.calledOnce(allUsersCallback);
            sinon_1.assert.calledWithExactly(allUsersCallback, userB, false);
        });
        it('notifies only the all users callback when userC logs in', function () {
            handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN_ALL, userC));
            sinon_1.assert.notCalled(userACallback);
            sinon_1.assert.notCalled(userBCallback);
            sinon_1.assert.calledOnce(allUsersCallback);
            sinon_1.assert.calledWithExactly(allUsersCallback, userC, true);
        });
        it('notifies only the all users callback when userC logs out', function () {
            handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_LEAVE_ALL, userC));
            sinon_1.assert.notCalled(userACallback);
            sinon_1.assert.notCalled(userBCallback);
            sinon_1.assert.calledOnce(allUsersCallback);
            sinon_1.assert.calledWithExactly(allUsersCallback, userC, false);
        });
        it('doesn\'t notify callbacks when userA logs in after unsubscribing', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        presenceHandler.unsubscribe(userA);
                        return [4 /*yield*/, bluebird_1.Promise.delay(options.subscriptionInterval * 2)];
                    case 1:
                        _a.sent();
                        handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN, userA));
                        sinon_1.assert.notCalled(userACallback);
                        sinon_1.assert.notCalled(userBCallback);
                        sinon_1.assert.notCalled(allUsersCallback);
                        return [2 /*return*/];
                }
            });
        }); });
        it('doesn\'t notify userA callback when userA logs in after unsubscribing', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        presenceHandler.unsubscribe(userA, userACallback);
                        return [4 /*yield*/, bluebird_1.Promise.delay(options.subscriptionInterval * 2)];
                    case 1:
                        _a.sent();
                        handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN, userA));
                        handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN_ALL, userA));
                        sinon_1.assert.notCalled(userACallback);
                        sinon_1.assert.notCalled(userBCallback);
                        sinon_1.assert.calledOnce(allUsersCallback);
                        sinon_1.assert.calledWithExactly(allUsersCallback, userA, true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('doesn\'t notify all users callback when userA logs in after unsubscribing', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        presenceHandler.unsubscribe(allUsersCallback);
                        return [4 /*yield*/, bluebird_1.Promise.delay(options.subscriptionInterval * 2)];
                    case 1:
                        _a.sent();
                        handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN, userA));
                        handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN_ALL, userA));
                        sinon_1.assert.calledOnce(userACallback);
                        sinon_1.assert.calledWithExactly(userACallback, userA, true);
                        sinon_1.assert.notCalled(userBCallback);
                        sinon_1.assert.notCalled(allUsersCallback);
                        return [2 /*return*/];
                }
            });
        }); });
        it('doesn\'t notify callbacks after unsubscribing all', function () { return __awaiter(_this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        presenceHandler.unsubscribe();
                        return [4 /*yield*/, bluebird_1.Promise.delay(options.subscriptionInterval * 2)];
                    case 1:
                        _a.sent();
                        users = [userA, userB];
                        users.forEach(function (user) {
                            handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN, user));
                            handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN_ALL, user));
                        });
                        sinon_1.assert.notCalled(userACallback);
                        sinon_1.assert.notCalled(userBCallback);
                        sinon_1.assert.notCalled(allUsersCallback);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('limbo', function () {
        beforeEach(function () {
            services.connection.isConnected = false;
            services.connection.isInLimbo = true;
        });
        it('returns client offline error once limbo state over', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        presenceHandler.getAll(callbackSpy);
                        services.simulateExitLimbo();
                        return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(callbackSpy);
                        sinon_1.assert.calledWithExactly(callbackSpy, constants_1.EVENT.CLIENT_OFFLINE);
                        return [2 /*return*/];
                }
            });
        }); });
        it('sends messages once re-established if in limbo', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        presenceHandler.getAll(callbackSpy);
                        services.connectionMock
                            .expects('sendMessage')
                            .once();
                        services.timeoutRegistryMock
                            .expects('add')
                            .once();
                        services.simulateConnectionReestablished();
                        return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
function message(action, user) {
    if (user) {
        return {
            name: user,
            topic: message_constants_1.TOPIC.PRESENCE,
            action: action
        };
    }
    else {
        return {
            topic: message_constants_1.TOPIC.PRESENCE,
            action: action
        };
    }
}
function messageResponseQueryAll(id, users) {
    return {
        topic: message_constants_1.TOPIC.PRESENCE,
        action: message_constants_1.PRESENCE_ACTIONS.QUERY_ALL_RESPONSE,
        names: users,
        correlationId: id.toString()
    };
}
function messageResponseQuery(id, usersPresence) {
    return {
        topic: message_constants_1.TOPIC.PRESENCE,
        action: message_constants_1.PRESENCE_ACTIONS.QUERY_RESPONSE,
        parsedData: usersPresence,
        correlationId: id.toString()
    };
}
function errorMessageResponseQueryAll(id, error) {
    return {
        topic: message_constants_1.TOPIC.PRESENCE,
        action: error,
        originalAction: message_constants_1.PRESENCE_ACTIONS.QUERY_ALL,
        correlationId: id.toString(),
        isError: true
    };
}
function errorMessageResponseQuery(id, error) {
    return {
        topic: message_constants_1.TOPIC.PRESENCE,
        action: error,
        originalAction: message_constants_1.PRESENCE_ACTIONS.QUERY,
        correlationId: id.toString(),
        isError: true
    };
}
