import { extent } from 'd3-array';
import { config } from '../core/config.js';
import { ColorScaleHelper } from './colors/color-scale-helper.js';
import { OrdinalColors } from './colors/ordinal-colors.js';
import { LinearColors } from './colors/linear-colors.js';
import { ColorCalculator } from './colors/color-calculator.js';
/**
 * The Color Mixin is an abstract chart functional class providing universal coloring support
 * as a mix-in for any concrete chart implementation.
 */
// tslint:disable-next-line:variable-name
export function ColorMixin(Base) {
    return class extends Base {
        constructor(...args) {
            super(...args);
            this.configure({
                colorAccessor: (d, i) => this._conf.keyAccessor(d),
            });
            this.colorHelper(new OrdinalColors(config.defaultColors()));
        }
        configure(conf) {
            super.configure(conf);
            if ('colorAccessor' in conf && this._colorHelper) {
                this._colorHelper.colorAccessor = conf.colorAccessor;
            }
            return this;
        }
        conf() {
            return this._conf;
        }
        colorHelper(colorHelper) {
            if (!arguments.length) {
                return this._colorHelper;
            }
            this._colorHelper = colorHelper;
            this._colorHelper.colorAccessor = this._conf.colorAccessor;
            return this;
        }
        /**
         * Ordinal colors are used most commonly in `dc` charts.
         * This call is a shorthand for using an {@linkcode OrdinalColors} instance
         * as {@linkcode colorHelper}.
         *
         * ```
         * chart.ordinalColors(colorList); // same as chart.colorHelper(new OrdinalColors(colorList));
         * ```
         *
         * @see {@link OrdinalColors}
         * @see {@link https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales}
         */
        ordinalColors(colorList) {
            this.colorHelper(new OrdinalColors(colorList));
            return this;
        }
        /**
         * Use any of d3 scales for color. This method is a shorthand for the following:
         *
         * ```
         * chart.scaledColors(scale); // same as chart.colorHelper(new ColorScaleHelper(scale));
         * ```
         *
         * Depending on type of scale, it will need either setting domain for the scale or
         * compute it as per your data using {@linkcode calculateColorDomain}.
         *
         * @see {@link ColorScaleHelper}
         * @see {@link https://github.com/d3/d3-scale/}
         */
        colorScale(scale) {
            return this.colorHelper(new ColorScaleHelper(scale));
        }
        /**
         * Convenience method to set the color scale to an Hcl interpolated linear scale with range `r`.
         */
        linearColors(r) {
            this.colorHelper(new LinearColors(r));
            return this;
        }
        colorCalculator(colorCalculator) {
            if (!arguments.length) {
                return this.colorHelper().getColor;
            }
            this.colorHelper(new ColorCalculator(colorCalculator));
            return this;
        }
        colorDomain(domain) {
            const scale = this.colorHelper().colorScale;
            if (!arguments.length) {
                return scale.domain();
            }
            scale.domain(domain);
            return this;
        }
        /**
         * Set the domain by determining the min and max values as retrieved by
         * {@link IColorMixinConf.colorAccessor | .colorAccessor} over the chart's dataset.
         *
         * This is useful only for certain type of color scales.
         * In particular it will not work with {@linkcode ordinalColors}.
         *
         * @category Intermediate
         */
        calculateColorDomain() {
            const scale = this._colorHelper
                .colorScale;
            if (scale && scale.domain) {
                scale.domain(extent(this.data(), this._conf.colorAccessor));
            }
            return this;
        }
    };
}
//# sourceMappingURL=color-mixin.js.map