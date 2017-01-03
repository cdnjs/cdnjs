/**
 * @class Ext.chart.axis.layout.CombineDuplicate
 * @extends Ext.chart.axis.layout.Discrete
 * 
 * Discrete processor that combines duplicate data points.
 */
Ext.define('Ext.chart.axis.layout.CombineDuplicate', {
    extend: 'Ext.chart.axis.layout.Discrete',
    alias: 'axisLayout.combineDuplicate',

    getCoordFor: function (value, field, idx, items) {
        if (!(value in this.labelMap)) {
            var result = this.labelMap[value] = this.labels.length;
            this.labels.push(value);
            return result;
        }
        return this.labelMap[value];
    }

});