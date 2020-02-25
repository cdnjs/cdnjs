"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-empty
const sinon_1 = require("sinon");
const constants_1 = require("../constants");
const timer_registry_1 = require("../util/timer-registry");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const single_notifier_1 = require("../record/single-notifier");
const write_ack_service_1 = require("../record/write-ack-service");
const dirty_service_1 = require("../record/dirty-service");
const listener_1 = require("../util/listener");
const bulk_subscription_service_1 = require("../util/bulk-subscription-service");
let lastMessageSent;
exports.getLastMessageSent = () => lastMessageSent;
exports.getServicesMock = () => {
    let handle = null;
    let onReestablished;
    let onLost;
    let onExitLimbo;
    const connection = {
        sendMessage: (message) => { lastMessageSent = message; },
        getConnectionState: sinon_1.stub().returns(constants_1.CONNECTION_STATE.OPEN),
        isConnected: true,
        isInLimbo: false,
        registerHandler: (topic, callback) => {
            handle = callback;
        },
        onReestablished: (callback) => {
            onReestablished = callback;
        },
        onLost: (callback) => {
            onLost = callback;
        },
        onExitLimbo: (callback) => {
            onExitLimbo = callback;
        },
        removeOnReestablished: () => { },
        removeOnLost: () => { }
    };
    const connectionMock = sinon_1.mock(connection);
    const logger = {
        warn: () => { },
        error: () => { }
    };
    const loggerMock = sinon_1.mock(logger);
    loggerMock.expects('warn').never();
    // loggerMock.expects('error').never()
    const timerRegistry = new timer_registry_1.TimerRegistry(1);
    const timeoutRegistry = {
        add: () => { },
        remove: () => { },
        clear: () => { }
    };
    const timeoutRegistryMock = sinon_1.mock(timeoutRegistry);
    // TODO: Use a real timeout registry to catch potential errors
    // const timeoutRegistry = new TimeoutRegistry({
    //   timerRegistry,
    //   logger,
    //   connection
    // } as any, { subscriptionTimeout: 20 } as any)
    // const timeoutRegistryMock = mock(timeoutRegistry)
    // tslint:disable-next-line
    class Socket {
        constructor(url) {
            this.url = url;
        }
        sendParsedMessage(message) { }
        onparsedmessages(message) { }
        onopen() { }
        onerror() { }
        onclose() { }
        close() {
            process.nextTick(this.onclose);
        }
        simulateRemoteClose() {
            this.close();
        }
        simulateOpen() {
            process.nextTick(this.onopen);
        }
        simulateError() {
            process.nextTick(this.onerror.bind(null, { code: 1234 }));
        }
        simulateMessages(messages) {
            process.nextTick(this.onparsedmessages.bind(this, messages));
        }
        getTimeSinceLastMessage() {
            return 1;
        }
    }
    let socket;
    const socketFactory = (url, options) => {
        socket = new Socket(url);
        return socket;
    };
    const storage = {
        get: () => { },
        set: () => { },
        delete: () => { }
    };
    const storageMock = sinon_1.mock(storage);
    return {
        socketFactory,
        getSocket: () => ({ socket, socketMock: sinon_1.mock(socket) }),
        connection,
        connectionMock,
        timeoutRegistry,
        timeoutRegistryMock,
        logger,
        loggerMock,
        getLogger: () => ({ logger, loggerMock }),
        timerRegistry,
        getHandle: () => handle,
        simulateConnectionLost: () => onLost(),
        simulateConnectionReestablished: () => onReestablished(),
        simulateExitLimbo: () => onExitLimbo(),
        storage,
        storageMock,
        verify: () => {
            connectionMock.verify();
            timeoutRegistryMock.verify();
            loggerMock.verify();
            storageMock.verify();
        }
    };
};
exports.getRecordServices = (services) => {
    services.storageMock.expects('get').withArgs('__ds__dirty_records', sinon_1.match.func).atLeast(0).callsArgWith(1, '__ds__dirty_records', 1, []);
    services.storageMock.expects('set').withArgs('__ds__dirty_records', 1, sinon_1.match.any, sinon_1.match.func).atLeast(0);
    const dirtyService = new dirty_service_1.DirtyService(services.storage, '__ds__dirty_records');
    const headRegistry = new single_notifier_1.SingleNotifier(services, message_constants_1.RECORD_ACTIONS.HEAD, 50);
    const readRegistry = new single_notifier_1.SingleNotifier(services, message_constants_1.RECORD_ACTIONS.READ, 50);
    const writeAckService = new write_ack_service_1.WriteAcknowledgementService(services);
    const bulkSubscriptionService = {
        [message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD_BULK]: new bulk_subscription_service_1.BulkSubscriptionService(services, 0, message_constants_1.TOPIC.RECORD, message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD_BULK, message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD, message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE_BULK, message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE),
        [message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD_BULK]: new bulk_subscription_service_1.BulkSubscriptionService(services, 0, message_constants_1.TOPIC.RECORD, message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD_BULK, message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD, message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE_BULK, message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE),
        [message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD_BULK]: new bulk_subscription_service_1.BulkSubscriptionService(services, 0, message_constants_1.TOPIC.RECORD, message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD_BULK, message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD, message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE_BULK, message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE)
    };
    const dirtyServiceMock = sinon_1.mock(dirtyService);
    const readRegistryMock = sinon_1.mock(readRegistry);
    const headRegistryMock = sinon_1.mock(headRegistry);
    const writeAckServiceMock = sinon_1.mock(writeAckService);
    return {
        dirtyService,
        dirtyServiceMock,
        headRegistry,
        headRegistryMock,
        readRegistry,
        readRegistryMock,
        writeAckService,
        writeAckServiceMock,
        bulkSubscriptionService,
        verify: () => {
            dirtyServiceMock.verify();
            headRegistryMock.verify();
            readRegistryMock.verify();
            writeAckServiceMock.verify();
        }
    };
};
exports.getListenerMock = () => {
    const listener = listener_1.Listener.prototype;
    const listenerMock = sinon_1.mock(listener);
    return {
        listener,
        listenerMock
    };
};
//# sourceMappingURL=mocks.js.map