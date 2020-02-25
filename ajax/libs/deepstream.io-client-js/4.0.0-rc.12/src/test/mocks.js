"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-empty
var sinon_1 = require("sinon");
var constants_1 = require("../constants");
var timer_registry_1 = require("../util/timer-registry");
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var single_notifier_1 = require("../record/single-notifier");
var write_ack_service_1 = require("../record/write-ack-service");
var dirty_service_1 = require("../record/dirty-service");
var listener_1 = require("../util/listener");
var bulk_subscription_service_1 = require("../util/bulk-subscription-service");
var lastMessageSent;
exports.getLastMessageSent = function () { return lastMessageSent; };
exports.getServicesMock = function () {
    var handle = null;
    var onReestablished;
    var onLost;
    var onExitLimbo;
    var connection = {
        sendMessage: function (message) { lastMessageSent = message; },
        getConnectionState: sinon_1.stub().returns(constants_1.CONNECTION_STATE.OPEN),
        isConnected: true,
        isInLimbo: false,
        registerHandler: function (topic, callback) {
            handle = callback;
        },
        onReestablished: function (callback) {
            onReestablished = callback;
        },
        onLost: function (callback) {
            onLost = callback;
        },
        onExitLimbo: function (callback) {
            onExitLimbo = callback;
        },
        removeOnReestablished: function () { },
        removeOnLost: function () { }
    };
    var connectionMock = sinon_1.mock(connection);
    var logger = {
        warn: function () { },
        error: function () { }
    };
    var loggerMock = sinon_1.mock(logger);
    loggerMock.expects('warn').never();
    // loggerMock.expects('error').never()
    var timerRegistry = new timer_registry_1.TimerRegistry(1);
    var timeoutRegistry = {
        add: function () { },
        remove: function () { },
        clear: function () { }
    };
    var timeoutRegistryMock = sinon_1.mock(timeoutRegistry);
    // TODO: Use a real timeout registry to catch potential errors
    // const timeoutRegistry = new TimeoutRegistry({
    //   timerRegistry,
    //   logger,
    //   connection
    // } as any, { subscriptionTimeout: 20 } as any)
    // const timeoutRegistryMock = mock(timeoutRegistry)
    // tslint:disable-next-line
    var Socket = /** @class */ (function () {
        function Socket(url) {
            this.url = url;
        }
        Socket.prototype.sendParsedMessage = function (message) { };
        Socket.prototype.onparsedmessages = function (message) { };
        Socket.prototype.onopen = function () { };
        Socket.prototype.onerror = function () { };
        Socket.prototype.onclose = function () { };
        Socket.prototype.close = function () {
            process.nextTick(this.onclose);
        };
        Socket.prototype.simulateRemoteClose = function () {
            this.close();
        };
        Socket.prototype.simulateOpen = function () {
            process.nextTick(this.onopen);
        };
        Socket.prototype.simulateError = function () {
            process.nextTick(this.onerror.bind(null, { code: 1234 }));
        };
        Socket.prototype.simulateMessages = function (messages) {
            process.nextTick(this.onparsedmessages.bind(this, messages));
        };
        Socket.prototype.getTimeSinceLastMessage = function () {
            return 1;
        };
        return Socket;
    }());
    var socket;
    var socketFactory = function (url, options) {
        socket = new Socket(url);
        return socket;
    };
    var storage = {
        get: function () { },
        set: function () { },
        delete: function () { }
    };
    var storageMock = sinon_1.mock(storage);
    return {
        socketFactory: socketFactory,
        getSocket: function () { return ({ socket: socket, socketMock: sinon_1.mock(socket) }); },
        connection: connection,
        connectionMock: connectionMock,
        timeoutRegistry: timeoutRegistry,
        timeoutRegistryMock: timeoutRegistryMock,
        logger: logger,
        loggerMock: loggerMock,
        getLogger: function () { return ({ logger: logger, loggerMock: loggerMock }); },
        timerRegistry: timerRegistry,
        getHandle: function () { return handle; },
        simulateConnectionLost: function () { return onLost(); },
        simulateConnectionReestablished: function () { return onReestablished(); },
        simulateExitLimbo: function () { return onExitLimbo(); },
        storage: storage,
        storageMock: storageMock,
        verify: function () {
            connectionMock.verify();
            timeoutRegistryMock.verify();
            loggerMock.verify();
            storageMock.verify();
        }
    };
};
exports.getRecordServices = function (services) {
    var _a;
    services.storageMock.expects('get').withArgs('__ds__dirty_records', sinon_1.match.func).atLeast(0).callsArgWith(1, '__ds__dirty_records', 1, []);
    services.storageMock.expects('set').withArgs('__ds__dirty_records', 1, sinon_1.match.any, sinon_1.match.func).atLeast(0);
    var dirtyService = new dirty_service_1.DirtyService(services.storage, '__ds__dirty_records');
    var headRegistry = new single_notifier_1.SingleNotifier(services, message_constants_1.RECORD_ACTIONS.HEAD, 50);
    var readRegistry = new single_notifier_1.SingleNotifier(services, message_constants_1.RECORD_ACTIONS.READ, 50);
    var writeAckService = new write_ack_service_1.WriteAcknowledgementService(services);
    var bulkSubscriptionService = (_a = {},
        _a[message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD_BULK] = new bulk_subscription_service_1.BulkSubscriptionService(services, 0, message_constants_1.TOPIC.RECORD, message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD_BULK, message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD, message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE_BULK, message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE),
        _a[message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD_BULK] = new bulk_subscription_service_1.BulkSubscriptionService(services, 0, message_constants_1.TOPIC.RECORD, message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD_BULK, message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD, message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE_BULK, message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE),
        _a[message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD_BULK] = new bulk_subscription_service_1.BulkSubscriptionService(services, 0, message_constants_1.TOPIC.RECORD, message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD_BULK, message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD, message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE_BULK, message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE),
        _a);
    var dirtyServiceMock = sinon_1.mock(dirtyService);
    var readRegistryMock = sinon_1.mock(readRegistry);
    var headRegistryMock = sinon_1.mock(headRegistry);
    var writeAckServiceMock = sinon_1.mock(writeAckService);
    return {
        dirtyService: dirtyService,
        dirtyServiceMock: dirtyServiceMock,
        headRegistry: headRegistry,
        headRegistryMock: headRegistryMock,
        readRegistry: readRegistry,
        readRegistryMock: readRegistryMock,
        writeAckService: writeAckService,
        writeAckServiceMock: writeAckServiceMock,
        bulkSubscriptionService: bulkSubscriptionService,
        verify: function () {
            dirtyServiceMock.verify();
            headRegistryMock.verify();
            readRegistryMock.verify();
            writeAckServiceMock.verify();
        }
    };
};
exports.getListenerMock = function () {
    var listener = listener_1.Listener.prototype;
    var listenerMock = sinon_1.mock(listener);
    return {
        listener: listener,
        listenerMock: listenerMock
    };
};
