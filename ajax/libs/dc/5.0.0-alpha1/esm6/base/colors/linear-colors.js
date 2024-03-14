import { ColorScaleHelper } from './color-scale-helper.js';
import { scaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
export class LinearColors extends ColorScaleHelper {
    constructor(range) {
        const scale = scaleLinear().range(range).interpolate(interpolateHcl);
        super(scale);
    }
}
//# sourceMappingURL=linear-colors.js.map