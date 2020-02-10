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
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const record_handler_1 = require("../../src/record/record-handler");
const client_options_1 = require("../../src/client-options");
describe('Record handler', () => {
    const name = 'recordA';
    const options = Object.assign({}, client_options_1.DefaultOptions);
    let services;
    let singleNotifierMock;
    let callbackSpy;
    let resolveSpy;
    let rejectSpy;
    let recordHandler;
    let handle;
    beforeEach(() => {
        callbackSpy = sinon_1.spy();
        resolveSpy = sinon_1.spy();
        rejectSpy = sinon_1.spy();
        services = mocks_1.getServicesMock();
        singleNotifierMock = mocks_1.getSingleNotifierMock().singleNotifierMock;
        recordHandler = new record_handler_1.RecordHandler(services, options);
        handle = services.getHandle();
    });
    afterEach(() => {
        singleNotifierMock.verify();
        services.verify();
    });
    it('validates on has, head and snapshot', () => {
        chai_1.expect(recordHandler.has.bind(recordHandler, '')).to.throw();
        chai_1.expect(recordHandler.has.bind(recordHandler, '', () => { })).to.throw();
        chai_1.expect(recordHandler.has.bind(recordHandler, 123, () => { })).to.throw();
        chai_1.expect(recordHandler.has.bind(recordHandler, null, () => { })).to.throw();
        chai_1.expect(recordHandler.has.bind(recordHandler, name, null)).to.throw();
        chai_1.expect(recordHandler.has.bind(recordHandler, name, 123)).to.throw();
        chai_1.expect(recordHandler.has.bind(recordHandler, name, [])).to.throw();
        chai_1.expect(recordHandler.has.bind(recordHandler, name, {})).to.throw();
        chai_1.expect(recordHandler.head.bind(recordHandler, '')).to.throw();
        chai_1.expect(recordHandler.head.bind(recordHandler, '', () => { })).to.throw();
        chai_1.expect(recordHandler.head.bind(recordHandler, 123, () => { })).to.throw();
        chai_1.expect(recordHandler.head.bind(recordHandler, null, () => { })).to.throw();
        chai_1.expect(recordHandler.head.bind(recordHandler, name, null)).to.throw();
        chai_1.expect(recordHandler.head.bind(recordHandler, name, 123)).to.throw();
        chai_1.expect(recordHandler.head.bind(recordHandler, name, [])).to.throw();
        chai_1.expect(recordHandler.head.bind(recordHandler, name, {})).to.throw();
        chai_1.expect(recordHandler.snapshot.bind(recordHandler, '')).to.throw();
        chai_1.expect(recordHandler.snapshot.bind(recordHandler, '', () => { })).to.throw();
        chai_1.expect(recordHandler.snapshot.bind(recordHandler, 123, () => { })).to.throw();
        chai_1.expect(recordHandler.snapshot.bind(recordHandler, null, () => { })).to.throw();
        chai_1.expect(recordHandler.snapshot.bind(recordHandler, name, null)).to.throw();
        chai_1.expect(recordHandler.snapshot.bind(recordHandler, name, 123)).to.throw();
        chai_1.expect(recordHandler.snapshot.bind(recordHandler, name, [])).to.throw();
        chai_1.expect(recordHandler.snapshot.bind(recordHandler, name, {})).to.throw();
    });
    it('snapshots record remotely using callback and promise style', () => {
        singleNotifierMock
            .expects('request')
            .once()
            .withExactArgs(name, { callback: callbackSpy });
        singleNotifierMock
            .expects('request')
            .once()
            .withExactArgs(name, { resolve: sinon_1.match.func, reject: sinon_1.match.func });
        recordHandler.snapshot(name, callbackSpy);
        recordHandler.snapshot(name);
    });
    it('snapshots local records using callback and promise style', () => {
        /**
         * TODO
         */
    });
    describe('handling snapshot messages', () => {
        let data;
        beforeEach(() => {
            data = { some: 'data' };
            recordHandler.snapshot(name, callbackSpy);
            const promise = recordHandler.snapshot(name);
            promise.then(resolveSpy).catch(rejectSpy);
        });
        it('handles success messages', () => __awaiter(this, void 0, void 0, function* () {
            handle({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.READ_RESPONSE,
                name,
                isError: false,
                parsedData: data
            });
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callbackSpy);
            sinon_1.assert.calledWithExactly(callbackSpy, null, data);
            sinon_1.assert.calledOnce(resolveSpy);
            sinon_1.assert.calledWithExactly(resolveSpy, data);
            sinon_1.assert.notCalled(rejectSpy);
        }));
        it('handles error messages', () => __awaiter(this, void 0, void 0, function* () {
            handle({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED,
                originalAction: message_constants_1.RECORD_ACTIONS.READ,
                name,
                isError: true
            });
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callbackSpy);
            sinon_1.assert.calledWithExactly(callbackSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED], undefined);
            sinon_1.assert.notCalled(resolveSpy);
            sinon_1.assert.calledOnce(rejectSpy);
            sinon_1.assert.calledWithExactly(rejectSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED]);
        }));
    });
    it('queries for the record version remotely using callback and promise', () => {
        singleNotifierMock
            .expects('request')
            .once()
            .withExactArgs(name, { callback: callbackSpy });
        singleNotifierMock
            .expects('request')
            .once()
            .withExactArgs(name, { resolve: sinon_1.match.func, reject: sinon_1.match.func });
        recordHandler.head(name, callbackSpy);
        const promise = recordHandler.head(name);
        promise.then(resolveSpy).catch(rejectSpy);
    });
    it('queries for the record version in local records using callback and promise', () => {
        /**
         * TODO
         */
    });
    describe('handling head messages from head calls', () => {
        let version;
        beforeEach(() => {
            version = 1;
            recordHandler.head(name, callbackSpy);
            const promise = recordHandler.head(name);
            promise.then(resolveSpy).catch(rejectSpy);
        });
        it('handles success messages', () => __awaiter(this, void 0, void 0, function* () {
            handle({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.HEAD_RESPONSE,
                name,
                isError: false,
                version
            });
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callbackSpy);
            sinon_1.assert.calledWithExactly(callbackSpy, null, version);
            sinon_1.assert.calledOnce(resolveSpy);
            sinon_1.assert.calledWithExactly(resolveSpy, version);
            sinon_1.assert.notCalled(rejectSpy);
        }));
        it('handles error messages', () => __awaiter(this, void 0, void 0, function* () {
            handle({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED,
                originalAction: message_constants_1.RECORD_ACTIONS.HEAD,
                name,
                isError: true
            });
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callbackSpy);
            sinon_1.assert.calledWithExactly(callbackSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED], undefined);
            sinon_1.assert.notCalled(resolveSpy);
            sinon_1.assert.calledOnce(rejectSpy);
            sinon_1.assert.calledWithExactly(rejectSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED]);
        }));
    });
    it('queries for record exists remotely using callback and promise', () => {
        singleNotifierMock
            .expects('request')
            .twice()
            .withExactArgs(name, { callback: sinon_1.match.func });
        recordHandler.has(name, callbackSpy);
        const promise = recordHandler.has(name);
        promise.then(resolveSpy).catch(rejectSpy);
    });
    it('queries for record exists in local records using callback and promise', () => {
        /**
         * TODO
         */
    });
    describe('handling head messages from has calls', () => {
        let version;
        beforeEach(() => {
            version = 1;
            recordHandler.has(name, callbackSpy);
            const promise = recordHandler.has(name);
            promise.then(resolveSpy).catch(rejectSpy);
        });
        it('handles success messages', () => __awaiter(this, void 0, void 0, function* () {
            handle({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.HEAD_RESPONSE,
                name,
                isError: false,
                version
            });
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callbackSpy);
            sinon_1.assert.calledWithExactly(callbackSpy, null, true);
            sinon_1.assert.calledOnce(resolveSpy);
            sinon_1.assert.calledWithExactly(resolveSpy, true);
            sinon_1.assert.notCalled(rejectSpy);
        }));
        it('handles record not found error messages', () => __awaiter(this, void 0, void 0, function* () {
            handle({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.HEAD_RESPONSE,
                originalAction: message_constants_1.RECORD_ACTIONS.HEAD,
                version: -1,
                name
            });
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callbackSpy);
            sinon_1.assert.calledWithExactly(callbackSpy, null, false);
            sinon_1.assert.calledOnce(resolveSpy);
            sinon_1.assert.calledWithExactly(resolveSpy, false);
            sinon_1.assert.notCalled(rejectSpy);
        }));
        it('handles error messages', () => __awaiter(this, void 0, void 0, function* () {
            handle({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED,
                originalAction: message_constants_1.RECORD_ACTIONS.HEAD,
                name,
                isError: true
            });
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callbackSpy);
            sinon_1.assert.calledWithExactly(callbackSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED], null);
            sinon_1.assert.notCalled(resolveSpy);
            sinon_1.assert.calledOnce(rejectSpy);
            sinon_1.assert.calledWithExactly(rejectSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED]);
        }));
    });
});
//# sourceMappingURL=record-handlerSpec.js.map