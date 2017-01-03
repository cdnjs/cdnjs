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
            proxy = ctx.xhr.options.operation.getProxy(),
            reader = proxy && proxy.getReader(),
            model = reader && reader.getModel(),
            ret = me.callParent(arguments), // pick up status/statusText
            response = {
                data: page,
                reader: reader,
                fields: model && model.fields,
                root: reader && reader.getRootProperty(),
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
    },

    fixTree: function() {
        this.callParent(arguments);
        var buffer = [];
        this.buildTreeXml(this.data, buffer);
        this.data = buffer.join('');
    },

    buildTreeXml: function(nodes, buffer) {
        var rootProperty = this.rootProperty,
            recordProperty = this.recordProperty;

        buffer.push('<', rootProperty, '>');
        Ext.Array.forEach(nodes, function(node) {
            buffer.push('<', recordProperty, '>');
            for (var key in node) {
                if (key == 'children') {
                    this.buildTreeXml(node.children, buffer);
                } else {
                    buffer.push('<', key, '>', node[key], '</', key, '>');
                }
            }
            buffer.push('</', recordProperty, '>');
        });
        buffer.push('</', rootProperty, '>');
    }


});
