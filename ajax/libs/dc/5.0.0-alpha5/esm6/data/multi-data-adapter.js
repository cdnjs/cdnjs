import { SimpleDataAdapter } from './simple-data-adapter.js';
export class MultiDataAdapter extends SimpleDataAdapter {
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
            const { chartId, valueAccessor: primaryValueAccessor, dimension } = this._conf;
            const valueAccessor = layer.valueAccessor || primaryValueAccessor;
            const rawData = this._getData({
                dimension,
                group: layer.group,
                chartId,
                valueAccessor,
            });
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
//# sourceMappingURL=multi-data-adapter.js.map