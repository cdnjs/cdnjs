/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Annotation from '../Annotation.js';
import CrookedLine from './CrookedLine.js';
import U from '../../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Class
 *
 * */
class ElliottWave extends CrookedLine {
    /* *
     *
     * Functions
     *
     * */
    addLabels() {
        this.getPointsOptions().forEach((point, i) => {
            const typeOptions = this.options.typeOptions, label = this.initLabel(merge(point.label, {
                text: typeOptions.labels[i],
                point: function (target) {
                    return target.annotation.points[i];
                }
            }), false);
            point.label = label.options;
        });
    }
}
ElliottWave.prototype.defaultOptions = merge(CrookedLine.prototype.defaultOptions, 
/**
 * An elliott wave annotation.
 *
 * @sample highcharts/annotations-advanced/elliott-wave/
 *         Elliott wave
 *
 * @extends      annotations.crookedLine
 * @product      highstock
 * @optionparent annotations.elliottWave
 */
{
    typeOptions: {
        /**
         * @extends   annotations.crookedLine.labelOptions
         * @apioption annotations.elliottWave.typeOptions.points.label
         */
        /**
         * @ignore-option
         */
        labels: ['(0)', '(A)', '(B)', '(C)', '(D)', '(E)'],
        line: {
            strokeWidth: 1
        }
    },
    labelOptions: {
        align: 'center',
        allowOverlap: true,
        crop: true,
        overflow: 'none',
        type: 'rect',
        backgroundColor: 'none',
        borderWidth: 0,
        y: -5
    }
});
Annotation.types.elliottWave = ElliottWave;
/* *
 *
 *  Default Export
 *
 * */
export default ElliottWave;
