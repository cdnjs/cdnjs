// // tslint:disabke:no-unused-expression
// import * as BBPromise from 'bluebird'
// import { expect } from 'chai'
// import { spy, assert, match } from 'sinon'
// import { getServicesMock } from '../mocks'
// import { EVENT } from '../../src/constants'
// import { TOPIC, RECORD_ACTIONS as RECORD_ACTION } from '../../binary-protocol/src/message-constants'
// import { CONNECTION_STATE } from '../../src/constants'
// import { DefaultOptions, Options } from '../../src/client-options'
// import { RecordCore, RECORD_STATE } from '../../src/record/record-core'
// describe('record core offline', () => {
//     let whenCompleted: sinon.SinonSpy
//     let recordCore: RecordCore
//     let options: Options
//     let services: any
//     beforeEach(() => {
//         whenCompleted = spy()
//         services = getServicesMock()
//         options = Object.assign({}, DefaultOptions, { discardTimeout: 20 })
//         services.connectionMock
//             .expects('sendMessage')
//             .never()
//         services.storageMock
//             .expects('get')
//             .once()
//             .callsArgWith(1, name, 1, { firstname: 'wolfram' })
//         services.connection.isConnected = false
//         recordCore = new RecordCore(name, services, options, whenCompleted)
//         services.storageMock.restore()
//     })
//     afterEach(() => {
//         services.verify()
//     })
//     it('triggers ready callback on load', () => {
//         const readySpy = spy()
//         recordCore.whenReady(this, readySpy)
//         assert.calledOnce(readySpy)
//         assert.calledWithExactly(readySpy, this)
//     })
//     it('sets update messages for updates after when ready', () => {
//         services.storageMock
//             .expects('set')
//             .once()
//             .withExactArgs(name, 2, { firstname: 'Bob' }, match.func)
//         recordCore.set({ data: { firstname: 'Bob' } })
//     })
//     it('sends patch messages for path changes after when ready', () => {
//         services.storageMock
//             .expects('set')
//             .once()
//             .withExactArgs(name, 2, { firstname: 'Bob' }, match.func)
//         recordCore.set({ path: 'firstname', data: 'Bob' })
//     })
//     it('responds to update write acks with an offline error', async () => {
//         const ackCallback = spy()
//         services.storageMock
//             .expects('set')
//             .once()
//             .withExactArgs(name, 2, { firstname: 'Bob' }, match.func)
//         recordCore.set({ data: { firstname: 'Bob' }, callback: ackCallback })
//         await BBPromise.delay(0)
//         assert.calledOnce(ackCallback)
//         assert.calledWithExactly(ackCallback, EVENT.CLIENT_OFFLINE)
//     })
//     it('sends patch messages for path changes after when ready', async () => {
//         const ackCallback = spy()
//         services.storageMock
//                     .expects('set')
//                     .once()
//                     .withExactArgs(name, 2, { firstname: 'Bob' }, match.func)
//         recordCore.set({ path: 'firstname', data: 'Bob', callback: ackCallback })
//         await BBPromise.delay(0)
//         assert.calledOnce(ackCallback)
//         assert.calledWithExactly(ackCallback, EVENT.CLIENT_OFFLINE)
//     })
//     it('sends erase messages for erase after when ready', () => {
//         const ackCallback = spy()
//         services.storageMock
//         .expects('set')
//         .once()
//         .withExactArgs(name, 2, {}, match.func)
//         recordCore.set({ path: 'firstname' })
//     })
//     it('sends erase write ack messages for erase after when ready', async () => {
//         const ackCallback = spy()
//         services.storageMock
//         .expects('set')
//         .once()
//         .withExactArgs(name, 2, {}, match.func)
//         recordCore.set({ path: 'firstname', callback: ackCallback })
//         await BBPromise.delay(0)
//         assert.calledOnce(ackCallback)
//         assert.calledWithExactly(ackCallback, EVENT.CLIENT_OFFLINE)
//     })
//     it('queues discarding record when no longer needed', () => {
//         recordCore.discard()
//         expect(recordCore.recordState).to.equal(RECORD_STATE.UNSUBSCRIBING)
//         // tslint:disable-next-line:no-unused-expression
//         expect(recordCore.isReady).to.be.true
//     })
//     it('removes pending discard when usages increases', async () => {
//         recordCore.discard()
//         recordCore.usages++
//         await BBPromise.delay(30)
//         expect(recordCore.recordState).to.equal(RECORD_STATE.READY)
//         // tslint:disable-next-line:no-unused-expression
//         expect(recordCore.isReady).to.be.true
//     })
//     it('removes record when completed', async () => {
//         recordCore.discard()
//         await BBPromise.delay(30)
//         expect(recordCore.recordState).to.equal(RECORD_STATE.UNSUBSCRIBED)
//         assert.calledOnce(whenCompleted)
//         assert.calledWithExactly(whenCompleted, name)
//         // tslint:disable-next-line:no-unused-expression
//         expect(recordCore.isReady).to.be.false
//     })
//     it('sends delete when ready', async () => {
//         services.storageMock
//         .expects('delete')
//         .once()
//         .withExactArgs(name, match.func)
//         recordCore.delete()
//         expect(recordCore.recordState).to.equal(RECORD_STATE.DELETING)
//         assert.notCalled(whenCompleted)
//         // tslint:disable-next-line:no-unused-expression
//         expect(recordCore.isReady).to.be.true
//     })
//     it('calls delete when delete is confirmed', async () => {
//         services.storageMock
//         .expects('delete')
//         .once()
//         .withExactArgs(name, match.func)
//         .callsArgWith(1, name)
//         recordCore.delete()
//         await BBPromise.delay(0)
//         // deleted
//         expect(recordCore.recordState).to.equal(RECORD_STATE.DELETED)
//         assert.calledOnce(whenCompleted)
//         assert.calledWithExactly(whenCompleted, name)
//         // tslint:disable-next-line:no-unused-expression
//         expect(recordCore.isReady).to.be.false
//     })
//     const name = 'recordA'
// })
//# sourceMappingURL=record-core-offlineSpec.js.map