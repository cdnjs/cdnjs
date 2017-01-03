Ext.define('FV.model.Article', {
    extend: 'Ext.data.Model',
    
    fields: ['title', 'author', 'link', {
        name: 'pubDate',
        type: 'date'
    }, {
        // Some feeds return the description as the main content
        // Others return description as a summary. Figure this out here
        name: 'description',
        mapping: function(raw) {
            var DQ = Ext.dom.Query,
                content = DQ.selectNode('content', raw),
                key;

            if (content && DQ.getNodeValue(content)) {
                key = 'description';
            } else {
                key = 'title';
            }
            return DQ.selectValue(key, raw);

        }
    }, {
        name: 'content',
        mapping: function(raw) {
            var DQ = Ext.dom.Query,
                content = DQ.selectNode('content', raw);

            if (!content || !DQ.getNodeValue(content)) {
                content = DQ.selectNode('description', raw);
            }
            return DQ.getNodeValue(content, '');
        }
    }]
});