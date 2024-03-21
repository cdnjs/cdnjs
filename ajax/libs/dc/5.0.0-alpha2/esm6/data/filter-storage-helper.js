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
        if ('dimName' in conf) {
            if (typeof this._conf.dimension === 'object') {
                this._conf.dimension.name = conf.dimName;
            }
        }
        this._ensureListenerRegistered();
        return this;
    }
    get dimName() {
        var _a;
        return ((_a = this._conf.dimension) === null || _a === void 0 ? void 0 : _a.name) || this._conf.chartId;
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
            dimName: this.dimName,
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