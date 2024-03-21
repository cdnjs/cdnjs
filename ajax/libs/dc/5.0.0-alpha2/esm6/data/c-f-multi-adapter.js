import { CFSimpleAdapter } from './c-f-simple-adapter.js';
export class CFMultiAdapter extends CFSimpleAdapter {
    constructor(conf = {}) {
        super(Object.assign({ layers: [], valueAccessor: d => d.value }, conf));
    }
    configure(conf) {
        return super.configure(conf);
    }
    conf() {
        return super.conf();
    }
    // TODO: better typing
    data() {
        // Two level defensive copy
        return this.layers().map(layer => {
            const valueAccessor = layer.valueAccessor || this._conf.valueAccessor;
            // Two level defensive copy
            const rawData = layer.group.all().map(val => (Object.assign(Object.assign({}, val), { _value: valueAccessor(val) })));
            return { name: layer.name, rawData };
        });
    }
    layers() {
        if (this._conf.group) {
            // if a stack configuration includes a `group` as well, that become the first layer
            const firstLayer = { name: this._conf.groupName, group: this._conf.group };
            return [firstLayer].concat(this._conf.layers);
        }
        return this._conf.layers;
    }
    layerByName(name) {
        return this._conf.layers.find(l => l.name === name);
    }
}
//# sourceMappingURL=c-f-multi-adapter.js.map