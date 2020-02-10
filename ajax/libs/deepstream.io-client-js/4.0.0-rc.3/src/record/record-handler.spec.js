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
const mocks_1 = require("../test/mocks");
const record_handler_1 = require("./record-handler");
const client_options_1 = require("../client-options");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
describe('Record handler', () => {
    const name = 'recordA';
    let options = Object.assign({}, client_options_1.DefaultOptions);
    let services;
    let recordServices;
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
        recordServices = mocks_1.getRecordServices(services);
        recordHandler = new record_handler_1.RecordHandler(services, options, recordServices);
        handle = services.getHandle();
    });
    afterEach(() => {
        services.verify();
        recordServices.verify();
    });
    it('validates on has, head and snapshot', () => {
        chai_1.expect(recordHandler.has.bind(recordHandler, '')).to.throw();
        chai_1.expect(recordHandler.has.bind(recordHandler, '', () => { })).to.throw();
        chai_1.expect(recordHandler.head.bind(recordHandler, '')).to.throw();
        chai_1.expect(recordHandler.head.bind(recordHandler, '', () => { })).to.throw();
        chai_1.expect(recordHandler.snapshot.bind(recordHandler, '')).to.throw();
        chai_1.expect(recordHandler.snapshot.bind(recordHandler, '', () => { })).to.throw();
    });
    it('snapshots record remotely using callback and promise style', () => __awaiter(this, void 0, void 0, function* () {
        recordServices.readRegistryMock
            .expects('request')
            .twice()
            .withExactArgs(name, sinon_1.match.func);
        recordHandler.snapshot(name, callbackSpy);
        recordHandler.snapshot(name);
    }));
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
        recordServices.headRegistryMock
            .expects('request')
            .twice()
            .withExactArgs(name, sinon_1.match.func);
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
        recordServices.headRegistryMock
            .expects('request')
            .twice()
            .withExactArgs(name, sinon_1.match.func);
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
    describe('record setData online', () => {
        const topic = message_constants_1.TOPIC.RECORD;
        beforeEach(() => {
            services = mocks_1.getServicesMock();
            recordServices = mocks_1.getRecordServices(services);
            options = Object.assign({}, client_options_1.DefaultOptions);
            services.connection.isConnected = true;
            recordHandler = new record_handler_1.RecordHandler(services, options, recordServices);
            handle = services.getHandle();
        });
        afterEach(() => {
            services.verify();
            recordServices.verify();
        });
        it('sends update messages for entire data changes', () => {
            const data = { firstname: 'Wolfram' };
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic,
                action: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE,
                name,
                path: undefined,
                parsedData: data,
                version: -1
            });
            recordHandler.setData(name, data);
        });
        it('sends update messages for path changes ', () => {
            const path = 'lastName';
            const data = 'Hempel';
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic,
                action: message_constants_1.RECORD_ACTIONS.CREATEANDPATCH,
                name,
                path,
                parsedData: data,
                version: -1
            });
            recordHandler.setData(name, path, data);
        });
        it('deletes value when sending undefined for a value', () => {
            const path = 'lastName';
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic,
                action: message_constants_1.RECORD_ACTIONS.ERASE,
                name,
                path,
                version: -1,
                parsedData: undefined
            });
            recordHandler.setData(name, path, undefined);
        });
        it.skip('updates existent local record', () => {
        });
        it('throws error for invalid arguments', () => {
            chai_1.expect(recordHandler.setData.bind(recordHandler)).to.throw();
            chai_1.expect(recordHandler.setData.bind(recordHandler, name)).to.throw();
            // @ts-ignore
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, undefined)).to.throw();
            // @ts-ignore
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, undefined, () => { })).to.throw();
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, null)).to.throw();
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, null, () => { })).to.throw();
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, '', 'data')).to.throw();
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, 'Some String')).to.throw();
            // @ts-ignore
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, 100.24)).to.throw();
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, {}, { not: 'func' })).to.throw();
        });
        describe('with ack', () => {
            let data;
            let path;
            let cb;
            beforeEach(() => {
                path = 'key';
                data = { some: 'value' };
                cb = () => { };
            });
            it('sends update messages for entire data changes with ack callback', () => {
                recordServices.writeAckServiceMock
                    .expects('send')
                    .once()
                    .withExactArgs({
                    topic,
                    action: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE,
                    name,
                    path: undefined,
                    parsedData: data,
                    version: -1,
                }, cb);
                recordHandler.setData(name, data, cb);
            });
            it('sends update messages for path changes with ack callback', () => {
                recordServices.writeAckServiceMock
                    .expects('send')
                    .once()
                    .withExactArgs({
                    topic,
                    action: message_constants_1.RECORD_ACTIONS.CREATEANDPATCH,
                    name,
                    path,
                    parsedData: data,
                    version: -1
                }, cb);
                recordHandler.setData(name, path, data, cb);
            });
            it('sends update messages for entire data changes with ack promise', () => {
                recordServices.writeAckServiceMock
                    .expects('send')
                    .once()
                    .withExactArgs({
                    topic,
                    action: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE,
                    name,
                    path: undefined,
                    parsedData: data,
                    version: -1
                }, sinon_1.match.func);
                const promise = recordHandler.setDataWithAck(name, data);
                chai_1.expect(promise).is.a('promise');
            });
            it('sends update messages for path changes with ack promise', () => {
                recordServices.writeAckServiceMock
                    .expects('send')
                    .once()
                    .withExactArgs({
                    topic,
                    action: message_constants_1.RECORD_ACTIONS.CREATEANDPATCH,
                    name,
                    path,
                    parsedData: data,
                    version: -1
                }, sinon_1.match.func);
                const promise = recordHandler.setDataWithAck(name, path, data);
                chai_1.expect(promise).is.a('promise');
            });
            it('deletes value when sending undefined for a path with ack callback', () => {
                recordServices.writeAckServiceMock
                    .expects('send')
                    .once()
                    .withExactArgs({
                    topic,
                    action: message_constants_1.RECORD_ACTIONS.ERASE,
                    name,
                    path,
                    version: -1,
                    parsedData: undefined
                }, cb);
                recordHandler.setDataWithAck(name, path, undefined, cb);
            });
            it('deletes value when sending undefined for a path with ack promise', () => {
                recordServices.writeAckServiceMock
                    .expects('send')
                    .once()
                    .withExactArgs({
                    topic,
                    action: message_constants_1.RECORD_ACTIONS.ERASE,
                    name,
                    path,
                    version: -1,
                    parsedData: undefined
                }, sinon_1.match.func);
                const promise = recordHandler.setDataWithAck(name, path, undefined);
                chai_1.expect(promise).is.a('promise');
            });
        });
        describe('handling acknowledgements', () => {
            const path = 'key';
            const data = { some: 'value' };
            let ackCallback;
            let ackResolve;
            let ackReject;
            beforeEach(() => {
                ackCallback = sinon_1.spy();
                ackResolve = sinon_1.spy();
                ackReject = sinon_1.spy();
            });
            const errorMsg = {
                topic,
                action: message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED,
                originalAction: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE_WITH_WRITE_ACK,
                name,
                correlationId: '1',
                isError: true,
                isWriteAck: true
            };
            it('calls callbackAck with error', () => __awaiter(this, void 0, void 0, function* () {
                recordHandler.setDataWithAck(name, data, ackCallback);
                handle(errorMsg);
                yield bluebird_1.Promise.delay(1);
                sinon_1.assert.calledOnce(ackCallback);
                sinon_1.assert.calledWithExactly(ackCallback, message_constants_1.RECORD_ACTIONS[errorMsg.action]);
            }));
            it('rejects promise with error', () => __awaiter(this, void 0, void 0, function* () {
                const promise = recordHandler.setDataWithAck(name, path, undefined);
                promise.then(ackResolve).catch(ackReject);
                handle(errorMsg);
                yield bluebird_1.Promise.delay(1);
                sinon_1.assert.notCalled(ackResolve);
                sinon_1.assert.calledOnce(ackReject);
                sinon_1.assert.calledWithExactly(ackReject, message_constants_1.RECORD_ACTIONS[errorMsg.action]);
            }));
            const createUpdateAckMsg = {
                topic,
                action: message_constants_1.RECORD_ACTIONS.WRITE_ACKNOWLEDGEMENT,
                originalAction: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE_WITH_WRITE_ACK,
                name,
                correlationId: '1',
                isWriteAck: true
            };
            it('calls callbackAck for setData without path', () => __awaiter(this, void 0, void 0, function* () {
                recordHandler.setDataWithAck(name, data, ackCallback);
                handle(createUpdateAckMsg);
                yield bluebird_1.Promise.delay(1);
                sinon_1.assert.calledOnce(ackCallback);
                sinon_1.assert.calledWithExactly(ackCallback, null);
            }));
            it('resolves promise for setData without path', () => __awaiter(this, void 0, void 0, function* () {
                const promise = recordHandler.setDataWithAck(name, data);
                promise.then(ackResolve).catch(ackReject);
                handle(createUpdateAckMsg);
                yield bluebird_1.Promise.delay(1);
                sinon_1.assert.calledOnce(ackResolve);
                sinon_1.assert.notCalled(ackReject);
            }));
            const createPatchAckMsg = {
                topic,
                action: message_constants_1.RECORD_ACTIONS.WRITE_ACKNOWLEDGEMENT,
                originalAction: message_constants_1.RECORD_ACTIONS.CREATEANDPATCH_WITH_WRITE_ACK,
                name,
                correlationId: '1',
                isWriteAck: true
            };
            it('calls callbackAck for setData with path', () => __awaiter(this, void 0, void 0, function* () {
                recordHandler.setDataWithAck(name, path, data, ackCallback);
                handle(createPatchAckMsg);
                yield bluebird_1.Promise.delay(1);
                sinon_1.assert.calledOnce(ackCallback);
                sinon_1.assert.calledWithExactly(ackCallback, null);
            }));
            it('resolves promise for setData with path', () => __awaiter(this, void 0, void 0, function* () {
                const promise = recordHandler.setDataWithAck(name, path, data);
                promise.then(ackResolve).catch(ackReject);
                handle(createPatchAckMsg);
                yield bluebird_1.Promise.delay(1);
                sinon_1.assert.calledOnce(ackResolve);
                sinon_1.assert.notCalled(ackReject);
            }));
            const eraseAckMsg = {
                topic,
                action: message_constants_1.RECORD_ACTIONS.WRITE_ACKNOWLEDGEMENT,
                originalAction: message_constants_1.RECORD_ACTIONS.ERASE_WITH_WRITE_ACK,
                name,
                correlationId: '1',
                isWriteAck: true
            };
            it('calls callbackAck for setData deleting values', () => __awaiter(this, void 0, void 0, function* () {
                recordHandler.setDataWithAck(name, path, undefined, ackCallback);
                handle(eraseAckMsg);
                yield bluebird_1.Promise.delay(1);
                sinon_1.assert.calledOnce(ackCallback);
                sinon_1.assert.calledWithExactly(ackCallback, null);
            }));
            it('resolves promise for setData deleting values', () => __awaiter(this, void 0, void 0, function* () {
                const promise = recordHandler.setDataWithAck(name, path, undefined);
                promise.then(ackResolve).catch(ackReject);
                handle(eraseAckMsg);
                yield bluebird_1.Promise.delay(1);
                sinon_1.assert.calledOnce(ackResolve);
                sinon_1.assert.notCalled(ackReject);
            }));
        });
    });
});
//# sourceMappingURL=record-handler.spec.js.map