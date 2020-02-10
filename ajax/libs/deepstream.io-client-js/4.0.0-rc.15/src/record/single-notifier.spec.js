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
var sinon_1 = require("sinon");
var mocks_1 = require("../test/mocks");
var constants_1 = require("../constants");
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var single_notifier_1 = require("./single-notifier");
describe('Single Notifier', function () {
    var timeout = 10;
    var action = message_constants_1.RECORD_ACTIONS.READ;
    var name = 'name';
    var topic = message_constants_1.TOPIC.RECORD;
    var services;
    var singleNotifier;
    var callbackSpy;
    beforeEach(function () {
        services = mocks_1.getServicesMock();
        singleNotifier = new single_notifier_1.SingleNotifier(services, action, timeout);
        callbackSpy = sinon_1.spy();
    });
    afterEach(function () {
        services.verify();
    });
    it('requests with correct topic and action', function () {
        var message = {
            topic: topic,
            action: action,
            name: name
        };
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(message);
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({ message: message });
        singleNotifier.request(name, callbackSpy);
    });
    it('doesn\'t send message twice and updates the timeout when requesting twice', function () {
        var message = {
            topic: topic,
            action: action,
            name: name
        };
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(message);
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({ message: message });
        singleNotifier.request(name, callbackSpy);
        singleNotifier.request(name, callbackSpy);
    });
    it('cant\'t query request when client is offline', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    services.connection.isConnected = false;
                    singleNotifier.request(name, callbackSpy);
                    return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                case 1:
                    _a.sent();
                    sinon_1.assert.calledOnce(callbackSpy);
                    sinon_1.assert.calledWithExactly(callbackSpy, constants_1.EVENT.CLIENT_OFFLINE);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('requesting', function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            beforeEach(function () {
                singleNotifier.request(name, callbackSpy);
            });
            it('doesn\'t respond unknown requests', function () { return __awaiter(_this, void 0, void 0, function () {
                var message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            message = {
                                topic: topic,
                                action: message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED,
                                name: 'something',
                                isError: true
                            };
                            singleNotifier.recieve(message, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED], undefined);
                            sinon_1.assert.notCalled(callbackSpy);
                            return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('responds callback and promise requests with success response', function () { return __awaiter(_this, void 0, void 0, function () {
                var parsedData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parsedData = { some: 'data' };
                            singleNotifier.recieve({
                                topic: topic,
                                action: action,
                                name: name,
                                isError: false,
                                parsedData: parsedData
                            }, undefined, parsedData);
                            sinon_1.assert.calledOnce(callbackSpy);
                            sinon_1.assert.calledWithExactly(callbackSpy, undefined, parsedData);
                            return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('responds callback and promise requests with error response', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            singleNotifier.recieve({
                                topic: topic,
                                action: message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED,
                                name: name,
                                isError: true
                            }, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED], undefined);
                            sinon_1.assert.calledOnce(callbackSpy);
                            sinon_1.assert.calledWithExactly(callbackSpy, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED], undefined);
                            return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('responds with error on connection lost', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            services.simulateConnectionLost();
                            return [4 /*yield*/, bluebird_1.Promise.delay(1)];
                        case 1:
                            _a.sent();
                            sinon_1.assert.calledOnce(callbackSpy);
                            sinon_1.assert.calledWithExactly(callbackSpy, constants_1.EVENT.CLIENT_OFFLINE);
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
});
