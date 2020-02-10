"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_strategy_1 = require("./record/merge-strategy");
exports.DefaultOptions = {
    timerResolution: 50,
    subscriptionInterval: 100,
    offlineEnabled: true,
    heartbeatInterval: 30000,
    reconnectIntervalIncrement: 4000,
    maxReconnectInterval: 180000,
    maxReconnectAttempts: 5,
    rpcAcceptTimeout: 6000,
    rpcResponseTimeout: 10000,
    subscriptionTimeout: 2000,
    recordReadAckTimeout: 15000,
    recordReadTimeout: 15000,
    recordDeleteTimeout: 15000,
    offlineBufferTimeout: 2000,
    discardTimeout: 5000,
    path: '/deepstream',
    mergeStrategy: merge_strategy_1.REMOTE_WINS,
    recordDeepCopy: true,
    socketOptions: null,
    dirtyStorageName: '__ds__dirty_records',
    nodeStoragePath: './local-storage',
    indexdb: {
        dbVersion: 2,
        storageDatabaseName: 'deepstream',
        defaultObjectStoreName: 'records',
        objectStoreNames: ['one', 'two', 'three'],
        flushTimeout: 50
    },
    nodeStorageSize: 5,
    lazyConnect: false,
};
