/**
 * JSON Simlet.
 */
Ext.define('Ext.ux.ajax.JsonSimlet', {
    extend: 'Ext.ux.ajax.DataSimlet',
    alias: 'simlet.json',

    doGet: function (ctx) {
        var me = this,
            data = me.getData(ctx),
            page = me.getPage(ctx, data),
            reader = ctx.xhr.options.proxy && ctx.xhr.options.proxy.getReader(),
            ret = me.callParent(arguments), // pick up status/statusText
            response = {};

        if (reader && reader.getRoot()) {
            response[reader.getRoot()] = page;
            response[reader.getTotalProperty()] = data.length;
        } else {
            response = page;
        }

        if (ctx.groupSpec) {
            response.summaryData = me.getSummary(ctx, data, page);
        }

        ret.responseText = Ext.encode(response);
        return ret;
    }
});
