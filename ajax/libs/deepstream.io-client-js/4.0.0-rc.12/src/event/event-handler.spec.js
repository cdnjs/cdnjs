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
var chai_1 = require("chai");
var sinon = require("sinon");
var mocks_1 = require("../test/mocks");
var constants_1 = require("../constants");
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var bluebird_1 = require("bluebird");
var client_options_1 = require("../client-options");
var event_handler_1 = require("./event-handler");
describe('event handler', function () {
    var services;
    var listener;
    var eventHandler;
    var handle;
    var spy;
    var name = 'myEvent';
    beforeEach(function () {
        services = mocks_1.getServicesMock();
        listener = mocks_1.getListenerMock();
        eventHandler = new event_handler_1.EventHandler(services, __assign({}, client_options_1.DefaultOptions, { subscriptionInterval: 0 }), listener.listener);
        handle = services.getHandle();
        spy = sinon.spy();
    });
    afterEach(function () {
        services.verify();
        listener.listenerMock.verify();
    });
    it('validates parameters on subscribe, unsubscribe and emit', function () {
        chai_1.expect(eventHandler.subscribe.bind(eventHandler, '', function () { })).to.throw();
        chai_1.expect(eventHandler.unsubscribe.bind(eventHandler, '', function () { })).to.throw();
        chai_1.expect(eventHandler.emit.bind(eventHandler, '', {})).to.throw();
    });
    it('emits an event it has no listeners for', function () {
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.EMIT,
            name: name,
            parsedData: 6
        });
        eventHandler.emit(name, 6);
    });
    it('subscribes to an event', function () {
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
            name: name
        });
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({
            message: {
                topic: message_constants_1.TOPIC.EVENT,
                action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
                name: name
            }
        });
        eventHandler.subscribe(name, spy);
    });
    it('resubscribes to an event when connection reestablished', function () {
        services.connectionMock
            .expects('sendMessage')
            .twice()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
            name: name
        });
        services.timeoutRegistryMock
            .expects('add')
            .twice()
            .withExactArgs({
            message: {
                topic: message_constants_1.TOPIC.EVENT,
                action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
                name: name
            }
        });
        eventHandler.subscribe(name, spy);
        services.simulateConnectionReestablished();
    });
    it('subscribes to an event twice', function () {
        services.connectionMock
            .expects('sendMessage')
            .once();
        services.timeoutRegistryMock
            .expects('add')
            .once();
        eventHandler.subscribe(name, spy);
        eventHandler.subscribe(name, spy);
    });
    it('unsubscribes to an event after subscribing', function () {
        services.connectionMock
            .expects('sendMessage')
            .once();
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE,
            name: name
        });
        services.timeoutRegistryMock
            .expects('add')
            .once();
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({
            message: {
                topic: message_constants_1.TOPIC.EVENT,
                action: message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE,
                name: name
            }
        });
        eventHandler.subscribe(name, spy);
        eventHandler.unsubscribe(name, spy);
    });
    it('unsubscribes to an event after unsubscribing already', function () {
        services.connectionMock
            .expects('sendMessage')
            .once();
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE,
            name: name
        });
        services.timeoutRegistryMock
            .expects('add')
            .once();
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({
            message: {
                topic: message_constants_1.TOPIC.EVENT,
                action: message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE,
                name: name
            }
        });
        services.loggerMock
            .expects('warn')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.NOT_SUBSCRIBED,
            name: name
        });
        eventHandler.subscribe(name, spy);
        eventHandler.unsubscribe(name, spy);
        eventHandler.unsubscribe(name, spy);
    });
    it('notifies local listeners for local events', function () {
        eventHandler.subscribe(name, spy);
        eventHandler.emit(name, 8);
        sinon.assert.calledOnce(spy);
        sinon.assert.calledWithExactly(spy, 8);
    });
    it('notifies local listeners for remote events', function () {
        eventHandler.subscribe(name, spy);
        handle({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.EMIT,
            name: name,
            parsedData: 8
        });
        sinon.assert.calledOnce(spy);
        sinon.assert.calledWithExactly(spy, 8);
    });
    it('removes local listeners', function () {
        eventHandler.subscribe(name, spy);
        eventHandler.unsubscribe(name, spy);
        eventHandler.emit(name, 11);
        sinon.assert.callCount(spy, 0);
    });
    it('notifies local listeners for remote events without data', function () {
        eventHandler.subscribe(name, spy);
        handle({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.EMIT,
            name: name
        });
        sinon.assert.calledOnce(spy);
        sinon.assert.calledWithExactly(spy, undefined);
    });
    it('unsubscribes locally when it recieves a message denied', function () {
        eventHandler.subscribe(name, spy);
        handle({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.MESSAGE_DENIED,
            originalAction: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
            name: name
        });
        eventHandler.emit(name, 11);
        sinon.assert.callCount(spy, 0);
    });
    it('forwards subscribe ack messages', function () {
        services.timeoutRegistryMock
            .expects('remove')
            .once()
            .withExactArgs({
            isAck: true,
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
            name: name
        });
        handle({
            isAck: true,
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
            name: name
        });
    });
    it('forwards unsubscribe ack messages', function () {
        services.timeoutRegistryMock
            .expects('remove')
            .once()
            .withExactArgs({
            isAck: true,
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE,
            name: name
        });
        handle({
            isAck: true,
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE,
            name: name
        });
    });
    it('warns when a not subscribed is remotely recieved', function () {
        services.loggerMock
            .expects('warn')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.NOT_SUBSCRIBED,
            name: name
        });
        handle({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.NOT_SUBSCRIBED,
            name: name
        });
    });
    it('listens for pattern', function () {
        var pattern = '.*';
        var callback = function () { };
        listener.listenerMock
            .expects('listen')
            .once()
            .withExactArgs(pattern, callback);
        eventHandler.listen(pattern, callback);
    });
    it('unlistens a pattern', function () {
        var pattern = '.*';
        listener.listenerMock
            .expects('unlisten')
            .once()
            .withExactArgs(pattern);
        eventHandler.unlisten(pattern);
    });
    it('it forwards listeners\' messages to listeners', function () {
        var subscriptionFoundMsg = {
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND,
            name: '.*',
            subscription: 'subscription'
        };
        var subscriptionRemovedMsg = {
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED,
            name: '.*',
            subscription: 'subscription'
        };
        listener.listenerMock
            .expects('handle')
            .once()
            .withExactArgs(subscriptionFoundMsg);
        listener.listenerMock
            .expects('handle')
            .once()
            .withExactArgs(subscriptionRemovedMsg);
        handle(subscriptionFoundMsg);
        handle(subscriptionRemovedMsg);
    });
    it('logs an error event for unsolicited event messages', function () {
        services.loggerMock
            .expects('error')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: -1
        }, constants_1.EVENT.UNSOLICITED_MESSAGE);
        handle({
            topic: message_constants_1.TOPIC.EVENT,
            action: -1
        });
    });
    describe('limbo', function () {
        beforeEach(function () {
            services.connection.isConnected = false;
            services.connection.isInLimbo = true;
        });
        it('sends messages once re-established if in limbo', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventHandler.emit(name, 6);
                        services.connectionMock
                            .expects('sendMessage')
                            .once()
                            .withExactArgs({ topic: message_constants_1.TOPIC.EVENT, action: message_constants_1.EVENT_ACTIONS.EMIT, parsedData: 6, name: name });
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
