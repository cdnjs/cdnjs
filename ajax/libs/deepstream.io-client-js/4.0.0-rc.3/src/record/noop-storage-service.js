"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoopStorage {
    get(recordName, callback) {
        setTimeout(callback.bind(this, recordName, -1, null), 0);
    }
    set(recordName, version, data, callback) {
        setTimeout(callback, 0);
    }
    delete(recordName, callback) {
        setTimeout(callback, 0);
    }
}
exports.NoopStorage = NoopStorage;
//# sourceMappingURL=noop-storage-service.js.map