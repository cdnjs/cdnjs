/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * @class Ext.chart.series.Cartesian
 *
 * Common base class for series implementations which plot values using x/y coordinates.
 */
Ext.define('Ext.chart.series.Cartesian', {

    /* Begin Definitions */

    extend: 'Ext.chart.series.Series',

    alternateClassName: ['Ext.chart.CartesianSeries', 'Ext.chart.CartesianChart'],

    /* End Definitions */

    /**
     * @cfg {String} xField
     * The name of the data Model field corresponding to the x-axis value.
     */
    xField: null,

    /**
     * @cfg {String/String[]} yField
     * The name(s) of the data Model field(s) corresponding to the y-axis value(s).
     */
    yField: null,

    /**
     * @cfg {String/String[]} axis
     * The position of the axis to bind the values to. Possible values are 'left', 'bottom', 'top' and 'right'.
     * You must explicitly set this value to bind the values of the line series to the ones in the axis, otherwise a
     * relative scale will be used. For example, if you're using a Scatter or Line series and you'd like to have the
     * values in the chart relative to the bottom and left axes then `axis` should be `['left', 'bottom']`.
     */
    axis: 'left',

    getLegendLabels: function() {
        var me = this,
            labels = [],
            fields, i, ln,
            combinations = me.combinations,
            title,
            combo, label0, label1;

        fields = [].concat(me.yField);
        for (i = 0, ln = fields.length; i < ln; i++) {
            title = me.title;
            // Use the 'title' config if present, otherwise use the raw yField name
            labels.push((Ext.isArray(title) ? title[i] : title) || fields[i]);
        }

        // Handle yFields combined via legend drag-drop
        // TODO need to check to see if this is supported in extjs 4 branch
        if (combinations) {
            combinations = Ext.Array.from(combinations);
            for (i = 0, ln = combinations.length; i < ln; i++) {
                combo = combinations[i];
                label0 = labels[combo[0]];
                label1 = labels[combo[1]];
                labels[combo[1]] = label0 + ' & ' + label1;
                labels.splice(combo[0], 1);
            }
        }

        return labels;
    },

    /**
     * @protected Iterates over a given record's values for each of this series's yFields,
     * executing a given function for each value. Any yFields that have been combined
     * via legend drag-drop will be treated as a single value.
     * @param {Ext.data.Model} record
     * @param {Function} fn
     * @param {Object} scope
     */
    eachYValue: function(record, fn, scope) {
        var me = this,
            yValueAccessors = me.getYValueAccessors(),
            i, ln, accessor;
        
        for (i = 0, ln = yValueAccessors.length; i < ln; i++) {
            accessor = yValueAccessors[i];
            fn.call(scope, accessor(record), i);
        }
    },

    /**
     * @protected Returns the number of yField values, taking into account fields combined
     * via legend drag-drop.
     * @return {Number}
     */
    getYValueCount: function() {
        return this.getYValueAccessors().length;
    },

    combine: function(index1, index2) {
        var me = this,
            accessors = me.getYValueAccessors(),
            accessor1 = accessors[index1],
            accessor2 = accessors[index2];

        // Combine the yValue accessors for the two indexes into a single accessor that returns their sum
        accessors[index2] = function(record) {
            return accessor1(record) + accessor2(record);
        };
        accessors.splice(index1, 1);

        me.callParent([index1, index2]);
    },

    clearCombinations: function() {
        // Clear combined accessors, they'll get regenerated on next call to getYValueAccessors
        delete this.yValueAccessors;
        this.callParent();
    },

    /**
     * @protected Returns an array of functions, each of which returns the value of the yField
     * corresponding to function's index in the array, for a given record (each function takes the
     * record as its only argument.) If yFields have been combined by the user via legend drag-drop,
     * this list of accessors will be kept in sync with those combinations.
     * @return {Array} array of accessor functions
     */
    getYValueAccessors: function() {
        var me = this,
            accessors = me.yValueAccessors,
            yFields, yField, i, ln;
        if (!accessors) {
            accessors = me.yValueAccessors = [];
            yFields = [].concat(me.yField);
            
            for (i = 0, ln = yFields.length; i < ln; i++) {
                yField = yFields[i];
                accessors.push(function(record) {
                    return record.get(yField);
                });
            }
        }
        return accessors;
    },

    /**
     * Calculate the min and max values for this series's xField.
     * @return {Array} [min, max]
     */
    getMinMaxXValues: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            data = store.data.items,
            count = me.getRecordCount(),
            i, ln, record,
            min, max,
            xField = me.xField,
            xValue;

        if (count > 0) {
            min = Infinity;
            max = -min;
                
            for (i = 0, ln = data.length; i < ln; i++) {
                record = data[i];
                xValue = record.get(xField);
                if (xValue > max) {
                    max = xValue;
                }
                if (xValue < min) {
                    min = xValue;
                }
            }
            
            // If we made no progress, treat it like a category axis
            if (min == Infinity) {
                min = 0;
            }
            
            if (max == -Infinity) {
                max = count - 1;
            }
        } else {
            min = max = 0;
        }
        return [min, max];
    },

    /**
     * Calculate the min and max values for this series's yField(s). Takes into account yField
     * combinations, exclusions, and stacking.
     * @return {Array} [min, max]
     */
    getMinMaxYValues: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            data = store.data.items,
            count = me.getRecordCount(),
            i, ln, record,
            stacked = me.stacked,
            min, max,
            positiveTotal, negativeTotal;

        function eachYValueStacked(yValue, i) {
            if (!me.isExcluded(i)) {
                if (yValue < 0) {
                    negativeTotal += yValue;
                } else {
                    positiveTotal += yValue;
                }
            }
        }

        function eachYValue(yValue, i) {
            if (!me.isExcluded(i)) {
                if (yValue > max) {
                    max = yValue;
                }
                if (yValue < min) {
                    min = yValue;
                }
            }
        }

        if (count > 0) {
            min = Infinity;
            max = -min;
            
            for (i = 0, ln = data.length; i < ln; i++) {
                record = data[i];
                if (stacked) {
                    positiveTotal = 0;
                    negativeTotal = 0;
                    me.eachYValue(record, eachYValueStacked);
                    if (positiveTotal > max) {
                        max = positiveTotal;
                    }
                    if (negativeTotal < min) {
                        min = negativeTotal;
                    }
                } else {
                    me.eachYValue(record, eachYValue);
                }
            }
            
            // If we made no progress, treat it like a category axis
            if (min == Infinity) {
                min = 0;
            }
            
            if (max == -Infinity) {
                max = count - 1;
            }
        } else {
            min = max = 0;
        }
        return [min, max];
    },

    getAxesForXAndYFields: function() {
        var me = this,
            axes = me.chart.axes,
            axis = [].concat(me.axis),
            yFields = {}, yFieldList = [].concat(me.yField),
            xFields = {}, xFieldList = [].concat(me.xField),
            fields, xAxis, yAxis, i, ln, flipXY;

        
        flipXY = me.type === 'bar' && me.column === false;
        if(flipXY) {
            fields = yFieldList;
            yFieldList = xFieldList;
            xFieldList = fields;
        }
        if (Ext.Array.indexOf(axis, 'top') > -1) {
            xAxis = 'top';
        } else if (Ext.Array.indexOf(axis, 'bottom') > -1) {
            xAxis = 'bottom';
        } else {
            if (axes.get('top') && axes.get('bottom')) {
                for (i = 0, ln = xFieldList.length; i < ln; i++) {
                    xFields[xFieldList[i]] = true;
                }
                fields = [].concat(axes.get('bottom').fields);
                for (i = 0, ln = fields.length; i < ln; i++) {
                    if (xFields[fields[i]]) {
                        xAxis = 'bottom';
                        break
                    }
                }
                fields = [].concat(axes.get('top').fields);
                for (i = 0, ln = fields.length; i < ln; i++) {
                    if (xFields[fields[i]]) {
                        xAxis = 'top';
                        break
                    }
                }
            } else if (axes.get('top')) {
                xAxis = 'top';
            } else if (axes.get('bottom')) {
                xAxis = 'bottom';
            }
        }
        if (Ext.Array.indexOf(axis, 'left') > -1) {
            yAxis = 'left';
        } else if (Ext.Array.indexOf(axis, 'right') > -1) {
            yAxis = 'right';
        } else {
            if (axes.get('left') && axes.get('right')) {
                for (i = 0, ln = yFieldList.length; i < ln; i++) {
                    yFields[yFieldList[i]] = true;
                }
                fields = [].concat(axes.get('right').fields);
                for (i = 0, ln = fields.length; i < ln; i++) {
                    if (yFields[fields[i]]) {

                        break
                    }
                }
                fields = [].concat(axes.get('left').fields);
                for (i = 0, ln = fields.length; i < ln; i++) {
                    if (yFields[fields[i]]) {
                        yAxis = 'left';
                        break
                    }
                }
            } else if (axes.get('left')) {
                yAxis = 'left';
            } else if (axes.get('right')) {
                yAxis = 'right';
            }
        }

        return flipXY ? {
            xAxis: yAxis,
            yAxis: xAxis
        }: {
            xAxis: xAxis,
            yAxis: yAxis
        };
    }


});
