import { FilterStorageHelper } from './filter-storage-helper.js';
export class SimpleDataAdapter extends FilterStorageHelper {
    constructor(conf = {}) {
        super(Object.assign({ valueAccessor: d => d.value, ordering: d => d.key }, conf));
    }
    // TODO: better typing
    data() {
        const { dimension, group, chartId, valueAccessor } = this._conf;
        return this._getData({ dimension, group, chartId, valueAccessor });
    }
    _getData({ dimension, group, chartId, valueAccessor }) {
        // create a two-level deep copy defensively
        return this.providerBehavior
            .getGroupings(dimension, group, chartId)
            .map(grp => (Object.assign(Object.assign({}, grp), { _value: valueAccessor(grp) })));
    }
}
//# sourceMappingURL=simple-data-adapter.js.map