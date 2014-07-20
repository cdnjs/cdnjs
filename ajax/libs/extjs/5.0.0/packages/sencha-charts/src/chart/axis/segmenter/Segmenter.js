/**
 * @abstract
 * @class Ext.chart.axis.segmenter.Segmenter
 * 
 * Interface for a segmenter in an Axis. A segmenter defines the operations you can do to a specific
 * data type.
 * 
 * See {@link Ext.chart.axis.Axis}.
 * 
 */
Ext.define('Ext.chart.axis.segmenter.Segmenter', {

    config: {
        /**
         * @cfg {Ext.chart.axis.Axis} axis The axis that the Segmenter is bound.
         */
        axis: null
    },

    constructor: function (config) {
        this.initConfig(config);
    },

    /**
     * This method formats the value.
     * 
     * @param {*} value The value to format.
     * @param {Object} context Axis layout context.
     * @return {String}
     */
    renderer: function (value, context) {
        return String(value);
    },
    
    /**
     * Convert from any data into the target type.
     * @param {*} value The value to convert from
     * @return {*} The converted value. 
     */
    from: function (value) {
        return value;
    },

    /**
     * Returns the difference between the min and max value based on the given unit scale.
     * 
     * @param {*} min The smaller value.
     * @param {*} max The larger value.
     * @param {*} unit The unit scale. Unit can be any type.
     * @return {Number} The number of `unit`s between min and max. It is the minimum n that min + n * unit >= max.
     */
    diff: Ext.emptyFn,

    /**
     * Align value with step of units.
     * For example, for the date segmenter, if the unit is "Month" and step is 3, the value will be aligned by
     * seasons.
     * 
     * @param {*} value The value to be aligned.
     * @param {Number} step The step of units.
     * @param {*} unit The unit.
     * @return {*} Aligned value.
     */
    align: Ext.emptyFn,

    /**
     * Add `step` `unit`s to the value. 
     * @param {*} value  The value to be added.
     * @param {Number} step The step of units. Negative value are allowed.
     * @param {*} unit The unit.
     */
    add: Ext.emptyFn,

    /**
     * Given a start point and estimated step size of a range, determine the preferred step size.
     * 
     * @param {*} start The start point of range.
     * @param {*} estStepSize The estimated step size.
     * @return {Object} Return the step size by an object of step x unit.
     * @return {Number} return.step The step count of units.
     * @return {Number|Object} return.unit The unit.
     */
    preferredStep: Ext.emptyFn
});