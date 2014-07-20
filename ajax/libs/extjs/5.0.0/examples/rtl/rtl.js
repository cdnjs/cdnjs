Ext.require([
    'Ext.container.Viewport',
    'Ext.grid.Panel',
    'Ext.grid.plugin.RowEditing',
    'Ext.layout.container.Border'
]);

Ext.onReady(function() {
    var text = '\u0635\u0650\u0641 \u062E\u064E\u0644\u0642\u064E \u062E\u064E\u0648\u062F\u0650 \u0643\u064E\u0645\u0650\u062B\u0644\u0650 \u0627\u0644\u0634\u064E\u0645\u0633\u0650 \u0625\u0650\u0630 \u0628\u064E\u0632\u064E\u063A\u064E\u062A \u2014 \u064A\u064E\u062D\u0638\u0649 \u0627\u0644\u0636\u064E\u062C\u064A\u0639\u064F \u0628\u0650\u0647\u0627 \u0646\u064E\u062C\u0644\u0627\u0621\u064E \u0645\u0650\u0639\u0637\u0627\u0631\u0650',
        i = 50,
        sentences = [],
        words = text.split(' '),
        edCfg = {
            xtype: 'textfield'    
        },
        paragraph;
        
    while (i--) {
        sentences.push(text);
    }
    paragraph = sentences.join(' ');

    Ext.define('Fubar', {
        extend: 'Ext.data.Model',
        fields: [ 'foo', 'bar', 'baz', 'zork', 'gork', 'bork' ]
    });

    // Hide the RTL Button as we already are RTL
    Ext.ComponentManager.onAvailable('options-toolbar', function(toolbar){

        var rtlButton = toolbar.down('button');
        if (rtlButton) {
            rtlButton.hide();
        }
    });


    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        rtl: true,
        items: [{
            region: 'north',
            title: '\u0634\u0645\u0627\u0644',
            height: 100,
            html: paragraph,
            autoScroll: true,
            collapsible: true,
            split: true
        },{
            region: 'west',
            id: 'west-region',
            title: '\u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u063a\u0631\u0628\u064a\u0629',
            width: 200,
            collapsible: true,
            split: true,
            tbar: {
                enableOverflow: true,
                items: [{
                    text: words[9]
                }, {
                    text: words[3]
                }, {
                    text: words[4]
                }, {
                    text: words[0]
                }, {
                    text: words[12]
                }]
            }
        }, {
            region: 'center',
            xtype: 'grid',
            plugins: [new Ext.grid.plugin.RowEditing()],
            title: '\u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0646\u0637\u0642\u0629',
            columns: [
                { dataIndex: 'foo', text: words[0], field: edCfg},
                { dataIndex: 'bar', text: words[1], field: edCfg },
                { dataIndex: 'baz', text: words[2], field: edCfg },
                { dataIndex: 'zork', text: words[3], field: edCfg },
                { dataIndex: 'gork', text: words[4], field: edCfg },
                { dataIndex: 'bork', text: words[5], field: edCfg, flex: 1 }
            ],
            store: Ext.create('Ext.data.Store', {
                model: 'Fubar',
                data: [
                    [words[6], words[8], words[9], words[10], words[11], words[12]],
                    [words[5], words[4], words[3], words[2], words[1], words[0]],
                    [words[12], words[11], words[10], words[9], words[8], words[6]],
                    [words[0], words[1], words[2], words[3], words[4], words[5]],
                    [words[6], words[8], words[9], words[10], words[11], words[12]],
                    [words[5], words[4], words[3], words[2], words[1], words[0]],
                    [words[12], words[11], words[10], words[9], words[8], words[6]],
                    [words[0], words[1], words[2], words[3], words[4], words[5]],
                    [words[6], words[8], words[9], words[10], words[11], words[12]],
                    [words[5], words[4], words[3], words[2], words[1], words[0]],
                    [words[12], words[11], words[10], words[9], words[8], words[6]],
                    [words[0], words[1], words[2], words[3], words[4], words[5]],
                    [words[6], words[8], words[9], words[10], words[11], words[12]],
                    [words[5], words[4], words[3], words[2], words[1], words[0]],
                    [words[12], words[11], words[10], words[9], words[8], words[6]],
                    [words[0], words[1], words[2], words[3], words[4], words[5]],
                    [words[6], words[8], words[9], words[10], words[11], words[12]],
                    [words[5], words[4], words[3], words[2], words[1], words[0]],
                    [words[12], words[11], words[10], words[9], words[8], words[6]],
                    [words[0], words[1], words[2], words[3], words[4], words[5]]
                ]
            })
        }, {
            region: 'east',
            title: '\u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0634\u0631\u0642\u064a\u0629',
            width: 200,
            collapsible: true,
            split: true
        }, {
            region: 'south',
            title: '\u062c\u0646\u0648\u0628 \u0627\u0644\u0645\u0646\u0637\u0642\u0629',
            height: 100,
            collapsible: true,
            split: true
        }]
    });
});