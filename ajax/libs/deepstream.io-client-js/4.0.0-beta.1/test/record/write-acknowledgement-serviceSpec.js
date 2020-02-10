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
const sinon_1 = require("sinon");
const mocks_1 = require("../mocks");
const constants_1 = require("../../src/constants");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const write_ack_service_1 = require("../../src/record/write-ack-service");
describe('Write Ack Notifier', () => {
    const topic = message_constants_1.TOPIC.RECORD;
    const action = message_constants_1.RECORD_ACTIONS.CREATEANDPATCH;
    const ackAction = message_constants_1.RECORD_ACTIONS.CREATEANDPATCH_WITH_WRITE_ACK;
    const name = 'record';
    let services;
    let writeAckService;
    let callbackSpy;
    beforeEach(() => {
        services = mocks_1.getServicesMock();
        writeAckService = new write_ack_service_1.WriteAcknowledgementService(services);
        callbackSpy = sinon_1.spy();
    });
    afterEach(() => {
        services.verify();
    });
    it('cant\'t send request when client is offline', () => __awaiter(this, void 0, void 0, function* () {
        services.connection.isConnected = false;
        services.connectionMock
            .expects('sendMessage')
            .never();
        writeAckService.send({
            topic,
            action,
            name
        }, callbackSpy);
        yield bluebird_1.Promise.delay(1);
        sinon_1.assert.calledOnce(callbackSpy);
        sinon_1.assert.calledWithExactly(callbackSpy, constants_1.EVENT.CLIENT_OFFLINE);
    }));
    it('calls callbacks with error message when connection is lost', () => __awaiter(this, void 0, void 0, function* () {
        const messageBody = {
            topic,
            action,
            name
        };
        writeAckService.send(messageBody, callbackSpy);
        writeAckService.send(messageBody, callbackSpy);
        services.simulateConnectionLost();
        yield bluebird_1.Promise.delay(1);
        sinon_1.assert.calledTwice(callbackSpy);
        sinon_1.assert.calledWithExactly(callbackSpy, constants_1.EVENT.CLIENT_OFFLINE);
    }));
    it('sends correct messages with different correlationsId for each call', () => {
        const messageBody = {
            topic,
            action,
            name,
        };
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(Object.assign({}, messageBody, { action: ackAction, correlationId: '1' }));
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(Object.assign({}, messageBody, { action: ackAction, correlationId: '2' }));
        writeAckService.send(messageBody, () => { });
        writeAckService.send(messageBody, () => { });
    });
    describe('receiving', () => {
        const correlationId = '1';
        let message;
        beforeEach(() => {
            message = {
                topic,
                action,
                name
            };
            writeAckService.send(Object.assign({}, message), callbackSpy);
        });
        it('logs error for unknown acknowledgements', () => __awaiter(this, void 0, void 0, function* () {
            const msg = {
                topic,
                action,
                name,
                correlationId: '123'
            };
            const processed = writeAckService.recieve(msg);
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.notCalled(callbackSpy);
        }));
        it('calls ack callback when server sends ack message', () => __awaiter(this, void 0, void 0, function* () {
            const processed = writeAckService.recieve({
                topic,
                action: message_constants_1.RECORD_ACTIONS.WRITE_ACKNOWLEDGEMENT,
                correlationId,
                originalAction: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE_WITH_WRITE_ACK
            });
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callbackSpy);
            sinon_1.assert.calledWith(callbackSpy);
        }));
        it('doesn\'t call callback twice', () => __awaiter(this, void 0, void 0, function* () {
            const msg = {
                topic,
                action: message_constants_1.RECORD_ACTIONS.WRITE_ACKNOWLEDGEMENT,
                correlationId,
                originalAction: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE_WITH_WRITE_ACK
            };
            writeAckService.recieve(msg);
            writeAckService.recieve(msg);
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callbackSpy);
            sinon_1.assert.calledWith(callbackSpy);
        }));
        it('calls ack callback with error when server sends error message', () => __awaiter(this, void 0, void 0, function* () {
            const errorAction = message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED;
            writeAckService.recieve({
                topic,
                action: errorAction,
                correlationId,
                originalAction: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE_WITH_WRITE_ACK,
                isError: true
            });
            yield bluebird_1.Promise.delay(1);
            sinon_1.assert.calledOnce(callbackSpy);
            sinon_1.assert.calledWith(callbackSpy, message_constants_1.RECORD_ACTIONS[errorAction]);
        }));
    });
});
//# sourceMappingURL=write-acknowledgement-serviceSpec.js.map