import { ColorScaleHelper } from './color-scale-helper.js';
import { scaleOrdinal } from 'd3-scale';
/**
 * Provide colors based on {@link https://github.com/d3/d3-scale#scaleOrdinal | d3.scaleOrdinal}.
 *
 * This is most used option in `dc` charts and it is the default.
 * It needs a list of colors which can be any CSS accepted color values.
 *
 * Occasionally you would use one of the d3 supplied colors or color scales.
 * Please see {@link https://github.com/d3/d3-scale-chromatic}, any of the schemes may be used as
 * ordinal colors.
 *
 * ```
 * // TODO example
 * ```
 *
 * If a domain is set explicitly it maps the colors in sequence.
 *
 * ```
 * // TODO example
 * ```
 *
 * However, it is not mandatory to set a domain explicitly.
 * If domain is not explicitly provided it keeps getting built as the scale is queried for new domain values.
 *
 * ```
 * // TODO example
 * ```
 */
export class OrdinalColors extends ColorScaleHelper {
    constructor(colors) {
        const scale = scaleOrdinal().range(colors);
        super(scale);
    }
}
//# sourceMappingURL=ordinal-colors.js.map