import { BaseDataAdapter } from './base-data-adapter.js';
export class FilterStorageHelper extends BaseDataAdapter {
    configure(conf) {
        super.configure(conf);
        this._ensureListenerRegistered();
        return this;
    }
    _storageKey() {
        return this.providerBehavior.storageKey(this);
    }
    get dimId() {
        var _a;
        return ((_a = this._conf.dimension) === null || _a === void 0 ? void 0 : _a.dimId) || this._conf.dimId || this._conf.chartId;
    }
    get dimLabel() {
        var _a;
        return ((_a = this._conf.dimension) === null || _a === void 0 ? void 0 : _a.dimLabel) || this._conf.dimLabel || this.dimId;
    }
    _ensureListenerRegistered() {
        if (!this._conf.filterStorage) {
            return;
        }
        // If it was already registered, we check if the storage key is still the same
        // in case that has changed, we need to deregister and register afresh
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
            dimId: this.dimId,
            dimLabel: this.dimLabel,
            primaryChart: this._conf.primaryChart,
            applyFilters: () => this.applyFilters(),
        });
    }
    _deRegisterListener() {
        this._conf.filterStorage.deRegisterFilterListener(this._listenerRegToken.storageKey, this._listenerRegToken);
        this._listenerRegToken = undefined;
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