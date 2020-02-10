"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const constants_1 = require("../src/constants");
const timer_registry_1 = require("../src/util/timer-registry");
const single_notifier_1 = require("../src/record/single-notifier");
const write_ack_service_1 = require("../src/record/write-ack-service");
let lastMessageSent;
exports.getLastMessageSent = () => lastMessageSent;
exports.getServicesMock = () => {
    let handle = null;
    let onReestablished;
    let onLost;
    const connection = {
        sendMessage: (message) => { lastMessageSent = message; },
        getConnectionState: sinon_1.stub().returns(constants_1.CONNECTION_STATE.OPEN),
        isConnected: true,
        registerHandler: (topic, callback) => {
            handle = callback;
        },
        onReestablished: (callback) => {
            onReestablished = callback;
        },
        onLost: (callback) => {
            onLost = callback;
        }
    };
    const connectionMock = sinon_1.mock(connection);
    const timeoutRegistry = {
        add: () => { },
        remove: () => { },
        clear: () => { }
    };
    const timeoutRegistryMock = sinon_1.mock(timeoutRegistry);
    const logger = {
        warn: () => { },
        error: () => { }
    };
    const loggerMock = sinon_1.mock(logger);
    loggerMock.expects('warn').never();
    // loggerMock.expects('error').never()
    const timerRegistry = new timer_registry_1.TimerRegistry();
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
exports.getListenerMock = () => {
    const listener = {
        listen: () => { },
        unlisten: () => { },
        handle: () => { }
    };
    const listenerMock = sinon_1.mock(listener);
    return {
        listener,
        listenerMock
    };
};
exports.getSingleNotifierMock = () => {
    const singleNotifier = single_notifier_1.SingleNotifier.prototype;
    const singleNotifierMock = sinon_1.mock(singleNotifier);
    return {
        singleNotifier,
        singleNotifierMock
    };
};
exports.getWriteAckNotifierMock = () => {
    const writeAckNotifier = write_ack_service_1.WriteAcknowledgementService.prototype;
    const writeAckNotifierMock = sinon_1.mock(writeAckNotifier);
    return {
        writeAckNotifier,
        writeAckNotifierMock
    };
};
//# sourceMappingURL=mocks.js.map