import { CFFilterHandler } from './c-f-filter-handler.js';
export class FilterStorageHelper extends CFFilterHandler {
    constructor(conf = {}) {
        super(Object.assign({ 
            // @ts-ignore
            shareFilters: true }, conf));
    }
    conf() {
        return super.conf();
    }
    configure(conf) {
        super.configure(conf);
        this._ensureListenerRegistered();
        return this;
    }
    _ensureListenerRegistered() {
        if (!this._conf.filterStorage) {
            return;
        }
        // If it was already registered, we check if the storage ky is still same
        // in case that has changed we need to de-register and register afresh
        const storageKey = this._storageKey();
        if (this._listenerRegToken) {
            if (this._listenerRegToken.storageKey === storageKey) {
                // all good, storageKey has not changed
                return;
            }
            // storageKey changed, de-register first
            this._deRegisterListener();
        }
        this._listenerRegToken = this._conf.filterStorage.registerFilterListener({
            storageKey,
            onFiltersChanged: this._conf.onFiltersChanged,
            chartId: this._conf.chartId,
            primaryChart: this._conf.primaryChart,
            applyFilters: filters => this.applyFilters(),
        });
    }
    _deRegisterListener() {
        this._conf.filterStorage.deRegisterFilterListener(this._listenerRegToken.storageKey, this._listenerRegToken);
        this._listenerRegToken = undefined;
    }
    _storageKey() {
        if (this._conf.shareFilters) {
            return this._conf.dimension;
        }
        else {
            return this;
        }
    }
    get filters() {
        return this._conf.filterStorage.getFiltersFor(this._storageKey());
    }
    set filters(value) {
        this._conf.filterStorage.setFiltersFor(this._storageKey(), value);
    }
    notifyListeners(filters) {
        this._conf.filterStorage.notifyListeners(this._storageKey(), filters);
    }
    dispose() {
        super.dispose();
        if (this._listenerRegToken) {
            this._deRegisterListener();
        }
    }
}
//# sourceMappingURL=filter-storage-helper.js.map