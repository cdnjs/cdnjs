Ext.define('PageAnalyzer.models.BasicTimeData', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'environment',       type: 'string' },
        { name: 'build',             type: 'string' },
        { name: 'test',              type: 'string' },
        { name: 'measure',           type: 'string' },
        { name: 'path',              type: 'string' },
        { name: 'avgTime',           type: 'float', defaultValue: 0 },
        { name: 'avgTimePerCall',    type: 'float', defaultValue: 0 },
        { name: 'sumAvgTime',        type: 'float', defaultValue: 0 },
        { name: 'sumAvgTimePerCall', type: 'float', defaultValue: 0 },
        { name: 'minCalls',          type: 'int',   defaultValue: 0 },
        { name: 'maxCalls',          type: 'int',   defaultValue: 0 },
        { name: 'numSamples',        type: 'int',   defaultValue: 0 }
    ],

    addSample: function (time, numCalls) {
        var me = this,
            data = me.data;

        if (numCalls) {
            if (1 == ++data.numSamples) {
                data.minCalls = data.maxCalls = numCalls;
            } else {
                if (data.minCalls > numCalls) {
                    data.minCalls = numCalls;
                }
                if (data.maxCalls < numCalls) {
                    data.maxCalls = numCalls;
                }
            }

            data.sumAvgTime += time;
            data.sumAvgTimePerCall += time / numCalls;

            data.avgTime = Math.round(data.sumAvgTime / data.numSamples * 100) / 100;
            data.avgTimePerCall = Math.round(data.sumAvgTimePerCall / data.numSamples * 100) / 100;
        }
    }
});
