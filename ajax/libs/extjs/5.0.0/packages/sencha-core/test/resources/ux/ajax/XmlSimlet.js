/**
 * This class simulates XML-based requests.
 */
Ext.define('Ext.ux.ajax.XmlSimlet', {
    extend: 'Ext.ux.ajax.DataSimlet',
    alias: 'simlet.xml',

    /**
     * This template is used to populate the XML response. The configuration of the Reader
     * is available so that its `root` and `record` properties can be used as well as the
     * `fields` of the associated `model`. But beyond that, the way these pieces are put
     * together in the document requires the flexibility of a template.
     */
    xmlTpl: [
        '<{root}>\n',
            '<tpl for="data">',
        '    <{parent.record}>\n',
                '<tpl for="parent.fields">',
        '        <{name}>{[parent[values.name]]}</{name}>\n',
                '</tpl>',
        '    </{parent.record}>\n',
            '</tpl>',
        '</{root}>'
    ],

    doGet: function (ctx) {
        var me = this,
            data = me.getData(ctx),
            page = me.getPage(ctx, data),
            reader = ctx.xhr.options.proxy && ctx.xhr.options.proxy.reader,
            ret = me.callParent(arguments), // pick up status/statusText
            response = {
                data: page,
                reader: reader,
                fields: reader && reader.model && reader.model.getFields(),
                root: reader && reader.root,
                record: reader && reader.record
            },
            tpl, xml, doc;

        if (ctx.groupSpec) {
            response.summaryData = me.getSummary(ctx, data, page);
        }

        // If a straight Ajax request there won't be an xmlTpl.
        if (me.xmlTpl) {
            tpl = Ext.XTemplate.getTpl(me, 'xmlTpl');
            xml = tpl.apply(response);
        } else {
            xml = data;
        }

        if (typeof DOMParser != 'undefined') {
            doc = (new DOMParser()).parseFromString(xml, "text/xml");
        } else {
            // IE doesn't have DOMParser, but fortunately, there is an ActiveX for XML
            doc = new ActiveXObject("Microsoft.XMLDOM");
            doc.async = false;
            doc.loadXML(xml);
        }

        ret.responseText = xml;
        ret.responseXML = doc;
        return ret;
    }
});
