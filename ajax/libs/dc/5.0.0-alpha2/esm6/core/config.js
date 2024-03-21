import { timeFormat } from 'd3-time-format';
import { logger } from './logger.js';
import { format } from 'd3-format';
/**
 * General configuration
 */
export class Config {
    constructor() {
        /**
         * The default floating point format for dc.js.
         */
        this.floatFormat = format('.2f');
        this._defaultColors = Config._schemeCategory20c;
        this.dateFormat = timeFormat('%m/%d/%Y');
        this.disableTransitions = false;
    }
    defaultColors(colors) {
        if (!arguments.length) {
            // Issue warning if it uses _schemeCategory20c
            if (this._defaultColors === Config._schemeCategory20c) {
                logger.warnOnce('You are using d3.schemeCategory20c, which has been removed in D3v5. ' +
                    'See the explanation at https://github.com/d3/d3/blob/master/CHANGES.md#changes-in-d3-50. ' +
                    'DC is using it for backward compatibility, however it will be changed in DCv3.1. ' +
                    'You can change it by calling dc.config.defaultColors(newScheme). ' +
                    'See https://github.com/d3/d3-scale-chromatic for some alternatives.');
            }
            return this._defaultColors;
        }
        this._defaultColors = colors;
        return this;
    }
}
// D3v5 has removed schemeCategory20c, copied here for backward compatibility
// prettier-ignore
Config._schemeCategory20c = [
    '#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#e6550d',
    '#fd8d3c', '#fdae6b', '#fdd0a2', '#31a354', '#74c476',
    '#a1d99b', '#c7e9c0', '#756bb1', '#9e9ac8', '#bcbddc',
    '#dadaeb', '#636363', '#969696', '#bdbdbd', '#d9d9d9'
];
/**
 * General configuration object; see {@link Config} for members.
 */
export const config = new Config();
//# sourceMappingURL=config.js.map