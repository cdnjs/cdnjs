/**
 * @class Ext.chart.axis.layout.Discrete
 * @extends Ext.chart.axis.layout.Layout
 *
 * Simple processor for data that cannot be interpolated.
 */
Ext.define('Ext.chart.axis.layout.Discrete', {
    extend: 'Ext.chart.axis.layout.Layout',
    alias: 'axisLayout.discrete',

    processData: function () {
        var me = this,
            axis = me.getAxis(),
            seriesList = axis.boundSeries,
            direction = axis.getDirection(),
            i, ln, series;
        this.labels = [];
        this.labelMap = {};
        for (i = 0, ln = seriesList.length; i < ln; i++) {
            series = seriesList[i];
            if (series['get' + direction + 'Axis']() === axis) {
                series['coordinate' + direction]();
            }
        }
        // About the labels on Category axes (aka. axes with a Discrete layout)...
        //
        // When the data set from the store changes, series.processData() is called, which does its thing
        // at the series level and then calls series.updateLabelData() to update the labels in the sprites
        // that belong to the series. At the same time, series.processData() calls axis.processData(), which
        // also does its thing but at the axis level, and also needs to update the labels for the sprite(s)
        // that belong to the axis. This is not that simple, however. So how are the axis labels rendered?
        // First, axis.sprite.Axis.render() calls renderLabels() which obtains the majorTicks from the 
        // axis.layout and iterate() through them. The majorTicks are an object returned by snapEnds() below
        // which provides a getLabel() function that returns the label from the axis.layoutContext.data array.
        // So now the question is: how are the labels transferred from the axis.layout to the axis.layoutContext?
        // The easy response is: it's in calculateLayout() below. The issue is to call calculateLayout() because
        // it takes in an axis.layoutContext that can only be created in axis.sprite.Axis.doLayout(), which is 
        // a private "updater" function that is called by all the sprite's "dirtyTriggers". Of course, we don't 
        // want to call doLayout() directly from here, so instead we update the sprite's data attribute, which 
        // sets the dirtyTrigger which calls doLayout() which calls calculateLayout() etc...
        // Note that the sprite's data attribute could be set to any value and it would still result in the  
        // dirtyTrigger we need. For consistency, however, it is set to the labels.
        axis.getSprites()[0].setAttributes({data: this.labels});
        this.fireEvent('datachange', this.labels);
    },

    // @inheritdoc
    calculateLayout: function (context) {
        context.data = this.labels;
        this.callParent([context]);
    },

    //@inheritdoc
    calculateMajorTicks: function (context) {
        var me = this,
            attr = context.attr,
            data = context.data,
            range = attr.max - attr.min,
            zoom = range / Math.max(1, attr.length) * (attr.visibleMax - attr.visibleMin),
            viewMin = attr.min + range * attr.visibleMin,
            viewMax = attr.min + range * attr.visibleMax,
            estStepSize = attr.estStepSize * zoom;

        var out = me.snapEnds(context, Math.max(0, attr.min), Math.min(attr.max, data.length - 1), estStepSize);
        if (out) {
            me.trimByRange(context, out, viewMin, viewMax);
            context.majorTicks = out;
        }
    },

    // @inheritdoc
    snapEnds: function (context, min, max, estStepSize) {
        estStepSize = Math.ceil(estStepSize);
        var steps = Math.floor((max - min) / estStepSize),
            data = context.data;
        return {
            min: min,
            max: max,
            from: min,
            to: steps * estStepSize + min,
            step: estStepSize,
            steps: steps,
            unit: 1,
            getLabel: function (current) {
                return data[this.from + this.step * current];
            },
            get: function (current) {
                return this.from + this.step * current;
            }
        };
    },

    // @inheritdoc
    trimByRange: function (context, out, trimMin, trimMax) {
        var unit = out.unit,
            beginIdx = Math.ceil((trimMin - out.from) / unit) * unit,
            endIdx = Math.floor((trimMax - out.from) / unit) * unit,
            begin = Math.max(0, Math.ceil(beginIdx / out.step)),
            end = Math.min(out.steps, Math.floor(endIdx / out.step));

        if (end < out.steps) {
            out.to = end;
        }

        if (out.max > trimMax) {
            out.max = out.to;
        }

        if (out.from < trimMin && out.step > 0) {
            out.from = out.from + begin * out.step * unit;
            while (out.from < trimMin) {
                begin++;
                out.from += out.step * unit;
            }
        }

        if (out.min < trimMin) {
            out.min = out.from;
        }

        out.steps = end - begin;
    },

    getCoordFor: function (value, field, idx, items) {
        this.labels.push(value);
        return this.labels.length - 1;
    }
});