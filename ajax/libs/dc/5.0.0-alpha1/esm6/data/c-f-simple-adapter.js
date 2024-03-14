import { FilterStorageHelper } from './filter-storage-helper.js';
export class CFSimpleAdapter extends FilterStorageHelper {
    constructor(conf = {}) {
        super(Object.assign({ valueAccessor: d => d.value, ordering: d => d.key }, conf));
    }
    configure(conf) {
        return super.configure(conf);
    }
    conf() {
        return super.conf();
    }
    // TODO: better typing
    data() {
        const entities = this._conf.group.all();
        // create a two level deep copy defensively
        entities.map(val => (Object.assign({}, val)));
        entities.forEach(e => {
            e._value = this._conf.valueAccessor(e);
        });
        return entities;
    }
}
//# sourceMappingURL=c-f-simple-adapter.js.map