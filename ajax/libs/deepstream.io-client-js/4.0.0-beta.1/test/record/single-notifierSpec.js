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
const sinon_1 = require("sinon");
const mocks_1 = require("../mocks");
const constants_1 = require("../../src/constants");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const single_notifier_1 = require("../../src/record/single-notifier");
describe('Single Notifier', () => {
    const timeout = 10;
    const topic = message_constants_1.TOPIC.RECORD;
    const action = message_constants_1.RECORD_ACTIONS.READ;
    const name = 'name';
    let services;
    let singleNotifier;
    let callbackSpy;
    let resolveSpy;
    let rejectSpy;
    beforeEach(() => {
        services = mocks_1.getServicesMock();
        singleNotifier = new single_notifier_1.SingleNotifier(services, topic, action, timeout);
        callbackSpy = sinon_1.spy();
        resolveSpy = sinon_1.spy();
        rejectSpy = sinon_1.spy();
    });
    afterEach(() => {
        services.verify();
    });
    it('requests with correct topic and action', () => {
        const message = {
            topic,
            action,
            name
        };
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(message);
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({ message });
        singleNotifier.request(name, { callback: callbackSpy });
    });
    it('doesn\'t send message twice and updates the timeout when requesting twice', () => {
        const message = {
            topic,
            action,
            name
        };
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(message);
        services.timeoutRegistryMock
            .expects('add')
            .twice()
            .withExactArgs({ message });
        singleNotifier.request(name, { callback: callbackSpy });
        singleNotifier.request(name, { callback: callbackSpy });
    });
    it('cant\'t query request when client is offline', () => __awaiter(this, void 0, void 0, function* () {
        services.connection.isConnected = false;
        services.connectionMock
            .expects('sendMessage')
            .never();
        services.timeoutRegistryMock
            .expects('add')
            .never();
        singleNotifier.request(name, { callback: callbackSpy });
        singleNotifier.request(name, { resolve: resolveSpy, reject: rejectSpy });
        yield bluebird_1.Promise.delay(1);
        sinon_1.assert.calledOnce(callbackSpy);
        sinon_1.assert.calledWithExactly(callbackSpy, constants_1.EVENT.CLIENT_OFFLINE);
        sinon_1.assert.notCalled(resolveSpy);
        sinon_1.assert.calledOnce(rejectSpy);
        sinon_1.assert.calledWithExactly(rejectSpy, constants_1.EVENT.CLIENT_OFFLINE);
    }));
    describe('requesting', () => __awaiter(this, void 0, void 0, function* () {
        beforeEach(() => {
            singleNotifier.request(name, { callback: callbackSpy });
            singleNotifier.request(name, { resolve: resolveSpy, reject: rejectSpy });
        });
        it('doesn\'t respond unknown requests', () => __awaiter(this, void 0, void 0, function* () {
            const message = {
                topic,
                action: message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED,
                name: 'something',
                isError: true
            };
            singleNotifier.recieve(message, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED], undefined);
            sinon_1.assert.notCalled(callbackSpy);
            sinon_1.assert.notCalled(resolveSpy);
            sinon_1.assert.notCalled(rejectSpy);
            yield bluebird_1.Promise.delay(1);
        }));
        it('responds callback and promise requests with success response', () => __awaiter(this, void 0, void 0, function* () {
            const parsedData = { some: 'data' };
            singleNotifier.recieve({
                topic,
                action,
                name,
                isError: false,
                parsedData
            }, undefined, parsedData);
            sinon_1.assert.calledOnce(callbackSpy);
            sinon_1.assert.calledWithExactly(callbackSpy, undefined, parsedData);
            sinon_1.assert.calledOnce(resolveSpy);
            sinon_1.assert.calledWithExactly(resolveSpy, parsedData);
            sinon_1.assert.notCalled(rejectSpy);
            yield bluebird_1.Promise.delay(1);
        }));
        it('responds callback and promise requests with error response', () => __awaiter(this, void 0, void 0, function* () {
            singleNotifier.recieve({
                topic,
                action: message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED,
                name,
                isError: true
            }, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED], undefined);
            sinon_1.assert.calledOnce(callbackSpy);
            sinon_1.assert.calledWithExactly(callbackSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED], undefined);
            sinon_1.assert.notCalled(resolveSpy);
            sinon_1.assert.calledOnce(rejectSpy);
            sinon_1.assert.calledWithExactly(rejectSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED]);
            yield bluebird_1.Promise.delay(1);
        }));
        it('responds with error on connection lost', () => __awaiter(this, void 0, void 0, function* () {
            services.simulateConnectionLost();
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callbackSpy);
            sinon_1.assert.calledWithExactly(callbackSpy, constants_1.EVENT.CLIENT_OFFLINE);
            sinon_1.assert.notCalled(resolveSpy);
            sinon_1.assert.calledOnce(rejectSpy);
            sinon_1.assert.calledWithExactly(rejectSpy, constants_1.EVENT.CLIENT_OFFLINE);
        }));
    }));
});
//# sourceMappingURL=single-notifierSpec.js.map