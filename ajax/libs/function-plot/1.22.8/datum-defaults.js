"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function datumDefaults(d) {
    // default graphType uses boxes i.e. 2d intervals
    if (!('graphType' in d)) {
        d.graphType = 'interval';
    }
    // if the graphType is not `interval` then the sampler is `builtIn`
    // because the interval sampler returns a box instead of a point
    if (!('sampler' in d)) {
        d.sampler = d.graphType !== 'interval'
            ? 'builtIn'
            : 'interval';
    }
    // TODO: handle default fnType
    // default `fnType` is linear
    if (!('fnType' in d)) {
        d.fnType = 'linear';
    }
    return d;
}
exports.default = datumDefaults;
//# sourceMappingURL=datum-defaults.js.map