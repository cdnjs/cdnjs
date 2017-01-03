Ext.define('Neptune.view.AppHeader', function() {
    Neptune.theme = Ext.Object.fromQueryString(location.search).theme || 'default';
    return {
        extend: 'Ext.container.Container',
        xtype: 'appHeader',
        layout: 'hbox',
        cls: 'app-header',
        items: [{
            xtype: 'component',
            autoEl: {
                tag: 'h1'
            },
            html: document.title,
            flex: 1
        }, {
            xtype: 'combo',
            width: 170,
            labelWidth: 50,
            fieldLabel: 'Theme',
            displayField: 'name',
            valueField: 'value',
            margin: '0 10 0 0',
            store: Ext.create('Ext.data.Store', {
                fields: ['value', 'name'],
                data : [
                    { value: 'default', name: 'Classic' },
                    { value: 'gray', name: 'Gray' },
                    { value: 'neptune', name: 'Neptune' }
                ]
            }),
            value: Neptune.theme,
            listeners: {
                select: function(combo) {
                    var theme = Neptune.theme = combo.getValue();
                    location.search = (theme === 'default') ? '' : 'theme=' + theme;
                }
            }
        }]
    };
});
