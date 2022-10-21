/**
 * @module ol/proj/proj4
 */
import Projection from './Projection.js';
import Units from './Units.js';
import { addCoordinateTransforms, addEquivalentProjections, addProjection, createSafeCoordinateTransform, get, } from '../proj.js';
import { assign } from '../obj.js';
import { get as getTransform } from './transforms.js';
/**
 * Make projections defined in proj4 (with `proj4.defs()`) available in
 * OpenLayers.
 *
 * This function should be called whenever changes are made to the proj4
 * registry, e.g. after calling `proj4.defs()`. Existing transforms will not be
 * modified by this function.
 *
 * @param {?} proj4 Proj4.
 * @api
 */
export function register(proj4) {
    var projCodes = Object.keys(proj4.defs);
    var len = projCodes.length;
    var i, j;
    for (i = 0; i < len; ++i) {
        var code = projCodes[i];
        if (!get(code)) {
            var def = proj4.defs(code);
            var units = def.units;
            if (!units && def.projName === 'longlat') {
                units = Units.DEGREES;
            }
            addProjection(new Projection({
                code: code,
                axisOrientation: def.axis,
                metersPerUnit: def.to_meter,
                units: units,
            }));
        }
    }
    for (i = 0; i < len; ++i) {
        var code1 = projCodes[i];
        var proj1 = get(code1);
        for (j = 0; j < len; ++j) {
            var code2 = projCodes[j];
            var proj2 = get(code2);
            if (!getTransform(code1, code2)) {
                var def1 = proj4.defs(code1);
                var def2 = proj4.defs(code2);
                if (def1 === def2) {
                    addEquivalentProjections([proj1, proj2]);
                }
                else {
                    // Reset axis because OpenLayers always uses x, y axis order
                    var transform = proj4(assign({}, def1, { axis: undefined }), assign({}, def2, { axis: undefined }));
                    addCoordinateTransforms(proj1, proj2, createSafeCoordinateTransform(proj1, proj2, transform.forward), createSafeCoordinateTransform(proj2, proj1, transform.inverse));
                }
            }
        }
    }
}
//# sourceMappingURL=proj4.js.map