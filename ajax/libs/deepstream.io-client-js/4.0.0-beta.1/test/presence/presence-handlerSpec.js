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
const mocks_1 = require("../mocks");
const constants_1 = require("../../src/constants");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const client_options_1 = require("../../src/client-options");
const presence_handler_1 = require("../../src/presence/presence-handler");
describe('Presence handler', () => {
    const flushTimeout = 10;
    const userA = 'userA';
    const userB = 'userB';
    const userC = 'userC';
    let services;
    let presenceHandler;
    let handle;
    let callbackSpy;
    let promiseSuccess;
    let promiseError;
    const options = Object.assign({}, client_options_1.DefaultOptions);
    let counter;
    beforeEach(() => {
        services = mocks_1.getServicesMock();
        presenceHandler = new presence_handler_1.PresenceHandler(services, options);
        handle = services.getHandle();
        callbackSpy = sinon_1.spy();
        promiseSuccess = sinon_1.spy();
        promiseError = sinon_1.spy();
        counter = 0;
    });
    afterEach(() => {
        services.verify();
    });
    it('validates parameters on subscribe, unsubscribe and getAll', () => {
        chai_1.expect(presenceHandler.subscribe.bind(presenceHandler)).to.throw();
        chai_1.expect(presenceHandler.subscribe.bind(presenceHandler, 'name')).to.throw();
        chai_1.expect(presenceHandler.subscribe.bind(presenceHandler, 'name', 123)).to.throw();
        chai_1.expect(presenceHandler.subscribe.bind(presenceHandler, 'name', {})).to.throw();
        chai_1.expect(presenceHandler.subscribe.bind(presenceHandler, '', () => { })).to.throw();
        chai_1.expect(presenceHandler.subscribe.bind(presenceHandler, 123, () => { })).to.throw();
        chai_1.expect(presenceHandler.subscribe.bind(presenceHandler, null, () => { })).to.throw();
        chai_1.expect(presenceHandler.subscribe.bind(presenceHandler, undefined, () => { })).to.throw();
        chai_1.expect(presenceHandler.unsubscribe.bind(presenceHandler, '')).to.throw();
        chai_1.expect(presenceHandler.unsubscribe.bind(presenceHandler, 123)).to.throw();
        chai_1.expect(presenceHandler.unsubscribe.bind(presenceHandler, null)).to.throw();
        chai_1.expect(presenceHandler.unsubscribe.bind(presenceHandler, 'name', 1)).to.throw();
        chai_1.expect(presenceHandler.unsubscribe.bind(presenceHandler, 'name', {})).to.throw();
        chai_1.expect(presenceHandler.unsubscribe.bind(presenceHandler, 'name', 'name')).to.throw();
        chai_1.expect(presenceHandler.getAll.bind(presenceHandler, '')).to.throw();
        chai_1.expect(presenceHandler.getAll.bind(presenceHandler, 123)).to.throw();
        chai_1.expect(presenceHandler.getAll.bind(presenceHandler, null)).to.throw();
        chai_1.expect(presenceHandler.getAll.bind(presenceHandler, 'name', {})).to.throw();
        chai_1.expect(presenceHandler.getAll.bind(presenceHandler, 'name', 1)).to.throw();
    });
    it('cant\'t query getAll when client is offline', () => __awaiter(this, void 0, void 0, function* () {
        services.connection.isConnected = false;
        services.connectionMock
            .expects('sendMessage')
            .never();
        presenceHandler.getAll(callbackSpy);
        const promise = presenceHandler.getAll();
        promise.then(promiseSuccess).catch(promiseError);
        yield bluebird_1.Promise.delay(0);
        sinon_1.assert.calledOnce(callbackSpy);
        sinon_1.assert.calledWithExactly(callbackSpy, constants_1.EVENT.CLIENT_OFFLINE);
        sinon_1.assert.notCalled(promiseSuccess);
        sinon_1.assert.calledOnce(promiseError);
        sinon_1.assert.calledWithExactly(promiseError, constants_1.EVENT.CLIENT_OFFLINE);
    }));
    it('calls query for all users callback with error message when connection is lost', () => __awaiter(this, void 0, void 0, function* () {
        presenceHandler.getAll(callbackSpy);
        const promise = presenceHandler.getAll();
        promise.then(promiseSuccess).catch(promiseError);
        services.simulateConnectionLost();
        yield bluebird_1.Promise.delay(1);
        sinon_1.assert.calledOnce(callbackSpy);
        sinon_1.assert.calledWithExactly(callbackSpy, constants_1.EVENT.CLIENT_OFFLINE);
        sinon_1.assert.notCalled(promiseSuccess);
        sinon_1.assert.calledOnce(promiseError);
        sinon_1.assert.calledWithExactly(promiseError, constants_1.EVENT.CLIENT_OFFLINE);
    }));
    it('calls query for specific users callback with error message when connection is lost', () => __awaiter(this, void 0, void 0, function* () {
        const users = ['userA', 'userB'];
        presenceHandler.getAll(users, callbackSpy);
        const promise = presenceHandler.getAll(users);
        promise.then(promiseSuccess).catch(promiseError);
        services.simulateConnectionLost();
        yield bluebird_1.Promise.delay(1);
        sinon_1.assert.calledOnce(callbackSpy);
        sinon_1.assert.calledWithExactly(callbackSpy, constants_1.EVENT.CLIENT_OFFLINE);
        sinon_1.assert.notCalled(promiseSuccess);
        sinon_1.assert.calledOnce(promiseError);
        sinon_1.assert.calledWithExactly(promiseError, constants_1.EVENT.CLIENT_OFFLINE);
    }));
    it('subscribes to presence with user a', () => __awaiter(this, void 0, void 0, function* () {
        const subscribeMessage = {
            topic: message_constants_1.TOPIC.PRESENCE,
            action: message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE,
            correlationId: counter.toString(),
            names: [userA]
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
        yield bluebird_1.Promise.delay(flushTimeout);
    }));
    it('subscribes to presence for all users', () => __awaiter(this, void 0, void 0, function* () {
        const subscribeAllMessage = {
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
        yield bluebird_1.Promise.delay(flushTimeout);
    }));
    it('queries for specific users presence', () => {
        const users = ['userA', 'userB'];
        const queryMessage = {
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
    it('queries for all users presence', () => {
        const queryAllMessage = {
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
    it('sends unsubscribe for specific user presence', () => __awaiter(this, void 0, void 0, function* () {
        const user = 'user';
        const subMsg = { topic: message_constants_1.TOPIC.PRESENCE, action: message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE, correlationId: counter.toString(), names: [user] };
        counter++;
        const unsubMsg = { topic: message_constants_1.TOPIC.PRESENCE, action: message_constants_1.PRESENCE_ACTIONS.UNSUBSCRIBE, correlationId: counter.toString(), names: [user] };
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(subMsg);
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({ message: subMsg });
        presenceHandler.subscribe(user, callbackSpy);
        yield bluebird_1.Promise.delay(flushTimeout);
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(unsubMsg);
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({ message: unsubMsg });
        presenceHandler.unsubscribe(user);
        yield bluebird_1.Promise.delay(flushTimeout);
    }));
    it('sends unsubscribe for all users presence', () => __awaiter(this, void 0, void 0, function* () {
        const subMsg = { topic: message_constants_1.TOPIC.PRESENCE, action: message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE_ALL };
        const unsubMsg = { topic: message_constants_1.TOPIC.PRESENCE, action: message_constants_1.PRESENCE_ACTIONS.UNSUBSCRIBE_ALL };
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(subMsg);
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({ message: subMsg });
        presenceHandler.subscribe(callbackSpy);
        yield bluebird_1.Promise.delay(flushTimeout);
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(unsubMsg);
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({ message: unsubMsg });
        presenceHandler.unsubscribe();
        yield bluebird_1.Promise.delay(flushTimeout);
    }));
    it('handles acks messages', () => {
        const messageAck = {
            topic: message_constants_1.TOPIC.PRESENCE,
            action: message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE_ACK,
            isAck: true
        };
        services.timeoutRegistryMock
            .expects('remove')
            .once()
            .withExactArgs(messageAck);
        presenceHandler.handle(messageAck);
    });
    it('resubscribes subscriptions when client reconnects', () => __awaiter(this, void 0, void 0, function* () {
        const users = [userA, userB];
        presenceHandler.subscribe(userA, () => { });
        presenceHandler.subscribe(userB, () => { });
        presenceHandler.subscribe(() => { });
        yield bluebird_1.Promise.delay(flushTimeout);
        counter = parseInt(mocks_1.getLastMessageSent().correlationId, 10) + 1;
        const messageSubscribeAll = message(message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE_ALL);
        const messageSubscribe = {
            topic: message_constants_1.TOPIC.PRESENCE,
            action: message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE,
            correlationId: counter.toString(),
            names: users
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
        yield bluebird_1.Promise.delay(flushTimeout);
    }));
    describe('when server responds for getAll for all users ', () => {
        let callback;
        let users;
        beforeEach(() => {
            callback = sinon_1.spy();
            users = ['userA', 'userB'];
            presenceHandler.getAll(callback);
            const promise = presenceHandler.getAll();
            promise.then(promiseSuccess).catch(promiseError);
        });
        it('receives data for query all users', () => __awaiter(this, void 0, void 0, function* () {
            const messageForCallback = messageResponseQueryAll(counter, users);
            const messageForPromise = messageResponseQueryAll(counter + 1, users);
            services.timeoutRegistryMock
                .expects('remove')
                .once()
                .withExactArgs(Object.assign({}, messageForCallback, { action: message_constants_1.PRESENCE_ACTIONS.QUERY_ALL }));
            services.timeoutRegistryMock
                .expects('remove')
                .once()
                .withExactArgs(Object.assign({}, messageForPromise, { action: message_constants_1.PRESENCE_ACTIONS.QUERY_ALL }));
            presenceHandler.handle(messageForCallback);
            presenceHandler.handle(messageForPromise);
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callback);
            sinon_1.assert.calledWithExactly(callback, null, users);
            sinon_1.assert.notCalled(promiseError);
            sinon_1.assert.calledOnce(promiseSuccess);
            sinon_1.assert.calledWithExactly(promiseSuccess, users);
        }));
        it('recieves error message for query all users', () => __awaiter(this, void 0, void 0, function* () {
            const error = message_constants_1.PRESENCE_ACTIONS.MESSAGE_DENIED;
            const messageForCallback = errorMessageResponseQueryAll(counter, error);
            const messageForPromise = errorMessageResponseQueryAll(counter + 1, error);
            services.timeoutRegistryMock
                .expects('remove')
                .once()
                .withExactArgs(messageForCallback);
            services.timeoutRegistryMock
                .expects('remove')
                .once()
                .withExactArgs(messageForPromise);
            presenceHandler.handle(messageForCallback);
            presenceHandler.handle(messageForPromise);
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callback);
            sinon_1.assert.calledWithExactly(callback, message_constants_1.PRESENCE_ACTIONS[error]);
            sinon_1.assert.calledOnce(promiseError);
            sinon_1.assert.calledWithExactly(promiseError, message_constants_1.PRESENCE_ACTIONS[error]);
            sinon_1.assert.notCalled(promiseSuccess);
        }));
    });
    describe('when server responds for getAll for specific users ', () => {
        let callback;
        let users;
        let usersPresence;
        beforeEach(() => {
            callback = sinon_1.spy();
            users = ['userA', 'userB'];
            usersPresence = { userA: true, userB: false };
            presenceHandler.getAll(users, callback);
            const promise = presenceHandler.getAll(users);
            promise.then(promiseSuccess).catch(promiseError);
        });
        it('receives data for query specific users', () => __awaiter(this, void 0, void 0, function* () {
            const messageForCallback = messageResponseQuery(counter, usersPresence);
            const messageForPromise = messageResponseQuery(counter + 1, usersPresence);
            services.timeoutRegistryMock
                .expects('remove')
                .once()
                .withExactArgs(Object.assign({}, messageForCallback, { action: message_constants_1.PRESENCE_ACTIONS.QUERY }));
            services.timeoutRegistryMock
                .expects('remove')
                .once()
                .withExactArgs(Object.assign({}, messageForPromise, { action: message_constants_1.PRESENCE_ACTIONS.QUERY }));
            presenceHandler.handle(messageForCallback);
            presenceHandler.handle(messageForPromise);
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callback);
            sinon_1.assert.calledWithExactly(callback, null, usersPresence);
            sinon_1.assert.notCalled(promiseError);
            sinon_1.assert.calledOnce(promiseSuccess);
            sinon_1.assert.calledWithExactly(promiseSuccess, usersPresence);
        }));
        it('recieves error message for query users', () => __awaiter(this, void 0, void 0, function* () {
            const error = message_constants_1.PRESENCE_ACTIONS.MESSAGE_DENIED;
            const messageForCallback = errorMessageResponseQuery(counter, error);
            const messageForPromise = errorMessageResponseQuery(counter + 1, error);
            services.timeoutRegistryMock
                .expects('remove')
                .once()
                .withExactArgs(messageForCallback);
            services.timeoutRegistryMock
                .expects('remove')
                .once()
                .withExactArgs(messageForPromise);
            presenceHandler.handle(messageForCallback);
            presenceHandler.handle(messageForPromise);
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callback);
            sinon_1.assert.calledWithExactly(callback, message_constants_1.PRESENCE_ACTIONS[error]);
            sinon_1.assert.calledOnce(promiseError);
            sinon_1.assert.calledWithExactly(promiseError, message_constants_1.PRESENCE_ACTIONS[error]);
            sinon_1.assert.notCalled(promiseSuccess);
        }));
    });
    describe('when subscribing to userA, userB and all', () => {
        let userACallback;
        let userBCallback;
        let allUsersCallback;
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            userACallback = sinon_1.spy();
            userBCallback = sinon_1.spy();
            allUsersCallback = sinon_1.spy();
            presenceHandler.subscribe(userA, userACallback);
            presenceHandler.subscribe(userB, userBCallback);
            presenceHandler.subscribe(allUsersCallback);
            yield bluebird_1.Promise.delay(flushTimeout);
        }));
        it('notifies when userA logs in', () => {
            presenceHandler.handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN, userA));
            presenceHandler.handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN_ALL, userA));
            sinon_1.assert.calledOnce(userACallback);
            sinon_1.assert.calledWithExactly(userACallback, userA, true);
            sinon_1.assert.notCalled(userBCallback);
            sinon_1.assert.calledOnce(allUsersCallback);
            sinon_1.assert.calledWithExactly(allUsersCallback, userA, true);
        });
        it('notifies when userB logs out', () => {
            presenceHandler.handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_LEAVE, userB));
            presenceHandler.handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_LEAVE_ALL, userB));
            sinon_1.assert.notCalled(userACallback);
            sinon_1.assert.calledOnce(userBCallback);
            sinon_1.assert.calledWithExactly(userBCallback, userB, false);
            sinon_1.assert.calledOnce(allUsersCallback);
            sinon_1.assert.calledWithExactly(allUsersCallback, userB, false);
        });
        it('notifies only the all users callback when userC logs in', () => {
            presenceHandler.handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN_ALL, userC));
            sinon_1.assert.notCalled(userACallback);
            sinon_1.assert.notCalled(userBCallback);
            sinon_1.assert.calledOnce(allUsersCallback);
            sinon_1.assert.calledWithExactly(allUsersCallback, userC, true);
        });
        it('notifies only the all users callback when userC logs out', () => {
            presenceHandler.handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_LEAVE_ALL, userC));
            sinon_1.assert.notCalled(userACallback);
            sinon_1.assert.notCalled(userBCallback);
            sinon_1.assert.calledOnce(allUsersCallback);
            sinon_1.assert.calledWithExactly(allUsersCallback, userC, false);
        });
        it('doesn\'t notify callbacks when userA logs in after unsubscribing', () => __awaiter(this, void 0, void 0, function* () {
            presenceHandler.unsubscribe(userA);
            yield bluebird_1.Promise.delay(flushTimeout);
            presenceHandler.handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN, userA));
            sinon_1.assert.notCalled(userACallback);
            sinon_1.assert.notCalled(userBCallback);
            sinon_1.assert.notCalled(allUsersCallback);
        }));
        it('doesn\'t notify userA callback when userA logs in after unsubscribing', () => __awaiter(this, void 0, void 0, function* () {
            presenceHandler.unsubscribe(userA, userACallback);
            yield bluebird_1.Promise.delay(flushTimeout);
            presenceHandler.handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN, userA));
            presenceHandler.handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN_ALL, userA));
            sinon_1.assert.notCalled(userACallback);
            sinon_1.assert.notCalled(userBCallback);
            sinon_1.assert.calledOnce(allUsersCallback);
            sinon_1.assert.calledWithExactly(allUsersCallback, userA, true);
        }));
        it('doesn\'t notify all users callback when userA logs in after unsubscribing', () => __awaiter(this, void 0, void 0, function* () {
            presenceHandler.unsubscribe(allUsersCallback);
            yield bluebird_1.Promise.delay(flushTimeout);
            presenceHandler.handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN, userA));
            presenceHandler.handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN_ALL, userA));
            sinon_1.assert.calledOnce(userACallback);
            sinon_1.assert.calledWithExactly(userACallback, userA, true);
            sinon_1.assert.notCalled(userBCallback);
            sinon_1.assert.notCalled(allUsersCallback);
        }));
        it('doesn\'t notify callbacks after unsubscribing all', () => __awaiter(this, void 0, void 0, function* () {
            presenceHandler.unsubscribe();
            yield bluebird_1.Promise.delay(flushTimeout);
            const users = [userA, userB];
            users.forEach(user => {
                presenceHandler.handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN, user));
                presenceHandler.handle(message(message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN_ALL, user));
            });
            sinon_1.assert.notCalled(userACallback);
            sinon_1.assert.notCalled(userBCallback);
            sinon_1.assert.notCalled(allUsersCallback);
        }));
    });
});
function message(action, user) {
    if (user) {
        return {
            name: user,
            topic: message_constants_1.TOPIC.PRESENCE,
            action
        };
    }
    else {
        return {
            topic: message_constants_1.TOPIC.PRESENCE,
            action
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
//# sourceMappingURL=presence-handlerSpec.js.map