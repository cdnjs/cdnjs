/**
 * @class Ext.chart.axis.segmenter.Numeric
 * @extends Ext.chart.axis.segmenter.Segmenter
 * 
 * Numeric data type.
 */
Ext.define('Ext.chart.axis.segmenter.Numeric', {
    extend: 'Ext.chart.axis.segmenter.Segmenter',
    alias: 'segmenter.numeric',
    isNumeric: true,

    renderer: function (value, context) {
        return value.toFixed(Math.max(0, context.majorTicks.unit.fixes));
    },

    diff: function (min, max, unit) {
        return Math.floor((max - min) / unit.scale);
    },

    align: function (value, step, unit) {
        return Math.floor(value / (unit.scale * step)) * unit.scale * step;
    },

    add: function (value, step, unit) {
        return value + step * unit.scale;
    },

    preferredStep: function (min, estStepSize) {
        var logs = Math.floor(Math.log(estStepSize) * Math.LOG10E), // common logarithm of estStepSize
            scale = Math.pow(10, logs);
        estStepSize /= scale;
        if (estStepSize < 2) {
            estStepSize = 2;
        } else if (estStepSize < 5) {
            estStepSize = 5;
        } else if (estStepSize < 10) {
            estStepSize = 10;
            logs++;
        }
        return {
            unit: {
                // when estStepSize < 1, rounded down log10(estStepSize) is equal to -number_of_leading_zeros in estStepSize
                fixes: -logs, // number of fractional digits
                scale: scale
            },
            step: estStepSize
        };
    },

    /**
     * Wraps the provided estimated step size of a range without altering it into a step size object.
     *
     * @param {*} min The start point of range.
     * @param {*} estStepSize The estimated step size.
     * @return {Object} Return the step size by an object of step x unit.
     * @return {Number} return.step The step count of units.
     * @return {Object} return.unit The unit.
     */

    exactStep: function (min, estStepSize) {
        var logs = Math.floor(Math.log(estStepSize) * Math.LOG10E),
            scale = Math.pow(10, logs);
        return {
            unit: {
                // add one decimal point if estStepSize is not a multiple of scale
                fixes: -logs + (estStepSize % scale === 0 ? 0 : 1),
                scale: 1
            },
            step: estStepSize
        }
    },

    adjustByMajorUnit: function (step, scale, range) {
        var min = range[0],
            max = range[1],
            increment = step * scale,
            remainder = min % increment;
        if (remainder !== 0) {
            range[0] = min - remainder - increment;
        }
        remainder = max % increment;
        if (remainder !== 0) {
            range[1] = max - remainder + increment;
        }
    }
});