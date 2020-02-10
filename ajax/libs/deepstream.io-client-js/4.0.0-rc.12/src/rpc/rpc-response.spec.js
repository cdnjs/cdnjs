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
var chai_1 = require("chai");
var mocks_1 = require("../test/mocks");
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var client_options_1 = require("../client-options");
var rpc_response_1 = require("./rpc-response");
var bluebird_1 = require("bluebird");
describe('RPC response', function () {
    var services;
    var rpcResponse;
    var name = 'myRPC';
    var correlationId = 'correlationId';
    beforeEach(function () {
        services = mocks_1.getServicesMock();
        rpcResponse = new rpc_response_1.RPCResponse({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.REQUEST,
            name: name,
            correlationId: correlationId
        }, client_options_1.DefaultOptions, services);
        rpcResponse.autoAccept = false;
    });
    afterEach(function () {
        services.connectionMock.verify();
    });
    it('doesn\'t accept automatically when autoAccept == false', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    services.connectionMock
                        .expects('sendMessage')
                        .never();
                    return [4 /*yield*/, bluebird_1.Promise.delay(2)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sends an accept message automatically when autoAccept == true ', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    services.connectionMock
                        .expects('sendMessage')
                        .once()
                        .withExactArgs({
                        topic: message_constants_1.TOPIC.RPC,
                        action: message_constants_1.RPC_ACTIONS.ACCEPT,
                        name: name,
                        correlationId: correlationId
                    });
                    rpcResponse.autoAccept = true;
                    return [4 /*yield*/, bluebird_1.Promise.delay(2)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sends an accept message manually', function () {
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.ACCEPT,
            name: name,
            correlationId: correlationId
        });
        rpcResponse.accept();
    });
    it('sends the response message but accepts the rpc before when it is not accepted yet', function () {
        var data = { foo: 'bar' };
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.ACCEPT,
            name: name,
            correlationId: correlationId
        });
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.RESPONSE,
            name: name,
            correlationId: correlationId,
            parsedData: data
        });
        rpcResponse.send(data);
    });
    it('throws when trying to send a completed response', function () {
        var data = { foo: 'bar' };
        /**
         * 1st call: accept message
         * 2nd call: response message
         */
        services.connectionMock
            .expects('sendMessage')
            .twice();
        rpcResponse.send(data);
        chai_1.expect(rpcResponse.send.bind(rpcResponse, data)).to.throw("Rpc " + name + " already completed");
    });
    it('doesn\'t send multiple accept messages', function () {
        services.connectionMock
            .expects('sendMessage')
            .once();
        rpcResponse.accept();
        rpcResponse.accept();
    });
    it('sends reject message', function () {
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.REJECT,
            name: name,
            correlationId: correlationId
        });
        rpcResponse.reject();
    });
    it('doesn\'t send reject message twice and throws error', function () {
        services.connectionMock
            .expects('sendMessage')
            .once();
        rpcResponse.reject();
        chai_1.expect(rpcResponse.reject.bind(rpcResponse)).to.throw("Rpc " + name + " already completed");
    });
    it('sends error message', function () {
        var error = 'error';
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.REQUEST_ERROR,
            name: name,
            correlationId: correlationId,
            parsedData: error
        });
        rpcResponse.error(error);
    });
    it('doesn\'t send error message twice and throws error', function () {
        var error = 'error';
        services.connectionMock
            .expects('sendMessage')
            .once();
        rpcResponse.error(error);
        chai_1.expect(rpcResponse.error.bind(rpcResponse, error)).to.throw("Rpc " + name + " already completed");
    });
});
