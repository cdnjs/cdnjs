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
var mocks_1 = require("../test/mocks");
var record_handler_1 = require("./record-handler");
var client_options_1 = require("../client-options");
var message_constants_1 = require("../../binary-protocol/src/message-constants");
describe('Record handler', function () {
    var name = 'recordA';
    var options = Object.assign({}, client_options_1.DefaultOptions);
    var services;
    var recordServices;
    var callbackSpy;
    var resolveSpy;
    var rejectSpy;
    var recordHandler;
    var handle;
    beforeEach(function () {
        callbackSpy = sinon_1.spy();
        resolveSpy = sinon_1.spy();
        rejectSpy = sinon_1.spy();
        services = mocks_1.getServicesMock();
        recordServices = mocks_1.getRecordServices(services);
        recordHandler = new record_handler_1.RecordHandler(services, options, recordServices);
        handle = services.getHandle();
    });
    afterEach(function () {
        services.verify();
        recordServices.verify();
    });
    it('validates on has, head and snapshot', function () {
        chai_1.expect(recordHandler.has.bind(recordHandler, '')).to.throw();
        chai_1.expect(recordHandler.has.bind(recordHandler, '', function () { })).to.throw();
        chai_1.expect(recordHandler.head.bind(recordHandler, '')).to.throw();
        chai_1.expect(recordHandler.head.bind(recordHandler, '', function () { })).to.throw();
        chai_1.expect(recordHandler.snapshot.bind(recordHandler, '')).to.throw();
        chai_1.expect(recordHandler.snapshot.bind(recordHandler, '', function () { })).to.throw();
    });
    it('snapshots record remotely using callback and promise style', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            recordServices.readRegistryMock
                .expects('request')
                .twice()
                .withExactArgs(name, sinon_1.match.func);
            recordHandler.snapshot(name, callbackSpy);
            recordHandler.snapshot(name);
            return [2 /*return*/];
        });
    }); });
    it('snapshots local records using callback and promise style', function () {
        /**
         * TODO
         */
    });
    describe('handling snapshot messages', function () {
        var data;
        beforeEach(function () {
            data = { some: 'data' };
            recordHandler.snapshot(name, callbackSpy);
            var promise = recordHandler.snapshot(name);
            promise.then(resolveSpy).catch(rejectSpy);
        });
        it('handles success messages', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handle({
                            topic: message_constants_1.TOPIC.RECORD,
                            action: message_constants_1.RECORD_ACTIONS.READ_RESPONSE,
                            name: name,
                            isError: false,
                            parsedData: data
                        });
                        return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(callbackSpy);
                        sinon_1.assert.calledWithExactly(callbackSpy, null, data);
                        sinon_1.assert.calledOnce(resolveSpy);
                        sinon_1.assert.calledWithExactly(resolveSpy, data);
                        sinon_1.assert.notCalled(rejectSpy);
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles error messages', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handle({
                            topic: message_constants_1.TOPIC.RECORD,
                            action: message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED,
                            originalAction: message_constants_1.RECORD_ACTIONS.READ,
                            name: name,
                            isError: true
                        });
                        return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(callbackSpy);
                        sinon_1.assert.calledWithExactly(callbackSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED], undefined);
                        sinon_1.assert.notCalled(resolveSpy);
                        sinon_1.assert.calledOnce(rejectSpy);
                        sinon_1.assert.calledWithExactly(rejectSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('queries for the record version remotely using callback and promise', function () {
        recordServices.headRegistryMock
            .expects('request')
            .twice()
            .withExactArgs(name, sinon_1.match.func);
        recordHandler.head(name, callbackSpy);
        var promise = recordHandler.head(name);
        promise.then(resolveSpy).catch(rejectSpy);
    });
    it('queries for the record version in local records using callback and promise', function () {
        /**
         * TODO
         */
    });
    describe('handling head messages from head calls', function () {
        var version;
        beforeEach(function () {
            version = 1;
            recordHandler.head(name, callbackSpy);
            var promise = recordHandler.head(name);
            promise.then(resolveSpy).catch(rejectSpy);
        });
        it('handles success messages', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handle({
                            topic: message_constants_1.TOPIC.RECORD,
                            action: message_constants_1.RECORD_ACTIONS.HEAD_RESPONSE,
                            name: name,
                            isError: false,
                            version: version
                        });
                        return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(callbackSpy);
                        sinon_1.assert.calledWithExactly(callbackSpy, null, version);
                        sinon_1.assert.calledOnce(resolveSpy);
                        sinon_1.assert.calledWithExactly(resolveSpy, version);
                        sinon_1.assert.notCalled(rejectSpy);
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles error messages', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handle({
                            topic: message_constants_1.TOPIC.RECORD,
                            action: message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED,
                            originalAction: message_constants_1.RECORD_ACTIONS.HEAD,
                            name: name,
                            isError: true
                        });
                        return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(callbackSpy);
                        sinon_1.assert.calledWithExactly(callbackSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED], undefined);
                        sinon_1.assert.notCalled(resolveSpy);
                        sinon_1.assert.calledOnce(rejectSpy);
                        sinon_1.assert.calledWithExactly(rejectSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('queries for record exists remotely using callback and promise', function () {
        recordServices.headRegistryMock
            .expects('request')
            .twice()
            .withExactArgs(name, sinon_1.match.func);
        recordHandler.has(name, callbackSpy);
        var promise = recordHandler.has(name);
        promise.then(resolveSpy).catch(rejectSpy);
    });
    it('queries for record exists in local records using callback and promise', function () {
        /**
         * TODO
         */
    });
    describe('handling head messages from has calls', function () {
        var version;
        beforeEach(function () {
            version = 1;
            recordHandler.has(name, callbackSpy);
            var promise = recordHandler.has(name);
            promise.then(resolveSpy).catch(rejectSpy);
        });
        it('handles success messages', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handle({
                            topic: message_constants_1.TOPIC.RECORD,
                            action: message_constants_1.RECORD_ACTIONS.HEAD_RESPONSE,
                            name: name,
                            isError: false,
                            version: version
                        });
                        return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(callbackSpy);
                        sinon_1.assert.calledWithExactly(callbackSpy, null, true);
                        sinon_1.assert.calledOnce(resolveSpy);
                        sinon_1.assert.calledWithExactly(resolveSpy, true);
                        sinon_1.assert.notCalled(rejectSpy);
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles record not found error messages', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handle({
                            topic: message_constants_1.TOPIC.RECORD,
                            action: message_constants_1.RECORD_ACTIONS.HEAD_RESPONSE,
                            originalAction: message_constants_1.RECORD_ACTIONS.HEAD,
                            version: -1,
                            name: name
                        });
                        return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(callbackSpy);
                        sinon_1.assert.calledWithExactly(callbackSpy, null, false);
                        sinon_1.assert.calledOnce(resolveSpy);
                        sinon_1.assert.calledWithExactly(resolveSpy, false);
                        sinon_1.assert.notCalled(rejectSpy);
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles error messages', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handle({
                            topic: message_constants_1.TOPIC.RECORD,
                            action: message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED,
                            originalAction: message_constants_1.RECORD_ACTIONS.HEAD,
                            name: name,
                            isError: true
                        });
                        return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(callbackSpy);
                        sinon_1.assert.calledWithExactly(callbackSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED], null);
                        sinon_1.assert.notCalled(resolveSpy);
                        sinon_1.assert.calledOnce(rejectSpy);
                        sinon_1.assert.calledWithExactly(rejectSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('record setData online', function () {
        var topic = message_constants_1.TOPIC.RECORD;
        beforeEach(function () {
            services = mocks_1.getServicesMock();
            recordServices = mocks_1.getRecordServices(services);
            options = Object.assign({}, client_options_1.DefaultOptions);
            services.connection.isConnected = true;
            recordHandler = new record_handler_1.RecordHandler(services, options, recordServices);
            handle = services.getHandle();
        });
        afterEach(function () {
            services.verify();
            recordServices.verify();
        });
        it('sends update messages for entire data changes', function () {
            var data = { firstname: 'Wolfram' };
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: topic,
                action: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE,
                name: name,
                path: undefined,
                parsedData: data,
                version: -1
            });
            recordHandler.setData(name, data);
        });
        it('sends update messages for path changes ', function () {
            var path = 'lastName';
            var data = 'Hempel';
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: topic,
                action: message_constants_1.RECORD_ACTIONS.CREATEANDPATCH,
                name: name,
                path: path,
                parsedData: data,
                version: -1
            });
            recordHandler.setData(name, path, data);
        });
        it('deletes value when sending undefined for a value', function () {
            var path = 'lastName';
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: topic,
                action: message_constants_1.RECORD_ACTIONS.ERASE,
                name: name,
                path: path,
                version: -1,
                parsedData: undefined
            });
            recordHandler.setData(name, path, undefined);
        });
        it.skip('updates existent local record', function () {
        });
        it('throws error for invalid arguments', function () {
            chai_1.expect(recordHandler.setData.bind(recordHandler)).to.throw();
            chai_1.expect(recordHandler.setData.bind(recordHandler, name)).to.throw();
            // @ts-ignore
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, undefined)).to.throw();
            // @ts-ignore
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, undefined, function () { })).to.throw();
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, null)).to.throw();
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, null, function () { })).to.throw();
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, '', 'data')).to.throw();
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, 'Some String')).to.throw();
            // @ts-ignore
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, 100.24)).to.throw();
            chai_1.expect(recordHandler.setData.bind(recordHandler, name, {}, { not: 'func' })).to.throw();
        });
        describe('with ack', function () {
            var data;
            var path;
            var cb;
            beforeEach(function () {
                path = 'key';
                data = { some: 'value' };
                cb = function () { };
            });
            it('sends update messages for entire data changes with ack callback', function () {
                recordServices.writeAckServiceMock
                    .expects('send')
                    .once()
                    .withExactArgs({
                    topic: topic,
                    action: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE,
                    name: name,
                    path: undefined,
                    parsedData: data,
                    version: -1,
                }, cb);
                recordHandler.setData(name, data, cb);
            });
            it('sends update messages for path changes with ack callback', function () {
                recordServices.writeAckServiceMock
                    .expects('send')
                    .once()
                    .withExactArgs({
                    topic: topic,
                    action: message_constants_1.RECORD_ACTIONS.CREATEANDPATCH,
                    name: name,
                    path: path,
                    parsedData: data,
                    version: -1
                }, cb);
                recordHandler.setData(name, path, data, cb);
            });
            it('sends update messages for entire data changes with ack promise', function () {
                recordServices.writeAckServiceMock
                    .expects('send')
                    .once()
                    .withExactArgs({
                    topic: topic,
                    action: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE,
                    name: name,
                    path: undefined,
                    parsedData: data,
                    version: -1
                }, sinon_1.match.func);
                var promise = recordHandler.setDataWithAck(name, data);
                chai_1.expect(promise).is.a('promise');
            });
            it('sends update messages for path changes with ack promise', function () {
                recordServices.writeAckServiceMock
                    .expects('send')
                    .once()
                    .withExactArgs({
                    topic: topic,
                    action: message_constants_1.RECORD_ACTIONS.CREATEANDPATCH,
                    name: name,
                    path: path,
                    parsedData: data,
                    version: -1
                }, sinon_1.match.func);
                var promise = recordHandler.setDataWithAck(name, path, data);
                chai_1.expect(promise).is.a('promise');
            });
            it('deletes value when sending undefined for a path with ack callback', function () {
                recordServices.writeAckServiceMock
                    .expects('send')
                    .once()
                    .withExactArgs({
                    topic: topic,
                    action: message_constants_1.RECORD_ACTIONS.ERASE,
                    name: name,
                    path: path,
                    version: -1,
                    parsedData: undefined
                }, cb);
                recordHandler.setDataWithAck(name, path, undefined, cb);
            });
            it('deletes value when sending undefined for a path with ack promise', function () {
                recordServices.writeAckServiceMock
                    .expects('send')
                    .once()
                    .withExactArgs({
                    topic: topic,
                    action: message_constants_1.RECORD_ACTIONS.ERASE,
                    name: name,
                    path: path,
                    version: -1,
                    parsedData: undefined
                }, sinon_1.match.func);
                var promise = recordHandler.setDataWithAck(name, path, undefined);
                chai_1.expect(promise).is.a('promise');
            });
        });
        describe('handling acknowledgements', function () {
            var path = 'key';
            var data = { some: 'value' };
            var ackCallback;
            var ackResolve;
            var ackReject;
            beforeEach(function () {
                ackCallback = sinon_1.spy();
                ackResolve = sinon_1.spy();
                ackReject = sinon_1.spy();
            });
            var errorMsg = {
                topic: topic,
                action: message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED,
                originalAction: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE_WITH_WRITE_ACK,
                name: name,
                correlationId: '1',
                isError: true,
                isWriteAck: true
            };
            it('calls callbackAck with error', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            recordHandler.setDataWithAck(name, data, ackCallback);
                            handle(errorMsg);
                            return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                        case 1:
                            _a.sent();
                            sinon_1.assert.calledOnce(ackCallback);
                            sinon_1.assert.calledWithExactly(ackCallback, message_constants_1.RECORD_ACTIONS[errorMsg.action]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('rejects promise with error', function () { return __awaiter(_this, void 0, void 0, function () {
                var promise;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            promise = recordHandler.setDataWithAck(name, path, undefined);
                            promise.then(ackResolve).catch(ackReject);
                            handle(errorMsg);
                            return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                        case 1:
                            _a.sent();
                            sinon_1.assert.notCalled(ackResolve);
                            sinon_1.assert.calledOnce(ackReject);
                            sinon_1.assert.calledWithExactly(ackReject, message_constants_1.RECORD_ACTIONS[errorMsg.action]);
                            return [2 /*return*/];
                    }
                });
            }); });
            var createUpdateAckMsg = {
                topic: topic,
                action: message_constants_1.RECORD_ACTIONS.WRITE_ACKNOWLEDGEMENT,
                originalAction: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE_WITH_WRITE_ACK,
                name: name,
                correlationId: '1',
                isWriteAck: true
            };
            it('calls callbackAck for setData without path', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            recordHandler.setDataWithAck(name, data, ackCallback);
                            handle(createUpdateAckMsg);
                            return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                        case 1:
                            _a.sent();
                            sinon_1.assert.calledOnce(ackCallback);
                            sinon_1.assert.calledWithExactly(ackCallback, null);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('resolves promise for setData without path', function () { return __awaiter(_this, void 0, void 0, function () {
                var promise;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            promise = recordHandler.setDataWithAck(name, data);
                            promise.then(ackResolve).catch(ackReject);
                            handle(createUpdateAckMsg);
                            return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                        case 1:
                            _a.sent();
                            sinon_1.assert.calledOnce(ackResolve);
                            sinon_1.assert.notCalled(ackReject);
                            return [2 /*return*/];
                    }
                });
            }); });
            var createPatchAckMsg = {
                topic: topic,
                action: message_constants_1.RECORD_ACTIONS.WRITE_ACKNOWLEDGEMENT,
                originalAction: message_constants_1.RECORD_ACTIONS.CREATEANDPATCH_WITH_WRITE_ACK,
                name: name,
                correlationId: '1',
                isWriteAck: true
            };
            it('calls callbackAck for setData with path', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            recordHandler.setDataWithAck(name, path, data, ackCallback);
                            handle(createPatchAckMsg);
                            return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                        case 1:
                            _a.sent();
                            sinon_1.assert.calledOnce(ackCallback);
                            sinon_1.assert.calledWithExactly(ackCallback, null);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('resolves promise for setData with path', function () { return __awaiter(_this, void 0, void 0, function () {
                var promise;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            promise = recordHandler.setDataWithAck(name, path, data);
                            promise.then(ackResolve).catch(ackReject);
                            handle(createPatchAckMsg);
                            return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                        case 1:
                            _a.sent();
                            sinon_1.assert.calledOnce(ackResolve);
                            sinon_1.assert.notCalled(ackReject);
                            return [2 /*return*/];
                    }
                });
            }); });
            var eraseAckMsg = {
                topic: topic,
                action: message_constants_1.RECORD_ACTIONS.WRITE_ACKNOWLEDGEMENT,
                originalAction: message_constants_1.RECORD_ACTIONS.ERASE_WITH_WRITE_ACK,
                name: name,
                correlationId: '1',
                isWriteAck: true
            };
            it('calls callbackAck for setData deleting values', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            recordHandler.setDataWithAck(name, path, undefined, ackCallback);
                            handle(eraseAckMsg);
                            return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                        case 1:
                            _a.sent();
                            sinon_1.assert.calledOnce(ackCallback);
                            sinon_1.assert.calledWithExactly(ackCallback, null);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('resolves promise for setData deleting values', function () { return __awaiter(_this, void 0, void 0, function () {
                var promise;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            promise = recordHandler.setDataWithAck(name, path, undefined);
                            promise.then(ackResolve).catch(ackReject);
                            handle(eraseAckMsg);
                            return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                        case 1:
                            _a.sent();
                            sinon_1.assert.calledOnce(ackResolve);
                            sinon_1.assert.notCalled(ackReject);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
