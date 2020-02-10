"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DirtyService {
    constructor(storage, dirtyStorageName) {
        this.storage = storage;
        this.dirtyStorageName = dirtyStorageName;
        this.dirtyRecords = new Map();
        this.loadedCallback = [];
        this.loaded = false;
        this.load();
    }
    isDirty(recordName) {
        return this.dirtyRecords.has(recordName);
    }
    setDirty(recordName, isDirty) {
        if (isDirty) {
            this.dirtyRecords.set(recordName, true);
        }
        else {
            this.dirtyRecords.delete(recordName);
        }
        this.storage.set(this.dirtyStorageName, 1, [...this.dirtyRecords], () => { });
    }
    whenLoaded(context, callback) {
        if (this.loaded) {
            callback.call(context);
            return;
        }
        this.loadedCallback.push({ callback, context });
    }
    getAll() {
        return this.dirtyRecords;
    }
    load() {
        if (this.loaded) {
            return;
        }
        this.storage.get(this.dirtyStorageName, (recordName, version, data) => {
            this.dirtyRecords = data ? new Map(data) : new Map();
            this.loaded = true;
            this.loadedCallback.forEach(({ callback, context }) => callback.call(context));
        });
    }
}
exports.DirtyService = DirtyService;
//# sourceMappingURL=dirty-service.js.map