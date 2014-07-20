/**
 * @class Ext.chart.axis.layout.Continuous
 * @extends Ext.chart.axis.layout.Layout
 * 
 * Processor for axis data that can be interpolated.
 */
Ext.define('Ext.chart.axis.layout.Continuous', {
    extend: 'Ext.chart.axis.layout.Layout',
    alias: 'axisLayout.continuous',
    config: {
        adjustMinimumByMajorUnit: false,
        adjustMaximumByMajorUnit: false
    },
    
    getCoordFor: function (value, field, idx, items) {
        return +value;
    },

    //@inheritdoc
    snapEnds: function (context, min, max, estStepSize) {
        var segmenter = context.segmenter,
            axis = this.getAxis(),
            majorTickSteps = axis.getMajorTickSteps(),
            // if specific number of steps requested and the segmenter can do such segmentation
            out = majorTickSteps && segmenter.exactStep ?
                segmenter.exactStep(min, (max - min) / majorTickSteps) :
                segmenter.preferredStep(min, estStepSize),
            unit = out.unit,
            step = out.step,
            from = segmenter.align(min, step, unit),
            steps = segmenter.diff(min, max, unit) + 1;
        return {
            min: segmenter.from(min),
            max: segmenter.from(max),
            from: from,
            to: segmenter.add(from, steps * step, unit),
            step: step,
            steps: steps,
            unit: unit,
            get: function (current) {
                return segmenter.add(this.from, this.step * current, unit);
            }
        };
    },

    snapMinorEnds: function (context) {
        var majorTicks = context.majorTicks,
            minorTickSteps = this.getAxis().getMinorTickSteps(),
            segmenter = context.segmenter,
            min = majorTicks.min,
            max = majorTicks.max,
            from = majorTicks.from,
            unit = majorTicks.unit,
            step = majorTicks.step / minorTickSteps,
            scaledStep = step * unit.scale,
            fromMargin = from - min,
            offset = Math.floor(fromMargin / scaledStep),
            extraSteps = offset + Math.floor((max - majorTicks.to) / scaledStep) + 1,
            steps = majorTicks.steps * minorTickSteps + extraSteps;
        return {
            min: min,
            max: max,
            from: min + fromMargin % scaledStep,
            to: segmenter.add(from, steps * step, unit),
            step: step,
            steps: steps,
            unit: unit,
            get: function (current) {
                return (current % minorTickSteps + offset + 1 !== 0) ? // don't render minor tick in major tick position
                    segmenter.add(this.from, this.step * current, unit) :
                    null;
            }
        }
    }
});