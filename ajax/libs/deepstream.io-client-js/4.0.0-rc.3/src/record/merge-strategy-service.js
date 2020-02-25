"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
class MergeStrategyService {
    constructor(services, defaultStrategy) {
        this.services = services;
        this.defaultStrategy = defaultStrategy;
        this.strategiesByRecord = new Map();
        this.strategiesByPattern = new Map();
    }
    setMergeStrategyByName(recordName, strategy) {
        this.strategiesByRecord.set(recordName, strategy);
    }
    setMergeStrategyByPattern(pattern, strategy) {
        this.strategiesByPattern.set(pattern, strategy);
    }
    merge(recordName, localVersion, localData, remoteVersion, remoteData, callback, context) {
        const exactMergeStrategy = this.strategiesByRecord.get(recordName);
        if (exactMergeStrategy) {
            exactMergeStrategy(localData, localVersion, remoteData, remoteVersion, (error, data) => {
                callback.call(context, error, recordName, data, remoteVersion, remoteData, localVersion, localData);
            });
            return;
        }
        for (const [pattern, patternMergeStrategy] of this.strategiesByPattern) {
            if (pattern.test(recordName)) {
                patternMergeStrategy(localData, localVersion, remoteData, remoteVersion, (error, data) => {
                    callback.call(context, error, recordName, data, remoteVersion, remoteData, localVersion, localData);
                });
                return;
            }
        }
        if (this.defaultStrategy) {
            this.defaultStrategy(localData, localVersion, remoteData, remoteVersion, (error, data) => {
                callback.call(context, error, recordName, data, remoteVersion, remoteData, localVersion, localData);
            });
        }
        this.services.logger.error({ topic: message_constants_1.TOPIC.RECORD }, constants_1.EVENT.RECORD_VERSION_EXISTS, { remoteVersion, recordName });
    }
}
exports.MergeStrategyService = MergeStrategyService;
//# sourceMappingURL=merge-strategy-service.js.map