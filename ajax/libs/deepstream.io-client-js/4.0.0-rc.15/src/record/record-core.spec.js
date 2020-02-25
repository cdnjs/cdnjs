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
// tslint:disabke:no-unused-expression
var BBPromise = require("bluebird");
var chai_1 = require("chai");
var mocks_1 = require("../test/mocks");
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var client_options_1 = require("../client-options");
var record_core_1 = require("./record-core");
var sinon_1 = require("sinon");
var constants_1 = require("../constants");
describe('record core', function () {
    describe('online scenario, not individual tests', function () {
        var whenCompleted;
        var recordCore;
        var options;
        var services;
        var recordServices;
        var context = {};
        beforeEach(function () {
            whenCompleted = sinon_1.spy();
            services = mocks_1.getServicesMock();
            recordServices = mocks_1.getRecordServices(services);
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD,
                name: name
            });
            services.storageMock
                .expects('get')
                .once()
                .callsArgWith(1, name, -1, null);
            options = __assign({}, client_options_1.DefaultOptions, { discardTimeout: 20, recordReadTimeout: 20, subscriptionInterval: -1 });
            services.connection.isConnected = true;
            recordCore = new record_core_1.RecordCore(name, services, options, recordServices, whenCompleted);
            recordCore.addReference(this);
        });
        afterEach(function () {
            services.verify();
        });
        it('doesn`t send updates before ready', function () {
            services.connectionMock
                .expects('sendMessage')
                .never();
            recordCore.set({ data: { firstname: 'Wolfram' } });
        });
        it('doesn`t send patches before ready', function () {
            services.connectionMock
                .expects('sendMessage')
                .never();
            recordCore.set({ path: 'firstname', data: 'Wolfram' });
        });
        it('triggers ready callback on read response', function () {
            var readySpy = sinon_1.spy();
            recordCore.whenReady(context, readySpy);
            recordServices.readRegistry.recieve(READ_RESPONSE);
            sinon_1.assert.calledOnce(readySpy);
            sinon_1.assert.calledWithExactly(readySpy, context);
        });
        it('triggers ready promise on read response', function () { return __awaiter(_this, void 0, void 0, function () {
            var readyContext, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        readyContext = null;
                        promise = recordCore.whenReady(context);
                        promise.then(function (result) { return readyContext = result; });
                        recordServices.readRegistry.recieve(READ_RESPONSE);
                        return [4 /*yield*/, BBPromise.delay(0)];
                    case 1:
                        _a.sent();
                        chai_1.expect(readyContext).to.equal(context);
                        return [2 /*return*/];
                }
            });
        }); });
        it('sends update messages for updates after when ready', function () {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.UPDATE,
                name: name,
                parsedData: { firstname: 'Bob' },
                version: 2
            });
            recordCore.set({ data: { firstname: 'Bob' } });
        });
        it('sends patch messages for path changes after when ready', function () {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.PATCH,
                name: name,
                path: 'firstname',
                parsedData: 'Bob',
                version: 2
            });
            recordCore.set({ path: 'firstname', data: 'Bob' });
        });
        it('sends update messages for updates write ack after when ready', function () {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.UPDATE_WITH_WRITE_ACK,
                name: name,
                parsedData: { firstname: 'Bob' },
                correlationId: '1',
                version: 2
            });
            recordCore.set({ data: { firstname: 'Bob' }, callback: function () { } });
        });
        it('sends patch messages for path changes after when ready', function () {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.PATCH_WITH_WRITE_ACK,
                name: name,
                path: 'firstname',
                parsedData: 'Bob',
                correlationId: '1',
                version: 2
            });
            recordCore.set({ path: 'firstname', data: 'Bob', callback: function () { } });
        });
        it('sends erase messages for erase after when ready', function () {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.ERASE,
                name: name,
                path: 'firstname',
                version: 2
            });
            recordCore.set({ path: 'firstname' });
        });
        it('sends erase write ack messages for erase after when ready', function () {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.ERASE_WITH_WRITE_ACK,
                name: name,
                path: 'firstname',
                correlationId: '1',
                version: 2
            });
            recordCore.set({ path: 'firstname', callback: function () { } });
        });
        it('queues discarding record when no longer needed', function () {
            recordServices.readRegistry.recieve(READ_RESPONSE);
            recordCore.removeReference(this);
            chai_1.expect(recordCore.recordState).to.equal("UNSUBSCRIBING" /* UNSUBSCRIBING */);
            chai_1.expect(recordCore.isReady).to.equal(true);
        });
        it('removes pending discard when usages increases', function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            recordServices.readRegistry.recieve(READ_RESPONSE);
                            recordCore.removeReference(this);
                            recordCore.addReference({});
                            return [4 /*yield*/, BBPromise.delay(30)];
                        case 1:
                            _a.sent();
                            chai_1.expect(recordCore.recordState).to.equal("READY" /* READY */);
                            chai_1.expect(recordCore.isReady).to.equal(true);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('sends discard when unsubscribe timeout completed', function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            recordServices.readRegistry.recieve(READ_RESPONSE);
                            recordCore.removeReference(this);
                            services.connectionMock
                                .expects('sendMessage')
                                .once()
                                .withExactArgs({
                                topic: message_constants_1.TOPIC.RECORD,
                                action: message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE,
                                name: name
                            });
                            return [4 /*yield*/, BBPromise.delay(30)];
                        case 1:
                            _a.sent();
                            chai_1.expect(recordCore.recordState).to.equal("UNSUBSCRIBED" /* UNSUBSCRIBED */);
                            sinon_1.assert.calledOnce(whenCompleted);
                            sinon_1.assert.calledWithExactly(whenCompleted, name);
                            chai_1.expect(recordCore.isReady).to.equal(false);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('sends delete when ready', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                recordServices.readRegistry.recieve(READ_RESPONSE);
                services.connectionMock
                    .expects('sendMessage')
                    .once()
                    .withExactArgs({
                    topic: message_constants_1.TOPIC.RECORD,
                    action: message_constants_1.RECORD_ACTIONS.DELETE,
                    name: name
                });
                recordCore.delete();
                chai_1.expect(recordCore.recordState).to.equal("DELETING" /* DELETING */);
                sinon_1.assert.notCalled(whenCompleted);
                chai_1.expect(recordCore.isReady).to.equal(true);
                return [2 /*return*/];
            });
        }); });
        it('calls delete when delete is confirmed', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                recordServices.readRegistry.recieve(READ_RESPONSE);
                services.connectionMock
                    .expects('sendMessage')
                    .once();
                recordCore.delete();
                recordCore.handle({
                    topic: message_constants_1.TOPIC.RECORD,
                    action: message_constants_1.RECORD_ACTIONS.DELETE_SUCCESS,
                    name: name
                });
                chai_1.expect(recordCore.recordState).to.equal("DELETED" /* DELETED */);
                sinon_1.assert.calledOnce(whenCompleted);
                sinon_1.assert.calledWithExactly(whenCompleted, name);
                // tslint:disable-next-line:no-unused-expression
                chai_1.expect(recordCore.isReady).to.equal(false);
                return [2 /*return*/];
            });
        }); });
        it('calls delete when delete happens remotely', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                recordServices.readRegistry.recieve(READ_RESPONSE);
                recordCore.handle({
                    topic: message_constants_1.TOPIC.RECORD,
                    action: message_constants_1.RECORD_ACTIONS.DELETED,
                    name: name
                });
                chai_1.expect(recordCore.recordState).to.equal("DELETED" /* DELETED */);
                sinon_1.assert.calledOnce(whenCompleted);
                sinon_1.assert.calledWithExactly(whenCompleted, name);
                // tslint:disable-next-line:no-unused-expression
                chai_1.expect(recordCore.isReady).to.equal(false);
                return [2 /*return*/];
            });
        }); });
    });
    describe('record core offline', function () {
        var whenCompleted;
        var recordCore;
        var options;
        var services;
        var recordServices;
        beforeEach(function () {
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
        afterEach(function () {
            services.verify();
            recordServices.verify();
        });
        it('triggers ready callback on load', function () {
            var context = {};
            var readySpy = sinon_1.spy();
            recordCore.whenReady(context, readySpy);
            sinon_1.assert.calledOnce(readySpy);
            sinon_1.assert.calledWithExactly(readySpy, context);
        });
        it('sets update messages for updates after when ready', function () {
            services.storageMock
                .expects('set')
                .once()
                .withExactArgs(name, 2, { firstname: 'Bob' }, sinon_1.match.func);
            recordCore.set({ data: { firstname: 'Bob' } });
        });
        it('sends patch messages for path changes after when ready', function () {
            services.storageMock
                .expects('set')
                .once()
                .withExactArgs(name, 2, { firstname: 'Bob' }, sinon_1.match.func);
            recordCore.set({ path: 'firstname', data: 'Bob' });
        });
        it('responds to update write acks with an offline error', function () { return __awaiter(_this, void 0, void 0, function () {
            var ackCallback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ackCallback = sinon_1.spy();
                        services.storageMock
                            .expects('set')
                            .once()
                            .withExactArgs(name, 2, { firstname: 'Bob' }, sinon_1.match.func);
                        recordCore.set({ data: { firstname: 'Bob' }, callback: ackCallback });
                        return [4 /*yield*/, BBPromise.delay(0)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(ackCallback);
                        sinon_1.assert.calledWithExactly(ackCallback, constants_1.EVENT.CLIENT_OFFLINE, name);
                        return [2 /*return*/];
                }
            });
        }); });
        it('sends patch messages for path changes after when ready', function () { return __awaiter(_this, void 0, void 0, function () {
            var ackCallback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ackCallback = sinon_1.spy();
                        services.storageMock
                            .expects('set')
                            .once()
                            .withExactArgs(name, 2, { firstname: 'Bob' }, sinon_1.match.func);
                        recordCore.set({ path: 'firstname', data: 'Bob', callback: ackCallback });
                        return [4 /*yield*/, BBPromise.delay(0)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(ackCallback);
                        sinon_1.assert.calledWithExactly(ackCallback, constants_1.EVENT.CLIENT_OFFLINE, name);
                        return [2 /*return*/];
                }
            });
        }); });
        it('sends erase messages for erase after when ready', function () {
            services.storageMock
                .expects('set')
                .once()
                .withExactArgs(name, 2, {}, sinon_1.match.func);
            recordCore.set({ path: 'firstname' });
        });
        it('sends erase write ack messages for erase after when ready', function () { return __awaiter(_this, void 0, void 0, function () {
            var ackCallback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ackCallback = sinon_1.spy();
                        services.storageMock
                            .expects('set')
                            .once()
                            .withExactArgs(name, 2, {}, sinon_1.match.func);
                        recordCore.set({ path: 'firstname', callback: ackCallback });
                        return [4 /*yield*/, BBPromise.delay(0)];
                    case 1:
                        _a.sent();
                        sinon_1.assert.calledOnce(ackCallback);
                        sinon_1.assert.calledWithExactly(ackCallback, constants_1.EVENT.CLIENT_OFFLINE, name);
                        return [2 /*return*/];
                }
            });
        }); });
        it('queues discarding record when no longer needed', function () {
            recordCore.removeReference(this);
            chai_1.expect(recordCore.recordState).to.equal("UNSUBSCRIBING" /* UNSUBSCRIBING */);
            chai_1.expect(recordCore.isReady).to.equal(true);
        });
        it('removes pending discard when usages increases', function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            recordCore.removeReference(this);
                            recordCore.addReference({});
                            return [4 /*yield*/, BBPromise.delay(30)];
                        case 1:
                            _a.sent();
                            chai_1.expect(recordCore.recordState).to.equal("READY" /* READY */);
                            chai_1.expect(recordCore.isReady).to.equal(true);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('removes record when completed', function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            recordCore.removeReference(this);
                            return [4 /*yield*/, BBPromise.delay(40)];
                        case 1:
                            _a.sent();
                            chai_1.expect(recordCore.recordState).to.equal("UNSUBSCRIBED" /* UNSUBSCRIBED */);
                            sinon_1.assert.calledOnce(whenCompleted);
                            sinon_1.assert.calledWithExactly(whenCompleted, name);
                            chai_1.expect(recordCore.isReady).to.equal(false);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it.skip('sends delete when ready', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                services.storageMock
                    .expects('delete')
                    .once()
                    .withExactArgs(name, sinon_1.match.func);
                recordCore.delete();
                chai_1.expect(recordCore.recordState).to.equal("DELETING" /* DELETING */);
                sinon_1.assert.notCalled(whenCompleted);
                chai_1.expect(recordCore.isReady).to.equal(true);
                return [2 /*return*/];
            });
        }); });
        it.skip('calls delete when delete is confirmed', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        services.storageMock
                            .expects('delete')
                            .once()
                            .withExactArgs(name, sinon_1.match.func)
                            .callsArgWith(1, name);
                        recordCore.delete();
                        return [4 /*yield*/, BBPromise.delay(0)
                            // deleted
                        ];
                    case 1:
                        _a.sent();
                        // deleted
                        chai_1.expect(recordCore.recordState).to.equal("DELETED" /* DELETED */);
                        sinon_1.assert.calledOnce(whenCompleted);
                        sinon_1.assert.calledWithExactly(whenCompleted, name);
                        chai_1.expect(recordCore.isReady).to.equal(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var name = 'recordA';
var READ_RESPONSE = {
    topic: message_constants_1.TOPIC.RECORD,
    action: message_constants_1.RECORD_ACTIONS.READ_RESPONSE,
    name: name,
    parsedData: {},
    version: 1
};
