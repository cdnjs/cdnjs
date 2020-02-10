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
// tslint:disabke:no-unused-expression
const BBPromise = require("bluebird");
const chai_1 = require("chai");
const mocks_1 = require("../test/mocks");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const client_options_1 = require("../client-options");
const record_core_1 = require("./record-core");
const sinon_1 = require("sinon");
const constants_1 = require("../constants");
describe('record core', () => {
    describe('online', () => {
        let whenCompleted;
        let recordCore;
        let options;
        let services;
        let recordServices;
        beforeEach(() => {
            whenCompleted = sinon_1.spy();
            services = mocks_1.getServicesMock();
            recordServices = mocks_1.getRecordServices(services);
            options = Object.assign({}, client_options_1.DefaultOptions, { discardTimeout: 20, recordReadTimeout: 20 });
            services.connection.isConnected = true;
            recordCore = new record_core_1.RecordCore(name, services, options, recordServices, whenCompleted);
            services.connectionMock.restore();
        });
        afterEach(() => {
            services.verify();
        });
        it('sends a subscribe create and read message if online when created', () => {
            services.connection.isConnected = true;
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD,
                name
            });
            recordCore = new record_core_1.RecordCore(name, services, options, recordServices, whenCompleted);
        });
        it('doesn`t send updates before ready', () => {
            services.connectionMock
                .expects('sendMessage')
                .never();
            recordCore.set({ data: { firstname: 'Wolfram' } });
        });
        it('doesn`t send patches before ready', () => {
            services.connectionMock
                .expects('sendMessage')
                .never();
            recordCore.set({ path: 'firstname', data: 'Wolfram' });
        });
        it('triggers ready callback on read response', () => {
            const context = {};
            const readySpy = sinon_1.spy();
            recordCore.whenReady(context, readySpy);
            recordServices.readRegistry.recieve(READ_RESPONSE);
            sinon_1.assert.calledOnce(readySpy);
            sinon_1.assert.calledWithExactly(readySpy, context);
        });
        it('triggers ready promise on read response', () => __awaiter(this, void 0, void 0, function* () {
            const context = {};
            let readyContext = null;
            const promise = recordCore.whenReady(context);
            promise.then(result => readyContext = result);
            recordServices.readRegistry.recieve(READ_RESPONSE);
            yield BBPromise.delay(0);
            chai_1.expect(readyContext).to.equal(context);
        }));
        it('sends update messages for updates after when ready', () => {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.UPDATE,
                name,
                parsedData: { firstname: 'Bob' },
                version: 2
            });
            recordCore.set({ data: { firstname: 'Bob' } });
        });
        it('sends patch messages for path changes after when ready', () => {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.PATCH,
                name,
                path: 'firstname',
                parsedData: 'Bob',
                version: 2
            });
            recordCore.set({ path: 'firstname', data: 'Bob' });
        });
        it('sends update messages for updates write ack after when ready', () => {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.UPDATE_WITH_WRITE_ACK,
                name,
                parsedData: { firstname: 'Bob' },
                correlationId: '1',
                version: 2
            });
            recordCore.set({ data: { firstname: 'Bob' }, callback: () => { } });
        });
        it('sends patch messages for path changes after when ready', () => {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.PATCH_WITH_WRITE_ACK,
                name,
                path: 'firstname',
                parsedData: 'Bob',
                correlationId: '1',
                version: 2
            });
            recordCore.set({ path: 'firstname', data: 'Bob', callback: () => { } });
        });
        it('sends erase messages for erase after when ready', () => {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.ERASE,
                name,
                path: 'firstname',
                version: 2
            });
            recordCore.set({ path: 'firstname' });
        });
        it('sends erase write ack messages for erase after when ready', () => {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.ERASE_WITH_WRITE_ACK,
                name,
                path: 'firstname',
                correlationId: '1',
                version: 2
            });
            recordCore.set({ path: 'firstname', callback: () => { } });
        });
        it('queues discarding record when no longer needed', () => {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            recordCore.discard();
            chai_1.expect(recordCore.recordState).to.equal("UNSUBSCRIBING" /* UNSUBSCRIBING */);
            chai_1.expect(recordCore.isReady).to.equal(true);
        });
        it('removes pending discard when usages increases', () => __awaiter(this, void 0, void 0, function* () {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            recordCore.discard();
            recordCore.usages = 1;
            yield BBPromise.delay(30);
            chai_1.expect(recordCore.recordState).to.equal("READY" /* READY */);
            chai_1.expect(recordCore.isReady).to.equal(true);
        }));
        it('sends discard when unsubscribe timeout completed', () => __awaiter(this, void 0, void 0, function* () {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            recordCore.discard();
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE,
                name
            });
            yield BBPromise.delay(30);
            chai_1.expect(recordCore.recordState).to.equal("UNSUBSCRIBED" /* UNSUBSCRIBED */);
            sinon_1.assert.calledOnce(whenCompleted);
            sinon_1.assert.calledWithExactly(whenCompleted, name);
            chai_1.expect(recordCore.isReady).to.equal(false);
        }));
        it('sends delete when ready', () => __awaiter(this, void 0, void 0, function* () {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.DELETE,
                name
            });
            recordCore.delete();
            chai_1.expect(recordCore.recordState).to.equal("DELETING" /* DELETING */);
            sinon_1.assert.notCalled(whenCompleted);
            chai_1.expect(recordCore.isReady).to.equal(true);
        }));
        it('calls delete when delete is confirmed', () => __awaiter(this, void 0, void 0, function* () {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            services.connectionMock
                .expects('sendMessage')
                .once();
            recordCore.delete();
            recordCore.handle({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.DELETE_SUCCESS,
                name
            });
            chai_1.expect(recordCore.recordState).to.equal("DELETED" /* DELETED */);
            sinon_1.assert.calledOnce(whenCompleted);
            sinon_1.assert.calledWithExactly(whenCompleted, name);
            // tslint:disable-next-line:no-unused-expression
            chai_1.expect(recordCore.isReady).to.equal(false);
        }));
        it('calls delete when delete happens remotely', () => __awaiter(this, void 0, void 0, function* () {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            recordCore.handle({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.DELETED,
                name
            });
            chai_1.expect(recordCore.recordState).to.equal("DELETED" /* DELETED */);
            sinon_1.assert.calledOnce(whenCompleted);
            sinon_1.assert.calledWithExactly(whenCompleted, name);
            // tslint:disable-next-line:no-unused-expression
            chai_1.expect(recordCore.isReady).to.equal(false);
        }));
    });
    describe('record core offline', () => {
        let whenCompleted;
        let recordCore;
        let options;
        let services;
        let recordServices;
        beforeEach(() => {
            whenCompleted = sinon_1.spy();
            services = mocks_1.getServicesMock();
            recordServices = mocks_1.getRecordServices(services);
            options = Object.assign({}, client_options_1.DefaultOptions, { discardTimeout: 20, recordReadTimeout: 20 });
            services.connectionMock
                .expects('sendMessage')
                .never();
            services.storageMock
                .expects('get')
                .once()
                .callsArgWith(1, name, 1, { firstname: 'wolfram' });
            services.connection.isConnected = false;
            recordCore = new record_core_1.RecordCore(name, services, options, recordServices, whenCompleted);
        });
        afterEach(() => {
            services.verify();
            recordServices.verify();
        });
        it('triggers ready callback on load', () => {
            const context = {};
            const readySpy = sinon_1.spy();
            recordCore.whenReady(context, readySpy);
            sinon_1.assert.calledOnce(readySpy);
            sinon_1.assert.calledWithExactly(readySpy, context);
        });
        it('sets update messages for updates after when ready', () => {
            services.storageMock
                .expects('set')
                .once()
                .withExactArgs(name, 2, { firstname: 'Bob' }, sinon_1.match.func);
            recordCore.set({ data: { firstname: 'Bob' } });
        });
        it('sends patch messages for path changes after when ready', () => {
            services.storageMock
                .expects('set')
                .once()
                .withExactArgs(name, 2, { firstname: 'Bob' }, sinon_1.match.func);
            recordCore.set({ path: 'firstname', data: 'Bob' });
        });
        it('responds to update write acks with an offline error', () => __awaiter(this, void 0, void 0, function* () {
            const ackCallback = sinon_1.spy();
            services.storageMock
                .expects('set')
                .once()
                .withExactArgs(name, 2, { firstname: 'Bob' }, sinon_1.match.func);
            recordCore.set({ data: { firstname: 'Bob' }, callback: ackCallback });
            yield BBPromise.delay(0);
            sinon_1.assert.calledOnce(ackCallback);
            sinon_1.assert.calledWithExactly(ackCallback, constants_1.EVENT.CLIENT_OFFLINE, name);
        }));
        it('sends patch messages for path changes after when ready', () => __awaiter(this, void 0, void 0, function* () {
            const ackCallback = sinon_1.spy();
            services.storageMock
                .expects('set')
                .once()
                .withExactArgs(name, 2, { firstname: 'Bob' }, sinon_1.match.func);
            recordCore.set({ path: 'firstname', data: 'Bob', callback: ackCallback });
            yield BBPromise.delay(0);
            sinon_1.assert.calledOnce(ackCallback);
            sinon_1.assert.calledWithExactly(ackCallback, constants_1.EVENT.CLIENT_OFFLINE, name);
        }));
        it('sends erase messages for erase after when ready', () => {
            services.storageMock
                .expects('set')
                .once()
                .withExactArgs(name, 2, {}, sinon_1.match.func);
            recordCore.set({ path: 'firstname' });
        });
        it('sends erase write ack messages for erase after when ready', () => __awaiter(this, void 0, void 0, function* () {
            const ackCallback = sinon_1.spy();
            services.storageMock
                .expects('set')
                .once()
                .withExactArgs(name, 2, {}, sinon_1.match.func);
            recordCore.set({ path: 'firstname', callback: ackCallback });
            yield BBPromise.delay(0);
            sinon_1.assert.calledOnce(ackCallback);
            sinon_1.assert.calledWithExactly(ackCallback, constants_1.EVENT.CLIENT_OFFLINE, name);
        }));
        it('queues discarding record when no longer needed', () => {
            recordCore.discard();
            chai_1.expect(recordCore.recordState).to.equal("UNSUBSCRIBING" /* UNSUBSCRIBING */);
            chai_1.expect(recordCore.isReady).to.equal(true);
        });
        it('removes pending discard when usages increases', () => __awaiter(this, void 0, void 0, function* () {
            recordCore.discard();
            recordCore.usages++;
            yield BBPromise.delay(30);
            chai_1.expect(recordCore.recordState).to.equal("READY" /* READY */);
            chai_1.expect(recordCore.isReady).to.equal(true);
        }));
        it('removes record when completed', () => __awaiter(this, void 0, void 0, function* () {
            recordCore.discard();
            yield BBPromise.delay(40);
            chai_1.expect(recordCore.recordState).to.equal("UNSUBSCRIBED" /* UNSUBSCRIBED */);
            sinon_1.assert.calledOnce(whenCompleted);
            sinon_1.assert.calledWithExactly(whenCompleted, name);
            chai_1.expect(recordCore.isReady).to.equal(false);
        }));
        it.skip('sends delete when ready', () => __awaiter(this, void 0, void 0, function* () {
            services.storageMock
                .expects('delete')
                .once()
                .withExactArgs(name, sinon_1.match.func);
            recordCore.delete();
            chai_1.expect(recordCore.recordState).to.equal("DELETING" /* DELETING */);
            sinon_1.assert.notCalled(whenCompleted);
            chai_1.expect(recordCore.isReady).to.equal(true);
        }));
        it.skip('calls delete when delete is confirmed', () => __awaiter(this, void 0, void 0, function* () {
            services.storageMock
                .expects('delete')
                .once()
                .withExactArgs(name, sinon_1.match.func)
                .callsArgWith(1, name);
            recordCore.delete();
            yield BBPromise.delay(0);
            // deleted
            chai_1.expect(recordCore.recordState).to.equal("DELETED" /* DELETED */);
            sinon_1.assert.calledOnce(whenCompleted);
            sinon_1.assert.calledWithExactly(whenCompleted, name);
            chai_1.expect(recordCore.isReady).to.equal(false);
        }));
    });
});
const name = 'recordA';
const READ_RESPONSE = {
    topic: message_constants_1.TOPIC.RECORD,
    action: message_constants_1.RECORD_ACTIONS.READ_RESPONSE,
    name,
    parsedData: {},
    version: 1
};
//# sourceMappingURL=record-core.spec.js.map