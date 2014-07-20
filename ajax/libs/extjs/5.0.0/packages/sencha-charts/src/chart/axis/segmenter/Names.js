/**
 * @class Ext.chart.axis.segmenter.Names
 * @extends Ext.chart.axis.segmenter.Segmenter
 * 
 * Names data type. Names will be calculated as their indices in the methods in this class.
 * The `preferredStep` always return `{ unit: 1, step: 1 }` to indicate "show every item".
 * 
 */
Ext.define("Ext.chart.axis.segmenter.Names", {
    extend: 'Ext.chart.axis.segmenter.Segmenter',
    alias: 'segmenter.names',

    renderer: function (value, context) {
        return value;
    },

    diff: function (min, max, unit) {
        return Math.floor(max - min);
    },

    align: function (value, step, unit) {
        return Math.floor(value);
    },


    add: function (value, step, unit) {
        return value + step;
    },

    preferredStep: function (min, estStepSize, minIdx, data) {
        return {
            unit: 1,
            step: 1
        };
    }
});