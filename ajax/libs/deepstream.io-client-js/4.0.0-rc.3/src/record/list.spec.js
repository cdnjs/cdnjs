"use strict";
// // tslint:disable:no-unused-expression
// import { Promise as BBPromise } from 'bluebird'
// import { expect } from 'chai'
// import { spy, assert } from 'sinon'
// import { getServicesMock, getLastMessageSent } from '../mocks'
// import { EVENT } from '../../src/constants'
// import { TOPIC, RECORD_ACTIONS as RECORD_ACTION } from '../../binary-protocol/src/message-constants'
// import { DefaultOptions, Options } from '../../src/client-options'
// import { RecordCore } from '../../src/record/record-core'
// import { List } from '../../src/record/list'
// describe('list - online', () => {
//   let recordCore: RecordCore
//   let list: List
//   let options: Options
//   let services: any
//   let name: string
//   let changeCallback: sinon.SinonSpy
//   let readyCallback: sinon.SinonSpy
//   function makelistReady (entries: Array<string>, version: number) {
//     recordCore.handle({
//       name,
//       topic: TOPIC.RECORD,
//       action: RECORD_ACTION.READ_RESPONSE,
//       parsedData: entries,
//       version
//     })
//   }
//   beforeEach(() => {
//     services = getServicesMock()
//     options = Object.assign({}, DefaultOptions)
//     name = 'someList'
//     changeCallback = spy()
//     readyCallback = spy()
//     recordCore = new RecordCore(name, services, options, () => {})
//     recordCore.usages++
//     list = new List(recordCore)
//     list.subscribe(changeCallback)
//     list.whenReady(readyCallback)
//   })
//   afterEach(() => {
//     services.verify()
//   })
//   it('creates the list', () => {
//     expect(getLastMessageSent()).deep.equal({
//       topic: TOPIC.RECORD,
//       action: RECORD_ACTION.SUBSCRIBECREATEANDREAD,
//       name
//     })
//     expect(list.subscribe.bind(list, 'somePath', changeCallback)).to.throw('path is not supported for List.subscribe')
//     expect(list.getEntries).not.null
//     assert.notCalled(readyCallback)
//   })
//   it('starts with an empty array', () => {
//     expect(list.getEntries()).deep.equal([])
//     expect(list.isEmpty()).to.equal(true)
//   })
//   it('receives a response from the server', async () => {
//     const data = ['entryA', 'entryB']
//     recordCore.handle({
//       name,
//       topic: TOPIC.RECORD,
//       action: RECORD_ACTION.READ_RESPONSE,
//       parsedData: data,
//       version: 1
//     })
//     await BBPromise.delay(20)
//     expect(list.getEntries()).deep.equal(data)
//     expect(list.isEmpty()).equal(false)
//     assert.calledOnce(changeCallback)
//     assert.calledWithExactly(changeCallback, data)
//     assert.calledOnce(readyCallback)
//     assert.calledWithExactly(readyCallback, list)
//   })
//   it('handles empty lists', () => {
//     makelistReady(['entryA'], 1)
//     list.setEntries([])
//     expect(list.getEntries()).deep.equal([])
//     expect(list.isEmpty()).equal(true)
//     list.addEntry('someEntry', 0)
//     expect(list.getEntries()).deep.equal(['someEntry'])
//     expect(list.isEmpty()).equal(false)
//     list.removeEntry('someEntry', 0)
//     expect(list.getEntries()).deep.equal([])
//     expect(list.isEmpty()).equal(true)
//   })
//   it('unsubscribes', () => {
//     makelistReady([], 1)
//     changeCallback.reset()
//     list.unsubscribe(changeCallback)
//     list.setEntries(['q'])
//     assert.notCalled(changeCallback)
//   })
//   // it('adding entries, methods are queued when record is not ready, correct indexes', () => {
//   //   list._record.isReady = false
//   //   list.setEntries(['a', 'c', 'e'])
//   //   list.addEntry('b', 1)
//   //   list.addEntry('d', 3)
//   //   expect(list._queuedMethods.length).toEqual(3)
//   //   list._record.isReady = true
//   //   list._onReady()
//   //   expect(list.getEntries()).toEqual(['a', 'b', 'c', 'd', 'e'])
//   // })
//   // it('removing entries, methods are queued when record is not ready, correct indexes', () => {
//   //   list._record.isReady = false
//   //   list.setEntries(['b', 'a', 'b', 'c', 'b'])
//   //   list.removeEntry('b', 0)
//   //   list.removeEntry('b', 3)
//   //   expect(list._queuedMethods.length).toEqual(3)
//   //   list._record.isReady = true
//   //   list._onReady()
//   //   expect(list.getEntries()).toEqual(['a', 'b', 'c'])
//   // })
//   describe.skip('updating existent list', () => {
//     let entries: Array <string>
//     beforeEach(() => {
//       entries = ['entryA', 'entryB', 'entryC']
//       makelistReady(Object.assign([], entries), 1)
//       services.connectionMock
//         .expects('sendMessage')
//         .once()
//         .withExactArgs({
//           topic: TOPIC.RECORD,
//           action: RECORD_ACTION.UPDATE,
//           name,
//           parsedData: entries,
//           version: 2
//       })
//     })
//     afterEach(() => {
//       expect(list.getEntries()).deep.equal(entries)
//       assert.calledOnce(changeCallback)
//       assert.calledWithExactly(changeCallback, entries)
//     })
//     it('adds an entry to the end of list', () => {
//       const newEntry = 'entryD'
//       entries.push(newEntry)
//       list.addEntry(newEntry)
//     })
//     it('removes an entry from the list', () => {
//       const removed = 'entryB'
//       entries.splice(entries.indexOf(removed), 1)
//       list.removeEntry(removed)
//     })
//     it('adds an entry to the list at a explicit index', () => {
//       const newEntry = 'entryD'
//       const index = 1
//       entries.splice(index, 0, newEntry)
//       list.addEntry(newEntry, index)
//     })
//     it('removes an entry to the list at a explicit index', () => {
//       const index = 1
//       const removed = 'entryB'
//       entries.splice(index, 1)
//       list.removeEntry(removed, index)
//     })
//     it('sets the entire list', () => {
//       const newEntries = ['u', 'v']
//       entries = newEntries
//       list.setEntries(newEntries)
//     })
//   })
//   describe.skip('server updates', () => {
//     let entries: Array <any>
//     let version: number
//     beforeEach(() => {
//       entries = ['entryA', 'entryB', 'entryC']
//       version = 1
//       makelistReady(entries, version)
//     })
//     afterEach(() => {
//       expect(list.getEntries()).deep.equal(entries)
//       expect(list.version).equal(version)
//       assert.calledOnce(changeCallback)
//       assert.calledWithExactly(changeCallback, entries)
//     })
//     it('handles server updates', () => {
//       const listReceived = ['x', 'y']
//       entries = listReceived
//       version = 7
//       recordCore.handle({
//         name,
//         topic: TOPIC.RECORD,
//         action: RECORD_ACTION.READ_RESPONSE,
//         parsedData: listReceived,
//         version
//       })
//     })
//   })
// })
//# sourceMappingURL=list.spec.js.map