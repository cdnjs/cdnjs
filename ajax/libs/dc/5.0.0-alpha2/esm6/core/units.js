import { isNegligible } from './utils.js';
/**
 * The default value for {@link ICoordinateGridMixinConf.xUnits | .xUnits} for the
 * {@link CoordinateGridMixin | Coordinate Grid Chart} and should
 * be used when the x values are a sequence of integers.
 * It is a function that counts the number of integers in the range supplied in its start and end parameters.
 *
 * @see {@link ICoordinateGridMixinConf.xUnits}
 *
 * @example
 * ```
 * chart.xUnits(UnitsIntegers) // already the default
 * ```
 */
export const UnitsInteger = function (start, end) {
    return Math.abs(end - start);
};
/**
 * This argument can be passed to the {@link ICoordinateGridMixinConf.xUnits | .xUnits} function of a
 * coordinate grid chart to specify ordinal units for the x axis. Usually this parameter is used in
 * combination with passing
 * {@link https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales | d3.scaleOrdinal}
 * to {@link CoordinateGridMixin.x | .x}.
 *
 * As of dc.js 3.0, this is purely a placeholder or magic value which causes the chart to go into ordinal mode; the
 * function is not called.
 *
 * @see {@link https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales | d3.scaleOrdinal}
 * @see {@link ICoordinateGridMixinConf.xUnits}
 * @see {@link CoordinateGridMixin.x | coordinateGridMixin.x}
 *
 * @example
 * ```
 * chart.xUnits(UnitsOrdinal)
 *      .x(d3.scaleOrdinal())
 * ```
 */
export const UnitsOrdinal = function (start, end) {
    throw new Error('dc.units.ordinal should not be called - it is a placeholder');
};
/**
 * This function generates an argument for the {@link CoordinateGridMixin | Coordinate Grid Chart}
 * {@link ICoordinateGridMixinConf.xUnits | .xUnits} function specifying that the x values are floating-point
 * numbers with the given precision.
 * The returned function determines how many values at the given precision will fit into the range
 * supplied in its start and end parameters.
 *
 * @see {@link ICoordinateGridMixinConf.xUnits}
 *
 * @example
 * ```
 * // specify values (and ticks) every 0.1 units
 * chart.xUnits(UnitWithPrecision(0.1))
 *
 * // there are 500 units between 0.5 and 1 if the precision is 0.001
 * var thousandths = UnitWithPrecision(0.001);
 *
 * thousandths(0.5, 1.0) // returns 500
 * ```
 */
export const UnitWithPrecision = function (precision) {
    const _f = function (s, e) {
        const d = Math.abs((e - s) / _f.resolution);
        if (isNegligible(d - Math.floor(d))) {
            return Math.floor(d);
        }
        else {
            return Math.ceil(d);
        }
    };
    _f.resolution = precision;
    return _f;
};
//# sourceMappingURL=units.js.map